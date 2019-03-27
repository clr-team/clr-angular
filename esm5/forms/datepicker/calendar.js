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
import { CalendarViewModel } from './model/calendar-view.model';
import { DateNavigationService } from './providers/date-navigation.service';
import { DatepickerFocusService } from './providers/datepicker-focus.service';
import { LocaleHelperService } from './providers/locale-helper.service';
import { NO_OF_DAYS_IN_A_WEEK } from './utils/constants';
var ClrCalendar = /** @class */ (function () {
    function ClrCalendar(_localeHelperService, _dateNavigationService, _datepickerFocusService, _elRef) {
        this._localeHelperService = _localeHelperService;
        this._dateNavigationService = _dateNavigationService;
        this._datepickerFocusService = _datepickerFocusService;
        this._elRef = _elRef;
        this._subs = [];
        this.generateCalendarView();
        this.initializeSubscriptions();
    }
    Object.defineProperty(ClrCalendar.prototype, "localeDaysNarrow", {
        /**
         * Gets the locale days according to the TranslationWidth.Narrow format.
         */
        get: /**
         * Gets the locale days according to the TranslationWidth.Narrow format.
         * @return {?}
         */
        function () {
            return this._localeHelperService.localeDaysNarrow;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrCalendar.prototype, "calendar", {
        get: /**
         * @return {?}
         */
        function () {
            return this._dateNavigationService.displayedCalendar;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrCalendar.prototype, "selectedDay", {
        get: /**
         * @return {?}
         */
        function () {
            return this._dateNavigationService.selectedDay;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrCalendar.prototype, "focusedDay", {
        get: /**
         * @return {?}
         */
        function () {
            return this._dateNavigationService.focusedDay;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrCalendar.prototype, "today", {
        get: /**
         * @return {?}
         */
        function () {
            return this._dateNavigationService.today;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Initialize subscriptions to:
     * 1. update the calendar view model.
     * 2. update the focusable day in the calendar view model.
     * 3. focus on the focusable day in the calendar.
     */
    /**
     * Initialize subscriptions to:
     * 1. update the calendar view model.
     * 2. update the focusable day in the calendar view model.
     * 3. focus on the focusable day in the calendar.
     * @private
     * @return {?}
     */
    ClrCalendar.prototype.initializeSubscriptions = /**
     * Initialize subscriptions to:
     * 1. update the calendar view model.
     * 2. update the focusable day in the calendar view model.
     * 3. focus on the focusable day in the calendar.
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this._subs.push(this._dateNavigationService.displayedCalendarChange.subscribe((/**
         * @return {?}
         */
        function () {
            _this.generateCalendarView();
        })));
        this._subs.push(this._dateNavigationService.focusedDayChange.subscribe((/**
         * @param {?} focusedDay
         * @return {?}
         */
        function (focusedDay) {
            _this.calendarViewModel.updateFocusableDay(focusedDay);
        })));
        this._subs.push(this._dateNavigationService.focusOnCalendarChange.subscribe((/**
         * @return {?}
         */
        function () {
            _this._datepickerFocusService.focusCell(_this._elRef);
        })));
    };
    /**
     * Generates the Calendar View based on the calendar retrieved from the DateNavigationService.
     */
    /**
     * Generates the Calendar View based on the calendar retrieved from the DateNavigationService.
     * @private
     * @return {?}
     */
    ClrCalendar.prototype.generateCalendarView = /**
     * Generates the Calendar View based on the calendar retrieved from the DateNavigationService.
     * @private
     * @return {?}
     */
    function () {
        this.calendarViewModel = new CalendarViewModel(this.calendar, this.selectedDay, this.focusedDay, this.today, this._localeHelperService.firstDayOfWeek);
    };
    /**
     * Delegates Keyboard arrow navigation to the DateNavigationService.
     */
    /**
     * Delegates Keyboard arrow navigation to the DateNavigationService.
     * @param {?} event
     * @return {?}
     */
    ClrCalendar.prototype.onKeyDown = /**
     * Delegates Keyboard arrow navigation to the DateNavigationService.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event && this.focusedDay) {
            switch (event.keyCode) {
                case UP_ARROW:
                    event.preventDefault();
                    this._dateNavigationService.incrementFocusDay(-1 * NO_OF_DAYS_IN_A_WEEK);
                    break;
                case DOWN_ARROW:
                    event.preventDefault();
                    this._dateNavigationService.incrementFocusDay(NO_OF_DAYS_IN_A_WEEK);
                    break;
                case LEFT_ARROW:
                    event.preventDefault();
                    this._dateNavigationService.incrementFocusDay(-1);
                    break;
                case RIGHT_ARROW:
                    event.preventDefault();
                    this._dateNavigationService.incrementFocusDay(1);
                    break;
                default:
                    break; // No default case. TSLint x-(
            }
        }
    };
    /**
     * Focuses on the focusable day when the Calendar View is initialized.
     */
    /**
     * Focuses on the focusable day when the Calendar View is initialized.
     * @return {?}
     */
    ClrCalendar.prototype.ngAfterViewInit = /**
     * Focuses on the focusable day when the Calendar View is initialized.
     * @return {?}
     */
    function () {
        this._datepickerFocusService.focusCell(this._elRef);
    };
    /**
     * Unsubscribe from subscriptions.
     */
    /**
     * Unsubscribe from subscriptions.
     * @return {?}
     */
    ClrCalendar.prototype.ngOnDestroy = /**
     * Unsubscribe from subscriptions.
     * @return {?}
     */
    function () {
        this._subs.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        function (sub) { return sub.unsubscribe(); }));
    };
    ClrCalendar.decorators = [
        { type: Component, args: [{ selector: 'clr-calendar', template: "<table class=\"calendar-table weekdays\">\n    <tr class=\"calendar-row\">\n        <td *ngFor=\"let day of localeDaysNarrow\" class=\"calendar-cell weekday\">\n            {{day}}\n        </td>\n    </tr>\n</table>\n<table\n    class=\"calendar-table calendar-dates\">\n    <tr class=\"calendar-row\" *ngFor=\"let row of calendarViewModel.calendarView\">\n        <td *ngFor=\"let dayView of row\" class=\"calendar-cell\">\n            <clr-day [clrDayView]=\"dayView\"></clr-day>\n        </td>\n    </tr>\n</table>\n" }] }
    ];
    /** @nocollapse */
    ClrCalendar.ctorParameters = function () { return [
        { type: LocaleHelperService },
        { type: DateNavigationService },
        { type: DatepickerFocusService },
        { type: ElementRef }
    ]; };
    ClrCalendar.propDecorators = {
        onKeyDown: [{ type: HostListener, args: ['keydown', ['$event'],] }]
    };
    return ClrCalendar;
}());
export { ClrCalendar };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ClrCalendar.prototype._subs;
    /**
     * Calendar View Model to generate the Calendar.
     * @type {?}
     */
    ClrCalendar.prototype.calendarViewModel;
    /**
     * @type {?}
     * @private
     */
    ClrCalendar.prototype._localeHelperService;
    /**
     * @type {?}
     * @private
     */
    ClrCalendar.prototype._dateNavigationService;
    /**
     * @type {?}
     * @private
     */
    ClrCalendar.prototype._datepickerFocusService;
    /**
     * @type {?}
     * @private
     */
    ClrCalendar.prototype._elRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJmb3Jtcy9kYXRlcGlja2VyL2NhbGVuZGFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUcvRSxPQUFPLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFFaEcsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFHaEUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDNUUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDOUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDeEUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFekQ7SUFJRSxxQkFDVSxvQkFBeUMsRUFDekMsc0JBQTZDLEVBQzdDLHVCQUErQyxFQUMvQyxNQUFrQjtRQUhsQix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXFCO1FBQ3pDLDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBdUI7UUFDN0MsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUF3QjtRQUMvQyxXQUFNLEdBQU4sTUFBTSxDQUFZO1FBTnBCLFVBQUssR0FBbUIsRUFBRSxDQUFDO1FBUWpDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFVRCxzQkFBSSx5Q0FBZ0I7UUFIcEI7O1dBRUc7Ozs7O1FBQ0g7WUFDRSxPQUFPLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxnQkFBZ0IsQ0FBQztRQUNwRCxDQUFDOzs7T0FBQTtJQUVELHNCQUFJ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LHVCQUF1QixDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVEOztPQUVHOzs7OztJQUNILGlDQUFXOzs7O0lBQVg7UUFDRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU87Ozs7UUFBQyxVQUFDLEdBQWlCLElBQUssT0FBQSxHQUFHLENBQUMsV0FBVyxFQUFFLEVBQWpCLENBQWlCLEVBQUMsQ0FBQztJQUMvRCxDQUFDOztnQkExSEYsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBRSxvaEJBQThCLEVBQUU7Ozs7Z0JBSDlELG1CQUFtQjtnQkFGbkIscUJBQXFCO2dCQUNyQixzQkFBc0I7Z0JBVFgsVUFBVTs7OzRCQWlHM0IsWUFBWSxTQUFDLFNBQVMsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7SUF1Q3JDLGtCQUFDO0NBQUEsQUEzSEQsSUEySEM7U0ExSFksV0FBVzs7Ozs7O0lBQ3RCLDRCQUFtQzs7Ozs7SUFlbkMsd0NBQXFDOzs7OztJQVpuQywyQ0FBaUQ7Ozs7O0lBQ2pELDZDQUFxRDs7Ozs7SUFDckQsOENBQXVEOzs7OztJQUN2RCw2QkFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgRE9XTl9BUlJPVywgTEVGVF9BUlJPVywgUklHSFRfQVJST1csIFVQX0FSUk9XIH0gZnJvbSAnLi4vLi4vdXRpbHMva2V5LWNvZGVzL2tleS1jb2Rlcyc7XG5cbmltcG9ydCB7IENhbGVuZGFyVmlld01vZGVsIH0gZnJvbSAnLi9tb2RlbC9jYWxlbmRhci12aWV3Lm1vZGVsJztcbmltcG9ydCB7IENhbGVuZGFyTW9kZWwgfSBmcm9tICcuL21vZGVsL2NhbGVuZGFyLm1vZGVsJztcbmltcG9ydCB7IERheU1vZGVsIH0gZnJvbSAnLi9tb2RlbC9kYXkubW9kZWwnO1xuaW1wb3J0IHsgRGF0ZU5hdmlnYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvZGF0ZS1uYXZpZ2F0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0ZXBpY2tlckZvY3VzU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2RhdGVwaWNrZXItZm9jdXMuc2VydmljZSc7XG5pbXBvcnQgeyBMb2NhbGVIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvbG9jYWxlLWhlbHBlci5zZXJ2aWNlJztcbmltcG9ydCB7IE5PX09GX0RBWVNfSU5fQV9XRUVLIH0gZnJvbSAnLi91dGlscy9jb25zdGFudHMnO1xuXG5AQ29tcG9uZW50KHsgc2VsZWN0b3I6ICdjbHItY2FsZW5kYXInLCB0ZW1wbGF0ZVVybDogJy4vY2FsZW5kYXIuaHRtbCcgfSlcbmV4cG9ydCBjbGFzcyBDbHJDYWxlbmRhciBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgX3N1YnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfbG9jYWxlSGVscGVyU2VydmljZTogTG9jYWxlSGVscGVyU2VydmljZSxcbiAgICBwcml2YXRlIF9kYXRlTmF2aWdhdGlvblNlcnZpY2U6IERhdGVOYXZpZ2F0aW9uU2VydmljZSxcbiAgICBwcml2YXRlIF9kYXRlcGlja2VyRm9jdXNTZXJ2aWNlOiBEYXRlcGlja2VyRm9jdXNTZXJ2aWNlLFxuICAgIHByaXZhdGUgX2VsUmVmOiBFbGVtZW50UmVmXG4gICkge1xuICAgIHRoaXMuZ2VuZXJhdGVDYWxlbmRhclZpZXcoKTtcbiAgICB0aGlzLmluaXRpYWxpemVTdWJzY3JpcHRpb25zKCk7XG4gIH1cblxuICAvKipcbiAgICogQ2FsZW5kYXIgVmlldyBNb2RlbCB0byBnZW5lcmF0ZSB0aGUgQ2FsZW5kYXIuXG4gICAqL1xuICBjYWxlbmRhclZpZXdNb2RlbDogQ2FsZW5kYXJWaWV3TW9kZWw7XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGxvY2FsZSBkYXlzIGFjY29yZGluZyB0byB0aGUgVHJhbnNsYXRpb25XaWR0aC5OYXJyb3cgZm9ybWF0LlxuICAgKi9cbiAgZ2V0IGxvY2FsZURheXNOYXJyb3coKTogUmVhZG9ubHlBcnJheTxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5fbG9jYWxlSGVscGVyU2VydmljZS5sb2NhbGVEYXlzTmFycm93O1xuICB9XG5cbiAgZ2V0IGNhbGVuZGFyKCk6IENhbGVuZGFyTW9kZWwge1xuICAgIHJldHVybiB0aGlzLl9kYXRlTmF2aWdhdGlvblNlcnZpY2UuZGlzcGxheWVkQ2FsZW5kYXI7XG4gIH1cblxuICBnZXQgc2VsZWN0ZWREYXkoKTogRGF5TW9kZWwge1xuICAgIHJldHVybiB0aGlzLl9kYXRlTmF2aWdhdGlvblNlcnZpY2Uuc2VsZWN0ZWREYXk7XG4gIH1cblxuICBnZXQgZm9jdXNlZERheSgpOiBEYXlNb2RlbCB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGVOYXZpZ2F0aW9uU2VydmljZS5mb2N1c2VkRGF5O1xuICB9XG5cbiAgZ2V0IHRvZGF5KCk6IERheU1vZGVsIHtcbiAgICByZXR1cm4gdGhpcy5fZGF0ZU5hdmlnYXRpb25TZXJ2aWNlLnRvZGF5O1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgc3Vic2NyaXB0aW9ucyB0bzpcbiAgICogMS4gdXBkYXRlIHRoZSBjYWxlbmRhciB2aWV3IG1vZGVsLlxuICAgKiAyLiB1cGRhdGUgdGhlIGZvY3VzYWJsZSBkYXkgaW4gdGhlIGNhbGVuZGFyIHZpZXcgbW9kZWwuXG4gICAqIDMuIGZvY3VzIG9uIHRoZSBmb2N1c2FibGUgZGF5IGluIHRoZSBjYWxlbmRhci5cbiAgICovXG4gIHByaXZhdGUgaW5pdGlhbGl6ZVN1YnNjcmlwdGlvbnMoKTogdm9pZCB7XG4gICAgdGhpcy5fc3Vicy5wdXNoKFxuICAgICAgdGhpcy5fZGF0ZU5hdmlnYXRpb25TZXJ2aWNlLmRpc3BsYXllZENhbGVuZGFyQ2hhbmdlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuZ2VuZXJhdGVDYWxlbmRhclZpZXcoKTtcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIHRoaXMuX3N1YnMucHVzaChcbiAgICAgIHRoaXMuX2RhdGVOYXZpZ2F0aW9uU2VydmljZS5mb2N1c2VkRGF5Q2hhbmdlLnN1YnNjcmliZSgoZm9jdXNlZERheTogRGF5TW9kZWwpID0+IHtcbiAgICAgICAgdGhpcy5jYWxlbmRhclZpZXdNb2RlbC51cGRhdGVGb2N1c2FibGVEYXkoZm9jdXNlZERheSk7XG4gICAgICB9KVxuICAgICk7XG5cbiAgICB0aGlzLl9zdWJzLnB1c2goXG4gICAgICB0aGlzLl9kYXRlTmF2aWdhdGlvblNlcnZpY2UuZm9jdXNPbkNhbGVuZGFyQ2hhbmdlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuX2RhdGVwaWNrZXJGb2N1c1NlcnZpY2UuZm9jdXNDZWxsKHRoaXMuX2VsUmVmKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZXMgdGhlIENhbGVuZGFyIFZpZXcgYmFzZWQgb24gdGhlIGNhbGVuZGFyIHJldHJpZXZlZCBmcm9tIHRoZSBEYXRlTmF2aWdhdGlvblNlcnZpY2UuXG4gICAqL1xuICBwcml2YXRlIGdlbmVyYXRlQ2FsZW5kYXJWaWV3KCk6IHZvaWQge1xuICAgIHRoaXMuY2FsZW5kYXJWaWV3TW9kZWwgPSBuZXcgQ2FsZW5kYXJWaWV3TW9kZWwoXG4gICAgICB0aGlzLmNhbGVuZGFyLFxuICAgICAgdGhpcy5zZWxlY3RlZERheSxcbiAgICAgIHRoaXMuZm9jdXNlZERheSxcbiAgICAgIHRoaXMudG9kYXksXG4gICAgICB0aGlzLl9sb2NhbGVIZWxwZXJTZXJ2aWNlLmZpcnN0RGF5T2ZXZWVrXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxlZ2F0ZXMgS2V5Ym9hcmQgYXJyb3cgbmF2aWdhdGlvbiB0byB0aGUgRGF0ZU5hdmlnYXRpb25TZXJ2aWNlLlxuICAgKi9cbiAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bicsIFsnJGV2ZW50J10pXG4gIG9uS2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIGlmIChldmVudCAmJiB0aGlzLmZvY3VzZWREYXkpIHtcbiAgICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuICAgICAgICBjYXNlIFVQX0FSUk9XOlxuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgdGhpcy5fZGF0ZU5hdmlnYXRpb25TZXJ2aWNlLmluY3JlbWVudEZvY3VzRGF5KC0xICogTk9fT0ZfREFZU19JTl9BX1dFRUspO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIERPV05fQVJST1c6XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB0aGlzLl9kYXRlTmF2aWdhdGlvblNlcnZpY2UuaW5jcmVtZW50Rm9jdXNEYXkoTk9fT0ZfREFZU19JTl9BX1dFRUspO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIExFRlRfQVJST1c6XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB0aGlzLl9kYXRlTmF2aWdhdGlvblNlcnZpY2UuaW5jcmVtZW50Rm9jdXNEYXkoLTEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFJJR0hUX0FSUk9XOlxuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgdGhpcy5fZGF0ZU5hdmlnYXRpb25TZXJ2aWNlLmluY3JlbWVudEZvY3VzRGF5KDEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJyZWFrOyAvLyBObyBkZWZhdWx0IGNhc2UuIFRTTGludCB4LShcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRm9jdXNlcyBvbiB0aGUgZm9jdXNhYmxlIGRheSB3aGVuIHRoZSBDYWxlbmRhciBWaWV3IGlzIGluaXRpYWxpemVkLlxuICAgKi9cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuX2RhdGVwaWNrZXJGb2N1c1NlcnZpY2UuZm9jdXNDZWxsKHRoaXMuX2VsUmVmKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVbnN1YnNjcmliZSBmcm9tIHN1YnNjcmlwdGlvbnMuXG4gICAqL1xuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9zdWJzLmZvckVhY2goKHN1YjogU3Vic2NyaXB0aW9uKSA9PiBzdWIudW5zdWJzY3JpYmUoKSk7XG4gIH1cbn1cbiJdfQ==