import { AfterViewInit, ElementRef, EventEmitter, OnDestroy, OnInit, Renderer2, ViewContainerRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { IfErrorService } from '../common/if-error/if-error.service';
import { ControlClassService } from '../common/providers/control-class.service';
import { FocusService } from '../common/providers/focus.service';
import { NgControlService } from '../common/providers/ng-control.service';
import { WrappedFormControl } from '../common/wrapped-control';
import { ClrDateContainer } from './date-container';
import { DateFormControlService } from './providers/date-form-control.service';
import { DateIOService } from './providers/date-io.service';
import { DateNavigationService } from './providers/date-navigation.service';
import { DatepickerEnabledService } from './providers/datepicker-enabled.service';
export declare class ClrDateInput extends WrappedFormControl<ClrDateContainer> implements OnInit, AfterViewInit, OnDestroy {
    private container;
    private elRef;
    private renderer;
    private _ngControl;
    private _dateIOService;
    private _dateNavigationService;
    private _datepickerEnabledService;
    private dateFormControlService;
    private platformId;
    private ngControlService;
    private focusService;
    private ifErrorService;
    private control;
    newFormsLayout: boolean;
    /**
     * Subscriptions to all the services and queries changes
     */
    private _subscriptions;
    private previousOutputInitializedFlag;
    private previousOutput;
    private initializePreviousOutput;
    clrNewLayout: boolean;
    constructor(container: ClrDateContainer, vcr: ViewContainerRef, elRef: ElementRef, renderer: Renderer2, _ngControl: NgControl, _dateIOService: DateIOService, _dateNavigationService: DateNavigationService, _datepickerEnabledService: DatepickerEnabledService, dateFormControlService: DateFormControlService, platformId: Object, ngControlService: NgControlService, controlClassService: ControlClassService, focusService: FocusService, ifErrorService: IfErrorService, control: NgControl, newFormsLayout: boolean);
    /**
     * 1. Populate services if the date container is not present.
     * 2. Initialize Subscriptions.
     * 3. Process User Input.
     */
    ngOnInit(): void;
    /**
     * Process the inputs initialized by the user which were missed
     * because of late subscriptions or lifecycle method calls.
     */
    private processInitialInputs;
    /**
     * Write the initial input set by the user on to the input field.
     */
    ngAfterViewInit(): void;
    /**
     * Unsubscribes from the subscriptions.
     */
    ngOnDestroy(): void;
    /**
     * Populates the services from the container component.
     */
    private populateContainerServices;
    /**
     * Writes the date string value to the input field
     */
    private writeDateStrToInputField;
    private initialLoad;
    private dateValueOnInitialLoad;
    /**
     * Javascript Date object input set by the user.
     */
    date: Date;
    /**
     * Processes a date object to check if its valid or not.
     */
    private processUserDateObject;
    private updateInputValue;
    placeholder: string;
    /**
     * Returns the date format for the placeholder according to which the input should be entered by the user.
     */
    readonly placeholderText: string;
    /**
     * Sets the input type to text when the datepicker is enabled. Reverts back to the native date input
     * when the datepicker is disabled. Datepicker is disabled on mobiles.
     */
    readonly inputType: string;
    _dateUpdated: EventEmitter<Date>;
    private emitDateOutput;
    setFocusStates(): void;
    setBlurStates(): void;
    /**
     * Fires this method when the user changes the input focuses out of the input field.
     */
    onValueChange(target: HTMLInputElement): void;
    /**
     * Initialize DateIO Subscriptions
     */
    private initializeSubscriptions;
}
