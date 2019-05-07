import { OnDestroy } from '@angular/core';
import { IfActiveService } from '../../utils/conditional/if-active.service';
import { AriaService } from './providers/aria.service';
import { TabsService } from './providers/tabs.service';
export declare class ClrTabContent implements OnDestroy {
    ifActiveService: IfActiveService;
    id: number;
    private ariaService;
    private tabsService;
    constructor(ifActiveService: IfActiveService, id: number, ariaService: AriaService, tabsService: TabsService);
    private viewRef;
    private templateRef;
    readonly ariaLabelledBy: string;
    tabContentId: string;
    readonly active: boolean;
    ngOnDestroy(): void;
}
