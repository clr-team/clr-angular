/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var ClrDateInput = /** @class */ (function (_super) {
    tslib_1.__extends(ClrDateInput, _super);
    function ClrDateInput(vcr, injector, el, renderer, control, container, _dateIOService, _dateNavigationService, _datepickerEnabledService, dateFormControlService, platformId, focusService, newFormsLayout) {
        var _this = _super.call(this, vcr, ClrDateContainer, injector, control, renderer, el) || this;
        _this.el = el;
        _this.renderer = renderer;
        _this.control = control;
        _this.container = container;
        _this._dateIOService = _dateIOService;
        _this._dateNavigationService = _dateNavigationService;
        _this._datepickerEnabledService = _datepickerEnabledService;
        _this.dateFormControlService = dateFormControlService;
        _this.platformId = platformId;
        _this.focusService = focusService;
        _this.newFormsLayout = newFormsLayout;
        _this.index = 4;
        //We need this variable because if the date input has a value initialized
        //we do not output it. This variable is false during initial load. We make sure that
        //during initial load dayModelOutputted is equal to the value entered by the user so that initialized
        //value isn't emitted back to the user. After initial load,
        //we set this to true and the dayModelOutputted is set only
        //when the Output is emitted to the user.
        _this.previousOutputInitializedFlag = false;
        _this.initialLoad = true;
        //
        // Output Management
        // Note: For now we will not emit both clrDateChange and ngControl outputs
        // at the same time. This requires us to listen to keydown and blur events to figure out
        // exactly when the Output should be emitted.
        // Our recommendation right now is to either use clrDate or use ngModel/FormControl.
        // Do not use both of them together.
        //
        _this._dateUpdated = new EventEmitter(false);
        return _this;
    }
    /**
     * @param {?} dayModel
     * @return {?}
     */
    ClrDateInput.prototype.initializePreviousOutput = /**
     * @param {?} dayModel
     * @return {?}
     */
    function (dayModel) {
        if (!this.previousOutputInitializedFlag) {
            this.previousOutput = dayModel;
            this.previousOutputInitializedFlag = true;
        }
    };
    /**
     * 1. Populate services if the date container is not present.
     * 2. Initialize Subscriptions.
     * 3. Process User Input.
     */
    /**
     * 1. Populate services if the date container is not present.
     * 2. Initialize Subscriptions.
     * 3. Process User Input.
     * @return {?}
     */
    ClrDateInput.prototype.ngOnInit = /**
     * 1. Populate services if the date container is not present.
     * 2. Initialize Subscriptions.
     * 3. Process User Input.
     * @return {?}
     */
    function () {
        _super.prototype.ngOnInit.call(this);
        if (!this.container) {
            this.populateContainerServices();
        }
        this.initializeSubscriptions();
        this.processInitialInputs();
        if (this.clrNewLayout !== undefined) {
            this.newFormsLayout = !!this.clrNewLayout;
        }
    };
    /**
     * Process the inputs initialized by the user which were missed
     * because of late subscriptions or lifecycle method calls.
     */
    /**
     * Process the inputs initialized by the user which were missed
     * because of late subscriptions or lifecycle method calls.
     * @return {?}
     */
    ClrDateInput.prototype.processInitialInputs = /**
     * Process the inputs initialized by the user which were missed
     * because of late subscriptions or lifecycle method calls.
     * @return {?}
     */
    function () {
        this.processUserDateObject(this.dateValueOnInitialLoad);
        // Handle Inital Value from Reactive Forms
        // TODO: We are repeating this logic at multiple places. This makes me think
        // if this class should have implemented the ControlValueAccessor interface.
        // Will explore that later and see if its a cleaner solution.
        if (this.control && this.control.value) {
            this.updateInputValue(this.control.value);
            this.initializePreviousOutput(this._dateNavigationService.selectedDay);
        }
    };
    /**
     * Write the initial input set by the user on to the input field.
     */
    /**
     * Write the initial input set by the user on to the input field.
     * @return {?}
     */
    ClrDateInput.prototype.ngAfterViewInit = /**
     * Write the initial input set by the user on to the input field.
     * @return {?}
     */
    function () {
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
            var selDay = this._dateNavigationService.selectedDay;
            if (selDay) {
                /** @type {?} */
                var dateStr = this._dateIOService.toLocaleDisplayFormatString(selDay.toDate());
                this.writeDateStrToInputField(dateStr);
            }
        }
        this.initialLoad = false;
    };
    /**
     * Populates the services from the container component.
     */
    /**
     * Populates the services from the container component.
     * @return {?}
     */
    ClrDateInput.prototype.populateContainerServices = /**
     * Populates the services from the container component.
     * @return {?}
     */
    function () {
        this._dateIOService = this.getProviderFromContainer(DateIOService);
        this._dateNavigationService = this.getProviderFromContainer(DateNavigationService);
        this._datepickerEnabledService = this.getProviderFromContainer(DatepickerEnabledService);
        this.dateFormControlService = this.getProviderFromContainer(DateFormControlService);
    };
    /**
     * Writes the date string value to the input field
     */
    /**
     * Writes the date string value to the input field
     * @param {?} value
     * @return {?}
     */
    ClrDateInput.prototype.writeDateStrToInputField = /**
     * Writes the date string value to the input field
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.renderer.setProperty(this.el.nativeElement, 'value', value);
    };
    Object.defineProperty(ClrDateInput.prototype, "date", {
        /**
         * Javascript Date object input set by the user.
         */
        set: /**
         * Javascript Date object input set by the user.
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (this.initialLoad) {
                // Store date value passed by the user to process after the services have been initialized by
                // the ngOnInit hook.
                this.dateValueOnInitialLoad = value;
            }
            else {
                this.processUserDateObject(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Processes a date object to check if its valid or not.
     */
    /**
     * Processes a date object to check if its valid or not.
     * @param {?} value
     * @return {?}
     */
    ClrDateInput.prototype.processUserDateObject = /**
     * Processes a date object to check if its valid or not.
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (this._dateIOService) {
            // The date object is converted back to string because in Javascript you can create a date object
            // like this: new Date("Test"). This is a date object but it is invalid. Converting the date object
            // that the user passed helps us to verify the validity of the date object.
            /** @type {?} */
            var dateStr = this._dateIOService.toLocaleDisplayFormatString(value);
            this.updateInputValue(dateStr);
        }
    };
    /**
     * @param {?} dateStr
     * @return {?}
     */
    ClrDateInput.prototype.updateInputValue = /**
     * @param {?} dateStr
     * @return {?}
     */
    function (dateStr) {
        /** @type {?} */
        var date = this._dateIOService.isValidInput(dateStr);
        if (date) {
            /** @type {?} */
            var dayModel = new DayModel(date.getFullYear(), date.getMonth(), date.getDate());
            if (!dayModel.isEqual(this._dateNavigationService.selectedDay)) {
                this._dateNavigationService.selectedDay = dayModel;
                this.writeDateStrToInputField(dateStr);
            }
        }
        else {
            this._dateNavigationService.selectedDay = null;
        }
    };
    Object.defineProperty(ClrDateInput.prototype, "placeholderText", {
        /**
         * Returns the date format for the placeholder according to which the input should be entered by the user.
         */
        get: /**
         * Returns the date format for the placeholder according to which the input should be entered by the user.
         * @return {?}
         */
        function () {
            return this.placeholder ? this.placeholder : this._dateIOService.placeholderText;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDateInput.prototype, "inputType", {
        /**
         * Sets the input type to text when the datepicker is enabled. Reverts back to the native date input
         * when the datepicker is disabled. Datepicker is disabled on mobiles.
         */
        get: /**
         * Sets the input type to text when the datepicker is enabled. Reverts back to the native date input
         * when the datepicker is disabled. Datepicker is disabled on mobiles.
         * @return {?}
         */
        function () {
            return isPlatformBrowser(this.platformId) && this._datepickerEnabledService.isEnabled ? 'text' : 'date';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} dayModel
     * @return {?}
     */
    ClrDateInput.prototype.emitDateOutput = /**
     * @param {?} dayModel
     * @return {?}
     */
    function (dayModel) {
        if (dayModel && !dayModel.isEqual(this.previousOutput)) {
            this._dateUpdated.emit(dayModel.toDate());
            this.previousOutput = dayModel;
        }
        else if (!dayModel && this.previousOutput) {
            this._dateUpdated.emit(null);
            this.previousOutput = null;
        }
    };
    /**
     * @return {?}
     */
    ClrDateInput.prototype.setFocusStates = /**
     * @return {?}
     */
    function () {
        if (this.focusService) {
            this.focusService.focused = true;
        }
    };
    /**
     * @return {?}
     */
    ClrDateInput.prototype.triggerValidation = /**
     * @return {?}
     */
    function () {
        _super.prototype.triggerValidation.call(this);
        if (this.focusService) {
            this.focusService.focused = false;
        }
    };
    /**
     * Fires this method when the user changes the input focuses out of the input field.
     */
    /**
     * Fires this method when the user changes the input focuses out of the input field.
     * @param {?} target
     * @return {?}
     */
    ClrDateInput.prototype.onValueChange = /**
     * Fires this method when the user changes the input focuses out of the input field.
     * @param {?} target
     * @return {?}
     */
    function (target) {
        /** @type {?} */
        var value = target.value;
        /** @type {?} */
        var date = this._dateIOService.isValidInput(value);
        if (date) {
            /** @type {?} */
            var dayModel = new DayModel(date.getFullYear(), date.getMonth(), date.getDate());
            this._dateNavigationService.selectedDay = dayModel;
            this.emitDateOutput(dayModel);
        }
        else {
            this._dateNavigationService.selectedDay = null;
            this.emitDateOutput(null);
        }
    };
    /**
     * Initialize DateIO Subscriptions
     */
    /**
     * Initialize DateIO Subscriptions
     * @return {?}
     */
    ClrDateInput.prototype.initializeSubscriptions = /**
     * Initialize DateIO Subscriptions
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._dateNavigationService && this._dateIOService) {
            // This subscription is fired when the user selects a date from the popover.
            this.subscriptions.push(this._dateNavigationService.selectedDayChange.subscribe(function (dayModel) {
                /** @type {?} */
                var dateStr = _this._dateIOService.toLocaleDisplayFormatString(dayModel.toDate());
                _this.writeDateStrToInputField(dateStr);
                // This makes sure that ngModelChange is fired
                // TODO: Check if there is a better way to do this.
                // NOTE: Its important to use NgControl and not NgModel because
                // NgModel only works with template driven forms
                if (_this.control) {
                    _this.control.control.setValue(dateStr);
                }
                _this.emitDateOutput(dayModel);
            }));
            // We do not emit an Output from this subscription because
            // we only emit the Output when the user has focused out of the input.
            if (this.control) {
                this.subscriptions.push(this.control.valueChanges.subscribe(function (value) {
                    /** @type {?} */
                    var date = _this._dateIOService.isValidInput(value);
                    if (date) {
                        /** @type {?} */
                        var dayModel = new DayModel(date.getFullYear(), date.getMonth(), date.getDate());
                        _this._dateNavigationService.selectedDay = dayModel;
                        _this.initializePreviousOutput(dayModel);
                    }
                    else if (value === '' || value === null) {
                        _this._dateNavigationService.selectedDay = null;
                        _this.initializePreviousOutput(null);
                    }
                    else {
                        _this.initializePreviousOutput(null);
                    }
                }));
            }
        }
        if (this.dateFormControlService) {
            this.subscriptions.push(this.dateFormControlService.touchedChange.subscribe(function () {
                if (_this.control) {
                    _this.control.control.markAsTouched();
                }
            }));
            this.subscriptions.push(this.dateFormControlService.dirtyChange.subscribe(function () {
                if (_this.control) {
                    _this.control.control.markAsDirty();
                }
            }));
        }
    };
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
    ClrDateInput.ctorParameters = function () { return [
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
    ]; };
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
    return ClrDateInput;
}(WrappedFormControl));
export { ClrDateInput };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1pbnB1dC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImZvcm1zL2RhdGVwaWNrZXIvZGF0ZS1pbnB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBTUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDcEQsT0FBTyxFQUVMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFdBQVcsRUFDWCxZQUFZLEVBQ1osTUFBTSxFQUNOLFFBQVEsRUFDUixLQUFLLEVBR0wsUUFBUSxFQUNSLE1BQU0sRUFDTixXQUFXLEVBQ1gsU0FBUyxFQUNULElBQUksRUFDSixnQkFBZ0IsR0FDakIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUVqRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUUvRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDN0MsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDL0UsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzVELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzVFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBRTVFO0lBT2tDLHdDQUFvQztJQXFCcEUsc0JBQ0UsR0FBcUIsRUFDckIsUUFBa0IsRUFDUixFQUFjLEVBQ2QsUUFBbUIsRUFHbkIsT0FBa0IsRUFDUixTQUEyQixFQUMzQixjQUE2QixFQUM3QixzQkFBNkMsRUFDN0MseUJBQW1ELEVBQ25ELHNCQUE4QyxFQUNyQyxVQUFrQixFQUMzQixZQUEwQixFQUd2QyxjQUF1QjtRQWpCaEMsWUFtQkUsa0JBQU0sR0FBRyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEVBQUUsQ0FBQyxTQUM5RDtRQWpCVyxRQUFFLEdBQUYsRUFBRSxDQUFZO1FBQ2QsY0FBUSxHQUFSLFFBQVEsQ0FBVztRQUduQixhQUFPLEdBQVAsT0FBTyxDQUFXO1FBQ1IsZUFBUyxHQUFULFNBQVMsQ0FBa0I7UUFDM0Isb0JBQWMsR0FBZCxjQUFjLENBQWU7UUFDN0IsNEJBQXNCLEdBQXRCLHNCQUFzQixDQUF1QjtRQUM3QywrQkFBeUIsR0FBekIseUJBQXlCLENBQTBCO1FBQ25ELDRCQUFzQixHQUF0QixzQkFBc0IsQ0FBd0I7UUFDckMsZ0JBQVUsR0FBVixVQUFVLENBQVE7UUFDM0Isa0JBQVksR0FBWixZQUFZLENBQWM7UUFHdkMsb0JBQWMsR0FBZCxjQUFjLENBQVM7UUFyQ3RCLFdBQUssR0FBRyxDQUFDLENBQUM7Ozs7Ozs7UUFRWixtQ0FBNkIsR0FBWSxLQUFLLENBQUM7UUE0Ry9DLGlCQUFXLEdBQVksSUFBSSxDQUFDOzs7Ozs7Ozs7UUF1RVgsa0JBQVksR0FBdUIsSUFBSSxZQUFZLENBQU8sS0FBSyxDQUFDLENBQUM7O0lBbkoxRixDQUFDOzs7OztJQTdCTywrQ0FBd0I7Ozs7SUFBaEMsVUFBaUMsUUFBa0I7UUFDakQsSUFBSSxDQUFDLElBQUksQ0FBQyw2QkFBNkIsRUFBRTtZQUN2QyxJQUFJLENBQUMsY0FBYyxHQUFHLFFBQVEsQ0FBQztZQUMvQixJQUFJLENBQUMsNkJBQTZCLEdBQUcsSUFBSSxDQUFDO1NBQzNDO0lBQ0gsQ0FBQztJQTBCRDs7OztPQUlHOzs7Ozs7O0lBQ0gsK0JBQVE7Ozs7OztJQUFSO1FBQ0UsaUJBQU0sUUFBUSxXQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbkIsSUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUM7U0FDbEM7UUFDRCxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUM1QixJQUFJLElBQUksQ0FBQyxZQUFZLEtBQUssU0FBUyxFQUFFO1lBQ25DLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7U0FDM0M7SUFDSCxDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7SUFDSywyQ0FBb0I7Ozs7O0lBQTVCO1FBQ0UsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBRXhELDBDQUEwQztRQUMxQyw0RUFBNEU7UUFDNUUsNEVBQTRFO1FBQzVFLDZEQUE2RDtRQUM3RCxJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUU7WUFDdEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDMUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUN4RTtJQUNILENBQUM7SUFFRDs7T0FFRzs7Ozs7SUFDSCxzQ0FBZTs7OztJQUFmO1FBQ0UsZ0hBQWdIO1FBQ2hILDZFQUE2RTtRQUM3RSw0R0FBNEc7UUFDNUcsUUFBUTtRQUNSLHNEQUFzRDtRQUN0RCxrRUFBa0U7UUFDbEUsK0dBQStHO1FBQy9HLDhHQUE4RztRQUM5RyxnRUFBZ0U7UUFDaEUsSUFBSSxJQUFJLENBQUMsc0JBQXNCLEVBQUU7O2dCQUN6QixNQUFNLEdBQWEsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFdBQVc7WUFDaEUsSUFBSSxNQUFNLEVBQUU7O29CQUNKLE9BQU8sR0FBVyxJQUFJLENBQUMsY0FBYyxDQUFDLDJCQUEyQixDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDeEYsSUFBSSxDQUFDLHdCQUF3QixDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3hDO1NBQ0Y7UUFDRCxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztJQUMzQixDQUFDO0lBRUQ7O09BRUc7Ozs7O0lBQ0ssZ0RBQXlCOzs7O0lBQWpDO1FBQ0UsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDbkUsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ25GLElBQUksQ0FBQyx5QkFBeUIsR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsd0JBQXdCLENBQUMsQ0FBQztRQUN6RixJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLHNCQUFzQixDQUFDLENBQUM7SUFDdEYsQ0FBQztJQUVEOztPQUVHOzs7Ozs7SUFDSywrQ0FBd0I7Ozs7O0lBQWhDLFVBQWlDLEtBQWE7UUFDNUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFRRCxzQkFDSSw4QkFBSTtRQUpSOztXQUVHOzs7Ozs7UUFDSCxVQUNTLEtBQVc7WUFDbEIsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUNwQiw2RkFBNkY7Z0JBQzdGLHFCQUFxQjtnQkFDckIsSUFBSSxDQUFDLHNCQUFzQixHQUFHLEtBQUssQ0FBQzthQUNyQztpQkFBTTtnQkFDTCxJQUFJLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDbkM7UUFDSCxDQUFDOzs7T0FBQTtJQUVEOztPQUVHOzs7Ozs7SUFDSyw0Q0FBcUI7Ozs7O0lBQTdCLFVBQThCLEtBQVc7UUFDdkMsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFOzs7OztnQkFJakIsT0FBTyxHQUFXLElBQUksQ0FBQyxjQUFjLENBQUMsMkJBQTJCLENBQUMsS0FBSyxDQUFDO1lBQzlFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNoQztJQUNILENBQUM7Ozs7O0lBRU8sdUNBQWdCOzs7O0lBQXhCLFVBQXlCLE9BQWU7O1lBQ2hDLElBQUksR0FBUyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUM7UUFDNUQsSUFBSSxJQUFJLEVBQUU7O2dCQUNGLFFBQVEsR0FBYSxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUM1RixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsV0FBVyxDQUFDLEVBQUU7Z0JBQzlELElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDO2dCQUNuRCxJQUFJLENBQUMsd0JBQXdCLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDeEM7U0FDRjthQUFNO1lBQ0wsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7U0FDaEQ7SUFDSCxDQUFDO0lBT0Qsc0JBQ0kseUNBQWU7UUFKbkI7O1dBRUc7Ozs7O1FBQ0g7WUFFRSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDO1FBQ25GLENBQUM7OztPQUFBO0lBTUQsc0JBQ0ksbUNBQVM7UUFMYjs7O1dBR0c7Ozs7OztRQUNIO1lBRUUsT0FBTyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksSUFBSSxDQUFDLHlCQUF5QixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDMUcsQ0FBQzs7O09BQUE7Ozs7O0lBYU8scUNBQWM7Ozs7SUFBdEIsVUFBdUIsUUFBa0I7UUFDdkMsSUFBSSxRQUFRLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRTtZQUN0RCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztZQUMxQyxJQUFJLENBQUMsY0FBYyxHQUFHLFFBQVEsQ0FBQztTQUNoQzthQUFNLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUMzQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM3QixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztTQUM1QjtJQUNILENBQUM7Ozs7SUFHRCxxQ0FBYzs7O0lBRGQ7UUFFRSxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDckIsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1NBQ2xDO0lBQ0gsQ0FBQzs7OztJQUdELHdDQUFpQjs7O0lBRGpCO1FBRUUsaUJBQU0saUJBQWlCLFdBQUUsQ0FBQztRQUMxQixJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDckIsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1NBQ25DO0lBQ0gsQ0FBQztJQUVEOztPQUVHOzs7Ozs7SUFFSCxvQ0FBYTs7Ozs7SUFEYixVQUNjLE1BQXdCOztZQUM5QixLQUFLLEdBQVcsTUFBTSxDQUFDLEtBQUs7O1lBQzVCLElBQUksR0FBUyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFDMUQsSUFBSSxJQUFJLEVBQUU7O2dCQUNGLFFBQVEsR0FBYSxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUM1RixJQUFJLENBQUMsc0JBQXNCLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQztZQUNuRCxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQy9CO2FBQU07WUFDTCxJQUFJLENBQUMsc0JBQXNCLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztZQUMvQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzNCO0lBQ0gsQ0FBQztJQUVEOztPQUVHOzs7OztJQUNLLDhDQUF1Qjs7OztJQUEvQjtRQUFBLGlCQXdEQztRQXZEQyxJQUFJLElBQUksQ0FBQyxzQkFBc0IsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3RELDRFQUE0RTtZQUM1RSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FDckIsSUFBSSxDQUFDLHNCQUFzQixDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxVQUFDLFFBQWtCOztvQkFDbkUsT0FBTyxHQUFXLEtBQUksQ0FBQyxjQUFjLENBQUMsMkJBQTJCLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUMxRixLQUFJLENBQUMsd0JBQXdCLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3ZDLDhDQUE4QztnQkFDOUMsbURBQW1EO2dCQUNuRCwrREFBK0Q7Z0JBQy9ELGdEQUFnRDtnQkFDaEQsSUFBSSxLQUFJLENBQUMsT0FBTyxFQUFFO29CQUNoQixLQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQ3hDO2dCQUNELEtBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDaEMsQ0FBQyxDQUFDLENBQ0gsQ0FBQztZQUVGLDBEQUEwRDtZQUMxRCxzRUFBc0U7WUFDdEUsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNoQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FDckIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLFVBQUMsS0FBYTs7d0JBQzFDLElBQUksR0FBUyxLQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUM7b0JBQzFELElBQUksSUFBSSxFQUFFOzs0QkFDRixRQUFRLEdBQWEsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7d0JBQzVGLEtBQUksQ0FBQyxzQkFBc0IsQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDO3dCQUNuRCxLQUFJLENBQUMsd0JBQXdCLENBQUMsUUFBUSxDQUFDLENBQUM7cUJBQ3pDO3lCQUFNLElBQUksS0FBSyxLQUFLLEVBQUUsSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFO3dCQUN6QyxLQUFJLENBQUMsc0JBQXNCLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQzt3QkFDL0MsS0FBSSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxDQUFDO3FCQUNyQzt5QkFBTTt3QkFDTCxLQUFJLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLENBQUM7cUJBQ3JDO2dCQUNILENBQUMsQ0FBQyxDQUNILENBQUM7YUFDSDtTQUNGO1FBRUQsSUFBSSxJQUFJLENBQUMsc0JBQXNCLEVBQUU7WUFDL0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQ3JCLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDO2dCQUNsRCxJQUFJLEtBQUksQ0FBQyxPQUFPLEVBQUU7b0JBQ2hCLEtBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO2lCQUN0QztZQUNILENBQUMsQ0FBQyxDQUNILENBQUM7WUFFRixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FDckIsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUM7Z0JBQ2hELElBQUksS0FBSSxDQUFDLE9BQU8sRUFBRTtvQkFDaEIsS0FBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7aUJBQ3BDO1lBQ0gsQ0FBQyxDQUFDLENBQ0gsQ0FBQztTQUNIO0lBQ0gsQ0FBQzs7Z0JBMVNGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsV0FBVztvQkFDckIsSUFBSSxFQUFFO3dCQUNKLG9CQUFvQixFQUFFLGlCQUFpQjt3QkFDdkMsbUJBQW1CLEVBQUUsZ0JBQWdCO3FCQUN0QztpQkFDRjs7OztnQkFyQkMsZ0JBQWdCO2dCQVRoQixRQUFRO2dCQUxSLFVBQVU7Z0JBWVYsU0FBUztnQkFJRixTQUFTLHVCQThDYixJQUFJLFlBQ0osUUFBUTtnQkExQ0osZ0JBQWdCLHVCQTRDcEIsUUFBUTtnQkF6Q0osYUFBYSx1QkEwQ2pCLFFBQVE7Z0JBekNKLHFCQUFxQix1QkEwQ3pCLFFBQVE7Z0JBekNKLHdCQUF3Qix1QkEwQzVCLFFBQVE7Z0JBN0NKLHNCQUFzQix1QkE4QzFCLFFBQVE7Z0JBQ2dDLE1BQU0sdUJBQTlDLE1BQU0sU0FBQyxXQUFXO2dCQXJEZCxZQUFZLHVCQXNEaEIsUUFBUTs4Q0FDUixRQUFRLFlBQ1IsTUFBTSxTQUFDLG1CQUFtQjs7OytCQWxCNUIsS0FBSzt1QkF3R0wsS0FBSyxTQUFDLFNBQVM7OEJBcUNmLEtBQUs7a0NBS0wsV0FBVyxTQUFDLGtCQUFrQjs0QkFTOUIsV0FBVyxTQUFDLFdBQVc7K0JBY3ZCLE1BQU0sU0FBQyxlQUFlO2lDQVl0QixZQUFZLFNBQUMsT0FBTztvQ0FPcEIsWUFBWSxTQUFDLE1BQU07Z0NBV25CLFlBQVksU0FBQyxRQUFRLEVBQUUsQ0FBQyxlQUFlLENBQUM7O0lBMEUzQyxtQkFBQztDQUFBLEFBM1NELENBT2tDLGtCQUFrQixHQW9TbkQ7U0FwU1ksWUFBWTs7O0lBQ3ZCLDZCQUFvQjs7SUFRcEIscURBQXVEOztJQUN2RCxzQ0FBaUM7O0lBU2pDLG9DQUErQjs7SUFrRy9CLG1DQUFvQzs7SUFDcEMsOENBQXFDOztJQTBDckMsbUNBQTZCOztJQTRCN0Isb0NBQTBGOztJQXBLeEYsMEJBQXdCOztJQUN4QixnQ0FBNkI7O0lBQzdCLCtCQUU0Qjs7SUFDNUIsaUNBQStDOztJQUMvQyxzQ0FBaUQ7O0lBQ2pELDhDQUFpRTs7SUFDakUsaURBQXVFOztJQUN2RSw4Q0FBa0U7O0lBQ2xFLGtDQUErQzs7SUFDL0Msb0NBQThDOztJQUM5QyxzQ0FFOEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0QmluZGluZyxcbiAgSG9zdExpc3RlbmVyLFxuICBJbmplY3QsXG4gIEluamVjdG9yLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFBMQVRGT1JNX0lELFxuICBSZW5kZXJlcjIsXG4gIFNlbGYsXG4gIFZpZXdDb250YWluZXJSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRm9jdXNTZXJ2aWNlIH0gZnJvbSAnLi4vY29tbW9uL3Byb3ZpZGVycy9mb2N1cy5zZXJ2aWNlJztcblxuaW1wb3J0IHsgV3JhcHBlZEZvcm1Db250cm9sIH0gZnJvbSAnLi4vY29tbW9uL3dyYXBwZWQtY29udHJvbCc7XG5cbmltcG9ydCB7IENsckRhdGVDb250YWluZXIgfSBmcm9tICcuL2RhdGUtY29udGFpbmVyJztcbmltcG9ydCB7IERheU1vZGVsIH0gZnJvbSAnLi9tb2RlbC9kYXkubW9kZWwnO1xuaW1wb3J0IHsgRGF0ZUZvcm1Db250cm9sU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2RhdGUtZm9ybS1jb250cm9sLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0ZUlPU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2RhdGUtaW8uc2VydmljZSc7XG5pbXBvcnQgeyBEYXRlTmF2aWdhdGlvblNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9kYXRlLW5hdmlnYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBEYXRlcGlja2VyRW5hYmxlZFNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9kYXRlcGlja2VyLWVuYWJsZWQuc2VydmljZSc7XG5pbXBvcnQgeyBJU19ORVdfRk9STVNfTEFZT1VUIH0gZnJvbSAnLi4vY29tbW9uL3Byb3ZpZGVycy9uZXctZm9ybXMuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tjbHJEYXRlXScsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmRhdGUtaW5wdXRdJzogJyFuZXdGb3Jtc0xheW91dCcsXG4gICAgJ1tjbGFzcy5jbHItaW5wdXRdJzogJ25ld0Zvcm1zTGF5b3V0JyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyRGF0ZUlucHV0IGV4dGVuZHMgV3JhcHBlZEZvcm1Db250cm9sPENsckRhdGVDb250YWluZXI+IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICBwcm90ZWN0ZWQgaW5kZXggPSA0O1xuXG4gIC8vV2UgbmVlZCB0aGlzIHZhcmlhYmxlIGJlY2F1c2UgaWYgdGhlIGRhdGUgaW5wdXQgaGFzIGEgdmFsdWUgaW5pdGlhbGl6ZWRcbiAgLy93ZSBkbyBub3Qgb3V0cHV0IGl0LiBUaGlzIHZhcmlhYmxlIGlzIGZhbHNlIGR1cmluZyBpbml0aWFsIGxvYWQuIFdlIG1ha2Ugc3VyZSB0aGF0XG4gIC8vZHVyaW5nIGluaXRpYWwgbG9hZCBkYXlNb2RlbE91dHB1dHRlZCBpcyBlcXVhbCB0byB0aGUgdmFsdWUgZW50ZXJlZCBieSB0aGUgdXNlciBzbyB0aGF0IGluaXRpYWxpemVkXG4gIC8vdmFsdWUgaXNuJ3QgZW1pdHRlZCBiYWNrIHRvIHRoZSB1c2VyLiBBZnRlciBpbml0aWFsIGxvYWQsXG4gIC8vd2Ugc2V0IHRoaXMgdG8gdHJ1ZSBhbmQgdGhlIGRheU1vZGVsT3V0cHV0dGVkIGlzIHNldCBvbmx5XG4gIC8vd2hlbiB0aGUgT3V0cHV0IGlzIGVtaXR0ZWQgdG8gdGhlIHVzZXIuXG4gIHByaXZhdGUgcHJldmlvdXNPdXRwdXRJbml0aWFsaXplZEZsYWc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBwcmV2aW91c091dHB1dDogRGF5TW9kZWw7XG5cbiAgcHJpdmF0ZSBpbml0aWFsaXplUHJldmlvdXNPdXRwdXQoZGF5TW9kZWw6IERheU1vZGVsKSB7XG4gICAgaWYgKCF0aGlzLnByZXZpb3VzT3V0cHV0SW5pdGlhbGl6ZWRGbGFnKSB7XG4gICAgICB0aGlzLnByZXZpb3VzT3V0cHV0ID0gZGF5TW9kZWw7XG4gICAgICB0aGlzLnByZXZpb3VzT3V0cHV0SW5pdGlhbGl6ZWRGbGFnID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoKSBjbHJOZXdMYXlvdXQ6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgdmNyOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIGluamVjdG9yOiBJbmplY3RvcixcbiAgICBwcm90ZWN0ZWQgZWw6IEVsZW1lbnRSZWYsXG4gICAgcHJvdGVjdGVkIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgQFNlbGYoKVxuICAgIEBPcHRpb25hbCgpXG4gICAgcHJvdGVjdGVkIGNvbnRyb2w6IE5nQ29udHJvbCxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGNvbnRhaW5lcjogQ2xyRGF0ZUNvbnRhaW5lcixcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIF9kYXRlSU9TZXJ2aWNlOiBEYXRlSU9TZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgX2RhdGVOYXZpZ2F0aW9uU2VydmljZTogRGF0ZU5hdmlnYXRpb25TZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgX2RhdGVwaWNrZXJFbmFibGVkU2VydmljZTogRGF0ZXBpY2tlckVuYWJsZWRTZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZGF0ZUZvcm1Db250cm9sU2VydmljZTogRGF0ZUZvcm1Db250cm9sU2VydmljZSxcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IE9iamVjdCxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGZvY3VzU2VydmljZTogRm9jdXNTZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpXG4gICAgQEluamVjdChJU19ORVdfRk9STVNfTEFZT1VUKVxuICAgIHB1YmxpYyBuZXdGb3Jtc0xheW91dDogYm9vbGVhblxuICApIHtcbiAgICBzdXBlcih2Y3IsIENsckRhdGVDb250YWluZXIsIGluamVjdG9yLCBjb250cm9sLCByZW5kZXJlciwgZWwpO1xuICB9XG5cbiAgLyoqXG4gICAqIDEuIFBvcHVsYXRlIHNlcnZpY2VzIGlmIHRoZSBkYXRlIGNvbnRhaW5lciBpcyBub3QgcHJlc2VudC5cbiAgICogMi4gSW5pdGlhbGl6ZSBTdWJzY3JpcHRpb25zLlxuICAgKiAzLiBQcm9jZXNzIFVzZXIgSW5wdXQuXG4gICAqL1xuICBuZ09uSW5pdCgpIHtcbiAgICBzdXBlci5uZ09uSW5pdCgpO1xuICAgIGlmICghdGhpcy5jb250YWluZXIpIHtcbiAgICAgIHRoaXMucG9wdWxhdGVDb250YWluZXJTZXJ2aWNlcygpO1xuICAgIH1cbiAgICB0aGlzLmluaXRpYWxpemVTdWJzY3JpcHRpb25zKCk7XG4gICAgdGhpcy5wcm9jZXNzSW5pdGlhbElucHV0cygpO1xuICAgIGlmICh0aGlzLmNsck5ld0xheW91dCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLm5ld0Zvcm1zTGF5b3V0ID0gISF0aGlzLmNsck5ld0xheW91dDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUHJvY2VzcyB0aGUgaW5wdXRzIGluaXRpYWxpemVkIGJ5IHRoZSB1c2VyIHdoaWNoIHdlcmUgbWlzc2VkXG4gICAqIGJlY2F1c2Ugb2YgbGF0ZSBzdWJzY3JpcHRpb25zIG9yIGxpZmVjeWNsZSBtZXRob2QgY2FsbHMuXG4gICAqL1xuICBwcml2YXRlIHByb2Nlc3NJbml0aWFsSW5wdXRzKCk6IHZvaWQge1xuICAgIHRoaXMucHJvY2Vzc1VzZXJEYXRlT2JqZWN0KHRoaXMuZGF0ZVZhbHVlT25Jbml0aWFsTG9hZCk7XG5cbiAgICAvLyBIYW5kbGUgSW5pdGFsIFZhbHVlIGZyb20gUmVhY3RpdmUgRm9ybXNcbiAgICAvLyBUT0RPOiBXZSBhcmUgcmVwZWF0aW5nIHRoaXMgbG9naWMgYXQgbXVsdGlwbGUgcGxhY2VzLiBUaGlzIG1ha2VzIG1lIHRoaW5rXG4gICAgLy8gaWYgdGhpcyBjbGFzcyBzaG91bGQgaGF2ZSBpbXBsZW1lbnRlZCB0aGUgQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlLlxuICAgIC8vIFdpbGwgZXhwbG9yZSB0aGF0IGxhdGVyIGFuZCBzZWUgaWYgaXRzIGEgY2xlYW5lciBzb2x1dGlvbi5cbiAgICBpZiAodGhpcy5jb250cm9sICYmIHRoaXMuY29udHJvbC52YWx1ZSkge1xuICAgICAgdGhpcy51cGRhdGVJbnB1dFZhbHVlKHRoaXMuY29udHJvbC52YWx1ZSk7XG4gICAgICB0aGlzLmluaXRpYWxpemVQcmV2aW91c091dHB1dCh0aGlzLl9kYXRlTmF2aWdhdGlvblNlcnZpY2Uuc2VsZWN0ZWREYXkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBXcml0ZSB0aGUgaW5pdGlhbCBpbnB1dCBzZXQgYnkgdGhlIHVzZXIgb24gdG8gdGhlIGlucHV0IGZpZWxkLlxuICAgKi9cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIC8vIEkgZG9uJ3Qga25vdyB3aHkgSSBoYXZlIHRvIGRvIHRoaXMgYnV0IGFmdGVyIHVzaW5nIHRoZSBuZXcgSG9zdFdyYXBwaW5nIE1vZHVsZSBJIGhhdmUgdG8gZGVsYXkgdGhlIHByb2Nlc3NpbmdcbiAgICAvLyBvZiB0aGUgaW5pdGlhbCBJbnB1dCBzZXQgYnkgdGhlIHVzZXIgdG8gaGVyZS4gIElmIEkgZG8gbm90IDIgaXNzdWVzIG9jY3VyOlxuICAgIC8vIDEuIHRoZSBJbnB1dCBzZXR0ZXIgaXMgY2FsbGVkIGJlZm9yZSBuZ09uSW5pdC4gbmdPbkluaXQgaW5pdGlhbGl6ZXMgdGhlIHNlcnZpY2VzIHdpdGhvdXQgd2hpY2ggdGhlIHNldHRlclxuICAgIC8vIGZhaWxzXG4gICAgLy8gMi4gVGhlIFJlbmRlcmVyIGRvZXNuJ3Qgd29yayBiZWZvcmUgbmdBZnRlclZpZXdJbml0XG4gICAgLy8oSXQgdXNlZCB0byBiZWZvcmUgdGhlIG5ldyBIb3N0V3JhcHBpbmcgTW9kdWxlIGZvciBzb21lIHJlYXNvbikuXG4gICAgLy8gSSBuZWVkIHRoZSByZW5kZXJlciB0byBzZXQgdGhlIHZhbHVlIHByb3BlcnR5IG9uIHRoZSBpbnB1dCB0byBtYWtlIHN1cmUgdGhhdCBpZiB0aGUgdXNlciBoYXMgc3VwcGxpZWQgYSBEYXRlXG4gICAgLy8gaW5wdXQgb2JqZWN0LCAgd2UgcmVmbGVjdCBpdCB3aXRoIHRoZSByaWdodCBkYXRlIG9uIHRoZSBpbnB1dCBmaWVsZCB1c2luZyB0aGUgSU8gc2VydmljZS4gIEkgYW0gbm90IHN1cmUgaWZcbiAgICAvLyB0aGVzZSBhcmUgbWFqb3IgaXNzdWVzIG9yIG5vdCBidXQganVzdCBub3RpbmcgdGhlbSBkb3duIGhlcmUuXG4gICAgaWYgKHRoaXMuX2RhdGVOYXZpZ2F0aW9uU2VydmljZSkge1xuICAgICAgY29uc3Qgc2VsRGF5OiBEYXlNb2RlbCA9IHRoaXMuX2RhdGVOYXZpZ2F0aW9uU2VydmljZS5zZWxlY3RlZERheTtcbiAgICAgIGlmIChzZWxEYXkpIHtcbiAgICAgICAgY29uc3QgZGF0ZVN0cjogc3RyaW5nID0gdGhpcy5fZGF0ZUlPU2VydmljZS50b0xvY2FsZURpc3BsYXlGb3JtYXRTdHJpbmcoc2VsRGF5LnRvRGF0ZSgpKTtcbiAgICAgICAgdGhpcy53cml0ZURhdGVTdHJUb0lucHV0RmllbGQoZGF0ZVN0cik7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuaW5pdGlhbExvYWQgPSBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQb3B1bGF0ZXMgdGhlIHNlcnZpY2VzIGZyb20gdGhlIGNvbnRhaW5lciBjb21wb25lbnQuXG4gICAqL1xuICBwcml2YXRlIHBvcHVsYXRlQ29udGFpbmVyU2VydmljZXMoKTogdm9pZCB7XG4gICAgdGhpcy5fZGF0ZUlPU2VydmljZSA9IHRoaXMuZ2V0UHJvdmlkZXJGcm9tQ29udGFpbmVyKERhdGVJT1NlcnZpY2UpO1xuICAgIHRoaXMuX2RhdGVOYXZpZ2F0aW9uU2VydmljZSA9IHRoaXMuZ2V0UHJvdmlkZXJGcm9tQ29udGFpbmVyKERhdGVOYXZpZ2F0aW9uU2VydmljZSk7XG4gICAgdGhpcy5fZGF0ZXBpY2tlckVuYWJsZWRTZXJ2aWNlID0gdGhpcy5nZXRQcm92aWRlckZyb21Db250YWluZXIoRGF0ZXBpY2tlckVuYWJsZWRTZXJ2aWNlKTtcbiAgICB0aGlzLmRhdGVGb3JtQ29udHJvbFNlcnZpY2UgPSB0aGlzLmdldFByb3ZpZGVyRnJvbUNvbnRhaW5lcihEYXRlRm9ybUNvbnRyb2xTZXJ2aWNlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXcml0ZXMgdGhlIGRhdGUgc3RyaW5nIHZhbHVlIHRvIHRoZSBpbnB1dCBmaWVsZFxuICAgKi9cbiAgcHJpdmF0ZSB3cml0ZURhdGVTdHJUb0lucHV0RmllbGQodmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAndmFsdWUnLCB2YWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIGluaXRpYWxMb2FkOiBib29sZWFuID0gdHJ1ZTtcbiAgcHJpdmF0ZSBkYXRlVmFsdWVPbkluaXRpYWxMb2FkOiBEYXRlO1xuXG4gIC8qKlxuICAgKiBKYXZhc2NyaXB0IERhdGUgb2JqZWN0IGlucHV0IHNldCBieSB0aGUgdXNlci5cbiAgICovXG4gIEBJbnB1dCgnY2xyRGF0ZScpXG4gIHNldCBkYXRlKHZhbHVlOiBEYXRlKSB7XG4gICAgaWYgKHRoaXMuaW5pdGlhbExvYWQpIHtcbiAgICAgIC8vIFN0b3JlIGRhdGUgdmFsdWUgcGFzc2VkIGJ5IHRoZSB1c2VyIHRvIHByb2Nlc3MgYWZ0ZXIgdGhlIHNlcnZpY2VzIGhhdmUgYmVlbiBpbml0aWFsaXplZCBieVxuICAgICAgLy8gdGhlIG5nT25Jbml0IGhvb2suXG4gICAgICB0aGlzLmRhdGVWYWx1ZU9uSW5pdGlhbExvYWQgPSB2YWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wcm9jZXNzVXNlckRhdGVPYmplY3QodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQcm9jZXNzZXMgYSBkYXRlIG9iamVjdCB0byBjaGVjayBpZiBpdHMgdmFsaWQgb3Igbm90LlxuICAgKi9cbiAgcHJpdmF0ZSBwcm9jZXNzVXNlckRhdGVPYmplY3QodmFsdWU6IERhdGUpIHtcbiAgICBpZiAodGhpcy5fZGF0ZUlPU2VydmljZSkge1xuICAgICAgLy8gVGhlIGRhdGUgb2JqZWN0IGlzIGNvbnZlcnRlZCBiYWNrIHRvIHN0cmluZyBiZWNhdXNlIGluIEphdmFzY3JpcHQgeW91IGNhbiBjcmVhdGUgYSBkYXRlIG9iamVjdFxuICAgICAgLy8gbGlrZSB0aGlzOiBuZXcgRGF0ZShcIlRlc3RcIikuIFRoaXMgaXMgYSBkYXRlIG9iamVjdCBidXQgaXQgaXMgaW52YWxpZC4gQ29udmVydGluZyB0aGUgZGF0ZSBvYmplY3RcbiAgICAgIC8vIHRoYXQgdGhlIHVzZXIgcGFzc2VkIGhlbHBzIHVzIHRvIHZlcmlmeSB0aGUgdmFsaWRpdHkgb2YgdGhlIGRhdGUgb2JqZWN0LlxuICAgICAgY29uc3QgZGF0ZVN0cjogc3RyaW5nID0gdGhpcy5fZGF0ZUlPU2VydmljZS50b0xvY2FsZURpc3BsYXlGb3JtYXRTdHJpbmcodmFsdWUpO1xuICAgICAgdGhpcy51cGRhdGVJbnB1dFZhbHVlKGRhdGVTdHIpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlSW5wdXRWYWx1ZShkYXRlU3RyOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBkYXRlOiBEYXRlID0gdGhpcy5fZGF0ZUlPU2VydmljZS5pc1ZhbGlkSW5wdXQoZGF0ZVN0cik7XG4gICAgaWYgKGRhdGUpIHtcbiAgICAgIGNvbnN0IGRheU1vZGVsOiBEYXlNb2RlbCA9IG5ldyBEYXlNb2RlbChkYXRlLmdldEZ1bGxZZWFyKCksIGRhdGUuZ2V0TW9udGgoKSwgZGF0ZS5nZXREYXRlKCkpO1xuICAgICAgaWYgKCFkYXlNb2RlbC5pc0VxdWFsKHRoaXMuX2RhdGVOYXZpZ2F0aW9uU2VydmljZS5zZWxlY3RlZERheSkpIHtcbiAgICAgICAgdGhpcy5fZGF0ZU5hdmlnYXRpb25TZXJ2aWNlLnNlbGVjdGVkRGF5ID0gZGF5TW9kZWw7XG4gICAgICAgIHRoaXMud3JpdGVEYXRlU3RyVG9JbnB1dEZpZWxkKGRhdGVTdHIpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9kYXRlTmF2aWdhdGlvblNlcnZpY2Uuc2VsZWN0ZWREYXkgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGRhdGUgZm9ybWF0IGZvciB0aGUgcGxhY2Vob2xkZXIgYWNjb3JkaW5nIHRvIHdoaWNoIHRoZSBpbnB1dCBzaG91bGQgYmUgZW50ZXJlZCBieSB0aGUgdXNlci5cbiAgICovXG4gIEBIb3N0QmluZGluZygnYXR0ci5wbGFjZWhvbGRlcicpXG4gIGdldCBwbGFjZWhvbGRlclRleHQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5wbGFjZWhvbGRlciA/IHRoaXMucGxhY2Vob2xkZXIgOiB0aGlzLl9kYXRlSU9TZXJ2aWNlLnBsYWNlaG9sZGVyVGV4dDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBpbnB1dCB0eXBlIHRvIHRleHQgd2hlbiB0aGUgZGF0ZXBpY2tlciBpcyBlbmFibGVkLiBSZXZlcnRzIGJhY2sgdG8gdGhlIG5hdGl2ZSBkYXRlIGlucHV0XG4gICAqIHdoZW4gdGhlIGRhdGVwaWNrZXIgaXMgZGlzYWJsZWQuIERhdGVwaWNrZXIgaXMgZGlzYWJsZWQgb24gbW9iaWxlcy5cbiAgICovXG4gIEBIb3N0QmluZGluZygnYXR0ci50eXBlJylcbiAgZ2V0IGlucHV0VHlwZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiBpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpICYmIHRoaXMuX2RhdGVwaWNrZXJFbmFibGVkU2VydmljZS5pc0VuYWJsZWQgPyAndGV4dCcgOiAnZGF0ZSc7XG4gIH1cblxuICAvL1xuICAvLyBPdXRwdXQgTWFuYWdlbWVudFxuICAvLyBOb3RlOiBGb3Igbm93IHdlIHdpbGwgbm90IGVtaXQgYm90aCBjbHJEYXRlQ2hhbmdlIGFuZCBuZ0NvbnRyb2wgb3V0cHV0c1xuICAvLyBhdCB0aGUgc2FtZSB0aW1lLiBUaGlzIHJlcXVpcmVzIHVzIHRvIGxpc3RlbiB0byBrZXlkb3duIGFuZCBibHVyIGV2ZW50cyB0byBmaWd1cmUgb3V0XG4gIC8vIGV4YWN0bHkgd2hlbiB0aGUgT3V0cHV0IHNob3VsZCBiZSBlbWl0dGVkLlxuICAvLyBPdXIgcmVjb21tZW5kYXRpb24gcmlnaHQgbm93IGlzIHRvIGVpdGhlciB1c2UgY2xyRGF0ZSBvciB1c2UgbmdNb2RlbC9Gb3JtQ29udHJvbC5cbiAgLy8gRG8gbm90IHVzZSBib3RoIG9mIHRoZW0gdG9nZXRoZXIuXG4gIC8vXG5cbiAgQE91dHB1dCgnY2xyRGF0ZUNoYW5nZScpIF9kYXRlVXBkYXRlZDogRXZlbnRFbWl0dGVyPERhdGU+ID0gbmV3IEV2ZW50RW1pdHRlcjxEYXRlPihmYWxzZSk7XG5cbiAgcHJpdmF0ZSBlbWl0RGF0ZU91dHB1dChkYXlNb2RlbDogRGF5TW9kZWwpOiB2b2lkIHtcbiAgICBpZiAoZGF5TW9kZWwgJiYgIWRheU1vZGVsLmlzRXF1YWwodGhpcy5wcmV2aW91c091dHB1dCkpIHtcbiAgICAgIHRoaXMuX2RhdGVVcGRhdGVkLmVtaXQoZGF5TW9kZWwudG9EYXRlKCkpO1xuICAgICAgdGhpcy5wcmV2aW91c091dHB1dCA9IGRheU1vZGVsO1xuICAgIH0gZWxzZSBpZiAoIWRheU1vZGVsICYmIHRoaXMucHJldmlvdXNPdXRwdXQpIHtcbiAgICAgIHRoaXMuX2RhdGVVcGRhdGVkLmVtaXQobnVsbCk7XG4gICAgICB0aGlzLnByZXZpb3VzT3V0cHV0ID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdmb2N1cycpXG4gIHNldEZvY3VzU3RhdGVzKCkge1xuICAgIGlmICh0aGlzLmZvY3VzU2VydmljZSkge1xuICAgICAgdGhpcy5mb2N1c1NlcnZpY2UuZm9jdXNlZCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignYmx1cicpXG4gIHRyaWdnZXJWYWxpZGF0aW9uKCkge1xuICAgIHN1cGVyLnRyaWdnZXJWYWxpZGF0aW9uKCk7XG4gICAgaWYgKHRoaXMuZm9jdXNTZXJ2aWNlKSB7XG4gICAgICB0aGlzLmZvY3VzU2VydmljZS5mb2N1c2VkID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEZpcmVzIHRoaXMgbWV0aG9kIHdoZW4gdGhlIHVzZXIgY2hhbmdlcyB0aGUgaW5wdXQgZm9jdXNlcyBvdXQgb2YgdGhlIGlucHV0IGZpZWxkLlxuICAgKi9cbiAgQEhvc3RMaXN0ZW5lcignY2hhbmdlJywgWyckZXZlbnQudGFyZ2V0J10pXG4gIG9uVmFsdWVDaGFuZ2UodGFyZ2V0OiBIVE1MSW5wdXRFbGVtZW50KSB7XG4gICAgY29uc3QgdmFsdWU6IHN0cmluZyA9IHRhcmdldC52YWx1ZTtcbiAgICBjb25zdCBkYXRlOiBEYXRlID0gdGhpcy5fZGF0ZUlPU2VydmljZS5pc1ZhbGlkSW5wdXQodmFsdWUpO1xuICAgIGlmIChkYXRlKSB7XG4gICAgICBjb25zdCBkYXlNb2RlbDogRGF5TW9kZWwgPSBuZXcgRGF5TW9kZWwoZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXRlLmdldE1vbnRoKCksIGRhdGUuZ2V0RGF0ZSgpKTtcbiAgICAgIHRoaXMuX2RhdGVOYXZpZ2F0aW9uU2VydmljZS5zZWxlY3RlZERheSA9IGRheU1vZGVsO1xuICAgICAgdGhpcy5lbWl0RGF0ZU91dHB1dChkYXlNb2RlbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2RhdGVOYXZpZ2F0aW9uU2VydmljZS5zZWxlY3RlZERheSA9IG51bGw7XG4gICAgICB0aGlzLmVtaXREYXRlT3V0cHV0KG51bGwpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIERhdGVJTyBTdWJzY3JpcHRpb25zXG4gICAqL1xuICBwcml2YXRlIGluaXRpYWxpemVTdWJzY3JpcHRpb25zKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9kYXRlTmF2aWdhdGlvblNlcnZpY2UgJiYgdGhpcy5fZGF0ZUlPU2VydmljZSkge1xuICAgICAgLy8gVGhpcyBzdWJzY3JpcHRpb24gaXMgZmlyZWQgd2hlbiB0aGUgdXNlciBzZWxlY3RzIGEgZGF0ZSBmcm9tIHRoZSBwb3BvdmVyLlxuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICAgIHRoaXMuX2RhdGVOYXZpZ2F0aW9uU2VydmljZS5zZWxlY3RlZERheUNoYW5nZS5zdWJzY3JpYmUoKGRheU1vZGVsOiBEYXlNb2RlbCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGRhdGVTdHI6IHN0cmluZyA9IHRoaXMuX2RhdGVJT1NlcnZpY2UudG9Mb2NhbGVEaXNwbGF5Rm9ybWF0U3RyaW5nKGRheU1vZGVsLnRvRGF0ZSgpKTtcbiAgICAgICAgICB0aGlzLndyaXRlRGF0ZVN0clRvSW5wdXRGaWVsZChkYXRlU3RyKTtcbiAgICAgICAgICAvLyBUaGlzIG1ha2VzIHN1cmUgdGhhdCBuZ01vZGVsQ2hhbmdlIGlzIGZpcmVkXG4gICAgICAgICAgLy8gVE9ETzogQ2hlY2sgaWYgdGhlcmUgaXMgYSBiZXR0ZXIgd2F5IHRvIGRvIHRoaXMuXG4gICAgICAgICAgLy8gTk9URTogSXRzIGltcG9ydGFudCB0byB1c2UgTmdDb250cm9sIGFuZCBub3QgTmdNb2RlbCBiZWNhdXNlXG4gICAgICAgICAgLy8gTmdNb2RlbCBvbmx5IHdvcmtzIHdpdGggdGVtcGxhdGUgZHJpdmVuIGZvcm1zXG4gICAgICAgICAgaWYgKHRoaXMuY29udHJvbCkge1xuICAgICAgICAgICAgdGhpcy5jb250cm9sLmNvbnRyb2wuc2V0VmFsdWUoZGF0ZVN0cik7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuZW1pdERhdGVPdXRwdXQoZGF5TW9kZWwpO1xuICAgICAgICB9KVxuICAgICAgKTtcblxuICAgICAgLy8gV2UgZG8gbm90IGVtaXQgYW4gT3V0cHV0IGZyb20gdGhpcyBzdWJzY3JpcHRpb24gYmVjYXVzZVxuICAgICAgLy8gd2Ugb25seSBlbWl0IHRoZSBPdXRwdXQgd2hlbiB0aGUgdXNlciBoYXMgZm9jdXNlZCBvdXQgb2YgdGhlIGlucHV0LlxuICAgICAgaWYgKHRoaXMuY29udHJvbCkge1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgICAgICB0aGlzLmNvbnRyb2wudmFsdWVDaGFuZ2VzLnN1YnNjcmliZSgodmFsdWU6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgY29uc3QgZGF0ZTogRGF0ZSA9IHRoaXMuX2RhdGVJT1NlcnZpY2UuaXNWYWxpZElucHV0KHZhbHVlKTtcbiAgICAgICAgICAgIGlmIChkYXRlKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGRheU1vZGVsOiBEYXlNb2RlbCA9IG5ldyBEYXlNb2RlbChkYXRlLmdldEZ1bGxZZWFyKCksIGRhdGUuZ2V0TW9udGgoKSwgZGF0ZS5nZXREYXRlKCkpO1xuICAgICAgICAgICAgICB0aGlzLl9kYXRlTmF2aWdhdGlvblNlcnZpY2Uuc2VsZWN0ZWREYXkgPSBkYXlNb2RlbDtcbiAgICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplUHJldmlvdXNPdXRwdXQoZGF5TW9kZWwpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gJycgfHwgdmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgdGhpcy5fZGF0ZU5hdmlnYXRpb25TZXJ2aWNlLnNlbGVjdGVkRGF5ID0gbnVsbDtcbiAgICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplUHJldmlvdXNPdXRwdXQobnVsbCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLmluaXRpYWxpemVQcmV2aW91c091dHB1dChudWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLmRhdGVGb3JtQ29udHJvbFNlcnZpY2UpIHtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgICB0aGlzLmRhdGVGb3JtQ29udHJvbFNlcnZpY2UudG91Y2hlZENoYW5nZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLmNvbnRyb2wpIHtcbiAgICAgICAgICAgIHRoaXMuY29udHJvbC5jb250cm9sLm1hcmtBc1RvdWNoZWQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICApO1xuXG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgICAgdGhpcy5kYXRlRm9ybUNvbnRyb2xTZXJ2aWNlLmRpcnR5Q2hhbmdlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuY29udHJvbCkge1xuICAgICAgICAgICAgdGhpcy5jb250cm9sLmNvbnRyb2wubWFya0FzRGlydHkoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cbiAgfVxufVxuIl19