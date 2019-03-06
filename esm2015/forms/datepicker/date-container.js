/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, Inject, Optional, ContentChild } from '@angular/core';
import { IfOpenService } from '../../utils/conditional/if-open.service';
import { IfErrorService } from '../common/if-error/if-error.service';
import { ControlClassService } from '../common/providers/control-class.service';
import { ControlIdService } from '../common/providers/control-id.service';
import { FocusService } from '../common/providers/focus.service';
import { LayoutService } from '../common/providers/layout.service';
import { NgControlService } from '../common/providers/ng-control.service';
import { ClrLabel } from '../common/label';
import { DateFormControlService } from './providers/date-form-control.service';
import { DateIOService } from './providers/date-io.service';
import { DateNavigationService } from './providers/date-navigation.service';
import { DatepickerEnabledService } from './providers/datepicker-enabled.service';
import { LocaleHelperService } from './providers/locale-helper.service';
import { ClrCommonStrings } from '../../utils/i18n/common-strings.interface';
import { IS_NEW_FORMS_LAYOUT } from '../common/providers/new-forms.service';
/**
 * This component contains two template for the old and new forms layouts.
 * When it is time to remove the old forms layouts support, remove the ng-templates
 * and ng-container, and just keep the inner content of the #newLayout as the template
 * and move the ng-content for clrDate.
 */
