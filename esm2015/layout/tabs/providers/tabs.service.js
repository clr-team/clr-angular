/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Injectable } from '@angular/core';
import { TabsLayout } from '../enums/tabs-layout.enum';
export class TabsService {
    constructor() {
        this._children = [];
        this.layout = TabsLayout.HORIZONTAL;
    }
    /**
     * @param {?} tab
     * @return {?}
     */
    register(tab) {
        this._children.push(tab);
    }
    /**
     * @return {?}
     */
    get children() {
        return this._children;
    }
    /**
     * @return {?}
     */
    get activeTab() {
        return this.children.find((/**
         * @param {?} tab
         * @return {?}
         */
        (tab) => {
            return tab.active;
        }));
    }
    /**
     * @return {?}
     */
    get overflowTabs() {
        if (this.layout === TabsLayout.VERTICAL) {
            return [];
        }
        else {
            return this.children.filter((/**
             * @param {?} tab
             * @return {?}
             */
            (tab) => tab.tabLink.inOverflow === true));
        }
    }
    /**
     * @param {?} tab
     * @return {?}
     */
    unregister(tab) {
        /** @type {?} */
        const index = this.children.indexOf(tab);
        if (index > -1) {
            this.children.splice(index, 1);
        }
    }
}
TabsService.decorators = [
    { type: Injectable }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    TabsService.prototype._children;
    /** @type {?} */
    TabsService.prototype.layout;
    /** @type {?} */
    TabsService.prototype.tabContentViewContainer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsibGF5b3V0L3RhYnMvcHJvdmlkZXJzL3RhYnMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFLQSxPQUFPLEVBQUUsVUFBVSxFQUFvQixNQUFNLGVBQWUsQ0FBQztBQUU3RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFHdkQsTUFBTSxPQUFPLFdBQVc7SUFEeEI7UUFFVSxjQUFTLEdBQWEsRUFBRSxDQUFDO1FBRWpDLFdBQU0sR0FBZSxVQUFVLENBQUMsVUFBVSxDQUFDO0lBZ0M3QyxDQUFDOzs7OztJQTlCQyxRQUFRLENBQUMsR0FBVztRQUNsQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMzQixDQUFDOzs7O0lBRUQsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7Ozs7SUFFRCxJQUFJLFNBQVM7UUFDWCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSTs7OztRQUFDLENBQUMsR0FBVyxFQUFFLEVBQUU7WUFDeEMsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDO1FBQ3BCLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7OztJQUVELElBQUksWUFBWTtRQUNkLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxVQUFVLENBQUMsUUFBUSxFQUFFO1lBQ3ZDLE9BQU8sRUFBRSxDQUFDO1NBQ1g7YUFBTTtZQUNMLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNOzs7O1lBQUMsQ0FBQyxHQUFXLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBVSxLQUFLLElBQUksRUFBQyxDQUFDO1NBQy9FO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxVQUFVLENBQUMsR0FBVzs7Y0FDZCxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO1FBQ3hDLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxFQUFFO1lBQ2QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ2hDO0lBQ0gsQ0FBQzs7O1lBakNGLFVBQVU7Ozs7Ozs7SUFFVCxnQ0FBaUM7O0lBRWpDLDZCQUEyQzs7SUErQjNDLDhDQUEwQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IEluamVjdGFibGUsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENsclRhYiB9IGZyb20gJy4uL3RhYic7XG5pbXBvcnQgeyBUYWJzTGF5b3V0IH0gZnJvbSAnLi4vZW51bXMvdGFicy1sYXlvdXQuZW51bSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUYWJzU2VydmljZSB7XG4gIHByaXZhdGUgX2NoaWxkcmVuOiBDbHJUYWJbXSA9IFtdO1xuXG4gIGxheW91dDogVGFic0xheW91dCA9IFRhYnNMYXlvdXQuSE9SSVpPTlRBTDtcblxuICByZWdpc3Rlcih0YWI6IENsclRhYikge1xuICAgIHRoaXMuX2NoaWxkcmVuLnB1c2godGFiKTtcbiAgfVxuXG4gIGdldCBjaGlsZHJlbigpIHtcbiAgICByZXR1cm4gdGhpcy5fY2hpbGRyZW47XG4gIH1cblxuICBnZXQgYWN0aXZlVGFiKCkge1xuICAgIHJldHVybiB0aGlzLmNoaWxkcmVuLmZpbmQoKHRhYjogQ2xyVGFiKSA9PiB7XG4gICAgICByZXR1cm4gdGFiLmFjdGl2ZTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldCBvdmVyZmxvd1RhYnMoKSB7XG4gICAgaWYgKHRoaXMubGF5b3V0ID09PSBUYWJzTGF5b3V0LlZFUlRJQ0FMKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmNoaWxkcmVuLmZpbHRlcigodGFiOiBDbHJUYWIpID0+IHRhYi50YWJMaW5rLmluT3ZlcmZsb3cgPT09IHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIHVucmVnaXN0ZXIodGFiOiBDbHJUYWIpIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuY2hpbGRyZW4uaW5kZXhPZih0YWIpO1xuICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICB0aGlzLmNoaWxkcmVuLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9XG5cbiAgdGFiQ29udGVudFZpZXdDb250YWluZXI6IFZpZXdDb250YWluZXJSZWY7XG59XG4iXX0=