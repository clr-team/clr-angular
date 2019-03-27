/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/*
 * Do NOT Angular this up. It assumes we're in the DOM, plays with native elements, ...
 * It could potentially be used as part of @clr/ui as a vanilla Javascript helper.
 */
import { Subject } from 'rxjs';
/** @enum {number} */
const Point = {
    RIGHT_CENTER: 0,
    RIGHT_TOP: 1,
    RIGHT_BOTTOM: 2,
    TOP_CENTER: 3,
    TOP_RIGHT: 4,
    TOP_LEFT: 5,
    BOTTOM_CENTER: 6,
    BOTTOM_RIGHT: 7,
    BOTTOM_LEFT: 8,
    LEFT_CENTER: 9,
    LEFT_TOP: 10,
    LEFT_BOTTOM: 11,
};
export { Point };
Point[Point.RIGHT_CENTER] = 'RIGHT_CENTER';
Point[Point.RIGHT_TOP] = 'RIGHT_TOP';
Point[Point.RIGHT_BOTTOM] = 'RIGHT_BOTTOM';
Point[Point.TOP_CENTER] = 'TOP_CENTER';
Point[Point.TOP_RIGHT] = 'TOP_RIGHT';
Point[Point.TOP_LEFT] = 'TOP_LEFT';
Point[Point.BOTTOM_CENTER] = 'BOTTOM_CENTER';
Point[Point.BOTTOM_RIGHT] = 'BOTTOM_RIGHT';
Point[Point.BOTTOM_LEFT] = 'BOTTOM_LEFT';
Point[Point.LEFT_CENTER] = 'LEFT_CENTER';
Point[Point.LEFT_TOP] = 'LEFT_TOP';
Point[Point.LEFT_BOTTOM] = 'LEFT_BOTTOM';
/** @type {?} */
const POSITION_RELATIVE = 'relative';
/** @type {?} */
const POSITION_ABSOLUTE = 'absolute';
/** @type {?} */
const POSITION_FIXED = 'fixed';
/** @type {?} */
const OVERFLOW_SCROLL = 'scroll';
/** @type {?} */
const OVERFLOW_AUTO = 'auto';
export class Popover {
    /**
     * @param {?} element
     */
    constructor(element) {
        this.element = element;
        /*
             * Containers up to the first positioned one will have an event on scroll
             */
        this.scrollableElements = [];
        this.boundOnScrollListener = this.emitScrollEvent.bind(this);
        // Browsers don't agree with what to do if some of these are not specified, so we set them all to be safe.
        element.style.position = POSITION_ABSOLUTE;
        element.style.top = 0;
        element.style.bottom = 'auto';
        element.style.left = 0;
        element.style.right = 'auto';
    }
    // TODO: need a way to account for parameters that change dynamically (positioning).
    /**
     * @param {?} anchor
     * @param {?} anchorAlign
     * @param {?} popoverAlign
     * @param {?=} __3
     * @return {?}
     */
    anchor(anchor, anchorAlign, popoverAlign, { offsetX = 0, offsetY = 0, useAnchorParent = false } = {}) {
        // TODO: we are assuming here that the popover is inside or next to the anchor.
        // We'd need to go up the popover tree too otherwise
        this.addScrollEventListeners(anchor);
        if (useAnchorParent) {
            anchor = anchor.parentNode;
        }
        // explicitly override anchor's style to static
        anchor.style.position = 'static';
        /** @type {?} */
        const anchorRect = anchor.getBoundingClientRect();
        /** @type {?} */
        const popoverRect = this.element.getBoundingClientRect();
        // position of left top corner of anchor + the offset
        /** @type {?} */
        let leftDiff = anchorRect.left - popoverRect.left + offsetX;
        /** @type {?} */
        let topDiff = anchorRect.top - popoverRect.top + offsetY;
        // first, adjust positioning based on anchor's align point
        switch (anchorAlign) {
            case Point.LEFT_TOP:
            case Point.TOP_LEFT:
                break;
            case Point.TOP_CENTER:
                leftDiff += anchorRect.width / 2;
                break;
            case Point.TOP_RIGHT:
                leftDiff += anchorRect.width;
                break;
            case Point.RIGHT_TOP:
                leftDiff += anchorRect.width;
                break;
            case Point.LEFT_BOTTOM:
                topDiff += anchorRect.height;
                break;
            case Point.BOTTOM_LEFT:
                topDiff += anchorRect.height;
                break;
            case Point.BOTTOM_CENTER:
                topDiff += anchorRect.height;
                leftDiff += anchorRect.width / 2;
                break;
            case Point.BOTTOM_RIGHT:
                topDiff += anchorRect.height;
                leftDiff += anchorRect.width;
                break;
            case Point.RIGHT_BOTTOM:
                topDiff += anchorRect.height;
                leftDiff += anchorRect.width;
                break;
            case Point.LEFT_CENTER:
                topDiff += anchorRect.height / 2;
                break;
            case Point.RIGHT_CENTER:
                topDiff += anchorRect.height / 2;
                leftDiff += anchorRect.width;
                break;
            default:
        }
        // second, adjust positioning based on popover's align point
        switch (popoverAlign) {
            case Point.LEFT_TOP:
            case Point.TOP_LEFT:
                break;
            case Point.TOP_CENTER:
                leftDiff -= popoverRect.width / 2;
                break;
            case Point.TOP_RIGHT:
                leftDiff -= popoverRect.width;
                break;
            case Point.RIGHT_TOP:
                leftDiff -= popoverRect.width;
                break;
            case Point.LEFT_BOTTOM:
                topDiff -= popoverRect.height;
                break;
            case Point.BOTTOM_LEFT:
                topDiff -= popoverRect.height;
                break;
            case Point.BOTTOM_CENTER:
                topDiff -= popoverRect.height;
                leftDiff -= popoverRect.width / 2;
                break;
            case Point.BOTTOM_RIGHT:
                topDiff -= popoverRect.height;
                leftDiff -= popoverRect.width;
                break;
            case Point.RIGHT_BOTTOM:
                topDiff -= popoverRect.height;
                leftDiff -= popoverRect.width;
                break;
            case Point.LEFT_CENTER:
                topDiff -= popoverRect.height / 2;
                break;
            case Point.RIGHT_CENTER:
                topDiff -= popoverRect.height / 2;
                leftDiff -= popoverRect.width;
                break;
            default:
        }
        // Third, adjust with popover's margins based on the two align points.
        // Here, we make an assumption that popover is primarily positioned outside the
        // anchor with minor offset. Without this assumption, it's impossible to apply
        // the popover's margins in a predictable way. For example, assume that a popover
        // and its anchor are exactly the same size. if a popover is positioned inside the
        // anchor (which is technically possible), then it becomes impossible to know what to do
        // if the popover has a non-zero margin value all around (because applying the margin in
        // all four directions will result in no margin visually, which isn't what we want).
        // Therefore, our logic makes assumptions about margins of interest given the points,
        // and only covers the cases where popover is outside the anchor.
        /** @type {?} */
        const popoverComputedStyle = getComputedStyle(this.element);
        /** @type {?} */
        const marginLeft = parseInt(popoverComputedStyle.marginLeft, 10);
        /** @type {?} */
        const marginRight = parseInt(popoverComputedStyle.marginRight, 10);
        /** @type {?} */
        const marginTop = parseInt(popoverComputedStyle.marginTop, 10);
        /** @type {?} */
        const marginBottom = parseInt(popoverComputedStyle.marginBottom, 10);
        switch (anchorAlign) {
            case Point.LEFT_TOP:
            case Point.TOP_LEFT:
            case Point.TOP_RIGHT:
            case Point.RIGHT_TOP:
                if (popoverAlign === Point.BOTTOM_RIGHT || popoverAlign === Point.RIGHT_BOTTOM) {
                    topDiff -= marginBottom;
                    leftDiff -= marginRight;
                }
                if (popoverAlign === Point.BOTTOM_LEFT || popoverAlign === Point.LEFT_BOTTOM) {
                    topDiff -= marginTop;
                    leftDiff += marginLeft;
                }
                if (popoverAlign === Point.TOP_LEFT || popoverAlign === Point.LEFT_TOP) {
                    topDiff += marginTop;
                    leftDiff += marginLeft;
                }
                if (popoverAlign === Point.TOP_RIGHT || popoverAlign === Point.RIGHT_TOP) {
                    topDiff += marginTop;
                    leftDiff -= marginRight;
                }
                break;
            case Point.LEFT_BOTTOM:
            case Point.BOTTOM_LEFT:
            case Point.BOTTOM_RIGHT:
            case Point.RIGHT_BOTTOM:
                if (popoverAlign === Point.BOTTOM_LEFT || popoverAlign === Point.LEFT_BOTTOM) {
                    topDiff -= marginBottom;
                    leftDiff += marginLeft;
                }
                if (popoverAlign === Point.BOTTOM_RIGHT || popoverAlign === Point.RIGHT_BOTTOM) {
                    topDiff -= marginBottom;
                    leftDiff -= marginRight;
                }
                if (popoverAlign === Point.TOP_LEFT || popoverAlign === Point.LEFT_TOP) {
                    topDiff += marginTop;
                    leftDiff += marginLeft;
                }
                if (popoverAlign === Point.TOP_RIGHT || popoverAlign === Point.RIGHT_TOP) {
                    topDiff += marginTop;
                    leftDiff -= marginRight;
                }
                break;
            case Point.TOP_CENTER:
                topDiff -= marginBottom;
                leftDiff += marginLeft;
                leftDiff -= marginRight;
                break;
            case Point.BOTTOM_CENTER:
                topDiff += marginTop;
                leftDiff += marginLeft;
                leftDiff -= marginRight;
                break;
            case Point.LEFT_CENTER:
                topDiff += marginTop;
                topDiff -= marginBottom;
                leftDiff -= marginRight;
                break;
            case Point.RIGHT_CENTER:
                topDiff += marginTop;
                topDiff -= marginBottom;
                leftDiff += marginLeft;
                break;
            default:
        }
        this.element.style.transform = `translateX(${Math.round(leftDiff)}px) translateY(${Math.round(topDiff)}px)`;
        return this._scroll.asObservable();
    }
    /**
     * @return {?}
     */
    release() {
        this.element.style.transform = '';
        this.removeScrollEventListeners();
    }
    /**
     * @private
     * @param {?} container
     * @return {?}
     */
    isPositioned(container) {
        /** @type {?} */
        const position = getComputedStyle(container).position;
        return position === POSITION_RELATIVE || position === POSITION_ABSOLUTE || position === POSITION_FIXED;
    }
    /**
     * @private
     * @return {?}
     */
    emitScrollEvent() {
        this._scroll.next();
    }
    /**
     * @private
     * @param {?} e
     * @return {?}
     */
    addScrollEventListeners(e) {
        this._scroll = new Subject();
        /** @type {?} */
        const anchor = e;
        /** @type {?} */
        let current = e;
        while (current && current !== document) {
            if (this.scrolls(current)) {
                current.addEventListener('scroll', this.boundOnScrollListener);
                this.scrollableElements.push(current);
            }
            if (current !== anchor && this.isPositioned(current)) {
                break;
            }
            current = current.parentNode;
        }
    }
    /**
     * @private
     * @return {?}
     */
    removeScrollEventListeners() {
        for (const elem of this.scrollableElements) {
            elem.removeEventListener('scroll', this.boundOnScrollListener);
        }
        this.scrollableElements.length = 0;
        if (this._scroll) {
            this._scroll.complete();
            delete this._scroll;
        }
    }
    /**
     * @private
     * @param {?} container
     * @return {?}
     */
    scrolls(container) {
        /** @type {?} */
        const computedStyles = getComputedStyle(container);
        return (computedStyles.overflowX === OVERFLOW_SCROLL ||
            computedStyles.overflowX === OVERFLOW_AUTO ||
            computedStyles.overflowY === OVERFLOW_SCROLL ||
            computedStyles.overflowY === OVERFLOW_AUTO);
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    Popover.prototype._scroll;
    /**
     * @type {?}
     * @private
     */
    Popover.prototype.scrollableElements;
    /**
     * @type {?}
     * @private
     */
    Popover.prototype.boundOnScrollListener;
    /**
     * @type {?}
     * @private
     */
    Popover.prototype.element;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbInBvcG92ZXIvY29tbW9uL3BvcG92ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQVlBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7OztJQUc3QixlQUFZO0lBQ1osWUFBUztJQUNULGVBQVk7SUFDWixhQUFVO0lBQ1YsWUFBUztJQUNULFdBQVE7SUFDUixnQkFBYTtJQUNiLGVBQVk7SUFDWixjQUFXO0lBQ1gsY0FBVztJQUNYLFlBQVE7SUFDUixlQUFXOzs7Ozs7Ozs7Ozs7Ozs7O01BR1AsaUJBQWlCLEdBQUcsVUFBVTs7TUFDOUIsaUJBQWlCLEdBQUcsVUFBVTs7TUFDOUIsY0FBYyxHQUFHLE9BQU87O01BRXhCLGVBQWUsR0FBRyxRQUFROztNQUMxQixhQUFhLEdBQUcsTUFBTTtBQUU1QixNQUFNLE9BQU8sT0FBTzs7OztJQUdsQixZQUFvQixPQUFZO1FBQVosWUFBTyxHQUFQLE9BQU8sQ0FBSzs7OztRQTBOeEIsdUJBQWtCLEdBQWtCLEVBQUUsQ0FBQztRQU12QywwQkFBcUIsR0FBUSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQS9ObkUsMEdBQTBHO1FBQzFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLGlCQUFpQixDQUFDO1FBQzNDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUN0QixPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDOUIsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZCLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQztJQUMvQixDQUFDOzs7Ozs7Ozs7SUFHTSxNQUFNLENBQ1gsTUFBVyxFQUNYLFdBQWtCLEVBQ2xCLFlB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biAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG4vKlxuICogRG8gTk9UIEFuZ3VsYXIgdGhpcyB1cC4gSXQgYXNzdW1lcyB3ZSdyZSBpbiB0aGUgRE9NLCBwbGF5cyB3aXRoIG5hdGl2ZSBlbGVtZW50cywgLi4uXG4gKiBJdCBjb3VsZCBwb3RlbnRpYWxseSBiZSB1c2VkIGFzIHBhcnQgb2YgQGNsci91aSBhcyBhIHZhbmlsbGEgSmF2YXNjcmlwdCBoZWxwZXIuXG4gKi9cblxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgUG9wb3Zlck9wdGlvbnMgfSBmcm9tICcuL3BvcG92ZXItb3B0aW9ucy5pbnRlcmZhY2UnO1xuZXhwb3J0IGVudW0gUG9pbnQge1xuICBSSUdIVF9DRU5URVIsXG4gIFJJR0hUX1RPUCxcbiAgUklHSFRfQk9UVE9NLFxuICBUT1BfQ0VOVEVSLFxuICBUT1BfUklHSFQsXG4gIFRPUF9MRUZULFxuICBCT1RUT01fQ0VOVEVSLFxuICBCT1RUT01fUklHSFQsXG4gIEJPVFRPTV9MRUZULFxuICBMRUZUX0NFTlRFUixcbiAgTEVGVF9UT1AsXG4gIExFRlRfQk9UVE9NLFxufVxuXG5jb25zdCBQT1NJVElPTl9SRUxBVElWRSA9ICdyZWxhdGl2ZSc7XG5jb25zdCBQT1NJVElPTl9BQlNPTFVURSA9ICdhYnNvbHV0ZSc7XG5jb25zdCBQT1NJVElPTl9GSVhFRCA9ICdmaXhlZCc7XG5cbmNvbnN0IE9WRVJGTE9XX1NDUk9MTCA9ICdzY3JvbGwnO1xuY29uc3QgT1ZFUkZMT1dfQVVUTyA9ICdhdXRvJztcblxuZXhwb3J0IGNsYXNzIFBvcG92ZXIge1xuICBwcml2YXRlIF9zY3JvbGw6IFN1YmplY3Q8dm9pZD47XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50OiBhbnkpIHtcbiAgICAvLyBCcm93c2VycyBkb24ndCBhZ3JlZSB3aXRoIHdoYXQgdG8gZG8gaWYgc29tZSBvZiB0aGVzZSBhcmUgbm90IHNwZWNpZmllZCwgc28gd2Ugc2V0IHRoZW0gYWxsIHRvIGJlIHNhZmUuXG4gICAgZWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9IFBPU0lUSU9OX0FCU09MVVRFO1xuICAgIGVsZW1lbnQuc3R5bGUudG9wID0gMDtcbiAgICBlbGVtZW50LnN0eWxlLmJvdHRvbSA9ICdhdXRvJztcbiAgICBlbGVtZW50LnN0eWxlLmxlZnQgPSAwO1xuICAgIGVsZW1lbnQuc3R5bGUucmlnaHQgPSAnYXV0byc7XG4gIH1cblxuICAvLyBUT0RPOiBuZWVkIGEgd2F5IHRvIGFjY291bnQgZm9yIHBhcmFtZXRlcnMgdGhhdCBjaGFuZ2UgZHluYW1pY2FsbHkgKHBvc2l0aW9uaW5nKS5cbiAgcHVibGljIGFuY2hvcihcbiAgICBhbmNob3I6IGFueSxcbiAgICBhbmNob3JBbGlnbjogUG9pbnQsXG4gICAgcG9wb3ZlckFsaWduOiBQb2ludCxcbiAgICB7IG9mZnNldFggPSAwLCBvZmZzZXRZID0gMCwgdXNlQW5jaG9yUGFyZW50ID0gZmFsc2UgfTogUG9wb3Zlck9wdGlvbnMgPSB7fVxuICApOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIC8vIFRPRE86IHdlIGFyZSBhc3N1bWluZyBoZXJlIHRoYXQgdGhlIHBvcG92ZXIgaXMgaW5zaWRlIG9yIG5leHQgdG8gdGhlIGFuY2hvci5cbiAgICAvLyBXZSdkIG5lZWQgdG8gZ28gdXAgdGhlIHBvcG92ZXIgdHJlZSB0b28gb3RoZXJ3aXNlXG5cbiAgICB0aGlzLmFkZFNjcm9sbEV2ZW50TGlzdGVuZXJzKGFuY2hvcik7XG4gICAgaWYgKHVzZUFuY2hvclBhcmVudCkge1xuICAgICAgYW5jaG9yID0gYW5jaG9yLnBhcmVudE5vZGU7XG4gICAgfVxuICAgIC8vIGV4cGxpY2l0bHkgb3ZlcnJpZGUgYW5jaG9yJ3Mgc3R5bGUgdG8gc3RhdGljXG4gICAgYW5jaG9yLnN0eWxlLnBvc2l0aW9uID0gJ3N0YXRpYyc7XG5cbiAgICBjb25zdCBhbmNob3JSZWN0ID0gYW5jaG9yLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IHBvcG92ZXJSZWN0ID0gdGhpcy5lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgLy8gcG9zaXRpb24gb2YgbGVmdCB0b3AgY29ybmVyIG9mIGFuY2hvciArIHRoZSBvZmZzZXRcbiAgICBsZXQgbGVmdERpZmY6IG51bWJlciA9IGFuY2hvclJlY3QubGVmdCAtIHBvcG92ZXJSZWN0LmxlZnQgKyBvZmZzZXRYO1xuICAgIGxldCB0b3BEaWZmOiBudW1iZXIgPSBhbmNob3JSZWN0LnRvcCAtIHBvcG92ZXJSZWN0LnRvcCArIG9mZnNldFk7XG5cbiAgICAvLyBmaXJzdCwgYWRqdXN0IHBvc2l0aW9uaW5nIGJhc2VkIG9uIGFuY2hvcidzIGFsaWduIHBvaW50XG4gICAgc3dpdGNoIChhbmNob3JBbGlnbikge1xuICAgICAgY2FzZSBQb2ludC5MRUZUX1RPUDpcbiAgICAgIGNhc2UgUG9pbnQuVE9QX0xFRlQ6XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBQb2ludC5UT1BfQ0VOVEVSOlxuICAgICAgICBsZWZ0RGlmZiArPSBhbmNob3JSZWN0LndpZHRoIC8gMjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFBvaW50LlRPUF9SSUdIVDpcbiAgICAgICAgbGVmdERpZmYgKz0gYW5jaG9yUmVjdC53aWR0aDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFBvaW50LlJJR0hUX1RPUDpcbiAgICAgICAgbGVmdERpZmYgKz0gYW5jaG9yUmVjdC53aWR0aDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFBvaW50LkxFRlRfQk9UVE9NOlxuICAgICAgICB0b3BEaWZmICs9IGFuY2hvclJlY3QuaGVpZ2h0O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgUG9pbnQuQk9UVE9NX0xFRlQ6XG4gICAgICAgIHRvcERpZmYgKz0gYW5jaG9yUmVjdC5oZWlnaHQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBQb2ludC5CT1RUT01fQ0VOVEVSOlxuICAgICAgICB0b3BEaWZmICs9IGFuY2hvclJlY3QuaGVpZ2h0O1xuICAgICAgICBsZWZ0RGlmZiArPSBhbmNob3JSZWN0LndpZHRoIC8gMjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFBvaW50LkJPVFRPTV9SSUdIVDpcbiAgICAgICAgdG9wRGlmZiArPSBhbmNob3JSZWN0LmhlaWdodDtcbiAgICAgICAgbGVmdERpZmYgKz0gYW5jaG9yUmVjdC53aWR0aDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFBvaW50LlJJR0hUX0JPVFRPTTpcbiAgICAgICAgdG9wRGlmZiArPSBhbmNob3JSZWN0LmhlaWdodDtcbiAgICAgICAgbGVmdERpZmYgKz0gYW5jaG9yUmVjdC53aWR0aDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFBvaW50LkxFRlRfQ0VOVEVSOlxuICAgICAgICB0b3BEaWZmICs9IGFuY2hvclJlY3QuaGVpZ2h0IC8gMjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFBvaW50LlJJR0hUX0NFTlRFUjpcbiAgICAgICAgdG9wRGlmZiArPSBhbmNob3JSZWN0LmhlaWdodCAvIDI7XG4gICAgICAgIGxlZnREaWZmICs9IGFuY2hvclJlY3Qud2lkdGg7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICB9XG5cbiAgICAvLyBzZWNvbmQsIGFkanVzdCBwb3NpdGlvbmluZyBiYXNlZCBvbiBwb3BvdmVyJ3MgYWxpZ24gcG9pbnRcbiAgICBzd2l0Y2ggKHBvcG92ZXJBbGlnbikge1xuICAgICAgY2FzZSBQb2ludC5MRUZUX1RPUDpcbiAgICAgIGNhc2UgUG9pbnQuVE9QX0xFRlQ6XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBQb2ludC5UT1BfQ0VOVEVSOlxuICAgICAgICBsZWZ0RGlmZiAtPSBwb3BvdmVyUmVjdC53aWR0aCAvIDI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBQb2ludC5UT1BfUklHSFQ6XG4gICAgICAgIGxlZnREaWZmIC09IHBvcG92ZXJSZWN0LndpZHRoO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgUG9pbnQuUklHSFRfVE9QOlxuICAgICAgICBsZWZ0RGlmZiAtPSBwb3BvdmVyUmVjdC53aWR0aDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFBvaW50LkxFRlRfQk9UVE9NOlxuICAgICAgICB0b3BEaWZmIC09IHBvcG92ZXJSZWN0LmhlaWdodDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFBvaW50LkJPVFRPTV9MRUZUOlxuICAgICAgICB0b3BEaWZmIC09IHBvcG92ZXJSZWN0LmhlaWdodDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFBvaW50LkJPVFRPTV9DRU5URVI6XG4gICAgICAgIHRvcERpZmYgLT0gcG9wb3ZlclJlY3QuaGVpZ2h0O1xuICAgICAgICBsZWZ0RGlmZiAtPSBwb3BvdmVyUmVjdC53aWR0aCAvIDI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBQb2ludC5CT1RUT01fUklHSFQ6XG4gICAgICAgIHRvcERpZmYgLT0gcG9wb3ZlclJlY3QuaGVpZ2h0O1xuICAgICAgICBsZWZ0RGlmZiAtPSBwb3BvdmVyUmVjdC53aWR0aDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFBvaW50LlJJR0hUX0JPVFRPTTpcbiAgICAgICAgdG9wRGlmZiAtPSBwb3BvdmVyUmVjdC5oZWlnaHQ7XG4gICAgICAgIGxlZnREaWZmIC09IHBvcG92ZXJSZWN0LndpZHRoO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgUG9pbnQuTEVGVF9DRU5URVI6XG4gICAgICAgIHRvcERpZmYgLT0gcG9wb3ZlclJlY3QuaGVpZ2h0IC8gMjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFBvaW50LlJJR0hUX0NFTlRFUjpcbiAgICAgICAgdG9wRGlmZiAtPSBwb3BvdmVyUmVjdC5oZWlnaHQgLyAyO1xuICAgICAgICBsZWZ0RGlmZiAtPSBwb3BvdmVyUmVjdC53aWR0aDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgIH1cblxuICAgIC8vIFRoaXJkLCBhZGp1c3Qgd2l0aCBwb3BvdmVyJ3MgbWFyZ2lucyBiYXNlZCBvbiB0aGUgdHdvIGFsaWduIHBvaW50cy5cbiAgICAvLyBIZXJlLCB3ZSBtYWtlIGFuIGFzc3VtcHRpb24gdGhhdCBwb3BvdmVyIGlzIHByaW1hcmlseSBwb3NpdGlvbmVkIG91dHNpZGUgdGhlXG4gICAgLy8gYW5jaG9yIHdpdGggbWlub3Igb2Zmc2V0LiBXaXRob3V0IHRoaXMgYXNzdW1wdGlvbiwgaXQncyBpbXBvc3NpYmxlIHRvIGFwcGx5XG4gICAgLy8gdGhlIHBvcG92ZXIncyBtYXJnaW5zIGluIGEgcHJlZGljdGFibGUgd2F5LiBGb3IgZXhhbXBsZSwgYXNzdW1lIHRoYXQgYSBwb3BvdmVyXG4gICAgLy8gYW5kIGl0cyBhbmNob3IgYXJlIGV4YWN0bHkgdGhlIHNhbWUgc2l6ZS4gaWYgYSBwb3BvdmVyIGlzIHBvc2l0aW9uZWQgaW5zaWRlIHRoZVxuICAgIC8vIGFuY2hvciAod2hpY2ggaXMgdGVjaG5pY2FsbHkgcG9zc2libGUpLCB0aGVuIGl0IGJlY29tZXMgaW1wb3NzaWJsZSB0byBrbm93IHdoYXQgdG8gZG9cbiAgICAvLyBpZiB0aGUgcG9wb3ZlciBoYXMgYSBub24temVybyBtYXJnaW4gdmFsdWUgYWxsIGFyb3VuZCAoYmVjYXVzZSBhcHBseWluZyB0aGUgbWFyZ2luIGluXG4gICAgLy8gYWxsIGZvdXIgZGlyZWN0aW9ucyB3aWxsIHJlc3VsdCBpbiBubyBtYXJnaW4gdmlzdWFsbHksIHdoaWNoIGlzbid0IHdoYXQgd2Ugd2FudCkuXG4gICAgLy8gVGhlcmVmb3JlLCBvdXIgbG9naWMgbWFrZXMgYXNzdW1wdGlvbnMgYWJvdXQgbWFyZ2lucyBvZiBpbnRlcmVzdCBnaXZlbiB0aGUgcG9pbnRzLFxuICAgIC8vIGFuZCBvbmx5IGNvdmVycyB0aGUgY2FzZXMgd2hlcmUgcG9wb3ZlciBpcyBvdXRzaWRlIHRoZSBhbmNob3IuXG5cbiAgICBjb25zdCBwb3BvdmVyQ29tcHV0ZWRTdHlsZSA9IGdldENvbXB1dGVkU3R5bGUodGhpcy5lbGVtZW50KTtcbiAgICBjb25zdCBtYXJnaW5MZWZ0ID0gcGFyc2VJbnQocG9wb3ZlckNvbXB1dGVkU3R5bGUubWFyZ2luTGVmdCwgMTApO1xuICAgIGNvbnN0IG1hcmdpblJpZ2h0ID0gcGFyc2VJbnQocG9wb3ZlckNvbXB1dGVkU3R5bGUubWFyZ2luUmlnaHQsIDEwKTtcbiAgICBjb25zdCBtYXJnaW5Ub3AgPSBwYXJzZUludChwb3BvdmVyQ29tcHV0ZWRTdHlsZS5tYXJnaW5Ub3AsIDEwKTtcbiAgICBjb25zdCBtYXJnaW5Cb3R0b20gPSBwYXJzZUludChwb3BvdmVyQ29tcHV0ZWRTdHlsZS5tYXJnaW5Cb3R0b20sIDEwKTtcblxuICAgIHN3aXRjaCAoYW5jaG9yQWxpZ24pIHtcbiAgICAgIGNhc2UgUG9pbnQuTEVGVF9UT1A6XG4gICAgICBjYXNlIFBvaW50LlRPUF9MRUZUOlxuICAgICAgY2FzZSBQb2ludC5UT1BfUklHSFQ6XG4gICAgICBjYXNlIFBvaW50LlJJR0hUX1RPUDpcbiAgICAgICAgaWYgKHBvcG92ZXJBbGlnbiA9PT0gUG9pbnQuQk9UVE9NX1JJR0hUIHx8IHBvcG92ZXJBbGlnbiA9PT0gUG9pbnQuUklHSFRfQk9UVE9NKSB7XG4gICAgICAgICAgdG9wRGlmZiAtPSBtYXJnaW5Cb3R0b207XG4gICAgICAgICAgbGVmdERpZmYgLT0gbWFyZ2luUmlnaHQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBvcG92ZXJBbGlnbiA9PT0gUG9pbnQuQk9UVE9NX0xFRlQgfHwgcG9wb3ZlckFsaWduID09PSBQb2ludC5MRUZUX0JPVFRPTSkge1xuICAgICAgICAgIHRvcERpZmYgLT0gbWFyZ2luVG9wO1xuICAgICAgICAgIGxlZnREaWZmICs9IG1hcmdpbkxlZnQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBvcG92ZXJBbGlnbiA9PT0gUG9pbnQuVE9QX0xFRlQgfHwgcG9wb3ZlckFsaWduID09PSBQb2ludC5MRUZUX1RPUCkge1xuICAgICAgICAgIHRvcERpZmYgKz0gbWFyZ2luVG9wO1xuICAgICAgICAgIGxlZnREaWZmICs9IG1hcmdpbkxlZnQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBvcG92ZXJBbGlnbiA9PT0gUG9pbnQuVE9QX1JJR0hUIHx8IHBvcG92ZXJBbGlnbiA9PT0gUG9pbnQuUklHSFRfVE9QKSB7XG4gICAgICAgICAgdG9wRGlmZiArPSBtYXJnaW5Ub3A7XG4gICAgICAgICAgbGVmdERpZmYgLT0gbWFyZ2luUmlnaHQ7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFBvaW50LkxFRlRfQk9UVE9NOlxuICAgICAgY2FzZSBQb2ludC5CT1RUT01fTEVGVDpcbiAgICAgIGNhc2UgUG9pbnQuQk9UVE9NX1JJR0hUOlxuICAgICAgY2FzZSBQb2ludC5SSUdIVF9CT1RUT006XG4gICAgICAgIGlmIChwb3BvdmVyQWxpZ24gPT09IFBvaW50LkJPVFRPTV9MRUZUIHx8IHBvcG92ZXJBbGlnbiA9PT0gUG9pbnQuTEVGVF9CT1RUT00pIHtcbiAgICAgICAgICB0b3BEaWZmIC09IG1hcmdpbkJvdHRvbTtcbiAgICAgICAgICBsZWZ0RGlmZiArPSBtYXJnaW5MZWZ0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChwb3BvdmVyQWxpZ24gPT09IFBvaW50LkJPVFRPTV9SSUdIVCB8fCBwb3BvdmVyQWxpZ24gPT09IFBvaW50LlJJR0hUX0JPVFRPTSkge1xuICAgICAgICAgIHRvcERpZmYgLT0gbWFyZ2luQm90dG9tO1xuICAgICAgICAgIGxlZnREaWZmIC09IG1hcmdpblJpZ2h0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChwb3BvdmVyQWxpZ24gPT09IFBvaW50LlRPUF9MRUZUIHx8IHBvcG92ZXJBbGlnbiA9PT0gUG9pbnQuTEVGVF9UT1ApIHtcbiAgICAgICAgICB0b3BEaWZmICs9IG1hcmdpblRvcDtcbiAgICAgICAgICBsZWZ0RGlmZiArPSBtYXJnaW5MZWZ0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChwb3BvdmVyQWxpZ24gPT09IFBvaW50LlRPUF9SSUdIVCB8fCBwb3BvdmVyQWxpZ24gPT09IFBvaW50LlJJR0hUX1RPUCkge1xuICAgICAgICAgIHRvcERpZmYgKz0gbWFyZ2luVG9wO1xuICAgICAgICAgIGxlZnREaWZmIC09IG1hcmdpblJpZ2h0O1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBQb2ludC5UT1BfQ0VOVEVSOlxuICAgICAgICB0b3BEaWZmIC09IG1hcmdpbkJvdHRvbTtcbiAgICAgICAgbGVmdERpZmYgKz0gbWFyZ2luTGVmdDtcbiAgICAgICAgbGVmdERpZmYgLT0gbWFyZ2luUmlnaHQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBQb2ludC5CT1RUT01fQ0VOVEVSOlxuICAgICAgICB0b3BEaWZmICs9IG1hcmdpblRvcDtcbiAgICAgICAgbGVmdERpZmYgKz0gbWFyZ2luTGVmdDtcbiAgICAgICAgbGVmdERpZmYgLT0gbWFyZ2luUmlnaHQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBQb2ludC5MRUZUX0NFTlRFUjpcbiAgICAgICAgdG9wRGlmZiArPSBtYXJnaW5Ub3A7XG4gICAgICAgIHRvcERpZmYgLT0gbWFyZ2luQm90dG9tO1xuICAgICAgICBsZWZ0RGlmZiAtPSBtYXJnaW5SaWdodDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFBvaW50LlJJR0hUX0NFTlRFUjpcbiAgICAgICAgdG9wRGlmZiArPSBtYXJnaW5Ub3A7XG4gICAgICAgIHRvcERpZmYgLT0gbWFyZ2luQm90dG9tO1xuICAgICAgICBsZWZ0RGlmZiArPSBtYXJnaW5MZWZ0O1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgfVxuXG4gICAgdGhpcy5lbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKCR7TWF0aC5yb3VuZChsZWZ0RGlmZil9cHgpIHRyYW5zbGF0ZVkoJHtNYXRoLnJvdW5kKHRvcERpZmYpfXB4KWA7XG4gICAgcmV0dXJuIHRoaXMuX3Njcm9sbC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIHB1YmxpYyByZWxlYXNlKCkge1xuICAgIHRoaXMuZWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSAnJztcbiAgICB0aGlzLnJlbW92ZVNjcm9sbEV2ZW50TGlzdGVuZXJzKCk7XG4gIH1cblxuICBwcml2YXRlIGlzUG9zaXRpb25lZChjb250YWluZXI6IGFueSkge1xuICAgIGNvbnN0IHBvc2l0aW9uID0gZ2V0Q29tcHV0ZWRTdHlsZShjb250YWluZXIpLnBvc2l0aW9uO1xuICAgIHJldHVybiBwb3NpdGlvbiA9PT0gUE9TSVRJT05fUkVMQVRJVkUgfHwgcG9zaXRpb24gPT09IFBPU0lUSU9OX0FCU09MVVRFIHx8IHBvc2l0aW9uID09PSBQT1NJVElPTl9GSVhFRDtcbiAgfVxuXG4gIC8qXG4gICAgICogQ29udGFpbmVycyB1cCB0byB0aGUgZmlyc3QgcG9zaXRpb25lZCBvbmUgd2lsbCBoYXZlIGFuIGV2ZW50IG9uIHNjcm9sbFxuICAgICAqL1xuXG4gIHByaXZhdGUgc2Nyb2xsYWJsZUVsZW1lbnRzOiBIVE1MRWxlbWVudFtdID0gW107XG5cbiAgcHJpdmF0ZSBlbWl0U2Nyb2xsRXZlbnQoKSB7XG4gICAgdGhpcy5fc2Nyb2xsLm5leHQoKTtcbiAgfVxuXG4gIHByaXZhdGUgYm91bmRPblNjcm9sbExpc3RlbmVyOiBhbnkgPSB0aGlzLmVtaXRTY3JvbGxFdmVudC5iaW5kKHRoaXMpO1xuXG4gIHByaXZhdGUgYWRkU2Nyb2xsRXZlbnRMaXN0ZW5lcnMoZTogYW55KSB7XG4gICAgdGhpcy5fc2Nyb2xsID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgICBjb25zdCBhbmNob3I6IGFueSA9IGU7XG4gICAgbGV0IGN1cnJlbnQ6IGFueSA9IGU7XG4gICAgd2hpbGUgKGN1cnJlbnQgJiYgY3VycmVudCAhPT0gZG9jdW1lbnQpIHtcbiAgICAgIGlmICh0aGlzLnNjcm9sbHMoY3VycmVudCkpIHtcbiAgICAgICAgY3VycmVudC5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLmJvdW5kT25TY3JvbGxMaXN0ZW5lcik7XG4gICAgICAgIHRoaXMuc2Nyb2xsYWJsZUVsZW1lbnRzLnB1c2goY3VycmVudCk7XG4gICAgICB9XG4gICAgICBpZiAoY3VycmVudCAhPT0gYW5jaG9yICYmIHRoaXMuaXNQb3NpdGlvbmVkKGN1cnJlbnQpKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY3VycmVudCA9IGN1cnJlbnQucGFyZW50Tm9kZTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJlbW92ZVNjcm9sbEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIGZvciAoY29uc3QgZWxlbSBvZiB0aGlzLnNjcm9sbGFibGVFbGVtZW50cykge1xuICAgICAgZWxlbS5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLmJvdW5kT25TY3JvbGxMaXN0ZW5lcik7XG4gICAgfVxuICAgIHRoaXMuc2Nyb2xsYWJsZUVsZW1lbnRzLmxlbmd0aCA9IDA7XG4gICAgaWYgKHRoaXMuX3Njcm9sbCkge1xuICAgICAgdGhpcy5fc2Nyb2xsLmNvbXBsZXRlKCk7XG4gICAgICBkZWxldGUgdGhpcy5fc2Nyb2xsO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2Nyb2xscyhjb250YWluZXI6IGFueSk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGNvbXB1dGVkU3R5bGVzID0gZ2V0Q29tcHV0ZWRTdHlsZShjb250YWluZXIpO1xuICAgIHJldHVybiAoXG4gICAgICBjb21wdXRlZFN0eWxlcy5vdmVyZmxvd1ggPT09IE9WRVJGTE9XX1NDUk9MTCB8fFxuICAgICAgY29tcHV0ZWRTdHlsZXMub3ZlcmZsb3dYID09PSBPVkVSRkxPV19BVVRPIHx8XG4gICAgICBjb21wdXRlZFN0eWxlcy5vdmVyZmxvd1kgPT09IE9WRVJGTE9XX1NDUk9MTCB8fFxuICAgICAgY29tcHV0ZWRTdHlsZXMub3ZlcmZsb3dZID09PSBPVkVSRkxPV19BVVRPXG4gICAgKTtcbiAgfVxufVxuIl19