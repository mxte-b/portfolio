import { useFrame } from "@react-three/fiber";
import type { Waypoint } from "../types/general";
import type { RefObject } from "react";
import useMandelbrotStore from "../hooks/useMandelbrotStore";
import { clamp } from "../utils/math";

const MARKER_SIZE_HALF = 7.5;
const DEFAULT_ZOOM_LIMIT_HIGH = 1e4;

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

    const setZoomLimitHigh = useMandelbrotStore(s => s.controls.setZoomLimitHigh);

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
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        let zoomLimitHigh = DEFAULT_ZOOM_LIMIT_HIGH;

        for (const w of waypoints) {
            const [x, y] = getWaypointPosition(w.location, s.viewState.zoom, s.viewState.center, rect);
            const el = markerRefs.current.get(w.id);
            
            if (el) {
                const zoomRatio = clamp(s.viewState.zoom / w.zoom, 0, 10);
                const screenWidthHalf = viewportWidth * zoomRatio / 2;
                const screenHeightHalf = viewportHeight * zoomRatio / 2;

                // If the component is smaller than the marker circle then we don't
                // have to do AABB testing for it.
                if (screenWidthHalf < MARKER_SIZE_HALF && screenHeightHalf < MARKER_SIZE_HALF) {
                    el.classList.add("component-hidden");

                    const circleOutside = 
                        x < -MARKER_SIZE_HALF || 
                        x > viewportWidth + MARKER_SIZE_HALF || 
                        y < -MARKER_SIZE_HALF || 
                        y > viewportHeight + MARKER_SIZE_HALF;

                    // Marker circle AABB testing
                    el.classList[circleOutside ? "add" : "remove"]("hidden");
                    if (circleOutside) continue;
                }
                else {
                    const componentOutside = 
                        x < -screenWidthHalf || 
                        x > viewportWidth + screenWidthHalf || 
                        y < -screenHeightHalf || 
                        y > viewportHeight + screenHeightHalf;

                    // Component AABB testing
                    el.classList[componentOutside ? "add" : "remove"]("hidden", "component-hidden");
                    if (componentOutside) continue;
                    else zoomLimitHigh = w.zoom;
                }

                el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
                el.style.setProperty("--proximity-scale", `${zoomRatio}`);
                el.style.setProperty("--proximity-opacity", `${clamp(Math.pow(zoomRatio, 0.5), 0, 1)}`);
            }
        }

        if (s.limits.zoom.high !== zoomLimitHigh) {
            setZoomLimitHigh(zoomLimitHigh);
        }
    });

    return null;
};

export default WaypointUpdater;