/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
        this.subscriptions.push(this.organizer.filterRenderSteps(DatagridRenderStep.CLEAR_WIDTHS).subscribe(function () { return _this.reset(); }));
    }
    /**
     * @return {?}
     */
    ColumnsService.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    /**
     * @return {?}
     */
    ColumnsService.prototype.reset = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.columns.forEach(function (column, index) {
            _this.emitStateChange(index, { width: 0 });
        });
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
        var hasChange = Object.keys(diff).filter(function (key) { return diff[key] !== current[key]; });
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
    /** @type {?} */
    ColumnsService.prototype.organizer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1ucy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9wcm92aWRlcnMvY29sdW1ucy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFLQSxPQUFPLEVBQUUsVUFBVSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBR3RELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQy9ELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRXJFO0lBS0Usd0JBQW9CLFNBQWtDO1FBQXRELGlCQUlDO1FBSm1CLGNBQVMsR0FBVCxTQUFTLENBQXlCO1FBSHRELGtCQUFhLEdBQW1CLEVBQUUsQ0FBQztRQUNuQyxZQUFPLEdBQTJDLEVBQUUsQ0FBQztRQUduRCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FDckIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsQ0FBQyxTQUFTLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxLQUFLLEVBQUUsRUFBWixDQUFZLENBQUMsQ0FDaEcsQ0FBQztJQUNKLENBQUM7Ozs7SUFFRCxvQ0FBVzs7O0lBQVg7UUFDRSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxXQUFXLEVBQUUsRUFBakIsQ0FBaUIsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7Ozs7SUFFTyw4QkFBSzs7O0lBQWI7UUFBQSxpQkFJQztRQUhDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQUMsTUFBTSxFQUFFLEtBQUs7WUFDakMsS0FBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM1QyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCwwR0FBMEc7Ozs7Ozs7SUFDMUcsd0NBQWU7Ozs7Ozs7SUFBZixVQUFnQixXQUFtQixFQUFFLElBQWtDO1FBQ3JFLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQzlCLE9BQU87U0FDUjs7WUFDSyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLOztZQUN6QyxTQUFTLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUExQixDQUEwQixDQUFDO1FBRTdFLElBQUksU0FBUyxFQUFFO1lBQ2IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLHNCQUFNLE9BQU8sRUFBSyxJQUFJLEVBQUcsQ0FBQztTQUN6RDtJQUNILENBQUM7O2dCQWhDRixVQUFVOzs7O2dCQUZGLHVCQUF1Qjs7SUFtQ2hDLHFCQUFDO0NBQUEsQUFqQ0QsSUFpQ0M7U0FoQ1ksY0FBYzs7O0lBQ3pCLHVDQUFtQzs7SUFDbkMsaUNBQXFEOztJQUV6QyxtQ0FBMEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBEYXRhZ3JpZENvbHVtblN0YXRlIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9jb2x1bW4tc3RhdGUuaW50ZXJmYWNlJztcbmltcG9ydCB7IERhdGFncmlkUmVuZGVyU3RlcCB9IGZyb20gJy4uL2VudW1zL3JlbmRlci1zdGVwLmVudW0nO1xuaW1wb3J0IHsgRGF0YWdyaWRSZW5kZXJPcmdhbml6ZXIgfSBmcm9tICcuLi9yZW5kZXIvcmVuZGVyLW9yZ2FuaXplcic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDb2x1bW5zU2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG4gIGNvbHVtbnM6IEJlaGF2aW9yU3ViamVjdDxEYXRhZ3JpZENvbHVtblN0YXRlPltdID0gW107XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBvcmdhbml6ZXI6IERhdGFncmlkUmVuZGVyT3JnYW5pemVyKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLm9yZ2FuaXplci5maWx0ZXJSZW5kZXJTdGVwcyhEYXRhZ3JpZFJlbmRlclN0ZXAuQ0xFQVJfV0lEVEhTKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5yZXNldCgpKVxuICAgICk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaChzdWIgPT4gc3ViLnVuc3Vic2NyaWJlKCkpO1xuICB9XG5cbiAgcHJpdmF0ZSByZXNldCgpIHtcbiAgICB0aGlzLmNvbHVtbnMuZm9yRWFjaCgoY29sdW1uLCBpbmRleCkgPT4ge1xuICAgICAgdGhpcy5lbWl0U3RhdGVDaGFuZ2UoaW5kZXgsIHsgd2lkdGg6IDAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvLyBIZWxwZXIgbWV0aG9kIHRvIGVtaXQgYSBjaGFuZ2UgdG8gYSBjb2x1bW4gb25seSB3aGVuIHRoZXJlIGlzIGFuIGFjdHVhbCBkaWZmIHRvIHByb2Nlc3MgZm9yIHRoYXQgY29sdW1uXG4gIGVtaXRTdGF0ZUNoYW5nZShjb2x1bW5JbmRleDogbnVtYmVyLCBkaWZmOiBQYXJ0aWFsPERhdGFncmlkQ29sdW1uU3RhdGU+KSB7XG4gICAgaWYgKCF0aGlzLmNvbHVtbnNbY29sdW1uSW5kZXhdKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGN1cnJlbnQgPSB0aGlzLmNvbHVtbnNbY29sdW1uSW5kZXhdLnZhbHVlO1xuICAgIGNvbnN0IGhhc0NoYW5nZSA9IE9iamVjdC5rZXlzKGRpZmYpLmZpbHRlcihrZXkgPT4gZGlmZltrZXldICE9PSBjdXJyZW50W2tleV0pO1xuXG4gICAgaWYgKGhhc0NoYW5nZSkge1xuICAgICAgdGhpcy5jb2x1bW5zW2NvbHVtbkluZGV4XS5uZXh0KHsgLi4uY3VycmVudCwgLi4uZGlmZiB9KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==