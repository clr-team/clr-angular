import { OnDestroy, OnInit, QueryList } from '@angular/core';
import { Point } from '../../popover/common/popover';
import { ClrDatagridColumnToggleButton } from './datagrid-column-toggle-button';
import { ClrDatagridColumnToggleTitle } from './datagrid-column-toggle-title';
import { DatagridHideableColumnModel } from './datagrid-hideable-column.model';
import { ColumnToggleButtonsService } from './providers/column-toggle-buttons.service';
import { HideableColumnService } from './providers/hideable-column.service';
export declare class ClrDatagridColumnToggle implements OnInit, OnDestroy {
    hideableColumnService: HideableColumnService;
    private columnToggleButtons;
    private subscriptions;
    private _allColumnsVisible;
    /***
     * Popover init
     */
    anchorPoint: Point;
    popoverPoint: Point;
    open: boolean;
    /****
     * DatagridHideableColumnModel init
     */
    columns: DatagridHideableColumnModel[];
    allColumnsVisible: boolean;
    title: ClrDatagridColumnToggleTitle;
    buttons: QueryList<ClrDatagridColumnToggleButton>;
    constructor(hideableColumnService: HideableColumnService, columnToggleButtons: ColumnToggleButtonsService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    selectAll(): void;
    toggleColumn(event: boolean, column: DatagridHideableColumnModel): void;
    toggleUI(): void;
}
