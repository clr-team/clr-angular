/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';
import { ResponsiveNavigationService } from './providers/responsive-navigation.service';
import { ResponsiveNavCodes } from './responsive-nav-codes';
import { ClrCommonStrings } from '../../utils/i18n/common-strings.interface';
var ClrHeader = /** @class */ (function () {
    function ClrHeader(responsiveNavService, commonStrings) {
        var _this = this;
        this.responsiveNavService = responsiveNavService;
        this.commonStrings = commonStrings;
        this.isNavLevel1OnPage = false;
        this.isNavLevel2OnPage = false;
        this.openNavLevel = null;
        this.responsiveNavCodes = ResponsiveNavCodes;
        this._subscription = this.responsiveNavService.registeredNavs.subscribe({
            next: function (navLevelList) {
                _this.initializeNavTriggers(navLevelList);
            },
        });
    }
    // reset triggers. handles cases when an application has different nav levels on different pages.
    // reset triggers. handles cases when an application has different nav levels on different pages.
    /**
     * @return {?}
     */
    ClrHeader.prototype.resetNavTriggers = 
    // reset triggers. handles cases when an application has different nav levels on different pages.
    /**
     * @return {?}
     */
    function () {
        this.isNavLevel1OnPage = false;
        this.isNavLevel2OnPage = false;
    };
    // decides which triggers to show on the header
    // decides which triggers to show on the header
    /**
     * @param {?} navList
     * @return {?}
     */
    ClrHeader.prototype.initializeNavTriggers = 
    // decides which triggers to show on the header
    /**
     * @param {?} navList
     * @return {?}
     */
    function (navList) {
        var _this = this;
        this.resetNavTriggers();
        if (navList.length > 2) {
            console.error('More than 2 Nav Levels detected.');
            return;
        }
        navList.forEach(function (navLevel) {
            if (navLevel === ResponsiveNavCodes.NAV_LEVEL_1) {
                _this.isNavLevel1OnPage = true;
            }
            else if (navLevel === ResponsiveNavCodes.NAV_LEVEL_2) {
                _this.isNavLevel2OnPage = true;
            }
        });
    };
    // closes the nav that is open
    // closes the nav that is open
    /**
     * @return {?}
     */
    ClrHeader.prototype.closeOpenNav = 
    // closes the nav that is open
    /**
     * @return {?}
     */
    function () {
        this.responsiveNavService.closeAllNavs();
    };
    // toggles the nav that is open
    // toggles the nav that is open
    /**
     * @param {?} navLevel
     * @return {?}
     */
    ClrHeader.prototype.toggleNav = 
    // toggles the nav that is open
    /**
     * @param {?} navLevel
     * @return {?}
     */
    function (navLevel) {
        this.openNavLevel = this.openNavLevel === navLevel ? null : navLevel;
        this.responsiveNavService.sendControlMessage(ResponsiveNavCodes.NAV_TOGGLE, navLevel);
    };
    /**
     * @return {?}
     */
    ClrHeader.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._subscription.unsubscribe();
    };
    ClrHeader.decorators = [
        { type: Component, args: [{
                    selector: 'clr-header',
                    template: "\n        <button\n            type=\"button\"\n            *ngIf=\"isNavLevel1OnPage\"\n            class=\"header-hamburger-trigger\"\n            [attr.aria-label]=\"(openNavLevel !== responsiveNavCodes.NAV_LEVEL_1) ? commonStrings.open : commonStrings.close\"\n            (click)=\"toggleNav(responsiveNavCodes.NAV_LEVEL_1)\">\n            <span></span>\n        </button>\n        <ng-content></ng-content>\n        <button\n            type=\"button\"\n            *ngIf=\"isNavLevel2OnPage\"\n            class=\"header-overflow-trigger\"\n            [attr.aria-label]=\"(openNavLevel !== responsiveNavCodes.NAV_LEVEL_2) ? commonStrings.open : commonStrings.close\"\n            (click)=\"toggleNav(responsiveNavCodes.NAV_LEVEL_2)\">\n            <span></span>\n        </button>\n        <div class=\"header-backdrop\" (click)=\"closeOpenNav()\"></div>\n    ",
                    host: { '[class.header]': 'true' }
                }] }
    ];
    /** @nocollapse */
    ClrHeader.ctorParameters = function () { return [
        { type: ResponsiveNavigationService },
        { type: ClrCommonStrings }
    ]; };
    return ClrHeader;
}());
export { ClrHeader };
if (false) {
    /** @type {?} */
    ClrHeader.prototype.isNavLevel1OnPage;
    /** @type {?} */
    ClrHeader.prototype.isNavLevel2OnPage;
    /** @type {?} */
    ClrHeader.prototype.openNavLevel;
    /** @type {?} */
    ClrHeader.prototype.responsiveNavCodes;
    /** @type {?} */
    ClrHeader.prototype._subscription;
    /** @type {?} */
    ClrHeader.prototype.responsiveNavService;
    /** @type {?} */
    ClrHeader.prototype.commonStrings;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsibGF5b3V0L25hdi9oZWFkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUFFLFNBQVMsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUdyRCxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUN4RixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUU3RTtJQStCRSxtQkFBb0Isb0JBQWlELEVBQVMsYUFBK0I7UUFBN0csaUJBTUM7UUFObUIseUJBQW9CLEdBQXBCLG9CQUFvQixDQUE2QjtRQUFTLGtCQUFhLEdBQWIsYUFBYSxDQUFrQjtRQU43RyxzQkFBaUIsR0FBRyxLQUFLLENBQUM7UUFDMUIsc0JBQWlCLEdBQUcsS0FBSyxDQUFDO1FBQzFCLGlCQUFZLEdBQVcsSUFBSSxDQUFDO1FBQzVCLHVCQUFrQixHQUFHLGtCQUFrQixDQUFDO1FBSXRDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUM7WUFDdEUsSUFBSSxFQUFFLFVBQUMsWUFBc0I7Z0JBQzNCLEtBQUksQ0FBQyxxQkFBcUIsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUMzQyxDQUFDO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELGlHQUFpRzs7Ozs7SUFDakcsb0NBQWdCOzs7OztJQUFoQjtRQUNFLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7UUFDL0IsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztJQUNqQyxDQUFDO0lBRUQsK0NBQStDOzs7Ozs7SUFDL0MseUNBQXFCOzs7Ozs7SUFBckIsVUFBc0IsT0FBaUI7UUFBdkMsaUJBYUM7UUFaQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN4QixJQUFJLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3RCLE9BQU8sQ0FBQyxLQUFLLENBQUMsa0NBQWtDLENBQUMsQ0FBQztZQUNsRCxPQUFPO1NBQ1I7UUFDRCxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQUEsUUFBUTtZQUN0QixJQUFJLFFBQVEsS0FBSyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUU7Z0JBQy9DLEtBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7YUFDL0I7aUJBQU0sSUFBSSxRQUFRLEtBQUssa0JBQWtCLENBQUMsV0FBVyxFQUFFO2dCQUN0RCxLQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO2FBQy9CO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsOEJBQThCOzs7OztJQUM5QixnQ0FBWTs7Ozs7SUFBWjtRQUNFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMzQyxDQUFDO0lBRUQsK0JBQStCOzs7Ozs7SUFDL0IsNkJBQVM7Ozs7OztJQUFULFVBQVUsUUFBZ0I7UUFDeEIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7UUFDckUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGtCQUFrQixDQUFDLGtCQUFrQixDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUN4RixDQUFDOzs7O0lBRUQsK0JBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNuQyxDQUFDOztnQkExRUYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxZQUFZO29CQUN0QixRQUFRLEVBQUUsczJCQW1CUDtvQkFDSCxJQUFJLEVBQUUsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLEVBQUU7aUJBQ25DOzs7O2dCQTNCUSwyQkFBMkI7Z0JBRTNCLGdCQUFnQjs7SUE2RXpCLGdCQUFDO0NBQUEsQUEzRUQsSUEyRUM7U0FuRFksU0FBUzs7O0lBQ3BCLHNDQUEwQjs7SUFDMUIsc0NBQTBCOztJQUMxQixpQ0FBNEI7O0lBQzVCLHVDQUF3Qzs7SUFDeEMsa0NBQW9DOztJQUV4Qix5Q0FBeUQ7O0lBQUUsa0NBQXNDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgQ29tcG9uZW50LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBSZXNwb25zaXZlTmF2aWdhdGlvblNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9yZXNwb25zaXZlLW5hdmlnYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBSZXNwb25zaXZlTmF2Q29kZXMgfSBmcm9tICcuL3Jlc3BvbnNpdmUtbmF2LWNvZGVzJztcbmltcG9ydCB7IENsckNvbW1vblN0cmluZ3MgfSBmcm9tICcuLi8uLi91dGlscy9pMThuL2NvbW1vbi1zdHJpbmdzLmludGVyZmFjZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci1oZWFkZXInLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICpuZ0lmPVwiaXNOYXZMZXZlbDFPblBhZ2VcIlxuICAgICAgICAgICAgY2xhc3M9XCJoZWFkZXItaGFtYnVyZ2VyLXRyaWdnZXJcIlxuICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCIob3Blbk5hdkxldmVsICE9PSByZXNwb25zaXZlTmF2Q29kZXMuTkFWX0xFVkVMXzEpID8gY29tbW9uU3RyaW5ncy5vcGVuIDogY29tbW9uU3RyaW5ncy5jbG9zZVwiXG4gICAgICAgICAgICAoY2xpY2spPVwidG9nZ2xlTmF2KHJlc3BvbnNpdmVOYXZDb2Rlcy5OQVZfTEVWRUxfMSlcIj5cbiAgICAgICAgICAgIDxzcGFuPjwvc3Bhbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAqbmdJZj1cImlzTmF2TGV2ZWwyT25QYWdlXCJcbiAgICAgICAgICAgIGNsYXNzPVwiaGVhZGVyLW92ZXJmbG93LXRyaWdnZXJcIlxuICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCIob3Blbk5hdkxldmVsICE9PSByZXNwb25zaXZlTmF2Q29kZXMuTkFWX0xFVkVMXzIpID8gY29tbW9uU3RyaW5ncy5vcGVuIDogY29tbW9uU3RyaW5ncy5jbG9zZVwiXG4gICAgICAgICAgICAoY2xpY2spPVwidG9nZ2xlTmF2KHJlc3BvbnNpdmVOYXZDb2Rlcy5OQVZfTEVWRUxfMilcIj5cbiAgICAgICAgICAgIDxzcGFuPjwvc3Bhbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJoZWFkZXItYmFja2Ryb3BcIiAoY2xpY2spPVwiY2xvc2VPcGVuTmF2KClcIj48L2Rpdj5cbiAgICBgLFxuICBob3N0OiB7ICdbY2xhc3MuaGVhZGVyXSc6ICd0cnVlJyB9LFxufSlcbmV4cG9ydCBjbGFzcyBDbHJIZWFkZXIgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBpc05hdkxldmVsMU9uUGFnZSA9IGZhbHNlO1xuICBpc05hdkxldmVsMk9uUGFnZSA9IGZhbHNlO1xuICBvcGVuTmF2TGV2ZWw6IG51bWJlciA9IG51bGw7XG4gIHJlc3BvbnNpdmVOYXZDb2RlcyA9IFJlc3BvbnNpdmVOYXZDb2RlcztcbiAgcHJpdmF0ZSBfc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZXNwb25zaXZlTmF2U2VydmljZTogUmVzcG9uc2l2ZU5hdmlnYXRpb25TZXJ2aWNlLCBwdWJsaWMgY29tbW9uU3RyaW5nczogQ2xyQ29tbW9uU3RyaW5ncykge1xuICAgIHRoaXMuX3N1YnNjcmlwdGlvbiA9IHRoaXMucmVzcG9uc2l2ZU5hdlNlcnZpY2UucmVnaXN0ZXJlZE5hdnMuc3Vic2NyaWJlKHtcbiAgICAgIG5leHQ6IChuYXZMZXZlbExpc3Q6IG51bWJlcltdKSA9PiB7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZU5hdlRyaWdnZXJzKG5hdkxldmVsTGlzdCk7XG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgLy8gcmVzZXQgdHJpZ2dlcnMuIGhhbmRsZXMgY2FzZXMgd2hlbiBhbiBhcHBsaWNhdGlvbiBoYXMgZGlmZmVyZW50IG5hdiBsZXZlbHMgb24gZGlmZmVyZW50IHBhZ2VzLlxuICByZXNldE5hdlRyaWdnZXJzKCkge1xuICAgIHRoaXMuaXNOYXZMZXZlbDFPblBhZ2UgPSBmYWxzZTtcbiAgICB0aGlzLmlzTmF2TGV2ZWwyT25QYWdlID0gZmFsc2U7XG4gIH1cblxuICAvLyBkZWNpZGVzIHdoaWNoIHRyaWdnZXJzIHRvIHNob3cgb24gdGhlIGhlYWRlclxuICBpbml0aWFsaXplTmF2VHJpZ2dlcnMobmF2TGlzdDogbnVtYmVyW10pOiB2b2lkIHtcbiAgICB0aGlzLnJlc2V0TmF2VHJpZ2dlcnMoKTtcbiAgICBpZiAobmF2TGlzdC5sZW5ndGggPiAyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdNb3JlIHRoYW4gMiBOYXYgTGV2ZWxzIGRldGVjdGVkLicpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBuYXZMaXN0LmZvckVhY2gobmF2TGV2ZWwgPT4ge1xuICAgICAgaWYgKG5hdkxldmVsID09PSBSZXNwb25zaXZlTmF2Q29kZXMuTkFWX0xFVkVMXzEpIHtcbiAgICAgICAgdGhpcy5pc05hdkxldmVsMU9uUGFnZSA9IHRydWU7XG4gICAgICB9IGVsc2UgaWYgKG5hdkxldmVsID09PSBSZXNwb25zaXZlTmF2Q29kZXMuTkFWX0xFVkVMXzIpIHtcbiAgICAgICAgdGhpcy5pc05hdkxldmVsMk9uUGFnZSA9IHRydWU7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvLyBjbG9zZXMgdGhlIG5hdiB0aGF0IGlzIG9wZW5cbiAgY2xvc2VPcGVuTmF2KCkge1xuICAgIHRoaXMucmVzcG9uc2l2ZU5hdlNlcnZpY2UuY2xvc2VBbGxOYXZzKCk7XG4gIH1cblxuICAvLyB0b2dnbGVzIHRoZSBuYXYgdGhhdCBpcyBvcGVuXG4gIHRvZ2dsZU5hdihuYXZMZXZlbDogbnVtYmVyKSB7XG4gICAgdGhpcy5vcGVuTmF2TGV2ZWwgPSB0aGlzLm9wZW5OYXZMZXZlbCA9PT0gbmF2TGV2ZWwgPyBudWxsIDogbmF2TGV2ZWw7XG4gICAgdGhpcy5yZXNwb25zaXZlTmF2U2VydmljZS5zZW5kQ29udHJvbE1lc3NhZ2UoUmVzcG9uc2l2ZU5hdkNvZGVzLk5BVl9UT0dHTEUsIG5hdkxldmVsKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX3N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iXX0=