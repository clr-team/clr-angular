import { EventEmitter, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ColumnsService } from './providers/columns.service';
import { ColumnState } from './interfaces/column-state.interface';
export declare class ClrDatagridHideableColumn implements OnDestroy {
    private titleTemplateRef;
    private viewContainerRef;
    private columnsService;
    private columnState;
    /**
     *
     * @description
     * Used to initialize the column with either hidden or visible state.
     *
     */
    private _hidden;
    /**
     *
     * @description
     * Setter fn for the @Input with the same name as this structural directive.
     * It allows the user to pre-configure the column's hide/show state. { hidden: true }
     * It's more verbose but has more Clarity.
     *
     *
     * @example
     * *clrDgHideableColumn
     * *clrDgHideableColumn={hidden: false}
     * *clrDgHideableColumn={hidden: true}
     *
     */
    clrDgHideableColumn: {
        hidden: boolean;
    };
    clrDgHidden: boolean;
    hiddenChange: EventEmitter<boolean>;
    constructor(titleTemplateRef: TemplateRef<any>, viewContainerRef: ViewContainerRef, columnsService: ColumnsService, columnState: BehaviorSubject<ColumnState>);
    private subscriptions;
    ngOnInit(): void;
    ngOnDestroy(): void;
}
