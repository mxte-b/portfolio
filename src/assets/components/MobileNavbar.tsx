import navbarItems from "../data/navbarItems";
import Icons from "./Icons";
import useWaypointRouter from "../hooks/useWaypointRouter";
import type { NavbarItem } from "../types/general";
import useLoader from "../hooks/useLoader";

const MobileNavbar = () => {
    const { route, controls } = useWaypointRouter();
    const { animationFinished } = useLoader();

    const homeNavbarItem: NavbarItem = {
        title: "Home", 
        icon: "HouseFill",
        waypointId: "home"
    }

    const items = [...navbarItems.slice(0, 2), homeNavbarItem, ...navbarItems.slice(2, navbarItems.length)];

    return (
        animationFinished && 
        <div className="navbar-mobile-wrapper">
            <div className="navbar-mobile">
                <div className="navbar-mobile__items">
                    {
                        items.map(item => 
                            {
                                const Icon = Icons[item.icon];

                                return (
                                    <div
                                        key={item.waypointId}
                                        onClick={() => controls.navigate(item.waypointId)}
                                        title={item.title}
                                        tabIndex={1}
                                        className={`navbar-mobile__item cursor-pointer${item.prominent ? " prominent" : ""}${item.waypointId === route.target ? " active" : ""}`}
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
        </div>

    );
};

export default MobileNavbar;