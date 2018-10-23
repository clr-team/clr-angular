/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/*
 * If we someday want to be able to render the datagrid in a webworker,
 * this is where we would test if we're in headless mode. Right now it's not testing anything, but any access
 * to native DOM elements' methods and properties in the Datagrid happens here.
 */
import { Injectable } from '@angular/core';
var DomAdapter = /** @class */ (function () {
    function DomAdapter() {
    }
    /**
     * @param {?} element
     * @return {?}
     */
    DomAdapter.prototype.userDefinedWidth = /**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        element.classList.add('datagrid-cell-width-zero');
        /** @type {?} */
        var userDefinedWidth = parseInt(getComputedStyle(element).getPropertyValue('width'), 10);
        element.classList.remove('datagrid-cell-width-zero');
        return userDefinedWidth;
    };
    /**
     * @param {?} element
     * @return {?}
     */
    DomAdapter.prototype.scrollBarWidth = /**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        return element.offsetWidth - element.clientWidth;
    };
    /**
     * @param {?} element
     * @return {?}
     */
    DomAdapter.prototype.scrollWidth = /**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        return element.scrollWidth || 0;
    };
    /**
     * @param {?} element
     * @return {?}
     */
    DomAdapter.prototype.computedHeight = /**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        return parseInt(getComputedStyle(element).getPropertyValue('height'), 10);
    };
    /**
     * @param {?} element
     * @return {?}
     */
    DomAdapter.prototype.clientRect = /**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        /** @type {?} */
        var elementClientRect = element.getBoundingClientRect();
        return {
            top: parseInt(elementClientRect.top, 10),
            bottom: parseInt(elementClientRect.bottom, 10),
            left: parseInt(elementClientRect.left, 10),
            right: parseInt(elementClientRect.right, 10),
            width: parseInt(elementClientRect.width, 10),
            height: parseInt(elementClientRect.height, 10),
        };
    };
    /**
     * @param {?} element
     * @return {?}
     */
    DomAdapter.prototype.minWidth = /**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        return parseInt(getComputedStyle(element).getPropertyValue('min-width'), 10);
    };
    /**
     * @param {?} element
     * @return {?}
     */
    DomAdapter.prototype.focus = /**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        element.focus();
    };
    DomAdapter.decorators = [
        { type: Injectable }
    ];
    return DomAdapter;
}());
export { DomAdapter };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tLWFkYXB0ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJ1dGlscy9kb20tYWRhcHRlci9kb20tYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQVlBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0M7SUFBQTtJQXdDQSxDQUFDOzs7OztJQXRDQyxxQ0FBZ0I7Ozs7SUFBaEIsVUFBaUIsT0FBb0I7UUFDbkMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsMEJBQTBCLENBQUMsQ0FBQzs7WUFDNUMsZ0JBQWdCLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUMxRixPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1FBQ3JELE9BQU8sZ0JBQWdCLENBQUM7SUFDMUIsQ0FBQzs7Ozs7SUFFRCxtQ0FBYzs7OztJQUFkLFVBQWUsT0FBWTtRQUN6QixPQUFPLE9BQU8sQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQztJQUNuRCxDQUFDOzs7OztJQUVELGdDQUFXOzs7O0lBQVgsVUFBWSxPQUFZO1FBQ3RCLE9BQU8sT0FBTyxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUM7SUFDbEMsQ0FBQzs7Ozs7SUFFRCxtQ0FBYzs7OztJQUFkLFVBQWUsT0FBWTtRQUN6QixPQUFPLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUM1RSxDQUFDOzs7OztJQUVELCtCQUFVOzs7O0lBQVYsVUFBVyxPQUFZOztZQUNmLGlCQUFpQixHQUFHLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRTtRQUN6RCxPQUFPO1lBQ0wsR0FBRyxFQUFFLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDO1lBQ3hDLE1BQU0sRUFBRSxRQUFRLENBQUMsaUJBQWlCLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQztZQUM5QyxJQUFJLEVBQUUsUUFBUSxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxFQUFFLENBQUM7WUFDMUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDO1lBQzVDLEtBQUssRUFBRSxRQUFRLENBQUMsaUJBQWlCLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQztZQUM1QyxNQUFNLEVBQUUsUUFBUSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUM7U0FDL0MsQ0FBQztJQUNKLENBQUM7Ozs7O0lBRUQsNkJBQVE7Ozs7SUFBUixVQUFTLE9BQVk7UUFDbkIsT0FBTyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDL0UsQ0FBQzs7Ozs7SUFFRCwwQkFBSzs7OztJQUFMLFVBQU0sT0FBWTtRQUNoQixPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDbEIsQ0FBQzs7Z0JBdkNGLFVBQVU7O0lBd0NYLGlCQUFDO0NBQUEsQUF4Q0QsSUF3Q0M7U0F2Q1ksVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuLypcbiAqIElmIHdlIHNvbWVkYXkgd2FudCB0byBiZSBhYmxlIHRvIHJlbmRlciB0aGUgZGF0YWdyaWQgaW4gYSB3ZWJ3b3JrZXIsXG4gKiB0aGlzIGlzIHdoZXJlIHdlIHdvdWxkIHRlc3QgaWYgd2UncmUgaW4gaGVhZGxlc3MgbW9kZS4gUmlnaHQgbm93IGl0J3Mgbm90IHRlc3RpbmcgYW55dGhpbmcsIGJ1dCBhbnkgYWNjZXNzXG4gKiB0byBuYXRpdmUgRE9NIGVsZW1lbnRzJyBtZXRob2RzIGFuZCBwcm9wZXJ0aWVzIGluIHRoZSBEYXRhZ3JpZCBoYXBwZW5zIGhlcmUuXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRG9tQWRhcHRlciB7XG4gIHVzZXJEZWZpbmVkV2lkdGgoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBudW1iZXIge1xuICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZGF0YWdyaWQtY2VsbC13aWR0aC16ZXJvJyk7XG4gICAgY29uc3QgdXNlckRlZmluZWRXaWR0aCA9IHBhcnNlSW50KGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCkuZ2V0UHJvcGVydHlWYWx1ZSgnd2lkdGgnKSwgMTApO1xuICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnZGF0YWdyaWQtY2VsbC13aWR0aC16ZXJvJyk7XG4gICAgcmV0dXJuIHVzZXJEZWZpbmVkV2lkdGg7XG4gIH1cblxuICBzY3JvbGxCYXJXaWR0aChlbGVtZW50OiBhbnkpIHtcbiAgICByZXR1cm4gZWxlbWVudC5vZmZzZXRXaWR0aCAtIGVsZW1lbnQuY2xpZW50V2lkdGg7XG4gIH1cblxuICBzY3JvbGxXaWR0aChlbGVtZW50OiBhbnkpIHtcbiAgICByZXR1cm4gZWxlbWVudC5zY3JvbGxXaWR0aCB8fCAwO1xuICB9XG5cbiAgY29tcHV0ZWRIZWlnaHQoZWxlbWVudDogYW55KTogbnVtYmVyIHtcbiAgICByZXR1cm4gcGFyc2VJbnQoZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KS5nZXRQcm9wZXJ0eVZhbHVlKCdoZWlnaHQnKSwgMTApO1xuICB9XG5cbiAgY2xpZW50UmVjdChlbGVtZW50OiBhbnkpOiBDbGllbnRSZWN0IHtcbiAgICBjb25zdCBlbGVtZW50Q2xpZW50UmVjdCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRvcDogcGFyc2VJbnQoZWxlbWVudENsaWVudFJlY3QudG9wLCAxMCksXG4gICAgICBib3R0b206IHBhcnNlSW50KGVsZW1lbnRDbGllbnRSZWN0LmJvdHRvbSwgMTApLFxuICAgICAgbGVmdDogcGFyc2VJbnQoZWxlbWVudENsaWVudFJlY3QubGVmdCwgMTApLFxuICAgICAgcmlnaHQ6IHBhcnNlSW50KGVsZW1lbnRDbGllbnRSZWN0LnJpZ2h0LCAxMCksXG4gICAgICB3aWR0aDogcGFyc2VJbnQoZWxlbWVudENsaWVudFJlY3Qud2lkdGgsIDEwKSxcbiAgICAgIGhlaWdodDogcGFyc2VJbnQoZWxlbWVudENsaWVudFJlY3QuaGVpZ2h0LCAxMCksXG4gICAgfTtcbiAgfVxuXG4gIG1pbldpZHRoKGVsZW1lbnQ6IGFueSk6IG51bWJlciB7XG4gICAgcmV0dXJuIHBhcnNlSW50KGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCkuZ2V0UHJvcGVydHlWYWx1ZSgnbWluLXdpZHRoJyksIDEwKTtcbiAgfVxuXG4gIGZvY3VzKGVsZW1lbnQ6IGFueSk6IHZvaWQge1xuICAgIGVsZW1lbnQuZm9jdXMoKTtcbiAgfVxufVxuIl19