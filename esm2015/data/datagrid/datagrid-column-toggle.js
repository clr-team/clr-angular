/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ContentChild, ContentChildren, QueryList } from '@angular/core';
import { Point } from '../../popover/common/popover';
import { ClrDatagridColumnToggleButton } from './datagrid-column-toggle-button';
import { ClrDatagridColumnToggleTitle } from './datagrid-column-toggle-title';
import { ColumnToggleButtonsService } from './providers/column-toggle-buttons.service';
import { HideableColumnService } from './providers/hideable-column.service';
import { ClrCommonStrings } from '../../utils/i18n/common-strings.interface';
export class ClrDatagridColumnToggle {
    /**
     * @param {?} hideableColumnService
     * @param {?} columnToggleButtons
     * @param {?} commonStrings
     */
    constructor(hideableColumnService, columnToggleButtons, commonStrings) {
        this.hideableColumnService = hideableColumnService;
        this.columnToggleButtons = columnToggleButtons;
        this.commonStrings = commonStrings;
        this.subscriptions = [];
        /**
         *
         * Popover init
         */
        this.anchorPoint = Point.TOP_LEFT;
        this.popoverPoint = Point.LEFT_BOTTOM;
        this.open = false;
        /**
         * *
         * DatagridHideableColumnModel init
         */
        this.columns = [];
    }
    /**
     * @return {?}
     */
    get allColumnsVisible() {
        return this._allColumnsVisible;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set allColumnsVisible(value) {
        this._allColumnsVisible = value;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.subscriptions.push(this.hideableColumnService.columnListChange.subscribe(columnList => {
            // Reset the list of columns
            this.columns.length = 0;
            this.hideableColumnService.updateForLastVisibleColumn();
            this.allColumnsVisible = this.hideableColumnService.checkForAllColumnsVisible;
            this.columnToggleButtons.selectAllDisabled = this.allColumnsVisible;
            // Add only the hidden columns to the toggler.
            columnList.forEach(col => {
                if (col) {
                    this.columns.push(col);
                }
            });
        }));
        this.subscriptions.push(this.columnToggleButtons.selectAllButtonClicked.subscribe(() => {
            this.selectAll();
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
    /**
     * @return {?}
     */
    selectAll() {
        this.hideableColumnService.showHiddenColumns();
        this.allColumnsVisible = this.hideableColumnService.checkForAllColumnsVisible;
    }
    /**
     * @param {?} event
     * @param {?} column
     * @return {?}
     */
    toggleColumn(event, column) {
        column.hidden = !event;
        this.allColumnsVisible = this.hideableColumnService.checkForAllColumnsVisible;
        this.columnToggleButtons.selectAllDisabled = this.allColumnsVisible;
        this.hideableColumnService.updateForLastVisibleColumn();
    }
    /**
     * @return {?}
     */
    toggleUI() {
        this.open = !this.open;
    }
}
ClrDatagridColumnToggle.decorators = [
    { type: Component, args: [{
                selector: 'clr-dg-column-toggle',
                template: `
        <button
                #anchor
                (click)="toggleUI()"
                class="btn btn-sm btn-link column-toggle--action"
                type="button">
            <clr-icon shape="view-columns" [attr.title]="commonStrings.pickColumns"></clr-icon>
        </button>
        <div class="column-switch"
             *clrPopoverOld="open; anchor: anchor; anchorPoint: anchorPoint; popoverPoint: popoverPoint">
            <div class="switch-header">
                <ng-container *ngIf="!title">Show Columns</ng-container>
                <ng-content select="clr-dg-column-toggle-title"></ng-content>
                <button
                    class="btn btn-sm btn-link"
                    (click)="toggleUI()"
                    type="button">
                    <clr-icon shape="close" [attr.title]="commonStrings.close"></clr-icon>
                </button>
            </div>
            <ul class="switch-content list-unstyled">
                <li *ngFor="let column of columns">
                    <clr-checkbox-container>
                        <input clrCheckbox type="checkbox"
                          [disabled]="column.lastVisibleColumn"
                          [ngModel]="!column.hidden" 
                          (ngModelChange)="toggleColumn($event, column)">
                        <label><ng-template [ngTemplateOutlet]="column.template"></ng-template></label>
                    </clr-checkbox-container>
                </li>
            </ul>
            <div class="switch-footer" *ngIf="buttons.length > 0">
                <ng-content select="clr-dg-column-toggle-button"></ng-content>
            </div>
            <div class="switch-footer" *ngIf="buttons.length === 0">
                <div>
                    <button
                            class="btn btn-sm btn-link p6 text-uppercase"
                            [disabled]="allColumnsVisible"
                            (click)="selectAll()"
                            type="button">Select All
                    </button>
                </div>
            </div>
        </div>
    `,
                host: { '[class.column-switch-wrapper]': 'true', '[class.active]': 'open' }
            }] }
];
/** @nocollapse */
ClrDatagridColumnToggle.ctorParameters = () => [
    { type: HideableColumnService },
    { type: ColumnToggleButtonsService },
    { type: ClrCommonStrings }
];
ClrDatagridColumnToggle.propDecorators = {
    title: [{ type: ContentChild, args: [ClrDatagridColumnToggleTitle,] }],
    buttons: [{ type: ContentChildren, args: [ClrDatagridColumnToggleButton,] }]
};
if (false) {
    /** @type {?} */
    ClrDatagridColumnToggle.prototype.subscriptions;
    /** @type {?} */
    ClrDatagridColumnToggle.prototype._allColumnsVisible;
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
    /**
     * *
     * DatagridHideableColumnModel init
     * @type {?}
     */
    ClrDatagridColumnToggle.prototype.columns;
    /** @type {?} */
    ClrDatagridColumnToggle.prototype.title;
    /** @type {?} */
    ClrDatagridColumnToggle.prototype.buttons;
    /** @type {?} */
    ClrDatagridColumnToggle.prototype.hideableColumnService;
    /** @type {?} */
    ClrDatagridColumnToggle.prototype.columnToggleButtons;
    /** @type {?} */
    ClrDatagridColumnToggle.prototype.commonStrings;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtY29sdW1uLXRvZ2dsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvZGF0YWdyaWQtY29sdW1uLXRvZ2dsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFLQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQXFCLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUd2RyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFFckQsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDaEYsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFFOUUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDdkYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDNUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFvRDdFLE1BQU0sT0FBTyx1QkFBdUI7Ozs7OztJQTJCbEMsWUFDUyxxQkFBNEMsRUFDM0MsbUJBQStDLEVBQ2hELGFBQStCO1FBRi9CLDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBdUI7UUFDM0Msd0JBQW1CLEdBQW5CLG1CQUFtQixDQUE0QjtRQUNoRCxrQkFBYSxHQUFiLGFBQWEsQ0FBa0I7UUE3QmhDLGtCQUFhLEdBQW1CLEVBQUUsQ0FBQzs7Ozs7UUFNcEMsZ0JBQVcsR0FBVSxLQUFLLENBQUMsUUFBUSxDQUFDO1FBQ3BDLGlCQUFZLEdBQVUsS0FBSyxDQUFDLFdBQVcsQ0FBQztRQUN4QyxTQUFJLEdBQVksS0FBSyxDQUFDOzs7OztRQUt0QixZQUFPLEdBQWtDLEVBQUUsQ0FBQztJQWlCaEQsQ0FBQzs7OztJQWZKLElBQVcsaUJBQWlCO1FBQzFCLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFD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cHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgQ29tcG9uZW50LCBDb250ZW50Q2hpbGQsIENvbnRlbnRDaGlsZHJlbiwgT25EZXN0cm95LCBPbkluaXQsIFF1ZXJ5TGlzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IFBvaW50IH0gZnJvbSAnLi4vLi4vcG9wb3Zlci9jb21tb24vcG9wb3Zlcic7XG5cbmltcG9ydCB7IENsckRhdGFncmlkQ29sdW1uVG9nZ2xlQnV0dG9uIH0gZnJvbSAnLi9kYXRhZ3JpZC1jb2x1bW4tdG9nZ2xlLWJ1dHRvbic7XG5pbXBvcnQgeyBDbHJEYXRhZ3JpZENvbHVtblRvZ2dsZVRpdGxlIH0gZnJvbSAnLi9kYXRhZ3JpZC1jb2x1bW4tdG9nZ2xlLXRpdGxlJztcbmltcG9ydCB7IERhdGFncmlkSGlkZWFibGVDb2x1bW5Nb2RlbCB9IGZyb20gJy4vZGF0YWdyaWQtaGlkZWFibGUtY29sdW1uLm1vZGVsJztcbmltcG9ydCB7IENvbHVtblRvZ2dsZUJ1dHRvbnNTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvY29sdW1uLXRvZ2dsZS1idXR0b25zLnNlcnZpY2UnO1xuaW1wb3J0IHsgSGlkZWFibGVDb2x1bW5TZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvaGlkZWFibGUtY29sdW1uLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2xyQ29tbW9uU3RyaW5ncyB9IGZyb20gJy4uLy4uL3V0aWxzL2kxOG4vY29tbW9uLXN0cmluZ3MuaW50ZXJmYWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLWRnLWNvbHVtbi10b2dnbGUnLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgI2FuY2hvclxuICAgICAgICAgICAgICAgIChjbGljayk9XCJ0b2dnbGVVSSgpXCJcbiAgICAgICAgICAgICAgICBjbGFzcz1cImJ0biBidG4tc20gYnRuLWxpbmsgY29sdW1uLXRvZ2dsZS0tYWN0aW9uXCJcbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCI+XG4gICAgICAgICAgICA8Y2xyLWljb24gc2hhcGU9XCJ2aWV3LWNvbHVtbnNcIiBbYXR0ci50aXRsZV09XCJjb21tb25TdHJpbmdzLnBpY2tDb2x1bW5zXCI+PC9jbHItaWNvbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW4tc3dpdGNoXCJcbiAgICAgICAgICAgICAqY2xyUG9wb3Zlck9sZD1cIm9wZW47IGFuY2hvcjogYW5jaG9yOyBhbmNob3JQb2ludDogYW5jaG9yUG9pbnQ7IHBvcG92ZXJQb2ludDogcG9wb3ZlclBvaW50XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3dpdGNoLWhlYWRlclwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhdGl0bGVcIj5TaG93IENvbHVtbnM8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJjbHItZGctY29sdW1uLXRvZ2dsZS10aXRsZVwiPjwvbmctY29udGVudD5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiYnRuIGJ0bi1zbSBidG4tbGlua1wiXG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJ0b2dnbGVVSSgpXCJcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiPlxuICAgICAgICAgICAgICAgICAgICA8Y2xyLWljb24gc2hhcGU9XCJjbG9zZVwiIFthdHRyLnRpdGxlXT1cImNvbW1vblN0cmluZ3MuY2xvc2VcIj48L2Nsci1pY29uPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8dWwgY2xhc3M9XCJzd2l0Y2gtY29udGVudCBsaXN0LXVuc3R5bGVkXCI+XG4gICAgICAgICAgICAgICAgPGxpICpuZ0Zvcj1cImxldCBjb2x1bW4gb2YgY29sdW1uc1wiPlxuICAgICAgICAgICAgICAgICAgICA8Y2xyLWNoZWNrYm94LWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbHJDaGVja2JveCB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiY29sdW1uLmxhc3RWaXNpYmxlQ29sdW1uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW25nTW9kZWxdPVwiIWNvbHVtbi5oaWRkZW5cIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKG5nTW9kZWxDaGFuZ2UpPVwidG9nZ2xlQ29sdW1uKCRldmVudCwgY29sdW1uKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPjxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJjb2x1bW4udGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDwvY2xyLWNoZWNrYm94LWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzd2l0Y2gtZm9vdGVyXCIgKm5nSWY9XCJidXR0b25zLmxlbmd0aCA+IDBcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJjbHItZGctY29sdW1uLXRvZ2dsZS1idXR0b25cIj48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzd2l0Y2gtZm9vdGVyXCIgKm5nSWY9XCJidXR0b25zLmxlbmd0aCA9PT0gMFwiPlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImJ0biBidG4tc20gYnRuLWxpbmsgcDYgdGV4dC11cHBlcmNhc2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJhbGxDb2x1bW5zVmlzaWJsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cInNlbGVjdEFsbCgpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCI+U2VsZWN0IEFsbFxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICBob3N0OiB7ICdbY2xhc3MuY29sdW1uLXN3aXRjaC13cmFwcGVyXSc6ICd0cnVlJywgJ1tjbGFzcy5hY3RpdmVdJzogJ29wZW4nIH0sXG59KVxuZXhwb3J0IGNsYXNzIENsckRhdGFncmlkQ29sdW1uVG9nZ2xlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBwcml2YXRlIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG4gIHByaXZhdGUgX2FsbENvbHVtbnNWaXNpYmxlOiBib29sZWFuO1xuXG4gIC8qKipcbiAgICogUG9wb3ZlciBpbml0XG4gICAqL1xuICBwdWJsaWMgYW5jaG9yUG9pbnQ6IFBvaW50ID0gUG9pbnQuVE9QX0xFRlQ7XG4gIHB1YmxpYyBwb3BvdmVyUG9pbnQ6IFBvaW50ID0gUG9pbnQuTEVGVF9CT1RUT007XG4gIHB1YmxpYyBvcGVuOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqKipcbiAgICogRGF0YWdyaWRIaWRlYWJsZUNvbHVtbk1vZGVsIGluaXRcbiAgICovXG4gIHB1YmxpYyBjb2x1bW5zOiBEYXRhZ3JpZEhpZGVhYmxlQ29sdW1uTW9kZWxbXSA9IFtdO1xuXG4gIHB1YmxpYyBnZXQgYWxsQ29sdW1uc1Zpc2libGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2FsbENvbHVtbnNWaXNpYmxlO1xuICB9XG5cbiAgcHVibGljIHNldCBhbGxDb2x1bW5zVmlzaWJsZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2FsbENvbHVtbnNWaXNpYmxlID0gdmFsdWU7XG4gIH1cblxuICBAQ29udGVudENoaWxkKENsckRhdGFncmlkQ29sdW1uVG9nZ2xlVGl0bGUpIHRpdGxlOiBDbHJEYXRhZ3JpZENvbHVtblRvZ2dsZVRpdGxlO1xuICBAQ29udGVudENoaWxkcmVuKENsckRhdGFncmlkQ29sdW1uVG9nZ2xlQnV0dG9uKSBidXR0b25zOiBRdWVyeUxpc3Q8Q2xyRGF0YWdyaWRDb2x1bW5Ub2dnbGVCdXR0b24+O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBoaWRlYWJsZUNvbHVtblNlcnZpY2U6IEhpZGVhYmxlQ29sdW1uU2VydmljZSxcbiAgICBwcml2YXRlIGNvbHVtblRvZ2dsZUJ1dHRvbnM6IENvbHVtblRvZ2dsZUJ1dHRvbnNTZXJ2aWNlLFxuICAgIHB1YmxpYyBjb21tb25TdHJpbmdzOiBDbHJDb21tb25TdHJpbmdzXG4gICkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMuaGlkZWFibGVDb2x1bW5TZXJ2aWNlLmNvbHVtbkxpc3RDaGFuZ2Uuc3Vic2NyaWJlKGNvbHVtbkxpc3QgPT4ge1xuICAgICAgICAvLyBSZXNldCB0aGUgbGlzdCBvZiBjb2x1bW5zXG4gICAgICAgIHRoaXMuY29sdW1ucy5sZW5ndGggPSAwO1xuICAgICAgICB0aGlzLmhpZGVhYmxlQ29sdW1uU2VydmljZS51cGRhdGVGb3JMYXN0VmlzaWJsZUNvbHVtbigpO1xuICAgICAgICB0aGlzLmFsbENvbHVtbnNWaXNpYmxlID0gdGhpcy5oaWRlYWJsZUNvbHVtblNlcnZpY2UuY2hlY2tGb3JBbGxDb2x1bW5zVmlzaWJsZTtcbiAgICAgICAgdGhpcy5jb2x1bW5Ub2dnbGVCdXR0b25zLnNlbGVjdEFsbERpc2FibGVkID0gdGhpcy5hbGxDb2x1bW5zVmlzaWJsZTtcblxuICAgICAgICAvLyBBZGQgb25seSB0aGUgaGlkZGVuIGNvbHVtbnMgdG8gdGhlIHRvZ2dsZXIuXG4gICAgICAgIGNvbHVtbkxpc3QuZm9yRWFjaChjb2wgPT4ge1xuICAgICAgICAgIGlmIChjb2wpIHtcbiAgICAgICAgICAgIHRoaXMuY29sdW1ucy5wdXNoKGNvbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5jb2x1bW5Ub2dnbGVCdXR0b25zLnNlbGVjdEFsbEJ1dHRvbkNsaWNrZWQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5zZWxlY3RBbGwoKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHN1YiA9PiBzdWIudW5zdWJzY3JpYmUoKSk7XG4gIH1cblxuICBzZWxlY3RBbGwoKSB7XG4gICAgdGhpcy5oaWRlYWJsZUNvbHVtblNlcnZpY2Uuc2hvd0hpZGRlbkNvbHVtbnMoKTtcbiAgICB0aGlzLmFsbENvbHVtbnNWaXNpYmxlID0gdGhpcy5oaWRlYWJsZUNvbHVtblNlcnZpY2UuY2hlY2tGb3JBbGxDb2x1bW5zVmlzaWJsZTtcbiAgfVxuXG4gIHRvZ2dsZUNvbHVtbihldmVudDogYm9vbGVhbiwgY29sdW1uOiBEYXRhZ3JpZEhpZGVhYmxlQ29sdW1uTW9kZWwpIHtcbiAgICBjb2x1bW4uaGlkZGVuID0gIWV2ZW50O1xuICAgIHRoaXMuYWxsQ29sdW1uc1Zpc2libGUgPSB0aGlzLmhpZGVhYmxlQ29sdW1uU2VydmljZS5jaGVja0ZvckFsbENvbHVtbnNWaXNpYmxlO1xuICAgIHRoaXMuY29sdW1uVG9nZ2xlQnV0dG9ucy5zZWxlY3RBbGxEaXNhYmxlZCA9IHRoaXMuYWxsQ29sdW1uc1Zpc2libGU7XG4gICAgdGhpcy5oaWRlYWJsZUNvbHVtblNlcnZpY2UudXBkYXRlRm9yTGFzdFZpc2libGVDb2x1bW4oKTtcbiAgfVxuXG4gIHRvZ2dsZVVJKCkge1xuICAgIHRoaXMub3BlbiA9ICF0aGlzLm9wZW47XG4gIH1cbn1cbiJdfQ==