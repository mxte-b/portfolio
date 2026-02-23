const Projects = () => {
    return (
        <section className="projects" id="projects">
            <header>
                <span className="idx">3.</span>
                <h2 className="title">Featured Projects</h2>
            </header>
            
            <ul className="projects__list">
                <li className="project">
                    <img src="/media/nebula_manager.png" alt="Image of the user interface of Nebula Manager" />
                    <div className="project__body">
                        <div className="project__header">
                            <h3 className="project__title">Nebula Manager</h3>
                            <ul className="project__tags">
                                <li className="project__tag">Tauri</li>
                                <li className="project__tag">Desktop App</li>
                            </ul>
                        </div>
                        <p className="project__description">
                            A modern, hassle-free password manager focused on data locality and privacy.
                        </p>
                        <div className="project__details">
                            <p>My goal with this project was to build a fully-featured password manager I could truly trust with my own credentials.</p>
                            <p>In contrast to many password managers, this project keeps everything local and puts ownership in the user's hands. It features quality-of-life features, like a quick-access overlay that lets you retrieve any password in seconds.</p>
                            <p>The vault is stored as an encrypted JSON file, so only you can access it. If you lose the file or the password, the data is lost forever. That responsibility is exactly what makes it powerful.</p>
                        </div>
                    </div>
                </li>
                
                <li className="project">
                    <div className="project__body">
                        <div className="project__header">
                            <h3 className="project__title">QRay</h3>
                            <ul className="project__tags">
                                <li className="project__tag">C#</li>
                                <li className="project__tag">From Scratch</li>
                            </ul>
                        </div>
                        <p className="project__description">
                            A QR Code Generator made from scratch, using the ISO specification.
                        </p>
                    </div>
                </li>
                
                <li className="project">
                    <div className="project__body">
                        <div className="project__header">
                            <h3 className="project__title">AES Encryption</h3>
                            <ul className="project__tags">
                                <li className="project__tag">C#</li>
                                <li className="project__tag">From Scratch</li>
                            </ul>
                        </div>
                        <p className="project__description">
                            A full implementation of the AES Encryption algorithm, written from scratch.
                        </p>
                    </div>
                </li>
                
                <li className="project">
                    <div className="project__body">
                        <div className="project__header">
                            <h3 className="project__title">Fractal Raymarcher</h3>
                            <ul className="project__tags">
                                <li className="project__tag">C++</li>
                                <li className="project__tag">SFML</li>
                                <li className="project__tag">Raymarching</li>
                            </ul>
                        </div>
                        <p className="project__description">
                            A real-time fractal explorer with realistic lighting, camera effects, and freecam controls.
                        </p>
                    </div>
                </li>
                
                <li className="project">
                    <div className="project__body">
                        <div className="project__header">
                            <h3 className="project__title">2D Fractal Renderer</h3>
                            <ul className="project__tags">
                                <li className="project__tag">Various languages</li>
                                <li className="project__tag">Fractals</li>
                            </ul>
                        </div>
                        <p className="project__description">
                            I've made several 2D fractal renderers, because I love fractals. That's it.
                        </p>
                    </div>
                </li>
                
                <li className="project">
                    <div className="project__body">
                        <div className="project__header">
                            <h3 className="project__title">Florens Botanica e-commerce</h3>
                            <ul className="project__tags">
                                <li className="project__tag">End-to-End</li>
                                <li className="project__tag">Academic</li>
                            </ul>
                        </div>
                        <p className="project__description">
                            A fully-featured e-commerce website using PHP backend, and HTML/CSS/JS for the frontend. Made for academic purposes.
                        </p>
                    </div>
                </li>
            </ul>
        </section>
    );
}

export default Projects;