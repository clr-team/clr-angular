/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { NO_OF_DAYS_IN_A_WEEK, NO_OF_ROWS_IN_CALENDAR_VIEW, TOTAL_DAYS_IN_DAYS_VIEW } from '../utils/constants';
import { getDay } from '../utils/date-utils';
import { DayViewModel } from './day-view.model';
import { DayModel } from './day.model';
export class CalendarViewModel {
    /**
     * @param {?} calendar
     * @param {?} selectedDay
     * @param {?} focusableDay
     * @param {?} today
     * @param {?} firstDayOfWeek
     */
    constructor(calendar, selectedDay, focusableDay, today, firstDayOfWeek) {
        this.calendar = calendar;
        this.selectedDay = selectedDay;
        this.focusableDay = focusableDay;
        this.today = today;
        this.firstDayOfWeek = firstDayOfWeek;
        this.currMonthDayViews = [];
        this.initializeCalendarView();
    }
    /**
     * DayViewModel matrix. Size 6x7
     * @return {?}
     */
    get calendarView() {
        return this._calendarView;
    }
    /**
     * Generates a 6x7 matrix of DayViewModel based on the Calendar.
     * The 6x7 matrix is structured according to the first day of the week.
     * 6 rows to accommodate months which might have dates spanning over 6 weeks.
     * 7 columns because there are 7 days in a week :P :D
     * @private
     * @return {?}
     */
    initializeCalendarView() {
        // Generate prev and next month calendar models.
        /** @type {?} */
        const prevMonthCalendar = this.calendar.previousMonth();
        /** @type {?} */
        const nextMonthCalendar = this.calendar.nextMonth();
        // Get no of days from prev and next months.
        /** @type {?} */
        const daysFromPrevMonthInCalView = this.numDaysFromPrevMonthInCalView(this.calendar.year, this.calendar.month);
        /** @type {?} */
        const daysFromNextMonthInCalView = TOTAL_DAYS_IN_DAYS_VIEW - (this.calendar.days.length + daysFromPrevMonthInCalView);
        // Generate prev, curr and next day view models
        /** @type {?} */
        let prevMonthDayViews = [];
        /** @type {?} */
        let nextMonthDayViews = [];
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
    }
    /**
     * Generates a DayViewModel array based on the DayModel passed
     * @private
     * @param {?} days
     * @param {?} isDisabled
     * @param {?} isCurrentCalendar
     * @return {?}
     */
    generateDayViewModels(days, isDisabled, isCurrentCalendar) {
        /** @type {?} */
        const dayViews = days.map((/**
         * @param {?} day
         * @return {?}
         */
        day => {
            return new DayViewModel(day, false, isDisabled, false, false);
        }));
        if (isCurrentCalendar && this.calendar.isDayInCalendar(this.today)) {
            dayViews[this.today.date - 1].isTodaysDate = true;
        }
        return dayViews;
    }
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
    numDaysFromPrevMonthInCalView(currentYear, currentMonth) {
        /** @type {?} */
        const firstDayOfCurrMonth = getDay(currentYear, currentMonth, 1);
        if (firstDayOfCurrMonth >= this.firstDayOfWeek) {
            return firstDayOfCurrMonth - this.firstDayOfWeek;
        }
        else {
            return NO_OF_DAYS_IN_A_WEEK + firstDayOfCurrMonth - this.firstDayOfWeek;
        }
    }
    /**
     * Checks if the Day passed is in the CalendarView.
     * @private
     * @param {?} day
     * @return {?}
     */
    isDayInCalendarView(day) {
        if (!this.calendar.isDayInCalendar(day)) {
            return false;
        }
        return true;
    }
    /**
     * Using the DayViewModels from the previous, current and next month, this function
     * generates the CalendarView.
     * @private
     * @param {?} prev
     * @param {?} curr
     * @param {?} next
     * @return {?}
     */
    generateCalendarView(prev, curr, next) {
        /** @type {?} */
        const combinationArr = [...prev, ...curr, ...next];
        /** @type {?} */
        const calendarView = [];
        for (let i = 0; i < NO_OF_ROWS_IN_CALENDAR_VIEW; i++) {
            calendarView[i] = combinationArr.slice(i * NO_OF_DAYS_IN_A_WEEK, (i + 1) * NO_OF_DAYS_IN_A_WEEK);
        }
        return calendarView;
    }
    /**
     * Initialize the selected day if the day is in the calendar.
     * @private
     * @return {?}
     */
    initializeSelectedDay() {
        if (this.selectedDay && this.isDayInCalendarView(this.selectedDay)) {
            this.currMonthDayViews[this.selectedDay.date - 1].isSelected = true;
        }
    }
    /**
     * Initializes the focusable day if the day is in the calendar. If focusable day is not set, then
     * we check for the selected day. If selected day is not set then check if today is in the current
     * calendar. If not then just set the 15th of the current calendar month.
     * @private
     * @return {?}
     */
    initializeFocusableDay() {
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
    }
    /**
     * @private
     * @param {?} day
     * @param {?} flag
     * @return {?}
     */
    setFocusableFlag(day, flag) {
        if (day) {
            this.currMonthDayViews[day.date - 1].isFocusable = flag;
        }
    }
    /**
     * Updates the focusable day in the calendar.
     * @param {?} day
     * @return {?}
     */
    updateFocusableDay(day) {
        this.setFocusableFlag(this.focusableDay, false);
        this.setFocusableFlag(day, true);
        this.focusableDay = day;
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItdmlldy5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImZvcm1zL2RhdGVwaWNrZXIvbW9kZWwvY2FsZW5kYXItdmlldy5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFNQSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsMkJBQTJCLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNoSCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFHN0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFdkMsTUFBTSxPQUFPLGlCQUFpQjs7Ozs7Ozs7SUFDNUIsWUFDUyxRQUF1QixFQUN0QixXQUFxQixFQUNyQixZQUFzQixFQUN0QixLQUFlLEVBQ2hCLGNBQXNCO1FBSnRCLGFBQVEsR0FBUixRQUFRLENBQWU7UUFDdEIsZ0JBQVcsR0FBWCxXQUFXLENBQVU7UUFDckIsaUJBQVksR0FBWixZQUFZLENBQVU7UUFDdEIsVUFBSyxHQUFMLEtBQUssQ0FBVTtRQUNoQixtQkFBYyxHQUFkLGNBQWMsQ0FBUTtRQUt2QixzQkFBaUIsR0FBbUIsRUFBRSxDQUFDO1FBSDdDLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO0lBQ2hDLENBQUM7Ozs7O0lBU0QsSUFBSSxZQUFZO1FBQ2QsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzVCLENBQUM7Ozs7Ozs7OztJQVFPLHNCQUFzQjs7O2NBRXRCLGlCQUFpQixHQUFrQixJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRTs7Y0FDaEUsaUJBQWlCLEdBQWtCLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFOzs7Y0FHNUQsMEJBQTBCLEdBQVcsSUFBSSxDQUFDLDZCQUE2QixDQUMzRSxJQUFJLENBQUMs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QyxDQUFDO1lBQ3hDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUN4QzthQUFNO1lBQ0wsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztZQUM5RSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztTQUNoRDtJQUNILENBQUM7Ozs7Ozs7SUFFTyxnQkFBZ0IsQ0FBQyxHQUFhLEVBQUUsSUFBYTtRQUNuRCxJQUFJLEdBQUcsRUFBRTtZQUNQLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7U0FDekQ7SUFDSCxDQUFDOzs7Ozs7SUFLRCxrQkFBa0IsQ0FBQyxHQUFhO1FBQzlCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7SUFDMUIsQ0FBQztDQUNGOzs7Ozs7SUE1SkMsOENBQStDOzs7OztJQUUvQywwQ0FBd0M7O0lBWHRDLHFDQUE4Qjs7Ozs7SUFDOUIsd0NBQTZCOzs7OztJQUM3Qix5Q0FBOEI7Ozs7O0lBQzlCLGtDQUF1Qjs7SUFDdkIsMkNBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBOT19PRl9EQVlTX0lOX0FfV0VFSywgTk9fT0ZfUk9XU19JTl9DQUxFTkRBUl9WSUVXLCBUT1RBTF9EQVlTX0lOX0RBWVNfVklFVyB9IGZyb20gJy4uL3V0aWxzL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBnZXREYXkgfSBmcm9tICcuLi91dGlscy9kYXRlLXV0aWxzJztcblxuaW1wb3J0IHsgQ2FsZW5kYXJNb2RlbCB9IGZyb20gJy4vY2FsZW5kYXIubW9kZWwnO1xuaW1wb3J0IHsgRGF5Vmlld01vZGVsIH0gZnJvbSAnLi9kYXktdmlldy5tb2RlbCc7XG5pbXBvcnQgeyBEYXlNb2RlbCB9IGZyb20gJy4vZGF5Lm1vZGVsJztcblxuZXhwb3J0IGNsYXNzIENhbGVuZGFyVmlld01vZGVsIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGNhbGVuZGFyOiBDYWxlbmRhck1vZGVsLFxuICAgIHByaXZhdGUgc2VsZWN0ZWREYXk6IERheU1vZGVsLFxuICAgIHByaXZhdGUgZm9jdXNhYmxlRGF5OiBEYXlNb2RlbCxcbiAgICBwcml2YXRlIHRvZGF5OiBEYXlNb2RlbCxcbiAgICBwdWJsaWMgZmlyc3REYXlPZldlZWs6IG51bWJlclxuICApIHtcbiAgICB0aGlzLmluaXRpYWxpemVDYWxlbmRhclZpZXcoKTtcbiAgfVxuXG4gIHByaXZhdGUgY3Vyck1vbnRoRGF5Vmlld3M6IERheVZpZXdNb2RlbFtdID0gW107XG5cbiAgcHJpdmF0ZSBfY2FsZW5kYXJWaWV3OiBEYXlWaWV3TW9kZWxbXVtdO1xuXG4gIC8qKlxuICAgKiBEYXlWaWV3TW9kZWwgbWF0cml4LiBTaXplIDZ4N1xuICAgKi9cbiAgZ2V0IGNhbGVuZGFyVmlldygpOiBEYXlWaWV3TW9kZWxbXVtdIHtcbiAgICByZXR1cm4gdGhpcy5fY2FsZW5kYXJWaWV3O1xuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlcyBhIDZ4NyBtYXRyaXggb2YgRGF5Vmlld01vZGVsIGJhc2VkIG9uIHRoZSBDYWxlbmRhci5cbiAgICogVGhlIDZ4NyBtYXRyaXggaXMgc3RydWN0dXJlZCBhY2NvcmRpbmcgdG8gdGhlIGZpcnN0IGRheSBvZiB0aGUgd2Vlay5cbiAgICogNiByb3dzIHRvIGFjY29tbW9kYXRlIG1vbnRocyB3aGljaCBtaWdodCBoYXZlIGRhdGVzIHNwYW5uaW5nIG92ZXIgNiB3ZWVrcy5cbiAgICogNyBjb2x1bW5zIGJlY2F1c2UgdGhlcmUgYXJlIDcgZGF5cyBpbiBhIHdlZWsgOlAgOkRcbiAgICovXG4gIHByaXZhdGUgaW5pdGlhbGl6ZUNhbGVuZGFyVmlldygpOiB2b2lkIHtcbiAgICAvLyBHZW5lcmF0ZSBwcmV2IGFuZCBuZXh0IG1vbnRoIGNhbGVuZGFyIG1vZGVscy5cbiAgICBjb25zdCBwcmV2TW9udGhDYWxlbmRhcjogQ2FsZW5kYXJNb2RlbCA9IHRoaXMuY2FsZW5kYXIucHJldmlvdXNNb250aCgpO1xuICAgIGNvbnN0IG5leHRNb250aENhbGVuZGFyOiBDYWxlbmRhck1vZGVsID0gdGhpcy5jYWxlbmRhci5uZXh0TW9udGgoKTtcblxuICAgIC8vIEdldCBubyBvZiBkYXlzIGZyb20gcHJldiBhbmQgbmV4dCBtb250aHMuXG4gICAgY29uc3QgZGF5c0Zyb21QcmV2TW9udGhJbkNhbFZpZXc6IG51bWJlciA9IHRoaXMubnVtRGF5c0Zyb21QcmV2TW9udGhJbkNhbFZpZXcoXG4gICAgICB0aGlzLmNhbGVuZGFyLnllYXIsXG4gICAgICB0aGlzLmNhbGVuZGFyLm1vbnRoXG4gICAgKTtcbiAgICBjb25zdCBkYXlzRnJvbU5leHRNb250aEluQ2FsVmlldzogbnVtYmVyID1cbiAgICAgIFRPVEFMX0RBWVNfSU5fREFZU19WSUVXIC0gKHRoaXMuY2FsZW5kYXIuZGF5cy5sZW5ndGggKyBkYXlzRnJvbVByZXZNb250aEluQ2FsVmlldyk7XG5cbiAgICAvLyBHZW5lcmF0ZSBwcmV2LCBjdXJyIGFuZCBuZXh0IGRheSB2aWV3IG1vZGVsc1xuICAgIGxldCBwcmV2TW9udGhEYXlWaWV3czogRGF5Vmlld01vZGVsW10gPSBbXTtcbiAgICBsZXQgbmV4dE1vbnRoRGF5Vmlld3M6IERheVZpZXdNb2RlbFtdID0gW107XG5cbiAgICBpZiAoZGF5c0Zyb21QcmV2TW9udGhJbkNhbFZpZXcgPiAwKSB7XG4gICAgICBwcmV2TW9udGhEYXlWaWV3cyA9IHRoaXMuZ2VuZXJhdGVEYXlWaWV3TW9kZWxzKFxuICAgICAgICBwcmV2TW9udGhDYWxlbmRhci5kYXlzLnNsaWNlKC0xICogZGF5c0Zyb21QcmV2TW9udGhJbkNhbFZpZXcpLFxuICAgICAgICB0cnVlLFxuICAgICAgICBmYWxzZVxuICAgICAgKTtcbiAgICB9XG5cbiAgICB0aGlzLmN1cnJNb250aERheVZpZXdzID0gdGhpcy5nZW5lcmF0ZURheVZpZXdNb2RlbHModGhpcy5jYWxlbmRhci5kYXlzLCBmYWxzZSwgdHJ1ZSk7XG5cbiAgICBpZiAoZGF5c0Zyb21OZXh0TW9udGhJbkNhbFZpZXcgPiAwKSB7XG4gICAgICBuZXh0TW9udGhEYXlWaWV3cyA9IHRoaXMuZ2VuZXJhdGVEYXlWaWV3TW9kZWxzKFxuICAgICAgICBuZXh0TW9udGhDYWxlbmRhci5kYXlzLnNsaWNlKDAsIGRheXNGcm9tTmV4dE1vbnRoSW5DYWxWaWV3KSxcbiAgICAgICAgdHJ1ZSxcbiAgICAgICAgZmFsc2VcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gR2VuZXJhdGUgY2FsZW5kYXIgdmlldyBhbmQgaW5pdGlhbGl6ZSBmbGFnc1xuICAgIHRoaXMuX2NhbGVuZGFyVmlldyA9IHRoaXMuZ2VuZXJhdGVDYWxlbmRhclZpZXcocHJldk1vbnRoRGF5Vmlld3MsIHRoaXMuY3Vyck1vbnRoRGF5Vmlld3MsIG5leHRNb250aERheVZpZXdzKTtcbiAgICB0aGlzLmluaXRpYWxpemVTZWxlY3RlZERheSgpO1xuICAgIHRoaXMuaW5pdGlhbGl6ZUZvY3VzYWJsZURheSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlcyBhIERheVZpZXdNb2RlbCBhcnJheSBiYXNlZCBvbiB0aGUgRGF5TW9kZWwgcGFzc2VkXG4gICAqL1xuICBwcml2YXRlIGdlbmVyYXRlRGF5Vmlld01vZGVscyhkYXlzOiBEYXlNb2RlbFtdLCBpc0Rpc2FibGVkOiBib29sZWFuLCBpc0N1cnJlbnRDYWxlbmRhcjogYm9vbGVhbik6IERheVZpZXdNb2RlbFtdIHtcbiAgICBjb25zdCBkYXlWaWV3czogRGF5Vmlld01vZGVsW10gPSBkYXlzLm1hcChkYXkgPT4ge1xuICAgICAgcmV0dXJuIG5ldyBEYXlWaWV3TW9kZWwoZGF5LCBmYWxzZSwgaXNEaXNhYmxlZCwgZmFsc2UsIGZhbHNlKTtcbiAgICB9KTtcbiAgICBpZiAoaXNDdXJyZW50Q2FsZW5kYXIgJiYgdGhpcy5jYWxlbmRhci5pc0RheUluQ2FsZW5kYXIodGhpcy50b2RheSkpIHtcbiAgICAgIGRheVZpZXdzW3RoaXMudG9kYXkuZGF0ZSAtIDFdLmlzVG9kYXlzRGF0ZSA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiBkYXlWaWV3cztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBmaXJzdCBkYXkgb2YgdGhlIGN1cnJlbnQgbW9udGggdG8gZmlndXJlIG91dCBob3cgbWFueSBkYXRlcyBvZiBwcmV2aW91cyBtb250aFxuICAgKiBhcmUgbmVlZGVkIHRvIGNvbXBsZXRlIHRoZSBDYWxlbmRhciBWaWV3IGJhc2VkIG9uIHRoZSBmaXJzdCBkYXkgb2YgdGhlIHdlZWsuXG4gICAqIGVnOiBBc3N1bWluZyBsb2NhbGUgZW4tVVMsIHRoZSBmaXJzdCBkYXkgb2YgdGhlIHdlZWsgaXMgU3VuZGF5LFxuICAgKiBpZiBmaXJzdCBkYXkgb2YgdGhlIGN1cnJlbnQgbW9udGggbGFuZHMgb24gV2VkbmVzZGF5LCB0aGVuXG4gICAqICh0aGlzLmdldERheSBmdW5jdGlvbiB3b3VsZCByZXR1cm4gMyBzaW5jZVxuICAgKiBmaXJzdCBkYXkgb2YgdGhlIHdlZWsgaXMgMCksIHdlIG5lZWQgdGhlIDMgZGF5cyBmcm9tIHRoZSBwcmV2aW91cyBtb250aC5cbiAgICovXG4gIHByaXZhdGUgbnVtRGF5c0Zyb21QcmV2TW9udGhJbkNhbFZpZXcoY3VycmVudFllYXI6IG51bWJlciwgY3VycmVudE1vbnRoOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGNvbnN0IGZpcnN0RGF5T2ZDdXJyTW9udGg6IG51bWJlciA9IGdldERheShjdXJyZW50WWVhciwgY3VycmVudE1vbnRoLCAxKTtcblxuICAgIGlmIChmaXJzdERheU9mQ3Vyck1vbnRoID49IHRoaXMuZmlyc3REYXlPZldlZWspIHtcbiAgICAgIHJldHVybiBmaXJzdERheU9mQ3Vyck1vbnRoIC0gdGhpcy5maXJzdERheU9mV2VlaztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIE5PX09GX0RBWVNfSU5fQV9XRUVLICsgZmlyc3REYXlPZkN1cnJNb250aCAtIHRoaXMuZmlyc3REYXlPZldlZWs7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiB0aGUgRGF5IHBhc3NlZCBpcyBpbiB0aGUgQ2FsZW5kYXJWaWV3LlxuICAgKi9cbiAgcHJpdmF0ZSBpc0RheUluQ2FsZW5kYXJWaWV3KGRheTogRGF5TW9kZWwpOiBib29sZWFuIHtcbiAgICBpZiAoIXRoaXMuY2FsZW5kYXIuaXNEYXlJbkNhbGVuZGFyKGRheSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKipcbiAgICogVXNpbmcgdGhlIERheVZpZXdNb2RlbHMgZnJvbSB0aGUgcHJldmlvdXMsIGN1cnJlbnQgYW5kIG5leHQgbW9udGgsIHRoaXMgZnVuY3Rpb25cbiAgICogZ2VuZXJhdGVzIHRoZSBDYWxlbmRhclZpZXcuXG4gICAqL1xuICBwcml2YXRlIGdlbmVyYXRlQ2FsZW5kYXJWaWV3KHByZXY6IERheVZpZXdNb2RlbFtdLCBjdXJyOiBEYXlWaWV3TW9kZWxbXSwgbmV4dDogRGF5Vmlld01vZGVsW10pOiBEYXlWaWV3TW9kZWxbXVtdIHtcbiAgICBjb25zdCBjb21iaW5hdGlvbkFycjogRGF5Vmlld01vZGVsW10gPSBbLi4ucHJldiwgLi4uY3VyciwgLi4ubmV4dF07XG5cbiAgICBjb25zdCBjYWxlbmRhclZpZXc6IERheVZpZXdNb2RlbFtdW10gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IE5PX09GX1JPV1NfSU5fQ0FMRU5EQVJfVklFVzsgaSsrKSB7XG4gICAgICBjYWxlbmRhclZpZXdbaV0gPSBjb21iaW5hdGlvbkFyci5zbGljZShpICogTk9fT0ZfREFZU19JTl9BX1dFRUssIChpICsgMSkgKiBOT19PRl9EQVlTX0lOX0FfV0VFSyk7XG4gICAgfVxuICAgIHJldHVybiBjYWxlbmRhclZpZXc7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSB0aGUgc2VsZWN0ZWQgZGF5IGlmIHRoZSBkYXkgaXMgaW4gdGhlIGNhbGVuZGFyLlxuICAgKi9cbiAgcHJpdmF0ZSBpbml0aWFsaXplU2VsZWN0ZWREYXkoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuc2VsZWN0ZWREYXkgJiYgdGhpcy5pc0RheUluQ2FsZW5kYXJWaWV3KHRoaXMuc2VsZWN0ZWREYXkpKSB7XG4gICAgICB0aGlzLmN1cnJNb250aERheVZpZXdzW3RoaXMuc2VsZWN0ZWREYXkuZGF0ZSAtIDFdLmlzU2VsZWN0ZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgZm9jdXNhYmxlIGRheSBpZiB0aGUgZGF5IGlzIGluIHRoZSBjYWxlbmRhci4gSWYgZm9jdXNhYmxlIGRheSBpcyBub3Qgc2V0LCB0aGVuXG4gICAqIHdlIGNoZWNrIGZvciB0aGUgc2VsZWN0ZWQgZGF5LiBJZiBzZWxlY3RlZCBkYXkgaXMgbm90IHNldCB0aGVuIGNoZWNrIGlmIHRvZGF5IGlzIGluIHRoZSBjdXJyZW50XG4gICAqIGNhbGVuZGFyLiBJZiBub3QgdGhlbiBqdXN0IHNldCB0aGUgMTV0aCBvZiB0aGUgY3VycmVudCBjYWxlbmRhciBtb250aC5cbiAgICovXG4gIHByaXZhdGUgaW5pdGlhbGl6ZUZvY3VzYWJsZURheSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5mb2N1c2FibGVEYXkgJiYgdGhpcy5pc0RheUluQ2FsZW5kYXJWaWV3KHRoaXMuZm9jdXNhYmxlRGF5KSkge1xuICAgICAgdGhpcy5zZXRGb2N1c2FibGVGbGFnKHRoaXMuZm9jdXNhYmxlRGF5LCB0cnVlKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc2VsZWN0ZWREYXkgJiYgdGhpcy5pc0RheUluQ2FsZW5kYXJWaWV3KHRoaXMuc2VsZWN0ZWREYXkpKSB7XG4gICAgICB0aGlzLnNldEZvY3VzYWJsZUZsYWcodGhpcy5zZWxlY3RlZERheSwgdHJ1ZSk7XG4gICAgICB0aGlzLmZvY3VzYWJsZURheSA9IHRoaXMuc2VsZWN0ZWREYXkuY2xvbmUoKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuaXNEYXlJbkNhbGVuZGFyVmlldyh0aGlzLnRvZGF5KSkge1xuICAgICAgdGhpcy5zZXRGb2N1c2FibGVGbGFnKHRoaXMudG9kYXksIHRydWUpO1xuICAgICAgdGhpcy5mb2N1c2FibGVEYXkgPSB0aGlzLnRvZGF5LmNsb25lKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZm9jdXNhYmxlRGF5ID0gbmV3IERheU1vZGVsKHRoaXMuY2FsZW5kYXIueWVhciwgdGhpcy5jYWxlbmRhci5tb250aCwgMTUpO1xuICAgICAgdGhpcy5zZXRGb2N1c2FibGVGbGFnKHRoaXMuZm9jdXNhYmxlRGF5LCB0cnVlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldEZvY3VzYWJsZUZsYWcoZGF5OiBEYXlNb2RlbCwgZmxhZzogYm9vbGVhbik6IHZvaWQge1xuICAgIGlmIChkYXkpIHtcbiAgICAgIHRoaXMuY3Vyck1vbnRoRGF5Vmlld3NbZGF5LmRhdGUgLSAxXS5pc0ZvY3VzYWJsZSA9IGZsYWc7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIGZvY3VzYWJsZSBkYXkgaW4gdGhlIGNhbGVuZGFyLlxuICAgKi9cbiAgdXBkYXRlRm9jdXNhYmxlRGF5KGRheTogRGF5TW9kZWwpOiB2b2lkIHtcbiAgICB0aGlzLnNldEZvY3VzYWJsZUZsYWcodGhpcy5mb2N1c2FibGVEYXksIGZhbHNlKTtcbiAgICB0aGlzLnNldEZvY3VzYWJsZUZsYWcoZGF5LCB0cnVlKTtcbiAgICB0aGlzLmZvY3VzYWJsZURheSA9IGRheTtcbiAgfVxufVxuIl19