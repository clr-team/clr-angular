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
                    template: "\n    <div class=\"pagination-size\" *ngIf=\"_pageSizeComponent\">\n      <ng-content select=\"clr-dg-page-size\"></ng-content>\n    </div>\n    <div class=\"pagination-description\">\n      <ng-content></ng-content>\n    </div>\n    <div class=\"pagination-list\" *ngIf=\"page.last > 1\">\n      <button class=\"pagination-first\" [disabled]=\"page.current <= 1\" (click)=\"page.current = 1\">\n        <clr-icon shape=\"step-forward-2 down\"></clr-icon>\n      </button>\n      <button class=\"pagination-previous\" [disabled]=\"page.current <= 1\" (click)=\"page.current = page.current - 1\">\n        <clr-icon shape=\"angle left\"></clr-icon>\n      </button>\n      <input #currentPageInput type=\"text\" class=\"pagination-current\" [size]=\"page.last.toString().length\" [value]=\"page.current\"\n             (keydown.enter)=\"updateCurrentPage($event)\" (blur)=\"updateCurrentPage($event)\"/>&nbsp;/&nbsp;<span>{{page.last}}</span>\n      <button class=\"pagination-next\" [disabled]=\"page.current >= page.last\" (click)=\"page.current = page.current + 1\">\n        <clr-icon shape=\"angle right\"></clr-icon>\n      </button>\n      <button class=\"pagination-last\" [disabled]=\"page.current >= page.last\" (click)=\"page.current = page.last\">\n        <clr-icon shape=\"step-forward-2 up\"></clr-icon>\n      </button>\n    </div>\n    ",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtcGFnaW5hdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvZGF0YWdyaWQtcGFnaW5hdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFLQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFlBQVksRUFDWixVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFHTCxNQUFNLEVBQ04sU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUN4QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUUzRDtJQWdDRSwrQkFBbUIsSUFBVTtRQUFWLFNBQUksR0FBSixJQUFJLENBQU07UUF3RkYsbUJBQWMsR0FBRyxJQUFJLFlBQVksQ0FBUyxLQUFLLENBQUMsQ0FBQztRQXZGMUUsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0lBQzdCLENBQUM7SUFFRDs7O09BR0c7Ozs7Ozs7SUFDSCx3Q0FBUTs7Ozs7O0lBQVI7UUFBQSxpQkFVQztRQVRDOzs7O1dBSUc7UUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1NBQ3JCO1FBQ0QsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLEtBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFqQyxDQUFpQyxDQUFDLENBQUM7SUFDcEcsQ0FBQzs7OztJQU9ELDJDQUFXOzs7SUFBWDtRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDMUIsSUFBSSxJQUFJ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cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFZpZXdDaGlsZCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFBhZ2UgfSBmcm9tICcuL3Byb3ZpZGVycy9wYWdlJztcbmltcG9ydCB7IENsckRhdGFncmlkUGFnZVNpemUgfSBmcm9tICcuL2RhdGFncmlkLXBhZ2Utc2l6ZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci1kZy1wYWdpbmF0aW9uJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwicGFnaW5hdGlvbi1zaXplXCIgKm5nSWY9XCJfcGFnZVNpemVDb21wb25lbnRcIj5cbiAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImNsci1kZy1wYWdlLXNpemVcIj48L25nLWNvbnRlbnQ+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInBhZ2luYXRpb24tZGVzY3JpcHRpb25cIj5cbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwicGFnaW5hdGlvbi1saXN0XCIgKm5nSWY9XCJwYWdlLmxhc3QgPiAxXCI+XG4gICAgICA8YnV0dG9uIGNsYXNzPVwicGFnaW5hdGlvbi1maXJzdFwiIFtkaXNhYmxlZF09XCJwYWdlLmN1cnJlbnQgPD0gMVwiIChjbGljayk9XCJwYWdlLmN1cnJlbnQgPSAxXCI+XG4gICAgICAgIDxjbHItaWNvbiBzaGFwZT1cInN0ZXAtZm9yd2FyZC0yIGRvd25cIj48L2Nsci1pY29uPlxuICAgICAgPC9idXR0b24+XG4gICAgICA8YnV0dG9uIGNsYXNzPVwicGFnaW5hdGlvbi1wcmV2aW91c1wiIFtkaXNhYmxlZF09XCJwYWdlLmN1cnJlbnQgPD0gMVwiIChjbGljayk9XCJwYWdlLmN1cnJlbnQgPSBwYWdlLmN1cnJlbnQgLSAxXCI+XG4gICAgICAgIDxjbHItaWNvbiBzaGFwZT1cImFuZ2xlIGxlZnRcIj48L2Nsci1pY29uPlxuICAgICAgPC9idXR0b24+XG4gICAgICA8aW5wdXQgI2N1cnJlbnRQYWdlSW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cInBhZ2luYXRpb24tY3VycmVudFwiIFtzaXplXT1cInBhZ2UubGFzdC50b1N0cmluZygpLmxlbmd0aFwiIFt2YWx1ZV09XCJwYWdlLmN1cnJlbnRcIlxuICAgICAgICAgICAgIChrZXlkb3duLmVudGVyKT1cInVwZGF0ZUN1cnJlbnRQYWdlKCRldmVudClcIiAoYmx1cik9XCJ1cGRhdGVDdXJyZW50UGFnZSgkZXZlbnQpXCIvPiZuYnNwOy8mbmJzcDs8c3Bhbj57e3BhZ2UubGFzdH19PC9zcGFuPlxuICAgICAgPGJ1dHRvbiBjbGFzcz1cInBhZ2luYXRpb24tbmV4dFwiIFtkaXNhYmxlZF09XCJwYWdlLmN1cnJlbnQgPj0gcGFnZS5sYXN0XCIgKGNsaWNrKT1cInBhZ2UuY3VycmVudCA9IHBhZ2UuY3VycmVudCArIDFcIj5cbiAgICAgICAgPGNsci1pY29uIHNoYXBlPVwiYW5nbGUgcmlnaHRcIj48L2Nsci1pY29uPlxuICAgICAgPC9idXR0b24+XG4gICAgICA8YnV0dG9uIGNsYXNzPVwicGFnaW5hdGlvbi1sYXN0XCIgW2Rpc2FibGVkXT1cInBhZ2UuY3VycmVudCA+PSBwYWdlLmxhc3RcIiAoY2xpY2spPVwicGFnZS5jdXJyZW50ID0gcGFnZS5sYXN0XCI+XG4gICAgICAgIDxjbHItaWNvbiBzaGFwZT1cInN0ZXAtZm9yd2FyZC0yIHVwXCI+PC9jbHItaWNvbj5cbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICAgIGAsXG4gIGhvc3Q6IHsgJ1tjbGFzcy5wYWdpbmF0aW9uXSc6ICd0cnVlJyB9LFxufSlcbmV4cG9ydCBjbGFzcyBDbHJEYXRhZ3JpZFBhZ2luYXRpb24gaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uSW5pdCB7XG4gIEBDb250ZW50Q2hpbGQoQ2xyRGF0YWdyaWRQYWdlU2l6ZSkgX3BhZ2VTaXplQ29tcG9uZW50OiBDbHJEYXRhZ3JpZFBhZ2VTaXplO1xuICBAVmlld0NoaWxkKCdjdXJyZW50UGFnZUlucHV0JykgY3VycmVudFBhZ2VJbnB1dFJlZjogRWxlbWVudFJlZjtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcGFnZTogUGFnZSkge1xuICAgIHRoaXMucGFnZS5hY3RpdmF0ZWQgPSB0cnVlO1xuICB9XG5cbiAgLyoqKioqKioqKipcbiAgICogU3Vic2NyaXB0aW9uIHRvIHRoZSBQYWdlIHNlcnZpY2UgZm9yIHBhZ2UgY2hhbmdlcy5cbiAgICogTm90ZTogdGhpcyBvbmx5IGVtaXRzIGFmdGVyIHRoZSBkYXRhZ3JpZCBpcyBpbml0aWFsaXplZC9zdGFiYWxpemVkIGFuZCB0aGUgcGFnZSBjaGFuZ2VzLlxuICAgKi9cbiAgbmdPbkluaXQoKSB7XG4gICAgLypcbiAgICAgKiBEZWZhdWx0IHBhZ2Ugc2l6ZSBpcyAxMC5cbiAgICAgKiBUaGUgcmVhc29uIHdlIHNldCBpdCBoZXJlIGFuZCBub3QgaW4gdGhlIHByb3ZpZGVyIGl0c2VsZiBpcyBiZWNhdXNlXG4gICAgICogd2UgZG9uJ3Qgd2FudCBwYWdpbmF0aW9uIGlmIHRoaXMgY29tcG9uZW50IGlzbid0IHByZXNlbnQgaW4gdGhlIGRhdGFncmlkLlxuICAgICAqL1xuICAgIGlmICghdGhpcy5wYWdlLnNpemUpIHtcbiAgICAgIHRoaXMucGFnZS5zaXplID0gMTA7XG4gICAgfVxuICAgIHRoaXMuX3BhZ2VTdWJzY3JpcHRpb24gPSB0aGlzLnBhZ2UuY2hhbmdlLnN1YnNjcmliZShjdXJyZW50ID0+IHRoaXMuY3VycmVudENoYW5nZWQuZW1pdChjdXJyZW50KSk7XG4gIH1cblxuICAvKipcbiAgICogU3Vic2NyaXB0aW9uIHRvIHRoZSBwYWdlIHNlcnZpY2UgY2hhbmdlc1xuICAgKi9cbiAgcHJpdmF0ZSBfcGFnZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMucGFnZS5yZXNldFBhZ2VTaXplKCk7XG4gICAgaWYgKHRoaXMuX3BhZ2VTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuX3BhZ2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUGFnZSBzaXplXG4gICAqL1xuICBwdWJsaWMgZ2V0IHBhZ2VTaXplKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMucGFnZS5zaXplO1xuICB9XG5cbiAgQElucHV0KCdjbHJEZ1BhZ2VTaXplJylcbiAgcHVibGljIHNldCBwYWdlU2l6ZShzaXplOiBudW1iZXIpIHtcbiAgICBpZiAodHlwZW9mIHNpemUgPT09ICdudW1iZXInKSB7XG4gICAgICB0aGlzLnBhZ2Uuc2l6ZSA9IHNpemU7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRvdGFsIGl0ZW1zIChuZWVkZWQgdG8gZ3Vlc3MgdGhlIGxhc3QgcGFnZSlcbiAgICovXG4gIHB1YmxpYyBnZXQgdG90YWxJdGVtcygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnBhZ2UudG90YWxJdGVtcztcbiAgfVxuXG4gIEBJbnB1dCgnY2xyRGdUb3RhbEl0ZW1zJylcbiAgcHVibGljIHNldCB0b3RhbEl0ZW1zKHRvdGFsOiBudW1iZXIpIHtcbiAgICBpZiAodHlwZW9mIHRvdGFsID09PSAnbnVtYmVyJykge1xuICAgICAgdGhpcy5wYWdlLnRvdGFsSXRlbXMgPSB0b3RhbDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTGFzdCBwYWdlXG4gICAqL1xuICBwdWJsaWMgZ2V0IGxhc3RQYWdlKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMucGFnZS5sYXN0O1xuICB9XG5cbiAgQElucHV0KCdjbHJEZ0xhc3RQYWdlJylcbiAgcHVibGljIHNldCBsYXN0UGFnZShsYXN0OiBudW1iZXIpIHtcbiAgICBpZiAodHlwZW9mIGxhc3QgPT09ICdudW1iZXInKSB7XG4gICAgICB0aGlzLnBhZ2UubGFzdCA9IGxhc3Q7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEN1cnJlbnQgcGFnZVxuICAgKi9cbiAgcHVibGljIGdldCBjdXJyZW50UGFnZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnBhZ2UuY3VycmVudDtcbiAgfVxuXG4gIEBJbnB1dCgnY2xyRGdQYWdlJylcbiAgcHVibGljIHNldCBjdXJyZW50UGFnZShwYWdlOiBudW1iZXIpIHtcbiAgICBpZiAodHlwZW9mIHBhZ2UgPT09ICdudW1iZXInKSB7XG4gICAgICB0aGlzLnBhZ2UuY3VycmVudCA9IHBhZ2U7XG4gICAgfVxuICB9XG5cbiAgQE91dHB1dCgnY2xyRGdQYWdlQ2hhbmdlJykgY3VycmVudENoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oZmFsc2UpO1xuXG4gIC8qKlxuICAgKiBNb3ZlcyB0byB0aGUgcHJldmlvdXMgcGFnZSBpZiBpdCBleGlzdHNcbiAgICovXG4gIHB1YmxpYyBwcmV2aW91cygpIHtcbiAgICB0aGlzLnBhZ2UucHJldmlvdXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNb3ZlcyB0byB0aGUgbmV4dCBwYWdlIGlmIGl0IGV4aXN0c1xuICAgKi9cbiAgcHVibGljIG5leHQoKSB7XG4gICAgdGhpcy5wYWdlLm5leHQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbmRleCBvZiB0aGUgZmlyc3QgaXRlbSBkaXNwbGF5ZWQgb24gdGhlIGN1cnJlbnQgcGFnZSwgc3RhcnRpbmcgYXQgMFxuICAgKi9cbiAgcHVibGljIGdldCBmaXJzdEl0ZW0oKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5wYWdlLmZpcnN0SXRlbTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbmRleCBvZiB0aGUgbGFzdCBpdGVtIGRpc3BsYXllZCBvbiB0aGUgY3VycmVudCBwYWdlLCBzdGFydGluZyBhdCAwXG4gICAqL1xuICBwdWJsaWMgZ2V0IGxhc3RJdGVtKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMucGFnZS5sYXN0SXRlbTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb25kaXRpb25hbGx5IGFkZHMgcGFnZSBudW1iZXJzIGJlZm9yZSBhbmQgYWZ0ZXIgdGhlIGN1cnJlbnQgcGFnZVxuICAgKi9cbiAgcHVibGljIGdldCBtaWRkbGVQYWdlcygpOiBudW1iZXJbXSB7XG4gICAgY29uc3QgbWlkZGxlUGFnZXM6IG51bWJlcltdID0gW107XG4gICAgaWYgKHRoaXMucGFnZS5jdXJyZW50ID4gMSkge1xuICAgICAgbWlkZGxlUGFnZXMucHVzaCh0aGlzLnBhZ2UuY3VycmVudCAtIDEpO1xuICAgIH1cbiAgICBtaWRkbGVQYWdlcy5wdXNoKHRoaXMucGFnZS5jdXJyZW50KTtcbiAgICBpZiAodGhpcy5wYWdlLmN1cnJlbnQgPCB0aGlzLnBhZ2UubGFzdCkge1xuICAgICAgbWlkZGxlUGFnZXMucHVzaCh0aGlzLnBhZ2UuY3VycmVudCArIDEpO1xuICAgIH1cbiAgICByZXR1cm4gbWlkZGxlUGFnZXM7XG4gIH1cblxuICAvKipcbiAgICogV2Ugb25seSB1cGRhdGUgdGhlIHBhZ2luYXRpb24ncyBjdXJyZW50IHBhZ2Ugb24gYmx1ciBvZiB0aGUgaW5wdXQgZmllbGQsIG9yXG4gICAqIHdoZW4gdGhleSBwcmVzcyBlbnRlci5cbiAgICovXG4gIHB1YmxpYyB1cGRhdGVDdXJyZW50UGFnZShldmVudDogYW55KTogdm9pZCB7XG4gICAgY29uc3QgcGFyc2VkID0gcGFyc2VJbnQoZXZlbnQudGFyZ2V0LnZhbHVlLCAxMCk7XG5cbiAgICAvLyBpZiB0aGUgaW5wdXQgdmFsdWUsIGlzIG5vdCBhIG51bWJlciwgd2UgZG9uJ3QgdXBkYXRlIHRoZSBwYWdlXG4gICAgaWYgKCFpc05hTihwYXJzZWQpKSB7XG4gICAgICBpZiAocGFyc2VkIDwgMSkge1xuICAgICAgICB0aGlzLnBhZ2UuY3VycmVudCA9IDE7XG4gICAgICB9IGVsc2UgaWYgKHBhcnNlZCA+IHRoaXMucGFnZS5sYXN0KSB7XG4gICAgICAgIHRoaXMucGFnZS5jdXJyZW50ID0gdGhpcy5wYWdlLmxhc3Q7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnBhZ2UuY3VycmVudCA9IHBhcnNlZDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIGlucHV0J3MgdmFsdWUgdG8gdGhlIG5ldyBjdXJyZW50IHBhZ2UuIFRoaXMgaXMgbmVlZGVkIGJlY2F1c2UgdGhlIGNvZGVcbiAgICAgKiBhYm92ZSBtYXkgaGF2ZSBjaGFuZ2VkIHRoZSB2YWx1ZSBmcm9tIHdoYXQgdGhlIHVzZXIgZW50ZXJlZCBpbi5cbiAgICAgKi9cbiAgICB0aGlzLmN1cnJlbnRQYWdlSW5wdXRSZWYubmF0aXZlRWxlbWVudC52YWx1ZSA9IHRoaXMucGFnZS5jdXJyZW50O1xuICB9XG59XG4iXX0=