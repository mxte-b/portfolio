import WaypointPage from "../components/WaypointPage";
import type { WaypointComponentProps } from "../types/general";

const Artworks = ({ waypoint, onBack }: WaypointComponentProps) => {
    return (
        <WaypointPage waypoint={waypoint} label={"artworks"} onBack={onBack}>
            <div>
                asd
            </div>
        </WaypointPage>
    );
};

export default Artworks;