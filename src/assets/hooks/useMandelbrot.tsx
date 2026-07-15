import { createContext, useContext, useReducer, type ReactNode } from "react";
import type { MandelbrotContextType, MandelbrotViewAction, MandelbrotViewState } from "../types/mandelbrot";

const MandelbrotContext = createContext<MandelbrotContextType | undefined>(undefined);

const reducer = (state: MandelbrotViewState, action: MandelbrotViewAction): MandelbrotViewState => {
    switch (action.type) {
        case "moveBy":
            return { 
                ...state, 
                center: [
                    state.center[0] + action.delta[0],
                    state.center[1] + action.delta[1],
                ]
            }
        case "zoomBy":
            return { 
                ...state, 
                zoom: state.zoom + action.delta
            }
        case "setPosition":
            return { 
                ...state, 
                center: action.position
            }
        case "setZoom":
            return { 
                ...state, 
                zoom: action.zoom
            }
    }
}

export const MandelbrotProvider = ({ children }: { children: ReactNode }) => {
    const initialState: MandelbrotViewState = { center: [-0.5, 0], zoom: 0.4, iterations: 200 };

    const [state, dispatch] = useReducer(reducer, initialState);

    /**
     * Returns smoothly to the default location.
     */
    const returnToHome = () => dispatch({ type: "setPosition", position: initialState.center });

    /**
     * Moves to a specified location at a specified zoom value.
     * @param target The target location to move to.
     * @param targetZoom The target zoom value.
     */
    const moveTo = (target: [number, number], targetZoom: number) => {
        dispatch({ type: "setPosition", position: target });
        dispatch({ type: "setZoom", zoom: targetZoom });
    }

    /**
     * Moves the view by a specified delta (in global coordinate).
     * @param delta The amount to move the view by.
     */
    const moveBy = (delta: [number, number]) => dispatch({ type: "moveBy", delta: delta });

    /**
     * Adjusts the current zoom value by a given delta.
     * @param delta The amount of change to be applied.
     */
    const zoomBy = (delta: number) => dispatch({ type: "zoomBy", delta: delta });

    const setZoom = (zoom: number) => dispatch({ type: "setZoom", zoom: zoom });

    return <MandelbrotContext.Provider value={{
        viewState: state,
        controls: {
            moveTo: moveTo,
            moveBy: moveBy,
            zoomBy: zoomBy,
            setZoom: setZoom,
            returnToHome: returnToHome,
        }
    }}>
        {children}
    </MandelbrotContext.Provider>
}
 
const useMandelbrot = () => {
    const context = useContext(MandelbrotContext);
    if (!context) throw new Error("useMandelbrot should only be used inside of a MandelbrotProvider.")
    return context;
}

export default useMandelbrot;