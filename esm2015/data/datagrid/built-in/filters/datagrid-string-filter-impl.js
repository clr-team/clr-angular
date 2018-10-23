/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Subject } from 'rxjs';
/**
 * @template T
 */
export class DatagridStringFilterImpl {
    /**
     * @param {?} filterFn
     */
    constructor(filterFn) {
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
    // We do not want to expose the Subject itself, but the Observable which is read-only
    /**
     * @return {?}
     */
    get changes() {
        return this._changes.asObservable();
    }
    /**
     * @return {?}
     */
    get value() {
        return this._rawValue;
    }
    /**
     * @return {?}
     */
    get lowerCaseValue() {
        return this._lowerCaseValue;
    }
    /**
     * Common setter for the input value
     * @param {?} value
     * @return {?}
     */
    set value(value) {
        if (!value) {
            value = '';
        }
        if (value !== this._rawValue) {
            this._rawValue = value;
            this._lowerCaseValue = value.toLowerCase().trim();
            this._changes.next(value);
        }
    }
    /**
     * Indicates if the filter is currently active, meaning the input is not empty
     * @return {?}
     */
    isActive() {
        return !!this.value;
    }
    /**
     * Tests if an item matches a search text
     * @param {?} item
     * @return {?}
     */
    accepts(item) {
        // We always test with the lowercase value of the input, to stay case insensitive
        return this.filterFn.accepts(item, this.lowerCaseValue);
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtc3RyaW5nLWZpbHRlci1pbXBsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9idWlsdC1pbi9maWx0ZXJzL2RhdGFncmlkLXN0cmluZy1maWx0ZXItaW1wbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBTUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQzs7OztBQUkvQixNQUFNLE9BQU8sd0JBQXdCOzs7O0lBQ25DLFlBQW1CLFFBQTZDO1FBQTdDLGFBQVEsR0FBUixRQUFRLENBQXFDOzs7O1FBS3hELGFBQVEsR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFDOzs7O1FBU2pDLGNBQVMsR0FBVyxFQUFFLENBQUM7Ozs7UUFPdkIsb0JBQWUsR0FBVyxFQUFFLENBQUM7SUFyQjhCLENBQUM7Ozs7O0lBT3BFLElBQVcsT0FBTztRQUNoQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDdEMsQ0FBQzs7OztJQU1ELElBQVcsS0FBSztRQUNkLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDOzs7O0lBS0QsSUFBVyxjQUFjO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztJQUM5QixDQUFDOzs7Ozs7SUFJRCxJQUFXLEtBQUssQ0FBQyxLQUFhO1FBQzVCLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDVixLQUFLLEdBQUcsRUFBRSxDQUFDO1NBQ1o7UUFDRCxJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQzVCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2xELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzNCO0lBQ0gsQ0FBQzs7Ozs7SUFLTSxRQUFRO1FBQ2IsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUN0QixDQUFDOzs7Ozs7SUFLTSxPQUFPLENBQUMsSUFBTztRQUNwQixpRkFBaUY7UUFDakYsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQzFELENBQUM7Q0FDRjs7Ozs7O0lBaERDLDRDQUF5Qzs7Ozs7SUFTekMsNkNBQStCOzs7OztJQU8vQixtREFBcUM7O0lBckJ6Qiw0Q0FBb0QiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBDbHJEYXRhZ3JpZEZpbHRlckludGVyZmFjZSB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvZmlsdGVyLmludGVyZmFjZSc7XG5pbXBvcnQgeyBDbHJEYXRhZ3JpZFN0cmluZ0ZpbHRlckludGVyZmFjZSB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvc3RyaW5nLWZpbHRlci5pbnRlcmZhY2UnO1xuXG5leHBvcnQgY2xhc3MgRGF0YWdyaWRTdHJpbmdGaWx0ZXJJbXBsPFQgPSBhbnk+IGltcGxlbWVudHMgQ2xyRGF0YWdyaWRGaWx0ZXJJbnRlcmZhY2U8VD4ge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZmlsdGVyRm46IENsckRhdGFncmlkU3RyaW5nRmlsdGVySW50ZXJmYWNlPFQ+KSB7fVxuXG4gIC8qKlxuICAgKiBUaGUgT2JzZXJ2YWJsZSByZXF1aXJlZCBhcyBwYXJ0IG9mIHRoZSBGaWx0ZXIgaW50ZXJmYWNlXG4gICAqL1xuICBwcml2YXRlIF9jaGFuZ2VzID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuICAvLyBXZSBkbyBub3Qgd2FudCB0byBleHBvc2UgdGhlIFN1YmplY3QgaXRzZWxmLCBidXQgdGhlIE9ic2VydmFibGUgd2hpY2ggaXMgcmVhZC1vbmx5XG4gIHB1YmxpYyBnZXQgY2hhbmdlcygpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLl9jaGFuZ2VzLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJhdyBpbnB1dCB2YWx1ZVxuICAgKi9cbiAgcHJpdmF0ZSBfcmF3VmFsdWU6IHN0cmluZyA9ICcnO1xuICBwdWJsaWMgZ2V0IHZhbHVlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3Jhd1ZhbHVlO1xuICB9XG4gIC8qKlxuICAgKiBJbnB1dCB2YWx1ZSBjb252ZXJ0ZWQgdG8gbG93ZXJjYXNlXG4gICAqL1xuICBwcml2YXRlIF9sb3dlckNhc2VWYWx1ZTogc3RyaW5nID0gJyc7XG4gIHB1YmxpYyBnZXQgbG93ZXJDYXNlVmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2xvd2VyQ2FzZVZhbHVlO1xuICB9XG4gIC8qKlxuICAgKiBDb21tb24gc2V0dGVyIGZvciB0aGUgaW5wdXQgdmFsdWVcbiAgICovXG4gIHB1YmxpYyBzZXQgdmFsdWUodmFsdWU6IHN0cmluZykge1xuICAgIGlmICghdmFsdWUpIHtcbiAgICAgIHZhbHVlID0gJyc7XG4gICAgfVxuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5fcmF3VmFsdWUpIHtcbiAgICAgIHRoaXMuX3Jhd1ZhbHVlID0gdmFsdWU7XG4gICAgICB0aGlzLl9sb3dlckNhc2VWYWx1ZSA9IHZhbHVlLnRvTG93ZXJDYXNlKCkudHJpbSgpO1xuICAgICAgdGhpcy5fY2hhbmdlcy5uZXh0KHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSW5kaWNhdGVzIGlmIHRoZSBmaWx0ZXIgaXMgY3VycmVudGx5IGFjdGl2ZSwgbWVhbmluZyB0aGUgaW5wdXQgaXMgbm90IGVtcHR5XG4gICAqL1xuICBwdWJsaWMgaXNBY3RpdmUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy52YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUZXN0cyBpZiBhbiBpdGVtIG1hdGNoZXMgYSBzZWFyY2ggdGV4dFxuICAgKi9cbiAgcHVibGljIGFjY2VwdHMoaXRlbTogVCk6IGJvb2xlYW4ge1xuICAgIC8vIFdlIGFsd2F5cyB0ZXN0IHdpdGggdGhlIGxvd2VyY2FzZSB2YWx1ZSBvZiB0aGUgaW5wdXQsIHRvIHN0YXkgY2FzZSBpbnNlbnNpdGl2ZVxuICAgIHJldHVybiB0aGlzLmZpbHRlckZuLmFjY2VwdHMoaXRlbSwgdGhpcy5sb3dlckNhc2VWYWx1ZSk7XG4gIH1cbn1cbiJdfQ==