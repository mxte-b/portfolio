import type { ComponentType } from "react";

export type Project = {
    title: string;
    tags: string[];
    description: string;
    image?: string;
    imageAlt?: string;
    details?: string[];
    links?: { label: string; href?: string }[];
}

export type WaypointComponentProps = {
    waypoint: Waypoint,
    onBack: () => void,
}

/** Represents a waypoint that is located inside the fractal and can trigger an overlay. */
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

/** Represents the type of the useDevicePreferences hook. */
export type DevicePreferencesContextType = { 
    /** Indicates if the current device uses touch as input source. */
    isTouch: boolean,

    /** Reveals the value of the prefers reduced motion accessibility setting. */
    prefersReducedMotion: boolean,
};

export type Easing = "linear" | "easeIn" | "easeOut" | "easeInOut" | "easeInOutCubic";

export type Dimensions = { width: number, height: number };

export type DrawHelper = (ctx: CanvasRenderingContext2D, dim: Dimensions) => void;