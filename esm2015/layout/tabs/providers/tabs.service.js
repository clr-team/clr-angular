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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsibGF5b3V0L3RhYnMvcHJvdmlkZXJzL3RhYnMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFLQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUd2RCxNQUFNLE9BQU8sV0FBVztJQUR4QjtRQUVVLGNBQVMsR0FBYSxFQUFFLENBQUM7UUFFakMsV0FBTSxHQUFlLFVBQVUsQ0FBQyxVQUFVLENBQUM7SUE4QjdDLENBQUM7Ozs7O0lBNUJDLFFBQVEsQ0FBQyxHQUFXO1FBQ2xCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzNCLENBQUM7Ozs7SUFFRCxJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQzs7OztJQUVELElBQUksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJOzs7O1FBQUMsQ0FBQyxHQUFXLEVBQUUsRUFBRTtZQUN4QyxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUM7UUFDcEIsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7O0lBRUQsSUFBSSxZQUFZO1FBQ2QsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLFVBQVUsQ0FBQyxRQUFRLEVBQUU7WUFDdkMsT0FBTyxFQUFFLENBQUM7U0FDWDthQUFNO1lBQ0wsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU07Ozs7WUFBQyxDQUFDLEdBQVcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEtBQUssSUFBSSxFQUFDLENBQUM7U0FDL0U7SUFDSCxDQUFDOzs7OztJQUVELFVBQVUsQ0FBQyxHQUFXOztjQUNkLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7UUFDeEMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUU7WUFDZCxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDaEM7SUFDSCxDQUFDOzs7WUFqQ0YsVUFBVTs7Ozs7OztJQUVULGdDQUFpQzs7SUFFakMsNkJBQTJDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2xyVGFiIH0gZnJvbSAnLi4vdGFiJztcbmltcG9ydCB7IFRhYnNMYXlvdXQgfSBmcm9tICcuLi9lbnVtcy90YWJzLWxheW91dC5lbnVtJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRhYnNTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBfY2hpbGRyZW46IENsclRhYltdID0gW107XG5cbiAgbGF5b3V0OiBUYWJzTGF5b3V0ID0gVGFic0xheW91dC5IT1JJWk9OVEFMO1xuXG4gIHJlZ2lzdGVyKHRhYjogQ2xyVGFiKSB7XG4gICAgdGhpcy5fY2hpbGRyZW4ucHVzaCh0YWIpO1xuICB9XG5cbiAgZ2V0IGNoaWxkcmVuKCkge1xuICAgIHJldHVybiB0aGlzLl9jaGlsZHJlbjtcbiAgfVxuXG4gIGdldCBhY3RpdmVUYWIoKSB7XG4gICAgcmV0dXJuIHRoaXMuY2hpbGRyZW4uZmluZCgodGFiOiBDbHJUYWIpID0+IHtcbiAgICAgIHJldHVybiB0YWIuYWN0aXZlO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0IG92ZXJmbG93VGFicygpIHtcbiAgICBpZiAodGhpcy5sYXlvdXQgPT09IFRhYnNMYXlvdXQuVkVSVElDQUwpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuY2hpbGRyZW4uZmlsdGVyKCh0YWI6IENsclRhYikgPT4gdGFiLnRhYkxpbmsuaW5PdmVyZmxvdyA9PT0gdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgdW5yZWdpc3Rlcih0YWI6IENsclRhYikge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5jaGlsZHJlbi5pbmRleE9mKHRhYik7XG4gICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgIHRoaXMuY2hpbGRyZW4uc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==