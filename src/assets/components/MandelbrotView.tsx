import vertex from '../shaders/vertex.glsl';
import fragment from '../shaders/fragment.glsl';

import * as THREE from 'three';
// import { ScreenQuad } from "@react-three/drei";
import { useFrame, useThree } from '@react-three/fiber';
import { convertColors, type ShaderUniforms } from '../utils/graphics';
import useMandelbrot from '../hooks/useMandelbrot';
import { useEffect, useMemo, useRef } from 'react';
import type { MandelbrotViewState } from '../types/mandelbrot';
import { useGesture } from '@use-gesture/react';
import usePointerType from '../hooks/usePointerType';

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

const MandelbrotView = (
    { 
        movementEnabled = true,
        animationsEnabled = true
    }: 
    { 
        movementEnabled?: boolean,
        animationsEnabled?: boolean
    }) => {  

    const { isTouch }                                   = usePointerType(); 
    const { viewport, gl, size, invalidate }            = useThree();
    const { viewState, controls: { moveBy, setZoom } }  = useMandelbrot();

    const rendererDomRect   = useMemo(() => gl.domElement.getBoundingClientRect(), [gl, viewport.aspect]);
    const uniforms          = useMemo<ShaderUniforms>(() => ({
        ...constructUniforms(viewState),
        aspectRatio: { value: viewport.aspect },
        gradient: { value: gradient },
        gradientWeights: { value: [0.08, 0.56, 0.85, 1] },
    }), []);
    
    const timeInfluenceRef          = useRef<number>(0);
    const uTimeRef                  = useRef<number>(0);
    const zoomVelocityRef           = useRef<number>(0);
    const frictionCoefficientRef    = useRef<number>(0.95);
    const animationsEnabledRef      = useRef<boolean>(true);
    const panVelocityRef            = useRef<[number, number]>([0, 0]);
    const lastMousePositionRef      = useRef<[number, number]>([0, 0]);
    const materialRef               = useRef<THREE.ShaderMaterial>(null!);

    const screenToWorld = (pixel: [number, number], zoom: number, center: [number, number]) => {
        const nx = (pixel[0] - rendererDomRect.left) / rendererDomRect.width - 0.5;
        const ny = (pixel[1] - rendererDomRect.top) / rendererDomRect.height - 0.5;

        return [center[0] + (nx * viewport.aspect) / zoom, center[1] + ny / zoom];
    }

    const zoomToAnchored = (anchor: [number, number], from: number, to: number) => {
        const before = screenToWorld(anchor, from, viewState.center);
        const after = screenToWorld(anchor, to, viewState.center);

        moveBy([before[0] - after[0], before[1] - after[1]])
        setZoom(to);
    }

    const moveByScreenDelta = (delta: [number, number]) => {
        const scaleX = (-viewport.aspect / size.width) / viewState.zoom;
        const scaleY = (-1 / size.height) / viewState.zoom;

        moveBy([delta[0] * scaleX, delta[1] * scaleY]);
    }

    // Gesture handling for view transforms
    useGesture({
        onDrag: ({ delta, pinching, first, last, velocity, direction }) => {
            if (pinching || !movementEnabled) return;
            if (first) panVelocityRef.current = [0, 0];
            if (last) panVelocityRef.current = [velocity[0] * direction[0] * 2, velocity[1] * direction[1] * 2];

            moveByScreenDelta(delta);
            invalidate();
        },
        onWheel: ({ delta, event }) => {
            if (!movementEnabled) return;
            const pointerPosition: [number, number] = [event.clientX, event.clientY];

            zoomVelocityRef.current += -delta[1] * 0.05;
            lastMousePositionRef.current = pointerPosition;
            invalidate();
        },
        onPinch: ({ origin, movement: [relativeScale], first, memo }) => {
            if (!movementEnabled) return;
            if (first) memo = viewState.zoom;

            zoomToAnchored(origin, viewState.zoom, memo * relativeScale);
            invalidate();
            return memo;
        },

    }, 
    { 
        target: gl.domElement, 
        eventOptions: { passive: false }, 
        drag: { filterTaps: true },
        pinch: { scaleBounds: { min: 0.1 }}
    });

    // Per-frame logic
    useFrame((_, delta) => {
        let shouldRenderNextFrame = animationsEnabledRef.current || timeInfluenceRef.current != 0;
        
        const vPan = panVelocityRef.current;
        const vAbsX = Math.abs(vPan[0]);
        const vAbsY = Math.abs(vPan[1]);
        const vAbsZ = Math.abs(zoomVelocityRef.current);
        
        const currentZoom = viewState.zoom;
        const friction = Math.pow(frictionCoefficientRef.current, delta * 144);
        const acceleration = delta;

        // Apply friction to the pan and zoom velocities and transform the view accordingly
        if (vAbsX > 0 || vAbsY > 0) {
            shouldRenderNextFrame = true;
            if (vAbsX < EPSILON) vPan[0] = 0;
            if (vAbsY < EPSILON) vPan[1] = 0;
            
            vPan[0] *= friction;
            vPan[1] *= friction;
            moveByScreenDelta(vPan);
        }

        if (vAbsZ > 0) {
            shouldRenderNextFrame = true;
            if (vAbsZ < EPSILON) zoomVelocityRef.current = 0;
            
            zoomVelocityRef.current *= friction;
            zoomToAnchored(lastMousePositionRef.current, currentZoom, currentZoom + zoomVelocityRef.current * 0.001 * viewState.zoom)
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
        materialRef.current.uniforms.zoom.value = viewState.zoom;
        materialRef.current.uniforms.center.value = viewState.center;
        materialRef.current.uniforms.aspectRatio.value = viewport.aspect;
        materialRef.current.uniforms.uTime.value = uTimeRef.current;
        materialRef.current.uniforms.iterations.value = viewState.iterations;

        if (shouldRenderNextFrame) invalidate();
    });

    // Change friction coefficient depending on pointer type
    useEffect(() => { frictionCoefficientRef.current = isTouch ? 0.97 : 0.95 }, [isTouch]);

    useEffect(() => {
        // In Safari, the animationsEnabled state is updated instantly which makes the animations jump.
        // By delaying the update of the variable, we can ensure that the first frame's delta is not
        // considered.
        const id = requestAnimationFrame(() => animationsEnabledRef.current = animationsEnabled);

        return () => cancelAnimationFrame(id);
    }, [animationsEnabled])

    useEffect(invalidate, [animationsEnabled, viewport.aspect, viewState]);

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