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
var MarkControlService = /** @class */ (function () {
    function MarkControlService() {
        this._touched = new Subject();
    }
    Object.defineProperty(MarkControlService.prototype, "touchedChange", {
        get: /**
         * @return {?}
         */
        function () {
            return this._touched.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MarkControlService.prototype.markAsTouched = /**
     * @return {?}
     */
    function () {
        this._touched.next();
    };
    MarkControlService.decorators = [
        { type: Injectable }
    ];
    return MarkControlService;
}());
export { MarkControlService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    MarkControlService.prototype._touched;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFyay1jb250cm9sLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJmb3Jtcy9jb21tb24vcHJvdmlkZXJzL21hcmstY29udHJvbC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQU1BLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLE9BQU8sRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUUzQztJQUFBO1FBRVUsYUFBUSxHQUFrQixJQUFJLE9BQU8sRUFBRSxDQUFDO0lBU2xELENBQUM7SUFQQyxzQkFBSSw2Q0FBYTs7OztRQUFqQjtZQUNFLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN0QyxDQUFDOzs7T0FBQTs7OztJQUVELDBDQUFhOzs7SUFBYjtRQUNFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDdkIsQ0FBQzs7Z0JBVkYsVUFBVTs7SUFXWCx5QkFBQztDQUFBLEFBWEQsSUFXQztTQVZZLGtCQUFrQjs7Ozs7O0lBQzdCLHNDQUFnRCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWFya0NvbnRyb2xTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBfdG91Y2hlZDogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgZ2V0IHRvdWNoZWRDaGFuZ2UoKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX3RvdWNoZWQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBtYXJrQXNUb3VjaGVkKCkge1xuICAgIHRoaXMuX3RvdWNoZWQubmV4dCgpO1xuICB9XG59XG4iXX0=