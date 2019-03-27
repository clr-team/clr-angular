/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
var /**
 * @abstract
 */
OompaLoompa = /** @class */ (function () {
    // FIXME: Request Injector once we move to Angular 4.2+, it'll allow easier refactors
    function OompaLoompa(cdr, willyWonka) {
        var _this = this;
        this.subscription = willyWonka.chocolate.subscribe((/**
         * @return {?}
         */
        function () {
            if (_this.latestFlavor !== _this.flavor) {
                cdr.detectChanges();
            }
        }));
    }
    /**
     * @return {?}
     */
    OompaLoompa.prototype.ngAfterContentChecked = /**
     * @return {?}
     */
    function () {
        this.latestFlavor = this.flavor;
    };
    /**
     * @return {?}
     */
    OompaLoompa.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subscription.unsubscribe();
    };
    return OompaLoompa;
}());
/**
 * @abstract
 */
export { OompaLoompa };
if (false) {
    /**
     * @type {?}
     * @private
     */
    OompaLoompa.prototype.subscription;
    /**
     * @type {?}
     * @private
     */
    OompaLoompa.prototype.latestFlavor;
    /**
     * @abstract
     * @return {?}
     */
    OompaLoompa.prototype.flavor = function () { };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib29tcGEtbG9vbXBhLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsidXRpbHMvY2hvY29sYXRlL29vbXBhLWxvb21wYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBU0E7Ozs7SUFDRSxxRkFBcUY7SUFDckYscUJBQVksR0FBc0IsRUFBRSxVQUFzQjtRQUExRCxpQkFNQztRQUxDLElBQUksQ0FBQyxZQUFZLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxTQUFTOzs7UUFBQztZQUNqRCxJQUFJLEtBQUksQ0FBQyxZQUFZLEtBQUssS0FBSSxDQUFDLE1BQU0sRUFBRTtnQkFDckMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDO2FBQ3JCO1FBQ0gsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7O0lBUUQsMkNBQXFCOzs7SUFBckI7UUFDRSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDbEMsQ0FBQzs7OztJQUVELGlDQUFXOzs7SUFBWDtRQUNFLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbEMsQ0FBQztJQUNILGtCQUFDO0FBQUQsQ0FBQyxBQXZCRCxJQXVCQzs7Ozs7Ozs7OztJQWJDLG1DQUFtQzs7Ozs7SUFFbkMsbUNBQTBCOzs7OztJQUUxQiwrQ0FBMkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBBZnRlckNvbnRlbnRDaGVja2VkLCBDaGFuZ2VEZXRlY3RvclJlZiwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFdpbGx5V29ua2EgfSBmcm9tICcuL3dpbGx5LXdvbmthJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE9vbXBhTG9vbXBhIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50Q2hlY2tlZCwgT25EZXN0cm95IHtcbiAgLy8gRklYTUU6IFJlcXVlc3QgSW5qZWN0b3Igb25jZSB3ZSBtb3ZlIHRvIEFuZ3VsYXIgNC4yKywgaXQnbGwgYWxsb3cgZWFzaWVyIHJlZmFjdG9yc1xuICBjb25zdHJ1Y3RvcihjZHI6IENoYW5nZURldGVjdG9yUmVmLCB3aWxseVdvbmthOiBXaWxseVdvbmthKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24gPSB3aWxseVdvbmthLmNob2NvbGF0ZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMubGF0ZXN0Rmxhdm9yICE9PSB0aGlzLmZsYXZvcikge1xuICAgICAgICBjZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICBwcml2YXRlIGxhdGVzdEZsYXZvcjogYW55O1xuXG4gIGFic3RyYWN0IGdldCBmbGF2b3IoKTogYW55O1xuXG4gIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpIHtcbiAgICB0aGlzLmxhdGVzdEZsYXZvciA9IHRoaXMuZmxhdm9yO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIl19