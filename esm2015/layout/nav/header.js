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
            next: (/**
             * @param {?} navLevelList
             * @return {?}
             */
            (navLevelList) => {
                this.initializeNavTriggers(navLevelList);
            }),
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
        navList.forEach((/**
         * @param {?} navLevel
         * @return {?}
         */
        navLevel => {
            if (navLevel === ResponsiveNavCodes.NAV_LEVEL_1) {
                this.isNavLevel1OnPage = true;
            }
            else if (navLevel === ResponsiveNavCodes.NAV_LEVEL_2) {
                this.isNavLevel2OnPage = true;
            }
        }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsibGF5b3V0L25hdi9oZWFkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUFFLFNBQVMsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUdyRCxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUN4RixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQTBCN0UsTUFBTSxPQUFPLFNBQVM7Ozs7O0lBT3BCLFlBQW9CLG9CQUFpRCxFQUFTLGFBQStCO1FBQXpGLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBNkI7UUFBUyxrQkFBYSxHQUFiLGFBQWEsQ0FBa0I7UUFON0csc0JBQWlCLEdBQUcsS0FBSyxDQUFDO1FBQzFCLHNCQUFpQixHQUFHLEtBQUssQ0FBQztRQUMxQixpQkFBWSxHQUFXLElBQUksQ0FBQztRQUM1Qix1QkFBa0IsR0FBRyxrQkFBa0IsQ0FBQztRQUl0QyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDO1lBQ3RFLElBQUk7Ozs7WUFBRSxDQUFDLFlBQXNCLEVBQUUsRUFBRTtnQkFDL0IsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzNDLENBQUMsQ0FBQTtTQUNGLENBQUMsQ0FBQztJQUNMLENBQUM7Ozs7O0lBR0QsZ0JBQWdCO1FBQ2QsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztRQUMvQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO0lBQ2pDLENBQUM7Ozs7OztJQUdELHFCQUFxQixDQUFDLE9BQWlCO1FBQ3JDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3hCLElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDdEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO1lBQ2xELE9BQU87U0FDUjtRQUNELE9BQU8sQ0FBQyxPQUFPOzs7O1FBQUMsUUFBUSxDQUFDLEVBQUU7WUFDekIsSUFBSSxRQUFRLEtBQUssa0JBQWtCLENBQUMsV0FBVyxFQUFFO2dCQUMvQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO2FBQy9CO2lCQUFNLElBQUksUUFBUSxLQUFLLGtCQUFrQixDQUFDLFdBQVcsRUFBRTtnQkFDdEQsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQzthQUMvQjtRQUNILENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7SUFHRCxZQUFZO1FBQ1YsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzNDLENBQUM7Ozs7OztJQUdELFNBQVMsQ0FBQyxRQUFnQjtRQUN4QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQUNyRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsa0JBQWtCLENBQUMsa0JBQWtCLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3hGLENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNuQyxDQUFDOzs7WUExRUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxZQUFZO2dCQUN0QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FtQlA7Z0JBQ0gsSUFBSSxFQUFFLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxFQUFFO2FBQ25DOzs7O1lBM0JRLDJCQUEyQjtZQUUzQixnQkFBZ0I7Ozs7SUEyQnZCLHNDQUEwQjs7SUFDMUIsc0NBQTBCOztJQUMxQixpQ0FBNEI7O0lBQzVCLHVDQUF3Qzs7Ozs7SUFDeEMsa0NBQW9DOzs7OztJQUV4Qix5Q0FBeUQ7O0lBQUUsa0NBQXNDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgQ29tcG9uZW50LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBSZXNwb25zaXZlTmF2aWdhdGlvblNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9yZXNwb25zaXZlLW5hdmlnYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBSZXNwb25zaXZlTmF2Q29kZXMgfSBmcm9tICcuL3Jlc3BvbnNpdmUtbmF2LWNvZGVzJztcbmltcG9ydCB7IENsckNvbW1vblN0cmluZ3MgfSBmcm9tICcuLi8uLi91dGlscy9pMThuL2NvbW1vbi1zdHJpbmdzLmludGVyZmFjZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci1oZWFkZXInLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICpuZ0lmPVwiaXNOYXZMZXZlbDFPblBhZ2VcIlxuICAgICAgICAgICAgY2xhc3M9XCJoZWFkZXItaGFtYnVyZ2VyLXRyaWdnZXJcIlxuICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCIob3Blbk5hdkxldmVsICE9PSByZXNwb25zaXZlTmF2Q29kZXMuTkFWX0xFVkVMXzEpID8gY29tbW9uU3RyaW5ncy5vcGVuIDogY29tbW9uU3RyaW5ncy5jbG9zZVwiXG4gICAgICAgICAgICAoY2xpY2spPVwidG9nZ2xlTmF2KHJlc3BvbnNpdmVOYXZDb2Rlcy5OQVZfTEVWRUxfMSlcIj5cbiAgICAgICAgICAgIDxzcGFuPjwvc3Bhbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAqbmdJZj1cImlzTmF2TGV2ZWwyT25QYWdlXCJcbiAgICAgICAgICAgIGNsYXNzPVwiaGVhZGVyLW92ZXJmbG93LXRyaWdnZXJcIlxuICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCIob3Blbk5hdkxldmVsICE9PSByZXNwb25zaXZlTmF2Q29kZXMuTkFWX0xFVkVMXzIpID8gY29tbW9uU3RyaW5ncy5vcGVuIDogY29tbW9uU3RyaW5ncy5jbG9zZVwiXG4gICAgICAgICAgICAoY2xpY2spPVwidG9nZ2xlTmF2KHJlc3BvbnNpdmVOYXZDb2Rlcy5OQVZfTEVWRUxfMilcIj5cbiAgICAgICAgICAgIDxzcGFuPjwvc3Bhbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJoZWFkZXItYmFja2Ryb3BcIiAoY2xpY2spPVwiY2xvc2VPcGVuTmF2KClcIj48L2Rpdj5cbiAgICBgLFxuICBob3N0OiB7ICdbY2xhc3MuaGVhZGVyXSc6ICd0cnVlJyB9LFxufSlcbmV4cG9ydCBjbGFzcyBDbHJIZWFkZXIgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBpc05hdkxldmVsMU9uUGFnZSA9IGZhbHNlO1xuICBpc05hdkxldmVsMk9uUGFnZSA9IGZhbHNlO1xuICBvcGVuTmF2TGV2ZWw6IG51bWJlciA9IG51bGw7XG4gIHJlc3BvbnNpdmVOYXZDb2RlcyA9IFJlc3BvbnNpdmVOYXZDb2RlcztcbiAgcHJpdmF0ZSBfc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZXNwb25zaXZlTmF2U2VydmljZTogUmVzcG9uc2l2ZU5hdmlnYXRpb25TZXJ2aWNlLCBwdWJsaWMgY29tbW9uU3RyaW5nczogQ2xyQ29tbW9uU3RyaW5ncykge1xuICAgIHRoaXMuX3N1YnNjcmlwdGlvbiA9IHRoaXMucmVzcG9uc2l2ZU5hdlNlcnZpY2UucmVnaXN0ZXJlZE5hdnMuc3Vic2NyaWJlKHtcbiAgICAgIG5leHQ6IChuYXZMZXZlbExpc3Q6IG51bWJlcltdKSA9PiB7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZU5hdlRyaWdnZXJzKG5hdkxldmVsTGlzdCk7XG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgLy8gcmVzZXQgdHJpZ2dlcnMuIGhhbmRsZXMgY2FzZXMgd2hlbiBhbiBhcHBsaWNhdGlvbiBoYXMgZGlmZmVyZW50IG5hdiBsZXZlbHMgb24gZGlmZmVyZW50IHBhZ2VzLlxuICByZXNldE5hdlRyaWdnZXJzKCkge1xuICAgIHRoaXMuaXNOYXZMZXZlbDFPblBhZ2UgPSBmYWxzZTtcbiAgICB0aGlzLmlzTmF2TGV2ZWwyT25QYWdlID0gZmFsc2U7XG4gIH1cblxuICAvLyBkZWNpZGVzIHdoaWNoIHRyaWdnZXJzIHRvIHNob3cgb24gdGhlIGhlYWRlclxuICBpbml0aWFsaXplTmF2VHJpZ2dlcnMobmF2TGlzdDogbnVtYmVyW10pOiB2b2lkIHtcbiAgICB0aGlzLnJlc2V0TmF2VHJpZ2dlcnMoKTtcbiAgICBpZiAobmF2TGlzdC5sZW5ndGggPiAyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdNb3JlIHRoYW4gMiBOYXYgTGV2ZWxzIGRldGVjdGVkLicpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBuYXZMaXN0LmZvckVhY2gobmF2TGV2ZWwgPT4ge1xuICAgICAgaWYgKG5hdkxldmVsID09PSBSZXNwb25zaXZlTmF2Q29kZXMuTkFWX0xFVkVMXzEpIHtcbiAgICAgICAgdGhpcy5pc05hdkxldmVsMU9uUGFnZSA9IHRydWU7XG4gICAgICB9IGVsc2UgaWYgKG5hdkxldmVsID09PSBSZXNwb25zaXZlTmF2Q29kZXMuTkFWX0xFVkVMXzIpIHtcbiAgICAgICAgdGhpcy5pc05hdkxldmVsMk9uUGFnZSA9IHRydWU7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvLyBjbG9zZXMgdGhlIG5hdiB0aGF0IGlzIG9wZW5cbiAgY2xvc2VPcGVuTmF2KCkge1xuICAgIHRoaXMucmVzcG9uc2l2ZU5hdlNlcnZpY2UuY2xvc2VBbGxOYXZzKCk7XG4gIH1cblxuICAvLyB0b2dnbGVzIHRoZSBuYXYgdGhhdCBpcyBvcGVuXG4gIHRvZ2dsZU5hdihuYXZMZXZlbDogbnVtYmVyKSB7XG4gICAgdGhpcy5vcGVuTmF2TGV2ZWwgPSB0aGlzLm9wZW5OYXZMZXZlbCA9PT0gbmF2TGV2ZWwgPyBudWxsIDogbmF2TGV2ZWw7XG4gICAgdGhpcy5yZXNwb25zaXZlTmF2U2VydmljZS5zZW5kQ29udHJvbE1lc3NhZ2UoUmVzcG9uc2l2ZU5hdkNvZGVzLk5BVl9UT0dHTEUsIG5hdkxldmVsKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX3N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iXX0=