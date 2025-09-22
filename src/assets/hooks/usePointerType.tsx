import { useState, useEffect } from "react";

const usePointerType = (): "coarse" | "fine" => {
    const [pointerType, setPointerType] = useState<"coarse" | "fine">("fine");

    const getPointerType = () => window.matchMedia("(pointer: coarse)").matches ? "coarse" : "fine";

    const handlePointerEvent = (e: PointerEvent) => {
        if (e.pointerType === "touch") setPointerType("coarse");
        else setPointerType("fine");
    };

    const handleResize = () => setPointerType(getPointerType());
    
    useEffect(() => {

        setPointerType(getPointerType());


        window.addEventListener("resize", handleResize);
        window.addEventListener("pointerdown", handlePointerEvent);
        window.addEventListener("pointermove", handlePointerEvent);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("pointerdown", handlePointerEvent);
            window.removeEventListener("pointermove", handlePointerEvent);
        };
    }, []);

    return pointerType;
};

export default usePointerType;
