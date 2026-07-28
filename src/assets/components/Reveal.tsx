import { useEffect, useRef } from "react";
import type { RevealParams } from "../types/general";
import { motion, useAnimationControls, type Variants } from "motion/react";

const Reveal = ({ trigger, delay, width, children }: RevealParams) => {
    const isFirstRef = useRef<boolean>(true);

    const controls = useAnimationControls();

    const variants: Variants = {
        hidden: {
            visibility: "hidden",
            opacity: 0,
            filter: "blur(5px)",
            y: 10,
            scale: 0.95,
            willChange: "transform"
        },
        visible: {
            visibility: "visible",
            opacity: 1,
            filter: "none",
            y: 0,
            scale: 1,
            willChange: "none"
        }
    } ;

    useEffect(() => {
        if (isFirstRef.current) {
            isFirstRef.current = false; 
            return;
        }

        controls.start("visible")
    }, [trigger]);

    return (
        <motion.div
            variants={variants}
            initial="hidden"
            animate={controls}
            style={width ? { width: width } : { width: "fit-content" }}
            transition={{ delay: delay / 1000 }}
        >
            {children}
        </motion.div>
    );
};

export default Reveal;