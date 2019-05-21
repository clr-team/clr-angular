/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive, ElementRef, HostListener } from '@angular/core';
import { IfOpenService } from '../../utils/conditional/if-open.service';
import { ClrDropdown } from './dropdown';
import { DropdownFocusHandler } from './providers/dropdown-focus-handler.service';
var ClrDropdownTrigger = /** @class */ (function () {
    function ClrDropdownTrigger(dropdown, ifOpenService, el, focusHandler) {
        this.ifOpenService = ifOpenService;
        this.isRootLevelToggle = true;
        // if the containing dropdown has a parent, then this is not the root level one
        if (dropdown.parent) {
            this.isRootLevelToggle = false;
        }
        focusHandler.trigger = el.nativeElement;
    }
    Object.defineProperty(ClrDropdownTrigger.prototype, "active", {
        get: /**
         * @return {?}
         */
        function () {
            return this.ifOpenService.open;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} event
     * @return {?}
     */
    ClrDropdownTrigger.prototype.onDropdownTriggerClick = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.ifOpenService.toggleWithEvent(event);
    };
    ClrDropdownTrigger.decorators = [
        { type: Directive, args: [{
                    // We support both selectors for legacy reasons
                    selector: '[clrDropdownTrigger],[clrDropdownToggle]',
                    host: {
                        '[class.dropdown-toggle]': 'isRootLevelToggle',
                        '[class.dropdown-item]': '!isRootLevelToggle',
                        '[class.expandable]': '!isRootLevelToggle',
                        '[class.active]': 'active',
                        '[attr.aria-haspopup]': '"menu"',
                        '[attr.aria-expanded]': 'ifOpenService.open',
                    },
                },] }
    ];
    /** @nocollapse */
    ClrDropdownTrigger.ctorParameters = function () { return [
        { type: ClrDropdown },
        { type: IfOpenService },
        { type: ElementRef },
        { type: DropdownFocusHandler }
    ]; };
    ClrDropdownTrigger.propDecorators = {
        onDropdownTriggerClick: [{ type: HostListener, args: ['click', ['$event'],] }]
    };
    return ClrDropdownTrigger;
}());
export { ClrDropdownTrigger };
if (false) {
    /** @type {?} */
    ClrDropdownTrigger.prototype.isRootLevelToggle;
    /**
     * @type {?}
     * @private
     */
    ClrDropdownTrigger.prototype.ifOpenService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24tdHJpZ2dlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbInBvcG92ZXIvZHJvcGRvd24vZHJvcGRvd24tdHJpZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFLQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFcEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBRXhFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDekMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFFbEY7SUFlRSw0QkFDRSxRQUFxQixFQUNiLGFBQTRCLEVBQ3BDLEVBQTJCLEVBQzNCLFlBQWtDO1FBRjFCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBSi9CLHNCQUFpQixHQUFZLElBQUksQ0FBQztRQVF2QywrRUFBK0U7UUFDL0UsSUFBSSxRQUFRLENBQUMsTUFBTSxFQUFFO1lBQ25CLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7U0FDaEM7UUFDRCxZQUFZLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUM7SUFDMUMsQ0FBQztJQUVELHNCQUFJLHNDQUFNOzs7O1FBQVY7WUFDRSxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDO1FBQ2pDLENBQUM7OztPQUFBOzs7OztJQUdELG1EQUFzQjs7OztJQUR0QixVQUN1QixLQUFVO1FBQy9CLElBQUksQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVDLENBQUM7O2dCQW5DRixTQUFTLFNBQUM7O29CQUVULFFBQVEsRUFBRSwwQ0FBMEM7b0JBQ3BELElBQUksRUFBRTt3QkFDSix5QkFBeUIsRUFBRSxtQkFBbUI7d0JBQzlDLHVCQUF1QixFQUFFLG9CQUFvQjt3QkFDN0Msb0JBQW9CLEVBQUUsb0JBQW9CO3dCQUMxQyxnQkFBZ0IsRUFBRSxRQUFRO3dCQUMxQixzQkFBc0IsRUFBRSxRQUFRO3dCQUNoQyxzQkFBc0IsRUFBRSxvQkFBb0I7cUJBQzdDO2lCQUNGOzs7O2dCQWRRLFdBQVc7Z0JBRlgsYUFBYTtnQkFGRixVQUFVO2dCQUtyQixvQkFBb0I7Ozt5Q0FrQzFCLFlBQVksU0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUM7O0lBSW5DLHlCQUFDO0NBQUEsQUFwQ0QsSUFvQ0M7U0F4Qlksa0JBQWtCOzs7SUFDN0IsK0NBQXlDOzs7OztJQUl2QywyQ0FBb0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBJZk9wZW5TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vdXRpbHMvY29uZGl0aW9uYWwvaWYtb3Blbi5zZXJ2aWNlJztcblxuaW1wb3J0IHsgQ2xyRHJvcGRvd24gfSBmcm9tICcuL2Ryb3Bkb3duJztcbmltcG9ydCB7IERyb3Bkb3duRm9jdXNIYW5kbGVyIH0gZnJvbSAnLi9wcm92aWRlcnMvZHJvcGRvd24tZm9jdXMtaGFuZGxlci5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gIC8vIFdlIHN1cHBvcnQgYm90aCBzZWxlY3RvcnMgZm9yIGxlZ2FjeSByZWFzb25zXG4gIHNlbGVjdG9yOiAnW2NsckRyb3Bkb3duVHJpZ2dlcl0sW2NsckRyb3Bkb3duVG9nZ2xlXScsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmRyb3Bkb3duLXRvZ2dsZV0nOiAnaXNSb290TGV2ZWxUb2dnbGUnLFxuICAgICdbY2xhc3MuZHJvcGRvd24taXRlbV0nOiAnIWlzUm9vdExldmVsVG9nZ2xlJyxcbiAgICAnW2NsYXNzLmV4cGFuZGFibGVdJzogJyFpc1Jvb3RMZXZlbFRvZ2dsZScsXG4gICAgJ1tjbGFzcy5hY3RpdmVdJzogJ2FjdGl2ZScsXG4gICAgJ1thdHRyLmFyaWEtaGFzcG9wdXBdJzogJ1wibWVudVwiJyxcbiAgICAnW2F0dHIuYXJpYS1leHBhbmRlZF0nOiAnaWZPcGVuU2VydmljZS5vcGVuJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyRHJvcGRvd25UcmlnZ2VyIHtcbiAgcHVibGljIGlzUm9vdExldmVsVG9nZ2xlOiBib29sZWFuID0gdHJ1ZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBkcm9wZG93bjogQ2xyRHJvcGRvd24sXG4gICAgcHJpdmF0ZSBpZk9wZW5TZXJ2aWNlOiBJZk9wZW5TZXJ2aWNlLFxuICAgIGVsOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICBmb2N1c0hhbmRsZXI6IERyb3Bkb3duRm9jdXNIYW5kbGVyXG4gICkge1xuICAgIC8vIGlmIHRoZSBjb250YWluaW5nIGRyb3Bkb3duIGhhcyBhIHBhcmVudCwgdGhlbiB0aGlzIGlzIG5vdCB0aGUgcm9vdCBsZXZlbCBvbmVcbiAgICBpZiAoZHJvcGRvd24ucGFyZW50KSB7XG4gICAgICB0aGlzLmlzUm9vdExldmVsVG9nZ2xlID0gZmFsc2U7XG4gICAgfVxuICAgIGZvY3VzSGFuZGxlci50cmlnZ2VyID0gZWwubmF0aXZlRWxlbWVudDtcbiAgfVxuXG4gIGdldCBhY3RpdmUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaWZPcGVuU2VydmljZS5vcGVuO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxuICBvbkRyb3Bkb3duVHJpZ2dlckNsaWNrKGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLmlmT3BlblNlcnZpY2UudG9nZ2xlV2l0aEV2ZW50KGV2ZW50KTtcbiAgfVxufVxuIl19