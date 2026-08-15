import useRouter from "../hooks/useRouter";
import Icons from "./Icons";
import { AnimatePresence, motion } from "motion/react";

type NavItem = {
    title: string,
    waypointId: string,
    prominent?: boolean,
}

const Navbar = ({ visible = false }: { visible?: boolean }) => {
    const { navigate } = useRouter();

    const navItems: NavItem[] = [
        {title: "About me", waypointId: "aboutMe"}, 
        {title: "Artworks", waypointId: "artworks"}, 
        {title: "Projects", waypointId: "projects"}, 
        {title: "Contact", waypointId: "contact"}
    ];

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
                            <div className="navbar__brand cursor-pointer" onClick={() => navigate("home")}>
                                <Icons.PortfolioIcon />
                            </div>
                    
                            <div className="navbar__items">
                                {navItems.map((item) => (
                                    <div
                                        key={item.waypointId}
                                        onClick={() => navigate(item.waypointId)}
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