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
        <ng-container *ngIf="!customToggleTitle">Show Columns</ng-container>
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
        <clr-dg-column-toggle-button *ngIf="!customToggleButton">Select All</clr-dg-column-toggle-button>
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtY29sdW1uLXRvZ2dsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvZGF0YWdyaWQtY29sdW1uLXRvZ2dsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFLQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV4RCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFFckQsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDaEYsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFFOUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDN0UsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRTdELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBNkNwRSxNQUFNLE9BQU8sdUJBQXVCOzs7OztJQVdsQyxZQUFtQixhQUErQixFQUFVLGNBQThCO1FBQXZFLGtCQUFhLEdBQWIsYUFBYSxDQUFrQjtRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjs7Ozs7UUFQbkYsZ0JBQVcsR0FBVSxLQUFLLENBQUMsUUFBUSxDQUFDO1FBQ3BDLGlCQUFZLEdBQVUsS0FBSyxDQUFDLFdBQVcsQ0FBQztRQUN4QyxTQUFJLEdBQVksS0FBSyxDQUFDO0lBS2dFLENBQUM7Ozs7SUFFOUYsSUFBSSxvQkFBb0I7O2NBQ2hCLFNBQVMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxNQUFNOzs7O1FBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBQztRQUNyRixPQUFPLFNBQVMsQ0FBQyxHQUFHOzs7O1FBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFDLENBQUM7SUFDL0MsQ0FBQzs7OztJQUVELElBQUksdUJBQXVCOztjQUNuQixvQkFBb0IsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE1BQU07UUFDbEcsc0VBQXNFO1FBQ3RFLE9BQU8sQ0FDTCxvQkFBb0IsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLG9CQUFvQixDQUFDLE1BQU07Ozs7UUFBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQ2hILENBQUM7SUFDSixDQUFDOzs7Ozs7SUFFRCxpQkFBaUIsQ0FBQyxXQUF3QixFQUFFLEtBQWM7O2NBQ2xELGNBQWMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxNQUFNOzs7O1FBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxLQUFLLFdBQVcsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUNwRyxJQUFJLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxjQUFjLEVBQUU7WUFDbEQsTUFBTSxFQUFFLEtBQUs7WUFDYixPQUFPLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUM7U0FDeEMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7OztJQUVELGlCQUFpQjtRQUNmLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3pCLENBQUM7OztZQS9FRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtnQkFDaEMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNDVDtnQkFDRCxJQUFJLEVBQUUsRUFBRSwrQkFBK0IsRUFBRSxNQUFNLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxFQUFFO2FBQzVFOzs7O1lBL0NRLGdCQUFnQjtZQUNoQixjQUFjOzs7Z0NBdURwQixZQUFZLFNBQUMsNEJBQTRCO2lDQUN6QyxZQUFZLFNBQUMsNkJBQTZCOzs7Ozs7OztJQUwzQyw4Q0FBMkM7O0lBQzNDLCtDQUErQzs7SUFDL0MsdUNBQTZCOztJQUU3QixvREFBNEY7O0lBQzVGLHFEQUErRjs7SUFFbkYsZ0RBQXNDOzs7OztJQUFFLGlEQUFzQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IENvbXBvbmVudCwgQ29udGVudENoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFBvaW50IH0gZnJvbSAnLi4vLi4vcG9wb3Zlci9jb21tb24vcG9wb3Zlcic7XG5cbmltcG9ydCB7IENsckRhdGFncmlkQ29sdW1uVG9nZ2xlQnV0dG9uIH0gZnJvbSAnLi9kYXRhZ3JpZC1jb2x1bW4tdG9nZ2xlLWJ1dHRvbic7XG5pbXBvcnQgeyBDbHJEYXRhZ3JpZENvbHVtblRvZ2dsZVRpdGxlIH0gZnJvbSAnLi9kYXRhZ3JpZC1jb2x1bW4tdG9nZ2xlLXRpdGxlJztcblxuaW1wb3J0IHsgQ2xyQ29tbW9uU3RyaW5ncyB9IGZyb20gJy4uLy4uL3V0aWxzL2kxOG4vY29tbW9uLXN0cmluZ3MuaW50ZXJmYWNlJztcbmltcG9ydCB7IENvbHVtbnNTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvY29sdW1ucy5zZXJ2aWNlJztcbmltcG9ydCB7IENvbHVtblN0YXRlIH0gZnJvbSAnLi9pbnRlcmZhY2VzL2NvbHVtbi1zdGF0ZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgRGF0YWdyaWRDb2x1bW5DaGFuZ2VzIH0gZnJvbSAnLi9lbnVtcy9jb2x1bW4tY2hhbmdlcy5lbnVtJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLWRnLWNvbHVtbi10b2dnbGUnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxidXR0b25cbiAgICAgICNhbmNob3JcbiAgICAgIChjbGljayk9XCJ0b2dnbGVTd2l0Y2hQYW5lbCgpXCJcbiAgICAgIGNsYXNzPVwiYnRuIGJ0bi1zbSBidG4tbGluayBjb2x1bW4tdG9nZ2xlLS1hY3Rpb25cIlxuICAgICAgdHlwZT1cImJ1dHRvblwiPlxuICAgICAgPGNsci1pY29uIHNoYXBlPVwidmlldy1jb2x1bW5zXCIgW2F0dHIudGl0bGVdPVwiY29tbW9uU3RyaW5ncy5waWNrQ29sdW1uc1wiPjwvY2xyLWljb24+XG4gICAgPC9idXR0b24+XG4gICAgPGRpdiBjbGFzcz1cImNvbHVtbi1zd2l0Y2hcIlxuICAgICAgICAgKmNsclBvcG92ZXJPbGQ9XCJvcGVuOyBhbmNob3I6IGFuY2hvcjsgYW5jaG9yUG9pbnQ6IGFuY2hvclBvaW50OyBwb3BvdmVyUG9pbnQ6IHBvcG92ZXJQb2ludFwiPlxuICAgICAgPGRpdiBjbGFzcz1cInN3aXRjaC1oZWFkZXJcIj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFjdXN0b21Ub2dnbGVUaXRsZVwiPlNob3cgQ29sdW1uczwvbmctY29udGFpbmVyPlxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJjbHItZGctY29sdW1uLXRvZ2dsZS10aXRsZVwiPjwvbmctY29udGVudD5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIGNsYXNzPVwiYnRuIGJ0bi1zbSBidG4tbGluayB0b2dnbGUtc3dpdGNoLWNsb3NlLWJ1dHRvblwiXG4gICAgICAgICAgKGNsaWNrKT1cInRvZ2dsZVN3aXRjaFBhbmVsKClcIlxuICAgICAgICAgIHR5cGU9XCJidXR0b25cIj5cbiAgICAgICAgICA8Y2xyLWljb24gc2hhcGU9XCJjbG9zZVwiIFthdHRyLnRpdGxlXT1cImNvbW1vblN0cmluZ3MuY2xvc2VcIj48L2Nsci1pY29uPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPHVsIGNsYXNzPVwic3dpdGNoLWNvbnRlbnQgbGlzdC11bnN0eWxlZFwiPlxuICAgICAgICA8bGkgKm5nRm9yPVwibGV0IGNvbHVtblN0YXRlIG9mIGhpZGVhYmxlQ29sdW1uU3RhdGVzO1wiPlxuICAgICAgICAgIDxjbHItY2hlY2tib3gtd3JhcHBlcj5cbiAgICAgICAgICAgIDxpbnB1dCBjbHJDaGVja2JveCB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJoYXNPbmx5T25lVmlzaWJsZUNvbHVtbiAmJiAhY29sdW1uU3RhdGUuaGlkZGVuXCJcbiAgICAgICAgICAgICAgICAgICBbbmdNb2RlbF09XCIhY29sdW1uU3RhdGUuaGlkZGVuXCJcbiAgICAgICAgICAgICAgICAgICAobmdNb2RlbENoYW5nZSk9XCJ0b2dnbGVDb2x1bW5TdGF0ZShjb2x1bW5TdGF0ZSwgISRldmVudClcIj5cbiAgICAgICAgICAgIDxsYWJlbD5cbiAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImNvbHVtblN0YXRlLnRpdGxlVGVtcGxhdGVSZWZcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICA8L2Nsci1jaGVja2JveC13cmFwcGVyPlxuICAgICAgICA8L2xpPlxuICAgICAgPC91bD5cbiAgICAgIDxkaXYgY2xhc3M9XCJzd2l0Y2gtZm9vdGVyXCI+XG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImNsci1kZy1jb2x1bW4tdG9nZ2xlLWJ1dHRvblwiPjwvbmctY29udGVudD5cbiAgICAgICAgPGNsci1kZy1jb2x1bW4tdG9nZ2xlLWJ1dHRvbiAqbmdJZj1cIiFjdXN0b21Ub2dnbGVCdXR0b25cIj5TZWxlY3QgQWxsPC9jbHItZGctY29sdW1uLXRvZ2dsZS1idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgaG9zdDogeyAnW2NsYXNzLmNvbHVtbi1zd2l0Y2gtd3JhcHBlcl0nOiAndHJ1ZScsICdbY2xhc3MuYWN0aXZlXSc6ICdvcGVuJyB9LFxufSlcbmV4cG9ydCBjbGFzcyBDbHJEYXRhZ3JpZENvbHVtblRvZ2dsZSB7XG4gIC8qKipcbiAgICogUG9wb3ZlciBpbml0XG4gICAqL1xuICBwdWJsaWMgYW5jaG9yUG9pbnQ6IFBvaW50ID0gUG9pbnQuVE9QX0xFRlQ7XG4gIHB1YmxpYyBwb3BvdmVyUG9pbnQ6IFBvaW50ID0gUG9pbnQuTEVGVF9CT1RUT007XG4gIHB1YmxpYyBvcGVuOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQENvbnRlbnRDaGlsZChDbHJEYXRhZ3JpZENvbHVtblRvZ2dsZVRpdGxlKSBjdXN0b21Ub2dnbGVUaXRsZTogQ2xyRGF0YWdyaWRDb2x1bW5Ub2dnbGVUaXRsZTtcbiAgQENvbnRlbnRDaGlsZChDbHJEYXRhZ3JpZENvbHVtblRvZ2dsZUJ1dHRvbikgY3VzdG9tVG9nZ2xlQnV0dG9uOiBDbHJEYXRhZ3JpZENvbHVtblRvZ2dsZUJ1dHRvbjtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgY29tbW9uU3RyaW5nczogQ2xyQ29tbW9uU3RyaW5ncywgcHJpdmF0ZSBjb2x1bW5zU2VydmljZTogQ29sdW1uc1NlcnZpY2UpIHt9XG5cbiAgZ2V0IGhpZGVhYmxlQ29sdW1uU3RhdGVzKCk6IENvbHVtblN0YXRlW10ge1xuICAgIGNvbnN0IGhpZGVhYmxlcyA9IHRoaXMuY29sdW1uc1NlcnZpY2UuY29sdW1ucy5maWx0ZXIoY29sdW1uID0+IGNvbHVtbi52YWx1ZS5oaWRlYWJsZSk7XG4gICAgcmV0dXJuIGhpZGVhYmxlcy5tYXAoY29sdW1uID0+IGNvbHVtbi52YWx1ZSk7XG4gIH1cblxuICBnZXQgaGFzT25seU9uZVZpc2libGVDb2x1bW4oKTogYm9vbGVhbiB7XG4gICAgY29uc3QgbmJOb25IaWRlYWJsZUNvbHVtbnMgPSB0aGlzLmNvbHVtbnNTZXJ2aWNlLmNvbHVtbnMubGVuZ3RoIC0gdGhpcy5oaWRlYWJsZUNvbHVtblN0YXRlcy5sZW5ndGg7XG4gICAgLy8gdGhpcyBzaG91bGQgb25seSByZXR1cm4gdHJ1ZSB3aGVuIHRoZXJlIGlzIG5vIG5vbi1oaWRlYWJsZSBjb2x1bW5zLlxuICAgIHJldHVybiAoXG4gICAgICBuYk5vbkhpZGVhYmxlQ29sdW1ucyA9PT0gMCAmJiB0aGlzLmhpZGVhYmxlQ29sdW1uU3RhdGVzLmZpbHRlcihjb2x1bW5TdGF0ZSA9PiAhY29sdW1uU3RhdGUuaGlkZGVuKS5sZW5ndGggPT09IDFcbiAgICApO1xuICB9XG5cbiAgdG9nZ2xlQ29sdW1uU3RhdGUoY29sdW1uU3RhdGU6IENvbHVtblN0YXRlLCBldmVudDogYm9vbGVhbikge1xuICAgIGNvbnN0IGNvbHVtblRvVG9nZ2xlID0gdGhpcy5jb2x1bW5zU2VydmljZS5jb2x1bW5zLmZpbHRlcihjb2x1bW4gPT4gY29sdW1uLnZhbHVlID09PSBjb2x1bW5TdGF0ZSlbMF07XG4gICAgdGhpcy5jb2x1bW5zU2VydmljZS5lbWl0U3RhdGVDaGFuZ2UoY29sdW1uVG9Ub2dnbGUsIHtcbiAgICAgIGhpZGRlbjogZXZlbnQsXG4gICAgICBjaGFuZ2VzOiBbRGF0YWdyaWRDb2x1bW5DaGFuZ2VzLkhJRERFTl0sXG4gICAgfSk7XG4gIH1cblxuICB0b2dnbGVTd2l0Y2hQYW5lbCgpIHtcbiAgICB0aGlzLm9wZW4gPSAhdGhpcy5vcGVuO1xuICB9XG59XG4iXX0=