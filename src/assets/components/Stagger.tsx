import { Children, isValidElement } from "react";
import type { StaggerParams } from "../types/general";
import Reveal from "./Reveal";

const Stagger = ({ as = "div", width, className, id, children }: StaggerParams) => {

    const Component = as;

    return (
        <Component className={className} style={{ width: width ?? "fit-content" }}>
            {
                Children.map(children, (c, i) => {
                    if (!isValidElement(c) || c.type === Stagger) return c;

                    return <Reveal id={id?.(i)}>{c}</Reveal>
                })
            }
        </Component>
    );
};

export default Stagger;