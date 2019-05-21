/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { ClrDropdown } from './dropdown';
import { BASIC_FOCUSABLE_ITEM_PROVIDER } from '../../utils/focus/focusable-item/basic-focusable-item.service';
import { FocusableItem } from '../../utils/focus/focusable-item/focusable-item';
import { RootDropdownService } from './providers/dropdown.service';
export class ClrDropdownItem {
    /**
     * @param {?} dropdown
     * @param {?} el
     * @param {?} _dropdownService
     * @param {?} renderer
     * @param {?} focusableItem
     */
    constructor(dropdown, el, _dropdownService, renderer, focusableItem) {
        this.dropdown = dropdown;
        this.el = el;
        this._dropdownService = _dropdownService;
        this.renderer = renderer;
        this.focusableItem = focusableItem;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        // Empty string attribute evaluates to false but should disable the item, so we need to add a special case for it.
        this.focusableItem.disabled = !!value || value === '';
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.unlisten = this.renderer.listen(this.el.nativeElement, 'click', (/**
         * @return {?}
         */
        () => this.onDropdownItemClick()));
    }
    /**
     * @return {?}
     */
    onDropdownItemClick() {
        if (this.dropdown.isMenuClosable && !this.el.nativeElement.classList.contains('disabled')) {
            this._dropdownService.closeMenus();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.unlisten();
    }
}
ClrDropdownItem.decorators = [
    { type: Directive, args: [{
                selector: '[clrDropdownItem]',
                host: {
                    '[class.dropdown-item]': 'true',
                    '[attr.role]': '"menuitem"',
                },
                providers: [BASIC_FOCUSABLE_ITEM_PROVIDER],
            },] }
];
/** @nocollapse */
ClrDropdownItem.ctorParameters = () => [
    { type: ClrDropdown },
    { type: ElementRef },
    { type: RootDropdownService },
    { type: Renderer2 },
    { type: FocusableItem }
];
ClrDropdownItem.propDecorators = {
    disabled: [{ type: Input }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    ClrDropdownItem.prototype.unlisten;
    /**
     * @type {?}
     * @private
     */
    ClrDropdownItem.prototype.dropdown;
    /**
     * @type {?}
     * @private
     */
    ClrDropdownItem.prototype.el;
    /**
     * @type {?}
     * @private
     */
    ClrDropdownItem.prototype._dropdownService;
    /**
     * @type {?}
     * @private
     */
    ClrDropdownItem.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    ClrDropdownItem.prototype.focusableItem;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24taXRlbS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbInBvcG92ZXIvZHJvcGRvd24vZHJvcGRvd24taXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFLQSxPQUFPLEVBQWlCLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV2RixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLCtEQUErRCxDQUFDO0FBQzlHLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpREFBaUQsQ0FBQztBQUNoRixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQVVuRSxNQUFNLE9BQU8sZUFBZTs7Ozs7Ozs7SUFDMUIsWUFDVSxRQUFxQixFQUNyQixFQUEyQixFQUMzQixnQkFBcUMsRUFDckMsUUFBbUIsRUFDbkIsYUFBNEI7UUFKNUIsYUFBUSxHQUFSLFFBQVEsQ0FBYTtRQUNyQixPQUFFLEdBQUYsRUFBRSxDQUF5QjtRQUMzQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQXFCO1FBQ3JDLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsa0JBQWEsR0FBYixhQUFhLENBQWU7SUFDbkMsQ0FBQzs7Ozs7SUFJSixJQUNJLFFBQVEsQ0FBQyxLQUF1QjtRQUNsQyxrSEFBa0g7UUFDbEgsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLEtBQUssSUFBSSxLQUFLLEtBQUssRUFBRSxDQUFDO0lBQ3hELENBQUM7Ozs7SUFFRCxlQUFlO1FBQ2IsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxPQUFPOzs7UUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsRUFBQyxDQUFDO0lBQ3pHLENBQUM7Ozs7SUFFRCxtQkFBbUI7UUFDakIsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDekYsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQ3BDO0lBQ0gsQ0FBQzs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDbEIsQ0FBQzs7O1lBckNGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsbUJBQW1CO2dCQUM3QixJQUFJLEVBQUU7b0JBQ0osdUJBQXVCLEVBQUUsTUFBTTtvQkFDL0IsYUFBYSxFQUFFLFlBQVk7aUJBQzVCO2dCQUNELFNBQVMsRUFBRSxDQUFDLDZCQUE2QixDQUFDO2FBQzNDOzs7O1lBWlEsV0FBVztZQUZlLFVBQVU7WUFLcEMsbUJBQW1CO1lBTDBCLFNBQVM7WUFJdEQsYUFBYTs7O3VCQXNCbkIsS0FBSzs7Ozs7OztJQUZOLG1DQUFpQjs7Ozs7SUFQZixtQ0FBNkI7Ozs7O0lBQzdCLDZCQUFtQzs7Ozs7SUFDbkMsMkNBQTZDOzs7OztJQUM3QyxtQ0FBMkI7Ozs7O0lBQzNCLHdDQUFvQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IEFmdGVyVmlld0luaXQsIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBDbHJEcm9wZG93biB9IGZyb20gJy4vZHJvcGRvd24nO1xuaW1wb3J0IHsgQkFTSUNfRk9DVVNBQkxFX0lURU1fUFJPVklERVIgfSBmcm9tICcuLi8uLi91dGlscy9mb2N1cy9mb2N1c2FibGUtaXRlbS9iYXNpYy1mb2N1c2FibGUtaXRlbS5zZXJ2aWNlJztcbmltcG9ydCB7IEZvY3VzYWJsZUl0ZW0gfSBmcm9tICcuLi8uLi91dGlscy9mb2N1cy9mb2N1c2FibGUtaXRlbS9mb2N1c2FibGUtaXRlbSc7XG5pbXBvcnQgeyBSb290RHJvcGRvd25TZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvZHJvcGRvd24uc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tjbHJEcm9wZG93bkl0ZW1dJyxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuZHJvcGRvd24taXRlbV0nOiAndHJ1ZScsXG4gICAgJ1thdHRyLnJvbGVdJzogJ1wibWVudWl0ZW1cIicsXG4gIH0sXG4gIHByb3ZpZGVyczogW0JBU0lDX0ZPQ1VTQUJMRV9JVEVNX1BST1ZJREVSXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyRHJvcGRvd25JdGVtIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZHJvcGRvd246IENsckRyb3Bkb3duLFxuICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgIHByaXZhdGUgX2Ryb3Bkb3duU2VydmljZTogUm9vdERyb3Bkb3duU2VydmljZSxcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBmb2N1c2FibGVJdGVtOiBGb2N1c2FibGVJdGVtXG4gICkge31cblxuICBwcml2YXRlIHVubGlzdGVuO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbiB8IHN0cmluZykge1xuICAgIC8vIEVtcHR5IHN0cmluZyBhdHRyaWJ1dGUgZXZhbHVhdGVzIHRvIGZhbHNlIGJ1dCBzaG91bGQgZGlzYWJsZSB0aGUgaXRlbSwgc28gd2UgbmVlZCB0byBhZGQgYSBzcGVjaWFsIGNhc2UgZm9yIGl0LlxuICAgIHRoaXMuZm9jdXNhYmxlSXRlbS5kaXNhYmxlZCA9ICEhdmFsdWUgfHwgdmFsdWUgPT09ICcnO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMudW5saXN0ZW4gPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdjbGljaycsICgpID0+IHRoaXMub25Ecm9wZG93bkl0ZW1DbGljaygpKTtcbiAgfVxuXG4gIG9uRHJvcGRvd25JdGVtQ2xpY2soKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZHJvcGRvd24uaXNNZW51Q2xvc2FibGUgJiYgIXRoaXMuZWwubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2Rpc2FibGVkJykpIHtcbiAgICAgIHRoaXMuX2Ryb3Bkb3duU2VydmljZS5jbG9zZU1lbnVzKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy51bmxpc3RlbigpO1xuICB9XG59XG4iXX0=