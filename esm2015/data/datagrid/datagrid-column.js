/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        this._sortSubscription = _sort.change.subscribe((/**
         * @param {?} sort
         * @return {?}
         */
        sort => {
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
        }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtY29sdW1uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9kYXRhZ3JpZC1jb2x1bW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUNMLFNBQVMsRUFDVCxZQUFZLEVBQ1osWUFBWSxFQUVaLEtBQUssRUFHTCxNQUFNLEVBQ04sZ0JBQWdCLEdBQ2pCLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxxREFBcUQsQ0FBQztBQUNqRyxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUNsRyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUUxRixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUUvRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDekQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUN4QyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUM1RSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7O0lBRTdDLE9BQU8sR0FBVyxDQUFDOzs7O0FBd0N2QixNQUFNLE9BQU8saUJBQTJCLFNBQVEsdUJBQXVEOzs7Ozs7SUFFckcsWUFBb0IsS0FBYyxFQUFFLE9BQTJCLEVBQVUsR0FBcUI7UUFDNUYsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBREcsVUFBSyxHQUFMLEtBQUssQ0FBUztRQUF1QyxRQUFHLEdBQUgsR0FBRyxDQUFrQjs7Ozs7OztRQXNIdEYsWUFBTyxHQUFHLEtB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RTtvQkFDSix5QkFBeUIsRUFBRSxNQUFNO29CQUNqQyxpQ0FBaUMsRUFBRSxRQUFRO29CQUMzQyxrQkFBa0IsRUFBRSxVQUFVO29CQUM5QixJQUFJLEVBQUUsY0FBYztpQkFDckI7YUFDRjs7OztZQTNDUSxJQUFJO1lBREosZUFBZTtZQVp0QixnQkFBZ0I7OztvQkE0SGYsS0FBSyxTQUFDLFlBQVk7cUJBdUJsQixLQUFLLFNBQUMsYUFBYTtxQkFzQ25CLEtBQUssU0FBQyxhQUFhOzJCQWFuQixNQUFNLFNBQUMsbUJBQW1CO3dCQVkxQixLQUFLLFNBQUMsZ0JBQWdCOzhCQXNDdEIsTUFBTSxTQUFDLHNCQUFzQjs4QkErQjdCLFlBQVksU0FBQyxZQUFZO2dDQVl6QixLQUFLLFNBQUMsZ0JBQWdCO2dDQWtCdEIsTUFBTSxTQUFDLHNCQUFzQjs7Ozs7Ozs7Ozs7O0lBNU45QixxQ0FBd0I7Ozs7OztJQW9CeEIsOENBQXdDOzs7OztJQVV4QyxtQ0FBdUI7Ozs7OztJQXNCdkIsb0NBQW1EOzs7Ozs7OztJQW9DbkQsb0NBQXdCOzs7OztJQXFCeEIseUNBQStFOzs7Ozs7SUFPL0UsdUNBQXlFOztJQTJDekUsNENBQWtHOztJQXdCbEcscUNBQWdCOzs7OztJQUtoQix5Q0FBNEI7O0lBZ0M1Qiw4Q0FBdUU7Ozs7Ozs7Ozs7OztJQVd2RSxxQ0FBNkM7Ozs7O0lBRTdDLDRDQUFrQzs7Ozs7SUF2UXRCLGtDQUFzQjs7Ozs7SUFBK0IsZ0NBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5qZWN0b3IsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBWaWV3Q29udGFpbmVyUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBIb3N0V3JhcHBlciB9IGZyb20gJy4uLy4uL3V0aWxzL2hvc3Qtd3JhcHBpbmcvaG9zdC13cmFwcGVyJztcbmltcG9ydCB7IERhdGFncmlkUHJvcGVydHlDb21wYXJhdG9yIH0gZnJvbSAnLi9idWlsdC1pbi9jb21wYXJhdG9ycy9kYXRhZ3JpZC1wcm9wZXJ0eS1jb21wYXJhdG9yJztcbmltcG9ydCB7IERhdGFncmlkUHJvcGVydHlTdHJpbmdGaWx0ZXIgfSBmcm9tICcuL2J1aWx0LWluL2ZpbHRlcnMvZGF0YWdyaWQtcHJvcGVydHktc3RyaW5nLWZpbHRlcic7XG5pbXBvcnQgeyBEYXRhZ3JpZFN0cmluZ0ZpbHRlckltcGwgfSBmcm9tICcuL2J1aWx0LWluL2ZpbHRlcnMvZGF0YWdyaWQtc3RyaW5nLWZpbHRlci1pbXBsJztcbmltcG9ydCB7IERhdGFncmlkSGlkZWFibGVDb2x1bW5Nb2RlbCB9IGZyb20gJy4vZGF0YWdyaWQtaGlkZWFibGUtY29sdW1uLm1vZGVsJztcbmltcG9ydCB7IENsckRhdGFncmlkU29ydE9yZGVyIH0gZnJvbSAnLi9lbnVtcy9zb3J0LW9yZGVyLmVudW0nO1xuaW1wb3J0IHsgQ2xyRGF0YWdyaWRDb21wYXJhdG9ySW50ZXJmYWNlIH0gZnJvbSAnLi9pbnRlcmZhY2VzL2NvbXBhcmF0b3IuaW50ZXJmYWNlJztcbmltcG9ydCB7IEN1c3RvbUZpbHRlciB9IGZyb20gJy4vcHJvdmlkZXJzL2N1c3RvbS1maWx0ZXInO1xuaW1wb3J0IHsgRmlsdGVyc1Byb3ZpZGVyIH0gZnJvbSAnLi9wcm92aWRlcnMvZmlsdGVycyc7XG5pbXBvcnQgeyBTb3J0IH0gZnJvbSAnLi9wcm92aWRlcnMvc29ydCc7XG5pbXBvcnQgeyBEYXRhZ3JpZEZpbHRlclJlZ2lzdHJhciB9IGZyb20gJy4vdXRpbHMvZGF0YWdyaWQtZmlsdGVyLXJlZ2lzdHJhcic7XG5pbXBvcnQgeyBXcmFwcGVkQ29sdW1uIH0gZnJvbSAnLi93cmFwcGVkLWNvbHVtbic7XG5cbmxldCBuYkNvdW50OiBudW1iZXIgPSAwO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItZGctY29sdW1uJyxcbiAgdGVtcGxhdGU6IGBcbiAgICAgIDxkaXYgY2xhc3M9XCJkYXRhZ3JpZC1jb2x1bW4tZmxleFwiPlxuICAgICAgICAgIDwhLS0gSSdtIHJlYWxseSBub3QgaGFwcHkgd2l0aCB0aGF0IHNlbGVjdCBzaW5jZSBpdCdzIG5vdCB2ZXJ5IHNjYWxhYmxlIC0tPlxuICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImNsci1kZy1maWx0ZXIsIGNsci1kZy1zdHJpbmctZmlsdGVyXCI+PC9uZy1jb250ZW50PlxuXG4gICAgICAgICAgPGNsci1kZy1zdHJpbmctZmlsdGVyXG4gICAgICAgICAgICAgICAgICAqbmdJZj1cImZpZWxkICYmICFjdXN0b21GaWx0ZXJcIlxuICAgICAgICAgICAgICAgICAgW2NsckRnU3RyaW5nRmlsdGVyXT1cInJlZ2lzdGVyZWRcIlxuICAgICAgICAgICAgICAgICAgWyhjbHJGaWx0ZXJWYWx1ZSldPVwiZmlsdGVyVmFsdWVcIj48L2Nsci1kZy1zdHJpbmctZmlsdGVyPlxuXG4gICAgICAgICAgPG5nLXRlbXBsYXRlICNjb2x1bW5UaXRsZT5cbiAgICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZGF0YWdyaWQtY29sdW1uLXRpdGxlXCIgKm5nSWY9XCJzb3J0YWJsZVwiIChjbGljayk9XCJzb3J0KClcIiB0eXBlPVwiYnV0dG9uXCI+XG4gICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJjb2x1bW5UaXRsZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICA8Y2xyLWljb25cbiAgICAgICAgICAgICAgICAgICAgICAqbmdJZj1cInNvcnRJY29uXCJcbiAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5zaGFwZV09XCJzb3J0SWNvblwiXG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJzb3J0LWljb25cIj48L2Nsci1pY29uPlxuICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJkYXRhZ3JpZC1jb2x1bW4tdGl0bGVcIiAqbmdJZj1cIiFzb3J0YWJsZVwiPlxuICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImNvbHVtblRpdGxlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8L3NwYW4+XG5cbiAgICAgICAgICA8Y2xyLWRnLWNvbHVtbi1zZXBhcmF0b3I+PC9jbHItZGctY29sdW1uLXNlcGFyYXRvcj5cbiAgICAgIDwvZGl2PlxuICBgLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5kYXRhZ3JpZC1jb2x1bW5dJzogJ3RydWUnLFxuICAgICdbY2xhc3MuZGF0YWdyaWQtY29sdW1uLS1oaWRkZW5dJzogJ2hpZGRlbicsXG4gICAgJ1thdHRyLmFyaWEtc29ydF0nOiAnYXJpYVNvcnQnLFxuICAgIHJvbGU6ICdjb2x1bW5oZWFkZXInLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBDbHJEYXRhZ3JpZENvbHVtbjxUID0gYW55PiBleHRlbmRzIERhdGFncmlkRmlsdGVyUmVnaXN0cmFyPFQsIERhdGFncmlkU3RyaW5nRmlsdGVySW1wbDxUPj5cbiAgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uSW5pdCB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3NvcnQ6IFNvcnQ8VD4sIGZpbHRlcnM6IEZpbHRlcnNQcm92aWRlcjxUPiwgcHJpdmF0ZSB2Y3I6IFZpZXdDb250YWluZXJSZWYpIHtcbiAgICBzdXBlcihmaWx0ZXJzKTtcbiAgICB0aGlzLl9zb3J0U3Vic2NyaXB0aW9uID0gX3NvcnQuY2hhbmdlLnN1YnNjcmliZShzb3J0ID0+IHtcbiAgICAgIC8vIFdlJ3JlIG9ubHkgbGlzdGVuaW5nIHRvIG1ha2Ugc3VyZSB3ZSBlbWl0IGFuIGV2ZW50IHdoZW4gdGhlIGNvbHVtbiBnb2VzIGZyb20gc29ydGVkIHRvIHVuc29ydGVkXG4gICAgICBpZiAodGhpcy5zb3J0T3JkZXIgIT09IENsckRhdGFncmlkU29ydE9yZGVyLlVOU09SVEVEICYmIHNvcnQuY29tcGFyYXRvciAhPT0gdGhpcy5fc29ydEJ5KSB7XG4gICAgICAgIHRoaXMuX3NvcnRPcmRlciA9IENsckRhdGFncmlkU29ydE9yZGVyLlVOU09SVEVEO1xuICAgICAgICB0aGlzLnNvcnRPcmRlckNoYW5nZS5lbWl0KHRoaXMuX3NvcnRPcmRlcik7XG4gICAgICAgIC8vIHJlbW92ZXMgdGhlIHNvcnRJY29uIHdoZW4gY29sdW1uIGJlY29tZXMgdW5zb3J0ZWRcbiAgICAgICAgdGhpcy5zb3J0SWNvbiA9IG51bGw7XG4gICAgICB9XG4gICAgICAvLyBkZXByZWNhdGVkOiB0byBiZSByZW1vdmVkIC0gU1RBUlRcbiAgICAgIGlmICh0aGlzLnNvcnRlZCAmJiBzb3J0LmNvbXBhcmF0b3IgIT09IHRoaXMuX3NvcnRCeSkge1xuICAgICAgICB0aGlzLl9zb3J0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zb3J0ZWRDaGFuZ2UuZW1pdChmYWxzZSk7XG4gICAgICB9XG4gICAgICAvLyBkZXByZWNhdGVkOiB0byBiZSByZW1vdmVkIC0gRU5EXG4gICAgfSk7XG5cbiAgICB0aGlzLmNvbHVtbklkID0gJ2RnLWNvbC0nICsgbmJDb3VudC50b1N0cmluZygpOyAvLyBBcHByb3hpbWF0ZSBhIEdVSURcbiAgICBuYkNvdW50Kys7XG4gIH1cblxuICAvKipcbiAgICogQHByb3BlcnR5IGNvbHVtbklkXG4gICAqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBBIENsckRhdGFncmlkQ29sdW1uIGNsYXNzIHZhcmlhYmxlIHRoYXQgaG9sZHMgdGhlIG51bWJlciBvZiBDbHJEYXRhZ3JpZENvbHVtbiBpbnN0YW5jZXMgZm9yIGEgRGF0YWdyaWQuXG4gICAqIEl0IGlzIHVzZWQgdG8gZ2VuZXJhdGUgYSB1bmlxdWUgaWQgZm9yIHRoZSBDbHJEYXRhZ3JpZENvbHVtbiBpbnN0YW5jZS5cbiAgICpcbiAgICovXG4gIHB1YmxpYyBjb2x1bW5JZDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBAcHJvcGVydHkgaGlkZGVuXG4gICAqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBBIHByb3BlcnR5IHRoYXQgYWxsb3dzIHRoZSBjb2x1bW4gdG8gYmUgaGlkZGVuIC8gc2hvd24gd2l0aCBjc3NcbiAgICogTm90ZSB0aGUgZGVmYXVsdCBhbGxvd3MgdGhlIENsckRhdGFncmlkQ29sdW1uIHRvIGhhdmUgYW4gKm5nSWYgb24gaXQuIChFSENBSVdDIC0gd2lsbCBvY2N1ciBpZiBpdHMgbm90XG4gICAqIGluaXRpYWxpemVkKVxuICAgKlxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKlxuICAgKi9cbiAgcHVibGljIGdldCBoaWRkZW4oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy5oaWRlYWJsZSAmJiB0aGlzLmhpZGVhYmxlLmhpZGRlbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdWJzY3JpcHRpb24gdG8gdGhlIHNvcnQgc2VydmljZSBjaGFuZ2VzXG4gICAqL1xuICBwcml2YXRlIF9zb3J0U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fc29ydFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgLypcbiAgICAgKiBTaW1wbGUgb2JqZWN0IHByb3BlcnR5IHNob3J0Y3V0LCBhY3RpdmF0ZXMgYm90aCBzb3J0aW5nIGFuZCBmaWx0ZXJpbmdcbiAgICAgKiBiYXNlZCBvbiBuYXRpdmUgY29tcGFyaXNvbiBvZiB0aGUgc3BlY2lmaWVkIHByb3BlcnR5IG9uIHRoZSBpdGVtcy5cbiAgICAgKi9cbiAgcHJpdmF0ZSBfZmllbGQ6IHN0cmluZztcbiAgcHVibGljIGdldCBmaWVsZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fZmllbGQ7XG4gIH1cblxuICBASW5wdXQoJ2NsckRnRmllbGQnKVxuICBwdWJsaWMgc2V0IGZpZWxkKGZpZWxkOiBzdHJpbmcpIHtcbiAgICBpZiAodHlwZW9mIGZpZWxkID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5fZmllbGQgPSBmaWVsZDtcbiAgICAgIGlmICghdGhpcy5jdXN0b21GaWx0ZXIpIHtcbiAgICAgICAgdGhpcy5zZXRGaWx0ZXIobmV3IERhdGFncmlkU3RyaW5nRmlsdGVySW1wbChuZXcgRGF0YWdyaWRQcm9wZXJ0eVN0cmluZ0ZpbHRlcihmaWVsZCkpKTtcbiAgICAgIH1cbiAgICAgIGlmICghdGhpcy5fc29ydEJ5KSB7XG4gICAgICAgIHRoaXMuX3NvcnRCeSA9IG5ldyBEYXRhZ3JpZFByb3BlcnR5Q29tcGFyYXRvcihmaWVsZCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENsckRhdGFncmlkQ29tcGFyYXRvckludGVyZmFjZSB0byB1c2Ugd2hlbiBzb3J0aW5nIHRoZSBjb2x1bW5cbiAgICovXG5cbiAgcHJpdmF0ZSBfc29ydEJ5OiBDbHJEYXRhZ3JpZENvbXBhcmF0b3JJbnRlcmZhY2U8VD47XG5cbiAgcHVibGljIGdldCBzb3J0QnkoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3NvcnRCeTtcbiAgfVxuXG4gIEBJbnB1dCgnY2xyRGdTb3J0QnknKVxuICBwdWJsaWMgc2V0IHNvcnRCeShjb21wYXJhdG9yOiBDbHJEYXRhZ3JpZENvbXBhcmF0b3JJbnRlcmZhY2U8VD4gfCBzdHJpbmcpIHtcbiAgICBpZiAodHlwZW9mIGNvbXBhcmF0b3IgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLl9zb3J0QnkgPSBuZXcgRGF0YWdyaWRQcm9wZXJ0eUNvbXBhcmF0b3IoY29tcGFyYXRvcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChjb21wYXJhdG9yKSB7XG4gICAgICAgIHRoaXMuX3NvcnRCeSA9IGNvbXBhcmF0b3I7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGhpcy5fZmllbGQpIHtcbiAgICAgICAgICB0aGlzLl9zb3J0QnkgPSBuZXcgRGF0YWdyaWRQcm9wZXJ0eUNvbXBhcmF0b3IodGhpcy5fZmllbGQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRlbGV0ZSB0aGlzLl9zb3J0Qnk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSW5kaWNhdGVzIGlmIHRoZSBjb2x1bW4gaXMgc29ydGFibGVcbiAgICovXG4gIHB1YmxpYyBnZXQgc29ydGFibGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy5fc29ydEJ5O1xuICB9XG5cbiAgLy8gZGVwcmVjYXRlZDogdG8gYmUgcmVtb3ZlZCAtIFNUQVJUXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgaWYgdGhlIGNvbHVtbiBpcyBjdXJyZW50bHkgc29ydGVkXG4gICAqXG4gICAqIEBkZXByZWNhdGVkIFRoaXMgd2lsbCBiZSByZW1vdmVkIHNvb24sIGluIGZhdm9yIG9mIHRoZSBzb3J0T3JkZXIgbWVjaGFuaXNtXG4gICAqL1xuICBwcml2YXRlIF9zb3J0ZWQgPSBmYWxzZTtcbiAgcHVibGljIGdldCBzb3J0ZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3NvcnRlZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBUaGlzIHdpbGwgYmUgcmVtb3ZlZCBzb29uLCBpbiBmYXZvciBvZiB0aGUgc29ydE9yZGVyIG1lY2hhbmlzbVxuICAgKi9cbiAgQElucHV0KCdjbHJEZ1NvcnRlZCcpXG4gIHB1YmxpYyBzZXQgc29ydGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgaWYgKCF2YWx1ZSAmJiB0aGlzLnNvcnRlZCkge1xuICAgICAgdGhpcy5fc29ydGVkID0gZmFsc2U7XG4gICAgICB0aGlzLl9zb3J0LmNsZWFyKCk7XG4gICAgfSBlbHNlIGlmICh2YWx1ZSAmJiAhdGhpcy5zb3J0ZWQpIHtcbiAgICAgIHRoaXMuc29ydCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBUaGlzIHdpbGwgYmUgcmVtb3ZlZCBzb29uLCBpbiBmYXZvciBvZiB0aGUgc29ydE9yZGVyIG1lY2hhbmlzbVxuICAgKi9cbiAgQE91dHB1dCgnY2xyRGdTb3J0ZWRDaGFuZ2UnKSBwdWJsaWMgc29ydGVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gIC8vIGRlcHJlY2F0ZWQ6IHRvIGJlIHJlbW92ZWQgLSBFTkRcblxuICAvKipcbiAgICogSW5kaWNhdGVzIGhvdyB0aGUgY29sdW1uIGlzIGN1cnJlbnRseSBzb3J0ZWRcbiAgICovXG4gIHByaXZhdGUgX3NvcnRPcmRlcjogQ2xyRGF0YWdyaWRTb3J0T3JkZXIgPSBDbHJEYXRhZ3JpZFNvcnRPcmRlci5VTlNPUlRFRDtcbiAgcHVibGljIGdldCBzb3J0T3JkZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3NvcnRPcmRlcjtcbiAgfVxuXG4gIEBJbnB1dCgnY2xyRGdTb3J0T3JkZXInKVxuICBwdWJsaWMgc2V0IHNvcnRPcmRlcih2YWx1ZTogQ2xyRGF0YWdyaWRTb3J0T3JkZXIpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIG9ubHkgaWYgdGhlIGluY29taW5nIG9yZGVyIGlzIGRpZmZlcmVudCBmcm9tIHRoZSBjdXJyZW50IG9uZVxuICAgIGlmICh0aGlzLl9zb3J0T3JkZXIgPT09IHZhbHVlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc3dpdGNoICh2YWx1ZSkge1xuICAgICAgLy8gdGhlIFVuc29ydGVkIGNhc2UgaGFwcGVucyB3aGVuIHRoZSBjdXJyZW50IHN0YXRlIGlzIGVpdGhlciBBc2Mgb3IgRGVzY1xuICAgICAgZGVmYXVsdDpcbiAgICAgIGNhc2UgQ2xyRGF0YWdyaWRTb3J0T3JkZXIuVU5TT1JURUQ6XG4gICAgICAgIHRoaXMuX3NvcnQuY2xlYXIoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIENsckRhdGFncmlkU29ydE9yZGVyLkFTQzpcbiAgICAgICAgdGhpcy5zb3J0KGZhbHNlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIENsckRhdGFncmlkU29ydE9yZGVyLkRFU0M6XG4gICAgICAgIHRoaXMuc29ydCh0cnVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldCBhcmlhU29ydCgpIHtcbiAgICBzd2l0Y2ggKHRoaXMuX3NvcnRPcmRlcikge1xuICAgICAgZGVmYXVsdDpcbiAgICAgIGNhc2UgQ2xyRGF0YWdyaWRTb3J0T3JkZXIuVU5TT1JURUQ6XG4gICAgICAgIHJldHVybiAnbm9uZSc7XG4gICAgICBjYXNlIENsckRhdGFncmlkU29ydE9yZGVyLkFTQzpcbiAgICAgICAgcmV0dXJuICdhc2NlbmRpbmcnO1xuICAgICAgY2FzZSBDbHJEYXRhZ3JpZFNvcnRPcmRlci5ERVNDOlxuICAgICAgICByZXR1cm4gJ2Rlc2NlbmRpbmcnO1xuICAgIH1cbiAgfVxuXG4gIEBPdXRwdXQoJ2NsckRnU29ydE9yZGVyQ2hhbmdlJykgcHVibGljIHNvcnRPcmRlckNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Q2xyRGF0YWdyaWRTb3J0T3JkZXI+KCk7XG5cbiAgLyoqXG4gICAqIFNvcnRzIHRoZSBkYXRhZ3JpZCBiYXNlZCBvbiB0aGlzIGNvbHVtblxuICAgKi9cbiAgcHVibGljIHNvcnQocmV2ZXJzZT86IGJvb2xlYW4pIHtcbiAgICBpZiAoIXRoaXMuc29ydGFibGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl9zb3J0LnRvZ2dsZSh0aGlzLl9zb3J0QnksIHJldmVyc2UpO1xuXG4gICAgLy8gc2V0dGluZyB0aGUgcHJpdmF0ZSB2YXJpYWJsZSB0byBub3QgcmV0cmlnZ2VyIHRoZSBzZXR0ZXIgbG9naWNcbiAgICB0aGlzLl9zb3J0T3JkZXIgPSB0aGlzLl9zb3J0LnJldmVyc2UgPyBDbHJEYXRhZ3JpZFNvcnRPcmRlci5ERVNDIDogQ2xyRGF0YWdyaWRTb3J0T3JkZXIuQVNDO1xuICAgIC8vIFNldHMgdGhlIGNvcnJlY3QgaWNvbiBmb3IgY3VycmVudCBzb3J0IG9yZGVyXG4gICAgdGhpcy5zb3J0SWNvbiA9IHRoaXMuX3NvcnRPcmRlciA9PT0gQ2xyRGF0YWdyaWRTb3J0T3JkZXIuREVTQyA/ICdhcnJvdyBkb3duJyA6ICdhcnJvdyc7XG4gICAgdGhpcy5zb3J0T3JkZXJDaGFuZ2UuZW1pdCh0aGlzLl9zb3J0T3JkZXIpO1xuXG4gICAgLy8gZGVwcmVjYXRlZDogdG8gYmUgcmVtb3ZlZCAtIFNUQVJUXG4gICAgdGhpcy5fc29ydGVkID0gdHJ1ZTtcbiAgICB0aGlzLnNvcnRlZENoYW5nZS5lbWl0KHRydWUpO1xuICAgIC8vIGRlcHJlY2F0ZWQ6IHRvIGJlIHJlbW92ZWQgLSBFTkRcbiAgfVxuXG4gIHB1YmxpYyBzb3J0SWNvbjtcblxuICAvKipcbiAgICogQSBjdXN0b20gZmlsdGVyIGZvciB0aGlzIGNvbHVtbiB0aGF0IGNhbiBiZSBwcm92aWRlZCBpbiB0aGUgcHJvamVjdGVkIGNvbnRlbnRcbiAgICovXG4gIHB1YmxpYyBjdXN0b21GaWx0ZXIgPSBmYWxzZTtcblxuICBAQ29udGVudENoaWxkKEN1c3RvbUZpbHRlcilcbiAgcHVibGljIHNldCBwcm9qZWN0ZWRGaWx0ZXIoY3VzdG9tOiBhbnkpIHtcbiAgICBpZiAoY3VzdG9tKSB7XG4gICAgICB0aGlzLmRlbGV0ZUZpbHRlcigpO1xuICAgICAgdGhpcy5jdXN0b21GaWx0ZXIgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXQgZmlsdGVyVmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZmlsdGVyLnZhbHVlO1xuICB9XG5cbiAgQElucHV0KCdjbHJGaWx0ZXJWYWx1ZScpXG4gIHB1YmxpYyBzZXQgdXBkYXRlRmlsdGVyVmFsdWUobmV3VmFsdWU6IHN0cmluZykge1xuICAgIGlmICghdGhpcy5maWx0ZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCFuZXdWYWx1ZSkge1xuICAgICAgbmV3VmFsdWUgPSAnJztcbiAgICB9XG4gICAgaWYgKG5ld1ZhbHVlICE9PSB0aGlzLmZpbHRlci52YWx1ZSkge1xuICAgICAgdGhpcy5maWx0ZXIudmFsdWUgPSBuZXdWYWx1ZTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc2V0IGZpbHRlclZhbHVlKG5ld1ZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLnVwZGF0ZUZpbHRlclZhbHVlID0gbmV3VmFsdWU7XG4gICAgdGhpcy5maWx0ZXJWYWx1ZUNoYW5nZS5lbWl0KHRoaXMuZmlsdGVyLnZhbHVlKTtcbiAgfVxuXG4gIEBPdXRwdXQoJ2NsckZpbHRlclZhbHVlQ2hhbmdlJykgZmlsdGVyVmFsdWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLyoqKioqKioqKioqXG4gICAqXG4gICAqIEBwcm9wZXJ0eSBoaWRlYWJsZVxuICAgKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogV2hlbiBhIGNvbHVtbiBpcyBoaWRlYWJsZSB0aGlzIGlzIGRlZmluZWQgd2l0aCBhbiBpbnN0YW5jZSBvZiBEYXRhZ3JpZEhpZGVhYmxlQ29sdW1uTW9kZWwuXG4gICAqIFdoZW4gaXRzIG5vdCBoaWRlYWJsZSBzaG91bGQgYmUgdW5kZWZpbmVkLlxuICAgKlxuICAgKi9cbiAgcHVibGljIGhpZGVhYmxlOiBEYXRhZ3JpZEhpZGVhYmxlQ29sdW1uTW9kZWw7XG5cbiAgcHJpdmF0ZSB3cmFwcGVkSW5qZWN0b3I6IEluamVjdG9yO1xuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMud3JhcHBlZEluamVjdG9yID0gbmV3IEhvc3RXcmFwcGVyKFdyYXBwZWRDb2x1bW4sIHRoaXMudmNyKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgX3ZpZXcoKSB7XG4gICAgcmV0dXJuIHRoaXMud3JhcHBlZEluamVjdG9yLmdldChXcmFwcGVkQ29sdW1uLCB0aGlzLnZjcikuY29sdW1uVmlldztcbiAgfVxufVxuIl19