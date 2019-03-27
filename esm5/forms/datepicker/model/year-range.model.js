/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/** @type {?} */
var YEARS_TO_DISPLAY = 10;
var YearRangeModel = /** @class */ (function () {
    function YearRangeModel(year) {
        this.year = year;
        this.yearRange = [];
        this.generateYearRange();
    }
    Object.defineProperty(YearRangeModel.prototype, "middleYear", {
        /**
         * Gets the number in the middle of the range.
         */
        get: /**
         * Gets the number in the middle of the range.
         * @return {?}
         */
        function () {
            return this.yearRange[Math.floor(this.yearRange.length / 2)];
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Generates the year range based on the year parameter.
     * eg: If 2018 is passed the output will be [2010, 2011, ..., 2019]
     */
    /**
     * Generates the year range based on the year parameter.
     * eg: If 2018 is passed the output will be [2010, 2011, ..., 2019]
     * @private
     * @return {?}
     */
    YearRangeModel.prototype.generateYearRange = /**
     * Generates the year range based on the year parameter.
     * eg: If 2018 is passed the output will be [2010, 2011, ..., 2019]
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var remainder = this.year % YEARS_TO_DISPLAY;
        /** @type {?} */
        var floor = this.year - remainder;
        /** @type {?} */
        var ceil = floor + YEARS_TO_DISPLAY;
        this.yearRange = this.generateRange(floor, ceil);
    };
    /**
     * Function which generate a range of numbers from floor to ceil.
     */
    /**
     * Function which generate a range of numbers from floor to ceil.
     * @private
     * @param {?} floor
     * @param {?} ceil
     * @return {?}
     */
    YearRangeModel.prototype.generateRange = /**
     * Function which generate a range of numbers from floor to ceil.
     * @private
     * @param {?} floor
     * @param {?} ceil
     * @return {?}
     */
    function (floor, ceil) {
        return Array.from({ length: ceil - floor }, (/**
         * @param {?} v
         * @param {?} k
         * @return {?}
         */
        function (v, k) { return k + floor; }));
    };
    /**
     * Generates the YearRangeModel for the next decade.
     */
    /**
     * Generates the YearRangeModel for the next decade.
     * @return {?}
     */
    YearRangeModel.prototype.nextDecade = /**
     * Generates the YearRangeModel for the next decade.
     * @return {?}
     */
    function () {
        return new YearRangeModel(this.year + 10);
    };
    /**
     * Generates the YearRangeModel for the previous decade.
     */
    /**
     * Generates the YearRangeModel for the previous decade.
     * @return {?}
     */
    YearRangeModel.prototype.previousDecade = /**
     * Generates the YearRangeModel for the previous decade.
     * @return {?}
     */
    function () {
        return new YearRangeModel(this.year - 10);
    };
    /**
     * Generates the YearRangeModel for the current decade.
     */
    /**
     * Generates the YearRangeModel for the current decade.
     * @return {?}
     */
    YearRangeModel.prototype.currentDecade = /**
     * Generates the YearRangeModel for the current decade.
     * @return {?}
     */
    function () {
        return new YearRangeModel(new Date().getFullYear());
    };
    /**
     * Checks if the value is in the YearRangeModel.
     */
    /**
     * Checks if the value is in the YearRangeModel.
     * @param {?} value
     * @return {?}
     */
    YearRangeModel.prototype.inRange = /**
     * Checks if the value is in the YearRangeModel.
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return this.yearRange.indexOf(value) > -1;
    };
    return YearRangeModel;
}());
export { YearRangeModel };
if (false) {
    /** @type {?} */
    YearRangeModel.prototype.yearRange;
    /**
     * @type {?}
     * @private
     */
    YearRangeModel.prototype.year;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWVhci1yYW5nZS5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImZvcm1zL2RhdGVwaWNrZXIvbW9kZWwveWVhci1yYW5nZS5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBTU0sZ0JBQWdCLEdBQVcsRUFBRTtBQUVuQztJQUNFLHdCQUE2QixJQUFZO1FBQVosU0FBSSxHQUFKLElBQUksQ0FBUTtRQUl6QyxjQUFTLEdBQWEsRUFBRSxDQUFDO1FBSHZCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFPRCxzQkFBSSxzQ0FBVTtRQUhkOztXQUVHOzs7OztRQUNIO1lBQ0UsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvRCxDQUFDOzs7T0FBQTtJQUVEOzs7T0FHRzs7Ozs7OztJQUNLLDBDQUFpQjs7Ozs7O0lBQXpCOztZQUNRLFNBQVMsR0FBVyxJQUFJLENBQUMsSUFBSSxHQUFHLGdCQUFnQjs7WUFDaEQsS0FBSyxHQUFXLElBQUksQ0FBQyxJQUFJLEdBQUcsU0FBUzs7WUFDckMsSUFBSSxHQUFXLEtBQUssR0FBRyxnQkFBZ0I7UUFDN0MsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQ7O09BRUc7Ozs7Ozs7O0lBQ0ssc0NBQWE7Ozs7Ozs7SUFBckIsVUFBc0IsS0FBYSxFQUFFLElBQVk7UUFDL0MsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksR0FBRyxLQUFLLEVBQUU7Ozs7O1FBQUUsVUFBQyxDQUFDLEVBQUUsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxHQUFHLEtBQUssRUFBVCxDQUFTLEVBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRUQ7O09BRUc7Ozs7O0lBQ0gsbUNBQVU7Ozs7SUFBVjtRQUNFLE9BQU8sSUFBSSxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQ7O09BRUc7Ozs7O0lBQ0gsdUNBQWM7Ozs7SUFBZDtRQUNFLE9BQU8sSUFBSSxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQ7O09BRUc7Ozs7O0lBQ0gsc0NBQWE7Ozs7SUFBYjtRQUNFLE9BQU8sSUFBSSxjQUFjLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRDs7T0FFRzs7Ozs7O0lBQ0gsZ0NBQU87Ozs7O0lBQVAsVUFBUSxLQUFhO1FBQ25CLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUNILHFCQUFDO0FBQUQsQ0FBQyxBQTNERCxJQTJEQzs7OztJQXREQyxtQ0FBeUI7Ozs7O0lBSmIsOEJBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5jb25zdCBZRUFSU19UT19ESVNQTEFZOiBudW1iZXIgPSAxMDtcblxuZXhwb3J0IGNsYXNzIFllYXJSYW5nZU1vZGVsIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSB5ZWFyOiBudW1iZXIpIHtcbiAgICB0aGlzLmdlbmVyYXRlWWVhclJhbmdlKCk7XG4gIH1cblxuICB5ZWFyUmFuZ2U6IG51bWJlcltdID0gW107XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIG51bWJlciBpbiB0aGUgbWlkZGxlIG9mIHRoZSByYW5nZS5cbiAgICovXG4gIGdldCBtaWRkbGVZZWFyKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMueWVhclJhbmdlW01hdGguZmxvb3IodGhpcy55ZWFyUmFuZ2UubGVuZ3RoIC8gMildO1xuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlcyB0aGUgeWVhciByYW5nZSBiYXNlZCBvbiB0aGUgeWVhciBwYXJhbWV0ZXIuXG4gICAqIGVnOiBJZiAyMDE4IGlzIHBhc3NlZCB0aGUgb3V0cHV0IHdpbGwgYmUgWzIwMTAsIDIwMTEsIC4uLiwgMjAxOV1cbiAgICovXG4gIHByaXZhdGUgZ2VuZXJhdGVZZWFyUmFuZ2UoKSB7XG4gICAgY29uc3QgcmVtYWluZGVyOiBudW1iZXIgPSB0aGlzLnllYXIgJSBZRUFSU19UT19ESVNQTEFZO1xuICAgIGNvbnN0IGZsb29yOiBudW1iZXIgPSB0aGlzLnllYXIgLSByZW1haW5kZXI7XG4gICAgY29uc3QgY2VpbDogbnVtYmVyID0gZmxvb3IgKyBZRUFSU19UT19ESVNQTEFZO1xuICAgIHRoaXMueWVhclJhbmdlID0gdGhpcy5nZW5lcmF0ZVJhbmdlKGZsb29yLCBjZWlsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGdW5jdGlvbiB3aGljaCBnZW5lcmF0ZSBhIHJhbmdlIG9mIG51bWJlcnMgZnJvbSBmbG9vciB0byBjZWlsLlxuICAgKi9cbiAgcHJpdmF0ZSBnZW5lcmF0ZVJhbmdlKGZsb29yOiBudW1iZXIsIGNlaWw6IG51bWJlcik6IG51bWJlcltdIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbSh7IGxlbmd0aDogY2VpbCAtIGZsb29yIH0sICh2LCBrKSA9PiBrICsgZmxvb3IpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlcyB0aGUgWWVhclJhbmdlTW9kZWwgZm9yIHRoZSBuZXh0IGRlY2FkZS5cbiAgICovXG4gIG5leHREZWNhZGUoKTogWWVhclJhbmdlTW9kZWwge1xuICAgIHJldHVybiBuZXcgWWVhclJhbmdlTW9kZWwodGhpcy55ZWFyICsgMTApO1xuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlcyB0aGUgWWVhclJhbmdlTW9kZWwgZm9yIHRoZSBwcmV2aW91cyBkZWNhZGUuXG4gICAqL1xuICBwcmV2aW91c0RlY2FkZSgpOiBZZWFyUmFuZ2VNb2RlbCB7XG4gICAgcmV0dXJuIG5ldyBZZWFyUmFuZ2VNb2RlbCh0aGlzLnllYXIgLSAxMCk7XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGVzIHRoZSBZZWFyUmFuZ2VNb2RlbCBmb3IgdGhlIGN1cnJlbnQgZGVjYWRlLlxuICAgKi9cbiAgY3VycmVudERlY2FkZSgpOiBZZWFyUmFuZ2VNb2RlbCB7XG4gICAgcmV0dXJuIG5ldyBZZWFyUmFuZ2VNb2RlbChuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiB0aGUgdmFsdWUgaXMgaW4gdGhlIFllYXJSYW5nZU1vZGVsLlxuICAgKi9cbiAgaW5SYW5nZSh2YWx1ZTogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMueWVhclJhbmdlLmluZGV4T2YodmFsdWUpID4gLTE7XG4gIH1cbn1cbiJdfQ==