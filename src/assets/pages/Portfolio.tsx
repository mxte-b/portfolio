import { useState } from "react";
import LoaderEntry from "../components/LoaderEntry";

import '../styles/Portfolio.css';

const Portfolio = () => {
    const [_, setIsLoaded] = useState<boolean>(false);

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

                <button type="button" className="enter">Start Experience</button>
            </div>
        </>
    );
};

export default Portfolio;
