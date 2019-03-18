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
export class ClrHeader {
    /**
     * @param {?} responsiveNavService
     * @param {?} commonStrings
     */
    constructor(responsiveNavService, commonStrings) {
        this.responsiveNavService = responsiveNavService;
        this.commonStrings = commonStrings;
        this.isNavLevel1OnPage = false;
        this.isNavLevel2OnPage = false;
        this.openNavLevel = null;
        this.responsiveNavCodes = ResponsiveNavCodes;
        this._subscription = this.responsiveNavService.registeredNavs.subscribe({
            next: (navLevelList) => {
                this.initializeNavTriggers(navLevelList);
            },
        });
    }
    // reset triggers. handles cases when an application has different nav levels on different pages.
    /**
     * @return {?}
     */
    resetNavTriggers() {
        this.isNavLevel1OnPage = false;
        this.isNavLevel2OnPage = false;
    }
    // decides which triggers to show on the header
    /**
     * @param {?} navList
     * @return {?}
     */
    initializeNavTriggers(navList) {
        this.resetNavTriggers();
        if (navList.length > 2) {
            console.error('More than 2 Nav Levels detected.');
            return;
        }
        navList.forEach(navLevel => {
            if (navLevel === ResponsiveNavCodes.NAV_LEVEL_1) {
                this.isNavLevel1OnPage = true;
            }
            else if (navLevel === ResponsiveNavCodes.NAV_LEVEL_2) {
                this.isNavLevel2OnPage = true;
            }
        });
    }
    // closes the nav that is open
    /**
     * @return {?}
     */
    closeOpenNav() {
        this.responsiveNavService.closeAllNavs();
    }
    // toggles the nav that is open
    /**
     * @param {?} navLevel
     * @return {?}
     */
    toggleNav(navLevel) {
        this.openNavLevel = this.openNavLevel === navLevel ? null : navLevel;
        this.responsiveNavService.sendControlMessage(ResponsiveNavCodes.NAV_TOGGLE, navLevel);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
}
ClrHeader.decorators = [
    { type: Component, args: [{
                selector: 'clr-header',
                template: `
        <button
            type="button"
            *ngIf="isNavLevel1OnPage"
            class="header-hamburger-trigger"
            [attr.aria-label]="(openNavLevel !== responsiveNavCodes.NAV_LEVEL_1) ? commonStrings.open : commonStrings.close"
            (click)="toggleNav(responsiveNavCodes.NAV_LEVEL_1)">
            <span></span>
        </button>
        <ng-content></ng-content>
        <button
            type="button"
            *ngIf="isNavLevel2OnPage"
            class="header-overflow-trigger"
            [attr.aria-label]="(openNavLevel !== responsiveNavCodes.NAV_LEVEL_2) ? commonStrings.open : commonStrings.close"
            (click)="toggleNav(responsiveNavCodes.NAV_LEVEL_2)">
            <span></span>
        </button>
        <div class="header-backdrop" (click)="closeOpenNav()"></div>
    `,
                host: { '[class.header]': 'true' }
            }] }
];
/** @nocollapse */
ClrHeader.ctorParameters = () => [
    { type: ResponsiveNavigationService },
    { type: ClrCommonStrings }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsibGF5b3V0L25hdi9oZWFkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUFFLFNBQVMsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUdyRCxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUN4RixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQTBCN0UsTUFBTSxPQUFPLFNBQVM7Ozs7O0lBT3BCLFlBQW9CLG9CQUFpRCxFQUFTLGFBQStCO1FBQXpGLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBNkI7UUFBUyxrQkFBYSxHQUFiLGFBQWEsQ0FBa0I7UUFON0csc0JBQWlCLEdBQUcsS0FBSyxDQUFDO1FBQzFCLHNCQUFpQixHQUFHLEtBQUssQ0FBQztRQUMxQixpQkFBWSxHQUFXLElBQUksQ0FBQztRQUM1Qix1QkFBa0IsR0FBRyxrQkFBa0IsQ0FBQztRQUl0QyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDO1lBQ3RFLElBQUksRUFBRSxDQUFDLFlBQXNCLEVBQUUsRUFBRTtnQkFDL0IsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzNDLENBQUM7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDOzs7OztJQUdELGdCQUFnQjtRQUNkLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7UUFDL0IsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztJQUNqQyxDQUFDOzs7Ozs7SUFHRCxxQkFBcUIsQ0FBQyxPQUFpQjtRQUNyQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN4QixJQUFJLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3RCLE9BQU8sQ0FBQyxLQUFLLENBQUMsa0NBQWtDLENBQUMsQ0FBQztZQUNsRCxPQUFPO1NBQ1I7UUFDRCxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ3pCLElBQUksUUFBUSxLQUFLLGtCQUFrQixDQUFDLFdBQVcsRUFBRTtnQkFDL0MsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQzthQUMvQjtpQkFBTSxJQUFJLFFBQVEsS0FBSyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUU7Z0JBQ3RELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7YUFDL0I7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Ozs7O0lBR0QsWUFBWTtRQUNWLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMzQyxDQUFDOzs7Ozs7SUFHRCxTQUFTLENBQUMsUUFBZ0I7UUFDeEIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7UUFDckUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGtCQUFrQixDQUFDLGtCQUFrQixDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUN4RixDQUFDOzs7O0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbkMsQ0FBQzs7O1lBMUVGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsWUFBWTtnQkFDdEIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBbUJQO2dCQUNILElBQUksRUFBRSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sRUFBRTthQUNuQzs7OztZQTNCUSwyQkFBMkI7WUFFM0IsZ0JBQWdCOzs7O0lBMkJ2QixzQ0FBMEI7O0lBQzFCLHNDQUEwQjs7SUFDMUIsaUNBQTRCOztJQUM1Qix1Q0FBd0M7O0lBQ3hDLGtDQUFvQzs7SUFFeEIseUNBQXlEOztJQUFFLGtDQUFzQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IENvbXBvbmVudCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgUmVzcG9uc2l2ZU5hdmlnYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvcmVzcG9uc2l2ZS1uYXZpZ2F0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVzcG9uc2l2ZU5hdkNvZGVzIH0gZnJvbSAnLi9yZXNwb25zaXZlLW5hdi1jb2Rlcyc7XG5pbXBvcnQgeyBDbHJDb21tb25TdHJpbmdzIH0gZnJvbSAnLi4vLi4vdXRpbHMvaTE4bi9jb21tb24tc3RyaW5ncy5pbnRlcmZhY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItaGVhZGVyJyxcbiAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAqbmdJZj1cImlzTmF2TGV2ZWwxT25QYWdlXCJcbiAgICAgICAgICAgIGNsYXNzPVwiaGVhZGVyLWhhbWJ1cmdlci10cmlnZ2VyXCJcbiAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiKG9wZW5OYXZMZXZlbCAhPT0gcmVzcG9uc2l2ZU5hdkNvZGVzLk5BVl9MRVZFTF8xKSA/IGNvbW1vblN0cmluZ3Mub3BlbiA6IGNvbW1vblN0cmluZ3MuY2xvc2VcIlxuICAgICAgICAgICAgKGNsaWNrKT1cInRvZ2dsZU5hdihyZXNwb25zaXZlTmF2Q29kZXMuTkFWX0xFVkVMXzEpXCI+XG4gICAgICAgICAgICA8c3Bhbj48L3NwYW4+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgKm5nSWY9XCJpc05hdkxldmVsMk9uUGFnZVwiXG4gICAgICAgICAgICBjbGFzcz1cImhlYWRlci1vdmVyZmxvdy10cmlnZ2VyXCJcbiAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiKG9wZW5OYXZMZXZlbCAhPT0gcmVzcG9uc2l2ZU5hdkNvZGVzLk5BVl9MRVZFTF8yKSA/IGNvbW1vblN0cmluZ3Mub3BlbiA6IGNvbW1vblN0cmluZ3MuY2xvc2VcIlxuICAgICAgICAgICAgKGNsaWNrKT1cInRvZ2dsZU5hdihyZXNwb25zaXZlTmF2Q29kZXMuTkFWX0xFVkVMXzIpXCI+XG4gICAgICAgICAgICA8c3Bhbj48L3NwYW4+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyLWJhY2tkcm9wXCIgKGNsaWNrKT1cImNsb3NlT3Blbk5hdigpXCI+PC9kaXY+XG4gICAgYCxcbiAgaG9zdDogeyAnW2NsYXNzLmhlYWRlcl0nOiAndHJ1ZScgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xySGVhZGVyIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgaXNOYXZMZXZlbDFPblBhZ2UgPSBmYWxzZTtcbiAgaXNOYXZMZXZlbDJPblBhZ2UgPSBmYWxzZTtcbiAgb3Blbk5hdkxldmVsOiBudW1iZXIgPSBudWxsO1xuICByZXNwb25zaXZlTmF2Q29kZXMgPSBSZXNwb25zaXZlTmF2Q29kZXM7XG4gIHByaXZhdGUgX3N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVzcG9uc2l2ZU5hdlNlcnZpY2U6IFJlc3BvbnNpdmVOYXZpZ2F0aW9uU2VydmljZSwgcHVibGljIGNvbW1vblN0cmluZ3M6IENsckNvbW1vblN0cmluZ3MpIHtcbiAgICB0aGlzLl9zdWJzY3JpcHRpb24gPSB0aGlzLnJlc3BvbnNpdmVOYXZTZXJ2aWNlLnJlZ2lzdGVyZWROYXZzLnN1YnNjcmliZSh7XG4gICAgICBuZXh0OiAobmF2TGV2ZWxMaXN0OiBudW1iZXJbXSkgPT4ge1xuICAgICAgICB0aGlzLmluaXRpYWxpemVOYXZUcmlnZ2VycyhuYXZMZXZlbExpc3QpO1xuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIC8vIHJlc2V0IHRyaWdnZXJzLiBoYW5kbGVzIGNhc2VzIHdoZW4gYW4gYXBwbGljYXRpb24gaGFzIGRpZmZlcmVudCBuYXYgbGV2ZWxzIG9uIGRpZmZlcmVudCBwYWdlcy5cbiAgcmVzZXROYXZUcmlnZ2VycygpIHtcbiAgICB0aGlzLmlzTmF2TGV2ZWwxT25QYWdlID0gZmFsc2U7XG4gICAgdGhpcy5pc05hdkxldmVsMk9uUGFnZSA9IGZhbHNlO1xuICB9XG5cbiAgLy8gZGVjaWRlcyB3aGljaCB0cmlnZ2VycyB0byBzaG93IG9uIHRoZSBoZWFkZXJcbiAgaW5pdGlhbGl6ZU5hdlRyaWdnZXJzKG5hdkxpc3Q6IG51bWJlcltdKTogdm9pZCB7XG4gICAgdGhpcy5yZXNldE5hdlRyaWdnZXJzKCk7XG4gICAgaWYgKG5hdkxpc3QubGVuZ3RoID4gMikge1xuICAgICAgY29uc29sZS5lcnJvcignTW9yZSB0aGFuIDIgTmF2IExldmVscyBkZXRlY3RlZC4nKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbmF2TGlzdC5mb3JFYWNoKG5hdkxldmVsID0+IHtcbiAgICAgIGlmIChuYXZMZXZlbCA9PT0gUmVzcG9uc2l2ZU5hdkNvZGVzLk5BVl9MRVZFTF8xKSB7XG4gICAgICAgIHRoaXMuaXNOYXZMZXZlbDFPblBhZ2UgPSB0cnVlO1xuICAgICAgfSBlbHNlIGlmIChuYXZMZXZlbCA9PT0gUmVzcG9uc2l2ZU5hdkNvZGVzLk5BVl9MRVZFTF8yKSB7XG4gICAgICAgIHRoaXMuaXNOYXZMZXZlbDJPblBhZ2UgPSB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLy8gY2xvc2VzIHRoZSBuYXYgdGhhdCBpcyBvcGVuXG4gIGNsb3NlT3Blbk5hdigpIHtcbiAgICB0aGlzLnJlc3BvbnNpdmVOYXZTZXJ2aWNlLmNsb3NlQWxsTmF2cygpO1xuICB9XG5cbiAgLy8gdG9nZ2xlcyB0aGUgbmF2IHRoYXQgaXMgb3BlblxuICB0b2dnbGVOYXYobmF2TGV2ZWw6IG51bWJlcikge1xuICAgIHRoaXMub3Blbk5hdkxldmVsID0gdGhpcy5vcGVuTmF2TGV2ZWwgPT09IG5hdkxldmVsID8gbnVsbCA6IG5hdkxldmVsO1xuICAgIHRoaXMucmVzcG9uc2l2ZU5hdlNlcnZpY2Uuc2VuZENvbnRyb2xNZXNzYWdlKFJlc3BvbnNpdmVOYXZDb2Rlcy5OQVZfVE9HR0xFLCBuYXZMZXZlbCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIl19