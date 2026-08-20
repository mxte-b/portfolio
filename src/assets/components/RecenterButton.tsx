import { useEffect, useRef, useState } from "react";
import useWaypointRouter from "../hooks/useWaypointRouter";
import useMandelbrotStore from "../hooks/useMandelbrotStore";
import type { WaypointId } from "../types/general";

const RecenterButton = () => {
    const { currentWaypoint, navigate } = useWaypointRouter();
    
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const currentWaypointRef = useRef<WaypointId | null>("home");

    useEffect(() => { currentWaypointRef.current = currentWaypoint }, [currentWaypoint]);

    useEffect(() => {
        let lastCall = 0;

        const unsub = useMandelbrotStore.subscribe(s => s.viewState.zoom, zoom => {
            const now = performance.now();
            if (now - lastCall > 300) {
                const zoomDistance = Math.log(zoom + 1);
                const visible = zoomDistance > 2 && currentWaypointRef.current !== "home";

                setIsVisible(visible);
                lastCall = now;
            }
        });

        return unsub;
    }, []);

    return (
        <button className={`button-recenter${isVisible ? " visible" : ""}`} onClick={() => navigate("default")}>Recenter</button>
    );
};

export default RecenterButton;