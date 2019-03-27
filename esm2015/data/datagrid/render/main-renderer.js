/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { isPlatformBrowser } from '@angular/common';
import { ContentChildren, Directive, ElementRef, PLATFORM_ID, QueryList, Renderer2, } from '@angular/core';
import { DatagridRenderStep } from '../enums/render-step.enum';
import { Items } from '../providers/items';
import { Page } from '../providers/page';
import { TableSizeService } from '../providers/table-size.service';
import { DomAdapter } from '../../../utils/dom-adapter/dom-adapter';
import { DatagridHeaderRenderer } from './header-renderer';
import { NoopDomAdapter } from './noop-dom-adapter';
import { DatagridRenderOrganizer } from './render-organizer';
import { ColumnsService } from '../providers/columns.service';
import { DatagridColumnChanges } from '../enums/column-changes.enum';
import { DatagridRowRenderer } from './row-renderer';
// Fixes build error
// @dynamic (https://github.com/angular/angular/issues/19698#issuecomment-338340211)
/** @type {?} */
export const domAdapterFactory = (/**
 * @param {?} platformId
 * @return {?}
 */
(platformId) => {
    if (isPlatformBrowser(platformId)) {
        return new DomAdapter();
    }
    else {
        return new NoopDomAdapter();
    }
});
// Fixes build error
// @dynamic (https://github.com/angular/angular/issues/19698#issuecomment-338340211)
/**
 * @template T
 */
