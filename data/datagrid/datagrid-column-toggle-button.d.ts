import { ColumnToggleButtons, ColumnToggleButtonsService } from './providers/column-toggle-buttons.service';
export declare class ClrDatagridColumnToggleButton {
    toggleButtons: ColumnToggleButtonsService;
    /** @deprecated since 0.13 */
    clrType: ColumnToggleButtons;
    constructor(toggleButtons: ColumnToggleButtonsService);
    click(): void;
}
