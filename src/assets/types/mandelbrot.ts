/**
 * Represents the view state of the mandelbrot viewer.
 */
export type MandelbrotViewState = {
    center: [number, number],
    zoom: number,
    iterations: number
}

/**
 * The collection of available actions on the view state.
 */
export type MandelbrotViewAction = 
    { type: "moveBy",       delta: [number, number] } | 
    { type: "zoomBy",       delta: number } | 
    { type: "setPosition",  position: [number, number] } | 
    { type: "setZoom",      zoom: number };