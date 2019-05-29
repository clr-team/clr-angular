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
var wizardPageIndex = 0;
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
var ClrWizardPage = /** @class */ (function () {
    /**
     * Creates an instance of ClrWizardPage.
     *
     * @memberof WizardPage
     */
    function ClrWizardPage(navService, pageCollection, buttonService) {
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
    Object.defineProperty(ClrWizardPage.prototype, "nextStepDisabled", {
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
         * @memberof WizardPage
         *
         */
        get: /**
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
        function () {
            return this._nextStepDisabled;
        },
        /**
         * Sets whether the page should allow forward navigation.
         *
         * @memberof WizardPage
         *
         */
        set: /**
         * Sets whether the page should allow forward navigation.
         *
         * \@memberof WizardPage
         *
         * @param {?} val
         * @return {?}
         */
        function (val) {
            /** @type {?} */
            var valBool = !!val;
            if (valBool !== this._nextStepDisabled) {
                this._nextStepDisabled = valBool;
                this.nextStepDisabledChange.emit(valBool);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardPage.prototype, "previousStepDisabled", {
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
         * @memberof WizardPage
         *
         */
        get: /**
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
        function () {
            return this._previousStepDisabled;
        },
        /**
         * Sets whether the page should allow backward navigation.
         *
         * @memberof WizardPage
         *
         */
        set: /**
         * Sets whether the page should allow backward navigation.
         *
         * \@memberof WizardPage
         *
         * @param {?} val
         * @return {?}
         */
        function (val) {
            /** @type {?} */
            var valBool = !!val;
            if (valBool !== this._previousStepDisabled) {
                this._previousStepDisabled = valBool;
                this.previousStepDisabledChange.emit(valBool);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardPage.prototype, "stopCancel", {
        /**
         * A getter that retrieves whether the page is preventing the cancel action.
         *
         * @memberof WizardPage
         *
         */
        get: /**
         * A getter that retrieves whether the page is preventing the cancel action.
         *
         * \@memberof WizardPage
         *
         * @return {?}
         */
        function () {
            return this._stopCancel;
        },
        /**
         * Overrides the cancel action from the page level. Allows you to use an
         * alternate function for validation or data-munging before cancelling the
         * wizard when combined with the ClrWizardPage.onCancel
         * (the clrWizardPageOnCancel output).
         *
         * Requires that you manually close the wizard from your host component,
         * usually with a call to Wizard.forceNext() or wizard.next();
         *
         * @memberof ClrWizardPage
         */
        set: /**
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
        function (val) {
            /** @type {?} */
            var valBool = !!val;
            if (valBool !== this._stopCancel) {
                this._stopCancel = valBool;
                this.stopCancelChange.emit(valBool);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardPage.prototype, "stopNext", {
        /**
         * A getter that tells you whether the page is preventing the next action.
         *
         * @memberof WizardPage
         *
         */
        get: /**
         * A getter that tells you whether the page is preventing the next action.
         *
         * \@memberof WizardPage
         *
         * @return {?}
         */
        function () {
            return this._stopNext;
        },
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
         * @memberof ClrWizardPage
         */
        set: /**
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
        function (val) {
            /** @type {?} */
            var valBool = !!val;
            if (valBool !== this._stopNext) {
                this._stopNext = valBool;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardPage.prototype, "id", {
        /**
         * A read-only getter that generates an ID string for the wizard page from
         * either the value passed to the ClrWizardPage "id" input or a wizard page
         * counter shared across all wizard pages in the application.
         *
         * Note that the value passed into the ID input Will be prefixed with
         * "clr-wizard-page-".
         *
         * @readonly
         *
         * @memberof ClrWizardPage
         */
        get: /**
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
        function () {
            // covers things like null, undefined, false, and empty string
            // while allowing zero to pass
            /** @type {?} */
            var idIsNonZeroFalsy = !this._id && this._id !== 0;
            // in addition to non-zero falsy we also want to make sure _id is not a negative
            // number.
            if (idIsNonZeroFalsy || this._id < 0) {
                // guard here in the event that input becomes undefined or null by accident
                this._id = (wizardPageIndex++).toString();
            }
            return "clr-wizard-page-" + this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardPage.prototype, "readyToComplete", {
        /**
         * A read-only getter that serves as a convenience for those who would rather
         * not think in the terms of !ClrWizardPage.nextStepDisabled. For some use cases,
         * ClrWizardPage.readyToComplete is more logical and declarative.
         *
         * @memberof WizardPage
         *
         */
        get: /**
         * A read-only getter that serves as a convenience for those who would rather
         * not think in the terms of !ClrWizardPage.nextStepDisabled. For some use cases,
         * ClrWizardPage.readyToComplete is more logical and declarative.
         *
         * \@memberof WizardPage
         *
         * @return {?}
         */
        function () {
            return !this.nextStepDisabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardPage.prototype, "completed", {
        /**
         * A page is marked as completed if it is both readyToComplete and completed,
         * as in the next or finish action has been executed while this page was current.
         *
         * Note there is and open question about how to handle pages that are marked
         * complete but who are no longer readyToComplete. This might indicate an error
         * state for the ClrWizardPage. Currently, the wizard does not acknowledge this state
         * and only returns that the page is incomplete.
         *
         * @memberof WizardPage
         *
         */
        get: /**
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
        function () {
            return this._complete && this.readyToComplete;
            // FOR V2: UNWIND COMPLETED, READYTOCOMPLETE, AND ERRORS
            // SUCH THAT ERRORS IS ITS OWN INPUT. IF A STEP IS
            // INCOMPLETE AND ERRORED, ERRORED WILL NOT SHOW.
            // FIRST QUESTION: AM I GREY OR COLORED?
            // SECOND QUESTION: AM I GREEN OR RED?
        },
        /**
         * A ClrWizardPage can be manually set to completed using this boolean setter.
         * It is recommended that users rely on the convenience functions in the wizard
         * and navigation service instead of manually setting pages’ completion state.
         *
         * @memberof ClrWizardPage
         */
        set: /**
         * A ClrWizardPage can be manually set to completed using this boolean setter.
         * It is recommended that users rely on the convenience functions in the wizard
         * and navigation service instead of manually setting pages’ completion state.
         *
         * \@memberof ClrWizardPage
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._complete = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardPage.prototype, "current", {
        /**
         * Checks with the navigation service to see if it is the current page.
         *
         * @memberof WizardPage
         *
         */
        get: /**
         * Checks with the navigation service to see if it is the current page.
         *
         * \@memberof WizardPage
         *
         * @return {?}
         */
        function () {
            return this.navService.currentPage === this;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardPage.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () {
            return !this.enabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardPage.prototype, "enabled", {
        /**
         * A read-only getter that returns whether or not the page is navigable
         * in the wizard. A wizard page can be navigated to if it is completed
         * or the page before it is completed.
         *
         * This getter handles the logic for enabling or disabling the links in
         * the step nav on the left Side of the wizard.
         *
         * @memberof WizardPage
         *
         */
        get: /**
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
        function () {
            return this.current || this.completed || this.previousCompleted;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardPage.prototype, "previousCompleted", {
        /**
         * A read-only getter that returns whether or not the page before this
         * ClrWizardPage is completed. This is useful for determining whether or not
         * a page is navigable if it is not current or already completed.
         *
         * @memberof WizardPage
         *
         */
        get: /**
         * A read-only getter that returns whether or not the page before this
         * ClrWizardPage is completed. This is useful for determining whether or not
         * a page is navigable if it is not current or already completed.
         *
         * \@memberof WizardPage
         *
         * @return {?}
         */
        function () {
            /** @type {?} */
            var previousPage = this.pageCollection.getPreviousPage(this);
            if (!previousPage) {
                return true;
            }
            return previousPage.completed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardPage.prototype, "title", {
        /**
         *
         * @memberof WizardPage
         *
         */
        get: /**
         *
         * \@memberof WizardPage
         *
         * @return {?}
         */
        function () {
            return this.pageTitle.pageTitleTemplateRef;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardPage.prototype, "navTitle", {
        /**
         *
         * @memberof WizardPage
         *
         */
        get: /**
         *
         * \@memberof WizardPage
         *
         * @return {?}
         */
        function () {
            if (this.pageNavTitle) {
                return this.pageNavTitle.pageNavTitleTemplateRef;
            }
            return this.pageTitle.pageTitleTemplateRef;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardPage.prototype, "headerActions", {
        /**
         *
         * @memberof WizardPage
         *
         */
        get: /**
         *
         * \@memberof WizardPage
         *
         * @return {?}
         */
        function () {
            if (!this._headerActions) {
                return;
            }
            return this._headerActions.pageHeaderActionsTemplateRef;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardPage.prototype, "hasHeaderActions", {
        /**
         *
         * @memberof WizardPage
         *
         */
        get: /**
         *
         * \@memberof WizardPage
         *
         * @return {?}
         */
        function () {
            return !!this._headerActions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardPage.prototype, "buttons", {
        /**
         *
         * @memberof WizardPage
         *
         */
        get: /**
         *
         * \@memberof WizardPage
         *
         * @return {?}
         */
        function () {
            if (!this._buttons) {
                return;
            }
            return this._buttons.pageButtonsTemplateRef;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardPage.prototype, "hasButtons", {
        /**
         * A read-only getter that returns a boolean that says whether or
         * not the ClrWizardPage includes buttons. Used to determine if the
         * Wizard should override the default button set defined as
         * its direct children.
         *
         * @memberof WizardPage
         *
         */
        get: /**
         * A read-only getter that returns a boolean that says whether or
         * not the ClrWizardPage includes buttons. Used to determine if the
         * Wizard should override the default button set defined as
         * its direct children.
         *
         * \@memberof WizardPage
         *
         * @return {?}
         */
        function () {
            return !!this._buttons;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Uses the nav service to make the ClrWizardPage the current page in the
     * wizard. Bypasses all checks but still emits the ClrWizardPage.onLoad
     * (clrWizardPageOnLoad) output.
     *
     * In most cases, it is better to use the default navigation functions
     * in Wizard.
     *
     * @memberof WizardPage
     *
     */
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
    ClrWizardPage.prototype.makeCurrent = /**
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
    function () {
        this.navService.currentPage = this;
    };
    /**
     * Links the nav service and establishes the current page if one is not defined.
     *
     * @memberof WizardPage
     *
     */
    /**
     * Links the nav service and establishes the current page if one is not defined.
     *
     * \@memberof WizardPage
     *
     * @return {?}
     */
    ClrWizardPage.prototype.ngOnInit = /**
     * Links the nav service and establishes the current page if one is not defined.
     *
     * \@memberof WizardPage
     *
     * @return {?}
     */
    function () {
        /** @type {?} */
        var navService = this.navService;
        if (!navService.currentPage && !navService.navServiceLoaded) {
            this.makeCurrent();
            this.navService.navServiceLoaded = true;
        }
    };
    Object.defineProperty(ClrWizardPage.prototype, "stepItemId", {
        /**
         * A read-only getter that returns the id used by the step nav item associated with the page.
         *
         * ClrWizardPage needs this ID string for aria information.
         *
         * @memberof WizardPage
         *
         */
        get: /**
         * A read-only getter that returns the id used by the step nav item associated with the page.
         *
         * ClrWizardPage needs this ID string for aria information.
         *
         * \@memberof WizardPage
         *
         * @return {?}
         */
        function () {
            return this.pageCollection.getStepItemIdForPage(this);
        },
        enumerable: true,
        configurable: true
    });
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
    ClrWizardPage.ctorParameters = function () { return [
        { type: WizardNavigationService },
        { type: PageCollectionService },
        { type: ButtonHubService }
    ]; };
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
    return ClrWizardPage;
}());
export { ClrWizardPage };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l6YXJkLXBhZ2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJ3aXphcmQvd2l6YXJkLXBhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBTUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQWUsTUFBTSxlQUFlLENBQUM7QUFFMUcsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDbEUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDNUUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDaEYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDN0QsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDMUUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDL0QsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0scUJBQXFCLENBQUM7O0lBRXJELGVBQWUsR0FBRyxDQUFDOzs7Ozs7Ozs7OztBQVl2QjtJQWFFOzs7O09BSUc7SUFDSCx1QkFDVSxVQUFtQyxFQUNwQyxjQUFxQyxFQUNyQyxhQUErQjtRQUY5QixlQUFVLEdBQVYsVUFBVSxDQUF5QjtRQUNwQyxtQkFBYyxHQUFkLGNBQWMsQ0FBdUI7UUFDckMsa0JBQWEsR0FBYixhQUFhLENBQWtCOzs7Ozs7UUFxRGhDLHNCQUFpQixHQUFHLEtBQUssQ0FBQzs7Ozs7Ozs7UUEwQ1MsMkJBQXNCLEdBQTBCLElBQUksWUFBWSxFQUFFLENBQUM7Ozs7OztRQU90RywwQkFBcUIsR0FBRyxLQUFLLENBQUM7Ozs7Ozs7O1FBMkMvQiwrQkFBMEIsR0FBMEIsSUFBSSxZQUFZLEVBQUUsQ0FBQzs7Ozs7Ozs7OztRQVdqQyxtQkFBYyxHQUFZLEtBQUss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U0FBQyxzQkFBc0I7c0NBRTdCLE1BQU0sU0FBQywyQkFBMkI7c0JBYWxDLEtBQUssU0FBQyxJQUFJOztJQTBPYixvQkFBQztDQUFBLEFBMW9CRCxJQTBvQkM7U0E5bkJZLGFBQWE7Ozs7Ozs7Ozs7SUFtQnhCLGtDQUNxQzs7Ozs7Ozs7Ozs7O0lBWXJDLHFDQUMyQzs7Ozs7Ozs7OztJQVUzQyxpQ0FDc0M7Ozs7Ozs7Ozs7SUFVdEMsdUNBQ2tEOzs7Ozs7OztJQU9sRCwwQ0FBa0M7Ozs7Ozs7OztJQTBDbEMsK0NBQThHOzs7Ozs7OztJQU85Ryw4Q0FBc0M7Ozs7Ozs7OztJQTBDdEMsbURBQzhFOzs7Ozs7Ozs7OztJQVc5RSx1Q0FBNkU7Ozs7Ozs7O0lBTzdFLG9DQUE0Qjs7Ozs7OztJQXFDNUIseUNBQWdIOzs7Ozs7OztJQU9oSCxrQ0FBMEI7Ozs7Ozs7Ozs7Ozs7SUE0QzFCLGlDQUFrRzs7Ozs7Ozs7O0lBU2xHLCtCQUFpRjs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFpQmpGLHFDQUFnRzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQW1CaEcsNENBQXFHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBbUJyRyw4Q0FBeUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFtQnpHLDBDQUFpRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUF1QmpHLDRDQUFxRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUF1QnJHLDZDQUFnRzs7SUFFaEcsNENBQW9HOzs7Ozs7Ozs7Ozs7O0lBYXBHLDRCQUF1RDs7Ozs7Ozs7SUE2Q3ZELGtDQUFtQzs7Ozs7SUExYmpDLG1DQUEyQzs7SUFDM0MsdUNBQTRDOztJQUM1QyxzQ0FBc0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IENvbXBvbmVudCwgQ29udGVudENoaWxkLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dCwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQnV0dG9uSHViU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2J1dHRvbi1odWIuc2VydmljZSc7XG5pbXBvcnQgeyBQYWdlQ29sbGVjdGlvblNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9wYWdlLWNvbGxlY3Rpb24uc2VydmljZSc7XG5pbXBvcnQgeyBXaXphcmROYXZpZ2F0aW9uU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL3dpemFyZC1uYXZpZ2F0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2xyV2l6YXJkUGFnZUJ1dHRvbnMgfSBmcm9tICcuL3dpemFyZC1wYWdlLWJ1dHRvbnMnO1xuaW1wb3J0IHsgQ2xyV2l6YXJkUGFnZUhlYWRlckFjdGlvbnMgfSBmcm9tICcuL3dpemFyZC1wYWdlLWhlYWRlci1hY3Rpb25zJztcbmltcG9ydCB7IENscldpemFyZFBhZ2VOYXZUaXRsZSB9IGZyb20gJy4vd2l6YXJkLXBhZ2UtbmF2dGl0bGUnO1xuaW1wb3J0IHsgQ2xyV2l6YXJkUGFnZVRpdGxlIH0gZnJvbSAnLi93aXphcmQtcGFnZS10aXRsZSc7XG5cbmxldCB3aXphcmRQYWdlSW5kZXggPSAwO1xuXG4vKipcbiAqIFRoZSBDbHJXaXphcmRQYWdlIGNvbXBvbmVudCBpcyByZXNwb25zaWJsZSBmb3IgZGlzcGxheWluZyB0aGUgY29udGVudCBvZiBlYWNoIHN0ZXBcbiAqIGluIHRoZSB3aXphcmQgd29ya2Zsb3cuXG4gKlxuICogQ2xyV2l6YXJkUGFnZSBjb21wb25lbnQgaGFzIGhvb2tzIGludG8gdGhlIG5hdmlnYXRpb24gc2VydmljZSAoQ2xyV2l6YXJkUGFnZS5uYXZTZXJ2aWNlKSxcbiAqIHBhZ2UgY29sbGVjdGlvbiAoQ2xyV2l6YXJkUGFnZS5wYWdlQ29sbGVjdGlvbiksIGFuZCBidXR0b24gc2VydmljZVxuICogKENscldpemFyZFBhZ2UuYnV0dG9uU2VydmljZSkuIFRoZXNlIHRocmVlIHByb3ZpZGVycyBhcmUgc2hhcmVkIGFjcm9zcyB0aGUgY29tcG9uZW50c1xuICogd2l0aGluIGVhY2ggaW5zdGFuY2Ugb2YgYSBXaXphcmQuXG4gKlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItd2l6YXJkLXBhZ2UnLFxuICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxuICBob3N0OiB7XG4gICAgJ1tpZF0nOiAnaWQnLFxuICAgIHJvbGU6ICd0YWJwYW5lbCcsXG4gICAgJ1thdHRyLmFyaWEtaGlkZGVuXSc6ICchY3VycmVudCcsXG4gICAgJ1thdHRyLmFyaWEtbGFiZWxsZWRieV0nOiAnc3RlcEl0ZW1JZCcsXG4gICAgJ1tjbGFzcy5hY3RpdmVdJzogJ2N1cnJlbnQnLFxuICAgICdbY2xhc3MuY2xyLXdpemFyZC1wYWdlXSc6ICd0cnVlJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyV2l6YXJkUGFnZSBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIENscldpemFyZFBhZ2UuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRQYWdlXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIG5hdlNlcnZpY2U6IFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlLFxuICAgIHB1YmxpYyBwYWdlQ29sbGVjdGlvbjogUGFnZUNvbGxlY3Rpb25TZXJ2aWNlLFxuICAgIHB1YmxpYyBidXR0b25TZXJ2aWNlOiBCdXR0b25IdWJTZXJ2aWNlXG4gICkge31cblxuICAvKipcbiAgICogQ29udGFpbnMgYSByZWZlcmVuY2UgdG8gdGhlIHBhZ2UgdGl0bGUgd2hpY2ggaXMgdXNlZCBmb3IgYSBudW1iZXJcbiAgICogb2YgZGlmZmVyZW50IHRhc2tzIGZvciBkaXNwbGF5IGluIHRoZSB3aXphcmQuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRQYWdlXG4gICAqXG4gICAqL1xuICBAQ29udGVudENoaWxkKENscldpemFyZFBhZ2VUaXRsZSwgeyBzdGF0aWM6IHRydWUgfSlcbiAgcHVibGljIHBhZ2VUaXRsZTogQ2xyV2l6YXJkUGFnZVRpdGxlO1xuXG4gIC8qKlxuICAgKiBDb250YWlucyBhIHJlZmVyZW5jZSB0byB0aGUgZGVzaXJlZCB0aXRsZSBmb3IgdGhlIHBhZ2UncyBzdGVwIGluIHRoZVxuICAgKiBuYXZpZ2F0aW9uIG9uIHRoZSBsZWZ0IHNpZGUgb2YgdGhlIHdpemFyZC4gQ2FuIGJlIHByb2plY3RlZCB0byBjaGFuZ2UgdGhlXG4gICAqIG5hdmlnYXRpb24gbGluaydzIHRleHQuXG4gICAqXG4gICAqIElmIG5vdCBkZWZpbmVkLCB0aGVuIENscldpemFyZFBhZ2UucGFnZVRpdGxlIHdpbGwgYmUgZGlzcGxheWVkIGluIHRoZSBzdGVwbmF2LlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkUGFnZVxuICAgKlxuICAgKi9cbiAgQENvbnRlbnRDaGlsZChDbHJXaXphcmRQYWdlTmF2VGl0bGUsIHsgc3RhdGljOiB0cnVlIH0pXG4gIHB1YmxpYyBwYWdlTmF2VGl0bGU6IENscldpemFyZFBhZ2VOYXZUaXRsZTtcblxuICAvKipcbiAgICogQ29udGFpbnMgYSByZWZlcmVuY2UgdG8gdGhlIGJ1dHRvbnMgZGVmaW5lZCB3aXRoaW4gdGhlIHBhZ2UuIElmIG5vdCBkZWZpbmVkLFxuICAgKiB0aGUgd2l6YXJkIGRlZmF1bHRzIHRvIHRoZSBzZXQgb2YgYnV0dG9ucyBkZWZpbmVkIGFzIGEgZGlyZWN0IGNoaWxkIG9mIHRoZVxuICAgKiB3aXphcmQuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRQYWdlXG4gICAqXG4gICAqL1xuICBAQ29udGVudENoaWxkKENscldpemFyZFBhZ2VCdXR0b25zLCB7IHN0YXRpYzogdHJ1ZSB9KVxuICBwdWJsaWMgX2J1dHRvbnM6IENscldpemFyZFBhZ2VCdXR0b25zO1xuXG4gIC8qKlxuICAgKiBDb250YWlucyBhIHJlZmVyZW5jZSB0byB0aGUgaGVhZGVyIGFjdGlvbnMgZGVmaW5lZCB3aXRoaW4gdGhlIHBhZ2UuIElmIG5vdCBkZWZpbmVkLFxuICAgKiB0aGUgd2l6YXJkIGRlZmF1bHRzIHRvIHRoZSBzZXQgb2YgaGVhZGVyIGFjdGlvbnMgZGVmaW5lZCBhcyBhIGRpcmVjdCBjaGlsZCBvZiB0aGVcbiAgICogd2l6YXJkLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkUGFnZVxuICAgKlxuICAgKi9cbiAgQENvbnRlbnRDaGlsZChDbHJXaXphcmRQYWdlSGVhZGVyQWN0aW9ucywgeyBzdGF0aWM6IHRydWUgfSlcbiAgcHVibGljIF9oZWFkZXJBY3Rpb25zOiBDbHJXaXphcmRQYWdlSGVhZGVyQWN0aW9ucztcblxuICAvKipcbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFBhZ2VcbiAgICpcbiAgICovXG4gIHByaXZhdGUgX25leHRTdGVwRGlzYWJsZWQgPSBmYWxzZTtcblxuICAvKipcbiAgICogQSBnZXR0ZXIgdGhhdCB0ZWxscyB3aGV0aGVyIG9yIG5vdCB0aGUgd2l6YXJkIHNob3VsZCBiZSBhbGxvd2VkXG4gICAqIHRvIG1vdmUgdG8gdGhlIG5leHQgcGFnZS5cbiAgICpcbiAgICogVXNlZnVsIGZvciBpbi1wYWdlIHZhbGlkYXRpb24gYmVjYXVzZSBpdCBwcmV2ZW50cyBmb3J3YXJkIG5hdmlnYXRpb25cbiAgICogYW5kIHZpc2libHkgZGlzYWJsZXMgdGhlIG5leHQgYnV0dG9uLlxuICAgKlxuICAgKiBEb2VzIG5vdCByZXF1aXJlIHRoYXQgeW91IHJlLWltcGxlbWVudCBuYXZpZ2F0aW9uIHJvdXRpbmVzIGxpa2UgeW91XG4gICAqIHdvdWxkIGlmIHlvdSB3ZXJlIHVzaW5nIENscldpemFyZFBhZ2UucHJldmVudERlZmF1bHQgb3JcbiAgICogV2l6YXJkLnByZXZlbnREZWZhdWx0LlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkUGFnZVxuICAgKlxuICAgKi9cbiAgcHVibGljIGdldCBuZXh0U3RlcERpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9uZXh0U3RlcERpc2FibGVkO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgd2hldGhlciB0aGUgcGFnZSBzaG91bGQgYWxsb3cgZm9yd2FyZCBuYXZpZ2F0aW9uLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkUGFnZVxuICAgKlxuICAgKi9cbiAgQElucHV0KCdjbHJXaXphcmRQYWdlTmV4dERpc2FibGVkJylcbiAgcHVibGljIHNldCBuZXh0U3RlcERpc2FibGVkKHZhbDogYm9vbGVhbikge1xuICAgIGNvbnN0IHZhbEJvb2wgPSAhIXZhbDtcbiAgICBpZiAodmFsQm9vbCAhPT0gdGhpcy5fbmV4dFN0ZXBEaXNhYmxlZCkge1xuICAgICAgdGhpcy5fbmV4dFN0ZXBEaXNhYmxlZCA9IHZhbEJvb2w7XG4gICAgICB0aGlzLm5leHRTdGVwRGlzYWJsZWRDaGFuZ2UuZW1pdCh2YWxCb29sKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRW1pdHMgd2hlbiB0aGUgdmFsdWUgb2YgQ2xyV2l6YXJkUGFnZS5uZXh0U3RlcERpc2FibGVkIGNoYW5nZXMuXG4gICAqIFNob3VsZCBlbWl0IHRoZSBuZXcgdmFsdWUgb2YgbmV4dFN0ZXBEaXNhYmxlZC5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFBhZ2VcbiAgICpcbiAgICovXG4gIEBPdXRwdXQoJ2NscldpemFyZFBhZ2VOZXh0RGlzYWJsZWRDaGFuZ2UnKSBuZXh0U3RlcERpc2FibGVkQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLyoqXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRQYWdlXG4gICAqXG4gICAqL1xuICBwcml2YXRlIF9wcmV2aW91c1N0ZXBEaXNhYmxlZCA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBBIGdldHRlciB0aGF0IHRlbGxzIHdoZXRoZXIgb3Igbm90IHRoZSB3aXphcmQgc2hvdWxkIGJlIGFsbG93ZWRcbiAgICogdG8gbW92ZSB0byB0aGUgcHJldmlvdXMgcGFnZS5cbiAgICpcbiAgICogVXNlZnVsIGZvciBpbi1wYWdlIHZhbGlkYXRpb24gYmVjYXVzZSBpdCBwcmV2ZW50cyBiYWNrd2FyZCBuYXZpZ2F0aW9uXG4gICAqIGFuZCB2aXNpYmx5IGRpc2FibGVzIHRoZSBwcmV2aW91cyBidXR0b24uXG4gICAqXG4gICAqIERvZXMgbm90IHJlcXVpcmUgdGhhdCB5b3UgcmUtaW1wbGVtZW50IG5hdmlnYXRpb24gcm91dGluZXMgbGlrZSB5b3VcbiAgICogd291bGQgaWYgeW91IHdlcmUgdXNpbmcgQ2xyV2l6YXJkUGFnZS5wcmV2ZW50RGVmYXVsdCBvclxuICAgKiBXaXphcmQucHJldmVudERlZmF1bHQuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRQYWdlXG4gICAqXG4gICAqL1xuICBwdWJsaWMgZ2V0IHByZXZpb3VzU3RlcERpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9wcmV2aW91c1N0ZXBEaXNhYmxlZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHdoZXRoZXIgdGhlIHBhZ2Ugc2hvdWxkIGFsbG93IGJhY2t3YXJkIG5hdmlnYXRpb24uXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRQYWdlXG4gICAqXG4gICAqL1xuICBASW5wdXQoJ2NscldpemFyZFBhZ2VQcmV2aW91c0Rpc2FibGVkJylcbiAgcHVibGljIHNldCBwcmV2aW91c1N0ZXBEaXNhYmxlZCh2YWw6IGJvb2xlYW4pIHtcbiAgICBjb25zdCB2YWxCb29sID0gISF2YWw7XG4gICAgaWYgKHZhbEJvb2wgIT09IHRoaXMuX3ByZXZpb3VzU3RlcERpc2FibGVkKSB7XG4gICAgICB0aGlzLl9wcmV2aW91c1N0ZXBEaXNhYmxlZCA9IHZhbEJvb2w7XG4gICAgICB0aGlzLnByZXZpb3VzU3RlcERpc2FibGVkQ2hhbmdlLmVtaXQodmFsQm9vbCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEVtaXRzIHdoZW4gdGhlIHZhbHVlIG9mIENscldpemFyZFBhZ2UucHJldmlvdXNTdGVwRGlzYWJsZWQgY2hhbmdlcy5cbiAgICogU2hvdWxkIGVtaXQgdGhlIG5ldyB2YWx1ZSBvZiBwcmV2aW91c1N0ZXBEaXNhYmxlZC5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFBhZ2VcbiAgICpcbiAgICovXG4gIEBPdXRwdXQoJ2NscldpemFyZFBhZ2VQcmV2aW91c0Rpc2FibGVkQ2hhbmdlJylcbiAgcHVibGljIHByZXZpb3VzU3RlcERpc2FibGVkQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLyoqXG4gICAqIE92ZXJyaWRlcyBhbGwgYWN0aW9ucyBmcm9tIHRoZSBwYWdlIGxldmVsLCBzbyB5b3UgY2FuIHVzZSBhbiBhbHRlcm5hdGUgZnVuY3Rpb24gZm9yXG4gICAqIHZhbGlkYXRpb24gb3IgZGF0YS1tdW5naW5nIHdpdGggYSBDbHJXaXphcmRQYWdlLm9uQ29tbWl0IChjbHJXaXphcmRQYWdlT25Db21taXQgb3V0cHV0KSxcbiAgICogQ2xyV2l6YXJkUGFnZS5vbkNhbmNlbCAoY2xyV2l6YXJkUGFnZU9uQ2FuY2VsIG91dHB1dCksIG9yIG9uZVxuICAgKiBvZiB0aGUgZ3JhbnVsYXIgcGFnZS1sZXZlbCBidXR0b24gY2xpY2sgZXZlbnQgZW1pdHRlcnMuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRQYWdlXG4gICAqXG4gICAqL1xuICBASW5wdXQoJ2NscldpemFyZFBhZ2VQcmV2ZW50RGVmYXVsdCcpIHB1YmxpYyBwcmV2ZW50RGVmYXVsdDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkUGFnZVxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBfc3RvcENhbmNlbCA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBBIGdldHRlciB0aGF0IHJldHJpZXZlcyB3aGV0aGVyIHRoZSBwYWdlIGlzIHByZXZlbnRpbmcgdGhlIGNhbmNlbCBhY3Rpb24uXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRQYWdlXG4gICAqXG4gICAqL1xuICBwdWJsaWMgZ2V0IHN0b3BDYW5jZWwoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3N0b3BDYW5jZWw7XG4gIH1cblxuICAvKipcbiAgICogT3ZlcnJpZGVzIHRoZSBjYW5jZWwgYWN0aW9uIGZyb20gdGhlIHBhZ2UgbGV2ZWwuIEFsbG93cyB5b3UgdG8gdXNlIGFuXG4gICAqIGFsdGVybmF0ZSBmdW5jdGlvbiBmb3IgdmFsaWRhdGlvbiBvciBkYXRhLW11bmdpbmcgYmVmb3JlIGNhbmNlbGxpbmcgdGhlXG4gICAqIHdpemFyZCB3aGVuIGNvbWJpbmVkIHdpdGggdGhlIENscldpemFyZFBhZ2Uub25DYW5jZWxcbiAgICogKHRoZSBjbHJXaXphcmRQYWdlT25DYW5jZWwgb3V0cHV0KS5cbiAgICpcbiAgICogUmVxdWlyZXMgdGhhdCB5b3UgbWFudWFsbHkgY2xvc2UgdGhlIHdpemFyZCBmcm9tIHlvdXIgaG9zdCBjb21wb25lbnQsXG4gICAqIHVzdWFsbHkgd2l0aCBhIGNhbGwgdG8gV2l6YXJkLmZvcmNlTmV4dCgpIG9yIHdpemFyZC5uZXh0KCk7XG4gICAqXG4gICAqIEBtZW1iZXJvZiBDbHJXaXphcmRQYWdlXG4gICAqL1xuICBASW5wdXQoJ2NscldpemFyZFBhZ2VQcmV2ZW50RGVmYXVsdENhbmNlbCcpXG4gIHB1YmxpYyBzZXQgc3RvcENhbmNlbCh2YWw6IGJvb2xlYW4pIHtcbiAgICBjb25zdCB2YWxCb29sID0gISF2YWw7XG4gICAgaWYgKHZhbEJvb2wgIT09IHRoaXMuX3N0b3BDYW5jZWwpIHtcbiAgICAgIHRoaXMuX3N0b3BDYW5jZWwgPSB2YWxCb29sO1xuICAgICAgdGhpcy5zdG9wQ2FuY2VsQ2hhbmdlLmVtaXQodmFsQm9vbCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRQYWdlXG4gICAqXG4gICAqL1xuICBAT3V0cHV0KCdjbHJXaXphcmRQYWdlUHJldmVudERlZmF1bHRDYW5jZWxDaGFuZ2UnKSBzdG9wQ2FuY2VsQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLyoqXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRQYWdlXG4gICAqXG4gICAqL1xuICBwcml2YXRlIF9zdG9wTmV4dCA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBBIGdldHRlciB0aGF0IHRlbGxzIHlvdSB3aGV0aGVyIHRoZSBwYWdlIGlzIHByZXZlbnRpbmcgdGhlIG5leHQgYWN0aW9uLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkUGFnZVxuICAgKlxuICAgKi9cbiAgcHVibGljIGdldCBzdG9wTmV4dCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fc3RvcE5leHQ7XG4gIH1cblxuICAvKipcbiAgICogT3ZlcnJpZGVzIGZvcndhcmQgbmF2aWdhdGlvbiBmcm9tIHRoZSBwYWdlIGxldmVsLiBBbGxvd3MgeW91IHRvIHVzZSBhblxuICAgKiBhbHRlcm5hdGUgZnVuY3Rpb24gZm9yIHZhbGlkYXRpb24gb3IgZGF0YS1tdW5naW5nIGJlZm9yZSBtb3ZpbmcgdGhlXG4gICAqIHdpemFyZCB0byB0aGUgbmV4dCBwYWdld2hlbiBjb21iaW5lZCB3aXRoIHRoZSBDbHJXaXphcmRQYWdlLm9uQ29tbWl0XG4gICAqIChjbHJXaXphcmRQYWdlT25Db21taXQpIG9yIENscldpemFyZFBhZ2UubmV4dEJ1dHRvbkNsaWNrZWRcbiAgICogKGNscldpemFyZFBhZ2VOZXh0KSBvdXRwdXRzLlxuICAgKlxuICAgKiBSZXF1aXJlcyB0aGF0IHlvdSBtYW51YWxseSB0ZWxsIHRoZSB3aXphcmQgdG8gbmF2aWdhdGUgZm9yd2FyZCBmcm9tXG4gICAqIHRoZSBob3N0Q29tcG9uZW50LCB1c3VhbGx5IHdpdGggYSBjYWxsIHRvIFdpemFyZC5mb3JjZU5leHQoKSBvclxuICAgKiB3aXphcmQubmV4dCgpO1xuICAgKlxuICAgKiBAbWVtYmVyb2YgQ2xyV2l6YXJkUGFnZVxuICAgKi9cbiAgQElucHV0KCdjbHJXaXphcmRQYWdlUHJldmVudERlZmF1bHROZXh0JylcbiAgcHVibGljIHNldCBzdG9wTmV4dCh2YWw6IGJvb2xlYW4pIHtcbiAgICBjb25zdCB2YWxCb29sID0gISF2YWw7XG4gICAgaWYgKHZhbEJvb2wgIT09IHRoaXMuX3N0b3BOZXh0KSB7XG4gICAgICB0aGlzLl9zdG9wTmV4dCA9IHZhbEJvb2w7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFuIGV2ZW50IGVtaXR0ZXIgY2FycmllZCBvdmVyIGZyb20gYSBsZWdhY3kgdmVyc2lvbiBvZiBDbHJXaXphcmRQYWdlLlxuICAgKiBGaXJlcyBhbiBldmVudCBvbiBDbHJXaXphcmRQYWdlIHdoZW5ldmVyIHRoZSBuZXh0IG9yIGZpbmlzaCBidXR0b25zXG4gICAqIGFyZSBjbGlja2VkIGFuZCB0aGUgcGFnZSBpcyB0aGUgY3VycmVudCBwYWdlIG9mIHRoZSBXaXphcmQuXG4gICAqXG4gICAqIE5vdGUgdGhhdCB0aGlzIGRvZXMgbm90IGF1dG9tYXRpY2FsbHkgZW1pdCBhbiBldmVudCB3aGVuIGEgY3VzdG9tXG4gICAqIGJ1dHRvbiBpcyB1c2VkIGluIHBsYWNlIG9mIGEgbmV4dCBvciBmaW5pc2ggYnV0dG9uLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkUGFnZVxuICAgKlxuICAgKi9cbiAgQE91dHB1dCgnY2xyV2l6YXJkUGFnZU9uQ29tbWl0Jykgb25Db21taXQ6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KGZhbHNlKTtcblxuICAvKipcbiAgICogRW1pdHMgYW4gZXZlbnQgd2hlbiBDbHJXaXphcmRQYWdlIGJlY29tZXMgdGhlIGN1cnJlbnQgcGFnZSBvZiB0aGVcbiAgICogV2l6YXJkLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkUGFnZVxuICAgKlxuICAgKi9cbiAgQE91dHB1dCgnY2xyV2l6YXJkUGFnZU9uTG9hZCcpIG9uTG9hZDogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLyoqXG4gICAqIEVtaXRzIGFuIGV2ZW50IHdoZW4gdGhlIENscldpemFyZFBhZ2UgaW52b2tlcyB0aGUgY2FuY2VsIHJvdXRpbmUgZm9yIHRoZSB3aXphcmQuXG4gICAqXG4gICAqIENhbiBiZSB1c2VkIGluIGNvbmp1bmN0aW9uIHdpdGggdGhlIENscldpemFyZFBhZ2Uuc3RvcENhbmNlbFxuICAgKiAoY2xyV2l6YXJkUGFnZVByZXZlbnREZWZhdWx0Q2FuY2VsKSBvciBDbHJXaXphcmRQYWdlLnByZXZlbnREZWZhdWx0XG4gICAqIChjbHJXaXphcmRQYWdlUGFnZVByZXZlbnREZWZhdWx0KSBpbnB1dHMgdG8gaW1wbGVtZW50IGN1c3RvbSBjYW5jZWxcbiAgICogZnVuY3Rpb25hbGl0eSBhdCB0aGUgcGFnZSBsZXZlbC4gVGhpcyBpcyB1c2VmdWwgaWYgeW91IHdvdWxkIGxpa2UgdG8gZG9cbiAgICogdmFsaWRhdGlvbiwgc2F2ZSBkYXRhLCBvciB3YXJuIHVzZXJzIGJlZm9yZSBjYW5jZWxsaW5nIHRoZSB3aXphcmQuXG4gICAqXG4gICAqIE5vdGUgdGhhdCB0aGlzIHJlcXVpcmVzIHlvdSB0byBjYWxsIFdpemFyZC5jbG9zZSgpIGZyb20gdGhlIGhvc3QgY29tcG9uZW50LlxuICAgKiBUaGlzIGNvbnN0aXR1ZXMgYSBmdWxsIHJlcGxhY2VtZW50IG9mIHRoZSBjYW5jZWwgZnVuY3Rpb25hbGl0eS5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFBhZ2VcbiAgICpcbiAgICovXG4gIEBPdXRwdXQoJ2NscldpemFyZFBhZ2VPbkNhbmNlbCcpIHBhZ2VPbkNhbmNlbDogRXZlbnRFbWl0dGVyPENscldpemFyZFBhZ2U+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8qKlxuICAgKiBFbWl0cyBhbiBldmVudCB3aGVuIHRoZSBmaW5pc2ggYnV0dG9uIGlzIGNsaWNrZWQgYW5kIHRoZSBDbHJXaXphcmRQYWdlIGlzXG4gICAqIHRoZSB3aXphcmQncyBjdXJyZW50IHBhZ2UuXG4gICAqXG4gICAqIENhbiBiZSB1c2VkIGluIGNvbmp1bmN0aW9uIHdpdGggdGhlIENscldpemFyZFBhZ2UucHJldmVudERlZmF1bHRcbiAgICogKGNscldpemFyZFBhZ2VQYWdlUHJldmVudERlZmF1bHQpIGlucHV0IHRvIGltcGxlbWVudCBjdXN0b20gZmluaXNoXG4gICAqIGZ1bmN0aW9uYWxpdHkgYXQgdGhlIHBhZ2UgbGV2ZWwuIFRoaXMgaXMgdXNlZnVsIGlmIHlvdSB3b3VsZCBsaWtlIHRvIGRvXG4gICAqIHZhbGlkYXRpb24sIHNhdmUgZGF0YSwgb3Igd2FybiB1c2VycyBiZWZvcmUgYWxsb3dpbmcgdGhlbSB0byBjb21wbGV0ZVxuICAgKiB0aGUgd2l6YXJkLlxuICAgKlxuICAgKiBOb3RlIHRoYXQgdGhpcyByZXF1aXJlcyB5b3UgdG8gY2FsbCBXaXphcmQuZmluaXNoKCkgb3IgV2l6YXJkLmZvcmNlRmluaXNoKClcbiAgICogZnJvbSB0aGUgaG9zdCBjb21wb25lbnQuIFRoaXMgY29tYmluYXRpb24gY3JlYXRlcyBhIGZ1bGwgcmVwbGFjZW1lbnQgb2ZcbiAgICogdGhlIGZpbmlzaCBmdW5jdGlvbmFsaXR5LlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkUGFnZVxuICAgKlxuICAgKi9cbiAgQE91dHB1dCgnY2xyV2l6YXJkUGFnZUZpbmlzaCcpIGZpbmlzaEJ1dHRvbkNsaWNrZWQ6IEV2ZW50RW1pdHRlcjxDbHJXaXphcmRQYWdlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAvKipcbiAgICogRW1pdHMgYW4gZXZlbnQgd2hlbiB0aGUgcHJldmlvdXMgYnV0dG9uIGlzIGNsaWNrZWQgYW5kIHRoZSBDbHJXaXphcmRQYWdlIGlzXG4gICAqIHRoZSB3aXphcmQncyBjdXJyZW50IHBhZ2UuXG4gICAqXG4gICAqIENhbiBiZSB1c2VkIGluIGNvbmp1bmN0aW9uIHdpdGggdGhlIENscldpemFyZFBhZ2UucHJldmVudERlZmF1bHRcbiAgICogKGNscldpemFyZFBhZ2VQYWdlUHJldmVudERlZmF1bHQpIGlucHV0IHRvIGltcGxlbWVudCBjdXN0b20gYmFja3dhcmRzXG4gICAqIG5hdmlnYXRpb24gYXQgdGhlIHBhZ2UgbGV2ZWwuIFRoaXMgaXMgdXNlZnVsIGlmIHlvdSB3b3VsZCBsaWtlIHRvIGRvXG4gICAqIHZhbGlkYXRpb24sIHNhdmUgZGF0YSwgb3Igd2FybiB1c2VycyBiZWZvcmUgYWxsb3dpbmcgdGhlbSB0byBnb1xuICAgKiBiYWNrd2FyZHMgaW4gdGhlIHdpemFyZC5cbiAgICpcbiAgICogTm90ZSB0aGF0IHRoaXMgcmVxdWlyZXMgeW91IHRvIGNhbGwgV2l6YXJkLnByZXZpb3VzKClcbiAgICogZnJvbSB0aGUgaG9zdCBjb21wb25lbnQuIFRoaXMgY29tYmluYXRpb24gY3JlYXRlcyBhIGZ1bGwgcmVwbGFjZW1lbnQgb2ZcbiAgICogdGhlIGJhY2t3YXJkcyBuYXZpZ2F0aW9uIGZ1bmN0aW9uYWxpdHkuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRQYWdlXG4gICAqXG4gICAqL1xuICBAT3V0cHV0KCdjbHJXaXphcmRQYWdlUHJldmlvdXMnKSBwcmV2aW91c0J1dHRvbkNsaWNrZWQ6IEV2ZW50RW1pdHRlcjxDbHJXaXphcmRQYWdlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAvKipcbiAgICogRW1pdHMgYW4gZXZlbnQgd2hlbiB0aGUgbmV4dCBidXR0b24gaXMgY2xpY2tlZCBhbmQgdGhlIENscldpemFyZFBhZ2UgaXNcbiAgICogdGhlIHdpemFyZCdzIGN1cnJlbnQgcGFnZS5cbiAgICpcbiAgICogQ2FuIGJlIHVzZWQgaW4gY29uanVuY3Rpb24gd2l0aCB0aGUgQ2xyV2l6YXJkUGFnZS5wcmV2ZW50RGVmYXVsdFxuICAgKiAoY2xyV2l6YXJkUGFnZVBhZ2VQcmV2ZW50RGVmYXVsdCkgaW5wdXQgdG8gaW1wbGVtZW50IGN1c3RvbSBmb3J3YXJkc1xuICAgKiBuYXZpZ2F0aW9uIGF0IHRoZSBwYWdlIGxldmVsLiBUaGlzIGlzIHVzZWZ1bCBpZiB5b3Ugd291bGQgbGlrZSB0byBkb1xuICAgKiB2YWxpZGF0aW9uLCBzYXZlIGRhdGEsIG9yIHdhcm4gdXNlcnMgYmVmb3JlIGFsbG93aW5nIHRoZW0gdG8gZ29cbiAgICogdG8gdGhlIG5leHQgcGFnZSBpbiB0aGUgd2l6YXJkLlxuICAgKlxuICAgKiBOb3RlIHRoYXQgdGhpcyByZXF1aXJlcyB5b3UgdG8gY2FsbCBXaXphcmQuZm9yY2VOZXh0KCkgb3IgV2l6YXJkLm5leHQoKVxuICAgKiBmcm9tIHRoZSBob3N0IGNvbXBvbmVudC4gVGhpcyBjb21iaW5hdGlvbiBjcmVhdGVzIGEgZnVsbCByZXBsYWNlbWVudCBvZlxuICAgKiB0aGUgZm9yd2FyZCBuYXZpZ2F0aW9uIGZ1bmN0aW9uYWxpdHkuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRQYWdlXG4gICAqXG4gICAqL1xuICBAT3V0cHV0KCdjbHJXaXphcmRQYWdlTmV4dCcpIG5leHRCdXR0b25DbGlja2VkOiBFdmVudEVtaXR0ZXI8Q2xyV2l6YXJkUGFnZT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLyoqXG4gICAqIEVtaXRzIGFuIGV2ZW50IHdoZW4gYSBkYW5nZXIgYnV0dG9uIGlzIGNsaWNrZWQgYW5kIHRoZSBDbHJXaXphcmRQYWdlIGlzXG4gICAqIHRoZSB3aXphcmQncyBjdXJyZW50IHBhZ2UuIEJ5IGRlZmF1bHQsIGEgZGFuZ2VyIGJ1dHRvbiB3aWxsIGFjdCBhc1xuICAgKiBlaXRoZXIgYSBcIm5leHRcIiBvciBcImZpbmlzaFwiIGJ1dHRvbiBkZXBlbmRpbmcgb24gaWYgdGhlIENscldpemFyZFBhZ2UgaXMgdGhlXG4gICAqIGxhc3QgcGFnZSBvciBub3QuXG4gICAqXG4gICAqIENhbiBiZSB1c2VkIGluIGNvbmp1bmN0aW9uIHdpdGggdGhlIENscldpemFyZFBhZ2UucHJldmVudERlZmF1bHRcbiAgICogKGNscldpemFyZFBhZ2VQYWdlUHJldmVudERlZmF1bHQpIGlucHV0IHRvIGltcGxlbWVudCBjdXN0b20gZm9yd2FyZHNcbiAgICogb3IgZmluaXNoIG5hdmlnYXRpb24gYXQgdGhlIHBhZ2UgbGV2ZWwgd2hlbiB0aGUgZGFuZ2VyIGJ1dHRvbiBpcyBjbGlja2VkLlxuICAgKiBUaGlzIGlzIHVzZWZ1bCBpZiB5b3Ugd291bGQgbGlrZSB0byBkbyB2YWxpZGF0aW9uLCBzYXZlIGRhdGEsIG9yIHdhcm5cbiAgICogdXNlcnMgYmVmb3JlIGFsbG93aW5nIHRoZW0gdG8gZ28gdG8gdGhlIG5leHQgcGFnZSBpbiB0aGUgd2l6YXJkIG9yXG4gICAqIGZpbmlzaCB0aGUgd2l6YXJkLlxuICAgKlxuICAgKiBOb3RlIHRoYXQgdGhpcyByZXF1aXJlcyB5b3UgdG8gY2FsbCBXaXphcmQuZmluaXNoKCksIFdpemFyZC5mb3JjZUZpbmlzaCgpLFxuICAgKiBXaXphcmQuZm9yY2VOZXh0KCkgb3IgV2l6YXJkLm5leHQoKSBmcm9tIHRoZSBob3N0IGNvbXBvbmVudC4gVGhpc1xuICAgKiBjb21iaW5hdGlvbiBjcmVhdGVzIGEgZnVsbCByZXBsYWNlbWVudCBvZiB0aGUgZm9yd2FyZCBuYXZpZ2F0aW9uIGFuZFxuICAgKiBmaW5pc2ggZnVuY3Rpb25hbGl0eS5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFBhZ2VcbiAgICpcbiAgICovXG4gIEBPdXRwdXQoJ2NscldpemFyZFBhZ2VEYW5nZXInKSBkYW5nZXJCdXR0b25DbGlja2VkOiBFdmVudEVtaXR0ZXI8Q2xyV2l6YXJkUGFnZT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLyoqXG4gICAqIEVtaXRzIGFuIGV2ZW50IHdoZW4gYSBuZXh0LCBmaW5pc2gsIG9yIGRhbmdlciBidXR0b24gaXMgY2xpY2tlZCBhbmQgdGhlXG4gICAqIENscldpemFyZFBhZ2UgaXMgdGhlIHdpemFyZCdzIGN1cnJlbnQgcGFnZS5cbiAgICpcbiAgICogQ2FuIGJlIHVzZWQgaW4gY29uanVuY3Rpb24gd2l0aCB0aGUgQ2xyV2l6YXJkUGFnZS5wcmV2ZW50RGVmYXVsdFxuICAgKiAoY2xyV2l6YXJkUGFnZVBhZ2VQcmV2ZW50RGVmYXVsdCkgaW5wdXQgdG8gaW1wbGVtZW50IGN1c3RvbSBmb3J3YXJkc1xuICAgKiBvciBmaW5pc2ggbmF2aWdhdGlvbiBhdCB0aGUgcGFnZSBsZXZlbCwgcmVnYXJkbGVzcyBvZiB0aGUgdHlwZSBvZlxuICAgKiBwcmltYXJ5IGJ1dHRvbi5cbiAgICpcbiAgICogVGhpcyBpcyB1c2VmdWwgaWYgeW91IHdvdWxkIGxpa2UgdG8gZG8gdmFsaWRhdGlvbiwgc2F2ZSBkYXRhLCBvciB3YXJuXG4gICAqIHVzZXJzIGJlZm9yZSBhbGxvd2luZyB0aGVtIHRvIGdvIHRvIHRoZSBuZXh0IHBhZ2UgaW4gdGhlIHdpemFyZCBvclxuICAgKiBmaW5pc2ggdGhlIHdpemFyZC5cbiAgICpcbiAgICogTm90ZSB0aGF0IHRoaXMgcmVxdWlyZXMgeW91IHRvIGNhbGwgV2l6YXJkLmZpbmlzaCgpLCBXaXphcmQuZm9yY2VGaW5pc2goKSxcbiAgICogV2l6YXJkLmZvcmNlTmV4dCgpIG9yIFdpemFyZC5uZXh0KCkgZnJvbSB0aGUgaG9zdCBjb21wb25lbnQuIFRoaXNcbiAgICogY29tYmluYXRpb24gY3JlYXRlcyBhIGZ1bGwgcmVwbGFjZW1lbnQgb2YgdGhlIGZvcndhcmQgbmF2aWdhdGlvbiBhbmRcbiAgICogZmluaXNoIGZ1bmN0aW9uYWxpdHkuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRQYWdlXG4gICAqXG4gICAqL1xuICBAT3V0cHV0KCdjbHJXaXphcmRQYWdlUHJpbWFyeScpIHByaW1hcnlCdXR0b25DbGlja2VkOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBAT3V0cHV0KCdjbHJXaXphcmRQYWdlQ3VzdG9tQnV0dG9uJykgY3VzdG9tQnV0dG9uQ2xpY2tlZDogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLyoqXG4gICAqIEFuIGlucHV0IHZhbHVlIHRoYXQgaXMgdXNlZCBpbnRlcm5hbGx5IHRvIGdlbmVyYXRlIHRoZSBDbHJXaXphcmRQYWdlIElEIGFzXG4gICAqIHdlbGwgYXMgdGhlIHN0ZXAgbmF2IGl0ZW0gSUQuXG4gICAqXG4gICAqIFR5cGVkIGFzIGFueSBiZWNhdXNlIGl0IHNob3VsZCBiZSBhYmxlIHRvIGFjY2VwdCBudW1iZXJzIGFzIHdlbGwgYXNcbiAgICogc3RyaW5ncy4gUGFzc2luZyBhbiBpbmRleCBmb3Igd2l6YXJkIHdob3NlIHBhZ2VzIGFyZSBjcmVhdGVkIHdpdGggYW5cbiAgICogbmdGb3IgbG9vcCBpcyBhIGNvbW1vbiB1c2UgY2FzZS5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFBhZ2VcbiAgICpcbiAgICovXG4gIEBJbnB1dCgnaWQnKSBfaWQ6IGFueSA9ICh3aXphcmRQYWdlSW5kZXgrKykudG9TdHJpbmcoKTtcblxuICAvKipcbiAgICogQSByZWFkLW9ubHkgZ2V0dGVyIHRoYXQgZ2VuZXJhdGVzIGFuIElEIHN0cmluZyBmb3IgdGhlIHdpemFyZCBwYWdlIGZyb21cbiAgICogZWl0aGVyIHRoZSB2YWx1ZSBwYXNzZWQgdG8gdGhlIENscldpemFyZFBhZ2UgXCJpZFwiIGlucHV0IG9yIGEgd2l6YXJkIHBhZ2VcbiAgICogY291bnRlciBzaGFyZWQgYWNyb3NzIGFsbCB3aXphcmQgcGFnZXMgaW4gdGhlIGFwcGxpY2F0aW9uLlxuICAgKlxuICAgKiBOb3RlIHRoYXQgdGhlIHZhbHVlIHBhc3NlZCBpbnRvIHRoZSBJRCBpbnB1dCBXaWxsIGJlIHByZWZpeGVkIHdpdGhcbiAgICogXCJjbHItd2l6YXJkLXBhZ2UtXCIuXG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKlxuICAgKiBAbWVtYmVyb2YgQ2xyV2l6YXJkUGFnZVxuICAgKi9cbiAgcHVibGljIGdldCBpZCgpIHtcbiAgICAvLyBjb3ZlcnMgdGhpbmdzIGxpa2UgbnVsbCwgdW5kZWZpbmVkLCBmYWxzZSwgYW5kIGVtcHR5IHN0cmluZ1xuICAgIC8vIHdoaWxlIGFsbG93aW5nIHplcm8gdG8gcGFzc1xuICAgIGNvbnN0IGlkSXNOb25aZXJvRmFsc3kgPSAhdGhpcy5faWQgJiYgdGhpcy5faWQgIT09IDA7XG5cbiAgICAvLyBpbiBhZGRpdGlvbiB0byBub24temVybyBmYWxzeSB3ZSBhbHNvIHdhbnQgdG8gbWFrZSBzdXJlIF9pZCBpcyBub3QgYSBuZWdhdGl2ZVxuICAgIC8vIG51bWJlci5cbiAgICBpZiAoaWRJc05vblplcm9GYWxzeSB8fCB0aGlzLl9pZCA8IDApIHtcbiAgICAgIC8vIGd1YXJkIGhlcmUgaW4gdGhlIGV2ZW50IHRoYXQgaW5wdXQgYmVjb21lcyB1bmRlZmluZWQgb3IgbnVsbCBieSBhY2NpZGVudFxuICAgICAgdGhpcy5faWQgPSAod2l6YXJkUGFnZUluZGV4KyspLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIHJldHVybiBgY2xyLXdpemFyZC1wYWdlLSR7dGhpcy5faWR9YDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIHJlYWQtb25seSBnZXR0ZXIgdGhhdCBzZXJ2ZXMgYXMgYSBjb252ZW5pZW5jZSBmb3IgdGhvc2Ugd2hvIHdvdWxkIHJhdGhlclxuICAgKiBub3QgdGhpbmsgaW4gdGhlIHRlcm1zIG9mICFDbHJXaXphcmRQYWdlLm5leHRTdGVwRGlzYWJsZWQuIEZvciBzb21lIHVzZSBjYXNlcyxcbiAgICogQ2xyV2l6YXJkUGFnZS5yZWFkeVRvQ29tcGxldGUgaXMgbW9yZSBsb2dpY2FsIGFuZCBkZWNsYXJhdGl2ZS5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFBhZ2VcbiAgICpcbiAgICovXG4gIHB1YmxpYyBnZXQgcmVhZHlUb0NvbXBsZXRlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhdGhpcy5uZXh0U3RlcERpc2FibGVkO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRQYWdlXG4gICAqXG4gICAqL1xuICBwcml2YXRlIF9jb21wbGV0ZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBBIHBhZ2UgaXMgbWFya2VkIGFzIGNvbXBsZXRlZCBpZiBpdCBpcyBib3RoIHJlYWR5VG9Db21wbGV0ZSBhbmQgY29tcGxldGVkLFxuICAgKiBhcyBpbiB0aGUgbmV4dCBvciBmaW5pc2ggYWN0aW9uIGhhcyBiZWVuIGV4ZWN1dGVkIHdoaWxlIHRoaXMgcGFnZSB3YXMgY3VycmVudC5cbiAgICpcbiAgICogTm90ZSB0aGVyZSBpcyBhbmQgb3BlbiBxdWVzdGlvbiBhYm91dCBob3cgdG8gaGFuZGxlIHBhZ2VzIHRoYXQgYXJlIG1hcmtlZFxuICAgKiBjb21wbGV0ZSBidXQgd2hvIGFyZSBubyBsb25nZXIgcmVhZHlUb0NvbXBsZXRlLiBUaGlzIG1pZ2h0IGluZGljYXRlIGFuIGVycm9yXG4gICAqIHN0YXRlIGZvciB0aGUgQ2xyV2l6YXJkUGFnZS4gQ3VycmVudGx5LCB0aGUgd2l6YXJkIGRvZXMgbm90IGFja25vd2xlZGdlIHRoaXMgc3RhdGVcbiAgICogYW5kIG9ubHkgcmV0dXJucyB0aGF0IHRoZSBwYWdlIGlzIGluY29tcGxldGUuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRQYWdlXG4gICAqXG4gICAqL1xuICBwdWJsaWMgZ2V0IGNvbXBsZXRlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fY29tcGxldGUgJiYgdGhpcy5yZWFkeVRvQ29tcGxldGU7XG5cbiAgICAvLyBGT1IgVjI6IFVOV0lORCBDT01QTEVURUQsIFJFQURZVE9DT01QTEVURSwgQU5EIEVSUk9SU1xuICAgIC8vIFNVQ0ggVEhBVCBFUlJPUlMgSVMgSVRTIE9XTiBJTlBVVC4gSUYgQSBTVEVQIElTXG4gICAgLy8gSU5DT01QTEVURSBBTkQgRVJST1JFRCwgRVJST1JFRCBXSUxMIE5PVCBTSE9XLlxuICAgIC8vIEZJUlNUIFFVRVNUSU9OOiBBTSBJIEdSRVkgT1IgQ09MT1JFRD9cbiAgICAvLyBTRUNPTkQgUVVFU1RJT046IEFNIEkgR1JFRU4gT1IgUkVEP1xuICB9XG5cbiAgLyoqXG4gICAqIEEgQ2xyV2l6YXJkUGFnZSBjYW4gYmUgbWFudWFsbHkgc2V0IHRvIGNvbXBsZXRlZCB1c2luZyB0aGlzIGJvb2xlYW4gc2V0dGVyLlxuICAgKiBJdCBpcyByZWNvbW1lbmRlZCB0aGF0IHVzZXJzIHJlbHkgb24gdGhlIGNvbnZlbmllbmNlIGZ1bmN0aW9ucyBpbiB0aGUgd2l6YXJkXG4gICAqIGFuZCBuYXZpZ2F0aW9uIHNlcnZpY2UgaW5zdGVhZCBvZiBtYW51YWxseSBzZXR0aW5nIHBhZ2Vz4oCZIGNvbXBsZXRpb24gc3RhdGUuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBDbHJXaXphcmRQYWdlXG4gICAqL1xuICBwdWJsaWMgc2V0IGNvbXBsZXRlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2NvbXBsZXRlID0gdmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIHdpdGggdGhlIG5hdmlnYXRpb24gc2VydmljZSB0byBzZWUgaWYgaXQgaXMgdGhlIGN1cnJlbnQgcGFnZS5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFBhZ2VcbiAgICpcbiAgICovXG4gIHB1YmxpYyBnZXQgY3VycmVudCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5uYXZTZXJ2aWNlLmN1cnJlbnRQYWdlID09PSB0aGlzO1xuICB9XG5cbiAgcHVibGljIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIXRoaXMuZW5hYmxlZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIHJlYWQtb25seSBnZXR0ZXIgdGhhdCByZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSBwYWdlIGlzIG5hdmlnYWJsZVxuICAgKiBpbiB0aGUgd2l6YXJkLiBBIHdpemFyZCBwYWdlIGNhbiBiZSBuYXZpZ2F0ZWQgdG8gaWYgaXQgaXMgY29tcGxldGVkXG4gICAqIG9yIHRoZSBwYWdlIGJlZm9yZSBpdCBpcyBjb21wbGV0ZWQuXG4gICAqXG4gICAqIFRoaXMgZ2V0dGVyIGhhbmRsZXMgdGhlIGxvZ2ljIGZvciBlbmFibGluZyBvciBkaXNhYmxpbmcgdGhlIGxpbmtzIGluXG4gICAqIHRoZSBzdGVwIG5hdiBvbiB0aGUgbGVmdCBTaWRlIG9mIHRoZSB3aXphcmQuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRQYWdlXG4gICAqXG4gICAqL1xuICBwdWJsaWMgZ2V0IGVuYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudCB8fCB0aGlzLmNvbXBsZXRlZCB8fCB0aGlzLnByZXZpb3VzQ29tcGxldGVkO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgcmVhZC1vbmx5IGdldHRlciB0aGF0IHJldHVybnMgd2hldGhlciBvciBub3QgdGhlIHBhZ2UgYmVmb3JlIHRoaXNcbiAgICogQ2xyV2l6YXJkUGFnZSBpcyBjb21wbGV0ZWQuIFRoaXMgaXMgdXNlZnVsIGZvciBkZXRlcm1pbmluZyB3aGV0aGVyIG9yIG5vdFxuICAgKiBhIHBhZ2UgaXMgbmF2aWdhYmxlIGlmIGl0IGlzIG5vdCBjdXJyZW50IG9yIGFscmVhZHkgY29tcGxldGVkLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkUGFnZVxuICAgKlxuICAgKi9cbiAgcHVibGljIGdldCBwcmV2aW91c0NvbXBsZXRlZCgpOiBib29sZWFuIHtcbiAgICBjb25zdCBwcmV2aW91c1BhZ2UgPSB0aGlzLnBhZ2VDb2xsZWN0aW9uLmdldFByZXZpb3VzUGFnZSh0aGlzKTtcblxuICAgIGlmICghcHJldmlvdXNQYWdlKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gcHJldmlvdXNQYWdlLmNvbXBsZXRlZDtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkUGFnZVxuICAgKlxuICAgKi9cbiAgcHVibGljIGdldCB0aXRsZSgpOiBUZW1wbGF0ZVJlZjxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5wYWdlVGl0bGUucGFnZVRpdGxlVGVtcGxhdGVSZWY7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFBhZ2VcbiAgICpcbiAgICovXG4gIHB1YmxpYyBnZXQgbmF2VGl0bGUoKTogVGVtcGxhdGVSZWY8YW55PiB7XG4gICAgaWYgKHRoaXMucGFnZU5hdlRpdGxlKSB7XG4gICAgICByZXR1cm4gdGhpcy5wYWdlTmF2VGl0bGUucGFnZU5hdlRpdGxlVGVtcGxhdGVSZWY7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnBhZ2VUaXRsZS5wYWdlVGl0bGVUZW1wbGF0ZVJlZjtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkUGFnZVxuICAgKlxuICAgKi9cbiAgcHVibGljIGdldCBoZWFkZXJBY3Rpb25zKCk6IFRlbXBsYXRlUmVmPGFueT4ge1xuICAgIGlmICghdGhpcy5faGVhZGVyQWN0aW9ucykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5faGVhZGVyQWN0aW9ucy5wYWdlSGVhZGVyQWN0aW9uc1RlbXBsYXRlUmVmO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRQYWdlXG4gICAqXG4gICAqL1xuICBwdWJsaWMgZ2V0IGhhc0hlYWRlckFjdGlvbnMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy5faGVhZGVyQWN0aW9ucztcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkUGFnZVxuICAgKlxuICAgKi9cbiAgcHVibGljIGdldCBidXR0b25zKCk6IFRlbXBsYXRlUmVmPGFueT4ge1xuICAgIGlmICghdGhpcy5fYnV0dG9ucykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fYnV0dG9ucy5wYWdlQnV0dG9uc1RlbXBsYXRlUmVmO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgcmVhZC1vbmx5IGdldHRlciB0aGF0IHJldHVybnMgYSBib29sZWFuIHRoYXQgc2F5cyB3aGV0aGVyIG9yXG4gICAqIG5vdCB0aGUgQ2xyV2l6YXJkUGFnZSBpbmNsdWRlcyBidXR0b25zLiBVc2VkIHRvIGRldGVybWluZSBpZiB0aGVcbiAgICogV2l6YXJkIHNob3VsZCBvdmVycmlkZSB0aGUgZGVmYXVsdCBidXR0b24gc2V0IGRlZmluZWQgYXNcbiAgICogaXRzIGRpcmVjdCBjaGlsZHJlbi5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFBhZ2VcbiAgICpcbiAgICovXG4gIHB1YmxpYyBnZXQgaGFzQnV0dG9ucygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISF0aGlzLl9idXR0b25zO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZXMgdGhlIG5hdiBzZXJ2aWNlIHRvIG1ha2UgdGhlIENscldpemFyZFBhZ2UgdGhlIGN1cnJlbnQgcGFnZSBpbiB0aGVcbiAgICogd2l6YXJkLiBCeXBhc3NlcyBhbGwgY2hlY2tzIGJ1dCBzdGlsbCBlbWl0cyB0aGUgQ2xyV2l6YXJkUGFnZS5vbkxvYWRcbiAgICogKGNscldpemFyZFBhZ2VPbkxvYWQpIG91dHB1dC5cbiAgICpcbiAgICogSW4gbW9zdCBjYXNlcywgaXQgaXMgYmV0dGVyIHRvIHVzZSB0aGUgZGVmYXVsdCBuYXZpZ2F0aW9uIGZ1bmN0aW9uc1xuICAgKiBpbiBXaXphcmQuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRQYWdlXG4gICAqXG4gICAqL1xuICBwdWJsaWMgbWFrZUN1cnJlbnQoKTogdm9pZCB7XG4gICAgdGhpcy5uYXZTZXJ2aWNlLmN1cnJlbnRQYWdlID0gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBMaW5rcyB0aGUgbmF2IHNlcnZpY2UgYW5kIGVzdGFibGlzaGVzIHRoZSBjdXJyZW50IHBhZ2UgaWYgb25lIGlzIG5vdCBkZWZpbmVkLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkUGFnZVxuICAgKlxuICAgKi9cbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGNvbnN0IG5hdlNlcnZpY2UgPSB0aGlzLm5hdlNlcnZpY2U7XG4gICAgaWYgKCFuYXZTZXJ2aWNlLmN1cnJlbnRQYWdlICYmICFuYXZTZXJ2aWNlLm5hdlNlcnZpY2VMb2FkZWQpIHtcbiAgICAgIHRoaXMubWFrZUN1cnJlbnQoKTtcbiAgICAgIHRoaXMubmF2U2VydmljZS5uYXZTZXJ2aWNlTG9hZGVkID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQSByZWFkLW9ubHkgZ2V0dGVyIHRoYXQgcmV0dXJucyB0aGUgaWQgdXNlZCBieSB0aGUgc3RlcCBuYXYgaXRlbSBhc3NvY2lhdGVkIHdpdGggdGhlIHBhZ2UuXG4gICAqXG4gICAqIENscldpemFyZFBhZ2UgbmVlZHMgdGhpcyBJRCBzdHJpbmcgZm9yIGFyaWEgaW5mb3JtYXRpb24uXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRQYWdlXG4gICAqXG4gICAqL1xuICBwdWJsaWMgZ2V0IHN0ZXBJdGVtSWQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5wYWdlQ29sbGVjdGlvbi5nZXRTdGVwSXRlbUlkRm9yUGFnZSh0aGlzKTtcbiAgfVxufVxuIl19