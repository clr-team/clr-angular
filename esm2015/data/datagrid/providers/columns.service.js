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
import { DatagridRenderStep } from '../enums/render-step.enum';
import { DatagridRenderOrganizer } from '../render/render-organizer';
export class ColumnsService {
    /**
     * @param {?} organizer
     */
    constructor(organizer) {
        this.organizer = organizer;
        this.subscriptions = [];
        this.columns = [];
        this.subscriptions.push(this.organizer.filterRenderSteps(DatagridRenderStep.CLEAR_WIDTHS).subscribe(() => this.reset()));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
    /**
     * @return {?}
     */
    reset() {
        this.columns.forEach((column, index) => {
            this.emitStateChange(index, { width: 0 });
        });
    }
    // Helper method to emit a change to a column only when there is an actual diff to process for that column
    /**
     * @param {?} columnIndex
     * @param {?} diff
     * @return {?}
     */
    emitStateChange(columnIndex, diff) {
        if (!this.columns[columnIndex]) {
            return;
        }
        /** @type {?} */
        const current = this.columns[columnIndex].value;
        /** @type {?} */
        const hasChange = Object.keys(diff).filter(key => diff[key] !== current[key]);
        if (hasChange) {
            this.columns[columnIndex].next(Object.assign({}, current, diff));
        }
    }
}
ColumnsService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ColumnsService.ctorParameters = () => [
    { type: DatagridRenderOrganizer }
];
if (false) {
    /** @type {?} */
    ColumnsService.prototype.subscriptions;
    /** @type {?} */
    ColumnsService.prototype.columns;
    /** @type {?} */
    ColumnsService.prototype.organizer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1ucy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9wcm92aWRlcnMvY29sdW1ucy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtBLE9BQU8sRUFBRSxVQUFVLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFHdEQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDL0QsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFHckUsTUFBTSxPQUFPLGNBQWM7Ozs7SUFJekIsWUFBb0IsU0FBa0M7UUFBbEMsY0FBUyxHQUFULFNBQVMsQ0FBeUI7UUFIdEQsa0JBQWEsR0FBbUIsRUFBRSxDQUFDO1FBQ25DLFlBQU8sR0FBMkMsRUFBRSxDQUFDO1FBR25ELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUNyQixJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FDaEcsQ0FBQztJQUNKLENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztJQUN2RCxDQUFDOzs7O0lBRU8sS0FBSztRQUNYLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQ3JDLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDNUMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOzs7Ozs7O0lBR0QsZUFBZSxDQUFDLFdBQW1CLEVBQUUsSUFBa0M7UUFDckUsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDOUIsT0FBTztTQUNSOztjQUNLLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUs7O2NBQ3pDLFNBQVMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFN0UsSUFBSSxTQUFTLEVBQUU7WUFDYixJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksbUJBQU0sT0FBTyxFQUFLLElBQUksRUFBRyxDQUFDO1NBQ3pEO0lBQ0gsQ0FBQzs7O1lBaENGLFVBQVU7Ozs7WUFGRix1QkFBdUI7Ozs7SUFJOUIsdUNBQW1DOztJQUNuQyxpQ0FBcUQ7O0lBRXpDLG1DQUEwQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IERhdGFncmlkQ29sdW1uU3RhdGUgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2NvbHVtbi1zdGF0ZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgRGF0YWdyaWRSZW5kZXJTdGVwIH0gZnJvbSAnLi4vZW51bXMvcmVuZGVyLXN0ZXAuZW51bSc7XG5pbXBvcnQgeyBEYXRhZ3JpZFJlbmRlck9yZ2FuaXplciB9IGZyb20gJy4uL3JlbmRlci9yZW5kZXItb3JnYW5pemVyJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENvbHVtbnNTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcbiAgY29sdW1uczogQmVoYXZpb3JTdWJqZWN0PERhdGFncmlkQ29sdW1uU3RhdGU+W10gPSBbXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG9yZ2FuaXplcjogRGF0YWdyaWRSZW5kZXJPcmdhbml6ZXIpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMub3JnYW5pemVyLmZpbHRlclJlbmRlclN0ZXBzKERhdGFncmlkUmVuZGVyU3RlcC5DTEVBUl9XSURUSFMpLnN1YnNjcmliZSgoKSA9PiB0aGlzLnJlc2V0KCkpXG4gICAgKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHN1YiA9PiBzdWIudW5zdWJzY3JpYmUoKSk7XG4gIH1cblxuICBwcml2YXRlIHJlc2V0KCkge1xuICAgIHRoaXMuY29sdW1ucy5mb3JFYWNoKChjb2x1bW4sIGluZGV4KSA9PiB7XG4gICAgICB0aGlzLmVtaXRTdGF0ZUNoYW5nZShpbmRleCwgeyB3aWR0aDogMCB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIEhlbHBlciBtZXRob2QgdG8gZW1pdCBhIGNoYW5nZSB0byBhIGNvbHVtbiBvbmx5IHdoZW4gdGhlcmUgaXMgYW4gYWN0dWFsIGRpZmYgdG8gcHJvY2VzcyBmb3IgdGhhdCBjb2x1bW5cbiAgZW1pdFN0YXRlQ2hhbmdlKGNvbHVtbkluZGV4OiBudW1iZXIsIGRpZmY6IFBhcnRpYWw8RGF0YWdyaWRDb2x1bW5TdGF0ZT4pIHtcbiAgICBpZiAoIXRoaXMuY29sdW1uc1tjb2x1bW5JbmRleF0pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgY3VycmVudCA9IHRoaXMuY29sdW1uc1tjb2x1bW5JbmRleF0udmFsdWU7XG4gICAgY29uc3QgaGFzQ2hhbmdlID0gT2JqZWN0LmtleXMoZGlmZikuZmlsdGVyKGtleSA9PiBkaWZmW2tleV0gIT09IGN1cnJlbnRba2V5XSk7XG5cbiAgICBpZiAoaGFzQ2hhbmdlKSB7XG4gICAgICB0aGlzLmNvbHVtbnNbY29sdW1uSW5kZXhdLm5leHQoeyAuLi5jdXJyZW50LCAuLi5kaWZmIH0pO1xuICAgIH1cbiAgfVxufVxuIl19