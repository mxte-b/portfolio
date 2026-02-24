import { useState } from "react";
import type { Project } from "../types/general";
import { motion } from "motion/react";
import Icons from "./Icons";

const ProjectCard = ({ project, imagePlacement = "left" }: { project: Project, imagePlacement?: "left" | "right" }) => {
    const [expanded, setExpanded] = useState(false);
    const detailsId = `details-${project.title.replace(/\s+/g, "-").toLowerCase()}`;

    return (
        <li className="project" data-image-placement={imagePlacement}>
            {project.image && (
                <img
                    draggable={false}
                    src={project.image}
                    alt={project.imageAlt}
                    className="project__image"
                />
            )}

            <div className="project__body">
                <div className="project__header">
                    <h3 className="project__title">{project.title}</h3>
                    <ul className="project__tags" aria-label="Technologies">
                        {project.tags.map((tag) => (
                            <li key={tag} className="project__tag">{tag}</li>
                        ))}
                    </ul>
                </div>

                <p className="project__description">{project.description}</p>

                {
                    project.details &&
                    <motion.div
                        id={detailsId}
                        layout
                        initial={false}
                        animate={{ height: expanded ? "auto" : 0 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        className="project__details-wrapper"
                    >
                        <div className="project__details">
                            {project.details.map((paragraph, i) => (
                                <p key={i}>{paragraph}</p>
                            ))}
                        </div>
                    </motion.div>
                }

                <div className="project__bottom">
                    {
                        project.details && 
                        <button
                            className="project__expand"
                            onClick={() => setExpanded((p) => !p)}
                            aria-expanded={expanded}
                            aria-controls={detailsId}
                        >
                            <span>{expanded ? "Collapse" : "Read more"}</span>
                            <Icons.ChevronDown className={`project__expand-icon ${expanded ? "expanded" : ""}`} />
                        </button>
                    }
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
            </div>
        </li>
    );
};

export default ProjectCard;