/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, TemplateRef, ViewChild } from '@angular/core';
var WrappedRow = /** @class */ (function () {
    function WrappedRow() {
        this._dynamic = false;
    }
    // the rows projected view (in memory)
    /**
     * @return {?}
     */
    WrappedRow.prototype.ngAfterViewInit = 
    // the rows projected view (in memory)
    /**
     * @return {?}
     */
    function () {
        // Create the cells view in memory, not the DOM.
        this.rowView = this.templateRef.createEmbeddedView(null);
    };
    WrappedRow.decorators = [
        { type: Component, args: [{
                    selector: 'dg-wrapped-row',
                    template: "        \n        <ng-template #rowPortal>\n            <ng-content></ng-content>\n        </ng-template>\n    "
                }] }
    ];
    WrappedRow.propDecorators = {
        templateRef: [{ type: ViewChild, args: ['rowPortal', { static: false },] }]
    };
    return WrappedRow;
}());
export { WrappedRow };
if (false) {
    /** @type {?} */
    WrappedRow.prototype._dynamic;
    /** @type {?} */
    WrappedRow.prototype.templateRef;
    /** @type {?} */
    WrappedRow.prototype.rowView;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JhcHBlZC1yb3cuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJkYXRhL2RhdGFncmlkL3dyYXBwZWQtcm93LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtBLE9BQU8sRUFBaUIsU0FBUyxFQUFtQixXQUFXLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSWxHO0lBQUE7UUFTRSxhQUFRLEdBQUcsS0FBSyxDQUFDO0lBVW5CLENBQUM7Ozs7O0lBSkMsb0NBQWU7Ozs7O0lBQWY7UUFDRSxnREFBZ0Q7UUFDaEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNELENBQUM7O2dCQWxCRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtvQkFDMUIsUUFBUSxFQUFFLGlIQUlQO2lCQUNKOzs7OEJBSUUsU0FBUyxTQUFDLFdBQVcsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7O0lBUTNDLGlCQUFDO0NBQUEsQUFuQkQsSUFtQkM7U0FYWSxVQUFVOzs7SUFDckIsOEJBQWlCOztJQUVqQixpQ0FDK0I7O0lBQy9CLDZCQUErQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgRW1iZWRkZWRWaWV3UmVmLCBUZW1wbGF0ZVJlZiwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IER5bmFtaWNXcmFwcGVyIH0gZnJvbSAnLi4vLi4vdXRpbHMvaG9zdC13cmFwcGluZy9keW5hbWljLXdyYXBwZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZy13cmFwcGVkLXJvdycsXG4gIHRlbXBsYXRlOiBgICAgICAgICBcbiAgICAgICAgPG5nLXRlbXBsYXRlICNyb3dQb3J0YWw+XG4gICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgYCxcbn0pXG5leHBvcnQgY2xhc3MgV3JhcHBlZFJvdyBpbXBsZW1lbnRzIER5bmFtaWNXcmFwcGVyLCBBZnRlclZpZXdJbml0IHtcbiAgX2R5bmFtaWMgPSBmYWxzZTtcblxuICBAVmlld0NoaWxkKCdyb3dQb3J0YWwnLCB7IHN0YXRpYzogZmFsc2UgfSlcbiAgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPHZvaWQ+O1xuICByb3dWaWV3OiBFbWJlZGRlZFZpZXdSZWY8dm9pZD47IC8vIHRoZSByb3dzIHByb2plY3RlZCB2aWV3IChpbiBtZW1vcnkpXG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIC8vIENyZWF0ZSB0aGUgY2VsbHMgdmlldyBpbiBtZW1vcnksIG5vdCB0aGUgRE9NLlxuICAgIHRoaXMucm93VmlldyA9IHRoaXMudGVtcGxhdGVSZWYuY3JlYXRlRW1iZWRkZWRWaWV3KG51bGwpO1xuICB9XG59XG4iXX0=