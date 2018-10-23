/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, Optional, ContentChild } from '@angular/core';
import { ControlClassService } from '../common/providers/control-class.service';
import { ControlIdService } from '../common/providers/control-id.service';
import { ClrLabel } from '../common/label';
export class ClrRadioWrapper {
    /**
     * @param {?} controlClassService
     */
    constructor(controlClassService) {
        this.controlClassService = controlClassService;
        // We need both _dynamic for HostWrapper and ContentChild(ClrLabel) in cases where
        // the user puts a radio inside a wrapper without a label, host wrapping doesn't apply
        // but we'd still need to insert a label
        this._dynamic = false;
        this.hasContainer = false;
        if (controlClassService) {
            this.hasContainer = true;
        }
    }
}
ClrRadioWrapper.decorators = [
    { type: Component, args: [{
                selector: 'clr-radio-wrapper',
                template: `
    <ng-content select="[clrRadio]"></ng-content>
    <ng-content select="label"></ng-content>
    <label *ngIf="!label"></label>
  `,
                host: {
                    '[class.clr-radio-wrapper]': 'true',
                },
                providers: [ControlIdService]
            }] }
];
/** @nocollapse */
ClrRadioWrapper.ctorParameters = () => [
    { type: ControlClassService, decorators: [{ type: Optional }] }
];
ClrRadioWrapper.propDecorators = {
    label: [{ type: ContentChild, args: [ClrLabel,] }]
};
if (false) {
    /** @type {?} */
    ClrRadioWrapper.prototype._dynamic;
    /** @type {?} */
    ClrRadioWrapper.prototype.label;
    /** @type {?} */
    ClrRadioWrapper.prototype.hasContainer;
    /** @type {?} */
    ClrRadioWrapper.prototype.controlClassService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW8td3JhcHBlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImZvcm1zL3JhZGlvL3JhZGlvLXdyYXBwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBTUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBR2xFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQWMzQyxNQUFNLE9BQU8sZUFBZTs7OztJQVExQixZQUErQixtQkFBd0M7UUFBeEMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjs7OztRQUp2RSxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBRWpCLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBR25CLElBQUksbUJBQW1CLEVBQUU7WUFDdkIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7U0FDMUI7SUFDSCxDQUFDOzs7WUF4QkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxtQkFBbUI7Z0JBQzdCLFFBQVEsRUFBRTs7OztHQUlUO2dCQUNELElBQUksRUFBRTtvQkFDSiwyQkFBMkIsRUFBRSxNQUFNO2lCQUNwQztnQkFDRCxTQUFTLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQzthQUM5Qjs7OztZQWZRLG1CQUFtQix1QkF3QmIsUUFBUTs7O29CQUhwQixZQUFZLFNBQUMsUUFBUTs7OztJQUR0QixtQ0FBaUI7O0lBQ2pCLGdDQUF3Qzs7SUFDeEMsdUNBQXFCOztJQUVULDhDQUEyRCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IENvbXBvbmVudCwgT3B0aW9uYWwsIENvbnRlbnRDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBEeW5hbWljV3JhcHBlciB9IGZyb20gJy4uLy4uL3V0aWxzL2hvc3Qtd3JhcHBpbmcvZHluYW1pYy13cmFwcGVyJztcbmltcG9ydCB7IENvbnRyb2xDbGFzc1NlcnZpY2UgfSBmcm9tICcuLi9jb21tb24vcHJvdmlkZXJzL2NvbnRyb2wtY2xhc3Muc2VydmljZSc7XG5pbXBvcnQgeyBDb250cm9sSWRTZXJ2aWNlIH0gZnJvbSAnLi4vY29tbW9uL3Byb3ZpZGVycy9jb250cm9sLWlkLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2xyTGFiZWwgfSBmcm9tICcuLi9jb21tb24vbGFiZWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItcmFkaW8td3JhcHBlcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW2NsclJhZGlvXVwiPjwvbmctY29udGVudD5cbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJsYWJlbFwiPjwvbmctY29udGVudD5cbiAgICA8bGFiZWwgKm5nSWY9XCIhbGFiZWxcIj48L2xhYmVsPlxuICBgLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5jbHItcmFkaW8td3JhcHBlcl0nOiAndHJ1ZScsXG4gIH0sXG4gIHByb3ZpZGVyczogW0NvbnRyb2xJZFNlcnZpY2VdLFxufSlcbmV4cG9ydCBjbGFzcyBDbHJSYWRpb1dyYXBwZXIgaW1wbGVtZW50cyBEeW5hbWljV3JhcHBlciB7XG4gIC8vIFdlIG5lZWQgYm90aCBfZHluYW1pYyBmb3IgSG9zdFdyYXBwZXIgYW5kIENvbnRlbnRDaGlsZChDbHJMYWJlbCkgaW4gY2FzZXMgd2hlcmVcbiAgLy8gdGhlIHVzZXIgcHV0cyBhIHJhZGlvIGluc2lkZSBhIHdyYXBwZXIgd2l0aG91dCBhIGxhYmVsLCBob3N0IHdyYXBwaW5nIGRvZXNuJ3QgYXBwbHlcbiAgLy8gYnV0IHdlJ2Qgc3RpbGwgbmVlZCB0byBpbnNlcnQgYSBsYWJlbFxuICBfZHluYW1pYyA9IGZhbHNlO1xuICBAQ29udGVudENoaWxkKENsckxhYmVsKSBsYWJlbDogQ2xyTGFiZWw7XG4gIGhhc0NvbnRhaW5lciA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIHB1YmxpYyBjb250cm9sQ2xhc3NTZXJ2aWNlOiBDb250cm9sQ2xhc3NTZXJ2aWNlKSB7XG4gICAgaWYgKGNvbnRyb2xDbGFzc1NlcnZpY2UpIHtcbiAgICAgIHRoaXMuaGFzQ29udGFpbmVyID0gdHJ1ZTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==