/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { NO_OF_DAYS_IN_A_WEEK, NO_OF_ROWS_IN_CALENDAR_VIEW, TOTAL_DAYS_IN_DAYS_VIEW } from '../utils/constants';
import { getDay } from '../utils/date-utils';
import { DayViewModel } from './day-view.model';
import { DayModel } from './day.model';
var CalendarViewModel = /** @class */ (function () {
    function CalendarViewModel(calendar, selectedDay, focusableDay, today, firstDayOfWeek) {
        this.calendar = calendar;
        this.selectedDay = selectedDay;
        this.focusableDay = focusableDay;
        this.today = today;
        this.firstDayOfWeek = firstDayOfWeek;
        this.currMonthDayViews = [];
        this.initializeCalendarView();
    }
    Object.defineProperty(CalendarViewModel.prototype, "calendarView", {
        /**
         * DayViewModel matrix. Size 6x7
         */
        get: /**
         * DayViewModel matrix. Size 6x7
         * @return {?}
         */
        function () {
            return this._calendarView;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Generates a 6x7 matrix of DayViewModel based on the Calendar.
     * The 6x7 matrix is structured according to the first day of the week.
     * 6 rows to accommodate months which might have dates spanning over 6 weeks.
     * 7 columns because there are 7 days in a week :P :D
     */
    /**
     * Generates a 6x7 matrix of DayViewModel based on the Calendar.
     * The 6x7 matrix is structured according to the first day of the week.
     * 6 rows to accommodate months which might have dates spanning over 6 weeks.
     * 7 columns because there are 7 days in a week :P :D
     * @private
     * @return {?}
     */
    CalendarViewModel.prototype.initializeCalendarView = /**
     * Generates a 6x7 matrix of DayViewModel based on the Calendar.
     * The 6x7 matrix is structured according to the first day of the week.
     * 6 rows to accommodate months which might have dates spanning over 6 weeks.
     * 7 columns because there are 7 days in a week :P :D
     * @private
     * @return {?}
     */
    function () {
        // Generate prev and next month calendar models.
        /** @type {?} */
        var prevMonthCalendar = this.calendar.previousMonth();
        /** @type {?} */
        var nextMonthCalendar = this.calendar.nextMonth();
        // Get no of days from prev and next months.
        /** @type {?} */
        var daysFromPrevMonthInCalView = this.numDaysFromPrevMonthInCalView(this.calendar.year, this.calendar.month);
        /** @type {?} */
        var daysFromNextMonthInCalView = TOTAL_DAYS_IN_DAYS_VIEW - (this.calendar.days.length + daysFromPrevMonthInCalView);
        // Generate prev, curr and next day view models
        /** @type {?} */
        var prevMonthDayViews = [];
        /** @type {?} */
        var nextMonthDayViews = [];
        if (daysFromPrevMonthInCalView > 0) {
            prevMonthDayViews = this.generateDayViewModels(prevMonthCalendar.days.slice(-1 * daysFromPrevMonthInCalView), true, false);
        }
        this.currMonthDayViews = this.generateDayViewModels(this.calendar.days, false, true);
        if (daysFromNextMonthInCalView > 0) {
            nextMonthDayViews = this.generateDayViewModels(nextMonthCalendar.days.slice(0, daysFromNextMonthInCalView), true, false);
        }
        // Generate calendar view and initialize flags
        this._calendarView = this.generateCalendarView(prevMonthDayViews, this.currMonthDayViews, nextMonthDayViews);
        this.initializeSelectedDay();
        this.initializeFocusableDay();
    };
    /**
     * Generates a DayViewModel array based on the DayModel passed
     */
    /**
     * Generates a DayViewModel array based on the DayModel passed
     * @private
     * @param {?} days
     * @param {?} isDisabled
     * @param {?} isCurrentCalendar
     * @return {?}
     */
    CalendarViewModel.prototype.generateDayViewModels = /**
     * Generates a DayViewModel array based on the DayModel passed
     * @private
     * @param {?} days
     * @param {?} isDisabled
     * @param {?} isCurrentCalendar
     * @return {?}
     */
    function (days, isDisabled, isCurrentCalendar) {
        /** @type {?} */
        var dayViews = days.map((/**
         * @param {?} day
         * @return {?}
         */
        function (day) {
            return new DayViewModel(day, false, isDisabled, false, false);
        }));
        if (isCurrentCalendar && this.calendar.isDayInCalendar(this.today)) {
            dayViews[this.today.date - 1].isTodaysDate = true;
        }
        return dayViews;
    };
    /**
     * Gets the first day of the current month to figure out how many dates of previous month
     * are needed to complete the Calendar View based on the first day of the week.
     * eg: Assuming locale en-US, the first day of the week is Sunday,
     * if first day of the current month lands on Wednesday, then
     * (this.getDay function would return 3 since
     * first day of the week is 0), we need the 3 days from the previous month.
     */
    /**
     * Gets the first day of the current month to figure out how many dates of previous month
     * are needed to complete the Calendar View based on the first day of the week.
     * eg: Assuming locale en-US, the first day of the week is Sunday,
     * if first day of the current month lands on Wednesday, then
     * (this.getDay function would return 3 since
     * first day of the week is 0), we need the 3 days from the previous month.
     * @private
     * @param {?} currentYear
     * @param {?} currentMonth
     * @return {?}
     */
    CalendarViewModel.prototype.numDaysFromPrevMonthInCalView = /**
     * Gets the first day of the current month to figure out how many dates of previous month
     * are needed to complete the Calendar View based on the first day of the week.
     * eg: Assuming locale en-US, the first day of the week is Sunday,
     * if first day of the current month lands on Wednesday, then
     * (this.getDay function would return 3 since
     * first day of the week is 0), we need the 3 days from the previous month.
     * @private
     * @param {?} currentYear
     * @param {?} currentMonth
     * @return {?}
     */
    function (currentYear, currentMonth) {
        /** @type {?} */
        var firstDayOfCurrMonth = getDay(currentYear, currentMonth, 1);
        if (firstDayOfCurrMonth >= this.firstDayOfWeek) {
            return firstDayOfCurrMonth - this.firstDayOfWeek;
        }
        else {
            return NO_OF_DAYS_IN_A_WEEK + firstDayOfCurrMonth - this.firstDayOfWeek;
        }
    };
    /**
     * Checks if the Day passed is in the CalendarView.
     */
    /**
     * Checks if the Day passed is in the CalendarView.
     * @private
     * @param {?} day
     * @return {?}
     */
    CalendarViewModel.prototype.isDayInCalendarView = /**
     * Checks if the Day passed is in the CalendarView.
     * @private
     * @param {?} day
     * @return {?}
     */
    function (day) {
        if (!this.calendar.isDayInCalendar(day)) {
            return false;
        }
        return true;
    };
    /**
     * Using the DayViewModels from the previous, current and next month, this function
     * generates the CalendarView.
     */
    /**
     * Using the DayViewModels from the previous, current and next month, this function
     * generates the CalendarView.
     * @private
     * @param {?} prev
     * @param {?} curr
     * @param {?} next
     * @return {?}
     */
    CalendarViewModel.prototype.generateCalendarView = /**
     * Using the DayViewModels from the previous, current and next month, this function
     * generates the CalendarView.
     * @private
     * @param {?} prev
     * @param {?} curr
     * @param {?} next
     * @return {?}
     */
    function (prev, curr, next) {
        /** @type {?} */
        var combinationArr = tslib_1.__spread(prev, curr, next);
        /** @type {?} */
        var calendarView = [];
        for (var i = 0; i < NO_OF_ROWS_IN_CALENDAR_VIEW; i++) {
            calendarView[i] = combinationArr.slice(i * NO_OF_DAYS_IN_A_WEEK, (i + 1) * NO_OF_DAYS_IN_A_WEEK);
        }
        return calendarView;
    };
    /**
     * Initialize the selected day if the day is in the calendar.
     */
    /**
     * Initialize the selected day if the day is in the calendar.
     * @private
     * @return {?}
     */
    CalendarViewModel.prototype.initializeSelectedDay = /**
     * Initialize the selected day if the day is in the calendar.
     * @private
     * @return {?}
     */
    function () {
        if (this.selectedDay && this.isDayInCalendarView(this.selectedDay)) {
            this.currMonthDayViews[this.selectedDay.date - 1].isSelected = true;
        }
    };
    /**
     * Initializes the focusable day if the day is in the calendar. If focusable day is not set, then
     * we check for the selected day. If selected day is not set then check if today is in the current
     * calendar. If not then just set the 15th of the current calendar month.
     */
    /**
     * Initializes the focusable day if the day is in the calendar. If focusable day is not set, then
     * we check for the selected day. If selected day is not set then check if today is in the current
     * calendar. If not then just set the 15th of the current calendar month.
     * @private
     * @return {?}
     */
    CalendarViewModel.prototype.initializeFocusableDay = /**
     * Initializes the focusable day if the day is in the calendar. If focusable day is not set, then
     * we check for the selected day. If selected day is not set then check if today is in the current
     * calendar. If not then just set the 15th of the current calendar month.
     * @private
     * @return {?}
     */
    function () {
        if (this.focusableDay && this.isDayInCalendarView(this.focusableDay)) {
            this.setFocusableFlag(this.focusableDay, true);
        }
        else if (this.selectedDay && this.isDayInCalendarView(this.selectedDay)) {
            this.setFocusableFlag(this.selectedDay, true);
            this.focusableDay = this.selectedDay.clone();
        }
        else if (this.isDayInCalendarView(this.today)) {
            this.setFocusableFlag(this.today, true);
            this.focusableDay = this.today.clone();
        }
        else {
            this.focusableDay = new DayModel(this.calendar.year, this.calendar.month, 15);
            this.setFocusableFlag(this.focusableDay, true);
        }
    };
    /**
     * @private
     * @param {?} day
     * @param {?} flag
     * @return {?}
     */
    CalendarViewModel.prototype.setFocusableFlag = /**
     * @private
     * @param {?} day
     * @param {?} flag
     * @return {?}
     */
    function (day, flag) {
        if (day) {
            this.currMonthDayViews[day.date - 1].isFocusable = flag;
        }
    };
    /**
     * Updates the focusable day in the calendar.
     */
    /**
     * Updates the focusable day in the calendar.
     * @param {?} day
     * @return {?}
     */
    CalendarViewModel.prototype.updateFocusableDay = /**
     * Updates the focusable day in the calendar.
     * @param {?} day
     * @return {?}
     */
    function (day) {
        this.setFocusableFlag(this.focusableDay, false);
        this.setFocusableFlag(day, true);
        this.focusableDay = day;
    };
    return CalendarViewModel;
}());
export { CalendarViewModel };
if (false) {
    /**
     * @type {?}
     * @private
     */
    CalendarViewModel.prototype.currMonthDayViews;
    /**
     * @type {?}
     * @private
     */
    CalendarViewModel.prototype._calendarView;
    /** @type {?} */
    CalendarViewModel.prototype.calendar;
    /**
     * @type {?}
     * @private
     */
    CalendarViewModel.prototype.selectedDay;
    /**
     * @type {?}
     * @private
     */
    CalendarViewModel.prototype.focusableDay;
    /**
     * @type {?}
     * @private
     */
    CalendarViewModel.prototype.today;
    /** @type {?} */
    CalendarViewModel.prototype.firstDayOfWeek;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItdmlldy5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImZvcm1zL2RhdGVwaWNrZXIvbW9kZWwvY2FsZW5kYXItdmlldy5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBTUEsT0FBTyxFQUFFLG9CQUFvQixFQUFFLDJCQUEyQixFQUFFLHVCQUF1QixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDaEgsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRzdDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRXZDO0lBQ0UsMkJBQ1MsUUFBdUIsRUFDdEIsV0FBcUIsRUFDckIsWUFBc0IsRUFDdEIsS0FBZSxFQUNoQixjQUFzQjtRQUp0QixhQUFRLEdBQVIsUUFBUSxDQUFlO1FBQ3RCLGdCQUFXLEdBQVgsV0FBVyxDQUFVO1FBQ3JCLGlCQUFZLEdBQVosWUFBWSxDQUFVO1FBQ3RCLFVBQUssR0FBTCxLQUFLLENBQVU7UUFDaEIsbUJBQWMsR0FBZCxjQUFjLENBQVE7UUFLdkIsc0JBQWlCLEdBQW1CLEVBQUUsQ0FBQztRQUg3QyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBU0Qsc0JBQUksMkNBQVk7UUFIaEI7O1dBRUc7Ozs7O1FBQ0g7WUFDRSxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDNUIsQ0FBQzs7O09BQUE7SUFFRDs7Ozs7T0FLRzs7Ozs7Ozs7O0lBQ0ssa0RBQXNCOzs7Ozs7OztJQUE5Qjs7O1lBRVEsaUJBQWlCLEdBQWtCLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFOztZQUNoRSxpQkFBaUIsR0FBa0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUU7OztZQUc1RCwwQkFBMEIsR0FBVyxJQUFJLENBQUMsNkJBQTZCLENBQzNFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUNsQixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FDcEI7O1lBQ0ssMEJBQTBCLEdBQzlCLHVCQUF1QixHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLDBCQUEwQixDQUFDOzs7WUFHaEYsaUJBQWlCLEdBQW1CLEVBQUU7O1lBQ3RDLGlCQUFpQixHQUFtQixFQUFFO1FBRTFDLElBQUksMEJBQTBCLEdBQUcsQ0FBQyxFQUFFO1lBQ2xDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FDNUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRywwQkFBMEIsQ0FBQyxFQUM3RCxJQUFJLEVBQ0osS0FBSyxDQUNOLENBQUM7U0FDSDtRQUVELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRXJGLElBQUksMEJBQTBCLEdBQUcsQ0FBQyxFQUFFO1lBQ2xDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FDNUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsMEJBQTBCLENBQUMsRUFDM0QsSUFBSSxFQUNKLEtBQUssQ0FDTixDQUFDO1NBQ0g7UUFFRCw4Q0FBOEM7UUFDOUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixFQUFFLGlCQUFpQixDQUFDLENBQUM7UUFDN0csSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUVEOztPQUVHOzs7Ozs7Ozs7SUFDSyxpREFBcUI7Ozs7Ozs7O0lBQTdCLFVBQThCLElBQWdCLEVBQUUsVUFBbUIsRUFBRSxpQkFBMEI7O1lBQ3ZGLFFBQVEsR0FBbUIsSUFBSSxDQUFDLEdBQUc7Ozs7UUFBQyxVQUFBLEdBQUc7WUFDM0MsT0FBTyxJQUFJLFlBQVksQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDaEUsQ0FBQyxFQUFDO1FBQ0YsSUFBSSxpQkFBaUIsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDbEUsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7U0FDbkQ7UUFDRCxPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDO0lBRUQ7Ozs7Ozs7T0FPRzs7Ozs7Ozs7Ozs7OztJQUNLLHlEQUE2Qjs7Ozs7Ozs7Ozs7O0lBQXJDLFVBQXNDLFdBQW1CLEVBQUUsWUFBb0I7O1lBQ3ZFLG1CQUFtQixHQUFXLE1BQU0sQ0FBQyxXQUFXLEVBQUUsWUFBWSxFQUFFLENBQUMsQ0FBQztRQUV4RSxJQUFJLG1CQUFtQixJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDOUMsT0FBTyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO1NBQ2xEO2FBQU07WUFDTCxPQUFPLG9CQUFvQixHQUFHLG1CQUFtQixHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7U0FDekU7SUFDSCxDQUFDO0lBRUQ7O09BRUc7Ozs7Ozs7SUFDSywrQ0FBbUI7Ozs7OztJQUEzQixVQUE0QixHQUFhO1FBQ3ZDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUN2QyxPQUFPLEtBQUssQ0FBQztTQUNkO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7Ozs7O0lBQ0ssZ0RBQW9COzs7Ozs7Ozs7SUFBNUIsVUFBNkIsSUFBb0IsRUFBRSxJQUFvQixFQUFFLElBQW9COztZQUNyRixjQUFjLG9CQUF1QixJQUFJLEVBQUssSUFBSSxFQUFLLElBQUksQ0FBQzs7WUFFNUQsWUFBWSxHQUFxQixFQUFFO1FBQ3pDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRywyQkFBMkIsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNwRCxZQUFZLENBQUMsQ0FBQyxDQUFDLEdBQUcsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsb0JBQW9CLENBQUMsQ0FBQztTQUNsRztRQUNELE9BQU8sWUFBWSxDQUFDO0lBQ3RCLENBQUM7SUFFRDs7T0FFRzs7Ozs7O0lBQ0ssaURBQXFCOzs7OztJQUE3QjtRQUNFLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQ2xFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1NBQ3JFO0lBQ0gsQ0FBQztJQUVEOzs7O09BSUc7Ozs7Ozs7O0lBQ0ssa0RBQXNCOzs7Ozs7O0lBQTlCO1FBQ0UsSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFDcEUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDaEQ7YUFBTSxJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUN6RSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUM5QyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDOUM7YUFBTSxJQUFJLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDL0MsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDeEMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ3hDO2FBQU07WUFDTCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzlFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ2hEO0lBQ0gsQ0FBQzs7Ozs7OztJQUVPLDRDQUFnQjs7Ozs7O0lBQXhCLFVBQXlCLEdBQWEsRUFBRSxJQUFhO1FBQ25ELElBQUksR0FBRyxFQUFFO1lBQ1AsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztTQUN6RDtJQUNILENBQUM7SUFFRDs7T0FFRzs7Ozs7O0lBQ0gsOENBQWtCOzs7OztJQUFsQixVQUFtQixHQUFhO1FBQzlCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7SUFDMUIsQ0FBQztJQUNILHdCQUFDO0FBQUQsQ0FBQyxBQXZLRCxJQXVLQzs7Ozs7OztJQTVKQyw4Q0FBK0M7Ozs7O0lBRS9DLDBDQUF3Qzs7SUFYdEMscUNBQThCOzs7OztJQUM5Qix3Q0FBNkI7Ozs7O0lBQzdCLHlDQUE4Qjs7Ozs7SUFDOUIsa0NBQXVCOztJQUN2QiwyQ0FBNkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IE5PX09GX0RBWVNfSU5fQV9XRUVLLCBOT19PRl9ST1dTX0lOX0NBTEVOREFSX1ZJRVcsIFRPVEFMX0RBWVNfSU5fREFZU19WSUVXIH0gZnJvbSAnLi4vdXRpbHMvY29uc3RhbnRzJztcbmltcG9ydCB7IGdldERheSB9IGZyb20gJy4uL3V0aWxzL2RhdGUtdXRpbHMnO1xuXG5pbXBvcnQgeyBDYWxlbmRhck1vZGVsIH0gZnJvbSAnLi9jYWxlbmRhci5tb2RlbCc7XG5pbXBvcnQgeyBEYXlWaWV3TW9kZWwgfSBmcm9tICcuL2RheS12aWV3Lm1vZGVsJztcbmltcG9ydCB7IERheU1vZGVsIH0gZnJvbSAnLi9kYXkubW9kZWwnO1xuXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJWaWV3TW9kZWwge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgY2FsZW5kYXI6IENhbGVuZGFyTW9kZWwsXG4gICAgcHJpdmF0ZSBzZWxlY3RlZERheTogRGF5TW9kZWwsXG4gICAgcHJpdmF0ZSBmb2N1c2FibGVEYXk6IERheU1vZGVsLFxuICAgIHByaXZhdGUgdG9kYXk6IERheU1vZGVsLFxuICAgIHB1YmxpYyBmaXJzdERheU9mV2VlazogbnVtYmVyXG4gICkge1xuICAgIHRoaXMuaW5pdGlhbGl6ZUNhbGVuZGFyVmlldygpO1xuICB9XG5cbiAgcHJpdmF0ZSBjdXJyTW9udGhEYXlWaWV3czogRGF5Vmlld01vZGVsW10gPSBbXTtcblxuICBwcml2YXRlIF9jYWxlbmRhclZpZXc6IERheVZpZXdNb2RlbFtdW107XG5cbiAgLyoqXG4gICAqIERheVZpZXdNb2RlbCBtYXRyaXguIFNpemUgNng3XG4gICAqL1xuICBnZXQgY2FsZW5kYXJWaWV3KCk6IERheVZpZXdNb2RlbFtdW10ge1xuICAgIHJldHVybiB0aGlzLl9jYWxlbmRhclZpZXc7XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGVzIGEgNng3IG1hdHJpeCBvZiBEYXlWaWV3TW9kZWwgYmFzZWQgb24gdGhlIENhbGVuZGFyLlxuICAgKiBUaGUgNng3IG1hdHJpeCBpcyBzdHJ1Y3R1cmVkIGFjY29yZGluZyB0byB0aGUgZmlyc3QgZGF5IG9mIHRoZSB3ZWVrLlxuICAgKiA2IHJvd3MgdG8gYWNjb21tb2RhdGUgbW9udGhzIHdoaWNoIG1pZ2h0IGhhdmUgZGF0ZXMgc3Bhbm5pbmcgb3ZlciA2IHdlZWtzLlxuICAgKiA3IGNvbHVtbnMgYmVjYXVzZSB0aGVyZSBhcmUgNyBkYXlzIGluIGEgd2VlayA6UCA6RFxuICAgKi9cbiAgcHJpdmF0ZSBpbml0aWFsaXplQ2FsZW5kYXJWaWV3KCk6IHZvaWQge1xuICAgIC8vIEdlbmVyYXRlIHByZXYgYW5kIG5leHQgbW9udGggY2FsZW5kYXIgbW9kZWxzLlxuICAgIGNvbnN0IHByZXZNb250aENhbGVuZGFyOiBDYWxlbmRhck1vZGVsID0gdGhpcy5jYWxlbmRhci5wcmV2aW91c01vbnRoKCk7XG4gICAgY29uc3QgbmV4dE1vbnRoQ2FsZW5kYXI6IENhbGVuZGFyTW9kZWwgPSB0aGlzLmNhbGVuZGFyLm5leHRNb250aCgpO1xuXG4gICAgLy8gR2V0IG5vIG9mIGRheXMgZnJvbSBwcmV2IGFuZCBuZXh0IG1vbnRocy5cbiAgICBjb25zdCBkYXlzRnJvbVByZXZNb250aEluQ2FsVmlldzogbnVtYmVyID0gdGhpcy5udW1EYXlzRnJvbVByZXZNb250aEluQ2FsVmlldyhcbiAgICAgIHRoaXMuY2FsZW5kYXIueWVhcixcbiAgICAgIHRoaXMuY2FsZW5kYXIubW9udGhcbiAgICApO1xuICAgIGNvbnN0IGRheXNGcm9tTmV4dE1vbnRoSW5DYWxWaWV3OiBudW1iZXIgPVxuICAgICAgVE9UQUxfREFZU19JTl9EQVlTX1ZJRVcgLSAodGhpcy5jYWxlbmRhci5kYXlzLmxlbmd0aCArIGRheXNGcm9tUHJldk1vbnRoSW5DYWxWaWV3KTtcblxuICAgIC8vIEdlbmVyYXRlIHByZXYsIGN1cnIgYW5kIG5leHQgZGF5IHZpZXcgbW9kZWxzXG4gICAgbGV0IHByZXZNb250aERheVZpZXdzOiBEYXlWaWV3TW9kZWxbXSA9IFtdO1xuICAgIGxldCBuZXh0TW9udGhEYXlWaWV3czogRGF5Vmlld01vZGVsW10gPSBbXTtcblxuICAgIGlmIChkYXlzRnJvbVByZXZNb250aEluQ2FsVmlldyA+IDApIHtcbiAgICAgIHByZXZNb250aERheVZpZXdzID0gdGhpcy5nZW5lcmF0ZURheVZpZXdNb2RlbHMoXG4gICAgICAgIHByZXZNb250aENhbGVuZGFyLmRheXMuc2xpY2UoLTEgKiBkYXlzRnJvbVByZXZNb250aEluQ2FsVmlldyksXG4gICAgICAgIHRydWUsXG4gICAgICAgIGZhbHNlXG4gICAgICApO1xuICAgIH1cblxuICAgIHRoaXMuY3Vyck1vbnRoRGF5Vmlld3MgPSB0aGlzLmdlbmVyYXRlRGF5Vmlld01vZGVscyh0aGlzLmNhbGVuZGFyLmRheXMsIGZhbHNlLCB0cnVlKTtcblxuICAgIGlmIChkYXlzRnJvbU5leHRNb250aEluQ2FsVmlldyA+IDApIHtcbiAgICAgIG5leHRNb250aERheVZpZXdzID0gdGhpcy5nZW5lcmF0ZURheVZpZXdNb2RlbHMoXG4gICAgICAgIG5leHRNb250aENhbGVuZGFyLmRheXMuc2xpY2UoMCwgZGF5c0Zyb21OZXh0TW9udGhJbkNhbFZpZXcpLFxuICAgICAgICB0cnVlLFxuICAgICAgICBmYWxzZVxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBHZW5lcmF0ZSBjYWxlbmRhciB2aWV3IGFuZCBpbml0aWFsaXplIGZsYWdzXG4gICAgdGhpcy5fY2FsZW5kYXJWaWV3ID0gdGhpcy5nZW5lcmF0ZUNhbGVuZGFyVmlldyhwcmV2TW9udGhEYXlWaWV3cywgdGhpcy5jdXJyTW9udGhEYXlWaWV3cywgbmV4dE1vbnRoRGF5Vmlld3MpO1xuICAgIHRoaXMuaW5pdGlhbGl6ZVNlbGVjdGVkRGF5KCk7XG4gICAgdGhpcy5pbml0aWFsaXplRm9jdXNhYmxlRGF5KCk7XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGVzIGEgRGF5Vmlld01vZGVsIGFycmF5IGJhc2VkIG9uIHRoZSBEYXlNb2RlbCBwYXNzZWRcbiAgICovXG4gIHByaXZhdGUgZ2VuZXJhdGVEYXlWaWV3TW9kZWxzKGRheXM6IERheU1vZGVsW10sIGlzRGlzYWJsZWQ6IGJvb2xlYW4sIGlzQ3VycmVudENhbGVuZGFyOiBib29sZWFuKTogRGF5Vmlld01vZGVsW10ge1xuICAgIGNvbnN0IGRheVZpZXdzOiBEYXlWaWV3TW9kZWxbXSA9IGRheXMubWFwKGRheSA9PiB7XG4gICAgICByZXR1cm4gbmV3IERheVZpZXdNb2RlbChkYXksIGZhbHNlLCBpc0Rpc2FibGVkLCBmYWxzZSwgZmFsc2UpO1xuICAgIH0pO1xuICAgIGlmIChpc0N1cnJlbnRDYWxlbmRhciAmJiB0aGlzLmNhbGVuZGFyLmlzRGF5SW5DYWxlbmRhcih0aGlzLnRvZGF5KSkge1xuICAgICAgZGF5Vmlld3NbdGhpcy50b2RheS5kYXRlIC0gMV0uaXNUb2RheXNEYXRlID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGRheVZpZXdzO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGZpcnN0IGRheSBvZiB0aGUgY3VycmVudCBtb250aCB0byBmaWd1cmUgb3V0IGhvdyBtYW55IGRhdGVzIG9mIHByZXZpb3VzIG1vbnRoXG4gICAqIGFyZSBuZWVkZWQgdG8gY29tcGxldGUgdGhlIENhbGVuZGFyIFZpZXcgYmFzZWQgb24gdGhlIGZpcnN0IGRheSBvZiB0aGUgd2Vlay5cbiAgICogZWc6IEFzc3VtaW5nIGxvY2FsZSBlbi1VUywgdGhlIGZpcnN0IGRheSBvZiB0aGUgd2VlayBpcyBTdW5kYXksXG4gICAqIGlmIGZpcnN0IGRheSBvZiB0aGUgY3VycmVudCBtb250aCBsYW5kcyBvbiBXZWRuZXNkYXksIHRoZW5cbiAgICogKHRoaXMuZ2V0RGF5IGZ1bmN0aW9uIHdvdWxkIHJldHVybiAzIHNpbmNlXG4gICAqIGZpcnN0IGRheSBvZiB0aGUgd2VlayBpcyAwKSwgd2UgbmVlZCB0aGUgMyBkYXlzIGZyb20gdGhlIHByZXZpb3VzIG1vbnRoLlxuICAgKi9cbiAgcHJpdmF0ZSBudW1EYXlzRnJvbVByZXZNb250aEluQ2FsVmlldyhjdXJyZW50WWVhcjogbnVtYmVyLCBjdXJyZW50TW9udGg6IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3QgZmlyc3REYXlPZkN1cnJNb250aDogbnVtYmVyID0gZ2V0RGF5KGN1cnJlbnRZZWFyLCBjdXJyZW50TW9udGgsIDEpO1xuXG4gICAgaWYgKGZpcnN0RGF5T2ZDdXJyTW9udGggPj0gdGhpcy5maXJzdERheU9mV2Vlaykge1xuICAgICAgcmV0dXJuIGZpcnN0RGF5T2ZDdXJyTW9udGggLSB0aGlzLmZpcnN0RGF5T2ZXZWVrO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gTk9fT0ZfREFZU19JTl9BX1dFRUsgKyBmaXJzdERheU9mQ3Vyck1vbnRoIC0gdGhpcy5maXJzdERheU9mV2VlaztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIHRoZSBEYXkgcGFzc2VkIGlzIGluIHRoZSBDYWxlbmRhclZpZXcuXG4gICAqL1xuICBwcml2YXRlIGlzRGF5SW5DYWxlbmRhclZpZXcoZGF5OiBEYXlNb2RlbCk6IGJvb2xlYW4ge1xuICAgIGlmICghdGhpcy5jYWxlbmRhci5pc0RheUluQ2FsZW5kYXIoZGF5KSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2luZyB0aGUgRGF5Vmlld01vZGVscyBmcm9tIHRoZSBwcmV2aW91cywgY3VycmVudCBhbmQgbmV4dCBtb250aCwgdGhpcyBmdW5jdGlvblxuICAgKiBnZW5lcmF0ZXMgdGhlIENhbGVuZGFyVmlldy5cbiAgICovXG4gIHByaXZhdGUgZ2VuZXJhdGVDYWxlbmRhclZpZXcocHJldjogRGF5Vmlld01vZGVsW10sIGN1cnI6IERheVZpZXdNb2RlbFtdLCBuZXh0OiBEYXlWaWV3TW9kZWxbXSk6IERheVZpZXdNb2RlbFtdW10ge1xuICAgIGNvbnN0IGNvbWJpbmF0aW9uQXJyOiBEYXlWaWV3TW9kZWxbXSA9IFsuLi5wcmV2LCAuLi5jdXJyLCAuLi5uZXh0XTtcblxuICAgIGNvbnN0IGNhbGVuZGFyVmlldzogRGF5Vmlld01vZGVsW11bXSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgTk9fT0ZfUk9XU19JTl9DQUxFTkRBUl9WSUVXOyBpKyspIHtcbiAgICAgIGNhbGVuZGFyVmlld1tpXSA9IGNvbWJpbmF0aW9uQXJyLnNsaWNlKGkgKiBOT19PRl9EQVlTX0lOX0FfV0VFSywgKGkgKyAxKSAqIE5PX09GX0RBWVNfSU5fQV9XRUVLKTtcbiAgICB9XG4gICAgcmV0dXJuIGNhbGVuZGFyVmlldztcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHRoZSBzZWxlY3RlZCBkYXkgaWYgdGhlIGRheSBpcyBpbiB0aGUgY2FsZW5kYXIuXG4gICAqL1xuICBwcml2YXRlIGluaXRpYWxpemVTZWxlY3RlZERheSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zZWxlY3RlZERheSAmJiB0aGlzLmlzRGF5SW5DYWxlbmRhclZpZXcodGhpcy5zZWxlY3RlZERheSkpIHtcbiAgICAgIHRoaXMuY3Vyck1vbnRoRGF5Vmlld3NbdGhpcy5zZWxlY3RlZERheS5kYXRlIC0gMV0uaXNTZWxlY3RlZCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSBmb2N1c2FibGUgZGF5IGlmIHRoZSBkYXkgaXMgaW4gdGhlIGNhbGVuZGFyLiBJZiBmb2N1c2FibGUgZGF5IGlzIG5vdCBzZXQsIHRoZW5cbiAgICogd2UgY2hlY2sgZm9yIHRoZSBzZWxlY3RlZCBkYXkuIElmIHNlbGVjdGVkIGRheSBpcyBub3Qgc2V0IHRoZW4gY2hlY2sgaWYgdG9kYXkgaXMgaW4gdGhlIGN1cnJlbnRcbiAgICogY2FsZW5kYXIuIElmIG5vdCB0aGVuIGp1c3Qgc2V0IHRoZSAxNXRoIG9mIHRoZSBjdXJyZW50IGNhbGVuZGFyIG1vbnRoLlxuICAgKi9cbiAgcHJpdmF0ZSBpbml0aWFsaXplRm9jdXNhYmxlRGF5KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmZvY3VzYWJsZURheSAmJiB0aGlzLmlzRGF5SW5DYWxlbmRhclZpZXcodGhpcy5mb2N1c2FibGVEYXkpKSB7XG4gICAgICB0aGlzLnNldEZvY3VzYWJsZUZsYWcodGhpcy5mb2N1c2FibGVEYXksIHRydWUpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5zZWxlY3RlZERheSAmJiB0aGlzLmlzRGF5SW5DYWxlbmRhclZpZXcodGhpcy5zZWxlY3RlZERheSkpIHtcbiAgICAgIHRoaXMuc2V0Rm9jdXNhYmxlRmxhZyh0aGlzLnNlbGVjdGVkRGF5LCB0cnVlKTtcbiAgICAgIHRoaXMuZm9jdXNhYmxlRGF5ID0gdGhpcy5zZWxlY3RlZERheS5jbG9uZSgpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5pc0RheUluQ2FsZW5kYXJWaWV3KHRoaXMudG9kYXkpKSB7XG4gICAgICB0aGlzLnNldEZvY3VzYWJsZUZsYWcodGhpcy50b2RheSwgdHJ1ZSk7XG4gICAgICB0aGlzLmZvY3VzYWJsZURheSA9IHRoaXMudG9kYXkuY2xvbmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5mb2N1c2FibGVEYXkgPSBuZXcgRGF5TW9kZWwodGhpcy5jYWxlbmRhci55ZWFyLCB0aGlzLmNhbGVuZGFyLm1vbnRoLCAxNSk7XG4gICAgICB0aGlzLnNldEZvY3VzYWJsZUZsYWcodGhpcy5mb2N1c2FibGVEYXksIHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0Rm9jdXNhYmxlRmxhZyhkYXk6IERheU1vZGVsLCBmbGFnOiBib29sZWFuKTogdm9pZCB7XG4gICAgaWYgKGRheSkge1xuICAgICAgdGhpcy5jdXJyTW9udGhEYXlWaWV3c1tkYXkuZGF0ZSAtIDFdLmlzRm9jdXNhYmxlID0gZmxhZztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgZm9jdXNhYmxlIGRheSBpbiB0aGUgY2FsZW5kYXIuXG4gICAqL1xuICB1cGRhdGVGb2N1c2FibGVEYXkoZGF5OiBEYXlNb2RlbCk6IHZvaWQge1xuICAgIHRoaXMuc2V0Rm9jdXNhYmxlRmxhZyh0aGlzLmZvY3VzYWJsZURheSwgZmFsc2UpO1xuICAgIHRoaXMuc2V0Rm9jdXNhYmxlRmxhZyhkYXksIHRydWUpO1xuICAgIHRoaXMuZm9jdXNhYmxlRGF5ID0gZGF5O1xuICB9XG59XG4iXX0=