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
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Page } from './page';
import { StateDebouncer } from './state-debouncer.provider';
/**
 * @template T
 */
var FiltersProvider = /** @class */ (function () {
    function FiltersProvider(_page, stateDebouncer) {
        this._page = _page;
        this.stateDebouncer = stateDebouncer;
        /**
         * This subject is the list of filters that changed last, not the whole list.
         * We emit a list rather than just one filter to allow batch changes to several at once.
         */
        this._change = new Subject();
        /**
         * List of all filters, whether they're active or not
         */
        this._all = [];
    }
    Object.defineProperty(FiltersProvider.prototype, "change", {
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
     * Tests if at least one filter is currently active
     */
    /**
     * Tests if at least one filter is currently active
     * @return {?}
     */
    FiltersProvider.prototype.hasActiveFilters = /**
     * Tests if at least one filter is currently active
     * @return {?}
     */
    function () {
        var e_1, _a;
        try {
            // We do not use getActiveFilters() because this function will be called much more often
            // and stopping the loop early might be relevant.
            for (var _b = tslib_1.__values(this._all), _c = _b.next(); !_c.done; _c = _b.next()) {
                var filter = _c.value.filter;
                if (filter && filter.isActive()) {
                    return true;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return false;
    };
    /**
     * Returns a list of all currently active filters
     */
    /**
     * Returns a list of all currently active filters
     * @return {?}
     */
    FiltersProvider.prototype.getActiveFilters = /**
     * Returns a list of all currently active filters
     * @return {?}
     */
    function () {
        var e_2, _a;
        /** @type {?} */
        var ret = [];
        try {
            for (var _b = tslib_1.__values(this._all), _c = _b.next(); !_c.done; _c = _b.next()) {
                var filter = _c.value.filter;
                if (filter && filter.isActive()) {
                    ret.push(filter);
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return ret;
    };
    /**
     * Registers a filter, and returns a deregistration function
     */
    /**
     * Registers a filter, and returns a deregistration function
     * @template F
     * @param {?} filter
     * @return {?}
     */
    FiltersProvider.prototype.add = /**
     * Registers a filter, and returns a deregistration function
     * @template F
     * @param {?} filter
     * @return {?}
     */
    function (filter) {
        var _this = this;
        /** @type {?} */
        var index = this._all.length;
        /** @type {?} */
        var subscription = filter.changes.subscribe((/**
         * @return {?}
         */
        function () { return _this.resetPageAndEmitFilterChange([filter]); }));
        /** @type {?} */
        var hasUnregistered = false;
        /** @type {?} */
        var registered = new RegisteredFilter(filter, (/**
         * @return {?}
         */
        function () {
            if (hasUnregistered) {
                return;
            }
            subscription.unsubscribe();
            _this._all.splice(index, 1);
            if (filter.isActive()) {
                _this.resetPageAndEmitFilterChange([]);
            }
            hasUnregistered = true;
        }));
        this._all.push(registered);
        if (filter.isActive()) {
            this.resetPageAndEmitFilterChange([filter]);
        }
        return registered;
    };
    /**
     * Accepts an item if it is accepted by all currently active filters
     */
    /**
     * Accepts an item if it is accepted by all currently active filters
     * @param {?} item
     * @return {?}
     */
    FiltersProvider.prototype.accepts = /**
     * Accepts an item if it is accepted by all currently active filters
     * @param {?} item
     * @return {?}
     */
    function (item) {
        var e_3, _a;
        try {
            for (var _b = tslib_1.__values(this._all), _c = _b.next(); !_c.done; _c = _b.next()) {
                var filter = _c.value.filter;
                if (filter && filter.isActive() && !filter.accepts(item)) {
                    return false;
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return true;
    };
    /**
     * @private
     * @param {?} filters
     * @return {?}
     */
    FiltersProvider.prototype.resetPageAndEmitFilterChange = /**
     * @private
     * @param {?} filters
     * @return {?}
     */
    function (filters) {
        this.stateDebouncer.changeStart();
        // filtering may change the page number such that current page number doesn't exist in the filtered dataset.
        // So here we always set the current page to 1 so that it'll fetch first page's data with the given filter.
        this._page.current = 1;
        this._change.next(filters);
        this.stateDebouncer.changeDone();
    };
    FiltersProvider.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    FiltersProvider.ctorParameters = function () { return [
        { type: Page },
        { type: StateDebouncer }
    ]; };
    return FiltersProvider;
}());
export { FiltersProvider };
if (false) {
    /**
     * This subject is the list of filters that changed last, not the whole list.
     * We emit a list rather than just one filter to allow batch changes to several at once.
     * @type {?}
     * @private
     */
    FiltersProvider.prototype._change;
    /**
     * List of all filters, whether they're active or not
     * @type {?}
     * @private
     */
    FiltersProvider.prototype._all;
    /**
     * @type {?}
     * @private
     */
    FiltersProvider.prototype._page;
    /**
     * @type {?}
     * @private
     */
    FiltersProvider.prototype.stateDebouncer;
}
/**
 * @template T, F
 */
var /**
 * @template T, F
 */
RegisteredFilter = /** @class */ (function () {
    function RegisteredFilter(filter, unregister) {
        this.filter = filter;
        this.unregister = unregister;
    }
    return RegisteredFilter;
}());
/**
 * @template T, F
 */
export { RegisteredFilter };
if (false) {
    /** @type {?} */
    RegisteredFilter.prototype.filter;
    /** @type {?} */
    RegisteredFilter.prototype.unregister;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVycy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvcHJvdmlkZXJzL2ZpbHRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUtBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUcvQixPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQzlCLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7OztBQUU1RDtJQUVFLHlCQUFvQixLQUFXLEVBQVUsY0FBOEI7UUFBbkQsVUFBSyxHQUFMLEtBQUssQ0FBTTtRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjs7Ozs7UUFLL0QsWUFBTyxHQUFHLElBQUksT0FBTyxFQUFtQyxDQUFDOzs7O1FBU3pELFNBQUksR0FBeUQsRUFBRSxDQUFDO0lBZEUsQ0FBQztJQU8zRSxzQkFBVyxtQ0FBTTtRQURqQixxRkFBcUY7Ozs7OztRQUNyRjtZQUNFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNyQyxDQUFDOzs7T0FBQTtJQU9EOztPQUVHOzs7OztJQUNJLDBDQUFnQjs7OztJQUF2Qjs7O1lBQ0Usd0ZBQXdGO1lBQ3hGLGlEQUFpRDtZQUNqRCxLQUF5QixJQUFBLEtBQUEsaUJBQUEsSUFBSSxDQUFDLElBQUksQ0FBQSxnQkFBQSw0QkFBRTtnQkFBdkIsSUFBQSx3QkFBTTtnQkFDakIsSUFBSSxNQUFNLElBQUksTUFBTSxDQUFDLFFBQVEsRUFBRSxFQUFFO29CQUMvQixPQUFPLElBQUksQ0FBQztpQkFDYjthQUNGOzs7Ozs7Ozs7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRDs7T0FFRzs7Ozs7SUFDSSwwQ0FBZ0I7Ozs7SUFBdkI7OztZQUNRLEdBQUcsR0FB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QTZCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBDbHJEYXRhZ3JpZEZpbHRlckludGVyZmFjZSB9IGZyb20gJy4uL2ludGVyZmFjZXMvZmlsdGVyLmludGVyZmFjZSc7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSAnLi9wYWdlJztcbmltcG9ydCB7IFN0YXRlRGVib3VuY2VyIH0gZnJvbSAnLi9zdGF0ZS1kZWJvdW5jZXIucHJvdmlkZXInO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRmlsdGVyc1Byb3ZpZGVyPFQgPSBhbnk+IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfcGFnZTogUGFnZSwgcHJpdmF0ZSBzdGF0ZURlYm91bmNlcjogU3RhdGVEZWJvdW5jZXIpIHt9XG4gIC8qKlxuICAgKiBUaGlzIHN1YmplY3QgaXMgdGhlIGxpc3Qgb2YgZmlsdGVycyB0aGF0IGNoYW5nZWQgbGFzdCwgbm90IHRoZSB3aG9sZSBsaXN0LlxuICAgKiBXZSBlbWl0IGEgbGlzdCByYXRoZXIgdGhhbiBqdXN0IG9uZSBmaWx0ZXIgdG8gYWxsb3cgYmF0Y2ggY2hhbmdlcyB0byBzZXZlcmFsIGF0IG9uY2UuXG4gICAqL1xuICBwcml2YXRlIF9jaGFuZ2UgPSBuZXcgU3ViamVjdDxDbHJEYXRhZ3JpZEZpbHRlckludGVyZmFjZTxUPltdPigpO1xuICAvLyBXZSBkbyBub3Qgd2FudCB0byBleHBvc2UgdGhlIFN1YmplY3QgaXRzZWxmLCBidXQgdGhlIE9ic2VydmFibGUgd2hpY2ggaXMgcmVhZC1vbmx5XG4gIHB1YmxpYyBnZXQgY2hhbmdlKCk6IE9ic2VydmFibGU8Q2xyRGF0YWdyaWRGaWx0ZXJJbnRlcmZhY2U8VD5bXT4ge1xuICAgIHJldHVybiB0aGlzLl9jaGFuZ2UuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICAvKipcbiAgICogTGlzdCBvZiBhbGwgZmlsdGVycywgd2hldGhlciB0aGV5J3JlIGFjdGl2ZSBvciBub3RcbiAgICovXG4gIHByaXZhdGUgX2FsbDogUmVnaXN0ZXJlZEZpbHRlcjxULCBDbHJEYXRhZ3JpZEZpbHRlckludGVyZmFjZTxUPj5bXSA9IFtdO1xuXG4gIC8qKlxuICAgKiBUZXN0cyBpZiBhdCBsZWFzdCBvbmUgZmlsdGVyIGlzIGN1cnJlbnRseSBhY3RpdmVcbiAgICovXG4gIHB1YmxpYyBoYXNBY3RpdmVGaWx0ZXJzKCk6IGJvb2xlYW4ge1xuICAgIC8vIFdlIGRvIG5vdCB1c2UgZ2V0QWN0aXZlRmlsdGVycygpIGJlY2F1c2UgdGhpcyBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCBtdWNoIG1vcmUgb2Z0ZW5cbiAgICAvLyBhbmQgc3RvcHBpbmcgdGhlIGxvb3AgZWFybHkgbWlnaHQgYmUgcmVsZXZhbnQuXG4gICAgZm9yIChjb25zdCB7IGZpbHRlciB9IG9mIHRoaXMuX2FsbCkge1xuICAgICAgaWYgKGZpbHRlciAmJiBmaWx0ZXIuaXNBY3RpdmUoKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBsaXN0IG9mIGFsbCBjdXJyZW50bHkgYWN0aXZlIGZpbHRlcnNcbiAgICovXG4gIHB1YmxpYyBnZXRBY3RpdmVGaWx0ZXJzKCk6IENsckRhdGFncmlkRmlsdGVySW50ZXJmYWNlPFQ+W10ge1xuICAgIGNvbnN0IHJldDogQ2xyRGF0YWdyaWRGaWx0ZXJJbnRlcmZhY2U8VD5bXSA9IFtdO1xuICAgIGZvciAoY29uc3QgeyBmaWx0ZXIgfSBvZiB0aGlzLl9hbGwpIHtcbiAgICAgIGlmIChmaWx0ZXIgJiYgZmlsdGVyLmlzQWN0aXZlKCkpIHtcbiAgICAgICAgcmV0LnB1c2goZmlsdGVyKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJldDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgYSBmaWx0ZXIsIGFuZCByZXR1cm5zIGEgZGVyZWdpc3RyYXRpb24gZnVuY3Rpb25cbiAgICovXG4gIHB1YmxpYyBhZGQ8RiBleHRlbmRzIENsckRhdGFncmlkRmlsdGVySW50ZXJmYWNlPFQ+PihmaWx0ZXI6IEYpOiBSZWdpc3RlcmVkRmlsdGVyPFQsIEY+IHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuX2FsbC5sZW5ndGg7XG4gICAgY29uc3Qgc3Vic2NyaXB0aW9uID0gZmlsdGVyLmNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHRoaXMucmVzZXRQYWdlQW5kRW1pdEZpbHRlckNoYW5nZShbZmlsdGVyXSkpO1xuICAgIGxldCBoYXNVbnJlZ2lzdGVyZWQgPSBmYWxzZTtcbiAgICBjb25zdCByZWdpc3RlcmVkID0gbmV3IFJlZ2lzdGVyZWRGaWx0ZXIoZmlsdGVyLCAoKSA9PiB7XG4gICAgICBpZiAoaGFzVW5yZWdpc3RlcmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgdGhpcy5fYWxsLnNwbGljZShpbmRleCwgMSk7XG4gICAgICBpZiAoZmlsdGVyLmlzQWN0aXZlKCkpIHtcbiAgICAgICAgdGhpcy5yZXNldFBhZ2VBbmRFbWl0RmlsdGVyQ2hhbmdlKFtdKTtcbiAgICAgIH1cbiAgICAgIGhhc1VucmVnaXN0ZXJlZCA9IHRydWU7XG4gICAgfSk7XG4gICAgdGhpcy5fYWxsLnB1c2gocmVnaXN0ZXJlZCk7XG4gICAgaWYgKGZpbHRlci5pc0FjdGl2ZSgpKSB7XG4gICAgICB0aGlzLnJlc2V0UGFnZUFuZEVtaXRGaWx0ZXJDaGFuZ2UoW2ZpbHRlcl0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVnaXN0ZXJlZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBY2NlcHRzIGFuIGl0ZW0gaWYgaXQgaXMgYWNjZXB0ZWQgYnkgYWxsIGN1cnJlbnRseSBhY3RpdmUgZmlsdGVyc1xuICAgKi9cbiAgcHVibGljIGFjY2VwdHMoaXRlbTogVCk6IGJvb2xlYW4ge1xuICAgIGZvciAoY29uc3QgeyBmaWx0ZXIgfSBvZiB0aGlzLl9hbGwpIHtcbiAgICAgIGlmIChmaWx0ZXIgJiYgZmlsdGVyLmlzQWN0aXZlKCkgJiYgIWZpbHRlci5hY2NlcHRzKGl0ZW0pKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBwcml2YXRlIHJlc2V0UGFnZUFuZEVtaXRGaWx0ZXJDaGFuZ2UoZmlsdGVyczogQ2xyRGF0YWdyaWRGaWx0ZXJJbnRlcmZhY2U8VD5bXSkge1xuICAgIHRoaXMuc3RhdGVEZWJvdW5jZXIuY2hhbmdlU3RhcnQoKTtcbiAgICAvLyBmaWx0ZXJpbmcgbWF5IGNoYW5nZSB0aGUgcGFnZSBudW1iZXIgc3VjaCB0aGF0IGN1cnJlbnQgcGFnZSBudW1iZXIgZG9lc24ndCBleGlzdCBpbiB0aGUgZmlsdGVyZWQgZGF0YXNldC5cbiAgICAvLyBTbyBoZXJlIHdlIGFsd2F5cyBzZXQgdGhlIGN1cnJlbnQgcGFnZSB0byAxIHNvIHRoYXQgaXQnbGwgZmV0Y2ggZmlyc3QgcGFnZSdzIGRhdGEgd2l0aCB0aGUgZ2l2ZW4gZmlsdGVyLlxuICAgIHRoaXMuX3BhZ2UuY3VycmVudCA9IDE7XG4gICAgdGhpcy5fY2hhbmdlLm5leHQoZmlsdGVycyk7XG4gICAgdGhpcy5zdGF0ZURlYm91bmNlci5jaGFuZ2VEb25lKCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFJlZ2lzdGVyZWRGaWx0ZXI8VCwgRiBleHRlbmRzIENsckRhdGFncmlkRmlsdGVySW50ZXJmYWNlPFQ+PiB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBmaWx0ZXI6IEYsIHB1YmxpYyB1bnJlZ2lzdGVyOiAoKSA9PiB2b2lkKSB7fVxufVxuIl19