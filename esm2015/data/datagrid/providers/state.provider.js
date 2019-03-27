/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { DatagridPropertyComparator } from '../built-in/comparators/datagrid-property-comparator';
import { FiltersProvider } from './filters';
import { Page } from './page';
import { Sort } from './sort';
import { StateDebouncer } from './state-debouncer.provider';
/**
 * This provider aggregates state changes from the various providers of the Datagrid
 * @template T
 */
export class StateProvider {
    /**
     * @param {?} filters
     * @param {?} sort
     * @param {?} page
     * @param {?} debouncer
     */
    constructor(filters, sort, page, debouncer) {
        this.filters = filters;
        this.sort = sort;
        this.page = page;
        this.debouncer = debouncer;
        /**
         * The Observable that lets other classes subscribe to global state changes
         */
        this.change = this.debouncer.change.pipe(map((/**
         * @return {?}
         */
        () => this.state)));
    }
    /*
         * By making this a getter, we open the possibility for a setter in the future.
         * It's been requested a couple times.
         */
    /**
     * @return {?}
     */
    get state() {
        /** @type {?} */
        const state = {};
        if (this.page.size > 0) {
            state.page = { from: this.page.firstItem, to: this.page.lastItem, size: this.page.size };
        }
        if (this.sort.comparator) {
            if (this.sort.comparator instanceof DatagridPropertyComparator) {
                /*
                         * Special case for the default object property comparator,
                         * we give the property name instead of the actual comparator.
                         */
                state.sort = { by: ((/** @type {?} */ (this.sort.comparator))).prop, reverse: this.sort.reverse };
            }
            else {
                state.sort = { by: this.sort.comparator, reverse: this.sort.reverse };
            }
        }
        /** @type {?} */
        const activeFilters = this.filters.getActiveFilters();
        if (activeFilters.length > 0) {
            state.filters = [];
            for (const filter of activeFilters) {
                if (filter.state) {
                    state.filters.push(filter.state);
                }
                else {
                    state.filters.push(filter);
                }
            }
        }
        return state;
    }
}
StateProvider.decorators = [
    { type: Injectable }
];
/** @nocollapse */
StateProvider.ctorParameters = () => [
    { type: FiltersProvider },
    { type: Sort },
    { type: Page },
    { type: StateDebouncer }
];
if (false) {
    /**
     * The Observable that lets other classes subscribe to global state changes
     * @type {?}
     */
    StateProvider.prototype.change;
    /**
     * @type {?}
     * @private
     */
    StateProvider.prototype.filters;
    /**
     * @type {?}
     * @private
     */
    StateProvider.prototype.sort;
    /**
     * @type {?}
     * @private
     */
    StateProvider.prototype.page;
    /**
     * @type {?}
     * @private
     */
    StateProvider.prototype.debouncer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUucHJvdmlkZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJkYXRhL2RhdGFncmlkL3Byb3ZpZGVycy9zdGF0ZS5wcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFLQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVyQyxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxzREFBc0QsQ0FBQztBQUdsRyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQzVDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFDOUIsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUM5QixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7Ozs7O0FBTTVELE1BQU0sT0FBTyxhQUFhOzs7Ozs7O0lBQ3hCLFlBQ1UsT0FBMkIsRUFDM0IsSUFBYSxFQUNiLElBQVUsRUFDVixTQUF5QjtRQUh6QixZQUFPLEdBQVAsT0FBTyxDQUFvQjtRQUMzQixTQUFJLEdBQUosSUFBSSxDQUFTO1FBQ2IsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUNWLGNBQVMsR0FBVCxTQUFTLENBQWdCOzs7O1FBTW5DLFdBQU0sR0FBNkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUc7OztRQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDO0lBTGxHLENBQUM7Ozs7Ozs7O0lBV0osSUFBSSxLQUFLOztjQUNELEtBQUssR0FBaUMsRUFBRTtRQUM5QyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsRUFBRTtZQUN0QixLQUFLLENBQUMsSUFBSSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUMxRjtRQUNELElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDeEIsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsWUFBWSwwQkFBMEIsRUFBRTtnQkFDOUQ7OzsyQkFHVztnQkFDWCxLQUFLLENBQUMsSUFBSSxHQUFHLEVBQUUsRUFBRSxFQUFFLENBQUMsbUJBQStCLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFBLENBQUMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDN0c7aUJBQU07Z0JBQ0wsS0FBSyxDQUFDLElBQUksR0FBRyxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUN2RTtTQUNGOztjQUVLLGFBQWEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFO1FBQ3JELElBQUksYUFBYSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDNUIsS0FBSyxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7WUFDbkIsS0FBSyxNQUFNLE1BQU0sSUFBSSxhQUFhLEVBQUU7Z0JBQ2xDLElBQUksTUFBTSxDQUFDLEtBQUssRUFBRTtvQkFDaEIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNsQztxQkFBTTtvQkFDTCxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDNUI7YUFDRjtTQUNGO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDOzs7WUEvQ0YsVUFBVTs7OztZQVJGLGVBQWU7WUFFZixJQUFJO1lBREosSUFBSTtZQUVKLGNBQWM7Ozs7Ozs7SUFpQnJCLCtCQUFxRzs7Ozs7SUFUbkcsZ0NBQW1DOzs7OztJQUNuQyw2QkFBcUI7Ozs7O0lBQ3JCLDZCQUFrQjs7Ozs7SUFDbEIsa0NBQWlDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBEYXRhZ3JpZFByb3BlcnR5Q29tcGFyYXRvciB9IGZyb20gJy4uL2J1aWx0LWluL2NvbXBhcmF0b3JzL2RhdGFncmlkLXByb3BlcnR5LWNvbXBhcmF0b3InO1xuaW1wb3J0IHsgQ2xyRGF0YWdyaWRTdGF0ZUludGVyZmFjZSB9IGZyb20gJy4uL2ludGVyZmFjZXMvc3RhdGUuaW50ZXJmYWNlJztcblxuaW1wb3J0IHsgRmlsdGVyc1Byb3ZpZGVyIH0gZnJvbSAnLi9maWx0ZXJzJztcbmltcG9ydCB7IFBhZ2UgfSBmcm9tICcuL3BhZ2UnO1xuaW1wb3J0IHsgU29ydCB9IGZyb20gJy4vc29ydCc7XG5pbXBvcnQgeyBTdGF0ZURlYm91bmNlciB9IGZyb20gJy4vc3RhdGUtZGVib3VuY2VyLnByb3ZpZGVyJztcblxuLyoqXG4gKiBUaGlzIHByb3ZpZGVyIGFnZ3JlZ2F0ZXMgc3RhdGUgY2hhbmdlcyBmcm9tIHRoZSB2YXJpb3VzIHByb3ZpZGVycyBvZiB0aGUgRGF0YWdyaWRcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFN0YXRlUHJvdmlkZXI8VD4ge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGZpbHRlcnM6IEZpbHRlcnNQcm92aWRlcjxUPixcbiAgICBwcml2YXRlIHNvcnQ6IFNvcnQ8VD4sXG4gICAgcHJpdmF0ZSBwYWdlOiBQYWdlLFxuICAgIHByaXZhdGUgZGVib3VuY2VyOiBTdGF0ZURlYm91bmNlclxuICApIHt9XG5cbiAgLyoqXG4gICAqIFRoZSBPYnNlcnZhYmxlIHRoYXQgbGV0cyBvdGhlciBjbGFzc2VzIHN1YnNjcmliZSB0byBnbG9iYWwgc3RhdGUgY2hhbmdlc1xuICAgKi9cbiAgY2hhbmdlOiBPYnNlcnZhYmxlPENsckRhdGFncmlkU3RhdGVJbnRlcmZhY2U8VD4+ID0gdGhpcy5kZWJvdW5jZXIuY2hhbmdlLnBpcGUobWFwKCgpID0+IHRoaXMuc3RhdGUpKTtcblxuICAvKlxuICAgICAqIEJ5IG1ha2luZyB0aGlzIGEgZ2V0dGVyLCB3ZSBvcGVuIHRoZSBwb3NzaWJpbGl0eSBmb3IgYSBzZXR0ZXIgaW4gdGhlIGZ1dHVyZS5cbiAgICAgKiBJdCdzIGJlZW4gcmVxdWVzdGVkIGEgY291cGxlIHRpbWVzLlxuICAgICAqL1xuICBnZXQgc3RhdGUoKTogQ2xyRGF0YWdyaWRTdGF0ZUludGVyZmFjZTxUPiB7XG4gICAgY29uc3Qgc3RhdGU6IENsckRhdGFncmlkU3RhdGVJbnRlcmZhY2U8VD4gPSB7fTtcbiAgICBpZiAodGhpcy5wYWdlLnNpemUgPiAwKSB7XG4gICAgICBzdGF0ZS5wYWdlID0geyBmcm9tOiB0aGlzLnBhZ2UuZmlyc3RJdGVtLCB0bzogdGhpcy5wYWdlLmxhc3RJdGVtLCBzaXplOiB0aGlzLnBhZ2Uuc2l6ZSB9O1xuICAgIH1cbiAgICBpZiAodGhpcy5zb3J0LmNvbXBhcmF0b3IpIHtcbiAgICAgIGlmICh0aGlzLnNvcnQuY29tcGFyYXRvciBpbnN0YW5jZW9mIERhdGFncmlkUHJvcGVydHlDb21wYXJhdG9yKSB7XG4gICAgICAgIC8qXG4gICAgICAgICAgICAgICAgICogU3BlY2lhbCBjYXNlIGZvciB0aGUgZGVmYXVsdCBvYmplY3QgcHJvcGVydHkgY29tcGFyYXRvcixcbiAgICAgICAgICAgICAgICAgKiB3ZSBnaXZlIHRoZSBwcm9wZXJ0eSBuYW1lIGluc3RlYWQgb2YgdGhlIGFjdHVhbCBjb21wYXJhdG9yLlxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICBzdGF0ZS5zb3J0ID0geyBieTogKDxEYXRhZ3JpZFByb3BlcnR5Q29tcGFyYXRvcjxUPj50aGlzLnNvcnQuY29tcGFyYXRvcikucHJvcCwgcmV2ZXJzZTogdGhpcy5zb3J0LnJldmVyc2UgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0YXRlLnNvcnQgPSB7IGJ5OiB0aGlzLnNvcnQuY29tcGFyYXRvciwgcmV2ZXJzZTogdGhpcy5zb3J0LnJldmVyc2UgfTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBhY3RpdmVGaWx0ZXJzID0gdGhpcy5maWx0ZXJzLmdldEFjdGl2ZUZpbHRlcnMoKTtcbiAgICBpZiAoYWN0aXZlRmlsdGVycy5sZW5ndGggPiAwKSB7XG4gICAgICBzdGF0ZS5maWx0ZXJzID0gW107XG4gICAgICBmb3IgKGNvbnN0IGZpbHRlciBvZiBhY3RpdmVGaWx0ZXJzKSB7XG4gICAgICAgIGlmIChmaWx0ZXIuc3RhdGUpIHtcbiAgICAgICAgICBzdGF0ZS5maWx0ZXJzLnB1c2goZmlsdGVyLnN0YXRlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdGF0ZS5maWx0ZXJzLnB1c2goZmlsdGVyKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn1cbiJdfQ==