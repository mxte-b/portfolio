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
import ComponentEvent from '../utils/componentEvent';
import Navbar from '../components/Navbar';
import useScreenBreakpoint from '../hooks/useScreenBreakpoint';
import MobileNavbar from '../components/MobileNavbar';

const LOADER_TRANSITION_DURATION = 500;

const Portfolio = () => {
    const moveTo = useMandelbrotStore(s => s.controls.moveTo);
    const { prefersReducedMotion } = useDevicePreferences();
    const breakpoint = useScreenBreakpoint();
    const { progress, animationFinished, start } = useFakeProgress(1200, prefersReducedMotion ? 200 : LOADER_TRANSITION_DURATION, true, [
        { value: 0.2, delay: 0 },
        { value: 0.5, delay: 150 },
        { value: 0.9, delay: 250 }
    ])

    const [movementEnabled, setMovementEnabled]             = useState<boolean>(false);
    const [animationsEnabled, setAnimationsEnabled]         = useState<boolean>(false);
    const [selectedMarkerId, setSelectedMarkerId]           = useState<string | null>("home");
    const [activeMarkerId, setActiveMarkerId]               = useState<string | null>("home");
    const [interactableMarkerId, setInteractableMarkerId]   = useState<string | null>("home");

    const canvasRectRef = useRef<DOMRect | null>(null);
    const canvasRef     = useRef<HTMLCanvasElement | null>(null);
    const markerRefs    = useRef<Map<string, HTMLDivElement>>(new Map());
    const inFlightRef   = useRef<boolean>(false);

    /**
     * Smoothly travels to the waypoint location. Handles reduced motion preferences by using a loader instead.
     * @param waypoint The waypoint to travel to.
     */
    const travelTo = (location: [number, number], zoom: number, onTargetReached?: () => void) => {
        console.log(inFlightRef.current, location)
        if (inFlightRef.current) return;

        inFlightRef.current = true;

        if (prefersReducedMotion) {
            start();
            setTimeout(() => {
                inFlightRef.current = false;
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
                inFlightRef.current = false;
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
        if (inFlightRef.current) return;

        setActiveMarkerId(null);
        setSelectedMarkerId(null);
        setInteractableMarkerId(null);
        setAnimationsEnabled(!prefersReducedMotion);
        
        // Travel to default view, taking into consideration view size.
        const [w, h] = [window.innerWidth, window.innerHeight];
        const [targetWidth, targetHeight] = [2.9, 2.6];

        const zw = w / (h * targetWidth);
        const zh = 1 / targetHeight;
         
        travelTo(w > h ? [-0.5, 0] : [-0.75, 0], Math.min(zw, zh), () => setMovementEnabled(true));
    }

    const handleNavigate = (waypointId: string | "default", callback?: () => void) => {
        if (inFlightRef.current || interactableMarkerId === waypointId) return;

        if (waypointId === "default") {
            if (interactableMarkerId !== null) window.dispatchEvent(new ComponentEvent("exit", waypointId));
            callback?.();
            return home();
        }

        const target = waypoints.find(x => x.id === waypointId);
        if (!target) return;

        if (interactableMarkerId !== null) window.dispatchEvent(new ComponentEvent("exit", waypointId));

        setSelectedMarkerId(waypointId);
        setActiveMarkerId(waypointId); 
        setInteractableMarkerId(null);
        setAnimationsEnabled(!prefersReducedMotion);
        setMovementEnabled(false);

        travelTo(target.location, target.zoom, () => { 
            setAnimationsEnabled(false);
            setInteractableMarkerId(waypointId);

            window.dispatchEvent(new ComponentEvent("enter", waypointId));
            callback?.();
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
    useEffect(() => { if (!interactableMarkerId) setAnimationsEnabled(!prefersReducedMotion) }, [prefersReducedMotion])

    // Start loader progress after component mount.
    useEffect(start, [])

    return (
        <RouterProvider navigate={handleNavigate}>
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
                                active={activeMarkerId == w.id}
                                interactable={interactableMarkerId == w.id }
                                onClick={() => setSelectedMarkerId(w.id)}
                                onCancel={() => setSelectedMarkerId(null)}
                                onGo={() => handleNavigate(w.id)} 
                                onComponentExit={() => {
                                    if (!interactableMarkerId) return;
                                    window.dispatchEvent(new ComponentEvent("exit", interactableMarkerId))

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