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
            this.subscriptions.push(this.markControlService.touchedChange.subscribe((/**
             * @return {?}
             */
            () => {
                this.ngControl.control.markAsTouched();
                this.ngControl.control.updateValueAndValidity();
            })));
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
    getProviderFromContainer(token, notFoundValue) {
        try {
            return this._containerInjector.get(token, notFoundValue);
        }
        catch (e) {
            return notFoundValue;
        }
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
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        sub => sub.unsubscribe()));
    }
}
WrappedFormControl.propDecorators = {
    id: [{ type: HostBinding }, { type: Input }],
    triggerValidation: [{ type: HostListener, args: ['blur',] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JhcHBlZC1jb250cm9sLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZm9ybXMvY29tbW9uL3dyYXBwZWQtY29udHJvbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFLQSxPQUFPLEVBQ0wsV0FBVyxFQUVYLFlBQVksRUFFWixLQUFLLEdBT04sTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBR3JFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUU3RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQzs7OztBQUd0RSxNQUFNLE9BQU8sa0JBQWtCOzs7Ozs7Ozs7OztJQWM3QixZQUNZLEdBQXFCLEVBQ3JCLFdBQW9CLEVBQzlCLFFBQWtCLEVBQ1YsU0FBb0IsRUFDNUIsUUFBbUIsRUFDbkIsRUFBYztRQUxKLFFBQUcsR0FBSCxHQUFHLENBQWtCO1FBQ3JCLGdCQUFXLEdBQVgsV0FBVyxDQUFTO1FBRXRCLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFacEIsa0JBQWEsR0FBbUIsRUFBRSxDQUFDO1FBQ25DLFVBQUssR0FBRyxDQUFDLENBQUM7UUFlbEIsSUFBSTtZQUNGLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDdkQsSUFBSSxDQUFDLGNBQWMsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ25ELElBQUksQ0FBQyxtQkFBbUIsR0FBRyxRQUFRLENBQUMsR0FB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bkMsaUNBQStCOzs7OztJQUMvQix5Q0FBOEI7Ozs7O0lBRTlCLHVDQUE0QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQge1xuICBIb3N0QmluZGluZyxcbiAgSW5qZWN0aW9uVG9rZW4sXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5qZWN0b3IsXG4gIElucHV0LFxuICBPbkluaXQsXG4gIFR5cGUsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIFJlbmRlcmVyMixcbiAgRWxlbWVudFJlZixcbiAgT25EZXN0cm95LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgSG9zdFdyYXBwZXIgfSBmcm9tICcuLi8uLi91dGlscy9ob3N0LXdyYXBwaW5nL2hvc3Qtd3JhcHBlcic7XG5pbXBvcnQgeyBEeW5hbWljV3JhcHBlciB9IGZyb20gJy4uLy4uL3V0aWxzL2hvc3Qtd3JhcHBpbmcvZHluYW1pYy13cmFwcGVyJztcblxuaW1wb3J0IHsgQ29udHJvbElkU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2NvbnRyb2wtaWQuc2VydmljZSc7XG5pbXBvcnQgeyBOZ0NvbnRyb2xTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvbmctY29udHJvbC5zZXJ2aWNlJztcbmltcG9ydCB7IElmRXJyb3JTZXJ2aWNlIH0gZnJvbSAnLi9pZi1lcnJvci9pZi1lcnJvci5zZXJ2aWNlJztcbmltcG9ydCB7IE5nQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IENvbnRyb2xDbGFzc1NlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9jb250cm9sLWNsYXNzLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWFya0NvbnRyb2xTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvbWFyay1jb250cm9sLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmV4cG9ydCBjbGFzcyBXcmFwcGVkRm9ybUNvbnRyb2w8VyBleHRlbmRzIER5bmFtaWNXcmFwcGVyPiBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBuZ0NvbnRyb2xTZXJ2aWNlOiBOZ0NvbnRyb2xTZXJ2aWNlO1xuICBwcml2YXRlIGlmRXJyb3JTZXJ2aWNlOiBJZkVycm9yU2VydmljZTtcbiAgcHJpdmF0ZSBjb250cm9sQ2xhc3NTZXJ2aWNlOiBDb250cm9sQ2xhc3NTZXJ2aWNlO1xuICBwcml2YXRlIG1hcmtDb250cm9sU2VydmljZTogTWFya0NvbnRyb2xTZXJ2aWNlO1xuXG4gIHByb3RlY3RlZCBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuICBwcm90ZWN0ZWQgaW5kZXggPSAwO1xuICBwcm90ZWN0ZWQgY29udHJvbElkU2VydmljZTogQ29udHJvbElkU2VydmljZTtcblxuICBfaWQ6IHN0cmluZztcblxuICAvLyBJIGxvc3Qgd2F5IHRvbyBtdWNoIHRpbWUgdHJ5aW5nIHRvIG1ha2UgdGhpcyB3b3JrIHdpdGhvdXQgaW5qZWN0aW5nIHRoZSBWaWV3Q29udGFpbmVyUmVmIGFuZCB0aGUgSW5qZWN0b3IsXG4gIC8vIEknbSBnaXZpbmcgdXAuIFNvIHdlIGhhdmUgdG8gaW5qZWN0IHRoZXNlIHR3byBtYW51YWxseSBmb3Igbm93LlxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgdmNyOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIHByb3RlY3RlZCB3cmFwcGVyVHlwZTogVHlwZTxXPixcbiAgICBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgcHJpdmF0ZSBuZ0NvbnRyb2w6IE5nQ29udHJvbCxcbiAgICByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIGVsOiBFbGVtZW50UmVmXG4gICkge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLm5nQ29udHJvbFNlcnZpY2UgPSBpbmplY3Rvci5nZXQoTmdDb250cm9sU2VydmljZSk7XG4gICAgICB0aGlzLmlmRXJyb3JTZXJ2aWNlID0gaW5qZWN0b3IuZ2V0KElmRXJyb3JTZXJ2aWNlKTtcbiAgICAgIHRoaXMuY29udHJvbENsYXNzU2VydmljZSA9IGluamVjdG9yLmdldChDb250cm9sQ2xhc3NTZXJ2aWNlKTtcbiAgICAgIHRoaXMubWFya0NvbnRyb2xTZXJ2aWNlID0gaW5qZWN0b3IuZ2V0KE1hcmtDb250cm9sU2VydmljZSk7XG4gICAgfSBjYXRjaCAoZSkge31cblxuICAgIGlmICh0aGlzLmNvbnRyb2xDbGFzc1NlcnZpY2UpIHtcbiAgICAgIHRoaXMuY29udHJvbENsYXNzU2VydmljZS5pbml0Q29udHJvbENsYXNzKHJlbmRlcmVyLCBlbC5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG4gICAgaWYgKHRoaXMubWFya0NvbnRyb2xTZXJ2aWNlKSB7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgICAgdGhpcy5tYXJrQ29udHJvbFNlcnZpY2UudG91Y2hlZENoYW5nZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIHRoaXMubmdDb250cm9sLmNvbnRyb2wubWFya0FzVG91Y2hlZCgpO1xuICAgICAgICAgIHRoaXMubmdDb250cm9sLmNvbnRyb2wudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBASG9zdEJpbmRpbmcoKVxuICBASW5wdXQoKVxuICBnZXQgaWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2lkO1xuICB9XG4gIHNldCBpZCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5faWQgPSB2YWx1ZTtcbiAgICBpZiAodGhpcy5jb250cm9sSWRTZXJ2aWNlKSB7XG4gICAgICB0aGlzLmNvbnRyb2xJZFNlcnZpY2UuaWQgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdibHVyJylcbiAgdHJpZ2dlclZhbGlkYXRpb24oKSB7XG4gICAgaWYgKHRoaXMuaWZFcnJvclNlcnZpY2UpIHtcbiAgICAgIHRoaXMuaWZFcnJvclNlcnZpY2UudHJpZ2dlclN0YXR1c0NoYW5nZSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2NvbnRhaW5lckluamVjdG9yOiBJbmplY3RvcjtcblxuICAvLyBAVE9ETyBUaGlzIG1ldGhvZCBoYXMgYSB0cnkvY2F0Y2ggZHVlIHRvIGFuIHVua25vd24gaXNzdWUgdGhhdCBjYW1lIHdoZW4gYnVpbGRpbmcgdGhlIGNsclRvZ2dsZSBmZWF0dXJlXG4gIC8vIFdlIG5lZWQgdG8gZmlndXJlIG91dCB3aHkgdGhpcyBmYWlscyBmb3IgdGhlIENsclRvZ2dsZSBzY2VuYXJpbyBidXQgd29ya3MgZm9yIERhdGUgcGlja2VyLi4uXG4gIC8vIFRvIHNlZSB0aGUgZXJyb3IsIHJlbW92ZSB0aGUgdHJ5L2NhdGNoIGhlcmUgYW5kIHJ1biB0aGUgQ2xyVG9nZ2xlIHN1aXRlIHRvIHNlZSBpc3N1ZXMgZ2V0dGluZyB0aGUgY29udGFpbmVyXG4gIC8vIGluamVjdG9yIGluIHRpbWUsIGFuZCB0aGlzIE9OTFkgSEFQUEVOUyBpbiB0ZXN0cyBhbmQgbm90IGluIGRldi9wcm9kIG1vZGUuXG4gIHByb3RlY3RlZCBnZXRQcm92aWRlckZyb21Db250YWluZXI8VD4odG9rZW46IFR5cGU8VD4gfCBJbmplY3Rpb25Ub2tlbjxUPiwgbm90Rm91bmRWYWx1ZT86IFQpOiBUIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHRoaXMuX2NvbnRhaW5lckluamVjdG9yLmdldCh0b2tlbiwgbm90Rm91bmRWYWx1ZSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIG5vdEZvdW5kVmFsdWU7XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5fY29udGFpbmVySW5qZWN0b3IgPSBuZXcgSG9zdFdyYXBwZXIodGhpcy53cmFwcGVyVHlwZSwgdGhpcy52Y3IsIHRoaXMuaW5kZXgpO1xuICAgIHRoaXMuY29udHJvbElkU2VydmljZSA9IHRoaXMuX2NvbnRhaW5lckluamVjdG9yLmdldChDb250cm9sSWRTZXJ2aWNlKTtcbiAgICBpZiAodGhpcy5faWQpIHtcbiAgICAgIHRoaXMuY29udHJvbElkU2VydmljZS5pZCA9IHRoaXMuX2lkO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9pZCA9IHRoaXMuY29udHJvbElkU2VydmljZS5pZDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5uZ0NvbnRyb2xTZXJ2aWNlKSB7XG4gICAgICB0aGlzLm5nQ29udHJvbFNlcnZpY2Uuc2V0Q29udHJvbCh0aGlzLm5nQ29udHJvbCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmZvckVhY2goc3ViID0+IHN1Yi51bnN1YnNjcmliZSgpKTtcbiAgfVxufVxuIl19