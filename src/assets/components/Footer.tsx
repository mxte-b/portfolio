import { useScroll, useTransform, motion } from "motion/react";
import Icons from "./Icons";

const Footer = () => {
    const { scrollYProgress } = useScroll();
    const footerParallax = useTransform(scrollYProgress, [0.75, 1], [-100, 0]);

    return (
        <motion.footer style={{ y: footerParallax }} className="footer">
            <div className="footer__inner">

                <div className="footer__connect" id="contact">
                    <h2 className="footer__heading">Let's connect</h2>
                    <nav className="footer__links">
                        <a href="https://github.com/mxte-b" className="footer__link" target="_blank" rel="noreferrer" title="https://github.com/mxte-b"><Icons.GitHub /></a>
                        <a href="https://linkedin.com/in/mxte-b" className="footer__link" target="_blank" rel="noreferrer" title="https://linkedin.com/in/mxte-b"><Icons.LinkedIn /></a>
                        <a href="mailto:hello@mxteb.dev" className="footer__link" title="mailto:hello@mxteb.dev"><Icons.EnveopeFill /></a>
                    </nav>
                </div>

                <div className="footer__bottom">
                    <span className="footer__rights">© 2026 mxte_b. All rights reserved.</span>
                    <span className="footer__credit"><i>This image was created with my fractal renderer.</i></span>
                </div>

            </div>
            <div className="footer__bg"/>
        </motion.footer>
    );
};

export default Footer;