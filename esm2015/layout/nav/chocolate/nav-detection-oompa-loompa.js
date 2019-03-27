/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { ChangeDetectorRef, Directive, Optional } from '@angular/core';
import { OompaLoompa } from '../../../utils/chocolate/oompa-loompa';
import { ResponsiveNavigationService } from '../providers/responsive-navigation.service';
import { MainContainerWillyWonka } from './main-container-willy-wonka';
export class NavDetectionOompaLoompa extends OompaLoompa {
    /**
     * @param {?} cdr
     * @param {?} willyWonka
     * @param {?} responsiveNavService
     */
    constructor(cdr, willyWonka, responsiveNavService) {
        if (!willyWonka) {
            throw new Error('clr-header should only be used inside of a clr-main-container');
        }
        super(cdr, willyWonka);
        this.responsiveNavService = responsiveNavService;
    }
    // NavDetectionOompaLoompa is the addition of the nav levels
    // Since we support 2 levels, the possibilities are 0, 1 or 3 (1 + 2)
    /**
     * @return {?}
     */
    get flavor() {
        return this.responsiveNavService.responsiveNavList.reduce((/**
         * @param {?} sum
         * @param {?} navLevel
         * @return {?}
         */
        (sum, navLevel) => sum + navLevel), 0);
    }
}
NavDetectionOompaLoompa.decorators = [
    { type: Directive, args: [{ selector: 'clr-header' },] }
];
/** @nocollapse */
NavDetectionOompaLoompa.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: MainContainerWillyWonka, decorators: [{ type: Optional }] },
    { type: ResponsiveNavigationService }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    NavDetectionOompaLoompa.prototype.responsiveNavService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2LWRldGVjdGlvbi1vb21wYS1sb29tcGEuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJsYXlvdXQvbmF2L2Nob2NvbGF0ZS9uYXYtZGV0ZWN0aW9uLW9vbXBhLWxvb21wYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFLQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDcEUsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDekYsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFHdkUsTUFBTSxPQUFPLHVCQUF3QixTQUFRLFdBQVc7Ozs7OztJQUd0RCxZQUNFLEdBQXNCLEVBQ1YsVUFBbUMsRUFDL0Msb0JBQWlEO1FBRWpELElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDZixNQUFNLElBQUksS0FBSyxDQUFDLCtEQUErRCxDQUFDLENBQUM7U0FDbEY7UUFDRCxLQUFLLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxvQkFBb0IsQ0FBQztJQUNuRCxDQUFDOzs7Ozs7SUFJRCxJQUFJLE1BQU07UUFDUixPQUFPLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNOzs7OztRQUFDLENBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUMsR0FBRyxHQUFHLFFBQVEsR0FBRSxDQUFDLENBQUMsQ0FBQztJQUNsRyxDQUFDOzs7WUFwQkYsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRTs7OztZQUw1QixpQkFBaUI7WUFHakIsdUJBQXVCLHVCQVEzQixRQUFRO1lBVEosMkJBQTJCOzs7Ozs7O0lBS2xDLHVEQUEwRCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBEaXJlY3RpdmUsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPb21wYUxvb21wYSB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2Nob2NvbGF0ZS9vb21wYS1sb29tcGEnO1xuaW1wb3J0IHsgUmVzcG9uc2l2ZU5hdmlnYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vcHJvdmlkZXJzL3Jlc3BvbnNpdmUtbmF2aWdhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IE1haW5Db250YWluZXJXaWxseVdvbmthIH0gZnJvbSAnLi9tYWluLWNvbnRhaW5lci13aWxseS13b25rYSc7XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ2Nsci1oZWFkZXInIH0pXG5leHBvcnQgY2xhc3MgTmF2RGV0ZWN0aW9uT29tcGFMb29tcGEgZXh0ZW5kcyBPb21wYUxvb21wYSB7XG4gIHByaXZhdGUgcmVzcG9uc2l2ZU5hdlNlcnZpY2U6IFJlc3BvbnNpdmVOYXZpZ2F0aW9uU2VydmljZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIEBPcHRpb25hbCgpIHdpbGx5V29ua2E6IE1haW5Db250YWluZXJXaWxseVdvbmthLFxuICAgIHJlc3BvbnNpdmVOYXZTZXJ2aWNlOiBSZXNwb25zaXZlTmF2aWdhdGlvblNlcnZpY2VcbiAgKSB7XG4gICAgaWYgKCF3aWxseVdvbmthKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Nsci1oZWFkZXIgc2hvdWxkIG9ubHkgYmUgdXNlZCBpbnNpZGUgb2YgYSBjbHItbWFpbi1jb250YWluZXInKTtcbiAgICB9XG4gICAgc3VwZXIoY2RyLCB3aWxseVdvbmthKTtcbiAgICB0aGlzLnJlc3BvbnNpdmVOYXZTZXJ2aWNlID0gcmVzcG9uc2l2ZU5hdlNlcnZpY2U7XG4gIH1cblxuICAvLyBOYXZEZXRlY3Rpb25Pb21wYUxvb21wYSBpcyB0aGUgYWRkaXRpb24gb2YgdGhlIG5hdiBsZXZlbHNcbiAgLy8gU2luY2Ugd2Ugc3VwcG9ydCAyIGxldmVscywgdGhlIHBvc3NpYmlsaXRpZXMgYXJlIDAsIDEgb3IgMyAoMSArIDIpXG4gIGdldCBmbGF2b3IoKSB7XG4gICAgcmV0dXJuIHRoaXMucmVzcG9uc2l2ZU5hdlNlcnZpY2UucmVzcG9uc2l2ZU5hdkxpc3QucmVkdWNlKChzdW0sIG5hdkxldmVsKSA9PiBzdW0gKyBuYXZMZXZlbCwgMCk7XG4gIH1cbn1cbiJdfQ==