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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvcHJvdmlkZXJzL3BhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUc1RCxNQUFNLE9BQU8sSUFBSTs7OztJQUNmLFlBQW9CLGNBQThCO1FBQTlCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUUzQyxjQUFTLEdBQUcsS0FBSyxDQUFDOzs7O1FBS2pCLFVBQUssR0FBRyxDQUFDLENBQUM7Ozs7UUEyQlYsZ0JBQVcsR0FBRyxDQUFDLENBQUM7Ozs7UUFpQ2hCLFlBQU8sR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFDO1FBTWhDLGdCQUFXLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQzs7OztRQVNwQyxhQUFRLEdBQUcsQ0FBQyxDQUFDO0lBbEZnQyxDQUFDOzs7O0lBUXRELElBQVcsSUFBSTtRQUNiLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNwQixDQUFDOzs7OztJQUNELElBQVcsSUFBSSxDQUFDLElBQVk7O2NBQ3BCLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSztRQUMxQixJQUFJLElBQUksS0FBSyxPQUFPLEVBQUU7WUFDcEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNsQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztZQUNsQixJQUFJLElBQUksS0FBSyxDQUFDLEVBQUU7Z0JBQ2QsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7YUFDbkI7aUJBQU07Z0JBQ0wsMEVBQTBFO2dCQUMxRSw0QkFBNEI7Z0JBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUN0RTtZQUNELGdGQUFnRjtZQUNoRixrRUFBa0U7WUFDbEUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2pDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNsQyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQ2xDO0lBQ0gsQ0FBQzs7OztJQU1ELElBQVcsVUFBVTtRQUNuQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDMUIsQ0FBQzs7Ozs7SUFDRCxJQUFXLFVBQVUsQ0FBQyxLQUFhO1FBQ2pDLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLDhFQUE4RTtRQUM5RSxJQUFJLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRTtZQUM1QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7U0FDMUI7SUFDSCxDQUFDOzs7O0lBTUQsSUFBVyxJQUFJO1FBQ2IsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2QsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1NBQ25CO1FBQ0QseUVBQXlFO1FBQ3pFLElBQUksSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNwQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDL0M7UUFDRCxPQUFPLENBQUMsQ0FBQztJQUNYLENBQUM7Ozs7O0lBQ0QsSUFBVyxJQUFJLENBQUMsSUFBWTtRQUMxQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztJQUNwQixDQUFDOzs7OztJQU9ELElBQVcsTUFBTTtRQUNmLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUNyQyxDQUFDOzs7O0lBSUQsSUFBVyxVQUFVO1FBQ25CLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN6QyxDQUFDOzs7O0lBTUQsSUFBVyxPQUFPO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDOzs7OztJQUNELElBQVcsT0FBTyxDQUFDLElBQVk7UUFDN0IsSUFBSSxJQUFJLEtBQUssSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUMxQixJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ2xDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDbEM7SUFDSCxDQUFDOzs7OztJQUtNLFFBQVE7UUFDYixJQUFJLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUNoQjtJQUNILENBQUM7Ozs7O0lBS00sSUFBSTtRQUNULElBQUksSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQzVCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUNoQjtJQUNILENBQUM7Ozs7O0lBS0QsSUFBVyxTQUFTO1FBQ2xCLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLEVBQUU7WUFDbkIsT0FBTyxDQUFDLENBQUM7U0FDVjtRQUNELE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDeEMsQ0FBQzs7Ozs7SUFLRCxJQUFXLFFBQVE7UUFDakIsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsRUFBRTtZQUNuQixPQUFPLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1NBQzVCOztZQUNHLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQztRQUM3QyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIsVUFBVSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDeEQ7UUFDRCxPQUFPLFVBQVUsQ0FBQztJQUNwQixDQUFDOzs7OztJQUtNLGFBQWE7UUFDbEIsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7SUFDaEIsQ0FBQzs7O1lBaEpGLFVBQVU7Ozs7WUFGRixjQUFjOzs7O0lBTXJCLHlCQUF5Qjs7Ozs7O0lBS3pCLHFCQUFrQjs7Ozs7O0lBMkJsQiwyQkFBd0I7Ozs7OztJQWV4QixxQkFBc0I7Ozs7OztJQWtCdEIsdUJBQXdDOzs7OztJQU14QywyQkFBNEM7Ozs7OztJQVM1Qyx3QkFBcUI7Ozs7O0lBbEZULDhCQUFzQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFN0YXRlRGVib3VuY2VyIH0gZnJvbSAnLi9zdGF0ZS1kZWJvdW5jZXIucHJvdmlkZXInO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUGFnZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc3RhdGVEZWJvdW5jZXI6IFN0YXRlRGVib3VuY2VyKSB7fVxuXG4gIHB1YmxpYyBhY3RpdmF0ZWQgPSBmYWxzZTtcblxuICAvKipcbiAgICogUGFnZSBzaXplLCBhIHZhbHVlIG9mIDAgbWVhbnMgbm8gcGFnaW5hdGlvblxuICAgKi9cbiAgcHJpdmF0ZSBfc2l6ZSA9IDA7XG4gIHB1YmxpYyBnZXQgc2l6ZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9zaXplO1xuICB9XG4gIHB1YmxpYyBzZXQgc2l6ZShzaXplOiBudW1iZXIpIHtcbiAgICBjb25zdCBvbGRTaXplID0gdGhpcy5fc2l6ZTtcbiAgICBpZiAoc2l6ZSAhPT0gb2xkU2l6ZSkge1xuICAgICAgdGhpcy5zdGF0ZURlYm91bmNlci5jaGFuZ2VTdGFydCgpO1xuICAgICAgdGhpcy5fc2l6ZSA9IHNpemU7XG4gICAgICBpZiAoc2l6ZSA9PT0gMCkge1xuICAgICAgICB0aGlzLl9jdXJyZW50ID0gMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFllYXAuIFRoYXQncyB0aGUgZm9ybXVsYSB0byBrZWVwIHRoZSBmaXJzdCBpdGVtIGZyb20gdGhlIG9sZCBwYWdlIHN0aWxsXG4gICAgICAgIC8vIGRpc3BsYXllZCBpbiB0aGUgbmV3IG9uZS5cbiAgICAgICAgdGhpcy5fY3VycmVudCA9IE1hdGguZmxvb3Iob2xkU2l6ZSAvIHNpemUgKiAodGhpcy5fY3VycmVudCAtIDEpKSArIDE7XG4gICAgICB9XG4gICAgICAvLyBXZSBhbHdheXMgZW1pdCBhbiBldmVudCBldmVuIGlmIHRoZSBjdXJyZW50IHBhZ2UgaW5kZXggZGlkbid0IGNoYW5nZSwgYmVjYXVzZVxuICAgICAgLy8gdGhlIHNpemUgY2hhbmdpbmcgbWVhbnMgdGhlIGl0ZW1zIGluc2lkZSB0aGUgcGFnZSBhcmUgZGlmZmVyZW50XG4gICAgICB0aGlzLl9jaGFuZ2UubmV4dCh0aGlzLl9jdXJyZW50KTtcbiAgICAgIHRoaXMuX3NpemVDaGFuZ2UubmV4dCh0aGlzLl9zaXplKTtcbiAgICAgIHRoaXMuc3RhdGVEZWJvdW5jZXIuY2hhbmdlRG9uZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUb3RhbCBpdGVtcyAobmVlZGVkIHRvIGd1ZXNzIHRoZSBsYXN0IHBhZ2UpXG4gICAqL1xuICBwcml2YXRlIF90b3RhbEl0ZW1zID0gMDtcbiAgcHVibGljIGdldCB0b3RhbEl0ZW1zKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3RvdGFsSXRlbXM7XG4gIH1cbiAgcHVibGljIHNldCB0b3RhbEl0ZW1zKHRvdGFsOiBudW1iZXIpIHtcbiAgICB0aGlzLl90b3RhbEl0ZW1zID0gdG90YWw7XG4gICAgLy8gSWYgd2UgaGF2ZSBsZXNzIGl0ZW1zIHRoYW4gYmVmb3JlLCB3ZSBtaWdodCBuZWVkIHRvIGNoYW5nZSB0aGUgY3VycmVudCBwYWdlXG4gICAgaWYgKHRoaXMuY3VycmVudCA+IHRoaXMubGFzdCkge1xuICAgICAgdGhpcy5jdXJyZW50ID0gdGhpcy5sYXN0O1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBMYXN0IHBhZ2VcbiAgICovXG4gIHByaXZhdGUgX2xhc3Q6IG51bWJlcjtcbiAgcHVibGljIGdldCBsYXN0KCk6IG51bWJlciB7XG4gICAgaWYgKHRoaXMuX2xhc3QpIHtcbiAgICAgIHJldHVybiB0aGlzLl9sYXN0O1xuICAgIH1cbiAgICAvLyBJZiB0aGUgbGFzdCBwYWdlIGlzbid0IGtub3duLCB3ZSBjb21wdXRlIGl0IGZyb20gdGhlIGxhc3QgaXRlbSdzIGluZGV4XG4gICAgaWYgKHRoaXMuc2l6ZSA+IDAgJiYgdGhpcy50b3RhbEl0ZW1zKSB7XG4gICAgICByZXR1cm4gTWF0aC5jZWlsKHRoaXMudG90YWxJdGVtcyAvIHRoaXMuc2l6ZSk7XG4gICAgfVxuICAgIHJldHVybiAxO1xuICB9XG4gIHB1YmxpYyBzZXQgbGFzdChwYWdlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9sYXN0ID0gcGFnZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgT2JzZXJ2YWJsZSB0aGF0IGxldHMgb3RoZXIgY2xhc3NlcyBzdWJzY3JpYmUgdG8gcGFnZSBjaGFuZ2VzXG4gICAqL1xuICBwcml2YXRlIF9jaGFuZ2UgPSBuZXcgU3ViamVjdDxudW1iZXI+KCk7XG4gIC8vIFdlIGRvIG5vdCB3YW50IHRvIGV4cG9zZSB0aGUgU3ViamVjdCBpdHNlbGYsIGJ1dCB0aGUgT2JzZXJ2YWJsZSB3aGljaCBpcyByZWFkLW9ubHlcbiAgcHVibGljIGdldCBjaGFuZ2UoKTogT2JzZXJ2YWJsZTxudW1iZXI+IHtcbiAgICByZXR1cm4gdGhpcy5fY2hhbmdlLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2l6ZUNoYW5nZSA9IG5ldyBTdWJqZWN0PG51bWJlcj4oKTtcblxuICBwdWJsaWMgZ2V0IHNpemVDaGFuZ2UoKTogT2JzZXJ2YWJsZTxudW1iZXI+IHtcbiAgICByZXR1cm4gdGhpcy5fc2l6ZUNoYW5nZS5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDdXJyZW50IHBhZ2VcbiAgICovXG4gIHByaXZhdGUgX2N1cnJlbnQgPSAxO1xuICBwdWJsaWMgZ2V0IGN1cnJlbnQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudDtcbiAgfVxuICBwdWJsaWMgc2V0IGN1cnJlbnQocGFnZTogbnVtYmVyKSB7XG4gICAgaWYgKHBhZ2UgIT09IHRoaXMuX2N1cnJlbnQpIHtcbiAgICAgIHRoaXMuc3RhdGVEZWJvdW5jZXIuY2hhbmdlU3RhcnQoKTtcbiAgICAgIHRoaXMuX2N1cnJlbnQgPSBwYWdlO1xuICAgICAgdGhpcy5fY2hhbmdlLm5leHQocGFnZSk7XG4gICAgICB0aGlzLnN0YXRlRGVib3VuY2VyLmNoYW5nZURvbmUoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTW92ZXMgdG8gdGhlIHByZXZpb3VzIHBhZ2UgaWYgaXQgZXhpc3RzXG4gICAqL1xuICBwdWJsaWMgcHJldmlvdXMoKSB7XG4gICAgaWYgKHRoaXMuY3VycmVudCA+IDEpIHtcbiAgICAgIHRoaXMuY3VycmVudC0tO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBNb3ZlcyB0byB0aGUgbmV4dCBwYWdlIGlmIGl0IGV4aXN0c1xuICAgKi9cbiAgcHVibGljIG5leHQoKSB7XG4gICAgaWYgKHRoaXMuY3VycmVudCA8IHRoaXMubGFzdCkge1xuICAgICAgdGhpcy5jdXJyZW50Kys7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEluZGV4IG9mIHRoZSBmaXJzdCBpdGVtIGRpc3BsYXllZCBvbiB0aGUgY3VycmVudCBwYWdlLCBzdGFydGluZyBhdCAwXG4gICAqL1xuICBwdWJsaWMgZ2V0IGZpcnN0SXRlbSgpOiBudW1iZXIge1xuICAgIGlmICh0aGlzLnNpemUgPT09IDApIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICByZXR1cm4gKHRoaXMuY3VycmVudCAtIDEpICogdGhpcy5zaXplO1xuICB9XG5cbiAgLyoqXG4gICAqIEluZGV4IG9mIHRoZSBsYXN0IGl0ZW0gZGlzcGxheWVkIG9uIHRoZSBjdXJyZW50IHBhZ2UsIHN0YXJ0aW5nIGF0IDBcbiAgICovXG4gIHB1YmxpYyBnZXQgbGFzdEl0ZW0oKTogbnVtYmVyIHtcbiAgICBpZiAodGhpcy5zaXplID09PSAwKSB7XG4gICAgICByZXR1cm4gdGhpcy50b3RhbEl0ZW1zIC0gMTtcbiAgICB9XG4gICAgbGV0IGxhc3RJblBhZ2UgPSB0aGlzLmN1cnJlbnQgKiB0aGlzLnNpemUgLSAxO1xuICAgIGlmICh0aGlzLnRvdGFsSXRlbXMpIHtcbiAgICAgIGxhc3RJblBhZ2UgPSBNYXRoLm1pbihsYXN0SW5QYWdlLCB0aGlzLnRvdGFsSXRlbXMgLSAxKTtcbiAgICB9XG4gICAgcmV0dXJuIGxhc3RJblBhZ2U7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXRzIHRoZSBwYWdlIHNpemUgdG8gMFxuICAgKi9cbiAgcHVibGljIHJlc2V0UGFnZVNpemUoKTogdm9pZCB7XG4gICAgdGhpcy5zaXplID0gMDtcbiAgfVxufVxuIl19