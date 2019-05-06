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
/** @deprecated since 2.0, remove in 3.0 */
export class ClrDatagridColumnToggle {
    /**
     * @param {?} commonStrings
     * @param {?} columnsService
     */
    constructor(commonStrings, columnsService) {
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
    /**
     * @return {?}
     */
    get hideableColumnStates() {
        /** @type {?} */
        const hideables = this.columnsService.columns.filter((/**
         * @param {?} column
         * @return {?}
         */
        column => column.value.hideable));
        return hideables.map((/**
         * @param {?} column
         * @return {?}
         */
        column => column.value));
    }
    /**
     * @return {?}
     */
    get hasOnlyOneVisibleColumn() {
        /** @type {?} */
        const nbNonHideableColumns = this.columnsService.columns.length - this.hideableColumnStates.length;
        // this should only return true when there is no non-hideable columns.
        return (nbNonHideableColumns === 0 && this.hideableColumnStates.filter((/**
         * @param {?} columnState
         * @return {?}
         */
        columnState => !columnState.hidden)).length === 1);
    }
    /**
     * @param {?} columnState
     * @param {?} event
     * @return {?}
     */
    toggleColumnState(columnState, event) {
        /** @type {?} */
        const columnToToggle = this.columnsService.columns.filter((/**
         * @param {?} column
         * @return {?}
         */
        column => column.value === columnState))[0];
        this.columnsService.emitStateChange(columnToToggle, {
            hidden: event,
            changes: [DatagridColumnChanges.HIDDEN],
        });
    }
    /**
     * @return {?}
     */
    toggleSwitchPanel() {
        this.open = !this.open;
    }
}
ClrDatagridColumnToggle.decorators = [
    { type: Component, args: [{
                selector: 'clr-dg-column-toggle',
                template: `
    <button
      #anchor
      (click)="toggleSwitchPanel()"
      class="btn btn-sm btn-link column-toggle--action"
      type="button">
      <clr-icon shape="view-columns" [attr.title]="commonStrings.pickColumns"></clr-icon>
    </button>
    <div class="column-switch"
         *clrPopoverOld="open; anchor: anchor; anchorPoint: anchorPoint; popoverPoint: popoverPoint">
      <div class="switch-header">
        <ng-container *ngIf="!customToggleTitle">{{commonStrings.showColumns}}</ng-container>
        <ng-content select="clr-dg-column-toggle-title"></ng-content>
        <button
          class="btn btn-sm btn-link toggle-switch-close-button"
          (click)="toggleSwitchPanel()"
          type="button">
          <clr-icon shape="close" [attr.title]="commonStrings.close"></clr-icon>
        </button>
      </div>
      <ul class="switch-content list-unstyled">
        <li *ngFor="let columnState of hideableColumnStates;">
          <clr-checkbox-wrapper>
            <input clrCheckbox type="checkbox"
                   [disabled]="hasOnlyOneVisibleColumn && !columnState.hidden"
                   [ngModel]="!columnState.hidden"
                   (ngModelChange)="toggleColumnState(columnState, !$event)">
            <label>
              <ng-template [ngTemplateOutlet]="columnState.titleTemplateRef"></ng-template>
            </label>
          </clr-checkbox-wrapper>
        </li>
      </ul>
      <div class="switch-footer">
        <ng-content select="clr-dg-column-toggle-button"></ng-content>
        <clr-dg-column-toggle-button *ngIf="!customToggleButton">{{commonStrings.selectAll}}</clr-dg-column-toggle-button>
      </div>
    </div>
  `,
                host: { '[class.column-switch-wrapper]': 'true', '[class.active]': 'open' }
            }] }
];
/** @nocollapse */
ClrDatagridColumnToggle.ctorParameters = () => [
    { type: ClrCommonStrings },
    { type: ColumnsService }
];
ClrDatagridColumnToggle.propDecorators = {
    customToggleTitle: [{ type: ContentChild, args: [ClrDatagridColumnToggleTitle,] }],
    customToggleButton: [{ type: ContentChild, args: [ClrDatagridColumnToggleButton,] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtY29sdW1uLXRvZ2dsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvZGF0YWdyaWQtY29sdW1uLXRvZ2dsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFLQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV4RCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFFckQsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDaEYsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFFOUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDN0UsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRTdELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBNkNwRSwyQ0FBMkM7QUFDM0MsTUFBTSxPQUFPLHVCQUF1Qjs7Ozs7SUFXbEMsWUFBbUIsYUFBK0IsRUFBVSxjQUE4QjtRQUF2RSxrQkFBYSxHQUFiLGFBQWEsQ0FBa0I7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7Ozs7O1FBUG5GLGdCQUFXLEdBQVUsS0FBSyxDQUFDLFFBQVEsQ0FBQztRQUNwQyxpQkFBWSxHQUFVLEtBQUssQ0FBQyxXQUFXLENBQUM7UUFDeEMsU0FBSSxHQUFZLEtBQUssQ0FBQztJQUtnRSxDQUFDOzs7O0lBRTlGLElBQUksb0JBQW9COztjQUNoQixTQUFTLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsTUFBTTs7OztRQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUM7UUFDckYsT0FBTyxTQUFTLENBQUMsR0FBRzs7OztRQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBQyxDQUFDO0lBQy9DLENBQUM7Ozs7SUFFRCxJQUFJLHVCQUF1Qjs7Y0FDbkIsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNO1FBQ2xHLHNFQUFzRTtRQUN0RSxPQUFPLENBQ0wsb0JBQW9CLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNOzs7O1FBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUNoSCxDQUFDO0lBQ0osQ0FBQzs7Ozs7O0lBRUQsaUJBQWlCLENBQUMsV0FBd0IsRUFBRSxLQUFjOztjQUNsRCxjQUFjLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsTUFBTTs7OztRQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssS0FBSyxXQUFXLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsY0FBYyxFQUFFO1lBQ2xELE1BQU0sRUFBRSxLQUFLO1lBQ2IsT0FBTyxFQUFFLENBQUMscUJBQXFCLENBQUMsTUFBTSxDQUFDO1NBQ3hDLENBQUMsQ0FBQztJQUNMLENBQUM7Ozs7SUFFRCxpQkFBaUI7UUFDZixJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztJQUN6QixDQUFDOzs7WUFoRkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxzQkFBc0I7Z0JBQ2hDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQ1Q7Z0JBQ0QsSUFBSSxFQUFFLEVBQUUsK0JBQStCLEVBQUUsTUFBTSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sRUFBRTthQUM1RTs7OztZQS9DUSxnQkFBZ0I7WUFDaEIsY0FBYzs7O2dDQXdEcEIsWUFBWSxTQUFDLDRCQUE0QjtpQ0FDekMsWUFBWSxTQUFDLDZCQUE2Qjs7Ozs7Ozs7SUFMM0MsOENBQTJDOztJQUMzQywrQ0FBK0M7O0lBQy9DLHVDQUE2Qjs7SUFFN0Isb0RBQTRGOztJQUM1RixxREFBK0Y7O0lBRW5GLGdEQUFzQzs7Ozs7SUFBRSxpREFBc0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBDb21wb25lbnQsIENvbnRlbnRDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBQb2ludCB9IGZyb20gJy4uLy4uL3BvcG92ZXIvY29tbW9uL3BvcG92ZXInO1xuXG5pbXBvcnQgeyBDbHJEYXRhZ3JpZENvbHVtblRvZ2dsZUJ1dHRvbiB9IGZyb20gJy4vZGF0YWdyaWQtY29sdW1uLXRvZ2dsZS1idXR0b24nO1xuaW1wb3J0IHsgQ2xyRGF0YWdyaWRDb2x1bW5Ub2dnbGVUaXRsZSB9IGZyb20gJy4vZGF0YWdyaWQtY29sdW1uLXRvZ2dsZS10aXRsZSc7XG5cbmltcG9ydCB7IENsckNvbW1vblN0cmluZ3MgfSBmcm9tICcuLi8uLi91dGlscy9pMThuL2NvbW1vbi1zdHJpbmdzLmludGVyZmFjZSc7XG5pbXBvcnQgeyBDb2x1bW5zU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2NvbHVtbnMuc2VydmljZSc7XG5pbXBvcnQgeyBDb2x1bW5TdGF0ZSB9IGZyb20gJy4vaW50ZXJmYWNlcy9jb2x1bW4tc3RhdGUuaW50ZXJmYWNlJztcbmltcG9ydCB7IERhdGFncmlkQ29sdW1uQ2hhbmdlcyB9IGZyb20gJy4vZW51bXMvY29sdW1uLWNoYW5nZXMuZW51bSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci1kZy1jb2x1bW4tdG9nZ2xlJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8YnV0dG9uXG4gICAgICAjYW5jaG9yXG4gICAgICAoY2xpY2spPVwidG9nZ2xlU3dpdGNoUGFuZWwoKVwiXG4gICAgICBjbGFzcz1cImJ0biBidG4tc20gYnRuLWxpbmsgY29sdW1uLXRvZ2dsZS0tYWN0aW9uXCJcbiAgICAgIHR5cGU9XCJidXR0b25cIj5cbiAgICAgIDxjbHItaWNvbiBzaGFwZT1cInZpZXctY29sdW1uc1wiIFthdHRyLnRpdGxlXT1cImNvbW1vblN0cmluZ3MucGlja0NvbHVtbnNcIj48L2Nsci1pY29uPlxuICAgIDwvYnV0dG9uPlxuICAgIDxkaXYgY2xhc3M9XCJjb2x1bW4tc3dpdGNoXCJcbiAgICAgICAgICpjbHJQb3BvdmVyT2xkPVwib3BlbjsgYW5jaG9yOiBhbmNob3I7IGFuY2hvclBvaW50OiBhbmNob3JQb2ludDsgcG9wb3ZlclBvaW50OiBwb3BvdmVyUG9pbnRcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJzd2l0Y2gtaGVhZGVyXCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhY3VzdG9tVG9nZ2xlVGl0bGVcIj57e2NvbW1vblN0cmluZ3Muc2hvd0NvbHVtbnN9fTwvbmctY29udGFpbmVyPlxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJjbHItZGctY29sdW1uLXRvZ2dsZS10aXRsZVwiPjwvbmctY29udGVudD5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIGNsYXNzPVwiYnRuIGJ0bi1zbSBidG4tbGluayB0b2dnbGUtc3dpdGNoLWNsb3NlLWJ1dHRvblwiXG4gICAgICAgICAgKGNsaWNrKT1cInRvZ2dsZVN3aXRjaFBhbmVsKClcIlxuICAgICAgICAgIHR5cGU9XCJidXR0b25cIj5cbiAgICAgICAgICA8Y2xyLWljb24gc2hhcGU9XCJjbG9zZVwiIFthdHRyLnRpdGxlXT1cImNvbW1vblN0cmluZ3MuY2xvc2VcIj48L2Nsci1pY29uPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPHVsIGNsYXNzPVwic3dpdGNoLWNvbnRlbnQgbGlzdC11bnN0eWxlZFwiPlxuICAgICAgICA8bGkgKm5nRm9yPVwibGV0IGNvbHVtblN0YXRlIG9mIGhpZGVhYmxlQ29sdW1uU3RhdGVzO1wiPlxuICAgICAgICAgIDxjbHItY2hlY2tib3gtd3JhcHBlcj5cbiAgICAgICAgICAgIDxpbnB1dCBjbHJDaGVja2JveCB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJoYXNPbmx5T25lVmlzaWJsZUNvbHVtbiAmJiAhY29sdW1uU3RhdGUuaGlkZGVuXCJcbiAgICAgICAgICAgICAgICAgICBbbmdNb2RlbF09XCIhY29sdW1uU3RhdGUuaGlkZGVuXCJcbiAgICAgICAgICAgICAgICAgICAobmdNb2RlbENoYW5nZSk9XCJ0b2dnbGVDb2x1bW5TdGF0ZShjb2x1bW5TdGF0ZSwgISRldmVudClcIj5cbiAgICAgICAgICAgIDxsYWJlbD5cbiAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImNvbHVtblN0YXRlLnRpdGxlVGVtcGxhdGVSZWZcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICA8L2Nsci1jaGVja2JveC13cmFwcGVyPlxuICAgICAgICA8L2xpPlxuICAgICAgPC91bD5cbiAgICAgIDxkaXYgY2xhc3M9XCJzd2l0Y2gtZm9vdGVyXCI+XG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImNsci1kZy1jb2x1bW4tdG9nZ2xlLWJ1dHRvblwiPjwvbmctY29udGVudD5cbiAgICAgICAgPGNsci1kZy1jb2x1bW4tdG9nZ2xlLWJ1dHRvbiAqbmdJZj1cIiFjdXN0b21Ub2dnbGVCdXR0b25cIj57e2NvbW1vblN0cmluZ3Muc2VsZWN0QWxsfX08L2Nsci1kZy1jb2x1bW4tdG9nZ2xlLWJ1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICBgLFxuICBob3N0OiB7ICdbY2xhc3MuY29sdW1uLXN3aXRjaC13cmFwcGVyXSc6ICd0cnVlJywgJ1tjbGFzcy5hY3RpdmVdJzogJ29wZW4nIH0sXG59KVxuLyoqIEBkZXByZWNhdGVkIHNpbmNlIDIuMCwgcmVtb3ZlIGluIDMuMCAqL1xuZXhwb3J0IGNsYXNzIENsckRhdGFncmlkQ29sdW1uVG9nZ2xlIHtcbiAgLyoqKlxuICAgKiBQb3BvdmVyIGluaXRcbiAgICovXG4gIHB1YmxpYyBhbmNob3JQb2ludDogUG9pbnQgPSBQb2ludC5UT1BfTEVGVDtcbiAgcHVibGljIHBvcG92ZXJQb2ludDogUG9pbnQgPSBQb2ludC5MRUZUX0JPVFRPTTtcbiAgcHVibGljIG9wZW46IGJvb2xlYW4gPSBmYWxzZTtcblxuICBAQ29udGVudENoaWxkKENsckRhdGFncmlkQ29sdW1uVG9nZ2xlVGl0bGUpIGN1c3RvbVRvZ2dsZVRpdGxlOiBDbHJEYXRhZ3JpZENvbHVtblRvZ2dsZVRpdGxlO1xuICBAQ29udGVudENoaWxkKENsckRhdGFncmlkQ29sdW1uVG9nZ2xlQnV0dG9uKSBjdXN0b21Ub2dnbGVCdXR0b246IENsckRhdGFncmlkQ29sdW1uVG9nZ2xlQnV0dG9uO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBjb21tb25TdHJpbmdzOiBDbHJDb21tb25TdHJpbmdzLCBwcml2YXRlIGNvbHVtbnNTZXJ2aWNlOiBDb2x1bW5zU2VydmljZSkge31cblxuICBnZXQgaGlkZWFibGVDb2x1bW5TdGF0ZXMoKTogQ29sdW1uU3RhdGVbXSB7XG4gICAgY29uc3QgaGlkZWFibGVzID0gdGhpcy5jb2x1bW5zU2VydmljZS5jb2x1bW5zLmZpbHRlcihjb2x1bW4gPT4gY29sdW1uLnZhbHVlLmhpZGVhYmxlKTtcbiAgICByZXR1cm4gaGlkZWFibGVzLm1hcChjb2x1bW4gPT4gY29sdW1uLnZhbHVlKTtcbiAgfVxuXG4gIGdldCBoYXNPbmx5T25lVmlzaWJsZUNvbHVtbigpOiBib29sZWFuIHtcbiAgICBjb25zdCBuYk5vbkhpZGVhYmxlQ29sdW1ucyA9IHRoaXMuY29sdW1uc1NlcnZpY2UuY29sdW1ucy5sZW5ndGggLSB0aGlzLmhpZGVhYmxlQ29sdW1uU3RhdGVzLmxlbmd0aDtcbiAgICAvLyB0aGlzIHNob3VsZCBvbmx5IHJldHVybiB0cnVlIHdoZW4gdGhlcmUgaXMgbm8gbm9uLWhpZGVhYmxlIGNvbHVtbnMuXG4gICAgcmV0dXJuIChcbiAgICAgIG5iTm9uSGlkZWFibGVDb2x1bW5zID09PSAwICYmIHRoaXMuaGlkZWFibGVDb2x1bW5TdGF0ZXMuZmlsdGVyKGNvbHVtblN0YXRlID0+ICFjb2x1bW5TdGF0ZS5oaWRkZW4pLmxlbmd0aCA9PT0gMVxuICAgICk7XG4gIH1cblxuICB0b2dnbGVDb2x1bW5TdGF0ZShjb2x1bW5TdGF0ZTogQ29sdW1uU3RhdGUsIGV2ZW50OiBib29sZWFuKSB7XG4gICAgY29uc3QgY29sdW1uVG9Ub2dnbGUgPSB0aGlzLmNvbHVtbnNTZXJ2aWNlLmNvbHVtbnMuZmlsdGVyKGNvbHVtbiA9PiBjb2x1bW4udmFsdWUgPT09IGNvbHVtblN0YXRlKVswXTtcbiAgICB0aGlzLmNvbHVtbnNTZXJ2aWNlLmVtaXRTdGF0ZUNoYW5nZShjb2x1bW5Ub1RvZ2dsZSwge1xuICAgICAgaGlkZGVuOiBldmVudCxcbiAgICAgIGNoYW5nZXM6IFtEYXRhZ3JpZENvbHVtbkNoYW5nZXMuSElEREVOXSxcbiAgICB9KTtcbiAgfVxuXG4gIHRvZ2dsZVN3aXRjaFBhbmVsKCkge1xuICAgIHRoaXMub3BlbiA9ICF0aGlzLm9wZW47XG4gIH1cbn1cbiJdfQ==