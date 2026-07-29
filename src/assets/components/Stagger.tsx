import { Children, isValidElement } from "react";
import type { RevealParams } from "../types/general";
import { motion } from "motion/react";
import Reveal from "./Reveal";

const Stagger = ({ width, className, children }: RevealParams) => {
    return (
        <motion.div className={className} style={{ width: width ?? "fit-content" }}>
            {
                Children.map(children, c => {
                    if (!isValidElement(c) || c.type === Stagger) return c;

                    return <Reveal>{c}</Reveal>
                })
            }
        </motion.div>
    );
};

export default Stagger;