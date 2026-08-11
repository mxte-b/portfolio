import { createContext, useContext, useRef, type ReactNode } from "react";
import type { RevealAnimationContextValue } from "../types/general";

const RevealAnimationContext = createContext<RevealAnimationContextValue | undefined>(undefined);

export const RevealAnimationProvider = (
    { revealed, stagger, delay = 0, children }: 
    { 
        revealed: boolean, 
        stagger: number, 
        delay?: number,
        children: ReactNode 
    }
) => {
    const indexRef = useRef<number>(0);
    const delayMapRef = useRef<Map<string, number>>(new Map());

    return <RevealAnimationContext.Provider value={{
        revealed: revealed,
        acquireDelay: (id: string | undefined) => {
            if (!id) return indexRef.current++ * stagger + delay;

            if (!delayMapRef.current.has(id)) {
                delayMapRef.current.set(id, indexRef.current++ * stagger + delay);
            }

            return delayMapRef.current.get(id)!;
        }
    }}>
        {children}
    </RevealAnimationContext.Provider>
};

/** Provides access to an animation trigger value. */
export const useRevealState = () => {
    const context = useContext(RevealAnimationContext);
    if (context === undefined) throw new Error("useAnimationTrigger must be used inside of an AnimationTriggerProvider.");

    return context.revealed;
}

/** 
 * Provides access to an animation trigger value and an assigned delay. 
 * Used for Reveal and Stagger components. 
 */
export const useRevealAnimation = (id: string | undefined = undefined): {
    /** The current animation state. */
    revealed: boolean,
    
    /** The delay (in milliseconds) assigned to the caller component. */
    delay: number
} => {
    const context = useContext(RevealAnimationContext);
    if (context === undefined) throw new Error("useAnimationTrigger must be used inside of an AnimationTriggerProvider.");

    const delayRef = useRef<number | null>(null);

    if (delayRef.current === null) delayRef.current = context.acquireDelay(id);

    return {
        revealed: context.revealed,
        delay: delayRef.current
    };
}