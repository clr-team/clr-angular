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
export class WrappedColumn {
    constructor() {
        this._dynamic = false;
    }
    // the columns projected view (in memory)
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        // Create the cells view in memory, not the DOM.
        this.columnView = this.templateRef.createEmbeddedView(null);
    }
}
WrappedColumn.decorators = [
    { type: Component, args: [{
                selector: 'dg-wrapped-column',
                template: `        
        <ng-template #columnPortal>
            <ng-content></ng-content>
        </ng-template>
    `
            }] }
];
WrappedColumn.propDecorators = {
    templateRef: [{ type: ViewChild, args: ['columnPortal', { static: false },] }]
};
if (false) {
    /** @type {?} */
    WrappedColumn.prototype._dynamic;
    /** @type {?} */
    WrappedColumn.prototype.templateRef;
    /** @type {?} */
    WrappedColumn.prototype.columnView;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JhcHBlZC1jb2x1bW4uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJkYXRhL2RhdGFncmlkL3dyYXBwZWQtY29sdW1uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtBLE9BQU8sRUFBaUIsU0FBUyxFQUFtQixXQUFXLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBWWxHLE1BQU0sT0FBTyxhQUFhO0lBUjFCO1FBU0UsYUFBUSxHQUFHLEtBQUssQ0FBQztJQVVuQixDQUFDOzs7OztJQUpDLGVBQWU7UUFDYixnREFBZ0Q7UUFDaEQsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlELENBQUM7OztZQWxCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtnQkFDN0IsUUFBUSxFQUFFOzs7O0tBSVA7YUFDSjs7OzBCQUlFLFNBQVMsU0FBQyxjQUFjLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFOzs7O0lBRjVDLGlDQUFpQjs7SUFFakIsb0NBQytCOztJQUMvQixtQ0FBa0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIEVtYmVkZGVkVmlld1JlZiwgVGVtcGxhdGVSZWYsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBEeW5hbWljV3JhcHBlciB9IGZyb20gJy4uLy4uL3V0aWxzL2hvc3Qtd3JhcHBpbmcvZHluYW1pYy13cmFwcGVyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGctd3JhcHBlZC1jb2x1bW4nLFxuICB0ZW1wbGF0ZTogYCAgICAgICAgXG4gICAgICAgIDxuZy10ZW1wbGF0ZSAjY29sdW1uUG9ydGFsPlxuICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgIGAsXG59KVxuZXhwb3J0IGNsYXNzIFdyYXBwZWRDb2x1bW4gaW1wbGVtZW50cyBEeW5hbWljV3JhcHBlciwgQWZ0ZXJWaWV3SW5pdCB7XG4gIF9keW5hbWljID0gZmFsc2U7XG5cbiAgQFZpZXdDaGlsZCgnY29sdW1uUG9ydGFsJywgeyBzdGF0aWM6IGZhbHNlIH0pXG4gIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjx2b2lkPjtcbiAgY29sdW1uVmlldzogRW1iZWRkZWRWaWV3UmVmPHZvaWQ+OyAvLyB0aGUgY29sdW1ucyBwcm9qZWN0ZWQgdmlldyAoaW4gbWVtb3J5KVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAvLyBDcmVhdGUgdGhlIGNlbGxzIHZpZXcgaW4gbWVtb3J5LCBub3QgdGhlIERPTS5cbiAgICB0aGlzLmNvbHVtblZpZXcgPSB0aGlzLnRlbXBsYXRlUmVmLmNyZWF0ZUVtYmVkZGVkVmlldyhudWxsKTtcbiAgfVxufVxuIl19