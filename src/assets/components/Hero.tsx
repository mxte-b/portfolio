import HeroBackground from "./HeroBackground"

const Hero = () => {

  return (
    <div className="hero">
        <HeroBackground fillColor="#86bef3ff"/>

        <h1>Hi, I'm mxte_b!</h1>
        <p className="subtext">Software Engineer & Digital Artist</p>
        <p>With more than 5 years of programming experience</p>

        <button type="button" className="enter cursor-pointer">Start Experience</button>
    </div>
  )
}

export default Hero