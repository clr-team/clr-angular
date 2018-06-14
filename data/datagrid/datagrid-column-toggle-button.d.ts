import { ColumnToggleButtons, ColumnToggleButtonsService } from './providers/column-toggle-buttons.service';
export declare class ClrDatagridColumnToggleButton {
    toggleButtons: ColumnToggleButtonsService;
    clrType: ColumnToggleButtons;
    constructor(toggleButtons: ColumnToggleButtonsService);
    getClasses(): string;
    isOk(): boolean;
    click(): void;
}
