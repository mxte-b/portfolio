import { useEffect, useState } from "react";
import useHello from "../hooks/useHello";
import BootText from "./BootText";
import { motion, AnimatePresence } from "framer-motion";

const LoaderEntry = ({ animationLength, onAnimationFinished }: { animationLength: number, onAnimationFinished: () => void }) => {

    const [isAnimationFinished, setIsAnimationFinished] = useState<boolean>(false);
    const hello = useHello(1000);

    useEffect(() => {
        const animationTimer = setTimeout(() => {
            setIsAnimationFinished(true);
            onAnimationFinished();
        }, (animationLength) * 1000);

        return () => clearTimeout(animationTimer);
    }, []);

    return (
        <AnimatePresence>
            {!isAnimationFinished && (
                <motion.div
                    className="loader-entry"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ y: "-100%" }}
                        transition={{ duration: 1, ease: [0.455, 0.03, 0.515, 0.955] }}
                    >
                    <div className="hello">{hello}</div>
                    <BootText />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoaderEntry;
