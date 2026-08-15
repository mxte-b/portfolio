import WaypointPage from "../components/WaypointPage";
import type { WaypointComponentProps } from "../types/general";
import projects from "../data/projects.json";
import FeaturedProjectCard from "../components/FeaturedProjectCard";
import SmallProjectCard from "../components/SmallProjectCard";
import Stagger from "../components/Stagger";
import Reveal from "../components/Reveal";

const Projects = ({ waypoint, onBack }: WaypointComponentProps) => {
    return (
        <WaypointPage waypoint={waypoint} onBack={onBack}>
            <div className="project-categories">
                <section className="project-category">
                    <Stagger as="header" className="project-category__header">
                        <h2 className="project-category__title">Featured projects</h2>
                        <p className="project-category__description">These projects are among my best works, and every one of them is open-source.</p>
                    </Stagger>

                    <ul className="project-category__list featured">
                        {projects.featured.map((project, i) =>
                            <Reveal key={`project-${i}`} width="100%">
                                <FeaturedProjectCard key={project.title} imagePlacement={i % 2 == 0 ? "left" : "right"} project={project} />
                            </Reveal>
                        )}
                    </ul>
                </section>

                <section className="project-category">
                    <Stagger as="header" className="project-category__header">
                        <h2 className="project-category__title">Other projects</h2>
                        <p className="project-category__description">Projects which don't have as big of a footprint as the featured ones, but earn themselves a place here.</p>
                    </Stagger>
                    
                    <ul className="project-category__list other">
                        {projects.other.map((project, i) =>
                            <Reveal key={`project-small-${i}`} width="100%" height="100%">
                                <SmallProjectCard key={project.title} project={project} />
                            </Reveal>
                        )}
                    </ul>
                </section>
            </div>
        </WaypointPage>
    );
};

export default Projects;