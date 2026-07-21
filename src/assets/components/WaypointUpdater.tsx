import { useFrame } from "@react-three/fiber";
import type { Waypoint } from "../types/general";
import type { RefObject } from "react";
import useMandelbrotStore from "../hooks/useMandelbrotStore";

/**
 * Updates waypoint position synchronized to the THREE.js canvas.
 */
const WaypointUpdater = (
    { waypoints, markerRefs, rectRef }:
    {
        waypoints: Waypoint[],
        markerRefs: RefObject<Map<string, HTMLDivElement>>,
        rectRef: RefObject<DOMRect | null>
    }
) => {

    /**
     * Calculates the screen-space position of a waypoint marker.
     * @param coordinate The global coordinate of the waypoint.
     * @param zoom The current zoom level of the viewer.
     * @param center The current center coordinate of the viewer.
     * @param rect The DOMRect of the viewer.
     * @returns The calculated waypoint position as a pair.
     */
    const getWaypointPosition = (
        coordinate: [number, number],
        zoom: number,
        center: [number, number],
        rect: DOMRect
    ): [number, number] => {
        if (!rect) return [0, 0];

        const aspect = rect.width / rect.height;

        const nx = (coordinate[0] - center[0]) * (zoom / aspect) + 0.5;

        // Sign flip because [0, 0] is at the top left for my renderer.
        const ny = (-coordinate[1] + center[1]) * zoom + 0.5;

        return [nx * rect.width + rect.left, ny * rect.height + rect.top];
    };

    useFrame(() => {
        const rect = rectRef.current;
        if (!rect) return;

        const s = useMandelbrotStore.getState();
        for (const w of waypoints) {
            const [x, y] = getWaypointPosition(w.location, s.viewState.zoom, s.viewState.center, rect);
            const el = markerRefs.current.get(w.id);
            if (el) el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        }
    });

    return null;
};

export default WaypointUpdater;