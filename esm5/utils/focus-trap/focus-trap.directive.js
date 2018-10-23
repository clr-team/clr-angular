/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Directive, ElementRef, HostListener, Inject, Injector, PLATFORM_ID, Renderer2, } from '@angular/core';
import { FocusTrapTracker } from './focus-trap-tracker.service';
var FocusTrapDirective = /** @class */ (function () {
    function FocusTrapDirective(el, injector, focusTrapsTracker, renderer, platformId) {
        this.el = el;
        this.injector = injector;
        this.focusTrapsTracker = focusTrapsTracker;
        this.renderer = renderer;
        this.platformId = platformId;
        this.document = this.injector.get(DOCUMENT);
        this.focusTrapsTracker.current = this;
        this.renderer.setAttribute(this.el.nativeElement, 'tabindex', '0');
    }
    /**
     * @param {?} event
     * @return {?}
     */
    FocusTrapDirective.prototype.onFocusIn = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var nativeElement = this.el.nativeElement;
        if (this.focusTrapsTracker.current === this && event.target && !nativeElement.contains(event.target)) {
            nativeElement.focus();
        }
    };
    /**
     * @return {?}
     */
    FocusTrapDirective.prototype.createFocusableOffScreenEl = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var offScreenSpan = this.renderer.createElement('span');
        this.renderer.setAttribute(offScreenSpan, 'tabindex', '0');
        this.renderer.addClass(offScreenSpan, 'offscreen-focus-rebounder');
        return offScreenSpan;
    };
    /**
     * @return {?}
     */
    FocusTrapDirective.prototype.addReboundEls = /**
     * @return {?}
     */
    function () {
        // We will add these focus rebounding elements only in the following conditions:
        // 1. It should be running inside browser platform as it accesses document.body element
        // 2. We should NOT add them more than once. Hence, we are counting a number of focus trappers
        //    and only add on the first focus trapper.
        if (isPlatformBrowser(this.platformId) && this.focusTrapsTracker.nbFocusTrappers === 1) {
            this.topReboundEl = this.createFocusableOffScreenEl();
            this.bottomReboundEl = this.createFocusableOffScreenEl();
            // Add reboundBeforeTrapEl to the document body as the first child
            this.renderer.insertBefore(this.document.body, this.topReboundEl, this.document.body.firstChild);
            // Add reboundAfterTrapEl to the document body as the last child
            this.renderer.appendChild(this.document.body, this.bottomReboundEl);
        }
    };
    /**
     * @return {?}
     */
    FocusTrapDirective.prototype.removeReboundEls = /**
     * @return {?}
     */
    function () {
        if (isPlatformBrowser(this.platformId) &&
            this.focusTrapsTracker.nbFocusTrappers === 1 &&
            this.topReboundEl &&
            this.bottomReboundEl) {
            this.renderer.removeChild(this.document.body, this.topReboundEl);
            this.renderer.removeChild(this.document.body, this.bottomReboundEl);
        }
    };
    /**
     * @return {?}
     */
    FocusTrapDirective.prototype.setPreviousFocus = /**
     * @return {?}
     */
    function () {
        if (this.previousActiveElement && this.previousActiveElement.focus) {
            this.previousActiveElement.focus();
        }
    };
    /**
     * @return {?}
     */
    FocusTrapDirective.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        if (isPlatformBrowser(this.platformId)) {
            this.previousActiveElement = (/** @type {?} */ (this.document.activeElement));
        }
        this.addReboundEls();
    };
    /**
     * @return {?}
     */
    FocusTrapDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.removeReboundEls();
        this.setPreviousFocus();
        this.focusTrapsTracker.activatePreviousTrapper();
    };
    FocusTrapDirective.decorators = [
        { type: Directive, args: [{ selector: '[clrFocusTrap]' },] }
    ];
    /** @nocollapse */
    FocusTrapDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Injector },
        { type: FocusTrapTracker },
        { type: Renderer2 },
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
    ]; };
    FocusTrapDirective.propDecorators = {
        onFocusIn: [{ type: HostListener, args: ['document:focusin', ['$event'],] }]
    };
    return FocusTrapDirective;
}());
export { FocusTrapDirective };
if (false) {
    /** @type {?} */
    FocusTrapDirective.prototype.previousActiveElement;
    /** @type {?} */
    FocusTrapDirective.prototype.document;
    /** @type {?} */
    FocusTrapDirective.prototype.topReboundEl;
    /** @type {?} */
    FocusTrapDirective.prototype.bottomReboundEl;
    /** @type {?} */
    FocusTrapDirective.prototype.el;
    /** @type {?} */
    FocusTrapDirective.prototype.injector;
    /** @type {?} */
    FocusTrapDirective.prototype.focusTrapsTracker;
    /** @type {?} */
    FocusTrapDirective.prototype.renderer;
    /** @type {?} */
    FocusTrapDirective.prototype.platformId;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9jdXMtdHJhcC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJ1dGlscy9mb2N1cy10cmFwL2ZvY3VzLXRyYXAuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtBLE9BQU8sRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM5RCxPQUFPLEVBRUwsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUNOLFFBQVEsRUFFUixXQUFXLEVBQ1gsU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRWhFO0lBUUUsNEJBQ1UsRUFBYyxFQUNkLFFBQWtCLEVBQ2xCLGlCQUFtQyxFQUNuQyxRQUFtQixFQUNFLFVBQWtCO1FBSnZDLE9BQUUsR0FBRixFQUFFLENBQVk7UUFDZCxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDbkMsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNFLGVBQVUsR0FBVixVQUFVLENBQVE7UUFFL0MsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUV0QyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDckUsQ0FBQzs7Ozs7SUFHRCxzQ0FBUzs7OztJQURULFVBQ1UsS0FBVTs7WUFDWixhQUFhLEdBQWdCLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYTtRQUV4RCxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxP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QkFHVixRQUFRO2dCQU1ELGdCQUFnQjtnQkFIdkIsU0FBUztnQkFrQmtDLE1BQU0sdUJBQTlDLE1BQU0sU0FBQyxXQUFXOzs7NEJBUXBCLFlBQVksU0FBQyxrQkFBa0IsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7SUFnRTlDLHlCQUFDO0NBQUEsQUFyRkQsSUFxRkM7U0FwRlksa0JBQWtCOzs7SUFDN0IsbURBQW1DOztJQUNuQyxzQ0FBMkI7O0lBRTNCLDBDQUEwQjs7SUFDMUIsNkNBQTZCOztJQUczQixnQ0FBc0I7O0lBQ3RCLHNDQUEwQjs7SUFDMUIsK0NBQTJDOztJQUMzQyxzQ0FBMkI7O0lBQzNCLHdDQUErQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IERPQ1VNRU5ULCBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5qZWN0LFxuICBJbmplY3RvcixcbiAgT25EZXN0cm95LFxuICBQTEFURk9STV9JRCxcbiAgUmVuZGVyZXIyLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRm9jdXNUcmFwVHJhY2tlciB9IGZyb20gJy4vZm9jdXMtdHJhcC10cmFja2VyLnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbY2xyRm9jdXNUcmFwXScgfSlcbmV4cG9ydCBjbGFzcyBGb2N1c1RyYXBEaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICBwcml2YXRlIHByZXZpb3VzQWN0aXZlRWxlbWVudDogYW55O1xuICBwcml2YXRlIGRvY3VtZW50OiBEb2N1bWVudDtcblxuICBwcml2YXRlIHRvcFJlYm91bmRFbDogYW55O1xuICBwcml2YXRlIGJvdHRvbVJlYm91bmRFbDogYW55O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgcHJpdmF0ZSBmb2N1c1RyYXBzVHJhY2tlcjogRm9jdXNUcmFwVHJhY2tlcixcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBPYmplY3RcbiAgKSB7XG4gICAgdGhpcy5kb2N1bWVudCA9IHRoaXMuaW5qZWN0b3IuZ2V0KERPQ1VNRU5UKTtcbiAgICB0aGlzLmZvY3VzVHJhcHNUcmFja2VyLmN1cnJlbnQgPSB0aGlzO1xuXG4gICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAndGFiaW5kZXgnLCAnMCcpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6Zm9jdXNpbicsIFsnJGV2ZW50J10pXG4gIG9uRm9jdXNJbihldmVudDogYW55KSB7XG4gICAgY29uc3QgbmF0aXZlRWxlbWVudDogSFRNTEVsZW1lbnQgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICBpZiAodGhpcy5mb2N1c1RyYXBzVHJhY2tlci5jdXJyZW50ID09PSB0aGlzICYmIGV2ZW50LnRhcmdldCAmJiAhbmF0aXZlRWxlbWVudC5jb250YWlucyhldmVudC50YXJnZXQpKSB7XG4gICAgICBuYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVGb2N1c2FibGVPZmZTY3JlZW5FbCgpOiBhbnkge1xuICAgIGNvbnN0IG9mZlNjcmVlblNwYW4gPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZShvZmZTY3JlZW5TcGFuLCAndGFiaW5kZXgnLCAnMCcpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3Mob2ZmU2NyZWVuU3BhbiwgJ29mZnNjcmVlbi1mb2N1cy1yZWJvdW5kZXInKTtcblxuICAgIHJldHVybiBvZmZTY3JlZW5TcGFuO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRSZWJvdW5kRWxzKCkge1xuICAgIC8vIFdlIHdpbGwgYWRkIHRoZXNlIGZvY3VzIHJlYm91bmRpbmcgZWxlbWVudHMgb25seSBpbiB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gICAgLy8gMS4gSXQgc2hvdWxkIGJlIHJ1bm5pbmcgaW5zaWRlIGJyb3dzZXIgcGxhdGZvcm0gYXMgaXQgYWNjZXNzZXMgZG9jdW1lbnQuYm9keSBlbGVtZW50XG4gICAgLy8gMi4gV2Ugc2hvdWxkIE5PVCBhZGQgdGhlbSBtb3JlIHRoYW4gb25jZS4gSGVuY2UsIHdlIGFyZSBjb3VudGluZyBhIG51bWJlciBvZiBmb2N1cyB0cmFwcGVyc1xuICAgIC8vICAgIGFuZCBvbmx5IGFkZCBvbiB0aGUgZmlyc3QgZm9jdXMgdHJhcHBlci5cblxuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpICYmIHRoaXMuZm9jdXNUcmFwc1RyYWNrZXIubmJGb2N1c1RyYXBwZXJzID09PSAxKSB7XG4gICAgICB0aGlzLnRvcFJlYm91bmRFbCA9IHRoaXMuY3JlYXRlRm9jdXNhYmxlT2ZmU2NyZWVuRWwoKTtcbiAgICAgIHRoaXMuYm90dG9tUmVib3VuZEVsID0gdGhpcy5jcmVhdGVGb2N1c2FibGVPZmZTY3JlZW5FbCgpO1xuICAgICAgLy8gQWRkIHJlYm91bmRCZWZvcmVUcmFwRWwgdG8gdGhlIGRvY3VtZW50IGJvZHkgYXMgdGhlIGZpcnN0IGNoaWxkXG4gICAgICB0aGlzLnJlbmRlcmVyLmluc2VydEJlZm9yZSh0aGlzLmRvY3VtZW50LmJvZHksIHRoaXMudG9wUmVib3VuZEVsLCB0aGlzLmRvY3VtZW50LmJvZHkuZmlyc3RDaGlsZCk7XG4gICAgICAvLyBBZGQgcmVib3VuZEFmdGVyVHJhcEVsIHRvIHRoZSBkb2N1bWVudCBib2R5IGFzIHRoZSBsYXN0IGNoaWxkXG4gICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMuZG9jdW1lbnQuYm9keSwgdGhpcy5ib3R0b21SZWJvdW5kRWwpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcmVtb3ZlUmVib3VuZEVscygpIHtcbiAgICBpZiAoXG4gICAgICBpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpICYmXG4gICAgICB0aGlzLmZvY3VzVHJhcHNUcmFja2VyLm5iRm9jdXNUcmFwcGVycyA9PT0gMSAmJlxuICAgICAgdGhpcy50b3BSZWJvdW5kRWwgJiZcbiAgICAgIHRoaXMuYm90dG9tUmVib3VuZEVsXG4gICAgKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNoaWxkKHRoaXMuZG9jdW1lbnQuYm9keSwgdGhpcy50b3BSZWJvdW5kRWwpO1xuICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDaGlsZCh0aGlzLmRvY3VtZW50LmJvZHksIHRoaXMuYm90dG9tUmVib3VuZEVsKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc2V0UHJldmlvdXNGb2N1cygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5wcmV2aW91c0FjdGl2ZUVsZW1lbnQgJiYgdGhpcy5wcmV2aW91c0FjdGl2ZUVsZW1lbnQuZm9jdXMpIHtcbiAgICAgIHRoaXMucHJldmlvdXNBY3RpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICB0aGlzLnByZXZpb3VzQWN0aXZlRWxlbWVudCA9IDxIVE1MRWxlbWVudD50aGlzLmRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gICAgfVxuXG4gICAgdGhpcy5hZGRSZWJvdW5kRWxzKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnJlbW92ZVJlYm91bmRFbHMoKTtcbiAgICB0aGlzLnNldFByZXZpb3VzRm9jdXMoKTtcbiAgICB0aGlzLmZvY3VzVHJhcHNUcmFja2VyLmFjdGl2YXRlUHJldmlvdXNUcmFwcGVyKCk7XG4gIH1cbn1cbiJdfQ==