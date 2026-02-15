import Icons from "./Icons";

const AboutMe = () => {
    return (
        <section className="about-me" id="about-me">
            <header>
                <div className="idx">1.</div>
                <div className="title">About Me</div>
            </header>
            <div className="content">
                <div className="intro">
                    <h3>My name is <i>Norman M. Blank</i>, known online as <i>mxte_b</i>.</h3>
                    <p>I am 20 years old, and I enjoy learning and expanding my knowledge in every way I can.</p>
                    <p>I am especially interested in Fractal Rendering, Cryptography and Web Development, and have made numerous projects related to these areas.</p>
                    <p>Alongside my projects, I have consistently achieved outstanding academic performance for over 14 years.</p>
                </div>
                
                <div className="events">
                    <div className="events__header">
                        <Icons.MortarboardFill className="events__icon" />
                        <h3 className="events__title">Education</h3>
                    </div>
                    <div className="events__items">
                        <div className="event-item">
                            <div className="event-item__body">
                                <h4 className="event-item__title">Computer Science BSc</h4>
                                <div className="event-item__description">University of Pannonia</div>
                            </div>
                            <span className="event-item__timespan">2025 - Present</span>
                        </div>
                        <div className="event-item">
                            <div className="event-item__body">
                                <h4 className="event-item__title">Software Development & Testing - Technical Diploma</h4>
                                <div className="event-item__description">VSZC Ipari Technical Secondary School</div>
                            </div>
                            <span className="event-item__timespan">2020 - 2025</span>
                        </div>
                    </div>
                </div>

                <div className="events">
                    <div className="events__header">
                        <Icons.AwardFill className="events__icon" />
                        <h3 className="events__title">Awards</h3>
                    </div>
                    <div className="events__items">
                        <div className="event-item">
                            <div className="event-item__body">
                                <div className="event-item__title">Young Talent's Award</div>
                                <div className="event-item__description">Awarded for outstanding academic performance and consistent excellence.</div>
                            </div>
                            <div className="event-item__timespan">2020</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutMe;