import type { Project } from "../types/general";
import Icons from "./Icons";

const MinorProjectCard = ({ project }: { project: Project }) => (
    <li className="project-minor">
        <div className="project-minor__header">
            <h3 className="project-minor__title">{project.title}</h3>
            <ul className="project-minor__tags" aria-label="Technologies">
                {project.tags.map((tag) => (
                    <li key={tag} className="project-minor__tag">{tag}</li>
                ))}
            </ul>
        </div>
        <p className="project-minor__description">{project.description}</p>
        <div className="project__bottom">
            {
                project.links?.map((link) =>
                    link.href ? (
                        <a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project__link"
                        >
                            {link.label}
                            <Icons.ArrowUpRight />
                        </a>
                    ) : (
                        <span key={link.label} className="project__link--static">
                            {link.label}
                        </span>
                    )
                )
            }
        </div>
    </li>
);

export default MinorProjectCard;