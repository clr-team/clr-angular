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
                selector: '[clrForm][clrLayout]',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZm9ybXMvY29tbW9uL2xheW91dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFNQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBS3BFLE1BQU0sT0FBTyxTQUFTOzs7O0lBR3BCLFlBQW1CLGFBQTRCO1FBQTVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO0lBQUcsQ0FBQzs7OztJQUVuRCxRQUFRO1FBQ04sOENBQThDO1FBQzlDLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDMUQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztTQUN6QztJQUNILENBQUM7OztZQWJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsc0JBQXNCO2FBQ2pDOzs7O1lBSmlCLGFBQWE7OztxQkFNNUIsS0FBSyxTQUFDLFdBQVc7Ozs7SUFBbEIsMkJBQW9DOztJQUV4QixrQ0FBbUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IExheW91dHMsIExheW91dFNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9sYXlvdXQuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tjbHJGb3JtXVtjbHJMYXlvdXRdJyxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyTGF5b3V0IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCdjbHJMYXlvdXQnKSBsYXlvdXQ6IExheW91dHM7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGxheW91dFNlcnZpY2U6IExheW91dFNlcnZpY2UpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgLy8gT25seSBzZXQgdGhlIGxheW91dCBpZiBpdCBpcyBhIHZhbGlkIG9wdGlvblxuICAgIGlmICh0aGlzLmxheW91dCAmJiB0aGlzLmxheW91dFNlcnZpY2UuaXNWYWxpZCh0aGlzLmxheW91dCkpIHtcbiAgICAgIHRoaXMubGF5b3V0U2VydmljZS5sYXlvdXQgPSB0aGlzLmxheW91dDtcbiAgICB9XG4gIH1cbn1cbiJdfQ==