/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { DatagridPropertyComparator } from '../built-in/comparators/datagrid-property-comparator';
import { DatagridPropertyStringFilter } from '../built-in/filters/datagrid-property-string-filter';
import { DatagridStringFilterImpl } from '../built-in/filters/datagrid-string-filter-impl';
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
        this.change = this.debouncer.change.pipe(map(() => this.state));
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
                if (filter instanceof DatagridStringFilterImpl) {
                    /** @type {?} */
                    const stringFilter = filter.filterFn;
                    if (stringFilter instanceof DatagridPropertyStringFilter) {
                        /*
                                     * Special case again for the default object property filter,
                                     * we give the property name instead of the full filter object.
                                     */
                        state.filters.push({
                            property: stringFilter.prop,
                            value: filter.value,
                        });
                        continue;
                    }
                }
                state.filters.push(filter);
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
    /** @type {?} */
    StateProvider.prototype.filters;
    /** @type {?} */
    StateProvider.prototype.sort;
    /** @type {?} */
    StateProvider.prototype.page;
    /** @type {?} */
    StateProvider.prototype.debouncer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUucHJvdmlkZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJkYXRhL2RhdGFncmlkL3Byb3ZpZGVycy9zdGF0ZS5wcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFLQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVyQyxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxzREFBc0QsQ0FBQztBQUNsRyxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxxREFBcUQsQ0FBQztBQUNuRyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxpREFBaUQsQ0FBQztBQUczRixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQzVDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFDOUIsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUM5QixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7Ozs7O0FBTTVELE1BQU0sT0FBTyxhQUFhOzs7Ozs7O0lBQ3hCLFlBQ1UsT0FBMkIsRUFDM0IsSUFBYSxFQUNiLElBQVUsRUFDVixTQUF5QjtRQUh6QixZQUFPLEdBQVAsT0FBTyxDQUFvQjtRQUMzQixTQUFJLEdBQUosSUFBSSxDQUFTO1FBQ2IsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUNWLGNBQVMsR0FBVCxTQUFTLENBQWdCOzs7O1FBTW5DLFdBQU0sR0FBNkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUxsRyxDQUFDOzs7Ozs7OztJQVdKLElBQUksS0FBSzs7Y0FDRCxLQUFLLEdBQWlDLEVBQUU7UUFDOUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLEVBQUU7WUFDdEIsS0FBSyxDQUFDLElBQUksR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDMUY7UUFDRCxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ3hCLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLFlBQVksMEJBQTBCLEVBQUU7Z0JBQzlEOzs7MkJBR1c7Z0JBQ1gsS0FBSyxDQUFDLElBQUksR0FBRyxFQUFFLEVBQUUsRUFBRSxDQUFDLG1CQUErQixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBQSxDQUFDLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO2FBQzdHO2lCQUFNO2dCQUNMLEtBQUssQ0FBQyxJQUFJLEdBQUcsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDdkU7U0FDRjs7Y0FFSyxhQUFhLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRTtRQUNyRCxJQUFJLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQzVCLEtBQUssQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1lBQ25CLEtBQUssTUFBTSxNQUFNLElBQUksYUFBYSxFQUFFO2dCQUNsQyxJQUFJLE1BQU0sWUFBWSx3QkFBd0IsRUFBRTs7MEJBQ3hDLFlBQVksR0FBRyxNQUFNLENBQUMsUUFBUTtvQkFDcEMsSUFBSSxZQUFZLFlBQVksNEJBQTRCLEVBQUU7d0JBQ3hEOzs7dUNBR2U7d0JBQ2YsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7NEJBQ2pCLFFBQVEsRUFBRSxZQUFZLENBQUMsSUFBSTs0QkFDM0IsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLO3lCQUNwQixDQUFDLENBQUM7d0JBQ0gsU0FBUztxQkFDVjtpQkFDRjtnQkFDRCxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUM1QjtTQUNGO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDOzs7WUF6REYsVUFBVTs7OztZQVJGLGVBQWU7WUFFZixJQUFJO1lBREosSUFBSTtZQUVKLGNBQWM7Ozs7Ozs7SUFpQnJCLCtCQUFxRzs7SUFUbkcsZ0NBQW1DOztJQUNuQyw2QkFBcUI7O0lBQ3JCLDZCQUFrQjs7SUFDbEIsa0NBQWlDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBEYXRhZ3JpZFByb3BlcnR5Q29tcGFyYXRvciB9IGZyb20gJy4uL2J1aWx0LWluL2NvbXBhcmF0b3JzL2RhdGFncmlkLXByb3BlcnR5LWNvbXBhcmF0b3InO1xuaW1wb3J0IHsgRGF0YWdyaWRQcm9wZXJ0eVN0cmluZ0ZpbHRlciB9IGZyb20gJy4uL2J1aWx0LWluL2ZpbHRlcnMvZGF0YWdyaWQtcHJvcGVydHktc3RyaW5nLWZpbHRlcic7XG5pbXBvcnQgeyBEYXRhZ3JpZFN0cmluZ0ZpbHRlckltcGwgfSBmcm9tICcuLi9idWlsdC1pbi9maWx0ZXJzL2RhdGFncmlkLXN0cmluZy1maWx0ZXItaW1wbCc7XG5pbXBvcnQgeyBDbHJEYXRhZ3JpZFN0YXRlSW50ZXJmYWNlIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9zdGF0ZS5pbnRlcmZhY2UnO1xuXG5pbXBvcnQgeyBGaWx0ZXJzUHJvdmlkZXIgfSBmcm9tICcuL2ZpbHRlcnMnO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gJy4vcGFnZSc7XG5pbXBvcnQgeyBTb3J0IH0gZnJvbSAnLi9zb3J0JztcbmltcG9ydCB7IFN0YXRlRGVib3VuY2VyIH0gZnJvbSAnLi9zdGF0ZS1kZWJvdW5jZXIucHJvdmlkZXInO1xuXG4vKipcbiAqIFRoaXMgcHJvdmlkZXIgYWdncmVnYXRlcyBzdGF0ZSBjaGFuZ2VzIGZyb20gdGhlIHZhcmlvdXMgcHJvdmlkZXJzIG9mIHRoZSBEYXRhZ3JpZFxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU3RhdGVQcm92aWRlcjxUPiB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZmlsdGVyczogRmlsdGVyc1Byb3ZpZGVyPFQ+LFxuICAgIHByaXZhdGUgc29ydDogU29ydDxUPixcbiAgICBwcml2YXRlIHBhZ2U6IFBhZ2UsXG4gICAgcHJpdmF0ZSBkZWJvdW5jZXI6IFN0YXRlRGVib3VuY2VyXG4gICkge31cblxuICAvKipcbiAgICogVGhlIE9ic2VydmFibGUgdGhhdCBsZXRzIG90aGVyIGNsYXNzZXMgc3Vic2NyaWJlIHRvIGdsb2JhbCBzdGF0ZSBjaGFuZ2VzXG4gICAqL1xuICBjaGFuZ2U6IE9ic2VydmFibGU8Q2xyRGF0YWdyaWRTdGF0ZUludGVyZmFjZTxUPj4gPSB0aGlzLmRlYm91bmNlci5jaGFuZ2UucGlwZShtYXAoKCkgPT4gdGhpcy5zdGF0ZSkpO1xuXG4gIC8qXG4gICAgICogQnkgbWFraW5nIHRoaXMgYSBnZXR0ZXIsIHdlIG9wZW4gdGhlIHBvc3NpYmlsaXR5IGZvciBhIHNldHRlciBpbiB0aGUgZnV0dXJlLlxuICAgICAqIEl0J3MgYmVlbiByZXF1ZXN0ZWQgYSBjb3VwbGUgdGltZXMuXG4gICAgICovXG4gIGdldCBzdGF0ZSgpOiBDbHJEYXRhZ3JpZFN0YXRlSW50ZXJmYWNlPFQ+IHtcbiAgICBjb25zdCBzdGF0ZTogQ2xyRGF0YWdyaWRTdGF0ZUludGVyZmFjZTxUPiA9IHt9O1xuICAgIGlmICh0aGlzLnBhZ2Uuc2l6ZSA+IDApIHtcbiAgICAgIHN0YXRlLnBhZ2UgPSB7IGZyb206IHRoaXMucGFnZS5maXJzdEl0ZW0sIHRvOiB0aGlzLnBhZ2UubGFzdEl0ZW0sIHNpemU6IHRoaXMucGFnZS5zaXplIH07XG4gICAgfVxuICAgIGlmICh0aGlzLnNvcnQuY29tcGFyYXRvcikge1xuICAgICAgaWYgKHRoaXMuc29ydC5jb21wYXJhdG9yIGluc3RhbmNlb2YgRGF0YWdyaWRQcm9wZXJ0eUNvbXBhcmF0b3IpIHtcbiAgICAgICAgLypcbiAgICAgICAgICAgICAgICAgKiBTcGVjaWFsIGNhc2UgZm9yIHRoZSBkZWZhdWx0IG9iamVjdCBwcm9wZXJ0eSBjb21wYXJhdG9yLFxuICAgICAgICAgICAgICAgICAqIHdlIGdpdmUgdGhlIHByb3BlcnR5IG5hbWUgaW5zdGVhZCBvZiB0aGUgYWN0dWFsIGNvbXBhcmF0b3IuXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgIHN0YXRlLnNvcnQgPSB7IGJ5OiAoPERhdGFncmlkUHJvcGVydHlDb21wYXJhdG9yPFQ+PnRoaXMuc29ydC5jb21wYXJhdG9yKS5wcm9wLCByZXZlcnNlOiB0aGlzLnNvcnQucmV2ZXJzZSB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RhdGUuc29ydCA9IHsgYnk6IHRoaXMuc29ydC5jb21wYXJhdG9yLCByZXZlcnNlOiB0aGlzLnNvcnQucmV2ZXJzZSB9O1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGFjdGl2ZUZpbHRlcnMgPSB0aGlzLmZpbHRlcnMuZ2V0QWN0aXZlRmlsdGVycygpO1xuICAgIGlmIChhY3RpdmVGaWx0ZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgIHN0YXRlLmZpbHRlcnMgPSBbXTtcbiAgICAgIGZvciAoY29uc3QgZmlsdGVyIG9mIGFjdGl2ZUZpbHRlcnMpIHtcbiAgICAgICAgaWYgKGZpbHRlciBpbnN0YW5jZW9mIERhdGFncmlkU3RyaW5nRmlsdGVySW1wbCkge1xuICAgICAgICAgIGNvbnN0IHN0cmluZ0ZpbHRlciA9IGZpbHRlci5maWx0ZXJGbjtcbiAgICAgICAgICBpZiAoc3RyaW5nRmlsdGVyIGluc3RhbmNlb2YgRGF0YWdyaWRQcm9wZXJ0eVN0cmluZ0ZpbHRlcikge1xuICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAgICAgICAgICAgICAqIFNwZWNpYWwgY2FzZSBhZ2FpbiBmb3IgdGhlIGRlZmF1bHQgb2JqZWN0IHByb3BlcnR5IGZpbHRlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAqIHdlIGdpdmUgdGhlIHByb3BlcnR5IG5hbWUgaW5zdGVhZCBvZiB0aGUgZnVsbCBmaWx0ZXIgb2JqZWN0LlxuICAgICAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICBzdGF0ZS5maWx0ZXJzLnB1c2goe1xuICAgICAgICAgICAgICBwcm9wZXJ0eTogc3RyaW5nRmlsdGVyLnByb3AsXG4gICAgICAgICAgICAgIHZhbHVlOiBmaWx0ZXIudmFsdWUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzdGF0ZS5maWx0ZXJzLnB1c2goZmlsdGVyKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG59XG4iXX0=