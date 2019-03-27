/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonHubService } from './providers/button-hub.service';
import { WizardNavigationService } from './providers/wizard-navigation.service';
/** @type {?} */
export var DEFAULT_BUTTON_TYPES = {
    cancel: 'cancel',
    previous: 'previous',
    next: 'next',
    finish: 'finish',
    danger: 'danger',
};
/** @type {?} */
export var CUSTOM_BUTTON_TYPES = {
    cancel: 'custom-cancel',
    previous: 'custom-previous',
    next: 'custom-next',
    finish: 'custom-finish',
    danger: 'custom-danger',
};
var ClrWizardButton = /** @class */ (function () {
    function ClrWizardButton(navService, buttonService) {
        this.navService = navService;
        this.buttonService = buttonService;
        this.type = '';
        this.disabled = false;
        this.hidden = false;
        // EventEmitter which is emitted when a button is clicked.
        this.wasClicked = new EventEmitter(false);
    }
    /**
     * @private
     * @param {?=} valueToCheck
     * @param {?=} typeToLookUp
     * @return {?}
     */
    ClrWizardButton.prototype.checkDefaultAndCustomType = /**
     * @private
     * @param {?=} valueToCheck
     * @param {?=} typeToLookUp
     * @return {?}
     */
    function (valueToCheck, typeToLookUp) {
        if (valueToCheck === void 0) { valueToCheck = ''; }
        if (DEFAULT_BUTTON_TYPES[typeToLookUp] === valueToCheck) {
            return true;
        }
        if (CUSTOM_BUTTON_TYPES[typeToLookUp] === valueToCheck) {
            return true;
        }
        return false;
    };
    Object.defineProperty(ClrWizardButton.prototype, "isCancel", {
        get: /**
         * @return {?}
         */
        function () {
            return this.checkDefaultAndCustomType(this.type, 'cancel');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardButton.prototype, "isNext", {
        get: /**
         * @return {?}
         */
        function () {
            return this.checkDefaultAndCustomType(this.type, 'next');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardButton.prototype, "isPrevious", {
        get: /**
         * @return {?}
         */
        function () {
            return this.checkDefaultAndCustomType(this.type, 'previous');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardButton.prototype, "isFinish", {
        get: /**
         * @return {?}
         */
        function () {
            return this.checkDefaultAndCustomType(this.type, 'finish');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardButton.prototype, "isDanger", {
        get: /**
         * @return {?}
         */
        function () {
            return this.checkDefaultAndCustomType(this.type, 'danger');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardButton.prototype, "isPrimaryAction", {
        get: /**
         * @return {?}
         */
        function () {
            return this.isNext || this.isDanger || this.isFinish;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardButton.prototype, "_disabledAttribute", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.isDisabled) {
                return '';
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardButton.prototype, "isDisabled", {
        get: /**
         * @return {?}
         */
        function () {
            // dealing with negatives here. cognitively easier to think of it like this...
            /** @type {?} */
            var disabled = true;
            /** @type {?} */
            var nav = this.navService;
            /** @type {?} */
            var page = this.navService.currentPage;
            // Ensure we don't change the response until buttons are ready to avoid chocolate
            if (!this.buttonService.buttonsReady) {
                return !disabled;
            }
            if (this.disabled || nav.wizardStopNavigation || !page) {
                return true;
            }
            if (this.isCancel) {
                return !disabled;
            }
            if (this.isPrevious && (nav.currentPageIsFirst || page.previousStepDisabled)) {
                return disabled;
            }
            if (this.isDanger && !page.readyToComplete) {
                return disabled;
            }
            if (this.isNext && (nav.currentPageIsLast || !page.readyToComplete)) {
                return disabled;
            }
            if (this.isFinish && (!nav.currentPageIsLast || !page.readyToComplete)) {
                return disabled;
            }
            return !disabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardButton.prototype, "isHidden", {
        get: /**
         * @return {?}
         */
        function () {
            // dealing with negatives here. cognitively easier to think of it like this...
            /** @type {?} */
            var hidden = true;
            /** @type {?} */
            var nav = this.navService;
            // Ensure we don't change the response until buttons are ready to avoid chocolate
            if (!this.buttonService.buttonsReady) {
                return !hidden;
            }
            if (this.hidden) {
                return true;
            }
            if (this.isCancel) {
                return !hidden;
            }
            if (this.isPrevious && nav.currentPageIsFirst) {
                return hidden;
            }
            if (this.isNext && nav.currentPageIsLast) {
                return hidden;
            }
            if (this.isFinish && !nav.currentPageIsLast) {
                return hidden;
            }
            return !hidden;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ClrWizardButton.prototype.click = /**
     * @return {?}
     */
    function () {
        if (this.isDisabled) {
            return;
        }
        this.wasClicked.emit(this.type);
        this.buttonService.buttonClicked(this.type);
    };
    ClrWizardButton.decorators = [
        { type: Component, args: [{
                    selector: 'clr-wizard-button',
                    template: "\n        <button\n            type=\"button\"\n            class=\"btn clr-wizard-btn\"\n            [class.btn-link]=\"isCancel\"\n            [class.clr-wizard-btn--tertiary]=\"isCancel\"\n            [class.btn-outline]=\"isPrevious\"\n            [class.clr-wizard-btn--secondary]=\"isPrevious\"\n            [class.btn-primary]=\"isPrimaryAction\"\n            [class.clr-wizard-btn--primary]=\"isPrimaryAction\"\n            [class.btn-success]=\"isFinish\"\n            [class.btn-danger]=\"isDanger\"\n            [class.disabled]=\"isDisabled\"\n            [attr.disabled]=\"_disabledAttribute\"\n            (click)=\"click()\">\n            <ng-content></ng-content>\n        </button>\n    ",
                    host: { class: 'clr-wizard-btn-wrapper', '[attr.aria-hidden]': 'isHidden' },
                    styles: ['[aria-hidden="true"] { display: none; }']
                }] }
    ];
    /** @nocollapse */
    ClrWizardButton.ctorParameters = function () { return [
        { type: WizardNavigationService },
        { type: ButtonHubService }
    ]; };
    ClrWizardButton.propDecorators = {
        type: [{ type: Input, args: ['type',] }],
        disabled: [{ type: Input, args: ['clrWizardButtonDisabled',] }],
        hidden: [{ type: Input, args: ['clrWizardButtonHidden',] }],
        wasClicked: [{ type: Output, args: ['clrWizardButtonClicked',] }]
    };
    return ClrWizardButton;
}());
export { ClrWizardButton };
if (false) {
    /** @type {?} */
    ClrWizardButton.prototype.type;
    /** @type {?} */
    ClrWizardButton.prototype.disabled;
    /** @type {?} */
    ClrWizardButton.prototype.hidden;
    /** @type {?} */
    ClrWizardButton.prototype.wasClicked;
    /** @type {?} */
    ClrWizardButton.prototype.navService;
    /** @type {?} */
    ClrWizardButton.prototype.buttonService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l6YXJkLWJ1dHRvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbIndpemFyZC93aXphcmQtYnV0dG9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQU1BLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFdkUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDbEUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sdUNBQXVDLENBQUM7O0FBRWhGLE1BQU0sS0FBTyxvQkFBb0IsR0FBUTtJQUN2QyxNQUFNLEVBQUUsUUFBUTtJQUNoQixRQUFRLEVBQUUsVUFBVTtJQUNwQixJQUFJLEVBQUUsTUFBTTtJQUNaLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLE1BQU0sRUFBRSxRQUFRO0NBQ2pCOztBQUVELE1BQU0sS0FBTyxtQkFBbUIsR0FBUTtJQUN0QyxNQUFNLEVBQUUsZUFBZTtJQUN2QixRQUFRLEVBQUUsaUJBQWlCO0lBQzNCLElBQUksRUFBRSxhQUFhO0lBQ25CLE1BQU0sRUFBRSxlQUFlO0lBQ3ZCLE1BQU0sRUFBRSxlQUFlO0NBQ3hCO0FBRUQ7SUFpQ0UseUJBQW1CLFVBQW1DLEVBQVMsYUFBK0I7UUFBM0UsZUFBVSxHQUFWLFVBQVUsQ0FBeUI7UUFBUyxrQkFBYSxHQUFiLGFBQWEsQ0FBa0I7UUFUeEUsU0FBSSxHQUFXLEVBQUUsQ0FBQztRQUVDLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFFNUIsV0FBTSxHQUFZLEtBQUssQ0FBQzs7UUFHN0IsZUFBVSxHQUF5QixJQUFJLFlBQVksQ0FBUyxLQUFLLENBQUMsQ0FBQztJQUVKLENBQUM7Ozs7Ozs7SUFFMUYsbURBQXlCOzs7Ozs7SUFBakMsVUFBa0MsWUFBeUIsRUFBRSxZQUFvQjtRQUEvQyw2QkFBQSxFQUFBLGlCQUF5QjtRQUN6RCxJQUFJLG9CQUFv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QUFFOzZCQUNsRSx5Q0FBeUM7aUJBQ25EOzs7O2dCQXhDUSx1QkFBdUI7Z0JBRHZCLGdCQUFnQjs7O3VCQTJDdEIsS0FBSyxTQUFDLE1BQU07MkJBRVosS0FBSyxTQUFDLHlCQUF5Qjt5QkFFL0IsS0FBSyxTQUFDLHVCQUF1Qjs2QkFHN0IsTUFBTSxTQUFDLHdCQUF3Qjs7SUE0SGxDLHNCQUFDO0NBQUEsQUEzSkQsSUEySkM7U0FwSVksZUFBZTs7O0lBQzFCLCtCQUF3Qzs7SUFFeEMsbUNBQW1FOztJQUVuRSxpQ0FBK0Q7O0lBRy9ELHFDQUFxRzs7SUFFekYscUNBQTBDOztJQUFFLHdDQUFzQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQnV0dG9uSHViU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2J1dHRvbi1odWIuc2VydmljZSc7XG5pbXBvcnQgeyBXaXphcmROYXZpZ2F0aW9uU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL3dpemFyZC1uYXZpZ2F0aW9uLnNlcnZpY2UnO1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9CVVRUT05fVFlQRVM6IGFueSA9IHtcbiAgY2FuY2VsOiAnY2FuY2VsJyxcbiAgcHJldmlvdXM6ICdwcmV2aW91cycsXG4gIG5leHQ6ICduZXh0JyxcbiAgZmluaXNoOiAnZmluaXNoJyxcbiAgZGFuZ2VyOiAnZGFuZ2VyJyxcbn07XG5cbmV4cG9ydCBjb25zdCBDVVNUT01fQlVUVE9OX1RZUEVTOiBhbnkgPSB7XG4gIGNhbmNlbDogJ2N1c3RvbS1jYW5jZWwnLFxuICBwcmV2aW91czogJ2N1c3RvbS1wcmV2aW91cycsXG4gIG5leHQ6ICdjdXN0b20tbmV4dCcsXG4gIGZpbmlzaDogJ2N1c3RvbS1maW5pc2gnLFxuICBkYW5nZXI6ICdjdXN0b20tZGFuZ2VyJyxcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci13aXphcmQtYnV0dG9uJyxcbiAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBjbGFzcz1cImJ0biBjbHItd2l6YXJkLWJ0blwiXG4gICAgICAgICAgICBbY2xhc3MuYnRuLWxpbmtdPVwiaXNDYW5jZWxcIlxuICAgICAgICAgICAgW2NsYXNzLmNsci13aXphcmQtYnRuLS10ZXJ0aWFyeV09XCJpc0NhbmNlbFwiXG4gICAgICAgICAgICBbY2xhc3MuYnRuLW91dGxpbmVdPVwiaXNQcmV2aW91c1wiXG4gICAgICAgICAgICBbY2xhc3MuY2xyLXdpemFyZC1idG4tLXNlY29uZGFyeV09XCJpc1ByZXZpb3VzXCJcbiAgICAgICAgICAgIFtjbGFzcy5idG4tcHJpbWFyeV09XCJpc1ByaW1hcnlBY3Rpb25cIlxuICAgICAgICAgICAgW2NsYXNzLmNsci13aXphcmQtYnRuLS1wcmltYXJ5XT1cImlzUHJpbWFyeUFjdGlvblwiXG4gICAgICAgICAgICBbY2xhc3MuYnRuLXN1Y2Nlc3NdPVwiaXNGaW5pc2hcIlxuICAgICAgICAgICAgW2NsYXNzLmJ0bi1kYW5nZXJdPVwiaXNEYW5nZXJcIlxuICAgICAgICAgICAgW2NsYXNzLmRpc2FibGVkXT1cImlzRGlzYWJsZWRcIlxuICAgICAgICAgICAgW2F0dHIuZGlzYWJsZWRdPVwiX2Rpc2FibGVkQXR0cmlidXRlXCJcbiAgICAgICAgICAgIChjbGljayk9XCJjbGljaygpXCI+XG4gICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgIGAsXG4gIGhvc3Q6IHsgY2xhc3M6ICdjbHItd2l6YXJkLWJ0bi13cmFwcGVyJywgJ1thdHRyLmFyaWEtaGlkZGVuXSc6ICdpc0hpZGRlbicgfSxcbiAgc3R5bGVzOiBbJ1thcmlhLWhpZGRlbj1cInRydWVcIl0geyBkaXNwbGF5OiBub25lOyB9J10sXG59KVxuZXhwb3J0IGNsYXNzIENscldpemFyZEJ1dHRvbiB7XG4gIEBJbnB1dCgndHlwZScpIHB1YmxpYyB0eXBlOiBzdHJpbmcgPSAnJztcblxuICBASW5wdXQoJ2NscldpemFyZEJ1dHRvbkRpc2FibGVkJykgcHVibGljIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQElucHV0KCdjbHJXaXphcmRCdXR0b25IaWRkZW4nKSBwdWJsaWMgaGlkZGVuOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLy8gRXZlbnRFbWl0dGVyIHdoaWNoIGlzIGVtaXR0ZWQgd2hlbiBhIGJ1dHRvbiBpcyBjbGlja2VkLlxuICBAT3V0cHV0KCdjbHJXaXphcmRCdXR0b25DbGlja2VkJykgd2FzQ2xpY2tlZDogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oZmFsc2UpO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBuYXZTZXJ2aWNlOiBXaXphcmROYXZpZ2F0aW9uU2VydmljZSwgcHVibGljIGJ1dHRvblNlcnZpY2U6IEJ1dHRvbkh1YlNlcnZpY2UpIHt9XG5cbiAgcHJpdmF0ZSBjaGVja0RlZmF1bHRBbmRDdXN0b21UeXBlKHZhbHVlVG9DaGVjazogc3RyaW5nID0gJycsIHR5cGVUb0xvb2tVcDogc3RyaW5nKSB7XG4gICAgaWYgKERFRkFVTFRfQlVUVE9OX1RZUEVTW3R5cGVUb0xvb2tVcF0gPT09IHZhbHVlVG9DaGVjaykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmIChDVVNUT01fQlVUVE9OX1RZUEVTW3R5cGVUb0xvb2tVcF0gPT09IHZhbHVlVG9DaGVjaykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgaXNDYW5jZWwoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY2hlY2tEZWZhdWx0QW5kQ3VzdG9tVHlwZSh0aGlzLnR5cGUsICdjYW5jZWwnKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgaXNOZXh0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmNoZWNrRGVmYXVsdEFuZEN1c3RvbVR5cGUodGhpcy50eXBlLCAnbmV4dCcpO1xuICB9XG5cbiAgcHVibGljIGdldCBpc1ByZXZpb3VzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmNoZWNrRGVmYXVsdEFuZEN1c3RvbVR5cGUodGhpcy50eXBlLCAncHJldmlvdXMnKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgaXNGaW5pc2goKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY2hlY2tEZWZhdWx0QW5kQ3VzdG9tVHlwZSh0aGlzLnR5cGUsICdmaW5pc2gnKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgaXNEYW5nZXIoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY2hlY2tEZWZhdWx0QW5kQ3VzdG9tVHlwZSh0aGlzLnR5cGUsICdkYW5nZXInKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgaXNQcmltYXJ5QWN0aW9uKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmlzTmV4dCB8fCB0aGlzLmlzRGFuZ2VyIHx8IHRoaXMuaXNGaW5pc2g7XG4gIH1cblxuICBwdWJsaWMgZ2V0IF9kaXNhYmxlZEF0dHJpYnV0ZSgpOiBzdHJpbmcgfCBudWxsIHtcbiAgICBpZiAodGhpcy5pc0Rpc2FibGVkKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHVibGljIGdldCBpc0Rpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIC8vIGRlYWxpbmcgd2l0aCBuZWdhdGl2ZXMgaGVyZS4gY29nbml0aXZlbHkgZWFzaWVyIHRvIHRoaW5rIG9mIGl0IGxpa2UgdGhpcy4uLlxuICAgIGNvbnN0IGRpc2FibGVkID0gdHJ1ZTtcbiAgICBjb25zdCBuYXYgPSB0aGlzLm5hdlNlcnZpY2U7XG4gICAgY29uc3QgcGFnZSA9IHRoaXMubmF2U2VydmljZS5jdXJyZW50UGFnZTtcblxuICAgIC8vIEVuc3VyZSB3ZSBkb24ndCBjaGFuZ2UgdGhlIHJlc3BvbnNlIHVudGlsIGJ1dHRvbnMgYXJlIHJlYWR5IHRvIGF2b2lkIGNob2NvbGF0ZVxuICAgIGlmICghdGhpcy5idXR0b25TZXJ2aWNlLmJ1dHRvbnNSZWFkeSkge1xuICAgICAgcmV0dXJuICFkaXNhYmxlZDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCBuYXYud2l6YXJkU3RvcE5hdmlnYXRpb24gfHwgIXBhZ2UpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzQ2FuY2VsKSB7XG4gICAgICByZXR1cm4gIWRpc2FibGVkO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzUHJldmlvdXMgJiYgKG5hdi5jdXJyZW50UGFnZUlzRmlyc3QgfHwgcGFnZS5wcmV2aW91c1N0ZXBEaXNhYmxlZCkpIHtcbiAgICAgIHJldHVybiBkaXNhYmxlZDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc0RhbmdlciAmJiAhcGFnZS5yZWFkeVRvQ29tcGxldGUpIHtcbiAgICAgIHJldHVybiBkaXNhYmxlZDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc05leHQgJiYgKG5hdi5jdXJyZW50UGFnZUlzTGFzdCB8fCAhcGFnZS5yZWFkeVRvQ29tcGxldGUpKSB7XG4gICAgICByZXR1cm4gZGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNGaW5pc2ggJiYgKCFuYXYuY3VycmVudFBhZ2VJc0xhc3QgfHwgIXBhZ2UucmVhZHlUb0NvbXBsZXRlKSkge1xuICAgICAgcmV0dXJuIGRpc2FibGVkO1xuICAgIH1cblxuICAgIHJldHVybiAhZGlzYWJsZWQ7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGlzSGlkZGVuKCk6IGJvb2xlYW4ge1xuICAgIC8vIGRlYWxpbmcgd2l0aCBuZWdhdGl2ZXMgaGVyZS4gY29nbml0aXZlbHkgZWFzaWVyIHRvIHRoaW5rIG9mIGl0IGxpa2UgdGhpcy4uLlxuICAgIGNvbnN0IGhpZGRlbiA9IHRydWU7XG4gICAgY29uc3QgbmF2ID0gdGhpcy5uYXZTZXJ2aWNlO1xuXG4gICAgLy8gRW5zdXJlIHdlIGRvbid0IGNoYW5nZSB0aGUgcmVzcG9uc2UgdW50aWwgYnV0dG9ucyBhcmUgcmVhZHkgdG8gYXZvaWQgY2hvY29sYXRlXG4gICAgaWYgKCF0aGlzLmJ1dHRvblNlcnZpY2UuYnV0dG9uc1JlYWR5KSB7XG4gICAgICByZXR1cm4gIWhpZGRlbjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5oaWRkZW4pIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzQ2FuY2VsKSB7XG4gICAgICByZXR1cm4gIWhpZGRlbjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc1ByZXZpb3VzICYmIG5hdi5jdXJyZW50UGFnZUlzRmlyc3QpIHtcbiAgICAgIHJldHVybiBoaWRkZW47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNOZXh0ICYmIG5hdi5jdXJyZW50UGFnZUlzTGFzdCkge1xuICAgICAgcmV0dXJuIGhpZGRlbjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc0ZpbmlzaCAmJiAhbmF2LmN1cnJlbnRQYWdlSXNMYXN0KSB7XG4gICAgICByZXR1cm4gaGlkZGVuO1xuICAgIH1cblxuICAgIHJldHVybiAhaGlkZGVuO1xuICB9XG5cbiAgY2xpY2soKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaXNEaXNhYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMud2FzQ2xpY2tlZC5lbWl0KHRoaXMudHlwZSk7XG4gICAgdGhpcy5idXR0b25TZXJ2aWNlLmJ1dHRvbkNsaWNrZWQodGhpcy50eXBlKTtcbiAgfVxufVxuIl19