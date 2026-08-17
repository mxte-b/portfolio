import { create } from "zustand";
import type { MandelbrotStore, MandelbrotViewState } from "../types/mandelbrot";
import waypoints from "../data/waypoints";

/** Represents the initial view state of the Mandelbrot viewer. */
export const initialViewState: MandelbrotViewState = { 
    center: waypoints.find(x => x.id === "home")?.location ?? [-0.5, 0], 
    zoom: waypoints.find(x => x.id === "home")?.zoom ?? 0.4, 
    iterations: 200 
};

/**
 * Zustand store exposing essential data of the current frame - such as center and zoom value - and functions that modify them.
 */
const useMandelbrotStore = create<MandelbrotStore>()(set => ({
    viewState: initialViewState,
    flags: {
        animationsEnabled: false,
        movementEnabled: false,
    },
    controls: {
        moveTo: (target, targetZoom) => set(s => ({ 
            viewState: { ...s.viewState, center: target, zoom: targetZoom }
        })),

        moveBy: delta => set(s => ({
            viewState: { ...s.viewState, center: [s.viewState.center[0] + delta[0], s.viewState.center[1] - delta[1]] }
        })),

        zoomBy: delta => set(s => ({
            viewState: { ...s.viewState, zoom: s.viewState.zoom + delta }
        })),

        setZoom: zoom => set(s => ({ 
            viewState: { ...s.viewState, zoom: zoom }
        })),

        setAnimationsEnabled: enabled => set(s => ({ flags: {...s.flags, animationsEnabled: enabled} })),

        setMovementEnabled: enabled => set(s => ({ flags: {...s.flags, movementEnabled: enabled} })),
    }
}));

export default useMandelbrotStore;