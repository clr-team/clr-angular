/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
export class ClrDatagridColumnSeparator {
    // Every column draggable separator should have its own unique ID
    // in order to not conflict with other draggables/droppables.
    /**
     * @param {?} columnResizerService
     * @param {?} renderer
     * @param {?} tableSizeService
     * @param {?} document
     * @param {?} columnSeparatorId
     */
    constructor(columnResizerService, renderer, tableSizeService, document, columnSeparatorId) {
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
    showTracker(resizeTrackerEl) {
        this.columnResizerService.startResize();
        /** @type {?} */
        const tableHeight = this.tableSizeService.getColumnDragHeight();
        this.renderer.setStyle(resizeTrackerEl, 'height', tableHeight);
        this.renderer.setStyle(resizeTrackerEl, 'display', 'block');
    }
    /**
     * @param {?} event
     * @param {?} resizeTrackerEl
     * @return {?}
     */
    moveTracker(event, resizeTrackerEl) {
        this.columnResizerService.calculateResize(event);
        this.renderer.setStyle(resizeTrackerEl, 'transform', `translateX(${this.columnResizerService.resizedBy}px)`);
        this.renderer.setStyle(this.document.body, 'cursor', 'col-resize');
        this.redFlagTracker(resizeTrackerEl);
    }
    /**
     * @param {?} resizeTrackerEl
     * @return {?}
     */
    hideTracker(resizeTrackerEl) {
        this.columnResizerService.endResize();
        this.renderer.setStyle(resizeTrackerEl, 'display', 'none');
        this.renderer.setStyle(resizeTrackerEl, 'transform', `translateX(0px)`);
        this.renderer.setStyle(this.document.body, 'cursor', 'auto');
    }
    /**
     * @private
     * @param {?} resizeTrackerEl
     * @return {?}
     */
    redFlagTracker(resizeTrackerEl) {
        /** @type {?} */
        let isWithinMaxResizeRange;
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
    }
}
ClrDatagridColumnSeparator.decorators = [
    { type: Component, args: [{
                selector: 'clr-dg-column-separator',
                template: `
    <div class="datagrid-column-handle" aria-hidden="true"
      clrDraggable 
      [clrGroup]="columnSeparatorId" 
      (clrDragStart)="showTracker(resizeTrackerEl)" 
      (clrDragMove)="moveTracker($event, resizeTrackerEl)" 
      (clrDragEnd)="hideTracker(resizeTrackerEl)"></div>
    <div class="datagrid-column-resize-tracker" #resizeTrackerEl></div>
    `,
                host: {
                    '[class.datagrid-column-separator]': 'true',
                },
                providers: [UNIQUE_ID_PROVIDER]
            }] }
];
/** @nocollapse */
ClrDatagridColumnSeparator.ctorParameters = () => [
    { type: ColumnResizerService },
    { type: Renderer2 },
    { type: TableSizeService },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: String, decorators: [{ type: Inject, args: [UNIQUE_ID,] }] }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    ClrDatagridColumnSeparator.prototype.columnResizerService;
    /**
     * @type {?}
     * @private
     */
    ClrDatagridColumnSeparator.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    ClrDatagridColumnSeparator.prototype.tableSizeService;
    /**
     * @type {?}
     * @private
     */
    ClrDatagridColumnSeparator.prototype.document;
    /** @type {?} */
    ClrDatagridColumnSeparator.prototype.columnSeparatorId;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtY29sdW1uLXNlcGFyYXRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvZGF0YWdyaWQtY29sdW1uLXNlcGFyYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFLQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzdELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxTQUFTLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQWtCOUYsTUFBTSxPQUFPLDBCQUEwQjs7Ozs7Ozs7OztJQUdyQyxZQUNVLG9CQUEwQyxFQUMxQyxRQUFtQixFQUNuQixnQkFBa0MsRUFDaEIsUUFBYSxFQUNiLGlCQUF5QjtRQUozQyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBQzFDLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNoQixhQUFRLEdBQVIsUUFBUSxDQUFLO1FBQ2Isc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFRO0lBQ2xELENBQUM7Ozs7O0lBRUcsV0FBVyxDQUFDLGVBQTRCO1FBQzdDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQzs7Y0FDbEMsV0FBVyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxtQkFBbUIsRUFBRTtRQUMvRCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQUUsUUFBUSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQy9ELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGVBQWUsRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDOUQsQ0FBQzs7Ozs7O0lBRU0sV0FBVyxDQUFDLEtBQXdCLEVBQUUsZUFBNEI7UUFDdkUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQUUsV0FBVyxFQUFFLGNBQWMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFNBQVMsS0FBSyxDQUFDLENBQUM7UUFDN0csSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ25FLElBQUksQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDdkMsQ0FBQzs7Ozs7SUFFTSxXQUFXLENBQUMsZUFBNEI7UUFDN0MsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGVBQWUsRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsZUFBZSxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3hFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUMvRCxDQUFDOzs7Ozs7SUFFTyxjQUFjLENBQUMsZUFBNEI7O1lBQzdDLHNCQUErQjtRQUNuQyxpRkFBaUY7UUFDakYsSUFBSSxzQkFBc0IsS0FBSyxJQUFJLENBQUMsb0JBQW9CLENBQUMsc0JBQXNCLEVBQUU7WUFDL0Usc0JBQXNCLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLHNCQUFzQixDQUFDO1lBQzFFLElBQUksQ0FBQyxzQkFBc0IsRUFBRTtnQkFDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsZUFBZSxFQUFFLGNBQWMsQ0FBQyxDQUFDO2FBQ3pEO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLGVBQWUsRUFBRSxjQUFjLENBQUMsQ0FBQzthQUM1RDtTQUNGO0lBQ0gsQ0FBQzs7O1lBM0RGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUseUJBQXlCO2dCQUNuQyxRQUFRLEVBQUU7Ozs7Ozs7O0tBUVA7Z0JBQ0gsSUFBSSxFQUFFO29CQUNKLG1DQUFtQyxFQUFFLE1BQU07aUJBQzVDO2dCQUNELFNBQVMsRUFBRSxDQUFDLGtCQUFrQixDQUFDO2FBQ2hDOzs7O1lBbkJRLG9CQUFvQjtZQUhELFNBQVM7WUFJNUIsZ0JBQWdCOzRDQTBCcEIsTUFBTSxTQUFDLFFBQVE7eUNBQ2YsTUFBTSxTQUFDLFNBQVM7Ozs7Ozs7SUFKakIsMERBQWtEOzs7OztJQUNsRCw4Q0FBMkI7Ozs7O0lBQzNCLHNEQUEwQzs7Ozs7SUFDMUMsOENBQXVDOztJQUN2Qyx1REFBbUQiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBDb21wb25lbnQsIEluamVjdCwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IENsckRyYWdFdmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL2RyYWctYW5kLWRyb3AvZHJhZy1ldmVudCc7XG5pbXBvcnQgeyBDb2x1bW5SZXNpemVyU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2NvbHVtbi1yZXNpemVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgVGFibGVTaXplU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL3RhYmxlLXNpemUuc2VydmljZSc7XG5pbXBvcnQgeyBVTklRVUVfSURfUFJPVklERVIsIFVOSVFVRV9JRCB9IGZyb20gJy4uLy4uL3V0aWxzL2lkLWdlbmVyYXRvci9pZC1nZW5lcmF0b3Iuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci1kZy1jb2x1bW4tc2VwYXJhdG9yJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwiZGF0YWdyaWQtY29sdW1uLWhhbmRsZVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXG4gICAgICBjbHJEcmFnZ2FibGUgXG4gICAgICBbY2xyR3JvdXBdPVwiY29sdW1uU2VwYXJhdG9ySWRcIiBcbiAgICAgIChjbHJEcmFnU3RhcnQpPVwic2hvd1RyYWNrZXIocmVzaXplVHJhY2tlckVsKVwiIFxuICAgICAgKGNsckRyYWdNb3ZlKT1cIm1vdmVUcmFja2VyKCRldmVudCwgcmVzaXplVHJhY2tlckVsKVwiIFxuICAgICAgKGNsckRyYWdFbmQpPVwiaGlkZVRyYWNrZXIocmVzaXplVHJhY2tlckVsKVwiPjwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJkYXRhZ3JpZC1jb2x1bW4tcmVzaXplLXRyYWNrZXJcIiAjcmVzaXplVHJhY2tlckVsPjwvZGl2PlxuICAgIGAsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmRhdGFncmlkLWNvbHVtbi1zZXBhcmF0b3JdJzogJ3RydWUnLFxuICB9LFxuICBwcm92aWRlcnM6IFtVTklRVUVfSURfUFJPVklERVJdLFxufSlcbmV4cG9ydCBjbGFzcyBDbHJEYXRhZ3JpZENvbHVtblNlcGFyYXRvciB7XG4gIC8vIEV2ZXJ5IGNvbHVtbiBkcmFnZ2FibGUgc2VwYXJhdG9yIHNob3VsZCBoYXZlIGl0cyBvd24gdW5pcXVlIElEXG4gIC8vIGluIG9yZGVyIHRvIG5vdCBjb25mbGljdCB3aXRoIG90aGVyIGRyYWdnYWJsZXMvZHJvcHBhYmxlcy5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb2x1bW5SZXNpemVyU2VydmljZTogQ29sdW1uUmVzaXplclNlcnZpY2UsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgdGFibGVTaXplU2VydmljZTogVGFibGVTaXplU2VydmljZSxcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBhbnksXG4gICAgQEluamVjdChVTklRVUVfSUQpIHB1YmxpYyBjb2x1bW5TZXBhcmF0b3JJZDogc3RyaW5nXG4gICkge31cblxuICBwdWJsaWMgc2hvd1RyYWNrZXIocmVzaXplVHJhY2tlckVsOiBIVE1MRWxlbWVudCkge1xuICAgIHRoaXMuY29sdW1uUmVzaXplclNlcnZpY2Uuc3RhcnRSZXNpemUoKTtcbiAgICBjb25zdCB0YWJsZUhlaWdodCA9IHRoaXMudGFibGVTaXplU2VydmljZS5nZXRDb2x1bW5EcmFnSGVpZ2h0KCk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShyZXNpemVUcmFja2VyRWwsICdoZWlnaHQnLCB0YWJsZUhlaWdodCk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShyZXNpemVUcmFja2VyRWwsICdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gIH1cblxuICBwdWJsaWMgbW92ZVRyYWNrZXIoZXZlbnQ6IENsckRyYWdFdmVudDxhbnk+LCByZXNpemVUcmFja2VyRWw6IEhUTUxFbGVtZW50KSB7XG4gICAgdGhpcy5jb2x1bW5SZXNpemVyU2VydmljZS5jYWxjdWxhdGVSZXNpemUoZXZlbnQpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUocmVzaXplVHJhY2tlckVsLCAndHJhbnNmb3JtJywgYHRyYW5zbGF0ZVgoJHt0aGlzLmNvbHVtblJlc2l6ZXJTZXJ2aWNlLnJlc2l6ZWRCeX1weClgKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZG9jdW1lbnQuYm9keSwgJ2N1cnNvcicsICdjb2wtcmVzaXplJyk7XG4gICAgdGhpcy5yZWRGbGFnVHJhY2tlcihyZXNpemVUcmFja2VyRWwpO1xuICB9XG5cbiAgcHVibGljIGhpZGVUcmFja2VyKHJlc2l6ZVRyYWNrZXJFbDogSFRNTEVsZW1lbnQpIHtcbiAgICB0aGlzLmNvbHVtblJlc2l6ZXJTZXJ2aWNlLmVuZFJlc2l6ZSgpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUocmVzaXplVHJhY2tlckVsLCAnZGlzcGxheScsICdub25lJyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShyZXNpemVUcmFja2VyRWwsICd0cmFuc2Zvcm0nLCBgdHJhbnNsYXRlWCgwcHgpYCk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmRvY3VtZW50LmJvZHksICdjdXJzb3InLCAnYXV0bycpO1xuICB9XG5cbiAgcHJpdmF0ZSByZWRGbGFnVHJhY2tlcihyZXNpemVUcmFja2VyRWw6IEhUTUxFbGVtZW50KSB7XG4gICAgbGV0IGlzV2l0aGluTWF4UmVzaXplUmFuZ2U6IGJvb2xlYW47XG4gICAgLy8gQFRPRE8oSkVSRU1ZKSBSZXZpZXcgdGhpcywgaXQgd2lsbCBhbHdheXMgYmUgdHJ1ZSBiZWNhdXNlIGFib3ZlIGlzIGFsd2F5cyBudWxsXG4gICAgaWYgKGlzV2l0aGluTWF4UmVzaXplUmFuZ2UgIT09IHRoaXMuY29sdW1uUmVzaXplclNlcnZpY2UuaXNXaXRoaW5NYXhSZXNpemVSYW5nZSkge1xuICAgICAgaXNXaXRoaW5NYXhSZXNpemVSYW5nZSA9IHRoaXMuY29sdW1uUmVzaXplclNlcnZpY2UuaXNXaXRoaW5NYXhSZXNpemVSYW5nZTtcbiAgICAgIGlmICghaXNXaXRoaW5NYXhSZXNpemVSYW5nZSkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHJlc2l6ZVRyYWNrZXJFbCwgJ2V4Y2VlZGVkLW1heCcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyhyZXNpemVUcmFja2VyRWwsICdleGNlZWRlZC1tYXgnKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==