import { useEffect, useRef, useState } from "react";
import type { DrawHelper } from "../types/general";
import { clamp } from "../utils/math";

const SCALE = 36;

const CANVAS_PADDING = 10;
const CANVAS_BG_BASE_COLOR = "#111";
const CANVAS_BG_HIGHLIGHT_COLOR = "#201d1c";

const AXES_COLOR = "#5a5a5a";
const AXES_ARROW_WIDTH = 8;
const AXES_ARROW_HEIGHT = 8;
const AXES_SMALL_TICK_SIZE = 4;
const AXES_SMALL_TICK_COLOR = "#353535";
const AXES_BIG_TICK_SIZE = 4;
const AXES_BIG_TICK_COLOR = "#5a5a5a";

const GRID_COLOR = "#252525";
const GRID_SPACING = SCALE * 0.5;

const CIRCLE_BASE_COLOR = "#E46C16";
const CIRCLE_BORDER_COLOR = "#FFA270";
const CIRCLE_RADIUS = 4;

const WaypointInfo = ({ location }: { location: [number, number] }) => {

    const [fontsReady, setFontsReady] = useState<boolean>(false);
    const [dpr, setDpr] = useState<number>(1);

    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const drawBackground: DrawHelper = (ctx, dim) => {
        ctx.save();

        const grad = ctx.createRadialGradient(dim.width * 0.5, -10, 0, dim.width * 0.5, 0, dim.width * 0.8);
        grad.addColorStop(0, CANVAS_BG_HIGHLIGHT_COLOR);
        grad.addColorStop(1, CANVAS_BG_BASE_COLOR);

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, dim.width, dim.height);

        ctx.restore();
    }

    const drawTicks: DrawHelper = (ctx, dim) => {
        const halfW = dim.width / 2;
        const halfH = dim.height / 2;
        const tickSizeSmallHalf = AXES_SMALL_TICK_SIZE / 2;
        const tickSizeBigHalf = AXES_BIG_TICK_SIZE / 2;

        ctx.save();

        for (let i = 2; i > 0; i--) {
            const currentSize = (i == 2 ? tickSizeSmallHalf : tickSizeBigHalf);
            
            ctx.beginPath();
            ctx.strokeStyle = i == 2 ? AXES_SMALL_TICK_COLOR : AXES_BIG_TICK_COLOR;

            for (let x = halfW; x < dim.width - CANVAS_PADDING; x += GRID_SPACING / i) {
                ctx.moveTo(x + 0.5, halfH - currentSize);
                ctx.lineTo(x + 0.5, halfH + currentSize);
    
                ctx.moveTo(dim.width - x + 0.5, halfH - currentSize);
                ctx.lineTo(dim.width - x + 0.5, halfH + currentSize);
            }
    
            for (let y = halfH; y < dim.height - CANVAS_PADDING; y += GRID_SPACING / i) {
                ctx.moveTo(halfW - currentSize + 0.5, y);
                ctx.lineTo(halfW + currentSize + 0.5, y);
    
                ctx.moveTo(halfW - currentSize + 0.5, dim.height - y);
                ctx.lineTo(halfW + currentSize + 0.5, dim.height - y);
            }

            ctx.closePath();
            ctx.stroke();
        }

        ctx.closePath();
        ctx.stroke();
    }

    const drawAxes: DrawHelper = (ctx, dim) => {
        const halfW = dim.width / 2;
        const halfH = dim.height / 2;
        const halfAW = AXES_ARROW_WIDTH / 2;

        ctx.save();

        ctx.lineWidth = 1;
        ctx.lineCap = "square";
        ctx.strokeStyle = AXES_COLOR;
        ctx.fillStyle = AXES_COLOR;
        
        // Y-axis
        ctx.beginPath();
        ctx.moveTo(halfW + 0.5, CANVAS_PADDING + AXES_ARROW_HEIGHT);
        ctx.lineTo(halfW + 0.5, dim.height - CANVAS_PADDING);

        // X-axis
        ctx.moveTo(CANVAS_PADDING, halfH);
        ctx.lineTo(dim.width - CANVAS_PADDING - AXES_ARROW_HEIGHT, halfH);

        ctx.closePath();
        ctx.stroke();

        // Y-axis arrow
        ctx.beginPath();
        ctx.moveTo(halfW + 0.5, CANVAS_PADDING);
        ctx.lineTo(halfW + 0.5 - halfAW, CANVAS_PADDING + AXES_ARROW_HEIGHT)
        ctx.lineTo(halfW + 0.5 + halfAW, CANVAS_PADDING + AXES_ARROW_HEIGHT)

        // X-axis arrow
        ctx.moveTo(dim.width - CANVAS_PADDING, halfH);
        ctx.lineTo(dim.width - CANVAS_PADDING - AXES_ARROW_HEIGHT, halfH - halfAW)
        ctx.lineTo(dim.width - CANVAS_PADDING - AXES_ARROW_HEIGHT, halfH + halfAW)
        
        ctx.closePath();
        ctx.fill();

        ctx.font = "20px 'Computer Modern Italic'";
        ctx.fillStyle = "#a5a5a5";
        ctx.textBaseline = "hanging";

        // Y-axis label
        ctx.fillText("y", dim.width / 2 + CANVAS_PADDING, CANVAS_PADDING - 5);

        // X-axis label
        ctx.fillText("x", dim.width - CANVAS_PADDING * 2, dim.height / 2 + 5);
        ctx.restore();
    }

    const drawGrid: DrawHelper = (ctx, dim) => {
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = GRID_COLOR;

        for (let i = 0; i < 2; i++) {
            let lx = dim.width / 2;
            let ly = dim.height / 2;
    
            while (lx < dim.width - CANVAS_PADDING && lx > CANVAS_PADDING) {
                ctx.moveTo(lx + 0.5, CANVAS_PADDING);
                ctx.lineTo(lx + 0.5, dim.height - CANVAS_PADDING);
    
                lx += GRID_SPACING * Math.pow(-1, i);
            }

            while (ly < dim.height - CANVAS_PADDING && ly > CANVAS_PADDING) {
                ctx.moveTo(CANVAS_PADDING, ly);
                ctx.lineTo(dim.width - CANVAS_PADDING, ly);
    
                ly += GRID_SPACING * Math.pow(-1, i);
            }
        }

        ctx.closePath();
        ctx.stroke();
        ctx.restore();
    }

    const drawCircle: DrawHelper = (ctx, dim) => {
        ctx.save();

        ctx.fillStyle = CIRCLE_BASE_COLOR;
        ctx.strokeStyle = CIRCLE_BORDER_COLOR;
        ctx.lineWidth = 2;

        const x = dim.width / 2 + location[0] * SCALE;
        const y = dim.height / 2 - location[1] * SCALE;

        ctx.beginPath();
        ctx.arc(x, y, CIRCLE_RADIUS, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = CIRCLE_BORDER_COLOR;
        ctx.font = "14px 'Instrument Sans'";
        ctx.textBaseline = "hanging";
        ctx.shadowColor = "black";
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        const text = `[${location[0].toFixed(2)}, ${location[1].toFixed(2)}]`;
        const size = ctx.measureText(text);
        ctx.fillText(
            text, 
            clamp(x - size.width / 2, CANVAS_PADDING, dim.width - CANVAS_PADDING - size.width), 
            clamp(y - 25, CANVAS_PADDING, dim.height - CANVAS_PADDING - 14), 
        );

        ctx.restore();
    }

    // Load all fonts before drawing on canvas
    useEffect(() => {
        const fonts = [
            document.fonts.load("20px 'Computer Modern Italic'"),
            document.fonts.load("14px 'Instrument Sans'")
        ];
        
        Promise.all(fonts).then(() => setFontsReady(true));
    }, []);

    // Update DPR
    useEffect(() => {
        let query: MediaQueryList | null = null;

        const updateDevicePixelRatio = () => {
            query?.removeEventListener("change", updateDevicePixelRatio);

            query = matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);

            query.addEventListener("change", updateDevicePixelRatio);

            setDpr(window.devicePixelRatio);
        }

        updateDevicePixelRatio();

        return () => query?.removeEventListener("change", updateDevicePixelRatio);
    }, []);

    // Draws the waypoint info on the canvas
    useEffect(() => {
        const c = canvasRef.current;
        const ctx = c?.getContext("2d");

        if (!c || !ctx) return;

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);        
        ctx.clearRect(0, 0, c.width / dpr, c.height / dpr);

        const dim = { width: c.width / dpr, height: c.height / dpr };
        
        drawBackground(ctx, dim);
        drawGrid(ctx, dim);
        drawTicks(ctx, dim);
        drawAxes(ctx, dim);
        drawCircle(ctx, dim);
    }, [fontsReady, dpr]);

    return (
        <canvas aria-label="Current location" ref={canvasRef} className="waypoint-info" width={200 * window.devicePixelRatio} height={125 * window.devicePixelRatio} />
    );
};

export default WaypointInfo;