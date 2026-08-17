/**
 * Represents the view state of the mandelbrot viewer.
 */
export interface MandelbrotViewState {
    center: [number, number],
    zoom: number,
    iterations: number
}

export interface MandelbrotControls {
    /**
     * Moves to a specified location at a specified zoom value.
     * @param target The target location to move to.
     * @param targetZoom The target zoom value.
     */
    moveTo: (target: [number, number], targetZoom: number) => void,

    /**
     * Moves the view by a specified delta (in world coordinates).
     * @param delta The amount to move the view by.
     */
    moveBy: (delta: [number, number]) => void,

    /**
     * Adjusts the current zoom value by a given delta.
     * @param delta The amount of change to be applied.
     */
    zoomBy: (delta: number) => void,

    /**
     * Sets the current zoom value.
     * @param zoom The desired zoom value.
     */
    setZoom: (zoom: number) => void,

    /**
     * Changes whether animations are enabled or disabled.
     * @param enabled True if enabled, false if not.
     */
    setAnimationsEnabled: (enabled: boolean) => void,

    /**
     * Changes whether movement is enabled or disabled.
     * @param enabled True if enabled, false if not.
     */
    setMovementEnabled: (enabled: boolean) => void,
}

/**
 * The collection of available actions on the view state.
 */
export type MandelbrotViewAction = 
    { type: "moveBy",       delta: [number, number] } | 
    { type: "zoomBy",       delta: number } | 
    { type: "setPosition",  position: [number, number] } | 
    { type: "setZoom",      zoom: number };

/** Represents the flags used in the renderer. */
export type MandelbrotFlags = {
    /** Indicates whether animations are enabled or disabled. */
    animationsEnabled: boolean,

    /** Indicates whether animations are enabled or disabled. */
    movementEnabled: boolean,
}

/**
 * The type of the useMandelbrotStore hook.
 */
export type MandelbrotStore = {
    /** The current view state. */
    viewState: MandelbrotViewState,

    flags: MandelbrotFlags,

    /** The set of methods that transform the view state. */
    controls: MandelbrotControls
};