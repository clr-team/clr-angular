import { AfterContentInit, OnDestroy, QueryList } from '@angular/core';
import { Expand } from '../../utils/expand/providers/expand';
import { ClrDatagridCell } from './datagrid-cell';
import { DatagridHideableColumnModel } from './datagrid-hideable-column.model';
import { HideableColumnService } from './providers/hideable-column.service';
import { RowActionService } from './providers/row-action-service';
import { Selection, SelectionType } from './providers/selection';
/**
 * Generic bland container serving various purposes for Datagrid.
 * For instance, it can help span a text over multiple rows in detail view.
 */
export declare class ClrDatagridRowDetail<T = any> implements AfterContentInit, OnDestroy {
    selection: Selection<T>;
    rowActionService: RowActionService;
    expand: Expand;
    hideableColumnService: HideableColumnService;
    SELECTION_TYPE: typeof SelectionType;
    constructor(selection: Selection<T>, rowActionService: RowActionService, expand: Expand, hideableColumnService: HideableColumnService);
    cells: QueryList<ClrDatagridCell>;
    replace: boolean;
    /**
     * Subscriptions to all the services and QueryList changes
     */
    private _subscriptions;
    ngAfterContentInit(): void;
    updateCellsForColumns(columnList: DatagridHideableColumnModel[]): void;
    ngOnDestroy(): void;
}
