import { createContext, useContext, type ReactNode } from "react";
import type { RouterContextValue } from "../types/general";

const RouterContext = createContext<RouterContextValue | undefined>(undefined);

export const RouterProvider = ({ navigate, children }: { navigate: (waypointId: string) => void, children: ReactNode }) => {
    return <RouterContext.Provider value={{ navigate }}>
        {children}
    </RouterContext.Provider>
}

const useRouter = (): {
    navigate: (waypointId: string) => void
} => {
    const context = useContext(RouterContext);
    if (!context) throw new Error("useRouter should only be used inside a RouterProvider.");
    return context;
}

export default useRouter;