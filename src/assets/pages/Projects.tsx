import WaypointPage from "../components/WaypointPage";
import type { WaypointComponentProps } from "../types/general";

const Projects = ({ waypoint, onBack }: WaypointComponentProps) => {
    return (
        <WaypointPage waypoint={waypoint} label={"projects"} onBack={onBack}>
            <div>
                asd
            </div>
        </WaypointPage>
    );
};

export default Projects;