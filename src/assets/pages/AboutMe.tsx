import type { WaypointComponentProps } from "../types/general";
import Icons from "../components/Icons";

const AboutMe = ({ waypoint, onBack }: WaypointComponentProps) => {
    return (
        <section className="about-me" id="aboutMe">
            <button className="waypoint-component__back" aria-label="Back" onClick={onBack}>
                <Icons.ArrowLeft />
                Back
            </button>
            <header className="waypoint-component__header">
                <h2 className="waypoint-component__title">About me</h2>
                <div className="waypoint-info">
                    <div className="waypoint-info__location">
                        Location: [{waypoint.location[0]}, {waypoint.location[1]}]
                    </div>
                    <div className="waypoint-info__zoom">Zoom: {waypoint.zoom}</div>
                </div>
            </header>

            <div className="divider" />

            <div className="waypoint-component__content">
                <div className="intro">
                    <div className="intro__header">
                        Hi, my name is <span className="intro__name">Norman</span>, aka mxte_b.
                    </div>
                    <div className="divider vertical" />
                    <div className="intro__content">
                        <p>I am a developer, a 3D artist, and a person who loves building things that <em className="fancy">amazes</em> people.</p>
                        <p>I have over 5 years of experience in Web Development and Desktop Development from my educational history, with additional hands-on experience in Cryptography, Computer Algorithms, and Cybersecurity.</p>
                    </div>
                </div>

                <div className="story">
                    <h2 className="story__header">Why fractals?</h2>
                    <div className="story__content">
                        <p>Just by looking at this website, you can probably guess that I like fractals. I made my first Mandelbrot set renderer 3 years ago, and ever since then, I never stopped. </p>
                        <p>The latest and greatest of mine is <em className="fancy">Fractalis</em>, which is a cross-platform escape-time fractal renderer that is fast, expandable, and supports distributed video rendering, which is a fancy way of saying you can hook up multiple devices (via LAN or VPN) and have them work together. </p>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default AboutMe;