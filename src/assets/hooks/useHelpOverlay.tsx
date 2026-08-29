import { createContext, useContext, useState, type ReactNode } from "react";
import type { HelpOverlayContextValue } from "../types/general";

const HelpOverlayContext = createContext<HelpOverlayContextValue | undefined>(undefined);

export const HelpOverlayProvider = ({ children } : { children: ReactNode }) => {
    const [visible, setIsVisible] = useState<boolean>(false);

    return <HelpOverlayContext.Provider value={{ visible: visible, setVisible: setIsVisible }}>
        {children}
    </HelpOverlayContext.Provider>
}

const useHelpOverlay = () => {
    const context = useContext(HelpOverlayContext);
    if (!context) throw new Error("useHelpOverlay should only be used inside a HelpOverlayContext.");
    return context;
};

export default useHelpOverlay;