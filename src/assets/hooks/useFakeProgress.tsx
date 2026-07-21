import { useEffect, useState } from "react";

/**
 * Provides a simulated progress value with the ability to reset the progress.
 * @param duration The duration of the fake progress (in milliseconds).
 * @param transitionDuration The duration of the CSS transition on the width (in milliseconds).
 * @param jitter Whether to delay the anchor points by a random jitter amount.
 * @param anchors The list of anchor points.
 * @returns 
 */
const useFakeProgress = (duration: number, transitionDuration: number, jitter: boolean, anchors : { value: number, delay: number }[])
: {
    /** The current progress value in the range [0, 1]. */
    progress: number, 

    /** Whether the animation is finished (including CSS transitions). */
    animationFinished: boolean, 

    /** Resets and starts a new progress. */
    start: () => void 
} => {

    const [progressId, setProgressId] = useState<number>(-1);
    const [progress, setProgress] = useState<number>(0);
    const [isFinished, setIsFinished] = useState<boolean>(true);

    useEffect(() => {
        if (progressId < 0) return;

        setIsFinished(false);
        let currentDelay = 0;
        let timeouts: number[] = [];
        
        setProgress(0);
        setTimeout(() => {
            timeouts.map(clearTimeout);
            setProgress(1);
            setTimeout(() => setIsFinished(true), transitionDuration)
        }, duration);

        for (const a of anchors) {
            currentDelay += a.delay + Math.random() * (jitter ? 250 : 0);
            timeouts.push(setTimeout(() => setProgress(a.value), currentDelay));
        }

        return () => { timeouts.map(clearTimeout) };
    }, [progressId]);

    return {
        progress: progress,
        animationFinished: isFinished,
        start: () => setProgressId(p => p + 1)
    }
}

export default useFakeProgress;