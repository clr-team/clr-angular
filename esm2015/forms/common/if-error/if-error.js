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
export class ClrIfError {
    /**
     * @param {?} ifErrorService
     * @param {?} ngControlService
     * @param {?} template
     * @param {?} container
     */
    constructor(ifErrorService, ngControlService, template, container) {
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
        control => {
            this.control = control;
        })));
        this.subscriptions.push(this.ifErrorService.statusChanges.subscribe((/**
         * @param {?} invalid
         * @return {?}
         */
        invalid => {
            // If there is a specific error to track, check it, otherwise check overall validity
            if (this.error && this.control) {
                this.displayError(this.control.hasError(this.error));
            }
            else {
                this.displayError(invalid);
            }
        })));
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
    /**
     * @private
     * @param {?} invalid
     * @return {?}
     */
    displayError(invalid) {
        if (invalid && !this.displayed) {
            this.container.createEmbeddedView(this.template);
            this.displayed = true;
        }
        else if (!invalid) {
            this.container.clear();
            this.displayed = false;
        }
    }
}
ClrIfError.decorators = [
    { type: Directive, args: [{ selector: '[clrIfError]' },] }
];
/** @nocollapse */
ClrIfError.ctorParameters = () => [
    { type: IfErrorService, decorators: [{ type: Optional }] },
    { type: NgControlService, decorators: [{ type: Optional }] },
    { type: TemplateRef },
    { type: ViewContainerRef }
];
ClrIfError.propDecorators = {
    error: [{ type: Input, args: ['clrIfError',] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWYtZXJyb3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJmb3Jtcy9jb21tb24vaWYtZXJyb3IvaWYtZXJyb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUcxRixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDcEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFJbkUsTUFBTSxPQUFPLFVBQVU7Ozs7Ozs7SUFDckIsWUFDc0IsY0FBOEIsRUFDOUIsZ0JBQWtDLEVBQzlDLFFBQTBCLEVBQzFCLFNBQTJCO1FBSGYsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDOUMsYUFBUSxHQUFSLFFBQVEsQ0FBa0I7UUFDMUIsY0FBUyxHQUFULFNBQVMsQ0FBa0I7UUEwQjdCLGtCQUFhLEdBQW1CLEVBQUUsQ0FBQztRQUNuQyxjQUFTLEdBQVksS0FBSyxDQUFDO1FBekJqQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUN4QixNQUFNLElBQUksS0FBSyxDQUFDLDhGQUE4RixDQUFDLENBQUM7U0FDakg7YUFBTTtZQUNMLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDMUI7UUFDRCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FDckIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxTQUFTOzs7O1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDdkQsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDekIsQ0FBQyxFQUFDLENBQ0gsQ0FBQztRQUNGLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUNyQixJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxTQUFTOzs7O1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDcEQsb0ZBQW9GO1lBQ3BGLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUM5QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2FBQ3REO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDNUI7UUFDSCxDQUFDLEVBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQzs7OztJQVFELFdBQVc7UUFDVCxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU87Ozs7UUFBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsRUFBQyxDQUFDO0lBQ3ZELENBQUM7Ozs7OztJQUVPLFlBQVksQ0FBQyxPQUFnQjtRQUNuQyxJQUFJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDOUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDakQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7U0FDdkI7YUFBTSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ25CLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7U0FDeEI7SUFDSCxDQUFDOzs7WUFoREYsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBRTs7OztZQUo5QixjQUFjLHVCQU9sQixRQUFRO1lBTkosZ0JBQWdCLHVCQU9wQixRQUFRO1lBWHdCLFdBQVc7WUFBRSxnQkFBZ0I7OztvQkFxQy9ELEtBQUssU0FBQyxZQUFZOzs7O0lBQW5CLDJCQUFtQzs7Ozs7SUFFbkMsbUNBQTJDOzs7OztJQUMzQywrQkFBbUM7Ozs7O0lBQ25DLDZCQUEyQjs7Ozs7SUEvQnpCLG9DQUFrRDs7Ozs7SUFDbEQsc0NBQXNEOzs7OztJQUN0RCw4QkFBa0M7Ozs7O0lBQ2xDLCtCQUFtQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIE9wdGlvbmFsLCBUZW1wbGF0ZVJlZiwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IElmRXJyb3JTZXJ2aWNlIH0gZnJvbSAnLi9pZi1lcnJvci5zZXJ2aWNlJztcbmltcG9ydCB7IE5nQ29udHJvbFNlcnZpY2UgfSBmcm9tICcuLi9wcm92aWRlcnMvbmctY29udHJvbC5zZXJ2aWNlJztcbmltcG9ydCB7IE5nQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW2NscklmRXJyb3JdJyB9KVxuZXhwb3J0IGNsYXNzIENscklmRXJyb3Ige1xuICBjb25zdHJ1Y3RvcihcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGlmRXJyb3JTZXJ2aWNlOiBJZkVycm9yU2VydmljZSxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIG5nQ29udHJvbFNlcnZpY2U6IE5nQ29udHJvbFNlcnZpY2UsXG4gICAgcHJpdmF0ZSB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PixcbiAgICBwcml2YXRlIGNvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZlxuICApIHtcbiAgICBpZiAoIXRoaXMuaWZFcnJvclNlcnZpY2UpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignY2xySWZFcnJvciBjYW4gb25seSBiZSB1c2VkIHdpdGhpbiBhIGZvcm0gY29udHJvbCBjb250YWluZXIgZWxlbWVudCBsaWtlIGNsci1pbnB1dC1jb250YWluZXInKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kaXNwbGF5RXJyb3IoZmFsc2UpO1xuICAgIH1cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMubmdDb250cm9sU2VydmljZS5jb250cm9sQ2hhbmdlcy5zdWJzY3JpYmUoY29udHJvbCA9PiB7XG4gICAgICAgIHRoaXMuY29udHJvbCA9IGNvbnRyb2w7XG4gICAgICB9KVxuICAgICk7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLmlmRXJyb3JTZXJ2aWNlLnN0YXR1c0NoYW5nZXMuc3Vic2NyaWJlKGludmFsaWQgPT4ge1xuICAgICAgICAvLyBJZiB0aGVyZSBpcyBhIHNwZWNpZmljIGVycm9yIHRvIHRyYWNrLCBjaGVjayBpdCwgb3RoZXJ3aXNlIGNoZWNrIG92ZXJhbGwgdmFsaWRpdHlcbiAgICAgICAgaWYgKHRoaXMuZXJyb3IgJiYgdGhpcy5jb250cm9sKSB7XG4gICAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3IodGhpcy5jb250cm9sLmhhc0Vycm9yKHRoaXMuZXJyb3IpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvcihpbnZhbGlkKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgQElucHV0KCdjbHJJZkVycm9yJykgZXJyb3I6IHN0cmluZztcblxuICBwcml2YXRlIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG4gIHByaXZhdGUgZGlzcGxheWVkOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgY29udHJvbDogTmdDb250cm9sO1xuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHN1YiA9PiBzdWIudW5zdWJzY3JpYmUoKSk7XG4gIH1cblxuICBwcml2YXRlIGRpc3BsYXlFcnJvcihpbnZhbGlkOiBib29sZWFuKSB7XG4gICAgaWYgKGludmFsaWQgJiYgIXRoaXMuZGlzcGxheWVkKSB7XG4gICAgICB0aGlzLmNvbnRhaW5lci5jcmVhdGVFbWJlZGRlZFZpZXcodGhpcy50ZW1wbGF0ZSk7XG4gICAgICB0aGlzLmRpc3BsYXllZCA9IHRydWU7XG4gICAgfSBlbHNlIGlmICghaW52YWxpZCkge1xuICAgICAgdGhpcy5jb250YWluZXIuY2xlYXIoKTtcbiAgICAgIHRoaXMuZGlzcGxheWVkID0gZmFsc2U7XG4gICAgfVxuICB9XG59XG4iXX0=