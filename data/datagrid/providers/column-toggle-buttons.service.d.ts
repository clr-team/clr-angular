import { TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
export declare type ColumnToggleButtons = 'ok' | 'selectAll';
export declare class ColumnToggleButtonsService {
    buttons: TemplateRef<any>;
    selectAllDisabled: boolean;
    private _okButtonClicked;
    readonly okButtonClicked: Observable<any>;
    private _selectAllButtonClicked;
    readonly selectAllButtonClicked: Observable<any>;
    buttonClicked(type: ColumnToggleButtons): void;
}
