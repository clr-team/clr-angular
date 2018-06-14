import { EventEmitter } from '@angular/core';
import { Point } from '../../popover/common/popover';
import { PopoverOptions } from '../../popover/common/popover-options.interface';
import { ClrDatagridFilterInterface } from './interfaces/filter.interface';
import { CustomFilter } from './providers/custom-filter';
import { FiltersProvider, RegisteredFilter } from './providers/filters';
import { DatagridFilterRegistrar } from './utils/datagrid-filter-registrar';
/**
 * Custom filter that can be added in any column to override the default object property string filter.
 * The reason this is not just an input on DatagridColumn is because we need the filter's template to be projected,
 * since it can be anything (not just a text input).
 */
export declare class ClrDatagridFilter extends DatagridFilterRegistrar<ClrDatagridFilterInterface<any>> implements CustomFilter {
    constructor(_filters: FiltersProvider);
    anchorPoint: Point;
    popoverPoint: Point;
    popoverOptions: PopoverOptions;
    /**
     * Tracks whether the filter dropdown is open or not
     */
    private _open;
    open: boolean;
    openChanged: EventEmitter<boolean>;
    customFilter: ClrDatagridFilterInterface<any> | RegisteredFilter<ClrDatagridFilterInterface<any>>;
    /**
     * Indicates if the filter is currently active
     */
    readonly active: boolean;
    /**
     * Shows/hides the filter dropdown
     */
    toggle(): void;
}
