import { motion } from "motion/react";
import navbarItems from "../data/navbarItems";
import Icons from "./Icons";
import useWaypointRouter from "../hooks/useWaypointRouter";
import type { NavbarItem } from "../types/general";
import useLoader from "../hooks/useLoader";

const MobileNavbar = () => {
    const { currentWaypoint, navigate } = useWaypointRouter();
    const { animationFinished } = useLoader();

    const homeNavbarItem: NavbarItem = {
        title: "Home", 
        icon: "HouseFill",
        waypointId: "home"
    }

    const items = [...navbarItems.slice(0, 2), homeNavbarItem, ...navbarItems.slice(2, navbarItems.length)];

    return (
        animationFinished && 
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
                                        className={`navbar-mobile__item cursor-pointer${item.prominent ? " prominent" : ""}${item.waypointId === currentWaypoint ? " active" : ""}`}
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