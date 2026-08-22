import navbarItems from "../data/navbarItems";
import Icons from "./Icons";
import useWaypointRouter from "../hooks/useWaypointRouter";
import type { NavbarItem } from "../types/general";

const MobileNavbar = () => {
    const { route, controls } = useWaypointRouter();

    const homeNavbarItem: NavbarItem = {
        title: "Home", 
        icon: "HouseFill",
        waypointId: "home"
    }

    const items = [...navbarItems.slice(0, 2), homeNavbarItem, ...navbarItems.slice(2, navbarItems.length)];

    return (
        <div className="navbar-mobile-wrapper">
            <div className="navbar-mobile">
                <div className="navbar-mobile__items">
                    {
                        items.map(item => 
                            {
                                const Icon = Icons[item.icon];

                                return (
                                    <button
                                        key={item.waypointId}
                                        onClick={() => controls.navigate(item.waypointId)}
                                        title={item.title}
                                        tabIndex={1}
                                        className={`navbar-mobile__item cursor-pointer${item.prominent ? " prominent" : ""}${item.waypointId === route.target ? " active" : ""}`}
                                    >
                                        <Icon />
                                        {item.title}
                                    </button>
                                )
                            }
                        )
                    }
                </div>
            </div>
        </div>

    );
};

export default MobileNavbar;