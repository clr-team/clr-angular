/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
var VerticalNavService = /** @class */ (function () {
    function VerticalNavService() {
        this._animateOnCollapsed = new Subject();
        this._collapsedChanged = new Subject();
        this._collapsed = false;
        this._collapsible = false;
    }
    Object.defineProperty(VerticalNavService.prototype, "animateOnCollapsed", {
        get: /**
         * @return {?}
         */
        function () {
            return this._animateOnCollapsed.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VerticalNavService.prototype, "collapsedChanged", {
        get: /**
         * @return {?}
         */
        function () {
            return this._collapsedChanged.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VerticalNavService.prototype, "collapsed", {
        get: /**
         * @return {?}
         */
        function () {
            return this._collapsed;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            value = !!value;
            if (this.collapsible && this._collapsed !== value) {
                this.updateCollapseBehavior(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VerticalNavService.prototype, "collapsible", {
        get: /**
         * @return {?}
         */
        function () {
            return this._collapsible;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            value = !!value;
            if (this._collapsible !== value) {
                if (!value && this.collapsed) {
                    this.updateCollapseBehavior(false);
                }
                this._collapsible = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    VerticalNavService.prototype.updateCollapseBehavior = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this._animateOnCollapsed.next(value);
        this._collapsed = value;
        this._collapsedChanged.next(value);
    };
    VerticalNavService.decorators = [
        { type: Injectable }
    ];
    return VerticalNavService;
}());
export { VerticalNavService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    VerticalNavService.prototype._animateOnCollapsed;
    /**
     * @type {?}
     * @private
     */
    VerticalNavService.prototype._collapsedChanged;
    /**
     * @type {?}
     * @private
     */
    VerticalNavService.prototype._collapsed;
    /**
     * @type {?}
     * @private
     */
    VerticalNavService.prototype._collapsible;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVydGljYWwtbmF2LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJsYXlvdXQvdmVydGljYWwtbmF2L3Byb3ZpZGVycy92ZXJ0aWNhbC1uYXYuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFNQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFL0I7SUFBQTtRQUVVLHdCQUFtQixHQUFxQixJQUFJLE9BQU8sRUFBVyxDQUFDO1FBTS9ELHNCQUFpQixHQUFxQixJQUFJLE9BQU8sRUFBVyxDQUFDO1FBTTdELGVBQVUsR0FBWSxLQUFLLENBQUM7UUFhNUIsaUJBQVksR0FBWSxLQUFLLENBQUM7SUFxQnhDLENBQUM7SUE1Q0Msc0JBQUksa0RBQWtCOzs7O1FBQXRCO1lBQ0UsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDakQsQ0FBQzs7O09BQUE7SUFJRCxzQkFBSSxnREFBZ0I7Ozs7UUFBcEI7WUFDRSxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUMvQyxDQUFDOzs7T0FBQTtJQUlELHNCQUFJLHlDQUFTOzs7O1FBQWI7WUFDRSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDekIsQ0FBQzs7Ozs7UUFFRCxVQUFjLEtBQWM7WUFDMUIsS0FBSyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDaEIsSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssS0FBSyxFQUFFO2dCQUNqRCxJQUFJLENBQUMsc0JBQXNCLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDcEM7UUFDSCxDQUFDOzs7T0FQQTtJQVdELHNCQUFJLDJDQUFXOzs7O1FBQWY7WUFDRSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDM0IsQ0FBQzs7Ozs7UUFFRCxVQUFnQixLQUFjO1lBQzVCLEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQ2hCLElBQUksSUFBSSxDQUFDLFlBQVksS0FBSyxLQUFLLEVBQUU7Z0JBQy9CLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtvQkFDNUIsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNwQztnQkFDRCxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQzthQUMzQjtRQUNILENBQUM7OztPQVZBOzs7Ozs7SUFZTyxtREFBc0I7Ozs7O0lBQTlCLFVBQStCLEtBQWM7UUFDM0MsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JDLENBQUM7O2dCQS9DRixVQUFVOztJQWdEWCx5QkFBQztDQUFBLEFBaERELElBZ0RDO1NBL0NZLGtCQUFrQjs7Ozs7O0lBQzdCLGlEQUF1RTs7Ozs7SUFNdkUsK0NBQXFFOzs7OztJQU1yRSx3Q0FBb0M7Ozs7O0lBYXBDLDBDQUFzQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVmVydGljYWxOYXZTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBfYW5pbWF0ZU9uQ29sbGFwc2VkOiBTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcblxuICBnZXQgYW5pbWF0ZU9uQ29sbGFwc2VkKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLl9hbmltYXRlT25Db2xsYXBzZWQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBwcml2YXRlIF9jb2xsYXBzZWRDaGFuZ2VkOiBTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcblxuICBnZXQgY29sbGFwc2VkQ2hhbmdlZCgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5fY29sbGFwc2VkQ2hhbmdlZC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NvbGxhcHNlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGdldCBjb2xsYXBzZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbGxhcHNlZDtcbiAgfVxuXG4gIHNldCBjb2xsYXBzZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB2YWx1ZSA9ICEhdmFsdWU7XG4gICAgaWYgKHRoaXMuY29sbGFwc2libGUgJiYgdGhpcy5fY29sbGFwc2VkICE9PSB2YWx1ZSkge1xuICAgICAgdGhpcy51cGRhdGVDb2xsYXBzZUJlaGF2aW9yKHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9jb2xsYXBzaWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGdldCBjb2xsYXBzaWJsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fY29sbGFwc2libGU7XG4gIH1cblxuICBzZXQgY29sbGFwc2libGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB2YWx1ZSA9ICEhdmFsdWU7XG4gICAgaWYgKHRoaXMuX2NvbGxhcHNpYmxlICE9PSB2YWx1ZSkge1xuICAgICAgaWYgKCF2YWx1ZSAmJiB0aGlzLmNvbGxhcHNlZCkge1xuICAgICAgICB0aGlzLnVwZGF0ZUNvbGxhcHNlQmVoYXZpb3IoZmFsc2UpO1xuICAgICAgfVxuICAgICAgdGhpcy5fY29sbGFwc2libGUgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZUNvbGxhcHNlQmVoYXZpb3IodmFsdWU6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLl9hbmltYXRlT25Db2xsYXBzZWQubmV4dCh2YWx1ZSk7XG4gICAgdGhpcy5fY29sbGFwc2VkID0gdmFsdWU7XG4gICAgdGhpcy5fY29sbGFwc2VkQ2hhbmdlZC5uZXh0KHZhbHVlKTtcbiAgfVxufVxuIl19