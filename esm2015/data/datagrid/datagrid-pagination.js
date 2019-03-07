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
      <button class="pagination-first" [disabled]="page.current <= 1" (click)="page.current = 1">
        <clr-icon shape="step-forward-2 down"></clr-icon>
      </button>
      <button class="pagination-previous" [disabled]="page.current <= 1" (click)="page.current = page.current - 1">
        <clr-icon shape="angle left"></clr-icon>
      </button>
      <input #currentPageInput type="text" class="pagination-current" [size]="page.last.toString().length" [value]="page.current"
             (keydown.enter)="updateCurrentPage($event)" (blur)="updateCurrentPage($event)"/>&nbsp;/&nbsp;<span>{{page.last}}</span>
      <button class="pagination-next" [disabled]="page.current >= page.last" (click)="page.current = page.current + 1">
        <clr-icon shape="angle right"></clr-icon>
      </button>
      <button class="pagination-last" [disabled]="page.current >= page.last" (click)="page.current = page.last">
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtcGFnaW5hdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvZGF0YWdyaWQtcGFnaW5hdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFLQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFlBQVksRUFDWixVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFHTCxNQUFNLEVBQ04sU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUN4QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQThCM0QsTUFBTSxPQUFPLHFCQUFxQjs7OztJQUloQyxZQUFtQixJQUFVO1FBQVYsU0FBSSxHQUFKLElBQUksQ0FBTTtRQXdGRixtQkFBYyxHQUFHLElBQUksWUFBWSxDQUFTLEtBQUssQ0FBQyxDQUFDO1FBdkYxRSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7SUFDN0IsQ0FBQzs7Ozs7OztJQU1ELFFBQVE7UUFDTjs7OztXQUlHO1FBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztTQUNyQjtRQUNELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ3BHLENBQUM7Ozs7SUFPRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUMxQixJQUFJLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUMxQixJQUFJLENBQUMs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Q2xDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQ3BDO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQzthQUM1QjtTQUNGO1FBRUQ7OztXQUdHO1FBQ0gsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDbkUsQ0FBQzs7O1lBNUxGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsbUJBQW1CO2dCQUM3QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBdUJQO2dCQUNILElBQUksRUFBRSxFQUFFLG9CQUFvQixFQUFFLE1BQU0sRUFBRTthQUN2Qzs7OztZQTlCUSxJQUFJOzs7aUNBZ0NWLFlBQVksU0FBQyxtQkFBbUI7a0NBQ2hDLFNBQVMsU0FBQyxrQkFBa0I7dUJBeUM1QixLQUFLLFNBQUMsZUFBZTt5QkFjckIsS0FBSyxTQUFDLGlCQUFpQjt1QkFjdkIsS0FBSyxTQUFDLGVBQWU7MEJBY3JCLEtBQUssU0FBQyxXQUFXOzZCQU9qQixNQUFNLFNBQUMsaUJBQWlCOzs7O0lBM0Z6QixtREFBMkU7O0lBQzNFLG9EQUErRDs7Ozs7SUF5Qi9ELGtEQUF3Qzs7SUFpRXhDLCtDQUE0RTs7SUF4RmhFLHFDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBWaWV3Q2hpbGQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSAnLi9wcm92aWRlcnMvcGFnZSc7XG5pbXBvcnQgeyBDbHJEYXRhZ3JpZFBhZ2VTaXplIH0gZnJvbSAnLi9kYXRhZ3JpZC1wYWdlLXNpemUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItZGctcGFnaW5hdGlvbicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cInBhZ2luYXRpb24tc2l6ZVwiICpuZ0lmPVwiX3BhZ2VTaXplQ29tcG9uZW50XCI+XG4gICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJjbHItZGctcGFnZS1zaXplXCI+PC9uZy1jb250ZW50PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJwYWdpbmF0aW9uLWRlc2NyaXB0aW9uXCI+XG4gICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInBhZ2luYXRpb24tbGlzdFwiICpuZ0lmPVwicGFnZS5sYXN0ID4gMVwiPlxuICAgICAgPGJ1dHRvbiBjbGFzcz1cInBhZ2luYXRpb24tZmlyc3RcIiBbZGlzYWJsZWRdPVwicGFnZS5jdXJyZW50IDw9IDFcIiAoY2xpY2spPVwicGFnZS5jdXJyZW50ID0gMVwiPlxuICAgICAgICA8Y2xyLWljb24gc2hhcGU9XCJzdGVwLWZvcndhcmQtMiBkb3duXCI+PC9jbHItaWNvbj5cbiAgICAgIDwvYnV0dG9uPlxuICAgICAgPGJ1dHRvbiBjbGFzcz1cInBhZ2luYXRpb24tcHJldmlvdXNcIiBbZGlzYWJsZWRdPVwicGFnZS5jdXJyZW50IDw9IDFcIiAoY2xpY2spPVwicGFnZS5jdXJyZW50ID0gcGFnZS5jdXJyZW50IC0gMVwiPlxuICAgICAgICA8Y2xyLWljb24gc2hhcGU9XCJhbmdsZSBsZWZ0XCI+PC9jbHItaWNvbj5cbiAgICAgIDwvYnV0dG9uPlxuICAgICAgPGlucHV0ICNjdXJyZW50UGFnZUlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJwYWdpbmF0aW9uLWN1cnJlbnRcIiBbc2l6ZV09XCJwYWdlLmxhc3QudG9TdHJpbmcoKS5sZW5ndGhcIiBbdmFsdWVdPVwicGFnZS5jdXJyZW50XCJcbiAgICAgICAgICAgICAoa2V5ZG93bi5lbnRlcik9XCJ1cGRhdGVDdXJyZW50UGFnZSgkZXZlbnQpXCIgKGJsdXIpPVwidXBkYXRlQ3VycmVudFBhZ2UoJGV2ZW50KVwiLz4mbmJzcDsvJm5ic3A7PHNwYW4+e3twYWdlLmxhc3R9fTwvc3Bhbj5cbiAgICAgIDxidXR0b24gY2xhc3M9XCJwYWdpbmF0aW9uLW5leHRcIiBbZGlzYWJsZWRdPVwicGFnZS5jdXJyZW50ID49IHBhZ2UubGFzdFwiIChjbGljayk9XCJwYWdlLmN1cnJlbnQgPSBwYWdlLmN1cnJlbnQgKyAxXCI+XG4gICAgICAgIDxjbHItaWNvbiBzaGFwZT1cImFuZ2xlIHJpZ2h0XCI+PC9jbHItaWNvbj5cbiAgICAgIDwvYnV0dG9uPlxuICAgICAgPGJ1dHRvbiBjbGFzcz1cInBhZ2luYXRpb24tbGFzdFwiIFtkaXNhYmxlZF09XCJwYWdlLmN1cnJlbnQgPj0gcGFnZS5sYXN0XCIgKGNsaWNrKT1cInBhZ2UuY3VycmVudCA9IHBhZ2UubGFzdFwiPlxuICAgICAgICA8Y2xyLWljb24gc2hhcGU9XCJzdGVwLWZvcndhcmQtMiB1cFwiPjwvY2xyLWljb24+XG4gICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgICBgLFxuICBob3N0OiB7ICdbY2xhc3MucGFnaW5hdGlvbl0nOiAndHJ1ZScgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyRGF0YWdyaWRQYWdpbmF0aW9uIGltcGxlbWVudHMgT25EZXN0cm95LCBPbkluaXQge1xuICBAQ29udGVudENoaWxkKENsckRhdGFncmlkUGFnZVNpemUpIF9wYWdlU2l6ZUNvbXBvbmVudDogQ2xyRGF0YWdyaWRQYWdlU2l6ZTtcbiAgQFZpZXdDaGlsZCgnY3VycmVudFBhZ2VJbnB1dCcpIGN1cnJlbnRQYWdlSW5wdXRSZWY6IEVsZW1lbnRSZWY7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHBhZ2U6IFBhZ2UpIHtcbiAgICB0aGlzLnBhZ2UuYWN0aXZhdGVkID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKioqKioqKioqXG4gICAqIFN1YnNjcmlwdGlvbiB0byB0aGUgUGFnZSBzZXJ2aWNlIGZvciBwYWdlIGNoYW5nZXMuXG4gICAqIE5vdGU6IHRoaXMgb25seSBlbWl0cyBhZnRlciB0aGUgZGF0YWdyaWQgaXMgaW5pdGlhbGl6ZWQvc3RhYmFsaXplZCBhbmQgdGhlIHBhZ2UgY2hhbmdlcy5cbiAgICovXG4gIG5nT25Jbml0KCkge1xuICAgIC8qXG4gICAgICogRGVmYXVsdCBwYWdlIHNpemUgaXMgMTAuXG4gICAgICogVGhlIHJlYXNvbiB3ZSBzZXQgaXQgaGVyZSBhbmQgbm90IGluIHRoZSBwcm92aWRlciBpdHNlbGYgaXMgYmVjYXVzZVxuICAgICAqIHdlIGRvbid0IHdhbnQgcGFnaW5hdGlvbiBpZiB0aGlzIGNvbXBvbmVudCBpc24ndCBwcmVzZW50IGluIHRoZSBkYXRhZ3JpZC5cbiAgICAgKi9cbiAgICBpZiAoIXRoaXMucGFnZS5zaXplKSB7XG4gICAgICB0aGlzLnBhZ2Uuc2l6ZSA9IDEwO1xuICAgIH1cbiAgICB0aGlzLl9wYWdlU3Vic2NyaXB0aW9uID0gdGhpcy5wYWdlLmNoYW5nZS5zdWJzY3JpYmUoY3VycmVudCA9PiB0aGlzLmN1cnJlbnRDaGFuZ2VkLmVtaXQoY3VycmVudCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFN1YnNjcmlwdGlvbiB0byB0aGUgcGFnZSBzZXJ2aWNlIGNoYW5nZXNcbiAgICovXG4gIHByaXZhdGUgX3BhZ2VTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnBhZ2UucmVzZXRQYWdlU2l6ZSgpO1xuICAgIGlmICh0aGlzLl9wYWdlU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLl9wYWdlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFBhZ2Ugc2l6ZVxuICAgKi9cbiAgcHVibGljIGdldCBwYWdlU2l6ZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnBhZ2Uuc2l6ZTtcbiAgfVxuXG4gIEBJbnB1dCgnY2xyRGdQYWdlU2l6ZScpXG4gIHB1YmxpYyBzZXQgcGFnZVNpemUoc2l6ZTogbnVtYmVyKSB7XG4gICAgaWYgKHR5cGVvZiBzaXplID09PSAnbnVtYmVyJykge1xuICAgICAgdGhpcy5wYWdlLnNpemUgPSBzaXplO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUb3RhbCBpdGVtcyAobmVlZGVkIHRvIGd1ZXNzIHRoZSBsYXN0IHBhZ2UpXG4gICAqL1xuICBwdWJsaWMgZ2V0IHRvdGFsSXRlbXMoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5wYWdlLnRvdGFsSXRlbXM7XG4gIH1cblxuICBASW5wdXQoJ2NsckRnVG90YWxJdGVtcycpXG4gIHB1YmxpYyBzZXQgdG90YWxJdGVtcyh0b3RhbDogbnVtYmVyKSB7XG4gICAgaWYgKHR5cGVvZiB0b3RhbCA9PT0gJ251bWJlcicpIHtcbiAgICAgIHRoaXMucGFnZS50b3RhbEl0ZW1zID0gdG90YWw7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIExhc3QgcGFnZVxuICAgKi9cbiAgcHVibGljIGdldCBsYXN0UGFnZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnBhZ2UubGFzdDtcbiAgfVxuXG4gIEBJbnB1dCgnY2xyRGdMYXN0UGFnZScpXG4gIHB1YmxpYyBzZXQgbGFzdFBhZ2UobGFzdDogbnVtYmVyKSB7XG4gICAgaWYgKHR5cGVvZiBsYXN0ID09PSAnbnVtYmVyJykge1xuICAgICAgdGhpcy5wYWdlLmxhc3QgPSBsYXN0O1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDdXJyZW50IHBhZ2VcbiAgICovXG4gIHB1YmxpYyBnZXQgY3VycmVudFBhZ2UoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5wYWdlLmN1cnJlbnQ7XG4gIH1cblxuICBASW5wdXQoJ2NsckRnUGFnZScpXG4gIHB1YmxpYyBzZXQgY3VycmVudFBhZ2UocGFnZTogbnVtYmVyKSB7XG4gICAgaWYgKHR5cGVvZiBwYWdlID09PSAnbnVtYmVyJykge1xuICAgICAgdGhpcy5wYWdlLmN1cnJlbnQgPSBwYWdlO1xuICAgIH1cbiAgfVxuXG4gIEBPdXRwdXQoJ2NsckRnUGFnZUNoYW5nZScpIGN1cnJlbnRDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KGZhbHNlKTtcblxuICAvKipcbiAgICogTW92ZXMgdG8gdGhlIHByZXZpb3VzIHBhZ2UgaWYgaXQgZXhpc3RzXG4gICAqL1xuICBwdWJsaWMgcHJldmlvdXMoKSB7XG4gICAgdGhpcy5wYWdlLnByZXZpb3VzKCk7XG4gIH1cblxuICAvKipcbiAgICogTW92ZXMgdG8gdGhlIG5leHQgcGFnZSBpZiBpdCBleGlzdHNcbiAgICovXG4gIHB1YmxpYyBuZXh0KCkge1xuICAgIHRoaXMucGFnZS5uZXh0KCk7XG4gIH1cblxuICAvKipcbiAgICogSW5kZXggb2YgdGhlIGZpcnN0IGl0ZW0gZGlzcGxheWVkIG9uIHRoZSBjdXJyZW50IHBhZ2UsIHN0YXJ0aW5nIGF0IDBcbiAgICovXG4gIHB1YmxpYyBnZXQgZmlyc3RJdGVtKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMucGFnZS5maXJzdEl0ZW07XG4gIH1cblxuICAvKipcbiAgICogSW5kZXggb2YgdGhlIGxhc3QgaXRlbSBkaXNwbGF5ZWQgb24gdGhlIGN1cnJlbnQgcGFnZSwgc3RhcnRpbmcgYXQgMFxuICAgKi9cbiAgcHVibGljIGdldCBsYXN0SXRlbSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnBhZ2UubGFzdEl0ZW07XG4gIH1cblxuICAvKipcbiAgICogQ29uZGl0aW9uYWxseSBhZGRzIHBhZ2UgbnVtYmVycyBiZWZvcmUgYW5kIGFmdGVyIHRoZSBjdXJyZW50IHBhZ2VcbiAgICovXG4gIHB1YmxpYyBnZXQgbWlkZGxlUGFnZXMoKTogbnVtYmVyW10ge1xuICAgIGNvbnN0IG1pZGRsZVBhZ2VzOiBudW1iZXJbXSA9IFtdO1xuICAgIGlmICh0aGlzLnBhZ2UuY3VycmVudCA+IDEpIHtcbiAgICAgIG1pZGRsZVBhZ2VzLnB1c2godGhpcy5wYWdlLmN1cnJlbnQgLSAxKTtcbiAgICB9XG4gICAgbWlkZGxlUGFnZXMucHVzaCh0aGlzLnBhZ2UuY3VycmVudCk7XG4gICAgaWYgKHRoaXMucGFnZS5jdXJyZW50IDwgdGhpcy5wYWdlLmxhc3QpIHtcbiAgICAgIG1pZGRsZVBhZ2VzLnB1c2godGhpcy5wYWdlLmN1cnJlbnQgKyAxKTtcbiAgICB9XG4gICAgcmV0dXJuIG1pZGRsZVBhZ2VzO1xuICB9XG5cbiAgLyoqXG4gICAqIFdlIG9ubHkgdXBkYXRlIHRoZSBwYWdpbmF0aW9uJ3MgY3VycmVudCBwYWdlIG9uIGJsdXIgb2YgdGhlIGlucHV0IGZpZWxkLCBvclxuICAgKiB3aGVuIHRoZXkgcHJlc3MgZW50ZXIuXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlQ3VycmVudFBhZ2UoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IHBhcnNlZCA9IHBhcnNlSW50KGV2ZW50LnRhcmdldC52YWx1ZSwgMTApO1xuXG4gICAgLy8gaWYgdGhlIGlucHV0IHZhbHVlLCBpcyBub3QgYSBudW1iZXIsIHdlIGRvbid0IHVwZGF0ZSB0aGUgcGFnZVxuICAgIGlmICghaXNOYU4ocGFyc2VkKSkge1xuICAgICAgaWYgKHBhcnNlZCA8IDEpIHtcbiAgICAgICAgdGhpcy5wYWdlLmN1cnJlbnQgPSAxO1xuICAgICAgfSBlbHNlIGlmIChwYXJzZWQgPiB0aGlzLnBhZ2UubGFzdCkge1xuICAgICAgICB0aGlzLnBhZ2UuY3VycmVudCA9IHRoaXMucGFnZS5sYXN0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wYWdlLmN1cnJlbnQgPSBwYXJzZWQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBpbnB1dCdzIHZhbHVlIHRvIHRoZSBuZXcgY3VycmVudCBwYWdlLiBUaGlzIGlzIG5lZWRlZCBiZWNhdXNlIHRoZSBjb2RlXG4gICAgICogYWJvdmUgbWF5IGhhdmUgY2hhbmdlZCB0aGUgdmFsdWUgZnJvbSB3aGF0IHRoZSB1c2VyIGVudGVyZWQgaW4uXG4gICAgICovXG4gICAgdGhpcy5jdXJyZW50UGFnZUlucHV0UmVmLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSB0aGlzLnBhZ2UuY3VycmVudDtcbiAgfVxufVxuIl19