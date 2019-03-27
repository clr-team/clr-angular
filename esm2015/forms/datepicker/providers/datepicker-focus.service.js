/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, NgZone, PLATFORM_ID } from '@angular/core';
import { first, filter } from 'rxjs/operators';
/**
 * This service focuses the day that is focusable in the calendar.
 */
export class DatepickerFocusService {
    /**
     * @param {?} _ngZone
     * @param {?} platformId
     */
    constructor(_ngZone, platformId) {
        this._ngZone = _ngZone;
        this.platformId = platformId;
    }
    /**
     * @param {?} elRef
     * @return {?}
     */
    focusCell(elRef) {
        this._ngZone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            this.ngZoneIsStableInBrowser().subscribe((/**
             * @return {?}
             */
            () => {
                /** @type {?} */
                const focusEl = elRef.nativeElement.querySelector('[tabindex="0"]');
                if (focusEl) {
                    focusEl.focus();
                }
            }));
        }));
    }
    /**
     * @param {?} element
     * @return {?}
     */
    focusInput(element) {
        this._ngZone.runOutsideAngular((/**
         * @return {?}
         */
        () => this.ngZoneIsStableInBrowser().subscribe((/**
         * @return {?}
         */
        () => element.focus()))));
    }
    /**
     * @param {?} element
     * @return {?}
     */
    elementIsFocused(element) {
        return isPlatformBrowser(this.platformId) && document.activeElement === element;
    }
    /**
     * @private
     * @return {?}
     */
    ngZoneIsStableInBrowser() {
        // Credit: Material: https://github.com/angular/material2/blob/master/src/lib/datepicker/calendar.ts
        return this._ngZone.onStable.asObservable().pipe(first(), filter((/**
         * @return {?}
         */
        () => isPlatformBrowser(this.platformId))));
    }
}
DatepickerFocusService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
DatepickerFocusService.ctorParameters = () => [
    { type: NgZone },
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    DatepickerFocusService.prototype._ngZone;
    /**
     * @type {?}
     * @private
     */
    DatepickerFocusService.prototype.platformId;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1mb2N1cy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZm9ybXMvZGF0ZXBpY2tlci9wcm92aWRlcnMvZGF0ZXBpY2tlci1mb2N1cy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQU1BLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3BELE9BQU8sRUFBYyxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDcEYsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQU0vQyxNQUFNLE9BQU8sc0JBQXNCOzs7OztJQUNqQyxZQUFvQixPQUFlLEVBQStCLFVBQWtCO1FBQWhFLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFBK0IsZUFBVSxHQUFWLFVBQVUsQ0FBUTtJQUFHLENBQUM7Ozs7O0lBRXhGLFNBQVMsQ0FBQyxLQUFpQjtRQUN6QixJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQjs7O1FBQUMsR0FBRyxFQUFFO1lBQ2xDLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDLFNBQVM7OztZQUFDLEdBQUcsRUFBRTs7c0JBQ3RDLE9BQU8sR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQztnQkFDbkUsSUFBSSxPQUFPLEVBQUU7b0JBQ1gsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO2lCQUNqQjtZQUNILENBQUMsRUFBQyxDQUFDO1FBQ0wsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7OztJQUVELFVBQVUsQ0FBQyxPQUF5QjtRQUNsQyxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQjs7O1FBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUMsU0FBUzs7O1FBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFDLEVBQUMsQ0FBQztJQUN4RyxDQUFDOzs7OztJQUVELGdCQUFnQixDQUFDLE9BQXlCO1FBQ3hDLE9BQU8saUJBQWlCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxhQUFhLEtBQUssT0FBTyxDQUFDO0lBQ2xGLENBQUM7Ozs7O0lBRU8sdUJBQXVCO1FBQzdCLG9HQUFvRztRQUNwRyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRSxNQUFNOzs7UUFBQyxHQUFHLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUMsQ0FBQyxDQUFDO0lBQzlHLENBQUM7OztZQTFCRixVQUFVOzs7O1lBTjhCLE1BQU07WUFRaUMsTUFBTSx1QkFBOUMsTUFBTSxTQUFDLFdBQVc7Ozs7Ozs7SUFBNUMseUNBQXVCOzs7OztJQUFFLDRDQUErQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRWxlbWVudFJlZiwgSW5qZWN0LCBJbmplY3RhYmxlLCBOZ1pvbmUsIFBMQVRGT1JNX0lEIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmaXJzdCwgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG4vKipcbiAqIFRoaXMgc2VydmljZSBmb2N1c2VzIHRoZSBkYXkgdGhhdCBpcyBmb2N1c2FibGUgaW4gdGhlIGNhbGVuZGFyLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGF0ZXBpY2tlckZvY3VzU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX25nWm9uZTogTmdab25lLCBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IE9iamVjdCkge31cblxuICBmb2N1c0NlbGwoZWxSZWY6IEVsZW1lbnRSZWYpOiB2b2lkIHtcbiAgICB0aGlzLl9uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5uZ1pvbmVJc1N0YWJsZUluQnJvd3NlcigpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGZvY3VzRWwgPSBlbFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ1t0YWJpbmRleD1cIjBcIl0nKTtcbiAgICAgICAgaWYgKGZvY3VzRWwpIHtcbiAgICAgICAgICBmb2N1c0VsLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZm9jdXNJbnB1dChlbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50KTogdm9pZCB7XG4gICAgdGhpcy5fbmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHRoaXMubmdab25lSXNTdGFibGVJbkJyb3dzZXIoKS5zdWJzY3JpYmUoKCkgPT4gZWxlbWVudC5mb2N1cygpKSk7XG4gIH1cblxuICBlbGVtZW50SXNGb2N1c2VkKGVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQpIHtcbiAgICByZXR1cm4gaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSAmJiBkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBlbGVtZW50O1xuICB9XG5cbiAgcHJpdmF0ZSBuZ1pvbmVJc1N0YWJsZUluQnJvd3NlcigpIHtcbiAgICAvLyBDcmVkaXQ6IE1hdGVyaWFsOiBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9tYXRlcmlhbDIvYmxvYi9tYXN0ZXIvc3JjL2xpYi9kYXRlcGlja2VyL2NhbGVuZGFyLnRzXG4gICAgcmV0dXJuIHRoaXMuX25nWm9uZS5vblN0YWJsZS5hc09ic2VydmFibGUoKS5waXBlKGZpcnN0KCksIGZpbHRlcigoKSA9PiBpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSk7XG4gIH1cbn1cbiJdfQ==