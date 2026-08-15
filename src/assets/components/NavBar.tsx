import Icons from "./Icons";
import navbarItems from "../data/navbarItems";

import useRouter from "../hooks/useRouter";
import { AnimatePresence, motion } from "motion/react";

const Navbar = ({ visible = false }: { visible?: boolean }) => {
    const { navigate } = useRouter();

    return (
        <AnimatePresence>
            {
                visible && 
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    className="navbar-wrapper"
                >
                    <div className="navbar">
                        <div className="navbar__body">
                            <div className="navbar__brand cursor-pointer" onClick={() => navigate("home")} title="Home">
                                <Icons.PortfolioIcon />
                            </div>
                    
                            <div className="navbar__items">
                                {navbarItems.map(item => (
                                    <div
                                        key={item.waypointId}
                                        onClick={() => navigate(item.waypointId)}
                                        title={item.title}
                                        tabIndex={1}
                                        className={`navbar__item cursor-pointer ${item.prominent ? "prominent" : ""}`}
                                    >
                                        {item.title}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            }
        </AnimatePresence>
    );
};

export default Navbar;