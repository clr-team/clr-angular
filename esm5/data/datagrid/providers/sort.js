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
var Sort = /** @class */ (function () {
    function Sort(stateDebouncer) {
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
    Object.defineProperty(Sort.prototype, "comparator", {
        get: /**
         * @return {?}
         */
        function () {
            return this._comparator;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.stateDebouncer.changeStart();
            this._comparator = value;
            this.emitChange();
            this.stateDebouncer.changeDone();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sort.prototype, "reverse", {
        get: /**
         * @return {?}
         */
        function () {
            return this._reverse;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.stateDebouncer.changeStart();
            this._reverse = value;
            this.emitChange();
            this.stateDebouncer.changeDone();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @return {?}
     */
    Sort.prototype.emitChange = /**
     * @private
     * @return {?}
     */
    function () {
        this._change.next(this);
    };
    Object.defineProperty(Sort.prototype, "change", {
        // We do not want to expose the Subject itself, but the Observable which is read-only
        get: 
        // We do not want to expose the Subject itself, but the Observable which is read-only
        /**
         * @return {?}
         */
        function () {
            return this._change.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Sets a comparator as the current one, or toggles reverse if the comparator is already used. The
     * optional forceReverse input parameter allows to override that toggling behavior by sorting in
     * reverse order if `true`.
     *
     * @memberof Sort
     */
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
    Sort.prototype.toggle = /**
     * Sets a comparator as the current one, or toggles reverse if the comparator is already used. The
     * optional forceReverse input parameter allows to override that toggling behavior by sorting in
     * reverse order if `true`.
     *
     * \@memberof Sort
     * @param {?} sortBy
     * @param {?=} forceReverse
     * @return {?}
     */
    function (sortBy, forceReverse) {
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
    };
    /**
     * Clears the current sorting order
     */
    /**
     * Clears the current sorting order
     * @return {?}
     */
    Sort.prototype.clear = /**
     * Clears the current sorting order
     * @return {?}
     */
    function () {
        this.comparator = null;
    };
    /**
     * Compares two objects according to the current comparator
     */
    /**
     * Compares two objects according to the current comparator
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    Sort.prototype.compare = /**
     * Compares two objects according to the current comparator
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    function (a, b) {
        return (this.reverse ? -1 : 1) * this.comparator.compare(a, b);
    };
    Sort.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Sort.ctorParameters = function () { return [
        { type: StateDebouncer }
    ]; };
    return Sort;
}());
export { Sort };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvcHJvdmlkZXJzL3NvcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRy9CLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7OztBQUU1RDtJQUVFLGNBQW9CLGNBQThCO1FBQTlCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjs7OztRQW1CMUMsYUFBUSxHQUFZLEtBQUssQ0FBQzs7OztRQWMxQixZQUFPLEdBQUcsSUFBSSxPQUFPLEVBQVcsQ0FBQztJQWpDWSxDQUFDO0lBTXRELHNCQUFXLDRCQUFVOzs7O1FBQXJCO1lBQ0UsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQzFCLENBQUM7Ozs7O1FBQ0QsVUFBc0IsS0FBd0M7WUFDNUQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNsQyxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztZQUN6QixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDbEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNuQyxDQUFDOzs7T0FOQTtJQVlELHNCQUFXLHlCQUFPOzs7O1FBQWxCO1lBQ0UsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3ZCLENBQUM7Ozs7O1FBQ0QsVUFBbUIsS0FBYztZQUMvQixJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ2xDLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNsQixJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ25DLENBQUM7OztPQU5BOzs7OztJQVlPLHlCQUFVOzs7O0lBQWxCO1FBQ0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUVELHNCQUFXLHdCQUFNO1FBRGpCLHFGQUFxRjs7Ozs7O1FBQ3JGO1lBQ0UsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3JDLENBQUM7OztPQUFBO0lBRUQ7Ozs7OztPQU1HOzs7Ozs7Ozs7OztJQUNJLHFCQUFNOzs7Ozs7Ozs7O0lBQWIsVUFBYyxNQUF5QyxFQUFFLFlBQXNCO1FBQzdFLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbEMsbUVBQW1FO1FBQ25FLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxNQUFNLEVBQUU7WUFDOUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLFlBQVksS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLFlBQVksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztTQUN2RzthQUFNO1lBQ0wsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUM7WUFDMUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLFlBQVksS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1NBQzVFO1FBQ0QsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDbkMsQ0FBQztJQUVEOztPQUVHOzs7OztJQUNJLG9CQUFLOzs7O0lBQVo7UUFDRSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztJQUN6QixDQUFDO0lBRUQ7O09BRUc7Ozs7Ozs7SUFDSSxzQkFBTzs7Ozs7O0lBQWQsVUFBZSxDQUFJLEVBQUUsQ0FBSTtRQUN2QixPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNqRSxDQUFDOztnQkE1RUYsVUFBVTs7OztnQkFGRixjQUFjOztJQStFdkIsV0FBQztDQUFBLEFBN0VELElBNkVDO1NBNUVZLElBQUk7Ozs7Ozs7SUFNZiwyQkFBdUQ7Ozs7OztJQWN2RCx3QkFBa0M7Ozs7OztJQWNsQyx1QkFBeUM7Ozs7O0lBakM3Qiw4QkFBc0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IENsckRhdGFncmlkQ29tcGFyYXRvckludGVyZmFjZSB9IGZyb20gJy4uL2ludGVyZmFjZXMvY29tcGFyYXRvci5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgU3RhdGVEZWJvdW5jZXIgfSBmcm9tICcuL3N0YXRlLWRlYm91bmNlci5wcm92aWRlcic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTb3J0PFQgPSBhbnk+IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzdGF0ZURlYm91bmNlcjogU3RhdGVEZWJvdW5jZXIpIHt9XG5cbiAgLyoqXG4gICAqIEN1cnJlbnRseSBhY3RpdmUgY29tcGFyYXRvclxuICAgKi9cbiAgcHJpdmF0ZSBfY29tcGFyYXRvcjogQ2xyRGF0YWdyaWRDb21wYXJhdG9ySW50ZXJmYWNlPFQ+O1xuICBwdWJsaWMgZ2V0IGNvbXBhcmF0b3IoKTogQ2xyRGF0YWdyaWRDb21wYXJhdG9ySW50ZXJmYWNlPFQ+IHtcbiAgICByZXR1cm4gdGhpcy5fY29tcGFyYXRvcjtcbiAgfVxuICBwdWJsaWMgc2V0IGNvbXBhcmF0b3IodmFsdWU6IENsckRhdGFncmlkQ29tcGFyYXRvckludGVyZmFjZTxUPikge1xuICAgIHRoaXMuc3RhdGVEZWJvdW5jZXIuY2hhbmdlU3RhcnQoKTtcbiAgICB0aGlzLl9jb21wYXJhdG9yID0gdmFsdWU7XG4gICAgdGhpcy5lbWl0Q2hhbmdlKCk7XG4gICAgdGhpcy5zdGF0ZURlYm91bmNlci5jaGFuZ2VEb25lKCk7XG4gIH1cblxuICAvKipcbiAgICogQXNjZW5kaW5nIG9yZGVyIGlmIGZhbHNlLCBkZXNjZW5kaW5nIGlmIHRydWVcbiAgICovXG4gIHByaXZhdGUgX3JldmVyc2U6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHVibGljIGdldCByZXZlcnNlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9yZXZlcnNlO1xuICB9XG4gIHB1YmxpYyBzZXQgcmV2ZXJzZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuc3RhdGVEZWJvdW5jZXIuY2hhbmdlU3RhcnQoKTtcbiAgICB0aGlzLl9yZXZlcnNlID0gdmFsdWU7XG4gICAgdGhpcy5lbWl0Q2hhbmdlKCk7XG4gICAgdGhpcy5zdGF0ZURlYm91bmNlci5jaGFuZ2VEb25lKCk7XG4gIH1cblxuICAvKipcbiAgICogVGhlIE9ic2VydmFibGUgdGhhdCBsZXRzIG90aGVyIGNsYXNzZXMgc3Vic2NyaWJlIHRvIHNvcnQgY2hhbmdlc1xuICAgKi9cbiAgcHJpdmF0ZSBfY2hhbmdlID0gbmV3IFN1YmplY3Q8U29ydDxUPj4oKTtcbiAgcHJpdmF0ZSBlbWl0Q2hhbmdlKCkge1xuICAgIHRoaXMuX2NoYW5nZS5uZXh0KHRoaXMpO1xuICB9XG4gIC8vIFdlIGRvIG5vdCB3YW50IHRvIGV4cG9zZSB0aGUgU3ViamVjdCBpdHNlbGYsIGJ1dCB0aGUgT2JzZXJ2YWJsZSB3aGljaCBpcyByZWFkLW9ubHlcbiAgcHVibGljIGdldCBjaGFuZ2UoKTogT2JzZXJ2YWJsZTxTb3J0PFQ+PiB7XG4gICAgcmV0dXJuIHRoaXMuX2NoYW5nZS5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIGEgY29tcGFyYXRvciBhcyB0aGUgY3VycmVudCBvbmUsIG9yIHRvZ2dsZXMgcmV2ZXJzZSBpZiB0aGUgY29tcGFyYXRvciBpcyBhbHJlYWR5IHVzZWQuIFRoZVxuICAgKiBvcHRpb25hbCBmb3JjZVJldmVyc2UgaW5wdXQgcGFyYW1ldGVyIGFsbG93cyB0byBvdmVycmlkZSB0aGF0IHRvZ2dsaW5nIGJlaGF2aW9yIGJ5IHNvcnRpbmcgaW5cbiAgICogcmV2ZXJzZSBvcmRlciBpZiBgdHJ1ZWAuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBTb3J0XG4gICAqL1xuICBwdWJsaWMgdG9nZ2xlKHNvcnRCeTogQ2xyRGF0YWdyaWRDb21wYXJhdG9ySW50ZXJmYWNlPFQ+LCBmb3JjZVJldmVyc2U/OiBib29sZWFuKSB7XG4gICAgdGhpcy5zdGF0ZURlYm91bmNlci5jaGFuZ2VTdGFydCgpO1xuICAgIC8vIFdlIG1vZGlmeSBwcml2YXRlIHByb3BlcnRpZXMgZGlyZWN0bHksIHRvIGJhdGNoIHRoZSBjaGFuZ2UgZXZlbnRcbiAgICBpZiAodGhpcy5jb21wYXJhdG9yID09PSBzb3J0QnkpIHtcbiAgICAgIHRoaXMuX3JldmVyc2UgPSB0eXBlb2YgZm9yY2VSZXZlcnNlICE9PSAndW5kZWZpbmVkJyA/IGZvcmNlUmV2ZXJzZSB8fCAhdGhpcy5fcmV2ZXJzZSA6ICF0aGlzLl9yZXZlcnNlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9jb21wYXJhdG9yID0gc29ydEJ5O1xuICAgICAgdGhpcy5fcmV2ZXJzZSA9IHR5cGVvZiBmb3JjZVJldmVyc2UgIT09ICd1bmRlZmluZWQnID8gZm9yY2VSZXZlcnNlIDogZmFsc2U7XG4gICAgfVxuICAgIHRoaXMuZW1pdENoYW5nZSgpO1xuICAgIHRoaXMuc3RhdGVEZWJvdW5jZXIuY2hhbmdlRG9uZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFycyB0aGUgY3VycmVudCBzb3J0aW5nIG9yZGVyXG4gICAqL1xuICBwdWJsaWMgY2xlYXIoKSB7XG4gICAgdGhpcy5jb21wYXJhdG9yID0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb21wYXJlcyB0d28gb2JqZWN0cyBhY2NvcmRpbmcgdG8gdGhlIGN1cnJlbnQgY29tcGFyYXRvclxuICAgKi9cbiAgcHVibGljIGNvbXBhcmUoYTogVCwgYjogVCk6IG51bWJlciB7XG4gICAgcmV0dXJuICh0aGlzLnJldmVyc2UgPyAtMSA6IDEpICogdGhpcy5jb21wYXJhdG9yLmNvbXBhcmUoYSwgYik7XG4gIH1cbn1cbiJdfQ==