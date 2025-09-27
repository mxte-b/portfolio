import { useEffect, useState } from "react";

const ScrollProgress = () => {
    const [progress, setProgress] = useState<number>(0);

    useEffect(() => {   
        let canFire = true;

        const handleScroll = () => {
            if (canFire) {
                window.requestAnimationFrame(() => {
                    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
                    const ratio = scrollTop / (scrollHeight - clientHeight);
                    setProgress(ratio * 100);
                    canFire = true;
                });
                canFire = false;
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="scrollbar">
            <div className="scroll-progress" style={{ transform: `scaleX(${progress / 100})`}}></div>
        </div>
    )
};

export default ScrollProgress;