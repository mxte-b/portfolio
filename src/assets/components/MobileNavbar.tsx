import { motion } from "motion/react";
import navbarItems from "../data/navbarItems";
import Icons from "./Icons";
import useRouter from "../hooks/useRouter";
import type { NavbarItem } from "../types/general";

const MobileNavbar = ({ visible = false }: { visible?: boolean }) => {
    const { navigate } = useRouter();

    const homeNavbarItem: NavbarItem = {
        title: "Home", 
        icon: "HouseFill",
        waypointId: "home"
    }

    const items = [...navbarItems.slice(0, 2), homeNavbarItem, ...navbarItems.slice(2, navbarItems.length)];

    return (
        visible && 
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="navbar-mobile-wrapper"
        >
            <div className="navbar-mobile">
                <div className="navbar-mobile__items">
                    {
                        items.map(item => 
                            {
                                const Icon = Icons[item.icon];

                                return (
                                    <div
                                        key={item.waypointId}
                                        onClick={() => navigate(item.waypointId)}
                                        title={item.title}
                                        tabIndex={1}
                                        className={`navbar-mobile__item cursor-pointer ${item.prominent ? "prominent" : ""}`}
                                    >
                                        <Icon />
                                        {item.title}
                                    </div>
                                )
                            }
                        )
                    }
                </div>
            </div>
        </motion.div>

    );
};

export default MobileNavbar;