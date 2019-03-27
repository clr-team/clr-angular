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
var ClrYearpicker = /** @class */ (function () {
    function ClrYearpicker(_dateNavigationService, _viewManagerService, _datepickerFocusService, _elRef, commonStrings) {
        this._dateNavigationService = _dateNavigationService;
        this._viewManagerService = _viewManagerService;
        this._datepickerFocusService = _datepickerFocusService;
        this._elRef = _elRef;
        this.commonStrings = commonStrings;
        this.yearRangeModel = new YearRangeModel(this.calendarYear);
        this._focusedYear = this.calendarYear;
    }
    Object.defineProperty(ClrYearpicker.prototype, "calendarYear", {
        /**
         * Gets the year which the user is currently on.
         */
        get: /**
         * Gets the year which the user is currently on.
         * @return {?}
         */
        function () {
            return this._dateNavigationService.displayedCalendar.year;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Increments the focus year by the value passed. Updates the YearRangeModel if the
     * new value is not in the current decade.
     */
    /**
     * Increments the focus year by the value passed. Updates the YearRangeModel if the
     * new value is not in the current decade.
     * @private
     * @param {?} value
     * @return {?}
     */
    ClrYearpicker.prototype.incrementFocusYearBy = /**
     * Increments the focus year by the value passed. Updates the YearRangeModel if the
     * new value is not in the current decade.
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
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
    };
    /**
     * Calls the DateNavigationService to update the year value of the calendar.
     * Also changes the view to the daypicker.
     */
    /**
     * Calls the DateNavigationService to update the year value of the calendar.
     * Also changes the view to the daypicker.
     * @param {?} year
     * @return {?}
     */
    ClrYearpicker.prototype.changeYear = /**
     * Calls the DateNavigationService to update the year value of the calendar.
     * Also changes the view to the daypicker.
     * @param {?} year
     * @return {?}
     */
    function (year) {
        this._dateNavigationService.changeYear(year);
        this._viewManagerService.changeToDayView();
    };
    /**
     * Updates the YearRangeModel to the previous decade.
     */
    /**
     * Updates the YearRangeModel to the previous decade.
     * @return {?}
     */
    ClrYearpicker.prototype.previousDecade = /**
     * Updates the YearRangeModel to the previous decade.
     * @return {?}
     */
    function () {
        this.yearRangeModel = this.yearRangeModel.previousDecade();
        // Year in the yearpicker is not focused because while navigating to a different decade,
        // you want the focus to remain on the decade switcher arrows.
    };
    /**
     * Updates the YearRangeModel to the current decade.
     */
    /**
     * Updates the YearRangeModel to the current decade.
     * @return {?}
     */
    ClrYearpicker.prototype.currentDecade = /**
     * Updates the YearRangeModel to the current decade.
     * @return {?}
     */
    function () {
        if (!this.yearRangeModel.inRange(this._dateNavigationService.today.year)) {
            this.yearRangeModel = this.yearRangeModel.currentDecade();
        }
        this._datepickerFocusService.focusCell(this._elRef);
    };
    /**
     * Updates the YearRangeModel to the next decade.
     */
    /**
     * Updates the YearRangeModel to the next decade.
     * @return {?}
     */
    ClrYearpicker.prototype.nextDecade = /**
     * Updates the YearRangeModel to the next decade.
     * @return {?}
     */
    function () {
        this.yearRangeModel = this.yearRangeModel.nextDecade();
        // Year in the yearpicker is not focused because while navigating to a different decade,
        // you want the focus to remain on the decade switcher arrows.
    };
    /**
     * Compares the year passed to the focused year and returns the tab index.
     */
    /**
     * Compares the year passed to the focused year and returns the tab index.
     * @param {?} year
     * @return {?}
     */
    ClrYearpicker.prototype.getTabIndex = /**
     * Compares the year passed to the focused year and returns the tab index.
     * @param {?} year
     * @return {?}
     */
    function (year) {
        if (!this.yearRangeModel.inRange(this._focusedYear)) {
            if (this.yearRangeModel.inRange(this.calendarYear)) {
                this._focusedYear = this.calendarYear;
            }
            else {
                this._focusedYear = this.yearRangeModel.middleYear;
            }
        }
        return this._focusedYear === year ? 0 : -1;
    };
    /**
     * Handles the Keyboard arrow navigation for the yearpicker.
     */
    /**
     * Handles the Keyboard arrow navigation for the yearpicker.
     * @param {?} event
     * @return {?}
     */
    ClrYearpicker.prototype.onKeyDown = /**
     * Handles the Keyboard arrow navigation for the yearpicker.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // NOTE: Didn't move this to the date navigation service because
        // the logic is fairly simple and it didn't make sense for me
        // to create extra observables just to move this logic to the service.
        if (event) {
            /** @type {?} */
            var keyCode = event.keyCode;
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
    };
    /**
     * Focuses on the current calendar year when the View is initialized.
     */
    /**
     * Focuses on the current calendar year when the View is initialized.
     * @return {?}
     */
    ClrYearpicker.prototype.ngAfterViewInit = /**
     * Focuses on the current calendar year when the View is initialized.
     * @return {?}
     */
    function () {
        this._datepickerFocusService.focusCell(this._elRef);
    };
    ClrYearpicker.decorators = [
        { type: Component, args: [{
                    selector: 'clr-yearpicker',
                    template: "\n        <div class=\"year-switchers\">\n            <button class=\"calendar-btn switcher\" type=\"button\" (click)=\"previousDecade()\">\n                <clr-icon shape=\"angle\" dir=\"left\" [attr.title]=\"commonStrings.previous\"></clr-icon>\n            </button>\n            <button class=\"calendar-btn switcher\" type=\"button\" (click)=\"currentDecade()\">\n                <clr-icon shape=\"event\" [attr.title]=\"commonStrings.current\"></clr-icon>\n            </button>\n            <button class=\"calendar-btn switcher\" type=\"button\" (click)=\"nextDecade()\">\n                <clr-icon shape=\"angle\" dir=\"right\" [attr.title]=\"commonStrings.next\"></clr-icon>\n            </button>\n        </div>\n        <div class=\"years\">\n            <button\n                *ngFor=\"let year of yearRangeModel.yearRange\"\n                type=\"button\"\n                class=\"calendar-btn year\"\n                [attr.tabindex]=\"getTabIndex(year)\"\n                [class.is-selected]=\"year === calendarYear\"\n                (click)=\"changeYear(year)\">\n                {{year}}\n            </button>\n        </div>\n    ",
                    host: {
                        '[class.yearpicker]': 'true',
                    }
                }] }
    ];
    /** @nocollapse */
    ClrYearpicker.ctorParameters = function () { return [
        { type: DateNavigationService },
        { type: ViewManagerService },
        { type: DatepickerFocusService },
        { type: ElementRef },
        { type: ClrCommonStrings }
    ]; };
    ClrYearpicker.propDecorators = {
        onKeyDown: [{ type: HostListener, args: ['keydown', ['$event'],] }]
    };
    return ClrYearpicker;
}());
export { ClrYearpicker };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWVhcnBpY2tlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImZvcm1zL2RhdGVwaWNrZXIveWVhcnBpY2tlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFLQSxPQUFPLEVBQWlCLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRW5GLE9BQU8sRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUVoRyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDMUQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDNUUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDOUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDdEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFFN0U7SUErQkUsdUJBQ1Usc0JBQTZDLEVBQzdDLG1CQUF1QyxFQUN2Qyx1QkFBK0MsRUFDL0MsTUFBa0IsRUFDbkIsYUFBK0I7UUFKOUIsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUF1QjtRQUM3Qyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQW9CO1FBQ3ZDLDRCQUF1QixHQUF2Qix1QkFBdUIsQ0FBd0I7UUFDL0MsV0FBTSxHQUFOLE1BQU0sQ0FBWTtRQUNuQixrQkFBYSxHQUFiLGFBQWEsQ0FBa0I7UUFFdEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLGNBQWMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDNUQsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQ3hDLENBQUM7SUFlRCxzQkFBSSx1Q0FBWTtRQUhoQjs7V0FFRzs7Ozs7UUFDSDtZQUNFLE9BQU8s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c291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRE9XTl9BUlJPVywgTEVGVF9BUlJPVywgUklHSFRfQVJST1csIFVQX0FSUk9XIH0gZnJvbSAnLi4vLi4vdXRpbHMva2V5LWNvZGVzL2tleS1jb2Rlcyc7XG5cbmltcG9ydCB7IFllYXJSYW5nZU1vZGVsIH0gZnJvbSAnLi9tb2RlbC95ZWFyLXJhbmdlLm1vZGVsJztcbmltcG9ydCB7IERhdGVOYXZpZ2F0aW9uU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2RhdGUtbmF2aWdhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGVwaWNrZXJGb2N1c1NlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9kYXRlcGlja2VyLWZvY3VzLnNlcnZpY2UnO1xuaW1wb3J0IHsgVmlld01hbmFnZXJTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvdmlldy1tYW5hZ2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2xyQ29tbW9uU3RyaW5ncyB9IGZyb20gJy4uLy4uL3V0aWxzL2kxOG4vY29tbW9uLXN0cmluZ3MuaW50ZXJmYWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLXllYXJwaWNrZXInLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IGNsYXNzPVwieWVhci1zd2l0Y2hlcnNcIj5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJjYWxlbmRhci1idG4gc3dpdGNoZXJcIiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cInByZXZpb3VzRGVjYWRlKClcIj5cbiAgICAgICAgICAgICAgICA8Y2xyLWljb24gc2hhcGU9XCJhbmdsZVwiIGRpcj1cImxlZnRcIiBbYXR0ci50aXRsZV09XCJjb21tb25TdHJpbmdzLnByZXZpb3VzXCI+PC9jbHItaWNvbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImNhbGVuZGFyLWJ0biBzd2l0Y2hlclwiIHR5cGU9XCJidXR0b25cIiAoY2xpY2spPVwiY3VycmVudERlY2FkZSgpXCI+XG4gICAgICAgICAgICAgICAgPGNsci1pY29uIHNoYXBlPVwiZXZlbnRcIiBbYXR0ci50aXRsZV09XCJjb21tb25TdHJpbmdzLmN1cnJlbnRcIj48L2Nsci1pY29uPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiY2FsZW5kYXItYnRuIHN3aXRjaGVyXCIgdHlwZT1cImJ1dHRvblwiIChjbGljayk9XCJuZXh0RGVjYWRlKClcIj5cbiAgICAgICAgICAgICAgICA8Y2xyLWljb24gc2hhcGU9XCJhbmdsZVwiIGRpcj1cInJpZ2h0XCIgW2F0dHIudGl0bGVdPVwiY29tbW9uU3RyaW5ncy5uZXh0XCI+PC9jbHItaWNvbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInllYXJzXCI+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IHllYXIgb2YgeWVhclJhbmdlTW9kZWwueWVhclJhbmdlXCJcbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBjbGFzcz1cImNhbGVuZGFyLWJ0biB5ZWFyXCJcbiAgICAgICAgICAgICAgICBbYXR0ci50YWJpbmRleF09XCJnZXRUYWJJbmRleCh5ZWFyKVwiXG4gICAgICAgICAgICAgICAgW2NsYXNzLmlzLXNlbGVjdGVkXT1cInllYXIgPT09IGNhbGVuZGFyWWVhclwiXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cImNoYW5nZVllYXIoeWVhcilcIj5cbiAgICAgICAgICAgICAgICB7e3llYXJ9fVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLnllYXJwaWNrZXJdJzogJ3RydWUnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBDbHJZZWFycGlja2VyIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX2RhdGVOYXZpZ2F0aW9uU2VydmljZTogRGF0ZU5hdmlnYXRpb25TZXJ2aWNlLFxuICAgIHByaXZhdGUgX3ZpZXdNYW5hZ2VyU2VydmljZTogVmlld01hbmFnZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgX2RhdGVwaWNrZXJGb2N1c1NlcnZpY2U6IERhdGVwaWNrZXJGb2N1c1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBfZWxSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHVibGljIGNvbW1vblN0cmluZ3M6IENsckNvbW1vblN0cmluZ3NcbiAgKSB7XG4gICAgdGhpcy55ZWFyUmFuZ2VNb2RlbCA9IG5ldyBZZWFyUmFuZ2VNb2RlbCh0aGlzLmNhbGVuZGFyWWVhcik7XG4gICAgdGhpcy5fZm9jdXNlZFllYXIgPSB0aGlzLmNhbGVuZGFyWWVhcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBZZWFyUmFuZ2VNb2RlbCB3aGljaCBpcyB1c2VkIHRvIGJ1aWxkIHRoZSBZZWFyUGlja2VyIHZpZXcuXG4gICAqL1xuICB5ZWFyUmFuZ2VNb2RlbDogWWVhclJhbmdlTW9kZWw7XG5cbiAgLyoqXG4gICAqIEtlZXBzIHRyYWNrIG9mIHRoZSBjdXJyZW50IGZvY3VzZWQgeWVhci5cbiAgICovXG4gIHByaXZhdGUgX2ZvY3VzZWRZZWFyOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIHllYXIgd2hpY2ggdGhlIHVzZXIgaXMgY3VycmVudGx5IG9uLlxuICAgKi9cbiAgZ2V0IGNhbGVuZGFyWWVhcigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9kYXRlTmF2aWdhdGlvblNlcnZpY2UuZGlzcGxheWVkQ2FsZW5kYXIueWVhcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbmNyZW1lbnRzIHRoZSBmb2N1cyB5ZWFyIGJ5IHRoZSB2YWx1ZSBwYXNzZWQuIFVwZGF0ZXMgdGhlIFllYXJSYW5nZU1vZGVsIGlmIHRoZVxuICAgKiBuZXcgdmFsdWUgaXMgbm90IGluIHRoZSBjdXJyZW50IGRlY2FkZS5cbiAgICovXG4gIHByaXZhdGUgaW5jcmVtZW50Rm9jdXNZZWFyQnkodmFsdWU6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX2ZvY3VzZWRZZWFyID0gdGhpcy5fZm9jdXNlZFllYXIgKyB2YWx1ZTtcbiAgICBpZiAoIXRoaXMueWVhclJhbmdlTW9kZWwuaW5SYW5nZSh0aGlzLl9mb2N1c2VkWWVhcikpIHtcbiAgICAgIGlmICh2YWx1ZSA+IDApIHtcbiAgICAgICAgdGhpcy55ZWFyUmFuZ2VNb2RlbCA9IHRoaXMueWVhclJhbmdlTW9kZWwubmV4dERlY2FkZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy55ZWFyUmFuZ2VNb2RlbCA9IHRoaXMueWVhclJhbmdlTW9kZWwucHJldmlvdXNEZWNhZGUoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fZGF0ZXBpY2tlckZvY3VzU2VydmljZS5mb2N1c0NlbGwodGhpcy5fZWxSZWYpO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGxzIHRoZSBEYXRlTmF2aWdhdGlvblNlcnZpY2UgdG8gdXBkYXRlIHRoZSB5ZWFyIHZhbHVlIG9mIHRoZSBjYWxlbmRhci5cbiAgICogQWxzbyBjaGFuZ2VzIHRoZSB2aWV3IHRvIHRoZSBkYXlwaWNrZXIuXG4gICAqL1xuICBjaGFuZ2VZZWFyKHllYXI6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX2RhdGVOYXZpZ2F0aW9uU2VydmljZS5jaGFuZ2VZZWFyKHllYXIpO1xuICAgIHRoaXMuX3ZpZXdNYW5hZ2VyU2VydmljZS5jaGFuZ2VUb0RheVZpZXcoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSBZZWFyUmFuZ2VNb2RlbCB0byB0aGUgcHJldmlvdXMgZGVjYWRlLlxuICAgKi9cbiAgcHJldmlvdXNEZWNhZGUoKTogdm9pZCB7XG4gICAgdGhpcy55ZWFyUmFuZ2VNb2RlbCA9IHRoaXMueWVhclJhbmdlTW9kZWwucHJldmlvdXNEZWNhZGUoKTtcbiAgICAvLyBZZWFyIGluIHRoZSB5ZWFycGlja2VyIGlzIG5vdCBmb2N1c2VkIGJlY2F1c2Ugd2hpbGUgbmF2aWdhdGluZyB0byBhIGRpZmZlcmVudCBkZWNhZGUsXG4gICAgLy8geW91IHdhbnQgdGhlIGZvY3VzIHRvIHJlbWFpbiBvbiB0aGUgZGVjYWRlIHN3aXRjaGVyIGFycm93cy5cbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSBZZWFyUmFuZ2VNb2RlbCB0byB0aGUgY3VycmVudCBkZWNhZGUuXG4gICAqL1xuICBjdXJyZW50RGVjYWRlKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy55ZWFyUmFuZ2VNb2RlbC5pblJhbmdlKHRoaXMuX2RhdGVOYXZpZ2F0aW9uU2VydmljZS50b2RheS55ZWFyKSkge1xuICAgICAgdGhpcy55ZWFyUmFuZ2VNb2RlbCA9IHRoaXMueWVhclJhbmdlTW9kZWwuY3VycmVudERlY2FkZSgpO1xuICAgIH1cbiAgICB0aGlzLl9kYXRlcGlja2VyRm9jdXNTZXJ2aWNlLmZvY3VzQ2VsbCh0aGlzLl9lbFJlZik7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgWWVhclJhbmdlTW9kZWwgdG8gdGhlIG5leHQgZGVjYWRlLlxuICAgKi9cbiAgbmV4dERlY2FkZSgpOiB2b2lkIHtcbiAgICB0aGlzLnllYXJSYW5nZU1vZGVsID0gdGhpcy55ZWFyUmFuZ2VNb2RlbC5uZXh0RGVjYWRlKCk7XG4gICAgLy8gWWVhciBpbiB0aGUgeWVhcnBpY2tlciBpcyBub3QgZm9jdXNlZCBiZWNhdXNlIHdoaWxlIG5hdmlnYXRpbmcgdG8gYSBkaWZmZXJlbnQgZGVjYWRlLFxuICAgIC8vIHlvdSB3YW50IHRoZSBmb2N1cyB0byByZW1haW4gb24gdGhlIGRlY2FkZSBzd2l0Y2hlciBhcnJvd3MuXG4gIH1cblxuICAvKipcbiAgICogQ29tcGFyZXMgdGhlIHllYXIgcGFzc2VkIHRvIHRoZSBmb2N1c2VkIHllYXIgYW5kIHJldHVybnMgdGhlIHRhYiBpbmRleC5cbiAgICovXG4gIGdldFRhYkluZGV4KHllYXI6IG51bWJlcik6IG51bWJlciB7XG4gICAgaWYgKCF0aGlzLnllYXJSYW5nZU1vZGVsLmluUmFuZ2UodGhpcy5fZm9jdXNlZFllYXIpKSB7XG4gICAgICBpZiAodGhpcy55ZWFyUmFuZ2VNb2RlbC5pblJhbmdlKHRoaXMuY2FsZW5kYXJZZWFyKSkge1xuICAgICAgICB0aGlzLl9mb2N1c2VkWWVhciA9IHRoaXMuY2FsZW5kYXJZZWFyO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fZm9jdXNlZFllYXIgPSB0aGlzLnllYXJSYW5nZU1vZGVsLm1pZGRsZVllYXI7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9mb2N1c2VkWWVhciA9PT0geWVhciA/IDAgOiAtMTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIHRoZSBLZXlib2FyZCBhcnJvdyBuYXZpZ2F0aW9uIGZvciB0aGUgeWVhcnBpY2tlci5cbiAgICovXG4gIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24nLCBbJyRldmVudCddKVxuICBvbktleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAvLyBOT1RFOiBEaWRuJ3QgbW92ZSB0aGlzIHRvIHRoZSBkYXRlIG5hdmlnYXRpb24gc2VydmljZSBiZWNhdXNlXG4gICAgLy8gdGhlIGxvZ2ljIGlzIGZhaXJseSBzaW1wbGUgYW5kIGl0IGRpZG4ndCBtYWtlIHNlbnNlIGZvciBtZVxuICAgIC8vIHRvIGNyZWF0ZSBleHRyYSBvYnNlcnZhYmxlcyBqdXN0IHRvIG1vdmUgdGhpcyBsb2dpYyB0byB0aGUgc2VydmljZS5cbiAgICBpZiAoZXZlbnQpIHtcbiAgICAgIGNvbnN0IGtleUNvZGU6IG51bWJlciA9IGV2ZW50LmtleUNvZGU7XG4gICAgICBpZiAoa2V5Q29kZSA9PT0gVVBfQVJST1cpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5pbmNyZW1lbnRGb2N1c1llYXJCeSgtMSk7XG4gICAgICB9IGVsc2UgaWYgKGtleUNvZGUgPT09IERPV05fQVJST1cpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5pbmNyZW1lbnRGb2N1c1llYXJCeSgxKTtcbiAgICAgIH0gZWxzZSBpZiAoa2V5Q29kZSA9PT0gUklHSFRfQVJST1cpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5pbmNyZW1lbnRGb2N1c1llYXJCeSg1KTtcbiAgICAgIH0gZWxzZSBpZiAoa2V5Q29kZSA9PT0gTEVGVF9BUlJPVykge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLmluY3JlbWVudEZvY3VzWWVhckJ5KC01KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRm9jdXNlcyBvbiB0aGUgY3VycmVudCBjYWxlbmRhciB5ZWFyIHdoZW4gdGhlIFZpZXcgaXMgaW5pdGlhbGl6ZWQuXG4gICAqL1xuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5fZGF0ZXBpY2tlckZvY3VzU2VydmljZS5mb2N1c0NlbGwodGhpcy5fZWxSZWYpO1xuICB9XG59XG4iXX0=