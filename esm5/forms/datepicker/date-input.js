/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
import { filter, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
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
import { datesAreEqual } from './utils/date-utils';
// There are four ways the datepicker value is set
// 1. Value set by user typing into text input as a string ex: '01/28/2015'
// 2. Value set explicitly by Angular Forms APIs as a string ex: '01/28/2015'
// 3. Value set by user via datepicker UI as a Date Object
// 4. Value set via `clrDate` input as a Date Object
var ClrDateInput = /** @class */ (function (_super) {
    tslib_1.__extends(ClrDateInput, _super);
    function ClrDateInput(viewContainerRef, injector, el, renderer, control, container, dateIOService, dateNavigationService, datepickerEnabledService, dateFormControlService, platformId, focusService, newFormsLayout, datepickerFocusService) {
        var _this = _super.call(this, viewContainerRef, ClrDateContainer, injector, control, renderer, el) || this;
        _this.el = el;
        _this.renderer = renderer;
        _this.control = control;
        _this.container = container;
        _this.dateIOService = dateIOService;
        _this.dateNavigationService = dateNavigationService;
        _this.datepickerEnabledService = datepickerEnabledService;
        _this.dateFormControlService = dateFormControlService;
        _this.platformId = platformId;
        _this.focusService = focusService;
        _this.newFormsLayout = newFormsLayout;
        _this.datepickerFocusService = datepickerFocusService;
        _this.dateChange = new EventEmitter(false);
        _this.index = 4;
        return _this;
    }
    Object.defineProperty(ClrDateInput.prototype, "date", {
        set: /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            if (this.previousDateChange !== date) {
                this.updateDate(this.getValidDateValueFromDate(date));
            }
            if (!this.initialClrDateInputValue) {
                this.initialClrDateInputValue = date;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ClrDateInput.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        _super.prototype.ngOnInit.call(this);
        this.setFormLayout();
        this.populateServicesFromContainerComponent();
        this.subscriptions.push(this.listenForUserSelectedDayChanges(), this.listenForControlValueChanges(), this.listenForTouchChanges(), this.listenForDirtyChanges(), this.listenForInputRefocus());
    };
    /**
     * @return {?}
     */
    ClrDateInput.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        // I don't know why I have to do this but after using the new HostWrapping Module I have to delay the processing
        // of the initial Input set by the user to here. If I do not 2 issues occur:
        // 1. The Input setter is called before ngOnInit. ngOnInit initializes the services without which the setter fails.
        // 2. The Renderer doesn't work before ngAfterViewInit (It used to before the new HostWrapping Module for some reason).
        // I need the renderer to set the value property on the input to make sure that if the user has supplied a Date
        // input object, we reflect it with the right date on the input field using the IO service. I am not sure if
        // these are major issues or not but just noting them down here.
        this.processInitialInputs();
    };
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
    Object.defineProperty(ClrDateInput.prototype, "placeholderText", {
        get: /**
         * @return {?}
         */
        function () {
            return this.placeholder ? this.placeholder : this.dateIOService.placeholderText;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDateInput.prototype, "inputType", {
        get: /**
         * @return {?}
         */
        function () {
            return isPlatformBrowser(this.platformId) && this.usingNativeDatepicker() ? 'date' : 'text';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} target
     * @return {?}
     */
    ClrDateInput.prototype.onValueChange = /**
     * @param {?} target
     * @return {?}
     */
    function (target) {
        /** @type {?} */
        var validDateValue = this.dateIOService.getDateValueFromDateString(target.value);
        if (this.usingClarityDatepicker() && validDateValue) {
            this.updateDate(validDateValue, true);
        }
        else if (this.usingNativeDatepicker()) {
            var _a = tslib_1.__read(target.value.split('-'), 3), year = _a[0], month = _a[1], day = _a[2];
            this.updateDate(new Date(+year, +month - 1, +day), true);
        }
        else {
            this.emitDateOutput(null);
        }
    };
    /**
     * @private
     * @return {?}
     */
    ClrDateInput.prototype.usingClarityDatepicker = /**
     * @private
     * @return {?}
     */
    function () {
        return this.datepickerEnabledService.isEnabled;
    };
    /**
     * @private
     * @return {?}
     */
    ClrDateInput.prototype.usingNativeDatepicker = /**
     * @private
     * @return {?}
     */
    function () {
        return !this.datepickerEnabledService.isEnabled;
    };
    /**
     * @private
     * @param {?} focus
     * @return {?}
     */
    ClrDateInput.prototype.setFocus = /**
     * @private
     * @param {?} focus
     * @return {?}
     */
    function (focus) {
        if (this.focusService) {
            this.focusService.focused = focus;
        }
    };
    /**
     * @private
     * @return {?}
     */
    ClrDateInput.prototype.populateServicesFromContainerComponent = /**
     * @private
     * @return {?}
     */
    function () {
        if (!this.container) {
            this.dateIOService = this.getProviderFromContainer(DateIOService);
            this.dateNavigationService = this.getProviderFromContainer(DateNavigationService);
            this.datepickerEnabledService = this.getProviderFromContainer(DatepickerEnabledService);
            this.dateFormControlService = this.getProviderFromContainer(DateFormControlService);
        }
    };
    /**
     * @private
     * @return {?}
     */
    ClrDateInput.prototype.processInitialInputs = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.datepickerHasFormControl()) {
            this.updateDate(this.dateIOService.getDateValueFromDateString(this.control.value));
        }
        else {
            this.updateDate(this.initialClrDateInputValue);
        }
    };
    /**
     * @private
     * @return {?}
     */
    ClrDateInput.prototype.setFormLayout = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.clrNewLayout !== undefined) {
            this.newFormsLayout = !!this.clrNewLayout;
        }
    };
    /**
     * @private
     * @param {?} value
     * @param {?=} setByUserInteraction
     * @return {?}
     */
    ClrDateInput.prototype.updateDate = /**
     * @private
     * @param {?} value
     * @param {?=} setByUserInteraction
     * @return {?}
     */
    function (value, setByUserInteraction) {
        if (setByUserInteraction === void 0) { setByUserInteraction = false; }
        /** @type {?} */
        var date = this.getValidDateValueFromDate(value);
        if (setByUserInteraction) {
            this.emitDateOutput(date);
        }
        else {
            this.previousDateChange = date;
        }
        if (this.dateNavigationService) {
            this.dateNavigationService.selectedDay = date
                ? new DayModel(date.getFullYear(), date.getMonth(), date.getDate())
                : null;
        }
        this.updateInput(date);
    };
    /**
     * @private
     * @param {?} date
     * @return {?}
     */
    ClrDateInput.prototype.updateInput = /**
     * @private
     * @param {?} date
     * @return {?}
     */
    function (date) {
        if (date) {
            /** @type {?} */
            var dateString = this.dateIOService.toLocaleDisplayFormatString(date);
            if (this.datepickerHasFormControl() && dateString !== this.control.value) {
                this.control.control.setValue(dateString);
            }
            else if (this.usingNativeDatepicker()) {
                this.renderer.setProperty(this.el.nativeElement, 'valueAsDate', date);
            }
            else {
                this.renderer.setProperty(this.el.nativeElement, 'value', dateString);
            }
        }
        else {
            this.renderer.setProperty(this.el.nativeElement, 'value', '');
        }
    };
    /**
     * @private
     * @param {?} date
     * @return {?}
     */
    ClrDateInput.prototype.getValidDateValueFromDate = /**
     * @private
     * @param {?} date
     * @return {?}
     */
    function (date) {
        if (this.dateIOService) {
            /** @type {?} */
            var dateString = this.dateIOService.toLocaleDisplayFormatString(date);
            return this.dateIOService.getDateValueFromDateString(dateString);
        }
        else {
            return null;
        }
    };
    /**
     * @private
     * @param {?} date
     * @return {?}
     */
    ClrDateInput.prototype.emitDateOutput = /**
     * @private
     * @param {?} date
     * @return {?}
     */
    function (date) {
        if (!datesAreEqual(date, this.previousDateChange)) {
            this.dateChange.emit(date);
            this.previousDateChange = date;
        }
        else if (!date && this.previousDateChange) {
            this.dateChange.emit(null);
            this.previousDateChange = null;
        }
    };
    /**
     * @private
     * @return {?}
     */
    ClrDateInput.prototype.datepickerHasFormControl = /**
     * @private
     * @return {?}
     */
    function () {
        return !!this.control;
    };
    /**
     * @private
     * @return {?}
     */
    ClrDateInput.prototype.listenForControlValueChanges = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        return of(this.datepickerHasFormControl())
            .pipe(filter((/**
         * @param {?} hasControl
         * @return {?}
         */
        function (hasControl) { return hasControl; })), switchMap((/**
         * @return {?}
         */
        function () { return _this.control.valueChanges; })), 
        // only update date value if not being set by user
        filter((/**
         * @return {?}
         */
        function () { return !_this.datepickerFocusService.elementIsFocused(_this.el.nativeElement); })))
            .subscribe((/**
         * @param {?} value
         * @return {?}
         */
        function (value) { return _this.updateDate(_this.dateIOService.getDateValueFromDateString(value)); }));
    };
    /**
     * @private
     * @return {?}
     */
    ClrDateInput.prototype.listenForUserSelectedDayChanges = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        return this.dateNavigationService.selectedDayChange.subscribe((/**
         * @param {?} dayModel
         * @return {?}
         */
        function (dayModel) { return _this.updateDate(dayModel.toDate(), true); }));
    };
    /**
     * @private
     * @return {?}
     */
    ClrDateInput.prototype.listenForTouchChanges = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        return this.dateFormControlService.touchedChange
            .pipe(filter((/**
         * @return {?}
         */
        function () { return _this.datepickerHasFormControl(); })))
            .subscribe((/**
         * @return {?}
         */
        function () { return _this.control.control.markAsTouched(); }));
    };
    /**
     * @private
     * @return {?}
     */
    ClrDateInput.prototype.listenForDirtyChanges = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        return this.dateFormControlService.dirtyChange
            .pipe(filter((/**
         * @return {?}
         */
        function () { return _this.datepickerHasFormControl(); })))
            .subscribe((/**
         * @return {?}
         */
        function () { return _this.control.control.markAsDirty(); }));
    };
    /**
     * @private
     * @return {?}
     */
    ClrDateInput.prototype.listenForInputRefocus = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        return this.dateNavigationService.selectedDayChange
            .pipe(filter((/**
         * @param {?} date
         * @return {?}
         */
        function (date) { return !!date; })))
            .subscribe((/**
         * @param {?} v
         * @return {?}
         */
        function (v) { return _this.datepickerFocusService.focusInput(_this.el.nativeElement); }));
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
        placeholder: [{ type: Input }],
        clrNewLayout: [{ type: Input }],
        dateChange: [{ type: Output, args: ['clrDateChange',] }],
        date: [{ type: Input, args: ['clrDate',] }],
        setFocusStates: [{ type: HostListener, args: ['focus',] }],
        triggerValidation: [{ type: HostListener, args: ['blur',] }],
        placeholderText: [{ type: HostBinding, args: ['attr.placeholder',] }],
        inputType: [{ type: HostBinding, args: ['attr.type',] }],
        onValueChange: [{ type: HostListener, args: ['change', ['$event.target'],] }]
    };
    return ClrDateInput;
}(WrappedFormControl));
export { ClrDateInput };
if (false) {
    /** @type {?} */
    ClrDateInput.prototype.placeholder;
    /** @type {?} */
    ClrDateInput.prototype.clrNewLayout;
    /** @type {?} */
    ClrDateInput.prototype.dateChange;
    /**
     * @type {?}
     * @protected
     */
    ClrDateInput.prototype.index;
    /**
     * @type {?}
     * @private
     */
    ClrDateInput.prototype.initialClrDateInputValue;
    /**
     * @type {?}
     * @private
     */
    ClrDateInput.prototype.previousDateChange;
    /**
     * @type {?}
     * @protected
     */
    ClrDateInput.prototype.el;
    /**
     * @type {?}
     * @protected
     */
    ClrDateInput.prototype.renderer;
    /**
     * @type {?}
     * @protected
     */
    ClrDateInput.prototype.control;
    /**
     * @type {?}
     * @private
     */
    ClrDateInput.prototype.container;
    /**
     * @type {?}
     * @private
     */
    ClrDateInput.prototype.dateIOService;
    /**
     * @type {?}
     * @private
     */
    ClrDateInput.prototype.dateNavigationService;
    /**
     * @type {?}
     * @private
     */
    ClrDateInput.prototype.datepickerEnabledService;
    /**
     * @type {?}
     * @private
     */
    ClrDateInput.prototype.dateFormControlService;
    /**
     * @type {?}
     * @private
     */
    ClrDateInput.prototype.platformId;
    /**
     * @type {?}
     * @private
     */
    ClrDateInput.prototype.focusService;
    /** @type {?} */
    ClrDateInput.prototype.newFormsLayout;
    /**
     * @type {?}
     * @private
     */
    ClrDateInput.prototype.datepickerFocusService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1pbnB1dC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImZvcm1zL2RhdGVwaWNrZXIvZGF0ZS1pbnB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBTUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDcEQsT0FBTyxFQUVMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFdBQVcsRUFDWCxZQUFZLEVBQ1osTUFBTSxFQUNOLFFBQVEsRUFDUixLQUFLLEVBR0wsUUFBUSxFQUNSLE1BQU0sRUFDTixXQUFXLEVBQ1gsU0FBUyxFQUNULElBQUksRUFDSixnQkFBZ0IsR0FDakIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbkQsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUUxQixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDakUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDL0QsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQy9FLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUM1RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUM1RSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNsRixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx1Q0FBdUMsQ0FB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WUFDUixNQUFNLFNBQUMsbUJBQW1CO2dCQXBEdEIsc0JBQXNCOzs7OEJBa0I1QixLQUFLOytCQUNMLEtBQUs7NkJBQ0wsTUFBTSxTQUFDLGVBQWU7dUJBQ3RCLEtBQUssU0FBQyxTQUFTO2lDQStEZixZQUFZLFNBQUMsT0FBTztvQ0FLcEIsWUFBWSxTQUFDLE1BQU07a0NBTW5CLFdBQVcsU0FBQyxrQkFBa0I7NEJBSzlCLFdBQVcsU0FBQyxXQUFXO2dDQUt2QixZQUFZLFNBQUMsUUFBUSxFQUFFLENBQUMsZUFBZSxDQUFDOztJQTJJM0MsbUJBQUM7Q0FBQSxBQTNPRCxDQVFrQyxrQkFBa0IsR0FtT25EO1NBbk9ZLFlBQVk7OztJQUN2QixtQ0FBNkI7O0lBQzdCLG9DQUErQjs7SUFDL0Isa0NBQXdGOzs7OztJQVl4Riw2QkFBb0I7Ozs7O0lBQ3BCLGdEQUF1Qzs7Ozs7SUFDdkMsMENBQWlDOzs7OztJQUsvQiwwQkFBd0I7Ozs7O0lBQ3hCLGdDQUE2Qjs7Ozs7SUFDN0IsK0JBRTRCOzs7OztJQUM1QixpQ0FBK0M7Ozs7O0lBQy9DLHFDQUFnRDs7Ozs7SUFDaEQsNkNBQWdFOzs7OztJQUNoRSxnREFBc0U7Ozs7O0lBQ3RFLDhDQUFrRTs7Ozs7SUFDbEUsa0NBQStDOzs7OztJQUMvQyxvQ0FBOEM7O0lBQzlDLHNDQUU4Qjs7Ozs7SUFDOUIsOENBQXNEIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdEJpbmRpbmcsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5qZWN0LFxuICBJbmplY3RvcixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxuICBQTEFURk9STV9JRCxcbiAgUmVuZGVyZXIyLFxuICBTZWxmLFxuICBWaWV3Q29udGFpbmVyUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IGZpbHRlciwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgb2YgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgRm9jdXNTZXJ2aWNlIH0gZnJvbSAnLi4vY29tbW9uL3Byb3ZpZGVycy9mb2N1cy5zZXJ2aWNlJztcbmltcG9ydCB7IFdyYXBwZWRGb3JtQ29udHJvbCB9IGZyb20gJy4uL2NvbW1vbi93cmFwcGVkLWNvbnRyb2wnO1xuaW1wb3J0IHsgQ2xyRGF0ZUNvbnRhaW5lciB9IGZyb20gJy4vZGF0ZS1jb250YWluZXInO1xuaW1wb3J0IHsgRGF5TW9kZWwgfSBmcm9tICcuL21vZGVsL2RheS5tb2RlbCc7XG5pbXBvcnQgeyBEYXRlRm9ybUNvbnRyb2xTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvZGF0ZS1mb3JtLWNvbnRyb2wuc2VydmljZSc7XG5pbXBvcnQgeyBEYXRlSU9TZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvZGF0ZS1pby5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGVOYXZpZ2F0aW9uU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2RhdGUtbmF2aWdhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGVwaWNrZXJFbmFibGVkU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2RhdGVwaWNrZXItZW5hYmxlZC5zZXJ2aWNlJztcbmltcG9ydCB7IElTX05FV19GT1JNU19MQVlPVVQgfSBmcm9tICcuLi9jb21tb24vcHJvdmlkZXJzL25ldy1mb3Jtcy5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGVwaWNrZXJGb2N1c1NlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9kYXRlcGlja2VyLWZvY3VzLnNlcnZpY2UnO1xuaW1wb3J0IHsgZGF0ZXNBcmVFcXVhbCB9IGZyb20gJy4vdXRpbHMvZGF0ZS11dGlscyc7XG5cbi8vIFRoZXJlIGFyZSBmb3VyIHdheXMgdGhlIGRhdGVwaWNrZXIgdmFsdWUgaXMgc2V0XG4vLyAxLiBWYWx1ZSBzZXQgYnkgdXNlciB0eXBpbmcgaW50byB0ZXh0IGlucHV0IGFzIGEgc3RyaW5nIGV4OiAnMDEvMjgvMjAxNSdcbi8vIDIuIFZhbHVlIHNldCBleHBsaWNpdGx5IGJ5IEFuZ3VsYXIgRm9ybXMgQVBJcyBhcyBhIHN0cmluZyBleDogJzAxLzI4LzIwMTUnXG4vLyAzLiBWYWx1ZSBzZXQgYnkgdXNlciB2aWEgZGF0ZXBpY2tlciBVSSBhcyBhIERhdGUgT2JqZWN0XG4vLyA0LiBWYWx1ZSBzZXQgdmlhIGBjbHJEYXRlYCBpbnB1dCBhcyBhIERhdGUgT2JqZWN0XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tjbHJEYXRlXScsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmRhdGUtaW5wdXRdJzogJyFuZXdGb3Jtc0xheW91dCcsXG4gICAgJ1tjbGFzcy5jbHItaW5wdXRdJzogJ25ld0Zvcm1zTGF5b3V0JyxcbiAgfSxcbiAgcHJvdmlkZXJzOiBbRGF0ZXBpY2tlckZvY3VzU2VydmljZV0sXG59KVxuZXhwb3J0IGNsYXNzIENsckRhdGVJbnB1dCBleHRlbmRzIFdyYXBwZWRGb3JtQ29udHJvbDxDbHJEYXRlQ29udGFpbmVyPiBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZztcbiAgQElucHV0KCkgY2xyTmV3TGF5b3V0OiBib29sZWFuO1xuICBAT3V0cHV0KCdjbHJEYXRlQ2hhbmdlJykgZGF0ZUNoYW5nZTogRXZlbnRFbWl0dGVyPERhdGU+ID0gbmV3IEV2ZW50RW1pdHRlcjxEYXRlPihmYWxzZSk7XG4gIEBJbnB1dCgnY2xyRGF0ZScpXG4gIHNldCBkYXRlKGRhdGU6IERhdGUpIHtcbiAgICBpZiAodGhpcy5wcmV2aW91c0RhdGVDaGFuZ2UgIT09IGRhdGUpIHtcbiAgICAgIHRoaXMudXBkYXRlRGF0ZSh0aGlzLmdldFZhbGlkRGF0ZVZhbHVlRnJvbURhdGUoZGF0ZSkpO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5pbml0aWFsQ2xyRGF0ZUlucHV0VmFsdWUpIHtcbiAgICAgIHRoaXMuaW5pdGlhbENsckRhdGVJbnB1dFZhbHVlID0gZGF0ZTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgaW5kZXggPSA0O1xuICBwcml2YXRlIGluaXRpYWxDbHJEYXRlSW5wdXRWYWx1ZTogRGF0ZTtcbiAgcHJpdmF0ZSBwcmV2aW91c0RhdGVDaGFuZ2U6IERhdGU7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgcHJvdGVjdGVkIGVsOiBFbGVtZW50UmVmLFxuICAgIHByb3RlY3RlZCByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIEBTZWxmKClcbiAgICBAT3B0aW9uYWwoKVxuICAgIHByb3RlY3RlZCBjb250cm9sOiBOZ0NvbnRyb2wsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBjb250YWluZXI6IENsckRhdGVDb250YWluZXIsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBkYXRlSU9TZXJ2aWNlOiBEYXRlSU9TZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZGF0ZU5hdmlnYXRpb25TZXJ2aWNlOiBEYXRlTmF2aWdhdGlvblNlcnZpY2UsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBkYXRlcGlja2VyRW5hYmxlZFNlcnZpY2U6IERhdGVwaWNrZXJFbmFibGVkU2VydmljZSxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGRhdGVGb3JtQ29udHJvbFNlcnZpY2U6IERhdGVGb3JtQ29udHJvbFNlcnZpY2UsXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBPYmplY3QsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBmb2N1c1NlcnZpY2U6IEZvY3VzU2VydmljZSxcbiAgICBAT3B0aW9uYWwoKVxuICAgIEBJbmplY3QoSVNfTkVXX0ZPUk1TX0xBWU9VVClcbiAgICBwdWJsaWMgbmV3Rm9ybXNMYXlvdXQ6IGJvb2xlYW4sXG4gICAgcHJpdmF0ZSBkYXRlcGlja2VyRm9jdXNTZXJ2aWNlOiBEYXRlcGlja2VyRm9jdXNTZXJ2aWNlXG4gICkge1xuICAgIHN1cGVyKHZpZXdDb250YWluZXJSZWYsIENsckRhdGVDb250YWluZXIsIGluamVjdG9yLCBjb250cm9sLCByZW5kZXJlciwgZWwpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgc3VwZXIubmdPbkluaXQoKTtcbiAgICB0aGlzLnNldEZvcm1MYXlvdXQoKTtcbiAgICB0aGlzLnBvcHVsYXRlU2VydmljZXNGcm9tQ29udGFpbmVyQ29tcG9uZW50KCk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMubGlzdGVuRm9yVXNlclNlbGVjdGVkRGF5Q2hhbmdlcygpLFxuICAgICAgdGhpcy5saXN0ZW5Gb3JDb250cm9sVmFsdWVDaGFuZ2VzKCksXG4gICAgICB0aGlzLmxpc3RlbkZvclRvdWNoQ2hhbmdlcygpLFxuICAgICAgdGhpcy5saXN0ZW5Gb3JEaXJ0eUNoYW5nZXMoKSxcbiAgICAgIHRoaXMubGlzdGVuRm9ySW5wdXRSZWZvY3VzKClcbiAgICApO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIC8vIEkgZG9uJ3Qga25vdyB3aHkgSSBoYXZlIHRvIGRvIHRoaXMgYnV0IGFmdGVyIHVzaW5nIHRoZSBuZXcgSG9zdFdyYXBwaW5nIE1vZHVsZSBJIGhhdmUgdG8gZGVsYXkgdGhlIHByb2Nlc3NpbmdcbiAgICAvLyBvZiB0aGUgaW5pdGlhbCBJbnB1dCBzZXQgYnkgdGhlIHVzZXIgdG8gaGVyZS4gSWYgSSBkbyBub3QgMiBpc3N1ZXMgb2NjdXI6XG4gICAgLy8gMS4gVGhlIElucHV0IHNldHRlciBpcyBjYWxsZWQgYmVmb3JlIG5nT25Jbml0LiBuZ09uSW5pdCBpbml0aWFsaXplcyB0aGUgc2VydmljZXMgd2l0aG91dCB3aGljaCB0aGUgc2V0dGVyIGZhaWxzLlxuICAgIC8vIDIuIFRoZSBSZW5kZXJlciBkb2Vzbid0IHdvcmsgYmVmb3JlIG5nQWZ0ZXJWaWV3SW5pdCAoSXQgdXNlZCB0byBiZWZvcmUgdGhlIG5ldyBIb3N0V3JhcHBpbmcgTW9kdWxlIGZvciBzb21lIHJlYXNvbikuXG4gICAgLy8gSSBuZWVkIHRoZSByZW5kZXJlciB0byBzZXQgdGhlIHZhbHVlIHByb3BlcnR5IG9uIHRoZSBpbnB1dCB0byBtYWtlIHN1cmUgdGhhdCBpZiB0aGUgdXNlciBoYXMgc3VwcGxpZWQgYSBEYXRlXG4gICAgLy8gaW5wdXQgb2JqZWN0LCB3ZSByZWZsZWN0IGl0IHdpdGggdGhlIHJpZ2h0IGRhdGUgb24gdGhlIGlucHV0IGZpZWxkIHVzaW5nIHRoZSBJTyBzZXJ2aWNlLiBJIGFtIG5vdCBzdXJlIGlmXG4gICAgLy8gdGhlc2UgYXJlIG1ham9yIGlzc3VlcyBvciBub3QgYnV0IGp1c3Qgbm90aW5nIHRoZW0gZG93biBoZXJlLlxuICAgIHRoaXMucHJvY2Vzc0luaXRpYWxJbnB1dHMoKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2ZvY3VzJylcbiAgc2V0Rm9jdXNTdGF0ZXMoKSB7XG4gICAgdGhpcy5zZXRGb2N1cyh0cnVlKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2JsdXInKVxuICB0cmlnZ2VyVmFsaWRhdGlvbigpIHtcbiAgICBzdXBlci50cmlnZ2VyVmFsaWRhdGlvbigpO1xuICAgIHRoaXMuc2V0Rm9jdXMoZmFsc2UpO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLnBsYWNlaG9sZGVyJylcbiAgZ2V0IHBsYWNlaG9sZGVyVGV4dCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnBsYWNlaG9sZGVyID8gdGhpcy5wbGFjZWhvbGRlciA6IHRoaXMuZGF0ZUlPU2VydmljZS5wbGFjZWhvbGRlclRleHQ7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2F0dHIudHlwZScpXG4gIGdldCBpbnB1dFR5cGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSAmJiB0aGlzLnVzaW5nTmF0aXZlRGF0ZXBpY2tlcigpID8gJ2RhdGUnIDogJ3RleHQnO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2hhbmdlJywgWyckZXZlbnQudGFyZ2V0J10pXG4gIG9uVmFsdWVDaGFuZ2UodGFyZ2V0OiBIVE1MSW5wdXRFbGVtZW50KSB7XG4gICAgY29uc3QgdmFsaWREYXRlVmFsdWUgPSB0aGlzLmRhdGVJT1NlcnZpY2UuZ2V0RGF0ZVZhbHVlRnJvbURhdGVTdHJpbmcodGFyZ2V0LnZhbHVlKTtcbiAgICBpZiAodGhpcy51c2luZ0NsYXJpdHlEYXRlcGlja2VyKCkgJiYgdmFsaWREYXRlVmFsdWUpIHtcbiAgICAgIHRoaXMudXBkYXRlRGF0ZSh2YWxpZERhdGVWYWx1ZSwgdHJ1ZSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLnVzaW5nTmF0aXZlRGF0ZXBpY2tlcigpKSB7XG4gICAgICBjb25zdCBbeWVhciwgbW9udGgsIGRheV0gPSB0YXJnZXQudmFsdWUuc3BsaXQoJy0nKTtcbiAgICAgIHRoaXMudXBkYXRlRGF0ZShuZXcgRGF0ZSgreWVhciwgK21vbnRoIC0gMSwgK2RheSksIHRydWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVtaXREYXRlT3V0cHV0KG51bGwpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdXNpbmdDbGFyaXR5RGF0ZXBpY2tlcigpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRlcGlja2VyRW5hYmxlZFNlcnZpY2UuaXNFbmFibGVkO1xuICB9XG5cbiAgcHJpdmF0ZSB1c2luZ05hdGl2ZURhdGVwaWNrZXIoKSB7XG4gICAgcmV0dXJuICF0aGlzLmRhdGVwaWNrZXJFbmFibGVkU2VydmljZS5pc0VuYWJsZWQ7XG4gIH1cblxuICBwcml2YXRlIHNldEZvY3VzKGZvY3VzOiBib29sZWFuKSB7XG4gICAgaWYgKHRoaXMuZm9jdXNTZXJ2aWNlKSB7XG4gICAgICB0aGlzLmZvY3VzU2VydmljZS5mb2N1c2VkID0gZm9jdXM7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBwb3B1bGF0ZVNlcnZpY2VzRnJvbUNvbnRhaW5lckNvbXBvbmVudCgpIHtcbiAgICBpZiAoIXRoaXMuY29udGFpbmVyKSB7XG4gICAgICB0aGlzLmRhdGVJT1NlcnZpY2UgPSB0aGlzLmdldFByb3ZpZGVyRnJvbUNvbnRhaW5lcihEYXRlSU9TZXJ2aWNlKTtcbiAgICAgIHRoaXMuZGF0ZU5hdmlnYXRpb25TZXJ2aWNlID0gdGhpcy5nZXRQcm92aWRlckZyb21Db250YWluZXIoRGF0ZU5hdmlnYXRpb25TZXJ2aWNlKTtcbiAgICAgIHRoaXMuZGF0ZXBpY2tlckVuYWJsZWRTZXJ2aWNlID0gdGhpcy5nZXRQcm92aWRlckZyb21Db250YWluZXIoRGF0ZXBpY2tlckVuYWJsZWRTZXJ2aWNlKTtcbiAgICAgIHRoaXMuZGF0ZUZvcm1Db250cm9sU2VydmljZSA9IHRoaXMuZ2V0UHJvdmlkZXJGcm9tQ29udGFpbmVyKERhdGVGb3JtQ29udHJvbFNlcnZpY2UpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcHJvY2Vzc0luaXRpYWxJbnB1dHMoKSB7XG4gICAgaWYgKHRoaXMuZGF0ZXBpY2tlckhhc0Zvcm1Db250cm9sKCkpIHtcbiAgICAgIHRoaXMudXBkYXRlRGF0ZSh0aGlzLmRhdGVJT1NlcnZpY2UuZ2V0RGF0ZVZhbHVlRnJvbURhdGVTdHJpbmcodGhpcy5jb250cm9sLnZhbHVlKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudXBkYXRlRGF0ZSh0aGlzLmluaXRpYWxDbHJEYXRlSW5wdXRWYWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRGb3JtTGF5b3V0KCkge1xuICAgIGlmICh0aGlzLmNsck5ld0xheW91dCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLm5ld0Zvcm1zTGF5b3V0ID0gISF0aGlzLmNsck5ld0xheW91dDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZURhdGUodmFsdWU6IERhdGUsIHNldEJ5VXNlckludGVyYWN0aW9uID0gZmFsc2UpIHtcbiAgICBjb25zdCBkYXRlID0gdGhpcy5nZXRWYWxpZERhdGVWYWx1ZUZyb21EYXRlKHZhbHVlKTtcblxuICAgIGlmIChzZXRCeVVzZXJJbnRlcmFjdGlvbikge1xuICAgICAgdGhpcy5lbWl0RGF0ZU91dHB1dChkYXRlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wcmV2aW91c0RhdGVDaGFuZ2UgPSBkYXRlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmRhdGVOYXZpZ2F0aW9uU2VydmljZSkge1xuICAgICAgdGhpcy5kYXRlTmF2aWdhdGlvblNlcnZpY2Uuc2VsZWN0ZWREYXkgPSBkYXRlXG4gICAgICAgID8gbmV3IERheU1vZGVsKGRhdGUuZ2V0RnVsbFllYXIoKSwgZGF0ZS5nZXRNb250aCgpLCBkYXRlLmdldERhdGUoKSlcbiAgICAgICAgOiBudWxsO1xuICAgIH1cblxuICAgIHRoaXMudXBkYXRlSW5wdXQoZGF0ZSk7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZUlucHV0KGRhdGU6IERhdGUpIHtcbiAgICBpZiAoZGF0ZSkge1xuICAgICAgY29uc3QgZGF0ZVN0cmluZyA9IHRoaXMuZGF0ZUlPU2VydmljZS50b0xvY2FsZURpc3BsYXlGb3JtYXRTdHJpbmcoZGF0ZSk7XG5cbiAgICAgIGlmICh0aGlzLmRhdGVwaWNrZXJIYXNGb3JtQ29udHJvbCgpICYmIGRhdGVTdHJpbmcgIT09IHRoaXMuY29udHJvbC52YWx1ZSkge1xuICAgICAgICB0aGlzLmNvbnRyb2wuY29udHJvbC5zZXRWYWx1ZShkYXRlU3RyaW5nKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy51c2luZ05hdGl2ZURhdGVwaWNrZXIoKSkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3ZhbHVlQXNEYXRlJywgZGF0ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3ZhbHVlJywgZGF0ZVN0cmluZyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAndmFsdWUnLCAnJyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRWYWxpZERhdGVWYWx1ZUZyb21EYXRlKGRhdGU6IERhdGUpIHtcbiAgICBpZiAodGhpcy5kYXRlSU9TZXJ2aWNlKSB7XG4gICAgICBjb25zdCBkYXRlU3RyaW5nID0gdGhpcy5kYXRlSU9TZXJ2aWNlLnRvTG9jYWxlRGlzcGxheUZvcm1hdFN0cmluZyhkYXRlKTtcbiAgICAgIHJldHVybiB0aGlzLmRhdGVJT1NlcnZpY2UuZ2V0RGF0ZVZhbHVlRnJvbURhdGVTdHJpbmcoZGF0ZVN0cmluZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZW1pdERhdGVPdXRwdXQoZGF0ZTogRGF0ZSkge1xuICAgIGlmICghZGF0ZXNBcmVFcXVhbChkYXRlLCB0aGlzLnByZXZpb3VzRGF0ZUNoYW5nZSkpIHtcbiAgICAgIHRoaXMuZGF0ZUNoYW5nZS5lbWl0KGRhdGUpO1xuICAgICAgdGhpcy5wcmV2aW91c0RhdGVDaGFuZ2UgPSBkYXRlO1xuICAgIH0gZWxzZSBpZiAoIWRhdGUgJiYgdGhpcy5wcmV2aW91c0RhdGVDaGFuZ2UpIHtcbiAgICAgIHRoaXMuZGF0ZUNoYW5nZS5lbWl0KG51bGwpO1xuICAgICAgdGhpcy5wcmV2aW91c0RhdGVDaGFuZ2UgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZGF0ZXBpY2tlckhhc0Zvcm1Db250cm9sKCkge1xuICAgIHJldHVybiAhIXRoaXMuY29udHJvbDtcbiAgfVxuXG4gIHByaXZhdGUgbGlzdGVuRm9yQ29udHJvbFZhbHVlQ2hhbmdlcygpIHtcbiAgICByZXR1cm4gb2YodGhpcy5kYXRlcGlja2VySGFzRm9ybUNvbnRyb2woKSlcbiAgICAgIC5waXBlKFxuICAgICAgICBmaWx0ZXIoaGFzQ29udHJvbCA9PiBoYXNDb250cm9sKSxcbiAgICAgICAgc3dpdGNoTWFwKCgpID0+IHRoaXMuY29udHJvbC52YWx1ZUNoYW5nZXMpLFxuICAgICAgICAvLyBvbmx5IHVwZGF0ZSBkYXRlIHZhbHVlIGlmIG5vdCBiZWluZyBzZXQgYnkgdXNlclxuICAgICAgICBmaWx0ZXIoKCkgPT4gIXRoaXMuZGF0ZXBpY2tlckZvY3VzU2VydmljZS5lbGVtZW50SXNGb2N1c2VkKHRoaXMuZWwubmF0aXZlRWxlbWVudCkpXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKCh2YWx1ZTogc3RyaW5nKSA9PiB0aGlzLnVwZGF0ZURhdGUodGhpcy5kYXRlSU9TZXJ2aWNlLmdldERhdGVWYWx1ZUZyb21EYXRlU3RyaW5nKHZhbHVlKSkpO1xuICB9XG5cbiAgcHJpdmF0ZSBsaXN0ZW5Gb3JVc2VyU2VsZWN0ZWREYXlDaGFuZ2VzKCkge1xuICAgIHJldHVybiB0aGlzLmRhdGVOYXZpZ2F0aW9uU2VydmljZS5zZWxlY3RlZERheUNoYW5nZS5zdWJzY3JpYmUoZGF5TW9kZWwgPT4gdGhpcy51cGRhdGVEYXRlKGRheU1vZGVsLnRvRGF0ZSgpLCB0cnVlKSk7XG4gIH1cblxuICBwcml2YXRlIGxpc3RlbkZvclRvdWNoQ2hhbmdlcygpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRlRm9ybUNvbnRyb2xTZXJ2aWNlLnRvdWNoZWRDaGFuZ2VcbiAgICAgIC5waXBlKGZpbHRlcigoKSA9PiB0aGlzLmRhdGVwaWNrZXJIYXNGb3JtQ29udHJvbCgpKSlcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jb250cm9sLmNvbnRyb2wubWFya0FzVG91Y2hlZCgpKTtcbiAgfVxuXG4gIHByaXZhdGUgbGlzdGVuRm9yRGlydHlDaGFuZ2VzKCkge1xuICAgIHJldHVybiB0aGlzLmRhdGVGb3JtQ29udHJvbFNlcnZpY2UuZGlydHlDaGFuZ2VcbiAgICAgIC5waXBlKGZpbHRlcigoKSA9PiB0aGlzLmRhdGVwaWNrZXJIYXNGb3JtQ29udHJvbCgpKSlcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jb250cm9sLmNvbnRyb2wubWFya0FzRGlydHkoKSk7XG4gIH1cblxuICBwcml2YXRlIGxpc3RlbkZvcklucHV0UmVmb2N1cygpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRlTmF2aWdhdGlvblNlcnZpY2Uuc2VsZWN0ZWREYXlDaGFuZ2VcbiAgICAgIC5waXBlKGZpbHRlcihkYXRlID0+ICEhZGF0ZSkpXG4gICAgICAuc3Vic2NyaWJlKHYgPT4gdGhpcy5kYXRlcGlja2VyRm9jdXNTZXJ2aWNlLmZvY3VzSW5wdXQodGhpcy5lbC5uYXRpdmVFbGVtZW50KSk7XG4gIH1cbn1cbiJdfQ==