/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive } from '@angular/core';
import { LayoutService } from './providers/layout.service';
import { IS_NEW_FORMS_LAYOUT_TRUE_PROVIDER } from './providers/new-forms.service';
import { MarkControlService } from './providers/mark-control.service';
var ClrForm = /** @class */ (function () {
    function ClrForm(markControlService) {
        this.markControlService = markControlService;
    }
    /**
     * @return {?}
     */
    ClrForm.prototype.markAsDirty = /**
     * @return {?}
     */
    function () {
        this.markControlService.markAsDirty();
    };
    ClrForm.decorators = [
        { type: Directive, args: [{
                    selector: '[clrForm]',
                    providers: [LayoutService, MarkControlService, IS_NEW_FORMS_LAYOUT_TRUE_PROVIDER],
                    host: { '[class.clr-form]': 'true' },
                },] }
    ];
    /** @nocollapse */
    ClrForm.ctorParameters = function () { return [
        { type: MarkControlService }
    ]; };
    return ClrForm;
}());
export { ClrForm };
if (false) {
    /** @type {?} */
    ClrForm.prototype.markControlService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImZvcm1zL2NvbW1vbi9mb3JtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQU1BLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzNELE9BQU8sRUFBRSxpQ0FBaUMsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2xGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBRXRFO0lBTUUsaUJBQW9CLGtCQUFzQztRQUF0Qyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO0lBQUcsQ0FBQzs7OztJQUU5RCw2QkFBVzs7O0lBQVg7UUFDRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDeEMsQ0FBQzs7Z0JBVkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxXQUFXO29CQUNyQixTQUFTLEVBQUUsQ0FBQyxhQUFhLEVBQUUsa0JBQWtCLEVBQUUsaUNBQWlDLENBQUM7b0JBQ2pGLElBQUksRUFBRSxFQUFFLGtCQUFrQixFQUFFLE1BQU0sRUFBRTtpQkFDckM7Ozs7Z0JBTlEsa0JBQWtCOztJQWEzQixjQUFDO0NBQUEsQUFYRCxJQVdDO1NBTlksT0FBTzs7O0lBQ04scUNBQThDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgRGlyZWN0aXZlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBMYXlvdXRTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvbGF5b3V0LnNlcnZpY2UnO1xuaW1wb3J0IHsgSVNfTkVXX0ZPUk1TX0xBWU9VVF9UUlVFX1BST1ZJREVSIH0gZnJvbSAnLi9wcm92aWRlcnMvbmV3LWZvcm1zLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWFya0NvbnRyb2xTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvbWFyay1jb250cm9sLnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbY2xyRm9ybV0nLFxuICBwcm92aWRlcnM6IFtMYXlvdXRTZXJ2aWNlLCBNYXJrQ29udHJvbFNlcnZpY2UsIElTX05FV19GT1JNU19MQVlPVVRfVFJVRV9QUk9WSURFUl0sXG4gIGhvc3Q6IHsgJ1tjbGFzcy5jbHItZm9ybV0nOiAndHJ1ZScgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyRm9ybSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbWFya0NvbnRyb2xTZXJ2aWNlOiBNYXJrQ29udHJvbFNlcnZpY2UpIHt9XG5cbiAgbWFya0FzRGlydHkoKSB7XG4gICAgdGhpcy5tYXJrQ29udHJvbFNlcnZpY2UubWFya0FzRGlydHkoKTtcbiAgfVxufVxuIl19