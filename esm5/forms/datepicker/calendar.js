/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
     * @return {?}
     */
    ClrCalendar.prototype.initializeSubscriptions = /**
     * Initialize subscriptions to:
     * 1. update the calendar view model.
     * 2. update the focusable day in the calendar view model.
     * 3. focus on the focusable day in the calendar.
     * @return {?}
     */
    function () {
        var _this = this;
        this._subs.push(this._dateNavigationService.displayedCalendarChange.subscribe(function () {
            _this.generateCalendarView();
        }));
        this._subs.push(this._dateNavigationService.focusedDayChange.subscribe(function (focusedDay) {
            _this.calendarViewModel.updateFocusableDay(focusedDay);
        }));
        this._subs.push(this._dateNavigationService.focusOnCalendarChange.subscribe(function () {
            _this._datepickerFocusService.focusCell(_this._elRef);
        }));
    };
    /**
     * Generates the Calendar View based on the calendar retrieved from the DateNavigationService.
     */
    /**
     * Generates the Calendar View based on the calendar retrieved from the DateNavigationService.
     * @return {?}
     */
    ClrCalendar.prototype.generateCalendarView = /**
     * Generates the Calendar View based on the calendar retrieved from the DateNavigationService.
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
        this._subs.forEach(function (sub) { return sub.unsubscribe(); });
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
    /** @type {?} */
    ClrCalendar.prototype._subs;
    /**
     * Calendar View Model to generate the Calendar.
     * @type {?}
     */
    ClrCalendar.prototype.calendarViewModel;
    /** @type {?} */
    ClrCalendar.prototype._localeHelperService;
    /** @type {?} */
    ClrCalendar.prototype._dateNavigationService;
    /** @type {?} */
    ClrCalendar.prototype._datepickerFocusService;
    /** @type {?} */
    ClrCalendar.prototype._elRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJmb3Jtcy9kYXRlcGlja2VyL2NhbGVuZGFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUcvRSxPQUFPLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFFaEcsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFHaEUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDNUUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDOUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDeEUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFekQ7SUFJRSxxQkFDVSxvQkFBeUMsRUFDekMsc0JBQTZDLEVBQzdDLHVCQUErQyxFQUMvQyxNQUFrQjtRQUhsQix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXFCO1FBQ3pDLDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBdUI7UUFDN0MsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUF3QjtRQUMvQyxXQUFNLEdBQU4sTUFBTSxDQUFZO1FBTnBCLFVBQUssR0FBbUIsRUFBRSxDQUFDO1FBUWpDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFVRCxzQkFBSSx5Q0FBZ0I7UUFIcEI7O1dBRUc7Ozs7O1FBQ0g7WUFDRSxPQUFPLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxnQkFBZ0IsQ0FBQztRQUNwRCxDQUFDOzs7T0FBQTtJQUVELHNCQUFJ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QyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRDs7T0FFRzs7Ozs7SUFDSCxpQ0FBVzs7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQyxHQUFpQixJQUFLLE9BQUEsR0FBRyxDQUFDLFdBQVcsRUFBRSxFQUFqQixDQUFpQixDQUFDLENBQUM7SUFDL0QsQ0FBQzs7Z0JBMUhGLFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUUsb2hCQUE4QixFQUFFOzs7O2dCQUg5RCxtQkFBbUI7Z0JBRm5CLHFCQUFxQjtnQkFDckIsc0JBQXNCO2dCQVRYLFVBQVU7Ozs0QkFpRzNCLFlBQVksU0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUM7O0lBdUNyQyxrQkFBQztDQUFBLEFBM0hELElBMkhDO1NBMUhZLFdBQVc7OztJQUN0Qiw0QkFBbUM7Ozs7O0lBZW5DLHdDQUFxQzs7SUFabkMsMkNBQWlEOztJQUNqRCw2Q0FBcUQ7O0lBQ3JELDhDQUF1RDs7SUFDdkQsNkJBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IERPV05fQVJST1csIExFRlRfQVJST1csIFJJR0hUX0FSUk9XLCBVUF9BUlJPVyB9IGZyb20gJy4uLy4uL3V0aWxzL2tleS1jb2Rlcy9rZXktY29kZXMnO1xuXG5pbXBvcnQgeyBDYWxlbmRhclZpZXdNb2RlbCB9IGZyb20gJy4vbW9kZWwvY2FsZW5kYXItdmlldy5tb2RlbCc7XG5pbXBvcnQgeyBDYWxlbmRhck1vZGVsIH0gZnJvbSAnLi9tb2RlbC9jYWxlbmRhci5tb2RlbCc7XG5pbXBvcnQgeyBEYXlNb2RlbCB9IGZyb20gJy4vbW9kZWwvZGF5Lm1vZGVsJztcbmltcG9ydCB7IERhdGVOYXZpZ2F0aW9uU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2RhdGUtbmF2aWdhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGVwaWNrZXJGb2N1c1NlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9kYXRlcGlja2VyLWZvY3VzLnNlcnZpY2UnO1xuaW1wb3J0IHsgTG9jYWxlSGVscGVyU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2xvY2FsZS1oZWxwZXIuc2VydmljZSc7XG5pbXBvcnQgeyBOT19PRl9EQVlTX0lOX0FfV0VFSyB9IGZyb20gJy4vdXRpbHMvY29uc3RhbnRzJztcblxuQENvbXBvbmVudCh7IHNlbGVjdG9yOiAnY2xyLWNhbGVuZGFyJywgdGVtcGxhdGVVcmw6ICcuL2NhbGVuZGFyLmh0bWwnIH0pXG5leHBvcnQgY2xhc3MgQ2xyQ2FsZW5kYXIgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBwcml2YXRlIF9zdWJzOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX2xvY2FsZUhlbHBlclNlcnZpY2U6IExvY2FsZUhlbHBlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBfZGF0ZU5hdmlnYXRpb25TZXJ2aWNlOiBEYXRlTmF2aWdhdGlvblNlcnZpY2UsXG4gICAgcHJpdmF0ZSBfZGF0ZXBpY2tlckZvY3VzU2VydmljZTogRGF0ZXBpY2tlckZvY3VzU2VydmljZSxcbiAgICBwcml2YXRlIF9lbFJlZjogRWxlbWVudFJlZlxuICApIHtcbiAgICB0aGlzLmdlbmVyYXRlQ2FsZW5kYXJWaWV3KCk7XG4gICAgdGhpcy5pbml0aWFsaXplU3Vic2NyaXB0aW9ucygpO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGVuZGFyIFZpZXcgTW9kZWwgdG8gZ2VuZXJhdGUgdGhlIENhbGVuZGFyLlxuICAgKi9cbiAgY2FsZW5kYXJWaWV3TW9kZWw6IENhbGVuZGFyVmlld01vZGVsO1xuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBsb2NhbGUgZGF5cyBhY2NvcmRpbmcgdG8gdGhlIFRyYW5zbGF0aW9uV2lkdGguTmFycm93IGZvcm1hdC5cbiAgICovXG4gIGdldCBsb2NhbGVEYXlzTmFycm93KCk6IFJlYWRvbmx5QXJyYXk8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuX2xvY2FsZUhlbHBlclNlcnZpY2UubG9jYWxlRGF5c05hcnJvdztcbiAgfVxuXG4gIGdldCBjYWxlbmRhcigpOiBDYWxlbmRhck1vZGVsIHtcbiAgICByZXR1cm4gdGhpcy5fZGF0ZU5hdmlnYXRpb25TZXJ2aWNlLmRpc3BsYXllZENhbGVuZGFyO1xuICB9XG5cbiAgZ2V0IHNlbGVjdGVkRGF5KCk6IERheU1vZGVsIHtcbiAgICByZXR1cm4gdGhpcy5fZGF0ZU5hdmlnYXRpb25TZXJ2aWNlLnNlbGVjdGVkRGF5O1xuICB9XG5cbiAgZ2V0IGZvY3VzZWREYXkoKTogRGF5TW9kZWwge1xuICAgIHJldHVybiB0aGlzLl9kYXRlTmF2aWdhdGlvblNlcnZpY2UuZm9jdXNlZERheTtcbiAgfVxuXG4gIGdldCB0b2RheSgpOiBEYXlNb2RlbCB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGVOYXZpZ2F0aW9uU2VydmljZS50b2RheTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHN1YnNjcmlwdGlvbnMgdG86XG4gICAqIDEuIHVwZGF0ZSB0aGUgY2FsZW5kYXIgdmlldyBtb2RlbC5cbiAgICogMi4gdXBkYXRlIHRoZSBmb2N1c2FibGUgZGF5IGluIHRoZSBjYWxlbmRhciB2aWV3IG1vZGVsLlxuICAgKiAzLiBmb2N1cyBvbiB0aGUgZm9jdXNhYmxlIGRheSBpbiB0aGUgY2FsZW5kYXIuXG4gICAqL1xuICBwcml2YXRlIGluaXRpYWxpemVTdWJzY3JpcHRpb25zKCk6IHZvaWQge1xuICAgIHRoaXMuX3N1YnMucHVzaChcbiAgICAgIHRoaXMuX2RhdGVOYXZpZ2F0aW9uU2VydmljZS5kaXNwbGF5ZWRDYWxlbmRhckNoYW5nZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmdlbmVyYXRlQ2FsZW5kYXJWaWV3KCk7XG4gICAgICB9KVxuICAgICk7XG5cbiAgICB0aGlzLl9zdWJzLnB1c2goXG4gICAgICB0aGlzLl9kYXRlTmF2aWdhdGlvblNlcnZpY2UuZm9jdXNlZERheUNoYW5nZS5zdWJzY3JpYmUoKGZvY3VzZWREYXk6IERheU1vZGVsKSA9PiB7XG4gICAgICAgIHRoaXMuY2FsZW5kYXJWaWV3TW9kZWwudXBkYXRlRm9jdXNhYmxlRGF5KGZvY3VzZWREYXkpO1xuICAgICAgfSlcbiAgICApO1xuXG4gICAgdGhpcy5fc3Vicy5wdXNoKFxuICAgICAgdGhpcy5fZGF0ZU5hdmlnYXRpb25TZXJ2aWNlLmZvY3VzT25DYWxlbmRhckNoYW5nZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLl9kYXRlcGlja2VyRm9jdXNTZXJ2aWNlLmZvY3VzQ2VsbCh0aGlzLl9lbFJlZik7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGVzIHRoZSBDYWxlbmRhciBWaWV3IGJhc2VkIG9uIHRoZSBjYWxlbmRhciByZXRyaWV2ZWQgZnJvbSB0aGUgRGF0ZU5hdmlnYXRpb25TZXJ2aWNlLlxuICAgKi9cbiAgcHJpdmF0ZSBnZW5lcmF0ZUNhbGVuZGFyVmlldygpOiB2b2lkIHtcbiAgICB0aGlzLmNhbGVuZGFyVmlld01vZGVsID0gbmV3IENhbGVuZGFyVmlld01vZGVsKFxuICAgICAgdGhpcy5jYWxlbmRhcixcbiAgICAgIHRoaXMuc2VsZWN0ZWREYXksXG4gICAgICB0aGlzLmZvY3VzZWREYXksXG4gICAgICB0aGlzLnRvZGF5LFxuICAgICAgdGhpcy5fbG9jYWxlSGVscGVyU2VydmljZS5maXJzdERheU9mV2Vla1xuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogRGVsZWdhdGVzIEtleWJvYXJkIGFycm93IG5hdmlnYXRpb24gdG8gdGhlIERhdGVOYXZpZ2F0aW9uU2VydmljZS5cbiAgICovXG4gIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24nLCBbJyRldmVudCddKVxuICBvbktleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBpZiAoZXZlbnQgJiYgdGhpcy5mb2N1c2VkRGF5KSB7XG4gICAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcbiAgICAgICAgY2FzZSBVUF9BUlJPVzpcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIHRoaXMuX2RhdGVOYXZpZ2F0aW9uU2VydmljZS5pbmNyZW1lbnRGb2N1c0RheSgtMSAqIE5PX09GX0RBWVNfSU5fQV9XRUVLKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBET1dOX0FSUk9XOlxuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgdGhpcy5fZGF0ZU5hdmlnYXRpb25TZXJ2aWNlLmluY3JlbWVudEZvY3VzRGF5KE5PX09GX0RBWVNfSU5fQV9XRUVLKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBMRUZUX0FSUk9XOlxuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgdGhpcy5fZGF0ZU5hdmlnYXRpb25TZXJ2aWNlLmluY3JlbWVudEZvY3VzRGF5KC0xKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBSSUdIVF9BUlJPVzpcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIHRoaXMuX2RhdGVOYXZpZ2F0aW9uU2VydmljZS5pbmNyZW1lbnRGb2N1c0RheSgxKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBicmVhazsgLy8gTm8gZGVmYXVsdCBjYXNlLiBUU0xpbnQgeC0oXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEZvY3VzZXMgb24gdGhlIGZvY3VzYWJsZSBkYXkgd2hlbiB0aGUgQ2FsZW5kYXIgVmlldyBpcyBpbml0aWFsaXplZC5cbiAgICovXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLl9kYXRlcGlja2VyRm9jdXNTZXJ2aWNlLmZvY3VzQ2VsbCh0aGlzLl9lbFJlZik7XG4gIH1cblxuICAvKipcbiAgICogVW5zdWJzY3JpYmUgZnJvbSBzdWJzY3JpcHRpb25zLlxuICAgKi9cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fc3Vicy5mb3JFYWNoKChzdWI6IFN1YnNjcmlwdGlvbikgPT4gc3ViLnVuc3Vic2NyaWJlKCkpO1xuICB9XG59XG4iXX0=