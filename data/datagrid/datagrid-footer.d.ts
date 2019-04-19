import { ClrDatagridColumnToggle } from './datagrid-column-toggle';
import { Selection } from './providers/selection';
import { SelectionType } from './enums/selection-type';
import { ColumnsService } from './providers/columns.service';
export declare class ClrDatagridFooter<T = any> {
    selection: Selection<T>;
    private columnsService;
    constructor(selection: Selection<T>, columnsService: ColumnsService);
    SELECTION_TYPE: typeof SelectionType;
    toggle: ClrDatagridColumnToggle;
    readonly hasHideableColumns: boolean;
}
