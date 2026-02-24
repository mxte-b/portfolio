import type { Project } from "../types/general";
import MinorProjectCard from "./MinorProjectCard";
import ProjectCard from "./ProjectCard";

const FEATURED: Project[] = [
    {
        title: "Nebula Manager",
        tags: ["Tauri", "Desktop App"],
        description: "A modern, hassle-free password manager focused on data locality and privacy.",
        image: "/media/nebula_manager.png",
        imageAlt: "Image of the user interface of Nebula Manager",
        details: [
            "My goal with this project was to build a fully-featured password manager I could truly trust with my own credentials.",
            "In contrast to many password managers, this project keeps everything local and puts ownership in the user's hands. It features quality-of-life features, like a quick-access overlay that lets you retrieve any password in seconds.",
        ],
        links: [
            { label: "Source", href: "https://github.com/mxte-b/nebula-manager" },
        ],
    },
    {
        title: "QRay",
        tags: ["C#", "From Scratch"],
        image: "/media/qray.png",
        imageAlt: "Image of the console output of QRay",
        description: "A QR Code Generator made from scratch, using the ISO specification.",
        details: [
            "Implementing QR Code generation was something that I found very interesting, and I have attempted it once before QRay, however I wasn't satisfied with the result.",
            "This is why I gave it another go, and the result was a clean, maintainable and readable C# implementation of the ISO/IEC 18004:2024 spec."
        ],
        links: [
            { label: "Source", href: "https://github.com/mxte-b/QRay" },
        ],
    },
    {
        title: "Fractal Raymarcher",
        tags: ["C++", "SFML", "Raymarching"],
        image: "/media/fractal-sfml.png",
        description: "A real-time fractal explorer with realistic lighting, camera effects, and freecam controls.",
        details: [
            "3D fractals are one of the most beautiful and interesting mathematical shapes, which is why I made a program that lets users explore these fractals.",
            "It uses a rendering technique called raymarching, and implements several image enhancing features, such as temportal AA, Depth-of-Field and soft shadows."
        ],
        links: [
            { label: "Source", href: "https://github.com/mxte-b/fractal-sfml" },
        ],
    },
];

const OTHER: Project[] = [
    {
        title: "AES Encryption",
        tags: ["C#", "From Scratch"],
        description: "A full implementation of the AES Encryption algorithm, written from scratch.",
        links: [
            { label: "Source", href: "https://github.com/mxte-b/AES" },
        ],
    },
    {
        title: "2D Fractal Renderer",
        tags: ["Various languages", "Fractals"],
        description: "I've made several 2D fractal renderers, because I love fractals. That's it.",
        links: [
            { label: "Source", href: "https://github.com/mxte-b/fractalis" },
        ],
    },
    {
        title: "Florens Botanica e-commerce",
        tags: ["End-to-End", "Academic"],
        description: "A fully-featured e-commerce website using PHP backend, and HTML/CSS/JS for the frontend. Made for academic purposes.",
        links: [
            { label: "Code available upon request" },
        ],
    },
];

const Projects = () => {
    return (
        <section className="projects" id="projects">
            <header>
                <span className="idx">3.</span>
                <h2 className="title">Featured Projects</h2>
            </header>

            <ul className="projects__list">
                {FEATURED.map((project, i) => (
                    <ProjectCard key={project.title} imagePlacement={i % 2 === 0 ? "left" : "right"} project={project} />
                ))}
            </ul>

            <div className="projects__other">
                <h3 className="projects__other-header">Other projects</h3>
                <ul className="projects__other-grid">
                    {OTHER.map((project) => (
                        <MinorProjectCard key={project.title} project={project} />
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default Projects;