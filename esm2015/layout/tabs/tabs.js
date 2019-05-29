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
    tabContentViewContainer: [{ type: ViewChild, args: ['tabContentViewContainer', { static: true, read: ViewContainerRef },] }],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImxheW91dC90YWJzL3RhYnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUVMLFNBQVMsRUFDVCxlQUFlLEVBQ2YsTUFBTSxFQUNOLFNBQVMsRUFDVCxLQUFLLEVBRUwsV0FBVyxFQUNYLGdCQUFnQixFQUNoQixTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQzVFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUV4RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDdkQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUUvQixPQUFPLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDL0QsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDN0UsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBd0N0RCxNQUFNLE9BQU8sT0FBTzs7Ozs7Ozs7SUFpQ2xCLFlBQ1MsZUFBZ0MsRUFDaEMsYUFBNEIsRUFDNUIsV0FBd0IsRUFDUCxNQUFjLEVBQy9CLGFBQStCO1FBSi9CLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUNQLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDL0Isa0JBQWEsR0FBYixhQUFhLENBQWtCO1FBckNoQyxrQkFBYSxHQUFtQixFQUFFLENBQUM7UUEyQm5DLHVCQUFrQixHQUFpQixFQUFFLENBQUM7SUFXM0MsQ0FBQzs7Ozs7OztJQW5DSixJQUNZLHVCQUF1QixDQUFDLEtBQXVCO1FBQ3pELElBQUksQ0FBQyxXQUFXLENBQUMsdUJBQXVCLEdBQUcsS0FBSyxDQUFDO0lBQ25ELENBQUM7Ozs7OztJQUdELElBQ0ksTUFBTSxDQUFDLE1BQWtCO1FBQzNCLElBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7YUFDcEIsR0FBRzs7OztRQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ1QsT0FBTyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDekIsQ0FBQyxFQUFDO2FBQ0QsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFDdkI7WUFDQSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7U0FDbEM7SUFDSCxDQUFDOzs7O0lBQ0QsSUFBSSxNQUFNO1FBQ1IsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQztJQUNqQyxDQUFDOzs7O0lBS0QsSUFBSSxpQkFBaUI7UUFDbkIsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUM7SUFDakMsQ0FBQzs7OztJQVVELElBQUksbUJBQW1CO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDaEYsQ0FBQzs7OztJQUVELElBQUksTUFBTTtRQUNSLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsR0FBRzs7OztRQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDL0UsQ0FBQzs7OztJQUVELGtCQUFrQjtRQUNoQixJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHOzs7O1FBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFDLENBQUM7UUFDNUQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVM7OztRQUFDLEdBQUcsRUFBRTtZQUMvQixJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHOzs7O1lBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFDLENBQUM7UUFDOUQsQ0FBQyxFQUFDLENBQ0gsQ0FBQztRQUVGLElBQUksT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sS0FBSyxXQUFXLElBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ3BGLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUN0QztJQUNILENBQUM7Ozs7O0lBRUQsY0FBYyxDQUFDLEtBQVU7UUFDdkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUMsQ0FBQzs7OztJQUVELElBQ0ksVUFBVTtRQUNaLE9BQU8sSUFBSSxDQUFDLE1BQU0sS0FBSyxVQUFVLENBQUMsUUFBUSxDQUFDO0lBQzdDLENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPOzs7O1FBQUMsR0FBRyxDQUFDLEVBQUU7WUFDL0IsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3BCLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7O1lBaEhGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsVUFBVTtnQkFDcEIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQWdDUDtnQkFDSCxTQUFTLEVBQUUsQ0FBQyxlQUFlLEVBQUUsYUFBYSxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsQ0FBQzthQUMzRTs7OztZQS9DUSxlQUFlO1lBQ2YsYUFBYTtZQUViLFdBQVc7eUNBa0ZmLE1BQU0sU0FBQyxPQUFPO1lBOUVWLGdCQUFnQjs7O3NDQTZDdEIsU0FBUyxTQUFDLHlCQUF5QixFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUU7cUJBTTdFLEtBQUssU0FBQyxXQUFXO21CQWdCakIsZUFBZSxTQUFDLE1BQU07eUJBd0N0QixXQUFXLFNBQUMscUJBQXFCOzs7Ozs7O0lBakVsQyxnQ0FBMkM7Ozs7O0lBeUIzQyx1QkFBeUQ7Ozs7O0lBRXpELHFDQUE4Qzs7SUFNNUMsa0NBQXVDOztJQUN2QyxnQ0FBbUM7O0lBQ25DLDhCQUErQjs7SUFDL0IseUJBQXNDOztJQUN0QyxnQ0FBc0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgSW5qZWN0LFxuICBRdWVyeUxpc3QsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIEhvc3RCaW5kaW5nLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBWaWV3Q2hpbGQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBJZkFjdGl2ZVNlcnZpY2UgfSBmcm9tICcuLi8uLi91dGlscy9jb25kaXRpb25hbC9pZi1hY3RpdmUuc2VydmljZSc7XG5pbXBvcnQgeyBJZk9wZW5TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vdXRpbHMvY29uZGl0aW9uYWwvaWYtb3Blbi5zZXJ2aWNlJztcblxuaW1wb3J0IHsgVGFic1NlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy90YWJzLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2xyVGFiIH0gZnJvbSAnLi90YWInO1xuaW1wb3J0IHsgQ2xyVGFiTGluayB9IGZyb20gJy4vdGFiLWxpbmsuZGlyZWN0aXZlJztcbmltcG9ydCB7IFRBQlNfSUQsIFRBQlNfSURfUFJPVklERVIgfSBmcm9tICcuL3RhYnMtaWQucHJvdmlkZXInO1xuaW1wb3J0IHsgQ2xyQ29tbW9uU3RyaW5ncyB9IGZyb20gJy4uLy4uL3V0aWxzL2kxOG4vY29tbW9uLXN0cmluZ3MuaW50ZXJmYWNlJztcbmltcG9ydCB7IFRhYnNMYXlvdXQgfSBmcm9tICcuL2VudW1zL3RhYnMtbGF5b3V0LmVudW0nO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci10YWJzJyxcbiAgdGVtcGxhdGU6IGBcbiAgICAgICAgPHVsIGNsYXNzPVwibmF2XCIgcm9sZT1cInRhYmxpc3RcIiBbYXR0ci5hcmlhLW93bnNdPVwidGFiSWRzXCI+XG4gICAgICAgICAgICA8IS0tdGFiIGxpbmtzLS0+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBsaW5rIG9mIHRhYkxpbmtEaXJlY3RpdmVzXCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImxpbmsudGFic0lkID09PSB0YWJzSWQgJiYgIWxpbmsuaW5PdmVyZmxvd1wiPlxuICAgICAgICAgICAgICAgICAgICA8bGkgcm9sZT1cInByZXNlbnRhdGlvblwiIGNsYXNzPVwibmF2LWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgW25nVGVtcGxhdGVPdXRsZXRdPVwibGluay50ZW1wbGF0ZVJlZkNvbnRhaW5lci50ZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwidGFic1NlcnZpY2Uub3ZlcmZsb3dUYWJzLmxlbmd0aCA+IDBcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFicy1vdmVyZmxvdyBib3R0b20tcmlnaHRcIiBbY2xhc3Mub3Blbl09XCJpZk9wZW5TZXJ2aWNlLm9wZW5cIlxuICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cInRvZ2dsZU92ZXJmbG93KCRldmVudClcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxpIHJvbGU9XCJwcmVzZW50YXRpb25cIiBjbGFzcz1cIm5hdi1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1saW5rIG5hdi1saW5rIGRyb3Bkb3duLXRvZ2dsZVwiIHR5cGU9XCJidXR0b25cIiBbY2xhc3MuYWN0aXZlXT1cImFjdGl2ZVRhYkluT3ZlcmZsb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Y2xyLWljb24gc2hhcGU9XCJlbGxpcHNpcy1ob3Jpem9udGFsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtjbGFzcy5pcy1pbmZvXT1cImlmT3BlblNlcnZpY2Uub3BlblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci50aXRsZV09XCJjb21tb25TdHJpbmdzLm1vcmVcIj48L2Nsci1pY29uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgIDwhLS10YWIgbGlua3MgaW4gb3ZlcmZsb3cgbWVudS0tPlxuICAgICAgICAgICAgICAgICAgICA8Y2xyLXRhYi1vdmVyZmxvdy1jb250ZW50PlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgbGluayBvZiB0YWJMaW5rRGlyZWN0aXZlc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJsaW5rLnRhYnNJZCA9PT0gdGFic0lkICYmIGxpbmsuaW5PdmVyZmxvd1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJsaW5rLnRlbXBsYXRlUmVmQ29udGFpbmVyLnRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPC9jbHItdGFiLW92ZXJmbG93LWNvbnRlbnQ+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC91bD5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAjdGFiQ29udGVudFZpZXdDb250YWluZXI+PC9uZy1jb250YWluZXI+XG4gICAgYCxcbiAgcHJvdmlkZXJzOiBbSWZBY3RpdmVTZXJ2aWNlLCBJZk9wZW5TZXJ2aWNlLCBUYWJzU2VydmljZSwgVEFCU19JRF9QUk9WSURFUl0sXG59KVxuZXhwb3J0IGNsYXNzIENsclRhYnMgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuICBwcml2YXRlIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgLyogdHNsaW50OmRpc2FibGU6bm8tdW51c2VkLXZhcmlhYmxlICovXG4gIEBWaWV3Q2hpbGQoJ3RhYkNvbnRlbnRWaWV3Q29udGFpbmVyJywgeyBzdGF0aWM6IHRydWUsIHJlYWQ6IFZpZXdDb250YWluZXJSZWYgfSlcbiAgcHJpdmF0ZSBzZXQgdGFiQ29udGVudFZpZXdDb250YWluZXIodmFsdWU6IFZpZXdDb250YWluZXJSZWYpIHtcbiAgICB0aGlzLnRhYnNTZXJ2aWNlLnRhYkNvbnRlbnRWaWV3Q29udGFpbmVyID0gdmFsdWU7XG4gIH1cbiAgLyogdHNsaW50OmVuYWJsZTpuby11bnVzZWQtdmFyaWFibGUgKi9cblxuICBASW5wdXQoJ2NsckxheW91dCcpXG4gIHNldCBsYXlvdXQobGF5b3V0OiBUYWJzTGF5b3V0KSB7XG4gICAgaWYgKFxuICAgICAgT2JqZWN0LmtleXMoVGFic0xheW91dClcbiAgICAgICAgLm1hcChrZXkgPT4ge1xuICAgICAgICAgIHJldHVybiBUYWJzTGF5b3V0W2tleV07XG4gICAgICAgIH0pXG4gICAgICAgIC5pbmRleE9mKGxheW91dCkgPj0gMFxuICAgICkge1xuICAgICAgdGhpcy50YWJzU2VydmljZS5sYXlvdXQgPSBsYXlvdXQ7XG4gICAgfVxuICB9XG4gIGdldCBsYXlvdXQoKTogVGFic0xheW91dCB7XG4gICAgcmV0dXJuIHRoaXMudGFic1NlcnZpY2UubGF5b3V0O1xuICB9XG5cbiAgQENvbnRlbnRDaGlsZHJlbihDbHJUYWIpIHByaXZhdGUgdGFiczogUXVlcnlMaXN0PENsclRhYj47XG5cbiAgcHJpdmF0ZSBfdGFiTGlua0RpcmVjdGl2ZXM6IENsclRhYkxpbmtbXSA9IFtdO1xuICBnZXQgdGFiTGlua0RpcmVjdGl2ZXMoKTogQ2xyVGFiTGlua1tdIHtcbiAgICByZXR1cm4gdGhpcy5fdGFiTGlua0RpcmVjdGl2ZXM7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgaWZBY3RpdmVTZXJ2aWNlOiBJZkFjdGl2ZVNlcnZpY2UsXG4gICAgcHVibGljIGlmT3BlblNlcnZpY2U6IElmT3BlblNlcnZpY2UsXG4gICAgcHVibGljIHRhYnNTZXJ2aWNlOiBUYWJzU2VydmljZSxcbiAgICBASW5qZWN0KFRBQlNfSUQpIHB1YmxpYyB0YWJzSWQ6IG51bWJlcixcbiAgICBwdWJsaWMgY29tbW9uU3RyaW5nczogQ2xyQ29tbW9uU3RyaW5nc1xuICApIHt9XG5cbiAgZ2V0IGFjdGl2ZVRhYkluT3ZlcmZsb3coKSB7XG4gICAgcmV0dXJuIHRoaXMudGFic1NlcnZpY2Uub3ZlcmZsb3dUYWJzLmluZGV4T2YodGhpcy50YWJzU2VydmljZS5hY3RpdmVUYWIpID4gLTE7XG4gIH1cblxuICBnZXQgdGFiSWRzKCkge1xuICAgIHJldHVybiB0aGlzLnRhYnNTZXJ2aWNlLmNoaWxkcmVuLm1hcCh0YWIgPT4gdGFiLnRhYkxpbmsudGFiTGlua0lkKS5qb2luKCcgJyk7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgdGhpcy5fdGFiTGlua0RpcmVjdGl2ZXMgPSB0aGlzLnRhYnMubWFwKHRhYiA9PiB0YWIudGFiTGluayk7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLnRhYnMuY2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLl90YWJMaW5rRGlyZWN0aXZlcyA9IHRoaXMudGFicy5tYXAodGFiID0+IHRhYi50YWJMaW5rKTtcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIGlmICh0eXBlb2YgdGhpcy5pZkFjdGl2ZVNlcnZpY2UuY3VycmVudCA9PT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy50YWJMaW5rRGlyZWN0aXZlc1swXSkge1xuICAgICAgdGhpcy50YWJMaW5rRGlyZWN0aXZlc1swXS5hY3RpdmF0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIHRvZ2dsZU92ZXJmbG93KGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLmlmT3BlblNlcnZpY2UudG9nZ2xlV2l0aEV2ZW50KGV2ZW50KTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MudGFicy12ZXJ0aWNhbCcpXG4gIGdldCBpc1ZlcnRpY2FsKCkge1xuICAgIHJldHVybiB0aGlzLmxheW91dCA9PT0gVGFic0xheW91dC5WRVJUSUNBTDtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHN1YiA9PiB7XG4gICAgICBzdWIudW5zdWJzY3JpYmUoKTtcbiAgICB9KTtcbiAgfVxufVxuIl19