import type { WaypointComponentProps } from "../types/general";
import Reveal from "../components/Reveal";
import Stagger from "../components/Stagger";
import WaypointPage from "../components/WaypointPage";

const AboutMe = ({ waypoint, onBack }: WaypointComponentProps) => {
    return (
        <WaypointPage waypoint={waypoint} onBack={onBack}>
            <div className="intro">
                <Reveal className="intro__header">
                    Hi, my name is <span className="intro__name">Mate</span>, aka mxte_b.
                </Reveal>

                <Stagger className="intro__content">
                    <p>I'm a developer, a 3D artist, and a person who loves building things that <em className="fancy">amaze</em> people.</p>
                    <p>I've been building web and desktop apps for 5+ years, and have explored cryptography, algorithms and cybersecurity too.</p>
                </Stagger>
            </div>

            <Reveal className="essentials" width="100%">
                <div className="essentials__header">
                    <h2 className="essentials__title">Essentials</h2>
                    <div className="essentials__description">Quick facts about me.</div>
                </div>
                <div className="essentials__content">
                    <div className="essentials__item left">
                        <p className="essentials__item__subtext">based in</p>
                        <p className="essentials__item__main">Hungary</p>
                    </div>

                    <div className="essentials__divider" />

                    <div className="essentials__item center">
                        <p className="essentials__item__subtext">status</p>
                        <p className="essentials__item__main">Open to work</p>
                    </div>

                    <div className="essentials__divider" />

                    <div className="essentials__item right">
                        <p className="essentials__item__subtext">experience</p>
                        <p className="essentials__item__main">5+ years</p>
                    </div>
                </div>
            </Reveal>

            <Stagger className="story">
                <h2 className="story__header">Why fractals?</h2>
                <Stagger className="story__content">
                    <p>Just by looking at this website, you can probably guess that I like fractals. I made my first Mandelbrot set renderer 3 years ago, and ever since then, I never stopped. </p>
                    <p>The latest and greatest of mine is <em className="fancy">Fractalis</em>, which is a cross-platform escape-time fractal renderer that is fast, expandable, and supports distributed video rendering, which is a fancy way of saying to use multiple devices (via LAN or VPN) and have them work together.</p>
                </Stagger>
            </Stagger>
        </WaypointPage>
    )
}

export default AboutMe;