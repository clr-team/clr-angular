/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ContentChild, ContentChildren, ElementRef, EventEmitter, Input, Output, QueryList, Renderer2, ViewChild, ViewContainerRef, } from '@angular/core';
import { ClrDatagridColumn } from './datagrid-column';
import { ClrDatagridItems } from './datagrid-items';
import { ClrDatagridPlaceholder } from './datagrid-placeholder';
import { ClrDatagridRow } from './datagrid-row';
import { DatagridDisplayMode } from './enums/display-mode.enum';
import { ColumnToggleButtonsService } from './providers/column-toggle-buttons.service';
import { DisplayModeService } from './providers/display-mode.service';
import { FiltersProvider } from './providers/filters';
import { ExpandableRowsCount } from './providers/global-expandable-rows';
import { HideableColumnService } from './providers/hideable-column.service';
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
    function ClrDatagrid(columnService, organizer, items, expandableRows, selection, rowActionService, stateProvider, displayMode, renderer, el, commonStrings) {
        this.columnService = columnService;
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
         * Selection/Deselection on row click mode
         */
        set: /**
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
        this._subscriptions.push(this.columns.changes.subscribe((/**
         * @param {?} columns
         * @return {?}
         */
        function (columns) {
            _this.columnService.updateColumnList(_this.columns.map((/**
             * @param {?} col
             * @return {?}
             */
            function (col) { return col.hideable; })));
        })));
        // Get ColumnService ready for HideableColumns.
        this.columnService.updateColumnList(this.columns.map((/**
         * @param {?} col
         * @return {?}
         */
        function (col) { return col.hideable; })));
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
                    template: "<!--\n  ~ Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.\n  ~ This software is released under MIT license.\n  ~ The full license information can be found in LICENSE in the root directory of this project.\n  -->\n\n<ng-content select=\"clr-dg-action-bar\"></ng-content>\n<div class=\"datagrid\" #datagrid>\n    <div class=\"datagrid-table-wrapper\">\n      <div role=\"grid\" class=\"datagrid-table\">\n        <div role=\"rowgroup\" class=\"datagrid-header\">\n          <div role=\"row\" class=\"datagrid-row\">\n            <div class=\"datagrid-row-master datagrid-row-flex\">\n              <div class=\"datagrid-row-sticky\">\n                <!-- Sticky elements here -->\n              </div>\n              <div class=\"datagrid-row-scrollable\">\n                <!--header for datagrid where you can select multiple rows -->\n                <div role=\"columnheader\" class=\"datagrid-column datagrid-select datagrid-fixed-column\"\n                     *ngIf=\"selection.selectionType === SELECTION_TYPE.Multi\">\n                            <span class=\"datagrid-column-title\">\n                                <input clrCheckbox type=\"checkbox\" [(ngModel)]=\"allSelected\"\n                                       [attr.aria-label]=\"commonStrings.selectAll\">\n                            </span>\n                  <div class=\"datagrid-column-separator\"></div>\n                </div>\n                <!-- header for datagrid where you can select one row only -->\n                <div role=\"columnheader\" class=\"datagrid-column datagrid-select datagrid-fixed-column\"\n                     *ngIf=\"selection.selectionType === SELECTION_TYPE.Single\">\n                  <div class=\"datagrid-column-separator\"></div>\n                </div>\n                <!-- header for single row action; only displayType if we have at least one actionable row in datagrid -->\n                <div role=\"columnheader\" class=\"datagrid-column datagrid-row-actions datagrid-fixed-column\"\n                     *ngIf=\"rowActionService.hasActionableRow\">\n                  <div class=\"datagrid-column-separator\"></div>\n                </div>\n                <!-- header for carets; only displayType if we have at least one expandable row in datagrid -->\n                <div role=\"columnheader\" class=\"datagrid-column datagrid-expandable-caret datagrid-fixed-column\"\n                     *ngIf=\"expandableRows.hasExpandableRow\">\n                  <div class=\"datagrid-column-separator\"></div>\n                </div>\n                <ng-container #projectedDisplayColumns></ng-container>\n              </div>\n            </div>\n          </div>\n        </div>\n        <ng-container #displayedRows></ng-container>\n        <!-- Custom placeholder overrides the default empty one -->\n        <ng-content select=\"clr-dg-placeholder\"></ng-content>\n        <clr-dg-placeholder *ngIf=\"!placeholder\"></clr-dg-placeholder>\n      </div>\n    </div>\n</div>\n<ng-content select=\"clr-dg-footer\"></ng-content>\n<div class=\"datagrid-spinner\" *ngIf=\"loading\">\n    <div class=\"spinner spinner-md\">Loading...</div>\n</div>\n\n<div class=\"datagrid-calculation-table\">\n    <div class=\"datagrid-calculation-header\">\n        <ng-container #projectedCalculationColumns></ng-container>\n    </div>\n    <ng-container #calculationRows></ng-container>\n</div>\n",
                    providers: [
                        Selection,
                        Sort,
                        FiltersProvider,
                        Page,
                        Items,
                        DatagridRenderOrganizer,
                        RowActionService,
                        ExpandableRowsCount,
                        HideableColumnService,
                        StateDebouncer,
                        StateProvider,
                        ColumnToggleButtonsService,
                        TableSizeService,
                        ColumnsService,
                        DisplayModeService,
                    ],
                    host: { '[class.datagrid-host]': 'true' }
                }] }
    ];
    /** @nocollapse */
    ClrDatagrid.ctorParameters = function () { return [
        { type: HideableColumnService },
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
        iterator: [{ type: ContentChild, args: [ClrDatagridItems,] }],
        selected: [{ type: Input, args: ['clrDgSelected',] }],
        selectedChanged: [{ type: Output, args: ['clrDgSelectedChange',] }],
        singleSelected: [{ type: Input, args: ['clrDgSingleSelected',] }],
        singleSelectedChanged: [{ type: Output, args: ['clrDgSingleSelectedChange',] }],
        rowSelectionMode: [{ type: Input, args: ['clrDgRowSelection',] }],
        placeholder: [{ type: ContentChild, args: [ClrDatagridPlaceholder,] }],
        columns: [{ type: ContentChildren, args: [ClrDatagridColumn,] }],
        rows: [{ type: ContentChildren, args: [ClrDatagridRow,] }],
        scrollableColumns: [{ type: ViewChild, args: ['scrollableColumns', { read: ViewContainerRef },] }],
        _projectedDisplayColumns: [{ type: ViewChild, args: ['projectedDisplayColumns', { read: ViewContainerRef },] }],
        _projectedCalculationColumns: [{ type: ViewChild, args: ['projectedCalculationColumns', { read: ViewContainerRef },] }],
        _displayedRows: [{ type: ViewChild, args: ['displayedRows', { read: ViewContainerRef },] }],
        _calculationRows: [{ type: ViewChild, args: ['calculationRows', { read: ViewContainerRef },] }]
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
    ClrDatagrid.prototype.columnService;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJkYXRhL2RhdGFncmlkL2RhdGFncmlkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtBLE9BQU8sRUFHTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLGVBQWUsRUFDZixVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFFTCxNQUFNLEVBQ04sU0FBUyxFQUNULFNBQVMsRUFDVCxTQUFTLEVBQ1QsZ0JBQWdCLEdBQ2pCLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUVoRSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUN2RixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN0RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDekUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDNUUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUN4QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sdUJBQXVCLENB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LFNBQUMsaUJBQWlCO3VCQVFqQyxlQUFlLFNBQUMsY0FBYztvQ0FDOUIsU0FBUyxTQUFDLG1CQUFtQixFQUFFLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFOzJDQWtHekQsU0FBUyxTQUFDLHlCQUF5QixFQUFFLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFOytDQUUvRCxTQUFTLFNBQUMsNkJBQTZCLEVBQUUsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUU7aUNBRW5FLFNBQVMsU0FBQyxlQUFlLEVBQUUsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUU7bUNBRXJELFNBQVMsU0FBQyxpQkFBaUIsRUFBRSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRTs7SUFFMUQsa0JBQUM7Q0FBQSxBQTdQRCxJQTZQQztTQXZPWSxXQUFXOzs7SUFnQnRCLHFDQUFzQzs7Ozs7SUFpQnRDLDhCQUErRjs7Ozs7SUFZL0YsK0JBQXFFOztJQWVyRSxzQ0FBOEU7O0lBa0I5RSw0Q0FBd0Y7Ozs7O0lBaUN4RixrQ0FBb0Y7Ozs7O0lBS3BGLDhCQUFvRjs7Ozs7OztJQVFwRiwyQkFBb0U7O0lBQ3BFLHdDQUNvQzs7Ozs7O0lBdUZwQyxxQ0FBNEM7O0lBVTVDLCtDQUMyQzs7SUFDM0MsbURBQytDOztJQUMvQyxxQ0FDaUM7O0lBQ2pDLHVDQUNtQzs7Ozs7SUFwT2pDLG9DQUE0Qzs7Ozs7SUFDNUMsZ0NBQTBDOztJQUMxQyw0QkFBc0I7O0lBQ3RCLHFDQUEwQzs7SUFDMUMsZ0NBQThCOztJQUM5Qix1Q0FBeUM7Ozs7O0lBQ3pDLG9DQUF1Qzs7Ozs7SUFDdkMsa0NBQXVDOzs7OztJQUN2QywrQkFBMkI7Ozs7O0lBQzNCLHlCQUFzQjs7SUFDdEIsb0NBQXNDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIFF1ZXJ5TGlzdCxcbiAgUmVuZGVyZXIyLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdDb250YWluZXJSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IENsckRhdGFncmlkQ29sdW1uIH0gZnJvbSAnLi9kYXRhZ3JpZC1jb2x1bW4nO1xuaW1wb3J0IHsgQ2xyRGF0YWdyaWRJdGVtcyB9IGZyb20gJy4vZGF0YWdyaWQtaXRlbXMnO1xuaW1wb3J0IHsgQ2xyRGF0YWdyaWRQbGFjZWhvbGRlciB9IGZyb20gJy4vZGF0YWdyaWQtcGxhY2Vob2xkZXInO1xuaW1wb3J0IHsgQ2xyRGF0YWdyaWRSb3cgfSBmcm9tICcuL2RhdGFncmlkLXJvdyc7XG5pbXBvcnQgeyBEYXRhZ3JpZERpc3BsYXlNb2RlIH0gZnJvbSAnLi9lbnVtcy9kaXNwbGF5LW1vZGUuZW51bSc7XG5pbXBvcnQgeyBDbHJEYXRhZ3JpZFN0YXRlSW50ZXJmYWNlIH0gZnJvbSAnLi9pbnRlcmZhY2VzL3N0YXRlLmludGVyZmFjZSc7XG5pbXBvcnQgeyBDb2x1bW5Ub2dnbGVCdXR0b25zU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2NvbHVtbi10b2dnbGUtYnV0dG9ucy5zZXJ2aWNlJztcbmltcG9ydCB7IERpc3BsYXlNb2RlU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2Rpc3BsYXktbW9kZS5zZXJ2aWNlJztcbmltcG9ydCB7IEZpbHRlcnNQcm92aWRlciB9IGZyb20gJy4vcHJvdmlkZXJzL2ZpbHRlcnMnO1xuaW1wb3J0IHsgRXhwYW5kYWJsZVJvd3NDb3VudCB9IGZyb20gJy4vcHJvdmlkZXJzL2dsb2JhbC1leHBhbmRhYmxlLXJvd3MnO1xuaW1wb3J0IHsgSGlkZWFibGVDb2x1bW5TZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvaGlkZWFibGUtY29sdW1uLnNlcnZpY2UnO1xuaW1wb3J0IHsgSXRlbXMgfSBmcm9tICcuL3Byb3ZpZGVycy9pdGVtcyc7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSAnLi9wcm92aWRlcnMvcGFnZSc7XG5pbXBvcnQgeyBSb3dBY3Rpb25TZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvcm93LWFjdGlvbi1zZXJ2aWNlJztcbmltcG9ydCB7IFNlbGVjdGlvbiB9IGZyb20gJy4vcHJvdmlkZXJzL3NlbGVjdGlvbic7XG5pbXBvcnQgeyBTb3J0IH0gZnJvbSAnLi9wcm92aWRlcnMvc29ydCc7XG5pbXBvcnQgeyBTdGF0ZURlYm91bmNlciB9IGZyb20gJy4vcHJvdmlkZXJzL3N0YXRlLWRlYm91bmNlci5wcm92aWRlcic7XG5pbXBvcnQgeyBTdGF0ZVByb3ZpZGVyIH0gZnJvbSAnLi9wcm92aWRlcnMvc3RhdGUucHJvdmlkZXInO1xuaW1wb3J0IHsgVGFibGVTaXplU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL3RhYmxlLXNpemUuc2VydmljZSc7XG5pbXBvcnQgeyBEYXRhZ3JpZFJlbmRlck9yZ2FuaXplciB9IGZyb20gJy4vcmVuZGVyL3JlbmRlci1vcmdhbml6ZXInO1xuaW1wb3J0IHsgQ2xyQ29tbW9uU3RyaW5ncyB9IGZyb20gJy4uLy4uL3V0aWxzL2kxOG4vY29tbW9uLXN0cmluZ3MuaW50ZXJmYWNlJztcbmltcG9ydCB7IFNlbGVjdGlvblR5cGUgfSBmcm9tICcuL2VudW1zL3NlbGVjdGlvbi10eXBlJztcbmltcG9ydCB7IENvbHVtbnNTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvY29sdW1ucy5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLWRhdGFncmlkJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2RhdGFncmlkLmh0bWwnLFxuICBwcm92aWRlcnM6IFtcbiAgICBTZWxlY3Rpb24sXG4gICAgU29ydCxcbiAgICBGaWx0ZXJzUHJvdmlkZXIsXG4gICAgUGFnZSxcbiAgICBJdGVtcyxcbiAgICBEYXRhZ3JpZFJlbmRlck9yZ2FuaXplcixcbiAgICBSb3dBY3Rpb25TZXJ2aWNlLFxuICAgIEV4cGFuZGFibGVSb3dzQ291bnQsXG4gICAgSGlkZWFibGVDb2x1bW5TZXJ2aWNlLFxuICAgIFN0YXRlRGVib3VuY2VyLFxuICAgIFN0YXRlUHJvdmlkZXIsXG4gICAgQ29sdW1uVG9nZ2xlQnV0dG9uc1NlcnZpY2UsXG4gICAgVGFibGVTaXplU2VydmljZSxcbiAgICBDb2x1bW5zU2VydmljZSxcbiAgICBEaXNwbGF5TW9kZVNlcnZpY2UsXG4gIF0sXG4gIGhvc3Q6IHsgJ1tjbGFzcy5kYXRhZ3JpZC1ob3N0XSc6ICd0cnVlJyB9LFxufSlcbmV4cG9ydCBjbGFzcyBDbHJEYXRhZ3JpZDxUID0gYW55PiBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY29sdW1uU2VydmljZTogSGlkZWFibGVDb2x1bW5TZXJ2aWNlLFxuICAgIHByaXZhdGUgb3JnYW5pemVyOiBEYXRhZ3JpZFJlbmRlck9yZ2FuaXplcixcbiAgICBwdWJsaWMgaXRlbXM6IEl0ZW1zPFQ+LFxuICAgIHB1YmxpYyBleHBhbmRhYmxlUm93czogRXhwYW5kYWJsZVJvd3NDb3VudCxcbiAgICBwdWJsaWMgc2VsZWN0aW9uOiBTZWxlY3Rpb248VD4sXG4gICAgcHVibGljIHJvd0FjdGlvblNlcnZpY2U6IFJvd0FjdGlvblNlcnZpY2UsXG4gICAgcHJpdmF0ZSBzdGF0ZVByb3ZpZGVyOiBTdGF0ZVByb3ZpZGVyPFQ+LFxuICAgIHByaXZhdGUgZGlzcGxheU1vZGU6IERpc3BsYXlNb2RlU2VydmljZSxcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZixcbiAgICBwdWJsaWMgY29tbW9uU3RyaW5nczogQ2xyQ29tbW9uU3RyaW5nc1xuICApIHt9XG5cbiAgLyogcmVmZXJlbmNlIHRvIHRoZSBlbnVtIHNvIHRoYXQgdGVtcGxhdGUgY2FuIGFjY2VzcyAqL1xuICBwdWJsaWMgU0VMRUNUSU9OX1RZUEUgPSBTZWxlY3Rpb25UeXBlO1xuXG4gIC8qKlxuICAgKiBGcmVlemVzIHRoZSBkYXRhZ3JpZCB3aGlsZSBkYXRhIGlzIGxvYWRpbmdcbiAgICovXG4gIHB1YmxpYyBnZXQgbG9hZGluZygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5pdGVtcy5sb2FkaW5nO1xuICB9XG5cbiAgQElucHV0KCdjbHJEZ0xvYWRpbmcnKVxuICBwdWJsaWMgc2V0IGxvYWRpbmcodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLml0ZW1zLmxvYWRpbmcgPSB2YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPdXRwdXQgZW1pdHRlZCB3aGVuZXZlciB0aGUgZGF0YSBuZWVkcyB0byBiZSByZWZyZXNoZWQsIGJhc2VkIG9uIHVzZXIgYWN0aW9uIG9yIGV4dGVybmFsIG9uZXNcbiAgICovXG4gIEBPdXRwdXQoJ2NsckRnUmVmcmVzaCcpIHB1YmxpYyByZWZyZXNoID0gbmV3IEV2ZW50RW1pdHRlcjxDbHJEYXRhZ3JpZFN0YXRlSW50ZXJmYWNlPFQ+PihmYWxzZSk7XG5cbiAgLyoqXG4gICAqIFB1YmxpYyBtZXRob2QgdG8gcmUtdHJpZ2dlciB0aGUgY29tcHV0YXRpb24gb2YgZGlzcGxheWVkIGl0ZW1zIG1hbnVhbGx5XG4gICAqL1xuICBwdWJsaWMgZGF0YUNoYW5nZWQoKSB7XG4gICAgdGhpcy5pdGVtcy5yZWZyZXNoKCk7XG4gIH1cblxuICAvKipcbiAgICogV2UgZ3JhYiB0aGUgc21hcnQgaXRlcmF0b3IgZnJvbSBwcm9qZWN0ZWQgY29udGVudFxuICAgKi9cbiAgQENvbnRlbnRDaGlsZChDbHJEYXRhZ3JpZEl0ZW1zKSBwdWJsaWMgaXRlcmF0b3I6IENsckRhdGFncmlkSXRlbXM8VD47XG5cbiAgLyoqXG4gICAqIEFycmF5IG9mIGFsbCBzZWxlY3RlZCBpdGVtc1xuICAgKi9cbiAgQElucHV0KCdjbHJEZ1NlbGVjdGVkJylcbiAgc2V0IHNlbGVjdGVkKHZhbHVlOiBUW10pIHtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMuc2VsZWN0aW9uLnNlbGVjdGlvblR5cGUgPSBTZWxlY3Rpb25UeXBlLk11bHRpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNlbGVjdGlvbi5zZWxlY3Rpb25UeXBlID0gU2VsZWN0aW9uVHlwZS5Ob25lO1xuICAgIH1cbiAgICB0aGlzLnNlbGVjdGlvbi51cGRhdGVDdXJyZW50KHZhbHVlLCBmYWxzZSk7XG4gIH1cblxuICBAT3V0cHV0KCdjbHJEZ1NlbGVjdGVkQ2hhbmdlJykgc2VsZWN0ZWRDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxUW10+KGZhbHNlKTtcblxuICAvKipcbiAgICogU2VsZWN0ZWQgaXRlbSBpbiBzaW5nbGUtc2VsZWN0IG1vZGVcbiAgICovXG4gIEBJbnB1dCgnY2xyRGdTaW5nbGVTZWxlY3RlZCcpXG4gIHNldCBzaW5nbGVTZWxlY3RlZCh2YWx1ZTogVCkge1xuICAgIHRoaXMuc2VsZWN0aW9uLnNlbGVjdGlvblR5cGUgPSBTZWxlY3Rpb25UeXBlLlNpbmdsZTtcbiAgICAvLyB0aGUgY2xyRGdTaW5nbGVTZWxlY3RlZCBpcyB1cGRhdGVkIGluIG9uZSBvZiB0d28gY2FzZXM6XG4gICAgLy8gMS4gYW4gZXhwbGljaXQgdmFsdWUgaXMgcGFzc2VkXG4gICAgLy8gMi4gaXMgYmVpbmcgc2V0IHRvIG51bGwgb3IgdW5kZWZpbmVkLCB3aGVyZSBwcmV2aW91c2x5IGl0IGhhZCBhIHZhbHVlXG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLnNlbGVjdGlvbi5jdXJyZW50U2luZ2xlID0gdmFsdWU7XG4gICAgfSBlbHNlIGlmICh0aGlzLnNlbGVjdGlvbi5jdXJyZW50U2luZ2xlKSB7XG4gICAgICB0aGlzLnNlbGVjdGlvbi5jdXJyZW50U2luZ2xlID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBAT3V0cHV0KCdjbHJEZ1NpbmdsZVNlbGVjdGVkQ2hhbmdlJykgc2luZ2xlU2VsZWN0ZWRDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxUPihmYWxzZSk7XG5cbiAgLyoqXG4gICAqIFNlbGVjdGlvbi9EZXNlbGVjdGlvbiBvbiByb3cgY2xpY2sgbW9kZVxuICAgKi9cbiAgQElucHV0KCdjbHJEZ1Jvd1NlbGVjdGlvbicpXG4gIHNldCByb3dTZWxlY3Rpb25Nb2RlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5zZWxlY3Rpb24ucm93U2VsZWN0aW9uTW9kZSA9IHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEluZGljYXRlcyBpZiBhbGwgY3VycmVudGx5IGRpc3BsYXllZCBpdGVtcyBhcmUgc2VsZWN0ZWRcbiAgICovXG4gIHB1YmxpYyBnZXQgYWxsU2VsZWN0ZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0aW9uLmlzQWxsU2VsZWN0ZWQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWxlY3RzL2Rlc2VsZWN0cyBhbGwgY3VycmVudGx5IGRpc3BsYXllZCBpdGVtc1xuICAgKiBAcGFyYW0gdmFsdWVcbiAgICovXG4gIHB1YmxpYyBzZXQgYWxsU2VsZWN0ZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAvKlxuICAgICAgICAgKiBUaGlzIGlzIGEgc2V0dGVyIGJ1dCB3ZSBpZ25vcmUgdGhlIHZhbHVlLlxuICAgICAgICAgKiBJdCdzIHN0cmFuZ2UsIGJ1dCBpdCBsZXRzIHVzIGhhdmUgYW4gaW5kZXRlcm1pbmF0ZSBzdGF0ZSB3aGVyZSBvbmx5XG4gICAgICAgICAqIHNvbWUgb2YgdGhlIGl0ZW1zIGFyZSBzZWxlY3RlZC5cbiAgICAgICAgICovXG4gICAgdGhpcy5zZWxlY3Rpb24udG9nZ2xlQWxsKCk7XG4gIH1cblxuICAvKipcbiAgICogQ3VzdG9tIHBsYWNlaG9sZGVyIGRldGVjdGlvblxuICAgKi9cbiAgQENvbnRlbnRDaGlsZChDbHJEYXRhZ3JpZFBsYWNlaG9sZGVyKSBwdWJsaWMgcGxhY2Vob2xkZXI6IENsckRhdGFncmlkUGxhY2Vob2xkZXI8VD47XG5cbiAgLyoqXG4gICAqIEhpZGVhYmxlIENvbHVtbiBkYXRhIHNvdXJjZSAvIGRldGVjdGlvbi5cbiAgICovXG4gIEBDb250ZW50Q2hpbGRyZW4oQ2xyRGF0YWdyaWRDb2x1bW4pIHB1YmxpYyBjb2x1bW5zOiBRdWVyeUxpc3Q8Q2xyRGF0YWdyaWRDb2x1bW48VD4+O1xuXG4gIC8qKlxuICAgKiBXaGVuIHRoZSBkYXRhZ3JpZCBpcyB1c2VyLW1hbmFnZWQgd2l0aG91dCB0aGUgc21hcnQgaXRlcmF0b3IsIHdlIGdldCB0aGUgaXRlbXMgZGlzcGxheWVkXG4gICAqIGJ5IHF1ZXJ5aW5nIHRoZSBwcm9qZWN0ZWQgY29udGVudC4gVGhpcyBpcyBuZWVkZWQgdG8ga2VlcCB0cmFjayBvZiB0aGUgbW9kZWxzIGN1cnJlbnRseVxuICAgKiBkaXNwbGF5ZWQsIHR5cGljYWxseSBmb3Igc2VsZWN0aW9uLlxuICAgKi9cblxuICBAQ29udGVudENoaWxkcmVuKENsckRhdGFncmlkUm93KSByb3dzOiBRdWVyeUxpc3Q8Q2xyRGF0YWdyaWRSb3c8VD4+O1xuICBAVmlld0NoaWxkKCdzY3JvbGxhYmxlQ29sdW1ucycsIHsgcmVhZDogVmlld0NvbnRhaW5lclJlZiB9KVxuICBzY3JvbGxhYmxlQ29sdW1uczogVmlld0NvbnRhaW5lclJlZjtcblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgaWYgKCF0aGlzLml0ZW1zLnNtYXJ0KSB7XG4gICAgICB0aGlzLml0ZW1zLmFsbCA9IHRoaXMucm93cy5tYXAoKHJvdzogQ2xyRGF0YWdyaWRSb3c8VD4pID0+IHJvdy5pdGVtKTtcbiAgICB9XG5cbiAgICB0aGlzLl9zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLnJvd3MuY2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICBpZiAoIXRoaXMuaXRlbXMuc21hcnQpIHtcbiAgICAgICAgICB0aGlzLml0ZW1zLmFsbCA9IHRoaXMucm93cy5tYXAoKHJvdzogQ2xyRGF0YWdyaWRSb3c8VD4pID0+IHJvdy5pdGVtKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJvd3MuZm9yRWFjaChyb3cgPT4ge1xuICAgICAgICAgIHRoaXMuX2Rpc3BsYXllZFJvd3MuaW5zZXJ0KHJvdy5fdmlldyk7XG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICApO1xuXG4gICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5jb2x1bW5zLmNoYW5nZXMuc3Vic2NyaWJlKChjb2x1bW5zOiBDbHJEYXRhZ3JpZENvbHVtbjxUPltdKSA9PiB7XG4gICAgICAgIHRoaXMuY29sdW1uU2VydmljZS51cGRhdGVDb2x1bW5MaXN0KHRoaXMuY29sdW1ucy5tYXAoY29sID0+IGNvbC5oaWRlYWJsZSkpO1xuICAgICAgfSlcbiAgICApO1xuXG4gICAgLy8gR2V0IENvbHVtblNlcnZpY2UgcmVhZHkgZm9yIEhpZGVhYmxlQ29sdW1ucy5cbiAgICB0aGlzLmNvbHVtblNlcnZpY2UudXBkYXRlQ29sdW1uTGlzdCh0aGlzLmNvbHVtbnMubWFwKGNvbCA9PiBjb2wuaGlkZWFibGUpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPdXIgc2V0dXAgaGFwcGVucyBpbiB0aGUgdmlldyBvZiBzb21lIG9mIG91ciBjb21wb25lbnRzLCBzbyB3ZSB3YWl0IGZvciBpdCB0byBiZSBkb25lIGJlZm9yZSBzdGFydGluZ1xuICAgKi9cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIC8vIFRPRE86IGRldGVybWluZSBpZiB3ZSBjYW4gZ2V0IHJpZCBvZiBwcm92aWRlciB3aXJpbmcgaW4gdmlldyBpbml0IHNvIHRoYXQgc3Vic2NyaXB0aW9ucyBjYW4gYmUgZG9uZSBlYXJsaWVyXG4gICAgdGhpcy5yZWZyZXNoLmVtaXQodGhpcy5zdGF0ZVByb3ZpZGVyLnN0YXRlKTtcbiAgICB0aGlzLl9zdWJzY3JpcHRpb25zLnB1c2godGhpcy5zdGF0ZVByb3ZpZGVyLmNoYW5nZS5zdWJzY3JpYmUoc3RhdGUgPT4gdGhpcy5yZWZyZXNoLmVtaXQoc3RhdGUpKSk7XG4gICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5zZWxlY3Rpb24uY2hhbmdlLnN1YnNjcmliZShzID0+IHtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uLnNlbGVjdGlvblR5cGUgPT09IFNlbGVjdGlvblR5cGUuU2luZ2xlKSB7XG4gICAgICAgICAgdGhpcy5zaW5nbGVTZWxlY3RlZENoYW5nZWQuZW1pdCg8VD5zKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNlbGVjdGlvbi5zZWxlY3Rpb25UeXBlID09PSBTZWxlY3Rpb25UeXBlLk11bHRpKSB7XG4gICAgICAgICAgdGhpcy5zZWxlY3RlZENoYW5nZWQuZW1pdCg8VFtdPnMpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gICAgLy8gQSBzdWJzY3JpcHRpb24gdGhhdCBsaXN0ZW5zIGZvciBkaXNwbGF5TW9kZSBjaGFuZ2VzIG9uIHRoZSBkYXRhZ3JpZFxuICAgIHRoaXMuZGlzcGxheU1vZGUudmlldy5zdWJzY3JpYmUodmlld0NoYW5nZSA9PiB7XG4gICAgICAvLyBSZW1vdmUgYW55IHByb2plY3RlZCBjb2x1bW5zIGZyb20gdGhlIHByb2plY3RlZERpc3BsYXlDb2x1bW5zIGNvbnRhaW5lclxuICAgICAgZm9yIChsZXQgaSA9IHRoaXMuX3Byb2plY3RlZERpc3BsYXlDb2x1bW5zLmxlbmd0aDsgaSA+IDA7IGktLSkge1xuICAgICAgICB0aGlzLl9wcm9qZWN0ZWREaXNwbGF5Q29sdW1ucy5kZXRhY2goKTtcbiAgICAgIH1cbiAgICAgIC8vIFJlbW92ZSBhbnkgcHJvamVjdGVkIGNvbHVtbnMgZnJvbSB0aGUgcHJvamVjdGVkQ2FsY3VsYXRpb25Db2x1bW5zIGNvbnRhaW5lclxuICAgICAgZm9yIChsZXQgaSA9IHRoaXMuX3Byb2plY3RlZENhbGN1bGF0aW9uQ29sdW1ucy5sZW5ndGg7IGkgPiAwOyBpLS0pIHtcbiAgICAgICAgdGhpcy5fcHJvamVjdGVkQ2FsY3VsYXRpb25Db2x1bW5zLmRldGFjaCgpO1xuICAgICAgfVxuICAgICAgLy8gUmVtb3ZlIGFueSBwcm9qZWN0ZWQgcm93cyBmcm9tIHRoZSBjYWxjdWxhdGlvblJvd3MgY29udGFpbmVyXG4gICAgICBmb3IgKGxldCBpID0gdGhpcy5fY2FsY3VsYXRpb25Sb3dzLmxlbmd0aDsgaSA+IDA7IGktLSkge1xuICAgICAgICB0aGlzLl9jYWxjdWxhdGlvblJvd3MuZGV0YWNoKCk7XG4gICAgICB9XG4gICAgICAvLyBSZW1vdmUgYW55IHByb2plY3RlZCByb3dzIGZyb20gdGhlIGRpc3BsYXllZFJvd3MgY29udGFpbmVyXG4gICAgICBmb3IgKGxldCBpID0gdGhpcy5fZGlzcGxheWVkUm93cy5sZW5ndGg7IGkgPiAwOyBpLS0pIHtcbiAgICAgICAgdGhpcy5fZGlzcGxheWVkUm93cy5kZXRhY2goKTtcbiAgICAgIH1cbiAgICAgIGlmICh2aWV3Q2hhbmdlID09PSBEYXRhZ3JpZERpc3BsYXlNb2RlLkRJU1BMQVkpIHtcbiAgICAgICAgLy8gU2V0IHN0YXRlLCBzdHlsZSBmb3IgdGhlIGRhdGFncmlkIHRvIERJU1BMQVkgYW5kIGluc2VydCByb3cgJiBjb2x1bW5zIGludG8gY29udGFpbmVyc1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2RhdGFncmlkLWNhbGN1bGF0ZS1tb2RlJyk7XG4gICAgICAgIHRoaXMuY29sdW1ucy5mb3JFYWNoKGNvbHVtbiA9PiB7XG4gICAgICAgICAgdGhpcy5fcHJvamVjdGVkRGlzcGxheUNvbHVtbnMuaW5zZXJ0KGNvbHVtbi5fdmlldyk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnJvd3MuZm9yRWFjaChyb3cgPT4ge1xuICAgICAgICAgIHRoaXMuX2Rpc3BsYXllZFJvd3MuaW5zZXJ0KHJvdy5fdmlldyk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gU2V0IHN0YXRlLCBzdHlsZSBmb3IgdGhlIGRhdGFncmlkIHRvIENBTENVTEFURSBhbmQgaW5zZXJ0IHJvdyAmIGNvbHVtbnMgaW50byBjb250YWluZXJzXG4gICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnZGF0YWdyaWQtY2FsY3VsYXRlLW1vZGUnKTtcbiAgICAgICAgdGhpcy5jb2x1bW5zLmZvckVhY2goY29sdW1uID0+IHtcbiAgICAgICAgICB0aGlzLl9wcm9qZWN0ZWRDYWxjdWxhdGlvbkNvbHVtbnMuaW5zZXJ0KGNvbHVtbi5fdmlldyk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnJvd3MuZm9yRWFjaChyb3cgPT4ge1xuICAgICAgICAgIHRoaXMuX2NhbGN1bGF0aW9uUm93cy5pbnNlcnQocm93Ll92aWV3KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogU3Vic2NyaXB0aW9ucyB0byBhbGwgdGhlIHNlcnZpY2VzIGFuZCBxdWVyaWVzIGNoYW5nZXNcbiAgICovXG4gIHByaXZhdGUgX3N1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5mb3JFYWNoKChzdWI6IFN1YnNjcmlwdGlvbikgPT4gc3ViLnVuc3Vic2NyaWJlKCkpO1xuICB9XG5cbiAgcmVzaXplKCk6IHZvaWQge1xuICAgIHRoaXMub3JnYW5pemVyLnJlc2l6ZSgpO1xuICB9XG5cbiAgQFZpZXdDaGlsZCgncHJvamVjdGVkRGlzcGxheUNvbHVtbnMnLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYgfSlcbiAgX3Byb2plY3RlZERpc3BsYXlDb2x1bW5zOiBWaWV3Q29udGFpbmVyUmVmO1xuICBAVmlld0NoaWxkKCdwcm9qZWN0ZWRDYWxjdWxhdGlvbkNvbHVtbnMnLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYgfSlcbiAgX3Byb2plY3RlZENhbGN1bGF0aW9uQ29sdW1uczogVmlld0NvbnRhaW5lclJlZjtcbiAgQFZpZXdDaGlsZCgnZGlzcGxheWVkUm93cycsIHsgcmVhZDogVmlld0NvbnRhaW5lclJlZiB9KVxuICBfZGlzcGxheWVkUm93czogVmlld0NvbnRhaW5lclJlZjtcbiAgQFZpZXdDaGlsZCgnY2FsY3VsYXRpb25Sb3dzJywgeyByZWFkOiBWaWV3Q29udGFpbmVyUmVmIH0pXG4gIF9jYWxjdWxhdGlvblJvd3M6IFZpZXdDb250YWluZXJSZWY7XG59XG4iXX0=