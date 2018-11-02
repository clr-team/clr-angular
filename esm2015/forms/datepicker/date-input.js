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
            controlClassService.initControlClass(this.renderer, this.elRef.nativeElement);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1pbnB1dC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImZvcm1zL2RhdGVwaWNrZXIvZGF0ZS1pbnB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFNQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNwRCxPQUFPLEVBRUwsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osV0FBVyxFQUNYLFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUdMLFFBQVEsRUFDUixNQUFNLEVBQ04sV0FBVyxFQUNYLFNBQVMsRUFDVCxJQUFJLEVBQ0osZ0JBQWdCLEdBQ2pCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUzQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDckUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDaEYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBRTFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRS9ELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUMvRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDNUQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDNUUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDbEYsT0FBTyxFQUFF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TUFBTSxTQUFDLG1CQUFtQjs7OzJCQXJCNUIsS0FBSzttQkF5SEwsS0FBSyxTQUFDLFNBQVM7MEJBcUNmLEtBQUs7OEJBS0wsV0FBVyxTQUFDLGtCQUFrQjt3QkFTOUIsV0FBVyxTQUFDLFdBQVc7MkJBY3ZCLE1BQU0sU0FBQyxlQUFlOzZCQVl0QixZQUFZLFNBQUMsT0FBTzs0QkFPcEIsWUFBWSxTQUFDLE1BQU07NEJBYW5CLFlBQVksU0FBQyxRQUFRLEVBQUUsQ0FBQyxlQUFlLENBQUM7Ozs7Ozs7SUE1T3pDLHNDQUE0Qzs7SUFRNUMscURBQXVEOztJQUN2RCxzQ0FBaUM7O0lBU2pDLG9DQUErQjs7SUFtSC9CLG1DQUFvQzs7SUFDcEMsOENBQXFDOztJQTBDckMsbUNBQTZCOztJQTRCN0Isb0NBQTBGOztJQXZMeEYsaUNBQStDOztJQUUvQyw2QkFBeUI7O0lBQ3pCLGdDQUEyQjs7SUFDM0Isa0NBRTZCOztJQUM3QixzQ0FBaUQ7O0lBQ2pELDhDQUFpRTs7SUFDakUsaURBQXVFOztJQUN2RSw4Q0FBa0U7O0lBQ2xFLGtDQUErQzs7SUFDL0Msd0NBQXNEOztJQUV0RCxvQ0FBOEM7O0lBQzlDLHNDQUFrRDs7SUFDbEQsK0JBQXNDOztJQUN0QyxzQ0FFOEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0QmluZGluZyxcbiAgSG9zdExpc3RlbmVyLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbiAgUExBVEZPUk1fSUQsXG4gIFJlbmRlcmVyMixcbiAgU2VsZixcbiAgVmlld0NvbnRhaW5lclJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ0NvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IElmRXJyb3JTZXJ2aWNlIH0gZnJvbSAnLi4vY29tbW9uL2lmLWVycm9yL2lmLWVycm9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29udHJvbENsYXNzU2VydmljZSB9IGZyb20gJy4uL2NvbW1vbi9wcm92aWRlcnMvY29udHJvbC1jbGFzcy5zZXJ2aWNlJztcbmltcG9ydCB7IEZvY3VzU2VydmljZSB9IGZyb20gJy4uL2NvbW1vbi9wcm92aWRlcnMvZm9jdXMuc2VydmljZSc7XG5pbXBvcnQgeyBOZ0NvbnRyb2xTZXJ2aWNlIH0gZnJvbSAnLi4vY29tbW9uL3Byb3ZpZGVycy9uZy1jb250cm9sLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBXcmFwcGVkRm9ybUNvbnRyb2wgfSBmcm9tICcuLi9jb21tb24vd3JhcHBlZC1jb250cm9sJztcblxuaW1wb3J0IHsgQ2xyRGF0ZUNvbnRhaW5lciB9IGZyb20gJy4vZGF0ZS1jb250YWluZXInO1xuaW1wb3J0IHsgRGF5TW9kZWwgfSBmcm9tICcuL21vZGVsL2RheS5tb2RlbCc7XG5pbXBvcnQgeyBEYXRlRm9ybUNvbnRyb2xTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvZGF0ZS1mb3JtLWNvbnRyb2wuc2VydmljZSc7XG5pbXBvcnQgeyBEYXRlSU9TZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvZGF0ZS1pby5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGVOYXZpZ2F0aW9uU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2RhdGUtbmF2aWdhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGVwaWNrZXJFbmFibGVkU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2RhdGVwaWNrZXItZW5hYmxlZC5zZXJ2aWNlJztcbmltcG9ydCB7IElTX05FV19GT1JNU19MQVlPVVQgfSBmcm9tICcuLi9jb21tb24vcHJvdmlkZXJzL25ldy1mb3Jtcy5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2NsckRhdGVdJyxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuZGF0ZS1pbnB1dF0nOiAnIW5ld0Zvcm1zTGF5b3V0JyxcbiAgICAnW2NsYXNzLmNsci1pbnB1dF0nOiAnbmV3Rm9ybXNMYXlvdXQnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBDbHJEYXRlSW5wdXQgZXh0ZW5kcyBXcmFwcGVkRm9ybUNvbnRyb2w8Q2xyRGF0ZUNvbnRhaW5lcj4gaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIC8qKlxuICAgKiBTdWJzY3JpcHRpb25zIHRvIGFsbCB0aGUgc2VydmljZXMgYW5kIHF1ZXJpZXMgY2hhbmdlc1xuICAgKi9cbiAgcHJpdmF0ZSBfc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICAvL1dlIG5lZWQgdGhpcyB2YXJpYWJsZSBiZWNhdXNlIGlmIHRoZSBkYXRlIGlucHV0IGhhcyBhIHZhbHVlIGluaXRpYWxpemVkXG4gIC8vd2UgZG8gbm90IG91dHB1dCBpdC4gVGhpcyB2YXJpYWJsZSBpcyBmYWxzZSBkdXJpbmcgaW5pdGlhbCBsb2FkLiBXZSBtYWtlIHN1cmUgdGhhdFxuICAvL2R1cmluZyBpbml0aWFsIGxvYWQgZGF5TW9kZWxPdXRwdXR0ZWQgaXMgZXF1YWwgdG8gdGhlIHZhbHVlIGVudGVyZWQgYnkgdGhlIHVzZXIgc28gdGhhdCBpbml0aWFsaXplZFxuICAvL3ZhbHVlIGlzbid0IGVtaXR0ZWQgYmFjayB0byB0aGUgdXNlci4gQWZ0ZXIgaW5pdGlhbCBsb2FkLFxuICAvL3dlIHNldCB0aGlzIHRvIHRydWUgYW5kIHRoZSBkYXlNb2RlbE91dHB1dHRlZCBpcyBzZXQgb25seVxuICAvL3doZW4gdGhlIE91dHB1dCBpcyBlbWl0dGVkIHRvIHRoZSB1c2VyLlxuICBwcml2YXRlIHByZXZpb3VzT3V0cHV0SW5pdGlhbGl6ZWRGbGFnOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgcHJldmlvdXNPdXRwdXQ6IERheU1vZGVsO1xuXG4gIHByaXZhdGUgaW5pdGlhbGl6ZVByZXZpb3VzT3V0cHV0KGRheU1vZGVsOiBEYXlNb2RlbCkge1xuICAgIGlmICghdGhpcy5wcmV2aW91c091dHB1dEluaXRpYWxpemVkRmxhZykge1xuICAgICAgdGhpcy5wcmV2aW91c091dHB1dCA9IGRheU1vZGVsO1xuICAgICAgdGhpcy5wcmV2aW91c091dHB1dEluaXRpYWxpemVkRmxhZyA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgQElucHV0KCkgY2xyTmV3TGF5b3V0OiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgY29udGFpbmVyOiBDbHJEYXRlQ29udGFpbmVyLFxuICAgIHZjcjogVmlld0NvbnRhaW5lclJlZixcbiAgICBwcml2YXRlIGVsUmVmOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBAU2VsZigpXG4gICAgQE9wdGlvbmFsKClcbiAgICBwcml2YXRlIF9uZ0NvbnRyb2w6IE5nQ29udHJvbCxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIF9kYXRlSU9TZXJ2aWNlOiBEYXRlSU9TZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgX2RhdGVOYXZpZ2F0aW9uU2VydmljZTogRGF0ZU5hdmlnYXRpb25TZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgX2RhdGVwaWNrZXJFbmFibGVkU2VydmljZTogRGF0ZXBpY2tlckVuYWJsZWRTZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZGF0ZUZvcm1Db250cm9sU2VydmljZTogRGF0ZUZvcm1Db250cm9sU2VydmljZSxcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IE9iamVjdCxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIG5nQ29udHJvbFNlcnZpY2U6IE5nQ29udHJvbFNlcnZpY2UsXG4gICAgQE9wdGlvbmFsKCkgY29udHJvbENsYXNzU2VydmljZTogQ29udHJvbENsYXNzU2VydmljZSxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGZvY3VzU2VydmljZTogRm9jdXNTZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgaWZFcnJvclNlcnZpY2U6IElmRXJyb3JTZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgY29udHJvbDogTmdDb250cm9sLFxuICAgIEBPcHRpb25hbCgpXG4gICAgQEluamVjdChJU19ORVdfRk9STVNfTEFZT1VUKVxuICAgIHB1YmxpYyBuZXdGb3Jtc0xheW91dDogYm9vbGVhblxuICApIHtcbiAgICBzdXBlcihDbHJEYXRlQ29udGFpbmVyLCB2Y3IsIDQpO1xuXG4gICAgaWYgKGNvbnRyb2xDbGFzc1NlcnZpY2UpIHtcbiAgICAgIGNvbnRyb2xDbGFzc1NlcnZpY2UuaW5pdENvbnRyb2xDbGFzcyh0aGlzLnJlbmRlcmVyLCB0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiAxLiBQb3B1bGF0ZSBzZXJ2aWNlcyBpZiB0aGUgZGF0ZSBjb250YWluZXIgaXMgbm90IHByZXNlbnQuXG4gICAqIDIuIEluaXRpYWxpemUgU3Vic2NyaXB0aW9ucy5cbiAgICogMy4gUHJvY2VzcyBVc2VyIElucHV0LlxuICAgKi9cbiAgbmdPbkluaXQoKSB7XG4gICAgc3VwZXIubmdPbkluaXQoKTtcbiAgICBpZiAodGhpcy5uZ0NvbnRyb2xTZXJ2aWNlICYmIHRoaXMuY29udHJvbCkge1xuICAgICAgdGhpcy5uZ0NvbnRyb2xTZXJ2aWNlLnNldENvbnRyb2wodGhpcy5jb250cm9sKTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLmNvbnRhaW5lcikge1xuICAgICAgdGhpcy5wb3B1bGF0ZUNvbnRhaW5lclNlcnZpY2VzKCk7XG4gICAgfVxuICAgIHRoaXMuaW5pdGlhbGl6ZVN1YnNjcmlwdGlvbnMoKTtcbiAgICB0aGlzLnByb2Nlc3NJbml0aWFsSW5wdXRzKCk7XG4gICAgaWYgKHRoaXMuY2xyTmV3TGF5b3V0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMubmV3Rm9ybXNMYXlvdXQgPSAhIXRoaXMuY2xyTmV3TGF5b3V0O1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQcm9jZXNzIHRoZSBpbnB1dHMgaW5pdGlhbGl6ZWQgYnkgdGhlIHVzZXIgd2hpY2ggd2VyZSBtaXNzZWRcbiAgICogYmVjYXVzZSBvZiBsYXRlIHN1YnNjcmlwdGlvbnMgb3IgbGlmZWN5Y2xlIG1ldGhvZCBjYWxscy5cbiAgICovXG4gIHByaXZhdGUgcHJvY2Vzc0luaXRpYWxJbnB1dHMoKTogdm9pZCB7XG4gICAgdGhpcy5wcm9jZXNzVXNlckRhdGVPYmplY3QodGhpcy5kYXRlVmFsdWVPbkluaXRpYWxMb2FkKTtcblxuICAgIC8vIEhhbmRsZSBJbml0YWwgVmFsdWUgZnJvbSBSZWFjdGl2ZSBGb3Jtc1xuICAgIC8vIFRPRE86IFdlIGFyZSByZXBlYXRpbmcgdGhpcyBsb2dpYyBhdCBtdWx0aXBsZSBwbGFjZXMuIFRoaXMgbWFrZXMgbWUgdGhpbmtcbiAgICAvLyBpZiB0aGlzIGNsYXNzIHNob3VsZCBoYXZlIGltcGxlbWVudGVkIHRoZSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2UuXG4gICAgLy8gV2lsbCBleHBsb3JlIHRoYXQgbGF0ZXIgYW5kIHNlZSBpZiBpdHMgYSBjbGVhbmVyIHNvbHV0aW9uLlxuICAgIGlmICh0aGlzLl9uZ0NvbnRyb2wgJiYgdGhpcy5fbmdDb250cm9sLnZhbHVlKSB7XG4gICAgICB0aGlzLnVwZGF0ZUlucHV0VmFsdWUodGhpcy5fbmdDb250cm9sLnZhbHVlKTtcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZVByZXZpb3VzT3V0cHV0KHRoaXMuX2RhdGVOYXZpZ2F0aW9uU2VydmljZS5zZWxlY3RlZERheSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFdyaXRlIHRoZSBpbml0aWFsIGlucHV0IHNldCBieSB0aGUgdXNlciBvbiB0byB0aGUgaW5wdXQgZmllbGQuXG4gICAqL1xuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgLy8gSSBkb24ndCBrbm93IHdoeSBJIGhhdmUgdG8gZG8gdGhpcyBidXQgYWZ0ZXIgdXNpbmcgdGhlIG5ldyBIb3N0V3JhcHBpbmcgTW9kdWxlIEkgaGF2ZSB0byBkZWxheSB0aGUgcHJvY2Vzc2luZ1xuICAgIC8vIG9mIHRoZSBpbml0aWFsIElucHV0IHNldCBieSB0aGUgdXNlciB0byBoZXJlLiAgSWYgSSBkbyBub3QgMiBpc3N1ZXMgb2NjdXI6XG4gICAgLy8gMS4gdGhlIElucHV0IHNldHRlciBpcyBjYWxsZWQgYmVmb3JlIG5nT25Jbml0LiBuZ09uSW5pdCBpbml0aWFsaXplcyB0aGUgc2VydmljZXMgd2l0aG91dCB3aGljaCB0aGUgc2V0dGVyXG4gICAgLy8gZmFpbHNcbiAgICAvLyAyLiBUaGUgUmVuZGVyZXIgZG9lc24ndCB3b3JrIGJlZm9yZSBuZ0FmdGVyVmlld0luaXRcbiAgICAvLyhJdCB1c2VkIHRvIGJlZm9yZSB0aGUgbmV3IEhvc3RXcmFwcGluZyBNb2R1bGUgZm9yIHNvbWUgcmVhc29uKS5cbiAgICAvLyBJIG5lZWQgdGhlIHJlbmRlcmVyIHRvIHNldCB0aGUgdmFsdWUgcHJvcGVydHkgb24gdGhlIGlucHV0IHRvIG1ha2Ugc3VyZSB0aGF0IGlmIHRoZSB1c2VyIGhhcyBzdXBwbGllZCBhIERhdGVcbiAgICAvLyBpbnB1dCBvYmplY3QsICB3ZSByZWZsZWN0IGl0IHdpdGggdGhlIHJpZ2h0IGRhdGUgb24gdGhlIGlucHV0IGZpZWxkIHVzaW5nIHRoZSBJTyBzZXJ2aWNlLiAgSSBhbSBub3Qgc3VyZSBpZlxuICAgIC8vIHRoZXNlIGFyZSBtYWpvciBpc3N1ZXMgb3Igbm90IGJ1dCBqdXN0IG5vdGluZyB0aGVtIGRvd24gaGVyZS5cbiAgICBpZiAodGhpcy5fZGF0ZU5hdmlnYXRpb25TZXJ2aWNlKSB7XG4gICAgICBjb25zdCBzZWxEYXk6IERheU1vZGVsID0gdGhpcy5fZGF0ZU5hdmlnYXRpb25TZXJ2aWNlLnNlbGVjdGVkRGF5O1xuICAgICAgaWYgKHNlbERheSkge1xuICAgICAgICBjb25zdCBkYXRlU3RyOiBzdHJpbmcgPSB0aGlzLl9kYXRlSU9TZXJ2aWNlLnRvTG9jYWxlRGlzcGxheUZvcm1hdFN0cmluZyhzZWxEYXkudG9EYXRlKCkpO1xuICAgICAgICB0aGlzLndyaXRlRGF0ZVN0clRvSW5wdXRGaWVsZChkYXRlU3RyKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5pbml0aWFsTG9hZCA9IGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFVuc3Vic2NyaWJlcyBmcm9tIHRoZSBzdWJzY3JpcHRpb25zLlxuICAgKi9cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5mb3JFYWNoKChzdWI6IFN1YnNjcmlwdGlvbikgPT4gc3ViLnVuc3Vic2NyaWJlKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBvcHVsYXRlcyB0aGUgc2VydmljZXMgZnJvbSB0aGUgY29udGFpbmVyIGNvbXBvbmVudC5cbiAgICovXG4gIHByaXZhdGUgcG9wdWxhdGVDb250YWluZXJTZXJ2aWNlcygpOiB2b2lkIHtcbiAgICB0aGlzLl9kYXRlSU9TZXJ2aWNlID0gdGhpcy5nZXRQcm92aWRlckZyb21Db250YWluZXIoRGF0ZUlPU2VydmljZSk7XG4gICAgdGhpcy5fZGF0ZU5hdmlnYXRpb25TZXJ2aWNlID0gdGhpcy5nZXRQcm92aWRlckZyb21Db250YWluZXIoRGF0ZU5hdmlnYXRpb25TZXJ2aWNlKTtcbiAgICB0aGlzLl9kYXRlcGlja2VyRW5hYmxlZFNlcnZpY2UgPSB0aGlzLmdldFByb3ZpZGVyRnJvbUNvbnRhaW5lcihEYXRlcGlja2VyRW5hYmxlZFNlcnZpY2UpO1xuICAgIHRoaXMuZGF0ZUZvcm1Db250cm9sU2VydmljZSA9IHRoaXMuZ2V0UHJvdmlkZXJGcm9tQ29udGFpbmVyKERhdGVGb3JtQ29udHJvbFNlcnZpY2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIFdyaXRlcyB0aGUgZGF0ZSBzdHJpbmcgdmFsdWUgdG8gdGhlIGlucHV0IGZpZWxkXG4gICAqL1xuICBwcml2YXRlIHdyaXRlRGF0ZVN0clRvSW5wdXRGaWVsZCh2YWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICd2YWx1ZScsIHZhbHVlKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdGlhbExvYWQ6IGJvb2xlYW4gPSB0cnVlO1xuICBwcml2YXRlIGRhdGVWYWx1ZU9uSW5pdGlhbExvYWQ6IERhdGU7XG5cbiAgLyoqXG4gICAqIEphdmFzY3JpcHQgRGF0ZSBvYmplY3QgaW5wdXQgc2V0IGJ5IHRoZSB1c2VyLlxuICAgKi9cbiAgQElucHV0KCdjbHJEYXRlJylcbiAgc2V0IGRhdGUodmFsdWU6IERhdGUpIHtcbiAgICBpZiAodGhpcy5pbml0aWFsTG9hZCkge1xuICAgICAgLy8gU3RvcmUgZGF0ZSB2YWx1ZSBwYXNzZWQgYnkgdGhlIHVzZXIgdG8gcHJvY2VzcyBhZnRlciB0aGUgc2VydmljZXMgaGF2ZSBiZWVuIGluaXRpYWxpemVkIGJ5XG4gICAgICAvLyB0aGUgbmdPbkluaXQgaG9vay5cbiAgICAgIHRoaXMuZGF0ZVZhbHVlT25Jbml0aWFsTG9hZCA9IHZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnByb2Nlc3NVc2VyRGF0ZU9iamVjdCh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFByb2Nlc3NlcyBhIGRhdGUgb2JqZWN0IHRvIGNoZWNrIGlmIGl0cyB2YWxpZCBvciBub3QuXG4gICAqL1xuICBwcml2YXRlIHByb2Nlc3NVc2VyRGF0ZU9iamVjdCh2YWx1ZTogRGF0ZSkge1xuICAgIGlmICh0aGlzLl9kYXRlSU9TZXJ2aWNlKSB7XG4gICAgICAvLyBUaGUgZGF0ZSBvYmplY3QgaXMgY29udmVydGVkIGJhY2sgdG8gc3RyaW5nIGJlY2F1c2UgaW4gSmF2YXNjcmlwdCB5b3UgY2FuIGNyZWF0ZSBhIGRhdGUgb2JqZWN0XG4gICAgICAvLyBsaWtlIHRoaXM6IG5ldyBEYXRlKFwiVGVzdFwiKS4gVGhpcyBpcyBhIGRhdGUgb2JqZWN0IGJ1dCBpdCBpcyBpbnZhbGlkLiBDb252ZXJ0aW5nIHRoZSBkYXRlIG9iamVjdFxuICAgICAgLy8gdGhhdCB0aGUgdXNlciBwYXNzZWQgaGVscHMgdXMgdG8gdmVyaWZ5IHRoZSB2YWxpZGl0eSBvZiB0aGUgZGF0ZSBvYmplY3QuXG4gICAgICBjb25zdCBkYXRlU3RyOiBzdHJpbmcgPSB0aGlzLl9kYXRlSU9TZXJ2aWNlLnRvTG9jYWxlRGlzcGxheUZvcm1hdFN0cmluZyh2YWx1ZSk7XG4gICAgICB0aGlzLnVwZGF0ZUlucHV0VmFsdWUoZGF0ZVN0cik7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVJbnB1dFZhbHVlKGRhdGVTdHI6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IGRhdGU6IERhdGUgPSB0aGlzLl9kYXRlSU9TZXJ2aWNlLmlzVmFsaWRJbnB1dChkYXRlU3RyKTtcbiAgICBpZiAoZGF0ZSkge1xuICAgICAgY29uc3QgZGF5TW9kZWw6IERheU1vZGVsID0gbmV3IERheU1vZGVsKGRhdGUuZ2V0RnVsbFllYXIoKSwgZGF0ZS5nZXRNb250aCgpLCBkYXRlLmdldERhdGUoKSk7XG4gICAgICBpZiAoIWRheU1vZGVsLmlzRXF1YWwodGhpcy5fZGF0ZU5hdmlnYXRpb25TZXJ2aWNlLnNlbGVjdGVkRGF5KSkge1xuICAgICAgICB0aGlzLl9kYXRlTmF2aWdhdGlvblNlcnZpY2Uuc2VsZWN0ZWREYXkgPSBkYXlNb2RlbDtcbiAgICAgICAgdGhpcy53cml0ZURhdGVTdHJUb0lucHV0RmllbGQoZGF0ZVN0cik7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2RhdGVOYXZpZ2F0aW9uU2VydmljZS5zZWxlY3RlZERheSA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZztcblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgZGF0ZSBmb3JtYXQgZm9yIHRoZSBwbGFjZWhvbGRlciBhY2NvcmRpbmcgdG8gd2hpY2ggdGhlIGlucHV0IHNob3VsZCBiZSBlbnRlcmVkIGJ5IHRoZSB1c2VyLlxuICAgKi9cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLnBsYWNlaG9sZGVyJylcbiAgZ2V0IHBsYWNlaG9sZGVyVGV4dCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnBsYWNlaG9sZGVyID8gdGhpcy5wbGFjZWhvbGRlciA6IHRoaXMuX2RhdGVJT1NlcnZpY2UucGxhY2Vob2xkZXJUZXh0O1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGlucHV0IHR5cGUgdG8gdGV4dCB3aGVuIHRoZSBkYXRlcGlja2VyIGlzIGVuYWJsZWQuIFJldmVydHMgYmFjayB0byB0aGUgbmF0aXZlIGRhdGUgaW5wdXRcbiAgICogd2hlbiB0aGUgZGF0ZXBpY2tlciBpcyBkaXNhYmxlZC4gRGF0ZXBpY2tlciBpcyBkaXNhYmxlZCBvbiBtb2JpbGVzLlxuICAgKi9cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLnR5cGUnKVxuICBnZXQgaW5wdXRUeXBlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkgJiYgdGhpcy5fZGF0ZXBpY2tlckVuYWJsZWRTZXJ2aWNlLmlzRW5hYmxlZCA/ICd0ZXh0JyA6ICdkYXRlJztcbiAgfVxuXG4gIC8vXG4gIC8vIE91dHB1dCBNYW5hZ2VtZW50XG4gIC8vIE5vdGU6IEZvciBub3cgd2Ugd2lsbCBub3QgZW1pdCBib3RoIGNsckRhdGVDaGFuZ2UgYW5kIG5nQ29udHJvbCBvdXRwdXRzXG4gIC8vIGF0IHRoZSBzYW1lIHRpbWUuIFRoaXMgcmVxdWlyZXMgdXMgdG8gbGlzdGVuIHRvIGtleWRvd24gYW5kIGJsdXIgZXZlbnRzIHRvIGZpZ3VyZSBvdXRcbiAgLy8gZXhhY3RseSB3aGVuIHRoZSBPdXRwdXQgc2hvdWxkIGJlIGVtaXR0ZWQuXG4gIC8vIE91ciByZWNvbW1lbmRhdGlvbiByaWdodCBub3cgaXMgdG8gZWl0aGVyIHVzZSBjbHJEYXRlIG9yIHVzZSBuZ01vZGVsL0Zvcm1Db250cm9sLlxuICAvLyBEbyBub3QgdXNlIGJvdGggb2YgdGhlbSB0b2dldGhlci5cbiAgLy9cblxuICBAT3V0cHV0KCdjbHJEYXRlQ2hhbmdlJykgX2RhdGVVcGRhdGVkOiBFdmVudEVtaXR0ZXI8RGF0ZT4gPSBuZXcgRXZlbnRFbWl0dGVyPERhdGU+KGZhbHNlKTtcblxuICBwcml2YXRlIGVtaXREYXRlT3V0cHV0KGRheU1vZGVsOiBEYXlNb2RlbCk6IHZvaWQge1xuICAgIGlmIChkYXlNb2RlbCAmJiAhZGF5TW9kZWwuaXNFcXVhbCh0aGlzLnByZXZpb3VzT3V0cHV0KSkge1xuICAgICAgdGhpcy5fZGF0ZVVwZGF0ZWQuZW1pdChkYXlNb2RlbC50b0RhdGUoKSk7XG4gICAgICB0aGlzLnByZXZpb3VzT3V0cHV0ID0gZGF5TW9kZWw7XG4gICAgfSBlbHNlIGlmICghZGF5TW9kZWwgJiYgdGhpcy5wcmV2aW91c091dHB1dCkge1xuICAgICAgdGhpcy5fZGF0ZVVwZGF0ZWQuZW1pdChudWxsKTtcbiAgICAgIHRoaXMucHJldmlvdXNPdXRwdXQgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2ZvY3VzJylcbiAgc2V0Rm9jdXNTdGF0ZXMoKSB7XG4gICAgaWYgKHRoaXMuZm9jdXNTZXJ2aWNlKSB7XG4gICAgICB0aGlzLmZvY3VzU2VydmljZS5mb2N1c2VkID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdibHVyJylcbiAgc2V0Qmx1clN0YXRlcygpIHtcbiAgICBpZiAodGhpcy5pZkVycm9yU2VydmljZSkge1xuICAgICAgdGhpcy5pZkVycm9yU2VydmljZS50cmlnZ2VyU3RhdHVzQ2hhbmdlKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLmZvY3VzU2VydmljZSkge1xuICAgICAgdGhpcy5mb2N1c1NlcnZpY2UuZm9jdXNlZCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBGaXJlcyB0aGlzIG1ldGhvZCB3aGVuIHRoZSB1c2VyIGNoYW5nZXMgdGhlIGlucHV0IGZvY3VzZXMgb3V0IG9mIHRoZSBpbnB1dCBmaWVsZC5cbiAgICovXG4gIEBIb3N0TGlzdGVuZXIoJ2NoYW5nZScsIFsnJGV2ZW50LnRhcmdldCddKVxuICBvblZhbHVlQ2hhbmdlKHRhcmdldDogSFRNTElucHV0RWxlbWVudCkge1xuICAgIGNvbnN0IHZhbHVlOiBzdHJpbmcgPSB0YXJnZXQudmFsdWU7XG4gICAgY29uc3QgZGF0ZTogRGF0ZSA9IHRoaXMuX2RhdGVJT1NlcnZpY2UuaXNWYWxpZElucHV0KHZhbHVlKTtcbiAgICBpZiAoZGF0ZSkge1xuICAgICAgY29uc3QgZGF5TW9kZWw6IERheU1vZGVsID0gbmV3IERheU1vZGVsKGRhdGUuZ2V0RnVsbFllYXIoKSwgZGF0ZS5nZXRNb250aCgpLCBkYXRlLmdldERhdGUoKSk7XG4gICAgICB0aGlzLl9kYXRlTmF2aWdhdGlvblNlcnZpY2Uuc2VsZWN0ZWREYXkgPSBkYXlNb2RlbDtcbiAgICAgIHRoaXMuZW1pdERhdGVPdXRwdXQoZGF5TW9kZWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9kYXRlTmF2aWdhdGlvblNlcnZpY2Uuc2VsZWN0ZWREYXkgPSBudWxsO1xuICAgICAgdGhpcy5lbWl0RGF0ZU91dHB1dChudWxsKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSBEYXRlSU8gU3Vic2NyaXB0aW9uc1xuICAgKi9cbiAgcHJpdmF0ZSBpbml0aWFsaXplU3Vic2NyaXB0aW9ucygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fZGF0ZU5hdmlnYXRpb25TZXJ2aWNlICYmIHRoaXMuX2RhdGVJT1NlcnZpY2UpIHtcbiAgICAgIC8vIFRoaXMgc3Vic2NyaXB0aW9uIGlzIGZpcmVkIHdoZW4gdGhlIHVzZXIgc2VsZWN0cyBhIGRhdGUgZnJvbSB0aGUgcG9wb3Zlci5cbiAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgICAgdGhpcy5fZGF0ZU5hdmlnYXRpb25TZXJ2aWNlLnNlbGVjdGVkRGF5Q2hhbmdlLnN1YnNjcmliZSgoZGF5TW9kZWw6IERheU1vZGVsKSA9PiB7XG4gICAgICAgICAgY29uc3QgZGF0ZVN0cjogc3RyaW5nID0gdGhpcy5fZGF0ZUlPU2VydmljZS50b0xvY2FsZURpc3BsYXlGb3JtYXRTdHJpbmcoZGF5TW9kZWwudG9EYXRlKCkpO1xuICAgICAgICAgIHRoaXMud3JpdGVEYXRlU3RyVG9JbnB1dEZpZWxkKGRhdGVTdHIpO1xuICAgICAgICAgIC8vIFRoaXMgbWFrZXMgc3VyZSB0aGF0IG5nTW9kZWxDaGFuZ2UgaXMgZmlyZWRcbiAgICAgICAgICAvLyBUT0RPOiBDaGVjayBpZiB0aGVyZSBpcyBhIGJldHRlciB3YXkgdG8gZG8gdGhpcy5cbiAgICAgICAgICAvLyBOT1RFOiBJdHMgaW1wb3J0YW50IHRvIHVzZSBOZ0NvbnRyb2wgYW5kIG5vdCBOZ01vZGVsIGJlY2F1c2VcbiAgICAgICAgICAvLyBOZ01vZGVsIG9ubHkgd29ya3Mgd2l0aCB0ZW1wbGF0ZSBkcml2ZW4gZm9ybXNcbiAgICAgICAgICBpZiAodGhpcy5fbmdDb250cm9sKSB7XG4gICAgICAgICAgICB0aGlzLl9uZ0NvbnRyb2wuY29udHJvbC5zZXRWYWx1ZShkYXRlU3RyKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5lbWl0RGF0ZU91dHB1dChkYXlNb2RlbCk7XG4gICAgICAgIH0pXG4gICAgICApO1xuXG4gICAgICAvLyBXZSBkbyBub3QgZW1pdCBhbiBPdXRwdXQgZnJvbSB0aGlzIHN1YnNjcmlwdGlvbiBiZWNhdXNlXG4gICAgICAvLyB3ZSBvbmx5IGVtaXQgdGhlIE91dHB1dCB3aGVuIHRoZSB1c2VyIGhhcyBmb2N1c2VkIG91dCBvZiB0aGUgaW5wdXQuXG4gICAgICBpZiAodGhpcy5fbmdDb250cm9sKSB7XG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgICAgICB0aGlzLl9uZ0NvbnRyb2wudmFsdWVDaGFuZ2VzLnN1YnNjcmliZSgodmFsdWU6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgY29uc3QgZGF0ZTogRGF0ZSA9IHRoaXMuX2RhdGVJT1NlcnZpY2UuaXNWYWxpZElucHV0KHZhbHVlKTtcbiAgICAgICAgICAgIGlmIChkYXRlKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGRheU1vZGVsOiBEYXlNb2RlbCA9IG5ldyBEYXlNb2RlbChkYXRlLmdldEZ1bGxZZWFyKCksIGRhdGUuZ2V0TW9udGgoKSwgZGF0ZS5nZXREYXRlKCkpO1xuICAgICAgICAgICAgICB0aGlzLl9kYXRlTmF2aWdhdGlvblNlcnZpY2Uuc2VsZWN0ZWREYXkgPSBkYXlNb2RlbDtcbiAgICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplUHJldmlvdXNPdXRwdXQoZGF5TW9kZWwpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gJycgfHwgdmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgdGhpcy5fZGF0ZU5hdmlnYXRpb25TZXJ2aWNlLnNlbGVjdGVkRGF5ID0gbnVsbDtcbiAgICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplUHJldmlvdXNPdXRwdXQobnVsbCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLmluaXRpYWxpemVQcmV2aW91c091dHB1dChudWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLmRhdGVGb3JtQ29udHJvbFNlcnZpY2UpIHtcbiAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgICAgdGhpcy5kYXRlRm9ybUNvbnRyb2xTZXJ2aWNlLnRvdWNoZWRDaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5fbmdDb250cm9sKSB7XG4gICAgICAgICAgICB0aGlzLl9uZ0NvbnRyb2wuY29udHJvbC5tYXJrQXNUb3VjaGVkKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgKTtcblxuICAgICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgICB0aGlzLmRhdGVGb3JtQ29udHJvbFNlcnZpY2UuZGlydHlDaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5fbmdDb250cm9sKSB7XG4gICAgICAgICAgICB0aGlzLl9uZ0NvbnRyb2wuY29udHJvbC5tYXJrQXNEaXJ0eSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfVxuICB9XG59XG4iXX0=