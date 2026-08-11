import Hero from "../components/Hero";
import AboutMe from "../pages/AboutMe";
import Artworks from "../pages/Artworks";
import Contact from "../pages/Contact";
import Projects from "../pages/Projects";
import type { Waypoint } from "../types/general";

const waypoints: Waypoint[] = [
    {
        id: "home",
        label: "Home",
        description: "What normally is the top of the page.",
        location: [-0.92347, 0.29193],
        zoom: 2370,
        component: Hero
    },
    {
        id: "aboutMe",
        label: "About me",
        description: "An overview of my background and interests.",
        location: [-0.81, -0.2025],
        zoom: 670,
        component: AboutMe
    },
    {
        id: "artworks",
        label: "Artworks",
        description: "A gallery of my renders and artistic images.",
        location: [0.32938, 0.039648],
        zoom: 1154,
        component: Artworks
    },
    {
        id: "contact",
        label: "Contact",
        description: "An overview of my contact methods.",
        location: [-1.77577, -0.00631],
        zoom: 540,
        component: Contact
    },
    { 
        id: "projects",
        label: "Projects",
        description: "See my past projects and software that I've built.",
        location: [-0.73979, 0.29075],
        zoom: 712,
        component: Projects
    }
];

export default waypoints;