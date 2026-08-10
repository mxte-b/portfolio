import { Children, isValidElement } from "react";
import type { RevealParams } from "../types/general";
import Reveal from "./Reveal";

const Stagger = ({ as = "div", width, className, children }: RevealParams) => {

    const Component = as;

    return (
        <Component className={className} style={{ width: width ?? "fit-content" }}>
            {
                Children.map(children, c => {
                    if (!isValidElement(c) || c.type === Stagger) return c;

                    return <Reveal>{c}</Reveal>
                })
            }
        </Component>
    );
};

export default Stagger;