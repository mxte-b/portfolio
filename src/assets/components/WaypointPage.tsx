import { useEffect, useState, type ReactNode } from "react";
import { RevealAnimationProvider } from "../hooks/useRevealAnimation";
import type { Waypoint } from "../types/general";
import WaypointHeader from "./WaypointHeader";
import WaypointRevealOverlay from "./WaypointRevealOverlay";
import type ComponentEvent from "../utils/componentEvent";

const REVEAL_DURATION = 800;

const WaypointPage = (
    { 
        waypoint, 
        onBack, 
        children 
    }: 
    { 
        waypoint: Waypoint, 
        onBack: () => void,
        children: ReactNode, 
    }
) => {
    const [revealed, setRevealed] = useState<boolean>(false);

    useEffect(() => {
        const handleEnter = (e: ComponentEvent) => {
            if (e.waypointId === waypoint.id) {
                setRevealed(true);
            }
        }

        window.addEventListener("component-enter", handleEnter);

        return () => window.removeEventListener("component-enter", handleEnter);
    }, []);

    return (
        <RevealAnimationProvider revealed={revealed} stagger={50} delay={REVEAL_DURATION}>
            <WaypointRevealOverlay label={waypoint.label + '.'} duration={REVEAL_DURATION} />
            <main>
                <WaypointHeader waypoint={waypoint} onBack={onBack} />
                <div className="waypoint-component__content">
                    {children}
                </div>
            </main>
        </RevealAnimationProvider>
    );
};

export default WaypointPage;