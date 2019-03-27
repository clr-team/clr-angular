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
import { HideableColumnService } from './providers/hideable-column.service';
import { RowActionService } from './providers/row-action-service';
import { Selection } from './providers/selection';
import { SelectionType } from './enums/selection-type';
/**
 * Generic bland container serving various purposes for Datagrid.
 * For instance, it can help span a text over multiple rows in detail view.
 * @template T
 */
var ClrDatagridRowDetail = /** @class */ (function () {
    function ClrDatagridRowDetail(selection, rowActionService, expand, hideableColumnService, expandableRows) {
        this.selection = selection;
        this.rowActionService = rowActionService;
        this.expand = expand;
        this.hideableColumnService = hideableColumnService;
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
        /** @type {?} */
        var columnsList = this.hideableColumnService.getColumns();
        this.updateCellsForColumns(columnsList);
        // Triggered when the Cells list changes per row-renderer
        this.subscriptions.push(this.cells.changes.subscribe((/**
         * @param {?} cellList
         * @return {?}
         */
        function (cellList) {
            /** @type {?} */
            var columnList = _this.hideableColumnService.getColumns();
            if (cellList.length === columnList.length) {
                _this.updateCellsForColumns(columnList);
            }
        })));
        // Used to set things up the first time but only after all the columns are ready.
        this.subscriptions.push(this.hideableColumnService.columnListChange.subscribe((/**
         * @param {?} columnList
         * @return {?}
         */
        function (columnList) {
            // Prevents cell updates when cols and cells array are not aligned
            if (columnList.length === _this.cells.length) {
                _this.updateCellsForColumns(columnList);
            }
        })));
        this.subscriptions.push(this.expand.replace.subscribe((/**
         * @param {?} replaceChange
         * @return {?}
         */
        function (replaceChange) {
            _this.replacedRow = replaceChange;
        })));
    };
    /**
     * @param {?} columnList
     * @return {?}
     */
    ClrDatagridRowDetail.prototype.updateCellsForColumns = /**
     * @param {?} columnList
     * @return {?}
     */
    function (columnList) {
        this.cells.forEach((/**
         * @param {?} cell
         * @param {?} index
         * @return {?}
         */
        function (cell, index) {
            /** @type {?} */
            var currentColumn = columnList[index];
            if (currentColumn) {
                cell.id = currentColumn.id;
            }
        }));
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
        { type: HideableColumnService },
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
    ClrDatagridRowDetail.prototype.hideableColumnService;
    /** @type {?} */
    ClrDatagridRowDetail.prototype.expandableRows;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtcm93LWRldGFpbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvZGF0YWdyaWQtcm93LWRldGFpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFLQSxPQUFPLEVBQW9CLFNBQVMsRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFhLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUcxRyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFFN0QsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRWxELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzVFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7Ozs7OztBQU12RDtJQWlDRSw4QkFDUyxTQUFvQixFQUNwQixnQkFBa0MsRUFDbEMsTUFBYyxFQUNkLHFCQUE0QyxFQUM1QyxjQUFtQztRQUpuQyxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ3BCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBdUI7UUFDNUMsbUJBQWMsR0FBZCxjQUFjLENBQXFCOztRQVByQyxtQkFBYyxHQUFHLGFBQWEsQ0FBQztRQWlCOUIsa0JBQWEsR0FBbUIsRUFBRSxDQUFDO1FBQ3BDLGdCQUFXLEdBQUcsS0FBSyxDQUFDO0lBVnhCLENBQUM7SUFJSixzQkFDSSx5Q0FBTzs7Ozs7UUFEWCxVQUNZLEtBQWM7WUFDeEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xDLENBQUM7OztPQUFBOzs7O0lBS0QsaURBQWtCOzs7SUFBbEI7UUFBQSxpQkE2QkM7O1lBNUJPLFdBQVcsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsVUFBVSxFQUFFO1FBQzNELElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUV4Qyx5REFBeUQ7UUFDekQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQ3JCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFNBQVM7Ozs7UUFBQyxVQUFBLFFBQVE7O2dCQUM3QixVQUFVLEdBQUcsS0FBSSxDQUFDLHFCQUFxQixDQUFDLFVBQVUsRUFBRTtZQUMxRCxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssVUFBVSxDQUFDLE1BQU0sRUFBRTtnQkFDekMsS0FBSSxDQUFDLHFCQUFxQixDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ3hDO1FBQ0gsQ0FBQyxFQUFDLENBQ0gsQ0FBQztRQUVGLGlGQUFpRjtRQUNqRixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FDckIsSUFBSSxDQUFDLHFCQUFxQixDQUFDLGdCQUFnQixDQUFDLFNBQVM7Ozs7UUFBQyxVQUFBLFVBQVU7WUFDOUQsa0VBQWtFO1lBQ2xFLElBQUksVUFBVSxDQUFDLE1BQU0sS0FBSyxLQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtnQkFDM0MsS0FBSSxDQUFDLHFCQUFxQixDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ3hDO1FBQ0gsQ0FBQyxFQUFDLENBQ0gsQ0FBQztRQUVGLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUNyQixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTOzs7O1FBQUMsVUFBQSxhQUFhO1lBQ3pDLEtBQUksQ0FBQyxXQUFXLEdBQUcsYUFBYSxDQUFDO1FBQ25DLENBQUMsRUFBQyxDQUNILENBQUM7SUFDSixDQUFDOzs7OztJQUVNLG9EQUFxQjs7OztJQUE1QixVQUE2QixVQUF5QztRQUNwRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU87Ozs7O1FBQUMsVUFBQyxJQUFJLEVBQUUsS0FBSzs7Z0JBQ3ZCLGFBQWEsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDO1lBQ3ZDLElBQUksYUFBYSxFQUFFO2dCQUNqQixJQUFJLENBQUMsRUFBRSxHQUFHLGFBQWEsQ0FBQyxFQUFFLENBQUM7YUFDNUI7UUFDSCxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7SUFFRCwwQ0FBVzs7O0lBQVg7UUFDRSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU87Ozs7UUFBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxXQUFXLEVBQUUsRUFBakIsQ0FBaUIsRUFBQyxDQUFDO0lBQ3ZELENBQUM7O2dCQTdGRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtvQkFDN0IsUUFBUSxFQUFFLCtvQ0FvQlA7b0JBQ0gsSUFBSSxFQUFFO3dCQUNKLDJCQUEyQixFQUFFLE1BQU07d0JBQ25DLDZCQUE2QixFQUFFLE1BQU07d0JBQ3JDLDRCQUE0QixFQUFFLG9CQUFvQjtxQkFDbkQ7aUJBQ0Y7Ozs7Z0JBbkNRLFNBQVM7Z0JBRFQsZ0JBQWdCO2dCQU5oQixNQUFNO2dCQUtOLHFCQUFxQjtnQkFEckIsbUJBQW1COzs7d0JBbUR6QixlQUFlLFNBQUMsZUFBZTswQkFFL0IsS0FBSyxTQUFDLGNBQWM7O0lBbUR2QiwyQkFBQztDQUFBLEFBOUZELElBOEZDO1NBakVZLG9CQUFvQjs7O0lBRS9CLDhDQUFzQzs7SUFVdEMscUNBQW9FOzs7OztJQU9wRSw2Q0FBMkM7O0lBQzNDLDJDQUEyQjs7SUFmekIseUNBQTJCOztJQUMzQixnREFBeUM7O0lBQ3pDLHNDQUFxQjs7SUFDckIscURBQW1EOztJQUNuRCw4Q0FBMEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBBZnRlckNvbnRlbnRJbml0LCBDb21wb25lbnQsIENvbnRlbnRDaGlsZHJlbiwgSW5wdXQsIE9uRGVzdHJveSwgUXVlcnlMaXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgRXhwYW5kIH0gZnJvbSAnLi4vLi4vdXRpbHMvZXhwYW5kL3Byb3ZpZGVycy9leHBhbmQnO1xuXG5pbXBvcnQgeyBDbHJEYXRhZ3JpZENlbGwgfSBmcm9tICcuL2RhdGFncmlkLWNlbGwnO1xuaW1wb3J0IHsgRGF0YWdyaWRIaWRlYWJsZUNvbHVtbk1vZGVsIH0gZnJvbSAnLi9kYXRhZ3JpZC1oaWRlYWJsZS1jb2x1bW4ubW9kZWwnO1xuaW1wb3J0IHsgRXhwYW5kYWJsZVJvd3NDb3VudCB9IGZyb20gJy4vcHJvdmlkZXJzL2dsb2JhbC1leHBhbmRhYmxlLXJvd3MnO1xuaW1wb3J0IHsgSGlkZWFibGVDb2x1bW5TZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvaGlkZWFibGUtY29sdW1uLnNlcnZpY2UnO1xuaW1wb3J0IHsgUm93QWN0aW9uU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL3Jvdy1hY3Rpb24tc2VydmljZSc7XG5pbXBvcnQgeyBTZWxlY3Rpb24gfSBmcm9tICcuL3Byb3ZpZGVycy9zZWxlY3Rpb24nO1xuaW1wb3J0IHsgU2VsZWN0aW9uVHlwZSB9IGZyb20gJy4vZW51bXMvc2VsZWN0aW9uLXR5cGUnO1xuXG4vKipcbiAqIEdlbmVyaWMgYmxhbmQgY29udGFpbmVyIHNlcnZpbmcgdmFyaW91cyBwdXJwb3NlcyBmb3IgRGF0YWdyaWQuXG4gKiBGb3IgaW5zdGFuY2UsIGl0IGNhbiBoZWxwIHNwYW4gYSB0ZXh0IG92ZXIgbXVsdGlwbGUgcm93cyBpbiBkZXRhaWwgdmlldy5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLWRnLXJvdy1kZXRhaWwnLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIXJlcGxhY2VkUm93XCI+XG4gICAgICAgICAgICA8IS0tIHNwYWNlIGZvciBtdWx0aXNlbGVjdGlvbiBzdGF0ZSAtLT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkYXRhZ3JpZC1jZWxsIGRhdGFncmlkLXNlbGVjdCBkYXRhZ3JpZC1maXhlZC1jb2x1bW5cIlxuICAgICAgICAgICAgICAgICpuZ0lmPVwic2VsZWN0aW9uLnNlbGVjdGlvblR5cGUgPT09IFNFTEVDVElPTl9UWVBFLk11bHRpXCI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwhLS0gc3BhY2UgZm9yIHNpbmdsZSBzZWxlY3Rpb24gc3RhdGUgLS0+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGF0YWdyaWQtY2VsbCBkYXRhZ3JpZC1zZWxlY3QgZGF0YWdyaWQtZml4ZWQtY29sdW1uXCJcbiAgICAgICAgICAgICAgICAqbmdJZj1cInNlbGVjdGlvbi5zZWxlY3Rpb25UeXBlID09PSBTRUxFQ1RJT05fVFlQRS5TaW5nbGVcIj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPCEtLSBzcGFjZSBmb3Igc2luZ2xlIHJvdyBhY3Rpb247IG9ubHkgZGlzcGxheVR5cGUgaWYgd2UgaGF2ZSBhdCBsZWFzdCBvbmUgYWN0aW9uYWJsZSByb3cgaW4gZGF0YWdyaWQgLS0+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGF0YWdyaWQtY2VsbCBkYXRhZ3JpZC1yb3ctYWN0aW9ucyBkYXRhZ3JpZC1maXhlZC1jb2x1bW5cIlxuICAgICAgICAgICAgICAgICpuZ0lmPVwicm93QWN0aW9uU2VydmljZS5oYXNBY3Rpb25hYmxlUm93XCI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwhLS0gc3BhY2UgZm9yIGV4cGFuZGFibGUgY2FyZXQgYWN0aW9uOyBvbmx5IGRpc3BsYXlUeXBlIGlmIHdlIGhhdmUgYXQgbGVhc3Qgb25lIGV4cGFuZGFibGUgcm93IGluIGRhdGFncmlkIC0tPlxuICAgICAgICAgICAgPGRpdiAqbmdJZj1cImV4cGFuZGFibGVSb3dzLmhhc0V4cGFuZGFibGVSb3dcIlxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJkYXRhZ3JpZC1leHBhbmRhYmxlLWNhcmV0IGRhdGFncmlkLWZpeGVkLWNvbHVtbiBkYXRhZ3JpZC1jZWxsXCI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICBgLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5kYXRhZ3JpZC1yb3ctZmxleF0nOiAndHJ1ZScsXG4gICAgJ1tjbGFzcy5kYXRhZ3JpZC1yb3ctZGV0YWlsXSc6ICd0cnVlJyxcbiAgICAnW2NsYXNzLmRhdGFncmlkLWNvbnRhaW5lcl0nOiAnY2VsbHMubGVuZ3RoID09PSAwJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyRGF0YWdyaWRSb3dEZXRhaWw8VCA9IGFueT4gaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuICAvKiByZWZlcmVuY2UgdG8gdGhlIGVudW0gc28gdGhhdCB0ZW1wbGF0ZSBjYW4gYWNjZXNzIGl0ICovXG4gIHB1YmxpYyBTRUxFQ1RJT05fVFlQRSA9IFNlbGVjdGlvblR5cGU7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIHNlbGVjdGlvbjogU2VsZWN0aW9uLFxuICAgIHB1YmxpYyByb3dBY3Rpb25TZXJ2aWNlOiBSb3dBY3Rpb25TZXJ2aWNlLFxuICAgIHB1YmxpYyBleHBhbmQ6IEV4cGFuZCxcbiAgICBwdWJsaWMgaGlkZWFibGVDb2x1bW5TZXJ2aWNlOiBIaWRlYWJsZUNvbHVtblNlcnZpY2UsXG4gICAgcHVibGljIGV4cGFuZGFibGVSb3dzOiBFeHBhbmRhYmxlUm93c0NvdW50XG4gICkge31cblxuICBAQ29udGVudENoaWxkcmVuKENsckRhdGFncmlkQ2VsbCkgY2VsbHM6IFF1ZXJ5TGlzdDxDbHJEYXRhZ3JpZENlbGw+O1xuXG4gIEBJbnB1dCgnY2xyRGdSZXBsYWNlJylcbiAgc2V0IHJlcGxhY2UodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmV4cGFuZC5zZXRSZXBsYWNlKCEhdmFsdWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuICBwdWJsaWMgcmVwbGFjZWRSb3cgPSBmYWxzZTtcblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgY29uc3QgY29sdW1uc0xpc3QgPSB0aGlzLmhpZGVhYmxlQ29sdW1uU2VydmljZS5nZXRDb2x1bW5zKCk7XG4gICAgdGhpcy51cGRhdGVDZWxsc0ZvckNvbHVtbnMoY29sdW1uc0xpc3QpO1xuXG4gICAgLy8gVHJpZ2dlcmVkIHdoZW4gdGhlIENlbGxzIGxpc3QgY2hhbmdlcyBwZXIgcm93LXJlbmRlcmVyXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLmNlbGxzLmNoYW5nZXMuc3Vic2NyaWJlKGNlbGxMaXN0ID0+IHtcbiAgICAgICAgY29uc3QgY29sdW1uTGlzdCA9IHRoaXMuaGlkZWFibGVDb2x1bW5TZXJ2aWNlLmdldENvbHVtbnMoKTtcbiAgICAgICAgaWYgKGNlbGxMaXN0Lmxlbmd0aCA9PT0gY29sdW1uTGlzdC5sZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLnVwZGF0ZUNlbGxzRm9yQ29sdW1ucyhjb2x1bW5MaXN0KTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuXG4gICAgLy8gVXNlZCB0byBzZXQgdGhpbmdzIHVwIHRoZSBmaXJzdCB0aW1lIGJ1dCBvbmx5IGFmdGVyIGFsbCB0aGUgY29sdW1ucyBhcmUgcmVhZHkuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLmhpZGVhYmxlQ29sdW1uU2VydmljZS5jb2x1bW5MaXN0Q2hhbmdlLnN1YnNjcmliZShjb2x1bW5MaXN0ID0+IHtcbiAgICAgICAgLy8gUHJldmVudHMgY2VsbCB1cGRhdGVzIHdoZW4gY29scyBhbmQgY2VsbHMgYXJyYXkgYXJlIG5vdCBhbGlnbmVkXG4gICAgICAgIGlmIChjb2x1bW5MaXN0Lmxlbmd0aCA9PT0gdGhpcy5jZWxscy5sZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLnVwZGF0ZUNlbGxzRm9yQ29sdW1ucyhjb2x1bW5MaXN0KTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLmV4cGFuZC5yZXBsYWNlLnN1YnNjcmliZShyZXBsYWNlQ2hhbmdlID0+IHtcbiAgICAgICAgdGhpcy5yZXBsYWNlZFJvdyA9IHJlcGxhY2VDaGFuZ2U7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlQ2VsbHNGb3JDb2x1bW5zKGNvbHVtbkxpc3Q6IERhdGFncmlkSGlkZWFibGVDb2x1bW5Nb2RlbFtdKSB7XG4gICAgdGhpcy5jZWxscy5mb3JFYWNoKChjZWxsLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3QgY3VycmVudENvbHVtbiA9IGNvbHVtbkxpc3RbaW5kZXhdOyAvLyBBY2NvdW50cyBmb3IgbnVsbCBzcGFjZS5cbiAgICAgIGlmIChjdXJyZW50Q29sdW1uKSB7XG4gICAgICAgIGNlbGwuaWQgPSBjdXJyZW50Q29sdW1uLmlkO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmZvckVhY2goc3ViID0+IHN1Yi51bnN1YnNjcmliZSgpKTtcbiAgfVxufVxuIl19