/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { ChangeDetectorRef, Directive, Optional } from '@angular/core';
import { OompaLoompa } from '../../../utils/chocolate/oompa-loompa';
import { ResponsiveNavigationService } from '../providers/responsive-navigation.service';
import { MainContainerWillyWonka } from './main-container-willy-wonka';
var NavDetectionOompaLoompa = /** @class */ (function (_super) {
    tslib_1.__extends(NavDetectionOompaLoompa, _super);
    function NavDetectionOompaLoompa(cdr, willyWonka, responsiveNavService) {
        var _this = this;
        if (!willyWonka) {
            throw new Error('clr-header should only be used inside of a clr-main-container');
        }
        _this = _super.call(this, cdr, willyWonka) || this;
        _this.responsiveNavService = responsiveNavService;
        return _this;
    }
    Object.defineProperty(NavDetectionOompaLoompa.prototype, "flavor", {
        // NavDetectionOompaLoompa is the addition of the nav levels
        // Since we support 2 levels, the possibilities are 0, 1 or 3 (1 + 2)
        get: 
        // NavDetectionOompaLoompa is the addition of the nav levels
        // Since we support 2 levels, the possibilities are 0, 1 or 3 (1 + 2)
        /**
         * @return {?}
         */
        function () {
            return this.responsiveNavService.responsiveNavList.reduce((/**
             * @param {?} sum
             * @param {?} navLevel
             * @return {?}
             */
            function (sum, navLevel) { return sum + navLevel; }), 0);
        },
        enumerable: true,
        configurable: true
    });
    NavDetectionOompaLoompa.decorators = [
        { type: Directive, args: [{ selector: 'clr-header' },] }
    ];
    /** @nocollapse */
    NavDetectionOompaLoompa.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: MainContainerWillyWonka, decorators: [{ type: Optional }] },
        { type: ResponsiveNavigationService }
    ]; };
    return NavDetectionOompaLoompa;
}(OompaLoompa));
export { NavDetectionOompaLoompa };
if (false) {
    /**
     * @type {?}
     * @private
     */
    NavDetectionOompaLoompa.prototype.responsiveNavService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2LWRldGVjdGlvbi1vb21wYS1sb29tcGEuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJsYXlvdXQvbmF2L2Nob2NvbGF0ZS9uYXYtZGV0ZWN0aW9uLW9vbXBhLWxvb21wYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQ3pGLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRXZFO0lBQzZDLG1EQUFXO0lBR3RELGlDQUNFLEdBQXNCLEVBQ1YsVUFBbUMsRUFDL0Msb0JBQWlEO1FBSG5ELGlCQVVDO1FBTEMsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNmLE1BQU0sSUFBSSxLQUFLLENBQUMsK0RBQStELENBQUMsQ0FBQztTQUNsRjtRQUNELFFBQUEsa0JBQU0sR0FBRyxFQUFFLFVBQVUsQ0FBQyxTQUFDO1FBQ3ZCLEtBQUksQ0FBQyxvQkFBb0IsR0FBRyxvQkFBb0IsQ0FBQzs7SUFDbkQsQ0FBQztJQUlELHNCQUFJLDJDQUFNO1FBRlYsNERBQTREO1FBQzVELHFFQUFxRTs7Ozs7OztRQUNyRTtZQUNFLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDLGlCQUFpQixDQUFDLE1BQU07Ozs7O1lBQUMsVUFBQyxHQUFHLEVBQUUsUUFBUSxJQUFLLE9BQUEsR0FBRyxHQUFHLFFBQVEsRUFBZCxDQUFjLEdBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbEcsQ0FBQzs7O09BQUE7O2dCQXBCRixTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFOzs7O2dCQUw1QixpQkFBaUI7Z0JBR2pCLHVCQUF1Qix1QkFRM0IsUUFBUTtnQkFUSiwyQkFBMkI7O0lBd0JwQyw4QkFBQztDQUFBLEFBckJELENBQzZDLFdBQVcsR0FvQnZEO1NBcEJZLHVCQUF1Qjs7Ozs7O0lBQ2xDLHVEQUEwRCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBEaXJlY3RpdmUsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPb21wYUxvb21wYSB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2Nob2NvbGF0ZS9vb21wYS1sb29tcGEnO1xuaW1wb3J0IHsgUmVzcG9uc2l2ZU5hdmlnYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vcHJvdmlkZXJzL3Jlc3BvbnNpdmUtbmF2aWdhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IE1haW5Db250YWluZXJXaWxseVdvbmthIH0gZnJvbSAnLi9tYWluLWNvbnRhaW5lci13aWxseS13b25rYSc7XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ2Nsci1oZWFkZXInIH0pXG5leHBvcnQgY2xhc3MgTmF2RGV0ZWN0aW9uT29tcGFMb29tcGEgZXh0ZW5kcyBPb21wYUxvb21wYSB7XG4gIHByaXZhdGUgcmVzcG9uc2l2ZU5hdlNlcnZpY2U6IFJlc3BvbnNpdmVOYXZpZ2F0aW9uU2VydmljZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIEBPcHRpb25hbCgpIHdpbGx5V29ua2E6IE1haW5Db250YWluZXJXaWxseVdvbmthLFxuICAgIHJlc3BvbnNpdmVOYXZTZXJ2aWNlOiBSZXNwb25zaXZlTmF2aWdhdGlvblNlcnZpY2VcbiAgKSB7XG4gICAgaWYgKCF3aWxseVdvbmthKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Nsci1oZWFkZXIgc2hvdWxkIG9ubHkgYmUgdXNlZCBpbnNpZGUgb2YgYSBjbHItbWFpbi1jb250YWluZXInKTtcbiAgICB9XG4gICAgc3VwZXIoY2RyLCB3aWxseVdvbmthKTtcbiAgICB0aGlzLnJlc3BvbnNpdmVOYXZTZXJ2aWNlID0gcmVzcG9uc2l2ZU5hdlNlcnZpY2U7XG4gIH1cblxuICAvLyBOYXZEZXRlY3Rpb25Pb21wYUxvb21wYSBpcyB0aGUgYWRkaXRpb24gb2YgdGhlIG5hdiBsZXZlbHNcbiAgLy8gU2luY2Ugd2Ugc3VwcG9ydCAyIGxldmVscywgdGhlIHBvc3NpYmlsaXRpZXMgYXJlIDAsIDEgb3IgMyAoMSArIDIpXG4gIGdldCBmbGF2b3IoKSB7XG4gICAgcmV0dXJuIHRoaXMucmVzcG9uc2l2ZU5hdlNlcnZpY2UucmVzcG9uc2l2ZU5hdkxpc3QucmVkdWNlKChzdW0sIG5hdkxldmVsKSA9PiBzdW0gKyBuYXZMZXZlbCwgMCk7XG4gIH1cbn1cbiJdfQ==