import { useEffect, useState } from "react";
import LoaderEntry from "../components/LoaderEntry";

import '../styles/Portfolio.css';
import usePointerType from "../hooks/usePointerType";
import Cursor from "../components/Cursor";
import Hero from "../components/Hero";

const Portfolio = () => {
    const [_, setIsLoaded] = useState<boolean>(false);
    const pointerType = usePointerType();

    useEffect(() => {
        document.body.classList[pointerType == "fine" ? "remove" : "add"]("touch");
    }, [pointerType]);

    return (
        <>
            <LoaderEntry 
                animationLength={5}
                onAnimationFinished={() => setIsLoaded(true)}
            />

            <Hero />


            {
                pointerType == "fine" && <Cursor />
            }
        </>
    );
};

export default Portfolio;
