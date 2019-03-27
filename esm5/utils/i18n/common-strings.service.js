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
import { SkipSelf, Optional, forwardRef } from '@angular/core';
import { ClrCommonStrings } from './common-strings.interface';
// @TODO Put the Required type back in when our minimumly supported version of Angular uses
// TS 2.8 or greater (should be Angular 7)
// export class ClrCommonStringsService implements Required<ClrCommonStrings> {
var 
// @TODO Put the Required type back in when our minimumly supported version of Angular uses
// TS 2.8 or greater (should be Angular 7)
// export class ClrCommonStringsService implements Required<ClrCommonStrings> {
ClrCommonStringsService = /** @class */ (function () {
    function ClrCommonStringsService() {
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
    }
    return ClrCommonStringsService;
}());
// @TODO Put the Required type back in when our minimumly supported version of Angular uses
// TS 2.8 or greater (should be Angular 7)
// export class ClrCommonStringsService implements Required<ClrCommonStrings> {
export { ClrCommonStringsService };
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
}
/**
 * @param {?=} existing
 * @return {?}
 */
export function commonStringsFactory(existing) {
    /** @type {?} */
    var defaults = new ClrCommonStringsService();
    if (existing) {
        return tslib_1.__assign({}, defaults, existing);
    }
    return defaults;
}
/** @type {?} */
export var COMMON_STRINGS_PROVIDER = {
    useFactory: commonStringsFactory,
    // We have a circular dependency for now, we can address it later once these
    // tree-shakeable providers have proper documentation.
    deps: [[new Optional(), new SkipSelf(), forwardRef((/**
             * @return {?}
             */
            function () { return ClrCommonStrings; }))]],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLXN0cmluZ3Muc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbInV0aWxzL2kxOG4vY29tbW9uLXN0cmluZ3Muc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQXNCLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVuRixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7OztBQUs5RDs7Ozs7SUFBQTtRQUNFLFNBQUksR0FBRyxNQUFNLENBQUM7UUFDZCxVQUFLLEdBQUcsT0FBTyxDQUFDO1FBQ2hCLFNBQUksR0FBRyxNQUFNLENBQUM7UUFDZCxTQUFJLEdBQUcsTUFBTSxDQUFDO1FBQ2QsV0FBTSxHQUFHLFFBQVEsQ0FBQztRQUNsQixhQUFRLEdBQUcsVUFBVSxDQUFDO1FBQ3RCLFNBQUksR0FBRyxNQUFNLENBQUM7UUFDZCxXQUFNLEdBQUcsUUFBUSxDQUFDO1FBQ2xCLGNBQVMsR0FBRyxZQUFZLENBQUM7UUFDekIsYUFBUSxHQUFHLFVBQVUsQ0FBQztRQUN0QixTQUFJLEdBQUcsTUFBTSxDQUFDO1FBQ2QsWUFBTyxHQUFHLGlCQUFpQixDQUFDO1FBQzVCLFNBQUksR0FBRyxNQUFNLENBQUM7UUFDZCxZQUFPLEdBQUcsU0FBUyxDQUFDO1FBQ3BCLFlBQU8sR0FBRyxTQUFTLENBQUM7UUFDcEIsV0FBTSxHQUFHLE9BQU8sQ0FBQztRQUNqQixlQUFVLEdBQUcsbUJBQW1CLENBQUM7UUFDakMsZ0JBQVcsR0FBRyxzQkFBc0IsQ0FBQztJQUN2QyxDQUFDO0lBQUQsOEJBQUM7QUFBRCxDQUFDLEFBbkJELElBbUJDOzs7Ozs7O0lBbEJDLHVDQUFjOztJQUNkLHdDQUFnQjs7SUFDaEIsdUNBQWM7O0lBQ2QsdUNBQWM7O0lBQ2QseUNBQWtCOztJQUNsQiwyQ0FBc0I7O0lBQ3RCLHVDQUFjOztJQUNkLHlDQUFrQjs7SUFDbEIsNENBQXlCOztJQUN6QiwyQ0FBc0I7O0lBQ3RCLHVDQUFjOztJQUNkLDBDQUE0Qjs7SUFDNUIsdUNBQWM7O0lBQ2QsMENBQW9COztJQUNwQiwwQ0FBb0I7O0lBQ3BCLHlDQUFpQjs7SUFDakIsNkNBQWlDOztJQUNqQyw4Q0FBcUM7Ozs7OztBQUd2QyxNQUFNLFVBQVUsb0JBQW9CLENBQUMsUUFBMkI7O1FBQ3hELFFBQVEsR0FBRyxJQUFJLHVCQUF1QixFQUFFO0lBQzlDLElBQUksUUFBUSxFQUFFO1FBQ1osNEJBQVksUUFBUSxFQUFLLFFBQVEsRUFBRztLQUNyQztJQUNELE9BQU8sUUFBUSxDQUFDO0FBQ2xCLENBQUM7O0FBRUQsTUFBTSxLQUFPLHVCQUF1QixHQUF1QjtJQUN6RCxVQUFVLEVBQUUsb0JBQW9COzs7SUFHaEMsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLFFBQVEsRUFBRSxFQUFFLElBQUksUUFBUSxFQUFFLEVBQUUsVUFBVTs7O1lBQUMsY0FBTSxPQUFBLGdCQUFnQixFQUFoQixDQUFnQixFQUFDLENBQUMsQ0FBQztDQUM3RSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IFNraXBTZWxmLCBPcHRpb25hbCwgSW5qZWN0YWJsZVByb3ZpZGVyLCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IENsckNvbW1vblN0cmluZ3MgfSBmcm9tICcuL2NvbW1vbi1zdHJpbmdzLmludGVyZmFjZSc7XG5cbi8vIEBUT0RPIFB1dCB0aGUgUmVxdWlyZWQgdHlwZSBiYWNrIGluIHdoZW4gb3VyIG1pbmltdW1seSBzdXBwb3J0ZWQgdmVyc2lvbiBvZiBBbmd1bGFyIHVzZXNcbi8vIFRTIDIuOCBvciBncmVhdGVyIChzaG91bGQgYmUgQW5ndWxhciA3KVxuLy8gZXhwb3J0IGNsYXNzIENsckNvbW1vblN0cmluZ3NTZXJ2aWNlIGltcGxlbWVudHMgUmVxdWlyZWQ8Q2xyQ29tbW9uU3RyaW5ncz4ge1xuZXhwb3J0IGNsYXNzIENsckNvbW1vblN0cmluZ3NTZXJ2aWNlIGltcGxlbWVudHMgQ2xyQ29tbW9uU3RyaW5ncyB7XG4gIG9wZW4gPSAnT3Blbic7XG4gIGNsb3NlID0gJ0Nsb3NlJztcbiAgc2hvdyA9ICdTaG93JztcbiAgaGlkZSA9ICdIaWRlJztcbiAgZXhwYW5kID0gJ0V4cGFuZCc7XG4gIGNvbGxhcHNlID0gJ0NvbGxhcHNlJztcbiAgbW9yZSA9ICdNb3JlJztcbiAgc2VsZWN0ID0gJ1NlbGVjdCc7XG4gIHNlbGVjdEFsbCA9ICdTZWxlY3QgQWxsJztcbiAgcHJldmlvdXMgPSAnUHJldmlvdXMnO1xuICBuZXh0ID0gJ05leHQnO1xuICBjdXJyZW50ID0gJ0p1bXAgdG8gY3VycmVudCc7XG4gIGluZm8gPSAnSW5mbyc7XG4gIHN1Y2Nlc3MgPSAnU3VjY2Vzcyc7XG4gIHdhcm5pbmcgPSAnV2FybmluZyc7XG4gIGRhbmdlciA9ICdFcnJvcic7XG4gIHJvd0FjdGlvbnMgPSAnQXZhaWxhYmxlIGFjdGlvbnMnO1xuICBwaWNrQ29sdW1ucyA9ICdTaG93IG9yIGhpZGUgY29sdW1ucyc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21tb25TdHJpbmdzRmFjdG9yeShleGlzdGluZz86IENsckNvbW1vblN0cmluZ3MpOiBDbHJDb21tb25TdHJpbmdzIHtcbiAgY29uc3QgZGVmYXVsdHMgPSBuZXcgQ2xyQ29tbW9uU3RyaW5nc1NlcnZpY2UoKTtcbiAgaWYgKGV4aXN0aW5nKSB7XG4gICAgcmV0dXJuIHsgLi4uZGVmYXVsdHMsIC4uLmV4aXN0aW5nIH07XG4gIH1cbiAgcmV0dXJuIGRlZmF1bHRzO1xufVxuXG5leHBvcnQgY29uc3QgQ09NTU9OX1NUUklOR1NfUFJPVklERVI6IEluamVjdGFibGVQcm92aWRlciA9IHtcbiAgdXNlRmFjdG9yeTogY29tbW9uU3RyaW5nc0ZhY3RvcnksXG4gIC8vIFdlIGhhdmUgYSBjaXJjdWxhciBkZXBlbmRlbmN5IGZvciBub3csIHdlIGNhbiBhZGRyZXNzIGl0IGxhdGVyIG9uY2UgdGhlc2VcbiAgLy8gdHJlZS1zaGFrZWFibGUgcHJvdmlkZXJzIGhhdmUgcHJvcGVyIGRvY3VtZW50YXRpb24uXG4gIGRlcHM6IFtbbmV3IE9wdGlvbmFsKCksIG5ldyBTa2lwU2VsZigpLCBmb3J3YXJkUmVmKCgpID0+IENsckNvbW1vblN0cmluZ3MpXV0sXG59O1xuIl19