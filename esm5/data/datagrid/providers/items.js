/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FiltersProvider } from './filters';
import { Page } from './page';
import { Sort } from './sort';
/**
 * @template T
 */
var Items = /** @class */ (function () {
    function Items(_filters, _sort, _page) {
        this._filters = _filters;
        this._sort = _sort;
        this._page = _page;
        /**
         * Indicates if the data is currently loading
         */
        this.loading = false;
        // TODO: Verify that trackBy is registered for the *ngFor case too
        /**
         * Tracking function to identify objects. Default is reference equality.
         */
        this.trackBy = (/**
         * @param {?} index
         * @param {?} item
         * @return {?}
         */
        function (index, item) { return item; });
        /**
         * Whether we should use smart items for this datagrid or let the user handle
         * everything.
         */
        this._smart = false;
        /**
         * List of items currently displayed
         */
        this._displayed = [];
        /**
         * The Observable that lets other classes subscribe to items changes
         */
        this._change = new Subject();
        this._allChanges = new Subject();
    }
    /**
     * Cleans up our subscriptions to other providers
     */
    /**
     * Cleans up our subscriptions to other providers
     * @return {?}
     */
    Items.prototype.destroy = /**
     * Cleans up our subscriptions to other providers
     * @return {?}
     */
    function () {
        if (this._filtersSub) {
            this._filtersSub.unsubscribe();
        }
        if (this._sortSub) {
            this._sortSub.unsubscribe();
        }
        if (this._pageSub) {
            this._pageSub.unsubscribe();
        }
    };
    Object.defineProperty(Items.prototype, "smart", {
        get: /**
         * @return {?}
         */
        function () {
            return this._smart;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    Items.prototype.smartenUp = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._smart = true;
        /*
             * These observers trigger a chain of function: filter -> sort -> paginate
             * An observer up the chain re-triggers all the operations that follow it.
             */
        this._filtersSub = this._filters.change.subscribe((/**
         * @return {?}
         */
        function () { return _this._filterItems(); }));
        this._sortSub = this._sort.change.subscribe((/**
         * @return {?}
         */
        function () {
            // Special case, if the datagrid went from sorted to unsorted, we have to re-filter
            // to get the original order back
            if (!_this._sort.comparator) {
                _this._filterItems();
            }
            else {
                _this._sortItems();
            }
        }));
        this._pageSub = this._page.change.subscribe((/**
         * @return {?}
         */
        function () { return _this._changePage(); }));
    };
    Object.defineProperty(Items.prototype, "all", {
        get: /**
         * @return {?}
         */
        function () {
            return this._all;
        },
        set: /**
         * @param {?} items
         * @return {?}
         */
        function (items) {
            this._all = items;
            this.emitAllChanges(items);
            if (this.smart) {
                this._filterItems();
            }
            else {
                this._displayed = items;
                this.emitChange();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Manually recompute the list of displayed items
     */
    /**
     * Manually recompute the list of displayed items
     * @return {?}
     */
    Items.prototype.refresh = /**
     * Manually recompute the list of displayed items
     * @return {?}
     */
    function () {
        if (this.smart) {
            this._filterItems();
        }
    };
    Object.defineProperty(Items.prototype, "displayed", {
        get: /**
         * @return {?}
         */
        function () {
            // Ideally we could return an immutable array, but we don't have it in Clarity yet.
            return this._displayed;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @return {?}
     */
    Items.prototype.emitChange = /**
     * @private
     * @return {?}
     */
    function () {
        this._change.next(this.displayed);
    };
    Object.defineProperty(Items.prototype, "change", {
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
     * @private
     * @param {?} items
     * @return {?}
     */
    Items.prototype.emitAllChanges = /**
     * @private
     * @param {?} items
     * @return {?}
     */
    function (items) {
        this._allChanges.next(items);
    };
    Object.defineProperty(Items.prototype, "allChanges", {
        get: /**
         * @return {?}
         */
        function () {
            return this._allChanges.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Items.prototype, "uninitialized", {
        /**
         * Checks if we don't have data to process yet, to abort early operations
         */
        get: /**
         * Checks if we don't have data to process yet, to abort early operations
         * @private
         * @return {?}
         */
        function () {
            return !this._all;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * FiltersProvider items from the raw list
     */
    /**
     * FiltersProvider items from the raw list
     * @private
     * @return {?}
     */
    Items.prototype._filterItems = /**
     * FiltersProvider items from the raw list
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.uninitialized) {
            return;
        }
        if (this._filters.hasActiveFilters()) {
            this._filtered = this._all.filter((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return _this._filters.accepts(item); }));
        }
        else {
            // Work on a shallow copy of the array, to not modify the user's model
            this._filtered = this._all.slice();
        }
        this._page.totalItems = this._filtered.length;
        this._sortItems();
    };
    /**
     * Sorts items in the filtered list
     */
    /**
     * Sorts items in the filtered list
     * @private
     * @return {?}
     */
    Items.prototype._sortItems = /**
     * Sorts items in the filtered list
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.uninitialized) {
            return;
        }
        if (this._sort.comparator) {
            this._filtered.sort((/**
             * @param {?} a
             * @param {?} b
             * @return {?}
             */
            function (a, b) { return _this._sort.compare(a, b); }));
        }
        this._changePage();
    };
    /**
     * Extracts the current page from the sorted list
     */
    /**
     * Extracts the current page from the sorted list
     * @private
     * @return {?}
     */
    Items.prototype._changePage = /**
     * Extracts the current page from the sorted list
     * @private
     * @return {?}
     */
    function () {
        // If we know we have pagination but the page size hasn't been set yet, we wait for it.
        if (this.uninitialized || (this._page.activated && this._page.size === 0)) {
            return;
        }
        if (this._page.size > 0) {
            this._displayed = this._filtered.slice(this._page.firstItem, this._page.lastItem + 1);
        }
        else {
            this._displayed = this._filtered;
        }
        this.emitChange();
    };
    Items.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Items.ctorParameters = function () { return [
        { type: FiltersProvider },
        { type: Sort },
        { type: Page }
    ]; };
    return Items;
}());
export { Items };
if (false) {
    /**
     * Indicates if the data is currently loading
     * @type {?}
     */
    Items.prototype.loading;
    /**
     * Tracking function to identify objects. Default is reference equality.
     * @type {?}
     */
    Items.prototype.trackBy;
    /**
     * Subscriptions to the other providers changes.
     * @type {?}
     * @private
     */
    Items.prototype._filtersSub;
    /**
     * @type {?}
     * @private
     */
    Items.prototype._sortSub;
    /**
     * @type {?}
     * @private
     */
    Items.prototype._pageSub;
    /**
     * Whether we should use smart items for this datagrid or let the user handle
     * everything.
     * @type {?}
     * @private
     */
    Items.prototype._smart;
    /**
     * List of all items in the datagrid
     * @type {?}
     * @private
     */
    Items.prototype._all;
    /**
     * Internal temporary step, which we preserve to avoid re-filtering or re-sorting if not necessary
     * @type {?}
     * @private
     */
    Items.prototype._filtered;
    /**
     * List of items currently displayed
     * @type {?}
     * @private
     */
    Items.prototype._displayed;
    /**
     * The Observable that lets other classes subscribe to items changes
     * @type {?}
     * @private
     */
    Items.prototype._change;
    /**
     * @type {?}
     * @private
     */
    Items.prototype._allChanges;
    /**
     * @type {?}
     * @private
     */
    Items.prototype._filters;
    /**
     * @type {?}
     * @private
     */
    Items.prototype._sort;
    /**
     * @type {?}
     * @private
     */
    Items.prototype._page;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJkYXRhL2RhdGFncmlkL3Byb3ZpZGVycy9pdGVtcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFLQSxPQUFPLEVBQUUsVUFBVSxFQUFtQixNQUFNLGVBQWUsQ0FBQztBQUU1RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRy9CLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDNUMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUM5QixPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sUUFBUSxDQUFDOzs7O0FBRTlCO0lBRUUsZUFBb0IsUUFBNEIsRUFBVSxLQUFjLEVBQVUsS0FBVztRQUF6RSxhQUFRLEdBQVIsUUFBUSxDQUFvQjtRQUFVLFVBQUssR0FBTCxLQUFLLENBQVM7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFNOzs7O1FBS3RGLFlBQU8sR0FBRyxLQUFLLENBQUM7Ozs7O1FBTWhCLFlBQU87Ozs7O1FBQXVCLFVBQUMsS0FBYSxFQUFFLElBQU8sSUFBSyxPQUFBLElBQUksRUFBSixDQUFJLEVBQUM7Ozs7O1FBMkI5RCxXQUFNLEdBQUcsS0FBSyxDQUFDOzs7O1FBMERmLGVBQVUsR0FBUSxFQUFFLENBQUM7Ozs7UUFTckIsWUFBTyxHQUFHLElBQUksT0FBTyxFQUFPLENBQUM7UUFTN0IsZ0JBQVcsR0FBRyxJQUFJLE9BQU8sRUFBTyxDQUFDO0lBbEh1RCxDQUFDO0lBbUJqRzs7T0FFRzs7Ozs7SUFDSSx1QkFBTzs7OztJQUFkO1FBQ0UsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDaEM7UUFDRCxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVB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QUMsQ0FBQyxFQUFFO1lBQ3pFLE9BQU87U0FDUjtRQUNELElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDdkY7YUFBTTtZQUNMLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztTQUNsQztRQUNELElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNwQixDQUFDOztnQkFoTEYsVUFBVTs7OztnQkFKRixlQUFlO2dCQUVmLElBQUk7Z0JBREosSUFBSTs7SUFvTGIsWUFBQztDQUFBLEFBakxELElBaUxDO1NBaExZLEtBQUs7Ozs7OztJQU1oQix3QkFBdUI7Ozs7O0lBTXZCLHdCQUFzRTs7Ozs7O0lBS3RFLDRCQUFrQzs7Ozs7SUFDbEMseUJBQStCOzs7OztJQUMvQix5QkFBK0I7Ozs7Ozs7SUFvQi9CLHVCQUF1Qjs7Ozs7O0lBMEJ2QixxQkFBa0I7Ozs7OztJQTJCbEIsMEJBQXVCOzs7Ozs7SUFLdkIsMkJBQTZCOzs7Ozs7SUFTN0Isd0JBQXFDOzs7OztJQVNyQyw0QkFBeUM7Ozs7O0lBbEg3Qix5QkFBb0M7Ozs7O0lBQUUsc0JBQXNCOzs7OztJQUFFLHNCQUFtQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IEluamVjdGFibGUsIFRyYWNrQnlGdW5jdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IEZpbHRlcnNQcm92aWRlciB9IGZyb20gJy4vZmlsdGVycyc7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSAnLi9wYWdlJztcbmltcG9ydCB7IFNvcnQgfSBmcm9tICcuL3NvcnQnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSXRlbXM8VCA9IGFueT4ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9maWx0ZXJzOiBGaWx0ZXJzUHJvdmlkZXI8VD4sIHByaXZhdGUgX3NvcnQ6IFNvcnQ8VD4sIHByaXZhdGUgX3BhZ2U6IFBhZ2UpIHt9XG5cbiAgLyoqXG4gICAqIEluZGljYXRlcyBpZiB0aGUgZGF0YSBpcyBjdXJyZW50bHkgbG9hZGluZ1xuICAgKi9cbiAgcHVibGljIGxvYWRpbmcgPSBmYWxzZTtcblxuICAvLyBUT0RPOiBWZXJpZnkgdGhhdCB0cmFja0J5IGlzIHJlZ2lzdGVyZWQgZm9yIHRoZSAqbmdGb3IgY2FzZSB0b29cbiAgLyoqXG4gICAqIFRyYWNraW5nIGZ1bmN0aW9uIHRvIGlkZW50aWZ5IG9iamVjdHMuIERlZmF1bHQgaXMgcmVmZXJlbmNlIGVxdWFsaXR5LlxuICAgKi9cbiAgcHVibGljIHRyYWNrQnk6IFRyYWNrQnlGdW5jdGlvbjxUPiA9IChpbmRleDogbnVtYmVyLCBpdGVtOiBUKSA9PiBpdGVtO1xuXG4gIC8qKlxuICAgKiBTdWJzY3JpcHRpb25zIHRvIHRoZSBvdGhlciBwcm92aWRlcnMgY2hhbmdlcy5cbiAgICovXG4gIHByaXZhdGUgX2ZpbHRlcnNTdWI6IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBfc29ydFN1YjogU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIF9wYWdlU3ViOiBTdWJzY3JpcHRpb247XG4gIC8qKlxuICAgKiBDbGVhbnMgdXAgb3VyIHN1YnNjcmlwdGlvbnMgdG8gb3RoZXIgcHJvdmlkZXJzXG4gICAqL1xuICBwdWJsaWMgZGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5fZmlsdGVyc1N1Yikge1xuICAgICAgdGhpcy5fZmlsdGVyc1N1Yi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5fc29ydFN1Yikge1xuICAgICAgdGhpcy5fc29ydFN1Yi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5fcGFnZVN1Yikge1xuICAgICAgdGhpcy5fcGFnZVN1Yi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHdlIHNob3VsZCB1c2Ugc21hcnQgaXRlbXMgZm9yIHRoaXMgZGF0YWdyaWQgb3IgbGV0IHRoZSB1c2VyIGhhbmRsZVxuICAgKiBldmVyeXRoaW5nLlxuICAgKi9cbiAgcHJpdmF0ZSBfc21hcnQgPSBmYWxzZTtcbiAgcHVibGljIGdldCBzbWFydCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fc21hcnQ7XG4gIH1cbiAgcHVibGljIHNtYXJ0ZW5VcCgpIHtcbiAgICB0aGlzLl9zbWFydCA9IHRydWU7XG4gICAgLypcbiAgICAgICAgICogVGhlc2Ugb2JzZXJ2ZXJzIHRyaWdnZXIgYSBjaGFpbiBvZiBmdW5jdGlvbjogZmlsdGVyIC0+IHNvcnQgLT4gcGFnaW5hdGVcbiAgICAgICAgICogQW4gb2JzZXJ2ZXIgdXAgdGhlIGNoYWluIHJlLXRyaWdnZXJzIGFsbCB0aGUgb3BlcmF0aW9ucyB0aGF0IGZvbGxvdyBpdC5cbiAgICAgICAgICovXG4gICAgdGhpcy5fZmlsdGVyc1N1YiA9IHRoaXMuX2ZpbHRlcnMuY2hhbmdlLnN1YnNjcmliZSgoKSA9PiB0aGlzLl9maWx0ZXJJdGVtcygpKTtcbiAgICB0aGlzLl9zb3J0U3ViID0gdGhpcy5fc29ydC5jaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIC8vIFNwZWNpYWwgY2FzZSwgaWYgdGhlIGRhdGFncmlkIHdlbnQgZnJvbSBzb3J0ZWQgdG8gdW5zb3J0ZWQsIHdlIGhhdmUgdG8gcmUtZmlsdGVyXG4gICAgICAvLyB0byBnZXQgdGhlIG9yaWdpbmFsIG9yZGVyIGJhY2tcbiAgICAgIGlmICghdGhpcy5fc29ydC5jb21wYXJhdG9yKSB7XG4gICAgICAgIHRoaXMuX2ZpbHRlckl0ZW1zKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9zb3J0SXRlbXMoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLl9wYWdlU3ViID0gdGhpcy5fcGFnZS5jaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHRoaXMuX2NoYW5nZVBhZ2UoKSk7XG4gIH1cblxuICAvKipcbiAgICogTGlzdCBvZiBhbGwgaXRlbXMgaW4gdGhlIGRhdGFncmlkXG4gICAqL1xuICBwcml2YXRlIF9hbGw6IFRbXTtcbiAgcHVibGljIGdldCBhbGwoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FsbDtcbiAgfVxuICBwdWJsaWMgc2V0IGFsbChpdGVtczogVFtdKSB7XG4gICAgdGhpcy5fYWxsID0gaXRlbXM7XG4gICAgdGhpcy5lbWl0QWxsQ2hhbmdlcyhpdGVtcyk7XG4gICAgaWYgKHRoaXMuc21hcnQpIHtcbiAgICAgIHRoaXMuX2ZpbHRlckl0ZW1zKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2Rpc3BsYXllZCA9IGl0ZW1zO1xuICAgICAgdGhpcy5lbWl0Q2hhbmdlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE1hbnVhbGx5IHJlY29tcHV0ZSB0aGUgbGlzdCBvZiBkaXNwbGF5ZWQgaXRlbXNcbiAgICovXG4gIHB1YmxpYyByZWZyZXNoKCkge1xuICAgIGlmICh0aGlzLnNtYXJ0KSB7XG4gICAgICB0aGlzLl9maWx0ZXJJdGVtcygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJbnRlcm5hbCB0ZW1wb3Jhcnkgc3RlcCwgd2hpY2ggd2UgcHJlc2VydmUgdG8gYXZvaWQgcmUtZmlsdGVyaW5nIG9yIHJlLXNvcnRpbmcgaWYgbm90IG5lY2Vzc2FyeVxuICAgKi9cbiAgcHJpdmF0ZSBfZmlsdGVyZWQ6IFRbXTtcblxuICAvKipcbiAgICogTGlzdCBvZiBpdGVtcyBjdXJyZW50bHkgZGlzcGxheWVkXG4gICAqL1xuICBwcml2YXRlIF9kaXNwbGF5ZWQ6IFRbXSA9IFtdO1xuICBwdWJsaWMgZ2V0IGRpc3BsYXllZCgpOiBUW10ge1xuICAgIC8vIElkZWFsbHkgd2UgY291bGQgcmV0dXJuIGFuIGltbXV0YWJsZSBhcnJheSwgYnV0IHdlIGRvbid0IGhhdmUgaXQgaW4gQ2xhcml0eSB5ZXQuXG4gICAgcmV0dXJuIHRoaXMuX2Rpc3BsYXllZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgT2JzZXJ2YWJsZSB0aGF0IGxldHMgb3RoZXIgY2xhc3NlcyBzdWJzY3JpYmUgdG8gaXRlbXMgY2hhbmdlc1xuICAgKi9cbiAgcHJpdmF0ZSBfY2hhbmdlID0gbmV3IFN1YmplY3Q8VFtdPigpO1xuICBwcml2YXRlIGVtaXRDaGFuZ2UoKSB7XG4gICAgdGhpcy5fY2hhbmdlLm5leHQodGhpcy5kaXNwbGF5ZWQpO1xuICB9XG4gIC8vIFdlIGRvIG5vdCB3YW50IHRvIGV4cG9zZSB0aGUgU3ViamVjdCBpdHNlbGYsIGJ1dCB0aGUgT2JzZXJ2YWJsZSB3aGljaCBpcyByZWFkLW9ubHlcbiAgcHVibGljIGdldCBjaGFuZ2UoKTogT2JzZXJ2YWJsZTxUW10+IHtcbiAgICByZXR1cm4gdGhpcy5fY2hhbmdlLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWxsQ2hhbmdlcyA9IG5ldyBTdWJqZWN0PFRbXT4oKTtcbiAgcHJpdmF0ZSBlbWl0QWxsQ2hhbmdlcyhpdGVtczogVFtdKTogdm9pZCB7XG4gICAgdGhpcy5fYWxsQ2hhbmdlcy5uZXh0KGl0ZW1zKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgYWxsQ2hhbmdlcygpOiBPYnNlcnZhYmxlPFRbXT4ge1xuICAgIHJldHVybiB0aGlzLl9hbGxDaGFuZ2VzLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiB3ZSBkb24ndCBoYXZlIGRhdGEgdG8gcHJvY2VzcyB5ZXQsIHRvIGFib3J0IGVhcmx5IG9wZXJhdGlvbnNcbiAgICovXG4gIHByaXZhdGUgZ2V0IHVuaW5pdGlhbGl6ZWQoKSB7XG4gICAgcmV0dXJuICF0aGlzLl9hbGw7XG4gIH1cblxuICAvKipcbiAgICogRmlsdGVyc1Byb3ZpZGVyIGl0ZW1zIGZyb20gdGhlIHJhdyBsaXN0XG4gICAqL1xuICBwcml2YXRlIF9maWx0ZXJJdGVtcygpIHtcbiAgICBpZiAodGhpcy51bmluaXRpYWxpemVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLl9maWx0ZXJzLmhhc0FjdGl2ZUZpbHRlcnMoKSkge1xuICAgICAgdGhpcy5fZmlsdGVyZWQgPSB0aGlzLl9hbGwuZmlsdGVyKGl0ZW0gPT4gdGhpcy5fZmlsdGVycy5hY2NlcHRzKGl0ZW0pKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gV29yayBvbiBhIHNoYWxsb3cgY29weSBvZiB0aGUgYXJyYXksIHRvIG5vdCBtb2RpZnkgdGhlIHVzZXIncyBtb2RlbFxuICAgICAgdGhpcy5fZmlsdGVyZWQgPSB0aGlzLl9hbGwuc2xpY2UoKTtcbiAgICB9XG4gICAgdGhpcy5fcGFnZS50b3RhbEl0ZW1zID0gdGhpcy5fZmlsdGVyZWQubGVuZ3RoO1xuICAgIHRoaXMuX3NvcnRJdGVtcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNvcnRzIGl0ZW1zIGluIHRoZSBmaWx0ZXJlZCBsaXN0XG4gICAqL1xuICBwcml2YXRlIF9zb3J0SXRlbXMoKSB7XG4gICAgaWYgKHRoaXMudW5pbml0aWFsaXplZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5fc29ydC5jb21wYXJhdG9yKSB7XG4gICAgICB0aGlzLl9maWx0ZXJlZC5zb3J0KChhLCBiKSA9PiB0aGlzLl9zb3J0LmNvbXBhcmUoYSwgYikpO1xuICAgIH1cbiAgICB0aGlzLl9jaGFuZ2VQYWdlKCk7XG4gIH1cblxuICAvKipcbiAgICogRXh0cmFjdHMgdGhlIGN1cnJlbnQgcGFnZSBmcm9tIHRoZSBzb3J0ZWQgbGlzdFxuICAgKi9cbiAgcHJpdmF0ZSBfY2hhbmdlUGFnZSgpIHtcbiAgICAvLyBJZiB3ZSBrbm93IHdlIGhhdmUgcGFnaW5hdGlvbiBidXQgdGhlIHBhZ2Ugc2l6ZSBoYXNuJ3QgYmVlbiBzZXQgeWV0LCB3ZSB3YWl0IGZvciBpdC5cbiAgICBpZiAodGhpcy51bmluaXRpYWxpemVkIHx8ICh0aGlzLl9wYWdlLmFjdGl2YXRlZCAmJiB0aGlzLl9wYWdlLnNpemUgPT09IDApKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLl9wYWdlLnNpemUgPiAwKSB7XG4gICAgICB0aGlzLl9kaXNwbGF5ZWQgPSB0aGlzLl9maWx0ZXJlZC5zbGljZSh0aGlzLl9wYWdlLmZpcnN0SXRlbSwgdGhpcy5fcGFnZS5sYXN0SXRlbSArIDEpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9kaXNwbGF5ZWQgPSB0aGlzLl9maWx0ZXJlZDtcbiAgICB9XG4gICAgdGhpcy5lbWl0Q2hhbmdlKCk7XG4gIH1cbn1cbiJdfQ==