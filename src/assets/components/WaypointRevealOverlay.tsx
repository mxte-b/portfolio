import { motion } from "motion/react";
import { useRevealState } from "../hooks/useRevealAnimation";
import { useEffect } from "react";

const WaypointRevealOverlay = ({ label }: { label: string }) => {
    const revealed = useRevealState();

    return (
        <motion.div
            className="waypoint-component__overlay"
            initial={{ opacity: 1 }}
        >
            {label}
        </motion.div>
    );
};

export default WaypointRevealOverlay;