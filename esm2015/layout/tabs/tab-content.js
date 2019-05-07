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
let nbTabContentComponents = 0;
export class ClrTabContent {
    /**
     * @param {?} ifActiveService
     * @param {?} id
     * @param {?} ariaService
     * @param {?} tabsService
     */
    constructor(ifActiveService, id, ariaService, tabsService) {
        this.ifActiveService = ifActiveService;
        this.id = id;
        this.ariaService = ariaService;
        this.tabsService = tabsService;
        if (!this.tabContentId) {
            this.tabContentId = 'clr-tab-content-' + nbTabContentComponents++;
        }
    }
    // The template must be applied on the top-down phase of view-child initialization to prevent
    // components in the content from initializing before a content container exists.
    // Some child components need their container for sizing calculations.
    /* tslint:disable:no-unused-variable */
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    set templateRef(value) {
        this.viewRef = this.tabsService.tabContentViewContainer.createEmbeddedView(value);
    }
    /* tslint:enable:no-unused-variable */
    /**
     * @return {?}
     */
    get ariaLabelledBy() {
        return this.ariaService.ariaLabelledBy;
    }
    /**
     * @return {?}
     */
    get tabContentId() {
        return this.ariaService.ariaControls;
    }
    /**
     * @param {?} id
     * @return {?}
     */
    set tabContentId(id) {
        this.ariaService.ariaControls = id;
    }
    /**
     * @return {?}
     */
    get active() {
        return this.ifActiveService.current === this.id;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        /** @type {?} */
        const index = this.tabsService.tabContentViewContainer.indexOf(this.viewRef);
        if (index > -1) {
            this.tabsService.tabContentViewContainer.remove(index);
        }
    }
}
ClrTabContent.decorators = [
    { type: Component, args: [{
                selector: 'clr-tab-content',
                template: `
    <ng-template #tabContentProjectedRef>
      <section [id]="tabContentId" role="tabpanel" class="tab-content" [class.active]="active"
               [hidden]="!active"
               [attr.aria-labelledby]="ariaLabelledBy"
               [attr.aria-expanded]="active"
               [attr.aria-hidden]="!active">
        <ng-content></ng-content>
      </section>
    </ng-template>
    `
            }] }
];
/** @nocollapse */
ClrTabContent.ctorParameters = () => [
    { type: IfActiveService },
    { type: Number, decorators: [{ type: Inject, args: [IF_ACTIVE_ID,] }] },
    { type: AriaService },
    { type: TabsService }
];
ClrTabContent.propDecorators = {
    templateRef: [{ type: ViewChild, args: ['tabContentProjectedRef',] }],
    tabContentId: [{ type: Input, args: ['id',] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWNvbnRlbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJsYXlvdXQvdGFicy90YWItY29udGVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFLQSxPQUFPLEVBQUUsU0FBUyxFQUFtQixNQUFNLEVBQUUsS0FBSyxFQUFhLFdBQVcsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0csT0FBTyxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUMxRixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDBCQUEwQixDQUFDOztJQUVuRCxzQkFBc0IsR0FBVyxDQUFDO0FBZ0J0QyxNQUFNLE9BQU8sYUFBYTs7Ozs7OztJQUN4QixZQUNTLGVBQWdDLEVBQ1YsRUFBVSxFQUMvQixXQUF3QixFQUN4QixXQUF3QjtRQUh6QixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDVixPQUFFLEdBQUYsRUFBRSxDQUFRO1FBQy9CLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBRWhDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxZQUFZLEdBQUcsa0JBQWtCLEdBQUcsc0JBQXNCLEVBQUUsQ0FBQztTQUNuRTtJQUNILENBQUM7Ozs7Ozs7Ozs7SUFRRCxJQUNZLFdBQVcsQ0FBQyxLQUFpQztRQUN2RCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsdUJBQXVCLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEYsQ0FBQzs7Ozs7SUFHRCxJQUFJLGNBQWM7UUFDaEIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQztJQUN6QyxDQUFDOzs7O0lBRUQsSUFBSSxZQUFZO1FBQ2QsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQztJQUN2QyxDQUFDOzs7OztJQUVELElBQ0ksWUFBWSxDQUFDLEVBQVU7UUFDekIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO0lBQ3JDLENBQUM7Ozs7SUFFRCxJQUFJLE1BQU07UUFDUixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxLQUFLLElBQUksQ0FBQyxFQUFFLENBQUM7SUFDbEQsQ0FBQzs7OztJQUVELFdBQVc7O2NBQ0gsS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsdUJBQXVCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDNUUsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUU7WUFDZCxJQUFJLENBQUMsV0FBVyxDQUFDLHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN4RDtJQUNILENBQUM7OztZQTVERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0IsUUFBUSxFQUFFOzs7Ozs7Ozs7O0tBVVA7YUFDSjs7OztZQW5Cc0IsZUFBZTt5Q0F1QmpDLE1BQU0sU0FBQyxZQUFZO1lBdEJmLFdBQVc7WUFDWCxXQUFXOzs7MEJBb0NqQixTQUFTLFNBQUMsd0JBQXdCOzJCQWNsQyxLQUFLLFNBQUMsSUFBSTs7Ozs7OztJQXBCWCxnQ0FBZ0Q7O0lBVjlDLHdDQUF1Qzs7SUFDdkMsMkJBQXVDOzs7OztJQUN2QyxvQ0FBZ0M7Ozs7O0lBQ2hDLG9DQUFnQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IENvbXBvbmVudCwgRW1iZWRkZWRWaWV3UmVmLCBJbmplY3QsIElucHV0LCBPbkRlc3Ryb3ksIFRlbXBsYXRlUmVmLCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IElGX0FDVElWRV9JRCwgSWZBY3RpdmVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vdXRpbHMvY29uZGl0aW9uYWwvaWYtYWN0aXZlLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXJpYVNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9hcmlhLnNlcnZpY2UnO1xuaW1wb3J0IHsgVGFic1NlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy90YWJzLnNlcnZpY2UnO1xuXG5sZXQgbmJUYWJDb250ZW50Q29tcG9uZW50czogbnVtYmVyID0gMDtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLXRhYi1jb250ZW50JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctdGVtcGxhdGUgI3RhYkNvbnRlbnRQcm9qZWN0ZWRSZWY+XG4gICAgICA8c2VjdGlvbiBbaWRdPVwidGFiQ29udGVudElkXCIgcm9sZT1cInRhYnBhbmVsXCIgY2xhc3M9XCJ0YWItY29udGVudFwiIFtjbGFzcy5hY3RpdmVdPVwiYWN0aXZlXCJcbiAgICAgICAgICAgICAgIFtoaWRkZW5dPVwiIWFjdGl2ZVwiXG4gICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwiYXJpYUxhYmVsbGVkQnlcIlxuICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1leHBhbmRlZF09XCJhY3RpdmVcIlxuICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1oaWRkZW5dPVwiIWFjdGl2ZVwiPlxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICA8L3NlY3Rpb24+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICBgLFxufSlcbmV4cG9ydCBjbGFzcyBDbHJUYWJDb250ZW50IGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGlmQWN0aXZlU2VydmljZTogSWZBY3RpdmVTZXJ2aWNlLFxuICAgIEBJbmplY3QoSUZfQUNUSVZFX0lEKSBwdWJsaWMgaWQ6IG51bWJlcixcbiAgICBwcml2YXRlIGFyaWFTZXJ2aWNlOiBBcmlhU2VydmljZSxcbiAgICBwcml2YXRlIHRhYnNTZXJ2aWNlOiBUYWJzU2VydmljZVxuICApIHtcbiAgICBpZiAoIXRoaXMudGFiQ29udGVudElkKSB7XG4gICAgICB0aGlzLnRhYkNvbnRlbnRJZCA9ICdjbHItdGFiLWNvbnRlbnQtJyArIG5iVGFiQ29udGVudENvbXBvbmVudHMrKztcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHZpZXdSZWY6IEVtYmVkZGVkVmlld1JlZjxDbHJUYWJDb250ZW50PjtcblxuICAvLyBUaGUgdGVtcGxhdGUgbXVzdCBiZSBhcHBsaWVkIG9uIHRoZSB0b3AtZG93biBwaGFzZSBvZiB2aWV3LWNoaWxkIGluaXRpYWxpemF0aW9uIHRvIHByZXZlbnRcbiAgLy8gY29tcG9uZW50cyBpbiB0aGUgY29udGVudCBmcm9tIGluaXRpYWxpemluZyBiZWZvcmUgYSBjb250ZW50IGNvbnRhaW5lciBleGlzdHMuXG4gIC8vIFNvbWUgY2hpbGQgY29tcG9uZW50cyBuZWVkIHRoZWlyIGNvbnRhaW5lciBmb3Igc2l6aW5nIGNhbGN1bGF0aW9ucy5cbiAgLyogdHNsaW50OmRpc2FibGU6bm8tdW51c2VkLXZhcmlhYmxlICovXG4gIEBWaWV3Q2hpbGQoJ3RhYkNvbnRlbnRQcm9qZWN0ZWRSZWYnKVxuICBwcml2YXRlIHNldCB0ZW1wbGF0ZVJlZih2YWx1ZTogVGVtcGxhdGVSZWY8Q2xyVGFiQ29udGVudD4pIHtcbiAgICB0aGlzLnZpZXdSZWYgPSB0aGlzLnRhYnNTZXJ2aWNlLnRhYkNvbnRlbnRWaWV3Q29udGFpbmVyLmNyZWF0ZUVtYmVkZGVkVmlldyh2YWx1ZSk7XG4gIH1cbiAgLyogdHNsaW50OmVuYWJsZTpuby11bnVzZWQtdmFyaWFibGUgKi9cblxuICBnZXQgYXJpYUxhYmVsbGVkQnkoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5hcmlhU2VydmljZS5hcmlhTGFiZWxsZWRCeTtcbiAgfVxuXG4gIGdldCB0YWJDb250ZW50SWQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5hcmlhU2VydmljZS5hcmlhQ29udHJvbHM7XG4gIH1cblxuICBASW5wdXQoJ2lkJylcbiAgc2V0IHRhYkNvbnRlbnRJZChpZDogc3RyaW5nKSB7XG4gICAgdGhpcy5hcmlhU2VydmljZS5hcmlhQ29udHJvbHMgPSBpZDtcbiAgfVxuXG4gIGdldCBhY3RpdmUoKSB7XG4gICAgcmV0dXJuIHRoaXMuaWZBY3RpdmVTZXJ2aWNlLmN1cnJlbnQgPT09IHRoaXMuaWQ7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMudGFic1NlcnZpY2UudGFiQ29udGVudFZpZXdDb250YWluZXIuaW5kZXhPZih0aGlzLnZpZXdSZWYpO1xuICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICB0aGlzLnRhYnNTZXJ2aWNlLnRhYkNvbnRlbnRWaWV3Q29udGFpbmVyLnJlbW92ZShpbmRleCk7XG4gICAgfVxuICB9XG59XG4iXX0=