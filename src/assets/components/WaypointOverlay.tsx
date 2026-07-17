import { useEffect, useState, type RefObject } from "react";
import useMandelbrot from "../hooks/useMandelbrot";
import type { Waypoint } from "../types/general";
import WaypointMarker from "./WaypointMarker";

const WaypointOverlay = (
    { waypoints, canvasRef }:
    {
        waypoints: Waypoint[],
        canvasRef: RefObject<HTMLCanvasElement | null>
    }
) => {
    const { viewState } = useMandelbrot();

    const [rect, setRect] = useState<DOMRect | null>(null);
    const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        setRect(canvas.getBoundingClientRect());

        const observer = new ResizeObserver(() => {
            setRect(canvas.getBoundingClientRect());
        });
        observer.observe(canvas);

        return () => observer.disconnect();
    }, [canvasRef]);

    const getWaypointPosition = (
        coordinate: [number, number],
        zoom: number,
        center: [number, number]
    ): [number, number] => {
        if (!rect) return [0, 0];

        const aspect = rect.width / rect.height;

        const nx = (coordinate[0] - center[0]) * (zoom / aspect) + 0.5;

        // Sign flip because [0, 0] is at the top left for my renderer.
        const ny = (-coordinate[1] + center[1]) * zoom + 0.5;

        return [nx * rect.width + rect.left, ny * rect.height + rect.top];
    };

    return (
        <div className="waypoints">
            { 
                waypoints.map((w) => (
                    <WaypointMarker
                        key={w.id}
                        waypoint={w}
                        screenPosition={getWaypointPosition(w.location, viewState.zoom, viewState.center)}
                        selected={selectedMarkerId == w.id}
                        onClick={() => setSelectedMarkerId(w.id)}
                        onCancel={() => setSelectedMarkerId(null)}
                        onGo={() => {}}
                    />)) 
            }
        </div>
    );
};

export default WaypointOverlay;