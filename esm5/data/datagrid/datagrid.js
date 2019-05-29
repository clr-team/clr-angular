/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ContentChild, ContentChildren, ElementRef, EventEmitter, Input, Output, QueryList, Renderer2, ViewChild, ViewContainerRef, } from '@angular/core';
import { ClrDatagridColumn } from './datagrid-column';
import { ClrDatagridItems } from './datagrid-items';
import { ClrDatagridPlaceholder } from './datagrid-placeholder';
import { ClrDatagridRow } from './datagrid-row';
import { DatagridDisplayMode } from './enums/display-mode.enum';
import { DisplayModeService } from './providers/display-mode.service';
import { FiltersProvider } from './providers/filters';
import { ExpandableRowsCount } from './providers/global-expandable-rows';
import { Items } from './providers/items';
import { Page } from './providers/page';
import { RowActionService } from './providers/row-action-service';
import { Selection } from './providers/selection';
import { Sort } from './providers/sort';
import { StateDebouncer } from './providers/state-debouncer.provider';
import { StateProvider } from './providers/state.provider';
import { TableSizeService } from './providers/table-size.service';
import { DatagridRenderOrganizer } from './render/render-organizer';
import { ClrCommonStrings } from '../../utils/i18n/common-strings.interface';
import { SelectionType } from './enums/selection-type';
import { ColumnsService } from './providers/columns.service';
/**
 * @template T
 */