export class ClrDateContainer {
    /**
     * @param {?} _ifOpenService
     * @param {?} _dateNavigationService
     * @param {?} _datepickerEnabledService
     * @param {?} dateFormControlService
     * @param {?} commonStrings
     * @param {?} ifErrorService
     * @param {?} focusService
     * @param {?} controlClassService
     * @param {?} layoutService
     * @param {?} newFormsLayout
     * @param {?} ngControlService
     */
    constructor(_ifOpenService, _dateNavigationService, _datepickerEnabledService, dateFormControlService, commonStrings, ifErrorService, focusService, controlClassService, layoutService, newFormsLayout, ngControlService) {
        this._ifOpenService = _ifOpenService;
        this._dateNavigationService = _dateNavigationService;
        this._datepickerEnabledService = _datepickerEnabledService;
        this.dateFormControlService = dateFormControlService;
        this.commonStrings = commonStrings;
        this.ifErrorService = ifErrorService;
        this.focusService = focusService;
        this.controlClassService = controlClassService;
        this.layoutService = layoutService;
        this.newFormsLayout = newFormsLayout;
        this.ngControlService = ngControlService;
        this._dynamic = false;
        this.invalid = false;
        this.focus = false;
        this.subscriptions = [];
        this.subscriptions.push(this._ifOpenService.openChange.subscribe(open => {
            if (open) {
                this.initializeCalendar();
            }
        }));
        this.subscriptions.push(this.focusService.focusChange.subscribe(state => {
            this.focus = state;
        }));
        this.subscriptions.push(this.ngControlService.controlChanges.subscribe(control => {
            this.control = control;
        }));
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.subscriptions.push(this.ifErrorService.statusChanges.subscribe(invalid => {
            this.invalid = invalid;
        }));
    }
    /**
     * Returns the classes to apply to the control
     * @return {?}
     */
    controlClass() {
        return this.controlClassService.controlClass(this.invalid, this.addGrid());
    }
    /**
     * Determines if the control needs to add grid classes
     * @return {?}
     */
    addGrid() {
        if (this.layoutService && !this.layoutService.isVertical()) {
            return true;
        }
        return false;
    }
    /**
     * Returns if the Datepicker is enabled or not. If disabled, hides the datepicker trigger.
     * @return {?}
     */
    get isEnabled() {
        return this._datepickerEnabledService.isEnabled;
    }
    /**
     * Processes the user input and Initializes the Calendar everytime the datepicker popover is open.
     * @return {?}
     */
    initializeCalendar() {
        this._dateNavigationService.initializeCalendar();
    }
    /**
     * Toggles the Datepicker Popover.
     * @param {?} event
     * @return {?}
     */
    toggleDatepicker(event) {
        this._ifOpenService.toggleWithEvent(event);
        this.dateFormControlService.markAsTouched();
    }
    /**
     * Unsubscribe from subscriptions.
     * @return {?}
     */
    ngOnDestroy() {
        this.subscriptions.map(sub => sub.unsubscribe());
    }
}
ClrDateContainer.decorators = [
    { type: Component, args: [{
                selector: 'clr-date-container',
                template: `
    <ng-template #oldLayout>
        <ng-content></ng-content>
        <ng-container *ngTemplateOutlet="clrDate"></ng-container>
        <button
            type="button"
            class="datepicker-trigger"
            (click)="toggleDatepicker($event)"
            *ngIf="isEnabled">
            <clr-icon shape="calendar" class="datepicker-trigger-icon" [attr.title]="commonStrings.open"></clr-icon>
        </button>
        <clr-datepicker-view-manager *clrIfOpen clrFocusTrap></clr-datepicker-view-manager>
    </ng-template>
    
    <ng-template #newLayout>
      <ng-content select="label"></ng-content>
      <label *ngIf="!label && addGrid()"></label>
      <div class="clr-control-container" [ngClass]="controlClass()">
        <div class="clr-input-wrapper">
          <div class="clr-input-group" [class.clr-focus]="focus">
            <ng-container *ngTemplateOutlet="clrDate"></ng-container>
            <button type="button" class="clr-input-group-icon-action" (click)="toggleDatepicker($event)" *ngIf="isEnabled" [attr.title]="commonStrings.open" [disabled]="control?.disabled">
              <clr-icon shape="calendar"></clr-icon>
            </button>
            <clr-datepicker-view-manager *clrIfOpen clrFocusTrap></clr-datepicker-view-manager>
          </div>
          <clr-icon class="clr-validate-icon" shape="exclamation-circle"></clr-icon>
        </div>
        <ng-content select="clr-control-helper" *ngIf="!invalid"></ng-content>
        <ng-content select="clr-control-error" *ngIf="invalid"></ng-content>
      </div>
    </ng-template>
    
    <ng-template #clrDate>
      <ng-content select="[clrDate]"></ng-content>
    </ng-template>
    
    <ng-container *ngIf="newFormsLayout; then newLayout else oldLayout"></ng-container>
    `,
                providers: [
                    ControlIdService,
                    IfOpenService,
                    LocaleHelperService,
                    IfErrorService,
                    ControlClassService,
                    FocusService,
                    NgControlService,
                    DateIOService,
                    DateNavigationService,
                    DatepickerEnabledService,
                    DateFormControlService,
                ],
                host: {
                    '[class.date-container]': '!newFormsLayout',
                    '[class.clr-form-control-disabled]': 'control?.disabled',
                    '[class.clr-form-control]': 'newFormsLayout',
                    '[class.clr-row]': 'addGrid()',
                }
            }] }
];
/** @nocollapse */
ClrDateContainer.ctorParameters = () => [
    { type: IfOpenService },
    { type: DateNavigationService },
    { type: DatepickerEnabledService },
    { type: DateFormControlService },
    { type: ClrCommonStrings },
    { type: IfErrorService },
    { type: FocusService },
    { type: ControlClassService },
    { type: LayoutService, decorators: [{ type: Optional }] },
    { type: Boolean, decorators: [{ type: Optional }, { type: Inject, args: [IS_NEW_FORMS_LAYOUT,] }] },
    { type: NgControlService }
];
ClrDateContainer.propDecorators = {
    label: [{ type: ContentChild, args: [ClrLabel,] }]
};
if (false) {
    /** @type {?} */
    ClrDateContainer.prototype._dynamic;
    /** @type {?} */
    ClrDateContainer.prototype.invalid;
    /** @type {?} */
    ClrDateContainer.prototype.focus;
    /** @type {?} */
    ClrDateContainer.prototype.control;
    /** @type {?} */
    ClrDateContainer.prototype.label;
    /** @type {?} */
    ClrDateContainer.prototype.subscriptions;
    /** @type {?} */
    ClrDateContainer.prototype._ifOpenService;
    /** @type {?} */
    ClrDateContainer.prototype._dateNavigationService;
    /** @type {?} */
    ClrDateContainer.prototype._datepickerEnabledService;
    /** @type {?} */
    ClrDateContainer.prototype.dateFormControlService;
    /** @type {?} */
    ClrDateContainer.prototype.commonStrings;
    /** @type {?} */
    ClrDateContainer.prototype.ifErrorService;
    /** @type {?} */
    ClrDateContainer.prototype.focusService;
    /** @type {?} */
    ClrDateContainer.prototype.controlClassService;
    /** @type {?} */
    ClrDateContainer.prototype.layoutService;
    /** @type {?} */
    ClrDateContainer.prototype.newFormsLayout;
    /** @type {?} */
    ClrDateContainer.prototype.ngControlService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1jb250YWluZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJmb3Jtcy9kYXRlcGlja2VyL2RhdGUtY29udGFpbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFhLFFBQVEsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFJckYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBRXhFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUNyRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUNoRixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUMxRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDakUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUzQyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUMvRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDNUQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDNUUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDbEYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDeEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDN0UsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7Ozs7Ozs7QUFzRTVF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Z0Q7O0lBQ2hELHlDQUFnRDs7SUFDaEQsMENBRThCOztJQUM5Qiw0Q0FBMEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBDb21wb25lbnQsIEluamVjdCwgT25EZXN0cm95LCBPcHRpb25hbCwgQ29udGVudENoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE5nQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgSWZPcGVuU2VydmljZSB9IGZyb20gJy4uLy4uL3V0aWxzL2NvbmRpdGlvbmFsL2lmLW9wZW4uc2VydmljZSc7XG5pbXBvcnQgeyBEeW5hbWljV3JhcHBlciB9IGZyb20gJy4uLy4uL3V0aWxzL2hvc3Qtd3JhcHBpbmcvZHluYW1pYy13cmFwcGVyJztcbmltcG9ydCB7IElmRXJyb3JTZXJ2aWNlIH0gZnJvbSAnLi4vY29tbW9uL2lmLWVycm9yL2lmLWVycm9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29udHJvbENsYXNzU2VydmljZSB9IGZyb20gJy4uL2NvbW1vbi9wcm92aWRlcnMvY29udHJvbC1jbGFzcy5zZXJ2aWNlJztcbmltcG9ydCB7IENvbnRyb2xJZFNlcnZpY2UgfSBmcm9tICcuLi9jb21tb24vcHJvdmlkZXJzL2NvbnRyb2wtaWQuc2VydmljZSc7XG5pbXBvcnQgeyBGb2N1c1NlcnZpY2UgfSBmcm9tICcuLi9jb21tb24vcHJvdmlkZXJzL2ZvY3VzLnNlcnZpY2UnO1xuaW1wb3J0IHsgTGF5b3V0U2VydmljZSB9IGZyb20gJy4uL2NvbW1vbi9wcm92aWRlcnMvbGF5b3V0LnNlcnZpY2UnO1xuaW1wb3J0IHsgTmdDb250cm9sU2VydmljZSB9IGZyb20gJy4uL2NvbW1vbi9wcm92aWRlcnMvbmctY29udHJvbC5zZXJ2aWNlJztcbmltcG9ydCB7IENsckxhYmVsIH0gZnJvbSAnLi4vY29tbW9uL2xhYmVsJztcblxuaW1wb3J0IHsgRGF0ZUZvcm1Db250cm9sU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2RhdGUtZm9ybS1jb250cm9sLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0ZUlPU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2RhdGUtaW8uc2VydmljZSc7XG5pbXBvcnQgeyBEYXRlTmF2aWdhdGlvblNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9kYXRlLW5hdmlnYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBEYXRlcGlja2VyRW5hYmxlZFNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9kYXRlcGlja2VyLWVuYWJsZWQuc2VydmljZSc7XG5pbXBvcnQgeyBMb2NhbGVIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvbG9jYWxlLWhlbHBlci5zZXJ2aWNlJztcbmltcG9ydCB7IENsckNvbW1vblN0cmluZ3MgfSBmcm9tICcuLi8uLi91dGlscy9pMThuL2NvbW1vbi1zdHJpbmdzLmludGVyZmFjZSc7XG5pbXBvcnQgeyBJU19ORVdfRk9STVNfTEFZT1VUIH0gZnJvbSAnLi4vY29tbW9uL3Byb3ZpZGVycy9uZXctZm9ybXMuc2VydmljZSc7XG5cbi8qKlxuICogVGhpcyBjb21wb25lbnQgY29udGFpbnMgdHdvIHRlbXBsYXRlIGZvciB0aGUgb2xkIGFuZCBuZXcgZm9ybXMgbGF5b3V0cy5cbiAqIFdoZW4gaXQgaXMgdGltZSB0byByZW1vdmUgdGhlIG9sZCBmb3JtcyBsYXlvdXRzIHN1cHBvcnQsIHJlbW92ZSB0aGUgbmctdGVtcGxhdGVzXG4gKiBhbmQgbmctY29udGFpbmVyLCBhbmQganVzdCBrZWVwIHRoZSBpbm5lciBjb250ZW50IG9mIHRoZSAjbmV3TGF5b3V0IGFzIHRoZSB0ZW1wbGF0ZVxuICogYW5kIG1vdmUgdGhlIG5nLWNvbnRlbnQgZm9yIGNsckRhdGUuXG4gKi9cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLWRhdGUtY29udGFpbmVyJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctdGVtcGxhdGUgI29sZExheW91dD5cbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiY2xyRGF0ZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIGNsYXNzPVwiZGF0ZXBpY2tlci10cmlnZ2VyXCJcbiAgICAgICAgICAgIChjbGljayk9XCJ0b2dnbGVEYXRlcGlja2VyKCRldmVudClcIlxuICAgICAgICAgICAgKm5nSWY9XCJpc0VuYWJsZWRcIj5cbiAgICAgICAgICAgIDxjbHItaWNvbiBzaGFwZT1cImNhbGVuZGFyXCIgY2xhc3M9XCJkYXRlcGlja2VyLXRyaWdnZXItaWNvblwiIFthdHRyLnRpdGxlXT1cImNvbW1vblN0cmluZ3Mub3BlblwiPjwvY2xyLWljb24+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8Y2xyLWRhdGVwaWNrZXItdmlldy1tYW5hZ2VyICpjbHJJZk9wZW4gY2xyRm9jdXNUcmFwPjwvY2xyLWRhdGVwaWNrZXItdmlldy1tYW5hZ2VyPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgXG4gICAgPG5nLXRlbXBsYXRlICNuZXdMYXlvdXQ+XG4gICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJsYWJlbFwiPjwvbmctY29udGVudD5cbiAgICAgIDxsYWJlbCAqbmdJZj1cIiFsYWJlbCAmJiBhZGRHcmlkKClcIj48L2xhYmVsPlxuICAgICAgPGRpdiBjbGFzcz1cImNsci1jb250cm9sLWNvbnRhaW5lclwiIFtuZ0NsYXNzXT1cImNvbnRyb2xDbGFzcygpXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjbHItaW5wdXQtd3JhcHBlclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjbHItaW5wdXQtZ3JvdXBcIiBbY2xhc3MuY2xyLWZvY3VzXT1cImZvY3VzXCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiY2xyRGF0ZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbHItaW5wdXQtZ3JvdXAtaWNvbi1hY3Rpb25cIiAoY2xpY2spPVwidG9nZ2xlRGF0ZXBpY2tlcigkZXZlbnQpXCIgKm5nSWY9XCJpc0VuYWJsZWRcIiBbYXR0ci50aXRsZV09XCJjb21tb25TdHJpbmdzLm9wZW5cIiBbZGlzYWJsZWRdPVwiY29udHJvbD8uZGlzYWJsZWRcIj5cbiAgICAgICAgICAgICAgPGNsci1pY29uIHNoYXBlPVwiY2FsZW5kYXJcIj48L2Nsci1pY29uPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8Y2xyLWRhdGVwaWNrZXItdmlldy1tYW5hZ2VyICpjbHJJZk9wZW4gY2xyRm9jdXNUcmFwPjwvY2xyLWRhdGVwaWNrZXItdmlldy1tYW5hZ2VyPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxjbHItaWNvbiBjbGFzcz1cImNsci12YWxpZGF0ZS1pY29uXCIgc2hhcGU9XCJleGNsYW1hdGlvbi1jaXJjbGVcIj48L2Nsci1pY29uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiY2xyLWNvbnRyb2wtaGVscGVyXCIgKm5nSWY9XCIhaW52YWxpZFwiPjwvbmctY29udGVudD5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiY2xyLWNvbnRyb2wtZXJyb3JcIiAqbmdJZj1cImludmFsaWRcIj48L25nLWNvbnRlbnQ+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIFxuICAgIDxuZy10ZW1wbGF0ZSAjY2xyRGF0ZT5cbiAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIltjbHJEYXRlXVwiPjwvbmctY29udGVudD5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIFxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJuZXdGb3Jtc0xheW91dDsgdGhlbiBuZXdMYXlvdXQgZWxzZSBvbGRMYXlvdXRcIj48L25nLWNvbnRhaW5lcj5cbiAgICBgLFxuICBwcm92aWRlcnM6IFtcbiAgICBDb250cm9sSWRTZXJ2aWNlLFxuICAgIElmT3BlblNlcnZpY2UsXG4gICAgTG9jYWxlSGVscGVyU2VydmljZSxcbiAgICBJZkVycm9yU2VydmljZSxcbiAgICBDb250cm9sQ2xhc3NTZXJ2aWNlLFxuICAgIEZvY3VzU2VydmljZSxcbiAgICBOZ0NvbnRyb2xTZXJ2aWNlLFxuICAgIERhdGVJT1NlcnZpY2UsXG4gICAgRGF0ZU5hdmlnYXRpb25TZXJ2aWNlLFxuICAgIERhdGVwaWNrZXJFbmFibGVkU2VydmljZSxcbiAgICBEYXRlRm9ybUNvbnRyb2xTZXJ2aWNlLFxuICBdLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5kYXRlLWNvbnRhaW5lcl0nOiAnIW5ld0Zvcm1zTGF5b3V0JyxcbiAgICAnW2NsYXNzLmNsci1mb3JtLWNvbnRyb2wtZGlzYWJsZWRdJzogJ2NvbnRyb2w/LmRpc2FibGVkJyxcbiAgICAnW2NsYXNzLmNsci1mb3JtLWNvbnRyb2xdJzogJ25ld0Zvcm1zTGF5b3V0JyxcbiAgICAnW2NsYXNzLmNsci1yb3ddJzogJ2FkZEdyaWQoKScsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIENsckRhdGVDb250YWluZXIgaW1wbGVtZW50cyBEeW5hbWljV3JhcHBlciwgT25EZXN0cm95IHtcbiAgX2R5bmFtaWM6IGJvb2xlYW4gPSBmYWxzZTtcbiAgaW52YWxpZCA9IGZhbHNlO1xuICBmb2N1cyA9IGZhbHNlO1xuICBjb250cm9sOiBOZ0NvbnRyb2w7XG4gIEBDb250ZW50Q2hpbGQoQ2xyTGFiZWwpIGxhYmVsOiBDbHJMYWJlbDtcblxuICBwcml2YXRlIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfaWZPcGVuU2VydmljZTogSWZPcGVuU2VydmljZSxcbiAgICBwcml2YXRlIF9kYXRlTmF2aWdhdGlvblNlcnZpY2U6IERhdGVOYXZpZ2F0aW9uU2VydmljZSxcbiAgICBwcml2YXRlIF9kYXRlcGlja2VyRW5hYmxlZFNlcnZpY2U6IERhdGVwaWNrZXJFbmFibGVkU2VydmljZSxcbiAgICBwcml2YXRlIGRhdGVGb3JtQ29udHJvbFNlcnZpY2U6IERhdGVGb3JtQ29udHJvbFNlcnZpY2UsXG4gICAgcHVibGljIGNvbW1vblN0cmluZ3M6IENsckNvbW1vblN0cmluZ3MsXG4gICAgcHJpdmF0ZSBpZkVycm9yU2VydmljZTogSWZFcnJvclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBmb2N1c1NlcnZpY2U6IEZvY3VzU2VydmljZSxcbiAgICBwcml2YXRlIGNvbnRyb2xDbGFzc1NlcnZpY2U6IENvbnRyb2xDbGFzc1NlcnZpY2UsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBsYXlvdXRTZXJ2aWNlOiBMYXlvdXRTZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpXG4gICAgQEluamVjdChJU19ORVdfRk9STVNfTEFZT1VUKVxuICAgIHB1YmxpYyBuZXdGb3Jtc0xheW91dDogYm9vbGVhbixcbiAgICBwcml2YXRlIG5nQ29udHJvbFNlcnZpY2U6IE5nQ29udHJvbFNlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLl9pZk9wZW5TZXJ2aWNlLm9wZW5DaGFuZ2Uuc3Vic2NyaWJlKG9wZW4gPT4ge1xuICAgICAgICBpZiAob3Blbikge1xuICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZUNhbGVuZGFyKCk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMuZm9jdXNTZXJ2aWNlLmZvY3VzQ2hhbmdlLnN1YnNjcmliZShzdGF0ZSA9PiB7XG4gICAgICAgIHRoaXMuZm9jdXMgPSBzdGF0ZTtcbiAgICAgIH0pXG4gICAgKTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMubmdDb250cm9sU2VydmljZS5jb250cm9sQ2hhbmdlcy5zdWJzY3JpYmUoY29udHJvbCA9PiB7XG4gICAgICAgIHRoaXMuY29udHJvbCA9IGNvbnRyb2w7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMuaWZFcnJvclNlcnZpY2Uuc3RhdHVzQ2hhbmdlcy5zdWJzY3JpYmUoaW52YWxpZCA9PiB7XG4gICAgICAgIHRoaXMuaW52YWxpZCA9IGludmFsaWQ7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgY2xhc3NlcyB0byBhcHBseSB0byB0aGUgY29udHJvbFxuICAgKi9cbiAgY29udHJvbENsYXNzKCkge1xuICAgIHJldHVybiB0aGlzLmNvbnRyb2xDbGFzc1NlcnZpY2UuY29udHJvbENsYXNzKHRoaXMuaW52YWxpZCwgdGhpcy5hZGRHcmlkKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIERldGVybWluZXMgaWYgdGhlIGNvbnRyb2wgbmVlZHMgdG8gYWRkIGdyaWQgY2xhc3Nlc1xuICAgKi9cbiAgYWRkR3JpZCgpIHtcbiAgICBpZiAodGhpcy5sYXlvdXRTZXJ2aWNlICYmICF0aGlzLmxheW91dFNlcnZpY2UuaXNWZXJ0aWNhbCgpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgaWYgdGhlIERhdGVwaWNrZXIgaXMgZW5hYmxlZCBvciBub3QuIElmIGRpc2FibGVkLCBoaWRlcyB0aGUgZGF0ZXBpY2tlciB0cmlnZ2VyLlxuICAgKi9cbiAgZ2V0IGlzRW5hYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZGF0ZXBpY2tlckVuYWJsZWRTZXJ2aWNlLmlzRW5hYmxlZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcm9jZXNzZXMgdGhlIHVzZXIgaW5wdXQgYW5kIEluaXRpYWxpemVzIHRoZSBDYWxlbmRhciBldmVyeXRpbWUgdGhlIGRhdGVwaWNrZXIgcG9wb3ZlciBpcyBvcGVuLlxuICAgKi9cbiAgcHJpdmF0ZSBpbml0aWFsaXplQ2FsZW5kYXIoKTogdm9pZCB7XG4gICAgdGhpcy5fZGF0ZU5hdmlnYXRpb25TZXJ2aWNlLmluaXRpYWxpemVDYWxlbmRhcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRvZ2dsZXMgdGhlIERhdGVwaWNrZXIgUG9wb3Zlci5cbiAgICovXG4gIHRvZ2dsZURhdGVwaWNrZXIoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICB0aGlzLl9pZk9wZW5TZXJ2aWNlLnRvZ2dsZVdpdGhFdmVudChldmVudCk7XG4gICAgdGhpcy5kYXRlRm9ybUNvbnRyb2xTZXJ2aWNlLm1hcmtBc1RvdWNoZWQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVbnN1YnNjcmliZSBmcm9tIHN1YnNjcmlwdGlvbnMuXG4gICAqL1xuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMubWFwKHN1YiA9PiBzdWIudW5zdWJzY3JpYmUoKSk7XG4gIH1cbn1cbiJdfQ==