import { useEffect } from "react";
import type { RevealParams } from "../types/general";
import { motion, useAnimationControls, type Variants } from "motion/react";
import { useRevealAnimation } from "../hooks/useRevealAnimation";

const Reveal = ({ width, className, children }: RevealParams) => {
    const controls = useAnimationControls();
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
        <motion.div
            variants={variants}
            initial="hidden"
            animate={controls}
            style={width ? { width: width } : { width: "fit-content" }}
            transition={{ delay: delay / 1000 }}
            className={className}
            data-animation-delay={delay}
        >
            {children}
        </motion.div>
    );
};

export default Reveal;