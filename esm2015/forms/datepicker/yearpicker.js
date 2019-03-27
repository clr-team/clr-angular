/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ElementRef, HostListener } from '@angular/core';
import { DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, UP_ARROW } from '../../utils/key-codes/key-codes';
import { YearRangeModel } from './model/year-range.model';
import { DateNavigationService } from './providers/date-navigation.service';
import { DatepickerFocusService } from './providers/datepicker-focus.service';
import { ViewManagerService } from './providers/view-manager.service';
import { ClrCommonStrings } from '../../utils/i18n/common-strings.interface';
export class ClrYearpicker {
    /**
     * @param {?} _dateNavigationService
     * @param {?} _viewManagerService
     * @param {?} _datepickerFocusService
     * @param {?} _elRef
     * @param {?} commonStrings
     */
    constructor(_dateNavigationService, _viewManagerService, _datepickerFocusService, _elRef, commonStrings) {
        this._dateNavigationService = _dateNavigationService;
        this._viewManagerService = _viewManagerService;
        this._datepickerFocusService = _datepickerFocusService;
        this._elRef = _elRef;
        this.commonStrings = commonStrings;
        this.yearRangeModel = new YearRangeModel(this.calendarYear);
        this._focusedYear = this.calendarYear;
    }
    /**
     * Gets the year which the user is currently on.
     * @return {?}
     */
    get calendarYear() {
        return this._dateNavigationService.displayedCalendar.year;
    }
    /**
     * Increments the focus year by the value passed. Updates the YearRangeModel if the
     * new value is not in the current decade.
     * @private
     * @param {?} value
     * @return {?}
     */
    incrementFocusYearBy(value) {
        this._focusedYear = this._focusedYear + value;
        if (!this.yearRangeModel.inRange(this._focusedYear)) {
            if (value > 0) {
                this.yearRangeModel = this.yearRangeModel.nextDecade();
            }
            else {
                this.yearRangeModel = this.yearRangeModel.previousDecade();
            }
        }
        this._datepickerFocusService.focusCell(this._elRef);
    }
    /**
     * Calls the DateNavigationService to update the year value of the calendar.
     * Also changes the view to the daypicker.
     * @param {?} year
     * @return {?}
     */
    changeYear(year) {
        this._dateNavigationService.changeYear(year);
        this._viewManagerService.changeToDayView();
    }
    /**
     * Updates the YearRangeModel to the previous decade.
     * @return {?}
     */
    previousDecade() {
        this.yearRangeModel = this.yearRangeModel.previousDecade();
        // Year in the yearpicker is not focused because while navigating to a different decade,
        // you want the focus to remain on the decade switcher arrows.
    }
    /**
     * Updates the YearRangeModel to the current decade.
     * @return {?}
     */
    currentDecade() {
        if (!this.yearRangeModel.inRange(this._dateNavigationService.today.year)) {
            this.yearRangeModel = this.yearRangeModel.currentDecade();
        }
        this._datepickerFocusService.focusCell(this._elRef);
    }
    /**
     * Updates the YearRangeModel to the next decade.
     * @return {?}
     */
    nextDecade() {
        this.yearRangeModel = this.yearRangeModel.nextDecade();
        // Year in the yearpicker is not focused because while navigating to a different decade,
        // you want the focus to remain on the decade switcher arrows.
    }
    /**
     * Compares the year passed to the focused year and returns the tab index.
     * @param {?} year
     * @return {?}
     */
    getTabIndex(year) {
        if (!this.yearRangeModel.inRange(this._focusedYear)) {
            if (this.yearRangeModel.inRange(this.calendarYear)) {
                this._focusedYear = this.calendarYear;
            }
            else {
                this._focusedYear = this.yearRangeModel.middleYear;
            }
        }
        return this._focusedYear === year ? 0 : -1;
    }
    /**
     * Handles the Keyboard arrow navigation for the yearpicker.
     * @param {?} event
     * @return {?}
     */
    onKeyDown(event) {
        // NOTE: Didn't move this to the date navigation service because
        // the logic is fairly simple and it didn't make sense for me
        // to create extra observables just to move this logic to the service.
        if (event) {
            /** @type {?} */
            const keyCode = event.keyCode;
            if (keyCode === UP_ARROW) {
                event.preventDefault();
                this.incrementFocusYearBy(-1);
            }
            else if (keyCode === DOWN_ARROW) {
                event.preventDefault();
                this.incrementFocusYearBy(1);
            }
            else if (keyCode === RIGHT_ARROW) {
                event.preventDefault();
                this.incrementFocusYearBy(5);
            }
            else if (keyCode === LEFT_ARROW) {
                event.preventDefault();
                this.incrementFocusYearBy(-5);
            }
        }
    }
    /**
     * Focuses on the current calendar year when the View is initialized.
     * @return {?}
     */
    ngAfterViewInit() {
        this._datepickerFocusService.focusCell(this._elRef);
    }
}
ClrYearpicker.decorators = [
    { type: Component, args: [{
                selector: 'clr-yearpicker',
                template: `
        <div class="year-switchers">
            <button class="calendar-btn switcher" type="button" (click)="previousDecade()">
                <clr-icon shape="angle" dir="left" [attr.title]="commonStrings.previous"></clr-icon>
            </button>
            <button class="calendar-btn switcher" type="button" (click)="currentDecade()">
                <clr-icon shape="event" [attr.title]="commonStrings.current"></clr-icon>
            </button>
            <button class="calendar-btn switcher" type="button" (click)="nextDecade()">
                <clr-icon shape="angle" dir="right" [attr.title]="commonStrings.next"></clr-icon>
            </button>
        </div>
        <div class="years">
            <button
                *ngFor="let year of yearRangeModel.yearRange"
                type="button"
                class="calendar-btn year"
                [attr.tabindex]="getTabIndex(year)"
                [class.is-selected]="year === calendarYear"
                (click)="changeYear(year)">
                {{year}}
            </button>
        </div>
    `,
                host: {
                    '[class.yearpicker]': 'true',
                }
            }] }
];
/** @nocollapse */
ClrYearpicker.ctorParameters = () => [
    { type: DateNavigationService },
    { type: ViewManagerService },
    { type: DatepickerFocusService },
    { type: ElementRef },
    { type: ClrCommonStrings }
];
ClrYearpicker.propDecorators = {
    onKeyDown: [{ type: HostListener, args: ['keydown', ['$event'],] }]
};
if (false) {
    /**
     * YearRangeModel which is used to build the YearPicker view.
     * @type {?}
     */
    ClrYearpicker.prototype.yearRangeModel;
    /**
     * Keeps track of the current focused year.
     * @type {?}
     * @private
     */
    ClrYearpicker.prototype._focusedYear;
    /**
     * @type {?}
     * @private
     */
    ClrYearpicker.prototype._dateNavigationService;
    /**
     * @type {?}
     * @private
     */
    ClrYearpicker.prototype._viewManagerService;
    /**
     * @type {?}
     * @private
     */
    ClrYearpicker.prototype._datepickerFocusService;
    /**
     * @type {?}
     * @private
     */
    ClrYearpicker.prototype._elRef;
    /** @type {?} */
    ClrYearpicker.prototype.commonStrings;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWVhcnBpY2tlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImZvcm1zL2RhdGVwaWNrZXIveWVhcnBpY2tlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFLQSxPQUFPLEVBQWlCLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRW5GLE9BQU8sRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUVoRyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDMUQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDNUUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDOUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDdEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFnQzdFLE1BQU0sT0FBTyxhQUFhOzs7Ozs7OztJQUN4QixZQUNVLHNCQUE2QyxFQUM3QyxtQkFBdUMsRUFDdkMsdUJBQStDLEVBQy9DLE1BQWtCLEVBQ25CLGFBQStCO1FBSjlCLDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBdUI7UUFDN0Msd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFvQjtRQUN2Qyw0QkFBdUIsR0FBdkIsdUJBQXVCLENBQXdCO1FBQy9DLFdBQU0sR0FBTixNQUFNLENBQVk7UUFDbkIsa0JBQWEsR0FBYixhQUFhLENBQWtCO1FBRXRDLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxjQUFjLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzVELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztJQUN4QyxDQUFDOzs7OztJQWVELElBQUksWUFBWTtRQUNkLE9B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QU0sSUFBSSxPQUFPLEtBQUssV0FBVyxFQUFFO2dCQUNsQyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUM5QjtpQkFBTSxJQUFJLE9BQU8sS0FBSyxVQUFVLEVBQUU7Z0JBQ2pDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDdkIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDL0I7U0FDRjtJQUNILENBQUM7Ozs7O0lBS0QsZUFBZTtRQUNiLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3RELENBQUM7OztZQTdKRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQXVCUDtnQkFDSCxJQUFJLEVBQUU7b0JBQ0osb0JBQW9CLEVBQUUsTUFBTTtpQkFDN0I7YUFDRjs7OztZQWxDUSxxQkFBcUI7WUFFckIsa0JBQWtCO1lBRGxCLHNCQUFzQjtZQU5JLFVBQVU7WUFRcEMsZ0JBQWdCOzs7d0JBbUl0QixZQUFZLFNBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDOzs7Ozs7O0lBcEZuQyx1Q0FBK0I7Ozs7OztJQUsvQixxQ0FBNkI7Ozs7O0lBbEIzQiwrQ0FBcUQ7Ozs7O0lBQ3JELDRDQUErQzs7Ozs7SUFDL0MsZ0RBQXVEOzs7OztJQUN2RCwrQkFBMEI7O0lBQzFCLHNDQUFzQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IERPV05fQVJST1csIExFRlRfQVJST1csIFJJR0hUX0FSUk9XLCBVUF9BUlJPVyB9IGZyb20gJy4uLy4uL3V0aWxzL2tleS1jb2Rlcy9rZXktY29kZXMnO1xuXG5pbXBvcnQgeyBZZWFyUmFuZ2VNb2RlbCB9IGZyb20gJy4vbW9kZWwveWVhci1yYW5nZS5tb2RlbCc7XG5pbXBvcnQgeyBEYXRlTmF2aWdhdGlvblNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9kYXRlLW5hdmlnYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBEYXRlcGlja2VyRm9jdXNTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvZGF0ZXBpY2tlci1mb2N1cy5zZXJ2aWNlJztcbmltcG9ydCB7IFZpZXdNYW5hZ2VyU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL3ZpZXctbWFuYWdlci5zZXJ2aWNlJztcbmltcG9ydCB7IENsckNvbW1vblN0cmluZ3MgfSBmcm9tICcuLi8uLi91dGlscy9pMThuL2NvbW1vbi1zdHJpbmdzLmludGVyZmFjZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci15ZWFycGlja2VyJyxcbiAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cInllYXItc3dpdGNoZXJzXCI+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiY2FsZW5kYXItYnRuIHN3aXRjaGVyXCIgdHlwZT1cImJ1dHRvblwiIChjbGljayk9XCJwcmV2aW91c0RlY2FkZSgpXCI+XG4gICAgICAgICAgICAgICAgPGNsci1pY29uIHNoYXBlPVwiYW5nbGVcIiBkaXI9XCJsZWZ0XCIgW2F0dHIudGl0bGVdPVwiY29tbW9uU3RyaW5ncy5wcmV2aW91c1wiPjwvY2xyLWljb24+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJjYWxlbmRhci1idG4gc3dpdGNoZXJcIiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cImN1cnJlbnREZWNhZGUoKVwiPlxuICAgICAgICAgICAgICAgIDxjbHItaWNvbiBzaGFwZT1cImV2ZW50XCIgW2F0dHIudGl0bGVdPVwiY29tbW9uU3RyaW5ncy5jdXJyZW50XCI+PC9jbHItaWNvbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImNhbGVuZGFyLWJ0biBzd2l0Y2hlclwiIHR5cGU9XCJidXR0b25cIiAoY2xpY2spPVwibmV4dERlY2FkZSgpXCI+XG4gICAgICAgICAgICAgICAgPGNsci1pY29uIHNoYXBlPVwiYW5nbGVcIiBkaXI9XCJyaWdodFwiIFthdHRyLnRpdGxlXT1cImNvbW1vblN0cmluZ3MubmV4dFwiPjwvY2xyLWljb24+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ5ZWFyc1wiPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICpuZ0Zvcj1cImxldCB5ZWFyIG9mIHllYXJSYW5nZU1vZGVsLnllYXJSYW5nZVwiXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJjYWxlbmRhci1idG4geWVhclwiXG4gICAgICAgICAgICAgICAgW2F0dHIudGFiaW5kZXhdPVwiZ2V0VGFiSW5kZXgoeWVhcilcIlxuICAgICAgICAgICAgICAgIFtjbGFzcy5pcy1zZWxlY3RlZF09XCJ5ZWFyID09PSBjYWxlbmRhclllYXJcIlxuICAgICAgICAgICAgICAgIChjbGljayk9XCJjaGFuZ2VZZWFyKHllYXIpXCI+XG4gICAgICAgICAgICAgICAge3t5ZWFyfX1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy55ZWFycGlja2VyXSc6ICd0cnVlJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyWWVhcnBpY2tlciBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9kYXRlTmF2aWdhdGlvblNlcnZpY2U6IERhdGVOYXZpZ2F0aW9uU2VydmljZSxcbiAgICBwcml2YXRlIF92aWV3TWFuYWdlclNlcnZpY2U6IFZpZXdNYW5hZ2VyU2VydmljZSxcbiAgICBwcml2YXRlIF9kYXRlcGlja2VyRm9jdXNTZXJ2aWNlOiBEYXRlcGlja2VyRm9jdXNTZXJ2aWNlLFxuICAgIHByaXZhdGUgX2VsUmVmOiBFbGVtZW50UmVmLFxuICAgIHB1YmxpYyBjb21tb25TdHJpbmdzOiBDbHJDb21tb25TdHJpbmdzXG4gICkge1xuICAgIHRoaXMueWVhclJhbmdlTW9kZWwgPSBuZXcgWWVhclJhbmdlTW9kZWwodGhpcy5jYWxlbmRhclllYXIpO1xuICAgIHRoaXMuX2ZvY3VzZWRZZWFyID0gdGhpcy5jYWxlbmRhclllYXI7XG4gIH1cblxuICAvKipcbiAgICogWWVhclJhbmdlTW9kZWwgd2hpY2ggaXMgdXNlZCB0byBidWlsZCB0aGUgWWVhclBpY2tlciB2aWV3LlxuICAgKi9cbiAgeWVhclJhbmdlTW9kZWw6IFllYXJSYW5nZU1vZGVsO1xuXG4gIC8qKlxuICAgKiBLZWVwcyB0cmFjayBvZiB0aGUgY3VycmVudCBmb2N1c2VkIHllYXIuXG4gICAqL1xuICBwcml2YXRlIF9mb2N1c2VkWWVhcjogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSB5ZWFyIHdoaWNoIHRoZSB1c2VyIGlzIGN1cnJlbnRseSBvbi5cbiAgICovXG4gIGdldCBjYWxlbmRhclllYXIoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fZGF0ZU5hdmlnYXRpb25TZXJ2aWNlLmRpc3BsYXllZENhbGVuZGFyLnllYXI7XG4gIH1cblxuICAvKipcbiAgICogSW5jcmVtZW50cyB0aGUgZm9jdXMgeWVhciBieSB0aGUgdmFsdWUgcGFzc2VkLiBVcGRhdGVzIHRoZSBZZWFyUmFuZ2VNb2RlbCBpZiB0aGVcbiAgICogbmV3IHZhbHVlIGlzIG5vdCBpbiB0aGUgY3VycmVudCBkZWNhZGUuXG4gICAqL1xuICBwcml2YXRlIGluY3JlbWVudEZvY3VzWWVhckJ5KHZhbHVlOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9mb2N1c2VkWWVhciA9IHRoaXMuX2ZvY3VzZWRZZWFyICsgdmFsdWU7XG4gICAgaWYgKCF0aGlzLnllYXJSYW5nZU1vZGVsLmluUmFuZ2UodGhpcy5fZm9jdXNlZFllYXIpKSB7XG4gICAgICBpZiAodmFsdWUgPiAwKSB7XG4gICAgICAgIHRoaXMueWVhclJhbmdlTW9kZWwgPSB0aGlzLnllYXJSYW5nZU1vZGVsLm5leHREZWNhZGUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMueWVhclJhbmdlTW9kZWwgPSB0aGlzLnllYXJSYW5nZU1vZGVsLnByZXZpb3VzRGVjYWRlKCk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX2RhdGVwaWNrZXJGb2N1c1NlcnZpY2UuZm9jdXNDZWxsKHRoaXMuX2VsUmVmKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxscyB0aGUgRGF0ZU5hdmlnYXRpb25TZXJ2aWNlIHRvIHVwZGF0ZSB0aGUgeWVhciB2YWx1ZSBvZiB0aGUgY2FsZW5kYXIuXG4gICAqIEFsc28gY2hhbmdlcyB0aGUgdmlldyB0byB0aGUgZGF5cGlja2VyLlxuICAgKi9cbiAgY2hhbmdlWWVhcih5ZWFyOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9kYXRlTmF2aWdhdGlvblNlcnZpY2UuY2hhbmdlWWVhcih5ZWFyKTtcbiAgICB0aGlzLl92aWV3TWFuYWdlclNlcnZpY2UuY2hhbmdlVG9EYXlWaWV3KCk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgWWVhclJhbmdlTW9kZWwgdG8gdGhlIHByZXZpb3VzIGRlY2FkZS5cbiAgICovXG4gIHByZXZpb3VzRGVjYWRlKCk6IHZvaWQge1xuICAgIHRoaXMueWVhclJhbmdlTW9kZWwgPSB0aGlzLnllYXJSYW5nZU1vZGVsLnByZXZpb3VzRGVjYWRlKCk7XG4gICAgLy8gWWVhciBpbiB0aGUgeWVhcnBpY2tlciBpcyBub3QgZm9jdXNlZCBiZWNhdXNlIHdoaWxlIG5hdmlnYXRpbmcgdG8gYSBkaWZmZXJlbnQgZGVjYWRlLFxuICAgIC8vIHlvdSB3YW50IHRoZSBmb2N1cyB0byByZW1haW4gb24gdGhlIGRlY2FkZSBzd2l0Y2hlciBhcnJvd3MuXG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgWWVhclJhbmdlTW9kZWwgdG8gdGhlIGN1cnJlbnQgZGVjYWRlLlxuICAgKi9cbiAgY3VycmVudERlY2FkZSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMueWVhclJhbmdlTW9kZWwuaW5SYW5nZSh0aGlzLl9kYXRlTmF2aWdhdGlvblNlcnZpY2UudG9kYXkueWVhcikpIHtcbiAgICAgIHRoaXMueWVhclJhbmdlTW9kZWwgPSB0aGlzLnllYXJSYW5nZU1vZGVsLmN1cnJlbnREZWNhZGUoKTtcbiAgICB9XG4gICAgdGhpcy5fZGF0ZXBpY2tlckZvY3VzU2VydmljZS5mb2N1c0NlbGwodGhpcy5fZWxSZWYpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIFllYXJSYW5nZU1vZGVsIHRvIHRoZSBuZXh0IGRlY2FkZS5cbiAgICovXG4gIG5leHREZWNhZGUoKTogdm9pZCB7XG4gICAgdGhpcy55ZWFyUmFuZ2VNb2RlbCA9IHRoaXMueWVhclJhbmdlTW9kZWwubmV4dERlY2FkZSgpO1xuICAgIC8vIFllYXIgaW4gdGhlIHllYXJwaWNrZXIgaXMgbm90IGZvY3VzZWQgYmVjYXVzZSB3aGlsZSBuYXZpZ2F0aW5nIHRvIGEgZGlmZmVyZW50IGRlY2FkZSxcbiAgICAvLyB5b3Ugd2FudCB0aGUgZm9jdXMgdG8gcmVtYWluIG9uIHRoZSBkZWNhZGUgc3dpdGNoZXIgYXJyb3dzLlxuICB9XG5cbiAgLyoqXG4gICAqIENvbXBhcmVzIHRoZSB5ZWFyIHBhc3NlZCB0byB0aGUgZm9jdXNlZCB5ZWFyIGFuZCByZXR1cm5zIHRoZSB0YWIgaW5kZXguXG4gICAqL1xuICBnZXRUYWJJbmRleCh5ZWFyOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGlmICghdGhpcy55ZWFyUmFuZ2VNb2RlbC5pblJhbmdlKHRoaXMuX2ZvY3VzZWRZZWFyKSkge1xuICAgICAgaWYgKHRoaXMueWVhclJhbmdlTW9kZWwuaW5SYW5nZSh0aGlzLmNhbGVuZGFyWWVhcikpIHtcbiAgICAgICAgdGhpcy5fZm9jdXNlZFllYXIgPSB0aGlzLmNhbGVuZGFyWWVhcjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2ZvY3VzZWRZZWFyID0gdGhpcy55ZWFyUmFuZ2VNb2RlbC5taWRkbGVZZWFyO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fZm9jdXNlZFllYXIgPT09IHllYXIgPyAwIDogLTE7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyB0aGUgS2V5Ym9hcmQgYXJyb3cgbmF2aWdhdGlvbiBmb3IgdGhlIHllYXJwaWNrZXIuXG4gICAqL1xuICBASG9zdExpc3RlbmVyKCdrZXlkb3duJywgWyckZXZlbnQnXSlcbiAgb25LZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgLy8gTk9URTogRGlkbid0IG1vdmUgdGhpcyB0byB0aGUgZGF0ZSBuYXZpZ2F0aW9uIHNlcnZpY2UgYmVjYXVzZVxuICAgIC8vIHRoZSBsb2dpYyBpcyBmYWlybHkgc2ltcGxlIGFuZCBpdCBkaWRuJ3QgbWFrZSBzZW5zZSBmb3IgbWVcbiAgICAvLyB0byBjcmVhdGUgZXh0cmEgb2JzZXJ2YWJsZXMganVzdCB0byBtb3ZlIHRoaXMgbG9naWMgdG8gdGhlIHNlcnZpY2UuXG4gICAgaWYgKGV2ZW50KSB7XG4gICAgICBjb25zdCBrZXlDb2RlOiBudW1iZXIgPSBldmVudC5rZXlDb2RlO1xuICAgICAgaWYgKGtleUNvZGUgPT09IFVQX0FSUk9XKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuaW5jcmVtZW50Rm9jdXNZZWFyQnkoLTEpO1xuICAgICAgfSBlbHNlIGlmIChrZXlDb2RlID09PSBET1dOX0FSUk9XKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuaW5jcmVtZW50Rm9jdXNZZWFyQnkoMSk7XG4gICAgICB9IGVsc2UgaWYgKGtleUNvZGUgPT09IFJJR0hUX0FSUk9XKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuaW5jcmVtZW50Rm9jdXNZZWFyQnkoNSk7XG4gICAgICB9IGVsc2UgaWYgKGtleUNvZGUgPT09IExFRlRfQVJST1cpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5pbmNyZW1lbnRGb2N1c1llYXJCeSgtNSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEZvY3VzZXMgb24gdGhlIGN1cnJlbnQgY2FsZW5kYXIgeWVhciB3aGVuIHRoZSBWaWV3IGlzIGluaXRpYWxpemVkLlxuICAgKi9cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuX2RhdGVwaWNrZXJGb2N1c1NlcnZpY2UuZm9jdXNDZWxsKHRoaXMuX2VsUmVmKTtcbiAgfVxufVxuIl19