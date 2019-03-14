/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
let nbTabLinkComponents = 0;
export class ClrTabLink {
    /**
     * @param {?} ifActiveService
     * @param {?} id
     * @param {?} ariaService
     * @param {?} el
     * @param {?} cfr
     * @param {?} viewContainerRef
     * @param {?} tabsService
     * @param {?} tabsId
     */
    constructor(ifActiveService, id, ariaService, el, cfr, viewContainerRef, tabsService, tabsId) {
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
        const factory = this.cfr.resolveComponentFactory(TemplateRefContainer);
        this.templateRefContainer = this.viewContainerRef.createComponent(factory, 1, undefined, [
            [this.el.nativeElement],
        ]).instance;
    }
    /**
     * @param {?} inOverflow
     * @return {?}
     */
    set inOverflow(inOverflow) {
        this._inOverflow = inOverflow;
    }
    /**
     * @return {?}
     */
    get inOverflow() {
        return this._inOverflow && this.tabsService.layout !== TabsLayout.VERTICAL;
    }
    /**
     * @return {?}
     */
    get addLinkClasses() {
        return !this.inOverflow;
    }
    /**
     * @return {?}
     */
    get ariaControls() {
        return this.ariaService.ariaControls;
    }
    /**
     * @return {?}
     */
    get tabLinkId() {
        return this.ariaService.ariaLabelledBy;
    }
    /**
     * @param {?} id
     * @return {?}
     */
    set tabLinkId(id) {
        this.ariaService.ariaLabelledBy = id;
    }
    /**
     * @return {?}
     */
    activate() {
        this.ifActiveService.current = this.id;
    }
    /**
     * @return {?}
     */
    get active() {
        return this.ifActiveService.current === this.id;
    }
}
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
ClrTabLink.ctorParameters = () => [
    { type: IfActiveService },
    { type: Number, decorators: [{ type: Inject, args: [IF_ACTIVE_ID,] }] },
    { type: AriaService },
    { type: ElementRef },
    { type: ComponentFactoryResolver },
    { type: ViewContainerRef },
    { type: TabsService },
    { type: Number, decorators: [{ type: Inject, args: [TABS_ID,] }] }
];
ClrTabLink.propDecorators = {
    inOverflow: [{ type: Input, args: ['clrTabLinkInOverflow',] }],
    addLinkClasses: [{ type: HostBinding, args: ['class.btn-link',] }, { type: HostBinding, args: ['class.nav-link',] }],
    ariaControls: [{ type: HostBinding, args: ['attr.aria-controls',] }],
    tabLinkId: [{ type: HostBinding, args: ['id',] }, { type: Input, args: ['id',] }],
    activate: [{ type: HostListener, args: ['click',] }],
    active: [{ type: HostBinding, args: ['class.active',] }, { type: HostBinding, args: ['attr.aria-selected',] }]
};
if (false) {
    /** @type {?} */
    ClrTabLink.prototype._inOverflow;
    /** @type {?} */
    ClrTabLink.prototype.templateRefContainer;
    /** @type {?} */
    ClrTabLink.prototype.ifActiveService;
    /** @type {?} */
    ClrTabLink.prototype.id;
    /** @type {?} */
    ClrTabLink.prototype.ariaService;
    /** @type {?} */
    ClrTabLink.prototype.el;
    /** @type {?} */
    ClrTabLink.prototype.cfr;
    /** @type {?} */
    ClrTabLink.prototype.viewContainerRef;
    /** @type {?} */
    ClrTabLink.prototype.tabsService;
    /** @type {?} */
    ClrTabLink.prototype.tabsId;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWxpbmsuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsibGF5b3V0L3RhYnMvdGFiLWxpbmsuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtBLE9BQU8sRUFDTCx3QkFBd0IsRUFDeEIsU0FBUyxFQUNULFVBQVUsRUFDVixXQUFXLEVBQ1gsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBQ0wsZ0JBQWdCLEdBQ2pCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsZUFBZSxFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDMUYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0saURBQWlELENBQUM7QUFDdkYsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRXZELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDN0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDBCQUEwQixDQUFDOztJQUVsRCxtQkFBbUIsR0FBVyxDQUFDO0FBV25DLE1BQU0sT0FBTyxVQUFVOzs7Ozs7Ozs7OztJQW9CckIsWUFDUyxlQUFnQyxFQUNULEVBQVUsRUFDaEMsV0FBd0IsRUFDeEIsRUFBYyxFQUNkLEdBQTZCLEVBQzdCLGdCQUFrQyxFQUNsQyxXQUF3QixFQUNSLE1BQWM7UUFQL0Isb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ1QsT0FBRSxHQUFGLEVBQUUsQ0FBUTtRQUNoQyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQ2QsUUFBRyxHQUFILEdBQUcsQ0FBMEI7UUFDN0IscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUNSLFdBQU0sR0FBTixNQUFNLENBQVE7UUFFdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxlQUFlLEdBQUcsbUJBQW1CLEVBQUUsQ0FBQztTQUMxRDs7Ozs7Y0FLSyxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxvQkFBb0IsQ0FBQztRQUN0RSxJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRTtZQUN2RixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDO1NBQ3hCLENBQUMsQ0FBQyxRQUFRLENBQUM7SUFDZCxDQUFDOzs7OztJQXRDRCxJQUNJLFVBQVUsQ0FBQyxVQUFVO1FBQ3ZCLElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO0lBQ2hDLENBQUM7Ozs7SUFFRCxJQUFJLFVBQVU7UUFDWixPQUFPLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEtBQUssVUFBVSxDQUFDLFFBQVEsQ0FBQztJQUM3RSxDQUFDOzs7O0lBRUQsSUFFSSxjQUFjO1FBQ2hCLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQzFCLENBQUM7Ozs7SUEyQkQsSUFDSSxZQUFZO1FBQ2QsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQztJQUN2QyxDQUFDOzs7O0lBRUQsSUFBSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQztJQUN6QyxDQUFDOzs7OztJQUVELElBRUksU0FBUyxDQUFDLEVBQVU7UUFDdEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO0lBQ3ZDLENBQUM7Ozs7SUFHRCxRQUFRO1FBQ04sSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUN6QyxDQUFDOzs7O0lBRUQsSUFFSSxNQUFNO1FBQ1IsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQ2xELENBQUM7OztZQTVFRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGNBQWM7Z0JBQ3hCLElBQUksRUFBRTtvQkFDSixvQkFBb0IsRUFBRSxPQUFPO29CQUM3QixhQUFhLEVBQUUsTUFBTTtvQkFDckIsSUFBSSxFQUFFLEtBQUs7b0JBQ1gsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7YUFDRjs7OztZQWxCc0IsZUFBZTt5Q0F5Q2pDLE1BQU0sU0FBQyxZQUFZO1lBckNmLFdBQVc7WUFabEIsVUFBVTtZQUZWLHdCQUF3QjtZQU94QixnQkFBZ0I7WUFLVCxXQUFXO3lDQTZDZixNQUFNLFNBQUMsT0FBTzs7O3lCQXpCaEIsS0FBSyxTQUFDLHNCQUFzQjs2QkFTNUIsV0FBVyxTQUFDLGdCQUFnQixjQUM1QixXQUFXLFNBQUMsZ0JBQWdCOzJCQThCNUIsV0FBVyxTQUFDLG9CQUFvQjt3QkFTaEMsV0FBVyxTQUFDLElBQUksY0FDaEIsS0FBSyxTQUFDLElBQUk7dUJBS1YsWUFBWSxTQUFDLE9BQU87cUJBS3BCLFdBQVcsU0FBQyxjQUFjLGNBQzFCLFdBQVcsU0FBQyxvQkFBb0I7Ozs7SUEvRGpDLGlDQUE2Qjs7SUFpQjdCLDBDQUEyQzs7SUFHekMscUNBQXVDOztJQUN2Qyx3QkFBd0M7O0lBQ3hDLGlDQUFnQzs7SUFDaEMsd0JBQXNCOztJQUN0Qix5QkFBcUM7O0lBQ3JDLHNDQUEwQzs7SUFDMUMsaUNBQWdDOztJQUNoQyw0QkFBc0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQge1xuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgSG9zdEJpbmRpbmcsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgVmlld0NvbnRhaW5lclJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IElGX0FDVElWRV9JRCwgSWZBY3RpdmVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vdXRpbHMvY29uZGl0aW9uYWwvaWYtYWN0aXZlLnNlcnZpY2UnO1xuaW1wb3J0IHsgVGVtcGxhdGVSZWZDb250YWluZXIgfSBmcm9tICcuLi8uLi91dGlscy90ZW1wbGF0ZS1yZWYvdGVtcGxhdGUtcmVmLWNvbnRhaW5lcic7XG5pbXBvcnQgeyBUYWJzU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL3RhYnMuc2VydmljZSc7XG5cbmltcG9ydCB7IEFyaWFTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvYXJpYS5zZXJ2aWNlJztcbmltcG9ydCB7IFRBQlNfSUQgfSBmcm9tICcuL3RhYnMtaWQucHJvdmlkZXInO1xuaW1wb3J0IHsgVGFic0xheW91dCB9IGZyb20gJy4vZW51bXMvdGFicy1sYXlvdXQuZW51bSc7XG5cbmxldCBuYlRhYkxpbmtDb21wb25lbnRzOiBudW1iZXIgPSAwO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbY2xyVGFiTGlua10nLFxuICBob3N0OiB7XG4gICAgJ1thdHRyLmFyaWEtaGlkZGVuXSc6ICdmYWxzZScsXG4gICAgJ1tjbGFzcy5idG5dJzogJ3RydWUnLFxuICAgIHJvbGU6ICd0YWInLFxuICAgIHR5cGU6ICdidXR0b24nLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBDbHJUYWJMaW5rIHtcbiAgcHJpdmF0ZSBfaW5PdmVyZmxvdzogYm9vbGVhbjtcblxuICBASW5wdXQoJ2NsclRhYkxpbmtJbk92ZXJmbG93JylcbiAgc2V0IGluT3ZlcmZsb3coaW5PdmVyZmxvdykge1xuICAgIHRoaXMuX2luT3ZlcmZsb3cgPSBpbk92ZXJmbG93O1xuICB9XG5cbiAgZ2V0IGluT3ZlcmZsb3coKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2luT3ZlcmZsb3cgJiYgdGhpcy50YWJzU2VydmljZS5sYXlvdXQgIT09IFRhYnNMYXlvdXQuVkVSVElDQUw7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmJ0bi1saW5rJylcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5uYXYtbGluaycpXG4gIGdldCBhZGRMaW5rQ2xhc3NlcygpIHtcbiAgICByZXR1cm4gIXRoaXMuaW5PdmVyZmxvdztcbiAgfVxuXG4gIHRlbXBsYXRlUmVmQ29udGFpbmVyOiBUZW1wbGF0ZVJlZkNvbnRhaW5lcjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgaWZBY3RpdmVTZXJ2aWNlOiBJZkFjdGl2ZVNlcnZpY2UsXG4gICAgQEluamVjdChJRl9BQ1RJVkVfSUQpIHByaXZhdGUgaWQ6IG51bWJlcixcbiAgICBwcml2YXRlIGFyaWFTZXJ2aWNlOiBBcmlhU2VydmljZSxcbiAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgY2ZyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgcHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIHByaXZhdGUgdGFic1NlcnZpY2U6IFRhYnNTZXJ2aWNlLFxuICAgIEBJbmplY3QoVEFCU19JRCkgcHVibGljIHRhYnNJZDogbnVtYmVyXG4gICkge1xuICAgIGlmICghdGhpcy50YWJMaW5rSWQpIHtcbiAgICAgIHRoaXMudGFiTGlua0lkID0gJ2Nsci10YWItbGluay0nICsgbmJUYWJMaW5rQ29tcG9uZW50cysrO1xuICAgIH1cblxuICAgIC8vIFRhYiBsaW5rcyBjYW4gYmUgcmVuZGVyZWQgaW4gb25lIG9mIHR3byBwbGFjZXM6IGluIHRoZSBtYWluIGFyZWEgb3IgaW5zaWRlIHRoZSBvdmVyZmxvdyBkcm9wZG93biBtZW51LlxuICAgIC8vIEhlcmUsIHdlIGNyZWF0ZSBhIGNvbnRhaW5lciBzbyB0aGF0IGl0cyB0ZW1wbGF0ZSBjYW4gYmUgdXNlZCB0byBjcmVhdGUgZW1iZWRkZWRWaWV3IG9uIHRoZSBmbHkuXG4gICAgLy8gU2VlIFRhYnNTZXJ2aWNlJ3MgcmVuZGVyVmlldygpIG1ldGhvZCBhbmQgaG93IGl0J3MgdXNlZCBpbiBUYWJzIGNsYXNzIGZvciBhbiBleGFtcGxlLlxuICAgIGNvbnN0IGZhY3RvcnkgPSB0aGlzLmNmci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShUZW1wbGF0ZVJlZkNvbnRhaW5lcik7XG4gICAgdGhpcy50ZW1wbGF0ZVJlZkNvbnRhaW5lciA9IHRoaXMudmlld0NvbnRhaW5lclJlZi5jcmVhdGVDb21wb25lbnQoZmFjdG9yeSwgMSwgdW5kZWZpbmVkLCBbXG4gICAgICBbdGhpcy5lbC5uYXRpdmVFbGVtZW50XSxcbiAgICBdKS5pbnN0YW5jZTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnYXR0ci5hcmlhLWNvbnRyb2xzJylcbiAgZ2V0IGFyaWFDb250cm9scygpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmFyaWFTZXJ2aWNlLmFyaWFDb250cm9scztcbiAgfVxuXG4gIGdldCB0YWJMaW5rSWQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5hcmlhU2VydmljZS5hcmlhTGFiZWxsZWRCeTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnaWQnKVxuICBASW5wdXQoJ2lkJylcbiAgc2V0IHRhYkxpbmtJZChpZDogc3RyaW5nKSB7XG4gICAgdGhpcy5hcmlhU2VydmljZS5hcmlhTGFiZWxsZWRCeSA9IGlkO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICBhY3RpdmF0ZSgpIHtcbiAgICB0aGlzLmlmQWN0aXZlU2VydmljZS5jdXJyZW50ID0gdGhpcy5pZDtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuYWN0aXZlJylcbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmFyaWEtc2VsZWN0ZWQnKVxuICBnZXQgYWN0aXZlKCkge1xuICAgIHJldHVybiB0aGlzLmlmQWN0aXZlU2VydmljZS5jdXJyZW50ID09PSB0aGlzLmlkO1xuICB9XG59XG4iXX0=