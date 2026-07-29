import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { DevicePreferencesContextValue } from "../types/general";

const QUERIES = {
    isTouch: window.matchMedia('(pointer: coarse)'),
    prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)')
}

const DevicePreferencesContext = createContext<DevicePreferencesContextValue | undefined>(undefined);

export const DevicePreferencesProvider = ({ children }: { children: ReactNode }) => {
    const [isTouch, setIsTouch] = useState<boolean>(QUERIES.isTouch.matches);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(QUERIES.prefersReducedMotion.matches);

    useEffect(() => {
        const handlePointerChange = (e: MediaQueryListEvent) => setIsTouch(e.matches);
        const handleReducedMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);

        QUERIES.isTouch.addEventListener("change", handlePointerChange);
        QUERIES.prefersReducedMotion.addEventListener("change", handleReducedMotionChange);

        return () => {
            QUERIES.isTouch.removeEventListener("change", handlePointerChange);
            QUERIES.prefersReducedMotion.removeEventListener("change", handleReducedMotionChange);
        };
    }, []);

    return <DevicePreferencesContext.Provider value={{ isTouch: isTouch, prefersReducedMotion: prefersReducedMotion }}>
        {children}
    </DevicePreferencesContext.Provider>;
}

const useDevicePreferences = () => {
    const context = useContext(DevicePreferencesContext);
    if (!context) throw new Error("usePointerType should only be used inside a PointerTypeProvider.");
    return context;
}

export default useDevicePreferences;