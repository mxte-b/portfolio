import WaypointPage from "../components/WaypointPage";
import type { WaypointComponentProps } from "../types/general";
import skills from "../data/skills";

const Skills = ({ waypoint, onBack }: WaypointComponentProps) => {
    return (
        <WaypointPage waypoint={waypoint} onBack={onBack}>
            {
                skills.map(c => 
                    <div key={c.id}>
                        {c.label}
                    </div> 
                )
            }
        </WaypointPage>
    );
};

export default Skills;