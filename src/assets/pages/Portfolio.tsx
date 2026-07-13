import Hero from "../components/Hero";
import Lenis from "lenis";

declare global {
    interface Window {
        lenis: Lenis;
    }
}

const Portfolio = () => {
    return (
        <Hero />
    );
};

export default Portfolio;
