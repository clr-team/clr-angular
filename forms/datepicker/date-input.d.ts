import { AfterViewInit, ElementRef, EventEmitter, Injector, OnDestroy, OnInit, Renderer2, ViewContainerRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { FocusService } from '../common/providers/focus.service';
import { WrappedFormControl } from '../common/wrapped-control';
import { ClrDateContainer } from './date-container';
import { DateFormControlService } from './providers/date-form-control.service';
import { DateIOService } from './providers/date-io.service';
import { DateNavigationService } from './providers/date-navigation.service';
import { DatepickerEnabledService } from './providers/datepicker-enabled.service';
export declare class ClrDateInput extends WrappedFormControl<ClrDateContainer> implements OnInit, AfterViewInit, OnDestroy {
    protected el: ElementRef;
    protected renderer: Renderer2;
    protected control: NgControl;
    private container;
    private _dateIOService;
    private _dateNavigationService;
    private _datepickerEnabledService;
    private dateFormControlService;
    private platformId;
    private focusService;
    newFormsLayout: boolean;
    protected index: number;
    private previousOutputInitializedFlag;
    private previousOutput;
    private initializePreviousOutput;
    clrNewLayout: boolean;
    constructor(vcr: ViewContainerRef, injector: Injector, el: ElementRef, renderer: Renderer2, control: NgControl, container: ClrDateContainer, _dateIOService: DateIOService, _dateNavigationService: DateNavigationService, _datepickerEnabledService: DatepickerEnabledService, dateFormControlService: DateFormControlService, platformId: Object, focusService: FocusService, newFormsLayout: boolean);
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
    triggerValidation(): void;
    /**
     * Fires this method when the user changes the input focuses out of the input field.
     */
    onValueChange(target: HTMLInputElement): void;
    /**
     * Initialize DateIO Subscriptions
     */
    private initializeSubscriptions;
}
