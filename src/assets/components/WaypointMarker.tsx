import { useEffect } from "react";
import type { Waypoint } from "../types/general";
import { AnimatePresence, motion } from 'motion/react';

const WaypointMarker = (
    { waypoint, screenPosition, selected, onClick, onCancel, onGo }: 
    { 
        waypoint: Waypoint, 
        screenPosition: [number, number], 
        selected: boolean,
        onClick: () => void,
        onCancel: () => void,
        onGo: () => void
    }) => {

    useEffect(() => {
        console.log(selected)
    }, [selected])

    return (
        <div className="waypoint-marker" tabIndex={1} style={{ transform: `translate3d(${screenPosition[0]}px, ${screenPosition[1]}px, 0)`}}>
            <div className="waypoint-marker__main">
                <div className={`waypoint-marker__circle${selected ? " selected" : ""}`} onClick={onClick}/>
            </div>
            <AnimatePresence>
                {
                    selected && 
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9, x: "-50%"}}
                        animate={{ opacity: 1, scale: 1, x: "-50%" }}
                        exit={{ opacity: 0, scale: 0.9, x: "-50%" }}
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
        </div>
    );
};

export default WaypointMarker;