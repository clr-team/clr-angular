/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * @abstract
 */
var /**
 * @abstract
 */
FocusableItem = /** @class */ (function () {
    function FocusableItem() {
    }
    return FocusableItem;
}());
/**
 * @abstract
 */
export { FocusableItem };
if (false) {
    /** @type {?} */
    FocusableItem.prototype.id;
    /** @type {?} */
    FocusableItem.prototype.disabled;
    /** @type {?} */
    FocusableItem.prototype.up;
    /** @type {?} */
    FocusableItem.prototype.down;
    /** @type {?} */
    FocusableItem.prototype.left;
    /** @type {?} */
    FocusableItem.prototype.right;
    /**
     * @abstract
     * @return {?}
     */
    FocusableItem.prototype.focus = function () { };
    /**
     * @abstract
     * @return {?}
     */
    FocusableItem.prototype.blur = function () { };
    /**
     * @abstract
     * @return {?}
     */
    FocusableItem.prototype.activate = function () { };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9jdXNhYmxlLWl0ZW0uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJ1dGlscy9mb2N1cy9mb2N1c2FibGUtaXRlbS9mb2N1c2FibGUtaXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFRQTs7OztJQUFBO0lBWUEsQ0FBQztJQUFELG9CQUFDO0FBQUQsQ0FBQyxBQVpELElBWUM7Ozs7Ozs7SUFYQywyQkFBVzs7SUFDWCxpQ0FBbUI7O0lBTW5CLDJCQUErQzs7SUFDL0MsNkJBQWlEOztJQUNqRCw2QkFBaUQ7O0lBQ2pELDhCQUFrRDs7Ozs7SUFQbEQsZ0RBQXVCOzs7OztJQUN2QiwrQ0FBc0I7Ozs7O0lBQ3RCLG1EQUEyQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRm9jdXNhYmxlSXRlbSB7XG4gIGlkOiBzdHJpbmc7XG4gIGRpc2FibGVkPzogYm9vbGVhbjtcblxuICBhYnN0cmFjdCBmb2N1cygpOiB2b2lkO1xuICBhYnN0cmFjdCBibHVyKCk6IHZvaWQ7XG4gIGFic3RyYWN0IGFjdGl2YXRlPygpOiB2b2lkO1xuXG4gIHVwPzogRm9jdXNhYmxlSXRlbSB8IE9ic2VydmFibGU8Rm9jdXNhYmxlSXRlbT47XG4gIGRvd24/OiBGb2N1c2FibGVJdGVtIHwgT2JzZXJ2YWJsZTxGb2N1c2FibGVJdGVtPjtcbiAgbGVmdD86IEZvY3VzYWJsZUl0ZW0gfCBPYnNlcnZhYmxlPEZvY3VzYWJsZUl0ZW0+O1xuICByaWdodD86IEZvY3VzYWJsZUl0ZW0gfCBPYnNlcnZhYmxlPEZvY3VzYWJsZUl0ZW0+O1xufVxuIl19