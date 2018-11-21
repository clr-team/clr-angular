/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive, Input, ElementRef, Renderer2 } from '@angular/core';
var ClrIconCustomTag = /** @class */ (function () {
    function ClrIconCustomTag(el, renderer) {
        this.el = el;
        this.renderer = renderer;
    }
    /**
     * @return {?}
     */
    ClrIconCustomTag.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (this.shape) {
            this.renderer.setAttribute(this.el.nativeElement, 'shape', this.shape);
        }
    };
    ClrIconCustomTag.decorators = [
        { type: Directive, args: [{ selector: 'clr-icon' },] }
    ];
    /** @nocollapse */
    ClrIconCustomTag.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    ClrIconCustomTag.propDecorators = {
        shape: [{ type: Input }]
    };
    return ClrIconCustomTag;
}());
export { ClrIconCustomTag };
if (false) {
    /** @type {?} */
    ClrIconCustomTag.prototype.shape;
    /** @type {?} */
    ClrIconCustomTag.prototype.el;
    /** @type {?} */
    ClrIconCustomTag.prototype.renderer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImljb24vaWNvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFLQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXhFO0lBSUUsMEJBQW9CLEVBQWMsRUFBVSxRQUFtQjtRQUEzQyxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVztJQUFHLENBQUM7Ozs7SUFFbkUsbUNBQVE7OztJQUFSO1FBQ0UsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN4RTtJQUNILENBQUM7O2dCQVZGLFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUU7Ozs7Z0JBRlIsVUFBVTtnQkFBRSxTQUFTOzs7d0JBSTdDLEtBQUs7O0lBU1IsdUJBQUM7Q0FBQSxBQVhELElBV0M7U0FWWSxnQkFBZ0I7OztJQUMzQixpQ0FBdUI7O0lBRVgsOEJBQXNCOztJQUFFLG9DQUEyQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIEVsZW1lbnRSZWYsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdjbHItaWNvbicgfSlcbmV4cG9ydCBjbGFzcyBDbHJJY29uQ3VzdG9tVGFnIHtcbiAgQElucHV0KCkgc2hhcGU6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmLCBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMuc2hhcGUpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3NoYXBlJywgdGhpcy5zaGFwZSk7XG4gICAgfVxuICB9XG59XG4iXX0=