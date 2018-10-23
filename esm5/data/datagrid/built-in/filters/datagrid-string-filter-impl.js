/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Subject } from 'rxjs';
/**
 * @template T
 */
var /**
 * @template T
 */
DatagridStringFilterImpl = /** @class */ (function () {
    function DatagridStringFilterImpl(filterFn) {
        this.filterFn = filterFn;
        /**
         * The Observable required as part of the Filter interface
         */
        this._changes = new Subject();
        /**
         * Raw input value
         */
        this._rawValue = '';
        /**
         * Input value converted to lowercase
         */
        this._lowerCaseValue = '';
    }
    Object.defineProperty(DatagridStringFilterImpl.prototype, "changes", {
        // We do not want to expose the Subject itself, but the Observable which is read-only
        get: 
        // We do not want to expose the Subject itself, but the Observable which is read-only
        /**
         * @return {?}
         */
        function () {
            return this._changes.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatagridStringFilterImpl.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () {
            return this._rawValue;
        },
        /**
         * Common setter for the input value
         */
        set: /**
         * Common setter for the input value
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (!value) {
                value = '';
            }
            if (value !== this._rawValue) {
                this._rawValue = value;
                this._lowerCaseValue = value.toLowerCase().trim();
                this._changes.next(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatagridStringFilterImpl.prototype, "lowerCaseValue", {
        get: /**
         * @return {?}
         */
        function () {
            return this._lowerCaseValue;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Indicates if the filter is currently active, meaning the input is not empty
     */
    /**
     * Indicates if the filter is currently active, meaning the input is not empty
     * @return {?}
     */
    DatagridStringFilterImpl.prototype.isActive = /**
     * Indicates if the filter is currently active, meaning the input is not empty
     * @return {?}
     */
    function () {
        return !!this.value;
    };
    /**
     * Tests if an item matches a search text
     */
    /**
     * Tests if an item matches a search text
     * @param {?} item
     * @return {?}
     */
    DatagridStringFilterImpl.prototype.accepts = /**
     * Tests if an item matches a search text
     * @param {?} item
     * @return {?}
     */
    function (item) {
        // We always test with the lowercase value of the input, to stay case insensitive
        return this.filterFn.accepts(item, this.lowerCaseValue);
    };
    return DatagridStringFilterImpl;
}());
/**
 * @template T
 */
export { DatagridStringFilterImpl };
if (false) {
    /**
     * The Observable required as part of the Filter interface
     * @type {?}
     */
    DatagridStringFilterImpl.prototype._changes;
    /**
     * Raw input value
     * @type {?}
     */
    DatagridStringFilterImpl.prototype._rawValue;
    /**
     * Input value converted to lowercase
     * @type {?}
     */
    DatagridStringFilterImpl.prototype._lowerCaseValue;
    /** @type {?} */
    DatagridStringFilterImpl.prototype.filterFn;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtc3RyaW5nLWZpbHRlci1pbXBsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9idWlsdC1pbi9maWx0ZXJzL2RhdGFncmlkLXN0cmluZy1maWx0ZXItaW1wbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBTUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQzs7OztBQUkvQjs7OztJQUNFLGtDQUFtQixRQUE2QztRQUE3QyxhQUFRLEdBQVIsUUFBUSxDQUFxQzs7OztRQUt4RCxhQUFRLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQzs7OztRQVNqQyxjQUFTLEdBQVcsRUFBRSxDQUFDOzs7O1FBT3ZCLG9CQUFlLEdBQVcsRUFBRSxDQUFDO0lBckI4QixDQUFDO0lBT3BFLHNCQUFXLDZDQUFPO1FBRGxCLHFGQUFxRjs7Ozs7O1FBQ3JGO1lBQ0UsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3RDLENBQUM7OztPQUFBO0lBTUQsc0JBQVcsMkNBQUs7Ozs7UUFBaEI7WUFDRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDeEIsQ0FBQztRQVFEOztXQUVHOzs7Ozs7UUFDSCxVQUFpQixLQUFhO1lBQzVCLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1YsS0FBSyxHQUFHLEVBQUUsQ0FBQzthQUNaO1lBQ0QsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLFNBQVMsRUFBRTtnQkFDNUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNsRCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUMzQjtRQUNILENBQUM7OztPQXBCQTtJQUtELHNCQUFXLG9EQUFjOzs7O1FBQXpCO1lBQ0UsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDO1FBQzlCLENBQUM7OztPQUFBO0lBZUQ7O09BRUc7Ozs7O0lBQ0ksMkNBQVE7Ozs7SUFBZjtRQUNFLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQUVEOztPQUVHOzs7Ozs7SUFDSSwwQ0FBTzs7Ozs7SUFBZCxVQUFlLElBQU87UUFDcEIsaUZBQWlGO1FBQ2pGLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBQ0gsK0JBQUM7QUFBRCxDQUFDLEFBdERELElBc0RDOzs7Ozs7Ozs7O0lBaERDLDRDQUF5Qzs7Ozs7SUFTekMsNkNBQStCOzs7OztJQU8vQixtREFBcUM7O0lBckJ6Qiw0Q0FBb0QiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBDbHJEYXRhZ3JpZEZpbHRlckludGVyZmFjZSB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvZmlsdGVyLmludGVyZmFjZSc7XG5pbXBvcnQgeyBDbHJEYXRhZ3JpZFN0cmluZ0ZpbHRlckludGVyZmFjZSB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvc3RyaW5nLWZpbHRlci5pbnRlcmZhY2UnO1xuXG5leHBvcnQgY2xhc3MgRGF0YWdyaWRTdHJpbmdGaWx0ZXJJbXBsPFQgPSBhbnk+IGltcGxlbWVudHMgQ2xyRGF0YWdyaWRGaWx0ZXJJbnRlcmZhY2U8VD4ge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZmlsdGVyRm46IENsckRhdGFncmlkU3RyaW5nRmlsdGVySW50ZXJmYWNlPFQ+KSB7fVxuXG4gIC8qKlxuICAgKiBUaGUgT2JzZXJ2YWJsZSByZXF1aXJlZCBhcyBwYXJ0IG9mIHRoZSBGaWx0ZXIgaW50ZXJmYWNlXG4gICAqL1xuICBwcml2YXRlIF9jaGFuZ2VzID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuICAvLyBXZSBkbyBub3Qgd2FudCB0byBleHBvc2UgdGhlIFN1YmplY3QgaXRzZWxmLCBidXQgdGhlIE9ic2VydmFibGUgd2hpY2ggaXMgcmVhZC1vbmx5XG4gIHB1YmxpYyBnZXQgY2hhbmdlcygpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLl9jaGFuZ2VzLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJhdyBpbnB1dCB2YWx1ZVxuICAgKi9cbiAgcHJpdmF0ZSBfcmF3VmFsdWU6IHN0cmluZyA9ICcnO1xuICBwdWJsaWMgZ2V0IHZhbHVlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3Jhd1ZhbHVlO1xuICB9XG4gIC8qKlxuICAgKiBJbnB1dCB2YWx1ZSBjb252ZXJ0ZWQgdG8gbG93ZXJjYXNlXG4gICAqL1xuICBwcml2YXRlIF9sb3dlckNhc2VWYWx1ZTogc3RyaW5nID0gJyc7XG4gIHB1YmxpYyBnZXQgbG93ZXJDYXNlVmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2xvd2VyQ2FzZVZhbHVlO1xuICB9XG4gIC8qKlxuICAgKiBDb21tb24gc2V0dGVyIGZvciB0aGUgaW5wdXQgdmFsdWVcbiAgICovXG4gIHB1YmxpYyBzZXQgdmFsdWUodmFsdWU6IHN0cmluZykge1xuICAgIGlmICghdmFsdWUpIHtcbiAgICAgIHZhbHVlID0gJyc7XG4gICAgfVxuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5fcmF3VmFsdWUpIHtcbiAgICAgIHRoaXMuX3Jhd1ZhbHVlID0gdmFsdWU7XG4gICAgICB0aGlzLl9sb3dlckNhc2VWYWx1ZSA9IHZhbHVlLnRvTG93ZXJDYXNlKCkudHJpbSgpO1xuICAgICAgdGhpcy5fY2hhbmdlcy5uZXh0KHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSW5kaWNhdGVzIGlmIHRoZSBmaWx0ZXIgaXMgY3VycmVudGx5IGFjdGl2ZSwgbWVhbmluZyB0aGUgaW5wdXQgaXMgbm90IGVtcHR5XG4gICAqL1xuICBwdWJsaWMgaXNBY3RpdmUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy52YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUZXN0cyBpZiBhbiBpdGVtIG1hdGNoZXMgYSBzZWFyY2ggdGV4dFxuICAgKi9cbiAgcHVibGljIGFjY2VwdHMoaXRlbTogVCk6IGJvb2xlYW4ge1xuICAgIC8vIFdlIGFsd2F5cyB0ZXN0IHdpdGggdGhlIGxvd2VyY2FzZSB2YWx1ZSBvZiB0aGUgaW5wdXQsIHRvIHN0YXkgY2FzZSBpbnNlbnNpdGl2ZVxuICAgIHJldHVybiB0aGlzLmZpbHRlckZuLmFjY2VwdHMoaXRlbSwgdGhpcy5sb3dlckNhc2VWYWx1ZSk7XG4gIH1cbn1cbiJdfQ==