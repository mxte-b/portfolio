import type { CSSProperties } from "react"
import Icons from "./Icons"

const Hero = () => {

    return (
        <div className="hero">

            <div className="hero__background">
                <div className="hero__lights"></div>
            </div>

            <div className="hero__content">
                <h1>{<Icons.PortfolioIconLarge />}</h1>
                <div className="subtext">
                    <div className="hero__professions">
                        <div className="profession">Software Engineer</div>
                        <div className="separator">&</div>
                        <div className="profession">Digital Artist</div>
                    </div>
                </div>
                <button className="contact cursor-pointer">
                    Contact Me
                    <Icons.ArrowUpRight />
                </button>
            </div>

            <div className="hero__metadata">
                <div><Icons.GeoAltFill /> Based in Hungary</div>
                <div>5+ years of programming experience</div>
            </div>
            <div className="hero__scroll-indicator">
                <div className="indicator-arrow"><Icons.ChevronDown/></div>
                <div className="indicator-arrow"><Icons.ChevronDown style={{"--idx": 1} as CSSProperties} /></div>
            </div>
      </div>
    )
}

export default Hero