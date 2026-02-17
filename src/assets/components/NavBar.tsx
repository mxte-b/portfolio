import { useState } from "react";
import Icons from "./Icons";
import { AnimatePresence, motion } from "motion/react";

type NavItem = {
    title: string,
    anchor: string,
    prominent?: boolean,
}

const NavBar = ({ hidden = false }: { hidden?: boolean }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navItems: NavItem[] = [
        {title: "About Me", anchor: "about me"}, 
        {title: "Skills", anchor: "skills"}, 
        {title: "Projects", anchor: "projects"}, 
        {title: "Contact", anchor: "contact", prominent: true}
    ];

    const scrollToSection = (item: string) => {
        const sectionId = item.toLowerCase().replace(" ", "-");
        const element = document.getElementById(sectionId);
        if (element) {
            window.lenis?.scrollTo(element);
        }
        setMobileMenuOpen(false);
    };

    return (
        <AnimatePresence>
            {
                !hidden && 
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    className="navbar-wrapper"
                >
                    <div className="navbar">
                        <div className="navbar__body">
                            <div className="navbar__brand">
                                <Icons.PortfolioIcon />
                            </div>
                    
                            <div className="navbar__items">
                                {navItems.map((item) => (
                                    <div
                                        key={item.anchor}
                                        tabIndex={1}
                                        className={`navbar__item cursor-pointer ${item.prominent ? "prominent" : ""}`}
                                        onClick={() => scrollToSection(item.anchor)}
                                    >
                                        {item.title}
                                    </div>
                                ))}
                            </div>
                            <button
                                className={`navbar__opener ${mobileMenuOpen ? 'active' : ''}`}
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                aria-label="Toggle menu"
                            >
                                <div className="line"></div>
                                <div className="line"></div>
                            </button>
                        </div>
                        <AnimatePresence>
                            {
                                mobileMenuOpen &&
                
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="navbar__mobile"
                                >
                                    {
                                        navItems.map((item, i) => (
                                            <div
                                                key={item.anchor}
                                                className={`navbar__mobile-item cursor-pointer ${item.prominent ? "prominent" : ""}`}
                                                onClick={() => scrollToSection(item.anchor)}
                                                style={{ animationDelay: `${i * 0.1}s` }}
                                            >
                                                <div className="item-idx">{i+1}.</div>
                                                <div className="item-title">{item.title}</div>
                                            </div>
                                        ))
                                    }
                                </motion.div>
                            }
                        </AnimatePresence>
                    </div>
                </motion.div>
            }
        </AnimatePresence>
    );
};

export default NavBar;