/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * This is the en-001 short locale date format. Setting as default.
 * @type {?}
 */
export const DEFAULT_LOCALE_FORMAT = 'dd/MM/y';
// https://en.wikipedia.org/wiki/Date_format_by_country
/** @type {?} */
export const LITTLE_ENDIAN_REGEX = /d+.+m+.+y+/i;
/** @type {?} */
export const MIDDLE_ENDIAN_REGEX = /m+.+d+.+y+/i;
// No need for BIG_ENDIAN_REGEX because anything that doesn't satisfy the above 2
// is automatically BIG_ENDIAN
/** @type {?} */
export const DELIMITER_REGEX = /d+|m+|y+/i;
/** @type {?} */
export const USER_INPUT_REGEX = /\d+/g;
/** @type {?} */
export const MOBILE_USERAGENT_REGEX = /Mobi/i;
/** @type {?} */
export const RTL_REGEX = /\u200f/g;
/** @type {?} */
export const YEAR = 'YYYY';
/** @type {?} */
export const MONTH = 'MM';
/** @type {?} */
export const DATE = 'DD';
/** @type {?} */
export const LITTLE_ENDIAN = {
    name: 'LITTLE_ENDIAN',
    format: [DATE, MONTH, YEAR],
};
/** @type {?} */
export const MIDDLE_ENDIAN = {
    name: 'MIDDLE_ENDIAN',
    format: [MONTH, DATE, YEAR],
};
/** @type {?} */
export const BIG_ENDIAN = {
    name: 'BIG_ENDIAN',
    format: [YEAR, MONTH, DATE],
};
/** @type {?} */
export const NO_OF_DAYS_IN_A_WEEK = 7;
/** @type {?} */
export const NO_OF_ROWS_IN_CALENDAR_VIEW = 6;
/** @type {?} */
export const TOTAL_DAYS_IN_DAYS_VIEW = NO_OF_DAYS_IN_A_WEEK * NO_OF_ROWS_IN_CALENDAR_VIEW;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnRzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZm9ybXMvZGF0ZXBpY2tlci91dGlscy9jb25zdGFudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQVNBLE1BQU0sT0FBTyxxQkFBcUIsR0FBVyxTQUFTOzs7QUFHdEQsTUFBTSxPQUFPLG1CQUFtQixHQUFXLGFBQWE7O0FBQ3hELE1BQU0sT0FBTyxtQkFBbUIsR0FBVyxhQUFhOzs7O0FBSXhELE1BQU0sT0FBTyxlQUFlLEdBQVcsV0FBVzs7QUFFbEQsTUFBTSxPQUFPLGdCQUFnQixHQUFXLE1BQU07O0FBRTlDLE1BQU0sT0FBTyxzQkFBc0IsR0FBVyxPQUFPOztBQUVyRCxNQUFNLE9BQU8sU0FBUyxHQUFXLFNBQVM7O0FBRTFDLE1BQU0sT0FBTyxJQUFJLEdBQVcsTUFBTTs7QUFDbEMsTUFBTSxPQUFPLEtBQUssR0FBVyxJQUFJOztBQUNqQyxNQUFNLE9BQU8sSUFBSSxHQUFXLElBQUk7O0FBU2hDLE1BQU0sT0FBTyxhQUFhLEdBQTJCO0lBQ25ELElBQUksRUFBRSxlQUFlO0lBQ3JCLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDO0NBQzVCOztBQUVELE1BQU0sT0FBTyxhQUFhLEdBQTJCO0lBQ25ELElBQUksRUFBRSxlQUFlO0lBQ3JCLE1BQU0sRUFBRSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDO0NBQzVCOztBQUVELE1BQU0sT0FBTyxVQUFVLEdBQTJCO0lBQ2hELElBQUksRUFBRSxZQUFZO0lBQ2xCLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDO0NBQzVCOztBQUVELE1BQU0sT0FBTyxvQkFBb0IsR0FBVyxDQUFDOztBQUM3QyxNQUFNLE9BQU8sMkJBQTJCLEdBQVcsQ0FBQzs7QUFDcEQsTUFBTSxPQUFPLHVCQUF1QixHQUFXLG9CQUFvQixHQUFHLDJCQUEyQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuLyoqXG4gKiBUaGlzIGlzIHRoZSBlbi0wMDEgc2hvcnQgbG9jYWxlIGRhdGUgZm9ybWF0LiBTZXR0aW5nIGFzIGRlZmF1bHQuXG4gKi9cbmV4cG9ydCBjb25zdCBERUZBVUxUX0xPQ0FMRV9GT1JNQVQ6IHN0cmluZyA9ICdkZC9NTS95JztcblxuLy8gaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvRGF0ZV9mb3JtYXRfYnlfY291bnRyeVxuZXhwb3J0IGNvbnN0IExJVFRMRV9FTkRJQU5fUkVHRVg6IFJlZ0V4cCA9IC9kKy4rbSsuK3krL2k7XG5leHBvcnQgY29uc3QgTUlERExFX0VORElBTl9SRUdFWDogUmVnRXhwID0gL20rLitkKy4reSsvaTtcbi8vIE5vIG5lZWQgZm9yIEJJR19FTkRJQU5fUkVHRVggYmVjYXVzZSBhbnl0aGluZyB0aGF0IGRvZXNuJ3Qgc2F0aXNmeSB0aGUgYWJvdmUgMlxuLy8gaXMgYXV0b21hdGljYWxseSBCSUdfRU5ESUFOXG5cbmV4cG9ydCBjb25zdCBERUxJTUlURVJfUkVHRVg6IFJlZ0V4cCA9IC9kK3xtK3x5Ky9pO1xuXG5leHBvcnQgY29uc3QgVVNFUl9JTlBVVF9SRUdFWDogUmVnRXhwID0gL1xcZCsvZztcblxuZXhwb3J0IGNvbnN0IE1PQklMRV9VU0VSQUdFTlRfUkVHRVg6IFJlZ0V4cCA9IC9Nb2JpL2k7XG5cbmV4cG9ydCBjb25zdCBSVExfUkVHRVg6IFJlZ0V4cCA9IC9cXHUyMDBmL2c7XG5cbmV4cG9ydCBjb25zdCBZRUFSOiBzdHJpbmcgPSAnWVlZWSc7XG5leHBvcnQgY29uc3QgTU9OVEg6IHN0cmluZyA9ICdNTSc7XG5leHBvcnQgY29uc3QgREFURTogc3RyaW5nID0gJ0REJztcblxuZXhwb3J0IHR5cGUgRm9ybWF0VHlwZSA9ICdMSVRUTEVfRU5ESUFOJyB8ICdNSURETEVfRU5ESUFOJyB8ICdCSUdfRU5ESUFOJztcblxuZXhwb3J0IHR5cGUgSW5wdXREYXRlRGlzcGxheUZvcm1hdCA9IHtcbiAgcmVhZG9ubHkgbmFtZTogRm9ybWF0VHlwZTtcbiAgcmVhZG9ubHkgZm9ybWF0OiBbc3RyaW5nLCBzdHJpbmcsIHN0cmluZ107XG59O1xuXG5leHBvcnQgY29uc3QgTElUVExFX0VORElBTjogSW5wdXREYXRlRGlzcGxheUZvcm1hdCA9IHtcbiAgbmFtZTogJ0xJVFRMRV9FTkRJQU4nLFxuICBmb3JtYXQ6IFtEQVRFLCBNT05USCwgWUVBUl0sXG59O1xuXG5leHBvcnQgY29uc3QgTUlERExFX0VORElBTjogSW5wdXREYXRlRGlzcGxheUZvcm1hdCA9IHtcbiAgbmFtZTogJ01JRERMRV9FTkRJQU4nLFxuICBmb3JtYXQ6IFtNT05USCwgREFURSwgWUVBUl0sXG59O1xuXG5leHBvcnQgY29uc3QgQklHX0VORElBTjogSW5wdXREYXRlRGlzcGxheUZvcm1hdCA9IHtcbiAgbmFtZTogJ0JJR19FTkRJQU4nLFxuICBmb3JtYXQ6IFtZRUFSLCBNT05USCwgREFURV0sXG59O1xuXG5leHBvcnQgY29uc3QgTk9fT0ZfREFZU19JTl9BX1dFRUs6IG51bWJlciA9IDc7XG5leHBvcnQgY29uc3QgTk9fT0ZfUk9XU19JTl9DQUxFTkRBUl9WSUVXOiBudW1iZXIgPSA2O1xuZXhwb3J0IGNvbnN0IFRPVEFMX0RBWVNfSU5fREFZU19WSUVXOiBudW1iZXIgPSBOT19PRl9EQVlTX0lOX0FfV0VFSyAqIE5PX09GX1JPV1NfSU5fQ0FMRU5EQVJfVklFVztcbiJdfQ==