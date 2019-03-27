/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ContentChild, Inject, InjectionToken, Input, Optional } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IfErrorService } from '../common/if-error/if-error.service';
import { ClrLabel } from '../common/label';
import { ControlClassService } from '../common/providers/control-class.service';
import { ControlIdService } from '../common/providers/control-id.service';
import { FocusService } from '../common/providers/focus.service';
import { LayoutService } from '../common/providers/layout.service';
import { NgControlService } from '../common/providers/ng-control.service';
import { ClrCommonStrings } from '../../utils/i18n/common-strings.interface';
/** @type {?} */
export var TOGGLE_SERVICE = new InjectionToken(undefined);
/**
 * @return {?}
 */
export function ToggleServiceFactory() {
    return new BehaviorSubject(false);
}
/** @type {?} */
export var TOGGLE_SERVICE_PROVIDER = { provide: TOGGLE_SERVICE, useFactory: ToggleServiceFactory };
var ClrPasswordContainer = /** @class */ (function () {
    function ClrPasswordContainer(ifErrorService, layoutService, controlClassService, focusService, ngControlService, toggleService, commonStrings) {
        var _this = this;
        this.ifErrorService = ifErrorService;
        this.layoutService = layoutService;
        this.controlClassService = controlClassService;
        this.focusService = focusService;
        this.ngControlService = ngControlService;
        this.toggleService = toggleService;
        this.commonStrings = commonStrings;
        this.subscriptions = [];
        this.invalid = false;
        this._dynamic = false;
        this.show = false;
        this.focus = false;
        this._toggle = true;
        this.subscriptions.push(this.ifErrorService.statusChanges.subscribe((/**
         * @param {?} invalid
         * @return {?}
         */
        function (invalid) {
            _this.invalid = invalid;
        })));
        this.subscriptions.push(this.focusService.focusChange.subscribe((/**
         * @param {?} state
         * @return {?}
         */
        function (state) {
            _this.focus = state;
        })));
        this.subscriptions.push(this.ngControlService.controlChanges.subscribe((/**
         * @param {?} control
         * @return {?}
         */
        function (control) {
            _this.control = control;
        })));
    }
    Object.defineProperty(ClrPasswordContainer.prototype, "clrToggle", {
        get: /**
         * @return {?}
         */
        function () {
            return this._toggle;
        },
        set: /**
         * @param {?} state
         * @return {?}
         */
        function (state) {
            this._toggle = state;
            if (!state) {
                this.show = false;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ClrPasswordContainer.prototype.toggle = /**
     * @return {?}
     */
    function () {
        this.show = !this.show;
        this.toggleService.next(this.show);
    };
    /**
     * @return {?}
     */
    ClrPasswordContainer.prototype.controlClass = /**
     * @return {?}
     */
    function () {
        return this.controlClassService.controlClass(this.invalid, this.addGrid());
    };
    /**
     * @return {?}
     */
    ClrPasswordContainer.prototype.addGrid = /**
     * @return {?}
     */
    function () {
        if (this.layoutService && !this.layoutService.isVertical()) {
            return true;
        }
        return false;
    };
    /**
     * @return {?}
     */
    ClrPasswordContainer.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.subscriptions) {
            this.subscriptions.map((/**
             * @param {?} sub
             * @return {?}
             */
            function (sub) { return sub.unsubscribe(); }));
        }
    };
    ClrPasswordContainer.decorators = [
        { type: Component, args: [{
                    selector: 'clr-password-container',
                    template: "\n    <ng-content select=\"label\"></ng-content>\n    <label *ngIf=\"!label && addGrid()\"></label>\n    <div class=\"clr-control-container\" [ngClass]=\"controlClass()\">\n      <div class=\"clr-input-wrapper\">\n        <div class=\"clr-input-group\" [class.clr-focus]=\"focus\">\n          <ng-content select=\"[clrPassword]\"></ng-content>\n          <button\n            *ngIf=\"clrToggle\"\n            (click)=\"toggle()\"\n            [disabled]=\"control?.disabled\"\n            class=\"clr-input-group-icon-action\"\n            type=\"button\">\n            <clr-icon\n            [attr.shape]=\"show ? 'eye-hide' : 'eye'\"\n            [attr.title]=\"show ? commonStrings.hide : commonStrings.show\"></clr-icon>\n          </button>\n        </div>\n        <clr-icon *ngIf=\"invalid\" class=\"clr-validate-icon\" shape=\"exclamation-circle\" aria-hidden=\"true\"></clr-icon>\n      </div>\n      <ng-content select=\"clr-control-helper\" *ngIf=\"!invalid\"></ng-content>\n      <ng-content select=\"clr-control-error\" *ngIf=\"invalid\"></ng-content>\n    </div>\n    ",
                    host: {
                        '[class.clr-form-control]': 'true',
                        '[class.clr-form-control-disabled]': 'control?.disabled',
                        '[class.clr-row]': 'addGrid()',
                    },
                    providers: [
                        IfErrorService,
                        NgControlService,
                        ControlIdService,
                        ControlClassService,
                        FocusService,
                        TOGGLE_SERVICE_PROVIDER,
                    ]
                }] }
    ];
    /** @nocollapse */
    ClrPasswordContainer.ctorParameters = function () { return [
        { type: IfErrorService },
        { type: LayoutService, decorators: [{ type: Optional }] },
        { type: ControlClassService },
        { type: FocusService },
        { type: NgControlService },
        { type: BehaviorSubject, decorators: [{ type: Inject, args: [TOGGLE_SERVICE,] }] },
        { type: ClrCommonStrings }
    ]; };
    ClrPasswordContainer.propDecorators = {
        clrToggle: [{ type: Input, args: ['clrToggle',] }],
        label: [{ type: ContentChild, args: [ClrLabel,] }]
    };
    return ClrPasswordContainer;
}());
export { ClrPasswordContainer };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ClrPasswordContainer.prototype.subscriptions;
    /** @type {?} */
    ClrPasswordContainer.prototype.invalid;
    /** @type {?} */
    ClrPasswordContainer.prototype.control;
    /** @type {?} */
    ClrPasswordContainer.prototype._dynamic;
    /** @type {?} */
    ClrPasswordContainer.prototype.show;
    /** @type {?} */
    ClrPasswordContainer.prototype.focus;
    /**
     * @type {?}
     * @private
     */
    ClrPasswordContainer.prototype._toggle;
    /** @type {?} */
    ClrPasswordContainer.prototype.label;
    /**
     * @type {?}
     * @private
     */
    ClrPasswordContainer.prototype.ifErrorService;
    /**
     * @type {?}
     * @private
     */
    ClrPasswordContainer.prototype.layoutService;
    /**
     * @type {?}
     * @private
     */
    ClrPasswordContainer.prototype.controlClassService;
    /** @type {?} */
    ClrPasswordContainer.prototype.focusService;
    /**
     * @type {?}
     * @private
     */
    ClrPasswordContainer.prototype.ngControlService;
    /**
     * @type {?}
     * @private
     */
    ClrPasswordContainer.prototype.toggleService;
    /** @type {?} */
    ClrPasswordContainer.prototype.commonStrings;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFzc3dvcmQtY29udGFpbmVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZm9ybXMvcGFzc3dvcmQvcGFzc3dvcmQtY29udGFpbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQU1BLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsS0FBSyxFQUFhLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU1RyxPQUFPLEVBQUUsZUFBZSxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUdyRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDckUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNqRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDbkUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDMUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7O0FBRTdFLE1BQU0sS0FBTyxjQUFjLEdBQUcsSUFBSSxjQUFjLENBQTJCLFNBQVMsQ0FBQzs7OztBQUNyRixNQUFNLFVBQVUsb0JBQW9CO0lBQ2xDLE9BQU8sSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7QUFDN0MsQ0FBQzs7QUFDRCxNQUFNLEtBQU8sdUJBQXVCLEdBQUcsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLFVBQVUsRUFBRSxvQkFBb0IsRUFBRTtBQUVwRztJQTZERSw4QkFDVSxjQUE4QixFQUNsQixhQUE0QixFQUN4QyxtQkFBd0Ms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bUJBQW1CO3dCQUN4RCxpQkFBaUIsRUFBRSxXQUFXO3FCQUMvQjtvQkFDRCxTQUFTLEVBQUU7d0JBQ1QsY0FBYzt3QkFDZCxnQkFBZ0I7d0JBQ2hCLGdCQUFnQjt3QkFDaEIsbUJBQW1CO3dCQUNuQixZQUFZO3dCQUNaLHVCQUF1QjtxQkFDeEI7aUJBQ0Y7Ozs7Z0JBdERRLGNBQWM7Z0JBS2QsYUFBYSx1QkF5RWpCLFFBQVE7Z0JBNUVKLG1CQUFtQjtnQkFFbkIsWUFBWTtnQkFFWixnQkFBZ0I7Z0JBVGhCLGVBQWUsdUJBcUZuQixNQUFNLFNBQUMsY0FBYztnQkEzRWpCLGdCQUFnQjs7OzRCQXlEdEIsS0FBSyxTQUFDLFdBQVc7d0JBVWpCLFlBQVksU0FBQyxRQUFROztJQWlEeEIsMkJBQUM7Q0FBQSxBQTVHRCxJQTRHQztTQXBFWSxvQkFBb0I7Ozs7OztJQUMvQiw2Q0FBMkM7O0lBQzNDLHVDQUFnQjs7SUFDaEIsdUNBQW1COztJQUNuQix3Q0FBaUI7O0lBQ2pCLG9DQUFhOztJQUNiLHFDQUFjOzs7OztJQUNkLHVDQUF1Qjs7SUFZdkIscUNBQXdDOzs7OztJQUd0Qyw4Q0FBc0M7Ozs7O0lBQ3RDLDZDQUFnRDs7Ozs7SUFDaEQsbURBQWdEOztJQUNoRCw0Q0FBaUM7Ozs7O0lBQ2pDLGdEQUEwQzs7Ozs7SUFDMUMsNkNBQXVFOztJQUN2RSw2Q0FBc0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQsIENvbnRlbnRDaGlsZCwgSW5qZWN0LCBJbmplY3Rpb25Ub2tlbiwgSW5wdXQsIE9uRGVzdHJveSwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBEeW5hbWljV3JhcHBlciB9IGZyb20gJy4uLy4uL3V0aWxzL2hvc3Qtd3JhcHBpbmcvZHluYW1pYy13cmFwcGVyJztcblxuaW1wb3J0IHsgSWZFcnJvclNlcnZpY2UgfSBmcm9tICcuLi9jb21tb24vaWYtZXJyb3IvaWYtZXJyb3Iuc2VydmljZSc7XG5pbXBvcnQgeyBDbHJMYWJlbCB9IGZyb20gJy4uL2NvbW1vbi9sYWJlbCc7XG5pbXBvcnQgeyBDb250cm9sQ2xhc3NTZXJ2aWNlIH0gZnJvbSAnLi4vY29tbW9uL3Byb3ZpZGVycy9jb250cm9sLWNsYXNzLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29udHJvbElkU2VydmljZSB9IGZyb20gJy4uL2NvbW1vbi9wcm92aWRlcnMvY29udHJvbC1pZC5zZXJ2aWNlJztcbmltcG9ydCB7IEZvY3VzU2VydmljZSB9IGZyb20gJy4uL2NvbW1vbi9wcm92aWRlcnMvZm9jdXMuc2VydmljZSc7XG5pbXBvcnQgeyBMYXlvdXRTZXJ2aWNlIH0gZnJvbSAnLi4vY29tbW9uL3Byb3ZpZGVycy9sYXlvdXQuc2VydmljZSc7XG5pbXBvcnQgeyBOZ0NvbnRyb2xTZXJ2aWNlIH0gZnJvbSAnLi4vY29tbW9uL3Byb3ZpZGVycy9uZy1jb250cm9sLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2xyQ29tbW9uU3RyaW5ncyB9IGZyb20gJy4uLy4uL3V0aWxzL2kxOG4vY29tbW9uLXN0cmluZ3MuaW50ZXJmYWNlJztcblxuZXhwb3J0IGNvbnN0IFRPR0dMRV9TRVJWSUNFID0gbmV3IEluamVjdGlvblRva2VuPEJlaGF2aW9yU3ViamVjdDxib29sZWFuPj4odW5kZWZpbmVkKTtcbmV4cG9ydCBmdW5jdGlvbiBUb2dnbGVTZXJ2aWNlRmFjdG9yeSgpIHtcbiAgcmV0dXJuIG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xufVxuZXhwb3J0IGNvbnN0IFRPR0dMRV9TRVJWSUNFX1BST1ZJREVSID0geyBwcm92aWRlOiBUT0dHTEVfU0VSVklDRSwgdXNlRmFjdG9yeTogVG9nZ2xlU2VydmljZUZhY3RvcnkgfTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLXBhc3N3b3JkLWNvbnRhaW5lcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibGFiZWxcIj48L25nLWNvbnRlbnQ+XG4gICAgPGxhYmVsICpuZ0lmPVwiIWxhYmVsICYmIGFkZEdyaWQoKVwiPjwvbGFiZWw+XG4gICAgPGRpdiBjbGFzcz1cImNsci1jb250cm9sLWNvbnRhaW5lclwiIFtuZ0NsYXNzXT1cImNvbnRyb2xDbGFzcygpXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiY2xyLWlucHV0LXdyYXBwZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNsci1pbnB1dC1ncm91cFwiIFtjbGFzcy5jbHItZm9jdXNdPVwiZm9jdXNcIj5cbiAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbY2xyUGFzc3dvcmRdXCI+PC9uZy1jb250ZW50PlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICpuZ0lmPVwiY2xyVG9nZ2xlXCJcbiAgICAgICAgICAgIChjbGljayk9XCJ0b2dnbGUoKVwiXG4gICAgICAgICAgICBbZGlzYWJsZWRdPVwiY29udHJvbD8uZGlzYWJsZWRcIlxuICAgICAgICAgICAgY2xhc3M9XCJjbHItaW5wdXQtZ3JvdXAtaWNvbi1hY3Rpb25cIlxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiPlxuICAgICAgICAgICAgPGNsci1pY29uXG4gICAgICAgICAgICBbYXR0ci5zaGFwZV09XCJzaG93ID8gJ2V5ZS1oaWRlJyA6ICdleWUnXCJcbiAgICAgICAgICAgIFthdHRyLnRpdGxlXT1cInNob3cgPyBjb21tb25TdHJpbmdzLmhpZGUgOiBjb21tb25TdHJpbmdzLnNob3dcIj48L2Nsci1pY29uPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGNsci1pY29uICpuZ0lmPVwiaW52YWxpZFwiIGNsYXNzPVwiY2xyLXZhbGlkYXRlLWljb25cIiBzaGFwZT1cImV4Y2xhbWF0aW9uLWNpcmNsZVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvY2xyLWljb24+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImNsci1jb250cm9sLWhlbHBlclwiICpuZ0lmPVwiIWludmFsaWRcIj48L25nLWNvbnRlbnQ+XG4gICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJjbHItY29udHJvbC1lcnJvclwiICpuZ0lmPVwiaW52YWxpZFwiPjwvbmctY29udGVudD5cbiAgICA8L2Rpdj5cbiAgICBgLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5jbHItZm9ybS1jb250cm9sXSc6ICd0cnVlJyxcbiAgICAnW2NsYXNzLmNsci1mb3JtLWNvbnRyb2wtZGlzYWJsZWRdJzogJ2NvbnRyb2w/LmRpc2FibGVkJyxcbiAgICAnW2NsYXNzLmNsci1yb3ddJzogJ2FkZEdyaWQoKScsXG4gIH0sXG4gIHByb3ZpZGVyczogW1xuICAgIElmRXJyb3JTZXJ2aWNlLFxuICAgIE5nQ29udHJvbFNlcnZpY2UsXG4gICAgQ29udHJvbElkU2VydmljZSxcbiAgICBDb250cm9sQ2xhc3NTZXJ2aWNlLFxuICAgIEZvY3VzU2VydmljZSxcbiAgICBUT0dHTEVfU0VSVklDRV9QUk9WSURFUixcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyUGFzc3dvcmRDb250YWluZXIgaW1wbGVtZW50cyBEeW5hbWljV3JhcHBlciwgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuICBpbnZhbGlkID0gZmFsc2U7XG4gIGNvbnRyb2w6IE5nQ29udHJvbDtcbiAgX2R5bmFtaWMgPSBmYWxzZTtcbiAgc2hvdyA9IGZhbHNlO1xuICBmb2N1cyA9IGZhbHNlO1xuICBwcml2YXRlIF90b2dnbGUgPSB0cnVlO1xuXG4gIEBJbnB1dCgnY2xyVG9nZ2xlJylcbiAgc2V0IGNsclRvZ2dsZShzdGF0ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX3RvZ2dsZSA9IHN0YXRlO1xuICAgIGlmICghc3RhdGUpIHtcbiAgICAgIHRoaXMuc2hvdyA9IGZhbHNlO1xuICAgIH1cbiAgfVxuICBnZXQgY2xyVG9nZ2xlKCkge1xuICAgIHJldHVybiB0aGlzLl90b2dnbGU7XG4gIH1cbiAgQENvbnRlbnRDaGlsZChDbHJMYWJlbCkgbGFiZWw6IENsckxhYmVsO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgaWZFcnJvclNlcnZpY2U6IElmRXJyb3JTZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgbGF5b3V0U2VydmljZTogTGF5b3V0U2VydmljZSxcbiAgICBwcml2YXRlIGNvbnRyb2xDbGFzc1NlcnZpY2U6IENvbnRyb2xDbGFzc1NlcnZpY2UsXG4gICAgcHVibGljIGZvY3VzU2VydmljZTogRm9jdXNTZXJ2aWNlLFxuICAgIHByaXZhdGUgbmdDb250cm9sU2VydmljZTogTmdDb250cm9sU2VydmljZSxcbiAgICBASW5qZWN0KFRPR0dMRV9TRVJWSUNFKSBwcml2YXRlIHRvZ2dsZVNlcnZpY2U6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPixcbiAgICBwdWJsaWMgY29tbW9uU3RyaW5nczogQ2xyQ29tbW9uU3RyaW5nc1xuICApIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMuaWZFcnJvclNlcnZpY2Uuc3RhdHVzQ2hhbmdlcy5zdWJzY3JpYmUoaW52YWxpZCA9PiB7XG4gICAgICAgIHRoaXMuaW52YWxpZCA9IGludmFsaWQ7XG4gICAgICB9KVxuICAgICk7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLmZvY3VzU2VydmljZS5mb2N1c0NoYW5nZS5zdWJzY3JpYmUoc3RhdGUgPT4ge1xuICAgICAgICB0aGlzLmZvY3VzID0gc3RhdGU7XG4gICAgICB9KVxuICAgICk7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLm5nQ29udHJvbFNlcnZpY2UuY29udHJvbENoYW5nZXMuc3Vic2NyaWJlKGNvbnRyb2wgPT4ge1xuICAgICAgICB0aGlzLmNvbnRyb2wgPSBjb250cm9sO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgdG9nZ2xlKCkge1xuICAgIHRoaXMuc2hvdyA9ICF0aGlzLnNob3c7XG4gICAgdGhpcy50b2dnbGVTZXJ2aWNlLm5leHQodGhpcy5zaG93KTtcbiAgfVxuXG4gIGNvbnRyb2xDbGFzcygpIHtcbiAgICByZXR1cm4gdGhpcy5jb250cm9sQ2xhc3NTZXJ2aWNlLmNvbnRyb2xDbGFzcyh0aGlzLmludmFsaWQsIHRoaXMuYWRkR3JpZCgpKTtcbiAgfVxuXG4gIGFkZEdyaWQoKSB7XG4gICAgaWYgKHRoaXMubGF5b3V0U2VydmljZSAmJiAhdGhpcy5sYXlvdXRTZXJ2aWNlLmlzVmVydGljYWwoKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbnMpIHtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5tYXAoc3ViID0+IHN1Yi51bnN1YnNjcmliZSgpKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==