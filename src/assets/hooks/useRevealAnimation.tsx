import { createContext, useContext, useEffect, useRef, type ReactNode } from "react";
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

    useEffect(() => { indexRef.current = 0 }, []);

    return <RevealAnimationContext.Provider value={{
        revealed: revealed,
        acquireDelay: () => indexRef.current++ * stagger + delay
    }}>
        {children}
    </RevealAnimationContext.Provider>
};

/** Provides access to an animation trigger value. Used for Reveal and Stagger components. */
export const useRevealAnimation = (): {
    /** The current animation state. */
    revealed: boolean,
    
    /** The delay (in milliseconds) assigned to the caller component. */
    delay: number
} => {
    const context = useContext(RevealAnimationContext);
    if (context === undefined) throw new Error("useAnimationTrigger must be used inside of an AnimationTriggerProvider.");

    const delayRef = useRef<number | null>(null);

    if (delayRef.current === null) delayRef.current = context.acquireDelay();

    return {
        revealed: context.revealed,
        delay: delayRef.current
    };
}