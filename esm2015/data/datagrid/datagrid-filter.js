/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Point } from '../../popover/common/popover';
import { CustomFilter } from './providers/custom-filter';
import { FiltersProvider } from './providers/filters';
import { DatagridFilterRegistrar } from './utils/datagrid-filter-registrar';
import { ClrCommonStrings } from '../../utils/i18n/common-strings.interface';
/**
 * Custom filter that can be added in any column to override the default object property string filter.
 * The reason this is not just an input on DatagridColumn is because we need the filter's template to be projected,
 * since it can be anything (not just a text input).
 * @template T
 */
export class ClrDatagridFilter extends DatagridFilterRegistrar {
    /**
     * @param {?} _filters
     * @param {?} commonStrings
     */
    constructor(_filters, commonStrings) {
        super(_filters);
        this.commonStrings = commonStrings;
        this.anchorPoint = Point.RIGHT_BOTTOM;
        this.popoverPoint = Point.RIGHT_TOP;
        this.popoverOptions = { allowMultipleOpen: true };
        /**
         * Tracks whether the filter dropdown is open or not
         */
        this._open = false;
        this.openChanged = new EventEmitter(false);
    }
    /**
     * @return {?}
     */
    get open() {
        return this._open;
    }
    /**
     * @param {?} open
     * @return {?}
     */
    set open(open) {
        /** @type {?} */
        const boolOpen = !!open;
        if (boolOpen !== this._open) {
            this._open = boolOpen;
            this.openChanged.emit(boolOpen);
        }
    }
    /**
     * @param {?} filter
     * @return {?}
     */
    set customFilter(filter) {
        this.setFilter(filter);
    }
    /**
     * Indicates if the filter is currently active
     * @return {?}
     */
    get active() {
        return !!this.filter && this.filter.isActive();
    }
    /**
     * Shows/hides the filter dropdown
     * @return {?}
     */
    toggle() {
        this.open = !this.open;
    }
}
ClrDatagridFilter.decorators = [
    { type: Component, args: [{
                selector: 'clr-dg-filter',
                // We register this component as a CustomFilter, for the parent column to detect it.
                providers: [{ provide: CustomFilter, useExisting: ClrDatagridFilter }],
                template: `
        <button #anchor class="datagrid-filter-toggle" (click)="toggle()"
            [class.datagrid-filter-open]="open" [class.datagrid-filtered]="active"
            type="button"></button>

        <ng-template [(clrPopoverOld)]="open" [clrPopoverOldAnchor]="anchor" [clrPopoverOldAnchorPoint]="anchorPoint"
             [clrPopoverOldPopoverPoint]="popoverPoint" [clrPopoverOldOptions]="popoverOptions">
            <div class="datagrid-filter">
                <!-- FIXME: this whole filter part needs a final design before we can try to have a cleaner DOM -->
                <div class="datagrid-filter-close-wrapper">
                    <button type="button" class="close" (click)="open = false">
                        <clr-icon shape="close" [attr.title]="commonStrings.close"></clr-icon>
                    </button>
                </div>
    
                <ng-content></ng-content>
            </div>
        </ng-template>
    `
            }] }
];
/** @nocollapse */
ClrDatagridFilter.ctorParameters = () => [
    { type: FiltersProvider },
    { type: ClrCommonStrings }
];
ClrDatagridFilter.propDecorators = {
    open: [{ type: Input, args: ['clrDgFilterOpen',] }],
    openChanged: [{ type: Output, args: ['clrDgFilterOpenChange',] }],
    customFilter: [{ type: Input, args: ['clrDgFilter',] }]
};
if (false) {
    /** @type {?} */
    ClrDatagridFilter.prototype.anchorPoint;
    /** @type {?} */
    ClrDatagridFilter.prototype.popoverPoint;
    /** @type {?} */
    ClrDatagridFilter.prototype.popoverOptions;
    /**
     * Tracks whether the filter dropdown is open or not
     * @type {?}
     * @private
     */
    ClrDatagridFilter.prototype._open;
    /** @type {?} */
    ClrDatagridFilter.prototype.openChanged;
    /** @type {?} */
    ClrDatagridFilter.prototype.commonStrings;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtZmlsdGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9kYXRhZ3JpZC1maWx0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV2RSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFJckQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxlQUFlLEVBQW9CLE1BQU0scUJBQXFCLENBQUM7QUFDeEUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDNUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7Ozs7Ozs7QUErQjdFLE1BQU0sT0FBTyxpQkFBMkIsU0FBUSx1QkFBeUQ7Ozs7O0lBRXZHLFlBQVksUUFBNEIsRUFBUyxhQUErQjtRQUM5RSxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFEK0Isa0JBQWEsR0FBYixhQUFhLENBQWtCO1FBSXpFLGdCQUFXLEdBQVUsS0FBSyxDQUFDLFlBQVksQ0FBQztRQUN4QyxpQkFBWSxHQUFVLEtBQUssQ0FBQyxTQUFTLENBQUM7UUFDdEMsbUJBQWMsR0FBbUIsRUFBRSxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7OztRQUk1RCxVQUFLLEdBQUcsS0FBSyxDQUFDO1FBY2tCLGdCQUFXLEdBQUcsSUFBSSxZQUFZLENBQVUsS0FBSyxDQUFDLENBQUM7SUF0QnZGLENBQUM7Ozs7SUFTRCxJQUFXLElBQUk7UUFDYixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQzs7Ozs7SUFFRCxJQUNXLElBQUksQ0FBQyxJQUFhOztjQUNyQixRQUFRLEdBQUcsQ0FBQyxDQUFDLElBQUk7UUFDdkIsSUFBSSxRQUFRLEtBQUssSUFBSSxDQUFDLEtBQUssRUFBRTtZQUMzQixJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQztZQUN0QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNqQztJQUNILENBQUM7Ozs7O0lBSUQsSUFDVyxZQUFZLENBQUMsTUFBMEY7UUFDaEgsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN6QixDQUFDOzs7OztJQUtELElBQVcsTUFBTTtRQUNmLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNqRCxDQUFDOzs7OztJQUtNLE1BQU07UUFDWCxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztJQUN6QixDQUFDOzs7WUFyRUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxlQUFlOztnQkFFekIsU0FBUyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxDQUFDO2dCQUN0RSxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQWtCUDthQUNKOzs7O1lBaENRLGVBQWU7WUFFZixnQkFBZ0I7OzttQkFnRHRCLEtBQUssU0FBQyxpQkFBaUI7MEJBU3ZCLE1BQU0sU0FBQyx1QkFBdUI7MkJBRTlCLEtBQUssU0FBQyxhQUFhOzs7O0lBdEJwQix3Q0FBK0M7O0lBQy9DLHlDQUE2Qzs7SUFDN0MsMkNBQW9FOzs7Ozs7SUFJcEUsa0NBQXNCOztJQWN0Qix3Q0FBdUY7O0lBeEI3QywwQ0FBc0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBQb2ludCB9IGZyb20gJy4uLy4uL3BvcG92ZXIvY29tbW9uL3BvcG92ZXInO1xuaW1wb3J0IHsgUG9wb3Zlck9wdGlvbnMgfSBmcm9tICcuLi8uLi9wb3BvdmVyL2NvbW1vbi9wb3BvdmVyLW9wdGlvbnMuaW50ZXJmYWNlJztcblxuaW1wb3J0IHsgQ2xyRGF0YWdyaWRGaWx0ZXJJbnRlcmZhY2UgfSBmcm9tICcuL2ludGVyZmFjZXMvZmlsdGVyLmludGVyZmFjZSc7XG5pbXBvcnQgeyBDdXN0b21GaWx0ZXIgfSBmcm9tICcuL3Byb3ZpZGVycy9jdXN0b20tZmlsdGVyJztcbmltcG9ydCB7IEZpbHRlcnNQcm92aWRlciwgUmVnaXN0ZXJlZEZpbHRlciB9IGZyb20gJy4vcHJvdmlkZXJzL2ZpbHRlcnMnO1xuaW1wb3J0IHsgRGF0YWdyaWRGaWx0ZXJSZWdpc3RyYXIgfSBmcm9tICcuL3V0aWxzL2RhdGFncmlkLWZpbHRlci1yZWdpc3RyYXInO1xuaW1wb3J0IHsgQ2xyQ29tbW9uU3RyaW5ncyB9IGZyb20gJy4uLy4uL3V0aWxzL2kxOG4vY29tbW9uLXN0cmluZ3MuaW50ZXJmYWNlJztcblxuLyoqXG4gKiBDdXN0b20gZmlsdGVyIHRoYXQgY2FuIGJlIGFkZGVkIGluIGFueSBjb2x1bW4gdG8gb3ZlcnJpZGUgdGhlIGRlZmF1bHQgb2JqZWN0IHByb3BlcnR5IHN0cmluZyBmaWx0ZXIuXG4gKiBUaGUgcmVhc29uIHRoaXMgaXMgbm90IGp1c3QgYW4gaW5wdXQgb24gRGF0YWdyaWRDb2x1bW4gaXMgYmVjYXVzZSB3ZSBuZWVkIHRoZSBmaWx0ZXIncyB0ZW1wbGF0ZSB0byBiZSBwcm9qZWN0ZWQsXG4gKiBzaW5jZSBpdCBjYW4gYmUgYW55dGhpbmcgKG5vdCBqdXN0IGEgdGV4dCBpbnB1dCkuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci1kZy1maWx0ZXInLFxuICAvLyBXZSByZWdpc3RlciB0aGlzIGNvbXBvbmVudCBhcyBhIEN1c3RvbUZpbHRlciwgZm9yIHRoZSBwYXJlbnQgY29sdW1uIHRvIGRldGVjdCBpdC5cbiAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBDdXN0b21GaWx0ZXIsIHVzZUV4aXN0aW5nOiBDbHJEYXRhZ3JpZEZpbHRlciB9XSxcbiAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGJ1dHRvbiAjYW5jaG9yIGNsYXNzPVwiZGF0YWdyaWQtZmlsdGVyLXRvZ2dsZVwiIChjbGljayk9XCJ0b2dnbGUoKVwiXG4gICAgICAgICAgICBbY2xhc3MuZGF0YWdyaWQtZmlsdGVyLW9wZW5dPVwib3BlblwiIFtjbGFzcy5kYXRhZ3JpZC1maWx0ZXJlZF09XCJhY3RpdmVcIlxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiPjwvYnV0dG9uPlxuXG4gICAgICAgIDxuZy10ZW1wbGF0ZSBbKGNsclBvcG92ZXJPbGQpXT1cIm9wZW5cIiBbY2xyUG9wb3Zlck9sZEFuY2hvcl09XCJhbmNob3JcIiBbY2xyUG9wb3Zlck9sZEFuY2hvclBvaW50XT1cImFuY2hvclBvaW50XCJcbiAgICAgICAgICAgICBbY2xyUG9wb3Zlck9sZFBvcG92ZXJQb2ludF09XCJwb3BvdmVyUG9pbnRcIiBbY2xyUG9wb3Zlck9sZE9wdGlvbnNdPVwicG9wb3Zlck9wdGlvbnNcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkYXRhZ3JpZC1maWx0ZXJcIj5cbiAgICAgICAgICAgICAgICA8IS0tIEZJWE1FOiB0aGlzIHdob2xlIGZpbHRlciBwYXJ0IG5lZWRzIGEgZmluYWwgZGVzaWduIGJlZm9yZSB3ZSBjYW4gdHJ5IHRvIGhhdmUgYSBjbGVhbmVyIERPTSAtLT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGF0YWdyaWQtZmlsdGVyLWNsb3NlLXdyYXBwZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIChjbGljayk9XCJvcGVuID0gZmFsc2VcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxjbHItaWNvbiBzaGFwZT1cImNsb3NlXCIgW2F0dHIudGl0bGVdPVwiY29tbW9uU3RyaW5ncy5jbG9zZVwiPjwvY2xyLWljb24+XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgIFxuICAgICAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgIGAsXG59KVxuZXhwb3J0IGNsYXNzIENsckRhdGFncmlkRmlsdGVyPFQgPSBhbnk+IGV4dGVuZHMgRGF0YWdyaWRGaWx0ZXJSZWdpc3RyYXI8VCwgQ2xyRGF0YWdyaWRGaWx0ZXJJbnRlcmZhY2U8VD4+XG4gIGltcGxlbWVudHMgQ3VzdG9tRmlsdGVyIHtcbiAgY29uc3RydWN0b3IoX2ZpbHRlcnM6IEZpbHRlcnNQcm92aWRlcjxUPiwgcHVibGljIGNvbW1vblN0cmluZ3M6IENsckNvbW1vblN0cmluZ3MpIHtcbiAgICBzdXBlcihfZmlsdGVycyk7XG4gIH1cblxuICBwdWJsaWMgYW5jaG9yUG9pbnQ6IFBvaW50ID0gUG9pbnQuUklHSFRfQk9UVE9NO1xuICBwdWJsaWMgcG9wb3ZlclBvaW50OiBQb2ludCA9IFBvaW50LlJJR0hUX1RPUDtcbiAgcHVibGljIHBvcG92ZXJPcHRpb25zOiBQb3BvdmVyT3B0aW9ucyA9IHsgYWxsb3dNdWx0aXBsZU9wZW46IHRydWUgfTtcbiAgLyoqXG4gICAqIFRyYWNrcyB3aGV0aGVyIHRoZSBmaWx0ZXIgZHJvcGRvd24gaXMgb3BlbiBvciBub3RcbiAgICovXG4gIHByaXZhdGUgX29wZW4gPSBmYWxzZTtcbiAgcHVibGljIGdldCBvcGVuKCkge1xuICAgIHJldHVybiB0aGlzLl9vcGVuO1xuICB9XG5cbiAgQElucHV0KCdjbHJEZ0ZpbHRlck9wZW4nKVxuICBwdWJsaWMgc2V0IG9wZW4ob3BlbjogYm9vbGVhbikge1xuICAgIGNvbnN0IGJvb2xPcGVuID0gISFvcGVuO1xuICAgIGlmIChib29sT3BlbiAhPT0gdGhpcy5fb3Blbikge1xuICAgICAgdGhpcy5fb3BlbiA9IGJvb2xPcGVuO1xuICAgICAgdGhpcy5vcGVuQ2hhbmdlZC5lbWl0KGJvb2xPcGVuKTtcbiAgICB9XG4gIH1cblxuICBAT3V0cHV0KCdjbHJEZ0ZpbHRlck9wZW5DaGFuZ2UnKSBwdWJsaWMgb3BlbkNoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KGZhbHNlKTtcblxuICBASW5wdXQoJ2NsckRnRmlsdGVyJylcbiAgcHVibGljIHNldCBjdXN0b21GaWx0ZXIoZmlsdGVyOiBDbHJEYXRhZ3JpZEZpbHRlckludGVyZmFjZTxUPiB8IFJlZ2lzdGVyZWRGaWx0ZXI8VCwgQ2xyRGF0YWdyaWRGaWx0ZXJJbnRlcmZhY2U8VD4+KSB7XG4gICAgdGhpcy5zZXRGaWx0ZXIoZmlsdGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgaWYgdGhlIGZpbHRlciBpcyBjdXJyZW50bHkgYWN0aXZlXG4gICAqL1xuICBwdWJsaWMgZ2V0IGFjdGl2ZSgpIHtcbiAgICByZXR1cm4gISF0aGlzLmZpbHRlciAmJiB0aGlzLmZpbHRlci5pc0FjdGl2ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNob3dzL2hpZGVzIHRoZSBmaWx0ZXIgZHJvcGRvd25cbiAgICovXG4gIHB1YmxpYyB0b2dnbGUoKSB7XG4gICAgdGhpcy5vcGVuID0gIXRoaXMub3BlbjtcbiAgfVxufVxuIl19