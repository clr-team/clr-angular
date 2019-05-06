/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
        this.showColumns = 'Show Columns';
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
    /** @type {?} */
    ClrCommonStringsService.prototype.showColumns;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLXN0cmluZ3Muc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbInV0aWxzL2kxOG4vY29tbW9uLXN0cmluZ3Muc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQXNCLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVuRixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7OztBQUs5RDs7Ozs7SUFBQTtRQUNFLFNBQUksR0FBRyxNQUFNLENBQUM7UUFDZCxVQUFLLEdBQUcsT0FBTyxDQUFDO1FBQ2hCLFNBQUksR0FBRyxNQUFNLENBQUM7UUFDZCxTQUFJLEdBQUcsTUFBTSxDQUFDO1FBQ2QsV0FBTSxHQUFHLFFBQVEsQ0FBQztRQUNsQixhQUFRLEdBQUcsVUFBVSxDQUFDO1FBQ3RCLFNBQUksR0FBRyxNQUFNLENBQUM7UUFDZCxXQUFNLEdBQUcsUUFBUSxDQUFDO1FBQ2xCLGNBQVMsR0FBRyxZQUFZLENBQUM7UUFDekIsYUFBUSxHQUFHLFVBQVUsQ0FBQztRQUN0QixTQUFJLEdBQUcsTUFBTSxDQUFDO1FBQ2QsWUFBTyxHQUFHLGlCQUFpQixDQUFDO1FBQzVCLFNBQUksR0FBRyxNQUFNLENBQUM7UUFDZCxZQUFPLEdBQUcsU0FBUyxDQUFDO1FBQ3BCLFlBQU8sR0FBRyxTQUFTLENBQUM7UUFDcEIsV0FBTSxHQUFHLE9BQU8sQ0FBQztRQUNqQixlQUFVLEdBQUcsbUJBQW1CLENBQUM7UUFDakMsZ0JBQVcsR0FBRyxzQkFBc0IsQ0FBQztRQUNyQyxnQkFBVyxHQUFHLGNBQWMsQ0FBQztJQUMvQixDQUFDO0lBQUQsOEJBQUM7QUFBRCxDQUFDLEFBcEJELElBb0JDOzs7Ozs7O0lBbkJDLHVDQUFjOztJQUNkLHdDQUFnQjs7SUFDaEIsdUNBQWM7O0lBQ2QsdUNBQWM7O0lBQ2QseUNBQWtCOztJQUNsQiwyQ0FBc0I7O0lBQ3RCLHVDQUFjOztJQUNkLHlDQUFrQjs7SUFDbEIsNENBQXlCOztJQUN6QiwyQ0FBc0I7O0lBQ3RCLHVDQUFjOztJQUNkLDBDQUE0Qjs7SUFDNUIsdUNBQWM7O0lBQ2QsMENBQW9COztJQUNwQiwwQ0FBb0I7O0lBQ3BCLHlDQUFpQjs7SUFDakIsNkNBQWlDOztJQUNqQyw4Q0FBcUM7O0lBQ3JDLDhDQUE2Qjs7Ozs7O0FBRy9CLE1BQU0sVUFBVSxvQkFBb0IsQ0FBQyxRQUEyQjs7UUFDeEQsUUFBUSxHQUFHLElBQUksdUJBQXVCLEVBQUU7SUFDOUMsSUFBSSxRQUFRLEVBQUU7UUFDWiw0QkFBWSxRQUFRLEVBQUssUUFBUSxFQUFHO0tBQ3JDO0lBQ0QsT0FBTyxRQUFRLENBQUM7QUFDbEIsQ0FBQzs7QUFFRCxNQUFNLEtBQU8sdUJBQXVCLEdBQXVCO0lBQ3pELFVBQVUsRUFBRSxvQkFBb0I7OztJQUdoQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksUUFBUSxFQUFFLEVBQUUsSUFBSSxRQUFRLEVBQUUsRUFBRSxVQUFVOzs7WUFBQyxjQUFNLE9BQUEsZ0JBQWdCLEVBQWhCLENBQWdCLEVBQUMsQ0FBQyxDQUFDO0NBQzdFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgU2tpcFNlbGYsIE9wdGlvbmFsLCBJbmplY3RhYmxlUHJvdmlkZXIsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQ2xyQ29tbW9uU3RyaW5ncyB9IGZyb20gJy4vY29tbW9uLXN0cmluZ3MuaW50ZXJmYWNlJztcblxuLy8gQFRPRE8gUHV0IHRoZSBSZXF1aXJlZCB0eXBlIGJhY2sgaW4gd2hlbiBvdXIgbWluaW11bWx5IHN1cHBvcnRlZCB2ZXJzaW9uIG9mIEFuZ3VsYXIgdXNlc1xuLy8gVFMgMi44IG9yIGdyZWF0ZXIgKHNob3VsZCBiZSBBbmd1bGFyIDcpXG4vLyBleHBvcnQgY2xhc3MgQ2xyQ29tbW9uU3RyaW5nc1NlcnZpY2UgaW1wbGVtZW50cyBSZXF1aXJlZDxDbHJDb21tb25TdHJpbmdzPiB7XG5leHBvcnQgY2xhc3MgQ2xyQ29tbW9uU3RyaW5nc1NlcnZpY2UgaW1wbGVtZW50cyBDbHJDb21tb25TdHJpbmdzIHtcbiAgb3BlbiA9ICdPcGVuJztcbiAgY2xvc2UgPSAnQ2xvc2UnO1xuICBzaG93ID0gJ1Nob3cnO1xuICBoaWRlID0gJ0hpZGUnO1xuICBleHBhbmQgPSAnRXhwYW5kJztcbiAgY29sbGFwc2UgPSAnQ29sbGFwc2UnO1xuICBtb3JlID0gJ01vcmUnO1xuICBzZWxlY3QgPSAnU2VsZWN0JztcbiAgc2VsZWN0QWxsID0gJ1NlbGVjdCBBbGwnO1xuICBwcmV2aW91cyA9ICdQcmV2aW91cyc7XG4gIG5leHQgPSAnTmV4dCc7XG4gIGN1cnJlbnQgPSAnSnVtcCB0byBjdXJyZW50JztcbiAgaW5mbyA9ICdJbmZvJztcbiAgc3VjY2VzcyA9ICdTdWNjZXNzJztcbiAgd2FybmluZyA9ICdXYXJuaW5nJztcbiAgZGFuZ2VyID0gJ0Vycm9yJztcbiAgcm93QWN0aW9ucyA9ICdBdmFpbGFibGUgYWN0aW9ucyc7XG4gIHBpY2tDb2x1bW5zID0gJ1Nob3cgb3IgaGlkZSBjb2x1bW5zJztcbiAgc2hvd0NvbHVtbnMgPSAnU2hvdyBDb2x1bW5zJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbW1vblN0cmluZ3NGYWN0b3J5KGV4aXN0aW5nPzogQ2xyQ29tbW9uU3RyaW5ncyk6IENsckNvbW1vblN0cmluZ3Mge1xuICBjb25zdCBkZWZhdWx0cyA9IG5ldyBDbHJDb21tb25TdHJpbmdzU2VydmljZSgpO1xuICBpZiAoZXhpc3RpbmcpIHtcbiAgICByZXR1cm4geyAuLi5kZWZhdWx0cywgLi4uZXhpc3RpbmcgfTtcbiAgfVxuICByZXR1cm4gZGVmYXVsdHM7XG59XG5cbmV4cG9ydCBjb25zdCBDT01NT05fU1RSSU5HU19QUk9WSURFUjogSW5qZWN0YWJsZVByb3ZpZGVyID0ge1xuICB1c2VGYWN0b3J5OiBjb21tb25TdHJpbmdzRmFjdG9yeSxcbiAgLy8gV2UgaGF2ZSBhIGNpcmN1bGFyIGRlcGVuZGVuY3kgZm9yIG5vdywgd2UgY2FuIGFkZHJlc3MgaXQgbGF0ZXIgb25jZSB0aGVzZVxuICAvLyB0cmVlLXNoYWtlYWJsZSBwcm92aWRlcnMgaGF2ZSBwcm9wZXIgZG9jdW1lbnRhdGlvbi5cbiAgZGVwczogW1tuZXcgT3B0aW9uYWwoKSwgbmV3IFNraXBTZWxmKCksIGZvcndhcmRSZWYoKCkgPT4gQ2xyQ29tbW9uU3RyaW5ncyldXSxcbn07XG4iXX0=