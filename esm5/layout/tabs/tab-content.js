/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, Inject, Input, TemplateRef, ViewChild } from '@angular/core';
import { IF_ACTIVE_ID, IfActiveService } from '../../utils/conditional/if-active.service';
import { AriaService } from './providers/aria.service';
/** @type {?} */
var nbTabContentComponents = 0;
var ClrTabContent = /** @class */ (function () {
    function ClrTabContent(ifActiveService, id, ariaService) {
        this.ifActiveService = ifActiveService;
        this.id = id;
        this.ariaService = ariaService;
        if (!this.tabContentId) {
            this.tabContentId = 'clr-tab-content-' + nbTabContentComponents++;
        }
    }
    Object.defineProperty(ClrTabContent.prototype, "ariaLabelledBy", {
        get: /**
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
        { type: AriaService }
    ]; };
    ClrTabContent.propDecorators = {
        templateRef: [{ type: ViewChild, args: ['tabContentProjectedRef',] }],
        tabContentId: [{ type: Input, args: ['id',] }]
    };
    return ClrTabContent;
}());
export { ClrTabContent };
if (false) {
    /** @type {?} */
    ClrTabContent.prototype.templateRef;
    /** @type {?} */
    ClrTabContent.prototype.ifActiveService;
    /** @type {?} */
    ClrTabContent.prototype.id;
    /**
     * @type {?}
     * @private
     */
    ClrTabContent.prototype.ariaService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWNvbnRlbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJsYXlvdXQvdGFicy90YWItY29udGVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFLQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRixPQUFPLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQzFGLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7SUFFbkQsc0JBQXNCLEdBQVcsQ0FBQztBQUV0QztJQWlCRSx1QkFDUyxlQUFnQyxFQUNWLEVBQVUsRUFDL0IsV0FBd0I7UUFGekIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ1YsT0FBRSxHQUFGLEVBQUUsQ0FBUTtRQUMvQixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUVoQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUN0QixJQUFJLENBQUMsWUFBWSxHQUFHLGtCQUFrQixHQUFHLHNCQUFzQixFQUFFLENBQUM7U0FDbkU7SUFDSCxDQUFDO0lBRUQsc0JBQUkseUNBQWM7Ozs7UUFBbEI7WUFDRSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDO1FBQ3pDLENBQUM7OztPQUFBO0lBRUQsc0JBQUksdUNBQVk7Ozs7UUFBaEI7WUFDRSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDO1FBQ3ZDLENBQUM7Ozs7O1FBRUQsVUFDaUIsRUFBVTtZQUN6QixJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7UUFDckMsQ0FBQzs7O09BTEE7SUFPRCxzQkFBSSxpQ0FBTTs7OztRQUFWO1lBQ0UsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQ2xELENBQUM7OztPQUFBOztnQkExQ0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLFFBQVEsRUFBRSxtYUFVUDtpQkFDSjs7OztnQkFsQnNCLGVBQWU7NkNBd0JqQyxNQUFNLFNBQUMsWUFBWTtnQkF2QmYsV0FBVzs7OzhCQW1CakIsU0FBUyxTQUFDLHdCQUF3QjsrQkFvQmxDLEtBQUssU0FBQyxJQUFJOztJQVFiLG9CQUFDO0NBQUEsQUEzQ0QsSUEyQ0M7U0E3QlksYUFBYTs7O0lBQ3hCLG9DQUE2RTs7SUFHM0Usd0NBQXVDOztJQUN2QywyQkFBdUM7Ozs7O0lBQ3ZDLG9DQUFnQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IENvbXBvbmVudCwgSW5qZWN0LCBJbnB1dCwgVGVtcGxhdGVSZWYsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSUZfQUNUSVZFX0lELCBJZkFjdGl2ZVNlcnZpY2UgfSBmcm9tICcuLi8uLi91dGlscy9jb25kaXRpb25hbC9pZi1hY3RpdmUuc2VydmljZSc7XG5pbXBvcnQgeyBBcmlhU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2FyaWEuc2VydmljZSc7XG5cbmxldCBuYlRhYkNvbnRlbnRDb21wb25lbnRzOiBudW1iZXIgPSAwO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItdGFiLWNvbnRlbnQnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy10ZW1wbGF0ZSAjdGFiQ29udGVudFByb2plY3RlZFJlZj5cbiAgICAgIDxzZWN0aW9uIFtpZF09XCJ0YWJDb250ZW50SWRcIiByb2xlPVwidGFicGFuZWxcIiBjbGFzcz1cInRhYi1jb250ZW50XCIgW2NsYXNzLmFjdGl2ZV09XCJhY3RpdmVcIlxuICAgICAgICAgICAgICAgW2hpZGRlbl09XCIhYWN0aXZlXCJcbiAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxsZWRieV09XCJhcmlhTGFiZWxsZWRCeVwiXG4gICAgICAgICAgICAgICBbYXR0ci5hcmlhLWV4cGFuZGVkXT1cImFjdGl2ZVwiXG4gICAgICAgICAgICAgICBbYXR0ci5hcmlhLWhpZGRlbl09XCIhYWN0aXZlXCI+XG4gICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgIDwvc2VjdGlvbj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIGAsXG59KVxuZXhwb3J0IGNsYXNzIENsclRhYkNvbnRlbnQge1xuICBAVmlld0NoaWxkKCd0YWJDb250ZW50UHJvamVjdGVkUmVmJykgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPENsclRhYkNvbnRlbnQ+O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBpZkFjdGl2ZVNlcnZpY2U6IElmQWN0aXZlU2VydmljZSxcbiAgICBASW5qZWN0KElGX0FDVElWRV9JRCkgcHVibGljIGlkOiBudW1iZXIsXG4gICAgcHJpdmF0ZSBhcmlhU2VydmljZTogQXJpYVNlcnZpY2VcbiAgKSB7XG4gICAgaWYgKCF0aGlzLnRhYkNvbnRlbnRJZCkge1xuICAgICAgdGhpcy50YWJDb250ZW50SWQgPSAnY2xyLXRhYi1jb250ZW50LScgKyBuYlRhYkNvbnRlbnRDb21wb25lbnRzKys7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGFyaWFMYWJlbGxlZEJ5KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuYXJpYVNlcnZpY2UuYXJpYUxhYmVsbGVkQnk7XG4gIH1cblxuICBnZXQgdGFiQ29udGVudElkKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuYXJpYVNlcnZpY2UuYXJpYUNvbnRyb2xzO1xuICB9XG5cbiAgQElucHV0KCdpZCcpXG4gIHNldCB0YWJDb250ZW50SWQoaWQ6IHN0cmluZykge1xuICAgIHRoaXMuYXJpYVNlcnZpY2UuYXJpYUNvbnRyb2xzID0gaWQ7XG4gIH1cblxuICBnZXQgYWN0aXZlKCkge1xuICAgIHJldHVybiB0aGlzLmlmQWN0aXZlU2VydmljZS5jdXJyZW50ID09PSB0aGlzLmlkO1xuICB9XG59XG4iXX0=