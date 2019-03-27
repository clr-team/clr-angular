/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export class ClrDateInput extends WrappedFormControl {
    /**
     * @param {?} viewContainerRef
     * @param {?} injector
     * @param {?} el
     * @param {?} renderer
     * @param {?} control
     * @param {?} container
     * @param {?} dateIOService
     * @param {?} dateNavigationService
     * @param {?} datepickerEnabledService
     * @param {?} dateFormControlService
     * @param {?} platformId
     * @param {?} focusService
     * @param {?} newFormsLayout
     * @param {?} datepickerFocusService
     */
    constructor(viewContainerRef, injector, el, renderer, control, container, dateIOService, dateNavigationService, datepickerEnabledService, dateFormControlService, platformId, focusService, newFormsLayout, datepickerFocusService) {
        super(viewContainerRef, ClrDateContainer, injector, control, renderer, el);
        this.el = el;
        this.renderer = renderer;
        this.control = control;
        this.container = container;
        this.dateIOService = dateIOService;
        this.dateNavigationService = dateNavigationService;
        this.datepickerEnabledService = datepickerEnabledService;
        this.dateFormControlService = dateFormControlService;
        this.platformId = platformId;
        this.focusService = focusService;
        this.newFormsLayout = newFormsLayout;
        this.datepickerFocusService = datepickerFocusService;
        this.dateChange = new EventEmitter(false);
        this.index = 4;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    set date(date) {
        if (this.previousDateChange !== date) {
            this.updateDate(this.getValidDateValueFromDate(date));
        }
        if (!this.initialClrDateInputValue) {
            this.initialClrDateInputValue = date;
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        this.setFormLayout();
        this.populateServicesFromContainerComponent();
        this.subscriptions.push(this.listenForUserSelectedDayChanges(), this.listenForControlValueChanges(), this.listenForTouchChanges(), this.listenForDirtyChanges(), this.listenForInputRefocus());
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        // I don't know why I have to do this but after using the new HostWrapping Module I have to delay the processing
        // of the initial Input set by the user to here. If I do not 2 issues occur:
        // 1. The Input setter is called before ngOnInit. ngOnInit initializes the services without which the setter fails.
        // 2. The Renderer doesn't work before ngAfterViewInit (It used to before the new HostWrapping Module for some reason).
        // I need the renderer to set the value property on the input to make sure that if the user has supplied a Date
        // input object, we reflect it with the right date on the input field using the IO service. I am not sure if
        // these are major issues or not but just noting them down here.
        this.processInitialInputs();
    }
    /**
     * @return {?}
     */
    setFocusStates() {
        this.setFocus(true);
    }
    /**
     * @return {?}
     */
    triggerValidation() {
        super.triggerValidation();
        this.setFocus(false);
    }
    /**
     * @return {?}
     */
    get placeholderText() {
        return this.placeholder ? this.placeholder : this.dateIOService.placeholderText;
    }
    /**
     * @return {?}
     */
    get inputType() {
        return isPlatformBrowser(this.platformId) && this.usingNativeDatepicker() ? 'date' : 'text';
    }
    /**
     * @param {?} target
     * @return {?}
     */
    onValueChange(target) {
        /** @type {?} */
        const validDateValue = this.dateIOService.getDateValueFromDateString(target.value);
        if (this.usingClarityDatepicker() && validDateValue) {
            this.updateDate(validDateValue, true);
        }
        else if (this.usingNativeDatepicker()) {
            const [year, month, day] = target.value.split('-');
            this.updateDate(new Date(+year, +month - 1, +day), true);
        }
        else {
            this.emitDateOutput(null);
        }
    }
    /**
     * @private
     * @return {?}
     */
    usingClarityDatepicker() {
        return this.datepickerEnabledService.isEnabled;
    }
    /**
     * @private
     * @return {?}
     */
    usingNativeDatepicker() {
        return !this.datepickerEnabledService.isEnabled;
    }
    /**
     * @private
     * @param {?} focus
     * @return {?}
     */
    setFocus(focus) {
        if (this.focusService) {
            this.focusService.focused = focus;
        }
    }
    /**
     * @private
     * @return {?}
     */
    populateServicesFromContainerComponent() {
        if (!this.container) {
            this.dateIOService = this.getProviderFromContainer(DateIOService);
            this.dateNavigationService = this.getProviderFromContainer(DateNavigationService);
            this.datepickerEnabledService = this.getProviderFromContainer(DatepickerEnabledService);
            this.dateFormControlService = this.getProviderFromContainer(DateFormControlService);
        }
    }
    /**
     * @private
     * @return {?}
     */
    processInitialInputs() {
        if (this.datepickerHasFormControl()) {
            this.updateDate(this.dateIOService.getDateValueFromDateString(this.control.value));
        }
        else {
            this.updateDate(this.initialClrDateInputValue);
        }
    }
    /**
     * @private
     * @return {?}
     */
    setFormLayout() {
        if (this.clrNewLayout !== undefined) {
            this.newFormsLayout = !!this.clrNewLayout;
        }
    }
    /**
     * @private
     * @param {?} value
     * @param {?=} setByUserInteraction
     * @return {?}
     */
    updateDate(value, setByUserInteraction = false) {
        /** @type {?} */
        const date = this.getValidDateValueFromDate(value);
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
    }
    /**
     * @private
     * @param {?} date
     * @return {?}
     */
    updateInput(date) {
        if (date) {
            /** @type {?} */
            const dateString = this.dateIOService.toLocaleDisplayFormatString(date);
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
    }
    /**
     * @private
     * @param {?} date
     * @return {?}
     */
    getValidDateValueFromDate(date) {
        if (this.dateIOService) {
            /** @type {?} */
            const dateString = this.dateIOService.toLocaleDisplayFormatString(date);
            return this.dateIOService.getDateValueFromDateString(dateString);
        }
        else {
            return null;
        }
    }
    /**
     * @private
     * @param {?} date
     * @return {?}
     */
    emitDateOutput(date) {
        if (!datesAreEqual(date, this.previousDateChange)) {
            this.dateChange.emit(date);
            this.previousDateChange = date;
        }
        else if (!date && this.previousDateChange) {
            this.dateChange.emit(null);
            this.previousDateChange = null;
        }
    }
    /**
     * @private
     * @return {?}
     */
    datepickerHasFormControl() {
        return !!this.control;
    }
    /**
     * @private
     * @return {?}
     */
    listenForControlValueChanges() {
        return of(this.datepickerHasFormControl())
            .pipe(filter((/**
         * @param {?} hasControl
         * @return {?}
         */
        hasControl => hasControl)), switchMap((/**
         * @return {?}
         */
        () => this.control.valueChanges)), 
        // only update date value if not being set by user
        filter((/**
         * @return {?}
         */
        () => !this.datepickerFocusService.elementIsFocused(this.el.nativeElement))))
            .subscribe((/**
         * @param {?} value
         * @return {?}
         */
        (value) => this.updateDate(this.dateIOService.getDateValueFromDateString(value))));
    }
    /**
     * @private
     * @return {?}
     */
    listenForUserSelectedDayChanges() {
        return this.dateNavigationService.selectedDayChange.subscribe((/**
         * @param {?} dayModel
         * @return {?}
         */
        dayModel => this.updateDate(dayModel.toDate(), true)));
    }
    /**
     * @private
     * @return {?}
     */
    listenForTouchChanges() {
        return this.dateFormControlService.touchedChange
            .pipe(filter((/**
         * @return {?}
         */
        () => this.datepickerHasFormControl())))
            .subscribe((/**
         * @return {?}
         */
        () => this.control.control.markAsTouched()));
    }
    /**
     * @private
     * @return {?}
     */
    listenForDirtyChanges() {
        return this.dateFormControlService.dirtyChange
            .pipe(filter((/**
         * @return {?}
         */
        () => this.datepickerHasFormControl())))
            .subscribe((/**
         * @return {?}
         */
        () => this.control.control.markAsDirty()));
    }
    /**
     * @private
     * @return {?}
     */
    listenForInputRefocus() {
        return this.dateNavigationService.selectedDayChange
            .pipe(filter((/**
         * @param {?} date
         * @return {?}
         */
        date => !!date)))
            .subscribe((/**
         * @param {?} v
         * @return {?}
         */
        v => this.datepickerFocusService.focusInput(this.el.nativeElement)));
    }
}
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
    { type: Boolean, decorators: [{ type: Optional }, { type: Inject, args: [IS_NEW_FORMS_LAYOUT,] }] },
    { type: DatepickerFocusService }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1pbnB1dC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImZvcm1zL2RhdGVwaWNrZXIvZGF0ZS1pbnB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFNQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNwRCxPQUFPLEVBRUwsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osV0FBVyxFQUNYLFlBQVksRUFDWixNQUFNLEVBQ04sUUFBUSxFQUNSLEtBQUssRUFHTCxRQUFRLEVBQ1IsTUFBTSxFQUNOLFdBQVcsRUFDWCxTQUFTLEVBQ1QsSUFBSSxFQUNKLGdCQUFnQixHQUNqQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRTFCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNqRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDN0MsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDL0UsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzVELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzVFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHVDQUF1QyxDQUFD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QiwwQkFBd0I7Ozs7O0lBQ3hCLGdDQUE2Qjs7Ozs7SUFDN0IsK0JBRTRCOzs7OztJQUM1QixpQ0FBK0M7Ozs7O0lBQy9DLHFDQUFnRDs7Ozs7SUFDaEQsNkNBQWdFOzs7OztJQUNoRSxnREFBc0U7Ozs7O0lBQ3RFLDhDQUFrRTs7Ozs7SUFDbEUsa0NBQStDOzs7OztJQUMvQyxvQ0FBOEM7O0lBQzlDLHNDQUU4Qjs7Ozs7SUFDOUIsOENBQXNEIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdEJpbmRpbmcsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5qZWN0LFxuICBJbmplY3RvcixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxuICBQTEFURk9STV9JRCxcbiAgUmVuZGVyZXIyLFxuICBTZWxmLFxuICBWaWV3Q29udGFpbmVyUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IGZpbHRlciwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgb2YgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgRm9jdXNTZXJ2aWNlIH0gZnJvbSAnLi4vY29tbW9uL3Byb3ZpZGVycy9mb2N1cy5zZXJ2aWNlJztcbmltcG9ydCB7IFdyYXBwZWRGb3JtQ29udHJvbCB9IGZyb20gJy4uL2NvbW1vbi93cmFwcGVkLWNvbnRyb2wnO1xuaW1wb3J0IHsgQ2xyRGF0ZUNvbnRhaW5lciB9IGZyb20gJy4vZGF0ZS1jb250YWluZXInO1xuaW1wb3J0IHsgRGF5TW9kZWwgfSBmcm9tICcuL21vZGVsL2RheS5tb2RlbCc7XG5pbXBvcnQgeyBEYXRlRm9ybUNvbnRyb2xTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvZGF0ZS1mb3JtLWNvbnRyb2wuc2VydmljZSc7XG5pbXBvcnQgeyBEYXRlSU9TZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvZGF0ZS1pby5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGVOYXZpZ2F0aW9uU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2RhdGUtbmF2aWdhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGVwaWNrZXJFbmFibGVkU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2RhdGVwaWNrZXItZW5hYmxlZC5zZXJ2aWNlJztcbmltcG9ydCB7IElTX05FV19GT1JNU19MQVlPVVQgfSBmcm9tICcuLi9jb21tb24vcHJvdmlkZXJzL25ldy1mb3Jtcy5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGVwaWNrZXJGb2N1c1NlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9kYXRlcGlja2VyLWZvY3VzLnNlcnZpY2UnO1xuaW1wb3J0IHsgZGF0ZXNBcmVFcXVhbCB9IGZyb20gJy4vdXRpbHMvZGF0ZS11dGlscyc7XG5cbi8vIFRoZXJlIGFyZSBmb3VyIHdheXMgdGhlIGRhdGVwaWNrZXIgdmFsdWUgaXMgc2V0XG4vLyAxLiBWYWx1ZSBzZXQgYnkgdXNlciB0eXBpbmcgaW50byB0ZXh0IGlucHV0IGFzIGEgc3RyaW5nIGV4OiAnMDEvMjgvMjAxNSdcbi8vIDIuIFZhbHVlIHNldCBleHBsaWNpdGx5IGJ5IEFuZ3VsYXIgRm9ybXMgQVBJcyBhcyBhIHN0cmluZyBleDogJzAxLzI4LzIwMTUnXG4vLyAzLiBWYWx1ZSBzZXQgYnkgdXNlciB2aWEgZGF0ZXBpY2tlciBVSSBhcyBhIERhdGUgT2JqZWN0XG4vLyA0LiBWYWx1ZSBzZXQgdmlhIGBjbHJEYXRlYCBpbnB1dCBhcyBhIERhdGUgT2JqZWN0XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tjbHJEYXRlXScsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmRhdGUtaW5wdXRdJzogJyFuZXdGb3Jtc0xheW91dCcsXG4gICAgJ1tjbGFzcy5jbHItaW5wdXRdJzogJ25ld0Zvcm1zTGF5b3V0JyxcbiAgfSxcbiAgcHJvdmlkZXJzOiBbRGF0ZXBpY2tlckZvY3VzU2VydmljZV0sXG59KVxuZXhwb3J0IGNsYXNzIENsckRhdGVJbnB1dCBleHRlbmRzIFdyYXBwZWRGb3JtQ29udHJvbDxDbHJEYXRlQ29udGFpbmVyPiBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZztcbiAgQElucHV0KCkgY2xyTmV3TGF5b3V0OiBib29sZWFuO1xuICBAT3V0cHV0KCdjbHJEYXRlQ2hhbmdlJykgZGF0ZUNoYW5nZTogRXZlbnRFbWl0dGVyPERhdGU+ID0gbmV3IEV2ZW50RW1pdHRlcjxEYXRlPihmYWxzZSk7XG4gIEBJbnB1dCgnY2xyRGF0ZScpXG4gIHNldCBkYXRlKGRhdGU6IERhdGUpIHtcbiAgICBpZiAodGhpcy5wcmV2aW91c0RhdGVDaGFuZ2UgIT09IGRhdGUpIHtcbiAgICAgIHRoaXMudXBkYXRlRGF0ZSh0aGlzLmdldFZhbGlkRGF0ZVZhbHVlRnJvbURhdGUoZGF0ZSkpO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5pbml0aWFsQ2xyRGF0ZUlucHV0VmFsdWUpIHtcbiAgICAgIHRoaXMuaW5pdGlhbENsckRhdGVJbnB1dFZhbHVlID0gZGF0ZTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgaW5kZXggPSA0O1xuICBwcml2YXRlIGluaXRpYWxDbHJEYXRlSW5wdXRWYWx1ZTogRGF0ZTtcbiAgcHJpdmF0ZSBwcmV2aW91c0RhdGVDaGFuZ2U6IERhdGU7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgcHJvdGVjdGVkIGVsOiBFbGVtZW50UmVmLFxuICAgIHByb3RlY3RlZCByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIEBTZWxmKClcbiAgICBAT3B0aW9uYWwoKVxuICAgIHByb3RlY3RlZCBjb250cm9sOiBOZ0NvbnRyb2wsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBjb250YWluZXI6IENsckRhdGVDb250YWluZXIsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBkYXRlSU9TZXJ2aWNlOiBEYXRlSU9TZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZGF0ZU5hdmlnYXRpb25TZXJ2aWNlOiBEYXRlTmF2aWdhdGlvblNlcnZpY2UsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBkYXRlcGlja2VyRW5hYmxlZFNlcnZpY2U6IERhdGVwaWNrZXJFbmFibGVkU2VydmljZSxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGRhdGVGb3JtQ29udHJvbFNlcnZpY2U6IERhdGVGb3JtQ29udHJvbFNlcnZpY2UsXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBPYmplY3QsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBmb2N1c1NlcnZpY2U6IEZvY3VzU2VydmljZSxcbiAgICBAT3B0aW9uYWwoKVxuICAgIEBJbmplY3QoSVNfTkVXX0ZPUk1TX0xBWU9VVClcbiAgICBwdWJsaWMgbmV3Rm9ybXNMYXlvdXQ6IGJvb2xlYW4sXG4gICAgcHJpdmF0ZSBkYXRlcGlja2VyRm9jdXNTZXJ2aWNlOiBEYXRlcGlja2VyRm9jdXNTZXJ2aWNlXG4gICkge1xuICAgIHN1cGVyKHZpZXdDb250YWluZXJSZWYsIENsckRhdGVDb250YWluZXIsIGluamVjdG9yLCBjb250cm9sLCByZW5kZXJlciwgZWwpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgc3VwZXIubmdPbkluaXQoKTtcbiAgICB0aGlzLnNldEZvcm1MYXlvdXQoKTtcbiAgICB0aGlzLnBvcHVsYXRlU2VydmljZXNGcm9tQ29udGFpbmVyQ29tcG9uZW50KCk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMubGlzdGVuRm9yVXNlclNlbGVjdGVkRGF5Q2hhbmdlcygpLFxuICAgICAgdGhpcy5saXN0ZW5Gb3JDb250cm9sVmFsdWVDaGFuZ2VzKCksXG4gICAgICB0aGlzLmxpc3RlbkZvclRvdWNoQ2hhbmdlcygpLFxuICAgICAgdGhpcy5saXN0ZW5Gb3JEaXJ0eUNoYW5nZXMoKSxcbiAgICAgIHRoaXMubGlzdGVuRm9ySW5wdXRSZWZvY3VzKClcbiAgICApO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIC8vIEkgZG9uJ3Qga25vdyB3aHkgSSBoYXZlIHRvIGRvIHRoaXMgYnV0IGFmdGVyIHVzaW5nIHRoZSBuZXcgSG9zdFdyYXBwaW5nIE1vZHVsZSBJIGhhdmUgdG8gZGVsYXkgdGhlIHByb2Nlc3NpbmdcbiAgICAvLyBvZiB0aGUgaW5pdGlhbCBJbnB1dCBzZXQgYnkgdGhlIHVzZXIgdG8gaGVyZS4gSWYgSSBkbyBub3QgMiBpc3N1ZXMgb2NjdXI6XG4gICAgLy8gMS4gVGhlIElucHV0IHNldHRlciBpcyBjYWxsZWQgYmVmb3JlIG5nT25Jbml0LiBuZ09uSW5pdCBpbml0aWFsaXplcyB0aGUgc2VydmljZXMgd2l0aG91dCB3aGljaCB0aGUgc2V0dGVyIGZhaWxzLlxuICAgIC8vIDIuIFRoZSBSZW5kZXJlciBkb2Vzbid0IHdvcmsgYmVmb3JlIG5nQWZ0ZXJWaWV3SW5pdCAoSXQgdXNlZCB0byBiZWZvcmUgdGhlIG5ldyBIb3N0V3JhcHBpbmcgTW9kdWxlIGZvciBzb21lIHJlYXNvbikuXG4gICAgLy8gSSBuZWVkIHRoZSByZW5kZXJlciB0byBzZXQgdGhlIHZhbHVlIHByb3BlcnR5IG9uIHRoZSBpbnB1dCB0byBtYWtlIHN1cmUgdGhhdCBpZiB0aGUgdXNlciBoYXMgc3VwcGxpZWQgYSBEYXRlXG4gICAgLy8gaW5wdXQgb2JqZWN0LCB3ZSByZWZsZWN0IGl0IHdpdGggdGhlIHJpZ2h0IGRhdGUgb24gdGhlIGlucHV0IGZpZWxkIHVzaW5nIHRoZSBJTyBzZXJ2aWNlLiBJIGFtIG5vdCBzdXJlIGlmXG4gICAgLy8gdGhlc2UgYXJlIG1ham9yIGlzc3VlcyBvciBub3QgYnV0IGp1c3Qgbm90aW5nIHRoZW0gZG93biBoZXJlLlxuICAgIHRoaXMucHJvY2Vzc0luaXRpYWxJbnB1dHMoKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2ZvY3VzJylcbiAgc2V0Rm9jdXNTdGF0ZXMoKSB7XG4gICAgdGhpcy5zZXRGb2N1cyh0cnVlKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2JsdXInKVxuICB0cmlnZ2VyVmFsaWRhdGlvbigpIHtcbiAgICBzdXBlci50cmlnZ2VyVmFsaWRhdGlvbigpO1xuICAgIHRoaXMuc2V0Rm9jdXMoZmFsc2UpO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLnBsYWNlaG9sZGVyJylcbiAgZ2V0IHBsYWNlaG9sZGVyVGV4dCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnBsYWNlaG9sZGVyID8gdGhpcy5wbGFjZWhvbGRlciA6IHRoaXMuZGF0ZUlPU2VydmljZS5wbGFjZWhvbGRlclRleHQ7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2F0dHIudHlwZScpXG4gIGdldCBpbnB1dFR5cGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSAmJiB0aGlzLnVzaW5nTmF0aXZlRGF0ZXBpY2tlcigpID8gJ2RhdGUnIDogJ3RleHQnO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2hhbmdlJywgWyckZXZlbnQudGFyZ2V0J10pXG4gIG9uVmFsdWVDaGFuZ2UodGFyZ2V0OiBIVE1MSW5wdXRFbGVtZW50KSB7XG4gICAgY29uc3QgdmFsaWREYXRlVmFsdWUgPSB0aGlzLmRhdGVJT1NlcnZpY2UuZ2V0RGF0ZVZhbHVlRnJvbURhdGVTdHJpbmcodGFyZ2V0LnZhbHVlKTtcbiAgICBpZiAodGhpcy51c2luZ0NsYXJpdHlEYXRlcGlja2VyKCkgJiYgdmFsaWREYXRlVmFsdWUpIHtcbiAgICAgIHRoaXMudXBkYXRlRGF0ZSh2YWxpZERhdGVWYWx1ZSwgdHJ1ZSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLnVzaW5nTmF0aXZlRGF0ZXBpY2tlcigpKSB7XG4gICAgICBjb25zdCBbeWVhciwgbW9udGgsIGRheV0gPSB0YXJnZXQudmFsdWUuc3BsaXQoJy0nKTtcbiAgICAgIHRoaXMudXBkYXRlRGF0ZShuZXcgRGF0ZSgreWVhciwgK21vbnRoIC0gMSwgK2RheSksIHRydWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVtaXREYXRlT3V0cHV0KG51bGwpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdXNpbmdDbGFyaXR5RGF0ZXBpY2tlcigpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRlcGlja2VyRW5hYmxlZFNlcnZpY2UuaXNFbmFibGVkO1xuICB9XG5cbiAgcHJpdmF0ZSB1c2luZ05hdGl2ZURhdGVwaWNrZXIoKSB7XG4gICAgcmV0dXJuICF0aGlzLmRhdGVwaWNrZXJFbmFibGVkU2VydmljZS5pc0VuYWJsZWQ7XG4gIH1cblxuICBwcml2YXRlIHNldEZvY3VzKGZvY3VzOiBib29sZWFuKSB7XG4gICAgaWYgKHRoaXMuZm9jdXNTZXJ2aWNlKSB7XG4gICAgICB0aGlzLmZvY3VzU2VydmljZS5mb2N1c2VkID0gZm9jdXM7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBwb3B1bGF0ZVNlcnZpY2VzRnJvbUNvbnRhaW5lckNvbXBvbmVudCgpIHtcbiAgICBpZiAoIXRoaXMuY29udGFpbmVyKSB7XG4gICAgICB0aGlzLmRhdGVJT1NlcnZpY2UgPSB0aGlzLmdldFByb3ZpZGVyRnJvbUNvbnRhaW5lcihEYXRlSU9TZXJ2aWNlKTtcbiAgICAgIHRoaXMuZGF0ZU5hdmlnYXRpb25TZXJ2aWNlID0gdGhpcy5nZXRQcm92aWRlckZyb21Db250YWluZXIoRGF0ZU5hdmlnYXRpb25TZXJ2aWNlKTtcbiAgICAgIHRoaXMuZGF0ZXBpY2tlckVuYWJsZWRTZXJ2aWNlID0gdGhpcy5nZXRQcm92aWRlckZyb21Db250YWluZXIoRGF0ZXBpY2tlckVuYWJsZWRTZXJ2aWNlKTtcbiAgICAgIHRoaXMuZGF0ZUZvcm1Db250cm9sU2VydmljZSA9IHRoaXMuZ2V0UHJvdmlkZXJGcm9tQ29udGFpbmVyKERhdGVGb3JtQ29udHJvbFNlcnZpY2UpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcHJvY2Vzc0luaXRpYWxJbnB1dHMoKSB7XG4gICAgaWYgKHRoaXMuZGF0ZXBpY2tlckhhc0Zvcm1Db250cm9sKCkpIHtcbiAgICAgIHRoaXMudXBkYXRlRGF0ZSh0aGlzLmRhdGVJT1NlcnZpY2UuZ2V0RGF0ZVZhbHVlRnJvbURhdGVTdHJpbmcodGhpcy5jb250cm9sLnZhbHVlKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudXBkYXRlRGF0ZSh0aGlzLmluaXRpYWxDbHJEYXRlSW5wdXRWYWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRGb3JtTGF5b3V0KCkge1xuICAgIGlmICh0aGlzLmNsck5ld0xheW91dCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLm5ld0Zvcm1zTGF5b3V0ID0gISF0aGlzLmNsck5ld0xheW91dDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZURhdGUodmFsdWU6IERhdGUsIHNldEJ5VXNlckludGVyYWN0aW9uID0gZmFsc2UpIHtcbiAgICBjb25zdCBkYXRlID0gdGhpcy5nZXRWYWxpZERhdGVWYWx1ZUZyb21EYXRlKHZhbHVlKTtcblxuICAgIGlmIChzZXRCeVVzZXJJbnRlcmFjdGlvbikge1xuICAgICAgdGhpcy5lbWl0RGF0ZU91dHB1dChkYXRlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wcmV2aW91c0RhdGVDaGFuZ2UgPSBkYXRlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmRhdGVOYXZpZ2F0aW9uU2VydmljZSkge1xuICAgICAgdGhpcy5kYXRlTmF2aWdhdGlvblNlcnZpY2Uuc2VsZWN0ZWREYXkgPSBkYXRlXG4gICAgICAgID8gbmV3IERheU1vZGVsKGRhdGUuZ2V0RnVsbFllYXIoKSwgZGF0ZS5nZXRNb250aCgpLCBkYXRlLmdldERhdGUoKSlcbiAgICAgICAgOiBudWxsO1xuICAgIH1cblxuICAgIHRoaXMudXBkYXRlSW5wdXQoZGF0ZSk7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZUlucHV0KGRhdGU6IERhdGUpIHtcbiAgICBpZiAoZGF0ZSkge1xuICAgICAgY29uc3QgZGF0ZVN0cmluZyA9IHRoaXMuZGF0ZUlPU2VydmljZS50b0xvY2FsZURpc3BsYXlGb3JtYXRTdHJpbmcoZGF0ZSk7XG5cbiAgICAgIGlmICh0aGlzLmRhdGVwaWNrZXJIYXNGb3JtQ29udHJvbCgpICYmIGRhdGVTdHJpbmcgIT09IHRoaXMuY29udHJvbC52YWx1ZSkge1xuICAgICAgICB0aGlzLmNvbnRyb2wuY29udHJvbC5zZXRWYWx1ZShkYXRlU3RyaW5nKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy51c2luZ05hdGl2ZURhdGVwaWNrZXIoKSkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3ZhbHVlQXNEYXRlJywgZGF0ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3ZhbHVlJywgZGF0ZVN0cmluZyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAndmFsdWUnLCAnJyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRWYWxpZERhdGVWYWx1ZUZyb21EYXRlKGRhdGU6IERhdGUpIHtcbiAgICBpZiAodGhpcy5kYXRlSU9TZXJ2aWNlKSB7XG4gICAgICBjb25zdCBkYXRlU3RyaW5nID0gdGhpcy5kYXRlSU9TZXJ2aWNlLnRvTG9jYWxlRGlzcGxheUZvcm1hdFN0cmluZyhkYXRlKTtcbiAgICAgIHJldHVybiB0aGlzLmRhdGVJT1NlcnZpY2UuZ2V0RGF0ZVZhbHVlRnJvbURhdGVTdHJpbmcoZGF0ZVN0cmluZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZW1pdERhdGVPdXRwdXQoZGF0ZTogRGF0ZSkge1xuICAgIGlmICghZGF0ZXNBcmVFcXVhbChkYXRlLCB0aGlzLnByZXZpb3VzRGF0ZUNoYW5nZSkpIHtcbiAgICAgIHRoaXMuZGF0ZUNoYW5nZS5lbWl0KGRhdGUpO1xuICAgICAgdGhpcy5wcmV2aW91c0RhdGVDaGFuZ2UgPSBkYXRlO1xuICAgIH0gZWxzZSBpZiAoIWRhdGUgJiYgdGhpcy5wcmV2aW91c0RhdGVDaGFuZ2UpIHtcbiAgICAgIHRoaXMuZGF0ZUNoYW5nZS5lbWl0KG51bGwpO1xuICAgICAgdGhpcy5wcmV2aW91c0RhdGVDaGFuZ2UgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZGF0ZXBpY2tlckhhc0Zvcm1Db250cm9sKCkge1xuICAgIHJldHVybiAhIXRoaXMuY29udHJvbDtcbiAgfVxuXG4gIHByaXZhdGUgbGlzdGVuRm9yQ29udHJvbFZhbHVlQ2hhbmdlcygpIHtcbiAgICByZXR1cm4gb2YodGhpcy5kYXRlcGlja2VySGFzRm9ybUNvbnRyb2woKSlcbiAgICAgIC5waXBlKFxuICAgICAgICBmaWx0ZXIoaGFzQ29udHJvbCA9PiBoYXNDb250cm9sKSxcbiAgICAgICAgc3dpdGNoTWFwKCgpID0+IHRoaXMuY29udHJvbC52YWx1ZUNoYW5nZXMpLFxuICAgICAgICAvLyBvbmx5IHVwZGF0ZSBkYXRlIHZhbHVlIGlmIG5vdCBiZWluZyBzZXQgYnkgdXNlclxuICAgICAgICBmaWx0ZXIoKCkgPT4gIXRoaXMuZGF0ZXBpY2tlckZvY3VzU2VydmljZS5lbGVtZW50SXNGb2N1c2VkKHRoaXMuZWwubmF0aXZlRWxlbWVudCkpXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKCh2YWx1ZTogc3RyaW5nKSA9PiB0aGlzLnVwZGF0ZURhdGUodGhpcy5kYXRlSU9TZXJ2aWNlLmdldERhdGVWYWx1ZUZyb21EYXRlU3RyaW5nKHZhbHVlKSkpO1xuICB9XG5cbiAgcHJpdmF0ZSBsaXN0ZW5Gb3JVc2VyU2VsZWN0ZWREYXlDaGFuZ2VzKCkge1xuICAgIHJldHVybiB0aGlzLmRhdGVOYXZpZ2F0aW9uU2VydmljZS5zZWxlY3RlZERheUNoYW5nZS5zdWJzY3JpYmUoZGF5TW9kZWwgPT4gdGhpcy51cGRhdGVEYXRlKGRheU1vZGVsLnRvRGF0ZSgpLCB0cnVlKSk7XG4gIH1cblxuICBwcml2YXRlIGxpc3RlbkZvclRvdWNoQ2hhbmdlcygpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRlRm9ybUNvbnRyb2xTZXJ2aWNlLnRvdWNoZWRDaGFuZ2VcbiAgICAgIC5waXBlKGZpbHRlcigoKSA9PiB0aGlzLmRhdGVwaWNrZXJIYXNGb3JtQ29udHJvbCgpKSlcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jb250cm9sLmNvbnRyb2wubWFya0FzVG91Y2hlZCgpKTtcbiAgfVxuXG4gIHByaXZhdGUgbGlzdGVuRm9yRGlydHlDaGFuZ2VzKCkge1xuICAgIHJldHVybiB0aGlzLmRhdGVGb3JtQ29udHJvbFNlcnZpY2UuZGlydHlDaGFuZ2VcbiAgICAgIC5waXBlKGZpbHRlcigoKSA9PiB0aGlzLmRhdGVwaWNrZXJIYXNGb3JtQ29udHJvbCgpKSlcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jb250cm9sLmNvbnRyb2wubWFya0FzRGlydHkoKSk7XG4gIH1cblxuICBwcml2YXRlIGxpc3RlbkZvcklucHV0UmVmb2N1cygpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRlTmF2aWdhdGlvblNlcnZpY2Uuc2VsZWN0ZWREYXlDaGFuZ2VcbiAgICAgIC5waXBlKGZpbHRlcihkYXRlID0+ICEhZGF0ZSkpXG4gICAgICAuc3Vic2NyaWJlKHYgPT4gdGhpcy5kYXRlcGlja2VyRm9jdXNTZXJ2aWNlLmZvY3VzSW5wdXQodGhpcy5lbC5uYXRpdmVFbGVtZW50KSk7XG4gIH1cbn1cbiJdfQ==