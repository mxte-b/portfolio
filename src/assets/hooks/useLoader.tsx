import { createContext, useContext, type ReactNode } from "react";
import type { LoaderContextValue } from "../types/general";
import useFakeProgress from "./useFakeProgress";
import useDevicePreferences from "./useDevicePreferences";

const LOADER_TRANSITION_DURATION = 500;

const LoaderContext = createContext<LoaderContextValue | undefined>(undefined);

export const LoaderProvider = ({ children }: { children: ReactNode }) => {

    const { prefersReducedMotion } = useDevicePreferences();

    const out = useFakeProgress(1200, prefersReducedMotion ? 200 : LOADER_TRANSITION_DURATION, true, [
        { value: 0.2, delay: 0 },
        { value: 0.5, delay: 150 },
        { value: 0.9, delay: 250 }
    ])

    return <LoaderContext.Provider value={{ ...out, cssTransitionDuration: LOADER_TRANSITION_DURATION }}>
        {children}
    </LoaderContext.Provider>
}

const useLoader = () => {
    const context = useContext(LoaderContext);
    if (!context) throw new Error("useLoader should only be used inside a LoaderProvider.");
    return context;
}

export default useLoader;