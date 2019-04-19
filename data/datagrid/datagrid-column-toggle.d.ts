import { Point } from '../../popover/common/popover';
import { ClrDatagridColumnToggleButton } from './datagrid-column-toggle-button';
import { ClrDatagridColumnToggleTitle } from './datagrid-column-toggle-title';
import { ClrCommonStrings } from '../../utils/i18n/common-strings.interface';
import { ColumnsService } from './providers/columns.service';
import { ColumnState } from './interfaces/column-state.interface';
export declare class ClrDatagridColumnToggle {
    commonStrings: ClrCommonStrings;
    private columnsService;
    /***
     * Popover init
     */
    anchorPoint: Point;
    popoverPoint: Point;
    open: boolean;
    customToggleTitle: ClrDatagridColumnToggleTitle;
    customToggleButton: ClrDatagridColumnToggleButton;
    constructor(commonStrings: ClrCommonStrings, columnsService: ColumnsService);
    readonly hideableColumnStates: ColumnState[];
    readonly hasOnlyOneVisibleColumn: boolean;
    toggleColumnState(columnState: ColumnState, event: boolean): void;
    toggleSwitchPanel(): void;
}
