/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { ClrDropdown } from './dropdown';
import { RootDropdownService } from './providers/dropdown.service';
export class ClrDropdownItem {
    /**
     * @param {?} dropdown
     * @param {?} el
     * @param {?} _dropdownService
     * @param {?} renderer
     */
    constructor(dropdown, el, _dropdownService, renderer) {
        this.dropdown = dropdown;
        this.el = el;
        this._dropdownService = _dropdownService;
        this.renderer = renderer;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.renderer.listen(this.el.nativeElement, 'click', (/**
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
}
ClrDropdownItem.decorators = [
    { type: Directive, args: [{ selector: '[clrDropdownItem]', host: { '[class.dropdown-item]': 'true' } },] }
];
/** @nocollapse */
ClrDropdownItem.ctorParameters = () => [
    { type: ClrDropdown },
    { type: ElementRef },
    { type: RootDropdownService },
    { type: Renderer2 }
];
if (false) {
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24taXRlbS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbInBvcG92ZXIvZHJvcGRvd24vZHJvcGRvd24taXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFLQSxPQUFPLEVBQWlCLFNBQVMsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWhGLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDekMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFHbkUsTUFBTSxPQUFPLGVBQWU7Ozs7Ozs7SUFDMUIsWUFDVSxRQUFxQixFQUNyQixFQUFjLEVBQ2QsZ0JBQXFDLEVBQ3JDLFFBQW1CO1FBSG5CLGFBQVEsR0FBUixRQUFRLENBQWE7UUFDckIsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUNkLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBcUI7UUFDckMsYUFBUSxHQUFSLFFBQVEsQ0FBVztJQUMxQixDQUFDOzs7O0lBRUosZUFBZTtRQUNiLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLE9BQU87OztRQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxFQUFDLENBQUM7SUFDekYsQ0FBQzs7OztJQUVELG1CQUFtQjtRQUNqQixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUN6RixJQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDcEM7SUFDSCxDQUFDOzs7WUFqQkYsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLG1CQUFtQixFQUFFLElBQUksRUFBRSxFQUFFLHVCQUF1QixFQUFFLE1BQU0sRUFBRSxFQUFFOzs7O1lBSDlFLFdBQVc7WUFGZSxVQUFVO1lBR3BDLG1CQUFtQjtZQUhtQixTQUFTOzs7Ozs7O0lBUXBELG1DQUE2Qjs7Ozs7SUFDN0IsNkJBQXNCOzs7OztJQUN0QiwyQ0FBNkM7Ozs7O0lBQzdDLG1DQUEyQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IEFmdGVyVmlld0luaXQsIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IENsckRyb3Bkb3duIH0gZnJvbSAnLi9kcm9wZG93bic7XG5pbXBvcnQgeyBSb290RHJvcGRvd25TZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvZHJvcGRvd24uc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tjbHJEcm9wZG93bkl0ZW1dJywgaG9zdDogeyAnW2NsYXNzLmRyb3Bkb3duLWl0ZW1dJzogJ3RydWUnIH0gfSlcbmV4cG9ydCBjbGFzcyBDbHJEcm9wZG93bkl0ZW0gaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBkcm9wZG93bjogQ2xyRHJvcGRvd24sXG4gICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIF9kcm9wZG93blNlcnZpY2U6IFJvb3REcm9wZG93blNlcnZpY2UsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyXG4gICkge31cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnY2xpY2snLCAoKSA9PiB0aGlzLm9uRHJvcGRvd25JdGVtQ2xpY2soKSk7XG4gIH1cblxuICBvbkRyb3Bkb3duSXRlbUNsaWNrKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRyb3Bkb3duLmlzTWVudUNsb3NhYmxlICYmICF0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkaXNhYmxlZCcpKSB7XG4gICAgICB0aGlzLl9kcm9wZG93blNlcnZpY2UuY2xvc2VNZW51cygpO1xuICAgIH1cbiAgfVxufVxuIl19