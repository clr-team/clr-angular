import { OnDestroy } from '@angular/core';
import { IfOpenService } from '../../utils/conditional/if-open.service';
import { DynamicWrapper } from '../../utils/host-wrapping/dynamic-wrapper';
import { DateFormControlService } from './providers/date-form-control.service';
import { DateNavigationService } from './providers/date-navigation.service';
import { DatepickerEnabledService } from './providers/datepicker-enabled.service';
import { ClrCommonStrings } from '../../utils/i18n/common-strings.interface';
export declare class ClrDateContainer implements DynamicWrapper, OnDestroy {
    private _ifOpenService;
    private _dateNavigationService;
    private _datepickerEnabledService;
    private dateFormControlService;
    commonStrings: ClrCommonStrings;
    _dynamic: boolean;
    private _sub;
    constructor(_ifOpenService: IfOpenService, _dateNavigationService: DateNavigationService, _datepickerEnabledService: DatepickerEnabledService, dateFormControlService: DateFormControlService, commonStrings: ClrCommonStrings);
    /**
     * Returns if the Datepicker is enabled or not. If disabled, hides the datepicker trigger.
     */
    readonly isEnabled: boolean;
    /**
     * Processes the user input and Initializes the Calendar everytime the datepicker popover is open.
     */
    private initializeCalendar;
    /**
     * Toggles the Datepicker Popover.
     */
    toggleDatepicker(event: MouseEvent): void;
    /**
     * Unsubscribe from subscriptions.
     */
    ngOnDestroy(): void;
}
