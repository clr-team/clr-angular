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
var PageCollectionService = /** @class */ (function () {
    function PageCollectionService() {
        // used by the navService to navigate back to first possible step after
        // pages are reset
        /**
         *
         * \@memberof PageCollectionService
         */
        this._pagesReset = new Subject();
    }
    Object.defineProperty(PageCollectionService.prototype, "pagesAsArray", {
        /**
         * Converts the PageCollectionService.pages QueryList to an array and returns it.
         *
         * Useful for many instances when you would prefer a QueryList to act like an array.
         *
         * @memberof PageCollectionService
         */
        get: /**
         * Converts the PageCollectionService.pages QueryList to an array and returns it.
         *
         * Useful for many instances when you would prefer a QueryList to act like an array.
         *
         * \@memberof PageCollectionService
         * @return {?}
         */
        function () {
            return this.pages ? this.pages.toArray() : [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageCollectionService.prototype, "pagesCount", {
        /**
         * Returns the length of the pages query list.
         *
         * @memberof PageCollectionService
         */
        get: /**
         * Returns the length of the pages query list.
         *
         * \@memberof PageCollectionService
         * @return {?}
         */
        function () {
            return this.pages ? this.pages.length : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageCollectionService.prototype, "penultimatePage", {
        /**
         * Returns the next-to-last page in the query list of pages. Operates as a getter
         * so that it isn't working with stale data.
         *
         * @memberof PageCollectionService
         */
        get: /**
         * Returns the next-to-last page in the query list of pages. Operates as a getter
         * so that it isn't working with stale data.
         *
         * \@memberof PageCollectionService
         * @return {?}
         */
        function () {
            /** @type {?} */
            var pageCount = this.pagesCount;
            if (pageCount < 2) {
                return;
            }
            return this.pagesAsArray[pageCount - 2];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageCollectionService.prototype, "lastPage", {
        /**
         * Returns the last page in the query list of pages. Operates as a getter
         * so that it isn't working with stale data.
         *
         * @memberof PageCollectionService
         */
        get: /**
         * Returns the last page in the query list of pages. Operates as a getter
         * so that it isn't working with stale data.
         *
         * \@memberof PageCollectionService
         * @return {?}
         */
        function () {
            /** @type {?} */
            var pageCount = this.pagesCount;
            if (pageCount < 1) {
                return;
            }
            return this.pagesAsArray[pageCount - 1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageCollectionService.prototype, "firstPage", {
        /**
         * Returns the first page in the query list of pages. Operates as a getter
         * so that it isn't working with stale data.
         *
         * @memberof PageCollectionService
         */
        get: /**
         * Returns the first page in the query list of pages. Operates as a getter
         * so that it isn't working with stale data.
         *
         * \@memberof PageCollectionService
         * @return {?}
         */
        function () {
            if (!this.pagesCount) {
                return;
            }
            return this.pagesAsArray[0];
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Used mostly internally, but accepts a string ID and returns a ClrWizardPage
     * object that matches the ID passed. Note that IDs here should include the prefix
     * "clr-wizard-page-".
     *
     * Returns the next-to-last page in the query list of pages. Operates as a getter
     * so that it isn't working with stale data.
     *
     * @memberof PageCollectionService
     */
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
    PageCollectionService.prototype.getPageById = /**
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
    function (id) {
        /** @type {?} */
        var foundPages = this.pages.filter(function (page) { return id === page.id; });
        return this.checkResults(foundPages, id);
    };
    /**
     * Accepts s number as a parameter and treats that number as the index of the page
     * you're looking for in the collection of pages. Returns a  wizard page object.
     *
     * @memberof PageCollectionService
     */
    /**
     * Accepts s number as a parameter and treats that number as the index of the page
     * you're looking for in the collection of pages. Returns a  wizard page object.
     *
     * \@memberof PageCollectionService
     * @param {?} index
     * @return {?}
     */
    PageCollectionService.prototype.getPageByIndex = /**
     * Accepts s number as a parameter and treats that number as the index of the page
     * you're looking for in the collection of pages. Returns a  wizard page object.
     *
     * \@memberof PageCollectionService
     * @param {?} index
     * @return {?}
     */
    function (index) {
        /** @type {?} */
        var pageCount = this.pagesCount;
        /** @type {?} */
        var pagesLastIndex = pageCount > 1 ? pageCount - 1 : 0;
        if (index < 0) {
            throw new Error('Cannot retrieve page with index of ' + index);
        }
        if (index > pagesLastIndex) {
            throw new Error('Page index is greater than length of pages array.');
        }
        return this.pagesAsArray[index];
    };
    /**
     * Takes a wizard page object as a parameter and returns its index in the
     * collection of pages.
     *
     * @memberof PageCollectionService
     */
    /**
     * Takes a wizard page object as a parameter and returns its index in the
     * collection of pages.
     *
     * \@memberof PageCollectionService
     * @param {?} page
     * @return {?}
     */
    PageCollectionService.prototype.getPageIndex = /**
     * Takes a wizard page object as a parameter and returns its index in the
     * collection of pages.
     *
     * \@memberof PageCollectionService
     * @param {?} page
     * @return {?}
     */
    function (page) {
        /** @type {?} */
        var index = this.pagesAsArray.indexOf(page);
        if (index < 0) {
            throw new Error('Requested page cannot be found in collection of pages.');
        }
        return index;
    };
    /**
     * Consolidates guard logic that prevents a couple of unfortunate edge cases with
     * look ups on the collection of pages.
     *
     * @memberof PageCollectionService
     */
    /**
     * Consolidates guard logic that prevents a couple of unfortunate edge cases with
     * look ups on the collection of pages.
     *
     * \@memberof PageCollectionService
     * @param {?} results
     * @param {?} requestedPageId
     * @return {?}
     */
    PageCollectionService.prototype.checkResults = /**
     * Consolidates guard logic that prevents a couple of unfortunate edge cases with
     * look ups on the collection of pages.
     *
     * \@memberof PageCollectionService
     * @param {?} results
     * @param {?} requestedPageId
     * @return {?}
     */
    function (results, requestedPageId) {
        /** @type {?} */
        var foundPagesCount = results.length || 0;
        if (foundPagesCount > 1) {
            throw new Error('More than one page has the requested id ' + requestedPageId + '.');
        }
        else if (foundPagesCount < 1) {
            throw new Error('No page can be found with the id ' + requestedPageId + '.');
        }
        else {
            return results[0];
        }
    };
    /**
     * Accepts two numeric indexes and returns an array of wizard page objects that include
     * all wizard pages in the page collection from the first index to the second.
     *
     * @memberof PageCollectionService
     */
    /**
     * Accepts two numeric indexes and returns an array of wizard page objects that include
     * all wizard pages in the page collection from the first index to the second.
     *
     * \@memberof PageCollectionService
     * @param {?} start
     * @param {?} end
     * @return {?}
     */
    PageCollectionService.prototype.pageRange = /**
     * Accepts two numeric indexes and returns an array of wizard page objects that include
     * all wizard pages in the page collection from the first index to the second.
     *
     * \@memberof PageCollectionService
     * @param {?} start
     * @param {?} end
     * @return {?}
     */
    function (start, end) {
        /** @type {?} */
        var pages = [];
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
    };
    /**
     * Accepts two wizard page objects and returns those page objects with all other page
     * objects between them in the page collection. It doesn't care which page is ahead of the
     * other in the parameters. It will be smart enough to figure that out  on its own.
     *
     * @memberof PageCollectionService
     */
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
    PageCollectionService.prototype.getPageRangeFromPages = /**
     * Accepts two wizard page objects and returns those page objects with all other page
     * objects between them in the page collection. It doesn't care which page is ahead of the
     * other in the parameters. It will be smart enough to figure that out  on its own.
     *
     * \@memberof PageCollectionService
     * @param {?} page
     * @param {?} otherPage
     * @return {?}
     */
    function (page, otherPage) {
        /** @type {?} */
        var pageIndex = this.getPageIndex(page);
        /** @type {?} */
        var otherPageIndex = this.getPageIndex(otherPage);
        /** @type {?} */
        var startIndex;
        /** @type {?} */
        var endIndex;
        if (pageIndex <= otherPageIndex) {
            startIndex = pageIndex;
            endIndex = otherPageIndex;
        }
        else {
            startIndex = otherPageIndex;
            endIndex = pageIndex;
        }
        return this.pageRange(startIndex, endIndex);
    };
    /**
     * Takes a wizard page object as a parameter and returns the wizard page object of
     * the page immediately before it in the page collection. Returns null if there is
     * no page before the page it is passed.
     *
     * @memberof PageCollectionService
     */
    /**
     * Takes a wizard page object as a parameter and returns the wizard page object of
     * the page immediately before it in the page collection. Returns null if there is
     * no page before the page it is passed.
     *
     * \@memberof PageCollectionService
     * @param {?} page
     * @return {?}
     */
    PageCollectionService.prototype.getPreviousPage = /**
     * Takes a wizard page object as a parameter and returns the wizard page object of
     * the page immediately before it in the page collection. Returns null if there is
     * no page before the page it is passed.
     *
     * \@memberof PageCollectionService
     * @param {?} page
     * @return {?}
     */
    function (page) {
        /** @type {?} */
        var myPageIndex = this.getPageIndex(page);
        /** @type {?} */
        var previousPageIndex = myPageIndex - 1;
        if (previousPageIndex < 0) {
            return null;
        }
        return this.getPageByIndex(previousPageIndex);
    };
    /**
     * Accepts a wizard page object as a parameter and returns a Boolean that says if
     * the page you sent it is complete.
     *
     * @memberof PageCollectionService
     */
    /**
     * Accepts a wizard page object as a parameter and returns a Boolean that says if
     * the page you sent it is complete.
     *
     * \@memberof PageCollectionService
     * @param {?} page
     * @return {?}
     */
    PageCollectionService.prototype.previousPageIsCompleted = /**
     * Accepts a wizard page object as a parameter and returns a Boolean that says if
     * the page you sent it is complete.
     *
     * \@memberof PageCollectionService
     * @param {?} page
     * @return {?}
     */
    function (page) {
        /** @type {?} */
        var previousPage;
        if (!page) {
            return false;
        }
        previousPage = this.getPreviousPage(page);
        if (null === previousPage) {
            // page is the first page. no previous page.
            return true;
        }
        return previousPage.completed;
    };
    /**
     * Takes a wizard page object as a parameter and returns the wizard page object of
     * the page immediately after it in the page collection. Returns null if there is
     * no page after the page it is passed.
     *
     * @memberof PageCollectionService
     */
    /**
     * Takes a wizard page object as a parameter and returns the wizard page object of
     * the page immediately after it in the page collection. Returns null if there is
     * no page after the page it is passed.
     *
     * \@memberof PageCollectionService
     * @param {?} page
     * @return {?}
     */
    PageCollectionService.prototype.getNextPage = /**
     * Takes a wizard page object as a parameter and returns the wizard page object of
     * the page immediately after it in the page collection. Returns null if there is
     * no page after the page it is passed.
     *
     * \@memberof PageCollectionService
     * @param {?} page
     * @return {?}
     */
    function (page) {
        /** @type {?} */
        var myPageIndex = this.getPageIndex(page);
        /** @type {?} */
        var nextPageIndex = myPageIndex + 1;
        if (nextPageIndex >= this.pagesAsArray.length) {
            return null;
        }
        return this.getPageByIndex(nextPageIndex);
    };
    /**
     * Takes a wizard page object as a parameter and generates a step item id from the
     * page ID. Returns the generated step item ID as a string.
     *
     * @memberof PageCollectionService
     */
    /**
     * Takes a wizard page object as a parameter and generates a step item id from the
     * page ID. Returns the generated step item ID as a string.
     *
     * \@memberof PageCollectionService
     * @param {?} page
     * @return {?}
     */
    PageCollectionService.prototype.getStepItemIdForPage = /**
     * Takes a wizard page object as a parameter and generates a step item id from the
     * page ID. Returns the generated step item ID as a string.
     *
     * \@memberof PageCollectionService
     * @param {?} page
     * @return {?}
     */
    function (page) {
        /** @type {?} */
        var pageId = page.id;
        /** @type {?} */
        var pageIdParts = pageId.split('-').reverse();
        pageIdParts[1] = 'step';
        return pageIdParts.reverse().join('-');
    };
    /**
     * Generally only used internally to mark that a specific page has been "committed".
     * This involves marking the page complete and firing the ClrWizardPage.onCommit
     * (clrWizardPageOnCommit) output. Takes the wizard page object that you intend to
     * mark completed as a parameter.
     *
     * @memberof PageCollectionService
     */
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
    PageCollectionService.prototype.commitPage = /**
     * Generally only used internally to mark that a specific page has been "committed".
     * This involves marking the page complete and firing the ClrWizardPage.onCommit
     * (clrWizardPageOnCommit) output. Takes the wizard page object that you intend to
     * mark completed as a parameter.
     *
     * \@memberof PageCollectionService
     * @param {?} page
     * @return {?}
     */
    function (page) {
        /** @type {?} */
        var pageHasOverrides = page.stopNext || page.preventDefault;
        page.completed = true;
        if (!pageHasOverrides) {
            // prevent loop of event emission; alternate flows work off
            // of event emitters this is how they break that cycle.
            page.onCommit.emit(page.id);
        }
    };
    Object.defineProperty(PageCollectionService.prototype, "pagesReset", {
        /**
         * An observable that the navigation service listens to in order to know when
         * the page collection completed states have been reset to false so that way it
         * can also reset the navigation to make the first page in the page collection
         * current/active.
         *
         * @memberof PageCollectionService
         */
        get: /**
         * An observable that the navigation service listens to in order to know when
         * the page collection completed states have been reset to false so that way it
         * can also reset the navigation to make the first page in the page collection
         * current/active.
         *
         * \@memberof PageCollectionService
         * @return {?}
         */
        function () {
            return this._pagesReset.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Sets all completed states of the pages in the page collection to false and
     * notifies the navigation service to likewise reset the navigation.
     *
     * @memberof PageCollectionService
     */
    /**
     * Sets all completed states of the pages in the page collection to false and
     * notifies the navigation service to likewise reset the navigation.
     *
     * \@memberof PageCollectionService
     * @return {?}
     */
    PageCollectionService.prototype.reset = /**
     * Sets all completed states of the pages in the page collection to false and
     * notifies the navigation service to likewise reset the navigation.
     *
     * \@memberof PageCollectionService
     * @return {?}
     */
    function () {
        this.pagesAsArray.forEach(function (page) {
            page.completed = false;
        });
        this._pagesReset.next(true);
    };
    /**
     * Rolls through all the pages in the page collection to make sure there are no
     * incomplete pages sandwiched between completed pages in the workflow. Identifies
     * the first incomplete page index and sets all pages behind it to a completed
     * state of false.
     *
     * @memberof PageCollectionService
     */
    /**
     * Rolls through all the pages in the page collection to make sure there are no
     * incomplete pages sandwiched between completed pages in the workflow. Identifies
     * the first incomplete page index and sets all pages behind it to a completed
     * state of false.
     *
     * \@memberof PageCollectionService
     * @return {?}
     */
    PageCollectionService.prototype.updateCompletedStates = /**
     * Rolls through all the pages in the page collection to make sure there are no
     * incomplete pages sandwiched between completed pages in the workflow. Identifies
     * the first incomplete page index and sets all pages behind it to a completed
     * state of false.
     *
     * \@memberof PageCollectionService
     * @return {?}
     */
    function () {
        /** @type {?} */
        var firstIncompleteIndex = this.findFirstIncompletePageIndex();
        if (firstIncompleteIndex === this.pagesAsArray.length - 1) {
            // all complete no need to do anything
            return;
        }
        this.pagesAsArray.forEach(function (page, index) {
            if (index > firstIncompleteIndex) {
                page.completed = false;
            }
        });
    };
    /**
     * Retrieves the index of the first incomplete page in the page collection.
     *
     * @memberof PageCollectionService
     */
    /**
     * Retrieves the index of the first incomplete page in the page collection.
     *
     * \@memberof PageCollectionService
     * @return {?}
     */
    PageCollectionService.prototype.findFirstIncompletePageIndex = /**
     * Retrieves the index of the first incomplete page in the page collection.
     *
     * \@memberof PageCollectionService
     * @return {?}
     */
    function () {
        /** @type {?} */
        var returnIndex = null;
        this.pagesAsArray.forEach(function (page, index) {
            if (null === returnIndex && false === page.completed) {
                returnIndex = index;
            }
        });
        // fallthrough, all completed, return last page
        if (null === returnIndex) {
            returnIndex = this.pagesCount - 1;
        }
        return returnIndex;
    };
    /**
     * @return {?}
     */
    PageCollectionService.prototype.findFirstIncompletePage = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var myIncompleteIndex = this.findFirstIncompletePageIndex();
        return this.pagesAsArray[myIncompleteIndex];
    };
    PageCollectionService.decorators = [
        { type: Injectable }
    ];
    return PageCollectionService;
}());
export { PageCollectionService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1jb2xsZWN0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJ3aXphcmQvcHJvdmlkZXJzL3BhZ2UtY29sbGVjdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQU1BLE9BQU8sRUFBRSxVQUFVLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFFdEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEwQi9CO0lBQUE7Ozs7Ozs7UUFvVFUsZ0JBQVcsR0FBRyxJQUFJLE9BQU8sRUFBVyxDQUFDO0lBMkUvQyxDQUFDO0lBN1dDLHNCQUFXLCtDQUFZO1FBUHZCOzs7Ozs7V0FNRzs7Ozs7Ozs7O1FBQ0g7WUFDRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNoRCxDQUFDOzs7T0FBQTtJQU9ELHNCQUFXLDZDQUFVO1FBTHJCOzs7O1dBSUc7Ozs7Ozs7UUFDSDtZQUNFLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1QyxDQUFDOzs7T0FBQTtJQVFELHNCQUFXLGtEQUFlO1FBTjFCOzs7OztXQUtHOzs7Ozs7OztRQUNIOztnQkFDUSxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVU7WUFFakMsSUFBSSxTQUFTLEdBQUcsQ0FBQyxFQUFFO2dCQUNqQixPQUFPO2FBQ1I7WUFFRCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzFDLENBQUM7OztPQUFBO0lBUUQsc0JBQVcsMkNBQVE7UUFObkI7Ozs7O1dBS0c7Ozs7Ozs7O1FBQ0g7O2dCQUNR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bmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUsIFF1ZXJ5TGlzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBDbHJXaXphcmRQYWdlIH0gZnJvbSAnLi4vd2l6YXJkLXBhZ2UnO1xuXG4vKipcbiAqIFBhZ2VDb2xsZWN0aW9uU2VydmljZSBtYW5hZ2VzIHRoZSBjb2xsZWN0aW9uIG9mIHBhZ2VzIGFzc2lnbmVkIHRvIHRoZSB3aXphcmQgYW5kIG9mZmVyc1xuICogYSBudW1iZXIgb2YgZnVuY3Rpb25zIHVzZWZ1bCBhY3Jvc3MgdGhlIHdpemFyZHMgcHJvdmlkZXJzIGFuZCBzdWJjb21wb25lbnRzIC0tIGFsbCByZWxhdGVkXG4gKiB0byBlc3NlbnRpYWxseSBsb29rdXBzIG9uIHRoZSBjb2xsZWN0aW9uIG9mIHBhZ2VzLlxuICpcbiAqIFRoZSBlYXNpZXN0IHdheSB0byBhY2Nlc3MgUGFnZUNvbGxlY3Rpb25TZXJ2aWNlIGlzIHZpYSB0aGUgd2l6YXJkLiBUaGVcbiAqIGZvbGxvd2luZyBleGFtcGxlIHdvdWxkIGFsbG93IHlvdSB0byBhY2Nlc3MgeW91ciBpbnN0YW5jZSBvZiB0aGUgd2l6YXJkIGZyb20geW91ciBob3N0XG4gKiBjb21wb25lbnQgYW5kIHRoZXJlYnkgYWNjZXNzIHRoZSBwYWdlIGNvbGxlY3Rpb24gdmlhIFlvdXJIb3N0Q29tcG9uZW50LndpemFyZC5wYWdlQ29sbGVjdGlvbi5cbiAqXG4gKiBAZXhhbXBsZVxuICogPGNsci13aXphcmQgI3dpemFyZCAuLi4+XG4gKlxuICogQGV4YW1wbGVcbiAqIGV4cG9ydCBjbGFzcyBZb3VySG9zdENvbXBvbmVudCB7XG4gKiAgIEBWaWV3Q2hpbGQoXCJ3aXphcmRcIikgd2l6YXJkOiBXaXphcmQ7XG4gKiAgIC4uLlxuICogfVxuICpcbiAqIFRoZSBoZWFydCBvZiB0aGUgcGFnZSBjb2xsZWN0aW9uIGlzIHRoZSBxdWVyeSBsaXN0IG9mIHBhZ2VzLCB3aGljaCBpdCBpcyBhc3NpZ25lZCBhcyBhXG4gKiByZWZlcmVuY2UgdG8gdGhlIFdpemFyZC5wYWdlcyBRdWVyeUxpc3Qgd2hlbiB0aGUgd2l6YXJkIGlzIGNyZWF0ZWQuXG4gKlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUGFnZUNvbGxlY3Rpb25TZXJ2aWNlIHtcbiAgLyoqXG4gICAqIEEgcmVmZXJlbmNlIHRvIHRoZSBXaXphcmQucGFnZXMgUXVlcnlMaXN0LlxuICAgKlxuICAgKiBQb3B1bGF0ZWQgd2hlbiB0aGUgd2l6YXJkIGlzIGNyZWF0ZWQuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQYWdlQ29sbGVjdGlvblNlcnZpY2VcbiAgICovXG4gIHB1YmxpYyBwYWdlczogUXVlcnlMaXN0PENscldpemFyZFBhZ2U+O1xuXG4gIC8qKlxuICAgKiBDb252ZXJ0cyB0aGUgUGFnZUNvbGxlY3Rpb25TZXJ2aWNlLnBhZ2VzIFF1ZXJ5TGlzdCB0byBhbiBhcnJheSBhbmQgcmV0dXJucyBpdC5cbiAgICpcbiAgICogVXNlZnVsIGZvciBtYW55IGluc3RhbmNlcyB3aGVuIHlvdSB3b3VsZCBwcmVmZXIgYSBRdWVyeUxpc3QgdG8gYWN0IGxpa2UgYW4gYXJyYXkuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQYWdlQ29sbGVjdGlvblNlcnZpY2VcbiAgICovXG4gIHB1YmxpYyBnZXQgcGFnZXNBc0FycmF5KCk6IENscldpemFyZFBhZ2VbXSB7XG4gICAgcmV0dXJuIHRoaXMucGFnZXMgPyB0aGlzLnBhZ2VzLnRvQXJyYXkoKSA6IFtdO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGxlbmd0aCBvZiB0aGUgcGFnZXMgcXVlcnkgbGlzdC5cbiAgICpcbiAgICogQG1lbWJlcm9mIFBhZ2VDb2xsZWN0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIGdldCBwYWdlc0NvdW50KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMucGFnZXMgPyB0aGlzLnBhZ2VzLmxlbmd0aCA6IDA7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgbmV4dC10by1sYXN0IHBhZ2UgaW4gdGhlIHF1ZXJ5IGxpc3Qgb2YgcGFnZXMuIE9wZXJhdGVzIGFzIGEgZ2V0dGVyXG4gICAqIHNvIHRoYXQgaXQgaXNuJ3Qgd29ya2luZyB3aXRoIHN0YWxlIGRhdGEuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQYWdlQ29sbGVjdGlvblNlcnZpY2VcbiAgICovXG4gIHB1YmxpYyBnZXQgcGVudWx0aW1hdGVQYWdlKCk6IENscldpemFyZFBhZ2Uge1xuICAgIGNvbnN0IHBhZ2VDb3VudCA9IHRoaXMucGFnZXNDb3VudDtcblxuICAgIGlmIChwYWdlQ291bnQgPCAyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucGFnZXNBc0FycmF5W3BhZ2VDb3VudCAtIDJdO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGxhc3QgcGFnZSBpbiB0aGUgcXVlcnkgbGlzdCBvZiBwYWdlcy4gT3BlcmF0ZXMgYXMgYSBnZXR0ZXJcbiAgICogc28gdGhhdCBpdCBpc24ndCB3b3JraW5nIHdpdGggc3RhbGUgZGF0YS5cbiAgICpcbiAgICogQG1lbWJlcm9mIFBhZ2VDb2xsZWN0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIGdldCBsYXN0UGFnZSgpOiBDbHJXaXphcmRQYWdlIHtcbiAgICBjb25zdCBwYWdlQ291bnQgPSB0aGlzLnBhZ2VzQ291bnQ7XG5cbiAgICBpZiAocGFnZUNvdW50IDwgMSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnBhZ2VzQXNBcnJheVtwYWdlQ291bnQgLSAxXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBmaXJzdCBwYWdlIGluIHRoZSBxdWVyeSBsaXN0IG9mIHBhZ2VzLiBPcGVyYXRlcyBhcyBhIGdldHRlclxuICAgKiBzbyB0aGF0IGl0IGlzbid0IHdvcmtpbmcgd2l0aCBzdGFsZSBkYXRhLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgUGFnZUNvbGxlY3Rpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgZ2V0IGZpcnN0UGFnZSgpOiBDbHJXaXphcmRQYWdlIHtcbiAgICBpZiAoIXRoaXMucGFnZXNDb3VudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnBhZ2VzQXNBcnJheVswXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VkIG1vc3RseSBpbnRlcm5hbGx5LCBidXQgYWNjZXB0cyBhIHN0cmluZyBJRCBhbmQgcmV0dXJucyBhIENscldpemFyZFBhZ2VcbiAgICogb2JqZWN0IHRoYXQgbWF0Y2hlcyB0aGUgSUQgcGFzc2VkLiBOb3RlIHRoYXQgSURzIGhlcmUgc2hvdWxkIGluY2x1ZGUgdGhlIHByZWZpeFxuICAgKiBcImNsci13aXphcmQtcGFnZS1cIi5cbiAgICpcbiAgICogUmV0dXJucyB0aGUgbmV4dC10by1sYXN0IHBhZ2UgaW4gdGhlIHF1ZXJ5IGxpc3Qgb2YgcGFnZXMuIE9wZXJhdGVzIGFzIGEgZ2V0dGVyXG4gICAqIHNvIHRoYXQgaXQgaXNuJ3Qgd29ya2luZyB3aXRoIHN0YWxlIGRhdGEuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQYWdlQ29sbGVjdGlvblNlcnZpY2VcbiAgICovXG4gIHB1YmxpYyBnZXRQYWdlQnlJZChpZDogc3RyaW5nKTogQ2xyV2l6YXJkUGFnZSB7XG4gICAgY29uc3QgZm91bmRQYWdlczogQ2xyV2l6YXJkUGFnZVtdID0gdGhpcy5wYWdlcy5maWx0ZXIoKHBhZ2U6IENscldpemFyZFBhZ2UpID0+IGlkID09PSBwYWdlLmlkKTtcbiAgICByZXR1cm4gdGhpcy5jaGVja1Jlc3VsdHMoZm91bmRQYWdlcywgaWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFjY2VwdHMgcyBudW1iZXIgYXMgYSBwYXJhbWV0ZXIgYW5kIHRyZWF0cyB0aGF0IG51bWJlciBhcyB0aGUgaW5kZXggb2YgdGhlIHBhZ2VcbiAgICogeW91J3JlIGxvb2tpbmcgZm9yIGluIHRoZSBjb2xsZWN0aW9uIG9mIHBhZ2VzLiBSZXR1cm5zIGEgIHdpemFyZCBwYWdlIG9iamVjdC5cbiAgICpcbiAgICogQG1lbWJlcm9mIFBhZ2VDb2xsZWN0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIGdldFBhZ2VCeUluZGV4KGluZGV4OiBudW1iZXIpOiBDbHJXaXphcmRQYWdlIHtcbiAgICBjb25zdCBwYWdlQ291bnQgPSB0aGlzLnBhZ2VzQ291bnQ7XG4gICAgY29uc3QgcGFnZXNMYXN0SW5kZXg6IG51bWJlciA9IHBhZ2VDb3VudCA+IDEgPyBwYWdlQ291bnQgLSAxIDogMDtcblxuICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IHJldHJpZXZlIHBhZ2Ugd2l0aCBpbmRleCBvZiAnICsgaW5kZXgpO1xuICAgIH1cblxuICAgIGlmIChpbmRleCA+IHBhZ2VzTGFzdEluZGV4KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BhZ2UgaW5kZXggaXMgZ3JlYXRlciB0aGFuIGxlbmd0aCBvZiBwYWdlcyBhcnJheS4nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5wYWdlc0FzQXJyYXlbaW5kZXhdO1xuICB9XG5cbiAgLyoqXG4gICAqIFRha2VzIGEgd2l6YXJkIHBhZ2Ugb2JqZWN0IGFzIGEgcGFyYW1ldGVyIGFuZCByZXR1cm5zIGl0cyBpbmRleCBpbiB0aGVcbiAgICogY29sbGVjdGlvbiBvZiBwYWdlcy5cbiAgICpcbiAgICogQG1lbWJlcm9mIFBhZ2VDb2xsZWN0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIGdldFBhZ2VJbmRleChwYWdlOiBDbHJXaXphcmRQYWdlKTogbnVtYmVyIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMucGFnZXNBc0FycmF5LmluZGV4T2YocGFnZSk7XG5cbiAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlcXVlc3RlZCBwYWdlIGNhbm5vdCBiZSBmb3VuZCBpbiBjb2xsZWN0aW9uIG9mIHBhZ2VzLicpO1xuICAgIH1cblxuICAgIHJldHVybiBpbmRleDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb25zb2xpZGF0ZXMgZ3VhcmQgbG9naWMgdGhhdCBwcmV2ZW50cyBhIGNvdXBsZSBvZiB1bmZvcnR1bmF0ZSBlZGdlIGNhc2VzIHdpdGhcbiAgICogbG9vayB1cHMgb24gdGhlIGNvbGxlY3Rpb24gb2YgcGFnZXMuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQYWdlQ29sbGVjdGlvblNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgY2hlY2tSZXN1bHRzKHJlc3VsdHM6IENscldpemFyZFBhZ2VbXSwgcmVxdWVzdGVkUGFnZUlkOiBzdHJpbmcpIHtcbiAgICBjb25zdCBmb3VuZFBhZ2VzQ291bnQ6IG51bWJlciA9IHJlc3VsdHMubGVuZ3RoIHx8IDA7XG5cbiAgICBpZiAoZm91bmRQYWdlc0NvdW50ID4gMSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNb3JlIHRoYW4gb25lIHBhZ2UgaGFzIHRoZSByZXF1ZXN0ZWQgaWQgJyArIHJlcXVlc3RlZFBhZ2VJZCArICcuJyk7XG4gICAgfSBlbHNlIGlmIChmb3VuZFBhZ2VzQ291bnQgPCAxKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIHBhZ2UgY2FuIGJlIGZvdW5kIHdpdGggdGhlIGlkICcgKyByZXF1ZXN0ZWRQYWdlSWQgKyAnLicpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcmVzdWx0c1swXTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWNjZXB0cyB0d28gbnVtZXJpYyBpbmRleGVzIGFuZCByZXR1cm5zIGFuIGFycmF5IG9mIHdpemFyZCBwYWdlIG9iamVjdHMgdGhhdCBpbmNsdWRlXG4gICAqIGFsbCB3aXphcmQgcGFnZXMgaW4gdGhlIHBhZ2UgY29sbGVjdGlvbiBmcm9tIHRoZSBmaXJzdCBpbmRleCB0byB0aGUgc2Vjb25kLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgUGFnZUNvbGxlY3Rpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgcGFnZVJhbmdlKHN0YXJ0OiBudW1iZXIsIGVuZDogbnVtYmVyKTogQ2xyV2l6YXJkUGFnZVtdIHtcbiAgICBsZXQgcGFnZXM6IENscldpemFyZFBhZ2VbXSA9IFtdO1xuXG4gICAgaWYgKHN0YXJ0IDwgMCB8fCBlbmQgPCAwKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgaWYgKHN0YXJ0ID09PSBudWxsIHx8IHR5cGVvZiBzdGFydCA9PT0gdW5kZWZpbmVkIHx8IGlzTmFOKHN0YXJ0KSkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIGlmIChlbmQgPT09IG51bGwgfHwgdHlwZW9mIGVuZCA9PT0gdW5kZWZpbmVkIHx8IGlzTmFOKGVuZCkpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICBpZiAoZW5kID4gdGhpcy5wYWdlc0NvdW50KSB7XG4gICAgICBlbmQgPSB0aGlzLnBhZ2VzQ291bnQ7XG4gICAgfVxuXG4gICAgcGFnZXMgPSB0aGlzLnBhZ2VzQXNBcnJheTtcblxuICAgIGlmIChlbmQgLSBzdGFydCA9PT0gMCkge1xuICAgICAgLy8ganVzdCByZXR1cm4gdGhlIG9uZSBwYWdlIHRoZXkgd2FudFxuICAgICAgcmV0dXJuIFt0aGlzLmdldFBhZ2VCeUluZGV4KHN0YXJ0KV07XG4gICAgfVxuXG4gICAgLy8gc2xpY2UgZW5kIGRvZXMgbm90IGluY2x1ZGUgaXRlbSByZWZlcmVuY2VkIGJ5IGVuZCBpbmRleCwgd2hpY2ggaXMgd2VpcmQgZm9yIHVzZXJzXG4gICAgLy8gaW5jcmVtZW50aW5nIGVuZCBpbmRleCBoZXJlIHRvIGNvcnJlY3QgdGhhdCBzbyB1c2VycyBhbmQgb3RoZXIgbWV0aG9kc1xuICAgIC8vIGRvbid0IGhhdmUgdG8gdGhpbmsgYWJvdXQgaXRcbiAgICBlbmQgPSBlbmQgKyAxO1xuXG4gICAgLy8gc2xpY2UgZG9lcyBub3QgcmV0dXJuIHRoZSBsYXN0IG9uZSBpbiB0aGUgcmFuZ2UgYnV0IGl0IGRvZXMgaW5jbHVkZSB0aGUgZmlyc3Qgb25lXG4gICAgLy8gZG9lcyBub3QgbW9kaWZ5IG9yaWdpbmFsIGFycmF5XG4gICAgcmV0dXJuIHBhZ2VzLnNsaWNlKHN0YXJ0LCBlbmQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFjY2VwdHMgdHdvIHdpemFyZCBwYWdlIG9iamVjdHMgYW5kIHJldHVybnMgdGhvc2UgcGFnZSBvYmplY3RzIHdpdGggYWxsIG90aGVyIHBhZ2VcbiAgICogb2JqZWN0cyBiZXR3ZWVuIHRoZW0gaW4gdGhlIHBhZ2UgY29sbGVjdGlvbi4gSXQgZG9lc24ndCBjYXJlIHdoaWNoIHBhZ2UgaXMgYWhlYWQgb2YgdGhlXG4gICAqIG90aGVyIGluIHRoZSBwYXJhbWV0ZXJzLiBJdCB3aWxsIGJlIHNtYXJ0IGVub3VnaCB0byBmaWd1cmUgdGhhdCBvdXQgIG9uIGl0cyBvd24uXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQYWdlQ29sbGVjdGlvblNlcnZpY2VcbiAgICovXG4gIHB1YmxpYyBnZXRQYWdlUmFuZ2VGcm9tUGFnZXMocGFnZTogQ2xyV2l6YXJkUGFnZSwgb3RoZXJQYWdlOiBDbHJXaXphcmRQYWdlKTogQ2xyV2l6YXJkUGFnZVtdIHtcbiAgICBjb25zdCBwYWdlSW5kZXggPSB0aGlzLmdldFBhZ2VJbmRleChwYWdlKTtcbiAgICBjb25zdCBvdGhlclBhZ2VJbmRleCA9IHRoaXMuZ2V0UGFnZUluZGV4KG90aGVyUGFnZSk7XG4gICAgbGV0IHN0YXJ0SW5kZXg6IG51bWJlcjtcbiAgICBsZXQgZW5kSW5kZXg6IG51bWJlcjtcblxuICAgIGlmIChwYWdlSW5kZXggPD0gb3RoZXJQYWdlSW5kZXgpIHtcbiAgICAgIHN0YXJ0SW5kZXggPSBwYWdlSW5kZXg7XG4gICAgICBlbmRJbmRleCA9IG90aGVyUGFnZUluZGV4O1xuICAgIH0gZWxzZSB7XG4gICAgICBzdGFydEluZGV4ID0gb3RoZXJQYWdlSW5kZXg7XG4gICAgICBlbmRJbmRleCA9IHBhZ2VJbmRleDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucGFnZVJhbmdlKHN0YXJ0SW5kZXgsIGVuZEluZGV4KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUYWtlcyBhIHdpemFyZCBwYWdlIG9iamVjdCBhcyBhIHBhcmFtZXRlciBhbmQgcmV0dXJucyB0aGUgd2l6YXJkIHBhZ2Ugb2JqZWN0IG9mXG4gICAqIHRoZSBwYWdlIGltbWVkaWF0ZWx5IGJlZm9yZSBpdCBpbiB0aGUgcGFnZSBjb2xsZWN0aW9uLiBSZXR1cm5zIG51bGwgaWYgdGhlcmUgaXNcbiAgICogbm8gcGFnZSBiZWZvcmUgdGhlIHBhZ2UgaXQgaXMgcGFzc2VkLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgUGFnZUNvbGxlY3Rpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgZ2V0UHJldmlvdXNQYWdlKHBhZ2U6IENscldpemFyZFBhZ2UpIHtcbiAgICBjb25zdCBteVBhZ2VJbmRleCA9IHRoaXMuZ2V0UGFnZUluZGV4KHBhZ2UpO1xuICAgIGNvbnN0IHByZXZpb3VzUGFnZUluZGV4ID0gbXlQYWdlSW5kZXggLSAxO1xuICAgIGlmIChwcmV2aW91c1BhZ2VJbmRleCA8IDApIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5nZXRQYWdlQnlJbmRleChwcmV2aW91c1BhZ2VJbmRleCk7XG4gIH1cblxuICAvKipcbiAgICogQWNjZXB0cyBhIHdpemFyZCBwYWdlIG9iamVjdCBhcyBhIHBhcmFtZXRlciBhbmQgcmV0dXJucyBhIEJvb2xlYW4gdGhhdCBzYXlzIGlmXG4gICAqIHRoZSBwYWdlIHlvdSBzZW50IGl0IGlzIGNvbXBsZXRlLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgUGFnZUNvbGxlY3Rpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgcHJldmlvdXNQYWdlSXNDb21wbGV0ZWQocGFnZTogQ2xyV2l6YXJkUGFnZSkge1xuICAgIGxldCBwcmV2aW91c1BhZ2U6IENscldpemFyZFBhZ2U7XG5cbiAgICBpZiAoIXBhZ2UpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBwcmV2aW91c1BhZ2UgPSB0aGlzLmdldFByZXZpb3VzUGFnZShwYWdlKTtcblxuICAgIGlmIChudWxsID09PSBwcmV2aW91c1BhZ2UpIHtcbiAgICAgIC8vIHBhZ2UgaXMgdGhlIGZpcnN0IHBhZ2UuIG5vIHByZXZpb3VzIHBhZ2UuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gcHJldmlvdXNQYWdlLmNvbXBsZXRlZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBUYWtlcyBhIHdpemFyZCBwYWdlIG9iamVjdCBhcyBhIHBhcmFtZXRlciBhbmQgcmV0dXJucyB0aGUgd2l6YXJkIHBhZ2Ugb2JqZWN0IG9mXG4gICAqIHRoZSBwYWdlIGltbWVkaWF0ZWx5IGFmdGVyIGl0IGluIHRoZSBwYWdlIGNvbGxlY3Rpb24uIFJldHVybnMgbnVsbCBpZiB0aGVyZSBpc1xuICAgKiBubyBwYWdlIGFmdGVyIHRoZSBwYWdlIGl0IGlzIHBhc3NlZC5cbiAgICpcbiAgICogQG1lbWJlcm9mIFBhZ2VDb2xsZWN0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIGdldE5leHRQYWdlKHBhZ2U6IENscldpemFyZFBhZ2UpIHtcbiAgICBjb25zdCBteVBhZ2VJbmRleCA9IHRoaXMuZ2V0UGFnZUluZGV4KHBhZ2UpO1xuICAgIGNvbnN0IG5leHRQYWdlSW5kZXggPSBteVBhZ2VJbmRleCArIDE7XG5cbiAgICBpZiAobmV4dFBhZ2VJbmRleCA+PSB0aGlzLnBhZ2VzQXNBcnJheS5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5nZXRQYWdlQnlJbmRleChuZXh0UGFnZUluZGV4KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUYWtlcyBhIHdpemFyZCBwYWdlIG9iamVjdCBhcyBhIHBhcmFtZXRlciBhbmQgZ2VuZXJhdGVzIGEgc3RlcCBpdGVtIGlkIGZyb20gdGhlXG4gICAqIHBhZ2UgSUQuIFJldHVybnMgdGhlIGdlbmVyYXRlZCBzdGVwIGl0ZW0gSUQgYXMgYSBzdHJpbmcuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQYWdlQ29sbGVjdGlvblNlcnZpY2VcbiAgICovXG4gIHB1YmxpYyBnZXRTdGVwSXRlbUlkRm9yUGFnZShwYWdlOiBDbHJXaXphcmRQYWdlKSB7XG4gICAgY29uc3QgcGFnZUlkID0gcGFnZS5pZDtcbiAgICBjb25zdCBwYWdlSWRQYXJ0cyA9IHBhZ2VJZC5zcGxpdCgnLScpLnJldmVyc2UoKTtcblxuICAgIHBhZ2VJZFBhcnRzWzFdID0gJ3N0ZXAnO1xuICAgIHJldHVybiBwYWdlSWRQYXJ0cy5yZXZlcnNlKCkuam9pbignLScpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYWxseSBvbmx5IHVzZWQgaW50ZXJuYWxseSB0byBtYXJrIHRoYXQgYSBzcGVjaWZpYyBwYWdlIGhhcyBiZWVuIFwiY29tbWl0dGVkXCIuXG4gICAqIFRoaXMgaW52b2x2ZXMgbWFya2luZyB0aGUgcGFnZSBjb21wbGV0ZSBhbmQgZmlyaW5nIHRoZSBDbHJXaXphcmRQYWdlLm9uQ29tbWl0XG4gICAqIChjbHJXaXphcmRQYWdlT25Db21taXQpIG91dHB1dC4gVGFrZXMgdGhlIHdpemFyZCBwYWdlIG9iamVjdCB0aGF0IHlvdSBpbnRlbmQgdG9cbiAgICogbWFyayBjb21wbGV0ZWQgYXMgYSBwYXJhbWV0ZXIuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQYWdlQ29sbGVjdGlvblNlcnZpY2VcbiAgICovXG4gIHB1YmxpYyBjb21taXRQYWdlKHBhZ2U6IENscldpemFyZFBhZ2UpIHtcbiAgICBjb25zdCBwYWdlSGFzT3ZlcnJpZGVzID0gcGFnZS5zdG9wTmV4dCB8fCBwYWdlLnByZXZlbnREZWZhdWx0O1xuICAgIHBhZ2UuY29tcGxldGVkID0gdHJ1ZTtcblxuICAgIGlmICghcGFnZUhhc092ZXJyaWRlcykge1xuICAgICAgLy8gcHJldmVudCBsb29wIG9mIGV2ZW50IGVtaXNzaW9uOyBhbHRlcm5hdGUgZmxvd3Mgd29yayBvZmZcbiAgICAgIC8vIG9mIGV2ZW50IGVtaXR0ZXJzIHRoaXMgaXMgaG93IHRoZXkgYnJlYWsgdGhhdCBjeWNsZS5cbiAgICAgIHBhZ2Uub25Db21taXQuZW1pdChwYWdlLmlkKTtcbiAgICB9XG4gIH1cblxuICAvLyB1c2VkIGJ5IHRoZSBuYXZTZXJ2aWNlIHRvIG5hdmlnYXRlIGJhY2sgdG8gZmlyc3QgcG9zc2libGUgc3RlcCBhZnRlclxuICAvLyBwYWdlcyBhcmUgcmVzZXRcblxuICAvKipcbiAgICpcbiAgICogQG1lbWJlcm9mIFBhZ2VDb2xsZWN0aW9uU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfcGFnZXNSZXNldCA9IG5ldyBTdWJqZWN0PGJvb2xlYW4+KCk7XG5cbiAgLyoqXG4gICAqIEFuIG9ic2VydmFibGUgdGhhdCB0aGUgbmF2aWdhdGlvbiBzZXJ2aWNlIGxpc3RlbnMgdG8gaW4gb3JkZXIgdG8ga25vdyB3aGVuXG4gICAqIHRoZSBwYWdlIGNvbGxlY3Rpb24gY29tcGxldGVkIHN0YXRlcyBoYXZlIGJlZW4gcmVzZXQgdG8gZmFsc2Ugc28gdGhhdCB3YXkgaXRcbiAgICogY2FuIGFsc28gcmVzZXQgdGhlIG5hdmlnYXRpb24gdG8gbWFrZSB0aGUgZmlyc3QgcGFnZSBpbiB0aGUgcGFnZSBjb2xsZWN0aW9uXG4gICAqIGN1cnJlbnQvYWN0aXZlLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgUGFnZUNvbGxlY3Rpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgZ2V0IHBhZ2VzUmVzZXQoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuX3BhZ2VzUmVzZXQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyBhbGwgY29tcGxldGVkIHN0YXRlcyBvZiB0aGUgcGFnZXMgaW4gdGhlIHBhZ2UgY29sbGVjdGlvbiB0byBmYWxzZSBhbmRcbiAgICogbm90aWZpZXMgdGhlIG5hdmlnYXRpb24gc2VydmljZSB0byBsaWtld2lzZSByZXNldCB0aGUgbmF2aWdhdGlvbi5cbiAgICpcbiAgICogQG1lbWJlcm9mIFBhZ2VDb2xsZWN0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIHJlc2V0KCkge1xuICAgIHRoaXMucGFnZXNBc0FycmF5LmZvckVhY2goKHBhZ2U6IENscldpemFyZFBhZ2UpID0+IHtcbiAgICAgIHBhZ2UuY29tcGxldGVkID0gZmFsc2U7XG4gICAgfSk7XG4gICAgdGhpcy5fcGFnZXNSZXNldC5uZXh0KHRydWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJvbGxzIHRocm91Z2ggYWxsIHRoZSBwYWdlcyBpbiB0aGUgcGFnZSBjb2xsZWN0aW9uIHRvIG1ha2Ugc3VyZSB0aGVyZSBhcmUgbm9cbiAgICogaW5jb21wbGV0ZSBwYWdlcyBzYW5kd2ljaGVkIGJldHdlZW4gY29tcGxldGVkIHBhZ2VzIGluIHRoZSB3b3JrZmxvdy4gSWRlbnRpZmllc1xuICAgKiB0aGUgZmlyc3QgaW5jb21wbGV0ZSBwYWdlIGluZGV4IGFuZCBzZXRzIGFsbCBwYWdlcyBiZWhpbmQgaXQgdG8gYSBjb21wbGV0ZWRcbiAgICogc3RhdGUgb2YgZmFsc2UuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQYWdlQ29sbGVjdGlvblNlcnZpY2VcbiAgICovXG4gIHB1YmxpYyB1cGRhdGVDb21wbGV0ZWRTdGF0ZXMoKTogdm9pZCB7XG4gICAgY29uc3QgZmlyc3RJbmNvbXBsZXRlSW5kZXggPSB0aGlzLmZpbmRGaXJzdEluY29tcGxldGVQYWdlSW5kZXgoKTtcblxuICAgIGlmIChmaXJzdEluY29tcGxldGVJbmRleCA9PT0gdGhpcy5wYWdlc0FzQXJyYXkubGVuZ3RoIC0gMSkge1xuICAgICAgLy8gYWxsIGNvbXBsZXRlIG5vIG5lZWQgdG8gZG8gYW55dGhpbmdcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnBhZ2VzQXNBcnJheS5mb3JFYWNoKChwYWdlOiBDbHJXaXphcmRQYWdlLCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICBpZiAoaW5kZXggPiBmaXJzdEluY29tcGxldGVJbmRleCkge1xuICAgICAgICBwYWdlLmNvbXBsZXRlZCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlcyB0aGUgaW5kZXggb2YgdGhlIGZpcnN0IGluY29tcGxldGUgcGFnZSBpbiB0aGUgcGFnZSBjb2xsZWN0aW9uLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgUGFnZUNvbGxlY3Rpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgZmluZEZpcnN0SW5jb21wbGV0ZVBhZ2VJbmRleCgpOiBudW1iZXIge1xuICAgIGxldCByZXR1cm5JbmRleDogbnVtYmVyID0gbnVsbDtcbiAgICB0aGlzLnBhZ2VzQXNBcnJheS5mb3JFYWNoKChwYWdlOiBDbHJXaXphcmRQYWdlLCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICBpZiAobnVsbCA9PT0gcmV0dXJuSW5kZXggJiYgZmFsc2UgPT09IHBhZ2UuY29tcGxldGVkKSB7XG4gICAgICAgIHJldHVybkluZGV4ID0gaW5kZXg7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBmYWxsdGhyb3VnaCwgYWxsIGNvbXBsZXRlZCwgcmV0dXJuIGxhc3QgcGFnZVxuICAgIGlmIChudWxsID09PSByZXR1cm5JbmRleCkge1xuICAgICAgcmV0dXJuSW5kZXggPSB0aGlzLnBhZ2VzQ291bnQgLSAxO1xuICAgIH1cblxuICAgIHJldHVybiByZXR1cm5JbmRleDtcbiAgfVxuXG4gIHB1YmxpYyBmaW5kRmlyc3RJbmNvbXBsZXRlUGFnZSgpOiBDbHJXaXphcmRQYWdlIHtcbiAgICBjb25zdCBteUluY29tcGxldGVJbmRleCA9IHRoaXMuZmluZEZpcnN0SW5jb21wbGV0ZVBhZ2VJbmRleCgpO1xuICAgIHJldHVybiB0aGlzLnBhZ2VzQXNBcnJheVtteUluY29tcGxldGVJbmRleF07XG4gIH1cbn1cbiJdfQ==