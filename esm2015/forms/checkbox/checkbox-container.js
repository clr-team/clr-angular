/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';
import { ControlIdService } from '../common/providers/control-id.service';
export class ClrCheckboxContainer {
    constructor() {
        // Indicates whether the container is dynamically created by the checkbox input itself
        this._dynamic = false;
    }
}
ClrCheckboxContainer.decorators = [
    { type: Component, args: [{
                selector: 'clr-checkbox-container',
                template: `
        <!-- We want the checkbox input to be before the label, always -->
        <ng-content select="[clrCheckbox]"></ng-content>
        <ng-content></ng-content>
        <label *ngIf="_dynamic"></label>
    `,
                host: { '[class.checkbox]': 'true' },
                providers: [ControlIdService]
            }] }
];
if (false) {
    /** @type {?} */
    ClrCheckboxContainer.prototype._dynamic;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3gtY29udGFpbmVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZm9ybXMvY2hlY2tib3gvY2hlY2tib3gtY29udGFpbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQU1BLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHMUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFhMUUsTUFBTSxPQUFPLG9CQUFvQjtJQVhqQzs7UUFhRSxhQUFRLEdBQUcsS0FBSyxDQUFDO0lBQ25CLENBQUM7OztZQWRBLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsd0JBQXdCO2dCQUNsQyxRQUFRLEVBQUU7Ozs7O0tBS1A7Z0JBQ0gsSUFBSSxFQUFFLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxFQUFFO2dCQUNwQyxTQUFTLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQzthQUM5Qjs7OztJQUdDLHdDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBEeW5hbWljV3JhcHBlciB9IGZyb20gJy4uLy4uL3V0aWxzL2hvc3Qtd3JhcHBpbmcvZHluYW1pYy13cmFwcGVyJztcbmltcG9ydCB7IENvbnRyb2xJZFNlcnZpY2UgfSBmcm9tICcuLi9jb21tb24vcHJvdmlkZXJzL2NvbnRyb2wtaWQuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci1jaGVja2JveC1jb250YWluZXInLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgICA8IS0tIFdlIHdhbnQgdGhlIGNoZWNrYm94IGlucHV0IHRvIGJlIGJlZm9yZSB0aGUgbGFiZWwsIGFsd2F5cyAtLT5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW2NsckNoZWNrYm94XVwiPjwvbmctY29udGVudD5cbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICA8bGFiZWwgKm5nSWY9XCJfZHluYW1pY1wiPjwvbGFiZWw+XG4gICAgYCxcbiAgaG9zdDogeyAnW2NsYXNzLmNoZWNrYm94XSc6ICd0cnVlJyB9LFxuICBwcm92aWRlcnM6IFtDb250cm9sSWRTZXJ2aWNlXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyQ2hlY2tib3hDb250YWluZXIgaW1wbGVtZW50cyBEeW5hbWljV3JhcHBlciB7XG4gIC8vIEluZGljYXRlcyB3aGV0aGVyIHRoZSBjb250YWluZXIgaXMgZHluYW1pY2FsbHkgY3JlYXRlZCBieSB0aGUgY2hlY2tib3ggaW5wdXQgaXRzZWxmXG4gIF9keW5hbWljID0gZmFsc2U7XG59XG4iXX0=