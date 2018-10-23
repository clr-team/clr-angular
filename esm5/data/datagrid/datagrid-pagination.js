/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Page } from './providers/page';
var ClrDatagridPagination = /** @class */ (function () {
    function ClrDatagridPagination(page) {
        this.page = page;
        this.defaultSize = true;
        this.currentChanged = new EventEmitter(false);
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
         * The reason we set it in this constructor and not in the provider itself is because
         * we don't want pagination (page size 0) if this component isn't present in the datagrid.
         */
        if (this.defaultSize) {
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
                this.defaultSize = false;
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
    ClrDatagridPagination.decorators = [
        { type: Component, args: [{
                    selector: 'clr-dg-pagination',
                    template: "\n        <div class=\"pagination-description\">\n            <ng-content></ng-content>\n        </div>\n        <ul class=\"pagination-list\" *ngIf=\"page.last > 1\">\n            <li *ngIf=\"page.current > 1\">\n                <button\n                        class=\"pagination-previous\"\n                        (click)=\"page.previous()\"\n                        type=\"button\"></button>\n            </li>\n            <li *ngIf=\"page.current > 2\">\n                <button (click)=\"page.current = 1\" type=\"button\">1</button>\n            </li>\n            <li *ngIf=\"page.current > 3\">...</li>\n            <li *ngFor=\"let pageNum of middlePages\" [class.pagination-current]=\"pageNum === page.current\">\n                <button\n                        *ngIf=\"pageNum !== page.current; else noButton\"\n                        (click)=\"page.current = pageNum\"\n                        type=\"button\">{{pageNum}}\n                </button>\n                <ng-template #noButton>{{pageNum}}</ng-template>\n            </li>\n            <li *ngIf=\"page.current < page.last - 2\">...</li>\n            <li *ngIf=\"page.current < page.last - 1\">\n                <button\n                        (click)=\"page.current = page.last\"\n                        type=\"button\">{{page.last}}\n                </button>\n            </li>\n            <li *ngIf=\"page.current < page.last\">\n                <button\n                        class=\"pagination-next\"\n                        (click)=\"page.next()\"\n                        type=\"button\"></button>\n            </li>\n        </ul>\n    ",
                    host: { '[class.pagination]': 'true' }
                }] }
    ];
    /** @nocollapse */
    ClrDatagridPagination.ctorParameters = function () { return [
        { type: Page }
    ]; };
    ClrDatagridPagination.propDecorators = {
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
    ClrDatagridPagination.prototype.defaultSize;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtcGFnaW5hdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvZGF0YWdyaWQtcGFnaW5hdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFLQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUcxRixPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFeEM7SUEyQ0UsK0JBQW1CLElBQVU7UUFBVixTQUFJLEdBQUosSUFBSSxDQUFNO1FBRXJCLGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBdUZBLG1CQUFjLEdBQUcsSUFBSSxZQUFZLENBQVMsS0FBSyxDQUFDLENBQUM7SUF6RjVDLENBQUM7SUFJakM7OztPQUdHOzs7Ozs7O0lBQ0gsd0NBQVE7Ozs7OztJQUFSO1FBQUEsaUJBVUM7UUFUQzs7OztXQUlHO1FBQ0gsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztTQUNyQjtRQUNELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBakMsQ0FBaUMsQ0FBQyxDQUFDO0lBQ3BHLENBQUM7Ozs7SUFPRCwyQ0FBVzs7O0lBQVg7UUFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQzFCLElBQUksSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQzFCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUN0QztJQUNILENBQUM7SUFLRCxzQkFBVywyQ0FBUTtRQUhuQjs7V0FFRzs7Ozs7UUFDSDtZQUNFLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDeEIsQ0FBQzs7Ozs7UUFFRCxVQUNvQixJQUFZO1lBQzlCLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxFQUFFO2dCQUM1QixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztnQkFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO2FBQ3ZCO1FBQ0gsQ0FBQzs7O09BUkE7SUFhRCxzQkFBVyw2Q0FBVTtRQUhyQjs7V0FFRzs7Ozs7UUFDSDtZQUNFLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDOUIsQ0FBQzs7Ozs7UUFFRCxVQUNzQixLQUFhO1lBQ2pDLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO2dCQUM3QixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7YUFDOUI7UUFDSCxDQUFDOzs7T0FQQTtJQVlELHNCQUFXLDJDQUFRO1FBSG5COztXQUVHOzs7OztRQUNIO1lBQ0UsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztRQUN4QixDQUFDOzs7OztRQUVELFVBQ29CLElBQVk7WUFDOUIsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7Z0JBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQzthQUN2QjtRQUNILENBQUM7OztPQVBBO0lBWUQsc0JBQVcsOENBQVc7UUFIdEI7O1dBRUc7Ozs7O1FBQ0g7WUFDRSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQzNCLENBQUM7Ozs7O1FBRUQsVUFDdUIsSUFBWTtZQUNqQyxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRTtnQkFDNUIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO2FBQzFCO1FBQ0gsQ0FBQzs7O09BUEE7SUFXRDs7T0FFRzs7Ozs7SUFDSSx3Q0FBUTs7OztJQUFmO1FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRUQ7O09BRUc7Ozs7O0lBQ0ksb0NBQUk7Ozs7SUFBWDtRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUtELHNCQUFXLDRDQUFTO1FBSHBCOztXQUVHOzs7OztRQUNIO1lBQ0UsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUM3QixDQUFDOzs7T0FBQTtJQUtELHNCQUFXLDJDQUFRO1FBSG5COztXQUVHOzs7OztRQUNIO1lBQ0UsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUM1QixDQUFDOzs7T0FBQTtJQUtELHNCQUFXLDhDQUFXO1FBSHRCOztXQUVHOzs7OztRQUNIOztnQkFDUSxXQUFXLEdBQWEsRUFBRTtZQUNoQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsRUFBRTtnQkFDekIsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQzthQUN6QztZQUNELFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNwQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO2dCQUN0QyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQ3pDO1lBQ0QsT0FBTyxXQUFXLENBQUM7UUFDckIsQ0FBQzs7O09BQUE7O2dCQS9LRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtvQkFDN0IsUUFBUSxFQUFFLCtsREFxQ1A7b0JBQ0gsSUFBSSxFQUFFLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxFQUFFO2lCQUN2Qzs7OztnQkEzQ1EsSUFBSTs7OzJCQW9GVixLQUFLLFNBQUMsZUFBZTs2QkFlckIsS0FBSyxTQUFDLGlCQUFpQjsyQkFjdkIsS0FBSyxTQUFDLGVBQWU7OEJBY3JCLEtBQUssU0FBQyxXQUFXO2lDQU9qQixNQUFNLFNBQUMsaUJBQWlCOztJQTRDM0IsNEJBQUM7Q0FBQSxBQWhMRCxJQWdMQztTQXRJWSxxQkFBcUI7OztJQUdoQyw0Q0FBMkI7Ozs7O0lBcUIzQixrREFBd0M7O0lBa0V4QywrQ0FBNEU7O0lBekZoRSxxQ0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSAnLi9wcm92aWRlcnMvcGFnZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci1kZy1wYWdpbmF0aW9uJyxcbiAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cInBhZ2luYXRpb24tZGVzY3JpcHRpb25cIj5cbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDx1bCBjbGFzcz1cInBhZ2luYXRpb24tbGlzdFwiICpuZ0lmPVwicGFnZS5sYXN0ID4gMVwiPlxuICAgICAgICAgICAgPGxpICpuZ0lmPVwicGFnZS5jdXJyZW50ID4gMVwiPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicGFnaW5hdGlvbi1wcmV2aW91c1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwicGFnZS5wcmV2aW91cygpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIj48L2J1dHRvbj5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8bGkgKm5nSWY9XCJwYWdlLmN1cnJlbnQgPiAyXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiAoY2xpY2spPVwicGFnZS5jdXJyZW50ID0gMVwiIHR5cGU9XCJidXR0b25cIj4xPC9idXR0b24+XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgPGxpICpuZ0lmPVwicGFnZS5jdXJyZW50ID4gM1wiPi4uLjwvbGk+XG4gICAgICAgICAgICA8bGkgKm5nRm9yPVwibGV0IHBhZ2VOdW0gb2YgbWlkZGxlUGFnZXNcIiBbY2xhc3MucGFnaW5hdGlvbi1jdXJyZW50XT1cInBhZ2VOdW0gPT09IHBhZ2UuY3VycmVudFwiPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICpuZ0lmPVwicGFnZU51bSAhPT0gcGFnZS5jdXJyZW50OyBlbHNlIG5vQnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJwYWdlLmN1cnJlbnQgPSBwYWdlTnVtXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIj57e3BhZ2VOdW19fVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjbm9CdXR0b24+e3twYWdlTnVtfX08L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIDxsaSAqbmdJZj1cInBhZ2UuY3VycmVudCA8IHBhZ2UubGFzdCAtIDJcIj4uLi48L2xpPlxuICAgICAgICAgICAgPGxpICpuZ0lmPVwicGFnZS5jdXJyZW50IDwgcGFnZS5sYXN0IC0gMVwiPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJwYWdlLmN1cnJlbnQgPSBwYWdlLmxhc3RcIlxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiPnt7cGFnZS5sYXN0fX1cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8bGkgKm5nSWY9XCJwYWdlLmN1cnJlbnQgPCBwYWdlLmxhc3RcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInBhZ2luYXRpb24tbmV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwicGFnZS5uZXh0KClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiPjwvYnV0dG9uPlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgPC91bD5cbiAgICBgLFxuICBob3N0OiB7ICdbY2xhc3MucGFnaW5hdGlvbl0nOiAndHJ1ZScgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyRGF0YWdyaWRQYWdpbmF0aW9uIGltcGxlbWVudHMgT25EZXN0cm95LCBPbkluaXQge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcGFnZTogUGFnZSkge31cblxuICBwcml2YXRlIGRlZmF1bHRTaXplID0gdHJ1ZTtcblxuICAvKioqKioqKioqKlxuICAgKiBTdWJzY3JpcHRpb24gdG8gdGhlIFBhZ2Ugc2VydmljZSBmb3IgcGFnZSBjaGFuZ2VzLlxuICAgKiBOb3RlOiB0aGlzIG9ubHkgZW1pdHMgYWZ0ZXIgdGhlIGRhdGFncmlkIGlzIGluaXRpYWxpemVkL3N0YWJhbGl6ZWQgYW5kIHRoZSBwYWdlIGNoYW5nZXMuXG4gICAqL1xuICBuZ09uSW5pdCgpIHtcbiAgICAvKlxuICAgICAqIERlZmF1bHQgcGFnZSBzaXplIGlzIDEwLlxuICAgICAqIFRoZSByZWFzb24gd2Ugc2V0IGl0IGluIHRoaXMgY29uc3RydWN0b3IgYW5kIG5vdCBpbiB0aGUgcHJvdmlkZXIgaXRzZWxmIGlzIGJlY2F1c2VcbiAgICAgKiB3ZSBkb24ndCB3YW50IHBhZ2luYXRpb24gKHBhZ2Ugc2l6ZSAwKSBpZiB0aGlzIGNvbXBvbmVudCBpc24ndCBwcmVzZW50IGluIHRoZSBkYXRhZ3JpZC5cbiAgICAgKi9cbiAgICBpZiAodGhpcy5kZWZhdWx0U2l6ZSkge1xuICAgICAgdGhpcy5wYWdlLnNpemUgPSAxMDtcbiAgICB9XG4gICAgdGhpcy5fcGFnZVN1YnNjcmlwdGlvbiA9IHRoaXMucGFnZS5jaGFuZ2Uuc3Vic2NyaWJlKGN1cnJlbnQgPT4gdGhpcy5jdXJyZW50Q2hhbmdlZC5lbWl0KGN1cnJlbnQpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdWJzY3JpcHRpb24gdG8gdGhlIHBhZ2Ugc2VydmljZSBjaGFuZ2VzXG4gICAqL1xuICBwcml2YXRlIF9wYWdlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5wYWdlLnJlc2V0UGFnZVNpemUoKTtcbiAgICBpZiAodGhpcy5fcGFnZVN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5fcGFnZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQYWdlIHNpemVcbiAgICovXG4gIHB1YmxpYyBnZXQgcGFnZVNpemUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5wYWdlLnNpemU7XG4gIH1cblxuICBASW5wdXQoJ2NsckRnUGFnZVNpemUnKVxuICBwdWJsaWMgc2V0IHBhZ2VTaXplKHNpemU6IG51bWJlcikge1xuICAgIGlmICh0eXBlb2Ygc2l6ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgIHRoaXMuZGVmYXVsdFNpemUgPSBmYWxzZTtcbiAgICAgIHRoaXMucGFnZS5zaXplID0gc2l6ZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVG90YWwgaXRlbXMgKG5lZWRlZCB0byBndWVzcyB0aGUgbGFzdCBwYWdlKVxuICAgKi9cbiAgcHVibGljIGdldCB0b3RhbEl0ZW1zKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMucGFnZS50b3RhbEl0ZW1zO1xuICB9XG5cbiAgQElucHV0KCdjbHJEZ1RvdGFsSXRlbXMnKVxuICBwdWJsaWMgc2V0IHRvdGFsSXRlbXModG90YWw6IG51bWJlcikge1xuICAgIGlmICh0eXBlb2YgdG90YWwgPT09ICdudW1iZXInKSB7XG4gICAgICB0aGlzLnBhZ2UudG90YWxJdGVtcyA9IHRvdGFsO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBMYXN0IHBhZ2VcbiAgICovXG4gIHB1YmxpYyBnZXQgbGFzdFBhZ2UoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5wYWdlLmxhc3Q7XG4gIH1cblxuICBASW5wdXQoJ2NsckRnTGFzdFBhZ2UnKVxuICBwdWJsaWMgc2V0IGxhc3RQYWdlKGxhc3Q6IG51bWJlcikge1xuICAgIGlmICh0eXBlb2YgbGFzdCA9PT0gJ251bWJlcicpIHtcbiAgICAgIHRoaXMucGFnZS5sYXN0ID0gbGFzdDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ3VycmVudCBwYWdlXG4gICAqL1xuICBwdWJsaWMgZ2V0IGN1cnJlbnRQYWdlKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMucGFnZS5jdXJyZW50O1xuICB9XG5cbiAgQElucHV0KCdjbHJEZ1BhZ2UnKVxuICBwdWJsaWMgc2V0IGN1cnJlbnRQYWdlKHBhZ2U6IG51bWJlcikge1xuICAgIGlmICh0eXBlb2YgcGFnZSA9PT0gJ251bWJlcicpIHtcbiAgICAgIHRoaXMucGFnZS5jdXJyZW50ID0gcGFnZTtcbiAgICB9XG4gIH1cblxuICBAT3V0cHV0KCdjbHJEZ1BhZ2VDaGFuZ2UnKSBjdXJyZW50Q2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPihmYWxzZSk7XG5cbiAgLyoqXG4gICAqIE1vdmVzIHRvIHRoZSBwcmV2aW91cyBwYWdlIGlmIGl0IGV4aXN0c1xuICAgKi9cbiAgcHVibGljIHByZXZpb3VzKCkge1xuICAgIHRoaXMucGFnZS5wcmV2aW91cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1vdmVzIHRvIHRoZSBuZXh0IHBhZ2UgaWYgaXQgZXhpc3RzXG4gICAqL1xuICBwdWJsaWMgbmV4dCgpIHtcbiAgICB0aGlzLnBhZ2UubmV4dCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluZGV4IG9mIHRoZSBmaXJzdCBpdGVtIGRpc3BsYXllZCBvbiB0aGUgY3VycmVudCBwYWdlLCBzdGFydGluZyBhdCAwXG4gICAqL1xuICBwdWJsaWMgZ2V0IGZpcnN0SXRlbSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnBhZ2UuZmlyc3RJdGVtO1xuICB9XG5cbiAgLyoqXG4gICAqIEluZGV4IG9mIHRoZSBsYXN0IGl0ZW0gZGlzcGxheWVkIG9uIHRoZSBjdXJyZW50IHBhZ2UsIHN0YXJ0aW5nIGF0IDBcbiAgICovXG4gIHB1YmxpYyBnZXQgbGFzdEl0ZW0oKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5wYWdlLmxhc3RJdGVtO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbmRpdGlvbmFsbHkgYWRkcyBwYWdlIG51bWJlcnMgYmVmb3JlIGFuZCBhZnRlciB0aGUgY3VycmVudCBwYWdlXG4gICAqL1xuICBwdWJsaWMgZ2V0IG1pZGRsZVBhZ2VzKCk6IG51bWJlcltdIHtcbiAgICBjb25zdCBtaWRkbGVQYWdlczogbnVtYmVyW10gPSBbXTtcbiAgICBpZiAodGhpcy5wYWdlLmN1cnJlbnQgPiAxKSB7XG4gICAgICBtaWRkbGVQYWdlcy5wdXNoKHRoaXMucGFnZS5jdXJyZW50IC0gMSk7XG4gICAgfVxuICAgIG1pZGRsZVBhZ2VzLnB1c2godGhpcy5wYWdlLmN1cnJlbnQpO1xuICAgIGlmICh0aGlzLnBhZ2UuY3VycmVudCA8IHRoaXMucGFnZS5sYXN0KSB7XG4gICAgICBtaWRkbGVQYWdlcy5wdXNoKHRoaXMucGFnZS5jdXJyZW50ICsgMSk7XG4gICAgfVxuICAgIHJldHVybiBtaWRkbGVQYWdlcztcbiAgfVxufVxuIl19