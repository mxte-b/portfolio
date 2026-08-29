import { AnimatePresence, motion } from "motion/react";
import useHelpOverlay from "../hooks/useHelpOverlay";
import useMandelbrotStore from "../hooks/useMandelbrotStore";
import { useEffect } from "react";
import useDevicePreferences from "../hooks/useDevicePreferences";
import Icons from "./Icons";

const HelpOverlay = () => {
    const { visible, setVisible } = useHelpOverlay();
    const { isTouch } = useDevicePreferences();

    useEffect(() => {
        if (!visible) return;

        let unsub: (() => void) | undefined = useMandelbrotStore.subscribe(s => s.viewState, () => {
            setVisible(false);
            unsub?.();
        });

        return unsub;
    }, [visible]);

    return (
        <AnimatePresence>
            {
                visible && 
                <motion.div 
                    initial={{ opacity: 0, visibility: "hidden" }}
                    animate={{ opacity: 1, visibility: "visible" }}
                    exit={{ opacity: 0, visibility: "hidden" }}
                    className="help-overlay"
                >
                    <div className="help-overlay__illustration">
                        {
                            isTouch ? <Icons.HandIndexThumb /> : <Icons.CursorFill />
                        }
                    </div>
                    <div className="help-overlay__text">
                        <p>Drag to move the camera or {isTouch ? "pinch" : "scroll"} to change zoom level.</p>
                        <p>Click the waypoint circles to navigate between pages.</p>
                    </div>
                </motion.div>
            }
        </AnimatePresence>
    );
};

export default HelpOverlay;