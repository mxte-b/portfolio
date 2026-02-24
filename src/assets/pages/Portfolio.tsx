import { useEffect, useState } from "react";
import LoaderEntry from "../components/LoaderEntry";

import '../styles/Portfolio.scss';
import usePointerType from "../hooks/usePointerType";
import Cursor from "../components/Cursor";
import Hero from "../components/Hero";
import AboutMe from "../components/AboutMe";
import Projects from "../components/Projects";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import ScrollProgress from "../components/ScrollBar";
import Skills from "../components/Skills";

const Portfolio = () => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [isNavbarHidden, setIsNavbarHidden] = useState<boolean>(true);
    const pointerType = usePointerType();

    useEffect(() => {
        document.body.classList[pointerType == "fine" ? "remove" : "add"]("touch");
    }, [pointerType]);

    useEffect(() => {
        if (!isLoaded) return;

        setIsNavbarHidden(false);
    }, [isLoaded]);

    return (
        <>
            <LoaderEntry 
                animationLength={5}
                onAnimationFinished={() => setIsLoaded(true)}
            />

            <NavBar hidden={isNavbarHidden}/>
            
            <Hero />
            
            <div className="content-wrapper">
                <AboutMe />
                <Skills />
                <Projects />
            </div>

            <Footer />

            {
                pointerType == "fine" && <Cursor />
            }

            <ScrollProgress />
        </>
    );
};

export default Portfolio;
