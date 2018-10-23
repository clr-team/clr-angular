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
var ClrDatagridColumnToggle = /** @class */ (function () {
    function ClrDatagridColumnToggle(hideableColumnService, columnToggleButtons, commonStrings) {
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
    Object.defineProperty(ClrDatagridColumnToggle.prototype, "allColumnsVisible", {
        get: /**
         * @return {?}
         */
        function () {
            return this._allColumnsVisible;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._allColumnsVisible = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ClrDatagridColumnToggle.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.subscriptions.push(this.hideableColumnService.columnListChange.subscribe(function (columnList) {
            // Reset the list of columns
            _this.columns.length = 0;
            _this.hideableColumnService.updateForLastVisibleColumn();
            _this.allColumnsVisible = _this.hideableColumnService.checkForAllColumnsVisible;
            _this.columnToggleButtons.selectAllDisabled = _this.allColumnsVisible;
            // Add only the hidden columns to the toggler.
            columnList.forEach(function (col) {
                if (col) {
                    _this.columns.push(col);
                }
            });
        }));
        this.subscriptions.push(this.columnToggleButtons.selectAllButtonClicked.subscribe(function () {
            _this.selectAll();
        }));
    };
    /**
     * @return {?}
     */
    ClrDatagridColumnToggle.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    /**
     * @return {?}
     */
    ClrDatagridColumnToggle.prototype.selectAll = /**
     * @return {?}
     */
    function () {
        this.hideableColumnService.showHiddenColumns();
        this.allColumnsVisible = this.hideableColumnService.checkForAllColumnsVisible;
    };
    /**
     * @param {?} event
     * @param {?} column
     * @return {?}
     */
    ClrDatagridColumnToggle.prototype.toggleColumn = /**
     * @param {?} event
     * @param {?} column
     * @return {?}
     */
    function (event, column) {
        column.hidden = !event;
        this.allColumnsVisible = this.hideableColumnService.checkForAllColumnsVisible;
        this.columnToggleButtons.selectAllDisabled = this.allColumnsVisible;
        this.hideableColumnService.updateForLastVisibleColumn();
    };
    /**
     * @return {?}
     */
    ClrDatagridColumnToggle.prototype.toggleUI = /**
     * @return {?}
     */
    function () {
        this.open = !this.open;
    };
    ClrDatagridColumnToggle.decorators = [
        { type: Component, args: [{
                    selector: 'clr-dg-column-toggle',
                    template: "\n        <button\n                #anchor\n                (click)=\"toggleUI()\"\n                class=\"btn btn-sm btn-link column-toggle--action\"\n                type=\"button\">\n            <clr-icon shape=\"view-columns\" [attr.title]=\"commonStrings.pickColumns\"></clr-icon>\n        </button>\n        <div class=\"column-switch\"\n             *clrPopoverOld=\"open; anchor: anchor; anchorPoint: anchorPoint; popoverPoint: popoverPoint\">\n            <div class=\"switch-header\">\n                <ng-container *ngIf=\"!title\">Show Columns</ng-container>\n                <ng-content select=\"clr-dg-column-toggle-title\"></ng-content>\n                <button\n                    class=\"btn btn-sm btn-link\"\n                    (click)=\"toggleUI()\"\n                    type=\"button\">\n                    <clr-icon shape=\"close\" [attr.title]=\"commonStrings.close\"></clr-icon>\n                </button>\n            </div>\n            <ul class=\"switch-content list-unstyled\">\n                <li *ngFor=\"let column of columns\">\n                    <clr-checkbox-container>\n                        <input clrCheckbox type=\"checkbox\"\n                          [disabled]=\"column.lastVisibleColumn\"\n                          [ngModel]=\"!column.hidden\" \n                          (ngModelChange)=\"toggleColumn($event, column)\">\n                        <label><ng-template [ngTemplateOutlet]=\"column.template\"></ng-template></label>\n                    </clr-checkbox-container>\n                </li>\n            </ul>\n            <div class=\"switch-footer\" *ngIf=\"buttons.length > 0\">\n                <ng-content select=\"clr-dg-column-toggle-button\"></ng-content>\n            </div>\n            <div class=\"switch-footer\" *ngIf=\"buttons.length === 0\">\n                <div>\n                    <button\n                            class=\"btn btn-sm btn-link p6 text-uppercase\"\n                            [disabled]=\"allColumnsVisible\"\n                            (click)=\"selectAll()\"\n                            type=\"button\">Select All\n                    </button>\n                </div>\n            </div>\n        </div>\n    ",
                    host: { '[class.column-switch-wrapper]': 'true', '[class.active]': 'open' }
                }] }
    ];
    /** @nocollapse */
    ClrDatagridColumnToggle.ctorParameters = function () { return [
        { type: HideableColumnService },
        { type: ColumnToggleButtonsService },
        { type: ClrCommonStrings }
    ]; };
    ClrDatagridColumnToggle.propDecorators = {
        title: [{ type: ContentChild, args: [ClrDatagridColumnToggleTitle,] }],
        buttons: [{ type: ContentChildren, args: [ClrDatagridColumnToggleButton,] }]
    };
    return ClrDatagridColumnToggle;
}());
export { ClrDatagridColumnToggle };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtY29sdW1uLXRvZ2dsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvZGF0YWdyaWQtY29sdW1uLXRvZ2dsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFLQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQXFCLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUd2RyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFFckQsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDaEYsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFFOUUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDdkYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDNUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFFN0U7SUE2RUUsaUNBQ1MscUJBQTRDLEVBQzNDLG1CQUErQyxFQUNoRCxhQUErQjtRQUYvQiwwQkFBcUIsR0FBckIscUJBQXFCLENBQXVCO1FBQzNDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBNEI7UUFDaEQsa0JBQWEsR0FBYixhQUFhLENBQWtCO1FBN0JoQyxrQkFBYSxHQUFtQixFQUFFLENBQUM7Ozs7O1FBTXBDLGdCQUFXLEdBQVUsS0FBSyxDQUFDLFFBQVEsQ0FBQztRQUNwQyxpQkFBWSxHQUFVLEtBQUssQ0FBQyxXQUFXLENBQUM7UUFDeEMsU0FBSSxHQUFZLEtBQUssQ0FBQzs7Ozs7UUFLdEIsWUFBTyxHQUFrQyxFQUFFLENBQUM7SUFpQmhELENBQUM7SUFmSixzQkFBVyxzREFBaUI7Ozs7UUFBNUI7WUFDRSxPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztRQUNqQyxDQUFDOzs7OztR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Iiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgQ29tcG9uZW50LCBDb250ZW50Q2hpbGQsIENvbnRlbnRDaGlsZHJlbiwgT25EZXN0cm95LCBPbkluaXQsIFF1ZXJ5TGlzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IFBvaW50IH0gZnJvbSAnLi4vLi4vcG9wb3Zlci9jb21tb24vcG9wb3Zlcic7XG5cbmltcG9ydCB7IENsckRhdGFncmlkQ29sdW1uVG9nZ2xlQnV0dG9uIH0gZnJvbSAnLi9kYXRhZ3JpZC1jb2x1bW4tdG9nZ2xlLWJ1dHRvbic7XG5pbXBvcnQgeyBDbHJEYXRhZ3JpZENvbHVtblRvZ2dsZVRpdGxlIH0gZnJvbSAnLi9kYXRhZ3JpZC1jb2x1bW4tdG9nZ2xlLXRpdGxlJztcbmltcG9ydCB7IERhdGFncmlkSGlkZWFibGVDb2x1bW5Nb2RlbCB9IGZyb20gJy4vZGF0YWdyaWQtaGlkZWFibGUtY29sdW1uLm1vZGVsJztcbmltcG9ydCB7IENvbHVtblRvZ2dsZUJ1dHRvbnNTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvY29sdW1uLXRvZ2dsZS1idXR0b25zLnNlcnZpY2UnO1xuaW1wb3J0IHsgSGlkZWFibGVDb2x1bW5TZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvaGlkZWFibGUtY29sdW1uLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2xyQ29tbW9uU3RyaW5ncyB9IGZyb20gJy4uLy4uL3V0aWxzL2kxOG4vY29tbW9uLXN0cmluZ3MuaW50ZXJmYWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLWRnLWNvbHVtbi10b2dnbGUnLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgI2FuY2hvclxuICAgICAgICAgICAgICAgIChjbGljayk9XCJ0b2dnbGVVSSgpXCJcbiAgICAgICAgICAgICAgICBjbGFzcz1cImJ0biBidG4tc20gYnRuLWxpbmsgY29sdW1uLXRvZ2dsZS0tYWN0aW9uXCJcbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCI+XG4gICAgICAgICAgICA8Y2xyLWljb24gc2hhcGU9XCJ2aWV3LWNvbHVtbnNcIiBbYXR0ci50aXRsZV09XCJjb21tb25TdHJpbmdzLnBpY2tDb2x1bW5zXCI+PC9jbHItaWNvbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW4tc3dpdGNoXCJcbiAgICAgICAgICAgICAqY2xyUG9wb3Zlck9sZD1cIm9wZW47IGFuY2hvcjogYW5jaG9yOyBhbmNob3JQb2ludDogYW5jaG9yUG9pbnQ7IHBvcG92ZXJQb2ludDogcG9wb3ZlclBvaW50XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3dpdGNoLWhlYWRlclwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhdGl0bGVcIj5TaG93IENvbHVtbnM8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJjbHItZGctY29sdW1uLXRvZ2dsZS10aXRsZVwiPjwvbmctY29udGVudD5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiYnRuIGJ0bi1zbSBidG4tbGlua1wiXG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJ0b2dnbGVVSSgpXCJcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiPlxuICAgICAgICAgICAgICAgICAgICA8Y2xyLWljb24gc2hhcGU9XCJjbG9zZVwiIFthdHRyLnRpdGxlXT1cImNvbW1vblN0cmluZ3MuY2xvc2VcIj48L2Nsci1pY29uPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8dWwgY2xhc3M9XCJzd2l0Y2gtY29udGVudCBsaXN0LXVuc3R5bGVkXCI+XG4gICAgICAgICAgICAgICAgPGxpICpuZ0Zvcj1cImxldCBjb2x1bW4gb2YgY29sdW1uc1wiPlxuICAgICAgICAgICAgICAgICAgICA8Y2xyLWNoZWNrYm94LWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbHJDaGVja2JveCB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiY29sdW1uLmxhc3RWaXNpYmxlQ29sdW1uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW25nTW9kZWxdPVwiIWNvbHVtbi5oaWRkZW5cIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKG5nTW9kZWxDaGFuZ2UpPVwidG9nZ2xlQ29sdW1uKCRldmVudCwgY29sdW1uKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPjxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJjb2x1bW4udGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDwvY2xyLWNoZWNrYm94LWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzd2l0Y2gtZm9vdGVyXCIgKm5nSWY9XCJidXR0b25zLmxlbmd0aCA+IDBcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJjbHItZGctY29sdW1uLXRvZ2dsZS1idXR0b25cIj48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzd2l0Y2gtZm9vdGVyXCIgKm5nSWY9XCJidXR0b25zLmxlbmd0aCA9PT0gMFwiPlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImJ0biBidG4tc20gYnRuLWxpbmsgcDYgdGV4dC11cHBlcmNhc2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJhbGxDb2x1bW5zVmlzaWJsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cInNlbGVjdEFsbCgpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCI+U2VsZWN0IEFsbFxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICBob3N0OiB7ICdbY2xhc3MuY29sdW1uLXN3aXRjaC13cmFwcGVyXSc6ICd0cnVlJywgJ1tjbGFzcy5hY3RpdmVdJzogJ29wZW4nIH0sXG59KVxuZXhwb3J0IGNsYXNzIENsckRhdGFncmlkQ29sdW1uVG9nZ2xlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBwcml2YXRlIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG4gIHByaXZhdGUgX2FsbENvbHVtbnNWaXNpYmxlOiBib29sZWFuO1xuXG4gIC8qKipcbiAgICogUG9wb3ZlciBpbml0XG4gICAqL1xuICBwdWJsaWMgYW5jaG9yUG9pbnQ6IFBvaW50ID0gUG9pbnQuVE9QX0xFRlQ7XG4gIHB1YmxpYyBwb3BvdmVyUG9pbnQ6IFBvaW50ID0gUG9pbnQuTEVGVF9CT1RUT007XG4gIHB1YmxpYyBvcGVuOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqKipcbiAgICogRGF0YWdyaWRIaWRlYWJsZUNvbHVtbk1vZGVsIGluaXRcbiAgICovXG4gIHB1YmxpYyBjb2x1bW5zOiBEYXRhZ3JpZEhpZGVhYmxlQ29sdW1uTW9kZWxbXSA9IFtdO1xuXG4gIHB1YmxpYyBnZXQgYWxsQ29sdW1uc1Zpc2libGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2FsbENvbHVtbnNWaXNpYmxlO1xuICB9XG5cbiAgcHVibGljIHNldCBhbGxDb2x1bW5zVmlzaWJsZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2FsbENvbHVtbnNWaXNpYmxlID0gdmFsdWU7XG4gIH1cblxuICBAQ29udGVudENoaWxkKENsckRhdGFncmlkQ29sdW1uVG9nZ2xlVGl0bGUpIHRpdGxlOiBDbHJEYXRhZ3JpZENvbHVtblRvZ2dsZVRpdGxlO1xuICBAQ29udGVudENoaWxkcmVuKENsckRhdGFncmlkQ29sdW1uVG9nZ2xlQnV0dG9uKSBidXR0b25zOiBRdWVyeUxpc3Q8Q2xyRGF0YWdyaWRDb2x1bW5Ub2dnbGVCdXR0b24+O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBoaWRlYWJsZUNvbHVtblNlcnZpY2U6IEhpZGVhYmxlQ29sdW1uU2VydmljZSxcbiAgICBwcml2YXRlIGNvbHVtblRvZ2dsZUJ1dHRvbnM6IENvbHVtblRvZ2dsZUJ1dHRvbnNTZXJ2aWNlLFxuICAgIHB1YmxpYyBjb21tb25TdHJpbmdzOiBDbHJDb21tb25TdHJpbmdzXG4gICkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMuaGlkZWFibGVDb2x1bW5TZXJ2aWNlLmNvbHVtbkxpc3RDaGFuZ2Uuc3Vic2NyaWJlKGNvbHVtbkxpc3QgPT4ge1xuICAgICAgICAvLyBSZXNldCB0aGUgbGlzdCBvZiBjb2x1bW5zXG4gICAgICAgIHRoaXMuY29sdW1ucy5sZW5ndGggPSAwO1xuICAgICAgICB0aGlzLmhpZGVhYmxlQ29sdW1uU2VydmljZS51cGRhdGVGb3JMYXN0VmlzaWJsZUNvbHVtbigpO1xuICAgICAgICB0aGlzLmFsbENvbHVtbnNWaXNpYmxlID0gdGhpcy5oaWRlYWJsZUNvbHVtblNlcnZpY2UuY2hlY2tGb3JBbGxDb2x1bW5zVmlzaWJsZTtcbiAgICAgICAgdGhpcy5jb2x1bW5Ub2dnbGVCdXR0b25zLnNlbGVjdEFsbERpc2FibGVkID0gdGhpcy5hbGxDb2x1bW5zVmlzaWJsZTtcblxuICAgICAgICAvLyBBZGQgb25seSB0aGUgaGlkZGVuIGNvbHVtbnMgdG8gdGhlIHRvZ2dsZXIuXG4gICAgICAgIGNvbHVtbkxpc3QuZm9yRWFjaChjb2wgPT4ge1xuICAgICAgICAgIGlmIChjb2wpIHtcbiAgICAgICAgICAgIHRoaXMuY29sdW1ucy5wdXNoKGNvbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5jb2x1bW5Ub2dnbGVCdXR0b25zLnNlbGVjdEFsbEJ1dHRvbkNsaWNrZWQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5zZWxlY3RBbGwoKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHN1YiA9PiBzdWIudW5zdWJzY3JpYmUoKSk7XG4gIH1cblxuICBzZWxlY3RBbGwoKSB7XG4gICAgdGhpcy5oaWRlYWJsZUNvbHVtblNlcnZpY2Uuc2hvd0hpZGRlbkNvbHVtbnMoKTtcbiAgICB0aGlzLmFsbENvbHVtbnNWaXNpYmxlID0gdGhpcy5oaWRlYWJsZUNvbHVtblNlcnZpY2UuY2hlY2tGb3JBbGxDb2x1bW5zVmlzaWJsZTtcbiAgfVxuXG4gIHRvZ2dsZUNvbHVtbihldmVudDogYm9vbGVhbiwgY29sdW1uOiBEYXRhZ3JpZEhpZGVhYmxlQ29sdW1uTW9kZWwpIHtcbiAgICBjb2x1bW4uaGlkZGVuID0gIWV2ZW50O1xuICAgIHRoaXMuYWxsQ29sdW1uc1Zpc2libGUgPSB0aGlzLmhpZGVhYmxlQ29sdW1uU2VydmljZS5jaGVja0ZvckFsbENvbHVtbnNWaXNpYmxlO1xuICAgIHRoaXMuY29sdW1uVG9nZ2xlQnV0dG9ucy5zZWxlY3RBbGxEaXNhYmxlZCA9IHRoaXMuYWxsQ29sdW1uc1Zpc2libGU7XG4gICAgdGhpcy5oaWRlYWJsZUNvbHVtblNlcnZpY2UudXBkYXRlRm9yTGFzdFZpc2libGVDb2x1bW4oKTtcbiAgfVxuXG4gIHRvZ2dsZVVJKCkge1xuICAgIHRoaXMub3BlbiA9ICF0aGlzLm9wZW47XG4gIH1cbn1cbiJdfQ==