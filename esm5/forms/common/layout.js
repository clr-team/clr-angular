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
                    selector: '[clrForm][clrLayout]',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZm9ybXMvY29tbW9uL2xheW91dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFNQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRXBFO0lBTUUsbUJBQW1CLGFBQTRCO1FBQTVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO0lBQUcsQ0FBQzs7OztJQUVuRCw0QkFBUTs7O0lBQVI7UUFDRSw4Q0FBOEM7UUFDOUMsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUMxRCxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1NBQ3pDO0lBQ0gsQ0FBQzs7Z0JBYkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxzQkFBc0I7aUJBQ2pDOzs7O2dCQUppQixhQUFhOzs7eUJBTTVCLEtBQUssU0FBQyxXQUFXOztJQVVwQixnQkFBQztDQUFBLEFBZEQsSUFjQztTQVhZLFNBQVM7OztJQUNwQiwyQkFBb0M7O0lBRXhCLGtDQUFtQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTGF5b3V0cywgTGF5b3V0U2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2xheW91dC5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2NsckZvcm1dW2NsckxheW91dF0nLFxufSlcbmV4cG9ydCBjbGFzcyBDbHJMYXlvdXQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoJ2NsckxheW91dCcpIGxheW91dDogTGF5b3V0cztcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbGF5b3V0U2VydmljZTogTGF5b3V0U2VydmljZSkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICAvLyBPbmx5IHNldCB0aGUgbGF5b3V0IGlmIGl0IGlzIGEgdmFsaWQgb3B0aW9uXG4gICAgaWYgKHRoaXMubGF5b3V0ICYmIHRoaXMubGF5b3V0U2VydmljZS5pc1ZhbGlkKHRoaXMubGF5b3V0KSkge1xuICAgICAgdGhpcy5sYXlvdXRTZXJ2aWNlLmxheW91dCA9IHRoaXMubGF5b3V0O1xuICAgIH1cbiAgfVxufVxuIl19