/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive, Input, Optional, TemplateRef, ViewContainerRef } from '@angular/core';
import { IfErrorService } from './if-error.service';
export class ClrIfError {
    /**
     * @param {?} service
     * @param {?} template
     * @param {?} container
     */
    constructor(service, template, container) {
        this.service = service;
        this.template = template;
        this.container = container;
        this.displayed = false;
        if (!this.service) {
            throw new Error('clrIfError can only be used within a form control container element like clr-input-container');
        }
        else {
            this.displayError(false);
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.subscription = this.service.statusChanges.subscribe(control => {
            // If there is a specific error to track, check it, otherwise check overall validity
            if (this.error) {
                this.displayError(control.hasError(this.error));
            }
            else {
                this.displayError(control.invalid);
            }
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    /**
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
    { type: TemplateRef },
    { type: ViewContainerRef }
];
ClrIfError.propDecorators = {
    error: [{ type: Input, args: ['clrIfError',] }]
};
if (false) {
    /** @type {?} */
    ClrIfError.prototype.error;
    /** @type {?} */
    ClrIfError.prototype.subscription;
    /** @type {?} */
    ClrIfError.prototype.displayed;
    /** @type {?} */
    ClrIfError.prototype.service;
    /** @type {?} */
    ClrIfError.prototype.template;
    /** @type {?} */
    ClrIfError.prototype.container;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWYtZXJyb3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJmb3Jtcy9jb21tb24vaWYtZXJyb3IvaWYtZXJyb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUcxRixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFHcEQsTUFBTSxPQUFPLFVBQVU7Ozs7OztJQUNyQixZQUNzQixPQUF1QixFQUNuQyxRQUEwQixFQUMxQixTQUEyQjtRQUZmLFlBQU8sR0FBUCxPQUFPLENBQWdCO1FBQ25DLGFBQVEsR0FBUixRQUFRLENBQWtCO1FBQzFCLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBWTdCLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFWakMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDakIsTUFBTSxJQUFJLEtBQUssQ0FBQyw4RkFBOEYsQ0FBQyxDQUFDO1NBQ2pIO2FBQU07WUFDTCxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzFCO0lBQ0gsQ0FBQzs7OztJQU9ELFFBQVE7UUFDTixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUNqRSxvRkFBb0Y7WUFDcEYsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNkLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzthQUNqRDtpQkFBTTtnQkFDTCxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNwQztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2xDLENBQUM7Ozs7O0lBRU8sWUFBWSxDQUFDLE9BQWdCO1FBQ25DLElBQUksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUM5QixJQUFJLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNqRCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztTQUN2QjthQUFNLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztTQUN4QjtJQUNILENBQUM7OztZQTFDRixTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFFOzs7O1lBRjlCLGNBQWMsdUJBS2xCLFFBQVE7WUFSd0IsV0FBVztZQUFFLGdCQUFnQjs7O29CQW1CL0QsS0FBSyxTQUFDLFlBQVk7Ozs7SUFBbkIsMkJBQW1DOztJQUVuQyxrQ0FBbUM7O0lBQ25DLCtCQUFtQzs7SUFkakMsNkJBQTJDOztJQUMzQyw4QkFBa0M7O0lBQ2xDLCtCQUFtQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIE9wdGlvbmFsLCBUZW1wbGF0ZVJlZiwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IElmRXJyb3JTZXJ2aWNlIH0gZnJvbSAnLi9pZi1lcnJvci5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW2NscklmRXJyb3JdJyB9KVxuZXhwb3J0IGNsYXNzIENscklmRXJyb3Ige1xuICBjb25zdHJ1Y3RvcihcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIHNlcnZpY2U6IElmRXJyb3JTZXJ2aWNlLFxuICAgIHByaXZhdGUgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4sXG4gICAgcHJpdmF0ZSBjb250YWluZXI6IFZpZXdDb250YWluZXJSZWZcbiAgKSB7XG4gICAgaWYgKCF0aGlzLnNlcnZpY2UpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignY2xySWZFcnJvciBjYW4gb25seSBiZSB1c2VkIHdpdGhpbiBhIGZvcm0gY29udHJvbCBjb250YWluZXIgZWxlbWVudCBsaWtlIGNsci1pbnB1dC1jb250YWluZXInKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kaXNwbGF5RXJyb3IoZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgnY2xySWZFcnJvcicpIGVycm9yOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBkaXNwbGF5ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IHRoaXMuc2VydmljZS5zdGF0dXNDaGFuZ2VzLnN1YnNjcmliZShjb250cm9sID0+IHtcbiAgICAgIC8vIElmIHRoZXJlIGlzIGEgc3BlY2lmaWMgZXJyb3IgdG8gdHJhY2ssIGNoZWNrIGl0LCBvdGhlcndpc2UgY2hlY2sgb3ZlcmFsbCB2YWxpZGl0eVxuICAgICAgaWYgKHRoaXMuZXJyb3IpIHtcbiAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3IoY29udHJvbC5oYXNFcnJvcih0aGlzLmVycm9yKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmRpc3BsYXlFcnJvcihjb250cm9sLmludmFsaWQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHByaXZhdGUgZGlzcGxheUVycm9yKGludmFsaWQ6IGJvb2xlYW4pIHtcbiAgICBpZiAoaW52YWxpZCAmJiAhdGhpcy5kaXNwbGF5ZWQpIHtcbiAgICAgIHRoaXMuY29udGFpbmVyLmNyZWF0ZUVtYmVkZGVkVmlldyh0aGlzLnRlbXBsYXRlKTtcbiAgICAgIHRoaXMuZGlzcGxheWVkID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKCFpbnZhbGlkKSB7XG4gICAgICB0aGlzLmNvbnRhaW5lci5jbGVhcigpO1xuICAgICAgdGhpcy5kaXNwbGF5ZWQgPSBmYWxzZTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==