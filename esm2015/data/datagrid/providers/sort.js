/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { StateDebouncer } from './state-debouncer.provider';
/**
 * @template T
 */
export class Sort {
    /**
     * @param {?} stateDebouncer
     */
    constructor(stateDebouncer) {
        this.stateDebouncer = stateDebouncer;
        /**
         * Ascending order if false, descending if true
         */
        this._reverse = false;
        /**
         * The Observable that lets other classes subscribe to sort changes
         */
        this._change = new Subject();
    }
    /**
     * @return {?}
     */
    get comparator() {
        return this._comparator;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set comparator(value) {
        this.stateDebouncer.changeStart();
        this._comparator = value;
        this.emitChange();
        this.stateDebouncer.changeDone();
    }
    /**
     * @return {?}
     */
    get reverse() {
        return this._reverse;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set reverse(value) {
        this.stateDebouncer.changeStart();
        this._reverse = value;
        this.emitChange();
        this.stateDebouncer.changeDone();
    }
    /**
     * @private
     * @return {?}
     */
    emitChange() {
        this._change.next(this);
    }
    // We do not want to expose the Subject itself, but the Observable which is read-only
    /**
     * @return {?}
     */
    get change() {
        return this._change.asObservable();
    }
    /**
     * Sets a comparator as the current one, or toggles reverse if the comparator is already used. The
     * optional forceReverse input parameter allows to override that toggling behavior by sorting in
     * reverse order if `true`.
     *
     * \@memberof Sort
     * @param {?} sortBy
     * @param {?=} forceReverse
     * @return {?}
     */
    toggle(sortBy, forceReverse) {
        this.stateDebouncer.changeStart();
        // We modify private properties directly, to batch the change event
        if (this.comparator === sortBy) {
            this._reverse = typeof forceReverse !== 'undefined' ? forceReverse || !this._reverse : !this._reverse;
        }
        else {
            this._comparator = sortBy;
            this._reverse = typeof forceReverse !== 'undefined' ? forceReverse : false;
        }
        this.emitChange();
        this.stateDebouncer.changeDone();
    }
    /**
     * Clears the current sorting order
     * @return {?}
     */
    clear() {
        this.comparator = null;
    }
    /**
     * Compares two objects according to the current comparator
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    compare(a, b) {
        return (this.reverse ? -1 : 1) * this.comparator.compare(a, b);
    }
}
Sort.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Sort.ctorParameters = () => [
    { type: StateDebouncer }
];
if (false) {
    /**
     * Currently active comparator
     * @type {?}
     * @private
     */
    Sort.prototype._comparator;
    /**
     * Ascending order if false, descending if true
     * @type {?}
     * @private
     */
    Sort.prototype._reverse;
    /**
     * The Observable that lets other classes subscribe to sort changes
     * @type {?}
     * @private
     */
    Sort.prototype._change;
    /**
     * @type {?}
     * @private
     */
    Sort.prototype.stateDebouncer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvcHJvdmlkZXJzL3NvcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRy9CLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7OztBQUc1RCxNQUFNLE9BQU8sSUFBSTs7OztJQUNmLFlBQW9CLGNBQThCO1FBQTlCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjs7OztRQW1CMUMsYUFBUSxHQUFZLEtBQUssQ0FBQzs7OztRQWMxQixZQUFPLEdBQUcsSUFBSSxPQUFPLEVBQVcsQ0FBQztJQWpDWSxDQUFDOzs7O0lBTXRELElBQVcsVUFBVTtRQUNuQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDMUIsQ0FBQzs7Ozs7SUFDRCxJQUFXLFVBQVUsQ0FBQyxLQUF3QztRQUM1RCxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ25DLENBQUM7Ozs7SUFNRCxJQUFXLE9BQU87UUFDaEIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7Ozs7O0lBQ0QsSUFBVyxPQUFPLENBQUMsS0FBYztRQUMvQixJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ25DLENBQUM7Ozs7O0lBTU8sVUFBVTtRQUNoQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxQixDQUFDOzs7OztJQUVELElBQVcsTUFBTTtRQUNmLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUNyQyxDQUFDOzs7Ozs7Ozs7OztJQVNNLE1BQU0sQ0FBQyxNQUF5QyxFQUFFLFlBQXNCO1FBQzdFLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbEMsbUVBQW1FO1FBQ25FLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxNQUFNLEVBQUU7WUFDOUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLFlBQVksS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLFlBQVksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztTQUN2RzthQUFNO1lBQ0wsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUM7WUFDMUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLFlBQVksS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1NBQzVFO1FBQ0QsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDbkMsQ0FBQzs7Ozs7SUFLTSxLQUFLO1FBQ1YsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7SUFDekIsQ0FBQzs7Ozs7OztJQUtNLE9BQU8sQ0FBQyxDQUFJLEVBQUUsQ0FBSTtRQUN2QixPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNqRSxDQUFDOzs7WUE1RUYsVUFBVTs7OztZQUZGLGNBQWM7Ozs7Ozs7O0lBU3JCLDJCQUF1RDs7Ozs7O0lBY3ZELHdCQUFrQzs7Ozs7O0lBY2xDLHVCQUF5Qzs7Ozs7SUFqQzdCLDhCQUFzQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgQ2xyRGF0YWdyaWRDb21wYXJhdG9ySW50ZXJmYWNlIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9jb21wYXJhdG9yLmludGVyZmFjZSc7XG5pbXBvcnQgeyBTdGF0ZURlYm91bmNlciB9IGZyb20gJy4vc3RhdGUtZGVib3VuY2VyLnByb3ZpZGVyJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNvcnQ8VCA9IGFueT4ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHN0YXRlRGVib3VuY2VyOiBTdGF0ZURlYm91bmNlcikge31cblxuICAvKipcbiAgICogQ3VycmVudGx5IGFjdGl2ZSBjb21wYXJhdG9yXG4gICAqL1xuICBwcml2YXRlIF9jb21wYXJhdG9yOiBDbHJEYXRhZ3JpZENvbXBhcmF0b3JJbnRlcmZhY2U8VD47XG4gIHB1YmxpYyBnZXQgY29tcGFyYXRvcigpOiBDbHJEYXRhZ3JpZENvbXBhcmF0b3JJbnRlcmZhY2U8VD4ge1xuICAgIHJldHVybiB0aGlzLl9jb21wYXJhdG9yO1xuICB9XG4gIHB1YmxpYyBzZXQgY29tcGFyYXRvcih2YWx1ZTogQ2xyRGF0YWdyaWRDb21wYXJhdG9ySW50ZXJmYWNlPFQ+KSB7XG4gICAgdGhpcy5zdGF0ZURlYm91bmNlci5jaGFuZ2VTdGFydCgpO1xuICAgIHRoaXMuX2NvbXBhcmF0b3IgPSB2YWx1ZTtcbiAgICB0aGlzLmVtaXRDaGFuZ2UoKTtcbiAgICB0aGlzLnN0YXRlRGVib3VuY2VyLmNoYW5nZURvbmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBc2NlbmRpbmcgb3JkZXIgaWYgZmFsc2UsIGRlc2NlbmRpbmcgaWYgdHJ1ZVxuICAgKi9cbiAgcHJpdmF0ZSBfcmV2ZXJzZTogYm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMgZ2V0IHJldmVyc2UoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3JldmVyc2U7XG4gIH1cbiAgcHVibGljIHNldCByZXZlcnNlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5zdGF0ZURlYm91bmNlci5jaGFuZ2VTdGFydCgpO1xuICAgIHRoaXMuX3JldmVyc2UgPSB2YWx1ZTtcbiAgICB0aGlzLmVtaXRDaGFuZ2UoKTtcbiAgICB0aGlzLnN0YXRlRGVib3VuY2VyLmNoYW5nZURvbmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgT2JzZXJ2YWJsZSB0aGF0IGxldHMgb3RoZXIgY2xhc3NlcyBzdWJzY3JpYmUgdG8gc29ydCBjaGFuZ2VzXG4gICAqL1xuICBwcml2YXRlIF9jaGFuZ2UgPSBuZXcgU3ViamVjdDxTb3J0PFQ+PigpO1xuICBwcml2YXRlIGVtaXRDaGFuZ2UoKSB7XG4gICAgdGhpcy5fY2hhbmdlLm5leHQodGhpcyk7XG4gIH1cbiAgLy8gV2UgZG8gbm90IHdhbnQgdG8gZXhwb3NlIHRoZSBTdWJqZWN0IGl0c2VsZiwgYnV0IHRoZSBPYnNlcnZhYmxlIHdoaWNoIGlzIHJlYWQtb25seVxuICBwdWJsaWMgZ2V0IGNoYW5nZSgpOiBPYnNlcnZhYmxlPFNvcnQ8VD4+IHtcbiAgICByZXR1cm4gdGhpcy5fY2hhbmdlLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgYSBjb21wYXJhdG9yIGFzIHRoZSBjdXJyZW50IG9uZSwgb3IgdG9nZ2xlcyByZXZlcnNlIGlmIHRoZSBjb21wYXJhdG9yIGlzIGFscmVhZHkgdXNlZC4gVGhlXG4gICAqIG9wdGlvbmFsIGZvcmNlUmV2ZXJzZSBpbnB1dCBwYXJhbWV0ZXIgYWxsb3dzIHRvIG92ZXJyaWRlIHRoYXQgdG9nZ2xpbmcgYmVoYXZpb3IgYnkgc29ydGluZyBpblxuICAgKiByZXZlcnNlIG9yZGVyIGlmIGB0cnVlYC5cbiAgICpcbiAgICogQG1lbWJlcm9mIFNvcnRcbiAgICovXG4gIHB1YmxpYyB0b2dnbGUoc29ydEJ5OiBDbHJEYXRhZ3JpZENvbXBhcmF0b3JJbnRlcmZhY2U8VD4sIGZvcmNlUmV2ZXJzZT86IGJvb2xlYW4pIHtcbiAgICB0aGlzLnN0YXRlRGVib3VuY2VyLmNoYW5nZVN0YXJ0KCk7XG4gICAgLy8gV2UgbW9kaWZ5IHByaXZhdGUgcHJvcGVydGllcyBkaXJlY3RseSwgdG8gYmF0Y2ggdGhlIGNoYW5nZSBldmVudFxuICAgIGlmICh0aGlzLmNvbXBhcmF0b3IgPT09IHNvcnRCeSkge1xuICAgICAgdGhpcy5fcmV2ZXJzZSA9IHR5cGVvZiBmb3JjZVJldmVyc2UgIT09ICd1bmRlZmluZWQnID8gZm9yY2VSZXZlcnNlIHx8ICF0aGlzLl9yZXZlcnNlIDogIXRoaXMuX3JldmVyc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2NvbXBhcmF0b3IgPSBzb3J0Qnk7XG4gICAgICB0aGlzLl9yZXZlcnNlID0gdHlwZW9mIGZvcmNlUmV2ZXJzZSAhPT0gJ3VuZGVmaW5lZCcgPyBmb3JjZVJldmVyc2UgOiBmYWxzZTtcbiAgICB9XG4gICAgdGhpcy5lbWl0Q2hhbmdlKCk7XG4gICAgdGhpcy5zdGF0ZURlYm91bmNlci5jaGFuZ2VEb25lKCk7XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXJzIHRoZSBjdXJyZW50IHNvcnRpbmcgb3JkZXJcbiAgICovXG4gIHB1YmxpYyBjbGVhcigpIHtcbiAgICB0aGlzLmNvbXBhcmF0b3IgPSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbXBhcmVzIHR3byBvYmplY3RzIGFjY29yZGluZyB0byB0aGUgY3VycmVudCBjb21wYXJhdG9yXG4gICAqL1xuICBwdWJsaWMgY29tcGFyZShhOiBULCBiOiBUKTogbnVtYmVyIHtcbiAgICByZXR1cm4gKHRoaXMucmV2ZXJzZSA/IC0xIDogMSkgKiB0aGlzLmNvbXBhcmF0b3IuY29tcGFyZShhLCBiKTtcbiAgfVxufVxuIl19