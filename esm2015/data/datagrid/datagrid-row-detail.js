/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ContentChildren, Input, QueryList } from '@angular/core';
import { Expand } from '../../utils/expand/providers/expand';
import { ClrDatagridCell } from './datagrid-cell';
import { ExpandableRowsCount } from './providers/global-expandable-rows';
import { RowActionService } from './providers/row-action-service';
import { Selection } from './providers/selection';
import { SelectionType } from './enums/selection-type';
/**
 * Generic bland container serving various purposes for Datagrid.
 * For instance, it can help span a text over multiple rows in detail view.
 * @template T
 */
export class ClrDatagridRowDetail {
    /**
     * @param {?} selection
     * @param {?} rowActionService
     * @param {?} expand
     * @param {?} expandableRows
     */
    constructor(selection, rowActionService, expand, expandableRows) {
        this.selection = selection;
        this.rowActionService = rowActionService;
        this.expand = expand;
        this.expandableRows = expandableRows;
        /* reference to the enum so that template can access it */
        this.SELECTION_TYPE = SelectionType;
        this.subscriptions = [];
        this.replacedRow = false;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set replace(value) {
        this.expand.setReplace(!!value);
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.subscriptions.push(this.expand.replace.subscribe((/**
         * @param {?} replaceChange
         * @return {?}
         */
        replaceChange => {
            this.replacedRow = replaceChange;
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
        sub => sub.unsubscribe()));
    }
}
ClrDatagridRowDetail.decorators = [
    { type: Component, args: [{
                selector: 'clr-dg-row-detail',
                template: `
        <ng-container *ngIf="!replacedRow">
            <!-- space for multiselection state -->
            <div class="datagrid-cell datagrid-select datagrid-fixed-column"
                *ngIf="selection.selectionType === SELECTION_TYPE.Multi">
            </div>
            <!-- space for single selection state -->
            <div class="datagrid-cell datagrid-select datagrid-fixed-column"
                *ngIf="selection.selectionType === SELECTION_TYPE.Single">
            </div>
            <!-- space for single row action; only displayType if we have at least one actionable row in datagrid -->
            <div class="datagrid-cell datagrid-row-actions datagrid-fixed-column"
                *ngIf="rowActionService.hasActionableRow">
            </div>
            <!-- space for expandable caret action; only displayType if we have at least one expandable row in datagrid -->
            <div *ngIf="expandableRows.hasExpandableRow"
                        class="datagrid-expandable-caret datagrid-fixed-column datagrid-cell">
            </div>
        </ng-container>
        <ng-content></ng-content>
    `,
                host: {
                    '[class.datagrid-row-flex]': 'true',
                    '[class.datagrid-row-detail]': 'true',
                    '[class.datagrid-container]': 'cells.length === 0',
                }
            }] }
];
/** @nocollapse */
ClrDatagridRowDetail.ctorParameters = () => [
    { type: Selection },
    { type: RowActionService },
    { type: Expand },
    { type: ExpandableRowsCount }
];
ClrDatagridRowDetail.propDecorators = {
    cells: [{ type: ContentChildren, args: [ClrDatagridCell,] }],
    replace: [{ type: Input, args: ['clrDgReplace',] }]
};
if (false) {
    /** @type {?} */
    ClrDatagridRowDetail.prototype.SELECTION_TYPE;
    /** @type {?} */
    ClrDatagridRowDetail.prototype.cells;
    /**
     * @type {?}
     * @private
     */
    ClrDatagridRowDetail.prototype.subscriptions;
    /** @type {?} */
    ClrDatagridRowDetail.prototype.replacedRow;
    /** @type {?} */
    ClrDatagridRowDetail.prototype.selection;
    /** @type {?} */
    ClrDatagridRowDetail.prototype.rowActionService;
    /** @type {?} */
    ClrDatagridRowDetail.prototype.expand;
    /** @type {?} */
    ClrDatagridRowDetail.prototype.expandableRows;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtcm93LWRldGFpbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvZGF0YWdyaWQtcm93LWRldGFpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFLQSxPQUFPLEVBQW9CLFNBQVMsRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFhLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUcxRyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFFN0QsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7Ozs7OztBQW1DdkQsTUFBTSxPQUFPLG9CQUFvQjs7Ozs7OztJQUkvQixZQUNTLFNBQW9CLEVBQ3BCLGdCQUFrQyxFQUNsQyxNQUFjLEVBQ2QsY0FBbUM7UUFIbkMsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUNwQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxtQkFBYyxHQUFkLGNBQWMsQ0FBcUI7O1FBTnJDLG1CQUFjLEdBQUcsYUFBYSxDQUFDO1FBZTlCLGtCQUFhLEdBQW1CLEVBQUUsQ0FBQztRQUNwQyxnQkFBVyxHQUFHLEtBQUssQ0FBQztJQVR4QixDQUFDOzs7OztJQUlKLElBQ0ksT0FBTyxDQUFDLEtBQWM7UUFDeEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xDLENBQUM7Ozs7SUFJRCxrQkFBa0I7UUFDaEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQ3JCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVM7Ozs7UUFBQyxhQUFhLENBQUMsRUFBRTtZQUM1QyxJQUFJLENBQUMsV0FBVyxHQUFHLGFBQWEsQ0FBQztRQUNuQyxDQUFDLEVBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQzs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU87Ozs7UUFBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsRUFBQyxDQUFDO0lBQ3ZELENBQUM7OztZQTNERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtnQkFDN0IsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQW9CUDtnQkFDSCxJQUFJLEVBQUU7b0JBQ0osMkJBQTJCLEVBQUUsTUFBTTtvQkFDbkMsNkJBQTZCLEVBQUUsTUFBTTtvQkFDckMsNEJBQTRCLEVBQUUsb0JBQW9CO2lCQUNuRDthQUNGOzs7O1lBbkNRLFNBQVM7WUFEVCxnQkFBZ0I7WUFKaEIsTUFBTTtZQUdOLG1CQUFtQjs7O29CQWlEekIsZUFBZSxTQUFDLGVBQWU7c0JBRS9CLEtBQUssU0FBQyxjQUFjOzs7O0lBWHJCLDhDQUFzQzs7SUFTdEMscUNBQW9FOzs7OztJQU1wRSw2Q0FBMkM7O0lBQzNDLDJDQUEyQjs7SUFiekIseUNBQTJCOztJQUMzQixnREFBeUM7O0lBQ3pDLHNDQUFxQjs7SUFDckIsOENBQTBDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgQWZ0ZXJDb250ZW50SW5pdCwgQ29tcG9uZW50LCBDb250ZW50Q2hpbGRyZW4sIElucHV0LCBPbkRlc3Ryb3ksIFF1ZXJ5TGlzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IEV4cGFuZCB9IGZyb20gJy4uLy4uL3V0aWxzL2V4cGFuZC9wcm92aWRlcnMvZXhwYW5kJztcblxuaW1wb3J0IHsgQ2xyRGF0YWdyaWRDZWxsIH0gZnJvbSAnLi9kYXRhZ3JpZC1jZWxsJztcbmltcG9ydCB7IEV4cGFuZGFibGVSb3dzQ291bnQgfSBmcm9tICcuL3Byb3ZpZGVycy9nbG9iYWwtZXhwYW5kYWJsZS1yb3dzJztcbmltcG9ydCB7IFJvd0FjdGlvblNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9yb3ctYWN0aW9uLXNlcnZpY2UnO1xuaW1wb3J0IHsgU2VsZWN0aW9uIH0gZnJvbSAnLi9wcm92aWRlcnMvc2VsZWN0aW9uJztcbmltcG9ydCB7IFNlbGVjdGlvblR5cGUgfSBmcm9tICcuL2VudW1zL3NlbGVjdGlvbi10eXBlJztcblxuLyoqXG4gKiBHZW5lcmljIGJsYW5kIGNvbnRhaW5lciBzZXJ2aW5nIHZhcmlvdXMgcHVycG9zZXMgZm9yIERhdGFncmlkLlxuICogRm9yIGluc3RhbmNlLCBpdCBjYW4gaGVscCBzcGFuIGEgdGV4dCBvdmVyIG11bHRpcGxlIHJvd3MgaW4gZGV0YWlsIHZpZXcuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci1kZy1yb3ctZGV0YWlsJyxcbiAgdGVtcGxhdGU6IGBcbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFyZXBsYWNlZFJvd1wiPlxuICAgICAgICAgICAgPCEtLSBzcGFjZSBmb3IgbXVsdGlzZWxlY3Rpb24gc3RhdGUgLS0+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGF0YWdyaWQtY2VsbCBkYXRhZ3JpZC1zZWxlY3QgZGF0YWdyaWQtZml4ZWQtY29sdW1uXCJcbiAgICAgICAgICAgICAgICAqbmdJZj1cInNlbGVjdGlvbi5zZWxlY3Rpb25UeXBlID09PSBTRUxFQ1RJT05fVFlQRS5NdWx0aVwiPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8IS0tIHNwYWNlIGZvciBzaW5nbGUgc2VsZWN0aW9uIHN0YXRlIC0tPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRhdGFncmlkLWNlbGwgZGF0YWdyaWQtc2VsZWN0IGRhdGFncmlkLWZpeGVkLWNvbHVtblwiXG4gICAgICAgICAgICAgICAgKm5nSWY9XCJzZWxlY3Rpb24uc2VsZWN0aW9uVHlwZSA9PT0gU0VMRUNUSU9OX1RZUEUuU2luZ2xlXCI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwhLS0gc3BhY2UgZm9yIHNpbmdsZSByb3cgYWN0aW9uOyBvbmx5IGRpc3BsYXlUeXBlIGlmIHdlIGhhdmUgYXQgbGVhc3Qgb25lIGFjdGlvbmFibGUgcm93IGluIGRhdGFncmlkIC0tPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRhdGFncmlkLWNlbGwgZGF0YWdyaWQtcm93LWFjdGlvbnMgZGF0YWdyaWQtZml4ZWQtY29sdW1uXCJcbiAgICAgICAgICAgICAgICAqbmdJZj1cInJvd0FjdGlvblNlcnZpY2UuaGFzQWN0aW9uYWJsZVJvd1wiPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8IS0tIHNwYWNlIGZvciBleHBhbmRhYmxlIGNhcmV0IGFjdGlvbjsgb25seSBkaXNwbGF5VHlwZSBpZiB3ZSBoYXZlIGF0IGxlYXN0IG9uZSBleHBhbmRhYmxlIHJvdyBpbiBkYXRhZ3JpZCAtLT5cbiAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJleHBhbmRhYmxlUm93cy5oYXNFeHBhbmRhYmxlUm93XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiZGF0YWdyaWQtZXhwYW5kYWJsZS1jYXJldCBkYXRhZ3JpZC1maXhlZC1jb2x1bW4gZGF0YWdyaWQtY2VsbFwiPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgYCxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuZGF0YWdyaWQtcm93LWZsZXhdJzogJ3RydWUnLFxuICAgICdbY2xhc3MuZGF0YWdyaWQtcm93LWRldGFpbF0nOiAndHJ1ZScsXG4gICAgJ1tjbGFzcy5kYXRhZ3JpZC1jb250YWluZXJdJzogJ2NlbGxzLmxlbmd0aCA9PT0gMCcsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIENsckRhdGFncmlkUm93RGV0YWlsPFQgPSBhbnk+IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcbiAgLyogcmVmZXJlbmNlIHRvIHRoZSBlbnVtIHNvIHRoYXQgdGVtcGxhdGUgY2FuIGFjY2VzcyBpdCAqL1xuICBwdWJsaWMgU0VMRUNUSU9OX1RZUEUgPSBTZWxlY3Rpb25UeXBlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBzZWxlY3Rpb246IFNlbGVjdGlvbixcbiAgICBwdWJsaWMgcm93QWN0aW9uU2VydmljZTogUm93QWN0aW9uU2VydmljZSxcbiAgICBwdWJsaWMgZXhwYW5kOiBFeHBhbmQsXG4gICAgcHVibGljIGV4cGFuZGFibGVSb3dzOiBFeHBhbmRhYmxlUm93c0NvdW50XG4gICkge31cblxuICBAQ29udGVudENoaWxkcmVuKENsckRhdGFncmlkQ2VsbCkgY2VsbHM6IFF1ZXJ5TGlzdDxDbHJEYXRhZ3JpZENlbGw+O1xuXG4gIEBJbnB1dCgnY2xyRGdSZXBsYWNlJylcbiAgc2V0IHJlcGxhY2UodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmV4cGFuZC5zZXRSZXBsYWNlKCEhdmFsdWUpO1xuICB9XG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcbiAgcHVibGljIHJlcGxhY2VkUm93ID0gZmFsc2U7XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5leHBhbmQucmVwbGFjZS5zdWJzY3JpYmUocmVwbGFjZUNoYW5nZSA9PiB7XG4gICAgICAgIHRoaXMucmVwbGFjZWRSb3cgPSByZXBsYWNlQ2hhbmdlO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmZvckVhY2goc3ViID0+IHN1Yi51bnN1YnNjcmliZSgpKTtcbiAgfVxufVxuIl19