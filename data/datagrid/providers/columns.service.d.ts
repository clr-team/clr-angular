import { OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { DatagridColumnState } from '../interfaces/column-state.interface';
import { DatagridRenderOrganizer } from '../render/render-organizer';
export declare class ColumnsService implements OnDestroy {
    private organizer;
    subscriptions: Subscription[];
    columns: BehaviorSubject<DatagridColumnState>[];
    constructor(organizer: DatagridRenderOrganizer);
    ngOnDestroy(): void;
    private reset;
    emitStateChange(columnIndex: number, diff: Partial<DatagridColumnState>): void;
}
