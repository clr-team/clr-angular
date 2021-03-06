import { AfterViewInit, ElementRef } from '@angular/core';
import { DateNavigationService } from './providers/date-navigation.service';
import { DatepickerFocusService } from './providers/datepicker-focus.service';
import { LocaleHelperService } from './providers/locale-helper.service';
import { ViewManagerService } from './providers/view-manager.service';
export declare class ClrMonthpicker implements AfterViewInit {
    private _viewManagerService;
    private _localeHelperService;
    private _dateNavigationService;
    private _datepickerFocusService;
    private _elRef;
    constructor(_viewManagerService: ViewManagerService, _localeHelperService: LocaleHelperService, _dateNavigationService: DateNavigationService, _datepickerFocusService: DatepickerFocusService, _elRef: ElementRef);
    /**
     * Keeps track of the current focused month.
     */
    private _focusedMonthIndex;
    /**
     * Gets the months array which is used to rendered the monthpicker view.
     * Months are in the TranslationWidth.Wide format.
     */
    readonly monthNames: ReadonlyArray<string>;
    /**
     * Gets the month value of the Calendar.
     */
    readonly calendarMonthIndex: number;
    /**
     * Calls the DateNavigationService to update the month value of the calendar.
     * Also changes the view to the daypicker.
     */
    changeMonth(monthIndex: number): void;
    /**
     * Compares the month passed to the focused month and returns the tab index.
     */
    getTabIndex(monthIndex: number): number;
    /**
     * Handles the Keyboard arrow navigation for the monthpicker.
     */
    onKeyDown(event: KeyboardEvent): void;
    /**
     * Focuses on the current calendar month when the View is initialized.
     */
    ngAfterViewInit(): void;
}
