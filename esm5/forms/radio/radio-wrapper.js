/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ContentChild } from '@angular/core';
import { ControlIdService } from '../common/providers/control-id.service';
import { ClrLabel } from '../common/label';
var ClrRadioWrapper = /** @class */ (function () {
    function ClrRadioWrapper() {
        // We need both _dynamic for HostWrapper and ContentChild(ClrLabel) in cases where
        // the user puts a radio inside a wrapper without a label, host wrapping doesn't apply
        // but we'd still need to insert a label
        this._dynamic = false;
    }
    ClrRadioWrapper.decorators = [
        { type: Component, args: [{
                    selector: 'clr-radio-wrapper',
                    template: "\n    <ng-content select=\"[clrRadio]\"></ng-content>\n    <ng-content select=\"label\"></ng-content>\n    <label *ngIf=\"!label\"></label>\n  ",
                    host: {
                        '[class.clr-radio-wrapper]': 'true',
                    },
                    providers: [ControlIdService]
                }] }
    ];
    ClrRadioWrapper.propDecorators = {
        label: [{ type: ContentChild, args: [ClrLabel,] }]
    };
    return ClrRadioWrapper;
}());
export { ClrRadioWrapper };
if (false) {
    /** @type {?} */
    ClrRadioWrapper.prototype._dynamic;
    /** @type {?} */
    ClrRadioWrapper.prototype.label;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW8td3JhcHBlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImZvcm1zL3JhZGlvL3JhZGlvLXdyYXBwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBTUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHeEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDMUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRTNDO0lBQUE7Ozs7UUFnQkUsYUFBUSxHQUFHLEtBQUssQ0FBQztJQUVuQixDQUFDOztnQkFsQkEsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxtQkFBbUI7b0JBQzdCLFFBQVEsRUFBRSxpSkFJVDtvQkFDRCxJQUFJLEVBQUU7d0JBQ0osMkJBQTJCLEVBQUUsTUFBTTtxQkFDcEM7b0JBQ0QsU0FBUyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7aUJBQzlCOzs7d0JBTUUsWUFBWSxTQUFDLFFBQVE7O0lBQ3hCLHNCQUFDO0NBQUEsQUFsQkQsSUFrQkM7U0FOWSxlQUFlOzs7SUFJMUIsbUNBQWlCOztJQUNqQixnQ0FBd0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQsIENvbnRlbnRDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBEeW5hbWljV3JhcHBlciB9IGZyb20gJy4uLy4uL3V0aWxzL2hvc3Qtd3JhcHBpbmcvZHluYW1pYy13cmFwcGVyJztcbmltcG9ydCB7IENvbnRyb2xJZFNlcnZpY2UgfSBmcm9tICcuLi9jb21tb24vcHJvdmlkZXJzL2NvbnRyb2wtaWQuc2VydmljZSc7XG5pbXBvcnQgeyBDbHJMYWJlbCB9IGZyb20gJy4uL2NvbW1vbi9sYWJlbCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci1yYWRpby13cmFwcGVyJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbY2xyUmFkaW9dXCI+PC9uZy1jb250ZW50PlxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImxhYmVsXCI+PC9uZy1jb250ZW50PlxuICAgIDxsYWJlbCAqbmdJZj1cIiFsYWJlbFwiPjwvbGFiZWw+XG4gIGAsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmNsci1yYWRpby13cmFwcGVyXSc6ICd0cnVlJyxcbiAgfSxcbiAgcHJvdmlkZXJzOiBbQ29udHJvbElkU2VydmljZV0sXG59KVxuZXhwb3J0IGNsYXNzIENsclJhZGlvV3JhcHBlciBpbXBsZW1lbnRzIER5bmFtaWNXcmFwcGVyIHtcbiAgLy8gV2UgbmVlZCBib3RoIF9keW5hbWljIGZvciBIb3N0V3JhcHBlciBhbmQgQ29udGVudENoaWxkKENsckxhYmVsKSBpbiBjYXNlcyB3aGVyZVxuICAvLyB0aGUgdXNlciBwdXRzIGEgcmFkaW8gaW5zaWRlIGEgd3JhcHBlciB3aXRob3V0IGEgbGFiZWwsIGhvc3Qgd3JhcHBpbmcgZG9lc24ndCBhcHBseVxuICAvLyBidXQgd2UnZCBzdGlsbCBuZWVkIHRvIGluc2VydCBhIGxhYmVsXG4gIF9keW5hbWljID0gZmFsc2U7XG4gIEBDb250ZW50Q2hpbGQoQ2xyTGFiZWwpIGxhYmVsOiBDbHJMYWJlbDtcbn1cbiJdfQ==