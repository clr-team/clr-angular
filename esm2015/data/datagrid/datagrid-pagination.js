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
export class ClrDatagridPagination {
    /**
     * @param {?} page
     */
    constructor(page) {
        this.page = page;
        this.defaultSize = true;
        this.currentChanged = new EventEmitter(false);
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
         * The reason we set it in this constructor and not in the provider itself is because
         * we don't want pagination (page size 0) if this component isn't present in the datagrid.
         */
        if (this.defaultSize) {
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
            this.defaultSize = false;
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
}
ClrDatagridPagination.decorators = [
    { type: Component, args: [{
                selector: 'clr-dg-pagination',
                template: `
        <div class="pagination-description">
            <ng-content></ng-content>
        </div>
        <ul class="pagination-list" *ngIf="page.last > 1">
            <li *ngIf="page.current > 1">
                <button
                        class="pagination-previous"
                        (click)="page.previous()"
                        type="button"></button>
            </li>
            <li *ngIf="page.current > 2">
                <button (click)="page.current = 1" type="button">1</button>
            </li>
            <li *ngIf="page.current > 3">...</li>
            <li *ngFor="let pageNum of middlePages" [class.pagination-current]="pageNum === page.current">
                <button
                        *ngIf="pageNum !== page.current; else noButton"
                        (click)="page.current = pageNum"
                        type="button">{{pageNum}}
                </button>
                <ng-template #noButton>{{pageNum}}</ng-template>
            </li>
            <li *ngIf="page.current < page.last - 2">...</li>
            <li *ngIf="page.current < page.last - 1">
                <button
                        (click)="page.current = page.last"
                        type="button">{{page.last}}
                </button>
            </li>
            <li *ngIf="page.current < page.last">
                <button
                        class="pagination-next"
                        (click)="page.next()"
                        type="button"></button>
            </li>
        </ul>
    `,
                host: { '[class.pagination]': 'true' }
            }] }
];
/** @nocollapse */
ClrDatagridPagination.ctorParameters = () => [
    { type: Page }
];
ClrDatagridPagination.propDecorators = {
    pageSize: [{ type: Input, args: ['clrDgPageSize',] }],
    totalItems: [{ type: Input, args: ['clrDgTotalItems',] }],
    lastPage: [{ type: Input, args: ['clrDgLastPage',] }],
    currentPage: [{ type: Input, args: ['clrDgPage',] }],
    currentChanged: [{ type: Output, args: ['clrDgPageChange',] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtcGFnaW5hdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvZGF0YWdyaWQtcGFnaW5hdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFLQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUcxRixPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUE0Q3hDLE1BQU0sT0FBTyxxQkFBcUI7Ozs7SUFDaEMsWUFBbUIsSUFBVTtRQUFWLFNBQUksR0FBSixJQUFJLENBQU07UUFFckIsZ0JBQVcsR0FBRyxJQUFJLENBQUM7UUF1RkEsbUJBQWMsR0FBRyxJQUFJLFlBQVksQ0FBUyxLQUFLLENBQUMsQ0FBQztJQXpGNUMsQ0FBQzs7Ozs7OztJQVFqQyxRQUFRO1FBQ047Ozs7V0FJRztRQUNILElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7U0FDckI7UUFDRCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUNwRyxDQUFDOzs7O0lBT0QsV0FBVztRQUNULElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDMUIsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDMUIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3RDO0lBQ0gsQ0FBQzs7Ozs7SUFLRCxJQUFXLFFBQVE7UUFDakIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztJQUN4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ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IFBhZ2UgfSBmcm9tICcuL3Byb3ZpZGVycy9wYWdlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLWRnLXBhZ2luYXRpb24nLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IGNsYXNzPVwicGFnaW5hdGlvbi1kZXNjcmlwdGlvblwiPlxuICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPHVsIGNsYXNzPVwicGFnaW5hdGlvbi1saXN0XCIgKm5nSWY9XCJwYWdlLmxhc3QgPiAxXCI+XG4gICAgICAgICAgICA8bGkgKm5nSWY9XCJwYWdlLmN1cnJlbnQgPiAxXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwYWdpbmF0aW9uLXByZXZpb3VzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJwYWdlLnByZXZpb3VzKClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiPjwvYnV0dG9uPlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIDxsaSAqbmdJZj1cInBhZ2UuY3VycmVudCA+IDJcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIChjbGljayk9XCJwYWdlLmN1cnJlbnQgPSAxXCIgdHlwZT1cImJ1dHRvblwiPjE8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8bGkgKm5nSWY9XCJwYWdlLmN1cnJlbnQgPiAzXCI+Li4uPC9saT5cbiAgICAgICAgICAgIDxsaSAqbmdGb3I9XCJsZXQgcGFnZU51bSBvZiBtaWRkbGVQYWdlc1wiIFtjbGFzcy5wYWdpbmF0aW9uLWN1cnJlbnRdPVwicGFnZU51bSA9PT0gcGFnZS5jdXJyZW50XCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJwYWdlTnVtICE9PSBwYWdlLmN1cnJlbnQ7IGVsc2Ugbm9CdXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cInBhZ2UuY3VycmVudCA9IHBhZ2VOdW1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiPnt7cGFnZU51bX19XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNub0J1dHRvbj57e3BhZ2VOdW19fTwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgPGxpICpuZ0lmPVwicGFnZS5jdXJyZW50IDwgcGFnZS5sYXN0IC0gMlwiPi4uLjwvbGk+XG4gICAgICAgICAgICA8bGkgKm5nSWY9XCJwYWdlLmN1cnJlbnQgPCBwYWdlLmxhc3QgLSAxXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cInBhZ2UuY3VycmVudCA9IHBhZ2UubGFzdFwiXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCI+e3twYWdlLmxhc3R9fVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIDxsaSAqbmdJZj1cInBhZ2UuY3VycmVudCA8IHBhZ2UubGFzdFwiPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicGFnaW5hdGlvbi1uZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJwYWdlLm5leHQoKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCI+PC9idXR0b24+XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICA8L3VsPlxuICAgIGAsXG4gIGhvc3Q6IHsgJ1tjbGFzcy5wYWdpbmF0aW9uXSc6ICd0cnVlJyB9LFxufSlcbmV4cG9ydCBjbGFzcyBDbHJEYXRhZ3JpZFBhZ2luYXRpb24gaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uSW5pdCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBwYWdlOiBQYWdlKSB7fVxuXG4gIHByaXZhdGUgZGVmYXVsdFNpemUgPSB0cnVlO1xuXG4gIC8qKioqKioqKioqXG4gICAqIFN1YnNjcmlwdGlvbiB0byB0aGUgUGFnZSBzZXJ2aWNlIGZvciBwYWdlIGNoYW5nZXMuXG4gICAqIE5vdGU6IHRoaXMgb25seSBlbWl0cyBhZnRlciB0aGUgZGF0YWdyaWQgaXMgaW5pdGlhbGl6ZWQvc3RhYmFsaXplZCBhbmQgdGhlIHBhZ2UgY2hhbmdlcy5cbiAgICovXG4gIG5nT25Jbml0KCkge1xuICAgIC8qXG4gICAgICogRGVmYXVsdCBwYWdlIHNpemUgaXMgMTAuXG4gICAgICogVGhlIHJlYXNvbiB3ZSBzZXQgaXQgaW4gdGhpcyBjb25zdHJ1Y3RvciBhbmQgbm90IGluIHRoZSBwcm92aWRlciBpdHNlbGYgaXMgYmVjYXVzZVxuICAgICAqIHdlIGRvbid0IHdhbnQgcGFnaW5hdGlvbiAocGFnZSBzaXplIDApIGlmIHRoaXMgY29tcG9uZW50IGlzbid0IHByZXNlbnQgaW4gdGhlIGRhdGFncmlkLlxuICAgICAqL1xuICAgIGlmICh0aGlzLmRlZmF1bHRTaXplKSB7XG4gICAgICB0aGlzLnBhZ2Uuc2l6ZSA9IDEwO1xuICAgIH1cbiAgICB0aGlzLl9wYWdlU3Vic2NyaXB0aW9uID0gdGhpcy5wYWdlLmNoYW5nZS5zdWJzY3JpYmUoY3VycmVudCA9PiB0aGlzLmN1cnJlbnRDaGFuZ2VkLmVtaXQoY3VycmVudCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFN1YnNjcmlwdGlvbiB0byB0aGUgcGFnZSBzZXJ2aWNlIGNoYW5nZXNcbiAgICovXG4gIHByaXZhdGUgX3BhZ2VTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnBhZ2UucmVzZXRQYWdlU2l6ZSgpO1xuICAgIGlmICh0aGlzLl9wYWdlU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLl9wYWdlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFBhZ2Ugc2l6ZVxuICAgKi9cbiAgcHVibGljIGdldCBwYWdlU2l6ZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnBhZ2Uuc2l6ZTtcbiAgfVxuXG4gIEBJbnB1dCgnY2xyRGdQYWdlU2l6ZScpXG4gIHB1YmxpYyBzZXQgcGFnZVNpemUoc2l6ZTogbnVtYmVyKSB7XG4gICAgaWYgKHR5cGVvZiBzaXplID09PSAnbnVtYmVyJykge1xuICAgICAgdGhpcy5kZWZhdWx0U2l6ZSA9IGZhbHNlO1xuICAgICAgdGhpcy5wYWdlLnNpemUgPSBzaXplO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUb3RhbCBpdGVtcyAobmVlZGVkIHRvIGd1ZXNzIHRoZSBsYXN0IHBhZ2UpXG4gICAqL1xuICBwdWJsaWMgZ2V0IHRvdGFsSXRlbXMoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5wYWdlLnRvdGFsSXRlbXM7XG4gIH1cblxuICBASW5wdXQoJ2NsckRnVG90YWxJdGVtcycpXG4gIHB1YmxpYyBzZXQgdG90YWxJdGVtcyh0b3RhbDogbnVtYmVyKSB7XG4gICAgaWYgKHR5cGVvZiB0b3RhbCA9PT0gJ251bWJlcicpIHtcbiAgICAgIHRoaXMucGFnZS50b3RhbEl0ZW1zID0gdG90YWw7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIExhc3QgcGFnZVxuICAgKi9cbiAgcHVibGljIGdldCBsYXN0UGFnZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnBhZ2UubGFzdDtcbiAgfVxuXG4gIEBJbnB1dCgnY2xyRGdMYXN0UGFnZScpXG4gIHB1YmxpYyBzZXQgbGFzdFBhZ2UobGFzdDogbnVtYmVyKSB7XG4gICAgaWYgKHR5cGVvZiBsYXN0ID09PSAnbnVtYmVyJykge1xuICAgICAgdGhpcy5wYWdlLmxhc3QgPSBsYXN0O1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDdXJyZW50IHBhZ2VcbiAgICovXG4gIHB1YmxpYyBnZXQgY3VycmVudFBhZ2UoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5wYWdlLmN1cnJlbnQ7XG4gIH1cblxuICBASW5wdXQoJ2NsckRnUGFnZScpXG4gIHB1YmxpYyBzZXQgY3VycmVudFBhZ2UocGFnZTogbnVtYmVyKSB7XG4gICAgaWYgKHR5cGVvZiBwYWdlID09PSAnbnVtYmVyJykge1xuICAgICAgdGhpcy5wYWdlLmN1cnJlbnQgPSBwYWdlO1xuICAgIH1cbiAgfVxuXG4gIEBPdXRwdXQoJ2NsckRnUGFnZUNoYW5nZScpIGN1cnJlbnRDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KGZhbHNlKTtcblxuICAvKipcbiAgICogTW92ZXMgdG8gdGhlIHByZXZpb3VzIHBhZ2UgaWYgaXQgZXhpc3RzXG4gICAqL1xuICBwdWJsaWMgcHJldmlvdXMoKSB7XG4gICAgdGhpcy5wYWdlLnByZXZpb3VzKCk7XG4gIH1cblxuICAvKipcbiAgICogTW92ZXMgdG8gdGhlIG5leHQgcGFnZSBpZiBpdCBleGlzdHNcbiAgICovXG4gIHB1YmxpYyBuZXh0KCkge1xuICAgIHRoaXMucGFnZS5uZXh0KCk7XG4gIH1cblxuICAvKipcbiAgICogSW5kZXggb2YgdGhlIGZpcnN0IGl0ZW0gZGlzcGxheWVkIG9uIHRoZSBjdXJyZW50IHBhZ2UsIHN0YXJ0aW5nIGF0IDBcbiAgICovXG4gIHB1YmxpYyBnZXQgZmlyc3RJdGVtKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMucGFnZS5maXJzdEl0ZW07XG4gIH1cblxuICAvKipcbiAgICogSW5kZXggb2YgdGhlIGxhc3QgaXRlbSBkaXNwbGF5ZWQgb24gdGhlIGN1cnJlbnQgcGFnZSwgc3RhcnRpbmcgYXQgMFxuICAgKi9cbiAgcHVibGljIGdldCBsYXN0SXRlbSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnBhZ2UubGFzdEl0ZW07XG4gIH1cblxuICAvKipcbiAgICogQ29uZGl0aW9uYWxseSBhZGRzIHBhZ2UgbnVtYmVycyBiZWZvcmUgYW5kIGFmdGVyIHRoZSBjdXJyZW50IHBhZ2VcbiAgICovXG4gIHB1YmxpYyBnZXQgbWlkZGxlUGFnZXMoKTogbnVtYmVyW10ge1xuICAgIGNvbnN0IG1pZGRsZVBhZ2VzOiBudW1iZXJbXSA9IFtdO1xuICAgIGlmICh0aGlzLnBhZ2UuY3VycmVudCA+IDEpIHtcbiAgICAgIG1pZGRsZVBhZ2VzLnB1c2godGhpcy5wYWdlLmN1cnJlbnQgLSAxKTtcbiAgICB9XG4gICAgbWlkZGxlUGFnZXMucHVzaCh0aGlzLnBhZ2UuY3VycmVudCk7XG4gICAgaWYgKHRoaXMucGFnZS5jdXJyZW50IDwgdGhpcy5wYWdlLmxhc3QpIHtcbiAgICAgIG1pZGRsZVBhZ2VzLnB1c2godGhpcy5wYWdlLmN1cnJlbnQgKyAxKTtcbiAgICB9XG4gICAgcmV0dXJuIG1pZGRsZVBhZ2VzO1xuICB9XG59XG4iXX0=