/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive, Input } from '@angular/core';
import { Layouts, LayoutService } from './providers/layout.service';
export class ClrLayout {
    /**
     * @param {?} layoutService
     */
    constructor(layoutService) {
        this.layoutService = layoutService;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // Only set the layout if it is a valid option
        if (this.layout && this.layoutService.isValid(this.layout)) {
            this.layoutService.layout = this.layout;
        }
    }
}
ClrLayout.decorators = [
    { type: Directive, args: [{
                selector: '[clrLayout]',
                host: {
                    '[class]': 'layoutService.layoutClass',
                },
            },] }
];
/** @nocollapse */
ClrLayout.ctorParameters = () => [
    { type: LayoutService }
];
ClrLayout.propDecorators = {
    layout: [{ type: Input, args: ['clrLayout',] }]
};
if (false) {
    /** @type {?} */
    ClrLayout.prototype.layout;
    /** @type {?} */
    ClrLayout.prototype.layoutService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZm9ybXMvY29tbW9uL2xheW91dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFNQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBUXBFLE1BQU0sT0FBTyxTQUFTOzs7O0lBR3BCLFlBQW1CLGFBQTRCO1FBQTVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO0lBQUcsQ0FBQzs7OztJQUVuRCxRQUFRO1FBQ04sOENBQThDO1FBQzlDLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDMUQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztTQUN6QztJQUNILENBQUM7OztZQWhCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGFBQWE7Z0JBQ3ZCLElBQUksRUFBRTtvQkFDSixTQUFTLEVBQUUsMkJBQTJCO2lCQUN2QzthQUNGOzs7O1lBUGlCLGFBQWE7OztxQkFTNUIsS0FBSyxTQUFDLFdBQVc7Ozs7SUFBbEIsMkJBQW9DOztJQUV4QixrQ0FBbUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IExheW91dHMsIExheW91dFNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9sYXlvdXQuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tjbHJMYXlvdXRdJyxcbiAgaG9zdDoge1xuICAgICdbY2xhc3NdJzogJ2xheW91dFNlcnZpY2UubGF5b3V0Q2xhc3MnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBDbHJMYXlvdXQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoJ2NsckxheW91dCcpIGxheW91dDogTGF5b3V0cztcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbGF5b3V0U2VydmljZTogTGF5b3V0U2VydmljZSkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICAvLyBPbmx5IHNldCB0aGUgbGF5b3V0IGlmIGl0IGlzIGEgdmFsaWQgb3B0aW9uXG4gICAgaWYgKHRoaXMubGF5b3V0ICYmIHRoaXMubGF5b3V0U2VydmljZS5pc1ZhbGlkKHRoaXMubGF5b3V0KSkge1xuICAgICAgdGhpcy5sYXlvdXRTZXJ2aWNlLmxheW91dCA9IHRoaXMubGF5b3V0O1xuICAgIH1cbiAgfVxufVxuIl19