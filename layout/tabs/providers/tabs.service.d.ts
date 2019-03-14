import { ClrTab } from '../tab';
import { TabsLayout } from '../enums/tabs-layout.enum';
export declare class TabsService {
    private _children;
    layout: TabsLayout;
    register(tab: ClrTab): void;
    readonly children: ClrTab[];
    readonly activeTab: ClrTab;
    readonly overflowTabs: ClrTab[];
    unregister(tab: ClrTab): void;
}
