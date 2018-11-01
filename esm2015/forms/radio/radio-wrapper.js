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
export class ClrRadioWrapper {
    constructor() {
        // We need both _dynamic for HostWrapper and ContentChild(ClrLabel) in cases where
        // the user puts a radio inside a wrapper without a label, host wrapping doesn't apply
        // but we'd still need to insert a label
        this._dynamic = false;
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
ClrRadioWrapper.propDecorators = {
    label: [{ type: ContentChild, args: [ClrLabel,] }]
};
if (false) {
    /** @type {?} */
    ClrRadioWrapper.prototype._dynamic;
    /** @type {?} */
    ClrRadioWrapper.prototype.label;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW8td3JhcHBlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImZvcm1zL3JhZGlvL3JhZGlvLXdyYXBwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBTUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHeEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDMUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBYzNDLE1BQU0sT0FBTyxlQUFlO0lBWjVCOzs7O1FBZ0JFLGFBQVEsR0FBRyxLQUFLLENBQUM7SUFFbkIsQ0FBQzs7O1lBbEJBLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsbUJBQW1CO2dCQUM3QixRQUFRLEVBQUU7Ozs7R0FJVDtnQkFDRCxJQUFJLEVBQUU7b0JBQ0osMkJBQTJCLEVBQUUsTUFBTTtpQkFDcEM7Z0JBQ0QsU0FBUyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7YUFDOUI7OztvQkFNRSxZQUFZLFNBQUMsUUFBUTs7OztJQUR0QixtQ0FBaUI7O0lBQ2pCLGdDQUF3QyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IENvbXBvbmVudCwgQ29udGVudENoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IER5bmFtaWNXcmFwcGVyIH0gZnJvbSAnLi4vLi4vdXRpbHMvaG9zdC13cmFwcGluZy9keW5hbWljLXdyYXBwZXInO1xuaW1wb3J0IHsgQ29udHJvbElkU2VydmljZSB9IGZyb20gJy4uL2NvbW1vbi9wcm92aWRlcnMvY29udHJvbC1pZC5zZXJ2aWNlJztcbmltcG9ydCB7IENsckxhYmVsIH0gZnJvbSAnLi4vY29tbW9uL2xhYmVsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLXJhZGlvLXdyYXBwZXInLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIltjbHJSYWRpb11cIj48L25nLWNvbnRlbnQ+XG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibGFiZWxcIj48L25nLWNvbnRlbnQ+XG4gICAgPGxhYmVsICpuZ0lmPVwiIWxhYmVsXCI+PC9sYWJlbD5cbiAgYCxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuY2xyLXJhZGlvLXdyYXBwZXJdJzogJ3RydWUnLFxuICB9LFxuICBwcm92aWRlcnM6IFtDb250cm9sSWRTZXJ2aWNlXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyUmFkaW9XcmFwcGVyIGltcGxlbWVudHMgRHluYW1pY1dyYXBwZXIge1xuICAvLyBXZSBuZWVkIGJvdGggX2R5bmFtaWMgZm9yIEhvc3RXcmFwcGVyIGFuZCBDb250ZW50Q2hpbGQoQ2xyTGFiZWwpIGluIGNhc2VzIHdoZXJlXG4gIC8vIHRoZSB1c2VyIHB1dHMgYSByYWRpbyBpbnNpZGUgYSB3cmFwcGVyIHdpdGhvdXQgYSBsYWJlbCwgaG9zdCB3cmFwcGluZyBkb2Vzbid0IGFwcGx5XG4gIC8vIGJ1dCB3ZSdkIHN0aWxsIG5lZWQgdG8gaW5zZXJ0IGEgbGFiZWxcbiAgX2R5bmFtaWMgPSBmYWxzZTtcbiAgQENvbnRlbnRDaGlsZChDbHJMYWJlbCkgbGFiZWw6IENsckxhYmVsO1xufVxuIl19