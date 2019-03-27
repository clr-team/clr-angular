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
        this.subscriptions.push(this.organizer.filterRenderSteps(DatagridRenderStep.CLEAR_WIDTHS).subscribe((/**
         * @return {?}
         */
        () => this.reset())));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        sub => sub.unsubscribe()));
    }
    /**
     * @private
     * @return {?}
     */
    reset() {
        this.columns.forEach((/**
         * @param {?} column
         * @param {?} index
         * @return {?}
         */
        (column, index) => {
            this.emitStateChange(index, { width: 0 });
        }));
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
        const hasChange = Object.keys(diff).filter((/**
         * @param {?} key
         * @return {?}
         */
        key => diff[key] !== current[key]));
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
    /**
     * @type {?}
     * @private
     */
    ColumnsService.prototype.organizer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1ucy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9wcm92aWRlcnMvY29sdW1ucy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtBLE9BQU8sRUFBRSxVQUFVLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFHdEQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDL0QsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFHckUsTUFBTSxPQUFPLGNBQWM7Ozs7SUFJekIsWUFBb0IsU0FBa0M7UUFBbEMsY0FBUyxHQUFULFNBQVMsQ0FBeUI7UUFIdEQsa0JBQWEsR0FBbUIsRUFBRSxDQUFDO1FBQ25DLFlBQU8sR0FBMkMsRUFBRSxDQUFDO1FBR25ELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUNyQixJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxDQUFDLFNBQVM7OztRQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBQyxDQUNoRyxDQUFDO0lBQ0osQ0FBQzs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU87Ozs7UUFBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsRUFBQyxDQUFDO0lBQ3ZELENBQUM7Ozs7O0lBRU8sS0FBSztRQUNYLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTzs7Ozs7UUFBQyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUNyQyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzVDLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7OztJQUdELGVBQWUsQ0FBQyxXQUFtQixFQUFFLElBQWtDO1FBQ3JFLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQzlCLE9BQU87U0FDUjs7Y0FDSyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLOztjQUN6QyxTQUFTLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNOzs7O1FBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFDO1FBRTdFLElBQUksU0FBUyxFQUFFO1lBQ2IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLG1CQUFNLE9BQU8sRUFBSyxJQUFJLEVBQUcsQ0FBQztTQUN6RDtJQUNILENBQUM7OztZQWhDRixVQUFVOzs7O1lBRkYsdUJBQXVCOzs7O0lBSTlCLHVDQUFtQzs7SUFDbkMsaUNBQXFEOzs7OztJQUV6QyxtQ0FBMEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBEYXRhZ3JpZENvbHVtblN0YXRlIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9jb2x1bW4tc3RhdGUuaW50ZXJmYWNlJztcbmltcG9ydCB7IERhdGFncmlkUmVuZGVyU3RlcCB9IGZyb20gJy4uL2VudW1zL3JlbmRlci1zdGVwLmVudW0nO1xuaW1wb3J0IHsgRGF0YWdyaWRSZW5kZXJPcmdhbml6ZXIgfSBmcm9tICcuLi9yZW5kZXIvcmVuZGVyLW9yZ2FuaXplcic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDb2x1bW5zU2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG4gIGNvbHVtbnM6IEJlaGF2aW9yU3ViamVjdDxEYXRhZ3JpZENvbHVtblN0YXRlPltdID0gW107XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBvcmdhbml6ZXI6IERhdGFncmlkUmVuZGVyT3JnYW5pemVyKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLm9yZ2FuaXplci5maWx0ZXJSZW5kZXJTdGVwcyhEYXRhZ3JpZFJlbmRlclN0ZXAuQ0xFQVJfV0lEVEhTKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5yZXNldCgpKVxuICAgICk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaChzdWIgPT4gc3ViLnVuc3Vic2NyaWJlKCkpO1xuICB9XG5cbiAgcHJpdmF0ZSByZXNldCgpIHtcbiAgICB0aGlzLmNvbHVtbnMuZm9yRWFjaCgoY29sdW1uLCBpbmRleCkgPT4ge1xuICAgICAgdGhpcy5lbWl0U3RhdGVDaGFuZ2UoaW5kZXgsIHsgd2lkdGg6IDAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvLyBIZWxwZXIgbWV0aG9kIHRvIGVtaXQgYSBjaGFuZ2UgdG8gYSBjb2x1bW4gb25seSB3aGVuIHRoZXJlIGlzIGFuIGFjdHVhbCBkaWZmIHRvIHByb2Nlc3MgZm9yIHRoYXQgY29sdW1uXG4gIGVtaXRTdGF0ZUNoYW5nZShjb2x1bW5JbmRleDogbnVtYmVyLCBkaWZmOiBQYXJ0aWFsPERhdGFncmlkQ29sdW1uU3RhdGU+KSB7XG4gICAgaWYgKCF0aGlzLmNvbHVtbnNbY29sdW1uSW5kZXhdKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGN1cnJlbnQgPSB0aGlzLmNvbHVtbnNbY29sdW1uSW5kZXhdLnZhbHVlO1xuICAgIGNvbnN0IGhhc0NoYW5nZSA9IE9iamVjdC5rZXlzKGRpZmYpLmZpbHRlcihrZXkgPT4gZGlmZltrZXldICE9PSBjdXJyZW50W2tleV0pO1xuXG4gICAgaWYgKGhhc0NoYW5nZSkge1xuICAgICAgdGhpcy5jb2x1bW5zW2NvbHVtbkluZGV4XS5uZXh0KHsgLi4uY3VycmVudCwgLi4uZGlmZiB9KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==