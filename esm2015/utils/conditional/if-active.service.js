/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Injectable, InjectionToken } from '@angular/core';
import { Subject } from 'rxjs';
/** @type {?} */
let activeCounter = 0;
/** @type {?} */
export const IF_ACTIVE_ID = new InjectionToken('IF_ACTIVE_ID');
/**
 * @return {?}
 */
export function tokenFactory() {
    return ++activeCounter;
}
/** @type {?} */
export const IF_ACTIVE_ID_PROVIDER = {
    provide: IF_ACTIVE_ID,
    useFactory: tokenFactory,
};
/*********
 * @class IfActiveService
 *
 * @description
 * An injectable service used by IfActive structural directives and the components that implement IfActive in their
 * templates. It holds the value of the current state and provides an Observable that both the directive and the
 * implementing component can subscribe to in order to take action on current value changes.
 *
 */
export class IfActiveService {
    constructor() {
        /**
         * *****
         * \@property _currentChange
         *
         * \@description
         * A RXJS Subject that updates and provides subscriptions to for the current current state of a component template
         * implemting the IfActive structural directive.
         *
         */
        this._currentChange = new Subject();
    }
    /**
     * ******
     *
     * \@description
     * A getter function that provides an observable for the _current Subject.
     *
     * @return {?}
     */
    get currentChange() {
        return this._currentChange.asObservable();
    }
    /**
     * ******
     *
     * \@description
     * A setter function that updates the current state of _current for this instance of IfActive structural directive.
     * And, broadcasts the new value to all subscribers.
     *
     * @param {?} value
     * @return {?}
     */
    set current(value) {
        if (this._current !== value) {
            this._current = value;
            this._currentChange.next(value);
        }
    }
    /**
     * ******
     *
     * \@description
     * A getter that returns the current value of this IfActive instance.
     * @return {?}
     */
    get current() {
        return this._current;
    }
}
IfActiveService.decorators = [
    { type: Injectable }
];
if (false) {
    /**
     * *****
     * \@property _currentChange
     *
     * \@description
     * A RXJS Subject that updates and provides subscriptions to for the current current state of a component template
     * implemting the IfActive structural directive.
     *
     * @type {?}
     * @private
     */
    IfActiveService.prototype._currentChange;
    /**
     * ******
     * \@property _current
     *
     * \@description
     * A property holding the current value for current/closed state of an IfActive structural directive.
     * @type {?}
     * @private
     */
    IfActiveService.prototype._current;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWYtYWN0aXZlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJ1dGlscy9jb25kaXRpb25hbC9pZi1hY3RpdmUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFLQSxPQUFPLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDOztJQUUzQixhQUFhLEdBQUcsQ0FBQzs7QUFFckIsTUFBTSxPQUFPLFlBQVksR0FBRyxJQUFJLGNBQWMsQ0FBUyxjQUFjLENBQUM7Ozs7QUFFdEUsTUFBTSxVQUFVLFlBQVk7SUFDMUIsT0FBTyxFQUFFLGFBQWEsQ0FBQztBQUN6QixDQUFDOztBQUVELE1BQU0sT0FBTyxxQkFBcUIsR0FBRztJQUNuQyxPQUFPLEVBQUUsWUFBWTtJQUNyQixVQUFVLEVBQUUsWUFBWTtDQUN6QjtBQUlEOzs7Ozs7OztHQVFHO0FBQ0gsTUFBTSxPQUFPLGVBQWU7SUFYNUI7Ozs7Ozs7Ozs7UUFvQlUsbUJBQWMsR0FBb0IsSUFBSSxPQUFPLEVBQVUsQ0FBQztJQTRDbEUsQ0FBQzs7Ozs7Ozs7O0lBNUJDLElBQVcsYUFBYTtRQUN0QixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDNUMsQ0FBQzs7Ozs7Ozs7Ozs7SUFVRCxJQUFXLE9BQU8sQ0FBQyxLQUFhO1FBQzlCLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxLQUFLLEVBQUU7WUFDM0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDdEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDakM7SUFDSCxDQUFDOzs7Ozs7OztJQVFELElBQVcsT0FBTztRQUNoQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQzs7O1lBL0RGLFVBQVU7Ozs7Ozs7Ozs7Ozs7O0lBb0JULHlDQUFnRTs7Ozs7Ozs7OztJQVFoRSxtQ0FBeUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3Rpb25Ub2tlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5sZXQgYWN0aXZlQ291bnRlciA9IDA7XG5cbmV4cG9ydCBjb25zdCBJRl9BQ1RJVkVfSUQgPSBuZXcgSW5qZWN0aW9uVG9rZW48bnVtYmVyPignSUZfQUNUSVZFX0lEJyk7XG5cbmV4cG9ydCBmdW5jdGlvbiB0b2tlbkZhY3RvcnkoKSB7XG4gIHJldHVybiArK2FjdGl2ZUNvdW50ZXI7XG59XG5cbmV4cG9ydCBjb25zdCBJRl9BQ1RJVkVfSURfUFJPVklERVIgPSB7XG4gIHByb3ZpZGU6IElGX0FDVElWRV9JRCxcbiAgdXNlRmFjdG9yeTogdG9rZW5GYWN0b3J5LFxufTtcblxuQEluamVjdGFibGUoKVxuXG4vKioqKioqKioqXG4gKiBAY2xhc3MgSWZBY3RpdmVTZXJ2aWNlXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBBbiBpbmplY3RhYmxlIHNlcnZpY2UgdXNlZCBieSBJZkFjdGl2ZSBzdHJ1Y3R1cmFsIGRpcmVjdGl2ZXMgYW5kIHRoZSBjb21wb25lbnRzIHRoYXQgaW1wbGVtZW50IElmQWN0aXZlIGluIHRoZWlyXG4gKiB0ZW1wbGF0ZXMuIEl0IGhvbGRzIHRoZSB2YWx1ZSBvZiB0aGUgY3VycmVudCBzdGF0ZSBhbmQgcHJvdmlkZXMgYW4gT2JzZXJ2YWJsZSB0aGF0IGJvdGggdGhlIGRpcmVjdGl2ZSBhbmQgdGhlXG4gKiBpbXBsZW1lbnRpbmcgY29tcG9uZW50IGNhbiBzdWJzY3JpYmUgdG8gaW4gb3JkZXIgdG8gdGFrZSBhY3Rpb24gb24gY3VycmVudCB2YWx1ZSBjaGFuZ2VzLlxuICpcbiAqL1xuZXhwb3J0IGNsYXNzIElmQWN0aXZlU2VydmljZSB7XG4gIC8qKioqKioqKlxuICAgKiBAcHJvcGVydHkgX2N1cnJlbnRDaGFuZ2VcbiAgICpcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIEEgUlhKUyBTdWJqZWN0IHRoYXQgdXBkYXRlcyBhbmQgcHJvdmlkZXMgc3Vic2NyaXB0aW9ucyB0byBmb3IgdGhlIGN1cnJlbnQgY3VycmVudCBzdGF0ZSBvZiBhIGNvbXBvbmVudCB0ZW1wbGF0ZVxuICAgKiBpbXBsZW10aW5nIHRoZSBJZkFjdGl2ZSBzdHJ1Y3R1cmFsIGRpcmVjdGl2ZS5cbiAgICpcbiAgICovXG4gIHByaXZhdGUgX2N1cnJlbnRDaGFuZ2U6IFN1YmplY3Q8bnVtYmVyPiA9IG5ldyBTdWJqZWN0PG51bWJlcj4oKTtcblxuICAvKioqKioqKioqXG4gICAqIEBwcm9wZXJ0eSBfY3VycmVudFxuICAgKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogQSBwcm9wZXJ0eSBob2xkaW5nIHRoZSBjdXJyZW50IHZhbHVlIGZvciBjdXJyZW50L2Nsb3NlZCBzdGF0ZSBvZiBhbiBJZkFjdGl2ZSBzdHJ1Y3R1cmFsIGRpcmVjdGl2ZS5cbiAgICovXG4gIHByaXZhdGUgX2N1cnJlbnQ6IG51bWJlcjtcblxuICAvKioqKioqKioqXG4gICAqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBBIGdldHRlciBmdW5jdGlvbiB0aGF0IHByb3ZpZGVzIGFuIG9ic2VydmFibGUgZm9yIHRoZSBfY3VycmVudCBTdWJqZWN0LlxuICAgKlxuICAgKi9cbiAgcHVibGljIGdldCBjdXJyZW50Q2hhbmdlKCk6IE9ic2VydmFibGU8bnVtYmVyPiB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRDaGFuZ2UuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICAvKioqKioqKioqXG4gICAqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBBIHNldHRlciBmdW5jdGlvbiB0aGF0IHVwZGF0ZXMgdGhlIGN1cnJlbnQgc3RhdGUgb2YgX2N1cnJlbnQgZm9yIHRoaXMgaW5zdGFuY2Ugb2YgSWZBY3RpdmUgc3RydWN0dXJhbCBkaXJlY3RpdmUuXG4gICAqIEFuZCwgYnJvYWRjYXN0cyB0aGUgbmV3IHZhbHVlIHRvIGFsbCBzdWJzY3JpYmVycy5cbiAgICpcbiAgICogQHBhcmFtIHZhbHVlXG4gICAqL1xuICBwdWJsaWMgc2V0IGN1cnJlbnQodmFsdWU6IG51bWJlcikge1xuICAgIGlmICh0aGlzLl9jdXJyZW50ICE9PSB2YWx1ZSkge1xuICAgICAgdGhpcy5fY3VycmVudCA9IHZhbHVlO1xuICAgICAgdGhpcy5fY3VycmVudENoYW5nZS5uZXh0KHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICAvKioqKioqKioqXG4gICAqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBBIGdldHRlciB0aGF0IHJldHVybnMgdGhlIGN1cnJlbnQgdmFsdWUgb2YgdGhpcyBJZkFjdGl2ZSBpbnN0YW5jZS5cbiAgICogQHJldHVybnNcbiAgICovXG4gIHB1YmxpYyBnZXQgY3VycmVudCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50O1xuICB9XG59XG4iXX0=