export class DatagridMainRenderer {
    /**
     * @param {?} organizer
     * @param {?} items
     * @param {?} page
     * @param {?} domAdapter
     * @param {?} el
     * @param {?} renderer
     * @param {?} tableSizeService
     * @param {?} columnsService
     */
    constructor(organizer, items, page, domAdapter, el, renderer, tableSizeService, columnsService) {
        this.organizer = organizer;
        this.items = items;
        this.page = page;
        this.domAdapter = domAdapter;
        this.el = el;
        this.renderer = renderer;
        this.tableSizeService = tableSizeService;
        this.columnsService = columnsService;
        this._heightSet = false;
        this.subscriptions = [];
        /**
         * Indicates if we want to re-compute columns width. This should only happen:
         * 1) When headers change, with columns being added or removed
         * 2) When rows are lazily loaded for the first time
         */
        this.columnsSizesStable = false;
        this.shouldStabilizeColumns = true;
        this.subscriptions.push(this.organizer
            .filterRenderSteps(DatagridRenderStep.COMPUTE_COLUMN_WIDTHS)
            .subscribe((/**
         * @return {?}
         */
        () => this.computeHeadersWidth())));
        this.subscriptions.push(this.page.sizeChange.subscribe((/**
         * @return {?}
         */
        () => {
            if (this._heightSet) {
                this.resetDatagridHeight();
            }
        })));
        this.subscriptions.push(this.items.change.subscribe((/**
         * @return {?}
         */
        () => (this.shouldStabilizeColumns = true))));
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.setupColumns();
        this.subscriptions.push(this.headers.changes.subscribe((/**
         * @return {?}
         */
        () => {
            // TODO: only re-stabilize if a column was added or removed. Reordering is fine.
            // Need to setup columns before stabalizing them
            this.setupColumns();
            this.columnsSizesStable = false;
            this.stabilizeColumns();
        })));
    }
    // Initialize and set Table width for horizontal scrolling here.
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.tableSizeService.table = this.el;
    }
    /**
     * @return {?}
     */
    ngAfterViewChecked() {
        if (this.shouldStabilizeColumns) {
            this.stabilizeColumns();
        }
        if (this.shouldComputeHeight()) {
            setTimeout((/**
             * @return {?}
             */
            () => {
                this.computeDatagridHeight();
            }));
        }
    }
    /**
     * @private
     * @return {?}
     */
    setupColumns() {
        this.headers.forEach((/**
         * @param {?} header
         * @param {?} index
         * @return {?}
         */
        (header, index) => {
            this.columnsService.columns[index] = header.columnState;
        }));
        this.columnsService.columns.splice(this.headers.length); // Trim any old columns
        this.rows.forEach((/**
         * @param {?} row
         * @return {?}
         */
        row => row.setColumnStates()));
    }
    /**
     * @private
     * @return {?}
     */
    shouldComputeHeight() {
        if (!this._heightSet && this.page.size > 0) {
            if (this.items.displayed.length === this.page.size) {
                return true;
            }
        }
        return false;
    }
    /**
     * Computes the height of the datagrid.
     *
     * NOTE: We had to choose to set the height instead of the min-height because
     * IE 11 requires the height on the parent for the children flex grow/shrink properties to work.
     * When we used min-height, 1 1 auto doesn't used to work in IE11 :-(
     * But this doesn't affect the fix. It works in both fixed & variable height datagrids.
     *
     * Refer: http://stackoverflow.com/questions/24396205/flex-grow-not-working-in-internet-explorer-11-0
     * @private
     * @return {?}
     */
    computeDatagridHeight() {
        // IE doesn't return correct value for getComputedStyle(element).getPropertyValue("height")
        /** @type {?} */
        const value = this.domAdapter.clientRect(this.el.nativeElement).height;
        this.renderer.setStyle(this.el.nativeElement, 'height', value + 'px');
        this._heightSet = true;
    }
    /**
     * @private
     * @return {?}
     */
    resetDatagridHeight() {
        this.renderer.setStyle(this.el.nativeElement, 'height', '');
        this._heightSet = false;
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
     * Makes each header compute its width.
     * @private
     * @return {?}
     */
    computeHeadersWidth() {
        /** @type {?} */
        const nbColumns = this.headers.length;
        /** @type {?} */
        let allStrict = true;
        this.headers.forEach((/**
         * @param {?} header
         * @param {?} index
         * @return {?}
         */
        (header, index) => {
            // On the last header column check whether all columns have strict widths.
            // If all columns have strict widths, remove the strict width from the last column and make it the column's
            // minimum width so that when all previous columns shrink, it will get a flexible width and cover the empty
            // gap in the Datagrid.
            /** @type {?} */
            const state = Object.assign({ changes: [DatagridColumnChanges.WIDTH] }, header.getColumnWidthState());
            if (!state.strictWidth) {
                allStrict = false;
            }
            if (nbColumns === index + 1 && allStrict) {
                state.strictWidth = 0;
            }
            this.columnsService.emitStateChange(index, state);
        }));
    }
    /**
     * Triggers a whole re-rendring cycle to set column sizes, if needed.
     * @private
     * @return {?}
     */
    stabilizeColumns() {
        this.shouldStabilizeColumns = false;
        if (this.columnsSizesStable) {
            // Nothing to do.
            return;
        }
        // Resize when the rows are loaded.
        if (this.items.displayed.length > 0) {
            this.organizer.resize();
            this.columnsSizesStable = true;
        }
    }
}
DatagridMainRenderer.decorators = [
    { type: Directive, args: [{
                selector: 'clr-datagrid',
                providers: [{ provide: DomAdapter, useFactory: domAdapterFactory, deps: [PLATFORM_ID] }],
            },] }
];
/** @nocollapse */
DatagridMainRenderer.ctorParameters = () => [
    { type: DatagridRenderOrganizer },
    { type: Items },
    { type: Page },
    { type: DomAdapter },
    { type: ElementRef },
    { type: Renderer2 },
    { type: TableSizeService },
    { type: ColumnsService }
];
DatagridMainRenderer.propDecorators = {
    headers: [{ type: ContentChildren, args: [DatagridHeaderRenderer,] }],
    rows: [{ type: ContentChildren, args: [DatagridRowRenderer,] }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    DatagridMainRenderer.prototype.headers;
    /**
     * @type {?}
     * @private
     */
    DatagridMainRenderer.prototype.rows;
    /**
     * @type {?}
     * @private
     */
    DatagridMainRenderer.prototype._heightSet;
    /**
     * @type {?}
     * @private
     */
    DatagridMainRenderer.prototype.subscriptions;
    /**
     * Indicates if we want to re-compute columns width. This should only happen:
     * 1) When headers change, with columns being added or removed
     * 2) When rows are lazily loaded for the first time
     * @type {?}
     * @private
     */
    DatagridMainRenderer.prototype.columnsSizesStable;
    /**
     * @type {?}
     * @private
     */
    DatagridMainRenderer.prototype.shouldStabilizeColumns;
    /**
     * @type {?}
     * @private
     */
    DatagridMainRenderer.prototype.organizer;
    /**
     * @type {?}
     * @private
     */
    DatagridMainRenderer.prototype.items;
    /**
     * @type {?}
     * @private
     */
    DatagridMainRenderer.prototype.page;
    /**
     * @type {?}
     * @private
     */
    DatagridMainRenderer.prototype.domAdapter;
    /**
     * @type {?}
     * @private
     */
    DatagridMainRenderer.prototype.el;
    /**
     * @type {?}
     * @private
     */
    DatagridMainRenderer.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    DatagridMainRenderer.prototype.tableSizeService;
    /**
     * @type {?}
     * @private
     */
    DatagridMainRenderer.prototype.columnsService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1yZW5kZXJlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvcmVuZGVyL21haW4tcmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDcEQsT0FBTyxFQUlMLGVBQWUsRUFDZixTQUFTLEVBQ1QsVUFBVSxFQUVWLFdBQVcsRUFDWCxTQUFTLEVBQ1QsU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDekMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFFbkUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzNELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUM3RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFFOUQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDckUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFJckQsTUFBTSxPQUFPLGlCQUFpQjs7OztBQUFHLENBQUMsVUFBa0IsRUFBRSxFQUFFO0lBQ3RELElBQUksaUJBQWlCLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDakMsT0FBTyxJQUFJLFVBQVUsRUFBRSxDQUFDO0tBQ3pCO1NBQU07UUFDTCxPQUFPLElBQUksY0FBYyxFQUFFLENBQUM7S0FDN0I7QUFDSCxDQUFDLENBQUE7Ozs7OztBQVFELE1BQU0sT0FBTyxvQkFBb0I7Ozs7Ozs7Ozs7O0lBQy9CLFlBQ1UsU0FBa0MsRUFDbEMsS0FBWSxFQUNaLElBQVUsRUFDVixVQUFzQixFQUN0QixFQUFjLEVBQ2QsUUFBbUIsRUFDbkIsZ0JBQWtDLEVBQ2xDLGNBQThCO1FBUDlCLGNBQVMsR0FBVCxTQUFTLENBQXlCO1FBQ2xDLFVBQUssR0FBTCxLQUFLLENBQU87UUFDWixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1YsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQ2QsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQTJEaEMsZUFBVSxHQUFZLEtBQUssQ0FBQztRQWlDNUIsa0JBQWEsR0FBbUIsRUFBRSxDQUFDOzs7Ozs7UUF1Q25DLHVCQUFrQixHQUFHLEtBQUssQ0FBQztRQUUzQiwyQkFBc0IsR0FBRyxJQUFJLENBQUM7UUFuSXBDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUNyQixJQUFJLENBQUMsU0FBUzthQUNYLGlCQUFpQixDQUFDLGtCQUFrQixDQUFDLHFCQUFxQixDQUFDO2FBQzNELFNBQVM7OztRQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxFQUFDLENBQy9DLENBQUM7UUFFRixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUzs7O1FBQUMsR0FBRyxFQUFFO1lBQ2xDLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDbkIsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7YUFDNUI7UUFDSCxDQUFDLEVBQUMsQ0FDSCxDQUFDO1FBQ0YsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBUzs7O1FBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDLEVBQUMsQ0FBQyxDQUFDO0lBQ25HLENBQUM7Ozs7SUFLRCxrQkFBa0I7UUFDaEIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBRXBCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUNyQixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTOzs7UUFBQyxHQUFHLEVBQUU7WUFDbEMsZ0ZBQWdGO1lBQ2hGLGdEQUFnRDtZQUNoRCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDcEIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQztZQUNoQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUMxQixDQUFDLEVBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQzs7Ozs7SUFHRCxlQUFlO1FBQ2IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQ3hDLENBQUM7Ozs7SUFFRCxrQkFBa0I7UUFDaEIsSUFBSSxJQUFJLENBQUMsc0JBQXNCLEVBQUU7WUFDL0IsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7U0FDekI7UUFDRCxJQUFJLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxFQUFFO1lBQzlCLFVBQVU7OztZQUFDLEdBQUcsRUFBRTtnQkFDZCxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztZQUMvQixDQUFDLEVBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQzs7Ozs7SUFFTyxZQUFZO1FBQ2xCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTzs7Ozs7UUFBQyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUNyQyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDO1FBQzFELENBQUMsRUFBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyx1QkFBdUI7UUFDaEYsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPOzs7O1FBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLEVBQUMsQ0FBQztJQUNsRCxDQUFDOzs7OztJQUlPLG1CQUFtQjtRQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLEVBQUU7WUFDMUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ2xELE9BQU8sSUFBSSxDQUFDO2FBQ2I7U0FDRjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQzs7Ozs7Ozs7Ozs7OztJQVlPLHFCQUFxQjs7O2NBRXJCLEtBQUssR0FBVyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDLE1BQU07UUFDOUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsUUFBUSxFQUFFLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQztRQUN0RSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztJQUN6QixDQUFDOzs7OztJQUVPLG1CQUFtQjtRQUN6QixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDNUQsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7SUFDMUIsQ0FBQzs7OztJQUlELFdBQVc7UUFDVCxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU87Ozs7UUFBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsRUFBQyxDQUFDO0lBQ3ZELENBQUM7Ozs7OztJQUtPLG1CQUFtQjs7Y0FDbkIsU0FBUyxHQUFXLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTTs7WUFDekMsU0FBUyxHQUFHLElBQUk7UUFDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPOzs7OztRQUFDLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFOzs7Ozs7a0JBSy9CLEtBQUssbUJBQ1QsT0FBTyxFQUFFLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDLElBQ25DLE1BQU0sQ0FBQyxtQkFBbUIsRUFBRSxDQUNoQztZQUVELElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFO2dCQUN0QixTQUFTLEdBQUcsS0FBSyxDQUFDO2FBQ25CO1lBRUQsSUFBSSxTQUFTLEtBQUssS0FBSyxHQUFHLENBQUMsSUFBSSxTQUFTLEVBQUU7Z0JBQ3hDLEtBQUssQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO2FBQ3ZCO1lBRUQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3BELENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7O0lBY08sZ0JBQWdCO1FBQ3RCLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxLQUFLLENBQUM7UUFDcEMsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEVBQUU7WUFDM0IsaUJBQWlCO1lBQ2pCLE9BQU87U0FDUjtRQUNELG1DQUFtQztRQUNuQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDbkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUN4QixJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO1NBQ2hDO0lBQ0gsQ0FBQzs7O1lBbEtGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsY0FBYztnQkFDeEIsU0FBUyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDO2FBQ3pGOzs7O1lBckJRLHVCQUF1QjtZQVB2QixLQUFLO1lBQ0wsSUFBSTtZQUdKLFVBQVU7WUFiakIsVUFBVTtZQUlWLFNBQVM7WUFPRixnQkFBZ0I7WUFNaEIsY0FBYzs7O3NCQWdEcEIsZUFBZSxTQUFDLHNCQUFzQjttQkFDdEMsZUFBZSxTQUFDLG1CQUFtQjs7Ozs7OztJQURwQyx1Q0FBNEY7Ozs7O0lBQzVGLG9DQUFtRjs7Ozs7SUF3Q25GLDBDQUFvQzs7Ozs7SUFpQ3BDLDZDQUEyQzs7Ozs7Ozs7SUF1QzNDLGtEQUFtQzs7Ozs7SUFFbkMsc0RBQXNDOzs7OztJQTVJcEMseUNBQTBDOzs7OztJQUMxQyxxQ0FBb0I7Ozs7O0lBQ3BCLG9DQUFrQjs7Ozs7SUFDbEIsMENBQThCOzs7OztJQUM5QixrQ0FBc0I7Ozs7O0lBQ3RCLHdDQUEyQjs7Ozs7SUFDM0IsZ0RBQTBDOzs7OztJQUMxQyw4Q0FBc0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBBZnRlclZpZXdDaGVja2VkLFxuICBBZnRlclZpZXdJbml0LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgT25EZXN0cm95LFxuICBQTEFURk9STV9JRCxcbiAgUXVlcnlMaXN0LFxuICBSZW5kZXJlcjIsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IERhdGFncmlkUmVuZGVyU3RlcCB9IGZyb20gJy4uL2VudW1zL3JlbmRlci1zdGVwLmVudW0nO1xuaW1wb3J0IHsgSXRlbXMgfSBmcm9tICcuLi9wcm92aWRlcnMvaXRlbXMnO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gJy4uL3Byb3ZpZGVycy9wYWdlJztcbmltcG9ydCB7IFRhYmxlU2l6ZVNlcnZpY2UgfSBmcm9tICcuLi9wcm92aWRlcnMvdGFibGUtc2l6ZS5zZXJ2aWNlJztcblxuaW1wb3J0IHsgRG9tQWRhcHRlciB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2RvbS1hZGFwdGVyL2RvbS1hZGFwdGVyJztcbmltcG9ydCB7IERhdGFncmlkSGVhZGVyUmVuZGVyZXIgfSBmcm9tICcuL2hlYWRlci1yZW5kZXJlcic7XG5pbXBvcnQgeyBOb29wRG9tQWRhcHRlciB9IGZyb20gJy4vbm9vcC1kb20tYWRhcHRlcic7XG5pbXBvcnQgeyBEYXRhZ3JpZFJlbmRlck9yZ2FuaXplciB9IGZyb20gJy4vcmVuZGVyLW9yZ2FuaXplcic7XG5pbXBvcnQgeyBDb2x1bW5zU2VydmljZSB9IGZyb20gJy4uL3Byb3ZpZGVycy9jb2x1bW5zLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0YWdyaWRDb2x1bW5TdGF0ZSB9IGZyb20gJy4uL2ludGVyZmFjZXMvY29sdW1uLXN0YXRlLmludGVyZmFjZSc7XG5pbXBvcnQgeyBEYXRhZ3JpZENvbHVtbkNoYW5nZXMgfSBmcm9tICcuLi9lbnVtcy9jb2x1bW4tY2hhbmdlcy5lbnVtJztcbmltcG9ydCB7IERhdGFncmlkUm93UmVuZGVyZXIgfSBmcm9tICcuL3Jvdy1yZW5kZXJlcic7XG5cbi8vIEZpeGVzIGJ1aWxkIGVycm9yXG4vLyBAZHluYW1pYyAoaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMTk2OTgjaXNzdWVjb21tZW50LTMzODM0MDIxMSlcbmV4cG9ydCBjb25zdCBkb21BZGFwdGVyRmFjdG9yeSA9IChwbGF0Zm9ybUlkOiBPYmplY3QpID0+IHtcbiAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHBsYXRmb3JtSWQpKSB7XG4gICAgcmV0dXJuIG5ldyBEb21BZGFwdGVyKCk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5ldyBOb29wRG9tQWRhcHRlcigpO1xuICB9XG59O1xuXG4vLyBGaXhlcyBidWlsZCBlcnJvclxuLy8gQGR5bmFtaWMgKGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzE5Njk4I2lzc3VlY29tbWVudC0zMzgzNDAyMTEpXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdjbHItZGF0YWdyaWQnLFxuICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IERvbUFkYXB0ZXIsIHVzZUZhY3Rvcnk6IGRvbUFkYXB0ZXJGYWN0b3J5LCBkZXBzOiBbUExBVEZPUk1fSURdIH1dLFxufSlcbmV4cG9ydCBjbGFzcyBEYXRhZ3JpZE1haW5SZW5kZXJlcjxUID0gYW55PiBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIEFmdGVyVmlld0luaXQsIEFmdGVyVmlld0NoZWNrZWQsIE9uRGVzdHJveSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgb3JnYW5pemVyOiBEYXRhZ3JpZFJlbmRlck9yZ2FuaXplcixcbiAgICBwcml2YXRlIGl0ZW1zOiBJdGVtcyxcbiAgICBwcml2YXRlIHBhZ2U6IFBhZ2UsXG4gICAgcHJpdmF0ZSBkb21BZGFwdGVyOiBEb21BZGFwdGVyLFxuICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgdGFibGVTaXplU2VydmljZTogVGFibGVTaXplU2VydmljZSxcbiAgICBwcml2YXRlIGNvbHVtbnNTZXJ2aWNlOiBDb2x1bW5zU2VydmljZVxuICApIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMub3JnYW5pemVyXG4gICAgICAgIC5maWx0ZXJSZW5kZXJTdGVwcyhEYXRhZ3JpZFJlbmRlclN0ZXAuQ09NUFVURV9DT0xVTU5fV0lEVEhTKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuY29tcHV0ZUhlYWRlcnNXaWR0aCgpKVxuICAgICk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMucGFnZS5zaXplQ2hhbmdlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLl9oZWlnaHRTZXQpIHtcbiAgICAgICAgICB0aGlzLnJlc2V0RGF0YWdyaWRIZWlnaHQoKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKHRoaXMuaXRlbXMuY2hhbmdlLnN1YnNjcmliZSgoKSA9PiAodGhpcy5zaG91bGRTdGFiaWxpemVDb2x1bW5zID0gdHJ1ZSkpKTtcbiAgfVxuXG4gIEBDb250ZW50Q2hpbGRyZW4oRGF0YWdyaWRIZWFkZXJSZW5kZXJlcikgcHJpdmF0ZSBoZWFkZXJzOiBRdWVyeUxpc3Q8RGF0YWdyaWRIZWFkZXJSZW5kZXJlcj47XG4gIEBDb250ZW50Q2hpbGRyZW4oRGF0YWdyaWRSb3dSZW5kZXJlcikgcHJpdmF0ZSByb3dzOiBRdWVyeUxpc3Q8RGF0YWdyaWRSb3dSZW5kZXJlcj47XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIHRoaXMuc2V0dXBDb2x1bW5zKCk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMuaGVhZGVycy5jaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIC8vIFRPRE86IG9ubHkgcmUtc3RhYmlsaXplIGlmIGEgY29sdW1uIHdhcyBhZGRlZCBvciByZW1vdmVkLiBSZW9yZGVyaW5nIGlzIGZpbmUuXG4gICAgICAgIC8vIE5lZWQgdG8gc2V0dXAgY29sdW1ucyBiZWZvcmUgc3RhYmFsaXppbmcgdGhlbVxuICAgICAgICB0aGlzLnNldHVwQ29sdW1ucygpO1xuICAgICAgICB0aGlzLmNvbHVtbnNTaXplc1N0YWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnN0YWJpbGl6ZUNvbHVtbnMoKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8vIEluaXRpYWxpemUgYW5kIHNldCBUYWJsZSB3aWR0aCBmb3IgaG9yaXpvbnRhbCBzY3JvbGxpbmcgaGVyZS5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMudGFibGVTaXplU2VydmljZS50YWJsZSA9IHRoaXMuZWw7XG4gIH1cblxuICBuZ0FmdGVyVmlld0NoZWNrZWQoKSB7XG4gICAgaWYgKHRoaXMuc2hvdWxkU3RhYmlsaXplQ29sdW1ucykge1xuICAgICAgdGhpcy5zdGFiaWxpemVDb2x1bW5zKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnNob3VsZENvbXB1dGVIZWlnaHQoKSkge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuY29tcHV0ZURhdGFncmlkSGVpZ2h0KCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldHVwQ29sdW1ucygpIHtcbiAgICB0aGlzLmhlYWRlcnMuZm9yRWFjaCgoaGVhZGVyLCBpbmRleCkgPT4ge1xuICAgICAgdGhpcy5jb2x1bW5zU2VydmljZS5jb2x1bW5zW2luZGV4XSA9IGhlYWRlci5jb2x1bW5TdGF0ZTtcbiAgICB9KTtcbiAgICB0aGlzLmNvbHVtbnNTZXJ2aWNlLmNvbHVtbnMuc3BsaWNlKHRoaXMuaGVhZGVycy5sZW5ndGgpOyAvLyBUcmltIGFueSBvbGQgY29sdW1uc1xuICAgIHRoaXMucm93cy5mb3JFYWNoKHJvdyA9PiByb3cuc2V0Q29sdW1uU3RhdGVzKCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGVpZ2h0U2V0OiBib29sZWFuID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBzaG91bGRDb21wdXRlSGVpZ2h0KCk6IGJvb2xlYW4ge1xuICAgIGlmICghdGhpcy5faGVpZ2h0U2V0ICYmIHRoaXMucGFnZS5zaXplID4gMCkge1xuICAgICAgaWYgKHRoaXMuaXRlbXMuZGlzcGxheWVkLmxlbmd0aCA9PT0gdGhpcy5wYWdlLnNpemUpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb21wdXRlcyB0aGUgaGVpZ2h0IG9mIHRoZSBkYXRhZ3JpZC5cbiAgICpcbiAgICogTk9URTogV2UgaGFkIHRvIGNob29zZSB0byBzZXQgdGhlIGhlaWdodCBpbnN0ZWFkIG9mIHRoZSBtaW4taGVpZ2h0IGJlY2F1c2VcbiAgICogSUUgMTEgcmVxdWlyZXMgdGhlIGhlaWdodCBvbiB0aGUgcGFyZW50IGZvciB0aGUgY2hpbGRyZW4gZmxleCBncm93L3NocmluayBwcm9wZXJ0aWVzIHRvIHdvcmsuXG4gICAqIFdoZW4gd2UgdXNlZCBtaW4taGVpZ2h0LCAxIDEgYXV0byBkb2Vzbid0IHVzZWQgdG8gd29yayBpbiBJRTExIDotKFxuICAgKiBCdXQgdGhpcyBkb2Vzbid0IGFmZmVjdCB0aGUgZml4LiBJdCB3b3JrcyBpbiBib3RoIGZpeGVkICYgdmFyaWFibGUgaGVpZ2h0IGRhdGFncmlkcy5cbiAgICpcbiAgICogUmVmZXI6IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMjQzOTYyMDUvZmxleC1ncm93LW5vdC13b3JraW5nLWluLWludGVybmV0LWV4cGxvcmVyLTExLTBcbiAgICovXG4gIHByaXZhdGUgY29tcHV0ZURhdGFncmlkSGVpZ2h0KCkge1xuICAgIC8vIElFIGRvZXNuJ3QgcmV0dXJuIGNvcnJlY3QgdmFsdWUgZm9yIGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCkuZ2V0UHJvcGVydHlWYWx1ZShcImhlaWdodFwiKVxuICAgIGNvbnN0IHZhbHVlOiBudW1iZXIgPSB0aGlzLmRvbUFkYXB0ZXIuY2xpZW50UmVjdCh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpLmhlaWdodDtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2hlaWdodCcsIHZhbHVlICsgJ3B4Jyk7XG4gICAgdGhpcy5faGVpZ2h0U2V0ID0gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzZXREYXRhZ3JpZEhlaWdodCgpIHtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2hlaWdodCcsICcnKTtcbiAgICB0aGlzLl9oZWlnaHRTZXQgPSBmYWxzZTtcbiAgfVxuXG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaChzdWIgPT4gc3ViLnVuc3Vic2NyaWJlKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ha2VzIGVhY2ggaGVhZGVyIGNvbXB1dGUgaXRzIHdpZHRoLlxuICAgKi9cbiAgcHJpdmF0ZSBjb21wdXRlSGVhZGVyc1dpZHRoKCkge1xuICAgIGNvbnN0IG5iQ29sdW1uczogbnVtYmVyID0gdGhpcy5oZWFkZXJzLmxlbmd0aDtcbiAgICBsZXQgYWxsU3RyaWN0ID0gdHJ1ZTtcbiAgICB0aGlzLmhlYWRlcnMuZm9yRWFjaCgoaGVhZGVyLCBpbmRleCkgPT4ge1xuICAgICAgLy8gT24gdGhlIGxhc3QgaGVhZGVyIGNvbHVtbiBjaGVjayB3aGV0aGVyIGFsbCBjb2x1bW5zIGhhdmUgc3RyaWN0IHdpZHRocy5cbiAgICAgIC8vIElmIGFsbCBjb2x1bW5zIGhhdmUgc3RyaWN0IHdpZHRocywgcmVtb3ZlIHRoZSBzdHJpY3Qgd2lkdGggZnJvbSB0aGUgbGFzdCBjb2x1bW4gYW5kIG1ha2UgaXQgdGhlIGNvbHVtbidzXG4gICAgICAvLyBtaW5pbXVtIHdpZHRoIHNvIHRoYXQgd2hlbiBhbGwgcHJldmlvdXMgY29sdW1ucyBzaHJpbmssIGl0IHdpbGwgZ2V0IGEgZmxleGlibGUgd2lkdGggYW5kIGNvdmVyIHRoZSBlbXB0eVxuICAgICAgLy8gZ2FwIGluIHRoZSBEYXRhZ3JpZC5cbiAgICAgIGNvbnN0IHN0YXRlOiBQYXJ0aWFsPERhdGFncmlkQ29sdW1uU3RhdGU+ID0ge1xuICAgICAgICBjaGFuZ2VzOiBbRGF0YWdyaWRDb2x1bW5DaGFuZ2VzLldJRFRIXSxcbiAgICAgICAgLi4uaGVhZGVyLmdldENvbHVtbldpZHRoU3RhdGUoKSxcbiAgICAgIH07XG5cbiAgICAgIGlmICghc3RhdGUuc3RyaWN0V2lkdGgpIHtcbiAgICAgICAgYWxsU3RyaWN0ID0gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGlmIChuYkNvbHVtbnMgPT09IGluZGV4ICsgMSAmJiBhbGxTdHJpY3QpIHtcbiAgICAgICAgc3RhdGUuc3RyaWN0V2lkdGggPSAwO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmNvbHVtbnNTZXJ2aWNlLmVtaXRTdGF0ZUNoYW5nZShpbmRleCwgc3RhdGUpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEluZGljYXRlcyBpZiB3ZSB3YW50IHRvIHJlLWNvbXB1dGUgY29sdW1ucyB3aWR0aC4gVGhpcyBzaG91bGQgb25seSBoYXBwZW46XG4gICAqIDEpIFdoZW4gaGVhZGVycyBjaGFuZ2UsIHdpdGggY29sdW1ucyBiZWluZyBhZGRlZCBvciByZW1vdmVkXG4gICAqIDIpIFdoZW4gcm93cyBhcmUgbGF6aWx5IGxvYWRlZCBmb3IgdGhlIGZpcnN0IHRpbWVcbiAgICovXG4gIHByaXZhdGUgY29sdW1uc1NpemVzU3RhYmxlID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBzaG91bGRTdGFiaWxpemVDb2x1bW5zID0gdHJ1ZTtcblxuICAvKipcbiAgICogVHJpZ2dlcnMgYSB3aG9sZSByZS1yZW5kcmluZyBjeWNsZSB0byBzZXQgY29sdW1uIHNpemVzLCBpZiBuZWVkZWQuXG4gICAqL1xuICBwcml2YXRlIHN0YWJpbGl6ZUNvbHVtbnMoKSB7XG4gICAgdGhpcy5zaG91bGRTdGFiaWxpemVDb2x1bW5zID0gZmFsc2U7XG4gICAgaWYgKHRoaXMuY29sdW1uc1NpemVzU3RhYmxlKSB7XG4gICAgICAvLyBOb3RoaW5nIHRvIGRvLlxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBSZXNpemUgd2hlbiB0aGUgcm93cyBhcmUgbG9hZGVkLlxuICAgIGlmICh0aGlzLml0ZW1zLmRpc3BsYXllZC5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLm9yZ2FuaXplci5yZXNpemUoKTtcbiAgICAgIHRoaXMuY29sdW1uc1NpemVzU3RhYmxlID0gdHJ1ZTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==