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
     * Moves the view by a specified delta (in global coordinate).
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
     * Resets the view to the default view.
     */
    returnToHome: () => void,
}

/**
 * The collection of available actions on the view state.
 */
export type MandelbrotViewAction = 
    { type: "moveBy",       delta: [number, number] } | 
    { type: "zoomBy",       delta: number } | 
    { type: "setPosition",  position: [number, number] } | 
    { type: "setZoom",      zoom: number };

/**
 * The type of the useMandelbrot hook context.
 */
export type MandelbrotContextType = {
    /** The current view state. */
    viewState: MandelbrotViewState,

    /** The set of methods that transform the view state. */
    controls: MandelbrotControls
};