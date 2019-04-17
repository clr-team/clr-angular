/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CalendarModel } from '../model/calendar.model';
import { DayModel } from '../model/day.model';
/**
 * This service is responsible for:
 * 1. Initializing the displayed calendar.
 * 2. Moving the calendar to the next, previous or current months
 * 3. Managing the focused and selected day models.
 */
var DateNavigationService = /** @class */ (function () {
    function DateNavigationService() {
        /**
         * Variable to store today's date.
         */
        this._todaysFullDate = new Date();
        this._selectedDayChange = new Subject();
        this._displayedCalendarChange = new Subject();
        this._focusOnCalendarChange = new Subject();
        this._focusedDayChange = new Subject();
    }
    Object.defineProperty(DateNavigationService.prototype, "displayedCalendar", {
        get: /**
         * @return {?}
         */
        function () {
            return this._displayedCalendar;
        },
        enumerable: true,
        configurable: true
    });
    // not a setter because i want this to remain private
    // not a setter because i want this to remain private
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    DateNavigationService.prototype.setDisplayedCalendar = 
    // not a setter because i want this to remain private
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (!this._displayedCalendar.isEqual(value)) {
            this._displayedCalendar = value;
            this._displayedCalendarChange.next();
        }
    };
    /**
     * @private
     * @return {?}
     */
    DateNavigationService.prototype.initializeTodaysDate = /**
     * @private
     * @return {?}
     */
    function () {
        this._todaysFullDate = new Date();
        this._today = new DayModel(this._todaysFullDate.getFullYear(), this._todaysFullDate.getMonth(), this._todaysFullDate.getDate());
    };
    Object.defineProperty(DateNavigationService.prototype, "today", {
        get: /**
         * @return {?}
         */
        function () {
            return this._today;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateNavigationService.prototype, "selectedDayChange", {
        get: /**
         * @return {?}
         */
        function () {
            return this._selectedDayChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Notifies that the selected day has changed so that the date can be emitted to the user.
     * Note: Only to be called from day.ts
     */
    /**
     * Notifies that the selected day has changed so that the date can be emitted to the user.
     * Note: Only to be called from day.ts
     * @param {?} dayModel
     * @return {?}
     */
    DateNavigationService.prototype.notifySelectedDayChanged = /**
     * Notifies that the selected day has changed so that the date can be emitted to the user.
     * Note: Only to be called from day.ts
     * @param {?} dayModel
     * @return {?}
     */
    function (dayModel) {
        this.selectedDay = dayModel;
        this._selectedDayChange.next(dayModel);
    };
    /**
     * Initializes the calendar based on the selected day.
     */
    /**
     * Initializes the calendar based on the selected day.
     * @return {?}
     */
    DateNavigationService.prototype.initializeCalendar = /**
     * Initializes the calendar based on the selected day.
     * @return {?}
     */
    function () {
        this.focusedDay = null; // Can be removed later on the store focus
        this.initializeTodaysDate();
        if (this.selectedDay) {
            this._displayedCalendar = new CalendarModel(this.selectedDay.year, this.selectedDay.month);
        }
        else {
            this._displayedCalendar = new CalendarModel(this.today.year, this.today.month);
        }
    };
    /**
     * @param {?} month
     * @return {?}
     */
    DateNavigationService.prototype.changeMonth = /**
     * @param {?} month
     * @return {?}
     */
    function (month) {
        this.setDisplayedCalendar(new CalendarModel(this._displayedCalendar.year, month));
    };
    /**
     * @param {?} year
     * @return {?}
     */
    DateNavigationService.prototype.changeYear = /**
     * @param {?} year
     * @return {?}
     */
    function (year) {
        this.setDisplayedCalendar(new CalendarModel(year, this._displayedCalendar.month));
    };
    /**
     * Moves the displayed calendar to the next month.
     */
    /**
     * Moves the displayed calendar to the next month.
     * @return {?}
     */
    DateNavigationService.prototype.moveToNextMonth = /**
     * Moves the displayed calendar to the next month.
     * @return {?}
     */
    function () {
        this.setDisplayedCalendar(this._displayedCalendar.nextMonth());
    };
    /**
     * Moves the displayed calendar to the previous month.
     */
    /**
     * Moves the displayed calendar to the previous month.
     * @return {?}
     */
    DateNavigationService.prototype.moveToPreviousMonth = /**
     * Moves the displayed calendar to the previous month.
     * @return {?}
     */
    function () {
        this.setDisplayedCalendar(this._displayedCalendar.previousMonth());
    };
    /**
     * Moves the displayed calendar to the current month and year.
     */
    /**
     * Moves the displayed calendar to the current month and year.
     * @return {?}
     */
    DateNavigationService.prototype.moveToCurrentMonth = /**
     * Moves the displayed calendar to the current month and year.
     * @return {?}
     */
    function () {
        if (!this.displayedCalendar.isDayInCalendar(this.today)) {
            this.setDisplayedCalendar(new CalendarModel(this.today.year, this.today.month));
        }
        this._focusOnCalendarChange.next();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    DateNavigationService.prototype.incrementFocusDay = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.focusedDay = this.focusedDay.incrementBy(value);
        if (this._displayedCalendar.isDayInCalendar(this.focusedDay)) {
            this._focusedDayChange.next(this.focusedDay);
        }
        else {
            this.setDisplayedCalendar(this.focusedDay.calendar);
        }
        this._focusOnCalendarChange.next();
    };
    Object.defineProperty(DateNavigationService.prototype, "displayedCalendarChange", {
        /**
         * This observable lets the subscriber know that the displayed calendar has changed.
         */
        get: /**
         * This observable lets the subscriber know that the displayed calendar has changed.
         * @return {?}
         */
        function () {
            return this._displayedCalendarChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateNavigationService.prototype, "focusOnCalendarChange", {
        /**
         * This observable lets the subscriber know that the focus should be applied on the calendar.
         */
        get: /**
         * This observable lets the subscriber know that the focus should be applied on the calendar.
         * @return {?}
         */
        function () {
            return this._focusOnCalendarChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateNavigationService.prototype, "focusedDayChange", {
        /**
         * This observable lets the subscriber know that the focused day in the displayed calendar has changed.
         */
        get: /**
         * This observable lets the subscriber know that the focused day in the displayed calendar has changed.
         * @return {?}
         */
        function () {
            return this._focusedDayChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    DateNavigationService.decorators = [
        { type: Injectable }
    ];
    return DateNavigationService;
}());
export { DateNavigationService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    DateNavigationService.prototype._displayedCalendar;
    /**
     * Variable to store today's date.
     * @type {?}
     * @private
     */
    DateNavigationService.prototype._todaysFullDate;
    /**
     * @type {?}
     * @private
     */
    DateNavigationService.prototype._today;
    /** @type {?} */
    DateNavigationService.prototype.selectedDay;
    /**
     * @type {?}
     * @private
     */
    DateNavigationService.prototype._selectedDayChange;
    /** @type {?} */
    DateNavigationService.prototype.focusedDay;
    /**
     * @type {?}
     * @private
     */
    DateNavigationService.prototype._displayedCalendarChange;
    /**
     * @type {?}
     * @private
     */
    DateNavigationService.prototype._focusOnCalendarChange;
    /**
     * @type {?}
     * @private
     */
    DateNavigationService.prototype._focusedDayChange;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1uYXZpZ2F0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJmb3Jtcy9kYXRlcGlja2VyL3Byb3ZpZGVycy9kYXRlLW5hdmlnYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFNQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3hELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7Ozs7OztBQVE5QztJQUFBOzs7O1FBbUJVLG9CQUFlLEdBQVMsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQWtCbkMsdUJBQWtCLEdBQXNCLElBQUksT0FBTyxFQUFZLENBQUM7UUF3RWhFLDZCQUF3QixHQUFrQixJQUFJLE9BQU8sRUFBUSxDQUFDO1FBUzlELDJCQUFzQixHQUFrQixJQUFJLE9BQU8sRUFBUSxDQUFDO1FBUzVELHNCQUFpQixHQUFzQixJQUFJLE9BQU8sRUFBWSxDQUFDO0lBUXpFLENBQUM7SUFuSUMsc0JBQUksb0RBQWlCOzs7O1FBQXJCO1lBQ0UsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUM7UUFDakMsQ0FBQzs7O09BQUE7SUFFRCxxREFBcUQ7Ozs7Ozs7SUFDN0Msb0RBQW9COzs7Ozs7O0lBQTVCLFVBQTZCLEtBQW9CO1FBQy9DLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzNDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7WUFDaEMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3RDO0lBQ0gsQ0FBQzs7Ozs7SUFRTyxvREFBb0I7Ozs7SUFBNUI7UUFDRSxJ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LENBQUM7UUFDckQsSUFBSSxJQUFJLENBQUMsa0JBQWtCLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUM1RCxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUM5QzthQUFNO1lBQ0wsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDckQ7UUFDRCxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDckMsQ0FBQztJQU9ELHNCQUFJLDBEQUF1QjtRQUgzQjs7V0FFRzs7Ozs7UUFDSDtZQUNFLE9BQU8sSUFBSSxDQUFDLHdCQUF3QixDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3RELENBQUM7OztPQUFBO0lBT0Qsc0JBQUksd0RBQXFCO1FBSHpCOztXQUVHOzs7OztRQUNIO1lBQ0UsT0FBTyxJQUFJLENBQUMsc0JBQXNCLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEQsQ0FBQzs7O09BQUE7SUFPRCxzQkFBSSxtREFBZ0I7UUFIcEI7O1dBRUc7Ozs7O1FBQ0g7WUFDRSxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUMvQyxDQUFDOzs7T0FBQTs7Z0JBdElGLFVBQVU7O0lBdUlYLDRCQUFDO0NBQUEsQUF2SUQsSUF1SUM7U0F0SVkscUJBQXFCOzs7Ozs7SUFDaEMsbURBQTBDOzs7Ozs7SUFpQjFDLGdEQUEyQzs7Ozs7SUFDM0MsdUNBQXlCOztJQWV6Qiw0Q0FBNkI7Ozs7O0lBRTdCLG1EQUF3RTs7SUFleEUsMkNBQTRCOzs7OztJQXlENUIseURBQXNFOzs7OztJQVN0RSx1REFBb0U7Ozs7O0lBU3BFLGtEQUF1RSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQ2FsZW5kYXJNb2RlbCB9IGZyb20gJy4uL21vZGVsL2NhbGVuZGFyLm1vZGVsJztcbmltcG9ydCB7IERheU1vZGVsIH0gZnJvbSAnLi4vbW9kZWwvZGF5Lm1vZGVsJztcblxuLyoqXG4gKiBUaGlzIHNlcnZpY2UgaXMgcmVzcG9uc2libGUgZm9yOlxuICogMS4gSW5pdGlhbGl6aW5nIHRoZSBkaXNwbGF5ZWQgY2FsZW5kYXIuXG4gKiAyLiBNb3ZpbmcgdGhlIGNhbGVuZGFyIHRvIHRoZSBuZXh0LCBwcmV2aW91cyBvciBjdXJyZW50IG1vbnRoc1xuICogMy4gTWFuYWdpbmcgdGhlIGZvY3VzZWQgYW5kIHNlbGVjdGVkIGRheSBtb2RlbHMuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEYXRlTmF2aWdhdGlvblNlcnZpY2Uge1xuICBwcml2YXRlIF9kaXNwbGF5ZWRDYWxlbmRhcjogQ2FsZW5kYXJNb2RlbDtcblxuICBnZXQgZGlzcGxheWVkQ2FsZW5kYXIoKTogQ2FsZW5kYXJNb2RlbCB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc3BsYXllZENhbGVuZGFyO1xuICB9XG5cbiAgLy8gbm90IGEgc2V0dGVyIGJlY2F1c2UgaSB3YW50IHRoaXMgdG8gcmVtYWluIHByaXZhdGVcbiAgcHJpdmF0ZSBzZXREaXNwbGF5ZWRDYWxlbmRhcih2YWx1ZTogQ2FsZW5kYXJNb2RlbCkge1xuICAgIGlmICghdGhpcy5fZGlzcGxheWVkQ2FsZW5kYXIuaXNFcXVhbCh2YWx1ZSkpIHtcbiAgICAgIHRoaXMuX2Rpc3BsYXllZENhbGVuZGFyID0gdmFsdWU7XG4gICAgICB0aGlzLl9kaXNwbGF5ZWRDYWxlbmRhckNoYW5nZS5uZXh0KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFZhcmlhYmxlIHRvIHN0b3JlIHRvZGF5J3MgZGF0ZS5cbiAgICovXG4gIHByaXZhdGUgX3RvZGF5c0Z1bGxEYXRlOiBEYXRlID0gbmV3IERhdGUoKTtcbiAgcHJpdmF0ZSBfdG9kYXk6IERheU1vZGVsO1xuXG4gIHByaXZhdGUgaW5pdGlhbGl6ZVRvZGF5c0RhdGUoKTogdm9pZCB7XG4gICAgdGhpcy5fdG9kYXlzRnVsbERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIHRoaXMuX3RvZGF5ID0gbmV3IERheU1vZGVsKFxuICAgICAgdGhpcy5fdG9kYXlzRnVsbERhdGUuZ2V0RnVsbFllYXIoKSxcbiAgICAgIHRoaXMuX3RvZGF5c0Z1bGxEYXRlLmdldE1vbnRoKCksXG4gICAgICB0aGlzLl90b2RheXNGdWxsRGF0ZS5nZXREYXRlKClcbiAgICApO1xuICB9XG5cbiAgZ2V0IHRvZGF5KCk6IERheU1vZGVsIHtcbiAgICByZXR1cm4gdGhpcy5fdG9kYXk7XG4gIH1cblxuICBwdWJsaWMgc2VsZWN0ZWREYXk6IERheU1vZGVsO1xuXG4gIHByaXZhdGUgX3NlbGVjdGVkRGF5Q2hhbmdlOiBTdWJqZWN0PERheU1vZGVsPiA9IG5ldyBTdWJqZWN0PERheU1vZGVsPigpO1xuXG4gIGdldCBzZWxlY3RlZERheUNoYW5nZSgpOiBPYnNlcnZhYmxlPERheU1vZGVsPiB7XG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkRGF5Q2hhbmdlLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIE5vdGlmaWVzIHRoYXQgdGhlIHNlbGVjdGVkIGRheSBoYXMgY2hhbmdlZCBzbyB0aGF0IHRoZSBkYXRlIGNhbiBiZSBlbWl0dGVkIHRvIHRoZSB1c2VyLlxuICAgKiBOb3RlOiBPbmx5IHRvIGJlIGNhbGxlZCBmcm9tIGRheS50c1xuICAgKi9cbiAgbm90aWZ5U2VsZWN0ZWREYXlDaGFuZ2VkKGRheU1vZGVsOiBEYXlNb2RlbCkge1xuICAgIHRoaXMuc2VsZWN0ZWREYXkgPSBkYXlNb2RlbDtcbiAgICB0aGlzLl9zZWxlY3RlZERheUNoYW5nZS5uZXh0KGRheU1vZGVsKTtcbiAgfVxuXG4gIHB1YmxpYyBmb2N1c2VkRGF5OiBEYXlNb2RlbDtcblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIGNhbGVuZGFyIGJhc2VkIG9uIHRoZSBzZWxlY3RlZCBkYXkuXG4gICAqL1xuICBpbml0aWFsaXplQ2FsZW5kYXIoKTogdm9pZCB7XG4gICAgdGhpcy5mb2N1c2VkRGF5ID0gbnVsbDsgLy8gQ2FuIGJlIHJlbW92ZWQgbGF0ZXIgb24gdGhlIHN0b3JlIGZvY3VzXG4gICAgdGhpcy5pbml0aWFsaXplVG9kYXlzRGF0ZSgpO1xuICAgIGlmICh0aGlzLnNlbGVjdGVkRGF5KSB7XG4gICAgICB0aGlzLl9kaXNwbGF5ZWRDYWxlbmRhciA9IG5ldyBDYWxlbmRhck1vZGVsKHRoaXMuc2VsZWN0ZWREYXkueWVhciwgdGhpcy5zZWxlY3RlZERheS5tb250aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2Rpc3BsYXllZENhbGVuZGFyID0gbmV3IENhbGVuZGFyTW9kZWwodGhpcy50b2RheS55ZWFyLCB0aGlzLnRvZGF5Lm1vbnRoKTtcbiAgICB9XG4gIH1cblxuICBjaGFuZ2VNb250aChtb250aDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5zZXREaXNwbGF5ZWRDYWxlbmRhcihuZXcgQ2FsZW5kYXJNb2RlbCh0aGlzLl9kaXNwbGF5ZWRDYWxlbmRhci55ZWFyLCBtb250aCkpO1xuICB9XG5cbiAgY2hhbmdlWWVhcih5ZWFyOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnNldERpc3BsYXllZENhbGVuZGFyKG5ldyBDYWxlbmRhck1vZGVsKHllYXIsIHRoaXMuX2Rpc3BsYXllZENhbGVuZGFyLm1vbnRoKSk7XG4gIH1cblxuICAvKipcbiAgICogTW92ZXMgdGhlIGRpc3BsYXllZCBjYWxlbmRhciB0byB0aGUgbmV4dCBtb250aC5cbiAgICovXG4gIG1vdmVUb05leHRNb250aCgpOiB2b2lkIHtcbiAgICB0aGlzLnNldERpc3BsYXllZENhbGVuZGFyKHRoaXMuX2Rpc3BsYXllZENhbGVuZGFyLm5leHRNb250aCgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNb3ZlcyB0aGUgZGlzcGxheWVkIGNhbGVuZGFyIHRvIHRoZSBwcmV2aW91cyBtb250aC5cbiAgICovXG4gIG1vdmVUb1ByZXZpb3VzTW9udGgoKTogdm9pZCB7XG4gICAgdGhpcy5zZXREaXNwbGF5ZWRDYWxlbmRhcih0aGlzLl9kaXNwbGF5ZWRDYWxlbmRhci5wcmV2aW91c01vbnRoKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1vdmVzIHRoZSBkaXNwbGF5ZWQgY2FsZW5kYXIgdG8gdGhlIGN1cnJlbnQgbW9udGggYW5kIHllYXIuXG4gICAqL1xuICBtb3ZlVG9DdXJyZW50TW9udGgoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmRpc3BsYXllZENhbGVuZGFyLmlzRGF5SW5DYWxlbmRhcih0aGlzLnRvZGF5KSkge1xuICAgICAgdGhpcy5zZXREaXNwbGF5ZWRDYWxlbmRhcihuZXcgQ2FsZW5kYXJNb2RlbCh0aGlzLnRvZGF5LnllYXIsIHRoaXMudG9kYXkubW9udGgpKTtcbiAgICB9XG4gICAgdGhpcy5fZm9jdXNPbkNhbGVuZGFyQ2hhbmdlLm5leHQoKTtcbiAgfVxuXG4gIGluY3JlbWVudEZvY3VzRGF5KHZhbHVlOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLmZvY3VzZWREYXkgPSB0aGlzLmZvY3VzZWREYXkuaW5jcmVtZW50QnkodmFsdWUpO1xuICAgIGlmICh0aGlzLl9kaXNwbGF5ZWRDYWxlbmRhci5pc0RheUluQ2FsZW5kYXIodGhpcy5mb2N1c2VkRGF5KSkge1xuICAgICAgdGhpcy5fZm9jdXNlZERheUNoYW5nZS5uZXh0KHRoaXMuZm9jdXNlZERheSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2V0RGlzcGxheWVkQ2FsZW5kYXIodGhpcy5mb2N1c2VkRGF5LmNhbGVuZGFyKTtcbiAgICB9XG4gICAgdGhpcy5fZm9jdXNPbkNhbGVuZGFyQ2hhbmdlLm5leHQoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2Rpc3BsYXllZENhbGVuZGFyQ2hhbmdlOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAvKipcbiAgICogVGhpcyBvYnNlcnZhYmxlIGxldHMgdGhlIHN1YnNjcmliZXIga25vdyB0aGF0IHRoZSBkaXNwbGF5ZWQgY2FsZW5kYXIgaGFzIGNoYW5nZWQuXG4gICAqL1xuICBnZXQgZGlzcGxheWVkQ2FsZW5kYXJDaGFuZ2UoKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc3BsYXllZENhbGVuZGFyQ2hhbmdlLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZm9jdXNPbkNhbGVuZGFyQ2hhbmdlOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAvKipcbiAgICogVGhpcyBvYnNlcnZhYmxlIGxldHMgdGhlIHN1YnNjcmliZXIga25vdyB0aGF0IHRoZSBmb2N1cyBzaG91bGQgYmUgYXBwbGllZCBvbiB0aGUgY2FsZW5kYXIuXG4gICAqL1xuICBnZXQgZm9jdXNPbkNhbGVuZGFyQ2hhbmdlKCk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl9mb2N1c09uQ2FsZW5kYXJDaGFuZ2UuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBwcml2YXRlIF9mb2N1c2VkRGF5Q2hhbmdlOiBTdWJqZWN0PERheU1vZGVsPiA9IG5ldyBTdWJqZWN0PERheU1vZGVsPigpO1xuXG4gIC8qKlxuICAgKiBUaGlzIG9ic2VydmFibGUgbGV0cyB0aGUgc3Vic2NyaWJlciBrbm93IHRoYXQgdGhlIGZvY3VzZWQgZGF5IGluIHRoZSBkaXNwbGF5ZWQgY2FsZW5kYXIgaGFzIGNoYW5nZWQuXG4gICAqL1xuICBnZXQgZm9jdXNlZERheUNoYW5nZSgpOiBPYnNlcnZhYmxlPERheU1vZGVsPiB7XG4gICAgcmV0dXJuIHRoaXMuX2ZvY3VzZWREYXlDaGFuZ2UuYXNPYnNlcnZhYmxlKCk7XG4gIH1cbn1cbiJdfQ==