/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
/**
 * PageCollectionService manages the collection of pages assigned to the wizard and offers
 * a number of functions useful across the wizards providers and subcomponents -- all related
 * to essentially lookups on the collection of pages.
 *
 * The easiest way to access PageCollectionService is via the wizard. The
 * following example would allow you to access your instance of the wizard from your host
 * component and thereby access the page collection via YourHostComponent.wizard.pageCollection.
 *
 * \@example
 * <clr-wizard #wizard ...>
 *
 * \@example
 * export class YourHostComponent {
 * \@ViewChild("wizard") wizard: Wizard;
 *   ...
 * }
 *
 * The heart of the page collection is the query list of pages, which it is assigned as a
 * reference to the Wizard.pages QueryList when the wizard is created.
 *
 */
export class PageCollectionService {
    constructor() {
        // used by the navService to navigate back to first possible step after
        // pages are reset
        /**
         *
         * \@memberof PageCollectionService
         */
        this._pagesReset = new Subject();
    }
    /**
     * Converts the PageCollectionService.pages QueryList to an array and returns it.
     *
     * Useful for many instances when you would prefer a QueryList to act like an array.
     *
     * \@memberof PageCollectionService
     * @return {?}
     */
    get pagesAsArray() {
        return this.pages ? this.pages.toArray() : [];
    }
    /**
     * Returns the length of the pages query list.
     *
     * \@memberof PageCollectionService
     * @return {?}
     */
    get pagesCount() {
        return this.pages ? this.pages.length : 0;
    }
    /**
     * Returns the next-to-last page in the query list of pages. Operates as a getter
     * so that it isn't working with stale data.
     *
     * \@memberof PageCollectionService
     * @return {?}
     */
    get penultimatePage() {
        /** @type {?} */
        const pageCount = this.pagesCount;
        if (pageCount < 2) {
            return;
        }
        return this.pagesAsArray[pageCount - 2];
    }
    /**
     * Returns the last page in the query list of pages. Operates as a getter
     * so that it isn't working with stale data.
     *
     * \@memberof PageCollectionService
     * @return {?}
     */
    get lastPage() {
        /** @type {?} */
        const pageCount = this.pagesCount;
        if (pageCount < 1) {
            return;
        }
        return this.pagesAsArray[pageCount - 1];
    }
    /**
     * Returns the first page in the query list of pages. Operates as a getter
     * so that it isn't working with stale data.
     *
     * \@memberof PageCollectionService
     * @return {?}
     */
    get firstPage() {
        if (!this.pagesCount) {
            return;
        }
        return this.pagesAsArray[0];
    }
    /**
     * Used mostly internally, but accepts a string ID and returns a ClrWizardPage
     * object that matches the ID passed. Note that IDs here should include the prefix
     * "clr-wizard-page-".
     *
     * Returns the next-to-last page in the query list of pages. Operates as a getter
     * so that it isn't working with stale data.
     *
     * \@memberof PageCollectionService
     * @param {?} id
     * @return {?}
     */
    getPageById(id) {
        /** @type {?} */
        const foundPages = this.pages.filter((page) => id === page.id);
        return this.checkResults(foundPages, id);
    }
    /**
     * Accepts s number as a parameter and treats that number as the index of the page
     * you're looking for in the collection of pages. Returns a  wizard page object.
     *
     * \@memberof PageCollectionService
     * @param {?} index
     * @return {?}
     */
    getPageByIndex(index) {
        /** @type {?} */
        const pageCount = this.pagesCount;
        /** @type {?} */
        const pagesLastIndex = pageCount > 1 ? pageCount - 1 : 0;
        if (index < 0) {
            throw new Error('Cannot retrieve page with index of ' + index);
        }
        if (index > pagesLastIndex) {
            throw new Error('Page index is greater than length of pages array.');
        }
        return this.pagesAsArray[index];
    }
    /**
     * Takes a wizard page object as a parameter and returns its index in the
     * collection of pages.
     *
     * \@memberof PageCollectionService
     * @param {?} page
     * @return {?}
     */
    getPageIndex(page) {
        /** @type {?} */
        const index = this.pagesAsArray.indexOf(page);
        if (index < 0) {
            throw new Error('Requested page cannot be found in collection of pages.');
        }
        return index;
    }
    /**
     * Consolidates guard logic that prevents a couple of unfortunate edge cases with
     * look ups on the collection of pages.
     *
     * \@memberof PageCollectionService
     * @param {?} results
     * @param {?} requestedPageId
     * @return {?}
     */
    checkResults(results, requestedPageId) {
        /** @type {?} */
        const foundPagesCount = results.length || 0;
        if (foundPagesCount > 1) {
            throw new Error('More than one page has the requested id ' + requestedPageId + '.');
        }
        else if (foundPagesCount < 1) {
            throw new Error('No page can be found with the id ' + requestedPageId + '.');
        }
        else {
            return results[0];
        }
    }
    /**
     * Accepts two numeric indexes and returns an array of wizard page objects that include
     * all wizard pages in the page collection from the first index to the second.
     *
     * \@memberof PageCollectionService
     * @param {?} start
     * @param {?} end
     * @return {?}
     */
    pageRange(start, end) {
        /** @type {?} */
        let pages = [];
        if (start < 0 || end < 0) {
            return [];
        }
        if (start === null || typeof start === undefined || isNaN(start)) {
            return [];
        }
        if (end === null || typeof end === undefined || isNaN(end)) {
            return [];
        }
        if (end > this.pagesCount) {
            end = this.pagesCount;
        }
        pages = this.pagesAsArray;
        if (end - start === 0) {
            // just return the one page they want
            return [this.getPageByIndex(start)];
        }
        // slice end does not include item referenced by end index, which is weird for users
        // incrementing end index here to correct that so users and other methods
        // don't have to think about it
        end = end + 1;
        // slice does not return the last one in the range but it does include the first one
        // does not modify original array
        return pages.slice(start, end);
    }
    /**
     * Accepts two wizard page objects and returns those page objects with all other page
     * objects between them in the page collection. It doesn't care which page is ahead of the
     * other in the parameters. It will be smart enough to figure that out  on its own.
     *
     * \@memberof PageCollectionService
     * @param {?} page
     * @param {?} otherPage
     * @return {?}
     */
    getPageRangeFromPages(page, otherPage) {
        /** @type {?} */
        const pageIndex = this.getPageIndex(page);
        /** @type {?} */
        const otherPageIndex = this.getPageIndex(otherPage);
        /** @type {?} */
        let startIndex;
        /** @type {?} */
        let endIndex;
        if (pageIndex <= otherPageIndex) {
            startIndex = pageIndex;
            endIndex = otherPageIndex;
        }
        else {
            startIndex = otherPageIndex;
            endIndex = pageIndex;
        }
        return this.pageRange(startIndex, endIndex);
    }
    /**
     * Takes a wizard page object as a parameter and returns the wizard page object of
     * the page immediately before it in the page collection. Returns null if there is
     * no page before the page it is passed.
     *
     * \@memberof PageCollectionService
     * @param {?} page
     * @return {?}
     */
    getPreviousPage(page) {
        /** @type {?} */
        const myPageIndex = this.getPageIndex(page);
        /** @type {?} */
        const previousPageIndex = myPageIndex - 1;
        if (previousPageIndex < 0) {
            return null;
        }
        return this.getPageByIndex(previousPageIndex);
    }
    /**
     * Accepts a wizard page object as a parameter and returns a Boolean that says if
     * the page you sent it is complete.
     *
     * \@memberof PageCollectionService
     * @param {?} page
     * @return {?}
     */
    previousPageIsCompleted(page) {
        /** @type {?} */
        let previousPage;
        if (!page) {
            return false;
        }
        previousPage = this.getPreviousPage(page);
        if (null === previousPage) {
            // page is the first page. no previous page.
            return true;
        }
        return previousPage.completed;
    }
    /**
     * Takes a wizard page object as a parameter and returns the wizard page object of
     * the page immediately after it in the page collection. Returns null if there is
     * no page after the page it is passed.
     *
     * \@memberof PageCollectionService
     * @param {?} page
     * @return {?}
     */
    getNextPage(page) {
        /** @type {?} */
        const myPageIndex = this.getPageIndex(page);
        /** @type {?} */
        const nextPageIndex = myPageIndex + 1;
        if (nextPageIndex >= this.pagesAsArray.length) {
            return null;
        }
        return this.getPageByIndex(nextPageIndex);
    }
    /**
     * Takes a wizard page object as a parameter and generates a step item id from the
     * page ID. Returns the generated step item ID as a string.
     *
     * \@memberof PageCollectionService
     * @param {?} page
     * @return {?}
     */
    getStepItemIdForPage(page) {
        /** @type {?} */
        const pageId = page.id;
        /** @type {?} */
        const pageIdParts = pageId.split('-').reverse();
        pageIdParts[1] = 'step';
        return pageIdParts.reverse().join('-');
    }
    /**
     * Generally only used internally to mark that a specific page has been "committed".
     * This involves marking the page complete and firing the ClrWizardPage.onCommit
     * (clrWizardPageOnCommit) output. Takes the wizard page object that you intend to
     * mark completed as a parameter.
     *
     * \@memberof PageCollectionService
     * @param {?} page
     * @return {?}
     */
    commitPage(page) {
        /** @type {?} */
        const pageHasOverrides = page.stopNext || page.preventDefault;
        page.completed = true;
        if (!pageHasOverrides) {
            // prevent loop of event emission; alternate flows work off
            // of event emitters this is how they break that cycle.
            page.onCommit.emit(page.id);
        }
    }
    /**
     * An observable that the navigation service listens to in order to know when
     * the page collection completed states have been reset to false so that way it
     * can also reset the navigation to make the first page in the page collection
     * current/active.
     *
     * \@memberof PageCollectionService
     * @return {?}
     */
    get pagesReset() {
        return this._pagesReset.asObservable();
    }
    /**
     * Sets all completed states of the pages in the page collection to false and
     * notifies the navigation service to likewise reset the navigation.
     *
     * \@memberof PageCollectionService
     * @return {?}
     */
    reset() {
        this.pagesAsArray.forEach((page) => {
            page.completed = false;
        });
        this._pagesReset.next(true);
    }
    /**
     * Rolls through all the pages in the page collection to make sure there are no
     * incomplete pages sandwiched between completed pages in the workflow. Identifies
     * the first incomplete page index and sets all pages behind it to a completed
     * state of false.
     *
     * \@memberof PageCollectionService
     * @return {?}
     */
    updateCompletedStates() {
        /** @type {?} */
        const firstIncompleteIndex = this.findFirstIncompletePageIndex();
        if (firstIncompleteIndex === this.pagesAsArray.length - 1) {
            // all complete no need to do anything
            return;
        }
        this.pagesAsArray.forEach((page, index) => {
            if (index > firstIncompleteIndex) {
                page.completed = false;
            }
        });
    }
    /**
     * Retrieves the index of the first incomplete page in the page collection.
     *
     * \@memberof PageCollectionService
     * @return {?}
     */
    findFirstIncompletePageIndex() {
        /** @type {?} */
        let returnIndex = null;
        this.pagesAsArray.forEach((page, index) => {
            if (null === returnIndex && false === page.completed) {
                returnIndex = index;
            }
        });
        // fallthrough, all completed, return last page
        if (null === returnIndex) {
            returnIndex = this.pagesCount - 1;
        }
        return returnIndex;
    }
    /**
     * @return {?}
     */
    findFirstIncompletePage() {
        /** @type {?} */
        const myIncompleteIndex = this.findFirstIncompletePageIndex();
        return this.pagesAsArray[myIncompleteIndex];
    }
}
PageCollectionService.decorators = [
    { type: Injectable }
];
if (false) {
    /**
     * A reference to the Wizard.pages QueryList.
     *
     * Populated when the wizard is created.
     *
     * \@memberof PageCollectionService
     * @type {?}
     */
    PageCollectionService.prototype.pages;
    /**
     *
     * \@memberof PageCollectionService
     * @type {?}
     */
    PageCollectionService.prototype._pagesReset;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1jb2xsZWN0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJ3aXphcmQvcHJvdmlkZXJzL3BhZ2UtY29sbGVjdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQU1BLE9BQU8sRUFBRSxVQUFVLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFFdEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEyQi9CLE1BQU0sT0FBTyxxQkFBcUI7SUFEbEM7Ozs7Ozs7UUFvVFUsZ0JBQVcsR0FBRyxJQUFJLE9BQU8sRUFBVyxDQUFDO0lBMkUvQyxDQUFDOzs7Ozs7Ozs7SUE3V0MsSUFBVyxZQUFZO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ2hELENBQUM7Ozs7Ozs7SUFPRCxJQUFXLFVBQVU7UUFDbkIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVDLENBQUM7Ozs7Ozs7O0lBUUQsSUFBVyxlQUFlOztjQUNsQixTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVU7UUFFakMsSUFBSSxTQUFTLEdBQUcsQ0FBQyxFQUFFO1lBQ2pCLE9BQU87U0FDUjtRQUVELE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDMUMsQ0FBQzs7Ozs7Ozs7SUFRRCxJQUFXLFFBQVE7O2NBQ1gsU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVO1FBRWpDLElBQUksU0FBUyxHQUFHLENBQUMsRUFBRTtZQUNqQixPQUFPO1NBQ1I7UUFFRCxPQUFPLElBQUksQ0FB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LEdBQUcsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7U0FDbkM7UUFFRCxPQUFPLFdBQVcsQ0FBQztJQUNyQixDQUFDOzs7O0lBRU0sdUJBQXVCOztjQUN0QixpQkFBaUIsR0FBRyxJQUFJLENBQUMsNEJBQTRCLEVBQUU7UUFDN0QsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDOUMsQ0FBQzs7O1lBOVhGLFVBQVU7Ozs7Ozs7Ozs7O0lBU1Qsc0NBQXVDOzs7Ozs7SUEyU3ZDLDRDQUE2QyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgUXVlcnlMaXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IENscldpemFyZFBhZ2UgfSBmcm9tICcuLi93aXphcmQtcGFnZSc7XG5cbi8qKlxuICogUGFnZUNvbGxlY3Rpb25TZXJ2aWNlIG1hbmFnZXMgdGhlIGNvbGxlY3Rpb24gb2YgcGFnZXMgYXNzaWduZWQgdG8gdGhlIHdpemFyZCBhbmQgb2ZmZXJzXG4gKiBhIG51bWJlciBvZiBmdW5jdGlvbnMgdXNlZnVsIGFjcm9zcyB0aGUgd2l6YXJkcyBwcm92aWRlcnMgYW5kIHN1YmNvbXBvbmVudHMgLS0gYWxsIHJlbGF0ZWRcbiAqIHRvIGVzc2VudGlhbGx5IGxvb2t1cHMgb24gdGhlIGNvbGxlY3Rpb24gb2YgcGFnZXMuXG4gKlxuICogVGhlIGVhc2llc3Qgd2F5IHRvIGFjY2VzcyBQYWdlQ29sbGVjdGlvblNlcnZpY2UgaXMgdmlhIHRoZSB3aXphcmQuIFRoZVxuICogZm9sbG93aW5nIGV4YW1wbGUgd291bGQgYWxsb3cgeW91IHRvIGFjY2VzcyB5b3VyIGluc3RhbmNlIG9mIHRoZSB3aXphcmQgZnJvbSB5b3VyIGhvc3RcbiAqIGNvbXBvbmVudCBhbmQgdGhlcmVieSBhY2Nlc3MgdGhlIHBhZ2UgY29sbGVjdGlvbiB2aWEgWW91ckhvc3RDb21wb25lbnQud2l6YXJkLnBhZ2VDb2xsZWN0aW9uLlxuICpcbiAqIEBleGFtcGxlXG4gKiA8Y2xyLXdpemFyZCAjd2l6YXJkIC4uLj5cbiAqXG4gKiBAZXhhbXBsZVxuICogZXhwb3J0IGNsYXNzIFlvdXJIb3N0Q29tcG9uZW50IHtcbiAqICAgQFZpZXdDaGlsZChcIndpemFyZFwiKSB3aXphcmQ6IFdpemFyZDtcbiAqICAgLi4uXG4gKiB9XG4gKlxuICogVGhlIGhlYXJ0IG9mIHRoZSBwYWdlIGNvbGxlY3Rpb24gaXMgdGhlIHF1ZXJ5IGxpc3Qgb2YgcGFnZXMsIHdoaWNoIGl0IGlzIGFzc2lnbmVkIGFzIGFcbiAqIHJlZmVyZW5jZSB0byB0aGUgV2l6YXJkLnBhZ2VzIFF1ZXJ5TGlzdCB3aGVuIHRoZSB3aXphcmQgaXMgY3JlYXRlZC5cbiAqXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBQYWdlQ29sbGVjdGlvblNlcnZpY2Uge1xuICAvKipcbiAgICogQSByZWZlcmVuY2UgdG8gdGhlIFdpemFyZC5wYWdlcyBRdWVyeUxpc3QuXG4gICAqXG4gICAqIFBvcHVsYXRlZCB3aGVuIHRoZSB3aXphcmQgaXMgY3JlYXRlZC5cbiAgICpcbiAgICogQG1lbWJlcm9mIFBhZ2VDb2xsZWN0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIHBhZ2VzOiBRdWVyeUxpc3Q8Q2xyV2l6YXJkUGFnZT47XG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIHRoZSBQYWdlQ29sbGVjdGlvblNlcnZpY2UucGFnZXMgUXVlcnlMaXN0IHRvIGFuIGFycmF5IGFuZCByZXR1cm5zIGl0LlxuICAgKlxuICAgKiBVc2VmdWwgZm9yIG1hbnkgaW5zdGFuY2VzIHdoZW4geW91IHdvdWxkIHByZWZlciBhIFF1ZXJ5TGlzdCB0byBhY3QgbGlrZSBhbiBhcnJheS5cbiAgICpcbiAgICogQG1lbWJlcm9mIFBhZ2VDb2xsZWN0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIGdldCBwYWdlc0FzQXJyYXkoKTogQ2xyV2l6YXJkUGFnZVtdIHtcbiAgICByZXR1cm4gdGhpcy5wYWdlcyA/IHRoaXMucGFnZXMudG9BcnJheSgpIDogW107XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgbGVuZ3RoIG9mIHRoZSBwYWdlcyBxdWVyeSBsaXN0LlxuICAgKlxuICAgKiBAbWVtYmVyb2YgUGFnZUNvbGxlY3Rpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgZ2V0IHBhZ2VzQ291bnQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5wYWdlcyA/IHRoaXMucGFnZXMubGVuZ3RoIDogMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBuZXh0LXRvLWxhc3QgcGFnZSBpbiB0aGUgcXVlcnkgbGlzdCBvZiBwYWdlcy4gT3BlcmF0ZXMgYXMgYSBnZXR0ZXJcbiAgICogc28gdGhhdCBpdCBpc24ndCB3b3JraW5nIHdpdGggc3RhbGUgZGF0YS5cbiAgICpcbiAgICogQG1lbWJlcm9mIFBhZ2VDb2xsZWN0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIGdldCBwZW51bHRpbWF0ZVBhZ2UoKTogQ2xyV2l6YXJkUGFnZSB7XG4gICAgY29uc3QgcGFnZUNvdW50ID0gdGhpcy5wYWdlc0NvdW50O1xuXG4gICAgaWYgKHBhZ2VDb3VudCA8IDIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5wYWdlc0FzQXJyYXlbcGFnZUNvdW50IC0gMl07XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgbGFzdCBwYWdlIGluIHRoZSBxdWVyeSBsaXN0IG9mIHBhZ2VzLiBPcGVyYXRlcyBhcyBhIGdldHRlclxuICAgKiBzbyB0aGF0IGl0IGlzbid0IHdvcmtpbmcgd2l0aCBzdGFsZSBkYXRhLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgUGFnZUNvbGxlY3Rpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgZ2V0IGxhc3RQYWdlKCk6IENscldpemFyZFBhZ2Uge1xuICAgIGNvbnN0IHBhZ2VDb3VudCA9IHRoaXMucGFnZXNDb3VudDtcblxuICAgIGlmIChwYWdlQ291bnQgPCAxKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucGFnZXNBc0FycmF5W3BhZ2VDb3VudCAtIDFdO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGZpcnN0IHBhZ2UgaW4gdGhlIHF1ZXJ5IGxpc3Qgb2YgcGFnZXMuIE9wZXJhdGVzIGFzIGEgZ2V0dGVyXG4gICAqIHNvIHRoYXQgaXQgaXNuJ3Qgd29ya2luZyB3aXRoIHN0YWxlIGRhdGEuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQYWdlQ29sbGVjdGlvblNlcnZpY2VcbiAgICovXG4gIHB1YmxpYyBnZXQgZmlyc3RQYWdlKCk6IENscldpemFyZFBhZ2Uge1xuICAgIGlmICghdGhpcy5wYWdlc0NvdW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucGFnZXNBc0FycmF5WzBdO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZWQgbW9zdGx5IGludGVybmFsbHksIGJ1dCBhY2NlcHRzIGEgc3RyaW5nIElEIGFuZCByZXR1cm5zIGEgQ2xyV2l6YXJkUGFnZVxuICAgKiBvYmplY3QgdGhhdCBtYXRjaGVzIHRoZSBJRCBwYXNzZWQuIE5vdGUgdGhhdCBJRHMgaGVyZSBzaG91bGQgaW5jbHVkZSB0aGUgcHJlZml4XG4gICAqIFwiY2xyLXdpemFyZC1wYWdlLVwiLlxuICAgKlxuICAgKiBSZXR1cm5zIHRoZSBuZXh0LXRvLWxhc3QgcGFnZSBpbiB0aGUgcXVlcnkgbGlzdCBvZiBwYWdlcy4gT3BlcmF0ZXMgYXMgYSBnZXR0ZXJcbiAgICogc28gdGhhdCBpdCBpc24ndCB3b3JraW5nIHdpdGggc3RhbGUgZGF0YS5cbiAgICpcbiAgICogQG1lbWJlcm9mIFBhZ2VDb2xsZWN0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIGdldFBhZ2VCeUlkKGlkOiBzdHJpbmcpOiBDbHJXaXphcmRQYWdlIHtcbiAgICBjb25zdCBmb3VuZFBhZ2VzOiBDbHJXaXphcmRQYWdlW10gPSB0aGlzLnBhZ2VzLmZpbHRlcigocGFnZTogQ2xyV2l6YXJkUGFnZSkgPT4gaWQgPT09IHBhZ2UuaWQpO1xuICAgIHJldHVybiB0aGlzLmNoZWNrUmVzdWx0cyhmb3VuZFBhZ2VzLCBpZCk7XG4gIH1cblxuICAvKipcbiAgICogQWNjZXB0cyBzIG51bWJlciBhcyBhIHBhcmFtZXRlciBhbmQgdHJlYXRzIHRoYXQgbnVtYmVyIGFzIHRoZSBpbmRleCBvZiB0aGUgcGFnZVxuICAgKiB5b3UncmUgbG9va2luZyBmb3IgaW4gdGhlIGNvbGxlY3Rpb24gb2YgcGFnZXMuIFJldHVybnMgYSAgd2l6YXJkIHBhZ2Ugb2JqZWN0LlxuICAgKlxuICAgKiBAbWVtYmVyb2YgUGFnZUNvbGxlY3Rpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgZ2V0UGFnZUJ5SW5kZXgoaW5kZXg6IG51bWJlcik6IENscldpemFyZFBhZ2Uge1xuICAgIGNvbnN0IHBhZ2VDb3VudCA9IHRoaXMucGFnZXNDb3VudDtcbiAgICBjb25zdCBwYWdlc0xhc3RJbmRleDogbnVtYmVyID0gcGFnZUNvdW50ID4gMSA/IHBhZ2VDb3VudCAtIDEgOiAwO1xuXG4gICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgcmV0cmlldmUgcGFnZSB3aXRoIGluZGV4IG9mICcgKyBpbmRleCk7XG4gICAgfVxuXG4gICAgaWYgKGluZGV4ID4gcGFnZXNMYXN0SW5kZXgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUGFnZSBpbmRleCBpcyBncmVhdGVyIHRoYW4gbGVuZ3RoIG9mIHBhZ2VzIGFycmF5LicpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnBhZ2VzQXNBcnJheVtpbmRleF07XG4gIH1cblxuICAvKipcbiAgICogVGFrZXMgYSB3aXphcmQgcGFnZSBvYmplY3QgYXMgYSBwYXJhbWV0ZXIgYW5kIHJldHVybnMgaXRzIGluZGV4IGluIHRoZVxuICAgKiBjb2xsZWN0aW9uIG9mIHBhZ2VzLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgUGFnZUNvbGxlY3Rpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgZ2V0UGFnZUluZGV4KHBhZ2U6IENscldpemFyZFBhZ2UpOiBudW1iZXIge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5wYWdlc0FzQXJyYXkuaW5kZXhPZihwYWdlKTtcblxuICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUmVxdWVzdGVkIHBhZ2UgY2Fubm90IGJlIGZvdW5kIGluIGNvbGxlY3Rpb24gb2YgcGFnZXMuJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGluZGV4O1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnNvbGlkYXRlcyBndWFyZCBsb2dpYyB0aGF0IHByZXZlbnRzIGEgY291cGxlIG9mIHVuZm9ydHVuYXRlIGVkZ2UgY2FzZXMgd2l0aFxuICAgKiBsb29rIHVwcyBvbiB0aGUgY29sbGVjdGlvbiBvZiBwYWdlcy5cbiAgICpcbiAgICogQG1lbWJlcm9mIFBhZ2VDb2xsZWN0aW9uU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBjaGVja1Jlc3VsdHMocmVzdWx0czogQ2xyV2l6YXJkUGFnZVtdLCByZXF1ZXN0ZWRQYWdlSWQ6IHN0cmluZykge1xuICAgIGNvbnN0IGZvdW5kUGFnZXNDb3VudDogbnVtYmVyID0gcmVzdWx0cy5sZW5ndGggfHwgMDtcblxuICAgIGlmIChmb3VuZFBhZ2VzQ291bnQgPiAxKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01vcmUgdGhhbiBvbmUgcGFnZSBoYXMgdGhlIHJlcXVlc3RlZCBpZCAnICsgcmVxdWVzdGVkUGFnZUlkICsgJy4nKTtcbiAgICB9IGVsc2UgaWYgKGZvdW5kUGFnZXNDb3VudCA8IDEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm8gcGFnZSBjYW4gYmUgZm91bmQgd2l0aCB0aGUgaWQgJyArIHJlcXVlc3RlZFBhZ2VJZCArICcuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiByZXN1bHRzWzBdO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBY2NlcHRzIHR3byBudW1lcmljIGluZGV4ZXMgYW5kIHJldHVybnMgYW4gYXJyYXkgb2Ygd2l6YXJkIHBhZ2Ugb2JqZWN0cyB0aGF0IGluY2x1ZGVcbiAgICogYWxsIHdpemFyZCBwYWdlcyBpbiB0aGUgcGFnZSBjb2xsZWN0aW9uIGZyb20gdGhlIGZpcnN0IGluZGV4IHRvIHRoZSBzZWNvbmQuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQYWdlQ29sbGVjdGlvblNlcnZpY2VcbiAgICovXG4gIHB1YmxpYyBwYWdlUmFuZ2Uoc3RhcnQ6IG51bWJlciwgZW5kOiBudW1iZXIpOiBDbHJXaXphcmRQYWdlW10ge1xuICAgIGxldCBwYWdlczogQ2xyV2l6YXJkUGFnZVtdID0gW107XG5cbiAgICBpZiAoc3RhcnQgPCAwIHx8IGVuZCA8IDApIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICBpZiAoc3RhcnQgPT09IG51bGwgfHwgdHlwZW9mIHN0YXJ0ID09PSB1bmRlZmluZWQgfHwgaXNOYU4oc3RhcnQpKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgaWYgKGVuZCA9PT0gbnVsbCB8fCB0eXBlb2YgZW5kID09PSB1bmRlZmluZWQgfHwgaXNOYU4oZW5kKSkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIGlmIChlbmQgPiB0aGlzLnBhZ2VzQ291bnQpIHtcbiAgICAgIGVuZCA9IHRoaXMucGFnZXNDb3VudDtcbiAgICB9XG5cbiAgICBwYWdlcyA9IHRoaXMucGFnZXNBc0FycmF5O1xuXG4gICAgaWYgKGVuZCAtIHN0YXJ0ID09PSAwKSB7XG4gICAgICAvLyBqdXN0IHJldHVybiB0aGUgb25lIHBhZ2UgdGhleSB3YW50XG4gICAgICByZXR1cm4gW3RoaXMuZ2V0UGFnZUJ5SW5kZXgoc3RhcnQpXTtcbiAgICB9XG5cbiAgICAvLyBzbGljZSBlbmQgZG9lcyBub3QgaW5jbHVkZSBpdGVtIHJlZmVyZW5jZWQgYnkgZW5kIGluZGV4LCB3aGljaCBpcyB3ZWlyZCBmb3IgdXNlcnNcbiAgICAvLyBpbmNyZW1lbnRpbmcgZW5kIGluZGV4IGhlcmUgdG8gY29ycmVjdCB0aGF0IHNvIHVzZXJzIGFuZCBvdGhlciBtZXRob2RzXG4gICAgLy8gZG9uJ3QgaGF2ZSB0byB0aGluayBhYm91dCBpdFxuICAgIGVuZCA9IGVuZCArIDE7XG5cbiAgICAvLyBzbGljZSBkb2VzIG5vdCByZXR1cm4gdGhlIGxhc3Qgb25lIGluIHRoZSByYW5nZSBidXQgaXQgZG9lcyBpbmNsdWRlIHRoZSBmaXJzdCBvbmVcbiAgICAvLyBkb2VzIG5vdCBtb2RpZnkgb3JpZ2luYWwgYXJyYXlcbiAgICByZXR1cm4gcGFnZXMuc2xpY2Uoc3RhcnQsIGVuZCk7XG4gIH1cblxuICAvKipcbiAgICogQWNjZXB0cyB0d28gd2l6YXJkIHBhZ2Ugb2JqZWN0cyBhbmQgcmV0dXJucyB0aG9zZSBwYWdlIG9iamVjdHMgd2l0aCBhbGwgb3RoZXIgcGFnZVxuICAgKiBvYmplY3RzIGJldHdlZW4gdGhlbSBpbiB0aGUgcGFnZSBjb2xsZWN0aW9uLiBJdCBkb2Vzbid0IGNhcmUgd2hpY2ggcGFnZSBpcyBhaGVhZCBvZiB0aGVcbiAgICogb3RoZXIgaW4gdGhlIHBhcmFtZXRlcnMuIEl0IHdpbGwgYmUgc21hcnQgZW5vdWdoIHRvIGZpZ3VyZSB0aGF0IG91dCAgb24gaXRzIG93bi5cbiAgICpcbiAgICogQG1lbWJlcm9mIFBhZ2VDb2xsZWN0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIGdldFBhZ2VSYW5nZUZyb21QYWdlcyhwYWdlOiBDbHJXaXphcmRQYWdlLCBvdGhlclBhZ2U6IENscldpemFyZFBhZ2UpOiBDbHJXaXphcmRQYWdlW10ge1xuICAgIGNvbnN0IHBhZ2VJbmRleCA9IHRoaXMuZ2V0UGFnZUluZGV4KHBhZ2UpO1xuICAgIGNvbnN0IG90aGVyUGFnZUluZGV4ID0gdGhpcy5nZXRQYWdlSW5kZXgob3RoZXJQYWdlKTtcbiAgICBsZXQgc3RhcnRJbmRleDogbnVtYmVyO1xuICAgIGxldCBlbmRJbmRleDogbnVtYmVyO1xuXG4gICAgaWYgKHBhZ2VJbmRleCA8PSBvdGhlclBhZ2VJbmRleCkge1xuICAgICAgc3RhcnRJbmRleCA9IHBhZ2VJbmRleDtcbiAgICAgIGVuZEluZGV4ID0gb3RoZXJQYWdlSW5kZXg7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXJ0SW5kZXggPSBvdGhlclBhZ2VJbmRleDtcbiAgICAgIGVuZEluZGV4ID0gcGFnZUluZGV4O1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5wYWdlUmFuZ2Uoc3RhcnRJbmRleCwgZW5kSW5kZXgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRha2VzIGEgd2l6YXJkIHBhZ2Ugb2JqZWN0IGFzIGEgcGFyYW1ldGVyIGFuZCByZXR1cm5zIHRoZSB3aXphcmQgcGFnZSBvYmplY3Qgb2ZcbiAgICogdGhlIHBhZ2UgaW1tZWRpYXRlbHkgYmVmb3JlIGl0IGluIHRoZSBwYWdlIGNvbGxlY3Rpb24uIFJldHVybnMgbnVsbCBpZiB0aGVyZSBpc1xuICAgKiBubyBwYWdlIGJlZm9yZSB0aGUgcGFnZSBpdCBpcyBwYXNzZWQuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQYWdlQ29sbGVjdGlvblNlcnZpY2VcbiAgICovXG4gIHB1YmxpYyBnZXRQcmV2aW91c1BhZ2UocGFnZTogQ2xyV2l6YXJkUGFnZSkge1xuICAgIGNvbnN0IG15UGFnZUluZGV4ID0gdGhpcy5nZXRQYWdlSW5kZXgocGFnZSk7XG4gICAgY29uc3QgcHJldmlvdXNQYWdlSW5kZXggPSBteVBhZ2VJbmRleCAtIDE7XG4gICAgaWYgKHByZXZpb3VzUGFnZUluZGV4IDwgMCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmdldFBhZ2VCeUluZGV4KHByZXZpb3VzUGFnZUluZGV4KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBY2NlcHRzIGEgd2l6YXJkIHBhZ2Ugb2JqZWN0IGFzIGEgcGFyYW1ldGVyIGFuZCByZXR1cm5zIGEgQm9vbGVhbiB0aGF0IHNheXMgaWZcbiAgICogdGhlIHBhZ2UgeW91IHNlbnQgaXQgaXMgY29tcGxldGUuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQYWdlQ29sbGVjdGlvblNlcnZpY2VcbiAgICovXG4gIHB1YmxpYyBwcmV2aW91c1BhZ2VJc0NvbXBsZXRlZChwYWdlOiBDbHJXaXphcmRQYWdlKSB7XG4gICAgbGV0IHByZXZpb3VzUGFnZTogQ2xyV2l6YXJkUGFnZTtcblxuICAgIGlmICghcGFnZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHByZXZpb3VzUGFnZSA9IHRoaXMuZ2V0UHJldmlvdXNQYWdlKHBhZ2UpO1xuXG4gICAgaWYgKG51bGwgPT09IHByZXZpb3VzUGFnZSkge1xuICAgICAgLy8gcGFnZSBpcyB0aGUgZmlyc3QgcGFnZS4gbm8gcHJldmlvdXMgcGFnZS5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBwcmV2aW91c1BhZ2UuY29tcGxldGVkO1xuICB9XG5cbiAgLyoqXG4gICAqIFRha2VzIGEgd2l6YXJkIHBhZ2Ugb2JqZWN0IGFzIGEgcGFyYW1ldGVyIGFuZCByZXR1cm5zIHRoZSB3aXphcmQgcGFnZSBvYmplY3Qgb2ZcbiAgICogdGhlIHBhZ2UgaW1tZWRpYXRlbHkgYWZ0ZXIgaXQgaW4gdGhlIHBhZ2UgY29sbGVjdGlvbi4gUmV0dXJucyBudWxsIGlmIHRoZXJlIGlzXG4gICAqIG5vIHBhZ2UgYWZ0ZXIgdGhlIHBhZ2UgaXQgaXMgcGFzc2VkLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgUGFnZUNvbGxlY3Rpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgZ2V0TmV4dFBhZ2UocGFnZTogQ2xyV2l6YXJkUGFnZSkge1xuICAgIGNvbnN0IG15UGFnZUluZGV4ID0gdGhpcy5nZXRQYWdlSW5kZXgocGFnZSk7XG4gICAgY29uc3QgbmV4dFBhZ2VJbmRleCA9IG15UGFnZUluZGV4ICsgMTtcblxuICAgIGlmIChuZXh0UGFnZUluZGV4ID49IHRoaXMucGFnZXNBc0FycmF5Lmxlbmd0aCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmdldFBhZ2VCeUluZGV4KG5leHRQYWdlSW5kZXgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRha2VzIGEgd2l6YXJkIHBhZ2Ugb2JqZWN0IGFzIGEgcGFyYW1ldGVyIGFuZCBnZW5lcmF0ZXMgYSBzdGVwIGl0ZW0gaWQgZnJvbSB0aGVcbiAgICogcGFnZSBJRC4gUmV0dXJucyB0aGUgZ2VuZXJhdGVkIHN0ZXAgaXRlbSBJRCBhcyBhIHN0cmluZy5cbiAgICpcbiAgICogQG1lbWJlcm9mIFBhZ2VDb2xsZWN0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIGdldFN0ZXBJdGVtSWRGb3JQYWdlKHBhZ2U6IENscldpemFyZFBhZ2UpIHtcbiAgICBjb25zdCBwYWdlSWQgPSBwYWdlLmlkO1xuICAgIGNvbnN0IHBhZ2VJZFBhcnRzID0gcGFnZUlkLnNwbGl0KCctJykucmV2ZXJzZSgpO1xuXG4gICAgcGFnZUlkUGFydHNbMV0gPSAnc3RlcCc7XG4gICAgcmV0dXJuIHBhZ2VJZFBhcnRzLnJldmVyc2UoKS5qb2luKCctJyk7XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhbGx5IG9ubHkgdXNlZCBpbnRlcm5hbGx5IHRvIG1hcmsgdGhhdCBhIHNwZWNpZmljIHBhZ2UgaGFzIGJlZW4gXCJjb21taXR0ZWRcIi5cbiAgICogVGhpcyBpbnZvbHZlcyBtYXJraW5nIHRoZSBwYWdlIGNvbXBsZXRlIGFuZCBmaXJpbmcgdGhlIENscldpemFyZFBhZ2Uub25Db21taXRcbiAgICogKGNscldpemFyZFBhZ2VPbkNvbW1pdCkgb3V0cHV0LiBUYWtlcyB0aGUgd2l6YXJkIHBhZ2Ugb2JqZWN0IHRoYXQgeW91IGludGVuZCB0b1xuICAgKiBtYXJrIGNvbXBsZXRlZCBhcyBhIHBhcmFtZXRlci5cbiAgICpcbiAgICogQG1lbWJlcm9mIFBhZ2VDb2xsZWN0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIGNvbW1pdFBhZ2UocGFnZTogQ2xyV2l6YXJkUGFnZSkge1xuICAgIGNvbnN0IHBhZ2VIYXNPdmVycmlkZXMgPSBwYWdlLnN0b3BOZXh0IHx8IHBhZ2UucHJldmVudERlZmF1bHQ7XG4gICAgcGFnZS5jb21wbGV0ZWQgPSB0cnVlO1xuXG4gICAgaWYgKCFwYWdlSGFzT3ZlcnJpZGVzKSB7XG4gICAgICAvLyBwcmV2ZW50IGxvb3Agb2YgZXZlbnQgZW1pc3Npb247IGFsdGVybmF0ZSBmbG93cyB3b3JrIG9mZlxuICAgICAgLy8gb2YgZXZlbnQgZW1pdHRlcnMgdGhpcyBpcyBob3cgdGhleSBicmVhayB0aGF0IGN5Y2xlLlxuICAgICAgcGFnZS5vbkNvbW1pdC5lbWl0KHBhZ2UuaWQpO1xuICAgIH1cbiAgfVxuXG4gIC8vIHVzZWQgYnkgdGhlIG5hdlNlcnZpY2UgdG8gbmF2aWdhdGUgYmFjayB0byBmaXJzdCBwb3NzaWJsZSBzdGVwIGFmdGVyXG4gIC8vIHBhZ2VzIGFyZSByZXNldFxuXG4gIC8qKlxuICAgKlxuICAgKiBAbWVtYmVyb2YgUGFnZUNvbGxlY3Rpb25TZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9wYWdlc1Jlc2V0ID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcblxuICAvKipcbiAgICogQW4gb2JzZXJ2YWJsZSB0aGF0IHRoZSBuYXZpZ2F0aW9uIHNlcnZpY2UgbGlzdGVucyB0byBpbiBvcmRlciB0byBrbm93IHdoZW5cbiAgICogdGhlIHBhZ2UgY29sbGVjdGlvbiBjb21wbGV0ZWQgc3RhdGVzIGhhdmUgYmVlbiByZXNldCB0byBmYWxzZSBzbyB0aGF0IHdheSBpdFxuICAgKiBjYW4gYWxzbyByZXNldCB0aGUgbmF2aWdhdGlvbiB0byBtYWtlIHRoZSBmaXJzdCBwYWdlIGluIHRoZSBwYWdlIGNvbGxlY3Rpb25cbiAgICogY3VycmVudC9hY3RpdmUuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQYWdlQ29sbGVjdGlvblNlcnZpY2VcbiAgICovXG4gIHB1YmxpYyBnZXQgcGFnZXNSZXNldCgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5fcGFnZXNSZXNldC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIGFsbCBjb21wbGV0ZWQgc3RhdGVzIG9mIHRoZSBwYWdlcyBpbiB0aGUgcGFnZSBjb2xsZWN0aW9uIHRvIGZhbHNlIGFuZFxuICAgKiBub3RpZmllcyB0aGUgbmF2aWdhdGlvbiBzZXJ2aWNlIHRvIGxpa2V3aXNlIHJlc2V0IHRoZSBuYXZpZ2F0aW9uLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgUGFnZUNvbGxlY3Rpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgcmVzZXQoKSB7XG4gICAgdGhpcy5wYWdlc0FzQXJyYXkuZm9yRWFjaCgocGFnZTogQ2xyV2l6YXJkUGFnZSkgPT4ge1xuICAgICAgcGFnZS5jb21wbGV0ZWQgPSBmYWxzZTtcbiAgICB9KTtcbiAgICB0aGlzLl9wYWdlc1Jlc2V0Lm5leHQodHJ1ZSk7XG4gIH1cblxuICAvKipcbiAgICogUm9sbHMgdGhyb3VnaCBhbGwgdGhlIHBhZ2VzIGluIHRoZSBwYWdlIGNvbGxlY3Rpb24gdG8gbWFrZSBzdXJlIHRoZXJlIGFyZSBub1xuICAgKiBpbmNvbXBsZXRlIHBhZ2VzIHNhbmR3aWNoZWQgYmV0d2VlbiBjb21wbGV0ZWQgcGFnZXMgaW4gdGhlIHdvcmtmbG93LiBJZGVudGlmaWVzXG4gICAqIHRoZSBmaXJzdCBpbmNvbXBsZXRlIHBhZ2UgaW5kZXggYW5kIHNldHMgYWxsIHBhZ2VzIGJlaGluZCBpdCB0byBhIGNvbXBsZXRlZFxuICAgKiBzdGF0ZSBvZiBmYWxzZS5cbiAgICpcbiAgICogQG1lbWJlcm9mIFBhZ2VDb2xsZWN0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIHVwZGF0ZUNvbXBsZXRlZFN0YXRlcygpOiB2b2lkIHtcbiAgICBjb25zdCBmaXJzdEluY29tcGxldGVJbmRleCA9IHRoaXMuZmluZEZpcnN0SW5jb21wbGV0ZVBhZ2VJbmRleCgpO1xuXG4gICAgaWYgKGZpcnN0SW5jb21wbGV0ZUluZGV4ID09PSB0aGlzLnBhZ2VzQXNBcnJheS5sZW5ndGggLSAxKSB7XG4gICAgICAvLyBhbGwgY29tcGxldGUgbm8gbmVlZCB0byBkbyBhbnl0aGluZ1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMucGFnZXNBc0FycmF5LmZvckVhY2goKHBhZ2U6IENscldpemFyZFBhZ2UsIGluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgIGlmIChpbmRleCA+IGZpcnN0SW5jb21wbGV0ZUluZGV4KSB7XG4gICAgICAgIHBhZ2UuY29tcGxldGVkID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmVzIHRoZSBpbmRleCBvZiB0aGUgZmlyc3QgaW5jb21wbGV0ZSBwYWdlIGluIHRoZSBwYWdlIGNvbGxlY3Rpb24uXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQYWdlQ29sbGVjdGlvblNlcnZpY2VcbiAgICovXG4gIHB1YmxpYyBmaW5kRmlyc3RJbmNvbXBsZXRlUGFnZUluZGV4KCk6IG51bWJlciB7XG4gICAgbGV0IHJldHVybkluZGV4OiBudW1iZXIgPSBudWxsO1xuICAgIHRoaXMucGFnZXNBc0FycmF5LmZvckVhY2goKHBhZ2U6IENscldpemFyZFBhZ2UsIGluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgIGlmIChudWxsID09PSByZXR1cm5JbmRleCAmJiBmYWxzZSA9PT0gcGFnZS5jb21wbGV0ZWQpIHtcbiAgICAgICAgcmV0dXJuSW5kZXggPSBpbmRleDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIGZhbGx0aHJvdWdoLCBhbGwgY29tcGxldGVkLCByZXR1cm4gbGFzdCBwYWdlXG4gICAgaWYgKG51bGwgPT09IHJldHVybkluZGV4KSB7XG4gICAgICByZXR1cm5JbmRleCA9IHRoaXMucGFnZXNDb3VudCAtIDE7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJldHVybkluZGV4O1xuICB9XG5cbiAgcHVibGljIGZpbmRGaXJzdEluY29tcGxldGVQYWdlKCk6IENscldpemFyZFBhZ2Uge1xuICAgIGNvbnN0IG15SW5jb21wbGV0ZUluZGV4ID0gdGhpcy5maW5kRmlyc3RJbmNvbXBsZXRlUGFnZUluZGV4KCk7XG4gICAgcmV0dXJuIHRoaXMucGFnZXNBc0FycmF5W215SW5jb21wbGV0ZUluZGV4XTtcbiAgfVxufVxuIl19