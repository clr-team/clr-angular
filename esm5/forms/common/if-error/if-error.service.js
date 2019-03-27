/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NgControlService } from '../providers/ng-control.service';
var IfErrorService = /** @class */ (function () {
    function IfErrorService(ngControlService) {
        var _this = this;
        this.ngControlService = ngControlService;
        // Implement our own status changes observable, since Angular controls don't
        // fire on events like blur, and we want to return the boolean state instead of a string
        this._statusChanges = new Subject();
        this.subscriptions = [];
        // Wait for the control to be available
        this.subscriptions.push(this.ngControlService.controlChanges.subscribe((/**
         * @param {?} control
         * @return {?}
         */
        function (control) {
            if (control) {
                _this.control = control;
                _this.listenForChanges();
            }
        })));
    }
    Object.defineProperty(IfErrorService.prototype, "statusChanges", {
        get: /**
         * @return {?}
         */
        function () {
            return this._statusChanges.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    // Subscribe to the status change events, only after touched and emit the control
    // Subscribe to the status change events, only after touched and emit the control
    /**
     * @private
     * @return {?}
     */
    IfErrorService.prototype.listenForChanges = 
    // Subscribe to the status change events, only after touched and emit the control
    /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.subscriptions.push(this.control.statusChanges.subscribe((/**
         * @return {?}
         */
        function () {
            _this.sendValidity();
        })));
    };
    /**
     * @private
     * @return {?}
     */
    IfErrorService.prototype.sendValidity = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.control.touched && this.control.invalid) {
            this._statusChanges.next(true);
        }
        else {
            this._statusChanges.next(false);
        }
    };
    // Allows a control to push a status check upstream, such as on blur
    // Allows a control to push a status check upstream, such as on blur
    /**
     * @return {?}
     */
    IfErrorService.prototype.triggerStatusChange = 
    // Allows a control to push a status check upstream, such as on blur
    /**
     * @return {?}
     */
    function () {
        if (this.control) {
            this.sendValidity();
        }
    };
    // Clean up subscriptions
    // Clean up subscriptions
    /**
     * @return {?}
     */
    IfErrorService.prototype.ngOnDestroy = 
    // Clean up subscriptions
    /**
     * @return {?}
     */
    function () {
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        function (sub) { return sub.unsubscribe(); }));
    };
    IfErrorService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    IfErrorService.ctorParameters = function () { return [
        { type: NgControlService }
    ]; };
    return IfErrorService;
}());
export { IfErrorService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    IfErrorService.prototype._statusChanges;
    /**
     * @type {?}
     * @private
     */
    IfErrorService.prototype.subscriptions;
    /**
     * @type {?}
     * @private
     */
    IfErrorService.prototype.control;
    /**
     * @type {?}
     * @private
     */
    IfErrorService.prototype.ngControlService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWYtZXJyb3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImZvcm1zL2NvbW1vbi9pZi1lcnJvci9pZi1lcnJvci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQU1BLE9BQU8sRUFBRSxVQUFVLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFFdEQsT0FBTyxFQUFjLE9BQU8sRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFFekQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFFbkU7SUFZRSx3QkFBb0IsZ0JBQWtDO1FBQXRELGlCQVVDO1FBVm1CLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7OztRQVI5QyxtQkFBYyxHQUFxQixJQUFJLE9BQU8sRUFBRSxDQUFDO1FBS2pELGtCQUFhLEdBQW1CLEVBQUUsQ0FBQztRQUl6Qyx1Q0FBdUM7UUFDdkMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQ3JCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsU0FBUzs7OztRQUFDLFVBQUEsT0FBTztZQUNwRCxJQUFJLE9BQU8sRUFBRTtnQkFDWCxLQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztnQkFDdkIsS0FBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7YUFDekI7UUFDSCxDQUFDLEVBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQWpCRCxzQkFBSSx5Q0FBYTs7OztRQUFqQjtZQUNFLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUM1QyxDQUFDOzs7T0FBQTtJQWlCRCxpRkFBaUY7Ozs7OztJQUN6RSx5Q0FBZ0I7Ozs7OztJQUF4QjtRQUFBLGlCQU1DO1FBTEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQ3JCLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFNBQVM7OztRQUFDO1lBQ25DLEtBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN0QixDQUFDLEVBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQzs7Ozs7SUFFTyxxQ0FBWTs7OztJQUFwQjtRQUNFLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7WUFDaEQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDaEM7YUFBTTtZQUNMLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2pDO0lBQ0gsQ0FBQztJQUVELG9FQUFvRTs7Ozs7SUFDcEUsNENBQW1COzs7OztJQUFuQjtRQUNFLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDckI7SUFDSCxDQUFDO0lBRUQseUJBQXlCOzs7OztJQUN6QixvQ0FBVzs7Ozs7SUFBWDtRQUNFLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTzs7OztRQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLFdBQVcsRUFBRSxFQUFqQixDQUFpQixFQUFDLENBQUM7SUFDdkQsQ0FBQzs7Z0JBbkRGLFVBQVU7Ozs7Z0JBRkYsZ0JBQWdCOztJQXNEekIscUJBQUM7Q0FBQSxBQXBERCxJQW9EQztTQW5EWSxjQUFjOzs7Ozs7SUFHekIsd0NBQXlEOzs7OztJQUt6RCx1Q0FBMkM7Ozs7O0lBQzNDLGlDQUEyQjs7Ozs7SUFFZiwwQ0FBMEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IE5nQ29udHJvbFNlcnZpY2UgfSBmcm9tICcuLi9wcm92aWRlcnMvbmctY29udHJvbC5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIElmRXJyb3JTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgLy8gSW1wbGVtZW50IG91ciBvd24gc3RhdHVzIGNoYW5nZXMgb2JzZXJ2YWJsZSwgc2luY2UgQW5ndWxhciBjb250cm9scyBkb24ndFxuICAvLyBmaXJlIG9uIGV2ZW50cyBsaWtlIGJsdXIsIGFuZCB3ZSB3YW50IHRvIHJldHVybiB0aGUgYm9vbGVhbiBzdGF0ZSBpbnN0ZWFkIG9mIGEgc3RyaW5nXG4gIHByaXZhdGUgX3N0YXR1c0NoYW5nZXM6IFN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgU3ViamVjdCgpO1xuICBnZXQgc3RhdHVzQ2hhbmdlcygpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5fc3RhdHVzQ2hhbmdlcy5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcbiAgcHJpdmF0ZSBjb250cm9sOiBOZ0NvbnRyb2w7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBuZ0NvbnRyb2xTZXJ2aWNlOiBOZ0NvbnRyb2xTZXJ2aWNlKSB7XG4gICAgLy8gV2FpdCBmb3IgdGhlIGNvbnRyb2wgdG8gYmUgYXZhaWxhYmxlXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLm5nQ29udHJvbFNlcnZpY2UuY29udHJvbENoYW5nZXMuc3Vic2NyaWJlKGNvbnRyb2wgPT4ge1xuICAgICAgICBpZiAoY29udHJvbCkge1xuICAgICAgICAgIHRoaXMuY29udHJvbCA9IGNvbnRyb2w7XG4gICAgICAgICAgdGhpcy5saXN0ZW5Gb3JDaGFuZ2VzKCk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8vIFN1YnNjcmliZSB0byB0aGUgc3RhdHVzIGNoYW5nZSBldmVudHMsIG9ubHkgYWZ0ZXIgdG91Y2hlZCBhbmQgZW1pdCB0aGUgY29udHJvbFxuICBwcml2YXRlIGxpc3RlbkZvckNoYW5nZXMoKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLmNvbnRyb2wuc3RhdHVzQ2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLnNlbmRWYWxpZGl0eSgpO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBzZW5kVmFsaWRpdHkoKSB7XG4gICAgaWYgKHRoaXMuY29udHJvbC50b3VjaGVkICYmIHRoaXMuY29udHJvbC5pbnZhbGlkKSB7XG4gICAgICB0aGlzLl9zdGF0dXNDaGFuZ2VzLm5leHQodHJ1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3N0YXR1c0NoYW5nZXMubmV4dChmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgLy8gQWxsb3dzIGEgY29udHJvbCB0byBwdXNoIGEgc3RhdHVzIGNoZWNrIHVwc3RyZWFtLCBzdWNoIGFzIG9uIGJsdXJcbiAgdHJpZ2dlclN0YXR1c0NoYW5nZSgpIHtcbiAgICBpZiAodGhpcy5jb250cm9sKSB7XG4gICAgICB0aGlzLnNlbmRWYWxpZGl0eSgpO1xuICAgIH1cbiAgfVxuXG4gIC8vIENsZWFuIHVwIHN1YnNjcmlwdGlvbnNcbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmZvckVhY2goc3ViID0+IHN1Yi51bnN1YnNjcmliZSgpKTtcbiAgfVxufVxuIl19