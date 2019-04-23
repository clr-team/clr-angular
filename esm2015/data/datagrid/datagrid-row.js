/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ContentChildren, ElementRef, EventEmitter, Input, Output, QueryList, Renderer2, ViewChild, ViewContainerRef, } from '@angular/core';
import { combineLatest } from 'rxjs';
import { IfExpandService } from '../../utils/conditional/if-expanded.service';
import { HostWrapper } from '../../utils/host-wrapping/host-wrapper';
import { LoadingListener } from '../../utils/loading/loading-listener';
import { ClrDatagridCell } from './datagrid-cell';
import { DatagridDisplayMode } from './enums/display-mode.enum';
import { DisplayModeService } from './providers/display-mode.service';
import { ExpandableRowsCount } from './providers/global-expandable-rows';
import { RowActionService } from './providers/row-action-service';
import { Selection } from './providers/selection';
import { WrappedRow } from './wrapped-row';
import { ClrCommonStrings } from '../../utils/i18n/common-strings.interface';
import { SelectionType } from './enums/selection-type';
import { DatagridIfExpandService } from './datagrid-if-expanded.service';
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
     * @param {?} displayMode
     * @param {?} vcr
     * @param {?} renderer
     * @param {?} el
     * @param {?} commonStrings
     */
    constructor(selection, rowActionService, globalExpandable, expand, displayMode, vcr, renderer, el, commonStrings) {
        this.selection = selection;
        this.rowActionService = rowActionService;
        this.globalExpandable = globalExpandable;
        this.expand = expand;
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
        this.dgCells.changes.subscribe((/**
         * @return {?}
         */
        () => {
            this.dgCells.forEach((/**
             * @param {?} cell
             * @return {?}
             */
            cell => {
                this._scrollableCells.insert(cell._view);
            }));
        }));
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
                providers: [
                    DatagridIfExpandService,
                    { provide: IfExpandService, useExisting: DatagridIfExpandService },
                    { provide: LoadingListener, useExisting: DatagridIfExpandService },
                ]
            }] }
];
/** @nocollapse */
ClrDatagridRow.ctorParameters = () => [
    { type: Selection },
    { type: RowActionService },
    { type: ExpandableRowsCount },
    { type: DatagridIfExpandService },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtcm93LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9kYXRhZ3JpZC1yb3cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBTUEsT0FBTyxFQUdMLFNBQVMsRUFDVCxlQUFlLEVBQ2YsVUFBVSxFQUNWLFlBQVksRUFFWixLQUFLLEVBQ0wsTUFBTSxFQUNOLFNBQVMsRUFDVCxTQUFTLEVBQ1QsU0FBUyxFQUNULGdCQUFnQixHQUNqQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsYUFBYSxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUVuRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDOUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUV2RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDbEQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDdEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDekUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDbEUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2xELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDN0UsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDOztJQUVyRSxL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dUI7O0lBQ3ZCLG9DQUEwQjs7SUFHMUIsd0NBQXNDOzs7OztJQUt0Qyw4QkFBNEI7O0lBRTVCLGtDQUFnQjs7Ozs7SUFvQ2hCLG1DQUEwQjs7SUFxQjFCLHlDQUFrRjs7SUFrQmxGLHdDQUFpRjs7Ozs7Ozs7OztJQWdCakYsaUNBQXNFOzs7OztJQXFDdEUsdUNBQTJDOztJQU0zQyxzQ0FBNEI7O0lBRTVCLHNDQUMrQjs7SUFDL0IsMENBQ21DOztJQUNuQywwQ0FDbUM7Ozs7O0lBRW5DLHlDQUFrQzs7SUE1SWhDLG1DQUE4Qjs7SUFDOUIsMENBQXlDOztJQUN6QywwQ0FBNEM7O0lBQzVDLGdDQUFzQzs7Ozs7SUFDdEMscUNBQXVDOzs7OztJQUN2Qyw2QkFBNkI7Ozs7O0lBQzdCLGtDQUEyQjs7Ozs7SUFDM0IsNEJBQXNCOztJQUN0Qix1Q0FBc0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIEFmdGVyVmlld0luaXQsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEluamVjdG9yLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBRdWVyeUxpc3QsXG4gIFJlbmRlcmVyMixcbiAgVmlld0NoaWxkLFxuICBWaWV3Q29udGFpbmVyUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGNvbWJpbmVMYXRlc3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBJZkV4cGFuZFNlcnZpY2UgfSBmcm9tICcuLi8uLi91dGlscy9jb25kaXRpb25hbC9pZi1leHBhbmRlZC5zZXJ2aWNlJztcbmltcG9ydCB7IEhvc3RXcmFwcGVyIH0gZnJvbSAnLi4vLi4vdXRpbHMvaG9zdC13cmFwcGluZy9ob3N0LXdyYXBwZXInO1xuaW1wb3J0IHsgTG9hZGluZ0xpc3RlbmVyIH0gZnJvbSAnLi4vLi4vdXRpbHMvbG9hZGluZy9sb2FkaW5nLWxpc3RlbmVyJztcblxuaW1wb3J0IHsgQ2xyRGF0YWdyaWRDZWxsIH0gZnJvbSAnLi9kYXRhZ3JpZC1jZWxsJztcbmltcG9ydCB7IERhdGFncmlkRGlzcGxheU1vZGUgfSBmcm9tICcuL2VudW1zL2Rpc3BsYXktbW9kZS5lbnVtJztcbmltcG9ydCB7IERpc3BsYXlNb2RlU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2Rpc3BsYXktbW9kZS5zZXJ2aWNlJztcbmltcG9ydCB7IEV4cGFuZGFibGVSb3dzQ291bnQgfSBmcm9tICcuL3Byb3ZpZGVycy9nbG9iYWwtZXhwYW5kYWJsZS1yb3dzJztcbmltcG9ydCB7IFJvd0FjdGlvblNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9yb3ctYWN0aW9uLXNlcnZpY2UnO1xuaW1wb3J0IHsgU2VsZWN0aW9uIH0gZnJvbSAnLi9wcm92aWRlcnMvc2VsZWN0aW9uJztcbmltcG9ydCB7IFdyYXBwZWRSb3cgfSBmcm9tICcuL3dyYXBwZWQtcm93JztcbmltcG9ydCB7IENsckNvbW1vblN0cmluZ3MgfSBmcm9tICcuLi8uLi91dGlscy9pMThuL2NvbW1vbi1zdHJpbmdzLmludGVyZmFjZSc7XG5pbXBvcnQgeyBTZWxlY3Rpb25UeXBlIH0gZnJvbSAnLi9lbnVtcy9zZWxlY3Rpb24tdHlwZSc7XG5pbXBvcnQgeyBEYXRhZ3JpZElmRXhwYW5kU2VydmljZSB9IGZyb20gJy4vZGF0YWdyaWQtaWYtZXhwYW5kZWQuc2VydmljZSc7XG5cbmxldCBuYlJvdzogbnVtYmVyID0gMDtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLWRnLXJvdycsXG4gIHRlbXBsYXRlVXJsOiAnLi9kYXRhZ3JpZC1yb3cuaHRtbCcsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmRhdGFncmlkLXJvd10nOiAndHJ1ZScsXG4gICAgJ1tjbGFzcy5kYXRhZ3JpZC1zZWxlY3RlZF0nOiAnc2VsZWN0ZWQnLFxuICAgICdbYXR0ci5hcmlhLW93bnNdJzogJ2lkJyxcbiAgICByb2xlOiAncm93Z3JvdXAnLFxuICB9LFxuICBwcm92aWRlcnM6IFtcbiAgICBEYXRhZ3JpZElmRXhwYW5kU2VydmljZSxcbiAgICB7IHByb3ZpZGU6IElmRXhwYW5kU2VydmljZSwgdXNlRXhpc3Rpbmc6IERhdGFncmlkSWZFeHBhbmRTZXJ2aWNlIH0sXG4gICAgeyBwcm92aWRlOiBMb2FkaW5nTGlzdGVuZXIsIHVzZUV4aXN0aW5nOiBEYXRhZ3JpZElmRXhwYW5kU2VydmljZSB9LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBDbHJEYXRhZ3JpZFJvdzxUID0gYW55PiBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIEFmdGVyVmlld0luaXQge1xuICBwdWJsaWMgaWQ6IHN0cmluZztcbiAgcHVibGljIHJhZGlvSWQ6IHN0cmluZztcbiAgcHVibGljIGNoZWNrYm94SWQ6IHN0cmluZztcblxuICAvKiByZWZlcmVuY2UgdG8gdGhlIGVudW0gc28gdGhhdCB0ZW1wbGF0ZSBjYW4gYWNjZXNzICovXG4gIHB1YmxpYyBTRUxFQ1RJT05fVFlQRSA9IFNlbGVjdGlvblR5cGU7XG5cbiAgLyoqXG4gICAqIE1vZGVsIG9mIHRoZSByb3csIHRvIHVzZSBmb3Igc2VsZWN0aW9uXG4gICAqL1xuICBASW5wdXQoJ2NsckRnSXRlbScpIGl0ZW06IFQ7XG5cbiAgcHVibGljIHJlcGxhY2VkO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBzZWxlY3Rpb246IFNlbGVjdGlvbjxUPixcbiAgICBwdWJsaWMgcm93QWN0aW9uU2VydmljZTogUm93QWN0aW9uU2VydmljZSxcbiAgICBwdWJsaWMgZ2xvYmFsRXhwYW5kYWJsZTogRXhwYW5kYWJsZVJvd3NDb3VudCxcbiAgICBwdWJsaWMgZXhwYW5kOiBEYXRhZ3JpZElmRXhwYW5kU2VydmljZSxcbiAgICBwcml2YXRlIGRpc3BsYXlNb2RlOiBEaXNwbGF5TW9kZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSB2Y3I6IFZpZXdDb250YWluZXJSZWYsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsXG4gICAgcHVibGljIGNvbW1vblN0cmluZ3M6IENsckNvbW1vblN0cmluZ3NcbiAgKSB7XG4gICAgbmJSb3crKztcbiAgICB0aGlzLmlkID0gJ2Nsci1kZy1yb3cnICsgbmJSb3c7XG4gICAgdGhpcy5yYWRpb0lkID0gJ2Nsci1kZy1yb3ctcmQnICsgbmJSb3c7XG4gICAgdGhpcy5jaGVja2JveElkID0gJ2Nsci1kZy1yb3ctY2InICsgbmJSb3c7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIGNvbWJpbmVMYXRlc3QodGhpcy5leHBhbmQucmVwbGFjZSwgdGhpcy5leHBhbmQuZXhwYW5kQ2hhbmdlKS5zdWJzY3JpYmUoXG4gICAgICAgIChbZXhwYW5kUmVwbGFjZVZhbHVlLCBleHBhbmRDaGFuZ2VWYWx1ZV0pID0+IHtcbiAgICAgICAgICBpZiAoZXhwYW5kUmVwbGFjZVZhbHVlICYmIGV4cGFuZENoYW5nZVZhbHVlKSB7XG4gICAgICAgICAgICAvLyByZXBsYWNlZCBhbmQgZXhwYW5kaW5nXG4gICAgICAgICAgICB0aGlzLnJlcGxhY2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnZGF0YWdyaWQtcm93LXJlcGxhY2VkJyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVwbGFjZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIC8vIEhhbmRsZXMgdGhlc2UgY2FzZXM6IG5vdCByZXBsYWNlZCBhbmQgY29sbGFwc2luZyAmIHJlcGxhY2VkIGFuZFxuICAgICAgICAgICAgLy8gY29sbGFwc2luZyBhbmQgbm90IHJlcGxhY2VkIGFuZCBleHBhbmRpbmcuXG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2RhdGFncmlkLXJvdy1yZXBsYWNlZCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIF9zZWxlY3RlZCA9IGZhbHNlO1xuICAvKipcbiAgICogSW5kaWNhdGVzIGlmIHRoZSByb3cgaXMgc2VsZWN0ZWRcbiAgICovXG4gIHB1YmxpYyBnZXQgc2VsZWN0ZWQoKSB7XG4gICAgaWYgKHRoaXMuc2VsZWN0aW9uLnNlbGVjdGlvblR5cGUgPT09IFNlbGVjdGlvblR5cGUuTm9uZSkge1xuICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb24uaXNTZWxlY3RlZCh0aGlzLml0ZW0pO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgnY2xyRGdTZWxlY3RlZCcpXG4gIHB1YmxpYyBzZXQgc2VsZWN0ZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICBpZiAodGhpcy5zZWxlY3Rpb24uc2VsZWN0aW9uVHlwZSA9PT0gU2VsZWN0aW9uVHlwZS5Ob25lKSB7XG4gICAgICB0aGlzLl9zZWxlY3RlZCA9IHZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNlbGVjdGlvbi5zZXRTZWxlY3RlZCh0aGlzLml0ZW0sIHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBAT3V0cHV0KCdjbHJEZ1NlbGVjdGVkQ2hhbmdlJykgc2VsZWN0ZWRDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPihmYWxzZSk7XG5cbiAgcHVibGljIHRvZ2dsZShzZWxlY3RlZCA9ICF0aGlzLnNlbGVjdGVkKSB7XG4gICAgaWYgKHNlbGVjdGVkICE9PSB0aGlzLnNlbGVjdGVkKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkID0gc2VsZWN0ZWQ7XG4gICAgICB0aGlzLnNlbGVjdGVkQ2hhbmdlZC5lbWl0KHNlbGVjdGVkKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0IGV4cGFuZGVkKCkge1xuICAgIHJldHVybiB0aGlzLmV4cGFuZC5leHBhbmRlZDtcbiAgfVxuXG4gIEBJbnB1dCgnY2xyRGdFeHBhbmRlZCcpXG4gIHB1YmxpYyBzZXQgZXhwYW5kZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmV4cGFuZC5leHBhbmRlZCA9IHZhbHVlO1xuICB9XG5cbiAgQE91dHB1dCgnY2xyRGdFeHBhbmRlZENoYW5nZScpIGV4cGFuZGVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPihmYWxzZSk7XG5cbiAgcHVibGljIHRvZ2dsZUV4cGFuZCgpIHtcbiAgICBpZiAodGhpcy5leHBhbmQuZXhwYW5kYWJsZSkge1xuICAgICAgdGhpcy5leHBhbmRlZCA9ICF0aGlzLmV4cGFuZGVkO1xuICAgICAgdGhpcy5leHBhbmRlZENoYW5nZS5lbWl0KHRoaXMuZXhwYW5kZWQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKioqKlxuICAgKiBwcm9wZXJ0eSBkZ0NlbGxzXG4gICAqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBBIFF1ZXJ5IExpc3Qgb2YgdGhlIENsckRhdGFncmlkIGNlbGxzIGluIHRoaXMgcm93LlxuICAgKlxuICAgKi9cbiAgQENvbnRlbnRDaGlsZHJlbihDbHJEYXRhZ3JpZENlbGwpIGRnQ2VsbHM6IFF1ZXJ5TGlzdDxDbHJEYXRhZ3JpZENlbGw+O1xuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICB0aGlzLmRnQ2VsbHMuY2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5kZ0NlbGxzLmZvckVhY2goY2VsbCA9PiB7XG4gICAgICAgIHRoaXMuX3Njcm9sbGFibGVDZWxscy5pbnNlcnQoY2VsbC5fdmlldyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMuZGlzcGxheU1vZGUudmlldy5zdWJzY3JpYmUodmlld0NoYW5nZSA9PiB7XG4gICAgICAgIC8vIExpc3RlbiBmb3IgdmlldyBjaGFuZ2VzIGFuZCBtb3ZlIGNlbGxzIGFyb3VuZCBkZXBlbmRpbmcgb24gdGhlIGN1cnJlbnQgZGlzcGxheVR5cGVcbiAgICAgICAgLy8gcmVtb3ZlIGNlbGwgdmlld3MgZnJvbSBkaXNwbGF5IHZpZXdcbiAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMuX3Njcm9sbGFibGVDZWxscy5sZW5ndGg7IGkgPiAwOyBpLS0pIHtcbiAgICAgICAgICB0aGlzLl9zY3JvbGxhYmxlQ2VsbHMuZGV0YWNoKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gcmVtb3ZlIGNlbGwgdmlld3MgZnJvbSBjYWxjdWxhdGVkIHZpZXdcbiAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMuX2NhbGN1bGF0ZWRDZWxscy5sZW5ndGg7IGkgPiAwOyBpLS0pIHtcbiAgICAgICAgICB0aGlzLl9jYWxjdWxhdGVkQ2VsbHMuZGV0YWNoKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZpZXdDaGFuZ2UgPT09IERhdGFncmlkRGlzcGxheU1vZGUuQ0FMQ1VMQVRFKSB7XG4gICAgICAgICAgdGhpcy5kaXNwbGF5Q2VsbHMgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLmRnQ2VsbHMuZm9yRWFjaChjZWxsID0+IHtcbiAgICAgICAgICAgIHRoaXMuX2NhbGN1bGF0ZWRDZWxscy5pbnNlcnQoY2VsbC5fdmlldyk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5kaXNwbGF5Q2VsbHMgPSB0cnVlO1xuICAgICAgICAgIHRoaXMuZGdDZWxscy5mb3JFYWNoKGNlbGwgPT4ge1xuICAgICAgICAgICAgdGhpcy5fc2Nyb2xsYWJsZUNlbGxzLmluc2VydChjZWxsLl92aWV3KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKChzdWI6IFN1YnNjcmlwdGlvbikgPT4gc3ViLnVuc3Vic2NyaWJlKCkpO1xuICB9XG5cbiAgcHVibGljIGRpc3BsYXlDZWxscyA9IGZhbHNlO1xuXG4gIEBWaWV3Q2hpbGQoJ3N0aWNreUNlbGxzJywgeyByZWFkOiBWaWV3Q29udGFpbmVyUmVmIH0pXG4gIF9zdGlja3lDZWxsczogVmlld0NvbnRhaW5lclJlZjtcbiAgQFZpZXdDaGlsZCgnc2Nyb2xsYWJsZUNlbGxzJywgeyByZWFkOiBWaWV3Q29udGFpbmVyUmVmIH0pXG4gIF9zY3JvbGxhYmxlQ2VsbHM6IFZpZXdDb250YWluZXJSZWY7XG4gIEBWaWV3Q2hpbGQoJ2NhbGN1bGF0ZWRDZWxscycsIHsgcmVhZDogVmlld0NvbnRhaW5lclJlZiB9KVxuICBfY2FsY3VsYXRlZENlbGxzOiBWaWV3Q29udGFpbmVyUmVmO1xuXG4gIHByaXZhdGUgd3JhcHBlZEluamVjdG9yOiBJbmplY3RvcjtcblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLndyYXBwZWRJbmplY3RvciA9IG5ldyBIb3N0V3JhcHBlcihXcmFwcGVkUm93LCB0aGlzLnZjcik7XG4gIH1cblxuICBwdWJsaWMgZ2V0IF92aWV3KCkge1xuICAgIHJldHVybiB0aGlzLndyYXBwZWRJbmplY3Rvci5nZXQoV3JhcHBlZFJvdywgdGhpcy52Y3IpLnJvd1ZpZXc7XG4gIH1cbn1cbiJdfQ==