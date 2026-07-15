import type { Waypoint } from "../types/general";

const WaypointMarker = ({ waypoint, screenPosition }: { waypoint: Waypoint, screenPosition: [number, number]}) => {
    return (
        <div className="waypoint__marker" style={{ transform: `translate3d(${screenPosition[0]}px, ${screenPosition[1]}px, 0)`}}>
            <div className="waypoint__circle"/>
            <div className="waypoint__label">{waypoint.label}</div>
            <div className="waypoint__description">{waypoint.description}</div>
        </div>
    );
};

export default WaypointMarker;