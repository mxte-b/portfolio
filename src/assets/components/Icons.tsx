import type { FunctionComponent, SVGProps } from "react";

import ArrowUpRight from "../icons/arrow-up-right.svg?react";
import ChevronDown from "../icons/chevron-down.svg?react";
import GeoAltFill from "../icons/geo-alt-fill.svg?react";
import PortfolioIcon from "../icons/icon.svg?react";
import PortfolioIconLarge from "../icons/icon-large.svg?react";

export type SvgIconProps = SVGProps<SVGSVGElement> & {
    title?: string;
    titleId?: string;
    desc?: string;
    descId?: string;
};

export type SvgIcon = FunctionComponent<SvgIconProps>;
export type IconMap = Record<string, SvgIcon>;

const Icons = {
    ArrowUpRight,
    ChevronDown,
    GeoAltFill,
    PortfolioIcon,
    PortfolioIconLarge,
} satisfies Record<string, SvgIcon>

export default Icons;