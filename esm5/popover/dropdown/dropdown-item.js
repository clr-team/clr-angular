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
var ClrDropdownItem = /** @class */ (function () {
    function ClrDropdownItem(dropdown, el, _dropdownService, renderer, focusableItem) {
        this.dropdown = dropdown;
        this.el = el;
        this._dropdownService = _dropdownService;
        this.renderer = renderer;
        this.focusableItem = focusableItem;
    }
    Object.defineProperty(ClrDropdownItem.prototype, "disabled", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            // Empty string attribute evaluates to false but should disable the item, so we need to add a special case for it.
            this.focusableItem.disabled = !!value || value === '';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ClrDropdownItem.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.unlisten = this.renderer.listen(this.el.nativeElement, 'click', (/**
         * @return {?}
         */
        function () { return _this.onDropdownItemClick(); }));
    };
    /**
     * @return {?}
     */
    ClrDropdownItem.prototype.onDropdownItemClick = /**
     * @return {?}
     */
    function () {
        if (this.dropdown.isMenuClosable && !this.el.nativeElement.classList.contains('disabled')) {
            this._dropdownService.closeMenus();
        }
    };
    /**
     * @return {?}
     */
    ClrDropdownItem.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.unlisten();
    };
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
    ClrDropdownItem.ctorParameters = function () { return [
        { type: ClrDropdown },
        { type: ElementRef },
        { type: RootDropdownService },
        { type: Renderer2 },
        { type: FocusableItem }
    ]; };
    ClrDropdownItem.propDecorators = {
        disabled: [{ type: Input }]
    };
    return ClrDropdownItem;
}());
export { ClrDropdownItem };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24taXRlbS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbInBvcG92ZXIvZHJvcGRvd24vZHJvcGRvd24taXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFLQSxPQUFPLEVBQWlCLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV2RixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLCtEQUErRCxDQUFDO0FBQzlHLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpREFBaUQsQ0FBQztBQUNoRixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUVuRTtJQVNFLHlCQUNVLFFBQXFCLEVBQ3JCLEVBQTJCLEVBQzNCLGdCQUFxQyxFQUNyQyxRQUFtQixFQUNuQixhQUE0QjtRQUo1QixhQUFRLEdBQVIsUUFBUSxDQUFhO1FBQ3JCLE9BQUUsR0FBRixFQUFFLENBQXlCO1FBQzNCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBcUI7UUFDckMsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtJQUNuQyxDQUFDO0lBSUosc0JBQ0kscUNBQVE7Ozs7O1FBRFosVUFDYSxLQUF1QjtZQUNsQyxrSEFBa0g7WUFDbEgsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLEtBQUssSUFBSSxLQUFLLEtBQUssRUFBRSxDQUFDO1FBQ3hELENBQUM7OztPQUFBOzs7O0lBRUQseUNBQWU7OztJQUFmO1FBQUEsaUJBRUM7UUFEQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLE9BQU87OztRQUFFLGNBQU0sT0FBQSxLQUFJLENBQUMsbUJBQW1CLEVBQUUsRUFBMUIsQ0FBMEIsRUFBQyxDQUFDO0lBQ3pHLENBQUM7Ozs7SUFFRCw2Q0FBbUI7OztJQUFuQjtRQUNFLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3pGLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUNwQztJQUNILENBQUM7Ozs7SUFFRCxxQ0FBVzs7O0lBQVg7UUFDRSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDbEIsQ0FBQzs7Z0JBckNGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsbUJBQW1CO29CQUM3QixJQUFJLEVBQUU7d0JBQ0osdUJBQXVCLEVBQUUsTUFBTTt3QkFDL0IsYUFBYSxFQUFFLFlBQVk7cUJBQzVCO29CQUNELFNBQVMsRUFBRSxDQUFDLDZCQUE2QixDQUFDO2lCQUMzQzs7OztnQkFaUSxXQUFXO2dCQUZlLFVBQVU7Z0JBS3BDLG1CQUFtQjtnQkFMMEIsU0FBUztnQkFJdEQsYUFBYTs7OzJCQXNCbkIsS0FBSzs7SUFtQlIsc0JBQUM7Q0FBQSxBQXRDRCxJQXNDQztTQTlCWSxlQUFlOzs7Ozs7SUFTMUIsbUNBQWlCOzs7OztJQVBmLG1DQUE2Qjs7Ozs7SUFDN0IsNkJBQW1DOzs7OztJQUNuQywyQ0FBNkM7Ozs7O0lBQzdDLG1DQUEyQjs7Ozs7SUFDM0Isd0NBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IENsckRyb3Bkb3duIH0gZnJvbSAnLi9kcm9wZG93bic7XG5pbXBvcnQgeyBCQVNJQ19GT0NVU0FCTEVfSVRFTV9QUk9WSURFUiB9IGZyb20gJy4uLy4uL3V0aWxzL2ZvY3VzL2ZvY3VzYWJsZS1pdGVtL2Jhc2ljLWZvY3VzYWJsZS1pdGVtLnNlcnZpY2UnO1xuaW1wb3J0IHsgRm9jdXNhYmxlSXRlbSB9IGZyb20gJy4uLy4uL3V0aWxzL2ZvY3VzL2ZvY3VzYWJsZS1pdGVtL2ZvY3VzYWJsZS1pdGVtJztcbmltcG9ydCB7IFJvb3REcm9wZG93blNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9kcm9wZG93bi5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2NsckRyb3Bkb3duSXRlbV0nLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5kcm9wZG93bi1pdGVtXSc6ICd0cnVlJyxcbiAgICAnW2F0dHIucm9sZV0nOiAnXCJtZW51aXRlbVwiJyxcbiAgfSxcbiAgcHJvdmlkZXJzOiBbQkFTSUNfRk9DVVNBQkxFX0lURU1fUFJPVklERVJdLFxufSlcbmV4cG9ydCBjbGFzcyBDbHJEcm9wZG93bkl0ZW0gaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBkcm9wZG93bjogQ2xyRHJvcGRvd24sXG4gICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgcHJpdmF0ZSBfZHJvcGRvd25TZXJ2aWNlOiBSb290RHJvcGRvd25TZXJ2aWNlLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIGZvY3VzYWJsZUl0ZW06IEZvY3VzYWJsZUl0ZW1cbiAgKSB7fVxuXG4gIHByaXZhdGUgdW5saXN0ZW47XG5cbiAgQElucHV0KClcbiAgc2V0IGRpc2FibGVkKHZhbHVlOiBib29sZWFuIHwgc3RyaW5nKSB7XG4gICAgLy8gRW1wdHkgc3RyaW5nIGF0dHJpYnV0ZSBldmFsdWF0ZXMgdG8gZmFsc2UgYnV0IHNob3VsZCBkaXNhYmxlIHRoZSBpdGVtLCBzbyB3ZSBuZWVkIHRvIGFkZCBhIHNwZWNpYWwgY2FzZSBmb3IgaXQuXG4gICAgdGhpcy5mb2N1c2FibGVJdGVtLmRpc2FibGVkID0gISF2YWx1ZSB8fCB2YWx1ZSA9PT0gJyc7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy51bmxpc3RlbiA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2NsaWNrJywgKCkgPT4gdGhpcy5vbkRyb3Bkb3duSXRlbUNsaWNrKCkpO1xuICB9XG5cbiAgb25Ecm9wZG93bkl0ZW1DbGljaygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kcm9wZG93bi5pc01lbnVDbG9zYWJsZSAmJiAhdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnZGlzYWJsZWQnKSkge1xuICAgICAgdGhpcy5fZHJvcGRvd25TZXJ2aWNlLmNsb3NlTWVudXMoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnVubGlzdGVuKCk7XG4gIH1cbn1cbiJdfQ==