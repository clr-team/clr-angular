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
export class ClrDatagrid {
    /**
     * @param {?} columnService
     * @param {?} organizer
     * @param {?} items
     * @param {?} expandableRows
     * @param {?} selection
     * @param {?} rowActionService
     * @param {?} stateProvider
     * @param {?} displayMode
     * @param {?} renderer
     * @param {?} el
     * @param {?} commonStrings
     */
    constructor(columnService, organizer, items, expandableRows, selection, rowActionService, stateProvider, displayMode, renderer, el, commonStrings) {
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
    /**
     * Freezes the datagrid while data is loading
     * @return {?}
     */
    get loading() {
        return this.items.loading;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set loading(value) {
        this.items.loading = value;
    }
    /**
     * Public method to re-trigger the computation of displayed items manually
     * @return {?}
     */
    dataChanged() {
        this.items.refresh();
    }
    /**
     * Array of all selected items
     * @param {?} value
     * @return {?}
     */
    set selected(value) {
        if (value) {
            this.selection.selectionType = SelectionType.Multi;
        }
        else {
            this.selection.selectionType = SelectionType.None;
        }
        this.selection.updateCurrent(value, false);
    }
    /**
     * Selected item in single-select mode
     * @param {?} value
     * @return {?}
     */
    set singleSelected(value) {
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
    }
    /**
     * Selection/Deselection on row click mode
     * @param {?} value
     * @return {?}
     */
    set rowSelectionMode(value) {
        this.selection.rowSelectionMode = value;
    }
    /**
     * Indicates if all currently displayed items are selected
     * @return {?}
     */
    get allSelected() {
        return this.selection.isAllSelected();
    }
    /**
     * Selects/deselects all currently displayed items
     * @param {?} value
     * @return {?}
     */
    set allSelected(value) {
        /*
             * This is a setter but we ignore the value.
             * It's strange, but it lets us have an indeterminate state where only
             * some of the items are selected.
             */
        this.selection.toggleAll();
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        if (!this.items.smart) {
            this.items.all = this.rows.map((/**
             * @param {?} row
             * @return {?}
             */
            (row) => row.item));
        }
        this._subscriptions.push(this.rows.changes.subscribe((/**
         * @return {?}
         */
        () => {
            if (!this.items.smart) {
                this.items.all = this.rows.map((/**
                 * @param {?} row
                 * @return {?}
                 */
                (row) => row.item));
            }
            this.rows.forEach((/**
             * @param {?} row
             * @return {?}
             */
            row => {
                this._displayedRows.insert(row._view);
            }));
        })));
        this._subscriptions.push(this.columns.changes.subscribe((/**
         * @param {?} columns
         * @return {?}
         */
        (columns) => {
            this.columnService.updateColumnList(this.columns.map((/**
             * @param {?} col
             * @return {?}
             */
            col => col.hideable)));
        })));
        // Get ColumnService ready for HideableColumns.
        this.columnService.updateColumnList(this.columns.map((/**
         * @param {?} col
         * @return {?}
         */
        col => col.hideable)));
    }
    /**
     * Our setup happens in the view of some of our components, so we wait for it to be done before starting
     * @return {?}
     */
    ngAfterViewInit() {
        // TODO: determine if we can get rid of provider wiring in view init so that subscriptions can be done earlier
        this.refresh.emit(this.stateProvider.state);
        this._subscriptions.push(this.stateProvider.change.subscribe((/**
         * @param {?} state
         * @return {?}
         */
        state => this.refresh.emit(state))));
        this._subscriptions.push(this.selection.change.subscribe((/**
         * @param {?} s
         * @return {?}
         */
        s => {
            if (this.selection.selectionType === SelectionType.Single) {
                this.singleSelectedChanged.emit((/** @type {?} */ (s)));
            }
            else if (this.selection.selectionType === SelectionType.Multi) {
                this.selectedChanged.emit((/** @type {?} */ (s)));
            }
        })));
        // A subscription that listens for displayMode changes on the datagrid
        this.displayMode.view.subscribe((/**
         * @param {?} viewChange
         * @return {?}
         */
        viewChange => {
            // Remove any projected columns from the projectedDisplayColumns container
            for (let i = this._projectedDisplayColumns.length; i > 0; i--) {
                this._projectedDisplayColumns.detach();
            }
            // Remove any projected columns from the projectedCalculationColumns container
            for (let i = this._projectedCalculationColumns.length; i > 0; i--) {
                this._projectedCalculationColumns.detach();
            }
            // Remove any projected rows from the calculationRows container
            for (let i = this._calculationRows.length; i > 0; i--) {
                this._calculationRows.detach();
            }
            // Remove any projected rows from the displayedRows container
            for (let i = this._displayedRows.length; i > 0; i--) {
                this._displayedRows.detach();
            }
            if (viewChange === DatagridDisplayMode.DISPLAY) {
                // Set state, style for the datagrid to DISPLAY and insert row & columns into containers
                this.renderer.removeClass(this.el.nativeElement, 'datagrid-calculate-mode');
                this.columns.forEach((/**
                 * @param {?} column
                 * @return {?}
                 */
                column => {
                    this._projectedDisplayColumns.insert(column._view);
                }));
                this.rows.forEach((/**
                 * @param {?} row
                 * @return {?}
                 */
                row => {
                    this._displayedRows.insert(row._view);
                }));
            }
            else {
                // Set state, style for the datagrid to CALCULATE and insert row & columns into containers
                this.renderer.addClass(this.el.nativeElement, 'datagrid-calculate-mode');
                this.columns.forEach((/**
                 * @param {?} column
                 * @return {?}
                 */
                column => {
                    this._projectedCalculationColumns.insert(column._view);
                }));
                this.rows.forEach((/**
                 * @param {?} row
                 * @return {?}
                 */
                row => {
                    this._calculationRows.insert(row._view);
                }));
            }
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        (sub) => sub.unsubscribe()));
    }
    /**
     * @return {?}
     */
    resize() {
        this.organizer.resize();
    }
}
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
ClrDatagrid.ctorParameters = () => [
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
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJkYXRhL2RhdGFncmlkL2RhdGFncmlkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtBLE9BQU8sRUFHTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLGVBQWUsRUFDZixVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFFTCxNQUFNLEVBQ04sU0FBUyxFQUNULFNBQVMsRUFDVCxTQUFTLEVBQ1QsZ0JBQWdCLEdBQ2pCLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUVoRSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUN2RixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN0RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDekUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDNUUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUN4QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sdUJBQXVCLENB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Z0IsRUFBRTs2QkFFbkUsU0FBUyxTQUFDLGVBQWUsRUFBRSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRTsrQkFFckQsU0FBUyxTQUFDLGlCQUFpQixFQUFFLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFOzs7O0lBck54RCxxQ0FBc0M7Ozs7O0lBaUJ0Qyw4QkFBK0Y7Ozs7O0lBWS9GLCtCQUFxRTs7SUFlckUsc0NBQThFOztJQWtCOUUsNENBQXdGOzs7OztJQWlDeEYsa0NBQW9GOzs7OztJQUtwRiw4QkFBb0Y7Ozs7Ozs7SUFRcEYsMkJBQW9FOztJQUNwRSx3Q0FDb0M7Ozs7OztJQXVGcEMscUNBQTRDOztJQVU1QywrQ0FDMkM7O0lBQzNDLG1EQUMrQzs7SUFDL0MscUNBQ2lDOztJQUNqQyx1Q0FDbUM7Ozs7O0lBcE9qQyxvQ0FBNEM7Ozs7O0lBQzVDLGdDQUEwQzs7SUFDMUMsNEJBQXNCOztJQUN0QixxQ0FBMEM7O0lBQzFDLGdDQUE4Qjs7SUFDOUIsdUNBQXlDOzs7OztJQUN6QyxvQ0FBdUM7Ozs7O0lBQ3ZDLGtDQUF1Qzs7Ozs7SUFDdkMsK0JBQTJCOzs7OztJQUMzQix5QkFBc0I7O0lBQ3RCLG9DQUFzQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIEFmdGVyVmlld0luaXQsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkLFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT3V0cHV0LFxuICBRdWVyeUxpc3QsXG4gIFJlbmRlcmVyMixcbiAgVmlld0NoaWxkLFxuICBWaWV3Q29udGFpbmVyUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBDbHJEYXRhZ3JpZENvbHVtbiB9IGZyb20gJy4vZGF0YWdyaWQtY29sdW1uJztcbmltcG9ydCB7IENsckRhdGFncmlkSXRlbXMgfSBmcm9tICcuL2RhdGFncmlkLWl0ZW1zJztcbmltcG9ydCB7IENsckRhdGFncmlkUGxhY2Vob2xkZXIgfSBmcm9tICcuL2RhdGFncmlkLXBsYWNlaG9sZGVyJztcbmltcG9ydCB7IENsckRhdGFncmlkUm93IH0gZnJvbSAnLi9kYXRhZ3JpZC1yb3cnO1xuaW1wb3J0IHsgRGF0YWdyaWREaXNwbGF5TW9kZSB9IGZyb20gJy4vZW51bXMvZGlzcGxheS1tb2RlLmVudW0nO1xuaW1wb3J0IHsgQ2xyRGF0YWdyaWRTdGF0ZUludGVyZmFjZSB9IGZyb20gJy4vaW50ZXJmYWNlcy9zdGF0ZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQ29sdW1uVG9nZ2xlQnV0dG9uc1NlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9jb2x1bW4tdG9nZ2xlLWJ1dHRvbnMuc2VydmljZSc7XG5pbXBvcnQgeyBEaXNwbGF5TW9kZVNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9kaXNwbGF5LW1vZGUuc2VydmljZSc7XG5pbXBvcnQgeyBGaWx0ZXJzUHJvdmlkZXIgfSBmcm9tICcuL3Byb3ZpZGVycy9maWx0ZXJzJztcbmltcG9ydCB7IEV4cGFuZGFibGVSb3dzQ291bnQgfSBmcm9tICcuL3Byb3ZpZGVycy9nbG9iYWwtZXhwYW5kYWJsZS1yb3dzJztcbmltcG9ydCB7IEhpZGVhYmxlQ29sdW1uU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2hpZGVhYmxlLWNvbHVtbi5zZXJ2aWNlJztcbmltcG9ydCB7IEl0ZW1zIH0gZnJvbSAnLi9wcm92aWRlcnMvaXRlbXMnO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gJy4vcHJvdmlkZXJzL3BhZ2UnO1xuaW1wb3J0IHsgUm93QWN0aW9uU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL3Jvdy1hY3Rpb24tc2VydmljZSc7XG5pbXBvcnQgeyBTZWxlY3Rpb24gfSBmcm9tICcuL3Byb3ZpZGVycy9zZWxlY3Rpb24nO1xuaW1wb3J0IHsgU29ydCB9IGZyb20gJy4vcHJvdmlkZXJzL3NvcnQnO1xuaW1wb3J0IHsgU3RhdGVEZWJvdW5jZXIgfSBmcm9tICcuL3Byb3ZpZGVycy9zdGF0ZS1kZWJvdW5jZXIucHJvdmlkZXInO1xuaW1wb3J0IHsgU3RhdGVQcm92aWRlciB9IGZyb20gJy4vcHJvdmlkZXJzL3N0YXRlLnByb3ZpZGVyJztcbmltcG9ydCB7IFRhYmxlU2l6ZVNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy90YWJsZS1zaXplLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0YWdyaWRSZW5kZXJPcmdhbml6ZXIgfSBmcm9tICcuL3JlbmRlci9yZW5kZXItb3JnYW5pemVyJztcbmltcG9ydCB7IENsckNvbW1vblN0cmluZ3MgfSBmcm9tICcuLi8uLi91dGlscy9pMThuL2NvbW1vbi1zdHJpbmdzLmludGVyZmFjZSc7XG5pbXBvcnQgeyBTZWxlY3Rpb25UeXBlIH0gZnJvbSAnLi9lbnVtcy9zZWxlY3Rpb24tdHlwZSc7XG5pbXBvcnQgeyBDb2x1bW5zU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2NvbHVtbnMuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci1kYXRhZ3JpZCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9kYXRhZ3JpZC5odG1sJyxcbiAgcHJvdmlkZXJzOiBbXG4gICAgU2VsZWN0aW9uLFxuICAgIFNvcnQsXG4gICAgRmlsdGVyc1Byb3ZpZGVyLFxuICAgIFBhZ2UsXG4gICAgSXRlbXMsXG4gICAgRGF0YWdyaWRSZW5kZXJPcmdhbml6ZXIsXG4gICAgUm93QWN0aW9uU2VydmljZSxcbiAgICBFeHBhbmRhYmxlUm93c0NvdW50LFxuICAgIEhpZGVhYmxlQ29sdW1uU2VydmljZSxcbiAgICBTdGF0ZURlYm91bmNlcixcbiAgICBTdGF0ZVByb3ZpZGVyLFxuICAgIENvbHVtblRvZ2dsZUJ1dHRvbnNTZXJ2aWNlLFxuICAgIFRhYmxlU2l6ZVNlcnZpY2UsXG4gICAgQ29sdW1uc1NlcnZpY2UsXG4gICAgRGlzcGxheU1vZGVTZXJ2aWNlLFxuICBdLFxuICBob3N0OiB7ICdbY2xhc3MuZGF0YWdyaWQtaG9zdF0nOiAndHJ1ZScgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyRGF0YWdyaWQ8VCA9IGFueT4gaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvbHVtblNlcnZpY2U6IEhpZGVhYmxlQ29sdW1uU2VydmljZSxcbiAgICBwcml2YXRlIG9yZ2FuaXplcjogRGF0YWdyaWRSZW5kZXJPcmdhbml6ZXIsXG4gICAgcHVibGljIGl0ZW1zOiBJdGVtczxUPixcbiAgICBwdWJsaWMgZXhwYW5kYWJsZVJvd3M6IEV4cGFuZGFibGVSb3dzQ291bnQsXG4gICAgcHVibGljIHNlbGVjdGlvbjogU2VsZWN0aW9uPFQ+LFxuICAgIHB1YmxpYyByb3dBY3Rpb25TZXJ2aWNlOiBSb3dBY3Rpb25TZXJ2aWNlLFxuICAgIHByaXZhdGUgc3RhdGVQcm92aWRlcjogU3RhdGVQcm92aWRlcjxUPixcbiAgICBwcml2YXRlIGRpc3BsYXlNb2RlOiBEaXNwbGF5TW9kZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsXG4gICAgcHVibGljIGNvbW1vblN0cmluZ3M6IENsckNvbW1vblN0cmluZ3NcbiAgKSB7fVxuXG4gIC8qIHJlZmVyZW5jZSB0byB0aGUgZW51bSBzbyB0aGF0IHRlbXBsYXRlIGNhbiBhY2Nlc3MgKi9cbiAgcHVibGljIFNFTEVDVElPTl9UWVBFID0gU2VsZWN0aW9uVHlwZTtcblxuICAvKipcbiAgICogRnJlZXplcyB0aGUgZGF0YWdyaWQgd2hpbGUgZGF0YSBpcyBsb2FkaW5nXG4gICAqL1xuICBwdWJsaWMgZ2V0IGxvYWRpbmcoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaXRlbXMubG9hZGluZztcbiAgfVxuXG4gIEBJbnB1dCgnY2xyRGdMb2FkaW5nJylcbiAgcHVibGljIHNldCBsb2FkaW5nKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5pdGVtcy5sb2FkaW5nID0gdmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogT3V0cHV0IGVtaXR0ZWQgd2hlbmV2ZXIgdGhlIGRhdGEgbmVlZHMgdG8gYmUgcmVmcmVzaGVkLCBiYXNlZCBvbiB1c2VyIGFjdGlvbiBvciBleHRlcm5hbCBvbmVzXG4gICAqL1xuICBAT3V0cHV0KCdjbHJEZ1JlZnJlc2gnKSBwdWJsaWMgcmVmcmVzaCA9IG5ldyBFdmVudEVtaXR0ZXI8Q2xyRGF0YWdyaWRTdGF0ZUludGVyZmFjZTxUPj4oZmFsc2UpO1xuXG4gIC8qKlxuICAgKiBQdWJsaWMgbWV0aG9kIHRvIHJlLXRyaWdnZXIgdGhlIGNvbXB1dGF0aW9uIG9mIGRpc3BsYXllZCBpdGVtcyBtYW51YWxseVxuICAgKi9cbiAgcHVibGljIGRhdGFDaGFuZ2VkKCkge1xuICAgIHRoaXMuaXRlbXMucmVmcmVzaCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFdlIGdyYWIgdGhlIHNtYXJ0IGl0ZXJhdG9yIGZyb20gcHJvamVjdGVkIGNvbnRlbnRcbiAgICovXG4gIEBDb250ZW50Q2hpbGQoQ2xyRGF0YWdyaWRJdGVtcykgcHVibGljIGl0ZXJhdG9yOiBDbHJEYXRhZ3JpZEl0ZW1zPFQ+O1xuXG4gIC8qKlxuICAgKiBBcnJheSBvZiBhbGwgc2VsZWN0ZWQgaXRlbXNcbiAgICovXG4gIEBJbnB1dCgnY2xyRGdTZWxlY3RlZCcpXG4gIHNldCBzZWxlY3RlZCh2YWx1ZTogVFtdKSB7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLnNlbGVjdGlvbi5zZWxlY3Rpb25UeXBlID0gU2VsZWN0aW9uVHlwZS5NdWx0aTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZWxlY3Rpb24uc2VsZWN0aW9uVHlwZSA9IFNlbGVjdGlvblR5cGUuTm9uZTtcbiAgICB9XG4gICAgdGhpcy5zZWxlY3Rpb24udXBkYXRlQ3VycmVudCh2YWx1ZSwgZmFsc2UpO1xuICB9XG5cbiAgQE91dHB1dCgnY2xyRGdTZWxlY3RlZENoYW5nZScpIHNlbGVjdGVkQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8VFtdPihmYWxzZSk7XG5cbiAgLyoqXG4gICAqIFNlbGVjdGVkIGl0ZW0gaW4gc2luZ2xlLXNlbGVjdCBtb2RlXG4gICAqL1xuICBASW5wdXQoJ2NsckRnU2luZ2xlU2VsZWN0ZWQnKVxuICBzZXQgc2luZ2xlU2VsZWN0ZWQodmFsdWU6IFQpIHtcbiAgICB0aGlzLnNlbGVjdGlvbi5zZWxlY3Rpb25UeXBlID0gU2VsZWN0aW9uVHlwZS5TaW5nbGU7XG4gICAgLy8gdGhlIGNsckRnU2luZ2xlU2VsZWN0ZWQgaXMgdXBkYXRlZCBpbiBvbmUgb2YgdHdvIGNhc2VzOlxuICAgIC8vIDEuIGFuIGV4cGxpY2l0IHZhbHVlIGlzIHBhc3NlZFxuICAgIC8vIDIuIGlzIGJlaW5nIHNldCB0byBudWxsIG9yIHVuZGVmaW5lZCwgd2hlcmUgcHJldmlvdXNseSBpdCBoYWQgYSB2YWx1ZVxuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdGhpcy5zZWxlY3Rpb24uY3VycmVudFNpbmdsZSA9IHZhbHVlO1xuICAgIH0gZWxzZSBpZiAodGhpcy5zZWxlY3Rpb24uY3VycmVudFNpbmdsZSkge1xuICAgICAgdGhpcy5zZWxlY3Rpb24uY3VycmVudFNpbmdsZSA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgQE91dHB1dCgnY2xyRGdTaW5nbGVTZWxlY3RlZENoYW5nZScpIHNpbmdsZVNlbGVjdGVkQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8VD4oZmFsc2UpO1xuXG4gIC8qKlxuICAgKiBTZWxlY3Rpb24vRGVzZWxlY3Rpb24gb24gcm93IGNsaWNrIG1vZGVcbiAgICovXG4gIEBJbnB1dCgnY2xyRGdSb3dTZWxlY3Rpb24nKVxuICBzZXQgcm93U2VsZWN0aW9uTW9kZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuc2VsZWN0aW9uLnJvd1NlbGVjdGlvbk1vZGUgPSB2YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgaWYgYWxsIGN1cnJlbnRseSBkaXNwbGF5ZWQgaXRlbXMgYXJlIHNlbGVjdGVkXG4gICAqL1xuICBwdWJsaWMgZ2V0IGFsbFNlbGVjdGVkKCkge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdGlvbi5pc0FsbFNlbGVjdGVkKCk7XG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0cy9kZXNlbGVjdHMgYWxsIGN1cnJlbnRseSBkaXNwbGF5ZWQgaXRlbXNcbiAgICogQHBhcmFtIHZhbHVlXG4gICAqL1xuICBwdWJsaWMgc2V0IGFsbFNlbGVjdGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgLypcbiAgICAgICAgICogVGhpcyBpcyBhIHNldHRlciBidXQgd2UgaWdub3JlIHRoZSB2YWx1ZS5cbiAgICAgICAgICogSXQncyBzdHJhbmdlLCBidXQgaXQgbGV0cyB1cyBoYXZlIGFuIGluZGV0ZXJtaW5hdGUgc3RhdGUgd2hlcmUgb25seVxuICAgICAgICAgKiBzb21lIG9mIHRoZSBpdGVtcyBhcmUgc2VsZWN0ZWQuXG4gICAgICAgICAqL1xuICAgIHRoaXMuc2VsZWN0aW9uLnRvZ2dsZUFsbCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEN1c3RvbSBwbGFjZWhvbGRlciBkZXRlY3Rpb25cbiAgICovXG4gIEBDb250ZW50Q2hpbGQoQ2xyRGF0YWdyaWRQbGFjZWhvbGRlcikgcHVibGljIHBsYWNlaG9sZGVyOiBDbHJEYXRhZ3JpZFBsYWNlaG9sZGVyPFQ+O1xuXG4gIC8qKlxuICAgKiBIaWRlYWJsZSBDb2x1bW4gZGF0YSBzb3VyY2UgLyBkZXRlY3Rpb24uXG4gICAqL1xuICBAQ29udGVudENoaWxkcmVuKENsckRhdGFncmlkQ29sdW1uKSBwdWJsaWMgY29sdW1uczogUXVlcnlMaXN0PENsckRhdGFncmlkQ29sdW1uPFQ+PjtcblxuICAvKipcbiAgICogV2hlbiB0aGUgZGF0YWdyaWQgaXMgdXNlci1tYW5hZ2VkIHdpdGhvdXQgdGhlIHNtYXJ0IGl0ZXJhdG9yLCB3ZSBnZXQgdGhlIGl0ZW1zIGRpc3BsYXllZFxuICAgKiBieSBxdWVyeWluZyB0aGUgcHJvamVjdGVkIGNvbnRlbnQuIFRoaXMgaXMgbmVlZGVkIHRvIGtlZXAgdHJhY2sgb2YgdGhlIG1vZGVscyBjdXJyZW50bHlcbiAgICogZGlzcGxheWVkLCB0eXBpY2FsbHkgZm9yIHNlbGVjdGlvbi5cbiAgICovXG5cbiAgQENvbnRlbnRDaGlsZHJlbihDbHJEYXRhZ3JpZFJvdykgcm93czogUXVlcnlMaXN0PENsckRhdGFncmlkUm93PFQ+PjtcbiAgQFZpZXdDaGlsZCgnc2Nyb2xsYWJsZUNvbHVtbnMnLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYgfSlcbiAgc2Nyb2xsYWJsZUNvbHVtbnM6IFZpZXdDb250YWluZXJSZWY7XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIGlmICghdGhpcy5pdGVtcy5zbWFydCkge1xuICAgICAgdGhpcy5pdGVtcy5hbGwgPSB0aGlzLnJvd3MubWFwKChyb3c6IENsckRhdGFncmlkUm93PFQ+KSA9PiByb3cuaXRlbSk7XG4gICAgfVxuXG4gICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5yb3dzLmNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLml0ZW1zLnNtYXJ0KSB7XG4gICAgICAgICAgdGhpcy5pdGVtcy5hbGwgPSB0aGlzLnJvd3MubWFwKChyb3c6IENsckRhdGFncmlkUm93PFQ+KSA9PiByb3cuaXRlbSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yb3dzLmZvckVhY2gocm93ID0+IHtcbiAgICAgICAgICB0aGlzLl9kaXNwbGF5ZWRSb3dzLmluc2VydChyb3cuX3ZpZXcpO1xuICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMuY29sdW1ucy5jaGFuZ2VzLnN1YnNjcmliZSgoY29sdW1uczogQ2xyRGF0YWdyaWRDb2x1bW48VD5bXSkgPT4ge1xuICAgICAgICB0aGlzLmNvbHVtblNlcnZpY2UudXBkYXRlQ29sdW1uTGlzdCh0aGlzLmNvbHVtbnMubWFwKGNvbCA9PiBjb2wuaGlkZWFibGUpKTtcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIC8vIEdldCBDb2x1bW5TZXJ2aWNlIHJlYWR5IGZvciBIaWRlYWJsZUNvbHVtbnMuXG4gICAgdGhpcy5jb2x1bW5TZXJ2aWNlLnVwZGF0ZUNvbHVtbkxpc3QodGhpcy5jb2x1bW5zLm1hcChjb2wgPT4gY29sLmhpZGVhYmxlKSk7XG4gIH1cblxuICAvKipcbiAgICogT3VyIHNldHVwIGhhcHBlbnMgaW4gdGhlIHZpZXcgb2Ygc29tZSBvZiBvdXIgY29tcG9uZW50cywgc28gd2Ugd2FpdCBmb3IgaXQgdG8gYmUgZG9uZSBiZWZvcmUgc3RhcnRpbmdcbiAgICovXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAvLyBUT0RPOiBkZXRlcm1pbmUgaWYgd2UgY2FuIGdldCByaWQgb2YgcHJvdmlkZXIgd2lyaW5nIGluIHZpZXcgaW5pdCBzbyB0aGF0IHN1YnNjcmlwdGlvbnMgY2FuIGJlIGRvbmUgZWFybGllclxuICAgIHRoaXMucmVmcmVzaC5lbWl0KHRoaXMuc3RhdGVQcm92aWRlci5zdGF0ZSk7XG4gICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5wdXNoKHRoaXMuc3RhdGVQcm92aWRlci5jaGFuZ2Uuc3Vic2NyaWJlKHN0YXRlID0+IHRoaXMucmVmcmVzaC5lbWl0KHN0YXRlKSkpO1xuICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMuc2VsZWN0aW9uLmNoYW5nZS5zdWJzY3JpYmUocyA9PiB7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGlvbi5zZWxlY3Rpb25UeXBlID09PSBTZWxlY3Rpb25UeXBlLlNpbmdsZSkge1xuICAgICAgICAgIHRoaXMuc2luZ2xlU2VsZWN0ZWRDaGFuZ2VkLmVtaXQoPFQ+cyk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zZWxlY3Rpb24uc2VsZWN0aW9uVHlwZSA9PT0gU2VsZWN0aW9uVHlwZS5NdWx0aSkge1xuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDaGFuZ2VkLmVtaXQoPFRbXT5zKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICAgIC8vIEEgc3Vic2NyaXB0aW9uIHRoYXQgbGlzdGVucyBmb3IgZGlzcGxheU1vZGUgY2hhbmdlcyBvbiB0aGUgZGF0YWdyaWRcbiAgICB0aGlzLmRpc3BsYXlNb2RlLnZpZXcuc3Vic2NyaWJlKHZpZXdDaGFuZ2UgPT4ge1xuICAgICAgLy8gUmVtb3ZlIGFueSBwcm9qZWN0ZWQgY29sdW1ucyBmcm9tIHRoZSBwcm9qZWN0ZWREaXNwbGF5Q29sdW1ucyBjb250YWluZXJcbiAgICAgIGZvciAobGV0IGkgPSB0aGlzLl9wcm9qZWN0ZWREaXNwbGF5Q29sdW1ucy5sZW5ndGg7IGkgPiAwOyBpLS0pIHtcbiAgICAgICAgdGhpcy5fcHJvamVjdGVkRGlzcGxheUNvbHVtbnMuZGV0YWNoKCk7XG4gICAgICB9XG4gICAgICAvLyBSZW1vdmUgYW55IHByb2plY3RlZCBjb2x1bW5zIGZyb20gdGhlIHByb2plY3RlZENhbGN1bGF0aW9uQ29sdW1ucyBjb250YWluZXJcbiAgICAgIGZvciAobGV0IGkgPSB0aGlzLl9wcm9qZWN0ZWRDYWxjdWxhdGlvbkNvbHVtbnMubGVuZ3RoOyBpID4gMDsgaS0tKSB7XG4gICAgICAgIHRoaXMuX3Byb2plY3RlZENhbGN1bGF0aW9uQ29sdW1ucy5kZXRhY2goKTtcbiAgICAgIH1cbiAgICAgIC8vIFJlbW92ZSBhbnkgcHJvamVjdGVkIHJvd3MgZnJvbSB0aGUgY2FsY3VsYXRpb25Sb3dzIGNvbnRhaW5lclxuICAgICAgZm9yIChsZXQgaSA9IHRoaXMuX2NhbGN1bGF0aW9uUm93cy5sZW5ndGg7IGkgPiAwOyBpLS0pIHtcbiAgICAgICAgdGhpcy5fY2FsY3VsYXRpb25Sb3dzLmRldGFjaCgpO1xuICAgICAgfVxuICAgICAgLy8gUmVtb3ZlIGFueSBwcm9qZWN0ZWQgcm93cyBmcm9tIHRoZSBkaXNwbGF5ZWRSb3dzIGNvbnRhaW5lclxuICAgICAgZm9yIChsZXQgaSA9IHRoaXMuX2Rpc3BsYXllZFJvd3MubGVuZ3RoOyBpID4gMDsgaS0tKSB7XG4gICAgICAgIHRoaXMuX2Rpc3BsYXllZFJvd3MuZGV0YWNoKCk7XG4gICAgICB9XG4gICAgICBpZiAodmlld0NoYW5nZSA9PT0gRGF0YWdyaWREaXNwbGF5TW9kZS5ESVNQTEFZKSB7XG4gICAgICAgIC8vIFNldCBzdGF0ZSwgc3R5bGUgZm9yIHRoZSBkYXRhZ3JpZCB0byBESVNQTEFZIGFuZCBpbnNlcnQgcm93ICYgY29sdW1ucyBpbnRvIGNvbnRhaW5lcnNcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdkYXRhZ3JpZC1jYWxjdWxhdGUtbW9kZScpO1xuICAgICAgICB0aGlzLmNvbHVtbnMuZm9yRWFjaChjb2x1bW4gPT4ge1xuICAgICAgICAgIHRoaXMuX3Byb2plY3RlZERpc3BsYXlDb2x1bW5zLmluc2VydChjb2x1bW4uX3ZpZXcpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5yb3dzLmZvckVhY2gocm93ID0+IHtcbiAgICAgICAgICB0aGlzLl9kaXNwbGF5ZWRSb3dzLmluc2VydChyb3cuX3ZpZXcpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFNldCBzdGF0ZSwgc3R5bGUgZm9yIHRoZSBkYXRhZ3JpZCB0byBDQUxDVUxBVEUgYW5kIGluc2VydCByb3cgJiBjb2x1bW5zIGludG8gY29udGFpbmVyc1xuICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2RhdGFncmlkLWNhbGN1bGF0ZS1tb2RlJyk7XG4gICAgICAgIHRoaXMuY29sdW1ucy5mb3JFYWNoKGNvbHVtbiA9PiB7XG4gICAgICAgICAgdGhpcy5fcHJvamVjdGVkQ2FsY3VsYXRpb25Db2x1bW5zLmluc2VydChjb2x1bW4uX3ZpZXcpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5yb3dzLmZvckVhY2gocm93ID0+IHtcbiAgICAgICAgICB0aGlzLl9jYWxjdWxhdGlvblJvd3MuaW5zZXJ0KHJvdy5fdmlldyk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFN1YnNjcmlwdGlvbnMgdG8gYWxsIHRoZSBzZXJ2aWNlcyBhbmQgcXVlcmllcyBjaGFuZ2VzXG4gICAqL1xuICBwcml2YXRlIF9zdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMuZm9yRWFjaCgoc3ViOiBTdWJzY3JpcHRpb24pID0+IHN1Yi51bnN1YnNjcmliZSgpKTtcbiAgfVxuXG4gIHJlc2l6ZSgpOiB2b2lkIHtcbiAgICB0aGlzLm9yZ2FuaXplci5yZXNpemUoKTtcbiAgfVxuXG4gIEBWaWV3Q2hpbGQoJ3Byb2plY3RlZERpc3BsYXlDb2x1bW5zJywgeyByZWFkOiBWaWV3Q29udGFpbmVyUmVmIH0pXG4gIF9wcm9qZWN0ZWREaXNwbGF5Q29sdW1uczogVmlld0NvbnRhaW5lclJlZjtcbiAgQFZpZXdDaGlsZCgncHJvamVjdGVkQ2FsY3VsYXRpb25Db2x1bW5zJywgeyByZWFkOiBWaWV3Q29udGFpbmVyUmVmIH0pXG4gIF9wcm9qZWN0ZWRDYWxjdWxhdGlvbkNvbHVtbnM6IFZpZXdDb250YWluZXJSZWY7XG4gIEBWaWV3Q2hpbGQoJ2Rpc3BsYXllZFJvd3MnLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYgfSlcbiAgX2Rpc3BsYXllZFJvd3M6IFZpZXdDb250YWluZXJSZWY7XG4gIEBWaWV3Q2hpbGQoJ2NhbGN1bGF0aW9uUm93cycsIHsgcmVhZDogVmlld0NvbnRhaW5lclJlZiB9KVxuICBfY2FsY3VsYXRpb25Sb3dzOiBWaWV3Q29udGFpbmVyUmVmO1xufVxuIl19