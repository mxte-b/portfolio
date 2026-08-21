import useScreenBreakpoint from "../hooks/useScreenBreakpoint";
import type { Waypoint } from "../types/general";
import Icons from "./Icons";
import Reveal from "./Reveal";
import Stagger from "./Stagger";
import WaypointInfo from "./WaypointInfo";

const WaypointHeader = ({ waypoint, onBack }: { waypoint: Waypoint, onBack: () => void }) => {
    const breakpoint = useScreenBreakpoint();

    return (
        <>
            <Reveal>
                <button className="waypoint-component__back" aria-label="Back" onClick={onBack}>
                    <Icons.ArrowLeft />
                    Back
                </button>
            </Reveal>

            <div className="waypoint-component__top">
                <header className="waypoint-component__header">
                    <Stagger> 
                        <h2 className="waypoint-component__title">{waypoint.label}</h2>
                        <div className="waypoint-component__subtext">{waypoint.description}</div>
                    </Stagger>
                </header>

                {
                    breakpoint === "large" &&
                    <Reveal id={`${waypoint.id}-info-canvas`}>
                        <WaypointInfo location={waypoint.location} />
                    </Reveal>
                }
            </div>

            <Reveal width="100%">
                <div className="divider" />
            </Reveal>
        </>
    );
};

export default WaypointHeader;