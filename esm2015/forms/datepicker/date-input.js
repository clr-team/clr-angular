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
import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Inject, Input, Optional, Output, PLATFORM_ID, Renderer2, Self, ViewContainerRef, } from '@angular/core';
import { NgControl } from '@angular/forms';
import { IfErrorService } from '../common/if-error/if-error.service';
import { ControlClassService } from '../common/providers/control-class.service';
import { FocusService } from '../common/providers/focus.service';
import { NgControlService } from '../common/providers/ng-control.service';
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
     * @param {?} container
     * @param {?} vcr
     * @param {?} elRef
     * @param {?} renderer
     * @param {?} _ngControl
     * @param {?} _dateIOService
     * @param {?} _dateNavigationService
     * @param {?} _datepickerEnabledService
     * @param {?} dateFormControlService
     * @param {?} platformId
     * @param {?} ngControlService
     * @param {?} controlClassService
     * @param {?} focusService
     * @param {?} ifErrorService
     * @param {?} control
     * @param {?} newFormsLayout
     */
    constructor(container, vcr, elRef, renderer, _ngControl, _dateIOService, _dateNavigationService, _datepickerEnabledService, dateFormControlService, platformId, ngControlService, controlClassService, focusService, ifErrorService, control, newFormsLayout) {
        super(ClrDateContainer, vcr, 4);
        this.container = container;
        this.elRef = elRef;
        this.renderer = renderer;
        this._ngControl = _ngControl;
        this._dateIOService = _dateIOService;
        this._dateNavigationService = _dateNavigationService;
        this._datepickerEnabledService = _datepickerEnabledService;
        this.dateFormControlService = dateFormControlService;
        this.platformId = platformId;
        this.ngControlService = ngControlService;
        this.focusService = focusService;
        this.ifErrorService = ifErrorService;
        this.control = control;
        this.newFormsLayout = newFormsLayout;
        /**
         * Subscriptions to all the services and queries changes
         */
        this._subscriptions = [];
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
        if (controlClassService) {
            controlClassService.className = this.elRef.nativeElement.className;
        }
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
        if (this.ngControlService && this.control) {
            this.ngControlService.setControl(this.control);
        }
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
        if (this._ngControl && this._ngControl.value) {
            this.updateInputValue(this._ngControl.value);
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
     * Unsubscribes from the subscriptions.
     * @return {?}
     */
    ngOnDestroy() {
        this._subscriptions.forEach((sub) => sub.unsubscribe());
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
        this.renderer.setProperty(this.elRef.nativeElement, 'value', value);
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
    setBlurStates() {
        if (this.ifErrorService) {
            this.ifErrorService.triggerStatusChange();
        }
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
            this._subscriptions.push(this._dateNavigationService.selectedDayChange.subscribe((dayModel) => {
                /** @type {?} */
                const dateStr = this._dateIOService.toLocaleDisplayFormatString(dayModel.toDate());
                this.writeDateStrToInputField(dateStr);
                // This makes sure that ngModelChange is fired
                // TODO: Check if there is a better way to do this.
                // NOTE: Its important to use NgControl and not NgModel because
                // NgModel only works with template driven forms
                if (this._ngControl) {
                    this._ngControl.control.setValue(dateStr);
                }
                this.emitDateOutput(dayModel);
            }));
            // We do not emit an Output from this subscription because
            // we only emit the Output when the user has focused out of the input.
            if (this._ngControl) {
                this._subscriptions.push(this._ngControl.valueChanges.subscribe((value) => {
                    /** @type {?} */
                    const date = this._dateIOService.isValidInput(value);
                    if (date) {
                        /** @type {?} */
                        const dayModel = new DayModel(date.getFullYear(), date.getMonth(), date.getDate());
                        this._dateNavigationService.selectedDay = dayModel;
                        this.initializePreviousOutput(dayModel);
                    }
                    else {
                        this.initializePreviousOutput(null);
                    }
                }));
            }
        }
        if (this.dateFormControlService) {
            this._subscriptions.push(this.dateFormControlService.touchedChange.subscribe(() => {
                if (this._ngControl) {
                    this._ngControl.control.markAsTouched();
                }
            }));
            this._subscriptions.push(this.dateFormControlService.dirtyChange.subscribe(() => {
                if (this._ngControl) {
                    this._ngControl.control.markAsDirty();
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
    { type: ClrDateContainer, decorators: [{ type: Optional }] },
    { type: ViewContainerRef },
    { type: ElementRef },
    { type: Renderer2 },
    { type: NgControl, decorators: [{ type: Self }, { type: Optional }] },
    { type: DateIOService, decorators: [{ type: Optional }] },
    { type: DateNavigationService, decorators: [{ type: Optional }] },
    { type: DatepickerEnabledService, decorators: [{ type: Optional }] },
    { type: DateFormControlService, decorators: [{ type: Optional }] },
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
    { type: NgControlService, decorators: [{ type: Optional }] },
    { type: ControlClassService, decorators: [{ type: Optional }] },
    { type: FocusService, decorators: [{ type: Optional }] },
    { type: IfErrorService, decorators: [{ type: Optional }] },
    { type: NgControl, decorators: [{ type: Optional }] },
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
    setBlurStates: [{ type: HostListener, args: ['blur',] }],
    onValueChange: [{ type: HostListener, args: ['change', ['$event.target'],] }]
};
if (false) {
    /**
     * Subscriptions to all the services and queries changes
     * @type {?}
     */
    ClrDateInput.prototype._subscriptions;
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
    ClrDateInput.prototype.container;
    /** @type {?} */
    ClrDateInput.prototype.elRef;
    /** @type {?} */
    ClrDateInput.prototype.renderer;
    /** @type {?} */
    ClrDateInput.prototype._ngControl;
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
    ClrDateInput.prototype.ngControlService;
    /** @type {?} */
    ClrDateInput.prototype.focusService;
    /** @type {?} */
    ClrDateInput.prototype.ifErrorService;
    /** @type {?} */
    ClrDateInput.prototype.control;
    /** @type {?} */
    ClrDateInput.prototype.newFormsLayout;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1pbnB1dC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImZvcm1zL2RhdGVwaWNrZXIvZGF0ZS1pbnB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFNQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNwRCxPQUFPLEVBRUwsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osV0FBVyxFQUNYLFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUdMLFFBQVEsRUFDUixNQUFNLEVBQ04sV0FBVyxFQUNYLFNBQVMsRUFDVCxJQUFJLEVBQ0osZ0JBQWdCLEdBQ2pCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUzQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDckUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDaEYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBRTFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRS9ELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUMvRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDNUQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDNUUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDbEYsT0FBTyxFQUFF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QUFDLE1BQU07NEJBYW5CLFlBQVksU0FBQyxRQUFRLEVBQUUsQ0FBQyxlQUFlLENBQUM7Ozs7Ozs7SUE1T3pDLHNDQUE0Qzs7SUFRNUMscURBQXVEOztJQUN2RCxzQ0FBaUM7O0lBU2pDLG9DQUErQjs7SUFtSC9CLG1DQUFvQzs7SUFDcEMsOENBQXFDOztJQTBDckMsbUNBQTZCOztJQTRCN0Isb0NBQTBGOztJQXZMeEYsaUNBQStDOztJQUUvQyw2QkFBeUI7O0lBQ3pCLGdDQUEyQjs7SUFDM0Isa0NBRTZCOztJQUM3QixzQ0FBaUQ7O0lBQ2pELDhDQUFpRTs7SUFDakUsaURBQXVFOztJQUN2RSw4Q0FBa0U7O0lBQ2xFLGtDQUErQzs7SUFDL0Msd0NBQXNEOztJQUV0RCxvQ0FBOEM7O0lBQzlDLHNDQUFrRDs7SUFDbEQsK0JBQXNDOztJQUN0QyxzQ0FFOEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0QmluZGluZyxcbiAgSG9zdExpc3RlbmVyLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbiAgUExBVEZPUk1fSUQsXG4gIFJlbmRlcmVyMixcbiAgU2VsZixcbiAgVmlld0NvbnRhaW5lclJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ0NvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IElmRXJyb3JTZXJ2aWNlIH0gZnJvbSAnLi4vY29tbW9uL2lmLWVycm9yL2lmLWVycm9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29udHJvbENsYXNzU2VydmljZSB9IGZyb20gJy4uL2NvbW1vbi9wcm92aWRlcnMvY29udHJvbC1jbGFzcy5zZXJ2aWNlJztcbmltcG9ydCB7IEZvY3VzU2VydmljZSB9IGZyb20gJy4uL2NvbW1vbi9wcm92aWRlcnMvZm9jdXMuc2VydmljZSc7XG5pbXBvcnQgeyBOZ0NvbnRyb2xTZXJ2aWNlIH0gZnJvbSAnLi4vY29tbW9uL3Byb3ZpZGVycy9uZy1jb250cm9sLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBXcmFwcGVkRm9ybUNvbnRyb2wgfSBmcm9tICcuLi9jb21tb24vd3JhcHBlZC1jb250cm9sJztcblxuaW1wb3J0IHsgQ2xyRGF0ZUNvbnRhaW5lciB9IGZyb20gJy4vZGF0ZS1jb250YWluZXInO1xuaW1wb3J0IHsgRGF5TW9kZWwgfSBmcm9tICcuL21vZGVsL2RheS5tb2RlbCc7XG5pbXBvcnQgeyBEYXRlRm9ybUNvbnRyb2xTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvZGF0ZS1mb3JtLWNvbnRyb2wuc2VydmljZSc7XG5pbXBvcnQgeyBEYXRlSU9TZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvZGF0ZS1pby5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGVOYXZpZ2F0aW9uU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2RhdGUtbmF2aWdhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGVwaWNrZXJFbmFibGVkU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2RhdGVwaWNrZXItZW5hYmxlZC5zZXJ2aWNlJztcbmltcG9ydCB7IElTX05FV19GT1JNU19MQVlPVVQgfSBmcm9tICcuLi9jb21tb24vcHJvdmlkZXJzL25ldy1mb3Jtcy5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2NsckRhdGVdJyxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuZGF0ZS1pbnB1dF0nOiAnIW5ld0Zvcm1zTGF5b3V0JyxcbiAgICAnW2NsYXNzLmNsci1pbnB1dF0nOiAnbmV3Rm9ybXNMYXlvdXQnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBDbHJEYXRlSW5wdXQgZXh0ZW5kcyBXcmFwcGVkRm9ybUNvbnRyb2w8Q2xyRGF0ZUNvbnRhaW5lcj4gaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIC8qKlxuICAgKiBTdWJzY3JpcHRpb25zIHRvIGFsbCB0aGUgc2VydmljZXMgYW5kIHF1ZXJpZXMgY2hhbmdlc1xuICAgKi9cbiAgcHJpdmF0ZSBfc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICAvL1dlIG5lZWQgdGhpcyB2YXJpYWJsZSBiZWNhdXNlIGlmIHRoZSBkYXRlIGlucHV0IGhhcyBhIHZhbHVlIGluaXRpYWxpemVkXG4gIC8vd2UgZG8gbm90IG91dHB1dCBpdC4gVGhpcyB2YXJpYWJsZSBpcyBmYWxzZSBkdXJpbmcgaW5pdGlhbCBsb2FkLiBXZSBtYWtlIHN1cmUgdGhhdFxuICAvL2R1cmluZyBpbml0aWFsIGxvYWQgZGF5TW9kZWxPdXRwdXR0ZWQgaXMgZXF1YWwgdG8gdGhlIHZhbHVlIGVudGVyZWQgYnkgdGhlIHVzZXIgc28gdGhhdCBpbml0aWFsaXplZFxuICAvL3ZhbHVlIGlzbid0IGVtaXR0ZWQgYmFjayB0byB0aGUgdXNlci4gQWZ0ZXIgaW5pdGlhbCBsb2FkLFxuICAvL3dlIHNldCB0aGlzIHRvIHRydWUgYW5kIHRoZSBkYXlNb2RlbE91dHB1dHRlZCBpcyBzZXQgb25seVxuICAvL3doZW4gdGhlIE91dHB1dCBpcyBlbWl0dGVkIHRvIHRoZSB1c2VyLlxuICBwcml2YXRlIHByZXZpb3VzT3V0cHV0SW5pdGlhbGl6ZWRGbGFnOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgcHJldmlvdXNPdXRwdXQ6IERheU1vZGVsO1xuXG4gIHByaXZhdGUgaW5pdGlhbGl6ZVByZXZpb3VzT3V0cHV0KGRheU1vZGVsOiBEYXlNb2RlbCkge1xuICAgIGlmICghdGhpcy5wcmV2aW91c091dHB1dEluaXRpYWxpemVkRmxhZykge1xuICAgICAgdGhpcy5wcmV2aW91c091dHB1dCA9IGRheU1vZGVsO1xuICAgICAgdGhpcy5wcmV2aW91c091dHB1dEluaXRpYWxpemVkRmxhZyA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgQElucHV0KCkgY2xyTmV3TGF5b3V0OiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgY29udGFpbmVyOiBDbHJEYXRlQ29udGFpbmVyLFxuICAgIHZjcjogVmlld0NvbnRhaW5lclJlZixcbiAgICBwcml2YXRlIGVsUmVmOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBAU2VsZigpXG4gICAgQE9wdGlvbmFsKClcbiAgICBwcml2YXRlIF9uZ0NvbnRyb2w6IE5nQ29udHJvbCxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIF9kYXRlSU9TZXJ2aWNlOiBEYXRlSU9TZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgX2RhdGVOYXZpZ2F0aW9uU2VydmljZTogRGF0ZU5hdmlnYXRpb25TZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgX2RhdGVwaWNrZXJFbmFibGVkU2VydmljZTogRGF0ZXBpY2tlckVuYWJsZWRTZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZGF0ZUZvcm1Db250cm9sU2VydmljZTogRGF0ZUZvcm1Db250cm9sU2VydmljZSxcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IE9iamVjdCxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIG5nQ29udHJvbFNlcnZpY2U6IE5nQ29udHJvbFNlcnZpY2UsXG4gICAgQE9wdGlvbmFsKCkgY29udHJvbENsYXNzU2VydmljZTogQ29udHJvbENsYXNzU2VydmljZSxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGZvY3VzU2VydmljZTogRm9jdXNTZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgaWZFcnJvclNlcnZpY2U6IElmRXJyb3JTZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgY29udHJvbDogTmdDb250cm9sLFxuICAgIEBPcHRpb25hbCgpXG4gICAgQEluamVjdChJU19ORVdfRk9STVNfTEFZT1VUKVxuICAgIHB1YmxpYyBuZXdGb3Jtc0xheW91dDogYm9vbGVhblxuICApIHtcbiAgICBzdXBlcihDbHJEYXRlQ29udGFpbmVyLCB2Y3IsIDQpO1xuXG4gICAgaWYgKGNvbnRyb2xDbGFzc1NlcnZpY2UpIHtcbiAgICAgIGNvbnRyb2xDbGFzc1NlcnZpY2UuY2xhc3NOYW1lID0gdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTmFtZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogMS4gUG9wdWxhdGUgc2VydmljZXMgaWYgdGhlIGRhdGUgY29udGFpbmVyIGlzIG5vdCBwcmVzZW50LlxuICAgKiAyLiBJbml0aWFsaXplIFN1YnNjcmlwdGlvbnMuXG4gICAqIDMuIFByb2Nlc3MgVXNlciBJbnB1dC5cbiAgICovXG4gIG5nT25Jbml0KCkge1xuICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gICAgaWYgKHRoaXMubmdDb250cm9sU2VydmljZSAmJiB0aGlzLmNvbnRyb2wpIHtcbiAgICAgIHRoaXMubmdDb250cm9sU2VydmljZS5zZXRDb250cm9sKHRoaXMuY29udHJvbCk7XG4gICAgfVxuICAgIGlmICghdGhpcy5jb250YWluZXIpIHtcbiAgICAgIHRoaXMucG9wdWxhdGVDb250YWluZXJTZXJ2aWNlcygpO1xuICAgIH1cbiAgICB0aGlzLmluaXRpYWxpemVTdWJzY3JpcHRpb25zKCk7XG4gICAgdGhpcy5wcm9jZXNzSW5pdGlhbElucHV0cygpO1xuICAgIGlmICh0aGlzLmNsck5ld0xheW91dCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLm5ld0Zvcm1zTGF5b3V0ID0gISF0aGlzLmNsck5ld0xheW91dDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUHJvY2VzcyB0aGUgaW5wdXRzIGluaXRpYWxpemVkIGJ5IHRoZSB1c2VyIHdoaWNoIHdlcmUgbWlzc2VkXG4gICAqIGJlY2F1c2Ugb2YgbGF0ZSBzdWJzY3JpcHRpb25zIG9yIGxpZmVjeWNsZSBtZXRob2QgY2FsbHMuXG4gICAqL1xuICBwcml2YXRlIHByb2Nlc3NJbml0aWFsSW5wdXRzKCk6IHZvaWQge1xuICAgIHRoaXMucHJvY2Vzc1VzZXJEYXRlT2JqZWN0KHRoaXMuZGF0ZVZhbHVlT25Jbml0aWFsTG9hZCk7XG5cbiAgICAvLyBIYW5kbGUgSW5pdGFsIFZhbHVlIGZyb20gUmVhY3RpdmUgRm9ybXNcbiAgICAvLyBUT0RPOiBXZSBhcmUgcmVwZWF0aW5nIHRoaXMgbG9naWMgYXQgbXVsdGlwbGUgcGxhY2VzLiBUaGlzIG1ha2VzIG1lIHRoaW5rXG4gICAgLy8gaWYgdGhpcyBjbGFzcyBzaG91bGQgaGF2ZSBpbXBsZW1lbnRlZCB0aGUgQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlLlxuICAgIC8vIFdpbGwgZXhwbG9yZSB0aGF0IGxhdGVyIGFuZCBzZWUgaWYgaXRzIGEgY2xlYW5lciBzb2x1dGlvbi5cbiAgICBpZiAodGhpcy5fbmdDb250cm9sICYmIHRoaXMuX25nQ29udHJvbC52YWx1ZSkge1xuICAgICAgdGhpcy51cGRhdGVJbnB1dFZhbHVlKHRoaXMuX25nQ29udHJvbC52YWx1ZSk7XG4gICAgICB0aGlzLmluaXRpYWxpemVQcmV2aW91c091dHB1dCh0aGlzLl9kYXRlTmF2aWdhdGlvblNlcnZpY2Uuc2VsZWN0ZWREYXkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBXcml0ZSB0aGUgaW5pdGlhbCBpbnB1dCBzZXQgYnkgdGhlIHVzZXIgb24gdG8gdGhlIGlucHV0IGZpZWxkLlxuICAgKi9cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIC8vIEkgZG9uJ3Qga25vdyB3aHkgSSBoYXZlIHRvIGRvIHRoaXMgYnV0IGFmdGVyIHVzaW5nIHRoZSBuZXcgSG9zdFdyYXBwaW5nIE1vZHVsZSBJIGhhdmUgdG8gZGVsYXkgdGhlIHByb2Nlc3NpbmdcbiAgICAvLyBvZiB0aGUgaW5pdGlhbCBJbnB1dCBzZXQgYnkgdGhlIHVzZXIgdG8gaGVyZS4gIElmIEkgZG8gbm90IDIgaXNzdWVzIG9jY3VyOlxuICAgIC8vIDEuIHRoZSBJbnB1dCBzZXR0ZXIgaXMgY2FsbGVkIGJlZm9yZSBuZ09uSW5pdC4gbmdPbkluaXQgaW5pdGlhbGl6ZXMgdGhlIHNlcnZpY2VzIHdpdGhvdXQgd2hpY2ggdGhlIHNldHRlclxuICAgIC8vIGZhaWxzXG4gICAgLy8gMi4gVGhlIFJlbmRlcmVyIGRvZXNuJ3Qgd29yayBiZWZvcmUgbmdBZnRlclZpZXdJbml0XG4gICAgLy8oSXQgdXNlZCB0byBiZWZvcmUgdGhlIG5ldyBIb3N0V3JhcHBpbmcgTW9kdWxlIGZvciBzb21lIHJlYXNvbikuXG4gICAgLy8gSSBuZWVkIHRoZSByZW5kZXJlciB0byBzZXQgdGhlIHZhbHVlIHByb3BlcnR5IG9uIHRoZSBpbnB1dCB0byBtYWtlIHN1cmUgdGhhdCBpZiB0aGUgdXNlciBoYXMgc3VwcGxpZWQgYSBEYXRlXG4gICAgLy8gaW5wdXQgb2JqZWN0LCAgd2UgcmVmbGVjdCBpdCB3aXRoIHRoZSByaWdodCBkYXRlIG9uIHRoZSBpbnB1dCBmaWVsZCB1c2luZyB0aGUgSU8gc2VydmljZS4gIEkgYW0gbm90IHN1cmUgaWZcbiAgICAvLyB0aGVzZSBhcmUgbWFqb3IgaXNzdWVzIG9yIG5vdCBidXQganVzdCBub3RpbmcgdGhlbSBkb3duIGhlcmUuXG4gICAgaWYgKHRoaXMuX2RhdGVOYXZpZ2F0aW9uU2VydmljZSkge1xuICAgICAgY29uc3Qgc2VsRGF5OiBEYXlNb2RlbCA9IHRoaXMuX2RhdGVOYXZpZ2F0aW9uU2VydmljZS5zZWxlY3RlZERheTtcbiAgICAgIGlmIChzZWxEYXkpIHtcbiAgICAgICAgY29uc3QgZGF0ZVN0cjogc3RyaW5nID0gdGhpcy5fZGF0ZUlPU2VydmljZS50b0xvY2FsZURpc3BsYXlGb3JtYXRTdHJpbmcoc2VsRGF5LnRvRGF0ZSgpKTtcbiAgICAgICAgdGhpcy53cml0ZURhdGVTdHJUb0lucHV0RmllbGQoZGF0ZVN0cik7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuaW5pdGlhbExvYWQgPSBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVbnN1YnNjcmliZXMgZnJvbSB0aGUgc3Vic2NyaXB0aW9ucy5cbiAgICovXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMuZm9yRWFjaCgoc3ViOiBTdWJzY3JpcHRpb24pID0+IHN1Yi51bnN1YnNjcmliZSgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQb3B1bGF0ZXMgdGhlIHNlcnZpY2VzIGZyb20gdGhlIGNvbnRhaW5lciBjb21wb25lbnQuXG4gICAqL1xuICBwcml2YXRlIHBvcHVsYXRlQ29udGFpbmVyU2VydmljZXMoKTogdm9pZCB7XG4gICAgdGhpcy5fZGF0ZUlPU2VydmljZSA9IHRoaXMuZ2V0UHJvdmlkZXJGcm9tQ29udGFpbmVyKERhdGVJT1NlcnZpY2UpO1xuICAgIHRoaXMuX2RhdGVOYXZpZ2F0aW9uU2VydmljZSA9IHRoaXMuZ2V0UHJvdmlkZXJGcm9tQ29udGFpbmVyKERhdGVOYXZpZ2F0aW9uU2VydmljZSk7XG4gICAgdGhpcy5fZGF0ZXBpY2tlckVuYWJsZWRTZXJ2aWNlID0gdGhpcy5nZXRQcm92aWRlckZyb21Db250YWluZXIoRGF0ZXBpY2tlckVuYWJsZWRTZXJ2aWNlKTtcbiAgICB0aGlzLmRhdGVGb3JtQ29udHJvbFNlcnZpY2UgPSB0aGlzLmdldFByb3ZpZGVyRnJvbUNvbnRhaW5lcihEYXRlRm9ybUNvbnRyb2xTZXJ2aWNlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXcml0ZXMgdGhlIGRhdGUgc3RyaW5nIHZhbHVlIHRvIHRoZSBpbnB1dCBmaWVsZFxuICAgKi9cbiAgcHJpdmF0ZSB3cml0ZURhdGVTdHJUb0lucHV0RmllbGQodmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAndmFsdWUnLCB2YWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIGluaXRpYWxMb2FkOiBib29sZWFuID0gdHJ1ZTtcbiAgcHJpdmF0ZSBkYXRlVmFsdWVPbkluaXRpYWxMb2FkOiBEYXRlO1xuXG4gIC8qKlxuICAgKiBKYXZhc2NyaXB0IERhdGUgb2JqZWN0IGlucHV0IHNldCBieSB0aGUgdXNlci5cbiAgICovXG4gIEBJbnB1dCgnY2xyRGF0ZScpXG4gIHNldCBkYXRlKHZhbHVlOiBEYXRlKSB7XG4gICAgaWYgKHRoaXMuaW5pdGlhbExvYWQpIHtcbiAgICAgIC8vIFN0b3JlIGRhdGUgdmFsdWUgcGFzc2VkIGJ5IHRoZSB1c2VyIHRvIHByb2Nlc3MgYWZ0ZXIgdGhlIHNlcnZpY2VzIGhhdmUgYmVlbiBpbml0aWFsaXplZCBieVxuICAgICAgLy8gdGhlIG5nT25Jbml0IGhvb2suXG4gICAgICB0aGlzLmRhdGVWYWx1ZU9uSW5pdGlhbExvYWQgPSB2YWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wcm9jZXNzVXNlckRhdGVPYmplY3QodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQcm9jZXNzZXMgYSBkYXRlIG9iamVjdCB0byBjaGVjayBpZiBpdHMgdmFsaWQgb3Igbm90LlxuICAgKi9cbiAgcHJpdmF0ZSBwcm9jZXNzVXNlckRhdGVPYmplY3QodmFsdWU6IERhdGUpIHtcbiAgICBpZiAodGhpcy5fZGF0ZUlPU2VydmljZSkge1xuICAgICAgLy8gVGhlIGRhdGUgb2JqZWN0IGlzIGNvbnZlcnRlZCBiYWNrIHRvIHN0cmluZyBiZWNhdXNlIGluIEphdmFzY3JpcHQgeW91IGNhbiBjcmVhdGUgYSBkYXRlIG9iamVjdFxuICAgICAgLy8gbGlrZSB0aGlzOiBuZXcgRGF0ZShcIlRlc3RcIikuIFRoaXMgaXMgYSBkYXRlIG9iamVjdCBidXQgaXQgaXMgaW52YWxpZC4gQ29udmVydGluZyB0aGUgZGF0ZSBvYmplY3RcbiAgICAgIC8vIHRoYXQgdGhlIHVzZXIgcGFzc2VkIGhlbHBzIHVzIHRvIHZlcmlmeSB0aGUgdmFsaWRpdHkgb2YgdGhlIGRhdGUgb2JqZWN0LlxuICAgICAgY29uc3QgZGF0ZVN0cjogc3RyaW5nID0gdGhpcy5fZGF0ZUlPU2VydmljZS50b0xvY2FsZURpc3BsYXlGb3JtYXRTdHJpbmcodmFsdWUpO1xuICAgICAgdGhpcy51cGRhdGVJbnB1dFZhbHVlKGRhdGVTdHIpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlSW5wdXRWYWx1ZShkYXRlU3RyOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBkYXRlOiBEYXRlID0gdGhpcy5fZGF0ZUlPU2VydmljZS5pc1ZhbGlkSW5wdXQoZGF0ZVN0cik7XG4gICAgaWYgKGRhdGUpIHtcbiAgICAgIGNvbnN0IGRheU1vZGVsOiBEYXlNb2RlbCA9IG5ldyBEYXlNb2RlbChkYXRlLmdldEZ1bGxZZWFyKCksIGRhdGUuZ2V0TW9udGgoKSwgZGF0ZS5nZXREYXRlKCkpO1xuICAgICAgaWYgKCFkYXlNb2RlbC5pc0VxdWFsKHRoaXMuX2RhdGVOYXZpZ2F0aW9uU2VydmljZS5zZWxlY3RlZERheSkpIHtcbiAgICAgICAgdGhpcy5fZGF0ZU5hdmlnYXRpb25TZXJ2aWNlLnNlbGVjdGVkRGF5ID0gZGF5TW9kZWw7XG4gICAgICAgIHRoaXMud3JpdGVEYXRlU3RyVG9JbnB1dEZpZWxkKGRhdGVTdHIpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9kYXRlTmF2aWdhdGlvblNlcnZpY2Uuc2VsZWN0ZWREYXkgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGRhdGUgZm9ybWF0IGZvciB0aGUgcGxhY2Vob2xkZXIgYWNjb3JkaW5nIHRvIHdoaWNoIHRoZSBpbnB1dCBzaG91bGQgYmUgZW50ZXJlZCBieSB0aGUgdXNlci5cbiAgICovXG4gIEBIb3N0QmluZGluZygnYXR0ci5wbGFjZWhvbGRlcicpXG4gIGdldCBwbGFjZWhvbGRlclRleHQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5wbGFjZWhvbGRlciA/IHRoaXMucGxhY2Vob2xkZXIgOiB0aGlzLl9kYXRlSU9TZXJ2aWNlLnBsYWNlaG9sZGVyVGV4dDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBpbnB1dCB0eXBlIHRvIHRleHQgd2hlbiB0aGUgZGF0ZXBpY2tlciBpcyBlbmFibGVkLiBSZXZlcnRzIGJhY2sgdG8gdGhlIG5hdGl2ZSBkYXRlIGlucHV0XG4gICAqIHdoZW4gdGhlIGRhdGVwaWNrZXIgaXMgZGlzYWJsZWQuIERhdGVwaWNrZXIgaXMgZGlzYWJsZWQgb24gbW9iaWxlcy5cbiAgICovXG4gIEBIb3N0QmluZGluZygnYXR0ci50eXBlJylcbiAgZ2V0IGlucHV0VHlwZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiBpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpICYmIHRoaXMuX2RhdGVwaWNrZXJFbmFibGVkU2VydmljZS5pc0VuYWJsZWQgPyAndGV4dCcgOiAnZGF0ZSc7XG4gIH1cblxuICAvL1xuICAvLyBPdXRwdXQgTWFuYWdlbWVudFxuICAvLyBOb3RlOiBGb3Igbm93IHdlIHdpbGwgbm90IGVtaXQgYm90aCBjbHJEYXRlQ2hhbmdlIGFuZCBuZ0NvbnRyb2wgb3V0cHV0c1xuICAvLyBhdCB0aGUgc2FtZSB0aW1lLiBUaGlzIHJlcXVpcmVzIHVzIHRvIGxpc3RlbiB0byBrZXlkb3duIGFuZCBibHVyIGV2ZW50cyB0byBmaWd1cmUgb3V0XG4gIC8vIGV4YWN0bHkgd2hlbiB0aGUgT3V0cHV0IHNob3VsZCBiZSBlbWl0dGVkLlxuICAvLyBPdXIgcmVjb21tZW5kYXRpb24gcmlnaHQgbm93IGlzIHRvIGVpdGhlciB1c2UgY2xyRGF0ZSBvciB1c2UgbmdNb2RlbC9Gb3JtQ29udHJvbC5cbiAgLy8gRG8gbm90IHVzZSBib3RoIG9mIHRoZW0gdG9nZXRoZXIuXG4gIC8vXG5cbiAgQE91dHB1dCgnY2xyRGF0ZUNoYW5nZScpIF9kYXRlVXBkYXRlZDogRXZlbnRFbWl0dGVyPERhdGU+ID0gbmV3IEV2ZW50RW1pdHRlcjxEYXRlPihmYWxzZSk7XG5cbiAgcHJpdmF0ZSBlbWl0RGF0ZU91dHB1dChkYXlNb2RlbDogRGF5TW9kZWwpOiB2b2lkIHtcbiAgICBpZiAoZGF5TW9kZWwgJiYgIWRheU1vZGVsLmlzRXF1YWwodGhpcy5wcmV2aW91c091dHB1dCkpIHtcbiAgICAgIHRoaXMuX2RhdGVVcGRhdGVkLmVtaXQoZGF5TW9kZWwudG9EYXRlKCkpO1xuICAgICAgdGhpcy5wcmV2aW91c091dHB1dCA9IGRheU1vZGVsO1xuICAgIH0gZWxzZSBpZiAoIWRheU1vZGVsICYmIHRoaXMucHJldmlvdXNPdXRwdXQpIHtcbiAgICAgIHRoaXMuX2RhdGVVcGRhdGVkLmVtaXQobnVsbCk7XG4gICAgICB0aGlzLnByZXZpb3VzT3V0cHV0ID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdmb2N1cycpXG4gIHNldEZvY3VzU3RhdGVzKCkge1xuICAgIGlmICh0aGlzLmZvY3VzU2VydmljZSkge1xuICAgICAgdGhpcy5mb2N1c1NlcnZpY2UuZm9jdXNlZCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignYmx1cicpXG4gIHNldEJsdXJTdGF0ZXMoKSB7XG4gICAgaWYgKHRoaXMuaWZFcnJvclNlcnZpY2UpIHtcbiAgICAgIHRoaXMuaWZFcnJvclNlcnZpY2UudHJpZ2dlclN0YXR1c0NoYW5nZSgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5mb2N1c1NlcnZpY2UpIHtcbiAgICAgIHRoaXMuZm9jdXNTZXJ2aWNlLmZvY3VzZWQgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRmlyZXMgdGhpcyBtZXRob2Qgd2hlbiB0aGUgdXNlciBjaGFuZ2VzIHRoZSBpbnB1dCBmb2N1c2VzIG91dCBvZiB0aGUgaW5wdXQgZmllbGQuXG4gICAqL1xuICBASG9zdExpc3RlbmVyKCdjaGFuZ2UnLCBbJyRldmVudC50YXJnZXQnXSlcbiAgb25WYWx1ZUNoYW5nZSh0YXJnZXQ6IEhUTUxJbnB1dEVsZW1lbnQpIHtcbiAgICBjb25zdCB2YWx1ZTogc3RyaW5nID0gdGFyZ2V0LnZhbHVlO1xuICAgIGNvbnN0IGRhdGU6IERhdGUgPSB0aGlzLl9kYXRlSU9TZXJ2aWNlLmlzVmFsaWRJbnB1dCh2YWx1ZSk7XG4gICAgaWYgKGRhdGUpIHtcbiAgICAgIGNvbnN0IGRheU1vZGVsOiBEYXlNb2RlbCA9IG5ldyBEYXlNb2RlbChkYXRlLmdldEZ1bGxZZWFyKCksIGRhdGUuZ2V0TW9udGgoKSwgZGF0ZS5nZXREYXRlKCkpO1xuICAgICAgdGhpcy5fZGF0ZU5hdmlnYXRpb25TZXJ2aWNlLnNlbGVjdGVkRGF5ID0gZGF5TW9kZWw7XG4gICAgICB0aGlzLmVtaXREYXRlT3V0cHV0KGRheU1vZGVsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZGF0ZU5hdmlnYXRpb25TZXJ2aWNlLnNlbGVjdGVkRGF5ID0gbnVsbDtcbiAgICAgIHRoaXMuZW1pdERhdGVPdXRwdXQobnVsbCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgRGF0ZUlPIFN1YnNjcmlwdGlvbnNcbiAgICovXG4gIHByaXZhdGUgaW5pdGlhbGl6ZVN1YnNjcmlwdGlvbnMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2RhdGVOYXZpZ2F0aW9uU2VydmljZSAmJiB0aGlzLl9kYXRlSU9TZXJ2aWNlKSB7XG4gICAgICAvLyBUaGlzIHN1YnNjcmlwdGlvbiBpcyBmaXJlZCB3aGVuIHRoZSB1c2VyIHNlbGVjdHMgYSBkYXRlIGZyb20gdGhlIHBvcG92ZXIuXG4gICAgICB0aGlzLl9zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICAgIHRoaXMuX2RhdGVOYXZpZ2F0aW9uU2VydmljZS5zZWxlY3RlZERheUNoYW5nZS5zdWJzY3JpYmUoKGRheU1vZGVsOiBEYXlNb2RlbCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGRhdGVTdHI6IHN0cmluZyA9IHRoaXMuX2RhdGVJT1NlcnZpY2UudG9Mb2NhbGVEaXNwbGF5Rm9ybWF0U3RyaW5nKGRheU1vZGVsLnRvRGF0ZSgpKTtcbiAgICAgICAgICB0aGlzLndyaXRlRGF0ZVN0clRvSW5wdXRGaWVsZChkYXRlU3RyKTtcbiAgICAgICAgICAvLyBUaGlzIG1ha2VzIHN1cmUgdGhhdCBuZ01vZGVsQ2hhbmdlIGlzIGZpcmVkXG4gICAgICAgICAgLy8gVE9ETzogQ2hlY2sgaWYgdGhlcmUgaXMgYSBiZXR0ZXIgd2F5IHRvIGRvIHRoaXMuXG4gICAgICAgICAgLy8gTk9URTogSXRzIGltcG9ydGFudCB0byB1c2UgTmdDb250cm9sIGFuZCBub3QgTmdNb2RlbCBiZWNhdXNlXG4gICAgICAgICAgLy8gTmdNb2RlbCBvbmx5IHdvcmtzIHdpdGggdGVtcGxhdGUgZHJpdmVuIGZvcm1zXG4gICAgICAgICAgaWYgKHRoaXMuX25nQ29udHJvbCkge1xuICAgICAgICAgICAgdGhpcy5fbmdDb250cm9sLmNvbnRyb2wuc2V0VmFsdWUoZGF0ZVN0cik7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuZW1pdERhdGVPdXRwdXQoZGF5TW9kZWwpO1xuICAgICAgICB9KVxuICAgICAgKTtcblxuICAgICAgLy8gV2UgZG8gbm90IGVtaXQgYW4gT3V0cHV0IGZyb20gdGhpcyBzdWJzY3JpcHRpb24gYmVjYXVzZVxuICAgICAgLy8gd2Ugb25seSBlbWl0IHRoZSBPdXRwdXQgd2hlbiB0aGUgdXNlciBoYXMgZm9jdXNlZCBvdXQgb2YgdGhlIGlucHV0LlxuICAgICAgaWYgKHRoaXMuX25nQ29udHJvbCkge1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICAgICAgdGhpcy5fbmdDb250cm9sLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGU6IERhdGUgPSB0aGlzLl9kYXRlSU9TZXJ2aWNlLmlzVmFsaWRJbnB1dCh2YWx1ZSk7XG4gICAgICAgICAgICBpZiAoZGF0ZSkge1xuICAgICAgICAgICAgICBjb25zdCBkYXlNb2RlbDogRGF5TW9kZWwgPSBuZXcgRGF5TW9kZWwoZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXRlLmdldE1vbnRoKCksIGRhdGUuZ2V0RGF0ZSgpKTtcbiAgICAgICAgICAgICAgdGhpcy5fZGF0ZU5hdmlnYXRpb25TZXJ2aWNlLnNlbGVjdGVkRGF5ID0gZGF5TW9kZWw7XG4gICAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZVByZXZpb3VzT3V0cHV0KGRheU1vZGVsKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZVByZXZpb3VzT3V0cHV0KG51bGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZGF0ZUZvcm1Db250cm9sU2VydmljZSkge1xuICAgICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgICB0aGlzLmRhdGVGb3JtQ29udHJvbFNlcnZpY2UudG91Y2hlZENoYW5nZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLl9uZ0NvbnRyb2wpIHtcbiAgICAgICAgICAgIHRoaXMuX25nQ29udHJvbC5jb250cm9sLm1hcmtBc1RvdWNoZWQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICApO1xuXG4gICAgICB0aGlzLl9zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICAgIHRoaXMuZGF0ZUZvcm1Db250cm9sU2VydmljZS5kaXJ0eUNoYW5nZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLl9uZ0NvbnRyb2wpIHtcbiAgICAgICAgICAgIHRoaXMuX25nQ29udHJvbC5jb250cm9sLm1hcmtBc0RpcnR5KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==