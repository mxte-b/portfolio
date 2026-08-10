import type { SmallProject } from "../types/general";
import Icons from "./Icons";

const SmallProjectCard = ({ project }: { project: SmallProject }) => (
    <li className="project-small">
        <div className="project-small__header">
            <h3 className="project-small__title">{project.title}</h3>
            <ul className="project-small__tags" aria-label="Technologies">
                {project.tags.map((tag) => (
                    <li key={tag} className="project-small__tag">{tag}</li>
                ))}
            </ul>
        </div>
        <p className="project-small__description">{project.description}</p>
        <div className="project__bottom">
            {
                project.protected ? 
                    <span key={project.id} className="project__link--static">
                        Code available upon request
                    </span>
                :
                    project.href && 
                    <a
                        key={project.href}
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project__link"
                    >
                        Source
                        <Icons.ArrowUpRight />
                    </a>
            }
        </div>
    </li>
);

export default SmallProjectCard;