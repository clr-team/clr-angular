/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ContentChildren, ElementRef, EventEmitter, Input, IterableDiffers, Output, QueryList, } from '@angular/core';
import { ButtonHubService } from './providers/button-hub.service';
import { HeaderActionService } from './providers/header-actions.service';
import { PageCollectionService } from './providers/page-collection.service';
// providers
import { WizardNavigationService } from './providers/wizard-navigation.service';
import { ClrWizardHeaderAction } from './wizard-header-action';
import { ClrWizardPage } from './wizard-page';
/**
 *
 * The Wizard component
 *
 */
export class ClrWizard {
    /**
     * Creates an instance of Wizard.
     *
     * \@memberof Wizard
     *
     * @param {?} navService
     * @param {?} pageCollection
     * @param {?} buttonService
     * @param {?} headerActionService
     * @param {?} elementRef
     * @param {?} differs
     */
    constructor(navService, pageCollection, buttonService, headerActionService, elementRef, differs) {
        this.navService = navService;
        this.pageCollection = pageCollection;
        this.buttonService = buttonService;
        this.headerActionService = headerActionService;
        this.elementRef = elementRef;
        /**
         * Contains the size defined by the clrWizardSize input
         *
         * \@memberof Wizard
         *
         */
        this.size = 'xl';
        this._forceForward = false;
        /**
         * Tells the modal part of the wizard whether it should have a close "X"
         * in the top right corner. Set with the clrWizardClosable input.
         *
         * \@memberof Wizard
         *
         */
        this.closable = true;
        /**
         * Toggles open/close of the wizard component. Set using the clrWizardOpen
         * input.
         *
         * \@memberof Wizard
         *
         */
        this._open = false;
        /**
         * Emits when the wizard is opened or closed. Emits through the
         * clrWizardOpenChange output. Works in conjunction with the
         * clrWizardOpen binding so you can use...
         *
         * <clr-wizard [(clrWizardOpen)]="blah"
         * ...or...
         * <clr-wizard [clrWizardOpen]="something" (clrWizardOpenChange)="doSomethign($event)">
         *
         * ...for two-way binding.
         *
         * \@memberof Wizard
         *
         */
        this._openChanged = new EventEmitter(false);
        /**
         * Emits when the wizard is canceled. Can be observed through the clrWizardOnCancel
         * output.
         *
         * Can be combined with the clrWizardPreventDefaultCancel input to create
         * wizard-level custom cancel routines.
         *
         * \@memberof Wizard
         *
         */
        this.onCancel = new EventEmitter(false);
        /**
         * Emits when the wizard is completed. Can be observed through the clrWizardOnFinish
         * output.
         *
         * Can be combined with the clrWizardPreventDefaultNext input to create
         * wizard-level custom completion routines.
         *
         * \@memberof Wizard
         *
         */
        this.wizardFinished = new EventEmitter(false);
        /**
         * Emits when the wizard is reset. See .reset(). Can be observed through
         * the clrWizardOnReset output.
         *
         * \@memberof Wizard
         *
         */
        this.onReset = new EventEmitter(false);
        /**
         * Emits when the current page has changed. Can be observed through the clrWizardCurrentPageChanged
         * output. This can happen on .next() or .previous().
         * Useful for non-blocking validation.
         *
         * \@memberof Wizard
         *
         */
        this.currentPageChanged = new EventEmitter(false);
        /**
         * Emits when the wizard moves to the next page. Can be observed through the clrWizardOnNext
         * output.
         *
         * Can be combined with the clrWizardPreventDefaultNext input to create
         * wizard-level custom navigation routines, which are useful for validation.
         *
         * \@memberof Wizard
         *
         */
        this.onMoveNext = new EventEmitter(false);
        /**
         * Emits when the wizard moves to the previous page. Can be observed through the
         * clrWizardOnPrevious output.
         *
         * Can be useful for validation.
         *
         * \@memberof Wizard
         *
         */
        this.onMovePrevious = new EventEmitter(false);
        this._stopNext = false;
        this._stopCancel = false;
        this._stopNavigation = false;
        this._disableStepnav = false;
        /**
         * Used only to communicate to the underlying modal that animations are not
         * wanted. Primary use is for the display of static/inline wizards.
         *
         * Set using clrWizardPreventModalAnimation input. But you should never set it.
         *
         * \@memberof Wizard
         *
         */
        this._stopModalAnimations = false;
        this.goNextSubscription = this.navService.movedToNextPage.subscribe((/**
         * @return {?}
         */
        () => {
            this.onMoveNext.emit();
        }));
        this.goPreviousSubscription = this.navService.movedToPreviousPage.subscribe((/**
         * @return {?}
         */
        () => {
            this.onMovePrevious.emit();
        }));
        this.cancelSubscription = this.navService.notifyWizardCancel.subscribe((/**
         * @return {?}
         */
        () => {
            this.checkAndCancel();
        }));
        this.wizardFinishedSubscription = this.navService.wizardFinished.subscribe((/**
         * @return {?}
         */
        () => {
            if (!this.stopNext) {
                this.forceFinish();
            }
            this.wizardFinished.emit();
        }));
        this.differ = differs.find([]).create(null);
    }
    /**
     * Resets page completed states when navigating backwards. Can be set using
     * the clrWizardForceForwardNavigation input.
     *
     * \@memberof Wizard
     *
     * @param {?} value
     * @return {?}
     */
    set forceForward(value) {
        this._forceForward = !!value;
        this.navService.forceForwardNavigation = value;
    }
    /**
     * @return {?}
     */
    get forceForward() {
        return this._forceForward;
    }
    /**
     * @param {?} open
     * @return {?}
     */
    set clrWizardOpen(open) {
        if (open) {
            this.buttonService.buttonsReady = true;
        }
        this._open = open;
    }
    /**
     * Prevents ClrWizard from moving to the next page or closing itself on finishing.
     * Set using the clrWizardPreventDefaultNext input.
     *
     * Note that using stopNext will require you to create your own calls to
     * .next() and .finish() in your host component to make the ClrWizard work as
     * expected.
     *
     * Primarily used for validation.
     *
     * \@memberof Wizard
     *
     * @param {?} value
     * @return {?}
     */
    set stopNext(value) {
        this._stopNext = !!value;
        this.navService.wizardHasAltNext = value;
    }
    /**
     * @return {?}
     */
    get stopNext() {
        return this._stopNext;
    }
    /**
     * Prevents ClrWizard from closing when the cancel button or close "X" is clicked.
     * Set using the clrWizardPreventDefaultCancel input.
     *
     * Note that using stopCancel will require you to create your own calls to
     * .close() in your host component to make the ClrWizard work as expected.
     *
     * Useful for doing checks or prompts before closing a ClrWizard.
     *
     * \@memberof Wizard
     *
     * @param {?} value
     * @return {?}
     */
    set stopCancel(value) {
        this._stopCancel = !!value;
        this.navService.wizardHasAltCancel = value;
    }
    /**
     * @return {?}
     */
    get stopCancel() {
        return this._stopCancel;
    }
    /**
     * Prevents ClrWizard from performing any form of navigation away from the current
     * page. Set using the clrWizardPreventNavigation input.
     *
     * Note that stopNavigation is meant to freeze the wizard in place, typically
     * during a long validation or background action where you want the wizard to
     * display loading content but not allow the user to execute navigation in
     * the stepnav, close X, or the  back, finish, or next buttons.
     *
     * \@memberof Wizard
     *
     * @param {?} value
     * @return {?}
     */
    set stopNavigation(value) {
        this._stopNavigation = !!value;
        this.navService.wizardStopNavigation = value;
    }
    /**
     * @return {?}
     */
    get stopNavigation() {
        return this._stopNavigation;
    }
    /**
     * Prevents clicks on the links in the stepnav from working.
     *
     * A more granular bypassing of navigation which can be useful when your
     * ClrWizard is in a state of completion and you don't want users to be
     * able to jump backwards and change things.
     *
     * \@memberof Wizard
     *
     * @param {?} value
     * @return {?}
     */
    set disableStepnav(value) {
        this._disableStepnav = !!value;
        this.navService.wizardDisableStepnav = value;
    }
    /**
     * @return {?}
     */
    get disableStepnav() {
        return this._disableStepnav;
    }
    /**
     * @return {?}
     */
    get stopModalAnimations() {
        if (this._stopModalAnimations) {
            return 'true';
        }
        return 'false';
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.currentPageSubscription = this.navService.currentPageChanged.subscribe((/**
         * @param {?} page
         * @return {?}
         */
        (page) => {
            this.currentPageChanged.emit();
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.goNextSubscription) {
            this.goNextSubscription.unsubscribe();
        }
        if (this.goPreviousSubscription) {
            this.goPreviousSubscription.unsubscribe();
        }
        if (this.cancelSubscription) {
            this.cancelSubscription.unsubscribe();
        }
        if (this.currentPageSubscription) {
            this.currentPageSubscription.unsubscribe();
        }
        if (this.wizardFinishedSubscription) {
            this.wizardFinishedSubscription.unsubscribe();
        }
    }
    /**
     * Sets up references that are needed by the providers.
     *
     * \@name ngAfterContentInit
     * \@memberof Wizard
     *
     * @return {?}
     */
    ngAfterContentInit() {
        this.pageCollection.pages = this.pages;
        this.headerActionService.wizardHeaderActions = this.headerActions;
        // Only trigger buttons ready if default is open (inlined)
        if (this._open) {
            this.buttonService.buttonsReady = true;
        }
    }
    /**
     * Used for keeping track of when pages are added or removed from this.pages
     *
     * \@name ngDoCheck
     * \@memberof Wizard
     *
     * @return {?}
     */
    ngDoCheck() {
        /** @type {?} */
        const changes = this.differ.diff(this.pages);
        if (changes) {
            changes.forEachAddedItem((/**
             * @param {?} r
             * @return {?}
             */
            (r) => {
                this.navService.updateNavigation();
            }));
            changes.forEachRemovedItem((/**
             * @param {?} r
             * @return {?}
             */
            (r) => {
                this.navService.updateNavigation();
            }));
        }
    }
    /**
     * Convenient property for determining whether a wizard is static/in-line or not.
     *
     * \@name isStatic
     *
     * \@memberof Wizard
     *
     * @return {?}
     */
    get isStatic() {
        return this.elementRef.nativeElement.classList.contains('clr-wizard--inline');
    }
    /**
     * As a getter, current page is a convenient way to retrieve the current page from
     * the WizardNavigationService.
     *
     * As a setter, current page accepts a ClrWizardPage and passes it to WizardNavigationService
     * to be made the current page. currentPage performs checks to make sure it can navigate
     * to the designated page.
     *
     * \@name currentPage
     *
     * \@memberof Wizard
     *
     * @return {?}
     */
    get currentPage() {
        return this.navService.currentPage;
    }
    /**
     * @param {?} page
     * @return {?}
     */
    set currentPage(page) {
        this.navService.goTo(page, true);
    }
    /**
     * Convenient property for determining if the current page is the last page of
     * the wizard.
     *
     * \@name isLast
     *
     * \@memberof Wizard
     *
     * @return {?}
     */
    get isLast() {
        return this.navService.currentPageIsLast;
    }
    /**
     * Convenient property for determining if the current page is the first page of
     * the wizard.
     *
     * \@name isFirst
     *
     * \@memberof Wizard
     *
     * @return {?}
     */
    get isFirst() {
        return this.navService.currentPageIsFirst;
    }
    /**
     * Performs the actions needed to open the wizard. If there is no current
     * page defined, sets the first page in the wizard to be current.
     *
     * \@name open
     * \@memberof ClrWizard
     * @return {?}
     */
    open() {
        this._open = true;
        if (!this.currentPage) {
            this.navService.setFirstPageCurrent();
        }
        // Only render buttons when wizard is opened, to avoid chocolate errors
        this.buttonService.buttonsReady = true;
        this._openChanged.emit(true);
    }
    /**
     * Does the work involved with closing the wizard. Call this directly instead
     * of cancel() to implement alternative cancel functionality.
     *
     * \@name close
     * \@memberof ClrWizard
     * @return {?}
     */
    close() {
        if (this.stopNavigation) {
            return;
        }
        this._open = false;
        this._openChanged.emit(false);
    }
    /**
     * Convenient function that can be used to open and close the wizard. It operates
     * by checking a Boolean parameter. If true, the wizard is opened. If false,
     * it is closed.
     *
     * There is no default value for this parameter, so by default the wizard will
     * close if invoked with no parameter.
     *
     * \@name toggle
     *
     * \@memberof ClrWizard
     * @param {?} value
     * @return {?}
     */
    toggle(value) {
        if (value) {
            this.open();
        }
        else {
            this.close();
        }
    }
    /**
     * Moves the wizard to the previous page.
     *
     * \@name previous
     * \@memberof ClrWizard
     * @return {?}
     */
    previous() {
        this.navService.previous();
    }
    /**
     * Includes a Boolean parameter that will skip checks and event emissions.
     * If true, the wizard will move to the next page regardless of the state of
     * its current page. This is useful for alternative navigation where event
     * emissions have already been done and firing them again may cause an event loop.
     *
     * Generally, with alternative navigation, users are supplying their own checks
     * and validation. So there is no point in superseding their business logic
     * with our default behavior.
     *
     * If false, the wizard will execute default checks and emit events as normal.
     * This is useful for custom buttons or programmatic workflows that are not
     * executing the wizards default checks and emissions. It is another way to
     * navigate without having to rewrite the wizard’s default functionality
     * from scratch.
     *
     * By default, next() does not execute event emissions or checks because the
     * 80% case is that this method will be called as part of an alternative
     * navigation with clrWizardPreventDefaultNext.
     *
     * \@name next
     * \@memberof ClrWizard
     * @param {?=} skipChecksAndEmits
     * @return {?}
     */
    next(skipChecksAndEmits = true) {
        if (skipChecksAndEmits) {
            this.forceNext();
        }
        else {
            this.navService.next();
        }
    }
    /**
     * Includes a Boolean parameter that will skip checks and event emissions.
     * If true, the wizard will  complete and close regardless of the state of
     * its current page. This is useful for alternative navigation where event
     * emissions have already been done and firing them again may cause an event loop.
     *
     * If false, the wizard will execute default checks and emit events before
     * completing and closing.
     *
     * By default, finish() does not execute event emissions or checks because the
     * 80% case is that this method will be called as part of an alternative
     * navigation with clrWizardPreventDefaultNext.
     *
     * \@name finish
     * \@memberof ClrWizard
     * @param {?=} skipChecksAndEmits
     * @return {?}
     */
    finish(skipChecksAndEmits = true) {
        if (skipChecksAndEmits) {
            this.forceFinish();
        }
        else {
            this.navService.finish();
        }
    }
    /**
     * Does the work of finishing up the wizard and closing it but doesn't do the
     * checks and emissions that other paths do. Good for a last step in an
     * alternate workflow.
     *
     * Does the same thing as calling ClrWizard.finish(true) or ClrWizard.finish()
     * without a parameter.
     *
     * \@name forceFinish
     * \@memberof ClrWizard
     * @return {?}
     */
    forceFinish() {
        if (this.stopNavigation) {
            return;
        }
        this.close();
    }
    /**
     * Does the work of moving the wizard to the next page without the
     * checks and emissions that other paths do. Good for a last step in an
     * alternate workflow.
     *
     * Does the same thing as calling ClrWizard.next(true) or ClrWizard.next()
     * without a parameter.
     *
     * \@name forceNext
     * \@memberof ClrWizard
     * @return {?}
     */
    forceNext() {
        this.navService.forceNext();
    }
    /**
     * Initiates the functionality that cancels and closes the wizard.
     *
     * Do not use this for an override of the cancel the functionality
     * with clrWizardPreventDefaultCancel, clrWizardPreventPageDefaultCancel,
     * or clrWizardPagePreventDefault because it will initiate the same checks
     * and event emissions that invoked your event handler.
     *
     * Use ClrWizard.close() instead.
     *
     * \@name cancel
     * \@memberof ClrWizard
     * @return {?}
     */
    cancel() {
        this.navService.cancel();
    }
    /**
     * Overrides behavior of the underlying modal to avoid collisions with
     * alternative cancel functionality.
     *
     * In most cases, use ClrWizard.cancel() instead.
     *
     * \@name modalCancel
     * \@memberof ClrWizard
     * @return {?}
     */
    modalCancel() {
        this.checkAndCancel();
    }
    /**
     * Checks for alternative cancel flows defined at the current page or
     * wizard level. Performs a canceled if not. Emits events that initiate
     * the alternative cancel outputs (clrWizardPageOnCancel and
     * clrWizardOnCancel) if so.
     *
     * \@name checkAndCancel
     * \@memberof ClrWizard
     * @return {?}
     */
    checkAndCancel() {
        /** @type {?} */
        const currentPage = this.currentPage;
        /** @type {?} */
        const currentPageHasOverrides = currentPage.stopCancel || currentPage.preventDefault;
        if (this.stopNavigation) {
            return;
        }
        currentPage.pageOnCancel.emit();
        if (!currentPageHasOverrides) {
            this.onCancel.emit();
        }
        if (!this.stopCancel && !currentPageHasOverrides) {
            this.close();
        }
    }
    /**
     * Accepts the wizard ID as a string parameter and calls to WizardNavigationService
     * to navigate to the page with that ID. Navigation will invoke the wizard’s default
     * checks and event emissions.
     *
     * Probably less useful than calling directly to ClrWizard.navService.goTo() because the
     * nav service method can accept either a string ID or a page object.
     *
     * The format of the expected ID parameter can be found in the return of the
     * ClrWizardPage.id getter, usually prefixed with “clr-wizard-page-“ and then either a
     * numeric ID or the ID specified for the ClrWizardPage component’s “id” input.
     *
     * \@name goTo
     *
     * \@memberof ClrWizard
     * @param {?} pageId
     * @return {?}
     */
    goTo(pageId) {
        if (!pageId) {
            return;
        }
        this.navService.goTo(pageId);
    }
    /**
     * A convenience function that calls to PageCollectionService.reset() and emits the
     * ClrWizard.onReset event.
     *
     * Reset sets all WizardPages to incomplete and sets the first page in the ClrWizard to
     * be the current page, essentially resetting the wizard navigation.
     *
     * Users would then use the onReset event to reset the data or model in their
     * host component.
     *
     * It could be useful to call a reset without firing the onReset event. To do this,
     * just call ClrWizard.pageCollection.reset() directly.
     *
     * \@name reset
     * \@memberof ClrWizard
     * @return {?}
     */
    reset() {
        this.pageCollection.reset();
        this.onReset.next();
    }
}
ClrWizard.decorators = [
    { type: Component, args: [{
                selector: 'clr-wizard',
                providers: [WizardNavigationService, PageCollectionService, ButtonHubService, HeaderActionService],
                template: "<!--\n  ~ Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.\n  ~ This software is released under MIT license.\n  ~ The full license information can be found in LICENSE in the root directory of this project.\n  -->\n\n<clr-modal\n    [clrModalOpen]=\"_open\"\n    [clrModalSize]=\"size\"\n    [clrModalClosable]=\"closable\"\n    [clrModalStaticBackdrop]=\"true\"\n    [clrModalSkipAnimation]=\"stopModalAnimations\"\n    [clrModalOverrideScrollService]=\"isStatic\"\n    [clrModalPreventClose]=\"true\"\n    (clrModalAlternateClose)=\"modalCancel()\">\n\n    <nav class=\"modal-nav clr-wizard-stepnav-wrapper\">\n        <h3 class=\"clr-wizard-title\"><ng-content select=\"clr-wizard-title\"></ng-content></h3>\n        <clr-wizard-stepnav></clr-wizard-stepnav>\n    </nav>\n\n    <h3 class=\"modal-title\">\n        <span class=\"modal-title-text\">\n            <ng-template [ngTemplateOutlet]=\"navService.currentPageTitle\"></ng-template>\n        </span>\n\n        <div class=\"modal-header-actions-wrapper\" *ngIf=\"headerActionService.displayHeaderActionsWrapper\">\n            <div *ngIf=\"headerActionService.showWizardHeaderActions\">\n                <ng-content select=\"clr-wizard-header-action\"></ng-content>\n            </div>\n            <div *ngIf=\"headerActionService.currentPageHasHeaderActions\">\n                <ng-template [ngTemplateOutlet]=\"navService.currentPage.headerActions\"></ng-template>\n            </div>\n        </div>\n    </h3>\n\n    <div class=\"modal-body\">\n        <main clr-wizard-pages-wrapper class=\"clr-wizard-content\">\n            <ng-content></ng-content>\n        </main>\n    </div>\n    <div class=\"modal-footer clr-wizard-footer\">\n        <div class=\"clr-wizard-footer-buttons\">\n            <div *ngIf=\"navService.currentPage && !navService.currentPage.hasButtons\"\n                class=\"clr-wizard-footer-buttons-wrapper\">\n                <ng-content select=\"clr-wizard-button\"></ng-content>\n            </div>\n            <div *ngIf=\"navService.currentPage && navService.currentPage.hasButtons\"\n                class=\"clr-wizard-footer-buttons-wrapper\">\n                <ng-template [ngTemplateOutlet]=\"navService.currentPage.buttons\"></ng-template>\n            </div>\n        </div>\n    </div>\n</clr-modal>\n",
                host: {
                    '[class.clr-wizard]': 'true',
                    '[class.wizard-md]': "size == 'md'",
                    '[class.wizard-lg]': "size == 'lg'",
                    '[class.wizard-xl]': "size == 'xl'",
                    '[class.lastPage]': 'navService.currentPageIsLast',
                }
            }] }
];
/** @nocollapse */
ClrWizard.ctorParameters = () => [
    { type: WizardNavigationService },
    { type: PageCollectionService },
    { type: ButtonHubService },
    { type: HeaderActionService },
    { type: ElementRef },
    { type: IterableDiffers }
];
ClrWizard.propDecorators = {
    size: [{ type: Input, args: ['clrWizardSize',] }],
    forceForward: [{ type: Input, args: ['clrWizardForceForwardNavigation',] }],
    closable: [{ type: Input, args: ['clrWizardClosable',] }],
    clrWizardOpen: [{ type: Input, args: ['clrWizardOpen',] }],
    _openChanged: [{ type: Output, args: ['clrWizardOpenChange',] }],
    onCancel: [{ type: Output, args: ['clrWizardOnCancel',] }],
    wizardFinished: [{ type: Output, args: ['clrWizardOnFinish',] }],
    onReset: [{ type: Output, args: ['clrWizardOnReset',] }],
    pages: [{ type: ContentChildren, args: [ClrWizardPage,] }],
    headerActions: [{ type: ContentChildren, args: [ClrWizardHeaderAction,] }],
    currentPageChanged: [{ type: Output, args: ['clrWizardCurrentPageChanged',] }],
    onMoveNext: [{ type: Output, args: ['clrWizardOnNext',] }],
    onMovePrevious: [{ type: Output, args: ['clrWizardOnPrevious',] }],
    stopNext: [{ type: Input, args: ['clrWizardPreventDefaultNext',] }],
    stopCancel: [{ type: Input, args: ['clrWizardPreventDefaultCancel',] }],
    stopNavigation: [{ type: Input, args: ['clrWizardPreventNavigation',] }],
    disableStepnav: [{ type: Input, args: ['clrWizardDisableStepnav',] }],
    _stopModalAnimations: [{ type: Input, args: ['clrWizardPreventModalAnimation',] }]
};
if (false) {
    /**
     * Used for marking when the collection of wizard pages has been added to or deleted from
     *
     * \@memberof Wizard
     *
     * @type {?}
     */
    ClrWizard.prototype.differ;
    /**
     * Contains the size defined by the clrWizardSize input
     *
     * \@memberof Wizard
     *
     * @type {?}
     */
    ClrWizard.prototype.size;
    /**
     * @type {?}
     * @private
     */
    ClrWizard.prototype._forceForward;
    /**
     * Tells the modal part of the wizard whether it should have a close "X"
     * in the top right corner. Set with the clrWizardClosable input.
     *
     * \@memberof Wizard
     *
     * @type {?}
     */
    ClrWizard.prototype.closable;
    /**
     * Toggles open/close of the wizard component. Set using the clrWizardOpen
     * input.
     *
     * \@memberof Wizard
     *
     * @type {?}
     */
    ClrWizard.prototype._open;
    /**
     * Emits when the wizard is opened or closed. Emits through the
     * clrWizardOpenChange output. Works in conjunction with the
     * clrWizardOpen binding so you can use...
     *
     * <clr-wizard [(clrWizardOpen)]="blah"
     * ...or...
     * <clr-wizard [clrWizardOpen]="something" (clrWizardOpenChange)="doSomethign($event)">
     *
     * ...for two-way binding.
     *
     * \@memberof Wizard
     *
     * @type {?}
     */
    ClrWizard.prototype._openChanged;
    /**
     * Emits when the wizard is canceled. Can be observed through the clrWizardOnCancel
     * output.
     *
     * Can be combined with the clrWizardPreventDefaultCancel input to create
     * wizard-level custom cancel routines.
     *
     * \@memberof Wizard
     *
     * @type {?}
     */
    ClrWizard.prototype.onCancel;
    /**
     * Emits when the wizard is completed. Can be observed through the clrWizardOnFinish
     * output.
     *
     * Can be combined with the clrWizardPreventDefaultNext input to create
     * wizard-level custom completion routines.
     *
     * \@memberof Wizard
     *
     * @type {?}
     */
    ClrWizard.prototype.wizardFinished;
    /**
     * Emits when the wizard is reset. See .reset(). Can be observed through
     * the clrWizardOnReset output.
     *
     * \@memberof Wizard
     *
     * @type {?}
     */
    ClrWizard.prototype.onReset;
    /**
     * A QueryList of the pages in the wizard. Note that a QueryList is sort of
     * like an Array but not really. Note also that pages does not contain
     * WizardPages that have been removed with an ngIf.
     *
     * Most interactions with a ClrWizard's pages are more easily done using the
     * helper function in the PageCollectionService, accessible from the
     * ClrWizard through ClrWizard.pageCollection.
     *
     * \@memberof Wizard
     *
     * @type {?}
     */
    ClrWizard.prototype.pages;
    /**
     * A QueryList of the header actions defined at the ClrWizard level. Does not
     * contain header actions defined at the page level. Mostly used by other functionality
     * that needs to either know if the ClrWizard has header actions or needs to stamp them
     * somewhere.
     *
     * Could be useful if you needed to locate and programmatically activate a specific
     * header action. But this is probably easier to do by invoking the header action's
     * event handler in your host component.
     *
     * \@memberof Wizard
     *
     * @type {?}
     */
    ClrWizard.prototype.headerActions;
    /**
     * Emits when the current page has changed. Can be observed through the clrWizardCurrentPageChanged
     * output. This can happen on .next() or .previous().
     * Useful for non-blocking validation.
     *
     * \@memberof Wizard
     *
     * @type {?}
     */
    ClrWizard.prototype.currentPageChanged;
    /**
     * Emits when the wizard moves to the next page. Can be observed through the clrWizardOnNext
     * output.
     *
     * Can be combined with the clrWizardPreventDefaultNext input to create
     * wizard-level custom navigation routines, which are useful for validation.
     *
     * \@memberof Wizard
     *
     * @type {?}
     */
    ClrWizard.prototype.onMoveNext;
    /**
     * Emits when the wizard moves to the previous page. Can be observed through the
     * clrWizardOnPrevious output.
     *
     * Can be useful for validation.
     *
     * \@memberof Wizard
     *
     * @type {?}
     */
    ClrWizard.prototype.onMovePrevious;
    /**
     * @type {?}
     * @private
     */
    ClrWizard.prototype._stopNext;
    /**
     * @type {?}
     * @private
     */
    ClrWizard.prototype._stopCancel;
    /**
     * @type {?}
     * @private
     */
    ClrWizard.prototype._stopNavigation;
    /**
     * @type {?}
     * @private
     */
    ClrWizard.prototype._disableStepnav;
    /**
     * Used only to communicate to the underlying modal that animations are not
     * wanted. Primary use is for the display of static/inline wizards.
     *
     * Set using clrWizardPreventModalAnimation input. But you should never set it.
     *
     * \@memberof Wizard
     *
     * @type {?}
     */
    ClrWizard.prototype._stopModalAnimations;
    /**
     * @type {?}
     * @private
     */
    ClrWizard.prototype.goNextSubscription;
    /**
     * @type {?}
     * @private
     */
    ClrWizard.prototype.goPreviousSubscription;
    /**
     * @type {?}
     * @private
     */
    ClrWizard.prototype.cancelSubscription;
    /**
     * @type {?}
     * @private
     */
    ClrWizard.prototype.currentPageSubscription;
    /**
     * @type {?}
     * @private
     */
    ClrWizard.prototype.wizardFinishedSubscription;
    /** @type {?} */
    ClrWizard.prototype.navService;
    /** @type {?} */
    ClrWizard.prototype.pageCollection;
    /** @type {?} */
    ClrWizard.prototype.buttonService;
    /** @type {?} */
    ClrWizard.prototype.headerActionService;
    /**
     * @type {?}
     * @private
     */
    ClrWizard.prototype.elementRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l6YXJkLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsid2l6YXJkL3dpemFyZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFNQSxPQUFPLEVBRUwsU0FBUyxFQUNULGVBQWUsRUFFZixVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFDTCxlQUFlLEVBR2YsTUFBTSxFQUNOLFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUd2QixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUN6RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQzs7QUFFNUUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDaEYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDL0QsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7O0FBbUI5QyxNQUFNLE9BQU8sU0FBUzs7Ozs7Ozs7Ozs7OztJQU9wQixZQUNTLFVBQW1DLEVBQ25DLGNBQXFDLEVBQ3JDLGFBQStCLEVBQy9CLG1CQUF3QyxFQUN2QyxVQUFzQixFQUM5QixPQUF3QjtRQUxqQixlQUFVLEdBQVYsVUFBVSxDQUF5QjtRQUNuQyxtQkFBYyxHQUFkLGNBQWMsQ0FBdUI7UUFDckMsa0JBQWEsR0FBYixhQUFhLENBQWtCO1FBQy9CLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDdkMsZUFBVSxHQUFWLFVBQVUsQ0FBWTs7Ozs7OztRQXVDUixTQUFJLEdBQVcsSUFBSSxDQUFDO1FBY3BDLGtCQUFhLEdBQVksS0FBSyxDQUFDOzs7Ozs7OztRQVlYLGFBQVEsR0FBWSxJQUFJLENBQUM7Ozs7Ozs7O1FBUzlDLFVBQUssR0FBWSxLQUFLLENBQUM7Ozs7Ozs7Ozs7Ozs7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LG1DQUFnRzs7Ozs7SUFvQmhHLDhCQUFtQzs7Ozs7SUFzQm5DLGdDQUFxQzs7Ozs7SUFzQnJDLG9DQUF5Qzs7Ozs7SUFvQnpDLG9DQUF5Qzs7Ozs7Ozs7Ozs7SUFjekMseUNBQStFOzs7OztJQWMvRSx1Q0FBeUM7Ozs7O0lBQ3pDLDJDQUE2Qzs7Ozs7SUFDN0MsdUNBQXlDOzs7OztJQUN6Qyw0Q0FBOEM7Ozs7O0lBQzlDLCtDQUFpRDs7SUF4VC9DLCtCQUEwQzs7SUFDMUMsbUNBQTRDOztJQUM1QyxrQ0FBc0M7O0lBQ3RDLHdDQUErQzs7Ozs7SUFDL0MsK0JBQThCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRG9DaGVjayxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgSXRlcmFibGVEaWZmZXJzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBRdWVyeUxpc3QsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IEJ1dHRvbkh1YlNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9idXR0b24taHViLnNlcnZpY2UnO1xuaW1wb3J0IHsgSGVhZGVyQWN0aW9uU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2hlYWRlci1hY3Rpb25zLnNlcnZpY2UnO1xuaW1wb3J0IHsgUGFnZUNvbGxlY3Rpb25TZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvcGFnZS1jb2xsZWN0aW9uLnNlcnZpY2UnO1xuLy8gcHJvdmlkZXJzXG5pbXBvcnQgeyBXaXphcmROYXZpZ2F0aW9uU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL3dpemFyZC1uYXZpZ2F0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2xyV2l6YXJkSGVhZGVyQWN0aW9uIH0gZnJvbSAnLi93aXphcmQtaGVhZGVyLWFjdGlvbic7XG5pbXBvcnQgeyBDbHJXaXphcmRQYWdlIH0gZnJvbSAnLi93aXphcmQtcGFnZSc7XG5cbi8qKlxuICpcbiAqIFRoZSBXaXphcmQgY29tcG9uZW50XG4gKlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItd2l6YXJkJyxcbiAgcHJvdmlkZXJzOiBbV2l6YXJkTmF2aWdhdGlvblNlcnZpY2UsIFBhZ2VDb2xsZWN0aW9uU2VydmljZSwgQnV0dG9uSHViU2VydmljZSwgSGVhZGVyQWN0aW9uU2VydmljZV0sXG4gIHRlbXBsYXRlVXJsOiAnLi93aXphcmQuaHRtbCcsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmNsci13aXphcmRdJzogJ3RydWUnLFxuICAgICdbY2xhc3Mud2l6YXJkLW1kXSc6IFwic2l6ZSA9PSAnbWQnXCIsXG4gICAgJ1tjbGFzcy53aXphcmQtbGddJzogXCJzaXplID09ICdsZydcIixcbiAgICAnW2NsYXNzLndpemFyZC14bF0nOiBcInNpemUgPT0gJ3hsJ1wiLFxuICAgICdbY2xhc3MubGFzdFBhZ2VdJzogJ25hdlNlcnZpY2UuY3VycmVudFBhZ2VJc0xhc3QnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBDbHJXaXphcmQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgQWZ0ZXJDb250ZW50SW5pdCwgRG9DaGVjayB7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFdpemFyZC5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFxuICAgKlxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG5hdlNlcnZpY2U6IFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlLFxuICAgIHB1YmxpYyBwYWdlQ29sbGVjdGlvbjogUGFnZUNvbGxlY3Rpb25TZXJ2aWNlLFxuICAgIHB1YmxpYyBidXR0b25TZXJ2aWNlOiBCdXR0b25IdWJTZXJ2aWNlLFxuICAgIHB1YmxpYyBoZWFkZXJBY3Rpb25TZXJ2aWNlOiBIZWFkZXJBY3Rpb25TZXJ2aWNlLFxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBkaWZmZXJzOiBJdGVyYWJsZURpZmZlcnNcbiAgKSB7XG4gICAgdGhpcy5nb05leHRTdWJzY3JpcHRpb24gPSB0aGlzLm5hdlNlcnZpY2UubW92ZWRUb05leHRQYWdlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLm9uTW92ZU5leHQuZW1pdCgpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5nb1ByZXZpb3VzU3Vic2NyaXB0aW9uID0gdGhpcy5uYXZTZXJ2aWNlLm1vdmVkVG9QcmV2aW91c1BhZ2Uuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMub25Nb3ZlUHJldmlvdXMuZW1pdCgpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5jYW5jZWxTdWJzY3JpcHRpb24gPSB0aGlzLm5hdlNlcnZpY2Uubm90aWZ5V2l6YXJkQ2FuY2VsLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLmNoZWNrQW5kQ2FuY2VsKCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLndpemFyZEZpbmlzaGVkU3Vic2NyaXB0aW9uID0gdGhpcy5uYXZTZXJ2aWNlLndpemFyZEZpbmlzaGVkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBpZiAoIXRoaXMuc3RvcE5leHQpIHtcbiAgICAgICAgdGhpcy5mb3JjZUZpbmlzaCgpO1xuICAgICAgfVxuICAgICAgdGhpcy53aXphcmRGaW5pc2hlZC5lbWl0KCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmRpZmZlciA9IGRpZmZlcnMuZmluZChbXSkuY3JlYXRlKG51bGwpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZWQgZm9yIG1hcmtpbmcgd2hlbiB0aGUgY29sbGVjdGlvbiBvZiB3aXphcmQgcGFnZXMgaGFzIGJlZW4gYWRkZWQgdG8gb3IgZGVsZXRlZCBmcm9tXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRcbiAgICpcbiAgICovXG4gIGRpZmZlcjogYW55O1xuXG4gIC8qKlxuICAgKiBDb250YWlucyB0aGUgc2l6ZSBkZWZpbmVkIGJ5IHRoZSBjbHJXaXphcmRTaXplIGlucHV0XG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRcbiAgICpcbiAgICovXG4gIEBJbnB1dCgnY2xyV2l6YXJkU2l6ZScpIHNpemU6IHN0cmluZyA9ICd4bCc7XG5cbiAgLyoqXG4gICAqIFJlc2V0cyBwYWdlIGNvbXBsZXRlZCBzdGF0ZXMgd2hlbiBuYXZpZ2F0aW5nIGJhY2t3YXJkcy4gQ2FuIGJlIHNldCB1c2luZ1xuICAgKiB0aGUgY2xyV2l6YXJkRm9yY2VGb3J3YXJkTmF2aWdhdGlvbiBpbnB1dC5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFxuICAgKlxuICAgKi9cbiAgQElucHV0KCdjbHJXaXphcmRGb3JjZUZvcndhcmROYXZpZ2F0aW9uJylcbiAgc2V0IGZvcmNlRm9yd2FyZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2ZvcmNlRm9yd2FyZCA9ICEhdmFsdWU7XG4gICAgdGhpcy5uYXZTZXJ2aWNlLmZvcmNlRm9yd2FyZE5hdmlnYXRpb24gPSB2YWx1ZTtcbiAgfVxuICBwcml2YXRlIF9mb3JjZUZvcndhcmQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgZ2V0IGZvcmNlRm9yd2FyZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZm9yY2VGb3J3YXJkO1xuICB9XG5cbiAgLyoqXG4gICAqIFRlbGxzIHRoZSBtb2RhbCBwYXJ0IG9mIHRoZSB3aXphcmQgd2hldGhlciBpdCBzaG91bGQgaGF2ZSBhIGNsb3NlIFwiWFwiXG4gICAqIGluIHRoZSB0b3AgcmlnaHQgY29ybmVyLiBTZXQgd2l0aCB0aGUgY2xyV2l6YXJkQ2xvc2FibGUgaW5wdXQuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRcbiAgICpcbiAgICovXG4gIEBJbnB1dCgnY2xyV2l6YXJkQ2xvc2FibGUnKSBjbG9zYWJsZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgLyoqXG4gICAqIFRvZ2dsZXMgb3Blbi9jbG9zZSBvZiB0aGUgd2l6YXJkIGNvbXBvbmVudC4gU2V0IHVzaW5nIHRoZSBjbHJXaXphcmRPcGVuXG4gICAqIGlucHV0LlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkXG4gICAqXG4gICAqL1xuICBwdWJsaWMgX29wZW46IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCdjbHJXaXphcmRPcGVuJylcbiAgc2V0IGNscldpemFyZE9wZW4ob3BlbjogYm9vbGVhbikge1xuICAgIGlmIChvcGVuKSB7XG4gICAgICB0aGlzLmJ1dHRvblNlcnZpY2UuYnV0dG9uc1JlYWR5ID0gdHJ1ZTtcbiAgICB9XG4gICAgdGhpcy5fb3BlbiA9IG9wZW47XG4gIH1cblxuICAvKipcbiAgICogRW1pdHMgd2hlbiB0aGUgd2l6YXJkIGlzIG9wZW5lZCBvciBjbG9zZWQuIEVtaXRzIHRocm91Z2ggdGhlXG4gICAqIGNscldpemFyZE9wZW5DaGFuZ2Ugb3V0cHV0LiBXb3JrcyBpbiBjb25qdW5jdGlvbiB3aXRoIHRoZVxuICAgKiBjbHJXaXphcmRPcGVuIGJpbmRpbmcgc28geW91IGNhbiB1c2UuLi5cbiAgICpcbiAgICogPGNsci13aXphcmQgWyhjbHJXaXphcmRPcGVuKV09XCJibGFoXCJcbiAgICogLi4ub3IuLi5cbiAgICogPGNsci13aXphcmQgW2NscldpemFyZE9wZW5dPVwic29tZXRoaW5nXCIgKGNscldpemFyZE9wZW5DaGFuZ2UpPVwiZG9Tb21ldGhpZ24oJGV2ZW50KVwiPlxuICAgKlxuICAgKiAuLi5mb3IgdHdvLXdheSBiaW5kaW5nLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkXG4gICAqXG4gICAqL1xuICBAT3V0cHV0KCdjbHJXaXphcmRPcGVuQ2hhbmdlJykgX29wZW5DaGFuZ2VkOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KGZhbHNlKTtcblxuICAvKipcbiAgICogRW1pdHMgd2hlbiB0aGUgd2l6YXJkIGlzIGNhbmNlbGVkLiBDYW4gYmUgb2JzZXJ2ZWQgdGhyb3VnaCB0aGUgY2xyV2l6YXJkT25DYW5jZWxcbiAgICogb3V0cHV0LlxuICAgKlxuICAgKiBDYW4gYmUgY29tYmluZWQgd2l0aCB0aGUgY2xyV2l6YXJkUHJldmVudERlZmF1bHRDYW5jZWwgaW5wdXQgdG8gY3JlYXRlXG4gICAqIHdpemFyZC1sZXZlbCBjdXN0b20gY2FuY2VsIHJvdXRpbmVzLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkXG4gICAqXG4gICAqL1xuICBAT3V0cHV0KCdjbHJXaXphcmRPbkNhbmNlbCcpIG9uQ2FuY2VsOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PihmYWxzZSk7XG5cbiAgLyoqXG4gICAqIEVtaXRzIHdoZW4gdGhlIHdpemFyZCBpcyBjb21wbGV0ZWQuIENhbiBiZSBvYnNlcnZlZCB0aHJvdWdoIHRoZSBjbHJXaXphcmRPbkZpbmlzaFxuICAgKiBvdXRwdXQuXG4gICAqXG4gICAqIENhbiBiZSBjb21iaW5lZCB3aXRoIHRoZSBjbHJXaXphcmRQcmV2ZW50RGVmYXVsdE5leHQgaW5wdXQgdG8gY3JlYXRlXG4gICAqIHdpemFyZC1sZXZlbCBjdXN0b20gY29tcGxldGlvbiByb3V0aW5lcy5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFxuICAgKlxuICAgKi9cbiAgQE91dHB1dCgnY2xyV2l6YXJkT25GaW5pc2gnKSB3aXphcmRGaW5pc2hlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oZmFsc2UpO1xuXG4gIC8qKlxuICAgKiBFbWl0cyB3aGVuIHRoZSB3aXphcmQgaXMgcmVzZXQuIFNlZSAucmVzZXQoKS4gQ2FuIGJlIG9ic2VydmVkIHRocm91Z2hcbiAgICogdGhlIGNscldpemFyZE9uUmVzZXQgb3V0cHV0LlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkXG4gICAqXG4gICAqL1xuICBAT3V0cHV0KCdjbHJXaXphcmRPblJlc2V0Jykgb25SZXNldDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oZmFsc2UpO1xuXG4gIC8qKlxuICAgKiBBIFF1ZXJ5TGlzdCBvZiB0aGUgcGFnZXMgaW4gdGhlIHdpemFyZC4gTm90ZSB0aGF0IGEgUXVlcnlMaXN0IGlzIHNvcnQgb2ZcbiAgICogbGlrZSBhbiBBcnJheSBidXQgbm90IHJlYWxseS4gTm90ZSBhbHNvIHRoYXQgcGFnZXMgZG9lcyBub3QgY29udGFpblxuICAgKiBXaXphcmRQYWdlcyB0aGF0IGhhdmUgYmVlbiByZW1vdmVkIHdpdGggYW4gbmdJZi5cbiAgICpcbiAgICogTW9zdCBpbnRlcmFjdGlvbnMgd2l0aCBhIENscldpemFyZCdzIHBhZ2VzIGFyZSBtb3JlIGVhc2lseSBkb25lIHVzaW5nIHRoZVxuICAgKiBoZWxwZXIgZnVuY3Rpb24gaW4gdGhlIFBhZ2VDb2xsZWN0aW9uU2VydmljZSwgYWNjZXNzaWJsZSBmcm9tIHRoZVxuICAgKiBDbHJXaXphcmQgdGhyb3VnaCBDbHJXaXphcmQucGFnZUNvbGxlY3Rpb24uXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRcbiAgICpcbiAgICovXG4gIEBDb250ZW50Q2hpbGRyZW4oQ2xyV2l6YXJkUGFnZSkgcHVibGljIHBhZ2VzOiBRdWVyeUxpc3Q8Q2xyV2l6YXJkUGFnZT47XG5cbiAgLyoqXG4gICAqIEEgUXVlcnlMaXN0IG9mIHRoZSBoZWFkZXIgYWN0aW9ucyBkZWZpbmVkIGF0IHRoZSBDbHJXaXphcmQgbGV2ZWwuIERvZXMgbm90XG4gICAqIGNvbnRhaW4gaGVhZGVyIGFjdGlvbnMgZGVmaW5lZCBhdCB0aGUgcGFnZSBsZXZlbC4gTW9zdGx5IHVzZWQgYnkgb3RoZXIgZnVuY3Rpb25hbGl0eVxuICAgKiB0aGF0IG5lZWRzIHRvIGVpdGhlciBrbm93IGlmIHRoZSBDbHJXaXphcmQgaGFzIGhlYWRlciBhY3Rpb25zIG9yIG5lZWRzIHRvIHN0YW1wIHRoZW1cbiAgICogc29tZXdoZXJlLlxuICAgKlxuICAgKiBDb3VsZCBiZSB1c2VmdWwgaWYgeW91IG5lZWRlZCB0byBsb2NhdGUgYW5kIHByb2dyYW1tYXRpY2FsbHkgYWN0aXZhdGUgYSBzcGVjaWZpY1xuICAgKiBoZWFkZXIgYWN0aW9uLiBCdXQgdGhpcyBpcyBwcm9iYWJseSBlYXNpZXIgdG8gZG8gYnkgaW52b2tpbmcgdGhlIGhlYWRlciBhY3Rpb24nc1xuICAgKiBldmVudCBoYW5kbGVyIGluIHlvdXIgaG9zdCBjb21wb25lbnQuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRcbiAgICpcbiAgICovXG4gIEBDb250ZW50Q2hpbGRyZW4oQ2xyV2l6YXJkSGVhZGVyQWN0aW9uKSBwdWJsaWMgaGVhZGVyQWN0aW9uczogUXVlcnlMaXN0PENscldpemFyZEhlYWRlckFjdGlvbj47XG5cbiAgLyoqXG4gICAqIEVtaXRzIHdoZW4gdGhlIGN1cnJlbnQgcGFnZSBoYXMgY2hhbmdlZC4gQ2FuIGJlIG9ic2VydmVkIHRocm91Z2ggdGhlIGNscldpemFyZEN1cnJlbnRQYWdlQ2hhbmdlZFxuICAgKiBvdXRwdXQuIFRoaXMgY2FuIGhhcHBlbiBvbiAubmV4dCgpIG9yIC5wcmV2aW91cygpLlxuICAgKiBVc2VmdWwgZm9yIG5vbi1ibG9ja2luZyB2YWxpZGF0aW9uLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkXG4gICAqXG4gICAqL1xuICBAT3V0cHV0KCdjbHJXaXphcmRDdXJyZW50UGFnZUNoYW5nZWQnKSBjdXJyZW50UGFnZUNoYW5nZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KGZhbHNlKTtcblxuICAvKipcbiAgICogRW1pdHMgd2hlbiB0aGUgd2l6YXJkIG1vdmVzIHRvIHRoZSBuZXh0IHBhZ2UuIENhbiBiZSBvYnNlcnZlZCB0aHJvdWdoIHRoZSBjbHJXaXphcmRPbk5leHRcbiAgICogb3V0cHV0LlxuICAgKlxuICAgKiBDYW4gYmUgY29tYmluZWQgd2l0aCB0aGUgY2xyV2l6YXJkUHJldmVudERlZmF1bHROZXh0IGlucHV0IHRvIGNyZWF0ZVxuICAgKiB3aXphcmQtbGV2ZWwgY3VzdG9tIG5hdmlnYXRpb24gcm91dGluZXMsIHdoaWNoIGFyZSB1c2VmdWwgZm9yIHZhbGlkYXRpb24uXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRcbiAgICpcbiAgICovXG4gIEBPdXRwdXQoJ2NscldpemFyZE9uTmV4dCcpIG9uTW92ZU5leHQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KGZhbHNlKTtcblxuICAvKipcbiAgICogRW1pdHMgd2hlbiB0aGUgd2l6YXJkIG1vdmVzIHRvIHRoZSBwcmV2aW91cyBwYWdlLiBDYW4gYmUgb2JzZXJ2ZWQgdGhyb3VnaCB0aGVcbiAgICogY2xyV2l6YXJkT25QcmV2aW91cyBvdXRwdXQuXG4gICAqXG4gICAqIENhbiBiZSB1c2VmdWwgZm9yIHZhbGlkYXRpb24uXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRcbiAgICpcbiAgICovXG4gIEBPdXRwdXQoJ2NscldpemFyZE9uUHJldmlvdXMnKSBvbk1vdmVQcmV2aW91czogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oZmFsc2UpO1xuXG4gIC8qKlxuICAgKiBQcmV2ZW50cyBDbHJXaXphcmQgZnJvbSBtb3ZpbmcgdG8gdGhlIG5leHQgcGFnZSBvciBjbG9zaW5nIGl0c2VsZiBvbiBmaW5pc2hpbmcuXG4gICAqIFNldCB1c2luZyB0aGUgY2xyV2l6YXJkUHJldmVudERlZmF1bHROZXh0IGlucHV0LlxuICAgKlxuICAgKiBOb3RlIHRoYXQgdXNpbmcgc3RvcE5leHQgd2lsbCByZXF1aXJlIHlvdSB0byBjcmVhdGUgeW91ciBvd24gY2FsbHMgdG9cbiAgICogLm5leHQoKSBhbmQgLmZpbmlzaCgpIGluIHlvdXIgaG9zdCBjb21wb25lbnQgdG8gbWFrZSB0aGUgQ2xyV2l6YXJkIHdvcmsgYXNcbiAgICogZXhwZWN0ZWQuXG4gICAqXG4gICAqIFByaW1hcmlseSB1c2VkIGZvciB2YWxpZGF0aW9uLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkXG4gICAqXG4gICAqL1xuICBASW5wdXQoJ2NscldpemFyZFByZXZlbnREZWZhdWx0TmV4dCcpXG4gIHNldCBzdG9wTmV4dCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX3N0b3BOZXh0ID0gISF2YWx1ZTtcbiAgICB0aGlzLm5hdlNlcnZpY2Uud2l6YXJkSGFzQWx0TmV4dCA9IHZhbHVlO1xuICB9XG4gIHByaXZhdGUgX3N0b3BOZXh0OiBib29sZWFuID0gZmFsc2U7XG4gIGdldCBzdG9wTmV4dCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fc3RvcE5leHQ7XG4gIH1cblxuICAvKipcbiAgICogUHJldmVudHMgQ2xyV2l6YXJkIGZyb20gY2xvc2luZyB3aGVuIHRoZSBjYW5jZWwgYnV0dG9uIG9yIGNsb3NlIFwiWFwiIGlzIGNsaWNrZWQuXG4gICAqIFNldCB1c2luZyB0aGUgY2xyV2l6YXJkUHJldmVudERlZmF1bHRDYW5jZWwgaW5wdXQuXG4gICAqXG4gICAqIE5vdGUgdGhhdCB1c2luZyBzdG9wQ2FuY2VsIHdpbGwgcmVxdWlyZSB5b3UgdG8gY3JlYXRlIHlvdXIgb3duIGNhbGxzIHRvXG4gICAqIC5jbG9zZSgpIGluIHlvdXIgaG9zdCBjb21wb25lbnQgdG8gbWFrZSB0aGUgQ2xyV2l6YXJkIHdvcmsgYXMgZXhwZWN0ZWQuXG4gICAqXG4gICAqIFVzZWZ1bCBmb3IgZG9pbmcgY2hlY2tzIG9yIHByb21wdHMgYmVmb3JlIGNsb3NpbmcgYSBDbHJXaXphcmQuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRcbiAgICpcbiAgICovXG4gIEBJbnB1dCgnY2xyV2l6YXJkUHJldmVudERlZmF1bHRDYW5jZWwnKVxuICBzZXQgc3RvcENhbmNlbCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX3N0b3BDYW5jZWwgPSAhIXZhbHVlO1xuICAgIHRoaXMubmF2U2VydmljZS53aXphcmRIYXNBbHRDYW5jZWwgPSB2YWx1ZTtcbiAgfVxuICBwcml2YXRlIF9zdG9wQ2FuY2VsOiBib29sZWFuID0gZmFsc2U7XG4gIGdldCBzdG9wQ2FuY2VsKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9zdG9wQ2FuY2VsO1xuICB9XG5cbiAgLyoqXG4gICAqIFByZXZlbnRzIENscldpemFyZCBmcm9tIHBlcmZvcm1pbmcgYW55IGZvcm0gb2YgbmF2aWdhdGlvbiBhd2F5IGZyb20gdGhlIGN1cnJlbnRcbiAgICogcGFnZS4gU2V0IHVzaW5nIHRoZSBjbHJXaXphcmRQcmV2ZW50TmF2aWdhdGlvbiBpbnB1dC5cbiAgICpcbiAgICogTm90ZSB0aGF0IHN0b3BOYXZpZ2F0aW9uIGlzIG1lYW50IHRvIGZyZWV6ZSB0aGUgd2l6YXJkIGluIHBsYWNlLCB0eXBpY2FsbHlcbiAgICogZHVyaW5nIGEgbG9uZyB2YWxpZGF0aW9uIG9yIGJhY2tncm91bmQgYWN0aW9uIHdoZXJlIHlvdSB3YW50IHRoZSB3aXphcmQgdG9cbiAgICogZGlzcGxheSBsb2FkaW5nIGNvbnRlbnQgYnV0IG5vdCBhbGxvdyB0aGUgdXNlciB0byBleGVjdXRlIG5hdmlnYXRpb24gaW5cbiAgICogdGhlIHN0ZXBuYXYsIGNsb3NlIFgsIG9yIHRoZSAgYmFjaywgZmluaXNoLCBvciBuZXh0IGJ1dHRvbnMuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRcbiAgICpcbiAgICovXG4gIEBJbnB1dCgnY2xyV2l6YXJkUHJldmVudE5hdmlnYXRpb24nKVxuICBzZXQgc3RvcE5hdmlnYXRpb24odmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9zdG9wTmF2aWdhdGlvbiA9ICEhdmFsdWU7XG4gICAgdGhpcy5uYXZTZXJ2aWNlLndpemFyZFN0b3BOYXZpZ2F0aW9uID0gdmFsdWU7XG4gIH1cbiAgcHJpdmF0ZSBfc3RvcE5hdmlnYXRpb246IGJvb2xlYW4gPSBmYWxzZTtcbiAgZ2V0IHN0b3BOYXZpZ2F0aW9uKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9zdG9wTmF2aWdhdGlvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcmV2ZW50cyBjbGlja3Mgb24gdGhlIGxpbmtzIGluIHRoZSBzdGVwbmF2IGZyb20gd29ya2luZy5cbiAgICpcbiAgICogQSBtb3JlIGdyYW51bGFyIGJ5cGFzc2luZyBvZiBuYXZpZ2F0aW9uIHdoaWNoIGNhbiBiZSB1c2VmdWwgd2hlbiB5b3VyXG4gICAqIENscldpemFyZCBpcyBpbiBhIHN0YXRlIG9mIGNvbXBsZXRpb24gYW5kIHlvdSBkb24ndCB3YW50IHVzZXJzIHRvIGJlXG4gICAqIGFibGUgdG8ganVtcCBiYWNrd2FyZHMgYW5kIGNoYW5nZSB0aGluZ3MuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRcbiAgICpcbiAgICovXG4gIEBJbnB1dCgnY2xyV2l6YXJkRGlzYWJsZVN0ZXBuYXYnKVxuICBzZXQgZGlzYWJsZVN0ZXBuYXYodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kaXNhYmxlU3RlcG5hdiA9ICEhdmFsdWU7XG4gICAgdGhpcy5uYXZTZXJ2aWNlLndpemFyZERpc2FibGVTdGVwbmF2ID0gdmFsdWU7XG4gIH1cbiAgcHJpdmF0ZSBfZGlzYWJsZVN0ZXBuYXY6IGJvb2xlYW4gPSBmYWxzZTtcbiAgZ2V0IGRpc2FibGVTdGVwbmF2KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlU3RlcG5hdjtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VkIG9ubHkgdG8gY29tbXVuaWNhdGUgdG8gdGhlIHVuZGVybHlpbmcgbW9kYWwgdGhhdCBhbmltYXRpb25zIGFyZSBub3RcbiAgICogd2FudGVkLiBQcmltYXJ5IHVzZSBpcyBmb3IgdGhlIGRpc3BsYXkgb2Ygc3RhdGljL2lubGluZSB3aXphcmRzLlxuICAgKlxuICAgKiBTZXQgdXNpbmcgY2xyV2l6YXJkUHJldmVudE1vZGFsQW5pbWF0aW9uIGlucHV0LiBCdXQgeW91IHNob3VsZCBuZXZlciBzZXQgaXQuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRcbiAgICpcbiAgICovXG4gIEBJbnB1dCgnY2xyV2l6YXJkUHJldmVudE1vZGFsQW5pbWF0aW9uJykgX3N0b3BNb2RhbEFuaW1hdGlvbnM6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHVibGljIGdldCBzdG9wTW9kYWxBbmltYXRpb25zKCk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMuX3N0b3BNb2RhbEFuaW1hdGlvbnMpIHtcbiAgICAgIHJldHVybiAndHJ1ZSc7XG4gICAgfVxuICAgIHJldHVybiAnZmFsc2UnO1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuY3VycmVudFBhZ2VTdWJzY3JpcHRpb24gPSB0aGlzLm5hdlNlcnZpY2UuY3VycmVudFBhZ2VDaGFuZ2VkLnN1YnNjcmliZSgocGFnZTogQ2xyV2l6YXJkUGFnZSkgPT4ge1xuICAgICAgdGhpcy5jdXJyZW50UGFnZUNoYW5nZWQuZW1pdCgpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBnb05leHRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBnb1ByZXZpb3VzU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgY2FuY2VsU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgY3VycmVudFBhZ2VTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSB3aXphcmRGaW5pc2hlZFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLmdvTmV4dFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5nb05leHRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuZ29QcmV2aW91c1N1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5nb1ByZXZpb3VzU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLmNhbmNlbFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5jYW5jZWxTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuY3VycmVudFBhZ2VTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuY3VycmVudFBhZ2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMud2l6YXJkRmluaXNoZWRTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMud2l6YXJkRmluaXNoZWRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB1cCByZWZlcmVuY2VzIHRoYXQgYXJlIG5lZWRlZCBieSB0aGUgcHJvdmlkZXJzLlxuICAgKlxuICAgKiBAbmFtZSBuZ0FmdGVyQ29udGVudEluaXRcbiAgICogQG1lbWJlcm9mIFdpemFyZFxuICAgKlxuICAgKi9cbiAgcHVibGljIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICB0aGlzLnBhZ2VDb2xsZWN0aW9uLnBhZ2VzID0gdGhpcy5wYWdlcztcbiAgICB0aGlzLmhlYWRlckFjdGlvblNlcnZpY2Uud2l6YXJkSGVhZGVyQWN0aW9ucyA9IHRoaXMuaGVhZGVyQWN0aW9ucztcblxuICAgIC8vIE9ubHkgdHJpZ2dlciBidXR0b25zIHJlYWR5IGlmIGRlZmF1bHQgaXMgb3BlbiAoaW5saW5lZClcbiAgICBpZiAodGhpcy5fb3Blbikge1xuICAgICAgdGhpcy5idXR0b25TZXJ2aWNlLmJ1dHRvbnNSZWFkeSA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFVzZWQgZm9yIGtlZXBpbmcgdHJhY2sgb2Ygd2hlbiBwYWdlcyBhcmUgYWRkZWQgb3IgcmVtb3ZlZCBmcm9tIHRoaXMucGFnZXNcbiAgICpcbiAgICogQG5hbWUgbmdEb0NoZWNrXG4gICAqIEBtZW1iZXJvZiBXaXphcmRcbiAgICpcbiAgICovXG4gIHB1YmxpYyBuZ0RvQ2hlY2soKSB7XG4gICAgY29uc3QgY2hhbmdlcyA9IHRoaXMuZGlmZmVyLmRpZmYodGhpcy5wYWdlcyk7XG4gICAgaWYgKGNoYW5nZXMpIHtcbiAgICAgIGNoYW5nZXMuZm9yRWFjaEFkZGVkSXRlbSgocjogYW55KSA9PiB7XG4gICAgICAgIHRoaXMubmF2U2VydmljZS51cGRhdGVOYXZpZ2F0aW9uKCk7XG4gICAgICB9KTtcbiAgICAgIGNoYW5nZXMuZm9yRWFjaFJlbW92ZWRJdGVtKChyOiBhbnkpID0+IHtcbiAgICAgICAgdGhpcy5uYXZTZXJ2aWNlLnVwZGF0ZU5hdmlnYXRpb24oKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZW5pZW50IHByb3BlcnR5IGZvciBkZXRlcm1pbmluZyB3aGV0aGVyIGEgd2l6YXJkIGlzIHN0YXRpYy9pbi1saW5lIG9yIG5vdC5cbiAgICpcbiAgICogQG5hbWUgaXNTdGF0aWNcbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFxuICAgKlxuICAgKi9cbiAgcHVibGljIGdldCBpc1N0YXRpYygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjbHItd2l6YXJkLS1pbmxpbmUnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcyBhIGdldHRlciwgY3VycmVudCBwYWdlIGlzIGEgY29udmVuaWVudCB3YXkgdG8gcmV0cmlldmUgdGhlIGN1cnJlbnQgcGFnZSBmcm9tXG4gICAqIHRoZSBXaXphcmROYXZpZ2F0aW9uU2VydmljZS5cbiAgICpcbiAgICogQXMgYSBzZXR0ZXIsIGN1cnJlbnQgcGFnZSBhY2NlcHRzIGEgQ2xyV2l6YXJkUGFnZSBhbmQgcGFzc2VzIGl0IHRvIFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlXG4gICAqIHRvIGJlIG1hZGUgdGhlIGN1cnJlbnQgcGFnZS4gY3VycmVudFBhZ2UgcGVyZm9ybXMgY2hlY2tzIHRvIG1ha2Ugc3VyZSBpdCBjYW4gbmF2aWdhdGVcbiAgICogdG8gdGhlIGRlc2lnbmF0ZWQgcGFnZS5cbiAgICpcbiAgICogQG5hbWUgY3VycmVudFBhZ2VcbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFxuICAgKlxuICAgKi9cbiAgcHVibGljIGdldCBjdXJyZW50UGFnZSgpOiBDbHJXaXphcmRQYWdlIHtcbiAgICByZXR1cm4gdGhpcy5uYXZTZXJ2aWNlLmN1cnJlbnRQYWdlO1xuICB9XG4gIHB1YmxpYyBzZXQgY3VycmVudFBhZ2UocGFnZTogQ2xyV2l6YXJkUGFnZSkge1xuICAgIHRoaXMubmF2U2VydmljZS5nb1RvKHBhZ2UsIHRydWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlbmllbnQgcHJvcGVydHkgZm9yIGRldGVybWluaW5nIGlmIHRoZSBjdXJyZW50IHBhZ2UgaXMgdGhlIGxhc3QgcGFnZSBvZlxuICAgKiB0aGUgd2l6YXJkLlxuICAgKlxuICAgKiBAbmFtZSBpc0xhc3RcbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFxuICAgKlxuICAgKi9cbiAgcHVibGljIGdldCBpc0xhc3QoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMubmF2U2VydmljZS5jdXJyZW50UGFnZUlzTGFzdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZW5pZW50IHByb3BlcnR5IGZvciBkZXRlcm1pbmluZyBpZiB0aGUgY3VycmVudCBwYWdlIGlzIHRoZSBmaXJzdCBwYWdlIG9mXG4gICAqIHRoZSB3aXphcmQuXG4gICAqXG4gICAqIEBuYW1lIGlzRmlyc3RcbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFxuICAgKlxuICAgKi9cbiAgcHVibGljIGdldCBpc0ZpcnN0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm5hdlNlcnZpY2UuY3VycmVudFBhZ2VJc0ZpcnN0O1xuICB9XG5cbiAgLyoqXG4gICAqIFBlcmZvcm1zIHRoZSBhY3Rpb25zIG5lZWRlZCB0byBvcGVuIHRoZSB3aXphcmQuIElmIHRoZXJlIGlzIG5vIGN1cnJlbnRcbiAgICogcGFnZSBkZWZpbmVkLCBzZXRzIHRoZSBmaXJzdCBwYWdlIGluIHRoZSB3aXphcmQgdG8gYmUgY3VycmVudC5cbiAgICpcbiAgICogQG5hbWUgb3BlblxuICAgKiBAbWVtYmVyb2YgQ2xyV2l6YXJkXG4gICAqL1xuICBwdWJsaWMgb3BlbigpOiB2b2lkIHtcbiAgICB0aGlzLl9vcGVuID0gdHJ1ZTtcblxuICAgIGlmICghdGhpcy5jdXJyZW50UGFnZSkge1xuICAgICAgdGhpcy5uYXZTZXJ2aWNlLnNldEZpcnN0UGFnZUN1cnJlbnQoKTtcbiAgICB9XG5cbiAgICAvLyBPbmx5IHJlbmRlciBidXR0b25zIHdoZW4gd2l6YXJkIGlzIG9wZW5lZCwgdG8gYXZvaWQgY2hvY29sYXRlIGVycm9yc1xuICAgIHRoaXMuYnV0dG9uU2VydmljZS5idXR0b25zUmVhZHkgPSB0cnVlO1xuXG4gICAgdGhpcy5fb3BlbkNoYW5nZWQuZW1pdCh0cnVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEb2VzIHRoZSB3b3JrIGludm9sdmVkIHdpdGggY2xvc2luZyB0aGUgd2l6YXJkLiBDYWxsIHRoaXMgZGlyZWN0bHkgaW5zdGVhZFxuICAgKiBvZiBjYW5jZWwoKSB0byBpbXBsZW1lbnQgYWx0ZXJuYXRpdmUgY2FuY2VsIGZ1bmN0aW9uYWxpdHkuXG4gICAqXG4gICAqIEBuYW1lIGNsb3NlXG4gICAqIEBtZW1iZXJvZiBDbHJXaXphcmRcbiAgICovXG4gIHB1YmxpYyBjbG9zZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zdG9wTmF2aWdhdGlvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX29wZW4gPSBmYWxzZTtcbiAgICB0aGlzLl9vcGVuQ2hhbmdlZC5lbWl0KGZhbHNlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZW5pZW50IGZ1bmN0aW9uIHRoYXQgY2FuIGJlIHVzZWQgdG8gb3BlbiBhbmQgY2xvc2UgdGhlIHdpemFyZC4gSXQgb3BlcmF0ZXNcbiAgICogYnkgY2hlY2tpbmcgYSBCb29sZWFuIHBhcmFtZXRlci4gSWYgdHJ1ZSwgdGhlIHdpemFyZCBpcyBvcGVuZWQuIElmIGZhbHNlLFxuICAgKiBpdCBpcyBjbG9zZWQuXG4gICAqXG4gICAqIFRoZXJlIGlzIG5vIGRlZmF1bHQgdmFsdWUgZm9yIHRoaXMgcGFyYW1ldGVyLCBzbyBieSBkZWZhdWx0IHRoZSB3aXphcmQgd2lsbFxuICAgKiBjbG9zZSBpZiBpbnZva2VkIHdpdGggbm8gcGFyYW1ldGVyLlxuICAgKlxuICAgKiBAbmFtZSB0b2dnbGVcbiAgICpcbiAgICogQG1lbWJlcm9mIENscldpemFyZFxuICAgKi9cbiAgcHVibGljIHRvZ2dsZSh2YWx1ZTogYm9vbGVhbik6IHZvaWQge1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdGhpcy5vcGVuKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTW92ZXMgdGhlIHdpemFyZCB0byB0aGUgcHJldmlvdXMgcGFnZS5cbiAgICpcbiAgICogQG5hbWUgcHJldmlvdXNcbiAgICogQG1lbWJlcm9mIENscldpemFyZFxuICAgKi9cbiAgcHVibGljIHByZXZpb3VzKCk6IHZvaWQge1xuICAgIHRoaXMubmF2U2VydmljZS5wcmV2aW91cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluY2x1ZGVzIGEgQm9vbGVhbiBwYXJhbWV0ZXIgdGhhdCB3aWxsIHNraXAgY2hlY2tzIGFuZCBldmVudCBlbWlzc2lvbnMuXG4gICAqIElmIHRydWUsIHRoZSB3aXphcmQgd2lsbCBtb3ZlIHRvIHRoZSBuZXh0IHBhZ2UgcmVnYXJkbGVzcyBvZiB0aGUgc3RhdGUgb2ZcbiAgICogaXRzIGN1cnJlbnQgcGFnZS4gVGhpcyBpcyB1c2VmdWwgZm9yIGFsdGVybmF0aXZlIG5hdmlnYXRpb24gd2hlcmUgZXZlbnRcbiAgICogZW1pc3Npb25zIGhhdmUgYWxyZWFkeSBiZWVuIGRvbmUgYW5kIGZpcmluZyB0aGVtIGFnYWluIG1heSBjYXVzZSBhbiBldmVudCBsb29wLlxuICAgKlxuICAgKiBHZW5lcmFsbHksIHdpdGggYWx0ZXJuYXRpdmUgbmF2aWdhdGlvbiwgdXNlcnMgYXJlIHN1cHBseWluZyB0aGVpciBvd24gY2hlY2tzXG4gICAqIGFuZCB2YWxpZGF0aW9uLiBTbyB0aGVyZSBpcyBubyBwb2ludCBpbiBzdXBlcnNlZGluZyB0aGVpciBidXNpbmVzcyBsb2dpY1xuICAgKiB3aXRoIG91ciBkZWZhdWx0IGJlaGF2aW9yLlxuICAgKlxuICAgKiBJZiBmYWxzZSwgdGhlIHdpemFyZCB3aWxsIGV4ZWN1dGUgZGVmYXVsdCBjaGVja3MgYW5kIGVtaXQgZXZlbnRzIGFzIG5vcm1hbC5cbiAgICogVGhpcyBpcyB1c2VmdWwgZm9yIGN1c3RvbSBidXR0b25zIG9yIHByb2dyYW1tYXRpYyB3b3JrZmxvd3MgdGhhdCBhcmUgbm90XG4gICAqIGV4ZWN1dGluZyB0aGUgd2l6YXJkcyBkZWZhdWx0IGNoZWNrcyBhbmQgZW1pc3Npb25zLiBJdCBpcyBhbm90aGVyIHdheSB0b1xuICAgKiBuYXZpZ2F0ZSB3aXRob3V0IGhhdmluZyB0byByZXdyaXRlIHRoZSB3aXphcmTigJlzIGRlZmF1bHQgZnVuY3Rpb25hbGl0eVxuICAgKiBmcm9tIHNjcmF0Y2guXG4gICAqXG4gICAqIEJ5IGRlZmF1bHQsIG5leHQoKSBkb2VzIG5vdCBleGVjdXRlIGV2ZW50IGVtaXNzaW9ucyBvciBjaGVja3MgYmVjYXVzZSB0aGVcbiAgICogODAlIGNhc2UgaXMgdGhhdCB0aGlzIG1ldGhvZCB3aWxsIGJlIGNhbGxlZCBhcyBwYXJ0IG9mIGFuIGFsdGVybmF0aXZlXG4gICAqIG5hdmlnYXRpb24gd2l0aCBjbHJXaXphcmRQcmV2ZW50RGVmYXVsdE5leHQuXG4gICAqXG4gICAqIEBuYW1lIG5leHRcbiAgICogQG1lbWJlcm9mIENscldpemFyZFxuICAgKi9cbiAgcHVibGljIG5leHQoc2tpcENoZWNrc0FuZEVtaXRzOiBib29sZWFuID0gdHJ1ZSk6IHZvaWQge1xuICAgIGlmIChza2lwQ2hlY2tzQW5kRW1pdHMpIHtcbiAgICAgIHRoaXMuZm9yY2VOZXh0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubmF2U2VydmljZS5uZXh0KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEluY2x1ZGVzIGEgQm9vbGVhbiBwYXJhbWV0ZXIgdGhhdCB3aWxsIHNraXAgY2hlY2tzIGFuZCBldmVudCBlbWlzc2lvbnMuXG4gICAqIElmIHRydWUsIHRoZSB3aXphcmQgd2lsbCAgY29tcGxldGUgYW5kIGNsb3NlIHJlZ2FyZGxlc3Mgb2YgdGhlIHN0YXRlIG9mXG4gICAqIGl0cyBjdXJyZW50IHBhZ2UuIFRoaXMgaXMgdXNlZnVsIGZvciBhbHRlcm5hdGl2ZSBuYXZpZ2F0aW9uIHdoZXJlIGV2ZW50XG4gICAqIGVtaXNzaW9ucyBoYXZlIGFscmVhZHkgYmVlbiBkb25lIGFuZCBmaXJpbmcgdGhlbSBhZ2FpbiBtYXkgY2F1c2UgYW4gZXZlbnQgbG9vcC5cbiAgICpcbiAgICogSWYgZmFsc2UsIHRoZSB3aXphcmQgd2lsbCBleGVjdXRlIGRlZmF1bHQgY2hlY2tzIGFuZCBlbWl0IGV2ZW50cyBiZWZvcmVcbiAgICogY29tcGxldGluZyBhbmQgY2xvc2luZy5cbiAgICpcbiAgICogQnkgZGVmYXVsdCwgZmluaXNoKCkgZG9lcyBub3QgZXhlY3V0ZSBldmVudCBlbWlzc2lvbnMgb3IgY2hlY2tzIGJlY2F1c2UgdGhlXG4gICAqIDgwJSBjYXNlIGlzIHRoYXQgdGhpcyBtZXRob2Qgd2lsbCBiZSBjYWxsZWQgYXMgcGFydCBvZiBhbiBhbHRlcm5hdGl2ZVxuICAgKiBuYXZpZ2F0aW9uIHdpdGggY2xyV2l6YXJkUHJldmVudERlZmF1bHROZXh0LlxuICAgKlxuICAgKiBAbmFtZSBmaW5pc2hcbiAgICogQG1lbWJlcm9mIENscldpemFyZFxuICAgKi9cbiAgcHVibGljIGZpbmlzaChza2lwQ2hlY2tzQW5kRW1pdHM6IGJvb2xlYW4gPSB0cnVlKTogdm9pZCB7XG4gICAgaWYgKHNraXBDaGVja3NBbmRFbWl0cykge1xuICAgICAgdGhpcy5mb3JjZUZpbmlzaCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm5hdlNlcnZpY2UuZmluaXNoKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERvZXMgdGhlIHdvcmsgb2YgZmluaXNoaW5nIHVwIHRoZSB3aXphcmQgYW5kIGNsb3NpbmcgaXQgYnV0IGRvZXNuJ3QgZG8gdGhlXG4gICAqIGNoZWNrcyBhbmQgZW1pc3Npb25zIHRoYXQgb3RoZXIgcGF0aHMgZG8uIEdvb2QgZm9yIGEgbGFzdCBzdGVwIGluIGFuXG4gICAqIGFsdGVybmF0ZSB3b3JrZmxvdy5cbiAgICpcbiAgICogRG9lcyB0aGUgc2FtZSB0aGluZyBhcyBjYWxsaW5nIENscldpemFyZC5maW5pc2godHJ1ZSkgb3IgQ2xyV2l6YXJkLmZpbmlzaCgpXG4gICAqIHdpdGhvdXQgYSBwYXJhbWV0ZXIuXG4gICAqXG4gICAqIEBuYW1lIGZvcmNlRmluaXNoXG4gICAqIEBtZW1iZXJvZiBDbHJXaXphcmRcbiAgICovXG4gIHB1YmxpYyBmb3JjZUZpbmlzaCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zdG9wTmF2aWdhdGlvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuY2xvc2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEb2VzIHRoZSB3b3JrIG9mIG1vdmluZyB0aGUgd2l6YXJkIHRvIHRoZSBuZXh0IHBhZ2Ugd2l0aG91dCB0aGVcbiAgICogY2hlY2tzIGFuZCBlbWlzc2lvbnMgdGhhdCBvdGhlciBwYXRocyBkby4gR29vZCBmb3IgYSBsYXN0IHN0ZXAgaW4gYW5cbiAgICogYWx0ZXJuYXRlIHdvcmtmbG93LlxuICAgKlxuICAgKiBEb2VzIHRoZSBzYW1lIHRoaW5nIGFzIGNhbGxpbmcgQ2xyV2l6YXJkLm5leHQodHJ1ZSkgb3IgQ2xyV2l6YXJkLm5leHQoKVxuICAgKiB3aXRob3V0IGEgcGFyYW1ldGVyLlxuICAgKlxuICAgKiBAbmFtZSBmb3JjZU5leHRcbiAgICogQG1lbWJlcm9mIENscldpemFyZFxuICAgKi9cbiAgcHVibGljIGZvcmNlTmV4dCgpOiB2b2lkIHtcbiAgICB0aGlzLm5hdlNlcnZpY2UuZm9yY2VOZXh0KCk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhdGVzIHRoZSBmdW5jdGlvbmFsaXR5IHRoYXQgY2FuY2VscyBhbmQgY2xvc2VzIHRoZSB3aXphcmQuXG4gICAqXG4gICAqIERvIG5vdCB1c2UgdGhpcyBmb3IgYW4gb3ZlcnJpZGUgb2YgdGhlIGNhbmNlbCB0aGUgZnVuY3Rpb25hbGl0eVxuICAgKiB3aXRoIGNscldpemFyZFByZXZlbnREZWZhdWx0Q2FuY2VsLCBjbHJXaXphcmRQcmV2ZW50UGFnZURlZmF1bHRDYW5jZWwsXG4gICAqIG9yIGNscldpemFyZFBhZ2VQcmV2ZW50RGVmYXVsdCBiZWNhdXNlIGl0IHdpbGwgaW5pdGlhdGUgdGhlIHNhbWUgY2hlY2tzXG4gICAqIGFuZCBldmVudCBlbWlzc2lvbnMgdGhhdCBpbnZva2VkIHlvdXIgZXZlbnQgaGFuZGxlci5cbiAgICpcbiAgICogVXNlIENscldpemFyZC5jbG9zZSgpIGluc3RlYWQuXG4gICAqXG4gICAqIEBuYW1lIGNhbmNlbFxuICAgKiBAbWVtYmVyb2YgQ2xyV2l6YXJkXG4gICAqL1xuICBwdWJsaWMgY2FuY2VsKCk6IHZvaWQge1xuICAgIHRoaXMubmF2U2VydmljZS5jYW5jZWwoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPdmVycmlkZXMgYmVoYXZpb3Igb2YgdGhlIHVuZGVybHlpbmcgbW9kYWwgdG8gYXZvaWQgY29sbGlzaW9ucyB3aXRoXG4gICAqIGFsdGVybmF0aXZlIGNhbmNlbCBmdW5jdGlvbmFsaXR5LlxuICAgKlxuICAgKiBJbiBtb3N0IGNhc2VzLCB1c2UgQ2xyV2l6YXJkLmNhbmNlbCgpIGluc3RlYWQuXG4gICAqXG4gICAqIEBuYW1lIG1vZGFsQ2FuY2VsXG4gICAqIEBtZW1iZXJvZiBDbHJXaXphcmRcbiAgICovXG4gIHB1YmxpYyBtb2RhbENhbmNlbCgpOiB2b2lkIHtcbiAgICB0aGlzLmNoZWNrQW5kQ2FuY2VsKCk7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGZvciBhbHRlcm5hdGl2ZSBjYW5jZWwgZmxvd3MgZGVmaW5lZCBhdCB0aGUgY3VycmVudCBwYWdlIG9yXG4gICAqIHdpemFyZCBsZXZlbC4gUGVyZm9ybXMgYSBjYW5jZWxlZCBpZiBub3QuIEVtaXRzIGV2ZW50cyB0aGF0IGluaXRpYXRlXG4gICAqIHRoZSBhbHRlcm5hdGl2ZSBjYW5jZWwgb3V0cHV0cyAoY2xyV2l6YXJkUGFnZU9uQ2FuY2VsIGFuZFxuICAgKiBjbHJXaXphcmRPbkNhbmNlbCkgaWYgc28uXG4gICAqXG4gICAqIEBuYW1lIGNoZWNrQW5kQ2FuY2VsXG4gICAqIEBtZW1iZXJvZiBDbHJXaXphcmRcbiAgICovXG4gIHB1YmxpYyBjaGVja0FuZENhbmNlbCgpOiB2b2lkIHtcbiAgICBjb25zdCBjdXJyZW50UGFnZSA9IHRoaXMuY3VycmVudFBhZ2U7XG4gICAgY29uc3QgY3VycmVudFBhZ2VIYXNPdmVycmlkZXMgPSBjdXJyZW50UGFnZS5zdG9wQ2FuY2VsIHx8IGN1cnJlbnRQYWdlLnByZXZlbnREZWZhdWx0O1xuXG4gICAgaWYgKHRoaXMuc3RvcE5hdmlnYXRpb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjdXJyZW50UGFnZS5wYWdlT25DYW5jZWwuZW1pdCgpO1xuICAgIGlmICghY3VycmVudFBhZ2VIYXNPdmVycmlkZXMpIHtcbiAgICAgIHRoaXMub25DYW5jZWwuZW1pdCgpO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5zdG9wQ2FuY2VsICYmICFjdXJyZW50UGFnZUhhc092ZXJyaWRlcykge1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBY2NlcHRzIHRoZSB3aXphcmQgSUQgYXMgYSBzdHJpbmcgcGFyYW1ldGVyIGFuZCBjYWxscyB0byBXaXphcmROYXZpZ2F0aW9uU2VydmljZVxuICAgKiB0byBuYXZpZ2F0ZSB0byB0aGUgcGFnZSB3aXRoIHRoYXQgSUQuIE5hdmlnYXRpb24gd2lsbCBpbnZva2UgdGhlIHdpemFyZOKAmXMgZGVmYXVsdFxuICAgKiBjaGVja3MgYW5kIGV2ZW50IGVtaXNzaW9ucy5cbiAgICpcbiAgICogUHJvYmFibHkgbGVzcyB1c2VmdWwgdGhhbiBjYWxsaW5nIGRpcmVjdGx5IHRvIENscldpemFyZC5uYXZTZXJ2aWNlLmdvVG8oKSBiZWNhdXNlIHRoZVxuICAgKiBuYXYgc2VydmljZSBtZXRob2QgY2FuIGFjY2VwdCBlaXRoZXIgYSBzdHJpbmcgSUQgb3IgYSBwYWdlIG9iamVjdC5cbiAgICpcbiAgICogVGhlIGZvcm1hdCBvZiB0aGUgZXhwZWN0ZWQgSUQgcGFyYW1ldGVyIGNhbiBiZSBmb3VuZCBpbiB0aGUgcmV0dXJuIG9mIHRoZVxuICAgKiBDbHJXaXphcmRQYWdlLmlkIGdldHRlciwgdXN1YWxseSBwcmVmaXhlZCB3aXRoIOKAnGNsci13aXphcmQtcGFnZS3igJwgYW5kIHRoZW4gZWl0aGVyIGFcbiAgICogbnVtZXJpYyBJRCBvciB0aGUgSUQgc3BlY2lmaWVkIGZvciB0aGUgQ2xyV2l6YXJkUGFnZSBjb21wb25lbnTigJlzIOKAnGlk4oCdIGlucHV0LlxuICAgKlxuICAgKiBAbmFtZSBnb1RvXG4gICAqXG4gICAqIEBtZW1iZXJvZiBDbHJXaXphcmRcbiAgICovXG4gIHB1YmxpYyBnb1RvKHBhZ2VJZDogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKCFwYWdlSWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLm5hdlNlcnZpY2UuZ29UbyhwYWdlSWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgY29udmVuaWVuY2UgZnVuY3Rpb24gdGhhdCBjYWxscyB0byBQYWdlQ29sbGVjdGlvblNlcnZpY2UucmVzZXQoKSBhbmQgZW1pdHMgdGhlXG4gICAqIENscldpemFyZC5vblJlc2V0IGV2ZW50LlxuICAgKlxuICAgKiBSZXNldCBzZXRzIGFsbCBXaXphcmRQYWdlcyB0byBpbmNvbXBsZXRlIGFuZCBzZXRzIHRoZSBmaXJzdCBwYWdlIGluIHRoZSBDbHJXaXphcmQgdG9cbiAgICogYmUgdGhlIGN1cnJlbnQgcGFnZSwgZXNzZW50aWFsbHkgcmVzZXR0aW5nIHRoZSB3aXphcmQgbmF2aWdhdGlvbi5cbiAgICpcbiAgICogVXNlcnMgd291bGQgdGhlbiB1c2UgdGhlIG9uUmVzZXQgZXZlbnQgdG8gcmVzZXQgdGhlIGRhdGEgb3IgbW9kZWwgaW4gdGhlaXJcbiAgICogaG9zdCBjb21wb25lbnQuXG4gICAqXG4gICAqIEl0IGNvdWxkIGJlIHVzZWZ1bCB0byBjYWxsIGEgcmVzZXQgd2l0aG91dCBmaXJpbmcgdGhlIG9uUmVzZXQgZXZlbnQuIFRvIGRvIHRoaXMsXG4gICAqIGp1c3QgY2FsbCBDbHJXaXphcmQucGFnZUNvbGxlY3Rpb24ucmVzZXQoKSBkaXJlY3RseS5cbiAgICpcbiAgICogQG5hbWUgcmVzZXRcbiAgICogQG1lbWJlcm9mIENscldpemFyZFxuICAgKi9cbiAgcHVibGljIHJlc2V0KCkge1xuICAgIHRoaXMucGFnZUNvbGxlY3Rpb24ucmVzZXQoKTtcbiAgICB0aGlzLm9uUmVzZXQubmV4dCgpO1xuICB9XG59XG4iXX0=