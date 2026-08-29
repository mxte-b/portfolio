import type { FunctionComponent, SVGProps } from "react";

import ArrowLeft from "../icons/arrow-left.svg?react";
import ArrowUpRight from "../icons/arrow-up-right.svg?react";
import AwardFill from "../icons/award-fill.svg?react";
import BracesAsterisk from "../icons/braces-asterisk.svg?react";
import ChevronDown from "../icons/chevron-down.svg?react";
import CursorFill from "../icons/cursor-fill.svg?react";
import EnvelopeFill from "../icons/envelope-fill.svg?react";
import GeoAltFill from "../icons/geo-alt-fill.svg?react";
import GitHub from "../icons/github.svg?react";
import HandIndexThumb from "../icons/hand-index-thumb.svg?react";
import HouseFill from "../icons/house-fill.svg?react";
import ImageFill from "../icons/image-fill.svg?react";
import LightningChargeFill from "../icons/lightning-charge-fill.svg?react";
import LinkedIn from "../icons/linkedin.svg?react";
import Logo from "../icons/icon.svg?react";
import MortarboardFill from "../icons/mortarboard-fill.svg?react";
import PersonFill from "../icons/person-fill.svg?react";
import PortfolioIcon from "../icons/icon.svg?react";
import TelephoneFill from "../icons/telephone-fill.svg?react";

export type SvgIconProps = SVGProps<SVGSVGElement> & {
    title?: string;
    titleId?: string;
    desc?: string;
    descId?: string;
};

export type SvgIcon = FunctionComponent<SvgIconProps>;
export type IconMap = Record<string, SvgIcon>;

const Icons = {
    ArrowLeft,
    ArrowUpRight,
    AwardFill,
    BracesAsterisk,
    ChevronDown,
    CursorFill,
    EnvelopeFill,
    GeoAltFill,
    GitHub,
    HandIndexThumb,
    HouseFill,
    ImageFill,
    LightningChargeFill,
    LinkedIn,
    Logo,
    MortarboardFill,
    PersonFill,
    PortfolioIcon,
    TelephoneFill,
} satisfies Record<string, SvgIcon>;

export default Icons;