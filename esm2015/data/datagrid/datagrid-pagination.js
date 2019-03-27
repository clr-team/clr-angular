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
        this._pageSubscription = this.page.change.subscribe((/**
         * @param {?} current
         * @return {?}
         */
        current => this.currentChanged.emit(current)));
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
     * @private
     */
    ClrDatagridPagination.prototype._pageSubscription;
    /** @type {?} */
    ClrDatagridPagination.prototype.currentChanged;
    /** @type {?} */
    ClrDatagridPagination.prototype.page;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtcGFnaW5hdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvZGF0YWdyaWQtcGFnaW5hdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFLQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFlBQVksRUFDWixVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFHTCxNQUFNLEVBQ04sU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUN4QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQThCM0QsTUFBTSxPQUFPLHFCQUFxQjs7OztJQUloQyxZQUFtQixJQUFVO1FBQVYsU0FBSSxHQUFKLElBQUksQ0FBTTtRQXdGRixtQkFBYyxHQUFHLElBQUksWUFBWSxDQUFTLEtBQUssQ0FBQyxDQUFDO1FBdkYxRSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7SUFDN0IsQ0FBQzs7Ozs7OztJQU1ELFFBQVE7UUFDTjs7OztXQUlHO1FBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztTQUNyQjtRQUNELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTOzs7O1FBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBQyxDQUFDO0lBQ3BHLENBQUM7Ozs7SUFPRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUMxQixJQUFJLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUMxQixJQUFJLENB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Z0JBQ2xDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQ3BDO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQzthQUM1QjtTQUNGO1FBRUQ7OztXQUdHO1FBQ0gsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDbkUsQ0FBQzs7O1lBNUxGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsbUJBQW1CO2dCQUM3QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBdUJQO2dCQUNILElBQUksRUFBRSxFQUFFLG9CQUFvQixFQUFFLE1BQU0sRUFBRTthQUN2Qzs7OztZQTlCUSxJQUFJOzs7aUNBZ0NWLFlBQVksU0FBQyxtQkFBbUI7a0NBQ2hDLFNBQVMsU0FBQyxrQkFBa0I7dUJBeUM1QixLQUFLLFNBQUMsZUFBZTt5QkFjckIsS0FBSyxTQUFDLGlCQUFpQjt1QkFjdkIsS0FBSyxTQUFDLGVBQWU7MEJBY3JCLEtBQUssU0FBQyxXQUFXOzZCQU9qQixNQUFNLFNBQUMsaUJBQWlCOzs7O0lBM0Z6QixtREFBMkU7O0lBQzNFLG9EQUErRDs7Ozs7O0lBeUIvRCxrREFBd0M7O0lBaUV4QywrQ0FBNEU7O0lBeEZoRSxxQ0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQge1xuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgVmlld0NoaWxkLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gJy4vcHJvdmlkZXJzL3BhZ2UnO1xuaW1wb3J0IHsgQ2xyRGF0YWdyaWRQYWdlU2l6ZSB9IGZyb20gJy4vZGF0YWdyaWQtcGFnZS1zaXplJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLWRnLXBhZ2luYXRpb24nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJwYWdpbmF0aW9uLXNpemVcIiAqbmdJZj1cIl9wYWdlU2l6ZUNvbXBvbmVudFwiPlxuICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiY2xyLWRnLXBhZ2Utc2l6ZVwiPjwvbmctY29udGVudD5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwicGFnaW5hdGlvbi1kZXNjcmlwdGlvblwiPlxuICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJwYWdpbmF0aW9uLWxpc3RcIiAqbmdJZj1cInBhZ2UubGFzdCA+IDFcIj5cbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwicGFnaW5hdGlvbi1maXJzdFwiIFtkaXNhYmxlZF09XCJwYWdlLmN1cnJlbnQgPD0gMVwiIChjbGljayk9XCJwYWdlLmN1cnJlbnQgPSAxXCI+XG4gICAgICAgIDxjbHItaWNvbiBzaGFwZT1cInN0ZXAtZm9yd2FyZC0yIGRvd25cIj48L2Nsci1pY29uPlxuICAgICAgPC9idXR0b24+XG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInBhZ2luYXRpb24tcHJldmlvdXNcIiBbZGlzYWJsZWRdPVwicGFnZS5jdXJyZW50IDw9IDFcIiAoY2xpY2spPVwicGFnZS5jdXJyZW50ID0gcGFnZS5jdXJyZW50IC0gMVwiPlxuICAgICAgICA8Y2xyLWljb24gc2hhcGU9XCJhbmdsZSBsZWZ0XCI+PC9jbHItaWNvbj5cbiAgICAgIDwvYnV0dG9uPlxuICAgICAgPGlucHV0ICNjdXJyZW50UGFnZUlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJwYWdpbmF0aW9uLWN1cnJlbnRcIiBbc2l6ZV09XCJwYWdlLmxhc3QudG9TdHJpbmcoKS5sZW5ndGhcIiBbdmFsdWVdPVwicGFnZS5jdXJyZW50XCJcbiAgICAgICAgICAgICAoa2V5ZG93bi5lbnRlcik9XCJ1cGRhdGVDdXJyZW50UGFnZSgkZXZlbnQpXCIgKGJsdXIpPVwidXBkYXRlQ3VycmVudFBhZ2UoJGV2ZW50KVwiLz4mbmJzcDsvJm5ic3A7PHNwYW4+e3twYWdlLmxhc3R9fTwvc3Bhbj5cbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwicGFnaW5hdGlvbi1uZXh0XCIgW2Rpc2FibGVkXT1cInBhZ2UuY3VycmVudCA+PSBwYWdlLmxhc3RcIiAoY2xpY2spPVwicGFnZS5jdXJyZW50ID0gcGFnZS5jdXJyZW50ICsgMVwiPlxuICAgICAgICA8Y2xyLWljb24gc2hhcGU9XCJhbmdsZSByaWdodFwiPjwvY2xyLWljb24+XG4gICAgICA8L2J1dHRvbj5cbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwicGFnaW5hdGlvbi1sYXN0XCIgW2Rpc2FibGVkXT1cInBhZ2UuY3VycmVudCA+PSBwYWdlLmxhc3RcIiAoY2xpY2spPVwicGFnZS5jdXJyZW50ID0gcGFnZS5sYXN0XCI+XG4gICAgICAgIDxjbHItaWNvbiBzaGFwZT1cInN0ZXAtZm9yd2FyZC0yIHVwXCI+PC9jbHItaWNvbj5cbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICAgIGAsXG4gIGhvc3Q6IHsgJ1tjbGFzcy5wYWdpbmF0aW9uXSc6ICd0cnVlJyB9LFxufSlcbmV4cG9ydCBjbGFzcyBDbHJEYXRhZ3JpZFBhZ2luYXRpb24gaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uSW5pdCB7XG4gIEBDb250ZW50Q2hpbGQoQ2xyRGF0YWdyaWRQYWdlU2l6ZSkgX3BhZ2VTaXplQ29tcG9uZW50OiBDbHJEYXRhZ3JpZFBhZ2VTaXplO1xuICBAVmlld0NoaWxkKCdjdXJyZW50UGFnZUlucHV0JykgY3VycmVudFBhZ2VJbnB1dFJlZjogRWxlbWVudFJlZjtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcGFnZTogUGFnZSkge1xuICAgIHRoaXMucGFnZS5hY3RpdmF0ZWQgPSB0cnVlO1xuICB9XG5cbiAgLyoqKioqKioqKipcbiAgICogU3Vic2NyaXB0aW9uIHRvIHRoZSBQYWdlIHNlcnZpY2UgZm9yIHBhZ2UgY2hhbmdlcy5cbiAgICogTm90ZTogdGhpcyBvbmx5IGVtaXRzIGFmdGVyIHRoZSBkYXRhZ3JpZCBpcyBpbml0aWFsaXplZC9zdGFiYWxpemVkIGFuZCB0aGUgcGFnZSBjaGFuZ2VzLlxuICAgKi9cbiAgbmdPbkluaXQoKSB7XG4gICAgLypcbiAgICAgKiBEZWZhdWx0IHBhZ2Ugc2l6ZSBpcyAxMC5cbiAgICAgKiBUaGUgcmVhc29uIHdlIHNldCBpdCBoZXJlIGFuZCBub3QgaW4gdGhlIHByb3ZpZGVyIGl0c2VsZiBpcyBiZWNhdXNlXG4gICAgICogd2UgZG9uJ3Qgd2FudCBwYWdpbmF0aW9uIGlmIHRoaXMgY29tcG9uZW50IGlzbid0IHByZXNlbnQgaW4gdGhlIGRhdGFncmlkLlxuICAgICAqL1xuICAgIGlmICghdGhpcy5wYWdlLnNpemUpIHtcbiAgICAgIHRoaXMucGFnZS5zaXplID0gMTA7XG4gICAgfVxuICAgIHRoaXMuX3BhZ2VTdWJzY3JpcHRpb24gPSB0aGlzLnBhZ2UuY2hhbmdlLnN1YnNjcmliZShjdXJyZW50ID0+IHRoaXMuY3VycmVudENoYW5nZWQuZW1pdChjdXJyZW50KSk7XG4gIH1cblxuICAvKipcbiAgICogU3Vic2NyaXB0aW9uIHRvIHRoZSBwYWdlIHNlcnZpY2UgY2hhbmdlc1xuICAgKi9cbiAgcHJpdmF0ZSBfcGFnZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMucGFnZS5yZXNldFBhZ2VTaXplKCk7XG4gICAgaWYgKHRoaXMuX3BhZ2VTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuX3BhZ2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUGFnZSBzaXplXG4gICAqL1xuICBwdWJsaWMgZ2V0IHBhZ2VTaXplKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMucGFnZS5zaXplO1xuICB9XG5cbiAgQElucHV0KCdjbHJEZ1BhZ2VTaXplJylcbiAgcHVibGljIHNldCBwYWdlU2l6ZShzaXplOiBudW1iZXIpIHtcbiAgICBpZiAodHlwZW9mIHNpemUgPT09ICdudW1iZXInKSB7XG4gICAgICB0aGlzLnBhZ2Uuc2l6ZSA9IHNpemU7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRvdGFsIGl0ZW1zIChuZWVkZWQgdG8gZ3Vlc3MgdGhlIGxhc3QgcGFnZSlcbiAgICovXG4gIHB1YmxpYyBnZXQgdG90YWxJdGVtcygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnBhZ2UudG90YWxJdGVtcztcbiAgfVxuXG4gIEBJbnB1dCgnY2xyRGdUb3RhbEl0ZW1zJylcbiAgcHVibGljIHNldCB0b3RhbEl0ZW1zKHRvdGFsOiBudW1iZXIpIHtcbiAgICBpZiAodHlwZW9mIHRvdGFsID09PSAnbnVtYmVyJykge1xuICAgICAgdGhpcy5wYWdlLnRvdGFsSXRlbXMgPSB0b3RhbDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTGFzdCBwYWdlXG4gICAqL1xuICBwdWJsaWMgZ2V0IGxhc3RQYWdlKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMucGFnZS5sYXN0O1xuICB9XG5cbiAgQElucHV0KCdjbHJEZ0xhc3RQYWdlJylcbiAgcHVibGljIHNldCBsYXN0UGFnZShsYXN0OiBudW1iZXIpIHtcbiAgICBpZiAodHlwZW9mIGxhc3QgPT09ICdudW1iZXInKSB7XG4gICAgICB0aGlzLnBhZ2UubGFzdCA9IGxhc3Q7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEN1cnJlbnQgcGFnZVxuICAgKi9cbiAgcHVibGljIGdldCBjdXJyZW50UGFnZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnBhZ2UuY3VycmVudDtcbiAgfVxuXG4gIEBJbnB1dCgnY2xyRGdQYWdlJylcbiAgcHVibGljIHNldCBjdXJyZW50UGFnZShwYWdlOiBudW1iZXIpIHtcbiAgICBpZiAodHlwZW9mIHBhZ2UgPT09ICdudW1iZXInKSB7XG4gICAgICB0aGlzLnBhZ2UuY3VycmVudCA9IHBhZ2U7XG4gICAgfVxuICB9XG5cbiAgQE91dHB1dCgnY2xyRGdQYWdlQ2hhbmdlJykgY3VycmVudENoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oZmFsc2UpO1xuXG4gIC8qKlxuICAgKiBNb3ZlcyB0byB0aGUgcHJldmlvdXMgcGFnZSBpZiBpdCBleGlzdHNcbiAgICovXG4gIHB1YmxpYyBwcmV2aW91cygpIHtcbiAgICB0aGlzLnBhZ2UucHJldmlvdXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNb3ZlcyB0byB0aGUgbmV4dCBwYWdlIGlmIGl0IGV4aXN0c1xuICAgKi9cbiAgcHVibGljIG5leHQoKSB7XG4gICAgdGhpcy5wYWdlLm5leHQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbmRleCBvZiB0aGUgZmlyc3QgaXRlbSBkaXNwbGF5ZWQgb24gdGhlIGN1cnJlbnQgcGFnZSwgc3RhcnRpbmcgYXQgMFxuICAgKi9cbiAgcHVibGljIGdldCBmaXJzdEl0ZW0oKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5wYWdlLmZpcnN0SXRlbTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbmRleCBvZiB0aGUgbGFzdCBpdGVtIGRpc3BsYXllZCBvbiB0aGUgY3VycmVudCBwYWdlLCBzdGFydGluZyBhdCAwXG4gICAqL1xuICBwdWJsaWMgZ2V0IGxhc3RJdGVtKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMucGFnZS5sYXN0SXRlbTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb25kaXRpb25hbGx5IGFkZHMgcGFnZSBudW1iZXJzIGJlZm9yZSBhbmQgYWZ0ZXIgdGhlIGN1cnJlbnQgcGFnZVxuICAgKi9cbiAgcHVibGljIGdldCBtaWRkbGVQYWdlcygpOiBudW1iZXJbXSB7XG4gICAgY29uc3QgbWlkZGxlUGFnZXM6IG51bWJlcltdID0gW107XG4gICAgaWYgKHRoaXMucGFnZS5jdXJyZW50ID4gMSkge1xuICAgICAgbWlkZGxlUGFnZXMucHVzaCh0aGlzLnBhZ2UuY3VycmVudCAtIDEpO1xuICAgIH1cbiAgICBtaWRkbGVQYWdlcy5wdXNoKHRoaXMucGFnZS5jdXJyZW50KTtcbiAgICBpZiAodGhpcy5wYWdlLmN1cnJlbnQgPCB0aGlzLnBhZ2UubGFzdCkge1xuICAgICAgbWlkZGxlUGFnZXMucHVzaCh0aGlzLnBhZ2UuY3VycmVudCArIDEpO1xuICAgIH1cbiAgICByZXR1cm4gbWlkZGxlUGFnZXM7XG4gIH1cblxuICAvKipcbiAgICogV2Ugb25seSB1cGRhdGUgdGhlIHBhZ2luYXRpb24ncyBjdXJyZW50IHBhZ2Ugb24gYmx1ciBvZiB0aGUgaW5wdXQgZmllbGQsIG9yXG4gICAqIHdoZW4gdGhleSBwcmVzcyBlbnRlci5cbiAgICovXG4gIHB1YmxpYyB1cGRhdGVDdXJyZW50UGFnZShldmVudDogYW55KTogdm9pZCB7XG4gICAgY29uc3QgcGFyc2VkID0gcGFyc2VJbnQoZXZlbnQudGFyZ2V0LnZhbHVlLCAxMCk7XG5cbiAgICAvLyBpZiB0aGUgaW5wdXQgdmFsdWUsIGlzIG5vdCBhIG51bWJlciwgd2UgZG9uJ3QgdXBkYXRlIHRoZSBwYWdlXG4gICAgaWYgKCFpc05hTihwYXJzZWQpKSB7XG4gICAgICBpZiAocGFyc2VkIDwgMSkge1xuICAgICAgICB0aGlzLnBhZ2UuY3VycmVudCA9IDE7XG4gICAgICB9IGVsc2UgaWYgKHBhcnNlZCA+IHRoaXMucGFnZS5sYXN0KSB7XG4gICAgICAgIHRoaXMucGFnZS5jdXJyZW50ID0gdGhpcy5wYWdlLmxhc3Q7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnBhZ2UuY3VycmVudCA9IHBhcnNlZDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIGlucHV0J3MgdmFsdWUgdG8gdGhlIG5ldyBjdXJyZW50IHBhZ2UuIFRoaXMgaXMgbmVlZGVkIGJlY2F1c2UgdGhlIGNvZGVcbiAgICAgKiBhYm92ZSBtYXkgaGF2ZSBjaGFuZ2VkIHRoZSB2YWx1ZSBmcm9tIHdoYXQgdGhlIHVzZXIgZW50ZXJlZCBpbi5cbiAgICAgKi9cbiAgICB0aGlzLmN1cnJlbnRQYWdlSW5wdXRSZWYubmF0aXZlRWxlbWVudC52YWx1ZSA9IHRoaXMucGFnZS5jdXJyZW50O1xuICB9XG59XG4iXX0=