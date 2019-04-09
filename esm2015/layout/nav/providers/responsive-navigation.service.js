/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { ResponsiveNavCodes } from '../responsive-nav-codes';
import { ResponsiveNavControlMessage } from '../responsive-nav-control-message';
import * as i0 from "@angular/core";
export class ResponsiveNavigationService {
    constructor() {
        this.responsiveNavList = [];
        this.registerNavSubject = new ReplaySubject();
        this.controlNavSubject = new Subject();
        this.closeAllNavs(); // We start with all navs closed
    }
    /**
     * @return {?}
     */
    get registeredNavs() {
        return this.registerNavSubject.asObservable();
    }
    /**
     * @return {?}
     */
    get navControl() {
        return this.controlNavSubject.asObservable();
    }
    /**
     * @param {?} navLevel
     * @return {?}
     */
    registerNav(navLevel) {
        if (!navLevel || this.isNavRegistered(navLevel)) {
            return;
        }
        this.responsiveNavList.push(navLevel);
        this.registerNavSubject.next(this.responsiveNavList);
    }
    /**
     * @param {?} navLevel
     * @return {?}
     */
    isNavRegistered(navLevel) {
        if (this.responsiveNavList.indexOf(navLevel) > -1) {
            console.error('Multiple clr-nav-level ' + navLevel + ' attributes found. Please make sure that only one exists');
            return true;
        }
        return false;
    }
    /**
     * @param {?} navLevel
     * @return {?}
     */
    unregisterNav(navLevel) {
        /** @type {?} */
        const index = this.responsiveNavList.indexOf(navLevel);
        if (index > -1) {
            this.responsiveNavList.splice(index, 1);
            this.registerNavSubject.next(this.responsiveNavList);
        }
    }
    /**
     * @param {?} controlCode
     * @param {?} navLevel
     * @return {?}
     */
    sendControlMessage(controlCode, navLevel) {
        /** @type {?} */
        const message = new ResponsiveNavControlMessage(controlCode, navLevel);
        this.controlNavSubject.next(message);
    }
    /**
     * @return {?}
     */
    closeAllNavs() {
        /** @type {?} */
        const message = new ResponsiveNavControlMessage(ResponsiveNavCodes.NAV_CLOSE_ALL, -999);
        this.controlNavSubject.next(message);
    }
}
ResponsiveNavigationService.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */
ResponsiveNavigationService.ctorParameters = () => [];
/** @nocollapse */ ResponsiveNavigationService.ngInjectableDef = i0.defineInjectable({ factory: function ResponsiveNavigationService_Factory() { return new ResponsiveNavigationService(); }, token: ResponsiveNavigationService, providedIn: "root" });
if (false) {
    /** @type {?} */
    ResponsiveNavigationService.prototype.responsiveNavList;
    /**
     * @type {?}
     * @private
     */
    ResponsiveNavigationService.prototype.registerNavSubject;
    /**
     * @type {?}
     * @private
     */
    ResponsiveNavigationService.prototype.controlNavSubject;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzcG9uc2l2ZS1uYXZpZ2F0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJsYXlvdXQvbmF2L3Byb3ZpZGVycy9yZXNwb25zaXZlLW5hdmlnYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFLQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxhQUFhLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRTlDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzdELE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDOztBQUdoRixNQUFNLE9BQU8sMkJBQTJCO0lBYXRDO1FBWk8sc0JBQWlCLEdBQWEsRUFBRSxDQUFDO1FBQ2hDLHVCQUFrQixHQUFHLElBQUksYUFBYSxFQUFZLENBQUM7UUFDbkQsc0JBQWlCLEdBQUcsSUFBSSxPQUFPLEVBQStCLENBQUM7UUFXckUsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsZ0NBQWdDO0lBQ3ZELENBQUM7Ozs7SUFWRCxJQUFJLGNBQWM7UUFDaEIsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDaEQsQ0FBQzs7OztJQUVELElBQUksVUFBVTtRQUNaLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxDQUFDO0lBQy9DLENBQUM7Ozs7O0lBTUQsV0FBVyxDQUFDLFFBQWdCO1FBQzFCLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUMvQyxPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDdkQsQ0FBQzs7Ozs7SUFFRCxlQUFlLENBQUMsUUFBZ0I7UUFDOUIsSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO1lBQ2pELE9BQU8sQ0FBQyxLQUFLLENBQUMseUJBQXlCLEdBQUcsUUFBUSxHQUFHLDBEQUEwRCxDQUFDLENBQUM7WUFDakgsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQzs7Ozs7SUFFRCxhQUFhLENBQUMsUUFBZ0I7O2NBQ3RCLEtBQUssR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQztRQUN0RCxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsRUFBRTtZQUNkLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3hDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7U0FDdEQ7SUFDSCxDQUFDOzs7Ozs7SUFFRCxrQkFBa0IsQ0FBQyxXQUFtQixFQUFFLFFBQWdCOztjQUNoRCxPQUFPLEdBQWdDLElBQUksMkJBQTJCLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQztRQUNuRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7Ozs7SUFFRCxZQUFZOztjQUNKLE9BQU8sR0FBZ0MsSUFBSSwyQkFBMkIsQ0FDMUUsa0JBQWtCLENBQUMsYUFBYSxFQUNoQyxDQUFDLEdBQUcsQ0FDTDtRQUNELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdkMsQ0FBQzs7O1lBckRGLFVBQVUsU0FBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUU7Ozs7Ozs7SUFFaEMsd0RBQXdDOzs7OztJQUN4Qyx5REFBMkQ7Ozs7O0lBQzNELHdEQUF1RSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFJlcGxheVN1YmplY3QsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgUmVzcG9uc2l2ZU5hdkNvZGVzIH0gZnJvbSAnLi4vcmVzcG9uc2l2ZS1uYXYtY29kZXMnO1xuaW1wb3J0IHsgUmVzcG9uc2l2ZU5hdkNvbnRyb2xNZXNzYWdlIH0gZnJvbSAnLi4vcmVzcG9uc2l2ZS1uYXYtY29udHJvbC1tZXNzYWdlJztcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBSZXNwb25zaXZlTmF2aWdhdGlvblNlcnZpY2Uge1xuICBwdWJsaWMgcmVzcG9uc2l2ZU5hdkxpc3Q6IG51bWJlcltdID0gW107XG4gIHByaXZhdGUgcmVnaXN0ZXJOYXZTdWJqZWN0ID0gbmV3IFJlcGxheVN1YmplY3Q8bnVtYmVyW10+KCk7XG4gIHByaXZhdGUgY29udHJvbE5hdlN1YmplY3QgPSBuZXcgU3ViamVjdDxSZXNwb25zaXZlTmF2Q29udHJvbE1lc3NhZ2U+KCk7XG5cbiAgZ2V0IHJlZ2lzdGVyZWROYXZzKCk6IE9ic2VydmFibGU8bnVtYmVyW10+IHtcbiAgICByZXR1cm4gdGhpcy5yZWdpc3Rlck5hdlN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBnZXQgbmF2Q29udHJvbCgpOiBPYnNlcnZhYmxlPFJlc3BvbnNpdmVOYXZDb250cm9sTWVzc2FnZT4ge1xuICAgIHJldHVybiB0aGlzLmNvbnRyb2xOYXZTdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5jbG9zZUFsbE5hdnMoKTsgLy8gV2Ugc3RhcnQgd2l0aCBhbGwgbmF2cyBjbG9zZWRcbiAgfVxuXG4gIHJlZ2lzdGVyTmF2KG5hdkxldmVsOiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoIW5hdkxldmVsIHx8IHRoaXMuaXNOYXZSZWdpc3RlcmVkKG5hdkxldmVsKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnJlc3BvbnNpdmVOYXZMaXN0LnB1c2gobmF2TGV2ZWwpO1xuICAgIHRoaXMucmVnaXN0ZXJOYXZTdWJqZWN0Lm5leHQodGhpcy5yZXNwb25zaXZlTmF2TGlzdCk7XG4gIH1cblxuICBpc05hdlJlZ2lzdGVyZWQobmF2TGV2ZWw6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLnJlc3BvbnNpdmVOYXZMaXN0LmluZGV4T2YobmF2TGV2ZWwpID4gLTEpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ011bHRpcGxlIGNsci1uYXYtbGV2ZWwgJyArIG5hdkxldmVsICsgJyBhdHRyaWJ1dGVzIGZvdW5kLiBQbGVhc2UgbWFrZSBzdXJlIHRoYXQgb25seSBvbmUgZXhpc3RzJyk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdW5yZWdpc3Rlck5hdihuYXZMZXZlbDogbnVtYmVyKSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLnJlc3BvbnNpdmVOYXZMaXN0LmluZGV4T2YobmF2TGV2ZWwpO1xuICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICB0aGlzLnJlc3BvbnNpdmVOYXZMaXN0LnNwbGljZShpbmRleCwgMSk7XG4gICAgICB0aGlzLnJlZ2lzdGVyTmF2U3ViamVjdC5uZXh0KHRoaXMucmVzcG9uc2l2ZU5hdkxpc3QpO1xuICAgIH1cbiAgfVxuXG4gIHNlbmRDb250cm9sTWVzc2FnZShjb250cm9sQ29kZTogc3RyaW5nLCBuYXZMZXZlbDogbnVtYmVyKSB7XG4gICAgY29uc3QgbWVzc2FnZTogUmVzcG9uc2l2ZU5hdkNvbnRyb2xNZXNzYWdlID0gbmV3IFJlc3BvbnNpdmVOYXZDb250cm9sTWVzc2FnZShjb250cm9sQ29kZSwgbmF2TGV2ZWwpO1xuICAgIHRoaXMuY29udHJvbE5hdlN1YmplY3QubmV4dChtZXNzYWdlKTtcbiAgfVxuXG4gIGNsb3NlQWxsTmF2cygpIHtcbiAgICBjb25zdCBtZXNzYWdlOiBSZXNwb25zaXZlTmF2Q29udHJvbE1lc3NhZ2UgPSBuZXcgUmVzcG9uc2l2ZU5hdkNvbnRyb2xNZXNzYWdlKFxuICAgICAgUmVzcG9uc2l2ZU5hdkNvZGVzLk5BVl9DTE9TRV9BTEwsXG4gICAgICAtOTk5XG4gICAgKTtcbiAgICB0aGlzLmNvbnRyb2xOYXZTdWJqZWN0Lm5leHQobWVzc2FnZSk7XG4gIH1cbn1cbiJdfQ==