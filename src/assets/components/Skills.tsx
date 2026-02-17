const Skills = () => {
    return (
        <section className="skills" id="skills">
            <header>
                <span className="idx">2.</span>
                <h2 className="title">Skills</h2>
            </header>

            <div className="skills__overview">
                
            </div>
            
            <div className="skills__content">
                <div className="skill-group">
                    <h3 className="skill-group__title">Web Development</h3>
                    <div className="skill-group__sections">
                        <div className="skill-section">
                            <h4 className="skill-section__title">Frontend</h4>
                            <ul className="skill-section__list">
                                <li className="skill-section__item">React</li>
                                <li className="skill-section__item">TypeScript</li>
                                <li className="skill-section__item">JavaScript</li>
                                <li className="skill-section__item">SCSS</li>
                                <li className="skill-section__item">Framer Motion / GSAP</li>
                            </ul>
                        </div>
                        <div className="skill-section">
                            <h4 className="skill-section__title">Backend</h4>
                            <ul className="skill-section__list">
                                <li className="skill-section__item">PHP</li>
                                <li className="skill-section__item">MySQL</li>
                                <li className="skill-section__item">Laravel</li>
                                <li className="skill-section__item">Express.js</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div className="skill-group">
                    <h3 className="skill-group__title">Desktop Applications</h3>
                    <ul className="skill-group__list">
                        <li className="skill-group__item">C</li>
                        <li className="skill-group__item">C#</li>
                        <li className="skill-group__item">Tauri</li>
                        <li className="skill-group__item">Python</li>
                    </ul>
                </div>

                <div className="skill-group">
                    <h3 className="skill-group__title">Other</h3>
                    <ul className="skill-group__list">
                        <li className="skill-group__item">Git</li>
                        <li className="skill-group__item">GitHub</li>
                        <li className="skill-group__item">Figma</li>
                    </ul>
                </div>
                
                <div className="skill-group">
                    <h3 className="skill-group__title">Currently learning</h3>
                    <ul className="skill-group__list">
                        <li className="skill-group__item">C++</li>
                        <li className="skill-group__item">Go</li>
                        <li className="skill-group__item">Rust</li>
                        <li className="skill-group__item">HLSL</li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Skills;