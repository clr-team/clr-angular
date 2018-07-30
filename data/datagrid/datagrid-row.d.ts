import { AfterContentInit, EventEmitter, QueryList } from '@angular/core';
import { Expand } from '../../utils/expand/providers/expand';
import { ClrDatagridCell } from './datagrid-cell';
import { DatagridHideableColumnModel } from './datagrid-hideable-column.model';
import { ExpandableRowsCount } from './providers/global-expandable-rows';
import { HideableColumnService } from './providers/hideable-column.service';
import { RowActionService } from './providers/row-action-service';
import { Selection, SelectionType } from './providers/selection';
export declare class ClrDatagridRow implements AfterContentInit {
    selection: Selection;
    rowActionService: RowActionService;
    globalExpandable: ExpandableRowsCount;
    expand: Expand;
    hideableColumnService: HideableColumnService;
    id: string;
    radioId: string;
    SELECTION_TYPE: typeof SelectionType;
    /**
     * Model of the row, to use for selection
     */
    item: any;
    constructor(selection: Selection, rowActionService: RowActionService, globalExpandable: ExpandableRowsCount, expand: Expand, hideableColumnService: HideableColumnService);
    private _selected;
    /**
     * Indicates if the row is selected
     */
    selected: boolean;
    selectedChanged: EventEmitter<boolean>;
    toggle(selected?: boolean): void;
    expanded: boolean;
    expandedChange: EventEmitter<boolean>;
    toggleExpand(): void;
    private subscription;
    /*****
     * property dgCells
     *
     * @description
     * A Query List of the ClrDatagrid cells in this row.
     *
     */
    dgCells: QueryList<ClrDatagridCell>;
    ngAfterContentInit(): void;
    /**********
     *
     * @description
     * 1. Maps the new columnListChange to the dgCells list by index
     * 2. Sets the hidden state on the cell
     * Take a Column list and use index to access the columns for hideable properties.
     *
     */
    updateCellsForColumns(columnList: DatagridHideableColumnModel[]): void;
    ngOnDestroy(): void;
}
