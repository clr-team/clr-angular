import { AfterContentInit, AfterViewInit, EventEmitter, OnDestroy, QueryList } from '@angular/core';
import { ClrDatagridColumn } from './datagrid-column';
import { ClrDatagridItems } from './datagrid-items';
import { ClrDatagridPlaceholder } from './datagrid-placeholder';
import { ClrDatagridRow } from './datagrid-row';
import { ClrDatagridStateInterface } from './interfaces/state.interface';
import { ExpandableRowsCount } from './providers/global-expandable-rows';
import { HideableColumnService } from './providers/hideable-column.service';
import { Items } from './providers/items';
import { RowActionService } from './providers/row-action-service';
import { Selection, SelectionType } from './providers/selection';
import { StateProvider } from './providers/state.provider';
import { DatagridRenderOrganizer } from './render/render-organizer';
import { ClrCommonStrings } from '../../utils/i18n';
export declare class ClrDatagrid<T = any> implements AfterContentInit, AfterViewInit, OnDestroy {
    private columnService;
    private organizer;
    items: Items<T>;
    expandableRows: ExpandableRowsCount;
    selection: Selection<T>;
    rowActionService: RowActionService;
    private stateProvider;
    commonStrings: ClrCommonStrings;
    constructor(columnService: HideableColumnService, organizer: DatagridRenderOrganizer, items: Items<T>, expandableRows: ExpandableRowsCount, selection: Selection<T>, rowActionService: RowActionService, stateProvider: StateProvider<T>, commonStrings: ClrCommonStrings);
    SELECTION_TYPE: typeof SelectionType;
    /**
     * Freezes the datagrid while data is loading
     */
    loading: boolean;
    /**
     * Output emitted whenever the data needs to be refreshed, based on user action or external ones
     */
    refresh: EventEmitter<ClrDatagridStateInterface<T>>;
    /**
     * Public method to re-trigger the computation of displayed items manually
     */
    dataChanged(): void;
    /**
     * We grab the smart iterator from projected content
     */
    iterator: ClrDatagridItems<T>;
    /**
     * Array of all selected items
     */
    selected: T[];
    selectedChanged: EventEmitter<T[]>;
    /**
     * Selected item in single-select mode
     */
    singleSelected: T;
    singleSelectedChanged: EventEmitter<T>;
    /**
     * Selection/Deselection on row click mode
     */
    rowSelectionMode: boolean;
    /**
     * stay backwards compatible , will be renamed to clrDgRowSelection
     * @deprecated since 0.12
     */
    rowSelectionModeDeprecated: boolean;
    /**
     * Indicates if all currently displayed items are selected
     */
    /**
    * Selects/deselects all currently displayed items
    * @param value
    */
    allSelected: boolean;
    /**
     * Custom placeholder detection
     */
    placeholder: ClrDatagridPlaceholder<T>;
    /**
     * Hideable Column data source / detection.
     */
    columns: QueryList<ClrDatagridColumn<T>>;
    /**
     * When the datagrid is user-managed without the smart iterator, we get the items displayed
     * by querying the projected content. This is needed to keep track of the models currently
     * displayed, typically for selection.
     */
    rows: QueryList<ClrDatagridRow<T>>;
    ngAfterContentInit(): void;
    /**
     * Our setup happens in the view of some of our components, so we wait for it to be done before starting
     */
    ngAfterViewInit(): void;
    /**
     * Subscriptions to all the services and queries changes
     */
    private _subscriptions;
    ngOnDestroy(): void;
    resize(): void;
}
