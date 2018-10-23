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
export class DomAdapter {
    /**
     * @param {?} element
     * @return {?}
     */
    userDefinedWidth(element) {
        element.classList.add('datagrid-cell-width-zero');
        /** @type {?} */
        const userDefinedWidth = parseInt(getComputedStyle(element).getPropertyValue('width'), 10);
        element.classList.remove('datagrid-cell-width-zero');
        return userDefinedWidth;
    }
    /**
     * @param {?} element
     * @return {?}
     */
    scrollBarWidth(element) {
        return element.offsetWidth - element.clientWidth;
    }
    /**
     * @param {?} element
     * @return {?}
     */
    scrollWidth(element) {
        return element.scrollWidth || 0;
    }
    /**
     * @param {?} element
     * @return {?}
     */
    computedHeight(element) {
        return parseInt(getComputedStyle(element).getPropertyValue('height'), 10);
    }
    /**
     * @param {?} element
     * @return {?}
     */
    clientRect(element) {
        /** @type {?} */
        const elementClientRect = element.getBoundingClientRect();
        return {
            top: parseInt(elementClientRect.top, 10),
            bottom: parseInt(elementClientRect.bottom, 10),
            left: parseInt(elementClientRect.left, 10),
            right: parseInt(elementClientRect.right, 10),
            width: parseInt(elementClientRect.width, 10),
            height: parseInt(elementClientRect.height, 10),
        };
    }
    /**
     * @param {?} element
     * @return {?}
     */
    minWidth(element) {
        return parseInt(getComputedStyle(element).getPropertyValue('min-width'), 10);
    }
    /**
     * @param {?} element
     * @return {?}
     */
    focus(element) {
        element.focus();
    }
}
DomAdapter.decorators = [
    { type: Injectable }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tLWFkYXB0ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJ1dGlscy9kb20tYWRhcHRlci9kb20tYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQVlBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHM0MsTUFBTSxPQUFPLFVBQVU7Ozs7O0lBQ3JCLGdCQUFnQixDQUFDLE9BQW9CO1FBQ25DLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLDBCQUEwQixDQUFDLENBQUM7O2NBQzVDLGdCQUFnQixHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLENBQUM7UUFDMUYsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsMEJBQTBCLENBQUMsQ0FBQztRQUNyRCxPQUFPLGdCQUFnQixDQUFDO0lBQzFCLENBQUM7Ozs7O0lBRUQsY0FBYyxDQUFDLE9BQVk7UUFDekIsT0FBTyxPQUFPLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUM7SUFDbkQsQ0FBQzs7Ozs7SUFFRCxXQUFXLENBQUMsT0FBWTtRQUN0QixPQUFPLE9BQU8sQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDO0lBQ2xDLENBQUM7Ozs7O0lBRUQsY0FBYyxDQUFDLE9BQVk7UUFDekIsT0FBTyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDNUUsQ0FBQzs7Ozs7SUFFRCxVQUFVLENBQUMsT0FBWTs7Y0FDZixpQkFBaUIsR0FBRyxPQUFPLENBQUMscUJBQXFCLEVBQUU7UUFDekQsT0FBTztZQUNMLEdBQUcsRUFBRSxRQUFRLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQztZQUN4QyxNQUFNLEVBQUUsUUFBUSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUM7WUFDOUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDO1lBQzFDLEtBQUssRUFBRSxRQUFRLENBQUMsaUJBQWlCLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQztZQUM1QyxLQUFLLEVBQUUsUUFBUSxDQUFDLGlCQUFpQixDQUFDLEtBQUssRUFBRSxFQUFFLENBQUM7WUFDNUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDO1NBQy9DLENBQUM7SUFDSixDQUFDOzs7OztJQUVELFFBQVEsQ0FBQyxPQUFZO1FBQ25CLE9BQU8sUUFBUSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQy9FLENBQUM7Ozs7O0lBRUQsS0FBSyxDQUFDLE9BQVk7UUFDaEIsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2xCLENBQUM7OztZQXZDRixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG4vKlxuICogSWYgd2Ugc29tZWRheSB3YW50IHRvIGJlIGFibGUgdG8gcmVuZGVyIHRoZSBkYXRhZ3JpZCBpbiBhIHdlYndvcmtlcixcbiAqIHRoaXMgaXMgd2hlcmUgd2Ugd291bGQgdGVzdCBpZiB3ZSdyZSBpbiBoZWFkbGVzcyBtb2RlLiBSaWdodCBub3cgaXQncyBub3QgdGVzdGluZyBhbnl0aGluZywgYnV0IGFueSBhY2Nlc3NcbiAqIHRvIG5hdGl2ZSBET00gZWxlbWVudHMnIG1ldGhvZHMgYW5kIHByb3BlcnRpZXMgaW4gdGhlIERhdGFncmlkIGhhcHBlbnMgaGVyZS5cbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEb21BZGFwdGVyIHtcbiAgdXNlckRlZmluZWRXaWR0aChlbGVtZW50OiBIVE1MRWxlbWVudCk6IG51bWJlciB7XG4gICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdkYXRhZ3JpZC1jZWxsLXdpZHRoLXplcm8nKTtcbiAgICBjb25zdCB1c2VyRGVmaW5lZFdpZHRoID0gcGFyc2VJbnQoZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KS5nZXRQcm9wZXJ0eVZhbHVlKCd3aWR0aCcpLCAxMCk7XG4gICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdkYXRhZ3JpZC1jZWxsLXdpZHRoLXplcm8nKTtcbiAgICByZXR1cm4gdXNlckRlZmluZWRXaWR0aDtcbiAgfVxuXG4gIHNjcm9sbEJhcldpZHRoKGVsZW1lbnQ6IGFueSkge1xuICAgIHJldHVybiBlbGVtZW50Lm9mZnNldFdpZHRoIC0gZWxlbWVudC5jbGllbnRXaWR0aDtcbiAgfVxuXG4gIHNjcm9sbFdpZHRoKGVsZW1lbnQ6IGFueSkge1xuICAgIHJldHVybiBlbGVtZW50LnNjcm9sbFdpZHRoIHx8IDA7XG4gIH1cblxuICBjb21wdXRlZEhlaWdodChlbGVtZW50OiBhbnkpOiBudW1iZXIge1xuICAgIHJldHVybiBwYXJzZUludChnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpLmdldFByb3BlcnR5VmFsdWUoJ2hlaWdodCcpLCAxMCk7XG4gIH1cblxuICBjbGllbnRSZWN0KGVsZW1lbnQ6IGFueSk6IENsaWVudFJlY3Qge1xuICAgIGNvbnN0IGVsZW1lbnRDbGllbnRSZWN0ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICByZXR1cm4ge1xuICAgICAgdG9wOiBwYXJzZUludChlbGVtZW50Q2xpZW50UmVjdC50b3AsIDEwKSxcbiAgICAgIGJvdHRvbTogcGFyc2VJbnQoZWxlbWVudENsaWVudFJlY3QuYm90dG9tLCAxMCksXG4gICAgICBsZWZ0OiBwYXJzZUludChlbGVtZW50Q2xpZW50UmVjdC5sZWZ0LCAxMCksXG4gICAgICByaWdodDogcGFyc2VJbnQoZWxlbWVudENsaWVudFJlY3QucmlnaHQsIDEwKSxcbiAgICAgIHdpZHRoOiBwYXJzZUludChlbGVtZW50Q2xpZW50UmVjdC53aWR0aCwgMTApLFxuICAgICAgaGVpZ2h0OiBwYXJzZUludChlbGVtZW50Q2xpZW50UmVjdC5oZWlnaHQsIDEwKSxcbiAgICB9O1xuICB9XG5cbiAgbWluV2lkdGgoZWxlbWVudDogYW55KTogbnVtYmVyIHtcbiAgICByZXR1cm4gcGFyc2VJbnQoZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KS5nZXRQcm9wZXJ0eVZhbHVlKCdtaW4td2lkdGgnKSwgMTApO1xuICB9XG5cbiAgZm9jdXMoZWxlbWVudDogYW55KTogdm9pZCB7XG4gICAgZWxlbWVudC5mb2N1cygpO1xuICB9XG59XG4iXX0=