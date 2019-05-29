/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, Inject, Input, TemplateRef, ViewChild } from '@angular/core';
import { IF_ACTIVE_ID, IfActiveService } from '../../utils/conditional/if-active.service';
import { AriaService } from './providers/aria.service';
import { TabsService } from './providers/tabs.service';
/** @type {?} */
var nbTabContentComponents = 0;
var ClrTabContent = /** @class */ (function () {
    function ClrTabContent(ifActiveService, id, ariaService, tabsService) {
        this.ifActiveService = ifActiveService;
        this.id = id;
        this.ariaService = ariaService;
        this.tabsService = tabsService;
        if (!this.tabContentId) {
            this.tabContentId = 'clr-tab-content-' + nbTabContentComponents++;
        }
    }
    Object.defineProperty(ClrTabContent.prototype, "templateRef", {
        // The template must be applied on the top-down phase of view-child initialization to prevent
        // components in the content from initializing before a content container exists.
        // Some child components need their container for sizing calculations.
        /* tslint:disable:no-unused-variable */
        set: 
        // The template must be applied on the top-down phase of view-child initialization to prevent
        // components in the content from initializing before a content container exists.
        // Some child components need their container for sizing calculations.
        /* tslint:disable:no-unused-variable */
        /**
         * @private
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.viewRef = this.tabsService.tabContentViewContainer.createEmbeddedView(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTabContent.prototype, "ariaLabelledBy", {
        /* tslint:enable:no-unused-variable */
        get: /* tslint:enable:no-unused-variable */
        /**
         * @return {?}
         */
        function () {
            return this.ariaService.ariaLabelledBy;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTabContent.prototype, "tabContentId", {
        get: /**
         * @return {?}
         */
        function () {
            return this.ariaService.ariaControls;
        },
        set: /**
         * @param {?} id
         * @return {?}
         */
        function (id) {
            this.ariaService.ariaControls = id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTabContent.prototype, "active", {
        get: /**
         * @return {?}
         */
        function () {
            return this.ifActiveService.current === this.id;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ClrTabContent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var index = this.tabsService.tabContentViewContainer.indexOf(this.viewRef);
        if (index > -1) {
            this.tabsService.tabContentViewContainer.remove(index);
        }
    };
    ClrTabContent.decorators = [
        { type: Component, args: [{
                    selector: 'clr-tab-content',
                    template: "\n    <ng-template #tabContentProjectedRef>\n      <section [id]=\"tabContentId\" role=\"tabpanel\" class=\"tab-content\" [class.active]=\"active\"\n               [hidden]=\"!active\"\n               [attr.aria-labelledby]=\"ariaLabelledBy\"\n               [attr.aria-expanded]=\"active\"\n               [attr.aria-hidden]=\"!active\">\n        <ng-content></ng-content>\n      </section>\n    </ng-template>\n    "
                }] }
    ];
    /** @nocollapse */
    ClrTabContent.ctorParameters = function () { return [
        { type: IfActiveService },
        { type: Number, decorators: [{ type: Inject, args: [IF_ACTIVE_ID,] }] },
        { type: AriaService },
        { type: TabsService }
    ]; };
    ClrTabContent.propDecorators = {
        templateRef: [{ type: ViewChild, args: ['tabContentProjectedRef', { static: true },] }],
        tabContentId: [{ type: Input, args: ['id',] }]
    };
    return ClrTabContent;
}());
export { ClrTabContent };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ClrTabContent.prototype.viewRef;
    /** @type {?} */
    ClrTabContent.prototype.ifActiveService;
    /** @type {?} */
    ClrTabContent.prototype.id;
    /**
     * @type {?}
     * @private
     */
    ClrTabContent.prototype.ariaService;
    /**
     * @type {?}
     * @private
     */
    ClrTabContent.prototype.tabsService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWNvbnRlbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJsYXlvdXQvdGFicy90YWItY29udGVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFLQSxPQUFPLEVBQUUsU0FBUyxFQUFtQixNQUFNLEVBQUUsS0FBSyxFQUFhLFdBQVcsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0csT0FBTyxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUMxRixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDBCQUEwQixDQUFDOztJQUVuRCxzQkFBc0IsR0FBVyxDQUFDO0FBRXRDO0lBZUUsdUJBQ1MsZUFBZ0MsRUFDVixFQUFVLEVBQy9CLFdBQXdCLEVBQ3hCLFdBQXdCO1FBSHpCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNWLE9BQUUsR0FBRixFQUFFLENBQVE7UUFDL0IsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFFaEMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDdEIsSUFBSSxDQUFDLFlBQVksR0FBRyxrQkFBa0IsR0FBRyxzQkFBc0IsRUFBRSxDQUFDO1NBQ25FO0lBQ0gsQ0FBQztJQVFELHNCQUNZLHNDQUFXO1FBTHZCLDZGQUE2RjtRQUM3RixpRkFBaUY7UUFDakYsc0VBQXNFO1FBQ3RFLHVDQUF1Qzs7Ozs7Ozs7Ozs7UUFDdkMsVUFDd0IsS0FBaUM7WUFDdkQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLHVCQUF1QixDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BGLENBQUM7OztPQUFBO0lBR0Qsc0JBQUkseUNBQWM7UUFGbEIsc0NBQXNDOzs7OztRQUV0QztZQUNFLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUM7UUFDekMsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSx1Q0FBWTs7OztRQUFoQjtZQUNFLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUM7UUFDdkMsQ0FBQzs7Ozs7UUFFRCxVQUNpQixFQUFVO1lBQ3pCLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztRQUNyQyxDQUFDOzs7T0FMQTtJQU9ELHNCQUFJLGlDQUFNOzs7O1FBQVY7WUFDRSxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxLQUFLLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDbEQsQ0FBQzs7O09BQUE7Ozs7SUFFRCxtQ0FBVzs7O0lBQVg7O1lBQ1EsS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsdUJBQXVCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDNUUsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUU7WUFDZCxJQUFJLENBQUMsV0FBVyxDQUFDLHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN4RDtJQUNILENBQUM7O2dCQTVERixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtvQkFDM0IsUUFBUSxFQUFFLG1hQVVQO2lCQUNKOzs7O2dCQW5Cc0IsZUFBZTs2Q0F1QmpDLE1BQU0sU0FBQyxZQUFZO2dCQXRCZixXQUFXO2dCQUNYLFdBQVc7Ozs4QkFvQ2pCLFNBQVMsU0FBQyx3QkFBd0IsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7K0JBY3BELEtBQUssU0FBQyxJQUFJOztJQWViLG9CQUFDO0NBQUEsQUE3REQsSUE2REM7U0EvQ1ksYUFBYTs7Ozs7O0lBWXhCLGdDQUFnRDs7SUFWOUMsd0NBQXVDOztJQUN2QywyQkFBdUM7Ozs7O0lBQ3ZDLG9DQUFnQzs7Ozs7SUFDaEMsb0NBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgQ29tcG9uZW50LCBFbWJlZGRlZFZpZXdSZWYsIEluamVjdCwgSW5wdXQsIE9uRGVzdHJveSwgVGVtcGxhdGVSZWYsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSUZfQUNUSVZFX0lELCBJZkFjdGl2ZVNlcnZpY2UgfSBmcm9tICcuLi8uLi91dGlscy9jb25kaXRpb25hbC9pZi1hY3RpdmUuc2VydmljZSc7XG5pbXBvcnQgeyBBcmlhU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2FyaWEuc2VydmljZSc7XG5pbXBvcnQgeyBUYWJzU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL3RhYnMuc2VydmljZSc7XG5cbmxldCBuYlRhYkNvbnRlbnRDb21wb25lbnRzOiBudW1iZXIgPSAwO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItdGFiLWNvbnRlbnQnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy10ZW1wbGF0ZSAjdGFiQ29udGVudFByb2plY3RlZFJlZj5cbiAgICAgIDxzZWN0aW9uIFtpZF09XCJ0YWJDb250ZW50SWRcIiByb2xlPVwidGFicGFuZWxcIiBjbGFzcz1cInRhYi1jb250ZW50XCIgW2NsYXNzLmFjdGl2ZV09XCJhY3RpdmVcIlxuICAgICAgICAgICAgICAgW2hpZGRlbl09XCIhYWN0aXZlXCJcbiAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxsZWRieV09XCJhcmlhTGFiZWxsZWRCeVwiXG4gICAgICAgICAgICAgICBbYXR0ci5hcmlhLWV4cGFuZGVkXT1cImFjdGl2ZVwiXG4gICAgICAgICAgICAgICBbYXR0ci5hcmlhLWhpZGRlbl09XCIhYWN0aXZlXCI+XG4gICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgIDwvc2VjdGlvbj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIGAsXG59KVxuZXhwb3J0IGNsYXNzIENsclRhYkNvbnRlbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgaWZBY3RpdmVTZXJ2aWNlOiBJZkFjdGl2ZVNlcnZpY2UsXG4gICAgQEluamVjdChJRl9BQ1RJVkVfSUQpIHB1YmxpYyBpZDogbnVtYmVyLFxuICAgIHByaXZhdGUgYXJpYVNlcnZpY2U6IEFyaWFTZXJ2aWNlLFxuICAgIHByaXZhdGUgdGFic1NlcnZpY2U6IFRhYnNTZXJ2aWNlXG4gICkge1xuICAgIGlmICghdGhpcy50YWJDb250ZW50SWQpIHtcbiAgICAgIHRoaXMudGFiQ29udGVudElkID0gJ2Nsci10YWItY29udGVudC0nICsgbmJUYWJDb250ZW50Q29tcG9uZW50cysrO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdmlld1JlZjogRW1iZWRkZWRWaWV3UmVmPENsclRhYkNvbnRlbnQ+O1xuXG4gIC8vIFRoZSB0ZW1wbGF0ZSBtdXN0IGJlIGFwcGxpZWQgb24gdGhlIHRvcC1kb3duIHBoYXNlIG9mIHZpZXctY2hpbGQgaW5pdGlhbGl6YXRpb24gdG8gcHJldmVudFxuICAvLyBjb21wb25lbnRzIGluIHRoZSBjb250ZW50IGZyb20gaW5pdGlhbGl6aW5nIGJlZm9yZSBhIGNvbnRlbnQgY29udGFpbmVyIGV4aXN0cy5cbiAgLy8gU29tZSBjaGlsZCBjb21wb25lbnRzIG5lZWQgdGhlaXIgY29udGFpbmVyIGZvciBzaXppbmcgY2FsY3VsYXRpb25zLlxuICAvKiB0c2xpbnQ6ZGlzYWJsZTpuby11bnVzZWQtdmFyaWFibGUgKi9cbiAgQFZpZXdDaGlsZCgndGFiQ29udGVudFByb2plY3RlZFJlZicsIHsgc3RhdGljOiB0cnVlIH0pXG4gIHByaXZhdGUgc2V0IHRlbXBsYXRlUmVmKHZhbHVlOiBUZW1wbGF0ZVJlZjxDbHJUYWJDb250ZW50Pikge1xuICAgIHRoaXMudmlld1JlZiA9IHRoaXMudGFic1NlcnZpY2UudGFiQ29udGVudFZpZXdDb250YWluZXIuY3JlYXRlRW1iZWRkZWRWaWV3KHZhbHVlKTtcbiAgfVxuICAvKiB0c2xpbnQ6ZW5hYmxlOm5vLXVudXNlZC12YXJpYWJsZSAqL1xuXG4gIGdldCBhcmlhTGFiZWxsZWRCeSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmFyaWFTZXJ2aWNlLmFyaWFMYWJlbGxlZEJ5O1xuICB9XG5cbiAgZ2V0IHRhYkNvbnRlbnRJZCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmFyaWFTZXJ2aWNlLmFyaWFDb250cm9scztcbiAgfVxuXG4gIEBJbnB1dCgnaWQnKVxuICBzZXQgdGFiQ29udGVudElkKGlkOiBzdHJpbmcpIHtcbiAgICB0aGlzLmFyaWFTZXJ2aWNlLmFyaWFDb250cm9scyA9IGlkO1xuICB9XG5cbiAgZ2V0IGFjdGl2ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5pZkFjdGl2ZVNlcnZpY2UuY3VycmVudCA9PT0gdGhpcy5pZDtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy50YWJzU2VydmljZS50YWJDb250ZW50Vmlld0NvbnRhaW5lci5pbmRleE9mKHRoaXMudmlld1JlZik7XG4gICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgIHRoaXMudGFic1NlcnZpY2UudGFiQ29udGVudFZpZXdDb250YWluZXIucmVtb3ZlKGluZGV4KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==