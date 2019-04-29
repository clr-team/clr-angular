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
     * @private
     */
    ClrDatagridPagination.prototype._pageSubscription;
    /** @type {?} */
    ClrDatagridPagination.prototype.currentChanged;
    /** @type {?} */
    ClrDatagridPagination.prototype.page;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtcGFnaW5hdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvZGF0YWdyaWQtcGFnaW5hdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFLQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFlBQVksRUFDWixVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFHTCxNQUFNLEVBQ04sU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUN4QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUUzRDtJQWdDRSwrQkFBbUIsSUFBVTtRQUFWLFNBQUksR0FBSixJQUFJLENBQU07UUF3RkYsbUJBQWMsR0FBRyxJQUFJLFlBQVksQ0FBUyxLQUFLLENBQUMsQ0FBQztRQXZGMUUsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0lBQzdCLENBQUM7SUFFRDs7O09BR0c7Ozs7Ozs7SUFDSCx3Q0FBUTs7Ozs7O0lBQVI7UUFBQSxpQkFVQztRQVRDOzs7O1dBSUc7UUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1NBQ3JCO1FBQ0QsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVM7Ozs7UUFBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLEtBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFqQyxDQUFpQyxFQUFDLENBQUM7SUFDcEcsQ0FBQzs7OztJQU9ELDJDQUFXOzs7SUFBWDtRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDMUIsSUFBSSxJ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InNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBWaWV3Q2hpbGQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSAnLi9wcm92aWRlcnMvcGFnZSc7XG5pbXBvcnQgeyBDbHJEYXRhZ3JpZFBhZ2VTaXplIH0gZnJvbSAnLi9kYXRhZ3JpZC1wYWdlLXNpemUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItZGctcGFnaW5hdGlvbicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cInBhZ2luYXRpb24tc2l6ZVwiICpuZ0lmPVwiX3BhZ2VTaXplQ29tcG9uZW50XCI+XG4gICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJjbHItZGctcGFnZS1zaXplXCI+PC9uZy1jb250ZW50PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJwYWdpbmF0aW9uLWRlc2NyaXB0aW9uXCI+XG4gICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInBhZ2luYXRpb24tbGlzdFwiICpuZ0lmPVwicGFnZS5sYXN0ID4gMVwiPlxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJwYWdpbmF0aW9uLWZpcnN0XCIgW2Rpc2FibGVkXT1cInBhZ2UuY3VycmVudCA8PSAxXCIgKGNsaWNrKT1cInBhZ2UuY3VycmVudCA9IDFcIj5cbiAgICAgICAgPGNsci1pY29uIHNoYXBlPVwic3RlcC1mb3J3YXJkLTIgZG93blwiPjwvY2xyLWljb24+XG4gICAgICA8L2J1dHRvbj5cbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwicGFnaW5hdGlvbi1wcmV2aW91c1wiIFtkaXNhYmxlZF09XCJwYWdlLmN1cnJlbnQgPD0gMVwiIChjbGljayk9XCJwYWdlLmN1cnJlbnQgPSBwYWdlLmN1cnJlbnQgLSAxXCI+XG4gICAgICAgIDxjbHItaWNvbiBzaGFwZT1cImFuZ2xlIGxlZnRcIj48L2Nsci1pY29uPlxuICAgICAgPC9idXR0b24+XG4gICAgICA8aW5wdXQgI2N1cnJlbnRQYWdlSW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cInBhZ2luYXRpb24tY3VycmVudFwiIFtzaXplXT1cInBhZ2UubGFzdC50b1N0cmluZygpLmxlbmd0aFwiIFt2YWx1ZV09XCJwYWdlLmN1cnJlbnRcIlxuICAgICAgICAgICAgIChrZXlkb3duLmVudGVyKT1cInVwZGF0ZUN1cnJlbnRQYWdlKCRldmVudClcIiAoYmx1cik9XCJ1cGRhdGVDdXJyZW50UGFnZSgkZXZlbnQpXCIvPiZuYnNwOy8mbmJzcDs8c3Bhbj57e3BhZ2UubGFzdH19PC9zcGFuPlxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJwYWdpbmF0aW9uLW5leHRcIiBbZGlzYWJsZWRdPVwicGFnZS5jdXJyZW50ID49IHBhZ2UubGFzdFwiIChjbGljayk9XCJwYWdlLmN1cnJlbnQgPSBwYWdlLmN1cnJlbnQgKyAxXCI+XG4gICAgICAgIDxjbHItaWNvbiBzaGFwZT1cImFuZ2xlIHJpZ2h0XCI+PC9jbHItaWNvbj5cbiAgICAgIDwvYnV0dG9uPlxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJwYWdpbmF0aW9uLWxhc3RcIiBbZGlzYWJsZWRdPVwicGFnZS5jdXJyZW50ID49IHBhZ2UubGFzdFwiIChjbGljayk9XCJwYWdlLmN1cnJlbnQgPSBwYWdlLmxhc3RcIj5cbiAgICAgICAgPGNsci1pY29uIHNoYXBlPVwic3RlcC1mb3J3YXJkLTIgdXBcIj48L2Nsci1pY29uPlxuICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+XG4gICAgYCxcbiAgaG9zdDogeyAnW2NsYXNzLnBhZ2luYXRpb25dJzogJ3RydWUnIH0sXG59KVxuZXhwb3J0IGNsYXNzIENsckRhdGFncmlkUGFnaW5hdGlvbiBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25Jbml0IHtcbiAgQENvbnRlbnRDaGlsZChDbHJEYXRhZ3JpZFBhZ2VTaXplKSBfcGFnZVNpemVDb21wb25lbnQ6IENsckRhdGFncmlkUGFnZVNpemU7XG4gIEBWaWV3Q2hpbGQoJ2N1cnJlbnRQYWdlSW5wdXQnKSBjdXJyZW50UGFnZUlucHV0UmVmOiBFbGVtZW50UmVmO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBwYWdlOiBQYWdlKSB7XG4gICAgdGhpcy5wYWdlLmFjdGl2YXRlZCA9IHRydWU7XG4gIH1cblxuICAvKioqKioqKioqKlxuICAgKiBTdWJzY3JpcHRpb24gdG8gdGhlIFBhZ2Ugc2VydmljZSBmb3IgcGFnZSBjaGFuZ2VzLlxuICAgKiBOb3RlOiB0aGlzIG9ubHkgZW1pdHMgYWZ0ZXIgdGhlIGRhdGFncmlkIGlzIGluaXRpYWxpemVkL3N0YWJhbGl6ZWQgYW5kIHRoZSBwYWdlIGNoYW5nZXMuXG4gICAqL1xuICBuZ09uSW5pdCgpIHtcbiAgICAvKlxuICAgICAqIERlZmF1bHQgcGFnZSBzaXplIGlzIDEwLlxuICAgICAqIFRoZSByZWFzb24gd2Ugc2V0IGl0IGhlcmUgYW5kIG5vdCBpbiB0aGUgcHJvdmlkZXIgaXRzZWxmIGlzIGJlY2F1c2VcbiAgICAgKiB3ZSBkb24ndCB3YW50IHBhZ2luYXRpb24gaWYgdGhpcyBjb21wb25lbnQgaXNuJ3QgcHJlc2VudCBpbiB0aGUgZGF0YWdyaWQuXG4gICAgICovXG4gICAgaWYgKCF0aGlzLnBhZ2Uuc2l6ZSkge1xuICAgICAgdGhpcy5wYWdlLnNpemUgPSAxMDtcbiAgICB9XG4gICAgdGhpcy5fcGFnZVN1YnNjcmlwdGlvbiA9IHRoaXMucGFnZS5jaGFuZ2Uuc3Vic2NyaWJlKGN1cnJlbnQgPT4gdGhpcy5jdXJyZW50Q2hhbmdlZC5lbWl0KGN1cnJlbnQpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdWJzY3JpcHRpb24gdG8gdGhlIHBhZ2Ugc2VydmljZSBjaGFuZ2VzXG4gICAqL1xuICBwcml2YXRlIF9wYWdlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5wYWdlLnJlc2V0UGFnZVNpemUoKTtcbiAgICBpZiAodGhpcy5fcGFnZVN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5fcGFnZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQYWdlIHNpemVcbiAgICovXG4gIHB1YmxpYyBnZXQgcGFnZVNpemUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5wYWdlLnNpemU7XG4gIH1cblxuICBASW5wdXQoJ2NsckRnUGFnZVNpemUnKVxuICBwdWJsaWMgc2V0IHBhZ2VTaXplKHNpemU6IG51bWJlcikge1xuICAgIGlmICh0eXBlb2Ygc2l6ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgIHRoaXMucGFnZS5zaXplID0gc2l6ZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVG90YWwgaXRlbXMgKG5lZWRlZCB0byBndWVzcyB0aGUgbGFzdCBwYWdlKVxuICAgKi9cbiAgcHVibGljIGdldCB0b3RhbEl0ZW1zKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMucGFnZS50b3RhbEl0ZW1zO1xuICB9XG5cbiAgQElucHV0KCdjbHJEZ1RvdGFsSXRlbXMnKVxuICBwdWJsaWMgc2V0IHRvdGFsSXRlbXModG90YWw6IG51bWJlcikge1xuICAgIGlmICh0eXBlb2YgdG90YWwgPT09ICdudW1iZXInKSB7XG4gICAgICB0aGlzLnBhZ2UudG90YWxJdGVtcyA9IHRvdGFsO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBMYXN0IHBhZ2VcbiAgICovXG4gIHB1YmxpYyBnZXQgbGFzdFBhZ2UoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5wYWdlLmxhc3Q7XG4gIH1cblxuICBASW5wdXQoJ2NsckRnTGFzdFBhZ2UnKVxuICBwdWJsaWMgc2V0IGxhc3RQYWdlKGxhc3Q6IG51bWJlcikge1xuICAgIGlmICh0eXBlb2YgbGFzdCA9PT0gJ251bWJlcicpIHtcbiAgICAgIHRoaXMucGFnZS5sYXN0ID0gbGFzdDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ3VycmVudCBwYWdlXG4gICAqL1xuICBwdWJsaWMgZ2V0IGN1cnJlbnRQYWdlKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMucGFnZS5jdXJyZW50O1xuICB9XG5cbiAgQElucHV0KCdjbHJEZ1BhZ2UnKVxuICBwdWJsaWMgc2V0IGN1cnJlbnRQYWdlKHBhZ2U6IG51bWJlcikge1xuICAgIGlmICh0eXBlb2YgcGFnZSA9PT0gJ251bWJlcicpIHtcbiAgICAgIHRoaXMucGFnZS5jdXJyZW50ID0gcGFnZTtcbiAgICB9XG4gIH1cblxuICBAT3V0cHV0KCdjbHJEZ1BhZ2VDaGFuZ2UnKSBjdXJyZW50Q2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPihmYWxzZSk7XG5cbiAgLyoqXG4gICAqIE1vdmVzIHRvIHRoZSBwcmV2aW91cyBwYWdlIGlmIGl0IGV4aXN0c1xuICAgKi9cbiAgcHVibGljIHByZXZpb3VzKCkge1xuICAgIHRoaXMucGFnZS5wcmV2aW91cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1vdmVzIHRvIHRoZSBuZXh0IHBhZ2UgaWYgaXQgZXhpc3RzXG4gICAqL1xuICBwdWJsaWMgbmV4dCgpIHtcbiAgICB0aGlzLnBhZ2UubmV4dCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluZGV4IG9mIHRoZSBmaXJzdCBpdGVtIGRpc3BsYXllZCBvbiB0aGUgY3VycmVudCBwYWdlLCBzdGFydGluZyBhdCAwLCAtMSBpZiBub25lIGRpc3BsYXllZFxuICAgKi9cbiAgcHVibGljIGdldCBmaXJzdEl0ZW0oKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5wYWdlLmZpcnN0SXRlbTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbmRleCBvZiB0aGUgbGFzdCBpdGVtIGRpc3BsYXllZCBvbiB0aGUgY3VycmVudCBwYWdlLCBzdGFydGluZyBhdCAwLCAtMSBpZiBub25lIGRpc3BsYXllZFxuICAgKi9cbiAgcHVibGljIGdldCBsYXN0SXRlbSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnBhZ2UubGFzdEl0ZW07XG4gIH1cblxuICAvKipcbiAgICogQ29uZGl0aW9uYWxseSBhZGRzIHBhZ2UgbnVtYmVycyBiZWZvcmUgYW5kIGFmdGVyIHRoZSBjdXJyZW50IHBhZ2VcbiAgICovXG4gIHB1YmxpYyBnZXQgbWlkZGxlUGFnZXMoKTogbnVtYmVyW10ge1xuICAgIGNvbnN0IG1pZGRsZVBhZ2VzOiBudW1iZXJbXSA9IFtdO1xuICAgIGlmICh0aGlzLnBhZ2UuY3VycmVudCA+IDEpIHtcbiAgICAgIG1pZGRsZVBhZ2VzLnB1c2godGhpcy5wYWdlLmN1cnJlbnQgLSAxKTtcbiAgICB9XG4gICAgbWlkZGxlUGFnZXMucHVzaCh0aGlzLnBhZ2UuY3VycmVudCk7XG4gICAgaWYgKHRoaXMucGFnZS5jdXJyZW50IDwgdGhpcy5wYWdlLmxhc3QpIHtcbiAgICAgIG1pZGRsZVBhZ2VzLnB1c2godGhpcy5wYWdlLmN1cnJlbnQgKyAxKTtcbiAgICB9XG4gICAgcmV0dXJuIG1pZGRsZVBhZ2VzO1xuICB9XG5cbiAgLyoqXG4gICAqIFdlIG9ubHkgdXBkYXRlIHRoZSBwYWdpbmF0aW9uJ3MgY3VycmVudCBwYWdlIG9uIGJsdXIgb2YgdGhlIGlucHV0IGZpZWxkLCBvclxuICAgKiB3aGVuIHRoZXkgcHJlc3MgZW50ZXIuXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlQ3VycmVudFBhZ2UoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IHBhcnNlZCA9IHBhcnNlSW50KGV2ZW50LnRhcmdldC52YWx1ZSwgMTApO1xuXG4gICAgLy8gaWYgdGhlIGlucHV0IHZhbHVlLCBpcyBub3QgYSBudW1iZXIsIHdlIGRvbid0IHVwZGF0ZSB0aGUgcGFnZVxuICAgIGlmICghaXNOYU4ocGFyc2VkKSkge1xuICAgICAgaWYgKHBhcnNlZCA8IDEpIHtcbiAgICAgICAgdGhpcy5wYWdlLmN1cnJlbnQgPSAxO1xuICAgICAgfSBlbHNlIGlmIChwYXJzZWQgPiB0aGlzLnBhZ2UubGFzdCkge1xuICAgICAgICB0aGlzLnBhZ2UuY3VycmVudCA9IHRoaXMucGFnZS5sYXN0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wYWdlLmN1cnJlbnQgPSBwYXJzZWQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBpbnB1dCdzIHZhbHVlIHRvIHRoZSBuZXcgY3VycmVudCBwYWdlLiBUaGlzIGlzIG5lZWRlZCBiZWNhdXNlIHRoZSBjb2RlXG4gICAgICogYWJvdmUgbWF5IGhhdmUgY2hhbmdlZCB0aGUgdmFsdWUgZnJvbSB3aGF0IHRoZSB1c2VyIGVudGVyZWQgaW4uXG4gICAgICovXG4gICAgdGhpcy5jdXJyZW50UGFnZUlucHV0UmVmLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSB0aGlzLnBhZ2UuY3VycmVudDtcbiAgfVxufVxuIl19