// import * as THREE from 'three';
import Lenis from "lenis";
import MandelbrotView from '../components/MandelbrotView';
import { Canvas } from '@react-three/fiber';
import { Suspense, useRef, useState } from 'react';
import WaypointOverlay from "../components/WaypointOverlay";
import type { Waypoint } from "../types/general";
import { Stats } from "@react-three/drei";

declare global {
    interface Window {
        lenis: Lenis;
    }
}

const waypoints: Waypoint[] = [
    {
        id: "aboutMe",
        label: "About Me",
        description: "An overview of my background and interests.",
        location: [-0.81, -0.2025],
        zoom: 670
    },
    {
        id: "artworks",
        label: "Artworks",
        description: "A gallery of my renders and artistic images.",
        location: [0.32938, 0.039648],
        zoom: 1154
    },
    { 
        id: "projects",
        label: "Projects",
        description: "See my past projects and software that I've built.",
        location: [-0.73979, 0.29075],
        zoom: 712
    },
    {
        id: "goals",
        label: "Goals",
        description: "A look into my future projects and plans.",
        location: [-1.77577, -0.00631],
        zoom: 540
    }
]

const Portfolio = () => {
    const [movementEnabled, setMovementEnabled] = useState<boolean>(true);
    const [animationsEnabled, setAnimationsEnabled] = useState<boolean>(true);

    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    return (
        <div className="main">
            <Canvas ref={canvasRef} className="viewer" frameloop="demand" dpr={1}>
                <MandelbrotView movementEnabled={movementEnabled} animationsEnabled={animationsEnabled} />
            </Canvas>
            <WaypointOverlay waypoints={waypoints} canvasRef={canvasRef}/>
            <div className="hero">
                <div className="hero__title">mate blank</div>
                <button onClick={() => setMovementEnabled(p => !p)}>Toggle movement</button>
                <button onClick={() => setAnimationsEnabled(p => !p)}>Toggle animations</button>
            </div>
        </div>
    )
}

export default Portfolio;