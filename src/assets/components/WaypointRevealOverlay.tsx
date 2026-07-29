import { motion } from "motion/react";

const WaypointRevealOverlay = ({ label }: { label: string }) => {
    return (
        <motion.div
            className="waypoint-component__reveal"
            initial={{ opacity: 1 }}
        >
            {label}
        </motion.div>
    );
};

export default WaypointRevealOverlay;