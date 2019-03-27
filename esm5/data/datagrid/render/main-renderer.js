/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
export var domAdapterFactory = (/**
 * @param {?} platformId
 * @return {?}
 */
function (platformId) {
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
var DatagridMainRenderer = /** @class */ (function () {
    function DatagridMainRenderer(organizer, items, page, domAdapter, el, renderer, tableSizeService, columnsService) {
        var _this = this;
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
        function () { return _this.computeHeadersWidth(); })));
        this.subscriptions.push(this.page.sizeChange.subscribe((/**
         * @return {?}
         */
        function () {
            if (_this._heightSet) {
                _this.resetDatagridHeight();
            }
        })));
        this.subscriptions.push(this.items.change.subscribe((/**
         * @return {?}
         */
        function () { return (_this.shouldStabilizeColumns = true); })));
    }
    /**
     * @return {?}
     */
    DatagridMainRenderer.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.setupColumns();
        this.subscriptions.push(this.headers.changes.subscribe((/**
         * @return {?}
         */
        function () {
            // TODO: only re-stabilize if a column was added or removed. Reordering is fine.
            // Need to setup columns before stabalizing them
            _this.setupColumns();
            _this.columnsSizesStable = false;
            _this.stabilizeColumns();
        })));
    };
    // Initialize and set Table width for horizontal scrolling here.
    // Initialize and set Table width for horizontal scrolling here.
    /**
     * @return {?}
     */
    DatagridMainRenderer.prototype.ngAfterViewInit = 
    // Initialize and set Table width for horizontal scrolling here.
    /**
     * @return {?}
     */
    function () {
        this.tableSizeService.table = this.el;
    };
    /**
     * @return {?}
     */
    DatagridMainRenderer.prototype.ngAfterViewChecked = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.shouldStabilizeColumns) {
            this.stabilizeColumns();
        }
        if (this.shouldComputeHeight()) {
            setTimeout((/**
             * @return {?}
             */
            function () {
                _this.computeDatagridHeight();
            }));
        }
    };
    /**
     * @private
     * @return {?}
     */
    DatagridMainRenderer.prototype.setupColumns = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.headers.forEach((/**
         * @param {?} header
         * @param {?} index
         * @return {?}
         */
        function (header, index) {
            _this.columnsService.columns[index] = header.columnState;
        }));
        this.columnsService.columns.splice(this.headers.length); // Trim any old columns
        this.rows.forEach((/**
         * @param {?} row
         * @return {?}
         */
        function (row) { return row.setColumnStates(); }));
    };
    /**
     * @private
     * @return {?}
     */
    DatagridMainRenderer.prototype.shouldComputeHeight = /**
     * @private
     * @return {?}
     */
    function () {
        if (!this._heightSet && this.page.size > 0) {
            if (this.items.displayed.length === this.page.size) {
                return true;
            }
        }
        return false;
    };
    /**
     * Computes the height of the datagrid.
     *
     * NOTE: We had to choose to set the height instead of the min-height because
     * IE 11 requires the height on the parent for the children flex grow/shrink properties to work.
     * When we used min-height, 1 1 auto doesn't used to work in IE11 :-(
     * But this doesn't affect the fix. It works in both fixed & variable height datagrids.
     *
     * Refer: http://stackoverflow.com/questions/24396205/flex-grow-not-working-in-internet-explorer-11-0
     */
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
    DatagridMainRenderer.prototype.computeDatagridHeight = /**
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
    function () {
        // IE doesn't return correct value for getComputedStyle(element).getPropertyValue("height")
        /** @type {?} */
        var value = this.domAdapter.clientRect(this.el.nativeElement).height;
        this.renderer.setStyle(this.el.nativeElement, 'height', value + 'px');
        this._heightSet = true;
    };
    /**
     * @private
     * @return {?}
     */
    DatagridMainRenderer.prototype.resetDatagridHeight = /**
     * @private
     * @return {?}
     */
    function () {
        this.renderer.setStyle(this.el.nativeElement, 'height', '');
        this._heightSet = false;
    };
    /**
     * @return {?}
     */
    DatagridMainRenderer.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        function (sub) { return sub.unsubscribe(); }));
    };
    /**
     * Makes each header compute its width.
     */
    /**
     * Makes each header compute its width.
     * @private
     * @return {?}
     */
    DatagridMainRenderer.prototype.computeHeadersWidth = /**
     * Makes each header compute its width.
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var nbColumns = this.headers.length;
        /** @type {?} */
        var allStrict = true;
        this.headers.forEach((/**
         * @param {?} header
         * @param {?} index
         * @return {?}
         */
        function (header, index) {
            // On the last header column check whether all columns have strict widths.
            // If all columns have strict widths, remove the strict width from the last column and make it the column's
            // minimum width so that when all previous columns shrink, it will get a flexible width and cover the empty
            // gap in the Datagrid.
            /** @type {?} */
            var state = tslib_1.__assign({ changes: [DatagridColumnChanges.WIDTH] }, header.getColumnWidthState());
            if (!state.strictWidth) {
                allStrict = false;
            }
            if (nbColumns === index + 1 && allStrict) {
                state.strictWidth = 0;
            }
            _this.columnsService.emitStateChange(index, state);
        }));
    };
    /**
     * Triggers a whole re-rendring cycle to set column sizes, if needed.
     */
    /**
     * Triggers a whole re-rendring cycle to set column sizes, if needed.
     * @private
     * @return {?}
     */
    DatagridMainRenderer.prototype.stabilizeColumns = /**
     * Triggers a whole re-rendring cycle to set column sizes, if needed.
     * @private
     * @return {?}
     */
    function () {
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
    };
    DatagridMainRenderer.decorators = [
        { type: Directive, args: [{
                    selector: 'clr-datagrid',
                    providers: [{ provide: DomAdapter, useFactory: domAdapterFactory, deps: [PLATFORM_ID] }],
                },] }
    ];
    /** @nocollapse */
    DatagridMainRenderer.ctorParameters = function () { return [
        { type: DatagridRenderOrganizer },
        { type: Items },
        { type: Page },
        { type: DomAdapter },
        { type: ElementRef },
        { type: Renderer2 },
        { type: TableSizeService },
        { type: ColumnsService }
    ]; };
    DatagridMainRenderer.propDecorators = {
        headers: [{ type: ContentChildren, args: [DatagridHeaderRenderer,] }],
        rows: [{ type: ContentChildren, args: [DatagridRowRenderer,] }]
    };
    return DatagridMainRenderer;
}());
export { DatagridMainRenderer };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1yZW5kZXJlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvcmVuZGVyL21haW4tcmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUtBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3BELE9BQU8sRUFJTCxlQUFlLEVBQ2YsU0FBUyxFQUNULFVBQVUsRUFFVixXQUFXLEVBQ1gsU0FBUyxFQUNULFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUd2QixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDM0MsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3pDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBRW5FLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNwRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDcEQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDN0QsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRTlELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7O0FBSXJELE1BQU0sS0FBTyxpQkFBaUI7Ozs7QUFBRyxVQUFDLFVBQWtCO0lBQ2xELElBQUksaUJBQWlCLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDakMsT0FBTyxJQUFJLFVBQVUsRUFBRSxDQUFDO0tBQ3pCO1NBQU07UUFDTCxPQUFPLElBQUksY0FBYyxFQUFFLENBQUM7S0FDN0I7QUFDSCxDQUFDLENBQUE7Ozs7OztBQUlEO0lBS0UsOEJBQ1UsU0FBa0MsRUFDbEMsS0FBWSxFQUNaLElBQVUsRUFDVixVQUFzQixFQUN0QixFQUFjLEVBQ2QsUUFBbUIsRUFDbkIsZ0JBQWtDLEVBQ2xDLGNBQThCO1FBUnhDLGlCQXdCQztRQXZCUyxjQUFTLEdBQVQsU0FBUyxDQUF5QjtRQUNsQyxVQUFLLEdBQUwsS0FBSyxDQUFPO1FBQ1osU0FBSSxHQUFKLElBQUksQ0FBTTtRQUNWLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUNkLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUEyRGhDLGVBQVUsR0FBWSxLQUFLLENBQUM7UUFpQzVCLGtCQUFhLEdBQW1CLEVBQUUsQ0FBQzs7Ozs7O1FBdUNuQyx1QkFBa0IsR0FBRyxLQUFLLENBQUM7UUFFM0IsMkJBQXNCLEdBQUcsSUFBSSxDQUFDO1FBbklwQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FDckIsSUFBSSxDQUFDLFNBQVM7YUFDWCxpQkFBaUIsQ0FBQyxrQkFBa0IsQ0FBQyxxQkFBcUIsQ0FBQzthQUMzRCxTQUFTOzs7UUFBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLG1CQUFtQixFQUFFLEVBQTFCLENBQTBCLEVBQUMsQ0FDL0MsQ0FBQztRQUVGLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTOzs7UUFBQztZQUM3QixJQUFJLEtBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQ25CLEtBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2FBQzVCO1FBQ0gsQ0FBQyxFQUFDLENBQ0gsQ0FBQztRQUNGLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVM7OztRQUFDLGNBQU0sT0FBQSxDQUFDLEtBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUMsRUFBcEMsQ0FBb0MsRUFBQyxDQUFDLENBQUM7SUFDbkcsQ0FBQzs7OztJQUtELGlEQUFrQjs7O0lBQWxCO1FBQUEsaUJBWUM7UUFYQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFcEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQ3JCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVM7OztRQUFDO1lBQzdCLGdGQUFnRjtZQUNoRixnREFBZ0Q7WUFDaEQsS0FBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ3BCLEtBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7WUFDaEMsS0FBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDMUIsQ0FBQyxFQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFRCxnRUFBZ0U7Ozs7O0lBQ2hFLDhDQUFlOzs7OztJQUFmO1FBQ0UsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQ3hDLENBQUM7Ozs7SUFFRCxpREFBa0I7OztJQUFsQjtRQUFBLGlCQVNDO1FBUkMsSUFBSSxJQUFJLENBQUMsc0JBQXNCLEVBQUU7WUFDL0IsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7U0FDekI7UUFDRCxJQUFJLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxFQUFFO1lBQzlCLFVBQVU7OztZQUFDO2dCQUNULEtBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1lBQy9CLENBQUMsRUFBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDOzs7OztJQUVPLDJDQUFZOzs7O0lBQXBCO1FBQUEsaUJBTUM7UUFMQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU87Ozs7O1FBQUMsVUFBQyxNQUFNLEVBQUUsS0FBSztZQUNqQyxLQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDO1FBQzFELENBQUMsRUFBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyx1QkFBdUI7UUFDaEYsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPOzs7O1FBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLENBQUMsZUFBZSxFQUFFLEVBQXJCLENBQXFCLEVBQUMsQ0FBQztJQUNsRCxDQUFDOzs7OztJQUlPLGtEQUFtQjs7OztJQUEzQjtRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsRUFBRTtZQUMxQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDbEQsT0FBTyxJQUFJLENBQUM7YUFDYjtTQUNGO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHOzs7Ozs7Ozs7Ozs7O0lBQ0ssb0RBQXFCOzs7Ozs7Ozs7Ozs7SUFBN0I7OztZQUVRLEtBQUssR0FBVyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDLE1BQU07UUFDOUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsUUFBUSxFQUFFLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQztRQUN0RSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztJQUN6QixDQUFDOzs7OztJQUVPLGtEQUFtQjs7OztJQUEzQjtRQUNFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM1RCxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztJQUMxQixDQUFDOzs7O0lBSUQsMENBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPOzs7O1FBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLENBQUMsV0FBVyxFQUFFLEVBQWpCLENBQWlCLEVBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRUQ7O09BRUc7Ozs7OztJQUNLLGtEQUFtQjs7Ozs7SUFBM0I7UUFBQSxpQkF1QkM7O1lBdEJPLFNBQVMsR0FBVyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU07O1lBQ3pDLFNBQVMsR0FBRyxJQUFJO1FBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTzs7Ozs7UUFBQyxVQUFDLE1BQU0sRUFBRSxLQUFLOzs7Ozs7Z0JBSzNCLEtBQUssc0JBQ1QsT0FBTyxFQUFFLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDLElBQ25DLE1BQU0sQ0FBQyxtQkFBbUIsRUFBRSxDQUNoQztZQUVELElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFO2dCQUN0QixTQUFTLEdBQUcsS0FBSyxDQUFDO2FBQ25CO1lBRUQsSUFBSSxTQUFTLEtBQUssS0FBSyxHQUFHLENBQUMsSUFBSSxTQUFTLEVBQUU7Z0JBQ3hDLEtBQUssQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO2FBQ3ZCO1lBRUQsS0FBSSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3BELENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQztJQVdEOztPQUVHOzs7Ozs7SUFDSywrQ0FBZ0I7Ozs7O0lBQXhCO1FBQ0UsSUFBSSxDQUFDLHNCQUFzQixHQUFHLEtBQUssQ0FBQztRQUNwQyxJQUFJLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtZQUMzQixpQkFBaUI7WUFDakIsT0FBTztTQUNSO1FBQ0QsbUNBQW1DO1FBQ25DLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNuQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7U0FDaEM7SUFDSCxDQUFDOztnQkFsS0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxjQUFjO29CQUN4QixTQUFTLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLGlCQUFpQixFQUFFLElBQUksRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUM7aUJBQ3pGOzs7O2dCQXJCUSx1QkFBdUI7Z0JBUHZCLEtBQUs7Z0JBQ0wsSUFBSTtnQkFHSixVQUFVO2dCQWJqQixVQUFVO2dCQUlWLFNBQVM7Z0JBT0YsZ0JBQWdCO2dCQU1oQixjQUFjOzs7MEJBZ0RwQixlQUFlLFNBQUMsc0JBQXNCO3VCQUN0QyxlQUFlLFNBQUMsbUJBQW1COztJQW1JdEMsMkJBQUM7Q0FBQSxBQW5LRCxJQW1LQztTQS9KWSxvQkFBb0I7Ozs7OztJQTJCL0IsdUNBQTRGOzs7OztJQUM1RixvQ0FBbUY7Ozs7O0lBd0NuRiwwQ0FBb0M7Ozs7O0lBaUNwQyw2Q0FBMkM7Ozs7Ozs7O0lBdUMzQyxrREFBbUM7Ozs7O0lBRW5DLHNEQUFzQzs7Ozs7SUE1SXBDLHlDQUEwQzs7Ozs7SUFDMUMscUNBQW9COzs7OztJQUNwQixvQ0FBa0I7Ozs7O0lBQ2xCLDBDQUE4Qjs7Ozs7SUFDOUIsa0NBQXNCOzs7OztJQUN0Qix3Q0FBMkI7Ozs7O0lBQzNCLGdEQUEwQzs7Ozs7SUFDMUMsOENBQXNDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQWZ0ZXJWaWV3Q2hlY2tlZCxcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIE9uRGVzdHJveSxcbiAgUExBVEZPUk1fSUQsXG4gIFF1ZXJ5TGlzdCxcbiAgUmVuZGVyZXIyLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBEYXRhZ3JpZFJlbmRlclN0ZXAgfSBmcm9tICcuLi9lbnVtcy9yZW5kZXItc3RlcC5lbnVtJztcbmltcG9ydCB7IEl0ZW1zIH0gZnJvbSAnLi4vcHJvdmlkZXJzL2l0ZW1zJztcbmltcG9ydCB7IFBhZ2UgfSBmcm9tICcuLi9wcm92aWRlcnMvcGFnZSc7XG5pbXBvcnQgeyBUYWJsZVNpemVTZXJ2aWNlIH0gZnJvbSAnLi4vcHJvdmlkZXJzL3RhYmxlLXNpemUuc2VydmljZSc7XG5cbmltcG9ydCB7IERvbUFkYXB0ZXIgfSBmcm9tICcuLi8uLi8uLi91dGlscy9kb20tYWRhcHRlci9kb20tYWRhcHRlcic7XG5pbXBvcnQgeyBEYXRhZ3JpZEhlYWRlclJlbmRlcmVyIH0gZnJvbSAnLi9oZWFkZXItcmVuZGVyZXInO1xuaW1wb3J0IHsgTm9vcERvbUFkYXB0ZXIgfSBmcm9tICcuL25vb3AtZG9tLWFkYXB0ZXInO1xuaW1wb3J0IHsgRGF0YWdyaWRSZW5kZXJPcmdhbml6ZXIgfSBmcm9tICcuL3JlbmRlci1vcmdhbml6ZXInO1xuaW1wb3J0IHsgQ29sdW1uc1NlcnZpY2UgfSBmcm9tICcuLi9wcm92aWRlcnMvY29sdW1ucy5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGFncmlkQ29sdW1uU3RhdGUgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2NvbHVtbi1zdGF0ZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgRGF0YWdyaWRDb2x1bW5DaGFuZ2VzIH0gZnJvbSAnLi4vZW51bXMvY29sdW1uLWNoYW5nZXMuZW51bSc7XG5pbXBvcnQgeyBEYXRhZ3JpZFJvd1JlbmRlcmVyIH0gZnJvbSAnLi9yb3ctcmVuZGVyZXInO1xuXG4vLyBGaXhlcyBidWlsZCBlcnJvclxuLy8gQGR5bmFtaWMgKGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzE5Njk4I2lzc3VlY29tbWVudC0zMzgzNDAyMTEpXG5leHBvcnQgY29uc3QgZG9tQWRhcHRlckZhY3RvcnkgPSAocGxhdGZvcm1JZDogT2JqZWN0KSA9PiB7XG4gIGlmIChpc1BsYXRmb3JtQnJvd3NlcihwbGF0Zm9ybUlkKSkge1xuICAgIHJldHVybiBuZXcgRG9tQWRhcHRlcigpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBuZXcgTm9vcERvbUFkYXB0ZXIoKTtcbiAgfVxufTtcblxuLy8gRml4ZXMgYnVpbGQgZXJyb3Jcbi8vIEBkeW5hbWljIChodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy8xOTY5OCNpc3N1ZWNvbW1lbnQtMzM4MzQwMjExKVxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnY2xyLWRhdGFncmlkJyxcbiAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBEb21BZGFwdGVyLCB1c2VGYWN0b3J5OiBkb21BZGFwdGVyRmFjdG9yeSwgZGVwczogW1BMQVRGT1JNX0lEXSB9XSxcbn0pXG5leHBvcnQgY2xhc3MgRGF0YWdyaWRNYWluUmVuZGVyZXI8VCA9IGFueT4gaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBBZnRlclZpZXdJbml0LCBBZnRlclZpZXdDaGVja2VkLCBPbkRlc3Ryb3kge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIG9yZ2FuaXplcjogRGF0YWdyaWRSZW5kZXJPcmdhbml6ZXIsXG4gICAgcHJpdmF0ZSBpdGVtczogSXRlbXMsXG4gICAgcHJpdmF0ZSBwYWdlOiBQYWdlLFxuICAgIHByaXZhdGUgZG9tQWRhcHRlcjogRG9tQWRhcHRlcixcbiAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIHRhYmxlU2l6ZVNlcnZpY2U6IFRhYmxlU2l6ZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBjb2x1bW5zU2VydmljZTogQ29sdW1uc1NlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLm9yZ2FuaXplclxuICAgICAgICAuZmlsdGVyUmVuZGVyU3RlcHMoRGF0YWdyaWRSZW5kZXJTdGVwLkNPTVBVVEVfQ09MVU1OX1dJRFRIUylcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmNvbXB1dGVIZWFkZXJzV2lkdGgoKSlcbiAgICApO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLnBhZ2Uuc2l6ZUNoYW5nZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5faGVpZ2h0U2V0KSB7XG4gICAgICAgICAgdGhpcy5yZXNldERhdGFncmlkSGVpZ2h0KCk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaCh0aGlzLml0ZW1zLmNoYW5nZS5zdWJzY3JpYmUoKCkgPT4gKHRoaXMuc2hvdWxkU3RhYmlsaXplQ29sdW1ucyA9IHRydWUpKSk7XG4gIH1cblxuICBAQ29udGVudENoaWxkcmVuKERhdGFncmlkSGVhZGVyUmVuZGVyZXIpIHByaXZhdGUgaGVhZGVyczogUXVlcnlMaXN0PERhdGFncmlkSGVhZGVyUmVuZGVyZXI+O1xuICBAQ29udGVudENoaWxkcmVuKERhdGFncmlkUm93UmVuZGVyZXIpIHByaXZhdGUgcm93czogUXVlcnlMaXN0PERhdGFncmlkUm93UmVuZGVyZXI+O1xuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICB0aGlzLnNldHVwQ29sdW1ucygpO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLmhlYWRlcnMuY2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAvLyBUT0RPOiBvbmx5IHJlLXN0YWJpbGl6ZSBpZiBhIGNvbHVtbiB3YXMgYWRkZWQgb3IgcmVtb3ZlZC4gUmVvcmRlcmluZyBpcyBmaW5lLlxuICAgICAgICAvLyBOZWVkIHRvIHNldHVwIGNvbHVtbnMgYmVmb3JlIHN0YWJhbGl6aW5nIHRoZW1cbiAgICAgICAgdGhpcy5zZXR1cENvbHVtbnMoKTtcbiAgICAgICAgdGhpcy5jb2x1bW5zU2l6ZXNTdGFibGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zdGFiaWxpemVDb2x1bW5zKCk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvLyBJbml0aWFsaXplIGFuZCBzZXQgVGFibGUgd2lkdGggZm9yIGhvcml6b250YWwgc2Nyb2xsaW5nIGhlcmUuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLnRhYmxlU2l6ZVNlcnZpY2UudGFibGUgPSB0aGlzLmVsO1xuICB9XG5cbiAgbmdBZnRlclZpZXdDaGVja2VkKCkge1xuICAgIGlmICh0aGlzLnNob3VsZFN0YWJpbGl6ZUNvbHVtbnMpIHtcbiAgICAgIHRoaXMuc3RhYmlsaXplQ29sdW1ucygpO1xuICAgIH1cbiAgICBpZiAodGhpcy5zaG91bGRDb21wdXRlSGVpZ2h0KCkpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmNvbXB1dGVEYXRhZ3JpZEhlaWdodCgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXR1cENvbHVtbnMoKSB7XG4gICAgdGhpcy5oZWFkZXJzLmZvckVhY2goKGhlYWRlciwgaW5kZXgpID0+IHtcbiAgICAgIHRoaXMuY29sdW1uc1NlcnZpY2UuY29sdW1uc1tpbmRleF0gPSBoZWFkZXIuY29sdW1uU3RhdGU7XG4gICAgfSk7XG4gICAgdGhpcy5jb2x1bW5zU2VydmljZS5jb2x1bW5zLnNwbGljZSh0aGlzLmhlYWRlcnMubGVuZ3RoKTsgLy8gVHJpbSBhbnkgb2xkIGNvbHVtbnNcbiAgICB0aGlzLnJvd3MuZm9yRWFjaChyb3cgPT4gcm93LnNldENvbHVtblN0YXRlcygpKTtcbiAgfVxuXG4gIHByaXZhdGUgX2hlaWdodFNldDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIHByaXZhdGUgc2hvdWxkQ29tcHV0ZUhlaWdodCgpOiBib29sZWFuIHtcbiAgICBpZiAoIXRoaXMuX2hlaWdodFNldCAmJiB0aGlzLnBhZ2Uuc2l6ZSA+IDApIHtcbiAgICAgIGlmICh0aGlzLml0ZW1zLmRpc3BsYXllZC5sZW5ndGggPT09IHRoaXMucGFnZS5zaXplKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogQ29tcHV0ZXMgdGhlIGhlaWdodCBvZiB0aGUgZGF0YWdyaWQuXG4gICAqXG4gICAqIE5PVEU6IFdlIGhhZCB0byBjaG9vc2UgdG8gc2V0IHRoZSBoZWlnaHQgaW5zdGVhZCBvZiB0aGUgbWluLWhlaWdodCBiZWNhdXNlXG4gICAqIElFIDExIHJlcXVpcmVzIHRoZSBoZWlnaHQgb24gdGhlIHBhcmVudCBmb3IgdGhlIGNoaWxkcmVuIGZsZXggZ3Jvdy9zaHJpbmsgcHJvcGVydGllcyB0byB3b3JrLlxuICAgKiBXaGVuIHdlIHVzZWQgbWluLWhlaWdodCwgMSAxIGF1dG8gZG9lc24ndCB1c2VkIHRvIHdvcmsgaW4gSUUxMSA6LShcbiAgICogQnV0IHRoaXMgZG9lc24ndCBhZmZlY3QgdGhlIGZpeC4gSXQgd29ya3MgaW4gYm90aCBmaXhlZCAmIHZhcmlhYmxlIGhlaWdodCBkYXRhZ3JpZHMuXG4gICAqXG4gICAqIFJlZmVyOiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzI0Mzk2MjA1L2ZsZXgtZ3Jvdy1ub3Qtd29ya2luZy1pbi1pbnRlcm5ldC1leHBsb3Jlci0xMS0wXG4gICAqL1xuICBwcml2YXRlIGNvbXB1dGVEYXRhZ3JpZEhlaWdodCgpIHtcbiAgICAvLyBJRSBkb2Vzbid0IHJldHVybiBjb3JyZWN0IHZhbHVlIGZvciBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpLmdldFByb3BlcnR5VmFsdWUoXCJoZWlnaHRcIilcbiAgICBjb25zdCB2YWx1ZTogbnVtYmVyID0gdGhpcy5kb21BZGFwdGVyLmNsaWVudFJlY3QodGhpcy5lbC5uYXRpdmVFbGVtZW50KS5oZWlnaHQ7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdoZWlnaHQnLCB2YWx1ZSArICdweCcpO1xuICAgIHRoaXMuX2hlaWdodFNldCA9IHRydWU7XG4gIH1cblxuICBwcml2YXRlIHJlc2V0RGF0YWdyaWRIZWlnaHQoKSB7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdoZWlnaHQnLCAnJyk7XG4gICAgdGhpcy5faGVpZ2h0U2V0ID0gZmFsc2U7XG4gIH1cblxuICBwcml2YXRlIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmZvckVhY2goc3ViID0+IHN1Yi51bnN1YnNjcmliZSgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNYWtlcyBlYWNoIGhlYWRlciBjb21wdXRlIGl0cyB3aWR0aC5cbiAgICovXG4gIHByaXZhdGUgY29tcHV0ZUhlYWRlcnNXaWR0aCgpIHtcbiAgICBjb25zdCBuYkNvbHVtbnM6IG51bWJlciA9IHRoaXMuaGVhZGVycy5sZW5ndGg7XG4gICAgbGV0IGFsbFN0cmljdCA9IHRydWU7XG4gICAgdGhpcy5oZWFkZXJzLmZvckVhY2goKGhlYWRlciwgaW5kZXgpID0+IHtcbiAgICAgIC8vIE9uIHRoZSBsYXN0IGhlYWRlciBjb2x1bW4gY2hlY2sgd2hldGhlciBhbGwgY29sdW1ucyBoYXZlIHN0cmljdCB3aWR0aHMuXG4gICAgICAvLyBJZiBhbGwgY29sdW1ucyBoYXZlIHN0cmljdCB3aWR0aHMsIHJlbW92ZSB0aGUgc3RyaWN0IHdpZHRoIGZyb20gdGhlIGxhc3QgY29sdW1uIGFuZCBtYWtlIGl0IHRoZSBjb2x1bW4nc1xuICAgICAgLy8gbWluaW11bSB3aWR0aCBzbyB0aGF0IHdoZW4gYWxsIHByZXZpb3VzIGNvbHVtbnMgc2hyaW5rLCBpdCB3aWxsIGdldCBhIGZsZXhpYmxlIHdpZHRoIGFuZCBjb3ZlciB0aGUgZW1wdHlcbiAgICAgIC8vIGdhcCBpbiB0aGUgRGF0YWdyaWQuXG4gICAgICBjb25zdCBzdGF0ZTogUGFydGlhbDxEYXRhZ3JpZENvbHVtblN0YXRlPiA9IHtcbiAgICAgICAgY2hhbmdlczogW0RhdGFncmlkQ29sdW1uQ2hhbmdlcy5XSURUSF0sXG4gICAgICAgIC4uLmhlYWRlci5nZXRDb2x1bW5XaWR0aFN0YXRlKCksXG4gICAgICB9O1xuXG4gICAgICBpZiAoIXN0YXRlLnN0cmljdFdpZHRoKSB7XG4gICAgICAgIGFsbFN0cmljdCA9IGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpZiAobmJDb2x1bW5zID09PSBpbmRleCArIDEgJiYgYWxsU3RyaWN0KSB7XG4gICAgICAgIHN0YXRlLnN0cmljdFdpZHRoID0gMDtcbiAgICAgIH1cblxuICAgICAgdGhpcy5jb2x1bW5zU2VydmljZS5lbWl0U3RhdGVDaGFuZ2UoaW5kZXgsIHN0YXRlKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgaWYgd2Ugd2FudCB0byByZS1jb21wdXRlIGNvbHVtbnMgd2lkdGguIFRoaXMgc2hvdWxkIG9ubHkgaGFwcGVuOlxuICAgKiAxKSBXaGVuIGhlYWRlcnMgY2hhbmdlLCB3aXRoIGNvbHVtbnMgYmVpbmcgYWRkZWQgb3IgcmVtb3ZlZFxuICAgKiAyKSBXaGVuIHJvd3MgYXJlIGxhemlseSBsb2FkZWQgZm9yIHRoZSBmaXJzdCB0aW1lXG4gICAqL1xuICBwcml2YXRlIGNvbHVtbnNTaXplc1N0YWJsZSA9IGZhbHNlO1xuXG4gIHByaXZhdGUgc2hvdWxkU3RhYmlsaXplQ29sdW1ucyA9IHRydWU7XG5cbiAgLyoqXG4gICAqIFRyaWdnZXJzIGEgd2hvbGUgcmUtcmVuZHJpbmcgY3ljbGUgdG8gc2V0IGNvbHVtbiBzaXplcywgaWYgbmVlZGVkLlxuICAgKi9cbiAgcHJpdmF0ZSBzdGFiaWxpemVDb2x1bW5zKCkge1xuICAgIHRoaXMuc2hvdWxkU3RhYmlsaXplQ29sdW1ucyA9IGZhbHNlO1xuICAgIGlmICh0aGlzLmNvbHVtbnNTaXplc1N0YWJsZSkge1xuICAgICAgLy8gTm90aGluZyB0byBkby5cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gUmVzaXplIHdoZW4gdGhlIHJvd3MgYXJlIGxvYWRlZC5cbiAgICBpZiAodGhpcy5pdGVtcy5kaXNwbGF5ZWQubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5vcmdhbml6ZXIucmVzaXplKCk7XG4gICAgICB0aGlzLmNvbHVtbnNTaXplc1N0YWJsZSA9IHRydWU7XG4gICAgfVxuICB9XG59XG4iXX0=