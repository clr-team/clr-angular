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
import { filter } from 'rxjs/operators';
import { FocusService } from '../common/providers/focus.service';
import { WrappedFormControl } from '../common/wrapped-control';
import { ClrDateContainer } from './date-container';
import { DayModel } from './model/day.model';
import { DateFormControlService } from './providers/date-form-control.service';
import { DateIOService } from './providers/date-io.service';
import { DateNavigationService } from './providers/date-navigation.service';
import { DatepickerEnabledService } from './providers/datepicker-enabled.service';
import { IS_NEW_FORMS_LAYOUT } from '../common/providers/new-forms.service';
import { DatepickerFocusService } from './providers/datepicker-focus.service';
var ClrDateInput = /** @class */ (function (_super) {
    tslib_1.__extends(ClrDateInput, _super);
    function ClrDateInput(vcr, injector, el, renderer, control, container, _dateIOService, _dateNavigationService, _datepickerEnabledService, dateFormControlService, platformId, focusService, newFormsLayout, datepickerFocusService) {
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
        _this.datepickerFocusService = datepickerFocusService;
        _this.index = 4;
        //We need this variable because if the date input has a value initialized
        //we do not output it. This variable is false during initial load. We make sure that
        //during initial load dayModelOutputted is equal to the value entered by the user so that initialized
        //value isn't emitted back to the user. After initial load,
        //we set this to true and the dayModelOutputted is set only
        //when the Output is emitted to the user.
        _this.previousOutputInitializedFlag = false;
        _this.initialLoad = true;
        /**
         * Output Management
         * Note: For now we will not emit both clrDateChange and ngControl outputs
         * at the same time. This requires us to listen to keydown and blur events to figure out
         * exactly when the Output should be emitted.
         * Our recommendation right now is to either use clrDate or use ngModel/FormControl.
         * Do not use both of them together.
         */
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
     * @return {?}
     */
    ClrDateInput.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        _super.prototype.ngOnInit.call(this);
        this.populateServicesFromContainerComponent();
        this.initializeSubscriptions();
        this.processInitialInputs();
        this.setFormLayout();
    };
    /**
     * @return {?}
     */
    ClrDateInput.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.writeInitialInputFromUserInputField();
    };
    /**
     * @return {?}
     */
    ClrDateInput.prototype.populateServicesFromContainerComponent = /**
     * @return {?}
     */
    function () {
        if (!this.container) {
            this._dateIOService = this.getProviderFromContainer(DateIOService);
            this._dateNavigationService = this.getProviderFromContainer(DateNavigationService);
            this._datepickerEnabledService = this.getProviderFromContainer(DatepickerEnabledService);
            this.dateFormControlService = this.getProviderFromContainer(DateFormControlService);
        }
    };
    /**
     * @return {?}
     */
    ClrDateInput.prototype.processInitialInputs = /**
     * @return {?}
     */
    function () {
        // Process the inputs initialized by the user which were missed
        // because of late subscriptions or lifecycle method calls.
        this.processUserDateObject(this.dateValueOnInitialLoad);
        // Handle Initial Value from Reactive Forms
        // TODO: We are repeating this logic at multiple places. This makes me think
        // if this class should have implemented the ControlValueAccessor interface.
        // Will explore that later and see if its a cleaner solution.
        if (this.control && this.control.value) {
            this.updateInputValue(this.control.value);
            this.initializePreviousOutput(this._dateNavigationService.selectedDay);
        }
    };
    /**
     * @return {?}
     */
    ClrDateInput.prototype.setFormLayout = /**
     * @return {?}
     */
    function () {
        if (this.clrNewLayout !== undefined) {
            this.newFormsLayout = !!this.clrNewLayout;
        }
    };
    /**
     * @return {?}
     */
    ClrDateInput.prototype.writeInitialInputFromUserInputField = /**
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
     * @param {?} value
     * @return {?}
     */
    ClrDateInput.prototype.writeDateStrToInputField = /**
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
                this.previousOutput = dayModel;
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
     * @return {?}
     */
    ClrDateInput.prototype.setFocusStates = /**
     * @return {?}
     */
    function () {
        this.setFocus(true);
    };
    /**
     * @return {?}
     */
    ClrDateInput.prototype.triggerValidation = /**
     * @return {?}
     */
    function () {
        _super.prototype.triggerValidation.call(this);
        this.setFocus(false);
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
     * @param {?} focus
     * @return {?}
     */
    ClrDateInput.prototype.setFocus = /**
     * @param {?} focus
     * @return {?}
     */
    function (focus) {
        if (this.focusService) {
            this.focusService.focused = focus;
        }
    };
    /**
     * @return {?}
     */
    ClrDateInput.prototype.initializeSubscriptions = /**
     * @return {?}
     */
    function () {
        this.listenForUserSelectedDayChanges();
        this.listenForValueChanges();
        this.listenForTouchChanges();
        this.listenForDirtyChanges();
        this.listenForInputRefocus();
    };
    /**
     * @return {?}
     */
    ClrDateInput.prototype.listenForUserSelectedDayChanges = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._dateNavigationService && this._dateIOService) {
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
        }
    };
    /**
     * @return {?}
     */
    ClrDateInput.prototype.listenForValueChanges = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // We do not emit an Output from this subscription because
        // we only emit the Output when the user has focused out of the input.
        if (this._dateNavigationService && this._dateIOService && this.control) {
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
    };
    /**
     * @return {?}
     */
    ClrDateInput.prototype.listenForTouchChanges = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.dateFormControlService) {
            this.subscriptions.push(this.dateFormControlService.touchedChange.subscribe(function () {
                if (_this.control) {
                    _this.control.control.markAsTouched();
                }
            }));
        }
    };
    /**
     * @return {?}
     */
    ClrDateInput.prototype.listenForDirtyChanges = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.subscriptions.push(this.dateFormControlService.dirtyChange.subscribe(function () {
            if (_this.control) {
                _this.control.control.markAsDirty();
            }
        }));
    };
    /**
     * @return {?}
     */
    ClrDateInput.prototype.listenForInputRefocus = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.subscriptions.push(this._dateNavigationService.selectedDayChange
            .pipe(filter(function (date) { return !!date; }))
            .subscribe(function (v) { return _this.datepickerFocusService.focusInput(_this.el.nativeElement); }));
    };
    ClrDateInput.decorators = [
        { type: Directive, args: [{
                    selector: '[clrDate]',
                    host: {
                        '[class.date-input]': '!newFormsLayout',
                        '[class.clr-input]': 'newFormsLayout',
                    },
                    providers: [DatepickerFocusService],
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
        { type: Boolean, decorators: [{ type: Optional }, { type: Inject, args: [IS_NEW_FORMS_LAYOUT,] }] },
        { type: DatepickerFocusService }
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
    /**
     * Output Management
     * Note: For now we will not emit both clrDateChange and ngControl outputs
     * at the same time. This requires us to listen to keydown and blur events to figure out
     * exactly when the Output should be emitted.
     * Our recommendation right now is to either use clrDate or use ngModel/FormControl.
     * Do not use both of them together.
     * @type {?}
     */
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
    /** @type {?} */
    ClrDateInput.prototype.datepickerFocusService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1pbnB1dC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImZvcm1zL2RhdGVwaWNrZXIvZGF0ZS1pbnB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBTUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDcEQsT0FBTyxFQUVMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFdBQVcsRUFDWCxZQUFZLEVBQ1osTUFBTSxFQUNOLFFBQVEsRUFDUixLQUFLLEVBR0wsUUFBUSxFQUNSLE1BQU0sRUFDTixXQUFXLEVBQ1gsU0FBUyxFQUNULElBQUksRUFDSixnQkFBZ0IsR0FDakIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDakUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDL0QsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQy9FLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUM1RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUM1RSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNsRixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUM1RSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUU5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LDhDQUFxQzs7SUEyQ3JDLG1DQUE2Qjs7Ozs7Ozs7OztJQTJCN0Isb0NBQTBGOztJQTdKeEYsMEJBQXdCOztJQUN4QixnQ0FBNkI7O0lBQzdCLCtCQUU0Qjs7SUFDNUIsaUNBQStDOztJQUMvQyxzQ0FBaUQ7O0lBQ2pELDhDQUFpRTs7SUFDakUsaURBQXVFOztJQUN2RSw4Q0FBa0U7O0lBQ2xFLGtDQUErQzs7SUFDL0Msb0NBQThDOztJQUM5QyxzQ0FFOEI7O0lBQzlCLDhDQUFzRCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RCaW5kaW5nLFxuICBIb3N0TGlzdGVuZXIsXG4gIEluamVjdCxcbiAgSW5qZWN0b3IsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbiAgUExBVEZPUk1fSUQsXG4gIFJlbmRlcmVyMixcbiAgU2VsZixcbiAgVmlld0NvbnRhaW5lclJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ0NvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IEZvY3VzU2VydmljZSB9IGZyb20gJy4uL2NvbW1vbi9wcm92aWRlcnMvZm9jdXMuc2VydmljZSc7XG5pbXBvcnQgeyBXcmFwcGVkRm9ybUNvbnRyb2wgfSBmcm9tICcuLi9jb21tb24vd3JhcHBlZC1jb250cm9sJztcbmltcG9ydCB7IENsckRhdGVDb250YWluZXIgfSBmcm9tICcuL2RhdGUtY29udGFpbmVyJztcbmltcG9ydCB7IERheU1vZGVsIH0gZnJvbSAnLi9tb2RlbC9kYXkubW9kZWwnO1xuaW1wb3J0IHsgRGF0ZUZvcm1Db250cm9sU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2RhdGUtZm9ybS1jb250cm9sLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0ZUlPU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2RhdGUtaW8uc2VydmljZSc7XG5pbXBvcnQgeyBEYXRlTmF2aWdhdGlvblNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9kYXRlLW5hdmlnYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBEYXRlcGlja2VyRW5hYmxlZFNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9kYXRlcGlja2VyLWVuYWJsZWQuc2VydmljZSc7XG5pbXBvcnQgeyBJU19ORVdfRk9STVNfTEFZT1VUIH0gZnJvbSAnLi4vY29tbW9uL3Byb3ZpZGVycy9uZXctZm9ybXMuc2VydmljZSc7XG5pbXBvcnQgeyBEYXRlcGlja2VyRm9jdXNTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvZGF0ZXBpY2tlci1mb2N1cy5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2NsckRhdGVdJyxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuZGF0ZS1pbnB1dF0nOiAnIW5ld0Zvcm1zTGF5b3V0JyxcbiAgICAnW2NsYXNzLmNsci1pbnB1dF0nOiAnbmV3Rm9ybXNMYXlvdXQnLFxuICB9LFxuICBwcm92aWRlcnM6IFtEYXRlcGlja2VyRm9jdXNTZXJ2aWNlXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyRGF0ZUlucHV0IGV4dGVuZHMgV3JhcHBlZEZvcm1Db250cm9sPENsckRhdGVDb250YWluZXI+IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICBwcm90ZWN0ZWQgaW5kZXggPSA0O1xuXG4gIC8vV2UgbmVlZCB0aGlzIHZhcmlhYmxlIGJlY2F1c2UgaWYgdGhlIGRhdGUgaW5wdXQgaGFzIGEgdmFsdWUgaW5pdGlhbGl6ZWRcbiAgLy93ZSBkbyBub3Qgb3V0cHV0IGl0LiBUaGlzIHZhcmlhYmxlIGlzIGZhbHNlIGR1cmluZyBpbml0aWFsIGxvYWQuIFdlIG1ha2Ugc3VyZSB0aGF0XG4gIC8vZHVyaW5nIGluaXRpYWwgbG9hZCBkYXlNb2RlbE91dHB1dHRlZCBpcyBlcXVhbCB0byB0aGUgdmFsdWUgZW50ZXJlZCBieSB0aGUgdXNlciBzbyB0aGF0IGluaXRpYWxpemVkXG4gIC8vdmFsdWUgaXNuJ3QgZW1pdHRlZCBiYWNrIHRvIHRoZSB1c2VyLiBBZnRlciBpbml0aWFsIGxvYWQsXG4gIC8vd2Ugc2V0IHRoaXMgdG8gdHJ1ZSBhbmQgdGhlIGRheU1vZGVsT3V0cHV0dGVkIGlzIHNldCBvbmx5XG4gIC8vd2hlbiB0aGUgT3V0cHV0IGlzIGVtaXR0ZWQgdG8gdGhlIHVzZXIuXG4gIHByaXZhdGUgcHJldmlvdXNPdXRwdXRJbml0aWFsaXplZEZsYWc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBwcmV2aW91c091dHB1dDogRGF5TW9kZWw7XG5cbiAgcHJpdmF0ZSBpbml0aWFsaXplUHJldmlvdXNPdXRwdXQoZGF5TW9kZWw6IERheU1vZGVsKSB7XG4gICAgaWYgKCF0aGlzLnByZXZpb3VzT3V0cHV0SW5pdGlhbGl6ZWRGbGFnKSB7XG4gICAgICB0aGlzLnByZXZpb3VzT3V0cHV0ID0gZGF5TW9kZWw7XG4gICAgICB0aGlzLnByZXZpb3VzT3V0cHV0SW5pdGlhbGl6ZWRGbGFnID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoKSBjbHJOZXdMYXlvdXQ6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgdmNyOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIGluamVjdG9yOiBJbmplY3RvcixcbiAgICBwcm90ZWN0ZWQgZWw6IEVsZW1lbnRSZWYsXG4gICAgcHJvdGVjdGVkIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgQFNlbGYoKVxuICAgIEBPcHRpb25hbCgpXG4gICAgcHJvdGVjdGVkIGNvbnRyb2w6IE5nQ29udHJvbCxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGNvbnRhaW5lcjogQ2xyRGF0ZUNvbnRhaW5lcixcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIF9kYXRlSU9TZXJ2aWNlOiBEYXRlSU9TZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgX2RhdGVOYXZpZ2F0aW9uU2VydmljZTogRGF0ZU5hdmlnYXRpb25TZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgX2RhdGVwaWNrZXJFbmFibGVkU2VydmljZTogRGF0ZXBpY2tlckVuYWJsZWRTZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZGF0ZUZvcm1Db250cm9sU2VydmljZTogRGF0ZUZvcm1Db250cm9sU2VydmljZSxcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IE9iamVjdCxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGZvY3VzU2VydmljZTogRm9jdXNTZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpXG4gICAgQEluamVjdChJU19ORVdfRk9STVNfTEFZT1VUKVxuICAgIHB1YmxpYyBuZXdGb3Jtc0xheW91dDogYm9vbGVhbixcbiAgICBwcml2YXRlIGRhdGVwaWNrZXJGb2N1c1NlcnZpY2U6IERhdGVwaWNrZXJGb2N1c1NlcnZpY2VcbiAgKSB7XG4gICAgc3VwZXIodmNyLCBDbHJEYXRlQ29udGFpbmVyLCBpbmplY3RvciwgY29udHJvbCwgcmVuZGVyZXIsIGVsKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gICAgdGhpcy5wb3B1bGF0ZVNlcnZpY2VzRnJvbUNvbnRhaW5lckNvbXBvbmVudCgpO1xuICAgIHRoaXMuaW5pdGlhbGl6ZVN1YnNjcmlwdGlvbnMoKTtcbiAgICB0aGlzLnByb2Nlc3NJbml0aWFsSW5wdXRzKCk7XG4gICAgdGhpcy5zZXRGb3JtTGF5b3V0KCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy53cml0ZUluaXRpYWxJbnB1dEZyb21Vc2VySW5wdXRGaWVsZCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBwb3B1bGF0ZVNlcnZpY2VzRnJvbUNvbnRhaW5lckNvbXBvbmVudCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuY29udGFpbmVyKSB7XG4gICAgICB0aGlzLl9kYXRlSU9TZXJ2aWNlID0gdGhpcy5nZXRQcm92aWRlckZyb21Db250YWluZXIoRGF0ZUlPU2VydmljZSk7XG4gICAgICB0aGlzLl9kYXRlTmF2aWdhdGlvblNlcnZpY2UgPSB0aGlzLmdldFByb3ZpZGVyRnJvbUNvbnRhaW5lcihEYXRlTmF2aWdhdGlvblNlcnZpY2UpO1xuICAgICAgdGhpcy5fZGF0ZXBpY2tlckVuYWJsZWRTZXJ2aWNlID0gdGhpcy5nZXRQcm92aWRlckZyb21Db250YWluZXIoRGF0ZXBpY2tlckVuYWJsZWRTZXJ2aWNlKTtcbiAgICAgIHRoaXMuZGF0ZUZvcm1Db250cm9sU2VydmljZSA9IHRoaXMuZ2V0UHJvdmlkZXJGcm9tQ29udGFpbmVyKERhdGVGb3JtQ29udHJvbFNlcnZpY2UpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcHJvY2Vzc0luaXRpYWxJbnB1dHMoKTogdm9pZCB7XG4gICAgLy8gUHJvY2VzcyB0aGUgaW5wdXRzIGluaXRpYWxpemVkIGJ5IHRoZSB1c2VyIHdoaWNoIHdlcmUgbWlzc2VkXG4gICAgLy8gYmVjYXVzZSBvZiBsYXRlIHN1YnNjcmlwdGlvbnMgb3IgbGlmZWN5Y2xlIG1ldGhvZCBjYWxscy5cbiAgICB0aGlzLnByb2Nlc3NVc2VyRGF0ZU9iamVjdCh0aGlzLmRhdGVWYWx1ZU9uSW5pdGlhbExvYWQpO1xuXG4gICAgLy8gSGFuZGxlIEluaXRpYWwgVmFsdWUgZnJvbSBSZWFjdGl2ZSBGb3Jtc1xuICAgIC8vIFRPRE86IFdlIGFyZSByZXBlYXRpbmcgdGhpcyBsb2dpYyBhdCBtdWx0aXBsZSBwbGFjZXMuIFRoaXMgbWFrZXMgbWUgdGhpbmtcbiAgICAvLyBpZiB0aGlzIGNsYXNzIHNob3VsZCBoYXZlIGltcGxlbWVudGVkIHRoZSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2UuXG4gICAgLy8gV2lsbCBleHBsb3JlIHRoYXQgbGF0ZXIgYW5kIHNlZSBpZiBpdHMgYSBjbGVhbmVyIHNvbHV0aW9uLlxuICAgIGlmICh0aGlzLmNvbnRyb2wgJiYgdGhpcy5jb250cm9sLnZhbHVlKSB7XG4gICAgICB0aGlzLnVwZGF0ZUlucHV0VmFsdWUodGhpcy5jb250cm9sLnZhbHVlKTtcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZVByZXZpb3VzT3V0cHV0KHRoaXMuX2RhdGVOYXZpZ2F0aW9uU2VydmljZS5zZWxlY3RlZERheSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRGb3JtTGF5b3V0KCkge1xuICAgIGlmICh0aGlzLmNsck5ld0xheW91dCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLm5ld0Zvcm1zTGF5b3V0ID0gISF0aGlzLmNsck5ld0xheW91dDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHdyaXRlSW5pdGlhbElucHV0RnJvbVVzZXJJbnB1dEZpZWxkKCkge1xuICAgIC8vIEkgZG9uJ3Qga25vdyB3aHkgSSBoYXZlIHRvIGRvIHRoaXMgYnV0IGFmdGVyIHVzaW5nIHRoZSBuZXcgSG9zdFdyYXBwaW5nIE1vZHVsZSBJIGhhdmUgdG8gZGVsYXkgdGhlIHByb2Nlc3NpbmdcbiAgICAvLyBvZiB0aGUgaW5pdGlhbCBJbnB1dCBzZXQgYnkgdGhlIHVzZXIgdG8gaGVyZS4gIElmIEkgZG8gbm90IDIgaXNzdWVzIG9jY3VyOlxuICAgIC8vIDEuIHRoZSBJbnB1dCBzZXR0ZXIgaXMgY2FsbGVkIGJlZm9yZSBuZ09uSW5pdC4gbmdPbkluaXQgaW5pdGlhbGl6ZXMgdGhlIHNlcnZpY2VzIHdpdGhvdXQgd2hpY2ggdGhlIHNldHRlclxuICAgIC8vIGZhaWxzXG4gICAgLy8gMi4gVGhlIFJlbmRlcmVyIGRvZXNuJ3Qgd29yayBiZWZvcmUgbmdBZnRlclZpZXdJbml0XG4gICAgLy8oSXQgdXNlZCB0byBiZWZvcmUgdGhlIG5ldyBIb3N0V3JhcHBpbmcgTW9kdWxlIGZvciBzb21lIHJlYXNvbikuXG4gICAgLy8gSSBuZWVkIHRoZSByZW5kZXJlciB0byBzZXQgdGhlIHZhbHVlIHByb3BlcnR5IG9uIHRoZSBpbnB1dCB0byBtYWtlIHN1cmUgdGhhdCBpZiB0aGUgdXNlciBoYXMgc3VwcGxpZWQgYSBEYXRlXG4gICAgLy8gaW5wdXQgb2JqZWN0LCAgd2UgcmVmbGVjdCBpdCB3aXRoIHRoZSByaWdodCBkYXRlIG9uIHRoZSBpbnB1dCBmaWVsZCB1c2luZyB0aGUgSU8gc2VydmljZS4gIEkgYW0gbm90IHN1cmUgaWZcbiAgICAvLyB0aGVzZSBhcmUgbWFqb3IgaXNzdWVzIG9yIG5vdCBidXQganVzdCBub3RpbmcgdGhlbSBkb3duIGhlcmUuXG4gICAgaWYgKHRoaXMuX2RhdGVOYXZpZ2F0aW9uU2VydmljZSkge1xuICAgICAgY29uc3Qgc2VsRGF5OiBEYXlNb2RlbCA9IHRoaXMuX2RhdGVOYXZpZ2F0aW9uU2VydmljZS5zZWxlY3RlZERheTtcbiAgICAgIGlmIChzZWxEYXkpIHtcbiAgICAgICAgY29uc3QgZGF0ZVN0cjogc3RyaW5nID0gdGhpcy5fZGF0ZUlPU2VydmljZS50b0xvY2FsZURpc3BsYXlGb3JtYXRTdHJpbmcoc2VsRGF5LnRvRGF0ZSgpKTtcbiAgICAgICAgdGhpcy53cml0ZURhdGVTdHJUb0lucHV0RmllbGQoZGF0ZVN0cik7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuaW5pdGlhbExvYWQgPSBmYWxzZTtcbiAgfVxuXG4gIHByaXZhdGUgd3JpdGVEYXRlU3RyVG9JbnB1dEZpZWxkKHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3ZhbHVlJywgdmFsdWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0aWFsTG9hZDogYm9vbGVhbiA9IHRydWU7XG4gIHByaXZhdGUgZGF0ZVZhbHVlT25Jbml0aWFsTG9hZDogRGF0ZTtcblxuICAvKipcbiAgICogSmF2YXNjcmlwdCBEYXRlIG9iamVjdCBpbnB1dCBzZXQgYnkgdGhlIHVzZXIuXG4gICAqL1xuICBASW5wdXQoJ2NsckRhdGUnKVxuICBzZXQgZGF0ZSh2YWx1ZTogRGF0ZSkge1xuICAgIGlmICh0aGlzLmluaXRpYWxMb2FkKSB7XG4gICAgICAvLyBTdG9yZSBkYXRlIHZhbHVlIHBhc3NlZCBieSB0aGUgdXNlciB0byBwcm9jZXNzIGFmdGVyIHRoZSBzZXJ2aWNlcyBoYXZlIGJlZW4gaW5pdGlhbGl6ZWQgYnlcbiAgICAgIC8vIHRoZSBuZ09uSW5pdCBob29rLlxuICAgICAgdGhpcy5kYXRlVmFsdWVPbkluaXRpYWxMb2FkID0gdmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucHJvY2Vzc1VzZXJEYXRlT2JqZWN0KHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUHJvY2Vzc2VzIGEgZGF0ZSBvYmplY3QgdG8gY2hlY2sgaWYgaXRzIHZhbGlkIG9yIG5vdC5cbiAgICovXG4gIHByaXZhdGUgcHJvY2Vzc1VzZXJEYXRlT2JqZWN0KHZhbHVlOiBEYXRlKSB7XG4gICAgaWYgKHRoaXMuX2RhdGVJT1NlcnZpY2UpIHtcbiAgICAgIC8vIFRoZSBkYXRlIG9iamVjdCBpcyBjb252ZXJ0ZWQgYmFjayB0byBzdHJpbmcgYmVjYXVzZSBpbiBKYXZhc2NyaXB0IHlvdSBjYW4gY3JlYXRlIGEgZGF0ZSBvYmplY3RcbiAgICAgIC8vIGxpa2UgdGhpczogbmV3IERhdGUoXCJUZXN0XCIpLiBUaGlzIGlzIGEgZGF0ZSBvYmplY3QgYnV0IGl0IGlzIGludmFsaWQuIENvbnZlcnRpbmcgdGhlIGRhdGUgb2JqZWN0XG4gICAgICAvLyB0aGF0IHRoZSB1c2VyIHBhc3NlZCBoZWxwcyB1cyB0byB2ZXJpZnkgdGhlIHZhbGlkaXR5IG9mIHRoZSBkYXRlIG9iamVjdC5cbiAgICAgIGNvbnN0IGRhdGVTdHI6IHN0cmluZyA9IHRoaXMuX2RhdGVJT1NlcnZpY2UudG9Mb2NhbGVEaXNwbGF5Rm9ybWF0U3RyaW5nKHZhbHVlKTtcbiAgICAgIHRoaXMudXBkYXRlSW5wdXRWYWx1ZShkYXRlU3RyKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZUlucHV0VmFsdWUoZGF0ZVN0cjogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgZGF0ZTogRGF0ZSA9IHRoaXMuX2RhdGVJT1NlcnZpY2UuaXNWYWxpZElucHV0KGRhdGVTdHIpO1xuICAgIGlmIChkYXRlKSB7XG4gICAgICBjb25zdCBkYXlNb2RlbDogRGF5TW9kZWwgPSBuZXcgRGF5TW9kZWwoZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXRlLmdldE1vbnRoKCksIGRhdGUuZ2V0RGF0ZSgpKTtcbiAgICAgIGlmICghZGF5TW9kZWwuaXNFcXVhbCh0aGlzLl9kYXRlTmF2aWdhdGlvblNlcnZpY2Uuc2VsZWN0ZWREYXkpKSB7XG4gICAgICAgIHRoaXMucHJldmlvdXNPdXRwdXQgPSBkYXlNb2RlbDtcbiAgICAgICAgdGhpcy5fZGF0ZU5hdmlnYXRpb25TZXJ2aWNlLnNlbGVjdGVkRGF5ID0gZGF5TW9kZWw7XG4gICAgICAgIHRoaXMud3JpdGVEYXRlU3RyVG9JbnB1dEZpZWxkKGRhdGVTdHIpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9kYXRlTmF2aWdhdGlvblNlcnZpY2Uuc2VsZWN0ZWREYXkgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGRhdGUgZm9ybWF0IGZvciB0aGUgcGxhY2Vob2xkZXIgYWNjb3JkaW5nIHRvIHdoaWNoIHRoZSBpbnB1dCBzaG91bGQgYmUgZW50ZXJlZCBieSB0aGUgdXNlci5cbiAgICovXG4gIEBIb3N0QmluZGluZygnYXR0ci5wbGFjZWhvbGRlcicpXG4gIGdldCBwbGFjZWhvbGRlclRleHQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5wbGFjZWhvbGRlciA/IHRoaXMucGxhY2Vob2xkZXIgOiB0aGlzLl9kYXRlSU9TZXJ2aWNlLnBsYWNlaG9sZGVyVGV4dDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBpbnB1dCB0eXBlIHRvIHRleHQgd2hlbiB0aGUgZGF0ZXBpY2tlciBpcyBlbmFibGVkLiBSZXZlcnRzIGJhY2sgdG8gdGhlIG5hdGl2ZSBkYXRlIGlucHV0XG4gICAqIHdoZW4gdGhlIGRhdGVwaWNrZXIgaXMgZGlzYWJsZWQuIERhdGVwaWNrZXIgaXMgZGlzYWJsZWQgb24gbW9iaWxlcy5cbiAgICovXG4gIEBIb3N0QmluZGluZygnYXR0ci50eXBlJylcbiAgZ2V0IGlucHV0VHlwZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiBpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpICYmIHRoaXMuX2RhdGVwaWNrZXJFbmFibGVkU2VydmljZS5pc0VuYWJsZWQgPyAndGV4dCcgOiAnZGF0ZSc7XG4gIH1cblxuICAvKipcbiAgICogT3V0cHV0IE1hbmFnZW1lbnRcbiAgICogTm90ZTogRm9yIG5vdyB3ZSB3aWxsIG5vdCBlbWl0IGJvdGggY2xyRGF0ZUNoYW5nZSBhbmQgbmdDb250cm9sIG91dHB1dHNcbiAgICogYXQgdGhlIHNhbWUgdGltZS4gVGhpcyByZXF1aXJlcyB1cyB0byBsaXN0ZW4gdG8ga2V5ZG93biBhbmQgYmx1ciBldmVudHMgdG8gZmlndXJlIG91dFxuICAgKiBleGFjdGx5IHdoZW4gdGhlIE91dHB1dCBzaG91bGQgYmUgZW1pdHRlZC5cbiAgICogT3VyIHJlY29tbWVuZGF0aW9uIHJpZ2h0IG5vdyBpcyB0byBlaXRoZXIgdXNlIGNsckRhdGUgb3IgdXNlIG5nTW9kZWwvRm9ybUNvbnRyb2wuXG4gICAqIERvIG5vdCB1c2UgYm90aCBvZiB0aGVtIHRvZ2V0aGVyLlxuICAgKi9cbiAgQE91dHB1dCgnY2xyRGF0ZUNoYW5nZScpIF9kYXRlVXBkYXRlZDogRXZlbnRFbWl0dGVyPERhdGU+ID0gbmV3IEV2ZW50RW1pdHRlcjxEYXRlPihmYWxzZSk7XG5cbiAgQEhvc3RMaXN0ZW5lcignZm9jdXMnKVxuICBzZXRGb2N1c1N0YXRlcygpIHtcbiAgICB0aGlzLnNldEZvY3VzKHRydWUpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignYmx1cicpXG4gIHRyaWdnZXJWYWxpZGF0aW9uKCkge1xuICAgIHN1cGVyLnRyaWdnZXJWYWxpZGF0aW9uKCk7XG4gICAgdGhpcy5zZXRGb2N1cyhmYWxzZSk7XG4gIH1cblxuICAvKipcbiAgICogRmlyZXMgdGhpcyBtZXRob2Qgd2hlbiB0aGUgdXNlciBjaGFuZ2VzIHRoZSBpbnB1dCBmb2N1c2VzIG91dCBvZiB0aGUgaW5wdXQgZmllbGQuXG4gICAqL1xuICBASG9zdExpc3RlbmVyKCdjaGFuZ2UnLCBbJyRldmVudC50YXJnZXQnXSlcbiAgb25WYWx1ZUNoYW5nZSh0YXJnZXQ6IEhUTUxJbnB1dEVsZW1lbnQpIHtcbiAgICBjb25zdCB2YWx1ZTogc3RyaW5nID0gdGFyZ2V0LnZhbHVlO1xuICAgIGNvbnN0IGRhdGU6IERhdGUgPSB0aGlzLl9kYXRlSU9TZXJ2aWNlLmlzVmFsaWRJbnB1dCh2YWx1ZSk7XG4gICAgaWYgKGRhdGUpIHtcbiAgICAgIGNvbnN0IGRheU1vZGVsOiBEYXlNb2RlbCA9IG5ldyBEYXlNb2RlbChkYXRlLmdldEZ1bGxZZWFyKCksIGRhdGUuZ2V0TW9udGgoKSwgZGF0ZS5nZXREYXRlKCkpO1xuICAgICAgdGhpcy5fZGF0ZU5hdmlnYXRpb25TZXJ2aWNlLnNlbGVjdGVkRGF5ID0gZGF5TW9kZWw7XG4gICAgICB0aGlzLmVtaXREYXRlT3V0cHV0KGRheU1vZGVsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZGF0ZU5hdmlnYXRpb25TZXJ2aWNlLnNlbGVjdGVkRGF5ID0gbnVsbDtcbiAgICAgIHRoaXMuZW1pdERhdGVPdXRwdXQobnVsbCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBlbWl0RGF0ZU91dHB1dChkYXlNb2RlbDogRGF5TW9kZWwpOiB2b2lkIHtcbiAgICBpZiAoZGF5TW9kZWwgJiYgIWRheU1vZGVsLmlzRXF1YWwodGhpcy5wcmV2aW91c091dHB1dCkpIHtcbiAgICAgIHRoaXMuX2RhdGVVcGRhdGVkLmVtaXQoZGF5TW9kZWwudG9EYXRlKCkpO1xuICAgICAgdGhpcy5wcmV2aW91c091dHB1dCA9IGRheU1vZGVsO1xuICAgIH0gZWxzZSBpZiAoIWRheU1vZGVsICYmIHRoaXMucHJldmlvdXNPdXRwdXQpIHtcbiAgICAgIHRoaXMuX2RhdGVVcGRhdGVkLmVtaXQobnVsbCk7XG4gICAgICB0aGlzLnByZXZpb3VzT3V0cHV0ID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldEZvY3VzKGZvY3VzOiBib29sZWFuKSB7XG4gICAgaWYgKHRoaXMuZm9jdXNTZXJ2aWNlKSB7XG4gICAgICB0aGlzLmZvY3VzU2VydmljZS5mb2N1c2VkID0gZm9jdXM7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBpbml0aWFsaXplU3Vic2NyaXB0aW9ucygpOiB2b2lkIHtcbiAgICB0aGlzLmxpc3RlbkZvclVzZXJTZWxlY3RlZERheUNoYW5nZXMoKTtcbiAgICB0aGlzLmxpc3RlbkZvclZhbHVlQ2hhbmdlcygpO1xuICAgIHRoaXMubGlzdGVuRm9yVG91Y2hDaGFuZ2VzKCk7XG4gICAgdGhpcy5saXN0ZW5Gb3JEaXJ0eUNoYW5nZXMoKTtcbiAgICB0aGlzLmxpc3RlbkZvcklucHV0UmVmb2N1cygpO1xuICB9XG5cbiAgcHJpdmF0ZSBsaXN0ZW5Gb3JVc2VyU2VsZWN0ZWREYXlDaGFuZ2VzKCkge1xuICAgIGlmICh0aGlzLl9kYXRlTmF2aWdhdGlvblNlcnZpY2UgJiYgdGhpcy5fZGF0ZUlPU2VydmljZSkge1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICAgIHRoaXMuX2RhdGVOYXZpZ2F0aW9uU2VydmljZS5zZWxlY3RlZERheUNoYW5nZS5zdWJzY3JpYmUoKGRheU1vZGVsOiBEYXlNb2RlbCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGRhdGVTdHI6IHN0cmluZyA9IHRoaXMuX2RhdGVJT1NlcnZpY2UudG9Mb2NhbGVEaXNwbGF5Rm9ybWF0U3RyaW5nKGRheU1vZGVsLnRvRGF0ZSgpKTtcbiAgICAgICAgICB0aGlzLndyaXRlRGF0ZVN0clRvSW5wdXRGaWVsZChkYXRlU3RyKTtcbiAgICAgICAgICAvLyBUaGlzIG1ha2VzIHN1cmUgdGhhdCBuZ01vZGVsQ2hhbmdlIGlzIGZpcmVkXG4gICAgICAgICAgLy8gVE9ETzogQ2hlY2sgaWYgdGhlcmUgaXMgYSBiZXR0ZXIgd2F5IHRvIGRvIHRoaXMuXG4gICAgICAgICAgLy8gTk9URTogSXRzIGltcG9ydGFudCB0byB1c2UgTmdDb250cm9sIGFuZCBub3QgTmdNb2RlbCBiZWNhdXNlXG4gICAgICAgICAgLy8gTmdNb2RlbCBvbmx5IHdvcmtzIHdpdGggdGVtcGxhdGUgZHJpdmVuIGZvcm1zXG4gICAgICAgICAgaWYgKHRoaXMuY29udHJvbCkge1xuICAgICAgICAgICAgdGhpcy5jb250cm9sLmNvbnRyb2wuc2V0VmFsdWUoZGF0ZVN0cik7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuZW1pdERhdGVPdXRwdXQoZGF5TW9kZWwpO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGxpc3RlbkZvclZhbHVlQ2hhbmdlcygpIHtcbiAgICAvLyBXZSBkbyBub3QgZW1pdCBhbiBPdXRwdXQgZnJvbSB0aGlzIHN1YnNjcmlwdGlvbiBiZWNhdXNlXG4gICAgLy8gd2Ugb25seSBlbWl0IHRoZSBPdXRwdXQgd2hlbiB0aGUgdXNlciBoYXMgZm9jdXNlZCBvdXQgb2YgdGhlIGlucHV0LlxuICAgIGlmICh0aGlzLl9kYXRlTmF2aWdhdGlvblNlcnZpY2UgJiYgdGhpcy5fZGF0ZUlPU2VydmljZSAmJiB0aGlzLmNvbnRyb2wpIHtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgICB0aGlzLmNvbnRyb2wudmFsdWVDaGFuZ2VzLnN1YnNjcmliZSgodmFsdWU6IHN0cmluZykgPT4ge1xuICAgICAgICAgIGNvbnN0IGRhdGU6IERhdGUgPSB0aGlzLl9kYXRlSU9TZXJ2aWNlLmlzVmFsaWRJbnB1dCh2YWx1ZSk7XG4gICAgICAgICAgaWYgKGRhdGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGRheU1vZGVsOiBEYXlNb2RlbCA9IG5ldyBEYXlNb2RlbChkYXRlLmdldEZ1bGxZZWFyKCksIGRhdGUuZ2V0TW9udGgoKSwgZGF0ZS5nZXREYXRlKCkpO1xuICAgICAgICAgICAgdGhpcy5fZGF0ZU5hdmlnYXRpb25TZXJ2aWNlLnNlbGVjdGVkRGF5ID0gZGF5TW9kZWw7XG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpemVQcmV2aW91c091dHB1dChkYXlNb2RlbCk7XG4gICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gJycgfHwgdmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX2RhdGVOYXZpZ2F0aW9uU2VydmljZS5zZWxlY3RlZERheSA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpemVQcmV2aW91c091dHB1dChudWxsKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplUHJldmlvdXNPdXRwdXQobnVsbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGxpc3RlbkZvclRvdWNoQ2hhbmdlcygpIHtcbiAgICBpZiAodGhpcy5kYXRlRm9ybUNvbnRyb2xTZXJ2aWNlKSB7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgICAgdGhpcy5kYXRlRm9ybUNvbnRyb2xTZXJ2aWNlLnRvdWNoZWRDaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5jb250cm9sKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRyb2wuY29udHJvbC5tYXJrQXNUb3VjaGVkKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGxpc3RlbkZvckRpcnR5Q2hhbmdlcygpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMuZGF0ZUZvcm1Db250cm9sU2VydmljZS5kaXJ0eUNoYW5nZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5jb250cm9sKSB7XG4gICAgICAgICAgdGhpcy5jb250cm9sLmNvbnRyb2wubWFya0FzRGlydHkoKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBsaXN0ZW5Gb3JJbnB1dFJlZm9jdXMoKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLl9kYXRlTmF2aWdhdGlvblNlcnZpY2Uuc2VsZWN0ZWREYXlDaGFuZ2VcbiAgICAgICAgLnBpcGUoZmlsdGVyKGRhdGUgPT4gISFkYXRlKSlcbiAgICAgICAgLnN1YnNjcmliZSh2ID0+IHRoaXMuZGF0ZXBpY2tlckZvY3VzU2VydmljZS5mb2N1c0lucHV0KHRoaXMuZWwubmF0aXZlRWxlbWVudCkpXG4gICAgKTtcbiAgfVxufVxuIl19