import { AfterViewInit } from '@angular/core';
import { ColumnsService } from '../providers/columns.service';
export declare class DatagridRowRenderer implements AfterViewInit {
    private columnsService;
    private cells;
    constructor(columnsService: ColumnsService);
    ngAfterViewInit(): void;
    setColumnStates(): void;
}
