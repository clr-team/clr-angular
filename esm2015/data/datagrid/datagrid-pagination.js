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
     * Index of the first item displayed on the current page, starting at 0, -1 if none displayed
     * @return {?}
     */
    get firstItem() {
        return this.page.firstItem;
    }
    /**
     * Index of the last item displayed on the current page, starting at 0, -1 if none displayed
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
    _pageSizeComponent: [{ type: ContentChild, args: [ClrDatagridPageSize, { static: false },] }],
    currentPageInputRef: [{ type: ViewChild, args: ['currentPageInput', { static: false },] }],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtcGFnaW5hdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvZGF0YWdyaWQtcGFnaW5hdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFLQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFlBQVksRUFDWixVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFHTCxNQUFNLEVBQ04sU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUN4QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQThCM0QsTUFBTSxPQUFPLHFCQUFxQjs7OztJQU1oQyxZQUFtQixJQUFVO1FBQVYsU0FBSSxHQUFKLElBQUksQ0FBTTtRQXdGRixtQkFBYyxHQUFHLElBQUksWUFBWSxDQUFTLEtBQUssQ0FBQyxDQUFDO1FBdkYxRSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7SUFDN0IsQ0FBQzs7Ozs7OztJQU1ELFFBQVE7UUFDTjs7OztXQUlHO1FBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztTQUNyQjtRQUNELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTOzs7O1FBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBQyxDQUFDO0lBQ3BHLENBQUM7Ozs7SUFPRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUMxQixJQUFJLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUMxQixJQUFJLENB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Z0JBQ2xDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQ3BDO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQzthQUM1QjtTQUNGO1FBRUQ7OztXQUdHO1FBQ0gsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDbkUsQ0FBQzs7O1lBOUxGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsbUJBQW1CO2dCQUM3QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBdUJQO2dCQUNILElBQUksRUFBRSxFQUFFLG9CQUFvQixFQUFFLE1BQU0sRUFBRTthQUN2Qzs7OztZQTlCUSxJQUFJOzs7aUNBZ0NWLFlBQVksU0FBQyxtQkFBbUIsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7a0NBRW5ELFNBQVMsU0FBQyxrQkFBa0IsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7dUJBMEMvQyxLQUFLLFNBQUMsZUFBZTt5QkFjckIsS0FBSyxTQUFDLGlCQUFpQjt1QkFjdkIsS0FBSyxTQUFDLGVBQWU7MEJBY3JCLEtBQUssU0FBQyxXQUFXOzZCQU9qQixNQUFNLFNBQUMsaUJBQWlCOzs7O0lBN0Z6QixtREFDd0M7O0lBQ3hDLG9EQUNnQzs7Ozs7O0lBeUJoQyxrREFBd0M7O0lBaUV4QywrQ0FBNEU7O0lBeEZoRSxxQ0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQge1xuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgVmlld0NoaWxkLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gJy4vcHJvdmlkZXJzL3BhZ2UnO1xuaW1wb3J0IHsgQ2xyRGF0YWdyaWRQYWdlU2l6ZSB9IGZyb20gJy4vZGF0YWdyaWQtcGFnZS1zaXplJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLWRnLXBhZ2luYXRpb24nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJwYWdpbmF0aW9uLXNpemVcIiAqbmdJZj1cIl9wYWdlU2l6ZUNvbXBvbmVudFwiPlxuICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiY2xyLWRnLXBhZ2Utc2l6ZVwiPjwvbmctY29udGVudD5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwicGFnaW5hdGlvbi1kZXNjcmlwdGlvblwiPlxuICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJwYWdpbmF0aW9uLWxpc3RcIiAqbmdJZj1cInBhZ2UubGFzdCA+IDFcIj5cbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwicGFnaW5hdGlvbi1maXJzdFwiIFtkaXNhYmxlZF09XCJwYWdlLmN1cnJlbnQgPD0gMVwiIChjbGljayk9XCJwYWdlLmN1cnJlbnQgPSAxXCI+XG4gICAgICAgIDxjbHItaWNvbiBzaGFwZT1cInN0ZXAtZm9yd2FyZC0yIGRvd25cIj48L2Nsci1pY29uPlxuICAgICAgPC9idXR0b24+XG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInBhZ2luYXRpb24tcHJldmlvdXNcIiBbZGlzYWJsZWRdPVwicGFnZS5jdXJyZW50IDw9IDFcIiAoY2xpY2spPVwicGFnZS5jdXJyZW50ID0gcGFnZS5jdXJyZW50IC0gMVwiPlxuICAgICAgICA8Y2xyLWljb24gc2hhcGU9XCJhbmdsZSBsZWZ0XCI+PC9jbHItaWNvbj5cbiAgICAgIDwvYnV0dG9uPlxuICAgICAgPGlucHV0ICNjdXJyZW50UGFnZUlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJwYWdpbmF0aW9uLWN1cnJlbnRcIiBbc2l6ZV09XCJwYWdlLmxhc3QudG9TdHJpbmcoKS5sZW5ndGhcIiBbdmFsdWVdPVwicGFnZS5jdXJyZW50XCJcbiAgICAgICAgICAgICAoa2V5ZG93bi5lbnRlcik9XCJ1cGRhdGVDdXJyZW50UGFnZSgkZXZlbnQpXCIgKGJsdXIpPVwidXBkYXRlQ3VycmVudFBhZ2UoJGV2ZW50KVwiLz4mbmJzcDsvJm5ic3A7PHNwYW4+e3twYWdlLmxhc3R9fTwvc3Bhbj5cbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwicGFnaW5hdGlvbi1uZXh0XCIgW2Rpc2FibGVkXT1cInBhZ2UuY3VycmVudCA+PSBwYWdlLmxhc3RcIiAoY2xpY2spPVwicGFnZS5jdXJyZW50ID0gcGFnZS5jdXJyZW50ICsgMVwiPlxuICAgICAgICA8Y2xyLWljb24gc2hhcGU9XCJhbmdsZSByaWdodFwiPjwvY2xyLWljb24+XG4gICAgICA8L2J1dHRvbj5cbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwicGFnaW5hdGlvbi1sYXN0XCIgW2Rpc2FibGVkXT1cInBhZ2UuY3VycmVudCA+PSBwYWdlLmxhc3RcIiAoY2xpY2spPVwicGFnZS5jdXJyZW50ID0gcGFnZS5sYXN0XCI+XG4gICAgICAgIDxjbHItaWNvbiBzaGFwZT1cInN0ZXAtZm9yd2FyZC0yIHVwXCI+PC9jbHItaWNvbj5cbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICAgIGAsXG4gIGhvc3Q6IHsgJ1tjbGFzcy5wYWdpbmF0aW9uXSc6ICd0cnVlJyB9LFxufSlcbmV4cG9ydCBjbGFzcyBDbHJEYXRhZ3JpZFBhZ2luYXRpb24gaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uSW5pdCB7XG4gIEBDb250ZW50Q2hpbGQoQ2xyRGF0YWdyaWRQYWdlU2l6ZSwgeyBzdGF0aWM6IGZhbHNlIH0pXG4gIF9wYWdlU2l6ZUNvbXBvbmVudDogQ2xyRGF0YWdyaWRQYWdlU2l6ZTtcbiAgQFZpZXdDaGlsZCgnY3VycmVudFBhZ2VJbnB1dCcsIHsgc3RhdGljOiBmYWxzZSB9KVxuICBjdXJyZW50UGFnZUlucHV0UmVmOiBFbGVtZW50UmVmO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBwYWdlOiBQYWdlKSB7XG4gICAgdGhpcy5wYWdlLmFjdGl2YXRlZCA9IHRydWU7XG4gIH1cblxuICAvKioqKioqKioqKlxuICAgKiBTdWJzY3JpcHRpb24gdG8gdGhlIFBhZ2Ugc2VydmljZSBmb3IgcGFnZSBjaGFuZ2VzLlxuICAgKiBOb3RlOiB0aGlzIG9ubHkgZW1pdHMgYWZ0ZXIgdGhlIGRhdGFncmlkIGlzIGluaXRpYWxpemVkL3N0YWJhbGl6ZWQgYW5kIHRoZSBwYWdlIGNoYW5nZXMuXG4gICAqL1xuICBuZ09uSW5pdCgpIHtcbiAgICAvKlxuICAgICAqIERlZmF1bHQgcGFnZSBzaXplIGlzIDEwLlxuICAgICAqIFRoZSByZWFzb24gd2Ugc2V0IGl0IGhlcmUgYW5kIG5vdCBpbiB0aGUgcHJvdmlkZXIgaXRzZWxmIGlzIGJlY2F1c2VcbiAgICAgKiB3ZSBkb24ndCB3YW50IHBhZ2luYXRpb24gaWYgdGhpcyBjb21wb25lbnQgaXNuJ3QgcHJlc2VudCBpbiB0aGUgZGF0YWdyaWQuXG4gICAgICovXG4gICAgaWYgKCF0aGlzLnBhZ2Uuc2l6ZSkge1xuICAgICAgdGhpcy5wYWdlLnNpemUgPSAxMDtcbiAgICB9XG4gICAgdGhpcy5fcGFnZVN1YnNjcmlwdGlvbiA9IHRoaXMucGFnZS5jaGFuZ2Uuc3Vic2NyaWJlKGN1cnJlbnQgPT4gdGhpcy5jdXJyZW50Q2hhbmdlZC5lbWl0KGN1cnJlbnQpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdWJzY3JpcHRpb24gdG8gdGhlIHBhZ2Ugc2VydmljZSBjaGFuZ2VzXG4gICAqL1xuICBwcml2YXRlIF9wYWdlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5wYWdlLnJlc2V0UGFnZVNpemUoKTtcbiAgICBpZiAodGhpcy5fcGFnZVN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5fcGFnZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQYWdlIHNpemVcbiAgICovXG4gIHB1YmxpYyBnZXQgcGFnZVNpemUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5wYWdlLnNpemU7XG4gIH1cblxuICBASW5wdXQoJ2NsckRnUGFnZVNpemUnKVxuICBwdWJsaWMgc2V0IHBhZ2VTaXplKHNpemU6IG51bWJlcikge1xuICAgIGlmICh0eXBlb2Ygc2l6ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgIHRoaXMucGFnZS5zaXplID0gc2l6ZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVG90YWwgaXRlbXMgKG5lZWRlZCB0byBndWVzcyB0aGUgbGFzdCBwYWdlKVxuICAgKi9cbiAgcHVibGljIGdldCB0b3RhbEl0ZW1zKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMucGFnZS50b3RhbEl0ZW1zO1xuICB9XG5cbiAgQElucHV0KCdjbHJEZ1RvdGFsSXRlbXMnKVxuICBwdWJsaWMgc2V0IHRvdGFsSXRlbXModG90YWw6IG51bWJlcikge1xuICAgIGlmICh0eXBlb2YgdG90YWwgPT09ICdudW1iZXInKSB7XG4gICAgICB0aGlzLnBhZ2UudG90YWxJdGVtcyA9IHRvdGFsO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBMYXN0IHBhZ2VcbiAgICovXG4gIHB1YmxpYyBnZXQgbGFzdFBhZ2UoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5wYWdlLmxhc3Q7XG4gIH1cblxuICBASW5wdXQoJ2NsckRnTGFzdFBhZ2UnKVxuICBwdWJsaWMgc2V0IGxhc3RQYWdlKGxhc3Q6IG51bWJlcikge1xuICAgIGlmICh0eXBlb2YgbGFzdCA9PT0gJ251bWJlcicpIHtcbiAgICAgIHRoaXMucGFnZS5sYXN0ID0gbGFzdDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ3VycmVudCBwYWdlXG4gICAqL1xuICBwdWJsaWMgZ2V0IGN1cnJlbnRQYWdlKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMucGFnZS5jdXJyZW50O1xuICB9XG5cbiAgQElucHV0KCdjbHJEZ1BhZ2UnKVxuICBwdWJsaWMgc2V0IGN1cnJlbnRQYWdlKHBhZ2U6IG51bWJlcikge1xuICAgIGlmICh0eXBlb2YgcGFnZSA9PT0gJ251bWJlcicpIHtcbiAgICAgIHRoaXMucGFnZS5jdXJyZW50ID0gcGFnZTtcbiAgICB9XG4gIH1cblxuICBAT3V0cHV0KCdjbHJEZ1BhZ2VDaGFuZ2UnKSBjdXJyZW50Q2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPihmYWxzZSk7XG5cbiAgLyoqXG4gICAqIE1vdmVzIHRvIHRoZSBwcmV2aW91cyBwYWdlIGlmIGl0IGV4aXN0c1xuICAgKi9cbiAgcHVibGljIHByZXZpb3VzKCkge1xuICAgIHRoaXMucGFnZS5wcmV2aW91cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1vdmVzIHRvIHRoZSBuZXh0IHBhZ2UgaWYgaXQgZXhpc3RzXG4gICAqL1xuICBwdWJsaWMgbmV4dCgpIHtcbiAgICB0aGlzLnBhZ2UubmV4dCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluZGV4IG9mIHRoZSBmaXJzdCBpdGVtIGRpc3BsYXllZCBvbiB0aGUgY3VycmVudCBwYWdlLCBzdGFydGluZyBhdCAwLCAtMSBpZiBub25lIGRpc3BsYXllZFxuICAgKi9cbiAgcHVibGljIGdldCBmaXJzdEl0ZW0oKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5wYWdlLmZpcnN0SXRlbTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbmRleCBvZiB0aGUgbGFzdCBpdGVtIGRpc3BsYXllZCBvbiB0aGUgY3VycmVudCBwYWdlLCBzdGFydGluZyBhdCAwLCAtMSBpZiBub25lIGRpc3BsYXllZFxuICAgKi9cbiAgcHVibGljIGdldCBsYXN0SXRlbSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnBhZ2UubGFzdEl0ZW07XG4gIH1cblxuICAvKipcbiAgICogQ29uZGl0aW9uYWxseSBhZGRzIHBhZ2UgbnVtYmVycyBiZWZvcmUgYW5kIGFmdGVyIHRoZSBjdXJyZW50IHBhZ2VcbiAgICovXG4gIHB1YmxpYyBnZXQgbWlkZGxlUGFnZXMoKTogbnVtYmVyW10ge1xuICAgIGNvbnN0IG1pZGRsZVBhZ2VzOiBudW1iZXJbXSA9IFtdO1xuICAgIGlmICh0aGlzLnBhZ2UuY3VycmVudCA+IDEpIHtcbiAgICAgIG1pZGRsZVBhZ2VzLnB1c2godGhpcy5wYWdlLmN1cnJlbnQgLSAxKTtcbiAgICB9XG4gICAgbWlkZGxlUGFnZXMucHVzaCh0aGlzLnBhZ2UuY3VycmVudCk7XG4gICAgaWYgKHRoaXMucGFnZS5jdXJyZW50IDwgdGhpcy5wYWdlLmxhc3QpIHtcbiAgICAgIG1pZGRsZVBhZ2VzLnB1c2godGhpcy5wYWdlLmN1cnJlbnQgKyAxKTtcbiAgICB9XG4gICAgcmV0dXJuIG1pZGRsZVBhZ2VzO1xuICB9XG5cbiAgLyoqXG4gICAqIFdlIG9ubHkgdXBkYXRlIHRoZSBwYWdpbmF0aW9uJ3MgY3VycmVudCBwYWdlIG9uIGJsdXIgb2YgdGhlIGlucHV0IGZpZWxkLCBvclxuICAgKiB3aGVuIHRoZXkgcHJlc3MgZW50ZXIuXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlQ3VycmVudFBhZ2UoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IHBhcnNlZCA9IHBhcnNlSW50KGV2ZW50LnRhcmdldC52YWx1ZSwgMTApO1xuXG4gICAgLy8gaWYgdGhlIGlucHV0IHZhbHVlLCBpcyBub3QgYSBudW1iZXIsIHdlIGRvbid0IHVwZGF0ZSB0aGUgcGFnZVxuICAgIGlmICghaXNOYU4ocGFyc2VkKSkge1xuICAgICAgaWYgKHBhcnNlZCA8IDEpIHtcbiAgICAgICAgdGhpcy5wYWdlLmN1cnJlbnQgPSAxO1xuICAgICAgfSBlbHNlIGlmIChwYXJzZWQgPiB0aGlzLnBhZ2UubGFzdCkge1xuICAgICAgICB0aGlzLnBhZ2UuY3VycmVudCA9IHRoaXMucGFnZS5sYXN0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wYWdlLmN1cnJlbnQgPSBwYXJzZWQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBpbnB1dCdzIHZhbHVlIHRvIHRoZSBuZXcgY3VycmVudCBwYWdlLiBUaGlzIGlzIG5lZWRlZCBiZWNhdXNlIHRoZSBjb2RlXG4gICAgICogYWJvdmUgbWF5IGhhdmUgY2hhbmdlZCB0aGUgdmFsdWUgZnJvbSB3aGF0IHRoZSB1c2VyIGVudGVyZWQgaW4uXG4gICAgICovXG4gICAgdGhpcy5jdXJyZW50UGFnZUlucHV0UmVmLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSB0aGlzLnBhZ2UuY3VycmVudDtcbiAgfVxufVxuIl19