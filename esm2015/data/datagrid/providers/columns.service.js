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
export class ColumnsService {
    constructor() {
        this.columns = [];
    }
    /**
     * @return {?}
     */
    get columnStates() {
        return this.columns.map((/**
         * @param {?} column
         * @return {?}
         */
        column => column.value));
    }
    /**
     * @return {?}
     */
    get hasHideableColumns() {
        return this.columnStates.filter((/**
         * @param {?} state
         * @return {?}
         */
        state => state.hideable)).length > 0;
    }
    // Helper method to emit a change to a column only when there is an actual diff to process for that column
    /**
     * @param {?} columnIndex
     * @param {?} diff
     * @return {?}
     */
    emitStateChangeAt(columnIndex, diff) {
        if (!this.columns[columnIndex]) {
            return;
        }
        this.emitStateChange(this.columns[columnIndex], diff);
    }
    /**
     * @param {?} column
     * @param {?} diff
     * @return {?}
     */
    emitStateChange(column, diff) {
        /** @type {?} */
        const current = column.value;
        column.next(Object.assign({}, current, diff));
    }
}
ColumnsService.decorators = [
    { type: Injectable }
];
if (false) {
    /** @type {?} */
    ColumnsService.prototype.columns;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1ucy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9wcm92aWRlcnMvY29sdW1ucy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFLM0MsTUFBTSxPQUFPLGNBQWM7SUFEM0I7UUFFRSxZQUFPLEdBQW1DLEVBQUUsQ0FBQztJQXNCL0MsQ0FBQzs7OztJQXBCQyxJQUFJLFlBQVk7UUFDZCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRzs7OztRQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBQyxDQUFDO0lBQ2xELENBQUM7Ozs7SUFFRCxJQUFJLGtCQUFrQjtRQUNwQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTTs7OztRQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDdEUsQ0FBQzs7Ozs7OztJQUdELGlCQUFpQixDQUFDLFdBQW1CLEVBQUUsSUFBcUI7UUFDMUQsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDOUIsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3hELENBQUM7Ozs7OztJQUVELGVBQWUsQ0FBQyxNQUFvQyxFQUFFLElBQXFCOztjQUNuRSxPQUFPLEdBQUcsTUFBTSxDQUFDLEtBQUs7UUFDNUIsTUFBTSxDQUFDLElBQUksbUJBQU0sT0FBTyxFQUFLLElBQUksRUFBRyxDQUFDO0lBQ3ZDLENBQUM7OztZQXZCRixVQUFVOzs7O0lBRVQsaUNBQTZDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBDb2x1bW5TdGF0ZURpZmYsIENvbHVtblN0YXRlIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9jb2x1bW4tc3RhdGUuaW50ZXJmYWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENvbHVtbnNTZXJ2aWNlIHtcbiAgY29sdW1uczogQmVoYXZpb3JTdWJqZWN0PENvbHVtblN0YXRlPltdID0gW107XG5cbiAgZ2V0IGNvbHVtblN0YXRlcygpOiBDb2x1bW5TdGF0ZVtdIHtcbiAgICByZXR1cm4gdGhpcy5jb2x1bW5zLm1hcChjb2x1bW4gPT4gY29sdW1uLnZhbHVlKTtcbiAgfVxuXG4gIGdldCBoYXNIaWRlYWJsZUNvbHVtbnMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY29sdW1uU3RhdGVzLmZpbHRlcihzdGF0ZSA9PiBzdGF0ZS5oaWRlYWJsZSkubGVuZ3RoID4gMDtcbiAgfVxuXG4gIC8vIEhlbHBlciBtZXRob2QgdG8gZW1pdCBhIGNoYW5nZSB0byBhIGNvbHVtbiBvbmx5IHdoZW4gdGhlcmUgaXMgYW4gYWN0dWFsIGRpZmYgdG8gcHJvY2VzcyBmb3IgdGhhdCBjb2x1bW5cbiAgZW1pdFN0YXRlQ2hhbmdlQXQoY29sdW1uSW5kZXg6IG51bWJlciwgZGlmZjogQ29sdW1uU3RhdGVEaWZmKSB7XG4gICAgaWYgKCF0aGlzLmNvbHVtbnNbY29sdW1uSW5kZXhdKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuZW1pdFN0YXRlQ2hhbmdlKHRoaXMuY29sdW1uc1tjb2x1bW5JbmRleF0sIGRpZmYpO1xuICB9XG5cbiAgZW1pdFN0YXRlQ2hhbmdlKGNvbHVtbjogQmVoYXZpb3JTdWJqZWN0PENvbHVtblN0YXRlPiwgZGlmZjogQ29sdW1uU3RhdGVEaWZmKSB7XG4gICAgY29uc3QgY3VycmVudCA9IGNvbHVtbi52YWx1ZTtcbiAgICBjb2x1bW4ubmV4dCh7IC4uLmN1cnJlbnQsIC4uLmRpZmYgfSk7XG4gIH1cbn1cbiJdfQ==