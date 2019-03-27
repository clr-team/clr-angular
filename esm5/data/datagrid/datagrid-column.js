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
/** @type {?} */
var nbCount = 0;
/**
 * @template T
 */
var ClrDatagridColumn = /** @class */ (function (_super) {
    tslib_1.__extends(ClrDatagridColumn, _super);
    function ClrDatagridColumn(_sort, filters, vcr) {
        var _this = _super.call(this, filters) || this;
        _this._sort = _sort;
        _this.vcr = vcr;
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
        _this.columnId = 'dg-col-' + nbCount.toString(); // Approximate a GUID
        nbCount++;
        return _this;
    }
    Object.defineProperty(ClrDatagridColumn.prototype, "hidden", {
        /**
         * @property hidden
         *
         * @description
         * A property that allows the column to be hidden / shown with css
         * Note the default allows the ClrDatagridColumn to have an *ngIf on it. (EHCAIWC - will occur if its not
         * initialized)
         *
         * @default false
         *
         */
        get: /**
         * \@property hidden
         *
         * \@description
         * A property that allows the column to be hidden / shown with css
         * Note the default allows the ClrDatagridColumn to have an *ngIf on it. (EHCAIWC - will occur if its not
         * initialized)
         *
         * \@default false
         *
         * @return {?}
         */
        function () {
            return !!this.hideable && this.hideable.hidden;
        },
        enumerable: true,
        configurable: true
    });
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
                    template: "\n      <div class=\"datagrid-column-flex\">\n          <!-- I'm really not happy with that select since it's not very scalable -->\n          <ng-content select=\"clr-dg-filter, clr-dg-string-filter\"></ng-content>\n\n          <clr-dg-string-filter\n                  *ngIf=\"field && !customFilter\"\n                  [clrDgStringFilter]=\"registered\"\n                  [(clrFilterValue)]=\"filterValue\"></clr-dg-string-filter>\n\n          <ng-template #columnTitle>\n              <ng-content></ng-content>\n          </ng-template>\n\n          <button class=\"datagrid-column-title\" *ngIf=\"sortable\" (click)=\"sort()\" type=\"button\">\n              <ng-container *ngTemplateOutlet=\"columnTitle\"></ng-container>\n              <clr-icon\n                      *ngIf=\"sortIcon\"\n                      [attr.shape]=\"sortIcon\"\n                      class=\"sort-icon\"></clr-icon>\n          </button>\n\n          <span class=\"datagrid-column-title\" *ngIf=\"!sortable\">\n               <ng-container *ngTemplateOutlet=\"columnTitle\"></ng-container>\n            </span>\n\n          <clr-dg-column-separator></clr-dg-column-separator>\n      </div>\n  ",
                    host: {
                        '[class.datagrid-column]': 'true',
                        '[class.datagrid-column--hidden]': 'hidden',
                        '[attr.aria-sort]': 'ariaSort',
                        role: 'columnheader',
                    }
                }] }
    ];
    /** @nocollapse */
    ClrDatagridColumn.ctorParameters = function () { return [
        { type: Sort },
        { type: FiltersProvider },
        { type: ViewContainerRef }
    ]; };
    ClrDatagridColumn.propDecorators = {
        field: [{ type: Input, args: ['clrDgField',] }],
        sortBy: [{ type: Input, args: ['clrDgSortBy',] }],
        sorted: [{ type: Input, args: ['clrDgSorted',] }],
        sortedChange: [{ type: Output, args: ['clrDgSortedChange',] }],
        sortOrder: [{ type: Input, args: ['clrDgSortOrder',] }],
        sortOrderChange: [{ type: Output, args: ['clrDgSortOrderChange',] }],
        projectedFilter: [{ type: ContentChild, args: [CustomFilter,] }],
        updateFilterValue: [{ type: Input, args: ['clrFilterValue',] }],
        filterValueChange: [{ type: Output, args: ['clrFilterValueChange',] }]
    };
    return ClrDatagridColumn;
}(DatagridFilterRegistrar));
export { ClrDatagridColumn };
if (false) {
    /**
     * \@property columnId
     *
     * \@description
     * A ClrDatagridColumn class variable that holds the number of ClrDatagridColumn instances for a Datagrid.
     * It is used to generate a unique id for the ClrDatagridColumn instance.
     *
     * @type {?}
     */
    ClrDatagridColumn.prototype.columnId;
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
     * ********
     *
     * \@property hideable
     *
     * \@description
     * When a column is hideable this is defined with an instance of DatagridHideableColumnModel.
     * When its not hideable should be undefined.
     *
     * @type {?}
     */
    ClrDatagridColumn.prototype.hideable;
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtY29sdW1uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9kYXRhZ3JpZC1jb2x1bW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUtBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLFlBQVksRUFFWixLQUFLLEVBR0wsTUFBTSxFQUNOLGdCQUFnQixHQUNqQixNQUFNLGVBQWUsQ0FBQztBQUd2QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDckUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0scURBQXFELENBQUM7QUFDakcsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFDbEcsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFFMUYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFL0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDeEMsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDNUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDOztJQUU3QyxPQUFPLEdBQVcsQ0FBQzs7OztBQUV2QjtJQXNDZ0QsNkNBQXVEO0lBRXJHLDJCQUFvQixLQUFjLEVBQUUsT0FBMkIsRUFBVSxHQUFxQjtRQUE5RixZQUNFLGtCQUFNLE9BQU8sQ0FBQyxTQW1CZjtRQXBCbUIsV0FBSyxHQUFMLEtBQUssQ0FBUztRQUF1QyxTQUFHLEdBQUgsR0FBRyxDQUFrQjs7Ozs7OztRQXNIdEYsYUFBTyxHQUFHLEtBQUssQ0FBQzs7OztRQXFC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dCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQge1xuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZCxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbmplY3RvcixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFZpZXdDb250YWluZXJSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IEhvc3RXcmFwcGVyIH0gZnJvbSAnLi4vLi4vdXRpbHMvaG9zdC13cmFwcGluZy9ob3N0LXdyYXBwZXInO1xuaW1wb3J0IHsgRGF0YWdyaWRQcm9wZXJ0eUNvbXBhcmF0b3IgfSBmcm9tICcuL2J1aWx0LWluL2NvbXBhcmF0b3JzL2RhdGFncmlkLXByb3BlcnR5LWNvbXBhcmF0b3InO1xuaW1wb3J0IHsgRGF0YWdyaWRQcm9wZXJ0eVN0cmluZ0ZpbHRlciB9IGZyb20gJy4vYnVpbHQtaW4vZmlsdGVycy9kYXRhZ3JpZC1wcm9wZXJ0eS1zdHJpbmctZmlsdGVyJztcbmltcG9ydCB7IERhdGFncmlkU3RyaW5nRmlsdGVySW1wbCB9IGZyb20gJy4vYnVpbHQtaW4vZmlsdGVycy9kYXRhZ3JpZC1zdHJpbmctZmlsdGVyLWltcGwnO1xuaW1wb3J0IHsgRGF0YWdyaWRIaWRlYWJsZUNvbHVtbk1vZGVsIH0gZnJvbSAnLi9kYXRhZ3JpZC1oaWRlYWJsZS1jb2x1bW4ubW9kZWwnO1xuaW1wb3J0IHsgQ2xyRGF0YWdyaWRTb3J0T3JkZXIgfSBmcm9tICcuL2VudW1zL3NvcnQtb3JkZXIuZW51bSc7XG5pbXBvcnQgeyBDbHJEYXRhZ3JpZENvbXBhcmF0b3JJbnRlcmZhY2UgfSBmcm9tICcuL2ludGVyZmFjZXMvY29tcGFyYXRvci5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQ3VzdG9tRmlsdGVyIH0gZnJvbSAnLi9wcm92aWRlcnMvY3VzdG9tLWZpbHRlcic7XG5pbXBvcnQgeyBGaWx0ZXJzUHJvdmlkZXIgfSBmcm9tICcuL3Byb3ZpZGVycy9maWx0ZXJzJztcbmltcG9ydCB7IFNvcnQgfSBmcm9tICcuL3Byb3ZpZGVycy9zb3J0JztcbmltcG9ydCB7IERhdGFncmlkRmlsdGVyUmVnaXN0cmFyIH0gZnJvbSAnLi91dGlscy9kYXRhZ3JpZC1maWx0ZXItcmVnaXN0cmFyJztcbmltcG9ydCB7IFdyYXBwZWRDb2x1bW4gfSBmcm9tICcuL3dyYXBwZWQtY29sdW1uJztcblxubGV0IG5iQ291bnQ6IG51bWJlciA9IDA7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci1kZy1jb2x1bW4nLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgPGRpdiBjbGFzcz1cImRhdGFncmlkLWNvbHVtbi1mbGV4XCI+XG4gICAgICAgICAgPCEtLSBJJ20gcmVhbGx5IG5vdCBoYXBweSB3aXRoIHRoYXQgc2VsZWN0IHNpbmNlIGl0J3Mgbm90IHZlcnkgc2NhbGFibGUgLS0+XG4gICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiY2xyLWRnLWZpbHRlciwgY2xyLWRnLXN0cmluZy1maWx0ZXJcIj48L25nLWNvbnRlbnQ+XG5cbiAgICAgICAgICA8Y2xyLWRnLXN0cmluZy1maWx0ZXJcbiAgICAgICAgICAgICAgICAgICpuZ0lmPVwiZmllbGQgJiYgIWN1c3RvbUZpbHRlclwiXG4gICAgICAgICAgICAgICAgICBbY2xyRGdTdHJpbmdGaWx0ZXJdPVwicmVnaXN0ZXJlZFwiXG4gICAgICAgICAgICAgICAgICBbKGNsckZpbHRlclZhbHVlKV09XCJmaWx0ZXJWYWx1ZVwiPjwvY2xyLWRnLXN0cmluZy1maWx0ZXI+XG5cbiAgICAgICAgICA8bmctdGVtcGxhdGUgI2NvbHVtblRpdGxlPlxuICAgICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJkYXRhZ3JpZC1jb2x1bW4tdGl0bGVcIiAqbmdJZj1cInNvcnRhYmxlXCIgKGNsaWNrKT1cInNvcnQoKVwiIHR5cGU9XCJidXR0b25cIj5cbiAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImNvbHVtblRpdGxlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgIDxjbHItaWNvblxuICAgICAgICAgICAgICAgICAgICAgICpuZ0lmPVwic29ydEljb25cIlxuICAgICAgICAgICAgICAgICAgICAgIFthdHRyLnNoYXBlXT1cInNvcnRJY29uXCJcbiAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInNvcnQtaWNvblwiPjwvY2xyLWljb24+XG4gICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImRhdGFncmlkLWNvbHVtbi10aXRsZVwiICpuZ0lmPVwiIXNvcnRhYmxlXCI+XG4gICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiY29sdW1uVGl0bGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDwvc3Bhbj5cblxuICAgICAgICAgIDxjbHItZGctY29sdW1uLXNlcGFyYXRvcj48L2Nsci1kZy1jb2x1bW4tc2VwYXJhdG9yPlxuICAgICAgPC9kaXY+XG4gIGAsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmRhdGFncmlkLWNvbHVtbl0nOiAndHJ1ZScsXG4gICAgJ1tjbGFzcy5kYXRhZ3JpZC1jb2x1bW4tLWhpZGRlbl0nOiAnaGlkZGVuJyxcbiAgICAnW2F0dHIuYXJpYS1zb3J0XSc6ICdhcmlhU29ydCcsXG4gICAgcm9sZTogJ2NvbHVtbmhlYWRlcicsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIENsckRhdGFncmlkQ29sdW1uPFQgPSBhbnk+IGV4dGVuZHMgRGF0YWdyaWRGaWx0ZXJSZWdpc3RyYXI8VCwgRGF0YWdyaWRTdHJpbmdGaWx0ZXJJbXBsPFQ+PlxuICBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25Jbml0IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfc29ydDogU29ydDxUPiwgZmlsdGVyczogRmlsdGVyc1Byb3ZpZGVyPFQ+LCBwcml2YXRlIHZjcjogVmlld0NvbnRhaW5lclJlZikge1xuICAgIHN1cGVyKGZpbHRlcnMpO1xuICAgIHRoaXMuX3NvcnRTdWJzY3JpcHRpb24gPSBfc29ydC5jaGFuZ2Uuc3Vic2NyaWJlKHNvcnQgPT4ge1xuICAgICAgLy8gV2UncmUgb25seSBsaXN0ZW5pbmcgdG8gbWFrZSBzdXJlIHdlIGVtaXQgYW4gZXZlbnQgd2hlbiB0aGUgY29sdW1uIGdvZXMgZnJvbSBzb3J0ZWQgdG8gdW5zb3J0ZWRcbiAgICAgIGlmICh0aGlzLnNvcnRPcmRlciAhPT0gQ2xyRGF0YWdyaWRTb3J0T3JkZXIuVU5TT1JURUQgJiYgc29ydC5jb21wYXJhdG9yICE9PSB0aGlzLl9zb3J0QnkpIHtcbiAgICAgICAgdGhpcy5fc29ydE9yZGVyID0gQ2xyRGF0YWdyaWRTb3J0T3JkZXIuVU5TT1JURUQ7XG4gICAgICAgIHRoaXMuc29ydE9yZGVyQ2hhbmdlLmVtaXQodGhpcy5fc29ydE9yZGVyKTtcbiAgICAgICAgLy8gcmVtb3ZlcyB0aGUgc29ydEljb24gd2hlbiBjb2x1bW4gYmVjb21lcyB1bnNvcnRlZFxuICAgICAgICB0aGlzLnNvcnRJY29uID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIC8vIGRlcHJlY2F0ZWQ6IHRvIGJlIHJlbW92ZWQgLSBTVEFSVFxuICAgICAgaWYgKHRoaXMuc29ydGVkICYmIHNvcnQuY29tcGFyYXRvciAhPT0gdGhpcy5fc29ydEJ5KSB7XG4gICAgICAgIHRoaXMuX3NvcnRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNvcnRlZENoYW5nZS5lbWl0KGZhbHNlKTtcbiAgICAgIH1cbiAgICAgIC8vIGRlcHJlY2F0ZWQ6IHRvIGJlIHJlbW92ZWQgLSBFTkRcbiAgICB9KTtcblxuICAgIHRoaXMuY29sdW1uSWQgPSAnZGctY29sLScgKyBuYkNvdW50LnRvU3RyaW5nKCk7IC8vIEFwcHJveGltYXRlIGEgR1VJRFxuICAgIG5iQ291bnQrKztcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJvcGVydHkgY29sdW1uSWRcbiAgICpcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIEEgQ2xyRGF0YWdyaWRDb2x1bW4gY2xhc3MgdmFyaWFibGUgdGhhdCBob2xkcyB0aGUgbnVtYmVyIG9mIENsckRhdGFncmlkQ29sdW1uIGluc3RhbmNlcyBmb3IgYSBEYXRhZ3JpZC5cbiAgICogSXQgaXMgdXNlZCB0byBnZW5lcmF0ZSBhIHVuaXF1ZSBpZCBmb3IgdGhlIENsckRhdGFncmlkQ29sdW1uIGluc3RhbmNlLlxuICAgKlxuICAgKi9cbiAgcHVibGljIGNvbHVtbklkOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEBwcm9wZXJ0eSBoaWRkZW5cbiAgICpcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIEEgcHJvcGVydHkgdGhhdCBhbGxvd3MgdGhlIGNvbHVtbiB0byBiZSBoaWRkZW4gLyBzaG93biB3aXRoIGNzc1xuICAgKiBOb3RlIHRoZSBkZWZhdWx0IGFsbG93cyB0aGUgQ2xyRGF0YWdyaWRDb2x1bW4gdG8gaGF2ZSBhbiAqbmdJZiBvbiBpdC4gKEVIQ0FJV0MgLSB3aWxsIG9jY3VyIGlmIGl0cyBub3RcbiAgICogaW5pdGlhbGl6ZWQpXG4gICAqXG4gICAqIEBkZWZhdWx0IGZhbHNlXG4gICAqXG4gICAqL1xuICBwdWJsaWMgZ2V0IGhpZGRlbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISF0aGlzLmhpZGVhYmxlICYmIHRoaXMuaGlkZWFibGUuaGlkZGVuO1xuICB9XG5cbiAgLyoqXG4gICAqIFN1YnNjcmlwdGlvbiB0byB0aGUgc29ydCBzZXJ2aWNlIGNoYW5nZXNcbiAgICovXG4gIHByaXZhdGUgX3NvcnRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9zb3J0U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICAvKlxuICAgICAqIFNpbXBsZSBvYmplY3QgcHJvcGVydHkgc2hvcnRjdXQsIGFjdGl2YXRlcyBib3RoIHNvcnRpbmcgYW5kIGZpbHRlcmluZ1xuICAgICAqIGJhc2VkIG9uIG5hdGl2ZSBjb21wYXJpc29uIG9mIHRoZSBzcGVjaWZpZWQgcHJvcGVydHkgb24gdGhlIGl0ZW1zLlxuICAgICAqL1xuICBwcml2YXRlIF9maWVsZDogc3RyaW5nO1xuICBwdWJsaWMgZ2V0IGZpZWxkKCkge1xuICAgIHJldHVybiB0aGlzLl9maWVsZDtcbiAgfVxuXG4gIEBJbnB1dCgnY2xyRGdGaWVsZCcpXG4gIHB1YmxpYyBzZXQgZmllbGQoZmllbGQ6IHN0cmluZykge1xuICAgIGlmICh0eXBlb2YgZmllbGQgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLl9maWVsZCA9IGZpZWxkO1xuICAgICAgaWYgKCF0aGlzLmN1c3RvbUZpbHRlcikge1xuICAgICAgICB0aGlzLnNldEZpbHRlcihuZXcgRGF0YWdyaWRTdHJpbmdGaWx0ZXJJbXBsKG5ldyBEYXRhZ3JpZFByb3BlcnR5U3RyaW5nRmlsdGVyKGZpZWxkKSkpO1xuICAgICAgfVxuICAgICAgaWYgKCF0aGlzLl9zb3J0QnkpIHtcbiAgICAgICAgdGhpcy5fc29ydEJ5ID0gbmV3IERhdGFncmlkUHJvcGVydHlDb21wYXJhdG9yKGZpZWxkKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2xyRGF0YWdyaWRDb21wYXJhdG9ySW50ZXJmYWNlIHRvIHVzZSB3aGVuIHNvcnRpbmcgdGhlIGNvbHVtblxuICAgKi9cblxuICBwcml2YXRlIF9zb3J0Qnk6IENsckRhdGFncmlkQ29tcGFyYXRvckludGVyZmFjZTxUPjtcblxuICBwdWJsaWMgZ2V0IHNvcnRCeSgpIHtcbiAgICByZXR1cm4gdGhpcy5fc29ydEJ5O1xuICB9XG5cbiAgQElucHV0KCdjbHJEZ1NvcnRCeScpXG4gIHB1YmxpYyBzZXQgc29ydEJ5KGNvbXBhcmF0b3I6IENsckRhdGFncmlkQ29tcGFyYXRvckludGVyZmFjZTxUPiB8IHN0cmluZykge1xuICAgIGlmICh0eXBlb2YgY29tcGFyYXRvciA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMuX3NvcnRCeSA9IG5ldyBEYXRhZ3JpZFByb3BlcnR5Q29tcGFyYXRvcihjb21wYXJhdG9yKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGNvbXBhcmF0b3IpIHtcbiAgICAgICAgdGhpcy5fc29ydEJ5ID0gY29tcGFyYXRvcjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLl9maWVsZCkge1xuICAgICAgICAgIHRoaXMuX3NvcnRCeSA9IG5ldyBEYXRhZ3JpZFByb3BlcnR5Q29tcGFyYXRvcih0aGlzLl9maWVsZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGVsZXRlIHRoaXMuX3NvcnRCeTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgaWYgdGhlIGNvbHVtbiBpcyBzb3J0YWJsZVxuICAgKi9cbiAgcHVibGljIGdldCBzb3J0YWJsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISF0aGlzLl9zb3J0Qnk7XG4gIH1cblxuICAvLyBkZXByZWNhdGVkOiB0byBiZSByZW1vdmVkIC0gU1RBUlRcbiAgLyoqXG4gICAqIEluZGljYXRlcyBpZiB0aGUgY29sdW1uIGlzIGN1cnJlbnRseSBzb3J0ZWRcbiAgICpcbiAgICogQGRlcHJlY2F0ZWQgVGhpcyB3aWxsIGJlIHJlbW92ZWQgc29vbiwgaW4gZmF2b3Igb2YgdGhlIHNvcnRPcmRlciBtZWNoYW5pc21cbiAgICovXG4gIHByaXZhdGUgX3NvcnRlZCA9IGZhbHNlO1xuICBwdWJsaWMgZ2V0IHNvcnRlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fc29ydGVkO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIFRoaXMgd2lsbCBiZSByZW1vdmVkIHNvb24sIGluIGZhdm9yIG9mIHRoZSBzb3J0T3JkZXIgbWVjaGFuaXNtXG4gICAqL1xuICBASW5wdXQoJ2NsckRnU29ydGVkJylcbiAgcHVibGljIHNldCBzb3J0ZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICBpZiAoIXZhbHVlICYmIHRoaXMuc29ydGVkKSB7XG4gICAgICB0aGlzLl9zb3J0ZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuX3NvcnQuY2xlYXIoKTtcbiAgICB9IGVsc2UgaWYgKHZhbHVlICYmICF0aGlzLnNvcnRlZCkge1xuICAgICAgdGhpcy5zb3J0KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIFRoaXMgd2lsbCBiZSByZW1vdmVkIHNvb24sIGluIGZhdm9yIG9mIHRoZSBzb3J0T3JkZXIgbWVjaGFuaXNtXG4gICAqL1xuICBAT3V0cHV0KCdjbHJEZ1NvcnRlZENoYW5nZScpIHB1YmxpYyBzb3J0ZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgLy8gZGVwcmVjYXRlZDogdG8gYmUgcmVtb3ZlZCAtIEVORFxuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgaG93IHRoZSBjb2x1bW4gaXMgY3VycmVudGx5IHNvcnRlZFxuICAgKi9cbiAgcHJpdmF0ZSBfc29ydE9yZGVyOiBDbHJEYXRhZ3JpZFNvcnRPcmRlciA9IENsckRhdGFncmlkU29ydE9yZGVyLlVOU09SVEVEO1xuICBwdWJsaWMgZ2V0IHNvcnRPcmRlcigpIHtcbiAgICByZXR1cm4gdGhpcy5fc29ydE9yZGVyO1xuICB9XG5cbiAgQElucHV0KCdjbHJEZ1NvcnRPcmRlcicpXG4gIHB1YmxpYyBzZXQgc29ydE9yZGVyKHZhbHVlOiBDbHJEYXRhZ3JpZFNvcnRPcmRlcikge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gb25seSBpZiB0aGUgaW5jb21pbmcgb3JkZXIgaXMgZGlmZmVyZW50IGZyb20gdGhlIGN1cnJlbnQgb25lXG4gICAgaWYgKHRoaXMuX3NvcnRPcmRlciA9PT0gdmFsdWUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKHZhbHVlKSB7XG4gICAgICAvLyB0aGUgVW5zb3J0ZWQgY2FzZSBoYXBwZW5zIHdoZW4gdGhlIGN1cnJlbnQgc3RhdGUgaXMgZWl0aGVyIEFzYyBvciBEZXNjXG4gICAgICBkZWZhdWx0OlxuICAgICAgY2FzZSBDbHJEYXRhZ3JpZFNvcnRPcmRlci5VTlNPUlRFRDpcbiAgICAgICAgdGhpcy5fc29ydC5jbGVhcigpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgQ2xyRGF0YWdyaWRTb3J0T3JkZXIuQVNDOlxuICAgICAgICB0aGlzLnNvcnQoZmFsc2UpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgQ2xyRGF0YWdyaWRTb3J0T3JkZXIuREVTQzpcbiAgICAgICAgdGhpcy5zb3J0KHRydWUpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0IGFyaWFTb3J0KCkge1xuICAgIHN3aXRjaCAodGhpcy5fc29ydE9yZGVyKSB7XG4gICAgICBkZWZhdWx0OlxuICAgICAgY2FzZSBDbHJEYXRhZ3JpZFNvcnRPcmRlci5VTlNPUlRFRDpcbiAgICAgICAgcmV0dXJuICdub25lJztcbiAgICAgIGNhc2UgQ2xyRGF0YWdyaWRTb3J0T3JkZXIuQVNDOlxuICAgICAgICByZXR1cm4gJ2FzY2VuZGluZyc7XG4gICAgICBjYXNlIENsckRhdGFncmlkU29ydE9yZGVyLkRFU0M6XG4gICAgICAgIHJldHVybiAnZGVzY2VuZGluZyc7XG4gICAgfVxuICB9XG5cbiAgQE91dHB1dCgnY2xyRGdTb3J0T3JkZXJDaGFuZ2UnKSBwdWJsaWMgc29ydE9yZGVyQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxDbHJEYXRhZ3JpZFNvcnRPcmRlcj4oKTtcblxuICAvKipcbiAgICogU29ydHMgdGhlIGRhdGFncmlkIGJhc2VkIG9uIHRoaXMgY29sdW1uXG4gICAqL1xuICBwdWJsaWMgc29ydChyZXZlcnNlPzogYm9vbGVhbikge1xuICAgIGlmICghdGhpcy5zb3J0YWJsZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX3NvcnQudG9nZ2xlKHRoaXMuX3NvcnRCeSwgcmV2ZXJzZSk7XG5cbiAgICAvLyBzZXR0aW5nIHRoZSBwcml2YXRlIHZhcmlhYmxlIHRvIG5vdCByZXRyaWdnZXIgdGhlIHNldHRlciBsb2dpY1xuICAgIHRoaXMuX3NvcnRPcmRlciA9IHRoaXMuX3NvcnQucmV2ZXJzZSA/IENsckRhdGFncmlkU29ydE9yZGVyLkRFU0MgOiBDbHJEYXRhZ3JpZFNvcnRPcmRlci5BU0M7XG4gICAgLy8gU2V0cyB0aGUgY29ycmVjdCBpY29uIGZvciBjdXJyZW50IHNvcnQgb3JkZXJcbiAgICB0aGlzLnNvcnRJY29uID0gdGhpcy5fc29ydE9yZGVyID09PSBDbHJEYXRhZ3JpZFNvcnRPcmRlci5ERVNDID8gJ2Fycm93IGRvd24nIDogJ2Fycm93JztcbiAgICB0aGlzLnNvcnRPcmRlckNoYW5nZS5lbWl0KHRoaXMuX3NvcnRPcmRlcik7XG5cbiAgICAvLyBkZXByZWNhdGVkOiB0byBiZSByZW1vdmVkIC0gU1RBUlRcbiAgICB0aGlzLl9zb3J0ZWQgPSB0cnVlO1xuICAgIHRoaXMuc29ydGVkQ2hhbmdlLmVtaXQodHJ1ZSk7XG4gICAgLy8gZGVwcmVjYXRlZDogdG8gYmUgcmVtb3ZlZCAtIEVORFxuICB9XG5cbiAgcHVibGljIHNvcnRJY29uO1xuXG4gIC8qKlxuICAgKiBBIGN1c3RvbSBmaWx0ZXIgZm9yIHRoaXMgY29sdW1uIHRoYXQgY2FuIGJlIHByb3ZpZGVkIGluIHRoZSBwcm9qZWN0ZWQgY29udGVudFxuICAgKi9cbiAgcHVibGljIGN1c3RvbUZpbHRlciA9IGZhbHNlO1xuXG4gIEBDb250ZW50Q2hpbGQoQ3VzdG9tRmlsdGVyKVxuICBwdWJsaWMgc2V0IHByb2plY3RlZEZpbHRlcihjdXN0b206IGFueSkge1xuICAgIGlmIChjdXN0b20pIHtcbiAgICAgIHRoaXMuZGVsZXRlRmlsdGVyKCk7XG4gICAgICB0aGlzLmN1c3RvbUZpbHRlciA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldCBmaWx0ZXJWYWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5maWx0ZXIudmFsdWU7XG4gIH1cblxuICBASW5wdXQoJ2NsckZpbHRlclZhbHVlJylcbiAgcHVibGljIHNldCB1cGRhdGVGaWx0ZXJWYWx1ZShuZXdWYWx1ZTogc3RyaW5nKSB7XG4gICAgaWYgKCF0aGlzLmZpbHRlcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIW5ld1ZhbHVlKSB7XG4gICAgICBuZXdWYWx1ZSA9ICcnO1xuICAgIH1cbiAgICBpZiAobmV3VmFsdWUgIT09IHRoaXMuZmlsdGVyLnZhbHVlKSB7XG4gICAgICB0aGlzLmZpbHRlci52YWx1ZSA9IG5ld1ZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzZXQgZmlsdGVyVmFsdWUobmV3VmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMudXBkYXRlRmlsdGVyVmFsdWUgPSBuZXdWYWx1ZTtcbiAgICB0aGlzLmZpbHRlclZhbHVlQ2hhbmdlLmVtaXQodGhpcy5maWx0ZXIudmFsdWUpO1xuICB9XG5cbiAgQE91dHB1dCgnY2xyRmlsdGVyVmFsdWVDaGFuZ2UnKSBmaWx0ZXJWYWx1ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAvKioqKioqKioqKipcbiAgICpcbiAgICogQHByb3BlcnR5IGhpZGVhYmxlXG4gICAqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBXaGVuIGEgY29sdW1uIGlzIGhpZGVhYmxlIHRoaXMgaXMgZGVmaW5lZCB3aXRoIGFuIGluc3RhbmNlIG9mIERhdGFncmlkSGlkZWFibGVDb2x1bW5Nb2RlbC5cbiAgICogV2hlbiBpdHMgbm90IGhpZGVhYmxlIHNob3VsZCBiZSB1bmRlZmluZWQuXG4gICAqXG4gICAqL1xuICBwdWJsaWMgaGlkZWFibGU6IERhdGFncmlkSGlkZWFibGVDb2x1bW5Nb2RlbDtcblxuICBwcml2YXRlIHdyYXBwZWRJbmplY3RvcjogSW5qZWN0b3I7XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy53cmFwcGVkSW5qZWN0b3IgPSBuZXcgSG9zdFdyYXBwZXIoV3JhcHBlZENvbHVtbiwgdGhpcy52Y3IpO1xuICB9XG5cbiAgcHVibGljIGdldCBfdmlldygpIHtcbiAgICByZXR1cm4gdGhpcy53cmFwcGVkSW5qZWN0b3IuZ2V0KFdyYXBwZWRDb2x1bW4sIHRoaXMudmNyKS5jb2x1bW5WaWV3O1xuICB9XG59XG4iXX0=