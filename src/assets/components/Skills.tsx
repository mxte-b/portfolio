const Skills = () => {
    return (
        <section className="skills" id="skills">
            <header>
                <span className="idx">2.</span>
                <h2 className="title">Skills</h2>
            </header>

            <div className="skills__content">
                <div className="skill-group">
                    <h3 className="skill-group__title">Web Development</h3>
                    <div className="skill-group__sections">
                        <div className="skill-section">
                            <h4 className="skill-section__title">Frontend</h4>
                            <ul className="skill-section__list">
                                <li className="skill-section__item">
                                    <i className="devicon-react-original colored" />
                                    React
                                </li>
                                <li className="skill-section__item">
                                    <i className="devicon-typescript-plain colored" />
                                    TypeScript
                                </li>
                                <li className="skill-section__item">
                                    <i className="devicon-javascript-plain colored" />
                                    JavaScript
                                </li>
                                <li className="skill-section__item">
                                    <i className="devicon-sass-original colored" />
                                    SCSS
                                </li>
                                <li className="skill-section__item">
                                    <i className="devicon-framermotion-original colored" />
                                    Framer Motion
                                </li>
                            </ul>
                        </div>
                        <div className="skill-section">
                            <h4 className="skill-section__title">Backend</h4>
                            <ul className="skill-section__list">
                                <li className="skill-section__item">
                                    <i className="devicon-php-plain colored" />
                                    PHP
                                </li>
                                <li className="skill-section__item">
                                    <i className="devicon-mysql-original colored" />
                                    MySQL
                                </li>
                                <li className="skill-section__item">
                                    <i className="devicon-laravel-original colored" />
                                    Laravel
                                </li>
                                <li className="skill-section__item">
                                    <i className="devicon-express-original" />
                                    Express.js
                                </li>
                                <li className="skill-section__item">
                                    <i className="devicon-nodejs-plain colored" />
                                    Node.js
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="skill-group">
                    <h3 className="skill-group__title">Desktop Applications</h3>
                    <ul className="skill-group__list">
                        <li className="skill-group__item">
                            <i className="devicon-c-plain colored" />
                            C
                        </li>
                        <li className="skill-group__item">
                            <i className="devicon-csharp-plain colored" />
                            C#
                        </li>
                        <li className="skill-group__item">
                            <i className="devicon-tauri-plain colored" />
                            Tauri
                        </li>
                        <li className="skill-group__item">
                            <i className="devicon-python-plain colored" />
                            Python
                        </li>
                    </ul>
                </div>

                <div className="skill-group">
                    <h3 className="skill-group__title">Other</h3>
                    <ul className="skill-group__list">
                        <li className="skill-group__item">
                            <i className="devicon-git-plain colored" />
                            Git
                        </li>
                        <li className="skill-group__item">
                            <i className="devicon-github-original" />
                            GitHub
                        </li>
                        <li className="skill-group__item">
                            <i className="devicon-figma-plain colored" />
                            Figma
                        </li>
                    </ul>
                </div>

                <div className="skill-group skill-group--learning">
                    <h3 className="skill-group__title">Currently learning</h3>
                    <ul className="skill-group__list">
                        <li className="skill-group__item">
                            <i className="devicon-cplusplus-plain colored" />
                            C++
                        </li>
                        <li className="skill-group__item">
                            <i className="devicon-go-original-wordmark colored" />
                            Go
                        </li>
                        <li className="skill-group__item">
                            <i className="devicon-rust-original colored" />
                            Rust
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Skills;