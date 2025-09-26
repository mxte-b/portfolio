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

const Portfolio = () => {
    const [_, setIsLoaded] = useState<boolean>(false);
    const pointerType = usePointerType();

    useEffect(() => {
        document.body.classList[pointerType == "fine" ? "remove" : "add"]("touch");
    }, [pointerType]);

    useEffect(() => {
        const lenis = new Lenis({
            autoRaf: true,
        });
    }, []);

    return (
        <>
            <LoaderEntry 
                animationLength={5}
                onAnimationFinished={() => setIsLoaded(true)}
            />

            <NavBar />
            
            <Hero />
            <AboutMe />
            <Projects />
            <Footer />

            {
                pointerType == "fine" && <Cursor />
            }
        </>
    );
};

export default Portfolio;
