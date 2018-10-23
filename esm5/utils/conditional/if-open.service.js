/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
var IfOpenService = /** @class */ (function () {
    function IfOpenService() {
        /**
         * *****
         * \@property _openChange
         *
         * \@description
         * A RXJS Subject that updates and provides subscriptions to for the current open state of a component template
         * implemting the IfOpen structural directive.
         */
        this._openChange = new Subject();
        /**
         *  Popovers might need to ignore click events on an element
         *  (eg: popover opens on focus on an input field. Clicks should be ignored in this case)
         */
        this._ignoredElementChange = new Subject();
    }
    Object.defineProperty(IfOpenService.prototype, "openChange", {
        /*********
         *
         * @description
         * A getter function that provides an observable for the _opened Subject.
         *
         */
        get: /**
         * ******
         *
         * \@description
         * A getter function that provides an observable for the _opened Subject.
         *
         * @return {?}
         */
        function () {
            return this._openChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IfOpenService.prototype, "open", {
        /*********
         *
         * @description
         * A getter that returns the current value of this IfOpen instance.
         *
         */
        get: /**
         * ******
         *
         * \@description
         * A getter that returns the current value of this IfOpen instance.
         *
         * @return {?}
         */
        function () {
            return this._open;
        },
        /*********
         *
         * @description
         * A setter function that updates the current state of _open for this instance of IfOpen structural directive. And,
         * broadcasts the new value to all subscribers.
         *
         * @param value
         */
        set: /**
         * ******
         *
         * \@description
         * A setter function that updates the current state of _open for this instance of IfOpen structural directive. And,
         * broadcasts the new value to all subscribers.
         *
         * @param {?} value
         * @return {?}
         */
        function (value) {
            value = !!value;
            if (this._open !== value) {
                this._open = value;
                this._openChange.next(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} event
     * @return {?}
     */
    IfOpenService.prototype.toggleWithEvent = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.originalEvent = event;
        this.open = !this.open;
        delete this.originalEvent;
    };
    Object.defineProperty(IfOpenService.prototype, "ignoredElementChange", {
        get: /**
         * @return {?}
         */
        function () {
            return this._ignoredElementChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} element
     * @return {?}
     */
    IfOpenService.prototype.registerIgnoredElement = /**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        this._ignoredElementChange.next(element);
    };
    IfOpenService.decorators = [
        { type: Injectable }
    ];
    return IfOpenService;
}());
export { IfOpenService };
if (false) {
    /**
     * *****
     * \@property _openChange
     *
     * \@description
     * A RXJS Subject that updates and provides subscriptions to for the current open state of a component template
     * implemting the IfOpen structural directive.
     * @type {?}
     */
    IfOpenService.prototype._openChange;
    /**
     * ******
     * \@property _open
     *
     * \@description
     * A property holding the current value for open/closed state of an IfOpen structural directive.
     *
     * @type {?}
     */
    IfOpenService.prototype._open;
    /**
     * Sometimes, we need to remember the event that triggered the toggling to avoid loops.
     * This is for instance the case of components that open on a click, but close on a click outside.
     * @type {?}
     */
    IfOpenService.prototype.originalEvent;
    /**
     *  Popovers might need to ignore click events on an element
     *  (eg: popover opens on focus on an input field. Clicks should be ignored in this case)
     * @type {?}
     */
    IfOpenService.prototype._ignoredElementChange;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWYtb3Blbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsidXRpbHMvY29uZGl0aW9uYWwvaWYtb3Blbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtBLE9BQU8sRUFBYyxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFdkQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUUvQjtJQUFBOzs7Ozs7Ozs7UUFtQlUsZ0JBQVcsR0FBcUIsSUFBSSxPQUFPLEVBQVcsQ0FBQzs7Ozs7UUE4RHZELDBCQUFxQixHQUF3QixJQUFJLE9BQU8sRUFBYyxDQUFDO0lBU2pGLENBQUM7SUF0REMsc0JBQVcscUNBQVU7UUFOckI7Ozs7O1dBS0c7Ozs7Ozs7OztRQUNIO1lBQ0UsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3pDLENBQUM7OztPQUFBO0lBVUQsc0JBQVcsK0JBQUk7UUFRZjs7Ozs7V0FLRzs7Ozs7Ozs7O1FBQ0g7WUFDRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDcEIsQ0FBQztRQXhCRDs7Ozs7OztXQU9HOzs7Ozs7Ozs7OztRQUNILFVBQWdCLEtBQWM7WUFDNUIsS0FBSyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDaEIsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLEtBQUssRUFBRTtnQkFDeEIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7Z0JBQ25CLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzlCO1FBQ0gsQ0FBQzs7O09BQUE7Ozs7O0lBaUJNLHVDQUFlOzs7O0lBQXRCLFVBQXVCLEtBQVU7UUFDL0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFDM0IsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDdkIsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzVCLENBQUM7SUFRRCxzQkFBSSwrQ0FBb0I7Ozs7UUFBeEI7WUFDRSxPQUFPLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNuRCxDQUFDOzs7T0FBQTs7Ozs7SUFFRCw4Q0FBc0I7Ozs7SUFBdEIsVUFBdUIsT0FBbUI7UUFDeEMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMzQyxDQUFDOztnQkF6RkYsVUFBVTs7SUEwRlgsb0JBQUM7Q0FBQSxBQTFGRCxJQTBGQztTQS9FWSxhQUFhOzs7Ozs7Ozs7OztJQVF4QixvQ0FBK0Q7Ozs7Ozs7Ozs7SUFTL0QsOEJBQXVCOzs7Ozs7SUEwQ3ZCLHNDQUEwQjs7Ozs7O0lBVzFCLDhDQUErRSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IEVsZW1lbnRSZWYsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuQEluamVjdGFibGUoKVxuXG4vKioqKioqKioqXG4gKiBAY2xhc3MgSWZPcGVuU2VydmljZVxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogQW4gaW5qZWN0YWJsZSBzZXJ2aWNlIHVzZWQgYnkgSWZPcGVuIHN0cnVjdHVyYWwgZGlyZWN0aXZlcyBhbmQgdGhlIGNvbXBvbmVudHMgdGhhdCBpbXBsZW1udCBJZk9wZW4gaW4gdGhlaXJcbiAqIHRlbXBsYXRlcy4gSXQgaG9sZHMgdGhlIHZhbHVlIG9mIHRoZSBvcGVuIHN0YXRlIGFuZCBwcm92aWRlcyBhbiBPYnNlcnZhYmxlIHRoYXQgYm90aCB0aGUgZGlyZWN0aXZlIGFuZCB0aGVcbiAqIGltcGxlbWVudGluZyBjb21wb25lbnQgY2FuIHN1YnNjcmliZSB0byBpbiBvcmRlciB0byB0YWtlIGFjdGlvbiBvbiBvcGVuIHZhbHVlIGNoYW5nZXMuXG4gKlxuICovXG5leHBvcnQgY2xhc3MgSWZPcGVuU2VydmljZSB7XG4gIC8qKioqKioqKlxuICAgKiBAcHJvcGVydHkgX29wZW5DaGFuZ2VcbiAgICpcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIEEgUlhKUyBTdWJqZWN0IHRoYXQgdXBkYXRlcyBhbmQgcHJvdmlkZXMgc3Vic2NyaXB0aW9ucyB0byBmb3IgdGhlIGN1cnJlbnQgb3BlbiBzdGF0ZSBvZiBhIGNvbXBvbmVudCB0ZW1wbGF0ZVxuICAgKiBpbXBsZW10aW5nIHRoZSBJZk9wZW4gc3RydWN0dXJhbCBkaXJlY3RpdmUuXG4gICAqL1xuICBwcml2YXRlIF9vcGVuQ2hhbmdlOiBTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcblxuICAvKioqKioqKioqXG4gICAqIEBwcm9wZXJ0eSBfb3BlblxuICAgKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogQSBwcm9wZXJ0eSBob2xkaW5nIHRoZSBjdXJyZW50IHZhbHVlIGZvciBvcGVuL2Nsb3NlZCBzdGF0ZSBvZiBhbiBJZk9wZW4gc3RydWN0dXJhbCBkaXJlY3RpdmUuXG4gICAqXG4gICAqL1xuICBwcml2YXRlIF9vcGVuOiBib29sZWFuO1xuXG4gIC8qKioqKioqKipcbiAgICpcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIEEgZ2V0dGVyIGZ1bmN0aW9uIHRoYXQgcHJvdmlkZXMgYW4gb2JzZXJ2YWJsZSBmb3IgdGhlIF9vcGVuZWQgU3ViamVjdC5cbiAgICpcbiAgICovXG4gIHB1YmxpYyBnZXQgb3BlbkNoYW5nZSgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5fb3BlbkNoYW5nZS5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIC8qKioqKioqKipcbiAgICpcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIEEgc2V0dGVyIGZ1bmN0aW9uIHRoYXQgdXBkYXRlcyB0aGUgY3VycmVudCBzdGF0ZSBvZiBfb3BlbiBmb3IgdGhpcyBpbnN0YW5jZSBvZiBJZk9wZW4gc3RydWN0dXJhbCBkaXJlY3RpdmUuIEFuZCxcbiAgICogYnJvYWRjYXN0cyB0aGUgbmV3IHZhbHVlIHRvIGFsbCBzdWJzY3JpYmVycy5cbiAgICpcbiAgICogQHBhcmFtIHZhbHVlXG4gICAqL1xuICBwdWJsaWMgc2V0IG9wZW4odmFsdWU6IGJvb2xlYW4pIHtcbiAgICB2YWx1ZSA9ICEhdmFsdWU7XG4gICAgaWYgKHRoaXMuX29wZW4gIT09IHZhbHVlKSB7XG4gICAgICB0aGlzLl9vcGVuID0gdmFsdWU7XG4gICAgICB0aGlzLl9vcGVuQ2hhbmdlLm5leHQodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKioqKioqKipcbiAgICpcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIEEgZ2V0dGVyIHRoYXQgcmV0dXJucyB0aGUgY3VycmVudCB2YWx1ZSBvZiB0aGlzIElmT3BlbiBpbnN0YW5jZS5cbiAgICpcbiAgICovXG4gIHB1YmxpYyBnZXQgb3BlbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fb3BlbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBTb21ldGltZXMsIHdlIG5lZWQgdG8gcmVtZW1iZXIgdGhlIGV2ZW50IHRoYXQgdHJpZ2dlcmVkIHRoZSB0b2dnbGluZyB0byBhdm9pZCBsb29wcy5cbiAgICogVGhpcyBpcyBmb3IgaW5zdGFuY2UgdGhlIGNhc2Ugb2YgY29tcG9uZW50cyB0aGF0IG9wZW4gb24gYSBjbGljaywgYnV0IGNsb3NlIG9uIGEgY2xpY2sgb3V0c2lkZS5cbiAgICovXG4gIHB1YmxpYyBvcmlnaW5hbEV2ZW50OiBhbnk7XG4gIHB1YmxpYyB0b2dnbGVXaXRoRXZlbnQoZXZlbnQ6IGFueSkge1xuICAgIHRoaXMub3JpZ2luYWxFdmVudCA9IGV2ZW50O1xuICAgIHRoaXMub3BlbiA9ICF0aGlzLm9wZW47XG4gICAgZGVsZXRlIHRoaXMub3JpZ2luYWxFdmVudDtcbiAgfVxuXG4gIC8qKlxuICAgKiAgUG9wb3ZlcnMgbWlnaHQgbmVlZCB0byBpZ25vcmUgY2xpY2sgZXZlbnRzIG9uIGFuIGVsZW1lbnRcbiAgICogIChlZzogcG9wb3ZlciBvcGVucyBvbiBmb2N1cyBvbiBhbiBpbnB1dCBmaWVsZC4gQ2xpY2tzIHNob3VsZCBiZSBpZ25vcmVkIGluIHRoaXMgY2FzZSlcbiAgICovXG4gIHByaXZhdGUgX2lnbm9yZWRFbGVtZW50Q2hhbmdlOiBTdWJqZWN0PEVsZW1lbnRSZWY+ID0gbmV3IFN1YmplY3Q8RWxlbWVudFJlZj4oKTtcblxuICBnZXQgaWdub3JlZEVsZW1lbnRDaGFuZ2UoKTogT2JzZXJ2YWJsZTxFbGVtZW50UmVmPiB7XG4gICAgcmV0dXJuIHRoaXMuX2lnbm9yZWRFbGVtZW50Q2hhbmdlLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgcmVnaXN0ZXJJZ25vcmVkRWxlbWVudChlbGVtZW50OiBFbGVtZW50UmVmKSB7XG4gICAgdGhpcy5faWdub3JlZEVsZW1lbnRDaGFuZ2UubmV4dChlbGVtZW50KTtcbiAgfVxufVxuIl19