import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

const NavBar = ({ hidden = true }: { hidden?: boolean }) => {
    const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

    const navbarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!navbarRef.current) return;

        setIsTransitioning(true);

        gsap.to(navbarRef.current, {
            yPercent: hidden ? -100 : 0,
            xPercent: -50,
            opacity: hidden ? 0 : 1,
            duration: 1,
            ease: "power2.inOut",
            overwrite: true,
            onComplete: () => {
                setIsTransitioning(false);
            }
        });
    }, [hidden]);

    return (
        <div className="navbar" ref={navbarRef}>
            <div className="nav-brand">MXTE_B</div>
            <div className="nav-items">
                <div className="nav-item">About Me</div>
                <div className="nav-item">Skills</div>
                <div className="nav-item">Projects</div>
                <div className="nav-item">Contact</div>
            </div>
        </div>
    )
}

export default NavBar;