/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
         * Total items (needed to guess the last page)
         */
        this._totalItems = 0;
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
            return this._totalItems;
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
         * Index of the first item displayed on the current page, starting at 0
         */
        get: /**
         * Index of the first item displayed on the current page, starting at 0
         * @return {?}
         */
        function () {
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
         * Index of the last item displayed on the current page, starting at 0
         */
        get: /**
         * Index of the last item displayed on the current page, starting at 0
         * @return {?}
         */
        function () {
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
     */
    Page.prototype._size;
    /**
     * Total items (needed to guess the last page)
     * @type {?}
     */
    Page.prototype._totalItems;
    /**
     * Last page
     * @type {?}
     */
    Page.prototype._last;
    /**
     * The Observable that lets other classes subscribe to page changes
     * @type {?}
     */
    Page.prototype._change;
    /** @type {?} */
    Page.prototype._sizeChange;
    /**
     * Current page
     * @type {?}
     */
    Page.prototype._current;
    /** @type {?} */
    Page.prototype.stateDebouncer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvcHJvdmlkZXJzL3BhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUU1RDtJQUVFLGNBQW9CLGNBQThCO1FBQTlCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUUzQyxjQUFTLEdBQUcsS0FBSyxDQUFDOzs7O1FBS2pCLFVBQUssR0FBRyxDQUFDLENBQUM7Ozs7UUEyQlYsZ0JBQVcsR0FBRyxDQUFDLENBQUM7Ozs7UUFpQ2hCLFlBQU8sR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFDO1FBTWhDLGdCQUFXLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQzs7OztRQVNwQyxhQUFRLEdBQUcsQ0FBQyxDQUFDO0lBbEZnQyxDQUFDO0lBUXRELHNCQUFXLHNCQUFJOzs7O1FBQWY7WUFDRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDcEIsQ0FBQzs7Ozs7UUFDRCxVQUFnQixJQUFZOztnQkFDcEIsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLO1lBQzFCLElBQUksSUFBSSxLQUFLLE9BQU8sRUFBRTtnQkFDcEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDbEMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7Z0JBQ2xCLElBQUksSUFBSSxLQUFLLENBQUMsRUFBRTtvQkFDZCxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztpQkFDbkI7cUJBQU07b0JBQ0wsMEVBQTBFO29CQUMxRSw0QkFBNEI7b0JBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUss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QUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3hDLENBQUM7OztPQUFBO0lBS0Qsc0JBQVcsMEJBQVE7UUFIbkI7O1dBRUc7Ozs7O1FBQ0g7WUFDRSxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxFQUFFO2dCQUNuQixPQUFPLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO2FBQzVCOztnQkFDRyxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUM7WUFDN0MsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO2dCQUNuQixVQUFVLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQzthQUN4RDtZQUNELE9BQU8sVUFBVSxDQUFDO1FBQ3BCLENBQUM7OztPQUFBO0lBRUQ7O09BRUc7Ozs7O0lBQ0ksNEJBQWE7Ozs7SUFBcEI7UUFDRSxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztJQUNoQixDQUFDOztnQkFoSkYsVUFBVTs7OztnQkFGRixjQUFjOztJQW1KdkIsV0FBQztDQUFBLEFBakpELElBaUpDO1NBaEpZLElBQUk7OztJQUdmLHlCQUF5Qjs7Ozs7SUFLekIscUJBQWtCOzs7OztJQTJCbEIsMkJBQXdCOzs7OztJQWV4QixxQkFBc0I7Ozs7O0lBa0J0Qix1QkFBd0M7O0lBTXhDLDJCQUE0Qzs7Ozs7SUFTNUMsd0JBQXFCOztJQWxGVCw4QkFBc0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBTdGF0ZURlYm91bmNlciB9IGZyb20gJy4vc3RhdGUtZGVib3VuY2VyLnByb3ZpZGVyJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFBhZ2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHN0YXRlRGVib3VuY2VyOiBTdGF0ZURlYm91bmNlcikge31cblxuICBwdWJsaWMgYWN0aXZhdGVkID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFBhZ2Ugc2l6ZSwgYSB2YWx1ZSBvZiAwIG1lYW5zIG5vIHBhZ2luYXRpb25cbiAgICovXG4gIHByaXZhdGUgX3NpemUgPSAwO1xuICBwdWJsaWMgZ2V0IHNpemUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fc2l6ZTtcbiAgfVxuICBwdWJsaWMgc2V0IHNpemUoc2l6ZTogbnVtYmVyKSB7XG4gICAgY29uc3Qgb2xkU2l6ZSA9IHRoaXMuX3NpemU7XG4gICAgaWYgKHNpemUgIT09IG9sZFNpemUpIHtcbiAgICAgIHRoaXMuc3RhdGVEZWJvdW5jZXIuY2hhbmdlU3RhcnQoKTtcbiAgICAgIHRoaXMuX3NpemUgPSBzaXplO1xuICAgICAgaWYgKHNpemUgPT09IDApIHtcbiAgICAgICAgdGhpcy5fY3VycmVudCA9IDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBZZWFwLiBUaGF0J3MgdGhlIGZvcm11bGEgdG8ga2VlcCB0aGUgZmlyc3QgaXRlbSBmcm9tIHRoZSBvbGQgcGFnZSBzdGlsbFxuICAgICAgICAvLyBkaXNwbGF5ZWQgaW4gdGhlIG5ldyBvbmUuXG4gICAgICAgIHRoaXMuX2N1cnJlbnQgPSBNYXRoLmZsb29yKG9sZFNpemUgLyBzaXplICogKHRoaXMuX2N1cnJlbnQgLSAxKSkgKyAxO1xuICAgICAgfVxuICAgICAgLy8gV2UgYWx3YXlzIGVtaXQgYW4gZXZlbnQgZXZlbiBpZiB0aGUgY3VycmVudCBwYWdlIGluZGV4IGRpZG4ndCBjaGFuZ2UsIGJlY2F1c2VcbiAgICAgIC8vIHRoZSBzaXplIGNoYW5naW5nIG1lYW5zIHRoZSBpdGVtcyBpbnNpZGUgdGhlIHBhZ2UgYXJlIGRpZmZlcmVudFxuICAgICAgdGhpcy5fY2hhbmdlLm5leHQodGhpcy5fY3VycmVudCk7XG4gICAgICB0aGlzLl9zaXplQ2hhbmdlLm5leHQodGhpcy5fc2l6ZSk7XG4gICAgICB0aGlzLnN0YXRlRGVib3VuY2VyLmNoYW5nZURvbmUoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVG90YWwgaXRlbXMgKG5lZWRlZCB0byBndWVzcyB0aGUgbGFzdCBwYWdlKVxuICAgKi9cbiAgcHJpdmF0ZSBfdG90YWxJdGVtcyA9IDA7XG4gIHB1YmxpYyBnZXQgdG90YWxJdGVtcygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl90b3RhbEl0ZW1zO1xuICB9XG4gIHB1YmxpYyBzZXQgdG90YWxJdGVtcyh0b3RhbDogbnVtYmVyKSB7XG4gICAgdGhpcy5fdG90YWxJdGVtcyA9IHRvdGFsO1xuICAgIC8vIElmIHdlIGhhdmUgbGVzcyBpdGVtcyB0aGFuIGJlZm9yZSwgd2UgbWlnaHQgbmVlZCB0byBjaGFuZ2UgdGhlIGN1cnJlbnQgcGFnZVxuICAgIGlmICh0aGlzLmN1cnJlbnQgPiB0aGlzLmxhc3QpIHtcbiAgICAgIHRoaXMuY3VycmVudCA9IHRoaXMubGFzdDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTGFzdCBwYWdlXG4gICAqL1xuICBwcml2YXRlIF9sYXN0OiBudW1iZXI7XG4gIHB1YmxpYyBnZXQgbGFzdCgpOiBudW1iZXIge1xuICAgIGlmICh0aGlzLl9sYXN0KSB7XG4gICAgICByZXR1cm4gdGhpcy5fbGFzdDtcbiAgICB9XG4gICAgLy8gSWYgdGhlIGxhc3QgcGFnZSBpc24ndCBrbm93biwgd2UgY29tcHV0ZSBpdCBmcm9tIHRoZSBsYXN0IGl0ZW0ncyBpbmRleFxuICAgIGlmICh0aGlzLnNpemUgPiAwICYmIHRoaXMudG90YWxJdGVtcykge1xuICAgICAgcmV0dXJuIE1hdGguY2VpbCh0aGlzLnRvdGFsSXRlbXMgLyB0aGlzLnNpemUpO1xuICAgIH1cbiAgICByZXR1cm4gMTtcbiAgfVxuICBwdWJsaWMgc2V0IGxhc3QocGFnZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fbGFzdCA9IHBhZ2U7XG4gIH1cblxuICAvKipcbiAgICogVGhlIE9ic2VydmFibGUgdGhhdCBsZXRzIG90aGVyIGNsYXNzZXMgc3Vic2NyaWJlIHRvIHBhZ2UgY2hhbmdlc1xuICAgKi9cbiAgcHJpdmF0ZSBfY2hhbmdlID0gbmV3IFN1YmplY3Q8bnVtYmVyPigpO1xuICAvLyBXZSBkbyBub3Qgd2FudCB0byBleHBvc2UgdGhlIFN1YmplY3QgaXRzZWxmLCBidXQgdGhlIE9ic2VydmFibGUgd2hpY2ggaXMgcmVhZC1vbmx5XG4gIHB1YmxpYyBnZXQgY2hhbmdlKCk6IE9ic2VydmFibGU8bnVtYmVyPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NoYW5nZS5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIHByaXZhdGUgX3NpemVDaGFuZ2UgPSBuZXcgU3ViamVjdDxudW1iZXI+KCk7XG5cbiAgcHVibGljIGdldCBzaXplQ2hhbmdlKCk6IE9ic2VydmFibGU8bnVtYmVyPiB7XG4gICAgcmV0dXJuIHRoaXMuX3NpemVDaGFuZ2UuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICAvKipcbiAgICogQ3VycmVudCBwYWdlXG4gICAqL1xuICBwcml2YXRlIF9jdXJyZW50ID0gMTtcbiAgcHVibGljIGdldCBjdXJyZW50KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnQ7XG4gIH1cbiAgcHVibGljIHNldCBjdXJyZW50KHBhZ2U6IG51bWJlcikge1xuICAgIGlmIChwYWdlICE9PSB0aGlzLl9jdXJyZW50KSB7XG4gICAgICB0aGlzLnN0YXRlRGVib3VuY2VyLmNoYW5nZVN0YXJ0KCk7XG4gICAgICB0aGlzLl9jdXJyZW50ID0gcGFnZTtcbiAgICAgIHRoaXMuX2NoYW5nZS5uZXh0KHBhZ2UpO1xuICAgICAgdGhpcy5zdGF0ZURlYm91bmNlci5jaGFuZ2VEb25lKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE1vdmVzIHRvIHRoZSBwcmV2aW91cyBwYWdlIGlmIGl0IGV4aXN0c1xuICAgKi9cbiAgcHVibGljIHByZXZpb3VzKCkge1xuICAgIGlmICh0aGlzLmN1cnJlbnQgPiAxKSB7XG4gICAgICB0aGlzLmN1cnJlbnQtLTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTW92ZXMgdG8gdGhlIG5leHQgcGFnZSBpZiBpdCBleGlzdHNcbiAgICovXG4gIHB1YmxpYyBuZXh0KCkge1xuICAgIGlmICh0aGlzLmN1cnJlbnQgPCB0aGlzLmxhc3QpIHtcbiAgICAgIHRoaXMuY3VycmVudCsrO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJbmRleCBvZiB0aGUgZmlyc3QgaXRlbSBkaXNwbGF5ZWQgb24gdGhlIGN1cnJlbnQgcGFnZSwgc3RhcnRpbmcgYXQgMFxuICAgKi9cbiAgcHVibGljIGdldCBmaXJzdEl0ZW0oKTogbnVtYmVyIHtcbiAgICBpZiAodGhpcy5zaXplID09PSAwKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgcmV0dXJuICh0aGlzLmN1cnJlbnQgLSAxKSAqIHRoaXMuc2l6ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbmRleCBvZiB0aGUgbGFzdCBpdGVtIGRpc3BsYXllZCBvbiB0aGUgY3VycmVudCBwYWdlLCBzdGFydGluZyBhdCAwXG4gICAqL1xuICBwdWJsaWMgZ2V0IGxhc3RJdGVtKCk6IG51bWJlciB7XG4gICAgaWYgKHRoaXMuc2l6ZSA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRoaXMudG90YWxJdGVtcyAtIDE7XG4gICAgfVxuICAgIGxldCBsYXN0SW5QYWdlID0gdGhpcy5jdXJyZW50ICogdGhpcy5zaXplIC0gMTtcbiAgICBpZiAodGhpcy50b3RhbEl0ZW1zKSB7XG4gICAgICBsYXN0SW5QYWdlID0gTWF0aC5taW4obGFzdEluUGFnZSwgdGhpcy50b3RhbEl0ZW1zIC0gMSk7XG4gICAgfVxuICAgIHJldHVybiBsYXN0SW5QYWdlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0cyB0aGUgcGFnZSBzaXplIHRvIDBcbiAgICovXG4gIHB1YmxpYyByZXNldFBhZ2VTaXplKCk6IHZvaWQge1xuICAgIHRoaXMuc2l6ZSA9IDA7XG4gIH1cbn1cbiJdfQ==