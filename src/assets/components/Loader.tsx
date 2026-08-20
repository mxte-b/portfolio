import { AnimatePresence, motion } from "motion/react"
import Icons from "./Icons";
import { clamp } from "../utils/math";
import { useEffect } from "react";
import useLoader from "../hooks/useLoader";

let isFirstLoad = true;

const Loader = () => {

    const { progress, animationFinished } = useLoader();

    useEffect(() => { isFirstLoad = false }, [])

    return (
        <AnimatePresence>
            {
                (progress < 1 || !animationFinished) &&
                <motion.div 
                    className="loader"
                    initial={{opacity: isFirstLoad ? 1 : 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                >
                    <Icons.Logo className="loader__icon"/>
                    <div className="loader-progress">
                        <div className="loader-progress__indicator" style={{ width: `${clamp(progress, 0, 1) * 100}%` }}/>
                    </div>
                </motion.div>
            }
        </AnimatePresence>
    );
};

export default Loader;