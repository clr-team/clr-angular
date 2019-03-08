/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
        this._pageSubscription = this.page.change.subscribe(function (current) { return _this.currentChanged.emit(current); });
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
         * Index of the first item displayed on the current page, starting at 0
         */
        get: /**
         * Index of the first item displayed on the current page, starting at 0
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
         * Index of the last item displayed on the current page, starting at 0
         */
        get: /**
         * Index of the last item displayed on the current page, starting at 0
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
        _pageSizeComponent: [{ type: ContentChild, args: [ClrDatagridPageSize,] }],
        currentPageInputRef: [{ type: ViewChild, args: ['currentPageInput',] }],
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
     */
    ClrDatagridPagination.prototype._pageSubscription;
    /** @type {?} */
    ClrDatagridPagination.prototype.currentChanged;
    /** @type {?} */
    ClrDatagridPagination.prototype.page;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtcGFnaW5hdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvZGF0YWdyaWQtcGFnaW5hdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFLQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFlBQVksRUFDWixVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFHTCxNQUFNLEVBQ04sU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUN4QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUUzRDtJQWdDRSwrQkFBbUIsSUFBVTtRQUFWLFNBQUksR0FBSixJQUFJLENBQU07UUF3RkYsbUJBQWMsR0FBRyxJQUFJLFlBQVksQ0FBUyxLQUFLLENBQUMsQ0FBQztRQXZGMUUsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0lBQzdCLENBQUM7SUFFRDs7O09BR0c7Ozs7Ozs7SUFDSCx3Q0FBUTs7Ozs7O0lBQVI7UUFBQSxpQkFVQztRQVRDOzs7O1dBSUc7UUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1NBQ3JCO1FBQ0QsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLEtBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFqQyxDQUFpQyxDQUFDLENBQUM7SUFDcEcsQ0FBQzs7OztJQU9ELDJDQUFXOzs7SUFBWDtRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDMUIsSUFBSSxJQUFJ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cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFZpZXdDaGlsZCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFBhZ2UgfSBmcm9tICcuL3Byb3ZpZGVycy9wYWdlJztcbmltcG9ydCB7IENsckRhdGFncmlkUGFnZVNpemUgfSBmcm9tICcuL2RhdGFncmlkLXBhZ2Utc2l6ZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci1kZy1wYWdpbmF0aW9uJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwicGFnaW5hdGlvbi1zaXplXCIgKm5nSWY9XCJfcGFnZVNpemVDb21wb25lbnRcIj5cbiAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImNsci1kZy1wYWdlLXNpemVcIj48L25nLWNvbnRlbnQ+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInBhZ2luYXRpb24tZGVzY3JpcHRpb25cIj5cbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwicGFnaW5hdGlvbi1saXN0XCIgKm5nSWY9XCJwYWdlLmxhc3QgPiAxXCI+XG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInBhZ2luYXRpb24tZmlyc3RcIiBbZGlzYWJsZWRdPVwicGFnZS5jdXJyZW50IDw9IDFcIiAoY2xpY2spPVwicGFnZS5jdXJyZW50ID0gMVwiPlxuICAgICAgICA8Y2xyLWljb24gc2hhcGU9XCJzdGVwLWZvcndhcmQtMiBkb3duXCI+PC9jbHItaWNvbj5cbiAgICAgIDwvYnV0dG9uPlxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJwYWdpbmF0aW9uLXByZXZpb3VzXCIgW2Rpc2FibGVkXT1cInBhZ2UuY3VycmVudCA8PSAxXCIgKGNsaWNrKT1cInBhZ2UuY3VycmVudCA9IHBhZ2UuY3VycmVudCAtIDFcIj5cbiAgICAgICAgPGNsci1pY29uIHNoYXBlPVwiYW5nbGUgbGVmdFwiPjwvY2xyLWljb24+XG4gICAgICA8L2J1dHRvbj5cbiAgICAgIDxpbnB1dCAjY3VycmVudFBhZ2VJbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwicGFnaW5hdGlvbi1jdXJyZW50XCIgW3NpemVdPVwicGFnZS5sYXN0LnRvU3RyaW5nKCkubGVuZ3RoXCIgW3ZhbHVlXT1cInBhZ2UuY3VycmVudFwiXG4gICAgICAgICAgICAgKGtleWRvd24uZW50ZXIpPVwidXBkYXRlQ3VycmVudFBhZ2UoJGV2ZW50KVwiIChibHVyKT1cInVwZGF0ZUN1cnJlbnRQYWdlKCRldmVudClcIi8+Jm5ic3A7LyZuYnNwOzxzcGFuPnt7cGFnZS5sYXN0fX08L3NwYW4+XG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInBhZ2luYXRpb24tbmV4dFwiIFtkaXNhYmxlZF09XCJwYWdlLmN1cnJlbnQgPj0gcGFnZS5sYXN0XCIgKGNsaWNrKT1cInBhZ2UuY3VycmVudCA9IHBhZ2UuY3VycmVudCArIDFcIj5cbiAgICAgICAgPGNsci1pY29uIHNoYXBlPVwiYW5nbGUgcmlnaHRcIj48L2Nsci1pY29uPlxuICAgICAgPC9idXR0b24+XG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInBhZ2luYXRpb24tbGFzdFwiIFtkaXNhYmxlZF09XCJwYWdlLmN1cnJlbnQgPj0gcGFnZS5sYXN0XCIgKGNsaWNrKT1cInBhZ2UuY3VycmVudCA9IHBhZ2UubGFzdFwiPlxuICAgICAgICA8Y2xyLWljb24gc2hhcGU9XCJzdGVwLWZvcndhcmQtMiB1cFwiPjwvY2xyLWljb24+XG4gICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgICBgLFxuICBob3N0OiB7ICdbY2xhc3MucGFnaW5hdGlvbl0nOiAndHJ1ZScgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyRGF0YWdyaWRQYWdpbmF0aW9uIGltcGxlbWVudHMgT25EZXN0cm95LCBPbkluaXQge1xuICBAQ29udGVudENoaWxkKENsckRhdGFncmlkUGFnZVNpemUpIF9wYWdlU2l6ZUNvbXBvbmVudDogQ2xyRGF0YWdyaWRQYWdlU2l6ZTtcbiAgQFZpZXdDaGlsZCgnY3VycmVudFBhZ2VJbnB1dCcpIGN1cnJlbnRQYWdlSW5wdXRSZWY6IEVsZW1lbnRSZWY7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHBhZ2U6IFBhZ2UpIHtcbiAgICB0aGlzLnBhZ2UuYWN0aXZhdGVkID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKioqKioqKioqXG4gICAqIFN1YnNjcmlwdGlvbiB0byB0aGUgUGFnZSBzZXJ2aWNlIGZvciBwYWdlIGNoYW5nZXMuXG4gICAqIE5vdGU6IHRoaXMgb25seSBlbWl0cyBhZnRlciB0aGUgZGF0YWdyaWQgaXMgaW5pdGlhbGl6ZWQvc3RhYmFsaXplZCBhbmQgdGhlIHBhZ2UgY2hhbmdlcy5cbiAgICovXG4gIG5nT25Jbml0KCkge1xuICAgIC8qXG4gICAgICogRGVmYXVsdCBwYWdlIHNpemUgaXMgMTAuXG4gICAgICogVGhlIHJlYXNvbiB3ZSBzZXQgaXQgaGVyZSBhbmQgbm90IGluIHRoZSBwcm92aWRlciBpdHNlbGYgaXMgYmVjYXVzZVxuICAgICAqIHdlIGRvbid0IHdhbnQgcGFnaW5hdGlvbiBpZiB0aGlzIGNvbXBvbmVudCBpc24ndCBwcmVzZW50IGluIHRoZSBkYXRhZ3JpZC5cbiAgICAgKi9cbiAgICBpZiAoIXRoaXMucGFnZS5zaXplKSB7XG4gICAgICB0aGlzLnBhZ2Uuc2l6ZSA9IDEwO1xuICAgIH1cbiAgICB0aGlzLl9wYWdlU3Vic2NyaXB0aW9uID0gdGhpcy5wYWdlLmNoYW5nZS5zdWJzY3JpYmUoY3VycmVudCA9PiB0aGlzLmN1cnJlbnRDaGFuZ2VkLmVtaXQoY3VycmVudCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFN1YnNjcmlwdGlvbiB0byB0aGUgcGFnZSBzZXJ2aWNlIGNoYW5nZXNcbiAgICovXG4gIHByaXZhdGUgX3BhZ2VTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnBhZ2UucmVzZXRQYWdlU2l6ZSgpO1xuICAgIGlmICh0aGlzLl9wYWdlU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLl9wYWdlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFBhZ2Ugc2l6ZVxuICAgKi9cbiAgcHVibGljIGdldCBwYWdlU2l6ZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnBhZ2Uuc2l6ZTtcbiAgfVxuXG4gIEBJbnB1dCgnY2xyRGdQYWdlU2l6ZScpXG4gIHB1YmxpYyBzZXQgcGFnZVNpemUoc2l6ZTogbnVtYmVyKSB7XG4gICAgaWYgKHR5cGVvZiBzaXplID09PSAnbnVtYmVyJykge1xuICAgICAgdGhpcy5wYWdlLnNpemUgPSBzaXplO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUb3RhbCBpdGVtcyAobmVlZGVkIHRvIGd1ZXNzIHRoZSBsYXN0IHBhZ2UpXG4gICAqL1xuICBwdWJsaWMgZ2V0IHRvdGFsSXRlbXMoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5wYWdlLnRvdGFsSXRlbXM7XG4gIH1cblxuICBASW5wdXQoJ2NsckRnVG90YWxJdGVtcycpXG4gIHB1YmxpYyBzZXQgdG90YWxJdGVtcyh0b3RhbDogbnVtYmVyKSB7XG4gICAgaWYgKHR5cGVvZiB0b3RhbCA9PT0gJ251bWJlcicpIHtcbiAgICAgIHRoaXMucGFnZS50b3RhbEl0ZW1zID0gdG90YWw7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIExhc3QgcGFnZVxuICAgKi9cbiAgcHVibGljIGdldCBsYXN0UGFnZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnBhZ2UubGFzdDtcbiAgfVxuXG4gIEBJbnB1dCgnY2xyRGdMYXN0UGFnZScpXG4gIHB1YmxpYyBzZXQgbGFzdFBhZ2UobGFzdDogbnVtYmVyKSB7XG4gICAgaWYgKHR5cGVvZiBsYXN0ID09PSAnbnVtYmVyJykge1xuICAgICAgdGhpcy5wYWdlLmxhc3QgPSBsYXN0O1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDdXJyZW50IHBhZ2VcbiAgICovXG4gIHB1YmxpYyBnZXQgY3VycmVudFBhZ2UoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5wYWdlLmN1cnJlbnQ7XG4gIH1cblxuICBASW5wdXQoJ2NsckRnUGFnZScpXG4gIHB1YmxpYyBzZXQgY3VycmVudFBhZ2UocGFnZTogbnVtYmVyKSB7XG4gICAgaWYgKHR5cGVvZiBwYWdlID09PSAnbnVtYmVyJykge1xuICAgICAgdGhpcy5wYWdlLmN1cnJlbnQgPSBwYWdlO1xuICAgIH1cbiAgfVxuXG4gIEBPdXRwdXQoJ2NsckRnUGFnZUNoYW5nZScpIGN1cnJlbnRDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KGZhbHNlKTtcblxuICAvKipcbiAgICogTW92ZXMgdG8gdGhlIHByZXZpb3VzIHBhZ2UgaWYgaXQgZXhpc3RzXG4gICAqL1xuICBwdWJsaWMgcHJldmlvdXMoKSB7XG4gICAgdGhpcy5wYWdlLnByZXZpb3VzKCk7XG4gIH1cblxuICAvKipcbiAgICogTW92ZXMgdG8gdGhlIG5leHQgcGFnZSBpZiBpdCBleGlzdHNcbiAgICovXG4gIHB1YmxpYyBuZXh0KCkge1xuICAgIHRoaXMucGFnZS5uZXh0KCk7XG4gIH1cblxuICAvKipcbiAgICogSW5kZXggb2YgdGhlIGZpcnN0IGl0ZW0gZGlzcGxheWVkIG9uIHRoZSBjdXJyZW50IHBhZ2UsIHN0YXJ0aW5nIGF0IDBcbiAgICovXG4gIHB1YmxpYyBnZXQgZmlyc3RJdGVtKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMucGFnZS5maXJzdEl0ZW07XG4gIH1cblxuICAvKipcbiAgICogSW5kZXggb2YgdGhlIGxhc3QgaXRlbSBkaXNwbGF5ZWQgb24gdGhlIGN1cnJlbnQgcGFnZSwgc3RhcnRpbmcgYXQgMFxuICAgKi9cbiAgcHVibGljIGdldCBsYXN0SXRlbSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnBhZ2UubGFzdEl0ZW07XG4gIH1cblxuICAvKipcbiAgICogQ29uZGl0aW9uYWxseSBhZGRzIHBhZ2UgbnVtYmVycyBiZWZvcmUgYW5kIGFmdGVyIHRoZSBjdXJyZW50IHBhZ2VcbiAgICovXG4gIHB1YmxpYyBnZXQgbWlkZGxlUGFnZXMoKTogbnVtYmVyW10ge1xuICAgIGNvbnN0IG1pZGRsZVBhZ2VzOiBudW1iZXJbXSA9IFtdO1xuICAgIGlmICh0aGlzLnBhZ2UuY3VycmVudCA+IDEpIHtcbiAgICAgIG1pZGRsZVBhZ2VzLnB1c2godGhpcy5wYWdlLmN1cnJlbnQgLSAxKTtcbiAgICB9XG4gICAgbWlkZGxlUGFnZXMucHVzaCh0aGlzLnBhZ2UuY3VycmVudCk7XG4gICAgaWYgKHRoaXMucGFnZS5jdXJyZW50IDwgdGhpcy5wYWdlLmxhc3QpIHtcbiAgICAgIG1pZGRsZVBhZ2VzLnB1c2godGhpcy5wYWdlLmN1cnJlbnQgKyAxKTtcbiAgICB9XG4gICAgcmV0dXJuIG1pZGRsZVBhZ2VzO1xuICB9XG5cbiAgLyoqXG4gICAqIFdlIG9ubHkgdXBkYXRlIHRoZSBwYWdpbmF0aW9uJ3MgY3VycmVudCBwYWdlIG9uIGJsdXIgb2YgdGhlIGlucHV0IGZpZWxkLCBvclxuICAgKiB3aGVuIHRoZXkgcHJlc3MgZW50ZXIuXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlQ3VycmVudFBhZ2UoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IHBhcnNlZCA9IHBhcnNlSW50KGV2ZW50LnRhcmdldC52YWx1ZSwgMTApO1xuXG4gICAgLy8gaWYgdGhlIGlucHV0IHZhbHVlLCBpcyBub3QgYSBudW1iZXIsIHdlIGRvbid0IHVwZGF0ZSB0aGUgcGFnZVxuICAgIGlmICghaXNOYU4ocGFyc2VkKSkge1xuICAgICAgaWYgKHBhcnNlZCA8IDEpIHtcbiAgICAgICAgdGhpcy5wYWdlLmN1cnJlbnQgPSAxO1xuICAgICAgfSBlbHNlIGlmIChwYXJzZWQgPiB0aGlzLnBhZ2UubGFzdCkge1xuICAgICAgICB0aGlzLnBhZ2UuY3VycmVudCA9IHRoaXMucGFnZS5sYXN0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wYWdlLmN1cnJlbnQgPSBwYXJzZWQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBpbnB1dCdzIHZhbHVlIHRvIHRoZSBuZXcgY3VycmVudCBwYWdlLiBUaGlzIGlzIG5lZWRlZCBiZWNhdXNlIHRoZSBjb2RlXG4gICAgICogYWJvdmUgbWF5IGhhdmUgY2hhbmdlZCB0aGUgdmFsdWUgZnJvbSB3aGF0IHRoZSB1c2VyIGVudGVyZWQgaW4uXG4gICAgICovXG4gICAgdGhpcy5jdXJyZW50UGFnZUlucHV0UmVmLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSB0aGlzLnBhZ2UuY3VycmVudDtcbiAgfVxufVxuIl19