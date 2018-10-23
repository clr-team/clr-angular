/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { StateDebouncer } from './state-debouncer.provider';
var Page = /** @class */ (function () {
    function Page(stateDebouncer) {
        this.stateDebouncer = stateDebouncer;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvcHJvdmlkZXJzL3BhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUU1RDtJQUVFLGNBQW9CLGNBQThCO1FBQTlCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjs7OztRQUsxQyxVQUFLLEdBQUcsQ0FBQyxDQUFDOzs7O1FBeUJWLGdCQUFXLEdBQUcsQ0FBQyxDQUFDOzs7O1FBaUNoQixZQUFPLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQztRQU1oQyxnQkFBVyxHQUFHLElBQUksT0FBTyxFQUFVLENBQUM7Ozs7UUFTcEMsYUFBUSxHQUFHLENBQUMsQ0FBQztJQTlFZ0MsQ0FBQztJQU10RCxzQkFBVyxzQkFBSTs7OztRQUFmO1lBQ0UsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3BCLENBQUM7Ozs7O1FBQ0QsVUFBZ0IsSUFBWTs7Z0JBQ3BCLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSztZQUMxQixJQUFJLElBQUksS0FBSyxPQUFPLEVBQUU7Z0JBQ3BCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO2dCQUNsQixJQUFJLElBQUksS0FBSyxDQUFDLEVBQUU7b0JBQ2QsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7aUJBQ25CO3FCQUFNO29CQUNMLDBFQUEwRTtvQkFDMUUsNEJBQTRCO29CQUM1QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FB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QUNIO1lBQ0UsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsRUFBRTtnQkFDbkIsT0FBTyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQzthQUM1Qjs7Z0JBQ0csVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDO1lBQzdDLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDbkIsVUFBVSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDeEQ7WUFDRCxPQUFPLFVBQVUsQ0FBQztRQUNwQixDQUFDOzs7T0FBQTtJQUVEOztPQUVHOzs7OztJQUNJLDRCQUFhOzs7O0lBQXBCO1FBQ0UsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7SUFDaEIsQ0FBQzs7Z0JBNUlGLFVBQVU7Ozs7Z0JBRkYsY0FBYzs7SUErSXZCLFdBQUM7Q0FBQSxBQTdJRCxJQTZJQztTQTVJWSxJQUFJOzs7Ozs7SUFNZixxQkFBa0I7Ozs7O0lBeUJsQiwyQkFBd0I7Ozs7O0lBZXhCLHFCQUFzQjs7Ozs7SUFrQnRCLHVCQUF3Qzs7SUFNeEMsMkJBQTRDOzs7OztJQVM1Qyx3QkFBcUI7O0lBOUVULDhCQUFzQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFN0YXRlRGVib3VuY2VyIH0gZnJvbSAnLi9zdGF0ZS1kZWJvdW5jZXIucHJvdmlkZXInO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUGFnZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc3RhdGVEZWJvdW5jZXI6IFN0YXRlRGVib3VuY2VyKSB7fVxuXG4gIC8qKlxuICAgKiBQYWdlIHNpemUsIGEgdmFsdWUgb2YgMCBtZWFucyBubyBwYWdpbmF0aW9uXG4gICAqL1xuICBwcml2YXRlIF9zaXplID0gMDtcbiAgcHVibGljIGdldCBzaXplKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3NpemU7XG4gIH1cbiAgcHVibGljIHNldCBzaXplKHNpemU6IG51bWJlcikge1xuICAgIGNvbnN0IG9sZFNpemUgPSB0aGlzLl9zaXplO1xuICAgIGlmIChzaXplICE9PSBvbGRTaXplKSB7XG4gICAgICB0aGlzLl9zaXplID0gc2l6ZTtcbiAgICAgIGlmIChzaXplID09PSAwKSB7XG4gICAgICAgIHRoaXMuX2N1cnJlbnQgPSAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gWWVhcC4gVGhhdCdzIHRoZSBmb3JtdWxhIHRvIGtlZXAgdGhlIGZpcnN0IGl0ZW0gZnJvbSB0aGUgb2xkIHBhZ2Ugc3RpbGxcbiAgICAgICAgLy8gZGlzcGxheWVkIGluIHRoZSBuZXcgb25lLlxuICAgICAgICB0aGlzLl9jdXJyZW50ID0gTWF0aC5mbG9vcihvbGRTaXplIC8gc2l6ZSAqICh0aGlzLl9jdXJyZW50IC0gMSkpICsgMTtcbiAgICAgIH1cbiAgICAgIC8vIFdlIGFsd2F5cyBlbWl0IGFuIGV2ZW50IGV2ZW4gaWYgdGhlIGN1cnJlbnQgcGFnZSBpbmRleCBkaWRuJ3QgY2hhbmdlLCBiZWNhdXNlXG4gICAgICAvLyB0aGUgc2l6ZSBjaGFuZ2luZyBtZWFucyB0aGUgaXRlbXMgaW5zaWRlIHRoZSBwYWdlIGFyZSBkaWZmZXJlbnRcbiAgICAgIHRoaXMuX2NoYW5nZS5uZXh0KHRoaXMuX2N1cnJlbnQpO1xuICAgICAgdGhpcy5fc2l6ZUNoYW5nZS5uZXh0KHRoaXMuX3NpemUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUb3RhbCBpdGVtcyAobmVlZGVkIHRvIGd1ZXNzIHRoZSBsYXN0IHBhZ2UpXG4gICAqL1xuICBwcml2YXRlIF90b3RhbEl0ZW1zID0gMDtcbiAgcHVibGljIGdldCB0b3RhbEl0ZW1zKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3RvdGFsSXRlbXM7XG4gIH1cbiAgcHVibGljIHNldCB0b3RhbEl0ZW1zKHRvdGFsOiBudW1iZXIpIHtcbiAgICB0aGlzLl90b3RhbEl0ZW1zID0gdG90YWw7XG4gICAgLy8gSWYgd2UgaGF2ZSBsZXNzIGl0ZW1zIHRoYW4gYmVmb3JlLCB3ZSBtaWdodCBuZWVkIHRvIGNoYW5nZSB0aGUgY3VycmVudCBwYWdlXG4gICAgaWYgKHRoaXMuY3VycmVudCA+IHRoaXMubGFzdCkge1xuICAgICAgdGhpcy5jdXJyZW50ID0gdGhpcy5sYXN0O1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBMYXN0IHBhZ2VcbiAgICovXG4gIHByaXZhdGUgX2xhc3Q6IG51bWJlcjtcbiAgcHVibGljIGdldCBsYXN0KCk6IG51bWJlciB7XG4gICAgaWYgKHRoaXMuX2xhc3QpIHtcbiAgICAgIHJldHVybiB0aGlzLl9sYXN0O1xuICAgIH1cbiAgICAvLyBJZiB0aGUgbGFzdCBwYWdlIGlzbid0IGtub3duLCB3ZSBjb21wdXRlIGl0IGZyb20gdGhlIGxhc3QgaXRlbSdzIGluZGV4XG4gICAgaWYgKHRoaXMuc2l6ZSA+IDAgJiYgdGhpcy50b3RhbEl0ZW1zKSB7XG4gICAgICByZXR1cm4gTWF0aC5jZWlsKHRoaXMudG90YWxJdGVtcyAvIHRoaXMuc2l6ZSk7XG4gICAgfVxuICAgIHJldHVybiAxO1xuICB9XG4gIHB1YmxpYyBzZXQgbGFzdChwYWdlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9sYXN0ID0gcGFnZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgT2JzZXJ2YWJsZSB0aGF0IGxldHMgb3RoZXIgY2xhc3NlcyBzdWJzY3JpYmUgdG8gcGFnZSBjaGFuZ2VzXG4gICAqL1xuICBwcml2YXRlIF9jaGFuZ2UgPSBuZXcgU3ViamVjdDxudW1iZXI+KCk7XG4gIC8vIFdlIGRvIG5vdCB3YW50IHRvIGV4cG9zZSB0aGUgU3ViamVjdCBpdHNlbGYsIGJ1dCB0aGUgT2JzZXJ2YWJsZSB3aGljaCBpcyByZWFkLW9ubHlcbiAgcHVibGljIGdldCBjaGFuZ2UoKTogT2JzZXJ2YWJsZTxudW1iZXI+IHtcbiAgICByZXR1cm4gdGhpcy5fY2hhbmdlLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2l6ZUNoYW5nZSA9IG5ldyBTdWJqZWN0PG51bWJlcj4oKTtcblxuICBwdWJsaWMgZ2V0IHNpemVDaGFuZ2UoKTogT2JzZXJ2YWJsZTxudW1iZXI+IHtcbiAgICByZXR1cm4gdGhpcy5fc2l6ZUNoYW5nZS5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDdXJyZW50IHBhZ2VcbiAgICovXG4gIHByaXZhdGUgX2N1cnJlbnQgPSAxO1xuICBwdWJsaWMgZ2V0IGN1cnJlbnQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudDtcbiAgfVxuICBwdWJsaWMgc2V0IGN1cnJlbnQocGFnZTogbnVtYmVyKSB7XG4gICAgaWYgKHBhZ2UgIT09IHRoaXMuX2N1cnJlbnQpIHtcbiAgICAgIHRoaXMuc3RhdGVEZWJvdW5jZXIuY2hhbmdlU3RhcnQoKTtcbiAgICAgIHRoaXMuX2N1cnJlbnQgPSBwYWdlO1xuICAgICAgdGhpcy5fY2hhbmdlLm5leHQocGFnZSk7XG4gICAgICB0aGlzLnN0YXRlRGVib3VuY2VyLmNoYW5nZURvbmUoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTW92ZXMgdG8gdGhlIHByZXZpb3VzIHBhZ2UgaWYgaXQgZXhpc3RzXG4gICAqL1xuICBwdWJsaWMgcHJldmlvdXMoKSB7XG4gICAgaWYgKHRoaXMuY3VycmVudCA+IDEpIHtcbiAgICAgIHRoaXMuY3VycmVudC0tO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBNb3ZlcyB0byB0aGUgbmV4dCBwYWdlIGlmIGl0IGV4aXN0c1xuICAgKi9cbiAgcHVibGljIG5leHQoKSB7XG4gICAgaWYgKHRoaXMuY3VycmVudCA8IHRoaXMubGFzdCkge1xuICAgICAgdGhpcy5jdXJyZW50Kys7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEluZGV4IG9mIHRoZSBmaXJzdCBpdGVtIGRpc3BsYXllZCBvbiB0aGUgY3VycmVudCBwYWdlLCBzdGFydGluZyBhdCAwXG4gICAqL1xuICBwdWJsaWMgZ2V0IGZpcnN0SXRlbSgpOiBudW1iZXIge1xuICAgIGlmICh0aGlzLnNpemUgPT09IDApIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICByZXR1cm4gKHRoaXMuY3VycmVudCAtIDEpICogdGhpcy5zaXplO1xuICB9XG5cbiAgLyoqXG4gICAqIEluZGV4IG9mIHRoZSBsYXN0IGl0ZW0gZGlzcGxheWVkIG9uIHRoZSBjdXJyZW50IHBhZ2UsIHN0YXJ0aW5nIGF0IDBcbiAgICovXG4gIHB1YmxpYyBnZXQgbGFzdEl0ZW0oKTogbnVtYmVyIHtcbiAgICBpZiAodGhpcy5zaXplID09PSAwKSB7XG4gICAgICByZXR1cm4gdGhpcy50b3RhbEl0ZW1zIC0gMTtcbiAgICB9XG4gICAgbGV0IGxhc3RJblBhZ2UgPSB0aGlzLmN1cnJlbnQgKiB0aGlzLnNpemUgLSAxO1xuICAgIGlmICh0aGlzLnRvdGFsSXRlbXMpIHtcbiAgICAgIGxhc3RJblBhZ2UgPSBNYXRoLm1pbihsYXN0SW5QYWdlLCB0aGlzLnRvdGFsSXRlbXMgLSAxKTtcbiAgICB9XG4gICAgcmV0dXJuIGxhc3RJblBhZ2U7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXRzIHRoZSBwYWdlIHNpemUgdG8gMFxuICAgKi9cbiAgcHVibGljIHJlc2V0UGFnZVNpemUoKTogdm9pZCB7XG4gICAgdGhpcy5zaXplID0gMDtcbiAgfVxufVxuIl19