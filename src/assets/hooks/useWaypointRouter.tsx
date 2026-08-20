import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import type { WaypointId, WaypointRouterContextValue } from "../types/general";
import ComponentEvent from "../utils/componentEvent";
import waypoints from "../data/waypoints";
import useDevicePreferences from "./useDevicePreferences";
import Animator, { interpolateView } from "../utils/animator";
import useMandelbrotStore from "./useMandelbrotStore";
import { clamp } from "../utils/math";
import useLoader from "./useLoader";

const WaypointRouterContext = createContext<WaypointRouterContextValue | undefined>(undefined);

export const WaypointRouterProvider = ({ children }: { children: ReactNode }) => {
    const { cssTransitionDuration, start } = useLoader();
    const { prefersReducedMotion } = useDevicePreferences();
    const { moveTo, setMovementEnabled, setAnimationsEnabled } = useMandelbrotStore(s => s.controls);

    const [currentWaypoint, setCurrentWaypoint]             = useState<WaypointId | null>("home");
    const [activeWaypoint, setActiveWaypoint]               = useState<WaypointId | null>("home");
    const [isInFlight, setIsInFlight]                       = useState<boolean>(false);
    
    const inFlightRef = useRef<boolean>(false);

    const setInFlight = (value: boolean) => {
        inFlightRef.current = value;
        setIsInFlight(value);
    }

    /**
     * Smoothly travels to the waypoint location. Handles reduced motion preferences by using a loader instead.
     * @param waypoint The waypoint to travel to.
     */
    const travelTo = (location: [number, number], zoom: number, onTargetReached?: () => void) => {
        if (inFlightRef.current) return;

        setInFlight(true);

        if (prefersReducedMotion) {
            start();
            setTimeout(() => {
                setInFlight(false);
                moveTo(location, zoom); 
                onTargetReached?.();
            }, cssTransitionDuration);
            return;
        }

        const state = useMandelbrotStore.getState().viewState;

        const path = interpolateView(
            { center: state.center, width: 1 / state.zoom }, 
            { center: location, width: 1 / zoom },
        );

        const animationTime = clamp(path.timeToComplete, 0.5, 10);
        let timeAnimator = new Animator<number>(0, 1, animationTime * 1000, "easeInOut");
        
        const animate = () => {
            const t = timeAnimator.getValue() * path.S;

            moveTo(path.c(t), 1 / path.w(t));

            if (timeAnimator.isDone()) {
                setInFlight(false);
                onTargetReached?.();
            }
            else {
                requestAnimationFrame(animate);
            }
        }
        
        requestAnimationFrame(animate);
    }

    /** Smoothly returns to the initial view. */
    const home = (
        onNavigationStart?: (id: WaypointId | "overview") => void,
        onNavigationEnd?: (id: WaypointId | "overview") => void
    ) => {
        if (inFlightRef.current) return;

        if (activeWaypoint !== null) window.dispatchEvent(new ComponentEvent("exit", activeWaypoint));

        setActiveWaypoint(null);
        setCurrentWaypoint(null);
        setAnimationsEnabled(!prefersReducedMotion)
        onNavigationStart?.("overview");
        
        // Travel to default view, taking into consideration view size.
        const [w, h] = [window.innerWidth, window.innerHeight];
        const [targetWidth, targetHeight] = [2.9, 2.6];

        const zw = w / (h * targetWidth);
        const zh = 1 / targetHeight;
         
        travelTo(w > h ? [-0.5, 0] : [-0.75, 0], Math.min(zw, zh), () => {
            setMovementEnabled(true);
            onNavigationEnd?.("overview");
        });
    }

    const navigate = (
        id: WaypointId | "overview", 
        onNavigationStart?: (id: WaypointId | "overview") => void,
        onNavigationEnd?: (id: WaypointId | "overview") => void,
    ) => {
        if (inFlightRef.current || activeWaypoint === id) return;

        if (id === "overview") {
            return home(onNavigationStart, onNavigationEnd);
        }

        const target = waypoints.find(x => x.id === id);
        if (!target) return;

        if (activeWaypoint !== null) window.dispatchEvent(new ComponentEvent("exit", id));

        setCurrentWaypoint(id);
        setActiveWaypoint(null);
        setAnimationsEnabled(!prefersReducedMotion);
        setMovementEnabled(false);
        onNavigationStart?.(id);

        travelTo(target.location, target.zoom, () => { 
            setAnimationsEnabled(false);
            setActiveWaypoint(id);
            onNavigationEnd?.(id);
            
            window.dispatchEvent(new ComponentEvent("enter", id));
        }); 
    }

    const back = () => {
        if (!activeWaypoint) return;
        window.dispatchEvent(new ComponentEvent("exit", activeWaypoint));

        const target = waypoints.find(x => x.id === activeWaypoint);
        if (!target) return;

        setActiveWaypoint(null);
        setCurrentWaypoint(null);
        setAnimationsEnabled(!prefersReducedMotion);

        travelTo(target.location, target.zoom * 0.8, () => setMovementEnabled(true));
    }

    // Automatically adjust based on a change in the prefers reduced motion setting.
    useEffect(() => { if (!activeWaypoint) setAnimationsEnabled(!prefersReducedMotion) }, [prefersReducedMotion])

    return <WaypointRouterContext.Provider value={
        {
            route: {
                target: currentWaypoint,
                active: activeWaypoint
            },
            controls: {
                navigate: navigate,
                back: back,
            },
            flags: {
                isInFlight: isInFlight
            }
        }
    }>
        {children}
    </WaypointRouterContext.Provider>
}

/** Provides navigation between waypoints with view interpolation. */
const useWaypointRouter = () => {
    const context = useContext(WaypointRouterContext);
    if (!context) throw new Error("useWaypointRouter should only be used inside a WaypointRouterProvider.");
    return context;
}

export default useWaypointRouter;