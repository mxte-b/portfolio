import waypoints from "../data/waypoints";
import useDevicePreferences from "../hooks/useDevicePreferences";
import useWaypointRouter from "../hooks/useWaypointRouter";
import type { WaypointId } from "../types/general";
import { AnimatePresence, motion } from "motion/react";


const WaypointMarkerBody = (
{ 
    waypointId,
    onCancel,
    onGo,
}: { 
    waypointId: WaypointId | null,
    onCancel: () => void,
    onGo: (waypointId: WaypointId) => void,
}) => {

    const { controls } = useWaypointRouter();
    const { prefersReducedMotion } = useDevicePreferences();
    const waypoint = waypoints.find(x => x.id === waypointId);

    return (
        <AnimatePresence mode="wait">
            {
                waypoint && (
                    <motion.div
                        key={waypoint.id}
                        initial={{ height: 0 }}
                        animate={{ height: "auto", transition: { duration: prefersReducedMotion ? 0 : 0.2, ease: "easeInOut" }}}
                        exit={{ height: 0, transition: { duration: prefersReducedMotion ? 0 : 0.2, ease: "easeInOut" } }}
                        className="waypoint-marker__body mobile"
                    >
                        <div className="waypoint-marker__label mobile">{waypoint.label}</div>
                        <div className="waypoint-marker__description mobile">{waypoint.description}</div>
                        <div className="waypoint-marker__cta mobile">
                            <button className="waypoint-marker__cancel" onClick={onCancel}>Cancel</button>
                            <button className="waypoint-marker__go prominent" onClick={() => {
                                controls.navigate(waypoint.id);
                                onGo(waypoint.id);
                            }}>Go</button>
                        </div>
                    </motion.div>
                )
            }
        </AnimatePresence>
    );
};

export default WaypointMarkerBody;