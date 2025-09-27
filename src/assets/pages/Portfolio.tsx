import { useEffect, useState } from "react";
import LoaderEntry from "../components/LoaderEntry";

import '../styles/Portfolio.css';
import usePointerType from "../hooks/usePointerType";
import Cursor from "../components/Cursor";
import Hero from "../components/Hero";
import AboutMe from "../components/AboutMe";
import Projects from "../components/Projects";
import Footer from "../components/Footer";
import Lenis from "lenis";
import NavBar from "../components/NavBar";
import ScrollProgress from "../components/ScrollBar";

const Portfolio = () => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [isNavbarHidden, setIsNavbarHidden] = useState<boolean>(true);
    const pointerType = usePointerType();

    useEffect(() => {
        document.body.classList[pointerType == "fine" ? "remove" : "add"]("touch");
    }, [pointerType]);

    useEffect(() => {
        const lenis = new Lenis({
            autoRaf: true,
        });
    }, []);

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
            <AboutMe />
            <Projects />
            <Footer />

            {
                pointerType == "fine" && <Cursor />
            }

            <ScrollProgress />
        </>
    );
};

export default Portfolio;
