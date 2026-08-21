import type { SkillCategory } from "../types/general";

const skills: SkillCategory[] = [
    {
        id: "frontend",
        label: "Frontend Development",
        skills: [
            { id: "react", label: "React", icon: "React", accentColor: "" },
            { id: "typescript", label: "TypeScript", icon: "TypeScript", accentColor: "" },
            { id: "javascript", label: "JavaScript", icon: "JavaScript", accentColor: "" },
            { id: "sass", label: "SCSS", icon: "Sass", accentColor: "" },
            { id: "framermotion", label: "Framer Motion", icon: "FramerMotion", accentColor: "" }, 
        ]
    },
    {
        id: "backend",
        label: "Backend Development",
        skills: [
            { id: "php", label: "PHP", icon: "PHP", accentColor: "" },
            { id: "mysql", label: "MySQL", icon: "MySQL", accentColor: "" },
            { id: "laravel", label: "Laravel", icon: "Laravel", accentColor: "" },
            { id: "express", label: "Express.js", icon: "Express", accentColor: "" },
            { id: "node", label: "Node.js", icon: "NodeJS", accentColor: "" }
        ]
    },
    {
        id: "desktop",
        label: "Desktop Applications",
        skills: [
            { id: "c", label: "C", icon: "C", accentColor: "" },
            { id: "csharp", label: "C#", icon: "CSharp", accentColor: "" },
            { id: "dotnet", label: ".NET", icon: "DotNet", accentColor: "" },
            { id: "tauri", label: "Tauri", icon: "Tauri", accentColor: "" },
            { id: "python", label: "Python", icon: "Python", accentColor: "" }
        ]
    },
    {
        id: "other",
        label: "Other",
        skills: [
            { id: "git", label: "Git", icon: "Git", accentColor: "" },
            { id: "github", label: "GitHub", icon: "GitHub", accentColor: "" },
            { id: "figma", label: "Figma", icon: "Figma", accentColor: "" },
            { id: "postman", label: "Postman", icon: "Postman", accentColor: "" },
            { id: "trello", label: "Trello", icon: "Trello", accentColor: "" }
        ]
    }
];

export default skills;