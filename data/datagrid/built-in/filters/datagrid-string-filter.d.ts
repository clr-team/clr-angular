import { AfterViewInit, ElementRef, EventEmitter } from '@angular/core';
import { ClrDatagridFilter } from '../../datagrid-filter';
import { ClrDatagridStringFilterInterface } from '../../interfaces/string-filter.interface';
import { CustomFilter } from '../../providers/custom-filter';
import { FiltersProvider, RegisteredFilter } from '../../providers/filters';
import { DomAdapter } from '../../render/dom-adapter';
import { DatagridFilterRegistrar } from '../../utils/datagrid-filter-registrar';
import { DatagridStringFilterImpl } from './datagrid-string-filter-impl';
export declare class DatagridStringFilter extends DatagridFilterRegistrar<DatagridStringFilterImpl> implements CustomFilter, AfterViewInit {
    private domAdapter;
    constructor(filters: FiltersProvider, domAdapter: DomAdapter);
    /**
     * Customizable filter logic based on a search text
     */
    customStringFilter: ClrDatagridStringFilterInterface<any> | RegisteredFilter<DatagridStringFilterImpl>;
    /**
     * Indicates if the filter dropdown is open
     */
    open: boolean;
    /**
     * We need the actual input element to automatically focus on it
     */
    input: ElementRef;
    /**
     * We grab the ClrDatagridFilter we wrap to register this StringFilter to it.
     */
    filterContainer: ClrDatagridFilter;
    ngAfterViewInit(): void;
    /**
     * Common setter for the input value
     */
    value: string;
    filterValueChange: EventEmitter<{}>;
    close(): void;
}
