/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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
let nbCount = 0;
/**
 * @template T
 */
export class ClrDatagridColumn extends DatagridFilterRegistrar {
    /**
     * @param {?} _sort
     * @param {?} filters
     * @param {?} vcr
     */
    constructor(_sort, filters, vcr) {
        super(filters);
        this._sort = _sort;
        this.vcr = vcr;
        // deprecated: to be removed - START
        /**
         * Indicates if the column is currently sorted
         *
         * @deprecated This will be removed soon, in favor of the sortOrder mechanism
         */
        this._sorted = false;
        /**
         * @deprecated This will be removed soon, in favor of the sortOrder mechanism
         */
        this.sortedChange = new EventEmitter();
        // deprecated: to be removed - END
        /**
         * Indicates how the column is currently sorted
         */
        this._sortOrder = ClrDatagridSortOrder.UNSORTED;
        this.sortOrderChange = new EventEmitter();
        /**
         * A custom filter for this column that can be provided in the projected content
         */
        this.customFilter = false;
        this.filterValueChange = new EventEmitter();
        this._sortSubscription = _sort.change.subscribe(sort => {
            // We're only listening to make sure we emit an event when the column goes from sorted to unsorted
            if (this.sortOrder !== ClrDatagridSortOrder.UNSORTED && sort.comparator !== this._sortBy) {
                this._sortOrder = ClrDatagridSortOrder.UNSORTED;
                this.sortOrderChange.emit(this._sortOrder);
                // removes the sortIcon when column becomes unsorted
                this.sortIcon = null;
            }
            // deprecated: to be removed - START
            if (this.sorted && sort.comparator !== this._sortBy) {
                this._sorted = false;
                this.sortedChange.emit(false);
            }
            // deprecated: to be removed - END
        });
        this.columnId = 'dg-col-' + nbCount.toString(); // Approximate a GUID
        nbCount++;
    }
    /**
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
    get hidden() {
        return !!this.hideable && this.hideable.hidden;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._sortSubscription.unsubscribe();
    }
    /**
     * @return {?}
     */
    get field() {
        return this._field;
    }
    /**
     * @param {?} field
     * @return {?}
     */
    set field(field) {
        if (typeof field === 'string') {
            this._field = field;
            if (!this.customFilter) {
                this.setFilter(new DatagridStringFilterImpl(new DatagridPropertyStringFilter(field)));
            }
            if (!this._sortBy) {
                this._sortBy = new DatagridPropertyComparator(field);
            }
        }
    }
    /**
     * @return {?}
     */
    get sortBy() {
        return this._sortBy;
    }
    /**
     * @param {?} comparator
     * @return {?}
     */
    set sortBy(comparator) {
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
    }
    /**
     * Indicates if the column is sortable
     * @return {?}
     */
    get sortable() {
        return !!this._sortBy;
    }
    /**
     * @return {?}
     */
    get sorted() {
        return this._sorted;
    }
    /**
     * @deprecated This will be removed soon, in favor of the sortOrder mechanism
     * @param {?} value
     * @return {?}
     */
    set sorted(value) {
        if (!value && this.sorted) {
            this._sorted = false;
            this._sort.clear();
        }
        else if (value && !this.sorted) {
            this.sort();
        }
    }
    /**
     * @return {?}
     */
    get sortOrder() {
        return this._sortOrder;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set sortOrder(value) {
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
    }
    /**
     * @return {?}
     */
    get ariaSort() {
        switch (this._sortOrder) {
            default:
            case ClrDatagridSortOrder.UNSORTED:
                return 'none';
            case ClrDatagridSortOrder.ASC:
                return 'ascending';
            case ClrDatagridSortOrder.DESC:
                return 'descending';
        }
    }
    /**
     * Sorts the datagrid based on this column
     * @param {?=} reverse
     * @return {?}
     */
    sort(reverse) {
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
    }
    /**
     * @param {?} custom
     * @return {?}
     */
    set projectedFilter(custom) {
        if (custom) {
            this.deleteFilter();
            this.customFilter = true;
        }
    }
    /**
     * @return {?}
     */
    get filterValue() {
        return this.filter.value;
    }
    /**
     * @param {?} newValue
     * @return {?}
     */
    set updateFilterValue(newValue) {
        if (!this.filter) {
            return;
        }
        if (!newValue) {
            newValue = '';
        }
        if (newValue !== this.filter.value) {
            this.filter.value = newValue;
        }
    }
    /**
     * @param {?} newValue
     * @return {?}
     */
    set filterValue(newValue) {
        this.updateFilterValue = newValue;
        this.filterValueChange.emit(this.filter.value);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.wrappedInjector = new HostWrapper(WrappedColumn, this.vcr);
    }
    /**
     * @return {?}
     */
    get _view() {
        return this.wrappedInjector.get(WrappedColumn, this.vcr).columnView;
    }
}
ClrDatagridColumn.decorators = [
    { type: Component, args: [{
                selector: 'clr-dg-column',
                template: `
      <div class="datagrid-column-flex">
          <!-- I'm really not happy with that select since it's not very scalable -->
          <ng-content select="clr-dg-filter, clr-dg-string-filter"></ng-content>

          <clr-dg-string-filter
                  *ngIf="field && !customFilter"
                  [clrDgStringFilter]="registered"
                  [(clrFilterValue)]="filterValue"></clr-dg-string-filter>

          <ng-template #columnTitle>
              <ng-content></ng-content>
          </ng-template>

          <button class="datagrid-column-title" *ngIf="sortable" (click)="sort()" type="button">
              <ng-container *ngTemplateOutlet="columnTitle"></ng-container>
              <clr-icon
                      *ngIf="sortIcon"
                      [attr.shape]="sortIcon"
                      class="sort-icon"></clr-icon>
          </button>

          <span class="datagrid-column-title" *ngIf="!sortable">
               <ng-container *ngTemplateOutlet="columnTitle"></ng-container>
            </span>

          <clr-dg-column-separator></clr-dg-column-separator>
      </div>
  `,
                host: {
                    '[class.datagrid-column]': 'true',
                    '[class.datagrid-column--hidden]': 'hidden',
                    '[attr.aria-sort]': 'ariaSort',
                    role: 'columnheader',
                }
            }] }
];
/** @nocollapse */
ClrDatagridColumn.ctorParameters = () => [
    { type: Sort },
    { type: FiltersProvider },
    { type: ViewContainerRef }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtY29sdW1uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9kYXRhZ3JpZC1jb2x1bW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUNMLFNBQVMsRUFDVCxZQUFZLEVBQ1osWUFBWSxFQUVaLEtBQUssRUFHTCxNQUFNLEVBQ04sZ0JBQWdCLEdBQ2pCLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxxREFBcUQsQ0FBQztBQUNqRyxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUNsRyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUUxRixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUUvRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDekQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUN4QyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUM1RSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7O0lBRTdDLE9BQU8sR0FBVyxDQUFDOzs7O0FBd0N2QixNQUFNLE9BQU8saUJBQTJCLFNBQVEsdUJBQXVEOzs7Ozs7SUFFckcsWUFBb0IsS0FBYyxFQUFFLE9BQTJCLEVBQVUsR0FBcUI7UUFDNUYsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBREcsVUFBSyxHQUFMLEtBQUssQ0FBUztRQUF1QyxRQUFHLEdBQUgsR0FBRyxDQUFrQjs7Ozs7OztRQXNIdEYsWUFBTyxHQUFHLEtB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QkFDSix5QkFBeUIsRUFBRSxNQUFNO29CQUNqQyxpQ0FBaUMsRUFBRSxRQUFRO29CQUMzQyxrQkFBa0IsRUFBRSxVQUFVO29CQUM5QixJQUFJLEVBQUUsY0FBYztpQkFDckI7YUFDRjs7OztZQTNDUSxJQUFJO1lBREosZUFBZTtZQVp0QixnQkFBZ0I7OztvQkE0SGYsS0FBSyxTQUFDLFlBQVk7cUJBdUJsQixLQUFLLFNBQUMsYUFBYTtxQkFzQ25CLEtBQUssU0FBQyxhQUFhOzJCQWFuQixNQUFNLFNBQUMsbUJBQW1CO3dCQVkxQixLQUFLLFNBQUMsZ0JBQWdCOzhCQXNDdEIsTUFBTSxTQUFDLHNCQUFzQjs4QkErQjdCLFlBQVksU0FBQyxZQUFZO2dDQVl6QixLQUFLLFNBQUMsZ0JBQWdCO2dDQWtCdEIsTUFBTSxTQUFDLHNCQUFzQjs7Ozs7Ozs7Ozs7O0lBNU45QixxQ0FBd0I7Ozs7O0lBb0J4Qiw4Q0FBd0M7O0lBVXhDLG1DQUF1Qjs7Ozs7SUFzQnZCLG9DQUFtRDs7Ozs7OztJQW9DbkQsb0NBQXdCOzs7OztJQXFCeEIseUNBQStFOzs7OztJQU8vRSx1Q0FBeUU7O0lBMkN6RSw0Q0FBa0c7O0lBd0JsRyxxQ0FBZ0I7Ozs7O0lBS2hCLHlDQUE0Qjs7SUFnQzVCLDhDQUF1RTs7Ozs7Ozs7Ozs7O0lBV3ZFLHFDQUE2Qzs7SUFFN0MsNENBQWtDOztJQXZRdEIsa0NBQXNCOztJQUErQixnQ0FBNkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQge1xuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZCxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbmplY3RvcixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFZpZXdDb250YWluZXJSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IEhvc3RXcmFwcGVyIH0gZnJvbSAnLi4vLi4vdXRpbHMvaG9zdC13cmFwcGluZy9ob3N0LXdyYXBwZXInO1xuaW1wb3J0IHsgRGF0YWdyaWRQcm9wZXJ0eUNvbXBhcmF0b3IgfSBmcm9tICcuL2J1aWx0LWluL2NvbXBhcmF0b3JzL2RhdGFncmlkLXByb3BlcnR5LWNvbXBhcmF0b3InO1xuaW1wb3J0IHsgRGF0YWdyaWRQcm9wZXJ0eVN0cmluZ0ZpbHRlciB9IGZyb20gJy4vYnVpbHQtaW4vZmlsdGVycy9kYXRhZ3JpZC1wcm9wZXJ0eS1zdHJpbmctZmlsdGVyJztcbmltcG9ydCB7IERhdGFncmlkU3RyaW5nRmlsdGVySW1wbCB9IGZyb20gJy4vYnVpbHQtaW4vZmlsdGVycy9kYXRhZ3JpZC1zdHJpbmctZmlsdGVyLWltcGwnO1xuaW1wb3J0IHsgRGF0YWdyaWRIaWRlYWJsZUNvbHVtbk1vZGVsIH0gZnJvbSAnLi9kYXRhZ3JpZC1oaWRlYWJsZS1jb2x1bW4ubW9kZWwnO1xuaW1wb3J0IHsgQ2xyRGF0YWdyaWRTb3J0T3JkZXIgfSBmcm9tICcuL2VudW1zL3NvcnQtb3JkZXIuZW51bSc7XG5pbXBvcnQgeyBDbHJEYXRhZ3JpZENvbXBhcmF0b3JJbnRlcmZhY2UgfSBmcm9tICcuL2ludGVyZmFjZXMvY29tcGFyYXRvci5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQ3VzdG9tRmlsdGVyIH0gZnJvbSAnLi9wcm92aWRlcnMvY3VzdG9tLWZpbHRlcic7XG5pbXBvcnQgeyBGaWx0ZXJzUHJvdmlkZXIgfSBmcm9tICcuL3Byb3ZpZGVycy9maWx0ZXJzJztcbmltcG9ydCB7IFNvcnQgfSBmcm9tICcuL3Byb3ZpZGVycy9zb3J0JztcbmltcG9ydCB7IERhdGFncmlkRmlsdGVyUmVnaXN0cmFyIH0gZnJvbSAnLi91dGlscy9kYXRhZ3JpZC1maWx0ZXItcmVnaXN0cmFyJztcbmltcG9ydCB7IFdyYXBwZWRDb2x1bW4gfSBmcm9tICcuL3dyYXBwZWQtY29sdW1uJztcblxubGV0IG5iQ291bnQ6IG51bWJlciA9IDA7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci1kZy1jb2x1bW4nLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgPGRpdiBjbGFzcz1cImRhdGFncmlkLWNvbHVtbi1mbGV4XCI+XG4gICAgICAgICAgPCEtLSBJJ20gcmVhbGx5IG5vdCBoYXBweSB3aXRoIHRoYXQgc2VsZWN0IHNpbmNlIGl0J3Mgbm90IHZlcnkgc2NhbGFibGUgLS0+XG4gICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiY2xyLWRnLWZpbHRlciwgY2xyLWRnLXN0cmluZy1maWx0ZXJcIj48L25nLWNvbnRlbnQ+XG5cbiAgICAgICAgICA8Y2xyLWRnLXN0cmluZy1maWx0ZXJcbiAgICAgICAgICAgICAgICAgICpuZ0lmPVwiZmllbGQgJiYgIWN1c3RvbUZpbHRlclwiXG4gICAgICAgICAgICAgICAgICBbY2xyRGdTdHJpbmdGaWx0ZXJdPVwicmVnaXN0ZXJlZFwiXG4gICAgICAgICAgICAgICAgICBbKGNsckZpbHRlclZhbHVlKV09XCJmaWx0ZXJWYWx1ZVwiPjwvY2xyLWRnLXN0cmluZy1maWx0ZXI+XG5cbiAgICAgICAgICA8bmctdGVtcGxhdGUgI2NvbHVtblRpdGxlPlxuICAgICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJkYXRhZ3JpZC1jb2x1bW4tdGl0bGVcIiAqbmdJZj1cInNvcnRhYmxlXCIgKGNsaWNrKT1cInNvcnQoKVwiIHR5cGU9XCJidXR0b25cIj5cbiAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImNvbHVtblRpdGxlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgIDxjbHItaWNvblxuICAgICAgICAgICAgICAgICAgICAgICpuZ0lmPVwic29ydEljb25cIlxuICAgICAgICAgICAgICAgICAgICAgIFthdHRyLnNoYXBlXT1cInNvcnRJY29uXCJcbiAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInNvcnQtaWNvblwiPjwvY2xyLWljb24+XG4gICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImRhdGFncmlkLWNvbHVtbi10aXRsZVwiICpuZ0lmPVwiIXNvcnRhYmxlXCI+XG4gICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiY29sdW1uVGl0bGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDwvc3Bhbj5cblxuICAgICAgICAgIDxjbHItZGctY29sdW1uLXNlcGFyYXRvcj48L2Nsci1kZy1jb2x1bW4tc2VwYXJhdG9yPlxuICAgICAgPC9kaXY+XG4gIGAsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmRhdGFncmlkLWNvbHVtbl0nOiAndHJ1ZScsXG4gICAgJ1tjbGFzcy5kYXRhZ3JpZC1jb2x1bW4tLWhpZGRlbl0nOiAnaGlkZGVuJyxcbiAgICAnW2F0dHIuYXJpYS1zb3J0XSc6ICdhcmlhU29ydCcsXG4gICAgcm9sZTogJ2NvbHVtbmhlYWRlcicsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIENsckRhdGFncmlkQ29sdW1uPFQgPSBhbnk+IGV4dGVuZHMgRGF0YWdyaWRGaWx0ZXJSZWdpc3RyYXI8VCwgRGF0YWdyaWRTdHJpbmdGaWx0ZXJJbXBsPFQ+PlxuICBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25Jbml0IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfc29ydDogU29ydDxUPiwgZmlsdGVyczogRmlsdGVyc1Byb3ZpZGVyPFQ+LCBwcml2YXRlIHZjcjogVmlld0NvbnRhaW5lclJlZikge1xuICAgIHN1cGVyKGZpbHRlcnMpO1xuICAgIHRoaXMuX3NvcnRTdWJzY3JpcHRpb24gPSBfc29ydC5jaGFuZ2Uuc3Vic2NyaWJlKHNvcnQgPT4ge1xuICAgICAgLy8gV2UncmUgb25seSBsaXN0ZW5pbmcgdG8gbWFrZSBzdXJlIHdlIGVtaXQgYW4gZXZlbnQgd2hlbiB0aGUgY29sdW1uIGdvZXMgZnJvbSBzb3J0ZWQgdG8gdW5zb3J0ZWRcbiAgICAgIGlmICh0aGlzLnNvcnRPcmRlciAhPT0gQ2xyRGF0YWdyaWRTb3J0T3JkZXIuVU5TT1JURUQgJiYgc29ydC5jb21wYXJhdG9yICE9PSB0aGlzLl9zb3J0QnkpIHtcbiAgICAgICAgdGhpcy5fc29ydE9yZGVyID0gQ2xyRGF0YWdyaWRTb3J0T3JkZXIuVU5TT1JURUQ7XG4gICAgICAgIHRoaXMuc29ydE9yZGVyQ2hhbmdlLmVtaXQodGhpcy5fc29ydE9yZGVyKTtcbiAgICAgICAgLy8gcmVtb3ZlcyB0aGUgc29ydEljb24gd2hlbiBjb2x1bW4gYmVjb21lcyB1bnNvcnRlZFxuICAgICAgICB0aGlzLnNvcnRJY29uID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIC8vIGRlcHJlY2F0ZWQ6IHRvIGJlIHJlbW92ZWQgLSBTVEFSVFxuICAgICAgaWYgKHRoaXMuc29ydGVkICYmIHNvcnQuY29tcGFyYXRvciAhPT0gdGhpcy5fc29ydEJ5KSB7XG4gICAgICAgIHRoaXMuX3NvcnRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNvcnRlZENoYW5nZS5lbWl0KGZhbHNlKTtcbiAgICAgIH1cbiAgICAgIC8vIGRlcHJlY2F0ZWQ6IHRvIGJlIHJlbW92ZWQgLSBFTkRcbiAgICB9KTtcblxuICAgIHRoaXMuY29sdW1uSWQgPSAnZGctY29sLScgKyBuYkNvdW50LnRvU3RyaW5nKCk7IC8vIEFwcHJveGltYXRlIGEgR1VJRFxuICAgIG5iQ291bnQrKztcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJvcGVydHkgY29sdW1uSWRcbiAgICpcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIEEgQ2xyRGF0YWdyaWRDb2x1bW4gY2xhc3MgdmFyaWFibGUgdGhhdCBob2xkcyB0aGUgbnVtYmVyIG9mIENsckRhdGFncmlkQ29sdW1uIGluc3RhbmNlcyBmb3IgYSBEYXRhZ3JpZC5cbiAgICogSXQgaXMgdXNlZCB0byBnZW5lcmF0ZSBhIHVuaXF1ZSBpZCBmb3IgdGhlIENsckRhdGFncmlkQ29sdW1uIGluc3RhbmNlLlxuICAgKlxuICAgKi9cbiAgcHVibGljIGNvbHVtbklkOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEBwcm9wZXJ0eSBoaWRkZW5cbiAgICpcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIEEgcHJvcGVydHkgdGhhdCBhbGxvd3MgdGhlIGNvbHVtbiB0byBiZSBoaWRkZW4gLyBzaG93biB3aXRoIGNzc1xuICAgKiBOb3RlIHRoZSBkZWZhdWx0IGFsbG93cyB0aGUgQ2xyRGF0YWdyaWRDb2x1bW4gdG8gaGF2ZSBhbiAqbmdJZiBvbiBpdC4gKEVIQ0FJV0MgLSB3aWxsIG9jY3VyIGlmIGl0cyBub3RcbiAgICogaW5pdGlhbGl6ZWQpXG4gICAqXG4gICAqIEBkZWZhdWx0IGZhbHNlXG4gICAqXG4gICAqL1xuICBwdWJsaWMgZ2V0IGhpZGRlbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISF0aGlzLmhpZGVhYmxlICYmIHRoaXMuaGlkZWFibGUuaGlkZGVuO1xuICB9XG5cbiAgLyoqXG4gICAqIFN1YnNjcmlwdGlvbiB0byB0aGUgc29ydCBzZXJ2aWNlIGNoYW5nZXNcbiAgICovXG4gIHByaXZhdGUgX3NvcnRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9zb3J0U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICAvKlxuICAgICAqIFNpbXBsZSBvYmplY3QgcHJvcGVydHkgc2hvcnRjdXQsIGFjdGl2YXRlcyBib3RoIHNvcnRpbmcgYW5kIGZpbHRlcmluZ1xuICAgICAqIGJhc2VkIG9uIG5hdGl2ZSBjb21wYXJpc29uIG9mIHRoZSBzcGVjaWZpZWQgcHJvcGVydHkgb24gdGhlIGl0ZW1zLlxuICAgICAqL1xuICBwcml2YXRlIF9maWVsZDogc3RyaW5nO1xuICBwdWJsaWMgZ2V0IGZpZWxkKCkge1xuICAgIHJldHVybiB0aGlzLl9maWVsZDtcbiAgfVxuXG4gIEBJbnB1dCgnY2xyRGdGaWVsZCcpXG4gIHB1YmxpYyBzZXQgZmllbGQoZmllbGQ6IHN0cmluZykge1xuICAgIGlmICh0eXBlb2YgZmllbGQgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLl9maWVsZCA9IGZpZWxkO1xuICAgICAgaWYgKCF0aGlzLmN1c3RvbUZpbHRlcikge1xuICAgICAgICB0aGlzLnNldEZpbHRlcihuZXcgRGF0YWdyaWRTdHJpbmdGaWx0ZXJJbXBsKG5ldyBEYXRhZ3JpZFByb3BlcnR5U3RyaW5nRmlsdGVyKGZpZWxkKSkpO1xuICAgICAgfVxuICAgICAgaWYgKCF0aGlzLl9zb3J0QnkpIHtcbiAgICAgICAgdGhpcy5fc29ydEJ5ID0gbmV3IERhdGFncmlkUHJvcGVydHlDb21wYXJhdG9yKGZpZWxkKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2xyRGF0YWdyaWRDb21wYXJhdG9ySW50ZXJmYWNlIHRvIHVzZSB3aGVuIHNvcnRpbmcgdGhlIGNvbHVtblxuICAgKi9cblxuICBwcml2YXRlIF9zb3J0Qnk6IENsckRhdGFncmlkQ29tcGFyYXRvckludGVyZmFjZTxUPjtcblxuICBwdWJsaWMgZ2V0IHNvcnRCeSgpIHtcbiAgICByZXR1cm4gdGhpcy5fc29ydEJ5O1xuICB9XG5cbiAgQElucHV0KCdjbHJEZ1NvcnRCeScpXG4gIHB1YmxpYyBzZXQgc29ydEJ5KGNvbXBhcmF0b3I6IENsckRhdGFncmlkQ29tcGFyYXRvckludGVyZmFjZTxUPiB8IHN0cmluZykge1xuICAgIGlmICh0eXBlb2YgY29tcGFyYXRvciA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMuX3NvcnRCeSA9IG5ldyBEYXRhZ3JpZFByb3BlcnR5Q29tcGFyYXRvcihjb21wYXJhdG9yKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGNvbXBhcmF0b3IpIHtcbiAgICAgICAgdGhpcy5fc29ydEJ5ID0gY29tcGFyYXRvcjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLl9maWVsZCkge1xuICAgICAgICAgIHRoaXMuX3NvcnRCeSA9IG5ldyBEYXRhZ3JpZFByb3BlcnR5Q29tcGFyYXRvcih0aGlzLl9maWVsZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGVsZXRlIHRoaXMuX3NvcnRCeTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgaWYgdGhlIGNvbHVtbiBpcyBzb3J0YWJsZVxuICAgKi9cbiAgcHVibGljIGdldCBzb3J0YWJsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISF0aGlzLl9zb3J0Qnk7XG4gIH1cblxuICAvLyBkZXByZWNhdGVkOiB0byBiZSByZW1vdmVkIC0gU1RBUlRcbiAgLyoqXG4gICAqIEluZGljYXRlcyBpZiB0aGUgY29sdW1uIGlzIGN1cnJlbnRseSBzb3J0ZWRcbiAgICpcbiAgICogQGRlcHJlY2F0ZWQgVGhpcyB3aWxsIGJlIHJlbW92ZWQgc29vbiwgaW4gZmF2b3Igb2YgdGhlIHNvcnRPcmRlciBtZWNoYW5pc21cbiAgICovXG4gIHByaXZhdGUgX3NvcnRlZCA9IGZhbHNlO1xuICBwdWJsaWMgZ2V0IHNvcnRlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fc29ydGVkO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIFRoaXMgd2lsbCBiZSByZW1vdmVkIHNvb24sIGluIGZhdm9yIG9mIHRoZSBzb3J0T3JkZXIgbWVjaGFuaXNtXG4gICAqL1xuICBASW5wdXQoJ2NsckRnU29ydGVkJylcbiAgcHVibGljIHNldCBzb3J0ZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICBpZiAoIXZhbHVlICYmIHRoaXMuc29ydGVkKSB7XG4gICAgICB0aGlzLl9zb3J0ZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuX3NvcnQuY2xlYXIoKTtcbiAgICB9IGVsc2UgaWYgKHZhbHVlICYmICF0aGlzLnNvcnRlZCkge1xuICAgICAgdGhpcy5zb3J0KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIFRoaXMgd2lsbCBiZSByZW1vdmVkIHNvb24sIGluIGZhdm9yIG9mIHRoZSBzb3J0T3JkZXIgbWVjaGFuaXNtXG4gICAqL1xuICBAT3V0cHV0KCdjbHJEZ1NvcnRlZENoYW5nZScpIHB1YmxpYyBzb3J0ZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgLy8gZGVwcmVjYXRlZDogdG8gYmUgcmVtb3ZlZCAtIEVORFxuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgaG93IHRoZSBjb2x1bW4gaXMgY3VycmVudGx5IHNvcnRlZFxuICAgKi9cbiAgcHJpdmF0ZSBfc29ydE9yZGVyOiBDbHJEYXRhZ3JpZFNvcnRPcmRlciA9IENsckRhdGFncmlkU29ydE9yZGVyLlVOU09SVEVEO1xuICBwdWJsaWMgZ2V0IHNvcnRPcmRlcigpIHtcbiAgICByZXR1cm4gdGhpcy5fc29ydE9yZGVyO1xuICB9XG5cbiAgQElucHV0KCdjbHJEZ1NvcnRPcmRlcicpXG4gIHB1YmxpYyBzZXQgc29ydE9yZGVyKHZhbHVlOiBDbHJEYXRhZ3JpZFNvcnRPcmRlcikge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gb25seSBpZiB0aGUgaW5jb21pbmcgb3JkZXIgaXMgZGlmZmVyZW50IGZyb20gdGhlIGN1cnJlbnQgb25lXG4gICAgaWYgKHRoaXMuX3NvcnRPcmRlciA9PT0gdmFsdWUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKHZhbHVlKSB7XG4gICAgICAvLyB0aGUgVW5zb3J0ZWQgY2FzZSBoYXBwZW5zIHdoZW4gdGhlIGN1cnJlbnQgc3RhdGUgaXMgZWl0aGVyIEFzYyBvciBEZXNjXG4gICAgICBkZWZhdWx0OlxuICAgICAgY2FzZSBDbHJEYXRhZ3JpZFNvcnRPcmRlci5VTlNPUlRFRDpcbiAgICAgICAgdGhpcy5fc29ydC5jbGVhcigpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgQ2xyRGF0YWdyaWRTb3J0T3JkZXIuQVNDOlxuICAgICAgICB0aGlzLnNvcnQoZmFsc2UpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgQ2xyRGF0YWdyaWRTb3J0T3JkZXIuREVTQzpcbiAgICAgICAgdGhpcy5zb3J0KHRydWUpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0IGFyaWFTb3J0KCkge1xuICAgIHN3aXRjaCAodGhpcy5fc29ydE9yZGVyKSB7XG4gICAgICBkZWZhdWx0OlxuICAgICAgY2FzZSBDbHJEYXRhZ3JpZFNvcnRPcmRlci5VTlNPUlRFRDpcbiAgICAgICAgcmV0dXJuICdub25lJztcbiAgICAgIGNhc2UgQ2xyRGF0YWdyaWRTb3J0T3JkZXIuQVNDOlxuICAgICAgICByZXR1cm4gJ2FzY2VuZGluZyc7XG4gICAgICBjYXNlIENsckRhdGFncmlkU29ydE9yZGVyLkRFU0M6XG4gICAgICAgIHJldHVybiAnZGVzY2VuZGluZyc7XG4gICAgfVxuICB9XG5cbiAgQE91dHB1dCgnY2xyRGdTb3J0T3JkZXJDaGFuZ2UnKSBwdWJsaWMgc29ydE9yZGVyQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxDbHJEYXRhZ3JpZFNvcnRPcmRlcj4oKTtcblxuICAvKipcbiAgICogU29ydHMgdGhlIGRhdGFncmlkIGJhc2VkIG9uIHRoaXMgY29sdW1uXG4gICAqL1xuICBwdWJsaWMgc29ydChyZXZlcnNlPzogYm9vbGVhbikge1xuICAgIGlmICghdGhpcy5zb3J0YWJsZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX3NvcnQudG9nZ2xlKHRoaXMuX3NvcnRCeSwgcmV2ZXJzZSk7XG5cbiAgICAvLyBzZXR0aW5nIHRoZSBwcml2YXRlIHZhcmlhYmxlIHRvIG5vdCByZXRyaWdnZXIgdGhlIHNldHRlciBsb2dpY1xuICAgIHRoaXMuX3NvcnRPcmRlciA9IHRoaXMuX3NvcnQucmV2ZXJzZSA/IENsckRhdGFncmlkU29ydE9yZGVyLkRFU0MgOiBDbHJEYXRhZ3JpZFNvcnRPcmRlci5BU0M7XG4gICAgLy8gU2V0cyB0aGUgY29ycmVjdCBpY29uIGZvciBjdXJyZW50IHNvcnQgb3JkZXJcbiAgICB0aGlzLnNvcnRJY29uID0gdGhpcy5fc29ydE9yZGVyID09PSBDbHJEYXRhZ3JpZFNvcnRPcmRlci5ERVNDID8gJ2Fycm93IGRvd24nIDogJ2Fycm93JztcbiAgICB0aGlzLnNvcnRPcmRlckNoYW5nZS5lbWl0KHRoaXMuX3NvcnRPcmRlcik7XG5cbiAgICAvLyBkZXByZWNhdGVkOiB0byBiZSByZW1vdmVkIC0gU1RBUlRcbiAgICB0aGlzLl9zb3J0ZWQgPSB0cnVlO1xuICAgIHRoaXMuc29ydGVkQ2hhbmdlLmVtaXQodHJ1ZSk7XG4gICAgLy8gZGVwcmVjYXRlZDogdG8gYmUgcmVtb3ZlZCAtIEVORFxuICB9XG5cbiAgcHVibGljIHNvcnRJY29uO1xuXG4gIC8qKlxuICAgKiBBIGN1c3RvbSBmaWx0ZXIgZm9yIHRoaXMgY29sdW1uIHRoYXQgY2FuIGJlIHByb3ZpZGVkIGluIHRoZSBwcm9qZWN0ZWQgY29udGVudFxuICAgKi9cbiAgcHVibGljIGN1c3RvbUZpbHRlciA9IGZhbHNlO1xuXG4gIEBDb250ZW50Q2hpbGQoQ3VzdG9tRmlsdGVyKVxuICBwdWJsaWMgc2V0IHByb2plY3RlZEZpbHRlcihjdXN0b206IGFueSkge1xuICAgIGlmIChjdXN0b20pIHtcbiAgICAgIHRoaXMuZGVsZXRlRmlsdGVyKCk7XG4gICAgICB0aGlzLmN1c3RvbUZpbHRlciA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldCBmaWx0ZXJWYWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5maWx0ZXIudmFsdWU7XG4gIH1cblxuICBASW5wdXQoJ2NsckZpbHRlclZhbHVlJylcbiAgcHVibGljIHNldCB1cGRhdGVGaWx0ZXJWYWx1ZShuZXdWYWx1ZTogc3RyaW5nKSB7XG4gICAgaWYgKCF0aGlzLmZpbHRlcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIW5ld1ZhbHVlKSB7XG4gICAgICBuZXdWYWx1ZSA9ICcnO1xuICAgIH1cbiAgICBpZiAobmV3VmFsdWUgIT09IHRoaXMuZmlsdGVyLnZhbHVlKSB7XG4gICAgICB0aGlzLmZpbHRlci52YWx1ZSA9IG5ld1ZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzZXQgZmlsdGVyVmFsdWUobmV3VmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMudXBkYXRlRmlsdGVyVmFsdWUgPSBuZXdWYWx1ZTtcbiAgICB0aGlzLmZpbHRlclZhbHVlQ2hhbmdlLmVtaXQodGhpcy5maWx0ZXIudmFsdWUpO1xuICB9XG5cbiAgQE91dHB1dCgnY2xyRmlsdGVyVmFsdWVDaGFuZ2UnKSBmaWx0ZXJWYWx1ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAvKioqKioqKioqKipcbiAgICpcbiAgICogQHByb3BlcnR5IGhpZGVhYmxlXG4gICAqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBXaGVuIGEgY29sdW1uIGlzIGhpZGVhYmxlIHRoaXMgaXMgZGVmaW5lZCB3aXRoIGFuIGluc3RhbmNlIG9mIERhdGFncmlkSGlkZWFibGVDb2x1bW5Nb2RlbC5cbiAgICogV2hlbiBpdHMgbm90IGhpZGVhYmxlIHNob3VsZCBiZSB1bmRlZmluZWQuXG4gICAqXG4gICAqL1xuICBwdWJsaWMgaGlkZWFibGU6IERhdGFncmlkSGlkZWFibGVDb2x1bW5Nb2RlbDtcblxuICBwcml2YXRlIHdyYXBwZWRJbmplY3RvcjogSW5qZWN0b3I7XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy53cmFwcGVkSW5qZWN0b3IgPSBuZXcgSG9zdFdyYXBwZXIoV3JhcHBlZENvbHVtbiwgdGhpcy52Y3IpO1xuICB9XG5cbiAgcHVibGljIGdldCBfdmlldygpIHtcbiAgICByZXR1cm4gdGhpcy53cmFwcGVkSW5qZWN0b3IuZ2V0KFdyYXBwZWRDb2x1bW4sIHRoaXMudmNyKS5jb2x1bW5WaWV3O1xuICB9XG59XG4iXX0=