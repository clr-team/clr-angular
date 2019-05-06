/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
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
                    template: "\n    <button\n      #anchor\n      (click)=\"toggleSwitchPanel()\"\n      class=\"btn btn-sm btn-link column-toggle--action\"\n      type=\"button\">\n      <clr-icon shape=\"view-columns\" [attr.title]=\"commonStrings.pickColumns\"></clr-icon>\n    </button>\n    <div class=\"column-switch\"\n         *clrPopoverOld=\"open; anchor: anchor; anchorPoint: anchorPoint; popoverPoint: popoverPoint\">\n      <div class=\"switch-header\">\n        <ng-container *ngIf=\"!customToggleTitle\">{{commonStrings.showColumns}}</ng-container>\n        <ng-content select=\"clr-dg-column-toggle-title\"></ng-content>\n        <button\n          class=\"btn btn-sm btn-link toggle-switch-close-button\"\n          (click)=\"toggleSwitchPanel()\"\n          type=\"button\">\n          <clr-icon shape=\"close\" [attr.title]=\"commonStrings.close\"></clr-icon>\n        </button>\n      </div>\n      <ul class=\"switch-content list-unstyled\">\n        <li *ngFor=\"let columnState of hideableColumnStates;\">\n          <clr-checkbox-wrapper>\n            <input clrCheckbox type=\"checkbox\"\n                   [disabled]=\"hasOnlyOneVisibleColumn && !columnState.hidden\"\n                   [ngModel]=\"!columnState.hidden\"\n                   (ngModelChange)=\"toggleColumnState(columnState, !$event)\">\n            <label>\n              <ng-template [ngTemplateOutlet]=\"columnState.titleTemplateRef\"></ng-template>\n            </label>\n          </clr-checkbox-wrapper>\n        </li>\n      </ul>\n      <div class=\"switch-footer\">\n        <ng-content select=\"clr-dg-column-toggle-button\"></ng-content>\n        <clr-dg-column-toggle-button *ngIf=\"!customToggleButton\">{{commonStrings.selectAll}}</clr-dg-column-toggle-button>\n      </div>\n    </div>\n  ",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtY29sdW1uLXRvZ2dsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvZGF0YWdyaWQtY29sdW1uLXRvZ2dsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFLQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV4RCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFFckQsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDaEYsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFFOUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDN0UsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRTdELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRXBFO0lBdURFLGlDQUFtQixhQUErQixFQUFVLGNBQThCO1FBQXZFLGtCQUFhLEdBQWIsYUFBYSxDQUFrQjtRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjs7Ozs7UUFQbkYsZ0JBQVcsR0FBVSxLQUFLLENBQUMsUUFBUSxDQUFDO1FBQ3BDLGlCQUFZLEdBQVUsS0FBSyxDQUFDLFdBQVcsQ0FBQztRQUN4QyxTQUFJLEdBQVksS0FBSyxDQUFDO0lBS2dFLENBQUM7SUFFOUYsc0JBQUkseURBQW9COzs7O1FBQXhCOztnQkFDUSxTQUFTLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsTUFBTTs7OztZQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQXJCLENBQXFCLEVBQUM7WUFDckYsT0FBTyxTQUFTLENBQUMsR0FBRzs7OztZQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsTUFBTSxDQUFDLEtBQUssRUFBWixDQUFZLEVBQUMsQ0FBQztRQUMvQyxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLDREQUF1Qjs7OztRQUEzQjs7Z0JBQ1Esb0JBQW9CLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNO1lBQ2xHLHNFQUFzRTtZQUN0RSxPQUFPLENBQ0wsb0JBQW9CLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNOzs7O1lBQUMsVUFBQSxXQUFXLElBQUksT0FBQSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQW5CLENBQW1CLEVBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUNoSCxDQUFDO1FBQ0osQ0FBQzs7O09BQUE7Ozs7OztJQUVELG1EQUFpQjs7Ozs7SUFBakIsVUFBa0IsV0FBd0IsRUFBRSxLQUFjOztZQUNsRCxjQUFjLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsTUFBTTs7OztRQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsTUFBTSxDQUFDLEtBQUssS0FBSyxXQUFXLEVBQTVCLENBQTRCLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsY0FBYyxFQUFFO1lBQ2xELE1BQU0sRUFBRSxLQUFLO1lBQ2IsT0FBTyxFQUFFLENBQUMscUJBQXFCLENBQUMsTUFBTSxDQUFDO1NBQ3hDLENBQUMsQ0FBQztJQUNMLENBQUM7Ozs7SUFFRCxtREFBaUI7OztJQUFqQjtRQUNFLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3pCLENBQUM7O2dCQWhGRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtvQkFDaEMsUUFBUSxFQUFFLHl1REFzQ1Q7b0JBQ0QsSUFBSSxFQUFFLEVBQUUsK0JBQStCLEVBQUUsTUFBTSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sRUFBRTtpQkFDNUU7Ozs7Z0JBL0NRLGdCQUFnQjtnQkFDaEIsY0FBYzs7O29DQXdEcEIsWUFBWSxTQUFDLDRCQUE0QjtxQ0FDekMsWUFBWSxTQUFDLDZCQUE2Qjs7SUE0QjdDLDhCQUFDO0NBQUEsQUFqRkQsSUFpRkM7U0FyQ1ksdUJBQXVCOzs7Ozs7O0lBSWxDLDhDQUEyQzs7SUFDM0MsK0NBQStDOztJQUMvQyx1Q0FBNkI7O0lBRTdCLG9EQUE0Rjs7SUFDNUYscURBQStGOztJQUVuRixnREFBc0M7Ozs7O0lBQUUsaURBQXNDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgQ29tcG9uZW50LCBDb250ZW50Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tICcuLi8uLi9wb3BvdmVyL2NvbW1vbi9wb3BvdmVyJztcblxuaW1wb3J0IHsgQ2xyRGF0YWdyaWRDb2x1bW5Ub2dnbGVCdXR0b24gfSBmcm9tICcuL2RhdGFncmlkLWNvbHVtbi10b2dnbGUtYnV0dG9uJztcbmltcG9ydCB7IENsckRhdGFncmlkQ29sdW1uVG9nZ2xlVGl0bGUgfSBmcm9tICcuL2RhdGFncmlkLWNvbHVtbi10b2dnbGUtdGl0bGUnO1xuXG5pbXBvcnQgeyBDbHJDb21tb25TdHJpbmdzIH0gZnJvbSAnLi4vLi4vdXRpbHMvaTE4bi9jb21tb24tc3RyaW5ncy5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQ29sdW1uc1NlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9jb2x1bW5zLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29sdW1uU3RhdGUgfSBmcm9tICcuL2ludGVyZmFjZXMvY29sdW1uLXN0YXRlLmludGVyZmFjZSc7XG5pbXBvcnQgeyBEYXRhZ3JpZENvbHVtbkNoYW5nZXMgfSBmcm9tICcuL2VudW1zL2NvbHVtbi1jaGFuZ2VzLmVudW0nO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItZGctY29sdW1uLXRvZ2dsZScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGJ1dHRvblxuICAgICAgI2FuY2hvclxuICAgICAgKGNsaWNrKT1cInRvZ2dsZVN3aXRjaFBhbmVsKClcIlxuICAgICAgY2xhc3M9XCJidG4gYnRuLXNtIGJ0bi1saW5rIGNvbHVtbi10b2dnbGUtLWFjdGlvblwiXG4gICAgICB0eXBlPVwiYnV0dG9uXCI+XG4gICAgICA8Y2xyLWljb24gc2hhcGU9XCJ2aWV3LWNvbHVtbnNcIiBbYXR0ci50aXRsZV09XCJjb21tb25TdHJpbmdzLnBpY2tDb2x1bW5zXCI+PC9jbHItaWNvbj5cbiAgICA8L2J1dHRvbj5cbiAgICA8ZGl2IGNsYXNzPVwiY29sdW1uLXN3aXRjaFwiXG4gICAgICAgICAqY2xyUG9wb3Zlck9sZD1cIm9wZW47IGFuY2hvcjogYW5jaG9yOyBhbmNob3JQb2ludDogYW5jaG9yUG9pbnQ7IHBvcG92ZXJQb2ludDogcG9wb3ZlclBvaW50XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwic3dpdGNoLWhlYWRlclwiPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWN1c3RvbVRvZ2dsZVRpdGxlXCI+e3tjb21tb25TdHJpbmdzLnNob3dDb2x1bW5zfX08L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiY2xyLWRnLWNvbHVtbi10b2dnbGUtdGl0bGVcIj48L25nLWNvbnRlbnQ+XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICBjbGFzcz1cImJ0biBidG4tc20gYnRuLWxpbmsgdG9nZ2xlLXN3aXRjaC1jbG9zZS1idXR0b25cIlxuICAgICAgICAgIChjbGljayk9XCJ0b2dnbGVTd2l0Y2hQYW5lbCgpXCJcbiAgICAgICAgICB0eXBlPVwiYnV0dG9uXCI+XG4gICAgICAgICAgPGNsci1pY29uIHNoYXBlPVwiY2xvc2VcIiBbYXR0ci50aXRsZV09XCJjb21tb25TdHJpbmdzLmNsb3NlXCI+PC9jbHItaWNvbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICAgIDx1bCBjbGFzcz1cInN3aXRjaC1jb250ZW50IGxpc3QtdW5zdHlsZWRcIj5cbiAgICAgICAgPGxpICpuZ0Zvcj1cImxldCBjb2x1bW5TdGF0ZSBvZiBoaWRlYWJsZUNvbHVtblN0YXRlcztcIj5cbiAgICAgICAgICA8Y2xyLWNoZWNrYm94LXdyYXBwZXI+XG4gICAgICAgICAgICA8aW5wdXQgY2xyQ2hlY2tib3ggdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiaGFzT25seU9uZVZpc2libGVDb2x1bW4gJiYgIWNvbHVtblN0YXRlLmhpZGRlblwiXG4gICAgICAgICAgICAgICAgICAgW25nTW9kZWxdPVwiIWNvbHVtblN0YXRlLmhpZGRlblwiXG4gICAgICAgICAgICAgICAgICAgKG5nTW9kZWxDaGFuZ2UpPVwidG9nZ2xlQ29sdW1uU3RhdGUoY29sdW1uU3RhdGUsICEkZXZlbnQpXCI+XG4gICAgICAgICAgICA8bGFiZWw+XG4gICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJjb2x1bW5TdGF0ZS50aXRsZVRlbXBsYXRlUmVmXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgPC9jbHItY2hlY2tib3gtd3JhcHBlcj5cbiAgICAgICAgPC9saT5cbiAgICAgIDwvdWw+XG4gICAgICA8ZGl2IGNsYXNzPVwic3dpdGNoLWZvb3RlclwiPlxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJjbHItZGctY29sdW1uLXRvZ2dsZS1idXR0b25cIj48L25nLWNvbnRlbnQ+XG4gICAgICAgIDxjbHItZGctY29sdW1uLXRvZ2dsZS1idXR0b24gKm5nSWY9XCIhY3VzdG9tVG9nZ2xlQnV0dG9uXCI+e3tjb21tb25TdHJpbmdzLnNlbGVjdEFsbH19PC9jbHItZGctY29sdW1uLXRvZ2dsZS1idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgaG9zdDogeyAnW2NsYXNzLmNvbHVtbi1zd2l0Y2gtd3JhcHBlcl0nOiAndHJ1ZScsICdbY2xhc3MuYWN0aXZlXSc6ICdvcGVuJyB9LFxufSlcbi8qKiBAZGVwcmVjYXRlZCBzaW5jZSAyLjAsIHJlbW92ZSBpbiAzLjAgKi9cbmV4cG9ydCBjbGFzcyBDbHJEYXRhZ3JpZENvbHVtblRvZ2dsZSB7XG4gIC8qKipcbiAgICogUG9wb3ZlciBpbml0XG4gICAqL1xuICBwdWJsaWMgYW5jaG9yUG9pbnQ6IFBvaW50ID0gUG9pbnQuVE9QX0xFRlQ7XG4gIHB1YmxpYyBwb3BvdmVyUG9pbnQ6IFBvaW50ID0gUG9pbnQuTEVGVF9CT1RUT007XG4gIHB1YmxpYyBvcGVuOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQENvbnRlbnRDaGlsZChDbHJEYXRhZ3JpZENvbHVtblRvZ2dsZVRpdGxlKSBjdXN0b21Ub2dnbGVUaXRsZTogQ2xyRGF0YWdyaWRDb2x1bW5Ub2dnbGVUaXRsZTtcbiAgQENvbnRlbnRDaGlsZChDbHJEYXRhZ3JpZENvbHVtblRvZ2dsZUJ1dHRvbikgY3VzdG9tVG9nZ2xlQnV0dG9uOiBDbHJEYXRhZ3JpZENvbHVtblRvZ2dsZUJ1dHRvbjtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgY29tbW9uU3RyaW5nczogQ2xyQ29tbW9uU3RyaW5ncywgcHJpdmF0ZSBjb2x1bW5zU2VydmljZTogQ29sdW1uc1NlcnZpY2UpIHt9XG5cbiAgZ2V0IGhpZGVhYmxlQ29sdW1uU3RhdGVzKCk6IENvbHVtblN0YXRlW10ge1xuICAgIGNvbnN0IGhpZGVhYmxlcyA9IHRoaXMuY29sdW1uc1NlcnZpY2UuY29sdW1ucy5maWx0ZXIoY29sdW1uID0+IGNvbHVtbi52YWx1ZS5oaWRlYWJsZSk7XG4gICAgcmV0dXJuIGhpZGVhYmxlcy5tYXAoY29sdW1uID0+IGNvbHVtbi52YWx1ZSk7XG4gIH1cblxuICBnZXQgaGFzT25seU9uZVZpc2libGVDb2x1bW4oKTogYm9vbGVhbiB7XG4gICAgY29uc3QgbmJOb25IaWRlYWJsZUNvbHVtbnMgPSB0aGlzLmNvbHVtbnNTZXJ2aWNlLmNvbHVtbnMubGVuZ3RoIC0gdGhpcy5oaWRlYWJsZUNvbHVtblN0YXRlcy5sZW5ndGg7XG4gICAgLy8gdGhpcyBzaG91bGQgb25seSByZXR1cm4gdHJ1ZSB3aGVuIHRoZXJlIGlzIG5vIG5vbi1oaWRlYWJsZSBjb2x1bW5zLlxuICAgIHJldHVybiAoXG4gICAgICBuYk5vbkhpZGVhYmxlQ29sdW1ucyA9PT0gMCAmJiB0aGlzLmhpZGVhYmxlQ29sdW1uU3RhdGVzLmZpbHRlcihjb2x1bW5TdGF0ZSA9PiAhY29sdW1uU3RhdGUuaGlkZGVuKS5sZW5ndGggPT09IDFcbiAgICApO1xuICB9XG5cbiAgdG9nZ2xlQ29sdW1uU3RhdGUoY29sdW1uU3RhdGU6IENvbHVtblN0YXRlLCBldmVudDogYm9vbGVhbikge1xuICAgIGNvbnN0IGNvbHVtblRvVG9nZ2xlID0gdGhpcy5jb2x1bW5zU2VydmljZS5jb2x1bW5zLmZpbHRlcihjb2x1bW4gPT4gY29sdW1uLnZhbHVlID09PSBjb2x1bW5TdGF0ZSlbMF07XG4gICAgdGhpcy5jb2x1bW5zU2VydmljZS5lbWl0U3RhdGVDaGFuZ2UoY29sdW1uVG9Ub2dnbGUsIHtcbiAgICAgIGhpZGRlbjogZXZlbnQsXG4gICAgICBjaGFuZ2VzOiBbRGF0YWdyaWRDb2x1bW5DaGFuZ2VzLkhJRERFTl0sXG4gICAgfSk7XG4gIH1cblxuICB0b2dnbGVTd2l0Y2hQYW5lbCgpIHtcbiAgICB0aGlzLm9wZW4gPSAhdGhpcy5vcGVuO1xuICB9XG59XG4iXX0=