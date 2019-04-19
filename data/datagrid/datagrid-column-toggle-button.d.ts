import { ColumnsService } from './providers/columns.service';
export declare class ClrDatagridColumnToggleButton {
    private columnsService;
    constructor(columnsService: ColumnsService);
    private hideableColumns;
    readonly allHideablesVisible: boolean;
    selectAll(): void;
}
