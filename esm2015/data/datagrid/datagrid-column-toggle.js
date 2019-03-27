/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        this.subscriptions.push(this.hideableColumnService.columnListChange.subscribe((/**
         * @param {?} columnList
         * @return {?}
         */
        columnList => {
            // Reset the list of columns
            this.columns.length = 0;
            this.hideableColumnService.updateForLastVisibleColumn();
            this.allColumnsVisible = this.hideableColumnService.checkForAllColumnsVisible;
            this.columnToggleButtons.selectAllDisabled = this.allColumnsVisible;
            // Add only the hidden columns to the toggler.
            columnList.forEach((/**
             * @param {?} col
             * @return {?}
             */
            col => {
                if (col) {
                    this.columns.push(col);
                }
            }));
        })));
        this.subscriptions.push(this.columnToggleButtons.selectAllButtonClicked.subscribe((/**
         * @return {?}
         */
        () => {
            this.selectAll();
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
    /**
     * @return {?}
     */
    selectAll() {
        this.hideableColumnService.showHiddenColumns();
        this.allColumnsVisible = this.hideableColumnService.checkForAllColumnsVisible;
        this.columnToggleButtons.selectAllDisabled = this.allColumnsVisible;
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
                    <clr-checkbox-wrapper>
                        <input clrCheckbox type="checkbox"
                          [disabled]="column.lastVisibleColumn"
                          [ngModel]="!column.hidden"
                          (ngModelChange)="toggleColumn($event, column)">
                        <label><ng-template [ngTemplateOutlet]="column.template"></ng-template></label>
                    </clr-checkbox-wrapper>
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
    /**
     * @type {?}
     * @private
     */
    ClrDatagridColumnToggle.prototype.subscriptions;
    /**
     * @type {?}
     * @private
     */
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
    /**
     * @type {?}
     * @private
     */
    ClrDatagridColumnToggle.prototype.columnToggleButtons;
    /** @type {?} */
    ClrDatagridColumnToggle.prototype.commonStrings;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtY29sdW1uLXRvZ2dsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvZGF0YWdyaWQtY29sdW1uLXRvZ2dsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFLQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQXFCLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUd2RyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFFckQsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDaEYsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFFOUUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDdkYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDNUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFvRDdFLE1BQU0sT0FBTyx1QkFBdUI7Ozs7OztJQTJCbEMsWUFDUyxxQkFBNEMsRUFDM0MsbUJBQStDLEVBQ2hELGFBQStCO1FBRi9CLDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBdUI7UUFDM0Msd0JBQW1CLEdBQW5CLG1CQUFtQixDQUE0QjtRQUNoRCxrQkFBYSxHQUFiLGFBQWEsQ0FBa0I7UUE3QmhDLGtCQUFhLEdBQW1CLEVBQUUsQ0FBQzs7Ozs7UUFNcEMsZ0JBQVcsR0FBVSxLQUFLLENBQUMsUUFBUSxDQUFDO1FBQ3BDLGlCQUFZLEdBQVUsS0FBSyxDQUFDLFdBQVcsQ0FBQztRQUN4QyxTQUFJLEdBQVksS0FBSyxDQUFDOzs7OztRQUt0QixZQUFPLEdBQWtDLEVBQUUsQ0FBQztJQWlCaEQsQ0FBQzs7OztJQWZKLElBQVcsaUJBQWlCO1FBQzFCLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFD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LDBDQUFrRzs7SUFHaEcsd0RBQW1EOzs7OztJQUNuRCxzREFBdUQ7O0lBQ3ZELGdEQUFzQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IENvbXBvbmVudCwgQ29udGVudENoaWxkLCBDb250ZW50Q2hpbGRyZW4sIE9uRGVzdHJveSwgT25Jbml0LCBRdWVyeUxpc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBQb2ludCB9IGZyb20gJy4uLy4uL3BvcG92ZXIvY29tbW9uL3BvcG92ZXInO1xuXG5pbXBvcnQgeyBDbHJEYXRhZ3JpZENvbHVtblRvZ2dsZUJ1dHRvbiB9IGZyb20gJy4vZGF0YWdyaWQtY29sdW1uLXRvZ2dsZS1idXR0b24nO1xuaW1wb3J0IHsgQ2xyRGF0YWdyaWRDb2x1bW5Ub2dnbGVUaXRsZSB9IGZyb20gJy4vZGF0YWdyaWQtY29sdW1uLXRvZ2dsZS10aXRsZSc7XG5pbXBvcnQgeyBEYXRhZ3JpZEhpZGVhYmxlQ29sdW1uTW9kZWwgfSBmcm9tICcuL2RhdGFncmlkLWhpZGVhYmxlLWNvbHVtbi5tb2RlbCc7XG5pbXBvcnQgeyBDb2x1bW5Ub2dnbGVCdXR0b25zU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2NvbHVtbi10b2dnbGUtYnV0dG9ucy5zZXJ2aWNlJztcbmltcG9ydCB7IEhpZGVhYmxlQ29sdW1uU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2hpZGVhYmxlLWNvbHVtbi5zZXJ2aWNlJztcbmltcG9ydCB7IENsckNvbW1vblN0cmluZ3MgfSBmcm9tICcuLi8uLi91dGlscy9pMThuL2NvbW1vbi1zdHJpbmdzLmludGVyZmFjZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci1kZy1jb2x1bW4tdG9nZ2xlJyxcbiAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICNhbmNob3JcbiAgICAgICAgICAgICAgICAoY2xpY2spPVwidG9nZ2xlVUkoKVwiXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJidG4gYnRuLXNtIGJ0bi1saW5rIGNvbHVtbi10b2dnbGUtLWFjdGlvblwiXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiPlxuICAgICAgICAgICAgPGNsci1pY29uIHNoYXBlPVwidmlldy1jb2x1bW5zXCIgW2F0dHIudGl0bGVdPVwiY29tbW9uU3RyaW5ncy5waWNrQ29sdW1uc1wiPjwvY2xyLWljb24+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1uLXN3aXRjaFwiXG4gICAgICAgICAgICAgKmNsclBvcG92ZXJPbGQ9XCJvcGVuOyBhbmNob3I6IGFuY2hvcjsgYW5jaG9yUG9pbnQ6IGFuY2hvclBvaW50OyBwb3BvdmVyUG9pbnQ6IHBvcG92ZXJQb2ludFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN3aXRjaC1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIXRpdGxlXCI+U2hvdyBDb2x1bW5zPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiY2xyLWRnLWNvbHVtbi10b2dnbGUtdGl0bGVcIj48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImJ0biBidG4tc20gYnRuLWxpbmtcIlxuICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwidG9nZ2xlVUkoKVwiXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIj5cbiAgICAgICAgICAgICAgICAgICAgPGNsci1pY29uIHNoYXBlPVwiY2xvc2VcIiBbYXR0ci50aXRsZV09XCJjb21tb25TdHJpbmdzLmNsb3NlXCI+PC9jbHItaWNvbj5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPHVsIGNsYXNzPVwic3dpdGNoLWNvbnRlbnQgbGlzdC11bnN0eWxlZFwiPlxuICAgICAgICAgICAgICAgIDxsaSAqbmdGb3I9XCJsZXQgY29sdW1uIG9mIGNvbHVtbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgPGNsci1jaGVja2JveC13cmFwcGVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsckNoZWNrYm94IHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJjb2x1bW4ubGFzdFZpc2libGVDb2x1bW5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdNb2RlbF09XCIhY29sdW1uLmhpZGRlblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChuZ01vZGVsQ2hhbmdlKT1cInRvZ2dsZUNvbHVtbigkZXZlbnQsIGNvbHVtbilcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD48bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwiY29sdW1uLnRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT48L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8L2Nsci1jaGVja2JveC13cmFwcGVyPlxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN3aXRjaC1mb290ZXJcIiAqbmdJZj1cImJ1dHRvbnMubGVuZ3RoID4gMFwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImNsci1kZy1jb2x1bW4tdG9nZ2xlLWJ1dHRvblwiPjwvbmctY29udGVudD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN3aXRjaC1mb290ZXJcIiAqbmdJZj1cImJ1dHRvbnMubGVuZ3RoID09PSAwXCI+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiYnRuIGJ0bi1zbSBidG4tbGluayBwNiB0ZXh0LXVwcGVyY2FzZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cImFsbENvbHVtbnNWaXNpYmxlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwic2VsZWN0QWxsKClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIj5TZWxlY3QgQWxsXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gIGhvc3Q6IHsgJ1tjbGFzcy5jb2x1bW4tc3dpdGNoLXdyYXBwZXJdJzogJ3RydWUnLCAnW2NsYXNzLmFjdGl2ZV0nOiAnb3BlbicgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyRGF0YWdyaWRDb2x1bW5Ub2dnbGUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcbiAgcHJpdmF0ZSBfYWxsQ29sdW1uc1Zpc2libGU6IGJvb2xlYW47XG5cbiAgLyoqKlxuICAgKiBQb3BvdmVyIGluaXRcbiAgICovXG4gIHB1YmxpYyBhbmNob3JQb2ludDogUG9pbnQgPSBQb2ludC5UT1BfTEVGVDtcbiAgcHVibGljIHBvcG92ZXJQb2ludDogUG9pbnQgPSBQb2ludC5MRUZUX0JPVFRPTTtcbiAgcHVibGljIG9wZW46IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKioqKlxuICAgKiBEYXRhZ3JpZEhpZGVhYmxlQ29sdW1uTW9kZWwgaW5pdFxuICAgKi9cbiAgcHVibGljIGNvbHVtbnM6IERhdGFncmlkSGlkZWFibGVDb2x1bW5Nb2RlbFtdID0gW107XG5cbiAgcHVibGljIGdldCBhbGxDb2x1bW5zVmlzaWJsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fYWxsQ29sdW1uc1Zpc2libGU7XG4gIH1cblxuICBwdWJsaWMgc2V0IGFsbENvbHVtbnNWaXNpYmxlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fYWxsQ29sdW1uc1Zpc2libGUgPSB2YWx1ZTtcbiAgfVxuXG4gIEBDb250ZW50Q2hpbGQoQ2xyRGF0YWdyaWRDb2x1bW5Ub2dnbGVUaXRsZSkgdGl0bGU6IENsckRhdGFncmlkQ29sdW1uVG9nZ2xlVGl0bGU7XG4gIEBDb250ZW50Q2hpbGRyZW4oQ2xyRGF0YWdyaWRDb2x1bW5Ub2dnbGVCdXR0b24pIGJ1dHRvbnM6IFF1ZXJ5TGlzdDxDbHJEYXRhZ3JpZENvbHVtblRvZ2dsZUJ1dHRvbj47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGhpZGVhYmxlQ29sdW1uU2VydmljZTogSGlkZWFibGVDb2x1bW5TZXJ2aWNlLFxuICAgIHByaXZhdGUgY29sdW1uVG9nZ2xlQnV0dG9uczogQ29sdW1uVG9nZ2xlQnV0dG9uc1NlcnZpY2UsXG4gICAgcHVibGljIGNvbW1vblN0cmluZ3M6IENsckNvbW1vblN0cmluZ3NcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5oaWRlYWJsZUNvbHVtblNlcnZpY2UuY29sdW1uTGlzdENoYW5nZS5zdWJzY3JpYmUoY29sdW1uTGlzdCA9PiB7XG4gICAgICAgIC8vIFJlc2V0IHRoZSBsaXN0IG9mIGNvbHVtbnNcbiAgICAgICAgdGhpcy5jb2x1bW5zLmxlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMuaGlkZWFibGVDb2x1bW5TZXJ2aWNlLnVwZGF0ZUZvckxhc3RWaXNpYmxlQ29sdW1uKCk7XG4gICAgICAgIHRoaXMuYWxsQ29sdW1uc1Zpc2libGUgPSB0aGlzLmhpZGVhYmxlQ29sdW1uU2VydmljZS5jaGVja0ZvckFsbENvbHVtbnNWaXNpYmxlO1xuICAgICAgICB0aGlzLmNvbHVtblRvZ2dsZUJ1dHRvbnMuc2VsZWN0QWxsRGlzYWJsZWQgPSB0aGlzLmFsbENvbHVtbnNWaXNpYmxlO1xuXG4gICAgICAgIC8vIEFkZCBvbmx5IHRoZSBoaWRkZW4gY29sdW1ucyB0byB0aGUgdG9nZ2xlci5cbiAgICAgICAgY29sdW1uTGlzdC5mb3JFYWNoKGNvbCA9PiB7XG4gICAgICAgICAgaWYgKGNvbCkge1xuICAgICAgICAgICAgdGhpcy5jb2x1bW5zLnB1c2goY29sKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICApO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLmNvbHVtblRvZ2dsZUJ1dHRvbnMuc2VsZWN0QWxsQnV0dG9uQ2xpY2tlZC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLnNlbGVjdEFsbCgpO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmZvckVhY2goc3ViID0+IHN1Yi51bnN1YnNjcmliZSgpKTtcbiAgfVxuXG4gIHNlbGVjdEFsbCgpIHtcbiAgICB0aGlzLmhpZGVhYmxlQ29sdW1uU2VydmljZS5zaG93SGlkZGVuQ29sdW1ucygpO1xuICAgIHRoaXMuYWxsQ29sdW1uc1Zpc2libGUgPSB0aGlzLmhpZGVhYmxlQ29sdW1uU2VydmljZS5jaGVja0ZvckFsbENvbHVtbnNWaXNpYmxlO1xuICAgIHRoaXMuY29sdW1uVG9nZ2xlQnV0dG9ucy5zZWxlY3RBbGxEaXNhYmxlZCA9IHRoaXMuYWxsQ29sdW1uc1Zpc2libGU7XG4gIH1cblxuICB0b2dnbGVDb2x1bW4oZXZlbnQ6IGJvb2xlYW4sIGNvbHVtbjogRGF0YWdyaWRIaWRlYWJsZUNvbHVtbk1vZGVsKSB7XG4gICAgY29sdW1uLmhpZGRlbiA9ICFldmVudDtcbiAgICB0aGlzLmFsbENvbHVtbnNWaXNpYmxlID0gdGhpcy5oaWRlYWJsZUNvbHVtblNlcnZpY2UuY2hlY2tGb3JBbGxDb2x1bW5zVmlzaWJsZTtcbiAgICB0aGlzLmNvbHVtblRvZ2dsZUJ1dHRvbnMuc2VsZWN0QWxsRGlzYWJsZWQgPSB0aGlzLmFsbENvbHVtbnNWaXNpYmxlO1xuICAgIHRoaXMuaGlkZWFibGVDb2x1bW5TZXJ2aWNlLnVwZGF0ZUZvckxhc3RWaXNpYmxlQ29sdW1uKCk7XG4gIH1cblxuICB0b2dnbGVVSSgpIHtcbiAgICB0aGlzLm9wZW4gPSAhdGhpcy5vcGVuO1xuICB9XG59XG4iXX0=