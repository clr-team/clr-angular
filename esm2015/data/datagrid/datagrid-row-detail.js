/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ContentChildren, Input, QueryList } from '@angular/core';
import { ClrDatagridCell } from './datagrid-cell';
import { ExpandableRowsCount } from './providers/global-expandable-rows';
import { RowActionService } from './providers/row-action-service';
import { Selection } from './providers/selection';
import { SelectionType } from './enums/selection-type';
import { DatagridIfExpandService } from './datagrid-if-expanded.service';
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
    { type: DatagridIfExpandService },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtcm93LWRldGFpbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvZGF0YWdyaWQtcm93LWRldGFpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFLQSxPQUFPLEVBQW9CLFNBQVMsRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFhLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUcxRyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDbEQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDekUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDbEUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2xELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQzs7Ozs7O0FBbUN6RSxNQUFNLE9BQU8sb0JBQW9COzs7Ozs7O0lBSS9CLFlBQ1MsU0FBb0IsRUFDcEIsZ0JBQWtDLEVBQ2xDLE1BQStCLEVBQy9CLGNBQW1DO1FBSG5DLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxXQUFNLEdBQU4sTUFBTSxDQUF5QjtRQUMvQixtQkFBYyxHQUFkLGNBQWMsQ0FBcUI7O1FBTnJDLG1CQUFjLEdBQUcsYUFBYSxDQUFDO1FBZTlCLGtCQUFhLEdBQW1CLEVBQUUsQ0FBQztRQUNwQyxnQkFBVyxHQUFHLEtBQUssQ0FBQztJQVR4QixDQUFDOzs7OztJQUlKLElBQ0ksT0FBTyxDQUFDLEtBQWM7UUFDeEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xDLENBQUM7Ozs7SUFJRCxrQkFBa0I7UUFDaEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQ3JCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVM7Ozs7UUFBQyxhQUFhLENBQUMsRUFBRTtZQUM1QyxJQUFJLENBQUMsV0FBVyxHQUFHLGFBQWEsQ0FBQztRQUNuQyxDQUFDLEVBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQzs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU87Ozs7UUFBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsRUFBQyxDQUFDO0lBQ3ZELENBQUM7OztZQTNERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtnQkFDN0IsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQW9CUDtnQkFDSCxJQUFJLEVBQUU7b0JBQ0osMkJBQTJCLEVBQUUsTUFBTTtvQkFDbkMsNkJBQTZCLEVBQUUsTUFBTTtvQkFDckMsNEJBQTRCLEVBQUUsb0JBQW9CO2lCQUNuRDthQUNGOzs7O1lBcENRLFNBQVM7WUFEVCxnQkFBZ0I7WUFHaEIsdUJBQXVCO1lBSnZCLG1CQUFtQjs7O29CQWtEekIsZUFBZSxTQUFDLGVBQWU7c0JBRS9CLEtBQUssU0FBQyxjQUFjOzs7O0lBWHJCLDhDQUFzQzs7SUFTdEMscUNBQW9FOzs7OztJQU1wRSw2Q0FBMkM7O0lBQzNDLDJDQUEyQjs7SUFiekIseUNBQTJCOztJQUMzQixnREFBeUM7O0lBQ3pDLHNDQUFzQzs7SUFDdEMsOENBQTBDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgQWZ0ZXJDb250ZW50SW5pdCwgQ29tcG9uZW50LCBDb250ZW50Q2hpbGRyZW4sIElucHV0LCBPbkRlc3Ryb3ksIFF1ZXJ5TGlzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IENsckRhdGFncmlkQ2VsbCB9IGZyb20gJy4vZGF0YWdyaWQtY2VsbCc7XG5pbXBvcnQgeyBFeHBhbmRhYmxlUm93c0NvdW50IH0gZnJvbSAnLi9wcm92aWRlcnMvZ2xvYmFsLWV4cGFuZGFibGUtcm93cyc7XG5pbXBvcnQgeyBSb3dBY3Rpb25TZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvcm93LWFjdGlvbi1zZXJ2aWNlJztcbmltcG9ydCB7IFNlbGVjdGlvbiB9IGZyb20gJy4vcHJvdmlkZXJzL3NlbGVjdGlvbic7XG5pbXBvcnQgeyBTZWxlY3Rpb25UeXBlIH0gZnJvbSAnLi9lbnVtcy9zZWxlY3Rpb24tdHlwZSc7XG5pbXBvcnQgeyBEYXRhZ3JpZElmRXhwYW5kU2VydmljZSB9IGZyb20gJy4vZGF0YWdyaWQtaWYtZXhwYW5kZWQuc2VydmljZSc7XG5cbi8qKlxuICogR2VuZXJpYyBibGFuZCBjb250YWluZXIgc2VydmluZyB2YXJpb3VzIHB1cnBvc2VzIGZvciBEYXRhZ3JpZC5cbiAqIEZvciBpbnN0YW5jZSwgaXQgY2FuIGhlbHAgc3BhbiBhIHRleHQgb3ZlciBtdWx0aXBsZSByb3dzIGluIGRldGFpbCB2aWV3LlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItZGctcm93LWRldGFpbCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhcmVwbGFjZWRSb3dcIj5cbiAgICAgICAgICAgIDwhLS0gc3BhY2UgZm9yIG11bHRpc2VsZWN0aW9uIHN0YXRlIC0tPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRhdGFncmlkLWNlbGwgZGF0YWdyaWQtc2VsZWN0IGRhdGFncmlkLWZpeGVkLWNvbHVtblwiXG4gICAgICAgICAgICAgICAgKm5nSWY9XCJzZWxlY3Rpb24uc2VsZWN0aW9uVHlwZSA9PT0gU0VMRUNUSU9OX1RZUEUuTXVsdGlcIj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPCEtLSBzcGFjZSBmb3Igc2luZ2xlIHNlbGVjdGlvbiBzdGF0ZSAtLT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkYXRhZ3JpZC1jZWxsIGRhdGFncmlkLXNlbGVjdCBkYXRhZ3JpZC1maXhlZC1jb2x1bW5cIlxuICAgICAgICAgICAgICAgICpuZ0lmPVwic2VsZWN0aW9uLnNlbGVjdGlvblR5cGUgPT09IFNFTEVDVElPTl9UWVBFLlNpbmdsZVwiPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8IS0tIHNwYWNlIGZvciBzaW5nbGUgcm93IGFjdGlvbjsgb25seSBkaXNwbGF5VHlwZSBpZiB3ZSBoYXZlIGF0IGxlYXN0IG9uZSBhY3Rpb25hYmxlIHJvdyBpbiBkYXRhZ3JpZCAtLT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkYXRhZ3JpZC1jZWxsIGRhdGFncmlkLXJvdy1hY3Rpb25zIGRhdGFncmlkLWZpeGVkLWNvbHVtblwiXG4gICAgICAgICAgICAgICAgKm5nSWY9XCJyb3dBY3Rpb25TZXJ2aWNlLmhhc0FjdGlvbmFibGVSb3dcIj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPCEtLSBzcGFjZSBmb3IgZXhwYW5kYWJsZSBjYXJldCBhY3Rpb247IG9ubHkgZGlzcGxheVR5cGUgaWYgd2UgaGF2ZSBhdCBsZWFzdCBvbmUgZXhwYW5kYWJsZSByb3cgaW4gZGF0YWdyaWQgLS0+XG4gICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiZXhwYW5kYWJsZVJvd3MuaGFzRXhwYW5kYWJsZVJvd1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImRhdGFncmlkLWV4cGFuZGFibGUtY2FyZXQgZGF0YWdyaWQtZml4ZWQtY29sdW1uIGRhdGFncmlkLWNlbGxcIj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIGAsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmRhdGFncmlkLXJvdy1mbGV4XSc6ICd0cnVlJyxcbiAgICAnW2NsYXNzLmRhdGFncmlkLXJvdy1kZXRhaWxdJzogJ3RydWUnLFxuICAgICdbY2xhc3MuZGF0YWdyaWQtY29udGFpbmVyXSc6ICdjZWxscy5sZW5ndGggPT09IDAnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBDbHJEYXRhZ3JpZFJvd0RldGFpbDxUID0gYW55PiBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XG4gIC8qIHJlZmVyZW5jZSB0byB0aGUgZW51bSBzbyB0aGF0IHRlbXBsYXRlIGNhbiBhY2Nlc3MgaXQgKi9cbiAgcHVibGljIFNFTEVDVElPTl9UWVBFID0gU2VsZWN0aW9uVHlwZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgc2VsZWN0aW9uOiBTZWxlY3Rpb24sXG4gICAgcHVibGljIHJvd0FjdGlvblNlcnZpY2U6IFJvd0FjdGlvblNlcnZpY2UsXG4gICAgcHVibGljIGV4cGFuZDogRGF0YWdyaWRJZkV4cGFuZFNlcnZpY2UsXG4gICAgcHVibGljIGV4cGFuZGFibGVSb3dzOiBFeHBhbmRhYmxlUm93c0NvdW50XG4gICkge31cblxuICBAQ29udGVudENoaWxkcmVuKENsckRhdGFncmlkQ2VsbCkgY2VsbHM6IFF1ZXJ5TGlzdDxDbHJEYXRhZ3JpZENlbGw+O1xuXG4gIEBJbnB1dCgnY2xyRGdSZXBsYWNlJylcbiAgc2V0IHJlcGxhY2UodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmV4cGFuZC5zZXRSZXBsYWNlKCEhdmFsdWUpO1xuICB9XG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcbiAgcHVibGljIHJlcGxhY2VkUm93ID0gZmFsc2U7XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5leHBhbmQucmVwbGFjZS5zdWJzY3JpYmUocmVwbGFjZUNoYW5nZSA9PiB7XG4gICAgICAgIHRoaXMucmVwbGFjZWRSb3cgPSByZXBsYWNlQ2hhbmdlO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmZvckVhY2goc3ViID0+IHN1Yi51bnN1YnNjcmliZSgpKTtcbiAgfVxufVxuIl19