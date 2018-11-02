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
export class WrappedFormControl {
    // I lost way too much time trying to make this work without injecting the ViewContainerRef and the Injector,
    // I'm giving up. So we have to inject these two manually for now.
    /**
     * @param {?} vcr
     * @param {?} wrapperType
     * @param {?} injector
     * @param {?} ngControl
     * @param {?} renderer
     * @param {?} el
     */
    constructor(vcr, wrapperType, injector, ngControl, renderer, el) {
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
            this.subscriptions.push(this.markControlService.dirtyChange.subscribe(() => {
                this.ngControl.control.markAsDirty();
                this.ngControl.control.updateValueAndValidity();
            }));
        }
    }
    /**
     * @return {?}
     */
    get id() {
        return this._id;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set id(value) {
        this._id = value;
        if (this.controlIdService) {
            this.controlIdService.id = value;
        }
    }
    /**
     * @return {?}
     */
    triggerValidation() {
        if (this.ifErrorService) {
            this.ifErrorService.triggerStatusChange();
        }
    }
    /**
     * @template T
     * @param {?} token
     * @param {?=} notFoundValue
     * @return {?}
     */
    getProviderFromContainer(token, notFoundValue) {
        return this._containerInjector.get(token, notFoundValue);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
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
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
}
WrappedFormControl.propDecorators = {
    id: [{ type: HostBinding }, { type: Input }],
    triggerValidation: [{ type: HostListener, args: ['blur',] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JhcHBlZC1jb250cm9sLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZm9ybXMvY29tbW9uL3dyYXBwZWQtY29udHJvbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFLQSxPQUFPLEVBQ0wsV0FBVyxFQUVYLFlBQVksRUFFWixLQUFLLEdBT04sTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBR3JFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUU3RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQzs7OztBQUd0RSxNQUFNLE9BQU8sa0JBQWtCOzs7Ozs7Ozs7OztJQWM3QixZQUNZLEdBQXFCLEVBQ3JCLFdBQW9CLEVBQzlCLFFBQWtCLEVBQ1YsU0FBb0IsRUFDNUIsUUFBbUIsRUFDbkIsRUFBYztRQUxKLFFBQUcsR0FBSCxHQUFHLENBQWtCO1FBQ3JCLGdCQUFXLEdBQVgsV0FBVyxDQUFTO1FBRXRCLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFacEIsa0JBQWEsR0FBbUIsRUFBRSxDQUFDO1FBQ25DLFVBQUssR0FBRyxDQUFDLENBQUM7UUFlbEIsSUFBSTtZQUNGLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDdkQsSUFBSSxDQUFDLGNBQWMsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ25ELElBQUksQ0FBQyxtQkFBbUIsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFDN0QsSUFBSSxDQUFDLGtCQUFrQixHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztTQUM1RDtRQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUU7UUFFZCxJQUFJLElBQUksQ0FBQyxtQkFBbUIsRUFBRTtZQUM1QixJQUFJLENBQUMsbUJBQW1CLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUN2RTtRQUNELElBQUksSUFBSSxDQUFDLGtCQUFrQixFQUFFO1lBQzNCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUNyQixJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2pELElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUNyQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1lBQ2xELENBQUMsQ0FBQyxDQUNILENBQUM7U0FDSDtJQUNILENBQUM7Ozs7SUFFRCxJQUVJLEVBQUU7UUFDSixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDbEIsQ0FBQzs7Ozs7SUFDRCxJQUFJLEVBQUUsQ0FBQyxLQUFhO1FBQ2xCLElBQUksQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBQ3pCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDO1NBQ2xDO0lBQ0gsQ0FBQzs7OztJQUdELGlCQUFpQjtRQUNmLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUN2QixJQUFJLENBQUMsY0FBYyxDQUFDLG1CQUFtQixFQUFFLENBQUM7U0FDM0M7SUFDSCxDQUFDOzs7Ozs7O0lBSVMsd0JBQXdCLENBQUksS0FBa0MsRUFBRSxhQUFpQjtRQUN6RixPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQzNELENBQUM7Ozs7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbEYsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUN0RSxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDWixJQUFJLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7U0FDckM7YUFBTTtZQUNMLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQztTQUNyQztRQUVELElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBQ3pCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ2xEO0lBQ0gsQ0FBQzs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7OztpQkF6Q0EsV0FBVyxZQUNYLEtBQUs7Z0NBV0wsWUFBWSxTQUFDLE1BQU07Ozs7SUFyRHBCLDhDQUEyQzs7SUFDM0MsNENBQXVDOztJQUN2QyxpREFBaUQ7O0lBQ2pELGdEQUErQzs7SUFFL0MsMkNBQTZDOztJQUM3QyxtQ0FBb0I7O0lBQ3BCLDhDQUE2Qzs7SUFFN0MsaUNBQVk7O0lBbURaLGdEQUFxQzs7SUE5Q25DLGlDQUErQjs7SUFDL0IseUNBQThCOztJQUU5Qix1Q0FBNEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHtcbiAgSG9zdEJpbmRpbmcsXG4gIEluamVjdGlvblRva2VuLFxuICBIb3N0TGlzdGVuZXIsXG4gIEluamVjdG9yLFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBUeXBlLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBSZW5kZXJlcjIsXG4gIEVsZW1lbnRSZWYsXG4gIE9uRGVzdHJveSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEhvc3RXcmFwcGVyIH0gZnJvbSAnLi4vLi4vdXRpbHMvaG9zdC13cmFwcGluZy9ob3N0LXdyYXBwZXInO1xuaW1wb3J0IHsgRHluYW1pY1dyYXBwZXIgfSBmcm9tICcuLi8uLi91dGlscy9ob3N0LXdyYXBwaW5nL2R5bmFtaWMtd3JhcHBlcic7XG5cbmltcG9ydCB7IENvbnRyb2xJZFNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9jb250cm9sLWlkLnNlcnZpY2UnO1xuaW1wb3J0IHsgTmdDb250cm9sU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL25nLWNvbnRyb2wuc2VydmljZSc7XG5pbXBvcnQgeyBJZkVycm9yU2VydmljZSB9IGZyb20gJy4vaWYtZXJyb3IvaWYtZXJyb3Iuc2VydmljZSc7XG5pbXBvcnQgeyBOZ0NvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDb250cm9sQ2xhc3NTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvY29udHJvbC1jbGFzcy5zZXJ2aWNlJztcbmltcG9ydCB7IE1hcmtDb250cm9sU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL21hcmstY29udHJvbC5zZXJ2aWNlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5leHBvcnQgY2xhc3MgV3JhcHBlZEZvcm1Db250cm9sPFcgZXh0ZW5kcyBEeW5hbWljV3JhcHBlcj4gaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgbmdDb250cm9sU2VydmljZTogTmdDb250cm9sU2VydmljZTtcbiAgcHJpdmF0ZSBpZkVycm9yU2VydmljZTogSWZFcnJvclNlcnZpY2U7XG4gIHByaXZhdGUgY29udHJvbENsYXNzU2VydmljZTogQ29udHJvbENsYXNzU2VydmljZTtcbiAgcHJpdmF0ZSBtYXJrQ29udHJvbFNlcnZpY2U6IE1hcmtDb250cm9sU2VydmljZTtcblxuICBwcm90ZWN0ZWQgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcbiAgcHJvdGVjdGVkIGluZGV4ID0gMDtcbiAgcHJvdGVjdGVkIGNvbnRyb2xJZFNlcnZpY2U6IENvbnRyb2xJZFNlcnZpY2U7XG5cbiAgX2lkOiBzdHJpbmc7XG5cbiAgLy8gSSBsb3N0IHdheSB0b28gbXVjaCB0aW1lIHRyeWluZyB0byBtYWtlIHRoaXMgd29yayB3aXRob3V0IGluamVjdGluZyB0aGUgVmlld0NvbnRhaW5lclJlZiBhbmQgdGhlIEluamVjdG9yLFxuICAvLyBJJ20gZ2l2aW5nIHVwLiBTbyB3ZSBoYXZlIHRvIGluamVjdCB0aGVzZSB0d28gbWFudWFsbHkgZm9yIG5vdy5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIHZjcjogVmlld0NvbnRhaW5lclJlZixcbiAgICBwcm90ZWN0ZWQgd3JhcHBlclR5cGU6IFR5cGU8Vz4sXG4gICAgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgIHByaXZhdGUgbmdDb250cm9sOiBOZ0NvbnRyb2wsXG4gICAgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBlbDogRWxlbWVudFJlZlxuICApIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5uZ0NvbnRyb2xTZXJ2aWNlID0gaW5qZWN0b3IuZ2V0KE5nQ29udHJvbFNlcnZpY2UpO1xuICAgICAgdGhpcy5pZkVycm9yU2VydmljZSA9IGluamVjdG9yLmdldChJZkVycm9yU2VydmljZSk7XG4gICAgICB0aGlzLmNvbnRyb2xDbGFzc1NlcnZpY2UgPSBpbmplY3Rvci5nZXQoQ29udHJvbENsYXNzU2VydmljZSk7XG4gICAgICB0aGlzLm1hcmtDb250cm9sU2VydmljZSA9IGluamVjdG9yLmdldChNYXJrQ29udHJvbFNlcnZpY2UpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG5cbiAgICBpZiAodGhpcy5jb250cm9sQ2xhc3NTZXJ2aWNlKSB7XG4gICAgICB0aGlzLmNvbnRyb2xDbGFzc1NlcnZpY2UuaW5pdENvbnRyb2xDbGFzcyhyZW5kZXJlciwgZWwubmF0aXZlRWxlbWVudCk7XG4gICAgfVxuICAgIGlmICh0aGlzLm1hcmtDb250cm9sU2VydmljZSkge1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICAgIHRoaXMubWFya0NvbnRyb2xTZXJ2aWNlLmRpcnR5Q2hhbmdlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5uZ0NvbnRyb2wuY29udHJvbC5tYXJrQXNEaXJ0eSgpO1xuICAgICAgICAgIHRoaXMubmdDb250cm9sLmNvbnRyb2wudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBASG9zdEJpbmRpbmcoKVxuICBASW5wdXQoKVxuICBnZXQgaWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2lkO1xuICB9XG4gIHNldCBpZCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5faWQgPSB2YWx1ZTtcbiAgICBpZiAodGhpcy5jb250cm9sSWRTZXJ2aWNlKSB7XG4gICAgICB0aGlzLmNvbnRyb2xJZFNlcnZpY2UuaWQgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdibHVyJylcbiAgdHJpZ2dlclZhbGlkYXRpb24oKSB7XG4gICAgaWYgKHRoaXMuaWZFcnJvclNlcnZpY2UpIHtcbiAgICAgIHRoaXMuaWZFcnJvclNlcnZpY2UudHJpZ2dlclN0YXR1c0NoYW5nZSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2NvbnRhaW5lckluamVjdG9yOiBJbmplY3RvcjtcblxuICBwcm90ZWN0ZWQgZ2V0UHJvdmlkZXJGcm9tQ29udGFpbmVyPFQ+KHRva2VuOiBUeXBlPFQ+IHwgSW5qZWN0aW9uVG9rZW48VD4sIG5vdEZvdW5kVmFsdWU/OiBUKTogVCB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnRhaW5lckluamVjdG9yLmdldCh0b2tlbiwgbm90Rm91bmRWYWx1ZSk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLl9jb250YWluZXJJbmplY3RvciA9IG5ldyBIb3N0V3JhcHBlcih0aGlzLndyYXBwZXJUeXBlLCB0aGlzLnZjciwgdGhpcy5pbmRleCk7XG4gICAgdGhpcy5jb250cm9sSWRTZXJ2aWNlID0gdGhpcy5fY29udGFpbmVySW5qZWN0b3IuZ2V0KENvbnRyb2xJZFNlcnZpY2UpO1xuICAgIGlmICh0aGlzLl9pZCkge1xuICAgICAgdGhpcy5jb250cm9sSWRTZXJ2aWNlLmlkID0gdGhpcy5faWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2lkID0gdGhpcy5jb250cm9sSWRTZXJ2aWNlLmlkO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm5nQ29udHJvbFNlcnZpY2UpIHtcbiAgICAgIHRoaXMubmdDb250cm9sU2VydmljZS5zZXRDb250cm9sKHRoaXMubmdDb250cm9sKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaChzdWIgPT4gc3ViLnVuc3Vic2NyaWJlKCkpO1xuICB9XG59XG4iXX0=