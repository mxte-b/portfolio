import { type Ref } from "react";
import type { Waypoint } from "../types/general";
import { AnimatePresence, motion } from 'motion/react';
import useDevicePreferences from "../hooks/useDevicePreferences";

const WaypointMarker = (
    { ref, waypoint, selected, active, interactable, onClick, onCancel, onGo, onComponentExit }: 
    { 
        ref: Ref<HTMLDivElement | null>
        waypoint: Waypoint, 
        selected: boolean,
        active: boolean,
        interactable: boolean,
        onClick: () => void,
        onCancel: () => void,
        onGo: () => void,
        onComponentExit: () => void
    }) => {

    const { prefersReducedMotion } = useDevicePreferences();

    return (
        <div ref={ref} className="waypoint-marker">
            <div className="waypoint-marker__main">
                <div 
                    className={`waypoint-marker__circle${selected ? " selected" : ""}`} 
                    style={{ pointerEvents: interactable ? "none" : "all" }}
                    onClick={onClick}
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
                            <button className="waypoint-marker__go prominent" onClick={onGo}>Go</button>
                        </div>
                    </motion.div>
                }
            </AnimatePresence>
            {
                waypoint.component &&
                <div className="waypoint-component" style={{ pointerEvents: interactable ? "all" : "none" }}>
                    <waypoint.component waypoint={waypoint} onBack={onComponentExit} />
                </div>
            }
        </div>
    );
};

export default WaypointMarker;