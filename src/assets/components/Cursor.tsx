import { useEffect, useRef, useState } from "react";
import { getCursorState } from "../utils/cursor";
import { type CursorState, CursorStateValues } from "../types/cursor";

const Cursor = () => {
    const [isPressed, setIsPressed] = useState<boolean>(false);
    const [isVisible, setIsVisible] = useState<boolean>(true);
    
    const cursorRef = useRef<HTMLDivElement>(null);
    const cursorCaretRef = useRef<HTMLDivElement>(null);
    const hoveredEl = useRef<Element>(null);
    const lastState = useRef<CursorState>("default");

    const mousePos = useRef({ x: 0, y: 0 });
    const raf = useRef<number>(0);

    const updateCursor = () => {
        if (!cursorRef.current || !cursorCaretRef.current) return;

        // Update cursor
        cursorRef.current.style.transform = `translate(${mousePos.current.x}px, ${mousePos.current.y}px) translate(-50%, -50%)`;
        cursorCaretRef.current.style.transform = `scale(${isPressed ? 0.8 : 1})`;

        // Get cursor state
        const state = getCursorState(hoveredEl.current);

        // Update state
        if (state !== lastState.current) {
            cursorRef.current.classList.remove(...CursorStateValues);
            cursorRef.current.classList.add(state);
            lastState.current = state;
        }

        // Request next update frame
        raf.current = requestAnimationFrame(updateCursor);
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
            hoveredEl.current = document.elementFromPoint(e.clientX, e.clientY);
        };

        const handleMouseDown = () => setIsPressed(true);
        const handleMouseUp = () => setIsPressed(false);
        const handleMouseEnter = () => setIsVisible(true);
        const handleMouseLeave = () => setIsVisible(false);

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);

        document.addEventListener("mouseenter", handleMouseEnter);
        document.addEventListener("mouseleave", handleMouseLeave);

        raf.current = requestAnimationFrame(updateCursor);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);

            document.removeEventListener("mouseenter", handleMouseEnter);
            document.removeEventListener("mouseleave", handleMouseLeave);

            if (raf.current) cancelAnimationFrame(raf.current);
        };
    }, [isPressed]);

    return <div className={"cursor" + (isVisible ? "" : " hidden") + " default"} ref={cursorRef}>
        <div className="cursor-caret" ref={cursorCaretRef}></div>
        <div className="cursor-caret-border"></div>
    </div>;
};

export default Cursor;
