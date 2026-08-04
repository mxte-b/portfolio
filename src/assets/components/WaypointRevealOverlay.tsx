import { useRevealState } from "../hooks/useRevealAnimation";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import useDevicePreferences from "../hooks/useDevicePreferences";

const WaypointRevealOverlay = ({ label, duration }: { label: string, duration: number }) => {
    const revealed = useRevealState();
    const { prefersReducedMotion } = useDevicePreferences();
    const overlayRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!revealed || prefersReducedMotion) return;

        const split = SplitText.create(overlayRef.current, { type: "chars,words" });

        gsap.to(split.chars, {
            yPercent: 100,
            opacity: 0,
            stagger: {
                from: "end",
                amount: 0.05,
            },
            ease: "power2.inOut",
            duration: duration / 1000,
        });
    }, [revealed]);

    return (
        <div style={{ visibility: prefersReducedMotion ? "hidden" : "visible" }} className="waypoint-overlay">
            <div ref={overlayRef} className="waypoint-overlay__container">{label}</div>
        </div>
    );
};

export default WaypointRevealOverlay;