/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive } from '@angular/core';
import { LayoutService } from './providers/layout.service';
import { MarkControlService } from './providers/mark-control.service';
export class ClrForm {
    /**
     * @param {?} layoutService
     * @param {?} markControlService
     */
    constructor(layoutService, markControlService) {
        this.layoutService = layoutService;
        this.markControlService = markControlService;
    }
    /**
     * @deprecated since 2.0
     * @return {?}
     */
    markAsDirty() {
        this.markAsTouched();
    }
    /**
     * @return {?}
     */
    markAsTouched() {
        this.markControlService.markAsTouched();
    }
}
ClrForm.decorators = [
    { type: Directive, args: [{
                selector: '[clrForm]',
                providers: [LayoutService, MarkControlService],
                host: {
                    '[class.clr-form]': 'true',
                    '[class.clr-form-horizontal]': 'layoutService.isHorizontal()',
                    '[class.clr-form-compact]': 'layoutService.isCompact()',
                },
            },] }
];
/** @nocollapse */
ClrForm.ctorParameters = () => [
    { type: LayoutService },
    { type: MarkControlService }
];
if (false) {
    /** @type {?} */
    ClrForm.prototype.layoutService;
    /**
     * @type {?}
     * @private
     */
    ClrForm.prototype.markControlService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImZvcm1zL2NvbW1vbi9mb3JtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQU1BLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzNELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBV3RFLE1BQU0sT0FBTyxPQUFPOzs7OztJQUNsQixZQUFtQixhQUE0QixFQUFVLGtCQUFzQztRQUE1RSxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUFVLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7SUFBRyxDQUFDOzs7OztJQUduRyxXQUFXO1FBQ1QsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7Ozs7SUFFRCxhQUFhO1FBQ1gsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzFDLENBQUM7OztZQW5CRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFdBQVc7Z0JBQ3JCLFNBQVMsRUFBRSxDQUFDLGFBQWEsRUFBRSxrQkFBa0IsQ0FBQztnQkFDOUMsSUFBSSxFQUFFO29CQUNKLGtCQUFrQixFQUFFLE1BQU07b0JBQzFCLDZCQUE2QixFQUFFLDhCQUE4QjtvQkFDN0QsMEJBQTBCLEVBQUUsMkJBQTJCO2lCQUN4RDthQUNGOzs7O1lBWFEsYUFBYTtZQUNiLGtCQUFrQjs7OztJQVliLGdDQUFtQzs7Ozs7SUFBRSxxQ0FBOEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBEaXJlY3RpdmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IExheW91dFNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9sYXlvdXQuc2VydmljZSc7XG5pbXBvcnQgeyBNYXJrQ29udHJvbFNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9tYXJrLWNvbnRyb2wuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tjbHJGb3JtXScsXG4gIHByb3ZpZGVyczogW0xheW91dFNlcnZpY2UsIE1hcmtDb250cm9sU2VydmljZV0sXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmNsci1mb3JtXSc6ICd0cnVlJyxcbiAgICAnW2NsYXNzLmNsci1mb3JtLWhvcml6b250YWxdJzogJ2xheW91dFNlcnZpY2UuaXNIb3Jpem9udGFsKCknLFxuICAgICdbY2xhc3MuY2xyLWZvcm0tY29tcGFjdF0nOiAnbGF5b3V0U2VydmljZS5pc0NvbXBhY3QoKScsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIENsckZvcm0ge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgbGF5b3V0U2VydmljZTogTGF5b3V0U2VydmljZSwgcHJpdmF0ZSBtYXJrQ29udHJvbFNlcnZpY2U6IE1hcmtDb250cm9sU2VydmljZSkge31cblxuICAvKiogQGRlcHJlY2F0ZWQgc2luY2UgMi4wICovXG4gIG1hcmtBc0RpcnR5KCkge1xuICAgIHRoaXMubWFya0FzVG91Y2hlZCgpO1xuICB9XG5cbiAgbWFya0FzVG91Y2hlZCgpIHtcbiAgICB0aGlzLm1hcmtDb250cm9sU2VydmljZS5tYXJrQXNUb3VjaGVkKCk7XG4gIH1cbn1cbiJdfQ==