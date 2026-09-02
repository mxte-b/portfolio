import { create } from "zustand";
import type { MandelbrotState, MandelbrotViewState } from "../types/mandelbrot";
import waypoints from "../data/waypoints";
import { subscribeWithSelector } from "zustand/middleware";

/** Represents the initial view state of the Mandelbrot viewer. */
export const initialViewState: MandelbrotViewState = { 
    center: waypoints.find(x => x.id === "home")?.location ?? [-0.5, 0], 
    zoom: waypoints.find(x => x.id === "home")?.zoom ?? 0.4, 
    iterations: 200 
};

/**
 * Zustand store exposing essential data of the current frame - such as center and zoom value - and functions that modify them.
 */
const useMandelbrotStore = create<MandelbrotState>()(subscribeWithSelector(set => ({
    viewState: initialViewState,
    flags: {
        animationsEnabled: false,
        movementEnabled: false,
    },
    limits: {
        zoom: {
            low: Math.min(window.innerWidth / (window.innerHeight * 2.9), 1 / 2.6, 0.2),
            high: 1e4
        },
        pan: {
            topLeft: [-2, 1],
            bottomRight: [0.5, -1]
        }
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

        setZoomLimitHigh: high => set(s => ({
            limits: { ...s.limits, zoom: { ...s.limits.zoom, high: high } }
        })),

        setAnimationsEnabled: enabled => set(s => ({ flags: {...s.flags, animationsEnabled: enabled } })),

        setMovementEnabled: enabled => set(s => ({ flags: {...s.flags, movementEnabled: enabled } })),
    }
})));

export default useMandelbrotStore;