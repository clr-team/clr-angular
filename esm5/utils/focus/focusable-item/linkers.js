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
 * Links a set of focusable items to a parent along one direction
 * @param {?} items
 * @param {?} parent
 * @param {?} direction
 * @return {?}
 */
export function linkParent(items, parent, direction) {
    items.forEach((/**
     * @param {?} item
     * @return {?}
     */
    function (item) { return (item[direction] = parent); }));
}
/**
 * Double-links a set of focusable items vertically, possibly looping
 * @param {?} items
 * @param {?=} loop
 * @return {?}
 */
export function linkVertical(items, loop) {
    if (loop === void 0) { loop = true; }
    items.forEach((/**
     * @param {?} item
     * @param {?} index
     * @return {?}
     */
    function (item, index) {
        if (index > 0) {
            item.up = items[index - 1];
        }
        if (index < items.length - 1) {
            item.down = items[index + 1];
        }
    }));
    if (loop && items.length > 1) {
        items[0].up = items[items.length - 1];
        items[items.length - 1].down = items[0];
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlua2Vycy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbInV0aWxzL2ZvY3VzL2ZvY3VzYWJsZS1pdGVtL2xpbmtlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQWFBLE1BQU0sVUFBVSxVQUFVLENBQ3hCLEtBQXNCLEVBQ3RCLE1BQWlELEVBQ2pELFNBQTRCO0lBRTVCLEtBQUssQ0FBQyxPQUFPOzs7O0lBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxNQUFNLENBQUMsRUFBMUIsQ0FBMEIsRUFBQyxDQUFDO0FBQ3BELENBQUM7Ozs7Ozs7QUFLRCxNQUFNLFVBQVUsWUFBWSxDQUFDLEtBQXNCLEVBQUUsSUFBVztJQUFYLHFCQUFBLEVBQUEsV0FBVztJQUM5RCxLQUFLLENBQUMsT0FBTzs7Ozs7SUFBQyxVQUFDLElBQUksRUFBRSxLQUFLO1FBQ3hCLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRTtZQUNiLElBQUksQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztTQUM1QjtRQUNELElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQzVCLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztTQUM5QjtJQUNILENBQUMsRUFBQyxDQUFDO0lBQ0gsSUFBSSxJQUFJLElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFDNUIsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN0QyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3pDO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQXJyb3dLZXlEaXJlY3Rpb24gfSBmcm9tICcuLi9hcnJvdy1rZXktZGlyZWN0aW9uLmVudW0nO1xuaW1wb3J0IHsgRm9jdXNhYmxlSXRlbSB9IGZyb20gJy4vZm9jdXNhYmxlLWl0ZW0nO1xuXG4vKipcbiAqIExpbmtzIGEgc2V0IG9mIGZvY3VzYWJsZSBpdGVtcyB0byBhIHBhcmVudCBhbG9uZyBvbmUgZGlyZWN0aW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsaW5rUGFyZW50KFxuICBpdGVtczogRm9jdXNhYmxlSXRlbVtdLFxuICBwYXJlbnQ6IEZvY3VzYWJsZUl0ZW0gfCBPYnNlcnZhYmxlPEZvY3VzYWJsZUl0ZW0+LFxuICBkaXJlY3Rpb246IEFycm93S2V5RGlyZWN0aW9uXG4pIHtcbiAgaXRlbXMuZm9yRWFjaChpdGVtID0+IChpdGVtW2RpcmVjdGlvbl0gPSBwYXJlbnQpKTtcbn1cblxuLyoqXG4gKiBEb3VibGUtbGlua3MgYSBzZXQgb2YgZm9jdXNhYmxlIGl0ZW1zIHZlcnRpY2FsbHksIHBvc3NpYmx5IGxvb3BpbmdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxpbmtWZXJ0aWNhbChpdGVtczogRm9jdXNhYmxlSXRlbVtdLCBsb29wID0gdHJ1ZSkge1xuICBpdGVtcy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgIGlmIChpbmRleCA+IDApIHtcbiAgICAgIGl0ZW0udXAgPSBpdGVtc1tpbmRleCAtIDFdO1xuICAgIH1cbiAgICBpZiAoaW5kZXggPCBpdGVtcy5sZW5ndGggLSAxKSB7XG4gICAgICBpdGVtLmRvd24gPSBpdGVtc1tpbmRleCArIDFdO1xuICAgIH1cbiAgfSk7XG4gIGlmIChsb29wICYmIGl0ZW1zLmxlbmd0aCA+IDEpIHtcbiAgICBpdGVtc1swXS51cCA9IGl0ZW1zW2l0ZW1zLmxlbmd0aCAtIDFdO1xuICAgIGl0ZW1zW2l0ZW1zLmxlbmd0aCAtIDFdLmRvd24gPSBpdGVtc1swXTtcbiAgfVxufVxuXG4vLyBSaWdodCBub3cgSSBvbmx5IG5lZWQgdGhlIHR3byBsaW5rZXJzIGFib3ZlLCBidXQgd2UgY2FuIGVhc2lseSBhZGQgbW9yZSBsaW5rZXJzLiBBIGNvdXBsZSBleGFtcGxlczpcbi8vIGV4cG9ydCBmdW5jdGlvbiBsaW5rSG9yaXpvbnRhbChpdGVtczogRm9jdXNhYmxlSXRlbVtdLCBsb29wID0gdHJ1ZSk7XG4vLyBleHBvcnQgZnVuY3Rpb24gbGlua1RhYmxlKGl0ZW1zOiBGb2N1c2FibGVJdGVtW11bXSk7XG4iXX0=