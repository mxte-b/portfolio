import type { WaypointComponentProps } from "../types/general";

const Artworks = ({ waypoint, onBack }: WaypointComponentProps) => {
    return (
        <div>
            <button onClick={onBack}>Back</button>
            <h1>Artworks</h1>
        </div>
    );
};

export default Artworks;