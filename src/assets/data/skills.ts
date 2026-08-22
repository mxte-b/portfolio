import type { SkillCategory } from "../types/general";

const skills: SkillCategory[] = [
    {
        id: "frontend",
        label: "Frontend Development",
        skills: [
            { id: "react", label: "React", icon: "React", accentColor: "#61dafb" },
            { id: "typescript", label: "TypeScript", icon: "TypeScript", accentColor: "#007acc" },
            { id: "javascript", label: "JavaScript", icon: "JavaScript", accentColor: "#f0db4f" },
            { id: "sass", label: "SCSS", icon: "Sass", accentColor: "#cb6699" },
            { id: "framermotion", label: "Framer Motion", icon: "FramerMotion", accentColor: "#ffffff" }, 
        ]
    },
    {
        id: "backend",
        label: "Backend Development",
        skills: [
            { id: "php", label: "PHP", icon: "PHP", accentColor: "#777bb3" },
            { id: "mysql", label: "MySQL", icon: "MySQL", accentColor: "#00618a" },
            { id: "laravel", label: "Laravel", icon: "Laravel", accentColor: "#f0513f" },
            { id: "express", label: "Express.js", icon: "Express", accentColor: "#ffffff" },
            { id: "node", label: "Node.js", icon: "NodeJS", accentColor: "#5fa04e" }
        ]
    },
    {
        id: "desktop",
        label: "Desktop Applications",
        skills: [
            { id: "c", label: "C", icon: "C", accentColor: "#a9bacd" },
            { id: "csharp", label: "C#", icon: "CSharp", accentColor: "#68217a" },
            { id: "dotnet", label: ".NET", icon: "DotNet", accentColor: "#1384c8" },
            { id: "tauri", label: "Tauri", icon: "Tauri", accentColor: "#ffc131" },
            { id: "python", label: "Python", icon: "Python", accentColor: "#ffd845" }
        ]
    },
    {
        id: "other",
        label: "Other",
        skills: [
            { id: "git", label: "Git", icon: "Git", accentColor: "#f34f29" },
            { id: "github", label: "GitHub", icon: "GitHub", accentColor: "#ffffff" },
            { id: "figma", label: "Figma", icon: "Figma", accentColor: "#a259ff" },
            { id: "postman", label: "Postman", icon: "Postman", accentColor: "#f37036" },
            { id: "trello", label: "Trello", icon: "Trello", accentColor: "#0052cc" }
        ]
    }
];

export default skills;