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
export class FocusTrapDirective {
    /**
     * @param {?} el
     * @param {?} injector
     * @param {?} focusTrapsTracker
     * @param {?} renderer
     * @param {?} platformId
     */
    constructor(el, injector, focusTrapsTracker, renderer, platformId) {
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
    onFocusIn(event) {
        /** @type {?} */
        const nativeElement = this.el.nativeElement;
        if (this.focusTrapsTracker.current === this && event.target && !nativeElement.contains(event.target)) {
            nativeElement.focus();
        }
    }
    /**
     * @return {?}
     */
    createFocusableOffScreenEl() {
        /** @type {?} */
        const offScreenSpan = this.renderer.createElement('span');
        this.renderer.setAttribute(offScreenSpan, 'tabindex', '0');
        this.renderer.addClass(offScreenSpan, 'offscreen-focus-rebounder');
        return offScreenSpan;
    }
    /**
     * @return {?}
     */
    addReboundEls() {
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
    }
    /**
     * @return {?}
     */
    removeReboundEls() {
        if (isPlatformBrowser(this.platformId) &&
            this.focusTrapsTracker.nbFocusTrappers === 1 &&
            this.topReboundEl &&
            this.bottomReboundEl) {
            this.renderer.removeChild(this.document.body, this.topReboundEl);
            this.renderer.removeChild(this.document.body, this.bottomReboundEl);
        }
    }
    /**
     * @return {?}
     */
    setPreviousFocus() {
        if (this.previousActiveElement && this.previousActiveElement.focus) {
            this.previousActiveElement.focus();
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.previousActiveElement = (/** @type {?} */ (this.document.activeElement));
        }
        this.addReboundEls();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.removeReboundEls();
        this.setPreviousFocus();
        this.focusTrapsTracker.activatePreviousTrapper();
    }
}
FocusTrapDirective.decorators = [
    { type: Directive, args: [{ selector: '[clrFocusTrap]' },] }
];
/** @nocollapse */
FocusTrapDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Injector },
    { type: FocusTrapTracker },
    { type: Renderer2 },
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
];
FocusTrapDirective.propDecorators = {
    onFocusIn: [{ type: HostListener, args: ['document:focusin', ['$event'],] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9jdXMtdHJhcC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJ1dGlscy9mb2N1cy10cmFwL2ZvY3VzLXRyYXAuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtBLE9BQU8sRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM5RCxPQUFPLEVBRUwsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUNOLFFBQVEsRUFFUixXQUFXLEVBQ1gsU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBR2hFLE1BQU0sT0FBTyxrQkFBa0I7Ozs7Ozs7O0lBTzdCLFlBQ1UsRUFBYyxFQUNkLFFBQWtCLEVBQ2xCLGlCQUFtQyxFQUNuQyxRQUFtQixFQUNFLFVBQWtCO1FBSnZDLE9BQUUsR0FBRixFQUFFLENBQVk7UUFDZCxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDbkMsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNFLGVBQVUsR0FBVixVQUFVLENBQVE7UUFFL0MsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUV0QyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDckUsQ0FBQzs7Ozs7SUFHRCxTQUFTLENBQUMsS0FBVTs7Y0FDWixhQUFhLEdBQWdCLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYTtRQUV4RCxJQUFJLElBQUksQ0FB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O1lBa0JrQyxNQUFNLHVCQUE5QyxNQUFNLFNBQUMsV0FBVzs7O3dCQVFwQixZQUFZLFNBQUMsa0JBQWtCLEVBQUUsQ0FBQyxRQUFRLENBQUM7Ozs7SUFuQjVDLG1EQUFtQzs7SUFDbkMsc0NBQTJCOztJQUUzQiwwQ0FBMEI7O0lBQzFCLDZDQUE2Qjs7SUFHM0IsZ0NBQXNCOztJQUN0QixzQ0FBMEI7O0lBQzFCLCtDQUEyQzs7SUFDM0Msc0NBQTJCOztJQUMzQix3Q0FBK0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBET0NVTUVOVCwgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBIb3N0TGlzdGVuZXIsXG4gIEluamVjdCxcbiAgSW5qZWN0b3IsXG4gIE9uRGVzdHJveSxcbiAgUExBVEZPUk1fSUQsXG4gIFJlbmRlcmVyMixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEZvY3VzVHJhcFRyYWNrZXIgfSBmcm9tICcuL2ZvY3VzLXRyYXAtdHJhY2tlci5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW2NsckZvY3VzVHJhcF0nIH0pXG5leHBvcnQgY2xhc3MgRm9jdXNUcmFwRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBwcmV2aW91c0FjdGl2ZUVsZW1lbnQ6IGFueTtcbiAgcHJpdmF0ZSBkb2N1bWVudDogRG9jdW1lbnQ7XG5cbiAgcHJpdmF0ZSB0b3BSZWJvdW5kRWw6IGFueTtcbiAgcHJpdmF0ZSBib3R0b21SZWJvdW5kRWw6IGFueTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgIHByaXZhdGUgZm9jdXNUcmFwc1RyYWNrZXI6IEZvY3VzVHJhcFRyYWNrZXIsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogT2JqZWN0XG4gICkge1xuICAgIHRoaXMuZG9jdW1lbnQgPSB0aGlzLmluamVjdG9yLmdldChET0NVTUVOVCk7XG4gICAgdGhpcy5mb2N1c1RyYXBzVHJhY2tlci5jdXJyZW50ID0gdGhpcztcblxuICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3RhYmluZGV4JywgJzAnKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmZvY3VzaW4nLCBbJyRldmVudCddKVxuICBvbkZvY3VzSW4oZXZlbnQ6IGFueSkge1xuICAgIGNvbnN0IG5hdGl2ZUVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50O1xuXG4gICAgaWYgKHRoaXMuZm9jdXNUcmFwc1RyYWNrZXIuY3VycmVudCA9PT0gdGhpcyAmJiBldmVudC50YXJnZXQgJiYgIW5hdGl2ZUVsZW1lbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgbmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlRm9jdXNhYmxlT2ZmU2NyZWVuRWwoKTogYW55IHtcbiAgICBjb25zdCBvZmZTY3JlZW5TcGFuID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUob2ZmU2NyZWVuU3BhbiwgJ3RhYmluZGV4JywgJzAnKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKG9mZlNjcmVlblNwYW4sICdvZmZzY3JlZW4tZm9jdXMtcmVib3VuZGVyJyk7XG5cbiAgICByZXR1cm4gb2ZmU2NyZWVuU3BhbjtcbiAgfVxuXG4gIHByaXZhdGUgYWRkUmVib3VuZEVscygpIHtcbiAgICAvLyBXZSB3aWxsIGFkZCB0aGVzZSBmb2N1cyByZWJvdW5kaW5nIGVsZW1lbnRzIG9ubHkgaW4gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICAgIC8vIDEuIEl0IHNob3VsZCBiZSBydW5uaW5nIGluc2lkZSBicm93c2VyIHBsYXRmb3JtIGFzIGl0IGFjY2Vzc2VzIGRvY3VtZW50LmJvZHkgZWxlbWVudFxuICAgIC8vIDIuIFdlIHNob3VsZCBOT1QgYWRkIHRoZW0gbW9yZSB0aGFuIG9uY2UuIEhlbmNlLCB3ZSBhcmUgY291bnRpbmcgYSBudW1iZXIgb2YgZm9jdXMgdHJhcHBlcnNcbiAgICAvLyAgICBhbmQgb25seSBhZGQgb24gdGhlIGZpcnN0IGZvY3VzIHRyYXBwZXIuXG5cbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSAmJiB0aGlzLmZvY3VzVHJhcHNUcmFja2VyLm5iRm9jdXNUcmFwcGVycyA9PT0gMSkge1xuICAgICAgdGhpcy50b3BSZWJvdW5kRWwgPSB0aGlzLmNyZWF0ZUZvY3VzYWJsZU9mZlNjcmVlbkVsKCk7XG4gICAgICB0aGlzLmJvdHRvbVJlYm91bmRFbCA9IHRoaXMuY3JlYXRlRm9jdXNhYmxlT2ZmU2NyZWVuRWwoKTtcbiAgICAgIC8vIEFkZCByZWJvdW5kQmVmb3JlVHJhcEVsIHRvIHRoZSBkb2N1bWVudCBib2R5IGFzIHRoZSBmaXJzdCBjaGlsZFxuICAgICAgdGhpcy5yZW5kZXJlci5pbnNlcnRCZWZvcmUodGhpcy5kb2N1bWVudC5ib2R5LCB0aGlzLnRvcFJlYm91bmRFbCwgdGhpcy5kb2N1bWVudC5ib2R5LmZpcnN0Q2hpbGQpO1xuICAgICAgLy8gQWRkIHJlYm91bmRBZnRlclRyYXBFbCB0byB0aGUgZG9jdW1lbnQgYm9keSBhcyB0aGUgbGFzdCBjaGlsZFxuICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLmRvY3VtZW50LmJvZHksIHRoaXMuYm90dG9tUmVib3VuZEVsKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJlbW92ZVJlYm91bmRFbHMoKSB7XG4gICAgaWYgKFxuICAgICAgaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSAmJlxuICAgICAgdGhpcy5mb2N1c1RyYXBzVHJhY2tlci5uYkZvY3VzVHJhcHBlcnMgPT09IDEgJiZcbiAgICAgIHRoaXMudG9wUmVib3VuZEVsICYmXG4gICAgICB0aGlzLmJvdHRvbVJlYm91bmRFbFxuICAgICkge1xuICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDaGlsZCh0aGlzLmRvY3VtZW50LmJvZHksIHRoaXMudG9wUmVib3VuZEVsKTtcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2hpbGQodGhpcy5kb2N1bWVudC5ib2R5LCB0aGlzLmJvdHRvbVJlYm91bmRFbCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNldFByZXZpb3VzRm9jdXMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucHJldmlvdXNBY3RpdmVFbGVtZW50ICYmIHRoaXMucHJldmlvdXNBY3RpdmVFbGVtZW50LmZvY3VzKSB7XG4gICAgICB0aGlzLnByZXZpb3VzQWN0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgdGhpcy5wcmV2aW91c0FjdGl2ZUVsZW1lbnQgPSA8SFRNTEVsZW1lbnQ+dGhpcy5kb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuICAgIH1cblxuICAgIHRoaXMuYWRkUmVib3VuZEVscygpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5yZW1vdmVSZWJvdW5kRWxzKCk7XG4gICAgdGhpcy5zZXRQcmV2aW91c0ZvY3VzKCk7XG4gICAgdGhpcy5mb2N1c1RyYXBzVHJhY2tlci5hY3RpdmF0ZVByZXZpb3VzVHJhcHBlcigpO1xuICB9XG59XG4iXX0=