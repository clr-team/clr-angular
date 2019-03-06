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
     * @return {?}
     */
    usingClarityDatepicker() {
        return this.datepickerEnabledService.isEnabled;
    }
    /**
     * @return {?}
     */
    usingNativeDatepicker() {
        return !this.datepickerEnabledService.isEnabled;
    }
    /**
     * @param {?} focus
     * @return {?}
     */
    setFocus(focus) {
        if (this.focusService) {
            this.focusService.focused = focus;
        }
    }
    /**
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
     * @return {?}
     */
    setFormLayout() {
        if (this.clrNewLayout !== undefined) {
            this.newFormsLayout = !!this.clrNewLayout;
        }
    }
    /**
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
     * @return {?}
     */
    datepickerHasFormControl() {
        return !!this.control;
    }
    /**
     * @return {?}
     */
    listenForControlValueChanges() {
        return of(this.datepickerHasFormControl())
            .pipe(filter(hasControl => hasControl), switchMap(() => this.control.valueChanges), 
        // only update date value if not being set by user
        filter(() => !this.datepickerFocusService.elementIsFocused(this.el.nativeElement)))
            .subscribe((value) => this.updateDate(this.dateIOService.getDateValueFromDateString(value)));
    }
    /**
     * @return {?}
     */
    listenForUserSelectedDayChanges() {
        return this.dateNavigationService.selectedDayChange.subscribe(dayModel => this.updateDate(dayModel.toDate(), true));
    }
    /**
     * @return {?}
     */
    listenForTouchChanges() {
        return this.dateFormControlService.touchedChange
            .pipe(filter(() => this.datepickerHasFormControl()))
            .subscribe(() => this.control.control.markAsTouched());
    }
    /**
     * @return {?}
     */
    listenForDirtyChanges() {
        return this.dateFormControlService.dirtyChange
            .pipe(filter(() => this.datepickerHasFormControl()))
            .subscribe(() => this.control.control.markAsDirty());
    }
    /**
     * @return {?}
     */
    listenForInputRefocus() {
        return this.dateNavigationService.selectedDayChange
            .pipe(filter(date => !!date))
            .subscribe(v => this.datepickerFocusService.focusInput(this.el.nativeElement));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1pbnB1dC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImZvcm1zL2RhdGVwaWNrZXIvZGF0ZS1pbnB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFNQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNwRCxPQUFPLEVBRUwsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osV0FBVyxFQUNYLFlBQVksRUFDWixNQUFNLEVBQ04sUUFBUSxFQUNSLEtBQUssRUFHTCxRQUFRLEVBQ1IsTUFBTSxFQUNOLFdBQVcsRUFDWCxTQUFTLEVBQ1QsSUFBSSxFQUNKLGdCQUFnQixHQUNqQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRTFCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNqRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDN0MsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDL0UsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzVELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzVFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHVDQUF1QyxDQUFD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L0MscUNBQWdEOztJQUNoRCw2Q0FBZ0U7O0lBQ2hFLGdEQUFzRTs7SUFDdEUsOENBQWtFOztJQUNsRSxrQ0FBK0M7O0lBQy9DLG9DQUE4Qzs7SUFDOUMsc0NBRThCOztJQUM5Qiw4Q0FBc0QiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0QmluZGluZyxcbiAgSG9zdExpc3RlbmVyLFxuICBJbmplY3QsXG4gIEluamVjdG9yLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFBMQVRGT1JNX0lELFxuICBSZW5kZXJlcjIsXG4gIFNlbGYsXG4gIFZpZXdDb250YWluZXJSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgZmlsdGVyLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBvZiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBGb2N1c1NlcnZpY2UgfSBmcm9tICcuLi9jb21tb24vcHJvdmlkZXJzL2ZvY3VzLnNlcnZpY2UnO1xuaW1wb3J0IHsgV3JhcHBlZEZvcm1Db250cm9sIH0gZnJvbSAnLi4vY29tbW9uL3dyYXBwZWQtY29udHJvbCc7XG5pbXBvcnQgeyBDbHJEYXRlQ29udGFpbmVyIH0gZnJvbSAnLi9kYXRlLWNvbnRhaW5lcic7XG5pbXBvcnQgeyBEYXlNb2RlbCB9IGZyb20gJy4vbW9kZWwvZGF5Lm1vZGVsJztcbmltcG9ydCB7IERhdGVGb3JtQ29udHJvbFNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9kYXRlLWZvcm0tY29udHJvbC5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGVJT1NlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9kYXRlLWlvLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0ZU5hdmlnYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvZGF0ZS1uYXZpZ2F0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0ZXBpY2tlckVuYWJsZWRTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvZGF0ZXBpY2tlci1lbmFibGVkLnNlcnZpY2UnO1xuaW1wb3J0IHsgSVNfTkVXX0ZPUk1TX0xBWU9VVCB9IGZyb20gJy4uL2NvbW1vbi9wcm92aWRlcnMvbmV3LWZvcm1zLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0ZXBpY2tlckZvY3VzU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2RhdGVwaWNrZXItZm9jdXMuc2VydmljZSc7XG5pbXBvcnQgeyBkYXRlc0FyZUVxdWFsIH0gZnJvbSAnLi91dGlscy9kYXRlLXV0aWxzJztcblxuLy8gVGhlcmUgYXJlIGZvdXIgd2F5cyB0aGUgZGF0ZXBpY2tlciB2YWx1ZSBpcyBzZXRcbi8vIDEuIFZhbHVlIHNldCBieSB1c2VyIHR5cGluZyBpbnRvIHRleHQgaW5wdXQgYXMgYSBzdHJpbmcgZXg6ICcwMS8yOC8yMDE1J1xuLy8gMi4gVmFsdWUgc2V0IGV4cGxpY2l0bHkgYnkgQW5ndWxhciBGb3JtcyBBUElzIGFzIGEgc3RyaW5nIGV4OiAnMDEvMjgvMjAxNSdcbi8vIDMuIFZhbHVlIHNldCBieSB1c2VyIHZpYSBkYXRlcGlja2VyIFVJIGFzIGEgRGF0ZSBPYmplY3Rcbi8vIDQuIFZhbHVlIHNldCB2aWEgYGNsckRhdGVgIGlucHV0IGFzIGEgRGF0ZSBPYmplY3RcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2NsckRhdGVdJyxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuZGF0ZS1pbnB1dF0nOiAnIW5ld0Zvcm1zTGF5b3V0JyxcbiAgICAnW2NsYXNzLmNsci1pbnB1dF0nOiAnbmV3Rm9ybXNMYXlvdXQnLFxuICB9LFxuICBwcm92aWRlcnM6IFtEYXRlcGlja2VyRm9jdXNTZXJ2aWNlXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyRGF0ZUlucHV0IGV4dGVuZHMgV3JhcHBlZEZvcm1Db250cm9sPENsckRhdGVDb250YWluZXI+IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nO1xuICBASW5wdXQoKSBjbHJOZXdMYXlvdXQ6IGJvb2xlYW47XG4gIEBPdXRwdXQoJ2NsckRhdGVDaGFuZ2UnKSBkYXRlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8RGF0ZT4gPSBuZXcgRXZlbnRFbWl0dGVyPERhdGU+KGZhbHNlKTtcbiAgQElucHV0KCdjbHJEYXRlJylcbiAgc2V0IGRhdGUoZGF0ZTogRGF0ZSkge1xuICAgIGlmICh0aGlzLnByZXZpb3VzRGF0ZUNoYW5nZSAhPT0gZGF0ZSkge1xuICAgICAgdGhpcy51cGRhdGVEYXRlKHRoaXMuZ2V0VmFsaWREYXRlVmFsdWVGcm9tRGF0ZShkYXRlKSk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmluaXRpYWxDbHJEYXRlSW5wdXRWYWx1ZSkge1xuICAgICAgdGhpcy5pbml0aWFsQ2xyRGF0ZUlucHV0VmFsdWUgPSBkYXRlO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBpbmRleCA9IDQ7XG4gIHByaXZhdGUgaW5pdGlhbENsckRhdGVJbnB1dFZhbHVlOiBEYXRlO1xuICBwcml2YXRlIHByZXZpb3VzRGF0ZUNoYW5nZTogRGF0ZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIGluamVjdG9yOiBJbmplY3RvcixcbiAgICBwcm90ZWN0ZWQgZWw6IEVsZW1lbnRSZWYsXG4gICAgcHJvdGVjdGVkIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgQFNlbGYoKVxuICAgIEBPcHRpb25hbCgpXG4gICAgcHJvdGVjdGVkIGNvbnRyb2w6IE5nQ29udHJvbCxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGNvbnRhaW5lcjogQ2xyRGF0ZUNvbnRhaW5lcixcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGRhdGVJT1NlcnZpY2U6IERhdGVJT1NlcnZpY2UsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBkYXRlTmF2aWdhdGlvblNlcnZpY2U6IERhdGVOYXZpZ2F0aW9uU2VydmljZSxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGRhdGVwaWNrZXJFbmFibGVkU2VydmljZTogRGF0ZXBpY2tlckVuYWJsZWRTZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZGF0ZUZvcm1Db250cm9sU2VydmljZTogRGF0ZUZvcm1Db250cm9sU2VydmljZSxcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IE9iamVjdCxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGZvY3VzU2VydmljZTogRm9jdXNTZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpXG4gICAgQEluamVjdChJU19ORVdfRk9STVNfTEFZT1VUKVxuICAgIHB1YmxpYyBuZXdGb3Jtc0xheW91dDogYm9vbGVhbixcbiAgICBwcml2YXRlIGRhdGVwaWNrZXJGb2N1c1NlcnZpY2U6IERhdGVwaWNrZXJGb2N1c1NlcnZpY2VcbiAgKSB7XG4gICAgc3VwZXIodmlld0NvbnRhaW5lclJlZiwgQ2xyRGF0ZUNvbnRhaW5lciwgaW5qZWN0b3IsIGNvbnRyb2wsIHJlbmRlcmVyLCBlbCk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBzdXBlci5uZ09uSW5pdCgpO1xuICAgIHRoaXMuc2V0Rm9ybUxheW91dCgpO1xuICAgIHRoaXMucG9wdWxhdGVTZXJ2aWNlc0Zyb21Db250YWluZXJDb21wb25lbnQoKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5saXN0ZW5Gb3JVc2VyU2VsZWN0ZWREYXlDaGFuZ2VzKCksXG4gICAgICB0aGlzLmxpc3RlbkZvckNvbnRyb2xWYWx1ZUNoYW5nZXMoKSxcbiAgICAgIHRoaXMubGlzdGVuRm9yVG91Y2hDaGFuZ2VzKCksXG4gICAgICB0aGlzLmxpc3RlbkZvckRpcnR5Q2hhbmdlcygpLFxuICAgICAgdGhpcy5saXN0ZW5Gb3JJbnB1dFJlZm9jdXMoKVxuICAgICk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgLy8gSSBkb24ndCBrbm93IHdoeSBJIGhhdmUgdG8gZG8gdGhpcyBidXQgYWZ0ZXIgdXNpbmcgdGhlIG5ldyBIb3N0V3JhcHBpbmcgTW9kdWxlIEkgaGF2ZSB0byBkZWxheSB0aGUgcHJvY2Vzc2luZ1xuICAgIC8vIG9mIHRoZSBpbml0aWFsIElucHV0IHNldCBieSB0aGUgdXNlciB0byBoZXJlLiBJZiBJIGRvIG5vdCAyIGlzc3VlcyBvY2N1cjpcbiAgICAvLyAxLiBUaGUgSW5wdXQgc2V0dGVyIGlzIGNhbGxlZCBiZWZvcmUgbmdPbkluaXQuIG5nT25Jbml0IGluaXRpYWxpemVzIHRoZSBzZXJ2aWNlcyB3aXRob3V0IHdoaWNoIHRoZSBzZXR0ZXIgZmFpbHMuXG4gICAgLy8gMi4gVGhlIFJlbmRlcmVyIGRvZXNuJ3Qgd29yayBiZWZvcmUgbmdBZnRlclZpZXdJbml0IChJdCB1c2VkIHRvIGJlZm9yZSB0aGUgbmV3IEhvc3RXcmFwcGluZyBNb2R1bGUgZm9yIHNvbWUgcmVhc29uKS5cbiAgICAvLyBJIG5lZWQgdGhlIHJlbmRlcmVyIHRvIHNldCB0aGUgdmFsdWUgcHJvcGVydHkgb24gdGhlIGlucHV0IHRvIG1ha2Ugc3VyZSB0aGF0IGlmIHRoZSB1c2VyIGhhcyBzdXBwbGllZCBhIERhdGVcbiAgICAvLyBpbnB1dCBvYmplY3QsIHdlIHJlZmxlY3QgaXQgd2l0aCB0aGUgcmlnaHQgZGF0ZSBvbiB0aGUgaW5wdXQgZmllbGQgdXNpbmcgdGhlIElPIHNlcnZpY2UuIEkgYW0gbm90IHN1cmUgaWZcbiAgICAvLyB0aGVzZSBhcmUgbWFqb3IgaXNzdWVzIG9yIG5vdCBidXQganVzdCBub3RpbmcgdGhlbSBkb3duIGhlcmUuXG4gICAgdGhpcy5wcm9jZXNzSW5pdGlhbElucHV0cygpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZm9jdXMnKVxuICBzZXRGb2N1c1N0YXRlcygpIHtcbiAgICB0aGlzLnNldEZvY3VzKHRydWUpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignYmx1cicpXG4gIHRyaWdnZXJWYWxpZGF0aW9uKCkge1xuICAgIHN1cGVyLnRyaWdnZXJWYWxpZGF0aW9uKCk7XG4gICAgdGhpcy5zZXRGb2N1cyhmYWxzZSk7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2F0dHIucGxhY2Vob2xkZXInKVxuICBnZXQgcGxhY2Vob2xkZXJUZXh0KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMucGxhY2Vob2xkZXIgPyB0aGlzLnBsYWNlaG9sZGVyIDogdGhpcy5kYXRlSU9TZXJ2aWNlLnBsYWNlaG9sZGVyVGV4dDtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnYXR0ci50eXBlJylcbiAgZ2V0IGlucHV0VHlwZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiBpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpICYmIHRoaXMudXNpbmdOYXRpdmVEYXRlcGlja2VyKCkgPyAnZGF0ZScgOiAndGV4dCc7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdjaGFuZ2UnLCBbJyRldmVudC50YXJnZXQnXSlcbiAgb25WYWx1ZUNoYW5nZSh0YXJnZXQ6IEhUTUxJbnB1dEVsZW1lbnQpIHtcbiAgICBjb25zdCB2YWxpZERhdGVWYWx1ZSA9IHRoaXMuZGF0ZUlPU2VydmljZS5nZXREYXRlVmFsdWVGcm9tRGF0ZVN0cmluZyh0YXJnZXQudmFsdWUpO1xuICAgIGlmICh0aGlzLnVzaW5nQ2xhcml0eURhdGVwaWNrZXIoKSAmJiB2YWxpZERhdGVWYWx1ZSkge1xuICAgICAgdGhpcy51cGRhdGVEYXRlKHZhbGlkRGF0ZVZhbHVlLCB0cnVlKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMudXNpbmdOYXRpdmVEYXRlcGlja2VyKCkpIHtcbiAgICAgIGNvbnN0IFt5ZWFyLCBtb250aCwgZGF5XSA9IHRhcmdldC52YWx1ZS5zcGxpdCgnLScpO1xuICAgICAgdGhpcy51cGRhdGVEYXRlKG5ldyBEYXRlKCt5ZWFyLCArbW9udGggLSAxLCArZGF5KSwgdHJ1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZW1pdERhdGVPdXRwdXQobnVsbCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB1c2luZ0NsYXJpdHlEYXRlcGlja2VyKCkge1xuICAgIHJldHVybiB0aGlzLmRhdGVwaWNrZXJFbmFibGVkU2VydmljZS5pc0VuYWJsZWQ7XG4gIH1cblxuICBwcml2YXRlIHVzaW5nTmF0aXZlRGF0ZXBpY2tlcigpIHtcbiAgICByZXR1cm4gIXRoaXMuZGF0ZXBpY2tlckVuYWJsZWRTZXJ2aWNlLmlzRW5hYmxlZDtcbiAgfVxuXG4gIHByaXZhdGUgc2V0Rm9jdXMoZm9jdXM6IGJvb2xlYW4pIHtcbiAgICBpZiAodGhpcy5mb2N1c1NlcnZpY2UpIHtcbiAgICAgIHRoaXMuZm9jdXNTZXJ2aWNlLmZvY3VzZWQgPSBmb2N1cztcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHBvcHVsYXRlU2VydmljZXNGcm9tQ29udGFpbmVyQ29tcG9uZW50KCkge1xuICAgIGlmICghdGhpcy5jb250YWluZXIpIHtcbiAgICAgIHRoaXMuZGF0ZUlPU2VydmljZSA9IHRoaXMuZ2V0UHJvdmlkZXJGcm9tQ29udGFpbmVyKERhdGVJT1NlcnZpY2UpO1xuICAgICAgdGhpcy5kYXRlTmF2aWdhdGlvblNlcnZpY2UgPSB0aGlzLmdldFByb3ZpZGVyRnJvbUNvbnRhaW5lcihEYXRlTmF2aWdhdGlvblNlcnZpY2UpO1xuICAgICAgdGhpcy5kYXRlcGlja2VyRW5hYmxlZFNlcnZpY2UgPSB0aGlzLmdldFByb3ZpZGVyRnJvbUNvbnRhaW5lcihEYXRlcGlja2VyRW5hYmxlZFNlcnZpY2UpO1xuICAgICAgdGhpcy5kYXRlRm9ybUNvbnRyb2xTZXJ2aWNlID0gdGhpcy5nZXRQcm92aWRlckZyb21Db250YWluZXIoRGF0ZUZvcm1Db250cm9sU2VydmljZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBwcm9jZXNzSW5pdGlhbElucHV0cygpIHtcbiAgICBpZiAodGhpcy5kYXRlcGlja2VySGFzRm9ybUNvbnRyb2woKSkge1xuICAgICAgdGhpcy51cGRhdGVEYXRlKHRoaXMuZGF0ZUlPU2VydmljZS5nZXREYXRlVmFsdWVGcm9tRGF0ZVN0cmluZyh0aGlzLmNvbnRyb2wudmFsdWUpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy51cGRhdGVEYXRlKHRoaXMuaW5pdGlhbENsckRhdGVJbnB1dFZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldEZvcm1MYXlvdXQoKSB7XG4gICAgaWYgKHRoaXMuY2xyTmV3TGF5b3V0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMubmV3Rm9ybXNMYXlvdXQgPSAhIXRoaXMuY2xyTmV3TGF5b3V0O1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlRGF0ZSh2YWx1ZTogRGF0ZSwgc2V0QnlVc2VySW50ZXJhY3Rpb24gPSBmYWxzZSkge1xuICAgIGNvbnN0IGRhdGUgPSB0aGlzLmdldFZhbGlkRGF0ZVZhbHVlRnJvbURhdGUodmFsdWUpO1xuXG4gICAgaWYgKHNldEJ5VXNlckludGVyYWN0aW9uKSB7XG4gICAgICB0aGlzLmVtaXREYXRlT3V0cHV0KGRhdGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnByZXZpb3VzRGF0ZUNoYW5nZSA9IGRhdGU7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZGF0ZU5hdmlnYXRpb25TZXJ2aWNlKSB7XG4gICAgICB0aGlzLmRhdGVOYXZpZ2F0aW9uU2VydmljZS5zZWxlY3RlZERheSA9IGRhdGVcbiAgICAgICAgPyBuZXcgRGF5TW9kZWwoZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXRlLmdldE1vbnRoKCksIGRhdGUuZ2V0RGF0ZSgpKVxuICAgICAgICA6IG51bGw7XG4gICAgfVxuXG4gICAgdGhpcy51cGRhdGVJbnB1dChkYXRlKTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlSW5wdXQoZGF0ZTogRGF0ZSkge1xuICAgIGlmIChkYXRlKSB7XG4gICAgICBjb25zdCBkYXRlU3RyaW5nID0gdGhpcy5kYXRlSU9TZXJ2aWNlLnRvTG9jYWxlRGlzcGxheUZvcm1hdFN0cmluZyhkYXRlKTtcblxuICAgICAgaWYgKHRoaXMuZGF0ZXBpY2tlckhhc0Zvcm1Db250cm9sKCkgJiYgZGF0ZVN0cmluZyAhPT0gdGhpcy5jb250cm9sLnZhbHVlKSB7XG4gICAgICAgIHRoaXMuY29udHJvbC5jb250cm9sLnNldFZhbHVlKGRhdGVTdHJpbmcpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnVzaW5nTmF0aXZlRGF0ZXBpY2tlcigpKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAndmFsdWVBc0RhdGUnLCBkYXRlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAndmFsdWUnLCBkYXRlU3RyaW5nKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICd2YWx1ZScsICcnKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldFZhbGlkRGF0ZVZhbHVlRnJvbURhdGUoZGF0ZTogRGF0ZSkge1xuICAgIGlmICh0aGlzLmRhdGVJT1NlcnZpY2UpIHtcbiAgICAgIGNvbnN0IGRhdGVTdHJpbmcgPSB0aGlzLmRhdGVJT1NlcnZpY2UudG9Mb2NhbGVEaXNwbGF5Rm9ybWF0U3RyaW5nKGRhdGUpO1xuICAgICAgcmV0dXJuIHRoaXMuZGF0ZUlPU2VydmljZS5nZXREYXRlVmFsdWVGcm9tRGF0ZVN0cmluZyhkYXRlU3RyaW5nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBlbWl0RGF0ZU91dHB1dChkYXRlOiBEYXRlKSB7XG4gICAgaWYgKCFkYXRlc0FyZUVxdWFsKGRhdGUsIHRoaXMucHJldmlvdXNEYXRlQ2hhbmdlKSkge1xuICAgICAgdGhpcy5kYXRlQ2hhbmdlLmVtaXQoZGF0ZSk7XG4gICAgICB0aGlzLnByZXZpb3VzRGF0ZUNoYW5nZSA9IGRhdGU7XG4gICAgfSBlbHNlIGlmICghZGF0ZSAmJiB0aGlzLnByZXZpb3VzRGF0ZUNoYW5nZSkge1xuICAgICAgdGhpcy5kYXRlQ2hhbmdlLmVtaXQobnVsbCk7XG4gICAgICB0aGlzLnByZXZpb3VzRGF0ZUNoYW5nZSA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBkYXRlcGlja2VySGFzRm9ybUNvbnRyb2woKSB7XG4gICAgcmV0dXJuICEhdGhpcy5jb250cm9sO1xuICB9XG5cbiAgcHJpdmF0ZSBsaXN0ZW5Gb3JDb250cm9sVmFsdWVDaGFuZ2VzKCkge1xuICAgIHJldHVybiBvZih0aGlzLmRhdGVwaWNrZXJIYXNGb3JtQ29udHJvbCgpKVxuICAgICAgLnBpcGUoXG4gICAgICAgIGZpbHRlcihoYXNDb250cm9sID0+IGhhc0NvbnRyb2wpLFxuICAgICAgICBzd2l0Y2hNYXAoKCkgPT4gdGhpcy5jb250cm9sLnZhbHVlQ2hhbmdlcyksXG4gICAgICAgIC8vIG9ubHkgdXBkYXRlIGRhdGUgdmFsdWUgaWYgbm90IGJlaW5nIHNldCBieSB1c2VyXG4gICAgICAgIGZpbHRlcigoKSA9PiAhdGhpcy5kYXRlcGlja2VyRm9jdXNTZXJ2aWNlLmVsZW1lbnRJc0ZvY3VzZWQodGhpcy5lbC5uYXRpdmVFbGVtZW50KSlcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKHZhbHVlOiBzdHJpbmcpID0+IHRoaXMudXBkYXRlRGF0ZSh0aGlzLmRhdGVJT1NlcnZpY2UuZ2V0RGF0ZVZhbHVlRnJvbURhdGVTdHJpbmcodmFsdWUpKSk7XG4gIH1cblxuICBwcml2YXRlIGxpc3RlbkZvclVzZXJTZWxlY3RlZERheUNoYW5nZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0ZU5hdmlnYXRpb25TZXJ2aWNlLnNlbGVjdGVkRGF5Q2hhbmdlLnN1YnNjcmliZShkYXlNb2RlbCA9PiB0aGlzLnVwZGF0ZURhdGUoZGF5TW9kZWwudG9EYXRlKCksIHRydWUpKTtcbiAgfVxuXG4gIHByaXZhdGUgbGlzdGVuRm9yVG91Y2hDaGFuZ2VzKCkge1xuICAgIHJldHVybiB0aGlzLmRhdGVGb3JtQ29udHJvbFNlcnZpY2UudG91Y2hlZENoYW5nZVxuICAgICAgLnBpcGUoZmlsdGVyKCgpID0+IHRoaXMuZGF0ZXBpY2tlckhhc0Zvcm1Db250cm9sKCkpKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmNvbnRyb2wuY29udHJvbC5tYXJrQXNUb3VjaGVkKCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBsaXN0ZW5Gb3JEaXJ0eUNoYW5nZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0ZUZvcm1Db250cm9sU2VydmljZS5kaXJ0eUNoYW5nZVxuICAgICAgLnBpcGUoZmlsdGVyKCgpID0+IHRoaXMuZGF0ZXBpY2tlckhhc0Zvcm1Db250cm9sKCkpKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmNvbnRyb2wuY29udHJvbC5tYXJrQXNEaXJ0eSgpKTtcbiAgfVxuXG4gIHByaXZhdGUgbGlzdGVuRm9ySW5wdXRSZWZvY3VzKCkge1xuICAgIHJldHVybiB0aGlzLmRhdGVOYXZpZ2F0aW9uU2VydmljZS5zZWxlY3RlZERheUNoYW5nZVxuICAgICAgLnBpcGUoZmlsdGVyKGRhdGUgPT4gISFkYXRlKSlcbiAgICAgIC5zdWJzY3JpYmUodiA9PiB0aGlzLmRhdGVwaWNrZXJGb2N1c1NlcnZpY2UuZm9jdXNJbnB1dCh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpKTtcbiAgfVxufVxuIl19