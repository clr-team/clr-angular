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
/** @enum {string} */
var Layouts = {
    VERTICAL: 'vertical',
    HORIZONTAL: 'horizontal',
    COMPACT: 'compact',
};
export { Layouts };
var LayoutService = /** @class */ (function () {
    function LayoutService() {
        this.layout = Layouts.VERTICAL;
        // This is basically a replacement for Object.values(), which IE11 and Node <9 don't support :(
        // String enums cannot be reverse-mapped, meaning Layouts['COMPACT'] does not return 'compact' so
        // this exists to deal with this little caveat to get the list of the values as an array.
        this.layoutValues = Object.keys(Layouts).map(function (key) { return Layouts[key]; });
    }
    /**
     * @return {?}
     */
    LayoutService.prototype.isVertical = /**
     * @return {?}
     */
    function () {
        return this.layout === Layouts.VERTICAL;
    };
    Object.defineProperty(LayoutService.prototype, "layoutClass", {
        get: /**
         * @return {?}
         */
        function () {
            return "clr-form-" + this.layout;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} layout
     * @return {?}
     */
    LayoutService.prototype.isValid = /**
     * @param {?} layout
     * @return {?}
     */
    function (layout) {
        return this.layoutValues.indexOf(layout) > -1;
    };
    LayoutService.decorators = [
        { type: Injectable }
    ];
    return LayoutService;
}());
export { LayoutService };
if (false) {
    /** @type {?} */
    LayoutService.prototype.layout;
    /** @type {?} */
    LayoutService.prototype.layoutValues;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJmb3Jtcy9jb21tb24vcHJvdmlkZXJzL2xheW91dC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQU1BLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7OztJQUd6QyxVQUFXLFVBQVU7SUFDckIsWUFBYSxZQUFZO0lBQ3pCLFNBQVUsU0FBUzs7O0FBR3JCO0lBQUE7UUFFRSxXQUFNLEdBQVksT0FBTyxDQUFDLFFBQVEsQ0FBQzs7OztRQUkzQixpQkFBWSxHQUFhLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFaLENBQVksQ0FBQyxDQUFDO0lBYWpGLENBQUM7Ozs7SUFYQyxrQ0FBVTs7O0lBQVY7UUFDRSxPQUFPLElBQUksQ0FBQyxNQUFNLEtBQUssT0FBTyxDQUFDLFFBQVEsQ0FBQztJQUMxQyxDQUFDO0lBRUQsc0JBQUksc0NBQVc7Ozs7UUFBZjtZQUNFLE9BQU8sY0FBWSxJQUFJLENBQUMsTUFBUSxDQUFDO1FBQ25DLENBQUM7OztPQUFBOzs7OztJQUVELCtCQUFPOzs7O0lBQVAsVUFBUSxNQUFjO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDaEQsQ0FBQzs7Z0JBbEJGLFVBQVU7O0lBbUJYLG9CQUFDO0NBQUEsQUFuQkQsSUFtQkM7U0FsQlksYUFBYTs7O0lBQ3hCLCtCQUFtQzs7SUFJbkMscUNBQStFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmV4cG9ydCBlbnVtIExheW91dHMge1xuICBWRVJUSUNBTCA9ICd2ZXJ0aWNhbCcsXG4gIEhPUklaT05UQUwgPSAnaG9yaXpvbnRhbCcsXG4gIENPTVBBQ1QgPSAnY29tcGFjdCcsXG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBMYXlvdXRTZXJ2aWNlIHtcbiAgbGF5b3V0OiBMYXlvdXRzID0gTGF5b3V0cy5WRVJUSUNBTDtcbiAgLy8gVGhpcyBpcyBiYXNpY2FsbHkgYSByZXBsYWNlbWVudCBmb3IgT2JqZWN0LnZhbHVlcygpLCB3aGljaCBJRTExIGFuZCBOb2RlIDw5IGRvbid0IHN1cHBvcnQgOihcbiAgLy8gU3RyaW5nIGVudW1zIGNhbm5vdCBiZSByZXZlcnNlLW1hcHBlZCwgbWVhbmluZyBMYXlvdXRzWydDT01QQUNUJ10gZG9lcyBub3QgcmV0dXJuICdjb21wYWN0JyBzb1xuICAvLyB0aGlzIGV4aXN0cyB0byBkZWFsIHdpdGggdGhpcyBsaXR0bGUgY2F2ZWF0IHRvIGdldCB0aGUgbGlzdCBvZiB0aGUgdmFsdWVzIGFzIGFuIGFycmF5LlxuICBwcml2YXRlIGxheW91dFZhbHVlczogc3RyaW5nW10gPSBPYmplY3Qua2V5cyhMYXlvdXRzKS5tYXAoa2V5ID0+IExheW91dHNba2V5XSk7XG5cbiAgaXNWZXJ0aWNhbCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5sYXlvdXQgPT09IExheW91dHMuVkVSVElDQUw7XG4gIH1cblxuICBnZXQgbGF5b3V0Q2xhc3MoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYGNsci1mb3JtLSR7dGhpcy5sYXlvdXR9YDtcbiAgfVxuXG4gIGlzVmFsaWQobGF5b3V0OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5sYXlvdXRWYWx1ZXMuaW5kZXhPZihsYXlvdXQpID4gLTE7XG4gIH1cbn1cbiJdfQ==