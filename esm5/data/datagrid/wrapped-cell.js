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
var WrappedCell = /** @class */ (function () {
    function WrappedCell() {
        this._dynamic = false;
    }
    // the cells projected view
    /**
     * @return {?}
     */
    WrappedCell.prototype.ngAfterViewInit = 
    // the cells projected view
    /**
     * @return {?}
     */
    function () {
        this.cellView = this.templateRef.createEmbeddedView(null);
    };
    WrappedCell.decorators = [
        { type: Component, args: [{
                    selector: 'dg-wrapped-cell',
                    template: "        \n        <ng-template #cellPortal>\n            <ng-content></ng-content>\n        </ng-template>\n    "
                }] }
    ];
    WrappedCell.propDecorators = {
        templateRef: [{ type: ViewChild, args: ['cellPortal', { static: false },] }]
    };
    return WrappedCell;
}());
export { WrappedCell };
if (false) {
    /** @type {?} */
    WrappedCell.prototype._dynamic;
    /** @type {?} */
    WrappedCell.prototype.templateRef;
    /** @type {?} */
    WrappedCell.prototype.cellView;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JhcHBlZC1jZWxsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC93cmFwcGVkLWNlbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUFpQixTQUFTLEVBQW1CLFdBQVcsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFJbEc7SUFBQTtRQVNFLGFBQVEsR0FBRyxLQUFLLENBQUM7SUFRbkIsQ0FBQzs7Ozs7SUFIQyxxQ0FBZTs7Ozs7SUFBZjtRQUNFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1RCxDQUFDOztnQkFoQkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLFFBQVEsRUFBRSxrSEFJUDtpQkFDSjs7OzhCQUdFLFNBQVMsU0FBQyxZQUFZLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFOztJQU81QyxrQkFBQztDQUFBLEFBakJELElBaUJDO1NBVFksV0FBVzs7O0lBQ3RCLCtCQUFpQjs7SUFDakIsa0NBQytCOztJQUMvQiwrQkFBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIEVtYmVkZGVkVmlld1JlZiwgVGVtcGxhdGVSZWYsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBEeW5hbWljV3JhcHBlciB9IGZyb20gJy4uLy4uL3V0aWxzL2hvc3Qtd3JhcHBpbmcvZHluYW1pYy13cmFwcGVyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGctd3JhcHBlZC1jZWxsJyxcbiAgdGVtcGxhdGU6IGAgICAgICAgIFxuICAgICAgICA8bmctdGVtcGxhdGUgI2NlbGxQb3J0YWw+XG4gICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgYCxcbn0pXG5leHBvcnQgY2xhc3MgV3JhcHBlZENlbGwgaW1wbGVtZW50cyBEeW5hbWljV3JhcHBlciwgQWZ0ZXJWaWV3SW5pdCB7XG4gIF9keW5hbWljID0gZmFsc2U7XG4gIEBWaWV3Q2hpbGQoJ2NlbGxQb3J0YWwnLCB7IHN0YXRpYzogZmFsc2UgfSlcbiAgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPHZvaWQ+O1xuICBjZWxsVmlldzogRW1iZWRkZWRWaWV3UmVmPHZvaWQ+OyAvLyB0aGUgY2VsbHMgcHJvamVjdGVkIHZpZXdcblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5jZWxsVmlldyA9IHRoaXMudGVtcGxhdGVSZWYuY3JlYXRlRW1iZWRkZWRWaWV3KG51bGwpO1xuICB9XG59XG4iXX0=