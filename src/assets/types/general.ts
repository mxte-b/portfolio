import type { ComponentType, ReactNode } from "react";

declare global {
    interface WindowEventMap {
        "component-enter": CustomEvent<{ waypointId: string }>
    }
}

export type Image = {
    uri: string,
    alt?: string
}

export type Project = {
    title: string;
    tags: string[];
    description: string;
    image?: Image,
    details?: string[];
    links?: { label: string; href?: string }[];
}

export type Artwork = {
    kind: "fractals" | "blender",
    title: string,
    subtitle: string,
    year: number,
    sourceName: string,
}

/** 
 * Represents a waypoint that is located inside the fractal and can trigger an overlay. 
 */
export type Waypoint = {
    /** The unique identifier of the waypoint. */
    id: string,

    /** The label of the waypoint. */
    label: string,

    /** The short description of the waypoint. */
    description: string,

    /** The zoom level of the location. */
    zoom: number,

    /** The coordinates of the waypoint (in global space). */
    location: [number, number],

    /** The component associated with this waypoint. */
    component?: ComponentType<WaypointComponentProps>
}

export type Easing = "linear" | "easeIn" | "easeOut" | "easeInOut" | "easeInOutCubic";

export type Dimensions = { width: number, height: number };

export type DrawHelper = (ctx: CanvasRenderingContext2D, dim: Dimensions) => void;

/* -------------------------------------------------------------------------- */
/*                          Component property types                          */
/* -------------------------------------------------------------------------- */

export type WaypointComponentProps = {
    waypoint: Waypoint,
    onBack: () => void,
}

export type RevealParams = { 
    /** Optional, explicit width of the wrapper. */
    width?: string,
    className?: string,
    children: ReactNode,
}

/* -------------------------------------------------------------------------- */
/*                             Context value types                            */
/* -------------------------------------------------------------------------- */
/** 
 * Represents the type of the useDevicePreferences hook. 
 */
export type DevicePreferencesContextValue = { 
    /** Indicates if the current device uses touch as input source. */
    isTouch: boolean,

    /** Reveals the value of the prefers reduced motion accessibility setting. */
    prefersReducedMotion: boolean,
};

export type RevealAnimationContextValue = {
    /** The current animation state. */
    revealed: boolean,

    /** A registration function returning the delay value (in milliseconds) assigned to the caller. */
    acquireDelay: () => number,
}
