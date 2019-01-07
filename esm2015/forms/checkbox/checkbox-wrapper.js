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
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.label) {
            this.label.disableGrid();
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3gtd3JhcHBlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImZvcm1zL2NoZWNrYm94L2NoZWNrYm94LXdyYXBwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBTUEsT0FBTyxFQUFVLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHaEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDMUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBYzNDLE1BQU0sT0FBTyxrQkFBa0I7SUFaL0I7Ozs7UUFnQkUsYUFBUSxHQUFHLEtBQUssQ0FBQztJQVFuQixDQUFDOzs7O0lBTEMsUUFBUTtRQUNOLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNkLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDMUI7SUFDSCxDQUFDOzs7WUF2QkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxzQkFBc0I7Z0JBQ2hDLFFBQVEsRUFBRTs7OztHQUlUO2dCQUNELElBQUksRUFBRTtvQkFDSiw4QkFBOEIsRUFBRSxNQUFNO2lCQUN2QztnQkFDRCxTQUFTLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQzthQUM5Qjs7O29CQU1FLFlBQVksU0FBQyxRQUFROzs7O0lBRHRCLHNDQUFpQjs7SUFDakIsbUNBQXdDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgT25Jbml0LCBDb21wb25lbnQsIENvbnRlbnRDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBEeW5hbWljV3JhcHBlciB9IGZyb20gJy4uLy4uL3V0aWxzL2hvc3Qtd3JhcHBpbmcvZHluYW1pYy13cmFwcGVyJztcbmltcG9ydCB7IENvbnRyb2xJZFNlcnZpY2UgfSBmcm9tICcuLi9jb21tb24vcHJvdmlkZXJzL2NvbnRyb2wtaWQuc2VydmljZSc7XG5pbXBvcnQgeyBDbHJMYWJlbCB9IGZyb20gJy4uL2NvbW1vbi9sYWJlbCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci1jaGVja2JveC13cmFwcGVyJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbY2xyQ2hlY2tib3hdXCI+PC9uZy1jb250ZW50PlxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImxhYmVsXCI+PC9uZy1jb250ZW50PlxuICAgIDxsYWJlbCAqbmdJZj1cIiFsYWJlbFwiPjwvbGFiZWw+XG4gIGAsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmNsci1jaGVja2JveC13cmFwcGVyXSc6ICd0cnVlJyxcbiAgfSxcbiAgcHJvdmlkZXJzOiBbQ29udHJvbElkU2VydmljZV0sXG59KVxuZXhwb3J0IGNsYXNzIENsckNoZWNrYm94V3JhcHBlciBpbXBsZW1lbnRzIER5bmFtaWNXcmFwcGVyLCBPbkluaXQge1xuICAvLyBXZSBuZWVkIGJvdGggX2R5bmFtaWMgZm9yIEhvc3RXcmFwcGVyIGFuZCBDb250ZW50Q2hpbGQoQ2xyTGFiZWwpIGluIGNhc2VzIHdoZXJlXG4gIC8vIHRoZSB1c2VyIHB1dHMgYSByYWRpbyBpbnNpZGUgYSB3cmFwcGVyIHdpdGhvdXQgYSBsYWJlbCwgaG9zdCB3cmFwcGluZyBkb2Vzbid0IGFwcGx5XG4gIC8vIGJ1dCB3ZSdkIHN0aWxsIG5lZWQgdG8gaW5zZXJ0IGEgbGFiZWxcbiAgX2R5bmFtaWMgPSBmYWxzZTtcbiAgQENvbnRlbnRDaGlsZChDbHJMYWJlbCkgbGFiZWw6IENsckxhYmVsO1xuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICh0aGlzLmxhYmVsKSB7XG4gICAgICB0aGlzLmxhYmVsLmRpc2FibGVHcmlkKCk7XG4gICAgfVxuICB9XG59XG4iXX0=