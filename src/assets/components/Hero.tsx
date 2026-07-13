import * as THREE from 'three';
import MandelbrotView from './MandelbrotView';
import { Canvas } from '@react-three/fiber';
import { Stats } from '@react-three/drei';

const Hero = () => {
    return (
        <div className="hero">
            <Canvas className="hero__background" dpr={1}>
                <MandelbrotView />
                <Stats />
            </Canvas>
            <div className="hero__content">
                <div className="hero__title">mate blank</div>
            </div>
        </div>
    )
}

export default Hero