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
import { BehaviorSubject } from 'rxjs';
/**
 *
 * \@description
 * An \@Injectable provider class that enables
 *
 * 1. Managing, track hideability of DatagridColumns
 *
 */
export class HideableColumnService {
    constructor() {
        /**
         * *******
         * \@property dgHiddenColumnMap
         *
         * \@description
         * An array of DatagridHideableColumn.
         * NOTE: because we can have columns w/o the *clrDgHideableColumn directive
         * this array will have empty spaces a.k.a nulls. This is needed to be able to map
         * DatagridCells to DatagridColumns in the RowRenderer.
         *
         */
        this._columnList = [];
        /**
         * *******
         *
         * \@property dgHiddenColumnMapChange
         *
         * \@description
         * A behavior subject that can broadcast updates to the column list.
         * NOTE: I am using BehaviorSubject because <clr-dg-column-toggle> is not getting the latest _columnListChange
         * on page load.
         *
         */
        this._columnListChange = new BehaviorSubject(this._columnList);
    }
    /**
     * *******
     *
     * \@property canHideNextColumn
     *
     * \@description
     * Service function that is called by clr-dg-column-toggle component. Use this if you need to ask if you can hide
     * a column. It acts as a guard against hiding all the columns making sure there is at least one column displayed.
     *
     * @return {?}
     */
    get canHideNextColumn() {
        /** @type {?} */
        const hiddenColumns = this._columnList.filter((/**
         * @param {?} column
         * @return {?}
         */
        column => column !== undefined)).filter((/**
         * @param {?} column
         * @return {?}
         */
        column => column.hidden));
        return this._columnList.length - hiddenColumns.length > 1;
    }
    /**
     * *******
     *
     * \@property checkForAllColumnsVisible
     *
     * \@description
     * For when you need to know if the datagrid's columns are all showing.
     *
     * @return {?}
     */
    get checkForAllColumnsVisible() {
        return !this._columnList.some((/**
         * @param {?} column
         * @return {?}
         */
        column => column && column.hidden));
    }
    /**
     * ********
     * \@property columnListChange
     *
     * \@description
     * A public property that enables subscribers to hear updates to the column map.
     * Use this if you need to do something whenever the Datagrid's column list is changed (i.e *ngIf on a column).
     *
     * @return {?}
     */
    get columnListChange() {
        return this._columnListChange.asObservable();
    }
    /**
     * *******
     *
     * \@description
     * Public function that returns the current list of columns. I needed an array of to iterate on in the RowRenderer
     * but subscribing to the _columnListChange changes did not seem like the correct way to get it.
     *
     * @return {?}
     */
    getColumns() {
        return this._columnList;
    }
    /**
     * *******
     *
     * \@description
     * Iterate through the current _columnList:
     * - if it has a DatagridHideableColumn and is hidden then show it.
     * - if it's DatagridHideableColumn was previously the last column visible, turn that flag off.
     *
     * @return {?}
     */
    showHiddenColumns() {
        this._columnList.forEach((/**
         * @param {?} column
         * @return {?}
         */
        column => {
            if (column && column.hidden === true) {
                column.hidden = false;
            }
            if (column && column.lastVisibleColumn) {
                column.lastVisibleColumn = false;
            }
        }));
    }
    /**
     *
     * \@description
     * Creates an array of DatagridHideableColumn's || null based column array passed as param.
     * Is dependent on the order in \@ContentChildren in Datagrid.
     *
     * @param {?} columns
     * @return {?}
     */
    updateColumnList(columns) {
        this._columnList = columns; // clear the list
        this.updateForLastVisibleColumn(); // Update our visibility state for UI
        this._columnListChange.next(this._columnList); // Broadcast it
    }
    /**
     * *******
     *
     * \@description
     * Gets the current visible count for all columns.
     * When it is greater than 1 it marks everything as false for the lastVisibleColumn.
     * When visible count is not > 1 (i.e) 1. , it finds the only column that is not hidden and marks it as the
     * lastVisibleColumn.
     *
     * @return {?}
     */
    updateForLastVisibleColumn() {
        // There is more than one column showing, make sure nothing is marked lastVisibleColumn
        if (this.canHideNextColumn) {
            this._columnList.map((/**
             * @param {?} column
             * @return {?}
             */
            column => {
                if (column && column.lastVisibleColumn) {
                    column.lastVisibleColumn = false;
                }
            }));
        }
        else {
            // The visibleCount is down to only one column showing. Find it and flag it as the lastVisibleColumn
            this._columnList.map((/**
             * @param {?} column
             * @return {?}
             */
            column => {
                if (column && !column.hidden) {
                    column.lastVisibleColumn = true;
                }
            }));
        }
    }
    /**
     * *******
     *
     * \@description
     * Return a HideableColumn in this._columnList for the given id.
     *
     *
     * @param {?} id
     * @return {?}
     */
    getColumnById(id) {
        if (id) {
            return this._columnList.find((/**
             * @param {?} column
             * @return {?}
             */
            column => column && column.id === id));
        }
        return;
    }
}
HideableColumnService.decorators = [
    { type: Injectable }
];
if (false) {
    /**
     * *******
     * \@property dgHiddenColumnMap
     *
     * \@description
     * An array of DatagridHideableColumn.
     * NOTE: because we can have columns w/o the *clrDgHideableColumn directive
     * this array will have empty spaces a.k.a nulls. This is needed to be able to map
     * DatagridCells to DatagridColumns in the RowRenderer.
     *
     * @type {?}
     * @private
     */
    HideableColumnService.prototype._columnList;
    /**
     * *******
     *
     * \@property dgHiddenColumnMapChange
     *
     * \@description
     * A behavior subject that can broadcast updates to the column list.
     * NOTE: I am using BehaviorSubject because <clr-dg-column-toggle> is not getting the latest _columnListChange
     * on page load.
     *
     * @type {?}
     * @private
     */
    HideableColumnService.prototype._columnListChange;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlkZWFibGUtY29sdW1uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJkYXRhL2RhdGFncmlkL3Byb3ZpZGVycy9oaWRlYWJsZS1jb2x1bW4uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFNQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7Ozs7Ozs7OztBQWN2QyxNQUFNLE9BQU8scUJBQXFCO0lBRGxDOzs7Ozs7Ozs7Ozs7UUFZVSxnQkFBVyxHQUFrQyxFQUFFLENBQUM7Ozs7Ozs7Ozs7OztRQVloRCxzQkFBaUIsR0FBbUQsSUFBSSxlQUFlLENBRTdGLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQThIdEIsQ0FBQzs7Ozs7Ozs7Ozs7O0lBbkhDLElBQVcsaUJBQWlCOztjQUNwQixhQUFhLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNOzs7O1FBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEtBQUssU0FBUyxFQUFDLENBQUMsTUFBTTs7OztRQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBQztRQUM3RyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQzVELENBQUM7Ozs7Ozs7Ozs7O0lBVUQsSUFBVyx5QkFBeUI7UUFDbEMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSTs7OztRQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUMsQ0FBQztJQUNuRSxDQUFDOzs7Ozs7Ozs7OztJQVVELElBQVcsZ0JBQWdCO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxDQUFDO0lBQy9DLENBQUM7Ozs7Ozs7Ozs7SUFTTSxVQUFVO1FBQ2YsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzFCLENBQUM7Ozs7Ozs7Ozs7O0lBVU0saUJBQWlCO1FBQ3RCLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTzs7OztRQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ2hDLElBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUssSUFBSSxFQUFFO2dCQUNwQyxNQUFNLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQzthQUN2QjtZQUVELElBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRTtnQkFDdEMsTUFBTSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQzthQUNsQztRQUNILENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7Ozs7OztJQVdNLGdCQUFnQixDQUFDLE9BQXNDO1FBQzVELElBQUksQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLENBQUMsaUJBQWlCO1FBQzdDLElBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFDLENBQUMscUNBQXFDO1FBQ3hFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsZUFBZTtJQUNoRSxDQUFDOzs7Ozs7Ozs7Ozs7SUFXTSwwQkFBMEI7UUFDL0IsdUZBQXVGO1FBQ3ZGLElBQUksSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQzFCLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRzs7OztZQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUM1QixJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsaUJBQWlCLEVBQUU7b0JBQ3RDLE1BQU0sQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7aUJBQ2xDO1lBQ0gsQ0FBQyxFQUFDLENBQUM7U0FDSjthQUFNO1lBQ0wsb0dBQW9HO1lBQ3BHLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRzs7OztZQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUM1QixJQUFJLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUU7b0JBQzVCLE1BQU0sQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7aUJBQ2pDO1lBQ0gsQ0FBQyxFQUFDLENBQUM7U0FDSjtJQUNILENBQUM7Ozs7Ozs7Ozs7O0lBU00sYUFBYSxDQUFDLEVBQVU7UUFDN0IsSUFBSSxFQUFFLEVBQUU7WUFDTixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSTs7OztZQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFDLENBQUM7U0FDcEU7UUFDRCxPQUFPO0lBQ1QsQ0FBQzs7O1lBdkpGLFVBQVU7Ozs7Ozs7Ozs7Ozs7Ozs7SUFZVCw0Q0FBd0Q7Ozs7Ozs7Ozs7Ozs7O0lBWXhELGtEQUVvQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IERhdGFncmlkSGlkZWFibGVDb2x1bW5Nb2RlbCB9IGZyb20gJy4uL2RhdGFncmlkLWhpZGVhYmxlLWNvbHVtbi5tb2RlbCc7XG5cbi8qKlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogQW4gQEluamVjdGFibGUgcHJvdmlkZXIgY2xhc3MgdGhhdCBlbmFibGVzXG4gKlxuICogMS4gTWFuYWdpbmcsIHRyYWNrIGhpZGVhYmlsaXR5IG9mIERhdGFncmlkQ29sdW1uc1xuICpcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEhpZGVhYmxlQ29sdW1uU2VydmljZSB7XG4gIC8qKioqKioqKioqXG4gICAqIEBwcm9wZXJ0eSBkZ0hpZGRlbkNvbHVtbk1hcFxuICAgKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogQW4gYXJyYXkgb2YgRGF0YWdyaWRIaWRlYWJsZUNvbHVtbi5cbiAgICogTk9URTogYmVjYXVzZSB3ZSBjYW4gaGF2ZSBjb2x1bW5zIHcvbyB0aGUgKmNsckRnSGlkZWFibGVDb2x1bW4gZGlyZWN0aXZlXG4gICAqIHRoaXMgYXJyYXkgd2lsbCBoYXZlIGVtcHR5IHNwYWNlcyBhLmsuYSBudWxscy4gVGhpcyBpcyBuZWVkZWQgdG8gYmUgYWJsZSB0byBtYXBcbiAgICogRGF0YWdyaWRDZWxscyB0byBEYXRhZ3JpZENvbHVtbnMgaW4gdGhlIFJvd1JlbmRlcmVyLlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBfY29sdW1uTGlzdDogRGF0YWdyaWRIaWRlYWJsZUNvbHVtbk1vZGVsW10gPSBbXTtcblxuICAvKioqKioqKioqKlxuICAgKlxuICAgKiBAcHJvcGVydHkgZGdIaWRkZW5Db2x1bW5NYXBDaGFuZ2VcbiAgICpcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIEEgYmVoYXZpb3Igc3ViamVjdCB0aGF0IGNhbiBicm9hZGNhc3QgdXBkYXRlcyB0byB0aGUgY29sdW1uIGxpc3QuXG4gICAqIE5PVEU6IEkgYW0gdXNpbmcgQmVoYXZpb3JTdWJqZWN0IGJlY2F1c2UgPGNsci1kZy1jb2x1bW4tdG9nZ2xlPiBpcyBub3QgZ2V0dGluZyB0aGUgbGF0ZXN0IF9jb2x1bW5MaXN0Q2hhbmdlXG4gICAqIG9uIHBhZ2UgbG9hZC5cbiAgICpcbiAgICovXG4gIHByaXZhdGUgX2NvbHVtbkxpc3RDaGFuZ2U6IEJlaGF2aW9yU3ViamVjdDxEYXRhZ3JpZEhpZGVhYmxlQ29sdW1uTW9kZWxbXT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFxuICAgIERhdGFncmlkSGlkZWFibGVDb2x1bW5Nb2RlbFtdXG4gID4odGhpcy5fY29sdW1uTGlzdCk7XG5cbiAgLyoqKioqKioqKipcbiAgICpcbiAgICogQHByb3BlcnR5IGNhbkhpZGVOZXh0Q29sdW1uXG4gICAqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBTZXJ2aWNlIGZ1bmN0aW9uIHRoYXQgaXMgY2FsbGVkIGJ5IGNsci1kZy1jb2x1bW4tdG9nZ2xlIGNvbXBvbmVudC4gVXNlIHRoaXMgaWYgeW91IG5lZWQgdG8gYXNrIGlmIHlvdSBjYW4gaGlkZVxuICAgKiBhIGNvbHVtbi4gSXQgYWN0cyBhcyBhIGd1YXJkIGFnYWluc3QgaGlkaW5nIGFsbCB0aGUgY29sdW1ucyBtYWtpbmcgc3VyZSB0aGVyZSBpcyBhdCBsZWFzdCBvbmUgY29sdW1uIGRpc3BsYXllZC5cbiAgICpcbiAgICovXG4gIHB1YmxpYyBnZXQgY2FuSGlkZU5leHRDb2x1bW4oKTogYm9vbGVhbiB7XG4gICAgY29uc3QgaGlkZGVuQ29sdW1ucyA9IHRoaXMuX2NvbHVtbkxpc3QuZmlsdGVyKGNvbHVtbiA9PiBjb2x1bW4gIT09IHVuZGVmaW5lZCkuZmlsdGVyKGNvbHVtbiA9PiBjb2x1bW4uaGlkZGVuKTtcbiAgICByZXR1cm4gdGhpcy5fY29sdW1uTGlzdC5sZW5ndGggLSBoaWRkZW5Db2x1bW5zLmxlbmd0aCA+IDE7XG4gIH1cblxuICAvKioqKioqKioqKlxuICAgKlxuICAgKiBAcHJvcGVydHkgY2hlY2tGb3JBbGxDb2x1bW5zVmlzaWJsZVxuICAgKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogRm9yIHdoZW4geW91IG5lZWQgdG8ga25vdyBpZiB0aGUgZGF0YWdyaWQncyBjb2x1bW5zIGFyZSBhbGwgc2hvd2luZy5cbiAgICpcbiAgICovXG4gIHB1YmxpYyBnZXQgY2hlY2tGb3JBbGxDb2x1bW5zVmlzaWJsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIXRoaXMuX2NvbHVtbkxpc3Quc29tZShjb2x1bW4gPT4gY29sdW1uICYmIGNvbHVtbi5oaWRkZW4pO1xuICB9XG5cbiAgLyoqKioqKioqKioqXG4gICAqIEBwcm9wZXJ0eSBjb2x1bW5MaXN0Q2hhbmdlXG4gICAqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBBIHB1YmxpYyBwcm9wZXJ0eSB0aGF0IGVuYWJsZXMgc3Vic2NyaWJlcnMgdG8gaGVhciB1cGRhdGVzIHRvIHRoZSBjb2x1bW4gbWFwLlxuICAgKiBVc2UgdGhpcyBpZiB5b3UgbmVlZCB0byBkbyBzb21ldGhpbmcgd2hlbmV2ZXIgdGhlIERhdGFncmlkJ3MgY29sdW1uIGxpc3QgaXMgY2hhbmdlZCAoaS5lICpuZ0lmIG9uIGEgY29sdW1uKS5cbiAgICpcbiAgICovXG4gIHB1YmxpYyBnZXQgY29sdW1uTGlzdENoYW5nZSgpOiBPYnNlcnZhYmxlPERhdGFncmlkSGlkZWFibGVDb2x1bW5Nb2RlbFtdPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbHVtbkxpc3RDaGFuZ2UuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICAvKioqKioqKioqKlxuICAgKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogUHVibGljIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgY3VycmVudCBsaXN0IG9mIGNvbHVtbnMuIEkgbmVlZGVkIGFuIGFycmF5IG9mIHRvIGl0ZXJhdGUgb24gaW4gdGhlIFJvd1JlbmRlcmVyXG4gICAqIGJ1dCBzdWJzY3JpYmluZyB0byB0aGUgX2NvbHVtbkxpc3RDaGFuZ2UgY2hhbmdlcyBkaWQgbm90IHNlZW0gbGlrZSB0aGUgY29ycmVjdCB3YXkgdG8gZ2V0IGl0LlxuICAgKlxuICAgKi9cbiAgcHVibGljIGdldENvbHVtbnMoKTogRGF0YWdyaWRIaWRlYWJsZUNvbHVtbk1vZGVsW10ge1xuICAgIHJldHVybiB0aGlzLl9jb2x1bW5MaXN0O1xuICB9XG5cbiAgLyoqKioqKioqKipcbiAgICpcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIEl0ZXJhdGUgdGhyb3VnaCB0aGUgY3VycmVudCBfY29sdW1uTGlzdDpcbiAgICogLSBpZiBpdCBoYXMgYSBEYXRhZ3JpZEhpZGVhYmxlQ29sdW1uIGFuZCBpcyBoaWRkZW4gdGhlbiBzaG93IGl0LlxuICAgKiAtIGlmIGl0J3MgRGF0YWdyaWRIaWRlYWJsZUNvbHVtbiB3YXMgcHJldmlvdXNseSB0aGUgbGFzdCBjb2x1bW4gdmlzaWJsZSwgdHVybiB0aGF0IGZsYWcgb2ZmLlxuICAgKlxuICAgKi9cbiAgcHVibGljIHNob3dIaWRkZW5Db2x1bW5zKCkge1xuICAgIHRoaXMuX2NvbHVtbkxpc3QuZm9yRWFjaChjb2x1bW4gPT4ge1xuICAgICAgaWYgKGNvbHVtbiAmJiBjb2x1bW4uaGlkZGVuID09PSB0cnVlKSB7XG4gICAgICAgIGNvbHVtbi5oaWRkZW4gPSBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNvbHVtbiAmJiBjb2x1bW4ubGFzdFZpc2libGVDb2x1bW4pIHtcbiAgICAgICAgY29sdW1uLmxhc3RWaXNpYmxlQ29sdW1uID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIGNvbHVtbnM6IERhdGFncmlkQ29sdW1uW11cbiAgICpcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgRGF0YWdyaWRIaWRlYWJsZUNvbHVtbidzIHx8IG51bGwgYmFzZWQgY29sdW1uIGFycmF5IHBhc3NlZCBhcyBwYXJhbS5cbiAgICogSXMgZGVwZW5kZW50IG9uIHRoZSBvcmRlciBpbiBAQ29udGVudENoaWxkcmVuIGluIERhdGFncmlkLlxuICAgKlxuICAgKi9cbiAgcHVibGljIHVwZGF0ZUNvbHVtbkxpc3QoY29sdW1uczogRGF0YWdyaWRIaWRlYWJsZUNvbHVtbk1vZGVsW10pIHtcbiAgICB0aGlzLl9jb2x1bW5MaXN0ID0gY29sdW1uczsgLy8gY2xlYXIgdGhlIGxpc3RcbiAgICB0aGlzLnVwZGF0ZUZvckxhc3RWaXNpYmxlQ29sdW1uKCk7IC8vIFVwZGF0ZSBvdXIgdmlzaWJpbGl0eSBzdGF0ZSBmb3IgVUlcbiAgICB0aGlzLl9jb2x1bW5MaXN0Q2hhbmdlLm5leHQodGhpcy5fY29sdW1uTGlzdCk7IC8vIEJyb2FkY2FzdCBpdFxuICB9XG5cbiAgLyoqKioqKioqKipcbiAgICpcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIEdldHMgdGhlIGN1cnJlbnQgdmlzaWJsZSBjb3VudCBmb3IgYWxsIGNvbHVtbnMuXG4gICAqIFdoZW4gaXQgaXMgZ3JlYXRlciB0aGFuIDEgaXQgbWFya3MgZXZlcnl0aGluZyBhcyBmYWxzZSBmb3IgdGhlIGxhc3RWaXNpYmxlQ29sdW1uLlxuICAgKiBXaGVuIHZpc2libGUgY291bnQgaXMgbm90ID4gMSAoaS5lKSAxLiAsIGl0IGZpbmRzIHRoZSBvbmx5IGNvbHVtbiB0aGF0IGlzIG5vdCBoaWRkZW4gYW5kIG1hcmtzIGl0IGFzIHRoZVxuICAgKiBsYXN0VmlzaWJsZUNvbHVtbi5cbiAgICpcbiAgICovXG4gIHB1YmxpYyB1cGRhdGVGb3JMYXN0VmlzaWJsZUNvbHVtbigpOiB2b2lkIHtcbiAgICAvLyBUaGVyZSBpcyBtb3JlIHRoYW4gb25lIGNvbHVtbiBzaG93aW5nLCBtYWtlIHN1cmUgbm90aGluZyBpcyBtYXJrZWQgbGFzdFZpc2libGVDb2x1bW5cbiAgICBpZiAodGhpcy5jYW5IaWRlTmV4dENvbHVtbikge1xuICAgICAgdGhpcy5fY29sdW1uTGlzdC5tYXAoY29sdW1uID0+IHtcbiAgICAgICAgaWYgKGNvbHVtbiAmJiBjb2x1bW4ubGFzdFZpc2libGVDb2x1bW4pIHtcbiAgICAgICAgICBjb2x1bW4ubGFzdFZpc2libGVDb2x1bW4gPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFRoZSB2aXNpYmxlQ291bnQgaXMgZG93biB0byBvbmx5IG9uZSBjb2x1bW4gc2hvd2luZy4gRmluZCBpdCBhbmQgZmxhZyBpdCBhcyB0aGUgbGFzdFZpc2libGVDb2x1bW5cbiAgICAgIHRoaXMuX2NvbHVtbkxpc3QubWFwKGNvbHVtbiA9PiB7XG4gICAgICAgIGlmIChjb2x1bW4gJiYgIWNvbHVtbi5oaWRkZW4pIHtcbiAgICAgICAgICBjb2x1bW4ubGFzdFZpc2libGVDb2x1bW4gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKioqKioqKioqKlxuICAgKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogUmV0dXJuIGEgSGlkZWFibGVDb2x1bW4gaW4gdGhpcy5fY29sdW1uTGlzdCBmb3IgdGhlIGdpdmVuIGlkLlxuICAgKlxuICAgKlxuICAgKi9cbiAgcHVibGljIGdldENvbHVtbkJ5SWQoaWQ6IHN0cmluZyk6IHVuZGVmaW5lZCB8IERhdGFncmlkSGlkZWFibGVDb2x1bW5Nb2RlbCB7XG4gICAgaWYgKGlkKSB7XG4gICAgICByZXR1cm4gdGhpcy5fY29sdW1uTGlzdC5maW5kKGNvbHVtbiA9PiBjb2x1bW4gJiYgY29sdW1uLmlkID09PSBpZCk7XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxufVxuIl19