import { Observable } from 'rxjs';
import { ClrDatagridComparatorInterface } from '../interfaces/comparator.interface';
import { StateDebouncer } from './state-debouncer.provider';
export declare class Sort {
    private stateDebouncer;
    constructor(stateDebouncer: StateDebouncer);
    /**
     * Currently active comparator
     */
    private _comparator;
    comparator: ClrDatagridComparatorInterface<any>;
    /**
     * Ascending order if false, descending if true
     */
    private _reverse;
    reverse: boolean;
    /**
     * The Observable that lets other classes subscribe to sort changes
     */
    private _change;
    private emitChange();
    readonly change: Observable<Sort>;
    /**
     * Sets a comparator as the current one, or toggles reverse if the comparator is already used. The
     * optional forceReverse input parameter allows to override that toggling behavior by sorting in
     * reverse order if `true`.
     *
     * @memberof Sort
     */
    toggle(sortBy: ClrDatagridComparatorInterface<any>, forceReverse?: boolean): void;
    /**
     * Clears the current sorting order
     */
    clear(): void;
    /**
     * Compares two objects according to the current comparator
     */
    compare(a: any, b: any): number;
}
