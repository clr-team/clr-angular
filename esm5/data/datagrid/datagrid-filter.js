/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var ClrDatagridFilter = /** @class */ (function (_super) {
    tslib_1.__extends(ClrDatagridFilter, _super);
    function ClrDatagridFilter(_filters, commonStrings) {
        var _this = _super.call(this, _filters) || this;
        _this.commonStrings = commonStrings;
        _this.anchorPoint = Point.RIGHT_BOTTOM;
        _this.popoverPoint = Point.RIGHT_TOP;
        _this.popoverOptions = { allowMultipleOpen: true };
        /**
         * Tracks whether the filter dropdown is open or not
         */
        _this._open = false;
        _this.openChanged = new EventEmitter(false);
        return _this;
    }
    Object.defineProperty(ClrDatagridFilter.prototype, "open", {
        get: /**
         * @return {?}
         */
        function () {
            return this._open;
        },
        set: /**
         * @param {?} open
         * @return {?}
         */
        function (open) {
            /** @type {?} */
            var boolOpen = !!open;
            if (boolOpen !== this._open) {
                this._open = boolOpen;
                this.openChanged.emit(boolOpen);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridFilter.prototype, "customFilter", {
        set: /**
         * @param {?} filter
         * @return {?}
         */
        function (filter) {
            this.setFilter(filter);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridFilter.prototype, "active", {
        /**
         * Indicates if the filter is currently active
         */
        get: /**
         * Indicates if the filter is currently active
         * @return {?}
         */
        function () {
            return !!this.filter && this.filter.isActive();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Shows/hides the filter dropdown
     */
    /**
     * Shows/hides the filter dropdown
     * @return {?}
     */
    ClrDatagridFilter.prototype.toggle = /**
     * Shows/hides the filter dropdown
     * @return {?}
     */
    function () {
        this.open = !this.open;
    };
    ClrDatagridFilter.decorators = [
        { type: Component, args: [{
                    selector: 'clr-dg-filter',
                    // We register this component as a CustomFilter, for the parent column to detect it.
                    providers: [{ provide: CustomFilter, useExisting: ClrDatagridFilter }],
                    template: "\n        <button #anchor class=\"datagrid-filter-toggle\" (click)=\"toggle()\"\n            [class.datagrid-filter-open]=\"open\" [class.datagrid-filtered]=\"active\"\n            type=\"button\"></button>\n\n        <ng-template [(clrPopoverOld)]=\"open\" [clrPopoverOldAnchor]=\"anchor\" [clrPopoverOldAnchorPoint]=\"anchorPoint\"\n             [clrPopoverOldPopoverPoint]=\"popoverPoint\" [clrPopoverOldOptions]=\"popoverOptions\">\n            <div class=\"datagrid-filter\">\n                <!-- FIXME: this whole filter part needs a final design before we can try to have a cleaner DOM -->\n                <div class=\"datagrid-filter-close-wrapper\">\n                    <button type=\"button\" class=\"close\" (click)=\"open = false\">\n                        <clr-icon shape=\"close\" [attr.title]=\"commonStrings.close\"></clr-icon>\n                    </button>\n                </div>\n    \n                <ng-content></ng-content>\n            </div>\n        </ng-template>\n    "
                }] }
    ];
    /** @nocollapse */
    ClrDatagridFilter.ctorParameters = function () { return [
        { type: FiltersProvider },
        { type: ClrCommonStrings }
    ]; };
    ClrDatagridFilter.propDecorators = {
        open: [{ type: Input, args: ['clrDgFilterOpen',] }],
        openChanged: [{ type: Output, args: ['clrDgFilterOpenChange',] }],
        customFilter: [{ type: Input, args: ['clrDgFilter',] }]
    };
    return ClrDatagridFilter;
}(DatagridFilterRegistrar));
export { ClrDatagridFilter };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtZmlsdGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9kYXRhZ3JpZC1maWx0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUtBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFdkUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBSXJELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsZUFBZSxFQUFvQixNQUFNLHFCQUFxQixDQUFDO0FBQ3hFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQzVFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDJDQUEyQyxDQUFDOzs7Ozs7O0FBTzdFO0lBd0JnRCw2Q0FBeUQ7SUFFdkcsMkJBQVksUUFBNEIsRUFBUyxhQUErQjtRQUFoRixZQUNFLGtCQUFNLFFBQVEsQ0FBQyxTQUNoQjtRQUZnRCxtQkFBYSxHQUFiLGFBQWEsQ0FBa0I7UUFJekUsaUJBQVcsR0FBVSxLQUFLLENBQUMsWUFBWSxDQUFDO1FBQ3hDLGtCQUFZLEdBQVUsS0FBSyxDQUFDLFNBQVMsQ0FBQztRQUN0QyxvQkFBYyxHQUFtQixFQUFFLGlCQUFpQixFQUFFLElBQUksRUFBRSxDQUFDOzs7O1FBSTVELFdBQUssR0FBRyxLQUFLLENBQUM7UUFja0IsaUJBQVcsR0FBRyxJQUFJLFlBQVksQ0FBVSxLQUFLLENBQUMsQ0FBQzs7SUF0QnZGLENBQUM7SUFTRCxzQkFBVyxtQ0FBSTs7OztRQUFmO1lBQ0UsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3BCLENBQUM7Ozs7O1FBRUQsVUFDZ0IsSUFBYTs7Z0JBQ3JCLFFBQVEsR0FBRyxDQUFDLENBQUMsSUFBSTtZQUN2QixJQUFJLFFBQVEsS0FBSyxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUMzQixJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQztnQkFDdEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDakM7UUFDSCxDQUFDOzs7T0FUQTtJQWFELHNCQUNXLDJDQUFZOzs7OztRQUR2QixVQUN3QixNQUEwRjtZQUNoSCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3pCLENBQUM7OztPQUFBO0lBS0Qsc0JBQVcscUNBQU07UUFIakI7O1dBRUc7Ozs7O1FBQ0g7WUFDRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDakQsQ0FBQzs7O09BQUE7SUFFRDs7T0FFRzs7Ozs7SUFDSSxrQ0FBTTs7OztJQUFiO1FBQ0UsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDekIsQ0FBQzs7Z0JBckVGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsZUFBZTs7b0JBRXpCLFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQztvQkFDdEUsUUFBUSxFQUFFLDIrQkFrQlA7aUJBQ0o7Ozs7Z0JBaENRLGVBQWU7Z0JBRWYsZ0JBQWdCOzs7dUJBZ0R0QixLQUFLLFNBQUMsaUJBQWlCOzhCQVN2QixNQUFNLFNBQUMsdUJBQXVCOytCQUU5QixLQUFLLFNBQUMsYUFBYTs7SUFrQnRCLHdCQUFDO0NBQUEsQUF0RUQsQ0F3QmdELHVCQUF1QixHQThDdEU7U0E5Q1ksaUJBQWlCOzs7SUFNNUIsd0NBQStDOztJQUMvQyx5Q0FBNkM7O0lBQzdDLDJDQUFvRTs7Ozs7O0lBSXBFLGtDQUFzQjs7SUFjdEIsd0NBQXVGOztJQXhCN0MsMENBQXNDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tICcuLi8uLi9wb3BvdmVyL2NvbW1vbi9wb3BvdmVyJztcbmltcG9ydCB7IFBvcG92ZXJPcHRpb25zIH0gZnJvbSAnLi4vLi4vcG9wb3Zlci9jb21tb24vcG9wb3Zlci1vcHRpb25zLmludGVyZmFjZSc7XG5cbmltcG9ydCB7IENsckRhdGFncmlkRmlsdGVySW50ZXJmYWNlIH0gZnJvbSAnLi9pbnRlcmZhY2VzL2ZpbHRlci5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQ3VzdG9tRmlsdGVyIH0gZnJvbSAnLi9wcm92aWRlcnMvY3VzdG9tLWZpbHRlcic7XG5pbXBvcnQgeyBGaWx0ZXJzUHJvdmlkZXIsIFJlZ2lzdGVyZWRGaWx0ZXIgfSBmcm9tICcuL3Byb3ZpZGVycy9maWx0ZXJzJztcbmltcG9ydCB7IERhdGFncmlkRmlsdGVyUmVnaXN0cmFyIH0gZnJvbSAnLi91dGlscy9kYXRhZ3JpZC1maWx0ZXItcmVnaXN0cmFyJztcbmltcG9ydCB7IENsckNvbW1vblN0cmluZ3MgfSBmcm9tICcuLi8uLi91dGlscy9pMThuL2NvbW1vbi1zdHJpbmdzLmludGVyZmFjZSc7XG5cbi8qKlxuICogQ3VzdG9tIGZpbHRlciB0aGF0IGNhbiBiZSBhZGRlZCBpbiBhbnkgY29sdW1uIHRvIG92ZXJyaWRlIHRoZSBkZWZhdWx0IG9iamVjdCBwcm9wZXJ0eSBzdHJpbmcgZmlsdGVyLlxuICogVGhlIHJlYXNvbiB0aGlzIGlzIG5vdCBqdXN0IGFuIGlucHV0IG9uIERhdGFncmlkQ29sdW1uIGlzIGJlY2F1c2Ugd2UgbmVlZCB0aGUgZmlsdGVyJ3MgdGVtcGxhdGUgdG8gYmUgcHJvamVjdGVkLFxuICogc2luY2UgaXQgY2FuIGJlIGFueXRoaW5nIChub3QganVzdCBhIHRleHQgaW5wdXQpLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItZGctZmlsdGVyJyxcbiAgLy8gV2UgcmVnaXN0ZXIgdGhpcyBjb21wb25lbnQgYXMgYSBDdXN0b21GaWx0ZXIsIGZvciB0aGUgcGFyZW50IGNvbHVtbiB0byBkZXRlY3QgaXQuXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogQ3VzdG9tRmlsdGVyLCB1c2VFeGlzdGluZzogQ2xyRGF0YWdyaWRGaWx0ZXIgfV0sXG4gIHRlbXBsYXRlOiBgXG4gICAgICAgIDxidXR0b24gI2FuY2hvciBjbGFzcz1cImRhdGFncmlkLWZpbHRlci10b2dnbGVcIiAoY2xpY2spPVwidG9nZ2xlKClcIlxuICAgICAgICAgICAgW2NsYXNzLmRhdGFncmlkLWZpbHRlci1vcGVuXT1cIm9wZW5cIiBbY2xhc3MuZGF0YWdyaWQtZmlsdGVyZWRdPVwiYWN0aXZlXCJcbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIj48L2J1dHRvbj5cblxuICAgICAgICA8bmctdGVtcGxhdGUgWyhjbHJQb3BvdmVyT2xkKV09XCJvcGVuXCIgW2NsclBvcG92ZXJPbGRBbmNob3JdPVwiYW5jaG9yXCIgW2NsclBvcG92ZXJPbGRBbmNob3JQb2ludF09XCJhbmNob3JQb2ludFwiXG4gICAgICAgICAgICAgW2NsclBvcG92ZXJPbGRQb3BvdmVyUG9pbnRdPVwicG9wb3ZlclBvaW50XCIgW2NsclBvcG92ZXJPbGRPcHRpb25zXT1cInBvcG92ZXJPcHRpb25zXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGF0YWdyaWQtZmlsdGVyXCI+XG4gICAgICAgICAgICAgICAgPCEtLSBGSVhNRTogdGhpcyB3aG9sZSBmaWx0ZXIgcGFydCBuZWVkcyBhIGZpbmFsIGRlc2lnbiBiZWZvcmUgd2UgY2FuIHRyeSB0byBoYXZlIGEgY2xlYW5lciBET00gLS0+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRhdGFncmlkLWZpbHRlci1jbG9zZS13cmFwcGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2VcIiAoY2xpY2spPVwib3BlbiA9IGZhbHNlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Y2xyLWljb24gc2hhcGU9XCJjbG9zZVwiIFthdHRyLnRpdGxlXT1cImNvbW1vblN0cmluZ3MuY2xvc2VcIj48L2Nsci1pY29uPlxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICBcbiAgICAgICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICBgLFxufSlcbmV4cG9ydCBjbGFzcyBDbHJEYXRhZ3JpZEZpbHRlcjxUID0gYW55PiBleHRlbmRzIERhdGFncmlkRmlsdGVyUmVnaXN0cmFyPFQsIENsckRhdGFncmlkRmlsdGVySW50ZXJmYWNlPFQ+PlxuICBpbXBsZW1lbnRzIEN1c3RvbUZpbHRlciB7XG4gIGNvbnN0cnVjdG9yKF9maWx0ZXJzOiBGaWx0ZXJzUHJvdmlkZXI8VD4sIHB1YmxpYyBjb21tb25TdHJpbmdzOiBDbHJDb21tb25TdHJpbmdzKSB7XG4gICAgc3VwZXIoX2ZpbHRlcnMpO1xuICB9XG5cbiAgcHVibGljIGFuY2hvclBvaW50OiBQb2ludCA9IFBvaW50LlJJR0hUX0JPVFRPTTtcbiAgcHVibGljIHBvcG92ZXJQb2ludDogUG9pbnQgPSBQb2ludC5SSUdIVF9UT1A7XG4gIHB1YmxpYyBwb3BvdmVyT3B0aW9uczogUG9wb3Zlck9wdGlvbnMgPSB7IGFsbG93TXVsdGlwbGVPcGVuOiB0cnVlIH07XG4gIC8qKlxuICAgKiBUcmFja3Mgd2hldGhlciB0aGUgZmlsdGVyIGRyb3Bkb3duIGlzIG9wZW4gb3Igbm90XG4gICAqL1xuICBwcml2YXRlIF9vcGVuID0gZmFsc2U7XG4gIHB1YmxpYyBnZXQgb3BlbigpIHtcbiAgICByZXR1cm4gdGhpcy5fb3BlbjtcbiAgfVxuXG4gIEBJbnB1dCgnY2xyRGdGaWx0ZXJPcGVuJylcbiAgcHVibGljIHNldCBvcGVuKG9wZW46IGJvb2xlYW4pIHtcbiAgICBjb25zdCBib29sT3BlbiA9ICEhb3BlbjtcbiAgICBpZiAoYm9vbE9wZW4gIT09IHRoaXMuX29wZW4pIHtcbiAgICAgIHRoaXMuX29wZW4gPSBib29sT3BlbjtcbiAgICAgIHRoaXMub3BlbkNoYW5nZWQuZW1pdChib29sT3Blbik7XG4gICAgfVxuICB9XG5cbiAgQE91dHB1dCgnY2xyRGdGaWx0ZXJPcGVuQ2hhbmdlJykgcHVibGljIG9wZW5DaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPihmYWxzZSk7XG5cbiAgQElucHV0KCdjbHJEZ0ZpbHRlcicpXG4gIHB1YmxpYyBzZXQgY3VzdG9tRmlsdGVyKGZpbHRlcjogQ2xyRGF0YWdyaWRGaWx0ZXJJbnRlcmZhY2U8VD4gfCBSZWdpc3RlcmVkRmlsdGVyPFQsIENsckRhdGFncmlkRmlsdGVySW50ZXJmYWNlPFQ+Pikge1xuICAgIHRoaXMuc2V0RmlsdGVyKGZpbHRlcik7XG4gIH1cblxuICAvKipcbiAgICogSW5kaWNhdGVzIGlmIHRoZSBmaWx0ZXIgaXMgY3VycmVudGx5IGFjdGl2ZVxuICAgKi9cbiAgcHVibGljIGdldCBhY3RpdmUoKSB7XG4gICAgcmV0dXJuICEhdGhpcy5maWx0ZXIgJiYgdGhpcy5maWx0ZXIuaXNBY3RpdmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG93cy9oaWRlcyB0aGUgZmlsdGVyIGRyb3Bkb3duXG4gICAqL1xuICBwdWJsaWMgdG9nZ2xlKCkge1xuICAgIHRoaXMub3BlbiA9ICF0aGlzLm9wZW47XG4gIH1cbn1cbiJdfQ==