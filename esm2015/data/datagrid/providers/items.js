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
export class Items {
    /**
     * @param {?} _filters
     * @param {?} _sort
     * @param {?} _page
     */
    constructor(_filters, _sort, _page) {
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
        (index, item) => item);
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
     * @return {?}
     */
    destroy() {
        if (this._filtersSub) {
            this._filtersSub.unsubscribe();
        }
        if (this._sortSub) {
            this._sortSub.unsubscribe();
        }
        if (this._pageSub) {
            this._pageSub.unsubscribe();
        }
    }
    /**
     * @return {?}
     */
    get smart() {
        return this._smart;
    }
    /**
     * @return {?}
     */
    smartenUp() {
        this._smart = true;
        /*
             * These observers trigger a chain of function: filter -> sort -> paginate
             * An observer up the chain re-triggers all the operations that follow it.
             */
        this._filtersSub = this._filters.change.subscribe((/**
         * @return {?}
         */
        () => this._filterItems()));
        this._sortSub = this._sort.change.subscribe((/**
         * @return {?}
         */
        () => {
            // Special case, if the datagrid went from sorted to unsorted, we have to re-filter
            // to get the original order back
            if (!this._sort.comparator) {
                this._filterItems();
            }
            else {
                this._sortItems();
            }
        }));
        this._pageSub = this._page.change.subscribe((/**
         * @return {?}
         */
        () => this._changePage()));
    }
    /**
     * @return {?}
     */
    get all() {
        return this._all;
    }
    /**
     * @param {?} items
     * @return {?}
     */
    set all(items) {
        this._all = items;
        this.emitAllChanges(items);
        if (this.smart) {
            this._filterItems();
        }
        else {
            this._displayed = items;
            this.emitChange();
        }
    }
    /**
     * Manually recompute the list of displayed items
     * @return {?}
     */
    refresh() {
        if (this.smart) {
            this._filterItems();
        }
    }
    /**
     * @return {?}
     */
    get displayed() {
        // Ideally we could return an immutable array, but we don't have it in Clarity yet.
        return this._displayed;
    }
    /**
     * @private
     * @return {?}
     */
    emitChange() {
        this._change.next(this.displayed);
    }
    // We do not want to expose the Subject itself, but the Observable which is read-only
    /**
     * @return {?}
     */
    get change() {
        return this._change.asObservable();
    }
    /**
     * @private
     * @param {?} items
     * @return {?}
     */
    emitAllChanges(items) {
        this._allChanges.next(items);
    }
    /**
     * @return {?}
     */
    get allChanges() {
        return this._allChanges.asObservable();
    }
    /**
     * Checks if we don't have data to process yet, to abort early operations
     * @private
     * @return {?}
     */
    get uninitialized() {
        return !this._all;
    }
    /**
     * FiltersProvider items from the raw list
     * @private
     * @return {?}
     */
    _filterItems() {
        if (this.uninitialized) {
            return;
        }
        if (this._filters.hasActiveFilters()) {
            this._filtered = this._all.filter((/**
             * @param {?} item
             * @return {?}
             */
            item => this._filters.accepts(item)));
        }
        else {
            // Work on a shallow copy of the array, to not modify the user's model
            this._filtered = this._all.slice();
        }
        this._page.totalItems = this._filtered.length;
        this._sortItems();
    }
    /**
     * Sorts items in the filtered list
     * @private
     * @return {?}
     */
    _sortItems() {
        if (this.uninitialized) {
            return;
        }
        if (this._sort.comparator) {
            this._filtered.sort((/**
             * @param {?} a
             * @param {?} b
             * @return {?}
             */
            (a, b) => this._sort.compare(a, b)));
        }
        this._changePage();
    }
    /**
     * Extracts the current page from the sorted list
     * @private
     * @return {?}
     */
    _changePage() {
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
    }
}
Items.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Items.ctorParameters = () => [
    { type: FiltersProvider },
    { type: Sort },
    { type: Page }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJkYXRhL2RhdGFncmlkL3Byb3ZpZGVycy9pdGVtcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFLQSxPQUFPLEVBQUUsVUFBVSxFQUFtQixNQUFNLGVBQWUsQ0FBQztBQUU1RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRy9CLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDNUMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUM5QixPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sUUFBUSxDQUFDOzs7O0FBRzlCLE1BQU0sT0FBTyxLQUFLOzs7Ozs7SUFDaEIsWUFBb0IsUUFBNEIsRUFBVSxLQUFjLEVBQVUsS0FBVztRQUF6RSxhQUFRLEdBQVIsUUFBUSxDQUFvQjtRQUFVLFVBQUssR0FBTCxLQUFLLENBQVM7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFNOzs7O1FBS3RGLFlBQU8sR0FBRyxLQUFLLENBQUM7Ozs7O1FBTWhCLFlBQU87Ozs7O1FBQXVCLENBQUMsS0FBYSxFQUFFLElBQU8sRUFBRSxFQUFFLENBQUMsSUFBSSxFQUFDOzs7OztRQTJCOUQsV0FBTSxHQUFHLEtBQUssQ0FBQzs7OztRQTBEZixlQUFVLEdBQVEsRUFBRSxDQUFDOzs7O1FBU3JCLFlBQU8sR0FBRyxJQUFJLE9BQU8sRUFBTyxDQUFDO1FBUzdCLGdCQUFXLEdBQUcsSUFBSSxPQUFPLEVBQU8sQ0FBQztJQWxIdUQsQ0FBQzs7Ozs7SUFzQjFGLE9BQU87UUFDWixJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDcEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNoQztRQUNELElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxD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SSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3BCLENBQUM7OztZQWhMRixVQUFVOzs7O1lBSkYsZUFBZTtZQUVmLElBQUk7WUFESixJQUFJOzs7Ozs7O0lBVVgsd0JBQXVCOzs7OztJQU12Qix3QkFBc0U7Ozs7OztJQUt0RSw0QkFBa0M7Ozs7O0lBQ2xDLHlCQUErQjs7Ozs7SUFDL0IseUJBQStCOzs7Ozs7O0lBb0IvQix1QkFBdUI7Ozs7OztJQTBCdkIscUJBQWtCOzs7Ozs7SUEyQmxCLDBCQUF1Qjs7Ozs7O0lBS3ZCLDJCQUE2Qjs7Ozs7O0lBUzdCLHdCQUFxQzs7Ozs7SUFTckMsNEJBQXlDOzs7OztJQWxIN0IseUJBQW9DOzs7OztJQUFFLHNCQUFzQjs7Ozs7SUFBRSxzQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBUcmFja0J5RnVuY3Rpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBGaWx0ZXJzUHJvdmlkZXIgfSBmcm9tICcuL2ZpbHRlcnMnO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gJy4vcGFnZSc7XG5pbXBvcnQgeyBTb3J0IH0gZnJvbSAnLi9zb3J0JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEl0ZW1zPFQgPSBhbnk+IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZmlsdGVyczogRmlsdGVyc1Byb3ZpZGVyPFQ+LCBwcml2YXRlIF9zb3J0OiBTb3J0PFQ+LCBwcml2YXRlIF9wYWdlOiBQYWdlKSB7fVxuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgaWYgdGhlIGRhdGEgaXMgY3VycmVudGx5IGxvYWRpbmdcbiAgICovXG4gIHB1YmxpYyBsb2FkaW5nID0gZmFsc2U7XG5cbiAgLy8gVE9ETzogVmVyaWZ5IHRoYXQgdHJhY2tCeSBpcyByZWdpc3RlcmVkIGZvciB0aGUgKm5nRm9yIGNhc2UgdG9vXG4gIC8qKlxuICAgKiBUcmFja2luZyBmdW5jdGlvbiB0byBpZGVudGlmeSBvYmplY3RzLiBEZWZhdWx0IGlzIHJlZmVyZW5jZSBlcXVhbGl0eS5cbiAgICovXG4gIHB1YmxpYyB0cmFja0J5OiBUcmFja0J5RnVuY3Rpb248VD4gPSAoaW5kZXg6IG51bWJlciwgaXRlbTogVCkgPT4gaXRlbTtcblxuICAvKipcbiAgICogU3Vic2NyaXB0aW9ucyB0byB0aGUgb3RoZXIgcHJvdmlkZXJzIGNoYW5nZXMuXG4gICAqL1xuICBwcml2YXRlIF9maWx0ZXJzU3ViOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgX3NvcnRTdWI6IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBfcGFnZVN1YjogU3Vic2NyaXB0aW9uO1xuICAvKipcbiAgICogQ2xlYW5zIHVwIG91ciBzdWJzY3JpcHRpb25zIHRvIG90aGVyIHByb3ZpZGVyc1xuICAgKi9cbiAgcHVibGljIGRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuX2ZpbHRlcnNTdWIpIHtcbiAgICAgIHRoaXMuX2ZpbHRlcnNTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX3NvcnRTdWIpIHtcbiAgICAgIHRoaXMuX3NvcnRTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX3BhZ2VTdWIpIHtcbiAgICAgIHRoaXMuX3BhZ2VTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogV2hldGhlciB3ZSBzaG91bGQgdXNlIHNtYXJ0IGl0ZW1zIGZvciB0aGlzIGRhdGFncmlkIG9yIGxldCB0aGUgdXNlciBoYW5kbGVcbiAgICogZXZlcnl0aGluZy5cbiAgICovXG4gIHByaXZhdGUgX3NtYXJ0ID0gZmFsc2U7XG4gIHB1YmxpYyBnZXQgc21hcnQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3NtYXJ0O1xuICB9XG4gIHB1YmxpYyBzbWFydGVuVXAoKSB7XG4gICAgdGhpcy5fc21hcnQgPSB0cnVlO1xuICAgIC8qXG4gICAgICAgICAqIFRoZXNlIG9ic2VydmVycyB0cmlnZ2VyIGEgY2hhaW4gb2YgZnVuY3Rpb246IGZpbHRlciAtPiBzb3J0IC0+IHBhZ2luYXRlXG4gICAgICAgICAqIEFuIG9ic2VydmVyIHVwIHRoZSBjaGFpbiByZS10cmlnZ2VycyBhbGwgdGhlIG9wZXJhdGlvbnMgdGhhdCBmb2xsb3cgaXQuXG4gICAgICAgICAqL1xuICAgIHRoaXMuX2ZpbHRlcnNTdWIgPSB0aGlzLl9maWx0ZXJzLmNoYW5nZS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fZmlsdGVySXRlbXMoKSk7XG4gICAgdGhpcy5fc29ydFN1YiA9IHRoaXMuX3NvcnQuY2hhbmdlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAvLyBTcGVjaWFsIGNhc2UsIGlmIHRoZSBkYXRhZ3JpZCB3ZW50IGZyb20gc29ydGVkIHRvIHVuc29ydGVkLCB3ZSBoYXZlIHRvIHJlLWZpbHRlclxuICAgICAgLy8gdG8gZ2V0IHRoZSBvcmlnaW5hbCBvcmRlciBiYWNrXG4gICAgICBpZiAoIXRoaXMuX3NvcnQuY29tcGFyYXRvcikge1xuICAgICAgICB0aGlzLl9maWx0ZXJJdGVtcygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fc29ydEl0ZW1zKCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5fcGFnZVN1YiA9IHRoaXMuX3BhZ2UuY2hhbmdlLnN1YnNjcmliZSgoKSA9PiB0aGlzLl9jaGFuZ2VQYWdlKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIExpc3Qgb2YgYWxsIGl0ZW1zIGluIHRoZSBkYXRhZ3JpZFxuICAgKi9cbiAgcHJpdmF0ZSBfYWxsOiBUW107XG4gIHB1YmxpYyBnZXQgYWxsKCkge1xuICAgIHJldHVybiB0aGlzLl9hbGw7XG4gIH1cbiAgcHVibGljIHNldCBhbGwoaXRlbXM6IFRbXSkge1xuICAgIHRoaXMuX2FsbCA9IGl0ZW1zO1xuICAgIHRoaXMuZW1pdEFsbENoYW5nZXMoaXRlbXMpO1xuICAgIGlmICh0aGlzLnNtYXJ0KSB7XG4gICAgICB0aGlzLl9maWx0ZXJJdGVtcygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9kaXNwbGF5ZWQgPSBpdGVtcztcbiAgICAgIHRoaXMuZW1pdENoYW5nZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBNYW51YWxseSByZWNvbXB1dGUgdGhlIGxpc3Qgb2YgZGlzcGxheWVkIGl0ZW1zXG4gICAqL1xuICBwdWJsaWMgcmVmcmVzaCgpIHtcbiAgICBpZiAodGhpcy5zbWFydCkge1xuICAgICAgdGhpcy5fZmlsdGVySXRlbXMoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSW50ZXJuYWwgdGVtcG9yYXJ5IHN0ZXAsIHdoaWNoIHdlIHByZXNlcnZlIHRvIGF2b2lkIHJlLWZpbHRlcmluZyBvciByZS1zb3J0aW5nIGlmIG5vdCBuZWNlc3NhcnlcbiAgICovXG4gIHByaXZhdGUgX2ZpbHRlcmVkOiBUW107XG5cbiAgLyoqXG4gICAqIExpc3Qgb2YgaXRlbXMgY3VycmVudGx5IGRpc3BsYXllZFxuICAgKi9cbiAgcHJpdmF0ZSBfZGlzcGxheWVkOiBUW10gPSBbXTtcbiAgcHVibGljIGdldCBkaXNwbGF5ZWQoKTogVFtdIHtcbiAgICAvLyBJZGVhbGx5IHdlIGNvdWxkIHJldHVybiBhbiBpbW11dGFibGUgYXJyYXksIGJ1dCB3ZSBkb24ndCBoYXZlIGl0IGluIENsYXJpdHkgeWV0LlxuICAgIHJldHVybiB0aGlzLl9kaXNwbGF5ZWQ7XG4gIH1cblxuICAvKipcbiAgICogVGhlIE9ic2VydmFibGUgdGhhdCBsZXRzIG90aGVyIGNsYXNzZXMgc3Vic2NyaWJlIHRvIGl0ZW1zIGNoYW5nZXNcbiAgICovXG4gIHByaXZhdGUgX2NoYW5nZSA9IG5ldyBTdWJqZWN0PFRbXT4oKTtcbiAgcHJpdmF0ZSBlbWl0Q2hhbmdlKCkge1xuICAgIHRoaXMuX2NoYW5nZS5uZXh0KHRoaXMuZGlzcGxheWVkKTtcbiAgfVxuICAvLyBXZSBkbyBub3Qgd2FudCB0byBleHBvc2UgdGhlIFN1YmplY3QgaXRzZWxmLCBidXQgdGhlIE9ic2VydmFibGUgd2hpY2ggaXMgcmVhZC1vbmx5XG4gIHB1YmxpYyBnZXQgY2hhbmdlKCk6IE9ic2VydmFibGU8VFtdPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NoYW5nZS5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2FsbENoYW5nZXMgPSBuZXcgU3ViamVjdDxUW10+KCk7XG4gIHByaXZhdGUgZW1pdEFsbENoYW5nZXMoaXRlbXM6IFRbXSk6IHZvaWQge1xuICAgIHRoaXMuX2FsbENoYW5nZXMubmV4dChpdGVtcyk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGFsbENoYW5nZXMoKTogT2JzZXJ2YWJsZTxUW10+IHtcbiAgICByZXR1cm4gdGhpcy5fYWxsQ2hhbmdlcy5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgd2UgZG9uJ3QgaGF2ZSBkYXRhIHRvIHByb2Nlc3MgeWV0LCB0byBhYm9ydCBlYXJseSBvcGVyYXRpb25zXG4gICAqL1xuICBwcml2YXRlIGdldCB1bmluaXRpYWxpemVkKCkge1xuICAgIHJldHVybiAhdGhpcy5fYWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbHRlcnNQcm92aWRlciBpdGVtcyBmcm9tIHRoZSByYXcgbGlzdFxuICAgKi9cbiAgcHJpdmF0ZSBfZmlsdGVySXRlbXMoKSB7XG4gICAgaWYgKHRoaXMudW5pbml0aWFsaXplZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5fZmlsdGVycy5oYXNBY3RpdmVGaWx0ZXJzKCkpIHtcbiAgICAgIHRoaXMuX2ZpbHRlcmVkID0gdGhpcy5fYWxsLmZpbHRlcihpdGVtID0+IHRoaXMuX2ZpbHRlcnMuYWNjZXB0cyhpdGVtKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFdvcmsgb24gYSBzaGFsbG93IGNvcHkgb2YgdGhlIGFycmF5LCB0byBub3QgbW9kaWZ5IHRoZSB1c2VyJ3MgbW9kZWxcbiAgICAgIHRoaXMuX2ZpbHRlcmVkID0gdGhpcy5fYWxsLnNsaWNlKCk7XG4gICAgfVxuICAgIHRoaXMuX3BhZ2UudG90YWxJdGVtcyA9IHRoaXMuX2ZpbHRlcmVkLmxlbmd0aDtcbiAgICB0aGlzLl9zb3J0SXRlbXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTb3J0cyBpdGVtcyBpbiB0aGUgZmlsdGVyZWQgbGlzdFxuICAgKi9cbiAgcHJpdmF0ZSBfc29ydEl0ZW1zKCkge1xuICAgIGlmICh0aGlzLnVuaW5pdGlhbGl6ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMuX3NvcnQuY29tcGFyYXRvcikge1xuICAgICAgdGhpcy5fZmlsdGVyZWQuc29ydCgoYSwgYikgPT4gdGhpcy5fc29ydC5jb21wYXJlKGEsIGIpKTtcbiAgICB9XG4gICAgdGhpcy5fY2hhbmdlUGFnZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4dHJhY3RzIHRoZSBjdXJyZW50IHBhZ2UgZnJvbSB0aGUgc29ydGVkIGxpc3RcbiAgICovXG4gIHByaXZhdGUgX2NoYW5nZVBhZ2UoKSB7XG4gICAgLy8gSWYgd2Uga25vdyB3ZSBoYXZlIHBhZ2luYXRpb24gYnV0IHRoZSBwYWdlIHNpemUgaGFzbid0IGJlZW4gc2V0IHlldCwgd2Ugd2FpdCBmb3IgaXQuXG4gICAgaWYgKHRoaXMudW5pbml0aWFsaXplZCB8fCAodGhpcy5fcGFnZS5hY3RpdmF0ZWQgJiYgdGhpcy5fcGFnZS5zaXplID09PSAwKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5fcGFnZS5zaXplID4gMCkge1xuICAgICAgdGhpcy5fZGlzcGxheWVkID0gdGhpcy5fZmlsdGVyZWQuc2xpY2UodGhpcy5fcGFnZS5maXJzdEl0ZW0sIHRoaXMuX3BhZ2UubGFzdEl0ZW0gKyAxKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZGlzcGxheWVkID0gdGhpcy5fZmlsdGVyZWQ7XG4gICAgfVxuICAgIHRoaXMuZW1pdENoYW5nZSgpO1xuICB9XG59XG4iXX0=