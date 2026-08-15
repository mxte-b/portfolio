import type { HTMLElements } from "motion/react";
import type { ComponentType, ReactNode } from "react";
import type ComponentEvent from "../utils/componentEvent";

declare global {
    interface WindowEventMap {
        "component-enter": ComponentEvent,
        "component-exit": ComponentEvent
    }
}

export type Image = {
    uri: string,
    alt?: string
}

type Project = {
    id: string,
    title: string,
    tags: string[],
    description: string,
    href?: string,
}

export type FeaturedProject = Project & {
    details: string[];
    sourceName: string,
}

export type SmallProject = Project & {
    protected?: boolean;
}

export type Artwork = {
    kind: "fractals" | "blender",
    title: string,
    subtitle: string,
    year: number,
    sourceName: string
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

/** Represents a responsive masonry grouping for an arbitrary amount of images. */
export type MasonryGrouping = {
    /** Grouping for large displays such as desktops or laptops. */
    large: Artwork[][], 

    /** Grouping for medium-sized displays. */
    medium: Artwork[][], 

    /** Grouping for small displays. */
    small: Artwork[][]
}

/* -------------------------------------------------------------------------- */
/*                          Component property types                          */
/* -------------------------------------------------------------------------- */

export type WaypointComponentProps = {
    waypoint: Waypoint,
    onBack: () => void,
}

export type RevealParams = { 
    /** Defines the HTML element type that the Reveal will use. Defaults to \<div\>. */
    as?: keyof HTMLElements,

    /** Explicit width of the wrapper. Defaults to "fit-content". */
    width?: string,

    /** Explicit height of the wrapper. Defaults to "auto". */
    height?: string,

    /** Explicit class name of the wrapper. */
    className?: string,

    /** Identifier of the component. Keeps the delay stable even when remounting an element. */
    id?: string,

    children: ReactNode,
}

export type StaggerParams = Omit<RevealParams, "id"> & {
    /** A function that assigns a stable key to each child element of the Stagger component. */
    id?: (i: number) => string
}

/* -------------------------------------------------------------------------- */
/*                             Context value types                            */
/* -------------------------------------------------------------------------- */
/** Represents the type of the useDevicePreferences hook. */
export type DevicePreferencesContextValue = { 
    /** Indicates if the current device uses touch as input source. */
    isTouch: boolean,

    /** Reveals the value of the prefers reduced motion accessibility setting. */
    prefersReducedMotion: boolean,
};

/** Represents the type of the useRevealAnimation hook. */
export type RevealAnimationContextValue = {
    /** The current animation state. */
    revealed: boolean,

    /** A registration function returning the delay value (in milliseconds) assigned to the caller. */
    acquireDelay: (id: string | undefined) => number,
}

/** Represents the type of the useRouter hook. */
export type RouterContextValue = {
    navigate: (waypointId: string) => void
}