import { useEffect, useRef, useState } from "react";
import useWaypointRouter from "../hooks/useWaypointRouter";
import useMandelbrotStore from "../hooks/useMandelbrotStore";
import type { WaypointId } from "../types/general";
import Icons from "./Icons";

const RecenterButton = () => {
    const { route, controls, flags } = useWaypointRouter();
    
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const currentWaypointRef = useRef<WaypointId | null>("home");
    const isInFlightRef = useRef<boolean>(false);

    useEffect(() => { currentWaypointRef.current = route.active }, [route.active]);
    useEffect(() => { isInFlightRef.current = flags.isInFlight }, [flags])

    useEffect(() => {
        let lastCall = 0;

        const unsub = useMandelbrotStore.subscribe(s => s.viewState.zoom, zoom => {
            const now = performance.now();
            if (now - lastCall > 300) {
                const zoomDistance = Math.log(zoom + 1);
                const visible = zoomDistance > 2 && currentWaypointRef.current !== "home" && !isInFlightRef.current;

                setIsVisible(visible);
                lastCall = now;
            }
        });

        return unsub;
    }, []);

    return (
        <button className={`button-recenter${isVisible ? " visible" : ""}`} onClick={() => controls.navigate("overview")}>
            <Icons.GeoAltFill />
            Recenter
        </button>
    );
};

export default RecenterButton;