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
var ClrDateContainer = /** @class */ (function () {
    function ClrDateContainer(_ifOpenService, _dateNavigationService, _datepickerEnabledService, dateFormControlService, commonStrings, ifErrorService, focusService, controlClassService, layoutService, newFormsLayout, ngControlService) {
        var _this = this;
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
        this.subscriptions.push(this._ifOpenService.openChange.subscribe(function (open) {
            if (open) {
                _this.initializeCalendar();
            }
        }));
        this.subscriptions.push(this.focusService.focusChange.subscribe(function (state) {
            _this.focus = state;
        }));
        this.subscriptions.push(this.ngControlService.controlChanges.subscribe(function (control) {
            _this.control = control;
        }));
    }
    /**
     * @return {?}
     */
    ClrDateContainer.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.subscriptions.push(this.ifErrorService.statusChanges.subscribe(function (invalid) {
            _this.invalid = invalid;
        }));
    };
    /**
     * Returns the classes to apply to the control
     */
    /**
     * Returns the classes to apply to the control
     * @return {?}
     */
    ClrDateContainer.prototype.controlClass = /**
     * Returns the classes to apply to the control
     * @return {?}
     */
    function () {
        return this.controlClassService.controlClass(this.invalid, this.addGrid());
    };
    /**
     * Determines if the control needs to add grid classes
     */
    /**
     * Determines if the control needs to add grid classes
     * @return {?}
     */
    ClrDateContainer.prototype.addGrid = /**
     * Determines if the control needs to add grid classes
     * @return {?}
     */
    function () {
        if (this.layoutService && !this.layoutService.isVertical()) {
            return true;
        }
        return false;
    };
    Object.defineProperty(ClrDateContainer.prototype, "isEnabled", {
        /**
         * Returns if the Datepicker is enabled or not. If disabled, hides the datepicker trigger.
         */
        get: /**
         * Returns if the Datepicker is enabled or not. If disabled, hides the datepicker trigger.
         * @return {?}
         */
        function () {
            return this._datepickerEnabledService.isEnabled;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Processes the user input and Initializes the Calendar everytime the datepicker popover is open.
     */
    /**
     * Processes the user input and Initializes the Calendar everytime the datepicker popover is open.
     * @return {?}
     */
    ClrDateContainer.prototype.initializeCalendar = /**
     * Processes the user input and Initializes the Calendar everytime the datepicker popover is open.
     * @return {?}
     */
    function () {
        this._dateNavigationService.initializeCalendar();
    };
    /**
     * Toggles the Datepicker Popover.
     */
    /**
     * Toggles the Datepicker Popover.
     * @param {?} event
     * @return {?}
     */
    ClrDateContainer.prototype.toggleDatepicker = /**
     * Toggles the Datepicker Popover.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this._ifOpenService.toggleWithEvent(event);
        this.dateFormControlService.markAsTouched();
    };
    /**
     * Unsubscribe from subscriptions.
     */
    /**
     * Unsubscribe from subscriptions.
     * @return {?}
     */
    ClrDateContainer.prototype.ngOnDestroy = /**
     * Unsubscribe from subscriptions.
     * @return {?}
     */
    function () {
        this.subscriptions.map(function (sub) { return sub.unsubscribe(); });
    };
    ClrDateContainer.decorators = [
        { type: Component, args: [{
                    selector: 'clr-date-container',
                    template: "\n    <ng-template #oldLayout>\n        <ng-content></ng-content>\n        <ng-container *ngTemplateOutlet=\"clrDate\"></ng-container>\n        <button\n            type=\"button\"\n            class=\"datepicker-trigger\"\n            (click)=\"toggleDatepicker($event)\"\n            *ngIf=\"isEnabled\">\n            <clr-icon shape=\"calendar\" class=\"datepicker-trigger-icon\" [attr.title]=\"commonStrings.open\"></clr-icon>\n        </button>\n        <clr-datepicker-view-manager *clrIfOpen clrFocusTrap></clr-datepicker-view-manager>\n    </ng-template>\n    \n    <ng-template #newLayout>\n      <ng-content select=\"label\"></ng-content>\n      <label *ngIf=\"!label && addGrid()\"></label>\n      <div class=\"clr-control-container\" [ngClass]=\"controlClass()\">\n        <div class=\"clr-input-wrapper\">\n          <div class=\"clr-input-group\" [class.clr-focus]=\"focus\">\n            <ng-container *ngTemplateOutlet=\"clrDate\"></ng-container>\n            <button type=\"button\" class=\"clr-input-group-icon-action\" (click)=\"toggleDatepicker($event)\" *ngIf=\"isEnabled\" [attr.title]=\"commonStrings.open\" [disabled]=\"control?.disabled\">\n              <clr-icon shape=\"calendar\"></clr-icon>\n            </button>\n            <clr-datepicker-view-manager *clrIfOpen clrFocusTrap></clr-datepicker-view-manager>\n          </div>\n          <clr-icon class=\"clr-validate-icon\" shape=\"exclamation-circle\"></clr-icon>\n        </div>\n        <ng-content select=\"clr-control-helper\" *ngIf=\"!invalid\"></ng-content>\n        <ng-content select=\"clr-control-error\" *ngIf=\"invalid\"></ng-content>\n      </div>\n    </ng-template>\n    \n    <ng-template #clrDate>\n      <ng-content select=\"[clrDate]\"></ng-content>\n    </ng-template>\n    \n    <ng-container *ngIf=\"newFormsLayout; then newLayout else oldLayout\"></ng-container>\n    ",
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
    ClrDateContainer.ctorParameters = function () { return [
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
    ]; };
    ClrDateContainer.propDecorators = {
        label: [{ type: ContentChild, args: [ClrLabel,] }]
    };
    return ClrDateContainer;
}());
export { ClrDateContainer };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1jb250YWluZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJmb3Jtcy9kYXRlcGlja2VyL2RhdGUtY29udGFpbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFhLFFBQVEsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFJckYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBRXhFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUNyRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUNoRixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUMxRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDakUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUzQyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUMvRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDNUQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDNUUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDbEYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDeEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDN0UsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7Ozs7Ozs7QUFTNUU7SUFzRUUsMEJBQ1UsY0FBNkIsRUFDN0Isc0JBQTZDLEVBQzdDLHlCQUFtRCxFQUNuRCxzQkFBOEMsRUFDL0MsYUFBK0IsRUFDOUIsY0FBOEIsRUFDOUIsWUFBMEIsRUFDMUIsbUJBQXdDLEVBQzVCLGFBQTRCLEVBR3pDLGNBQXVCLEVBQ3RCLGdCQUFrQztRQWI1QyxpQkFnQ0M7UUEvQlMsbUJBQWMsR0FBZCxjQUFjLENBQWU7UUFDN0IsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUF1QjtRQUM3Qyw4QkFBeUIsR0FBekIseUJBQXlCLENBQTBCO1FBQ25ELDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBd0I7UUFDL0Msa0JBQWEsR0FBYixhQUFhLENBQWtCO1FBQzlCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQzVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBR3pDLG1CQUFjLEdBQWQsY0FBYyxDQUFTO1FBQ3RCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFyQjVDLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFDMUIsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNoQixVQUFLLEdBQUcsS0FBSyxDQUFDO1FBSU4sa0JBQWEsR0FBbUIsRUFBRSxDQUFDO1FBaUJ6QyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FDckIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFVBQUEsSUFBSTtZQUMzQyxJQUFJLElBQUksRUFBRTtnQkFDUixLQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQzthQUMzQjtRQUNILENBQUMsQ0FBQyxDQUNILENBQUM7UUFDRixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FDckIsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLFVBQUEsS0FBSztZQUMzQyxLQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNyQixDQUFDLENBQUMsQ0FDSCxDQUFDO1FBQ0YsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQ3JCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLFVBQUEsT0FBTztZQUNwRCxLQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN6QixDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQzs7OztJQUVELG1DQUFROzs7SUFBUjtRQUFBLGlCQU1DO1FBTEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQ3JCLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxVQUFBLE9BQU87WUFDakQsS0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFRDs7T0FFRzs7Ozs7SUFDSCx1Q0FBWTs7OztJQUFaO1FBQ0UsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDN0UsQ0FBQztJQUVEOztPQUVHOzs7OztJQUNILGtDQUFPOzs7O0lBQVA7UUFDRSxJQUFJLElBQUksQ0FBQyxhQUFhLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRSxFQUFFO1lBQzFELE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFLRCxzQkFBSSx1Q0FBUztRQUhiOztXQUVHOzs7OztRQUNIO1lBQ0UsT0FBTyxJQUFJLENBQUMseUJBQXlCLENBQUMsU0FBUyxDQUFDO1FBQ2xELENBQUM7OztPQUFBO0lBRUQ7O09BRUc7Ozs7O0lBQ0ssNkNBQWtCOzs7O0lBQTFCO1FBQ0UsSUFBSSxDQUFDLHNCQUFzQixDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDbkQsQ0FBQztJQUVEOztPQUVHOzs7Ozs7SUFDSCwyQ0FBZ0I7Ozs7O0lBQWhCLFVBQWlCLEtBQWlCO1FBQ2hDLElBQUksQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUM5QyxDQUFDO0lBRUQ7O09BRUc7Ozs7O0lBQ0gsc0NBQVc7Ozs7SUFBWDtRQUNFLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLFdBQVcsRUFBRSxFQUFqQixDQUFpQixDQUFDLENBQUM7SUFDbkQsQ0FBQzs7Z0JBNUpGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsb0JBQW9CO29CQUM5QixRQUFRLEVBQUUscTFEQXNDUDtvQkFDSCxTQUFTLEVBQUU7d0JBQ1QsZ0JBQWdCO3dCQUNoQixhQUFhO3dCQUNiLG1CQUFtQjt3QkFDbkIsY0FBYzt3QkFDZCxtQkFBbUI7d0JBQ25CLFlBQVk7d0JBQ1osZ0JBQWdCO3dCQUNoQixhQUFhO3dCQUNiLHFCQUFxQjt3QkFDckIsd0JBQXdCO3dCQUN4QixzQkFBc0I7cUJBQ3ZCO29CQUNELElBQUksRUFBRTt3QkFDSix3QkFBd0IsRUFBRSxpQkFBaUI7d0JBQzNDLG1DQUFtQyxFQUFFLG1CQUFtQjt3QkFDeEQsMEJBQTBCLEVBQUUsZ0JBQWdCO3dCQUM1QyxpQkFBaUIsRUFBRSxXQUFXO3FCQUMvQjtpQkFDRjs7OztnQkFyRlEsYUFBYTtnQkFZYixxQkFBcUI7Z0JBQ3JCLHdCQUF3QjtnQkFIeEIsc0JBQXNCO2dCQUt0QixnQkFBZ0I7Z0JBYmhCLGNBQWM7Z0JBR2QsWUFBWTtnQkFGWixtQkFBbUI7Z0JBR25CLGFBQWEsdUJBa0dqQixRQUFROzhDQUNSLFFBQVEsWUFDUixNQUFNLFNBQUMsbUJBQW1CO2dCQW5HdEIsZ0JBQWdCOzs7d0JBb0Z0QixZQUFZLFNBQUMsUUFBUTs7SUEyRnhCLHVCQUFDO0NBQUEsQUE3SkQsSUE2SkM7U0FoR1ksZ0JBQWdCOzs7SUFDM0Isb0NBQTBCOztJQUMxQixtQ0FBZ0I7O0lBQ2hCLGlDQUFjOztJQUNkLG1DQUFtQjs7SUFDbkIsaUNBQXdDOztJQUV4Qyx5Q0FBMkM7O0lBR3pDLDBDQUFxQzs7SUFDckMsa0RBQXFEOztJQUNyRCxxREFBMkQ7O0lBQzNELGtEQUFzRDs7SUFDdEQseUNBQXNDOztJQUN0QywwQ0FBc0M7O0lBQ3RDLHdDQUFrQzs7SUFDbEMsK0NBQWdEOztJQUNoRCx5Q0FBZ0Q7O0lBQ2hELDBDQUU4Qjs7SUFDOUIsNENBQTBDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgQ29tcG9uZW50LCBJbmplY3QsIE9uRGVzdHJveSwgT3B0aW9uYWwsIENvbnRlbnRDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBOZ0NvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IElmT3BlblNlcnZpY2UgfSBmcm9tICcuLi8uLi91dGlscy9jb25kaXRpb25hbC9pZi1vcGVuLnNlcnZpY2UnO1xuaW1wb3J0IHsgRHluYW1pY1dyYXBwZXIgfSBmcm9tICcuLi8uLi91dGlscy9ob3N0LXdyYXBwaW5nL2R5bmFtaWMtd3JhcHBlcic7XG5pbXBvcnQgeyBJZkVycm9yU2VydmljZSB9IGZyb20gJy4uL2NvbW1vbi9pZi1lcnJvci9pZi1lcnJvci5zZXJ2aWNlJztcbmltcG9ydCB7IENvbnRyb2xDbGFzc1NlcnZpY2UgfSBmcm9tICcuLi9jb21tb24vcHJvdmlkZXJzL2NvbnRyb2wtY2xhc3Muc2VydmljZSc7XG5pbXBvcnQgeyBDb250cm9sSWRTZXJ2aWNlIH0gZnJvbSAnLi4vY29tbW9uL3Byb3ZpZGVycy9jb250cm9sLWlkLnNlcnZpY2UnO1xuaW1wb3J0IHsgRm9jdXNTZXJ2aWNlIH0gZnJvbSAnLi4vY29tbW9uL3Byb3ZpZGVycy9mb2N1cy5zZXJ2aWNlJztcbmltcG9ydCB7IExheW91dFNlcnZpY2UgfSBmcm9tICcuLi9jb21tb24vcHJvdmlkZXJzL2xheW91dC5zZXJ2aWNlJztcbmltcG9ydCB7IE5nQ29udHJvbFNlcnZpY2UgfSBmcm9tICcuLi9jb21tb24vcHJvdmlkZXJzL25nLWNvbnRyb2wuc2VydmljZSc7XG5pbXBvcnQgeyBDbHJMYWJlbCB9IGZyb20gJy4uL2NvbW1vbi9sYWJlbCc7XG5cbmltcG9ydCB7IERhdGVGb3JtQ29udHJvbFNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9kYXRlLWZvcm0tY29udHJvbC5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGVJT1NlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9kYXRlLWlvLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0ZU5hdmlnYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvZGF0ZS1uYXZpZ2F0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0ZXBpY2tlckVuYWJsZWRTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvZGF0ZXBpY2tlci1lbmFibGVkLnNlcnZpY2UnO1xuaW1wb3J0IHsgTG9jYWxlSGVscGVyU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2xvY2FsZS1oZWxwZXIuc2VydmljZSc7XG5pbXBvcnQgeyBDbHJDb21tb25TdHJpbmdzIH0gZnJvbSAnLi4vLi4vdXRpbHMvaTE4bi9jb21tb24tc3RyaW5ncy5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgSVNfTkVXX0ZPUk1TX0xBWU9VVCB9IGZyb20gJy4uL2NvbW1vbi9wcm92aWRlcnMvbmV3LWZvcm1zLnNlcnZpY2UnO1xuXG4vKipcbiAqIFRoaXMgY29tcG9uZW50IGNvbnRhaW5zIHR3byB0ZW1wbGF0ZSBmb3IgdGhlIG9sZCBhbmQgbmV3IGZvcm1zIGxheW91dHMuXG4gKiBXaGVuIGl0IGlzIHRpbWUgdG8gcmVtb3ZlIHRoZSBvbGQgZm9ybXMgbGF5b3V0cyBzdXBwb3J0LCByZW1vdmUgdGhlIG5nLXRlbXBsYXRlc1xuICogYW5kIG5nLWNvbnRhaW5lciwgYW5kIGp1c3Qga2VlcCB0aGUgaW5uZXIgY29udGVudCBvZiB0aGUgI25ld0xheW91dCBhcyB0aGUgdGVtcGxhdGVcbiAqIGFuZCBtb3ZlIHRoZSBuZy1jb250ZW50IGZvciBjbHJEYXRlLlxuICovXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci1kYXRlLWNvbnRhaW5lcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLXRlbXBsYXRlICNvbGRMYXlvdXQ+XG4gICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImNsckRhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBjbGFzcz1cImRhdGVwaWNrZXItdHJpZ2dlclwiXG4gICAgICAgICAgICAoY2xpY2spPVwidG9nZ2xlRGF0ZXBpY2tlcigkZXZlbnQpXCJcbiAgICAgICAgICAgICpuZ0lmPVwiaXNFbmFibGVkXCI+XG4gICAgICAgICAgICA8Y2xyLWljb24gc2hhcGU9XCJjYWxlbmRhclwiIGNsYXNzPVwiZGF0ZXBpY2tlci10cmlnZ2VyLWljb25cIiBbYXR0ci50aXRsZV09XCJjb21tb25TdHJpbmdzLm9wZW5cIj48L2Nsci1pY29uPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPGNsci1kYXRlcGlja2VyLXZpZXctbWFuYWdlciAqY2xySWZPcGVuIGNsckZvY3VzVHJhcD48L2Nsci1kYXRlcGlja2VyLXZpZXctbWFuYWdlcj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIFxuICAgIDxuZy10ZW1wbGF0ZSAjbmV3TGF5b3V0PlxuICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibGFiZWxcIj48L25nLWNvbnRlbnQ+XG4gICAgICA8bGFiZWwgKm5nSWY9XCIhbGFiZWwgJiYgYWRkR3JpZCgpXCI+PC9sYWJlbD5cbiAgICAgIDxkaXYgY2xhc3M9XCJjbHItY29udHJvbC1jb250YWluZXJcIiBbbmdDbGFzc109XCJjb250cm9sQ2xhc3MoKVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2xyLWlucHV0LXdyYXBwZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2xyLWlucHV0LWdyb3VwXCIgW2NsYXNzLmNsci1mb2N1c109XCJmb2N1c1wiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImNsckRhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xyLWlucHV0LWdyb3VwLWljb24tYWN0aW9uXCIgKGNsaWNrKT1cInRvZ2dsZURhdGVwaWNrZXIoJGV2ZW50KVwiICpuZ0lmPVwiaXNFbmFibGVkXCIgW2F0dHIudGl0bGVdPVwiY29tbW9uU3RyaW5ncy5vcGVuXCIgW2Rpc2FibGVkXT1cImNvbnRyb2w/LmRpc2FibGVkXCI+XG4gICAgICAgICAgICAgIDxjbHItaWNvbiBzaGFwZT1cImNhbGVuZGFyXCI+PC9jbHItaWNvbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGNsci1kYXRlcGlja2VyLXZpZXctbWFuYWdlciAqY2xySWZPcGVuIGNsckZvY3VzVHJhcD48L2Nsci1kYXRlcGlja2VyLXZpZXctbWFuYWdlcj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8Y2xyLWljb24gY2xhc3M9XCJjbHItdmFsaWRhdGUtaWNvblwiIHNoYXBlPVwiZXhjbGFtYXRpb24tY2lyY2xlXCI+PC9jbHItaWNvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImNsci1jb250cm9sLWhlbHBlclwiICpuZ0lmPVwiIWludmFsaWRcIj48L25nLWNvbnRlbnQ+XG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImNsci1jb250cm9sLWVycm9yXCIgKm5nSWY9XCJpbnZhbGlkXCI+PC9uZy1jb250ZW50PlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICBcbiAgICA8bmctdGVtcGxhdGUgI2NsckRhdGU+XG4gICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbY2xyRGF0ZV1cIj48L25nLWNvbnRlbnQ+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICBcbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwibmV3Rm9ybXNMYXlvdXQ7IHRoZW4gbmV3TGF5b3V0IGVsc2Ugb2xkTGF5b3V0XCI+PC9uZy1jb250YWluZXI+XG4gICAgYCxcbiAgcHJvdmlkZXJzOiBbXG4gICAgQ29udHJvbElkU2VydmljZSxcbiAgICBJZk9wZW5TZXJ2aWNlLFxuICAgIExvY2FsZUhlbHBlclNlcnZpY2UsXG4gICAgSWZFcnJvclNlcnZpY2UsXG4gICAgQ29udHJvbENsYXNzU2VydmljZSxcbiAgICBGb2N1c1NlcnZpY2UsXG4gICAgTmdDb250cm9sU2VydmljZSxcbiAgICBEYXRlSU9TZXJ2aWNlLFxuICAgIERhdGVOYXZpZ2F0aW9uU2VydmljZSxcbiAgICBEYXRlcGlja2VyRW5hYmxlZFNlcnZpY2UsXG4gICAgRGF0ZUZvcm1Db250cm9sU2VydmljZSxcbiAgXSxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuZGF0ZS1jb250YWluZXJdJzogJyFuZXdGb3Jtc0xheW91dCcsXG4gICAgJ1tjbGFzcy5jbHItZm9ybS1jb250cm9sLWRpc2FibGVkXSc6ICdjb250cm9sPy5kaXNhYmxlZCcsXG4gICAgJ1tjbGFzcy5jbHItZm9ybS1jb250cm9sXSc6ICduZXdGb3Jtc0xheW91dCcsXG4gICAgJ1tjbGFzcy5jbHItcm93XSc6ICdhZGRHcmlkKCknLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBDbHJEYXRlQ29udGFpbmVyIGltcGxlbWVudHMgRHluYW1pY1dyYXBwZXIsIE9uRGVzdHJveSB7XG4gIF9keW5hbWljOiBib29sZWFuID0gZmFsc2U7XG4gIGludmFsaWQgPSBmYWxzZTtcbiAgZm9jdXMgPSBmYWxzZTtcbiAgY29udHJvbDogTmdDb250cm9sO1xuICBAQ29udGVudENoaWxkKENsckxhYmVsKSBsYWJlbDogQ2xyTGFiZWw7XG5cbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX2lmT3BlblNlcnZpY2U6IElmT3BlblNlcnZpY2UsXG4gICAgcHJpdmF0ZSBfZGF0ZU5hdmlnYXRpb25TZXJ2aWNlOiBEYXRlTmF2aWdhdGlvblNlcnZpY2UsXG4gICAgcHJpdmF0ZSBfZGF0ZXBpY2tlckVuYWJsZWRTZXJ2aWNlOiBEYXRlcGlja2VyRW5hYmxlZFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBkYXRlRm9ybUNvbnRyb2xTZXJ2aWNlOiBEYXRlRm9ybUNvbnRyb2xTZXJ2aWNlLFxuICAgIHB1YmxpYyBjb21tb25TdHJpbmdzOiBDbHJDb21tb25TdHJpbmdzLFxuICAgIHByaXZhdGUgaWZFcnJvclNlcnZpY2U6IElmRXJyb3JTZXJ2aWNlLFxuICAgIHByaXZhdGUgZm9jdXNTZXJ2aWNlOiBGb2N1c1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBjb250cm9sQ2xhc3NTZXJ2aWNlOiBDb250cm9sQ2xhc3NTZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgbGF5b3V0U2VydmljZTogTGF5b3V0U2VydmljZSxcbiAgICBAT3B0aW9uYWwoKVxuICAgIEBJbmplY3QoSVNfTkVXX0ZPUk1TX0xBWU9VVClcbiAgICBwdWJsaWMgbmV3Rm9ybXNMYXlvdXQ6IGJvb2xlYW4sXG4gICAgcHJpdmF0ZSBuZ0NvbnRyb2xTZXJ2aWNlOiBOZ0NvbnRyb2xTZXJ2aWNlXG4gICkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5faWZPcGVuU2VydmljZS5vcGVuQ2hhbmdlLnN1YnNjcmliZShvcGVuID0+IHtcbiAgICAgICAgaWYgKG9wZW4pIHtcbiAgICAgICAgICB0aGlzLmluaXRpYWxpemVDYWxlbmRhcigpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLmZvY3VzU2VydmljZS5mb2N1c0NoYW5nZS5zdWJzY3JpYmUoc3RhdGUgPT4ge1xuICAgICAgICB0aGlzLmZvY3VzID0gc3RhdGU7XG4gICAgICB9KVxuICAgICk7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLm5nQ29udHJvbFNlcnZpY2UuY29udHJvbENoYW5nZXMuc3Vic2NyaWJlKGNvbnRyb2wgPT4ge1xuICAgICAgICB0aGlzLmNvbnRyb2wgPSBjb250cm9sO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLmlmRXJyb3JTZXJ2aWNlLnN0YXR1c0NoYW5nZXMuc3Vic2NyaWJlKGludmFsaWQgPT4ge1xuICAgICAgICB0aGlzLmludmFsaWQgPSBpbnZhbGlkO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGNsYXNzZXMgdG8gYXBwbHkgdG8gdGhlIGNvbnRyb2xcbiAgICovXG4gIGNvbnRyb2xDbGFzcygpIHtcbiAgICByZXR1cm4gdGhpcy5jb250cm9sQ2xhc3NTZXJ2aWNlLmNvbnRyb2xDbGFzcyh0aGlzLmludmFsaWQsIHRoaXMuYWRkR3JpZCgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmVzIGlmIHRoZSBjb250cm9sIG5lZWRzIHRvIGFkZCBncmlkIGNsYXNzZXNcbiAgICovXG4gIGFkZEdyaWQoKSB7XG4gICAgaWYgKHRoaXMubGF5b3V0U2VydmljZSAmJiAhdGhpcy5sYXlvdXRTZXJ2aWNlLmlzVmVydGljYWwoKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGlmIHRoZSBEYXRlcGlja2VyIGlzIGVuYWJsZWQgb3Igbm90LiBJZiBkaXNhYmxlZCwgaGlkZXMgdGhlIGRhdGVwaWNrZXIgdHJpZ2dlci5cbiAgICovXG4gIGdldCBpc0VuYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGVwaWNrZXJFbmFibGVkU2VydmljZS5pc0VuYWJsZWQ7XG4gIH1cblxuICAvKipcbiAgICogUHJvY2Vzc2VzIHRoZSB1c2VyIGlucHV0IGFuZCBJbml0aWFsaXplcyB0aGUgQ2FsZW5kYXIgZXZlcnl0aW1lIHRoZSBkYXRlcGlja2VyIHBvcG92ZXIgaXMgb3Blbi5cbiAgICovXG4gIHByaXZhdGUgaW5pdGlhbGl6ZUNhbGVuZGFyKCk6IHZvaWQge1xuICAgIHRoaXMuX2RhdGVOYXZpZ2F0aW9uU2VydmljZS5pbml0aWFsaXplQ2FsZW5kYXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUb2dnbGVzIHRoZSBEYXRlcGlja2VyIFBvcG92ZXIuXG4gICAqL1xuICB0b2dnbGVEYXRlcGlja2VyKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgdGhpcy5faWZPcGVuU2VydmljZS50b2dnbGVXaXRoRXZlbnQoZXZlbnQpO1xuICAgIHRoaXMuZGF0ZUZvcm1Db250cm9sU2VydmljZS5tYXJrQXNUb3VjaGVkKCk7XG4gIH1cblxuICAvKipcbiAgICogVW5zdWJzY3JpYmUgZnJvbSBzdWJzY3JpcHRpb25zLlxuICAgKi9cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLm1hcChzdWIgPT4gc3ViLnVuc3Vic2NyaWJlKCkpO1xuICB9XG59XG4iXX0=