/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ContentChildren, Inject, QueryList, Input, HostBinding, ViewContainerRef, ViewChild, } from '@angular/core';
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
    /* tslint:disable:no-unused-variable */
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    set tabContentViewContainer(value) {
        this.tabsService.tabContentViewContainer = value;
    }
    /* tslint:enable:no-unused-variable */
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
        <ng-container #tabContentViewContainer></ng-container>
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
    tabContentViewContainer: [{ type: ViewChild, args: ['tabContentViewContainer', { read: ViewContainerRef },] }],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImxheW91dC90YWJzL3RhYnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUVMLFNBQVMsRUFDVCxlQUFlLEVBQ2YsTUFBTSxFQUNOLFNBQVMsRUFDVCxLQUFLLEVBRUwsV0FBVyxFQUNYLGdCQUFnQixFQUNoQixTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQzVFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUV4RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDdkQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUUvQixPQUFPLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDL0QsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDN0UsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBd0N0RCxNQUFNLE9BQU8sT0FBTzs7Ozs7Ozs7SUFpQ2xCLFlBQ1MsZUFBZ0MsRUFDaEMsYUFBNEIsRUFDNUIsV0FBd0IsRUFDUCxNQUFjLEVBQy9CLGFBQStCO1FBSi9CLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUNQLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDL0Isa0JBQWEsR0FBYixhQUFhLENBQWtCO1FBckNoQyxrQkFBYSxHQUFtQixFQUFFLENBQUM7UUEyQm5DLHVCQUFrQixHQUFpQixFQUFFLENBQUM7SUFXM0MsQ0FBQzs7Ozs7OztJQW5DSixJQUNZLHVCQUF1QixDQUFDLEtBQXVCO1FBQ3pELElBQUksQ0FBQyxXQUFXLENBQUMsdUJBQXVCLEdBQUcsS0FBSyxDQUFDO0lBQ25ELENBQUM7Ozs7OztJQUdELElBQ0ksTUFBTSxDQUFDLE1BQWtCO1FBQzNCLElBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7YUFDcEIsR0FBRzs7OztRQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ1QsT0FBTyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDekIsQ0FBQyxFQUFDO2FBQ0QsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFDdkI7WUFDQSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7U0FDbEM7SUFDSCxDQUFDOzs7O0lBQ0QsSUFBSSxNQUFNO1FBQ1IsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQztJQUNqQyxDQUFDOzs7O0lBS0QsSUFBSSxpQkFBaUI7UUFDbkIsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUM7SUFDakMsQ0FBQzs7OztJQVVELElBQUksbUJBQW1CO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDaEYsQ0FBQzs7OztJQUVELElBQUksTUFBTTtRQUNSLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsR0FBRzs7OztRQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDL0UsQ0FBQzs7OztJQUVELGtCQUFrQjtRQUNoQixJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHOzs7O1FBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFDLENBQUM7UUFDNUQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVM7OztRQUFDLEdBQUcsRUFBRTtZQUMvQixJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHOzs7O1lBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFDLENBQUM7UUFDOUQsQ0FBQyxFQUFDLENBQ0gsQ0FBQztRQUVGLElBQUksT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sS0FBSyxXQUFXLElBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ3BGLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUN0QztJQUNILENBQUM7Ozs7O0lBRUQsY0FBYyxDQUFDLEtBQVU7UUFDdkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUMsQ0FBQzs7OztJQUVELElBQ0ksVUFBVTtRQUNaLE9BQU8sSUFBSSxDQUFDLE1BQU0sS0FBSyxVQUFVLENBQUMsUUFBUSxDQUFDO0lBQzdDLENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPOzs7O1FBQUMsR0FBRyxDQUFDLEVBQUU7WUFDL0IsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3BCLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7O1lBaEhGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsVUFBVTtnQkFDcEIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQWdDUDtnQkFDSCxTQUFTLEVBQUUsQ0FBQyxlQUFlLEVBQUUsYUFBYSxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsQ0FBQzthQUMzRTs7OztZQS9DUSxlQUFlO1lBQ2YsYUFBYTtZQUViLFdBQVc7eUNBa0ZmLE1BQU0sU0FBQyxPQUFPO1lBOUVWLGdCQUFnQjs7O3NDQTZDdEIsU0FBUyxTQUFDLHlCQUF5QixFQUFFLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFO3FCQU0vRCxLQUFLLFNBQUMsV0FBVzttQkFnQmpCLGVBQWUsU0FBQyxNQUFNO3lCQXdDdEIsV0FBVyxTQUFDLHFCQUFxQjs7Ozs7OztJQWpFbEMsZ0NBQTJDOzs7OztJQXlCM0MsdUJBQXlEOzs7OztJQUV6RCxxQ0FBOEM7O0lBTTVDLGtDQUF1Qzs7SUFDdkMsZ0NBQW1DOztJQUNuQyw4QkFBK0I7O0lBQy9CLHlCQUFzQzs7SUFDdEMsZ0NBQXNDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIEluamVjdCxcbiAgUXVlcnlMaXN0LFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBIb3N0QmluZGluZyxcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgVmlld0NoaWxkLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgSWZBY3RpdmVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vdXRpbHMvY29uZGl0aW9uYWwvaWYtYWN0aXZlLnNlcnZpY2UnO1xuaW1wb3J0IHsgSWZPcGVuU2VydmljZSB9IGZyb20gJy4uLy4uL3V0aWxzL2NvbmRpdGlvbmFsL2lmLW9wZW4uc2VydmljZSc7XG5cbmltcG9ydCB7IFRhYnNTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvdGFicy5zZXJ2aWNlJztcbmltcG9ydCB7IENsclRhYiB9IGZyb20gJy4vdGFiJztcbmltcG9ydCB7IENsclRhYkxpbmsgfSBmcm9tICcuL3RhYi1saW5rLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBUQUJTX0lELCBUQUJTX0lEX1BST1ZJREVSIH0gZnJvbSAnLi90YWJzLWlkLnByb3ZpZGVyJztcbmltcG9ydCB7IENsckNvbW1vblN0cmluZ3MgfSBmcm9tICcuLi8uLi91dGlscy9pMThuL2NvbW1vbi1zdHJpbmdzLmludGVyZmFjZSc7XG5pbXBvcnQgeyBUYWJzTGF5b3V0IH0gZnJvbSAnLi9lbnVtcy90YWJzLWxheW91dC5lbnVtJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItdGFicycsXG4gIHRlbXBsYXRlOiBgXG4gICAgICAgIDx1bCBjbGFzcz1cIm5hdlwiIHJvbGU9XCJ0YWJsaXN0XCIgW2F0dHIuYXJpYS1vd25zXT1cInRhYklkc1wiPlxuICAgICAgICAgICAgPCEtLXRhYiBsaW5rcy0tPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgbGluayBvZiB0YWJMaW5rRGlyZWN0aXZlc1wiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJsaW5rLnRhYnNJZCA9PT0gdGFic0lkICYmICFsaW5rLmluT3ZlcmZsb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxpIHJvbGU9XCJwcmVzZW50YXRpb25cIiBjbGFzcz1cIm5hdi1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImxpbmsudGVtcGxhdGVSZWZDb250YWluZXIudGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInRhYnNTZXJ2aWNlLm92ZXJmbG93VGFicy5sZW5ndGggPiAwXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhYnMtb3ZlcmZsb3cgYm90dG9tLXJpZ2h0XCIgW2NsYXNzLm9wZW5dPVwiaWZPcGVuU2VydmljZS5vcGVuXCJcbiAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJ0b2dnbGVPdmVyZmxvdygkZXZlbnQpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxsaSByb2xlPVwicHJlc2VudGF0aW9uXCIgY2xhc3M9XCJuYXYtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tbGluayBuYXYtbGluayBkcm9wZG93bi10b2dnbGVcIiB0eXBlPVwiYnV0dG9uXCIgW2NsYXNzLmFjdGl2ZV09XCJhY3RpdmVUYWJJbk92ZXJmbG93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGNsci1pY29uIHNoYXBlPVwiZWxsaXBzaXMtaG9yaXpvbnRhbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbY2xhc3MuaXMtaW5mb109XCJpZk9wZW5TZXJ2aWNlLm9wZW5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIudGl0bGVdPVwiY29tbW9uU3RyaW5ncy5tb3JlXCI+PC9jbHItaWNvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICA8IS0tdGFiIGxpbmtzIGluIG92ZXJmbG93IG1lbnUtLT5cbiAgICAgICAgICAgICAgICAgICAgPGNsci10YWItb3ZlcmZsb3ctY29udGVudD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGxpbmsgb2YgdGFiTGlua0RpcmVjdGl2ZXNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwibGluay50YWJzSWQgPT09IHRhYnNJZCAmJiBsaW5rLmluT3ZlcmZsb3dcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwibGluay50ZW1wbGF0ZVJlZkNvbnRhaW5lci50ZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIDwvY2xyLXRhYi1vdmVyZmxvdy1jb250ZW50PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvdWw+XG4gICAgICAgIDxuZy1jb250YWluZXIgI3RhYkNvbnRlbnRWaWV3Q29udGFpbmVyPjwvbmctY29udGFpbmVyPlxuICAgIGAsXG4gIHByb3ZpZGVyczogW0lmQWN0aXZlU2VydmljZSwgSWZPcGVuU2VydmljZSwgVGFic1NlcnZpY2UsIFRBQlNfSURfUFJPVklERVJdLFxufSlcbmV4cG9ydCBjbGFzcyBDbHJUYWJzIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gIC8qIHRzbGludDpkaXNhYmxlOm5vLXVudXNlZC12YXJpYWJsZSAqL1xuICBAVmlld0NoaWxkKCd0YWJDb250ZW50Vmlld0NvbnRhaW5lcicsIHsgcmVhZDogVmlld0NvbnRhaW5lclJlZiB9KVxuICBwcml2YXRlIHNldCB0YWJDb250ZW50Vmlld0NvbnRhaW5lcih2YWx1ZTogVmlld0NvbnRhaW5lclJlZikge1xuICAgIHRoaXMudGFic1NlcnZpY2UudGFiQ29udGVudFZpZXdDb250YWluZXIgPSB2YWx1ZTtcbiAgfVxuICAvKiB0c2xpbnQ6ZW5hYmxlOm5vLXVudXNlZC12YXJpYWJsZSAqL1xuXG4gIEBJbnB1dCgnY2xyTGF5b3V0JylcbiAgc2V0IGxheW91dChsYXlvdXQ6IFRhYnNMYXlvdXQpIHtcbiAgICBpZiAoXG4gICAgICBPYmplY3Qua2V5cyhUYWJzTGF5b3V0KVxuICAgICAgICAubWFwKGtleSA9PiB7XG4gICAgICAgICAgcmV0dXJuIFRhYnNMYXlvdXRba2V5XTtcbiAgICAgICAgfSlcbiAgICAgICAgLmluZGV4T2YobGF5b3V0KSA+PSAwXG4gICAgKSB7XG4gICAgICB0aGlzLnRhYnNTZXJ2aWNlLmxheW91dCA9IGxheW91dDtcbiAgICB9XG4gIH1cbiAgZ2V0IGxheW91dCgpOiBUYWJzTGF5b3V0IHtcbiAgICByZXR1cm4gdGhpcy50YWJzU2VydmljZS5sYXlvdXQ7XG4gIH1cblxuICBAQ29udGVudENoaWxkcmVuKENsclRhYikgcHJpdmF0ZSB0YWJzOiBRdWVyeUxpc3Q8Q2xyVGFiPjtcblxuICBwcml2YXRlIF90YWJMaW5rRGlyZWN0aXZlczogQ2xyVGFiTGlua1tdID0gW107XG4gIGdldCB0YWJMaW5rRGlyZWN0aXZlcygpOiBDbHJUYWJMaW5rW10ge1xuICAgIHJldHVybiB0aGlzLl90YWJMaW5rRGlyZWN0aXZlcztcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBpZkFjdGl2ZVNlcnZpY2U6IElmQWN0aXZlU2VydmljZSxcbiAgICBwdWJsaWMgaWZPcGVuU2VydmljZTogSWZPcGVuU2VydmljZSxcbiAgICBwdWJsaWMgdGFic1NlcnZpY2U6IFRhYnNTZXJ2aWNlLFxuICAgIEBJbmplY3QoVEFCU19JRCkgcHVibGljIHRhYnNJZDogbnVtYmVyLFxuICAgIHB1YmxpYyBjb21tb25TdHJpbmdzOiBDbHJDb21tb25TdHJpbmdzXG4gICkge31cblxuICBnZXQgYWN0aXZlVGFiSW5PdmVyZmxvdygpIHtcbiAgICByZXR1cm4gdGhpcy50YWJzU2VydmljZS5vdmVyZmxvd1RhYnMuaW5kZXhPZih0aGlzLnRhYnNTZXJ2aWNlLmFjdGl2ZVRhYikgPiAtMTtcbiAgfVxuXG4gIGdldCB0YWJJZHMoKSB7XG4gICAgcmV0dXJuIHRoaXMudGFic1NlcnZpY2UuY2hpbGRyZW4ubWFwKHRhYiA9PiB0YWIudGFiTGluay50YWJMaW5rSWQpLmpvaW4oJyAnKTtcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICB0aGlzLl90YWJMaW5rRGlyZWN0aXZlcyA9IHRoaXMudGFicy5tYXAodGFiID0+IHRhYi50YWJMaW5rKTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMudGFicy5jaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuX3RhYkxpbmtEaXJlY3RpdmVzID0gdGhpcy50YWJzLm1hcCh0YWIgPT4gdGFiLnRhYkxpbmspO1xuICAgICAgfSlcbiAgICApO1xuXG4gICAgaWYgKHR5cGVvZiB0aGlzLmlmQWN0aXZlU2VydmljZS5jdXJyZW50ID09PSAndW5kZWZpbmVkJyAmJiB0aGlzLnRhYkxpbmtEaXJlY3RpdmVzWzBdKSB7XG4gICAgICB0aGlzLnRhYkxpbmtEaXJlY3RpdmVzWzBdLmFjdGl2YXRlKCk7XG4gICAgfVxuICB9XG5cbiAgdG9nZ2xlT3ZlcmZsb3coZXZlbnQ6IGFueSkge1xuICAgIHRoaXMuaWZPcGVuU2VydmljZS50b2dnbGVXaXRoRXZlbnQoZXZlbnQpO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy50YWJzLXZlcnRpY2FsJylcbiAgZ2V0IGlzVmVydGljYWwoKSB7XG4gICAgcmV0dXJuIHRoaXMubGF5b3V0ID09PSBUYWJzTGF5b3V0LlZFUlRJQ0FMO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmZvckVhY2goc3ViID0+IHtcbiAgICAgIHN1Yi51bnN1YnNjcmliZSgpO1xuICAgIH0pO1xuICB9XG59XG4iXX0=