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
var ClrDatagridRowDetail = /** @class */ (function () {
    function ClrDatagridRowDetail(selection, rowActionService, expand, expandableRows) {
        this.selection = selection;
        this.rowActionService = rowActionService;
        this.expand = expand;
        this.expandableRows = expandableRows;
        /* reference to the enum so that template can access it */
        this.SELECTION_TYPE = SelectionType;
        this.subscriptions = [];
        this.replacedRow = false;
    }
    Object.defineProperty(ClrDatagridRowDetail.prototype, "replace", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.expand.setReplace(!!value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ClrDatagridRowDetail.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.subscriptions.push(this.expand.replace.subscribe((/**
         * @param {?} replaceChange
         * @return {?}
         */
        function (replaceChange) {
            _this.replacedRow = replaceChange;
        })));
    };
    /**
     * @return {?}
     */
    ClrDatagridRowDetail.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        function (sub) { return sub.unsubscribe(); }));
    };
    ClrDatagridRowDetail.decorators = [
        { type: Component, args: [{
                    selector: 'clr-dg-row-detail',
                    template: "\n        <ng-container *ngIf=\"!replacedRow\">\n            <!-- space for multiselection state -->\n            <div class=\"datagrid-cell datagrid-select datagrid-fixed-column\"\n                *ngIf=\"selection.selectionType === SELECTION_TYPE.Multi\">\n            </div>\n            <!-- space for single selection state -->\n            <div class=\"datagrid-cell datagrid-select datagrid-fixed-column\"\n                *ngIf=\"selection.selectionType === SELECTION_TYPE.Single\">\n            </div>\n            <!-- space for single row action; only displayType if we have at least one actionable row in datagrid -->\n            <div class=\"datagrid-cell datagrid-row-actions datagrid-fixed-column\"\n                *ngIf=\"rowActionService.hasActionableRow\">\n            </div>\n            <!-- space for expandable caret action; only displayType if we have at least one expandable row in datagrid -->\n            <div *ngIf=\"expandableRows.hasExpandableRow\"\n                        class=\"datagrid-expandable-caret datagrid-fixed-column datagrid-cell\">\n            </div>\n        </ng-container>\n        <ng-content></ng-content>\n    ",
                    host: {
                        '[class.datagrid-row-flex]': 'true',
                        '[class.datagrid-row-detail]': 'true',
                        '[class.datagrid-container]': 'cells.length === 0',
                    }
                }] }
    ];
    /** @nocollapse */
    ClrDatagridRowDetail.ctorParameters = function () { return [
        { type: Selection },
        { type: RowActionService },
        { type: Expand },
        { type: ExpandableRowsCount }
    ]; };
    ClrDatagridRowDetail.propDecorators = {
        cells: [{ type: ContentChildren, args: [ClrDatagridCell,] }],
        replace: [{ type: Input, args: ['clrDgReplace',] }]
    };
    return ClrDatagridRowDetail;
}());
export { ClrDatagridRowDetail };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtcm93LWRldGFpbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvZGF0YWdyaWQtcm93LWRldGFpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFLQSxPQUFPLEVBQW9CLFNBQVMsRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFhLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUcxRyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFFN0QsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7Ozs7OztBQU12RDtJQWlDRSw4QkFDUyxTQUFvQixFQUNwQixnQkFBa0MsRUFDbEMsTUFBYyxFQUNkLGNBQW1DO1FBSG5DLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsbUJBQWMsR0FBZCxjQUFjLENBQXFCOztRQU5yQyxtQkFBYyxHQUFHLGFBQWEsQ0FBQztRQWU5QixrQkFBYSxHQUFtQixFQUFFLENBQUM7UUFDcEMsZ0JBQVcsR0FBRyxLQUFLLENBQUM7SUFUeEIsQ0FBQztJQUlKLHNCQUNJLHlDQUFPOzs7OztRQURYLFVBQ1ksS0FBYztZQUN4QixJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbEMsQ0FBQzs7O09BQUE7Ozs7SUFJRCxpREFBa0I7OztJQUFsQjtRQUFBLGlCQU1DO1FBTEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQ3JCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVM7Ozs7UUFBQyxVQUFBLGFBQWE7WUFDekMsS0FBSSxDQUFDLFdBQVcsR0FBRyxhQUFhLENBQUM7UUFDbkMsQ0FBQyxFQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7Ozs7SUFFRCwwQ0FBVzs7O0lBQVg7UUFDRSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU87Ozs7UUFBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxXQUFXLEVBQUUsRUFBakIsQ0FBaUIsRUFBQyxDQUFDO0lBQ3ZELENBQUM7O2dCQTNERixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtvQkFDN0IsUUFBUSxFQUFFLCtvQ0FvQlA7b0JBQ0gsSUFBSSxFQUFFO3dCQUNKLDJCQUEyQixFQUFFLE1BQU07d0JBQ25DLDZCQUE2QixFQUFFLE1BQU07d0JBQ3JDLDRCQUE0QixFQUFFLG9CQUFvQjtxQkFDbkQ7aUJBQ0Y7Ozs7Z0JBbkNRLFNBQVM7Z0JBRFQsZ0JBQWdCO2dCQUpoQixNQUFNO2dCQUdOLG1CQUFtQjs7O3dCQWlEekIsZUFBZSxTQUFDLGVBQWU7MEJBRS9CLEtBQUssU0FBQyxjQUFjOztJQWtCdkIsMkJBQUM7Q0FBQSxBQTVERCxJQTREQztTQS9CWSxvQkFBb0I7OztJQUUvQiw4Q0FBc0M7O0lBU3RDLHFDQUFvRTs7Ozs7SUFNcEUsNkNBQTJDOztJQUMzQywyQ0FBMkI7O0lBYnpCLHlDQUEyQjs7SUFDM0IsZ0RBQXlDOztJQUN6QyxzQ0FBcUI7O0lBQ3JCLDhDQUEwQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IEFmdGVyQ29udGVudEluaXQsIENvbXBvbmVudCwgQ29udGVudENoaWxkcmVuLCBJbnB1dCwgT25EZXN0cm95LCBRdWVyeUxpc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBFeHBhbmQgfSBmcm9tICcuLi8uLi91dGlscy9leHBhbmQvcHJvdmlkZXJzL2V4cGFuZCc7XG5cbmltcG9ydCB7IENsckRhdGFncmlkQ2VsbCB9IGZyb20gJy4vZGF0YWdyaWQtY2VsbCc7XG5pbXBvcnQgeyBFeHBhbmRhYmxlUm93c0NvdW50IH0gZnJvbSAnLi9wcm92aWRlcnMvZ2xvYmFsLWV4cGFuZGFibGUtcm93cyc7XG5pbXBvcnQgeyBSb3dBY3Rpb25TZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvcm93LWFjdGlvbi1zZXJ2aWNlJztcbmltcG9ydCB7IFNlbGVjdGlvbiB9IGZyb20gJy4vcHJvdmlkZXJzL3NlbGVjdGlvbic7XG5pbXBvcnQgeyBTZWxlY3Rpb25UeXBlIH0gZnJvbSAnLi9lbnVtcy9zZWxlY3Rpb24tdHlwZSc7XG5cbi8qKlxuICogR2VuZXJpYyBibGFuZCBjb250YWluZXIgc2VydmluZyB2YXJpb3VzIHB1cnBvc2VzIGZvciBEYXRhZ3JpZC5cbiAqIEZvciBpbnN0YW5jZSwgaXQgY2FuIGhlbHAgc3BhbiBhIHRleHQgb3ZlciBtdWx0aXBsZSByb3dzIGluIGRldGFpbCB2aWV3LlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItZGctcm93LWRldGFpbCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhcmVwbGFjZWRSb3dcIj5cbiAgICAgICAgICAgIDwhLS0gc3BhY2UgZm9yIG11bHRpc2VsZWN0aW9uIHN0YXRlIC0tPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRhdGFncmlkLWNlbGwgZGF0YWdyaWQtc2VsZWN0IGRhdGFncmlkLWZpeGVkLWNvbHVtblwiXG4gICAgICAgICAgICAgICAgKm5nSWY9XCJzZWxlY3Rpb24uc2VsZWN0aW9uVHlwZSA9PT0gU0VMRUNUSU9OX1RZUEUuTXVsdGlcIj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPCEtLSBzcGFjZSBmb3Igc2luZ2xlIHNlbGVjdGlvbiBzdGF0ZSAtLT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkYXRhZ3JpZC1jZWxsIGRhdGFncmlkLXNlbGVjdCBkYXRhZ3JpZC1maXhlZC1jb2x1bW5cIlxuICAgICAgICAgICAgICAgICpuZ0lmPVwic2VsZWN0aW9uLnNlbGVjdGlvblR5cGUgPT09IFNFTEVDVElPTl9UWVBFLlNpbmdsZVwiPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8IS0tIHNwYWNlIGZvciBzaW5nbGUgcm93IGFjdGlvbjsgb25seSBkaXNwbGF5VHlwZSBpZiB3ZSBoYXZlIGF0IGxlYXN0IG9uZSBhY3Rpb25hYmxlIHJvdyBpbiBkYXRhZ3JpZCAtLT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkYXRhZ3JpZC1jZWxsIGRhdGFncmlkLXJvdy1hY3Rpb25zIGRhdGFncmlkLWZpeGVkLWNvbHVtblwiXG4gICAgICAgICAgICAgICAgKm5nSWY9XCJyb3dBY3Rpb25TZXJ2aWNlLmhhc0FjdGlvbmFibGVSb3dcIj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPCEtLSBzcGFjZSBmb3IgZXhwYW5kYWJsZSBjYXJldCBhY3Rpb247IG9ubHkgZGlzcGxheVR5cGUgaWYgd2UgaGF2ZSBhdCBsZWFzdCBvbmUgZXhwYW5kYWJsZSByb3cgaW4gZGF0YWdyaWQgLS0+XG4gICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiZXhwYW5kYWJsZVJvd3MuaGFzRXhwYW5kYWJsZVJvd1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImRhdGFncmlkLWV4cGFuZGFibGUtY2FyZXQgZGF0YWdyaWQtZml4ZWQtY29sdW1uIGRhdGFncmlkLWNlbGxcIj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIGAsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmRhdGFncmlkLXJvdy1mbGV4XSc6ICd0cnVlJyxcbiAgICAnW2NsYXNzLmRhdGFncmlkLXJvdy1kZXRhaWxdJzogJ3RydWUnLFxuICAgICdbY2xhc3MuZGF0YWdyaWQtY29udGFpbmVyXSc6ICdjZWxscy5sZW5ndGggPT09IDAnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBDbHJEYXRhZ3JpZFJvd0RldGFpbDxUID0gYW55PiBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XG4gIC8qIHJlZmVyZW5jZSB0byB0aGUgZW51bSBzbyB0aGF0IHRlbXBsYXRlIGNhbiBhY2Nlc3MgaXQgKi9cbiAgcHVibGljIFNFTEVDVElPTl9UWVBFID0gU2VsZWN0aW9uVHlwZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgc2VsZWN0aW9uOiBTZWxlY3Rpb24sXG4gICAgcHVibGljIHJvd0FjdGlvblNlcnZpY2U6IFJvd0FjdGlvblNlcnZpY2UsXG4gICAgcHVibGljIGV4cGFuZDogRXhwYW5kLFxuICAgIHB1YmxpYyBleHBhbmRhYmxlUm93czogRXhwYW5kYWJsZVJvd3NDb3VudFxuICApIHt9XG5cbiAgQENvbnRlbnRDaGlsZHJlbihDbHJEYXRhZ3JpZENlbGwpIGNlbGxzOiBRdWVyeUxpc3Q8Q2xyRGF0YWdyaWRDZWxsPjtcblxuICBASW5wdXQoJ2NsckRnUmVwbGFjZScpXG4gIHNldCByZXBsYWNlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5leHBhbmQuc2V0UmVwbGFjZSghIXZhbHVlKTtcbiAgfVxuICBwcml2YXRlIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG4gIHB1YmxpYyByZXBsYWNlZFJvdyA9IGZhbHNlO1xuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMuZXhwYW5kLnJlcGxhY2Uuc3Vic2NyaWJlKHJlcGxhY2VDaGFuZ2UgPT4ge1xuICAgICAgICB0aGlzLnJlcGxhY2VkUm93ID0gcmVwbGFjZUNoYW5nZTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHN1YiA9PiBzdWIudW5zdWJzY3JpYmUoKSk7XG4gIH1cbn1cbiJdfQ==