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
            controlClassService.initControlClass(_this.renderer, _this.elRef.nativeElement);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1pbnB1dC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImZvcm1zL2RhdGVwaWNrZXIvZGF0ZS1pbnB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBTUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDcEQsT0FBTyxFQUVMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFdBQVcsRUFDWCxZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFHTCxRQUFRLEVBQ1IsTUFBTSxFQUNOLFdBQVcsRUFDWCxTQUFTLEVBQ1QsSUFBSSxFQUNKLGdCQUFnQixHQUNqQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFM0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNqRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUUxRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUUvRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDN0MsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDL0UsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzVELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzVFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ2xGLE9BQU8sRUFB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biAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdEJpbmRpbmcsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFBMQVRGT1JNX0lELFxuICBSZW5kZXJlcjIsXG4gIFNlbGYsXG4gIFZpZXdDb250YWluZXJSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBJZkVycm9yU2VydmljZSB9IGZyb20gJy4uL2NvbW1vbi9pZi1lcnJvci9pZi1lcnJvci5zZXJ2aWNlJztcbmltcG9ydCB7IENvbnRyb2xDbGFzc1NlcnZpY2UgfSBmcm9tICcuLi9jb21tb24vcHJvdmlkZXJzL2NvbnRyb2wtY2xhc3Muc2VydmljZSc7XG5pbXBvcnQgeyBGb2N1c1NlcnZpY2UgfSBmcm9tICcuLi9jb21tb24vcHJvdmlkZXJzL2ZvY3VzLnNlcnZpY2UnO1xuaW1wb3J0IHsgTmdDb250cm9sU2VydmljZSB9IGZyb20gJy4uL2NvbW1vbi9wcm92aWRlcnMvbmctY29udHJvbC5zZXJ2aWNlJztcblxuaW1wb3J0IHsgV3JhcHBlZEZvcm1Db250cm9sIH0gZnJvbSAnLi4vY29tbW9uL3dyYXBwZWQtY29udHJvbCc7XG5cbmltcG9ydCB7IENsckRhdGVDb250YWluZXIgfSBmcm9tICcuL2RhdGUtY29udGFpbmVyJztcbmltcG9ydCB7IERheU1vZGVsIH0gZnJvbSAnLi9tb2RlbC9kYXkubW9kZWwnO1xuaW1wb3J0IHsgRGF0ZUZvcm1Db250cm9sU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2RhdGUtZm9ybS1jb250cm9sLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0ZUlPU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2RhdGUtaW8uc2VydmljZSc7XG5pbXBvcnQgeyBEYXRlTmF2aWdhdGlvblNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9kYXRlLW5hdmlnYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBEYXRlcGlja2VyRW5hYmxlZFNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9kYXRlcGlja2VyLWVuYWJsZWQuc2VydmljZSc7XG5pbXBvcnQgeyBJU19ORVdfRk9STVNfTEFZT1VUIH0gZnJvbSAnLi4vY29tbW9uL3Byb3ZpZGVycy9uZXctZm9ybXMuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tjbHJEYXRlXScsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmRhdGUtaW5wdXRdJzogJyFuZXdGb3Jtc0xheW91dCcsXG4gICAgJ1tjbGFzcy5jbHItaW5wdXRdJzogJ25ld0Zvcm1zTGF5b3V0JyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyRGF0ZUlucHV0IGV4dGVuZHMgV3JhcHBlZEZvcm1Db250cm9sPENsckRhdGVDb250YWluZXI+IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICAvKipcbiAgICogU3Vic2NyaXB0aW9ucyB0byBhbGwgdGhlIHNlcnZpY2VzIGFuZCBxdWVyaWVzIGNoYW5nZXNcbiAgICovXG4gIHByaXZhdGUgX3N1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgLy9XZSBuZWVkIHRoaXMgdmFyaWFibGUgYmVjYXVzZSBpZiB0aGUgZGF0ZSBpbnB1dCBoYXMgYSB2YWx1ZSBpbml0aWFsaXplZFxuICAvL3dlIGRvIG5vdCBvdXRwdXQgaXQuIFRoaXMgdmFyaWFibGUgaXMgZmFsc2UgZHVyaW5nIGluaXRpYWwgbG9hZC4gV2UgbWFrZSBzdXJlIHRoYXRcbiAgLy9kdXJpbmcgaW5pdGlhbCBsb2FkIGRheU1vZGVsT3V0cHV0dGVkIGlzIGVxdWFsIHRvIHRoZSB2YWx1ZSBlbnRlcmVkIGJ5IHRoZSB1c2VyIHNvIHRoYXQgaW5pdGlhbGl6ZWRcbiAgLy92YWx1ZSBpc24ndCBlbWl0dGVkIGJhY2sgdG8gdGhlIHVzZXIuIEFmdGVyIGluaXRpYWwgbG9hZCxcbiAgLy93ZSBzZXQgdGhpcyB0byB0cnVlIGFuZCB0aGUgZGF5TW9kZWxPdXRwdXR0ZWQgaXMgc2V0IG9ubHlcbiAgLy93aGVuIHRoZSBPdXRwdXQgaXMgZW1pdHRlZCB0byB0aGUgdXNlci5cbiAgcHJpdmF0ZSBwcmV2aW91c091dHB1dEluaXRpYWxpemVkRmxhZzogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIHByZXZpb3VzT3V0cHV0OiBEYXlNb2RlbDtcblxuICBwcml2YXRlIGluaXRpYWxpemVQcmV2aW91c091dHB1dChkYXlNb2RlbDogRGF5TW9kZWwpIHtcbiAgICBpZiAoIXRoaXMucHJldmlvdXNPdXRwdXRJbml0aWFsaXplZEZsYWcpIHtcbiAgICAgIHRoaXMucHJldmlvdXNPdXRwdXQgPSBkYXlNb2RlbDtcbiAgICAgIHRoaXMucHJldmlvdXNPdXRwdXRJbml0aWFsaXplZEZsYWcgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgpIGNsck5ld0xheW91dDogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGNvbnRhaW5lcjogQ2xyRGF0ZUNvbnRhaW5lcixcbiAgICB2Y3I6IFZpZXdDb250YWluZXJSZWYsXG4gICAgcHJpdmF0ZSBlbFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgQFNlbGYoKVxuICAgIEBPcHRpb25hbCgpXG4gICAgcHJpdmF0ZSBfbmdDb250cm9sOiBOZ0NvbnRyb2wsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBfZGF0ZUlPU2VydmljZTogRGF0ZUlPU2VydmljZSxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIF9kYXRlTmF2aWdhdGlvblNlcnZpY2U6IERhdGVOYXZpZ2F0aW9uU2VydmljZSxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIF9kYXRlcGlja2VyRW5hYmxlZFNlcnZpY2U6IERhdGVwaWNrZXJFbmFibGVkU2VydmljZSxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGRhdGVGb3JtQ29udHJvbFNlcnZpY2U6IERhdGVGb3JtQ29udHJvbFNlcnZpY2UsXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBPYmplY3QsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBuZ0NvbnRyb2xTZXJ2aWNlOiBOZ0NvbnRyb2xTZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpIGNvbnRyb2xDbGFzc1NlcnZpY2U6IENvbnRyb2xDbGFzc1NlcnZpY2UsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBmb2N1c1NlcnZpY2U6IEZvY3VzU2VydmljZSxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGlmRXJyb3JTZXJ2aWNlOiBJZkVycm9yU2VydmljZSxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGNvbnRyb2w6IE5nQ29udHJvbCxcbiAgICBAT3B0aW9uYWwoKVxuICAgIEBJbmplY3QoSVNfTkVXX0ZPUk1TX0xBWU9VVClcbiAgICBwdWJsaWMgbmV3Rm9ybXNMYXlvdXQ6IGJvb2xlYW5cbiAgKSB7XG4gICAgc3VwZXIoQ2xyRGF0ZUNvbnRhaW5lciwgdmNyLCA0KTtcblxuICAgIGlmIChjb250cm9sQ2xhc3NTZXJ2aWNlKSB7XG4gICAgICBjb250cm9sQ2xhc3NTZXJ2aWNlLmluaXRDb250cm9sQ2xhc3ModGhpcy5yZW5kZXJlciwgdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogMS4gUG9wdWxhdGUgc2VydmljZXMgaWYgdGhlIGRhdGUgY29udGFpbmVyIGlzIG5vdCBwcmVzZW50LlxuICAgKiAyLiBJbml0aWFsaXplIFN1YnNjcmlwdGlvbnMuXG4gICAqIDMuIFByb2Nlc3MgVXNlciBJbnB1dC5cbiAgICovXG4gIG5nT25Jbml0KCkge1xuICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gICAgaWYgKHRoaXMubmdDb250cm9sU2VydmljZSAmJiB0aGlzLmNvbnRyb2wpIHtcbiAgICAgIHRoaXMubmdDb250cm9sU2VydmljZS5zZXRDb250cm9sKHRoaXMuY29udHJvbCk7XG4gICAgfVxuICAgIGlmICghdGhpcy5jb250YWluZXIpIHtcbiAgICAgIHRoaXMucG9wdWxhdGVDb250YWluZXJTZXJ2aWNlcygpO1xuICAgIH1cbiAgICB0aGlzLmluaXRpYWxpemVTdWJzY3JpcHRpb25zKCk7XG4gICAgdGhpcy5wcm9jZXNzSW5pdGlhbElucHV0cygpO1xuICAgIGlmICh0aGlzLmNsck5ld0xheW91dCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLm5ld0Zvcm1zTGF5b3V0ID0gISF0aGlzLmNsck5ld0xheW91dDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUHJvY2VzcyB0aGUgaW5wdXRzIGluaXRpYWxpemVkIGJ5IHRoZSB1c2VyIHdoaWNoIHdlcmUgbWlzc2VkXG4gICAqIGJlY2F1c2Ugb2YgbGF0ZSBzdWJzY3JpcHRpb25zIG9yIGxpZmVjeWNsZSBtZXRob2QgY2FsbHMuXG4gICAqL1xuICBwcml2YXRlIHByb2Nlc3NJbml0aWFsSW5wdXRzKCk6IHZvaWQge1xuICAgIHRoaXMucHJvY2Vzc1VzZXJEYXRlT2JqZWN0KHRoaXMuZGF0ZVZhbHVlT25Jbml0aWFsTG9hZCk7XG5cbiAgICAvLyBIYW5kbGUgSW5pdGFsIFZhbHVlIGZyb20gUmVhY3RpdmUgRm9ybXNcbiAgICAvLyBUT0RPOiBXZSBhcmUgcmVwZWF0aW5nIHRoaXMgbG9naWMgYXQgbXVsdGlwbGUgcGxhY2VzLiBUaGlzIG1ha2VzIG1lIHRoaW5rXG4gICAgLy8gaWYgdGhpcyBjbGFzcyBzaG91bGQgaGF2ZSBpbXBsZW1lbnRlZCB0aGUgQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlLlxuICAgIC8vIFdpbGwgZXhwbG9yZSB0aGF0IGxhdGVyIGFuZCBzZWUgaWYgaXRzIGEgY2xlYW5lciBzb2x1dGlvbi5cbiAgICBpZiAodGhpcy5fbmdDb250cm9sICYmIHRoaXMuX25nQ29udHJvbC52YWx1ZSkge1xuICAgICAgdGhpcy51cGRhdGVJbnB1dFZhbHVlKHRoaXMuX25nQ29udHJvbC52YWx1ZSk7XG4gICAgICB0aGlzLmluaXRpYWxpemVQcmV2aW91c091dHB1dCh0aGlzLl9kYXRlTmF2aWdhdGlvblNlcnZpY2Uuc2VsZWN0ZWREYXkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBXcml0ZSB0aGUgaW5pdGlhbCBpbnB1dCBzZXQgYnkgdGhlIHVzZXIgb24gdG8gdGhlIGlucHV0IGZpZWxkLlxuICAgKi9cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIC8vIEkgZG9uJ3Qga25vdyB3aHkgSSBoYXZlIHRvIGRvIHRoaXMgYnV0IGFmdGVyIHVzaW5nIHRoZSBuZXcgSG9zdFdyYXBwaW5nIE1vZHVsZSBJIGhhdmUgdG8gZGVsYXkgdGhlIHByb2Nlc3NpbmdcbiAgICAvLyBvZiB0aGUgaW5pdGlhbCBJbnB1dCBzZXQgYnkgdGhlIHVzZXIgdG8gaGVyZS4gIElmIEkgZG8gbm90IDIgaXNzdWVzIG9jY3VyOlxuICAgIC8vIDEuIHRoZSBJbnB1dCBzZXR0ZXIgaXMgY2FsbGVkIGJlZm9yZSBuZ09uSW5pdC4gbmdPbkluaXQgaW5pdGlhbGl6ZXMgdGhlIHNlcnZpY2VzIHdpdGhvdXQgd2hpY2ggdGhlIHNldHRlclxuICAgIC8vIGZhaWxzXG4gICAgLy8gMi4gVGhlIFJlbmRlcmVyIGRvZXNuJ3Qgd29yayBiZWZvcmUgbmdBZnRlclZpZXdJbml0XG4gICAgLy8oSXQgdXNlZCB0byBiZWZvcmUgdGhlIG5ldyBIb3N0V3JhcHBpbmcgTW9kdWxlIGZvciBzb21lIHJlYXNvbikuXG4gICAgLy8gSSBuZWVkIHRoZSByZW5kZXJlciB0byBzZXQgdGhlIHZhbHVlIHByb3BlcnR5IG9uIHRoZSBpbnB1dCB0byBtYWtlIHN1cmUgdGhhdCBpZiB0aGUgdXNlciBoYXMgc3VwcGxpZWQgYSBEYXRlXG4gICAgLy8gaW5wdXQgb2JqZWN0LCAgd2UgcmVmbGVjdCBpdCB3aXRoIHRoZSByaWdodCBkYXRlIG9uIHRoZSBpbnB1dCBmaWVsZCB1c2luZyB0aGUgSU8gc2VydmljZS4gIEkgYW0gbm90IHN1cmUgaWZcbiAgICAvLyB0aGVzZSBhcmUgbWFqb3IgaXNzdWVzIG9yIG5vdCBidXQganVzdCBub3RpbmcgdGhlbSBkb3duIGhlcmUuXG4gICAgaWYgKHRoaXMuX2RhdGVOYXZpZ2F0aW9uU2VydmljZSkge1xuICAgICAgY29uc3Qgc2VsRGF5OiBEYXlNb2RlbCA9IHRoaXMuX2RhdGVOYXZpZ2F0aW9uU2VydmljZS5zZWxlY3RlZERheTtcbiAgICAgIGlmIChzZWxEYXkpIHtcbiAgICAgICAgY29uc3QgZGF0ZVN0cjogc3RyaW5nID0gdGhpcy5fZGF0ZUlPU2VydmljZS50b0xvY2FsZURpc3BsYXlGb3JtYXRTdHJpbmcoc2VsRGF5LnRvRGF0ZSgpKTtcbiAgICAgICAgdGhpcy53cml0ZURhdGVTdHJUb0lucHV0RmllbGQoZGF0ZVN0cik7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuaW5pdGlhbExvYWQgPSBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVbnN1YnNjcmliZXMgZnJvbSB0aGUgc3Vic2NyaXB0aW9ucy5cbiAgICovXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMuZm9yRWFjaCgoc3ViOiBTdWJzY3JpcHRpb24pID0+IHN1Yi51bnN1YnNjcmliZSgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQb3B1bGF0ZXMgdGhlIHNlcnZpY2VzIGZyb20gdGhlIGNvbnRhaW5lciBjb21wb25lbnQuXG4gICAqL1xuICBwcml2YXRlIHBvcHVsYXRlQ29udGFpbmVyU2VydmljZXMoKTogdm9pZCB7XG4gICAgdGhpcy5fZGF0ZUlPU2VydmljZSA9IHRoaXMuZ2V0UHJvdmlkZXJGcm9tQ29udGFpbmVyKERhdGVJT1NlcnZpY2UpO1xuICAgIHRoaXMuX2RhdGVOYXZpZ2F0aW9uU2VydmljZSA9IHRoaXMuZ2V0UHJvdmlkZXJGcm9tQ29udGFpbmVyKERhdGVOYXZpZ2F0aW9uU2VydmljZSk7XG4gICAgdGhpcy5fZGF0ZXBpY2tlckVuYWJsZWRTZXJ2aWNlID0gdGhpcy5nZXRQcm92aWRlckZyb21Db250YWluZXIoRGF0ZXBpY2tlckVuYWJsZWRTZXJ2aWNlKTtcbiAgICB0aGlzLmRhdGVGb3JtQ29udHJvbFNlcnZpY2UgPSB0aGlzLmdldFByb3ZpZGVyRnJvbUNvbnRhaW5lcihEYXRlRm9ybUNvbnRyb2xTZXJ2aWNlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXcml0ZXMgdGhlIGRhdGUgc3RyaW5nIHZhbHVlIHRvIHRoZSBpbnB1dCBmaWVsZFxuICAgKi9cbiAgcHJpdmF0ZSB3cml0ZURhdGVTdHJUb0lucHV0RmllbGQodmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAndmFsdWUnLCB2YWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIGluaXRpYWxMb2FkOiBib29sZWFuID0gdHJ1ZTtcbiAgcHJpdmF0ZSBkYXRlVmFsdWVPbkluaXRpYWxMb2FkOiBEYXRlO1xuXG4gIC8qKlxuICAgKiBKYXZhc2NyaXB0IERhdGUgb2JqZWN0IGlucHV0IHNldCBieSB0aGUgdXNlci5cbiAgICovXG4gIEBJbnB1dCgnY2xyRGF0ZScpXG4gIHNldCBkYXRlKHZhbHVlOiBEYXRlKSB7XG4gICAgaWYgKHRoaXMuaW5pdGlhbExvYWQpIHtcbiAgICAgIC8vIFN0b3JlIGRhdGUgdmFsdWUgcGFzc2VkIGJ5IHRoZSB1c2VyIHRvIHByb2Nlc3MgYWZ0ZXIgdGhlIHNlcnZpY2VzIGhhdmUgYmVlbiBpbml0aWFsaXplZCBieVxuICAgICAgLy8gdGhlIG5nT25Jbml0IGhvb2suXG4gICAgICB0aGlzLmRhdGVWYWx1ZU9uSW5pdGlhbExvYWQgPSB2YWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wcm9jZXNzVXNlckRhdGVPYmplY3QodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQcm9jZXNzZXMgYSBkYXRlIG9iamVjdCB0byBjaGVjayBpZiBpdHMgdmFsaWQgb3Igbm90LlxuICAgKi9cbiAgcHJpdmF0ZSBwcm9jZXNzVXNlckRhdGVPYmplY3QodmFsdWU6IERhdGUpIHtcbiAgICBpZiAodGhpcy5fZGF0ZUlPU2VydmljZSkge1xuICAgICAgLy8gVGhlIGRhdGUgb2JqZWN0IGlzIGNvbnZlcnRlZCBiYWNrIHRvIHN0cmluZyBiZWNhdXNlIGluIEphdmFzY3JpcHQgeW91IGNhbiBjcmVhdGUgYSBkYXRlIG9iamVjdFxuICAgICAgLy8gbGlrZSB0aGlzOiBuZXcgRGF0ZShcIlRlc3RcIikuIFRoaXMgaXMgYSBkYXRlIG9iamVjdCBidXQgaXQgaXMgaW52YWxpZC4gQ29udmVydGluZyB0aGUgZGF0ZSBvYmplY3RcbiAgICAgIC8vIHRoYXQgdGhlIHVzZXIgcGFzc2VkIGhlbHBzIHVzIHRvIHZlcmlmeSB0aGUgdmFsaWRpdHkgb2YgdGhlIGRhdGUgb2JqZWN0LlxuICAgICAgY29uc3QgZGF0ZVN0cjogc3RyaW5nID0gdGhpcy5fZGF0ZUlPU2VydmljZS50b0xvY2FsZURpc3BsYXlGb3JtYXRTdHJpbmcodmFsdWUpO1xuICAgICAgdGhpcy51cGRhdGVJbnB1dFZhbHVlKGRhdGVTdHIpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlSW5wdXRWYWx1ZShkYXRlU3RyOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBkYXRlOiBEYXRlID0gdGhpcy5fZGF0ZUlPU2VydmljZS5pc1ZhbGlkSW5wdXQoZGF0ZVN0cik7XG4gICAgaWYgKGRhdGUpIHtcbiAgICAgIGNvbnN0IGRheU1vZGVsOiBEYXlNb2RlbCA9IG5ldyBEYXlNb2RlbChkYXRlLmdldEZ1bGxZZWFyKCksIGRhdGUuZ2V0TW9udGgoKSwgZGF0ZS5nZXREYXRlKCkpO1xuICAgICAgaWYgKCFkYXlNb2RlbC5pc0VxdWFsKHRoaXMuX2RhdGVOYXZpZ2F0aW9uU2VydmljZS5zZWxlY3RlZERheSkpIHtcbiAgICAgICAgdGhpcy5fZGF0ZU5hdmlnYXRpb25TZXJ2aWNlLnNlbGVjdGVkRGF5ID0gZGF5TW9kZWw7XG4gICAgICAgIHRoaXMud3JpdGVEYXRlU3RyVG9JbnB1dEZpZWxkKGRhdGVTdHIpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9kYXRlTmF2aWdhdGlvblNlcnZpY2Uuc2VsZWN0ZWREYXkgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGRhdGUgZm9ybWF0IGZvciB0aGUgcGxhY2Vob2xkZXIgYWNjb3JkaW5nIHRvIHdoaWNoIHRoZSBpbnB1dCBzaG91bGQgYmUgZW50ZXJlZCBieSB0aGUgdXNlci5cbiAgICovXG4gIEBIb3N0QmluZGluZygnYXR0ci5wbGFjZWhvbGRlcicpXG4gIGdldCBwbGFjZWhvbGRlclRleHQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5wbGFjZWhvbGRlciA/IHRoaXMucGxhY2Vob2xkZXIgOiB0aGlzLl9kYXRlSU9TZXJ2aWNlLnBsYWNlaG9sZGVyVGV4dDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBpbnB1dCB0eXBlIHRvIHRleHQgd2hlbiB0aGUgZGF0ZXBpY2tlciBpcyBlbmFibGVkLiBSZXZlcnRzIGJhY2sgdG8gdGhlIG5hdGl2ZSBkYXRlIGlucHV0XG4gICAqIHdoZW4gdGhlIGRhdGVwaWNrZXIgaXMgZGlzYWJsZWQuIERhdGVwaWNrZXIgaXMgZGlzYWJsZWQgb24gbW9iaWxlcy5cbiAgICovXG4gIEBIb3N0QmluZGluZygnYXR0ci50eXBlJylcbiAgZ2V0IGlucHV0VHlwZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiBpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpICYmIHRoaXMuX2RhdGVwaWNrZXJFbmFibGVkU2VydmljZS5pc0VuYWJsZWQgPyAndGV4dCcgOiAnZGF0ZSc7XG4gIH1cblxuICAvL1xuICAvLyBPdXRwdXQgTWFuYWdlbWVudFxuICAvLyBOb3RlOiBGb3Igbm93IHdlIHdpbGwgbm90IGVtaXQgYm90aCBjbHJEYXRlQ2hhbmdlIGFuZCBuZ0NvbnRyb2wgb3V0cHV0c1xuICAvLyBhdCB0aGUgc2FtZSB0aW1lLiBUaGlzIHJlcXVpcmVzIHVzIHRvIGxpc3RlbiB0byBrZXlkb3duIGFuZCBibHVyIGV2ZW50cyB0byBmaWd1cmUgb3V0XG4gIC8vIGV4YWN0bHkgd2hlbiB0aGUgT3V0cHV0IHNob3VsZCBiZSBlbWl0dGVkLlxuICAvLyBPdXIgcmVjb21tZW5kYXRpb24gcmlnaHQgbm93IGlzIHRvIGVpdGhlciB1c2UgY2xyRGF0ZSBvciB1c2UgbmdNb2RlbC9Gb3JtQ29udHJvbC5cbiAgLy8gRG8gbm90IHVzZSBib3RoIG9mIHRoZW0gdG9nZXRoZXIuXG4gIC8vXG5cbiAgQE91dHB1dCgnY2xyRGF0ZUNoYW5nZScpIF9kYXRlVXBkYXRlZDogRXZlbnRFbWl0dGVyPERhdGU+ID0gbmV3IEV2ZW50RW1pdHRlcjxEYXRlPihmYWxzZSk7XG5cbiAgcHJpdmF0ZSBlbWl0RGF0ZU91dHB1dChkYXlNb2RlbDogRGF5TW9kZWwpOiB2b2lkIHtcbiAgICBpZiAoZGF5TW9kZWwgJiYgIWRheU1vZGVsLmlzRXF1YWwodGhpcy5wcmV2aW91c091dHB1dCkpIHtcbiAgICAgIHRoaXMuX2RhdGVVcGRhdGVkLmVtaXQoZGF5TW9kZWwudG9EYXRlKCkpO1xuICAgICAgdGhpcy5wcmV2aW91c091dHB1dCA9IGRheU1vZGVsO1xuICAgIH0gZWxzZSBpZiAoIWRheU1vZGVsICYmIHRoaXMucHJldmlvdXNPdXRwdXQpIHtcbiAgICAgIHRoaXMuX2RhdGVVcGRhdGVkLmVtaXQobnVsbCk7XG4gICAgICB0aGlzLnByZXZpb3VzT3V0cHV0ID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdmb2N1cycpXG4gIHNldEZvY3VzU3RhdGVzKCkge1xuICAgIGlmICh0aGlzLmZvY3VzU2VydmljZSkge1xuICAgICAgdGhpcy5mb2N1c1NlcnZpY2UuZm9jdXNlZCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignYmx1cicpXG4gIHNldEJsdXJTdGF0ZXMoKSB7XG4gICAgaWYgKHRoaXMuaWZFcnJvclNlcnZpY2UpIHtcbiAgICAgIHRoaXMuaWZFcnJvclNlcnZpY2UudHJpZ2dlclN0YXR1c0NoYW5nZSgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5mb2N1c1NlcnZpY2UpIHtcbiAgICAgIHRoaXMuZm9jdXNTZXJ2aWNlLmZvY3VzZWQgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRmlyZXMgdGhpcyBtZXRob2Qgd2hlbiB0aGUgdXNlciBjaGFuZ2VzIHRoZSBpbnB1dCBmb2N1c2VzIG91dCBvZiB0aGUgaW5wdXQgZmllbGQuXG4gICAqL1xuICBASG9zdExpc3RlbmVyKCdjaGFuZ2UnLCBbJyRldmVudC50YXJnZXQnXSlcbiAgb25WYWx1ZUNoYW5nZSh0YXJnZXQ6IEhUTUxJbnB1dEVsZW1lbnQpIHtcbiAgICBjb25zdCB2YWx1ZTogc3RyaW5nID0gdGFyZ2V0LnZhbHVlO1xuICAgIGNvbnN0IGRhdGU6IERhdGUgPSB0aGlzLl9kYXRlSU9TZXJ2aWNlLmlzVmFsaWRJbnB1dCh2YWx1ZSk7XG4gICAgaWYgKGRhdGUpIHtcbiAgICAgIGNvbnN0IGRheU1vZGVsOiBEYXlNb2RlbCA9IG5ldyBEYXlNb2RlbChkYXRlLmdldEZ1bGxZZWFyKCksIGRhdGUuZ2V0TW9udGgoKSwgZGF0ZS5nZXREYXRlKCkpO1xuICAgICAgdGhpcy5fZGF0ZU5hdmlnYXRpb25TZXJ2aWNlLnNlbGVjdGVkRGF5ID0gZGF5TW9kZWw7XG4gICAgICB0aGlzLmVtaXREYXRlT3V0cHV0KGRheU1vZGVsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZGF0ZU5hdmlnYXRpb25TZXJ2aWNlLnNlbGVjdGVkRGF5ID0gbnVsbDtcbiAgICAgIHRoaXMuZW1pdERhdGVPdXRwdXQobnVsbCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgRGF0ZUlPIFN1YnNjcmlwdGlvbnNcbiAgICovXG4gIHByaXZhdGUgaW5pdGlhbGl6ZVN1YnNjcmlwdGlvbnMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2RhdGVOYXZpZ2F0aW9uU2VydmljZSAmJiB0aGlzLl9kYXRlSU9TZXJ2aWNlKSB7XG4gICAgICAvLyBUaGlzIHN1YnNjcmlwdGlvbiBpcyBmaXJlZCB3aGVuIHRoZSB1c2VyIHNlbGVjdHMgYSBkYXRlIGZyb20gdGhlIHBvcG92ZXIuXG4gICAgICB0aGlzLl9zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICAgIHRoaXMuX2RhdGVOYXZpZ2F0aW9uU2VydmljZS5zZWxlY3RlZERheUNoYW5nZS5zdWJzY3JpYmUoKGRheU1vZGVsOiBEYXlNb2RlbCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGRhdGVTdHI6IHN0cmluZyA9IHRoaXMuX2RhdGVJT1NlcnZpY2UudG9Mb2NhbGVEaXNwbGF5Rm9ybWF0U3RyaW5nKGRheU1vZGVsLnRvRGF0ZSgpKTtcbiAgICAgICAgICB0aGlzLndyaXRlRGF0ZVN0clRvSW5wdXRGaWVsZChkYXRlU3RyKTtcbiAgICAgICAgICAvLyBUaGlzIG1ha2VzIHN1cmUgdGhhdCBuZ01vZGVsQ2hhbmdlIGlzIGZpcmVkXG4gICAgICAgICAgLy8gVE9ETzogQ2hlY2sgaWYgdGhlcmUgaXMgYSBiZXR0ZXIgd2F5IHRvIGRvIHRoaXMuXG4gICAgICAgICAgLy8gTk9URTogSXRzIGltcG9ydGFudCB0byB1c2UgTmdDb250cm9sIGFuZCBub3QgTmdNb2RlbCBiZWNhdXNlXG4gICAgICAgICAgLy8gTmdNb2RlbCBvbmx5IHdvcmtzIHdpdGggdGVtcGxhdGUgZHJpdmVuIGZvcm1zXG4gICAgICAgICAgaWYgKHRoaXMuX25nQ29udHJvbCkge1xuICAgICAgICAgICAgdGhpcy5fbmdDb250cm9sLmNvbnRyb2wuc2V0VmFsdWUoZGF0ZVN0cik7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuZW1pdERhdGVPdXRwdXQoZGF5TW9kZWwpO1xuICAgICAgICB9KVxuICAgICAgKTtcblxuICAgICAgLy8gV2UgZG8gbm90IGVtaXQgYW4gT3V0cHV0IGZyb20gdGhpcyBzdWJzY3JpcHRpb24gYmVjYXVzZVxuICAgICAgLy8gd2Ugb25seSBlbWl0IHRoZSBPdXRwdXQgd2hlbiB0aGUgdXNlciBoYXMgZm9jdXNlZCBvdXQgb2YgdGhlIGlucHV0LlxuICAgICAgaWYgKHRoaXMuX25nQ29udHJvbCkge1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICAgICAgdGhpcy5fbmdDb250cm9sLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGU6IERhdGUgPSB0aGlzLl9kYXRlSU9TZXJ2aWNlLmlzVmFsaWRJbnB1dCh2YWx1ZSk7XG4gICAgICAgICAgICBpZiAoZGF0ZSkge1xuICAgICAgICAgICAgICBjb25zdCBkYXlNb2RlbDogRGF5TW9kZWwgPSBuZXcgRGF5TW9kZWwoZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXRlLmdldE1vbnRoKCksIGRhdGUuZ2V0RGF0ZSgpKTtcbiAgICAgICAgICAgICAgdGhpcy5fZGF0ZU5hdmlnYXRpb25TZXJ2aWNlLnNlbGVjdGVkRGF5ID0gZGF5TW9kZWw7XG4gICAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZVByZXZpb3VzT3V0cHV0KGRheU1vZGVsKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPT09ICcnIHx8IHZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgIHRoaXMuX2RhdGVOYXZpZ2F0aW9uU2VydmljZS5zZWxlY3RlZERheSA9IG51bGw7XG4gICAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZVByZXZpb3VzT3V0cHV0KG51bGwpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplUHJldmlvdXNPdXRwdXQobnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5kYXRlRm9ybUNvbnRyb2xTZXJ2aWNlKSB7XG4gICAgICB0aGlzLl9zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICAgIHRoaXMuZGF0ZUZvcm1Db250cm9sU2VydmljZS50b3VjaGVkQ2hhbmdlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuX25nQ29udHJvbCkge1xuICAgICAgICAgICAgdGhpcy5fbmdDb250cm9sLmNvbnRyb2wubWFya0FzVG91Y2hlZCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgICAgdGhpcy5kYXRlRm9ybUNvbnRyb2xTZXJ2aWNlLmRpcnR5Q2hhbmdlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuX25nQ29udHJvbCkge1xuICAgICAgICAgICAgdGhpcy5fbmdDb250cm9sLmNvbnRyb2wubWFya0FzRGlydHkoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cbiAgfVxufVxuIl19