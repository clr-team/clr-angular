/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ContentChild } from '@angular/core';
import { Point } from '../../popover/common/popover';
import { ClrDatagridColumnToggleButton } from './datagrid-column-toggle-button';
import { ClrDatagridColumnToggleTitle } from './datagrid-column-toggle-title';
import { ClrCommonStrings } from '../../utils/i18n/common-strings.interface';
import { ColumnsService } from './providers/columns.service';
import { DatagridColumnChanges } from './enums/column-changes.enum';
var ClrDatagridColumnToggle = /** @class */ (function () {
    function ClrDatagridColumnToggle(commonStrings, columnsService) {
        this.commonStrings = commonStrings;
        this.columnsService = columnsService;
        /**
         *
         * Popover init
         */
        this.anchorPoint = Point.TOP_LEFT;
        this.popoverPoint = Point.LEFT_BOTTOM;
        this.open = false;
    }
    Object.defineProperty(ClrDatagridColumnToggle.prototype, "hideableColumnStates", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var hideables = this.columnsService.columns.filter((/**
             * @param {?} column
             * @return {?}
             */
            function (column) { return column.value.hideable; }));
            return hideables.map((/**
             * @param {?} column
             * @return {?}
             */
            function (column) { return column.value; }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridColumnToggle.prototype, "hasOnlyOneVisibleColumn", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var nbNonHideableColumns = this.columnsService.columns.length - this.hideableColumnStates.length;
            // this should only return true when there is no non-hideable columns.
            return (nbNonHideableColumns === 0 && this.hideableColumnStates.filter((/**
             * @param {?} columnState
             * @return {?}
             */
            function (columnState) { return !columnState.hidden; })).length === 1);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} columnState
     * @param {?} event
     * @return {?}
     */
    ClrDatagridColumnToggle.prototype.toggleColumnState = /**
     * @param {?} columnState
     * @param {?} event
     * @return {?}
     */
    function (columnState, event) {
        /** @type {?} */
        var columnToToggle = this.columnsService.columns.filter((/**
         * @param {?} column
         * @return {?}
         */
        function (column) { return column.value === columnState; }))[0];
        this.columnsService.emitStateChange(columnToToggle, {
            hidden: event,
            changes: [DatagridColumnChanges.HIDDEN],
        });
    };
    /**
     * @return {?}
     */
    ClrDatagridColumnToggle.prototype.toggleSwitchPanel = /**
     * @return {?}
     */
    function () {
        this.open = !this.open;
    };
    ClrDatagridColumnToggle.decorators = [
        { type: Component, args: [{
                    selector: 'clr-dg-column-toggle',
                    template: "\n    <button\n      #anchor\n      (click)=\"toggleSwitchPanel()\"\n      class=\"btn btn-sm btn-link column-toggle--action\"\n      type=\"button\">\n      <clr-icon shape=\"view-columns\" [attr.title]=\"commonStrings.pickColumns\"></clr-icon>\n    </button>\n    <div class=\"column-switch\"\n         *clrPopoverOld=\"open; anchor: anchor; anchorPoint: anchorPoint; popoverPoint: popoverPoint\">\n      <div class=\"switch-header\">\n        <ng-container *ngIf=\"!customToggleTitle\">Show Columns</ng-container>\n        <ng-content select=\"clr-dg-column-toggle-title\"></ng-content>\n        <button\n          class=\"btn btn-sm btn-link toggle-switch-close-button\"\n          (click)=\"toggleSwitchPanel()\"\n          type=\"button\">\n          <clr-icon shape=\"close\" [attr.title]=\"commonStrings.close\"></clr-icon>\n        </button>\n      </div>\n      <ul class=\"switch-content list-unstyled\">\n        <li *ngFor=\"let columnState of hideableColumnStates;\">\n          <clr-checkbox-wrapper>\n            <input clrCheckbox type=\"checkbox\"\n                   [disabled]=\"hasOnlyOneVisibleColumn && !columnState.hidden\"\n                   [ngModel]=\"!columnState.hidden\"\n                   (ngModelChange)=\"toggleColumnState(columnState, !$event)\">\n            <label>\n              <ng-template [ngTemplateOutlet]=\"columnState.titleTemplateRef\"></ng-template>\n            </label>\n          </clr-checkbox-wrapper>\n        </li>\n      </ul>\n      <div class=\"switch-footer\">\n        <ng-content select=\"clr-dg-column-toggle-button\"></ng-content>\n        <clr-dg-column-toggle-button *ngIf=\"!customToggleButton\">Select All</clr-dg-column-toggle-button>\n      </div>\n    </div>\n  ",
                    host: { '[class.column-switch-wrapper]': 'true', '[class.active]': 'open' }
                }] }
    ];
    /** @nocollapse */
    ClrDatagridColumnToggle.ctorParameters = function () { return [
        { type: ClrCommonStrings },
        { type: ColumnsService }
    ]; };
    ClrDatagridColumnToggle.propDecorators = {
        customToggleTitle: [{ type: ContentChild, args: [ClrDatagridColumnToggleTitle,] }],
        customToggleButton: [{ type: ContentChild, args: [ClrDatagridColumnToggleButton,] }]
    };
    return ClrDatagridColumnToggle;
}());
export { ClrDatagridColumnToggle };
if (false) {
    /**
     *
     * Popover init
     * @type {?}
     */
    ClrDatagridColumnToggle.prototype.anchorPoint;
    /** @type {?} */
    ClrDatagridColumnToggle.prototype.popoverPoint;
    /** @type {?} */
    ClrDatagridColumnToggle.prototype.open;
    /** @type {?} */
    ClrDatagridColumnToggle.prototype.customToggleTitle;
    /** @type {?} */
    ClrDatagridColumnToggle.prototype.customToggleButton;
    /** @type {?} */
    ClrDatagridColumnToggle.prototype.commonStrings;
    /**
     * @type {?}
     * @private
     */
    ClrDatagridColumnToggle.prototype.columnsService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtY29sdW1uLXRvZ2dsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvZGF0YWdyaWQtY29sdW1uLXRvZ2dsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFLQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV4RCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFFckQsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDaEYsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFFOUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDN0UsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRTdELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRXBFO0lBc0RFLGlDQUFtQixhQUErQixFQUFVLGNBQThCO1FBQXZFLGtCQUFhLEdBQWIsYUFBYSxDQUFrQjtRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjs7Ozs7UUFQbkYsZ0JBQVcsR0FBVSxLQUFLLENBQUMsUUFBUSxDQUFDO1FBQ3BDLGlCQUFZLEdBQVUsS0FBSyxDQUFDLFdBQVcsQ0FBQztRQUN4QyxTQUFJLEdBQVksS0FBSyxDQUFDO0lBS2dFLENBQUM7SUFFOUYsc0JBQUkseURBQW9COzs7O1FBQXhCOztnQkFDUSxTQUFTLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsTUFBTTs7OztZQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQXJCLENBQXFCLEVBQUM7WUFDckYsT0FBTyxTQUFTLENBQUMsR0FBRzs7OztZQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsTUFBTSxDQUFDLEtBQUssRUFBWixDQUFZLEVBQUMsQ0FBQztRQUMvQyxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLDREQUF1Qjs7OztRQUEzQjs7Z0JBQ1Esb0JBQW9CLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNO1lBQ2xHLHNFQUFzRTtZQUN0RSxPQUFPLENBQ0wsb0JBQW9CLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNOzs7O1lBQUMsVUFBQSxXQUFXLElBQUksT0FBQSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQW5CLENBQW1CLEVBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUNoSCxDQUFDO1FBQ0osQ0FBQzs7O09BQUE7Ozs7OztJQUVELG1EQUFpQjs7Ozs7SUFBakIsVUFBa0IsV0FBd0IsRUFBRSxLQUFjOztZQUNsRCxjQUFjLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsTUFBTTs7OztRQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsTUFBTSxDQUFDLEtBQUssS0FBSyxXQUFXLEVBQTVCLENBQTRCLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsY0FBYyxFQUFFO1lBQ2xELE1BQU0sRUFBRSxLQUFLO1lBQ2IsT0FBTyxFQUFFLENBQUMscUJBQXFCLENBQUMsTUFBTSxDQUFDO1NBQ3hDLENBQUMsQ0FBQztJQUNMLENBQUM7Ozs7SUFFRCxtREFBaUI7OztJQUFqQjtRQUNFLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3pCLENBQUM7O2dCQS9FRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtvQkFDaEMsUUFBUSxFQUFFLHVzREFzQ1Q7b0JBQ0QsSUFBSSxFQUFFLEVBQUUsK0JBQStCLEVBQUUsTUFBTSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sRUFBRTtpQkFDNUU7Ozs7Z0JBL0NRLGdCQUFnQjtnQkFDaEIsY0FBYzs7O29DQXVEcEIsWUFBWSxTQUFDLDRCQUE0QjtxQ0FDekMsWUFBWSxTQUFDLDZCQUE2Qjs7SUE0QjdDLDhCQUFDO0NBQUEsQUFoRkQsSUFnRkM7U0FyQ1ksdUJBQXVCOzs7Ozs7O0lBSWxDLDhDQUEyQzs7SUFDM0MsK0NBQStDOztJQUMvQyx1Q0FBNkI7O0lBRTdCLG9EQUE0Rjs7SUFDNUYscURBQStGOztJQUVuRixnREFBc0M7Ozs7O0lBQUUsaURBQXNDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgQ29tcG9uZW50LCBDb250ZW50Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tICcuLi8uLi9wb3BvdmVyL2NvbW1vbi9wb3BvdmVyJztcblxuaW1wb3J0IHsgQ2xyRGF0YWdyaWRDb2x1bW5Ub2dnbGVCdXR0b24gfSBmcm9tICcuL2RhdGFncmlkLWNvbHVtbi10b2dnbGUtYnV0dG9uJztcbmltcG9ydCB7IENsckRhdGFncmlkQ29sdW1uVG9nZ2xlVGl0bGUgfSBmcm9tICcuL2RhdGFncmlkLWNvbHVtbi10b2dnbGUtdGl0bGUnO1xuXG5pbXBvcnQgeyBDbHJDb21tb25TdHJpbmdzIH0gZnJvbSAnLi4vLi4vdXRpbHMvaTE4bi9jb21tb24tc3RyaW5ncy5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQ29sdW1uc1NlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9jb2x1bW5zLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29sdW1uU3RhdGUgfSBmcm9tICcuL2ludGVyZmFjZXMvY29sdW1uLXN0YXRlLmludGVyZmFjZSc7XG5pbXBvcnQgeyBEYXRhZ3JpZENvbHVtbkNoYW5nZXMgfSBmcm9tICcuL2VudW1zL2NvbHVtbi1jaGFuZ2VzLmVudW0nO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItZGctY29sdW1uLXRvZ2dsZScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGJ1dHRvblxuICAgICAgI2FuY2hvclxuICAgICAgKGNsaWNrKT1cInRvZ2dsZVN3aXRjaFBhbmVsKClcIlxuICAgICAgY2xhc3M9XCJidG4gYnRuLXNtIGJ0bi1saW5rIGNvbHVtbi10b2dnbGUtLWFjdGlvblwiXG4gICAgICB0eXBlPVwiYnV0dG9uXCI+XG4gICAgICA8Y2xyLWljb24gc2hhcGU9XCJ2aWV3LWNvbHVtbnNcIiBbYXR0ci50aXRsZV09XCJjb21tb25TdHJpbmdzLnBpY2tDb2x1bW5zXCI+PC9jbHItaWNvbj5cbiAgICA8L2J1dHRvbj5cbiAgICA8ZGl2IGNsYXNzPVwiY29sdW1uLXN3aXRjaFwiXG4gICAgICAgICAqY2xyUG9wb3Zlck9sZD1cIm9wZW47IGFuY2hvcjogYW5jaG9yOyBhbmNob3JQb2ludDogYW5jaG9yUG9pbnQ7IHBvcG92ZXJQb2ludDogcG9wb3ZlclBvaW50XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwic3dpdGNoLWhlYWRlclwiPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWN1c3RvbVRvZ2dsZVRpdGxlXCI+U2hvdyBDb2x1bW5zPC9uZy1jb250YWluZXI+XG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImNsci1kZy1jb2x1bW4tdG9nZ2xlLXRpdGxlXCI+PC9uZy1jb250ZW50PlxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgY2xhc3M9XCJidG4gYnRuLXNtIGJ0bi1saW5rIHRvZ2dsZS1zd2l0Y2gtY2xvc2UtYnV0dG9uXCJcbiAgICAgICAgICAoY2xpY2spPVwidG9nZ2xlU3dpdGNoUGFuZWwoKVwiXG4gICAgICAgICAgdHlwZT1cImJ1dHRvblwiPlxuICAgICAgICAgIDxjbHItaWNvbiBzaGFwZT1cImNsb3NlXCIgW2F0dHIudGl0bGVdPVwiY29tbW9uU3RyaW5ncy5jbG9zZVwiPjwvY2xyLWljb24+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgICA8dWwgY2xhc3M9XCJzd2l0Y2gtY29udGVudCBsaXN0LXVuc3R5bGVkXCI+XG4gICAgICAgIDxsaSAqbmdGb3I9XCJsZXQgY29sdW1uU3RhdGUgb2YgaGlkZWFibGVDb2x1bW5TdGF0ZXM7XCI+XG4gICAgICAgICAgPGNsci1jaGVja2JveC13cmFwcGVyPlxuICAgICAgICAgICAgPGlucHV0IGNsckNoZWNrYm94IHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cImhhc09ubHlPbmVWaXNpYmxlQ29sdW1uICYmICFjb2x1bW5TdGF0ZS5oaWRkZW5cIlxuICAgICAgICAgICAgICAgICAgIFtuZ01vZGVsXT1cIiFjb2x1bW5TdGF0ZS5oaWRkZW5cIlxuICAgICAgICAgICAgICAgICAgIChuZ01vZGVsQ2hhbmdlKT1cInRvZ2dsZUNvbHVtblN0YXRlKGNvbHVtblN0YXRlLCAhJGV2ZW50KVwiPlxuICAgICAgICAgICAgPGxhYmVsPlxuICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwiY29sdW1uU3RhdGUudGl0bGVUZW1wbGF0ZVJlZlwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgIDwvY2xyLWNoZWNrYm94LXdyYXBwZXI+XG4gICAgICAgIDwvbGk+XG4gICAgICA8L3VsPlxuICAgICAgPGRpdiBjbGFzcz1cInN3aXRjaC1mb290ZXJcIj5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiY2xyLWRnLWNvbHVtbi10b2dnbGUtYnV0dG9uXCI+PC9uZy1jb250ZW50PlxuICAgICAgICA8Y2xyLWRnLWNvbHVtbi10b2dnbGUtYnV0dG9uICpuZ0lmPVwiIWN1c3RvbVRvZ2dsZUJ1dHRvblwiPlNlbGVjdCBBbGw8L2Nsci1kZy1jb2x1bW4tdG9nZ2xlLWJ1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICBgLFxuICBob3N0OiB7ICdbY2xhc3MuY29sdW1uLXN3aXRjaC13cmFwcGVyXSc6ICd0cnVlJywgJ1tjbGFzcy5hY3RpdmVdJzogJ29wZW4nIH0sXG59KVxuZXhwb3J0IGNsYXNzIENsckRhdGFncmlkQ29sdW1uVG9nZ2xlIHtcbiAgLyoqKlxuICAgKiBQb3BvdmVyIGluaXRcbiAgICovXG4gIHB1YmxpYyBhbmNob3JQb2ludDogUG9pbnQgPSBQb2ludC5UT1BfTEVGVDtcbiAgcHVibGljIHBvcG92ZXJQb2ludDogUG9pbnQgPSBQb2ludC5MRUZUX0JPVFRPTTtcbiAgcHVibGljIG9wZW46IGJvb2xlYW4gPSBmYWxzZTtcblxuICBAQ29udGVudENoaWxkKENsckRhdGFncmlkQ29sdW1uVG9nZ2xlVGl0bGUpIGN1c3RvbVRvZ2dsZVRpdGxlOiBDbHJEYXRhZ3JpZENvbHVtblRvZ2dsZVRpdGxlO1xuICBAQ29udGVudENoaWxkKENsckRhdGFncmlkQ29sdW1uVG9nZ2xlQnV0dG9uKSBjdXN0b21Ub2dnbGVCdXR0b246IENsckRhdGFncmlkQ29sdW1uVG9nZ2xlQnV0dG9uO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBjb21tb25TdHJpbmdzOiBDbHJDb21tb25TdHJpbmdzLCBwcml2YXRlIGNvbHVtbnNTZXJ2aWNlOiBDb2x1bW5zU2VydmljZSkge31cblxuICBnZXQgaGlkZWFibGVDb2x1bW5TdGF0ZXMoKTogQ29sdW1uU3RhdGVbXSB7XG4gICAgY29uc3QgaGlkZWFibGVzID0gdGhpcy5jb2x1bW5zU2VydmljZS5jb2x1bW5zLmZpbHRlcihjb2x1bW4gPT4gY29sdW1uLnZhbHVlLmhpZGVhYmxlKTtcbiAgICByZXR1cm4gaGlkZWFibGVzLm1hcChjb2x1bW4gPT4gY29sdW1uLnZhbHVlKTtcbiAgfVxuXG4gIGdldCBoYXNPbmx5T25lVmlzaWJsZUNvbHVtbigpOiBib29sZWFuIHtcbiAgICBjb25zdCBuYk5vbkhpZGVhYmxlQ29sdW1ucyA9IHRoaXMuY29sdW1uc1NlcnZpY2UuY29sdW1ucy5sZW5ndGggLSB0aGlzLmhpZGVhYmxlQ29sdW1uU3RhdGVzLmxlbmd0aDtcbiAgICAvLyB0aGlzIHNob3VsZCBvbmx5IHJldHVybiB0cnVlIHdoZW4gdGhlcmUgaXMgbm8gbm9uLWhpZGVhYmxlIGNvbHVtbnMuXG4gICAgcmV0dXJuIChcbiAgICAgIG5iTm9uSGlkZWFibGVDb2x1bW5zID09PSAwICYmIHRoaXMuaGlkZWFibGVDb2x1bW5TdGF0ZXMuZmlsdGVyKGNvbHVtblN0YXRlID0+ICFjb2x1bW5TdGF0ZS5oaWRkZW4pLmxlbmd0aCA9PT0gMVxuICAgICk7XG4gIH1cblxuICB0b2dnbGVDb2x1bW5TdGF0ZShjb2x1bW5TdGF0ZTogQ29sdW1uU3RhdGUsIGV2ZW50OiBib29sZWFuKSB7XG4gICAgY29uc3QgY29sdW1uVG9Ub2dnbGUgPSB0aGlzLmNvbHVtbnNTZXJ2aWNlLmNvbHVtbnMuZmlsdGVyKGNvbHVtbiA9PiBjb2x1bW4udmFsdWUgPT09IGNvbHVtblN0YXRlKVswXTtcbiAgICB0aGlzLmNvbHVtbnNTZXJ2aWNlLmVtaXRTdGF0ZUNoYW5nZShjb2x1bW5Ub1RvZ2dsZSwge1xuICAgICAgaGlkZGVuOiBldmVudCxcbiAgICAgIGNoYW5nZXM6IFtEYXRhZ3JpZENvbHVtbkNoYW5nZXMuSElEREVOXSxcbiAgICB9KTtcbiAgfVxuXG4gIHRvZ2dsZVN3aXRjaFBhbmVsKCkge1xuICAgIHRoaXMub3BlbiA9ICF0aGlzLm9wZW47XG4gIH1cbn1cbiJdfQ==