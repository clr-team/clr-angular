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
var ClrDateInput = /** @class */ (function (_super) {
    tslib_1.__extends(ClrDateInput, _super);
    function ClrDateInput(container, vcr, elRef, renderer, _ngControl, _dateIOService, _dateNavigationService, _datepickerEnabledService, dateFormControlService, platformId, ngControlService, controlClassService, focusService, ifErrorService, control, newFormsLayout) {
        var _this = _super.call(this, ClrDateContainer, vcr, 4) || this;
        _this.container = container;
        _this.elRef = elRef;
        _this.renderer = renderer;
        _this._ngControl = _ngControl;
        _this._dateIOService = _dateIOService;
        _this._dateNavigationService = _dateNavigationService;
        _this._datepickerEnabledService = _datepickerEnabledService;
        _this.dateFormControlService = dateFormControlService;
        _this.platformId = platformId;
        _this.ngControlService = ngControlService;
        _this.focusService = focusService;
        _this.ifErrorService = ifErrorService;
        _this.control = control;
        _this.newFormsLayout = newFormsLayout;
        /**
         * Subscriptions to all the services and queries changes
         */
        _this._subscriptions = [];
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
        if (controlClassService) {
            controlClassService.className = _this.elRef.nativeElement.className;
        }
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
        if (this._ngControl && this._ngControl.value) {
            this.updateInputValue(this._ngControl.value);
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
     * Unsubscribes from the subscriptions.
     */
    /**
     * Unsubscribes from the subscriptions.
     * @return {?}
     */
    ClrDateInput.prototype.ngOnDestroy = /**
     * Unsubscribes from the subscriptions.
     * @return {?}
     */
    function () {
        this._subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
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
        this.renderer.setProperty(this.elRef.nativeElement, 'value', value);
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
    ClrDateInput.prototype.setBlurStates = /**
     * @return {?}
     */
    function () {
        if (this.ifErrorService) {
            this.ifErrorService.triggerStatusChange();
        }
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
            this._subscriptions.push(this._dateNavigationService.selectedDayChange.subscribe(function (dayModel) {
                /** @type {?} */
                var dateStr = _this._dateIOService.toLocaleDisplayFormatString(dayModel.toDate());
                _this.writeDateStrToInputField(dateStr);
                // This makes sure that ngModelChange is fired
                // TODO: Check if there is a better way to do this.
                // NOTE: Its important to use NgControl and not NgModel because
                // NgModel only works with template driven forms
                if (_this._ngControl) {
                    _this._ngControl.control.setValue(dateStr);
                }
                _this.emitDateOutput(dayModel);
            }));
            // We do not emit an Output from this subscription because
            // we only emit the Output when the user has focused out of the input.
            if (this._ngControl) {
                this._subscriptions.push(this._ngControl.valueChanges.subscribe(function (value) {
                    /** @type {?} */
                    var date = _this._dateIOService.isValidInput(value);
                    if (date) {
                        /** @type {?} */
                        var dayModel = new DayModel(date.getFullYear(), date.getMonth(), date.getDate());
                        _this._dateNavigationService.selectedDay = dayModel;
                        _this.initializePreviousOutput(dayModel);
                    }
                    else {
                        _this.initializePreviousOutput(null);
                    }
                }));
            }
        }
        if (this.dateFormControlService) {
            this._subscriptions.push(this.dateFormControlService.touchedChange.subscribe(function () {
                if (_this._ngControl) {
                    _this._ngControl.control.markAsTouched();
                }
            }));
            this._subscriptions.push(this.dateFormControlService.dirtyChange.subscribe(function () {
                if (_this._ngControl) {
                    _this._ngControl.control.markAsDirty();
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
    ]; };
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
    return ClrDateInput;
}(WrappedFormControl));
export { ClrDateInput };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1pbnB1dC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImZvcm1zL2RhdGVwaWNrZXIvZGF0ZS1pbnB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBTUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDcEQsT0FBTyxFQUVMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFdBQVcsRUFDWCxZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFHTCxRQUFRLEVBQ1IsTUFBTSxFQUNOLFdBQVcsRUFDWCxTQUFTLEVBQ1QsSUFBSSxFQUNKLGdCQUFnQixHQUNqQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFM0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNqRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUUxRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUUvRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDN0MsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDL0UsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzVELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzVFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ2xGLE9BQU8sRUFB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O2dCQTFESixtQkFBbUIsdUJBMkR2QixRQUFRO2dCQTFESixZQUFZLHVCQTJEaEIsUUFBUTtnQkE3REosY0FBYyx1QkE4RGxCLFFBQVE7Z0JBaEVKLFNBQVMsdUJBaUViLFFBQVE7OENBQ1IsUUFBUSxZQUNSLE1BQU0sU0FBQyxtQkFBbUI7OzsrQkFyQjVCLEtBQUs7dUJBeUhMLEtBQUssU0FBQyxTQUFTOzhCQXFDZixLQUFLO2tDQUtMLFdBQVcsU0FBQyxrQkFBa0I7NEJBUzlCLFdBQVcsU0FBQyxXQUFXOytCQWN2QixNQUFNLFNBQUMsZUFBZTtpQ0FZdEIsWUFBWSxTQUFDLE9BQU87Z0NBT3BCLFlBQVksU0FBQyxNQUFNO2dDQWFuQixZQUFZLFNBQUMsUUFBUSxFQUFFLENBQUMsZUFBZSxDQUFDOztJQXVFM0MsbUJBQUM7Q0FBQSxBQTlURCxDQU9rQyxrQkFBa0IsR0F1VG5EO1NBdlRZLFlBQVk7Ozs7OztJQUl2QixzQ0FBNEM7O0lBUTVDLHFEQUF1RDs7SUFDdkQsc0NBQWlDOztJQVNqQyxvQ0FBK0I7O0lBbUgvQixtQ0FBb0M7O0lBQ3BDLDhDQUFxQzs7SUEwQ3JDLG1DQUE2Qjs7SUE0QjdCLG9DQUEwRjs7SUF2THhGLGlDQUErQzs7SUFFL0MsNkJBQXlCOztJQUN6QixnQ0FBMkI7O0lBQzNCLGtDQUU2Qjs7SUFDN0Isc0NBQWlEOztJQUNqRCw4Q0FBaUU7O0lBQ2pFLGlEQUF1RTs7SUFDdkUsOENBQWtFOztJQUNsRSxrQ0FBK0M7O0lBQy9DLHdDQUFzRDs7SUFFdEQsb0NBQThDOztJQUM5QyxzQ0FBa0Q7O0lBQ2xELCtCQUFzQzs7SUFDdEMsc0NBRThCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdEJpbmRpbmcsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFBMQVRGT1JNX0lELFxuICBSZW5kZXJlcjIsXG4gIFNlbGYsXG4gIFZpZXdDb250YWluZXJSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBJZkVycm9yU2VydmljZSB9IGZyb20gJy4uL2NvbW1vbi9pZi1lcnJvci9pZi1lcnJvci5zZXJ2aWNlJztcbmltcG9ydCB7IENvbnRyb2xDbGFzc1NlcnZpY2UgfSBmcm9tICcuLi9jb21tb24vcHJvdmlkZXJzL2NvbnRyb2wtY2xhc3Muc2VydmljZSc7XG5pbXBvcnQgeyBGb2N1c1NlcnZpY2UgfSBmcm9tICcuLi9jb21tb24vcHJvdmlkZXJzL2ZvY3VzLnNlcnZpY2UnO1xuaW1wb3J0IHsgTmdDb250cm9sU2VydmljZSB9IGZyb20gJy4uL2NvbW1vbi9wcm92aWRlcnMvbmctY29udHJvbC5zZXJ2aWNlJztcblxuaW1wb3J0IHsgV3JhcHBlZEZvcm1Db250cm9sIH0gZnJvbSAnLi4vY29tbW9uL3dyYXBwZWQtY29udHJvbCc7XG5cbmltcG9ydCB7IENsckRhdGVDb250YWluZXIgfSBmcm9tICcuL2RhdGUtY29udGFpbmVyJztcbmltcG9ydCB7IERheU1vZGVsIH0gZnJvbSAnLi9tb2RlbC9kYXkubW9kZWwnO1xuaW1wb3J0IHsgRGF0ZUZvcm1Db250cm9sU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2RhdGUtZm9ybS1jb250cm9sLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0ZUlPU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2RhdGUtaW8uc2VydmljZSc7XG5pbXBvcnQgeyBEYXRlTmF2aWdhdGlvblNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9kYXRlLW5hdmlnYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBEYXRlcGlja2VyRW5hYmxlZFNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9kYXRlcGlja2VyLWVuYWJsZWQuc2VydmljZSc7XG5pbXBvcnQgeyBJU19ORVdfRk9STVNfTEFZT1VUIH0gZnJvbSAnLi4vY29tbW9uL3Byb3ZpZGVycy9uZXctZm9ybXMuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tjbHJEYXRlXScsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmRhdGUtaW5wdXRdJzogJyFuZXdGb3Jtc0xheW91dCcsXG4gICAgJ1tjbGFzcy5jbHItaW5wdXRdJzogJ25ld0Zvcm1zTGF5b3V0JyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyRGF0ZUlucHV0IGV4dGVuZHMgV3JhcHBlZEZvcm1Db250cm9sPENsckRhdGVDb250YWluZXI+IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICAvKipcbiAgICogU3Vic2NyaXB0aW9ucyB0byBhbGwgdGhlIHNlcnZpY2VzIGFuZCBxdWVyaWVzIGNoYW5nZXNcbiAgICovXG4gIHByaXZhdGUgX3N1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgLy9XZSBuZWVkIHRoaXMgdmFyaWFibGUgYmVjYXVzZSBpZiB0aGUgZGF0ZSBpbnB1dCBoYXMgYSB2YWx1ZSBpbml0aWFsaXplZFxuICAvL3dlIGRvIG5vdCBvdXRwdXQgaXQuIFRoaXMgdmFyaWFibGUgaXMgZmFsc2UgZHVyaW5nIGluaXRpYWwgbG9hZC4gV2UgbWFrZSBzdXJlIHRoYXRcbiAgLy9kdXJpbmcgaW5pdGlhbCBsb2FkIGRheU1vZGVsT3V0cHV0dGVkIGlzIGVxdWFsIHRvIHRoZSB2YWx1ZSBlbnRlcmVkIGJ5IHRoZSB1c2VyIHNvIHRoYXQgaW5pdGlhbGl6ZWRcbiAgLy92YWx1ZSBpc24ndCBlbWl0dGVkIGJhY2sgdG8gdGhlIHVzZXIuIEFmdGVyIGluaXRpYWwgbG9hZCxcbiAgLy93ZSBzZXQgdGhpcyB0byB0cnVlIGFuZCB0aGUgZGF5TW9kZWxPdXRwdXR0ZWQgaXMgc2V0IG9ubHlcbiAgLy93aGVuIHRoZSBPdXRwdXQgaXMgZW1pdHRlZCB0byB0aGUgdXNlci5cbiAgcHJpdmF0ZSBwcmV2aW91c091dHB1dEluaXRpYWxpemVkRmxhZzogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIHByZXZpb3VzT3V0cHV0OiBEYXlNb2RlbDtcblxuICBwcml2YXRlIGluaXRpYWxpemVQcmV2aW91c091dHB1dChkYXlNb2RlbDogRGF5TW9kZWwpIHtcbiAgICBpZiAoIXRoaXMucHJldmlvdXNPdXRwdXRJbml0aWFsaXplZEZsYWcpIHtcbiAgICAgIHRoaXMucHJldmlvdXNPdXRwdXQgPSBkYXlNb2RlbDtcbiAgICAgIHRoaXMucHJldmlvdXNPdXRwdXRJbml0aWFsaXplZEZsYWcgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgpIGNsck5ld0xheW91dDogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGNvbnRhaW5lcjogQ2xyRGF0ZUNvbnRhaW5lcixcbiAgICB2Y3I6IFZpZXdDb250YWluZXJSZWYsXG4gICAgcHJpdmF0ZSBlbFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgQFNlbGYoKVxuICAgIEBPcHRpb25hbCgpXG4gICAgcHJpdmF0ZSBfbmdDb250cm9sOiBOZ0NvbnRyb2wsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBfZGF0ZUlPU2VydmljZTogRGF0ZUlPU2VydmljZSxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIF9kYXRlTmF2aWdhdGlvblNlcnZpY2U6IERhdGVOYXZpZ2F0aW9uU2VydmljZSxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIF9kYXRlcGlja2VyRW5hYmxlZFNlcnZpY2U6IERhdGVwaWNrZXJFbmFibGVkU2VydmljZSxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGRhdGVGb3JtQ29udHJvbFNlcnZpY2U6IERhdGVGb3JtQ29udHJvbFNlcnZpY2UsXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBPYmplY3QsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBuZ0NvbnRyb2xTZXJ2aWNlOiBOZ0NvbnRyb2xTZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpIGNvbnRyb2xDbGFzc1NlcnZpY2U6IENvbnRyb2xDbGFzc1NlcnZpY2UsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBmb2N1c1NlcnZpY2U6IEZvY3VzU2VydmljZSxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGlmRXJyb3JTZXJ2aWNlOiBJZkVycm9yU2VydmljZSxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGNvbnRyb2w6IE5nQ29udHJvbCxcbiAgICBAT3B0aW9uYWwoKVxuICAgIEBJbmplY3QoSVNfTkVXX0ZPUk1TX0xBWU9VVClcbiAgICBwdWJsaWMgbmV3Rm9ybXNMYXlvdXQ6IGJvb2xlYW5cbiAgKSB7XG4gICAgc3VwZXIoQ2xyRGF0ZUNvbnRhaW5lciwgdmNyLCA0KTtcblxuICAgIGlmIChjb250cm9sQ2xhc3NTZXJ2aWNlKSB7XG4gICAgICBjb250cm9sQ2xhc3NTZXJ2aWNlLmNsYXNzTmFtZSA9IHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudC5jbGFzc05hbWU7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIDEuIFBvcHVsYXRlIHNlcnZpY2VzIGlmIHRoZSBkYXRlIGNvbnRhaW5lciBpcyBub3QgcHJlc2VudC5cbiAgICogMi4gSW5pdGlhbGl6ZSBTdWJzY3JpcHRpb25zLlxuICAgKiAzLiBQcm9jZXNzIFVzZXIgSW5wdXQuXG4gICAqL1xuICBuZ09uSW5pdCgpIHtcbiAgICBzdXBlci5uZ09uSW5pdCgpO1xuICAgIGlmICh0aGlzLm5nQ29udHJvbFNlcnZpY2UgJiYgdGhpcy5jb250cm9sKSB7XG4gICAgICB0aGlzLm5nQ29udHJvbFNlcnZpY2Uuc2V0Q29udHJvbCh0aGlzLmNvbnRyb2wpO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuY29udGFpbmVyKSB7XG4gICAgICB0aGlzLnBvcHVsYXRlQ29udGFpbmVyU2VydmljZXMoKTtcbiAgICB9XG4gICAgdGhpcy5pbml0aWFsaXplU3Vic2NyaXB0aW9ucygpO1xuICAgIHRoaXMucHJvY2Vzc0luaXRpYWxJbnB1dHMoKTtcbiAgICBpZiAodGhpcy5jbHJOZXdMYXlvdXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5uZXdGb3Jtc0xheW91dCA9ICEhdGhpcy5jbHJOZXdMYXlvdXQ7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFByb2Nlc3MgdGhlIGlucHV0cyBpbml0aWFsaXplZCBieSB0aGUgdXNlciB3aGljaCB3ZXJlIG1pc3NlZFxuICAgKiBiZWNhdXNlIG9mIGxhdGUgc3Vic2NyaXB0aW9ucyBvciBsaWZlY3ljbGUgbWV0aG9kIGNhbGxzLlxuICAgKi9cbiAgcHJpdmF0ZSBwcm9jZXNzSW5pdGlhbElucHV0cygpOiB2b2lkIHtcbiAgICB0aGlzLnByb2Nlc3NVc2VyRGF0ZU9iamVjdCh0aGlzLmRhdGVWYWx1ZU9uSW5pdGlhbExvYWQpO1xuXG4gICAgLy8gSGFuZGxlIEluaXRhbCBWYWx1ZSBmcm9tIFJlYWN0aXZlIEZvcm1zXG4gICAgLy8gVE9ETzogV2UgYXJlIHJlcGVhdGluZyB0aGlzIGxvZ2ljIGF0IG11bHRpcGxlIHBsYWNlcy4gVGhpcyBtYWtlcyBtZSB0aGlua1xuICAgIC8vIGlmIHRoaXMgY2xhc3Mgc2hvdWxkIGhhdmUgaW1wbGVtZW50ZWQgdGhlIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZS5cbiAgICAvLyBXaWxsIGV4cGxvcmUgdGhhdCBsYXRlciBhbmQgc2VlIGlmIGl0cyBhIGNsZWFuZXIgc29sdXRpb24uXG4gICAgaWYgKHRoaXMuX25nQ29udHJvbCAmJiB0aGlzLl9uZ0NvbnRyb2wudmFsdWUpIHtcbiAgICAgIHRoaXMudXBkYXRlSW5wdXRWYWx1ZSh0aGlzLl9uZ0NvbnRyb2wudmFsdWUpO1xuICAgICAgdGhpcy5pbml0aWFsaXplUHJldmlvdXNPdXRwdXQodGhpcy5fZGF0ZU5hdmlnYXRpb25TZXJ2aWNlLnNlbGVjdGVkRGF5KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogV3JpdGUgdGhlIGluaXRpYWwgaW5wdXQgc2V0IGJ5IHRoZSB1c2VyIG9uIHRvIHRoZSBpbnB1dCBmaWVsZC5cbiAgICovXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAvLyBJIGRvbid0IGtub3cgd2h5IEkgaGF2ZSB0byBkbyB0aGlzIGJ1dCBhZnRlciB1c2luZyB0aGUgbmV3IEhvc3RXcmFwcGluZyBNb2R1bGUgSSBoYXZlIHRvIGRlbGF5IHRoZSBwcm9jZXNzaW5nXG4gICAgLy8gb2YgdGhlIGluaXRpYWwgSW5wdXQgc2V0IGJ5IHRoZSB1c2VyIHRvIGhlcmUuICBJZiBJIGRvIG5vdCAyIGlzc3VlcyBvY2N1cjpcbiAgICAvLyAxLiB0aGUgSW5wdXQgc2V0dGVyIGlzIGNhbGxlZCBiZWZvcmUgbmdPbkluaXQuIG5nT25Jbml0IGluaXRpYWxpemVzIHRoZSBzZXJ2aWNlcyB3aXRob3V0IHdoaWNoIHRoZSBzZXR0ZXJcbiAgICAvLyBmYWlsc1xuICAgIC8vIDIuIFRoZSBSZW5kZXJlciBkb2Vzbid0IHdvcmsgYmVmb3JlIG5nQWZ0ZXJWaWV3SW5pdFxuICAgIC8vKEl0IHVzZWQgdG8gYmVmb3JlIHRoZSBuZXcgSG9zdFdyYXBwaW5nIE1vZHVsZSBmb3Igc29tZSByZWFzb24pLlxuICAgIC8vIEkgbmVlZCB0aGUgcmVuZGVyZXIgdG8gc2V0IHRoZSB2YWx1ZSBwcm9wZXJ0eSBvbiB0aGUgaW5wdXQgdG8gbWFrZSBzdXJlIHRoYXQgaWYgdGhlIHVzZXIgaGFzIHN1cHBsaWVkIGEgRGF0ZVxuICAgIC8vIGlucHV0IG9iamVjdCwgIHdlIHJlZmxlY3QgaXQgd2l0aCB0aGUgcmlnaHQgZGF0ZSBvbiB0aGUgaW5wdXQgZmllbGQgdXNpbmcgdGhlIElPIHNlcnZpY2UuICBJIGFtIG5vdCBzdXJlIGlmXG4gICAgLy8gdGhlc2UgYXJlIG1ham9yIGlzc3VlcyBvciBub3QgYnV0IGp1c3Qgbm90aW5nIHRoZW0gZG93biBoZXJlLlxuICAgIGlmICh0aGlzLl9kYXRlTmF2aWdhdGlvblNlcnZpY2UpIHtcbiAgICAgIGNvbnN0IHNlbERheTogRGF5TW9kZWwgPSB0aGlzLl9kYXRlTmF2aWdhdGlvblNlcnZpY2Uuc2VsZWN0ZWREYXk7XG4gICAgICBpZiAoc2VsRGF5KSB7XG4gICAgICAgIGNvbnN0IGRhdGVTdHI6IHN0cmluZyA9IHRoaXMuX2RhdGVJT1NlcnZpY2UudG9Mb2NhbGVEaXNwbGF5Rm9ybWF0U3RyaW5nKHNlbERheS50b0RhdGUoKSk7XG4gICAgICAgIHRoaXMud3JpdGVEYXRlU3RyVG9JbnB1dEZpZWxkKGRhdGVTdHIpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmluaXRpYWxMb2FkID0gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogVW5zdWJzY3JpYmVzIGZyb20gdGhlIHN1YnNjcmlwdGlvbnMuXG4gICAqL1xuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9zdWJzY3JpcHRpb25zLmZvckVhY2goKHN1YjogU3Vic2NyaXB0aW9uKSA9PiBzdWIudW5zdWJzY3JpYmUoKSk7XG4gIH1cblxuICAvKipcbiAgICogUG9wdWxhdGVzIHRoZSBzZXJ2aWNlcyBmcm9tIHRoZSBjb250YWluZXIgY29tcG9uZW50LlxuICAgKi9cbiAgcHJpdmF0ZSBwb3B1bGF0ZUNvbnRhaW5lclNlcnZpY2VzKCk6IHZvaWQge1xuICAgIHRoaXMuX2RhdGVJT1NlcnZpY2UgPSB0aGlzLmdldFByb3ZpZGVyRnJvbUNvbnRhaW5lcihEYXRlSU9TZXJ2aWNlKTtcbiAgICB0aGlzLl9kYXRlTmF2aWdhdGlvblNlcnZpY2UgPSB0aGlzLmdldFByb3ZpZGVyRnJvbUNvbnRhaW5lcihEYXRlTmF2aWdhdGlvblNlcnZpY2UpO1xuICAgIHRoaXMuX2RhdGVwaWNrZXJFbmFibGVkU2VydmljZSA9IHRoaXMuZ2V0UHJvdmlkZXJGcm9tQ29udGFpbmVyKERhdGVwaWNrZXJFbmFibGVkU2VydmljZSk7XG4gICAgdGhpcy5kYXRlRm9ybUNvbnRyb2xTZXJ2aWNlID0gdGhpcy5nZXRQcm92aWRlckZyb21Db250YWluZXIoRGF0ZUZvcm1Db250cm9sU2VydmljZSk7XG4gIH1cblxuICAvKipcbiAgICogV3JpdGVzIHRoZSBkYXRlIHN0cmluZyB2YWx1ZSB0byB0aGUgaW5wdXQgZmllbGRcbiAgICovXG4gIHByaXZhdGUgd3JpdGVEYXRlU3RyVG9JbnB1dEZpZWxkKHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ3ZhbHVlJywgdmFsdWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0aWFsTG9hZDogYm9vbGVhbiA9IHRydWU7XG4gIHByaXZhdGUgZGF0ZVZhbHVlT25Jbml0aWFsTG9hZDogRGF0ZTtcblxuICAvKipcbiAgICogSmF2YXNjcmlwdCBEYXRlIG9iamVjdCBpbnB1dCBzZXQgYnkgdGhlIHVzZXIuXG4gICAqL1xuICBASW5wdXQoJ2NsckRhdGUnKVxuICBzZXQgZGF0ZSh2YWx1ZTogRGF0ZSkge1xuICAgIGlmICh0aGlzLmluaXRpYWxMb2FkKSB7XG4gICAgICAvLyBTdG9yZSBkYXRlIHZhbHVlIHBhc3NlZCBieSB0aGUgdXNlciB0byBwcm9jZXNzIGFmdGVyIHRoZSBzZXJ2aWNlcyBoYXZlIGJlZW4gaW5pdGlhbGl6ZWQgYnlcbiAgICAgIC8vIHRoZSBuZ09uSW5pdCBob29rLlxuICAgICAgdGhpcy5kYXRlVmFsdWVPbkluaXRpYWxMb2FkID0gdmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucHJvY2Vzc1VzZXJEYXRlT2JqZWN0KHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUHJvY2Vzc2VzIGEgZGF0ZSBvYmplY3QgdG8gY2hlY2sgaWYgaXRzIHZhbGlkIG9yIG5vdC5cbiAgICovXG4gIHByaXZhdGUgcHJvY2Vzc1VzZXJEYXRlT2JqZWN0KHZhbHVlOiBEYXRlKSB7XG4gICAgaWYgKHRoaXMuX2RhdGVJT1NlcnZpY2UpIHtcbiAgICAgIC8vIFRoZSBkYXRlIG9iamVjdCBpcyBjb252ZXJ0ZWQgYmFjayB0byBzdHJpbmcgYmVjYXVzZSBpbiBKYXZhc2NyaXB0IHlvdSBjYW4gY3JlYXRlIGEgZGF0ZSBvYmplY3RcbiAgICAgIC8vIGxpa2UgdGhpczogbmV3IERhdGUoXCJUZXN0XCIpLiBUaGlzIGlzIGEgZGF0ZSBvYmplY3QgYnV0IGl0IGlzIGludmFsaWQuIENvbnZlcnRpbmcgdGhlIGRhdGUgb2JqZWN0XG4gICAgICAvLyB0aGF0IHRoZSB1c2VyIHBhc3NlZCBoZWxwcyB1cyB0byB2ZXJpZnkgdGhlIHZhbGlkaXR5IG9mIHRoZSBkYXRlIG9iamVjdC5cbiAgICAgIGNvbnN0IGRhdGVTdHI6IHN0cmluZyA9IHRoaXMuX2RhdGVJT1NlcnZpY2UudG9Mb2NhbGVEaXNwbGF5Rm9ybWF0U3RyaW5nKHZhbHVlKTtcbiAgICAgIHRoaXMudXBkYXRlSW5wdXRWYWx1ZShkYXRlU3RyKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZUlucHV0VmFsdWUoZGF0ZVN0cjogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgZGF0ZTogRGF0ZSA9IHRoaXMuX2RhdGVJT1NlcnZpY2UuaXNWYWxpZElucHV0KGRhdGVTdHIpO1xuICAgIGlmIChkYXRlKSB7XG4gICAgICBjb25zdCBkYXlNb2RlbDogRGF5TW9kZWwgPSBuZXcgRGF5TW9kZWwoZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXRlLmdldE1vbnRoKCksIGRhdGUuZ2V0RGF0ZSgpKTtcbiAgICAgIGlmICghZGF5TW9kZWwuaXNFcXVhbCh0aGlzLl9kYXRlTmF2aWdhdGlvblNlcnZpY2Uuc2VsZWN0ZWREYXkpKSB7XG4gICAgICAgIHRoaXMuX2RhdGVOYXZpZ2F0aW9uU2VydmljZS5zZWxlY3RlZERheSA9IGRheU1vZGVsO1xuICAgICAgICB0aGlzLndyaXRlRGF0ZVN0clRvSW5wdXRGaWVsZChkYXRlU3RyKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZGF0ZU5hdmlnYXRpb25TZXJ2aWNlLnNlbGVjdGVkRGF5ID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBkYXRlIGZvcm1hdCBmb3IgdGhlIHBsYWNlaG9sZGVyIGFjY29yZGluZyB0byB3aGljaCB0aGUgaW5wdXQgc2hvdWxkIGJlIGVudGVyZWQgYnkgdGhlIHVzZXIuXG4gICAqL1xuICBASG9zdEJpbmRpbmcoJ2F0dHIucGxhY2Vob2xkZXInKVxuICBnZXQgcGxhY2Vob2xkZXJUZXh0KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMucGxhY2Vob2xkZXIgPyB0aGlzLnBsYWNlaG9sZGVyIDogdGhpcy5fZGF0ZUlPU2VydmljZS5wbGFjZWhvbGRlclRleHQ7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgaW5wdXQgdHlwZSB0byB0ZXh0IHdoZW4gdGhlIGRhdGVwaWNrZXIgaXMgZW5hYmxlZC4gUmV2ZXJ0cyBiYWNrIHRvIHRoZSBuYXRpdmUgZGF0ZSBpbnB1dFxuICAgKiB3aGVuIHRoZSBkYXRlcGlja2VyIGlzIGRpc2FibGVkLiBEYXRlcGlja2VyIGlzIGRpc2FibGVkIG9uIG1vYmlsZXMuXG4gICAqL1xuICBASG9zdEJpbmRpbmcoJ2F0dHIudHlwZScpXG4gIGdldCBpbnB1dFR5cGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSAmJiB0aGlzLl9kYXRlcGlja2VyRW5hYmxlZFNlcnZpY2UuaXNFbmFibGVkID8gJ3RleHQnIDogJ2RhdGUnO1xuICB9XG5cbiAgLy9cbiAgLy8gT3V0cHV0IE1hbmFnZW1lbnRcbiAgLy8gTm90ZTogRm9yIG5vdyB3ZSB3aWxsIG5vdCBlbWl0IGJvdGggY2xyRGF0ZUNoYW5nZSBhbmQgbmdDb250cm9sIG91dHB1dHNcbiAgLy8gYXQgdGhlIHNhbWUgdGltZS4gVGhpcyByZXF1aXJlcyB1cyB0byBsaXN0ZW4gdG8ga2V5ZG93biBhbmQgYmx1ciBldmVudHMgdG8gZmlndXJlIG91dFxuICAvLyBleGFjdGx5IHdoZW4gdGhlIE91dHB1dCBzaG91bGQgYmUgZW1pdHRlZC5cbiAgLy8gT3VyIHJlY29tbWVuZGF0aW9uIHJpZ2h0IG5vdyBpcyB0byBlaXRoZXIgdXNlIGNsckRhdGUgb3IgdXNlIG5nTW9kZWwvRm9ybUNvbnRyb2wuXG4gIC8vIERvIG5vdCB1c2UgYm90aCBvZiB0aGVtIHRvZ2V0aGVyLlxuICAvL1xuXG4gIEBPdXRwdXQoJ2NsckRhdGVDaGFuZ2UnKSBfZGF0ZVVwZGF0ZWQ6IEV2ZW50RW1pdHRlcjxEYXRlPiA9IG5ldyBFdmVudEVtaXR0ZXI8RGF0ZT4oZmFsc2UpO1xuXG4gIHByaXZhdGUgZW1pdERhdGVPdXRwdXQoZGF5TW9kZWw6IERheU1vZGVsKTogdm9pZCB7XG4gICAgaWYgKGRheU1vZGVsICYmICFkYXlNb2RlbC5pc0VxdWFsKHRoaXMucHJldmlvdXNPdXRwdXQpKSB7XG4gICAgICB0aGlzLl9kYXRlVXBkYXRlZC5lbWl0KGRheU1vZGVsLnRvRGF0ZSgpKTtcbiAgICAgIHRoaXMucHJldmlvdXNPdXRwdXQgPSBkYXlNb2RlbDtcbiAgICB9IGVsc2UgaWYgKCFkYXlNb2RlbCAmJiB0aGlzLnByZXZpb3VzT3V0cHV0KSB7XG4gICAgICB0aGlzLl9kYXRlVXBkYXRlZC5lbWl0KG51bGwpO1xuICAgICAgdGhpcy5wcmV2aW91c091dHB1dCA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZm9jdXMnKVxuICBzZXRGb2N1c1N0YXRlcygpIHtcbiAgICBpZiAodGhpcy5mb2N1c1NlcnZpY2UpIHtcbiAgICAgIHRoaXMuZm9jdXNTZXJ2aWNlLmZvY3VzZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2JsdXInKVxuICBzZXRCbHVyU3RhdGVzKCkge1xuICAgIGlmICh0aGlzLmlmRXJyb3JTZXJ2aWNlKSB7XG4gICAgICB0aGlzLmlmRXJyb3JTZXJ2aWNlLnRyaWdnZXJTdGF0dXNDaGFuZ2UoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuZm9jdXNTZXJ2aWNlKSB7XG4gICAgICB0aGlzLmZvY3VzU2VydmljZS5mb2N1c2VkID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEZpcmVzIHRoaXMgbWV0aG9kIHdoZW4gdGhlIHVzZXIgY2hhbmdlcyB0aGUgaW5wdXQgZm9jdXNlcyBvdXQgb2YgdGhlIGlucHV0IGZpZWxkLlxuICAgKi9cbiAgQEhvc3RMaXN0ZW5lcignY2hhbmdlJywgWyckZXZlbnQudGFyZ2V0J10pXG4gIG9uVmFsdWVDaGFuZ2UodGFyZ2V0OiBIVE1MSW5wdXRFbGVtZW50KSB7XG4gICAgY29uc3QgdmFsdWU6IHN0cmluZyA9IHRhcmdldC52YWx1ZTtcbiAgICBjb25zdCBkYXRlOiBEYXRlID0gdGhpcy5fZGF0ZUlPU2VydmljZS5pc1ZhbGlkSW5wdXQodmFsdWUpO1xuICAgIGlmIChkYXRlKSB7XG4gICAgICBjb25zdCBkYXlNb2RlbDogRGF5TW9kZWwgPSBuZXcgRGF5TW9kZWwoZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXRlLmdldE1vbnRoKCksIGRhdGUuZ2V0RGF0ZSgpKTtcbiAgICAgIHRoaXMuX2RhdGVOYXZpZ2F0aW9uU2VydmljZS5zZWxlY3RlZERheSA9IGRheU1vZGVsO1xuICAgICAgdGhpcy5lbWl0RGF0ZU91dHB1dChkYXlNb2RlbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2RhdGVOYXZpZ2F0aW9uU2VydmljZS5zZWxlY3RlZERheSA9IG51bGw7XG4gICAgICB0aGlzLmVtaXREYXRlT3V0cHV0KG51bGwpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIERhdGVJTyBTdWJzY3JpcHRpb25zXG4gICAqL1xuICBwcml2YXRlIGluaXRpYWxpemVTdWJzY3JpcHRpb25zKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9kYXRlTmF2aWdhdGlvblNlcnZpY2UgJiYgdGhpcy5fZGF0ZUlPU2VydmljZSkge1xuICAgICAgLy8gVGhpcyBzdWJzY3JpcHRpb24gaXMgZmlyZWQgd2hlbiB0aGUgdXNlciBzZWxlY3RzIGEgZGF0ZSBmcm9tIHRoZSBwb3BvdmVyLlxuICAgICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgICB0aGlzLl9kYXRlTmF2aWdhdGlvblNlcnZpY2Uuc2VsZWN0ZWREYXlDaGFuZ2Uuc3Vic2NyaWJlKChkYXlNb2RlbDogRGF5TW9kZWwpID0+IHtcbiAgICAgICAgICBjb25zdCBkYXRlU3RyOiBzdHJpbmcgPSB0aGlzLl9kYXRlSU9TZXJ2aWNlLnRvTG9jYWxlRGlzcGxheUZvcm1hdFN0cmluZyhkYXlNb2RlbC50b0RhdGUoKSk7XG4gICAgICAgICAgdGhpcy53cml0ZURhdGVTdHJUb0lucHV0RmllbGQoZGF0ZVN0cik7XG4gICAgICAgICAgLy8gVGhpcyBtYWtlcyBzdXJlIHRoYXQgbmdNb2RlbENoYW5nZSBpcyBmaXJlZFxuICAgICAgICAgIC8vIFRPRE86IENoZWNrIGlmIHRoZXJlIGlzIGEgYmV0dGVyIHdheSB0byBkbyB0aGlzLlxuICAgICAgICAgIC8vIE5PVEU6IEl0cyBpbXBvcnRhbnQgdG8gdXNlIE5nQ29udHJvbCBhbmQgbm90IE5nTW9kZWwgYmVjYXVzZVxuICAgICAgICAgIC8vIE5nTW9kZWwgb25seSB3b3JrcyB3aXRoIHRlbXBsYXRlIGRyaXZlbiBmb3Jtc1xuICAgICAgICAgIGlmICh0aGlzLl9uZ0NvbnRyb2wpIHtcbiAgICAgICAgICAgIHRoaXMuX25nQ29udHJvbC5jb250cm9sLnNldFZhbHVlKGRhdGVTdHIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmVtaXREYXRlT3V0cHV0KGRheU1vZGVsKTtcbiAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICAgIC8vIFdlIGRvIG5vdCBlbWl0IGFuIE91dHB1dCBmcm9tIHRoaXMgc3Vic2NyaXB0aW9uIGJlY2F1c2VcbiAgICAgIC8vIHdlIG9ubHkgZW1pdCB0aGUgT3V0cHV0IHdoZW4gdGhlIHVzZXIgaGFzIGZvY3VzZWQgb3V0IG9mIHRoZSBpbnB1dC5cbiAgICAgIGlmICh0aGlzLl9uZ0NvbnRyb2wpIHtcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgICAgIHRoaXMuX25nQ29udHJvbC52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKCh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBkYXRlOiBEYXRlID0gdGhpcy5fZGF0ZUlPU2VydmljZS5pc1ZhbGlkSW5wdXQodmFsdWUpO1xuICAgICAgICAgICAgaWYgKGRhdGUpIHtcbiAgICAgICAgICAgICAgY29uc3QgZGF5TW9kZWw6IERheU1vZGVsID0gbmV3IERheU1vZGVsKGRhdGUuZ2V0RnVsbFllYXIoKSwgZGF0ZS5nZXRNb250aCgpLCBkYXRlLmdldERhdGUoKSk7XG4gICAgICAgICAgICAgIHRoaXMuX2RhdGVOYXZpZ2F0aW9uU2VydmljZS5zZWxlY3RlZERheSA9IGRheU1vZGVsO1xuICAgICAgICAgICAgICB0aGlzLmluaXRpYWxpemVQcmV2aW91c091dHB1dChkYXlNb2RlbCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLmluaXRpYWxpemVQcmV2aW91c091dHB1dChudWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLmRhdGVGb3JtQ29udHJvbFNlcnZpY2UpIHtcbiAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgICAgdGhpcy5kYXRlRm9ybUNvbnRyb2xTZXJ2aWNlLnRvdWNoZWRDaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5fbmdDb250cm9sKSB7XG4gICAgICAgICAgICB0aGlzLl9uZ0NvbnRyb2wuY29udHJvbC5tYXJrQXNUb3VjaGVkKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgKTtcblxuICAgICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgICB0aGlzLmRhdGVGb3JtQ29udHJvbFNlcnZpY2UuZGlydHlDaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5fbmdDb250cm9sKSB7XG4gICAgICAgICAgICB0aGlzLl9uZ0NvbnRyb2wuY29udHJvbC5tYXJrQXNEaXJ0eSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfVxuICB9XG59XG4iXX0=