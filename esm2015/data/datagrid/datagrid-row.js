/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        this.subscriptions.push(combineLatest(this.expand.replace, this.expand.expandChange).subscribe((/**
         * @param {?} __0
         * @return {?}
         */
        ([expandReplaceValue, expandChangeValue]) => {
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
        })));
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
        this.dgCells.changes.subscribe((/**
         * @param {?} cellList
         * @return {?}
         */
        cellList => {
            /** @type {?} */
            const columnList = this.hideableColumnService.getColumns();
            if (cellList.length === columnList.length) {
                this.updateCellsForColumns(columnList);
                this.dgCells.forEach((/**
                 * @param {?} cell
                 * @return {?}
                 */
                cell => {
                    this._scrollableCells.insert(cell._view);
                }));
            }
        }));
        // Used to set things up the first time but only after all the columns are ready.
        this.subscriptions.push(this.hideableColumnService.columnListChange.subscribe((/**
         * @param {?} columnList
         * @return {?}
         */
        columnList => {
            // Prevents cell updates when cols and cells array are not aligned - only seems to run on init / first time.
            if (columnList.length === this.dgCells.length) {
                this.updateCellsForColumns(columnList);
            }
        })));
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.subscriptions.push(this.displayMode.view.subscribe((/**
         * @param {?} viewChange
         * @return {?}
         */
        viewChange => {
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
                this.dgCells.forEach((/**
                 * @param {?} cell
                 * @return {?}
                 */
                cell => {
                    this._calculatedCells.insert(cell._view);
                }));
            }
            else {
                this.displayCells = true;
                this.dgCells.forEach((/**
                 * @param {?} cell
                 * @return {?}
                 */
                cell => {
                    this._scrollableCells.insert(cell._view);
                }));
            }
        })));
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
        this.dgCells.forEach((/**
         * @param {?} cell
         * @param {?} index
         * @return {?}
         */
        (cell, index) => {
            /** @type {?} */
            const currentColumn = columnList[index];
            if (currentColumn) {
                cell.id = currentColumn.id;
            }
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        (sub) => sub.unsubscribe()));
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
    /**
     * @type {?}
     * @private
     */
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
    /**
     * @type {?}
     * @private
     */
    ClrDatagridRow.prototype.subscriptions;
    /** @type {?} */
    ClrDatagridRow.prototype.displayCells;
    /** @type {?} */
    ClrDatagridRow.prototype._stickyCells;
    /** @type {?} */
    ClrDatagridRow.prototype._scrollableCells;
    /** @type {?} */
    ClrDatagridRow.prototype._calculatedCells;
    /**
     * @type {?}
     * @private
     */
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
    /**
     * @type {?}
     * @private
     */
    ClrDatagridRow.prototype.displayMode;
    /**
     * @type {?}
     * @private
     */
    ClrDatagridRow.prototype.vcr;
    /**
     * @type {?}
     * @private
     */
    ClrDatagridRow.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    ClrDatagridRow.prototype.el;
    /** @type {?} */
    ClrDatagridRow.prototype.commonStrings;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtcm93LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9kYXRhZ3JpZC1yb3cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBTUEsT0FBTyxFQUdMLFNBQVMsRUFDVCxlQUFlLEVBQ2YsVUFBVSxFQUNWLFlBQVksRUFFWixLQUFLLEVBQ0wsTUFBTSxFQUNOLFNBQVMsRUFDVCxTQUFTLEVBQ1QsU0FBUyxFQUNULGdCQUFnQixHQUNqQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsYUFBYSxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUVuRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDN0QsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUV2RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFbEQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDdEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDekUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDNUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDbEUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2xELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDN0UsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDOztJQUVuRCxL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QUFzRTs7Ozs7SUEwRXRFLHVDQUEyQzs7SUFNM0Msc0NBQTRCOztJQUU1QixzQ0FDK0I7O0lBQy9CLDBDQUNtQzs7SUFDbkMsMENBQ21DOzs7OztJQUVuQyx5Q0FBa0M7O0lBbExoQyxtQ0FBOEI7O0lBQzlCLDBDQUF5Qzs7SUFDekMsMENBQTRDOztJQUM1QyxnQ0FBcUI7O0lBQ3JCLCtDQUFtRDs7Ozs7SUFDbkQscUNBQXVDOzs7OztJQUN2Qyw2QkFBNkI7Ozs7O0lBQzdCLGtDQUEyQjs7Ozs7SUFDM0IsNEJBQXNCOztJQUN0Qix1Q0FBc0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIEFmdGVyVmlld0luaXQsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEluamVjdG9yLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBRdWVyeUxpc3QsXG4gIFJlbmRlcmVyMixcbiAgVmlld0NoaWxkLFxuICBWaWV3Q29udGFpbmVyUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGNvbWJpbmVMYXRlc3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBFeHBhbmQgfSBmcm9tICcuLi8uLi91dGlscy9leHBhbmQvcHJvdmlkZXJzL2V4cGFuZCc7XG5pbXBvcnQgeyBIb3N0V3JhcHBlciB9IGZyb20gJy4uLy4uL3V0aWxzL2hvc3Qtd3JhcHBpbmcvaG9zdC13cmFwcGVyJztcbmltcG9ydCB7IExvYWRpbmdMaXN0ZW5lciB9IGZyb20gJy4uLy4uL3V0aWxzL2xvYWRpbmcvbG9hZGluZy1saXN0ZW5lcic7XG5cbmltcG9ydCB7IENsckRhdGFncmlkQ2VsbCB9IGZyb20gJy4vZGF0YWdyaWQtY2VsbCc7XG5pbXBvcnQgeyBEYXRhZ3JpZEhpZGVhYmxlQ29sdW1uTW9kZWwgfSBmcm9tICcuL2RhdGFncmlkLWhpZGVhYmxlLWNvbHVtbi5tb2RlbCc7XG5pbXBvcnQgeyBEYXRhZ3JpZERpc3BsYXlNb2RlIH0gZnJvbSAnLi9lbnVtcy9kaXNwbGF5LW1vZGUuZW51bSc7XG5pbXBvcnQgeyBEaXNwbGF5TW9kZVNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9kaXNwbGF5LW1vZGUuc2VydmljZSc7XG5pbXBvcnQgeyBFeHBhbmRhYmxlUm93c0NvdW50IH0gZnJvbSAnLi9wcm92aWRlcnMvZ2xvYmFsLWV4cGFuZGFibGUtcm93cyc7XG5pbXBvcnQgeyBIaWRlYWJsZUNvbHVtblNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9oaWRlYWJsZS1jb2x1bW4uc2VydmljZSc7XG5pbXBvcnQgeyBSb3dBY3Rpb25TZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvcm93LWFjdGlvbi1zZXJ2aWNlJztcbmltcG9ydCB7IFNlbGVjdGlvbiB9IGZyb20gJy4vcHJvdmlkZXJzL3NlbGVjdGlvbic7XG5pbXBvcnQgeyBXcmFwcGVkUm93IH0gZnJvbSAnLi93cmFwcGVkLXJvdyc7XG5pbXBvcnQgeyBDbHJDb21tb25TdHJpbmdzIH0gZnJvbSAnLi4vLi4vdXRpbHMvaTE4bi9jb21tb24tc3RyaW5ncy5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgU2VsZWN0aW9uVHlwZSB9IGZyb20gJy4vZW51bXMvc2VsZWN0aW9uLXR5cGUnO1xuXG5sZXQgbmJSb3c6IG51bWJlciA9IDA7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci1kZy1yb3cnLFxuICB0ZW1wbGF0ZVVybDogJy4vZGF0YWdyaWQtcm93Lmh0bWwnLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5kYXRhZ3JpZC1yb3ddJzogJ3RydWUnLFxuICAgICdbY2xhc3MuZGF0YWdyaWQtc2VsZWN0ZWRdJzogJ3NlbGVjdGVkJyxcbiAgICAnW2F0dHIuYXJpYS1vd25zXSc6ICdpZCcsXG4gICAgcm9sZTogJ3Jvd2dyb3VwJyxcbiAgfSxcbiAgcHJvdmlkZXJzOiBbRXhwYW5kLCB7IHByb3ZpZGU6IExvYWRpbmdMaXN0ZW5lciwgdXNlRXhpc3Rpbmc6IEV4cGFuZCB9XSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyRGF0YWdyaWRSb3c8VCA9IGFueT4gaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBBZnRlclZpZXdJbml0IHtcbiAgcHVibGljIGlkOiBzdHJpbmc7XG4gIHB1YmxpYyByYWRpb0lkOiBzdHJpbmc7XG4gIHB1YmxpYyBjaGVja2JveElkOiBzdHJpbmc7XG5cbiAgLyogcmVmZXJlbmNlIHRvIHRoZSBlbnVtIHNvIHRoYXQgdGVtcGxhdGUgY2FuIGFjY2VzcyAqL1xuICBwdWJsaWMgU0VMRUNUSU9OX1RZUEUgPSBTZWxlY3Rpb25UeXBlO1xuXG4gIC8qKlxuICAgKiBNb2RlbCBvZiB0aGUgcm93LCB0byB1c2UgZm9yIHNlbGVjdGlvblxuICAgKi9cbiAgQElucHV0KCdjbHJEZ0l0ZW0nKSBpdGVtOiBUO1xuXG4gIHB1YmxpYyByZXBsYWNlZDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgc2VsZWN0aW9uOiBTZWxlY3Rpb248VD4sXG4gICAgcHVibGljIHJvd0FjdGlvblNlcnZpY2U6IFJvd0FjdGlvblNlcnZpY2UsXG4gICAgcHVibGljIGdsb2JhbEV4cGFuZGFibGU6IEV4cGFuZGFibGVSb3dzQ291bnQsXG4gICAgcHVibGljIGV4cGFuZDogRXhwYW5kLFxuICAgIHB1YmxpYyBoaWRlYWJsZUNvbHVtblNlcnZpY2U6IEhpZGVhYmxlQ29sdW1uU2VydmljZSxcbiAgICBwcml2YXRlIGRpc3BsYXlNb2RlOiBEaXNwbGF5TW9kZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSB2Y3I6IFZpZXdDb250YWluZXJSZWYsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsXG4gICAgcHVibGljIGNvbW1vblN0cmluZ3M6IENsckNvbW1vblN0cmluZ3NcbiAgKSB7XG4gICAgbmJSb3crKztcbiAgICB0aGlzLmlkID0gJ2Nsci1kZy1yb3cnICsgbmJSb3c7XG4gICAgdGhpcy5yYWRpb0lkID0gJ2Nsci1kZy1yb3ctcmQnICsgbmJSb3c7XG4gICAgdGhpcy5jaGVja2JveElkID0gJ2Nsci1kZy1yb3ctY2InICsgbmJSb3c7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIGNvbWJpbmVMYXRlc3QodGhpcy5leHBhbmQucmVwbGFjZSwgdGhpcy5leHBhbmQuZXhwYW5kQ2hhbmdlKS5zdWJzY3JpYmUoXG4gICAgICAgIChbZXhwYW5kUmVwbGFjZVZhbHVlLCBleHBhbmRDaGFuZ2VWYWx1ZV0pID0+IHtcbiAgICAgICAgICBpZiAoZXhwYW5kUmVwbGFjZVZhbHVlICYmIGV4cGFuZENoYW5nZVZhbHVlKSB7XG4gICAgICAgICAgICAvLyByZXBsYWNlZCBhbmQgZXhwYW5kaW5nXG4gICAgICAgICAgICB0aGlzLnJlcGxhY2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnZGF0YWdyaWQtcm93LXJlcGxhY2VkJyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVwbGFjZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIC8vIEhhbmRsZXMgdGhlc2UgY2FzZXM6IG5vdCByZXBsYWNlZCBhbmQgY29sbGFwc2luZyAmIHJlcGxhY2VkIGFuZFxuICAgICAgICAgICAgLy8gY29sbGFwc2luZyBhbmQgbm90IHJlcGxhY2VkIGFuZCBleHBhbmRpbmcuXG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2RhdGFncmlkLXJvdy1yZXBsYWNlZCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIF9zZWxlY3RlZCA9IGZhbHNlO1xuICAvKipcbiAgICogSW5kaWNhdGVzIGlmIHRoZSByb3cgaXMgc2VsZWN0ZWRcbiAgICovXG4gIHB1YmxpYyBnZXQgc2VsZWN0ZWQoKSB7XG4gICAgaWYgKHRoaXMuc2VsZWN0aW9uLnNlbGVjdGlvblR5cGUgPT09IFNlbGVjdGlvblR5cGUuTm9uZSkge1xuICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb24uaXNTZWxlY3RlZCh0aGlzLml0ZW0pO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgnY2xyRGdTZWxlY3RlZCcpXG4gIHB1YmxpYyBzZXQgc2VsZWN0ZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICBpZiAodGhpcy5zZWxlY3Rpb24uc2VsZWN0aW9uVHlwZSA9PT0gU2VsZWN0aW9uVHlwZS5Ob25lKSB7XG4gICAgICB0aGlzLl9zZWxlY3RlZCA9IHZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNlbGVjdGlvbi5zZXRTZWxlY3RlZCh0aGlzLml0ZW0sIHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBAT3V0cHV0KCdjbHJEZ1NlbGVjdGVkQ2hhbmdlJykgc2VsZWN0ZWRDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPihmYWxzZSk7XG5cbiAgcHVibGljIHRvZ2dsZShzZWxlY3RlZCA9ICF0aGlzLnNlbGVjdGVkKSB7XG4gICAgaWYgKHNlbGVjdGVkICE9PSB0aGlzLnNlbGVjdGVkKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkID0gc2VsZWN0ZWQ7XG4gICAgICB0aGlzLnNlbGVjdGVkQ2hhbmdlZC5lbWl0KHNlbGVjdGVkKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0IGV4cGFuZGVkKCkge1xuICAgIHJldHVybiB0aGlzLmV4cGFuZC5leHBhbmRlZDtcbiAgfVxuXG4gIEBJbnB1dCgnY2xyRGdFeHBhbmRlZCcpXG4gIHB1YmxpYyBzZXQgZXhwYW5kZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmV4cGFuZC5leHBhbmRlZCA9IHZhbHVlO1xuICB9XG5cbiAgQE91dHB1dCgnY2xyRGdFeHBhbmRlZENoYW5nZScpIGV4cGFuZGVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPihmYWxzZSk7XG5cbiAgcHVibGljIHRvZ2dsZUV4cGFuZCgpIHtcbiAgICBpZiAodGhpcy5leHBhbmQuZXhwYW5kYWJsZSkge1xuICAgICAgdGhpcy5leHBhbmRlZCA9ICF0aGlzLmV4cGFuZGVkO1xuICAgICAgdGhpcy5leHBhbmRlZENoYW5nZS5lbWl0KHRoaXMuZXhwYW5kZWQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKioqKlxuICAgKiBwcm9wZXJ0eSBkZ0NlbGxzXG4gICAqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBBIFF1ZXJ5IExpc3Qgb2YgdGhlIENsckRhdGFncmlkIGNlbGxzIGluIHRoaXMgcm93LlxuICAgKlxuICAgKi9cbiAgQENvbnRlbnRDaGlsZHJlbihDbHJEYXRhZ3JpZENlbGwpIGRnQ2VsbHM6IFF1ZXJ5TGlzdDxDbHJEYXRhZ3JpZENlbGw+O1xuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAvLyBNYWtlIHN1cmUgdGhpbmdzIGdldCBzdGFydGVkXG4gICAgY29uc3QgY29sdW1uc0xpc3QgPSB0aGlzLmhpZGVhYmxlQ29sdW1uU2VydmljZS5nZXRDb2x1bW5zKCk7XG4gICAgdGhpcy51cGRhdGVDZWxsc0ZvckNvbHVtbnMoY29sdW1uc0xpc3QpO1xuXG4gICAgLy8gVHJpZ2dlcmVkIHdoZW4gdGhlIENlbGxzIGxpc3QgY2hhbmdlcyBwZXIgcm93LXJlbmRlcmVyXG4gICAgdGhpcy5kZ0NlbGxzLmNoYW5nZXMuc3Vic2NyaWJlKGNlbGxMaXN0ID0+IHtcbiAgICAgIGNvbnN0IGNvbHVtbkxpc3QgPSB0aGlzLmhpZGVhYmxlQ29sdW1uU2VydmljZS5nZXRDb2x1bW5zKCk7XG4gICAgICBpZiAoY2VsbExpc3QubGVuZ3RoID09PSBjb2x1bW5MaXN0Lmxlbmd0aCkge1xuICAgICAgICB0aGlzLnVwZGF0ZUNlbGxzRm9yQ29sdW1ucyhjb2x1bW5MaXN0KTtcbiAgICAgICAgdGhpcy5kZ0NlbGxzLmZvckVhY2goY2VsbCA9PiB7XG4gICAgICAgICAgdGhpcy5fc2Nyb2xsYWJsZUNlbGxzLmluc2VydChjZWxsLl92aWV3KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBVc2VkIHRvIHNldCB0aGluZ3MgdXAgdGhlIGZpcnN0IHRpbWUgYnV0IG9ubHkgYWZ0ZXIgYWxsIHRoZSBjb2x1bW5zIGFyZSByZWFkeS5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMuaGlkZWFibGVDb2x1bW5TZXJ2aWNlLmNvbHVtbkxpc3RDaGFuZ2Uuc3Vic2NyaWJlKGNvbHVtbkxpc3QgPT4ge1xuICAgICAgICAvLyBQcmV2ZW50cyBjZWxsIHVwZGF0ZXMgd2hlbiBjb2xzIGFuZCBjZWxscyBhcnJheSBhcmUgbm90IGFsaWduZWQgLSBvbmx5IHNlZW1zIHRvIHJ1biBvbiBpbml0IC8gZmlyc3QgdGltZS5cbiAgICAgICAgaWYgKGNvbHVtbkxpc3QubGVuZ3RoID09PSB0aGlzLmRnQ2VsbHMubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy51cGRhdGVDZWxsc0ZvckNvbHVtbnMoY29sdW1uTGlzdCk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMuZGlzcGxheU1vZGUudmlldy5zdWJzY3JpYmUodmlld0NoYW5nZSA9PiB7XG4gICAgICAgIC8vIExpc3RlbiBmb3IgdmlldyBjaGFuZ2VzIGFuZCBtb3ZlIGNlbGxzIGFyb3VuZCBkZXBlbmRpbmcgb24gdGhlIGN1cnJlbnQgZGlzcGxheVR5cGVcbiAgICAgICAgLy8gcmVtb3ZlIGNlbGwgdmlld3MgZnJvbSBkaXNwbGF5IHZpZXdcbiAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMuX3Njcm9sbGFibGVDZWxscy5sZW5ndGg7IGkgPiAwOyBpLS0pIHtcbiAgICAgICAgICB0aGlzLl9zY3JvbGxhYmxlQ2VsbHMuZGV0YWNoKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gcmVtb3ZlIGNlbGwgdmlld3MgZnJvbSBjYWxjdWxhdGVkIHZpZXdcbiAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMuX2NhbGN1bGF0ZWRDZWxscy5sZW5ndGg7IGkgPiAwOyBpLS0pIHtcbiAgICAgICAgICB0aGlzLl9jYWxjdWxhdGVkQ2VsbHMuZGV0YWNoKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZpZXdDaGFuZ2UgPT09IERhdGFncmlkRGlzcGxheU1vZGUuQ0FMQ1VMQVRFKSB7XG4gICAgICAgICAgdGhpcy5kaXNwbGF5Q2VsbHMgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLmRnQ2VsbHMuZm9yRWFjaChjZWxsID0+IHtcbiAgICAgICAgICAgIHRoaXMuX2NhbGN1bGF0ZWRDZWxscy5pbnNlcnQoY2VsbC5fdmlldyk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5kaXNwbGF5Q2VsbHMgPSB0cnVlO1xuICAgICAgICAgIHRoaXMuZGdDZWxscy5mb3JFYWNoKGNlbGwgPT4ge1xuICAgICAgICAgICAgdGhpcy5fc2Nyb2xsYWJsZUNlbGxzLmluc2VydChjZWxsLl92aWV3KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgLyoqKioqKioqKipcbiAgICpcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIDEuIE1hcHMgdGhlIG5ldyBjb2x1bW5MaXN0Q2hhbmdlIHRvIHRoZSBkZ0NlbGxzIGxpc3QgYnkgaW5kZXhcbiAgICogMi4gU2V0cyB0aGUgaGlkZGVuIHN0YXRlIG9uIHRoZSBjZWxsXG4gICAqIFRha2UgYSBDb2x1bW4gbGlzdCBhbmQgdXNlIGluZGV4IHRvIGFjY2VzcyB0aGUgY29sdW1ucyBmb3IgaGlkZWFibGUgcHJvcGVydGllcy5cbiAgICpcbiAgICovXG4gIHB1YmxpYyB1cGRhdGVDZWxsc0ZvckNvbHVtbnMoY29sdW1uTGlzdDogRGF0YWdyaWRIaWRlYWJsZUNvbHVtbk1vZGVsW10pIHtcbiAgICAvLyBNYXAgY2VsbHMgdG8gY29sdW1ucyB3aXRoIEFycmF5LmluZGV4XG4gICAgdGhpcy5kZ0NlbGxzLmZvckVhY2goKGNlbGwsIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBjdXJyZW50Q29sdW1uID0gY29sdW1uTGlzdFtpbmRleF07IC8vIEFjY291bnRzIGZvciBudWxsIHNwYWNlLlxuICAgICAgaWYgKGN1cnJlbnRDb2x1bW4pIHtcbiAgICAgICAgY2VsbC5pZCA9IGN1cnJlbnRDb2x1bW4uaWQ7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmZvckVhY2goKHN1YjogU3Vic2NyaXB0aW9uKSA9PiBzdWIudW5zdWJzY3JpYmUoKSk7XG4gIH1cblxuICBwdWJsaWMgZGlzcGxheUNlbGxzID0gZmFsc2U7XG5cbiAgQFZpZXdDaGlsZCgnc3RpY2t5Q2VsbHMnLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYgfSlcbiAgX3N0aWNreUNlbGxzOiBWaWV3Q29udGFpbmVyUmVmO1xuICBAVmlld0NoaWxkKCdzY3JvbGxhYmxlQ2VsbHMnLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYgfSlcbiAgX3Njcm9sbGFibGVDZWxsczogVmlld0NvbnRhaW5lclJlZjtcbiAgQFZpZXdDaGlsZCgnY2FsY3VsYXRlZENlbGxzJywgeyByZWFkOiBWaWV3Q29udGFpbmVyUmVmIH0pXG4gIF9jYWxjdWxhdGVkQ2VsbHM6IFZpZXdDb250YWluZXJSZWY7XG5cbiAgcHJpdmF0ZSB3cmFwcGVkSW5qZWN0b3I6IEluamVjdG9yO1xuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMud3JhcHBlZEluamVjdG9yID0gbmV3IEhvc3RXcmFwcGVyKFdyYXBwZWRSb3csIHRoaXMudmNyKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgX3ZpZXcoKSB7XG4gICAgcmV0dXJuIHRoaXMud3JhcHBlZEluamVjdG9yLmdldChXcmFwcGVkUm93LCB0aGlzLnZjcikucm93VmlldztcbiAgfVxufVxuIl19