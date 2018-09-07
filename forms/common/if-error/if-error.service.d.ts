import { OnDestroy } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { NgControlService } from '../providers/ng-control.service';
export declare class IfErrorService implements OnDestroy {
    private ngControlService;
    private _statusChanges;
    readonly statusChanges: Observable<NgControl>;
    private subscriptions;
    private control;
    constructor(ngControlService: NgControlService);
    private listenForChanges;
    triggerStatusChange(): void;
    ngOnDestroy(): void;
}
