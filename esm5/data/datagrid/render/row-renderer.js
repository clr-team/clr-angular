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
var DatagridRowRenderer = /** @class */ (function () {
    function DatagridRowRenderer(columnsService) {
        this.columnsService = columnsService;
    }
    /**
     * @return {?}
     */
    DatagridRowRenderer.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.setColumnStates();
        this.cells.changes.subscribe((/**
         * @return {?}
         */
        function () {
            _this.setColumnStates();
        }));
    };
    /**
     * @return {?}
     */
    DatagridRowRenderer.prototype.setColumnStates = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.cells.forEach((/**
         * @param {?} cell
         * @param {?} index
         * @return {?}
         */
        function (cell, index) {
            if (_this.columnsService.columns[index]) {
                cell.columnState = _this.columnsService.columns[index];
            }
        }));
    };
    DatagridRowRenderer.decorators = [
        { type: Directive, args: [{ selector: 'clr-dg-row, clr-dg-row-detail' },] }
    ];
    /** @nocollapse */
    DatagridRowRenderer.ctorParameters = function () { return [
        { type: ColumnsService }
    ]; };
    DatagridRowRenderer.propDecorators = {
        cells: [{ type: ContentChildren, args: [DatagridCellRenderer,] }]
    };
    return DatagridRowRenderer;
}());
export { DatagridRowRenderer };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LXJlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9yZW5kZXIvcm93LXJlbmRlcmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtBLE9BQU8sRUFBaUIsZUFBZSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFckYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRTlEO0lBSUUsNkJBQW9CLGNBQThCO1FBQTlCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtJQUFHLENBQUM7Ozs7SUFFdEQsNkNBQWU7OztJQUFmO1FBQUEsaUJBS0M7UUFKQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUzs7O1FBQUM7WUFDM0IsS0FBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3pCLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7OztJQUVNLDZDQUFlOzs7SUFBdEI7UUFBQSxpQkFNQztRQUxDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTzs7Ozs7UUFBQyxVQUFDLElBQUksRUFBRSxLQUFLO1lBQzdCLElBQUksS0FBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ3RDLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDdkQ7UUFDSCxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7O2dCQW5CRixTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsK0JBQStCLEVBQUU7Ozs7Z0JBRi9DLGNBQWM7Ozt3QkFJcEIsZUFBZSxTQUFDLG9CQUFvQjs7SUFrQnZDLDBCQUFDO0NBQUEsQUFwQkQsSUFvQkM7U0FuQlksbUJBQW1COzs7Ozs7SUFDOUIsb0NBQXNGOzs7OztJQUUxRSw2Q0FBc0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb250ZW50Q2hpbGRyZW4sIERpcmVjdGl2ZSwgUXVlcnlMaXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IERhdGFncmlkQ2VsbFJlbmRlcmVyIH0gZnJvbSAnLi9jZWxsLXJlbmRlcmVyJztcbmltcG9ydCB7IENvbHVtbnNTZXJ2aWNlIH0gZnJvbSAnLi4vcHJvdmlkZXJzL2NvbHVtbnMuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ2Nsci1kZy1yb3csIGNsci1kZy1yb3ctZGV0YWlsJyB9KVxuZXhwb3J0IGNsYXNzIERhdGFncmlkUm93UmVuZGVyZXIgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcbiAgQENvbnRlbnRDaGlsZHJlbihEYXRhZ3JpZENlbGxSZW5kZXJlcikgcHJpdmF0ZSBjZWxsczogUXVlcnlMaXN0PERhdGFncmlkQ2VsbFJlbmRlcmVyPjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbHVtbnNTZXJ2aWNlOiBDb2x1bW5zU2VydmljZSkge31cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5zZXRDb2x1bW5TdGF0ZXMoKTtcbiAgICB0aGlzLmNlbGxzLmNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuc2V0Q29sdW1uU3RhdGVzKCk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgc2V0Q29sdW1uU3RhdGVzKCkge1xuICAgIHRoaXMuY2VsbHMuZm9yRWFjaCgoY2VsbCwgaW5kZXgpID0+IHtcbiAgICAgIGlmICh0aGlzLmNvbHVtbnNTZXJ2aWNlLmNvbHVtbnNbaW5kZXhdKSB7XG4gICAgICAgIGNlbGwuY29sdW1uU3RhdGUgPSB0aGlzLmNvbHVtbnNTZXJ2aWNlLmNvbHVtbnNbaW5kZXhdO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iXX0=