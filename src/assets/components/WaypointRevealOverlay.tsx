import { useRevealState } from "../hooks/useRevealAnimation";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import useDevicePreferences from "../hooks/useDevicePreferences";

const WaypointRevealOverlay = ({ label, duration }: { label: string, duration: number }) => {
    const revealed = useRevealState();
    const { prefersReducedMotion } = useDevicePreferences();

    const [animationFinished, setAnimationFinished] = useState<boolean>(false);

    const overlayRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!revealed || prefersReducedMotion) return;

        const split = SplitText.create(overlayRef.current, { type: "chars" });

        gsap.to(split.chars, {
            yPercent: 150,
            opacity: 0,
            stagger: {
                from: "end",
                amount: 0.05,
            },
            ease: "power2.inOut",
            duration: duration / 1000,
            onComplete: () => setAnimationFinished(true)
        });
    }, [revealed]);

    return (
        <div className="waypoint-overlay" style={{ 
            visibility: 
                prefersReducedMotion || (!revealed && animationFinished)
                ? "hidden" 
                : "visible" 
        }}>
            <div ref={overlayRef} className="waypoint-overlay__container">{label}</div>
        </div>
    );
};

export default WaypointRevealOverlay;