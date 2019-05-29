/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ContentChild, EventEmitter, Input, Output } from '@angular/core';
import { ButtonHubService } from './providers/button-hub.service';
import { PageCollectionService } from './providers/page-collection.service';
import { WizardNavigationService } from './providers/wizard-navigation.service';
import { ClrWizardPageButtons } from './wizard-page-buttons';
import { ClrWizardPageHeaderActions } from './wizard-page-header-actions';
import { ClrWizardPageNavTitle } from './wizard-page-navtitle';
import { ClrWizardPageTitle } from './wizard-page-title';
/** @type {?} */
let wizardPageIndex = 0;
/**
 * The ClrWizardPage component is responsible for displaying the content of each step
 * in the wizard workflow.
 *
 * ClrWizardPage component has hooks into the navigation service (ClrWizardPage.navService),
 * page collection (ClrWizardPage.pageCollection), and button service
 * (ClrWizardPage.buttonService). These three providers are shared across the components
 * within each instance of a Wizard.
 *
 */
export class ClrWizardPage {
    /**
     * Creates an instance of ClrWizardPage.
     *
     * \@memberof WizardPage
     * @param {?} navService
     * @param {?} pageCollection
     * @param {?} buttonService
     */
    constructor(navService, pageCollection, buttonService) {
        this.navService = navService;
        this.pageCollection = pageCollection;
        this.buttonService = buttonService;
        /**
         *
         * \@memberof WizardPage
         *
         */
        this._nextStepDisabled = false;
        /**
         * Emits when the value of ClrWizardPage.nextStepDisabled changes.
         * Should emit the new value of nextStepDisabled.
         *
         * \@memberof WizardPage
         *
         */
        this.nextStepDisabledChange = new EventEmitter();
        /**
         *
         * \@memberof WizardPage
         *
         */
        this._previousStepDisabled = false;
        /**
         * Emits when the value of ClrWizardPage.previousStepDisabled changes.
         * Should emit the new value of previousStepDisabled.
         *
         * \@memberof WizardPage
         *
         */
        this.previousStepDisabledChange = new EventEmitter();
        /**
         * Overrides all actions from the page level, so you can use an alternate function for
         * validation or data-munging with a ClrWizardPage.onCommit (clrWizardPageOnCommit output),
         * ClrWizardPage.onCancel (clrWizardPageOnCancel output), or one
         * of the granular page-level button click event emitters.
         *
         * \@memberof WizardPage
         *
         */
        this.preventDefault = false;
        /**
         *
         * \@memberof WizardPage
         *
         */
        this._stopCancel = false;
        /**
         *
         * \@memberof WizardPage
         *
         */
        this.stopCancelChange = new EventEmitter();
        /**
         *
         * \@memberof WizardPage
         *
         */
        this._stopNext = false;
        /**
         * An event emitter carried over from a legacy version of ClrWizardPage.
         * Fires an event on ClrWizardPage whenever the next or finish buttons
         * are clicked and the page is the current page of the Wizard.
         *
         * Note that this does not automatically emit an event when a custom
         * button is used in place of a next or finish button.
         *
         * \@memberof WizardPage
         *
         */
        this.onCommit = new EventEmitter(false);
        /**
         * Emits an event when ClrWizardPage becomes the current page of the
         * Wizard.
         *
         * \@memberof WizardPage
         *
         */
        this.onLoad = new EventEmitter();
        /**
         * Emits an event when the ClrWizardPage invokes the cancel routine for the wizard.
         *
         * Can be used in conjunction with the ClrWizardPage.stopCancel
         * (clrWizardPagePreventDefaultCancel) or ClrWizardPage.preventDefault
         * (clrWizardPagePagePreventDefault) inputs to implement custom cancel
         * functionality at the page level. This is useful if you would like to do
         * validation, save data, or warn users before cancelling the wizard.
         *
         * Note that this requires you to call Wizard.close() from the host component.
         * This constitues a full replacement of the cancel functionality.
         *
         * \@memberof WizardPage
         *
         */
        this.pageOnCancel = new EventEmitter();
        /**
         * Emits an event when the finish button is clicked and the ClrWizardPage is
         * the wizard's current page.
         *
         * Can be used in conjunction with the ClrWizardPage.preventDefault
         * (clrWizardPagePagePreventDefault) input to implement custom finish
         * functionality at the page level. This is useful if you would like to do
         * validation, save data, or warn users before allowing them to complete
         * the wizard.
         *
         * Note that this requires you to call Wizard.finish() or Wizard.forceFinish()
         * from the host component. This combination creates a full replacement of
         * the finish functionality.
         *
         * \@memberof WizardPage
         *
         */
        this.finishButtonClicked = new EventEmitter();
        /**
         * Emits an event when the previous button is clicked and the ClrWizardPage is
         * the wizard's current page.
         *
         * Can be used in conjunction with the ClrWizardPage.preventDefault
         * (clrWizardPagePagePreventDefault) input to implement custom backwards
         * navigation at the page level. This is useful if you would like to do
         * validation, save data, or warn users before allowing them to go
         * backwards in the wizard.
         *
         * Note that this requires you to call Wizard.previous()
         * from the host component. This combination creates a full replacement of
         * the backwards navigation functionality.
         *
         * \@memberof WizardPage
         *
         */
        this.previousButtonClicked = new EventEmitter();
        /**
         * Emits an event when the next button is clicked and the ClrWizardPage is
         * the wizard's current page.
         *
         * Can be used in conjunction with the ClrWizardPage.preventDefault
         * (clrWizardPagePagePreventDefault) input to implement custom forwards
         * navigation at the page level. This is useful if you would like to do
         * validation, save data, or warn users before allowing them to go
         * to the next page in the wizard.
         *
         * Note that this requires you to call Wizard.forceNext() or Wizard.next()
         * from the host component. This combination creates a full replacement of
         * the forward navigation functionality.
         *
         * \@memberof WizardPage
         *
         */
        this.nextButtonClicked = new EventEmitter();
        /**
         * Emits an event when a danger button is clicked and the ClrWizardPage is
         * the wizard's current page. By default, a danger button will act as
         * either a "next" or "finish" button depending on if the ClrWizardPage is the
         * last page or not.
         *
         * Can be used in conjunction with the ClrWizardPage.preventDefault
         * (clrWizardPagePagePreventDefault) input to implement custom forwards
         * or finish navigation at the page level when the danger button is clicked.
         * This is useful if you would like to do validation, save data, or warn
         * users before allowing them to go to the next page in the wizard or
         * finish the wizard.
         *
         * Note that this requires you to call Wizard.finish(), Wizard.forceFinish(),
         * Wizard.forceNext() or Wizard.next() from the host component. This
         * combination creates a full replacement of the forward navigation and
         * finish functionality.
         *
         * \@memberof WizardPage
         *
         */
        this.dangerButtonClicked = new EventEmitter();
        /**
         * Emits an event when a next, finish, or danger button is clicked and the
         * ClrWizardPage is the wizard's current page.
         *
         * Can be used in conjunction with the ClrWizardPage.preventDefault
         * (clrWizardPagePagePreventDefault) input to implement custom forwards
         * or finish navigation at the page level, regardless of the type of
         * primary button.
         *
         * This is useful if you would like to do validation, save data, or warn
         * users before allowing them to go to the next page in the wizard or
         * finish the wizard.
         *
         * Note that this requires you to call Wizard.finish(), Wizard.forceFinish(),
         * Wizard.forceNext() or Wizard.next() from the host component. This
         * combination creates a full replacement of the forward navigation and
         * finish functionality.
         *
         * \@memberof WizardPage
         *
         */
        this.primaryButtonClicked = new EventEmitter();
        this.customButtonClicked = new EventEmitter();
        /**
         * An input value that is used internally to generate the ClrWizardPage ID as
         * well as the step nav item ID.
         *
         * Typed as any because it should be able to accept numbers as well as
         * strings. Passing an index for wizard whose pages are created with an
         * ngFor loop is a common use case.
         *
         * \@memberof WizardPage
         *
         */
        this._id = (wizardPageIndex++).toString();
        /**
         *
         * \@memberof WizardPage
         *
         */
        this._complete = false;
    }
    /**
     * A getter that tells whether or not the wizard should be allowed
     * to move to the next page.
     *
     * Useful for in-page validation because it prevents forward navigation
     * and visibly disables the next button.
     *
     * Does not require that you re-implement navigation routines like you
     * would if you were using ClrWizardPage.preventDefault or
     * Wizard.preventDefault.
     *
     * \@memberof WizardPage
     *
     * @return {?}
     */
    get nextStepDisabled() {
        return this._nextStepDisabled;
    }
    /**
     * Sets whether the page should allow forward navigation.
     *
     * \@memberof WizardPage
     *
     * @param {?} val
     * @return {?}
     */
    set nextStepDisabled(val) {
        /** @type {?} */
        const valBool = !!val;
        if (valBool !== this._nextStepDisabled) {
            this._nextStepDisabled = valBool;
            this.nextStepDisabledChange.emit(valBool);
        }
    }
    /**
     * A getter that tells whether or not the wizard should be allowed
     * to move to the previous page.
     *
     * Useful for in-page validation because it prevents backward navigation
     * and visibly disables the previous button.
     *
     * Does not require that you re-implement navigation routines like you
     * would if you were using ClrWizardPage.preventDefault or
     * Wizard.preventDefault.
     *
     * \@memberof WizardPage
     *
     * @return {?}
     */
    get previousStepDisabled() {
        return this._previousStepDisabled;
    }
    /**
     * Sets whether the page should allow backward navigation.
     *
     * \@memberof WizardPage
     *
     * @param {?} val
     * @return {?}
     */
    set previousStepDisabled(val) {
        /** @type {?} */
        const valBool = !!val;
        if (valBool !== this._previousStepDisabled) {
            this._previousStepDisabled = valBool;
            this.previousStepDisabledChange.emit(valBool);
        }
    }
    /**
     * A getter that retrieves whether the page is preventing the cancel action.
     *
     * \@memberof WizardPage
     *
     * @return {?}
     */
    get stopCancel() {
        return this._stopCancel;
    }
    /**
     * Overrides the cancel action from the page level. Allows you to use an
     * alternate function for validation or data-munging before cancelling the
     * wizard when combined with the ClrWizardPage.onCancel
     * (the clrWizardPageOnCancel output).
     *
     * Requires that you manually close the wizard from your host component,
     * usually with a call to Wizard.forceNext() or wizard.next();
     *
     * \@memberof ClrWizardPage
     * @param {?} val
     * @return {?}
     */
    set stopCancel(val) {
        /** @type {?} */
        const valBool = !!val;
        if (valBool !== this._stopCancel) {
            this._stopCancel = valBool;
            this.stopCancelChange.emit(valBool);
        }
    }
    /**
     * A getter that tells you whether the page is preventing the next action.
     *
     * \@memberof WizardPage
     *
     * @return {?}
     */
    get stopNext() {
        return this._stopNext;
    }
    /**
     * Overrides forward navigation from the page level. Allows you to use an
     * alternate function for validation or data-munging before moving the
     * wizard to the next pagewhen combined with the ClrWizardPage.onCommit
     * (clrWizardPageOnCommit) or ClrWizardPage.nextButtonClicked
     * (clrWizardPageNext) outputs.
     *
     * Requires that you manually tell the wizard to navigate forward from
     * the hostComponent, usually with a call to Wizard.forceNext() or
     * wizard.next();
     *
     * \@memberof ClrWizardPage
     * @param {?} val
     * @return {?}
     */
    set stopNext(val) {
        /** @type {?} */
        const valBool = !!val;
        if (valBool !== this._stopNext) {
            this._stopNext = valBool;
        }
    }
    /**
     * A read-only getter that generates an ID string for the wizard page from
     * either the value passed to the ClrWizardPage "id" input or a wizard page
     * counter shared across all wizard pages in the application.
     *
     * Note that the value passed into the ID input Will be prefixed with
     * "clr-wizard-page-".
     *
     * \@readonly
     *
     * \@memberof ClrWizardPage
     * @return {?}
     */
    get id() {
        // covers things like null, undefined, false, and empty string
        // while allowing zero to pass
        /** @type {?} */
        const idIsNonZeroFalsy = !this._id && this._id !== 0;
        // in addition to non-zero falsy we also want to make sure _id is not a negative
        // number.
        if (idIsNonZeroFalsy || this._id < 0) {
            // guard here in the event that input becomes undefined or null by accident
            this._id = (wizardPageIndex++).toString();
        }
        return `clr-wizard-page-${this._id}`;
    }
    /**
     * A read-only getter that serves as a convenience for those who would rather
     * not think in the terms of !ClrWizardPage.nextStepDisabled. For some use cases,
     * ClrWizardPage.readyToComplete is more logical and declarative.
     *
     * \@memberof WizardPage
     *
     * @return {?}
     */
    get readyToComplete() {
        return !this.nextStepDisabled;
    }
    /**
     * A page is marked as completed if it is both readyToComplete and completed,
     * as in the next or finish action has been executed while this page was current.
     *
     * Note there is and open question about how to handle pages that are marked
     * complete but who are no longer readyToComplete. This might indicate an error
     * state for the ClrWizardPage. Currently, the wizard does not acknowledge this state
     * and only returns that the page is incomplete.
     *
     * \@memberof WizardPage
     *
     * @return {?}
     */
    get completed() {
        return this._complete && this.readyToComplete;
        // FOR V2: UNWIND COMPLETED, READYTOCOMPLETE, AND ERRORS
        // SUCH THAT ERRORS IS ITS OWN INPUT. IF A STEP IS
        // INCOMPLETE AND ERRORED, ERRORED WILL NOT SHOW.
        // FIRST QUESTION: AM I GREY OR COLORED?
        // SECOND QUESTION: AM I GREEN OR RED?
    }
    /**
     * A ClrWizardPage can be manually set to completed using this boolean setter.
     * It is recommended that users rely on the convenience functions in the wizard
     * and navigation service instead of manually setting pages’ completion state.
     *
     * \@memberof ClrWizardPage
     * @param {?} value
     * @return {?}
     */
    set completed(value) {
        this._complete = value;
    }
    /**
     * Checks with the navigation service to see if it is the current page.
     *
     * \@memberof WizardPage
     *
     * @return {?}
     */
    get current() {
        return this.navService.currentPage === this;
    }
    /**
     * @return {?}
     */
    get disabled() {
        return !this.enabled;
    }
    /**
     * A read-only getter that returns whether or not the page is navigable
     * in the wizard. A wizard page can be navigated to if it is completed
     * or the page before it is completed.
     *
     * This getter handles the logic for enabling or disabling the links in
     * the step nav on the left Side of the wizard.
     *
     * \@memberof WizardPage
     *
     * @return {?}
     */
    get enabled() {
        return this.current || this.completed || this.previousCompleted;
    }
    /**
     * A read-only getter that returns whether or not the page before this
     * ClrWizardPage is completed. This is useful for determining whether or not
     * a page is navigable if it is not current or already completed.
     *
     * \@memberof WizardPage
     *
     * @return {?}
     */
    get previousCompleted() {
        /** @type {?} */
        const previousPage = this.pageCollection.getPreviousPage(this);
        if (!previousPage) {
            return true;
        }
        return previousPage.completed;
    }
    /**
     *
     * \@memberof WizardPage
     *
     * @return {?}
     */
    get title() {
        return this.pageTitle.pageTitleTemplateRef;
    }
    /**
     *
     * \@memberof WizardPage
     *
     * @return {?}
     */
    get navTitle() {
        if (this.pageNavTitle) {
            return this.pageNavTitle.pageNavTitleTemplateRef;
        }
        return this.pageTitle.pageTitleTemplateRef;
    }
    /**
     *
     * \@memberof WizardPage
     *
     * @return {?}
     */
    get headerActions() {
        if (!this._headerActions) {
            return;
        }
        return this._headerActions.pageHeaderActionsTemplateRef;
    }
    /**
     *
     * \@memberof WizardPage
     *
     * @return {?}
     */
    get hasHeaderActions() {
        return !!this._headerActions;
    }
    /**
     *
     * \@memberof WizardPage
     *
     * @return {?}
     */
    get buttons() {
        if (!this._buttons) {
            return;
        }
        return this._buttons.pageButtonsTemplateRef;
    }
    /**
     * A read-only getter that returns a boolean that says whether or
     * not the ClrWizardPage includes buttons. Used to determine if the
     * Wizard should override the default button set defined as
     * its direct children.
     *
     * \@memberof WizardPage
     *
     * @return {?}
     */
    get hasButtons() {
        return !!this._buttons;
    }
    /**
     * Uses the nav service to make the ClrWizardPage the current page in the
     * wizard. Bypasses all checks but still emits the ClrWizardPage.onLoad
     * (clrWizardPageOnLoad) output.
     *
     * In most cases, it is better to use the default navigation functions
     * in Wizard.
     *
     * \@memberof WizardPage
     *
     * @return {?}
     */
    makeCurrent() {
        this.navService.currentPage = this;
    }
    /**
     * Links the nav service and establishes the current page if one is not defined.
     *
     * \@memberof WizardPage
     *
     * @return {?}
     */
    ngOnInit() {
        /** @type {?} */
        const navService = this.navService;
        if (!navService.currentPage && !navService.navServiceLoaded) {
            this.makeCurrent();
            this.navService.navServiceLoaded = true;
        }
    }
    /**
     * A read-only getter that returns the id used by the step nav item associated with the page.
     *
     * ClrWizardPage needs this ID string for aria information.
     *
     * \@memberof WizardPage
     *
     * @return {?}
     */
    get stepItemId() {
        return this.pageCollection.getStepItemIdForPage(this);
    }
}
ClrWizardPage.decorators = [
    { type: Component, args: [{
                selector: 'clr-wizard-page',
                template: '<ng-content></ng-content>',
                host: {
                    '[id]': 'id',
                    role: 'tabpanel',
                    '[attr.aria-hidden]': '!current',
                    '[attr.aria-labelledby]': 'stepItemId',
                    '[class.active]': 'current',
                    '[class.clr-wizard-page]': 'true',
                }
            }] }
];
/** @nocollapse */
ClrWizardPage.ctorParameters = () => [
    { type: WizardNavigationService },
    { type: PageCollectionService },
    { type: ButtonHubService }
];
ClrWizardPage.propDecorators = {
    pageTitle: [{ type: ContentChild, args: [ClrWizardPageTitle, { static: true },] }],
    pageNavTitle: [{ type: ContentChild, args: [ClrWizardPageNavTitle, { static: true },] }],
    _buttons: [{ type: ContentChild, args: [ClrWizardPageButtons, { static: true },] }],
    _headerActions: [{ type: ContentChild, args: [ClrWizardPageHeaderActions, { static: true },] }],
    nextStepDisabled: [{ type: Input, args: ['clrWizardPageNextDisabled',] }],
    nextStepDisabledChange: [{ type: Output, args: ['clrWizardPageNextDisabledChange',] }],
    previousStepDisabled: [{ type: Input, args: ['clrWizardPagePreviousDisabled',] }],
    previousStepDisabledChange: [{ type: Output, args: ['clrWizardPagePreviousDisabledChange',] }],
    preventDefault: [{ type: Input, args: ['clrWizardPagePreventDefault',] }],
    stopCancel: [{ type: Input, args: ['clrWizardPagePreventDefaultCancel',] }],
    stopCancelChange: [{ type: Output, args: ['clrWizardPagePreventDefaultCancelChange',] }],
    stopNext: [{ type: Input, args: ['clrWizardPagePreventDefaultNext',] }],
    onCommit: [{ type: Output, args: ['clrWizardPageOnCommit',] }],
    onLoad: [{ type: Output, args: ['clrWizardPageOnLoad',] }],
    pageOnCancel: [{ type: Output, args: ['clrWizardPageOnCancel',] }],
    finishButtonClicked: [{ type: Output, args: ['clrWizardPageFinish',] }],
    previousButtonClicked: [{ type: Output, args: ['clrWizardPagePrevious',] }],
    nextButtonClicked: [{ type: Output, args: ['clrWizardPageNext',] }],
    dangerButtonClicked: [{ type: Output, args: ['clrWizardPageDanger',] }],
    primaryButtonClicked: [{ type: Output, args: ['clrWizardPagePrimary',] }],
    customButtonClicked: [{ type: Output, args: ['clrWizardPageCustomButton',] }],
    _id: [{ type: Input, args: ['id',] }]
};
if (false) {
    /**
     * Contains a reference to the page title which is used for a number
     * of different tasks for display in the wizard.
     *
     * \@memberof WizardPage
     *
     * @type {?}
     */
    ClrWizardPage.prototype.pageTitle;
    /**
     * Contains a reference to the desired title for the page's step in the
     * navigation on the left side of the wizard. Can be projected to change the
     * navigation link's text.
     *
     * If not defined, then ClrWizardPage.pageTitle will be displayed in the stepnav.
     *
     * \@memberof WizardPage
     *
     * @type {?}
     */
    ClrWizardPage.prototype.pageNavTitle;
    /**
     * Contains a reference to the buttons defined within the page. If not defined,
     * the wizard defaults to the set of buttons defined as a direct child of the
     * wizard.
     *
     * \@memberof WizardPage
     *
     * @type {?}
     */
    ClrWizardPage.prototype._buttons;
    /**
     * Contains a reference to the header actions defined within the page. If not defined,
     * the wizard defaults to the set of header actions defined as a direct child of the
     * wizard.
     *
     * \@memberof WizardPage
     *
     * @type {?}
     */
    ClrWizardPage.prototype._headerActions;
    /**
     *
     * \@memberof WizardPage
     *
     * @type {?}
     * @private
     */
    ClrWizardPage.prototype._nextStepDisabled;
    /**
     * Emits when the value of ClrWizardPage.nextStepDisabled changes.
     * Should emit the new value of nextStepDisabled.
     *
     * \@memberof WizardPage
     *
     * @type {?}
     */
    ClrWizardPage.prototype.nextStepDisabledChange;
    /**
     *
     * \@memberof WizardPage
     *
     * @type {?}
     * @private
     */
    ClrWizardPage.prototype._previousStepDisabled;
    /**
     * Emits when the value of ClrWizardPage.previousStepDisabled changes.
     * Should emit the new value of previousStepDisabled.
     *
     * \@memberof WizardPage
     *
     * @type {?}
     */
    ClrWizardPage.prototype.previousStepDisabledChange;
    /**
     * Overrides all actions from the page level, so you can use an alternate function for
     * validation or data-munging with a ClrWizardPage.onCommit (clrWizardPageOnCommit output),
     * ClrWizardPage.onCancel (clrWizardPageOnCancel output), or one
     * of the granular page-level button click event emitters.
     *
     * \@memberof WizardPage
     *
     * @type {?}
     */
    ClrWizardPage.prototype.preventDefault;
    /**
     *
     * \@memberof WizardPage
     *
     * @type {?}
     * @private
     */
    ClrWizardPage.prototype._stopCancel;
    /**
     *
     * \@memberof WizardPage
     *
     * @type {?}
     */
    ClrWizardPage.prototype.stopCancelChange;
    /**
     *
     * \@memberof WizardPage
     *
     * @type {?}
     * @private
     */
    ClrWizardPage.prototype._stopNext;
    /**
     * An event emitter carried over from a legacy version of ClrWizardPage.
     * Fires an event on ClrWizardPage whenever the next or finish buttons
     * are clicked and the page is the current page of the Wizard.
     *
     * Note that this does not automatically emit an event when a custom
     * button is used in place of a next or finish button.
     *
     * \@memberof WizardPage
     *
     * @type {?}
     */
    ClrWizardPage.prototype.onCommit;
    /**
     * Emits an event when ClrWizardPage becomes the current page of the
     * Wizard.
     *
     * \@memberof WizardPage
     *
     * @type {?}
     */
    ClrWizardPage.prototype.onLoad;
    /**
     * Emits an event when the ClrWizardPage invokes the cancel routine for the wizard.
     *
     * Can be used in conjunction with the ClrWizardPage.stopCancel
     * (clrWizardPagePreventDefaultCancel) or ClrWizardPage.preventDefault
     * (clrWizardPagePagePreventDefault) inputs to implement custom cancel
     * functionality at the page level. This is useful if you would like to do
     * validation, save data, or warn users before cancelling the wizard.
     *
     * Note that this requires you to call Wizard.close() from the host component.
     * This constitues a full replacement of the cancel functionality.
     *
     * \@memberof WizardPage
     *
     * @type {?}
     */
    ClrWizardPage.prototype.pageOnCancel;
    /**
     * Emits an event when the finish button is clicked and the ClrWizardPage is
     * the wizard's current page.
     *
     * Can be used in conjunction with the ClrWizardPage.preventDefault
     * (clrWizardPagePagePreventDefault) input to implement custom finish
     * functionality at the page level. This is useful if you would like to do
     * validation, save data, or warn users before allowing them to complete
     * the wizard.
     *
     * Note that this requires you to call Wizard.finish() or Wizard.forceFinish()
     * from the host component. This combination creates a full replacement of
     * the finish functionality.
     *
     * \@memberof WizardPage
     *
     * @type {?}
     */
    ClrWizardPage.prototype.finishButtonClicked;
    /**
     * Emits an event when the previous button is clicked and the ClrWizardPage is
     * the wizard's current page.
     *
     * Can be used in conjunction with the ClrWizardPage.preventDefault
     * (clrWizardPagePagePreventDefault) input to implement custom backwards
     * navigation at the page level. This is useful if you would like to do
     * validation, save data, or warn users before allowing them to go
     * backwards in the wizard.
     *
     * Note that this requires you to call Wizard.previous()
     * from the host component. This combination creates a full replacement of
     * the backwards navigation functionality.
     *
     * \@memberof WizardPage
     *
     * @type {?}
     */
    ClrWizardPage.prototype.previousButtonClicked;
    /**
     * Emits an event when the next button is clicked and the ClrWizardPage is
     * the wizard's current page.
     *
     * Can be used in conjunction with the ClrWizardPage.preventDefault
     * (clrWizardPagePagePreventDefault) input to implement custom forwards
     * navigation at the page level. This is useful if you would like to do
     * validation, save data, or warn users before allowing them to go
     * to the next page in the wizard.
     *
     * Note that this requires you to call Wizard.forceNext() or Wizard.next()
     * from the host component. This combination creates a full replacement of
     * the forward navigation functionality.
     *
     * \@memberof WizardPage
     *
     * @type {?}
     */
    ClrWizardPage.prototype.nextButtonClicked;
    /**
     * Emits an event when a danger button is clicked and the ClrWizardPage is
     * the wizard's current page. By default, a danger button will act as
     * either a "next" or "finish" button depending on if the ClrWizardPage is the
     * last page or not.
     *
     * Can be used in conjunction with the ClrWizardPage.preventDefault
     * (clrWizardPagePagePreventDefault) input to implement custom forwards
     * or finish navigation at the page level when the danger button is clicked.
     * This is useful if you would like to do validation, save data, or warn
     * users before allowing them to go to the next page in the wizard or
     * finish the wizard.
     *
     * Note that this requires you to call Wizard.finish(), Wizard.forceFinish(),
     * Wizard.forceNext() or Wizard.next() from the host component. This
     * combination creates a full replacement of the forward navigation and
     * finish functionality.
     *
     * \@memberof WizardPage
     *
     * @type {?}
     */
    ClrWizardPage.prototype.dangerButtonClicked;
    /**
     * Emits an event when a next, finish, or danger button is clicked and the
     * ClrWizardPage is the wizard's current page.
     *
     * Can be used in conjunction with the ClrWizardPage.preventDefault
     * (clrWizardPagePagePreventDefault) input to implement custom forwards
     * or finish navigation at the page level, regardless of the type of
     * primary button.
     *
     * This is useful if you would like to do validation, save data, or warn
     * users before allowing them to go to the next page in the wizard or
     * finish the wizard.
     *
     * Note that this requires you to call Wizard.finish(), Wizard.forceFinish(),
     * Wizard.forceNext() or Wizard.next() from the host component. This
     * combination creates a full replacement of the forward navigation and
     * finish functionality.
     *
     * \@memberof WizardPage
     *
     * @type {?}
     */
    ClrWizardPage.prototype.primaryButtonClicked;
    /** @type {?} */
    ClrWizardPage.prototype.customButtonClicked;
    /**
     * An input value that is used internally to generate the ClrWizardPage ID as
     * well as the step nav item ID.
     *
     * Typed as any because it should be able to accept numbers as well as
     * strings. Passing an index for wizard whose pages are created with an
     * ngFor loop is a common use case.
     *
     * \@memberof WizardPage
     *
     * @type {?}
     */
    ClrWizardPage.prototype._id;
    /**
     *
     * \@memberof WizardPage
     *
     * @type {?}
     * @private
     */
    ClrWizardPage.prototype._complete;
    /**
     * @type {?}
     * @private
     */
    ClrWizardPage.prototype.navService;
    /** @type {?} */
    ClrWizardPage.prototype.pageCollection;
    /** @type {?} */
    ClrWizardPage.prototype.buttonService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l6YXJkLXBhZ2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJ3aXphcmQvd2l6YXJkLXBhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBTUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQWUsTUFBTSxlQUFlLENBQUM7QUFFMUcsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDbEUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDNUUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDaEYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDN0QsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDMUUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDL0QsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0scUJBQXFCLENBQUM7O0lBRXJELGVBQWUsR0FBRyxDQUFDOzs7Ozs7Ozs7OztBQXdCdkIsTUFBTSxPQUFPLGFBQWE7Ozs7Ozs7OztJQU14QixZQUNVLFVBQW1DLEVBQ3BDLGNBQXFDLEVBQ3JDLGFBQStCO1FBRjlCLGVBQVUsR0FBVixVQUFVLENBQXlCO1FBQ3BDLG1CQUFjLEdBQWQsY0FBYyxDQUF1QjtRQUNyQyxrQkFBYSxHQUFiLGFBQWEsQ0FBa0I7Ozs7OztRQXFEaEMsc0JBQWlCLEdBQUcsS0FBSyxDQUFDOzs7Ozs7OztRQTBDUywyQkFBc0IsR0FBMEIsSUFBSSxZQUFZLEVBQUUsQ0FBQzs7Ozs7O1FBT3RHLDBCQUFxQixHQUFHLEtBQUssQ0FBQzs7Ozs7Ozs7UUEyQy9CLCtCQUEwQixHQUEwQixJQUFJLFlBQVksRUFBRSxDQUFDOzs7Ozs7Ozs7O1FBV2pDLG1CQUFj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QyxtQ0FBMkM7O0lBQzNDLHVDQUE0Qzs7SUFDNUMsc0NBQXNDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQsIENvbnRlbnRDaGlsZCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEJ1dHRvbkh1YlNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9idXR0b24taHViLnNlcnZpY2UnO1xuaW1wb3J0IHsgUGFnZUNvbGxlY3Rpb25TZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvcGFnZS1jb2xsZWN0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgV2l6YXJkTmF2aWdhdGlvblNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy93aXphcmQtbmF2aWdhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IENscldpemFyZFBhZ2VCdXR0b25zIH0gZnJvbSAnLi93aXphcmQtcGFnZS1idXR0b25zJztcbmltcG9ydCB7IENscldpemFyZFBhZ2VIZWFkZXJBY3Rpb25zIH0gZnJvbSAnLi93aXphcmQtcGFnZS1oZWFkZXItYWN0aW9ucyc7XG5pbXBvcnQgeyBDbHJXaXphcmRQYWdlTmF2VGl0bGUgfSBmcm9tICcuL3dpemFyZC1wYWdlLW5hdnRpdGxlJztcbmltcG9ydCB7IENscldpemFyZFBhZ2VUaXRsZSB9IGZyb20gJy4vd2l6YXJkLXBhZ2UtdGl0bGUnO1xuXG5sZXQgd2l6YXJkUGFnZUluZGV4ID0gMDtcblxuLyoqXG4gKiBUaGUgQ2xyV2l6YXJkUGFnZSBjb21wb25lbnQgaXMgcmVzcG9uc2libGUgZm9yIGRpc3BsYXlpbmcgdGhlIGNvbnRlbnQgb2YgZWFjaCBzdGVwXG4gKiBpbiB0aGUgd2l6YXJkIHdvcmtmbG93LlxuICpcbiAqIENscldpemFyZFBhZ2UgY29tcG9uZW50IGhhcyBob29rcyBpbnRvIHRoZSBuYXZpZ2F0aW9uIHNlcnZpY2UgKENscldpemFyZFBhZ2UubmF2U2VydmljZSksXG4gKiBwYWdlIGNvbGxlY3Rpb24gKENscldpemFyZFBhZ2UucGFnZUNvbGxlY3Rpb24pLCBhbmQgYnV0dG9uIHNlcnZpY2VcbiAqIChDbHJXaXphcmRQYWdlLmJ1dHRvblNlcnZpY2UpLiBUaGVzZSB0aHJlZSBwcm92aWRlcnMgYXJlIHNoYXJlZCBhY3Jvc3MgdGhlIGNvbXBvbmVudHNcbiAqIHdpdGhpbiBlYWNoIGluc3RhbmNlIG9mIGEgV2l6YXJkLlxuICpcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLXdpemFyZC1wYWdlJyxcbiAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+JyxcbiAgaG9zdDoge1xuICAgICdbaWRdJzogJ2lkJyxcbiAgICByb2xlOiAndGFicGFuZWwnLFxuICAgICdbYXR0ci5hcmlhLWhpZGRlbl0nOiAnIWN1cnJlbnQnLFxuICAgICdbYXR0ci5hcmlhLWxhYmVsbGVkYnldJzogJ3N0ZXBJdGVtSWQnLFxuICAgICdbY2xhc3MuYWN0aXZlXSc6ICdjdXJyZW50JyxcbiAgICAnW2NsYXNzLmNsci13aXphcmQtcGFnZV0nOiAndHJ1ZScsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIENscldpemFyZFBhZ2UgaW1wbGVtZW50cyBPbkluaXQge1xuICAvKipcbiAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBDbHJXaXphcmRQYWdlLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkUGFnZVxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBuYXZTZXJ2aWNlOiBXaXphcmROYXZpZ2F0aW9uU2VydmljZSxcbiAgICBwdWJsaWMgcGFnZUNvbGxlY3Rpb246IFBhZ2VDb2xsZWN0aW9uU2VydmljZSxcbiAgICBwdWJsaWMgYnV0dG9uU2VydmljZTogQnV0dG9uSHViU2VydmljZVxuICApIHt9XG5cbiAgLyoqXG4gICAqIENvbnRhaW5zIGEgcmVmZXJlbmNlIHRvIHRoZSBwYWdlIHRpdGxlIHdoaWNoIGlzIHVzZWQgZm9yIGEgbnVtYmVyXG4gICAqIG9mIGRpZmZlcmVudCB0YXNrcyBmb3IgZGlzcGxheSBpbiB0aGUgd2l6YXJkLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkUGFnZVxuICAgKlxuICAgKi9cbiAgQENvbnRlbnRDaGlsZChDbHJXaXphcmRQYWdlVGl0bGUsIHsgc3RhdGljOiB0cnVlIH0pXG4gIHB1YmxpYyBwYWdlVGl0bGU6IENscldpemFyZFBhZ2VUaXRsZTtcblxuICAvKipcbiAgICogQ29udGFpbnMgYSByZWZlcmVuY2UgdG8gdGhlIGRlc2lyZWQgdGl0bGUgZm9yIHRoZSBwYWdlJ3Mgc3RlcCBpbiB0aGVcbiAgICogbmF2aWdhdGlvbiBvbiB0aGUgbGVmdCBzaWRlIG9mIHRoZSB3aXphcmQuIENhbiBiZSBwcm9qZWN0ZWQgdG8gY2hhbmdlIHRoZVxuICAgKiBuYXZpZ2F0aW9uIGxpbmsncyB0ZXh0LlxuICAgKlxuICAgKiBJZiBub3QgZGVmaW5lZCwgdGhlbiBDbHJXaXphcmRQYWdlLnBhZ2VUaXRsZSB3aWxsIGJlIGRpc3BsYXllZCBpbiB0aGUgc3RlcG5hdi5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFBhZ2VcbiAgICpcbiAgICovXG4gIEBDb250ZW50Q2hpbGQoQ2xyV2l6YXJkUGFnZU5hdlRpdGxlLCB7IHN0YXRpYzogdHJ1ZSB9KVxuICBwdWJsaWMgcGFnZU5hdlRpdGxlOiBDbHJXaXphcmRQYWdlTmF2VGl0bGU7XG5cbiAgLyoqXG4gICAqIENvbnRhaW5zIGEgcmVmZXJlbmNlIHRvIHRoZSBidXR0b25zIGRlZmluZWQgd2l0aGluIHRoZSBwYWdlLiBJZiBub3QgZGVmaW5lZCxcbiAgICogdGhlIHdpemFyZCBkZWZhdWx0cyB0byB0aGUgc2V0IG9mIGJ1dHRvbnMgZGVmaW5lZCBhcyBhIGRpcmVjdCBjaGlsZCBvZiB0aGVcbiAgICogd2l6YXJkLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkUGFnZVxuICAgKlxuICAgKi9cbiAgQENvbnRlbnRDaGlsZChDbHJXaXphcmRQYWdlQnV0dG9ucywgeyBzdGF0aWM6IHRydWUgfSlcbiAgcHVibGljIF9idXR0b25zOiBDbHJXaXphcmRQYWdlQnV0dG9ucztcblxuICAvKipcbiAgICogQ29udGFpbnMgYSByZWZlcmVuY2UgdG8gdGhlIGhlYWRlciBhY3Rpb25zIGRlZmluZWQgd2l0aGluIHRoZSBwYWdlLiBJZiBub3QgZGVmaW5lZCxcbiAgICogdGhlIHdpemFyZCBkZWZhdWx0cyB0byB0aGUgc2V0IG9mIGhlYWRlciBhY3Rpb25zIGRlZmluZWQgYXMgYSBkaXJlY3QgY2hpbGQgb2YgdGhlXG4gICAqIHdpemFyZC5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFBhZ2VcbiAgICpcbiAgICovXG4gIEBDb250ZW50Q2hpbGQoQ2xyV2l6YXJkUGFnZUhlYWRlckFjdGlvbnMsIHsgc3RhdGljOiB0cnVlIH0pXG4gIHB1YmxpYyBfaGVhZGVyQWN0aW9uczogQ2xyV2l6YXJkUGFnZUhlYWRlckFjdGlvbnM7XG5cbiAgLyoqXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRQYWdlXG4gICAqXG4gICAqL1xuICBwcml2YXRlIF9uZXh0U3RlcERpc2FibGVkID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIEEgZ2V0dGVyIHRoYXQgdGVsbHMgd2hldGhlciBvciBub3QgdGhlIHdpemFyZCBzaG91bGQgYmUgYWxsb3dlZFxuICAgKiB0byBtb3ZlIHRvIHRoZSBuZXh0IHBhZ2UuXG4gICAqXG4gICAqIFVzZWZ1bCBmb3IgaW4tcGFnZSB2YWxpZGF0aW9uIGJlY2F1c2UgaXQgcHJldmVudHMgZm9yd2FyZCBuYXZpZ2F0aW9uXG4gICAqIGFuZCB2aXNpYmx5IGRpc2FibGVzIHRoZSBuZXh0IGJ1dHRvbi5cbiAgICpcbiAgICogRG9lcyBub3QgcmVxdWlyZSB0aGF0IHlvdSByZS1pbXBsZW1lbnQgbmF2aWdhdGlvbiByb3V0aW5lcyBsaWtlIHlvdVxuICAgKiB3b3VsZCBpZiB5b3Ugd2VyZSB1c2luZyBDbHJXaXphcmRQYWdlLnByZXZlbnREZWZhdWx0IG9yXG4gICAqIFdpemFyZC5wcmV2ZW50RGVmYXVsdC5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFBhZ2VcbiAgICpcbiAgICovXG4gIHB1YmxpYyBnZXQgbmV4dFN0ZXBEaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fbmV4dFN0ZXBEaXNhYmxlZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHdoZXRoZXIgdGhlIHBhZ2Ugc2hvdWxkIGFsbG93IGZvcndhcmQgbmF2aWdhdGlvbi5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFBhZ2VcbiAgICpcbiAgICovXG4gIEBJbnB1dCgnY2xyV2l6YXJkUGFnZU5leHREaXNhYmxlZCcpXG4gIHB1YmxpYyBzZXQgbmV4dFN0ZXBEaXNhYmxlZCh2YWw6IGJvb2xlYW4pIHtcbiAgICBjb25zdCB2YWxCb29sID0gISF2YWw7XG4gICAgaWYgKHZhbEJvb2wgIT09IHRoaXMuX25leHRTdGVwRGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuX25leHRTdGVwRGlzYWJsZWQgPSB2YWxCb29sO1xuICAgICAgdGhpcy5uZXh0U3RlcERpc2FibGVkQ2hhbmdlLmVtaXQodmFsQm9vbCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEVtaXRzIHdoZW4gdGhlIHZhbHVlIG9mIENscldpemFyZFBhZ2UubmV4dFN0ZXBEaXNhYmxlZCBjaGFuZ2VzLlxuICAgKiBTaG91bGQgZW1pdCB0aGUgbmV3IHZhbHVlIG9mIG5leHRTdGVwRGlzYWJsZWQuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRQYWdlXG4gICAqXG4gICAqL1xuICBAT3V0cHV0KCdjbHJXaXphcmRQYWdlTmV4dERpc2FibGVkQ2hhbmdlJykgbmV4dFN0ZXBEaXNhYmxlZENoYW5nZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8qKlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkUGFnZVxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBfcHJldmlvdXNTdGVwRGlzYWJsZWQgPSBmYWxzZTtcblxuICAvKipcbiAgICogQSBnZXR0ZXIgdGhhdCB0ZWxscyB3aGV0aGVyIG9yIG5vdCB0aGUgd2l6YXJkIHNob3VsZCBiZSBhbGxvd2VkXG4gICAqIHRvIG1vdmUgdG8gdGhlIHByZXZpb3VzIHBhZ2UuXG4gICAqXG4gICAqIFVzZWZ1bCBmb3IgaW4tcGFnZSB2YWxpZGF0aW9uIGJlY2F1c2UgaXQgcHJldmVudHMgYmFja3dhcmQgbmF2aWdhdGlvblxuICAgKiBhbmQgdmlzaWJseSBkaXNhYmxlcyB0aGUgcHJldmlvdXMgYnV0dG9uLlxuICAgKlxuICAgKiBEb2VzIG5vdCByZXF1aXJlIHRoYXQgeW91IHJlLWltcGxlbWVudCBuYXZpZ2F0aW9uIHJvdXRpbmVzIGxpa2UgeW91XG4gICAqIHdvdWxkIGlmIHlvdSB3ZXJlIHVzaW5nIENscldpemFyZFBhZ2UucHJldmVudERlZmF1bHQgb3JcbiAgICogV2l6YXJkLnByZXZlbnREZWZhdWx0LlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkUGFnZVxuICAgKlxuICAgKi9cbiAgcHVibGljIGdldCBwcmV2aW91c1N0ZXBEaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fcHJldmlvdXNTdGVwRGlzYWJsZWQ7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB3aGV0aGVyIHRoZSBwYWdlIHNob3VsZCBhbGxvdyBiYWNrd2FyZCBuYXZpZ2F0aW9uLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkUGFnZVxuICAgKlxuICAgKi9cbiAgQElucHV0KCdjbHJXaXphcmRQYWdlUHJldmlvdXNEaXNhYmxlZCcpXG4gIHB1YmxpYyBzZXQgcHJldmlvdXNTdGVwRGlzYWJsZWQodmFsOiBib29sZWFuKSB7XG4gICAgY29uc3QgdmFsQm9vbCA9ICEhdmFsO1xuICAgIGlmICh2YWxCb29sICE9PSB0aGlzLl9wcmV2aW91c1N0ZXBEaXNhYmxlZCkge1xuICAgICAgdGhpcy5fcHJldmlvdXNTdGVwRGlzYWJsZWQgPSB2YWxCb29sO1xuICAgICAgdGhpcy5wcmV2aW91c1N0ZXBEaXNhYmxlZENoYW5nZS5lbWl0KHZhbEJvb2wpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBFbWl0cyB3aGVuIHRoZSB2YWx1ZSBvZiBDbHJXaXphcmRQYWdlLnByZXZpb3VzU3RlcERpc2FibGVkIGNoYW5nZXMuXG4gICAqIFNob3VsZCBlbWl0IHRoZSBuZXcgdmFsdWUgb2YgcHJldmlvdXNTdGVwRGlzYWJsZWQuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRQYWdlXG4gICAqXG4gICAqL1xuICBAT3V0cHV0KCdjbHJXaXphcmRQYWdlUHJldmlvdXNEaXNhYmxlZENoYW5nZScpXG4gIHB1YmxpYyBwcmV2aW91c1N0ZXBEaXNhYmxlZENoYW5nZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8qKlxuICAgKiBPdmVycmlkZXMgYWxsIGFjdGlvbnMgZnJvbSB0aGUgcGFnZSBsZXZlbCwgc28geW91IGNhbiB1c2UgYW4gYWx0ZXJuYXRlIGZ1bmN0aW9uIGZvclxuICAgKiB2YWxpZGF0aW9uIG9yIGRhdGEtbXVuZ2luZyB3aXRoIGEgQ2xyV2l6YXJkUGFnZS5vbkNvbW1pdCAoY2xyV2l6YXJkUGFnZU9uQ29tbWl0IG91dHB1dCksXG4gICAqIENscldpemFyZFBhZ2Uub25DYW5jZWwgKGNscldpemFyZFBhZ2VPbkNhbmNlbCBvdXRwdXQpLCBvciBvbmVcbiAgICogb2YgdGhlIGdyYW51bGFyIHBhZ2UtbGV2ZWwgYnV0dG9uIGNsaWNrIGV2ZW50IGVtaXR0ZXJzLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkUGFnZVxuICAgKlxuICAgKi9cbiAgQElucHV0KCdjbHJXaXphcmRQYWdlUHJldmVudERlZmF1bHQnKSBwdWJsaWMgcHJldmVudERlZmF1bHQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKipcbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFBhZ2VcbiAgICpcbiAgICovXG4gIHByaXZhdGUgX3N0b3BDYW5jZWwgPSBmYWxzZTtcblxuICAvKipcbiAgICogQSBnZXR0ZXIgdGhhdCByZXRyaWV2ZXMgd2hldGhlciB0aGUgcGFnZSBpcyBwcmV2ZW50aW5nIHRoZSBjYW5jZWwgYWN0aW9uLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkUGFnZVxuICAgKlxuICAgKi9cbiAgcHVibGljIGdldCBzdG9wQ2FuY2VsKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9zdG9wQ2FuY2VsO1xuICB9XG5cbiAgLyoqXG4gICAqIE92ZXJyaWRlcyB0aGUgY2FuY2VsIGFjdGlvbiBmcm9tIHRoZSBwYWdlIGxldmVsLiBBbGxvd3MgeW91IHRvIHVzZSBhblxuICAgKiBhbHRlcm5hdGUgZnVuY3Rpb24gZm9yIHZhbGlkYXRpb24gb3IgZGF0YS1tdW5naW5nIGJlZm9yZSBjYW5jZWxsaW5nIHRoZVxuICAgKiB3aXphcmQgd2hlbiBjb21iaW5lZCB3aXRoIHRoZSBDbHJXaXphcmRQYWdlLm9uQ2FuY2VsXG4gICAqICh0aGUgY2xyV2l6YXJkUGFnZU9uQ2FuY2VsIG91dHB1dCkuXG4gICAqXG4gICAqIFJlcXVpcmVzIHRoYXQgeW91IG1hbnVhbGx5IGNsb3NlIHRoZSB3aXphcmQgZnJvbSB5b3VyIGhvc3QgY29tcG9uZW50LFxuICAgKiB1c3VhbGx5IHdpdGggYSBjYWxsIHRvIFdpemFyZC5mb3JjZU5leHQoKSBvciB3aXphcmQubmV4dCgpO1xuICAgKlxuICAgKiBAbWVtYmVyb2YgQ2xyV2l6YXJkUGFnZVxuICAgKi9cbiAgQElucHV0KCdjbHJXaXphcmRQYWdlUHJldmVudERlZmF1bHRDYW5jZWwnKVxuICBwdWJsaWMgc2V0IHN0b3BDYW5jZWwodmFsOiBib29sZWFuKSB7XG4gICAgY29uc3QgdmFsQm9vbCA9ICEhdmFsO1xuICAgIGlmICh2YWxCb29sICE9PSB0aGlzLl9zdG9wQ2FuY2VsKSB7XG4gICAgICB0aGlzLl9zdG9wQ2FuY2VsID0gdmFsQm9vbDtcbiAgICAgIHRoaXMuc3RvcENhbmNlbENoYW5nZS5lbWl0KHZhbEJvb2wpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkUGFnZVxuICAgKlxuICAgKi9cbiAgQE91dHB1dCgnY2xyV2l6YXJkUGFnZVByZXZlbnREZWZhdWx0Q2FuY2VsQ2hhbmdlJykgc3RvcENhbmNlbENoYW5nZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8qKlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkUGFnZVxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBfc3RvcE5leHQgPSBmYWxzZTtcblxuICAvKipcbiAgICogQSBnZXR0ZXIgdGhhdCB0ZWxscyB5b3Ugd2hldGhlciB0aGUgcGFnZSBpcyBwcmV2ZW50aW5nIHRoZSBuZXh0IGFjdGlvbi5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFBhZ2VcbiAgICpcbiAgICovXG4gIHB1YmxpYyBnZXQgc3RvcE5leHQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3N0b3BOZXh0O1xuICB9XG5cbiAgLyoqXG4gICAqIE92ZXJyaWRlcyBmb3J3YXJkIG5hdmlnYXRpb24gZnJvbSB0aGUgcGFnZSBsZXZlbC4gQWxsb3dzIHlvdSB0byB1c2UgYW5cbiAgICogYWx0ZXJuYXRlIGZ1bmN0aW9uIGZvciB2YWxpZGF0aW9uIG9yIGRhdGEtbXVuZ2luZyBiZWZvcmUgbW92aW5nIHRoZVxuICAgKiB3aXphcmQgdG8gdGhlIG5leHQgcGFnZXdoZW4gY29tYmluZWQgd2l0aCB0aGUgQ2xyV2l6YXJkUGFnZS5vbkNvbW1pdFxuICAgKiAoY2xyV2l6YXJkUGFnZU9uQ29tbWl0KSBvciBDbHJXaXphcmRQYWdlLm5leHRCdXR0b25DbGlja2VkXG4gICAqIChjbHJXaXphcmRQYWdlTmV4dCkgb3V0cHV0cy5cbiAgICpcbiAgICogUmVxdWlyZXMgdGhhdCB5b3UgbWFudWFsbHkgdGVsbCB0aGUgd2l6YXJkIHRvIG5hdmlnYXRlIGZvcndhcmQgZnJvbVxuICAgKiB0aGUgaG9zdENvbXBvbmVudCwgdXN1YWxseSB3aXRoIGEgY2FsbCB0byBXaXphcmQuZm9yY2VOZXh0KCkgb3JcbiAgICogd2l6YXJkLm5leHQoKTtcbiAgICpcbiAgICogQG1lbWJlcm9mIENscldpemFyZFBhZ2VcbiAgICovXG4gIEBJbnB1dCgnY2xyV2l6YXJkUGFnZVByZXZlbnREZWZhdWx0TmV4dCcpXG4gIHB1YmxpYyBzZXQgc3RvcE5leHQodmFsOiBib29sZWFuKSB7XG4gICAgY29uc3QgdmFsQm9vbCA9ICEhdmFsO1xuICAgIGlmICh2YWxCb29sICE9PSB0aGlzLl9zdG9wTmV4dCkge1xuICAgICAgdGhpcy5fc3RvcE5leHQgPSB2YWxCb29sO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBbiBldmVudCBlbWl0dGVyIGNhcnJpZWQgb3ZlciBmcm9tIGEgbGVnYWN5IHZlcnNpb24gb2YgQ2xyV2l6YXJkUGFnZS5cbiAgICogRmlyZXMgYW4gZXZlbnQgb24gQ2xyV2l6YXJkUGFnZSB3aGVuZXZlciB0aGUgbmV4dCBvciBmaW5pc2ggYnV0dG9uc1xuICAgKiBhcmUgY2xpY2tlZCBhbmQgdGhlIHBhZ2UgaXMgdGhlIGN1cnJlbnQgcGFnZSBvZiB0aGUgV2l6YXJkLlxuICAgKlxuICAgKiBOb3RlIHRoYXQgdGhpcyBkb2VzIG5vdCBhdXRvbWF0aWNhbGx5IGVtaXQgYW4gZXZlbnQgd2hlbiBhIGN1c3RvbVxuICAgKiBidXR0b24gaXMgdXNlZCBpbiBwbGFjZSBvZiBhIG5leHQgb3IgZmluaXNoIGJ1dHRvbi5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFBhZ2VcbiAgICpcbiAgICovXG4gIEBPdXRwdXQoJ2NscldpemFyZFBhZ2VPbkNvbW1pdCcpIG9uQ29tbWl0OiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPihmYWxzZSk7XG5cbiAgLyoqXG4gICAqIEVtaXRzIGFuIGV2ZW50IHdoZW4gQ2xyV2l6YXJkUGFnZSBiZWNvbWVzIHRoZSBjdXJyZW50IHBhZ2Ugb2YgdGhlXG4gICAqIFdpemFyZC5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFBhZ2VcbiAgICpcbiAgICovXG4gIEBPdXRwdXQoJ2NscldpemFyZFBhZ2VPbkxvYWQnKSBvbkxvYWQ6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8qKlxuICAgKiBFbWl0cyBhbiBldmVudCB3aGVuIHRoZSBDbHJXaXphcmRQYWdlIGludm9rZXMgdGhlIGNhbmNlbCByb3V0aW5lIGZvciB0aGUgd2l6YXJkLlxuICAgKlxuICAgKiBDYW4gYmUgdXNlZCBpbiBjb25qdW5jdGlvbiB3aXRoIHRoZSBDbHJXaXphcmRQYWdlLnN0b3BDYW5jZWxcbiAgICogKGNscldpemFyZFBhZ2VQcmV2ZW50RGVmYXVsdENhbmNlbCkgb3IgQ2xyV2l6YXJkUGFnZS5wcmV2ZW50RGVmYXVsdFxuICAgKiAoY2xyV2l6YXJkUGFnZVBhZ2VQcmV2ZW50RGVmYXVsdCkgaW5wdXRzIHRvIGltcGxlbWVudCBjdXN0b20gY2FuY2VsXG4gICAqIGZ1bmN0aW9uYWxpdHkgYXQgdGhlIHBhZ2UgbGV2ZWwuIFRoaXMgaXMgdXNlZnVsIGlmIHlvdSB3b3VsZCBsaWtlIHRvIGRvXG4gICAqIHZhbGlkYXRpb24sIHNhdmUgZGF0YSwgb3Igd2FybiB1c2VycyBiZWZvcmUgY2FuY2VsbGluZyB0aGUgd2l6YXJkLlxuICAgKlxuICAgKiBOb3RlIHRoYXQgdGhpcyByZXF1aXJlcyB5b3UgdG8gY2FsbCBXaXphcmQuY2xvc2UoKSBmcm9tIHRoZSBob3N0IGNvbXBvbmVudC5cbiAgICogVGhpcyBjb25zdGl0dWVzIGEgZnVsbCByZXBsYWNlbWVudCBvZiB0aGUgY2FuY2VsIGZ1bmN0aW9uYWxpdHkuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRQYWdlXG4gICAqXG4gICAqL1xuICBAT3V0cHV0KCdjbHJXaXphcmRQYWdlT25DYW5jZWwnKSBwYWdlT25DYW5jZWw6IEV2ZW50RW1pdHRlcjxDbHJXaXphcmRQYWdlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAvKipcbiAgICogRW1pdHMgYW4gZXZlbnQgd2hlbiB0aGUgZmluaXNoIGJ1dHRvbiBpcyBjbGlja2VkIGFuZCB0aGUgQ2xyV2l6YXJkUGFnZSBpc1xuICAgKiB0aGUgd2l6YXJkJ3MgY3VycmVudCBwYWdlLlxuICAgKlxuICAgKiBDYW4gYmUgdXNlZCBpbiBjb25qdW5jdGlvbiB3aXRoIHRoZSBDbHJXaXphcmRQYWdlLnByZXZlbnREZWZhdWx0XG4gICAqIChjbHJXaXphcmRQYWdlUGFnZVByZXZlbnREZWZhdWx0KSBpbnB1dCB0byBpbXBsZW1lbnQgY3VzdG9tIGZpbmlzaFxuICAgKiBmdW5jdGlvbmFsaXR5IGF0IHRoZSBwYWdlIGxldmVsLiBUaGlzIGlzIHVzZWZ1bCBpZiB5b3Ugd291bGQgbGlrZSB0byBkb1xuICAgKiB2YWxpZGF0aW9uLCBzYXZlIGRhdGEsIG9yIHdhcm4gdXNlcnMgYmVmb3JlIGFsbG93aW5nIHRoZW0gdG8gY29tcGxldGVcbiAgICogdGhlIHdpemFyZC5cbiAgICpcbiAgICogTm90ZSB0aGF0IHRoaXMgcmVxdWlyZXMgeW91IHRvIGNhbGwgV2l6YXJkLmZpbmlzaCgpIG9yIFdpemFyZC5mb3JjZUZpbmlzaCgpXG4gICAqIGZyb20gdGhlIGhvc3QgY29tcG9uZW50LiBUaGlzIGNvbWJpbmF0aW9uIGNyZWF0ZXMgYSBmdWxsIHJlcGxhY2VtZW50IG9mXG4gICAqIHRoZSBmaW5pc2ggZnVuY3Rpb25hbGl0eS5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFBhZ2VcbiAgICpcbiAgICovXG4gIEBPdXRwdXQoJ2NscldpemFyZFBhZ2VGaW5pc2gnKSBmaW5pc2hCdXR0b25DbGlja2VkOiBFdmVudEVtaXR0ZXI8Q2xyV2l6YXJkUGFnZT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLyoqXG4gICAqIEVtaXRzIGFuIGV2ZW50IHdoZW4gdGhlIHByZXZpb3VzIGJ1dHRvbiBpcyBjbGlja2VkIGFuZCB0aGUgQ2xyV2l6YXJkUGFnZSBpc1xuICAgKiB0aGUgd2l6YXJkJ3MgY3VycmVudCBwYWdlLlxuICAgKlxuICAgKiBDYW4gYmUgdXNlZCBpbiBjb25qdW5jdGlvbiB3aXRoIHRoZSBDbHJXaXphcmRQYWdlLnByZXZlbnREZWZhdWx0XG4gICAqIChjbHJXaXphcmRQYWdlUGFnZVByZXZlbnREZWZhdWx0KSBpbnB1dCB0byBpbXBsZW1lbnQgY3VzdG9tIGJhY2t3YXJkc1xuICAgKiBuYXZpZ2F0aW9uIGF0IHRoZSBwYWdlIGxldmVsLiBUaGlzIGlzIHVzZWZ1bCBpZiB5b3Ugd291bGQgbGlrZSB0byBkb1xuICAgKiB2YWxpZGF0aW9uLCBzYXZlIGRhdGEsIG9yIHdhcm4gdXNlcnMgYmVmb3JlIGFsbG93aW5nIHRoZW0gdG8gZ29cbiAgICogYmFja3dhcmRzIGluIHRoZSB3aXphcmQuXG4gICAqXG4gICAqIE5vdGUgdGhhdCB0aGlzIHJlcXVpcmVzIHlvdSB0byBjYWxsIFdpemFyZC5wcmV2aW91cygpXG4gICAqIGZyb20gdGhlIGhvc3QgY29tcG9uZW50LiBUaGlzIGNvbWJpbmF0aW9uIGNyZWF0ZXMgYSBmdWxsIHJlcGxhY2VtZW50IG9mXG4gICAqIHRoZSBiYWNrd2FyZHMgbmF2aWdhdGlvbiBmdW5jdGlvbmFsaXR5LlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkUGFnZVxuICAgKlxuICAgKi9cbiAgQE91dHB1dCgnY2xyV2l6YXJkUGFnZVByZXZpb3VzJykgcHJldmlvdXNCdXR0b25DbGlja2VkOiBFdmVudEVtaXR0ZXI8Q2xyV2l6YXJkUGFnZT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLyoqXG4gICAqIEVtaXRzIGFuIGV2ZW50IHdoZW4gdGhlIG5leHQgYnV0dG9uIGlzIGNsaWNrZWQgYW5kIHRoZSBDbHJXaXphcmRQYWdlIGlzXG4gICAqIHRoZSB3aXphcmQncyBjdXJyZW50IHBhZ2UuXG4gICAqXG4gICAqIENhbiBiZSB1c2VkIGluIGNvbmp1bmN0aW9uIHdpdGggdGhlIENscldpemFyZFBhZ2UucHJldmVudERlZmF1bHRcbiAgICogKGNscldpemFyZFBhZ2VQYWdlUHJldmVudERlZmF1bHQpIGlucHV0IHRvIGltcGxlbWVudCBjdXN0b20gZm9yd2FyZHNcbiAgICogbmF2aWdhdGlvbiBhdCB0aGUgcGFnZSBsZXZlbC4gVGhpcyBpcyB1c2VmdWwgaWYgeW91IHdvdWxkIGxpa2UgdG8gZG9cbiAgICogdmFsaWRhdGlvbiwgc2F2ZSBkYXRhLCBvciB3YXJuIHVzZXJzIGJlZm9yZSBhbGxvd2luZyB0aGVtIHRvIGdvXG4gICAqIHRvIHRoZSBuZXh0IHBhZ2UgaW4gdGhlIHdpemFyZC5cbiAgICpcbiAgICogTm90ZSB0aGF0IHRoaXMgcmVxdWlyZXMgeW91IHRvIGNhbGwgV2l6YXJkLmZvcmNlTmV4dCgpIG9yIFdpemFyZC5uZXh0KClcbiAgICogZnJvbSB0aGUgaG9zdCBjb21wb25lbnQuIFRoaXMgY29tYmluYXRpb24gY3JlYXRlcyBhIGZ1bGwgcmVwbGFjZW1lbnQgb2ZcbiAgICogdGhlIGZvcndhcmQgbmF2aWdhdGlvbiBmdW5jdGlvbmFsaXR5LlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkUGFnZVxuICAgKlxuICAgKi9cbiAgQE91dHB1dCgnY2xyV2l6YXJkUGFnZU5leHQnKSBuZXh0QnV0dG9uQ2xpY2tlZDogRXZlbnRFbWl0dGVyPENscldpemFyZFBhZ2U+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8qKlxuICAgKiBFbWl0cyBhbiBldmVudCB3aGVuIGEgZGFuZ2VyIGJ1dHRvbiBpcyBjbGlja2VkIGFuZCB0aGUgQ2xyV2l6YXJkUGFnZSBpc1xuICAgKiB0aGUgd2l6YXJkJ3MgY3VycmVudCBwYWdlLiBCeSBkZWZhdWx0LCBhIGRhbmdlciBidXR0b24gd2lsbCBhY3QgYXNcbiAgICogZWl0aGVyIGEgXCJuZXh0XCIgb3IgXCJmaW5pc2hcIiBidXR0b24gZGVwZW5kaW5nIG9uIGlmIHRoZSBDbHJXaXphcmRQYWdlIGlzIHRoZVxuICAgKiBsYXN0IHBhZ2Ugb3Igbm90LlxuICAgKlxuICAgKiBDYW4gYmUgdXNlZCBpbiBjb25qdW5jdGlvbiB3aXRoIHRoZSBDbHJXaXphcmRQYWdlLnByZXZlbnREZWZhdWx0XG4gICAqIChjbHJXaXphcmRQYWdlUGFnZVByZXZlbnREZWZhdWx0KSBpbnB1dCB0byBpbXBsZW1lbnQgY3VzdG9tIGZvcndhcmRzXG4gICAqIG9yIGZpbmlzaCBuYXZpZ2F0aW9uIGF0IHRoZSBwYWdlIGxldmVsIHdoZW4gdGhlIGRhbmdlciBidXR0b24gaXMgY2xpY2tlZC5cbiAgICogVGhpcyBpcyB1c2VmdWwgaWYgeW91IHdvdWxkIGxpa2UgdG8gZG8gdmFsaWRhdGlvbiwgc2F2ZSBkYXRhLCBvciB3YXJuXG4gICAqIHVzZXJzIGJlZm9yZSBhbGxvd2luZyB0aGVtIHRvIGdvIHRvIHRoZSBuZXh0IHBhZ2UgaW4gdGhlIHdpemFyZCBvclxuICAgKiBmaW5pc2ggdGhlIHdpemFyZC5cbiAgICpcbiAgICogTm90ZSB0aGF0IHRoaXMgcmVxdWlyZXMgeW91IHRvIGNhbGwgV2l6YXJkLmZpbmlzaCgpLCBXaXphcmQuZm9yY2VGaW5pc2goKSxcbiAgICogV2l6YXJkLmZvcmNlTmV4dCgpIG9yIFdpemFyZC5uZXh0KCkgZnJvbSB0aGUgaG9zdCBjb21wb25lbnQuIFRoaXNcbiAgICogY29tYmluYXRpb24gY3JlYXRlcyBhIGZ1bGwgcmVwbGFjZW1lbnQgb2YgdGhlIGZvcndhcmQgbmF2aWdhdGlvbiBhbmRcbiAgICogZmluaXNoIGZ1bmN0aW9uYWxpdHkuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRQYWdlXG4gICAqXG4gICAqL1xuICBAT3V0cHV0KCdjbHJXaXphcmRQYWdlRGFuZ2VyJykgZGFuZ2VyQnV0dG9uQ2xpY2tlZDogRXZlbnRFbWl0dGVyPENscldpemFyZFBhZ2U+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8qKlxuICAgKiBFbWl0cyBhbiBldmVudCB3aGVuIGEgbmV4dCwgZmluaXNoLCBvciBkYW5nZXIgYnV0dG9uIGlzIGNsaWNrZWQgYW5kIHRoZVxuICAgKiBDbHJXaXphcmRQYWdlIGlzIHRoZSB3aXphcmQncyBjdXJyZW50IHBhZ2UuXG4gICAqXG4gICAqIENhbiBiZSB1c2VkIGluIGNvbmp1bmN0aW9uIHdpdGggdGhlIENscldpemFyZFBhZ2UucHJldmVudERlZmF1bHRcbiAgICogKGNscldpemFyZFBhZ2VQYWdlUHJldmVudERlZmF1bHQpIGlucHV0IHRvIGltcGxlbWVudCBjdXN0b20gZm9yd2FyZHNcbiAgICogb3IgZmluaXNoIG5hdmlnYXRpb24gYXQgdGhlIHBhZ2UgbGV2ZWwsIHJlZ2FyZGxlc3Mgb2YgdGhlIHR5cGUgb2ZcbiAgICogcHJpbWFyeSBidXR0b24uXG4gICAqXG4gICAqIFRoaXMgaXMgdXNlZnVsIGlmIHlvdSB3b3VsZCBsaWtlIHRvIGRvIHZhbGlkYXRpb24sIHNhdmUgZGF0YSwgb3Igd2FyblxuICAgKiB1c2VycyBiZWZvcmUgYWxsb3dpbmcgdGhlbSB0byBnbyB0byB0aGUgbmV4dCBwYWdlIGluIHRoZSB3aXphcmQgb3JcbiAgICogZmluaXNoIHRoZSB3aXphcmQuXG4gICAqXG4gICAqIE5vdGUgdGhhdCB0aGlzIHJlcXVpcmVzIHlvdSB0byBjYWxsIFdpemFyZC5maW5pc2goKSwgV2l6YXJkLmZvcmNlRmluaXNoKCksXG4gICAqIFdpemFyZC5mb3JjZU5leHQoKSBvciBXaXphcmQubmV4dCgpIGZyb20gdGhlIGhvc3QgY29tcG9uZW50LiBUaGlzXG4gICAqIGNvbWJpbmF0aW9uIGNyZWF0ZXMgYSBmdWxsIHJlcGxhY2VtZW50IG9mIHRoZSBmb3J3YXJkIG5hdmlnYXRpb24gYW5kXG4gICAqIGZpbmlzaCBmdW5jdGlvbmFsaXR5LlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkUGFnZVxuICAgKlxuICAgKi9cbiAgQE91dHB1dCgnY2xyV2l6YXJkUGFnZVByaW1hcnknKSBwcmltYXJ5QnV0dG9uQ2xpY2tlZDogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQE91dHB1dCgnY2xyV2l6YXJkUGFnZUN1c3RvbUJ1dHRvbicpIGN1c3RvbUJ1dHRvbkNsaWNrZWQ6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8qKlxuICAgKiBBbiBpbnB1dCB2YWx1ZSB0aGF0IGlzIHVzZWQgaW50ZXJuYWxseSB0byBnZW5lcmF0ZSB0aGUgQ2xyV2l6YXJkUGFnZSBJRCBhc1xuICAgKiB3ZWxsIGFzIHRoZSBzdGVwIG5hdiBpdGVtIElELlxuICAgKlxuICAgKiBUeXBlZCBhcyBhbnkgYmVjYXVzZSBpdCBzaG91bGQgYmUgYWJsZSB0byBhY2NlcHQgbnVtYmVycyBhcyB3ZWxsIGFzXG4gICAqIHN0cmluZ3MuIFBhc3NpbmcgYW4gaW5kZXggZm9yIHdpemFyZCB3aG9zZSBwYWdlcyBhcmUgY3JlYXRlZCB3aXRoIGFuXG4gICAqIG5nRm9yIGxvb3AgaXMgYSBjb21tb24gdXNlIGNhc2UuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRQYWdlXG4gICAqXG4gICAqL1xuICBASW5wdXQoJ2lkJykgX2lkOiBhbnkgPSAod2l6YXJkUGFnZUluZGV4KyspLnRvU3RyaW5nKCk7XG5cbiAgLyoqXG4gICAqIEEgcmVhZC1vbmx5IGdldHRlciB0aGF0IGdlbmVyYXRlcyBhbiBJRCBzdHJpbmcgZm9yIHRoZSB3aXphcmQgcGFnZSBmcm9tXG4gICAqIGVpdGhlciB0aGUgdmFsdWUgcGFzc2VkIHRvIHRoZSBDbHJXaXphcmRQYWdlIFwiaWRcIiBpbnB1dCBvciBhIHdpemFyZCBwYWdlXG4gICAqIGNvdW50ZXIgc2hhcmVkIGFjcm9zcyBhbGwgd2l6YXJkIHBhZ2VzIGluIHRoZSBhcHBsaWNhdGlvbi5cbiAgICpcbiAgICogTm90ZSB0aGF0IHRoZSB2YWx1ZSBwYXNzZWQgaW50byB0aGUgSUQgaW5wdXQgV2lsbCBiZSBwcmVmaXhlZCB3aXRoXG4gICAqIFwiY2xyLXdpemFyZC1wYWdlLVwiLlxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICpcbiAgICogQG1lbWJlcm9mIENscldpemFyZFBhZ2VcbiAgICovXG4gIHB1YmxpYyBnZXQgaWQoKSB7XG4gICAgLy8gY292ZXJzIHRoaW5ncyBsaWtlIG51bGwsIHVuZGVmaW5lZCwgZmFsc2UsIGFuZCBlbXB0eSBzdHJpbmdcbiAgICAvLyB3aGlsZSBhbGxvd2luZyB6ZXJvIHRvIHBhc3NcbiAgICBjb25zdCBpZElzTm9uWmVyb0ZhbHN5ID0gIXRoaXMuX2lkICYmIHRoaXMuX2lkICE9PSAwO1xuXG4gICAgLy8gaW4gYWRkaXRpb24gdG8gbm9uLXplcm8gZmFsc3kgd2UgYWxzbyB3YW50IHRvIG1ha2Ugc3VyZSBfaWQgaXMgbm90IGEgbmVnYXRpdmVcbiAgICAvLyBudW1iZXIuXG4gICAgaWYgKGlkSXNOb25aZXJvRmFsc3kgfHwgdGhpcy5faWQgPCAwKSB7XG4gICAgICAvLyBndWFyZCBoZXJlIGluIHRoZSBldmVudCB0aGF0IGlucHV0IGJlY29tZXMgdW5kZWZpbmVkIG9yIG51bGwgYnkgYWNjaWRlbnRcbiAgICAgIHRoaXMuX2lkID0gKHdpemFyZFBhZ2VJbmRleCsrKS50b1N0cmluZygpO1xuICAgIH1cbiAgICByZXR1cm4gYGNsci13aXphcmQtcGFnZS0ke3RoaXMuX2lkfWA7XG4gIH1cblxuICAvKipcbiAgICogQSByZWFkLW9ubHkgZ2V0dGVyIHRoYXQgc2VydmVzIGFzIGEgY29udmVuaWVuY2UgZm9yIHRob3NlIHdobyB3b3VsZCByYXRoZXJcbiAgICogbm90IHRoaW5rIGluIHRoZSB0ZXJtcyBvZiAhQ2xyV2l6YXJkUGFnZS5uZXh0U3RlcERpc2FibGVkLiBGb3Igc29tZSB1c2UgY2FzZXMsXG4gICAqIENscldpemFyZFBhZ2UucmVhZHlUb0NvbXBsZXRlIGlzIG1vcmUgbG9naWNhbCBhbmQgZGVjbGFyYXRpdmUuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRQYWdlXG4gICAqXG4gICAqL1xuICBwdWJsaWMgZ2V0IHJlYWR5VG9Db21wbGV0ZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIXRoaXMubmV4dFN0ZXBEaXNhYmxlZDtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkUGFnZVxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBfY29tcGxldGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKipcbiAgICogQSBwYWdlIGlzIG1hcmtlZCBhcyBjb21wbGV0ZWQgaWYgaXQgaXMgYm90aCByZWFkeVRvQ29tcGxldGUgYW5kIGNvbXBsZXRlZCxcbiAgICogYXMgaW4gdGhlIG5leHQgb3IgZmluaXNoIGFjdGlvbiBoYXMgYmVlbiBleGVjdXRlZCB3aGlsZSB0aGlzIHBhZ2Ugd2FzIGN1cnJlbnQuXG4gICAqXG4gICAqIE5vdGUgdGhlcmUgaXMgYW5kIG9wZW4gcXVlc3Rpb24gYWJvdXQgaG93IHRvIGhhbmRsZSBwYWdlcyB0aGF0IGFyZSBtYXJrZWRcbiAgICogY29tcGxldGUgYnV0IHdobyBhcmUgbm8gbG9uZ2VyIHJlYWR5VG9Db21wbGV0ZS4gVGhpcyBtaWdodCBpbmRpY2F0ZSBhbiBlcnJvclxuICAgKiBzdGF0ZSBmb3IgdGhlIENscldpemFyZFBhZ2UuIEN1cnJlbnRseSwgdGhlIHdpemFyZCBkb2VzIG5vdCBhY2tub3dsZWRnZSB0aGlzIHN0YXRlXG4gICAqIGFuZCBvbmx5IHJldHVybnMgdGhhdCB0aGUgcGFnZSBpcyBpbmNvbXBsZXRlLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkUGFnZVxuICAgKlxuICAgKi9cbiAgcHVibGljIGdldCBjb21wbGV0ZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbXBsZXRlICYmIHRoaXMucmVhZHlUb0NvbXBsZXRlO1xuXG4gICAgLy8gRk9SIFYyOiBVTldJTkQgQ09NUExFVEVELCBSRUFEWVRPQ09NUExFVEUsIEFORCBFUlJPUlNcbiAgICAvLyBTVUNIIFRIQVQgRVJST1JTIElTIElUUyBPV04gSU5QVVQuIElGIEEgU1RFUCBJU1xuICAgIC8vIElOQ09NUExFVEUgQU5EIEVSUk9SRUQsIEVSUk9SRUQgV0lMTCBOT1QgU0hPVy5cbiAgICAvLyBGSVJTVCBRVUVTVElPTjogQU0gSSBHUkVZIE9SIENPTE9SRUQ/XG4gICAgLy8gU0VDT05EIFFVRVNUSU9OOiBBTSBJIEdSRUVOIE9SIFJFRD9cbiAgfVxuXG4gIC8qKlxuICAgKiBBIENscldpemFyZFBhZ2UgY2FuIGJlIG1hbnVhbGx5IHNldCB0byBjb21wbGV0ZWQgdXNpbmcgdGhpcyBib29sZWFuIHNldHRlci5cbiAgICogSXQgaXMgcmVjb21tZW5kZWQgdGhhdCB1c2VycyByZWx5IG9uIHRoZSBjb252ZW5pZW5jZSBmdW5jdGlvbnMgaW4gdGhlIHdpemFyZFxuICAgKiBhbmQgbmF2aWdhdGlvbiBzZXJ2aWNlIGluc3RlYWQgb2YgbWFudWFsbHkgc2V0dGluZyBwYWdlc+KAmSBjb21wbGV0aW9uIHN0YXRlLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgQ2xyV2l6YXJkUGFnZVxuICAgKi9cbiAgcHVibGljIHNldCBjb21wbGV0ZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9jb21wbGV0ZSA9IHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyB3aXRoIHRoZSBuYXZpZ2F0aW9uIHNlcnZpY2UgdG8gc2VlIGlmIGl0IGlzIHRoZSBjdXJyZW50IHBhZ2UuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRQYWdlXG4gICAqXG4gICAqL1xuICBwdWJsaWMgZ2V0IGN1cnJlbnQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMubmF2U2VydmljZS5jdXJyZW50UGFnZSA9PT0gdGhpcztcbiAgfVxuXG4gIHB1YmxpYyBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICF0aGlzLmVuYWJsZWQ7XG4gIH1cblxuICAvKipcbiAgICogQSByZWFkLW9ubHkgZ2V0dGVyIHRoYXQgcmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgcGFnZSBpcyBuYXZpZ2FibGVcbiAgICogaW4gdGhlIHdpemFyZC4gQSB3aXphcmQgcGFnZSBjYW4gYmUgbmF2aWdhdGVkIHRvIGlmIGl0IGlzIGNvbXBsZXRlZFxuICAgKiBvciB0aGUgcGFnZSBiZWZvcmUgaXQgaXMgY29tcGxldGVkLlxuICAgKlxuICAgKiBUaGlzIGdldHRlciBoYW5kbGVzIHRoZSBsb2dpYyBmb3IgZW5hYmxpbmcgb3IgZGlzYWJsaW5nIHRoZSBsaW5rcyBpblxuICAgKiB0aGUgc3RlcCBuYXYgb24gdGhlIGxlZnQgU2lkZSBvZiB0aGUgd2l6YXJkLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkUGFnZVxuICAgKlxuICAgKi9cbiAgcHVibGljIGdldCBlbmFibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnQgfHwgdGhpcy5jb21wbGV0ZWQgfHwgdGhpcy5wcmV2aW91c0NvbXBsZXRlZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIHJlYWQtb25seSBnZXR0ZXIgdGhhdCByZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSBwYWdlIGJlZm9yZSB0aGlzXG4gICAqIENscldpemFyZFBhZ2UgaXMgY29tcGxldGVkLiBUaGlzIGlzIHVzZWZ1bCBmb3IgZGV0ZXJtaW5pbmcgd2hldGhlciBvciBub3RcbiAgICogYSBwYWdlIGlzIG5hdmlnYWJsZSBpZiBpdCBpcyBub3QgY3VycmVudCBvciBhbHJlYWR5IGNvbXBsZXRlZC5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFBhZ2VcbiAgICpcbiAgICovXG4gIHB1YmxpYyBnZXQgcHJldmlvdXNDb21wbGV0ZWQoKTogYm9vbGVhbiB7XG4gICAgY29uc3QgcHJldmlvdXNQYWdlID0gdGhpcy5wYWdlQ29sbGVjdGlvbi5nZXRQcmV2aW91c1BhZ2UodGhpcyk7XG5cbiAgICBpZiAoIXByZXZpb3VzUGFnZSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHByZXZpb3VzUGFnZS5jb21wbGV0ZWQ7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFBhZ2VcbiAgICpcbiAgICovXG4gIHB1YmxpYyBnZXQgdGl0bGUoKTogVGVtcGxhdGVSZWY8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMucGFnZVRpdGxlLnBhZ2VUaXRsZVRlbXBsYXRlUmVmO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRQYWdlXG4gICAqXG4gICAqL1xuICBwdWJsaWMgZ2V0IG5hdlRpdGxlKCk6IFRlbXBsYXRlUmVmPGFueT4ge1xuICAgIGlmICh0aGlzLnBhZ2VOYXZUaXRsZSkge1xuICAgICAgcmV0dXJuIHRoaXMucGFnZU5hdlRpdGxlLnBhZ2VOYXZUaXRsZVRlbXBsYXRlUmVmO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5wYWdlVGl0bGUucGFnZVRpdGxlVGVtcGxhdGVSZWY7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFBhZ2VcbiAgICpcbiAgICovXG4gIHB1YmxpYyBnZXQgaGVhZGVyQWN0aW9ucygpOiBUZW1wbGF0ZVJlZjxhbnk+IHtcbiAgICBpZiAoIXRoaXMuX2hlYWRlckFjdGlvbnMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2hlYWRlckFjdGlvbnMucGFnZUhlYWRlckFjdGlvbnNUZW1wbGF0ZVJlZjtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkUGFnZVxuICAgKlxuICAgKi9cbiAgcHVibGljIGdldCBoYXNIZWFkZXJBY3Rpb25zKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIXRoaXMuX2hlYWRlckFjdGlvbnM7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFBhZ2VcbiAgICpcbiAgICovXG4gIHB1YmxpYyBnZXQgYnV0dG9ucygpOiBUZW1wbGF0ZVJlZjxhbnk+IHtcbiAgICBpZiAoIXRoaXMuX2J1dHRvbnMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2J1dHRvbnMucGFnZUJ1dHRvbnNUZW1wbGF0ZVJlZjtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIHJlYWQtb25seSBnZXR0ZXIgdGhhdCByZXR1cm5zIGEgYm9vbGVhbiB0aGF0IHNheXMgd2hldGhlciBvclxuICAgKiBub3QgdGhlIENscldpemFyZFBhZ2UgaW5jbHVkZXMgYnV0dG9ucy4gVXNlZCB0byBkZXRlcm1pbmUgaWYgdGhlXG4gICAqIFdpemFyZCBzaG91bGQgb3ZlcnJpZGUgdGhlIGRlZmF1bHQgYnV0dG9uIHNldCBkZWZpbmVkIGFzXG4gICAqIGl0cyBkaXJlY3QgY2hpbGRyZW4uXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRQYWdlXG4gICAqXG4gICAqL1xuICBwdWJsaWMgZ2V0IGhhc0J1dHRvbnMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy5fYnV0dG9ucztcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VzIHRoZSBuYXYgc2VydmljZSB0byBtYWtlIHRoZSBDbHJXaXphcmRQYWdlIHRoZSBjdXJyZW50IHBhZ2UgaW4gdGhlXG4gICAqIHdpemFyZC4gQnlwYXNzZXMgYWxsIGNoZWNrcyBidXQgc3RpbGwgZW1pdHMgdGhlIENscldpemFyZFBhZ2Uub25Mb2FkXG4gICAqIChjbHJXaXphcmRQYWdlT25Mb2FkKSBvdXRwdXQuXG4gICAqXG4gICAqIEluIG1vc3QgY2FzZXMsIGl0IGlzIGJldHRlciB0byB1c2UgdGhlIGRlZmF1bHQgbmF2aWdhdGlvbiBmdW5jdGlvbnNcbiAgICogaW4gV2l6YXJkLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkUGFnZVxuICAgKlxuICAgKi9cbiAgcHVibGljIG1ha2VDdXJyZW50KCk6IHZvaWQge1xuICAgIHRoaXMubmF2U2VydmljZS5jdXJyZW50UGFnZSA9IHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogTGlua3MgdGhlIG5hdiBzZXJ2aWNlIGFuZCBlc3RhYmxpc2hlcyB0aGUgY3VycmVudCBwYWdlIGlmIG9uZSBpcyBub3QgZGVmaW5lZC5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFBhZ2VcbiAgICpcbiAgICovXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBjb25zdCBuYXZTZXJ2aWNlID0gdGhpcy5uYXZTZXJ2aWNlO1xuICAgIGlmICghbmF2U2VydmljZS5jdXJyZW50UGFnZSAmJiAhbmF2U2VydmljZS5uYXZTZXJ2aWNlTG9hZGVkKSB7XG4gICAgICB0aGlzLm1ha2VDdXJyZW50KCk7XG4gICAgICB0aGlzLm5hdlNlcnZpY2UubmF2U2VydmljZUxvYWRlZCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEEgcmVhZC1vbmx5IGdldHRlciB0aGF0IHJldHVybnMgdGhlIGlkIHVzZWQgYnkgdGhlIHN0ZXAgbmF2IGl0ZW0gYXNzb2NpYXRlZCB3aXRoIHRoZSBwYWdlLlxuICAgKlxuICAgKiBDbHJXaXphcmRQYWdlIG5lZWRzIHRoaXMgSUQgc3RyaW5nIGZvciBhcmlhIGluZm9ybWF0aW9uLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkUGFnZVxuICAgKlxuICAgKi9cbiAgcHVibGljIGdldCBzdGVwSXRlbUlkKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMucGFnZUNvbGxlY3Rpb24uZ2V0U3RlcEl0ZW1JZEZvclBhZ2UodGhpcyk7XG4gIH1cbn1cbiJdfQ==