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
import { isPlatformBrowser } from '@angular/common';
import { ContentChildren, Directive, ElementRef, PLATFORM_ID, QueryList, Renderer2, } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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
export var domAdapterFactory = function (platformId) {
    if (isPlatformBrowser(platformId)) {
        return new DomAdapter();
    }
    else {
        return new NoopDomAdapter();
    }
};
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
            .subscribe(function () { return _this.computeHeadersWidth(); }));
        this.subscriptions.push(this.page.sizeChange.subscribe(function () {
            if (_this._heightSet) {
                _this.resetDatagridHeight();
            }
        }));
        this.subscriptions.push(this.items.change.subscribe(function () { return (_this.shouldStabilizeColumns = true); }));
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
        this.subscriptions.push(this.headers.changes.subscribe(function () {
            // TODO: only re-stabilize if a column was added or removed. Reordering is fine.
            // Need to setup columns before stabalizing them
            _this.setupColumns();
            _this.columnsSizesStable = false;
            _this.stabilizeColumns();
        }));
        this.subscriptions.push(this.rows.changes.subscribe(function () {
            _this.rows.forEach(function (row) { return row.setupColumns(); });
        }));
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
            setTimeout(function () {
                _this.computeDatagridHeight();
            });
        }
    };
    /**
     * @return {?}
     */
    DatagridMainRenderer.prototype.setupColumns = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.headers.forEach(function (header, index) {
            // We want to get the initial state
            _this.columnsService.columns[index] = new BehaviorSubject(header.getColumnWidthState());
            header.columnState = _this.columnsService.columns[index];
        });
        this.columnsService.columns.splice(this.headers.length); // Trim any old columns
        this.rows.forEach(function (row) { return row.setupColumns(); });
    };
    /**
     * @return {?}
     */
    DatagridMainRenderer.prototype.shouldComputeHeight = /**
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
     * @return {?}
     */
    DatagridMainRenderer.prototype.resetDatagridHeight = /**
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
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    /**
     * Makes each header compute its width.
     */
    /**
     * Makes each header compute its width.
     * @return {?}
     */
    DatagridMainRenderer.prototype.computeHeadersWidth = /**
     * Makes each header compute its width.
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var nbColumns = this.headers.length;
        /** @type {?} */
        var allStrict = true;
        this.headers.forEach(function (header, index) {
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
        });
    };
    /**
     * Triggers a whole re-rendring cycle to set column sizes, if needed.
     */
    /**
     * Triggers a whole re-rendring cycle to set column sizes, if needed.
     * @return {?}
     */
    DatagridMainRenderer.prototype.stabilizeColumns = /**
     * Triggers a whole re-rendring cycle to set column sizes, if needed.
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
    /** @type {?} */
    DatagridMainRenderer.prototype.headers;
    /** @type {?} */
    DatagridMainRenderer.prototype.rows;
    /** @type {?} */
    DatagridMainRenderer.prototype._heightSet;
    /** @type {?} */
    DatagridMainRenderer.prototype.subscriptions;
    /**
     * Indicates if we want to re-compute columns width. This should only happen:
     * 1) When headers change, with columns being added or removed
     * 2) When rows are lazily loaded for the first time
     * @type {?}
     */
    DatagridMainRenderer.prototype.columnsSizesStable;
    /** @type {?} */
    DatagridMainRenderer.prototype.shouldStabilizeColumns;
    /** @type {?} */
    DatagridMainRenderer.prototype.organizer;
    /** @type {?} */
    DatagridMainRenderer.prototype.items;
    /** @type {?} */
    DatagridMainRenderer.prototype.page;
    /** @type {?} */
    DatagridMainRenderer.prototype.domAdapter;
    /** @type {?} */
    DatagridMainRenderer.prototype.el;
    /** @type {?} */
    DatagridMainRenderer.prototype.renderer;
    /** @type {?} */
    DatagridMainRenderer.prototype.tableSizeService;
    /** @type {?} */
    DatagridMainRenderer.prototype.columnsService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1yZW5kZXJlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvcmVuZGVyL21haW4tcmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUtBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3BELE9BQU8sRUFJTCxlQUFlLEVBQ2YsU0FBUyxFQUNULFVBQVUsRUFFVixXQUFXLEVBQ1gsU0FBUyxFQUNULFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsZUFBZSxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUVyRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDM0MsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3pDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBRW5FLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNwRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDcEQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDN0QsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRTlELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7O0FBSXJELE1BQU0sS0FBTyxpQkFBaUIsR0FBRyxVQUFDLFVBQWtCO0lBQ2xELElBQUksaUJBQWlCLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDakMsT0FBTyxJQUFJLFVBQVUsRUFBRSxDQUFDO0tBQ3pCO1NBQU07UUFDTCxPQUFPLElBQUksY0FBYyxFQUFFLENBQUM7S0FDN0I7QUFDSCxDQUFDOzs7Ozs7QUFJRDtJQUtFLDhCQUNVLFNBQWtDLEVBQ2xDLEtBQVksRUFDWixJQUFVLEVBQ1YsVUFBc0IsRUFDdEIsRUFBYyxFQUNkLFFBQW1CLEVBQ25CLGdCQUFrQyxFQUNsQyxjQUE4QjtRQVJ4QyxpQkF3QkM7UUF2QlMsY0FBUyxHQUFULFNBQVMsQ0FBeUI7UUFDbEMsVUFBSyxHQUFMLEtBQUssQ0FBTztRQUNaLFNBQUksR0FBSixJQUFJLENBQU07UUFDVixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLE9BQUUsR0FBRixFQUFFLENBQVk7UUFDZCxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25CLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBbUVoQyxlQUFVLEdBQVksS0FBSyxDQUFDO1FBaUM1QixrQkFBYSxHQUFtQixFQUFFLENBQUM7Ozs7OztRQXVDbkMsdUJBQWtCLEdBQUcsS0FBSyxDQUFDO1FBRTNCLDJCQUFzQixHQUFHLElBQUksQ0FBQztRQTNJcEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQ3JCLElBQUksQ0FBQyxTQUFTO2FBQ1gsaUJBQWlCLENBQUMsa0JBQWtCLENBQUMscUJBQXFCLENBQUM7YUFDM0QsU0FBUyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsbUJBQW1CLEVBQUUsRUFBMUIsQ0FBMEIsQ0FBQyxDQUMvQyxDQUFDO1FBRUYsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQztZQUM3QixJQUFJLEtBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQ25CLEtBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2FBQzVCO1FBQ0gsQ0FBQyxDQUFDLENBQ0gsQ0FBQztRQUNGLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFNLE9BQUEsQ0FBQyxLQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDLEVBQXBDLENBQW9DLENBQUMsQ0FBQyxDQUFDO0lBQ25HLENBQUM7Ozs7SUFLRCxpREFBa0I7OztJQUFsQjtRQUFBLGlCQWtCQztRQWpCQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFcEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQ3JCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQztZQUM3QixnRkFBZ0Y7WUFDaEYsZ0RBQWdEO1lBQ2hELEtBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUNwQixLQUFJLENBQUMsa0JBQWtCLEdBQUcsS0FBSyxDQUFDO1lBQ2hDLEtBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUNILENBQUM7UUFFRixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO1lBQzFCLEtBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLFlBQVksRUFBRSxFQUFsQixDQUFrQixDQUFDLENBQUM7UUFDL0MsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFRCxnRUFBZ0U7Ozs7O0lBQ2hFLDhDQUFlOzs7OztJQUFmO1FBQ0UsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQ3hDLENBQUM7Ozs7SUFFRCxpREFBa0I7OztJQUFsQjtRQUFBLGlCQVNDO1FBUkMsSUFBSSxJQUFJLENBQUMsc0JBQXNCLEVBQUU7WUFDL0IsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7U0FDekI7UUFDRCxJQUFJLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxFQUFFO1lBQzlCLFVBQVUsQ0FBQztnQkFDVCxLQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztZQUMvQixDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQzs7OztJQUVPLDJDQUFZOzs7SUFBcEI7UUFBQSxpQkFRQztRQVBDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQUMsTUFBTSxFQUFFLEtBQUs7WUFDakMsbUNBQW1DO1lBQ25DLEtBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksZUFBZSxDQUFzQixNQUFNLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDO1lBQzVHLE1BQU0sQ0FBQyxXQUFXLEdBQUcsS0FBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUQsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLHVCQUF1QjtRQUNoRixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxZQUFZLEVBQUUsRUFBbEIsQ0FBa0IsQ0FBQyxDQUFDO0lBQy9DLENBQUM7Ozs7SUFJTyxrREFBbUI7OztJQUEzQjtRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsRUFBRTtZQUMxQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDbEQsT0FBTyxJQUFJLENBQUM7YUFDYjtTQUNGO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHOzs7Ozs7Ozs7Ozs7SUFDSyxvREFBcUI7Ozs7Ozs7Ozs7O0lBQTdCOzs7WUFFUSxLQUFLLEdBQVcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxNQUFNO1FBQzlFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLFFBQVEsRUFBRSxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDdEUsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7SUFDekIsQ0FBQzs7OztJQUVPLGtEQUFtQjs7O0lBQTNCO1FBQ0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzVELElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO0lBQzFCLENBQUM7Ozs7SUFJRCwwQ0FBVzs7O0lBQVg7UUFDRSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxXQUFXLEVBQUUsRUFBakIsQ0FBaUIsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFRDs7T0FFRzs7Ozs7SUFDSyxrREFBbUI7Ozs7SUFBM0I7UUFBQSxpQkF1QkM7O1lBdEJPLFNBQVMsR0FBVyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU07O1lBQ3pDLFNBQVMsR0FBRyxJQUFJO1FBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQUMsTUFBTSxFQUFFLEtBQUs7Ozs7OztnQkFLM0IsS0FBSyxzQkFDVCxPQUFPLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsSUFDbkMsTUFBTSxDQUFDLG1CQUFtQixFQUFFLENBQ2hDO1lBRUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUU7Z0JBQ3RCLFNBQVMsR0FBRyxLQUFLLENBQUM7YUFDbkI7WUFFRCxJQUFJLFNBQVMsS0FBSyxLQUFLLEdBQUcsQ0FBQyxJQUFJLFNBQVMsRUFBRTtnQkFDeEMsS0FBSyxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7YUFDdkI7WUFFRCxLQUFJLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDcEQsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBV0Q7O09BRUc7Ozs7O0lBQ0ssK0NBQWdCOzs7O0lBQXhCO1FBQ0UsSUFBSSxDQUFDLHNCQUFzQixHQUFHLEtBQUssQ0FBQztRQUNwQyxJQUFJLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtZQUMzQixpQkFBaUI7WUFDakIsT0FBTztTQUNSO1FBQ0QsbUNBQW1DO1FBQ25DLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNuQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7U0FDaEM7SUFDSCxDQUFDOztnQkExS0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxjQUFjO29CQUN4QixTQUFTLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLGlCQUFpQixFQUFFLElBQUksRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUM7aUJBQ3pGOzs7O2dCQXJCUSx1QkFBdUI7Z0JBUHZCLEtBQUs7Z0JBQ0wsSUFBSTtnQkFHSixVQUFVO2dCQWJqQixVQUFVO2dCQUlWLFNBQVM7Z0JBT0YsZ0JBQWdCO2dCQU1oQixjQUFjOzs7MEJBZ0RwQixlQUFlLFNBQUMsc0JBQXNCO3VCQUN0QyxlQUFlLFNBQUMsbUJBQW1COztJQTJJdEMsMkJBQUM7Q0FBQSxBQTNLRCxJQTJLQztTQXZLWSxvQkFBb0I7OztJQTJCL0IsdUNBQTRGOztJQUM1RixvQ0FBbUY7O0lBZ0RuRiwwQ0FBb0M7O0lBaUNwQyw2Q0FBMkM7Ozs7Ozs7SUF1QzNDLGtEQUFtQzs7SUFFbkMsc0RBQXNDOztJQXBKcEMseUNBQTBDOztJQUMxQyxxQ0FBb0I7O0lBQ3BCLG9DQUFrQjs7SUFDbEIsMENBQThCOztJQUM5QixrQ0FBc0I7O0lBQ3RCLHdDQUEyQjs7SUFDM0IsZ0RBQTBDOztJQUMxQyw4Q0FBc0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBBZnRlclZpZXdDaGVja2VkLFxuICBBZnRlclZpZXdJbml0LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgT25EZXN0cm95LFxuICBQTEFURk9STV9JRCxcbiAgUXVlcnlMaXN0LFxuICBSZW5kZXJlcjIsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgRGF0YWdyaWRSZW5kZXJTdGVwIH0gZnJvbSAnLi4vZW51bXMvcmVuZGVyLXN0ZXAuZW51bSc7XG5pbXBvcnQgeyBJdGVtcyB9IGZyb20gJy4uL3Byb3ZpZGVycy9pdGVtcyc7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSAnLi4vcHJvdmlkZXJzL3BhZ2UnO1xuaW1wb3J0IHsgVGFibGVTaXplU2VydmljZSB9IGZyb20gJy4uL3Byb3ZpZGVycy90YWJsZS1zaXplLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBEb21BZGFwdGVyIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvZG9tLWFkYXB0ZXIvZG9tLWFkYXB0ZXInO1xuaW1wb3J0IHsgRGF0YWdyaWRIZWFkZXJSZW5kZXJlciB9IGZyb20gJy4vaGVhZGVyLXJlbmRlcmVyJztcbmltcG9ydCB7IE5vb3BEb21BZGFwdGVyIH0gZnJvbSAnLi9ub29wLWRvbS1hZGFwdGVyJztcbmltcG9ydCB7IERhdGFncmlkUmVuZGVyT3JnYW5pemVyIH0gZnJvbSAnLi9yZW5kZXItb3JnYW5pemVyJztcbmltcG9ydCB7IENvbHVtbnNTZXJ2aWNlIH0gZnJvbSAnLi4vcHJvdmlkZXJzL2NvbHVtbnMuc2VydmljZSc7XG5pbXBvcnQgeyBEYXRhZ3JpZENvbHVtblN0YXRlIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9jb2x1bW4tc3RhdGUuaW50ZXJmYWNlJztcbmltcG9ydCB7IERhdGFncmlkQ29sdW1uQ2hhbmdlcyB9IGZyb20gJy4uL2VudW1zL2NvbHVtbi1jaGFuZ2VzLmVudW0nO1xuaW1wb3J0IHsgRGF0YWdyaWRSb3dSZW5kZXJlciB9IGZyb20gJy4vcm93LXJlbmRlcmVyJztcblxuLy8gRml4ZXMgYnVpbGQgZXJyb3Jcbi8vIEBkeW5hbWljIChodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy8xOTY5OCNpc3N1ZWNvbW1lbnQtMzM4MzQwMjExKVxuZXhwb3J0IGNvbnN0IGRvbUFkYXB0ZXJGYWN0b3J5ID0gKHBsYXRmb3JtSWQ6IE9iamVjdCkgPT4ge1xuICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIocGxhdGZvcm1JZCkpIHtcbiAgICByZXR1cm4gbmV3IERvbUFkYXB0ZXIoKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbmV3IE5vb3BEb21BZGFwdGVyKCk7XG4gIH1cbn07XG5cbi8vIEZpeGVzIGJ1aWxkIGVycm9yXG4vLyBAZHluYW1pYyAoaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMTk2OTgjaXNzdWVjb21tZW50LTMzODM0MDIxMSlcbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2Nsci1kYXRhZ3JpZCcsXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogRG9tQWRhcHRlciwgdXNlRmFjdG9yeTogZG9tQWRhcHRlckZhY3RvcnksIGRlcHM6IFtQTEFURk9STV9JRF0gfV0sXG59KVxuZXhwb3J0IGNsYXNzIERhdGFncmlkTWFpblJlbmRlcmVyPFQgPSBhbnk+IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgQWZ0ZXJWaWV3SW5pdCwgQWZ0ZXJWaWV3Q2hlY2tlZCwgT25EZXN0cm95IHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBvcmdhbml6ZXI6IERhdGFncmlkUmVuZGVyT3JnYW5pemVyLFxuICAgIHByaXZhdGUgaXRlbXM6IEl0ZW1zLFxuICAgIHByaXZhdGUgcGFnZTogUGFnZSxcbiAgICBwcml2YXRlIGRvbUFkYXB0ZXI6IERvbUFkYXB0ZXIsXG4gICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSB0YWJsZVNpemVTZXJ2aWNlOiBUYWJsZVNpemVTZXJ2aWNlLFxuICAgIHByaXZhdGUgY29sdW1uc1NlcnZpY2U6IENvbHVtbnNTZXJ2aWNlXG4gICkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5vcmdhbml6ZXJcbiAgICAgICAgLmZpbHRlclJlbmRlclN0ZXBzKERhdGFncmlkUmVuZGVyU3RlcC5DT01QVVRFX0NPTFVNTl9XSURUSFMpXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jb21wdXRlSGVhZGVyc1dpZHRoKCkpXG4gICAgKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5wYWdlLnNpemVDaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuX2hlaWdodFNldCkge1xuICAgICAgICAgIHRoaXMucmVzZXREYXRhZ3JpZEhlaWdodCgpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2godGhpcy5pdGVtcy5jaGFuZ2Uuc3Vic2NyaWJlKCgpID0+ICh0aGlzLnNob3VsZFN0YWJpbGl6ZUNvbHVtbnMgPSB0cnVlKSkpO1xuICB9XG5cbiAgQENvbnRlbnRDaGlsZHJlbihEYXRhZ3JpZEhlYWRlclJlbmRlcmVyKSBwcml2YXRlIGhlYWRlcnM6IFF1ZXJ5TGlzdDxEYXRhZ3JpZEhlYWRlclJlbmRlcmVyPjtcbiAgQENvbnRlbnRDaGlsZHJlbihEYXRhZ3JpZFJvd1JlbmRlcmVyKSBwcml2YXRlIHJvd3M6IFF1ZXJ5TGlzdDxEYXRhZ3JpZFJvd1JlbmRlcmVyPjtcblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgdGhpcy5zZXR1cENvbHVtbnMoKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5oZWFkZXJzLmNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgLy8gVE9ETzogb25seSByZS1zdGFiaWxpemUgaWYgYSBjb2x1bW4gd2FzIGFkZGVkIG9yIHJlbW92ZWQuIFJlb3JkZXJpbmcgaXMgZmluZS5cbiAgICAgICAgLy8gTmVlZCB0byBzZXR1cCBjb2x1bW5zIGJlZm9yZSBzdGFiYWxpemluZyB0aGVtXG4gICAgICAgIHRoaXMuc2V0dXBDb2x1bW5zKCk7XG4gICAgICAgIHRoaXMuY29sdW1uc1NpemVzU3RhYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc3RhYmlsaXplQ29sdW1ucygpO1xuICAgICAgfSlcbiAgICApO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLnJvd3MuY2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLnJvd3MuZm9yRWFjaChyb3cgPT4gcm93LnNldHVwQ29sdW1ucygpKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8vIEluaXRpYWxpemUgYW5kIHNldCBUYWJsZSB3aWR0aCBmb3IgaG9yaXpvbnRhbCBzY3JvbGxpbmcgaGVyZS5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMudGFibGVTaXplU2VydmljZS50YWJsZSA9IHRoaXMuZWw7XG4gIH1cblxuICBuZ0FmdGVyVmlld0NoZWNrZWQoKSB7XG4gICAgaWYgKHRoaXMuc2hvdWxkU3RhYmlsaXplQ29sdW1ucykge1xuICAgICAgdGhpcy5zdGFiaWxpemVDb2x1bW5zKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnNob3VsZENvbXB1dGVIZWlnaHQoKSkge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuY29tcHV0ZURhdGFncmlkSGVpZ2h0KCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldHVwQ29sdW1ucygpIHtcbiAgICB0aGlzLmhlYWRlcnMuZm9yRWFjaCgoaGVhZGVyLCBpbmRleCkgPT4ge1xuICAgICAgLy8gV2Ugd2FudCB0byBnZXQgdGhlIGluaXRpYWwgc3RhdGVcbiAgICAgIHRoaXMuY29sdW1uc1NlcnZpY2UuY29sdW1uc1tpbmRleF0gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PERhdGFncmlkQ29sdW1uU3RhdGU+KGhlYWRlci5nZXRDb2x1bW5XaWR0aFN0YXRlKCkpO1xuICAgICAgaGVhZGVyLmNvbHVtblN0YXRlID0gdGhpcy5jb2x1bW5zU2VydmljZS5jb2x1bW5zW2luZGV4XTtcbiAgICB9KTtcbiAgICB0aGlzLmNvbHVtbnNTZXJ2aWNlLmNvbHVtbnMuc3BsaWNlKHRoaXMuaGVhZGVycy5sZW5ndGgpOyAvLyBUcmltIGFueSBvbGQgY29sdW1uc1xuICAgIHRoaXMucm93cy5mb3JFYWNoKHJvdyA9PiByb3cuc2V0dXBDb2x1bW5zKCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGVpZ2h0U2V0OiBib29sZWFuID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBzaG91bGRDb21wdXRlSGVpZ2h0KCk6IGJvb2xlYW4ge1xuICAgIGlmICghdGhpcy5faGVpZ2h0U2V0ICYmIHRoaXMucGFnZS5zaXplID4gMCkge1xuICAgICAgaWYgKHRoaXMuaXRlbXMuZGlzcGxheWVkLmxlbmd0aCA9PT0gdGhpcy5wYWdlLnNpemUpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb21wdXRlcyB0aGUgaGVpZ2h0IG9mIHRoZSBkYXRhZ3JpZC5cbiAgICpcbiAgICogTk9URTogV2UgaGFkIHRvIGNob29zZSB0byBzZXQgdGhlIGhlaWdodCBpbnN0ZWFkIG9mIHRoZSBtaW4taGVpZ2h0IGJlY2F1c2VcbiAgICogSUUgMTEgcmVxdWlyZXMgdGhlIGhlaWdodCBvbiB0aGUgcGFyZW50IGZvciB0aGUgY2hpbGRyZW4gZmxleCBncm93L3NocmluayBwcm9wZXJ0aWVzIHRvIHdvcmsuXG4gICAqIFdoZW4gd2UgdXNlZCBtaW4taGVpZ2h0LCAxIDEgYXV0byBkb2Vzbid0IHVzZWQgdG8gd29yayBpbiBJRTExIDotKFxuICAgKiBCdXQgdGhpcyBkb2Vzbid0IGFmZmVjdCB0aGUgZml4LiBJdCB3b3JrcyBpbiBib3RoIGZpeGVkICYgdmFyaWFibGUgaGVpZ2h0IGRhdGFncmlkcy5cbiAgICpcbiAgICogUmVmZXI6IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMjQzOTYyMDUvZmxleC1ncm93LW5vdC13b3JraW5nLWluLWludGVybmV0LWV4cGxvcmVyLTExLTBcbiAgICovXG4gIHByaXZhdGUgY29tcHV0ZURhdGFncmlkSGVpZ2h0KCkge1xuICAgIC8vIElFIGRvZXNuJ3QgcmV0dXJuIGNvcnJlY3QgdmFsdWUgZm9yIGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCkuZ2V0UHJvcGVydHlWYWx1ZShcImhlaWdodFwiKVxuICAgIGNvbnN0IHZhbHVlOiBudW1iZXIgPSB0aGlzLmRvbUFkYXB0ZXIuY2xpZW50UmVjdCh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpLmhlaWdodDtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2hlaWdodCcsIHZhbHVlICsgJ3B4Jyk7XG4gICAgdGhpcy5faGVpZ2h0U2V0ID0gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzZXREYXRhZ3JpZEhlaWdodCgpIHtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2hlaWdodCcsICcnKTtcbiAgICB0aGlzLl9oZWlnaHRTZXQgPSBmYWxzZTtcbiAgfVxuXG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaChzdWIgPT4gc3ViLnVuc3Vic2NyaWJlKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ha2VzIGVhY2ggaGVhZGVyIGNvbXB1dGUgaXRzIHdpZHRoLlxuICAgKi9cbiAgcHJpdmF0ZSBjb21wdXRlSGVhZGVyc1dpZHRoKCkge1xuICAgIGNvbnN0IG5iQ29sdW1uczogbnVtYmVyID0gdGhpcy5oZWFkZXJzLmxlbmd0aDtcbiAgICBsZXQgYWxsU3RyaWN0ID0gdHJ1ZTtcbiAgICB0aGlzLmhlYWRlcnMuZm9yRWFjaCgoaGVhZGVyLCBpbmRleCkgPT4ge1xuICAgICAgLy8gT24gdGhlIGxhc3QgaGVhZGVyIGNvbHVtbiBjaGVjayB3aGV0aGVyIGFsbCBjb2x1bW5zIGhhdmUgc3RyaWN0IHdpZHRocy5cbiAgICAgIC8vIElmIGFsbCBjb2x1bW5zIGhhdmUgc3RyaWN0IHdpZHRocywgcmVtb3ZlIHRoZSBzdHJpY3Qgd2lkdGggZnJvbSB0aGUgbGFzdCBjb2x1bW4gYW5kIG1ha2UgaXQgdGhlIGNvbHVtbidzXG4gICAgICAvLyBtaW5pbXVtIHdpZHRoIHNvIHRoYXQgd2hlbiBhbGwgcHJldmlvdXMgY29sdW1ucyBzaHJpbmssIGl0IHdpbGwgZ2V0IGEgZmxleGlibGUgd2lkdGggYW5kIGNvdmVyIHRoZSBlbXB0eVxuICAgICAgLy8gZ2FwIGluIHRoZSBEYXRhZ3JpZC5cbiAgICAgIGNvbnN0IHN0YXRlOiBQYXJ0aWFsPERhdGFncmlkQ29sdW1uU3RhdGU+ID0ge1xuICAgICAgICBjaGFuZ2VzOiBbRGF0YWdyaWRDb2x1bW5DaGFuZ2VzLldJRFRIXSxcbiAgICAgICAgLi4uaGVhZGVyLmdldENvbHVtbldpZHRoU3RhdGUoKSxcbiAgICAgIH07XG5cbiAgICAgIGlmICghc3RhdGUuc3RyaWN0V2lkdGgpIHtcbiAgICAgICAgYWxsU3RyaWN0ID0gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGlmIChuYkNvbHVtbnMgPT09IGluZGV4ICsgMSAmJiBhbGxTdHJpY3QpIHtcbiAgICAgICAgc3RhdGUuc3RyaWN0V2lkdGggPSAwO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmNvbHVtbnNTZXJ2aWNlLmVtaXRTdGF0ZUNoYW5nZShpbmRleCwgc3RhdGUpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEluZGljYXRlcyBpZiB3ZSB3YW50IHRvIHJlLWNvbXB1dGUgY29sdW1ucyB3aWR0aC4gVGhpcyBzaG91bGQgb25seSBoYXBwZW46XG4gICAqIDEpIFdoZW4gaGVhZGVycyBjaGFuZ2UsIHdpdGggY29sdW1ucyBiZWluZyBhZGRlZCBvciByZW1vdmVkXG4gICAqIDIpIFdoZW4gcm93cyBhcmUgbGF6aWx5IGxvYWRlZCBmb3IgdGhlIGZpcnN0IHRpbWVcbiAgICovXG4gIHByaXZhdGUgY29sdW1uc1NpemVzU3RhYmxlID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBzaG91bGRTdGFiaWxpemVDb2x1bW5zID0gdHJ1ZTtcblxuICAvKipcbiAgICogVHJpZ2dlcnMgYSB3aG9sZSByZS1yZW5kcmluZyBjeWNsZSB0byBzZXQgY29sdW1uIHNpemVzLCBpZiBuZWVkZWQuXG4gICAqL1xuICBwcml2YXRlIHN0YWJpbGl6ZUNvbHVtbnMoKSB7XG4gICAgdGhpcy5zaG91bGRTdGFiaWxpemVDb2x1bW5zID0gZmFsc2U7XG4gICAgaWYgKHRoaXMuY29sdW1uc1NpemVzU3RhYmxlKSB7XG4gICAgICAvLyBOb3RoaW5nIHRvIGRvLlxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBSZXNpemUgd2hlbiB0aGUgcm93cyBhcmUgbG9hZGVkLlxuICAgIGlmICh0aGlzLml0ZW1zLmRpc3BsYXllZC5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLm9yZ2FuaXplci5yZXNpemUoKTtcbiAgICAgIHRoaXMuY29sdW1uc1NpemVzU3RhYmxlID0gdHJ1ZTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==