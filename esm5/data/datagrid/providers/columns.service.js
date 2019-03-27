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
import { DatagridRenderStep } from '../enums/render-step.enum';
import { DatagridRenderOrganizer } from '../render/render-organizer';
var ColumnsService = /** @class */ (function () {
    function ColumnsService(organizer) {
        var _this = this;
        this.organizer = organizer;
        this.subscriptions = [];
        this.columns = [];
        this.subscriptions.push(this.organizer.filterRenderSteps(DatagridRenderStep.CLEAR_WIDTHS).subscribe((/**
         * @return {?}
         */
        function () { return _this.reset(); })));
    }
    /**
     * @return {?}
     */
    ColumnsService.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        function (sub) { return sub.unsubscribe(); }));
    };
    /**
     * @private
     * @return {?}
     */
    ColumnsService.prototype.reset = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.columns.forEach((/**
         * @param {?} column
         * @param {?} index
         * @return {?}
         */
        function (column, index) {
            _this.emitStateChange(index, { width: 0 });
        }));
    };
    // Helper method to emit a change to a column only when there is an actual diff to process for that column
    // Helper method to emit a change to a column only when there is an actual diff to process for that column
    /**
     * @param {?} columnIndex
     * @param {?} diff
     * @return {?}
     */
    ColumnsService.prototype.emitStateChange = 
    // Helper method to emit a change to a column only when there is an actual diff to process for that column
    /**
     * @param {?} columnIndex
     * @param {?} diff
     * @return {?}
     */
    function (columnIndex, diff) {
        if (!this.columns[columnIndex]) {
            return;
        }
        /** @type {?} */
        var current = this.columns[columnIndex].value;
        /** @type {?} */
        var hasChange = Object.keys(diff).filter((/**
         * @param {?} key
         * @return {?}
         */
        function (key) { return diff[key] !== current[key]; }));
        if (hasChange) {
            this.columns[columnIndex].next(tslib_1.__assign({}, current, diff));
        }
    };
    ColumnsService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    ColumnsService.ctorParameters = function () { return [
        { type: DatagridRenderOrganizer }
    ]; };
    return ColumnsService;
}());
export { ColumnsService };
if (false) {
    /** @type {?} */
    ColumnsService.prototype.subscriptions;
    /** @type {?} */
    ColumnsService.prototype.columns;
    /**
     * @type {?}
     * @private
     */
    ColumnsService.prototype.organizer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1ucy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9wcm92aWRlcnMvY29sdW1ucy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFLQSxPQUFPLEVBQUUsVUFBVSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBR3RELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQy9ELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRXJFO0lBS0Usd0JBQW9CLFNBQWtDO1FBQXRELGlCQUlDO1FBSm1CLGNBQVMsR0FBVCxTQUFTLENBQXlCO1FBSHRELGtCQUFhLEdBQW1CLEVBQUUsQ0FBQztRQUNuQyxZQUFPLEdBQTJDLEVBQUUsQ0FBQztRQUduRCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FDckIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsQ0FBQyxTQUFTOzs7UUFBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLEtBQUssRUFBRSxFQUFaLENBQVksRUFBQyxDQUNoRyxDQUFDO0lBQ0osQ0FBQzs7OztJQUVELG9DQUFXOzs7SUFBWDtRQUNFLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTzs7OztRQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLFdBQVcsRUFBRSxFQUFqQixDQUFpQixFQUFDLENBQUM7SUFDdkQsQ0FBQzs7Ozs7SUFFTyw4QkFBSzs7OztJQUFiO1FBQUEsaUJBSUM7UUFIQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU87Ozs7O1FBQUMsVUFBQyxNQUFNLEVBQUUsS0FBSztZQUNqQyxLQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzVDLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELDBHQUEwRzs7Ozs7OztJQUMxRyx3Q0FBZTs7Ozs7OztJQUFmLFVBQWdCLFdBQW1CLEVBQUUsSUFBa0M7UUFDckUsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDOUIsT0FBTztTQUNSOztZQUNLLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUs7O1lBQ3pDLFNBQVMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU07Ozs7UUFBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQTFCLENBQTBCLEVBQUM7UUFFN0UsSUFBSSxTQUFTLEVBQUU7WUFDYixJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksc0JBQU0sT0FBTyxFQUFLLElBQUksRUFBRyxDQUFDO1NBQ3pEO0lBQ0gsQ0FBQzs7Z0JBaENGLFVBQVU7Ozs7Z0JBRkYsdUJBQXVCOztJQW1DaEMscUJBQUM7Q0FBQSxBQWpDRCxJQWlDQztTQWhDWSxjQUFjOzs7SUFDekIsdUNBQW1DOztJQUNuQyxpQ0FBcUQ7Ozs7O0lBRXpDLG1DQUEwQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IERhdGFncmlkQ29sdW1uU3RhdGUgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2NvbHVtbi1zdGF0ZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgRGF0YWdyaWRSZW5kZXJTdGVwIH0gZnJvbSAnLi4vZW51bXMvcmVuZGVyLXN0ZXAuZW51bSc7XG5pbXBvcnQgeyBEYXRhZ3JpZFJlbmRlck9yZ2FuaXplciB9IGZyb20gJy4uL3JlbmRlci9yZW5kZXItb3JnYW5pemVyJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENvbHVtbnNTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcbiAgY29sdW1uczogQmVoYXZpb3JTdWJqZWN0PERhdGFncmlkQ29sdW1uU3RhdGU+W10gPSBbXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG9yZ2FuaXplcjogRGF0YWdyaWRSZW5kZXJPcmdhbml6ZXIpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMub3JnYW5pemVyLmZpbHRlclJlbmRlclN0ZXBzKERhdGFncmlkUmVuZGVyU3RlcC5DTEVBUl9XSURUSFMpLnN1YnNjcmliZSgoKSA9PiB0aGlzLnJlc2V0KCkpXG4gICAgKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHN1YiA9PiBzdWIudW5zdWJzY3JpYmUoKSk7XG4gIH1cblxuICBwcml2YXRlIHJlc2V0KCkge1xuICAgIHRoaXMuY29sdW1ucy5mb3JFYWNoKChjb2x1bW4sIGluZGV4KSA9PiB7XG4gICAgICB0aGlzLmVtaXRTdGF0ZUNoYW5nZShpbmRleCwgeyB3aWR0aDogMCB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIEhlbHBlciBtZXRob2QgdG8gZW1pdCBhIGNoYW5nZSB0byBhIGNvbHVtbiBvbmx5IHdoZW4gdGhlcmUgaXMgYW4gYWN0dWFsIGRpZmYgdG8gcHJvY2VzcyBmb3IgdGhhdCBjb2x1bW5cbiAgZW1pdFN0YXRlQ2hhbmdlKGNvbHVtbkluZGV4OiBudW1iZXIsIGRpZmY6IFBhcnRpYWw8RGF0YWdyaWRDb2x1bW5TdGF0ZT4pIHtcbiAgICBpZiAoIXRoaXMuY29sdW1uc1tjb2x1bW5JbmRleF0pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgY3VycmVudCA9IHRoaXMuY29sdW1uc1tjb2x1bW5JbmRleF0udmFsdWU7XG4gICAgY29uc3QgaGFzQ2hhbmdlID0gT2JqZWN0LmtleXMoZGlmZikuZmlsdGVyKGtleSA9PiBkaWZmW2tleV0gIT09IGN1cnJlbnRba2V5XSk7XG5cbiAgICBpZiAoaGFzQ2hhbmdlKSB7XG4gICAgICB0aGlzLmNvbHVtbnNbY29sdW1uSW5kZXhdLm5leHQoeyAuLi5jdXJyZW50LCAuLi5kaWZmIH0pO1xuICAgIH1cbiAgfVxufVxuIl19