import type { Waypoint } from "../types/general";

const WaypointMarker = ({ waypoint, screenPosition }: { waypoint: Waypoint, screenPosition: [number, number]}) => {
    return (
        <div className="waypoint-marker" tabIndex={1} style={{ transform: `translate3d(${screenPosition[0]}px, ${screenPosition[1]}px, 0)`}}>
            <div className="waypoint-marker__body">
                <div className="waypoint-marker__circle"/>
                <div className="waypoint-marker__label">{waypoint.label}</div>
                <div className="waypoint-marker__description">{waypoint.description}</div>
            </div>
        </div>
    );
};

export default WaypointMarker;