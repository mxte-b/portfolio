import { useEffect, useRef, useState } from "react";
import useWaypointRouter from "../hooks/useWaypointRouter";
import useMandelbrotStore from "../hooks/useMandelbrotStore";
import type { WaypointId } from "../types/general";
import Icons from "./Icons";
import { motion, type Variants } from "framer-motion";
import useDevicePreferences from "../hooks/useDevicePreferences";

const RecenterButton = () => {
    const { route, controls, flags } = useWaypointRouter();
    const { prefersReducedMotion } = useDevicePreferences();

    const variants: Variants = {
        hidden: {
            opacity: 0,
            y: "calc(100% + 0.5rem)",
            visibility: "hidden",
            transition: { duration: prefersReducedMotion ? 0 : 0.2, ease: "easeInOut" }
        },
        visible: {
            opacity: 1,
            y: 0,
            visibility: "visible",
            transition: { duration: prefersReducedMotion ? 0 : 0.2, ease: "easeInOut" }
        },
    };
    
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const currentWaypointRef = useRef<WaypointId | null>("home");
    const isInFlightRef = useRef<boolean>(false);

    useEffect(() => { currentWaypointRef.current = route.active }, [route.active]);
    useEffect(() => { isInFlightRef.current = flags.isInFlight }, [flags])

    // Show the recenter button when the current viewport is not intersecting the pan limit box,
    // or when the zoom level is above a threshold.
    useEffect(() => {
        let lastCall = 0;
        
        const unsub = useMandelbrotStore.subscribe(s => s.viewState, viewState => {
            const now = performance.now();
            if (now - lastCall > 300) {
                const panLimit = useMandelbrotStore.getState().limits.pan;
                const aspect = window.innerWidth / window.innerHeight;
                const screenWidthHalf = aspect / (2 * viewState.zoom);
                const screenHeightHalf = 1 / (2 * viewState.zoom);

                const viewportOutside = 
                    viewState.center[0] + screenWidthHalf < panLimit.topLeft[0] ||
                    viewState.center[0] - screenWidthHalf > panLimit.bottomRight[0] ||
                    viewState.center[1] - screenHeightHalf > panLimit.topLeft[1] ||
                    viewState.center[1] + screenHeightHalf < panLimit.bottomRight[1];

                const zoomDistance = Math.log(viewState.zoom + 1);
                const visible = viewportOutside || (zoomDistance > 2 && currentWaypointRef.current !== "home" && !isInFlightRef.current);

                setIsVisible(visible);
                lastCall = now;
            }
        });

        return unsub;
    }, []);

    return (
        <motion.button 
            className="button-recenter"
            variants={variants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            onClick={() => controls.navigate("overview")}
        >
            <Icons.GeoAltFill />
            Recenter
        </motion.button>
    );
};

export default RecenterButton;