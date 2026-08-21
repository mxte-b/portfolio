import type { Waypoint } from "../types/general";
import { lazy } from "react";

const waypoints: Waypoint[] = [
    {
        id: "aboutMe",
        label: "About me",
        description: "An overview of my background and interests.",
        location: [-0.81, -0.2025],
        zoom: 670,
        component: lazy(() => import("../pages/AboutMe"))
    },
    {
        id: "artworks",
        label: "Artworks",
        description: "A gallery of my renders and artistic images.",
        location: [0.32938, 0.039648],
        zoom: 1154,
        component: lazy(() => import("../pages/Artworks"))
    },
    {
        id: "skills",
        label: "Skills",
        description: "An overview of my programming skills.",
        location: [-1.77577, -0.00631],
        zoom: 540,
        component: lazy(() => import("../pages/Skills"))
    },
    { 
        id: "projects",
        label: "Projects",
        description: "See my past projects and software that I've built.",
        location: [-0.73979, 0.29075],
        zoom: 712,
        component: lazy(() => import("../pages/Projects"))
    },
    {
        id: "home",
        label: "Home",
        description: "What normally is the top of the page.",
        location: [-0.92347, 0.293],
        zoom: 2360,
        component: lazy(() => import("../pages/Hero"))
    },
];

export default waypoints;