/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2 } from '@angular/core';
import { ColumnResizerService } from './providers/column-resizer.service';
import { TableSizeService } from './providers/table-size.service';
import { UNIQUE_ID_PROVIDER, UNIQUE_ID } from '../../utils/id-generator/id-generator.service';
var ClrDatagridColumnSeparator = /** @class */ (function () {
    // Every column draggable separator should have its own unique ID
    // in order to not conflict with other draggables/droppables.
    function ClrDatagridColumnSeparator(columnResizerService, renderer, tableSizeService, document, columnSeparatorId) {
        this.columnResizerService = columnResizerService;
        this.renderer = renderer;
        this.tableSizeService = tableSizeService;
        this.document = document;
        this.columnSeparatorId = columnSeparatorId;
    }
    /**
     * @param {?} resizeTrackerEl
     * @return {?}
     */
    ClrDatagridColumnSeparator.prototype.showTracker = /**
     * @param {?} resizeTrackerEl
     * @return {?}
     */
    function (resizeTrackerEl) {
        this.columnResizerService.startResize();
        /** @type {?} */
        var tableHeight = this.tableSizeService.getColumnDragHeight();
        this.renderer.setStyle(resizeTrackerEl, 'height', tableHeight);
        this.renderer.setStyle(resizeTrackerEl, 'display', 'block');
    };
    /**
     * @param {?} event
     * @param {?} resizeTrackerEl
     * @return {?}
     */
    ClrDatagridColumnSeparator.prototype.moveTracker = /**
     * @param {?} event
     * @param {?} resizeTrackerEl
     * @return {?}
     */
    function (event, resizeTrackerEl) {
        this.columnResizerService.calculateResize(event);
        this.renderer.setStyle(resizeTrackerEl, 'transform', "translateX(" + this.columnResizerService.resizedBy + "px)");
        this.renderer.setStyle(this.document.body, 'cursor', 'col-resize');
        this.redFlagTracker(resizeTrackerEl);
    };
    /**
     * @param {?} resizeTrackerEl
     * @return {?}
     */
    ClrDatagridColumnSeparator.prototype.hideTracker = /**
     * @param {?} resizeTrackerEl
     * @return {?}
     */
    function (resizeTrackerEl) {
        this.columnResizerService.endResize();
        this.renderer.setStyle(resizeTrackerEl, 'display', 'none');
        this.renderer.setStyle(resizeTrackerEl, 'transform', "translateX(0px)");
        this.renderer.setStyle(this.document.body, 'cursor', 'auto');
    };
    /**
     * @param {?} resizeTrackerEl
     * @return {?}
     */
    ClrDatagridColumnSeparator.prototype.redFlagTracker = /**
     * @param {?} resizeTrackerEl
     * @return {?}
     */
    function (resizeTrackerEl) {
        /** @type {?} */
        var isWithinMaxResizeRange;
        // @TODO(JEREMY) Review this, it will always be true because above is always null
        if (isWithinMaxResizeRange !== this.columnResizerService.isWithinMaxResizeRange) {
            isWithinMaxResizeRange = this.columnResizerService.isWithinMaxResizeRange;
            if (!isWithinMaxResizeRange) {
                this.renderer.addClass(resizeTrackerEl, 'exceeded-max');
            }
            else {
                this.renderer.removeClass(resizeTrackerEl, 'exceeded-max');
            }
        }
    };
    ClrDatagridColumnSeparator.decorators = [
        { type: Component, args: [{
                    selector: 'clr-dg-column-separator',
                    template: "\n    <div class=\"datagrid-column-handle\" aria-hidden=\"true\"\n      clrDraggable \n      [clrGroup]=\"columnSeparatorId\" \n      (clrDragStart)=\"showTracker(resizeTrackerEl)\" \n      (clrDragMove)=\"moveTracker($event, resizeTrackerEl)\" \n      (clrDragEnd)=\"hideTracker(resizeTrackerEl)\"></div>\n    <div class=\"datagrid-column-resize-tracker\" #resizeTrackerEl></div>\n    ",
                    host: {
                        '[class.datagrid-column-separator]': 'true',
                    },
                    providers: [UNIQUE_ID_PROVIDER]
                }] }
    ];
    /** @nocollapse */
    ClrDatagridColumnSeparator.ctorParameters = function () { return [
        { type: ColumnResizerService },
        { type: Renderer2 },
        { type: TableSizeService },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
        { type: String, decorators: [{ type: Inject, args: [UNIQUE_ID,] }] }
    ]; };
    return ClrDatagridColumnSeparator;
}());
export { ClrDatagridColumnSeparator };
if (false) {
    /** @type {?} */
    ClrDatagridColumnSeparator.prototype.columnResizerService;
    /** @type {?} */
    ClrDatagridColumnSeparator.prototype.renderer;
    /** @type {?} */
    ClrDatagridColumnSeparator.prototype.tableSizeService;
    /** @type {?} */
    ClrDatagridColumnSeparator.prototype.document;
    /** @type {?} */
    ClrDatagridColumnSeparator.prototype.columnSeparatorId;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtY29sdW1uLXNlcGFyYXRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvZGF0YWdyaWQtY29sdW1uLXNlcGFyYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFLQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzdELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxTQUFTLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUU5RjtJQWlCRSxpRUFBaUU7SUFDakUsNkRBQTZEO0lBQzdELG9DQUNVLG9CQUEwQyxFQUMxQyxRQUFtQixFQUNuQixnQkFBa0MsRUFDaEIsUUFBYSxFQUNiLGlCQUF5QjtRQUozQyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBQzFDLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNoQixhQUFRLEdBQVIsUUFBUSxDQUFLO1FBQ2Isc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFRO0lBQ2xELENBQUM7Ozs7O0lBRUcsZ0RBQVc7Ozs7SUFBbEIsVUFBbUIsZUFBNEI7UUFDN0MsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFdBQVcsRUFBRSxDQUFDOztZQUNsQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLG1CQUFtQixFQUFFO1FBQy9ELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGVBQWUsRUFBRSxRQUFRLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDL0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsZUFBZSxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM5RCxDQUFDOzs7Ozs7SUFFTSxnREFBVzs7Ozs7SUFBbEIsVUFBbUIsS0FBd0IsRUFBRSxlQUE0QjtRQUN2RSxJQUFJLENBQUMsb0JBQW9CLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGVBQWUsRUFBRSxXQUFXLEVBQUUsZ0JBQWMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFNBQVMsUUFBSyxDQUFDLENBQUM7UUFDN0csSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ25FLElBQUksQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDdkMsQ0FBQzs7Ozs7SUFFTSxnREFBVzs7OztJQUFsQixVQUFtQixlQUE0QjtRQUM3QyxJQUFJLENBQUMsb0JBQW9CLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsZUFBZSxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQUUsV0FBVyxFQUFFLGlCQUFpQixDQUFDLENBQUM7UUFDeEUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQy9ELENBQUM7Ozs7O0lBRU8sbURBQWM7Ozs7SUFBdEIsVUFBdUIsZUFBNEI7O1lBQzdDLHNCQUErQjtRQUNuQyxpRkFBaUY7UUFDakYsSUFBSSxzQkFBc0IsS0FBSyxJQUFJLENBQUMsb0JBQW9CLENBQUMsc0JBQXNCLEVBQUU7WUFDL0Usc0JBQXNCLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLHNCQUFzQixDQUFDO1lBQzFFLElBQUksQ0FBQyxzQkFBc0IsRUFBRTtnQkFDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsZUFBZSxFQUFFLGNBQWMsQ0FBQyxDQUFDO2FBQ3pEO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLGVBQWUsRUFBRSxjQUFjLENBQUMsQ0FBQzthQUM1RDtTQUNGO0lBQ0gsQ0FBQzs7Z0JBM0RGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUseUJBQXlCO29CQUNuQyxRQUFRLEVBQUUsb1lBUVA7b0JBQ0gsSUFBSSxFQUFFO3dCQUNKLG1DQUFtQyxFQUFFLE1BQU07cUJBQzVDO29CQUNELFNBQVMsRUFBRSxDQUFDLGtCQUFrQixDQUFDO2lCQUNoQzs7OztnQkFuQlEsb0JBQW9CO2dCQUhELFNBQVM7Z0JBSTVCLGdCQUFnQjtnREEwQnBCLE1BQU0sU0FBQyxRQUFROzZDQUNmLE1BQU0sU0FBQyxTQUFTOztJQW9DckIsaUNBQUM7Q0FBQSxBQTVERCxJQTREQztTQTVDWSwwQkFBMEI7OztJQUluQywwREFBa0Q7O0lBQ2xELDhDQUEyQjs7SUFDM0Isc0RBQTBDOztJQUMxQyw4Q0FBdUM7O0lBQ3ZDLHVEQUFtRCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IENvbXBvbmVudCwgSW5qZWN0LCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQ2xyRHJhZ0V2ZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvZHJhZy1hbmQtZHJvcC9kcmFnLWV2ZW50JztcbmltcG9ydCB7IENvbHVtblJlc2l6ZXJTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvY29sdW1uLXJlc2l6ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBUYWJsZVNpemVTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvdGFibGUtc2l6ZS5zZXJ2aWNlJztcbmltcG9ydCB7IFVOSVFVRV9JRF9QUk9WSURFUiwgVU5JUVVFX0lEIH0gZnJvbSAnLi4vLi4vdXRpbHMvaWQtZ2VuZXJhdG9yL2lkLWdlbmVyYXRvci5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLWRnLWNvbHVtbi1zZXBhcmF0b3InLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJkYXRhZ3JpZC1jb2x1bW4taGFuZGxlXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCJcbiAgICAgIGNsckRyYWdnYWJsZSBcbiAgICAgIFtjbHJHcm91cF09XCJjb2x1bW5TZXBhcmF0b3JJZFwiIFxuICAgICAgKGNsckRyYWdTdGFydCk9XCJzaG93VHJhY2tlcihyZXNpemVUcmFja2VyRWwpXCIgXG4gICAgICAoY2xyRHJhZ01vdmUpPVwibW92ZVRyYWNrZXIoJGV2ZW50LCByZXNpemVUcmFja2VyRWwpXCIgXG4gICAgICAoY2xyRHJhZ0VuZCk9XCJoaWRlVHJhY2tlcihyZXNpemVUcmFja2VyRWwpXCI+PC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImRhdGFncmlkLWNvbHVtbi1yZXNpemUtdHJhY2tlclwiICNyZXNpemVUcmFja2VyRWw+PC9kaXY+XG4gICAgYCxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuZGF0YWdyaWQtY29sdW1uLXNlcGFyYXRvcl0nOiAndHJ1ZScsXG4gIH0sXG4gIHByb3ZpZGVyczogW1VOSVFVRV9JRF9QUk9WSURFUl0sXG59KVxuZXhwb3J0IGNsYXNzIENsckRhdGFncmlkQ29sdW1uU2VwYXJhdG9yIHtcbiAgLy8gRXZlcnkgY29sdW1uIGRyYWdnYWJsZSBzZXBhcmF0b3Igc2hvdWxkIGhhdmUgaXRzIG93biB1bmlxdWUgSURcbiAgLy8gaW4gb3JkZXIgdG8gbm90IGNvbmZsaWN0IHdpdGggb3RoZXIgZHJhZ2dhYmxlcy9kcm9wcGFibGVzLlxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvbHVtblJlc2l6ZXJTZXJ2aWNlOiBDb2x1bW5SZXNpemVyU2VydmljZSxcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSB0YWJsZVNpemVTZXJ2aWNlOiBUYWJsZVNpemVTZXJ2aWNlLFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IGFueSxcbiAgICBASW5qZWN0KFVOSVFVRV9JRCkgcHVibGljIGNvbHVtblNlcGFyYXRvcklkOiBzdHJpbmdcbiAgKSB7fVxuXG4gIHB1YmxpYyBzaG93VHJhY2tlcihyZXNpemVUcmFja2VyRWw6IEhUTUxFbGVtZW50KSB7XG4gICAgdGhpcy5jb2x1bW5SZXNpemVyU2VydmljZS5zdGFydFJlc2l6ZSgpO1xuICAgIGNvbnN0IHRhYmxlSGVpZ2h0ID0gdGhpcy50YWJsZVNpemVTZXJ2aWNlLmdldENvbHVtbkRyYWdIZWlnaHQoKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHJlc2l6ZVRyYWNrZXJFbCwgJ2hlaWdodCcsIHRhYmxlSGVpZ2h0KTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHJlc2l6ZVRyYWNrZXJFbCwgJ2Rpc3BsYXknLCAnYmxvY2snKTtcbiAgfVxuXG4gIHB1YmxpYyBtb3ZlVHJhY2tlcihldmVudDogQ2xyRHJhZ0V2ZW50PGFueT4sIHJlc2l6ZVRyYWNrZXJFbDogSFRNTEVsZW1lbnQpIHtcbiAgICB0aGlzLmNvbHVtblJlc2l6ZXJTZXJ2aWNlLmNhbGN1bGF0ZVJlc2l6ZShldmVudCk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShyZXNpemVUcmFja2VyRWwsICd0cmFuc2Zvcm0nLCBgdHJhbnNsYXRlWCgke3RoaXMuY29sdW1uUmVzaXplclNlcnZpY2UucmVzaXplZEJ5fXB4KWApO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5kb2N1bWVudC5ib2R5LCAnY3Vyc29yJywgJ2NvbC1yZXNpemUnKTtcbiAgICB0aGlzLnJlZEZsYWdUcmFja2VyKHJlc2l6ZVRyYWNrZXJFbCk7XG4gIH1cblxuICBwdWJsaWMgaGlkZVRyYWNrZXIocmVzaXplVHJhY2tlckVsOiBIVE1MRWxlbWVudCkge1xuICAgIHRoaXMuY29sdW1uUmVzaXplclNlcnZpY2UuZW5kUmVzaXplKCk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShyZXNpemVUcmFja2VyRWwsICdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHJlc2l6ZVRyYWNrZXJFbCwgJ3RyYW5zZm9ybScsIGB0cmFuc2xhdGVYKDBweClgKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZG9jdW1lbnQuYm9keSwgJ2N1cnNvcicsICdhdXRvJyk7XG4gIH1cblxuICBwcml2YXRlIHJlZEZsYWdUcmFja2VyKHJlc2l6ZVRyYWNrZXJFbDogSFRNTEVsZW1lbnQpIHtcbiAgICBsZXQgaXNXaXRoaW5NYXhSZXNpemVSYW5nZTogYm9vbGVhbjtcbiAgICAvLyBAVE9ETyhKRVJFTVkpIFJldmlldyB0aGlzLCBpdCB3aWxsIGFsd2F5cyBiZSB0cnVlIGJlY2F1c2UgYWJvdmUgaXMgYWx3YXlzIG51bGxcbiAgICBpZiAoaXNXaXRoaW5NYXhSZXNpemVSYW5nZSAhPT0gdGhpcy5jb2x1bW5SZXNpemVyU2VydmljZS5pc1dpdGhpbk1heFJlc2l6ZVJhbmdlKSB7XG4gICAgICBpc1dpdGhpbk1heFJlc2l6ZVJhbmdlID0gdGhpcy5jb2x1bW5SZXNpemVyU2VydmljZS5pc1dpdGhpbk1heFJlc2l6ZVJhbmdlO1xuICAgICAgaWYgKCFpc1dpdGhpbk1heFJlc2l6ZVJhbmdlKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MocmVzaXplVHJhY2tlckVsLCAnZXhjZWVkZWQtbWF4Jyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHJlc2l6ZVRyYWNrZXJFbCwgJ2V4Y2VlZGVkLW1heCcpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19