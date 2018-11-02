/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
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
            this.subscriptions.push(this.markControlService.dirtyChange.subscribe(function () {
                _this.ngControl.control.markAsDirty();
                _this.ngControl.control.updateValueAndValidity();
            }));
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
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    WrappedFormControl.propDecorators = {
        id: [{ type: HostBinding }, { type: Input }],
        triggerValidation: [{ type: HostListener, args: ['blur',] }]
    };
    return WrappedFormControl;
}());
export { WrappedFormControl };
if (false) {
    /** @type {?} */
    WrappedFormControl.prototype.ngControlService;
    /** @type {?} */
    WrappedFormControl.prototype.ifErrorService;
    /** @type {?} */
    WrappedFormControl.prototype.controlClassService;
    /** @type {?} */
    WrappedFormControl.prototype.markControlService;
    /** @type {?} */
    WrappedFormControl.prototype.subscriptions;
    /** @type {?} */
    WrappedFormControl.prototype.index;
    /** @type {?} */
    WrappedFormControl.prototype.controlIdService;
    /** @type {?} */
    WrappedFormControl.prototype._id;
    /** @type {?} */
    WrappedFormControl.prototype._containerInjector;
    /** @type {?} */
    WrappedFormControl.prototype.vcr;
    /** @type {?} */
    WrappedFormControl.prototype.wrapperType;
    /** @type {?} */
    WrappedFormControl.prototype.ngControl;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JhcHBlZC1jb250cm9sLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZm9ybXMvY29tbW9uL3dyYXBwZWQtY29udHJvbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFLQSxPQUFPLEVBQ0wsV0FBVyxFQUVYLFlBQVksRUFFWixLQUFLLEdBT04sTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBR3JFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUU3RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQzs7OztBQUd0RTtJQVlFLDZHQUE2RztJQUM3RyxrRUFBa0U7SUFDbEUsNEJBQ1ksR0FBcUIsRUFDckIsV0FBb0IsRUFDOUIsUUFBa0IsRUFDVixTQUFvQixFQUM1QixRQUFtQixFQUNuQixFQUFjO1FBTmhCLGlCQTBCQztRQXpCVyxRQUFHLEdBQUgsR0FBRyxDQUFrQjtRQUNyQixnQkFBVyxHQUFYLFdBQVcsQ0FBUztRQUV0QixjQUFTLEdBQVQsU0FBUyxDQUFXO1FBWnBCLGtCQUFhLEdBQW1CLEVBQUUsQ0FBQztRQUNuQyxVQUFLLEdBQUcsQ0FBQyxDQUFDO1FBZWxCLElBQUk7WUFDRixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3ZELElBQUksQ0FBQyxjQUFjLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUNuRCxJQUFJLENBQUMsbUJBQW1CLEdBQUcs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QyxpQ0FBK0I7O0lBQy9CLHlDQUE4Qjs7SUFFOUIsdUNBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7XG4gIEhvc3RCaW5kaW5nLFxuICBJbmplY3Rpb25Ub2tlbixcbiAgSG9zdExpc3RlbmVyLFxuICBJbmplY3RvcixcbiAgSW5wdXQsXG4gIE9uSW5pdCxcbiAgVHlwZSxcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgUmVuZGVyZXIyLFxuICBFbGVtZW50UmVmLFxuICBPbkRlc3Ryb3ksXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBIb3N0V3JhcHBlciB9IGZyb20gJy4uLy4uL3V0aWxzL2hvc3Qtd3JhcHBpbmcvaG9zdC13cmFwcGVyJztcbmltcG9ydCB7IER5bmFtaWNXcmFwcGVyIH0gZnJvbSAnLi4vLi4vdXRpbHMvaG9zdC13cmFwcGluZy9keW5hbWljLXdyYXBwZXInO1xuXG5pbXBvcnQgeyBDb250cm9sSWRTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvY29udHJvbC1pZC5zZXJ2aWNlJztcbmltcG9ydCB7IE5nQ29udHJvbFNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9uZy1jb250cm9sLnNlcnZpY2UnO1xuaW1wb3J0IHsgSWZFcnJvclNlcnZpY2UgfSBmcm9tICcuL2lmLWVycm9yL2lmLWVycm9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgTmdDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQ29udHJvbENsYXNzU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2NvbnRyb2wtY2xhc3Muc2VydmljZSc7XG5pbXBvcnQgeyBNYXJrQ29udHJvbFNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9tYXJrLWNvbnRyb2wuc2VydmljZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuZXhwb3J0IGNsYXNzIFdyYXBwZWRGb3JtQ29udHJvbDxXIGV4dGVuZHMgRHluYW1pY1dyYXBwZXI+IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBwcml2YXRlIG5nQ29udHJvbFNlcnZpY2U6IE5nQ29udHJvbFNlcnZpY2U7XG4gIHByaXZhdGUgaWZFcnJvclNlcnZpY2U6IElmRXJyb3JTZXJ2aWNlO1xuICBwcml2YXRlIGNvbnRyb2xDbGFzc1NlcnZpY2U6IENvbnRyb2xDbGFzc1NlcnZpY2U7XG4gIHByaXZhdGUgbWFya0NvbnRyb2xTZXJ2aWNlOiBNYXJrQ29udHJvbFNlcnZpY2U7XG5cbiAgcHJvdGVjdGVkIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG4gIHByb3RlY3RlZCBpbmRleCA9IDA7XG4gIHByb3RlY3RlZCBjb250cm9sSWRTZXJ2aWNlOiBDb250cm9sSWRTZXJ2aWNlO1xuXG4gIF9pZDogc3RyaW5nO1xuXG4gIC8vIEkgbG9zdCB3YXkgdG9vIG11Y2ggdGltZSB0cnlpbmcgdG8gbWFrZSB0aGlzIHdvcmsgd2l0aG91dCBpbmplY3RpbmcgdGhlIFZpZXdDb250YWluZXJSZWYgYW5kIHRoZSBJbmplY3RvcixcbiAgLy8gSSdtIGdpdmluZyB1cC4gU28gd2UgaGF2ZSB0byBpbmplY3QgdGhlc2UgdHdvIG1hbnVhbGx5IGZvciBub3cuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCB2Y3I6IFZpZXdDb250YWluZXJSZWYsXG4gICAgcHJvdGVjdGVkIHdyYXBwZXJUeXBlOiBUeXBlPFc+LFxuICAgIGluamVjdG9yOiBJbmplY3RvcixcbiAgICBwcml2YXRlIG5nQ29udHJvbDogTmdDb250cm9sLFxuICAgIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgZWw6IEVsZW1lbnRSZWZcbiAgKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMubmdDb250cm9sU2VydmljZSA9IGluamVjdG9yLmdldChOZ0NvbnRyb2xTZXJ2aWNlKTtcbiAgICAgIHRoaXMuaWZFcnJvclNlcnZpY2UgPSBpbmplY3Rvci5nZXQoSWZFcnJvclNlcnZpY2UpO1xuICAgICAgdGhpcy5jb250cm9sQ2xhc3NTZXJ2aWNlID0gaW5qZWN0b3IuZ2V0KENvbnRyb2xDbGFzc1NlcnZpY2UpO1xuICAgICAgdGhpcy5tYXJrQ29udHJvbFNlcnZpY2UgPSBpbmplY3Rvci5nZXQoTWFya0NvbnRyb2xTZXJ2aWNlKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuXG4gICAgaWYgKHRoaXMuY29udHJvbENsYXNzU2VydmljZSkge1xuICAgICAgdGhpcy5jb250cm9sQ2xhc3NTZXJ2aWNlLmluaXRDb250cm9sQ2xhc3MocmVuZGVyZXIsIGVsLm5hdGl2ZUVsZW1lbnQpO1xuICAgIH1cbiAgICBpZiAodGhpcy5tYXJrQ29udHJvbFNlcnZpY2UpIHtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgICB0aGlzLm1hcmtDb250cm9sU2VydmljZS5kaXJ0eUNoYW5nZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIHRoaXMubmdDb250cm9sLmNvbnRyb2wubWFya0FzRGlydHkoKTtcbiAgICAgICAgICB0aGlzLm5nQ29udHJvbC5jb250cm9sLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RCaW5kaW5nKClcbiAgQElucHV0KClcbiAgZ2V0IGlkKCkge1xuICAgIHJldHVybiB0aGlzLl9pZDtcbiAgfVxuICBzZXQgaWQodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX2lkID0gdmFsdWU7XG4gICAgaWYgKHRoaXMuY29udHJvbElkU2VydmljZSkge1xuICAgICAgdGhpcy5jb250cm9sSWRTZXJ2aWNlLmlkID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignYmx1cicpXG4gIHRyaWdnZXJWYWxpZGF0aW9uKCkge1xuICAgIGlmICh0aGlzLmlmRXJyb3JTZXJ2aWNlKSB7XG4gICAgICB0aGlzLmlmRXJyb3JTZXJ2aWNlLnRyaWdnZXJTdGF0dXNDaGFuZ2UoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9jb250YWluZXJJbmplY3RvcjogSW5qZWN0b3I7XG5cbiAgcHJvdGVjdGVkIGdldFByb3ZpZGVyRnJvbUNvbnRhaW5lcjxUPih0b2tlbjogVHlwZTxUPiB8IEluamVjdGlvblRva2VuPFQ+LCBub3RGb3VuZFZhbHVlPzogVCk6IFQge1xuICAgIHJldHVybiB0aGlzLl9jb250YWluZXJJbmplY3Rvci5nZXQodG9rZW4sIG5vdEZvdW5kVmFsdWUpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5fY29udGFpbmVySW5qZWN0b3IgPSBuZXcgSG9zdFdyYXBwZXIodGhpcy53cmFwcGVyVHlwZSwgdGhpcy52Y3IsIHRoaXMuaW5kZXgpO1xuICAgIHRoaXMuY29udHJvbElkU2VydmljZSA9IHRoaXMuX2NvbnRhaW5lckluamVjdG9yLmdldChDb250cm9sSWRTZXJ2aWNlKTtcbiAgICBpZiAodGhpcy5faWQpIHtcbiAgICAgIHRoaXMuY29udHJvbElkU2VydmljZS5pZCA9IHRoaXMuX2lkO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9pZCA9IHRoaXMuY29udHJvbElkU2VydmljZS5pZDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5uZ0NvbnRyb2xTZXJ2aWNlKSB7XG4gICAgICB0aGlzLm5nQ29udHJvbFNlcnZpY2Uuc2V0Q29udHJvbCh0aGlzLm5nQ29udHJvbCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmZvckVhY2goc3ViID0+IHN1Yi51bnN1YnNjcmliZSgpKTtcbiAgfVxufVxuIl19