import { Observable } from 'rxjs';
import { ClrDatagridStateInterface } from '../interfaces/state.interface';
import { FiltersProvider } from './filters';
import { Page } from './page';
import { Sort } from './sort';
import { StateDebouncer } from './state-debouncer.provider';
/**
 * This provider aggregates state changes from the various providers of the Datagrid
 */
export declare class StateProvider<T> {
    private filters;
    private sort;
    private page;
    private debouncer;
    constructor(filters: FiltersProvider<T>, sort: Sort<T>, page: Page, debouncer: StateDebouncer);
    /**
     * The Observable that lets other classes subscribe to global state changes
     */
    change: Observable<ClrDatagridStateInterface<T>>;
    readonly state: ClrDatagridStateInterface<T>;
}
