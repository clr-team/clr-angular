import { OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { DatagridDisplayMode } from '../enums/display-mode.enum';
import { DatagridRenderOrganizer } from '../render/render-organizer';
export declare class DisplayModeService implements OnDestroy {
    private subscriptions;
    protected _view: BehaviorSubject<DatagridDisplayMode>;
    constructor(renderOrganizer: DatagridRenderOrganizer);
    readonly view: Observable<DatagridDisplayMode>;
    ngOnDestroy(): void;
}
