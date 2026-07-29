import Lenis from "lenis";
import { Canvas } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';

import type { Waypoint } from "../types/general";
import MandelbrotView from '../components/MandelbrotView';
import WaypointMarker from "../components/WaypointMarker";
import WaypointUpdater from "../components/WaypointUpdater";
import useDevicePreferences from "../hooks/useDevicePreferences";
import Loader from "../components/Loader";
import useFakeProgress from "../hooks/useFakeProgress";
import useMandelbrotStore, { initialViewState } from "../hooks/useMandelbrotStore";
import Animator, { interpolateView } from "../utils/animator";
import { clamp } from "../utils/math";
import AboutMe from "./AboutMe";
import Artworks from "./Artworks";
import Goals from "./Goals";
import Projects from "./Projects";

declare global {
    interface Window {
        lenis: Lenis;
    }
}

const WAYPOINTS: Waypoint[] = [
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
        id: "goals",
        label: "Goals",
        description: "A look into my future projects and plans.",
        location: [-1.77577, -0.00631],
        zoom: 540,
        component: Goals
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

const LOADER_TRANSITION_DURATION = 500;

const Portfolio = () => {
    const moveTo = useMandelbrotStore(s => s.controls.moveTo);
    const { prefersReducedMotion } = useDevicePreferences();
    const { progress, animationFinished, start } = useFakeProgress(1200, prefersReducedMotion ? 200 : LOADER_TRANSITION_DURATION, true, [
        { value: 0.2, delay: 0 },
        { value: 0.5, delay: 150 },
        { value: 0.9, delay: 250 }
    ])

    const [movementEnabled, setMovementEnabled]             = useState<boolean>(true);
    const [animationsEnabled, setAnimationsEnabled]         = useState<boolean>(!prefersReducedMotion);
    const [selectedMarkerId, setSelectedMarkerId]           = useState<string | null>(null);
    const [activeMarkerId, setActiveMarkerId]               = useState<string | null>(null);
    const [interactableMarkerId, setInteractableMarkerId]   = useState<string | null>(null);

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
            setTimeout(() => moveTo(location, zoom), LOADER_TRANSITION_DURATION);
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
        setMovementEnabled(true);
        setAnimationsEnabled(!prefersReducedMotion);
        
        travelTo(initialViewState.center, initialViewState.zoom);
    }

    // Cache the canvas DOMRect using a ref
    useEffect(() => {
        console.log(prefersReducedMotion)
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
        <div className="main">
            <Loader progress={progress} visible={!animationFinished} />

            <Canvas ref={canvasRef} className="viewer" frameloop="demand" dpr={1}>
                <WaypointUpdater 
                    waypoints={WAYPOINTS} 
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
                    WAYPOINTS.map((w) => (
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
                            onGo={() => { 
                                setActiveMarkerId(w.id); 
                                setMovementEnabled(false);
                                travelTo(w.location, w.zoom, () => { 
                                    setAnimationsEnabled(false);
                                    setInteractableMarkerId(w.id);

                                    window.dispatchEvent(new CustomEvent<{ waypointId: string }>(
                                        "component-enter", 
                                        { 
                                            detail: { waypointId: w.id } 
                                        }
                                    ));
                                }); 
                            }}
                            onComponentExit={() => {
                                setActiveMarkerId(null);
                                setSelectedMarkerId(null);
                                setInteractableMarkerId(null);
                                setMovementEnabled(true);
                                setAnimationsEnabled(!prefersReducedMotion);

                                travelTo(w.location, w.zoom * 0.8);
                            }}
                        />)) 
                }
            </div>
        </div>
    )
}

export default Portfolio;