import useWaypointRouter from "../hooks/useWaypointRouter";
import Icons from "../components/Icons";

const Hero = () => {
    const { controls } = useWaypointRouter();

    return (
        <>
            <section className="hero" aria-labelledby="hero-title">
                <div className="hero__content">
                    <div className="hero__wrapper">
                        <h1 className="hero__title" id="hero-title">mate blank.</h1>
                        <div className="hero__accent-line"/>
                    </div>
                    <div className="hero__details">
                        <div className="hero__detail--main">
                            <p>developer</p>
                            <p>digital artist</p>
                        </div>
                        <div className="hero__detail">
                            <p>Based in <span className="highlight">Hungary</span></p>
                            <p><span className="highlight">5+ years</span> experience</p>
                        </div>
                    </div>
                </div>
                <div className="hero__cta">
                    <div className="cta__socials">
                        <a href="https://github.com/mxte-b" target="_blank" className="hero__button">
                            <Icons.GitHub className="contact-method__icon" />
                        </a>
                        <a href="https://www.linkedin.com/in/mxteb/" target="_blank" className="hero__button">
                            <Icons.LinkedIn className="contact-method__icon" />
                        </a>
                    </div>
                    <div className="cta__main">
                        <a href="mailto:hello@mxteb.dev" className="hero__mail"><span>Contact me</span><Icons.ArrowUpRight /></a>
                        <button className="hero__start" onClick={() => controls.navigate("overview")}>Start Experience</button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Hero