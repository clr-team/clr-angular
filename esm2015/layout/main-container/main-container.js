/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive, ElementRef } from '@angular/core';
import { ResponsiveNavigationService } from '../nav/providers/responsive-navigation.service';
import { ResponsiveNavCodes } from '../nav/responsive-nav-codes';
export class ClrMainContainer {
    /**
     * @param {?} elRef
     * @param {?} responsiveNavService
     */
    constructor(elRef, responsiveNavService) {
        this.elRef = elRef;
        this.responsiveNavService = responsiveNavService;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._classList = this.elRef.nativeElement.classList;
        this._subscription = this.responsiveNavService.navControl.subscribe({
            next: (/**
             * @param {?} message
             * @return {?}
             */
            (message) => {
                this.processMessage(message);
            }),
        });
    }
    /**
     * @param {?} message
     * @return {?}
     */
    processMessage(message) {
        /** @type {?} */
        let navClass = ResponsiveNavCodes.NAV_CLASS_HAMBURGER_MENU;
        if (message.controlCode === ResponsiveNavCodes.NAV_CLOSE_ALL) {
            this._classList.remove(ResponsiveNavCodes.NAV_CLASS_HAMBURGER_MENU);
            this._classList.remove(ResponsiveNavCodes.NAV_CLASS_OVERFLOW_MENU);
        }
        else if (message.navLevel === ResponsiveNavCodes.NAV_LEVEL_1) {
            this.controlNav(message.controlCode, navClass);
        }
        else if (message.navLevel === ResponsiveNavCodes.NAV_LEVEL_2) {
            navClass = ResponsiveNavCodes.NAV_CLASS_OVERFLOW_MENU;
            this.controlNav(message.controlCode, navClass);
        }
    }
    /**
     * @param {?} controlCode
     * @param {?} navClass
     * @return {?}
     */
    controlNav(controlCode, navClass) {
        if (controlCode === ResponsiveNavCodes.NAV_OPEN) {
            this._classList.add(navClass);
        }
        else if (controlCode === ResponsiveNavCodes.NAV_CLOSE) {
            this._classList.remove(navClass);
        }
        else if (controlCode === ResponsiveNavCodes.NAV_TOGGLE) {
            this._classList.toggle(navClass);
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
}
ClrMainContainer.decorators = [
    { type: Directive, args: [{ selector: 'clr-main-container', host: { '[class.main-container]': 'true' } },] }
];
/** @nocollapse */
ClrMainContainer.ctorParameters = () => [
    { type: ElementRef },
    { type: ResponsiveNavigationService }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    ClrMainContainer.prototype._subscription;
    /**
     * @type {?}
     * @private
     */
    ClrMainContainer.prototype._classList;
    /**
     * @type {?}
     * @private
     */
    ClrMainContainer.prototype.elRef;
    /**
     * @type {?}
     * @private
     */
    ClrMainContainer.prototype.responsiveNavService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1jb250YWluZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJsYXlvdXQvbWFpbi1jb250YWluZXIvbWFpbi1jb250YWluZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQXFCLE1BQU0sZUFBZSxDQUFDO0FBR3pFLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLGdEQUFnRCxDQUFDO0FBQzdGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBSWpFLE1BQU0sT0FBTyxnQkFBZ0I7Ozs7O0lBSTNCLFlBQW9CLEtBQWlCLEVBQVUsb0JBQWlEO1FBQTVFLFVBQUssR0FBTCxLQUFLLENBQVk7UUFBVSx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQTZCO0lBQUcsQ0FBQzs7OztJQUVwRyxRQUFRO1FBQ04sSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUM7UUFDckQsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQztZQUNsRSxJQUFJOzs7O1lBQUUsQ0FBQyxPQUFvQyxFQUFFLEVBQUU7Z0JBQzdDLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDL0IsQ0FBQyxDQUFBO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7SUFFRCxjQUFjLENBQUMsT0FBb0M7O1lBQzdDLFFBQVEsR0FBVyxrQkFBa0IsQ0FBQyx3QkFBd0I7UUFDbEUsSUFBSSxPQUFPLENBQUMsV0FBVyxLQUFLLGtCQUFrQixDQUFDLGFBQWEsRUFBRTtZQUM1RCxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1lBQ3BFLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLHVCQUF1QixDQUFDLENBQUM7U0FDcEU7YUFBTSxJQUFJLE9BQU8sQ0FBQyxRQUFRLEtBQUssa0JBQWtCLENBQUMsV0FBVyxFQUFFO1lBQzlELElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsQ0FBQztTQUNoRDthQUFNLElBQUksT0FBTyxDQUFDLFFBQVEsS0FBSyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUU7WUFDOUQsUUFBUSxHQUFHLGtCQUFrQixDQUFDLHVCQUF1QixDQUFDO1lBQ3RELElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsQ0FBQztTQUNoRDtJQUNILENBQUM7Ozs7OztJQUVELFVBQVUsQ0FBQyxXQUFtQixFQUFFLFFBQWdCO1FBQzlDLElBQUksV0FBVyxLQUFLLGtCQUFrQixDQUFDLFFBQVEsRUFBRTtZQUMvQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUMvQjthQUFNLElBQUksV0FBVyxLQUFLLGtCQUFrQixDQUFDLFNBQVMsRUFBRTtZQUN2RCxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNsQzthQUFNLElBQUksV0FBVyxLQUFLLGtCQUFrQixDQUFDLFVBQVUsRUFBRTtZQUN4RCxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNsQztJQUNILENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNuQyxDQUFDOzs7WUF6Q0YsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLG9CQUFvQixFQUFFLElBQUksRUFBRSxFQUFFLHdCQUF3QixFQUFFLE1BQU0sRUFBRSxFQUFFOzs7O1lBUHJFLFVBQVU7WUFHckIsMkJBQTJCOzs7Ozs7O0lBTWxDLHlDQUFvQzs7Ozs7SUFDcEMsc0NBQWlDOzs7OztJQUVyQixpQ0FBeUI7Ozs7O0lBQUUsZ0RBQXlEIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IFJlc3BvbnNpdmVOYXZpZ2F0aW9uU2VydmljZSB9IGZyb20gJy4uL25hdi9wcm92aWRlcnMvcmVzcG9uc2l2ZS1uYXZpZ2F0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVzcG9uc2l2ZU5hdkNvZGVzIH0gZnJvbSAnLi4vbmF2L3Jlc3BvbnNpdmUtbmF2LWNvZGVzJztcbmltcG9ydCB7IFJlc3BvbnNpdmVOYXZDb250cm9sTWVzc2FnZSB9IGZyb20gJy4uL25hdi9yZXNwb25zaXZlLW5hdi1jb250cm9sLW1lc3NhZ2UnO1xuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdjbHItbWFpbi1jb250YWluZXInLCBob3N0OiB7ICdbY2xhc3MubWFpbi1jb250YWluZXJdJzogJ3RydWUnIH0gfSlcbmV4cG9ydCBjbGFzcyBDbHJNYWluQ29udGFpbmVyIGltcGxlbWVudHMgT25EZXN0cm95LCBPbkluaXQge1xuICBwcml2YXRlIF9zdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBfY2xhc3NMaXN0OiBET01Ub2tlbkxpc3Q7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbFJlZjogRWxlbWVudFJlZiwgcHJpdmF0ZSByZXNwb25zaXZlTmF2U2VydmljZTogUmVzcG9uc2l2ZU5hdmlnYXRpb25TZXJ2aWNlKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuX2NsYXNzTGlzdCA9IHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3Q7XG4gICAgdGhpcy5fc3Vic2NyaXB0aW9uID0gdGhpcy5yZXNwb25zaXZlTmF2U2VydmljZS5uYXZDb250cm9sLnN1YnNjcmliZSh7XG4gICAgICBuZXh0OiAobWVzc2FnZTogUmVzcG9uc2l2ZU5hdkNvbnRyb2xNZXNzYWdlKSA9PiB7XG4gICAgICAgIHRoaXMucHJvY2Vzc01lc3NhZ2UobWVzc2FnZSk7XG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgcHJvY2Vzc01lc3NhZ2UobWVzc2FnZTogUmVzcG9uc2l2ZU5hdkNvbnRyb2xNZXNzYWdlKTogdm9pZCB7XG4gICAgbGV0IG5hdkNsYXNzOiBzdHJpbmcgPSBSZXNwb25zaXZlTmF2Q29kZXMuTkFWX0NMQVNTX0hBTUJVUkdFUl9NRU5VO1xuICAgIGlmIChtZXNzYWdlLmNvbnRyb2xDb2RlID09PSBSZXNwb25zaXZlTmF2Q29kZXMuTkFWX0NMT1NFX0FMTCkge1xuICAgICAgdGhpcy5fY2xhc3NMaXN0LnJlbW92ZShSZXNwb25zaXZlTmF2Q29kZXMuTkFWX0NMQVNTX0hBTUJVUkdFUl9NRU5VKTtcbiAgICAgIHRoaXMuX2NsYXNzTGlzdC5yZW1vdmUoUmVzcG9uc2l2ZU5hdkNvZGVzLk5BVl9DTEFTU19PVkVSRkxPV19NRU5VKTtcbiAgICB9IGVsc2UgaWYgKG1lc3NhZ2UubmF2TGV2ZWwgPT09IFJlc3BvbnNpdmVOYXZDb2Rlcy5OQVZfTEVWRUxfMSkge1xuICAgICAgdGhpcy5jb250cm9sTmF2KG1lc3NhZ2UuY29udHJvbENvZGUsIG5hdkNsYXNzKTtcbiAgICB9IGVsc2UgaWYgKG1lc3NhZ2UubmF2TGV2ZWwgPT09IFJlc3BvbnNpdmVOYXZDb2Rlcy5OQVZfTEVWRUxfMikge1xuICAgICAgbmF2Q2xhc3MgPSBSZXNwb25zaXZlTmF2Q29kZXMuTkFWX0NMQVNTX09WRVJGTE9XX01FTlU7XG4gICAgICB0aGlzLmNvbnRyb2xOYXYobWVzc2FnZS5jb250cm9sQ29kZSwgbmF2Q2xhc3MpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnRyb2xOYXYoY29udHJvbENvZGU6IHN0cmluZywgbmF2Q2xhc3M6IHN0cmluZyk6IHZvaWQge1xuICAgIGlmIChjb250cm9sQ29kZSA9PT0gUmVzcG9uc2l2ZU5hdkNvZGVzLk5BVl9PUEVOKSB7XG4gICAgICB0aGlzLl9jbGFzc0xpc3QuYWRkKG5hdkNsYXNzKTtcbiAgICB9IGVsc2UgaWYgKGNvbnRyb2xDb2RlID09PSBSZXNwb25zaXZlTmF2Q29kZXMuTkFWX0NMT1NFKSB7XG4gICAgICB0aGlzLl9jbGFzc0xpc3QucmVtb3ZlKG5hdkNsYXNzKTtcbiAgICB9IGVsc2UgaWYgKGNvbnRyb2xDb2RlID09PSBSZXNwb25zaXZlTmF2Q29kZXMuTkFWX1RPR0dMRSkge1xuICAgICAgdGhpcy5fY2xhc3NMaXN0LnRvZ2dsZShuYXZDbGFzcyk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==