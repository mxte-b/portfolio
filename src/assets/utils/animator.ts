import type { Easing } from "../types/general";
import { CubicBezier } from "./cubicBezier";

type Animatable = number | [number, number];

const lerp = <T extends Animatable>(x1: T, x2: T, t: number): T => {
    if (Array.isArray(x1) && Array.isArray(x2)) {
        return [x1[0] + (x2[0] - x1[0]) * t, x1[1] + (x2[1] - x1[1]) * t] as T;
    }
    
    return ((x1 as number) + ((x2 as number) - (x1 as number)) * t) as T;
}

const clone = <T extends Animatable>(value: T): T => {
    if (Array.isArray(value)) return [...value] as T;
    else return value;
}

/** Represents a class that can animate different types of values. */
export default class Animator<T extends Animatable> {
    start: T;
    end: T;
    duration: number;
    startTime: number;
    easing: Easing | CubicBezier;
    delay: number;

    private static easingFunctions: Record<Easing, (t: number) => number> = {
        "linear":           t => t,
        "easeIn":           t => t * t,
        "easeOut":          t => t * (2 - t),
        "easeInOut":        t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
        "easeInOutCubic":   t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
    };

    constructor(start: T, end: T, duration: number, easing: Easing | CubicBezier, delay: number = 0) {
        this.start      = clone(start);
        this.end        = clone(end);
        this.duration   = duration;
        this.easing     = easing;
        this.delay      = delay;
        this.startTime  = performance.now();
    }

    /**
     * Returns the current value of the animator.
     * @param elapsedTime The elapsed time (optional, the current time by defalt).
     * @returns The current animation value.
     */
    getValue(elapsedTime = performance.now() - this.startTime) : T {
        if (elapsedTime < this.delay) return clone(this.start);
        
        const t = Math.min((elapsedTime - this.delay) / this.duration, 1);
        const easedT = this.getEasedT(t);

        return lerp(this.start, this.end, easedT);
    }

    /**
     * Returns whether the animation has finished.
     * @param elapsedTime The elapsed time (optional, the current time by defalt).
     * @returns A boolean value indicating if the animation has finished.
     */
    isDone(elapsedTime = performance.now() - this.startTime) {
        return elapsedTime >= (this.duration + this.delay);
    }

    private getEasedT(t: number) {
        const easingFunc = this.easing instanceof CubicBezier ? this.easing.getFunction() : Animator.easingFunctions[this.easing];
        if (!easingFunc) throw new Error("Unknown easing function.");

        return easingFunc(t);
    }
}

/** Represents a path that interpolates between two given views. */
export type ViewInterpolationPath = {
    /** Indicates the arc length of the interpolation path. */
    S: number,

    /** Indicates the time that the view interpolation will take. */
    timeToComplete: number,

    /**
     * Returns the current position of the view.
     * @param s The distance travelled along the path.
     * @returns The current position of the view.
     */
    c: (s: number) => [number, number],

    /**
     * Returns the current zoom level of the view.
     * @param s The distance travelled along the path.
     * @returns THe current zoom level of the view.
     */
    w: (s: number) => number
}

/**
 * Smoothly interpolates between two given views. This function implements an algorithm 
 * @param from The starting view.
 * @param to The end view.
 * @param V Tuning variable changing the base animation speed.
 * @param rho Tuning variable changing the trade-off between zooming and panning.
 */
export const interpolateView = (
    from: { center: [number, number], width: number },
    to: { center: [number, number], width: number },
    V: number = 1.2,
    rho: number = Math.SQRT2,
): ViewInterpolationPath => {

    const u1 = Math.hypot(to.center[0] - from.center[0], to.center[1] - from.center[1]);

    const rho2 = rho * rho;
    const rho2u1 = rho2 * rho2 * u1 * u1;

    const w1 = to.width;
    const w0 = from.width;
    const w1w0 = w1 * w1 - w0 * w0;
    const w0rho2 = w0 / rho2;

    const b0 = (w1w0 + rho2u1) / (2 * w0 * rho2 * u1);
    const b1 = (w1w0 - rho2u1) / (2 * w1 * rho2 * u1);

    const r0 = Math.log(-b0 + Math.sqrt(b0 * b0 + 1));
    const r1 = Math.log(-b1 + Math.sqrt(b1 * b1 + 1));

    const S = (r1 - r0) / rho;

    return  {
        S: S,
        timeToComplete: S / V,
        c: s => {
            const t = w0rho2 * Math.cosh(r0) * Math.tanh(rho * s + r0) - w0rho2 * Math.sinh(r0);
            return lerp(from.center, to.center, t / u1)
        },
        w: s => w0 * Math.cosh(r0) / Math.cosh(rho * s + r0)
    }
}