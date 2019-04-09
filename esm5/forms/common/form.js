/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive } from '@angular/core';
import { LayoutService } from './providers/layout.service';
import { MarkControlService } from './providers/mark-control.service';
var ClrForm = /** @class */ (function () {
    function ClrForm(layoutService, markControlService) {
        this.layoutService = layoutService;
        this.markControlService = markControlService;
    }
    /** @deprecated since 2.0 */
    /**
     * @deprecated since 2.0
     * @return {?}
     */
    ClrForm.prototype.markAsDirty = /**
     * @deprecated since 2.0
     * @return {?}
     */
    function () {
        this.markAsTouched();
    };
    /**
     * @return {?}
     */
    ClrForm.prototype.markAsTouched = /**
     * @return {?}
     */
    function () {
        this.markControlService.markAsTouched();
    };
    ClrForm.decorators = [
        { type: Directive, args: [{
                    selector: '[clrForm]',
                    providers: [LayoutService, MarkControlService],
                    host: {
                        '[class.clr-form]': 'true',
                        '[class.clr-form-horizontal]': 'layoutService.isHorizontal()',
                        '[class.clr-form-compact]': 'layoutService.isCompact()',
                    },
                },] }
    ];
    /** @nocollapse */
    ClrForm.ctorParameters = function () { return [
        { type: LayoutService },
        { type: MarkControlService }
    ]; };
    return ClrForm;
}());
export { ClrForm };
if (false) {
    /** @type {?} */
    ClrForm.prototype.layoutService;
    /**
     * @type {?}
     * @private
     */
    ClrForm.prototype.markControlService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImZvcm1zL2NvbW1vbi9mb3JtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQU1BLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzNELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBRXRFO0lBVUUsaUJBQW1CLGFBQTRCLEVBQVUsa0JBQXNDO1FBQTVFLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQVUsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtJQUFHLENBQUM7SUFFbkcsNEJBQTRCOzs7OztJQUM1Qiw2QkFBVzs7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7Ozs7SUFFRCwrQkFBYTs7O0lBQWI7UUFDRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDMUMsQ0FBQzs7Z0JBbkJGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsV0FBVztvQkFDckIsU0FBUyxFQUFFLENBQUMsYUFBYSxFQUFFLGtCQUFrQixDQUFDO29CQUM5QyxJQUFJLEVBQUU7d0JBQ0osa0JBQWtCLEVBQUUsTUFBTTt3QkFDMUIsNkJBQTZCLEVBQUUsOEJBQThCO3dCQUM3RCwwQkFBMEIsRUFBRSwyQkFBMkI7cUJBQ3hEO2lCQUNGOzs7O2dCQVhRLGFBQWE7Z0JBQ2Isa0JBQWtCOztJQXNCM0IsY0FBQztDQUFBLEFBcEJELElBb0JDO1NBWFksT0FBTzs7O0lBQ04sZ0NBQW1DOzs7OztJQUFFLHFDQUE4QyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IERpcmVjdGl2ZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTGF5b3V0U2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2xheW91dC5zZXJ2aWNlJztcbmltcG9ydCB7IE1hcmtDb250cm9sU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL21hcmstY29udHJvbC5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2NsckZvcm1dJyxcbiAgcHJvdmlkZXJzOiBbTGF5b3V0U2VydmljZSwgTWFya0NvbnRyb2xTZXJ2aWNlXSxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuY2xyLWZvcm1dJzogJ3RydWUnLFxuICAgICdbY2xhc3MuY2xyLWZvcm0taG9yaXpvbnRhbF0nOiAnbGF5b3V0U2VydmljZS5pc0hvcml6b250YWwoKScsXG4gICAgJ1tjbGFzcy5jbHItZm9ybS1jb21wYWN0XSc6ICdsYXlvdXRTZXJ2aWNlLmlzQ29tcGFjdCgpJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyRm9ybSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBsYXlvdXRTZXJ2aWNlOiBMYXlvdXRTZXJ2aWNlLCBwcml2YXRlIG1hcmtDb250cm9sU2VydmljZTogTWFya0NvbnRyb2xTZXJ2aWNlKSB7fVxuXG4gIC8qKiBAZGVwcmVjYXRlZCBzaW5jZSAyLjAgKi9cbiAgbWFya0FzRGlydHkoKSB7XG4gICAgdGhpcy5tYXJrQXNUb3VjaGVkKCk7XG4gIH1cblxuICBtYXJrQXNUb3VjaGVkKCkge1xuICAgIHRoaXMubWFya0NvbnRyb2xTZXJ2aWNlLm1hcmtBc1RvdWNoZWQoKTtcbiAgfVxufVxuIl19