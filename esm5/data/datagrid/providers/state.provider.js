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
var StateProvider = /** @class */ (function () {
    function StateProvider(filters, sort, page, debouncer) {
        var _this = this;
        this.filters = filters;
        this.sort = sort;
        this.page = page;
        this.debouncer = debouncer;
        /**
         * The Observable that lets other classes subscribe to global state changes
         */
        this.change = this.debouncer.change.pipe(map(function () { return _this.state; }));
    }
    Object.defineProperty(StateProvider.prototype, "state", {
        /*
           * By making this a getter, we open the possibility for a setter in the future.
           * It's been requested a couple times.
           */
        get: /*
             * By making this a getter, we open the possibility for a setter in the future.
             * It's been requested a couple times.
             */
        /**
         * @return {?}
         */
        function () {
            var e_1, _a;
            /** @type {?} */
            var state = {};
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
            var activeFilters = this.filters.getActiveFilters();
            if (activeFilters.length > 0) {
                state.filters = [];
                try {
                    for (var activeFilters_1 = tslib_1.__values(activeFilters), activeFilters_1_1 = activeFilters_1.next(); !activeFilters_1_1.done; activeFilters_1_1 = activeFilters_1.next()) {
                        var filter = activeFilters_1_1.value;
                        if (filter instanceof DatagridStringFilterImpl) {
                            /** @type {?} */
                            var stringFilter = filter.filterFn;
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
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (activeFilters_1_1 && !activeFilters_1_1.done && (_a = activeFilters_1.return)) _a.call(activeFilters_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            return state;
        },
        enumerable: true,
        configurable: true
    });
    StateProvider.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    StateProvider.ctorParameters = function () { return [
        { type: FiltersProvider },
        { type: Sort },
        { type: Page },
        { type: StateDebouncer }
    ]; };
    return StateProvider;
}());
export { StateProvider };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUucHJvdmlkZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJkYXRhL2RhdGFncmlkL3Byb3ZpZGVycy9zdGF0ZS5wcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFckMsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sc0RBQXNELENBQUM7QUFDbEcsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0scURBQXFELENBQUM7QUFDbkcsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0saURBQWlELENBQUM7QUFHM0YsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUM1QyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQzlCLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFDOUIsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDRCQUE0QixDQUFDOzs7OztBQUs1RDtJQUVFLHVCQUNVLE9BQTJCLEVBQzNCLElBQWEsRUFDYixJQUFVLEVBQ1YsU0FBeUI7UUFKbkMsaUJBS0k7UUFKTSxZQUFPLEdBQVAsT0FBTyxDQUFvQjtRQUMzQixTQUFJLEdBQUosSUFBSSxDQUFTO1FBQ2IsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUNWLGNBQVMsR0FBVCxTQUFTLENBQWdCOzs7O1FBTW5DLFdBQU0sR0FBNkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLEtBQUssRUFBVixDQUFVLENBQUMsQ0FBQyxDQUFDO0lBTGxHLENBQUM7SUFXSixzQkFBSSxnQ0FBSztRQUpUOzs7YUFHSzs7Ozs7Ozs7UUFDTDs7O2dCQUNRLEtBQUssR0FBaUMsRUFBRTtZQUM5QyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsRUFBRTtnQkFDdEIsS0FBSyxDQUFDLElBQUksR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDMUY7WUFDRCxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO2dCQUN4QixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxZQUFZLDBCQUEwQixFQUFFO29CQUM5RDs7OytCQUdXO29CQUNYLEtBQUssQ0FBQyxJQUFJLEdBQUcsRUFBRSxFQUFFLEVBQUUsQ0FBQyxtQkFBK0IsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUEsQ0FBQyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztpQkFDN0c7cUJBQU07b0JBQ0wsS0FBSyxDQUFDLElBQUksR0FBRyxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztpQkFDdkU7YUFDRjs7Z0JBRUssYUFBYSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUU7WUFDckQsSUFBSSxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDNUIsS0FBSyxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7O29CQUNuQixLQUFxQixJQUFBLGtCQUFBLGlCQUFBLGFBQWEsQ0FBQSw0Q0FBQSx1RUFBRTt3QkFBL0IsSUFBTSxNQUFNLDBCQUFBO3dCQUNmLElBQUksTUFBTSxZQUFZLHdCQUF3QixFQUFFOztnQ0FDeEMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxRQUFROzRCQUNwQyxJQUFJLFlBQVksWUFBWSw0QkFBNEIsRUFBRTtnQ0FDeEQ7OzsrQ0FHZTtnQ0FDZixLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztvQ0FDakIsUUFBUSxFQUFFLFlBQVksQ0FBQyxJQUFJO29DQUMzQixLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUs7aUNBQ3BCLENBQUMsQ0FBQztnQ0FDSCxTQUFTOzZCQUNWO3lCQUNGO3dCQUNELEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO3FCQUM1Qjs7Ozs7Ozs7O2FBQ0Y7WUFDRCxPQUFPLEtBQUssQ0FBQztRQUNmLENBQUM7OztPQUFBOztnQkF6REYsVUFBVTs7OztnQkFSRixlQUFlO2dCQUVmLElBQUk7Z0JBREosSUFBSTtnQkFFSixjQUFjOztJQStEdkIsb0JBQUM7Q0FBQSxBQTFERCxJQTBEQztTQXpEWSxhQUFhOzs7Ozs7SUFXeEIsK0JBQXFHOztJQVRuRyxnQ0FBbUM7O0lBQ25DLDZCQUFxQjs7SUFDckIsNkJBQWtCOztJQUNsQixrQ0FBaUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IERhdGFncmlkUHJvcGVydHlDb21wYXJhdG9yIH0gZnJvbSAnLi4vYnVpbHQtaW4vY29tcGFyYXRvcnMvZGF0YWdyaWQtcHJvcGVydHktY29tcGFyYXRvcic7XG5pbXBvcnQgeyBEYXRhZ3JpZFByb3BlcnR5U3RyaW5nRmlsdGVyIH0gZnJvbSAnLi4vYnVpbHQtaW4vZmlsdGVycy9kYXRhZ3JpZC1wcm9wZXJ0eS1zdHJpbmctZmlsdGVyJztcbmltcG9ydCB7IERhdGFncmlkU3RyaW5nRmlsdGVySW1wbCB9IGZyb20gJy4uL2J1aWx0LWluL2ZpbHRlcnMvZGF0YWdyaWQtc3RyaW5nLWZpbHRlci1pbXBsJztcbmltcG9ydCB7IENsckRhdGFncmlkU3RhdGVJbnRlcmZhY2UgfSBmcm9tICcuLi9pbnRlcmZhY2VzL3N0YXRlLmludGVyZmFjZSc7XG5cbmltcG9ydCB7IEZpbHRlcnNQcm92aWRlciB9IGZyb20gJy4vZmlsdGVycyc7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSAnLi9wYWdlJztcbmltcG9ydCB7IFNvcnQgfSBmcm9tICcuL3NvcnQnO1xuaW1wb3J0IHsgU3RhdGVEZWJvdW5jZXIgfSBmcm9tICcuL3N0YXRlLWRlYm91bmNlci5wcm92aWRlcic7XG5cbi8qKlxuICogVGhpcyBwcm92aWRlciBhZ2dyZWdhdGVzIHN0YXRlIGNoYW5nZXMgZnJvbSB0aGUgdmFyaW91cyBwcm92aWRlcnMgb2YgdGhlIERhdGFncmlkXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTdGF0ZVByb3ZpZGVyPFQ+IHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBmaWx0ZXJzOiBGaWx0ZXJzUHJvdmlkZXI8VD4sXG4gICAgcHJpdmF0ZSBzb3J0OiBTb3J0PFQ+LFxuICAgIHByaXZhdGUgcGFnZTogUGFnZSxcbiAgICBwcml2YXRlIGRlYm91bmNlcjogU3RhdGVEZWJvdW5jZXJcbiAgKSB7fVxuXG4gIC8qKlxuICAgKiBUaGUgT2JzZXJ2YWJsZSB0aGF0IGxldHMgb3RoZXIgY2xhc3NlcyBzdWJzY3JpYmUgdG8gZ2xvYmFsIHN0YXRlIGNoYW5nZXNcbiAgICovXG4gIGNoYW5nZTogT2JzZXJ2YWJsZTxDbHJEYXRhZ3JpZFN0YXRlSW50ZXJmYWNlPFQ+PiA9IHRoaXMuZGVib3VuY2VyLmNoYW5nZS5waXBlKG1hcCgoKSA9PiB0aGlzLnN0YXRlKSk7XG5cbiAgLypcbiAgICAgKiBCeSBtYWtpbmcgdGhpcyBhIGdldHRlciwgd2Ugb3BlbiB0aGUgcG9zc2liaWxpdHkgZm9yIGEgc2V0dGVyIGluIHRoZSBmdXR1cmUuXG4gICAgICogSXQncyBiZWVuIHJlcXVlc3RlZCBhIGNvdXBsZSB0aW1lcy5cbiAgICAgKi9cbiAgZ2V0IHN0YXRlKCk6IENsckRhdGFncmlkU3RhdGVJbnRlcmZhY2U8VD4ge1xuICAgIGNvbnN0IHN0YXRlOiBDbHJEYXRhZ3JpZFN0YXRlSW50ZXJmYWNlPFQ+ID0ge307XG4gICAgaWYgKHRoaXMucGFnZS5zaXplID4gMCkge1xuICAgICAgc3RhdGUucGFnZSA9IHsgZnJvbTogdGhpcy5wYWdlLmZpcnN0SXRlbSwgdG86IHRoaXMucGFnZS5sYXN0SXRlbSwgc2l6ZTogdGhpcy5wYWdlLnNpemUgfTtcbiAgICB9XG4gICAgaWYgKHRoaXMuc29ydC5jb21wYXJhdG9yKSB7XG4gICAgICBpZiAodGhpcy5zb3J0LmNvbXBhcmF0b3IgaW5zdGFuY2VvZiBEYXRhZ3JpZFByb3BlcnR5Q29tcGFyYXRvcikge1xuICAgICAgICAvKlxuICAgICAgICAgICAgICAgICAqIFNwZWNpYWwgY2FzZSBmb3IgdGhlIGRlZmF1bHQgb2JqZWN0IHByb3BlcnR5IGNvbXBhcmF0b3IsXG4gICAgICAgICAgICAgICAgICogd2UgZ2l2ZSB0aGUgcHJvcGVydHkgbmFtZSBpbnN0ZWFkIG9mIHRoZSBhY3R1YWwgY29tcGFyYXRvci5cbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgc3RhdGUuc29ydCA9IHsgYnk6ICg8RGF0YWdyaWRQcm9wZXJ0eUNvbXBhcmF0b3I8VD4+dGhpcy5zb3J0LmNvbXBhcmF0b3IpLnByb3AsIHJldmVyc2U6IHRoaXMuc29ydC5yZXZlcnNlIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdGF0ZS5zb3J0ID0geyBieTogdGhpcy5zb3J0LmNvbXBhcmF0b3IsIHJldmVyc2U6IHRoaXMuc29ydC5yZXZlcnNlIH07XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgYWN0aXZlRmlsdGVycyA9IHRoaXMuZmlsdGVycy5nZXRBY3RpdmVGaWx0ZXJzKCk7XG4gICAgaWYgKGFjdGl2ZUZpbHRlcnMubGVuZ3RoID4gMCkge1xuICAgICAgc3RhdGUuZmlsdGVycyA9IFtdO1xuICAgICAgZm9yIChjb25zdCBmaWx0ZXIgb2YgYWN0aXZlRmlsdGVycykge1xuICAgICAgICBpZiAoZmlsdGVyIGluc3RhbmNlb2YgRGF0YWdyaWRTdHJpbmdGaWx0ZXJJbXBsKSB7XG4gICAgICAgICAgY29uc3Qgc3RyaW5nRmlsdGVyID0gZmlsdGVyLmZpbHRlckZuO1xuICAgICAgICAgIGlmIChzdHJpbmdGaWx0ZXIgaW5zdGFuY2VvZiBEYXRhZ3JpZFByb3BlcnR5U3RyaW5nRmlsdGVyKSB7XG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgICAgICAgICAgICAgICogU3BlY2lhbCBjYXNlIGFnYWluIGZvciB0aGUgZGVmYXVsdCBvYmplY3QgcHJvcGVydHkgZmlsdGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICogd2UgZ2l2ZSB0aGUgcHJvcGVydHkgbmFtZSBpbnN0ZWFkIG9mIHRoZSBmdWxsIGZpbHRlciBvYmplY3QuXG4gICAgICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHN0YXRlLmZpbHRlcnMucHVzaCh7XG4gICAgICAgICAgICAgIHByb3BlcnR5OiBzdHJpbmdGaWx0ZXIucHJvcCxcbiAgICAgICAgICAgICAgdmFsdWU6IGZpbHRlci52YWx1ZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHN0YXRlLmZpbHRlcnMucHVzaChmaWx0ZXIpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn1cbiJdfQ==