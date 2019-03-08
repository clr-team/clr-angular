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
export class ClrDatagridPagination {
    /**
     * @param {?} page
     */
    constructor(page) {
        this.page = page;
        this.currentChanged = new EventEmitter(false);
        this.page.activated = true;
    }
    /**
     * *******
     * Subscription to the Page service for page changes.
     * Note: this only emits after the datagrid is initialized/stabalized and the page changes.
     * @return {?}
     */
    ngOnInit() {
        /*
         * Default page size is 10.
         * The reason we set it here and not in the provider itself is because
         * we don't want pagination if this component isn't present in the datagrid.
         */
        if (!this.page.size) {
            this.page.size = 10;
        }
        this._pageSubscription = this.page.change.subscribe(current => this.currentChanged.emit(current));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.page.resetPageSize();
        if (this._pageSubscription) {
            this._pageSubscription.unsubscribe();
        }
    }
    /**
     * Page size
     * @return {?}
     */
    get pageSize() {
        return this.page.size;
    }
    /**
     * @param {?} size
     * @return {?}
     */
    set pageSize(size) {
        if (typeof size === 'number') {
            this.page.size = size;
        }
    }
    /**
     * Total items (needed to guess the last page)
     * @return {?}
     */
    get totalItems() {
        return this.page.totalItems;
    }
    /**
     * @param {?} total
     * @return {?}
     */
    set totalItems(total) {
        if (typeof total === 'number') {
            this.page.totalItems = total;
        }
    }
    /**
     * Last page
     * @return {?}
     */
    get lastPage() {
        return this.page.last;
    }
    /**
     * @param {?} last
     * @return {?}
     */
    set lastPage(last) {
        if (typeof last === 'number') {
            this.page.last = last;
        }
    }
    /**
     * Current page
     * @return {?}
     */
    get currentPage() {
        return this.page.current;
    }
    /**
     * @param {?} page
     * @return {?}
     */
    set currentPage(page) {
        if (typeof page === 'number') {
            this.page.current = page;
        }
    }
    /**
     * Moves to the previous page if it exists
     * @return {?}
     */
    previous() {
        this.page.previous();
    }
    /**
     * Moves to the next page if it exists
     * @return {?}
     */
    next() {
        this.page.next();
    }
    /**
     * Index of the first item displayed on the current page, starting at 0
     * @return {?}
     */
    get firstItem() {
        return this.page.firstItem;
    }
    /**
     * Index of the last item displayed on the current page, starting at 0
     * @return {?}
     */
    get lastItem() {
        return this.page.lastItem;
    }
    /**
     * Conditionally adds page numbers before and after the current page
     * @return {?}
     */
    get middlePages() {
        /** @type {?} */
        const middlePages = [];
        if (this.page.current > 1) {
            middlePages.push(this.page.current - 1);
        }
        middlePages.push(this.page.current);
        if (this.page.current < this.page.last) {
            middlePages.push(this.page.current + 1);
        }
        return middlePages;
    }
    /**
     * We only update the pagination's current page on blur of the input field, or
     * when they press enter.
     * @param {?} event
     * @return {?}
     */
    updateCurrentPage(event) {
        /** @type {?} */
        const parsed = parseInt(event.target.value, 10);
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
    }
}
ClrDatagridPagination.decorators = [
    { type: Component, args: [{
                selector: 'clr-dg-pagination',
                template: `
    <div class="pagination-size" *ngIf="_pageSizeComponent">
      <ng-content select="clr-dg-page-size"></ng-content>
    </div>
    <div class="pagination-description">
      <ng-content></ng-content>
    </div>
    <div class="pagination-list" *ngIf="page.last > 1">
      <button type="button" class="pagination-first" [disabled]="page.current <= 1" (click)="page.current = 1">
        <clr-icon shape="step-forward-2 down"></clr-icon>
      </button>
      <button type="button" class="pagination-previous" [disabled]="page.current <= 1" (click)="page.current = page.current - 1">
        <clr-icon shape="angle left"></clr-icon>
      </button>
      <input #currentPageInput type="text" class="pagination-current" [size]="page.last.toString().length" [value]="page.current"
             (keydown.enter)="updateCurrentPage($event)" (blur)="updateCurrentPage($event)"/>&nbsp;/&nbsp;<span>{{page.last}}</span>
      <button type="button" class="pagination-next" [disabled]="page.current >= page.last" (click)="page.current = page.current + 1">
        <clr-icon shape="angle right"></clr-icon>
      </button>
      <button type="button" class="pagination-last" [disabled]="page.current >= page.last" (click)="page.current = page.last">
        <clr-icon shape="step-forward-2 up"></clr-icon>
      </button>
    </div>
    `,
                host: { '[class.pagination]': 'true' }
            }] }
];
/** @nocollapse */
ClrDatagridPagination.ctorParameters = () => [
    { type: Page }
];
ClrDatagridPagination.propDecorators = {
    _pageSizeComponent: [{ type: ContentChild, args: [ClrDatagridPageSize,] }],
    currentPageInputRef: [{ type: ViewChild, args: ['currentPageInput',] }],
    pageSize: [{ type: Input, args: ['clrDgPageSize',] }],
    totalItems: [{ type: Input, args: ['clrDgTotalItems',] }],
    lastPage: [{ type: Input, args: ['clrDgLastPage',] }],
    currentPage: [{ type: Input, args: ['clrDgPage',] }],
    currentChanged: [{ type: Output, args: ['clrDgPageChange',] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtcGFnaW5hdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvZGF0YWdyaWQtcGFnaW5hdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFLQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFlBQVksRUFDWixVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFHTCxNQUFNLEVBQ04sU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUN4QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQThCM0QsTUFBTSxPQUFPLHFCQUFxQjs7OztJQUloQyxZQUFtQixJQUFVO1FBQVYsU0FBSSxHQUFKLElBQUksQ0FBTTtRQXdGRixtQkFBYyxHQUFHLElBQUksWUFBWSxDQUFTLEtBQUssQ0FBQyxDQUFDO1FBdkYxRSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7SUFDN0IsQ0FBQzs7Ozs7OztJQU1ELFFBQVE7UUFDTjs7OztXQUlHO1FBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztTQUNyQjtRQUNELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ3BHLENBQUM7Ozs7SUFPRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUMxQixJQUFJLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUMxQixJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDdEM7SUFDSCxDQUFDOzs7OztJQUtELElBQVcsUUFBUTtRQUNqQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3hCLENBQUM7Ozs7O0lBRUQsSUFDVyxRQUFRLENBQUMsSUFBWTtRQUM5QixJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRTtZQUM1QixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7U0FDdkI7SUFDSCxDQUFDOzs7OztJQUtELElBQVcsVUFBVTtRQUNuQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQzlCLENBQUM7Ozs7O0lBRUQsSUFDVyxVQUFVLENBQUMsS0FBYTtRQUNqQyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtZQUM3QixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7U0FDOUI7SUFDSCxDQUFDOzs7OztJQUtELElBQVcsUUFBUTtRQUNqQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3hCLENBQUM7Ozs7O0lBRUQsSUFDVyxRQUFRLENBQUMsSUFBWTtRQUM5QixJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRTtZQUM1QixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7U0FDdkI7SUFDSCxDQUFDOzs7OztJQUtELElBQVcsV0FBVztRQUNwQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQzNCLENBQUM7Ozs7O0lBRUQsSUFDVyxXQUFXLENBQUMsSUFBWTtRQUNqQyxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRTtZQUM1QixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7U0FDMUI7SUFDSCxDQUFDOzs7OztJQU9NLFFBQVE7UUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7Ozs7O0lBS00sSUFBSTtRQUNULElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDbkIsQ0FBQzs7Ozs7SUFLRCxJQUFXLFNBQVM7UUFDbEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUM3QixDQUFDOzs7OztJQUtELElBQVcsUUFBUTtRQUNqQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQzVCLENBQUM7Ozs7O0lBS0QsSUFBVyxXQUFXOztjQUNkLFdBQVcsR0FBYSxFQUFFO1FBQ2hDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxFQUFFO1lBQ3pCLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDekM7UUFDRCxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDcEMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUN0QyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ3pDO1FBQ0QsT0FBTyxXQUFXLENBQUM7SUFDckIsQ0FBQzs7Ozs7OztJQU1NLGlCQUFpQixDQUFDLEtBQVU7O2NBQzNCLE1BQU0sR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDO1FBRS9DLGdFQUFnRTtRQUNoRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ2xCLElBQUksTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDZCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7YUFDdkI7aUJBQU0sSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ2xDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQ3BDO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQzthQUM1QjtTQUNGO1FBRUQ7OztXQUdHO1FBQ0gsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDbkUsQ0FBQzs7O1lBNUxGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsbUJBQW1CO2dCQUM3QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBdUJQO2dCQUNILElBQUksRUFBRSxFQUFFLG9CQUFvQixFQUFFLE1BQU0sRUFBRTthQUN2Qzs7OztZQTlCUSxJQUFJOzs7aUNBZ0NWLFlBQVksU0FBQyxtQkFBbUI7a0NBQ2hDLFNBQVMsU0FBQyxrQkFBa0I7dUJBeUM1QixLQUFLLFNBQUMsZUFBZTt5QkFjckIsS0FBSyxTQUFDLGlCQUFpQjt1QkFjdkIsS0FBSyxTQUFDLGVBQWU7MEJBY3JCLEtBQUssU0FBQyxXQUFXOzZCQU9qQixNQUFNLFNBQUMsaUJBQWlCOzs7O0lBM0Z6QixtREFBMkU7O0lBQzNFLG9EQUErRDs7Ozs7SUF5Qi9ELGtEQUF3Qzs7SUFpRXhDLCtDQUE0RTs7SUF4RmhFLHFDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBWaWV3Q2hpbGQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSAnLi9wcm92aWRlcnMvcGFnZSc7XG5pbXBvcnQgeyBDbHJEYXRhZ3JpZFBhZ2VTaXplIH0gZnJvbSAnLi9kYXRhZ3JpZC1wYWdlLXNpemUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItZGctcGFnaW5hdGlvbicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cInBhZ2luYXRpb24tc2l6ZVwiICpuZ0lmPVwiX3BhZ2VTaXplQ29tcG9uZW50XCI+XG4gICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJjbHItZGctcGFnZS1zaXplXCI+PC9uZy1jb250ZW50PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJwYWdpbmF0aW9uLWRlc2NyaXB0aW9uXCI+XG4gICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInBhZ2luYXRpb24tbGlzdFwiICpuZ0lmPVwicGFnZS5sYXN0ID4gMVwiPlxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJwYWdpbmF0aW9uLWZpcnN0XCIgW2Rpc2FibGVkXT1cInBhZ2UuY3VycmVudCA8PSAxXCIgKGNsaWNrKT1cInBhZ2UuY3VycmVudCA9IDFcIj5cbiAgICAgICAgPGNsci1pY29uIHNoYXBlPVwic3RlcC1mb3J3YXJkLTIgZG93blwiPjwvY2xyLWljb24+XG4gICAgICA8L2J1dHRvbj5cbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwicGFnaW5hdGlvbi1wcmV2aW91c1wiIFtkaXNhYmxlZF09XCJwYWdlLmN1cnJlbnQgPD0gMVwiIChjbGljayk9XCJwYWdlLmN1cnJlbnQgPSBwYWdlLmN1cnJlbnQgLSAxXCI+XG4gICAgICAgIDxjbHItaWNvbiBzaGFwZT1cImFuZ2xlIGxlZnRcIj48L2Nsci1pY29uPlxuICAgICAgPC9idXR0b24+XG4gICAgICA8aW5wdXQgI2N1cnJlbnRQYWdlSW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cInBhZ2luYXRpb24tY3VycmVudFwiIFtzaXplXT1cInBhZ2UubGFzdC50b1N0cmluZygpLmxlbmd0aFwiIFt2YWx1ZV09XCJwYWdlLmN1cnJlbnRcIlxuICAgICAgICAgICAgIChrZXlkb3duLmVudGVyKT1cInVwZGF0ZUN1cnJlbnRQYWdlKCRldmVudClcIiAoYmx1cik9XCJ1cGRhdGVDdXJyZW50UGFnZSgkZXZlbnQpXCIvPiZuYnNwOy8mbmJzcDs8c3Bhbj57e3BhZ2UubGFzdH19PC9zcGFuPlxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJwYWdpbmF0aW9uLW5leHRcIiBbZGlzYWJsZWRdPVwicGFnZS5jdXJyZW50ID49IHBhZ2UubGFzdFwiIChjbGljayk9XCJwYWdlLmN1cnJlbnQgPSBwYWdlLmN1cnJlbnQgKyAxXCI+XG4gICAgICAgIDxjbHItaWNvbiBzaGFwZT1cImFuZ2xlIHJpZ2h0XCI+PC9jbHItaWNvbj5cbiAgICAgIDwvYnV0dG9uPlxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJwYWdpbmF0aW9uLWxhc3RcIiBbZGlzYWJsZWRdPVwicGFnZS5jdXJyZW50ID49IHBhZ2UubGFzdFwiIChjbGljayk9XCJwYWdlLmN1cnJlbnQgPSBwYWdlLmxhc3RcIj5cbiAgICAgICAgPGNsci1pY29uIHNoYXBlPVwic3RlcC1mb3J3YXJkLTIgdXBcIj48L2Nsci1pY29uPlxuICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+XG4gICAgYCxcbiAgaG9zdDogeyAnW2NsYXNzLnBhZ2luYXRpb25dJzogJ3RydWUnIH0sXG59KVxuZXhwb3J0IGNsYXNzIENsckRhdGFncmlkUGFnaW5hdGlvbiBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25Jbml0IHtcbiAgQENvbnRlbnRDaGlsZChDbHJEYXRhZ3JpZFBhZ2VTaXplKSBfcGFnZVNpemVDb21wb25lbnQ6IENsckRhdGFncmlkUGFnZVNpemU7XG4gIEBWaWV3Q2hpbGQoJ2N1cnJlbnRQYWdlSW5wdXQnKSBjdXJyZW50UGFnZUlucHV0UmVmOiBFbGVtZW50UmVmO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBwYWdlOiBQYWdlKSB7XG4gICAgdGhpcy5wYWdlLmFjdGl2YXRlZCA9IHRydWU7XG4gIH1cblxuICAvKioqKioqKioqKlxuICAgKiBTdWJzY3JpcHRpb24gdG8gdGhlIFBhZ2Ugc2VydmljZSBmb3IgcGFnZSBjaGFuZ2VzLlxuICAgKiBOb3RlOiB0aGlzIG9ubHkgZW1pdHMgYWZ0ZXIgdGhlIGRhdGFncmlkIGlzIGluaXRpYWxpemVkL3N0YWJhbGl6ZWQgYW5kIHRoZSBwYWdlIGNoYW5nZXMuXG4gICAqL1xuICBuZ09uSW5pdCgpIHtcbiAgICAvKlxuICAgICAqIERlZmF1bHQgcGFnZSBzaXplIGlzIDEwLlxuICAgICAqIFRoZSByZWFzb24gd2Ugc2V0IGl0IGhlcmUgYW5kIG5vdCBpbiB0aGUgcHJvdmlkZXIgaXRzZWxmIGlzIGJlY2F1c2VcbiAgICAgKiB3ZSBkb24ndCB3YW50IHBhZ2luYXRpb24gaWYgdGhpcyBjb21wb25lbnQgaXNuJ3QgcHJlc2VudCBpbiB0aGUgZGF0YWdyaWQuXG4gICAgICovXG4gICAgaWYgKCF0aGlzLnBhZ2Uuc2l6ZSkge1xuICAgICAgdGhpcy5wYWdlLnNpemUgPSAxMDtcbiAgICB9XG4gICAgdGhpcy5fcGFnZVN1YnNjcmlwdGlvbiA9IHRoaXMucGFnZS5jaGFuZ2Uuc3Vic2NyaWJlKGN1cnJlbnQgPT4gdGhpcy5jdXJyZW50Q2hhbmdlZC5lbWl0KGN1cnJlbnQpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdWJzY3JpcHRpb24gdG8gdGhlIHBhZ2Ugc2VydmljZSBjaGFuZ2VzXG4gICAqL1xuICBwcml2YXRlIF9wYWdlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5wYWdlLnJlc2V0UGFnZVNpemUoKTtcbiAgICBpZiAodGhpcy5fcGFnZVN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5fcGFnZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQYWdlIHNpemVcbiAgICovXG4gIHB1YmxpYyBnZXQgcGFnZVNpemUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5wYWdlLnNpemU7XG4gIH1cblxuICBASW5wdXQoJ2NsckRnUGFnZVNpemUnKVxuICBwdWJsaWMgc2V0IHBhZ2VTaXplKHNpemU6IG51bWJlcikge1xuICAgIGlmICh0eXBlb2Ygc2l6ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgIHRoaXMucGFnZS5zaXplID0gc2l6ZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVG90YWwgaXRlbXMgKG5lZWRlZCB0byBndWVzcyB0aGUgbGFzdCBwYWdlKVxuICAgKi9cbiAgcHVibGljIGdldCB0b3RhbEl0ZW1zKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMucGFnZS50b3RhbEl0ZW1zO1xuICB9XG5cbiAgQElucHV0KCdjbHJEZ1RvdGFsSXRlbXMnKVxuICBwdWJsaWMgc2V0IHRvdGFsSXRlbXModG90YWw6IG51bWJlcikge1xuICAgIGlmICh0eXBlb2YgdG90YWwgPT09ICdudW1iZXInKSB7XG4gICAgICB0aGlzLnBhZ2UudG90YWxJdGVtcyA9IHRvdGFsO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBMYXN0IHBhZ2VcbiAgICovXG4gIHB1YmxpYyBnZXQgbGFzdFBhZ2UoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5wYWdlLmxhc3Q7XG4gIH1cblxuICBASW5wdXQoJ2NsckRnTGFzdFBhZ2UnKVxuICBwdWJsaWMgc2V0IGxhc3RQYWdlKGxhc3Q6IG51bWJlcikge1xuICAgIGlmICh0eXBlb2YgbGFzdCA9PT0gJ251bWJlcicpIHtcbiAgICAgIHRoaXMucGFnZS5sYXN0ID0gbGFzdDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ3VycmVudCBwYWdlXG4gICAqL1xuICBwdWJsaWMgZ2V0IGN1cnJlbnRQYWdlKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMucGFnZS5jdXJyZW50O1xuICB9XG5cbiAgQElucHV0KCdjbHJEZ1BhZ2UnKVxuICBwdWJsaWMgc2V0IGN1cnJlbnRQYWdlKHBhZ2U6IG51bWJlcikge1xuICAgIGlmICh0eXBlb2YgcGFnZSA9PT0gJ251bWJlcicpIHtcbiAgICAgIHRoaXMucGFnZS5jdXJyZW50ID0gcGFnZTtcbiAgICB9XG4gIH1cblxuICBAT3V0cHV0KCdjbHJEZ1BhZ2VDaGFuZ2UnKSBjdXJyZW50Q2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPihmYWxzZSk7XG5cbiAgLyoqXG4gICAqIE1vdmVzIHRvIHRoZSBwcmV2aW91cyBwYWdlIGlmIGl0IGV4aXN0c1xuICAgKi9cbiAgcHVibGljIHByZXZpb3VzKCkge1xuICAgIHRoaXMucGFnZS5wcmV2aW91cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1vdmVzIHRvIHRoZSBuZXh0IHBhZ2UgaWYgaXQgZXhpc3RzXG4gICAqL1xuICBwdWJsaWMgbmV4dCgpIHtcbiAgICB0aGlzLnBhZ2UubmV4dCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluZGV4IG9mIHRoZSBmaXJzdCBpdGVtIGRpc3BsYXllZCBvbiB0aGUgY3VycmVudCBwYWdlLCBzdGFydGluZyBhdCAwXG4gICAqL1xuICBwdWJsaWMgZ2V0IGZpcnN0SXRlbSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnBhZ2UuZmlyc3RJdGVtO1xuICB9XG5cbiAgLyoqXG4gICAqIEluZGV4IG9mIHRoZSBsYXN0IGl0ZW0gZGlzcGxheWVkIG9uIHRoZSBjdXJyZW50IHBhZ2UsIHN0YXJ0aW5nIGF0IDBcbiAgICovXG4gIHB1YmxpYyBnZXQgbGFzdEl0ZW0oKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5wYWdlLmxhc3RJdGVtO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbmRpdGlvbmFsbHkgYWRkcyBwYWdlIG51bWJlcnMgYmVmb3JlIGFuZCBhZnRlciB0aGUgY3VycmVudCBwYWdlXG4gICAqL1xuICBwdWJsaWMgZ2V0IG1pZGRsZVBhZ2VzKCk6IG51bWJlcltdIHtcbiAgICBjb25zdCBtaWRkbGVQYWdlczogbnVtYmVyW10gPSBbXTtcbiAgICBpZiAodGhpcy5wYWdlLmN1cnJlbnQgPiAxKSB7XG4gICAgICBtaWRkbGVQYWdlcy5wdXNoKHRoaXMucGFnZS5jdXJyZW50IC0gMSk7XG4gICAgfVxuICAgIG1pZGRsZVBhZ2VzLnB1c2godGhpcy5wYWdlLmN1cnJlbnQpO1xuICAgIGlmICh0aGlzLnBhZ2UuY3VycmVudCA8IHRoaXMucGFnZS5sYXN0KSB7XG4gICAgICBtaWRkbGVQYWdlcy5wdXNoKHRoaXMucGFnZS5jdXJyZW50ICsgMSk7XG4gICAgfVxuICAgIHJldHVybiBtaWRkbGVQYWdlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBXZSBvbmx5IHVwZGF0ZSB0aGUgcGFnaW5hdGlvbidzIGN1cnJlbnQgcGFnZSBvbiBibHVyIG9mIHRoZSBpbnB1dCBmaWVsZCwgb3JcbiAgICogd2hlbiB0aGV5IHByZXNzIGVudGVyLlxuICAgKi9cbiAgcHVibGljIHVwZGF0ZUN1cnJlbnRQYWdlKGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCBwYXJzZWQgPSBwYXJzZUludChldmVudC50YXJnZXQudmFsdWUsIDEwKTtcblxuICAgIC8vIGlmIHRoZSBpbnB1dCB2YWx1ZSwgaXMgbm90IGEgbnVtYmVyLCB3ZSBkb24ndCB1cGRhdGUgdGhlIHBhZ2VcbiAgICBpZiAoIWlzTmFOKHBhcnNlZCkpIHtcbiAgICAgIGlmIChwYXJzZWQgPCAxKSB7XG4gICAgICAgIHRoaXMucGFnZS5jdXJyZW50ID0gMTtcbiAgICAgIH0gZWxzZSBpZiAocGFyc2VkID4gdGhpcy5wYWdlLmxhc3QpIHtcbiAgICAgICAgdGhpcy5wYWdlLmN1cnJlbnQgPSB0aGlzLnBhZ2UubGFzdDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucGFnZS5jdXJyZW50ID0gcGFyc2VkO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgaW5wdXQncyB2YWx1ZSB0byB0aGUgbmV3IGN1cnJlbnQgcGFnZS4gVGhpcyBpcyBuZWVkZWQgYmVjYXVzZSB0aGUgY29kZVxuICAgICAqIGFib3ZlIG1heSBoYXZlIGNoYW5nZWQgdGhlIHZhbHVlIGZyb20gd2hhdCB0aGUgdXNlciBlbnRlcmVkIGluLlxuICAgICAqL1xuICAgIHRoaXMuY3VycmVudFBhZ2VJbnB1dFJlZi5uYXRpdmVFbGVtZW50LnZhbHVlID0gdGhpcy5wYWdlLmN1cnJlbnQ7XG4gIH1cbn1cbiJdfQ==