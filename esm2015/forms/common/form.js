/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive } from '@angular/core';
import { LayoutService } from './providers/layout.service';
import { IS_NEW_FORMS_LAYOUT_TRUE_PROVIDER } from './providers/new-forms.service';
import { MarkControlService } from './providers/mark-control.service';
export class ClrForm {
    /**
     * @param {?} markControlService
     */
    constructor(markControlService) {
        this.markControlService = markControlService;
    }
    /**
     * @return {?}
     */
    markAsDirty() {
        this.markControlService.markAsDirty();
    }
}
ClrForm.decorators = [
    { type: Directive, args: [{
                selector: '[clrForm]',
                providers: [LayoutService, MarkControlService, IS_NEW_FORMS_LAYOUT_TRUE_PROVIDER],
                host: { '[class.clr-form]': 'true' },
            },] }
];
/** @nocollapse */
ClrForm.ctorParameters = () => [
    { type: MarkControlService }
];
if (false) {
    /** @type {?} */
    ClrForm.prototype.markControlService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImZvcm1zL2NvbW1vbi9mb3JtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQU1BLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzNELE9BQU8sRUFBRSxpQ0FBaUMsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2xGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBT3RFLE1BQU0sT0FBTyxPQUFPOzs7O0lBQ2xCLFlBQW9CLGtCQUFzQztRQUF0Qyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO0lBQUcsQ0FBQzs7OztJQUU5RCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3hDLENBQUM7OztZQVZGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsV0FBVztnQkFDckIsU0FBUyxFQUFFLENBQUMsYUFBYSxFQUFFLGtCQUFrQixFQUFFLGlDQUFpQyxDQUFDO2dCQUNqRixJQUFJLEVBQUUsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLEVBQUU7YUFDckM7Ozs7WUFOUSxrQkFBa0I7Ozs7SUFRYixxQ0FBOEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBEaXJlY3RpdmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IExheW91dFNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9sYXlvdXQuc2VydmljZSc7XG5pbXBvcnQgeyBJU19ORVdfRk9STVNfTEFZT1VUX1RSVUVfUFJPVklERVIgfSBmcm9tICcuL3Byb3ZpZGVycy9uZXctZm9ybXMuc2VydmljZSc7XG5pbXBvcnQgeyBNYXJrQ29udHJvbFNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9tYXJrLWNvbnRyb2wuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tjbHJGb3JtXScsXG4gIHByb3ZpZGVyczogW0xheW91dFNlcnZpY2UsIE1hcmtDb250cm9sU2VydmljZSwgSVNfTkVXX0ZPUk1TX0xBWU9VVF9UUlVFX1BST1ZJREVSXSxcbiAgaG9zdDogeyAnW2NsYXNzLmNsci1mb3JtXSc6ICd0cnVlJyB9LFxufSlcbmV4cG9ydCBjbGFzcyBDbHJGb3JtIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBtYXJrQ29udHJvbFNlcnZpY2U6IE1hcmtDb250cm9sU2VydmljZSkge31cblxuICBtYXJrQXNEaXJ0eSgpIHtcbiAgICB0aGlzLm1hcmtDb250cm9sU2VydmljZS5tYXJrQXNEaXJ0eSgpO1xuICB9XG59XG4iXX0=