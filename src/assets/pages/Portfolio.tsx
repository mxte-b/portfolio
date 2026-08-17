import { Canvas } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';

import waypoints from "../data/waypoints";
import Loader from "../components/Loader";
import MandelbrotView from '../components/MandelbrotView';
import WaypointMarker from "../components/WaypointMarker";
import WaypointUpdater from "../components/WaypointUpdater";
import Navbar from '../components/Navbar';
import useScreenBreakpoint from '../hooks/useScreenBreakpoint';
import MobileNavbar from '../components/MobileNavbar';
import type { WaypointId } from '../types/general';
import useWaypointRouter from '../hooks/useWaypointRouter';
import useMandelbrotStore from '../hooks/useMandelbrotStore';
import useLoader from '../hooks/useLoader';

const Portfolio = () => {
    const breakpoint                                            = useScreenBreakpoint();
    const { progress, animationFinished, start }                = useLoader();
    const { animationsEnabled, movementEnabled }                = useMandelbrotStore(s => s.flags);
    const { activeWaypoint, currentWaypoint, back, navigate }   = useWaypointRouter();

    const [selectedMarkerId, setSelectedMarkerId] = useState<WaypointId | null>(null);

    const canvasRectRef = useRef<DOMRect | null>(null);
    const canvasRef     = useRef<HTMLCanvasElement | null>(null);
    const markerRefs    = useRef<Map<string, HTMLDivElement>>(new Map());

    // Cache the canvas DOMRect using a ref
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        canvasRectRef.current = canvas.getBoundingClientRect();

        const observer = new ResizeObserver(() => canvasRectRef.current = canvas.getBoundingClientRect());
        observer.observe(canvas);

        return () => observer.disconnect();
    }, [canvasRef]);

    // Start loader progress after component mount.
    useEffect(start, []);

    return (
        <>
            {
                breakpoint === "large"
                ? <Navbar visible={animationFinished} />
                : <MobileNavbar visible={animationFinished} />
            }
            <div className="main">
                <Loader progress={progress} visible={!animationFinished} />

                <Canvas ref={canvasRef} className="viewer" frameloop="demand" dpr={1}>
                    <WaypointUpdater 
                        waypoints={waypoints} 
                        markerRefs={markerRefs} 
                        rectRef={canvasRectRef} 
                    />
                    <MandelbrotView 
                        movementEnabled={movementEnabled} 
                        animationsEnabled={animationsEnabled} 
                        rectRef={canvasRectRef} 
                    />
                </Canvas>

                <div className="waypoints">
                    { 
                        waypoints.map((w) => (
                            <WaypointMarker
                                ref={(ref) => {
                                    if (ref) markerRefs.current.set(w.id, ref);
                                    return () => { markerRefs.current.delete(w.id); }
                                }}
                                key={w.id}
                                waypoint={w}
                                selected={selectedMarkerId == w.id}
                                active={currentWaypoint == w.id}
                                interactable={activeWaypoint == w.id}
                                onClick={setSelectedMarkerId}
                                onGo={navigate}
                                onCancel={() => setSelectedMarkerId(null)}
                                onComponentExit={() => {
                                    setSelectedMarkerId(null);
                                    back(w.id);
                                }}
                            />)) 
                    }
                </div>
            </div>
        </>
    )
}

export default Portfolio;