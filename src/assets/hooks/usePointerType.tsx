import { useState, useEffect } from "react";

const usePointerType : () => "coarse" | "fine" = () => {
    const [pointerType, setPointerType] = useState<"coarse" | "fine">("fine");

    useEffect(() => {
        const updatePointer = () => {
            setPointerType(window.matchMedia("(pointer: coarse)").matches ? "coarse" : "fine");
        };

        updatePointer();
        window.addEventListener("resize", updatePointer);

        return () => window.removeEventListener("resize", updatePointer);
    }, []);

    return pointerType;
}

export default usePointerType;