import { useCallback, useEffect, useRef } from "react";

type Circle = {
    x: string;
    y: string;
    r: number;
    alpha: number;
};
const HeroBackground = ({ fillColor = "#7db7e6" }: { fillColor?: string }) => {

    const canvasRefCallback = useCallback((c: HTMLCanvasElement | null) => {
        if (!c) return;

        canvasRef.current = c;
        canvasCtxRef.current = c.getContext("2d");
    }, []);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const canvasCtxRef = useRef<CanvasRenderingContext2D>(null);

    const circles: Circle[] = [
        { x: "15%", y: "15%", r: 200, alpha: 0.15 },
        { x: "45%", y: "20%", r: 100, alpha: 0.1 },
        { x: "65%", y: "30%", r: 60, alpha: 0.08 },
        { x: "75%", y: "25%", r: 30, alpha: 0.05 },
    ];

    const resizeCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();

        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;

        canvas.getContext("2d")?.setTransform(dpr, 0, 0, dpr, 0, 0);
        draw();
    }

    const getCoordinateFromPercentage = (p: string, rect: DOMRect, axis: "X" | "Y") => {
        return (parseFloat(p) / 100) * (axis == "X" ? rect.width : rect.height);
    }

    const draw = () => {
        const ctx = canvasCtxRef.current;
        if (!ctx) return;

        const rect = ctx.canvas.getBoundingClientRect();
        ctx.clearRect(0, 0, rect.width, rect.height);
    
        circles.forEach((circle, i) => {
            const x = getCoordinateFromPercentage(circle.x, rect, "X");
            const y = getCoordinateFromPercentage(circle.y, rect, "Y");

            // Main circle
            ctx.fillStyle = fillColor;
            ctx.globalAlpha = circle.alpha;

            ctx.beginPath();
            ctx.arc(x, y, circle.r, 0, Math.PI * 2);
            ctx.fill();

            // Center circle
            ctx.globalAlpha = Math.min(circle.alpha + 0.2, 1);
            ctx.strokeStyle = fillColor;
            ctx.lineWidth = 3;
            
            ctx.beginPath();
            ctx.arc(x, y, circle.r * 0.15, 0, Math.PI * 2);
            ctx.stroke();

            // Connecting line
            if (i == 0) return;
            ctx.lineCap = "round"

            const start = circles[i - 1];
            const startX = getCoordinateFromPercentage(start.x, rect, "X");
            const startY = getCoordinateFromPercentage(start.y, rect, "Y");

            const dx = x - startX;
            const dy = y - startY;
            const mag = Math.sqrt(dx * dx + dy * dy);

            const nx = dx / mag;
            const ny = dy / mag;

            ctx.beginPath();
            ctx.moveTo(startX + 0.15 * start.r * nx + 2, startY + 0.15 * start.r * ny);
            ctx.lineTo(x + 0.15 * circle.r * -nx - 2, y + 0.15 * circle.r * -ny);
            ctx.stroke();
        });
    
        ctx.globalAlpha = 1;
    }

    useEffect(draw, [fillColor]);

    useEffect(() => {
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);
        return () => window.removeEventListener("resize", resizeCanvas);
    }, []);

    return <canvas className="hero-background" ref={canvasRefCallback} />;
};

export default HeroBackground;
