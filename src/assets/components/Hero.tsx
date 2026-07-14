import * as THREE from 'three';
import MandelbrotView from './MandelbrotView';
import { Canvas } from '@react-three/fiber';
import { Stats } from '@react-three/drei';
import { useState } from 'react';

const Hero = () => {
    const [movementEnabled, setMovementEnabled] = useState<boolean>(true);
    const [animationsEnabled, setAnimationsEnabled] = useState<boolean>(true);

    return (
        <div className="hero">
            <Canvas className="hero__background" dpr={1} frameloop="demand">
                <MandelbrotView movementEnabled={movementEnabled} animationsEnabled={animationsEnabled} />
                <Stats />
            </Canvas>
            <div className="hero__content">
                <div className="hero__title">mate blank</div>
                <button onClick={() => setMovementEnabled(p => !p)}>Toggle movement</button>
                <button onClick={() => setAnimationsEnabled(p => !p)}>Toggle animations</button>
            </div>
        </div>
    )
}

export default Hero