/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var Point = {
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
var POSITION_RELATIVE = 'relative';
/** @type {?} */
var POSITION_ABSOLUTE = 'absolute';
/** @type {?} */
var POSITION_FIXED = 'fixed';
/** @type {?} */
var OVERFLOW_SCROLL = 'scroll';
/** @type {?} */
var OVERFLOW_AUTO = 'auto';
var Popover = /** @class */ (function () {
    function Popover(element) {
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
    // TODO: need a way to account for parameters that change dynamically (positioning).
    /**
     * @param {?} anchor
     * @param {?} anchorAlign
     * @param {?} popoverAlign
     * @param {?=} __3
     * @return {?}
     */
    Popover.prototype.anchor = 
    // TODO: need a way to account for parameters that change dynamically (positioning).
    /**
     * @param {?} anchor
     * @param {?} anchorAlign
     * @param {?} popoverAlign
     * @param {?=} __3
     * @return {?}
     */
    function (anchor, anchorAlign, popoverAlign, _a) {
        // TODO: we are assuming here that the popover is inside or next to the anchor.
        // We'd need to go up the popover tree too otherwise
        var _b = _a === void 0 ? {} : _a, _c = _b.offsetX, offsetX = _c === void 0 ? 0 : _c, _d = _b.offsetY, offsetY = _d === void 0 ? 0 : _d, _e = _b.useAnchorParent, useAnchorParent = _e === void 0 ? false : _e;
        this.addScrollEventListeners(anchor);
        if (useAnchorParent) {
            anchor = anchor.parentNode;
        }
        // explicitly override anchor's style to static
        anchor.style.position = 'static';
        /** @type {?} */
        var anchorRect = anchor.getBoundingClientRect();
        /** @type {?} */
        var popoverRect = this.element.getBoundingClientRect();
        // position of left top corner of anchor + the offset
        /** @type {?} */
        var leftDiff = anchorRect.left - popoverRect.left + offsetX;
        /** @type {?} */
        var topDiff = anchorRect.top - popoverRect.top + offsetY;
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
        var popoverComputedStyle = getComputedStyle(this.element);
        /** @type {?} */
        var marginLeft = parseInt(popoverComputedStyle.marginLeft, 10);
        /** @type {?} */
        var marginRight = parseInt(popoverComputedStyle.marginRight, 10);
        /** @type {?} */
        var marginTop = parseInt(popoverComputedStyle.marginTop, 10);
        /** @type {?} */
        var marginBottom = parseInt(popoverComputedStyle.marginBottom, 10);
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
        this.element.style.transform = "translateX(" + Math.round(leftDiff) + "px) translateY(" + Math.round(topDiff) + "px)";
        return this._scroll.asObservable();
    };
    /**
     * @return {?}
     */
    Popover.prototype.release = /**
     * @return {?}
     */
    function () {
        this.element.style.transform = '';
        this.removeScrollEventListeners();
    };
    /**
     * @private
     * @param {?} container
     * @return {?}
     */
    Popover.prototype.isPositioned = /**
     * @private
     * @param {?} container
     * @return {?}
     */
    function (container) {
        /** @type {?} */
        var position = getComputedStyle(container).position;
        return position === POSITION_RELATIVE || position === POSITION_ABSOLUTE || position === POSITION_FIXED;
    };
    /**
     * @private
     * @return {?}
     */
    Popover.prototype.emitScrollEvent = /**
     * @private
     * @return {?}
     */
    function () {
        this._scroll.next();
    };
    /**
     * @private
     * @param {?} e
     * @return {?}
     */
    Popover.prototype.addScrollEventListeners = /**
     * @private
     * @param {?} e
     * @return {?}
     */
    function (e) {
        this._scroll = new Subject();
        /** @type {?} */
        var anchor = e;
        /** @type {?} */
        var current = e;
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
    };
    /**
     * @private
     * @return {?}
     */
    Popover.prototype.removeScrollEventListeners = /**
     * @private
     * @return {?}
     */
    function () {
        var e_1, _a;
        try {
            for (var _b = tslib_1.__values(this.scrollableElements), _c = _b.next(); !_c.done; _c = _b.next()) {
                var elem = _c.value;
                elem.removeEventListener('scroll', this.boundOnScrollListener);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.scrollableElements.length = 0;
        if (this._scroll) {
            this._scroll.complete();
            delete this._scroll;
        }
    };
    /**
     * @private
     * @param {?} container
     * @return {?}
     */
    Popover.prototype.scrolls = /**
     * @private
     * @param {?} container
     * @return {?}
     */
    function (container) {
        /** @type {?} */
        var computedStyles = getComputedStyle(container);
        return (computedStyles.overflowX === OVERFLOW_SCROLL ||
            computedStyles.overflowX === OVERFLOW_AUTO ||
            computedStyles.overflowY === OVERFLOW_SCROLL ||
            computedStyles.overflowY === OVERFLOW_AUTO);
    };
    return Popover;
}());
export { Popover };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbInBvcG92ZXIvY29tbW9uL3BvcG92ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFZQSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7SUFHN0IsZUFBWTtJQUNaLFlBQVM7SUFDVCxlQUFZO0lBQ1osYUFBVTtJQUNWLFlBQVM7SUFDVCxXQUFRO0lBQ1IsZ0JBQWE7SUFDYixlQUFZO0lBQ1osY0FBVztJQUNYLGNBQVc7SUFDWCxZQUFRO0lBQ1IsZUFBVzs7Ozs7Ozs7Ozs7Ozs7OztJQUdQLGlCQUFpQixHQUFHLFVBQVU7O0lBQzlCLGlCQUFpQixHQUFHLFVBQVU7O0lBQzlCLGNBQWMsR0FBRyxPQUFPOztJQUV4QixlQUFlLEdBQUcsUUFBUTs7SUFDMUIsYUFBYSxHQUFHLE1BQU07QUFFNUI7SUFHRSxpQkFBb0IsT0FBWTtRQUFaLFlBQU8sR0FBUCxPQUFPLENBQUs7Ozs7UUEwTnhCLHVCQUFrQixHQUFrQixFQUFFLENBQUM7UUFNdkMsMEJBQXFCLEdBQVEsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUEvTm5FLDBHQUEwRztRQUMxRyxPQUFPLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxpQkFBaUIsQ0FBQztRQUMzQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDdEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQzlCLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztRQUN2QixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7SUFDL0IsQ0FBQztJQUVELG9GQUFvRjs7Ozs7Ozs7O0lBQzdFLHdCQUFNOzs7Ozs7Ozs7SUFBYixVQUNFLE1BQVcsRUFDWCxXQUFr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UyxLQUFLLGFBQWEsQ0FDM0MsQ0FBQztJQUNKLENBQUM7SUFDSCxjQUFDO0FBQUQsQ0FBQyxBQXpRRCxJQXlRQzs7Ozs7OztJQXhRQywwQkFBK0I7Ozs7O0lBNE4vQixxQ0FBK0M7Ozs7O0lBTS9DLHdDQUFxRTs7Ozs7SUFoT3pELDBCQUFvQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuLypcbiAqIERvIE5PVCBBbmd1bGFyIHRoaXMgdXAuIEl0IGFzc3VtZXMgd2UncmUgaW4gdGhlIERPTSwgcGxheXMgd2l0aCBuYXRpdmUgZWxlbWVudHMsIC4uLlxuICogSXQgY291bGQgcG90ZW50aWFsbHkgYmUgdXNlZCBhcyBwYXJ0IG9mIEBjbHIvdWkgYXMgYSB2YW5pbGxhIEphdmFzY3JpcHQgaGVscGVyLlxuICovXG5cbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFBvcG92ZXJPcHRpb25zIH0gZnJvbSAnLi9wb3BvdmVyLW9wdGlvbnMuaW50ZXJmYWNlJztcbmV4cG9ydCBlbnVtIFBvaW50IHtcbiAgUklHSFRfQ0VOVEVSLFxuICBSSUdIVF9UT1AsXG4gIFJJR0hUX0JPVFRPTSxcbiAgVE9QX0NFTlRFUixcbiAgVE9QX1JJR0hULFxuICBUT1BfTEVGVCxcbiAgQk9UVE9NX0NFTlRFUixcbiAgQk9UVE9NX1JJR0hULFxuICBCT1RUT01fTEVGVCxcbiAgTEVGVF9DRU5URVIsXG4gIExFRlRfVE9QLFxuICBMRUZUX0JPVFRPTSxcbn1cblxuY29uc3QgUE9TSVRJT05fUkVMQVRJVkUgPSAncmVsYXRpdmUnO1xuY29uc3QgUE9TSVRJT05fQUJTT0xVVEUgPSAnYWJzb2x1dGUnO1xuY29uc3QgUE9TSVRJT05fRklYRUQgPSAnZml4ZWQnO1xuXG5jb25zdCBPVkVSRkxPV19TQ1JPTEwgPSAnc2Nyb2xsJztcbmNvbnN0IE9WRVJGTE9XX0FVVE8gPSAnYXV0byc7XG5cbmV4cG9ydCBjbGFzcyBQb3BvdmVyIHtcbiAgcHJpdmF0ZSBfc2Nyb2xsOiBTdWJqZWN0PHZvaWQ+O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudDogYW55KSB7XG4gICAgLy8gQnJvd3NlcnMgZG9uJ3QgYWdyZWUgd2l0aCB3aGF0IHRvIGRvIGlmIHNvbWUgb2YgdGhlc2UgYXJlIG5vdCBzcGVjaWZpZWQsIHNvIHdlIHNldCB0aGVtIGFsbCB0byBiZSBzYWZlLlxuICAgIGVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSBQT1NJVElPTl9BQlNPTFVURTtcbiAgICBlbGVtZW50LnN0eWxlLnRvcCA9IDA7XG4gICAgZWxlbWVudC5zdHlsZS5ib3R0b20gPSAnYXV0byc7XG4gICAgZWxlbWVudC5zdHlsZS5sZWZ0ID0gMDtcbiAgICBlbGVtZW50LnN0eWxlLnJpZ2h0ID0gJ2F1dG8nO1xuICB9XG5cbiAgLy8gVE9ETzogbmVlZCBhIHdheSB0byBhY2NvdW50IGZvciBwYXJhbWV0ZXJzIHRoYXQgY2hhbmdlIGR5bmFtaWNhbGx5IChwb3NpdGlvbmluZykuXG4gIHB1YmxpYyBhbmNob3IoXG4gICAgYW5jaG9yOiBhbnksXG4gICAgYW5jaG9yQWxpZ246IFBvaW50LFxuICAgIHBvcG92ZXJBbGlnbjogUG9pbnQsXG4gICAgeyBvZmZzZXRYID0gMCwgb2Zmc2V0WSA9IDAsIHVzZUFuY2hvclBhcmVudCA9IGZhbHNlIH06IFBvcG92ZXJPcHRpb25zID0ge31cbiAgKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAvLyBUT0RPOiB3ZSBhcmUgYXNzdW1pbmcgaGVyZSB0aGF0IHRoZSBwb3BvdmVyIGlzIGluc2lkZSBvciBuZXh0IHRvIHRoZSBhbmNob3IuXG4gICAgLy8gV2UnZCBuZWVkIHRvIGdvIHVwIHRoZSBwb3BvdmVyIHRyZWUgdG9vIG90aGVyd2lzZVxuXG4gICAgdGhpcy5hZGRTY3JvbGxFdmVudExpc3RlbmVycyhhbmNob3IpO1xuICAgIGlmICh1c2VBbmNob3JQYXJlbnQpIHtcbiAgICAgIGFuY2hvciA9IGFuY2hvci5wYXJlbnROb2RlO1xuICAgIH1cbiAgICAvLyBleHBsaWNpdGx5IG92ZXJyaWRlIGFuY2hvcidzIHN0eWxlIHRvIHN0YXRpY1xuICAgIGFuY2hvci5zdHlsZS5wb3NpdGlvbiA9ICdzdGF0aWMnO1xuXG4gICAgY29uc3QgYW5jaG9yUmVjdCA9IGFuY2hvci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCBwb3BvdmVyUmVjdCA9IHRoaXMuZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgIC8vIHBvc2l0aW9uIG9mIGxlZnQgdG9wIGNvcm5lciBvZiBhbmNob3IgKyB0aGUgb2Zmc2V0XG4gICAgbGV0IGxlZnREaWZmOiBudW1iZXIgPSBhbmNob3JSZWN0LmxlZnQgLSBwb3BvdmVyUmVjdC5sZWZ0ICsgb2Zmc2V0WDtcbiAgICBsZXQgdG9wRGlmZjogbnVtYmVyID0gYW5jaG9yUmVjdC50b3AgLSBwb3BvdmVyUmVjdC50b3AgKyBvZmZzZXRZO1xuXG4gICAgLy8gZmlyc3QsIGFkanVzdCBwb3NpdGlvbmluZyBiYXNlZCBvbiBhbmNob3IncyBhbGlnbiBwb2ludFxuICAgIHN3aXRjaCAoYW5jaG9yQWxpZ24pIHtcbiAgICAgIGNhc2UgUG9pbnQuTEVGVF9UT1A6XG4gICAgICBjYXNlIFBvaW50LlRPUF9MRUZUOlxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgUG9pbnQuVE9QX0NFTlRFUjpcbiAgICAgICAgbGVmdERpZmYgKz0gYW5jaG9yUmVjdC53aWR0aCAvIDI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBQb2ludC5UT1BfUklHSFQ6XG4gICAgICAgIGxlZnREaWZmICs9IGFuY2hvclJlY3Qud2lkdGg7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBQb2ludC5SSUdIVF9UT1A6XG4gICAgICAgIGxlZnREaWZmICs9IGFuY2hvclJlY3Qud2lkdGg7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBQb2ludC5MRUZUX0JPVFRPTTpcbiAgICAgICAgdG9wRGlmZiArPSBhbmNob3JSZWN0LmhlaWdodDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFBvaW50LkJPVFRPTV9MRUZUOlxuICAgICAgICB0b3BEaWZmICs9IGFuY2hvclJlY3QuaGVpZ2h0O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgUG9pbnQuQk9UVE9NX0NFTlRFUjpcbiAgICAgICAgdG9wRGlmZiArPSBhbmNob3JSZWN0LmhlaWdodDtcbiAgICAgICAgbGVmdERpZmYgKz0gYW5jaG9yUmVjdC53aWR0aCAvIDI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBQb2ludC5CT1RUT01fUklHSFQ6XG4gICAgICAgIHRvcERpZmYgKz0gYW5jaG9yUmVjdC5oZWlnaHQ7XG4gICAgICAgIGxlZnREaWZmICs9IGFuY2hvclJlY3Qud2lkdGg7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBQb2ludC5SSUdIVF9CT1RUT006XG4gICAgICAgIHRvcERpZmYgKz0gYW5jaG9yUmVjdC5oZWlnaHQ7XG4gICAgICAgIGxlZnREaWZmICs9IGFuY2hvclJlY3Qud2lkdGg7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBQb2ludC5MRUZUX0NFTlRFUjpcbiAgICAgICAgdG9wRGlmZiArPSBhbmNob3JSZWN0LmhlaWdodCAvIDI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBQb2ludC5SSUdIVF9DRU5URVI6XG4gICAgICAgIHRvcERpZmYgKz0gYW5jaG9yUmVjdC5oZWlnaHQgLyAyO1xuICAgICAgICBsZWZ0RGlmZiArPSBhbmNob3JSZWN0LndpZHRoO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgfVxuXG4gICAgLy8gc2Vjb25kLCBhZGp1c3QgcG9zaXRpb25pbmcgYmFzZWQgb24gcG9wb3ZlcidzIGFsaWduIHBvaW50XG4gICAgc3dpdGNoIChwb3BvdmVyQWxpZ24pIHtcbiAgICAgIGNhc2UgUG9pbnQuTEVGVF9UT1A6XG4gICAgICBjYXNlIFBvaW50LlRPUF9MRUZUOlxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgUG9pbnQuVE9QX0NFTlRFUjpcbiAgICAgICAgbGVmdERpZmYgLT0gcG9wb3ZlclJlY3Qud2lkdGggLyAyO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgUG9pbnQuVE9QX1JJR0hUOlxuICAgICAgICBsZWZ0RGlmZiAtPSBwb3BvdmVyUmVjdC53aWR0aDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFBvaW50LlJJR0hUX1RPUDpcbiAgICAgICAgbGVmdERpZmYgLT0gcG9wb3ZlclJlY3Qud2lkdGg7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBQb2ludC5MRUZUX0JPVFRPTTpcbiAgICAgICAgdG9wRGlmZiAtPSBwb3BvdmVyUmVjdC5oZWlnaHQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBQb2ludC5CT1RUT01fTEVGVDpcbiAgICAgICAgdG9wRGlmZiAtPSBwb3BvdmVyUmVjdC5oZWlnaHQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBQb2ludC5CT1RUT01fQ0VOVEVSOlxuICAgICAgICB0b3BEaWZmIC09IHBvcG92ZXJSZWN0LmhlaWdodDtcbiAgICAgICAgbGVmdERpZmYgLT0gcG9wb3ZlclJlY3Qud2lkdGggLyAyO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgUG9pbnQuQk9UVE9NX1JJR0hUOlxuICAgICAgICB0b3BEaWZmIC09IHBvcG92ZXJSZWN0LmhlaWdodDtcbiAgICAgICAgbGVmdERpZmYgLT0gcG9wb3ZlclJlY3Qud2lkdGg7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBQb2ludC5SSUdIVF9CT1RUT006XG4gICAgICAgIHRvcERpZmYgLT0gcG9wb3ZlclJlY3QuaGVpZ2h0O1xuICAgICAgICBsZWZ0RGlmZiAtPSBwb3BvdmVyUmVjdC53aWR0aDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFBvaW50LkxFRlRfQ0VOVEVSOlxuICAgICAgICB0b3BEaWZmIC09IHBvcG92ZXJSZWN0LmhlaWdodCAvIDI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBQb2ludC5SSUdIVF9DRU5URVI6XG4gICAgICAgIHRvcERpZmYgLT0gcG9wb3ZlclJlY3QuaGVpZ2h0IC8gMjtcbiAgICAgICAgbGVmdERpZmYgLT0gcG9wb3ZlclJlY3Qud2lkdGg7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICB9XG5cbiAgICAvLyBUaGlyZCwgYWRqdXN0IHdpdGggcG9wb3ZlcidzIG1hcmdpbnMgYmFzZWQgb24gdGhlIHR3byBhbGlnbiBwb2ludHMuXG4gICAgLy8gSGVyZSwgd2UgbWFrZSBhbiBhc3N1bXB0aW9uIHRoYXQgcG9wb3ZlciBpcyBwcmltYXJpbHkgcG9zaXRpb25lZCBvdXRzaWRlIHRoZVxuICAgIC8vIGFuY2hvciB3aXRoIG1pbm9yIG9mZnNldC4gV2l0aG91dCB0aGlzIGFzc3VtcHRpb24sIGl0J3MgaW1wb3NzaWJsZSB0byBhcHBseVxuICAgIC8vIHRoZSBwb3BvdmVyJ3MgbWFyZ2lucyBpbiBhIHByZWRpY3RhYmxlIHdheS4gRm9yIGV4YW1wbGUsIGFzc3VtZSB0aGF0IGEgcG9wb3ZlclxuICAgIC8vIGFuZCBpdHMgYW5jaG9yIGFyZSBleGFjdGx5IHRoZSBzYW1lIHNpemUuIGlmIGEgcG9wb3ZlciBpcyBwb3NpdGlvbmVkIGluc2lkZSB0aGVcbiAgICAvLyBhbmNob3IgKHdoaWNoIGlzIHRlY2huaWNhbGx5IHBvc3NpYmxlKSwgdGhlbiBpdCBiZWNvbWVzIGltcG9zc2libGUgdG8ga25vdyB3aGF0IHRvIGRvXG4gICAgLy8gaWYgdGhlIHBvcG92ZXIgaGFzIGEgbm9uLXplcm8gbWFyZ2luIHZhbHVlIGFsbCBhcm91bmQgKGJlY2F1c2UgYXBwbHlpbmcgdGhlIG1hcmdpbiBpblxuICAgIC8vIGFsbCBmb3VyIGRpcmVjdGlvbnMgd2lsbCByZXN1bHQgaW4gbm8gbWFyZ2luIHZpc3VhbGx5LCB3aGljaCBpc24ndCB3aGF0IHdlIHdhbnQpLlxuICAgIC8vIFRoZXJlZm9yZSwgb3VyIGxvZ2ljIG1ha2VzIGFzc3VtcHRpb25zIGFib3V0IG1hcmdpbnMgb2YgaW50ZXJlc3QgZ2l2ZW4gdGhlIHBvaW50cyxcbiAgICAvLyBhbmQgb25seSBjb3ZlcnMgdGhlIGNhc2VzIHdoZXJlIHBvcG92ZXIgaXMgb3V0c2lkZSB0aGUgYW5jaG9yLlxuXG4gICAgY29uc3QgcG9wb3ZlckNvbXB1dGVkU3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKHRoaXMuZWxlbWVudCk7XG4gICAgY29uc3QgbWFyZ2luTGVmdCA9IHBhcnNlSW50KHBvcG92ZXJDb21wdXRlZFN0eWxlLm1hcmdpbkxlZnQsIDEwKTtcbiAgICBjb25zdCBtYXJnaW5SaWdodCA9IHBhcnNlSW50KHBvcG92ZXJDb21wdXRlZFN0eWxlLm1hcmdpblJpZ2h0LCAxMCk7XG4gICAgY29uc3QgbWFyZ2luVG9wID0gcGFyc2VJbnQocG9wb3ZlckNvbXB1dGVkU3R5bGUubWFyZ2luVG9wLCAxMCk7XG4gICAgY29uc3QgbWFyZ2luQm90dG9tID0gcGFyc2VJbnQocG9wb3ZlckNvbXB1dGVkU3R5bGUubWFyZ2luQm90dG9tLCAxMCk7XG5cbiAgICBzd2l0Y2ggKGFuY2hvckFsaWduKSB7XG4gICAgICBjYXNlIFBvaW50LkxFRlRfVE9QOlxuICAgICAgY2FzZSBQb2ludC5UT1BfTEVGVDpcbiAgICAgIGNhc2UgUG9pbnQuVE9QX1JJR0hUOlxuICAgICAgY2FzZSBQb2ludC5SSUdIVF9UT1A6XG4gICAgICAgIGlmIChwb3BvdmVyQWxpZ24gPT09IFBvaW50LkJPVFRPTV9SSUdIVCB8fCBwb3BvdmVyQWxpZ24gPT09IFBvaW50LlJJR0hUX0JPVFRPTSkge1xuICAgICAgICAgIHRvcERpZmYgLT0gbWFyZ2luQm90dG9tO1xuICAgICAgICAgIGxlZnREaWZmIC09IG1hcmdpblJpZ2h0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChwb3BvdmVyQWxpZ24gPT09IFBvaW50LkJPVFRPTV9MRUZUIHx8IHBvcG92ZXJBbGlnbiA9PT0gUG9pbnQuTEVGVF9CT1RUT00pIHtcbiAgICAgICAgICB0b3BEaWZmIC09IG1hcmdpblRvcDtcbiAgICAgICAgICBsZWZ0RGlmZiArPSBtYXJnaW5MZWZ0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChwb3BvdmVyQWxpZ24gPT09IFBvaW50LlRPUF9MRUZUIHx8IHBvcG92ZXJBbGlnbiA9PT0gUG9pbnQuTEVGVF9UT1ApIHtcbiAgICAgICAgICB0b3BEaWZmICs9IG1hcmdpblRvcDtcbiAgICAgICAgICBsZWZ0RGlmZiArPSBtYXJnaW5MZWZ0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChwb3BvdmVyQWxpZ24gPT09IFBvaW50LlRPUF9SSUdIVCB8fCBwb3BvdmVyQWxpZ24gPT09IFBvaW50LlJJR0hUX1RPUCkge1xuICAgICAgICAgIHRvcERpZmYgKz0gbWFyZ2luVG9wO1xuICAgICAgICAgIGxlZnREaWZmIC09IG1hcmdpblJpZ2h0O1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBQb2ludC5MRUZUX0JPVFRPTTpcbiAgICAgIGNhc2UgUG9pbnQuQk9UVE9NX0xFRlQ6XG4gICAgICBjYXNlIFBvaW50LkJPVFRPTV9SSUdIVDpcbiAgICAgIGNhc2UgUG9pbnQuUklHSFRfQk9UVE9NOlxuICAgICAgICBpZiAocG9wb3ZlckFsaWduID09PSBQb2ludC5CT1RUT01fTEVGVCB8fCBwb3BvdmVyQWxpZ24gPT09IFBvaW50LkxFRlRfQk9UVE9NKSB7XG4gICAgICAgICAgdG9wRGlmZiAtPSBtYXJnaW5Cb3R0b207XG4gICAgICAgICAgbGVmdERpZmYgKz0gbWFyZ2luTGVmdDtcbiAgICAgICAgfVxuICAgICAgICBpZiAocG9wb3ZlckFsaWduID09PSBQb2ludC5CT1RUT01fUklHSFQgfHwgcG9wb3ZlckFsaWduID09PSBQb2ludC5SSUdIVF9CT1RUT00pIHtcbiAgICAgICAgICB0b3BEaWZmIC09IG1hcmdpbkJvdHRvbTtcbiAgICAgICAgICBsZWZ0RGlmZiAtPSBtYXJnaW5SaWdodDtcbiAgICAgICAgfVxuICAgICAgICBpZiAocG9wb3ZlckFsaWduID09PSBQb2ludC5UT1BfTEVGVCB8fCBwb3BvdmVyQWxpZ24gPT09IFBvaW50LkxFRlRfVE9QKSB7XG4gICAgICAgICAgdG9wRGlmZiArPSBtYXJnaW5Ub3A7XG4gICAgICAgICAgbGVmdERpZmYgKz0gbWFyZ2luTGVmdDtcbiAgICAgICAgfVxuICAgICAgICBpZiAocG9wb3ZlckFsaWduID09PSBQb2ludC5UT1BfUklHSFQgfHwgcG9wb3ZlckFsaWduID09PSBQb2ludC5SSUdIVF9UT1ApIHtcbiAgICAgICAgICB0b3BEaWZmICs9IG1hcmdpblRvcDtcbiAgICAgICAgICBsZWZ0RGlmZiAtPSBtYXJnaW5SaWdodDtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgUG9pbnQuVE9QX0NFTlRFUjpcbiAgICAgICAgdG9wRGlmZiAtPSBtYXJnaW5Cb3R0b207XG4gICAgICAgIGxlZnREaWZmICs9IG1hcmdpbkxlZnQ7XG4gICAgICAgIGxlZnREaWZmIC09IG1hcmdpblJpZ2h0O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgUG9pbnQuQk9UVE9NX0NFTlRFUjpcbiAgICAgICAgdG9wRGlmZiArPSBtYXJnaW5Ub3A7XG4gICAgICAgIGxlZnREaWZmICs9IG1hcmdpbkxlZnQ7XG4gICAgICAgIGxlZnREaWZmIC09IG1hcmdpblJpZ2h0O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgUG9pbnQuTEVGVF9DRU5URVI6XG4gICAgICAgIHRvcERpZmYgKz0gbWFyZ2luVG9wO1xuICAgICAgICB0b3BEaWZmIC09IG1hcmdpbkJvdHRvbTtcbiAgICAgICAgbGVmdERpZmYgLT0gbWFyZ2luUmlnaHQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBQb2ludC5SSUdIVF9DRU5URVI6XG4gICAgICAgIHRvcERpZmYgKz0gbWFyZ2luVG9wO1xuICAgICAgICB0b3BEaWZmIC09IG1hcmdpbkJvdHRvbTtcbiAgICAgICAgbGVmdERpZmYgKz0gbWFyZ2luTGVmdDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgIH1cblxuICAgIHRoaXMuZWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgke01hdGgucm91bmQobGVmdERpZmYpfXB4KSB0cmFuc2xhdGVZKCR7TWF0aC5yb3VuZCh0b3BEaWZmKX1weClgO1xuICAgIHJldHVybiB0aGlzLl9zY3JvbGwuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBwdWJsaWMgcmVsZWFzZSgpIHtcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gJyc7XG4gICAgdGhpcy5yZW1vdmVTY3JvbGxFdmVudExpc3RlbmVycygpO1xuICB9XG5cbiAgcHJpdmF0ZSBpc1Bvc2l0aW9uZWQoY29udGFpbmVyOiBhbnkpIHtcbiAgICBjb25zdCBwb3NpdGlvbiA9IGdldENvbXB1dGVkU3R5bGUoY29udGFpbmVyKS5wb3NpdGlvbjtcbiAgICByZXR1cm4gcG9zaXRpb24gPT09IFBPU0lUSU9OX1JFTEFUSVZFIHx8IHBvc2l0aW9uID09PSBQT1NJVElPTl9BQlNPTFVURSB8fCBwb3NpdGlvbiA9PT0gUE9TSVRJT05fRklYRUQ7XG4gIH1cblxuICAvKlxuICAgICAqIENvbnRhaW5lcnMgdXAgdG8gdGhlIGZpcnN0IHBvc2l0aW9uZWQgb25lIHdpbGwgaGF2ZSBhbiBldmVudCBvbiBzY3JvbGxcbiAgICAgKi9cblxuICBwcml2YXRlIHNjcm9sbGFibGVFbGVtZW50czogSFRNTEVsZW1lbnRbXSA9IFtdO1xuXG4gIHByaXZhdGUgZW1pdFNjcm9sbEV2ZW50KCkge1xuICAgIHRoaXMuX3Njcm9sbC5uZXh0KCk7XG4gIH1cblxuICBwcml2YXRlIGJvdW5kT25TY3JvbGxMaXN0ZW5lcjogYW55ID0gdGhpcy5lbWl0U2Nyb2xsRXZlbnQuYmluZCh0aGlzKTtcblxuICBwcml2YXRlIGFkZFNjcm9sbEV2ZW50TGlzdGVuZXJzKGU6IGFueSkge1xuICAgIHRoaXMuX3Njcm9sbCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gICAgY29uc3QgYW5jaG9yOiBhbnkgPSBlO1xuICAgIGxldCBjdXJyZW50OiBhbnkgPSBlO1xuICAgIHdoaWxlIChjdXJyZW50ICYmIGN1cnJlbnQgIT09IGRvY3VtZW50KSB7XG4gICAgICBpZiAodGhpcy5zY3JvbGxzKGN1cnJlbnQpKSB7XG4gICAgICAgIGN1cnJlbnQuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5ib3VuZE9uU2Nyb2xsTGlzdGVuZXIpO1xuICAgICAgICB0aGlzLnNjcm9sbGFibGVFbGVtZW50cy5wdXNoKGN1cnJlbnQpO1xuICAgICAgfVxuICAgICAgaWYgKGN1cnJlbnQgIT09IGFuY2hvciAmJiB0aGlzLmlzUG9zaXRpb25lZChjdXJyZW50KSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGN1cnJlbnQgPSBjdXJyZW50LnBhcmVudE5vZGU7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVTY3JvbGxFdmVudExpc3RlbmVycygpIHtcbiAgICBmb3IgKGNvbnN0IGVsZW0gb2YgdGhpcy5zY3JvbGxhYmxlRWxlbWVudHMpIHtcbiAgICAgIGVsZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5ib3VuZE9uU2Nyb2xsTGlzdGVuZXIpO1xuICAgIH1cbiAgICB0aGlzLnNjcm9sbGFibGVFbGVtZW50cy5sZW5ndGggPSAwO1xuICAgIGlmICh0aGlzLl9zY3JvbGwpIHtcbiAgICAgIHRoaXMuX3Njcm9sbC5jb21wbGV0ZSgpO1xuICAgICAgZGVsZXRlIHRoaXMuX3Njcm9sbDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNjcm9sbHMoY29udGFpbmVyOiBhbnkpOiBib29sZWFuIHtcbiAgICBjb25zdCBjb21wdXRlZFN0eWxlcyA9IGdldENvbXB1dGVkU3R5bGUoY29udGFpbmVyKTtcbiAgICByZXR1cm4gKFxuICAgICAgY29tcHV0ZWRTdHlsZXMub3ZlcmZsb3dYID09PSBPVkVSRkxPV19TQ1JPTEwgfHxcbiAgICAgIGNvbXB1dGVkU3R5bGVzLm92ZXJmbG93WCA9PT0gT1ZFUkZMT1dfQVVUTyB8fFxuICAgICAgY29tcHV0ZWRTdHlsZXMub3ZlcmZsb3dZID09PSBPVkVSRkxPV19TQ1JPTEwgfHxcbiAgICAgIGNvbXB1dGVkU3R5bGVzLm92ZXJmbG93WSA9PT0gT1ZFUkZMT1dfQVVUT1xuICAgICk7XG4gIH1cbn1cbiJdfQ==