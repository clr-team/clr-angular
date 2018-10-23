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
var ClrForm = /** @class */ (function () {
    function ClrForm() {
    }
    ClrForm.decorators = [
        { type: Directive, args: [{
                    selector: '[clrForm]',
                    providers: [LayoutService, IS_NEW_FORMS_LAYOUT_TRUE_PROVIDER],
                    host: { '[class.clr-form]': 'true' },
                },] }
    ];
    return ClrForm;
}());
export { ClrForm };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImZvcm1zL2NvbW1vbi9mb3JtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQU1BLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzNELE9BQU8sRUFBRSxpQ0FBaUMsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBRWxGO0lBQUE7SUFLc0IsQ0FBQzs7Z0JBTHRCLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsV0FBVztvQkFDckIsU0FBUyxFQUFFLENBQUMsYUFBYSxFQUFFLGlDQUFpQyxDQUFDO29CQUM3RCxJQUFJLEVBQUUsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLEVBQUU7aUJBQ3JDOztJQUNxQixjQUFDO0NBQUEsQUFMdkIsSUFLdUI7U0FBVixPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgRGlyZWN0aXZlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBMYXlvdXRTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvbGF5b3V0LnNlcnZpY2UnO1xuaW1wb3J0IHsgSVNfTkVXX0ZPUk1TX0xBWU9VVF9UUlVFX1BST1ZJREVSIH0gZnJvbSAnLi9wcm92aWRlcnMvbmV3LWZvcm1zLnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbY2xyRm9ybV0nLFxuICBwcm92aWRlcnM6IFtMYXlvdXRTZXJ2aWNlLCBJU19ORVdfRk9STVNfTEFZT1VUX1RSVUVfUFJPVklERVJdLFxuICBob3N0OiB7ICdbY2xhc3MuY2xyLWZvcm1dJzogJ3RydWUnIH0sXG59KVxuZXhwb3J0IGNsYXNzIENsckZvcm0ge31cbiJdfQ==