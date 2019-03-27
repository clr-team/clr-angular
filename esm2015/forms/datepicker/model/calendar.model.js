/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { getNumberOfDaysInTheMonth } from '../utils/date-utils';
import { DayModel } from './day.model';
export class CalendarModel {
    /**
     * @param {?} year
     * @param {?} month
     */
    constructor(year, month) {
        this.year = year;
        this.month = month;
        this.initializeDaysInCalendar();
    }
    /**
     * Populates the days array with the DayModels in the current Calendar.
     * @private
     * @return {?}
     */
    initializeDaysInCalendar() {
        /** @type {?} */
        const noOfDaysInCalendar = getNumberOfDaysInTheMonth(this.year, this.month);
        this.days = Array(noOfDaysInCalendar)
            .fill(null)
            .map((/**
         * @param {?} date
         * @param {?} index
         * @return {?}
         */
        (date, index) => {
            return new DayModel(this.year, this.month, index + 1);
        }));
    }
    /**
     * Checks if the calendar passed is equal to the current calendar.
     * @param {?} calendar
     * @return {?}
     */
    isEqual(calendar) {
        if (calendar) {
            return this.year === calendar.year && this.month === calendar.month;
        }
        return false;
    }
    /**
     * Checks if a DayModel is in the Calendar
     * @param {?} day
     * @return {?}
     */
    isDayInCalendar(day) {
        if (day) {
            return this.year === day.year && this.month === day.month;
        }
        return false;
    }
    /**
     * Returns CalendarModel of the previous month.
     * @return {?}
     */
    previousMonth() {
        if (this.month === 0) {
            return new CalendarModel(this.year - 1, 11);
        }
        else {
            return new CalendarModel(this.year, this.month - 1);
        }
    }
    /**
     * Returns CalendarModel of the next month.
     * @return {?}
     */
    nextMonth() {
        if (this.month === 11) {
            return new CalendarModel(this.year + 1, 0);
        }
        else {
            return new CalendarModel(this.year, this.month + 1);
        }
    }
}
if (false) {
    /** @type {?} */
    CalendarModel.prototype.days;
    /** @type {?} */
    CalendarModel.prototype.year;
    /** @type {?} */
    CalendarModel.prototype.month;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIubW9kZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJmb3Jtcy9kYXRlcGlja2VyL21vZGVsL2NhbGVuZGFyLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQU1BLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRWhFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFdkMsTUFBTSxPQUFPLGFBQWE7Ozs7O0lBQ3hCLFlBQTRCLElBQVksRUFBa0IsS0FBYTtRQUEzQyxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQWtCLFVBQUssR0FBTCxLQUFLLENBQVE7UUFDckUsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7SUFDbEMsQ0FBQzs7Ozs7O0lBT08sd0JBQXdCOztjQUN4QixrQkFBa0IsR0FBVyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDbkYsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsa0JBQWtCLENBQUM7YUFDbEMsSUFBSSxDQUFDLElBQUksQ0FBQzthQUNWLEdBQUc7Ozs7O1FBQUMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDbkIsT0FBTyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3hELENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7Ozs7O0lBS0QsT0FBTyxDQUFDLFFBQXVCO1FBQzdCLElBQUksUUFBUSxFQUFFO1lBQ1osT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLFFBQVEsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxRQUFRLENBQUMsS0FBSyxDQUFDO1NBQ3JFO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDOzs7Ozs7SUFLRCxlQUFlLENBQUMsR0FBYTtRQUMzQixJQUFJLEdBQUcsRUFBRTtZQUNQLE9BQU8sSUFBSSxDQUFDLElBQUksS0FBSyxHQUFHLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssR0FBRyxDQUFDLEtBQUssQ0FBQztTQUMzRDtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQzs7Ozs7SUFLRCxhQUFhO1FBQ1gsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLENBQUMsRUFBRTtZQUNwQixPQUFPLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQzdDO2FBQU07WUFDTCxPQUFPLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztTQUNyRDtJQUNILENBQUM7Ozs7O0lBS0QsU0FBUztRQUNQLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxFQUFFLEVBQUU7WUFDckIsT0FBTyxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUM1QzthQUFNO1lBQ0wsT0FBTyxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDckQ7SUFDSCxDQUFDO0NBQ0Y7OztJQXZEQyw2QkFBaUI7O0lBSkwsNkJBQTRCOztJQUFFLDhCQUE2QiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgZ2V0TnVtYmVyT2ZEYXlzSW5UaGVNb250aCB9IGZyb20gJy4uL3V0aWxzL2RhdGUtdXRpbHMnO1xuXG5pbXBvcnQgeyBEYXlNb2RlbCB9IGZyb20gJy4vZGF5Lm1vZGVsJztcblxuZXhwb3J0IGNsYXNzIENhbGVuZGFyTW9kZWwge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgeWVhcjogbnVtYmVyLCBwdWJsaWMgcmVhZG9ubHkgbW9udGg6IG51bWJlcikge1xuICAgIHRoaXMuaW5pdGlhbGl6ZURheXNJbkNhbGVuZGFyKCk7XG4gIH1cblxuICBkYXlzOiBEYXlNb2RlbFtdO1xuXG4gIC8qKlxuICAgKiBQb3B1bGF0ZXMgdGhlIGRheXMgYXJyYXkgd2l0aCB0aGUgRGF5TW9kZWxzIGluIHRoZSBjdXJyZW50IENhbGVuZGFyLlxuICAgKi9cbiAgcHJpdmF0ZSBpbml0aWFsaXplRGF5c0luQ2FsZW5kYXIoKTogdm9pZCB7XG4gICAgY29uc3Qgbm9PZkRheXNJbkNhbGVuZGFyOiBudW1iZXIgPSBnZXROdW1iZXJPZkRheXNJblRoZU1vbnRoKHRoaXMueWVhciwgdGhpcy5tb250aCk7XG4gICAgdGhpcy5kYXlzID0gQXJyYXkobm9PZkRheXNJbkNhbGVuZGFyKVxuICAgICAgLmZpbGwobnVsbClcbiAgICAgIC5tYXAoKGRhdGUsIGluZGV4KSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgRGF5TW9kZWwodGhpcy55ZWFyLCB0aGlzLm1vbnRoLCBpbmRleCArIDEpO1xuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIHRoZSBjYWxlbmRhciBwYXNzZWQgaXMgZXF1YWwgdG8gdGhlIGN1cnJlbnQgY2FsZW5kYXIuXG4gICAqL1xuICBpc0VxdWFsKGNhbGVuZGFyOiBDYWxlbmRhck1vZGVsKSB7XG4gICAgaWYgKGNhbGVuZGFyKSB7XG4gICAgICByZXR1cm4gdGhpcy55ZWFyID09PSBjYWxlbmRhci55ZWFyICYmIHRoaXMubW9udGggPT09IGNhbGVuZGFyLm1vbnRoO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIGEgRGF5TW9kZWwgaXMgaW4gdGhlIENhbGVuZGFyXG4gICAqL1xuICBpc0RheUluQ2FsZW5kYXIoZGF5OiBEYXlNb2RlbCk6IGJvb2xlYW4ge1xuICAgIGlmIChkYXkpIHtcbiAgICAgIHJldHVybiB0aGlzLnllYXIgPT09IGRheS55ZWFyICYmIHRoaXMubW9udGggPT09IGRheS5tb250aDtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgQ2FsZW5kYXJNb2RlbCBvZiB0aGUgcHJldmlvdXMgbW9udGguXG4gICAqL1xuICBwcmV2aW91c01vbnRoKCk6IENhbGVuZGFyTW9kZWwge1xuICAgIGlmICh0aGlzLm1vbnRoID09PSAwKSB7XG4gICAgICByZXR1cm4gbmV3IENhbGVuZGFyTW9kZWwodGhpcy55ZWFyIC0gMSwgMTEpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbmV3IENhbGVuZGFyTW9kZWwodGhpcy55ZWFyLCB0aGlzLm1vbnRoIC0gMSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgQ2FsZW5kYXJNb2RlbCBvZiB0aGUgbmV4dCBtb250aC5cbiAgICovXG4gIG5leHRNb250aCgpOiBDYWxlbmRhck1vZGVsIHtcbiAgICBpZiAodGhpcy5tb250aCA9PT0gMTEpIHtcbiAgICAgIHJldHVybiBuZXcgQ2FsZW5kYXJNb2RlbCh0aGlzLnllYXIgKyAxLCAwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5ldyBDYWxlbmRhck1vZGVsKHRoaXMueWVhciwgdGhpcy5tb250aCArIDEpO1xuICAgIH1cbiAgfVxufVxuIl19