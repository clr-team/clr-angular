/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, TemplateRef, ViewChild } from '@angular/core';
export class WrappedCell {
    constructor() {
        this._dynamic = false;
    }
    // the cells projected view
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.cellView = this.templateRef.createEmbeddedView(null);
    }
}
WrappedCell.decorators = [
    { type: Component, args: [{
                selector: 'dg-wrapped-cell',
                template: `        
        <ng-template #cellPortal>
            <ng-content></ng-content>
        </ng-template>
    `
            }] }
];
WrappedCell.propDecorators = {
    templateRef: [{ type: ViewChild, args: ['cellPortal', { static: false },] }]
};
if (false) {
    /** @type {?} */
    WrappedCell.prototype._dynamic;
    /** @type {?} */
    WrappedCell.prototype.templateRef;
    /** @type {?} */
    WrappedCell.prototype.cellView;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JhcHBlZC1jZWxsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC93cmFwcGVkLWNlbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUFpQixTQUFTLEVBQW1CLFdBQVcsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFZbEcsTUFBTSxPQUFPLFdBQVc7SUFSeEI7UUFTRSxhQUFRLEdBQUcsS0FBSyxDQUFDO0lBUW5CLENBQUM7Ozs7O0lBSEMsZUFBZTtRQUNiLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1RCxDQUFDOzs7WUFoQkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLFFBQVEsRUFBRTs7OztLQUlQO2FBQ0o7OzswQkFHRSxTQUFTLFNBQUMsWUFBWSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTs7OztJQUQxQywrQkFBaUI7O0lBQ2pCLGtDQUMrQjs7SUFDL0IsK0JBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBFbWJlZGRlZFZpZXdSZWYsIFRlbXBsYXRlUmVmLCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRHluYW1pY1dyYXBwZXIgfSBmcm9tICcuLi8uLi91dGlscy9ob3N0LXdyYXBwaW5nL2R5bmFtaWMtd3JhcHBlcic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RnLXdyYXBwZWQtY2VsbCcsXG4gIHRlbXBsYXRlOiBgICAgICAgICBcbiAgICAgICAgPG5nLXRlbXBsYXRlICNjZWxsUG9ydGFsPlxuICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgIGAsXG59KVxuZXhwb3J0IGNsYXNzIFdyYXBwZWRDZWxsIGltcGxlbWVudHMgRHluYW1pY1dyYXBwZXIsIEFmdGVyVmlld0luaXQge1xuICBfZHluYW1pYyA9IGZhbHNlO1xuICBAVmlld0NoaWxkKCdjZWxsUG9ydGFsJywgeyBzdGF0aWM6IGZhbHNlIH0pXG4gIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjx2b2lkPjtcbiAgY2VsbFZpZXc6IEVtYmVkZGVkVmlld1JlZjx2b2lkPjsgLy8gdGhlIGNlbGxzIHByb2plY3RlZCB2aWV3XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuY2VsbFZpZXcgPSB0aGlzLnRlbXBsYXRlUmVmLmNyZWF0ZUVtYmVkZGVkVmlldyhudWxsKTtcbiAgfVxufVxuIl19