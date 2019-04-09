/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
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
import { DatepickerFocusService } from './providers/datepicker-focus.service';
import { datesAreEqual } from './utils/date-utils';
// There are four ways the datepicker value is set
// 1. Value set by user typing into text input as a string ex: '01/28/2015'
// 2. Value set explicitly by Angular Forms APIs as a string ex: '01/28/2015'
// 3. Value set by user via datepicker UI as a Date Object
// 4. Value set via `clrDate` input as a Date Object
var ClrDateInput = /** @class */ (function (_super) {
    tslib_1.__extends(ClrDateInput, _super);
    function ClrDateInput(viewContainerRef, injector, el, renderer, control, container, dateIOService, dateNavigationService, datepickerEnabledService, dateFormControlService, platformId, focusService, datepickerFocusService) {
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
        _this.datepickerFocusService = datepickerFocusService;
        _this.dateChange = new EventEmitter(false);
        _this.index = 1;
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
                        '[class.clr-input]': 'true',
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
        { type: DatepickerFocusService }
    ]; };
    ClrDateInput.propDecorators = {
        placeholder: [{ type: Input }],
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
    /**
     * @type {?}
     * @private
     */
    ClrDateInput.prototype.datepickerFocusService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1pbnB1dC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImZvcm1zL2RhdGVwaWNrZXIvZGF0ZS1pbnB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBTUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDcEQsT0FBTyxFQUVMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFdBQVcsRUFDWCxZQUFZLEVBQ1osTUFBTSxFQUNOLFFBQVEsRUFDUixLQUFLLEVBR0wsUUFBUSxFQUNSLE1BQU0sRUFDTixXQUFXLEVBQ1gsU0FBUyxFQUNULElBQUksRUFDSixnQkFBZ0IsR0FDakIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbkQsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUUxQixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDakUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDL0QsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQy9FLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUM1RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUM1RSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNsRixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FB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O0lBWXhGLDZCQUFvQjs7Ozs7SUFDcEIsZ0RBQXVDOzs7OztJQUN2QywwQ0FBaUM7Ozs7O0lBSy9CLDBCQUF3Qjs7Ozs7SUFDeEIsZ0NBQTZCOzs7OztJQUM3QiwrQkFFNEI7Ozs7O0lBQzVCLGlDQUErQzs7Ozs7SUFDL0MscUNBQWdEOzs7OztJQUNoRCw2Q0FBZ0U7Ozs7O0lBQ2hFLGdEQUFzRTs7Ozs7SUFDdEUsOENBQWtFOzs7OztJQUNsRSxrQ0FBK0M7Ozs7O0lBQy9DLG9DQUE4Qzs7Ozs7SUFDOUMsOENBQXNEIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdEJpbmRpbmcsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5qZWN0LFxuICBJbmplY3RvcixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxuICBQTEFURk9STV9JRCxcbiAgUmVuZGVyZXIyLFxuICBTZWxmLFxuICBWaWV3Q29udGFpbmVyUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IGZpbHRlciwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgb2YgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgRm9jdXNTZXJ2aWNlIH0gZnJvbSAnLi4vY29tbW9uL3Byb3ZpZGVycy9mb2N1cy5zZXJ2aWNlJztcbmltcG9ydCB7IFdyYXBwZWRGb3JtQ29udHJvbCB9IGZyb20gJy4uL2NvbW1vbi93cmFwcGVkLWNvbnRyb2wnO1xuaW1wb3J0IHsgQ2xyRGF0ZUNvbnRhaW5lciB9IGZyb20gJy4vZGF0ZS1jb250YWluZXInO1xuaW1wb3J0IHsgRGF5TW9kZWwgfSBmcm9tICcuL21vZGVsL2RheS5tb2RlbCc7XG5pbXBvcnQgeyBEYXRlRm9ybUNvbnRyb2xTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvZGF0ZS1mb3JtLWNvbnRyb2wuc2VydmljZSc7XG5pbXBvcnQgeyBEYXRlSU9TZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvZGF0ZS1pby5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGVOYXZpZ2F0aW9uU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2RhdGUtbmF2aWdhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGVwaWNrZXJFbmFibGVkU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2RhdGVwaWNrZXItZW5hYmxlZC5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGVwaWNrZXJGb2N1c1NlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9kYXRlcGlja2VyLWZvY3VzLnNlcnZpY2UnO1xuaW1wb3J0IHsgZGF0ZXNBcmVFcXVhbCB9IGZyb20gJy4vdXRpbHMvZGF0ZS11dGlscyc7XG5cbi8vIFRoZXJlIGFyZSBmb3VyIHdheXMgdGhlIGRhdGVwaWNrZXIgdmFsdWUgaXMgc2V0XG4vLyAxLiBWYWx1ZSBzZXQgYnkgdXNlciB0eXBpbmcgaW50byB0ZXh0IGlucHV0IGFzIGEgc3RyaW5nIGV4OiAnMDEvMjgvMjAxNSdcbi8vIDIuIFZhbHVlIHNldCBleHBsaWNpdGx5IGJ5IEFuZ3VsYXIgRm9ybXMgQVBJcyBhcyBhIHN0cmluZyBleDogJzAxLzI4LzIwMTUnXG4vLyAzLiBWYWx1ZSBzZXQgYnkgdXNlciB2aWEgZGF0ZXBpY2tlciBVSSBhcyBhIERhdGUgT2JqZWN0XG4vLyA0LiBWYWx1ZSBzZXQgdmlhIGBjbHJEYXRlYCBpbnB1dCBhcyBhIERhdGUgT2JqZWN0XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tjbHJEYXRlXScsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmNsci1pbnB1dF0nOiAndHJ1ZScsXG4gIH0sXG4gIHByb3ZpZGVyczogW0RhdGVwaWNrZXJGb2N1c1NlcnZpY2VdLFxufSlcbmV4cG9ydCBjbGFzcyBDbHJEYXRlSW5wdXQgZXh0ZW5kcyBXcmFwcGVkRm9ybUNvbnRyb2w8Q2xyRGF0ZUNvbnRhaW5lcj4gaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG4gIEBPdXRwdXQoJ2NsckRhdGVDaGFuZ2UnKSBkYXRlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8RGF0ZT4gPSBuZXcgRXZlbnRFbWl0dGVyPERhdGU+KGZhbHNlKTtcbiAgQElucHV0KCdjbHJEYXRlJylcbiAgc2V0IGRhdGUoZGF0ZTogRGF0ZSkge1xuICAgIGlmICh0aGlzLnByZXZpb3VzRGF0ZUNoYW5nZSAhPT0gZGF0ZSkge1xuICAgICAgdGhpcy51cGRhdGVEYXRlKHRoaXMuZ2V0VmFsaWREYXRlVmFsdWVGcm9tRGF0ZShkYXRlKSk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmluaXRpYWxDbHJEYXRlSW5wdXRWYWx1ZSkge1xuICAgICAgdGhpcy5pbml0aWFsQ2xyRGF0ZUlucHV0VmFsdWUgPSBkYXRlO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBpbmRleCA9IDE7XG4gIHByaXZhdGUgaW5pdGlhbENsckRhdGVJbnB1dFZhbHVlOiBEYXRlO1xuICBwcml2YXRlIHByZXZpb3VzRGF0ZUNoYW5nZTogRGF0ZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIGluamVjdG9yOiBJbmplY3RvcixcbiAgICBwcm90ZWN0ZWQgZWw6IEVsZW1lbnRSZWYsXG4gICAgcHJvdGVjdGVkIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgQFNlbGYoKVxuICAgIEBPcHRpb25hbCgpXG4gICAgcHJvdGVjdGVkIGNvbnRyb2w6IE5nQ29udHJvbCxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGNvbnRhaW5lcjogQ2xyRGF0ZUNvbnRhaW5lcixcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGRhdGVJT1NlcnZpY2U6IERhdGVJT1NlcnZpY2UsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBkYXRlTmF2aWdhdGlvblNlcnZpY2U6IERhdGVOYXZpZ2F0aW9uU2VydmljZSxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGRhdGVwaWNrZXJFbmFibGVkU2VydmljZTogRGF0ZXBpY2tlckVuYWJsZWRTZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZGF0ZUZvcm1Db250cm9sU2VydmljZTogRGF0ZUZvcm1Db250cm9sU2VydmljZSxcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IE9iamVjdCxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGZvY3VzU2VydmljZTogRm9jdXNTZXJ2aWNlLFxuICAgIHByaXZhdGUgZGF0ZXBpY2tlckZvY3VzU2VydmljZTogRGF0ZXBpY2tlckZvY3VzU2VydmljZVxuICApIHtcbiAgICBzdXBlcih2aWV3Q29udGFpbmVyUmVmLCBDbHJEYXRlQ29udGFpbmVyLCBpbmplY3RvciwgY29udHJvbCwgcmVuZGVyZXIsIGVsKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gICAgdGhpcy5wb3B1bGF0ZVNlcnZpY2VzRnJvbUNvbnRhaW5lckNvbXBvbmVudCgpO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLmxpc3RlbkZvclVzZXJTZWxlY3RlZERheUNoYW5nZXMoKSxcbiAgICAgIHRoaXMubGlzdGVuRm9yQ29udHJvbFZhbHVlQ2hhbmdlcygpLFxuICAgICAgdGhpcy5saXN0ZW5Gb3JUb3VjaENoYW5nZXMoKSxcbiAgICAgIHRoaXMubGlzdGVuRm9yRGlydHlDaGFuZ2VzKCksXG4gICAgICB0aGlzLmxpc3RlbkZvcklucHV0UmVmb2N1cygpXG4gICAgKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAvLyBJIGRvbid0IGtub3cgd2h5IEkgaGF2ZSB0byBkbyB0aGlzIGJ1dCBhZnRlciB1c2luZyB0aGUgbmV3IEhvc3RXcmFwcGluZyBNb2R1bGUgSSBoYXZlIHRvIGRlbGF5IHRoZSBwcm9jZXNzaW5nXG4gICAgLy8gb2YgdGhlIGluaXRpYWwgSW5wdXQgc2V0IGJ5IHRoZSB1c2VyIHRvIGhlcmUuIElmIEkgZG8gbm90IDIgaXNzdWVzIG9jY3VyOlxuICAgIC8vIDEuIFRoZSBJbnB1dCBzZXR0ZXIgaXMgY2FsbGVkIGJlZm9yZSBuZ09uSW5pdC4gbmdPbkluaXQgaW5pdGlhbGl6ZXMgdGhlIHNlcnZpY2VzIHdpdGhvdXQgd2hpY2ggdGhlIHNldHRlciBmYWlscy5cbiAgICAvLyAyLiBUaGUgUmVuZGVyZXIgZG9lc24ndCB3b3JrIGJlZm9yZSBuZ0FmdGVyVmlld0luaXQgKEl0IHVzZWQgdG8gYmVmb3JlIHRoZSBuZXcgSG9zdFdyYXBwaW5nIE1vZHVsZSBmb3Igc29tZSByZWFzb24pLlxuICAgIC8vIEkgbmVlZCB0aGUgcmVuZGVyZXIgdG8gc2V0IHRoZSB2YWx1ZSBwcm9wZXJ0eSBvbiB0aGUgaW5wdXQgdG8gbWFrZSBzdXJlIHRoYXQgaWYgdGhlIHVzZXIgaGFzIHN1cHBsaWVkIGEgRGF0ZVxuICAgIC8vIGlucHV0IG9iamVjdCwgd2UgcmVmbGVjdCBpdCB3aXRoIHRoZSByaWdodCBkYXRlIG9uIHRoZSBpbnB1dCBmaWVsZCB1c2luZyB0aGUgSU8gc2VydmljZS4gSSBhbSBub3Qgc3VyZSBpZlxuICAgIC8vIHRoZXNlIGFyZSBtYWpvciBpc3N1ZXMgb3Igbm90IGJ1dCBqdXN0IG5vdGluZyB0aGVtIGRvd24gaGVyZS5cbiAgICB0aGlzLnByb2Nlc3NJbml0aWFsSW5wdXRzKCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdmb2N1cycpXG4gIHNldEZvY3VzU3RhdGVzKCkge1xuICAgIHRoaXMuc2V0Rm9jdXModHJ1ZSk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdibHVyJylcbiAgdHJpZ2dlclZhbGlkYXRpb24oKSB7XG4gICAgc3VwZXIudHJpZ2dlclZhbGlkYXRpb24oKTtcbiAgICB0aGlzLnNldEZvY3VzKGZhbHNlKTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnYXR0ci5wbGFjZWhvbGRlcicpXG4gIGdldCBwbGFjZWhvbGRlclRleHQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5wbGFjZWhvbGRlciA/IHRoaXMucGxhY2Vob2xkZXIgOiB0aGlzLmRhdGVJT1NlcnZpY2UucGxhY2Vob2xkZXJUZXh0O1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLnR5cGUnKVxuICBnZXQgaW5wdXRUeXBlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkgJiYgdGhpcy51c2luZ05hdGl2ZURhdGVwaWNrZXIoKSA/ICdkYXRlJyA6ICd0ZXh0JztcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NoYW5nZScsIFsnJGV2ZW50LnRhcmdldCddKVxuICBvblZhbHVlQ2hhbmdlKHRhcmdldDogSFRNTElucHV0RWxlbWVudCkge1xuICAgIGNvbnN0IHZhbGlkRGF0ZVZhbHVlID0gdGhpcy5kYXRlSU9TZXJ2aWNlLmdldERhdGVWYWx1ZUZyb21EYXRlU3RyaW5nKHRhcmdldC52YWx1ZSk7XG4gICAgaWYgKHRoaXMudXNpbmdDbGFyaXR5RGF0ZXBpY2tlcigpICYmIHZhbGlkRGF0ZVZhbHVlKSB7XG4gICAgICB0aGlzLnVwZGF0ZURhdGUodmFsaWREYXRlVmFsdWUsIHRydWUpO1xuICAgIH0gZWxzZSBpZiAodGhpcy51c2luZ05hdGl2ZURhdGVwaWNrZXIoKSkge1xuICAgICAgY29uc3QgW3llYXIsIG1vbnRoLCBkYXldID0gdGFyZ2V0LnZhbHVlLnNwbGl0KCctJyk7XG4gICAgICB0aGlzLnVwZGF0ZURhdGUobmV3IERhdGUoK3llYXIsICttb250aCAtIDEsICtkYXkpLCB0cnVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbWl0RGF0ZU91dHB1dChudWxsKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHVzaW5nQ2xhcml0eURhdGVwaWNrZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0ZXBpY2tlckVuYWJsZWRTZXJ2aWNlLmlzRW5hYmxlZDtcbiAgfVxuXG4gIHByaXZhdGUgdXNpbmdOYXRpdmVEYXRlcGlja2VyKCkge1xuICAgIHJldHVybiAhdGhpcy5kYXRlcGlja2VyRW5hYmxlZFNlcnZpY2UuaXNFbmFibGVkO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRGb2N1cyhmb2N1czogYm9vbGVhbikge1xuICAgIGlmICh0aGlzLmZvY3VzU2VydmljZSkge1xuICAgICAgdGhpcy5mb2N1c1NlcnZpY2UuZm9jdXNlZCA9IGZvY3VzO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcG9wdWxhdGVTZXJ2aWNlc0Zyb21Db250YWluZXJDb21wb25lbnQoKSB7XG4gICAgaWYgKCF0aGlzLmNvbnRhaW5lcikge1xuICAgICAgdGhpcy5kYXRlSU9TZXJ2aWNlID0gdGhpcy5nZXRQcm92aWRlckZyb21Db250YWluZXIoRGF0ZUlPU2VydmljZSk7XG4gICAgICB0aGlzLmRhdGVOYXZpZ2F0aW9uU2VydmljZSA9IHRoaXMuZ2V0UHJvdmlkZXJGcm9tQ29udGFpbmVyKERhdGVOYXZpZ2F0aW9uU2VydmljZSk7XG4gICAgICB0aGlzLmRhdGVwaWNrZXJFbmFibGVkU2VydmljZSA9IHRoaXMuZ2V0UHJvdmlkZXJGcm9tQ29udGFpbmVyKERhdGVwaWNrZXJFbmFibGVkU2VydmljZSk7XG4gICAgICB0aGlzLmRhdGVGb3JtQ29udHJvbFNlcnZpY2UgPSB0aGlzLmdldFByb3ZpZGVyRnJvbUNvbnRhaW5lcihEYXRlRm9ybUNvbnRyb2xTZXJ2aWNlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHByb2Nlc3NJbml0aWFsSW5wdXRzKCkge1xuICAgIGlmICh0aGlzLmRhdGVwaWNrZXJIYXNGb3JtQ29udHJvbCgpKSB7XG4gICAgICB0aGlzLnVwZGF0ZURhdGUodGhpcy5kYXRlSU9TZXJ2aWNlLmdldERhdGVWYWx1ZUZyb21EYXRlU3RyaW5nKHRoaXMuY29udHJvbC52YWx1ZSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnVwZGF0ZURhdGUodGhpcy5pbml0aWFsQ2xyRGF0ZUlucHV0VmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlRGF0ZSh2YWx1ZTogRGF0ZSwgc2V0QnlVc2VySW50ZXJhY3Rpb24gPSBmYWxzZSkge1xuICAgIGNvbnN0IGRhdGUgPSB0aGlzLmdldFZhbGlkRGF0ZVZhbHVlRnJvbURhdGUodmFsdWUpO1xuXG4gICAgaWYgKHNldEJ5VXNlckludGVyYWN0aW9uKSB7XG4gICAgICB0aGlzLmVtaXREYXRlT3V0cHV0KGRhdGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnByZXZpb3VzRGF0ZUNoYW5nZSA9IGRhdGU7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZGF0ZU5hdmlnYXRpb25TZXJ2aWNlKSB7XG4gICAgICB0aGlzLmRhdGVOYXZpZ2F0aW9uU2VydmljZS5zZWxlY3RlZERheSA9IGRhdGVcbiAgICAgICAgPyBuZXcgRGF5TW9kZWwoZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXRlLmdldE1vbnRoKCksIGRhdGUuZ2V0RGF0ZSgpKVxuICAgICAgICA6IG51bGw7XG4gICAgfVxuXG4gICAgdGhpcy51cGRhdGVJbnB1dChkYXRlKTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlSW5wdXQoZGF0ZTogRGF0ZSkge1xuICAgIGlmIChkYXRlKSB7XG4gICAgICBjb25zdCBkYXRlU3RyaW5nID0gdGhpcy5kYXRlSU9TZXJ2aWNlLnRvTG9jYWxlRGlzcGxheUZvcm1hdFN0cmluZyhkYXRlKTtcblxuICAgICAgaWYgKHRoaXMuZGF0ZXBpY2tlckhhc0Zvcm1Db250cm9sKCkgJiYgZGF0ZVN0cmluZyAhPT0gdGhpcy5jb250cm9sLnZhbHVlKSB7XG4gICAgICAgIHRoaXMuY29udHJvbC5jb250cm9sLnNldFZhbHVlKGRhdGVTdHJpbmcpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnVzaW5nTmF0aXZlRGF0ZXBpY2tlcigpKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAndmFsdWVBc0RhdGUnLCBkYXRlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAndmFsdWUnLCBkYXRlU3RyaW5nKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICd2YWx1ZScsICcnKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldFZhbGlkRGF0ZVZhbHVlRnJvbURhdGUoZGF0ZTogRGF0ZSkge1xuICAgIGlmICh0aGlzLmRhdGVJT1NlcnZpY2UpIHtcbiAgICAgIGNvbnN0IGRhdGVTdHJpbmcgPSB0aGlzLmRhdGVJT1NlcnZpY2UudG9Mb2NhbGVEaXNwbGF5Rm9ybWF0U3RyaW5nKGRhdGUpO1xuICAgICAgcmV0dXJuIHRoaXMuZGF0ZUlPU2VydmljZS5nZXREYXRlVmFsdWVGcm9tRGF0ZVN0cmluZyhkYXRlU3RyaW5nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBlbWl0RGF0ZU91dHB1dChkYXRlOiBEYXRlKSB7XG4gICAgaWYgKCFkYXRlc0FyZUVxdWFsKGRhdGUsIHRoaXMucHJldmlvdXNEYXRlQ2hhbmdlKSkge1xuICAgICAgdGhpcy5kYXRlQ2hhbmdlLmVtaXQoZGF0ZSk7XG4gICAgICB0aGlzLnByZXZpb3VzRGF0ZUNoYW5nZSA9IGRhdGU7XG4gICAgfSBlbHNlIGlmICghZGF0ZSAmJiB0aGlzLnByZXZpb3VzRGF0ZUNoYW5nZSkge1xuICAgICAgdGhpcy5kYXRlQ2hhbmdlLmVtaXQobnVsbCk7XG4gICAgICB0aGlzLnByZXZpb3VzRGF0ZUNoYW5nZSA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBkYXRlcGlja2VySGFzRm9ybUNvbnRyb2woKSB7XG4gICAgcmV0dXJuICEhdGhpcy5jb250cm9sO1xuICB9XG5cbiAgcHJpdmF0ZSBsaXN0ZW5Gb3JDb250cm9sVmFsdWVDaGFuZ2VzKCkge1xuICAgIHJldHVybiBvZih0aGlzLmRhdGVwaWNrZXJIYXNGb3JtQ29udHJvbCgpKVxuICAgICAgLnBpcGUoXG4gICAgICAgIGZpbHRlcihoYXNDb250cm9sID0+IGhhc0NvbnRyb2wpLFxuICAgICAgICBzd2l0Y2hNYXAoKCkgPT4gdGhpcy5jb250cm9sLnZhbHVlQ2hhbmdlcyksXG4gICAgICAgIC8vIG9ubHkgdXBkYXRlIGRhdGUgdmFsdWUgaWYgbm90IGJlaW5nIHNldCBieSB1c2VyXG4gICAgICAgIGZpbHRlcigoKSA9PiAhdGhpcy5kYXRlcGlja2VyRm9jdXNTZXJ2aWNlLmVsZW1lbnRJc0ZvY3VzZWQodGhpcy5lbC5uYXRpdmVFbGVtZW50KSlcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKHZhbHVlOiBzdHJpbmcpID0+IHRoaXMudXBkYXRlRGF0ZSh0aGlzLmRhdGVJT1NlcnZpY2UuZ2V0RGF0ZVZhbHVlRnJvbURhdGVTdHJpbmcodmFsdWUpKSk7XG4gIH1cblxuICBwcml2YXRlIGxpc3RlbkZvclVzZXJTZWxlY3RlZERheUNoYW5nZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0ZU5hdmlnYXRpb25TZXJ2aWNlLnNlbGVjdGVkRGF5Q2hhbmdlLnN1YnNjcmliZShkYXlNb2RlbCA9PiB0aGlzLnVwZGF0ZURhdGUoZGF5TW9kZWwudG9EYXRlKCksIHRydWUpKTtcbiAgfVxuXG4gIHByaXZhdGUgbGlzdGVuRm9yVG91Y2hDaGFuZ2VzKCkge1xuICAgIHJldHVybiB0aGlzLmRhdGVGb3JtQ29udHJvbFNlcnZpY2UudG91Y2hlZENoYW5nZVxuICAgICAgLnBpcGUoZmlsdGVyKCgpID0+IHRoaXMuZGF0ZXBpY2tlckhhc0Zvcm1Db250cm9sKCkpKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmNvbnRyb2wuY29udHJvbC5tYXJrQXNUb3VjaGVkKCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBsaXN0ZW5Gb3JEaXJ0eUNoYW5nZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0ZUZvcm1Db250cm9sU2VydmljZS5kaXJ0eUNoYW5nZVxuICAgICAgLnBpcGUoZmlsdGVyKCgpID0+IHRoaXMuZGF0ZXBpY2tlckhhc0Zvcm1Db250cm9sKCkpKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmNvbnRyb2wuY29udHJvbC5tYXJrQXNEaXJ0eSgpKTtcbiAgfVxuXG4gIHByaXZhdGUgbGlzdGVuRm9ySW5wdXRSZWZvY3VzKCkge1xuICAgIHJldHVybiB0aGlzLmRhdGVOYXZpZ2F0aW9uU2VydmljZS5zZWxlY3RlZERheUNoYW5nZVxuICAgICAgLnBpcGUoZmlsdGVyKGRhdGUgPT4gISFkYXRlKSlcbiAgICAgIC5zdWJzY3JpYmUodiA9PiB0aGlzLmRhdGVwaWNrZXJGb2N1c1NlcnZpY2UuZm9jdXNJbnB1dCh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpKTtcbiAgfVxufVxuIl19