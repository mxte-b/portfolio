import { Canvas } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';

import { clamp } from "../utils/math";
import waypoints from "../data/waypoints";
import Loader from "../components/Loader";
import useFakeProgress from "../hooks/useFakeProgress";
import MandelbrotView from '../components/MandelbrotView';
import WaypointMarker from "../components/WaypointMarker";
import WaypointUpdater from "../components/WaypointUpdater";
import Animator, { interpolateView } from "../utils/animator";
import useDevicePreferences from "../hooks/useDevicePreferences";
import useMandelbrotStore from "../hooks/useMandelbrotStore";
import { RouterProvider } from '../hooks/useRouter';

const LOADER_TRANSITION_DURATION = 500;

const Portfolio = () => {
    const moveTo = useMandelbrotStore(s => s.controls.moveTo);
    const { prefersReducedMotion } = useDevicePreferences();
    const { progress, animationFinished, start } = useFakeProgress(1200, prefersReducedMotion ? 200 : LOADER_TRANSITION_DURATION, true, [
        { value: 0.2, delay: 0 },
        { value: 0.5, delay: 150 },
        { value: 0.9, delay: 250 }
    ])

    const [movementEnabled, setMovementEnabled]             = useState<boolean>(false);
    const [animationsEnabled, setAnimationsEnabled]         = useState<boolean>(!prefersReducedMotion);
    const [selectedMarkerId, setSelectedMarkerId]           = useState<string | null>("home");
    const [activeMarkerId, setActiveMarkerId]               = useState<string | null>("home");
    const [interactableMarkerId, setInteractableMarkerId]   = useState<string | null>("home");

    const canvasRectRef = useRef<DOMRect | null>(null);
    const canvasRef     = useRef<HTMLCanvasElement | null>(null);
    const markerRefs    = useRef<Map<string, HTMLDivElement>>(new Map());

    /**
     * Smoothly travels to the waypoint location. Handles reduced motion preferences by using a loader instead.
     * @param waypoint The waypoint to travel to.
     */
    const travelTo = (location: [number, number], zoom: number, onTargetReached?: () => void) => {
        if (prefersReducedMotion) {
            start();
            setTimeout(() => {
                moveTo(location, zoom); 
                onTargetReached?.();
            }, LOADER_TRANSITION_DURATION);
            return;
        }

        const state = useMandelbrotStore.getState().viewState;

        const path = interpolateView(
            { center: state.center, width: 1 / state.zoom }, 
            { center: location, width: 1 / zoom },
        );

        const animationTime = clamp(path.timeToComplete, 0.5, 10);
        let timeAnimator = new Animator<number>(0, 1, animationTime * 1000, "easeInOut");
        
        const animate = () => {
            const t = timeAnimator.getValue() * path.S;

            moveTo(path.c(t), 1 / path.w(t));

            if (timeAnimator.isDone()) {
                onTargetReached?.();
            }
            else {
                requestAnimationFrame(animate);
            }
        }
        
        requestAnimationFrame(animate);
    }

    /** Smoothly returns to the initial view. */
    const home = () => {
        setActiveMarkerId(null);
        setSelectedMarkerId(null);
        setInteractableMarkerId(null);
        setAnimationsEnabled(!prefersReducedMotion);
        
        travelTo([-0.5, 0], 0.4, () => setMovementEnabled(true));
    }

    const handleNavigate = (waypointId: string | "default") => {
        if (waypointId === "default") return home();

        const target = waypoints.find(x => x.id === waypointId);
        if (!target) return;

        setSelectedMarkerId(waypointId);
        setActiveMarkerId(waypointId); 
        setInteractableMarkerId(null);
        setMovementEnabled(false);

        travelTo(target.location, target.zoom, () => { 
            setAnimationsEnabled(false);
            setInteractableMarkerId(waypointId);

            window.dispatchEvent(new CustomEvent<{ waypointId: string }>(
                "component-enter", 
                { 
                    detail: { waypointId: waypointId } 
                }
            ));
        }); 
    }

    // Cache the canvas DOMRect using a ref
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        canvasRectRef.current = canvas.getBoundingClientRect();

        const observer = new ResizeObserver(() => canvasRectRef.current = canvas.getBoundingClientRect());
        observer.observe(canvas);

        return () => observer.disconnect();
    }, [canvasRef]);
    
    // Automatically adjust based on a change in the prefers reduced motion setting.
    useEffect(() => setAnimationsEnabled(!prefersReducedMotion), [prefersReducedMotion])

    // Start loader progress after component mount.
    useEffect(start, [])

    return (
        <RouterProvider navigate={handleNavigate}>
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
                                active={activeMarkerId == w.id}
                                interactable={interactableMarkerId == w.id }
                                onClick={() => setSelectedMarkerId(w.id)}
                                onCancel={() => setSelectedMarkerId(null)}
                                onGo={() => handleNavigate(w.id)} 
                                onComponentExit={() => {
                                    setActiveMarkerId(null);
                                    setSelectedMarkerId(null);
                                    setInteractableMarkerId(null);
                                    setAnimationsEnabled(!prefersReducedMotion);

                                    travelTo(w.location, w.zoom * 0.8, () => setMovementEnabled(true));
                                }}
                            />)) 
                    }
                </div>
            </div>
        </RouterProvider>
    )
}

export default Portfolio;