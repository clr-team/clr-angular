/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Injectable } from '@angular/core';
import { TabsLayout } from '../enums/tabs-layout.enum';
var TabsService = /** @class */ (function () {
    function TabsService() {
        this._children = [];
        this.layout = TabsLayout.HORIZONTAL;
    }
    /**
     * @param {?} tab
     * @return {?}
     */
    TabsService.prototype.register = /**
     * @param {?} tab
     * @return {?}
     */
    function (tab) {
        this._children.push(tab);
    };
    Object.defineProperty(TabsService.prototype, "children", {
        get: /**
         * @return {?}
         */
        function () {
            return this._children;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabsService.prototype, "activeTab", {
        get: /**
         * @return {?}
         */
        function () {
            return this.children.find((/**
             * @param {?} tab
             * @return {?}
             */
            function (tab) {
                return tab.active;
            }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabsService.prototype, "overflowTabs", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.layout === TabsLayout.VERTICAL) {
                return [];
            }
            else {
                return this.children.filter((/**
                 * @param {?} tab
                 * @return {?}
                 */
                function (tab) { return tab.tabLink.inOverflow === true; }));
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} tab
     * @return {?}
     */
    TabsService.prototype.unregister = /**
     * @param {?} tab
     * @return {?}
     */
    function (tab) {
        /** @type {?} */
        var index = this.children.indexOf(tab);
        if (index > -1) {
            this.children.splice(index, 1);
        }
    };
    TabsService.decorators = [
        { type: Injectable }
    ];
    return TabsService;
}());
export { TabsService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    TabsService.prototype._children;
    /** @type {?} */
    TabsService.prototype.layout;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsibGF5b3V0L3RhYnMvcHJvdmlkZXJzL3RhYnMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFLQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUV2RDtJQUFBO1FBRVUsY0FBUyxHQUFhLEVBQUUsQ0FBQztRQUVqQyxXQUFNLEdBQWUsVUFBVSxDQUFDLFVBQVUsQ0FBQztJQThCN0MsQ0FBQzs7Ozs7SUE1QkMsOEJBQVE7Ozs7SUFBUixVQUFTLEdBQVc7UUFDbEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVELHNCQUFJLGlDQUFROzs7O1FBQVo7WUFDRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDeEIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSxrQ0FBUzs7OztRQUFiO1lBQ0UsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUk7Ozs7WUFBQyxVQUFDLEdBQVc7Z0JBQ3BDLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQztZQUNwQixDQUFDLEVBQUMsQ0FBQztRQUNMLENBQUM7OztPQUFBO0lBRUQsc0JBQUkscUNBQVk7Ozs7UUFBaEI7WUFDRSxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssVUFBVSxDQUFDLFFBQVEsRUFBRTtnQkFDdkMsT0FBTyxFQUFFLENBQUM7YUFDWDtpQkFBTTtnQkFDTCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTTs7OztnQkFBQyxVQUFDLEdBQVcsSUFBSyxPQUFBLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBVSxLQUFLLElBQUksRUFBL0IsQ0FBK0IsRUFBQyxDQUFDO2FBQy9FO1FBQ0gsQ0FBQzs7O09BQUE7Ozs7O0lBRUQsZ0NBQVU7Ozs7SUFBVixVQUFXLEdBQVc7O1lBQ2QsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUN4QyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsRUFBRTtZQUNkLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztTQUNoQztJQUNILENBQUM7O2dCQWpDRixVQUFVOztJQWtDWCxrQkFBQztDQUFBLEFBbENELElBa0NDO1NBakNZLFdBQVc7Ozs7OztJQUN0QixnQ0FBaUM7O0lBRWpDLDZCQUEyQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENsclRhYiB9IGZyb20gJy4uL3RhYic7XG5pbXBvcnQgeyBUYWJzTGF5b3V0IH0gZnJvbSAnLi4vZW51bXMvdGFicy1sYXlvdXQuZW51bSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUYWJzU2VydmljZSB7XG4gIHByaXZhdGUgX2NoaWxkcmVuOiBDbHJUYWJbXSA9IFtdO1xuXG4gIGxheW91dDogVGFic0xheW91dCA9IFRhYnNMYXlvdXQuSE9SSVpPTlRBTDtcblxuICByZWdpc3Rlcih0YWI6IENsclRhYikge1xuICAgIHRoaXMuX2NoaWxkcmVuLnB1c2godGFiKTtcbiAgfVxuXG4gIGdldCBjaGlsZHJlbigpIHtcbiAgICByZXR1cm4gdGhpcy5fY2hpbGRyZW47XG4gIH1cblxuICBnZXQgYWN0aXZlVGFiKCkge1xuICAgIHJldHVybiB0aGlzLmNoaWxkcmVuLmZpbmQoKHRhYjogQ2xyVGFiKSA9PiB7XG4gICAgICByZXR1cm4gdGFiLmFjdGl2ZTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldCBvdmVyZmxvd1RhYnMoKSB7XG4gICAgaWYgKHRoaXMubGF5b3V0ID09PSBUYWJzTGF5b3V0LlZFUlRJQ0FMKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmNoaWxkcmVuLmZpbHRlcigodGFiOiBDbHJUYWIpID0+IHRhYi50YWJMaW5rLmluT3ZlcmZsb3cgPT09IHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIHVucmVnaXN0ZXIodGFiOiBDbHJUYWIpIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuY2hpbGRyZW4uaW5kZXhPZih0YWIpO1xuICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICB0aGlzLmNoaWxkcmVuLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9XG59XG4iXX0=