/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ContentChild, ElementRef, EventEmitter, HostBinding, Input, Output, ViewChild, ViewContainerRef, } from '@angular/core';
import { HostWrapper } from '../../utils/host-wrapping/host-wrapper';
import { DatagridPropertyComparator } from './built-in/comparators/datagrid-property-comparator';
import { DatagridPropertyStringFilter } from './built-in/filters/datagrid-property-string-filter';
import { DatagridStringFilterImpl } from './built-in/filters/datagrid-string-filter-impl';
import { ClrDatagridSortOrder } from './enums/sort-order.enum';
import { CustomFilter } from './providers/custom-filter';
import { DragDispatcher } from './providers/drag-dispatcher';
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
     * @param {?} _dragDispatcher
     * @param {?} vcr
     */
    constructor(_sort, filters, _dragDispatcher, vcr) {
        super(filters);
        this._sort = _sort;
        this._dragDispatcher = _dragDispatcher;
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
     * @param {?} value
     * @return {?}
     */
    set handleElRef(value) {
        this._dragDispatcher.handleRef = value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set handleTrackerElRef(value) {
        this._dragDispatcher.handleTrackerRef = value;
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
        this.sortOrderChange.emit(this._sortOrder);
        // deprecated: to be removed - START
        this._sorted = true;
        this.sortedChange.emit(true);
        // deprecated: to be removed - END
    }
    /**
     * Indicates if the column is currently sorted in ascending order
     * @return {?}
     */
    get asc() {
        // deprecated: if condition to be removed - START
        if (typeof this.sortOrder === 'undefined') {
            return this.sorted && !this._sort.reverse;
        }
        else {
            return this.sortOrder === ClrDatagridSortOrder.ASC;
        }
        // deprecated: if condition to be removed - END
    }
    /**
     * Indicates if the column is currently sorted in descending order
     * @return {?}
     */
    get desc() {
        // deprecated: if condition to be removed - START
        if (typeof this.sortOrder === 'undefined') {
            return this.sorted && this._sort.reverse;
        }
        else {
            return this.sortOrder === ClrDatagridSortOrder.DESC;
        }
        // deprecated: if condition to be removed - END
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
            </button>

            <span class="datagrid-column-title" *ngIf="!sortable">
               <ng-container *ngTemplateOutlet="columnTitle"></ng-container>
            </span>

            <div class="datagrid-column-separator">
                <button #columnHandle class="datagrid-column-handle" tabindex="-1" type="button"></button>
                <div #columnHandleTracker class="datagrid-column-handle-tracker"></div>
            </div>
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
    { type: DragDispatcher },
    { type: ViewContainerRef }
];
ClrDatagridColumn.propDecorators = {
    handleElRef: [{ type: ViewChild, args: ['columnHandle',] }],
    handleTrackerElRef: [{ type: ViewChild, args: ['columnHandleTracker',] }],
    field: [{ type: Input, args: ['clrDgField',] }],
    sortBy: [{ type: Input, args: ['clrDgSortBy',] }],
    sorted: [{ type: Input, args: ['clrDgSorted',] }],
    sortedChange: [{ type: Output, args: ['clrDgSortedChange',] }],
    sortOrder: [{ type: Input, args: ['clrDgSortOrder',] }],
    sortOrderChange: [{ type: Output, args: ['clrDgSortOrderChange',] }],
    asc: [{ type: HostBinding, args: ['class.asc',] }],
    desc: [{ type: HostBinding, args: ['class.desc',] }],
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
    ClrDatagridColumn.prototype._dragDispatcher;
    /** @type {?} */
    ClrDatagridColumn.prototype.vcr;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtY29sdW1uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9kYXRhZ3JpZC1jb2x1bW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUNMLFNBQVMsRUFDVCxZQUFZLEVBQ1osVUFBVSxFQUNWLFlBQVksRUFDWixXQUFXLEVBRVgsS0FBSyxFQUdMLE1BQU0sRUFDTixTQUFTLEVBQ1QsZ0JBQWdCLEdBQ2pCLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUVyRSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxxREFBcUQsQ0FBQztBQUNqRyxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUNsRyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUUxRixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUUvRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDekQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzdELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDeEMsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDNUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDOztJQUU3QyxPQUFPLEdBQVcsQ0FBQzs7OztBQXVDdkIsTUFBTSxPQUFPLGlCQUEyQixTQUFRLHVCQUF1RDs7Ozs7OztJQUVyRyxZQUNVLEtBQWMsRUFDdEIsT0FBMkIsRUFDbkIsZUFBK0IsRUFDL0IsR0FBcUI7UUFFN0IsS0FBSyxDQUFDLE9BQU8s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OEJBc0N0QixNQUFNLFNBQUMsc0JBQXNCO2tCQXlCN0IsV0FBVyxTQUFDLFdBQVc7bUJBY3ZCLFdBQVcsU0FBQyxZQUFZOzhCQWdCeEIsWUFBWSxTQUFDLFlBQVk7Z0NBWXpCLEtBQUssU0FBQyxnQkFBZ0I7Z0NBa0J0QixNQUFNLFNBQUMsc0JBQXNCOzs7Ozs7Ozs7Ozs7SUE5UDlCLHFDQUF3Qjs7Ozs7SUE4QnhCLDhDQUF3Qzs7SUFVeEMsbUNBQXVCOzs7OztJQXNCdkIsb0NBQW1EOzs7Ozs7O0lBb0NuRCxvQ0FBd0I7Ozs7O0lBcUJ4Qix5Q0FBK0U7Ozs7O0lBTy9FLHVDQUF5RTs7SUEyQ3pFLDRDQUFrRzs7Ozs7SUFxRGxHLHlDQUE0Qjs7SUFnQzVCLDhDQUF1RTs7Ozs7Ozs7Ozs7O0lBV3ZFLHFDQUE2Qzs7SUFFN0MsNENBQWtDOztJQTNTaEMsa0NBQXNCOztJQUV0Qiw0Q0FBdUM7O0lBQ3ZDLGdDQUE2QiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RCaW5kaW5nLFxuICBJbmplY3RvcixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0NvbnRhaW5lclJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgSG9zdFdyYXBwZXIgfSBmcm9tICcuLi8uLi91dGlscy9ob3N0LXdyYXBwaW5nL2hvc3Qtd3JhcHBlcic7XG5cbmltcG9ydCB7IERhdGFncmlkUHJvcGVydHlDb21wYXJhdG9yIH0gZnJvbSAnLi9idWlsdC1pbi9jb21wYXJhdG9ycy9kYXRhZ3JpZC1wcm9wZXJ0eS1jb21wYXJhdG9yJztcbmltcG9ydCB7IERhdGFncmlkUHJvcGVydHlTdHJpbmdGaWx0ZXIgfSBmcm9tICcuL2J1aWx0LWluL2ZpbHRlcnMvZGF0YWdyaWQtcHJvcGVydHktc3RyaW5nLWZpbHRlcic7XG5pbXBvcnQgeyBEYXRhZ3JpZFN0cmluZ0ZpbHRlckltcGwgfSBmcm9tICcuL2J1aWx0LWluL2ZpbHRlcnMvZGF0YWdyaWQtc3RyaW5nLWZpbHRlci1pbXBsJztcbmltcG9ydCB7IERhdGFncmlkSGlkZWFibGVDb2x1bW5Nb2RlbCB9IGZyb20gJy4vZGF0YWdyaWQtaGlkZWFibGUtY29sdW1uLm1vZGVsJztcbmltcG9ydCB7IENsckRhdGFncmlkU29ydE9yZGVyIH0gZnJvbSAnLi9lbnVtcy9zb3J0LW9yZGVyLmVudW0nO1xuaW1wb3J0IHsgQ2xyRGF0YWdyaWRDb21wYXJhdG9ySW50ZXJmYWNlIH0gZnJvbSAnLi9pbnRlcmZhY2VzL2NvbXBhcmF0b3IuaW50ZXJmYWNlJztcbmltcG9ydCB7IEN1c3RvbUZpbHRlciB9IGZyb20gJy4vcHJvdmlkZXJzL2N1c3RvbS1maWx0ZXInO1xuaW1wb3J0IHsgRHJhZ0Rpc3BhdGNoZXIgfSBmcm9tICcuL3Byb3ZpZGVycy9kcmFnLWRpc3BhdGNoZXInO1xuaW1wb3J0IHsgRmlsdGVyc1Byb3ZpZGVyIH0gZnJvbSAnLi9wcm92aWRlcnMvZmlsdGVycyc7XG5pbXBvcnQgeyBTb3J0IH0gZnJvbSAnLi9wcm92aWRlcnMvc29ydCc7XG5pbXBvcnQgeyBEYXRhZ3JpZEZpbHRlclJlZ2lzdHJhciB9IGZyb20gJy4vdXRpbHMvZGF0YWdyaWQtZmlsdGVyLXJlZ2lzdHJhcic7XG5pbXBvcnQgeyBXcmFwcGVkQ29sdW1uIH0gZnJvbSAnLi93cmFwcGVkLWNvbHVtbic7XG5cbmxldCBuYkNvdW50OiBudW1iZXIgPSAwO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItZGctY29sdW1uJyxcbiAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cImRhdGFncmlkLWNvbHVtbi1mbGV4XCI+XG4gICAgICAgICAgICA8IS0tIEknbSByZWFsbHkgbm90IGhhcHB5IHdpdGggdGhhdCBzZWxlY3Qgc2luY2UgaXQncyBub3QgdmVyeSBzY2FsYWJsZSAtLT5cbiAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImNsci1kZy1maWx0ZXIsIGNsci1kZy1zdHJpbmctZmlsdGVyXCI+PC9uZy1jb250ZW50PlxuXG4gICAgICAgICAgICA8Y2xyLWRnLXN0cmluZy1maWx0ZXJcbiAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJmaWVsZCAmJiAhY3VzdG9tRmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgW2NsckRnU3RyaW5nRmlsdGVyXT1cInJlZ2lzdGVyZWRcIlxuICAgICAgICAgICAgICAgICAgICBbKGNsckZpbHRlclZhbHVlKV09XCJmaWx0ZXJWYWx1ZVwiPjwvY2xyLWRnLXN0cmluZy1maWx0ZXI+XG5cbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjY29sdW1uVGl0bGU+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImRhdGFncmlkLWNvbHVtbi10aXRsZVwiICpuZ0lmPVwic29ydGFibGVcIiAoY2xpY2spPVwic29ydCgpXCIgdHlwZT1cImJ1dHRvblwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJjb2x1bW5UaXRsZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZGF0YWdyaWQtY29sdW1uLXRpdGxlXCIgKm5nSWY9XCIhc29ydGFibGVcIj5cbiAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJjb2x1bW5UaXRsZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPC9zcGFuPlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGF0YWdyaWQtY29sdW1uLXNlcGFyYXRvclwiPlxuICAgICAgICAgICAgICAgIDxidXR0b24gI2NvbHVtbkhhbmRsZSBjbGFzcz1cImRhdGFncmlkLWNvbHVtbi1oYW5kbGVcIiB0YWJpbmRleD1cIi0xXCIgdHlwZT1cImJ1dHRvblwiPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxkaXYgI2NvbHVtbkhhbmRsZVRyYWNrZXIgY2xhc3M9XCJkYXRhZ3JpZC1jb2x1bW4taGFuZGxlLXRyYWNrZXJcIj48L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5kYXRhZ3JpZC1jb2x1bW5dJzogJ3RydWUnLFxuICAgICdbY2xhc3MuZGF0YWdyaWQtY29sdW1uLS1oaWRkZW5dJzogJ2hpZGRlbicsXG4gICAgJ1thdHRyLmFyaWEtc29ydF0nOiAnYXJpYVNvcnQnLFxuICAgIHJvbGU6ICdjb2x1bW5oZWFkZXInLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBDbHJEYXRhZ3JpZENvbHVtbjxUID0gYW55PiBleHRlbmRzIERhdGFncmlkRmlsdGVyUmVnaXN0cmFyPFQsIERhdGFncmlkU3RyaW5nRmlsdGVySW1wbDxUPj5cbiAgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uSW5pdCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX3NvcnQ6IFNvcnQ8VD4sXG4gICAgZmlsdGVyczogRmlsdGVyc1Byb3ZpZGVyPFQ+LFxuICAgIHByaXZhdGUgX2RyYWdEaXNwYXRjaGVyOiBEcmFnRGlzcGF0Y2hlcixcbiAgICBwcml2YXRlIHZjcjogVmlld0NvbnRhaW5lclJlZlxuICApIHtcbiAgICBzdXBlcihmaWx0ZXJzKTtcbiAgICB0aGlzLl9zb3J0U3Vic2NyaXB0aW9uID0gX3NvcnQuY2hhbmdlLnN1YnNjcmliZShzb3J0ID0+IHtcbiAgICAgIC8vIFdlJ3JlIG9ubHkgbGlzdGVuaW5nIHRvIG1ha2Ugc3VyZSB3ZSBlbWl0IGFuIGV2ZW50IHdoZW4gdGhlIGNvbHVtbiBnb2VzIGZyb20gc29ydGVkIHRvIHVuc29ydGVkXG4gICAgICBpZiAodGhpcy5zb3J0T3JkZXIgIT09IENsckRhdGFncmlkU29ydE9yZGVyLlVOU09SVEVEICYmIHNvcnQuY29tcGFyYXRvciAhPT0gdGhpcy5fc29ydEJ5KSB7XG4gICAgICAgIHRoaXMuX3NvcnRPcmRlciA9IENsckRhdGFncmlkU29ydE9yZGVyLlVOU09SVEVEO1xuICAgICAgICB0aGlzLnNvcnRPcmRlckNoYW5nZS5lbWl0KHRoaXMuX3NvcnRPcmRlcik7XG4gICAgICB9XG4gICAgICAvLyBkZXByZWNhdGVkOiB0byBiZSByZW1vdmVkIC0gU1RBUlRcbiAgICAgIGlmICh0aGlzLnNvcnRlZCAmJiBzb3J0LmNvbXBhcmF0b3IgIT09IHRoaXMuX3NvcnRCeSkge1xuICAgICAgICB0aGlzLl9zb3J0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zb3J0ZWRDaGFuZ2UuZW1pdChmYWxzZSk7XG4gICAgICB9XG4gICAgICAvLyBkZXByZWNhdGVkOiB0byBiZSByZW1vdmVkIC0gRU5EXG4gICAgfSk7XG5cbiAgICB0aGlzLmNvbHVtbklkID0gJ2RnLWNvbC0nICsgbmJDb3VudC50b1N0cmluZygpOyAvLyBBcHByb3hpbWF0ZSBhIEdVSURcbiAgICBuYkNvdW50Kys7XG4gIH1cblxuICAvKipcbiAgICogQHByb3BlcnR5IGNvbHVtbklkXG4gICAqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBBIENsckRhdGFncmlkQ29sdW1uIGNsYXNzIHZhcmlhYmxlIHRoYXQgaG9sZHMgdGhlIG51bWJlciBvZiBDbHJEYXRhZ3JpZENvbHVtbiBpbnN0YW5jZXMgZm9yIGEgRGF0YWdyaWQuXG4gICAqIEl0IGlzIHVzZWQgdG8gZ2VuZXJhdGUgYSB1bmlxdWUgaWQgZm9yIHRoZSBDbHJEYXRhZ3JpZENvbHVtbiBpbnN0YW5jZS5cbiAgICpcbiAgICovXG4gIHB1YmxpYyBjb2x1bW5JZDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBAcHJvcGVydHkgaGlkZGVuXG4gICAqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBBIHByb3BlcnR5IHRoYXQgYWxsb3dzIHRoZSBjb2x1bW4gdG8gYmUgaGlkZGVuIC8gc2hvd24gd2l0aCBjc3NcbiAgICogTm90ZSB0aGUgZGVmYXVsdCBhbGxvd3MgdGhlIENsckRhdGFncmlkQ29sdW1uIHRvIGhhdmUgYW4gKm5nSWYgb24gaXQuIChFSENBSVdDIC0gd2lsbCBvY2N1ciBpZiBpdHMgbm90XG4gICAqIGluaXRpYWxpemVkKVxuICAgKlxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKlxuICAgKi9cbiAgcHVibGljIGdldCBoaWRkZW4oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy5oaWRlYWJsZSAmJiB0aGlzLmhpZGVhYmxlLmhpZGRlbjtcbiAgfVxuXG4gIEBWaWV3Q2hpbGQoJ2NvbHVtbkhhbmRsZScpXG4gIHNldCBoYW5kbGVFbFJlZih2YWx1ZTogRWxlbWVudFJlZikge1xuICAgIHRoaXMuX2RyYWdEaXNwYXRjaGVyLmhhbmRsZVJlZiA9IHZhbHVlO1xuICB9XG5cbiAgQFZpZXdDaGlsZCgnY29sdW1uSGFuZGxlVHJhY2tlcicpXG4gIHNldCBoYW5kbGVUcmFja2VyRWxSZWYodmFsdWU6IEVsZW1lbnRSZWYpIHtcbiAgICB0aGlzLl9kcmFnRGlzcGF0Y2hlci5oYW5kbGVUcmFja2VyUmVmID0gdmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogU3Vic2NyaXB0aW9uIHRvIHRoZSBzb3J0IHNlcnZpY2UgY2hhbmdlc1xuICAgKi9cbiAgcHJpdmF0ZSBfc29ydFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX3NvcnRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIC8qXG4gICAgICogU2ltcGxlIG9iamVjdCBwcm9wZXJ0eSBzaG9ydGN1dCwgYWN0aXZhdGVzIGJvdGggc29ydGluZyBhbmQgZmlsdGVyaW5nXG4gICAgICogYmFzZWQgb24gbmF0aXZlIGNvbXBhcmlzb24gb2YgdGhlIHNwZWNpZmllZCBwcm9wZXJ0eSBvbiB0aGUgaXRlbXMuXG4gICAgICovXG4gIHByaXZhdGUgX2ZpZWxkOiBzdHJpbmc7XG4gIHB1YmxpYyBnZXQgZmllbGQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpZWxkO1xuICB9XG5cbiAgQElucHV0KCdjbHJEZ0ZpZWxkJylcbiAgcHVibGljIHNldCBmaWVsZChmaWVsZDogc3RyaW5nKSB7XG4gICAgaWYgKHR5cGVvZiBmaWVsZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMuX2ZpZWxkID0gZmllbGQ7XG4gICAgICBpZiAoIXRoaXMuY3VzdG9tRmlsdGVyKSB7XG4gICAgICAgIHRoaXMuc2V0RmlsdGVyKG5ldyBEYXRhZ3JpZFN0cmluZ0ZpbHRlckltcGwobmV3IERhdGFncmlkUHJvcGVydHlTdHJpbmdGaWx0ZXIoZmllbGQpKSk7XG4gICAgICB9XG4gICAgICBpZiAoIXRoaXMuX3NvcnRCeSkge1xuICAgICAgICB0aGlzLl9zb3J0QnkgPSBuZXcgRGF0YWdyaWRQcm9wZXJ0eUNvbXBhcmF0b3IoZmllbGQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDbHJEYXRhZ3JpZENvbXBhcmF0b3JJbnRlcmZhY2UgdG8gdXNlIHdoZW4gc29ydGluZyB0aGUgY29sdW1uXG4gICAqL1xuXG4gIHByaXZhdGUgX3NvcnRCeTogQ2xyRGF0YWdyaWRDb21wYXJhdG9ySW50ZXJmYWNlPFQ+O1xuXG4gIHB1YmxpYyBnZXQgc29ydEJ5KCkge1xuICAgIHJldHVybiB0aGlzLl9zb3J0Qnk7XG4gIH1cblxuICBASW5wdXQoJ2NsckRnU29ydEJ5JylcbiAgcHVibGljIHNldCBzb3J0QnkoY29tcGFyYXRvcjogQ2xyRGF0YWdyaWRDb21wYXJhdG9ySW50ZXJmYWNlPFQ+IHwgc3RyaW5nKSB7XG4gICAgaWYgKHR5cGVvZiBjb21wYXJhdG9yID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5fc29ydEJ5ID0gbmV3IERhdGFncmlkUHJvcGVydHlDb21wYXJhdG9yKGNvbXBhcmF0b3IpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoY29tcGFyYXRvcikge1xuICAgICAgICB0aGlzLl9zb3J0QnkgPSBjb21wYXJhdG9yO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRoaXMuX2ZpZWxkKSB7XG4gICAgICAgICAgdGhpcy5fc29ydEJ5ID0gbmV3IERhdGFncmlkUHJvcGVydHlDb21wYXJhdG9yKHRoaXMuX2ZpZWxkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkZWxldGUgdGhpcy5fc29ydEJ5O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEluZGljYXRlcyBpZiB0aGUgY29sdW1uIGlzIHNvcnRhYmxlXG4gICAqL1xuICBwdWJsaWMgZ2V0IHNvcnRhYmxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIXRoaXMuX3NvcnRCeTtcbiAgfVxuXG4gIC8vIGRlcHJlY2F0ZWQ6IHRvIGJlIHJlbW92ZWQgLSBTVEFSVFxuICAvKipcbiAgICogSW5kaWNhdGVzIGlmIHRoZSBjb2x1bW4gaXMgY3VycmVudGx5IHNvcnRlZFxuICAgKlxuICAgKiBAZGVwcmVjYXRlZCBUaGlzIHdpbGwgYmUgcmVtb3ZlZCBzb29uLCBpbiBmYXZvciBvZiB0aGUgc29ydE9yZGVyIG1lY2hhbmlzbVxuICAgKi9cbiAgcHJpdmF0ZSBfc29ydGVkID0gZmFsc2U7XG4gIHB1YmxpYyBnZXQgc29ydGVkKCkge1xuICAgIHJldHVybiB0aGlzLl9zb3J0ZWQ7XG4gIH1cblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgVGhpcyB3aWxsIGJlIHJlbW92ZWQgc29vbiwgaW4gZmF2b3Igb2YgdGhlIHNvcnRPcmRlciBtZWNoYW5pc21cbiAgICovXG4gIEBJbnB1dCgnY2xyRGdTb3J0ZWQnKVxuICBwdWJsaWMgc2V0IHNvcnRlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIGlmICghdmFsdWUgJiYgdGhpcy5zb3J0ZWQpIHtcbiAgICAgIHRoaXMuX3NvcnRlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5fc29ydC5jbGVhcigpO1xuICAgIH0gZWxzZSBpZiAodmFsdWUgJiYgIXRoaXMuc29ydGVkKSB7XG4gICAgICB0aGlzLnNvcnQoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgVGhpcyB3aWxsIGJlIHJlbW92ZWQgc29vbiwgaW4gZmF2b3Igb2YgdGhlIHNvcnRPcmRlciBtZWNoYW5pc21cbiAgICovXG4gIEBPdXRwdXQoJ2NsckRnU29ydGVkQ2hhbmdlJykgcHVibGljIHNvcnRlZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICAvLyBkZXByZWNhdGVkOiB0byBiZSByZW1vdmVkIC0gRU5EXG5cbiAgLyoqXG4gICAqIEluZGljYXRlcyBob3cgdGhlIGNvbHVtbiBpcyBjdXJyZW50bHkgc29ydGVkXG4gICAqL1xuICBwcml2YXRlIF9zb3J0T3JkZXI6IENsckRhdGFncmlkU29ydE9yZGVyID0gQ2xyRGF0YWdyaWRTb3J0T3JkZXIuVU5TT1JURUQ7XG4gIHB1YmxpYyBnZXQgc29ydE9yZGVyKCkge1xuICAgIHJldHVybiB0aGlzLl9zb3J0T3JkZXI7XG4gIH1cblxuICBASW5wdXQoJ2NsckRnU29ydE9yZGVyJylcbiAgcHVibGljIHNldCBzb3J0T3JkZXIodmFsdWU6IENsckRhdGFncmlkU29ydE9yZGVyKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBvbmx5IGlmIHRoZSBpbmNvbWluZyBvcmRlciBpcyBkaWZmZXJlbnQgZnJvbSB0aGUgY3VycmVudCBvbmVcbiAgICBpZiAodGhpcy5fc29ydE9yZGVyID09PSB2YWx1ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHN3aXRjaCAodmFsdWUpIHtcbiAgICAgIC8vIHRoZSBVbnNvcnRlZCBjYXNlIGhhcHBlbnMgd2hlbiB0aGUgY3VycmVudCBzdGF0ZSBpcyBlaXRoZXIgQXNjIG9yIERlc2NcbiAgICAgIGRlZmF1bHQ6XG4gICAgICBjYXNlIENsckRhdGFncmlkU29ydE9yZGVyLlVOU09SVEVEOlxuICAgICAgICB0aGlzLl9zb3J0LmNsZWFyKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBDbHJEYXRhZ3JpZFNvcnRPcmRlci5BU0M6XG4gICAgICAgIHRoaXMuc29ydChmYWxzZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBDbHJEYXRhZ3JpZFNvcnRPcmRlci5ERVNDOlxuICAgICAgICB0aGlzLnNvcnQodHJ1ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXQgYXJpYVNvcnQoKSB7XG4gICAgc3dpdGNoICh0aGlzLl9zb3J0T3JkZXIpIHtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICBjYXNlIENsckRhdGFncmlkU29ydE9yZGVyLlVOU09SVEVEOlxuICAgICAgICByZXR1cm4gJ25vbmUnO1xuICAgICAgY2FzZSBDbHJEYXRhZ3JpZFNvcnRPcmRlci5BU0M6XG4gICAgICAgIHJldHVybiAnYXNjZW5kaW5nJztcbiAgICAgIGNhc2UgQ2xyRGF0YWdyaWRTb3J0T3JkZXIuREVTQzpcbiAgICAgICAgcmV0dXJuICdkZXNjZW5kaW5nJztcbiAgICB9XG4gIH1cblxuICBAT3V0cHV0KCdjbHJEZ1NvcnRPcmRlckNoYW5nZScpIHB1YmxpYyBzb3J0T3JkZXJDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPENsckRhdGFncmlkU29ydE9yZGVyPigpO1xuXG4gIC8qKlxuICAgKiBTb3J0cyB0aGUgZGF0YWdyaWQgYmFzZWQgb24gdGhpcyBjb2x1bW5cbiAgICovXG4gIHB1YmxpYyBzb3J0KHJldmVyc2U/OiBib29sZWFuKSB7XG4gICAgaWYgKCF0aGlzLnNvcnRhYmxlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fc29ydC50b2dnbGUodGhpcy5fc29ydEJ5LCByZXZlcnNlKTtcblxuICAgIC8vIHNldHRpbmcgdGhlIHByaXZhdGUgdmFyaWFibGUgdG8gbm90IHJldHJpZ2dlciB0aGUgc2V0dGVyIGxvZ2ljXG4gICAgdGhpcy5fc29ydE9yZGVyID0gdGhpcy5fc29ydC5yZXZlcnNlID8gQ2xyRGF0YWdyaWRTb3J0T3JkZXIuREVTQyA6IENsckRhdGFncmlkU29ydE9yZGVyLkFTQztcbiAgICB0aGlzLnNvcnRPcmRlckNoYW5nZS5lbWl0KHRoaXMuX3NvcnRPcmRlcik7XG5cbiAgICAvLyBkZXByZWNhdGVkOiB0byBiZSByZW1vdmVkIC0gU1RBUlRcbiAgICB0aGlzLl9zb3J0ZWQgPSB0cnVlO1xuICAgIHRoaXMuc29ydGVkQ2hhbmdlLmVtaXQodHJ1ZSk7XG4gICAgLy8gZGVwcmVjYXRlZDogdG8gYmUgcmVtb3ZlZCAtIEVORFxuICB9XG5cbiAgLyoqXG4gICAqIEluZGljYXRlcyBpZiB0aGUgY29sdW1uIGlzIGN1cnJlbnRseSBzb3J0ZWQgaW4gYXNjZW5kaW5nIG9yZGVyXG4gICAqL1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmFzYycpXG4gIHB1YmxpYyBnZXQgYXNjKCkge1xuICAgIC8vIGRlcHJlY2F0ZWQ6IGlmIGNvbmRpdGlvbiB0byBiZSByZW1vdmVkIC0gU1RBUlRcbiAgICBpZiAodHlwZW9mIHRoaXMuc29ydE9yZGVyID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuIHRoaXMuc29ydGVkICYmICF0aGlzLl9zb3J0LnJldmVyc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnNvcnRPcmRlciA9PT0gQ2xyRGF0YWdyaWRTb3J0T3JkZXIuQVNDO1xuICAgIH1cbiAgICAvLyBkZXByZWNhdGVkOiBpZiBjb25kaXRpb24gdG8gYmUgcmVtb3ZlZCAtIEVORFxuICB9XG5cbiAgLyoqXG4gICAqIEluZGljYXRlcyBpZiB0aGUgY29sdW1uIGlzIGN1cnJlbnRseSBzb3J0ZWQgaW4gZGVzY2VuZGluZyBvcmRlclxuICAgKi9cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5kZXNjJylcbiAgcHVibGljIGdldCBkZXNjKCkge1xuICAgIC8vIGRlcHJlY2F0ZWQ6IGlmIGNvbmRpdGlvbiB0byBiZSByZW1vdmVkIC0gU1RBUlRcbiAgICBpZiAodHlwZW9mIHRoaXMuc29ydE9yZGVyID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuIHRoaXMuc29ydGVkICYmIHRoaXMuX3NvcnQucmV2ZXJzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuc29ydE9yZGVyID09PSBDbHJEYXRhZ3JpZFNvcnRPcmRlci5ERVNDO1xuICAgIH1cbiAgICAvLyBkZXByZWNhdGVkOiBpZiBjb25kaXRpb24gdG8gYmUgcmVtb3ZlZCAtIEVORFxuICB9XG5cbiAgLyoqXG4gICAqIEEgY3VzdG9tIGZpbHRlciBmb3IgdGhpcyBjb2x1bW4gdGhhdCBjYW4gYmUgcHJvdmlkZWQgaW4gdGhlIHByb2plY3RlZCBjb250ZW50XG4gICAqL1xuICBwdWJsaWMgY3VzdG9tRmlsdGVyID0gZmFsc2U7XG5cbiAgQENvbnRlbnRDaGlsZChDdXN0b21GaWx0ZXIpXG4gIHB1YmxpYyBzZXQgcHJvamVjdGVkRmlsdGVyKGN1c3RvbTogYW55KSB7XG4gICAgaWYgKGN1c3RvbSkge1xuICAgICAgdGhpcy5kZWxldGVGaWx0ZXIoKTtcbiAgICAgIHRoaXMuY3VzdG9tRmlsdGVyID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0IGZpbHRlclZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLmZpbHRlci52YWx1ZTtcbiAgfVxuXG4gIEBJbnB1dCgnY2xyRmlsdGVyVmFsdWUnKVxuICBwdWJsaWMgc2V0IHVwZGF0ZUZpbHRlclZhbHVlKG5ld1ZhbHVlOiBzdHJpbmcpIHtcbiAgICBpZiAoIXRoaXMuZmlsdGVyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghbmV3VmFsdWUpIHtcbiAgICAgIG5ld1ZhbHVlID0gJyc7XG4gICAgfVxuICAgIGlmIChuZXdWYWx1ZSAhPT0gdGhpcy5maWx0ZXIudmFsdWUpIHtcbiAgICAgIHRoaXMuZmlsdGVyLnZhbHVlID0gbmV3VmFsdWU7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNldCBmaWx0ZXJWYWx1ZShuZXdWYWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy51cGRhdGVGaWx0ZXJWYWx1ZSA9IG5ld1ZhbHVlO1xuICAgIHRoaXMuZmlsdGVyVmFsdWVDaGFuZ2UuZW1pdCh0aGlzLmZpbHRlci52YWx1ZSk7XG4gIH1cblxuICBAT3V0cHV0KCdjbHJGaWx0ZXJWYWx1ZUNoYW5nZScpIGZpbHRlclZhbHVlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8qKioqKioqKioqKlxuICAgKlxuICAgKiBAcHJvcGVydHkgaGlkZWFibGVcbiAgICpcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIFdoZW4gYSBjb2x1bW4gaXMgaGlkZWFibGUgdGhpcyBpcyBkZWZpbmVkIHdpdGggYW4gaW5zdGFuY2Ugb2YgRGF0YWdyaWRIaWRlYWJsZUNvbHVtbk1vZGVsLlxuICAgKiBXaGVuIGl0cyBub3QgaGlkZWFibGUgc2hvdWxkIGJlIHVuZGVmaW5lZC5cbiAgICpcbiAgICovXG4gIHB1YmxpYyBoaWRlYWJsZTogRGF0YWdyaWRIaWRlYWJsZUNvbHVtbk1vZGVsO1xuXG4gIHByaXZhdGUgd3JhcHBlZEluamVjdG9yOiBJbmplY3RvcjtcblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLndyYXBwZWRJbmplY3RvciA9IG5ldyBIb3N0V3JhcHBlcihXcmFwcGVkQ29sdW1uLCB0aGlzLnZjcik7XG4gIH1cblxuICBwdWJsaWMgZ2V0IF92aWV3KCkge1xuICAgIHJldHVybiB0aGlzLndyYXBwZWRJbmplY3Rvci5nZXQoV3JhcHBlZENvbHVtbiwgdGhpcy52Y3IpLmNvbHVtblZpZXc7XG4gIH1cbn1cbiJdfQ==