var ClrDatagrid = /** @class */ (function () {
    function ClrDatagrid(organizer, items, expandableRows, selection, rowActionService, stateProvider, displayMode, renderer, el, commonStrings) {
        this.organizer = organizer;
        this.items = items;
        this.expandableRows = expandableRows;
        this.selection = selection;
        this.rowActionService = rowActionService;
        this.stateProvider = stateProvider;
        this.displayMode = displayMode;
        this.renderer = renderer;
        this.el = el;
        this.commonStrings = commonStrings;
        /* reference to the enum so that template can access */
        this.SELECTION_TYPE = SelectionType;
        /**
         * Output emitted whenever the data needs to be refreshed, based on user action or external ones
         */
        this.refresh = new EventEmitter(false);
        this.selectedChanged = new EventEmitter(false);
        this.singleSelectedChanged = new EventEmitter(false);
        /**
         * Subscriptions to all the services and queries changes
         */
        this._subscriptions = [];
    }
    Object.defineProperty(ClrDatagrid.prototype, "loading", {
        /**
         * Freezes the datagrid while data is loading
         */
        get: /**
         * Freezes the datagrid while data is loading
         * @return {?}
         */
        function () {
            return this.items.loading;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.items.loading = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Public method to re-trigger the computation of displayed items manually
     */
    /**
     * Public method to re-trigger the computation of displayed items manually
     * @return {?}
     */
    ClrDatagrid.prototype.dataChanged = /**
     * Public method to re-trigger the computation of displayed items manually
     * @return {?}
     */
    function () {
        this.items.refresh();
    };
    Object.defineProperty(ClrDatagrid.prototype, "selected", {
        /**
         * Array of all selected items
         */
        set: /**
         * Array of all selected items
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value) {
                this.selection.selectionType = SelectionType.Multi;
            }
            else {
                this.selection.selectionType = SelectionType.None;
            }
            this.selection.updateCurrent(value, false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagrid.prototype, "singleSelected", {
        /**
         * Selected item in single-select mode
         */
        set: /**
         * Selected item in single-select mode
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.selection.selectionType = SelectionType.Single;
            // the clrDgSingleSelected is updated in one of two cases:
            // 1. an explicit value is passed
            // 2. is being set to null or undefined, where previously it had a value
            if (value) {
                this.selection.currentSingle = value;
            }
            else if (this.selection.currentSingle) {
                this.selection.currentSingle = null;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagrid.prototype, "rowSelectionMode", {
        /**
         * @deprecated since 2.0, remove in 3.0
         *
         * Selection/Deselection on row click mode
         */
        set: /**
         * @deprecated since 2.0, remove in 3.0
         *
         * Selection/Deselection on row click mode
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.selection.rowSelectionMode = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagrid.prototype, "allSelected", {
        /**
         * Indicates if all currently displayed items are selected
         */
        get: /**
         * Indicates if all currently displayed items are selected
         * @return {?}
         */
        function () {
            return this.selection.isAllSelected();
        },
        /**
         * Selects/deselects all currently displayed items
         * @param value
         */
        set: /**
         * Selects/deselects all currently displayed items
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /*
                 * This is a setter but we ignore the value.
                 * It's strange, but it lets us have an indeterminate state where only
                 * some of the items are selected.
                 */
            this.selection.toggleAll();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ClrDatagrid.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.items.smart) {
            this.items.all = this.rows.map((/**
             * @param {?} row
             * @return {?}
             */
            function (row) { return row.item; }));
        }
        this._subscriptions.push(this.rows.changes.subscribe((/**
         * @return {?}
         */
        function () {
            if (!_this.items.smart) {
                _this.items.all = _this.rows.map((/**
                 * @param {?} row
                 * @return {?}
                 */
                function (row) { return row.item; }));
            }
            _this.rows.forEach((/**
             * @param {?} row
             * @return {?}
             */
            function (row) {
                _this._displayedRows.insert(row._view);
            }));
        })));
    };
    /**
     * Our setup happens in the view of some of our components, so we wait for it to be done before starting
     */
    /**
     * Our setup happens in the view of some of our components, so we wait for it to be done before starting
     * @return {?}
     */
    ClrDatagrid.prototype.ngAfterViewInit = /**
     * Our setup happens in the view of some of our components, so we wait for it to be done before starting
     * @return {?}
     */
    function () {
        var _this = this;
        // TODO: determine if we can get rid of provider wiring in view init so that subscriptions can be done earlier
        this.refresh.emit(this.stateProvider.state);
        this._subscriptions.push(this.stateProvider.change.subscribe((/**
         * @param {?} state
         * @return {?}
         */
        function (state) { return _this.refresh.emit(state); })));
        this._subscriptions.push(this.selection.change.subscribe((/**
         * @param {?} s
         * @return {?}
         */
        function (s) {
            if (_this.selection.selectionType === SelectionType.Single) {
                _this.singleSelectedChanged.emit((/** @type {?} */ (s)));
            }
            else if (_this.selection.selectionType === SelectionType.Multi) {
                _this.selectedChanged.emit((/** @type {?} */ (s)));
            }
        })));
        // A subscription that listens for displayMode changes on the datagrid
        this.displayMode.view.subscribe((/**
         * @param {?} viewChange
         * @return {?}
         */
        function (viewChange) {
            // Remove any projected columns from the projectedDisplayColumns container
            for (var i = _this._projectedDisplayColumns.length; i > 0; i--) {
                _this._projectedDisplayColumns.detach();
            }
            // Remove any projected columns from the projectedCalculationColumns container
            for (var i = _this._projectedCalculationColumns.length; i > 0; i--) {
                _this._projectedCalculationColumns.detach();
            }
            // Remove any projected rows from the calculationRows container
            for (var i = _this._calculationRows.length; i > 0; i--) {
                _this._calculationRows.detach();
            }
            // Remove any projected rows from the displayedRows container
            for (var i = _this._displayedRows.length; i > 0; i--) {
                _this._displayedRows.detach();
            }
            if (viewChange === DatagridDisplayMode.DISPLAY) {
                // Set state, style for the datagrid to DISPLAY and insert row & columns into containers
                _this.renderer.removeClass(_this.el.nativeElement, 'datagrid-calculate-mode');
                _this.columns.forEach((/**
                 * @param {?} column
                 * @return {?}
                 */
                function (column) {
                    _this._projectedDisplayColumns.insert(column._view);
                }));
                _this.rows.forEach((/**
                 * @param {?} row
                 * @return {?}
                 */
                function (row) {
                    _this._displayedRows.insert(row._view);
                }));
            }
            else {
                // Set state, style for the datagrid to CALCULATE and insert row & columns into containers
                _this.renderer.addClass(_this.el.nativeElement, 'datagrid-calculate-mode');
                _this.columns.forEach((/**
                 * @param {?} column
                 * @return {?}
                 */
                function (column) {
                    _this._projectedCalculationColumns.insert(column._view);
                }));
                _this.rows.forEach((/**
                 * @param {?} row
                 * @return {?}
                 */
                function (row) {
                    _this._calculationRows.insert(row._view);
                }));
            }
        }));
    };
    /**
     * @return {?}
     */
    ClrDatagrid.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        function (sub) { return sub.unsubscribe(); }));
    };
    /**
     * @return {?}
     */
    ClrDatagrid.prototype.resize = /**
     * @return {?}
     */
    function () {
        this.organizer.resize();
    };
    ClrDatagrid.decorators = [
        { type: Component, args: [{
                    selector: 'clr-datagrid',
                    template: "<!--\n  ~ Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.\n  ~ This software is released under MIT license.\n  ~ The full license information can be found in LICENSE in the root directory of this project.\n  -->\n\n<ng-content select=\"clr-dg-action-bar\"></ng-content>\n<div class=\"datagrid\" #datagrid>\n    <div class=\"datagrid-table-wrapper\">\n      <div role=\"grid\" class=\"datagrid-table\">\n        <div role=\"rowgroup\" class=\"datagrid-header\">\n          <div role=\"row\" class=\"datagrid-row\">\n            <div class=\"datagrid-row-master datagrid-row-flex\">\n              <div class=\"datagrid-row-sticky\">\n                <!-- Sticky elements here -->\n              </div>\n              <div class=\"datagrid-row-scrollable\">\n                <!--header for datagrid where you can select multiple rows -->\n                <div role=\"columnheader\" class=\"datagrid-column datagrid-select datagrid-fixed-column\"\n                     *ngIf=\"selection.selectionType === SELECTION_TYPE.Multi\">\n                            <span class=\"datagrid-column-title\">\n                                <input clrCheckbox type=\"checkbox\" [(ngModel)]=\"allSelected\"\n                                       [attr.aria-label]=\"commonStrings.selectAll\">\n                            </span>\n                  <div class=\"datagrid-column-separator\"></div>\n                </div>\n                <!-- header for datagrid where you can select one row only -->\n                <div role=\"columnheader\" class=\"datagrid-column datagrid-select datagrid-fixed-column\"\n                     *ngIf=\"selection.selectionType === SELECTION_TYPE.Single\">\n                  <div class=\"datagrid-column-separator\"></div>\n                </div>\n                <!-- header for single row action; only displayType if we have at least one actionable row in datagrid -->\n                <div role=\"columnheader\" class=\"datagrid-column datagrid-row-actions datagrid-fixed-column\"\n                     *ngIf=\"rowActionService.hasActionableRow\">\n                  <div class=\"datagrid-column-separator\"></div>\n                </div>\n                <!-- header for carets; only displayType if we have at least one expandable row in datagrid -->\n                <div role=\"columnheader\" class=\"datagrid-column datagrid-expandable-caret datagrid-fixed-column\"\n                     *ngIf=\"expandableRows.hasExpandableRow\">\n                  <div class=\"datagrid-column-separator\"></div>\n                </div>\n                <ng-container #projectedDisplayColumns></ng-container>\n              </div>\n            </div>\n          </div>\n        </div>\n        <ng-container #displayedRows></ng-container>\n        <!-- Custom placeholder overrides the default empty one -->\n        <ng-content select=\"clr-dg-placeholder\"></ng-content>\n        <clr-dg-placeholder *ngIf=\"!placeholder\"></clr-dg-placeholder>\n      </div>\n    </div>\n</div>\n<ng-content select=\"clr-dg-footer\"></ng-content>\n<div class=\"datagrid-spinner\" *ngIf=\"loading\">\n    <div class=\"spinner spinner-md\">Loading...</div>\n</div>\n\n<div class=\"datagrid-calculation-table\">\n    <div class=\"datagrid-calculation-header\">\n        <ng-container #projectedCalculationColumns></ng-container>\n    </div>\n    <ng-container #calculationRows></ng-container>\n</div>\n",
                    providers: [
                        Selection,
                        Sort,
                        FiltersProvider,
                        Page,
                        Items,
                        DatagridRenderOrganizer,
                        RowActionService,
                        ExpandableRowsCount,
                        StateDebouncer,
                        StateProvider,
                        TableSizeService,
                        ColumnsService,
                        DisplayModeService,
                    ],
                    host: { '[class.datagrid-host]': 'true' }
                }] }
    ];
    /** @nocollapse */
    ClrDatagrid.ctorParameters = function () { return [
        { type: DatagridRenderOrganizer },
        { type: Items },
        { type: ExpandableRowsCount },
        { type: Selection },
        { type: RowActionService },
        { type: StateProvider },
        { type: DisplayModeService },
        { type: Renderer2 },
        { type: ElementRef },
        { type: ClrCommonStrings }
    ]; };
    ClrDatagrid.propDecorators = {
        loading: [{ type: Input, args: ['clrDgLoading',] }],
        refresh: [{ type: Output, args: ['clrDgRefresh',] }],
        iterator: [{ type: ContentChild, args: [ClrDatagridItems, { static: false },] }],
        selected: [{ type: Input, args: ['clrDgSelected',] }],
        selectedChanged: [{ type: Output, args: ['clrDgSelectedChange',] }],
        singleSelected: [{ type: Input, args: ['clrDgSingleSelected',] }],
        singleSelectedChanged: [{ type: Output, args: ['clrDgSingleSelectedChange',] }],
        rowSelectionMode: [{ type: Input, args: ['clrDgRowSelection',] }],
        placeholder: [{ type: ContentChild, args: [ClrDatagridPlaceholder, { static: false },] }],
        columns: [{ type: ContentChildren, args: [ClrDatagridColumn,] }],
        rows: [{ type: ContentChildren, args: [ClrDatagridRow,] }],
        scrollableColumns: [{ type: ViewChild, args: ['scrollableColumns', { static: false, read: ViewContainerRef },] }],
        _projectedDisplayColumns: [{ type: ViewChild, args: ['projectedDisplayColumns', { static: false, read: ViewContainerRef },] }],
        _projectedCalculationColumns: [{ type: ViewChild, args: ['projectedCalculationColumns', { static: false, read: ViewContainerRef },] }],
        _displayedRows: [{ type: ViewChild, args: ['displayedRows', { static: false, read: ViewContainerRef },] }],
        _calculationRows: [{ type: ViewChild, args: ['calculationRows', { static: false, read: ViewContainerRef },] }]
    };
    return ClrDatagrid;
}());
export { ClrDatagrid };
if (false) {
    /** @type {?} */
    ClrDatagrid.prototype.SELECTION_TYPE;
    /**
     * Output emitted whenever the data needs to be refreshed, based on user action or external ones
     * @type {?}
     */
    ClrDatagrid.prototype.refresh;
    /**
     * We grab the smart iterator from projected content
     * @type {?}
     */
    ClrDatagrid.prototype.iterator;
    /** @type {?} */
    ClrDatagrid.prototype.selectedChanged;
    /** @type {?} */
    ClrDatagrid.prototype.singleSelectedChanged;
    /**
     * Custom placeholder detection
     * @type {?}
     */
    ClrDatagrid.prototype.placeholder;
    /**
     * Hideable Column data source / detection.
     * @type {?}
     */
    ClrDatagrid.prototype.columns;
    /**
     * When the datagrid is user-managed without the smart iterator, we get the items displayed
     * by querying the projected content. This is needed to keep track of the models currently
     * displayed, typically for selection.
     * @type {?}
     */
    ClrDatagrid.prototype.rows;
    /** @type {?} */
    ClrDatagrid.prototype.scrollableColumns;
    /**
     * Subscriptions to all the services and queries changes
     * @type {?}
     * @private
     */
    ClrDatagrid.prototype._subscriptions;
    /** @type {?} */
    ClrDatagrid.prototype._projectedDisplayColumns;
    /** @type {?} */
    ClrDatagrid.prototype._projectedCalculationColumns;
    /** @type {?} */
    ClrDatagrid.prototype._displayedRows;
    /** @type {?} */
    ClrDatagrid.prototype._calculationRows;
    /**
     * @type {?}
     * @private
     */
    ClrDatagrid.prototype.organizer;
    /** @type {?} */
    ClrDatagrid.prototype.items;
    /** @type {?} */
    ClrDatagrid.prototype.expandableRows;
    /** @type {?} */
    ClrDatagrid.prototype.selection;
    /** @type {?} */
    ClrDatagrid.prototype.rowActionService;
    /**
     * @type {?}
     * @private
     */
    ClrDatagrid.prototype.stateProvider;
    /**
     * @type {?}
     * @private
     */
    ClrDatagrid.prototype.displayMode;
    /**
     * @type {?}
     * @private
     */
    ClrDatagrid.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    ClrDatagrid.prototype.el;
    /** @type {?} */
    ClrDatagrid.prototype.commonStrings;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJkYXRhL2RhdGFncmlkL2RhdGFncmlkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtBLE9BQU8sRUFHTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLGVBQWUsRUFDZixVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFFTCxNQUFNLEVBQ04sU0FBUyxFQUNULFNBQVMsRUFDVCxTQUFTLEVBQ1QsZ0JBQWdCLEdBQ2pCLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUVoRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN0RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDekUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUN4QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDbEQsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ3hDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN0RSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDbEUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDcEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDN0UsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQzs7OztBQUU3RDtJQXFCRSxxQkFDVSxTQUFrQyxFQUNuQyxLQUFlLEVBQ2YsY0FBbUMsRUFDbkMsU0FBdUIsRUFDdkIsZ0JBQWtDLEVBQ2pDLGFBQStCLEVBQy9CLFdBQStCLEVBQy9CLFFBQW1CLEVBQ25CLEVBQWMsRUFDZixhQUErQjtRQVQ5QixjQUFTLEdBQVQsU0FBUyxDQUF5QjtRQUNuQyxVQUFLLEdBQUwsS0FBSyxDQUFVO1FBQ2YsbUJBQWMsR0FBZCxjQUFjLENBQXFCO1FBQ25DLGNBQVMsR0FBVCxTQUFTLENBQWM7UUFDdkIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNqQyxrQkFBYSxHQUFiLGFBQWEsQ0FBa0I7UUFDL0IsZ0JBQVcsR0FBWCxXQUFXLENBQW9CO1FBQy9CLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUNmLGtCQUFhLEdBQWIsYUFBYSxDQUFrQjs7UUFJakMsbUJBQWMsR0FBRyxhQUFhLENBQUM7Ozs7UUFpQlAsWUFBTyxHQUFHLElBQUksWUFBWSxDQUErQixLQUFLLENBQUMsQ0FBQztRQTRCaEUsb0JBQWUsR0FBRyxJQUFJLFlBQVksQ0FBTSxLQUFLLENBQUMsQ0FBQztRQWtCekMsMEJBQXFCLEdBQUcsSUFBSSxZQUFZLENBQUksS0FBSyxDQUFDLENBQUM7Ozs7UUFpSWhGLG1CQUFjLEdBQW1CLEVBQUUsQ0FBQztJQW5NekMsQ0FBQztJQVFKLHNCQUFXLGdDQUFPO1FBSGxCOztXQUVHOzs7OztRQUNIO1lBQ0UsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztRQUM1QixDQUFDOzs7OztRQUVELFVBQ21CLEtBQWM7WUFDL0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQzdCLENBQUM7OztPQUxBO0lBWUQ7O09BRUc7Ozs7O0lBQ0ksaUNBQVc7Ozs7SUFBbEI7UUFDRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFXRCxzQkFDSSxpQ0FBUTtRQUpaOztXQUVHOzs7Ozs7UUFDSCxVQUNhLEtBQVU7WUFDckIsSUFBSSxLQUFLLEVBQUU7Z0JBQ1QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDLEtBQUssQ0FBQzthQUNwRDtpQkFBTTtnQkFDTCxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDO2FBQ25EO1lBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzdDLENBQUM7OztPQUFBO0lBT0Qsc0JBQ0ksdUNBQWM7UUFKbEI7O1dBRUc7Ozs7OztRQUNILFVBQ21CLEtBQVE7WUFDekIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDLE1BQU0sQ0FBQztZQUNwRCwwREFBMEQ7WUFDMUQsaUNBQWlDO1lBQ2pDLHdFQUF3RTtZQUN4RSxJQUFJLEtBQUssRUFBRTtnQkFDVCxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7YUFDdEM7aUJBQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsRUFBRTtnQkFDdkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO2FBQ3JDO1FBQ0gsQ0FBQzs7O09BQUE7SUFTRCxzQkFDSSx5Q0FBZ0I7UUFOcEI7Ozs7V0FJRzs7Ozs7Ozs7UUFDSCxVQUNxQixLQUFjO1lBQ2pDLElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO1FBQzFDLENBQUM7OztPQUFBO0lBS0Qsc0JBQVcsb0NBQVc7UUFIdEI7O1dBRUc7Ozs7O1FBQ0g7WUFDRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDeEMsQ0FBQztRQUVEOzs7V0FHRzs7Ozs7O1FBQ0gsVUFBdUIsS0FBYztZQUNuQzs7OzttQkFJTztZQUNQLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDN0IsQ0FBQzs7O09BYkE7Ozs7SUFvQ0Qsd0NBQWtCOzs7SUFBbEI7UUFBQSxpQkFlQztRQWRDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRTtZQUNyQixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUc7Ozs7WUFBQyxVQUFDLEdBQXNCLElBQUssT0FBQSxHQUFHLENBQUMsSUFBSSxFQUFSLENBQVEsRUFBQyxDQUFDO1NBQ3RFO1FBRUQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQ3RCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVM7OztRQUFDO1lBQzFCLElBQUksQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRTtnQkFDckIsS0FBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsS0FBSSxDQUFDLElBQUksQ0FBQyxHQUFHOzs7O2dCQUFDLFVBQUMsR0FBc0IsSUFBSyxPQUFBLEdBQUcsQ0FBQyxJQUFJLEVBQVIsQ0FBUSxFQUFDLENBQUM7YUFDdEU7WUFDRCxLQUFJLENBQUMsSUFBSSxDQUFDLE9BQU87Ozs7WUFBQyxVQUFBLEdBQUc7Z0JBQ25CLEtBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN4QyxDQUFDLEVBQUMsQ0FBQztRQUNMLENBQUMsRUFBQyxDQUNILENBQUM7SUFDSixDQUFDO0lBRUQ7O09BRUc7Ozs7O0lBQ0gscUNBQWU7Ozs7SUFBZjtRQUFBLGlCQW1EQztRQWxEQyw4R0FBOEc7UUFDOUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxTQUFTOzs7O1FBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBeEIsQ0FBd0IsRUFBQyxDQUFDLENBQUM7UUFDakcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQ3RCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFNBQVM7Ozs7UUFBQyxVQUFBLENBQUM7WUFDL0IsSUFBSSxLQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsS0FBSyxhQUFhLENBQUMsTUFBTSxFQUFFO2dCQUN6RCxLQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLG1CQUFHLENBQUMsRUFBQSxDQUFDLENBQUM7YUFDdkM7aUJBQU0sSUFBSSxLQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsS0FBSyxhQUFhLENBQUMsS0FBSyxFQUFFO2dCQUMvRCxLQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxtQkFBSyxDQUFDLEVBQUEsQ0FBQyxDQUFDO2FBQ25DO1FBQ0gsQ0FBQyxFQUFDLENBQ0gsQ0FBQztRQUNGLHNFQUFzRTtRQUN0RSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTOzs7O1FBQUMsVUFBQSxVQUFVO1lBQ3hDLDBFQUEwRTtZQUMxRSxLQUFLLElBQUksQ0FBQyxHQUFHLEtBQUksQ0FBQyx3QkFBd0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDN0QsS0FBSSxDQUFDLHdCQUF3QixDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQ3hDO1lBQ0QsOEVBQThFO1lBQzlFLEtBQUssSUFBSSxDQUFDLEdBQUcsS0FBSSxDQUFDLDRCQUE0QixDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNqRSxLQUFJLENBQUMsNEJBQTRCLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDNUM7WUFDRCwrREFBK0Q7WUFDL0QsS0FBSyxJQUFJLENBQUMsR0FBRyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3JELEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUNoQztZQUNELDZEQUE2RDtZQUM3RCxLQUFLLElBQUksQ0FBQyxHQUFHLEtBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ25ELEtBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDOUI7WUFDRCxJQUFJLFVBQVUsS0FBSyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUU7Z0JBQzlDLHdGQUF3RjtnQkFDeEYsS0FBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsS0FBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUseUJBQXlCLENBQUMsQ0FBQztnQkFDNUUsS0FBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPOzs7O2dCQUFDLFVBQUEsTUFBTTtvQkFDekIsS0FBSSxDQUFDLHdCQUF3QixDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3JELENBQUMsRUFBQyxDQUFDO2dCQUNILEtBQUksQ0FBQyxJQUFJLENBQUMsT0FBTzs7OztnQkFBQyxVQUFBLEdBQUc7b0JBQ25CLEtBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDeEMsQ0FBQyxFQUFDLENBQUM7YUFDSjtpQkFBTTtnQkFDTCwwRkFBMEY7Z0JBQzFGLEtBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLHlCQUF5QixDQUFDLENBQUM7Z0JBQ3pFLEtBQUksQ0FBQyxPQUFPLENBQUMsT0FBTzs7OztnQkFBQyxVQUFBLE1BQU07b0JBQ3pCLEtBQUksQ0FBQyw0QkFBNEIsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN6RCxDQUFDLEVBQUMsQ0FBQztnQkFDSCxLQUFJLENBQUMsSUFBSSxDQUFDLE9BQU87Ozs7Z0JBQUMsVUFBQSxHQUFHO29CQUNuQixLQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDMUMsQ0FBQyxFQUFDLENBQUM7YUFDSjtRQUNILENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7OztJQU9ELGlDQUFXOzs7SUFBWDtRQUNFLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTzs7OztRQUFDLFVBQUMsR0FBaUIsSUFBSyxPQUFBLEdBQUcsQ0FBQyxXQUFXLEVBQUUsRUFBakIsQ0FBaUIsRUFBQyxDQUFDO0lBQ3hFLENBQUM7Ozs7SUFFRCw0QkFBTTs7O0lBQU47UUFDRSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQzFCLENBQUM7O2dCQTNPRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGNBQWM7b0JBQ3hCLDYxR0FBOEI7b0JBQzlCLFNBQVMsRUFBRTt3QkFDVCxTQUFTO3dCQUNULElBQUk7d0JBQ0osZUFBZTt3QkFDZixJQUFJO3dCQUNKLEtBQUs7d0JBQ0wsdUJBQXVCO3dCQUN2QixnQkFBZ0I7d0JBQ2hCLG1CQUFtQjt3QkFDbkIsY0FBYzt3QkFDZCxhQUFhO3dCQUNiLGdCQUFnQjt3QkFDaEIsY0FBYzt3QkFDZCxrQkFBa0I7cUJBQ25CO29CQUNELElBQUksRUFBRSxFQUFFLHVCQUF1QixFQUFFLE1BQU0sRUFBRTtpQkFDMUM7Ozs7Z0JBeEJRLHVCQUF1QjtnQkFSdkIsS0FBSztnQkFETCxtQkFBbUI7Z0JBSW5CLFNBQVM7Z0JBRFQsZ0JBQWdCO2dCQUloQixhQUFhO2dCQVRiLGtCQUFrQjtnQkFaekIsU0FBUztnQkFOVCxVQUFVO2dCQThCSCxnQkFBZ0I7OzswQkFnRHRCLEtBQUssU0FBQyxjQUFjOzBCQVFwQixNQUFNLFNBQUMsY0FBYzsyQkFZckIsWUFBWSxTQUFDLGdCQUFnQixFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTsyQkFNaEQsS0FBSyxTQUFDLGVBQWU7a0NBVXJCLE1BQU0sU0FBQyxxQkFBcUI7aUNBSzVCLEtBQUssU0FBQyxxQkFBcUI7d0NBYTNCLE1BQU0sU0FBQywyQkFBMkI7bUNBT2xDLEtBQUssU0FBQyxtQkFBbUI7OEJBNEJ6QixZQUFZLFNBQUMsc0JBQXNCLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFOzBCQU10RCxlQUFlLFNBQUMsaUJBQWlCO3VCQVFqQyxlQUFlLFNBQUMsY0FBYztvQ0FDOUIsU0FBUyxTQUFDLG1CQUFtQixFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUU7MkNBeUZ4RSxTQUFTLFNBQUMseUJBQXlCLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRTsrQ0FFOUUsU0FBUyxTQUFDLDZCQUE2QixFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUU7aUNBRWxGLFNBQVMsU0FBQyxlQUFlLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRTttQ0FFcEUsU0FBUyxTQUFDLGlCQUFpQixFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUU7O0lBRXpFLGtCQUFDO0NBQUEsQUFyUEQsSUFxUEM7U0FqT1ksV0FBVzs7O0lBZXRCLHFDQUFzQzs7Ozs7SUFpQnRDLDhCQUErRjs7Ozs7SUFZL0YsK0JBQ3FDOztJQWVyQyxzQ0FBOEU7O0lBa0I5RSw0Q0FBd0Y7Ozs7O0lBbUN4RixrQ0FDOEM7Ozs7O0lBSzlDLDhCQUFvRjs7Ozs7OztJQVFwRiwyQkFBb0U7O0lBQ3BFLHdDQUNvQzs7Ozs7O0lBOEVwQyxxQ0FBNEM7O0lBVTVDLCtDQUMyQzs7SUFDM0MsbURBQytDOztJQUMvQyxxQ0FDaUM7O0lBQ2pDLHVDQUNtQzs7Ozs7SUE5TmpDLGdDQUEwQzs7SUFDMUMsNEJBQXNCOztJQUN0QixxQ0FBMEM7O0lBQzFDLGdDQUE4Qjs7SUFDOUIsdUNBQXlDOzs7OztJQUN6QyxvQ0FBdUM7Ozs7O0lBQ3ZDLGtDQUF1Qzs7Ozs7SUFDdkMsK0JBQTJCOzs7OztJQUMzQix5QkFBc0I7O0lBQ3RCLG9DQUFzQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIEFmdGVyVmlld0luaXQsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkLFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT3V0cHV0LFxuICBRdWVyeUxpc3QsXG4gIFJlbmRlcmVyMixcbiAgVmlld0NoaWxkLFxuICBWaWV3Q29udGFpbmVyUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBDbHJEYXRhZ3JpZENvbHVtbiB9IGZyb20gJy4vZGF0YWdyaWQtY29sdW1uJztcbmltcG9ydCB7IENsckRhdGFncmlkSXRlbXMgfSBmcm9tICcuL2RhdGFncmlkLWl0ZW1zJztcbmltcG9ydCB7IENsckRhdGFncmlkUGxhY2Vob2xkZXIgfSBmcm9tICcuL2RhdGFncmlkLXBsYWNlaG9sZGVyJztcbmltcG9ydCB7IENsckRhdGFncmlkUm93IH0gZnJvbSAnLi9kYXRhZ3JpZC1yb3cnO1xuaW1wb3J0IHsgRGF0YWdyaWREaXNwbGF5TW9kZSB9IGZyb20gJy4vZW51bXMvZGlzcGxheS1tb2RlLmVudW0nO1xuaW1wb3J0IHsgQ2xyRGF0YWdyaWRTdGF0ZUludGVyZmFjZSB9IGZyb20gJy4vaW50ZXJmYWNlcy9zdGF0ZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgRGlzcGxheU1vZGVTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvZGlzcGxheS1tb2RlLnNlcnZpY2UnO1xuaW1wb3J0IHsgRmlsdGVyc1Byb3ZpZGVyIH0gZnJvbSAnLi9wcm92aWRlcnMvZmlsdGVycyc7XG5pbXBvcnQgeyBFeHBhbmRhYmxlUm93c0NvdW50IH0gZnJvbSAnLi9wcm92aWRlcnMvZ2xvYmFsLWV4cGFuZGFibGUtcm93cyc7XG5pbXBvcnQgeyBJdGVtcyB9IGZyb20gJy4vcHJvdmlkZXJzL2l0ZW1zJztcbmltcG9ydCB7IFBhZ2UgfSBmcm9tICcuL3Byb3ZpZGVycy9wYWdlJztcbmltcG9ydCB7IFJvd0FjdGlvblNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9yb3ctYWN0aW9uLXNlcnZpY2UnO1xuaW1wb3J0IHsgU2VsZWN0aW9uIH0gZnJvbSAnLi9wcm92aWRlcnMvc2VsZWN0aW9uJztcbmltcG9ydCB7IFNvcnQgfSBmcm9tICcuL3Byb3ZpZGVycy9zb3J0JztcbmltcG9ydCB7IFN0YXRlRGVib3VuY2VyIH0gZnJvbSAnLi9wcm92aWRlcnMvc3RhdGUtZGVib3VuY2VyLnByb3ZpZGVyJztcbmltcG9ydCB7IFN0YXRlUHJvdmlkZXIgfSBmcm9tICcuL3Byb3ZpZGVycy9zdGF0ZS5wcm92aWRlcic7XG5pbXBvcnQgeyBUYWJsZVNpemVTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvdGFibGUtc2l6ZS5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGFncmlkUmVuZGVyT3JnYW5pemVyIH0gZnJvbSAnLi9yZW5kZXIvcmVuZGVyLW9yZ2FuaXplcic7XG5pbXBvcnQgeyBDbHJDb21tb25TdHJpbmdzIH0gZnJvbSAnLi4vLi4vdXRpbHMvaTE4bi9jb21tb24tc3RyaW5ncy5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgU2VsZWN0aW9uVHlwZSB9IGZyb20gJy4vZW51bXMvc2VsZWN0aW9uLXR5cGUnO1xuaW1wb3J0IHsgQ29sdW1uc1NlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9jb2x1bW5zLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItZGF0YWdyaWQnLFxuICB0ZW1wbGF0ZVVybDogJy4vZGF0YWdyaWQuaHRtbCcsXG4gIHByb3ZpZGVyczogW1xuICAgIFNlbGVjdGlvbixcbiAgICBTb3J0LFxuICAgIEZpbHRlcnNQcm92aWRlcixcbiAgICBQYWdlLFxuICAgIEl0ZW1zLFxuICAgIERhdGFncmlkUmVuZGVyT3JnYW5pemVyLFxuICAgIFJvd0FjdGlvblNlcnZpY2UsXG4gICAgRXhwYW5kYWJsZVJvd3NDb3VudCxcbiAgICBTdGF0ZURlYm91bmNlcixcbiAgICBTdGF0ZVByb3ZpZGVyLFxuICAgIFRhYmxlU2l6ZVNlcnZpY2UsXG4gICAgQ29sdW1uc1NlcnZpY2UsXG4gICAgRGlzcGxheU1vZGVTZXJ2aWNlLFxuICBdLFxuICBob3N0OiB7ICdbY2xhc3MuZGF0YWdyaWQtaG9zdF0nOiAndHJ1ZScgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyRGF0YWdyaWQ8VCA9IGFueT4gaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIG9yZ2FuaXplcjogRGF0YWdyaWRSZW5kZXJPcmdhbml6ZXIsXG4gICAgcHVibGljIGl0ZW1zOiBJdGVtczxUPixcbiAgICBwdWJsaWMgZXhwYW5kYWJsZVJvd3M6IEV4cGFuZGFibGVSb3dzQ291bnQsXG4gICAgcHVibGljIHNlbGVjdGlvbjogU2VsZWN0aW9uPFQ+LFxuICAgIHB1YmxpYyByb3dBY3Rpb25TZXJ2aWNlOiBSb3dBY3Rpb25TZXJ2aWNlLFxuICAgIHByaXZhdGUgc3RhdGVQcm92aWRlcjogU3RhdGVQcm92aWRlcjxUPixcbiAgICBwcml2YXRlIGRpc3BsYXlNb2RlOiBEaXNwbGF5TW9kZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsXG4gICAgcHVibGljIGNvbW1vblN0cmluZ3M6IENsckNvbW1vblN0cmluZ3NcbiAgKSB7fVxuXG4gIC8qIHJlZmVyZW5jZSB0byB0aGUgZW51bSBzbyB0aGF0IHRlbXBsYXRlIGNhbiBhY2Nlc3MgKi9cbiAgcHVibGljIFNFTEVDVElPTl9UWVBFID0gU2VsZWN0aW9uVHlwZTtcblxuICAvKipcbiAgICogRnJlZXplcyB0aGUgZGF0YWdyaWQgd2hpbGUgZGF0YSBpcyBsb2FkaW5nXG4gICAqL1xuICBwdWJsaWMgZ2V0IGxvYWRpbmcoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaXRlbXMubG9hZGluZztcbiAgfVxuXG4gIEBJbnB1dCgnY2xyRGdMb2FkaW5nJylcbiAgcHVibGljIHNldCBsb2FkaW5nKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5pdGVtcy5sb2FkaW5nID0gdmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogT3V0cHV0IGVtaXR0ZWQgd2hlbmV2ZXIgdGhlIGRhdGEgbmVlZHMgdG8gYmUgcmVmcmVzaGVkLCBiYXNlZCBvbiB1c2VyIGFjdGlvbiBvciBleHRlcm5hbCBvbmVzXG4gICAqL1xuICBAT3V0cHV0KCdjbHJEZ1JlZnJlc2gnKSBwdWJsaWMgcmVmcmVzaCA9IG5ldyBFdmVudEVtaXR0ZXI8Q2xyRGF0YWdyaWRTdGF0ZUludGVyZmFjZTxUPj4oZmFsc2UpO1xuXG4gIC8qKlxuICAgKiBQdWJsaWMgbWV0aG9kIHRvIHJlLXRyaWdnZXIgdGhlIGNvbXB1dGF0aW9uIG9mIGRpc3BsYXllZCBpdGVtcyBtYW51YWxseVxuICAgKi9cbiAgcHVibGljIGRhdGFDaGFuZ2VkKCkge1xuICAgIHRoaXMuaXRlbXMucmVmcmVzaCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFdlIGdyYWIgdGhlIHNtYXJ0IGl0ZXJhdG9yIGZyb20gcHJvamVjdGVkIGNvbnRlbnRcbiAgICovXG4gIEBDb250ZW50Q2hpbGQoQ2xyRGF0YWdyaWRJdGVtcywgeyBzdGF0aWM6IGZhbHNlIH0pXG4gIHB1YmxpYyBpdGVyYXRvcjogQ2xyRGF0YWdyaWRJdGVtczxUPjtcblxuICAvKipcbiAgICogQXJyYXkgb2YgYWxsIHNlbGVjdGVkIGl0ZW1zXG4gICAqL1xuICBASW5wdXQoJ2NsckRnU2VsZWN0ZWQnKVxuICBzZXQgc2VsZWN0ZWQodmFsdWU6IFRbXSkge1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdGhpcy5zZWxlY3Rpb24uc2VsZWN0aW9uVHlwZSA9IFNlbGVjdGlvblR5cGUuTXVsdGk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2VsZWN0aW9uLnNlbGVjdGlvblR5cGUgPSBTZWxlY3Rpb25UeXBlLk5vbmU7XG4gICAgfVxuICAgIHRoaXMuc2VsZWN0aW9uLnVwZGF0ZUN1cnJlbnQodmFsdWUsIGZhbHNlKTtcbiAgfVxuXG4gIEBPdXRwdXQoJ2NsckRnU2VsZWN0ZWRDaGFuZ2UnKSBzZWxlY3RlZENoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyPFRbXT4oZmFsc2UpO1xuXG4gIC8qKlxuICAgKiBTZWxlY3RlZCBpdGVtIGluIHNpbmdsZS1zZWxlY3QgbW9kZVxuICAgKi9cbiAgQElucHV0KCdjbHJEZ1NpbmdsZVNlbGVjdGVkJylcbiAgc2V0IHNpbmdsZVNlbGVjdGVkKHZhbHVlOiBUKSB7XG4gICAgdGhpcy5zZWxlY3Rpb24uc2VsZWN0aW9uVHlwZSA9IFNlbGVjdGlvblR5cGUuU2luZ2xlO1xuICAgIC8vIHRoZSBjbHJEZ1NpbmdsZVNlbGVjdGVkIGlzIHVwZGF0ZWQgaW4gb25lIG9mIHR3byBjYXNlczpcbiAgICAvLyAxLiBhbiBleHBsaWNpdCB2YWx1ZSBpcyBwYXNzZWRcbiAgICAvLyAyLiBpcyBiZWluZyBzZXQgdG8gbnVsbCBvciB1bmRlZmluZWQsIHdoZXJlIHByZXZpb3VzbHkgaXQgaGFkIGEgdmFsdWVcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMuc2VsZWN0aW9uLmN1cnJlbnRTaW5nbGUgPSB2YWx1ZTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc2VsZWN0aW9uLmN1cnJlbnRTaW5nbGUpIHtcbiAgICAgIHRoaXMuc2VsZWN0aW9uLmN1cnJlbnRTaW5nbGUgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIEBPdXRwdXQoJ2NsckRnU2luZ2xlU2VsZWN0ZWRDaGFuZ2UnKSBzaW5nbGVTZWxlY3RlZENoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyPFQ+KGZhbHNlKTtcblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgc2luY2UgMi4wLCByZW1vdmUgaW4gMy4wXG4gICAqXG4gICAqIFNlbGVjdGlvbi9EZXNlbGVjdGlvbiBvbiByb3cgY2xpY2sgbW9kZVxuICAgKi9cbiAgQElucHV0KCdjbHJEZ1Jvd1NlbGVjdGlvbicpXG4gIHNldCByb3dTZWxlY3Rpb25Nb2RlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5zZWxlY3Rpb24ucm93U2VsZWN0aW9uTW9kZSA9IHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEluZGljYXRlcyBpZiBhbGwgY3VycmVudGx5IGRpc3BsYXllZCBpdGVtcyBhcmUgc2VsZWN0ZWRcbiAgICovXG4gIHB1YmxpYyBnZXQgYWxsU2VsZWN0ZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0aW9uLmlzQWxsU2VsZWN0ZWQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWxlY3RzL2Rlc2VsZWN0cyBhbGwgY3VycmVudGx5IGRpc3BsYXllZCBpdGVtc1xuICAgKiBAcGFyYW0gdmFsdWVcbiAgICovXG4gIHB1YmxpYyBzZXQgYWxsU2VsZWN0ZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAvKlxuICAgICAgICAgKiBUaGlzIGlzIGEgc2V0dGVyIGJ1dCB3ZSBpZ25vcmUgdGhlIHZhbHVlLlxuICAgICAgICAgKiBJdCdzIHN0cmFuZ2UsIGJ1dCBpdCBsZXRzIHVzIGhhdmUgYW4gaW5kZXRlcm1pbmF0ZSBzdGF0ZSB3aGVyZSBvbmx5XG4gICAgICAgICAqIHNvbWUgb2YgdGhlIGl0ZW1zIGFyZSBzZWxlY3RlZC5cbiAgICAgICAgICovXG4gICAgdGhpcy5zZWxlY3Rpb24udG9nZ2xlQWxsKCk7XG4gIH1cblxuICAvKipcbiAgICogQ3VzdG9tIHBsYWNlaG9sZGVyIGRldGVjdGlvblxuICAgKi9cbiAgQENvbnRlbnRDaGlsZChDbHJEYXRhZ3JpZFBsYWNlaG9sZGVyLCB7IHN0YXRpYzogZmFsc2UgfSlcbiAgcHVibGljIHBsYWNlaG9sZGVyOiBDbHJEYXRhZ3JpZFBsYWNlaG9sZGVyPFQ+O1xuXG4gIC8qKlxuICAgKiBIaWRlYWJsZSBDb2x1bW4gZGF0YSBzb3VyY2UgLyBkZXRlY3Rpb24uXG4gICAqL1xuICBAQ29udGVudENoaWxkcmVuKENsckRhdGFncmlkQ29sdW1uKSBwdWJsaWMgY29sdW1uczogUXVlcnlMaXN0PENsckRhdGFncmlkQ29sdW1uPFQ+PjtcblxuICAvKipcbiAgICogV2hlbiB0aGUgZGF0YWdyaWQgaXMgdXNlci1tYW5hZ2VkIHdpdGhvdXQgdGhlIHNtYXJ0IGl0ZXJhdG9yLCB3ZSBnZXQgdGhlIGl0ZW1zIGRpc3BsYXllZFxuICAgKiBieSBxdWVyeWluZyB0aGUgcHJvamVjdGVkIGNvbnRlbnQuIFRoaXMgaXMgbmVlZGVkIHRvIGtlZXAgdHJhY2sgb2YgdGhlIG1vZGVscyBjdXJyZW50bHlcbiAgICogZGlzcGxheWVkLCB0eXBpY2FsbHkgZm9yIHNlbGVjdGlvbi5cbiAgICovXG5cbiAgQENvbnRlbnRDaGlsZHJlbihDbHJEYXRhZ3JpZFJvdykgcm93czogUXVlcnlMaXN0PENsckRhdGFncmlkUm93PFQ+PjtcbiAgQFZpZXdDaGlsZCgnc2Nyb2xsYWJsZUNvbHVtbnMnLCB7IHN0YXRpYzogZmFsc2UsIHJlYWQ6IFZpZXdDb250YWluZXJSZWYgfSlcbiAgc2Nyb2xsYWJsZUNvbHVtbnM6IFZpZXdDb250YWluZXJSZWY7XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIGlmICghdGhpcy5pdGVtcy5zbWFydCkge1xuICAgICAgdGhpcy5pdGVtcy5hbGwgPSB0aGlzLnJvd3MubWFwKChyb3c6IENsckRhdGFncmlkUm93PFQ+KSA9PiByb3cuaXRlbSk7XG4gICAgfVxuXG4gICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5yb3dzLmNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLml0ZW1zLnNtYXJ0KSB7XG4gICAgICAgICAgdGhpcy5pdGVtcy5hbGwgPSB0aGlzLnJvd3MubWFwKChyb3c6IENsckRhdGFncmlkUm93PFQ+KSA9PiByb3cuaXRlbSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yb3dzLmZvckVhY2gocm93ID0+IHtcbiAgICAgICAgICB0aGlzLl9kaXNwbGF5ZWRSb3dzLmluc2VydChyb3cuX3ZpZXcpO1xuICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPdXIgc2V0dXAgaGFwcGVucyBpbiB0aGUgdmlldyBvZiBzb21lIG9mIG91ciBjb21wb25lbnRzLCBzbyB3ZSB3YWl0IGZvciBpdCB0byBiZSBkb25lIGJlZm9yZSBzdGFydGluZ1xuICAgKi9cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIC8vIFRPRE86IGRldGVybWluZSBpZiB3ZSBjYW4gZ2V0IHJpZCBvZiBwcm92aWRlciB3aXJpbmcgaW4gdmlldyBpbml0IHNvIHRoYXQgc3Vic2NyaXB0aW9ucyBjYW4gYmUgZG9uZSBlYXJsaWVyXG4gICAgdGhpcy5yZWZyZXNoLmVtaXQodGhpcy5zdGF0ZVByb3ZpZGVyLnN0YXRlKTtcbiAgICB0aGlzLl9zdWJzY3JpcHRpb25zLnB1c2godGhpcy5zdGF0ZVByb3ZpZGVyLmNoYW5nZS5zdWJzY3JpYmUoc3RhdGUgPT4gdGhpcy5yZWZyZXNoLmVtaXQoc3RhdGUpKSk7XG4gICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5zZWxlY3Rpb24uY2hhbmdlLnN1YnNjcmliZShzID0+IHtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uLnNlbGVjdGlvblR5cGUgPT09IFNlbGVjdGlvblR5cGUuU2luZ2xlKSB7XG4gICAgICAgICAgdGhpcy5zaW5nbGVTZWxlY3RlZENoYW5nZWQuZW1pdCg8VD5zKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNlbGVjdGlvbi5zZWxlY3Rpb25UeXBlID09PSBTZWxlY3Rpb25UeXBlLk11bHRpKSB7XG4gICAgICAgICAgdGhpcy5zZWxlY3RlZENoYW5nZWQuZW1pdCg8VFtdPnMpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gICAgLy8gQSBzdWJzY3JpcHRpb24gdGhhdCBsaXN0ZW5zIGZvciBkaXNwbGF5TW9kZSBjaGFuZ2VzIG9uIHRoZSBkYXRhZ3JpZFxuICAgIHRoaXMuZGlzcGxheU1vZGUudmlldy5zdWJzY3JpYmUodmlld0NoYW5nZSA9PiB7XG4gICAgICAvLyBSZW1vdmUgYW55IHByb2plY3RlZCBjb2x1bW5zIGZyb20gdGhlIHByb2plY3RlZERpc3BsYXlDb2x1bW5zIGNvbnRhaW5lclxuICAgICAgZm9yIChsZXQgaSA9IHRoaXMuX3Byb2plY3RlZERpc3BsYXlDb2x1bW5zLmxlbmd0aDsgaSA+IDA7IGktLSkge1xuICAgICAgICB0aGlzLl9wcm9qZWN0ZWREaXNwbGF5Q29sdW1ucy5kZXRhY2goKTtcbiAgICAgIH1cbiAgICAgIC8vIFJlbW92ZSBhbnkgcHJvamVjdGVkIGNvbHVtbnMgZnJvbSB0aGUgcHJvamVjdGVkQ2FsY3VsYXRpb25Db2x1bW5zIGNvbnRhaW5lclxuICAgICAgZm9yIChsZXQgaSA9IHRoaXMuX3Byb2plY3RlZENhbGN1bGF0aW9uQ29sdW1ucy5sZW5ndGg7IGkgPiAwOyBpLS0pIHtcbiAgICAgICAgdGhpcy5fcHJvamVjdGVkQ2FsY3VsYXRpb25Db2x1bW5zLmRldGFjaCgpO1xuICAgICAgfVxuICAgICAgLy8gUmVtb3ZlIGFueSBwcm9qZWN0ZWQgcm93cyBmcm9tIHRoZSBjYWxjdWxhdGlvblJvd3MgY29udGFpbmVyXG4gICAgICBmb3IgKGxldCBpID0gdGhpcy5fY2FsY3VsYXRpb25Sb3dzLmxlbmd0aDsgaSA+IDA7IGktLSkge1xuICAgICAgICB0aGlzLl9jYWxjdWxhdGlvblJvd3MuZGV0YWNoKCk7XG4gICAgICB9XG4gICAgICAvLyBSZW1vdmUgYW55IHByb2plY3RlZCByb3dzIGZyb20gdGhlIGRpc3BsYXllZFJvd3MgY29udGFpbmVyXG4gICAgICBmb3IgKGxldCBpID0gdGhpcy5fZGlzcGxheWVkUm93cy5sZW5ndGg7IGkgPiAwOyBpLS0pIHtcbiAgICAgICAgdGhpcy5fZGlzcGxheWVkUm93cy5kZXRhY2goKTtcbiAgICAgIH1cbiAgICAgIGlmICh2aWV3Q2hhbmdlID09PSBEYXRhZ3JpZERpc3BsYXlNb2RlLkRJU1BMQVkpIHtcbiAgICAgICAgLy8gU2V0IHN0YXRlLCBzdHlsZSBmb3IgdGhlIGRhdGFncmlkIHRvIERJU1BMQVkgYW5kIGluc2VydCByb3cgJiBjb2x1bW5zIGludG8gY29udGFpbmVyc1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2RhdGFncmlkLWNhbGN1bGF0ZS1tb2RlJyk7XG4gICAgICAgIHRoaXMuY29sdW1ucy5mb3JFYWNoKGNvbHVtbiA9PiB7XG4gICAgICAgICAgdGhpcy5fcHJvamVjdGVkRGlzcGxheUNvbHVtbnMuaW5zZXJ0KGNvbHVtbi5fdmlldyk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnJvd3MuZm9yRWFjaChyb3cgPT4ge1xuICAgICAgICAgIHRoaXMuX2Rpc3BsYXllZFJvd3MuaW5zZXJ0KHJvdy5fdmlldyk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gU2V0IHN0YXRlLCBzdHlsZSBmb3IgdGhlIGRhdGFncmlkIHRvIENBTENVTEFURSBhbmQgaW5zZXJ0IHJvdyAmIGNvbHVtbnMgaW50byBjb250YWluZXJzXG4gICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnZGF0YWdyaWQtY2FsY3VsYXRlLW1vZGUnKTtcbiAgICAgICAgdGhpcy5jb2x1bW5zLmZvckVhY2goY29sdW1uID0+IHtcbiAgICAgICAgICB0aGlzLl9wcm9qZWN0ZWRDYWxjdWxhdGlvbkNvbHVtbnMuaW5zZXJ0KGNvbHVtbi5fdmlldyk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnJvd3MuZm9yRWFjaChyb3cgPT4ge1xuICAgICAgICAgIHRoaXMuX2NhbGN1bGF0aW9uUm93cy5pbnNlcnQocm93Ll92aWV3KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogU3Vic2NyaXB0aW9ucyB0byBhbGwgdGhlIHNlcnZpY2VzIGFuZCBxdWVyaWVzIGNoYW5nZXNcbiAgICovXG4gIHByaXZhdGUgX3N1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5mb3JFYWNoKChzdWI6IFN1YnNjcmlwdGlvbikgPT4gc3ViLnVuc3Vic2NyaWJlKCkpO1xuICB9XG5cbiAgcmVzaXplKCk6IHZvaWQge1xuICAgIHRoaXMub3JnYW5pemVyLnJlc2l6ZSgpO1xuICB9XG5cbiAgQFZpZXdDaGlsZCgncHJvamVjdGVkRGlzcGxheUNvbHVtbnMnLCB7IHN0YXRpYzogZmFsc2UsIHJlYWQ6IFZpZXdDb250YWluZXJSZWYgfSlcbiAgX3Byb2plY3RlZERpc3BsYXlDb2x1bW5zOiBWaWV3Q29udGFpbmVyUmVmO1xuICBAVmlld0NoaWxkKCdwcm9qZWN0ZWRDYWxjdWxhdGlvbkNvbHVtbnMnLCB7IHN0YXRpYzogZmFsc2UsIHJlYWQ6IFZpZXdDb250YWluZXJSZWYgfSlcbiAgX3Byb2plY3RlZENhbGN1bGF0aW9uQ29sdW1uczogVmlld0NvbnRhaW5lclJlZjtcbiAgQFZpZXdDaGlsZCgnZGlzcGxheWVkUm93cycsIHsgc3RhdGljOiBmYWxzZSwgcmVhZDogVmlld0NvbnRhaW5lclJlZiB9KVxuICBfZGlzcGxheWVkUm93czogVmlld0NvbnRhaW5lclJlZjtcbiAgQFZpZXdDaGlsZCgnY2FsY3VsYXRpb25Sb3dzJywgeyBzdGF0aWM6IGZhbHNlLCByZWFkOiBWaWV3Q29udGFpbmVyUmVmIH0pXG4gIF9jYWxjdWxhdGlvblJvd3M6IFZpZXdDb250YWluZXJSZWY7XG59XG4iXX0=