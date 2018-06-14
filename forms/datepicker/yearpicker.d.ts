import { AfterViewInit, ElementRef } from '@angular/core';
import { YearRangeModel } from './model/year-range.model';
import { DateNavigationService } from './providers/date-navigation.service';
import { DatepickerFocusService } from './providers/datepicker-focus.service';
import { ViewManagerService } from './providers/view-manager.service';
export declare class ClrYearpicker implements AfterViewInit {
    private _dateNavigationService;
    private _viewManagerService;
    private _datepickerFocusService;
    private _elRef;
    constructor(_dateNavigationService: DateNavigationService, _viewManagerService: ViewManagerService, _datepickerFocusService: DatepickerFocusService, _elRef: ElementRef);
    /**
     * YearRangeModel which is used to build the YearPicker view.
     */
    yearRangeModel: YearRangeModel;
    /**
     * Keeps track of the current focused year.
     */
    private _focusedYear;
    /**
     * Gets the year which the user is currently on.
     */
    readonly calendarYear: number;
    /**
     * Increments the focus year by the value passed. Updates the YearRangeModel if the
     * new value is not in the current decade.
     */
    private incrementFocusYearBy(value);
    /**
     * Calls the DateNavigationService to update the year value of the calendar.
     * Also changes the view to the daypicker.
     */
    changeYear(year: number): void;
    /**
     * Updates the YearRangeModel to the previous decade.
     */
    previousDecade(): void;
    /**
     * Updates the YearRangeModel to the current decade.
     */
    currentDecade(): void;
    /**
     * Updates the YearRangeModel to the next decade.
     */
    nextDecade(): void;
    /**
     * Compares the year passed to the focused year and returns the tab index.
     */
    getTabIndex(year: number): number;
    /**
     * Handles the Keyboard arrow navigation for the yearpicker.
     */
    onKeyDown(event: KeyboardEvent): void;
    /**
     * Focuses on the current calendar year when the View is initialized.
     */
    ngAfterViewInit(): void;
}
