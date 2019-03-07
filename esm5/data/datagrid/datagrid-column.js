/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
        _this._sortSubscription = _sort.change.subscribe(function (sort) {
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
        });
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
     */
    ClrDatagridColumn.prototype._sortSubscription;
    /** @type {?} */
    ClrDatagridColumn.prototype._field;
    /**
     * ClrDatagridComparatorInterface to use when sorting the column
     * @type {?}
     */
    ClrDatagridColumn.prototype._sortBy;
    /**
     * Indicates if the column is currently sorted
     *
     * @deprecated This will be removed soon, in favor of the sortOrder mechanism
     * @type {?}
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
    /** @type {?} */
    ClrDatagridColumn.prototype.wrappedInjector;
    /** @type {?} */
    ClrDatagridColumn.prototype._sort;
    /** @type {?} */
    ClrDatagridColumn.prototype.vcr;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtY29sdW1uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9kYXRhZ3JpZC1jb2x1bW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUtBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLFlBQVksRUFFWixLQUFLLEVBR0wsTUFBTSxFQUNOLGdCQUFnQixHQUNqQixNQUFNLGVBQWUsQ0FBQztBQUd2QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDckUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0scURBQXFELENBQUM7QUFDakcsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFDbEcsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFFMUYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFL0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDeEMsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDNUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDOztJQUU3QyxPQUFPLEdBQVcsQ0FBQzs7OztBQUV2QjtJQXNDZ0QsNkNBQXVEO0lBRXJHLDJCQUFvQixLQUFjLEVBQUUsT0FBMkIsRUFBVSxHQUFxQjtRQUE5RixZQUNFLGtCQUFNLE9BQU8sQ0FBQyxTQW1CZjtRQXBCbUIsV0FBSyxHQUFMLEtBQUssQ0FBUztRQUF1QyxTQUFHLEdBQUgsR0FBRyxDQUFrQjs7Ozs7OztRQXNIdEYsYUFBTyxHQUFHLEtBQUssQ0FBQzs7OztRQXFC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aHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkLFxuICBFdmVudEVtaXR0ZXIsXG4gIEluamVjdG9yLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgVmlld0NvbnRhaW5lclJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgSG9zdFdyYXBwZXIgfSBmcm9tICcuLi8uLi91dGlscy9ob3N0LXdyYXBwaW5nL2hvc3Qtd3JhcHBlcic7XG5pbXBvcnQgeyBEYXRhZ3JpZFByb3BlcnR5Q29tcGFyYXRvciB9IGZyb20gJy4vYnVpbHQtaW4vY29tcGFyYXRvcnMvZGF0YWdyaWQtcHJvcGVydHktY29tcGFyYXRvcic7XG5pbXBvcnQgeyBEYXRhZ3JpZFByb3BlcnR5U3RyaW5nRmlsdGVyIH0gZnJvbSAnLi9idWlsdC1pbi9maWx0ZXJzL2RhdGFncmlkLXByb3BlcnR5LXN0cmluZy1maWx0ZXInO1xuaW1wb3J0IHsgRGF0YWdyaWRTdHJpbmdGaWx0ZXJJbXBsIH0gZnJvbSAnLi9idWlsdC1pbi9maWx0ZXJzL2RhdGFncmlkLXN0cmluZy1maWx0ZXItaW1wbCc7XG5pbXBvcnQgeyBEYXRhZ3JpZEhpZGVhYmxlQ29sdW1uTW9kZWwgfSBmcm9tICcuL2RhdGFncmlkLWhpZGVhYmxlLWNvbHVtbi5tb2RlbCc7XG5pbXBvcnQgeyBDbHJEYXRhZ3JpZFNvcnRPcmRlciB9IGZyb20gJy4vZW51bXMvc29ydC1vcmRlci5lbnVtJztcbmltcG9ydCB7IENsckRhdGFncmlkQ29tcGFyYXRvckludGVyZmFjZSB9IGZyb20gJy4vaW50ZXJmYWNlcy9jb21wYXJhdG9yLmludGVyZmFjZSc7XG5pbXBvcnQgeyBDdXN0b21GaWx0ZXIgfSBmcm9tICcuL3Byb3ZpZGVycy9jdXN0b20tZmlsdGVyJztcbmltcG9ydCB7IEZpbHRlcnNQcm92aWRlciB9IGZyb20gJy4vcHJvdmlkZXJzL2ZpbHRlcnMnO1xuaW1wb3J0IHsgU29ydCB9IGZyb20gJy4vcHJvdmlkZXJzL3NvcnQnO1xuaW1wb3J0IHsgRGF0YWdyaWRGaWx0ZXJSZWdpc3RyYXIgfSBmcm9tICcuL3V0aWxzL2RhdGFncmlkLWZpbHRlci1yZWdpc3RyYXInO1xuaW1wb3J0IHsgV3JhcHBlZENvbHVtbiB9IGZyb20gJy4vd3JhcHBlZC1jb2x1bW4nO1xuXG5sZXQgbmJDb3VudDogbnVtYmVyID0gMDtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLWRnLWNvbHVtbicsXG4gIHRlbXBsYXRlOiBgXG4gICAgICA8ZGl2IGNsYXNzPVwiZGF0YWdyaWQtY29sdW1uLWZsZXhcIj5cbiAgICAgICAgICA8IS0tIEknbSByZWFsbHkgbm90IGhhcHB5IHdpdGggdGhhdCBzZWxlY3Qgc2luY2UgaXQncyBub3QgdmVyeSBzY2FsYWJsZSAtLT5cbiAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJjbHItZGctZmlsdGVyLCBjbHItZGctc3RyaW5nLWZpbHRlclwiPjwvbmctY29udGVudD5cblxuICAgICAgICAgIDxjbHItZGctc3RyaW5nLWZpbHRlclxuICAgICAgICAgICAgICAgICAgKm5nSWY9XCJmaWVsZCAmJiAhY3VzdG9tRmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgIFtjbHJEZ1N0cmluZ0ZpbHRlcl09XCJyZWdpc3RlcmVkXCJcbiAgICAgICAgICAgICAgICAgIFsoY2xyRmlsdGVyVmFsdWUpXT1cImZpbHRlclZhbHVlXCI+PC9jbHItZGctc3RyaW5nLWZpbHRlcj5cblxuICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjY29sdW1uVGl0bGU+XG4gICAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuXG4gICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImRhdGFncmlkLWNvbHVtbi10aXRsZVwiICpuZ0lmPVwic29ydGFibGVcIiAoY2xpY2spPVwic29ydCgpXCIgdHlwZT1cImJ1dHRvblwiPlxuICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiY29sdW1uVGl0bGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgPGNsci1pY29uXG4gICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJzb3J0SWNvblwiXG4gICAgICAgICAgICAgICAgICAgICAgW2F0dHIuc2hhcGVdPVwic29ydEljb25cIlxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwic29ydC1pY29uXCI+PC9jbHItaWNvbj5cbiAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZGF0YWdyaWQtY29sdW1uLXRpdGxlXCIgKm5nSWY9XCIhc29ydGFibGVcIj5cbiAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJjb2x1bW5UaXRsZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPC9zcGFuPlxuXG4gICAgICAgICAgPGNsci1kZy1jb2x1bW4tc2VwYXJhdG9yPjwvY2xyLWRnLWNvbHVtbi1zZXBhcmF0b3I+XG4gICAgICA8L2Rpdj5cbiAgYCxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuZGF0YWdyaWQtY29sdW1uXSc6ICd0cnVlJyxcbiAgICAnW2NsYXNzLmRhdGFncmlkLWNvbHVtbi0taGlkZGVuXSc6ICdoaWRkZW4nLFxuICAgICdbYXR0ci5hcmlhLXNvcnRdJzogJ2FyaWFTb3J0JyxcbiAgICByb2xlOiAnY29sdW1uaGVhZGVyJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyRGF0YWdyaWRDb2x1bW48VCA9IGFueT4gZXh0ZW5kcyBEYXRhZ3JpZEZpbHRlclJlZ2lzdHJhcjxULCBEYXRhZ3JpZFN0cmluZ0ZpbHRlckltcGw8VD4+XG4gIGltcGxlbWVudHMgT25EZXN0cm95LCBPbkluaXQge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zb3J0OiBTb3J0PFQ+LCBmaWx0ZXJzOiBGaWx0ZXJzUHJvdmlkZXI8VD4sIHByaXZhdGUgdmNyOiBWaWV3Q29udGFpbmVyUmVmKSB7XG4gICAgc3VwZXIoZmlsdGVycyk7XG4gICAgdGhpcy5fc29ydFN1YnNjcmlwdGlvbiA9IF9zb3J0LmNoYW5nZS5zdWJzY3JpYmUoc29ydCA9PiB7XG4gICAgICAvLyBXZSdyZSBvbmx5IGxpc3RlbmluZyB0byBtYWtlIHN1cmUgd2UgZW1pdCBhbiBldmVudCB3aGVuIHRoZSBjb2x1bW4gZ29lcyBmcm9tIHNvcnRlZCB0byB1bnNvcnRlZFxuICAgICAgaWYgKHRoaXMuc29ydE9yZGVyICE9PSBDbHJEYXRhZ3JpZFNvcnRPcmRlci5VTlNPUlRFRCAmJiBzb3J0LmNvbXBhcmF0b3IgIT09IHRoaXMuX3NvcnRCeSkge1xuICAgICAgICB0aGlzLl9zb3J0T3JkZXIgPSBDbHJEYXRhZ3JpZFNvcnRPcmRlci5VTlNPUlRFRDtcbiAgICAgICAgdGhpcy5zb3J0T3JkZXJDaGFuZ2UuZW1pdCh0aGlzLl9zb3J0T3JkZXIpO1xuICAgICAgICAvLyByZW1vdmVzIHRoZSBzb3J0SWNvbiB3aGVuIGNvbHVtbiBiZWNvbWVzIHVuc29ydGVkXG4gICAgICAgIHRoaXMuc29ydEljb24gPSBudWxsO1xuICAgICAgfVxuICAgICAgLy8gZGVwcmVjYXRlZDogdG8gYmUgcmVtb3ZlZCAtIFNUQVJUXG4gICAgICBpZiAodGhpcy5zb3J0ZWQgJiYgc29ydC5jb21wYXJhdG9yICE9PSB0aGlzLl9zb3J0QnkpIHtcbiAgICAgICAgdGhpcy5fc29ydGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc29ydGVkQ2hhbmdlLmVtaXQoZmFsc2UpO1xuICAgICAgfVxuICAgICAgLy8gZGVwcmVjYXRlZDogdG8gYmUgcmVtb3ZlZCAtIEVORFxuICAgIH0pO1xuXG4gICAgdGhpcy5jb2x1bW5JZCA9ICdkZy1jb2wtJyArIG5iQ291bnQudG9TdHJpbmcoKTsgLy8gQXBwcm94aW1hdGUgYSBHVUlEXG4gICAgbmJDb3VudCsrO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwcm9wZXJ0eSBjb2x1bW5JZFxuICAgKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogQSBDbHJEYXRhZ3JpZENvbHVtbiBjbGFzcyB2YXJpYWJsZSB0aGF0IGhvbGRzIHRoZSBudW1iZXIgb2YgQ2xyRGF0YWdyaWRDb2x1bW4gaW5zdGFuY2VzIGZvciBhIERhdGFncmlkLlxuICAgKiBJdCBpcyB1c2VkIHRvIGdlbmVyYXRlIGEgdW5pcXVlIGlkIGZvciB0aGUgQ2xyRGF0YWdyaWRDb2x1bW4gaW5zdGFuY2UuXG4gICAqXG4gICAqL1xuICBwdWJsaWMgY29sdW1uSWQ6IHN0cmluZztcblxuICAvKipcbiAgICogQHByb3BlcnR5IGhpZGRlblxuICAgKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogQSBwcm9wZXJ0eSB0aGF0IGFsbG93cyB0aGUgY29sdW1uIHRvIGJlIGhpZGRlbiAvIHNob3duIHdpdGggY3NzXG4gICAqIE5vdGUgdGhlIGRlZmF1bHQgYWxsb3dzIHRoZSBDbHJEYXRhZ3JpZENvbHVtbiB0byBoYXZlIGFuICpuZ0lmIG9uIGl0LiAoRUhDQUlXQyAtIHdpbGwgb2NjdXIgaWYgaXRzIG5vdFxuICAgKiBpbml0aWFsaXplZClcbiAgICpcbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICpcbiAgICovXG4gIHB1YmxpYyBnZXQgaGlkZGVuKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIXRoaXMuaGlkZWFibGUgJiYgdGhpcy5oaWRlYWJsZS5oaWRkZW47XG4gIH1cblxuICAvKipcbiAgICogU3Vic2NyaXB0aW9uIHRvIHRoZSBzb3J0IHNlcnZpY2UgY2hhbmdlc1xuICAgKi9cbiAgcHJpdmF0ZSBfc29ydFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX3NvcnRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIC8qXG4gICAgICogU2ltcGxlIG9iamVjdCBwcm9wZXJ0eSBzaG9ydGN1dCwgYWN0aXZhdGVzIGJvdGggc29ydGluZyBhbmQgZmlsdGVyaW5nXG4gICAgICogYmFzZWQgb24gbmF0aXZlIGNvbXBhcmlzb24gb2YgdGhlIHNwZWNpZmllZCBwcm9wZXJ0eSBvbiB0aGUgaXRlbXMuXG4gICAgICovXG4gIHByaXZhdGUgX2ZpZWxkOiBzdHJpbmc7XG4gIHB1YmxpYyBnZXQgZmllbGQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpZWxkO1xuICB9XG5cbiAgQElucHV0KCdjbHJEZ0ZpZWxkJylcbiAgcHVibGljIHNldCBmaWVsZChmaWVsZDogc3RyaW5nKSB7XG4gICAgaWYgKHR5cGVvZiBmaWVsZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMuX2ZpZWxkID0gZmllbGQ7XG4gICAgICBpZiAoIXRoaXMuY3VzdG9tRmlsdGVyKSB7XG4gICAgICAgIHRoaXMuc2V0RmlsdGVyKG5ldyBEYXRhZ3JpZFN0cmluZ0ZpbHRlckltcGwobmV3IERhdGFncmlkUHJvcGVydHlTdHJpbmdGaWx0ZXIoZmllbGQpKSk7XG4gICAgICB9XG4gICAgICBpZiAoIXRoaXMuX3NvcnRCeSkge1xuICAgICAgICB0aGlzLl9zb3J0QnkgPSBuZXcgRGF0YWdyaWRQcm9wZXJ0eUNvbXBhcmF0b3IoZmllbGQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDbHJEYXRhZ3JpZENvbXBhcmF0b3JJbnRlcmZhY2UgdG8gdXNlIHdoZW4gc29ydGluZyB0aGUgY29sdW1uXG4gICAqL1xuXG4gIHByaXZhdGUgX3NvcnRCeTogQ2xyRGF0YWdyaWRDb21wYXJhdG9ySW50ZXJmYWNlPFQ+O1xuXG4gIHB1YmxpYyBnZXQgc29ydEJ5KCkge1xuICAgIHJldHVybiB0aGlzLl9zb3J0Qnk7XG4gIH1cblxuICBASW5wdXQoJ2NsckRnU29ydEJ5JylcbiAgcHVibGljIHNldCBzb3J0QnkoY29tcGFyYXRvcjogQ2xyRGF0YWdyaWRDb21wYXJhdG9ySW50ZXJmYWNlPFQ+IHwgc3RyaW5nKSB7XG4gICAgaWYgKHR5cGVvZiBjb21wYXJhdG9yID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5fc29ydEJ5ID0gbmV3IERhdGFncmlkUHJvcGVydHlDb21wYXJhdG9yKGNvbXBhcmF0b3IpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoY29tcGFyYXRvcikge1xuICAgICAgICB0aGlzLl9zb3J0QnkgPSBjb21wYXJhdG9yO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRoaXMuX2ZpZWxkKSB7XG4gICAgICAgICAgdGhpcy5fc29ydEJ5ID0gbmV3IERhdGFncmlkUHJvcGVydHlDb21wYXJhdG9yKHRoaXMuX2ZpZWxkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkZWxldGUgdGhpcy5fc29ydEJ5O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEluZGljYXRlcyBpZiB0aGUgY29sdW1uIGlzIHNvcnRhYmxlXG4gICAqL1xuICBwdWJsaWMgZ2V0IHNvcnRhYmxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIXRoaXMuX3NvcnRCeTtcbiAgfVxuXG4gIC8vIGRlcHJlY2F0ZWQ6IHRvIGJlIHJlbW92ZWQgLSBTVEFSVFxuICAvKipcbiAgICogSW5kaWNhdGVzIGlmIHRoZSBjb2x1bW4gaXMgY3VycmVudGx5IHNvcnRlZFxuICAgKlxuICAgKiBAZGVwcmVjYXRlZCBUaGlzIHdpbGwgYmUgcmVtb3ZlZCBzb29uLCBpbiBmYXZvciBvZiB0aGUgc29ydE9yZGVyIG1lY2hhbmlzbVxuICAgKi9cbiAgcHJpdmF0ZSBfc29ydGVkID0gZmFsc2U7XG4gIHB1YmxpYyBnZXQgc29ydGVkKCkge1xuICAgIHJldHVybiB0aGlzLl9zb3J0ZWQ7XG4gIH1cblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgVGhpcyB3aWxsIGJlIHJlbW92ZWQgc29vbiwgaW4gZmF2b3Igb2YgdGhlIHNvcnRPcmRlciBtZWNoYW5pc21cbiAgICovXG4gIEBJbnB1dCgnY2xyRGdTb3J0ZWQnKVxuICBwdWJsaWMgc2V0IHNvcnRlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIGlmICghdmFsdWUgJiYgdGhpcy5zb3J0ZWQpIHtcbiAgICAgIHRoaXMuX3NvcnRlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5fc29ydC5jbGVhcigpO1xuICAgIH0gZWxzZSBpZiAodmFsdWUgJiYgIXRoaXMuc29ydGVkKSB7XG4gICAgICB0aGlzLnNvcnQoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgVGhpcyB3aWxsIGJlIHJlbW92ZWQgc29vbiwgaW4gZmF2b3Igb2YgdGhlIHNvcnRPcmRlciBtZWNoYW5pc21cbiAgICovXG4gIEBPdXRwdXQoJ2NsckRnU29ydGVkQ2hhbmdlJykgcHVibGljIHNvcnRlZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICAvLyBkZXByZWNhdGVkOiB0byBiZSByZW1vdmVkIC0gRU5EXG5cbiAgLyoqXG4gICAqIEluZGljYXRlcyBob3cgdGhlIGNvbHVtbiBpcyBjdXJyZW50bHkgc29ydGVkXG4gICAqL1xuICBwcml2YXRlIF9zb3J0T3JkZXI6IENsckRhdGFncmlkU29ydE9yZGVyID0gQ2xyRGF0YWdyaWRTb3J0T3JkZXIuVU5TT1JURUQ7XG4gIHB1YmxpYyBnZXQgc29ydE9yZGVyKCkge1xuICAgIHJldHVybiB0aGlzLl9zb3J0T3JkZXI7XG4gIH1cblxuICBASW5wdXQoJ2NsckRnU29ydE9yZGVyJylcbiAgcHVibGljIHNldCBzb3J0T3JkZXIodmFsdWU6IENsckRhdGFncmlkU29ydE9yZGVyKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBvbmx5IGlmIHRoZSBpbmNvbWluZyBvcmRlciBpcyBkaWZmZXJlbnQgZnJvbSB0aGUgY3VycmVudCBvbmVcbiAgICBpZiAodGhpcy5fc29ydE9yZGVyID09PSB2YWx1ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHN3aXRjaCAodmFsdWUpIHtcbiAgICAgIC8vIHRoZSBVbnNvcnRlZCBjYXNlIGhhcHBlbnMgd2hlbiB0aGUgY3VycmVudCBzdGF0ZSBpcyBlaXRoZXIgQXNjIG9yIERlc2NcbiAgICAgIGRlZmF1bHQ6XG4gICAgICBjYXNlIENsckRhdGFncmlkU29ydE9yZGVyLlVOU09SVEVEOlxuICAgICAgICB0aGlzLl9zb3J0LmNsZWFyKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBDbHJEYXRhZ3JpZFNvcnRPcmRlci5BU0M6XG4gICAgICAgIHRoaXMuc29ydChmYWxzZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBDbHJEYXRhZ3JpZFNvcnRPcmRlci5ERVNDOlxuICAgICAgICB0aGlzLnNvcnQodHJ1ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXQgYXJpYVNvcnQoKSB7XG4gICAgc3dpdGNoICh0aGlzLl9zb3J0T3JkZXIpIHtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICBjYXNlIENsckRhdGFncmlkU29ydE9yZGVyLlVOU09SVEVEOlxuICAgICAgICByZXR1cm4gJ25vbmUnO1xuICAgICAgY2FzZSBDbHJEYXRhZ3JpZFNvcnRPcmRlci5BU0M6XG4gICAgICAgIHJldHVybiAnYXNjZW5kaW5nJztcbiAgICAgIGNhc2UgQ2xyRGF0YWdyaWRTb3J0T3JkZXIuREVTQzpcbiAgICAgICAgcmV0dXJuICdkZXNjZW5kaW5nJztcbiAgICB9XG4gIH1cblxuICBAT3V0cHV0KCdjbHJEZ1NvcnRPcmRlckNoYW5nZScpIHB1YmxpYyBzb3J0T3JkZXJDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPENsckRhdGFncmlkU29ydE9yZGVyPigpO1xuXG4gIC8qKlxuICAgKiBTb3J0cyB0aGUgZGF0YWdyaWQgYmFzZWQgb24gdGhpcyBjb2x1bW5cbiAgICovXG4gIHB1YmxpYyBzb3J0KHJldmVyc2U/OiBib29sZWFuKSB7XG4gICAgaWYgKCF0aGlzLnNvcnRhYmxlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fc29ydC50b2dnbGUodGhpcy5fc29ydEJ5LCByZXZlcnNlKTtcblxuICAgIC8vIHNldHRpbmcgdGhlIHByaXZhdGUgdmFyaWFibGUgdG8gbm90IHJldHJpZ2dlciB0aGUgc2V0dGVyIGxvZ2ljXG4gICAgdGhpcy5fc29ydE9yZGVyID0gdGhpcy5fc29ydC5yZXZlcnNlID8gQ2xyRGF0YWdyaWRTb3J0T3JkZXIuREVTQyA6IENsckRhdGFncmlkU29ydE9yZGVyLkFTQztcbiAgICAvLyBTZXRzIHRoZSBjb3JyZWN0IGljb24gZm9yIGN1cnJlbnQgc29ydCBvcmRlclxuICAgIHRoaXMuc29ydEljb24gPSB0aGlzLl9zb3J0T3JkZXIgPT09IENsckRhdGFncmlkU29ydE9yZGVyLkRFU0MgPyAnYXJyb3cgZG93bicgOiAnYXJyb3cnO1xuICAgIHRoaXMuc29ydE9yZGVyQ2hhbmdlLmVtaXQodGhpcy5fc29ydE9yZGVyKTtcblxuICAgIC8vIGRlcHJlY2F0ZWQ6IHRvIGJlIHJlbW92ZWQgLSBTVEFSVFxuICAgIHRoaXMuX3NvcnRlZCA9IHRydWU7XG4gICAgdGhpcy5zb3J0ZWRDaGFuZ2UuZW1pdCh0cnVlKTtcbiAgICAvLyBkZXByZWNhdGVkOiB0byBiZSByZW1vdmVkIC0gRU5EXG4gIH1cblxuICBwdWJsaWMgc29ydEljb247XG5cbiAgLyoqXG4gICAqIEEgY3VzdG9tIGZpbHRlciBmb3IgdGhpcyBjb2x1bW4gdGhhdCBjYW4gYmUgcHJvdmlkZWQgaW4gdGhlIHByb2plY3RlZCBjb250ZW50XG4gICAqL1xuICBwdWJsaWMgY3VzdG9tRmlsdGVyID0gZmFsc2U7XG5cbiAgQENvbnRlbnRDaGlsZChDdXN0b21GaWx0ZXIpXG4gIHB1YmxpYyBzZXQgcHJvamVjdGVkRmlsdGVyKGN1c3RvbTogYW55KSB7XG4gICAgaWYgKGN1c3RvbSkge1xuICAgICAgdGhpcy5kZWxldGVGaWx0ZXIoKTtcbiAgICAgIHRoaXMuY3VzdG9tRmlsdGVyID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0IGZpbHRlclZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLmZpbHRlci52YWx1ZTtcbiAgfVxuXG4gIEBJbnB1dCgnY2xyRmlsdGVyVmFsdWUnKVxuICBwdWJsaWMgc2V0IHVwZGF0ZUZpbHRlclZhbHVlKG5ld1ZhbHVlOiBzdHJpbmcpIHtcbiAgICBpZiAoIXRoaXMuZmlsdGVyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghbmV3VmFsdWUpIHtcbiAgICAgIG5ld1ZhbHVlID0gJyc7XG4gICAgfVxuICAgIGlmIChuZXdWYWx1ZSAhPT0gdGhpcy5maWx0ZXIudmFsdWUpIHtcbiAgICAgIHRoaXMuZmlsdGVyLnZhbHVlID0gbmV3VmFsdWU7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNldCBmaWx0ZXJWYWx1ZShuZXdWYWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy51cGRhdGVGaWx0ZXJWYWx1ZSA9IG5ld1ZhbHVlO1xuICAgIHRoaXMuZmlsdGVyVmFsdWVDaGFuZ2UuZW1pdCh0aGlzLmZpbHRlci52YWx1ZSk7XG4gIH1cblxuICBAT3V0cHV0KCdjbHJGaWx0ZXJWYWx1ZUNoYW5nZScpIGZpbHRlclZhbHVlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8qKioqKioqKioqKlxuICAgKlxuICAgKiBAcHJvcGVydHkgaGlkZWFibGVcbiAgICpcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIFdoZW4gYSBjb2x1bW4gaXMgaGlkZWFibGUgdGhpcyBpcyBkZWZpbmVkIHdpdGggYW4gaW5zdGFuY2Ugb2YgRGF0YWdyaWRIaWRlYWJsZUNvbHVtbk1vZGVsLlxuICAgKiBXaGVuIGl0cyBub3QgaGlkZWFibGUgc2hvdWxkIGJlIHVuZGVmaW5lZC5cbiAgICpcbiAgICovXG4gIHB1YmxpYyBoaWRlYWJsZTogRGF0YWdyaWRIaWRlYWJsZUNvbHVtbk1vZGVsO1xuXG4gIHByaXZhdGUgd3JhcHBlZEluamVjdG9yOiBJbmplY3RvcjtcblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLndyYXBwZWRJbmplY3RvciA9IG5ldyBIb3N0V3JhcHBlcihXcmFwcGVkQ29sdW1uLCB0aGlzLnZjcik7XG4gIH1cblxuICBwdWJsaWMgZ2V0IF92aWV3KCkge1xuICAgIHJldHVybiB0aGlzLndyYXBwZWRJbmplY3Rvci5nZXQoV3JhcHBlZENvbHVtbiwgdGhpcy52Y3IpLmNvbHVtblZpZXc7XG4gIH1cbn1cbiJdfQ==