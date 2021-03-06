import { Observable } from 'rxjs';
import { ClrDatagridFilterInterface } from '../../interfaces/filter.interface';
import { ClrDatagridStringFilterInterface } from '../../interfaces/string-filter.interface';
export declare class DatagridStringFilterImpl<T = any> implements ClrDatagridFilterInterface<T> {
    filterFn: ClrDatagridStringFilterInterface<T>;
    constructor(filterFn: ClrDatagridStringFilterInterface<T>);
    /**
     * The Observable required as part of the Filter interface
     */
    private _changes;
    readonly changes: Observable<string>;
    /**
     * Raw input value
     */
    private _rawValue;
    /**
    * Common setter for the input value
    */
    value: string;
    /**
     * Input value converted to lowercase
     */
    private _lowerCaseValue;
    readonly lowerCaseValue: string;
    /**
     * Indicates if the filter is currently active, meaning the input is not empty
     */
    isActive(): boolean;
    /**
     * Tests if an item matches a search text
     */
    accepts(item: T): boolean;
    readonly state: this | {
        property: string;
        value: string;
    };
    equals(other: ClrDatagridFilterInterface<T, any>): boolean;
}
