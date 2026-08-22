import { useEffect, useRef, useState, type ReactNode } from "react";

const DebugView = ({ children }: { children: ReactNode }) => {

    const [isVisible, setIsVisible] = useState<boolean>(true);

    const debugDomRef = useRef<HTMLDivElement | null>(null);
    const elementsRef = useRef<HTMLElement[]>([]);

    const drawDebugView = () => {
        let hue = 0;
        elementsRef.current.map(el => {
            el.style.border =`1px solid hsl(${hue}deg, 80%, 55%)`;
            el.style.backgroundColor =`hsla(${hue}deg, 80%, 10%, 0.5)`;

            const svg = `
                <svg xmlns="http://www.w3.org/2000/svg">
                    <text x="0" y="15" fill="#ddd" font-size="12">
                        ${el.id != "" ? "#" + el.id : "." + el.className}
                    </text>
                </svg>
            `;

            el.style.backgroundImage = `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
            el.style.backgroundSize = "100% 100%";

            hue = (hue + 20 + Math.random() * 60) % 360;
        });
    }

    const undrawDebugView = () => {
        elementsRef.current.map(el => {
            el.style.border = "";
            el.style.backgroundColor = "";
            el.style.backgroundImage = "";
        });
    }

    const handleKeyPressed = (e: KeyboardEvent) => {
        if (e.key === ';') setIsVisible(p => !p);
    }

    useEffect(() => {
        if (!debugDomRef.current) return;

        const parent = debugDomRef.current.parentElement ?? document;
        elementsRef.current = [...parent.querySelectorAll<HTMLElement>(".debug-view ~ :not(.debug-view), .debug-view ~ :not(.debug-view) *")];

        window.addEventListener("keydown", handleKeyPressed);

        return () => {
            window.removeEventListener("keydown", handleKeyPressed);
        }
    }, []);

    useEffect(() => {
        if (isVisible) drawDebugView();
        else undrawDebugView();
    }, [isVisible]);
 
    return (
        <>
            <div ref={debugDomRef} className="debug-view"/>
            {children}
        </>
    );
};

export default DebugView;