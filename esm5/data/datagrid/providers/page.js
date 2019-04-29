/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { StateDebouncer } from './state-debouncer.provider';
var Page = /** @class */ (function () {
    function Page(stateDebouncer) {
        this.stateDebouncer = stateDebouncer;
        this.activated = false;
        /**
         * Page size, a value of 0 means no pagination
         */
        this._size = 0;
        /**
         * The Observable that lets other classes subscribe to page changes
         */
        this._change = new Subject();
        this._sizeChange = new Subject();
        /**
         * Current page
         */
        this._current = 1;
    }
    Object.defineProperty(Page.prototype, "size", {
        get: /**
         * @return {?}
         */
        function () {
            return this._size;
        },
        set: /**
         * @param {?} size
         * @return {?}
         */
        function (size) {
            /** @type {?} */
            var oldSize = this._size;
            if (size !== oldSize) {
                this.stateDebouncer.changeStart();
                this._size = size;
                if (size === 0) {
                    this._current = 1;
                }
                else {
                    // Yeap. That's the formula to keep the first item from the old page still
                    // displayed in the new one.
                    this._current = Math.floor(oldSize / size * (this._current - 1)) + 1;
                }
                // We always emit an event even if the current page index didn't change, because
                // the size changing means the items inside the page are different
                this._change.next(this._current);
                this._sizeChange.next(this._size);
                this.stateDebouncer.changeDone();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Page.prototype, "totalItems", {
        get: /**
         * @return {?}
         */
        function () {
            return this._totalItems || 0; // remains 0 if not set to avoid breaking change
        },
        set: /**
         * @param {?} total
         * @return {?}
         */
        function (total) {
            this._totalItems = total;
            // If we have less items than before, we might need to change the current page
            if (this.current > this.last) {
                this.current = this.last;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Page.prototype, "last", {
        get: /**
         * @return {?}
         */
        function () {
            if (this._last) {
                return this._last;
            }
            // If the last page isn't known, we compute it from the last item's index
            if (this.size > 0 && this.totalItems) {
                return Math.ceil(this.totalItems / this.size);
            }
            return 1;
        },
        set: /**
         * @param {?} page
         * @return {?}
         */
        function (page) {
            this._last = page;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Page.prototype, "change", {
        // We do not want to expose the Subject itself, but the Observable which is read-only
        get: 
        // We do not want to expose the Subject itself, but the Observable which is read-only
        /**
         * @return {?}
         */
        function () {
            return this._change.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Page.prototype, "sizeChange", {
        get: /**
         * @return {?}
         */
        function () {
            return this._sizeChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Page.prototype, "current", {
        get: /**
         * @return {?}
         */
        function () {
            return this._current;
        },
        set: /**
         * @param {?} page
         * @return {?}
         */
        function (page) {
            if (page !== this._current) {
                this.stateDebouncer.changeStart();
                this._current = page;
                this._change.next(page);
                this.stateDebouncer.changeDone();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Moves to the previous page if it exists
     */
    /**
     * Moves to the previous page if it exists
     * @return {?}
     */
    Page.prototype.previous = /**
     * Moves to the previous page if it exists
     * @return {?}
     */
    function () {
        if (this.current > 1) {
            this.current--;
        }
    };
    /**
     * Moves to the next page if it exists
     */
    /**
     * Moves to the next page if it exists
     * @return {?}
     */
    Page.prototype.next = /**
     * Moves to the next page if it exists
     * @return {?}
     */
    function () {
        if (this.current < this.last) {
            this.current++;
        }
    };
    Object.defineProperty(Page.prototype, "firstItem", {
        /**
         * Index of the first item displayed on the current page, starting at 0, -1 if none displayed
         */
        get: /**
         * Index of the first item displayed on the current page, starting at 0, -1 if none displayed
         * @return {?}
         */
        function () {
            if (this._totalItems === 0) {
                return -1;
            }
            if (this.size === 0) {
                return 0;
            }
            return (this.current - 1) * this.size;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Page.prototype, "lastItem", {
        /**
         * Index of the last item displayed on the current page, starting at 0, -1 if none displayed
         */
        get: /**
         * Index of the last item displayed on the current page, starting at 0, -1 if none displayed
         * @return {?}
         */
        function () {
            if (this._totalItems === 0) {
                return -1;
            }
            if (this.size === 0) {
                return this.totalItems - 1;
            }
            /** @type {?} */
            var lastInPage = this.current * this.size - 1;
            if (this.totalItems) {
                lastInPage = Math.min(lastInPage, this.totalItems - 1);
            }
            return lastInPage;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Resets the page size to 0
     */
    /**
     * Resets the page size to 0
     * @return {?}
     */
    Page.prototype.resetPageSize = /**
     * Resets the page size to 0
     * @return {?}
     */
    function () {
        this.size = 0;
    };
    Page.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Page.ctorParameters = function () { return [
        { type: StateDebouncer }
    ]; };
    return Page;
}());
export { Page };
if (false) {
    /** @type {?} */
    Page.prototype.activated;
    /**
     * Page size, a value of 0 means no pagination
     * @type {?}
     * @private
     */
    Page.prototype._size;
    /**
     * Total items (needed to guess the last page)
     * @type {?}
     * @private
     */
    Page.prototype._totalItems;
    /**
     * Last page
     * @type {?}
     * @private
     */
    Page.prototype._last;
    /**
     * The Observable that lets other classes subscribe to page changes
     * @type {?}
     * @private
     */
    Page.prototype._change;
    /**
     * @type {?}
     * @private
     */
    Page.prototype._sizeChange;
    /**
     * Current page
     * @type {?}
     * @private
     */
    Page.prototype._current;
    /**
     * @type {?}
     * @private
     */
    Page.prototype.stateDebouncer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvcHJvdmlkZXJzL3BhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUU1RDtJQUVFLGNBQW9CLGNBQThCO1FBQTlCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUUzQyxjQUFTLEdBQUcsS0FBSyxDQUFDOzs7O1FBS2pCLFVBQUssR0FBRyxDQUFDLENBQUM7Ozs7UUE0RFYsWUFBTyxHQUFHLElBQUksT0FBTyxFQUFVLENBQUM7UUFNaEMsZ0JBQVcsR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFDOzs7O1FBU3BDLGFBQVEsR0FBRyxDQUFDLENBQUM7SUFsRmdDLENBQUM7SUFRdEQsc0JBQVcsc0JBQUk7Ozs7UUFBZjtZQUNFLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNwQixDQUFDOzs7OztRQUNELFVBQWdCLElBQVk7O2dCQUNwQixPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUs7WUFDMUIsSUFBSSxJQUFJLEtBQUssT0FBTyxFQUFFO2dCQUNwQixJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUNsQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztnQkFDbEIsSUFBSSxJQUFJLEtBQUssQ0FBQyxFQUFFO29CQUNkLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO2lCQUNuQjtxQkFBTTtvQkFDTCwwRUFBMEU7b0JBQzFFLDRCQUE0QjtvQkFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQyxJ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cmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFN0YXRlRGVib3VuY2VyIH0gZnJvbSAnLi9zdGF0ZS1kZWJvdW5jZXIucHJvdmlkZXInO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUGFnZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc3RhdGVEZWJvdW5jZXI6IFN0YXRlRGVib3VuY2VyKSB7fVxuXG4gIHB1YmxpYyBhY3RpdmF0ZWQgPSBmYWxzZTtcblxuICAvKipcbiAgICogUGFnZSBzaXplLCBhIHZhbHVlIG9mIDAgbWVhbnMgbm8gcGFnaW5hdGlvblxuICAgKi9cbiAgcHJpdmF0ZSBfc2l6ZSA9IDA7XG4gIHB1YmxpYyBnZXQgc2l6ZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9zaXplO1xuICB9XG4gIHB1YmxpYyBzZXQgc2l6ZShzaXplOiBudW1iZXIpIHtcbiAgICBjb25zdCBvbGRTaXplID0gdGhpcy5fc2l6ZTtcbiAgICBpZiAoc2l6ZSAhPT0gb2xkU2l6ZSkge1xuICAgICAgdGhpcy5zdGF0ZURlYm91bmNlci5jaGFuZ2VTdGFydCgpO1xuICAgICAgdGhpcy5fc2l6ZSA9IHNpemU7XG4gICAgICBpZiAoc2l6ZSA9PT0gMCkge1xuICAgICAgICB0aGlzLl9jdXJyZW50ID0gMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFllYXAuIFRoYXQncyB0aGUgZm9ybXVsYSB0byBrZWVwIHRoZSBmaXJzdCBpdGVtIGZyb20gdGhlIG9sZCBwYWdlIHN0aWxsXG4gICAgICAgIC8vIGRpc3BsYXllZCBpbiB0aGUgbmV3IG9uZS5cbiAgICAgICAgdGhpcy5fY3VycmVudCA9IE1hdGguZmxvb3Iob2xkU2l6ZSAvIHNpemUgKiAodGhpcy5fY3VycmVudCAtIDEpKSArIDE7XG4gICAgICB9XG4gICAgICAvLyBXZSBhbHdheXMgZW1pdCBhbiBldmVudCBldmVuIGlmIHRoZSBjdXJyZW50IHBhZ2UgaW5kZXggZGlkbid0IGNoYW5nZSwgYmVjYXVzZVxuICAgICAgLy8gdGhlIHNpemUgY2hhbmdpbmcgbWVhbnMgdGhlIGl0ZW1zIGluc2lkZSB0aGUgcGFnZSBhcmUgZGlmZmVyZW50XG4gICAgICB0aGlzLl9jaGFuZ2UubmV4dCh0aGlzLl9jdXJyZW50KTtcbiAgICAgIHRoaXMuX3NpemVDaGFuZ2UubmV4dCh0aGlzLl9zaXplKTtcbiAgICAgIHRoaXMuc3RhdGVEZWJvdW5jZXIuY2hhbmdlRG9uZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUb3RhbCBpdGVtcyAobmVlZGVkIHRvIGd1ZXNzIHRoZSBsYXN0IHBhZ2UpXG4gICAqL1xuICBwcml2YXRlIF90b3RhbEl0ZW1zPzogbnVtYmVyO1xuICBwdWJsaWMgZ2V0IHRvdGFsSXRlbXMoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fdG90YWxJdGVtcyB8fCAwOyAvLyByZW1haW5zIDAgaWYgbm90IHNldCB0byBhdm9pZCBicmVha2luZyBjaGFuZ2VcbiAgfVxuICBwdWJsaWMgc2V0IHRvdGFsSXRlbXModG90YWw6IG51bWJlcikge1xuICAgIHRoaXMuX3RvdGFsSXRlbXMgPSB0b3RhbDtcbiAgICAvLyBJZiB3ZSBoYXZlIGxlc3MgaXRlbXMgdGhhbiBiZWZvcmUsIHdlIG1pZ2h0IG5lZWQgdG8gY2hhbmdlIHRoZSBjdXJyZW50IHBhZ2VcbiAgICBpZiAodGhpcy5jdXJyZW50ID4gdGhpcy5sYXN0KSB7XG4gICAgICB0aGlzLmN1cnJlbnQgPSB0aGlzLmxhc3Q7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIExhc3QgcGFnZVxuICAgKi9cbiAgcHJpdmF0ZSBfbGFzdDogbnVtYmVyO1xuICBwdWJsaWMgZ2V0IGxhc3QoKTogbnVtYmVyIHtcbiAgICBpZiAodGhpcy5fbGFzdCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2xhc3Q7XG4gICAgfVxuICAgIC8vIElmIHRoZSBsYXN0IHBhZ2UgaXNuJ3Qga25vd24sIHdlIGNvbXB1dGUgaXQgZnJvbSB0aGUgbGFzdCBpdGVtJ3MgaW5kZXhcbiAgICBpZiAodGhpcy5zaXplID4gMCAmJiB0aGlzLnRvdGFsSXRlbXMpIHtcbiAgICAgIHJldHVybiBNYXRoLmNlaWwodGhpcy50b3RhbEl0ZW1zIC8gdGhpcy5zaXplKTtcbiAgICB9XG4gICAgcmV0dXJuIDE7XG4gIH1cbiAgcHVibGljIHNldCBsYXN0KHBhZ2U6IG51bWJlcikge1xuICAgIHRoaXMuX2xhc3QgPSBwYWdlO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBPYnNlcnZhYmxlIHRoYXQgbGV0cyBvdGhlciBjbGFzc2VzIHN1YnNjcmliZSB0byBwYWdlIGNoYW5nZXNcbiAgICovXG4gIHByaXZhdGUgX2NoYW5nZSA9IG5ldyBTdWJqZWN0PG51bWJlcj4oKTtcbiAgLy8gV2UgZG8gbm90IHdhbnQgdG8gZXhwb3NlIHRoZSBTdWJqZWN0IGl0c2VsZiwgYnV0IHRoZSBPYnNlcnZhYmxlIHdoaWNoIGlzIHJlYWQtb25seVxuICBwdWJsaWMgZ2V0IGNoYW5nZSgpOiBPYnNlcnZhYmxlPG51bWJlcj4ge1xuICAgIHJldHVybiB0aGlzLl9jaGFuZ2UuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBwcml2YXRlIF9zaXplQ2hhbmdlID0gbmV3IFN1YmplY3Q8bnVtYmVyPigpO1xuXG4gIHB1YmxpYyBnZXQgc2l6ZUNoYW5nZSgpOiBPYnNlcnZhYmxlPG51bWJlcj4ge1xuICAgIHJldHVybiB0aGlzLl9zaXplQ2hhbmdlLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEN1cnJlbnQgcGFnZVxuICAgKi9cbiAgcHJpdmF0ZSBfY3VycmVudCA9IDE7XG4gIHB1YmxpYyBnZXQgY3VycmVudCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50O1xuICB9XG4gIHB1YmxpYyBzZXQgY3VycmVudChwYWdlOiBudW1iZXIpIHtcbiAgICBpZiAocGFnZSAhPT0gdGhpcy5fY3VycmVudCkge1xuICAgICAgdGhpcy5zdGF0ZURlYm91bmNlci5jaGFuZ2VTdGFydCgpO1xuICAgICAgdGhpcy5fY3VycmVudCA9IHBhZ2U7XG4gICAgICB0aGlzLl9jaGFuZ2UubmV4dChwYWdlKTtcbiAgICAgIHRoaXMuc3RhdGVEZWJvdW5jZXIuY2hhbmdlRG9uZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBNb3ZlcyB0byB0aGUgcHJldmlvdXMgcGFnZSBpZiBpdCBleGlzdHNcbiAgICovXG4gIHB1YmxpYyBwcmV2aW91cygpIHtcbiAgICBpZiAodGhpcy5jdXJyZW50ID4gMSkge1xuICAgICAgdGhpcy5jdXJyZW50LS07XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE1vdmVzIHRvIHRoZSBuZXh0IHBhZ2UgaWYgaXQgZXhpc3RzXG4gICAqL1xuICBwdWJsaWMgbmV4dCgpIHtcbiAgICBpZiAodGhpcy5jdXJyZW50IDwgdGhpcy5sYXN0KSB7XG4gICAgICB0aGlzLmN1cnJlbnQrKztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSW5kZXggb2YgdGhlIGZpcnN0IGl0ZW0gZGlzcGxheWVkIG9uIHRoZSBjdXJyZW50IHBhZ2UsIHN0YXJ0aW5nIGF0IDAsIC0xIGlmIG5vbmUgZGlzcGxheWVkXG4gICAqL1xuICBwdWJsaWMgZ2V0IGZpcnN0SXRlbSgpOiBudW1iZXIge1xuICAgIGlmICh0aGlzLl90b3RhbEl0ZW1zID09PSAwKSB7XG4gICAgICByZXR1cm4gLTE7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc2l6ZSA9PT0gMCkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIHJldHVybiAodGhpcy5jdXJyZW50IC0gMSkgKiB0aGlzLnNpemU7XG4gIH1cblxuICAvKipcbiAgICogSW5kZXggb2YgdGhlIGxhc3QgaXRlbSBkaXNwbGF5ZWQgb24gdGhlIGN1cnJlbnQgcGFnZSwgc3RhcnRpbmcgYXQgMCwgLTEgaWYgbm9uZSBkaXNwbGF5ZWRcbiAgICovXG4gIHB1YmxpYyBnZXQgbGFzdEl0ZW0oKTogbnVtYmVyIHtcbiAgICBpZiAodGhpcy5fdG90YWxJdGVtcyA9PT0gMCkge1xuICAgICAgcmV0dXJuIC0xO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnNpemUgPT09IDApIHtcbiAgICAgIHJldHVybiB0aGlzLnRvdGFsSXRlbXMgLSAxO1xuICAgIH1cbiAgICBsZXQgbGFzdEluUGFnZSA9IHRoaXMuY3VycmVudCAqIHRoaXMuc2l6ZSAtIDE7XG4gICAgaWYgKHRoaXMudG90YWxJdGVtcykge1xuICAgICAgbGFzdEluUGFnZSA9IE1hdGgubWluKGxhc3RJblBhZ2UsIHRoaXMudG90YWxJdGVtcyAtIDEpO1xuICAgIH1cbiAgICByZXR1cm4gbGFzdEluUGFnZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldHMgdGhlIHBhZ2Ugc2l6ZSB0byAwXG4gICAqL1xuICBwdWJsaWMgcmVzZXRQYWdlU2l6ZSgpOiB2b2lkIHtcbiAgICB0aGlzLnNpemUgPSAwO1xuICB9XG59XG4iXX0=