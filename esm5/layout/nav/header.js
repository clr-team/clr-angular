/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            next: (/**
             * @param {?} navLevelList
             * @return {?}
             */
            function (navLevelList) {
                _this.initializeNavTriggers(navLevelList);
            }),
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
        navList.forEach((/**
         * @param {?} navLevel
         * @return {?}
         */
        function (navLevel) {
            if (navLevel === ResponsiveNavCodes.NAV_LEVEL_1) {
                _this.isNavLevel1OnPage = true;
            }
            else if (navLevel === ResponsiveNavCodes.NAV_LEVEL_2) {
                _this.isNavLevel2OnPage = true;
            }
        }));
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
    /**
     * @type {?}
     * @private
     */
    ClrHeader.prototype._subscription;
    /**
     * @type {?}
     * @private
     */
    ClrHeader.prototype.responsiveNavService;
    /** @type {?} */
    ClrHeader.prototype.commonStrings;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsibGF5b3V0L25hdi9oZWFkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUFFLFNBQVMsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUdyRCxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUN4RixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUU3RTtJQStCRSxtQkFBb0Isb0JBQWlELEVBQVMsYUFBK0I7UUFBN0csaUJBTUM7UUFObUIseUJBQW9CLEdBQXBCLG9CQUFvQixDQUE2QjtRQUFTLGtCQUFhLEdBQWIsYUFBYSxDQUFrQjtRQU43RyxzQkFBaUIsR0FBRyxLQUFLLENBQUM7UUFDMUIsc0JBQWlCLEdBQUcsS0FBSyxDQUFDO1FBQzFCLGlCQUFZLEdBQVcsSUFBSSxDQUFDO1FBQzVCLHVCQUFrQixHQUFHLGtCQUFrQixDQUFDO1FBSXRDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUM7WUFDdEUsSUFBSTs7OztZQUFFLFVBQUMsWUFBc0I7Z0JBQzNCLEtBQUksQ0FBQyxxQkFBcUIsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUMzQyxDQUFDLENBQUE7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsaUdBQWlHOzs7OztJQUNqRyxvQ0FBZ0I7Ozs7O0lBQWhCO1FBQ0UsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztRQUMvQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO0lBQ2pDLENBQUM7SUFFRCwrQ0FBK0M7Ozs7OztJQUMvQyx5Q0FBcUI7Ozs7OztJQUFyQixVQUFzQixPQUFpQjtRQUF2QyxpQkFhQztRQVpDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3hCLElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDdEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO1lBQ2xELE9BQU87U0FDUjtRQUNELE9BQU8sQ0FBQyxPQUFPOzs7O1FBQUMsVUFBQSxRQUFRO1lBQ3RCLElBQUksUUFBUSxLQUFLLGtCQUFrQixDQUFDLFdBQVcsRUFBRTtnQkFDL0MsS0FBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQzthQUMvQjtpQkFBTSxJQUFJLFFBQVEsS0FBSyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUU7Z0JBQ3RELEtBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7YUFDL0I7UUFDSCxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCw4QkFBOEI7Ozs7O0lBQzlCLGdDQUFZOzs7OztJQUFaO1FBQ0UsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzNDLENBQUM7SUFFRCwrQkFBK0I7Ozs7OztJQUMvQiw2QkFBUzs7Ozs7O0lBQVQsVUFBVSxRQUFnQjtRQUN4QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQUNyRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsa0JBQWtCLENBQUMsa0JBQWtCLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3hGLENBQUM7Ozs7SUFFRCwrQkFBVzs7O0lBQVg7UUFDRSxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ25DLENBQUM7O2dCQTFFRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLFlBQVk7b0JBQ3RCLFFBQVEsRUFBRSxzMkJBbUJQO29CQUNILElBQUksRUFBRSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sRUFBRTtpQkFDbkM7Ozs7Z0JBM0JRLDJCQUEyQjtnQkFFM0IsZ0JBQWdCOztJQTZFekIsZ0JBQUM7Q0FBQSxBQTNFRCxJQTJFQztTQW5EWSxTQUFTOzs7SUFDcEIsc0NBQTBCOztJQUMxQixzQ0FBMEI7O0lBQzFCLGlDQUE0Qjs7SUFDNUIsdUNBQXdDOzs7OztJQUN4QyxrQ0FBb0M7Ozs7O0lBRXhCLHlDQUF5RDs7SUFBRSxrQ0FBc0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBDb21wb25lbnQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IFJlc3BvbnNpdmVOYXZpZ2F0aW9uU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL3Jlc3BvbnNpdmUtbmF2aWdhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IFJlc3BvbnNpdmVOYXZDb2RlcyB9IGZyb20gJy4vcmVzcG9uc2l2ZS1uYXYtY29kZXMnO1xuaW1wb3J0IHsgQ2xyQ29tbW9uU3RyaW5ncyB9IGZyb20gJy4uLy4uL3V0aWxzL2kxOG4vY29tbW9uLXN0cmluZ3MuaW50ZXJmYWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLWhlYWRlcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgKm5nSWY9XCJpc05hdkxldmVsMU9uUGFnZVwiXG4gICAgICAgICAgICBjbGFzcz1cImhlYWRlci1oYW1idXJnZXItdHJpZ2dlclwiXG4gICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIihvcGVuTmF2TGV2ZWwgIT09IHJlc3BvbnNpdmVOYXZDb2Rlcy5OQVZfTEVWRUxfMSkgPyBjb21tb25TdHJpbmdzLm9wZW4gOiBjb21tb25TdHJpbmdzLmNsb3NlXCJcbiAgICAgICAgICAgIChjbGljayk9XCJ0b2dnbGVOYXYocmVzcG9uc2l2ZU5hdkNvZGVzLk5BVl9MRVZFTF8xKVwiPlxuICAgICAgICAgICAgPHNwYW4+PC9zcGFuPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICpuZ0lmPVwiaXNOYXZMZXZlbDJPblBhZ2VcIlxuICAgICAgICAgICAgY2xhc3M9XCJoZWFkZXItb3ZlcmZsb3ctdHJpZ2dlclwiXG4gICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIihvcGVuTmF2TGV2ZWwgIT09IHJlc3BvbnNpdmVOYXZDb2Rlcy5OQVZfTEVWRUxfMikgPyBjb21tb25TdHJpbmdzLm9wZW4gOiBjb21tb25TdHJpbmdzLmNsb3NlXCJcbiAgICAgICAgICAgIChjbGljayk9XCJ0b2dnbGVOYXYocmVzcG9uc2l2ZU5hdkNvZGVzLk5BVl9MRVZFTF8yKVwiPlxuICAgICAgICAgICAgPHNwYW4+PC9zcGFuPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImhlYWRlci1iYWNrZHJvcFwiIChjbGljayk9XCJjbG9zZU9wZW5OYXYoKVwiPjwvZGl2PlxuICAgIGAsXG4gIGhvc3Q6IHsgJ1tjbGFzcy5oZWFkZXJdJzogJ3RydWUnIH0sXG59KVxuZXhwb3J0IGNsYXNzIENsckhlYWRlciBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIGlzTmF2TGV2ZWwxT25QYWdlID0gZmFsc2U7XG4gIGlzTmF2TGV2ZWwyT25QYWdlID0gZmFsc2U7XG4gIG9wZW5OYXZMZXZlbDogbnVtYmVyID0gbnVsbDtcbiAgcmVzcG9uc2l2ZU5hdkNvZGVzID0gUmVzcG9uc2l2ZU5hdkNvZGVzO1xuICBwcml2YXRlIF9zdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlc3BvbnNpdmVOYXZTZXJ2aWNlOiBSZXNwb25zaXZlTmF2aWdhdGlvblNlcnZpY2UsIHB1YmxpYyBjb21tb25TdHJpbmdzOiBDbHJDb21tb25TdHJpbmdzKSB7XG4gICAgdGhpcy5fc3Vic2NyaXB0aW9uID0gdGhpcy5yZXNwb25zaXZlTmF2U2VydmljZS5yZWdpc3RlcmVkTmF2cy5zdWJzY3JpYmUoe1xuICAgICAgbmV4dDogKG5hdkxldmVsTGlzdDogbnVtYmVyW10pID0+IHtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplTmF2VHJpZ2dlcnMobmF2TGV2ZWxMaXN0KTtcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICAvLyByZXNldCB0cmlnZ2Vycy4gaGFuZGxlcyBjYXNlcyB3aGVuIGFuIGFwcGxpY2F0aW9uIGhhcyBkaWZmZXJlbnQgbmF2IGxldmVscyBvbiBkaWZmZXJlbnQgcGFnZXMuXG4gIHJlc2V0TmF2VHJpZ2dlcnMoKSB7XG4gICAgdGhpcy5pc05hdkxldmVsMU9uUGFnZSA9IGZhbHNlO1xuICAgIHRoaXMuaXNOYXZMZXZlbDJPblBhZ2UgPSBmYWxzZTtcbiAgfVxuXG4gIC8vIGRlY2lkZXMgd2hpY2ggdHJpZ2dlcnMgdG8gc2hvdyBvbiB0aGUgaGVhZGVyXG4gIGluaXRpYWxpemVOYXZUcmlnZ2VycyhuYXZMaXN0OiBudW1iZXJbXSk6IHZvaWQge1xuICAgIHRoaXMucmVzZXROYXZUcmlnZ2VycygpO1xuICAgIGlmIChuYXZMaXN0Lmxlbmd0aCA+IDIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ01vcmUgdGhhbiAyIE5hdiBMZXZlbHMgZGV0ZWN0ZWQuJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIG5hdkxpc3QuZm9yRWFjaChuYXZMZXZlbCA9PiB7XG4gICAgICBpZiAobmF2TGV2ZWwgPT09IFJlc3BvbnNpdmVOYXZDb2Rlcy5OQVZfTEVWRUxfMSkge1xuICAgICAgICB0aGlzLmlzTmF2TGV2ZWwxT25QYWdlID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAobmF2TGV2ZWwgPT09IFJlc3BvbnNpdmVOYXZDb2Rlcy5OQVZfTEVWRUxfMikge1xuICAgICAgICB0aGlzLmlzTmF2TGV2ZWwyT25QYWdlID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8vIGNsb3NlcyB0aGUgbmF2IHRoYXQgaXMgb3BlblxuICBjbG9zZU9wZW5OYXYoKSB7XG4gICAgdGhpcy5yZXNwb25zaXZlTmF2U2VydmljZS5jbG9zZUFsbE5hdnMoKTtcbiAgfVxuXG4gIC8vIHRvZ2dsZXMgdGhlIG5hdiB0aGF0IGlzIG9wZW5cbiAgdG9nZ2xlTmF2KG5hdkxldmVsOiBudW1iZXIpIHtcbiAgICB0aGlzLm9wZW5OYXZMZXZlbCA9IHRoaXMub3Blbk5hdkxldmVsID09PSBuYXZMZXZlbCA/IG51bGwgOiBuYXZMZXZlbDtcbiAgICB0aGlzLnJlc3BvbnNpdmVOYXZTZXJ2aWNlLnNlbmRDb250cm9sTWVzc2FnZShSZXNwb25zaXZlTmF2Q29kZXMuTkFWX1RPR0dMRSwgbmF2TGV2ZWwpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==