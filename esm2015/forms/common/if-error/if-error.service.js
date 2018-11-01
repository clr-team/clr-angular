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
export class IfErrorService {
    /**
     * @param {?} ngControlService
     */
    constructor(ngControlService) {
        this.ngControlService = ngControlService;
        // Implement our own status changes observable, since Angular controls don't
        // fire on events like blur, and we want to return the control instead of a string
        this._statusChanges = new Subject();
        this.subscriptions = [];
        // Wait for the control to be available
        this.subscriptions.push(this.ngControlService.controlChanges.subscribe(control => {
            if (control) {
                this.control = control;
                this.listenForChanges();
            }
        }));
    }
    /**
     * @return {?}
     */
    get statusChanges() {
        return this._statusChanges.asObservable();
    }
    // Subscribe to the status change events, only after touched and emit the control
    /**
     * @return {?}
     */
    listenForChanges() {
        this.subscriptions.push(this.control.statusChanges.pipe(filter(() => this.control.touched)).subscribe(() => {
            this._statusChanges.next(this.control);
        }));
    }
    // Allows a control to push a status check upstream, such as on blur
    /**
     * @return {?}
     */
    triggerStatusChange() {
        if (this.control) {
            this._statusChanges.next(this.control);
        }
    }
    // Clean up subscriptions
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
}
IfErrorService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
IfErrorService.ctorParameters = () => [
    { type: NgControlService }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWYtZXJyb3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImZvcm1zL2NvbW1vbi9pZi1lcnJvci9pZi1lcnJvci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQU1BLE9BQU8sRUFBRSxVQUFVLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFFdEQsT0FBTyxFQUFjLE9BQU8sRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDekQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXhDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBR25FLE1BQU0sT0FBTyxjQUFjOzs7O0lBV3pCLFlBQW9CLGdCQUFrQztRQUFsQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCOzs7UUFSOUMsbUJBQWMsR0FBdUIsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUtuRCxrQkFBYSxHQUFtQixFQUFFLENBQUM7UUFJekMsdUNBQXVDO1FBQ3ZDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUNyQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUN2RCxJQUFJLE9BQU8sRUFBRTtnQkFDWCxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztnQkFDdkIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7YUFDekI7UUFDSCxDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQzs7OztJQWpCRCxJQUFJLGFBQWE7UUFDZixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDNUMsQ0FBQzs7Ozs7SUFrQk8sZ0JBQWdCO1FBQ3RCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUNyQixJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ2pGLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN6QyxDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQzs7Ozs7SUFHRCxtQkFBbUI7UUFDakIsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUN4QztJQUNILENBQUM7Ozs7O0lBR0QsV0FBVztRQUNULElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7SUFDdkQsQ0FBQzs7O1lBM0NGLFVBQVU7Ozs7WUFGRixnQkFBZ0I7Ozs7SUFNdkIsd0NBQTJEOztJQUszRCx1Q0FBMkM7O0lBQzNDLGlDQUEyQjs7SUFFZiwwQ0FBMEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IE5nQ29udHJvbFNlcnZpY2UgfSBmcm9tICcuLi9wcm92aWRlcnMvbmctY29udHJvbC5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIElmRXJyb3JTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgLy8gSW1wbGVtZW50IG91ciBvd24gc3RhdHVzIGNoYW5nZXMgb2JzZXJ2YWJsZSwgc2luY2UgQW5ndWxhciBjb250cm9scyBkb24ndFxuICAvLyBmaXJlIG9uIGV2ZW50cyBsaWtlIGJsdXIsIGFuZCB3ZSB3YW50IHRvIHJldHVybiB0aGUgY29udHJvbCBpbnN0ZWFkIG9mIGEgc3RyaW5nXG4gIHByaXZhdGUgX3N0YXR1c0NoYW5nZXM6IFN1YmplY3Q8TmdDb250cm9sPiA9IG5ldyBTdWJqZWN0KCk7XG4gIGdldCBzdGF0dXNDaGFuZ2VzKCk6IE9ic2VydmFibGU8TmdDb250cm9sPiB7XG4gICAgcmV0dXJuIHRoaXMuX3N0YXR1c0NoYW5nZXMuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBwcml2YXRlIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG4gIHByaXZhdGUgY29udHJvbDogTmdDb250cm9sO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbmdDb250cm9sU2VydmljZTogTmdDb250cm9sU2VydmljZSkge1xuICAgIC8vIFdhaXQgZm9yIHRoZSBjb250cm9sIHRvIGJlIGF2YWlsYWJsZVxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5uZ0NvbnRyb2xTZXJ2aWNlLmNvbnRyb2xDaGFuZ2VzLnN1YnNjcmliZShjb250cm9sID0+IHtcbiAgICAgICAgaWYgKGNvbnRyb2wpIHtcbiAgICAgICAgICB0aGlzLmNvbnRyb2wgPSBjb250cm9sO1xuICAgICAgICAgIHRoaXMubGlzdGVuRm9yQ2hhbmdlcygpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvLyBTdWJzY3JpYmUgdG8gdGhlIHN0YXR1cyBjaGFuZ2UgZXZlbnRzLCBvbmx5IGFmdGVyIHRvdWNoZWQgYW5kIGVtaXQgdGhlIGNvbnRyb2xcbiAgcHJpdmF0ZSBsaXN0ZW5Gb3JDaGFuZ2VzKCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5jb250cm9sLnN0YXR1c0NoYW5nZXMucGlwZShmaWx0ZXIoKCkgPT4gdGhpcy5jb250cm9sLnRvdWNoZWQpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLl9zdGF0dXNDaGFuZ2VzLm5leHQodGhpcy5jb250cm9sKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8vIEFsbG93cyBhIGNvbnRyb2wgdG8gcHVzaCBhIHN0YXR1cyBjaGVjayB1cHN0cmVhbSwgc3VjaCBhcyBvbiBibHVyXG4gIHRyaWdnZXJTdGF0dXNDaGFuZ2UoKSB7XG4gICAgaWYgKHRoaXMuY29udHJvbCkge1xuICAgICAgdGhpcy5fc3RhdHVzQ2hhbmdlcy5uZXh0KHRoaXMuY29udHJvbCk7XG4gICAgfVxuICB9XG5cbiAgLy8gQ2xlYW4gdXAgc3Vic2NyaXB0aW9uc1xuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaChzdWIgPT4gc3ViLnVuc3Vic2NyaWJlKCkpO1xuICB9XG59XG4iXX0=