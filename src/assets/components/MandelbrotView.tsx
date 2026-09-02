import vertex from '../shaders/vertex.glsl';
import fragment from '../shaders/fragment.glsl';

import { useGesture } from '@use-gesture/react';
import { ShaderMaterial } from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useCallback, useEffect, useMemo, useRef, type RefObject } from 'react';
import type { MandelbrotViewState } from '../types/mandelbrot';

import useDevicePreferences from '../hooks/useDevicePreferences';
import useMandelbrotStore from '../hooks/useMandelbrotStore';
import { convertColors, type ShaderUniforms } from '../utils/graphics';
import { clamp } from '../utils/math';

const gradient = convertColors(["#0c0c0c", "#E46C16", "#ffbc81", "#fff2e6"]);
const EPSILON = 1e-2;

/**
 * Construct the uniform object to pass to the fragment shader.
 * @param viewState The current view state.
 */
const constructUniforms = (viewState: MandelbrotViewState): ShaderUniforms => {
    return {
        center: { value: viewState.center },
        zoom: { value: viewState.zoom },
        iterations: { value: viewState.iterations },
        uTime: { value: 0 },
        timeInfluence: { value: 0 }
    };
}

const MandelbrotView = ({ rectRef }: { rectRef: RefObject<DOMRect | null> }) => {  

    const { gl, viewport, invalidate }           = useThree();
    const { isTouch, prefersReducedMotion }      = useDevicePreferences(); 
    const { moveBy, setZoom }                    = useMandelbrotStore(s => s.controls);
    const { movementEnabled, animationsEnabled } = useMandelbrotStore(s => s.flags);

    const uniforms = useMemo<ShaderUniforms>(() => {
        const rect = rectRef.current;
        return {
            ...constructUniforms(useMandelbrotStore.getState().viewState),
            aspectRatio: { value: rect ? rect.width / rect.height : 1 },
            gradient: { value: gradient },
            gradientWeights: { value: [0.08, 0.56, 0.85, 1] },
        }
    }, []);
    
    const timeInfluenceRef          = useRef<number>(0);
    const uTimeRef                  = useRef<number>(6);
    const deltaRef                  = useRef<number>(0);
    const zoomVelocityRef           = useRef<number>(0);
    const frictionCoefficientRef    = useRef<number>(0.95);
    const animationsEnabledRef      = useRef<boolean>(true);
    const panVelocityRef            = useRef<[number, number]>([0, 0]);
    const lastMousePositionRef      = useRef<[number, number]>([0, 0]);
    const materialRef               = useRef<ShaderMaterial>(null!);

    /**
     * Calculates the overshoot value for a given zoom level.
     * @param zoom The current zoom level.
     * @returns The calculated overshoot factor and correction force.
     */
    const calculateZoomOvershoot = useCallback((
        zoom: number, 
        limits: { low: number, high: number }
    ) => {
        let overshoot = 0;
        let violatedLimit = null;

        if (zoom < limits.low) {
            overshoot = Math.log(limits.low) - Math.log(zoom) + 1;
            violatedLimit = 0;
        }
        else if (zoom > limits.high) {
            overshoot = Math.log(zoom) - Math.log(limits.high) + 1;
            violatedLimit = 1;
        }

        return { 
            factor: violatedLimit !== null 
                ? 1 / Math.pow(overshoot, 10) 
                : 1, 
            correctionForce: violatedLimit !== null
                ? (violatedLimit == 1 ? -1 : 1) * Math.min(5 * overshoot - 5, isTouch ? 1 : 100)
                : 0
        };
    }, [isTouch]);

    /**
     * Extracts DOMRect data from the current rectRef element, and returns it.
     * @returns The DOMRect data.
     */
    const getRendererRectData = () => {
        const rect = rectRef.current;
        if (!rect) return null;

        return  {
            left: rect.left,
            top: rect.top,
            width: rect.width,
            height: rect.height,
            aspect: rect.width / rect.height
        }
    }

    /**
     * Converts a pixel coordinates to world coordinates.
     * @param pixel The pixel coordinate.
     * @param zoom The current zoom value.
     * @param center The current center value.
     * @returns The calculated world position.
     */
    const screenToWorld = (pixel: [number, number], zoom: number, center: [number, number]) => {
        const rect = getRendererRectData();
        if (!rect) return [0, 0];

        const nx = (pixel[0] - rect.left) / rect.width - 0.5;
        const ny = (pixel[1] - rect.top) / rect.height - 0.5;
        
        return [center[0] + (nx * rect.aspect) / zoom, center[1] + ny / zoom];
    }

    /**
     * Sets the zoom to a specified value while keeping the screen coordinate of the anchor fixed.
     * @param anchor The screen-space coordinates of the anchor point.
     * @param center The current center value.
     * @param from The current zoom value.
     * @param to The desired zoom value.
     */
    const zoomToAnchored = (anchor: [number, number], center: [number, number], from: number, to: number) => {
        const before = screenToWorld(anchor, from, center);
        const after = screenToWorld(anchor, to, center);

        moveBy([before[0] - after[0], before[1] - after[1]])
        setZoom(to);
    }

    /**
     * Moves the view by a screen-space delta.
     * @param delta The delta to move the view by.
     * @param zoom The current zoom value.
     */
    const moveByScreenDelta = (delta: [number, number], zoom: number) => {
        const rect = getRendererRectData();
        if (!rect) return;
            
        const scaleX = (-rect.aspect / rect.width) / zoom;
        const scaleY = (-1 / rect.height) / zoom;

        moveBy([delta[0] * scaleX, delta[1] * scaleY]);
    }

    // Gesture handling for view transforms
    useGesture({
        onDrag: ({ delta, pinching, first, last, velocity, direction }) => {
            if (pinching || !movementEnabled) return;
            if (first) panVelocityRef.current = [0, 0];
            if (last) panVelocityRef.current = [velocity[0] * direction[0] * 2, velocity[1] * direction[1] * 2];

            moveByScreenDelta(delta, useMandelbrotStore.getState().viewState.zoom);
            invalidate();
        },
        onWheel: ({ delta, event }) => {
            if (!movementEnabled) return;
            event.preventDefault(); event.stopPropagation();

            zoomVelocityRef.current += -delta[1] * 0.05;
            lastMousePositionRef.current = [event.clientX, event.clientY];
            invalidate();
        },
        onPinch: ({ origin, movement: [relativeScale], first, last, memo }) => {
            if (!movementEnabled) return;
            lastMousePositionRef.current = origin;
            
            const s = useMandelbrotStore.getState();
            if (first) {
                zoomVelocityRef.current = 0;
                memo = s.viewState.zoom;
            }

            const currentZoom = s.viewState.zoom;
            const newZoom = memo * relativeScale;
            const limits = s.limits.zoom;

            const overshoot = calculateZoomOvershoot(newZoom, limits);

            zoomToAnchored(origin, s.viewState.center, s.viewState.zoom, currentZoom + (newZoom - currentZoom) * overshoot.factor);

            if (last && (newZoom < limits.low || newZoom > limits.high)) {
                zoomVelocityRef.current += EPSILON;
            }

            invalidate();
            return memo;
        },
    }, 
    { 
        target: gl.domElement, 
        eventOptions: { passive: false }, 
        drag: { filterTaps: true },
        pinch: { pinchOnWheel: false }
    });

    // Per-frame logic
    useFrame((_, delta) => {
        deltaRef.current = delta;

        const s = useMandelbrotStore.getState();
        const rect = getRendererRectData();

        let shouldRenderNextFrame = animationsEnabledRef.current || timeInfluenceRef.current != 0;

        const vPan = panVelocityRef.current;
        const vAbsX = Math.abs(vPan[0]);
        const vAbsY = Math.abs(vPan[1]);
        const vAbsZ = Math.abs(zoomVelocityRef.current);
        
        const currentZoom = s.viewState.zoom;
        const friction = Math.pow(frictionCoefficientRef.current, delta * 144);
        const acceleration = delta;

        // Apply friction to the pan and zoom velocities and transform the view accordingly
        if (vAbsX > 0 || vAbsY > 0) {
            shouldRenderNextFrame = true;
            if (vAbsX < EPSILON) vPan[0] = 0;
            if (vAbsY < EPSILON) vPan[1] = 0;
            
            vPan[0] *= friction;
            vPan[1] *= friction;
            moveByScreenDelta(vPan, currentZoom);
        }

        if (vAbsZ > 0) {
            shouldRenderNextFrame = true;
            if (vAbsZ < EPSILON) zoomVelocityRef.current = 0;
            
            const overshoot = calculateZoomOvershoot(currentZoom, s.limits.zoom);
            if (prefersReducedMotion) {
                let newZoom = clamp(
                    currentZoom + zoomVelocityRef.current * 0.02 * currentZoom, 
                    s.limits.zoom.low, 
                    s.limits.zoom.high
                );

                // Zoom needs to be applied before the friction, because here the friction is 0.
                zoomToAnchored(
                    lastMousePositionRef.current, 
                    s.viewState.center, 
                    currentZoom, 
                    newZoom
                );    
            }

            zoomVelocityRef.current += overshoot.correctionForce * delta * 200;
            zoomVelocityRef.current *= friction;

            if (!prefersReducedMotion) {
                // Apply zoom with smooth movement.
                let newZoom = currentZoom + zoomVelocityRef.current * delta * 0.12 * currentZoom;

                zoomToAnchored(
                    lastMousePositionRef.current, 
                    s.viewState.center, 
                    currentZoom, 
                    newZoom
                );
            }
        }

        // Apply friction/acceleration to the time influence based on animationsEnabled
        const target = animationsEnabledRef.current ? 1 : 0;
        if (timeInfluenceRef.current < target) {
            timeInfluenceRef.current += (target - timeInfluenceRef.current) * acceleration;

            if (target - timeInfluenceRef.current < EPSILON) timeInfluenceRef.current = target;
        }
        else if (timeInfluenceRef.current > target){
            let newInfluence = Math.max(1 - delta * 2, target);
            timeInfluenceRef.current *= newInfluence;
            
            if (timeInfluenceRef.current - target < EPSILON) timeInfluenceRef.current = target;
        }

        if (timeInfluenceRef.current > 0) uTimeRef.current += delta * timeInfluenceRef.current;

        // Update fragment shader uniforms
        materialRef.current.uniforms.zoom.value = s.viewState.zoom;
        materialRef.current.uniforms.center.value = s.viewState.center;
        materialRef.current.uniforms.iterations.value = s.viewState.iterations;
        materialRef.current.uniforms.aspectRatio.value = rect?.aspect ?? 1;
        materialRef.current.uniforms.uTime.value = uTimeRef.current;

        if (shouldRenderNextFrame) invalidate();
    });

    // Change friction coefficient depending on pointer type
    useEffect(() => { frictionCoefficientRef.current = (isTouch ? 0.97 : 0.95) * (prefersReducedMotion ? 0 : 1); }, [isTouch, prefersReducedMotion]);

    useEffect(() => {
        // In Safari, the animationsEnabled state is updated instantly which makes the animations jump.
        // By delaying the update of the variable, we can ensure that the first frame's delta is not
        // considered. Invalidating the canvas is also needed because of this timing issue.
        const id = requestAnimationFrame(() => {
            animationsEnabledRef.current = animationsEnabled;
            invalidate();
        });

        return () => cancelAnimationFrame(id);
    }, [animationsEnabled]);

    // Start frame loop on viewport and flag changes
    useEffect(invalidate, [animationsEnabled, viewport.aspect]);

    // Trigger zoom limit correction on limit changes when necessary
    useEffect(() => {
        const unsub = useMandelbrotStore.subscribe(s => s.limits.zoom, () => {
            const state = useMandelbrotStore.getState();
            const zoom = state.viewState.zoom;
            const limits = state.limits.zoom;

            if (zoom < limits.low || zoom > limits.high ) {
                zoomVelocityRef.current += EPSILON;
            }
        });

        return unsub;
    }, []);

    return (
        <mesh>
            <planeGeometry args={[2, 2]} />
            <shaderMaterial
                ref={materialRef}
                uniforms={uniforms}
                vertexShader={vertex}
                fragmentShader={fragment}
            />
        </mesh>
    );
};

export default MandelbrotView;