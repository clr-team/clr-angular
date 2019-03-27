/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { HostBinding, HostListener, Input, } from '@angular/core';
import { HostWrapper } from '../../utils/host-wrapping/host-wrapper';
import { ControlIdService } from './providers/control-id.service';
import { NgControlService } from './providers/ng-control.service';
import { IfErrorService } from './if-error/if-error.service';
import { ControlClassService } from './providers/control-class.service';
import { MarkControlService } from './providers/mark-control.service';
/**
 * @template W
 */
var WrappedFormControl = /** @class */ (function () {
    // I lost way too much time trying to make this work without injecting the ViewContainerRef and the Injector,
    // I'm giving up. So we have to inject these two manually for now.
    function WrappedFormControl(vcr, wrapperType, injector, ngControl, renderer, el) {
        var _this = this;
        this.vcr = vcr;
        this.wrapperType = wrapperType;
        this.ngControl = ngControl;
        this.subscriptions = [];
        this.index = 0;
        try {
            this.ngControlService = injector.get(NgControlService);
            this.ifErrorService = injector.get(IfErrorService);
            this.controlClassService = injector.get(ControlClassService);
            this.markControlService = injector.get(MarkControlService);
        }
        catch (e) { }
        if (this.controlClassService) {
            this.controlClassService.initControlClass(renderer, el.nativeElement);
        }
        if (this.markControlService) {
            this.subscriptions.push(this.markControlService.touchedChange.subscribe((/**
             * @return {?}
             */
            function () {
                _this.ngControl.control.markAsTouched();
                _this.ngControl.control.updateValueAndValidity();
            })));
        }
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
     * @return {?}
     */
    WrappedFormControl.prototype.triggerValidation = /**
     * @return {?}
     */
    function () {
        if (this.ifErrorService) {
            this.ifErrorService.triggerStatusChange();
        }
    };
    // @TODO This method has a try/catch due to an unknown issue that came when building the clrToggle feature
    // We need to figure out why this fails for the ClrToggle scenario but works for Date picker...
    // To see the error, remove the try/catch here and run the ClrToggle suite to see issues getting the container
    // injector in time, and this ONLY HAPPENS in tests and not in dev/prod mode.
    // @TODO This method has a try/catch due to an unknown issue that came when building the clrToggle feature
    // We need to figure out why this fails for the ClrToggle scenario but works for Date picker...
    // To see the error, remove the try/catch here and run the ClrToggle suite to see issues getting the container
    // injector in time, and this ONLY HAPPENS in tests and not in dev/prod mode.
    /**
     * @protected
     * @template T
     * @param {?} token
     * @param {?=} notFoundValue
     * @return {?}
     */
    WrappedFormControl.prototype.getProviderFromContainer = 
    // @TODO This method has a try/catch due to an unknown issue that came when building the clrToggle feature
    // We need to figure out why this fails for the ClrToggle scenario but works for Date picker...
    // To see the error, remove the try/catch here and run the ClrToggle suite to see issues getting the container
    // injector in time, and this ONLY HAPPENS in tests and not in dev/prod mode.
    /**
     * @protected
     * @template T
     * @param {?} token
     * @param {?=} notFoundValue
     * @return {?}
     */
    function (token, notFoundValue) {
        try {
            return this._containerInjector.get(token, notFoundValue);
        }
        catch (e) {
            return notFoundValue;
        }
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
        if (this.ngControlService) {
            this.ngControlService.setControl(this.ngControl);
        }
    };
    /**
     * @return {?}
     */
    WrappedFormControl.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        function (sub) { return sub.unsubscribe(); }));
    };
    WrappedFormControl.propDecorators = {
        id: [{ type: HostBinding }, { type: Input }],
        triggerValidation: [{ type: HostListener, args: ['blur',] }]
    };
    return WrappedFormControl;
}());
export { WrappedFormControl };
if (false) {
    /**
     * @type {?}
     * @private
     */
    WrappedFormControl.prototype.ngControlService;
    /**
     * @type {?}
     * @private
     */
    WrappedFormControl.prototype.ifErrorService;
    /**
     * @type {?}
     * @private
     */
    WrappedFormControl.prototype.controlClassService;
    /**
     * @type {?}
     * @private
     */
    WrappedFormControl.prototype.markControlService;
    /**
     * @type {?}
     * @protected
     */
    WrappedFormControl.prototype.subscriptions;
    /**
     * @type {?}
     * @protected
     */
    WrappedFormControl.prototype.index;
    /**
     * @type {?}
     * @protected
     */
    WrappedFormControl.prototype.controlIdService;
    /** @type {?} */
    WrappedFormControl.prototype._id;
    /**
     * @type {?}
     * @private
     */
    WrappedFormControl.prototype._containerInjector;
    /**
     * @type {?}
     * @protected
     */
    WrappedFormControl.prototype.vcr;
    /**
     * @type {?}
     * @protected
     */
    WrappedFormControl.prototype.wrapperType;
    /**
     * @type {?}
     * @private
     */
    WrappedFormControl.prototype.ngControl;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JhcHBlZC1jb250cm9sLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZm9ybXMvY29tbW9uL3dyYXBwZWQtY29udHJvbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFLQSxPQUFPLEVBQ0wsV0FBVyxFQUVYLFlBQVksRUFFWixLQUFLLEdBT04sTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBR3JFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUU3RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQzs7OztBQUd0RTtJQVlFLDZHQUE2RztJQUM3RyxrRUFBa0U7SUFDbEUsNEJBQ1ksR0FBcUIsRUFDckIsV0FBb0IsRUFDOUIsUUFBa0IsRUFDVixTQUFvQixFQUM1QixRQUFtQixFQUNuQixFQUFjO1FBTmhCLGlCQTBCQztRQXpCVyxRQUFHLEdBQUgsR0FBRyxDQUFrQjtRQUNyQixnQkFBVyxHQUFYLFdBQVcsQ0FBUztRQUV0QixjQUFTLEdBQVQsU0FBUyxDQUFXO1FBWnBCLGtCQUFhLEdBQW1CLEVBQUUsQ0FBQztRQUNuQyxVQUFLLEdBQUcsQ0FBQyxDQUFDO1FBZWxCLElBQUk7WUFDRixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3ZELElBQUksQ0FBQyxjQUFjLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUNuRCxJQUFJLENBQUMsbUJBQW1CLEdBQUcs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OztJQUM3Qiw4Q0FBMkM7Ozs7O0lBQzNDLDRDQUF1Qzs7Ozs7SUFDdkMsaURBQWlEOzs7OztJQUNqRCxnREFBK0M7Ozs7O0lBRS9DLDJDQUE2Qzs7Ozs7SUFDN0MsbUNBQW9COzs7OztJQUNwQiw4Q0FBNkM7O0lBRTdDLGlDQUFZOzs7OztJQW1EWixnREFBcUM7Ozs7O0lBOUNuQyxpQ0FBK0I7Ozs7O0lBQy9CLHlDQUE4Qjs7Ozs7SUFFOUIsdUNBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7XG4gIEhvc3RCaW5kaW5nLFxuICBJbmplY3Rpb25Ub2tlbixcbiAgSG9zdExpc3RlbmVyLFxuICBJbmplY3RvcixcbiAgSW5wdXQsXG4gIE9uSW5pdCxcbiAgVHlwZSxcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgUmVuZGVyZXIyLFxuICBFbGVtZW50UmVmLFxuICBPbkRlc3Ryb3ksXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBIb3N0V3JhcHBlciB9IGZyb20gJy4uLy4uL3V0aWxzL2hvc3Qtd3JhcHBpbmcvaG9zdC13cmFwcGVyJztcbmltcG9ydCB7IER5bmFtaWNXcmFwcGVyIH0gZnJvbSAnLi4vLi4vdXRpbHMvaG9zdC13cmFwcGluZy9keW5hbWljLXdyYXBwZXInO1xuXG5pbXBvcnQgeyBDb250cm9sSWRTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvY29udHJvbC1pZC5zZXJ2aWNlJztcbmltcG9ydCB7IE5nQ29udHJvbFNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9uZy1jb250cm9sLnNlcnZpY2UnO1xuaW1wb3J0IHsgSWZFcnJvclNlcnZpY2UgfSBmcm9tICcuL2lmLWVycm9yL2lmLWVycm9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgTmdDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQ29udHJvbENsYXNzU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2NvbnRyb2wtY2xhc3Muc2VydmljZSc7XG5pbXBvcnQgeyBNYXJrQ29udHJvbFNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9tYXJrLWNvbnRyb2wuc2VydmljZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuZXhwb3J0IGNsYXNzIFdyYXBwZWRGb3JtQ29udHJvbDxXIGV4dGVuZHMgRHluYW1pY1dyYXBwZXI+IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBwcml2YXRlIG5nQ29udHJvbFNlcnZpY2U6IE5nQ29udHJvbFNlcnZpY2U7XG4gIHByaXZhdGUgaWZFcnJvclNlcnZpY2U6IElmRXJyb3JTZXJ2aWNlO1xuICBwcml2YXRlIGNvbnRyb2xDbGFzc1NlcnZpY2U6IENvbnRyb2xDbGFzc1NlcnZpY2U7XG4gIHByaXZhdGUgbWFya0NvbnRyb2xTZXJ2aWNlOiBNYXJrQ29udHJvbFNlcnZpY2U7XG5cbiAgcHJvdGVjdGVkIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG4gIHByb3RlY3RlZCBpbmRleCA9IDA7XG4gIHByb3RlY3RlZCBjb250cm9sSWRTZXJ2aWNlOiBDb250cm9sSWRTZXJ2aWNlO1xuXG4gIF9pZDogc3RyaW5nO1xuXG4gIC8vIEkgbG9zdCB3YXkgdG9vIG11Y2ggdGltZSB0cnlpbmcgdG8gbWFrZSB0aGlzIHdvcmsgd2l0aG91dCBpbmplY3RpbmcgdGhlIFZpZXdDb250YWluZXJSZWYgYW5kIHRoZSBJbmplY3RvcixcbiAgLy8gSSdtIGdpdmluZyB1cC4gU28gd2UgaGF2ZSB0byBpbmplY3QgdGhlc2UgdHdvIG1hbnVhbGx5IGZvciBub3cuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCB2Y3I6IFZpZXdDb250YWluZXJSZWYsXG4gICAgcHJvdGVjdGVkIHdyYXBwZXJUeXBlOiBUeXBlPFc+LFxuICAgIGluamVjdG9yOiBJbmplY3RvcixcbiAgICBwcml2YXRlIG5nQ29udHJvbDogTmdDb250cm9sLFxuICAgIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgZWw6IEVsZW1lbnRSZWZcbiAgKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMubmdDb250cm9sU2VydmljZSA9IGluamVjdG9yLmdldChOZ0NvbnRyb2xTZXJ2aWNlKTtcbiAgICAgIHRoaXMuaWZFcnJvclNlcnZpY2UgPSBpbmplY3Rvci5nZXQoSWZFcnJvclNlcnZpY2UpO1xuICAgICAgdGhpcy5jb250cm9sQ2xhc3NTZXJ2aWNlID0gaW5qZWN0b3IuZ2V0KENvbnRyb2xDbGFzc1NlcnZpY2UpO1xuICAgICAgdGhpcy5tYXJrQ29udHJvbFNlcnZpY2UgPSBpbmplY3Rvci5nZXQoTWFya0NvbnRyb2xTZXJ2aWNlKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuXG4gICAgaWYgKHRoaXMuY29udHJvbENsYXNzU2VydmljZSkge1xuICAgICAgdGhpcy5jb250cm9sQ2xhc3NTZXJ2aWNlLmluaXRDb250cm9sQ2xhc3MocmVuZGVyZXIsIGVsLm5hdGl2ZUVsZW1lbnQpO1xuICAgIH1cbiAgICBpZiAodGhpcy5tYXJrQ29udHJvbFNlcnZpY2UpIHtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgICB0aGlzLm1hcmtDb250cm9sU2VydmljZS50b3VjaGVkQ2hhbmdlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5uZ0NvbnRyb2wuY29udHJvbC5tYXJrQXNUb3VjaGVkKCk7XG4gICAgICAgICAgdGhpcy5uZ0NvbnRyb2wuY29udHJvbC51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0QmluZGluZygpXG4gIEBJbnB1dCgpXG4gIGdldCBpZCgpIHtcbiAgICByZXR1cm4gdGhpcy5faWQ7XG4gIH1cbiAgc2V0IGlkKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9pZCA9IHZhbHVlO1xuICAgIGlmICh0aGlzLmNvbnRyb2xJZFNlcnZpY2UpIHtcbiAgICAgIHRoaXMuY29udHJvbElkU2VydmljZS5pZCA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2JsdXInKVxuICB0cmlnZ2VyVmFsaWRhdGlvbigpIHtcbiAgICBpZiAodGhpcy5pZkVycm9yU2VydmljZSkge1xuICAgICAgdGhpcy5pZkVycm9yU2VydmljZS50cmlnZ2VyU3RhdHVzQ2hhbmdlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfY29udGFpbmVySW5qZWN0b3I6IEluamVjdG9yO1xuXG4gIC8vIEBUT0RPIFRoaXMgbWV0aG9kIGhhcyBhIHRyeS9jYXRjaCBkdWUgdG8gYW4gdW5rbm93biBpc3N1ZSB0aGF0IGNhbWUgd2hlbiBidWlsZGluZyB0aGUgY2xyVG9nZ2xlIGZlYXR1cmVcbiAgLy8gV2UgbmVlZCB0byBmaWd1cmUgb3V0IHdoeSB0aGlzIGZhaWxzIGZvciB0aGUgQ2xyVG9nZ2xlIHNjZW5hcmlvIGJ1dCB3b3JrcyBmb3IgRGF0ZSBwaWNrZXIuLi5cbiAgLy8gVG8gc2VlIHRoZSBlcnJvciwgcmVtb3ZlIHRoZSB0cnkvY2F0Y2ggaGVyZSBhbmQgcnVuIHRoZSBDbHJUb2dnbGUgc3VpdGUgdG8gc2VlIGlzc3VlcyBnZXR0aW5nIHRoZSBjb250YWluZXJcbiAgLy8gaW5qZWN0b3IgaW4gdGltZSwgYW5kIHRoaXMgT05MWSBIQVBQRU5TIGluIHRlc3RzIGFuZCBub3QgaW4gZGV2L3Byb2QgbW9kZS5cbiAgcHJvdGVjdGVkIGdldFByb3ZpZGVyRnJvbUNvbnRhaW5lcjxUPih0b2tlbjogVHlwZTxUPiB8IEluamVjdGlvblRva2VuPFQ+LCBub3RGb3VuZFZhbHVlPzogVCk6IFQge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gdGhpcy5fY29udGFpbmVySW5qZWN0b3IuZ2V0KHRva2VuLCBub3RGb3VuZFZhbHVlKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gbm90Rm91bmRWYWx1ZTtcbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLl9jb250YWluZXJJbmplY3RvciA9IG5ldyBIb3N0V3JhcHBlcih0aGlzLndyYXBwZXJUeXBlLCB0aGlzLnZjciwgdGhpcy5pbmRleCk7XG4gICAgdGhpcy5jb250cm9sSWRTZXJ2aWNlID0gdGhpcy5fY29udGFpbmVySW5qZWN0b3IuZ2V0KENvbnRyb2xJZFNlcnZpY2UpO1xuICAgIGlmICh0aGlzLl9pZCkge1xuICAgICAgdGhpcy5jb250cm9sSWRTZXJ2aWNlLmlkID0gdGhpcy5faWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2lkID0gdGhpcy5jb250cm9sSWRTZXJ2aWNlLmlkO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm5nQ29udHJvbFNlcnZpY2UpIHtcbiAgICAgIHRoaXMubmdDb250cm9sU2VydmljZS5zZXRDb250cm9sKHRoaXMubmdDb250cm9sKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaChzdWIgPT4gc3ViLnVuc3Vic2NyaWJlKCkpO1xuICB9XG59XG4iXX0=