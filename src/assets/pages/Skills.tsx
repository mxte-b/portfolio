import WaypointPage from "../components/WaypointPage";
import type { WaypointComponentProps } from "../types/general";
import skills from "../data/skills";
import DevIcons from "../components/DevIcons";
import type { CSSProperties } from "react";
import Stagger from "../components/Stagger";

const Skills = ({ waypoint, onBack }: WaypointComponentProps) => {
    return (
        <WaypointPage waypoint={waypoint} onBack={onBack}>
            <div className="skills">
                {
                    skills.map((c, i) => 
                        <Stagger className="skills__category" key={c.id}>
                            <div className="skill-category__header">
                                <p className="skill-category__index">{`${i + 1}`.padStart(2, '0')}</p>
                                <h2 className="skill-category__label">{c.label}</h2>
                            </div>
                            <ul className="skill-category__items">
                                {
                                    c.skills.map(s => {
                                        const Icon = DevIcons[s.icon];

                                        return (
                                            <li className="skill" key={s.id} style={{"--skill-accent": s.accentColor} as CSSProperties}>
                                                <Icon className="skill__icon"/>
                                                <p className="skill__label">{s.label}</p>
                                            </li>
                                        );
                                    })
                                }
                            </ul>
                        </Stagger> 
                    )
                }
            </div>
        </WaypointPage>
    );
};

export default Skills;