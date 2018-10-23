/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { HostBinding, Input } from '@angular/core';
import { HostWrapper } from '../../utils/host-wrapping/host-wrapper';
import { ControlIdService } from './providers/control-id.service';
/**
 * @template W
 */
var WrappedFormControl = /** @class */ (function () {
    // I lost way too much time trying to make this work without injecting the ViewContainerRef and the Injector,
    // I'm giving up. So we have to inject these two manually for now.
    function WrappedFormControl(wrapperType, vcr, index) {
        if (index === void 0) { index = 0; }
        this.wrapperType = wrapperType;
        this.vcr = vcr;
        this.index = index;
    }
    Object.defineProperty(WrappedFormControl.prototype, "id", {
        get: /**
         * @return {?}
         */
        function () {
            return this._id;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._id = value;
            if (this.controlIdService) {
                this.controlIdService.id = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @template T
     * @param {?} token
     * @param {?=} notFoundValue
     * @return {?}
     */
    WrappedFormControl.prototype.getProviderFromContainer = /**
     * @template T
     * @param {?} token
     * @param {?=} notFoundValue
     * @return {?}
     */
    function (token, notFoundValue) {
        return this._containerInjector.get(token, notFoundValue);
    };
    /**
     * @return {?}
     */
    WrappedFormControl.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this._containerInjector = new HostWrapper(this.wrapperType, this.vcr, this.index);
        this.controlIdService = this._containerInjector.get(ControlIdService);
        if (this._id) {
            this.controlIdService.id = this._id;
        }
        else {
            this._id = this.controlIdService.id;
        }
        // No need to subscribe to controlIdService.idChange because the input is the only one that can update the id.
    };
    WrappedFormControl.propDecorators = {
        id: [{ type: HostBinding }, { type: Input }]
    };
    return WrappedFormControl;
}());
export { WrappedFormControl };
if (false) {
    /** @type {?} */
    WrappedFormControl.prototype.controlIdService;
    /** @type {?} */
    WrappedFormControl.prototype._id;
    /** @type {?} */
    WrappedFormControl.prototype._containerInjector;
    /** @type {?} */
    WrappedFormControl.prototype.wrapperType;
    /** @type {?} */
    WrappedFormControl.prototype.vcr;
    /** @type {?} */
    WrappedFormControl.prototype.index;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JhcHBlZC1jb250cm9sLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZm9ybXMvY29tbW9uL3dyYXBwZWQtY29udHJvbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFLQSxPQUFPLEVBQUUsV0FBVyxFQUE0QixLQUFLLEVBQWtDLE1BQU0sZUFBZSxDQUFDO0FBRTdHLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUdyRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQzs7OztBQUVsRTtJQUNFLDZHQUE2RztJQUM3RyxrRUFBa0U7SUFDbEUsNEJBQXNCLFdBQW9CLEVBQVksR0FBcUIsRUFBWSxLQUFpQjtRQUFqQixzQkFBQSxFQUFBLFNBQWlCO1FBQWxGLGdCQUFXLEdBQVgsV0FBVyxDQUFTO1FBQVksUUFBRyxHQUFILEdBQUcsQ0FBa0I7UUFBWSxVQUFLLEdBQUwsS0FBSyxDQUFZO0lBQUcsQ0FBQztJQU01RyxzQkFFSSxrQ0FBRTs7OztRQUZOO1lBR0UsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ2xCLENBQUM7Ozs7O1FBQ0QsVUFBTyxLQUFhO1lBQ2xCLElBQUksQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDO1lBQ2pCLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFO2dCQUN6QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQzthQUNsQztRQUNILENBQUM7OztPQU5BOzs7Ozs7O0lBVVMscURBQXdCOzs7Ozs7SUFBbEMsVUFBc0MsS0FBa0MsRUFBRSxhQUFpQjtRQUN6RixPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQzNELENBQUM7Ozs7SUFFRCxxQ0FBUTs7O0lBQVI7UUFDRSxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsRixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3RFLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNaLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztTQUNyQzthQUFNO1lBQ0wsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDO1NBQ3JDO1FBQ0QsOEdBQThHO0lBQ2hILENBQUM7O3FCQTNCQSxXQUFXLFlBQ1gsS0FBSzs7SUEyQlIseUJBQUM7Q0FBQSxBQXJDRCxJQXFDQztTQXJDWSxrQkFBa0I7OztJQUs3Qiw4Q0FBNkM7O0lBRTdDLGlDQUFZOztJQWNaLGdEQUFxQzs7SUFsQnpCLHlDQUE4Qjs7SUFBRSxpQ0FBK0I7O0lBQUUsbUNBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IEhvc3RCaW5kaW5nLCBJbmplY3Rpb25Ub2tlbiwgSW5qZWN0b3IsIElucHV0LCBPbkluaXQsIFR5cGUsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgSG9zdFdyYXBwZXIgfSBmcm9tICcuLi8uLi91dGlscy9ob3N0LXdyYXBwaW5nL2hvc3Qtd3JhcHBlcic7XG5pbXBvcnQgeyBEeW5hbWljV3JhcHBlciB9IGZyb20gJy4uLy4uL3V0aWxzL2hvc3Qtd3JhcHBpbmcvZHluYW1pYy13cmFwcGVyJztcblxuaW1wb3J0IHsgQ29udHJvbElkU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2NvbnRyb2wtaWQuc2VydmljZSc7XG5cbmV4cG9ydCBjbGFzcyBXcmFwcGVkRm9ybUNvbnRyb2w8VyBleHRlbmRzIER5bmFtaWNXcmFwcGVyPiBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIC8vIEkgbG9zdCB3YXkgdG9vIG11Y2ggdGltZSB0cnlpbmcgdG8gbWFrZSB0aGlzIHdvcmsgd2l0aG91dCBpbmplY3RpbmcgdGhlIFZpZXdDb250YWluZXJSZWYgYW5kIHRoZSBJbmplY3RvcixcbiAgLy8gSSdtIGdpdmluZyB1cC4gU28gd2UgaGF2ZSB0byBpbmplY3QgdGhlc2UgdHdvIG1hbnVhbGx5IGZvciBub3cuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCB3cmFwcGVyVHlwZTogVHlwZTxXPiwgcHJvdGVjdGVkIHZjcjogVmlld0NvbnRhaW5lclJlZiwgcHJvdGVjdGVkIGluZGV4OiBudW1iZXIgPSAwKSB7fVxuXG4gIHByb3RlY3RlZCBjb250cm9sSWRTZXJ2aWNlOiBDb250cm9sSWRTZXJ2aWNlO1xuXG4gIF9pZDogc3RyaW5nO1xuXG4gIEBIb3N0QmluZGluZygpXG4gIEBJbnB1dCgpXG4gIGdldCBpZCgpIHtcbiAgICByZXR1cm4gdGhpcy5faWQ7XG4gIH1cbiAgc2V0IGlkKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9pZCA9IHZhbHVlO1xuICAgIGlmICh0aGlzLmNvbnRyb2xJZFNlcnZpY2UpIHtcbiAgICAgIHRoaXMuY29udHJvbElkU2VydmljZS5pZCA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2NvbnRhaW5lckluamVjdG9yOiBJbmplY3RvcjtcblxuICBwcm90ZWN0ZWQgZ2V0UHJvdmlkZXJGcm9tQ29udGFpbmVyPFQ+KHRva2VuOiBUeXBlPFQ+IHwgSW5qZWN0aW9uVG9rZW48VD4sIG5vdEZvdW5kVmFsdWU/OiBUKTogVCB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnRhaW5lckluamVjdG9yLmdldCh0b2tlbiwgbm90Rm91bmRWYWx1ZSk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLl9jb250YWluZXJJbmplY3RvciA9IG5ldyBIb3N0V3JhcHBlcih0aGlzLndyYXBwZXJUeXBlLCB0aGlzLnZjciwgdGhpcy5pbmRleCk7XG4gICAgdGhpcy5jb250cm9sSWRTZXJ2aWNlID0gdGhpcy5fY29udGFpbmVySW5qZWN0b3IuZ2V0KENvbnRyb2xJZFNlcnZpY2UpO1xuICAgIGlmICh0aGlzLl9pZCkge1xuICAgICAgdGhpcy5jb250cm9sSWRTZXJ2aWNlLmlkID0gdGhpcy5faWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2lkID0gdGhpcy5jb250cm9sSWRTZXJ2aWNlLmlkO1xuICAgIH1cbiAgICAvLyBObyBuZWVkIHRvIHN1YnNjcmliZSB0byBjb250cm9sSWRTZXJ2aWNlLmlkQ2hhbmdlIGJlY2F1c2UgdGhlIGlucHV0IGlzIHRoZSBvbmx5IG9uZSB0aGF0IGNhbiB1cGRhdGUgdGhlIGlkLlxuICB9XG59XG4iXX0=