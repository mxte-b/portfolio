// import * as THREE from 'three';
import Lenis from "lenis";
import MandelbrotView from '../components/MandelbrotView';
import { Canvas } from '@react-three/fiber';
import { Suspense, useRef, useState } from 'react';
import WaypointOverlay from "../components/WaypointOverlay";

declare global {
    interface Window {
        lenis: Lenis;
    }
}

const Portfolio = () => {
    const [movementEnabled, setMovementEnabled] = useState<boolean>(true);
    const [animationsEnabled, setAnimationsEnabled] = useState<boolean>(true);

    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    return (
        <div className="main">
            <Canvas ref={canvasRef} className="viewer" frameloop="demand">
                <Suspense fallback={<div>LOading</div>}>
                    <MandelbrotView movementEnabled={movementEnabled} animationsEnabled={animationsEnabled} />
                    {/* <Stats /> */}
                </Suspense>
            </Canvas>
            <WaypointOverlay waypoints={[{ id: "asd", label: "teszt", description: "asd", location: [-0.75, 0], zoom: 100}]} canvasRef={canvasRef}/>
            <div className="hero">
                <div className="hero__title">mate blank</div>
                <button onClick={() => setMovementEnabled(p => !p)}>Toggle movement</button>
                <button onClick={() => setAnimationsEnabled(p => !p)}>Toggle animations</button>
            </div>
        </div>
    )
}

export default Portfolio;