/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ContentChild, ElementRef, EventEmitter, Input, Output, ViewChild, } from '@angular/core';
import { Page } from './providers/page';
import { ClrDatagridPageSize } from './datagrid-page-size';
var ClrDatagridPagination = /** @class */ (function () {
    function ClrDatagridPagination(page) {
        this.page = page;
        this.currentChanged = new EventEmitter(false);
        this.page.activated = true;
    }
    /**********
     * Subscription to the Page service for page changes.
     * Note: this only emits after the datagrid is initialized/stabalized and the page changes.
     */
    /**
     * *******
     * Subscription to the Page service for page changes.
     * Note: this only emits after the datagrid is initialized/stabalized and the page changes.
     * @return {?}
     */
    ClrDatagridPagination.prototype.ngOnInit = /**
     * *******
     * Subscription to the Page service for page changes.
     * Note: this only emits after the datagrid is initialized/stabalized and the page changes.
     * @return {?}
     */
    function () {
        var _this = this;
        /*
         * Default page size is 10.
         * The reason we set it here and not in the provider itself is because
         * we don't want pagination if this component isn't present in the datagrid.
         */
        if (!this.page.size) {
            this.page.size = 10;
        }
        this._pageSubscription = this.page.change.subscribe((/**
         * @param {?} current
         * @return {?}
         */
        function (current) { return _this.currentChanged.emit(current); }));
    };
    /**
     * @return {?}
     */
    ClrDatagridPagination.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.page.resetPageSize();
        if (this._pageSubscription) {
            this._pageSubscription.unsubscribe();
        }
    };
    Object.defineProperty(ClrDatagridPagination.prototype, "pageSize", {
        /**
         * Page size
         */
        get: /**
         * Page size
         * @return {?}
         */
        function () {
            return this.page.size;
        },
        set: /**
         * @param {?} size
         * @return {?}
         */
        function (size) {
            if (typeof size === 'number') {
                this.page.size = size;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridPagination.prototype, "totalItems", {
        /**
         * Total items (needed to guess the last page)
         */
        get: /**
         * Total items (needed to guess the last page)
         * @return {?}
         */
        function () {
            return this.page.totalItems;
        },
        set: /**
         * @param {?} total
         * @return {?}
         */
        function (total) {
            if (typeof total === 'number') {
                this.page.totalItems = total;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridPagination.prototype, "lastPage", {
        /**
         * Last page
         */
        get: /**
         * Last page
         * @return {?}
         */
        function () {
            return this.page.last;
        },
        set: /**
         * @param {?} last
         * @return {?}
         */
        function (last) {
            if (typeof last === 'number') {
                this.page.last = last;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridPagination.prototype, "currentPage", {
        /**
         * Current page
         */
        get: /**
         * Current page
         * @return {?}
         */
        function () {
            return this.page.current;
        },
        set: /**
         * @param {?} page
         * @return {?}
         */
        function (page) {
            if (typeof page === 'number') {
                this.page.current = page;
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
    ClrDatagridPagination.prototype.previous = /**
     * Moves to the previous page if it exists
     * @return {?}
     */
    function () {
        this.page.previous();
    };
    /**
     * Moves to the next page if it exists
     */
    /**
     * Moves to the next page if it exists
     * @return {?}
     */
    ClrDatagridPagination.prototype.next = /**
     * Moves to the next page if it exists
     * @return {?}
     */
    function () {
        this.page.next();
    };
    Object.defineProperty(ClrDatagridPagination.prototype, "firstItem", {
        /**
         * Index of the first item displayed on the current page, starting at 0, -1 if none displayed
         */
        get: /**
         * Index of the first item displayed on the current page, starting at 0, -1 if none displayed
         * @return {?}
         */
        function () {
            return this.page.firstItem;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridPagination.prototype, "lastItem", {
        /**
         * Index of the last item displayed on the current page, starting at 0, -1 if none displayed
         */
        get: /**
         * Index of the last item displayed on the current page, starting at 0, -1 if none displayed
         * @return {?}
         */
        function () {
            return this.page.lastItem;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridPagination.prototype, "middlePages", {
        /**
         * Conditionally adds page numbers before and after the current page
         */
        get: /**
         * Conditionally adds page numbers before and after the current page
         * @return {?}
         */
        function () {
            /** @type {?} */
            var middlePages = [];
            if (this.page.current > 1) {
                middlePages.push(this.page.current - 1);
            }
            middlePages.push(this.page.current);
            if (this.page.current < this.page.last) {
                middlePages.push(this.page.current + 1);
            }
            return middlePages;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * We only update the pagination's current page on blur of the input field, or
     * when they press enter.
     */
    /**
     * We only update the pagination's current page on blur of the input field, or
     * when they press enter.
     * @param {?} event
     * @return {?}
     */
    ClrDatagridPagination.prototype.updateCurrentPage = /**
     * We only update the pagination's current page on blur of the input field, or
     * when they press enter.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var parsed = parseInt(event.target.value, 10);
        // if the input value, is not a number, we don't update the page
        if (!isNaN(parsed)) {
            if (parsed < 1) {
                this.page.current = 1;
            }
            else if (parsed > this.page.last) {
                this.page.current = this.page.last;
            }
            else {
                this.page.current = parsed;
            }
        }
        /**
         * Set the input's value to the new current page. This is needed because the code
         * above may have changed the value from what the user entered in.
         */
        this.currentPageInputRef.nativeElement.value = this.page.current;
    };
    ClrDatagridPagination.decorators = [
        { type: Component, args: [{
                    selector: 'clr-dg-pagination',
                    template: "\n    <div class=\"pagination-size\" *ngIf=\"_pageSizeComponent\">\n      <ng-content select=\"clr-dg-page-size\"></ng-content>\n    </div>\n    <div class=\"pagination-description\">\n      <ng-content></ng-content>\n    </div>\n    <div class=\"pagination-list\" *ngIf=\"page.last > 1\">\n      <button type=\"button\" class=\"pagination-first\" [disabled]=\"page.current <= 1\" (click)=\"page.current = 1\">\n        <clr-icon shape=\"step-forward-2 down\"></clr-icon>\n      </button>\n      <button type=\"button\" class=\"pagination-previous\" [disabled]=\"page.current <= 1\" (click)=\"page.current = page.current - 1\">\n        <clr-icon shape=\"angle left\"></clr-icon>\n      </button>\n      <input #currentPageInput type=\"text\" class=\"pagination-current\" [size]=\"page.last.toString().length\" [value]=\"page.current\"\n             (keydown.enter)=\"updateCurrentPage($event)\" (blur)=\"updateCurrentPage($event)\"/>&nbsp;/&nbsp;<span>{{page.last}}</span>\n      <button type=\"button\" class=\"pagination-next\" [disabled]=\"page.current >= page.last\" (click)=\"page.current = page.current + 1\">\n        <clr-icon shape=\"angle right\"></clr-icon>\n      </button>\n      <button type=\"button\" class=\"pagination-last\" [disabled]=\"page.current >= page.last\" (click)=\"page.current = page.last\">\n        <clr-icon shape=\"step-forward-2 up\"></clr-icon>\n      </button>\n    </div>\n    ",
                    host: { '[class.pagination]': 'true' }
                }] }
    ];
    /** @nocollapse */
    ClrDatagridPagination.ctorParameters = function () { return [
        { type: Page }
    ]; };
    ClrDatagridPagination.propDecorators = {
        _pageSizeComponent: [{ type: ContentChild, args: [ClrDatagridPageSize, { static: false },] }],
        currentPageInputRef: [{ type: ViewChild, args: ['currentPageInput', { static: false },] }],
        pageSize: [{ type: Input, args: ['clrDgPageSize',] }],
        totalItems: [{ type: Input, args: ['clrDgTotalItems',] }],
        lastPage: [{ type: Input, args: ['clrDgLastPage',] }],
        currentPage: [{ type: Input, args: ['clrDgPage',] }],
        currentChanged: [{ type: Output, args: ['clrDgPageChange',] }]
    };
    return ClrDatagridPagination;
}());
export { ClrDatagridPagination };
if (false) {
    /** @type {?} */
    ClrDatagridPagination.prototype._pageSizeComponent;
    /** @type {?} */
    ClrDatagridPagination.prototype.currentPageInputRef;
    /**
     * Subscription to the page service changes
     * @type {?}
     * @private
     */
    ClrDatagridPagination.prototype._pageSubscription;
    /** @type {?} */
    ClrDatagridPagination.prototype.currentChanged;
    /** @type {?} */
    ClrDatagridPagination.prototype.page;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtcGFnaW5hdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvZGF0YWdyaWQtcGFnaW5hdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFLQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFlBQVksRUFDWixVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFHTCxNQUFNLEVBQ04sU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUN4QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUUzRDtJQWtDRSwrQkFBbUIsSUFBVTtRQUFWLFNBQUksR0FBSixJQUFJLENBQU07UUF3RkYsbUJBQWMsR0FBRyxJQUFJLFlBQVksQ0FBUyxLQUFLLENBQUMsQ0FBQztRQXZGMUUsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0lBQzdCLENBQUM7SUFFRDs7O09BR0c7Ozs7Ozs7SUFDSCx3Q0FBUTs7Ozs7O0lBQVI7UUFBQSxpQkFVQztRQVRDOzs7O1dBSUc7UUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1NBQ3JCO1FBQ0QsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVM7Ozs7UUFBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLEtBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFqQyxDQUFpQyxFQUFDLENBQUM7SUFDcEcsQ0FBQzs7OztJQU9ELDJDQUFXOzs7SUFBWDtRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDMUIsSUFBSSxJ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eEMsb0RBQ2dDOzs7Ozs7SUF5QmhDLGtEQUF3Qzs7SUFpRXhDLCtDQUE0RTs7SUF4RmhFLHFDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBWaWV3Q2hpbGQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSAnLi9wcm92aWRlcnMvcGFnZSc7XG5pbXBvcnQgeyBDbHJEYXRhZ3JpZFBhZ2VTaXplIH0gZnJvbSAnLi9kYXRhZ3JpZC1wYWdlLXNpemUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItZGctcGFnaW5hdGlvbicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cInBhZ2luYXRpb24tc2l6ZVwiICpuZ0lmPVwiX3BhZ2VTaXplQ29tcG9uZW50XCI+XG4gICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJjbHItZGctcGFnZS1zaXplXCI+PC9uZy1jb250ZW50PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJwYWdpbmF0aW9uLWRlc2NyaXB0aW9uXCI+XG4gICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInBhZ2luYXRpb24tbGlzdFwiICpuZ0lmPVwicGFnZS5sYXN0ID4gMVwiPlxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJwYWdpbmF0aW9uLWZpcnN0XCIgW2Rpc2FibGVkXT1cInBhZ2UuY3VycmVudCA8PSAxXCIgKGNsaWNrKT1cInBhZ2UuY3VycmVudCA9IDFcIj5cbiAgICAgICAgPGNsci1pY29uIHNoYXBlPVwic3RlcC1mb3J3YXJkLTIgZG93blwiPjwvY2xyLWljb24+XG4gICAgICA8L2J1dHRvbj5cbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwicGFnaW5hdGlvbi1wcmV2aW91c1wiIFtkaXNhYmxlZF09XCJwYWdlLmN1cnJlbnQgPD0gMVwiIChjbGljayk9XCJwYWdlLmN1cnJlbnQgPSBwYWdlLmN1cnJlbnQgLSAxXCI+XG4gICAgICAgIDxjbHItaWNvbiBzaGFwZT1cImFuZ2xlIGxlZnRcIj48L2Nsci1pY29uPlxuICAgICAgPC9idXR0b24+XG4gICAgICA8aW5wdXQgI2N1cnJlbnRQYWdlSW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cInBhZ2luYXRpb24tY3VycmVudFwiIFtzaXplXT1cInBhZ2UubGFzdC50b1N0cmluZygpLmxlbmd0aFwiIFt2YWx1ZV09XCJwYWdlLmN1cnJlbnRcIlxuICAgICAgICAgICAgIChrZXlkb3duLmVudGVyKT1cInVwZGF0ZUN1cnJlbnRQYWdlKCRldmVudClcIiAoYmx1cik9XCJ1cGRhdGVDdXJyZW50UGFnZSgkZXZlbnQpXCIvPiZuYnNwOy8mbmJzcDs8c3Bhbj57e3BhZ2UubGFzdH19PC9zcGFuPlxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJwYWdpbmF0aW9uLW5leHRcIiBbZGlzYWJsZWRdPVwicGFnZS5jdXJyZW50ID49IHBhZ2UubGFzdFwiIChjbGljayk9XCJwYWdlLmN1cnJlbnQgPSBwYWdlLmN1cnJlbnQgKyAxXCI+XG4gICAgICAgIDxjbHItaWNvbiBzaGFwZT1cImFuZ2xlIHJpZ2h0XCI+PC9jbHItaWNvbj5cbiAgICAgIDwvYnV0dG9uPlxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJwYWdpbmF0aW9uLWxhc3RcIiBbZGlzYWJsZWRdPVwicGFnZS5jdXJyZW50ID49IHBhZ2UubGFzdFwiIChjbGljayk9XCJwYWdlLmN1cnJlbnQgPSBwYWdlLmxhc3RcIj5cbiAgICAgICAgPGNsci1pY29uIHNoYXBlPVwic3RlcC1mb3J3YXJkLTIgdXBcIj48L2Nsci1pY29uPlxuICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+XG4gICAgYCxcbiAgaG9zdDogeyAnW2NsYXNzLnBhZ2luYXRpb25dJzogJ3RydWUnIH0sXG59KVxuZXhwb3J0IGNsYXNzIENsckRhdGFncmlkUGFnaW5hdGlvbiBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25Jbml0IHtcbiAgQENvbnRlbnRDaGlsZChDbHJEYXRhZ3JpZFBhZ2VTaXplLCB7IHN0YXRpYzogZmFsc2UgfSlcbiAgX3BhZ2VTaXplQ29tcG9uZW50OiBDbHJEYXRhZ3JpZFBhZ2VTaXplO1xuICBAVmlld0NoaWxkKCdjdXJyZW50UGFnZUlucHV0JywgeyBzdGF0aWM6IGZhbHNlIH0pXG4gIGN1cnJlbnRQYWdlSW5wdXRSZWY6IEVsZW1lbnRSZWY7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHBhZ2U6IFBhZ2UpIHtcbiAgICB0aGlzLnBhZ2UuYWN0aXZhdGVkID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKioqKioqKioqXG4gICAqIFN1YnNjcmlwdGlvbiB0byB0aGUgUGFnZSBzZXJ2aWNlIGZvciBwYWdlIGNoYW5nZXMuXG4gICAqIE5vdGU6IHRoaXMgb25seSBlbWl0cyBhZnRlciB0aGUgZGF0YWdyaWQgaXMgaW5pdGlhbGl6ZWQvc3RhYmFsaXplZCBhbmQgdGhlIHBhZ2UgY2hhbmdlcy5cbiAgICovXG4gIG5nT25Jbml0KCkge1xuICAgIC8qXG4gICAgICogRGVmYXVsdCBwYWdlIHNpemUgaXMgMTAuXG4gICAgICogVGhlIHJlYXNvbiB3ZSBzZXQgaXQgaGVyZSBhbmQgbm90IGluIHRoZSBwcm92aWRlciBpdHNlbGYgaXMgYmVjYXVzZVxuICAgICAqIHdlIGRvbid0IHdhbnQgcGFnaW5hdGlvbiBpZiB0aGlzIGNvbXBvbmVudCBpc24ndCBwcmVzZW50IGluIHRoZSBkYXRhZ3JpZC5cbiAgICAgKi9cbiAgICBpZiAoIXRoaXMucGFnZS5zaXplKSB7XG4gICAgICB0aGlzLnBhZ2Uuc2l6ZSA9IDEwO1xuICAgIH1cbiAgICB0aGlzLl9wYWdlU3Vic2NyaXB0aW9uID0gdGhpcy5wYWdlLmNoYW5nZS5zdWJzY3JpYmUoY3VycmVudCA9PiB0aGlzLmN1cnJlbnRDaGFuZ2VkLmVtaXQoY3VycmVudCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFN1YnNjcmlwdGlvbiB0byB0aGUgcGFnZSBzZXJ2aWNlIGNoYW5nZXNcbiAgICovXG4gIHByaXZhdGUgX3BhZ2VTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnBhZ2UucmVzZXRQYWdlU2l6ZSgpO1xuICAgIGlmICh0aGlzLl9wYWdlU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLl9wYWdlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFBhZ2Ugc2l6ZVxuICAgKi9cbiAgcHVibGljIGdldCBwYWdlU2l6ZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnBhZ2Uuc2l6ZTtcbiAgfVxuXG4gIEBJbnB1dCgnY2xyRGdQYWdlU2l6ZScpXG4gIHB1YmxpYyBzZXQgcGFnZVNpemUoc2l6ZTogbnVtYmVyKSB7XG4gICAgaWYgKHR5cGVvZiBzaXplID09PSAnbnVtYmVyJykge1xuICAgICAgdGhpcy5wYWdlLnNpemUgPSBzaXplO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUb3RhbCBpdGVtcyAobmVlZGVkIHRvIGd1ZXNzIHRoZSBsYXN0IHBhZ2UpXG4gICAqL1xuICBwdWJsaWMgZ2V0IHRvdGFsSXRlbXMoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5wYWdlLnRvdGFsSXRlbXM7XG4gIH1cblxuICBASW5wdXQoJ2NsckRnVG90YWxJdGVtcycpXG4gIHB1YmxpYyBzZXQgdG90YWxJdGVtcyh0b3RhbDogbnVtYmVyKSB7XG4gICAgaWYgKHR5cGVvZiB0b3RhbCA9PT0gJ251bWJlcicpIHtcbiAgICAgIHRoaXMucGFnZS50b3RhbEl0ZW1zID0gdG90YWw7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIExhc3QgcGFnZVxuICAgKi9cbiAgcHVibGljIGdldCBsYXN0UGFnZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnBhZ2UubGFzdDtcbiAgfVxuXG4gIEBJbnB1dCgnY2xyRGdMYXN0UGFnZScpXG4gIHB1YmxpYyBzZXQgbGFzdFBhZ2UobGFzdDogbnVtYmVyKSB7XG4gICAgaWYgKHR5cGVvZiBsYXN0ID09PSAnbnVtYmVyJykge1xuICAgICAgdGhpcy5wYWdlLmxhc3QgPSBsYXN0O1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDdXJyZW50IHBhZ2VcbiAgICovXG4gIHB1YmxpYyBnZXQgY3VycmVudFBhZ2UoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5wYWdlLmN1cnJlbnQ7XG4gIH1cblxuICBASW5wdXQoJ2NsckRnUGFnZScpXG4gIHB1YmxpYyBzZXQgY3VycmVudFBhZ2UocGFnZTogbnVtYmVyKSB7XG4gICAgaWYgKHR5cGVvZiBwYWdlID09PSAnbnVtYmVyJykge1xuICAgICAgdGhpcy5wYWdlLmN1cnJlbnQgPSBwYWdlO1xuICAgIH1cbiAgfVxuXG4gIEBPdXRwdXQoJ2NsckRnUGFnZUNoYW5nZScpIGN1cnJlbnRDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KGZhbHNlKTtcblxuICAvKipcbiAgICogTW92ZXMgdG8gdGhlIHByZXZpb3VzIHBhZ2UgaWYgaXQgZXhpc3RzXG4gICAqL1xuICBwdWJsaWMgcHJldmlvdXMoKSB7XG4gICAgdGhpcy5wYWdlLnByZXZpb3VzKCk7XG4gIH1cblxuICAvKipcbiAgICogTW92ZXMgdG8gdGhlIG5leHQgcGFnZSBpZiBpdCBleGlzdHNcbiAgICovXG4gIHB1YmxpYyBuZXh0KCkge1xuICAgIHRoaXMucGFnZS5uZXh0KCk7XG4gIH1cblxuICAvKipcbiAgICogSW5kZXggb2YgdGhlIGZpcnN0IGl0ZW0gZGlzcGxheWVkIG9uIHRoZSBjdXJyZW50IHBhZ2UsIHN0YXJ0aW5nIGF0IDAsIC0xIGlmIG5vbmUgZGlzcGxheWVkXG4gICAqL1xuICBwdWJsaWMgZ2V0IGZpcnN0SXRlbSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnBhZ2UuZmlyc3RJdGVtO1xuICB9XG5cbiAgLyoqXG4gICAqIEluZGV4IG9mIHRoZSBsYXN0IGl0ZW0gZGlzcGxheWVkIG9uIHRoZSBjdXJyZW50IHBhZ2UsIHN0YXJ0aW5nIGF0IDAsIC0xIGlmIG5vbmUgZGlzcGxheWVkXG4gICAqL1xuICBwdWJsaWMgZ2V0IGxhc3RJdGVtKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMucGFnZS5sYXN0SXRlbTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb25kaXRpb25hbGx5IGFkZHMgcGFnZSBudW1iZXJzIGJlZm9yZSBhbmQgYWZ0ZXIgdGhlIGN1cnJlbnQgcGFnZVxuICAgKi9cbiAgcHVibGljIGdldCBtaWRkbGVQYWdlcygpOiBudW1iZXJbXSB7XG4gICAgY29uc3QgbWlkZGxlUGFnZXM6IG51bWJlcltdID0gW107XG4gICAgaWYgKHRoaXMucGFnZS5jdXJyZW50ID4gMSkge1xuICAgICAgbWlkZGxlUGFnZXMucHVzaCh0aGlzLnBhZ2UuY3VycmVudCAtIDEpO1xuICAgIH1cbiAgICBtaWRkbGVQYWdlcy5wdXNoKHRoaXMucGFnZS5jdXJyZW50KTtcbiAgICBpZiAodGhpcy5wYWdlLmN1cnJlbnQgPCB0aGlzLnBhZ2UubGFzdCkge1xuICAgICAgbWlkZGxlUGFnZXMucHVzaCh0aGlzLnBhZ2UuY3VycmVudCArIDEpO1xuICAgIH1cbiAgICByZXR1cm4gbWlkZGxlUGFnZXM7XG4gIH1cblxuICAvKipcbiAgICogV2Ugb25seSB1cGRhdGUgdGhlIHBhZ2luYXRpb24ncyBjdXJyZW50IHBhZ2Ugb24gYmx1ciBvZiB0aGUgaW5wdXQgZmllbGQsIG9yXG4gICAqIHdoZW4gdGhleSBwcmVzcyBlbnRlci5cbiAgICovXG4gIHB1YmxpYyB1cGRhdGVDdXJyZW50UGFnZShldmVudDogYW55KTogdm9pZCB7XG4gICAgY29uc3QgcGFyc2VkID0gcGFyc2VJbnQoZXZlbnQudGFyZ2V0LnZhbHVlLCAxMCk7XG5cbiAgICAvLyBpZiB0aGUgaW5wdXQgdmFsdWUsIGlzIG5vdCBhIG51bWJlciwgd2UgZG9uJ3QgdXBkYXRlIHRoZSBwYWdlXG4gICAgaWYgKCFpc05hTihwYXJzZWQpKSB7XG4gICAgICBpZiAocGFyc2VkIDwgMSkge1xuICAgICAgICB0aGlzLnBhZ2UuY3VycmVudCA9IDE7XG4gICAgICB9IGVsc2UgaWYgKHBhcnNlZCA+IHRoaXMucGFnZS5sYXN0KSB7XG4gICAgICAgIHRoaXMucGFnZS5jdXJyZW50ID0gdGhpcy5wYWdlLmxhc3Q7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnBhZ2UuY3VycmVudCA9IHBhcnNlZDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIGlucHV0J3MgdmFsdWUgdG8gdGhlIG5ldyBjdXJyZW50IHBhZ2UuIFRoaXMgaXMgbmVlZGVkIGJlY2F1c2UgdGhlIGNvZGVcbiAgICAgKiBhYm92ZSBtYXkgaGF2ZSBjaGFuZ2VkIHRoZSB2YWx1ZSBmcm9tIHdoYXQgdGhlIHVzZXIgZW50ZXJlZCBpbi5cbiAgICAgKi9cbiAgICB0aGlzLmN1cnJlbnRQYWdlSW5wdXRSZWYubmF0aXZlRWxlbWVudC52YWx1ZSA9IHRoaXMucGFnZS5jdXJyZW50O1xuICB9XG59XG4iXX0=