import { useEffect, useState } from "react";

const QUERIES = {
    medium: window.matchMedia("(max-width: 768px)"),
    small: window.matchMedia("(max-width: 480px)")
}

const getBreakpoint = () => {
    if (QUERIES.small.matches) return "small";
    if (QUERIES.medium.matches) return "medium";
    return "large";
}

const useMasonryBreakpoint = (): "large" | "medium" | "small" => {

    const [breakpoint, setBreakpoint] = useState<"large" | "medium" | "small">(getBreakpoint());

    const updateBreakpoint = () => setBreakpoint(getBreakpoint());

    useEffect(() => {
        QUERIES.medium.addEventListener("change", updateBreakpoint);
        QUERIES.small.addEventListener("change", updateBreakpoint);

        return () => {
            QUERIES.medium.removeEventListener("change", updateBreakpoint);
            QUERIES.small.removeEventListener("change", updateBreakpoint);
        }
    }, []);

    return breakpoint;
};

export default useMasonryBreakpoint;