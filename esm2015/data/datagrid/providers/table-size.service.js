/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, Renderer2 } from '@angular/core';
import { DatagridRenderStep } from './../enums/render-step.enum';
import { DatagridRenderOrganizer } from './../render/render-organizer';
/**
 * \@description
 * Internal datagrid service that holds a reference to the clr-dg-table element and exposes a method to get height.
 */
export class TableSizeService {
    /**
     * @param {?} platformId
     * @param {?} renderOrganizer
     * @param {?} renderer
     */
    constructor(platformId, renderOrganizer, renderer) {
        this.platformId = platformId;
        this.renderer = renderer;
        this.subscriptions = [];
        this.subscriptions.push(renderOrganizer.renderStep.subscribe(step => {
            if (step === DatagridRenderStep.UPDATE_ROW_WIDTH) {
                this.updateRowWidth();
            }
        }));
    }
    /**
     * @return {?}
     */
    get tableRef() {
        return this._tableRef;
    }
    /**
     * @param {?} element
     * @return {?}
     */
    set tableRef(element) {
        this._tableRef = element;
    }
    /**
     * @param {?} table
     * @return {?}
     */
    set table(table) {
        if (isPlatformBrowser(this.platformId) && table.nativeElement) {
            this.tableRef = table.nativeElement.querySelector('.datagrid-table');
        }
    }
    // Used when resizing columns to show the column border being dragged.
    /**
     * @return {?}
     */
    getColumnDragHeight() {
        if (!this.tableRef) {
            return;
        }
        return `${this.tableRef.clientHeight}px`;
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
    updateRowWidth() {
        if (!this.tableRef) {
            return;
        }
        /** @type {?} */
        let newWidth = 0;
        this.renderer.removeStyle(this.tableRef, 'width');
        this.columns = Array.from(this.tableRef.querySelectorAll('.datagrid-column'));
        this.columns.forEach(item => {
            newWidth += item.clientWidth;
        });
        this.renderer.setStyle(this.tableRef, 'width', newWidth + 'px');
    }
}
TableSizeService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
TableSizeService.ctorParameters = () => [
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
    { type: DatagridRenderOrganizer },
    { type: Renderer2 }
];
if (false) {
    /** @type {?} */
    TableSizeService.prototype._tableRef;
    /** @type {?} */
    TableSizeService.prototype.columns;
    /** @type {?} */
    TableSizeService.prototype.subscriptions;
    /** @type {?} */
    TableSizeService.prototype.platformId;
    /** @type {?} */
    TableSizeService.prototype.renderer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtc2l6ZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9wcm92aWRlcnMvdGFibGUtc2l6ZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3BELE9BQU8sRUFBYyxNQUFNLEVBQUUsVUFBVSxFQUFhLFdBQVcsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHbEcsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDakUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sOEJBQThCLENBQUM7Ozs7O0FBT3ZFLE1BQU0sT0FBTyxnQkFBZ0I7Ozs7OztJQVkzQixZQUMrQixVQUFrQixFQUMvQyxlQUF3QyxFQUNoQyxRQUFtQjtRQUZFLGVBQVUsR0FBVixVQUFVLENBQVE7UUFFdkMsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQXdCckIsa0JBQWEsR0FBbUIsRUFBRSxDQUFDO1FBdEJ6QyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FDckIsZUFBZSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDMUMsSUFBSSxJQUFJLEtBQUssa0JBQWtCLENBQUMsZ0JBQWdCLEVBQUU7Z0JBQ2hELElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQzthQUN2QjtRQUNILENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDOzs7O0lBcEJELElBQVcsUUFBUTtRQUNqQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQzs7Ozs7SUFFRCxJQUFXLFFBQVEsQ0FBQyxPQUFvQjtRQUN0QyxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQztJQUMzQixDQUFDOzs7OztJQWVELElBQVcsS0FBSyxDQUFDLEtBQWlCO1FBQ2hDLElBQUksaUJBQWlCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEtBQUssQ0FBQyxhQUFhLEVBQUU7WUFDN0QsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1NBQ3RFO0lBQ0gsQ0FBQzs7Ozs7SUFHRCxtQkFBbUI7UUFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDbEIsT0FBTztTQUNSO1FBQ0QsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxJQUFJLENBQUM7SUFDM0MsQ0FBQzs7OztJQUlELFdBQVc7UUFDVCxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7Ozs7SUFFRCxjQUFjO1FBQ1osSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDbEIsT0FBTztTQUNSOztZQUNHLFFBQVEsR0FBVyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO1FBQzlFLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzFCLFFBQVEsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQy9CLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsUUFBUSxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQ2xFLENBQUM7OztZQXpERixVQUFVOzs7O1lBY2tDLE1BQU0sdUJBQTlDLE1BQU0sU0FBQyxXQUFXO1lBcEJkLHVCQUF1QjtZQUppQyxTQUFTOzs7O0lBWXhFLHFDQUErQjs7SUFDL0IsbUNBQTJCOztJQXFDM0IseUNBQTJDOztJQTFCekMsc0NBQStDOztJQUUvQyxvQ0FBMkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBFbGVtZW50UmVmLCBJbmplY3QsIEluamVjdGFibGUsIE9uRGVzdHJveSwgUExBVEZPUk1fSUQsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IERhdGFncmlkUmVuZGVyU3RlcCB9IGZyb20gJy4vLi4vZW51bXMvcmVuZGVyLXN0ZXAuZW51bSc7XG5pbXBvcnQgeyBEYXRhZ3JpZFJlbmRlck9yZ2FuaXplciB9IGZyb20gJy4vLi4vcmVuZGVyL3JlbmRlci1vcmdhbml6ZXInO1xuXG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICogSW50ZXJuYWwgZGF0YWdyaWQgc2VydmljZSB0aGF0IGhvbGRzIGEgcmVmZXJlbmNlIHRvIHRoZSBjbHItZGctdGFibGUgZWxlbWVudCBhbmQgZXhwb3NlcyBhIG1ldGhvZCB0byBnZXQgaGVpZ2h0LlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVGFibGVTaXplU2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgX3RhYmxlUmVmOiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBjb2x1bW5zOiBFbGVtZW50W107XG5cbiAgcHVibGljIGdldCB0YWJsZVJlZigpOiBIVE1MRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuX3RhYmxlUmVmO1xuICB9XG5cbiAgcHVibGljIHNldCB0YWJsZVJlZihlbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICAgIHRoaXMuX3RhYmxlUmVmID0gZWxlbWVudDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogT2JqZWN0LFxuICAgIHJlbmRlck9yZ2FuaXplcjogRGF0YWdyaWRSZW5kZXJPcmdhbml6ZXIsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyXG4gICkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgcmVuZGVyT3JnYW5pemVyLnJlbmRlclN0ZXAuc3Vic2NyaWJlKHN0ZXAgPT4ge1xuICAgICAgICBpZiAoc3RlcCA9PT0gRGF0YWdyaWRSZW5kZXJTdGVwLlVQREFURV9ST1dfV0lEVEgpIHtcbiAgICAgICAgICB0aGlzLnVwZGF0ZVJvd1dpZHRoKCk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuICBwdWJsaWMgc2V0IHRhYmxlKHRhYmxlOiBFbGVtZW50UmVmKSB7XG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkgJiYgdGFibGUubmF0aXZlRWxlbWVudCkge1xuICAgICAgdGhpcy50YWJsZVJlZiA9IHRhYmxlLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLmRhdGFncmlkLXRhYmxlJyk7XG4gICAgfVxuICB9XG5cbiAgLy8gVXNlZCB3aGVuIHJlc2l6aW5nIGNvbHVtbnMgdG8gc2hvdyB0aGUgY29sdW1uIGJvcmRlciBiZWluZyBkcmFnZ2VkLlxuICBnZXRDb2x1bW5EcmFnSGVpZ2h0KCk6IHN0cmluZyB7XG4gICAgaWYgKCF0aGlzLnRhYmxlUmVmKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJldHVybiBgJHt0aGlzLnRhYmxlUmVmLmNsaWVudEhlaWdodH1weGA7XG4gIH1cblxuICBwcml2YXRlIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmZvckVhY2goc3ViID0+IHN1Yi51bnN1YnNjcmliZSgpKTtcbiAgfVxuXG4gIHVwZGF0ZVJvd1dpZHRoKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy50YWJsZVJlZikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgbmV3V2lkdGg6IG51bWJlciA9IDA7XG4gICAgdGhpcy5yZW5kZXJlci5yZW1vdmVTdHlsZSh0aGlzLnRhYmxlUmVmLCAnd2lkdGgnKTtcbiAgICB0aGlzLmNvbHVtbnMgPSBBcnJheS5mcm9tKHRoaXMudGFibGVSZWYucXVlcnlTZWxlY3RvckFsbCgnLmRhdGFncmlkLWNvbHVtbicpKTtcbiAgICB0aGlzLmNvbHVtbnMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIG5ld1dpZHRoICs9IGl0ZW0uY2xpZW50V2lkdGg7XG4gICAgfSk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLnRhYmxlUmVmLCAnd2lkdGgnLCBuZXdXaWR0aCArICdweCcpO1xuICB9XG59XG4iXX0=