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
var BasicFocusableItem = /** @class */ (function () {
    function BasicFocusableItem(id, el, renderer, platformId) {
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
    BasicFocusableItem.prototype.focus = /**
     * @return {?}
     */
    function () {
        this.renderer.addClass(this.el.nativeElement, 'clr-focus');
    };
    /**
     * @return {?}
     */
    BasicFocusableItem.prototype.blur = /**
     * @return {?}
     */
    function () {
        this.renderer.removeClass(this.el.nativeElement, 'clr-focus');
    };
    /**
     * @return {?}
     */
    BasicFocusableItem.prototype.activate = /**
     * @return {?}
     */
    function () {
        if (isPlatformBrowser(this.platformId)) {
            this.el.nativeElement.click();
        }
    };
    BasicFocusableItem.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    BasicFocusableItem.ctorParameters = function () { return [
        { type: String, decorators: [{ type: Inject, args: [UNIQUE_ID,] }] },
        { type: ElementRef },
        { type: Renderer2 },
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
    ]; };
    return BasicFocusableItem;
}());
export { BasicFocusableItem };
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
export var BASIC_FOCUSABLE_ITEM_PROVIDER = [
    UNIQUE_ID_PROVIDER,
    {
        provide: FocusableItem,
        useClass: BasicFocusableItem,
    },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzaWMtZm9jdXNhYmxlLWl0ZW0uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbInV0aWxzL2ZvY3VzL2ZvY3VzYWJsZS1pdGVtL2Jhc2ljLWZvY3VzYWJsZS1pdGVtLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBTUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkYsT0FBTyxFQUFFLFNBQVMsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUVqRDtJQUVFLDRCQUM0QixFQUFVLEVBQzVCLEVBQTJCLEVBQzNCLFFBQW1CLEVBQ0UsVUFBa0I7UUFIckIsT0FBRSxHQUFGLEVBQUUsQ0FBUTtRQUM1QixPQUFFLEdBQUYsRUFBRSxDQUF5QjtRQUMzQixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ0UsZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQU1qRCxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBSmYsUUFBUSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNsRCxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVELENBQUM7Ozs7SUFJRCxrQ0FBSzs7O0lBQUw7UUFDRSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUM3RCxDQUFDOzs7O0lBQ0QsaUNBQUk7OztJQUFKO1FBQ0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDaEUsQ0FBQzs7OztJQUVELHFDQUFROzs7SUFBUjtRQUNFLElBQUksaUJBQWlCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3RDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQy9CO0lBQ0gsQ0FBQzs7Z0JBekJGLFVBQVU7Ozs7NkNBR04sTUFBTSxTQUFDLFNBQVM7Z0JBUFosVUFBVTtnQkFBbUMsU0FBUztnQkFVbEIsTUFBTSx1QkFBOUMsTUFBTSxTQUFDLFdBQVc7O0lBb0J2Qix5QkFBQztDQUFBLEFBMUJELElBMEJDO1NBekJZLGtCQUFrQjs7O0lBVzdCLHNDQUFpQjs7SUFUZixnQ0FBb0M7Ozs7O0lBQ3BDLGdDQUFtQzs7Ozs7SUFDbkMsc0NBQTJCOzs7OztJQUMzQix3Q0FBK0M7OztBQXNCbkQsTUFBTSxLQUFPLDZCQUE2QixHQUFHO0lBQzNDLGtCQUFrQjtJQUNsQjtRQUNFLE9BQU8sRUFBRSxhQUFhO1FBQ3RCLFFBQVEsRUFBRSxrQkFBa0I7S0FDN0I7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRWxlbWVudFJlZiwgSW5qZWN0LCBJbmplY3RhYmxlLCBQTEFURk9STV9JRCwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBVTklRVUVfSUQsIFVOSVFVRV9JRF9QUk9WSURFUiB9IGZyb20gJy4uLy4uL2lkLWdlbmVyYXRvci9pZC1nZW5lcmF0b3Iuc2VydmljZSc7XG5pbXBvcnQgeyBGb2N1c2FibGVJdGVtIH0gZnJvbSAnLi9mb2N1c2FibGUtaXRlbSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBCYXNpY0ZvY3VzYWJsZUl0ZW0gaW1wbGVtZW50cyBGb2N1c2FibGVJdGVtIHtcbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChVTklRVUVfSUQpIHB1YmxpYyBpZDogc3RyaW5nLFxuICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IE9iamVjdFxuICApIHtcbiAgICByZW5kZXJlci5zZXRBdHRyaWJ1dGUoZWwubmF0aXZlRWxlbWVudCwgJ2lkJywgaWQpO1xuICAgIHJlbmRlcmVyLnNldEF0dHJpYnV0ZShlbC5uYXRpdmVFbGVtZW50LCAndGFiaW5kZXgnLCAnLTEnKTtcbiAgfVxuXG4gIGRpc2FibGVkID0gZmFsc2U7XG5cbiAgZm9jdXMoKSB7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdjbHItZm9jdXMnKTtcbiAgfVxuICBibHVyKCkge1xuICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnY2xyLWZvY3VzJyk7XG4gIH1cblxuICBhY3RpdmF0ZSgpIHtcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNsaWNrKCk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBCQVNJQ19GT0NVU0FCTEVfSVRFTV9QUk9WSURFUiA9IFtcbiAgVU5JUVVFX0lEX1BST1ZJREVSLFxuICB7XG4gICAgcHJvdmlkZTogRm9jdXNhYmxlSXRlbSxcbiAgICB1c2VDbGFzczogQmFzaWNGb2N1c2FibGVJdGVtLFxuICB9LFxuXTtcbiJdfQ==