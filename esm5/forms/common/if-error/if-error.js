/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive, Input, Optional, TemplateRef, ViewContainerRef } from '@angular/core';
import { IfErrorService } from './if-error.service';
import { NgControlService } from '../providers/ng-control.service';
var ClrIfError = /** @class */ (function () {
    function ClrIfError(ifErrorService, ngControlService, template, container) {
        var _this = this;
        this.ifErrorService = ifErrorService;
        this.ngControlService = ngControlService;
        this.template = template;
        this.container = container;
        this.subscriptions = [];
        this.displayed = false;
        if (!this.ifErrorService) {
            throw new Error('clrIfError can only be used within a form control container element like clr-input-container');
        }
        else {
            this.displayError(false);
        }
        this.subscriptions.push(this.ngControlService.controlChanges.subscribe((/**
         * @param {?} control
         * @return {?}
         */
        function (control) {
            _this.control = control;
        })));
        this.subscriptions.push(this.ifErrorService.statusChanges.subscribe((/**
         * @param {?} invalid
         * @return {?}
         */
        function (invalid) {
            // If there is a specific error to track, check it, otherwise check overall validity
            if (_this.error && _this.control) {
                _this.displayError(_this.control.hasError(_this.error));
            }
            else {
                _this.displayError(invalid);
            }
        })));
    }
    /**
     * @return {?}
     */
    ClrIfError.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        function (sub) { return sub.unsubscribe(); }));
    };
    /**
     * @private
     * @param {?} invalid
     * @return {?}
     */
    ClrIfError.prototype.displayError = /**
     * @private
     * @param {?} invalid
     * @return {?}
     */
    function (invalid) {
        if (invalid && !this.displayed) {
            this.container.createEmbeddedView(this.template);
            this.displayed = true;
        }
        else if (!invalid) {
            this.container.clear();
            this.displayed = false;
        }
    };
    ClrIfError.decorators = [
        { type: Directive, args: [{ selector: '[clrIfError]' },] }
    ];
    /** @nocollapse */
    ClrIfError.ctorParameters = function () { return [
        { type: IfErrorService, decorators: [{ type: Optional }] },
        { type: NgControlService, decorators: [{ type: Optional }] },
        { type: TemplateRef },
        { type: ViewContainerRef }
    ]; };
    ClrIfError.propDecorators = {
        error: [{ type: Input, args: ['clrIfError',] }]
    };
    return ClrIfError;
}());
export { ClrIfError };
if (false) {
    /** @type {?} */
    ClrIfError.prototype.error;
    /**
     * @type {?}
     * @private
     */
    ClrIfError.prototype.subscriptions;
    /**
     * @type {?}
     * @private
     */
    ClrIfError.prototype.displayed;
    /**
     * @type {?}
     * @private
     */
    ClrIfError.prototype.control;
    /**
     * @type {?}
     * @private
     */
    ClrIfError.prototype.ifErrorService;
    /**
     * @type {?}
     * @private
     */
    ClrIfError.prototype.ngControlService;
    /**
     * @type {?}
     * @private
     */
    ClrIfError.prototype.template;
    /**
     * @type {?}
     * @private
     */
    ClrIfError.prototype.container;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWYtZXJyb3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJmb3Jtcy9jb21tb24vaWYtZXJyb3IvaWYtZXJyb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUcxRixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDcEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFHbkU7SUFFRSxvQkFDc0IsY0FBOEIsRUFDOUIsZ0JBQWtDLEVBQzlDLFFBQTBCLEVBQzFCLFNBQTJCO1FBSnJDLGlCQTBCQztRQXpCcUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDOUMsYUFBUSxHQUFSLFFBQVEsQ0FBa0I7UUFDMUIsY0FBUyxHQUFULFNBQVMsQ0FBa0I7UUEwQjdCLGtCQUFhLEdBQW1CLEVBQUUsQ0FBQztRQUNuQyxjQUFTLEdBQVksS0FBSyxDQUFDO1FBekJqQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUN4QixNQUFNLElBQUksS0FBSyxDQUFDLDhGQUE4RixDQUFDLENBQUM7U0FDakg7YUFBTTtZQUNMLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDMUI7UUFDRCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FDckIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxTQUFTOzs7O1FBQUMsVUFBQSxPQUFPO1lBQ3BELEtBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3pCLENBQUMsRUFBQyxDQUNILENBQUM7UUFDRixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FDckIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsU0FBUzs7OztRQUFDLFVBQUEsT0FBTztZQUNqRCxvRkFBb0Y7WUFDcEYsSUFBSSxLQUFJLENBQUMsS0FBSyxJQUFJLEtBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQzlCLEtBQUksQ0FBQyxZQUFZLENBQUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7YUFDdEQ7aUJBQU07Z0JBQ0wsS0FBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUM1QjtRQUNILENBQUMsRUFBQyxDQUNILENBQUM7SUFDSixDQUFDOzs7O0lBUUQsZ0NBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPOzs7O1FBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLENBQUMsV0FBVyxFQUFFLEVBQWpCLENBQWlCLEVBQUMsQ0FBQztJQUN2RCxDQUFDOzs7Ozs7SUFFTyxpQ0FBWTs7Ozs7SUFBcEIsVUFBcUIsT0FBZ0I7UUFDbkMsSUFBSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQzlCLElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2pELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1NBQ3ZCO2FBQU0sSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNuQixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1NBQ3hCO0lBQ0gsQ0FBQzs7Z0JBaERGLFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUU7Ozs7Z0JBSjlCLGNBQWMsdUJBT2xCLFFBQVE7Z0JBTkosZ0JBQWdCLHVCQU9wQixRQUFRO2dCQVh3QixXQUFXO2dCQUFFLGdCQUFnQjs7O3dCQXFDL0QsS0FBSyxTQUFDLFlBQVk7O0lBbUJyQixpQkFBQztDQUFBLEFBakRELElBaURDO1NBaERZLFVBQVU7OztJQTZCckIsMkJBQW1DOzs7OztJQUVuQyxtQ0FBMkM7Ozs7O0lBQzNDLCtCQUFtQzs7Ozs7SUFDbkMsNkJBQTJCOzs7OztJQS9CekIsb0NBQWtEOzs7OztJQUNsRCxzQ0FBc0Q7Ozs7O0lBQ3RELDhCQUFrQzs7Ozs7SUFDbEMsK0JBQW1DIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgT3B0aW9uYWwsIFRlbXBsYXRlUmVmLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgSWZFcnJvclNlcnZpY2UgfSBmcm9tICcuL2lmLWVycm9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgTmdDb250cm9sU2VydmljZSB9IGZyb20gJy4uL3Byb3ZpZGVycy9uZy1jb250cm9sLnNlcnZpY2UnO1xuaW1wb3J0IHsgTmdDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbY2xySWZFcnJvcl0nIH0pXG5leHBvcnQgY2xhc3MgQ2xySWZFcnJvciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgaWZFcnJvclNlcnZpY2U6IElmRXJyb3JTZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgbmdDb250cm9sU2VydmljZTogTmdDb250cm9sU2VydmljZSxcbiAgICBwcml2YXRlIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+LFxuICAgIHByaXZhdGUgY29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmXG4gICkge1xuICAgIGlmICghdGhpcy5pZkVycm9yU2VydmljZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdjbHJJZkVycm9yIGNhbiBvbmx5IGJlIHVzZWQgd2l0aGluIGEgZm9ybSBjb250cm9sIGNvbnRhaW5lciBlbGVtZW50IGxpa2UgY2xyLWlucHV0LWNvbnRhaW5lcicpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRpc3BsYXlFcnJvcihmYWxzZSk7XG4gICAgfVxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5uZ0NvbnRyb2xTZXJ2aWNlLmNvbnRyb2xDaGFuZ2VzLnN1YnNjcmliZShjb250cm9sID0+IHtcbiAgICAgICAgdGhpcy5jb250cm9sID0gY29udHJvbDtcbiAgICAgIH0pXG4gICAgKTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMuaWZFcnJvclNlcnZpY2Uuc3RhdHVzQ2hhbmdlcy5zdWJzY3JpYmUoaW52YWxpZCA9PiB7XG4gICAgICAgIC8vIElmIHRoZXJlIGlzIGEgc3BlY2lmaWMgZXJyb3IgdG8gdHJhY2ssIGNoZWNrIGl0LCBvdGhlcndpc2UgY2hlY2sgb3ZlcmFsbCB2YWxpZGl0eVxuICAgICAgICBpZiAodGhpcy5lcnJvciAmJiB0aGlzLmNvbnRyb2wpIHtcbiAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvcih0aGlzLmNvbnRyb2wuaGFzRXJyb3IodGhpcy5lcnJvcikpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yKGludmFsaWQpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBASW5wdXQoJ2NscklmRXJyb3InKSBlcnJvcjogc3RyaW5nO1xuXG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcbiAgcHJpdmF0ZSBkaXNwbGF5ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBjb250cm9sOiBOZ0NvbnRyb2w7XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmZvckVhY2goc3ViID0+IHN1Yi51bnN1YnNjcmliZSgpKTtcbiAgfVxuXG4gIHByaXZhdGUgZGlzcGxheUVycm9yKGludmFsaWQ6IGJvb2xlYW4pIHtcbiAgICBpZiAoaW52YWxpZCAmJiAhdGhpcy5kaXNwbGF5ZWQpIHtcbiAgICAgIHRoaXMuY29udGFpbmVyLmNyZWF0ZUVtYmVkZGVkVmlldyh0aGlzLnRlbXBsYXRlKTtcbiAgICAgIHRoaXMuZGlzcGxheWVkID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKCFpbnZhbGlkKSB7XG4gICAgICB0aGlzLmNvbnRhaW5lci5jbGVhcigpO1xuICAgICAgdGhpcy5kaXNwbGF5ZWQgPSBmYWxzZTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==