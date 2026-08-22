import Icons from "./Icons";
import navbarItems from "../data/navbarItems";
import useWaypointRouter from "../hooks/useWaypointRouter";

const Navbar = () => {
    const { controls } = useWaypointRouter();

    return (
        <div className="navbar-wrapper">
            <div className="navbar">
                <div className="navbar__body">
                    <div className="navbar__brand cursor-pointer" onClick={() => controls.navigate("home")} title="Home">
                        <Icons.PortfolioIcon />
                    </div>
            
                    <div className="navbar__items">
                        {navbarItems.map(item => (
                            <button
                                key={item.waypointId}
                                onClick={() => controls.navigate(item.waypointId)}
                                title={item.title}
                                tabIndex={1}
                                className={`navbar__item cursor-pointer${item.prominent ? " prominent" : ""}`}
                            >
                                {item.title}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;