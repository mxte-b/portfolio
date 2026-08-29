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
     * Sets the current high zoom limit.
     * @param limit The desired limit value. 
     */
    setZoomLimitHigh: (limit: number) => void,

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

/** Represents the flags used in the renderer. */
export type MandelbrotFlags = {
    /** Indicates whether animations are enabled or disabled. */
    animationsEnabled: boolean,

    /** Indicates whether animations are enabled or disabled. */
    movementEnabled: boolean,
}

/** Represents the limits of the renderer. */
export type MandelbrotLimits = {
    /** Limits the extent of zooming. */
    zoom: {
        /** The lower zoom limit. */
        low: number,

        /** The upper zoom limit. */
        high: number,
    }

    /** Limits the extent of panning. */
    pan: {
        /** The top left corner of the panning box in global coordinates. */
        topLeft: [number, number],

        /** The bottom right corner of the panning box in global coordinates. */
        bottomRight: [number, number]
    }
}

/**
 * The type of the useMandelbrotStore hook.
 */
export type MandelbrotState = {
    /** The current view state. */
    viewState: MandelbrotViewState,

    /** The set of flags that modify the behaviour of the renderer. */
    flags: MandelbrotFlags,

    /** The set of limits that control the movement of the camera. */
    limits: MandelbrotLimits,

    /** The set of methods that transform the view state. */
    controls: MandelbrotControls
};