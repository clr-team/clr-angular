/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { isPlatformBrowser } from '@angular/common';
import { ElementRef, Inject, Injectable, PLATFORM_ID, Renderer2 } from '@angular/core';
import { UNIQUE_ID, UNIQUE_ID_PROVIDER } from '../../id-generator/id-generator.service';
import { FocusableItem } from './focusable-item';
export class BasicFocusableItem {
    /**
     * @param {?} id
     * @param {?} el
     * @param {?} renderer
     * @param {?} platformId
     */
    constructor(id, el, renderer, platformId) {
        this.id = id;
        this.el = el;
        this.renderer = renderer;
        this.platformId = platformId;
        this.disabled = false;
        renderer.setAttribute(el.nativeElement, 'id', id);
        renderer.setAttribute(el.nativeElement, 'tabindex', '-1');
    }
    /**
     * @return {?}
     */
    focus() {
        this.renderer.addClass(this.el.nativeElement, 'clr-focus');
    }
    /**
     * @return {?}
     */
    blur() {
        this.renderer.removeClass(this.el.nativeElement, 'clr-focus');
    }
    /**
     * @return {?}
     */
    activate() {
        if (isPlatformBrowser(this.platformId)) {
            this.el.nativeElement.click();
        }
    }
}
BasicFocusableItem.decorators = [
    { type: Injectable }
];
/** @nocollapse */
BasicFocusableItem.ctorParameters = () => [
    { type: String, decorators: [{ type: Inject, args: [UNIQUE_ID,] }] },
    { type: ElementRef },
    { type: Renderer2 },
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
];
if (false) {
    /** @type {?} */
    BasicFocusableItem.prototype.disabled;
    /** @type {?} */
    BasicFocusableItem.prototype.id;
    /**
     * @type {?}
     * @private
     */
    BasicFocusableItem.prototype.el;
    /**
     * @type {?}
     * @private
     */
    BasicFocusableItem.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    BasicFocusableItem.prototype.platformId;
}
/** @type {?} */
export const BASIC_FOCUSABLE_ITEM_PROVIDER = [
    UNIQUE_ID_PROVIDER,
    {
        provide: FocusableItem,
        useClass: BasicFocusableItem,
    },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzaWMtZm9jdXNhYmxlLWl0ZW0uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbInV0aWxzL2ZvY3VzL2ZvY3VzYWJsZS1pdGVtL2Jhc2ljLWZvY3VzYWJsZS1pdGVtLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBTUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkYsT0FBTyxFQUFFLFNBQVMsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUdqRCxNQUFNLE9BQU8sa0JBQWtCOzs7Ozs7O0lBQzdCLFlBQzRCLEVBQVUsRUFDNUIsRUFBMkIsRUFDM0IsUUFBbUIsRUFDRSxVQUFrQjtRQUhyQixPQUFFLEdBQUYsRUFBRSxDQUFRO1FBQzVCLE9BQUUsR0FBRixFQUFFLENBQXlCO1FBQzNCLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDRSxlQUFVLEdBQVYsVUFBVSxDQUFRO1FBTWpELGFBQVEsR0FBRyxLQUFLLENBQUM7UUFKZixRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2xELFFBQVEsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUQsQ0FBQzs7OztJQUlELEtBQUs7UUFDSCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUM3RCxDQUFDOzs7O0lBQ0QsSUFBSTtRQUNGLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7Ozs7SUFFRCxRQUFRO1FBQ04sSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDdEMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDL0I7SUFDSCxDQUFDOzs7WUF6QkYsVUFBVTs7Ozt5Q0FHTixNQUFNLFNBQUMsU0FBUztZQVBaLFVBQVU7WUFBbUMsU0FBUztZQVVsQixNQUFNLHVCQUE5QyxNQUFNLFNBQUMsV0FBVzs7OztJQU1yQixzQ0FBaUI7O0lBVGYsZ0NBQW9DOzs7OztJQUNwQyxnQ0FBbUM7Ozs7O0lBQ25DLHNDQUEyQjs7Ozs7SUFDM0Isd0NBQStDOzs7QUFzQm5ELE1BQU0sT0FBTyw2QkFBNkIsR0FBRztJQUMzQyxrQkFBa0I7SUFDbEI7UUFDRSxPQUFPLEVBQUUsYUFBYTtRQUN0QixRQUFRLEVBQUUsa0JBQWtCO0tBQzdCO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEVsZW1lbnRSZWYsIEluamVjdCwgSW5qZWN0YWJsZSwgUExBVEZPUk1fSUQsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVU5JUVVFX0lELCBVTklRVUVfSURfUFJPVklERVIgfSBmcm9tICcuLi8uLi9pZC1nZW5lcmF0b3IvaWQtZ2VuZXJhdG9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgRm9jdXNhYmxlSXRlbSB9IGZyb20gJy4vZm9jdXNhYmxlLWl0ZW0nO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQmFzaWNGb2N1c2FibGVJdGVtIGltcGxlbWVudHMgRm9jdXNhYmxlSXRlbSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoVU5JUVVFX0lEKSBwdWJsaWMgaWQ6IHN0cmluZyxcbiAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBPYmplY3RcbiAgKSB7XG4gICAgcmVuZGVyZXIuc2V0QXR0cmlidXRlKGVsLm5hdGl2ZUVsZW1lbnQsICdpZCcsIGlkKTtcbiAgICByZW5kZXJlci5zZXRBdHRyaWJ1dGUoZWwubmF0aXZlRWxlbWVudCwgJ3RhYmluZGV4JywgJy0xJyk7XG4gIH1cblxuICBkaXNhYmxlZCA9IGZhbHNlO1xuXG4gIGZvY3VzKCkge1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnY2xyLWZvY3VzJyk7XG4gIH1cbiAgYmx1cigpIHtcbiAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2Nsci1mb2N1cycpO1xuICB9XG5cbiAgYWN0aXZhdGUoKSB7XG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5jbGljaygpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY29uc3QgQkFTSUNfRk9DVVNBQkxFX0lURU1fUFJPVklERVIgPSBbXG4gIFVOSVFVRV9JRF9QUk9WSURFUixcbiAge1xuICAgIHByb3ZpZGU6IEZvY3VzYWJsZUl0ZW0sXG4gICAgdXNlQ2xhc3M6IEJhc2ljRm9jdXNhYmxlSXRlbSxcbiAgfSxcbl07XG4iXX0=