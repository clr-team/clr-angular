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
import { Component, ContentChildren, ElementRef, EventEmitter, Input, Output, QueryList, Renderer2, ViewChild, ViewContainerRef, } from '@angular/core';
import { combineLatest } from 'rxjs';
import { Expand } from '../../utils/expand/providers/expand';
import { HostWrapper } from '../../utils/host-wrapping/host-wrapper';
import { LoadingListener } from '../../utils/loading/loading-listener';
import { ClrDatagridCell } from './datagrid-cell';
import { DatagridDisplayMode } from './enums/display-mode.enum';
import { DisplayModeService } from './providers/display-mode.service';
import { ExpandableRowsCount } from './providers/global-expandable-rows';
import { HideableColumnService } from './providers/hideable-column.service';
import { RowActionService } from './providers/row-action-service';
import { Selection, SelectionType } from './providers/selection';
import { WrappedRow } from './wrapped-row';
import { ClrCommonStrings } from '../../utils/i18n/common-strings.interface';
/** @type {?} */
var nbRow = 0;
/**
 * @template T
 */
var ClrDatagridRow = /** @class */ (function () {
    function ClrDatagridRow(selection, rowActionService, globalExpandable, expand, hideableColumnService, displayMode, vcr, renderer, el, commonStrings) {
        var _this = this;
        this.selection = selection;
        this.rowActionService = rowActionService;
        this.globalExpandable = globalExpandable;
        this.expand = expand;
        this.hideableColumnService = hideableColumnService;
        this.displayMode = displayMode;
        this.vcr = vcr;
        this.renderer = renderer;
        this.el = el;
        this.commonStrings = commonStrings;
        /* reference to the enum so that template can access */
        this.SELECTION_TYPE = SelectionType;
        this._selected = false;
        this.selectedChanged = new EventEmitter(false);
        this.expandedChange = new EventEmitter(false);
        this.subscriptions = [];
        this.displayCells = false;
        nbRow++;
        this.id = 'clr-dg-row' + nbRow;
        this.radioId = 'clr-dg-row-rd' + nbRow;
        this.subscriptions.push(combineLatest(this.expand.replace, this.expand.expandChange).subscribe(function (_a) {
            var _b = tslib_1.__read(_a, 2), expandReplaceValue = _b[0], expandChangeValue = _b[1];
            if (expandReplaceValue && expandChangeValue) {
                // replaced and expanding
                _this.replaced = true;
                _this.renderer.addClass(_this.el.nativeElement, 'datagrid-row-replaced');
            }
            else {
                _this.replaced = false;
                // Handles these cases: not replaced and collapsing & replaced and
                // collapsing and not replaced and expanding.
                _this.renderer.removeClass(_this.el.nativeElement, 'datagrid-row-replaced');
            }
        }));
    }
    Object.defineProperty(ClrDatagridRow.prototype, "selected", {
        /**
         * Indicates if the row is selected
         */
        get: /**
         * Indicates if the row is selected
         * @return {?}
         */
        function () {
            if (this.selection.selectionType === SelectionType.None) {
                return this._selected;
            }
            else {
                return this.selection.isSelected(this.item);
            }
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (this.selection.selectionType === SelectionType.None) {
                this._selected = value;
            }
            else {
                this.selection.setSelected(this.item, value);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?=} selected
     * @return {?}
     */
    ClrDatagridRow.prototype.toggle = /**
     * @param {?=} selected
     * @return {?}
     */
    function (selected) {
        if (selected === void 0) { selected = !this.selected; }
        if (selected !== this.selected) {
            this.selected = selected;
            this.selectedChanged.emit(selected);
        }
    };
    Object.defineProperty(ClrDatagridRow.prototype, "expanded", {
        get: /**
         * @return {?}
         */
        function () {
            return this.expand.expanded;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.expand.expanded = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ClrDatagridRow.prototype.toggleExpand = /**
     * @return {?}
     */
    function () {
        if (this.expand.expandable) {
            this.expanded = !this.expanded;
            this.expandedChange.emit(this.expanded);
        }
    };
    /**
     * @return {?}
     */
    ClrDatagridRow.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // Make sure things get started
        /** @type {?} */
        var columnsList = this.hideableColumnService.getColumns();
        this.updateCellsForColumns(columnsList);
        // Triggered when the Cells list changes per row-renderer
        this.dgCells.changes.subscribe(function (cellList) {
            /** @type {?} */
            var columnList = _this.hideableColumnService.getColumns();
            if (cellList.length === columnList.length) {
                _this.updateCellsForColumns(columnList);
            }
        });
        // Used to set things up the first time but only after all the columns are ready.
        this.subscriptions.push(this.hideableColumnService.columnListChange.subscribe(function (columnList) {
            // Prevents cell updates when cols and cells array are not aligned - only seems to run on init / first time.
            if (columnList.length === _this.dgCells.length) {
                _this.updateCellsForColumns(columnList);
            }
        }));
    };
    /**
     * @return {?}
     */
    ClrDatagridRow.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.subscriptions.push(this.displayMode.view.subscribe(function (viewChange) {
            // Listen for view changes and move cells around depending on the current displayType
            // remove cell views from display view
            for (var i = _this._scrollableCells.length; i > 0; i--) {
                _this._scrollableCells.detach();
            }
            // remove cell views from calculated view
            for (var i = _this._calculatedCells.length; i > 0; i--) {
                _this._calculatedCells.detach();
            }
            if (viewChange === DatagridDisplayMode.CALCULATE) {
                _this.displayCells = false;
                _this.dgCells.forEach(function (cell) {
                    _this._calculatedCells.insert(cell._view);
                });
            }
            else {
                _this.displayCells = true;
                _this.dgCells.forEach(function (cell) {
                    _this._scrollableCells.insert(cell._view);
                });
            }
        }));
    };
    /**********
     *
     * @description
     * 1. Maps the new columnListChange to the dgCells list by index
     * 2. Sets the hidden state on the cell
     * Take a Column list and use index to access the columns for hideable properties.
     *
     */
    /**
     * *******
     *
     * \@description
     * 1. Maps the new columnListChange to the dgCells list by index
     * 2. Sets the hidden state on the cell
     * Take a Column list and use index to access the columns for hideable properties.
     *
     * @param {?} columnList
     * @return {?}
     */
    ClrDatagridRow.prototype.updateCellsForColumns = /**
     * *******
     *
     * \@description
     * 1. Maps the new columnListChange to the dgCells list by index
     * 2. Sets the hidden state on the cell
     * Take a Column list and use index to access the columns for hideable properties.
     *
     * @param {?} columnList
     * @return {?}
     */
    function (columnList) {
        // Map cells to columns with Array.index
        this.dgCells.forEach(function (cell, index) {
            /** @type {?} */
            var currentColumn = columnList[index];
            if (currentColumn) {
                cell.id = currentColumn.id;
            }
        });
    };
    /**
     * @return {?}
     */
    ClrDatagridRow.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    /**
     * @return {?}
     */
    ClrDatagridRow.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.wrappedInjector = new HostWrapper(WrappedRow, this.vcr);
    };
    Object.defineProperty(ClrDatagridRow.prototype, "_view", {
        get: /**
         * @return {?}
         */
        function () {
            return this.wrappedInjector.get(WrappedRow, this.vcr).rowView;
        },
        enumerable: true,
        configurable: true
    });
    ClrDatagridRow.decorators = [
        { type: Component, args: [{
                    selector: 'clr-dg-row',
                    template: "<!--\n  We need to wrap the #rowContent in label element if we are in rowSelectionMode.\n  Clicking of that wrapper label will equate to clicking on the whole row, which triggers the checkbox to toggle.\n-->\n<label class=\"datagrid-row-clickable\" *ngIf=\"selection.rowSelectionMode\">\n  <ng-template [ngTemplateOutlet]=\"rowContent\"></ng-template>\n</label>\n\n<ng-template *ngIf=\"!selection.rowSelectionMode\" [ngTemplateOutlet]=\"rowContent\"></ng-template>\n\n<!--\n    We need the \"project into template\" hacks because we need this in 2 different places\n    depending on whether the details replace the row or not.\n-->\n<ng-template #detail>\n  <ng-content select=\"clr-dg-row-detail\"></ng-content>\n</ng-template>\n\n<ng-template #rowContent>\n  <div role=\"row\" [id]=\"id\" class=\"datagrid-row-master datagrid-row-flex\">\n    <div class=\"datagrid-row-sticky\">\n      <!-- Sticky elements here -->\n      <ng-container #stickyCells></ng-container> <!-- placeholder for projecting other sticky cells as pinned-->\n    </div>\n    <div class=\"datagrid-row-scrollable\" [ngClass]=\"{'is-replaced': replaced && expanded}\">\n      <div class=\"datagrid-scrolling-cells\">\n        <div *ngIf=\"selection.selectionType === SELECTION_TYPE.Multi\"\n             class=\"datagrid-select datagrid-fixed-column datagrid-cell\">\n          <input clrCheckbox type=\"checkbox\" [ngModel]=\"selected\" (ngModelChange)=\"toggle($event)\"\n                 [attr.aria-label]=\"commonStrings.select\">\n        </div>\n        <div *ngIf=\"selection.selectionType === SELECTION_TYPE.Single\"\n             class=\"datagrid-select datagrid-fixed-column datagrid-cell\">\n          <div class=\"radio\">\n            <!-- TODO: it would be better if in addition to the generic \"Select\" label, we could add aria-labelledby\n            to label the radio by the first cell in the row (typically an id or name).\n            It's pretty easy to label it with the whole row since we already have an id for it, but in most\n            cases the row is far too long to serve as a label, the screenreader reads every single cell content. -->\n            <input type=\"radio\" [id]=\"radioId\" [name]=\"selection.id + '-radio'\" [value]=\"item\"\n                   [(ngModel)]=\"selection.currentSingle\" [checked]=\"selection.currentSingle === item\"\n                   [attr.aria-label]=\"commonStrings.select\">\n            <label for=\"{{radioId}}\"></label>\n          </div>\n        </div>\n        <div *ngIf=\"rowActionService.hasActionableRow\"\n             class=\"datagrid-row-actions datagrid-fixed-column datagrid-cell\">\n          <ng-content select=\"clr-dg-action-overflow\"></ng-content>\n        </div>\n        <div *ngIf=\"globalExpandable.hasExpandableRow\"\n             class=\"datagrid-expandable-caret datagrid-fixed-column datagrid-cell\">\n          <ng-container *ngIf=\"expand.expandable\">\n            <button (click)=\"toggleExpand()\" *ngIf=\"!expand.loading\" type=\"button\" class=\"datagrid-expandable-caret-button\">\n              <clr-icon shape=\"caret\"\n                        class=\"datagrid-expandable-caret-icon\"\n                        [attr.dir]=\"expand.expanded ? 'down' : 'right'\"\n                        [attr.title]=\"expand.expanded ? commonStrings.collapse : commonStrings.expand\"></clr-icon>\n            </button>\n            <div class=\"spinner spinner-sm\" *ngIf=\"expand.loading\"></div>\n          </ng-container>\n        </div>\n        <ng-container #scrollableCells></ng-container>\n      </div>\n      <!-- details here when replace, re-visit when sticky container is used for pinned cells -->\n      <ng-template *ngIf=\"replaced && !expand.loading\"\n                   [ngTemplateOutlet]=\"detail\"></ng-template>\n    </div>\n    <ng-template *ngIf=\"!replaced && !expand.loading\"\n                 [ngTemplateOutlet]=\"detail\"></ng-template>\n  </div>\n</ng-template>\n\n<ng-container #calculatedCells></ng-container>\n",
                    host: {
                        '[class.datagrid-row]': 'true',
                        '[class.datagrid-selected]': 'selected',
                        '[attr.aria-owns]': 'id',
                        role: 'rowgroup',
                    },
                    providers: [Expand, { provide: LoadingListener, useExisting: Expand }]
                }] }
    ];
    /** @nocollapse */
    ClrDatagridRow.ctorParameters = function () { return [
        { type: Selection },
        { type: RowActionService },
        { type: ExpandableRowsCount },
        { type: Expand },
        { type: HideableColumnService },
        { type: DisplayModeService },
        { type: ViewContainerRef },
        { type: Renderer2 },
        { type: ElementRef },
        { type: ClrCommonStrings }
    ]; };
    ClrDatagridRow.propDecorators = {
        item: [{ type: Input, args: ['clrDgItem',] }],
        selected: [{ type: Input, args: ['clrDgSelected',] }],
        selectedChanged: [{ type: Output, args: ['clrDgSelectedChange',] }],
        expanded: [{ type: Input, args: ['clrDgExpanded',] }],
        expandedChange: [{ type: Output, args: ['clrDgExpandedChange',] }],
        dgCells: [{ type: ContentChildren, args: [ClrDatagridCell,] }],
        _stickyCells: [{ type: ViewChild, args: ['stickyCells', { read: ViewContainerRef },] }],
        _scrollableCells: [{ type: ViewChild, args: ['scrollableCells', { read: ViewContainerRef },] }],
        _calculatedCells: [{ type: ViewChild, args: ['calculatedCells', { read: ViewContainerRef },] }]
    };
    return ClrDatagridRow;
}());
export { ClrDatagridRow };
if (false) {
    /** @type {?} */
    ClrDatagridRow.prototype.id;
    /** @type {?} */
    ClrDatagridRow.prototype.radioId;
    /** @type {?} */
    ClrDatagridRow.prototype.SELECTION_TYPE;
    /**
     * Model of the row, to use for selection
     * @type {?}
     */
    ClrDatagridRow.prototype.item;
    /** @type {?} */
    ClrDatagridRow.prototype.replaced;
    /** @type {?} */
    ClrDatagridRow.prototype._selected;
    /** @type {?} */
    ClrDatagridRow.prototype.selectedChanged;
    /** @type {?} */
    ClrDatagridRow.prototype.expandedChange;
    /**
     * **
     * property dgCells
     *
     * \@description
     * A Query List of the ClrDatagrid cells in this row.
     *
     * @type {?}
     */
    ClrDatagridRow.prototype.dgCells;
    /** @type {?} */
    ClrDatagridRow.prototype.subscriptions;
    /** @type {?} */
    ClrDatagridRow.prototype.displayCells;
    /** @type {?} */
    ClrDatagridRow.prototype._stickyCells;
    /** @type {?} */
    ClrDatagridRow.prototype._scrollableCells;
    /** @type {?} */
    ClrDatagridRow.prototype._calculatedCells;
    /** @type {?} */
    ClrDatagridRow.prototype.wrappedInjector;
    /** @type {?} */
    ClrDatagridRow.prototype.selection;
    /** @type {?} */
    ClrDatagridRow.prototype.rowActionService;
    /** @type {?} */
    ClrDatagridRow.prototype.globalExpandable;
    /** @type {?} */
    ClrDatagridRow.prototype.expand;
    /** @type {?} */
    ClrDatagridRow.prototype.hideableColumnService;
    /** @type {?} */
    ClrDatagridRow.prototype.displayMode;
    /** @type {?} */
    ClrDatagridRow.prototype.vcr;
    /** @type {?} */
    ClrDatagridRow.prototype.renderer;
    /** @type {?} */
    ClrDatagridRow.prototype.el;
    /** @type {?} */
    ClrDatagridRow.prototype.commonStrings;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtcm93LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9kYXRhZ3JpZC1yb3cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQU1BLE9BQU8sRUFHTCxTQUFTLEVBQ1QsZUFBZSxFQUNmLFVBQVUsRUFDVixZQUFZLEVBRVosS0FBSyxFQUNMLE1BQU0sRUFDTixTQUFTLEVBQ1QsU0FBUyxFQUNULFNBQVMsRUFDVCxnQkFBZ0IsR0FDakIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGFBQWEsRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFFbkQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzdELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFFdkUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRWxELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzVFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxTQUFTLEVBQUUsYUFBYSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDakUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQzs7SUFFekUsS0FBSyxHQUFXLENBQUM7Ozs7QUFFckI7SUF5QkUsd0JB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QUFrQzs7SUE5S2hDLG1DQUE4Qjs7SUFDOUIsMENBQXlDOztJQUN6QywwQ0FBNEM7O0lBQzVDLGdDQUFxQjs7SUFDckIsK0NBQW1EOztJQUNuRCxxQ0FBdUM7O0lBQ3ZDLDZCQUE2Qjs7SUFDN0Isa0NBQTJCOztJQUMzQiw0QkFBc0I7O0lBQ3RCLHVDQUFzQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5qZWN0b3IsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIFF1ZXJ5TGlzdCxcbiAgUmVuZGVyZXIyLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdDb250YWluZXJSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgY29tYmluZUxhdGVzdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IEV4cGFuZCB9IGZyb20gJy4uLy4uL3V0aWxzL2V4cGFuZC9wcm92aWRlcnMvZXhwYW5kJztcbmltcG9ydCB7IEhvc3RXcmFwcGVyIH0gZnJvbSAnLi4vLi4vdXRpbHMvaG9zdC13cmFwcGluZy9ob3N0LXdyYXBwZXInO1xuaW1wb3J0IHsgTG9hZGluZ0xpc3RlbmVyIH0gZnJvbSAnLi4vLi4vdXRpbHMvbG9hZGluZy9sb2FkaW5nLWxpc3RlbmVyJztcblxuaW1wb3J0IHsgQ2xyRGF0YWdyaWRDZWxsIH0gZnJvbSAnLi9kYXRhZ3JpZC1jZWxsJztcbmltcG9ydCB7IERhdGFncmlkSGlkZWFibGVDb2x1bW5Nb2RlbCB9IGZyb20gJy4vZGF0YWdyaWQtaGlkZWFibGUtY29sdW1uLm1vZGVsJztcbmltcG9ydCB7IERhdGFncmlkRGlzcGxheU1vZGUgfSBmcm9tICcuL2VudW1zL2Rpc3BsYXktbW9kZS5lbnVtJztcbmltcG9ydCB7IERpc3BsYXlNb2RlU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2Rpc3BsYXktbW9kZS5zZXJ2aWNlJztcbmltcG9ydCB7IEV4cGFuZGFibGVSb3dzQ291bnQgfSBmcm9tICcuL3Byb3ZpZGVycy9nbG9iYWwtZXhwYW5kYWJsZS1yb3dzJztcbmltcG9ydCB7IEhpZGVhYmxlQ29sdW1uU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2hpZGVhYmxlLWNvbHVtbi5zZXJ2aWNlJztcbmltcG9ydCB7IFJvd0FjdGlvblNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9yb3ctYWN0aW9uLXNlcnZpY2UnO1xuaW1wb3J0IHsgU2VsZWN0aW9uLCBTZWxlY3Rpb25UeXBlIH0gZnJvbSAnLi9wcm92aWRlcnMvc2VsZWN0aW9uJztcbmltcG9ydCB7IFdyYXBwZWRSb3cgfSBmcm9tICcuL3dyYXBwZWQtcm93JztcbmltcG9ydCB7IENsckNvbW1vblN0cmluZ3MgfSBmcm9tICcuLi8uLi91dGlscy9pMThuL2NvbW1vbi1zdHJpbmdzLmludGVyZmFjZSc7XG5cbmxldCBuYlJvdzogbnVtYmVyID0gMDtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLWRnLXJvdycsXG4gIHRlbXBsYXRlVXJsOiAnLi9kYXRhZ3JpZC1yb3cuaHRtbCcsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmRhdGFncmlkLXJvd10nOiAndHJ1ZScsXG4gICAgJ1tjbGFzcy5kYXRhZ3JpZC1zZWxlY3RlZF0nOiAnc2VsZWN0ZWQnLFxuICAgICdbYXR0ci5hcmlhLW93bnNdJzogJ2lkJyxcbiAgICByb2xlOiAncm93Z3JvdXAnLFxuICB9LFxuICBwcm92aWRlcnM6IFtFeHBhbmQsIHsgcHJvdmlkZTogTG9hZGluZ0xpc3RlbmVyLCB1c2VFeGlzdGluZzogRXhwYW5kIH1dLFxufSlcbmV4cG9ydCBjbGFzcyBDbHJEYXRhZ3JpZFJvdzxUID0gYW55PiBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIEFmdGVyVmlld0luaXQge1xuICBwdWJsaWMgaWQ6IHN0cmluZztcbiAgcHVibGljIHJhZGlvSWQ6IHN0cmluZztcblxuICAvKiByZWZlcmVuY2UgdG8gdGhlIGVudW0gc28gdGhhdCB0ZW1wbGF0ZSBjYW4gYWNjZXNzICovXG4gIHB1YmxpYyBTRUxFQ1RJT05fVFlQRSA9IFNlbGVjdGlvblR5cGU7XG5cbiAgLyoqXG4gICAqIE1vZGVsIG9mIHRoZSByb3csIHRvIHVzZSBmb3Igc2VsZWN0aW9uXG4gICAqL1xuICBASW5wdXQoJ2NsckRnSXRlbScpIGl0ZW06IFQ7XG5cbiAgcHVibGljIHJlcGxhY2VkO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBzZWxlY3Rpb246IFNlbGVjdGlvbjxUPixcbiAgICBwdWJsaWMgcm93QWN0aW9uU2VydmljZTogUm93QWN0aW9uU2VydmljZSxcbiAgICBwdWJsaWMgZ2xvYmFsRXhwYW5kYWJsZTogRXhwYW5kYWJsZVJvd3NDb3VudCxcbiAgICBwdWJsaWMgZXhwYW5kOiBFeHBhbmQsXG4gICAgcHVibGljIGhpZGVhYmxlQ29sdW1uU2VydmljZTogSGlkZWFibGVDb2x1bW5TZXJ2aWNlLFxuICAgIHByaXZhdGUgZGlzcGxheU1vZGU6IERpc3BsYXlNb2RlU2VydmljZSxcbiAgICBwcml2YXRlIHZjcjogVmlld0NvbnRhaW5lclJlZixcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZixcbiAgICBwdWJsaWMgY29tbW9uU3RyaW5nczogQ2xyQ29tbW9uU3RyaW5nc1xuICApIHtcbiAgICBuYlJvdysrO1xuICAgIHRoaXMuaWQgPSAnY2xyLWRnLXJvdycgKyBuYlJvdztcbiAgICB0aGlzLnJhZGlvSWQgPSAnY2xyLWRnLXJvdy1yZCcgKyBuYlJvdztcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgY29tYmluZUxhdGVzdCh0aGlzLmV4cGFuZC5yZXBsYWNlLCB0aGlzLmV4cGFuZC5leHBhbmRDaGFuZ2UpLnN1YnNjcmliZShcbiAgICAgICAgKFtleHBhbmRSZXBsYWNlVmFsdWUsIGV4cGFuZENoYW5nZVZhbHVlXSkgPT4ge1xuICAgICAgICAgIGlmIChleHBhbmRSZXBsYWNlVmFsdWUgJiYgZXhwYW5kQ2hhbmdlVmFsdWUpIHtcbiAgICAgICAgICAgIC8vIHJlcGxhY2VkIGFuZCBleHBhbmRpbmdcbiAgICAgICAgICAgIHRoaXMucmVwbGFjZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdkYXRhZ3JpZC1yb3ctcmVwbGFjZWQnKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZXBsYWNlZCA9IGZhbHNlO1xuICAgICAgICAgICAgLy8gSGFuZGxlcyB0aGVzZSBjYXNlczogbm90IHJlcGxhY2VkIGFuZCBjb2xsYXBzaW5nICYgcmVwbGFjZWQgYW5kXG4gICAgICAgICAgICAvLyBjb2xsYXBzaW5nIGFuZCBub3QgcmVwbGFjZWQgYW5kIGV4cGFuZGluZy5cbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnZGF0YWdyaWQtcm93LXJlcGxhY2VkJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgX3NlbGVjdGVkID0gZmFsc2U7XG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgaWYgdGhlIHJvdyBpcyBzZWxlY3RlZFxuICAgKi9cbiAgcHVibGljIGdldCBzZWxlY3RlZCgpIHtcbiAgICBpZiAodGhpcy5zZWxlY3Rpb24uc2VsZWN0aW9uVHlwZSA9PT0gU2VsZWN0aW9uVHlwZS5Ob25lKSB7XG4gICAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnNlbGVjdGlvbi5pc1NlbGVjdGVkKHRoaXMuaXRlbSk7XG4gICAgfVxuICB9XG5cbiAgQElucHV0KCdjbHJEZ1NlbGVjdGVkJylcbiAgcHVibGljIHNldCBzZWxlY3RlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIGlmICh0aGlzLnNlbGVjdGlvbi5zZWxlY3Rpb25UeXBlID09PSBTZWxlY3Rpb25UeXBlLk5vbmUpIHtcbiAgICAgIHRoaXMuX3NlbGVjdGVkID0gdmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2VsZWN0aW9uLnNldFNlbGVjdGVkKHRoaXMuaXRlbSwgdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIEBPdXRwdXQoJ2NsckRnU2VsZWN0ZWRDaGFuZ2UnKSBzZWxlY3RlZENoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KGZhbHNlKTtcblxuICBwdWJsaWMgdG9nZ2xlKHNlbGVjdGVkID0gIXRoaXMuc2VsZWN0ZWQpIHtcbiAgICBpZiAoc2VsZWN0ZWQgIT09IHRoaXMuc2VsZWN0ZWQpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWQgPSBzZWxlY3RlZDtcbiAgICAgIHRoaXMuc2VsZWN0ZWRDaGFuZ2VkLmVtaXQoc2VsZWN0ZWQpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXQgZXhwYW5kZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZXhwYW5kLmV4cGFuZGVkO1xuICB9XG5cbiAgQElucHV0KCdjbHJEZ0V4cGFuZGVkJylcbiAgcHVibGljIHNldCBleHBhbmRlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuZXhwYW5kLmV4cGFuZGVkID0gdmFsdWU7XG4gIH1cblxuICBAT3V0cHV0KCdjbHJEZ0V4cGFuZGVkQ2hhbmdlJykgZXhwYW5kZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KGZhbHNlKTtcblxuICBwdWJsaWMgdG9nZ2xlRXhwYW5kKCkge1xuICAgIGlmICh0aGlzLmV4cGFuZC5leHBhbmRhYmxlKSB7XG4gICAgICB0aGlzLmV4cGFuZGVkID0gIXRoaXMuZXhwYW5kZWQ7XG4gICAgICB0aGlzLmV4cGFuZGVkQ2hhbmdlLmVtaXQodGhpcy5leHBhbmRlZCk7XG4gICAgfVxuICB9XG5cbiAgLyoqKioqXG4gICAqIHByb3BlcnR5IGRnQ2VsbHNcbiAgICpcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIEEgUXVlcnkgTGlzdCBvZiB0aGUgQ2xyRGF0YWdyaWQgY2VsbHMgaW4gdGhpcyByb3cuXG4gICAqXG4gICAqL1xuICBAQ29udGVudENoaWxkcmVuKENsckRhdGFncmlkQ2VsbCkgZGdDZWxsczogUXVlcnlMaXN0PENsckRhdGFncmlkQ2VsbD47XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIC8vIE1ha2Ugc3VyZSB0aGluZ3MgZ2V0IHN0YXJ0ZWRcbiAgICBjb25zdCBjb2x1bW5zTGlzdCA9IHRoaXMuaGlkZWFibGVDb2x1bW5TZXJ2aWNlLmdldENvbHVtbnMoKTtcbiAgICB0aGlzLnVwZGF0ZUNlbGxzRm9yQ29sdW1ucyhjb2x1bW5zTGlzdCk7XG5cbiAgICAvLyBUcmlnZ2VyZWQgd2hlbiB0aGUgQ2VsbHMgbGlzdCBjaGFuZ2VzIHBlciByb3ctcmVuZGVyZXJcbiAgICB0aGlzLmRnQ2VsbHMuY2hhbmdlcy5zdWJzY3JpYmUoY2VsbExpc3QgPT4ge1xuICAgICAgY29uc3QgY29sdW1uTGlzdCA9IHRoaXMuaGlkZWFibGVDb2x1bW5TZXJ2aWNlLmdldENvbHVtbnMoKTtcbiAgICAgIGlmIChjZWxsTGlzdC5sZW5ndGggPT09IGNvbHVtbkxpc3QubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMudXBkYXRlQ2VsbHNGb3JDb2x1bW5zKGNvbHVtbkxpc3QpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gVXNlZCB0byBzZXQgdGhpbmdzIHVwIHRoZSBmaXJzdCB0aW1lIGJ1dCBvbmx5IGFmdGVyIGFsbCB0aGUgY29sdW1ucyBhcmUgcmVhZHkuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLmhpZGVhYmxlQ29sdW1uU2VydmljZS5jb2x1bW5MaXN0Q2hhbmdlLnN1YnNjcmliZShjb2x1bW5MaXN0ID0+IHtcbiAgICAgICAgLy8gUHJldmVudHMgY2VsbCB1cGRhdGVzIHdoZW4gY29scyBhbmQgY2VsbHMgYXJyYXkgYXJlIG5vdCBhbGlnbmVkIC0gb25seSBzZWVtcyB0byBydW4gb24gaW5pdCAvIGZpcnN0IHRpbWUuXG4gICAgICAgIGlmIChjb2x1bW5MaXN0Lmxlbmd0aCA9PT0gdGhpcy5kZ0NlbGxzLmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMudXBkYXRlQ2VsbHNGb3JDb2x1bW5zKGNvbHVtbkxpc3QpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLmRpc3BsYXlNb2RlLnZpZXcuc3Vic2NyaWJlKHZpZXdDaGFuZ2UgPT4ge1xuICAgICAgICAvLyBMaXN0ZW4gZm9yIHZpZXcgY2hhbmdlcyBhbmQgbW92ZSBjZWxscyBhcm91bmQgZGVwZW5kaW5nIG9uIHRoZSBjdXJyZW50IGRpc3BsYXlUeXBlXG4gICAgICAgIC8vIHJlbW92ZSBjZWxsIHZpZXdzIGZyb20gZGlzcGxheSB2aWV3XG4gICAgICAgIGZvciAobGV0IGkgPSB0aGlzLl9zY3JvbGxhYmxlQ2VsbHMubGVuZ3RoOyBpID4gMDsgaS0tKSB7XG4gICAgICAgICAgdGhpcy5fc2Nyb2xsYWJsZUNlbGxzLmRldGFjaCgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHJlbW92ZSBjZWxsIHZpZXdzIGZyb20gY2FsY3VsYXRlZCB2aWV3XG4gICAgICAgIGZvciAobGV0IGkgPSB0aGlzLl9jYWxjdWxhdGVkQ2VsbHMubGVuZ3RoOyBpID4gMDsgaS0tKSB7XG4gICAgICAgICAgdGhpcy5fY2FsY3VsYXRlZENlbGxzLmRldGFjaCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2aWV3Q2hhbmdlID09PSBEYXRhZ3JpZERpc3BsYXlNb2RlLkNBTENVTEFURSkge1xuICAgICAgICAgIHRoaXMuZGlzcGxheUNlbGxzID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5kZ0NlbGxzLmZvckVhY2goY2VsbCA9PiB7XG4gICAgICAgICAgICB0aGlzLl9jYWxjdWxhdGVkQ2VsbHMuaW5zZXJ0KGNlbGwuX3ZpZXcpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuZGlzcGxheUNlbGxzID0gdHJ1ZTtcbiAgICAgICAgICB0aGlzLmRnQ2VsbHMuZm9yRWFjaChjZWxsID0+IHtcbiAgICAgICAgICAgIHRoaXMuX3Njcm9sbGFibGVDZWxscy5pbnNlcnQoY2VsbC5fdmlldyk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qKioqKioqKioqXG4gICAqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiAxLiBNYXBzIHRoZSBuZXcgY29sdW1uTGlzdENoYW5nZSB0byB0aGUgZGdDZWxscyBsaXN0IGJ5IGluZGV4XG4gICAqIDIuIFNldHMgdGhlIGhpZGRlbiBzdGF0ZSBvbiB0aGUgY2VsbFxuICAgKiBUYWtlIGEgQ29sdW1uIGxpc3QgYW5kIHVzZSBpbmRleCB0byBhY2Nlc3MgdGhlIGNvbHVtbnMgZm9yIGhpZGVhYmxlIHByb3BlcnRpZXMuXG4gICAqXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlQ2VsbHNGb3JDb2x1bW5zKGNvbHVtbkxpc3Q6IERhdGFncmlkSGlkZWFibGVDb2x1bW5Nb2RlbFtdKSB7XG4gICAgLy8gTWFwIGNlbGxzIHRvIGNvbHVtbnMgd2l0aCBBcnJheS5pbmRleFxuICAgIHRoaXMuZGdDZWxscy5mb3JFYWNoKChjZWxsLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3QgY3VycmVudENvbHVtbiA9IGNvbHVtbkxpc3RbaW5kZXhdOyAvLyBBY2NvdW50cyBmb3IgbnVsbCBzcGFjZS5cbiAgICAgIGlmIChjdXJyZW50Q29sdW1uKSB7XG4gICAgICAgIGNlbGwuaWQgPSBjdXJyZW50Q29sdW1uLmlkO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKChzdWI6IFN1YnNjcmlwdGlvbikgPT4gc3ViLnVuc3Vic2NyaWJlKCkpO1xuICB9XG5cbiAgcHVibGljIGRpc3BsYXlDZWxscyA9IGZhbHNlO1xuXG4gIEBWaWV3Q2hpbGQoJ3N0aWNreUNlbGxzJywgeyByZWFkOiBWaWV3Q29udGFpbmVyUmVmIH0pXG4gIF9zdGlja3lDZWxsczogVmlld0NvbnRhaW5lclJlZjtcbiAgQFZpZXdDaGlsZCgnc2Nyb2xsYWJsZUNlbGxzJywgeyByZWFkOiBWaWV3Q29udGFpbmVyUmVmIH0pXG4gIF9zY3JvbGxhYmxlQ2VsbHM6IFZpZXdDb250YWluZXJSZWY7XG4gIEBWaWV3Q2hpbGQoJ2NhbGN1bGF0ZWRDZWxscycsIHsgcmVhZDogVmlld0NvbnRhaW5lclJlZiB9KVxuICBfY2FsY3VsYXRlZENlbGxzOiBWaWV3Q29udGFpbmVyUmVmO1xuXG4gIHByaXZhdGUgd3JhcHBlZEluamVjdG9yOiBJbmplY3RvcjtcblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLndyYXBwZWRJbmplY3RvciA9IG5ldyBIb3N0V3JhcHBlcihXcmFwcGVkUm93LCB0aGlzLnZjcik7XG4gIH1cblxuICBwdWJsaWMgZ2V0IF92aWV3KCkge1xuICAgIHJldHVybiB0aGlzLndyYXBwZWRJbmplY3Rvci5nZXQoV3JhcHBlZFJvdywgdGhpcy52Y3IpLnJvd1ZpZXc7XG4gIH1cbn1cbiJdfQ==