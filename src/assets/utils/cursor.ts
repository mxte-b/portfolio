import type { CursorState } from "../types/cursor";

const isTextSelectable = (el: Element | null) => {
    if (!el) return false;

    return window.getComputedStyle(el).userSelect != "none";
}

const hasTextContent = (el: Element | null) => {
    if (!el) return false;

    return Array.from(el.childNodes).some(
        (node) => node.nodeType === Node.TEXT_NODE && node.nodeValue?.trim() !== ""
    );
}

export const getCursorState : (hoveredEl: Element | null) => CursorState = (hoveredEl : Element | null) => {
    if (!hoveredEl) return "default";

    const hasText = hasTextContent(hoveredEl);
    const isSelectable = isTextSelectable(hoveredEl);
    const hasPointer = hoveredEl.classList.contains("cursor-pointer");
    const isLink = hoveredEl.nodeName == "A";

    if (hasPointer || isLink) {
        return "pointer";
    }
    else if (hasText && isSelectable) {
        return "text";
    }
    else return "default";
}