import type { FunctionComponent, SVGProps } from "react";

import ArrowUpRight from "../icons/arrow-up-right.svg?react";
import AwardFill from "../icons/award-fill.svg?react";
import ChevronDown from "../icons/chevron-down.svg?react";
import GeoAltFill from "../icons/geo-alt-fill.svg?react";
import PortfolioIcon from "../icons/icon.svg?react";
import PortfolioIconLarge from "../icons/icon-large.svg?react";
import MortarboardFill from "../icons/mortarboard-fill.svg?react";

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
    AwardFill,
    ChevronDown,
    GeoAltFill,
    PortfolioIcon,
    PortfolioIconLarge,
    MortarboardFill,
} satisfies Record<string, SvgIcon>

export default Icons;