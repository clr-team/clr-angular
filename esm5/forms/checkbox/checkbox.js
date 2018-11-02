/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive, Renderer2, ElementRef, Injector, Self, Optional, ViewContainerRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { ClrCheckboxWrapper } from './checkbox-wrapper';
import { WrappedFormControl } from '../common/wrapped-control';
var ClrCheckbox = /** @class */ (function (_super) {
    tslib_1.__extends(ClrCheckbox, _super);
    function ClrCheckbox(vcr, injector, control, renderer, el) {
        return _super.call(this, vcr, ClrCheckboxWrapper, injector, control, renderer, el) || this;
    }
    ClrCheckbox.decorators = [
        { type: Directive, args: [{ selector: '[clrCheckbox]' },] }
    ];
    /** @nocollapse */
    ClrCheckbox.ctorParameters = function () { return [
        { type: ViewContainerRef },
        { type: Injector },
        { type: NgControl, decorators: [{ type: Self }, { type: Optional }] },
        { type: Renderer2 },
        { type: ElementRef }
    ]; };
    return ClrCheckbox;
}(WrappedFormControl));
export { ClrCheckbox };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3guanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJmb3Jtcy9jaGVja2JveC9jaGVja2JveC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBTUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdHLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUV4RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUUvRDtJQUNpQyx1Q0FBc0M7SUFDckUscUJBQ0UsR0FBcUIsRUFDckIsUUFBa0IsRUFHbEIsT0FBa0IsRUFDbEIsUUFBbUIsRUFDbkIsRUFBYztlQUVkLGtCQUFNLEdBQUcsRUFBRSxrQkFBa0IsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUM7SUFDakUsQ0FBQzs7Z0JBWkYsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLGVBQWUsRUFBRTs7OztnQkFONkIsZ0JBQWdCO2dCQUExQyxRQUFRO2dCQUMxQyxTQUFTLHVCQVViLElBQUksWUFDSixRQUFRO2dCQVpPLFNBQVM7Z0JBQUUsVUFBVTs7SUFtQnpDLGtCQUFDO0NBQUEsQUFiRCxDQUNpQyxrQkFBa0IsR0FZbEQ7U0FaWSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgRGlyZWN0aXZlLCBSZW5kZXJlcjIsIEVsZW1lbnRSZWYsIEluamVjdG9yLCBTZWxmLCBPcHRpb25hbCwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQ2xyQ2hlY2tib3hXcmFwcGVyIH0gZnJvbSAnLi9jaGVja2JveC13cmFwcGVyJztcblxuaW1wb3J0IHsgV3JhcHBlZEZvcm1Db250cm9sIH0gZnJvbSAnLi4vY29tbW9uL3dyYXBwZWQtY29udHJvbCc7XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tjbHJDaGVja2JveF0nIH0pXG5leHBvcnQgY2xhc3MgQ2xyQ2hlY2tib3ggZXh0ZW5kcyBXcmFwcGVkRm9ybUNvbnRyb2w8Q2xyQ2hlY2tib3hXcmFwcGVyPiB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHZjcjogVmlld0NvbnRhaW5lclJlZixcbiAgICBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgQFNlbGYoKVxuICAgIEBPcHRpb25hbCgpXG4gICAgY29udHJvbDogTmdDb250cm9sLFxuICAgIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgZWw6IEVsZW1lbnRSZWZcbiAgKSB7XG4gICAgc3VwZXIodmNyLCBDbHJDaGVja2JveFdyYXBwZXIsIGluamVjdG9yLCBjb250cm9sLCByZW5kZXJlciwgZWwpO1xuICB9XG59XG4iXX0=