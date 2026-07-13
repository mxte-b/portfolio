export type Project = {
    title: string;
    tags: string[];
    description: string;
    image?: string;
    imageAlt?: string;
    details?: string[];
    links?: { label: string; href?: string }[];
}

export type PointerTypeContextValue = { isTouch: boolean };