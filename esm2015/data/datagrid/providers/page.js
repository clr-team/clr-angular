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
export class Page {
    /**
     * @param {?} stateDebouncer
     */
    constructor(stateDebouncer) {
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
    /**
     * @return {?}
     */
    get size() {
        return this._size;
    }
    /**
     * @param {?} size
     * @return {?}
     */
    set size(size) {
        /** @type {?} */
        const oldSize = this._size;
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
    }
    /**
     * @return {?}
     */
    get totalItems() {
        return this._totalItems;
    }
    /**
     * @param {?} total
     * @return {?}
     */
    set totalItems(total) {
        this._totalItems = total;
        // If we have less items than before, we might need to change the current page
        if (this.current > this.last) {
            this.current = this.last;
        }
    }
    /**
     * @return {?}
     */
    get last() {
        if (this._last) {
            return this._last;
        }
        // If the last page isn't known, we compute it from the last item's index
        if (this.size > 0 && this.totalItems) {
            return Math.ceil(this.totalItems / this.size);
        }
        return 1;
    }
    /**
     * @param {?} page
     * @return {?}
     */
    set last(page) {
        this._last = page;
    }
    // We do not want to expose the Subject itself, but the Observable which is read-only
    /**
     * @return {?}
     */
    get change() {
        return this._change.asObservable();
    }
    /**
     * @return {?}
     */
    get sizeChange() {
        return this._sizeChange.asObservable();
    }
    /**
     * @return {?}
     */
    get current() {
        return this._current;
    }
    /**
     * @param {?} page
     * @return {?}
     */
    set current(page) {
        if (page !== this._current) {
            this.stateDebouncer.changeStart();
            this._current = page;
            this._change.next(page);
            this.stateDebouncer.changeDone();
        }
    }
    /**
     * Moves to the previous page if it exists
     * @return {?}
     */
    previous() {
        if (this.current > 1) {
            this.current--;
        }
    }
    /**
     * Moves to the next page if it exists
     * @return {?}
     */
    next() {
        if (this.current < this.last) {
            this.current++;
        }
    }
    /**
     * Index of the first item displayed on the current page, starting at 0
     * @return {?}
     */
    get firstItem() {
        if (this.size === 0) {
            return 0;
        }
        return (this.current - 1) * this.size;
    }
    /**
     * Index of the last item displayed on the current page, starting at 0
     * @return {?}
     */
    get lastItem() {
        if (this.size === 0) {
            return this.totalItems - 1;
        }
        /** @type {?} */
        let lastInPage = this.current * this.size - 1;
        if (this.totalItems) {
            lastInPage = Math.min(lastInPage, this.totalItems - 1);
        }
        return lastInPage;
    }
    /**
     * Resets the page size to 0
     * @return {?}
     */
    resetPageSize() {
        this.size = 0;
    }
}
Page.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Page.ctorParameters = () => [
    { type: StateDebouncer }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvcHJvdmlkZXJzL3BhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUc1RCxNQUFNLE9BQU8sSUFBSTs7OztJQUNmLFlBQW9CLGNBQThCO1FBQTlCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUUzQyxjQUFTLEdBQUcsS0FBSyxDQUFDOzs7O1FBS2pCLFVBQUssR0FBRyxDQUFDLENBQUM7Ozs7UUEyQlYsZ0JBQVcsR0FBRyxDQUFDLENBQUM7Ozs7UUFpQ2hCLFlBQU8sR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFDO1FBTWhDLGdCQUFXLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQzs7OztRQVNwQyxhQUFRLEdBQUcsQ0FBQyxDQUFDO0lBbEZnQyxDQUFDOzs7O0lBUXRELElBQVcsSUFBSTtRQUNiLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNwQixDQUFDOzs7OztJQUNELElBQVcsSUFBSSxDQUFDLElBQVk7O2NBQ3BCLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSztRQUMxQixJQUFJLElBQUksS0FBSyxPQUFPLEVBQUU7WUFDcEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNsQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztZQUNsQixJQUFJLElBQUksS0FBSyxDQUFDLEVBQUU7Z0JBQ2QsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7YUFDbkI7aUJBQU07Z0JBQ0wsMEVBQTBFO2dCQUMxRSw0QkFBNEI7Z0JBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcs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RUFBRTtZQUNuQixPQUFPLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1NBQzVCOztZQUNHLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQztRQUM3QyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIsVUFBVSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDeEQ7UUFDRCxPQUFPLFVBQVUsQ0FBQztJQUNwQixDQUFDOzs7OztJQUtNLGFBQWE7UUFDbEIsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7SUFDaEIsQ0FBQzs7O1lBaEpGLFVBQVU7Ozs7WUFGRixjQUFjOzs7O0lBTXJCLHlCQUF5Qjs7Ozs7SUFLekIscUJBQWtCOzs7OztJQTJCbEIsMkJBQXdCOzs7OztJQWV4QixxQkFBc0I7Ozs7O0lBa0J0Qix1QkFBd0M7O0lBTXhDLDJCQUE0Qzs7Ozs7SUFTNUMsd0JBQXFCOztJQWxGVCw4QkFBc0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBTdGF0ZURlYm91bmNlciB9IGZyb20gJy4vc3RhdGUtZGVib3VuY2VyLnByb3ZpZGVyJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFBhZ2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHN0YXRlRGVib3VuY2VyOiBTdGF0ZURlYm91bmNlcikge31cblxuICBwdWJsaWMgYWN0aXZhdGVkID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFBhZ2Ugc2l6ZSwgYSB2YWx1ZSBvZiAwIG1lYW5zIG5vIHBhZ2luYXRpb25cbiAgICovXG4gIHByaXZhdGUgX3NpemUgPSAwO1xuICBwdWJsaWMgZ2V0IHNpemUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fc2l6ZTtcbiAgfVxuICBwdWJsaWMgc2V0IHNpemUoc2l6ZTogbnVtYmVyKSB7XG4gICAgY29uc3Qgb2xkU2l6ZSA9IHRoaXMuX3NpemU7XG4gICAgaWYgKHNpemUgIT09IG9sZFNpemUpIHtcbiAgICAgIHRoaXMuc3RhdGVEZWJvdW5jZXIuY2hhbmdlU3RhcnQoKTtcbiAgICAgIHRoaXMuX3NpemUgPSBzaXplO1xuICAgICAgaWYgKHNpemUgPT09IDApIHtcbiAgICAgICAgdGhpcy5fY3VycmVudCA9IDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBZZWFwLiBUaGF0J3MgdGhlIGZvcm11bGEgdG8ga2VlcCB0aGUgZmlyc3QgaXRlbSBmcm9tIHRoZSBvbGQgcGFnZSBzdGlsbFxuICAgICAgICAvLyBkaXNwbGF5ZWQgaW4gdGhlIG5ldyBvbmUuXG4gICAgICAgIHRoaXMuX2N1cnJlbnQgPSBNYXRoLmZsb29yKG9sZFNpemUgLyBzaXplICogKHRoaXMuX2N1cnJlbnQgLSAxKSkgKyAxO1xuICAgICAgfVxuICAgICAgLy8gV2UgYWx3YXlzIGVtaXQgYW4gZXZlbnQgZXZlbiBpZiB0aGUgY3VycmVudCBwYWdlIGluZGV4IGRpZG4ndCBjaGFuZ2UsIGJlY2F1c2VcbiAgICAgIC8vIHRoZSBzaXplIGNoYW5naW5nIG1lYW5zIHRoZSBpdGVtcyBpbnNpZGUgdGhlIHBhZ2UgYXJlIGRpZmZlcmVudFxuICAgICAgdGhpcy5fY2hhbmdlLm5leHQodGhpcy5fY3VycmVudCk7XG4gICAgICB0aGlzLl9zaXplQ2hhbmdlLm5leHQodGhpcy5fc2l6ZSk7XG4gICAgICB0aGlzLnN0YXRlRGVib3VuY2VyLmNoYW5nZURvbmUoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVG90YWwgaXRlbXMgKG5lZWRlZCB0byBndWVzcyB0aGUgbGFzdCBwYWdlKVxuICAgKi9cbiAgcHJpdmF0ZSBfdG90YWxJdGVtcyA9IDA7XG4gIHB1YmxpYyBnZXQgdG90YWxJdGVtcygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl90b3RhbEl0ZW1zO1xuICB9XG4gIHB1YmxpYyBzZXQgdG90YWxJdGVtcyh0b3RhbDogbnVtYmVyKSB7XG4gICAgdGhpcy5fdG90YWxJdGVtcyA9IHRvdGFsO1xuICAgIC8vIElmIHdlIGhhdmUgbGVzcyBpdGVtcyB0aGFuIGJlZm9yZSwgd2UgbWlnaHQgbmVlZCB0byBjaGFuZ2UgdGhlIGN1cnJlbnQgcGFnZVxuICAgIGlmICh0aGlzLmN1cnJlbnQgPiB0aGlzLmxhc3QpIHtcbiAgICAgIHRoaXMuY3VycmVudCA9IHRoaXMubGFzdDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTGFzdCBwYWdlXG4gICAqL1xuICBwcml2YXRlIF9sYXN0OiBudW1iZXI7XG4gIHB1YmxpYyBnZXQgbGFzdCgpOiBudW1iZXIge1xuICAgIGlmICh0aGlzLl9sYXN0KSB7XG4gICAgICByZXR1cm4gdGhpcy5fbGFzdDtcbiAgICB9XG4gICAgLy8gSWYgdGhlIGxhc3QgcGFnZSBpc24ndCBrbm93biwgd2UgY29tcHV0ZSBpdCBmcm9tIHRoZSBsYXN0IGl0ZW0ncyBpbmRleFxuICAgIGlmICh0aGlzLnNpemUgPiAwICYmIHRoaXMudG90YWxJdGVtcykge1xuICAgICAgcmV0dXJuIE1hdGguY2VpbCh0aGlzLnRvdGFsSXRlbXMgLyB0aGlzLnNpemUpO1xuICAgIH1cbiAgICByZXR1cm4gMTtcbiAgfVxuICBwdWJsaWMgc2V0IGxhc3QocGFnZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fbGFzdCA9IHBhZ2U7XG4gIH1cblxuICAvKipcbiAgICogVGhlIE9ic2VydmFibGUgdGhhdCBsZXRzIG90aGVyIGNsYXNzZXMgc3Vic2NyaWJlIHRvIHBhZ2UgY2hhbmdlc1xuICAgKi9cbiAgcHJpdmF0ZSBfY2hhbmdlID0gbmV3IFN1YmplY3Q8bnVtYmVyPigpO1xuICAvLyBXZSBkbyBub3Qgd2FudCB0byBleHBvc2UgdGhlIFN1YmplY3QgaXRzZWxmLCBidXQgdGhlIE9ic2VydmFibGUgd2hpY2ggaXMgcmVhZC1vbmx5XG4gIHB1YmxpYyBnZXQgY2hhbmdlKCk6IE9ic2VydmFibGU8bnVtYmVyPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NoYW5nZS5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIHByaXZhdGUgX3NpemVDaGFuZ2UgPSBuZXcgU3ViamVjdDxudW1iZXI+KCk7XG5cbiAgcHVibGljIGdldCBzaXplQ2hhbmdlKCk6IE9ic2VydmFibGU8bnVtYmVyPiB7XG4gICAgcmV0dXJuIHRoaXMuX3NpemVDaGFuZ2UuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICAvKipcbiAgICogQ3VycmVudCBwYWdlXG4gICAqL1xuICBwcml2YXRlIF9jdXJyZW50ID0gMTtcbiAgcHVibGljIGdldCBjdXJyZW50KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnQ7XG4gIH1cbiAgcHVibGljIHNldCBjdXJyZW50KHBhZ2U6IG51bWJlcikge1xuICAgIGlmIChwYWdlICE9PSB0aGlzLl9jdXJyZW50KSB7XG4gICAgICB0aGlzLnN0YXRlRGVib3VuY2VyLmNoYW5nZVN0YXJ0KCk7XG4gICAgICB0aGlzLl9jdXJyZW50ID0gcGFnZTtcbiAgICAgIHRoaXMuX2NoYW5nZS5uZXh0KHBhZ2UpO1xuICAgICAgdGhpcy5zdGF0ZURlYm91bmNlci5jaGFuZ2VEb25lKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE1vdmVzIHRvIHRoZSBwcmV2aW91cyBwYWdlIGlmIGl0IGV4aXN0c1xuICAgKi9cbiAgcHVibGljIHByZXZpb3VzKCkge1xuICAgIGlmICh0aGlzLmN1cnJlbnQgPiAxKSB7XG4gICAgICB0aGlzLmN1cnJlbnQtLTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTW92ZXMgdG8gdGhlIG5leHQgcGFnZSBpZiBpdCBleGlzdHNcbiAgICovXG4gIHB1YmxpYyBuZXh0KCkge1xuICAgIGlmICh0aGlzLmN1cnJlbnQgPCB0aGlzLmxhc3QpIHtcbiAgICAgIHRoaXMuY3VycmVudCsrO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJbmRleCBvZiB0aGUgZmlyc3QgaXRlbSBkaXNwbGF5ZWQgb24gdGhlIGN1cnJlbnQgcGFnZSwgc3RhcnRpbmcgYXQgMFxuICAgKi9cbiAgcHVibGljIGdldCBmaXJzdEl0ZW0oKTogbnVtYmVyIHtcbiAgICBpZiAodGhpcy5zaXplID09PSAwKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgcmV0dXJuICh0aGlzLmN1cnJlbnQgLSAxKSAqIHRoaXMuc2l6ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbmRleCBvZiB0aGUgbGFzdCBpdGVtIGRpc3BsYXllZCBvbiB0aGUgY3VycmVudCBwYWdlLCBzdGFydGluZyBhdCAwXG4gICAqL1xuICBwdWJsaWMgZ2V0IGxhc3RJdGVtKCk6IG51bWJlciB7XG4gICAgaWYgKHRoaXMuc2l6ZSA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRoaXMudG90YWxJdGVtcyAtIDE7XG4gICAgfVxuICAgIGxldCBsYXN0SW5QYWdlID0gdGhpcy5jdXJyZW50ICogdGhpcy5zaXplIC0gMTtcbiAgICBpZiAodGhpcy50b3RhbEl0ZW1zKSB7XG4gICAgICBsYXN0SW5QYWdlID0gTWF0aC5taW4obGFzdEluUGFnZSwgdGhpcy50b3RhbEl0ZW1zIC0gMSk7XG4gICAgfVxuICAgIHJldHVybiBsYXN0SW5QYWdlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0cyB0aGUgcGFnZSBzaXplIHRvIDBcbiAgICovXG4gIHB1YmxpYyByZXNldFBhZ2VTaXplKCk6IHZvaWQge1xuICAgIHRoaXMuc2l6ZSA9IDA7XG4gIH1cbn1cbiJdfQ==