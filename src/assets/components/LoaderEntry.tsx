import { useEffect, useState } from "react";
import useHello from "../hooks/useHello";
import BootText from "./BootText";
import { motion, AnimatePresence } from "framer-motion";

const LoaderEntry = ({ animationLength, onAnimationFinished }: { animationLength: number, onAnimationFinished: () => void }) => {

    const [isAnimationFinished, setIsAnimationFinished] = useState<boolean>(false);
    const hello = useHello(1000);

    useEffect(() => {
        const animationTimer = setTimeout(() => {
            onAnimationFinished();
            setIsAnimationFinished(true);
        }, animationLength * 1000);

        return () => clearTimeout(animationTimer);
    }, []);

    return (
        <AnimatePresence>
            {!isAnimationFinished && (
                <motion.div
                    className="loader-entry"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                    <div className="hello">{hello}</div>
                    <BootText />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoaderEntry;
