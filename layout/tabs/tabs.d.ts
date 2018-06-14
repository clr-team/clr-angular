import { AfterContentInit, QueryList } from '@angular/core';
import { IfActiveService } from '../../utils/conditional/if-active.service';
import { IfOpenService } from '../../utils/conditional/if-open.service';
import { TabsService } from './providers/tabs.service';
import { ClrTabLink } from './tab-link.directive';
export declare class ClrTabs implements AfterContentInit {
    ifActiveService: IfActiveService;
    ifOpenService: IfOpenService;
    tabsService: TabsService;
    tabsId: number;
    tabLinkDirectives: QueryList<ClrTabLink>;
    constructor(ifActiveService: IfActiveService, ifOpenService: IfOpenService, tabsService: TabsService, tabsId: number);
    readonly activeTabInOverflow: boolean;
    ngAfterContentInit(): void;
    toggleOverflow(event: any): void;
}
