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
var ClrTabs = /** @class */ (function () {
    function ClrTabs(ifActiveService, ifOpenService, tabsService, tabsId, commonStrings) {
        this.ifActiveService = ifActiveService;
        this.ifOpenService = ifOpenService;
        this.tabsService = tabsService;
        this.tabsId = tabsId;
        this.commonStrings = commonStrings;
        this.subscriptions = [];
        this._tabLinkDirectives = [];
    }
    Object.defineProperty(ClrTabs.prototype, "tabContentViewContainer", {
        /* tslint:disable:no-unused-variable */
        set: /* tslint:disable:no-unused-variable */
        /**
         * @private
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.tabsService.tabContentViewContainer = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTabs.prototype, "layout", {
        get: /**
         * @return {?}
         */
        function () {
            return this.tabsService.layout;
        },
        /* tslint:enable:no-unused-variable */
        set: /* tslint:enable:no-unused-variable */
        /**
         * @param {?} layout
         * @return {?}
         */
        function (layout) {
            if (Object.keys(TabsLayout)
                .map((/**
             * @param {?} key
             * @return {?}
             */
            function (key) {
                return TabsLayout[key];
            }))
                .indexOf(layout) >= 0) {
                this.tabsService.layout = layout;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTabs.prototype, "tabLinkDirectives", {
        get: /**
         * @return {?}
         */
        function () {
            return this._tabLinkDirectives;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTabs.prototype, "activeTabInOverflow", {
        get: /**
         * @return {?}
         */
        function () {
            return this.tabsService.overflowTabs.indexOf(this.tabsService.activeTab) > -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTabs.prototype, "tabIds", {
        get: /**
         * @return {?}
         */
        function () {
            return this.tabsService.children.map((/**
             * @param {?} tab
             * @return {?}
             */
            function (tab) { return tab.tabLink.tabLinkId; })).join(' ');
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ClrTabs.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._tabLinkDirectives = this.tabs.map((/**
         * @param {?} tab
         * @return {?}
         */
        function (tab) { return tab.tabLink; }));
        this.subscriptions.push(this.tabs.changes.subscribe((/**
         * @return {?}
         */
        function () {
            _this._tabLinkDirectives = _this.tabs.map((/**
             * @param {?} tab
             * @return {?}
             */
            function (tab) { return tab.tabLink; }));
        })));
        if (typeof this.ifActiveService.current === 'undefined' && this.tabLinkDirectives[0]) {
            this.tabLinkDirectives[0].activate();
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    ClrTabs.prototype.toggleOverflow = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.ifOpenService.toggleWithEvent(event);
    };
    Object.defineProperty(ClrTabs.prototype, "isVertical", {
        get: /**
         * @return {?}
         */
        function () {
            return this.layout === TabsLayout.VERTICAL;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ClrTabs.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        function (sub) {
            sub.unsubscribe();
        }));
    };
    ClrTabs.decorators = [
        { type: Component, args: [{
                    selector: 'clr-tabs',
                    template: "\n        <ul class=\"nav\" role=\"tablist\" [attr.aria-owns]=\"tabIds\">\n            <!--tab links-->\n            <ng-container *ngFor=\"let link of tabLinkDirectives\">\n                <ng-container *ngIf=\"link.tabsId === tabsId && !link.inOverflow\">\n                    <li role=\"presentation\" class=\"nav-item\">\n                        <ng-container [ngTemplateOutlet]=\"link.templateRefContainer.template\"></ng-container>\n                    </li>\n                </ng-container>\n            </ng-container>\n            <ng-container *ngIf=\"tabsService.overflowTabs.length > 0\">\n                <div class=\"tabs-overflow bottom-right\" [class.open]=\"ifOpenService.open\"\n                     (click)=\"toggleOverflow($event)\">\n                    <li role=\"presentation\" class=\"nav-item\">\n                        <button class=\"btn btn-link nav-link dropdown-toggle\" type=\"button\" [class.active]=\"activeTabInOverflow\">\n                            <clr-icon shape=\"ellipsis-horizontal\"\n                              [class.is-info]=\"ifOpenService.open\"\n                              [attr.title]=\"commonStrings.more\"></clr-icon>\n                        </button>\n                    </li>\n                    <!--tab links in overflow menu-->\n                    <clr-tab-overflow-content>\n                        <ng-container *ngFor=\"let link of tabLinkDirectives\">\n                            <ng-container *ngIf=\"link.tabsId === tabsId && link.inOverflow\"\n                                          [ngTemplateOutlet]=\"link.templateRefContainer.template\">\n                            </ng-container>\n                        </ng-container>\n                    </clr-tab-overflow-content>\n                </div>\n            </ng-container>\n        </ul>\n        <ng-container #tabContentViewContainer></ng-container>\n    ",
                    providers: [IfActiveService, IfOpenService, TabsService, TABS_ID_PROVIDER]
                }] }
    ];
    /** @nocollapse */
    ClrTabs.ctorParameters = function () { return [
        { type: IfActiveService },
        { type: IfOpenService },
        { type: TabsService },
        { type: Number, decorators: [{ type: Inject, args: [TABS_ID,] }] },
        { type: ClrCommonStrings }
    ]; };
    ClrTabs.propDecorators = {
        tabContentViewContainer: [{ type: ViewChild, args: ['tabContentViewContainer', { read: ViewContainerRef },] }],
        layout: [{ type: Input, args: ['clrLayout',] }],
        tabs: [{ type: ContentChildren, args: [ClrTab,] }],
        isVertical: [{ type: HostBinding, args: ['class.tabs-vertical',] }]
    };
    return ClrTabs;
}());
export { ClrTabs };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImxheW91dC90YWJzL3RhYnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUVMLFNBQVMsRUFDVCxlQUFlLEVBQ2YsTUFBTSxFQUNOLFNBQVMsRUFDVCxLQUFLLEVBRUwsV0FBVyxFQUNYLGdCQUFnQixFQUNoQixTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQzVFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUV4RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDdkQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUUvQixPQUFPLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDL0QsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDN0UsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBR3REO0lBc0VFLGlCQUNTLGVBQWdDLEVBQ2hDLGFBQTRCLEVBQzVCLFdBQXdCLEVBQ1AsTUFBYyxFQUMvQixhQUErQjtRQUovQixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDUCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQy9CLGtCQUFhLEdBQWIsYUFBYSxDQUFrQjtRQXJDaEMsa0JBQWEsR0FBbUIsRUFBRSxDQUFDO1FBMkJuQyx1QkFBa0IsR0FBaUIsRUFBRSxDQUFDO0lBVzNDLENBQUM7SUFuQ0osc0JBQ1ksNENBQXVCO1FBRm5DLHVDQUF1Qzs7Ozs7OztRQUN2QyxVQUNvQyxLQUF1QjtZQUN6RCxJQUFJLENB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Z0JBL0NRLGVBQWU7Z0JBQ2YsYUFBYTtnQkFFYixXQUFXOzZDQWtGZixNQUFNLFNBQUMsT0FBTztnQkE5RVYsZ0JBQWdCOzs7MENBNkN0QixTQUFTLFNBQUMseUJBQXlCLEVBQUUsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUU7eUJBTS9ELEtBQUssU0FBQyxXQUFXO3VCQWdCakIsZUFBZSxTQUFDLE1BQU07NkJBd0N0QixXQUFXLFNBQUMscUJBQXFCOztJQVVwQyxjQUFDO0NBQUEsQUFqSEQsSUFpSEM7U0E1RVksT0FBTzs7Ozs7O0lBQ2xCLGdDQUEyQzs7Ozs7SUF5QjNDLHVCQUF5RDs7Ozs7SUFFekQscUNBQThDOztJQU01QyxrQ0FBdUM7O0lBQ3ZDLGdDQUFtQzs7SUFDbkMsOEJBQStCOztJQUMvQix5QkFBc0M7O0lBQ3RDLGdDQUFzQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBJbmplY3QsXG4gIFF1ZXJ5TGlzdCxcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgSG9zdEJpbmRpbmcsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIFZpZXdDaGlsZCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IElmQWN0aXZlU2VydmljZSB9IGZyb20gJy4uLy4uL3V0aWxzL2NvbmRpdGlvbmFsL2lmLWFjdGl2ZS5zZXJ2aWNlJztcbmltcG9ydCB7IElmT3BlblNlcnZpY2UgfSBmcm9tICcuLi8uLi91dGlscy9jb25kaXRpb25hbC9pZi1vcGVuLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBUYWJzU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL3RhYnMuc2VydmljZSc7XG5pbXBvcnQgeyBDbHJUYWIgfSBmcm9tICcuL3RhYic7XG5pbXBvcnQgeyBDbHJUYWJMaW5rIH0gZnJvbSAnLi90YWItbGluay5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgVEFCU19JRCwgVEFCU19JRF9QUk9WSURFUiB9IGZyb20gJy4vdGFicy1pZC5wcm92aWRlcic7XG5pbXBvcnQgeyBDbHJDb21tb25TdHJpbmdzIH0gZnJvbSAnLi4vLi4vdXRpbHMvaTE4bi9jb21tb24tc3RyaW5ncy5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgVGFic0xheW91dCB9IGZyb20gJy4vZW51bXMvdGFicy1sYXlvdXQuZW51bSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLXRhYnMnLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgICA8dWwgY2xhc3M9XCJuYXZcIiByb2xlPVwidGFibGlzdFwiIFthdHRyLmFyaWEtb3duc109XCJ0YWJJZHNcIj5cbiAgICAgICAgICAgIDwhLS10YWIgbGlua3MtLT5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGxpbmsgb2YgdGFiTGlua0RpcmVjdGl2ZXNcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwibGluay50YWJzSWQgPT09IHRhYnNJZCAmJiAhbGluay5pbk92ZXJmbG93XCI+XG4gICAgICAgICAgICAgICAgICAgIDxsaSByb2xlPVwicHJlc2VudGF0aW9uXCIgY2xhc3M9XCJuYXYtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciBbbmdUZW1wbGF0ZU91dGxldF09XCJsaW5rLnRlbXBsYXRlUmVmQ29udGFpbmVyLnRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJ0YWJzU2VydmljZS5vdmVyZmxvd1RhYnMubGVuZ3RoID4gMFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJzLW92ZXJmbG93IGJvdHRvbS1yaWdodFwiIFtjbGFzcy5vcGVuXT1cImlmT3BlblNlcnZpY2Uub3BlblwiXG4gICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwidG9nZ2xlT3ZlcmZsb3coJGV2ZW50KVwiPlxuICAgICAgICAgICAgICAgICAgICA8bGkgcm9sZT1cInByZXNlbnRhdGlvblwiIGNsYXNzPVwibmF2LWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWxpbmsgbmF2LWxpbmsgZHJvcGRvd24tdG9nZ2xlXCIgdHlwZT1cImJ1dHRvblwiIFtjbGFzcy5hY3RpdmVdPVwiYWN0aXZlVGFiSW5PdmVyZmxvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxjbHItaWNvbiBzaGFwZT1cImVsbGlwc2lzLWhvcml6b250YWxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2NsYXNzLmlzLWluZm9dPVwiaWZPcGVuU2VydmljZS5vcGVuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLnRpdGxlXT1cImNvbW1vblN0cmluZ3MubW9yZVwiPjwvY2xyLWljb24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgPCEtLXRhYiBsaW5rcyBpbiBvdmVyZmxvdyBtZW51LS0+XG4gICAgICAgICAgICAgICAgICAgIDxjbHItdGFiLW92ZXJmbG93LWNvbnRlbnQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBsaW5rIG9mIHRhYkxpbmtEaXJlY3RpdmVzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImxpbmsudGFic0lkID09PSB0YWJzSWQgJiYgbGluay5pbk92ZXJmbG93XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImxpbmsudGVtcGxhdGVSZWZDb250YWluZXIudGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8L2Nsci10YWItb3ZlcmZsb3ctY29udGVudD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8L3VsPlxuICAgICAgICA8bmctY29udGFpbmVyICN0YWJDb250ZW50Vmlld0NvbnRhaW5lcj48L25nLWNvbnRhaW5lcj5cbiAgICBgLFxuICBwcm92aWRlcnM6IFtJZkFjdGl2ZVNlcnZpY2UsIElmT3BlblNlcnZpY2UsIFRhYnNTZXJ2aWNlLCBUQUJTX0lEX1BST1ZJREVSXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyVGFicyBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICAvKiB0c2xpbnQ6ZGlzYWJsZTpuby11bnVzZWQtdmFyaWFibGUgKi9cbiAgQFZpZXdDaGlsZCgndGFiQ29udGVudFZpZXdDb250YWluZXInLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYgfSlcbiAgcHJpdmF0ZSBzZXQgdGFiQ29udGVudFZpZXdDb250YWluZXIodmFsdWU6IFZpZXdDb250YWluZXJSZWYpIHtcbiAgICB0aGlzLnRhYnNTZXJ2aWNlLnRhYkNvbnRlbnRWaWV3Q29udGFpbmVyID0gdmFsdWU7XG4gIH1cbiAgLyogdHNsaW50OmVuYWJsZTpuby11bnVzZWQtdmFyaWFibGUgKi9cblxuICBASW5wdXQoJ2NsckxheW91dCcpXG4gIHNldCBsYXlvdXQobGF5b3V0OiBUYWJzTGF5b3V0KSB7XG4gICAgaWYgKFxuICAgICAgT2JqZWN0LmtleXMoVGFic0xheW91dClcbiAgICAgICAgLm1hcChrZXkgPT4ge1xuICAgICAgICAgIHJldHVybiBUYWJzTGF5b3V0W2tleV07XG4gICAgICAgIH0pXG4gICAgICAgIC5pbmRleE9mKGxheW91dCkgPj0gMFxuICAgICkge1xuICAgICAgdGhpcy50YWJzU2VydmljZS5sYXlvdXQgPSBsYXlvdXQ7XG4gICAgfVxuICB9XG4gIGdldCBsYXlvdXQoKTogVGFic0xheW91dCB7XG4gICAgcmV0dXJuIHRoaXMudGFic1NlcnZpY2UubGF5b3V0O1xuICB9XG5cbiAgQENvbnRlbnRDaGlsZHJlbihDbHJUYWIpIHByaXZhdGUgdGFiczogUXVlcnlMaXN0PENsclRhYj47XG5cbiAgcHJpdmF0ZSBfdGFiTGlua0RpcmVjdGl2ZXM6IENsclRhYkxpbmtbXSA9IFtdO1xuICBnZXQgdGFiTGlua0RpcmVjdGl2ZXMoKTogQ2xyVGFiTGlua1tdIHtcbiAgICByZXR1cm4gdGhpcy5fdGFiTGlua0RpcmVjdGl2ZXM7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgaWZBY3RpdmVTZXJ2aWNlOiBJZkFjdGl2ZVNlcnZpY2UsXG4gICAgcHVibGljIGlmT3BlblNlcnZpY2U6IElmT3BlblNlcnZpY2UsXG4gICAgcHVibGljIHRhYnNTZXJ2aWNlOiBUYWJzU2VydmljZSxcbiAgICBASW5qZWN0KFRBQlNfSUQpIHB1YmxpYyB0YWJzSWQ6IG51bWJlcixcbiAgICBwdWJsaWMgY29tbW9uU3RyaW5nczogQ2xyQ29tbW9uU3RyaW5nc1xuICApIHt9XG5cbiAgZ2V0IGFjdGl2ZVRhYkluT3ZlcmZsb3coKSB7XG4gICAgcmV0dXJuIHRoaXMudGFic1NlcnZpY2Uub3ZlcmZsb3dUYWJzLmluZGV4T2YodGhpcy50YWJzU2VydmljZS5hY3RpdmVUYWIpID4gLTE7XG4gIH1cblxuICBnZXQgdGFiSWRzKCkge1xuICAgIHJldHVybiB0aGlzLnRhYnNTZXJ2aWNlLmNoaWxkcmVuLm1hcCh0YWIgPT4gdGFiLnRhYkxpbmsudGFiTGlua0lkKS5qb2luKCcgJyk7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgdGhpcy5fdGFiTGlua0RpcmVjdGl2ZXMgPSB0aGlzLnRhYnMubWFwKHRhYiA9PiB0YWIudGFiTGluayk7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLnRhYnMuY2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLl90YWJMaW5rRGlyZWN0aXZlcyA9IHRoaXMudGFicy5tYXAodGFiID0+IHRhYi50YWJMaW5rKTtcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIGlmICh0eXBlb2YgdGhpcy5pZkFjdGl2ZVNlcnZpY2UuY3VycmVudCA9PT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy50YWJMaW5rRGlyZWN0aXZlc1swXSkge1xuICAgICAgdGhpcy50YWJMaW5rRGlyZWN0aXZlc1swXS5hY3RpdmF0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIHRvZ2dsZU92ZXJmbG93KGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLmlmT3BlblNlcnZpY2UudG9nZ2xlV2l0aEV2ZW50KGV2ZW50KTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MudGFicy12ZXJ0aWNhbCcpXG4gIGdldCBpc1ZlcnRpY2FsKCkge1xuICAgIHJldHVybiB0aGlzLmxheW91dCA9PT0gVGFic0xheW91dC5WRVJUSUNBTDtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHN1YiA9PiB7XG4gICAgICBzdWIudW5zdWJzY3JpYmUoKTtcbiAgICB9KTtcbiAgfVxufVxuIl19