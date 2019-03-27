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
import { ButtonHubService } from './button-hub.service';
import { PageCollectionService } from './page-collection.service';
/**
 * Performs navigation functions for a wizard and manages the current page. Presented as a
 * separate service to encapsulate the behavior of navigating and completing the wizard so
 * that it can be shared across the wizard and its sub-components.
 *
 * The easiest way to access the navigation service is there a reference on your wizard. The
 * Following example would allow you to access your instance of the wizard from your host
 * component and thereby access the navigation service via YourHostComponent.wizard.navService.
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
 */
export class WizardNavigationService {
    /**
     * Creates an instance of WizardNavigationService. Also sets up subscriptions
     * that listen to the button service to determine when a button has been clicked
     * in the wizard. Is also responsible for taking action when the page collection
     * requests that navigation be reset to its pristine state.
     *
     * \@memberof WizardNavigationService
     * @param {?} pageCollection
     * @param {?} buttonService
     */
    constructor(pageCollection, buttonService) {
        this.pageCollection = pageCollection;
        this.buttonService = buttonService;
        /**
         *
         * \@memberof WizardNavigationService
         */
        this._currentChanged = new Subject();
        /**
         * A Boolean flag used by the ClrWizardPage to avoid a race condition when pages are
         * loading and there is no current page defined.
         *
         * \@memberof WizardNavigationService
         */
        this.navServiceLoaded = false;
        /**
         * A boolean flag shared across the Wizard subcomponents that follows the value
         * of the Wizard.forceForward (clrWizardForceForwardNavigation) input. When true,
         * navigating backwards in the stepnav menu will reset any skipped pages' completed
         * state to false.
         *
         * This is useful when a wizard executes validation on a page-by-page basis when
         * the next button is clicked.
         *
         * \@memberof WizardNavigationService
         */
        this.forceForwardNavigation = false;
        /**
         * \@memberof WizardNavigationService
         */
        this._movedToNextPage = new Subject();
        /**
         * \@memberof WizardNavigationService
         */
        this._wizardFinished = new Subject();
        /**
         * \@memberof WizardNavigationService
         */
        this._movedToPreviousPage = new Subject();
        /**
         * \@memberof WizardNavigationService
         */
        this._cancelWizard = new Subject();
        /**
         * A boolean flag shared across the Wizard subcomponents that follows the value
         * of the Wizard.stopCancel (clrWizardPreventDefaultCancel) input. When true, the cancel
         * routine is subverted and must be reinstated in the host component calling Wizard.close()
         * at some point.
         *
         * \@memberof WizardNavigationService
         */
        this.wizardHasAltCancel = false;
        /**
         * A boolean flag shared across the Wizard subcomponents that follows the value
         * of the Wizard.stopNext (clrWizardPreventDefaultNext) input. When true, the next and finish
         * routines are subverted and must be reinstated in the host component calling Wizard.next(),
         * Wizard.forceNext(), Wizard.finish(), or Wizard.forceFinish().
         *
         * \@memberof WizardNavigationService
         */
        this.wizardHasAltNext = false;
        /**
         * A boolean flag shared across the Wizard subcomponents that follows the value
         * of the Wizard.stopNavigation (clrWizardPreventNavigation) input. When true, all
         * navigational elements in the wizard are disabled.
         *
         * This is intended to freeze the wizard in place. Events are not fired so this is
         * not a way to implement alternate functionality for navigation.
         *
         * \@memberof WizardNavigationService
         */
        this.wizardStopNavigation = false;
        /**
         * A boolean flag shared with the stepnav items that prevents user clicks on
         * stepnav items from navigating the wizard.
         *
         * \@memberof WizardNavigationService
         */
        this.wizardDisableStepnav = false;
        this.previousButtonSubscription = this.buttonService.previousBtnClicked.subscribe((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const currentPage = this.currentPage;
            if (this.currentPageIsFirst || currentPage.previousStepDisabled) {
                return;
            }
            currentPage.previousButtonClicked.emit(currentPage);
            if (!currentPage.preventDefault) {
                this.previous();
            }
        }));
        this.nextButtonSubscription = this.buttonService.nextBtnClicked.subscribe((/**
         * @return {?}
         */
        () => {
            this.checkAndCommitCurrentPage('next');
        }));
        this.dangerButtonSubscription = this.buttonService.dangerBtnClicked.subscribe((/**
         * @return {?}
         */
        () => {
            this.checkAndCommitCurrentPage('danger');
        }));
        this.finishButtonSubscription = this.buttonService.finishBtnClicked.subscribe((/**
         * @return {?}
         */
        () => {
            this.checkAndCommitCurrentPage('finish');
        }));
        this.customButtonSubscription = this.buttonService.customBtnClicked.subscribe((/**
         * @param {?} type
         * @return {?}
         */
        (type) => {
            if (!this.wizardStopNavigation) {
                this.currentPage.customButtonClicked.emit(type);
            }
        }));
        this.cancelButtonSubscription = this.buttonService.cancelBtnClicked.subscribe((/**
         * @return {?}
         */
        () => {
            if (this.wizardStopNavigation) {
                return;
            }
            if (this.currentPage.preventDefault) {
                this.currentPage.pageOnCancel.emit(this.currentPage);
            }
            else {
                this.cancel();
            }
        }));
        this.pagesResetSubscription = this.pageCollection.pagesReset.subscribe((/**
         * @return {?}
         */
        () => {
            this.setFirstPageCurrent();
        }));
    }
    /**
     *
     * \@memberof WizardNavigationService
     * @return {?}
     */
    ngOnDestroy() {
        this.previousButtonSubscription.unsubscribe();
        this.nextButtonSubscription.unsubscribe();
        this.dangerButtonSubscription.unsubscribe();
        this.finishButtonSubscription.unsubscribe();
        this.customButtonSubscription.unsubscribe();
        this.cancelButtonSubscription.unsubscribe();
        this.pagesResetSubscription.unsubscribe();
    }
    /**
     * An Observable that is predominantly used amongst the subcomponents and services
     * of the wizard. It is recommended that users listen to the ClrWizardPage.onLoad
     * (clrWizardPageOnLoad) output instead of this Observable.
     *
     * \@memberof WizardNavigationService
     * @return {?}
     */
    get currentPageChanged() {
        // TODO: MAKE SURE EXTERNAL OUTPUTS SAY 'CHANGE' NOT 'CHANGED'
        // A BREAKING CHANGE SO AWAITING MINOR RELEASE
        return this._currentChanged.asObservable();
    }
    /**
     * \@memberof WizardNavigationService
     * @return {?}
     */
    get currentPageTitle() {
        // when the querylist of pages is empty. this is the first place it fails...
        if (!this.currentPage) {
            return null;
        }
        return this.currentPage.title;
    }
    /**
     * Returns a Boolean that tells you whether or not the current page is the first
     * page in the Wizard.
     *
     * This is helpful for determining whether a page is navigable.
     *
     * \@memberof WizardNavigationService
     * @return {?}
     */
    get currentPageIsFirst() {
        return this.pageCollection.firstPage === this.currentPage;
    }
    /**
     * Returns a Boolean that tells you whether or not the current page is the
     * last page in the Wizard.
     *
     * This is used to determine which buttons should display in the wizard footer.
     *
     * \@memberof WizardNavigationService
     * @return {?}
     */
    get currentPageIsLast() {
        return this.pageCollection.lastPage === this.currentPage;
    }
    /**
     * Returns the ClrWizardPage object of the current page or null.
     *
     * \@memberof WizardNavigationService
     * @return {?}
     */
    get currentPage() {
        if (!this._currentPage) {
            return null;
        }
        return this._currentPage;
    }
    /**
     * Accepts a ClrWizardPage object, since that object to be the current/active
     * page in the wizard, and emits the ClrWizardPage.onLoad (clrWizardPageOnLoad)
     * event for that page.
     *
     * Note that all of this work is bypassed if the ClrWizardPage object is already
     * the current page.
     *
     * \@memberof WizardNavigationService
     * @param {?} page
     * @return {?}
     */
    set currentPage(page) {
        if (this._currentPage !== page && !this.wizardStopNavigation) {
            this._currentPage = page;
            page.onLoad.emit(page.id);
            this._currentChanged.next(page);
        }
    }
    /**
     * An observable used internally to alert the wizard that forward navigation
     * has occurred. It is recommended that you use the Wizard.onMoveNext
     * (clrWizardOnNext) output instead of this one.
     *
     * \@memberof WizardNavigationService
     * @return {?}
     */
    get movedToNextPage() {
        return this._movedToNextPage.asObservable();
    }
    /**
     * An observable used internally to alert the wizard that the nav service
     * has approved completion of the wizard.
     *
     * It is recommended that you use the Wizard.wizardFinished (clrWizardOnFinish)
     * output instead of this one.
     *
     * \@memberof WizardNavigationService
     * @return {?}
     */
    get wizardFinished() {
        return this._wizardFinished.asObservable();
    }
    /**
     * This is a public function that can be used to programmatically advance
     * the user to the next page.
     *
     * When invoked, this method will move the wizard to the next page after
     * successful validation. Note that this method goes through all checks
     * and event emissions as if Wizard.next(false) had been called.
     *
     * In most cases, it makes more sense to use Wizard.next(false).
     *
     * \@memberof WizardNavigationService
     * @return {?}
     */
    next() {
        if (this.currentPageIsLast) {
            this.checkAndCommitCurrentPage('finish');
            return;
        }
        this.checkAndCommitCurrentPage('next');
        if (!this.wizardHasAltNext && !this.wizardStopNavigation) {
            this._movedToNextPage.next(true);
        }
    }
    /**
     * Bypasses checks and most event emissions to force a page to navigate forward.
     *
     * Comparable to calling Wizard.next() or Wizard.forceNext().
     *
     * \@memberof WizardNavigationService
     * @return {?}
     */
    forceNext() {
        /** @type {?} */
        const currentPage = this.currentPage;
        /** @type {?} */
        const nextPage = this.pageCollection.getNextPage(currentPage);
        // catch errant null or undefineds that creep in
        if (!nextPage) {
            throw new Error('The wizard has no next page to go to.');
        }
        if (this.wizardStopNavigation) {
            return;
        }
        if (!currentPage.completed) {
            // this is a state that alt next flows can get themselves in...
            this.pageCollection.commitPage(currentPage);
        }
        this.currentPage = nextPage;
    }
    /**
     * Accepts a button/action type as a parameter. Encapsulates all logic for
     * event emissions, state of the current page, and wizard and page level overrides.
     *
     * Avoid calling this function directly unless you really know what you're doing.
     *
     * \@memberof WizardNavigationService
     * @param {?} buttonType
     * @return {?}
     */
    checkAndCommitCurrentPage(buttonType) {
        /** @type {?} */
        const currentPage = this.currentPage;
        /** @type {?} */
        let iAmTheLastPage;
        /** @type {?} */
        let isNext;
        /** @type {?} */
        let isDanger;
        /** @type {?} */
        let isDangerNext;
        /** @type {?} */
        let isDangerFinish;
        /** @type {?} */
        let isFinish;
        if (!currentPage.readyToComplete || this.wizardStopNavigation) {
            return;
        }
        iAmTheLastPage = this.currentPageIsLast;
        isNext = buttonType === 'next';
        isDanger = buttonType === 'danger';
        isDangerNext = isDanger && !iAmTheLastPage;
        isDangerFinish = isDanger && iAmTheLastPage;
        isFinish = buttonType === 'finish' || isDangerFinish;
        if (isFinish && !iAmTheLastPage) {
            return;
        }
        currentPage.primaryButtonClicked.emit(buttonType);
        if (isFinish) {
            currentPage.finishButtonClicked.emit(currentPage);
        }
        else if (isDanger) {
            currentPage.dangerButtonClicked.emit();
        }
        else if (isNext) {
            currentPage.nextButtonClicked.emit();
        }
        if (currentPage.stopNext || currentPage.preventDefault) {
            currentPage.onCommit.emit(currentPage.id);
            return;
        }
        // order is very important with these emitters!
        if (isFinish) {
            // mark page as complete
            if (!this.wizardHasAltNext) {
                this.pageCollection.commitPage(currentPage);
            }
            this._wizardFinished.next();
        }
        if (this.wizardHasAltNext) {
            this.pageCollection.commitPage(currentPage);
            if (isNext || isDangerNext) {
                this._movedToNextPage.next(true);
            }
            // jump out here, no matter what type we're looking at
            return;
        }
        if (isNext || isDangerNext) {
            this.forceNext();
        }
    }
    /**
     * This is a public function that can be used to programmatically conclude
     * the wizard.
     *
     * When invoked, this method will  initiate the work involved with finalizing
     * and finishing the wizard workflow. Note that this method goes through all
     * checks and event emissions as if Wizard.finish(false) had been called.
     *
     * In most cases, it makes more sense to use Wizard.finish(false).
     *
     * \@memberof WizardNavigationService
     * @return {?}
     */
    finish() {
        this.checkAndCommitCurrentPage('finish');
    }
    /**
     * Notifies the wizard when backwards navigation has occurred via the
     * previous button.
     *
     * \@memberof WizardNavigationService
     * @return {?}
     */
    get movedToPreviousPage() {
        return this._movedToPreviousPage.asObservable();
    }
    /**
     * Programmatically moves the wizard to the page before the current page.
     *
     * In most instances, it makes more sense to call Wizard.previous()
     * which does the same thing.
     *
     * \@memberof WizardNavigationService
     * @return {?}
     */
    previous() {
        /** @type {?} */
        let previousPage;
        if (this.currentPageIsFirst || this.wizardStopNavigation) {
            return;
        }
        previousPage = this.pageCollection.getPreviousPage(this.currentPage);
        if (!previousPage) {
            return;
        }
        this._movedToPreviousPage.next(true);
        if (this.forceForwardNavigation) {
            this.currentPage.completed = false;
        }
        this.currentPage = previousPage;
    }
    /**
     * Notifies the wizard that a user is trying to cancel it.
     *
     * \@memberof WizardNavigationService
     * @return {?}
     */
    get notifyWizardCancel() {
        return this._cancelWizard.asObservable();
    }
    /**
     * Allows a hook into the cancel workflow of the wizard from the nav service. Note that
     * this route goes through all checks and event emissions as if a cancel button had
     * been clicked.
     *
     * In most cases, users looking for a hook into the cancel routine are actually looking
     * for a way to close the wizard from their host component because they have prevented
     * the default cancel action.
     *
     * In this instance, it is recommended that you use Wizard.close() to avoid any event
     * emission loop resulting from an event handler calling back into routine that will
     * again evoke the events it handles.
     *
     * \@memberof WizardNavigationService
     * @return {?}
     */
    cancel() {
        this._cancelWizard.next();
    }
    /**
     * Performs all required checks to determine if a user can navigate to a page. Checking at each
     * point if a page is navigable -- completed where the page immediately after the last completed
     * page.
     *
     * Takes two parameters. The first one must be either the ClrWizardPage object or the ID of the
     * ClrWizardPage object that you want to make the current page.
     *
     * The second parameter is optional and is a Boolean flag for "lazy completion". What this means
     * is the Wizard will mark all pages between the current page and the page you want to navigate
     * to as completed. This is useful for informational wizards that do not require user action,
     * allowing an easy means for users to jump ahead.
     *
     * To avoid checks on navigation, use ClrWizardPage.makeCurrent() instead.
     *
     * \@memberof WizardNavigationService
     * @param {?} pageToGoToOrId
     * @param {?=} lazyComplete
     * @return {?}
     */
    goTo(pageToGoToOrId, lazyComplete = false) {
        /** @type {?} */
        let pageToGoTo;
        /** @type {?} */
        let currentPage;
        /** @type {?} */
        let myPages;
        /** @type {?} */
        let pagesToCheck;
        /** @type {?} */
        let okayToMove;
        /** @type {?} */
        let goingForward;
        /** @type {?} */
        let currentPageIndex;
        /** @type {?} */
        let goToPageIndex;
        myPages = this.pageCollection;
        pageToGoTo = typeof pageToGoToOrId === 'string' ? myPages.getPageById(pageToGoToOrId) : pageToGoToOrId;
        currentPage = this.currentPage;
        // no point in going to the current page. you're there already!
        // also hard block on any navigation when stopNavigation is true
        if (pageToGoTo === currentPage || this.wizardStopNavigation) {
            return;
        }
        currentPageIndex = myPages.getPageIndex(currentPage);
        goToPageIndex = myPages.getPageIndex(pageToGoTo);
        goingForward = goToPageIndex > currentPageIndex;
        pagesToCheck = myPages.getPageRangeFromPages(this.currentPage, pageToGoTo);
        okayToMove = lazyComplete || this.canGoTo(pagesToCheck);
        if (!okayToMove) {
            return;
        }
        if (goingForward && lazyComplete) {
            pagesToCheck.forEach((/**
             * @param {?} page
             * @return {?}
             */
            (page) => {
                if (page !== pageToGoTo) {
                    page.completed = true;
                }
            }));
        }
        else if (!goingForward && this.forceForwardNavigation) {
            pagesToCheck.forEach((/**
             * @param {?} page
             * @return {?}
             */
            (page) => {
                page.completed = false;
            }));
        }
        this.currentPage = pageToGoTo;
    }
    /**
     * Accepts a range of ClrWizardPage objects as a parameter. Performs the work of checking
     * those objects to determine if navigation can be accomplished.
     *
     * \@memberof WizardNavigationService
     * @param {?} pagesToCheck
     * @return {?}
     */
    canGoTo(pagesToCheck) {
        /** @type {?} */
        let okayToMove = true;
        /** @type {?} */
        const myPages = this.pageCollection;
        // previous page can be important when moving because if it's completed it
        // allows us to move to the page even if it's incomplete...
        /** @type {?} */
        let previousPagePasses;
        if (!pagesToCheck || pagesToCheck.length < 1) {
            return false;
        }
        pagesToCheck.forEach((/**
         * @param {?} page
         * @return {?}
         */
        (page) => {
            /** @type {?} */
            let previousPage;
            if (!okayToMove) {
                return;
            }
            if (page.completed) {
                // default is true. just jump out instead of complicating it.
                return;
            }
            // so we know our page is not completed...
            previousPage = myPages.getPageIndex(page) > 0 ? myPages.getPreviousPage(page) : null;
            previousPagePasses = previousPage === null || previousPage.completed === true;
            // we are false if not the current page AND previous page is not completed
            // (but must have a previous page)
            if (!page.current && !previousPagePasses) {
                okayToMove = false;
            }
            // falls through to true as default
        }));
        return okayToMove;
    }
    /**
     * Looks through the collection of pages to find the first one that is incomplete
     * and makes that page the current/active page.
     *
     * \@memberof WizardNavigationService
     * @return {?}
     */
    setLastEnabledPageCurrent() {
        /** @type {?} */
        const allPages = this.pageCollection.pagesAsArray;
        /** @type {?} */
        let lastCompletedPageIndex = null;
        allPages.forEach((/**
         * @param {?} page
         * @param {?} index
         * @return {?}
         */
        (page, index) => {
            if (page.completed) {
                lastCompletedPageIndex = index;
            }
        }));
        if (lastCompletedPageIndex === null) {
            // always is at least the first item...
            lastCompletedPageIndex = 0;
        }
        else if (lastCompletedPageIndex + 1 < allPages.length) {
            lastCompletedPageIndex = lastCompletedPageIndex + 1;
        }
        this.currentPage = allPages[lastCompletedPageIndex];
    }
    /**
     * Finds the first page in the collection of pages and makes that page the
     * current/active page.
     *
     * \@memberof WizardNavigationService
     * @return {?}
     */
    setFirstPageCurrent() {
        this.currentPage = this.pageCollection.pagesAsArray[0];
    }
    /**
     * Updates the stepnav on the left side of the wizard when pages are dynamically
     * added or removed from the collection of pages.
     *
     * \@memberof WizardNavigationService
     * @return {?}
     */
    updateNavigation() {
        /** @type {?} */
        let toSetCurrent;
        /** @type {?} */
        let currentPageRemoved;
        this.pageCollection.updateCompletedStates();
        currentPageRemoved = this.pageCollection.pagesAsArray.indexOf(this.currentPage) < 0;
        if (currentPageRemoved) {
            toSetCurrent = this.pageCollection.findFirstIncompletePage();
            this.currentPage = toSetCurrent;
        }
    }
}
WizardNavigationService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
WizardNavigationService.ctorParameters = () => [
    { type: PageCollectionService },
    { type: ButtonHubService }
];
if (false) {
    /**
     * Is notified when a previous button is clicked in the wizard. Performs checks
     * before alerting the current page of the button click. Enacts navigation to
     * the previous page if not overridden at the page level.
     *
     * \@memberof WizardNavigationService
     * @type {?}
     */
    WizardNavigationService.prototype.previousButtonSubscription;
    /**
     * Is notified when a Next button is clicked in the wizard.
     *
     * \@memberof WizardNavigationService
     * @type {?}
     */
    WizardNavigationService.prototype.nextButtonSubscription;
    /**
     * Is notified when a danger button is clicked in the wizard.
     *
     * \@memberof WizardNavigationService
     * @type {?}
     */
    WizardNavigationService.prototype.dangerButtonSubscription;
    /**
     * Is notified when a  finish button is clicked in the wizard.
     *
     * \@memberof WizardNavigationService
     * @type {?}
     */
    WizardNavigationService.prototype.finishButtonSubscription;
    /**
     * Is notified when a Custom button is clicked in the wizard.
     *
     * \@memberof WizardNavigationService
     * @type {?}
     */
    WizardNavigationService.prototype.customButtonSubscription;
    /**
     * Is notified when a Cancel button is clicked in the wizard. Notifies the wizard,
     * which handles all cancel functionality, if cancel is not overridden at the page
     * level.
     *
     * \@memberof WizardNavigationService
     * @type {?}
     */
    WizardNavigationService.prototype.cancelButtonSubscription;
    /**
     * Resets navigation to make the first page current when the page collection service
     * emits an event notifying WizardNavigationService that it has reset all pages
     * to their pristine, incomplete state.
     *
     * \@memberof WizardNavigationService
     * @type {?}
     */
    WizardNavigationService.prototype.pagesResetSubscription;
    /**
     *
     * \@memberof WizardNavigationService
     * @type {?}
     * @private
     */
    WizardNavigationService.prototype._currentChanged;
    /**
     * A Boolean flag used by the ClrWizardPage to avoid a race condition when pages are
     * loading and there is no current page defined.
     *
     * \@memberof WizardNavigationService
     * @type {?}
     */
    WizardNavigationService.prototype.navServiceLoaded;
    /**
     * A boolean flag shared across the Wizard subcomponents that follows the value
     * of the Wizard.forceForward (clrWizardForceForwardNavigation) input. When true,
     * navigating backwards in the stepnav menu will reset any skipped pages' completed
     * state to false.
     *
     * This is useful when a wizard executes validation on a page-by-page basis when
     * the next button is clicked.
     *
     * \@memberof WizardNavigationService
     * @type {?}
     */
    WizardNavigationService.prototype.forceForwardNavigation;
    /**
     * \@memberof WizardNavigationService
     * @type {?}
     * @private
     */
    WizardNavigationService.prototype._currentPage;
    /**
     * \@memberof WizardNavigationService
     * @type {?}
     * @private
     */
    WizardNavigationService.prototype._movedToNextPage;
    /**
     * \@memberof WizardNavigationService
     * @type {?}
     * @private
     */
    WizardNavigationService.prototype._wizardFinished;
    /**
     * \@memberof WizardNavigationService
     * @type {?}
     * @private
     */
    WizardNavigationService.prototype._movedToPreviousPage;
    /**
     * \@memberof WizardNavigationService
     * @type {?}
     * @private
     */
    WizardNavigationService.prototype._cancelWizard;
    /**
     * A boolean flag shared across the Wizard subcomponents that follows the value
     * of the Wizard.stopCancel (clrWizardPreventDefaultCancel) input. When true, the cancel
     * routine is subverted and must be reinstated in the host component calling Wizard.close()
     * at some point.
     *
     * \@memberof WizardNavigationService
     * @type {?}
     */
    WizardNavigationService.prototype.wizardHasAltCancel;
    /**
     * A boolean flag shared across the Wizard subcomponents that follows the value
     * of the Wizard.stopNext (clrWizardPreventDefaultNext) input. When true, the next and finish
     * routines are subverted and must be reinstated in the host component calling Wizard.next(),
     * Wizard.forceNext(), Wizard.finish(), or Wizard.forceFinish().
     *
     * \@memberof WizardNavigationService
     * @type {?}
     */
    WizardNavigationService.prototype.wizardHasAltNext;
    /**
     * A boolean flag shared across the Wizard subcomponents that follows the value
     * of the Wizard.stopNavigation (clrWizardPreventNavigation) input. When true, all
     * navigational elements in the wizard are disabled.
     *
     * This is intended to freeze the wizard in place. Events are not fired so this is
     * not a way to implement alternate functionality for navigation.
     *
     * \@memberof WizardNavigationService
     * @type {?}
     */
    WizardNavigationService.prototype.wizardStopNavigation;
    /**
     * A boolean flag shared with the stepnav items that prevents user clicks on
     * stepnav items from navigating the wizard.
     *
     * \@memberof WizardNavigationService
     * @type {?}
     */
    WizardNavigationService.prototype.wizardDisableStepnav;
    /** @type {?} */
    WizardNavigationService.prototype.pageCollection;
    /** @type {?} */
    WizardNavigationService.prototype.buttonService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l6YXJkLW5hdmlnYXRpb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbIndpemFyZC9wcm92aWRlcnMvd2l6YXJkLW5hdmlnYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFNQSxPQUFPLEVBQUUsVUFBVSxFQUEwQixNQUFNLGVBQWUsQ0FBQztBQUVuRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBSy9CLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCbEUsTUFBTSxPQUFPLHVCQUF1Qjs7Ozs7Ozs7Ozs7SUFnRWxDLFlBQW1CLGNBQXFDLEVBQVMsYUFBK0I7UUFBN0UsbUJBQWMsR0FBZCxjQUFjLENBQXVCO1FBQVMsa0JBQWEsR0FBYixhQUFhLENBQWtCOzs7OztRQWlFeEYsb0JBQWUsR0FBRyxJQUFJLE9BQU8sRUFBaUIsQ0FBQzs7Ozs7OztRQXFCaEQscUJBQWdCLEdBQUcsS0FBSyxDQUFDOzs7Ozs7Ozs7Ozs7UUFhekIsMkJBQXNCLEdBQUcsS0FBSyxDQUFDOzs7O1FBMkU5QixxQkFBZ0IsR0FBRyxJQUFJLE9BQU8sRUFBVyxDQUFDOzs7O1FBZ0IxQyxvQkFBZSxHQUFHLElBQUksT0FBTyxFQUFXLENBQUM7Ozs7UUErSnpDLHlCQUFvQixHQUFHLElBQUksT0FBTyxFQUFXLENBQUM7Ozs7UUE2QzlDLGtCQUFhLEdBQUcsSUFBSSxPQUFPLEVBQU8sQ0FBQzs7Ozs7Ozs7O1FBc0NwQyx1QkFBa0IsR0FBWSxLQUFLLENBQUM7Ozs7Ozs7OztRQVVwQyxxQkFBZ0IsR0FBWSxLQUFLLENBQUM7Ozs7Ozs7Ozs7O1FBWWxDLHlCQUFvQixHQUFZLEtBQUssQ0FBQzs7Ozs7OztRQVF0Qyx5QkFBb0Is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SUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDcEYsSUFBSSxrQkFBa0IsRUFBRTtZQUN0QixZQUFZLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1lBQzdELElBQUksQ0FBQyxXQUFXLEdBQUcsWUFBWSxDQUFDO1NBQ2pDO0lBQ0gsQ0FBQzs7O1lBbHJCRixVQUFVOzs7O1lBckJGLHFCQUFxQjtZQURyQixnQkFBZ0I7Ozs7Ozs7Ozs7O0lBK0J2Qiw2REFBZ0Q7Ozs7Ozs7SUFPaEQseURBQTRDOzs7Ozs7O0lBTzVDLDJEQUE4Qzs7Ozs7OztJQU85QywyREFBOEM7Ozs7Ozs7SUFPOUMsMkRBQThDOzs7Ozs7Ozs7SUFTOUMsMkRBQThDOzs7Ozs7Ozs7SUFTOUMseURBQTRDOzs7Ozs7O0lBMkU1QyxrREFBdUQ7Ozs7Ozs7O0lBcUJ2RCxtREFBZ0M7Ozs7Ozs7Ozs7Ozs7SUFhaEMseURBQXNDOzs7Ozs7SUF3Q3RDLCtDQUFvQzs7Ozs7O0lBbUNwQyxtREFBa0Q7Ozs7OztJQWdCbEQsa0RBQWlEOzs7Ozs7SUErSmpELHVEQUFzRDs7Ozs7O0lBNkN0RCxnREFBMkM7Ozs7Ozs7Ozs7SUFzQzNDLHFEQUEyQzs7Ozs7Ozs7OztJQVUzQyxtREFBeUM7Ozs7Ozs7Ozs7OztJQVl6Qyx1REFBNkM7Ozs7Ozs7O0lBUTdDLHVEQUE2Qzs7SUE5Y2pDLGlEQUE0Qzs7SUFBRSxnREFBc0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBDbHJXaXphcmRQYWdlIH0gZnJvbSAnLi4vd2l6YXJkLXBhZ2UnO1xuXG5pbXBvcnQgeyBCdXR0b25IdWJTZXJ2aWNlIH0gZnJvbSAnLi9idXR0b24taHViLnNlcnZpY2UnO1xuaW1wb3J0IHsgUGFnZUNvbGxlY3Rpb25TZXJ2aWNlIH0gZnJvbSAnLi9wYWdlLWNvbGxlY3Rpb24uc2VydmljZSc7XG5cbi8qKlxuICogUGVyZm9ybXMgbmF2aWdhdGlvbiBmdW5jdGlvbnMgZm9yIGEgd2l6YXJkIGFuZCBtYW5hZ2VzIHRoZSBjdXJyZW50IHBhZ2UuIFByZXNlbnRlZCBhcyBhXG4gKiBzZXBhcmF0ZSBzZXJ2aWNlIHRvIGVuY2Fwc3VsYXRlIHRoZSBiZWhhdmlvciBvZiBuYXZpZ2F0aW5nIGFuZCBjb21wbGV0aW5nIHRoZSB3aXphcmQgc29cbiAqIHRoYXQgaXQgY2FuIGJlIHNoYXJlZCBhY3Jvc3MgdGhlIHdpemFyZCBhbmQgaXRzIHN1Yi1jb21wb25lbnRzLlxuICpcbiAqIFRoZSBlYXNpZXN0IHdheSB0byBhY2Nlc3MgdGhlIG5hdmlnYXRpb24gc2VydmljZSBpcyB0aGVyZSBhIHJlZmVyZW5jZSBvbiB5b3VyIHdpemFyZC4gVGhlXG4gKiBGb2xsb3dpbmcgZXhhbXBsZSB3b3VsZCBhbGxvdyB5b3UgdG8gYWNjZXNzIHlvdXIgaW5zdGFuY2Ugb2YgdGhlIHdpemFyZCBmcm9tIHlvdXIgaG9zdFxuICogY29tcG9uZW50IGFuZCB0aGVyZWJ5IGFjY2VzcyB0aGUgbmF2aWdhdGlvbiBzZXJ2aWNlIHZpYSBZb3VySG9zdENvbXBvbmVudC53aXphcmQubmF2U2VydmljZS5cbiAqXG4gKiBAZXhhbXBsZVxuICogPGNsci13aXphcmQgI3dpemFyZCAuLi4+XG4gKlxuICogQGV4YW1wbGVcbiAqIGV4cG9ydCBjbGFzcyBZb3VySG9zdENvbXBvbmVudCB7XG4gKiAgIEBWaWV3Q2hpbGQoXCJ3aXphcmRcIikgd2l6YXJkOiBXaXphcmQ7XG4gKiAgIC4uLlxuICogfVxuICpcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgLyoqXG4gICAqIElzIG5vdGlmaWVkIHdoZW4gYSBwcmV2aW91cyBidXR0b24gaXMgY2xpY2tlZCBpbiB0aGUgd2l6YXJkLiBQZXJmb3JtcyBjaGVja3NcbiAgICogYmVmb3JlIGFsZXJ0aW5nIHRoZSBjdXJyZW50IHBhZ2Ugb2YgdGhlIGJ1dHRvbiBjbGljay4gRW5hY3RzIG5hdmlnYXRpb24gdG9cbiAgICogdGhlIHByZXZpb3VzIHBhZ2UgaWYgbm90IG92ZXJyaWRkZW4gYXQgdGhlIHBhZ2UgbGV2ZWwuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmROYXZpZ2F0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIHByZXZpb3VzQnV0dG9uU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgLyoqXG4gICAqIElzIG5vdGlmaWVkIHdoZW4gYSBOZXh0IGJ1dHRvbiBpcyBjbGlja2VkIGluIHRoZSB3aXphcmQuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmROYXZpZ2F0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIG5leHRCdXR0b25TdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAvKipcbiAgICogSXMgbm90aWZpZWQgd2hlbiBhIGRhbmdlciBidXR0b24gaXMgY2xpY2tlZCBpbiB0aGUgd2l6YXJkLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkTmF2aWdhdGlvblNlcnZpY2VcbiAgICovXG4gIHB1YmxpYyBkYW5nZXJCdXR0b25TdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAvKipcbiAgICogSXMgbm90aWZpZWQgd2hlbiBhICBmaW5pc2ggYnV0dG9uIGlzIGNsaWNrZWQgaW4gdGhlIHdpemFyZC5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgZmluaXNoQnV0dG9uU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgLyoqXG4gICAqIElzIG5vdGlmaWVkIHdoZW4gYSBDdXN0b20gYnV0dG9uIGlzIGNsaWNrZWQgaW4gdGhlIHdpemFyZC5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgY3VzdG9tQnV0dG9uU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgLyoqXG4gICAqIElzIG5vdGlmaWVkIHdoZW4gYSBDYW5jZWwgYnV0dG9uIGlzIGNsaWNrZWQgaW4gdGhlIHdpemFyZC4gTm90aWZpZXMgdGhlIHdpemFyZCxcbiAgICogd2hpY2ggaGFuZGxlcyBhbGwgY2FuY2VsIGZ1bmN0aW9uYWxpdHksIGlmIGNhbmNlbCBpcyBub3Qgb3ZlcnJpZGRlbiBhdCB0aGUgcGFnZVxuICAgKiBsZXZlbC5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgY2FuY2VsQnV0dG9uU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgLyoqXG4gICAqIFJlc2V0cyBuYXZpZ2F0aW9uIHRvIG1ha2UgdGhlIGZpcnN0IHBhZ2UgY3VycmVudCB3aGVuIHRoZSBwYWdlIGNvbGxlY3Rpb24gc2VydmljZVxuICAgKiBlbWl0cyBhbiBldmVudCBub3RpZnlpbmcgV2l6YXJkTmF2aWdhdGlvblNlcnZpY2UgdGhhdCBpdCBoYXMgcmVzZXQgYWxsIHBhZ2VzXG4gICAqIHRvIHRoZWlyIHByaXN0aW5lLCBpbmNvbXBsZXRlIHN0YXRlLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkTmF2aWdhdGlvblNlcnZpY2VcbiAgICovXG4gIHB1YmxpYyBwYWdlc1Jlc2V0U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgV2l6YXJkTmF2aWdhdGlvblNlcnZpY2UuIEFsc28gc2V0cyB1cCBzdWJzY3JpcHRpb25zXG4gICAqIHRoYXQgbGlzdGVuIHRvIHRoZSBidXR0b24gc2VydmljZSB0byBkZXRlcm1pbmUgd2hlbiBhIGJ1dHRvbiBoYXMgYmVlbiBjbGlja2VkXG4gICAqIGluIHRoZSB3aXphcmQuIElzIGFsc28gcmVzcG9uc2libGUgZm9yIHRha2luZyBhY3Rpb24gd2hlbiB0aGUgcGFnZSBjb2xsZWN0aW9uXG4gICAqIHJlcXVlc3RzIHRoYXQgbmF2aWdhdGlvbiBiZSByZXNldCB0byBpdHMgcHJpc3RpbmUgc3RhdGUuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmROYXZpZ2F0aW9uU2VydmljZVxuICAgKi9cbiAgY29uc3RydWN0b3IocHVibGljIHBhZ2VDb2xsZWN0aW9uOiBQYWdlQ29sbGVjdGlvblNlcnZpY2UsIHB1YmxpYyBidXR0b25TZXJ2aWNlOiBCdXR0b25IdWJTZXJ2aWNlKSB7XG4gICAgdGhpcy5wcmV2aW91c0J1dHRvblN1YnNjcmlwdGlvbiA9IHRoaXMuYnV0dG9uU2VydmljZS5wcmV2aW91c0J0bkNsaWNrZWQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGNvbnN0IGN1cnJlbnRQYWdlID0gdGhpcy5jdXJyZW50UGFnZTtcbiAgICAgIGlmICh0aGlzLmN1cnJlbnRQYWdlSXNGaXJzdCB8fCBjdXJyZW50UGFnZS5wcmV2aW91c1N0ZXBEaXNhYmxlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjdXJyZW50UGFnZS5wcmV2aW91c0J1dHRvbkNsaWNrZWQuZW1pdChjdXJyZW50UGFnZSk7XG4gICAgICBpZiAoIWN1cnJlbnRQYWdlLnByZXZlbnREZWZhdWx0KSB7XG4gICAgICAgIHRoaXMucHJldmlvdXMoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMubmV4dEJ1dHRvblN1YnNjcmlwdGlvbiA9IHRoaXMuYnV0dG9uU2VydmljZS5uZXh0QnRuQ2xpY2tlZC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5jaGVja0FuZENvbW1pdEN1cnJlbnRQYWdlKCduZXh0Jyk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmRhbmdlckJ1dHRvblN1YnNjcmlwdGlvbiA9IHRoaXMuYnV0dG9uU2VydmljZS5kYW5nZXJCdG5DbGlja2VkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLmNoZWNrQW5kQ29tbWl0Q3VycmVudFBhZ2UoJ2RhbmdlcicpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5maW5pc2hCdXR0b25TdWJzY3JpcHRpb24gPSB0aGlzLmJ1dHRvblNlcnZpY2UuZmluaXNoQnRuQ2xpY2tlZC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5jaGVja0FuZENvbW1pdEN1cnJlbnRQYWdlKCdmaW5pc2gnKTtcbiAgICB9KTtcblxuICAgIHRoaXMuY3VzdG9tQnV0dG9uU3Vic2NyaXB0aW9uID0gdGhpcy5idXR0b25TZXJ2aWNlLmN1c3RvbUJ0bkNsaWNrZWQuc3Vic2NyaWJlKCh0eXBlOiBzdHJpbmcpID0+IHtcbiAgICAgIGlmICghdGhpcy53aXphcmRTdG9wTmF2aWdhdGlvbikge1xuICAgICAgICB0aGlzLmN1cnJlbnRQYWdlLmN1c3RvbUJ1dHRvbkNsaWNrZWQuZW1pdCh0eXBlKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuY2FuY2VsQnV0dG9uU3Vic2NyaXB0aW9uID0gdGhpcy5idXR0b25TZXJ2aWNlLmNhbmNlbEJ0bkNsaWNrZWQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLndpemFyZFN0b3BOYXZpZ2F0aW9uKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuY3VycmVudFBhZ2UucHJldmVudERlZmF1bHQpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50UGFnZS5wYWdlT25DYW5jZWwuZW1pdCh0aGlzLmN1cnJlbnRQYWdlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY2FuY2VsKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLnBhZ2VzUmVzZXRTdWJzY3JpcHRpb24gPSB0aGlzLnBhZ2VDb2xsZWN0aW9uLnBhZ2VzUmVzZXQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuc2V0Rmlyc3RQYWdlQ3VycmVudCgpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmROYXZpZ2F0aW9uU2VydmljZVxuICAgKi9cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5wcmV2aW91c0J1dHRvblN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMubmV4dEJ1dHRvblN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuZGFuZ2VyQnV0dG9uU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5maW5pc2hCdXR0b25TdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLmN1c3RvbUJ1dHRvblN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuY2FuY2VsQnV0dG9uU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5wYWdlc1Jlc2V0U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9jdXJyZW50Q2hhbmdlZCA9IG5ldyBTdWJqZWN0PENscldpemFyZFBhZ2U+KCk7XG5cbiAgLyoqXG4gICAqIEFuIE9ic2VydmFibGUgdGhhdCBpcyBwcmVkb21pbmFudGx5IHVzZWQgYW1vbmdzdCB0aGUgc3ViY29tcG9uZW50cyBhbmQgc2VydmljZXNcbiAgICogb2YgdGhlIHdpemFyZC4gSXQgaXMgcmVjb21tZW5kZWQgdGhhdCB1c2VycyBsaXN0ZW4gdG8gdGhlIENscldpemFyZFBhZ2Uub25Mb2FkXG4gICAqIChjbHJXaXphcmRQYWdlT25Mb2FkKSBvdXRwdXQgaW5zdGVhZCBvZiB0aGlzIE9ic2VydmFibGUuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmROYXZpZ2F0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIGdldCBjdXJyZW50UGFnZUNoYW5nZWQoKTogT2JzZXJ2YWJsZTxDbHJXaXphcmRQYWdlPiB7XG4gICAgLy8gVE9ETzogTUFLRSBTVVJFIEVYVEVSTkFMIE9VVFBVVFMgU0FZICdDSEFOR0UnIE5PVCAnQ0hBTkdFRCdcbiAgICAvLyBBIEJSRUFLSU5HIENIQU5HRSBTTyBBV0FJVElORyBNSU5PUiBSRUxFQVNFXG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRDaGFuZ2VkLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgQm9vbGVhbiBmbGFnIHVzZWQgYnkgdGhlIENscldpemFyZFBhZ2UgdG8gYXZvaWQgYSByYWNlIGNvbmRpdGlvbiB3aGVuIHBhZ2VzIGFyZVxuICAgKiBsb2FkaW5nIGFuZCB0aGVyZSBpcyBubyBjdXJyZW50IHBhZ2UgZGVmaW5lZC5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgbmF2U2VydmljZUxvYWRlZCA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBBIGJvb2xlYW4gZmxhZyBzaGFyZWQgYWNyb3NzIHRoZSBXaXphcmQgc3ViY29tcG9uZW50cyB0aGF0IGZvbGxvd3MgdGhlIHZhbHVlXG4gICAqIG9mIHRoZSBXaXphcmQuZm9yY2VGb3J3YXJkIChjbHJXaXphcmRGb3JjZUZvcndhcmROYXZpZ2F0aW9uKSBpbnB1dC4gV2hlbiB0cnVlLFxuICAgKiBuYXZpZ2F0aW5nIGJhY2t3YXJkcyBpbiB0aGUgc3RlcG5hdiBtZW51IHdpbGwgcmVzZXQgYW55IHNraXBwZWQgcGFnZXMnIGNvbXBsZXRlZFxuICAgKiBzdGF0ZSB0byBmYWxzZS5cbiAgICpcbiAgICogVGhpcyBpcyB1c2VmdWwgd2hlbiBhIHdpemFyZCBleGVjdXRlcyB2YWxpZGF0aW9uIG9uIGEgcGFnZS1ieS1wYWdlIGJhc2lzIHdoZW5cbiAgICogdGhlIG5leHQgYnV0dG9uIGlzIGNsaWNrZWQuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmROYXZpZ2F0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIGZvcmNlRm9yd2FyZE5hdmlnYXRpb24gPSBmYWxzZTtcblxuICAvKipcbiAgICogQG1lbWJlcm9mIFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgZ2V0IGN1cnJlbnRQYWdlVGl0bGUoKTogVGVtcGxhdGVSZWY8YW55PiB7XG4gICAgLy8gd2hlbiB0aGUgcXVlcnlsaXN0IG9mIHBhZ2VzIGlzIGVtcHR5LiB0aGlzIGlzIHRoZSBmaXJzdCBwbGFjZSBpdCBmYWlscy4uLlxuICAgIGlmICghdGhpcy5jdXJyZW50UGFnZSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmN1cnJlbnRQYWdlLnRpdGxlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBCb29sZWFuIHRoYXQgdGVsbHMgeW91IHdoZXRoZXIgb3Igbm90IHRoZSBjdXJyZW50IHBhZ2UgaXMgdGhlIGZpcnN0XG4gICAqIHBhZ2UgaW4gdGhlIFdpemFyZC5cbiAgICpcbiAgICogVGhpcyBpcyBoZWxwZnVsIGZvciBkZXRlcm1pbmluZyB3aGV0aGVyIGEgcGFnZSBpcyBuYXZpZ2FibGUuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmROYXZpZ2F0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIGdldCBjdXJyZW50UGFnZUlzRmlyc3QoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMucGFnZUNvbGxlY3Rpb24uZmlyc3RQYWdlID09PSB0aGlzLmN1cnJlbnRQYWdlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBCb29sZWFuIHRoYXQgdGVsbHMgeW91IHdoZXRoZXIgb3Igbm90IHRoZSBjdXJyZW50IHBhZ2UgaXMgdGhlXG4gICAqIGxhc3QgcGFnZSBpbiB0aGUgV2l6YXJkLlxuICAgKlxuICAgKiBUaGlzIGlzIHVzZWQgdG8gZGV0ZXJtaW5lIHdoaWNoIGJ1dHRvbnMgc2hvdWxkIGRpc3BsYXkgaW4gdGhlIHdpemFyZCBmb290ZXIuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmROYXZpZ2F0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIGdldCBjdXJyZW50UGFnZUlzTGFzdCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5wYWdlQ29sbGVjdGlvbi5sYXN0UGFnZSA9PT0gdGhpcy5jdXJyZW50UGFnZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkTmF2aWdhdGlvblNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX2N1cnJlbnRQYWdlOiBDbHJXaXphcmRQYWdlO1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBDbHJXaXphcmRQYWdlIG9iamVjdCBvZiB0aGUgY3VycmVudCBwYWdlIG9yIG51bGwuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmROYXZpZ2F0aW9uU2VydmljZVxuICAgKi9cbiAgZ2V0IGN1cnJlbnRQYWdlKCk6IENscldpemFyZFBhZ2Uge1xuICAgIGlmICghdGhpcy5fY3VycmVudFBhZ2UpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fY3VycmVudFBhZ2U7XG4gIH1cblxuICAvKipcbiAgICogQWNjZXB0cyBhIENscldpemFyZFBhZ2Ugb2JqZWN0LCBzaW5jZSB0aGF0IG9iamVjdCB0byBiZSB0aGUgY3VycmVudC9hY3RpdmVcbiAgICogcGFnZSBpbiB0aGUgd2l6YXJkLCBhbmQgZW1pdHMgdGhlIENscldpemFyZFBhZ2Uub25Mb2FkIChjbHJXaXphcmRQYWdlT25Mb2FkKVxuICAgKiBldmVudCBmb3IgdGhhdCBwYWdlLlxuICAgKlxuICAgKiBOb3RlIHRoYXQgYWxsIG9mIHRoaXMgd29yayBpcyBieXBhc3NlZCBpZiB0aGUgQ2xyV2l6YXJkUGFnZSBvYmplY3QgaXMgYWxyZWFkeVxuICAgKiB0aGUgY3VycmVudCBwYWdlLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkTmF2aWdhdGlvblNlcnZpY2VcbiAgICovXG4gIHNldCBjdXJyZW50UGFnZShwYWdlOiBDbHJXaXphcmRQYWdlKSB7XG4gICAgaWYgKHRoaXMuX2N1cnJlbnRQYWdlICE9PSBwYWdlICYmICF0aGlzLndpemFyZFN0b3BOYXZpZ2F0aW9uKSB7XG4gICAgICB0aGlzLl9jdXJyZW50UGFnZSA9IHBhZ2U7XG4gICAgICBwYWdlLm9uTG9hZC5lbWl0KHBhZ2UuaWQpO1xuICAgICAgdGhpcy5fY3VycmVudENoYW5nZWQubmV4dChwYWdlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1lbWJlcm9mIFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9tb3ZlZFRvTmV4dFBhZ2UgPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuXG4gIC8qKlxuICAgKiBBbiBvYnNlcnZhYmxlIHVzZWQgaW50ZXJuYWxseSB0byBhbGVydCB0aGUgd2l6YXJkIHRoYXQgZm9yd2FyZCBuYXZpZ2F0aW9uXG4gICAqIGhhcyBvY2N1cnJlZC4gSXQgaXMgcmVjb21tZW5kZWQgdGhhdCB5b3UgdXNlIHRoZSBXaXphcmQub25Nb3ZlTmV4dFxuICAgKiAoY2xyV2l6YXJkT25OZXh0KSBvdXRwdXQgaW5zdGVhZCBvZiB0aGlzIG9uZS5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgZ2V0IG1vdmVkVG9OZXh0UGFnZSgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5fbW92ZWRUb05leHRQYWdlLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZW1iZXJvZiBXaXphcmROYXZpZ2F0aW9uU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfd2l6YXJkRmluaXNoZWQgPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuXG4gIC8qKlxuICAgKiBBbiBvYnNlcnZhYmxlIHVzZWQgaW50ZXJuYWxseSB0byBhbGVydCB0aGUgd2l6YXJkIHRoYXQgdGhlIG5hdiBzZXJ2aWNlXG4gICAqIGhhcyBhcHByb3ZlZCBjb21wbGV0aW9uIG9mIHRoZSB3aXphcmQuXG4gICAqXG4gICAqIEl0IGlzIHJlY29tbWVuZGVkIHRoYXQgeW91IHVzZSB0aGUgV2l6YXJkLndpemFyZEZpbmlzaGVkIChjbHJXaXphcmRPbkZpbmlzaClcbiAgICogb3V0cHV0IGluc3RlYWQgb2YgdGhpcyBvbmUuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmROYXZpZ2F0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIGdldCB3aXphcmRGaW5pc2hlZCgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5fd2l6YXJkRmluaXNoZWQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBpcyBhIHB1YmxpYyBmdW5jdGlvbiB0aGF0IGNhbiBiZSB1c2VkIHRvIHByb2dyYW1tYXRpY2FsbHkgYWR2YW5jZVxuICAgKiB0aGUgdXNlciB0byB0aGUgbmV4dCBwYWdlLlxuICAgKlxuICAgKiBXaGVuIGludm9rZWQsIHRoaXMgbWV0aG9kIHdpbGwgbW92ZSB0aGUgd2l6YXJkIHRvIHRoZSBuZXh0IHBhZ2UgYWZ0ZXJcbiAgICogc3VjY2Vzc2Z1bCB2YWxpZGF0aW9uLiBOb3RlIHRoYXQgdGhpcyBtZXRob2QgZ29lcyB0aHJvdWdoIGFsbCBjaGVja3NcbiAgICogYW5kIGV2ZW50IGVtaXNzaW9ucyBhcyBpZiBXaXphcmQubmV4dChmYWxzZSkgaGFkIGJlZW4gY2FsbGVkLlxuICAgKlxuICAgKiBJbiBtb3N0IGNhc2VzLCBpdCBtYWtlcyBtb3JlIHNlbnNlIHRvIHVzZSBXaXphcmQubmV4dChmYWxzZSkuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmROYXZpZ2F0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIG5leHQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY3VycmVudFBhZ2VJc0xhc3QpIHtcbiAgICAgIHRoaXMuY2hlY2tBbmRDb21taXRDdXJyZW50UGFnZSgnZmluaXNoJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5jaGVja0FuZENvbW1pdEN1cnJlbnRQYWdlKCduZXh0Jyk7XG5cbiAgICBpZiAoIXRoaXMud2l6YXJkSGFzQWx0TmV4dCAmJiAhdGhpcy53aXphcmRTdG9wTmF2aWdhdGlvbikge1xuICAgICAgdGhpcy5fbW92ZWRUb05leHRQYWdlLm5leHQodHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEJ5cGFzc2VzIGNoZWNrcyBhbmQgbW9zdCBldmVudCBlbWlzc2lvbnMgdG8gZm9yY2UgYSBwYWdlIHRvIG5hdmlnYXRlIGZvcndhcmQuXG4gICAqXG4gICAqIENvbXBhcmFibGUgdG8gY2FsbGluZyBXaXphcmQubmV4dCgpIG9yIFdpemFyZC5mb3JjZU5leHQoKS5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgZm9yY2VOZXh0KCk6IHZvaWQge1xuICAgIGNvbnN0IGN1cnJlbnRQYWdlOiBDbHJXaXphcmRQYWdlID0gdGhpcy5jdXJyZW50UGFnZTtcbiAgICBjb25zdCBuZXh0UGFnZTogQ2xyV2l6YXJkUGFnZSA9IHRoaXMucGFnZUNvbGxlY3Rpb24uZ2V0TmV4dFBhZ2UoY3VycmVudFBhZ2UpO1xuXG4gICAgLy8gY2F0Y2ggZXJyYW50IG51bGwgb3IgdW5kZWZpbmVkcyB0aGF0IGNyZWVwIGluXG4gICAgaWYgKCFuZXh0UGFnZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgd2l6YXJkIGhhcyBubyBuZXh0IHBhZ2UgdG8gZ28gdG8uJyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMud2l6YXJkU3RvcE5hdmlnYXRpb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIWN1cnJlbnRQYWdlLmNvbXBsZXRlZCkge1xuICAgICAgLy8gdGhpcyBpcyBhIHN0YXRlIHRoYXQgYWx0IG5leHQgZmxvd3MgY2FuIGdldCB0aGVtc2VsdmVzIGluLi4uXG4gICAgICB0aGlzLnBhZ2VDb2xsZWN0aW9uLmNvbW1pdFBhZ2UoY3VycmVudFBhZ2UpO1xuICAgIH1cbiAgICB0aGlzLmN1cnJlbnRQYWdlID0gbmV4dFBhZ2U7XG4gIH1cblxuICAvKipcbiAgICogQWNjZXB0cyBhIGJ1dHRvbi9hY3Rpb24gdHlwZSBhcyBhIHBhcmFtZXRlci4gRW5jYXBzdWxhdGVzIGFsbCBsb2dpYyBmb3JcbiAgICogZXZlbnQgZW1pc3Npb25zLCBzdGF0ZSBvZiB0aGUgY3VycmVudCBwYWdlLCBhbmQgd2l6YXJkIGFuZCBwYWdlIGxldmVsIG92ZXJyaWRlcy5cbiAgICpcbiAgICogQXZvaWQgY2FsbGluZyB0aGlzIGZ1bmN0aW9uIGRpcmVjdGx5IHVubGVzcyB5b3UgcmVhbGx5IGtub3cgd2hhdCB5b3UncmUgZG9pbmcuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmROYXZpZ2F0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIGNoZWNrQW5kQ29tbWl0Q3VycmVudFBhZ2UoYnV0dG9uVHlwZTogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgY3VycmVudFBhZ2U6IENscldpemFyZFBhZ2UgPSB0aGlzLmN1cnJlbnRQYWdlO1xuICAgIGxldCBpQW1UaGVMYXN0UGFnZTogYm9vbGVhbjtcblxuICAgIGxldCBpc05leHQ6IGJvb2xlYW47XG4gICAgbGV0IGlzRGFuZ2VyOiBib29sZWFuO1xuICAgIGxldCBpc0Rhbmdlck5leHQ6IGJvb2xlYW47XG4gICAgbGV0IGlzRGFuZ2VyRmluaXNoOiBib29sZWFuO1xuICAgIGxldCBpc0ZpbmlzaDogYm9vbGVhbjtcblxuICAgIGlmICghY3VycmVudFBhZ2UucmVhZHlUb0NvbXBsZXRlIHx8IHRoaXMud2l6YXJkU3RvcE5hdmlnYXRpb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpQW1UaGVMYXN0UGFnZSA9IHRoaXMuY3VycmVudFBhZ2VJc0xhc3Q7XG5cbiAgICBpc05leHQgPSBidXR0b25UeXBlID09PSAnbmV4dCc7XG4gICAgaXNEYW5nZXIgPSBidXR0b25UeXBlID09PSAnZGFuZ2VyJztcbiAgICBpc0Rhbmdlck5leHQgPSBpc0RhbmdlciAmJiAhaUFtVGhlTGFzdFBhZ2U7XG4gICAgaXNEYW5nZXJGaW5pc2ggPSBpc0RhbmdlciAmJiBpQW1UaGVMYXN0UGFnZTtcbiAgICBpc0ZpbmlzaCA9IGJ1dHRvblR5cGUgPT09ICdmaW5pc2gnIHx8IGlzRGFuZ2VyRmluaXNoO1xuXG4gICAgaWYgKGlzRmluaXNoICYmICFpQW1UaGVMYXN0UGFnZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGN1cnJlbnRQYWdlLnByaW1hcnlCdXR0b25DbGlja2VkLmVtaXQoYnV0dG9uVHlwZSk7XG5cbiAgICBpZiAoaXNGaW5pc2gpIHtcbiAgICAgIGN1cnJlbnRQYWdlLmZpbmlzaEJ1dHRvbkNsaWNrZWQuZW1pdChjdXJyZW50UGFnZSk7XG4gICAgfSBlbHNlIGlmIChpc0Rhbmdlcikge1xuICAgICAgY3VycmVudFBhZ2UuZGFuZ2VyQnV0dG9uQ2xpY2tlZC5lbWl0KCk7XG4gICAgfSBlbHNlIGlmIChpc05leHQpIHtcbiAgICAgIGN1cnJlbnRQYWdlLm5leHRCdXR0b25DbGlja2VkLmVtaXQoKTtcbiAgICB9XG5cbiAgICBpZiAoY3VycmVudFBhZ2Uuc3RvcE5leHQgfHwgY3VycmVudFBhZ2UucHJldmVudERlZmF1bHQpIHtcbiAgICAgIGN1cnJlbnRQYWdlLm9uQ29tbWl0LmVtaXQoY3VycmVudFBhZ2UuaWQpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIG9yZGVyIGlzIHZlcnkgaW1wb3J0YW50IHdpdGggdGhlc2UgZW1pdHRlcnMhXG4gICAgaWYgKGlzRmluaXNoKSB7XG4gICAgICAvLyBtYXJrIHBhZ2UgYXMgY29tcGxldGVcbiAgICAgIGlmICghdGhpcy53aXphcmRIYXNBbHROZXh0KSB7XG4gICAgICAgIHRoaXMucGFnZUNvbGxlY3Rpb24uY29tbWl0UGFnZShjdXJyZW50UGFnZSk7XG4gICAgICB9XG4gICAgICB0aGlzLl93aXphcmRGaW5pc2hlZC5uZXh0KCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMud2l6YXJkSGFzQWx0TmV4dCkge1xuICAgICAgdGhpcy5wYWdlQ29sbGVjdGlvbi5jb21taXRQYWdlKGN1cnJlbnRQYWdlKTtcblxuICAgICAgaWYgKGlzTmV4dCB8fCBpc0Rhbmdlck5leHQpIHtcbiAgICAgICAgdGhpcy5fbW92ZWRUb05leHRQYWdlLm5leHQodHJ1ZSk7XG4gICAgICB9XG4gICAgICAvLyBqdW1wIG91dCBoZXJlLCBubyBtYXR0ZXIgd2hhdCB0eXBlIHdlJ3JlIGxvb2tpbmcgYXRcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoaXNOZXh0IHx8IGlzRGFuZ2VyTmV4dCkge1xuICAgICAgdGhpcy5mb3JjZU5leHQoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBpcyBhIHB1YmxpYyBmdW5jdGlvbiB0aGF0IGNhbiBiZSB1c2VkIHRvIHByb2dyYW1tYXRpY2FsbHkgY29uY2x1ZGVcbiAgICogdGhlIHdpemFyZC5cbiAgICpcbiAgICogV2hlbiBpbnZva2VkLCB0aGlzIG1ldGhvZCB3aWxsICBpbml0aWF0ZSB0aGUgd29yayBpbnZvbHZlZCB3aXRoIGZpbmFsaXppbmdcbiAgICogYW5kIGZpbmlzaGluZyB0aGUgd2l6YXJkIHdvcmtmbG93LiBOb3RlIHRoYXQgdGhpcyBtZXRob2QgZ29lcyB0aHJvdWdoIGFsbFxuICAgKiBjaGVja3MgYW5kIGV2ZW50IGVtaXNzaW9ucyBhcyBpZiBXaXphcmQuZmluaXNoKGZhbHNlKSBoYWQgYmVlbiBjYWxsZWQuXG4gICAqXG4gICAqIEluIG1vc3QgY2FzZXMsIGl0IG1ha2VzIG1vcmUgc2Vuc2UgdG8gdXNlIFdpemFyZC5maW5pc2goZmFsc2UpLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkTmF2aWdhdGlvblNlcnZpY2VcbiAgICovXG4gIHB1YmxpYyBmaW5pc2goKTogdm9pZCB7XG4gICAgdGhpcy5jaGVja0FuZENvbW1pdEN1cnJlbnRQYWdlKCdmaW5pc2gnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkTmF2aWdhdGlvblNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX21vdmVkVG9QcmV2aW91c1BhZ2UgPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuXG4gIC8qKlxuICAgKiBOb3RpZmllcyB0aGUgd2l6YXJkIHdoZW4gYmFja3dhcmRzIG5hdmlnYXRpb24gaGFzIG9jY3VycmVkIHZpYSB0aGVcbiAgICogcHJldmlvdXMgYnV0dG9uLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkTmF2aWdhdGlvblNlcnZpY2VcbiAgICovXG4gIHB1YmxpYyBnZXQgbW92ZWRUb1ByZXZpb3VzUGFnZSgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5fbW92ZWRUb1ByZXZpb3VzUGFnZS5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcm9ncmFtbWF0aWNhbGx5IG1vdmVzIHRoZSB3aXphcmQgdG8gdGhlIHBhZ2UgYmVmb3JlIHRoZSBjdXJyZW50IHBhZ2UuXG4gICAqXG4gICAqIEluIG1vc3QgaW5zdGFuY2VzLCBpdCBtYWtlcyBtb3JlIHNlbnNlIHRvIGNhbGwgV2l6YXJkLnByZXZpb3VzKClcbiAgICogd2hpY2ggZG9lcyB0aGUgc2FtZSB0aGluZy5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgcHJldmlvdXMoKTogdm9pZCB7XG4gICAgbGV0IHByZXZpb3VzUGFnZTogQ2xyV2l6YXJkUGFnZTtcblxuICAgIGlmICh0aGlzLmN1cnJlbnRQYWdlSXNGaXJzdCB8fCB0aGlzLndpemFyZFN0b3BOYXZpZ2F0aW9uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcHJldmlvdXNQYWdlID0gdGhpcy5wYWdlQ29sbGVjdGlvbi5nZXRQcmV2aW91c1BhZ2UodGhpcy5jdXJyZW50UGFnZSk7XG5cbiAgICBpZiAoIXByZXZpb3VzUGFnZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX21vdmVkVG9QcmV2aW91c1BhZ2UubmV4dCh0cnVlKTtcblxuICAgIGlmICh0aGlzLmZvcmNlRm9yd2FyZE5hdmlnYXRpb24pIHtcbiAgICAgIHRoaXMuY3VycmVudFBhZ2UuY29tcGxldGVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgdGhpcy5jdXJyZW50UGFnZSA9IHByZXZpb3VzUGFnZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkTmF2aWdhdGlvblNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX2NhbmNlbFdpemFyZCA9IG5ldyBTdWJqZWN0PGFueT4oKTtcblxuICAvKipcbiAgICogTm90aWZpZXMgdGhlIHdpemFyZCB0aGF0IGEgdXNlciBpcyB0cnlpbmcgdG8gY2FuY2VsIGl0LlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkTmF2aWdhdGlvblNlcnZpY2VcbiAgICovXG4gIHB1YmxpYyBnZXQgbm90aWZ5V2l6YXJkQ2FuY2VsKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuX2NhbmNlbFdpemFyZC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBbGxvd3MgYSBob29rIGludG8gdGhlIGNhbmNlbCB3b3JrZmxvdyBvZiB0aGUgd2l6YXJkIGZyb20gdGhlIG5hdiBzZXJ2aWNlLiBOb3RlIHRoYXRcbiAgICogdGhpcyByb3V0ZSBnb2VzIHRocm91Z2ggYWxsIGNoZWNrcyBhbmQgZXZlbnQgZW1pc3Npb25zIGFzIGlmIGEgY2FuY2VsIGJ1dHRvbiBoYWRcbiAgICogYmVlbiBjbGlja2VkLlxuICAgKlxuICAgKiBJbiBtb3N0IGNhc2VzLCB1c2VycyBsb29raW5nIGZvciBhIGhvb2sgaW50byB0aGUgY2FuY2VsIHJvdXRpbmUgYXJlIGFjdHVhbGx5IGxvb2tpbmdcbiAgICogZm9yIGEgd2F5IHRvIGNsb3NlIHRoZSB3aXphcmQgZnJvbSB0aGVpciBob3N0IGNvbXBvbmVudCBiZWNhdXNlIHRoZXkgaGF2ZSBwcmV2ZW50ZWRcbiAgICogdGhlIGRlZmF1bHQgY2FuY2VsIGFjdGlvbi5cbiAgICpcbiAgICogSW4gdGhpcyBpbnN0YW5jZSwgaXQgaXMgcmVjb21tZW5kZWQgdGhhdCB5b3UgdXNlIFdpemFyZC5jbG9zZSgpIHRvIGF2b2lkIGFueSBldmVudFxuICAgKiBlbWlzc2lvbiBsb29wIHJlc3VsdGluZyBmcm9tIGFuIGV2ZW50IGhhbmRsZXIgY2FsbGluZyBiYWNrIGludG8gcm91dGluZSB0aGF0IHdpbGxcbiAgICogYWdhaW4gZXZva2UgdGhlIGV2ZW50cyBpdCBoYW5kbGVzLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkTmF2aWdhdGlvblNlcnZpY2VcbiAgICovXG4gIHB1YmxpYyBjYW5jZWwoKTogdm9pZCB7XG4gICAgdGhpcy5fY2FuY2VsV2l6YXJkLm5leHQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIGJvb2xlYW4gZmxhZyBzaGFyZWQgYWNyb3NzIHRoZSBXaXphcmQgc3ViY29tcG9uZW50cyB0aGF0IGZvbGxvd3MgdGhlIHZhbHVlXG4gICAqIG9mIHRoZSBXaXphcmQuc3RvcENhbmNlbCAoY2xyV2l6YXJkUHJldmVudERlZmF1bHRDYW5jZWwpIGlucHV0LiBXaGVuIHRydWUsIHRoZSBjYW5jZWxcbiAgICogcm91dGluZSBpcyBzdWJ2ZXJ0ZWQgYW5kIG11c3QgYmUgcmVpbnN0YXRlZCBpbiB0aGUgaG9zdCBjb21wb25lbnQgY2FsbGluZyBXaXphcmQuY2xvc2UoKVxuICAgKiBhdCBzb21lIHBvaW50LlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkTmF2aWdhdGlvblNlcnZpY2VcbiAgICovXG4gIHB1YmxpYyB3aXphcmRIYXNBbHRDYW5jZWw6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKipcbiAgICogQSBib29sZWFuIGZsYWcgc2hhcmVkIGFjcm9zcyB0aGUgV2l6YXJkIHN1YmNvbXBvbmVudHMgdGhhdCBmb2xsb3dzIHRoZSB2YWx1ZVxuICAgKiBvZiB0aGUgV2l6YXJkLnN0b3BOZXh0IChjbHJXaXphcmRQcmV2ZW50RGVmYXVsdE5leHQpIGlucHV0LiBXaGVuIHRydWUsIHRoZSBuZXh0IGFuZCBmaW5pc2hcbiAgICogcm91dGluZXMgYXJlIHN1YnZlcnRlZCBhbmQgbXVzdCBiZSByZWluc3RhdGVkIGluIHRoZSBob3N0IGNvbXBvbmVudCBjYWxsaW5nIFdpemFyZC5uZXh0KCksXG4gICAqIFdpemFyZC5mb3JjZU5leHQoKSwgV2l6YXJkLmZpbmlzaCgpLCBvciBXaXphcmQuZm9yY2VGaW5pc2goKS5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgd2l6YXJkSGFzQWx0TmV4dDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBBIGJvb2xlYW4gZmxhZyBzaGFyZWQgYWNyb3NzIHRoZSBXaXphcmQgc3ViY29tcG9uZW50cyB0aGF0IGZvbGxvd3MgdGhlIHZhbHVlXG4gICAqIG9mIHRoZSBXaXphcmQuc3RvcE5hdmlnYXRpb24gKGNscldpemFyZFByZXZlbnROYXZpZ2F0aW9uKSBpbnB1dC4gV2hlbiB0cnVlLCBhbGxcbiAgICogbmF2aWdhdGlvbmFsIGVsZW1lbnRzIGluIHRoZSB3aXphcmQgYXJlIGRpc2FibGVkLlxuICAgKlxuICAgKiBUaGlzIGlzIGludGVuZGVkIHRvIGZyZWV6ZSB0aGUgd2l6YXJkIGluIHBsYWNlLiBFdmVudHMgYXJlIG5vdCBmaXJlZCBzbyB0aGlzIGlzXG4gICAqIG5vdCBhIHdheSB0byBpbXBsZW1lbnQgYWx0ZXJuYXRlIGZ1bmN0aW9uYWxpdHkgZm9yIG5hdmlnYXRpb24uXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmROYXZpZ2F0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIHdpemFyZFN0b3BOYXZpZ2F0aW9uOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIEEgYm9vbGVhbiBmbGFnIHNoYXJlZCB3aXRoIHRoZSBzdGVwbmF2IGl0ZW1zIHRoYXQgcHJldmVudHMgdXNlciBjbGlja3Mgb25cbiAgICogc3RlcG5hdiBpdGVtcyBmcm9tIG5hdmlnYXRpbmcgdGhlIHdpemFyZC5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgd2l6YXJkRGlzYWJsZVN0ZXBuYXY6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKipcbiAgICogUGVyZm9ybXMgYWxsIHJlcXVpcmVkIGNoZWNrcyB0byBkZXRlcm1pbmUgaWYgYSB1c2VyIGNhbiBuYXZpZ2F0ZSB0byBhIHBhZ2UuIENoZWNraW5nIGF0IGVhY2hcbiAgICogcG9pbnQgaWYgYSBwYWdlIGlzIG5hdmlnYWJsZSAtLSBjb21wbGV0ZWQgd2hlcmUgdGhlIHBhZ2UgaW1tZWRpYXRlbHkgYWZ0ZXIgdGhlIGxhc3QgY29tcGxldGVkXG4gICAqIHBhZ2UuXG4gICAqXG4gICAqIFRha2VzIHR3byBwYXJhbWV0ZXJzLiBUaGUgZmlyc3Qgb25lIG11c3QgYmUgZWl0aGVyIHRoZSBDbHJXaXphcmRQYWdlIG9iamVjdCBvciB0aGUgSUQgb2YgdGhlXG4gICAqIENscldpemFyZFBhZ2Ugb2JqZWN0IHRoYXQgeW91IHdhbnQgdG8gbWFrZSB0aGUgY3VycmVudCBwYWdlLlxuICAgKlxuICAgKiBUaGUgc2Vjb25kIHBhcmFtZXRlciBpcyBvcHRpb25hbCBhbmQgaXMgYSBCb29sZWFuIGZsYWcgZm9yIFwibGF6eSBjb21wbGV0aW9uXCIuIFdoYXQgdGhpcyBtZWFuc1xuICAgKiBpcyB0aGUgV2l6YXJkIHdpbGwgbWFyayBhbGwgcGFnZXMgYmV0d2VlbiB0aGUgY3VycmVudCBwYWdlIGFuZCB0aGUgcGFnZSB5b3Ugd2FudCB0byBuYXZpZ2F0ZVxuICAgKiB0byBhcyBjb21wbGV0ZWQuIFRoaXMgaXMgdXNlZnVsIGZvciBpbmZvcm1hdGlvbmFsIHdpemFyZHMgdGhhdCBkbyBub3QgcmVxdWlyZSB1c2VyIGFjdGlvbixcbiAgICogYWxsb3dpbmcgYW4gZWFzeSBtZWFucyBmb3IgdXNlcnMgdG8ganVtcCBhaGVhZC5cbiAgICpcbiAgICogVG8gYXZvaWQgY2hlY2tzIG9uIG5hdmlnYXRpb24sIHVzZSBDbHJXaXphcmRQYWdlLm1ha2VDdXJyZW50KCkgaW5zdGVhZC5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgZ29UbyhwYWdlVG9Hb1RvT3JJZDogYW55LCBsYXp5Q29tcGxldGU6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgIGxldCBwYWdlVG9Hb1RvOiBDbHJXaXphcmRQYWdlO1xuICAgIGxldCBjdXJyZW50UGFnZTogQ2xyV2l6YXJkUGFnZTtcbiAgICBsZXQgbXlQYWdlczogUGFnZUNvbGxlY3Rpb25TZXJ2aWNlO1xuICAgIGxldCBwYWdlc1RvQ2hlY2s6IENscldpemFyZFBhZ2VbXTtcbiAgICBsZXQgb2theVRvTW92ZTogYm9vbGVhbjtcbiAgICBsZXQgZ29pbmdGb3J3YXJkOiBib29sZWFuO1xuICAgIGxldCBjdXJyZW50UGFnZUluZGV4OiBudW1iZXI7XG4gICAgbGV0IGdvVG9QYWdlSW5kZXg6IG51bWJlcjtcblxuICAgIG15UGFnZXMgPSB0aGlzLnBhZ2VDb2xsZWN0aW9uO1xuICAgIHBhZ2VUb0dvVG8gPSB0eXBlb2YgcGFnZVRvR29Ub09ySWQgPT09ICdzdHJpbmcnID8gbXlQYWdlcy5nZXRQYWdlQnlJZChwYWdlVG9Hb1RvT3JJZCkgOiBwYWdlVG9Hb1RvT3JJZDtcbiAgICBjdXJyZW50UGFnZSA9IHRoaXMuY3VycmVudFBhZ2U7XG5cbiAgICAvLyBubyBwb2ludCBpbiBnb2luZyB0byB0aGUgY3VycmVudCBwYWdlLiB5b3UncmUgdGhlcmUgYWxyZWFkeSFcbiAgICAvLyBhbHNvIGhhcmQgYmxvY2sgb24gYW55IG5hdmlnYXRpb24gd2hlbiBzdG9wTmF2aWdhdGlvbiBpcyB0cnVlXG4gICAgaWYgKHBhZ2VUb0dvVG8gPT09IGN1cnJlbnRQYWdlIHx8IHRoaXMud2l6YXJkU3RvcE5hdmlnYXRpb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjdXJyZW50UGFnZUluZGV4ID0gbXlQYWdlcy5nZXRQYWdlSW5kZXgoY3VycmVudFBhZ2UpO1xuICAgIGdvVG9QYWdlSW5kZXggPSBteVBhZ2VzLmdldFBhZ2VJbmRleChwYWdlVG9Hb1RvKTtcbiAgICBnb2luZ0ZvcndhcmQgPSBnb1RvUGFnZUluZGV4ID4gY3VycmVudFBhZ2VJbmRleDtcbiAgICBwYWdlc1RvQ2hlY2sgPSBteVBhZ2VzLmdldFBhZ2VSYW5nZUZyb21QYWdlcyh0aGlzLmN1cnJlbnRQYWdlLCBwYWdlVG9Hb1RvKTtcblxuICAgIG9rYXlUb01vdmUgPSBsYXp5Q29tcGxldGUgfHwgdGhpcy5jYW5Hb1RvKHBhZ2VzVG9DaGVjayk7XG5cbiAgICBpZiAoIW9rYXlUb01vdmUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoZ29pbmdGb3J3YXJkICYmIGxhenlDb21wbGV0ZSkge1xuICAgICAgcGFnZXNUb0NoZWNrLmZvckVhY2goKHBhZ2U6IENscldpemFyZFBhZ2UpID0+IHtcbiAgICAgICAgaWYgKHBhZ2UgIT09IHBhZ2VUb0dvVG8pIHtcbiAgICAgICAgICBwYWdlLmNvbXBsZXRlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoIWdvaW5nRm9yd2FyZCAmJiB0aGlzLmZvcmNlRm9yd2FyZE5hdmlnYXRpb24pIHtcbiAgICAgIHBhZ2VzVG9DaGVjay5mb3JFYWNoKChwYWdlOiBDbHJXaXphcmRQYWdlKSA9PiB7XG4gICAgICAgIHBhZ2UuY29tcGxldGVkID0gZmFsc2U7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLmN1cnJlbnRQYWdlID0gcGFnZVRvR29UbztcbiAgfVxuXG4gIC8qKlxuICAgKiBBY2NlcHRzIGEgcmFuZ2Ugb2YgQ2xyV2l6YXJkUGFnZSBvYmplY3RzIGFzIGEgcGFyYW1ldGVyLiBQZXJmb3JtcyB0aGUgd29yayBvZiBjaGVja2luZ1xuICAgKiB0aG9zZSBvYmplY3RzIHRvIGRldGVybWluZSBpZiBuYXZpZ2F0aW9uIGNhbiBiZSBhY2NvbXBsaXNoZWQuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmROYXZpZ2F0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIGNhbkdvVG8ocGFnZXNUb0NoZWNrOiBDbHJXaXphcmRQYWdlW10pOiBib29sZWFuIHtcbiAgICBsZXQgb2theVRvTW92ZSA9IHRydWU7XG4gICAgY29uc3QgbXlQYWdlcyA9IHRoaXMucGFnZUNvbGxlY3Rpb247XG5cbiAgICAvLyBwcmV2aW91cyBwYWdlIGNhbiBiZSBpbXBvcnRhbnQgd2hlbiBtb3ZpbmcgYmVjYXVzZSBpZiBpdCdzIGNvbXBsZXRlZCBpdFxuICAgIC8vIGFsbG93cyB1cyB0byBtb3ZlIHRvIHRoZSBwYWdlIGV2ZW4gaWYgaXQncyBpbmNvbXBsZXRlLi4uXG4gICAgbGV0IHByZXZpb3VzUGFnZVBhc3NlczogYm9vbGVhbjtcblxuICAgIGlmICghcGFnZXNUb0NoZWNrIHx8IHBhZ2VzVG9DaGVjay5sZW5ndGggPCAxKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcGFnZXNUb0NoZWNrLmZvckVhY2goKHBhZ2U6IENscldpemFyZFBhZ2UpID0+IHtcbiAgICAgIGxldCBwcmV2aW91c1BhZ2U6IENscldpemFyZFBhZ2U7XG5cbiAgICAgIGlmICghb2theVRvTW92ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChwYWdlLmNvbXBsZXRlZCkge1xuICAgICAgICAvLyBkZWZhdWx0IGlzIHRydWUuIGp1c3QganVtcCBvdXQgaW5zdGVhZCBvZiBjb21wbGljYXRpbmcgaXQuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gc28gd2Uga25vdyBvdXIgcGFnZSBpcyBub3QgY29tcGxldGVkLi4uXG4gICAgICBwcmV2aW91c1BhZ2UgPSBteVBhZ2VzLmdldFBhZ2VJbmRleChwYWdlKSA+IDAgPyBteVBhZ2VzLmdldFByZXZpb3VzUGFnZShwYWdlKSA6IG51bGw7XG4gICAgICBwcmV2aW91c1BhZ2VQYXNzZXMgPSBwcmV2aW91c1BhZ2UgPT09IG51bGwgfHwgcHJldmlvdXNQYWdlLmNvbXBsZXRlZCA9PT0gdHJ1ZTtcblxuICAgICAgLy8gd2UgYXJlIGZhbHNlIGlmIG5vdCB0aGUgY3VycmVudCBwYWdlIEFORCBwcmV2aW91cyBwYWdlIGlzIG5vdCBjb21wbGV0ZWRcbiAgICAgIC8vIChidXQgbXVzdCBoYXZlIGEgcHJldmlvdXMgcGFnZSlcbiAgICAgIGlmICghcGFnZS5jdXJyZW50ICYmICFwcmV2aW91c1BhZ2VQYXNzZXMpIHtcbiAgICAgICAgb2theVRvTW92ZSA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgLy8gZmFsbHMgdGhyb3VnaCB0byB0cnVlIGFzIGRlZmF1bHRcbiAgICB9KTtcblxuICAgIHJldHVybiBva2F5VG9Nb3ZlO1xuICB9XG5cbiAgLyoqXG4gICAqIExvb2tzIHRocm91Z2ggdGhlIGNvbGxlY3Rpb24gb2YgcGFnZXMgdG8gZmluZCB0aGUgZmlyc3Qgb25lIHRoYXQgaXMgaW5jb21wbGV0ZVxuICAgKiBhbmQgbWFrZXMgdGhhdCBwYWdlIHRoZSBjdXJyZW50L2FjdGl2ZSBwYWdlLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkTmF2aWdhdGlvblNlcnZpY2VcbiAgICovXG4gIHB1YmxpYyBzZXRMYXN0RW5hYmxlZFBhZ2VDdXJyZW50KCk6IHZvaWQge1xuICAgIGNvbnN0IGFsbFBhZ2VzOiBDbHJXaXphcmRQYWdlW10gPSB0aGlzLnBhZ2VDb2xsZWN0aW9uLnBhZ2VzQXNBcnJheTtcbiAgICBsZXQgbGFzdENvbXBsZXRlZFBhZ2VJbmRleDogbnVtYmVyID0gbnVsbDtcblxuICAgIGFsbFBhZ2VzLmZvckVhY2goKHBhZ2U6IENscldpemFyZFBhZ2UsIGluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgIGlmIChwYWdlLmNvbXBsZXRlZCkge1xuICAgICAgICBsYXN0Q29tcGxldGVkUGFnZUluZGV4ID0gaW5kZXg7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAobGFzdENvbXBsZXRlZFBhZ2VJbmRleCA9PT0gbnVsbCkge1xuICAgICAgLy8gYWx3YXlzIGlzIGF0IGxlYXN0IHRoZSBmaXJzdCBpdGVtLi4uXG4gICAgICBsYXN0Q29tcGxldGVkUGFnZUluZGV4ID0gMDtcbiAgICB9IGVsc2UgaWYgKGxhc3RDb21wbGV0ZWRQYWdlSW5kZXggKyAxIDwgYWxsUGFnZXMubGVuZ3RoKSB7XG4gICAgICBsYXN0Q29tcGxldGVkUGFnZUluZGV4ID0gbGFzdENvbXBsZXRlZFBhZ2VJbmRleCArIDE7XG4gICAgfVxuXG4gICAgdGhpcy5jdXJyZW50UGFnZSA9IGFsbFBhZ2VzW2xhc3RDb21wbGV0ZWRQYWdlSW5kZXhdO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmRzIHRoZSBmaXJzdCBwYWdlIGluIHRoZSBjb2xsZWN0aW9uIG9mIHBhZ2VzIGFuZCBtYWtlcyB0aGF0IHBhZ2UgdGhlXG4gICAqIGN1cnJlbnQvYWN0aXZlIHBhZ2UuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmROYXZpZ2F0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIHNldEZpcnN0UGFnZUN1cnJlbnQoKTogdm9pZCB7XG4gICAgdGhpcy5jdXJyZW50UGFnZSA9IHRoaXMucGFnZUNvbGxlY3Rpb24ucGFnZXNBc0FycmF5WzBdO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIHN0ZXBuYXYgb24gdGhlIGxlZnQgc2lkZSBvZiB0aGUgd2l6YXJkIHdoZW4gcGFnZXMgYXJlIGR5bmFtaWNhbGx5XG4gICAqIGFkZGVkIG9yIHJlbW92ZWQgZnJvbSB0aGUgY29sbGVjdGlvbiBvZiBwYWdlcy5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlTmF2aWdhdGlvbigpOiB2b2lkIHtcbiAgICBsZXQgdG9TZXRDdXJyZW50OiBDbHJXaXphcmRQYWdlO1xuICAgIGxldCBjdXJyZW50UGFnZVJlbW92ZWQ6IGJvb2xlYW47XG5cbiAgICB0aGlzLnBhZ2VDb2xsZWN0aW9uLnVwZGF0ZUNvbXBsZXRlZFN0YXRlcygpO1xuXG4gICAgY3VycmVudFBhZ2VSZW1vdmVkID0gdGhpcy5wYWdlQ29sbGVjdGlvbi5wYWdlc0FzQXJyYXkuaW5kZXhPZih0aGlzLmN1cnJlbnRQYWdlKSA8IDA7XG4gICAgaWYgKGN1cnJlbnRQYWdlUmVtb3ZlZCkge1xuICAgICAgdG9TZXRDdXJyZW50ID0gdGhpcy5wYWdlQ29sbGVjdGlvbi5maW5kRmlyc3RJbmNvbXBsZXRlUGFnZSgpO1xuICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IHRvU2V0Q3VycmVudDtcbiAgICB9XG4gIH1cbn1cbiJdfQ==