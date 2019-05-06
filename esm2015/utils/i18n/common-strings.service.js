/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { SkipSelf, Optional, forwardRef } from '@angular/core';
import { ClrCommonStrings } from './common-strings.interface';
// @TODO Put the Required type back in when our minimumly supported version of Angular uses
// TS 2.8 or greater (should be Angular 7)
// export class ClrCommonStringsService implements Required<ClrCommonStrings> {
export class ClrCommonStringsService {
    constructor() {
        this.open = 'Open';
        this.close = 'Close';
        this.show = 'Show';
        this.hide = 'Hide';
        this.expand = 'Expand';
        this.collapse = 'Collapse';
        this.more = 'More';
        this.select = 'Select';
        this.selectAll = 'Select All';
        this.previous = 'Previous';
        this.next = 'Next';
        this.current = 'Jump to current';
        this.info = 'Info';
        this.success = 'Success';
        this.warning = 'Warning';
        this.danger = 'Error';
        this.rowActions = 'Available actions';
        this.pickColumns = 'Show or hide columns';
        this.showColumns = 'Show Columns';
    }
}
if (false) {
    /** @type {?} */
    ClrCommonStringsService.prototype.open;
    /** @type {?} */
    ClrCommonStringsService.prototype.close;
    /** @type {?} */
    ClrCommonStringsService.prototype.show;
    /** @type {?} */
    ClrCommonStringsService.prototype.hide;
    /** @type {?} */
    ClrCommonStringsService.prototype.expand;
    /** @type {?} */
    ClrCommonStringsService.prototype.collapse;
    /** @type {?} */
    ClrCommonStringsService.prototype.more;
    /** @type {?} */
    ClrCommonStringsService.prototype.select;
    /** @type {?} */
    ClrCommonStringsService.prototype.selectAll;
    /** @type {?} */
    ClrCommonStringsService.prototype.previous;
    /** @type {?} */
    ClrCommonStringsService.prototype.next;
    /** @type {?} */
    ClrCommonStringsService.prototype.current;
    /** @type {?} */
    ClrCommonStringsService.prototype.info;
    /** @type {?} */
    ClrCommonStringsService.prototype.success;
    /** @type {?} */
    ClrCommonStringsService.prototype.warning;
    /** @type {?} */
    ClrCommonStringsService.prototype.danger;
    /** @type {?} */
    ClrCommonStringsService.prototype.rowActions;
    /** @type {?} */
    ClrCommonStringsService.prototype.pickColumns;
    /** @type {?} */
    ClrCommonStringsService.prototype.showColumns;
}
/**
 * @param {?=} existing
 * @return {?}
 */
