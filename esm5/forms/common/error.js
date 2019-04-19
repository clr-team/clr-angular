/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, Optional, HostBinding, Input } from '@angular/core';
import { ControlIdService } from './providers/control-id.service';
var ClrControlError = /** @class */ (function () {
    function ClrControlError(controlIdService) {
        this.controlIdService = controlIdService;
        this.describedByAttr = null;
        this.subscriptions = [];
    }
    /**
     * @return {?}
     */
    ClrControlError.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.controlIdService && !this.describedByAttr) {
            this.subscriptions.push(this.controlIdService.idChange.subscribe((/**
             * @param {?} id
             * @return {?}
             */
            function (id) { return (_this.describedByAttr = id); })));
        }
    };
    /**
     * @return {?}
     */
    ClrControlError.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        function (sub) { return sub.unsubscribe(); }));
    };
    ClrControlError.decorators = [
        { type: Component, args: [{
                    selector: 'clr-control-error',
                    template: "\n    <ng-content></ng-content>\n    ",
                    host: {
                        '[class.clr-subtext]': 'true',
                        '[attr.aria-live]': '"polite"',
                    }
                }] }
    ];
    /** @nocollapse */
    ClrControlError.ctorParameters = function () { return [
        { type: ControlIdService, decorators: [{ type: Optional }] }
    ]; };
    ClrControlError.propDecorators = {
        describedByAttr: [{ type: Input, args: ['aria-describedby',] }, { type: HostBinding, args: ['attr.aria-describedby',] }]
    };
    return ClrControlError;
}());
export { ClrControlError };
if (false) {
    /** @type {?} */
    ClrControlError.prototype.describedByAttr;
    /**
     * @type {?}
     * @private
     */
    ClrControlError.prototype.subscriptions;
    /**
     * @type {?}
     * @private
     */
    ClrControlError.prototype.controlIdService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJmb3Jtcy9jb21tb24vZXJyb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBTUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUdsRTtJQWlCRSx5QkFBZ0MsZ0JBQWtDO1FBQWxDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFKbEUsb0JBQWUsR0FBVyxJQUFJLENBQUM7UUFFdkIsa0JBQWEsR0FBbUIsRUFBRSxDQUFDO0lBRTBCLENBQUM7Ozs7SUFFdEUsa0NBQVE7OztJQUFSO1FBQUEsaUJBSUM7UUFIQyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDbEQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxTQUFTOzs7O1lBQUMsVUFBQSxFQUFFLElBQUksT0FBQSxDQUFDLEtBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDLEVBQTNCLENBQTJCLEVBQUMsQ0FBQyxDQUFDO1NBQ3RHO0lBQ0gsQ0FBQzs7OztJQUVELHFDQUFXOzs7SUFBWDtRQUNFLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTzs7OztRQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLFdBQVcsRUFBRSxFQUFqQixDQUFpQixFQUFDLENBQUM7SUFDdkQsQ0FBQzs7Z0JBM0JGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsbUJBQW1CO29CQUM3QixRQUFRLEVBQUUsdUNBRVA7b0JBQ0gsSUFBSSxFQUFFO3dCQUNKLHFCQUFxQixFQUFFLE1BQU07d0JBQzdCLGtCQUFrQixFQUFFLFVBQVU7cUJBQy9CO2lCQUNGOzs7O2dCQVpRLGdCQUFnQix1QkFvQlYsUUFBUTs7O2tDQU5wQixLQUFLLFNBQUMsa0JBQWtCLGNBQ3hCLFdBQVcsU0FBQyx1QkFBdUI7O0lBZ0J0QyxzQkFBQztDQUFBLEFBNUJELElBNEJDO1NBbEJZLGVBQWU7OztJQUMxQiwwQ0FFK0I7Ozs7O0lBRS9CLHdDQUEyQzs7Ozs7SUFFL0IsMkNBQXNEIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBPcHRpb25hbCwgSG9zdEJpbmRpbmcsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sSWRTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvY29udHJvbC1pZC5zZXJ2aWNlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItY29udHJvbC1lcnJvcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIGAsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmNsci1zdWJ0ZXh0XSc6ICd0cnVlJyxcbiAgICAnW2F0dHIuYXJpYS1saXZlXSc6ICdcInBvbGl0ZVwiJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyQ29udHJvbEVycm9yIHtcbiAgQElucHV0KCdhcmlhLWRlc2NyaWJlZGJ5JylcbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmFyaWEtZGVzY3JpYmVkYnknKVxuICBkZXNjcmliZWRCeUF0dHI6IHN0cmluZyA9IG51bGw7XG5cbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIHByaXZhdGUgY29udHJvbElkU2VydmljZTogQ29udHJvbElkU2VydmljZSkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5jb250cm9sSWRTZXJ2aWNlICYmICF0aGlzLmRlc2NyaWJlZEJ5QXR0cikge1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2godGhpcy5jb250cm9sSWRTZXJ2aWNlLmlkQ2hhbmdlLnN1YnNjcmliZShpZCA9PiAodGhpcy5kZXNjcmliZWRCeUF0dHIgPSBpZCkpKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaChzdWIgPT4gc3ViLnVuc3Vic2NyaWJlKCkpO1xuICB9XG59XG4iXX0=