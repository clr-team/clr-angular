/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
    Object.defineProperty(ClrTabs.prototype, "layout", {
        get: /**
         * @return {?}
         */
        function () {
            return this.tabsService.layout;
        },
        set: /**
         * @param {?} layout
         * @return {?}
         */
        function (layout) {
            if (Object.values(TabsLayout).includes(layout)) {
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
    Object.defineProperty(ClrTabs.prototype, "tabContents", {
        get: /**
         * @return {?}
         */
        function () {
            return this.tabs.filter(function (tab) { return !!tab.tabContent; }).map(function (tab) { return tab.tabContent; });
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
            return this.tabsService.children.map(function (tab) { return tab.tabLink.tabLinkId; }).join(' ');
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
        this._tabLinkDirectives = this.tabs.map(function (tab) { return tab.tabLink; });
        this.subscriptions.push(this.tabs.changes.subscribe(function () {
            _this._tabLinkDirectives = _this.tabs.map(function (tab) { return tab.tabLink; });
        }));
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
        this.subscriptions.forEach(function (sub) {
            sub.unsubscribe();
        });
    };
    ClrTabs.decorators = [
        { type: Component, args: [{
                    selector: 'clr-tabs',
                    template: "\n        <ul class=\"nav\" role=\"tablist\" [attr.aria-owns]=\"tabIds\">\n            <!--tab links-->\n            <ng-container *ngFor=\"let link of tabLinkDirectives\">\n                <ng-container *ngIf=\"link.tabsId === tabsId && !link.inOverflow\">\n                    <li role=\"presentation\" class=\"nav-item\">\n                        <ng-container [ngTemplateOutlet]=\"link.templateRefContainer.template\"></ng-container>\n                    </li>\n                </ng-container>\n            </ng-container>\n            <ng-container *ngIf=\"tabsService.overflowTabs.length > 0\">\n                <div class=\"tabs-overflow bottom-right\" [class.open]=\"ifOpenService.open\"\n                     (click)=\"toggleOverflow($event)\">\n                    <li role=\"presentation\" class=\"nav-item\">\n                        <button class=\"btn btn-link nav-link dropdown-toggle\" type=\"button\" [class.active]=\"activeTabInOverflow\">\n                            <clr-icon shape=\"ellipsis-horizontal\"\n                              [class.is-info]=\"ifOpenService.open\"\n                              [attr.title]=\"commonStrings.more\"></clr-icon>\n                        </button>\n                    </li>\n                    <!--tab links in overflow menu-->\n                    <clr-tab-overflow-content>\n                        <ng-container *ngFor=\"let link of tabLinkDirectives\">\n                            <ng-container *ngIf=\"link.tabsId === tabsId && link.inOverflow\"\n                                          [ngTemplateOutlet]=\"link.templateRefContainer.template\">\n                            </ng-container>\n                        </ng-container>\n                    </clr-tab-overflow-content>\n                </div>\n            </ng-container>\n        </ul>\n        <!--tab content-->\n        <ng-container *ngFor=\"let content of tabContents\">\n            <ng-container [ngTemplateOutlet]=\"content.templateRef\"></ng-container>\n        </ng-container>\n    ",
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
        layout: [{ type: Input, args: ['clrLayout',] }],
        tabs: [{ type: ContentChildren, args: [ClrTab,] }],
        isVertical: [{ type: HostBinding, args: ['class.tabs-vertical',] }]
    };
    return ClrTabs;
}());
export { ClrTabs };
if (false) {
    /** @type {?} */
    ClrTabs.prototype.subscriptions;
    /** @type {?} */
    ClrTabs.prototype.tabs;
    /** @type {?} */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImxheW91dC90YWJzL3RhYnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUVMLFNBQVMsRUFDVCxlQUFlLEVBQ2YsTUFBTSxFQUNOLFNBQVMsRUFDVCxLQUFLLEVBRUwsV0FBVyxHQUNaLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUM1RSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFFeEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFHL0IsT0FBTyxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUd0RDtJQWdFRSxpQkFDUyxlQUFnQyxFQUNoQyxhQUE0QixFQUM1QixXQUF3QixFQUNQLE1BQWMsRUFDL0IsYUFBK0I7UUFKL0Isb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ1AsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUMvQixrQkFBYSxHQUFiLGFBQWEsQ0FBa0I7UUE1QmhDLGtCQUFhLEdBQW1CLEVBQUUsQ0FBQztRQWNuQyx1QkFBa0IsR0FBaUIsRUFBRSxDQUFDO0lBZTNDLENBQUM7SUEzQkosc0JBQ0ksMkJBQU07Ozs7UUFLVjtZQUNFLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUM7UUFDakMsQ0FBQzs7Ozs7UUFSRCxVQUNXLE1B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QUFPO2dCQXhFVixnQkFBZ0I7Ozt5QkErQ3RCLEtBQUssU0FBQyxXQUFXO3VCQVVqQixlQUFlLFNBQUMsTUFBTTs2QkE0Q3RCLFdBQVcsU0FBQyxxQkFBcUI7O0lBVXBDLGNBQUM7Q0FBQSxBQTNHRCxJQTJHQztTQW5FWSxPQUFPOzs7SUFDbEIsZ0NBQTJDOztJQVkzQyx1QkFBeUQ7O0lBRXpELHFDQUE4Qzs7SUFVNUMsa0NBQXVDOztJQUN2QyxnQ0FBbUM7O0lBQ25DLDhCQUErQjs7SUFDL0IseUJBQXNDOztJQUN0QyxnQ0FBc0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgSW5qZWN0LFxuICBRdWVyeUxpc3QsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIEhvc3RCaW5kaW5nLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgSWZBY3RpdmVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vdXRpbHMvY29uZGl0aW9uYWwvaWYtYWN0aXZlLnNlcnZpY2UnO1xuaW1wb3J0IHsgSWZPcGVuU2VydmljZSB9IGZyb20gJy4uLy4uL3V0aWxzL2NvbmRpdGlvbmFsL2lmLW9wZW4uc2VydmljZSc7XG5cbmltcG9ydCB7IFRhYnNTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvdGFicy5zZXJ2aWNlJztcbmltcG9ydCB7IENsclRhYiB9IGZyb20gJy4vdGFiJztcbmltcG9ydCB7IENsclRhYkxpbmsgfSBmcm9tICcuL3RhYi1saW5rLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBDbHJUYWJDb250ZW50IH0gZnJvbSAnLi90YWItY29udGVudCc7XG5pbXBvcnQgeyBUQUJTX0lELCBUQUJTX0lEX1BST1ZJREVSIH0gZnJvbSAnLi90YWJzLWlkLnByb3ZpZGVyJztcbmltcG9ydCB7IENsckNvbW1vblN0cmluZ3MgfSBmcm9tICcuLi8uLi91dGlscy9pMThuL2NvbW1vbi1zdHJpbmdzLmludGVyZmFjZSc7XG5pbXBvcnQgeyBUYWJzTGF5b3V0IH0gZnJvbSAnLi9lbnVtcy90YWJzLWxheW91dC5lbnVtJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItdGFicycsXG4gIHRlbXBsYXRlOiBgXG4gICAgICAgIDx1bCBjbGFzcz1cIm5hdlwiIHJvbGU9XCJ0YWJsaXN0XCIgW2F0dHIuYXJpYS1vd25zXT1cInRhYklkc1wiPlxuICAgICAgICAgICAgPCEtLXRhYiBsaW5rcy0tPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgbGluayBvZiB0YWJMaW5rRGlyZWN0aXZlc1wiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJsaW5rLnRhYnNJZCA9PT0gdGFic0lkICYmICFsaW5rLmluT3ZlcmZsb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxpIHJvbGU9XCJwcmVzZW50YXRpb25cIiBjbGFzcz1cIm5hdi1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImxpbmsudGVtcGxhdGVSZWZDb250YWluZXIudGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInRhYnNTZXJ2aWNlLm92ZXJmbG93VGFicy5sZW5ndGggPiAwXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhYnMtb3ZlcmZsb3cgYm90dG9tLXJpZ2h0XCIgW2NsYXNzLm9wZW5dPVwiaWZPcGVuU2VydmljZS5vcGVuXCJcbiAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJ0b2dnbGVPdmVyZmxvdygkZXZlbnQpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxsaSByb2xlPVwicHJlc2VudGF0aW9uXCIgY2xhc3M9XCJuYXYtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tbGluayBuYXYtbGluayBkcm9wZG93bi10b2dnbGVcIiB0eXBlPVwiYnV0dG9uXCIgW2NsYXNzLmFjdGl2ZV09XCJhY3RpdmVUYWJJbk92ZXJmbG93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGNsci1pY29uIHNoYXBlPVwiZWxsaXBzaXMtaG9yaXpvbnRhbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbY2xhc3MuaXMtaW5mb109XCJpZk9wZW5TZXJ2aWNlLm9wZW5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIudGl0bGVdPVwiY29tbW9uU3RyaW5ncy5tb3JlXCI+PC9jbHItaWNvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICA8IS0tdGFiIGxpbmtzIGluIG92ZXJmbG93IG1lbnUtLT5cbiAgICAgICAgICAgICAgICAgICAgPGNsci10YWItb3ZlcmZsb3ctY29udGVudD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGxpbmsgb2YgdGFiTGlua0RpcmVjdGl2ZXNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwibGluay50YWJzSWQgPT09IHRhYnNJZCAmJiBsaW5rLmluT3ZlcmZsb3dcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwibGluay50ZW1wbGF0ZVJlZkNvbnRhaW5lci50ZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIDwvY2xyLXRhYi1vdmVyZmxvdy1jb250ZW50PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvdWw+XG4gICAgICAgIDwhLS10YWIgY29udGVudC0tPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBjb250ZW50IG9mIHRhYkNvbnRlbnRzXCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImNvbnRlbnQudGVtcGxhdGVSZWZcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgYCxcbiAgcHJvdmlkZXJzOiBbSWZBY3RpdmVTZXJ2aWNlLCBJZk9wZW5TZXJ2aWNlLCBUYWJzU2VydmljZSwgVEFCU19JRF9QUk9WSURFUl0sXG59KVxuZXhwb3J0IGNsYXNzIENsclRhYnMgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuICBwcml2YXRlIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgQElucHV0KCdjbHJMYXlvdXQnKVxuICBzZXQgbGF5b3V0KGxheW91dDogVGFic0xheW91dCkge1xuICAgIGlmIChPYmplY3QudmFsdWVzKFRhYnNMYXlvdXQpLmluY2x1ZGVzKGxheW91dCkpIHtcbiAgICAgIHRoaXMudGFic1NlcnZpY2UubGF5b3V0ID0gbGF5b3V0O1xuICAgIH1cbiAgfVxuICBnZXQgbGF5b3V0KCk6IFRhYnNMYXlvdXQge1xuICAgIHJldHVybiB0aGlzLnRhYnNTZXJ2aWNlLmxheW91dDtcbiAgfVxuXG4gIEBDb250ZW50Q2hpbGRyZW4oQ2xyVGFiKSBwcml2YXRlIHRhYnM6IFF1ZXJ5TGlzdDxDbHJUYWI+O1xuXG4gIHByaXZhdGUgX3RhYkxpbmtEaXJlY3RpdmVzOiBDbHJUYWJMaW5rW10gPSBbXTtcbiAgZ2V0IHRhYkxpbmtEaXJlY3RpdmVzKCk6IENsclRhYkxpbmtbXSB7XG4gICAgcmV0dXJuIHRoaXMuX3RhYkxpbmtEaXJlY3RpdmVzO1xuICB9XG5cbiAgZ2V0IHRhYkNvbnRlbnRzKCk6IENsclRhYkNvbnRlbnRbXSB7XG4gICAgcmV0dXJuIHRoaXMudGFicy5maWx0ZXIodGFiID0+ICEhdGFiLnRhYkNvbnRlbnQpLm1hcCh0YWIgPT4gdGFiLnRhYkNvbnRlbnQpO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGlmQWN0aXZlU2VydmljZTogSWZBY3RpdmVTZXJ2aWNlLFxuICAgIHB1YmxpYyBpZk9wZW5TZXJ2aWNlOiBJZk9wZW5TZXJ2aWNlLFxuICAgIHB1YmxpYyB0YWJzU2VydmljZTogVGFic1NlcnZpY2UsXG4gICAgQEluamVjdChUQUJTX0lEKSBwdWJsaWMgdGFic0lkOiBudW1iZXIsXG4gICAgcHVibGljIGNvbW1vblN0cmluZ3M6IENsckNvbW1vblN0cmluZ3NcbiAgKSB7fVxuXG4gIGdldCBhY3RpdmVUYWJJbk92ZXJmbG93KCkge1xuICAgIHJldHVybiB0aGlzLnRhYnNTZXJ2aWNlLm92ZXJmbG93VGFicy5pbmRleE9mKHRoaXMudGFic1NlcnZpY2UuYWN0aXZlVGFiKSA+IC0xO1xuICB9XG5cbiAgZ2V0IHRhYklkcygpIHtcbiAgICByZXR1cm4gdGhpcy50YWJzU2VydmljZS5jaGlsZHJlbi5tYXAodGFiID0+IHRhYi50YWJMaW5rLnRhYkxpbmtJZCkuam9pbignICcpO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIHRoaXMuX3RhYkxpbmtEaXJlY3RpdmVzID0gdGhpcy50YWJzLm1hcCh0YWIgPT4gdGFiLnRhYkxpbmspO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy50YWJzLmNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5fdGFiTGlua0RpcmVjdGl2ZXMgPSB0aGlzLnRhYnMubWFwKHRhYiA9PiB0YWIudGFiTGluayk7XG4gICAgICB9KVxuICAgICk7XG5cbiAgICBpZiAodHlwZW9mIHRoaXMuaWZBY3RpdmVTZXJ2aWNlLmN1cnJlbnQgPT09ICd1bmRlZmluZWQnICYmIHRoaXMudGFiTGlua0RpcmVjdGl2ZXNbMF0pIHtcbiAgICAgIHRoaXMudGFiTGlua0RpcmVjdGl2ZXNbMF0uYWN0aXZhdGUoKTtcbiAgICB9XG4gIH1cblxuICB0b2dnbGVPdmVyZmxvdyhldmVudDogYW55KSB7XG4gICAgdGhpcy5pZk9wZW5TZXJ2aWNlLnRvZ2dsZVdpdGhFdmVudChldmVudCk7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnRhYnMtdmVydGljYWwnKVxuICBnZXQgaXNWZXJ0aWNhbCgpIHtcbiAgICByZXR1cm4gdGhpcy5sYXlvdXQgPT09IFRhYnNMYXlvdXQuVkVSVElDQUw7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaChzdWIgPT4ge1xuICAgICAgc3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==