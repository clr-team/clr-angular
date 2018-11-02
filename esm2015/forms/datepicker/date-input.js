/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { isPlatformBrowser } from '@angular/common';
import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Inject, Injector, Input, Optional, Output, PLATFORM_ID, Renderer2, Self, ViewContainerRef, } from '@angular/core';
import { NgControl } from '@angular/forms';
import { FocusService } from '../common/providers/focus.service';
import { WrappedFormControl } from '../common/wrapped-control';
import { ClrDateContainer } from './date-container';
import { DayModel } from './model/day.model';
import { DateFormControlService } from './providers/date-form-control.service';
import { DateIOService } from './providers/date-io.service';
import { DateNavigationService } from './providers/date-navigation.service';
import { DatepickerEnabledService } from './providers/datepicker-enabled.service';
import { IS_NEW_FORMS_LAYOUT } from '../common/providers/new-forms.service';
export class ClrDateInput extends WrappedFormControl {
    /**
     * @param {?} vcr
     * @param {?} injector
     * @param {?} el
     * @param {?} renderer
     * @param {?} control
     * @param {?} container
     * @param {?} _dateIOService
     * @param {?} _dateNavigationService
     * @param {?} _datepickerEnabledService
     * @param {?} dateFormControlService
     * @param {?} platformId
     * @param {?} focusService
     * @param {?} newFormsLayout
     */
    constructor(vcr, injector, el, renderer, control, container, _dateIOService, _dateNavigationService, _datepickerEnabledService, dateFormControlService, platformId, focusService, newFormsLayout) {
        super(vcr, ClrDateContainer, injector, control, renderer, el);
        this.el = el;
        this.renderer = renderer;
        this.control = control;
        this.container = container;
        this._dateIOService = _dateIOService;
        this._dateNavigationService = _dateNavigationService;
        this._datepickerEnabledService = _datepickerEnabledService;
        this.dateFormControlService = dateFormControlService;
        this.platformId = platformId;
        this.focusService = focusService;
        this.newFormsLayout = newFormsLayout;
        this.index = 4;
        //We need this variable because if the date input has a value initialized
        //we do not output it. This variable is false during initial load. We make sure that
        //during initial load dayModelOutputted is equal to the value entered by the user so that initialized
        //value isn't emitted back to the user. After initial load,
        //we set this to true and the dayModelOutputted is set only
        //when the Output is emitted to the user.
        this.previousOutputInitializedFlag = false;
        this.initialLoad = true;
        //
        // Output Management
        // Note: For now we will not emit both clrDateChange and ngControl outputs
        // at the same time. This requires us to listen to keydown and blur events to figure out
        // exactly when the Output should be emitted.
        // Our recommendation right now is to either use clrDate or use ngModel/FormControl.
        // Do not use both of them together.
        //
        this._dateUpdated = new EventEmitter(false);
    }
    /**
     * @param {?} dayModel
     * @return {?}
     */
    initializePreviousOutput(dayModel) {
        if (!this.previousOutputInitializedFlag) {
            this.previousOutput = dayModel;
            this.previousOutputInitializedFlag = true;
        }
    }
    /**
     * 1. Populate services if the date container is not present.
     * 2. Initialize Subscriptions.
     * 3. Process User Input.
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        if (!this.container) {
            this.populateContainerServices();
        }
        this.initializeSubscriptions();
        this.processInitialInputs();
        if (this.clrNewLayout !== undefined) {
            this.newFormsLayout = !!this.clrNewLayout;
        }
    }
    /**
     * Process the inputs initialized by the user which were missed
     * because of late subscriptions or lifecycle method calls.
     * @return {?}
     */
    processInitialInputs() {
        this.processUserDateObject(this.dateValueOnInitialLoad);
        // Handle Inital Value from Reactive Forms
        // TODO: We are repeating this logic at multiple places. This makes me think
        // if this class should have implemented the ControlValueAccessor interface.
        // Will explore that later and see if its a cleaner solution.
        if (this.control && this.control.value) {
            this.updateInputValue(this.control.value);
            this.initializePreviousOutput(this._dateNavigationService.selectedDay);
        }
    }
    /**
     * Write the initial input set by the user on to the input field.
     * @return {?}
     */
    ngAfterViewInit() {
        // I don't know why I have to do this but after using the new HostWrapping Module I have to delay the processing
        // of the initial Input set by the user to here.  If I do not 2 issues occur:
        // 1. the Input setter is called before ngOnInit. ngOnInit initializes the services without which the setter
        // fails
        // 2. The Renderer doesn't work before ngAfterViewInit
        //(It used to before the new HostWrapping Module for some reason).
        // I need the renderer to set the value property on the input to make sure that if the user has supplied a Date
        // input object,  we reflect it with the right date on the input field using the IO service.  I am not sure if
        // these are major issues or not but just noting them down here.
        if (this._dateNavigationService) {
            /** @type {?} */
            const selDay = this._dateNavigationService.selectedDay;
            if (selDay) {
                /** @type {?} */
                const dateStr = this._dateIOService.toLocaleDisplayFormatString(selDay.toDate());
                this.writeDateStrToInputField(dateStr);
            }
        }
        this.initialLoad = false;
    }
    /**
     * Populates the services from the container component.
     * @return {?}
     */
    populateContainerServices() {
        this._dateIOService = this.getProviderFromContainer(DateIOService);
        this._dateNavigationService = this.getProviderFromContainer(DateNavigationService);
        this._datepickerEnabledService = this.getProviderFromContainer(DatepickerEnabledService);
        this.dateFormControlService = this.getProviderFromContainer(DateFormControlService);
    }
    /**
     * Writes the date string value to the input field
     * @param {?} value
     * @return {?}
     */
    writeDateStrToInputField(value) {
        this.renderer.setProperty(this.el.nativeElement, 'value', value);
    }
    /**
     * Javascript Date object input set by the user.
     * @param {?} value
     * @return {?}
     */
    set date(value) {
        if (this.initialLoad) {
            // Store date value passed by the user to process after the services have been initialized by
            // the ngOnInit hook.
            this.dateValueOnInitialLoad = value;
        }
        else {
            this.processUserDateObject(value);
        }
    }
    /**
     * Processes a date object to check if its valid or not.
     * @param {?} value
     * @return {?}
     */
    processUserDateObject(value) {
        if (this._dateIOService) {
            // The date object is converted back to string because in Javascript you can create a date object
            // like this: new Date("Test"). This is a date object but it is invalid. Converting the date object
            // that the user passed helps us to verify the validity of the date object.
            /** @type {?} */
            const dateStr = this._dateIOService.toLocaleDisplayFormatString(value);
            this.updateInputValue(dateStr);
        }
    }
    /**
     * @param {?} dateStr
     * @return {?}
     */
    updateInputValue(dateStr) {
        /** @type {?} */
        const date = this._dateIOService.isValidInput(dateStr);
        if (date) {
            /** @type {?} */
            const dayModel = new DayModel(date.getFullYear(), date.getMonth(), date.getDate());
            if (!dayModel.isEqual(this._dateNavigationService.selectedDay)) {
                this._dateNavigationService.selectedDay = dayModel;
                this.writeDateStrToInputField(dateStr);
            }
        }
        else {
            this._dateNavigationService.selectedDay = null;
        }
    }
    /**
     * Returns the date format for the placeholder according to which the input should be entered by the user.
     * @return {?}
     */
    get placeholderText() {
        return this.placeholder ? this.placeholder : this._dateIOService.placeholderText;
    }
    /**
     * Sets the input type to text when the datepicker is enabled. Reverts back to the native date input
     * when the datepicker is disabled. Datepicker is disabled on mobiles.
     * @return {?}
     */
    get inputType() {
        return isPlatformBrowser(this.platformId) && this._datepickerEnabledService.isEnabled ? 'text' : 'date';
    }
    /**
     * @param {?} dayModel
     * @return {?}
     */
    emitDateOutput(dayModel) {
        if (dayModel && !dayModel.isEqual(this.previousOutput)) {
            this._dateUpdated.emit(dayModel.toDate());
            this.previousOutput = dayModel;
        }
        else if (!dayModel && this.previousOutput) {
            this._dateUpdated.emit(null);
            this.previousOutput = null;
        }
    }
    /**
     * @return {?}
     */
    setFocusStates() {
        if (this.focusService) {
            this.focusService.focused = true;
        }
    }
    /**
     * @return {?}
     */
    triggerValidation() {
        super.triggerValidation();
        if (this.focusService) {
            this.focusService.focused = false;
        }
    }
    /**
     * Fires this method when the user changes the input focuses out of the input field.
     * @param {?} target
     * @return {?}
     */
    onValueChange(target) {
        /** @type {?} */
        const value = target.value;
        /** @type {?} */
        const date = this._dateIOService.isValidInput(value);
        if (date) {
            /** @type {?} */
            const dayModel = new DayModel(date.getFullYear(), date.getMonth(), date.getDate());
            this._dateNavigationService.selectedDay = dayModel;
            this.emitDateOutput(dayModel);
        }
        else {
            this._dateNavigationService.selectedDay = null;
            this.emitDateOutput(null);
        }
    }
    /**
     * Initialize DateIO Subscriptions
     * @return {?}
     */
    initializeSubscriptions() {
        if (this._dateNavigationService && this._dateIOService) {
            // This subscription is fired when the user selects a date from the popover.
            this.subscriptions.push(this._dateNavigationService.selectedDayChange.subscribe((dayModel) => {
                /** @type {?} */
                const dateStr = this._dateIOService.toLocaleDisplayFormatString(dayModel.toDate());
                this.writeDateStrToInputField(dateStr);
                // This makes sure that ngModelChange is fired
                // TODO: Check if there is a better way to do this.
                // NOTE: Its important to use NgControl and not NgModel because
                // NgModel only works with template driven forms
                if (this.control) {
                    this.control.control.setValue(dateStr);
                }
                this.emitDateOutput(dayModel);
            }));
            // We do not emit an Output from this subscription because
            // we only emit the Output when the user has focused out of the input.
            if (this.control) {
                this.subscriptions.push(this.control.valueChanges.subscribe((value) => {
                    /** @type {?} */
                    const date = this._dateIOService.isValidInput(value);
                    if (date) {
                        /** @type {?} */
                        const dayModel = new DayModel(date.getFullYear(), date.getMonth(), date.getDate());
                        this._dateNavigationService.selectedDay = dayModel;
                        this.initializePreviousOutput(dayModel);
                    }
                    else if (value === '' || value === null) {
                        this._dateNavigationService.selectedDay = null;
                        this.initializePreviousOutput(null);
                    }
                    else {
                        this.initializePreviousOutput(null);
                    }
                }));
            }
        }
        if (this.dateFormControlService) {
            this.subscriptions.push(this.dateFormControlService.touchedChange.subscribe(() => {
                if (this.control) {
                    this.control.control.markAsTouched();
                }
            }));
            this.subscriptions.push(this.dateFormControlService.dirtyChange.subscribe(() => {
                if (this.control) {
                    this.control.control.markAsDirty();
                }
            }));
        }
    }
}
ClrDateInput.decorators = [
    { type: Directive, args: [{
                selector: '[clrDate]',
                host: {
                    '[class.date-input]': '!newFormsLayout',
                    '[class.clr-input]': 'newFormsLayout',
                },
            },] }
];
/** @nocollapse */
ClrDateInput.ctorParameters = () => [
    { type: ViewContainerRef },
    { type: Injector },
    { type: ElementRef },
    { type: Renderer2 },
    { type: NgControl, decorators: [{ type: Self }, { type: Optional }] },
    { type: ClrDateContainer, decorators: [{ type: Optional }] },
    { type: DateIOService, decorators: [{ type: Optional }] },
    { type: DateNavigationService, decorators: [{ type: Optional }] },
    { type: DatepickerEnabledService, decorators: [{ type: Optional }] },
    { type: DateFormControlService, decorators: [{ type: Optional }] },
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
    { type: FocusService, decorators: [{ type: Optional }] },
    { type: Boolean, decorators: [{ type: Optional }, { type: Inject, args: [IS_NEW_FORMS_LAYOUT,] }] }
];
ClrDateInput.propDecorators = {
    clrNewLayout: [{ type: Input }],
    date: [{ type: Input, args: ['clrDate',] }],
    placeholder: [{ type: Input }],
    placeholderText: [{ type: HostBinding, args: ['attr.placeholder',] }],
    inputType: [{ type: HostBinding, args: ['attr.type',] }],
    _dateUpdated: [{ type: Output, args: ['clrDateChange',] }],
    setFocusStates: [{ type: HostListener, args: ['focus',] }],
    triggerValidation: [{ type: HostListener, args: ['blur',] }],
    onValueChange: [{ type: HostListener, args: ['change', ['$event.target'],] }]
};
if (false) {
    /** @type {?} */
    ClrDateInput.prototype.index;
    /** @type {?} */
    ClrDateInput.prototype.previousOutputInitializedFlag;
    /** @type {?} */
    ClrDateInput.prototype.previousOutput;
    /** @type {?} */
    ClrDateInput.prototype.clrNewLayout;
    /** @type {?} */
    ClrDateInput.prototype.initialLoad;
    /** @type {?} */
    ClrDateInput.prototype.dateValueOnInitialLoad;
    /** @type {?} */
    ClrDateInput.prototype.placeholder;
    /** @type {?} */
    ClrDateInput.prototype._dateUpdated;
    /** @type {?} */
    ClrDateInput.prototype.el;
    /** @type {?} */
    ClrDateInput.prototype.renderer;
    /** @type {?} */
    ClrDateInput.prototype.control;
    /** @type {?} */
    ClrDateInput.prototype.container;
    /** @type {?} */
    ClrDateInput.prototype._dateIOService;
    /** @type {?} */
    ClrDateInput.prototype._dateNavigationService;
    /** @type {?} */
    ClrDateInput.prototype._datepickerEnabledService;
    /** @type {?} */
    ClrDateInput.prototype.dateFormControlService;
    /** @type {?} */
    ClrDateInput.prototype.platformId;
    /** @type {?} */
    ClrDateInput.prototype.focusService;
    /** @type {?} */
    ClrDateInput.prototype.newFormsLayout;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1pbnB1dC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImZvcm1zL2RhdGVwaWNrZXIvZGF0ZS1pbnB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFNQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNwRCxPQUFPLEVBRUwsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osV0FBVyxFQUNYLFlBQVksRUFDWixNQUFNLEVBQ04sUUFBUSxFQUNSLEtBQUssRUFHTCxRQUFRLEVBQ1IsTUFBTSxFQUNOLFdBQVcsRUFDWCxTQUFTLEVBQ1QsSUFBSSxFQUNKLGdCQUFnQixHQUNqQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBRWpFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRS9ELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUMvRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDNUQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDNUUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDbEYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFTNUUsTUFBTSxPQUFPLFlBQWEsU0FBUSxrQkFBb0M7Ozs7Ozs7Ozs7Ozs7Ozs7SUFxQnBFLFlBQ0UsR0FBcUIsRUFDckIsUUFBa0IsRUFDUixFQUFjLEVBQ2Qs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LHVCQTRDcEIsUUFBUTtZQXpDSixhQUFhLHVCQTBDakIsUUFBUTtZQXpDSixxQkFBcUIsdUJBMEN6QixRQUFRO1lBekNKLHdCQUF3Qix1QkEwQzVCLFFBQVE7WUE3Q0osc0JBQXNCLHVCQThDMUIsUUFBUTtZQUNnQyxNQUFNLHVCQUE5QyxNQUFNLFNBQUMsV0FBVztZQXJEZCxZQUFZLHVCQXNEaEIsUUFBUTswQ0FDUixRQUFRLFlBQ1IsTUFBTSxTQUFDLG1CQUFtQjs7OzJCQWxCNUIsS0FBSzttQkF3R0wsS0FBSyxTQUFDLFNBQVM7MEJBcUNmLEtBQUs7OEJBS0wsV0FBVyxTQUFDLGtCQUFrQjt3QkFTOUIsV0FBVyxTQUFDLFdBQVc7MkJBY3ZCLE1BQU0sU0FBQyxlQUFlOzZCQVl0QixZQUFZLFNBQUMsT0FBTztnQ0FPcEIsWUFBWSxTQUFDLE1BQU07NEJBV25CLFlBQVksU0FBQyxRQUFRLEVBQUUsQ0FBQyxlQUFlLENBQUM7Ozs7SUF6TnpDLDZCQUFvQjs7SUFRcEIscURBQXVEOztJQUN2RCxzQ0FBaUM7O0lBU2pDLG9DQUErQjs7SUFrRy9CLG1DQUFvQzs7SUFDcEMsOENBQXFDOztJQTBDckMsbUNBQTZCOztJQTRCN0Isb0NBQTBGOztJQXBLeEYsMEJBQXdCOztJQUN4QixnQ0FBNkI7O0lBQzdCLCtCQUU0Qjs7SUFDNUIsaUNBQStDOztJQUMvQyxzQ0FBaUQ7O0lBQ2pELDhDQUFpRTs7SUFDakUsaURBQXVFOztJQUN2RSw4Q0FBa0U7O0lBQ2xFLGtDQUErQzs7SUFDL0Msb0NBQThDOztJQUM5QyxzQ0FFOEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0QmluZGluZyxcbiAgSG9zdExpc3RlbmVyLFxuICBJbmplY3QsXG4gIEluamVjdG9yLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFBMQVRGT1JNX0lELFxuICBSZW5kZXJlcjIsXG4gIFNlbGYsXG4gIFZpZXdDb250YWluZXJSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRm9jdXNTZXJ2aWNlIH0gZnJvbSAnLi4vY29tbW9uL3Byb3ZpZGVycy9mb2N1cy5zZXJ2aWNlJztcblxuaW1wb3J0IHsgV3JhcHBlZEZvcm1Db250cm9sIH0gZnJvbSAnLi4vY29tbW9uL3dyYXBwZWQtY29udHJvbCc7XG5cbmltcG9ydCB7IENsckRhdGVDb250YWluZXIgfSBmcm9tICcuL2RhdGUtY29udGFpbmVyJztcbmltcG9ydCB7IERheU1vZGVsIH0gZnJvbSAnLi9tb2RlbC9kYXkubW9kZWwnO1xuaW1wb3J0IHsgRGF0ZUZvcm1Db250cm9sU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2RhdGUtZm9ybS1jb250cm9sLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0ZUlPU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2RhdGUtaW8uc2VydmljZSc7XG5pbXBvcnQgeyBEYXRlTmF2aWdhdGlvblNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9kYXRlLW5hdmlnYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBEYXRlcGlja2VyRW5hYmxlZFNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9kYXRlcGlja2VyLWVuYWJsZWQuc2VydmljZSc7XG5pbXBvcnQgeyBJU19ORVdfRk9STVNfTEFZT1VUIH0gZnJvbSAnLi4vY29tbW9uL3Byb3ZpZGVycy9uZXctZm9ybXMuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tjbHJEYXRlXScsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmRhdGUtaW5wdXRdJzogJyFuZXdGb3Jtc0xheW91dCcsXG4gICAgJ1tjbGFzcy5jbHItaW5wdXRdJzogJ25ld0Zvcm1zTGF5b3V0JyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyRGF0ZUlucHV0IGV4dGVuZHMgV3JhcHBlZEZvcm1Db250cm9sPENsckRhdGVDb250YWluZXI+IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICBwcm90ZWN0ZWQgaW5kZXggPSA0O1xuXG4gIC8vV2UgbmVlZCB0aGlzIHZhcmlhYmxlIGJlY2F1c2UgaWYgdGhlIGRhdGUgaW5wdXQgaGFzIGEgdmFsdWUgaW5pdGlhbGl6ZWRcbiAgLy93ZSBkbyBub3Qgb3V0cHV0IGl0LiBUaGlzIHZhcmlhYmxlIGlzIGZhbHNlIGR1cmluZyBpbml0aWFsIGxvYWQuIFdlIG1ha2Ugc3VyZSB0aGF0XG4gIC8vZHVyaW5nIGluaXRpYWwgbG9hZCBkYXlNb2RlbE91dHB1dHRlZCBpcyBlcXVhbCB0byB0aGUgdmFsdWUgZW50ZXJlZCBieSB0aGUgdXNlciBzbyB0aGF0IGluaXRpYWxpemVkXG4gIC8vdmFsdWUgaXNuJ3QgZW1pdHRlZCBiYWNrIHRvIHRoZSB1c2VyLiBBZnRlciBpbml0aWFsIGxvYWQsXG4gIC8vd2Ugc2V0IHRoaXMgdG8gdHJ1ZSBhbmQgdGhlIGRheU1vZGVsT3V0cHV0dGVkIGlzIHNldCBvbmx5XG4gIC8vd2hlbiB0aGUgT3V0cHV0IGlzIGVtaXR0ZWQgdG8gdGhlIHVzZXIuXG4gIHByaXZhdGUgcHJldmlvdXNPdXRwdXRJbml0aWFsaXplZEZsYWc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBwcmV2aW91c091dHB1dDogRGF5TW9kZWw7XG5cbiAgcHJpdmF0ZSBpbml0aWFsaXplUHJldmlvdXNPdXRwdXQoZGF5TW9kZWw6IERheU1vZGVsKSB7XG4gICAgaWYgKCF0aGlzLnByZXZpb3VzT3V0cHV0SW5pdGlhbGl6ZWRGbGFnKSB7XG4gICAgICB0aGlzLnByZXZpb3VzT3V0cHV0ID0gZGF5TW9kZWw7XG4gICAgICB0aGlzLnByZXZpb3VzT3V0cHV0SW5pdGlhbGl6ZWRGbGFnID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoKSBjbHJOZXdMYXlvdXQ6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgdmNyOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIGluamVjdG9yOiBJbmplY3RvcixcbiAgICBwcm90ZWN0ZWQgZWw6IEVsZW1lbnRSZWYsXG4gICAgcHJvdGVjdGVkIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgQFNlbGYoKVxuICAgIEBPcHRpb25hbCgpXG4gICAgcHJvdGVjdGVkIGNvbnRyb2w6IE5nQ29udHJvbCxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGNvbnRhaW5lcjogQ2xyRGF0ZUNvbnRhaW5lcixcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIF9kYXRlSU9TZXJ2aWNlOiBEYXRlSU9TZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgX2RhdGVOYXZpZ2F0aW9uU2VydmljZTogRGF0ZU5hdmlnYXRpb25TZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgX2RhdGVwaWNrZXJFbmFibGVkU2VydmljZTogRGF0ZXBpY2tlckVuYWJsZWRTZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZGF0ZUZvcm1Db250cm9sU2VydmljZTogRGF0ZUZvcm1Db250cm9sU2VydmljZSxcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IE9iamVjdCxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGZvY3VzU2VydmljZTogRm9jdXNTZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpXG4gICAgQEluamVjdChJU19ORVdfRk9STVNfTEFZT1VUKVxuICAgIHB1YmxpYyBuZXdGb3Jtc0xheW91dDogYm9vbGVhblxuICApIHtcbiAgICBzdXBlcih2Y3IsIENsckRhdGVDb250YWluZXIsIGluamVjdG9yLCBjb250cm9sLCByZW5kZXJlciwgZWwpO1xuICB9XG5cbiAgLyoqXG4gICAqIDEuIFBvcHVsYXRlIHNlcnZpY2VzIGlmIHRoZSBkYXRlIGNvbnRhaW5lciBpcyBub3QgcHJlc2VudC5cbiAgICogMi4gSW5pdGlhbGl6ZSBTdWJzY3JpcHRpb25zLlxuICAgKiAzLiBQcm9jZXNzIFVzZXIgSW5wdXQuXG4gICAqL1xuICBuZ09uSW5pdCgpIHtcbiAgICBzdXBlci5uZ09uSW5pdCgpO1xuICAgIGlmICghdGhpcy5jb250YWluZXIpIHtcbiAgICAgIHRoaXMucG9wdWxhdGVDb250YWluZXJTZXJ2aWNlcygpO1xuICAgIH1cbiAgICB0aGlzLmluaXRpYWxpemVTdWJzY3JpcHRpb25zKCk7XG4gICAgdGhpcy5wcm9jZXNzSW5pdGlhbElucHV0cygpO1xuICAgIGlmICh0aGlzLmNsck5ld0xheW91dCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLm5ld0Zvcm1zTGF5b3V0ID0gISF0aGlzLmNsck5ld0xheW91dDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUHJvY2VzcyB0aGUgaW5wdXRzIGluaXRpYWxpemVkIGJ5IHRoZSB1c2VyIHdoaWNoIHdlcmUgbWlzc2VkXG4gICAqIGJlY2F1c2Ugb2YgbGF0ZSBzdWJzY3JpcHRpb25zIG9yIGxpZmVjeWNsZSBtZXRob2QgY2FsbHMuXG4gICAqL1xuICBwcml2YXRlIHByb2Nlc3NJbml0aWFsSW5wdXRzKCk6IHZvaWQge1xuICAgIHRoaXMucHJvY2Vzc1VzZXJEYXRlT2JqZWN0KHRoaXMuZGF0ZVZhbHVlT25Jbml0aWFsTG9hZCk7XG5cbiAgICAvLyBIYW5kbGUgSW5pdGFsIFZhbHVlIGZyb20gUmVhY3RpdmUgRm9ybXNcbiAgICAvLyBUT0RPOiBXZSBhcmUgcmVwZWF0aW5nIHRoaXMgbG9naWMgYXQgbXVsdGlwbGUgcGxhY2VzLiBUaGlzIG1ha2VzIG1lIHRoaW5rXG4gICAgLy8gaWYgdGhpcyBjbGFzcyBzaG91bGQgaGF2ZSBpbXBsZW1lbnRlZCB0aGUgQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlLlxuICAgIC8vIFdpbGwgZXhwbG9yZSB0aGF0IGxhdGVyIGFuZCBzZWUgaWYgaXRzIGEgY2xlYW5lciBzb2x1dGlvbi5cbiAgICBpZiAodGhpcy5jb250cm9sICYmIHRoaXMuY29udHJvbC52YWx1ZSkge1xuICAgICAgdGhpcy51cGRhdGVJbnB1dFZhbHVlKHRoaXMuY29udHJvbC52YWx1ZSk7XG4gICAgICB0aGlzLmluaXRpYWxpemVQcmV2aW91c091dHB1dCh0aGlzLl9kYXRlTmF2aWdhdGlvblNlcnZpY2Uuc2VsZWN0ZWREYXkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBXcml0ZSB0aGUgaW5pdGlhbCBpbnB1dCBzZXQgYnkgdGhlIHVzZXIgb24gdG8gdGhlIGlucHV0IGZpZWxkLlxuICAgKi9cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIC8vIEkgZG9uJ3Qga25vdyB3aHkgSSBoYXZlIHRvIGRvIHRoaXMgYnV0IGFmdGVyIHVzaW5nIHRoZSBuZXcgSG9zdFdyYXBwaW5nIE1vZHVsZSBJIGhhdmUgdG8gZGVsYXkgdGhlIHByb2Nlc3NpbmdcbiAgICAvLyBvZiB0aGUgaW5pdGlhbCBJbnB1dCBzZXQgYnkgdGhlIHVzZXIgdG8gaGVyZS4gIElmIEkgZG8gbm90IDIgaXNzdWVzIG9jY3VyOlxuICAgIC8vIDEuIHRoZSBJbnB1dCBzZXR0ZXIgaXMgY2FsbGVkIGJlZm9yZSBuZ09uSW5pdC4gbmdPbkluaXQgaW5pdGlhbGl6ZXMgdGhlIHNlcnZpY2VzIHdpdGhvdXQgd2hpY2ggdGhlIHNldHRlclxuICAgIC8vIGZhaWxzXG4gICAgLy8gMi4gVGhlIFJlbmRlcmVyIGRvZXNuJ3Qgd29yayBiZWZvcmUgbmdBZnRlclZpZXdJbml0XG4gICAgLy8oSXQgdXNlZCB0byBiZWZvcmUgdGhlIG5ldyBIb3N0V3JhcHBpbmcgTW9kdWxlIGZvciBzb21lIHJlYXNvbikuXG4gICAgLy8gSSBuZWVkIHRoZSByZW5kZXJlciB0byBzZXQgdGhlIHZhbHVlIHByb3BlcnR5IG9uIHRoZSBpbnB1dCB0byBtYWtlIHN1cmUgdGhhdCBpZiB0aGUgdXNlciBoYXMgc3VwcGxpZWQgYSBEYXRlXG4gICAgLy8gaW5wdXQgb2JqZWN0LCAgd2UgcmVmbGVjdCBpdCB3aXRoIHRoZSByaWdodCBkYXRlIG9uIHRoZSBpbnB1dCBmaWVsZCB1c2luZyB0aGUgSU8gc2VydmljZS4gIEkgYW0gbm90IHN1cmUgaWZcbiAgICAvLyB0aGVzZSBhcmUgbWFqb3IgaXNzdWVzIG9yIG5vdCBidXQganVzdCBub3RpbmcgdGhlbSBkb3duIGhlcmUuXG4gICAgaWYgKHRoaXMuX2RhdGVOYXZpZ2F0aW9uU2VydmljZSkge1xuICAgICAgY29uc3Qgc2VsRGF5OiBEYXlNb2RlbCA9IHRoaXMuX2RhdGVOYXZpZ2F0aW9uU2VydmljZS5zZWxlY3RlZERheTtcbiAgICAgIGlmIChzZWxEYXkpIHtcbiAgICAgICAgY29uc3QgZGF0ZVN0cjogc3RyaW5nID0gdGhpcy5fZGF0ZUlPU2VydmljZS50b0xvY2FsZURpc3BsYXlGb3JtYXRTdHJpbmcoc2VsRGF5LnRvRGF0ZSgpKTtcbiAgICAgICAgdGhpcy53cml0ZURhdGVTdHJUb0lucHV0RmllbGQoZGF0ZVN0cik7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuaW5pdGlhbExvYWQgPSBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQb3B1bGF0ZXMgdGhlIHNlcnZpY2VzIGZyb20gdGhlIGNvbnRhaW5lciBjb21wb25lbnQuXG4gICAqL1xuICBwcml2YXRlIHBvcHVsYXRlQ29udGFpbmVyU2VydmljZXMoKTogdm9pZCB7XG4gICAgdGhpcy5fZGF0ZUlPU2VydmljZSA9IHRoaXMuZ2V0UHJvdmlkZXJGcm9tQ29udGFpbmVyKERhdGVJT1NlcnZpY2UpO1xuICAgIHRoaXMuX2RhdGVOYXZpZ2F0aW9uU2VydmljZSA9IHRoaXMuZ2V0UHJvdmlkZXJGcm9tQ29udGFpbmVyKERhdGVOYXZpZ2F0aW9uU2VydmljZSk7XG4gICAgdGhpcy5fZGF0ZXBpY2tlckVuYWJsZWRTZXJ2aWNlID0gdGhpcy5nZXRQcm92aWRlckZyb21Db250YWluZXIoRGF0ZXBpY2tlckVuYWJsZWRTZXJ2aWNlKTtcbiAgICB0aGlzLmRhdGVGb3JtQ29udHJvbFNlcnZpY2UgPSB0aGlzLmdldFByb3ZpZGVyRnJvbUNvbnRhaW5lcihEYXRlRm9ybUNvbnRyb2xTZXJ2aWNlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXcml0ZXMgdGhlIGRhdGUgc3RyaW5nIHZhbHVlIHRvIHRoZSBpbnB1dCBmaWVsZFxuICAgKi9cbiAgcHJpdmF0ZSB3cml0ZURhdGVTdHJUb0lucHV0RmllbGQodmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAndmFsdWUnLCB2YWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIGluaXRpYWxMb2FkOiBib29sZWFuID0gdHJ1ZTtcbiAgcHJpdmF0ZSBkYXRlVmFsdWVPbkluaXRpYWxMb2FkOiBEYXRlO1xuXG4gIC8qKlxuICAgKiBKYXZhc2NyaXB0IERhdGUgb2JqZWN0IGlucHV0IHNldCBieSB0aGUgdXNlci5cbiAgICovXG4gIEBJbnB1dCgnY2xyRGF0ZScpXG4gIHNldCBkYXRlKHZhbHVlOiBEYXRlKSB7XG4gICAgaWYgKHRoaXMuaW5pdGlhbExvYWQpIHtcbiAgICAgIC8vIFN0b3JlIGRhdGUgdmFsdWUgcGFzc2VkIGJ5IHRoZSB1c2VyIHRvIHByb2Nlc3MgYWZ0ZXIgdGhlIHNlcnZpY2VzIGhhdmUgYmVlbiBpbml0aWFsaXplZCBieVxuICAgICAgLy8gdGhlIG5nT25Jbml0IGhvb2suXG4gICAgICB0aGlzLmRhdGVWYWx1ZU9uSW5pdGlhbExvYWQgPSB2YWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wcm9jZXNzVXNlckRhdGVPYmplY3QodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQcm9jZXNzZXMgYSBkYXRlIG9iamVjdCB0byBjaGVjayBpZiBpdHMgdmFsaWQgb3Igbm90LlxuICAgKi9cbiAgcHJpdmF0ZSBwcm9jZXNzVXNlckRhdGVPYmplY3QodmFsdWU6IERhdGUpIHtcbiAgICBpZiAodGhpcy5fZGF0ZUlPU2VydmljZSkge1xuICAgICAgLy8gVGhlIGRhdGUgb2JqZWN0IGlzIGNvbnZlcnRlZCBiYWNrIHRvIHN0cmluZyBiZWNhdXNlIGluIEphdmFzY3JpcHQgeW91IGNhbiBjcmVhdGUgYSBkYXRlIG9iamVjdFxuICAgICAgLy8gbGlrZSB0aGlzOiBuZXcgRGF0ZShcIlRlc3RcIikuIFRoaXMgaXMgYSBkYXRlIG9iamVjdCBidXQgaXQgaXMgaW52YWxpZC4gQ29udmVydGluZyB0aGUgZGF0ZSBvYmplY3RcbiAgICAgIC8vIHRoYXQgdGhlIHVzZXIgcGFzc2VkIGhlbHBzIHVzIHRvIHZlcmlmeSB0aGUgdmFsaWRpdHkgb2YgdGhlIGRhdGUgb2JqZWN0LlxuICAgICAgY29uc3QgZGF0ZVN0cjogc3RyaW5nID0gdGhpcy5fZGF0ZUlPU2VydmljZS50b0xvY2FsZURpc3BsYXlGb3JtYXRTdHJpbmcodmFsdWUpO1xuICAgICAgdGhpcy51cGRhdGVJbnB1dFZhbHVlKGRhdGVTdHIpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlSW5wdXRWYWx1ZShkYXRlU3RyOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBkYXRlOiBEYXRlID0gdGhpcy5fZGF0ZUlPU2VydmljZS5pc1ZhbGlkSW5wdXQoZGF0ZVN0cik7XG4gICAgaWYgKGRhdGUpIHtcbiAgICAgIGNvbnN0IGRheU1vZGVsOiBEYXlNb2RlbCA9IG5ldyBEYXlNb2RlbChkYXRlLmdldEZ1bGxZZWFyKCksIGRhdGUuZ2V0TW9udGgoKSwgZGF0ZS5nZXREYXRlKCkpO1xuICAgICAgaWYgKCFkYXlNb2RlbC5pc0VxdWFsKHRoaXMuX2RhdGVOYXZpZ2F0aW9uU2VydmljZS5zZWxlY3RlZERheSkpIHtcbiAgICAgICAgdGhpcy5fZGF0ZU5hdmlnYXRpb25TZXJ2aWNlLnNlbGVjdGVkRGF5ID0gZGF5TW9kZWw7XG4gICAgICAgIHRoaXMud3JpdGVEYXRlU3RyVG9JbnB1dEZpZWxkKGRhdGVTdHIpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9kYXRlTmF2aWdhdGlvblNlcnZpY2Uuc2VsZWN0ZWREYXkgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGRhdGUgZm9ybWF0IGZvciB0aGUgcGxhY2Vob2xkZXIgYWNjb3JkaW5nIHRvIHdoaWNoIHRoZSBpbnB1dCBzaG91bGQgYmUgZW50ZXJlZCBieSB0aGUgdXNlci5cbiAgICovXG4gIEBIb3N0QmluZGluZygnYXR0ci5wbGFjZWhvbGRlcicpXG4gIGdldCBwbGFjZWhvbGRlclRleHQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5wbGFjZWhvbGRlciA/IHRoaXMucGxhY2Vob2xkZXIgOiB0aGlzLl9kYXRlSU9TZXJ2aWNlLnBsYWNlaG9sZGVyVGV4dDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBpbnB1dCB0eXBlIHRvIHRleHQgd2hlbiB0aGUgZGF0ZXBpY2tlciBpcyBlbmFibGVkLiBSZXZlcnRzIGJhY2sgdG8gdGhlIG5hdGl2ZSBkYXRlIGlucHV0XG4gICAqIHdoZW4gdGhlIGRhdGVwaWNrZXIgaXMgZGlzYWJsZWQuIERhdGVwaWNrZXIgaXMgZGlzYWJsZWQgb24gbW9iaWxlcy5cbiAgICovXG4gIEBIb3N0QmluZGluZygnYXR0ci50eXBlJylcbiAgZ2V0IGlucHV0VHlwZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiBpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpICYmIHRoaXMuX2RhdGVwaWNrZXJFbmFibGVkU2VydmljZS5pc0VuYWJsZWQgPyAndGV4dCcgOiAnZGF0ZSc7XG4gIH1cblxuICAvL1xuICAvLyBPdXRwdXQgTWFuYWdlbWVudFxuICAvLyBOb3RlOiBGb3Igbm93IHdlIHdpbGwgbm90IGVtaXQgYm90aCBjbHJEYXRlQ2hhbmdlIGFuZCBuZ0NvbnRyb2wgb3V0cHV0c1xuICAvLyBhdCB0aGUgc2FtZSB0aW1lLiBUaGlzIHJlcXVpcmVzIHVzIHRvIGxpc3RlbiB0byBrZXlkb3duIGFuZCBibHVyIGV2ZW50cyB0byBmaWd1cmUgb3V0XG4gIC8vIGV4YWN0bHkgd2hlbiB0aGUgT3V0cHV0IHNob3VsZCBiZSBlbWl0dGVkLlxuICAvLyBPdXIgcmVjb21tZW5kYXRpb24gcmlnaHQgbm93IGlzIHRvIGVpdGhlciB1c2UgY2xyRGF0ZSBvciB1c2UgbmdNb2RlbC9Gb3JtQ29udHJvbC5cbiAgLy8gRG8gbm90IHVzZSBib3RoIG9mIHRoZW0gdG9nZXRoZXIuXG4gIC8vXG5cbiAgQE91dHB1dCgnY2xyRGF0ZUNoYW5nZScpIF9kYXRlVXBkYXRlZDogRXZlbnRFbWl0dGVyPERhdGU+ID0gbmV3IEV2ZW50RW1pdHRlcjxEYXRlPihmYWxzZSk7XG5cbiAgcHJpdmF0ZSBlbWl0RGF0ZU91dHB1dChkYXlNb2RlbDogRGF5TW9kZWwpOiB2b2lkIHtcbiAgICBpZiAoZGF5TW9kZWwgJiYgIWRheU1vZGVsLmlzRXF1YWwodGhpcy5wcmV2aW91c091dHB1dCkpIHtcbiAgICAgIHRoaXMuX2RhdGVVcGRhdGVkLmVtaXQoZGF5TW9kZWwudG9EYXRlKCkpO1xuICAgICAgdGhpcy5wcmV2aW91c091dHB1dCA9IGRheU1vZGVsO1xuICAgIH0gZWxzZSBpZiAoIWRheU1vZGVsICYmIHRoaXMucHJldmlvdXNPdXRwdXQpIHtcbiAgICAgIHRoaXMuX2RhdGVVcGRhdGVkLmVtaXQobnVsbCk7XG4gICAgICB0aGlzLnByZXZpb3VzT3V0cHV0ID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdmb2N1cycpXG4gIHNldEZvY3VzU3RhdGVzKCkge1xuICAgIGlmICh0aGlzLmZvY3VzU2VydmljZSkge1xuICAgICAgdGhpcy5mb2N1c1NlcnZpY2UuZm9jdXNlZCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignYmx1cicpXG4gIHRyaWdnZXJWYWxpZGF0aW9uKCkge1xuICAgIHN1cGVyLnRyaWdnZXJWYWxpZGF0aW9uKCk7XG4gICAgaWYgKHRoaXMuZm9jdXNTZXJ2aWNlKSB7XG4gICAgICB0aGlzLmZvY3VzU2VydmljZS5mb2N1c2VkID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEZpcmVzIHRoaXMgbWV0aG9kIHdoZW4gdGhlIHVzZXIgY2hhbmdlcyB0aGUgaW5wdXQgZm9jdXNlcyBvdXQgb2YgdGhlIGlucHV0IGZpZWxkLlxuICAgKi9cbiAgQEhvc3RMaXN0ZW5lcignY2hhbmdlJywgWyckZXZlbnQudGFyZ2V0J10pXG4gIG9uVmFsdWVDaGFuZ2UodGFyZ2V0OiBIVE1MSW5wdXRFbGVtZW50KSB7XG4gICAgY29uc3QgdmFsdWU6IHN0cmluZyA9IHRhcmdldC52YWx1ZTtcbiAgICBjb25zdCBkYXRlOiBEYXRlID0gdGhpcy5fZGF0ZUlPU2VydmljZS5pc1ZhbGlkSW5wdXQodmFsdWUpO1xuICAgIGlmIChkYXRlKSB7XG4gICAgICBjb25zdCBkYXlNb2RlbDogRGF5TW9kZWwgPSBuZXcgRGF5TW9kZWwoZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXRlLmdldE1vbnRoKCksIGRhdGUuZ2V0RGF0ZSgpKTtcbiAgICAgIHRoaXMuX2RhdGVOYXZpZ2F0aW9uU2VydmljZS5zZWxlY3RlZERheSA9IGRheU1vZGVsO1xuICAgICAgdGhpcy5lbWl0RGF0ZU91dHB1dChkYXlNb2RlbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2RhdGVOYXZpZ2F0aW9uU2VydmljZS5zZWxlY3RlZERheSA9IG51bGw7XG4gICAgICB0aGlzLmVtaXREYXRlT3V0cHV0KG51bGwpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIERhdGVJTyBTdWJzY3JpcHRpb25zXG4gICAqL1xuICBwcml2YXRlIGluaXRpYWxpemVTdWJzY3JpcHRpb25zKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9kYXRlTmF2aWdhdGlvblNlcnZpY2UgJiYgdGhpcy5fZGF0ZUlPU2VydmljZSkge1xuICAgICAgLy8gVGhpcyBzdWJzY3JpcHRpb24gaXMgZmlyZWQgd2hlbiB0aGUgdXNlciBzZWxlY3RzIGEgZGF0ZSBmcm9tIHRoZSBwb3BvdmVyLlxuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICAgIHRoaXMuX2RhdGVOYXZpZ2F0aW9uU2VydmljZS5zZWxlY3RlZERheUNoYW5nZS5zdWJzY3JpYmUoKGRheU1vZGVsOiBEYXlNb2RlbCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGRhdGVTdHI6IHN0cmluZyA9IHRoaXMuX2RhdGVJT1NlcnZpY2UudG9Mb2NhbGVEaXNwbGF5Rm9ybWF0U3RyaW5nKGRheU1vZGVsLnRvRGF0ZSgpKTtcbiAgICAgICAgICB0aGlzLndyaXRlRGF0ZVN0clRvSW5wdXRGaWVsZChkYXRlU3RyKTtcbiAgICAgICAgICAvLyBUaGlzIG1ha2VzIHN1cmUgdGhhdCBuZ01vZGVsQ2hhbmdlIGlzIGZpcmVkXG4gICAgICAgICAgLy8gVE9ETzogQ2hlY2sgaWYgdGhlcmUgaXMgYSBiZXR0ZXIgd2F5IHRvIGRvIHRoaXMuXG4gICAgICAgICAgLy8gTk9URTogSXRzIGltcG9ydGFudCB0byB1c2UgTmdDb250cm9sIGFuZCBub3QgTmdNb2RlbCBiZWNhdXNlXG4gICAgICAgICAgLy8gTmdNb2RlbCBvbmx5IHdvcmtzIHdpdGggdGVtcGxhdGUgZHJpdmVuIGZvcm1zXG4gICAgICAgICAgaWYgKHRoaXMuY29udHJvbCkge1xuICAgICAgICAgICAgdGhpcy5jb250cm9sLmNvbnRyb2wuc2V0VmFsdWUoZGF0ZVN0cik7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuZW1pdERhdGVPdXRwdXQoZGF5TW9kZWwpO1xuICAgICAgICB9KVxuICAgICAgKTtcblxuICAgICAgLy8gV2UgZG8gbm90IGVtaXQgYW4gT3V0cHV0IGZyb20gdGhpcyBzdWJzY3JpcHRpb24gYmVjYXVzZVxuICAgICAgLy8gd2Ugb25seSBlbWl0IHRoZSBPdXRwdXQgd2hlbiB0aGUgdXNlciBoYXMgZm9jdXNlZCBvdXQgb2YgdGhlIGlucHV0LlxuICAgICAgaWYgKHRoaXMuY29udHJvbCkge1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgICAgICB0aGlzLmNvbnRyb2wudmFsdWVDaGFuZ2VzLnN1YnNjcmliZSgodmFsdWU6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgY29uc3QgZGF0ZTogRGF0ZSA9IHRoaXMuX2RhdGVJT1NlcnZpY2UuaXNWYWxpZElucHV0KHZhbHVlKTtcbiAgICAgICAgICAgIGlmIChkYXRlKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGRheU1vZGVsOiBEYXlNb2RlbCA9IG5ldyBEYXlNb2RlbChkYXRlLmdldEZ1bGxZZWFyKCksIGRhdGUuZ2V0TW9udGgoKSwgZGF0ZS5nZXREYXRlKCkpO1xuICAgICAgICAgICAgICB0aGlzLl9kYXRlTmF2aWdhdGlvblNlcnZpY2Uuc2VsZWN0ZWREYXkgPSBkYXlNb2RlbDtcbiAgICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplUHJldmlvdXNPdXRwdXQoZGF5TW9kZWwpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gJycgfHwgdmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgdGhpcy5fZGF0ZU5hdmlnYXRpb25TZXJ2aWNlLnNlbGVjdGVkRGF5ID0gbnVsbDtcbiAgICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplUHJldmlvdXNPdXRwdXQobnVsbCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLmluaXRpYWxpemVQcmV2aW91c091dHB1dChudWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLmRhdGVGb3JtQ29udHJvbFNlcnZpY2UpIHtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgICB0aGlzLmRhdGVGb3JtQ29udHJvbFNlcnZpY2UudG91Y2hlZENoYW5nZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLmNvbnRyb2wpIHtcbiAgICAgICAgICAgIHRoaXMuY29udHJvbC5jb250cm9sLm1hcmtBc1RvdWNoZWQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICApO1xuXG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgICAgdGhpcy5kYXRlRm9ybUNvbnRyb2xTZXJ2aWNlLmRpcnR5Q2hhbmdlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuY29udHJvbCkge1xuICAgICAgICAgICAgdGhpcy5jb250cm9sLmNvbnRyb2wubWFya0FzRGlydHkoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cbiAgfVxufVxuIl19