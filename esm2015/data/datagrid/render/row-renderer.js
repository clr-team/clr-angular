/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { ContentChildren, Directive, QueryList } from '@angular/core';
import { DatagridCellRenderer } from './cell-renderer';
import { ColumnsService } from '../providers/columns.service';
export class DatagridRowRenderer {
    /**
     * @param {?} columnsService
     */
    constructor(columnsService) {
        this.columnsService = columnsService;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.setColumnStates();
        this.cells.changes.subscribe((/**
         * @return {?}
         */
        () => {
            this.setColumnStates();
        }));
    }
    /**
     * @return {?}
     */
    setColumnStates() {
        this.cells.forEach((/**
         * @param {?} cell
         * @param {?} index
         * @return {?}
         */
        (cell, index) => {
            if (this.columnsService.columns[index]) {
                cell.columnState = this.columnsService.columns[index];
            }
        }));
    }
}
DatagridRowRenderer.decorators = [
    { type: Directive, args: [{ selector: 'clr-dg-row, clr-dg-row-detail' },] }
];
/** @nocollapse */
DatagridRowRenderer.ctorParameters = () => [
    { type: ColumnsService }
];
DatagridRowRenderer.propDecorators = {
    cells: [{ type: ContentChildren, args: [DatagridCellRenderer,] }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    DatagridRowRenderer.prototype.cells;
    /**
     * @type {?}
     * @private
     */
    DatagridRowRenderer.prototype.columnsService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LXJlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9yZW5kZXIvcm93LXJlbmRlcmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtBLE9BQU8sRUFBaUIsZUFBZSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFckYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRzlELE1BQU0sT0FBTyxtQkFBbUI7Ozs7SUFHOUIsWUFBb0IsY0FBOEI7UUFBOUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO0lBQUcsQ0FBQzs7OztJQUV0RCxlQUFlO1FBQ2IsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFNBQVM7OztRQUFDLEdBQUcsRUFBRTtZQUNoQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDekIsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7O0lBRU0sZUFBZTtRQUNwQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU87Ozs7O1FBQUMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDakMsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDdEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN2RDtRQUNILENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7O1lBbkJGLFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSwrQkFBK0IsRUFBRTs7OztZQUYvQyxjQUFjOzs7b0JBSXBCLGVBQWUsU0FBQyxvQkFBb0I7Ozs7Ozs7SUFBckMsb0NBQXNGOzs7OztJQUUxRSw2Q0FBc0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb250ZW50Q2hpbGRyZW4sIERpcmVjdGl2ZSwgUXVlcnlMaXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IERhdGFncmlkQ2VsbFJlbmRlcmVyIH0gZnJvbSAnLi9jZWxsLXJlbmRlcmVyJztcbmltcG9ydCB7IENvbHVtbnNTZXJ2aWNlIH0gZnJvbSAnLi4vcHJvdmlkZXJzL2NvbHVtbnMuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ2Nsci1kZy1yb3csIGNsci1kZy1yb3ctZGV0YWlsJyB9KVxuZXhwb3J0IGNsYXNzIERhdGFncmlkUm93UmVuZGVyZXIgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcbiAgQENvbnRlbnRDaGlsZHJlbihEYXRhZ3JpZENlbGxSZW5kZXJlcikgcHJpdmF0ZSBjZWxsczogUXVlcnlMaXN0PERhdGFncmlkQ2VsbFJlbmRlcmVyPjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbHVtbnNTZXJ2aWNlOiBDb2x1bW5zU2VydmljZSkge31cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5zZXRDb2x1bW5TdGF0ZXMoKTtcbiAgICB0aGlzLmNlbGxzLmNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuc2V0Q29sdW1uU3RhdGVzKCk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgc2V0Q29sdW1uU3RhdGVzKCkge1xuICAgIHRoaXMuY2VsbHMuZm9yRWFjaCgoY2VsbCwgaW5kZXgpID0+IHtcbiAgICAgIGlmICh0aGlzLmNvbHVtbnNTZXJ2aWNlLmNvbHVtbnNbaW5kZXhdKSB7XG4gICAgICAgIGNlbGwuY29sdW1uU3RhdGUgPSB0aGlzLmNvbHVtbnNTZXJ2aWNlLmNvbHVtbnNbaW5kZXhdO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iXX0=