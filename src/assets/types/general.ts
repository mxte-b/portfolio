import type { HTMLElements } from "motion/react";
import type { ComponentType, ReactNode } from "react";
import type ComponentEvent from "../utils/componentEvent";
import Icons from "../components/Icons";
import DevIcons from "../components/DevIcons";

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

export type WaypointId = "aboutMe" | "artworks" | "skills" | "home" | "projects";

/** 
 * Represents a waypoint that is located inside the fractal and can trigger an overlay. 
 */
export type Waypoint = {
    /** The unique identifier of the waypoint. */
    id: WaypointId,

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

export type NavbarItem = {
    title: string,
    waypointId: WaypointId,
    icon: keyof typeof Icons,
    prominent?: boolean,
}

export type Skill = {
    id: string,
    label: string,
    accentColor: string,
    icon: keyof typeof DevIcons
}

export type SkillCategory = {
    id: string,
    label: string,
    skills: Skill[]
}

/* -------------------------------------------------------------------------- */
/*                          Component property types                          */
/* -------------------------------------------------------------------------- */

export type WaypointComponentProps = {
    waypoint: Waypoint,
    onBack: () => void,
}

export type RevealParams = { 
    /** Defines the HTML element type that the Reveal will use. overviews to \<div\>. */
    as?: keyof HTMLElements,

    /** Explicit width of the wrapper. overviews to "fit-content". */
    width?: string,

    /** Explicit height of the wrapper. overviews to "auto". */
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
/*                     Context value types / Zustand types                    */
/* -------------------------------------------------------------------------- */
/** Represents the type of the useLoader hook. */
export type LoaderContextValue = {
    /** The current duration of the CSS transitions on the loader element. */
    cssTransitionDuration: number,

    /** The current progress value in the range [0, 1]. */
    progress: number, 

    /** Whether the animation is finished (including CSS transitions). */
    animationFinished: boolean, 

    /** Resets and starts a new progress. */
    start: () => void 
}

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

/** Represents the type of the useWaypointRouter hook. */
export type WaypointRouterContextValue = {
    /** Provides identifiers of the current route (waypoint). */
    route: {
        /** 
         * The identifier of the waypoint that is being navigated to or its component is interactable.
         */
        target: WaypointId | null,

        /**
         * The identifier of the waypoint whose component is interactable.
         */
        active: WaypointId | null,
    },

    /** Provides flags reflecting the state of the router. */
    flags: {
        /** Indicates whether the router is currently navigating to another route. */
        isInFlight: boolean
    },

     /** Provides router controls such as navigation and route exiting. */
    controls: {
        /**
         * Navigates to a specified route.
         * @param id The identifier of the target waypoint.
         * @param onNavigationStart Callback that fires before the navigation starts.
         * @param onNavigationEnd Callback that fires after the navigation finishes.
         */
        navigate: (
            id: WaypointId | "overview", 
            onNavigationStart?: (id: WaypointId | "overview") => void, 
            onNavigationEnd?: (id: WaypointId | "overview") => void
        ) => void,
    
        /** Exits the current route component. */
        back: (id: WaypointId) => void,
    },
}