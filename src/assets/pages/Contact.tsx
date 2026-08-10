import { useEffect, useRef, type JSX } from "react";
import Icons from "../components/Icons";
import Reveal from "../components/Reveal";
import WaypointPage from "../components/WaypointPage";
import type { WaypointComponentProps } from "../types/general";
import { gsap } from "gsap";
import useDevicePreferences from "../hooks/useDevicePreferences";

type ContactMethod = "mail" | "gitHub" | "linkedIn";

const METHODS: { type: ContactMethod, title: string, href: string, icon: JSX.Element }[] = [
    {
        type: "mail",
        title: "Mail",
        href: "mailto:hello@mxteb.dev",
        icon: <Icons.EnvelopeFill className="contact-method__icon" />
    },
    {
        type: "gitHub",
        title: "GitHub",
        href: "https://github.com/mxte-b",
        icon: <Icons.GitHub className="contact-method__icon" />
    },
    {
        type: "linkedIn",
        title: "LinkedIn",
        href: "https://www.linkedin.com/in/mxteb/",
        icon: <Icons.LinkedIn className="contact-method__icon" />
    }
];

const Contact = ({ waypoint, onBack }: WaypointComponentProps) => {

    const { isTouch } = useDevicePreferences();

    const methodRefs = useRef<Record<ContactMethod, HTMLDivElement | null>>({
        mail: null,
        gitHub: null,
        linkedIn: null,
    });

    const handleHoverStart = (method: ContactMethod) => {
        const el = methodRefs.current[method];
        if (!el || isTouch) return;
        
        gsap.killTweensOf(el);
        gsap.fromTo(el, { yPercent: -100 },
        {
            yPercent: 0,
            ease: "ease",
            duration: 0.4
        });
    }
    
    const handleHoverEnd = (method: ContactMethod) => {
        const el = methodRefs.current[method];
        if (!el || isTouch) return;

        gsap.killTweensOf(el);
        gsap.to(el, {
            yPercent: 100,
            ease: "ease",
            duration: 0.4
        });
    }

    useEffect(() => {
        gsap.set(".contact-method__background", { yPercent: -101 });
    }, []);

    return (
        <WaypointPage waypoint={waypoint} label={"contact"} onBack={onBack}>
            <Reveal as="section" className="contact-methods" width="100%">
                <header className="contact-methods__header">
                    <div className="header__inline">
                        <h4>Like my work?</h4>
                        <p>Feel free to get in touch via the methods below.</p>
                    </div>
                    <div className="divider"/>
                </header>
                <ul className="contact-methods__body">
                    {
                        METHODS.map(m => 
                            <li
                                key={m.type}
                                onMouseEnter={() => handleHoverStart(m.type)}
                                onMouseLeave={() => handleHoverEnd(m.type)}
                                className="contact-method"
                            >
                                <a href={m.href} target="_blank">
                                    <div ref={ref => {
                                        methodRefs.current[m.type] = ref; 
                                    }} className="contact-method__background" />
                                    {m.icon}
                                    <div className="contact-method__title">{m.title}</div>
                                    <Icons.ArrowUpRight className="contact-method__cta" />
                                </a>
                            </li>
                        )
                    }
                </ul>
            </Reveal>
        </WaypointPage>
    );
};

export default Contact;