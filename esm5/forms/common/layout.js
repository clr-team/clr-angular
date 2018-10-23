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
var ClrLayout = /** @class */ (function () {
    function ClrLayout(layoutService) {
        this.layoutService = layoutService;
    }
    /**
     * @return {?}
     */
    ClrLayout.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        // Only set the layout if it is a valid option
        if (this.layout && this.layoutService.isValid(this.layout)) {
            this.layoutService.layout = this.layout;
        }
    };
    ClrLayout.decorators = [
        { type: Directive, args: [{
                    selector: '[clrLayout]',
                    host: {
                        '[class]': 'layoutService.layoutClass',
                    },
                },] }
    ];
    /** @nocollapse */
    ClrLayout.ctorParameters = function () { return [
        { type: LayoutService }
    ]; };
    ClrLayout.propDecorators = {
        layout: [{ type: Input, args: ['clrLayout',] }]
    };
    return ClrLayout;
}());
export { ClrLayout };
if (false) {
    /** @type {?} */
    ClrLayout.prototype.layout;
    /** @type {?} */
    ClrLayout.prototype.layoutService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZm9ybXMvY29tbW9uL2xheW91dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFNQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRXBFO0lBU0UsbUJBQW1CLGFBQTRCO1FBQTVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO0lBQUcsQ0FBQzs7OztJQUVuRCw0QkFBUTs7O0lBQVI7UUFDRSw4Q0FBOEM7UUFDOUMsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUMxRCxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1NBQ3pDO0lBQ0gsQ0FBQzs7Z0JBaEJGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsYUFBYTtvQkFDdkIsSUFBSSxFQUFFO3dCQUNKLFNBQVMsRUFBRSwyQkFBMkI7cUJBQ3ZDO2lCQUNGOzs7O2dCQVBpQixhQUFhOzs7eUJBUzVCLEtBQUssU0FBQyxXQUFXOztJQVVwQixnQkFBQztDQUFBLEFBakJELElBaUJDO1NBWFksU0FBUzs7O0lBQ3BCLDJCQUFvQzs7SUFFeEIsa0NBQW1DIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBMYXlvdXRzLCBMYXlvdXRTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvbGF5b3V0LnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbY2xyTGF5b3V0XScsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzXSc6ICdsYXlvdXRTZXJ2aWNlLmxheW91dENsYXNzJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyTGF5b3V0IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCdjbHJMYXlvdXQnKSBsYXlvdXQ6IExheW91dHM7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGxheW91dFNlcnZpY2U6IExheW91dFNlcnZpY2UpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgLy8gT25seSBzZXQgdGhlIGxheW91dCBpZiBpdCBpcyBhIHZhbGlkIG9wdGlvblxuICAgIGlmICh0aGlzLmxheW91dCAmJiB0aGlzLmxheW91dFNlcnZpY2UuaXNWYWxpZCh0aGlzLmxheW91dCkpIHtcbiAgICAgIHRoaXMubGF5b3V0U2VydmljZS5sYXlvdXQgPSB0aGlzLmxheW91dDtcbiAgICB9XG4gIH1cbn1cbiJdfQ==