import { AfterContentInit, OnDestroy } from '@angular/core';
import { IfActiveService } from '../../utils/conditional/if-active.service';
import { IfOpenService } from '../../utils/conditional/if-open.service';
import { TabsService } from './providers/tabs.service';
import { ClrTabLink } from './tab-link.directive';
import { ClrTabContent } from './tab-content';
import { ClrCommonStrings } from '../../utils/i18n/common-strings.interface';
import { TabsLayout } from './enums/tabs-layout.enum';
export declare class ClrTabs implements AfterContentInit, OnDestroy {
    ifActiveService: IfActiveService;
    ifOpenService: IfOpenService;
    tabsService: TabsService;
    tabsId: number;
    commonStrings: ClrCommonStrings;
    private subscriptions;
    layout: TabsLayout;
    private tabs;
    private _tabLinkDirectives;
    readonly tabLinkDirectives: ClrTabLink[];
    readonly tabContents: ClrTabContent[];
    constructor(ifActiveService: IfActiveService, ifOpenService: IfOpenService, tabsService: TabsService, tabsId: number, commonStrings: ClrCommonStrings);
    readonly activeTabInOverflow: boolean;
    readonly tabIds: string;
    ngAfterContentInit(): void;
    toggleOverflow(event: any): void;
    readonly isVertical: boolean;
    ngOnDestroy(): void;
}
