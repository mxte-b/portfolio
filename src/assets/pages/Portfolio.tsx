import { useState } from "react";
import LoaderEntry from "../components/LoaderEntry";

import '../styles/Portfolio.css';

const Portfolio = () => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    return (
        <>
            <LoaderEntry 
                animationLength={5}
                onAnimationFinished={() => setIsLoaded(true)}
            />

            <>
                <h1>Portfolio</h1>
                <p>Hi, I'm mxte_b!</p>
                <p>A generalist developer</p>
                <span>With more than 5 years of programming experience</span>
            </>
        </>
    );
};

export default Portfolio;
