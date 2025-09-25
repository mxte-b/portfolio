import { useCallback, useEffect, useRef } from "react";

const HeroBackground = () => {
    const canvasRef: (c: HTMLCanvasElement) => void = useCallback(c => {
        canvasCtxRef.current = c.getContext("2d");
    }, []);

    const canvasCtxRef = useRef<CanvasRenderingContext2D>(null);

    useEffect(() => {
        console.log(canvasCtxRef.current)
    }, [canvasRef]);

    return <canvas className="hero-background" ref={canvasRef}/>;
};

export default HeroBackground;