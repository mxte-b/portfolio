import { useEffect, useState } from "react";
import LoaderEntry from "../components/LoaderEntry";

import '../styles/Portfolio.css';
import usePointerType from "../hooks/usePointerType";
import Cursor from "../components/Cursor";

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

            <div className="hero">
                <h1>Hi, I'm mxte_b!</h1>
                <p className="subtext">Software Engineer & Digital Artist</p>
                <p>With more than 5 years of programming experience</p>

                <button type="button" className="enter cursor-pointer">Start Experience</button>
            </div>

            {
                pointerType == "fine" && <Cursor />
            }
        </>
    );
};

export default Portfolio;
