/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ContentChildren, Inject, QueryList, Input, HostBinding, } from '@angular/core';
import { IfActiveService } from '../../utils/conditional/if-active.service';
import { IfOpenService } from '../../utils/conditional/if-open.service';
import { TabsService } from './providers/tabs.service';
import { ClrTab } from './tab';
import { TABS_ID, TABS_ID_PROVIDER } from './tabs-id.provider';
import { ClrCommonStrings } from '../../utils/i18n/common-strings.interface';
import { TabsLayout } from './enums/tabs-layout.enum';
export class ClrTabs {
    /**
     * @param {?} ifActiveService
     * @param {?} ifOpenService
     * @param {?} tabsService
     * @param {?} tabsId
     * @param {?} commonStrings
     */
    constructor(ifActiveService, ifOpenService, tabsService, tabsId, commonStrings) {
        this.ifActiveService = ifActiveService;
        this.ifOpenService = ifOpenService;
        this.tabsService = tabsService;
        this.tabsId = tabsId;
        this.commonStrings = commonStrings;
        this.subscriptions = [];
        this._tabLinkDirectives = [];
    }
    /**
     * @param {?} layout
     * @return {?}
     */
    set layout(layout) {
        if (Object.keys(TabsLayout)
            .map((/**
         * @param {?} key
         * @return {?}
         */
        key => {
            return TabsLayout[key];
        }))
            .indexOf(layout) >= 0) {
            this.tabsService.layout = layout;
        }
    }
    /**
     * @return {?}
     */
    get layout() {
        return this.tabsService.layout;
    }
    /**
     * @return {?}
     */
    get tabLinkDirectives() {
        return this._tabLinkDirectives;
    }
    /**
     * @return {?}
     */
    get tabContents() {
        return this.tabs.filter((/**
         * @param {?} tab
         * @return {?}
         */
        tab => !!tab.tabContent)).map((/**
         * @param {?} tab
         * @return {?}
         */
        tab => tab.tabContent));
    }
    /**
     * @return {?}
     */
    get activeTabInOverflow() {
        return this.tabsService.overflowTabs.indexOf(this.tabsService.activeTab) > -1;
    }
    /**
     * @return {?}
     */
    get tabIds() {
        return this.tabsService.children.map((/**
         * @param {?} tab
         * @return {?}
         */
        tab => tab.tabLink.tabLinkId)).join(' ');
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this._tabLinkDirectives = this.tabs.map((/**
         * @param {?} tab
         * @return {?}
         */
        tab => tab.tabLink));
        this.subscriptions.push(this.tabs.changes.subscribe((/**
         * @return {?}
         */
        () => {
            this._tabLinkDirectives = this.tabs.map((/**
             * @param {?} tab
             * @return {?}
             */
            tab => tab.tabLink));
        })));
        if (typeof this.ifActiveService.current === 'undefined' && this.tabLinkDirectives[0]) {
            this.tabLinkDirectives[0].activate();
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    toggleOverflow(event) {
        this.ifOpenService.toggleWithEvent(event);
    }
    /**
     * @return {?}
     */
    get isVertical() {
        return this.layout === TabsLayout.VERTICAL;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        sub => {
            sub.unsubscribe();
        }));
    }
}
ClrTabs.decorators = [
    { type: Component, args: [{
                selector: 'clr-tabs',
                template: `
        <ul class="nav" role="tablist" [attr.aria-owns]="tabIds">
            <!--tab links-->
            <ng-container *ngFor="let link of tabLinkDirectives">
                <ng-container *ngIf="link.tabsId === tabsId && !link.inOverflow">
                    <li role="presentation" class="nav-item">
                        <ng-container [ngTemplateOutlet]="link.templateRefContainer.template"></ng-container>
                    </li>
                </ng-container>
            </ng-container>
            <ng-container *ngIf="tabsService.overflowTabs.length > 0">
                <div class="tabs-overflow bottom-right" [class.open]="ifOpenService.open"
                     (click)="toggleOverflow($event)">
                    <li role="presentation" class="nav-item">
                        <button class="btn btn-link nav-link dropdown-toggle" type="button" [class.active]="activeTabInOverflow">
                            <clr-icon shape="ellipsis-horizontal"
                              [class.is-info]="ifOpenService.open"
                              [attr.title]="commonStrings.more"></clr-icon>
                        </button>
                    </li>
                    <!--tab links in overflow menu-->
                    <clr-tab-overflow-content>
                        <ng-container *ngFor="let link of tabLinkDirectives">
                            <ng-container *ngIf="link.tabsId === tabsId && link.inOverflow"
                                          [ngTemplateOutlet]="link.templateRefContainer.template">
                            </ng-container>
                        </ng-container>
                    </clr-tab-overflow-content>
                </div>
            </ng-container>
        </ul>
        <!--tab content-->
        <ng-container *ngFor="let content of tabContents">
            <ng-container [ngTemplateOutlet]="content.templateRef"></ng-container>
        </ng-container>
    `,
                providers: [IfActiveService, IfOpenService, TabsService, TABS_ID_PROVIDER]
            }] }
];
/** @nocollapse */
ClrTabs.ctorParameters = () => [
    { type: IfActiveService },
    { type: IfOpenService },
    { type: TabsService },
    { type: Number, decorators: [{ type: Inject, args: [TABS_ID,] }] },
    { type: ClrCommonStrings }
];
ClrTabs.propDecorators = {
    layout: [{ type: Input, args: ['clrLayout',] }],
    tabs: [{ type: ContentChildren, args: [ClrTab,] }],
    isVertical: [{ type: HostBinding, args: ['class.tabs-vertical',] }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    ClrTabs.prototype.subscriptions;
    /**
     * @type {?}
     * @private
     */
    ClrTabs.prototype.tabs;
    /**
     * @type {?}
     * @private
     */
    ClrTabs.prototype._tabLinkDirectives;
    /** @type {?} */
    ClrTabs.prototype.ifActiveService;
    /** @type {?} */
    ClrTabs.prototype.ifOpenService;
    /** @type {?} */
    ClrTabs.prototype.tabsService;
    /** @type {?} */
    ClrTabs.prototype.tabsId;
    /** @type {?} */
    ClrTabs.prototype.commonStrings;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImxheW91dC90YWJzL3RhYnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUVMLFNBQVMsRUFDVCxlQUFlLEVBQ2YsTUFBTSxFQUNOLFNBQVMsRUFDVCxLQUFLLEVBRUwsV0FBVyxHQUNaLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUM1RSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFFeEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFHL0IsT0FBTyxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQTJDdEQsTUFBTSxPQUFPLE9BQU87Ozs7Ozs7O0lBOEJsQixZQUNTLGVBQWdDLEVBQ2hDLGFBQTRCLEVBQzVCLFdBQXdCLEVBQ1AsTUFBYyxFQUMvQixhQUErQjtRQUovQixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDUCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQy9CLGtCQUFhLEdBQWIsYUFBYSxDQUFrQjtRQWxDaEMsa0JBQWEsR0FBbUIsRUFBRSxDQUFDO1FBb0JuQyx1QkFBa0IsR0FBaUIsRUFBRSxDQUFDO0lBZTNDLENBQUM7Ozs7O0lBakNKLElBQ0ksTUFBTSxDQUFDLE1BQWtCO1FBQzNCLElBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENB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Vzt5Q0FtRmYsTUFBTSxTQUFDLE9BQU87WUE5RVYsZ0JBQWdCOzs7cUJBK0N0QixLQUFLLFNBQUMsV0FBVzttQkFnQmpCLGVBQWUsU0FBQyxNQUFNO3lCQTRDdEIsV0FBVyxTQUFDLHFCQUFxQjs7Ozs7OztJQTlEbEMsZ0NBQTJDOzs7OztJQWtCM0MsdUJBQXlEOzs7OztJQUV6RCxxQ0FBOEM7O0lBVTVDLGtDQUF1Qzs7SUFDdkMsZ0NBQW1DOztJQUNuQyw4QkFBK0I7O0lBQy9CLHlCQUFzQzs7SUFDdEMsZ0NBQXNDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIEluamVjdCxcbiAgUXVlcnlMaXN0LFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBIb3N0QmluZGluZyxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IElmQWN0aXZlU2VydmljZSB9IGZyb20gJy4uLy4uL3V0aWxzL2NvbmRpdGlvbmFsL2lmLWFjdGl2ZS5zZXJ2aWNlJztcbmltcG9ydCB7IElmT3BlblNlcnZpY2UgfSBmcm9tICcuLi8uLi91dGlscy9jb25kaXRpb25hbC9pZi1vcGVuLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBUYWJzU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL3RhYnMuc2VydmljZSc7XG5pbXBvcnQgeyBDbHJUYWIgfSBmcm9tICcuL3RhYic7XG5pbXBvcnQgeyBDbHJUYWJMaW5rIH0gZnJvbSAnLi90YWItbGluay5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQ2xyVGFiQ29udGVudCB9IGZyb20gJy4vdGFiLWNvbnRlbnQnO1xuaW1wb3J0IHsgVEFCU19JRCwgVEFCU19JRF9QUk9WSURFUiB9IGZyb20gJy4vdGFicy1pZC5wcm92aWRlcic7XG5pbXBvcnQgeyBDbHJDb21tb25TdHJpbmdzIH0gZnJvbSAnLi4vLi4vdXRpbHMvaTE4bi9jb21tb24tc3RyaW5ncy5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgVGFic0xheW91dCB9IGZyb20gJy4vZW51bXMvdGFicy1sYXlvdXQuZW51bSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLXRhYnMnLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgICA8dWwgY2xhc3M9XCJuYXZcIiByb2xlPVwidGFibGlzdFwiIFthdHRyLmFyaWEtb3duc109XCJ0YWJJZHNcIj5cbiAgICAgICAgICAgIDwhLS10YWIgbGlua3MtLT5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGxpbmsgb2YgdGFiTGlua0RpcmVjdGl2ZXNcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwibGluay50YWJzSWQgPT09IHRhYnNJZCAmJiAhbGluay5pbk92ZXJmbG93XCI+XG4gICAgICAgICAgICAgICAgICAgIDxsaSByb2xlPVwicHJlc2VudGF0aW9uXCIgY2xhc3M9XCJuYXYtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciBbbmdUZW1wbGF0ZU91dGxldF09XCJsaW5rLnRlbXBsYXRlUmVmQ29udGFpbmVyLnRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJ0YWJzU2VydmljZS5vdmVyZmxvd1RhYnMubGVuZ3RoID4gMFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJzLW92ZXJmbG93IGJvdHRvbS1yaWdodFwiIFtjbGFzcy5vcGVuXT1cImlmT3BlblNlcnZpY2Uub3BlblwiXG4gICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwidG9nZ2xlT3ZlcmZsb3coJGV2ZW50KVwiPlxuICAgICAgICAgICAgICAgICAgICA8bGkgcm9sZT1cInByZXNlbnRhdGlvblwiIGNsYXNzPVwibmF2LWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWxpbmsgbmF2LWxpbmsgZHJvcGRvd24tdG9nZ2xlXCIgdHlwZT1cImJ1dHRvblwiIFtjbGFzcy5hY3RpdmVdPVwiYWN0aXZlVGFiSW5PdmVyZmxvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxjbHItaWNvbiBzaGFwZT1cImVsbGlwc2lzLWhvcml6b250YWxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2NsYXNzLmlzLWluZm9dPVwiaWZPcGVuU2VydmljZS5vcGVuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLnRpdGxlXT1cImNvbW1vblN0cmluZ3MubW9yZVwiPjwvY2xyLWljb24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgPCEtLXRhYiBsaW5rcyBpbiBvdmVyZmxvdyBtZW51LS0+XG4gICAgICAgICAgICAgICAgICAgIDxjbHItdGFiLW92ZXJmbG93LWNvbnRlbnQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBsaW5rIG9mIHRhYkxpbmtEaXJlY3RpdmVzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImxpbmsudGFic0lkID09PSB0YWJzSWQgJiYgbGluay5pbk92ZXJmbG93XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImxpbmsudGVtcGxhdGVSZWZDb250YWluZXIudGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8L2Nsci10YWItb3ZlcmZsb3ctY29udGVudD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8L3VsPlxuICAgICAgICA8IS0tdGFiIGNvbnRlbnQtLT5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgY29udGVudCBvZiB0YWJDb250ZW50c1wiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciBbbmdUZW1wbGF0ZU91dGxldF09XCJjb250ZW50LnRlbXBsYXRlUmVmXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIGAsXG4gIHByb3ZpZGVyczogW0lmQWN0aXZlU2VydmljZSwgSWZPcGVuU2VydmljZSwgVGFic1NlcnZpY2UsIFRBQlNfSURfUFJPVklERVJdLFxufSlcbmV4cG9ydCBjbGFzcyBDbHJUYWJzIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gIEBJbnB1dCgnY2xyTGF5b3V0JylcbiAgc2V0IGxheW91dChsYXlvdXQ6IFRhYnNMYXlvdXQpIHtcbiAgICBpZiAoXG4gICAgICBPYmplY3Qua2V5cyhUYWJzTGF5b3V0KVxuICAgICAgICAubWFwKGtleSA9PiB7XG4gICAgICAgICAgcmV0dXJuIFRhYnNMYXlvdXRba2V5XTtcbiAgICAgICAgfSlcbiAgICAgICAgLmluZGV4T2YobGF5b3V0KSA+PSAwXG4gICAgKSB7XG4gICAgICB0aGlzLnRhYnNTZXJ2aWNlLmxheW91dCA9IGxheW91dDtcbiAgICB9XG4gIH1cbiAgZ2V0IGxheW91dCgpOiBUYWJzTGF5b3V0IHtcbiAgICByZXR1cm4gdGhpcy50YWJzU2VydmljZS5sYXlvdXQ7XG4gIH1cblxuICBAQ29udGVudENoaWxkcmVuKENsclRhYikgcHJpdmF0ZSB0YWJzOiBRdWVyeUxpc3Q8Q2xyVGFiPjtcblxuICBwcml2YXRlIF90YWJMaW5rRGlyZWN0aXZlczogQ2xyVGFiTGlua1tdID0gW107XG4gIGdldCB0YWJMaW5rRGlyZWN0aXZlcygpOiBDbHJUYWJMaW5rW10ge1xuICAgIHJldHVybiB0aGlzLl90YWJMaW5rRGlyZWN0aXZlcztcbiAgfVxuXG4gIGdldCB0YWJDb250ZW50cygpOiBDbHJUYWJDb250ZW50W10ge1xuICAgIHJldHVybiB0aGlzLnRhYnMuZmlsdGVyKHRhYiA9PiAhIXRhYi50YWJDb250ZW50KS5tYXAodGFiID0+IHRhYi50YWJDb250ZW50KTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBpZkFjdGl2ZVNlcnZpY2U6IElmQWN0aXZlU2VydmljZSxcbiAgICBwdWJsaWMgaWZPcGVuU2VydmljZTogSWZPcGVuU2VydmljZSxcbiAgICBwdWJsaWMgdGFic1NlcnZpY2U6IFRhYnNTZXJ2aWNlLFxuICAgIEBJbmplY3QoVEFCU19JRCkgcHVibGljIHRhYnNJZDogbnVtYmVyLFxuICAgIHB1YmxpYyBjb21tb25TdHJpbmdzOiBDbHJDb21tb25TdHJpbmdzXG4gICkge31cblxuICBnZXQgYWN0aXZlVGFiSW5PdmVyZmxvdygpIHtcbiAgICByZXR1cm4gdGhpcy50YWJzU2VydmljZS5vdmVyZmxvd1RhYnMuaW5kZXhPZih0aGlzLnRhYnNTZXJ2aWNlLmFjdGl2ZVRhYikgPiAtMTtcbiAgfVxuXG4gIGdldCB0YWJJZHMoKSB7XG4gICAgcmV0dXJuIHRoaXMudGFic1NlcnZpY2UuY2hpbGRyZW4ubWFwKHRhYiA9PiB0YWIudGFiTGluay50YWJMaW5rSWQpLmpvaW4oJyAnKTtcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICB0aGlzLl90YWJMaW5rRGlyZWN0aXZlcyA9IHRoaXMudGFicy5tYXAodGFiID0+IHRhYi50YWJMaW5rKTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMudGFicy5jaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuX3RhYkxpbmtEaXJlY3RpdmVzID0gdGhpcy50YWJzLm1hcCh0YWIgPT4gdGFiLnRhYkxpbmspO1xuICAgICAgfSlcbiAgICApO1xuXG4gICAgaWYgKHR5cGVvZiB0aGlzLmlmQWN0aXZlU2VydmljZS5jdXJyZW50ID09PSAndW5kZWZpbmVkJyAmJiB0aGlzLnRhYkxpbmtEaXJlY3RpdmVzWzBdKSB7XG4gICAgICB0aGlzLnRhYkxpbmtEaXJlY3RpdmVzWzBdLmFjdGl2YXRlKCk7XG4gICAgfVxuICB9XG5cbiAgdG9nZ2xlT3ZlcmZsb3coZXZlbnQ6IGFueSkge1xuICAgIHRoaXMuaWZPcGVuU2VydmljZS50b2dnbGVXaXRoRXZlbnQoZXZlbnQpO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy50YWJzLXZlcnRpY2FsJylcbiAgZ2V0IGlzVmVydGljYWwoKSB7XG4gICAgcmV0dXJuIHRoaXMubGF5b3V0ID09PSBUYWJzTGF5b3V0LlZFUlRJQ0FMO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmZvckVhY2goc3ViID0+IHtcbiAgICAgIHN1Yi51bnN1YnNjcmliZSgpO1xuICAgIH0pO1xuICB9XG59XG4iXX0=