/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { NgControlService } from '../providers/ng-control.service';
var IfErrorService = /** @class */ (function () {
    function IfErrorService(ngControlService) {
        var _this = this;
        this.ngControlService = ngControlService;
        // Implement our own status changes observable, since Angular controls don't
        // fire on events like blur, and we want to return the control instead of a string
        this._statusChanges = new Subject();
        this.subscriptions = [];
        // Wait for the control to be available
        this.subscriptions.push(this.ngControlService.controlChanges.subscribe(function (control) {
            if (control) {
                _this.control = control;
                _this.listenForChanges();
            }
        }));
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
     * @return {?}
     */
    IfErrorService.prototype.listenForChanges = 
    // Subscribe to the status change events, only after touched and emit the control
    /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.subscriptions.push(this.control.statusChanges.pipe(filter(function () { return _this.control.touched; })).subscribe(function () {
            _this._statusChanges.next(_this.control);
        }));
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
            this._statusChanges.next(this.control);
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
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
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
    /** @type {?} */
    IfErrorService.prototype._statusChanges;
    /** @type {?} */
    IfErrorService.prototype.subscriptions;
    /** @type {?} */
    IfErrorService.prototype.control;
    /** @type {?} */
    IfErrorService.prototype.ngControlService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWYtZXJyb3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImZvcm1zL2NvbW1vbi9pZi1lcnJvci9pZi1lcnJvci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQU1BLE9BQU8sRUFBRSxVQUFVLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFFdEQsT0FBTyxFQUFjLE9BQU8sRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDekQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXhDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBRW5FO0lBWUUsd0JBQW9CLGdCQUFrQztRQUF0RCxpQkFVQztRQVZtQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCOzs7UUFSOUMsbUJBQWMsR0FBdUIsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUtuRCxrQkFBYSxHQUFtQixFQUFFLENBQUM7UUFJekMsdUNBQXVDO1FBQ3ZDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUNyQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxVQUFBLE9BQU87WUFDcEQsSUFBSSxPQUFPLEVBQUU7Z0JBQ1gsS0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7Z0JBQ3ZCLEtBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2FBQ3pCO1FBQ0gsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFqQkQsc0JBQUkseUNBQWE7Ozs7UUFBakI7WUFDRSxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDNUMsQ0FBQzs7O09BQUE7SUFpQkQsaUZBQWlGOzs7OztJQUN6RSx5Q0FBZ0I7Ozs7O0lBQXhCO1FBQUEsaUJBTUM7UUFMQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FDckIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQXBCLENBQW9CLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztZQUM1RSxLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDekMsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFRCxvRUFBb0U7Ozs7O0lBQ3BFLDRDQUFtQjs7Ozs7SUFBbkI7UUFDRSxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3hDO0lBQ0gsQ0FBQztJQUVELHlCQUF5Qjs7Ozs7SUFDekIsb0NBQVc7Ozs7O0lBQVg7UUFDRSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxXQUFXLEVBQUUsRUFBakIsQ0FBaUIsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7O2dCQTNDRixVQUFVOzs7O2dCQUZGLGdCQUFnQjs7SUE4Q3pCLHFCQUFDO0NBQUEsQUE1Q0QsSUE0Q0M7U0EzQ1ksY0FBYzs7O0lBR3pCLHdDQUEyRDs7SUFLM0QsdUNBQTJDOztJQUMzQyxpQ0FBMkI7O0lBRWYsMENBQTBDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBOZ0NvbnRyb2xTZXJ2aWNlIH0gZnJvbSAnLi4vcHJvdmlkZXJzL25nLWNvbnRyb2wuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBJZkVycm9yU2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIC8vIEltcGxlbWVudCBvdXIgb3duIHN0YXR1cyBjaGFuZ2VzIG9ic2VydmFibGUsIHNpbmNlIEFuZ3VsYXIgY29udHJvbHMgZG9uJ3RcbiAgLy8gZmlyZSBvbiBldmVudHMgbGlrZSBibHVyLCBhbmQgd2Ugd2FudCB0byByZXR1cm4gdGhlIGNvbnRyb2wgaW5zdGVhZCBvZiBhIHN0cmluZ1xuICBwcml2YXRlIF9zdGF0dXNDaGFuZ2VzOiBTdWJqZWN0PE5nQ29udHJvbD4gPSBuZXcgU3ViamVjdCgpO1xuICBnZXQgc3RhdHVzQ2hhbmdlcygpOiBPYnNlcnZhYmxlPE5nQ29udHJvbD4ge1xuICAgIHJldHVybiB0aGlzLl9zdGF0dXNDaGFuZ2VzLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuICBwcml2YXRlIGNvbnRyb2w6IE5nQ29udHJvbDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG5nQ29udHJvbFNlcnZpY2U6IE5nQ29udHJvbFNlcnZpY2UpIHtcbiAgICAvLyBXYWl0IGZvciB0aGUgY29udHJvbCB0byBiZSBhdmFpbGFibGVcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMubmdDb250cm9sU2VydmljZS5jb250cm9sQ2hhbmdlcy5zdWJzY3JpYmUoY29udHJvbCA9PiB7XG4gICAgICAgIGlmIChjb250cm9sKSB7XG4gICAgICAgICAgdGhpcy5jb250cm9sID0gY29udHJvbDtcbiAgICAgICAgICB0aGlzLmxpc3RlbkZvckNoYW5nZXMoKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgLy8gU3Vic2NyaWJlIHRvIHRoZSBzdGF0dXMgY2hhbmdlIGV2ZW50cywgb25seSBhZnRlciB0b3VjaGVkIGFuZCBlbWl0IHRoZSBjb250cm9sXG4gIHByaXZhdGUgbGlzdGVuRm9yQ2hhbmdlcygpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMuY29udHJvbC5zdGF0dXNDaGFuZ2VzLnBpcGUoZmlsdGVyKCgpID0+IHRoaXMuY29udHJvbC50b3VjaGVkKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5fc3RhdHVzQ2hhbmdlcy5uZXh0KHRoaXMuY29udHJvbCk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvLyBBbGxvd3MgYSBjb250cm9sIHRvIHB1c2ggYSBzdGF0dXMgY2hlY2sgdXBzdHJlYW0sIHN1Y2ggYXMgb24gYmx1clxuICB0cmlnZ2VyU3RhdHVzQ2hhbmdlKCkge1xuICAgIGlmICh0aGlzLmNvbnRyb2wpIHtcbiAgICAgIHRoaXMuX3N0YXR1c0NoYW5nZXMubmV4dCh0aGlzLmNvbnRyb2wpO1xuICAgIH1cbiAgfVxuXG4gIC8vIENsZWFuIHVwIHN1YnNjcmlwdGlvbnNcbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmZvckVhY2goc3ViID0+IHN1Yi51bnN1YnNjcmliZSgpKTtcbiAgfVxufVxuIl19