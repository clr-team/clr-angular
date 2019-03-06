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
     * @return {?}
     */
    ClrDateInput.prototype.usingClarityDatepicker = /**
     * @return {?}
     */
    function () {
        return this.datepickerEnabledService.isEnabled;
    };
    /**
     * @return {?}
     */
    ClrDateInput.prototype.usingNativeDatepicker = /**
     * @return {?}
     */
    function () {
        return !this.datepickerEnabledService.isEnabled;
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
    ClrDateInput.prototype.populateServicesFromContainerComponent = /**
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
     * @return {?}
     */
    ClrDateInput.prototype.processInitialInputs = /**
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
     * @param {?} value
     * @param {?=} setByUserInteraction
     * @return {?}
     */
    ClrDateInput.prototype.updateDate = /**
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
     * @param {?} date
     * @return {?}
     */
    ClrDateInput.prototype.updateInput = /**
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
     * @param {?} date
     * @return {?}
     */
    ClrDateInput.prototype.getValidDateValueFromDate = /**
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
     * @param {?} date
     * @return {?}
     */
    ClrDateInput.prototype.emitDateOutput = /**
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
     * @return {?}
     */
    ClrDateInput.prototype.datepickerHasFormControl = /**
     * @return {?}
     */
    function () {
        return !!this.control;
    };
    /**
     * @return {?}
     */
    ClrDateInput.prototype.listenForControlValueChanges = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return of(this.datepickerHasFormControl())
            .pipe(filter(function (hasControl) { return hasControl; }), switchMap(function () { return _this.control.valueChanges; }), 
        // only update date value if not being set by user
        filter(function () { return !_this.datepickerFocusService.elementIsFocused(_this.el.nativeElement); }))
            .subscribe(function (value) { return _this.updateDate(_this.dateIOService.getDateValueFromDateString(value)); });
    };
    /**
     * @return {?}
     */
    ClrDateInput.prototype.listenForUserSelectedDayChanges = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return this.dateNavigationService.selectedDayChange.subscribe(function (dayModel) { return _this.updateDate(dayModel.toDate(), true); });
    };
    /**
     * @return {?}
     */
    ClrDateInput.prototype.listenForTouchChanges = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return this.dateFormControlService.touchedChange
            .pipe(filter(function () { return _this.datepickerHasFormControl(); }))
            .subscribe(function () { return _this.control.control.markAsTouched(); });
    };
    /**
     * @return {?}
     */
    ClrDateInput.prototype.listenForDirtyChanges = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return this.dateFormControlService.dirtyChange
            .pipe(filter(function () { return _this.datepickerHasFormControl(); }))
            .subscribe(function () { return _this.control.control.markAsDirty(); });
    };
    /**
     * @return {?}
     */
    ClrDateInput.prototype.listenForInputRefocus = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return this.dateNavigationService.selectedDayChange
            .pipe(filter(function (date) { return !!date; }))
            .subscribe(function (v) { return _this.datepickerFocusService.focusInput(_this.el.nativeElement); });
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
    /** @type {?} */
    ClrDateInput.prototype.index;
    /** @type {?} */
    ClrDateInput.prototype.initialClrDateInputValue;
    /** @type {?} */
    ClrDateInput.prototype.previousDateChange;
    /** @type {?} */
    ClrDateInput.prototype.el;
    /** @type {?} */
    ClrDateInput.prototype.renderer;
    /** @type {?} */
    ClrDateInput.prototype.control;
    /** @type {?} */
    ClrDateInput.prototype.container;
    /** @type {?} */
    ClrDateInput.prototype.dateIOService;
    /** @type {?} */
    ClrDateInput.prototype.dateNavigationService;
    /** @type {?} */
    ClrDateInput.prototype.datepickerEnabledService;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1pbnB1dC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImZvcm1zL2RhdGVwaWNrZXIvZGF0ZS1pbnB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBTUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDcEQsT0FBTyxFQUVMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFdBQVcsRUFDWCxZQUFZLEVBQ1osTUFBTSxFQUNOLFFBQVEsRUFDUixLQUFLLEVBR0wsUUFBUSxFQUNSLE1BQU0sRUFDTixXQUFXLEVBQ1gsU0FBUyxFQUNULElBQUksRUFDSixnQkFBZ0IsR0FDakIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbkQsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUUxQixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDakUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDL0QsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQy9FLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUM1RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUM1RSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNsRixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx1Q0FBdUMsQ0FB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QUFLOzZCQUNMLE1BQU0sU0FBQyxlQUFlO3VCQUN0QixLQUFLLFNBQUMsU0FBUztpQ0ErRGYsWUFBWSxTQUFDLE9BQU87b0NBS3BCLFlBQVksU0FBQyxNQUFNO2tDQU1uQixXQUFXLFNBQUMsa0JBQWtCOzRCQUs5QixXQUFXLFNBQUMsV0FBVztnQ0FLdkIsWUFBWSxTQUFDLFFBQVEsRUFBRSxDQUFDLGVBQWUsQ0FBQzs7SUEySTNDLG1CQUFDO0NBQUEsQUEzT0QsQ0FRa0Msa0JBQWtCLEdBbU9uRDtTQW5PWSxZQUFZOzs7SUFDdkIsbUNBQTZCOztJQUM3QixvQ0FBK0I7O0lBQy9CLGtDQUF3Rjs7SUFZeEYsNkJBQW9COztJQUNwQixnREFBdUM7O0lBQ3ZDLDBDQUFpQzs7SUFLL0IsMEJBQXdCOztJQUN4QixnQ0FBNkI7O0lBQzdCLCtCQUU0Qjs7SUFDNUIsaUNBQStDOztJQUMvQyxxQ0FBZ0Q7O0lBQ2hELDZDQUFnRTs7SUFDaEUsZ0RBQXNFOztJQUN0RSw4Q0FBa0U7O0lBQ2xFLGtDQUErQzs7SUFDL0Msb0NBQThDOztJQUM5QyxzQ0FFOEI7O0lBQzlCLDhDQUFzRCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RCaW5kaW5nLFxuICBIb3N0TGlzdGVuZXIsXG4gIEluamVjdCxcbiAgSW5qZWN0b3IsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbiAgUExBVEZPUk1fSUQsXG4gIFJlbmRlcmVyMixcbiAgU2VsZixcbiAgVmlld0NvbnRhaW5lclJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ0NvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IG9mIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IEZvY3VzU2VydmljZSB9IGZyb20gJy4uL2NvbW1vbi9wcm92aWRlcnMvZm9jdXMuc2VydmljZSc7XG5pbXBvcnQgeyBXcmFwcGVkRm9ybUNvbnRyb2wgfSBmcm9tICcuLi9jb21tb24vd3JhcHBlZC1jb250cm9sJztcbmltcG9ydCB7IENsckRhdGVDb250YWluZXIgfSBmcm9tICcuL2RhdGUtY29udGFpbmVyJztcbmltcG9ydCB7IERheU1vZGVsIH0gZnJvbSAnLi9tb2RlbC9kYXkubW9kZWwnO1xuaW1wb3J0IHsgRGF0ZUZvcm1Db250cm9sU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2RhdGUtZm9ybS1jb250cm9sLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0ZUlPU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2RhdGUtaW8uc2VydmljZSc7XG5pbXBvcnQgeyBEYXRlTmF2aWdhdGlvblNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9kYXRlLW5hdmlnYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBEYXRlcGlja2VyRW5hYmxlZFNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9kYXRlcGlja2VyLWVuYWJsZWQuc2VydmljZSc7XG5pbXBvcnQgeyBJU19ORVdfRk9STVNfTEFZT1VUIH0gZnJvbSAnLi4vY29tbW9uL3Byb3ZpZGVycy9uZXctZm9ybXMuc2VydmljZSc7XG5pbXBvcnQgeyBEYXRlcGlja2VyRm9jdXNTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvZGF0ZXBpY2tlci1mb2N1cy5zZXJ2aWNlJztcbmltcG9ydCB7IGRhdGVzQXJlRXF1YWwgfSBmcm9tICcuL3V0aWxzL2RhdGUtdXRpbHMnO1xuXG4vLyBUaGVyZSBhcmUgZm91ciB3YXlzIHRoZSBkYXRlcGlja2VyIHZhbHVlIGlzIHNldFxuLy8gMS4gVmFsdWUgc2V0IGJ5IHVzZXIgdHlwaW5nIGludG8gdGV4dCBpbnB1dCBhcyBhIHN0cmluZyBleDogJzAxLzI4LzIwMTUnXG4vLyAyLiBWYWx1ZSBzZXQgZXhwbGljaXRseSBieSBBbmd1bGFyIEZvcm1zIEFQSXMgYXMgYSBzdHJpbmcgZXg6ICcwMS8yOC8yMDE1J1xuLy8gMy4gVmFsdWUgc2V0IGJ5IHVzZXIgdmlhIGRhdGVwaWNrZXIgVUkgYXMgYSBEYXRlIE9iamVjdFxuLy8gNC4gVmFsdWUgc2V0IHZpYSBgY2xyRGF0ZWAgaW5wdXQgYXMgYSBEYXRlIE9iamVjdFxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbY2xyRGF0ZV0nLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5kYXRlLWlucHV0XSc6ICchbmV3Rm9ybXNMYXlvdXQnLFxuICAgICdbY2xhc3MuY2xyLWlucHV0XSc6ICduZXdGb3Jtc0xheW91dCcsXG4gIH0sXG4gIHByb3ZpZGVyczogW0RhdGVwaWNrZXJGb2N1c1NlcnZpY2VdLFxufSlcbmV4cG9ydCBjbGFzcyBDbHJEYXRlSW5wdXQgZXh0ZW5kcyBXcmFwcGVkRm9ybUNvbnRyb2w8Q2xyRGF0ZUNvbnRhaW5lcj4gaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGNsck5ld0xheW91dDogYm9vbGVhbjtcbiAgQE91dHB1dCgnY2xyRGF0ZUNoYW5nZScpIGRhdGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxEYXRlPiA9IG5ldyBFdmVudEVtaXR0ZXI8RGF0ZT4oZmFsc2UpO1xuICBASW5wdXQoJ2NsckRhdGUnKVxuICBzZXQgZGF0ZShkYXRlOiBEYXRlKSB7XG4gICAgaWYgKHRoaXMucHJldmlvdXNEYXRlQ2hhbmdlICE9PSBkYXRlKSB7XG4gICAgICB0aGlzLnVwZGF0ZURhdGUodGhpcy5nZXRWYWxpZERhdGVWYWx1ZUZyb21EYXRlKGRhdGUpKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuaW5pdGlhbENsckRhdGVJbnB1dFZhbHVlKSB7XG4gICAgICB0aGlzLmluaXRpYWxDbHJEYXRlSW5wdXRWYWx1ZSA9IGRhdGU7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGluZGV4ID0gNDtcbiAgcHJpdmF0ZSBpbml0aWFsQ2xyRGF0ZUlucHV0VmFsdWU6IERhdGU7XG4gIHByaXZhdGUgcHJldmlvdXNEYXRlQ2hhbmdlOiBEYXRlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgIHByb3RlY3RlZCBlbDogRWxlbWVudFJlZixcbiAgICBwcm90ZWN0ZWQgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBAU2VsZigpXG4gICAgQE9wdGlvbmFsKClcbiAgICBwcm90ZWN0ZWQgY29udHJvbDogTmdDb250cm9sLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgY29udGFpbmVyOiBDbHJEYXRlQ29udGFpbmVyLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZGF0ZUlPU2VydmljZTogRGF0ZUlPU2VydmljZSxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGRhdGVOYXZpZ2F0aW9uU2VydmljZTogRGF0ZU5hdmlnYXRpb25TZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZGF0ZXBpY2tlckVuYWJsZWRTZXJ2aWNlOiBEYXRlcGlja2VyRW5hYmxlZFNlcnZpY2UsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBkYXRlRm9ybUNvbnRyb2xTZXJ2aWNlOiBEYXRlRm9ybUNvbnRyb2xTZXJ2aWNlLFxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogT2JqZWN0LFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZm9jdXNTZXJ2aWNlOiBGb2N1c1NlcnZpY2UsXG4gICAgQE9wdGlvbmFsKClcbiAgICBASW5qZWN0KElTX05FV19GT1JNU19MQVlPVVQpXG4gICAgcHVibGljIG5ld0Zvcm1zTGF5b3V0OiBib29sZWFuLFxuICAgIHByaXZhdGUgZGF0ZXBpY2tlckZvY3VzU2VydmljZTogRGF0ZXBpY2tlckZvY3VzU2VydmljZVxuICApIHtcbiAgICBzdXBlcih2aWV3Q29udGFpbmVyUmVmLCBDbHJEYXRlQ29udGFpbmVyLCBpbmplY3RvciwgY29udHJvbCwgcmVuZGVyZXIsIGVsKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gICAgdGhpcy5zZXRGb3JtTGF5b3V0KCk7XG4gICAgdGhpcy5wb3B1bGF0ZVNlcnZpY2VzRnJvbUNvbnRhaW5lckNvbXBvbmVudCgpO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLmxpc3RlbkZvclVzZXJTZWxlY3RlZERheUNoYW5nZXMoKSxcbiAgICAgIHRoaXMubGlzdGVuRm9yQ29udHJvbFZhbHVlQ2hhbmdlcygpLFxuICAgICAgdGhpcy5saXN0ZW5Gb3JUb3VjaENoYW5nZXMoKSxcbiAgICAgIHRoaXMubGlzdGVuRm9yRGlydHlDaGFuZ2VzKCksXG4gICAgICB0aGlzLmxpc3RlbkZvcklucHV0UmVmb2N1cygpXG4gICAgKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAvLyBJIGRvbid0IGtub3cgd2h5IEkgaGF2ZSB0byBkbyB0aGlzIGJ1dCBhZnRlciB1c2luZyB0aGUgbmV3IEhvc3RXcmFwcGluZyBNb2R1bGUgSSBoYXZlIHRvIGRlbGF5IHRoZSBwcm9jZXNzaW5nXG4gICAgLy8gb2YgdGhlIGluaXRpYWwgSW5wdXQgc2V0IGJ5IHRoZSB1c2VyIHRvIGhlcmUuIElmIEkgZG8gbm90IDIgaXNzdWVzIG9jY3VyOlxuICAgIC8vIDEuIFRoZSBJbnB1dCBzZXR0ZXIgaXMgY2FsbGVkIGJlZm9yZSBuZ09uSW5pdC4gbmdPbkluaXQgaW5pdGlhbGl6ZXMgdGhlIHNlcnZpY2VzIHdpdGhvdXQgd2hpY2ggdGhlIHNldHRlciBmYWlscy5cbiAgICAvLyAyLiBUaGUgUmVuZGVyZXIgZG9lc24ndCB3b3JrIGJlZm9yZSBuZ0FmdGVyVmlld0luaXQgKEl0IHVzZWQgdG8gYmVmb3JlIHRoZSBuZXcgSG9zdFdyYXBwaW5nIE1vZHVsZSBmb3Igc29tZSByZWFzb24pLlxuICAgIC8vIEkgbmVlZCB0aGUgcmVuZGVyZXIgdG8gc2V0IHRoZSB2YWx1ZSBwcm9wZXJ0eSBvbiB0aGUgaW5wdXQgdG8gbWFrZSBzdXJlIHRoYXQgaWYgdGhlIHVzZXIgaGFzIHN1cHBsaWVkIGEgRGF0ZVxuICAgIC8vIGlucHV0IG9iamVjdCwgd2UgcmVmbGVjdCBpdCB3aXRoIHRoZSByaWdodCBkYXRlIG9uIHRoZSBpbnB1dCBmaWVsZCB1c2luZyB0aGUgSU8gc2VydmljZS4gSSBhbSBub3Qgc3VyZSBpZlxuICAgIC8vIHRoZXNlIGFyZSBtYWpvciBpc3N1ZXMgb3Igbm90IGJ1dCBqdXN0IG5vdGluZyB0aGVtIGRvd24gaGVyZS5cbiAgICB0aGlzLnByb2Nlc3NJbml0aWFsSW5wdXRzKCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdmb2N1cycpXG4gIHNldEZvY3VzU3RhdGVzKCkge1xuICAgIHRoaXMuc2V0Rm9jdXModHJ1ZSk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdibHVyJylcbiAgdHJpZ2dlclZhbGlkYXRpb24oKSB7XG4gICAgc3VwZXIudHJpZ2dlclZhbGlkYXRpb24oKTtcbiAgICB0aGlzLnNldEZvY3VzKGZhbHNlKTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnYXR0ci5wbGFjZWhvbGRlcicpXG4gIGdldCBwbGFjZWhvbGRlclRleHQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5wbGFjZWhvbGRlciA/IHRoaXMucGxhY2Vob2xkZXIgOiB0aGlzLmRhdGVJT1NlcnZpY2UucGxhY2Vob2xkZXJUZXh0O1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLnR5cGUnKVxuICBnZXQgaW5wdXRUeXBlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkgJiYgdGhpcy51c2luZ05hdGl2ZURhdGVwaWNrZXIoKSA/ICdkYXRlJyA6ICd0ZXh0JztcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NoYW5nZScsIFsnJGV2ZW50LnRhcmdldCddKVxuICBvblZhbHVlQ2hhbmdlKHRhcmdldDogSFRNTElucHV0RWxlbWVudCkge1xuICAgIGNvbnN0IHZhbGlkRGF0ZVZhbHVlID0gdGhpcy5kYXRlSU9TZXJ2aWNlLmdldERhdGVWYWx1ZUZyb21EYXRlU3RyaW5nKHRhcmdldC52YWx1ZSk7XG4gICAgaWYgKHRoaXMudXNpbmdDbGFyaXR5RGF0ZXBpY2tlcigpICYmIHZhbGlkRGF0ZVZhbHVlKSB7XG4gICAgICB0aGlzLnVwZGF0ZURhdGUodmFsaWREYXRlVmFsdWUsIHRydWUpO1xuICAgIH0gZWxzZSBpZiAodGhpcy51c2luZ05hdGl2ZURhdGVwaWNrZXIoKSkge1xuICAgICAgY29uc3QgW3llYXIsIG1vbnRoLCBkYXldID0gdGFyZ2V0LnZhbHVlLnNwbGl0KCctJyk7XG4gICAgICB0aGlzLnVwZGF0ZURhdGUobmV3IERhdGUoK3llYXIsICttb250aCAtIDEsICtkYXkpLCB0cnVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbWl0RGF0ZU91dHB1dChudWxsKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHVzaW5nQ2xhcml0eURhdGVwaWNrZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0ZXBpY2tlckVuYWJsZWRTZXJ2aWNlLmlzRW5hYmxlZDtcbiAgfVxuXG4gIHByaXZhdGUgdXNpbmdOYXRpdmVEYXRlcGlja2VyKCkge1xuICAgIHJldHVybiAhdGhpcy5kYXRlcGlja2VyRW5hYmxlZFNlcnZpY2UuaXNFbmFibGVkO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRGb2N1cyhmb2N1czogYm9vbGVhbikge1xuICAgIGlmICh0aGlzLmZvY3VzU2VydmljZSkge1xuICAgICAgdGhpcy5mb2N1c1NlcnZpY2UuZm9jdXNlZCA9IGZvY3VzO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcG9wdWxhdGVTZXJ2aWNlc0Zyb21Db250YWluZXJDb21wb25lbnQoKSB7XG4gICAgaWYgKCF0aGlzLmNvbnRhaW5lcikge1xuICAgICAgdGhpcy5kYXRlSU9TZXJ2aWNlID0gdGhpcy5nZXRQcm92aWRlckZyb21Db250YWluZXIoRGF0ZUlPU2VydmljZSk7XG4gICAgICB0aGlzLmRhdGVOYXZpZ2F0aW9uU2VydmljZSA9IHRoaXMuZ2V0UHJvdmlkZXJGcm9tQ29udGFpbmVyKERhdGVOYXZpZ2F0aW9uU2VydmljZSk7XG4gICAgICB0aGlzLmRhdGVwaWNrZXJFbmFibGVkU2VydmljZSA9IHRoaXMuZ2V0UHJvdmlkZXJGcm9tQ29udGFpbmVyKERhdGVwaWNrZXJFbmFibGVkU2VydmljZSk7XG4gICAgICB0aGlzLmRhdGVGb3JtQ29udHJvbFNlcnZpY2UgPSB0aGlzLmdldFByb3ZpZGVyRnJvbUNvbnRhaW5lcihEYXRlRm9ybUNvbnRyb2xTZXJ2aWNlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHByb2Nlc3NJbml0aWFsSW5wdXRzKCkge1xuICAgIGlmICh0aGlzLmRhdGVwaWNrZXJIYXNGb3JtQ29udHJvbCgpKSB7XG4gICAgICB0aGlzLnVwZGF0ZURhdGUodGhpcy5kYXRlSU9TZXJ2aWNlLmdldERhdGVWYWx1ZUZyb21EYXRlU3RyaW5nKHRoaXMuY29udHJvbC52YWx1ZSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnVwZGF0ZURhdGUodGhpcy5pbml0aWFsQ2xyRGF0ZUlucHV0VmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0Rm9ybUxheW91dCgpIHtcbiAgICBpZiAodGhpcy5jbHJOZXdMYXlvdXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5uZXdGb3Jtc0xheW91dCA9ICEhdGhpcy5jbHJOZXdMYXlvdXQ7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVEYXRlKHZhbHVlOiBEYXRlLCBzZXRCeVVzZXJJbnRlcmFjdGlvbiA9IGZhbHNlKSB7XG4gICAgY29uc3QgZGF0ZSA9IHRoaXMuZ2V0VmFsaWREYXRlVmFsdWVGcm9tRGF0ZSh2YWx1ZSk7XG5cbiAgICBpZiAoc2V0QnlVc2VySW50ZXJhY3Rpb24pIHtcbiAgICAgIHRoaXMuZW1pdERhdGVPdXRwdXQoZGF0ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucHJldmlvdXNEYXRlQ2hhbmdlID0gZGF0ZTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5kYXRlTmF2aWdhdGlvblNlcnZpY2UpIHtcbiAgICAgIHRoaXMuZGF0ZU5hdmlnYXRpb25TZXJ2aWNlLnNlbGVjdGVkRGF5ID0gZGF0ZVxuICAgICAgICA/IG5ldyBEYXlNb2RlbChkYXRlLmdldEZ1bGxZZWFyKCksIGRhdGUuZ2V0TW9udGgoKSwgZGF0ZS5nZXREYXRlKCkpXG4gICAgICAgIDogbnVsbDtcbiAgICB9XG5cbiAgICB0aGlzLnVwZGF0ZUlucHV0KGRhdGUpO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVJbnB1dChkYXRlOiBEYXRlKSB7XG4gICAgaWYgKGRhdGUpIHtcbiAgICAgIGNvbnN0IGRhdGVTdHJpbmcgPSB0aGlzLmRhdGVJT1NlcnZpY2UudG9Mb2NhbGVEaXNwbGF5Rm9ybWF0U3RyaW5nKGRhdGUpO1xuXG4gICAgICBpZiAodGhpcy5kYXRlcGlja2VySGFzRm9ybUNvbnRyb2woKSAmJiBkYXRlU3RyaW5nICE9PSB0aGlzLmNvbnRyb2wudmFsdWUpIHtcbiAgICAgICAgdGhpcy5jb250cm9sLmNvbnRyb2wuc2V0VmFsdWUoZGF0ZVN0cmluZyk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMudXNpbmdOYXRpdmVEYXRlcGlja2VyKCkpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICd2YWx1ZUFzRGF0ZScsIGRhdGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICd2YWx1ZScsIGRhdGVTdHJpbmcpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3ZhbHVlJywgJycpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0VmFsaWREYXRlVmFsdWVGcm9tRGF0ZShkYXRlOiBEYXRlKSB7XG4gICAgaWYgKHRoaXMuZGF0ZUlPU2VydmljZSkge1xuICAgICAgY29uc3QgZGF0ZVN0cmluZyA9IHRoaXMuZGF0ZUlPU2VydmljZS50b0xvY2FsZURpc3BsYXlGb3JtYXRTdHJpbmcoZGF0ZSk7XG4gICAgICByZXR1cm4gdGhpcy5kYXRlSU9TZXJ2aWNlLmdldERhdGVWYWx1ZUZyb21EYXRlU3RyaW5nKGRhdGVTdHJpbmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGVtaXREYXRlT3V0cHV0KGRhdGU6IERhdGUpIHtcbiAgICBpZiAoIWRhdGVzQXJlRXF1YWwoZGF0ZSwgdGhpcy5wcmV2aW91c0RhdGVDaGFuZ2UpKSB7XG4gICAgICB0aGlzLmRhdGVDaGFuZ2UuZW1pdChkYXRlKTtcbiAgICAgIHRoaXMucHJldmlvdXNEYXRlQ2hhbmdlID0gZGF0ZTtcbiAgICB9IGVsc2UgaWYgKCFkYXRlICYmIHRoaXMucHJldmlvdXNEYXRlQ2hhbmdlKSB7XG4gICAgICB0aGlzLmRhdGVDaGFuZ2UuZW1pdChudWxsKTtcbiAgICAgIHRoaXMucHJldmlvdXNEYXRlQ2hhbmdlID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGRhdGVwaWNrZXJIYXNGb3JtQ29udHJvbCgpIHtcbiAgICByZXR1cm4gISF0aGlzLmNvbnRyb2w7XG4gIH1cblxuICBwcml2YXRlIGxpc3RlbkZvckNvbnRyb2xWYWx1ZUNoYW5nZXMoKSB7XG4gICAgcmV0dXJuIG9mKHRoaXMuZGF0ZXBpY2tlckhhc0Zvcm1Db250cm9sKCkpXG4gICAgICAucGlwZShcbiAgICAgICAgZmlsdGVyKGhhc0NvbnRyb2wgPT4gaGFzQ29udHJvbCksXG4gICAgICAgIHN3aXRjaE1hcCgoKSA9PiB0aGlzLmNvbnRyb2wudmFsdWVDaGFuZ2VzKSxcbiAgICAgICAgLy8gb25seSB1cGRhdGUgZGF0ZSB2YWx1ZSBpZiBub3QgYmVpbmcgc2V0IGJ5IHVzZXJcbiAgICAgICAgZmlsdGVyKCgpID0+ICF0aGlzLmRhdGVwaWNrZXJGb2N1c1NlcnZpY2UuZWxlbWVudElzRm9jdXNlZCh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpKVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgodmFsdWU6IHN0cmluZykgPT4gdGhpcy51cGRhdGVEYXRlKHRoaXMuZGF0ZUlPU2VydmljZS5nZXREYXRlVmFsdWVGcm9tRGF0ZVN0cmluZyh2YWx1ZSkpKTtcbiAgfVxuXG4gIHByaXZhdGUgbGlzdGVuRm9yVXNlclNlbGVjdGVkRGF5Q2hhbmdlcygpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRlTmF2aWdhdGlvblNlcnZpY2Uuc2VsZWN0ZWREYXlDaGFuZ2Uuc3Vic2NyaWJlKGRheU1vZGVsID0+IHRoaXMudXBkYXRlRGF0ZShkYXlNb2RlbC50b0RhdGUoKSwgdHJ1ZSkpO1xuICB9XG5cbiAgcHJpdmF0ZSBsaXN0ZW5Gb3JUb3VjaENoYW5nZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0ZUZvcm1Db250cm9sU2VydmljZS50b3VjaGVkQ2hhbmdlXG4gICAgICAucGlwZShmaWx0ZXIoKCkgPT4gdGhpcy5kYXRlcGlja2VySGFzRm9ybUNvbnRyb2woKSkpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuY29udHJvbC5jb250cm9sLm1hcmtBc1RvdWNoZWQoKSk7XG4gIH1cblxuICBwcml2YXRlIGxpc3RlbkZvckRpcnR5Q2hhbmdlcygpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRlRm9ybUNvbnRyb2xTZXJ2aWNlLmRpcnR5Q2hhbmdlXG4gICAgICAucGlwZShmaWx0ZXIoKCkgPT4gdGhpcy5kYXRlcGlja2VySGFzRm9ybUNvbnRyb2woKSkpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuY29udHJvbC5jb250cm9sLm1hcmtBc0RpcnR5KCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBsaXN0ZW5Gb3JJbnB1dFJlZm9jdXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0ZU5hdmlnYXRpb25TZXJ2aWNlLnNlbGVjdGVkRGF5Q2hhbmdlXG4gICAgICAucGlwZShmaWx0ZXIoZGF0ZSA9PiAhIWRhdGUpKVxuICAgICAgLnN1YnNjcmliZSh2ID0+IHRoaXMuZGF0ZXBpY2tlckZvY3VzU2VydmljZS5mb2N1c0lucHV0KHRoaXMuZWwubmF0aXZlRWxlbWVudCkpO1xuICB9XG59XG4iXX0=