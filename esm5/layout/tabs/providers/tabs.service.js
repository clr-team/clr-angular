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
    /** @type {?} */
    TabsService.prototype.tabContentViewContainer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsibGF5b3V0L3RhYnMvcHJvdmlkZXJzL3RhYnMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFLQSxPQUFPLEVBQUUsVUFBVSxFQUFvQixNQUFNLGVBQWUsQ0FBQztBQUU3RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFdkQ7SUFBQTtRQUVVLGNBQVMsR0FBYSxFQUFFLENBQUM7UUFFakMsV0FBTSxHQUFlLFVBQVUsQ0FBQyxVQUFVLENBQUM7SUFnQzdDLENBQUM7Ozs7O0lBOUJDLDhCQUFROzs7O0lBQVIsVUFBUyxHQUFXO1FBQ2xCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFRCxzQkFBSSxpQ0FBUTs7OztRQUFaO1lBQ0UsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ3hCLENBQUM7OztPQUFBO0lBRUQsc0JBQUksa0NBQVM7Ozs7UUFBYjtZQUNFLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJOzs7O1lBQUMsVUFBQyxHQUFXO2dCQUNwQyxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUM7WUFDcEIsQ0FBQyxFQUFDLENBQUM7UUFDTCxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLHFDQUFZOzs7O1FBQWhCO1lBQ0UsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLFVBQVUsQ0FBQyxRQUFRLEVBQUU7Z0JBQ3ZDLE9BQU8sRUFBRSxDQUFDO2FBQ1g7aUJBQU07Z0JBQ0wsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU07Ozs7Z0JBQUMsVUFBQyxHQUFXLElBQUssT0FBQSxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVUsS0FBSyxJQUFJLEVBQS9CLENBQStCLEVBQUMsQ0FBQzthQUMvRTtRQUNILENBQUM7OztPQUFBOzs7OztJQUVELGdDQUFVOzs7O0lBQVYsVUFBVyxHQUFXOztZQUNkLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7UUFDeEMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUU7WUFDZCxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDaEM7SUFDSCxDQUFDOztnQkFqQ0YsVUFBVTs7SUFvQ1gsa0JBQUM7Q0FBQSxBQXBDRCxJQW9DQztTQW5DWSxXQUFXOzs7Ozs7SUFDdEIsZ0NBQWlDOztJQUVqQyw2QkFBMkM7O0lBK0IzQyw4Q0FBMEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDbHJUYWIgfSBmcm9tICcuLi90YWInO1xuaW1wb3J0IHsgVGFic0xheW91dCB9IGZyb20gJy4uL2VudW1zL3RhYnMtbGF5b3V0LmVudW0nO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVGFic1NlcnZpY2Uge1xuICBwcml2YXRlIF9jaGlsZHJlbjogQ2xyVGFiW10gPSBbXTtcblxuICBsYXlvdXQ6IFRhYnNMYXlvdXQgPSBUYWJzTGF5b3V0LkhPUklaT05UQUw7XG5cbiAgcmVnaXN0ZXIodGFiOiBDbHJUYWIpIHtcbiAgICB0aGlzLl9jaGlsZHJlbi5wdXNoKHRhYik7XG4gIH1cblxuICBnZXQgY2hpbGRyZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NoaWxkcmVuO1xuICB9XG5cbiAgZ2V0IGFjdGl2ZVRhYigpIHtcbiAgICByZXR1cm4gdGhpcy5jaGlsZHJlbi5maW5kKCh0YWI6IENsclRhYikgPT4ge1xuICAgICAgcmV0dXJuIHRhYi5hY3RpdmU7XG4gICAgfSk7XG4gIH1cblxuICBnZXQgb3ZlcmZsb3dUYWJzKCkge1xuICAgIGlmICh0aGlzLmxheW91dCA9PT0gVGFic0xheW91dC5WRVJUSUNBTCkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5jaGlsZHJlbi5maWx0ZXIoKHRhYjogQ2xyVGFiKSA9PiB0YWIudGFiTGluay5pbk92ZXJmbG93ID09PSB0cnVlKTtcbiAgICB9XG4gIH1cblxuICB1bnJlZ2lzdGVyKHRhYjogQ2xyVGFiKSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmNoaWxkcmVuLmluZGV4T2YodGFiKTtcbiAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgdGhpcy5jaGlsZHJlbi5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgfVxuXG4gIHRhYkNvbnRlbnRWaWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmO1xufVxuIl19