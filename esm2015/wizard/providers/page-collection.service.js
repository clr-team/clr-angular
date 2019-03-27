/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        const foundPages = this.pages.filter((/**
         * @param {?} page
         * @return {?}
         */
        (page) => id === page.id));
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
     * @private
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
        if (start === null || typeof start === 'undefined' || isNaN(start)) {
            return [];
        }
        if (end === null || typeof end === 'undefined' || isNaN(end)) {
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
        this.pagesAsArray.forEach((/**
         * @param {?} page
         * @return {?}
         */
        (page) => {
            page.completed = false;
        }));
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
        this.pagesAsArray.forEach((/**
         * @param {?} page
         * @param {?} index
         * @return {?}
         */
        (page, index) => {
            if (index > firstIncompleteIndex) {
                page.completed = false;
            }
        }));
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
        this.pagesAsArray.forEach((/**
         * @param {?} page
         * @param {?} index
         * @return {?}
         */
        (page, index) => {
            if (null === returnIndex && false === page.completed) {
                returnIndex = index;
            }
        }));
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
     * @private
     */
    PageCollectionService.prototype._pagesReset;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1jb2xsZWN0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJ3aXphcmQvcHJvdmlkZXJzL3BhZ2UtY29sbGVjdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQU1BLE9BQU8sRUFBRSxVQUFVLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFFdEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEyQi9CLE1BQU0sT0FBTyxxQkFBcUI7SUFEbEM7Ozs7Ozs7UUFvVFUsZ0JBQVcsR0FBRyxJQUFJLE9BQU8sRUFBVyxDQUFDO0lBMkUvQyxDQUFDOzs7Ozs7Ozs7SUE3V0MsSUFBVyxZQUFZO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ2hELENBQUM7Ozs7Ozs7SUFPRCxJQUFXLFVBQVU7UUFDbkIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVDLENBQUM7Ozs7Ozs7O0lBUUQsSUFBVyxlQUFlOztjQUNsQixTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVU7UUFFakMsSUFBSSxTQUFTLEdBQUcsQ0FBQyxFQUFFO1lBQ2pCLE9BQU87U0FDUjtRQUVELE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDMUMsQ0FBQzs7Ozs7Ozs7SUFRRCxJQUFXLFFBQVE7O2NBQ1gsU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVO1FBRWpDLElBQUksU0FBUyxHQUFHLENBQUMsRUFBRTtZQUNqQixPQUFPO1NBQ1I7UUFFRCxPQUFPLElBQUksQ0FB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RUFBRTtZQUN4QixXQUFXLEdBQUcsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7U0FDbkM7UUFFRCxPQUFPLFdBQVcsQ0FBQztJQUNyQixDQUFDOzs7O0lBRU0sdUJBQXVCOztjQUN0QixpQkFBaUIsR0FBRyxJQUFJLENBQUMsNEJBQTRCLEVBQUU7UUFDN0QsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDOUMsQ0FBQzs7O1lBOVhGLFVBQVU7Ozs7Ozs7Ozs7O0lBU1Qsc0NBQXVDOzs7Ozs7O0lBMlN2Qyw0Q0FBNkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUsIFF1ZXJ5TGlzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBDbHJXaXphcmRQYWdlIH0gZnJvbSAnLi4vd2l6YXJkLXBhZ2UnO1xuXG4vKipcbiAqIFBhZ2VDb2xsZWN0aW9uU2VydmljZSBtYW5hZ2VzIHRoZSBjb2xsZWN0aW9uIG9mIHBhZ2VzIGFzc2lnbmVkIHRvIHRoZSB3aXphcmQgYW5kIG9mZmVyc1xuICogYSBudW1iZXIgb2YgZnVuY3Rpb25zIHVzZWZ1bCBhY3Jvc3MgdGhlIHdpemFyZHMgcHJvdmlkZXJzIGFuZCBzdWJjb21wb25lbnRzIC0tIGFsbCByZWxhdGVkXG4gKiB0byBlc3NlbnRpYWxseSBsb29rdXBzIG9uIHRoZSBjb2xsZWN0aW9uIG9mIHBhZ2VzLlxuICpcbiAqIFRoZSBlYXNpZXN0IHdheSB0byBhY2Nlc3MgUGFnZUNvbGxlY3Rpb25TZXJ2aWNlIGlzIHZpYSB0aGUgd2l6YXJkLiBUaGVcbiAqIGZvbGxvd2luZyBleGFtcGxlIHdvdWxkIGFsbG93IHlvdSB0byBhY2Nlc3MgeW91ciBpbnN0YW5jZSBvZiB0aGUgd2l6YXJkIGZyb20geW91ciBob3N0XG4gKiBjb21wb25lbnQgYW5kIHRoZXJlYnkgYWNjZXNzIHRoZSBwYWdlIGNvbGxlY3Rpb24gdmlhIFlvdXJIb3N0Q29tcG9uZW50LndpemFyZC5wYWdlQ29sbGVjdGlvbi5cbiAqXG4gKiBAZXhhbXBsZVxuICogPGNsci13aXphcmQgI3dpemFyZCAuLi4+XG4gKlxuICogQGV4YW1wbGVcbiAqIGV4cG9ydCBjbGFzcyBZb3VySG9zdENvbXBvbmVudCB7XG4gKiAgIEBWaWV3Q2hpbGQoXCJ3aXphcmRcIikgd2l6YXJkOiBXaXphcmQ7XG4gKiAgIC4uLlxuICogfVxuICpcbiAqIFRoZSBoZWFydCBvZiB0aGUgcGFnZSBjb2xsZWN0aW9uIGlzIHRoZSBxdWVyeSBsaXN0IG9mIHBhZ2VzLCB3aGljaCBpdCBpcyBhc3NpZ25lZCBhcyBhXG4gKiByZWZlcmVuY2UgdG8gdGhlIFdpemFyZC5wYWdlcyBRdWVyeUxpc3Qgd2hlbiB0aGUgd2l6YXJkIGlzIGNyZWF0ZWQuXG4gKlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUGFnZUNvbGxlY3Rpb25TZXJ2aWNlIHtcbiAgLyoqXG4gICAqIEEgcmVmZXJlbmNlIHRvIHRoZSBXaXphcmQucGFnZXMgUXVlcnlMaXN0LlxuICAgKlxuICAgKiBQb3B1bGF0ZWQgd2hlbiB0aGUgd2l6YXJkIGlzIGNyZWF0ZWQuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQYWdlQ29sbGVjdGlvblNlcnZpY2VcbiAgICovXG4gIHB1YmxpYyBwYWdlczogUXVlcnlMaXN0PENscldpemFyZFBhZ2U+O1xuXG4gIC8qKlxuICAgKiBDb252ZXJ0cyB0aGUgUGFnZUNvbGxlY3Rpb25TZXJ2aWNlLnBhZ2VzIFF1ZXJ5TGlzdCB0byBhbiBhcnJheSBhbmQgcmV0dXJucyBpdC5cbiAgICpcbiAgICogVXNlZnVsIGZvciBtYW55IGluc3RhbmNlcyB3aGVuIHlvdSB3b3VsZCBwcmVmZXIgYSBRdWVyeUxpc3QgdG8gYWN0IGxpa2UgYW4gYXJyYXkuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQYWdlQ29sbGVjdGlvblNlcnZpY2VcbiAgICovXG4gIHB1YmxpYyBnZXQgcGFnZXNBc0FycmF5KCk6IENscldpemFyZFBhZ2VbXSB7XG4gICAgcmV0dXJuIHRoaXMucGFnZXMgPyB0aGlzLnBhZ2VzLnRvQXJyYXkoKSA6IFtdO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGxlbmd0aCBvZiB0aGUgcGFnZXMgcXVlcnkgbGlzdC5cbiAgICpcbiAgICogQG1lbWJlcm9mIFBhZ2VDb2xsZWN0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIGdldCBwYWdlc0NvdW50KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMucGFnZXMgPyB0aGlzLnBhZ2VzLmxlbmd0aCA6IDA7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgbmV4dC10by1sYXN0IHBhZ2UgaW4gdGhlIHF1ZXJ5IGxpc3Qgb2YgcGFnZXMuIE9wZXJhdGVzIGFzIGEgZ2V0dGVyXG4gICAqIHNvIHRoYXQgaXQgaXNuJ3Qgd29ya2luZyB3aXRoIHN0YWxlIGRhdGEuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQYWdlQ29sbGVjdGlvblNlcnZpY2VcbiAgICovXG4gIHB1YmxpYyBnZXQgcGVudWx0aW1hdGVQYWdlKCk6IENscldpemFyZFBhZ2Uge1xuICAgIGNvbnN0IHBhZ2VDb3VudCA9IHRoaXMucGFnZXNDb3VudDtcblxuICAgIGlmIChwYWdlQ291bnQgPCAyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucGFnZXNBc0FycmF5W3BhZ2VDb3VudCAtIDJdO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGxhc3QgcGFnZSBpbiB0aGUgcXVlcnkgbGlzdCBvZiBwYWdlcy4gT3BlcmF0ZXMgYXMgYSBnZXR0ZXJcbiAgICogc28gdGhhdCBpdCBpc24ndCB3b3JraW5nIHdpdGggc3RhbGUgZGF0YS5cbiAgICpcbiAgICogQG1lbWJlcm9mIFBhZ2VDb2xsZWN0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIGdldCBsYXN0UGFnZSgpOiBDbHJXaXphcmRQYWdlIHtcbiAgICBjb25zdCBwYWdlQ291bnQgPSB0aGlzLnBhZ2VzQ291bnQ7XG5cbiAgICBpZiAocGFnZUNvdW50IDwgMSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnBhZ2VzQXNBcnJheVtwYWdlQ291bnQgLSAxXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBmaXJzdCBwYWdlIGluIHRoZSBxdWVyeSBsaXN0IG9mIHBhZ2VzLiBPcGVyYXRlcyBhcyBhIGdldHRlclxuICAgKiBzbyB0aGF0IGl0IGlzbid0IHdvcmtpbmcgd2l0aCBzdGFsZSBkYXRhLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgUGFnZUNvbGxlY3Rpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgZ2V0IGZpcnN0UGFnZSgpOiBDbHJXaXphcmRQYWdlIHtcbiAgICBpZiAoIXRoaXMucGFnZXNDb3VudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnBhZ2VzQXNBcnJheVswXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VkIG1vc3RseSBpbnRlcm5hbGx5LCBidXQgYWNjZXB0cyBhIHN0cmluZyBJRCBhbmQgcmV0dXJucyBhIENscldpemFyZFBhZ2VcbiAgICogb2JqZWN0IHRoYXQgbWF0Y2hlcyB0aGUgSUQgcGFzc2VkLiBOb3RlIHRoYXQgSURzIGhlcmUgc2hvdWxkIGluY2x1ZGUgdGhlIHByZWZpeFxuICAgKiBcImNsci13aXphcmQtcGFnZS1cIi5cbiAgICpcbiAgICogUmV0dXJucyB0aGUgbmV4dC10by1sYXN0IHBhZ2UgaW4gdGhlIHF1ZXJ5IGxpc3Qgb2YgcGFnZXMuIE9wZXJhdGVzIGFzIGEgZ2V0dGVyXG4gICAqIHNvIHRoYXQgaXQgaXNuJ3Qgd29ya2luZyB3aXRoIHN0YWxlIGRhdGEuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQYWdlQ29sbGVjdGlvblNlcnZpY2VcbiAgICovXG4gIHB1YmxpYyBnZXRQYWdlQnlJZChpZDogc3RyaW5nKTogQ2xyV2l6YXJkUGFnZSB7XG4gICAgY29uc3QgZm91bmRQYWdlczogQ2xyV2l6YXJkUGFnZVtdID0gdGhpcy5wYWdlcy5maWx0ZXIoKHBhZ2U6IENscldpemFyZFBhZ2UpID0+IGlkID09PSBwYWdlLmlkKTtcbiAgICByZXR1cm4gdGhpcy5jaGVja1Jlc3VsdHMoZm91bmRQYWdlcywgaWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFjY2VwdHMgcyBudW1iZXIgYXMgYSBwYXJhbWV0ZXIgYW5kIHRyZWF0cyB0aGF0IG51bWJlciBhcyB0aGUgaW5kZXggb2YgdGhlIHBhZ2VcbiAgICogeW91J3JlIGxvb2tpbmcgZm9yIGluIHRoZSBjb2xsZWN0aW9uIG9mIHBhZ2VzLiBSZXR1cm5zIGEgIHdpemFyZCBwYWdlIG9iamVjdC5cbiAgICpcbiAgICogQG1lbWJlcm9mIFBhZ2VDb2xsZWN0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIGdldFBhZ2VCeUluZGV4KGluZGV4OiBudW1iZXIpOiBDbHJXaXphcmRQYWdlIHtcbiAgICBjb25zdCBwYWdlQ291bnQgPSB0aGlzLnBhZ2VzQ291bnQ7XG4gICAgY29uc3QgcGFnZXNMYXN0SW5kZXg6IG51bWJlciA9IHBhZ2VDb3VudCA+IDEgPyBwYWdlQ291bnQgLSAxIDogMDtcblxuICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IHJldHJpZXZlIHBhZ2Ugd2l0aCBpbmRleCBvZiAnICsgaW5kZXgpO1xuICAgIH1cblxuICAgIGlmIChpbmRleCA+IHBhZ2VzTGFzdEluZGV4KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BhZ2UgaW5kZXggaXMgZ3JlYXRlciB0aGFuIGxlbmd0aCBvZiBwYWdlcyBhcnJheS4nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5wYWdlc0FzQXJyYXlbaW5kZXhdO1xuICB9XG5cbiAgLyoqXG4gICAqIFRha2VzIGEgd2l6YXJkIHBhZ2Ugb2JqZWN0IGFzIGEgcGFyYW1ldGVyIGFuZCByZXR1cm5zIGl0cyBpbmRleCBpbiB0aGVcbiAgICogY29sbGVjdGlvbiBvZiBwYWdlcy5cbiAgICpcbiAgICogQG1lbWJlcm9mIFBhZ2VDb2xsZWN0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIGdldFBhZ2VJbmRleChwYWdlOiBDbHJXaXphcmRQYWdlKTogbnVtYmVyIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMucGFnZXNBc0FycmF5LmluZGV4T2YocGFnZSk7XG5cbiAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlcXVlc3RlZCBwYWdlIGNhbm5vdCBiZSBmb3VuZCBpbiBjb2xsZWN0aW9uIG9mIHBhZ2VzLicpO1xuICAgIH1cblxuICAgIHJldHVybiBpbmRleDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb25zb2xpZGF0ZXMgZ3VhcmQgbG9naWMgdGhhdCBwcmV2ZW50cyBhIGNvdXBsZSBvZiB1bmZvcnR1bmF0ZSBlZGdlIGNhc2VzIHdpdGhcbiAgICogbG9vayB1cHMgb24gdGhlIGNvbGxlY3Rpb24gb2YgcGFnZXMuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQYWdlQ29sbGVjdGlvblNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgY2hlY2tSZXN1bHRzKHJlc3VsdHM6IENscldpemFyZFBhZ2VbXSwgcmVxdWVzdGVkUGFnZUlkOiBzdHJpbmcpIHtcbiAgICBjb25zdCBmb3VuZFBhZ2VzQ291bnQ6IG51bWJlciA9IHJlc3VsdHMubGVuZ3RoIHx8IDA7XG5cbiAgICBpZiAoZm91bmRQYWdlc0NvdW50ID4gMSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNb3JlIHRoYW4gb25lIHBhZ2UgaGFzIHRoZSByZXF1ZXN0ZWQgaWQgJyArIHJlcXVlc3RlZFBhZ2VJZCArICcuJyk7XG4gICAgfSBlbHNlIGlmIChmb3VuZFBhZ2VzQ291bnQgPCAxKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIHBhZ2UgY2FuIGJlIGZvdW5kIHdpdGggdGhlIGlkICcgKyByZXF1ZXN0ZWRQYWdlSWQgKyAnLicpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcmVzdWx0c1swXTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWNjZXB0cyB0d28gbnVtZXJpYyBpbmRleGVzIGFuZCByZXR1cm5zIGFuIGFycmF5IG9mIHdpemFyZCBwYWdlIG9iamVjdHMgdGhhdCBpbmNsdWRlXG4gICAqIGFsbCB3aXphcmQgcGFnZXMgaW4gdGhlIHBhZ2UgY29sbGVjdGlvbiBmcm9tIHRoZSBmaXJzdCBpbmRleCB0byB0aGUgc2Vjb25kLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgUGFnZUNvbGxlY3Rpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgcGFnZVJhbmdlKHN0YXJ0OiBudW1iZXIsIGVuZDogbnVtYmVyKTogQ2xyV2l6YXJkUGFnZVtdIHtcbiAgICBsZXQgcGFnZXM6IENscldpemFyZFBhZ2VbXSA9IFtdO1xuXG4gICAgaWYgKHN0YXJ0IDwgMCB8fCBlbmQgPCAwKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgaWYgKHN0YXJ0ID09PSBudWxsIHx8IHR5cGVvZiBzdGFydCA9PT0gJ3VuZGVmaW5lZCcgfHwgaXNOYU4oc3RhcnQpKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgaWYgKGVuZCA9PT0gbnVsbCB8fCB0eXBlb2YgZW5kID09PSAndW5kZWZpbmVkJyB8fCBpc05hTihlbmQpKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgaWYgKGVuZCA+IHRoaXMucGFnZXNDb3VudCkge1xuICAgICAgZW5kID0gdGhpcy5wYWdlc0NvdW50O1xuICAgIH1cblxuICAgIHBhZ2VzID0gdGhpcy5wYWdlc0FzQXJyYXk7XG5cbiAgICBpZiAoZW5kIC0gc3RhcnQgPT09IDApIHtcbiAgICAgIC8vIGp1c3QgcmV0dXJuIHRoZSBvbmUgcGFnZSB0aGV5IHdhbnRcbiAgICAgIHJldHVybiBbdGhpcy5nZXRQYWdlQnlJbmRleChzdGFydCldO1xuICAgIH1cblxuICAgIC8vIHNsaWNlIGVuZCBkb2VzIG5vdCBpbmNsdWRlIGl0ZW0gcmVmZXJlbmNlZCBieSBlbmQgaW5kZXgsIHdoaWNoIGlzIHdlaXJkIGZvciB1c2Vyc1xuICAgIC8vIGluY3JlbWVudGluZyBlbmQgaW5kZXggaGVyZSB0byBjb3JyZWN0IHRoYXQgc28gdXNlcnMgYW5kIG90aGVyIG1ldGhvZHNcbiAgICAvLyBkb24ndCBoYXZlIHRvIHRoaW5rIGFib3V0IGl0XG4gICAgZW5kID0gZW5kICsgMTtcblxuICAgIC8vIHNsaWNlIGRvZXMgbm90IHJldHVybiB0aGUgbGFzdCBvbmUgaW4gdGhlIHJhbmdlIGJ1dCBpdCBkb2VzIGluY2x1ZGUgdGhlIGZpcnN0IG9uZVxuICAgIC8vIGRvZXMgbm90IG1vZGlmeSBvcmlnaW5hbCBhcnJheVxuICAgIHJldHVybiBwYWdlcy5zbGljZShzdGFydCwgZW5kKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBY2NlcHRzIHR3byB3aXphcmQgcGFnZSBvYmplY3RzIGFuZCByZXR1cm5zIHRob3NlIHBhZ2Ugb2JqZWN0cyB3aXRoIGFsbCBvdGhlciBwYWdlXG4gICAqIG9iamVjdHMgYmV0d2VlbiB0aGVtIGluIHRoZSBwYWdlIGNvbGxlY3Rpb24uIEl0IGRvZXNuJ3QgY2FyZSB3aGljaCBwYWdlIGlzIGFoZWFkIG9mIHRoZVxuICAgKiBvdGhlciBpbiB0aGUgcGFyYW1ldGVycy4gSXQgd2lsbCBiZSBzbWFydCBlbm91Z2ggdG8gZmlndXJlIHRoYXQgb3V0ICBvbiBpdHMgb3duLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgUGFnZUNvbGxlY3Rpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgZ2V0UGFnZVJhbmdlRnJvbVBhZ2VzKHBhZ2U6IENscldpemFyZFBhZ2UsIG90aGVyUGFnZTogQ2xyV2l6YXJkUGFnZSk6IENscldpemFyZFBhZ2VbXSB7XG4gICAgY29uc3QgcGFnZUluZGV4ID0gdGhpcy5nZXRQYWdlSW5kZXgocGFnZSk7XG4gICAgY29uc3Qgb3RoZXJQYWdlSW5kZXggPSB0aGlzLmdldFBhZ2VJbmRleChvdGhlclBhZ2UpO1xuICAgIGxldCBzdGFydEluZGV4OiBudW1iZXI7XG4gICAgbGV0IGVuZEluZGV4OiBudW1iZXI7XG5cbiAgICBpZiAocGFnZUluZGV4IDw9IG90aGVyUGFnZUluZGV4KSB7XG4gICAgICBzdGFydEluZGV4ID0gcGFnZUluZGV4O1xuICAgICAgZW5kSW5kZXggPSBvdGhlclBhZ2VJbmRleDtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RhcnRJbmRleCA9IG90aGVyUGFnZUluZGV4O1xuICAgICAgZW5kSW5kZXggPSBwYWdlSW5kZXg7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnBhZ2VSYW5nZShzdGFydEluZGV4LCBlbmRJbmRleCk7XG4gIH1cblxuICAvKipcbiAgICogVGFrZXMgYSB3aXphcmQgcGFnZSBvYmplY3QgYXMgYSBwYXJhbWV0ZXIgYW5kIHJldHVybnMgdGhlIHdpemFyZCBwYWdlIG9iamVjdCBvZlxuICAgKiB0aGUgcGFnZSBpbW1lZGlhdGVseSBiZWZvcmUgaXQgaW4gdGhlIHBhZ2UgY29sbGVjdGlvbi4gUmV0dXJucyBudWxsIGlmIHRoZXJlIGlzXG4gICAqIG5vIHBhZ2UgYmVmb3JlIHRoZSBwYWdlIGl0IGlzIHBhc3NlZC5cbiAgICpcbiAgICogQG1lbWJlcm9mIFBhZ2VDb2xsZWN0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIGdldFByZXZpb3VzUGFnZShwYWdlOiBDbHJXaXphcmRQYWdlKSB7XG4gICAgY29uc3QgbXlQYWdlSW5kZXggPSB0aGlzLmdldFBhZ2VJbmRleChwYWdlKTtcbiAgICBjb25zdCBwcmV2aW91c1BhZ2VJbmRleCA9IG15UGFnZUluZGV4IC0gMTtcbiAgICBpZiAocHJldmlvdXNQYWdlSW5kZXggPCAwKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZ2V0UGFnZUJ5SW5kZXgocHJldmlvdXNQYWdlSW5kZXgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFjY2VwdHMgYSB3aXphcmQgcGFnZSBvYmplY3QgYXMgYSBwYXJhbWV0ZXIgYW5kIHJldHVybnMgYSBCb29sZWFuIHRoYXQgc2F5cyBpZlxuICAgKiB0aGUgcGFnZSB5b3Ugc2VudCBpdCBpcyBjb21wbGV0ZS5cbiAgICpcbiAgICogQG1lbWJlcm9mIFBhZ2VDb2xsZWN0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIHByZXZpb3VzUGFnZUlzQ29tcGxldGVkKHBhZ2U6IENscldpemFyZFBhZ2UpIHtcbiAgICBsZXQgcHJldmlvdXNQYWdlOiBDbHJXaXphcmRQYWdlO1xuXG4gICAgaWYgKCFwYWdlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcHJldmlvdXNQYWdlID0gdGhpcy5nZXRQcmV2aW91c1BhZ2UocGFnZSk7XG5cbiAgICBpZiAobnVsbCA9PT0gcHJldmlvdXNQYWdlKSB7XG4gICAgICAvLyBwYWdlIGlzIHRoZSBmaXJzdCBwYWdlLiBubyBwcmV2aW91cyBwYWdlLlxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHByZXZpb3VzUGFnZS5jb21wbGV0ZWQ7XG4gIH1cblxuICAvKipcbiAgICogVGFrZXMgYSB3aXphcmQgcGFnZSBvYmplY3QgYXMgYSBwYXJhbWV0ZXIgYW5kIHJldHVybnMgdGhlIHdpemFyZCBwYWdlIG9iamVjdCBvZlxuICAgKiB0aGUgcGFnZSBpbW1lZGlhdGVseSBhZnRlciBpdCBpbiB0aGUgcGFnZSBjb2xsZWN0aW9uLiBSZXR1cm5zIG51bGwgaWYgdGhlcmUgaXNcbiAgICogbm8gcGFnZSBhZnRlciB0aGUgcGFnZSBpdCBpcyBwYXNzZWQuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQYWdlQ29sbGVjdGlvblNlcnZpY2VcbiAgICovXG4gIHB1YmxpYyBnZXROZXh0UGFnZShwYWdlOiBDbHJXaXphcmRQYWdlKSB7XG4gICAgY29uc3QgbXlQYWdlSW5kZXggPSB0aGlzLmdldFBhZ2VJbmRleChwYWdlKTtcbiAgICBjb25zdCBuZXh0UGFnZUluZGV4ID0gbXlQYWdlSW5kZXggKyAxO1xuXG4gICAgaWYgKG5leHRQYWdlSW5kZXggPj0gdGhpcy5wYWdlc0FzQXJyYXkubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZ2V0UGFnZUJ5SW5kZXgobmV4dFBhZ2VJbmRleCk7XG4gIH1cblxuICAvKipcbiAgICogVGFrZXMgYSB3aXphcmQgcGFnZSBvYmplY3QgYXMgYSBwYXJhbWV0ZXIgYW5kIGdlbmVyYXRlcyBhIHN0ZXAgaXRlbSBpZCBmcm9tIHRoZVxuICAgKiBwYWdlIElELiBSZXR1cm5zIHRoZSBnZW5lcmF0ZWQgc3RlcCBpdGVtIElEIGFzIGEgc3RyaW5nLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgUGFnZUNvbGxlY3Rpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgZ2V0U3RlcEl0ZW1JZEZvclBhZ2UocGFnZTogQ2xyV2l6YXJkUGFnZSkge1xuICAgIGNvbnN0IHBhZ2VJZCA9IHBhZ2UuaWQ7XG4gICAgY29uc3QgcGFnZUlkUGFydHMgPSBwYWdlSWQuc3BsaXQoJy0nKS5yZXZlcnNlKCk7XG5cbiAgICBwYWdlSWRQYXJ0c1sxXSA9ICdzdGVwJztcbiAgICByZXR1cm4gcGFnZUlkUGFydHMucmV2ZXJzZSgpLmpvaW4oJy0nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmFsbHkgb25seSB1c2VkIGludGVybmFsbHkgdG8gbWFyayB0aGF0IGEgc3BlY2lmaWMgcGFnZSBoYXMgYmVlbiBcImNvbW1pdHRlZFwiLlxuICAgKiBUaGlzIGludm9sdmVzIG1hcmtpbmcgdGhlIHBhZ2UgY29tcGxldGUgYW5kIGZpcmluZyB0aGUgQ2xyV2l6YXJkUGFnZS5vbkNvbW1pdFxuICAgKiAoY2xyV2l6YXJkUGFnZU9uQ29tbWl0KSBvdXRwdXQuIFRha2VzIHRoZSB3aXphcmQgcGFnZSBvYmplY3QgdGhhdCB5b3UgaW50ZW5kIHRvXG4gICAqIG1hcmsgY29tcGxldGVkIGFzIGEgcGFyYW1ldGVyLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgUGFnZUNvbGxlY3Rpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgY29tbWl0UGFnZShwYWdlOiBDbHJXaXphcmRQYWdlKSB7XG4gICAgY29uc3QgcGFnZUhhc092ZXJyaWRlcyA9IHBhZ2Uuc3RvcE5leHQgfHwgcGFnZS5wcmV2ZW50RGVmYXVsdDtcbiAgICBwYWdlLmNvbXBsZXRlZCA9IHRydWU7XG5cbiAgICBpZiAoIXBhZ2VIYXNPdmVycmlkZXMpIHtcbiAgICAgIC8vIHByZXZlbnQgbG9vcCBvZiBldmVudCBlbWlzc2lvbjsgYWx0ZXJuYXRlIGZsb3dzIHdvcmsgb2ZmXG4gICAgICAvLyBvZiBldmVudCBlbWl0dGVycyB0aGlzIGlzIGhvdyB0aGV5IGJyZWFrIHRoYXQgY3ljbGUuXG4gICAgICBwYWdlLm9uQ29tbWl0LmVtaXQocGFnZS5pZCk7XG4gICAgfVxuICB9XG5cbiAgLy8gdXNlZCBieSB0aGUgbmF2U2VydmljZSB0byBuYXZpZ2F0ZSBiYWNrIHRvIGZpcnN0IHBvc3NpYmxlIHN0ZXAgYWZ0ZXJcbiAgLy8gcGFnZXMgYXJlIHJlc2V0XG5cbiAgLyoqXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQYWdlQ29sbGVjdGlvblNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX3BhZ2VzUmVzZXQgPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuXG4gIC8qKlxuICAgKiBBbiBvYnNlcnZhYmxlIHRoYXQgdGhlIG5hdmlnYXRpb24gc2VydmljZSBsaXN0ZW5zIHRvIGluIG9yZGVyIHRvIGtub3cgd2hlblxuICAgKiB0aGUgcGFnZSBjb2xsZWN0aW9uIGNvbXBsZXRlZCBzdGF0ZXMgaGF2ZSBiZWVuIHJlc2V0IHRvIGZhbHNlIHNvIHRoYXQgd2F5IGl0XG4gICAqIGNhbiBhbHNvIHJlc2V0IHRoZSBuYXZpZ2F0aW9uIHRvIG1ha2UgdGhlIGZpcnN0IHBhZ2UgaW4gdGhlIHBhZ2UgY29sbGVjdGlvblxuICAgKiBjdXJyZW50L2FjdGl2ZS5cbiAgICpcbiAgICogQG1lbWJlcm9mIFBhZ2VDb2xsZWN0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIGdldCBwYWdlc1Jlc2V0KCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLl9wYWdlc1Jlc2V0LmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgYWxsIGNvbXBsZXRlZCBzdGF0ZXMgb2YgdGhlIHBhZ2VzIGluIHRoZSBwYWdlIGNvbGxlY3Rpb24gdG8gZmFsc2UgYW5kXG4gICAqIG5vdGlmaWVzIHRoZSBuYXZpZ2F0aW9uIHNlcnZpY2UgdG8gbGlrZXdpc2UgcmVzZXQgdGhlIG5hdmlnYXRpb24uXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQYWdlQ29sbGVjdGlvblNlcnZpY2VcbiAgICovXG4gIHB1YmxpYyByZXNldCgpIHtcbiAgICB0aGlzLnBhZ2VzQXNBcnJheS5mb3JFYWNoKChwYWdlOiBDbHJXaXphcmRQYWdlKSA9PiB7XG4gICAgICBwYWdlLmNvbXBsZXRlZCA9IGZhbHNlO1xuICAgIH0pO1xuICAgIHRoaXMuX3BhZ2VzUmVzZXQubmV4dCh0cnVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSb2xscyB0aHJvdWdoIGFsbCB0aGUgcGFnZXMgaW4gdGhlIHBhZ2UgY29sbGVjdGlvbiB0byBtYWtlIHN1cmUgdGhlcmUgYXJlIG5vXG4gICAqIGluY29tcGxldGUgcGFnZXMgc2FuZHdpY2hlZCBiZXR3ZWVuIGNvbXBsZXRlZCBwYWdlcyBpbiB0aGUgd29ya2Zsb3cuIElkZW50aWZpZXNcbiAgICogdGhlIGZpcnN0IGluY29tcGxldGUgcGFnZSBpbmRleCBhbmQgc2V0cyBhbGwgcGFnZXMgYmVoaW5kIGl0IHRvIGEgY29tcGxldGVkXG4gICAqIHN0YXRlIG9mIGZhbHNlLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgUGFnZUNvbGxlY3Rpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlQ29tcGxldGVkU3RhdGVzKCk6IHZvaWQge1xuICAgIGNvbnN0IGZpcnN0SW5jb21wbGV0ZUluZGV4ID0gdGhpcy5maW5kRmlyc3RJbmNvbXBsZXRlUGFnZUluZGV4KCk7XG5cbiAgICBpZiAoZmlyc3RJbmNvbXBsZXRlSW5kZXggPT09IHRoaXMucGFnZXNBc0FycmF5Lmxlbmd0aCAtIDEpIHtcbiAgICAgIC8vIGFsbCBjb21wbGV0ZSBubyBuZWVkIHRvIGRvIGFueXRoaW5nXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5wYWdlc0FzQXJyYXkuZm9yRWFjaCgocGFnZTogQ2xyV2l6YXJkUGFnZSwgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgaWYgKGluZGV4ID4gZmlyc3RJbmNvbXBsZXRlSW5kZXgpIHtcbiAgICAgICAgcGFnZS5jb21wbGV0ZWQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgdGhlIGluZGV4IG9mIHRoZSBmaXJzdCBpbmNvbXBsZXRlIHBhZ2UgaW4gdGhlIHBhZ2UgY29sbGVjdGlvbi5cbiAgICpcbiAgICogQG1lbWJlcm9mIFBhZ2VDb2xsZWN0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIGZpbmRGaXJzdEluY29tcGxldGVQYWdlSW5kZXgoKTogbnVtYmVyIHtcbiAgICBsZXQgcmV0dXJuSW5kZXg6IG51bWJlciA9IG51bGw7XG4gICAgdGhpcy5wYWdlc0FzQXJyYXkuZm9yRWFjaCgocGFnZTogQ2xyV2l6YXJkUGFnZSwgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgaWYgKG51bGwgPT09IHJldHVybkluZGV4ICYmIGZhbHNlID09PSBwYWdlLmNvbXBsZXRlZCkge1xuICAgICAgICByZXR1cm5JbmRleCA9IGluZGV4O1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gZmFsbHRocm91Z2gsIGFsbCBjb21wbGV0ZWQsIHJldHVybiBsYXN0IHBhZ2VcbiAgICBpZiAobnVsbCA9PT0gcmV0dXJuSW5kZXgpIHtcbiAgICAgIHJldHVybkluZGV4ID0gdGhpcy5wYWdlc0NvdW50IC0gMTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmV0dXJuSW5kZXg7XG4gIH1cblxuICBwdWJsaWMgZmluZEZpcnN0SW5jb21wbGV0ZVBhZ2UoKTogQ2xyV2l6YXJkUGFnZSB7XG4gICAgY29uc3QgbXlJbmNvbXBsZXRlSW5kZXggPSB0aGlzLmZpbmRGaXJzdEluY29tcGxldGVQYWdlSW5kZXgoKTtcbiAgICByZXR1cm4gdGhpcy5wYWdlc0FzQXJyYXlbbXlJbmNvbXBsZXRlSW5kZXhdO1xuICB9XG59XG4iXX0=