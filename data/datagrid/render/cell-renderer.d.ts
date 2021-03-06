import { ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DatagridRenderOrganizer } from './render-organizer';
import { ColumnState } from '../interfaces/column-state.interface';
export declare class DatagridCellRenderer implements OnDestroy {
    private el;
    private renderer;
    private stateSubscription;
    private runAllChanges;
    columnState: BehaviorSubject<ColumnState>;
    constructor(el: ElementRef, renderer: Renderer2, organizer: DatagridRenderOrganizer);
    private subscriptions;
    ngOnDestroy(): void;
    private stateChanges;
    private clearWidth;
    private setWidth;
    private setHidden;
}
