/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
     * @param {?} datepickerFocusService
     */
    constructor(viewContainerRef, injector, el, renderer, control, container, dateIOService, dateNavigationService, datepickerEnabledService, dateFormControlService, platformId, focusService, datepickerFocusService) {
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
        this.datepickerFocusService = datepickerFocusService;
        this.dateChange = new EventEmitter(false);
        this.index = 1;
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
                    '[class.clr-input]': 'true',
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
    { type: DatepickerFocusService }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1pbnB1dC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImZvcm1zL2RhdGVwaWNrZXIvZGF0ZS1pbnB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFNQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNwRCxPQUFPLEVBRUwsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osV0FBVyxFQUNYLFlBQVksRUFDWixNQUFNLEVBQ04sUUFBUSxFQUNSLEtBQUssRUFHTCxRQUFRLEVBQ1IsTUFBTSxFQUNOLFdBQVcsRUFDWCxTQUFTLEVBQ1QsSUFBSSxFQUNKLGdCQUFnQixHQUNqQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRTFCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNqRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDN0MsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDL0UsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzVELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzVFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFD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Q0FBQzthQUNwQzs7OztZQTdCQyxnQkFBZ0I7WUFUaEIsUUFBUTtZQUxSLFVBQVU7WUFZVixTQUFTO1lBSUYsU0FBUyx1QkFtRGIsSUFBSSxZQUNKLFFBQVE7WUE5Q0osZ0JBQWdCLHVCQWdEcEIsUUFBUTtZQTdDSixhQUFhLHVCQThDakIsUUFBUTtZQTdDSixxQkFBcUIsdUJBOEN6QixRQUFRO1lBN0NKLHdCQUF3Qix1QkE4QzVCLFFBQVE7WUFqREosc0JBQXNCLHVCQWtEMUIsUUFBUTtZQUNnQyxNQUFNLHVCQUE5QyxNQUFNLFNBQUMsV0FBVztZQXZEZCxZQUFZLHVCQXdEaEIsUUFBUTtZQWhESixzQkFBc0I7OzswQkFpQjVCLEtBQUs7eUJBQ0wsTUFBTSxTQUFDLGVBQWU7bUJBQ3RCLEtBQUssU0FBQyxTQUFTOzZCQTJEZixZQUFZLFNBQUMsT0FBTztnQ0FLcEIsWUFBWSxTQUFDLE1BQU07OEJBTW5CLFdBQVcsU0FBQyxrQkFBa0I7d0JBSzlCLFdBQVcsU0FBQyxXQUFXOzRCQUt2QixZQUFZLFNBQUMsUUFBUSxFQUFFLENBQUMsZUFBZSxDQUFDOzs7O0lBbEZ6QyxtQ0FBNkI7O0lBQzdCLGtDQUF3Rjs7Ozs7SUFZeEYsNkJBQW9COzs7OztJQUNwQixnREFBdUM7Ozs7O0lBQ3ZDLDBDQUFpQzs7Ozs7SUFLL0IsMEJBQXdCOzs7OztJQUN4QixnQ0FBNkI7Ozs7O0lBQzdCLCtCQUU0Qjs7Ozs7SUFDNUIsaUNBQStDOzs7OztJQUMvQyxxQ0FBZ0Q7Ozs7O0lBQ2hELDZDQUFnRTs7Ozs7SUFDaEUsZ0RBQXNFOzs7OztJQUN0RSw4Q0FBa0U7Ozs7O0lBQ2xFLGtDQUErQzs7Ozs7SUFDL0Msb0NBQThDOzs7OztJQUM5Qyw4Q0FBc0QiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0QmluZGluZyxcbiAgSG9zdExpc3RlbmVyLFxuICBJbmplY3QsXG4gIEluamVjdG9yLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFBMQVRGT1JNX0lELFxuICBSZW5kZXJlcjIsXG4gIFNlbGYsXG4gIFZpZXdDb250YWluZXJSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgZmlsdGVyLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBvZiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBGb2N1c1NlcnZpY2UgfSBmcm9tICcuLi9jb21tb24vcHJvdmlkZXJzL2ZvY3VzLnNlcnZpY2UnO1xuaW1wb3J0IHsgV3JhcHBlZEZvcm1Db250cm9sIH0gZnJvbSAnLi4vY29tbW9uL3dyYXBwZWQtY29udHJvbCc7XG5pbXBvcnQgeyBDbHJEYXRlQ29udGFpbmVyIH0gZnJvbSAnLi9kYXRlLWNvbnRhaW5lcic7XG5pbXBvcnQgeyBEYXlNb2RlbCB9IGZyb20gJy4vbW9kZWwvZGF5Lm1vZGVsJztcbmltcG9ydCB7IERhdGVGb3JtQ29udHJvbFNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9kYXRlLWZvcm0tY29udHJvbC5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGVJT1NlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9kYXRlLWlvLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0ZU5hdmlnYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvZGF0ZS1uYXZpZ2F0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0ZXBpY2tlckVuYWJsZWRTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvZGF0ZXBpY2tlci1lbmFibGVkLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0ZXBpY2tlckZvY3VzU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2RhdGVwaWNrZXItZm9jdXMuc2VydmljZSc7XG5pbXBvcnQgeyBkYXRlc0FyZUVxdWFsIH0gZnJvbSAnLi91dGlscy9kYXRlLXV0aWxzJztcblxuLy8gVGhlcmUgYXJlIGZvdXIgd2F5cyB0aGUgZGF0ZXBpY2tlciB2YWx1ZSBpcyBzZXRcbi8vIDEuIFZhbHVlIHNldCBieSB1c2VyIHR5cGluZyBpbnRvIHRleHQgaW5wdXQgYXMgYSBzdHJpbmcgZXg6ICcwMS8yOC8yMDE1J1xuLy8gMi4gVmFsdWUgc2V0IGV4cGxpY2l0bHkgYnkgQW5ndWxhciBGb3JtcyBBUElzIGFzIGEgc3RyaW5nIGV4OiAnMDEvMjgvMjAxNSdcbi8vIDMuIFZhbHVlIHNldCBieSB1c2VyIHZpYSBkYXRlcGlja2VyIFVJIGFzIGEgRGF0ZSBPYmplY3Rcbi8vIDQuIFZhbHVlIHNldCB2aWEgYGNsckRhdGVgIGlucHV0IGFzIGEgRGF0ZSBPYmplY3RcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2NsckRhdGVdJyxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuY2xyLWlucHV0XSc6ICd0cnVlJyxcbiAgfSxcbiAgcHJvdmlkZXJzOiBbRGF0ZXBpY2tlckZvY3VzU2VydmljZV0sXG59KVxuZXhwb3J0IGNsYXNzIENsckRhdGVJbnB1dCBleHRlbmRzIFdyYXBwZWRGb3JtQ29udHJvbDxDbHJEYXRlQ29udGFpbmVyPiBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZztcbiAgQE91dHB1dCgnY2xyRGF0ZUNoYW5nZScpIGRhdGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxEYXRlPiA9IG5ldyBFdmVudEVtaXR0ZXI8RGF0ZT4oZmFsc2UpO1xuICBASW5wdXQoJ2NsckRhdGUnKVxuICBzZXQgZGF0ZShkYXRlOiBEYXRlKSB7XG4gICAgaWYgKHRoaXMucHJldmlvdXNEYXRlQ2hhbmdlICE9PSBkYXRlKSB7XG4gICAgICB0aGlzLnVwZGF0ZURhdGUodGhpcy5nZXRWYWxpZERhdGVWYWx1ZUZyb21EYXRlKGRhdGUpKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuaW5pdGlhbENsckRhdGVJbnB1dFZhbHVlKSB7XG4gICAgICB0aGlzLmluaXRpYWxDbHJEYXRlSW5wdXRWYWx1ZSA9IGRhdGU7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGluZGV4ID0gMTtcbiAgcHJpdmF0ZSBpbml0aWFsQ2xyRGF0ZUlucHV0VmFsdWU6IERhdGU7XG4gIHByaXZhdGUgcHJldmlvdXNEYXRlQ2hhbmdlOiBEYXRlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgIHByb3RlY3RlZCBlbDogRWxlbWVudFJlZixcbiAgICBwcm90ZWN0ZWQgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBAU2VsZigpXG4gICAgQE9wdGlvbmFsKClcbiAgICBwcm90ZWN0ZWQgY29udHJvbDogTmdDb250cm9sLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgY29udGFpbmVyOiBDbHJEYXRlQ29udGFpbmVyLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZGF0ZUlPU2VydmljZTogRGF0ZUlPU2VydmljZSxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGRhdGVOYXZpZ2F0aW9uU2VydmljZTogRGF0ZU5hdmlnYXRpb25TZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZGF0ZXBpY2tlckVuYWJsZWRTZXJ2aWNlOiBEYXRlcGlja2VyRW5hYmxlZFNlcnZpY2UsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBkYXRlRm9ybUNvbnRyb2xTZXJ2aWNlOiBEYXRlRm9ybUNvbnRyb2xTZXJ2aWNlLFxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogT2JqZWN0LFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZm9jdXNTZXJ2aWNlOiBGb2N1c1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBkYXRlcGlja2VyRm9jdXNTZXJ2aWNlOiBEYXRlcGlja2VyRm9jdXNTZXJ2aWNlXG4gICkge1xuICAgIHN1cGVyKHZpZXdDb250YWluZXJSZWYsIENsckRhdGVDb250YWluZXIsIGluamVjdG9yLCBjb250cm9sLCByZW5kZXJlciwgZWwpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgc3VwZXIubmdPbkluaXQoKTtcbiAgICB0aGlzLnBvcHVsYXRlU2VydmljZXNGcm9tQ29udGFpbmVyQ29tcG9uZW50KCk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMubGlzdGVuRm9yVXNlclNlbGVjdGVkRGF5Q2hhbmdlcygpLFxuICAgICAgdGhpcy5saXN0ZW5Gb3JDb250cm9sVmFsdWVDaGFuZ2VzKCksXG4gICAgICB0aGlzLmxpc3RlbkZvclRvdWNoQ2hhbmdlcygpLFxuICAgICAgdGhpcy5saXN0ZW5Gb3JEaXJ0eUNoYW5nZXMoKSxcbiAgICAgIHRoaXMubGlzdGVuRm9ySW5wdXRSZWZvY3VzKClcbiAgICApO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIC8vIEkgZG9uJ3Qga25vdyB3aHkgSSBoYXZlIHRvIGRvIHRoaXMgYnV0IGFmdGVyIHVzaW5nIHRoZSBuZXcgSG9zdFdyYXBwaW5nIE1vZHVsZSBJIGhhdmUgdG8gZGVsYXkgdGhlIHByb2Nlc3NpbmdcbiAgICAvLyBvZiB0aGUgaW5pdGlhbCBJbnB1dCBzZXQgYnkgdGhlIHVzZXIgdG8gaGVyZS4gSWYgSSBkbyBub3QgMiBpc3N1ZXMgb2NjdXI6XG4gICAgLy8gMS4gVGhlIElucHV0IHNldHRlciBpcyBjYWxsZWQgYmVmb3JlIG5nT25Jbml0LiBuZ09uSW5pdCBpbml0aWFsaXplcyB0aGUgc2VydmljZXMgd2l0aG91dCB3aGljaCB0aGUgc2V0dGVyIGZhaWxzLlxuICAgIC8vIDIuIFRoZSBSZW5kZXJlciBkb2Vzbid0IHdvcmsgYmVmb3JlIG5nQWZ0ZXJWaWV3SW5pdCAoSXQgdXNlZCB0byBiZWZvcmUgdGhlIG5ldyBIb3N0V3JhcHBpbmcgTW9kdWxlIGZvciBzb21lIHJlYXNvbikuXG4gICAgLy8gSSBuZWVkIHRoZSByZW5kZXJlciB0byBzZXQgdGhlIHZhbHVlIHByb3BlcnR5IG9uIHRoZSBpbnB1dCB0byBtYWtlIHN1cmUgdGhhdCBpZiB0aGUgdXNlciBoYXMgc3VwcGxpZWQgYSBEYXRlXG4gICAgLy8gaW5wdXQgb2JqZWN0LCB3ZSByZWZsZWN0IGl0IHdpdGggdGhlIHJpZ2h0IGRhdGUgb24gdGhlIGlucHV0IGZpZWxkIHVzaW5nIHRoZSBJTyBzZXJ2aWNlLiBJIGFtIG5vdCBzdXJlIGlmXG4gICAgLy8gdGhlc2UgYXJlIG1ham9yIGlzc3VlcyBvciBub3QgYnV0IGp1c3Qgbm90aW5nIHRoZW0gZG93biBoZXJlLlxuICAgIHRoaXMucHJvY2Vzc0luaXRpYWxJbnB1dHMoKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2ZvY3VzJylcbiAgc2V0Rm9jdXNTdGF0ZXMoKSB7XG4gICAgdGhpcy5zZXRGb2N1cyh0cnVlKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2JsdXInKVxuICB0cmlnZ2VyVmFsaWRhdGlvbigpIHtcbiAgICBzdXBlci50cmlnZ2VyVmFsaWRhdGlvbigpO1xuICAgIHRoaXMuc2V0Rm9jdXMoZmFsc2UpO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLnBsYWNlaG9sZGVyJylcbiAgZ2V0IHBsYWNlaG9sZGVyVGV4dCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnBsYWNlaG9sZGVyID8gdGhpcy5wbGFjZWhvbGRlciA6IHRoaXMuZGF0ZUlPU2VydmljZS5wbGFjZWhvbGRlclRleHQ7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2F0dHIudHlwZScpXG4gIGdldCBpbnB1dFR5cGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSAmJiB0aGlzLnVzaW5nTmF0aXZlRGF0ZXBpY2tlcigpID8gJ2RhdGUnIDogJ3RleHQnO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2hhbmdlJywgWyckZXZlbnQudGFyZ2V0J10pXG4gIG9uVmFsdWVDaGFuZ2UodGFyZ2V0OiBIVE1MSW5wdXRFbGVtZW50KSB7XG4gICAgY29uc3QgdmFsaWREYXRlVmFsdWUgPSB0aGlzLmRhdGVJT1NlcnZpY2UuZ2V0RGF0ZVZhbHVlRnJvbURhdGVTdHJpbmcodGFyZ2V0LnZhbHVlKTtcbiAgICBpZiAodGhpcy51c2luZ0NsYXJpdHlEYXRlcGlja2VyKCkgJiYgdmFsaWREYXRlVmFsdWUpIHtcbiAgICAgIHRoaXMudXBkYXRlRGF0ZSh2YWxpZERhdGVWYWx1ZSwgdHJ1ZSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLnVzaW5nTmF0aXZlRGF0ZXBpY2tlcigpKSB7XG4gICAgICBjb25zdCBbeWVhciwgbW9udGgsIGRheV0gPSB0YXJnZXQudmFsdWUuc3BsaXQoJy0nKTtcbiAgICAgIHRoaXMudXBkYXRlRGF0ZShuZXcgRGF0ZSgreWVhciwgK21vbnRoIC0gMSwgK2RheSksIHRydWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVtaXREYXRlT3V0cHV0KG51bGwpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdXNpbmdDbGFyaXR5RGF0ZXBpY2tlcigpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRlcGlja2VyRW5hYmxlZFNlcnZpY2UuaXNFbmFibGVkO1xuICB9XG5cbiAgcHJpdmF0ZSB1c2luZ05hdGl2ZURhdGVwaWNrZXIoKSB7XG4gICAgcmV0dXJuICF0aGlzLmRhdGVwaWNrZXJFbmFibGVkU2VydmljZS5pc0VuYWJsZWQ7XG4gIH1cblxuICBwcml2YXRlIHNldEZvY3VzKGZvY3VzOiBib29sZWFuKSB7XG4gICAgaWYgKHRoaXMuZm9jdXNTZXJ2aWNlKSB7XG4gICAgICB0aGlzLmZvY3VzU2VydmljZS5mb2N1c2VkID0gZm9jdXM7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBwb3B1bGF0ZVNlcnZpY2VzRnJvbUNvbnRhaW5lckNvbXBvbmVudCgpIHtcbiAgICBpZiAoIXRoaXMuY29udGFpbmVyKSB7XG4gICAgICB0aGlzLmRhdGVJT1NlcnZpY2UgPSB0aGlzLmdldFByb3ZpZGVyRnJvbUNvbnRhaW5lcihEYXRlSU9TZXJ2aWNlKTtcbiAgICAgIHRoaXMuZGF0ZU5hdmlnYXRpb25TZXJ2aWNlID0gdGhpcy5nZXRQcm92aWRlckZyb21Db250YWluZXIoRGF0ZU5hdmlnYXRpb25TZXJ2aWNlKTtcbiAgICAgIHRoaXMuZGF0ZXBpY2tlckVuYWJsZWRTZXJ2aWNlID0gdGhpcy5nZXRQcm92aWRlckZyb21Db250YWluZXIoRGF0ZXBpY2tlckVuYWJsZWRTZXJ2aWNlKTtcbiAgICAgIHRoaXMuZGF0ZUZvcm1Db250cm9sU2VydmljZSA9IHRoaXMuZ2V0UHJvdmlkZXJGcm9tQ29udGFpbmVyKERhdGVGb3JtQ29udHJvbFNlcnZpY2UpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcHJvY2Vzc0luaXRpYWxJbnB1dHMoKSB7XG4gICAgaWYgKHRoaXMuZGF0ZXBpY2tlckhhc0Zvcm1Db250cm9sKCkpIHtcbiAgICAgIHRoaXMudXBkYXRlRGF0ZSh0aGlzLmRhdGVJT1NlcnZpY2UuZ2V0RGF0ZVZhbHVlRnJvbURhdGVTdHJpbmcodGhpcy5jb250cm9sLnZhbHVlKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudXBkYXRlRGF0ZSh0aGlzLmluaXRpYWxDbHJEYXRlSW5wdXRWYWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVEYXRlKHZhbHVlOiBEYXRlLCBzZXRCeVVzZXJJbnRlcmFjdGlvbiA9IGZhbHNlKSB7XG4gICAgY29uc3QgZGF0ZSA9IHRoaXMuZ2V0VmFsaWREYXRlVmFsdWVGcm9tRGF0ZSh2YWx1ZSk7XG5cbiAgICBpZiAoc2V0QnlVc2VySW50ZXJhY3Rpb24pIHtcbiAgICAgIHRoaXMuZW1pdERhdGVPdXRwdXQoZGF0ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucHJldmlvdXNEYXRlQ2hhbmdlID0gZGF0ZTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5kYXRlTmF2aWdhdGlvblNlcnZpY2UpIHtcbiAgICAgIHRoaXMuZGF0ZU5hdmlnYXRpb25TZXJ2aWNlLnNlbGVjdGVkRGF5ID0gZGF0ZVxuICAgICAgICA/IG5ldyBEYXlNb2RlbChkYXRlLmdldEZ1bGxZZWFyKCksIGRhdGUuZ2V0TW9udGgoKSwgZGF0ZS5nZXREYXRlKCkpXG4gICAgICAgIDogbnVsbDtcbiAgICB9XG5cbiAgICB0aGlzLnVwZGF0ZUlucHV0KGRhdGUpO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVJbnB1dChkYXRlOiBEYXRlKSB7XG4gICAgaWYgKGRhdGUpIHtcbiAgICAgIGNvbnN0IGRhdGVTdHJpbmcgPSB0aGlzLmRhdGVJT1NlcnZpY2UudG9Mb2NhbGVEaXNwbGF5Rm9ybWF0U3RyaW5nKGRhdGUpO1xuXG4gICAgICBpZiAodGhpcy5kYXRlcGlja2VySGFzRm9ybUNvbnRyb2woKSAmJiBkYXRlU3RyaW5nICE9PSB0aGlzLmNvbnRyb2wudmFsdWUpIHtcbiAgICAgICAgdGhpcy5jb250cm9sLmNvbnRyb2wuc2V0VmFsdWUoZGF0ZVN0cmluZyk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMudXNpbmdOYXRpdmVEYXRlcGlja2VyKCkpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICd2YWx1ZUFzRGF0ZScsIGRhdGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICd2YWx1ZScsIGRhdGVTdHJpbmcpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3ZhbHVlJywgJycpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0VmFsaWREYXRlVmFsdWVGcm9tRGF0ZShkYXRlOiBEYXRlKSB7XG4gICAgaWYgKHRoaXMuZGF0ZUlPU2VydmljZSkge1xuICAgICAgY29uc3QgZGF0ZVN0cmluZyA9IHRoaXMuZGF0ZUlPU2VydmljZS50b0xvY2FsZURpc3BsYXlGb3JtYXRTdHJpbmcoZGF0ZSk7XG4gICAgICByZXR1cm4gdGhpcy5kYXRlSU9TZXJ2aWNlLmdldERhdGVWYWx1ZUZyb21EYXRlU3RyaW5nKGRhdGVTdHJpbmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGVtaXREYXRlT3V0cHV0KGRhdGU6IERhdGUpIHtcbiAgICBpZiAoIWRhdGVzQXJlRXF1YWwoZGF0ZSwgdGhpcy5wcmV2aW91c0RhdGVDaGFuZ2UpKSB7XG4gICAgICB0aGlzLmRhdGVDaGFuZ2UuZW1pdChkYXRlKTtcbiAgICAgIHRoaXMucHJldmlvdXNEYXRlQ2hhbmdlID0gZGF0ZTtcbiAgICB9IGVsc2UgaWYgKCFkYXRlICYmIHRoaXMucHJldmlvdXNEYXRlQ2hhbmdlKSB7XG4gICAgICB0aGlzLmRhdGVDaGFuZ2UuZW1pdChudWxsKTtcbiAgICAgIHRoaXMucHJldmlvdXNEYXRlQ2hhbmdlID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGRhdGVwaWNrZXJIYXNGb3JtQ29udHJvbCgpIHtcbiAgICByZXR1cm4gISF0aGlzLmNvbnRyb2w7XG4gIH1cblxuICBwcml2YXRlIGxpc3RlbkZvckNvbnRyb2xWYWx1ZUNoYW5nZXMoKSB7XG4gICAgcmV0dXJuIG9mKHRoaXMuZGF0ZXBpY2tlckhhc0Zvcm1Db250cm9sKCkpXG4gICAgICAucGlwZShcbiAgICAgICAgZmlsdGVyKGhhc0NvbnRyb2wgPT4gaGFzQ29udHJvbCksXG4gICAgICAgIHN3aXRjaE1hcCgoKSA9PiB0aGlzLmNvbnRyb2wudmFsdWVDaGFuZ2VzKSxcbiAgICAgICAgLy8gb25seSB1cGRhdGUgZGF0ZSB2YWx1ZSBpZiBub3QgYmVpbmcgc2V0IGJ5IHVzZXJcbiAgICAgICAgZmlsdGVyKCgpID0+ICF0aGlzLmRhdGVwaWNrZXJGb2N1c1NlcnZpY2UuZWxlbWVudElzRm9jdXNlZCh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpKVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgodmFsdWU6IHN0cmluZykgPT4gdGhpcy51cGRhdGVEYXRlKHRoaXMuZGF0ZUlPU2VydmljZS5nZXREYXRlVmFsdWVGcm9tRGF0ZVN0cmluZyh2YWx1ZSkpKTtcbiAgfVxuXG4gIHByaXZhdGUgbGlzdGVuRm9yVXNlclNlbGVjdGVkRGF5Q2hhbmdlcygpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRlTmF2aWdhdGlvblNlcnZpY2Uuc2VsZWN0ZWREYXlDaGFuZ2Uuc3Vic2NyaWJlKGRheU1vZGVsID0+IHRoaXMudXBkYXRlRGF0ZShkYXlNb2RlbC50b0RhdGUoKSwgdHJ1ZSkpO1xuICB9XG5cbiAgcHJpdmF0ZSBsaXN0ZW5Gb3JUb3VjaENoYW5nZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0ZUZvcm1Db250cm9sU2VydmljZS50b3VjaGVkQ2hhbmdlXG4gICAgICAucGlwZShmaWx0ZXIoKCkgPT4gdGhpcy5kYXRlcGlja2VySGFzRm9ybUNvbnRyb2woKSkpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuY29udHJvbC5jb250cm9sLm1hcmtBc1RvdWNoZWQoKSk7XG4gIH1cblxuICBwcml2YXRlIGxpc3RlbkZvckRpcnR5Q2hhbmdlcygpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRlRm9ybUNvbnRyb2xTZXJ2aWNlLmRpcnR5Q2hhbmdlXG4gICAgICAucGlwZShmaWx0ZXIoKCkgPT4gdGhpcy5kYXRlcGlja2VySGFzRm9ybUNvbnRyb2woKSkpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuY29udHJvbC5jb250cm9sLm1hcmtBc0RpcnR5KCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBsaXN0ZW5Gb3JJbnB1dFJlZm9jdXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0ZU5hdmlnYXRpb25TZXJ2aWNlLnNlbGVjdGVkRGF5Q2hhbmdlXG4gICAgICAucGlwZShmaWx0ZXIoZGF0ZSA9PiAhIWRhdGUpKVxuICAgICAgLnN1YnNjcmliZSh2ID0+IHRoaXMuZGF0ZXBpY2tlckZvY3VzU2VydmljZS5mb2N1c0lucHV0KHRoaXMuZWwubmF0aXZlRWxlbWVudCkpO1xuICB9XG59XG4iXX0=