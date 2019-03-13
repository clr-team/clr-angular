/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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
import { Selection } from './providers/selection';
import { WrappedRow } from './wrapped-row';
import { ClrCommonStrings } from '../../utils/i18n/common-strings.interface';
import { SelectionType } from './enums/selection-type';
/** @type {?} */
let nbRow = 0;
/**
 * @template T
 */
export class ClrDatagridRow {
    /**
     * @param {?} selection
     * @param {?} rowActionService
     * @param {?} globalExpandable
     * @param {?} expand
     * @param {?} hideableColumnService
     * @param {?} displayMode
     * @param {?} vcr
     * @param {?} renderer
     * @param {?} el
     * @param {?} commonStrings
     */
    constructor(selection, rowActionService, globalExpandable, expand, hideableColumnService, displayMode, vcr, renderer, el, commonStrings) {
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
        this.checkboxId = 'clr-dg-row-cb' + nbRow;
        this.subscriptions.push(combineLatest(this.expand.replace, this.expand.expandChange).subscribe(([expandReplaceValue, expandChangeValue]) => {
            if (expandReplaceValue && expandChangeValue) {
                // replaced and expanding
                this.replaced = true;
                this.renderer.addClass(this.el.nativeElement, 'datagrid-row-replaced');
            }
            else {
                this.replaced = false;
                // Handles these cases: not replaced and collapsing & replaced and
                // collapsing and not replaced and expanding.
                this.renderer.removeClass(this.el.nativeElement, 'datagrid-row-replaced');
            }
        }));
    }
    /**
     * Indicates if the row is selected
     * @return {?}
     */
    get selected() {
        if (this.selection.selectionType === SelectionType.None) {
            return this._selected;
        }
        else {
            return this.selection.isSelected(this.item);
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set selected(value) {
        if (this.selection.selectionType === SelectionType.None) {
            this._selected = value;
        }
        else {
            this.selection.setSelected(this.item, value);
        }
    }
    /**
     * @param {?=} selected
     * @return {?}
     */
    toggle(selected = !this.selected) {
        if (selected !== this.selected) {
            this.selected = selected;
            this.selectedChanged.emit(selected);
        }
    }
    /**
     * @return {?}
     */
    get expanded() {
        return this.expand.expanded;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set expanded(value) {
        this.expand.expanded = value;
    }
    /**
     * @return {?}
     */
    toggleExpand() {
        if (this.expand.expandable) {
            this.expanded = !this.expanded;
            this.expandedChange.emit(this.expanded);
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        // Make sure things get started
        /** @type {?} */
        const columnsList = this.hideableColumnService.getColumns();
        this.updateCellsForColumns(columnsList);
        // Triggered when the Cells list changes per row-renderer
        this.dgCells.changes.subscribe(cellList => {
            /** @type {?} */
            const columnList = this.hideableColumnService.getColumns();
            if (cellList.length === columnList.length) {
                this.updateCellsForColumns(columnList);
                this.dgCells.forEach(cell => {
                    this._scrollableCells.insert(cell._view);
                });
            }
        });
        // Used to set things up the first time but only after all the columns are ready.
        this.subscriptions.push(this.hideableColumnService.columnListChange.subscribe(columnList => {
            // Prevents cell updates when cols and cells array are not aligned - only seems to run on init / first time.
            if (columnList.length === this.dgCells.length) {
                this.updateCellsForColumns(columnList);
            }
        }));
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.subscriptions.push(this.displayMode.view.subscribe(viewChange => {
            // Listen for view changes and move cells around depending on the current displayType
            // remove cell views from display view
            for (let i = this._scrollableCells.length; i > 0; i--) {
                this._scrollableCells.detach();
            }
            // remove cell views from calculated view
            for (let i = this._calculatedCells.length; i > 0; i--) {
                this._calculatedCells.detach();
            }
            if (viewChange === DatagridDisplayMode.CALCULATE) {
                this.displayCells = false;
                this.dgCells.forEach(cell => {
                    this._calculatedCells.insert(cell._view);
                });
            }
            else {
                this.displayCells = true;
                this.dgCells.forEach(cell => {
                    this._scrollableCells.insert(cell._view);
                });
            }
        }));
    }
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
    updateCellsForColumns(columnList) {
        // Map cells to columns with Array.index
        this.dgCells.forEach((cell, index) => {
            /** @type {?} */
            const currentColumn = columnList[index];
            if (currentColumn) {
                cell.id = currentColumn.id;
            }
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.wrappedInjector = new HostWrapper(WrappedRow, this.vcr);
    }
    /**
     * @return {?}
     */
    get _view() {
        return this.wrappedInjector.get(WrappedRow, this.vcr).rowView;
    }
}
ClrDatagridRow.decorators = [
    { type: Component, args: [{
                selector: 'clr-dg-row',
                template: "<!--\n  We need to wrap the #rowContent in label element if we are in rowSelectionMode.\n  Clicking of that wrapper label will equate to clicking on the whole row, which triggers the checkbox to toggle.\n-->\n<label class=\"datagrid-row-clickable\" *ngIf=\"selection.rowSelectionMode\">\n  <ng-template [ngTemplateOutlet]=\"rowContent\"></ng-template>\n</label>\n\n<ng-template *ngIf=\"!selection.rowSelectionMode\" [ngTemplateOutlet]=\"rowContent\"></ng-template>\n\n<!--\n    We need the \"project into template\" hacks because we need this in 2 different places\n    depending on whether the details replace the row or not.\n-->\n<ng-template #detail>\n  <ng-content select=\"clr-dg-row-detail\"></ng-content>\n</ng-template>\n\n<ng-template #rowContent>\n  <div role=\"row\" [id]=\"id\" class=\"datagrid-row-master datagrid-row-flex\">\n    <div class=\"datagrid-row-sticky\">\n      <!-- Sticky elements here -->\n      <ng-container #stickyCells></ng-container> <!-- placeholder for projecting other sticky cells as pinned-->\n    </div>\n    <div class=\"datagrid-row-scrollable\" [ngClass]=\"{'is-replaced': replaced && expanded}\">\n      <div class=\"datagrid-scrolling-cells\">\n        <div *ngIf=\"selection.selectionType === SELECTION_TYPE.Multi\"\n             class=\"datagrid-select datagrid-fixed-column datagrid-cell\">\n          <input clrCheckbox type=\"checkbox\" [ngModel]=\"selected\" (ngModelChange)=\"toggle($event)\" [id]=\"checkboxId\"\n                 [attr.aria-label]=\"commonStrings.select\">\n        </div>\n        <div *ngIf=\"selection.selectionType === SELECTION_TYPE.Single\"\n             class=\"datagrid-select datagrid-fixed-column datagrid-cell\">\n            <!-- TODO: it would be better if in addition to the generic \"Select\" label, we could add aria-labelledby\n            to label the radio by the first cell in the row (typically an id or name).\n            It's pretty easy to label it with the whole row since we already have an id for it, but in most\n            cases the row is far too long to serve as a label, the screenreader reads every single cell content. -->\n            <input type=\"radio\" clrRadio [id]=\"radioId\" [name]=\"selection.id + '-radio'\" [value]=\"item\"\n                   [(ngModel)]=\"selection.currentSingle\" [checked]=\"selection.currentSingle === item\"\n                   [attr.aria-label]=\"commonStrings.select\">\n        </div>\n        <div *ngIf=\"rowActionService.hasActionableRow\"\n             class=\"datagrid-row-actions datagrid-fixed-column datagrid-cell\">\n          <ng-content select=\"clr-dg-action-overflow\"></ng-content>\n        </div>\n        <div *ngIf=\"globalExpandable.hasExpandableRow\"\n             class=\"datagrid-expandable-caret datagrid-fixed-column datagrid-cell\">\n          <ng-container *ngIf=\"expand.expandable\">\n            <button (click)=\"toggleExpand()\" *ngIf=\"!expand.loading\" type=\"button\" class=\"datagrid-expandable-caret-button\">\n              <clr-icon shape=\"caret\"\n                        class=\"datagrid-expandable-caret-icon\"\n                        [attr.dir]=\"expand.expanded ? 'down' : 'right'\"\n                        [attr.title]=\"expand.expanded ? commonStrings.collapse : commonStrings.expand\"></clr-icon>\n            </button>\n            <div class=\"spinner spinner-sm\" *ngIf=\"expand.loading\"></div>\n          </ng-container>\n        </div>\n        <ng-container #scrollableCells></ng-container>\n      </div>\n      <!-- details here when replace, re-visit when sticky container is used for pinned cells -->\n      <ng-template *ngIf=\"replaced && !expand.loading\"\n                   [ngTemplateOutlet]=\"detail\"></ng-template>\n    </div>\n    <ng-template *ngIf=\"!replaced && !expand.loading\"\n                 [ngTemplateOutlet]=\"detail\"></ng-template>\n  </div>\n</ng-template>\n\n<ng-container #calculatedCells></ng-container>\n",
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
ClrDatagridRow.ctorParameters = () => [
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
];
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
if (false) {
    /** @type {?} */
    ClrDatagridRow.prototype.id;
    /** @type {?} */
    ClrDatagridRow.prototype.radioId;
    /** @type {?} */
    ClrDatagridRow.prototype.checkboxId;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtcm93LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9kYXRhZ3JpZC1yb3cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBTUEsT0FBTyxFQUdMLFNBQVMsRUFDVCxlQUFlLEVBQ2YsVUFBVSxFQUNWLFlBQVksRUFFWixLQUFLLEVBQ0wsTUFBTSxFQUNOLFNBQVMsRUFDVCxTQUFTLEVBQ1QsU0FBUyxFQUNULGdCQUFnQixHQUNqQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsYUFBYSxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUVuRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDN0QsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUV2RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFbEQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDdEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDekUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDNUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDbEUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2xELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDN0UsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDOztJQUVuRCxL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O0lBRTVCLHNDQUMrQjs7SUFDL0IsMENBQ21DOztJQUNuQywwQ0FDbUM7O0lBRW5DLHlDQUFrQzs7SUFsTGhDLG1DQUE4Qjs7SUFDOUIsMENBQXlDOztJQUN6QywwQ0FBNEM7O0lBQzVDLGdDQUFxQjs7SUFDckIsK0NBQW1EOztJQUNuRCxxQ0FBdUM7O0lBQ3ZDLDZCQUE2Qjs7SUFDN0Isa0NBQTJCOztJQUMzQiw0QkFBc0I7O0lBQ3RCLHVDQUFzQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5qZWN0b3IsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIFF1ZXJ5TGlzdCxcbiAgUmVuZGVyZXIyLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdDb250YWluZXJSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgY29tYmluZUxhdGVzdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IEV4cGFuZCB9IGZyb20gJy4uLy4uL3V0aWxzL2V4cGFuZC9wcm92aWRlcnMvZXhwYW5kJztcbmltcG9ydCB7IEhvc3RXcmFwcGVyIH0gZnJvbSAnLi4vLi4vdXRpbHMvaG9zdC13cmFwcGluZy9ob3N0LXdyYXBwZXInO1xuaW1wb3J0IHsgTG9hZGluZ0xpc3RlbmVyIH0gZnJvbSAnLi4vLi4vdXRpbHMvbG9hZGluZy9sb2FkaW5nLWxpc3RlbmVyJztcblxuaW1wb3J0IHsgQ2xyRGF0YWdyaWRDZWxsIH0gZnJvbSAnLi9kYXRhZ3JpZC1jZWxsJztcbmltcG9ydCB7IERhdGFncmlkSGlkZWFibGVDb2x1bW5Nb2RlbCB9IGZyb20gJy4vZGF0YWdyaWQtaGlkZWFibGUtY29sdW1uLm1vZGVsJztcbmltcG9ydCB7IERhdGFncmlkRGlzcGxheU1vZGUgfSBmcm9tICcuL2VudW1zL2Rpc3BsYXktbW9kZS5lbnVtJztcbmltcG9ydCB7IERpc3BsYXlNb2RlU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2Rpc3BsYXktbW9kZS5zZXJ2aWNlJztcbmltcG9ydCB7IEV4cGFuZGFibGVSb3dzQ291bnQgfSBmcm9tICcuL3Byb3ZpZGVycy9nbG9iYWwtZXhwYW5kYWJsZS1yb3dzJztcbmltcG9ydCB7IEhpZGVhYmxlQ29sdW1uU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2hpZGVhYmxlLWNvbHVtbi5zZXJ2aWNlJztcbmltcG9ydCB7IFJvd0FjdGlvblNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9yb3ctYWN0aW9uLXNlcnZpY2UnO1xuaW1wb3J0IHsgU2VsZWN0aW9uIH0gZnJvbSAnLi9wcm92aWRlcnMvc2VsZWN0aW9uJztcbmltcG9ydCB7IFdyYXBwZWRSb3cgfSBmcm9tICcuL3dyYXBwZWQtcm93JztcbmltcG9ydCB7IENsckNvbW1vblN0cmluZ3MgfSBmcm9tICcuLi8uLi91dGlscy9pMThuL2NvbW1vbi1zdHJpbmdzLmludGVyZmFjZSc7XG5pbXBvcnQgeyBTZWxlY3Rpb25UeXBlIH0gZnJvbSAnLi9lbnVtcy9zZWxlY3Rpb24tdHlwZSc7XG5cbmxldCBuYlJvdzogbnVtYmVyID0gMDtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLWRnLXJvdycsXG4gIHRlbXBsYXRlVXJsOiAnLi9kYXRhZ3JpZC1yb3cuaHRtbCcsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmRhdGFncmlkLXJvd10nOiAndHJ1ZScsXG4gICAgJ1tjbGFzcy5kYXRhZ3JpZC1zZWxlY3RlZF0nOiAnc2VsZWN0ZWQnLFxuICAgICdbYXR0ci5hcmlhLW93bnNdJzogJ2lkJyxcbiAgICByb2xlOiAncm93Z3JvdXAnLFxuICB9LFxuICBwcm92aWRlcnM6IFtFeHBhbmQsIHsgcHJvdmlkZTogTG9hZGluZ0xpc3RlbmVyLCB1c2VFeGlzdGluZzogRXhwYW5kIH1dLFxufSlcbmV4cG9ydCBjbGFzcyBDbHJEYXRhZ3JpZFJvdzxUID0gYW55PiBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIEFmdGVyVmlld0luaXQge1xuICBwdWJsaWMgaWQ6IHN0cmluZztcbiAgcHVibGljIHJhZGlvSWQ6IHN0cmluZztcbiAgcHVibGljIGNoZWNrYm94SWQ6IHN0cmluZztcblxuICAvKiByZWZlcmVuY2UgdG8gdGhlIGVudW0gc28gdGhhdCB0ZW1wbGF0ZSBjYW4gYWNjZXNzICovXG4gIHB1YmxpYyBTRUxFQ1RJT05fVFlQRSA9IFNlbGVjdGlvblR5cGU7XG5cbiAgLyoqXG4gICAqIE1vZGVsIG9mIHRoZSByb3csIHRvIHVzZSBmb3Igc2VsZWN0aW9uXG4gICAqL1xuICBASW5wdXQoJ2NsckRnSXRlbScpIGl0ZW06IFQ7XG5cbiAgcHVibGljIHJlcGxhY2VkO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBzZWxlY3Rpb246IFNlbGVjdGlvbjxUPixcbiAgICBwdWJsaWMgcm93QWN0aW9uU2VydmljZTogUm93QWN0aW9uU2VydmljZSxcbiAgICBwdWJsaWMgZ2xvYmFsRXhwYW5kYWJsZTogRXhwYW5kYWJsZVJvd3NDb3VudCxcbiAgICBwdWJsaWMgZXhwYW5kOiBFeHBhbmQsXG4gICAgcHVibGljIGhpZGVhYmxlQ29sdW1uU2VydmljZTogSGlkZWFibGVDb2x1bW5TZXJ2aWNlLFxuICAgIHByaXZhdGUgZGlzcGxheU1vZGU6IERpc3BsYXlNb2RlU2VydmljZSxcbiAgICBwcml2YXRlIHZjcjogVmlld0NvbnRhaW5lclJlZixcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZixcbiAgICBwdWJsaWMgY29tbW9uU3RyaW5nczogQ2xyQ29tbW9uU3RyaW5nc1xuICApIHtcbiAgICBuYlJvdysrO1xuICAgIHRoaXMuaWQgPSAnY2xyLWRnLXJvdycgKyBuYlJvdztcbiAgICB0aGlzLnJhZGlvSWQgPSAnY2xyLWRnLXJvdy1yZCcgKyBuYlJvdztcbiAgICB0aGlzLmNoZWNrYm94SWQgPSAnY2xyLWRnLXJvdy1jYicgKyBuYlJvdztcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgY29tYmluZUxhdGVzdCh0aGlzLmV4cGFuZC5yZXBsYWNlLCB0aGlzLmV4cGFuZC5leHBhbmRDaGFuZ2UpLnN1YnNjcmliZShcbiAgICAgICAgKFtleHBhbmRSZXBsYWNlVmFsdWUsIGV4cGFuZENoYW5nZVZhbHVlXSkgPT4ge1xuICAgICAgICAgIGlmIChleHBhbmRSZXBsYWNlVmFsdWUgJiYgZXhwYW5kQ2hhbmdlVmFsdWUpIHtcbiAgICAgICAgICAgIC8vIHJlcGxhY2VkIGFuZCBleHBhbmRpbmdcbiAgICAgICAgICAgIHRoaXMucmVwbGFjZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdkYXRhZ3JpZC1yb3ctcmVwbGFjZWQnKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZXBsYWNlZCA9IGZhbHNlO1xuICAgICAgICAgICAgLy8gSGFuZGxlcyB0aGVzZSBjYXNlczogbm90IHJlcGxhY2VkIGFuZCBjb2xsYXBzaW5nICYgcmVwbGFjZWQgYW5kXG4gICAgICAgICAgICAvLyBjb2xsYXBzaW5nIGFuZCBub3QgcmVwbGFjZWQgYW5kIGV4cGFuZGluZy5cbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnZGF0YWdyaWQtcm93LXJlcGxhY2VkJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgX3NlbGVjdGVkID0gZmFsc2U7XG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgaWYgdGhlIHJvdyBpcyBzZWxlY3RlZFxuICAgKi9cbiAgcHVibGljIGdldCBzZWxlY3RlZCgpIHtcbiAgICBpZiAodGhpcy5zZWxlY3Rpb24uc2VsZWN0aW9uVHlwZSA9PT0gU2VsZWN0aW9uVHlwZS5Ob25lKSB7XG4gICAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnNlbGVjdGlvbi5pc1NlbGVjdGVkKHRoaXMuaXRlbSk7XG4gICAgfVxuICB9XG5cbiAgQElucHV0KCdjbHJEZ1NlbGVjdGVkJylcbiAgcHVibGljIHNldCBzZWxlY3RlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIGlmICh0aGlzLnNlbGVjdGlvbi5zZWxlY3Rpb25UeXBlID09PSBTZWxlY3Rpb25UeXBlLk5vbmUpIHtcbiAgICAgIHRoaXMuX3NlbGVjdGVkID0gdmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2VsZWN0aW9uLnNldFNlbGVjdGVkKHRoaXMuaXRlbSwgdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIEBPdXRwdXQoJ2NsckRnU2VsZWN0ZWRDaGFuZ2UnKSBzZWxlY3RlZENoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KGZhbHNlKTtcblxuICBwdWJsaWMgdG9nZ2xlKHNlbGVjdGVkID0gIXRoaXMuc2VsZWN0ZWQpIHtcbiAgICBpZiAoc2VsZWN0ZWQgIT09IHRoaXMuc2VsZWN0ZWQpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWQgPSBzZWxlY3RlZDtcbiAgICAgIHRoaXMuc2VsZWN0ZWRDaGFuZ2VkLmVtaXQoc2VsZWN0ZWQpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXQgZXhwYW5kZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZXhwYW5kLmV4cGFuZGVkO1xuICB9XG5cbiAgQElucHV0KCdjbHJEZ0V4cGFuZGVkJylcbiAgcHVibGljIHNldCBleHBhbmRlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuZXhwYW5kLmV4cGFuZGVkID0gdmFsdWU7XG4gIH1cblxuICBAT3V0cHV0KCdjbHJEZ0V4cGFuZGVkQ2hhbmdlJykgZXhwYW5kZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KGZhbHNlKTtcblxuICBwdWJsaWMgdG9nZ2xlRXhwYW5kKCkge1xuICAgIGlmICh0aGlzLmV4cGFuZC5leHBhbmRhYmxlKSB7XG4gICAgICB0aGlzLmV4cGFuZGVkID0gIXRoaXMuZXhwYW5kZWQ7XG4gICAgICB0aGlzLmV4cGFuZGVkQ2hhbmdlLmVtaXQodGhpcy5leHBhbmRlZCk7XG4gICAgfVxuICB9XG5cbiAgLyoqKioqXG4gICAqIHByb3BlcnR5IGRnQ2VsbHNcbiAgICpcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIEEgUXVlcnkgTGlzdCBvZiB0aGUgQ2xyRGF0YWdyaWQgY2VsbHMgaW4gdGhpcyByb3cuXG4gICAqXG4gICAqL1xuICBAQ29udGVudENoaWxkcmVuKENsckRhdGFncmlkQ2VsbCkgZGdDZWxsczogUXVlcnlMaXN0PENsckRhdGFncmlkQ2VsbD47XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIC8vIE1ha2Ugc3VyZSB0aGluZ3MgZ2V0IHN0YXJ0ZWRcbiAgICBjb25zdCBjb2x1bW5zTGlzdCA9IHRoaXMuaGlkZWFibGVDb2x1bW5TZXJ2aWNlLmdldENvbHVtbnMoKTtcbiAgICB0aGlzLnVwZGF0ZUNlbGxzRm9yQ29sdW1ucyhjb2x1bW5zTGlzdCk7XG5cbiAgICAvLyBUcmlnZ2VyZWQgd2hlbiB0aGUgQ2VsbHMgbGlzdCBjaGFuZ2VzIHBlciByb3ctcmVuZGVyZXJcbiAgICB0aGlzLmRnQ2VsbHMuY2hhbmdlcy5zdWJzY3JpYmUoY2VsbExpc3QgPT4ge1xuICAgICAgY29uc3QgY29sdW1uTGlzdCA9IHRoaXMuaGlkZWFibGVDb2x1bW5TZXJ2aWNlLmdldENvbHVtbnMoKTtcbiAgICAgIGlmIChjZWxsTGlzdC5sZW5ndGggPT09IGNvbHVtbkxpc3QubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMudXBkYXRlQ2VsbHNGb3JDb2x1bW5zKGNvbHVtbkxpc3QpO1xuICAgICAgICB0aGlzLmRnQ2VsbHMuZm9yRWFjaChjZWxsID0+IHtcbiAgICAgICAgICB0aGlzLl9zY3JvbGxhYmxlQ2VsbHMuaW5zZXJ0KGNlbGwuX3ZpZXcpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIFVzZWQgdG8gc2V0IHRoaW5ncyB1cCB0aGUgZmlyc3QgdGltZSBidXQgb25seSBhZnRlciBhbGwgdGhlIGNvbHVtbnMgYXJlIHJlYWR5LlxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5oaWRlYWJsZUNvbHVtblNlcnZpY2UuY29sdW1uTGlzdENoYW5nZS5zdWJzY3JpYmUoY29sdW1uTGlzdCA9PiB7XG4gICAgICAgIC8vIFByZXZlbnRzIGNlbGwgdXBkYXRlcyB3aGVuIGNvbHMgYW5kIGNlbGxzIGFycmF5IGFyZSBub3QgYWxpZ25lZCAtIG9ubHkgc2VlbXMgdG8gcnVuIG9uIGluaXQgLyBmaXJzdCB0aW1lLlxuICAgICAgICBpZiAoY29sdW1uTGlzdC5sZW5ndGggPT09IHRoaXMuZGdDZWxscy5sZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLnVwZGF0ZUNlbGxzRm9yQ29sdW1ucyhjb2x1bW5MaXN0KTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5kaXNwbGF5TW9kZS52aWV3LnN1YnNjcmliZSh2aWV3Q2hhbmdlID0+IHtcbiAgICAgICAgLy8gTGlzdGVuIGZvciB2aWV3IGNoYW5nZXMgYW5kIG1vdmUgY2VsbHMgYXJvdW5kIGRlcGVuZGluZyBvbiB0aGUgY3VycmVudCBkaXNwbGF5VHlwZVxuICAgICAgICAvLyByZW1vdmUgY2VsbCB2aWV3cyBmcm9tIGRpc3BsYXkgdmlld1xuICAgICAgICBmb3IgKGxldCBpID0gdGhpcy5fc2Nyb2xsYWJsZUNlbGxzLmxlbmd0aDsgaSA+IDA7IGktLSkge1xuICAgICAgICAgIHRoaXMuX3Njcm9sbGFibGVDZWxscy5kZXRhY2goKTtcbiAgICAgICAgfVxuICAgICAgICAvLyByZW1vdmUgY2VsbCB2aWV3cyBmcm9tIGNhbGN1bGF0ZWQgdmlld1xuICAgICAgICBmb3IgKGxldCBpID0gdGhpcy5fY2FsY3VsYXRlZENlbGxzLmxlbmd0aDsgaSA+IDA7IGktLSkge1xuICAgICAgICAgIHRoaXMuX2NhbGN1bGF0ZWRDZWxscy5kZXRhY2goKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodmlld0NoYW5nZSA9PT0gRGF0YWdyaWREaXNwbGF5TW9kZS5DQUxDVUxBVEUpIHtcbiAgICAgICAgICB0aGlzLmRpc3BsYXlDZWxscyA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMuZGdDZWxscy5mb3JFYWNoKGNlbGwgPT4ge1xuICAgICAgICAgICAgdGhpcy5fY2FsY3VsYXRlZENlbGxzLmluc2VydChjZWxsLl92aWV3KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmRpc3BsYXlDZWxscyA9IHRydWU7XG4gICAgICAgICAgdGhpcy5kZ0NlbGxzLmZvckVhY2goY2VsbCA9PiB7XG4gICAgICAgICAgICB0aGlzLl9zY3JvbGxhYmxlQ2VsbHMuaW5zZXJ0KGNlbGwuX3ZpZXcpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvKioqKioqKioqKlxuICAgKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogMS4gTWFwcyB0aGUgbmV3IGNvbHVtbkxpc3RDaGFuZ2UgdG8gdGhlIGRnQ2VsbHMgbGlzdCBieSBpbmRleFxuICAgKiAyLiBTZXRzIHRoZSBoaWRkZW4gc3RhdGUgb24gdGhlIGNlbGxcbiAgICogVGFrZSBhIENvbHVtbiBsaXN0IGFuZCB1c2UgaW5kZXggdG8gYWNjZXNzIHRoZSBjb2x1bW5zIGZvciBoaWRlYWJsZSBwcm9wZXJ0aWVzLlxuICAgKlxuICAgKi9cbiAgcHVibGljIHVwZGF0ZUNlbGxzRm9yQ29sdW1ucyhjb2x1bW5MaXN0OiBEYXRhZ3JpZEhpZGVhYmxlQ29sdW1uTW9kZWxbXSkge1xuICAgIC8vIE1hcCBjZWxscyB0byBjb2x1bW5zIHdpdGggQXJyYXkuaW5kZXhcbiAgICB0aGlzLmRnQ2VsbHMuZm9yRWFjaCgoY2VsbCwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IGN1cnJlbnRDb2x1bW4gPSBjb2x1bW5MaXN0W2luZGV4XTsgLy8gQWNjb3VudHMgZm9yIG51bGwgc3BhY2UuXG4gICAgICBpZiAoY3VycmVudENvbHVtbikge1xuICAgICAgICBjZWxsLmlkID0gY3VycmVudENvbHVtbi5pZDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaCgoc3ViOiBTdWJzY3JpcHRpb24pID0+IHN1Yi51bnN1YnNjcmliZSgpKTtcbiAgfVxuXG4gIHB1YmxpYyBkaXNwbGF5Q2VsbHMgPSBmYWxzZTtcblxuICBAVmlld0NoaWxkKCdzdGlja3lDZWxscycsIHsgcmVhZDogVmlld0NvbnRhaW5lclJlZiB9KVxuICBfc3RpY2t5Q2VsbHM6IFZpZXdDb250YWluZXJSZWY7XG4gIEBWaWV3Q2hpbGQoJ3Njcm9sbGFibGVDZWxscycsIHsgcmVhZDogVmlld0NvbnRhaW5lclJlZiB9KVxuICBfc2Nyb2xsYWJsZUNlbGxzOiBWaWV3Q29udGFpbmVyUmVmO1xuICBAVmlld0NoaWxkKCdjYWxjdWxhdGVkQ2VsbHMnLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYgfSlcbiAgX2NhbGN1bGF0ZWRDZWxsczogVmlld0NvbnRhaW5lclJlZjtcblxuICBwcml2YXRlIHdyYXBwZWRJbmplY3RvcjogSW5qZWN0b3I7XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy53cmFwcGVkSW5qZWN0b3IgPSBuZXcgSG9zdFdyYXBwZXIoV3JhcHBlZFJvdywgdGhpcy52Y3IpO1xuICB9XG5cbiAgcHVibGljIGdldCBfdmlldygpIHtcbiAgICByZXR1cm4gdGhpcy53cmFwcGVkSW5qZWN0b3IuZ2V0KFdyYXBwZWRSb3csIHRoaXMudmNyKS5yb3dWaWV3O1xuICB9XG59XG4iXX0=