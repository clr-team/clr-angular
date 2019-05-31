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
import { Component, ContentChild, EventEmitter, Input, Output, ViewContainerRef, } from '@angular/core';
import { HostWrapper } from '../../utils/host-wrapping/host-wrapper';
import { DatagridPropertyComparator } from './built-in/comparators/datagrid-property-comparator';
import { DatagridPropertyStringFilter } from './built-in/filters/datagrid-property-string-filter';
import { DatagridStringFilterImpl } from './built-in/filters/datagrid-string-filter-impl';
import { ClrDatagridSortOrder } from './enums/sort-order.enum';
import { CustomFilter } from './providers/custom-filter';
import { FiltersProvider } from './providers/filters';
import { Sort } from './providers/sort';
import { DatagridFilterRegistrar } from './utils/datagrid-filter-registrar';
import { WrappedColumn } from './wrapped-column';
import { ClrCommonStrings } from '../../utils/i18n/common-strings.interface';
/**
 * @template T
 */
var ClrDatagridColumn = /** @class */ (function (_super) {
    tslib_1.__extends(ClrDatagridColumn, _super);
    function ClrDatagridColumn(_sort, filters, vcr, commonStrings) {
        var _this = _super.call(this, filters) || this;
        _this._sort = _sort;
        _this.vcr = vcr;
        _this.commonStrings = commonStrings;
        // deprecated: to be removed - START
        /**
         * Indicates if the column is currently sorted
         *
         * @deprecated This will be removed soon, in favor of the sortOrder mechanism
         */
        _this._sorted = false;
        /**
         * @deprecated This will be removed soon, in favor of the sortOrder mechanism
         */
        _this.sortedChange = new EventEmitter();
        // deprecated: to be removed - END
        /**
         * Indicates how the column is currently sorted
         */
        _this._sortOrder = ClrDatagridSortOrder.UNSORTED;
        _this.sortOrderChange = new EventEmitter();
        /**
         * A custom filter for this column that can be provided in the projected content
         */
        _this.customFilter = false;
        _this.filterValueChange = new EventEmitter();
        _this._sortSubscription = _sort.change.subscribe((/**
         * @param {?} sort
         * @return {?}
         */
        function (sort) {
            // We're only listening to make sure we emit an event when the column goes from sorted to unsorted
            if (_this.sortOrder !== ClrDatagridSortOrder.UNSORTED && sort.comparator !== _this._sortBy) {
                _this._sortOrder = ClrDatagridSortOrder.UNSORTED;
                _this.sortOrderChange.emit(_this._sortOrder);
                // removes the sortIcon when column becomes unsorted
                _this.sortIcon = null;
            }
            // deprecated: to be removed - START
            if (_this.sorted && sort.comparator !== _this._sortBy) {
                _this._sorted = false;
                _this.sortedChange.emit(false);
            }
            // deprecated: to be removed - END
        }));
        return _this;
    }
    /**
     * @return {?}
     */
    ClrDatagridColumn.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._sortSubscription.unsubscribe();
    };
    Object.defineProperty(ClrDatagridColumn.prototype, "field", {
        get: /**
         * @return {?}
         */
        function () {
            return this._field;
        },
        set: /**
         * @param {?} field
         * @return {?}
         */
        function (field) {
            if (typeof field === 'string') {
                this._field = field;
                if (!this.customFilter) {
                    this.setFilter(new DatagridStringFilterImpl(new DatagridPropertyStringFilter(field)));
                }
                if (!this._sortBy) {
                    this._sortBy = new DatagridPropertyComparator(field);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridColumn.prototype, "sortBy", {
        get: /**
         * @return {?}
         */
        function () {
            return this._sortBy;
        },
        set: /**
         * @param {?} comparator
         * @return {?}
         */
        function (comparator) {
            if (typeof comparator === 'string') {
                this._sortBy = new DatagridPropertyComparator(comparator);
            }
            else {
                if (comparator) {
                    this._sortBy = comparator;
                }
                else {
                    if (this._field) {
                        this._sortBy = new DatagridPropertyComparator(this._field);
                    }
                    else {
                        delete this._sortBy;
                    }
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridColumn.prototype, "sortable", {
        /**
         * Indicates if the column is sortable
         */
        get: /**
         * Indicates if the column is sortable
         * @return {?}
         */
        function () {
            return !!this._sortBy;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridColumn.prototype, "sorted", {
        get: /**
         * @return {?}
         */
        function () {
            return this._sorted;
        },
        /**
         * @deprecated This will be removed soon, in favor of the sortOrder mechanism
         */
        set: /**
         * @deprecated This will be removed soon, in favor of the sortOrder mechanism
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (!value && this.sorted) {
                this._sorted = false;
                this._sort.clear();
            }
            else if (value && !this.sorted) {
                this.sort();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridColumn.prototype, "sortOrder", {
        get: /**
         * @return {?}
         */
        function () {
            return this._sortOrder;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (typeof value === 'undefined') {
                return;
            }
            // only if the incoming order is different from the current one
            if (this._sortOrder === value) {
                return;
            }
            switch (value) {
                // the Unsorted case happens when the current state is either Asc or Desc
                default:
                case ClrDatagridSortOrder.UNSORTED:
                    this._sort.clear();
                    break;
                case ClrDatagridSortOrder.ASC:
                    this.sort(false);
                    break;
                case ClrDatagridSortOrder.DESC:
                    this.sort(true);
                    break;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridColumn.prototype, "ariaSort", {
        get: /**
         * @return {?}
         */
        function () {
            switch (this._sortOrder) {
                default:
                case ClrDatagridSortOrder.UNSORTED:
                    return 'none';
                case ClrDatagridSortOrder.ASC:
                    return 'ascending';
                case ClrDatagridSortOrder.DESC:
                    return 'descending';
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Sorts the datagrid based on this column
     */
    /**
     * Sorts the datagrid based on this column
     * @param {?=} reverse
     * @return {?}
     */
    ClrDatagridColumn.prototype.sort = /**
     * Sorts the datagrid based on this column
     * @param {?=} reverse
     * @return {?}
     */
    function (reverse) {
        if (!this.sortable) {
            return;
        }
        this._sort.toggle(this._sortBy, reverse);
        // setting the private variable to not retrigger the setter logic
        this._sortOrder = this._sort.reverse ? ClrDatagridSortOrder.DESC : ClrDatagridSortOrder.ASC;
        // Sets the correct icon for current sort order
        this.sortIcon = this._sortOrder === ClrDatagridSortOrder.DESC ? 'arrow down' : 'arrow';
        this.sortOrderChange.emit(this._sortOrder);
        // deprecated: to be removed - START
        this._sorted = true;
        this.sortedChange.emit(true);
        // deprecated: to be removed - END
    };
    Object.defineProperty(ClrDatagridColumn.prototype, "projectedFilter", {
        set: /**
         * @param {?} custom
         * @return {?}
         */
        function (custom) {
            if (custom) {
                this.deleteFilter();
                this.customFilter = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridColumn.prototype, "filterValue", {
        get: /**
         * @return {?}
         */
        function () {
            return this.filter.value;
        },
        set: /**
         * @param {?} newValue
         * @return {?}
         */
        function (newValue) {
            this.updateFilterValue = newValue;
            this.filterValueChange.emit(this.filter.value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridColumn.prototype, "updateFilterValue", {
        set: /**
         * @param {?} newValue
         * @return {?}
         */
        function (newValue) {
            if (!this.filter) {
                return;
            }
            if (!newValue) {
                newValue = '';
            }
            if (newValue !== this.filter.value) {
                this.filter.value = newValue;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ClrDatagridColumn.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.wrappedInjector = new HostWrapper(WrappedColumn, this.vcr);
    };
    Object.defineProperty(ClrDatagridColumn.prototype, "_view", {
        get: /**
         * @return {?}
         */
        function () {
            return this.wrappedInjector.get(WrappedColumn, this.vcr).columnView;
        },
        enumerable: true,
        configurable: true
    });
    ClrDatagridColumn.decorators = [
        { type: Component, args: [{
                    selector: 'clr-dg-column',
                    template: "\n      <div class=\"datagrid-column-flex\">\n          <!-- I'm really not happy with that select since it's not very scalable -->\n          <ng-content select=\"clr-dg-filter, clr-dg-string-filter\"></ng-content>\n\n          <clr-dg-string-filter\n                  *ngIf=\"field && !customFilter\"\n                  [clrDgStringFilter]=\"registered\"\n                  [(clrFilterValue)]=\"filterValue\"></clr-dg-string-filter>\n\n          <ng-template #columnTitle>\n              <ng-content></ng-content>\n          </ng-template>\n\n          <button \n            class=\"datagrid-column-title\" \n            [attr.aria-label]=\"commonStrings.sortColumn\"\n            *ngIf=\"sortable\" \n            (click)=\"sort()\" \n            type=\"button\">\n              <ng-container  *ngTemplateOutlet=\"columnTitle\"></ng-container>\n              <clr-icon\n                      *ngIf=\"sortIcon\"\n                      [attr.shape]=\"sortIcon\"\n                      class=\"sort-icon\"></clr-icon>\n          </button>\n\n          <span class=\"datagrid-column-title\" *ngIf=\"!sortable\">\n              <ng-container *ngTemplateOutlet=\"columnTitle\"></ng-container>\n          </span>\n\n          <clr-dg-column-separator></clr-dg-column-separator>\n      </div>\n  ",
                    host: {
                        '[class.datagrid-column]': 'true',
                        '[attr.aria-sort]': 'ariaSort',
                        role: 'columnheader',
                    }
                }] }
    ];
    /** @nocollapse */
    ClrDatagridColumn.ctorParameters = function () { return [
        { type: Sort },
        { type: FiltersProvider },
        { type: ViewContainerRef },
        { type: ClrCommonStrings }
    ]; };
    ClrDatagridColumn.propDecorators = {
        field: [{ type: Input, args: ['clrDgField',] }],
        sortBy: [{ type: Input, args: ['clrDgSortBy',] }],
        sorted: [{ type: Input, args: ['clrDgSorted',] }],
        sortedChange: [{ type: Output, args: ['clrDgSortedChange',] }],
        sortOrder: [{ type: Input, args: ['clrDgSortOrder',] }],
        sortOrderChange: [{ type: Output, args: ['clrDgSortOrderChange',] }],
        projectedFilter: [{ type: ContentChild, args: [CustomFilter, { static: false },] }],
        updateFilterValue: [{ type: Input, args: ['clrFilterValue',] }],
        filterValueChange: [{ type: Output, args: ['clrFilterValueChange',] }]
    };
    return ClrDatagridColumn;
}(DatagridFilterRegistrar));
export { ClrDatagridColumn };
if (false) {
    /**
     * Subscription to the sort service changes
     * @type {?}
     * @private
     */
    ClrDatagridColumn.prototype._sortSubscription;
    /**
     * @type {?}
     * @private
     */
    ClrDatagridColumn.prototype._field;
    /**
     * ClrDatagridComparatorInterface to use when sorting the column
     * @type {?}
     * @private
     */
    ClrDatagridColumn.prototype._sortBy;
    /**
     * Indicates if the column is currently sorted
     *
     * @deprecated This will be removed soon, in favor of the sortOrder mechanism
     * @type {?}
     * @private
     */
    ClrDatagridColumn.prototype._sorted;
    /**
     * @deprecated This will be removed soon, in favor of the sortOrder mechanism
     * @type {?}
     */
    ClrDatagridColumn.prototype.sortedChange;
    /**
     * Indicates how the column is currently sorted
     * @type {?}
     * @private
     */
    ClrDatagridColumn.prototype._sortOrder;
    /** @type {?} */
    ClrDatagridColumn.prototype.sortOrderChange;
    /** @type {?} */
    ClrDatagridColumn.prototype.sortIcon;
    /**
     * A custom filter for this column that can be provided in the projected content
     * @type {?}
     */
    ClrDatagridColumn.prototype.customFilter;
    /** @type {?} */
    ClrDatagridColumn.prototype.filterValueChange;
    /**
     * @type {?}
     * @private
     */
    ClrDatagridColumn.prototype.wrappedInjector;
    /**
     * @type {?}
     * @private
     */
    ClrDatagridColumn.prototype._sort;
    /**
     * @type {?}
     * @private
     */
    ClrDatagridColumn.prototype.vcr;
    /** @type {?} */
    ClrDatagridColumn.prototype.commonStrings;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtY29sdW1uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9kYXRhZ3JpZC1jb2x1bW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUtBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLFlBQVksRUFFWixLQUFLLEVBR0wsTUFBTSxFQUNOLGdCQUFnQixHQUNqQixNQUFNLGVBQWUsQ0FBQztBQUd2QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDckUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0scURBQXFELENBQUM7QUFDakcsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFDbEcsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDMUYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFL0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDeEMsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDNUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDJDQUEyQyxDQUFDOzs7O0FBRTdFO0lBMENnRCw2Q0FBdUQ7SUFFckcsMkJBQ1UsS0FBYyxFQUN0QixPQUEyQixFQUNuQixHQUFxQixFQUN0QixhQUErQjtRQUp4QyxZQU1FLGtCQUFNLE9BQU8sQ0FBQyxTQWdCZjtRQXJCUyxXQUFLLEdBQUwsS0FBSyxDQUFTO1FBRWQsU0FBRyxHQUFILEdBQUcsQ0FBa0I7UUFDdEIs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b0JBQ0QsSUFBSSxFQUFFO3dCQUNKLHlCQUF5QixFQUFFLE1BQU07d0JBQ2pDLGtCQUFrQixFQUFFLFVBQVU7d0JBQzlCLElBQUksRUFBRSxjQUFjO3FCQUNyQjtpQkFDRjs7OztnQkE5Q1EsSUFBSTtnQkFESixlQUFlO2dCQVh0QixnQkFBZ0I7Z0JBZVQsZ0JBQWdCOzs7d0JBd0Z0QixLQUFLLFNBQUMsWUFBWTt5QkF1QmxCLEtBQUssU0FBQyxhQUFhO3lCQXNDbkIsS0FBSyxTQUFDLGFBQWE7K0JBYW5CLE1BQU0sU0FBQyxtQkFBbUI7NEJBWTFCLEtBQUssU0FBQyxnQkFBZ0I7a0NBc0N0QixNQUFNLFNBQUMsc0JBQXNCO2tDQStCN0IsWUFBWSxTQUFDLFlBQVksRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7b0NBWTVDLEtBQUssU0FBQyxnQkFBZ0I7b0NBa0J0QixNQUFNLFNBQUMsc0JBQXNCOztJQVdoQyx3QkFBQztDQUFBLEFBMVJELENBMENnRCx1QkFBdUIsR0FnUHRFO1NBaFBZLGlCQUFpQjs7Ozs7OztJQTZCNUIsOENBQXdDOzs7OztJQVV4QyxtQ0FBdUI7Ozs7OztJQXNCdkIsb0NBQW1EOzs7Ozs7OztJQW9DbkQsb0NBQXdCOzs7OztJQXFCeEIseUNBQStFOzs7Ozs7SUFPL0UsdUNBQXlFOztJQTJDekUsNENBQWtHOztJQXdCbEcscUNBQWdCOzs7OztJQUtoQix5Q0FBNEI7O0lBZ0M1Qiw4Q0FBdUU7Ozs7O0lBRXZFLDRDQUFrQzs7Ozs7SUFwT2hDLGtDQUFzQjs7Ozs7SUFFdEIsZ0NBQTZCOztJQUM3QiwwQ0FBc0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQge1xuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZCxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbmplY3RvcixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFZpZXdDb250YWluZXJSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IEhvc3RXcmFwcGVyIH0gZnJvbSAnLi4vLi4vdXRpbHMvaG9zdC13cmFwcGluZy9ob3N0LXdyYXBwZXInO1xuaW1wb3J0IHsgRGF0YWdyaWRQcm9wZXJ0eUNvbXBhcmF0b3IgfSBmcm9tICcuL2J1aWx0LWluL2NvbXBhcmF0b3JzL2RhdGFncmlkLXByb3BlcnR5LWNvbXBhcmF0b3InO1xuaW1wb3J0IHsgRGF0YWdyaWRQcm9wZXJ0eVN0cmluZ0ZpbHRlciB9IGZyb20gJy4vYnVpbHQtaW4vZmlsdGVycy9kYXRhZ3JpZC1wcm9wZXJ0eS1zdHJpbmctZmlsdGVyJztcbmltcG9ydCB7IERhdGFncmlkU3RyaW5nRmlsdGVySW1wbCB9IGZyb20gJy4vYnVpbHQtaW4vZmlsdGVycy9kYXRhZ3JpZC1zdHJpbmctZmlsdGVyLWltcGwnO1xuaW1wb3J0IHsgQ2xyRGF0YWdyaWRTb3J0T3JkZXIgfSBmcm9tICcuL2VudW1zL3NvcnQtb3JkZXIuZW51bSc7XG5pbXBvcnQgeyBDbHJEYXRhZ3JpZENvbXBhcmF0b3JJbnRlcmZhY2UgfSBmcm9tICcuL2ludGVyZmFjZXMvY29tcGFyYXRvci5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQ3VzdG9tRmlsdGVyIH0gZnJvbSAnLi9wcm92aWRlcnMvY3VzdG9tLWZpbHRlcic7XG5pbXBvcnQgeyBGaWx0ZXJzUHJvdmlkZXIgfSBmcm9tICcuL3Byb3ZpZGVycy9maWx0ZXJzJztcbmltcG9ydCB7IFNvcnQgfSBmcm9tICcuL3Byb3ZpZGVycy9zb3J0JztcbmltcG9ydCB7IERhdGFncmlkRmlsdGVyUmVnaXN0cmFyIH0gZnJvbSAnLi91dGlscy9kYXRhZ3JpZC1maWx0ZXItcmVnaXN0cmFyJztcbmltcG9ydCB7IFdyYXBwZWRDb2x1bW4gfSBmcm9tICcuL3dyYXBwZWQtY29sdW1uJztcbmltcG9ydCB7IENsckNvbW1vblN0cmluZ3MgfSBmcm9tICcuLi8uLi91dGlscy9pMThuL2NvbW1vbi1zdHJpbmdzLmludGVyZmFjZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci1kZy1jb2x1bW4nLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgPGRpdiBjbGFzcz1cImRhdGFncmlkLWNvbHVtbi1mbGV4XCI+XG4gICAgICAgICAgPCEtLSBJJ20gcmVhbGx5IG5vdCBoYXBweSB3aXRoIHRoYXQgc2VsZWN0IHNpbmNlIGl0J3Mgbm90IHZlcnkgc2NhbGFibGUgLS0+XG4gICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiY2xyLWRnLWZpbHRlciwgY2xyLWRnLXN0cmluZy1maWx0ZXJcIj48L25nLWNvbnRlbnQ+XG5cbiAgICAgICAgICA8Y2xyLWRnLXN0cmluZy1maWx0ZXJcbiAgICAgICAgICAgICAgICAgICpuZ0lmPVwiZmllbGQgJiYgIWN1c3RvbUZpbHRlclwiXG4gICAgICAgICAgICAgICAgICBbY2xyRGdTdHJpbmdGaWx0ZXJdPVwicmVnaXN0ZXJlZFwiXG4gICAgICAgICAgICAgICAgICBbKGNsckZpbHRlclZhbHVlKV09XCJmaWx0ZXJWYWx1ZVwiPjwvY2xyLWRnLXN0cmluZy1maWx0ZXI+XG5cbiAgICAgICAgICA8bmctdGVtcGxhdGUgI2NvbHVtblRpdGxlPlxuICAgICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgICAgICAgIDxidXR0b24gXG4gICAgICAgICAgICBjbGFzcz1cImRhdGFncmlkLWNvbHVtbi10aXRsZVwiIFxuICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJjb21tb25TdHJpbmdzLnNvcnRDb2x1bW5cIlxuICAgICAgICAgICAgKm5nSWY9XCJzb3J0YWJsZVwiIFxuICAgICAgICAgICAgKGNsaWNrKT1cInNvcnQoKVwiIFxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiPlxuICAgICAgICAgICAgICA8bmctY29udGFpbmVyICAqbmdUZW1wbGF0ZU91dGxldD1cImNvbHVtblRpdGxlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgIDxjbHItaWNvblxuICAgICAgICAgICAgICAgICAgICAgICpuZ0lmPVwic29ydEljb25cIlxuICAgICAgICAgICAgICAgICAgICAgIFthdHRyLnNoYXBlXT1cInNvcnRJY29uXCJcbiAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInNvcnQtaWNvblwiPjwvY2xyLWljb24+XG4gICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImRhdGFncmlkLWNvbHVtbi10aXRsZVwiICpuZ0lmPVwiIXNvcnRhYmxlXCI+XG4gICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJjb2x1bW5UaXRsZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgIDwvc3Bhbj5cblxuICAgICAgICAgIDxjbHItZGctY29sdW1uLXNlcGFyYXRvcj48L2Nsci1kZy1jb2x1bW4tc2VwYXJhdG9yPlxuICAgICAgPC9kaXY+XG4gIGAsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmRhdGFncmlkLWNvbHVtbl0nOiAndHJ1ZScsXG4gICAgJ1thdHRyLmFyaWEtc29ydF0nOiAnYXJpYVNvcnQnLFxuICAgIHJvbGU6ICdjb2x1bW5oZWFkZXInLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBDbHJEYXRhZ3JpZENvbHVtbjxUID0gYW55PiBleHRlbmRzIERhdGFncmlkRmlsdGVyUmVnaXN0cmFyPFQsIERhdGFncmlkU3RyaW5nRmlsdGVySW1wbDxUPj5cbiAgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uSW5pdCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX3NvcnQ6IFNvcnQ8VD4sXG4gICAgZmlsdGVyczogRmlsdGVyc1Byb3ZpZGVyPFQ+LFxuICAgIHByaXZhdGUgdmNyOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIHB1YmxpYyBjb21tb25TdHJpbmdzOiBDbHJDb21tb25TdHJpbmdzXG4gICkge1xuICAgIHN1cGVyKGZpbHRlcnMpO1xuICAgIHRoaXMuX3NvcnRTdWJzY3JpcHRpb24gPSBfc29ydC5jaGFuZ2Uuc3Vic2NyaWJlKHNvcnQgPT4ge1xuICAgICAgLy8gV2UncmUgb25seSBsaXN0ZW5pbmcgdG8gbWFrZSBzdXJlIHdlIGVtaXQgYW4gZXZlbnQgd2hlbiB0aGUgY29sdW1uIGdvZXMgZnJvbSBzb3J0ZWQgdG8gdW5zb3J0ZWRcbiAgICAgIGlmICh0aGlzLnNvcnRPcmRlciAhPT0gQ2xyRGF0YWdyaWRTb3J0T3JkZXIuVU5TT1JURUQgJiYgc29ydC5jb21wYXJhdG9yICE9PSB0aGlzLl9zb3J0QnkpIHtcbiAgICAgICAgdGhpcy5fc29ydE9yZGVyID0gQ2xyRGF0YWdyaWRTb3J0T3JkZXIuVU5TT1JURUQ7XG4gICAgICAgIHRoaXMuc29ydE9yZGVyQ2hhbmdlLmVtaXQodGhpcy5fc29ydE9yZGVyKTtcbiAgICAgICAgLy8gcmVtb3ZlcyB0aGUgc29ydEljb24gd2hlbiBjb2x1bW4gYmVjb21lcyB1bnNvcnRlZFxuICAgICAgICB0aGlzLnNvcnRJY29uID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIC8vIGRlcHJlY2F0ZWQ6IHRvIGJlIHJlbW92ZWQgLSBTVEFSVFxuICAgICAgaWYgKHRoaXMuc29ydGVkICYmIHNvcnQuY29tcGFyYXRvciAhPT0gdGhpcy5fc29ydEJ5KSB7XG4gICAgICAgIHRoaXMuX3NvcnRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNvcnRlZENoYW5nZS5lbWl0KGZhbHNlKTtcbiAgICAgIH1cbiAgICAgIC8vIGRlcHJlY2F0ZWQ6IHRvIGJlIHJlbW92ZWQgLSBFTkRcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdWJzY3JpcHRpb24gdG8gdGhlIHNvcnQgc2VydmljZSBjaGFuZ2VzXG4gICAqL1xuICBwcml2YXRlIF9zb3J0U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fc29ydFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgLypcbiAgICAgKiBTaW1wbGUgb2JqZWN0IHByb3BlcnR5IHNob3J0Y3V0LCBhY3RpdmF0ZXMgYm90aCBzb3J0aW5nIGFuZCBmaWx0ZXJpbmdcbiAgICAgKiBiYXNlZCBvbiBuYXRpdmUgY29tcGFyaXNvbiBvZiB0aGUgc3BlY2lmaWVkIHByb3BlcnR5IG9uIHRoZSBpdGVtcy5cbiAgICAgKi9cbiAgcHJpdmF0ZSBfZmllbGQ6IHN0cmluZztcbiAgcHVibGljIGdldCBmaWVsZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fZmllbGQ7XG4gIH1cblxuICBASW5wdXQoJ2NsckRnRmllbGQnKVxuICBwdWJsaWMgc2V0IGZpZWxkKGZpZWxkOiBzdHJpbmcpIHtcbiAgICBpZiAodHlwZW9mIGZpZWxkID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5fZmllbGQgPSBmaWVsZDtcbiAgICAgIGlmICghdGhpcy5jdXN0b21GaWx0ZXIpIHtcbiAgICAgICAgdGhpcy5zZXRGaWx0ZXIobmV3IERhdGFncmlkU3RyaW5nRmlsdGVySW1wbChuZXcgRGF0YWdyaWRQcm9wZXJ0eVN0cmluZ0ZpbHRlcihmaWVsZCkpKTtcbiAgICAgIH1cbiAgICAgIGlmICghdGhpcy5fc29ydEJ5KSB7XG4gICAgICAgIHRoaXMuX3NvcnRCeSA9IG5ldyBEYXRhZ3JpZFByb3BlcnR5Q29tcGFyYXRvcihmaWVsZCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENsckRhdGFncmlkQ29tcGFyYXRvckludGVyZmFjZSB0byB1c2Ugd2hlbiBzb3J0aW5nIHRoZSBjb2x1bW5cbiAgICovXG5cbiAgcHJpdmF0ZSBfc29ydEJ5OiBDbHJEYXRhZ3JpZENvbXBhcmF0b3JJbnRlcmZhY2U8VD47XG5cbiAgcHVibGljIGdldCBzb3J0QnkoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3NvcnRCeTtcbiAgfVxuXG4gIEBJbnB1dCgnY2xyRGdTb3J0QnknKVxuICBwdWJsaWMgc2V0IHNvcnRCeShjb21wYXJhdG9yOiBDbHJEYXRhZ3JpZENvbXBhcmF0b3JJbnRlcmZhY2U8VD4gfCBzdHJpbmcpIHtcbiAgICBpZiAodHlwZW9mIGNvbXBhcmF0b3IgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLl9zb3J0QnkgPSBuZXcgRGF0YWdyaWRQcm9wZXJ0eUNvbXBhcmF0b3IoY29tcGFyYXRvcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChjb21wYXJhdG9yKSB7XG4gICAgICAgIHRoaXMuX3NvcnRCeSA9IGNvbXBhcmF0b3I7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGhpcy5fZmllbGQpIHtcbiAgICAgICAgICB0aGlzLl9zb3J0QnkgPSBuZXcgRGF0YWdyaWRQcm9wZXJ0eUNvbXBhcmF0b3IodGhpcy5fZmllbGQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRlbGV0ZSB0aGlzLl9zb3J0Qnk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSW5kaWNhdGVzIGlmIHRoZSBjb2x1bW4gaXMgc29ydGFibGVcbiAgICovXG4gIHB1YmxpYyBnZXQgc29ydGFibGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy5fc29ydEJ5O1xuICB9XG5cbiAgLy8gZGVwcmVjYXRlZDogdG8gYmUgcmVtb3ZlZCAtIFNUQVJUXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgaWYgdGhlIGNvbHVtbiBpcyBjdXJyZW50bHkgc29ydGVkXG4gICAqXG4gICAqIEBkZXByZWNhdGVkIFRoaXMgd2lsbCBiZSByZW1vdmVkIHNvb24sIGluIGZhdm9yIG9mIHRoZSBzb3J0T3JkZXIgbWVjaGFuaXNtXG4gICAqL1xuICBwcml2YXRlIF9zb3J0ZWQgPSBmYWxzZTtcbiAgcHVibGljIGdldCBzb3J0ZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3NvcnRlZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBUaGlzIHdpbGwgYmUgcmVtb3ZlZCBzb29uLCBpbiBmYXZvciBvZiB0aGUgc29ydE9yZGVyIG1lY2hhbmlzbVxuICAgKi9cbiAgQElucHV0KCdjbHJEZ1NvcnRlZCcpXG4gIHB1YmxpYyBzZXQgc29ydGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgaWYgKCF2YWx1ZSAmJiB0aGlzLnNvcnRlZCkge1xuICAgICAgdGhpcy5fc29ydGVkID0gZmFsc2U7XG4gICAgICB0aGlzLl9zb3J0LmNsZWFyKCk7XG4gICAgfSBlbHNlIGlmICh2YWx1ZSAmJiAhdGhpcy5zb3J0ZWQpIHtcbiAgICAgIHRoaXMuc29ydCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBUaGlzIHdpbGwgYmUgcmVtb3ZlZCBzb29uLCBpbiBmYXZvciBvZiB0aGUgc29ydE9yZGVyIG1lY2hhbmlzbVxuICAgKi9cbiAgQE91dHB1dCgnY2xyRGdTb3J0ZWRDaGFuZ2UnKSBwdWJsaWMgc29ydGVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gIC8vIGRlcHJlY2F0ZWQ6IHRvIGJlIHJlbW92ZWQgLSBFTkRcblxuICAvKipcbiAgICogSW5kaWNhdGVzIGhvdyB0aGUgY29sdW1uIGlzIGN1cnJlbnRseSBzb3J0ZWRcbiAgICovXG4gIHByaXZhdGUgX3NvcnRPcmRlcjogQ2xyRGF0YWdyaWRTb3J0T3JkZXIgPSBDbHJEYXRhZ3JpZFNvcnRPcmRlci5VTlNPUlRFRDtcbiAgcHVibGljIGdldCBzb3J0T3JkZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3NvcnRPcmRlcjtcbiAgfVxuXG4gIEBJbnB1dCgnY2xyRGdTb3J0T3JkZXInKVxuICBwdWJsaWMgc2V0IHNvcnRPcmRlcih2YWx1ZTogQ2xyRGF0YWdyaWRTb3J0T3JkZXIpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIG9ubHkgaWYgdGhlIGluY29taW5nIG9yZGVyIGlzIGRpZmZlcmVudCBmcm9tIHRoZSBjdXJyZW50IG9uZVxuICAgIGlmICh0aGlzLl9zb3J0T3JkZXIgPT09IHZhbHVlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc3dpdGNoICh2YWx1ZSkge1xuICAgICAgLy8gdGhlIFVuc29ydGVkIGNhc2UgaGFwcGVucyB3aGVuIHRoZSBjdXJyZW50IHN0YXRlIGlzIGVpdGhlciBBc2Mgb3IgRGVzY1xuICAgICAgZGVmYXVsdDpcbiAgICAgIGNhc2UgQ2xyRGF0YWdyaWRTb3J0T3JkZXIuVU5TT1JURUQ6XG4gICAgICAgIHRoaXMuX3NvcnQuY2xlYXIoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIENsckRhdGFncmlkU29ydE9yZGVyLkFTQzpcbiAgICAgICAgdGhpcy5zb3J0KGZhbHNlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIENsckRhdGFncmlkU29ydE9yZGVyLkRFU0M6XG4gICAgICAgIHRoaXMuc29ydCh0cnVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldCBhcmlhU29ydCgpIHtcbiAgICBzd2l0Y2ggKHRoaXMuX3NvcnRPcmRlcikge1xuICAgICAgZGVmYXVsdDpcbiAgICAgIGNhc2UgQ2xyRGF0YWdyaWRTb3J0T3JkZXIuVU5TT1JURUQ6XG4gICAgICAgIHJldHVybiAnbm9uZSc7XG4gICAgICBjYXNlIENsckRhdGFncmlkU29ydE9yZGVyLkFTQzpcbiAgICAgICAgcmV0dXJuICdhc2NlbmRpbmcnO1xuICAgICAgY2FzZSBDbHJEYXRhZ3JpZFNvcnRPcmRlci5ERVNDOlxuICAgICAgICByZXR1cm4gJ2Rlc2NlbmRpbmcnO1xuICAgIH1cbiAgfVxuXG4gIEBPdXRwdXQoJ2NsckRnU29ydE9yZGVyQ2hhbmdlJykgcHVibGljIHNvcnRPcmRlckNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Q2xyRGF0YWdyaWRTb3J0T3JkZXI+KCk7XG5cbiAgLyoqXG4gICAqIFNvcnRzIHRoZSBkYXRhZ3JpZCBiYXNlZCBvbiB0aGlzIGNvbHVtblxuICAgKi9cbiAgcHVibGljIHNvcnQocmV2ZXJzZT86IGJvb2xlYW4pIHtcbiAgICBpZiAoIXRoaXMuc29ydGFibGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl9zb3J0LnRvZ2dsZSh0aGlzLl9zb3J0QnksIHJldmVyc2UpO1xuXG4gICAgLy8gc2V0dGluZyB0aGUgcHJpdmF0ZSB2YXJpYWJsZSB0byBub3QgcmV0cmlnZ2VyIHRoZSBzZXR0ZXIgbG9naWNcbiAgICB0aGlzLl9zb3J0T3JkZXIgPSB0aGlzLl9zb3J0LnJldmVyc2UgPyBDbHJEYXRhZ3JpZFNvcnRPcmRlci5ERVNDIDogQ2xyRGF0YWdyaWRTb3J0T3JkZXIuQVNDO1xuICAgIC8vIFNldHMgdGhlIGNvcnJlY3QgaWNvbiBmb3IgY3VycmVudCBzb3J0IG9yZGVyXG4gICAgdGhpcy5zb3J0SWNvbiA9IHRoaXMuX3NvcnRPcmRlciA9PT0gQ2xyRGF0YWdyaWRTb3J0T3JkZXIuREVTQyA/ICdhcnJvdyBkb3duJyA6ICdhcnJvdyc7XG4gICAgdGhpcy5zb3J0T3JkZXJDaGFuZ2UuZW1pdCh0aGlzLl9zb3J0T3JkZXIpO1xuXG4gICAgLy8gZGVwcmVjYXRlZDogdG8gYmUgcmVtb3ZlZCAtIFNUQVJUXG4gICAgdGhpcy5fc29ydGVkID0gdHJ1ZTtcbiAgICB0aGlzLnNvcnRlZENoYW5nZS5lbWl0KHRydWUpO1xuICAgIC8vIGRlcHJlY2F0ZWQ6IHRvIGJlIHJlbW92ZWQgLSBFTkRcbiAgfVxuXG4gIHB1YmxpYyBzb3J0SWNvbjtcblxuICAvKipcbiAgICogQSBjdXN0b20gZmlsdGVyIGZvciB0aGlzIGNvbHVtbiB0aGF0IGNhbiBiZSBwcm92aWRlZCBpbiB0aGUgcHJvamVjdGVkIGNvbnRlbnRcbiAgICovXG4gIHB1YmxpYyBjdXN0b21GaWx0ZXIgPSBmYWxzZTtcblxuICBAQ29udGVudENoaWxkKEN1c3RvbUZpbHRlciwgeyBzdGF0aWM6IGZhbHNlIH0pXG4gIHB1YmxpYyBzZXQgcHJvamVjdGVkRmlsdGVyKGN1c3RvbTogYW55KSB7XG4gICAgaWYgKGN1c3RvbSkge1xuICAgICAgdGhpcy5kZWxldGVGaWx0ZXIoKTtcbiAgICAgIHRoaXMuY3VzdG9tRmlsdGVyID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0IGZpbHRlclZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLmZpbHRlci52YWx1ZTtcbiAgfVxuXG4gIEBJbnB1dCgnY2xyRmlsdGVyVmFsdWUnKVxuICBwdWJsaWMgc2V0IHVwZGF0ZUZpbHRlclZhbHVlKG5ld1ZhbHVlOiBzdHJpbmcpIHtcbiAgICBpZiAoIXRoaXMuZmlsdGVyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghbmV3VmFsdWUpIHtcbiAgICAgIG5ld1ZhbHVlID0gJyc7XG4gICAgfVxuICAgIGlmIChuZXdWYWx1ZSAhPT0gdGhpcy5maWx0ZXIudmFsdWUpIHtcbiAgICAgIHRoaXMuZmlsdGVyLnZhbHVlID0gbmV3VmFsdWU7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNldCBmaWx0ZXJWYWx1ZShuZXdWYWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy51cGRhdGVGaWx0ZXJWYWx1ZSA9IG5ld1ZhbHVlO1xuICAgIHRoaXMuZmlsdGVyVmFsdWVDaGFuZ2UuZW1pdCh0aGlzLmZpbHRlci52YWx1ZSk7XG4gIH1cblxuICBAT3V0cHV0KCdjbHJGaWx0ZXJWYWx1ZUNoYW5nZScpIGZpbHRlclZhbHVlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHByaXZhdGUgd3JhcHBlZEluamVjdG9yOiBJbmplY3RvcjtcblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLndyYXBwZWRJbmplY3RvciA9IG5ldyBIb3N0V3JhcHBlcihXcmFwcGVkQ29sdW1uLCB0aGlzLnZjcik7XG4gIH1cblxuICBwdWJsaWMgZ2V0IF92aWV3KCkge1xuICAgIHJldHVybiB0aGlzLndyYXBwZWRJbmplY3Rvci5nZXQoV3JhcHBlZENvbHVtbiwgdGhpcy52Y3IpLmNvbHVtblZpZXc7XG4gIH1cbn1cbiJdfQ==