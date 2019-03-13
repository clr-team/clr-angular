/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
        this.cells.changes.subscribe(function () {
            _this.setColumnStates();
        });
    };
    /**
     * @return {?}
     */
    DatagridRowRenderer.prototype.setupColumns = /**
     * @return {?}
     */
    function () {
        this.setColumnStates();
    };
    /**
     * @return {?}
     */
    DatagridRowRenderer.prototype.setColumnStates = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.cells.forEach(function (cell, index) {
            if (_this.columnsService.columns[index]) {
                cell.columnState = _this.columnsService.columns[index];
            }
        });
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
    /** @type {?} */
    DatagridRowRenderer.prototype.cells;
    /** @type {?} */
    DatagridRowRenderer.prototype.columnsService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LXJlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9yZW5kZXIvcm93LXJlbmRlcmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtBLE9BQU8sRUFBaUIsZUFBZSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFckYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRTlEO0lBSUUsNkJBQW9CLGNBQThCO1FBQTlCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtJQUFHLENBQUM7Ozs7SUFFdEQsNkNBQWU7OztJQUFmO1FBQUEsaUJBSUM7UUFIQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7WUFDM0IsS0FBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7OztJQUVELDBDQUFZOzs7SUFBWjtRQUNFLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUN6QixDQUFDOzs7O0lBRU8sNkNBQWU7OztJQUF2QjtRQUFBLGlCQU1DO1FBTEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJLEVBQUUsS0FBSztZQUM3QixJQUFJLEtBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUN0QyxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3ZEO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOztnQkF0QkYsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLCtCQUErQixFQUFFOzs7O2dCQUYvQyxjQUFjOzs7d0JBSXBCLGVBQWUsU0FBQyxvQkFBb0I7O0lBcUJ2QywwQkFBQztDQUFBLEFBdkJELElBdUJDO1NBdEJZLG1CQUFtQjs7O0lBQzlCLG9DQUFzRjs7SUFFMUUsNkNBQXNDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29udGVudENoaWxkcmVuLCBEaXJlY3RpdmUsIFF1ZXJ5TGlzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBEYXRhZ3JpZENlbGxSZW5kZXJlciB9IGZyb20gJy4vY2VsbC1yZW5kZXJlcic7XG5pbXBvcnQgeyBDb2x1bW5zU2VydmljZSB9IGZyb20gJy4uL3Byb3ZpZGVycy9jb2x1bW5zLnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdjbHItZGctcm93LCBjbHItZGctcm93LWRldGFpbCcgfSlcbmV4cG9ydCBjbGFzcyBEYXRhZ3JpZFJvd1JlbmRlcmVyIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG4gIEBDb250ZW50Q2hpbGRyZW4oRGF0YWdyaWRDZWxsUmVuZGVyZXIpIHByaXZhdGUgY2VsbHM6IFF1ZXJ5TGlzdDxEYXRhZ3JpZENlbGxSZW5kZXJlcj47XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb2x1bW5zU2VydmljZTogQ29sdW1uc1NlcnZpY2UpIHt9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuY2VsbHMuY2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5zZXRDb2x1bW5TdGF0ZXMoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHNldHVwQ29sdW1ucygpIHtcbiAgICB0aGlzLnNldENvbHVtblN0YXRlcygpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRDb2x1bW5TdGF0ZXMoKSB7XG4gICAgdGhpcy5jZWxscy5mb3JFYWNoKChjZWxsLCBpbmRleCkgPT4ge1xuICAgICAgaWYgKHRoaXMuY29sdW1uc1NlcnZpY2UuY29sdW1uc1tpbmRleF0pIHtcbiAgICAgICAgY2VsbC5jb2x1bW5TdGF0ZSA9IHRoaXMuY29sdW1uc1NlcnZpY2UuY29sdW1uc1tpbmRleF07XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==