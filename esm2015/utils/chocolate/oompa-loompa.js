/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
export class OompaLoompa {
    // FIXME: Request Injector once we move to Angular 4.2+, it'll allow easier refactors
    /**
     * @param {?} cdr
     * @param {?} willyWonka
     */
    constructor(cdr, willyWonka) {
        this.subscription = willyWonka.chocolate.subscribe((/**
         * @return {?}
         */
        () => {
            if (this.latestFlavor !== this.flavor) {
                cdr.detectChanges();
            }
        }));
    }
    /**
     * @return {?}
     */
    ngAfterContentChecked() {
        this.latestFlavor = this.flavor;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib29tcGEtbG9vbXBhLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsidXRpbHMvY2hvY29sYXRlL29vbXBhLWxvb21wYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBU0EsTUFBTSxPQUFnQixXQUFXOzs7Ozs7SUFFL0IsWUFBWSxHQUFzQixFQUFFLFVBQXNCO1FBQ3hELElBQUksQ0FBQyxZQUFZLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxTQUFTOzs7UUFBQyxHQUFHLEVBQUU7WUFDdEQsSUFBSSxJQUFJLENBQUMsWUFBWSxLQUFLLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ3JDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQzthQUNyQjtRQUNILENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7OztJQVFELHFCQUFxQjtRQUNuQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDbEMsQ0FBQzs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2xDLENBQUM7Q0FDRjs7Ozs7O0lBYkMsbUNBQW1DOzs7OztJQUVuQyxtQ0FBMEI7Ozs7O0lBRTFCLCtDQUEyQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IEFmdGVyQ29udGVudENoZWNrZWQsIENoYW5nZURldGVjdG9yUmVmLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgV2lsbHlXb25rYSB9IGZyb20gJy4vd2lsbHktd29ua2EnO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgT29tcGFMb29tcGEgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRDaGVja2VkLCBPbkRlc3Ryb3kge1xuICAvLyBGSVhNRTogUmVxdWVzdCBJbmplY3RvciBvbmNlIHdlIG1vdmUgdG8gQW5ndWxhciA0LjIrLCBpdCdsbCBhbGxvdyBlYXNpZXIgcmVmYWN0b3JzXG4gIGNvbnN0cnVjdG9yKGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIHdpbGx5V29ua2E6IFdpbGx5V29ua2EpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IHdpbGx5V29ua2EuY2hvY29sYXRlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5sYXRlc3RGbGF2b3IgIT09IHRoaXMuZmxhdm9yKSB7XG4gICAgICAgIGNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIHByaXZhdGUgbGF0ZXN0Rmxhdm9yOiBhbnk7XG5cbiAgYWJzdHJhY3QgZ2V0IGZsYXZvcigpOiBhbnk7XG5cbiAgbmdBZnRlckNvbnRlbnRDaGVja2VkKCkge1xuICAgIHRoaXMubGF0ZXN0Rmxhdm9yID0gdGhpcy5mbGF2b3I7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iXX0=