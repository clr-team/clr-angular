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
export class ClrCheckboxWrapper {
    constructor() {
        // We need both _dynamic for HostWrapper and ContentChild(ClrLabel) in cases where
        // the user puts a radio inside a wrapper without a label, host wrapping doesn't apply
        // but we'd still need to insert a label
        this._dynamic = false;
    }
}
ClrCheckboxWrapper.decorators = [
    { type: Component, args: [{
                selector: 'clr-checkbox-wrapper',
                template: `
    <ng-content select="[clrCheckbox]"></ng-content>
    <ng-content select="label"></ng-content>
    <label *ngIf="!label"></label>
  `,
                host: {
                    '[class.clr-checkbox-wrapper]': 'true',
                },
                providers: [ControlIdService]
            }] }
];
ClrCheckboxWrapper.propDecorators = {
    label: [{ type: ContentChild, args: [ClrLabel,] }]
};
if (false) {
    /** @type {?} */
    ClrCheckboxWrapper.prototype._dynamic;
    /** @type {?} */
    ClrCheckboxWrapper.prototype.label;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3gtd3JhcHBlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImZvcm1zL2NoZWNrYm94L2NoZWNrYm94LXdyYXBwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBTUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHeEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDMUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBYzNDLE1BQU0sT0FBTyxrQkFBa0I7SUFaL0I7Ozs7UUFnQkUsYUFBUSxHQUFHLEtBQUssQ0FBQztJQUVuQixDQUFDOzs7WUFsQkEsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxzQkFBc0I7Z0JBQ2hDLFFBQVEsRUFBRTs7OztHQUlUO2dCQUNELElBQUksRUFBRTtvQkFDSiw4QkFBOEIsRUFBRSxNQUFNO2lCQUN2QztnQkFDRCxTQUFTLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQzthQUM5Qjs7O29CQU1FLFlBQVksU0FBQyxRQUFROzs7O0lBRHRCLHNDQUFpQjs7SUFDakIsbUNBQXdDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBDb250ZW50Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRHluYW1pY1dyYXBwZXIgfSBmcm9tICcuLi8uLi91dGlscy9ob3N0LXdyYXBwaW5nL2R5bmFtaWMtd3JhcHBlcic7XG5pbXBvcnQgeyBDb250cm9sSWRTZXJ2aWNlIH0gZnJvbSAnLi4vY29tbW9uL3Byb3ZpZGVycy9jb250cm9sLWlkLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2xyTGFiZWwgfSBmcm9tICcuLi9jb21tb24vbGFiZWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItY2hlY2tib3gtd3JhcHBlcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW2NsckNoZWNrYm94XVwiPjwvbmctY29udGVudD5cbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJsYWJlbFwiPjwvbmctY29udGVudD5cbiAgICA8bGFiZWwgKm5nSWY9XCIhbGFiZWxcIj48L2xhYmVsPlxuICBgLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5jbHItY2hlY2tib3gtd3JhcHBlcl0nOiAndHJ1ZScsXG4gIH0sXG4gIHByb3ZpZGVyczogW0NvbnRyb2xJZFNlcnZpY2VdLFxufSlcbmV4cG9ydCBjbGFzcyBDbHJDaGVja2JveFdyYXBwZXIgaW1wbGVtZW50cyBEeW5hbWljV3JhcHBlciB7XG4gIC8vIFdlIG5lZWQgYm90aCBfZHluYW1pYyBmb3IgSG9zdFdyYXBwZXIgYW5kIENvbnRlbnRDaGlsZChDbHJMYWJlbCkgaW4gY2FzZXMgd2hlcmVcbiAgLy8gdGhlIHVzZXIgcHV0cyBhIHJhZGlvIGluc2lkZSBhIHdyYXBwZXIgd2l0aG91dCBhIGxhYmVsLCBob3N0IHdyYXBwaW5nIGRvZXNuJ3QgYXBwbHlcbiAgLy8gYnV0IHdlJ2Qgc3RpbGwgbmVlZCB0byBpbnNlcnQgYSBsYWJlbFxuICBfZHluYW1pYyA9IGZhbHNlO1xuICBAQ29udGVudENoaWxkKENsckxhYmVsKSBsYWJlbDogQ2xyTGFiZWw7XG59XG4iXX0=