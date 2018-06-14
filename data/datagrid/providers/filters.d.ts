import { Observable } from 'rxjs';
import { ClrDatagridFilterInterface } from '../interfaces/filter.interface';
import { Page } from './page';
import { StateDebouncer } from './state-debouncer.provider';
export declare class FiltersProvider {
    private _page;
    private stateDebouncer;
    constructor(_page: Page, stateDebouncer: StateDebouncer);
    /**
     * This subject is the list of filters that changed last, not the whole list.
     * We emit a list rather than just one filter to allow batch changes to several at once.
     */
    private _change;
    readonly change: Observable<ClrDatagridFilterInterface<any>[]>;
    /**
     * List of all filters, whether they're active or not
     */
    private _all;
    /**
     * Tests if at least one filter is currently active
     */
    hasActiveFilters(): boolean;
    /**
     * Returns a list of all currently active filters
     */
    getActiveFilters(): ClrDatagridFilterInterface<any>[];
    /**
     * Registers a filter, and returns a deregistration function
     */
    add<F extends ClrDatagridFilterInterface<any>>(filter: F): RegisteredFilter<F>;
    /**
     * Accepts an item if it is accepted by all currently active filters
     */
    accepts(item: any): boolean;
    private resetPageAndEmitFilterChange(filters);
}
export declare class RegisteredFilter<F extends ClrDatagridFilterInterface<any>> {
    filter: F;
    unregister: () => void;
    constructor(filter: F, unregister: () => void);
}
