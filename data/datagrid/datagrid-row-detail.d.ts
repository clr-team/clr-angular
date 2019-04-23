import { AfterContentInit, OnDestroy, QueryList } from '@angular/core';
import { ClrDatagridCell } from './datagrid-cell';
import { ExpandableRowsCount } from './providers/global-expandable-rows';
import { RowActionService } from './providers/row-action-service';
import { Selection } from './providers/selection';
import { SelectionType } from './enums/selection-type';
import { DatagridIfExpandService } from './datagrid-if-expanded.service';
/**
 * Generic bland container serving various purposes for Datagrid.
 * For instance, it can help span a text over multiple rows in detail view.
 */
export declare class ClrDatagridRowDetail<T = any> implements AfterContentInit, OnDestroy {
    selection: Selection;
    rowActionService: RowActionService;
    expand: DatagridIfExpandService;
    expandableRows: ExpandableRowsCount;
    SELECTION_TYPE: typeof SelectionType;
    constructor(selection: Selection, rowActionService: RowActionService, expand: DatagridIfExpandService, expandableRows: ExpandableRowsCount);
    cells: QueryList<ClrDatagridCell>;
    replace: boolean;
    private subscriptions;
    replacedRow: boolean;
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
}
