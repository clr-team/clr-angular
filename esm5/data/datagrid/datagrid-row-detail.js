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
        { type: DatagridIfExpandService },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtcm93LWRldGFpbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvZGF0YWdyaWQtcm93LWRldGFpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFLQSxPQUFPLEVBQW9CLFNBQVMsRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFhLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUcxRyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDbEQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDekUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDbEUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2xELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQzs7Ozs7O0FBTXpFO0lBaUNFLDhCQUNTLFNBQW9CLEVBQ3BCLGdCQUFrQyxFQUNsQyxNQUErQixFQUMvQixjQUFtQztRQUhuQyxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ3BCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsV0FBTSxHQUFOLE1BQU0sQ0FBeUI7UUFDL0IsbUJBQWMsR0FBZCxjQUFjLENBQXFCOztRQU5yQyxtQkFBYyxHQUFHLGFBQWEsQ0FBQztRQWU5QixrQkFBYSxHQUFtQixFQUFFLENBQUM7UUFDcEMsZ0JBQVcsR0FBRyxLQUFLLENBQUM7SUFUeEIsQ0FBQztJQUlKLHNCQUNJLHlDQUFPOzs7OztRQURYLFVBQ1ksS0FBYztZQUN4QixJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbEMsQ0FBQzs7O09BQUE7Ozs7SUFJRCxpREFBa0I7OztJQUFsQjtRQUFBLGlCQU1DO1FBTEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQ3JCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVM7Ozs7UUFBQyxVQUFBLGFBQWE7WUFDekMsS0FBSSxDQUFDLFdBQVcsR0FBRyxhQUFhLENBQUM7UUFDbkMsQ0FBQyxFQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7Ozs7SUFFRCwwQ0FBVzs7O0lBQVg7UUFDRSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU87Ozs7UUFBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxXQUFXLEVBQUUsRUFBakIsQ0FBaUIsRUFBQyxDQUFDO0lBQ3ZELENBQUM7O2dCQTNERixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtvQkFDN0IsUUFBUSxFQUFFLCtvQ0FvQlA7b0JBQ0gsSUFBSSxFQUFFO3dCQUNKLDJCQUEyQixFQUFFLE1BQU07d0JBQ25DLDZCQUE2QixFQUFFLE1BQU07d0JBQ3JDLDRCQUE0QixFQUFFLG9CQUFvQjtxQkFDbkQ7aUJBQ0Y7Ozs7Z0JBcENRLFNBQVM7Z0JBRFQsZ0JBQWdCO2dCQUdoQix1QkFBdUI7Z0JBSnZCLG1CQUFtQjs7O3dCQWtEekIsZUFBZSxTQUFDLGVBQWU7MEJBRS9CLEtBQUssU0FBQyxjQUFjOztJQWtCdkIsMkJBQUM7Q0FBQSxBQTVERCxJQTREQztTQS9CWSxvQkFBb0I7OztJQUUvQiw4Q0FBc0M7O0lBU3RDLHFDQUFvRTs7Ozs7SUFNcEUsNkNBQTJDOztJQUMzQywyQ0FBMkI7O0lBYnpCLHlDQUEyQjs7SUFDM0IsZ0RBQXlDOztJQUN6QyxzQ0FBc0M7O0lBQ3RDLDhDQUEwQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IEFmdGVyQ29udGVudEluaXQsIENvbXBvbmVudCwgQ29udGVudENoaWxkcmVuLCBJbnB1dCwgT25EZXN0cm95LCBRdWVyeUxpc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBDbHJEYXRhZ3JpZENlbGwgfSBmcm9tICcuL2RhdGFncmlkLWNlbGwnO1xuaW1wb3J0IHsgRXhwYW5kYWJsZVJvd3NDb3VudCB9IGZyb20gJy4vcHJvdmlkZXJzL2dsb2JhbC1leHBhbmRhYmxlLXJvd3MnO1xuaW1wb3J0IHsgUm93QWN0aW9uU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL3Jvdy1hY3Rpb24tc2VydmljZSc7XG5pbXBvcnQgeyBTZWxlY3Rpb24gfSBmcm9tICcuL3Byb3ZpZGVycy9zZWxlY3Rpb24nO1xuaW1wb3J0IHsgU2VsZWN0aW9uVHlwZSB9IGZyb20gJy4vZW51bXMvc2VsZWN0aW9uLXR5cGUnO1xuaW1wb3J0IHsgRGF0YWdyaWRJZkV4cGFuZFNlcnZpY2UgfSBmcm9tICcuL2RhdGFncmlkLWlmLWV4cGFuZGVkLnNlcnZpY2UnO1xuXG4vKipcbiAqIEdlbmVyaWMgYmxhbmQgY29udGFpbmVyIHNlcnZpbmcgdmFyaW91cyBwdXJwb3NlcyBmb3IgRGF0YWdyaWQuXG4gKiBGb3IgaW5zdGFuY2UsIGl0IGNhbiBoZWxwIHNwYW4gYSB0ZXh0IG92ZXIgbXVsdGlwbGUgcm93cyBpbiBkZXRhaWwgdmlldy5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLWRnLXJvdy1kZXRhaWwnLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIXJlcGxhY2VkUm93XCI+XG4gICAgICAgICAgICA8IS0tIHNwYWNlIGZvciBtdWx0aXNlbGVjdGlvbiBzdGF0ZSAtLT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkYXRhZ3JpZC1jZWxsIGRhdGFncmlkLXNlbGVjdCBkYXRhZ3JpZC1maXhlZC1jb2x1bW5cIlxuICAgICAgICAgICAgICAgICpuZ0lmPVwic2VsZWN0aW9uLnNlbGVjdGlvblR5cGUgPT09IFNFTEVDVElPTl9UWVBFLk11bHRpXCI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwhLS0gc3BhY2UgZm9yIHNpbmdsZSBzZWxlY3Rpb24gc3RhdGUgLS0+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGF0YWdyaWQtY2VsbCBkYXRhZ3JpZC1zZWxlY3QgZGF0YWdyaWQtZml4ZWQtY29sdW1uXCJcbiAgICAgICAgICAgICAgICAqbmdJZj1cInNlbGVjdGlvbi5zZWxlY3Rpb25UeXBlID09PSBTRUxFQ1RJT05fVFlQRS5TaW5nbGVcIj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPCEtLSBzcGFjZSBmb3Igc2luZ2xlIHJvdyBhY3Rpb247IG9ubHkgZGlzcGxheVR5cGUgaWYgd2UgaGF2ZSBhdCBsZWFzdCBvbmUgYWN0aW9uYWJsZSByb3cgaW4gZGF0YWdyaWQgLS0+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGF0YWdyaWQtY2VsbCBkYXRhZ3JpZC1yb3ctYWN0aW9ucyBkYXRhZ3JpZC1maXhlZC1jb2x1bW5cIlxuICAgICAgICAgICAgICAgICpuZ0lmPVwicm93QWN0aW9uU2VydmljZS5oYXNBY3Rpb25hYmxlUm93XCI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwhLS0gc3BhY2UgZm9yIGV4cGFuZGFibGUgY2FyZXQgYWN0aW9uOyBvbmx5IGRpc3BsYXlUeXBlIGlmIHdlIGhhdmUgYXQgbGVhc3Qgb25lIGV4cGFuZGFibGUgcm93IGluIGRhdGFncmlkIC0tPlxuICAgICAgICAgICAgPGRpdiAqbmdJZj1cImV4cGFuZGFibGVSb3dzLmhhc0V4cGFuZGFibGVSb3dcIlxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJkYXRhZ3JpZC1leHBhbmRhYmxlLWNhcmV0IGRhdGFncmlkLWZpeGVkLWNvbHVtbiBkYXRhZ3JpZC1jZWxsXCI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICBgLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5kYXRhZ3JpZC1yb3ctZmxleF0nOiAndHJ1ZScsXG4gICAgJ1tjbGFzcy5kYXRhZ3JpZC1yb3ctZGV0YWlsXSc6ICd0cnVlJyxcbiAgICAnW2NsYXNzLmRhdGFncmlkLWNvbnRhaW5lcl0nOiAnY2VsbHMubGVuZ3RoID09PSAwJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyRGF0YWdyaWRSb3dEZXRhaWw8VCA9IGFueT4gaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuICAvKiByZWZlcmVuY2UgdG8gdGhlIGVudW0gc28gdGhhdCB0ZW1wbGF0ZSBjYW4gYWNjZXNzIGl0ICovXG4gIHB1YmxpYyBTRUxFQ1RJT05fVFlQRSA9IFNlbGVjdGlvblR5cGU7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIHNlbGVjdGlvbjogU2VsZWN0aW9uLFxuICAgIHB1YmxpYyByb3dBY3Rpb25TZXJ2aWNlOiBSb3dBY3Rpb25TZXJ2aWNlLFxuICAgIHB1YmxpYyBleHBhbmQ6IERhdGFncmlkSWZFeHBhbmRTZXJ2aWNlLFxuICAgIHB1YmxpYyBleHBhbmRhYmxlUm93czogRXhwYW5kYWJsZVJvd3NDb3VudFxuICApIHt9XG5cbiAgQENvbnRlbnRDaGlsZHJlbihDbHJEYXRhZ3JpZENlbGwpIGNlbGxzOiBRdWVyeUxpc3Q8Q2xyRGF0YWdyaWRDZWxsPjtcblxuICBASW5wdXQoJ2NsckRnUmVwbGFjZScpXG4gIHNldCByZXBsYWNlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5leHBhbmQuc2V0UmVwbGFjZSghIXZhbHVlKTtcbiAgfVxuICBwcml2YXRlIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG4gIHB1YmxpYyByZXBsYWNlZFJvdyA9IGZhbHNlO1xuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMuZXhwYW5kLnJlcGxhY2Uuc3Vic2NyaWJlKHJlcGxhY2VDaGFuZ2UgPT4ge1xuICAgICAgICB0aGlzLnJlcGxhY2VkUm93ID0gcmVwbGFjZUNoYW5nZTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHN1YiA9PiBzdWIudW5zdWJzY3JpYmUoKSk7XG4gIH1cbn1cbiJdfQ==