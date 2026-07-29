import WaypointPage from "../components/WaypointPage";
import type { WaypointComponentProps } from "../types/general";

const Goals = ({ waypoint, onBack }: WaypointComponentProps) => {
    return (
        <WaypointPage waypoint={waypoint} label={"goals"} onBack={onBack}>
            <div>
                asd
            </div>
        </WaypointPage>
    );
};

export default Goals;