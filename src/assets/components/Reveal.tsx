import { useEffect, useMemo} from "react";
import type { RevealParams } from "../types/general";
import { motion, useAnimationControls, type Variants } from "motion/react";
import { useRevealAnimation } from "../hooks/useRevealAnimation";
import useDevicePreferences from "../hooks/useDevicePreferences";

const Reveal = ({ as = "div", width, height, className, children }: RevealParams) => {
    const MotionComponent = useMemo(() => motion.create(as), []);

    const controls = useAnimationControls();
    const { prefersReducedMotion } = useDevicePreferences();
    const { revealed, delay } = useRevealAnimation();

    const variants: Variants = {
        hidden: {
            visibility: "hidden",
            opacity: 0,
            filter: "blur(5px)",
            y: 10,
            willChange: "transform"
        },
        visible: {
            visibility: "visible",
            opacity: 1,
            filter: "none",
            y: 0,
            willChange: "none"
        },
    } ;

    useEffect(() => {
        if (!revealed) return;

        controls.start("visible")
    }, [revealed]);

    return (
        <MotionComponent
            variants={variants}
            initial={revealed ? "visible" : "hidden"}
            animate={controls}
            style={ 
                { width: width ?? "fit-content", height: height ?? "auto" }
            }
            transition={{ delay: prefersReducedMotion ? 0 : delay / 1000 }}
            className={className}
        >
            {children}
        </MotionComponent>
    );
};

export default Reveal;