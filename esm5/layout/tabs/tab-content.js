/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
                    template: "\n        <ng-content></ng-content>\n    ",
                    host: {
                        '[id]': 'tabContentId',
                        '[attr.aria-labelledby]': 'ariaLabelledBy',
                        '[attr.aria-hidden]': '!active',
                        '[attr.aria-expanded]': 'active',
                        '[attr.data-hidden]': '!active',
                        role: 'tabpanel',
                    }
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
    /** @type {?} */
    ClrTabContent.prototype.ariaService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWNvbnRlbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJsYXlvdXQvdGFicy90YWItY29udGVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFLQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRixPQUFPLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQzFGLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7SUFFbkQsc0JBQXNCLEdBQVcsQ0FBQztBQUV0QztJQWlCRSx1QkFDUyxlQUFnQyxFQUNWLEVBQVUsRUFDL0IsV0FBd0I7UUFGekIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ1YsT0FBRSxHQUFGLEVBQUUsQ0FBUTtRQUMvQixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUVoQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUN0QixJQUFJLENBQUMsWUFBWSxHQUFHLGtCQUFrQixHQUFHLHNCQUFzQixFQUFFLENBQUM7U0FDbkU7SUFDSCxDQUFDO0lBRUQsc0JBQUkseUNBQWM7Ozs7UUFBbEI7WUFDRSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDO1FBQ3pDLENBQUM7OztPQUFBO0lBRUQsc0JBQUksdUNBQVk7Ozs7UUFBaEI7WUFDRSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDO1FBQ3ZDLENBQUM7Ozs7O1FBRUQsVUFDaUIsRUFBVTtZQUN6QixJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7UUFDckMsQ0FBQzs7O09BTEE7SUFPRCxzQkFBSSxpQ0FBTTs7OztRQUFWO1lBQ0UsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQ2xELENBQUM7OztPQUFBOztnQkExQ0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLFFBQVEsRUFBRSwyQ0FFUDtvQkFDSCxJQUFJLEVBQUU7d0JBQ0osTUFBTSxFQUFFLGNBQWM7d0JBQ3RCLHdCQUF3QixFQUFFLGdCQUFnQjt3QkFDMUMsb0JBQW9CLEVBQUUsU0FBUzt3QkFDL0Isc0JBQXNCLEVBQUUsUUFBUTt3QkFDaEMsb0JBQW9CLEVBQUUsU0FBUzt3QkFDL0IsSUFBSSxFQUFFLFVBQVU7cUJBQ2pCO2lCQUNGOzs7O2dCQWxCc0IsZUFBZTs2Q0F3QmpDLE1BQU0sU0FBQyxZQUFZO2dCQXZCZixXQUFXOzs7OEJBbUJqQixTQUFTLFNBQUMsd0JBQXdCOytCQW9CbEMsS0FBSyxTQUFDLElBQUk7O0lBUWIsb0JBQUM7Q0FBQSxBQTNDRCxJQTJDQztTQTdCWSxhQUFhOzs7SUFDeEIsb0NBQTZFOztJQUczRSx3Q0FBdUM7O0lBQ3ZDLDJCQUF1Qzs7SUFDdkMsb0NBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgQ29tcG9uZW50LCBJbmplY3QsIElucHV0LCBUZW1wbGF0ZVJlZiwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJRl9BQ1RJVkVfSUQsIElmQWN0aXZlU2VydmljZSB9IGZyb20gJy4uLy4uL3V0aWxzL2NvbmRpdGlvbmFsL2lmLWFjdGl2ZS5zZXJ2aWNlJztcbmltcG9ydCB7IEFyaWFTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvYXJpYS5zZXJ2aWNlJztcblxubGV0IG5iVGFiQ29udGVudENvbXBvbmVudHM6IG51bWJlciA9IDA7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci10YWItY29udGVudCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICBgLFxuICBob3N0OiB7XG4gICAgJ1tpZF0nOiAndGFiQ29udGVudElkJyxcbiAgICAnW2F0dHIuYXJpYS1sYWJlbGxlZGJ5XSc6ICdhcmlhTGFiZWxsZWRCeScsXG4gICAgJ1thdHRyLmFyaWEtaGlkZGVuXSc6ICchYWN0aXZlJyxcbiAgICAnW2F0dHIuYXJpYS1leHBhbmRlZF0nOiAnYWN0aXZlJyxcbiAgICAnW2F0dHIuZGF0YS1oaWRkZW5dJzogJyFhY3RpdmUnLFxuICAgIHJvbGU6ICd0YWJwYW5lbCcsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIENsclRhYkNvbnRlbnQge1xuICBAVmlld0NoaWxkKCd0YWJDb250ZW50UHJvamVjdGVkUmVmJykgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPENsclRhYkNvbnRlbnQ+O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBpZkFjdGl2ZVNlcnZpY2U6IElmQWN0aXZlU2VydmljZSxcbiAgICBASW5qZWN0KElGX0FDVElWRV9JRCkgcHVibGljIGlkOiBudW1iZXIsXG4gICAgcHJpdmF0ZSBhcmlhU2VydmljZTogQXJpYVNlcnZpY2VcbiAgKSB7XG4gICAgaWYgKCF0aGlzLnRhYkNvbnRlbnRJZCkge1xuICAgICAgdGhpcy50YWJDb250ZW50SWQgPSAnY2xyLXRhYi1jb250ZW50LScgKyBuYlRhYkNvbnRlbnRDb21wb25lbnRzKys7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGFyaWFMYWJlbGxlZEJ5KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuYXJpYVNlcnZpY2UuYXJpYUxhYmVsbGVkQnk7XG4gIH1cblxuICBnZXQgdGFiQ29udGVudElkKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuYXJpYVNlcnZpY2UuYXJpYUNvbnRyb2xzO1xuICB9XG5cbiAgQElucHV0KCdpZCcpXG4gIHNldCB0YWJDb250ZW50SWQoaWQ6IHN0cmluZykge1xuICAgIHRoaXMuYXJpYVNlcnZpY2UuYXJpYUNvbnRyb2xzID0gaWQ7XG4gIH1cblxuICBnZXQgYWN0aXZlKCkge1xuICAgIHJldHVybiB0aGlzLmlmQWN0aXZlU2VydmljZS5jdXJyZW50ID09PSB0aGlzLmlkO1xuICB9XG59XG4iXX0=