import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { PointerTypeContextValue } from "../types/general";

const PointerTypeContext = createContext<PointerTypeContextValue | undefined>(undefined);



export const PointerTypeProvider = ({ children }: { children: ReactNode }) => {
    const [isTouch, setIsTouch] = useState<boolean>(window.matchMedia('(pointer: coarse)').matches);

    useEffect(() => {
        const query = window.matchMedia('(pointer: coarse)');

        const handleChange = (result: MediaQueryListEvent) => setIsTouch(result.matches);

        query.addEventListener("change", handleChange);

        return () => query.removeEventListener("change", handleChange);
    }, []);

    return <PointerTypeContext.Provider value={{ isTouch: isTouch }}>
        {children}
    </PointerTypeContext.Provider>;
}

const usePointerType = () => {
    const context = useContext(PointerTypeContext);
    if (!context) throw new Error("usePointerType should only be used inside a PointerTypeProvider.");
    return context;
}

export default usePointerType;