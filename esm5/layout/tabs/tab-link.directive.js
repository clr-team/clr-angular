/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { ComponentFactoryResolver, Directive, ElementRef, HostBinding, HostListener, Inject, Input, ViewContainerRef, } from '@angular/core';
import { IF_ACTIVE_ID, IfActiveService } from '../../utils/conditional/if-active.service';
import { TemplateRefContainer } from '../../utils/template-ref/template-ref-container';
import { TabsService } from './providers/tabs.service';
import { AriaService } from './providers/aria.service';
import { TABS_ID } from './tabs-id.provider';
import { TabsLayout } from './enums/tabs-layout.enum';
/** @type {?} */
var nbTabLinkComponents = 0;
var ClrTabLink = /** @class */ (function () {
    function ClrTabLink(ifActiveService, id, ariaService, el, cfr, viewContainerRef, tabsService, tabsId) {
        this.ifActiveService = ifActiveService;
        this.id = id;
        this.ariaService = ariaService;
        this.el = el;
        this.cfr = cfr;
        this.viewContainerRef = viewContainerRef;
        this.tabsService = tabsService;
        this.tabsId = tabsId;
        if (!this.tabLinkId) {
            this.tabLinkId = 'clr-tab-link-' + nbTabLinkComponents++;
        }
        // Tab links can be rendered in one of two places: in the main area or inside the overflow dropdown menu.
        // Here, we create a container so that its template can be used to create embeddedView on the fly.
        // See TabsService's renderView() method and how it's used in Tabs class for an example.
        /** @type {?} */
        var factory = this.cfr.resolveComponentFactory(TemplateRefContainer);
        this.templateRefContainer = this.viewContainerRef.createComponent(factory, 1, undefined, [
            [this.el.nativeElement],
        ]).instance;
    }
    Object.defineProperty(ClrTabLink.prototype, "inOverflow", {
        get: /**
         * @return {?}
         */
        function () {
            return this._inOverflow && this.tabsService.layout !== TabsLayout.VERTICAL;
        },
        set: /**
         * @param {?} inOverflow
         * @return {?}
         */
        function (inOverflow) {
            this._inOverflow = inOverflow;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTabLink.prototype, "addLinkClasses", {
        get: /**
         * @return {?}
         */
        function () {
            return !this.inOverflow;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTabLink.prototype, "ariaControls", {
        get: /**
         * @return {?}
         */
        function () {
            return this.ariaService.ariaControls;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTabLink.prototype, "tabLinkId", {
        get: /**
         * @return {?}
         */
        function () {
            return this.ariaService.ariaLabelledBy;
        },
        set: /**
         * @param {?} id
         * @return {?}
         */
        function (id) {
            this.ariaService.ariaLabelledBy = id;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ClrTabLink.prototype.activate = /**
     * @return {?}
     */
    function () {
        this.ifActiveService.current = this.id;
    };
    Object.defineProperty(ClrTabLink.prototype, "active", {
        get: /**
         * @return {?}
         */
        function () {
            return this.ifActiveService.current === this.id;
        },
        enumerable: true,
        configurable: true
    });
    ClrTabLink.decorators = [
        { type: Directive, args: [{
                    selector: '[clrTabLink]',
                    host: {
                        '[attr.aria-hidden]': 'false',
                        '[class.btn]': 'true',
                        role: 'tab',
                        type: 'button',
                    },
                },] }
    ];
    /** @nocollapse */
    ClrTabLink.ctorParameters = function () { return [
        { type: IfActiveService },
        { type: Number, decorators: [{ type: Inject, args: [IF_ACTIVE_ID,] }] },
        { type: AriaService },
        { type: ElementRef },
        { type: ComponentFactoryResolver },
        { type: ViewContainerRef },
        { type: TabsService },
        { type: Number, decorators: [{ type: Inject, args: [TABS_ID,] }] }
    ]; };
    ClrTabLink.propDecorators = {
        inOverflow: [{ type: Input, args: ['clrTabLinkInOverflow',] }],
        addLinkClasses: [{ type: HostBinding, args: ['class.btn-link',] }, { type: HostBinding, args: ['class.nav-link',] }],
        ariaControls: [{ type: HostBinding, args: ['attr.aria-controls',] }],
        tabLinkId: [{ type: HostBinding, args: ['id',] }, { type: Input, args: ['id',] }],
        activate: [{ type: HostListener, args: ['click',] }],
        active: [{ type: HostBinding, args: ['class.active',] }, { type: HostBinding, args: ['attr.aria-selected',] }]
    };
    return ClrTabLink;
}());
export { ClrTabLink };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ClrTabLink.prototype._inOverflow;
    /** @type {?} */
    ClrTabLink.prototype.templateRefContainer;
    /** @type {?} */
    ClrTabLink.prototype.ifActiveService;
    /**
     * @type {?}
     * @private
     */
    ClrTabLink.prototype.id;
    /**
     * @type {?}
     * @private
     */
    ClrTabLink.prototype.ariaService;
    /**
     * @type {?}
     * @private
     */
    ClrTabLink.prototype.el;
    /**
     * @type {?}
     * @private
     */
    ClrTabLink.prototype.cfr;
    /**
     * @type {?}
     * @private
     */
    ClrTabLink.prototype.viewContainerRef;
    /**
     * @type {?}
     * @private
     */
    ClrTabLink.prototype.tabsService;
    /** @type {?} */
    ClrTabLink.prototype.tabsId;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWxpbmsuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsibGF5b3V0L3RhYnMvdGFiLWxpbmsuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtBLE9BQU8sRUFDTCx3QkFBd0IsRUFDeEIsU0FBUyxFQUNULFVBQVUsRUFDVixXQUFXLEVBQ1gsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBQ0wsZ0JBQWdCLEdBQ2pCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsZUFBZSxFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDMUYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0saURBQWlELENBQUM7QUFDdkYsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRXZELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDN0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDBCQUEwQixDQUFDOztJQUVsRCxtQkFBbUIsR0FBVyxDQUFDO0FBRW5DO0lBNkJFLG9CQUNTLGVBQWdDLEVBQ1QsRUFBVSxFQUNoQyxXQUF3QixFQUN4QixFQUFjLEVBQ2QsR0FBNkIsRUFDN0IsZ0JBQWtDLEVBQ2xDLFdBQXdCLEVBQ1IsTUFBYztRQVAvQixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDVCxPQUFFLEdBQUYsRUFBRSxDQUFRO1FBQ2hDLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLE9BQUUsR0FBRixFQUFFLENBQVk7UUFDZCxRQUFHLEdBQUgsR0FBRyxDQUEwQjtRQUM3QixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ1IsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUV0QyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNuQixJQUFJLENBQUMsU0FBUyxHQUFHLGVBQWUsR0FBRyxtQkFBbUIsRUFBRSxDQUFDO1NBQzFEOzs7OztZQUtLLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLG9CQUFvQixDQUFDO1FBQ3RFLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFO1lBQ3ZGLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUM7U0FDeEIsQ0FBQyxDQUFDLFFBQVEsQ0FBQztJQUNkLENBQUM7SUF0Q0Qsc0JBQ0ksa0NBQVU7Ozs7UUFJZDtZQUNFLE9BQU8sSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sS0FBSyxVQUFVLENBQUMsUUFBUSxDQUFDO1FBQzdFLENBQUM7Ozs7O1FBUEQsVUFDZSxVQUFVO1lBQ3ZCLElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO1FBQ2hDLENBQUM7OztPQUFBO0lBTUQsc0JBRUksc0NBQWM7Ozs7UUFGbEI7WUFHRSxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUMxQixDQUFDOzs7T0FBQTtJQTJCRCxzQkFDSSxvQ0FBWTs7OztRQURoQjtZQUVFLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUM7UUFDdkMsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSxpQ0FBUzs7OztRQUFiO1lBQ0UsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQztRQUN6QyxDQUFDOzs7OztRQUVELFVBRWMsRUFBVTtZQUN0QixJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7UUFDdkMsQ0FBQzs7O09BTkE7Ozs7SUFTRCw2QkFBUTs7O0lBRFI7UUFFRSxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQ3pDLENBQUM7SUFFRCxzQkFFSSw4QkFBTTs7OztRQUZWO1lBR0UsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQ2xELENBQUM7OztPQUFBOztnQkE1RUYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxjQUFjO29CQUN4QixJQUFJLEVBQUU7d0JBQ0osb0JBQW9CLEVBQUUsT0FBTzt3QkFDN0IsYUFBYSxFQUFFLE1BQU07d0JBQ3JCLElBQUksRUFBRSxLQUFLO3dCQUNYLElBQUksRUFBRSxRQUFRO3FCQUNmO2lCQUNGOzs7O2dCQWxCc0IsZUFBZTs2Q0F5Q2pDLE1BQU0sU0FBQyxZQUFZO2dCQXJDZixXQUFXO2dCQVpsQixVQUFVO2dCQUZWLHdCQUF3QjtnQkFPeEIsZ0JBQWdCO2dCQUtULFdBQVc7NkNBNkNmLE1BQU0sU0FBQyxPQUFPOzs7NkJBekJoQixLQUFLLFNBQUMsc0JBQXNCO2lDQVM1QixXQUFXLFNBQUMsZ0JBQWdCLGNBQzVCLFdBQVcsU0FBQyxnQkFBZ0I7K0JBOEI1QixXQUFXLFNBQUMsb0JBQW9COzRCQVNoQyxXQUFXLFNBQUMsSUFBSSxjQUNoQixLQUFLLFNBQUMsSUFBSTsyQkFLVixZQUFZLFNBQUMsT0FBTzt5QkFLcEIsV0FBVyxTQUFDLGNBQWMsY0FDMUIsV0FBVyxTQUFDLG9CQUFvQjs7SUFJbkMsaUJBQUM7Q0FBQSxBQTdFRCxJQTZFQztTQXBFWSxVQUFVOzs7Ozs7SUFDckIsaUNBQTZCOztJQWlCN0IsMENBQTJDOztJQUd6QyxxQ0FBdUM7Ozs7O0lBQ3ZDLHdCQUF3Qzs7Ozs7SUFDeEMsaUNBQWdDOzs7OztJQUNoQyx3QkFBc0I7Ozs7O0lBQ3RCLHlCQUFxQzs7Ozs7SUFDckMsc0NBQTBDOzs7OztJQUMxQyxpQ0FBZ0M7O0lBQ2hDLDRCQUFzQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7XG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBIb3N0QmluZGluZyxcbiAgSG9zdExpc3RlbmVyLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBWaWV3Q29udGFpbmVyUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgSUZfQUNUSVZFX0lELCBJZkFjdGl2ZVNlcnZpY2UgfSBmcm9tICcuLi8uLi91dGlscy9jb25kaXRpb25hbC9pZi1hY3RpdmUuc2VydmljZSc7XG5pbXBvcnQgeyBUZW1wbGF0ZVJlZkNvbnRhaW5lciB9IGZyb20gJy4uLy4uL3V0aWxzL3RlbXBsYXRlLXJlZi90ZW1wbGF0ZS1yZWYtY29udGFpbmVyJztcbmltcG9ydCB7IFRhYnNTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvdGFicy5zZXJ2aWNlJztcblxuaW1wb3J0IHsgQXJpYVNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9hcmlhLnNlcnZpY2UnO1xuaW1wb3J0IHsgVEFCU19JRCB9IGZyb20gJy4vdGFicy1pZC5wcm92aWRlcic7XG5pbXBvcnQgeyBUYWJzTGF5b3V0IH0gZnJvbSAnLi9lbnVtcy90YWJzLWxheW91dC5lbnVtJztcblxubGV0IG5iVGFiTGlua0NvbXBvbmVudHM6IG51bWJlciA9IDA7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tjbHJUYWJMaW5rXScsXG4gIGhvc3Q6IHtcbiAgICAnW2F0dHIuYXJpYS1oaWRkZW5dJzogJ2ZhbHNlJyxcbiAgICAnW2NsYXNzLmJ0bl0nOiAndHJ1ZScsXG4gICAgcm9sZTogJ3RhYicsXG4gICAgdHlwZTogJ2J1dHRvbicsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIENsclRhYkxpbmsge1xuICBwcml2YXRlIF9pbk92ZXJmbG93OiBib29sZWFuO1xuXG4gIEBJbnB1dCgnY2xyVGFiTGlua0luT3ZlcmZsb3cnKVxuICBzZXQgaW5PdmVyZmxvdyhpbk92ZXJmbG93KSB7XG4gICAgdGhpcy5faW5PdmVyZmxvdyA9IGluT3ZlcmZsb3c7XG4gIH1cblxuICBnZXQgaW5PdmVyZmxvdygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faW5PdmVyZmxvdyAmJiB0aGlzLnRhYnNTZXJ2aWNlLmxheW91dCAhPT0gVGFic0xheW91dC5WRVJUSUNBTDtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuYnRuLWxpbmsnKVxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLm5hdi1saW5rJylcbiAgZ2V0IGFkZExpbmtDbGFzc2VzKCkge1xuICAgIHJldHVybiAhdGhpcy5pbk92ZXJmbG93O1xuICB9XG5cbiAgdGVtcGxhdGVSZWZDb250YWluZXI6IFRlbXBsYXRlUmVmQ29udGFpbmVyO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBpZkFjdGl2ZVNlcnZpY2U6IElmQWN0aXZlU2VydmljZSxcbiAgICBASW5qZWN0KElGX0FDVElWRV9JRCkgcHJpdmF0ZSBpZDogbnVtYmVyLFxuICAgIHByaXZhdGUgYXJpYVNlcnZpY2U6IEFyaWFTZXJ2aWNlLFxuICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBjZnI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBwcml2YXRlIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgcHJpdmF0ZSB0YWJzU2VydmljZTogVGFic1NlcnZpY2UsXG4gICAgQEluamVjdChUQUJTX0lEKSBwdWJsaWMgdGFic0lkOiBudW1iZXJcbiAgKSB7XG4gICAgaWYgKCF0aGlzLnRhYkxpbmtJZCkge1xuICAgICAgdGhpcy50YWJMaW5rSWQgPSAnY2xyLXRhYi1saW5rLScgKyBuYlRhYkxpbmtDb21wb25lbnRzKys7XG4gICAgfVxuXG4gICAgLy8gVGFiIGxpbmtzIGNhbiBiZSByZW5kZXJlZCBpbiBvbmUgb2YgdHdvIHBsYWNlczogaW4gdGhlIG1haW4gYXJlYSBvciBpbnNpZGUgdGhlIG92ZXJmbG93IGRyb3Bkb3duIG1lbnUuXG4gICAgLy8gSGVyZSwgd2UgY3JlYXRlIGEgY29udGFpbmVyIHNvIHRoYXQgaXRzIHRlbXBsYXRlIGNhbiBiZSB1c2VkIHRvIGNyZWF0ZSBlbWJlZGRlZFZpZXcgb24gdGhlIGZseS5cbiAgICAvLyBTZWUgVGFic1NlcnZpY2UncyByZW5kZXJWaWV3KCkgbWV0aG9kIGFuZCBob3cgaXQncyB1c2VkIGluIFRhYnMgY2xhc3MgZm9yIGFuIGV4YW1wbGUuXG4gICAgY29uc3QgZmFjdG9yeSA9IHRoaXMuY2ZyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KFRlbXBsYXRlUmVmQ29udGFpbmVyKTtcbiAgICB0aGlzLnRlbXBsYXRlUmVmQ29udGFpbmVyID0gdGhpcy52aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUNvbXBvbmVudChmYWN0b3J5LCAxLCB1bmRlZmluZWQsIFtcbiAgICAgIFt0aGlzLmVsLm5hdGl2ZUVsZW1lbnRdLFxuICAgIF0pLmluc3RhbmNlO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmFyaWEtY29udHJvbHMnKVxuICBnZXQgYXJpYUNvbnRyb2xzKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuYXJpYVNlcnZpY2UuYXJpYUNvbnRyb2xzO1xuICB9XG5cbiAgZ2V0IHRhYkxpbmtJZCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmFyaWFTZXJ2aWNlLmFyaWFMYWJlbGxlZEJ5O1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdpZCcpXG4gIEBJbnB1dCgnaWQnKVxuICBzZXQgdGFiTGlua0lkKGlkOiBzdHJpbmcpIHtcbiAgICB0aGlzLmFyaWFTZXJ2aWNlLmFyaWFMYWJlbGxlZEJ5ID0gaWQ7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdjbGljaycpXG4gIGFjdGl2YXRlKCkge1xuICAgIHRoaXMuaWZBY3RpdmVTZXJ2aWNlLmN1cnJlbnQgPSB0aGlzLmlkO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5hY3RpdmUnKVxuICBASG9zdEJpbmRpbmcoJ2F0dHIuYXJpYS1zZWxlY3RlZCcpXG4gIGdldCBhY3RpdmUoKSB7XG4gICAgcmV0dXJuIHRoaXMuaWZBY3RpdmVTZXJ2aWNlLmN1cnJlbnQgPT09IHRoaXMuaWQ7XG4gIH1cbn1cbiJdfQ==