export function commonStringsFactory(existing) {
    /** @type {?} */
    const defaults = new ClrCommonStringsService();
    if (existing) {
        return Object.assign({}, defaults, existing);
    }
    return defaults;
}
/** @type {?} */
export const COMMON_STRINGS_PROVIDER = {
    useFactory: commonStringsFactory,
    // We have a circular dependency for now, we can address it later once these
    // tree-shakeable providers have proper documentation.
    deps: [[new Optional(), new SkipSelf(), forwardRef((/**
             * @return {?}
             */
            () => ClrCommonStrings))]],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLXN0cmluZ3Muc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbInV0aWxzL2kxOG4vY29tbW9uLXN0cmluZ3Muc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFLQSxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBc0IsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRW5GLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDOzs7O0FBSzlELE1BQU0sT0FBTyx1QkFBdUI7SUFBcEM7UUFDRSxTQUFJLEdBQUcsTUFBTSxDQUFDO1FBQ2QsVUFBSyxHQUFHLE9BQU8sQ0FBQztRQUNoQixTQUFJLEdBQUcsTUFBTSxDQUFDO1FBQ2QsU0FBSSxHQUFHLE1BQU0sQ0FBQztRQUNkLFdBQU0sR0FBRyxRQUFRLENBQUM7UUFDbEIsYUFBUSxHQUFHLFVBQVUsQ0FBQztRQUN0QixTQUFJLEdBQUcsTUFBTSxDQUFDO1FBQ2QsV0FBTSxHQUFHLFFBQVEsQ0FBQztRQUNsQixjQUFTLEdBQUcsWUFBWSxDQUFDO1FBQ3pCLGFBQVEsR0FBRyxVQUFVLENBQUM7UUFDdEIsU0FBSSxHQUFHLE1BQU0sQ0FBQztRQUNkLFlBQU8sR0FBRyxpQkFBaUIsQ0FBQztRQUM1QixTQUFJLEdBQUcsTUFBTSxDQUFDO1FBQ2QsWUFBTyxHQUFHLFNBQVMsQ0FBQztRQUNwQixZQUFPLEdBQUcsU0FBUyxDQUFDO1FBQ3BCLFdBQU0sR0FBRyxPQUFPLENBQUM7UUFDakIsZUFBVSxHQUFHLG1CQUFtQixDQUFDO1FBQ2pDLGdCQUFXLEdBQUcsc0JBQXNCLENBQUM7UUFDckMsZ0JBQVcsR0FBRyxjQUFjLENBQUM7SUFDL0IsQ0FBQztDQUFBOzs7SUFuQkMsdUNBQWM7O0lBQ2Qsd0NBQWdCOztJQUNoQix1Q0FBYzs7SUFDZCx1Q0FBYzs7SUFDZCx5Q0FBa0I7O0lBQ2xCLDJDQUFzQjs7SUFDdEIsdUNBQWM7O0lBQ2QseUNBQWtCOztJQUNsQiw0Q0FBeUI7O0lBQ3pCLDJDQUFzQjs7SUFDdEIsdUNBQWM7O0lBQ2QsMENBQTRCOztJQUM1Qix1Q0FBYzs7SUFDZCwwQ0FBb0I7O0lBQ3BCLDBDQUFvQjs7SUFDcEIseUNBQWlCOztJQUNqQiw2Q0FBaUM7O0lBQ2pDLDhDQUFxQzs7SUFDckMsOENBQTZCOzs7Ozs7QUFHL0IsTUFBTSxVQUFVLG9CQUFvQixDQUFDLFFBQTJCOztVQUN4RCxRQUFRLEdBQUcsSUFBSSx1QkFBdUIsRUFBRTtJQUM5QyxJQUFJLFFBQVEsRUFBRTtRQUNaLHlCQUFZLFFBQVEsRUFBSyxRQUFRLEVBQUc7S0FDckM7SUFDRCxPQUFPLFFBQVEsQ0FBQztBQUNsQixDQUFDOztBQUVELE1BQU0sT0FBTyx1QkFBdUIsR0FBdUI7SUFDekQsVUFBVSxFQUFFLG9CQUFvQjs7O0lBR2hDLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxRQUFRLEVBQUUsRUFBRSxJQUFJLFFBQVEsRUFBRSxFQUFFLFVBQVU7OztZQUFDLEdBQUcsRUFBRSxDQUFDLGdCQUFnQixFQUFDLENBQUMsQ0FBQztDQUM3RSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IFNraXBTZWxmLCBPcHRpb25hbCwgSW5qZWN0YWJsZVByb3ZpZGVyLCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IENsckNvbW1vblN0cmluZ3MgfSBmcm9tICcuL2NvbW1vbi1zdHJpbmdzLmludGVyZmFjZSc7XG5cbi8vIEBUT0RPIFB1dCB0aGUgUmVxdWlyZWQgdHlwZSBiYWNrIGluIHdoZW4gb3VyIG1pbmltdW1seSBzdXBwb3J0ZWQgdmVyc2lvbiBvZiBBbmd1bGFyIHVzZXNcbi8vIFRTIDIuOCBvciBncmVhdGVyIChzaG91bGQgYmUgQW5ndWxhciA3KVxuLy8gZXhwb3J0IGNsYXNzIENsckNvbW1vblN0cmluZ3NTZXJ2aWNlIGltcGxlbWVudHMgUmVxdWlyZWQ8Q2xyQ29tbW9uU3RyaW5ncz4ge1xuZXhwb3J0IGNsYXNzIENsckNvbW1vblN0cmluZ3NTZXJ2aWNlIGltcGxlbWVudHMgQ2xyQ29tbW9uU3RyaW5ncyB7XG4gIG9wZW4gPSAnT3Blbic7XG4gIGNsb3NlID0gJ0Nsb3NlJztcbiAgc2hvdyA9ICdTaG93JztcbiAgaGlkZSA9ICdIaWRlJztcbiAgZXhwYW5kID0gJ0V4cGFuZCc7XG4gIGNvbGxhcHNlID0gJ0NvbGxhcHNlJztcbiAgbW9yZSA9ICdNb3JlJztcbiAgc2VsZWN0ID0gJ1NlbGVjdCc7XG4gIHNlbGVjdEFsbCA9ICdTZWxlY3QgQWxsJztcbiAgcHJldmlvdXMgPSAnUHJldmlvdXMnO1xuICBuZXh0ID0gJ05leHQnO1xuICBjdXJyZW50ID0gJ0p1bXAgdG8gY3VycmVudCc7XG4gIGluZm8gPSAnSW5mbyc7XG4gIHN1Y2Nlc3MgPSAnU3VjY2Vzcyc7XG4gIHdhcm5pbmcgPSAnV2FybmluZyc7XG4gIGRhbmdlciA9ICdFcnJvcic7XG4gIHJvd0FjdGlvbnMgPSAnQXZhaWxhYmxlIGFjdGlvbnMnO1xuICBwaWNrQ29sdW1ucyA9ICdTaG93IG9yIGhpZGUgY29sdW1ucyc7XG4gIHNob3dDb2x1bW5zID0gJ1Nob3cgQ29sdW1ucyc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21tb25TdHJpbmdzRmFjdG9yeShleGlzdGluZz86IENsckNvbW1vblN0cmluZ3MpOiBDbHJDb21tb25TdHJpbmdzIHtcbiAgY29uc3QgZGVmYXVsdHMgPSBuZXcgQ2xyQ29tbW9uU3RyaW5nc1NlcnZpY2UoKTtcbiAgaWYgKGV4aXN0aW5nKSB7XG4gICAgcmV0dXJuIHsgLi4uZGVmYXVsdHMsIC4uLmV4aXN0aW5nIH07XG4gIH1cbiAgcmV0dXJuIGRlZmF1bHRzO1xufVxuXG5leHBvcnQgY29uc3QgQ09NTU9OX1NUUklOR1NfUFJPVklERVI6IEluamVjdGFibGVQcm92aWRlciA9IHtcbiAgdXNlRmFjdG9yeTogY29tbW9uU3RyaW5nc0ZhY3RvcnksXG4gIC8vIFdlIGhhdmUgYSBjaXJjdWxhciBkZXBlbmRlbmN5IGZvciBub3csIHdlIGNhbiBhZGRyZXNzIGl0IGxhdGVyIG9uY2UgdGhlc2VcbiAgLy8gdHJlZS1zaGFrZWFibGUgcHJvdmlkZXJzIGhhdmUgcHJvcGVyIGRvY3VtZW50YXRpb24uXG4gIGRlcHM6IFtbbmV3IE9wdGlvbmFsKCksIG5ldyBTa2lwU2VsZigpLCBmb3J3YXJkUmVmKCgpID0+IENsckNvbW1vblN0cmluZ3MpXV0sXG59O1xuIl19