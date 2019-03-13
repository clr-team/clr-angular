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
        this.cells.changes.subscribe(() => {
            this.setColumnStates();
        });
    }
    /**
     * @return {?}
     */
    setupColumns() {
        this.setColumnStates();
    }
    /**
     * @return {?}
     */
    setColumnStates() {
        this.cells.forEach((cell, index) => {
            if (this.columnsService.columns[index]) {
                cell.columnState = this.columnsService.columns[index];
            }
        });
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
    /** @type {?} */
    DatagridRowRenderer.prototype.cells;
    /** @type {?} */
    DatagridRowRenderer.prototype.columnsService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LXJlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9yZW5kZXIvcm93LXJlbmRlcmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtBLE9BQU8sRUFBaUIsZUFBZSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFckYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRzlELE1BQU0sT0FBTyxtQkFBbUI7Ozs7SUFHOUIsWUFBb0IsY0FBOEI7UUFBOUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO0lBQUcsQ0FBQzs7OztJQUV0RCxlQUFlO1FBQ2IsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUNoQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOzs7O0lBRUQsWUFBWTtRQUNWLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUN6QixDQUFDOzs7O0lBRU8sZUFBZTtRQUNyQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUNqQyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUN0QyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3ZEO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOzs7WUF0QkYsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLCtCQUErQixFQUFFOzs7O1lBRi9DLGNBQWM7OztvQkFJcEIsZUFBZSxTQUFDLG9CQUFvQjs7OztJQUFyQyxvQ0FBc0Y7O0lBRTFFLDZDQUFzQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbnRlbnRDaGlsZHJlbiwgRGlyZWN0aXZlLCBRdWVyeUxpc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRGF0YWdyaWRDZWxsUmVuZGVyZXIgfSBmcm9tICcuL2NlbGwtcmVuZGVyZXInO1xuaW1wb3J0IHsgQ29sdW1uc1NlcnZpY2UgfSBmcm9tICcuLi9wcm92aWRlcnMvY29sdW1ucy5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnY2xyLWRnLXJvdywgY2xyLWRnLXJvdy1kZXRhaWwnIH0pXG5leHBvcnQgY2xhc3MgRGF0YWdyaWRSb3dSZW5kZXJlciBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuICBAQ29udGVudENoaWxkcmVuKERhdGFncmlkQ2VsbFJlbmRlcmVyKSBwcml2YXRlIGNlbGxzOiBRdWVyeUxpc3Q8RGF0YWdyaWRDZWxsUmVuZGVyZXI+O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29sdW1uc1NlcnZpY2U6IENvbHVtbnNTZXJ2aWNlKSB7fVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLmNlbGxzLmNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuc2V0Q29sdW1uU3RhdGVzKCk7XG4gICAgfSk7XG4gIH1cblxuICBzZXR1cENvbHVtbnMoKSB7XG4gICAgdGhpcy5zZXRDb2x1bW5TdGF0ZXMoKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0Q29sdW1uU3RhdGVzKCkge1xuICAgIHRoaXMuY2VsbHMuZm9yRWFjaCgoY2VsbCwgaW5kZXgpID0+IHtcbiAgICAgIGlmICh0aGlzLmNvbHVtbnNTZXJ2aWNlLmNvbHVtbnNbaW5kZXhdKSB7XG4gICAgICAgIGNlbGwuY29sdW1uU3RhdGUgPSB0aGlzLmNvbHVtbnNTZXJ2aWNlLmNvbHVtbnNbaW5kZXhdO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iXX0=