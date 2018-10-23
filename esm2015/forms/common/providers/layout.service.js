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
const Layouts = {
    VERTICAL: 'vertical',
    HORIZONTAL: 'horizontal',
    COMPACT: 'compact',
};
export { Layouts };
export class LayoutService {
    constructor() {
        this.layout = Layouts.VERTICAL;
        // This is basically a replacement for Object.values(), which IE11 and Node <9 don't support :(
        // String enums cannot be reverse-mapped, meaning Layouts['COMPACT'] does not return 'compact' so
        // this exists to deal with this little caveat to get the list of the values as an array.
        this.layoutValues = Object.keys(Layouts).map(key => Layouts[key]);
    }
    /**
     * @return {?}
     */
    isVertical() {
        return this.layout === Layouts.VERTICAL;
    }
    /**
     * @return {?}
     */
    get layoutClass() {
        return `clr-form-${this.layout}`;
    }
    /**
     * @param {?} layout
     * @return {?}
     */
    isValid(layout) {
        return this.layoutValues.indexOf(layout) > -1;
    }
}
LayoutService.decorators = [
    { type: Injectable }
];
if (false) {
    /** @type {?} */
    LayoutService.prototype.layout;
    /** @type {?} */
    LayoutService.prototype.layoutValues;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJmb3Jtcy9jb21tb24vcHJvdmlkZXJzL2xheW91dC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQU1BLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7OztJQUd6QyxVQUFXLFVBQVU7SUFDckIsWUFBYSxZQUFZO0lBQ3pCLFNBQVUsU0FBUzs7O0FBSXJCLE1BQU0sT0FBTyxhQUFhO0lBRDFCO1FBRUUsV0FBTSxHQUFZLE9BQU8sQ0FBQyxRQUFRLENBQUM7Ozs7UUFJM0IsaUJBQVksR0FBYSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBYWpGLENBQUM7Ozs7SUFYQyxVQUFVO1FBQ1IsT0FBTyxJQUFJLENBQUMsTUFBTSxLQUFLLE9BQU8sQ0FBQyxRQUFRLENBQUM7SUFDMUMsQ0FBQzs7OztJQUVELElBQUksV0FBVztRQUNiLE9BQU8sWUFBWSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDbkMsQ0FBQzs7Ozs7SUFFRCxPQUFPLENBQUMsTUFBYztRQUNwQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ2hELENBQUM7OztZQWxCRixVQUFVOzs7O0lBRVQsK0JBQW1DOztJQUluQyxxQ0FBK0UiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZXhwb3J0IGVudW0gTGF5b3V0cyB7XG4gIFZFUlRJQ0FMID0gJ3ZlcnRpY2FsJyxcbiAgSE9SSVpPTlRBTCA9ICdob3Jpem9udGFsJyxcbiAgQ09NUEFDVCA9ICdjb21wYWN0Jyxcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIExheW91dFNlcnZpY2Uge1xuICBsYXlvdXQ6IExheW91dHMgPSBMYXlvdXRzLlZFUlRJQ0FMO1xuICAvLyBUaGlzIGlzIGJhc2ljYWxseSBhIHJlcGxhY2VtZW50IGZvciBPYmplY3QudmFsdWVzKCksIHdoaWNoIElFMTEgYW5kIE5vZGUgPDkgZG9uJ3Qgc3VwcG9ydCA6KFxuICAvLyBTdHJpbmcgZW51bXMgY2Fubm90IGJlIHJldmVyc2UtbWFwcGVkLCBtZWFuaW5nIExheW91dHNbJ0NPTVBBQ1QnXSBkb2VzIG5vdCByZXR1cm4gJ2NvbXBhY3QnIHNvXG4gIC8vIHRoaXMgZXhpc3RzIHRvIGRlYWwgd2l0aCB0aGlzIGxpdHRsZSBjYXZlYXQgdG8gZ2V0IHRoZSBsaXN0IG9mIHRoZSB2YWx1ZXMgYXMgYW4gYXJyYXkuXG4gIHByaXZhdGUgbGF5b3V0VmFsdWVzOiBzdHJpbmdbXSA9IE9iamVjdC5rZXlzKExheW91dHMpLm1hcChrZXkgPT4gTGF5b3V0c1trZXldKTtcblxuICBpc1ZlcnRpY2FsKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmxheW91dCA9PT0gTGF5b3V0cy5WRVJUSUNBTDtcbiAgfVxuXG4gIGdldCBsYXlvdXRDbGFzcygpOiBzdHJpbmcge1xuICAgIHJldHVybiBgY2xyLWZvcm0tJHt0aGlzLmxheW91dH1gO1xuICB9XG5cbiAgaXNWYWxpZChsYXlvdXQ6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmxheW91dFZhbHVlcy5pbmRleE9mKGxheW91dCkgPiAtMTtcbiAgfVxufVxuIl19