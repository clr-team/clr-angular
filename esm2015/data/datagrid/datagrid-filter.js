/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
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
        <button #anchor 
                (click)="toggle()"
                class="datagrid-filter-toggle"
                [class.datagrid-filter-open]="open" 
                [class.datagrid-filtered]="active"
                type="button">
            <clr-icon [attr.shape]="active ? 'filter-grid-circle': 'filter-grid'" class="is-solid"></clr-icon>
        </button>

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtZmlsdGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9kYXRhZ3JpZC1maWx0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV2RSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFJckQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxlQUFlLEVBQW9CLE1BQU0scUJBQXFCLENBQUM7QUFDeEUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDNUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7Ozs7Ozs7QUFvQzdFLE1BQU0sT0FBTyxpQkFBMkIsU0FBUSx1QkFBeUQ7Ozs7O0lBRXZHLFlBQVksUUFBNEIsRUFBUyxhQUErQjtRQUM5RSxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFEK0Isa0JBQWEsR0FBYixhQUFhLENBQWtCO1FBSXpFLGdCQUFXLEdBQVUsS0FBSyxDQUFDLFlBQVksQ0FBQztRQUN4QyxpQkFBWSxHQUFVLEtBQUssQ0FBQyxTQUFTLENBQUM7UUFDdEMsbUJBQWMsR0FBbUIsRUFBRSxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7OztRQUk1RCxVQUFLLEdBQUcsS0FBSyxDQUFDO1FBY2tCLGdCQUFXLEdBQUcsSUFBSSxZQUFZLENBQVUsS0FBSyxDQUFDLENBQUM7SUF0QnZGLENBQUM7Ozs7SUFTRCxJQUFXLElBQUk7UUFDYixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQzs7Ozs7SUFFRCxJQUNXLElBQUksQ0FBQyxJQUFhOztjQUNyQixRQUFRLEdBQUcsQ0FBQyxDQUFDLElBQUk7UUFDdkIsSUFBSSxRQUFRLEtBQUssSUFBSSxDQUFDLEtBQUssRUFBRTtZQUMzQixJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQztZQUN0QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNqQztJQUNILENBQUM7Ozs7O0lBSUQsSUFDVyxZQUFZLENBQUMsTUFBMEY7UUFDaEgsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN6QixDQUFDOzs7OztJQUtELElBQVcsTUFBTTtRQUNmLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNqRCxDQUFDOzs7OztJQUtNLE1BQU07UUFDWCxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztJQUN6QixDQUFDOzs7WUExRUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxlQUFlOztnQkFFekIsU0FBUyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxDQUFDO2dCQUN0RSxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBdUJQO2FBQ0o7Ozs7WUFyQ1EsZUFBZTtZQUVmLGdCQUFnQjs7O21CQXFEdEIsS0FBSyxTQUFDLGlCQUFpQjswQkFTdkIsTUFBTSxTQUFDLHVCQUF1QjsyQkFFOUIsS0FBSyxTQUFDLGFBQWE7Ozs7SUF0QnBCLHdDQUErQzs7SUFDL0MseUNBQTZDOztJQUM3QywyQ0FBb0U7Ozs7OztJQUlwRSxrQ0FBc0I7O0lBY3RCLHdDQUF1Rjs7SUF4QjdDLDBDQUFzQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFBvaW50IH0gZnJvbSAnLi4vLi4vcG9wb3Zlci9jb21tb24vcG9wb3Zlcic7XG5pbXBvcnQgeyBQb3BvdmVyT3B0aW9ucyB9IGZyb20gJy4uLy4uL3BvcG92ZXIvY29tbW9uL3BvcG92ZXItb3B0aW9ucy5pbnRlcmZhY2UnO1xuXG5pbXBvcnQgeyBDbHJEYXRhZ3JpZEZpbHRlckludGVyZmFjZSB9IGZyb20gJy4vaW50ZXJmYWNlcy9maWx0ZXIuaW50ZXJmYWNlJztcbmltcG9ydCB7IEN1c3RvbUZpbHRlciB9IGZyb20gJy4vcHJvdmlkZXJzL2N1c3RvbS1maWx0ZXInO1xuaW1wb3J0IHsgRmlsdGVyc1Byb3ZpZGVyLCBSZWdpc3RlcmVkRmlsdGVyIH0gZnJvbSAnLi9wcm92aWRlcnMvZmlsdGVycyc7XG5pbXBvcnQgeyBEYXRhZ3JpZEZpbHRlclJlZ2lzdHJhciB9IGZyb20gJy4vdXRpbHMvZGF0YWdyaWQtZmlsdGVyLXJlZ2lzdHJhcic7XG5pbXBvcnQgeyBDbHJDb21tb25TdHJpbmdzIH0gZnJvbSAnLi4vLi4vdXRpbHMvaTE4bi9jb21tb24tc3RyaW5ncy5pbnRlcmZhY2UnO1xuXG4vKipcbiAqIEN1c3RvbSBmaWx0ZXIgdGhhdCBjYW4gYmUgYWRkZWQgaW4gYW55IGNvbHVtbiB0byBvdmVycmlkZSB0aGUgZGVmYXVsdCBvYmplY3QgcHJvcGVydHkgc3RyaW5nIGZpbHRlci5cbiAqIFRoZSByZWFzb24gdGhpcyBpcyBub3QganVzdCBhbiBpbnB1dCBvbiBEYXRhZ3JpZENvbHVtbiBpcyBiZWNhdXNlIHdlIG5lZWQgdGhlIGZpbHRlcidzIHRlbXBsYXRlIHRvIGJlIHByb2plY3RlZCxcbiAqIHNpbmNlIGl0IGNhbiBiZSBhbnl0aGluZyAobm90IGp1c3QgYSB0ZXh0IGlucHV0KS5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLWRnLWZpbHRlcicsXG4gIC8vIFdlIHJlZ2lzdGVyIHRoaXMgY29tcG9uZW50IGFzIGEgQ3VzdG9tRmlsdGVyLCBmb3IgdGhlIHBhcmVudCBjb2x1bW4gdG8gZGV0ZWN0IGl0LlxuICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IEN1c3RvbUZpbHRlciwgdXNlRXhpc3Rpbmc6IENsckRhdGFncmlkRmlsdGVyIH1dLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgICA8YnV0dG9uICNhbmNob3IgXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cInRvZ2dsZSgpXCJcbiAgICAgICAgICAgICAgICBjbGFzcz1cImRhdGFncmlkLWZpbHRlci10b2dnbGVcIlxuICAgICAgICAgICAgICAgIFtjbGFzcy5kYXRhZ3JpZC1maWx0ZXItb3Blbl09XCJvcGVuXCIgXG4gICAgICAgICAgICAgICAgW2NsYXNzLmRhdGFncmlkLWZpbHRlcmVkXT1cImFjdGl2ZVwiXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiPlxuICAgICAgICAgICAgPGNsci1pY29uIFthdHRyLnNoYXBlXT1cImFjdGl2ZSA/ICdmaWx0ZXItZ3JpZC1jaXJjbGUnOiAnZmlsdGVyLWdyaWQnXCIgY2xhc3M9XCJpcy1zb2xpZFwiPjwvY2xyLWljb24+XG4gICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgIDxuZy10ZW1wbGF0ZSBbKGNsclBvcG92ZXJPbGQpXT1cIm9wZW5cIiBbY2xyUG9wb3Zlck9sZEFuY2hvcl09XCJhbmNob3JcIiBbY2xyUG9wb3Zlck9sZEFuY2hvclBvaW50XT1cImFuY2hvclBvaW50XCJcbiAgICAgICAgICAgICBbY2xyUG9wb3Zlck9sZFBvcG92ZXJQb2ludF09XCJwb3BvdmVyUG9pbnRcIiBbY2xyUG9wb3Zlck9sZE9wdGlvbnNdPVwicG9wb3Zlck9wdGlvbnNcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkYXRhZ3JpZC1maWx0ZXJcIj5cbiAgICAgICAgICAgICAgICA8IS0tIEZJWE1FOiB0aGlzIHdob2xlIGZpbHRlciBwYXJ0IG5lZWRzIGEgZmluYWwgZGVzaWduIGJlZm9yZSB3ZSBjYW4gdHJ5IHRvIGhhdmUgYSBjbGVhbmVyIERPTSAtLT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGF0YWdyaWQtZmlsdGVyLWNsb3NlLXdyYXBwZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIChjbGljayk9XCJvcGVuID0gZmFsc2VcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxjbHItaWNvbiBzaGFwZT1cImNsb3NlXCIgW2F0dHIudGl0bGVdPVwiY29tbW9uU3RyaW5ncy5jbG9zZVwiPjwvY2xyLWljb24+XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgIFxuICAgICAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgIGAsXG59KVxuZXhwb3J0IGNsYXNzIENsckRhdGFncmlkRmlsdGVyPFQgPSBhbnk+IGV4dGVuZHMgRGF0YWdyaWRGaWx0ZXJSZWdpc3RyYXI8VCwgQ2xyRGF0YWdyaWRGaWx0ZXJJbnRlcmZhY2U8VD4+XG4gIGltcGxlbWVudHMgQ3VzdG9tRmlsdGVyIHtcbiAgY29uc3RydWN0b3IoX2ZpbHRlcnM6IEZpbHRlcnNQcm92aWRlcjxUPiwgcHVibGljIGNvbW1vblN0cmluZ3M6IENsckNvbW1vblN0cmluZ3MpIHtcbiAgICBzdXBlcihfZmlsdGVycyk7XG4gIH1cblxuICBwdWJsaWMgYW5jaG9yUG9pbnQ6IFBvaW50ID0gUG9pbnQuUklHSFRfQk9UVE9NO1xuICBwdWJsaWMgcG9wb3ZlclBvaW50OiBQb2ludCA9IFBvaW50LlJJR0hUX1RPUDtcbiAgcHVibGljIHBvcG92ZXJPcHRpb25zOiBQb3BvdmVyT3B0aW9ucyA9IHsgYWxsb3dNdWx0aXBsZU9wZW46IHRydWUgfTtcbiAgLyoqXG4gICAqIFRyYWNrcyB3aGV0aGVyIHRoZSBmaWx0ZXIgZHJvcGRvd24gaXMgb3BlbiBvciBub3RcbiAgICovXG4gIHByaXZhdGUgX29wZW4gPSBmYWxzZTtcbiAgcHVibGljIGdldCBvcGVuKCkge1xuICAgIHJldHVybiB0aGlzLl9vcGVuO1xuICB9XG5cbiAgQElucHV0KCdjbHJEZ0ZpbHRlck9wZW4nKVxuICBwdWJsaWMgc2V0IG9wZW4ob3BlbjogYm9vbGVhbikge1xuICAgIGNvbnN0IGJvb2xPcGVuID0gISFvcGVuO1xuICAgIGlmIChib29sT3BlbiAhPT0gdGhpcy5fb3Blbikge1xuICAgICAgdGhpcy5fb3BlbiA9IGJvb2xPcGVuO1xuICAgICAgdGhpcy5vcGVuQ2hhbmdlZC5lbWl0KGJvb2xPcGVuKTtcbiAgICB9XG4gIH1cblxuICBAT3V0cHV0KCdjbHJEZ0ZpbHRlck9wZW5DaGFuZ2UnKSBwdWJsaWMgb3BlbkNoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KGZhbHNlKTtcblxuICBASW5wdXQoJ2NsckRnRmlsdGVyJylcbiAgcHVibGljIHNldCBjdXN0b21GaWx0ZXIoZmlsdGVyOiBDbHJEYXRhZ3JpZEZpbHRlckludGVyZmFjZTxUPiB8IFJlZ2lzdGVyZWRGaWx0ZXI8VCwgQ2xyRGF0YWdyaWRGaWx0ZXJJbnRlcmZhY2U8VD4+KSB7XG4gICAgdGhpcy5zZXRGaWx0ZXIoZmlsdGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgaWYgdGhlIGZpbHRlciBpcyBjdXJyZW50bHkgYWN0aXZlXG4gICAqL1xuICBwdWJsaWMgZ2V0IGFjdGl2ZSgpIHtcbiAgICByZXR1cm4gISF0aGlzLmZpbHRlciAmJiB0aGlzLmZpbHRlci5pc0FjdGl2ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNob3dzL2hpZGVzIHRoZSBmaWx0ZXIgZHJvcGRvd25cbiAgICovXG4gIHB1YmxpYyB0b2dnbGUoKSB7XG4gICAgdGhpcy5vcGVuID0gIXRoaXMub3BlbjtcbiAgfVxufVxuIl19