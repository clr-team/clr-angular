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
var ClrCheckboxContainer = /** @class */ (function () {
    function ClrCheckboxContainer() {
        // Indicates whether the container is dynamically created by the checkbox input itself
        this._dynamic = false;
    }
    ClrCheckboxContainer.decorators = [
        { type: Component, args: [{
                    selector: 'clr-checkbox-container',
                    template: "\n        <!-- We want the checkbox input to be before the label, always -->\n        <ng-content select=\"[clrCheckbox]\"></ng-content>\n        <ng-content></ng-content>\n        <label *ngIf=\"_dynamic\"></label>\n    ",
                    host: { '[class.checkbox]': 'true' },
                    providers: [ControlIdService]
                }] }
    ];
    return ClrCheckboxContainer;
}());
export { ClrCheckboxContainer };
if (false) {
    /** @type {?} */
    ClrCheckboxContainer.prototype._dynamic;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3gtY29udGFpbmVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZm9ybXMvY2hlY2tib3gvY2hlY2tib3gtY29udGFpbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQU1BLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHMUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFFMUU7SUFBQTs7UUFhRSxhQUFRLEdBQUcsS0FBSyxDQUFDO0lBQ25CLENBQUM7O2dCQWRBLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsd0JBQXdCO29CQUNsQyxRQUFRLEVBQUUsK05BS1A7b0JBQ0gsSUFBSSxFQUFFLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxFQUFFO29CQUNwQyxTQUFTLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQztpQkFDOUI7O0lBSUQsMkJBQUM7Q0FBQSxBQWRELElBY0M7U0FIWSxvQkFBb0I7OztJQUUvQix3Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRHluYW1pY1dyYXBwZXIgfSBmcm9tICcuLi8uLi91dGlscy9ob3N0LXdyYXBwaW5nL2R5bmFtaWMtd3JhcHBlcic7XG5pbXBvcnQgeyBDb250cm9sSWRTZXJ2aWNlIH0gZnJvbSAnLi4vY29tbW9uL3Byb3ZpZGVycy9jb250cm9sLWlkLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItY2hlY2tib3gtY29udGFpbmVyJyxcbiAgdGVtcGxhdGU6IGBcbiAgICAgICAgPCEtLSBXZSB3YW50IHRoZSBjaGVja2JveCBpbnB1dCB0byBiZSBiZWZvcmUgdGhlIGxhYmVsLCBhbHdheXMgLS0+XG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIltjbHJDaGVja2JveF1cIj48L25nLWNvbnRlbnQ+XG4gICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgPGxhYmVsICpuZ0lmPVwiX2R5bmFtaWNcIj48L2xhYmVsPlxuICAgIGAsXG4gIGhvc3Q6IHsgJ1tjbGFzcy5jaGVja2JveF0nOiAndHJ1ZScgfSxcbiAgcHJvdmlkZXJzOiBbQ29udHJvbElkU2VydmljZV0sXG59KVxuZXhwb3J0IGNsYXNzIENsckNoZWNrYm94Q29udGFpbmVyIGltcGxlbWVudHMgRHluYW1pY1dyYXBwZXIge1xuICAvLyBJbmRpY2F0ZXMgd2hldGhlciB0aGUgY29udGFpbmVyIGlzIGR5bmFtaWNhbGx5IGNyZWF0ZWQgYnkgdGhlIGNoZWNrYm94IGlucHV0IGl0c2VsZlxuICBfZHluYW1pYyA9IGZhbHNlO1xufVxuIl19