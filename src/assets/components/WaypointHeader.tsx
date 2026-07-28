import type { Waypoint } from "../types/general";
import Icons from "./Icons";
import Reveal from "./Reveal";
import WaypointInfo from "./WaypointInfo";

const WaypointHeader = ({ trigger, waypoint, onBack }: { trigger: number, waypoint: Waypoint, onBack: () => void }) => {
    return (
        <>
            <Reveal delay={100} trigger={trigger}>
                <button className="waypoint-component__back" aria-label="Back" onClick={onBack}>
                    <Icons.ArrowLeft />
                    Back
                </button>
            </Reveal>

            <div className="waypoint-component__top">
                <header className="waypoint-component__header">
                    <Reveal delay={150} trigger={trigger}> 
                        <h2 className="waypoint-component__title">{waypoint.label}</h2>
                    </Reveal>
                    <Reveal delay={200} trigger={trigger}> 
                        <div className="waypoint-component__subtext">{waypoint.description}</div>
                    </Reveal>
                </header>

                <Reveal delay={250} trigger={trigger}>
                    <WaypointInfo location={waypoint.location} zoom={waypoint.zoom} />
                </Reveal>
            </div>

            <Reveal delay={300} trigger={trigger} width="100%">
                <div className="divider" />
            </Reveal>
        </>
    );
};

export default WaypointHeader;