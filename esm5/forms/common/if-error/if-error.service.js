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
            _this.control = control;
            _this.listenForChanges();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWYtZXJyb3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImZvcm1zL2NvbW1vbi9pZi1lcnJvci9pZi1lcnJvci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQU1BLE9BQU8sRUFBRSxVQUFVLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFFdEQsT0FBTyxFQUFjLE9BQU8sRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDekQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXhDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBRW5FO0lBWUUsd0JBQW9CLGdCQUFrQztRQUF0RCxpQkFRQztRQVJtQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCOzs7UUFSOUMsbUJBQWMsR0FBdUIsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUtuRCxrQkFBYSxHQUFtQixFQUFFLENBQUM7UUFJekMsdUNBQXVDO1FBQ3ZDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUNyQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxVQUFBLE9BQU87WUFDcEQsS0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7WUFDdkIsS0FBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDMUIsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFmRCxzQkFBSSx5Q0FBYTs7OztRQUFqQjtZQUNFLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUM1QyxDQUFDOzs7T0FBQTtJQWVELGlGQUFpRjs7Ozs7SUFDekUseUNBQWdCOzs7OztJQUF4QjtRQUFBLGlCQU1DO1FBTEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQ3JCLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFwQixDQUFvQixDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7WUFDNUUsS0FBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3pDLENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDO0lBRUQsb0VBQW9FOzs7OztJQUNwRSw0Q0FBbUI7Ozs7O0lBQW5CO1FBQ0UsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUN4QztJQUNILENBQUM7SUFFRCx5QkFBeUI7Ozs7O0lBQ3pCLG9DQUFXOzs7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLENBQUMsV0FBVyxFQUFFLEVBQWpCLENBQWlCLENBQUMsQ0FBQztJQUN2RCxDQUFDOztnQkF6Q0YsVUFBVTs7OztnQkFGRixnQkFBZ0I7O0lBNEN6QixxQkFBQztDQUFBLEFBMUNELElBMENDO1NBekNZLGNBQWM7OztJQUd6Qix3Q0FBMkQ7O0lBSzNELHVDQUEyQzs7SUFDM0MsaUNBQTJCOztJQUVmLDBDQUEwQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ0NvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTmdDb250cm9sU2VydmljZSB9IGZyb20gJy4uL3Byb3ZpZGVycy9uZy1jb250cm9sLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSWZFcnJvclNlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICAvLyBJbXBsZW1lbnQgb3VyIG93biBzdGF0dXMgY2hhbmdlcyBvYnNlcnZhYmxlLCBzaW5jZSBBbmd1bGFyIGNvbnRyb2xzIGRvbid0XG4gIC8vIGZpcmUgb24gZXZlbnRzIGxpa2UgYmx1ciwgYW5kIHdlIHdhbnQgdG8gcmV0dXJuIHRoZSBjb250cm9sIGluc3RlYWQgb2YgYSBzdHJpbmdcbiAgcHJpdmF0ZSBfc3RhdHVzQ2hhbmdlczogU3ViamVjdDxOZ0NvbnRyb2w+ID0gbmV3IFN1YmplY3QoKTtcbiAgZ2V0IHN0YXR1c0NoYW5nZXMoKTogT2JzZXJ2YWJsZTxOZ0NvbnRyb2w+IHtcbiAgICByZXR1cm4gdGhpcy5fc3RhdHVzQ2hhbmdlcy5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcbiAgcHJpdmF0ZSBjb250cm9sOiBOZ0NvbnRyb2w7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBuZ0NvbnRyb2xTZXJ2aWNlOiBOZ0NvbnRyb2xTZXJ2aWNlKSB7XG4gICAgLy8gV2FpdCBmb3IgdGhlIGNvbnRyb2wgdG8gYmUgYXZhaWxhYmxlXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLm5nQ29udHJvbFNlcnZpY2UuY29udHJvbENoYW5nZXMuc3Vic2NyaWJlKGNvbnRyb2wgPT4ge1xuICAgICAgICB0aGlzLmNvbnRyb2wgPSBjb250cm9sO1xuICAgICAgICB0aGlzLmxpc3RlbkZvckNoYW5nZXMoKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8vIFN1YnNjcmliZSB0byB0aGUgc3RhdHVzIGNoYW5nZSBldmVudHMsIG9ubHkgYWZ0ZXIgdG91Y2hlZCBhbmQgZW1pdCB0aGUgY29udHJvbFxuICBwcml2YXRlIGxpc3RlbkZvckNoYW5nZXMoKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLmNvbnRyb2wuc3RhdHVzQ2hhbmdlcy5waXBlKGZpbHRlcigoKSA9PiB0aGlzLmNvbnRyb2wudG91Y2hlZCkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuX3N0YXR1c0NoYW5nZXMubmV4dCh0aGlzLmNvbnRyb2wpO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgLy8gQWxsb3dzIGEgY29udHJvbCB0byBwdXNoIGEgc3RhdHVzIGNoZWNrIHVwc3RyZWFtLCBzdWNoIGFzIG9uIGJsdXJcbiAgdHJpZ2dlclN0YXR1c0NoYW5nZSgpIHtcbiAgICBpZiAodGhpcy5jb250cm9sKSB7XG4gICAgICB0aGlzLl9zdGF0dXNDaGFuZ2VzLm5leHQodGhpcy5jb250cm9sKTtcbiAgICB9XG4gIH1cblxuICAvLyBDbGVhbiB1cCBzdWJzY3JpcHRpb25zXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHN1YiA9PiBzdWIudW5zdWJzY3JpYmUoKSk7XG4gIH1cbn1cbiJdfQ==