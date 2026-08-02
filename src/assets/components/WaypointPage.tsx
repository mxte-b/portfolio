import { useEffect, useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { RevealAnimationProvider } from "../hooks/useRevealAnimation";
import type { Waypoint } from "../types/general";
import WaypointHeader from "./WaypointHeader";
import WaypointRevealOverlay from "./WaypointRevealOverlay";

const REVEAL_DURATION = 800;

const WaypointPage = (
    { 
        waypoint, 
        label, 
        onBack, 
        children 
    }: 
    { 
        waypoint: Waypoint, 
        label: string,
        onBack: () => void,
        children: ReactNode, 
    }
) => {
    const [revealed, setRevealed] = useState<boolean>(false);

    useEffect(() => {
        const handleEnter = (e: CustomEvent<{ waypointId: string }>) => {
            if (e.detail.waypointId === waypoint.id) {
                setRevealed(true);
            }
        }

        window.addEventListener("component-enter", handleEnter);

        return () => window.removeEventListener("component-enter", handleEnter);
    }, []);

    return (
        <RevealAnimationProvider revealed={revealed} stagger={50} delay={REVEAL_DURATION}>
            <WaypointRevealOverlay label={waypoint.label + '.'} duration={REVEAL_DURATION} />
            <motion.main className={label} id={label}>
                <WaypointHeader waypoint={waypoint} onBack={onBack} />
                <div className="waypoint-component__content">
                    {children}
                </div>
            </motion.main>
        </RevealAnimationProvider>
    );
};

export default WaypointPage;