/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
                    template: "\n        <button #anchor \n                (click)=\"toggle()\"\n                class=\"datagrid-filter-toggle\"\n                [class.datagrid-filter-open]=\"open\" \n                [class.datagrid-filtered]=\"active\"\n                type=\"button\">\n            <clr-icon [attr.shape]=\"active ? 'filter-grid-circle': 'filter-grid'\" class=\"is-solid\"></clr-icon>\n        </button>\n\n        <ng-template [(clrPopoverOld)]=\"open\" [clrPopoverOldAnchor]=\"anchor\" [clrPopoverOldAnchorPoint]=\"anchorPoint\"\n             [clrPopoverOldPopoverPoint]=\"popoverPoint\" [clrPopoverOldOptions]=\"popoverOptions\">\n            <div class=\"datagrid-filter\">\n                <!-- FIXME: this whole filter part needs a final design before we can try to have a cleaner DOM -->\n                <div class=\"datagrid-filter-close-wrapper\">\n                    <button type=\"button\" class=\"close\" (click)=\"open = false\">\n                        <clr-icon shape=\"close\" [attr.title]=\"commonStrings.close\"></clr-icon>\n                    </button>\n                </div>\n    \n                <ng-content></ng-content>\n            </div>\n        </ng-template>\n    "
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtZmlsdGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9kYXRhZ3JpZC1maWx0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUtBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFdkUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBSXJELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsZUFBZSxFQUFvQixNQUFNLHFCQUFxQixDQUFDO0FBQ3hFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQzVFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDJDQUEyQyxDQUFDOzs7Ozs7O0FBTzdFO0lBNkJnRCw2Q0FBeUQ7SUFFdkcsMkJBQVksUUFBNEIsRUFBUyxhQUErQjtRQUFoRixZQUNFLGtCQUFNLFFBQVEsQ0FBQyxTQUNoQjtRQUZnRCxtQkFBYSxHQUFiLGFBQWEsQ0FBa0I7UUFJekUsaUJBQVcsR0FBVSxLQUFLLENBQUMsWUFBWSxDQUFDO1FBQ3hDLGtCQUFZLEdBQVUsS0FBSyxDQUFDLFNBQVMsQ0FBQztRQUN0QyxvQkFBYyxHQUFtQixFQUFFLGlCQUFpQixFQUFFLElBQUksRUFBRSxDQUFDOzs7O1FBSTVELFdBQUssR0FBRyxLQUFLLENBQUM7UUFja0IsaUJBQVcsR0FBRyxJQUFJLFlBQVksQ0FBVSxLQUFLLENBQUMsQ0FBQzs7SUF0QnZGLENBQUM7SUFTRCxzQkFBVyxtQ0FBSTs7OztRQUFmO1lBQ0UsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3BCLENBQUM7Ozs7O1FBRUQsVUFDZ0IsSUFBYTs7Z0JBQ3JCLFFBQVEsR0FBRyxDQUFDLENBQUMsSUFBSTtZQUN2QixJQUFJLFFBQVEsS0FBSyxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUMzQixJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQztnQkFDdEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDakM7UUFDSCxDQUFDOzs7T0FUQTtJQWFELHNCQUNXLDJDQUFZOzs7OztRQUR2QixVQUN3QixNQUEwRjtZQUNoSCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3pCLENBQUM7OztPQUFBO0lBS0Qsc0JBQVcscUNBQU07UUFIakI7O1dBRUc7Ozs7O1FBQ0g7WUFDRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDakQsQ0FBQzs7O09BQUE7SUFFRDs7T0FFRzs7Ozs7SUFDSSxrQ0FBTTs7OztJQUFiO1FBQ0UsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDekIsQ0FBQzs7Z0JBMUVGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsZUFBZTs7b0JBRXpCLFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQztvQkFDdEUsUUFBUSxFQUFFLHNxQ0F1QlA7aUJBQ0o7Ozs7Z0JBckNRLGVBQWU7Z0JBRWYsZ0JBQWdCOzs7dUJBcUR0QixLQUFLLFNBQUMsaUJBQWlCOzhCQVN2QixNQUFNLFNBQUMsdUJBQXVCOytCQUU5QixLQUFLLFNBQUMsYUFBYTs7SUFrQnRCLHdCQUFDO0NBQUEsQUEzRUQsQ0E2QmdELHVCQUF1QixHQThDdEU7U0E5Q1ksaUJBQWlCOzs7SUFNNUIsd0NBQStDOztJQUMvQyx5Q0FBNkM7O0lBQzdDLDJDQUFvRTs7Ozs7O0lBSXBFLGtDQUFzQjs7SUFjdEIsd0NBQXVGOztJQXhCN0MsMENBQXNDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tICcuLi8uLi9wb3BvdmVyL2NvbW1vbi9wb3BvdmVyJztcbmltcG9ydCB7IFBvcG92ZXJPcHRpb25zIH0gZnJvbSAnLi4vLi4vcG9wb3Zlci9jb21tb24vcG9wb3Zlci1vcHRpb25zLmludGVyZmFjZSc7XG5cbmltcG9ydCB7IENsckRhdGFncmlkRmlsdGVySW50ZXJmYWNlIH0gZnJvbSAnLi9pbnRlcmZhY2VzL2ZpbHRlci5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQ3VzdG9tRmlsdGVyIH0gZnJvbSAnLi9wcm92aWRlcnMvY3VzdG9tLWZpbHRlcic7XG5pbXBvcnQgeyBGaWx0ZXJzUHJvdmlkZXIsIFJlZ2lzdGVyZWRGaWx0ZXIgfSBmcm9tICcuL3Byb3ZpZGVycy9maWx0ZXJzJztcbmltcG9ydCB7IERhdGFncmlkRmlsdGVyUmVnaXN0cmFyIH0gZnJvbSAnLi91dGlscy9kYXRhZ3JpZC1maWx0ZXItcmVnaXN0cmFyJztcbmltcG9ydCB7IENsckNvbW1vblN0cmluZ3MgfSBmcm9tICcuLi8uLi91dGlscy9pMThuL2NvbW1vbi1zdHJpbmdzLmludGVyZmFjZSc7XG5cbi8qKlxuICogQ3VzdG9tIGZpbHRlciB0aGF0IGNhbiBiZSBhZGRlZCBpbiBhbnkgY29sdW1uIHRvIG92ZXJyaWRlIHRoZSBkZWZhdWx0IG9iamVjdCBwcm9wZXJ0eSBzdHJpbmcgZmlsdGVyLlxuICogVGhlIHJlYXNvbiB0aGlzIGlzIG5vdCBqdXN0IGFuIGlucHV0IG9uIERhdGFncmlkQ29sdW1uIGlzIGJlY2F1c2Ugd2UgbmVlZCB0aGUgZmlsdGVyJ3MgdGVtcGxhdGUgdG8gYmUgcHJvamVjdGVkLFxuICogc2luY2UgaXQgY2FuIGJlIGFueXRoaW5nIChub3QganVzdCBhIHRleHQgaW5wdXQpLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItZGctZmlsdGVyJyxcbiAgLy8gV2UgcmVnaXN0ZXIgdGhpcyBjb21wb25lbnQgYXMgYSBDdXN0b21GaWx0ZXIsIGZvciB0aGUgcGFyZW50IGNvbHVtbiB0byBkZXRlY3QgaXQuXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogQ3VzdG9tRmlsdGVyLCB1c2VFeGlzdGluZzogQ2xyRGF0YWdyaWRGaWx0ZXIgfV0sXG4gIHRlbXBsYXRlOiBgXG4gICAgICAgIDxidXR0b24gI2FuY2hvciBcbiAgICAgICAgICAgICAgICAoY2xpY2spPVwidG9nZ2xlKClcIlxuICAgICAgICAgICAgICAgIGNsYXNzPVwiZGF0YWdyaWQtZmlsdGVyLXRvZ2dsZVwiXG4gICAgICAgICAgICAgICAgW2NsYXNzLmRhdGFncmlkLWZpbHRlci1vcGVuXT1cIm9wZW5cIiBcbiAgICAgICAgICAgICAgICBbY2xhc3MuZGF0YWdyaWQtZmlsdGVyZWRdPVwiYWN0aXZlXCJcbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCI+XG4gICAgICAgICAgICA8Y2xyLWljb24gW2F0dHIuc2hhcGVdPVwiYWN0aXZlID8gJ2ZpbHRlci1ncmlkLWNpcmNsZSc6ICdmaWx0ZXItZ3JpZCdcIiBjbGFzcz1cImlzLXNvbGlkXCI+PC9jbHItaWNvbj5cbiAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgPG5nLXRlbXBsYXRlIFsoY2xyUG9wb3Zlck9sZCldPVwib3BlblwiIFtjbHJQb3BvdmVyT2xkQW5jaG9yXT1cImFuY2hvclwiIFtjbHJQb3BvdmVyT2xkQW5jaG9yUG9pbnRdPVwiYW5jaG9yUG9pbnRcIlxuICAgICAgICAgICAgIFtjbHJQb3BvdmVyT2xkUG9wb3ZlclBvaW50XT1cInBvcG92ZXJQb2ludFwiIFtjbHJQb3BvdmVyT2xkT3B0aW9uc109XCJwb3BvdmVyT3B0aW9uc1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRhdGFncmlkLWZpbHRlclwiPlxuICAgICAgICAgICAgICAgIDwhLS0gRklYTUU6IHRoaXMgd2hvbGUgZmlsdGVyIHBhcnQgbmVlZHMgYSBmaW5hbCBkZXNpZ24gYmVmb3JlIHdlIGNhbiB0cnkgdG8gaGF2ZSBhIGNsZWFuZXIgRE9NIC0tPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkYXRhZ3JpZC1maWx0ZXItY2xvc2Utd3JhcHBlclwiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNsb3NlXCIgKGNsaWNrKT1cIm9wZW4gPSBmYWxzZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGNsci1pY29uIHNoYXBlPVwiY2xvc2VcIiBbYXR0ci50aXRsZV09XCJjb21tb25TdHJpbmdzLmNsb3NlXCI+PC9jbHItaWNvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgXG4gICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgYCxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyRGF0YWdyaWRGaWx0ZXI8VCA9IGFueT4gZXh0ZW5kcyBEYXRhZ3JpZEZpbHRlclJlZ2lzdHJhcjxULCBDbHJEYXRhZ3JpZEZpbHRlckludGVyZmFjZTxUPj5cbiAgaW1wbGVtZW50cyBDdXN0b21GaWx0ZXIge1xuICBjb25zdHJ1Y3RvcihfZmlsdGVyczogRmlsdGVyc1Byb3ZpZGVyPFQ+LCBwdWJsaWMgY29tbW9uU3RyaW5nczogQ2xyQ29tbW9uU3RyaW5ncykge1xuICAgIHN1cGVyKF9maWx0ZXJzKTtcbiAgfVxuXG4gIHB1YmxpYyBhbmNob3JQb2ludDogUG9pbnQgPSBQb2ludC5SSUdIVF9CT1RUT007XG4gIHB1YmxpYyBwb3BvdmVyUG9pbnQ6IFBvaW50ID0gUG9pbnQuUklHSFRfVE9QO1xuICBwdWJsaWMgcG9wb3Zlck9wdGlvbnM6IFBvcG92ZXJPcHRpb25zID0geyBhbGxvd011bHRpcGxlT3BlbjogdHJ1ZSB9O1xuICAvKipcbiAgICogVHJhY2tzIHdoZXRoZXIgdGhlIGZpbHRlciBkcm9wZG93biBpcyBvcGVuIG9yIG5vdFxuICAgKi9cbiAgcHJpdmF0ZSBfb3BlbiA9IGZhbHNlO1xuICBwdWJsaWMgZ2V0IG9wZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuX29wZW47XG4gIH1cblxuICBASW5wdXQoJ2NsckRnRmlsdGVyT3BlbicpXG4gIHB1YmxpYyBzZXQgb3BlbihvcGVuOiBib29sZWFuKSB7XG4gICAgY29uc3QgYm9vbE9wZW4gPSAhIW9wZW47XG4gICAgaWYgKGJvb2xPcGVuICE9PSB0aGlzLl9vcGVuKSB7XG4gICAgICB0aGlzLl9vcGVuID0gYm9vbE9wZW47XG4gICAgICB0aGlzLm9wZW5DaGFuZ2VkLmVtaXQoYm9vbE9wZW4pO1xuICAgIH1cbiAgfVxuXG4gIEBPdXRwdXQoJ2NsckRnRmlsdGVyT3BlbkNoYW5nZScpIHB1YmxpYyBvcGVuQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIEBJbnB1dCgnY2xyRGdGaWx0ZXInKVxuICBwdWJsaWMgc2V0IGN1c3RvbUZpbHRlcihmaWx0ZXI6IENsckRhdGFncmlkRmlsdGVySW50ZXJmYWNlPFQ+IHwgUmVnaXN0ZXJlZEZpbHRlcjxULCBDbHJEYXRhZ3JpZEZpbHRlckludGVyZmFjZTxUPj4pIHtcbiAgICB0aGlzLnNldEZpbHRlcihmaWx0ZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluZGljYXRlcyBpZiB0aGUgZmlsdGVyIGlzIGN1cnJlbnRseSBhY3RpdmVcbiAgICovXG4gIHB1YmxpYyBnZXQgYWN0aXZlKCkge1xuICAgIHJldHVybiAhIXRoaXMuZmlsdGVyICYmIHRoaXMuZmlsdGVyLmlzQWN0aXZlKCk7XG4gIH1cblxuICAvKipcbiAgICogU2hvd3MvaGlkZXMgdGhlIGZpbHRlciBkcm9wZG93blxuICAgKi9cbiAgcHVibGljIHRvZ2dsZSgpIHtcbiAgICB0aGlzLm9wZW4gPSAhdGhpcy5vcGVuO1xuICB9XG59XG4iXX0=