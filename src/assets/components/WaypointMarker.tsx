import { type Ref } from "react";
import type { Waypoint, WaypointId } from "../types/general";
import { AnimatePresence, motion } from 'motion/react';
import useDevicePreferences from "../hooks/useDevicePreferences";
import useWaypointRouter from "../hooks/useWaypointRouter";

const WaypointMarker = (
    { ref, waypoint, selected, onClick, onCancel, onGo, onComponentExit }: 
    { 
        ref: Ref<HTMLDivElement | null>
        waypoint: Waypoint, 
        selected: boolean,
        onClick: (waypointId: WaypointId) => void,
        onCancel: () => void,
        onGo: (waypointId: WaypointId) => void,
        onComponentExit: () => void
}) => {

    const { activeWaypoint, currentWaypoint, navigate, back } = useWaypointRouter();
    const { prefersReducedMotion } = useDevicePreferences();

    const active = currentWaypoint == waypoint.id;
    const interactable = activeWaypoint == waypoint.id;

    return (
        <div ref={ref} className="waypoint-marker" id={waypoint.id}>
            <div className="waypoint-marker__main">
                <div 
                    className={`waypoint-marker__circle${selected || active ? " selected" : ""}`} 
                    style={{ pointerEvents: interactable ? "none" : "all" }}
                    onClick={() => onClick(waypoint.id)}
                />
            </div>
            <AnimatePresence>
                {
                    selected && !active && 
                    <motion.div 
                        initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.9, x: "-50%"}}
                        animate={{ opacity: 1, scale: 1, x: "-50%" }}
                        exit={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.9, x: "-50%" }}
                        className="waypoint-marker__body"
                    >
                        <div className="waypoint-marker__label">{waypoint.label}</div>
                        <div className="waypoint-marker__description">{waypoint.description}</div>
                        <div className="waypoint-marker__cta">
                            <button className="waypoint-marker__cancel" onClick={onCancel}>Cancel</button>
                            <button className="waypoint-marker__go prominent" onClick={() => {
                                navigate(waypoint.id);
                                onGo(waypoint.id);
                            }}>Go</button>
                        </div>
                    </motion.div>
                }
            </AnimatePresence>
            {
                waypoint.component &&
                <div className="waypoint-component" style={{ pointerEvents: interactable ? "all" : "none" }}>
                    <waypoint.component waypoint={waypoint} onBack={() => {
                        back(waypoint.id);
                        onComponentExit();
                    }} />
                </div>
            }
        </div>
    );
};

export default WaypointMarker;