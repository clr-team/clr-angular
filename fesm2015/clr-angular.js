import { NgControl, FormsModule, SelectMultipleControlValueAccessor } from '@angular/forms';
import { first, filter, switchMap, map } from 'rxjs/operators';
import { CommonModule, DOCUMENT, isPlatformBrowser, FormatWidth, FormStyle, getLocaleDateFormat, getLocaleDayNames, getLocaleFirstDayOfWeek, getLocaleMonthNames, TranslationWidth, NgForOf } from '@angular/common';
import { Subject, BehaviorSubject, of, combineLatest, isObservable, ReplaySubject } from 'rxjs';
import { Directive, NgModule, EventEmitter, Input, Output, TemplateRef, ViewContainerRef, Optional, Injectable, Component, SkipSelf, ViewChild, forwardRef, ChangeDetectorRef, ElementRef, InjectionToken, Inject, HostListener, Renderer2, ContentChildren, QueryList, HostBinding, Injector, NgZone, ComponentFactoryResolver, IterableDiffers, ContentChild, Self, Attribute, PLATFORM_ID, ɵɵdefineInjectable, LOCALE_ID } from '@angular/core';
import { animate, keyframes, style, transition, trigger, state } from '@angular/animations';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrIconCustomTag {
}
ClrIconCustomTag.decorators = [
    { type: Directive, args: [{ selector: 'clr-icon' },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const CLR_ICON_DIRECTIVES = [ClrIconCustomTag];
class ClrIconModule {
}
ClrIconModule.decorators = [
    { type: NgModule, args: [{ imports: [CommonModule], declarations: [CLR_ICON_DIRECTIVES], exports: [CLR_ICON_DIRECTIVES] },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {number} */
const Point = {
    RIGHT_CENTER: 0,
    RIGHT_TOP: 1,
    RIGHT_BOTTOM: 2,
    TOP_CENTER: 3,
    TOP_RIGHT: 4,
    TOP_LEFT: 5,
    BOTTOM_CENTER: 6,
    BOTTOM_RIGHT: 7,
    BOTTOM_LEFT: 8,
    LEFT_CENTER: 9,
    LEFT_TOP: 10,
    LEFT_BOTTOM: 11,
};
Point[Point.RIGHT_CENTER] = 'RIGHT_CENTER';
Point[Point.RIGHT_TOP] = 'RIGHT_TOP';
Point[Point.RIGHT_BOTTOM] = 'RIGHT_BOTTOM';
Point[Point.TOP_CENTER] = 'TOP_CENTER';
Point[Point.TOP_RIGHT] = 'TOP_RIGHT';
Point[Point.TOP_LEFT] = 'TOP_LEFT';
Point[Point.BOTTOM_CENTER] = 'BOTTOM_CENTER';
Point[Point.BOTTOM_RIGHT] = 'BOTTOM_RIGHT';
Point[Point.BOTTOM_LEFT] = 'BOTTOM_LEFT';
Point[Point.LEFT_CENTER] = 'LEFT_CENTER';
Point[Point.LEFT_TOP] = 'LEFT_TOP';
Point[Point.LEFT_BOTTOM] = 'LEFT_BOTTOM';
/** @type {?} */
const POSITION_RELATIVE = 'relative';
/** @type {?} */
const POSITION_ABSOLUTE = 'absolute';
/** @type {?} */
const POSITION_FIXED = 'fixed';
/** @type {?} */
const OVERFLOW_SCROLL = 'scroll';
/** @type {?} */
const OVERFLOW_AUTO = 'auto';
class Popover {
    /**
     * @param {?} element
     */
    constructor(element) {
        this.element = element;
        /*
             * Containers up to the first positioned one will have an event on scroll
             */
        this.scrollableElements = [];
        this.boundOnScrollListener = this.emitScrollEvent.bind(this);
        // Browsers don't agree with what to do if some of these are not specified, so we set them all to be safe.
        element.style.position = POSITION_ABSOLUTE;
        element.style.top = 0;
        element.style.bottom = 'auto';
        element.style.left = 0;
        element.style.right = 'auto';
    }
    // TODO: need a way to account for parameters that change dynamically (positioning).
    /**
     * @param {?} anchor
     * @param {?} anchorAlign
     * @param {?} popoverAlign
     * @param {?=} __3
     * @return {?}
     */
    anchor(anchor, anchorAlign, popoverAlign, { offsetX = 0, offsetY = 0, useAnchorParent = false } = {}) {
        // TODO: we are assuming here that the popover is inside or next to the anchor.
        // We'd need to go up the popover tree too otherwise
        this.addScrollEventListeners(anchor);
        if (useAnchorParent) {
            anchor = anchor.parentNode;
        }
        // explicitly override anchor's style to static
        anchor.style.position = 'static';
        /** @type {?} */
        const anchorRect = anchor.getBoundingClientRect();
        /** @type {?} */
        const popoverRect = this.element.getBoundingClientRect();
        // position of left top corner of anchor + the offset
        /** @type {?} */
        let leftDiff = anchorRect.left - popoverRect.left + offsetX;
        /** @type {?} */
        let topDiff = anchorRect.top - popoverRect.top + offsetY;
        // first, adjust positioning based on anchor's align point
        switch (anchorAlign) {
            case Point.LEFT_TOP:
            case Point.TOP_LEFT:
                break;
            case Point.TOP_CENTER:
                leftDiff += anchorRect.width / 2;
                break;
            case Point.TOP_RIGHT:
                leftDiff += anchorRect.width;
                break;
            case Point.RIGHT_TOP:
                leftDiff += anchorRect.width;
                break;
            case Point.LEFT_BOTTOM:
                topDiff += anchorRect.height;
                break;
            case Point.BOTTOM_LEFT:
                topDiff += anchorRect.height;
                break;
            case Point.BOTTOM_CENTER:
                topDiff += anchorRect.height;
                leftDiff += anchorRect.width / 2;
                break;
            case Point.BOTTOM_RIGHT:
                topDiff += anchorRect.height;
                leftDiff += anchorRect.width;
                break;
            case Point.RIGHT_BOTTOM:
                topDiff += anchorRect.height;
                leftDiff += anchorRect.width;
                break;
            case Point.LEFT_CENTER:
                topDiff += anchorRect.height / 2;
                break;
            case Point.RIGHT_CENTER:
                topDiff += anchorRect.height / 2;
                leftDiff += anchorRect.width;
                break;
            default:
        }
        // second, adjust positioning based on popover's align point
        switch (popoverAlign) {
            case Point.LEFT_TOP:
            case Point.TOP_LEFT:
                break;
            case Point.TOP_CENTER:
                leftDiff -= popoverRect.width / 2;
                break;
            case Point.TOP_RIGHT:
                leftDiff -= popoverRect.width;
                break;
            case Point.RIGHT_TOP:
                leftDiff -= popoverRect.width;
                break;
            case Point.LEFT_BOTTOM:
                topDiff -= popoverRect.height;
                break;
            case Point.BOTTOM_LEFT:
                topDiff -= popoverRect.height;
                break;
            case Point.BOTTOM_CENTER:
                topDiff -= popoverRect.height;
                leftDiff -= popoverRect.width / 2;
                break;
            case Point.BOTTOM_RIGHT:
                topDiff -= popoverRect.height;
                leftDiff -= popoverRect.width;
                break;
            case Point.RIGHT_BOTTOM:
                topDiff -= popoverRect.height;
                leftDiff -= popoverRect.width;
                break;
            case Point.LEFT_CENTER:
                topDiff -= popoverRect.height / 2;
                break;
            case Point.RIGHT_CENTER:
                topDiff -= popoverRect.height / 2;
                leftDiff -= popoverRect.width;
                break;
            default:
        }
        // Third, adjust with popover's margins based on the two align points.
        // Here, we make an assumption that popover is primarily positioned outside the
        // anchor with minor offset. Without this assumption, it's impossible to apply
        // the popover's margins in a predictable way. For example, assume that a popover
        // and its anchor are exactly the same size. if a popover is positioned inside the
        // anchor (which is technically possible), then it becomes impossible to know what to do
        // if the popover has a non-zero margin value all around (because applying the margin in
        // all four directions will result in no margin visually, which isn't what we want).
        // Therefore, our logic makes assumptions about margins of interest given the points,
        // and only covers the cases where popover is outside the anchor.
        /** @type {?} */
        const popoverComputedStyle = getComputedStyle(this.element);
        /** @type {?} */
        const marginLeft = parseInt(popoverComputedStyle.marginLeft, 10);
        /** @type {?} */
        const marginRight = parseInt(popoverComputedStyle.marginRight, 10);
        /** @type {?} */
        const marginTop = parseInt(popoverComputedStyle.marginTop, 10);
        /** @type {?} */
        const marginBottom = parseInt(popoverComputedStyle.marginBottom, 10);
        switch (anchorAlign) {
            case Point.LEFT_TOP:
            case Point.TOP_LEFT:
            case Point.TOP_RIGHT:
            case Point.RIGHT_TOP:
                if (popoverAlign === Point.BOTTOM_RIGHT || popoverAlign === Point.RIGHT_BOTTOM) {
                    topDiff -= marginBottom;
                    leftDiff -= marginRight;
                }
                if (popoverAlign === Point.BOTTOM_LEFT || popoverAlign === Point.LEFT_BOTTOM) {
                    topDiff -= marginTop;
                    leftDiff += marginLeft;
                }
                if (popoverAlign === Point.TOP_LEFT || popoverAlign === Point.LEFT_TOP) {
                    topDiff += marginTop;
                    leftDiff += marginLeft;
                }
                if (popoverAlign === Point.TOP_RIGHT || popoverAlign === Point.RIGHT_TOP) {
                    topDiff += marginTop;
                    leftDiff -= marginRight;
                }
                break;
            case Point.LEFT_BOTTOM:
            case Point.BOTTOM_LEFT:
            case Point.BOTTOM_RIGHT:
            case Point.RIGHT_BOTTOM:
                if (popoverAlign === Point.BOTTOM_LEFT || popoverAlign === Point.LEFT_BOTTOM) {
                    topDiff -= marginBottom;
                    leftDiff += marginLeft;
                }
                if (popoverAlign === Point.BOTTOM_RIGHT || popoverAlign === Point.RIGHT_BOTTOM) {
                    topDiff -= marginBottom;
                    leftDiff -= marginRight;
                }
                if (popoverAlign === Point.TOP_LEFT || popoverAlign === Point.LEFT_TOP) {
                    topDiff += marginTop;
                    leftDiff += marginLeft;
                }
                if (popoverAlign === Point.TOP_RIGHT || popoverAlign === Point.RIGHT_TOP) {
                    topDiff += marginTop;
                    leftDiff -= marginRight;
                }
                break;
            case Point.TOP_CENTER:
                topDiff -= marginBottom;
                leftDiff += marginLeft;
                leftDiff -= marginRight;
                break;
            case Point.BOTTOM_CENTER:
                topDiff += marginTop;
                leftDiff += marginLeft;
                leftDiff -= marginRight;
                break;
            case Point.LEFT_CENTER:
                topDiff += marginTop;
                topDiff -= marginBottom;
                leftDiff -= marginRight;
                break;
            case Point.RIGHT_CENTER:
                topDiff += marginTop;
                topDiff -= marginBottom;
                leftDiff += marginLeft;
                break;
            default:
        }
        this.element.style.transform = `translateX(${Math.round(leftDiff)}px) translateY(${Math.round(topDiff)}px)`;
        return this._scroll.asObservable();
    }
    /**
     * @return {?}
     */
    release() {
        this.element.style.transform = '';
        this.removeScrollEventListeners();
    }
    /**
     * @private
     * @param {?} container
     * @return {?}
     */
    isPositioned(container) {
        /** @type {?} */
        const position = getComputedStyle(container).position;
        return position === POSITION_RELATIVE || position === POSITION_ABSOLUTE || position === POSITION_FIXED;
    }
    /**
     * @private
     * @return {?}
     */
    emitScrollEvent() {
        this._scroll.next();
    }
    /**
     * @private
     * @param {?} e
     * @return {?}
     */
    addScrollEventListeners(e) {
        this._scroll = new Subject();
        /** @type {?} */
        const anchor = e;
        /** @type {?} */
        let current = e;
        while (current && current !== document) {
            if (this.scrolls(current)) {
                current.addEventListener('scroll', this.boundOnScrollListener);
                this.scrollableElements.push(current);
            }
            if (current !== anchor && this.isPositioned(current)) {
                break;
            }
            current = current.parentNode;
        }
    }
    /**
     * @private
     * @return {?}
     */
    removeScrollEventListeners() {
        for (const elem of this.scrollableElements) {
            elem.removeEventListener('scroll', this.boundOnScrollListener);
        }
        this.scrollableElements.length = 0;
        if (this._scroll) {
            this._scroll.complete();
            delete this._scroll;
        }
    }
    /**
     * @private
     * @param {?} container
     * @return {?}
     */
    scrolls(container) {
        /** @type {?} */
        const computedStyles = getComputedStyle(container);
        return (computedStyles.overflowX === OVERFLOW_SCROLL ||
            computedStyles.overflowX === OVERFLOW_AUTO ||
            computedStyles.overflowY === OVERFLOW_SCROLL ||
            computedStyles.overflowY === OVERFLOW_AUTO);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
let openCount = 0;
/** @type {?} */
const waiting = [];
// pending create functions
class PopoverDirectiveOld {
    /**
     * @param {?} templateRef
     * @param {?} viewContainer
     */
    constructor(templateRef, viewContainer) {
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this.popoverOptions = {};
        this.clrPopoverOldChange = new EventEmitter(false);
    }
    /**
     * @param {?} open
     * @return {?}
     */
    set clrPopoverOld(open) {
        if (open) {
            if (this.popoverOptions.allowMultipleOpen) {
                this.createPopover();
            }
            else {
                if (openCount === 0) {
                    this.createPopover();
                }
                else {
                    waiting.push((/**
                     * @return {?}
                     */
                    () => {
                        this.createPopover();
                    }));
                }
            }
        }
        else {
            this.viewContainer.clear();
            this.destroyPopover();
            if (!this.popoverOptions.allowMultipleOpen) {
                if (waiting.length > 0) {
                    /** @type {?} */
                    const createPopoverFn = waiting.shift();
                    createPopoverFn();
                }
            }
        }
    }
    /**
     * @return {?}
     */
    createPopover() {
        /** @type {?} */
        const embeddedViewRef = (/** @type {?} */ (this.viewContainer.createEmbeddedView(this.templateRef)));
        // TODO: Not sure of the risks associated with using this. Find an alternative.
        // Needed for find the correct height and width of dynamically created views
        // inside of the popover. For Eg: Button Groups
        embeddedViewRef.detectChanges();
        // filter out other nodes in the view ref so we are only left with element nodes
        /** @type {?} */
        const elementNodes = embeddedViewRef.rootNodes.filter((/**
         * @param {?} node
         * @return {?}
         */
        (node) => {
            return node.nodeType === 1;
        }));
        // we take the first element node in the embedded view; usually there should only be one anyways
        this._popoverInstance = new Popover(elementNodes[0]);
        this._subscription = this._popoverInstance
            .anchor(this.anchorElem, this.anchorPoint, this.popoverPoint, this.popoverOptions)
            .subscribe((/**
         * @return {?}
         */
        () => {
            this.clrPopoverOldChange.emit(false);
        }));
        openCount++;
    }
    /**
     * @return {?}
     */
    destroyPopover() {
        if (this._popoverInstance) {
            this._subscription.unsubscribe();
            this._popoverInstance.release();
            delete this._popoverInstance;
            openCount--;
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.destroyPopover();
    }
}
PopoverDirectiveOld.decorators = [
    { type: Directive, args: [{ selector: '[clrPopoverOld]' },] }
];
/** @nocollapse */
PopoverDirectiveOld.ctorParameters = () => [
    { type: TemplateRef },
    { type: ViewContainerRef }
];
PopoverDirectiveOld.propDecorators = {
    anchorElem: [{ type: Input, args: ['clrPopoverOldAnchor',] }],
    anchorPoint: [{ type: Input, args: ['clrPopoverOldAnchorPoint',] }],
    popoverPoint: [{ type: Input, args: ['clrPopoverOldPopoverPoint',] }],
    popoverOptions: [{ type: Input, args: ['clrPopoverOldOptions',] }],
    clrPopoverOldChange: [{ type: Output, args: ['clrPopoverOldChange',] }],
    clrPopoverOld: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const POPOVER_DIRECTIVES = [PopoverDirectiveOld];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrCommonPopoverModule {
}
ClrCommonPopoverModule.decorators = [
    { type: NgModule, args: [{ imports: [CommonModule], declarations: [POPOVER_DIRECTIVES], exports: [POPOVER_DIRECTIVES] },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * This is an abstract class because we need it to still be a valid token for dependency injection after transpiling.
 * This does not mean you should extend it, simply implementing it is fine.
 * @abstract
 */
class LoadingListener {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {number} */
const ClrLoadingState = {
    DEFAULT: 0,
    LOADING: 1,
    SUCCESS: 2,
    ERROR: 3,
};
ClrLoadingState[ClrLoadingState.DEFAULT] = 'DEFAULT';
ClrLoadingState[ClrLoadingState.LOADING] = 'LOADING';
ClrLoadingState[ClrLoadingState.SUCCESS] = 'SUCCESS';
ClrLoadingState[ClrLoadingState.ERROR] = 'ERROR';
class ClrLoading {
    // We find the first parent that handles something loading
    /**
     * @param {?} listener
     */
    constructor(listener) {
        this.listener = listener;
        this._loadingState = ClrLoadingState.DEFAULT;
    }
    /**
     * @return {?}
     */
    get loadingState() {
        return this._loadingState;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set loadingState(value) {
        if (value === true) {
            value = ClrLoadingState.LOADING;
        }
        else if (!value) {
            value = ClrLoadingState.DEFAULT;
        }
        if (value === this._loadingState) {
            return;
        }
        this._loadingState = value;
        if (this.listener) {
            this.listener.loadingStateChange(value);
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.loadingState = ClrLoadingState.DEFAULT;
    }
}
ClrLoading.decorators = [
    { type: Directive, args: [{ selector: '[clrLoading]' },] }
];
/** @nocollapse */
ClrLoading.ctorParameters = () => [
    { type: LoadingListener, decorators: [{ type: Optional }] }
];
ClrLoading.propDecorators = {
    loadingState: [{ type: Input, args: ['clrLoading',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ButtonInGroupService {
    constructor() {
        this._changes = new Subject();
    }
    /**
     * @return {?}
     */
    get changes() {
        return this._changes.asObservable();
    }
    /**
     * @param {?} button
     * @return {?}
     */
    updateButtonGroup(button) {
        this._changes.next(button);
    }
}
ButtonInGroupService.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrButton {
    /**
     * @param {?} buttonInGroupService
     */
    constructor(buttonInGroupService) {
        this.buttonInGroupService = buttonInGroupService;
        this._enableService = false;
        this._inMenu = false;
        this._classNames = 'btn';
        this._name = null;
        this._type = null;
        this._id = null;
        this._disabled = null;
        this._click = new EventEmitter(false);
    }
    /**
     * @return {?}
     */
    get inMenu() {
        return this._inMenu;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set inMenu(value) {
        value = !!value;
        if (this._inMenu !== value) {
            this._inMenu = value;
            // We check if the service flag is enabled
            // and if the service exists because the service is optional
            if (this._enableService && this.buttonInGroupService) {
                this.buttonInGroupService.updateButtonGroup(this);
            }
        }
    }
    /**
     * @return {?}
     */
    get classNames() {
        return this._classNames;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set classNames(value) {
        if (typeof value === 'string') {
            /** @type {?} */
            const classNames = value.split(' ');
            if (classNames.indexOf('btn') === -1) {
                classNames.push('btn');
            }
            this._classNames = classNames.join(' ');
        }
    }
    /**
     * @return {?}
     */
    get name() {
        return this._name;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set name(value) {
        if (typeof value === 'string') {
            this._name = value;
        }
    }
    /**
     * @return {?}
     */
    get type() {
        return this._type;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set type(value) {
        if (typeof value === 'string') {
            this._type = value;
        }
    }
    /**
     * @return {?}
     */
    get id() {
        return this._id;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set id(value) {
        if (typeof value === 'string') {
            this._id = value;
        }
    }
    /**
     * @return {?}
     */
    get disabled() {
        return this._disabled;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        if (value !== null && value !== false) {
            this._disabled = '';
        }
        else {
            this._disabled = null;
        }
    }
    /**
     * @param {?} state
     * @return {?}
     */
    loadingStateChange(state$$1) {
        this.loading = state$$1 === ClrLoadingState.LOADING;
    }
    /**
     * @return {?}
     */
    emitClick() {
        this._click.emit(true);
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this._enableService = true;
    }
}
ClrButton.decorators = [
    { type: Component, args: [{
                selector: 'clr-button',
                template: `
        <ng-template #buttonProjectedRef>
            <button 
                [class]="classNames" 
                (click)="emitClick()"
                [attr.type]="type"
                [attr.name]="name"
                [attr.disabled]="disabled"
                [id]="id">
                <span class="spinner spinner-inline" *ngIf="loading"></span>
                <ng-content></ng-content>
            </button>
        </ng-template>
    `,
                providers: [{ provide: LoadingListener, useExisting: ClrButton }]
            }] }
];
/** @nocollapse */
ClrButton.ctorParameters = () => [
    { type: ButtonInGroupService, decorators: [{ type: SkipSelf }, { type: Optional }] }
];
ClrButton.propDecorators = {
    templateRef: [{ type: ViewChild, args: ['buttonProjectedRef',] }],
    inMenu: [{ type: Input, args: ['clrInMenu',] }],
    classNames: [{ type: Input, args: ['class',] }],
    name: [{ type: Input, args: ['name',] }],
    type: [{ type: Input, args: ['type',] }],
    id: [{ type: Input, args: ['id',] }],
    disabled: [{ type: Input, args: ['disabled',] }],
    _click: [{ type: Output, args: ['click',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/** @type {?} */
const CLR_MENU_POSITIONS = [
    'bottom-left',
    'bottom-right',
    'top-left',
    'top-right',
    'left-bottom',
    'left-top',
    'right-bottom',
    'right-top',
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// @TODO Put the Required type back in when our minimumly supported version of Angular uses
// TS 2.8 or greater (should be Angular 7)
// export class ClrCommonStringsService implements Required<ClrCommonStrings> {
class ClrCommonStringsService {
    constructor() {
        this.open = 'Open';
        this.close = 'Close';
        this.show = 'Show';
        this.hide = 'Hide';
        this.expand = 'Expand';
        this.collapse = 'Collapse';
        this.more = 'More';
        this.select = 'Select';
        this.selectAll = 'Select All';
        this.previous = 'Previous';
        this.next = 'Next';
        this.current = 'Jump to current';
        this.info = 'Info';
        this.success = 'Success';
        this.warning = 'Warning';
        this.danger = 'Error';
        this.rowActions = 'Available actions';
        this.pickColumns = 'Show or hide columns';
        this.showColumns = 'Show Columns';
    }
}
/**
 * @param {?=} existing
 * @return {?}
 */
function commonStringsFactory(existing) {
    /** @type {?} */
    const defaults = new ClrCommonStringsService();
    if (existing) {
        return Object.assign({}, defaults, existing);
    }
    return defaults;
}
/** @type {?} */
const COMMON_STRINGS_PROVIDER = {
    useFactory: commonStringsFactory,
    // We have a circular dependency for now, we can address it later once these
    // tree-shakeable providers have proper documentation.
    deps: [[new Optional(), new SkipSelf(), forwardRef((/**
             * @return {?}
             */
            () => ClrCommonStrings))]],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
class ClrCommonStrings {
}
ClrCommonStrings.decorators = [
    { type: Injectable, args: [Object.assign({ providedIn: 'root' }, COMMON_STRINGS_PROVIDER),] }
];
/** @nocollapse */ ClrCommonStrings.ngInjectableDef = ɵɵdefineInjectable({ factory: function ClrCommonStrings_Factory() { return new ClrCommonStrings(); }, token: ClrCommonStrings, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrButtonGroup {
    /**
     * @param {?} buttonGroupNewService
     * @param {?} elementRef
     * @param {?} commonStrings
     */
    constructor(buttonGroupNewService, elementRef, commonStrings) {
        this.buttonGroupNewService = buttonGroupNewService;
        this.elementRef = elementRef;
        this.commonStrings = commonStrings;
        this.inlineButtons = [];
        this.menuButtons = [];
        this._openMenu = false;
        this.anchorPoint = Point.BOTTOM_LEFT; // default if menuPosition isn't set
        // default if menuPosition isn't set
        this.popoverPoint = Point.LEFT_TOP; // default if menuPosition isn't set
        /**
         * Flag with indicates if the overflow menu toggle was clicked.
         * If true, this can save us traversing the DOM to find
         * whether the click was withing the button group toggle
         * or menu in the onMouseClick method
         */
        this._overflowMenuToggleClicked = false;
    }
    /**
     * 1. Initializes the initial Button Group View
     * 2. Subscribes to changes on the ContentChildren
     *    in case the user content projection changes
     * @return {?}
     */
    ngAfterContentInit() {
        this.initializeButtons();
        this.buttonGroupNewService.changes.subscribe((/**
         * @param {?} button
         * @return {?}
         */
        button => this.rearrangeButton(button)));
        this.buttons.changes.subscribe((/**
         * @return {?}
         */
        () => {
            this.initializeButtons();
        }));
    }
    /**
     * Moves the button into the other ViewContainer
     * when an update is received.
     *
     * @param {?} button
     * @return {?}
     */
    rearrangeButton(button) {
        /** @type {?} */
        let fromView;
        /** @type {?} */
        let toView;
        if (button.inMenu) {
            fromView = this.inlineButtons;
            toView = this.menuButtons;
        }
        else {
            fromView = this.menuButtons;
            toView = this.inlineButtons;
        }
        /** @type {?} */
        const index = fromView.indexOf(button);
        if (index > -1) {
            fromView.splice(index, 1);
            /** @type {?} */
            const moveIndex = this.getMoveIndex(button);
            if (moveIndex <= toView.length) {
                toView.splice(moveIndex, 0, button);
            }
        }
    }
    /**
     * Author: Eudes
     *
     * Finds the order of a button w.r.t other buttons
     *
     * @param {?} buttonToMove
     * @return {?}
     */
    getMoveIndex(buttonToMove) {
        /** @type {?} */
        const tempArr = this.buttons.filter((/**
         * @param {?} button
         * @return {?}
         */
        button => button.inMenu === buttonToMove.inMenu));
        return tempArr.indexOf(buttonToMove);
    }
    /**
     * @return {?}
     */
    initializeButtons() {
        /** @type {?} */
        const tempInlineButtons = [];
        /** @type {?} */
        const tempInMenuButtons = [];
        this.buttons.forEach((/**
         * @param {?} button
         * @return {?}
         */
        button => {
            if (button.inMenu) {
                tempInMenuButtons.push(button);
            }
            else {
                tempInlineButtons.push(button);
            }
        }));
        this.inlineButtons = tempInlineButtons;
        this.menuButtons = tempInMenuButtons;
    }
    /**
     * @return {?}
     */
    get menuPosition() {
        return this._menuPosition;
    }
    /**
     * @param {?} pos
     * @return {?}
     */
    set menuPosition(pos) {
        if (pos && CLR_MENU_POSITIONS.indexOf(pos) > -1) {
            this._menuPosition = pos;
        }
        else {
            this._menuPosition = 'bottom-left';
        }
        // set the popover values based on menu position
        switch (this._menuPosition) {
            case 'top-right':
                this.anchorPoint = Point.TOP_RIGHT;
                this.popoverPoint = Point.RIGHT_BOTTOM;
                break;
            case 'top-left':
                this.anchorPoint = Point.TOP_LEFT;
                this.popoverPoint = Point.LEFT_BOTTOM;
                break;
            case 'bottom-right':
                this.anchorPoint = Point.BOTTOM_RIGHT;
                this.popoverPoint = Point.RIGHT_TOP;
                break;
            case 'bottom-left':
                this.anchorPoint = Point.BOTTOM_LEFT;
                this.popoverPoint = Point.LEFT_TOP;
                break;
            case 'right-top':
                this.anchorPoint = Point.RIGHT_TOP;
                this.popoverPoint = Point.LEFT_TOP;
                break;
            case 'right-bottom':
                this.anchorPoint = Point.RIGHT_BOTTOM;
                this.popoverPoint = Point.LEFT_BOTTOM;
                break;
            case 'left-top':
                this.anchorPoint = Point.LEFT_TOP;
                this.popoverPoint = Point.RIGHT_TOP;
                break;
            case 'left-bottom':
                this.anchorPoint = Point.LEFT_BOTTOM;
                this.popoverPoint = Point.RIGHT_BOTTOM;
                break;
            default:
                this.anchorPoint = Point.BOTTOM_LEFT;
                this.popoverPoint = Point.LEFT_TOP;
                break;
        }
    }
    /**
     * @return {?}
     */
    get openMenu() {
        return this._openMenu;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set openMenu(value) {
        this._openMenu = value;
    }
    // default if menuPosition isn't set
    /**
     * Toggle the ClrDropdown Menu when the ClrDropdown Toggle is
     * clicked. Also set a flag that indicates that the toggle
     * was clicked so that we don't traverse the DOM to find the
     * location of the click.
     * @return {?}
     */
    toggleMenu() {
        this.openMenu = !this.openMenu;
        this._overflowMenuToggleClicked = true;
    }
    // TODO: Generic Directive to handle this
    /**
     * Called on mouse clicks anywhere in the DOM.
     * Checks to see if the mouseclick happened on the host or outside
     * @param {?} target
     * @return {?}
     */
    onMouseClick(target) {
        if (this.openMenu && !this._overflowMenuToggleClicked) {
            // Reset the overflow menu toggle clicked flag
            this._overflowMenuToggleClicked = false;
            /** @type {?} */
            let current = target;
            // Get the element in the DOM on which the mouse was clicked
            /** @type {?} */
            const host = this.elementRef.nativeElement;
            if (current.classList.contains('dropdown-menu')) {
                current = current.parentNode;
                while (current) {
                    if (current === document) {
                        this.openMenu = false;
                        return;
                    }
                    // If clicked on dropdown menu and menu is in host
                    // do nothing
                    if (current === host) {
                        return;
                    }
                    current = current.parentNode;
                }
            }
            this.openMenu = false;
        }
        this._overflowMenuToggleClicked = false; // Reset the overflow menu toggle clicked flag
    }
}
ClrButtonGroup.decorators = [
    { type: Component, args: [{
                selector: 'clr-button-group',
                template: "<!--\n  ~ Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.\n  ~ This software is released under MIT license.\n  ~ The full license information can be found in LICENSE in the root directory of this project.\n  -->\n\n<ng-container *ngFor=\"let inlineButton of inlineButtons\">\n    <ng-template [ngTemplateOutlet]=\"inlineButton.templateRef\"></ng-template>\n</ng-container>\n<ng-container *ngIf=\"menuButtons.length > 0\">\n    <div\n        class=\"btn-group-overflow open\"\n        [ngClass]=\"menuPosition\"\n        #anchor>\n        <button\n            class=\"btn dropdown-toggle\"\n            (click)=\"toggleMenu()\">\n            <clr-icon shape=\"ellipsis-horizontal\" [attr.title]=\"commonStrings.more\"></clr-icon>\n        </button>\n        <div\n            class=\"dropdown-menu\"\n            *clrPopoverOld=\"openMenu; anchor: anchor; anchorPoint: anchorPoint; popoverPoint: popoverPoint;\">\n            <ng-template [ngTemplateOutlet]=\"ref\"></ng-template>\n        </div>\n    </div>\n</ng-container>\n<ng-template #ref>\n    <ng-container *ngFor=\"let menuButton of menuButtons\">\n        <ng-template [ngTemplateOutlet]=\"menuButton.templateRef\"></ng-template>\n    </ng-container>\n</ng-template>\n",
                providers: [ButtonInGroupService],
                host: { '[class.btn-group]': 'true' }
            }] }
];
/** @nocollapse */
ClrButtonGroup.ctorParameters = () => [
    { type: ButtonInGroupService },
    { type: ElementRef },
    { type: ClrCommonStrings }
];
ClrButtonGroup.propDecorators = {
    buttons: [{ type: ContentChildren, args: [ClrButton,] }],
    menuPosition: [{ type: Input, args: ['clrMenuPosition',] }],
    onMouseClick: [{ type: HostListener, args: ['document:click', ['$event.target'],] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const CLR_BUTTON_GROUP_DIRECTIVES = [ClrButton, ClrButtonGroup];
class ClrButtonGroupModule {
}
ClrButtonGroupModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, ClrIconModule, ClrCommonPopoverModule],
                declarations: [CLR_BUTTON_GROUP_DIRECTIVES],
                exports: [CLR_BUTTON_GROUP_DIRECTIVES],
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrLoadingButton {
    /**
     * @param {?} el
     * @param {?} renderer
     */
    constructor(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.buttonState = ClrLoadingState;
        this.state = ClrLoadingState.DEFAULT;
        this.clrLoadingChange = new EventEmitter(false);
    }
    /**
     * @param {?} state
     * @return {?}
     */
    loadingStateChange(state$$1) {
        if (state$$1 === this.state) {
            return;
        }
        this.state = state$$1;
        switch (state$$1) {
            case ClrLoadingState.DEFAULT:
                this.renderer.removeStyle(this.el.nativeElement, 'width');
                this.renderer.removeStyle(this.el.nativeElement, 'transform'); // for chromium render bug see issue https://github.com/vmware/clarity/issues/2700
                if (!this.disabled) {
                    this.renderer.removeAttribute(this.el.nativeElement, 'disabled');
                }
                break;
            case ClrLoadingState.LOADING:
                this.setExplicitButtonWidth();
                this.renderer.setStyle(this.el.nativeElement, 'transform', 'translatez(0)'); // for chromium render bug see issue https://github.com/vmware/clarity/issues/2700
                this.renderer.setAttribute(this.el.nativeElement, 'disabled', '');
                break;
            case ClrLoadingState.SUCCESS:
                this.setExplicitButtonWidth();
                break;
            case ClrLoadingState.ERROR:
                this.loadingStateChange(ClrLoadingState.DEFAULT);
                break;
            default:
                break;
        }
        this.clrLoadingChange.emit(state$$1);
    }
    /**
     * @private
     * @return {?}
     */
    setExplicitButtonWidth() {
        if (this.el.nativeElement && this.el.nativeElement.getBoundingClientRect) {
            /** @type {?} */
            const boundingClientRect = this.el.nativeElement.getBoundingClientRect();
            this.renderer.setStyle(this.el.nativeElement, 'width', `${boundingClientRect.width}px`);
        }
    }
}
ClrLoadingButton.decorators = [
    { type: Component, args: [{
                selector: 'button[clrLoading]',
                template: `
        <ng-container [ngSwitch]="state">
            <span *ngSwitchCase="buttonState.LOADING">
                <span @spinner class="spinner spinner-inline"></span>
            </span>
            <span *ngSwitchCase="buttonState.SUCCESS">
                <span @validated (@validated.done)="this.loadingStateChange(this.buttonState.DEFAULT)" class="spinner spinner-inline spinner-check"></span>
            </span>
            <span *ngSwitchCase="buttonState.DEFAULT" @defaultButton>
                <ng-content></ng-content>
            </span>
        </ng-container>
    `,
                providers: [{ provide: LoadingListener, useExisting: ClrLoadingButton }],
                animations: [
                    trigger('defaultButton', [
                        transition(':enter', [style({ opacity: 0 }), animate('200ms 100ms ease-in', style({ opacity: 1 }))]),
                        // TODO: see if we can get leave animation to work before spinner's enter animation
                        transition(':leave', [style({ opacity: 0 })]),
                    ]),
                    trigger('spinner', [
                        transition(':enter', [style({ opacity: 0 }), animate('200ms 100ms ease-in', style({ opacity: 1 }))]),
                        transition(':leave', [style({ opacity: 1 }), animate('100ms ease-out', style({ opacity: 0 }))]),
                    ]),
                    trigger('validated', [
                        transition(':enter', [
                            animate('600ms', keyframes([
                                style({ transform: 'scale(0,0)', offset: 0 }),
                                style({ opacity: 1, offset: 0.2 }),
                                style({ transform: 'scale(1.2,1.2)', offset: 0.4 }),
                                style({ transform: 'scale(.9,.9)', offset: 0.6 }),
                                style({ transform: 'scale(1,1)', offset: 1 }),
                            ])),
                        ]),
                        transition(':leave', [style({ opacity: 1 }), animate('100ms ease-out', style({ opacity: 0 }))]),
                    ]),
                ],
                host: { '[attr.disabled]': "disabled? '' : null" }
            }] }
];
/** @nocollapse */
ClrLoadingButton.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
ClrLoadingButton.propDecorators = {
    disabled: [{ type: Input, args: ['disabled',] }],
    clrLoadingChange: [{ type: Output, args: ['clrLoadingChange',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const CLR_LOADING_BUTTON_DIRECTIVES = [ClrLoadingButton];
class ClrLoadingButtonModule {
}
ClrLoadingButtonModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: [CLR_LOADING_BUTTON_DIRECTIVES],
                exports: [CLR_LOADING_BUTTON_DIRECTIVES],
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrButtonModule {
}
ClrButtonModule.decorators = [
    { type: NgModule, args: [{
                exports: [ClrLoadingButtonModule, ClrButtonGroupModule],
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class EmptyAnchor {
}
EmptyAnchor.decorators = [
    { type: Component, args: [{
                template: ''
            }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Internal module, please do not export!
 */
class ClrHostWrappingModule {
}
ClrHostWrappingModule.decorators = [
    { type: NgModule, args: [{ declarations: [EmptyAnchor], exports: [EmptyAnchor], entryComponents: [EmptyAnchor] },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
let counter = 0;
class ControlIdService {
    constructor() {
        this._id = 'clr-form-control-' + ++counter;
        this._idChange = new BehaviorSubject(this._id);
    }
    /**
     * @return {?}
     */
    get id() {
        return this._id;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set id(value) {
        this._id = value;
        this._idChange.next(value);
    }
    /**
     * @return {?}
     */
    get idChange() {
        return this._idChange.asObservable();
    }
}
ControlIdService.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrControlError {
    /**
     * @param {?} controlIdService
     */
    constructor(controlIdService) {
        this.controlIdService = controlIdService;
        this.describedByAttr = null;
        this.subscriptions = [];
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.controlIdService && !this.describedByAttr) {
            this.subscriptions.push(this.controlIdService.idChange.subscribe((/**
             * @param {?} id
             * @return {?}
             */
            id => (this.describedByAttr = id))));
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        sub => sub.unsubscribe()));
    }
}
ClrControlError.decorators = [
    { type: Component, args: [{
                selector: 'clr-control-error',
                template: `
    <ng-content></ng-content>
    `,
                host: {
                    '[class.clr-subtext]': 'true',
                    '[attr.aria-live]': '"polite"',
                }
            }] }
];
/** @nocollapse */
ClrControlError.ctorParameters = () => [
    { type: ControlIdService, decorators: [{ type: Optional }] }
];
ClrControlError.propDecorators = {
    describedByAttr: [{ type: Input, args: ['aria-describedby',] }, { type: HostBinding, args: ['attr.aria-describedby',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrControlHelper {
}
ClrControlHelper.decorators = [
    { type: Component, args: [{
                selector: 'clr-control-helper',
                template: `
    <ng-content></ng-content>
    `,
                host: { '[class.clr-subtext]': 'true' }
            }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgControlService {
    constructor() {
        // Observable to subscribe to the control, since its not available immediately for projected content
        this._controlChanges = new Subject();
    }
    /**
     * @return {?}
     */
    get controlChanges() {
        return this._controlChanges.asObservable();
    }
    /**
     * @param {?} control
     * @return {?}
     */
    setControl(control) {
        this._controlChanges.next(control);
    }
}
NgControlService.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IfErrorService {
    /**
     * @param {?} ngControlService
     */
    constructor(ngControlService) {
        this.ngControlService = ngControlService;
        // Implement our own status changes observable, since Angular controls don't
        // fire on events like blur, and we want to return the boolean state instead of a string
        this._statusChanges = new Subject();
        this.subscriptions = [];
        // Wait for the control to be available
        this.subscriptions.push(this.ngControlService.controlChanges.subscribe((/**
         * @param {?} control
         * @return {?}
         */
        control => {
            if (control) {
                this.control = control;
                this.listenForChanges();
            }
        })));
    }
    /**
     * @return {?}
     */
    get statusChanges() {
        return this._statusChanges.asObservable();
    }
    // Subscribe to the status change events, only after touched and emit the control
    /**
     * @private
     * @return {?}
     */
    listenForChanges() {
        this.subscriptions.push(this.control.statusChanges.subscribe((/**
         * @return {?}
         */
        () => {
            this.sendValidity();
        })));
    }
    /**
     * @private
     * @return {?}
     */
    sendValidity() {
        if (this.control.touched && this.control.invalid) {
            this._statusChanges.next(true);
        }
        else {
            this._statusChanges.next(false);
        }
    }
    // Allows a control to push a status check upstream, such as on blur
    /**
     * @return {?}
     */
    triggerStatusChange() {
        if (this.control) {
            this.sendValidity();
        }
    }
    // Clean up subscriptions
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        sub => sub.unsubscribe()));
    }
}
IfErrorService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
IfErrorService.ctorParameters = () => [
    { type: NgControlService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrIfError {
    /**
     * @param {?} ifErrorService
     * @param {?} ngControlService
     * @param {?} template
     * @param {?} container
     */
    constructor(ifErrorService, ngControlService, template, container) {
        this.ifErrorService = ifErrorService;
        this.ngControlService = ngControlService;
        this.template = template;
        this.container = container;
        this.subscriptions = [];
        this.displayed = false;
        if (!this.ifErrorService) {
            throw new Error('clrIfError can only be used within a form control container element like clr-input-container');
        }
        else {
            this.displayError(false);
        }
        this.subscriptions.push(this.ngControlService.controlChanges.subscribe((/**
         * @param {?} control
         * @return {?}
         */
        control => {
            this.control = control;
        })));
        this.subscriptions.push(this.ifErrorService.statusChanges.subscribe((/**
         * @param {?} invalid
         * @return {?}
         */
        invalid => {
            // If there is a specific error to track, check it, otherwise check overall validity
            if (this.error && this.control) {
                this.displayError(this.control.hasError(this.error));
            }
            else {
                this.displayError(invalid);
            }
        })));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        sub => sub.unsubscribe()));
    }
    /**
     * @private
     * @param {?} invalid
     * @return {?}
     */
    displayError(invalid) {
        if (invalid && !this.displayed) {
            this.container.createEmbeddedView(this.template);
            this.displayed = true;
        }
        else if (!invalid) {
            this.container.clear();
            this.displayed = false;
        }
    }
}
ClrIfError.decorators = [
    { type: Directive, args: [{ selector: '[clrIfError]' },] }
];
/** @nocollapse */
ClrIfError.ctorParameters = () => [
    { type: IfErrorService, decorators: [{ type: Optional }] },
    { type: NgControlService, decorators: [{ type: Optional }] },
    { type: TemplateRef },
    { type: ViewContainerRef }
];
ClrIfError.propDecorators = {
    error: [{ type: Input, args: ['clrIfError',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
const Layouts = {
    VERTICAL: 'vertical',
    HORIZONTAL: 'horizontal',
    COMPACT: 'compact',
};
class LayoutService {
    constructor() {
        this.layout = Layouts.HORIZONTAL;
        // This is basically a replacement for Object.values(), which IE11 and Node <9 don't support :(
        // String enums cannot be reverse-mapped, meaning Layouts['COMPACT'] does not return 'compact' so
        // this exists to deal with this little caveat to get the list of the values as an array.
        this.layoutValues = Object.keys(Layouts).map((/**
         * @param {?} key
         * @return {?}
         */
        key => Layouts[key]));
    }
    /**
     * @return {?}
     */
    isVertical() {
        return this.layout === Layouts.VERTICAL;
    }
    /**
     * @return {?}
     */
    isHorizontal() {
        return this.layout === Layouts.HORIZONTAL;
    }
    /**
     * @return {?}
     */
    isCompact() {
        return this.layout === Layouts.COMPACT;
    }
    /**
     * @return {?}
     */
    get layoutClass() {
        return `clr-form-${this.layout}`;
    }
    /**
     * @param {?} layout
     * @return {?}
     */
    isValid(layout) {
        return this.layoutValues.indexOf(layout) > -1;
    }
}
LayoutService.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrLabel {
    /**
     * @param {?} controlIdService
     * @param {?} layoutService
     * @param {?} ngControlService
     * @param {?} renderer
     * @param {?} el
     */
    constructor(controlIdService, layoutService, ngControlService, renderer, el) {
        this.controlIdService = controlIdService;
        this.layoutService = layoutService;
        this.ngControlService = ngControlService;
        this.renderer = renderer;
        this.el = el;
        this.subscriptions = [];
        this.enableGrid = true;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // Only add the clr-control-label if it is inside a control container
        if (this.controlIdService || this.ngControlService) {
            this.renderer.addClass(this.el.nativeElement, 'clr-control-label');
        }
        // Only set the grid column classes if we are in the right context and if they aren't already set
        if (this.enableGrid &&
            this.layoutService &&
            !this.layoutService.isVertical() &&
            this.el.nativeElement &&
            this.el.nativeElement.className.indexOf('clr-col') < 0) {
            this.renderer.addClass(this.el.nativeElement, 'clr-col-12');
            this.renderer.addClass(this.el.nativeElement, 'clr-col-md-2');
        }
        if (this.controlIdService && !this.forAttr) {
            this.subscriptions.push(this.controlIdService.idChange.subscribe((/**
             * @param {?} id
             * @return {?}
             */
            id => (this.forAttr = id))));
        }
    }
    /**
     * @return {?}
     */
    disableGrid() {
        this.enableGrid = false;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        sub => sub.unsubscribe()));
    }
}
ClrLabel.decorators = [
    { type: Directive, args: [{ selector: 'label' },] }
];
/** @nocollapse */
ClrLabel.ctorParameters = () => [
    { type: ControlIdService, decorators: [{ type: Optional }] },
    { type: LayoutService, decorators: [{ type: Optional }] },
    { type: NgControlService, decorators: [{ type: Optional }] },
    { type: Renderer2 },
    { type: ElementRef }
];
ClrLabel.propDecorators = {
    forAttr: [{ type: HostBinding, args: ['attr.for',] }, { type: Input, args: ['for',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class MarkControlService {
    constructor() {
        this._touched = new Subject();
    }
    /**
     * @return {?}
     */
    get touchedChange() {
        return this._touched.asObservable();
    }
    /**
     * @return {?}
     */
    markAsTouched() {
        this._touched.next();
    }
}
MarkControlService.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrForm {
    /**
     * @param {?} layoutService
     * @param {?} markControlService
     */
    constructor(layoutService, markControlService) {
        this.layoutService = layoutService;
        this.markControlService = markControlService;
    }
    /**
     * @deprecated since 2.0
     * @return {?}
     */
    markAsDirty() {
        this.markAsTouched();
    }
    /**
     * @return {?}
     */
    markAsTouched() {
        this.markControlService.markAsTouched();
    }
}
ClrForm.decorators = [
    { type: Directive, args: [{
                selector: '[clrForm]',
                providers: [LayoutService, MarkControlService],
                host: {
                    '[class.clr-form]': 'true',
                    '[class.clr-form-horizontal]': 'layoutService.isHorizontal()',
                    '[class.clr-form-compact]': 'layoutService.isCompact()',
                },
            },] }
];
/** @nocollapse */
ClrForm.ctorParameters = () => [
    { type: LayoutService },
    { type: MarkControlService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrLayout {
    /**
     * @param {?} layoutService
     */
    constructor(layoutService) {
        this.layoutService = layoutService;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // Only set the layout if it is a valid option
        if (this.layout && this.layoutService.isValid(this.layout)) {
            this.layoutService.layout = this.layout;
        }
    }
}
ClrLayout.decorators = [
    { type: Directive, args: [{
                selector: '[clrForm][clrLayout]',
            },] }
];
/** @nocollapse */
ClrLayout.ctorParameters = () => [
    { type: LayoutService }
];
ClrLayout.propDecorators = {
    layout: [{ type: Input, args: ['clrLayout',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrCommonFormsModule {
}
ClrCommonFormsModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: [ClrLabel, ClrControlError, ClrControlHelper, ClrIfError, ClrForm, ClrLayout],
                exports: [ClrLabel, ClrControlError, ClrControlHelper, ClrIfError, ClrForm, ClrLayout],
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const IS_TOGGLE = new InjectionToken('IS_TOGGLE');
/**
 * @return {?}
 */
function isToggleFactory() {
    return new BehaviorSubject(false);
}
/** @type {?} */
const IS_TOGGLE_PROVIDER = { provide: IS_TOGGLE, useFactory: isToggleFactory };
class ClrCheckboxWrapper {
    /**
     * @param {?} toggleService
     */
    constructor(toggleService) {
        // We need both _dynamic for HostWrapper and ContentChild(ClrLabel) in cases where
        // the user puts a radio inside a wrapper without a label, host wrapping doesn't apply
        // but we'd still need to insert a label
        this._dynamic = false;
        this.toggle = false;
        this.subscriptions = [];
        this.subscriptions.push(toggleService.subscribe((/**
         * @param {?} state
         * @return {?}
         */
        state$$1 => {
            this.toggle = state$$1;
        })));
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.label) {
            this.label.disableGrid();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        sub => sub.unsubscribe()));
    }
}
ClrCheckboxWrapper.decorators = [
    { type: Component, args: [{
                selector: 'clr-checkbox-wrapper,clr-toggle-wrapper',
                template: `
    <ng-content select="[clrCheckbox],[clrToggle]"></ng-content>
    <ng-content select="label"></ng-content>
    <label *ngIf="!label"></label>
  `,
                host: {
                    '[class.clr-checkbox-wrapper]': '!toggle',
                    '[class.clr-toggle-wrapper]': 'toggle',
                },
                providers: [ControlIdService, IS_TOGGLE_PROVIDER]
            }] }
];
/** @nocollapse */
ClrCheckboxWrapper.ctorParameters = () => [
    { type: BehaviorSubject, decorators: [{ type: Inject, args: [IS_TOGGLE,] }] }
];
ClrCheckboxWrapper.propDecorators = {
    label: [{ type: ContentChild, args: [ClrLabel,] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * HostWrapper must be called in OnInit to ensure that the Views are ready. If its called in a constructor the view is
 * still undefined.
 * TODO - make sure these comment annotations do not break ng-packgr.
 * @template W
 */
class HostWrapper {
    /**
     * @param {?} containerType
     * @param {?} vcr
     * @param {?=} index
     */
    constructor(containerType, vcr, index = 0) {
        this.injector = vcr.injector;
        // If the host is already wrapped, we don't do anything
        if (!this.injector.get(containerType, null)) {
            /** @type {?} */
            const cfr = this.injector.get(ComponentFactoryResolver);
            /** @type {?} */
            const el = this.injector.get(ElementRef);
            // We need a new anchor, since we're projecting the current one.
            vcr.createComponent(cfr.resolveComponentFactory(EmptyAnchor));
            /** @type {?} */
            const factory = cfr.resolveComponentFactory(containerType);
            // Craft the element array based on what slot to use. Angular only uses the index to determine
            // which ng-content to project into, so if you have more than one ng-content you'll need to set
            // the index in the constructor appropriately
            /** @type {?} */
            const element = [];
            element[index] = [el.nativeElement];
            // We're assuming only one projection slot, but in more complex cases we might want to provide
            // a different array of projected elements.
            /** @type {?} */
            const containerRef = vcr.createComponent(factory, undefined, undefined, element);
            // We can now remove the useless anchor
            vcr.remove(0);
            // We note that the container was dynamically created
            containerRef.instance._dynamic = true;
            // We keep the wrapper's injector to access the dependencies that weren't available before.
            this.injector = containerRef.injector;
        }
    }
    /**
     * @template T
     * @param {?} token
     * @param {?=} notFoundValue
     * @return {?}
     */
    get(token, notFoundValue) {
        return this.injector.get(token, notFoundValue);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ControlClassService {
    constructor() {
        this.className = '';
    }
    /**
     * @param {?=} invalid
     * @param {?=} grid
     * @param {?=} additional
     * @return {?}
     */
    controlClass(invalid = false, grid = false, additional = '') {
        /** @type {?} */
        const controlClasses = [this.className, additional];
        if (invalid) {
            controlClasses.push('clr-error');
        }
        if (grid && this.className.indexOf('clr-col') === -1) {
            controlClasses.push('clr-col-md-10 clr-col-12');
        }
        return controlClasses.join(' ').trim();
    }
    // We want to remove the column classes from the input up to the container
    /**
     * @param {?} renderer
     * @param {?} element
     * @return {?}
     */
    initControlClass(renderer, element) {
        if (element && element.className) {
            this.className = element.className;
            /** @type {?} */
            const klasses = element.className.split(' ');
            klasses.forEach((/**
             * @param {?} klass
             * @return {?}
             */
            klass => {
                if (klass.startsWith('clr-col')) {
                    renderer.removeClass(element, klass);
                }
            }));
        }
    }
}
ControlClassService.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template W
 */
class WrappedFormControl {
    // I lost way too much time trying to make this work without injecting the ViewContainerRef and the Injector,
    // I'm giving up. So we have to inject these two manually for now.
    /**
     * @param {?} vcr
     * @param {?} wrapperType
     * @param {?} injector
     * @param {?} ngControl
     * @param {?} renderer
     * @param {?} el
     */
    constructor(vcr, wrapperType, injector, ngControl, renderer, el) {
        this.vcr = vcr;
        this.wrapperType = wrapperType;
        this.ngControl = ngControl;
        this.subscriptions = [];
        this.index = 0;
        try {
            this.ngControlService = injector.get(NgControlService);
            this.ifErrorService = injector.get(IfErrorService);
            this.controlClassService = injector.get(ControlClassService);
            this.markControlService = injector.get(MarkControlService);
        }
        catch (e) { }
        if (this.controlClassService) {
            this.controlClassService.initControlClass(renderer, el.nativeElement);
        }
        if (this.markControlService) {
            this.subscriptions.push(this.markControlService.touchedChange.subscribe((/**
             * @return {?}
             */
            () => {
                this.ngControl.control.markAsTouched();
                this.ngControl.control.updateValueAndValidity();
            })));
        }
    }
    /**
     * @return {?}
     */
    get id() {
        return this._id;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set id(value) {
        this._id = value;
        if (this.controlIdService) {
            this.controlIdService.id = value;
        }
    }
    /**
     * @return {?}
     */
    triggerValidation() {
        if (this.ifErrorService) {
            this.ifErrorService.triggerStatusChange();
        }
    }
    // @TODO This method has a try/catch due to an unknown issue that came when building the clrToggle feature
    // We need to figure out why this fails for the ClrToggle scenario but works for Date picker...
    // To see the error, remove the try/catch here and run the ClrToggle suite to see issues getting the container
    // injector in time, and this ONLY HAPPENS in tests and not in dev/prod mode.
    /**
     * @protected
     * @template T
     * @param {?} token
     * @param {?=} notFoundValue
     * @return {?}
     */
    getProviderFromContainer(token, notFoundValue) {
        try {
            return this._containerInjector.get(token, notFoundValue);
        }
        catch (e) {
            return notFoundValue;
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._containerInjector = new HostWrapper(this.wrapperType, this.vcr, this.index);
        this.controlIdService = this._containerInjector.get(ControlIdService);
        if (this._id) {
            this.controlIdService.id = this._id;
        }
        else {
            this._id = this.controlIdService.id;
        }
        if (this.ngControlService) {
            this.ngControlService.setControl(this.ngControl);
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        sub => sub.unsubscribe()));
    }
}
WrappedFormControl.propDecorators = {
    id: [{ type: HostBinding }, { type: Input }],
    triggerValidation: [{ type: HostListener, args: ['blur',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * This implements both the clrCheckbox and clrToggle functionality, since they are both just checkboxes with different
 * visual styling. The challenge is that the container needs to know which selector was used, which the \@Attribute
 * decorator gets for us to determine if the toggle is used, and emits a value to the wrapper container to tell it
 * there is a toggle switch instead.
 */
class ClrCheckbox extends WrappedFormControl {
    /**
     * @param {?} vcr
     * @param {?} injector
     * @param {?} control
     * @param {?} renderer
     * @param {?} el
     * @param {?} toggle
     */
    constructor(vcr, injector, control, renderer, el, toggle) {
        super(vcr, ClrCheckboxWrapper, injector, control, renderer, el);
        this.toggle = toggle;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        /** @type {?} */
        const toggleService = this.getProviderFromContainer(IS_TOGGLE, null);
        if (toggleService && this.toggle !== null) {
            toggleService.next(true);
        }
    }
}
ClrCheckbox.decorators = [
    { type: Directive, args: [{ selector: '[clrCheckbox],[clrToggle]' },] }
];
/** @nocollapse */
ClrCheckbox.ctorParameters = () => [
    { type: ViewContainerRef },
    { type: Injector },
    { type: NgControl, decorators: [{ type: Self }, { type: Optional }] },
    { type: Renderer2 },
    { type: ElementRef },
    { type: String, decorators: [{ type: Attribute, args: ['clrToggle',] }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrCheckboxContainer {
    // @TODO Solve for group validation, which doesn't work now with ngModelGroup
    // Blocked by https://github.com/angular/angular/issues/20268
    // @Input()
    // set clrFormGroup(value: FormGroup) {
    //   this.formGroup = value;
    // }
    // @Input()
    // set clrFormArray(value: FormArray) {
    //   this.formGroup = value;
    // }
    /**
     * @param {?} ifErrorService
     * @param {?} layoutService
     * @param {?} controlClassService
     * @param {?} ngControlService
     */
    constructor(ifErrorService, layoutService, controlClassService, ngControlService) {
        this.ifErrorService = ifErrorService;
        this.layoutService = layoutService;
        this.controlClassService = controlClassService;
        this.ngControlService = ngControlService;
        this.subscriptions = [];
        this.invalid = false;
        this.inline = false;
        this.subscriptions.push(this.ngControlService.controlChanges.subscribe((/**
         * @param {?} control
         * @return {?}
         */
        control => {
            this.control = control;
        })));
    }
    // private formGroup: AbstractControl;
    /*
       * Here we want to support the following cases
       * clrInline - true by presence
       * clrInline="true|false" - unless it is explicitly false, strings are considered true
       * [clrInline]="true|false" - expect a boolean
       */
    /**
     * @param {?} value
     * @return {?}
     */
    set clrInline(value) {
        if (typeof value === 'string') {
            this.inline = value === 'false' ? false : true;
        }
        else {
            this.inline = !!value;
        }
    }
    /**
     * @return {?}
     */
    get clrInline() {
        return this.inline;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // @TODO put a solution in for form group validation
        // if (!this.formGroup) {
        this.subscriptions.push(this.ifErrorService.statusChanges.subscribe((/**
         * @param {?} invalid
         * @return {?}
         */
        invalid => {
            this.invalid = invalid;
        })));
        // } else {
        //   // Because ngModel does this, we have to delay a tick to get the result
        //   Promise.resolve().then(() => {
        //     this.subscriptions.push(
        //       this.formGroup.statusChanges.subscribe(() => {
        //         this.invalid = this.formGroup.invalid;
        //       })
        //     );
        //   });
        // }
    }
    /**
     * @return {?}
     */
    controlClass() {
        return this.controlClassService.controlClass(this.invalid, this.addGrid(), this.inline ? 'clr-control-inline' : '');
    }
    /**
     * @return {?}
     */
    addGrid() {
        if (this.layoutService && !this.layoutService.isVertical()) {
            return true;
        }
        return false;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscriptions.map((/**
         * @param {?} sub
         * @return {?}
         */
        sub => sub.unsubscribe()));
    }
}
ClrCheckboxContainer.decorators = [
    { type: Component, args: [{
                selector: 'clr-checkbox-container,clr-toggle-container',
                template: `
    <ng-content select="label"></ng-content>
    <label *ngIf="!label && addGrid()"></label>
    <div class="clr-control-container" [class.clr-control-inline]="clrInline" [ngClass]="controlClass()">
      <ng-content select="clr-checkbox-wrapper,clr-toggle-wrapper"></ng-content>
      <div class="clr-subtext-wrapper">
        <ng-content select="clr-control-helper" *ngIf="!invalid"></ng-content>
        <clr-icon *ngIf="invalid" class="clr-validate-icon" shape="exclamation-circle" aria-hidden="true"></clr-icon>
        <ng-content select="clr-control-error" *ngIf="invalid"></ng-content>
      </div>
    </div>
  `,
                host: {
                    '[class.clr-form-control]': 'true',
                    '[class.clr-form-control-disabled]': 'control?.disabled',
                    '[class.clr-row]': 'addGrid()',
                },
                providers: [NgControlService, ControlClassService, IfErrorService]
            }] }
];
/** @nocollapse */
ClrCheckboxContainer.ctorParameters = () => [
    { type: IfErrorService },
    { type: LayoutService, decorators: [{ type: Optional }] },
    { type: ControlClassService },
    { type: NgControlService }
];
ClrCheckboxContainer.propDecorators = {
    label: [{ type: ContentChild, args: [ClrLabel,] }],
    clrInline: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrCheckboxModule {
}
ClrCheckboxModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, ClrIconModule, ClrCommonFormsModule, ClrHostWrappingModule],
                declarations: [ClrCheckbox, ClrCheckboxContainer, ClrCheckboxWrapper],
                exports: [ClrCommonFormsModule, ClrCheckbox, ClrCheckboxContainer, ClrCheckboxWrapper],
                entryComponents: [ClrCheckboxWrapper],
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
let activeCounter = 0;
/** @type {?} */
const IF_ACTIVE_ID = new InjectionToken('IF_ACTIVE_ID');
/**
 * @return {?}
 */
function tokenFactory() {
    return ++activeCounter;
}
/** @type {?} */
const IF_ACTIVE_ID_PROVIDER = {
    provide: IF_ACTIVE_ID,
    useFactory: tokenFactory,
};
/*********
 * @class IfActiveService
 *
 * @description
 * An injectable service used by IfActive structural directives and the components that implement IfActive in their
 * templates. It holds the value of the current state and provides an Observable that both the directive and the
 * implementing component can subscribe to in order to take action on current value changes.
 *
 */
class IfActiveService {
    constructor() {
        /**
         * *****
         * \@property _currentChange
         *
         * \@description
         * A RXJS Subject that updates and provides subscriptions to for the current current state of a component template
         * implemting the IfActive structural directive.
         *
         */
        this._currentChange = new Subject();
    }
    /**
     * ******
     *
     * \@description
     * A getter function that provides an observable for the _current Subject.
     *
     * @return {?}
     */
    get currentChange() {
        return this._currentChange.asObservable();
    }
    /**
     * ******
     *
     * \@description
     * A setter function that updates the current state of _current for this instance of IfActive structural directive.
     * And, broadcasts the new value to all subscribers.
     *
     * @param {?} value
     * @return {?}
     */
    set current(value) {
        if (this._current !== value) {
            this._current = value;
            this._currentChange.next(value);
        }
    }
    /**
     * ******
     *
     * \@description
     * A getter that returns the current value of this IfActive instance.
     * @return {?}
     */
    get current() {
        return this._current;
    }
}
IfActiveService.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**********
 *
 * @class ClrIfActive
 *
 * @description
 * A structural directive that controls whether or not the associated TemplateRef is instantiated or not.
 * It makes use of a Component instance level service: IfActiveService to maintain state between itself and
 * the component using it in the component template.
 *
 */
class ClrIfActive {
    /**
     * @param {?} ifActiveService
     * @param {?} id
     * @param {?} template
     * @param {?} container
     */
    constructor(ifActiveService, id, template, container) {
        this.ifActiveService = ifActiveService;
        this.id = id;
        this.template = template;
        this.container = container;
        this.wasActive = false;
        /**
         * *******
         * \@property activeChange
         *
         * \@description
         * An event emitter that emits when the active property is set to allow for 2way binding when the directive is
         * used with de-structured / de-sugared syntax.
         *
         */
        this.activeChange = new EventEmitter(false);
        this.checkAndUpdateView(ifActiveService.current);
        this.subscription = this.ifActiveService.currentChange.subscribe((/**
         * @param {?} newCurrentId
         * @return {?}
         */
        newCurrentId => {
            this.checkAndUpdateView(newCurrentId);
        }));
    }
    /**
     * @private
     * @param {?} currentId
     * @return {?}
     */
    checkAndUpdateView(currentId) {
        /** @type {?} */
        const isNowActive = currentId === this.id;
        // only emit if the new active state is changed since last time.
        if (isNowActive !== this.wasActive) {
            this.updateView(isNowActive);
            this.activeChange.emit(isNowActive);
            this.wasActive = isNowActive;
        }
    }
    /**
     * ******
     *
     * \@description
     * A setter that updates IfActiveService.active with value.
     *
     * @param {?} value
     * @return {?}
     */
    set active(value) {
        if (value) {
            this.ifActiveService.current = this.id;
        }
    }
    /**
     * *****
     *
     * \@description
     * A getter that returns the current IfActiveService.active value.
     * @return {?}
     */
    get active() {
        return this.ifActiveService.current === this.id;
    }
    /**
     * ******
     *
     * \@description
     * Function that takes a any value and either created an embedded view for the associated ViewContainerRef or,
     * Clears all views from the ViewContainerRef
     * @param {?} value
     * @return {?}
     */
    updateView(value) {
        if (value) {
            this.container.createEmbeddedView(this.template);
        }
        else {
            this.container.clear();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
ClrIfActive.decorators = [
    { type: Directive, args: [{ selector: '[clrIfActive]' },] }
];
/** @nocollapse */
ClrIfActive.ctorParameters = () => [
    { type: IfActiveService },
    { type: Number, decorators: [{ type: Inject, args: [IF_ACTIVE_ID,] }] },
    { type: TemplateRef },
    { type: ViewContainerRef }
];
ClrIfActive.propDecorators = {
    active: [{ type: Input, args: ['clrIfActive',] }],
    activeChange: [{ type: Output, args: ['clrIfActiveChange',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*********
 * @class IfOpenService
 *
 * @description
 * An injectable service used by IfOpen structural directives and the components that implemnt IfOpen in their
 * templates. It holds the value of the open state and provides an Observable that both the directive and the
 * implementing component can subscribe to in order to take action on open value changes.
 *
 */
class IfOpenService {
    constructor() {
        /**
         * *****
         * \@property _openChange
         *
         * \@description
         * A RXJS Subject that updates and provides subscriptions to for the current open state of a component template
         * implemting the IfOpen structural directive.
         */
        this._openChange = new Subject();
        /**
         *  Popovers might need to ignore click events on an element
         *  (eg: popover opens on focus on an input field. Clicks should be ignored in this case)
         */
        this._ignoredElementChange = new Subject();
    }
    /**
     * ******
     *
     * \@description
     * A getter function that provides an observable for the _opened Subject.
     *
     * @return {?}
     */
    get openChange() {
        return this._openChange.asObservable();
    }
    /**
     * ******
     *
     * \@description
     * A setter function that updates the current state of _open for this instance of IfOpen structural directive. And,
     * broadcasts the new value to all subscribers.
     *
     * @param {?} value
     * @return {?}
     */
    set open(value) {
        value = !!value;
        if (this._open !== value) {
            this._open = value;
            this._openChange.next(value);
        }
    }
    /**
     * ******
     *
     * \@description
     * A getter that returns the current value of this IfOpen instance.
     *
     * @return {?}
     */
    get open() {
        return this._open;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    toggleWithEvent(event) {
        this.originalEvent = event;
        this.open = !this.open;
        delete this.originalEvent;
    }
    /**
     * @return {?}
     */
    get ignoredElementChange() {
        return this._ignoredElementChange.asObservable();
    }
    /**
     * @param {?} element
     * @return {?}
     */
    registerIgnoredElement(element) {
        this._ignoredElementChange.next(element);
    }
}
IfOpenService.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**********
 *
 * @class ClrIfOpen
 *
 * @description
 * A structural directive that controls whether or not the associated TemplateRef is instantiated or not.
 * It makes use of a Component instance level service: IfOpenService to maintain state between itself and the component
 * using it in the component template.
 *
 */
class ClrIfOpen {
    /**
     * @param {?} ifOpenService
     * @param {?} template
     * @param {?} container
     */
    constructor(ifOpenService, template, container) {
        this.ifOpenService = ifOpenService;
        this.template = template;
        this.container = container;
        /**
         * *******
         * \@property openChange
         *
         * \@description
         * An event emitter that emits when the open property is set to allow for 2way binding when the directive is
         * used with de-structured / de-sugared syntax.
         */
        this.openChange = new EventEmitter(false);
        this.subscription = this.ifOpenService.openChange.subscribe((/**
         * @param {?} change
         * @return {?}
         */
        change => {
            this.updateView(change);
            this.openChange.emit(change);
        }));
    }
    /**
     * ******
     *
     * \@description
     * A setter that updates IfOpenService.open with value.
     *
     * @param {?} value
     * @return {?}
     */
    set open(value) {
        this.ifOpenService.open = value;
    }
    /**
     * *****
     *
     * \@description
     * A getter that returns the current IfOpenService.open value.
     *
     * @return {?}
     */
    get open() {
        return this.ifOpenService.open;
    }
    /**
     * ******
     *
     * \@description
     * Function that takes a boolean value and either created an embedded view for the associated ViewContainerRef or,
     * Clears all views from the ViewContainerRef
     * @param {?} value
     * @return {?}
     */
    updateView(value) {
        if (value) {
            this.container.createEmbeddedView(this.template);
        }
        else {
            this.container.clear();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
ClrIfOpen.decorators = [
    { type: Directive, args: [{ selector: '[clrIfOpen]' },] }
];
/** @nocollapse */
ClrIfOpen.ctorParameters = () => [
    { type: IfOpenService },
    { type: TemplateRef },
    { type: ViewContainerRef }
];
ClrIfOpen.propDecorators = {
    open: [{ type: Input, args: ['clrIfOpen',] }],
    openChange: [{ type: Output, args: ['clrIfOpenChange',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IfExpandService {
    constructor() {
        this.expandable = 0;
        this._loading = false;
        this._expanded = false;
        this._expandChange = new Subject();
    }
    /**
     * @return {?}
     */
    get loading() {
        return this._loading;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set loading(value) {
        value = !!value;
        if (value !== this._loading) {
            this._loading = value;
        }
    }
    /**
     * @return {?}
     */
    get expanded() {
        return this._expanded;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set expanded(value) {
        value = !!value;
        if (value !== this._expanded) {
            this._expanded = value;
            this._expandChange.next(value);
        }
    }
    /**
     * @return {?}
     */
    toggle() {
        this.expanded = !this._expanded;
    }
    /**
     * @return {?}
     */
    get expandChange() {
        return this._expandChange.asObservable();
    }
    /**
     * @param {?} state
     * @return {?}
     */
    loadingStateChange(state$$1) {
        switch (state$$1) {
            case ClrLoadingState.LOADING:
                this.loading = true;
                break;
            default:
                this.loading = false;
                break;
        }
    }
}
IfExpandService.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrIfExpanded {
    /**
     * @param {?} template
     * @param {?} container
     * @param {?} el
     * @param {?} renderer
     * @param {?} expand
     */
    constructor(template, container, el, renderer, expand) {
        this.template = template;
        this.container = container;
        this.el = el;
        this.renderer = renderer;
        this.expand = expand;
        this._expanded = false;
        this.expandedChange = new EventEmitter(true);
        /**
         * Subscriptions to all the services and queries changes
         */
        this._subscriptions = [];
        expand.expandable++;
        this._subscriptions.push(expand.expandChange.subscribe((/**
         * @return {?}
         */
        () => {
            this.updateView();
            this.expandedChange.emit(this.expand.expanded);
        })));
    }
    /**
     * @return {?}
     */
    get expanded() {
        return this._expanded;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set expanded(value) {
        if (typeof value === 'boolean') {
            this.expand.expanded = value;
            this._expanded = value;
        }
    }
    /**
     * @private
     * @return {?}
     */
    updateView() {
        if (this.expand.expanded && this.container.length !== 0) {
            return;
        }
        if (this.template) {
            if (this.expand.expanded) {
                // Should we pass a context? I don't see anything useful to pass right now,
                // but we can come back to it in the future as a solution for additional features.
                this.container.createEmbeddedView(this.template);
            }
            else {
                // TODO: Move when we move the animation logic to Datagrid Row Expand
                // We clear before the animation is over. Not ideal, but doing better would involve a much heavier
                // process for very little gain. Once Angular animations are dynamic enough, we should be able to
                // get the optimal behavior.
                this.container.clear();
            }
        }
        else {
            try {
                // If we don't have a template ref, we fallback to a crude display: none for now.
                if (this.expand.expanded) {
                    this.renderer.setStyle(this.el.nativeElement, 'display', null);
                }
                else {
                    this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
                }
            }
            catch (e) {
                // We catch the case where clrIfExpanded was put on a non-DOM element, and we just do nothing
            }
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.updateView();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.expand.expandable--;
        this._subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        (sub) => sub.unsubscribe()));
    }
}
ClrIfExpanded.decorators = [
    { type: Directive, args: [{ selector: '[clrIfExpanded]' },] }
];
/** @nocollapse */
ClrIfExpanded.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] },
    { type: ViewContainerRef },
    { type: ElementRef },
    { type: Renderer2 },
    { type: IfExpandService }
];
ClrIfExpanded.propDecorators = {
    expanded: [{ type: Input, args: ['clrIfExpanded',] }],
    expandedChange: [{ type: Output, args: ['clrIfExpandedChange',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const CONDITIONAL_DIRECTIVES = [ClrIfActive, ClrIfOpen, ClrIfExpanded];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrConditionalModule {
}
ClrConditionalModule.decorators = [
    { type: NgModule, args: [{ imports: [CommonModule], declarations: [CONDITIONAL_DIRECTIVES], exports: [CONDITIONAL_DIRECTIVES] },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FocusTrapTracker {
    constructor() {
        this._previousFocusTraps = [];
    }
    /**
     * @return {?}
     */
    get current() {
        return this._current;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set current(value) {
        this._previousFocusTraps.push(this._current);
        this._current = value;
    }
    /**
     * @return {?}
     */
    get nbFocusTrappers() {
        return this._previousFocusTraps.length;
    }
    /**
     * @return {?}
     */
    activatePreviousTrapper() {
        this._current = this._previousFocusTraps.pop();
    }
}
FocusTrapTracker.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */ FocusTrapTracker.ngInjectableDef = ɵɵdefineInjectable({ factory: function FocusTrapTracker_Factory() { return new FocusTrapTracker(); }, token: FocusTrapTracker, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FocusTrapDirective {
    /**
     * @param {?} el
     * @param {?} injector
     * @param {?} focusTrapsTracker
     * @param {?} renderer
     * @param {?} platformId
     */
    constructor(el, injector, focusTrapsTracker, renderer, platformId) {
        this.el = el;
        this.injector = injector;
        this.focusTrapsTracker = focusTrapsTracker;
        this.renderer = renderer;
        this.platformId = platformId;
        this.document = this.injector.get(DOCUMENT);
        this.focusTrapsTracker.current = this;
        this.renderer.setAttribute(this.el.nativeElement, 'tabindex', '0');
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onFocusIn(event) {
        /** @type {?} */
        const nativeElement = this.el.nativeElement;
        if (this.focusTrapsTracker.current === this && event.target && !nativeElement.contains(event.target)) {
            nativeElement.focus();
        }
    }
    /**
     * @private
     * @return {?}
     */
    createFocusableOffScreenEl() {
        // Not using Renderer2's createElement method because that leads to DOM leakage.
        // https://github.com/angular/angular/issues/26954
        /** @type {?} */
        const offScreenSpan = this.document.createElement('span');
        this.renderer.setAttribute(offScreenSpan, 'tabindex', '0');
        this.renderer.addClass(offScreenSpan, 'offscreen-focus-rebounder');
        return offScreenSpan;
    }
    /**
     * @private
     * @return {?}
     */
    addReboundEls() {
        // We will add these focus rebounding elements only in the following conditions:
        // 1. It should be running inside browser platform as it accesses document.body element
        // 2. We should NOT add them more than once. Hence, we are counting a number of focus trappers
        //    and only add on the first focus trapper.
        if (isPlatformBrowser(this.platformId) && this.focusTrapsTracker.nbFocusTrappers === 1) {
            this.topReboundEl = this.createFocusableOffScreenEl();
            this.bottomReboundEl = this.createFocusableOffScreenEl();
            // Add reboundBeforeTrapEl to the document body as the first child
            this.renderer.insertBefore(this.document.body, this.topReboundEl, this.document.body.firstChild);
            // Add reboundAfterTrapEl to the document body as the last child
            this.renderer.appendChild(this.document.body, this.bottomReboundEl);
        }
    }
    /**
     * @private
     * @return {?}
     */
    removeReboundEls() {
        if (isPlatformBrowser(this.platformId) &&
            this.focusTrapsTracker.nbFocusTrappers === 1 &&
            this.topReboundEl &&
            this.bottomReboundEl) {
            this.renderer.removeChild(this.document.body, this.topReboundEl);
            this.renderer.removeChild(this.document.body, this.bottomReboundEl);
            // These are here to to make sure that
            // we completely delete all traces of the removed DOM objects.
            delete this.topReboundEl;
            delete this.bottomReboundEl;
        }
    }
    /**
     * @return {?}
     */
    setPreviousFocus() {
        if (this.previousActiveElement && this.previousActiveElement.focus) {
            this.previousActiveElement.focus();
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.previousActiveElement = (/** @type {?} */ (this.document.activeElement));
        }
        this.addReboundEls();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.removeReboundEls();
        this.setPreviousFocus();
        this.focusTrapsTracker.activatePreviousTrapper();
    }
}
FocusTrapDirective.decorators = [
    { type: Directive, args: [{ selector: '[clrFocusTrap]' },] }
];
/** @nocollapse */
FocusTrapDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Injector },
    { type: FocusTrapTracker },
    { type: Renderer2 },
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
];
FocusTrapDirective.propDecorators = {
    onFocusIn: [{ type: HostListener, args: ['document:focusin', ['$event'],] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const FOCUS_TRAP_DIRECTIVES = [FocusTrapDirective];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrFocusTrapModule {
}
ClrFocusTrapModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: [FOCUS_TRAP_DIRECTIVES],
                exports: [FOCUS_TRAP_DIRECTIVES],
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/** @type {?} */
const UP_ARROW = 38;
/** @type {?} */
const DOWN_ARROW = 40;
/** @type {?} */
const RIGHT_ARROW = 39;
/** @type {?} */
const LEFT_ARROW = 37;
/** @type {?} */
const ESC = 27;

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * This is the en-001 short locale date format. Setting as default.
 * @type {?}
 */
const DEFAULT_LOCALE_FORMAT = 'dd/MM/y';
// https://en.wikipedia.org/wiki/Date_format_by_country
/** @type {?} */
const LITTLE_ENDIAN_REGEX = /d+.+m+.+y+/i;
/** @type {?} */
const MIDDLE_ENDIAN_REGEX = /m+.+d+.+y+/i;
// No need for BIG_ENDIAN_REGEX because anything that doesn't satisfy the above 2
// is automatically BIG_ENDIAN
/** @type {?} */
const DELIMITER_REGEX = /d+|m+|y+/i;
/** @type {?} */
const USER_INPUT_REGEX = /\d+/g;
/** @type {?} */
const MOBILE_USERAGENT_REGEX = /Mobi/i;
/** @type {?} */
const RTL_REGEX = /\u200f/g;
/** @type {?} */
const YEAR = 'YYYY';
/** @type {?} */
const MONTH = 'MM';
/** @type {?} */
const DATE = 'DD';
/** @type {?} */
const LITTLE_ENDIAN = {
    name: 'LITTLE_ENDIAN',
    format: [DATE, MONTH, YEAR],
};
/** @type {?} */
const MIDDLE_ENDIAN = {
    name: 'MIDDLE_ENDIAN',
    format: [MONTH, DATE, YEAR],
};
/** @type {?} */
const BIG_ENDIAN = {
    name: 'BIG_ENDIAN',
    format: [YEAR, MONTH, DATE],
};
/** @type {?} */
const NO_OF_DAYS_IN_A_WEEK = 7;
/** @type {?} */
const NO_OF_ROWS_IN_CALENDAR_VIEW = 6;
/** @type {?} */
const TOTAL_DAYS_IN_DAYS_VIEW = NO_OF_DAYS_IN_A_WEEK * NO_OF_ROWS_IN_CALENDAR_VIEW;

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * Returns the number of days in a month.
 * @param {?} year
 * @param {?} month
 * @return {?}
 */
function getNumberOfDaysInTheMonth(year, month) {
    // If we go to the next month, but use a day of 0, it returns the last day from the previous month
    return new Date(year, month + 1, 0).getDate();
}
/**
 * Returns the day for the corresponding date where 0 represents Sunday.
 * @param {?} year
 * @param {?} month
 * @param {?} date
 * @return {?}
 */
function getDay(year, month, date) {
    return new Date(year, month, date).getDay();
}
/**
 * Takes in a year and if it is a 2 digit year, returns the corresponding 4 digit year.
 * Window of 80 years before and 20 years after the present year.
 * Credit: https://github.com/globalizejs/globalize/blob/e1b31cd6a4f1cff75b185b68b7a32220aac5196f/src/date/parse.js
 * @param {?} year
 * @return {?}
 */
function parseToFourDigitYear(year) {
    if (year > 9999 || (year > 100 && year < 999) || year < 10) {
        return -1;
    }
    if (year > 999) {
        return year;
    }
    /** @type {?} */
    const currYear = new Date().getFullYear();
    /** @type {?} */
    const century = Math.floor(currYear / 100) * 100;
    /** @type {?} */
    let result = year + century;
    if (result > currYear + 20) {
        result = result - 100;
    }
    return result;
}
/**
 * @param {?} date1
 * @param {?} date2
 * @return {?}
 */
function datesAreEqual(date1, date2) {
    if (date1 instanceof Date && date2 instanceof Date) {
        return (date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate());
    }
    else {
        return false;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class DayViewModel {
    /**
     * @param {?} dayModel
     * @param {?=} isTodaysDate
     * @param {?=} isDisabled
     * @param {?=} isSelected
     * @param {?=} isFocusable
     */
    constructor(dayModel, isTodaysDate = false, isDisabled = false, isSelected = false, isFocusable = false) {
        this.dayModel = dayModel;
        this.isTodaysDate = isTodaysDate;
        this.isDisabled = isDisabled;
        this.isSelected = isSelected;
        this.isFocusable = isFocusable;
    }
    /**
     * Gets the tab index based on the isFocusable flag.
     * @return {?}
     */
    get tabIndex() {
        return this.isFocusable ? 0 : -1;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class CalendarModel {
    /**
     * @param {?} year
     * @param {?} month
     */
    constructor(year, month) {
        this.year = year;
        this.month = month;
        this.initializeDaysInCalendar();
    }
    /**
     * Populates the days array with the DayModels in the current Calendar.
     * @private
     * @return {?}
     */
    initializeDaysInCalendar() {
        /** @type {?} */
        const noOfDaysInCalendar = getNumberOfDaysInTheMonth(this.year, this.month);
        this.days = Array(noOfDaysInCalendar)
            .fill(null)
            .map((/**
         * @param {?} date
         * @param {?} index
         * @return {?}
         */
        (date, index) => {
            return new DayModel(this.year, this.month, index + 1);
        }));
    }
    /**
     * Checks if the calendar passed is equal to the current calendar.
     * @param {?} calendar
     * @return {?}
     */
    isEqual(calendar) {
        if (calendar) {
            return this.year === calendar.year && this.month === calendar.month;
        }
        return false;
    }
    /**
     * Checks if a DayModel is in the Calendar
     * @param {?} day
     * @return {?}
     */
    isDayInCalendar(day) {
        if (day) {
            return this.year === day.year && this.month === day.month;
        }
        return false;
    }
    /**
     * Returns CalendarModel of the previous month.
     * @return {?}
     */
    previousMonth() {
        if (this.month === 0) {
            return new CalendarModel(this.year - 1, 11);
        }
        else {
            return new CalendarModel(this.year, this.month - 1);
        }
    }
    /**
     * Returns CalendarModel of the next month.
     * @return {?}
     */
    nextMonth() {
        if (this.month === 11) {
            return new CalendarModel(this.year + 1, 0);
        }
        else {
            return new CalendarModel(this.year, this.month + 1);
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DayModel {
    /**
     * @param {?} year
     * @param {?} month
     * @param {?} date
     */
    constructor(year, month, date) {
        this.year = year;
        this.month = month;
        this.date = date;
    }
    /**
     * Returns the Calendar for the current DayModel.
     * @return {?}
     */
    get calendar() {
        return new CalendarModel(this.year, this.month);
    }
    /**
     * Checks if the passed CalendarDate is equal to itself.
     * @param {?} day
     * @return {?}
     */
    isEqual(day) {
        if (day) {
            return this.year === day.year && this.month === day.month && this.date === day.date;
        }
        return false;
    }
    /**
     * Converts the CalendarDate into the Javascript Date object.
     * @return {?}
     */
    toDate() {
        return new Date(this.year, this.month, this.date);
    }
    /**
     * Returns a new DayModel which is incremented based on the value passed.
     * @param {?} value
     * @return {?}
     */
    incrementBy(value) {
        // Creating new Javascript Date object to increment because
        // it will automatically take care of switching to next or previous
        // months & years without we having to worry about it.
        /** @type {?} */
        const date = new Date(this.year, this.month, this.date + value);
        return new DayModel(date.getFullYear(), date.getMonth(), date.getDate());
    }
    /**
     * Clones the current day model.
     * @return {?}
     */
    clone() {
        return new DayModel(this.year, this.month, this.date);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class CalendarViewModel {
    /**
     * @param {?} calendar
     * @param {?} selectedDay
     * @param {?} focusableDay
     * @param {?} today
     * @param {?} firstDayOfWeek
     */
    constructor(calendar, selectedDay, focusableDay, today, firstDayOfWeek) {
        this.calendar = calendar;
        this.selectedDay = selectedDay;
        this.focusableDay = focusableDay;
        this.today = today;
        this.firstDayOfWeek = firstDayOfWeek;
        this.currMonthDayViews = [];
        this.initializeCalendarView();
    }
    /**
     * DayViewModel matrix. Size 6x7
     * @return {?}
     */
    get calendarView() {
        return this._calendarView;
    }
    /**
     * Generates a 6x7 matrix of DayViewModel based on the Calendar.
     * The 6x7 matrix is structured according to the first day of the week.
     * 6 rows to accommodate months which might have dates spanning over 6 weeks.
     * 7 columns because there are 7 days in a week :P :D
     * @private
     * @return {?}
     */
    initializeCalendarView() {
        // Generate prev and next month calendar models.
        /** @type {?} */
        const prevMonthCalendar = this.calendar.previousMonth();
        /** @type {?} */
        const nextMonthCalendar = this.calendar.nextMonth();
        // Get no of days from prev and next months.
        /** @type {?} */
        const daysFromPrevMonthInCalView = this.numDaysFromPrevMonthInCalView(this.calendar.year, this.calendar.month);
        /** @type {?} */
        const daysFromNextMonthInCalView = TOTAL_DAYS_IN_DAYS_VIEW - (this.calendar.days.length + daysFromPrevMonthInCalView);
        // Generate prev, curr and next day view models
        /** @type {?} */
        let prevMonthDayViews = [];
        /** @type {?} */
        let nextMonthDayViews = [];
        if (daysFromPrevMonthInCalView > 0) {
            prevMonthDayViews = this.generateDayViewModels(prevMonthCalendar.days.slice(-1 * daysFromPrevMonthInCalView), true, false);
        }
        this.currMonthDayViews = this.generateDayViewModels(this.calendar.days, false, true);
        if (daysFromNextMonthInCalView > 0) {
            nextMonthDayViews = this.generateDayViewModels(nextMonthCalendar.days.slice(0, daysFromNextMonthInCalView), true, false);
        }
        // Generate calendar view and initialize flags
        this._calendarView = this.generateCalendarView(prevMonthDayViews, this.currMonthDayViews, nextMonthDayViews);
        this.initializeSelectedDay();
        this.initializeFocusableDay();
    }
    /**
     * Generates a DayViewModel array based on the DayModel passed
     * @private
     * @param {?} days
     * @param {?} isDisabled
     * @param {?} isCurrentCalendar
     * @return {?}
     */
    generateDayViewModels(days, isDisabled, isCurrentCalendar) {
        /** @type {?} */
        const dayViews = days.map((/**
         * @param {?} day
         * @return {?}
         */
        day => {
            return new DayViewModel(day, false, isDisabled, false, false);
        }));
        if (isCurrentCalendar && this.calendar.isDayInCalendar(this.today)) {
            dayViews[this.today.date - 1].isTodaysDate = true;
        }
        return dayViews;
    }
    /**
     * Gets the first day of the current month to figure out how many dates of previous month
     * are needed to complete the Calendar View based on the first day of the week.
     * eg: Assuming locale en-US, the first day of the week is Sunday,
     * if first day of the current month lands on Wednesday, then
     * (this.getDay function would return 3 since
     * first day of the week is 0), we need the 3 days from the previous month.
     * @private
     * @param {?} currentYear
     * @param {?} currentMonth
     * @return {?}
     */
    numDaysFromPrevMonthInCalView(currentYear, currentMonth) {
        /** @type {?} */
        const firstDayOfCurrMonth = getDay(currentYear, currentMonth, 1);
        if (firstDayOfCurrMonth >= this.firstDayOfWeek) {
            return firstDayOfCurrMonth - this.firstDayOfWeek;
        }
        else {
            return NO_OF_DAYS_IN_A_WEEK + firstDayOfCurrMonth - this.firstDayOfWeek;
        }
    }
    /**
     * Checks if the Day passed is in the CalendarView.
     * @private
     * @param {?} day
     * @return {?}
     */
    isDayInCalendarView(day) {
        if (!this.calendar.isDayInCalendar(day)) {
            return false;
        }
        return true;
    }
    /**
     * Using the DayViewModels from the previous, current and next month, this function
     * generates the CalendarView.
     * @private
     * @param {?} prev
     * @param {?} curr
     * @param {?} next
     * @return {?}
     */
    generateCalendarView(prev, curr, next) {
        /** @type {?} */
        const combinationArr = [...prev, ...curr, ...next];
        /** @type {?} */
        const calendarView = [];
        for (let i = 0; i < NO_OF_ROWS_IN_CALENDAR_VIEW; i++) {
            calendarView[i] = combinationArr.slice(i * NO_OF_DAYS_IN_A_WEEK, (i + 1) * NO_OF_DAYS_IN_A_WEEK);
        }
        return calendarView;
    }
    /**
     * Initialize the selected day if the day is in the calendar.
     * @private
     * @return {?}
     */
    initializeSelectedDay() {
        if (this.selectedDay && this.isDayInCalendarView(this.selectedDay)) {
            this.currMonthDayViews[this.selectedDay.date - 1].isSelected = true;
        }
    }
    /**
     * Initializes the focusable day if the day is in the calendar. If focusable day is not set, then
     * we check for the selected day. If selected day is not set then check if today is in the current
     * calendar. If not then just set the 15th of the current calendar month.
     * @private
     * @return {?}
     */
    initializeFocusableDay() {
        if (this.focusableDay && this.isDayInCalendarView(this.focusableDay)) {
            this.setFocusableFlag(this.focusableDay, true);
        }
        else if (this.selectedDay && this.isDayInCalendarView(this.selectedDay)) {
            this.setFocusableFlag(this.selectedDay, true);
            this.focusableDay = this.selectedDay.clone();
        }
        else if (this.isDayInCalendarView(this.today)) {
            this.setFocusableFlag(this.today, true);
            this.focusableDay = this.today.clone();
        }
        else {
            this.focusableDay = new DayModel(this.calendar.year, this.calendar.month, 15);
            this.setFocusableFlag(this.focusableDay, true);
        }
    }
    /**
     * @private
     * @param {?} day
     * @param {?} flag
     * @return {?}
     */
    setFocusableFlag(day, flag) {
        if (day) {
            this.currMonthDayViews[day.date - 1].isFocusable = flag;
        }
    }
    /**
     * Updates the focusable day in the calendar.
     * @param {?} day
     * @return {?}
     */
    updateFocusableDay(day) {
        this.setFocusableFlag(this.focusableDay, false);
        this.setFocusableFlag(day, true);
        this.focusableDay = day;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * This service is responsible for:
 * 1. Initializing the displayed calendar.
 * 2. Moving the calendar to the next, previous or current months
 * 3. Managing the focused and selected day models.
 */
class DateNavigationService {
    constructor() {
        /**
         * Variable to store today's date.
         */
        this._todaysFullDate = new Date();
        this._selectedDayChange = new Subject();
        this._displayedCalendarChange = new Subject();
        this._focusOnCalendarChange = new Subject();
        this._focusedDayChange = new Subject();
    }
    /**
     * @return {?}
     */
    get displayedCalendar() {
        return this._displayedCalendar;
    }
    // not a setter because i want this to remain private
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    setDisplayedCalendar(value) {
        if (!this._displayedCalendar.isEqual(value)) {
            this._displayedCalendar = value;
            this._displayedCalendarChange.next();
        }
    }
    /**
     * @private
     * @return {?}
     */
    initializeTodaysDate() {
        this._todaysFullDate = new Date();
        this._today = new DayModel(this._todaysFullDate.getFullYear(), this._todaysFullDate.getMonth(), this._todaysFullDate.getDate());
    }
    /**
     * @return {?}
     */
    get today() {
        return this._today;
    }
    /**
     * @return {?}
     */
    get selectedDayChange() {
        return this._selectedDayChange.asObservable();
    }
    /**
     * Notifies that the selected day has changed so that the date can be emitted to the user.
     * Note: Only to be called from day.ts
     * @param {?} dayModel
     * @return {?}
     */
    notifySelectedDayChanged(dayModel) {
        this.selectedDay = dayModel;
        this._selectedDayChange.next(dayModel);
    }
    /**
     * Initializes the calendar based on the selected day.
     * @return {?}
     */
    initializeCalendar() {
        this.focusedDay = null; // Can be removed later on the store focus
        this.initializeTodaysDate();
        if (this.selectedDay) {
            this._displayedCalendar = new CalendarModel(this.selectedDay.year, this.selectedDay.month);
        }
        else {
            this._displayedCalendar = new CalendarModel(this.today.year, this.today.month);
        }
    }
    /**
     * @param {?} month
     * @return {?}
     */
    changeMonth(month) {
        this.setDisplayedCalendar(new CalendarModel(this._displayedCalendar.year, month));
    }
    /**
     * @param {?} year
     * @return {?}
     */
    changeYear(year) {
        this.setDisplayedCalendar(new CalendarModel(year, this._displayedCalendar.month));
    }
    /**
     * Moves the displayed calendar to the next month.
     * @return {?}
     */
    moveToNextMonth() {
        this.setDisplayedCalendar(this._displayedCalendar.nextMonth());
    }
    /**
     * Moves the displayed calendar to the previous month.
     * @return {?}
     */
    moveToPreviousMonth() {
        this.setDisplayedCalendar(this._displayedCalendar.previousMonth());
    }
    /**
     * Moves the displayed calendar to the current month and year.
     * @return {?}
     */
    moveToCurrentMonth() {
        if (!this.displayedCalendar.isDayInCalendar(this.today)) {
            this.setDisplayedCalendar(new CalendarModel(this.today.year, this.today.month));
        }
        this._focusOnCalendarChange.next();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    incrementFocusDay(value) {
        this.focusedDay = this.focusedDay.incrementBy(value);
        if (this._displayedCalendar.isDayInCalendar(this.focusedDay)) {
            this._focusedDayChange.next(this.focusedDay);
        }
        else {
            this.setDisplayedCalendar(this.focusedDay.calendar);
        }
        this._focusOnCalendarChange.next();
    }
    /**
     * This observable lets the subscriber know that the displayed calendar has changed.
     * @return {?}
     */
    get displayedCalendarChange() {
        return this._displayedCalendarChange.asObservable();
    }
    /**
     * This observable lets the subscriber know that the focus should be applied on the calendar.
     * @return {?}
     */
    get focusOnCalendarChange() {
        return this._focusOnCalendarChange.asObservable();
    }
    /**
     * This observable lets the subscriber know that the focused day in the displayed calendar has changed.
     * @return {?}
     */
    get focusedDayChange() {
        return this._focusedDayChange.asObservable();
    }
}
DateNavigationService.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * This service focuses the day that is focusable in the calendar.
 */
class DatepickerFocusService {
    /**
     * @param {?} _ngZone
     * @param {?} platformId
     */
    constructor(_ngZone, platformId) {
        this._ngZone = _ngZone;
        this.platformId = platformId;
    }
    /**
     * @param {?} elRef
     * @return {?}
     */
    focusCell(elRef) {
        this._ngZone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            this.ngZoneIsStableInBrowser().subscribe((/**
             * @return {?}
             */
            () => {
                /** @type {?} */
                const focusEl = elRef.nativeElement.querySelector('[tabindex="0"]');
                if (focusEl) {
                    focusEl.focus();
                }
            }));
        }));
    }
    /**
     * @param {?} element
     * @return {?}
     */
    focusInput(element) {
        this._ngZone.runOutsideAngular((/**
         * @return {?}
         */
        () => this.ngZoneIsStableInBrowser().subscribe((/**
         * @return {?}
         */
        () => element.focus()))));
    }
    /**
     * @param {?} element
     * @return {?}
     */
    elementIsFocused(element) {
        return isPlatformBrowser(this.platformId) && document.activeElement === element;
    }
    /**
     * @private
     * @return {?}
     */
    ngZoneIsStableInBrowser() {
        // Credit: Material: https://github.com/angular/material2/blob/master/src/lib/datepicker/calendar.ts
        return this._ngZone.onStable.asObservable().pipe(first(), filter((/**
         * @return {?}
         */
        () => isPlatformBrowser(this.platformId))));
    }
}
DatepickerFocusService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
DatepickerFocusService.ctorParameters = () => [
    { type: NgZone },
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * This service extracts the Angular CLDR data needed by the datepicker.
 */
class LocaleHelperService {
    /**
     * @param {?} locale
     */
    constructor(locale) {
        this.locale = locale;
        this._firstDayOfWeek = 0;
        this.initializeLocaleData();
    }
    /**
     * @return {?}
     */
    get firstDayOfWeek() {
        return this._firstDayOfWeek;
    }
    /**
     * @return {?}
     */
    get localeDaysNarrow() {
        return this._localeDaysNarrow;
    }
    /**
     * @return {?}
     */
    get localeMonthsAbbreviated() {
        return this._localeMonthsAbbreviated;
    }
    /**
     * @return {?}
     */
    get localeMonthsWide() {
        return this._localeMonthsWide;
    }
    /**
     * @return {?}
     */
    get localeDateFormat() {
        return this._localeDateFormat;
    }
    /**
     * Initializes the locale data.
     * @private
     * @return {?}
     */
    initializeLocaleData() {
        // Order in which these functions is called is very important.
        this.initializeFirstDayOfWeek();
        this.initializeLocaleDateFormat();
        this.initializeLocaleMonthsAbbreviated();
        this.initializeLocaleMonthsWide();
        this.initializeLocaleDaysNarrow();
    }
    /**
     * Initialize day names in the TranslationWidth.Narrow format based on the locale.
     * eg: [S, M, T...] for en-US.
     * @private
     * @return {?}
     */
    initializeLocaleDaysNarrow() {
        // Get locale day names starting with Sunday
        /** @type {?} */
        const tempArr = getLocaleDayNames(this.locale, FormStyle.Standalone, TranslationWidth.Narrow).slice();
        // Get first day of the week based on the locale
        /** @type {?} */
        const firstDayOfWeek = this.firstDayOfWeek;
        // Rearrange the tempArr to start with the first day of the week based on the locale.
        if (firstDayOfWeek > 0) {
            /** @type {?} */
            const prevDays = tempArr.splice(0, firstDayOfWeek);
            tempArr.push(...prevDays);
        }
        this._localeDaysNarrow = tempArr;
    }
    /**
     * Initializes the array of month names in the TranslationWidth.Abbreviated format.
     * e.g. `[Jan, Feb, ...]` for en-US
     * @private
     * @return {?}
     */
    initializeLocaleMonthsAbbreviated() {
        this._localeMonthsAbbreviated = getLocaleMonthNames(this.locale, FormStyle.Standalone, TranslationWidth.Abbreviated).slice();
    }
    /**
     * Initializes the array of month names in the TranslationWidth.Wide format.
     * e.g. `[January, February, ...]` for en-US
     * @private
     * @return {?}
     */
    initializeLocaleMonthsWide() {
        this._localeMonthsWide = getLocaleMonthNames(this.locale, FormStyle.Standalone, TranslationWidth.Wide).slice();
    }
    /**
     * Initializes the first day of the week based on the locale.
     * @private
     * @return {?}
     */
    initializeFirstDayOfWeek() {
        this._firstDayOfWeek = getLocaleFirstDayOfWeek(this.locale);
    }
    /**
     * @private
     * @return {?}
     */
    initializeLocaleDateFormat() {
        this._localeDateFormat = getLocaleDateFormat(this.locale, FormatWidth.Short);
    }
}
LocaleHelperService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
LocaleHelperService.ctorParameters = () => [
    { type: String, decorators: [{ type: Inject, args: [LOCALE_ID,] }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrCalendar {
    /**
     * @param {?} _localeHelperService
     * @param {?} _dateNavigationService
     * @param {?} _datepickerFocusService
     * @param {?} _elRef
     */
    constructor(_localeHelperService, _dateNavigationService, _datepickerFocusService, _elRef) {
        this._localeHelperService = _localeHelperService;
        this._dateNavigationService = _dateNavigationService;
        this._datepickerFocusService = _datepickerFocusService;
        this._elRef = _elRef;
        this._subs = [];
        this.generateCalendarView();
        this.initializeSubscriptions();
    }
    /**
     * Gets the locale days according to the TranslationWidth.Narrow format.
     * @return {?}
     */
    get localeDaysNarrow() {
        return this._localeHelperService.localeDaysNarrow;
    }
    /**
     * @return {?}
     */
    get calendar() {
        return this._dateNavigationService.displayedCalendar;
    }
    /**
     * @return {?}
     */
    get selectedDay() {
        return this._dateNavigationService.selectedDay;
    }
    /**
     * @return {?}
     */
    get focusedDay() {
        return this._dateNavigationService.focusedDay;
    }
    /**
     * @return {?}
     */
    get today() {
        return this._dateNavigationService.today;
    }
    /**
     * Initialize subscriptions to:
     * 1. update the calendar view model.
     * 2. update the focusable day in the calendar view model.
     * 3. focus on the focusable day in the calendar.
     * @private
     * @return {?}
     */
    initializeSubscriptions() {
        this._subs.push(this._dateNavigationService.displayedCalendarChange.subscribe((/**
         * @return {?}
         */
        () => {
            this.generateCalendarView();
        })));
        this._subs.push(this._dateNavigationService.focusedDayChange.subscribe((/**
         * @param {?} focusedDay
         * @return {?}
         */
        (focusedDay) => {
            this.calendarViewModel.updateFocusableDay(focusedDay);
        })));
        this._subs.push(this._dateNavigationService.focusOnCalendarChange.subscribe((/**
         * @return {?}
         */
        () => {
            this._datepickerFocusService.focusCell(this._elRef);
        })));
    }
    /**
     * Generates the Calendar View based on the calendar retrieved from the DateNavigationService.
     * @private
     * @return {?}
     */
    generateCalendarView() {
        this.calendarViewModel = new CalendarViewModel(this.calendar, this.selectedDay, this.focusedDay, this.today, this._localeHelperService.firstDayOfWeek);
    }
    /**
     * Delegates Keyboard arrow navigation to the DateNavigationService.
     * @param {?} event
     * @return {?}
     */
    onKeyDown(event) {
        if (event && this.focusedDay) {
            switch (event.keyCode) {
                case UP_ARROW:
                    event.preventDefault();
                    this._dateNavigationService.incrementFocusDay(-1 * NO_OF_DAYS_IN_A_WEEK);
                    break;
                case DOWN_ARROW:
                    event.preventDefault();
                    this._dateNavigationService.incrementFocusDay(NO_OF_DAYS_IN_A_WEEK);
                    break;
                case LEFT_ARROW:
                    event.preventDefault();
                    this._dateNavigationService.incrementFocusDay(-1);
                    break;
                case RIGHT_ARROW:
                    event.preventDefault();
                    this._dateNavigationService.incrementFocusDay(1);
                    break;
                default:
                    break; // No default case. TSLint x-(
            }
        }
    }
    /**
     * Focuses on the focusable day when the Calendar View is initialized.
     * @return {?}
     */
    ngAfterViewInit() {
        this._datepickerFocusService.focusCell(this._elRef);
    }
    /**
     * Unsubscribe from subscriptions.
     * @return {?}
     */
    ngOnDestroy() {
        this._subs.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        (sub) => sub.unsubscribe()));
    }
}
ClrCalendar.decorators = [
    { type: Component, args: [{ selector: 'clr-calendar', template: "<table class=\"calendar-table weekdays\">\n    <tr class=\"calendar-row\">\n        <td *ngFor=\"let day of localeDaysNarrow\" class=\"calendar-cell weekday\">\n            {{day}}\n        </td>\n    </tr>\n</table>\n<table\n    class=\"calendar-table calendar-dates\">\n    <tr class=\"calendar-row\" *ngFor=\"let row of calendarViewModel.calendarView\">\n        <td *ngFor=\"let dayView of row\" class=\"calendar-cell\">\n            <clr-day [clrDayView]=\"dayView\"></clr-day>\n        </td>\n    </tr>\n</table>\n" }] }
];
/** @nocollapse */
ClrCalendar.ctorParameters = () => [
    { type: LocaleHelperService },
    { type: DateNavigationService },
    { type: DatepickerFocusService },
    { type: ElementRef }
];
ClrCalendar.propDecorators = {
    onKeyDown: [{ type: HostListener, args: ['keydown', ['$event'],] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FocusService {
    constructor() {
        this._focused = new BehaviorSubject(false);
    }
    /**
     * @return {?}
     */
    get focusChange() {
        return this._focused.asObservable();
    }
    /**
     * @param {?} state
     * @return {?}
     */
    set focused(state$$1) {
        this._focused.next(state$$1);
    }
}
FocusService.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DateFormControlService {
    constructor() {
        this._touchedChange = new Subject();
        this._dirtyChange = new Subject();
    }
    /**
     * @return {?}
     */
    get touchedChange() {
        return this._touchedChange.asObservable();
    }
    /**
     * @return {?}
     */
    get dirtyChange() {
        return this._dirtyChange.asObservable();
    }
    /**
     * @return {?}
     */
    markAsTouched() {
        this._touchedChange.next();
    }
    /**
     * @return {?}
     */
    markAsDirty() {
        this._dirtyChange.next();
    }
}
DateFormControlService.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DateIOService {
    /**
     * @param {?} _localeHelperService
     */
    constructor(_localeHelperService) {
        this._localeHelperService = _localeHelperService;
        this.cldrLocaleDateFormat = DEFAULT_LOCALE_FORMAT;
        this.localeDisplayFormat = LITTLE_ENDIAN;
        this.delimiters = ['/', '/'];
        this.cldrLocaleDateFormat = this._localeHelperService.localeDateFormat;
        this.initializeLocaleDisplayFormat();
    }
    /**
     * @private
     * @return {?}
     */
    initializeLocaleDisplayFormat() {
        /** @type {?} */
        const format = this.cldrLocaleDateFormat.toLocaleLowerCase();
        if (LITTLE_ENDIAN_REGEX.test(format)) {
            this.localeDisplayFormat = LITTLE_ENDIAN;
        }
        else if (MIDDLE_ENDIAN_REGEX.test(format)) {
            this.localeDisplayFormat = MIDDLE_ENDIAN;
        }
        else {
            // everything else is set to BIG-ENDIAN FORMAT
            this.localeDisplayFormat = BIG_ENDIAN;
        }
        this.extractDelimiters();
    }
    /**
     * @private
     * @return {?}
     */
    extractDelimiters() {
        if (this.cldrLocaleDateFormat) {
            // Sanitize Date Format. Remove RTL characters.
            // FIXME: When we support RTL, remove this and handle it correctly.
            /** @type {?} */
            const localeFormat = this.cldrLocaleDateFormat.replace(RTL_REGEX, '');
            /** @type {?} */
            const delimiters = localeFormat.split(DELIMITER_REGEX);
            // NOTE: The split from the CLDR date format should always result
            // in an arary with 4 elements. The 1st and the 2nd values are the delimiters
            // we will use in order.
            // Eg: "dd/MM/y".split(/d+|m+|y+/i) results in ["", "/", "/", ""]
            if (delimiters && delimiters.length === 4) {
                this.delimiters = [delimiters[1], delimiters[2]];
            }
            else {
                console.error('Unexpected date format received. Delimiters extracted: ', delimiters);
            }
        }
    }
    /**
     * @param {?} date
     * @return {?}
     */
    toLocaleDisplayFormatString(date) {
        if (date) {
            if (isNaN(date.getTime())) {
                return '';
            }
            /** @type {?} */
            const dateNo = date.getDate();
            /** @type {?} */
            const monthNo = date.getMonth() + 1;
            /** @type {?} */
            const dateStr = dateNo > 9 ? dateNo.toString() : '0' + dateNo;
            /** @type {?} */
            const monthStr = monthNo > 9 ? monthNo.toString() : '0' + monthNo;
            if (this.localeDisplayFormat === LITTLE_ENDIAN) {
                return dateStr + this.delimiters[0] + monthStr + this.delimiters[1] + date.getFullYear();
            }
            else if (this.localeDisplayFormat === MIDDLE_ENDIAN) {
                return monthStr + this.delimiters[0] + dateStr + this.delimiters[1] + date.getFullYear();
            }
            else {
                return date.getFullYear() + this.delimiters[0] + monthStr + this.delimiters[1] + dateStr;
            }
        }
        return '';
    }
    /**
     * @return {?}
     */
    get placeholderText() {
        /** @type {?} */
        const format = this.localeDisplayFormat.format;
        return format[0] + this.delimiters[0] + format[1] + this.delimiters[1] + format[2];
    }
    /**
     * Checks if the month entered by the user is valid or not.
     * Note: Month is 0 based.
     * @private
     * @param {?} month
     * @return {?}
     */
    isValidMonth(month) {
        return month > -1 && month < 12;
    }
    /**
     * Checks if the date is valid depending on the year and month provided.
     * @private
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @return {?}
     */
    isValidDate(year, month, date) {
        return date > 0 && date <= getNumberOfDaysInTheMonth(year, month);
    }
    /**
     * Validates the parameters provided and returns the date.
     * If the parameters are not
     * valid then return null.
     * NOTE: (Month here is 1 based since the user has provided that as an input)
     * @private
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @return {?}
     */
    validateAndGetDate(year, month, date) {
        // I don't know whats wrong with the TS compiler. It throws an error if I write
        // the below if statement. The error is:
        // Operator '!==' cannot be applied to types '2' and '4'
        // More info here: https://github.com/Microsoft/TypeScript/issues/12794#issuecomment-270342936
        /*
            if (year.length !== 2 || year.length !== 4) {
                return null;
            }
            */
        // I don't know whats wrong with the TS compiler. It throws an error if I write
        // the below if statement. The error is:
        // Operator '!==' cannot be applied to types '2' and '4'
        // More info here: https://github.com/Microsoft/TypeScript/issues/12794#issuecomment-270342936
        /*
                if (year.length !== 2 || year.length !== 4) {
                    return null;
                }
                */
        // Instead I have to write the logic like this x-(
        /** @type {?} */
        const y = +year;
        /** @type {?} */
        const m = +month - 1;
        // month is 0 based
        /** @type {?} */
        const d = +date;
        if (!this.isValidMonth(m) || !this.isValidDate(y, m, d)) {
            return null;
        }
        /** @type {?} */
        const result = parseToFourDigitYear(y);
        return result !== -1 ? new Date(result, m, d) : null;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getDateValueFromDateString(date) {
        if (!date) {
            return null;
        }
        /** @type {?} */
        const dateParts = date.match(USER_INPUT_REGEX);
        if (!dateParts || dateParts.length !== 3) {
            return null;
        }
        const [firstPart, secondPart, thirdPart] = dateParts;
        if (this.localeDisplayFormat === LITTLE_ENDIAN) {
            // secondPart is month && firstPart is date
            return this.validateAndGetDate(thirdPart, secondPart, firstPart);
        }
        else if (this.localeDisplayFormat === MIDDLE_ENDIAN) {
            // firstPart is month && secondPart is date
            return this.validateAndGetDate(thirdPart, firstPart, secondPart);
        }
        else {
            // secondPart is month && thirdPart is date
            return this.validateAndGetDate(firstPart, secondPart, thirdPart);
        }
    }
}
DateIOService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
DateIOService.ctorParameters = () => [
    { type: LocaleHelperService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
// iPad mini screen width
// http://stephen.io/mediaqueries/#iPadMini
/** @type {?} */
const DATEPICKER_ENABLE_BREAKPOINT = 768;

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DatepickerEnabledService {
    /**
     * @param {?} _document
     */
    constructor(_document) {
        this._document = _document;
        this._isUserAgentMobile = false;
        if (this._document) {
            this._isUserAgentMobile = MOBILE_USERAGENT_REGEX.test(_document.defaultView.navigator.userAgent);
            this._innerWidth = _document.defaultView.innerWidth;
        }
    }
    /**
     * Returns if the calendar should be active or not.
     * If the user agent is mobile and the screen width is less than DATEPICKER_ACTIVE_BREAKPOINT
     * then the calendar is inactive.
     * @return {?}
     */
    get isEnabled() {
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent
        // What they recommend is:
        //"In summary, we recommend looking for the string 'Mobi'
        // anywhere in the User Agent to detect a mobile device."
        if (this._document) {
            if (this._innerWidth < DATEPICKER_ENABLE_BREAKPOINT && this._isUserAgentMobile) {
                return false;
            }
        }
        return true;
    }
}
DatepickerEnabledService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
DatepickerEnabledService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrDateContainer {
    /**
     * @param {?} _ifOpenService
     * @param {?} _dateNavigationService
     * @param {?} _datepickerEnabledService
     * @param {?} dateFormControlService
     * @param {?} commonStrings
     * @param {?} ifErrorService
     * @param {?} focusService
     * @param {?} controlClassService
     * @param {?} layoutService
     * @param {?} ngControlService
     */
    constructor(_ifOpenService, _dateNavigationService, _datepickerEnabledService, dateFormControlService, commonStrings, ifErrorService, focusService, controlClassService, layoutService, ngControlService) {
        this._ifOpenService = _ifOpenService;
        this._dateNavigationService = _dateNavigationService;
        this._datepickerEnabledService = _datepickerEnabledService;
        this.dateFormControlService = dateFormControlService;
        this.commonStrings = commonStrings;
        this.ifErrorService = ifErrorService;
        this.focusService = focusService;
        this.controlClassService = controlClassService;
        this.layoutService = layoutService;
        this.ngControlService = ngControlService;
        this._dynamic = false;
        this.invalid = false;
        this.focus = false;
        this.subscriptions = [];
        this.subscriptions.push(this._ifOpenService.openChange.subscribe((/**
         * @param {?} open
         * @return {?}
         */
        open => {
            if (open) {
                this.initializeCalendar();
            }
        })));
        this.subscriptions.push(this.focusService.focusChange.subscribe((/**
         * @param {?} state
         * @return {?}
         */
        state$$1 => {
            this.focus = state$$1;
        })));
        this.subscriptions.push(this.ngControlService.controlChanges.subscribe((/**
         * @param {?} control
         * @return {?}
         */
        control => {
            this.control = control;
        })));
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.subscriptions.push(this.ifErrorService.statusChanges.subscribe((/**
         * @param {?} invalid
         * @return {?}
         */
        invalid => {
            this.invalid = invalid;
        })));
    }
    /**
     * Returns the classes to apply to the control
     * @return {?}
     */
    controlClass() {
        return this.controlClassService.controlClass(this.invalid, this.addGrid());
    }
    /**
     * Determines if the control needs to add grid classes
     * @return {?}
     */
    addGrid() {
        if (this.layoutService && !this.layoutService.isVertical()) {
            return true;
        }
        return false;
    }
    /**
     * Returns if the Datepicker is enabled or not. If disabled, hides the datepicker trigger.
     * @return {?}
     */
    get isEnabled() {
        return this._datepickerEnabledService.isEnabled;
    }
    /**
     * Processes the user input and Initializes the Calendar everytime the datepicker popover is open.
     * @private
     * @return {?}
     */
    initializeCalendar() {
        this._dateNavigationService.initializeCalendar();
    }
    /**
     * Toggles the Datepicker Popover.
     * @param {?} event
     * @return {?}
     */
    toggleDatepicker(event) {
        this._ifOpenService.toggleWithEvent(event);
        this.dateFormControlService.markAsTouched();
    }
    /**
     * Unsubscribe from subscriptions.
     * @return {?}
     */
    ngOnDestroy() {
        this.subscriptions.map((/**
         * @param {?} sub
         * @return {?}
         */
        sub => sub.unsubscribe()));
    }
}
ClrDateContainer.decorators = [
    { type: Component, args: [{
                selector: 'clr-date-container',
                template: `
      <ng-content select="label"></ng-content>
      <label *ngIf="!label && addGrid()"></label>
      <div class="clr-control-container" [ngClass]="controlClass()">
        <div class="clr-input-wrapper">
          <div class="clr-input-group" [class.clr-focus]="focus">
            <ng-content select="[clrDate]"></ng-content>
            <button type="button" class="clr-input-group-icon-action" (click)="toggleDatepicker($event)" *ngIf="isEnabled" [attr.title]="commonStrings.open" [disabled]="control?.disabled">
              <clr-icon shape="calendar"></clr-icon>
            </button>
            <clr-datepicker-view-manager *clrIfOpen clrFocusTrap></clr-datepicker-view-manager>
          </div>
          <clr-icon class="clr-validate-icon" shape="exclamation-circle"></clr-icon>
        </div>
        <ng-content select="clr-control-helper" *ngIf="!invalid"></ng-content>
        <ng-content select="clr-control-error" *ngIf="invalid"></ng-content>
      </div>
    `,
                providers: [
                    ControlIdService,
                    IfOpenService,
                    LocaleHelperService,
                    IfErrorService,
                    ControlClassService,
                    FocusService,
                    NgControlService,
                    DateIOService,
                    DateNavigationService,
                    DatepickerEnabledService,
                    DateFormControlService,
                ],
                host: {
                    '[class.clr-form-control-disabled]': 'control?.disabled',
                    '[class.clr-form-control]': 'true',
                    '[class.clr-row]': 'addGrid()',
                }
            }] }
];
/** @nocollapse */
ClrDateContainer.ctorParameters = () => [
    { type: IfOpenService },
    { type: DateNavigationService },
    { type: DatepickerEnabledService },
    { type: DateFormControlService },
    { type: ClrCommonStrings },
    { type: IfErrorService },
    { type: FocusService },
    { type: ControlClassService },
    { type: LayoutService, decorators: [{ type: Optional }] },
    { type: NgControlService }
];
ClrDateContainer.propDecorators = {
    label: [{ type: ContentChild, args: [ClrLabel,] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// There are four ways the datepicker value is set
// 1. Value set by user typing into text input as a string ex: '01/28/2015'
// 2. Value set explicitly by Angular Forms APIs as a string ex: '01/28/2015'
// 3. Value set by user via datepicker UI as a Date Object
// 4. Value set via `clrDate` input as a Date Object
class ClrDateInput extends WrappedFormControl {
    /**
     * @param {?} viewContainerRef
     * @param {?} injector
     * @param {?} el
     * @param {?} renderer
     * @param {?} control
     * @param {?} container
     * @param {?} dateIOService
     * @param {?} dateNavigationService
     * @param {?} datepickerEnabledService
     * @param {?} dateFormControlService
     * @param {?} platformId
     * @param {?} focusService
     * @param {?} datepickerFocusService
     */
    constructor(viewContainerRef, injector, el, renderer, control, container, dateIOService, dateNavigationService, datepickerEnabledService, dateFormControlService, platformId, focusService, datepickerFocusService) {
        super(viewContainerRef, ClrDateContainer, injector, control, renderer, el);
        this.el = el;
        this.renderer = renderer;
        this.control = control;
        this.container = container;
        this.dateIOService = dateIOService;
        this.dateNavigationService = dateNavigationService;
        this.datepickerEnabledService = datepickerEnabledService;
        this.dateFormControlService = dateFormControlService;
        this.platformId = platformId;
        this.focusService = focusService;
        this.datepickerFocusService = datepickerFocusService;
        this.dateChange = new EventEmitter(false);
        this.index = 1;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    set date(date) {
        if (this.previousDateChange !== date) {
            this.updateDate(this.getValidDateValueFromDate(date));
        }
        if (!this.initialClrDateInputValue) {
            this.initialClrDateInputValue = date;
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        this.populateServicesFromContainerComponent();
        this.subscriptions.push(this.listenForUserSelectedDayChanges(), this.listenForControlValueChanges(), this.listenForTouchChanges(), this.listenForDirtyChanges(), this.listenForInputRefocus());
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        // I don't know why I have to do this but after using the new HostWrapping Module I have to delay the processing
        // of the initial Input set by the user to here. If I do not 2 issues occur:
        // 1. The Input setter is called before ngOnInit. ngOnInit initializes the services without which the setter fails.
        // 2. The Renderer doesn't work before ngAfterViewInit (It used to before the new HostWrapping Module for some reason).
        // I need the renderer to set the value property on the input to make sure that if the user has supplied a Date
        // input object, we reflect it with the right date on the input field using the IO service. I am not sure if
        // these are major issues or not but just noting them down here.
        this.processInitialInputs();
    }
    /**
     * @return {?}
     */
    setFocusStates() {
        this.setFocus(true);
    }
    /**
     * @return {?}
     */
    triggerValidation() {
        super.triggerValidation();
        this.setFocus(false);
    }
    /**
     * @return {?}
     */
    get placeholderText() {
        return this.placeholder ? this.placeholder : this.dateIOService.placeholderText;
    }
    /**
     * @return {?}
     */
    get inputType() {
        return isPlatformBrowser(this.platformId) && this.usingNativeDatepicker() ? 'date' : 'text';
    }
    /**
     * @param {?} target
     * @return {?}
     */
    onValueChange(target) {
        /** @type {?} */
        const validDateValue = this.dateIOService.getDateValueFromDateString(target.value);
        if (this.usingClarityDatepicker() && validDateValue) {
            this.updateDate(validDateValue, true);
        }
        else if (this.usingNativeDatepicker()) {
            const [year, month, day] = target.value.split('-');
            this.updateDate(new Date(+year, +month - 1, +day), true);
        }
        else {
            this.emitDateOutput(null);
        }
    }
    /**
     * @private
     * @return {?}
     */
    usingClarityDatepicker() {
        return this.datepickerEnabledService.isEnabled;
    }
    /**
     * @private
     * @return {?}
     */
    usingNativeDatepicker() {
        return !this.datepickerEnabledService.isEnabled;
    }
    /**
     * @private
     * @param {?} focus
     * @return {?}
     */
    setFocus(focus) {
        if (this.focusService) {
            this.focusService.focused = focus;
        }
    }
    /**
     * @private
     * @return {?}
     */
    populateServicesFromContainerComponent() {
        if (!this.container) {
            this.dateIOService = this.getProviderFromContainer(DateIOService);
            this.dateNavigationService = this.getProviderFromContainer(DateNavigationService);
            this.datepickerEnabledService = this.getProviderFromContainer(DatepickerEnabledService);
            this.dateFormControlService = this.getProviderFromContainer(DateFormControlService);
        }
    }
    /**
     * @private
     * @return {?}
     */
    processInitialInputs() {
        if (this.datepickerHasFormControl()) {
            this.updateDate(this.dateIOService.getDateValueFromDateString(this.control.value));
        }
        else {
            this.updateDate(this.initialClrDateInputValue);
        }
    }
    /**
     * @private
     * @param {?} value
     * @param {?=} setByUserInteraction
     * @return {?}
     */
    updateDate(value, setByUserInteraction = false) {
        /** @type {?} */
        const date = this.getValidDateValueFromDate(value);
        if (setByUserInteraction) {
            this.emitDateOutput(date);
        }
        else {
            this.previousDateChange = date;
        }
        if (this.dateNavigationService) {
            this.dateNavigationService.selectedDay = date
                ? new DayModel(date.getFullYear(), date.getMonth(), date.getDate())
                : null;
        }
        this.updateInput(date);
    }
    /**
     * @private
     * @param {?} date
     * @return {?}
     */
    updateInput(date) {
        if (date) {
            /** @type {?} */
            const dateString = this.dateIOService.toLocaleDisplayFormatString(date);
            if (this.datepickerHasFormControl() && dateString !== this.control.value) {
                this.control.control.setValue(dateString);
            }
            else if (this.usingNativeDatepicker()) {
                this.renderer.setProperty(this.el.nativeElement, 'valueAsDate', date);
            }
            else {
                this.renderer.setProperty(this.el.nativeElement, 'value', dateString);
            }
        }
        else {
            this.renderer.setProperty(this.el.nativeElement, 'value', '');
        }
    }
    /**
     * @private
     * @param {?} date
     * @return {?}
     */
    getValidDateValueFromDate(date) {
        if (this.dateIOService) {
            /** @type {?} */
            const dateString = this.dateIOService.toLocaleDisplayFormatString(date);
            return this.dateIOService.getDateValueFromDateString(dateString);
        }
        else {
            return null;
        }
    }
    /**
     * @private
     * @param {?} date
     * @return {?}
     */
    emitDateOutput(date) {
        if (!datesAreEqual(date, this.previousDateChange)) {
            this.dateChange.emit(date);
            this.previousDateChange = date;
        }
        else if (!date && this.previousDateChange) {
            this.dateChange.emit(null);
            this.previousDateChange = null;
        }
    }
    /**
     * @private
     * @return {?}
     */
    datepickerHasFormControl() {
        return !!this.control;
    }
    /**
     * @private
     * @return {?}
     */
    listenForControlValueChanges() {
        return of(this.datepickerHasFormControl())
            .pipe(filter((/**
         * @param {?} hasControl
         * @return {?}
         */
        hasControl => hasControl)), switchMap((/**
         * @return {?}
         */
        () => this.control.valueChanges)), 
        // only update date value if not being set by user
        filter((/**
         * @return {?}
         */
        () => !this.datepickerFocusService.elementIsFocused(this.el.nativeElement))))
            .subscribe((/**
         * @param {?} value
         * @return {?}
         */
        (value) => this.updateDate(this.dateIOService.getDateValueFromDateString(value))));
    }
    /**
     * @private
     * @return {?}
     */
    listenForUserSelectedDayChanges() {
        return this.dateNavigationService.selectedDayChange.subscribe((/**
         * @param {?} dayModel
         * @return {?}
         */
        dayModel => this.updateDate(dayModel.toDate(), true)));
    }
    /**
     * @private
     * @return {?}
     */
    listenForTouchChanges() {
        return this.dateFormControlService.touchedChange
            .pipe(filter((/**
         * @return {?}
         */
        () => this.datepickerHasFormControl())))
            .subscribe((/**
         * @return {?}
         */
        () => this.control.control.markAsTouched()));
    }
    /**
     * @private
     * @return {?}
     */
    listenForDirtyChanges() {
        return this.dateFormControlService.dirtyChange
            .pipe(filter((/**
         * @return {?}
         */
        () => this.datepickerHasFormControl())))
            .subscribe((/**
         * @return {?}
         */
        () => this.control.control.markAsDirty()));
    }
    /**
     * @private
     * @return {?}
     */
    listenForInputRefocus() {
        return this.dateNavigationService.selectedDayChange
            .pipe(filter((/**
         * @param {?} date
         * @return {?}
         */
        date => !!date)))
            .subscribe((/**
         * @param {?} v
         * @return {?}
         */
        v => this.datepickerFocusService.focusInput(this.el.nativeElement)));
    }
}
ClrDateInput.decorators = [
    { type: Directive, args: [{
                selector: '[clrDate]',
                host: {
                    '[class.clr-input]': 'true',
                },
                providers: [DatepickerFocusService],
            },] }
];
/** @nocollapse */
ClrDateInput.ctorParameters = () => [
    { type: ViewContainerRef },
    { type: Injector },
    { type: ElementRef },
    { type: Renderer2 },
    { type: NgControl, decorators: [{ type: Self }, { type: Optional }] },
    { type: ClrDateContainer, decorators: [{ type: Optional }] },
    { type: DateIOService, decorators: [{ type: Optional }] },
    { type: DateNavigationService, decorators: [{ type: Optional }] },
    { type: DatepickerEnabledService, decorators: [{ type: Optional }] },
    { type: DateFormControlService, decorators: [{ type: Optional }] },
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
    { type: FocusService, decorators: [{ type: Optional }] },
    { type: DatepickerFocusService }
];
ClrDateInput.propDecorators = {
    placeholder: [{ type: Input }],
    dateChange: [{ type: Output, args: ['clrDateChange',] }],
    date: [{ type: Input, args: ['clrDate',] }],
    setFocusStates: [{ type: HostListener, args: ['focus',] }],
    triggerValidation: [{ type: HostListener, args: ['blur',] }],
    placeholderText: [{ type: HostBinding, args: ['attr.placeholder',] }],
    inputType: [{ type: HostBinding, args: ['attr.type',] }],
    onValueChange: [{ type: HostListener, args: ['change', ['$event.target'],] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// Literally any annotation would work here, but writing our own @HoneyBadger annotation feels overkill.
/**
 * @abstract
 */
class AbstractPopover {
    /**
     * @param {?} injector
     * @param {?} parentHost
     */
    constructor(injector, parentHost) {
        this.parentHost = parentHost;
        this.updateAnchor = false;
        this.popoverOptions = {};
        /*
             * Until https://github.com/angular/angular/issues/8785 is supported, we don't have any way to instantiate
             * a separate directive on the host. So let's do dirty but performant for now.
             */
        this.closeOnOutsideClick = false;
        this.el = injector.get(ElementRef);
        this.ifOpenService = injector.get(IfOpenService);
        this.renderer = injector.get(Renderer2);
        // Default anchor is the parent host
        this.anchorElem = parentHost.nativeElement;
        this.popoverInstance = new Popover(this.el.nativeElement);
        this.subscription = this.ifOpenService.openChange.subscribe((/**
         * @param {?} change
         * @return {?}
         */
        change => {
            if (change) {
                this.anchor();
                this.attachESCListener();
            }
            else {
                this.release();
                this.detachESCListener();
            }
        }));
        if (this.ifOpenService.open) {
            this.anchor();
            this.attachESCListener();
        }
    }
    /**
     * @protected
     * @return {?}
     */
    anchor() {
        this.updateAnchor = true;
        // Ugh
        this.ignore = this.ifOpenService.originalEvent;
    }
    /**
     * @protected
     * @return {?}
     */
    release() {
        this.detachOutsideClickListener();
        this.popoverInstance.release();
    }
    /**
     * @return {?}
     */
    ngAfterViewChecked() {
        if (this.updateAnchor) {
            this.updateAnchor = false;
            this.popoverInstance
                .anchor(this.anchorElem, this.anchorPoint, this.popoverPoint, this.popoverOptions)
                .subscribe((/**
             * @return {?}
             */
            () => {
                // if a scroll event is detected, close the popover
                this.ifOpenService.open = false;
            }));
            this.attachOutsideClickListener();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.release();
        this.detachESCListener();
        this.subscription.unsubscribe();
    }
    /*
         * Fallback to hide when *clrIfOpen is not being used
         */
    /**
     * @return {?}
     */
    get isOffScreen() {
        return this.ifOpenService.open ? false : true;
    }
    /**
     * @private
     * @return {?}
     */
    attachESCListener() {
        this.documentESCListener = this.renderer.listen('document', 'keydown', (/**
         * @param {?} event
         * @return {?}
         */
        event => {
            if (event && event.keyCode === ESC) {
                this.ifOpenService.open = false;
            }
        }));
    }
    /**
     * @private
     * @return {?}
     */
    detachESCListener() {
        if (this.documentESCListener) {
            this.documentESCListener();
            delete this.documentESCListener;
        }
    }
    /**
     * @private
     * @return {?}
     */
    attachOutsideClickListener() {
        if (this.closeOnOutsideClick) {
            this.hostClickListener = this.renderer.listen(this.el.nativeElement, 'click', (/**
             * @param {?} event
             * @return {?}
             */
            event => (this.ignore = event)));
            if (this.ignoredElement) {
                this.ignoredElementClickListener = this.renderer.listen(this.ignoredElement, 'click', (/**
                 * @param {?} event
                 * @return {?}
                 */
                event => (this.ignore = event)));
            }
            this.documentClickListener = this.renderer.listen('document', 'click', (/**
             * @param {?} event
             * @return {?}
             */
            event => {
                if (event === this.ignore) {
                    delete this.ignore;
                }
                else {
                    this.ifOpenService.open = false;
                }
            }));
        }
    }
    /**
     * @private
     * @return {?}
     */
    detachOutsideClickListener() {
        if (this.closeOnOutsideClick) {
            if (this.hostClickListener) {
                this.hostClickListener();
                delete this.hostClickListener;
            }
            if (this.ignoredElementClickListener) {
                this.ignoredElementClickListener();
                delete this.ignoredElementClickListener;
            }
            if (this.documentClickListener) {
                this.documentClickListener();
                delete this.documentClickListener;
            }
        }
    }
}
AbstractPopover.decorators = [
    { type: Injectable }
];
/** @nocollapse */
AbstractPopover.ctorParameters = () => [
    { type: Injector },
    { type: ElementRef, decorators: [{ type: SkipSelf }] }
];
AbstractPopover.propDecorators = {
    isOffScreen: [{ type: HostBinding, args: ['class.is-off-screen',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * This service manages which view is visible in the datepicker popover.
 */
class ViewManagerService {
    constructor() {
        this._currentView = "DAYVIEW" /* DAYVIEW */;
    }
    /**
     * @return {?}
     */
    get isDayView() {
        return this._currentView === "DAYVIEW" /* DAYVIEW */;
    }
    /**
     * @return {?}
     */
    get isYearView() {
        return this._currentView === "YEARVIEW" /* YEARVIEW */;
    }
    /**
     * @return {?}
     */
    get isMonthView() {
        return this._currentView === "MONTHVIEW" /* MONTHVIEW */;
    }
    /**
     * @return {?}
     */
    changeToMonthView() {
        this._currentView = "MONTHVIEW" /* MONTHVIEW */;
    }
    /**
     * @return {?}
     */
    changeToYearView() {
        this._currentView = "YEARVIEW" /* YEARVIEW */;
    }
    /**
     * @return {?}
     */
    changeToDayView() {
        this._currentView = "DAYVIEW" /* DAYVIEW */;
    }
}
ViewManagerService.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrDatepickerViewManager extends AbstractPopover {
    /**
     * @param {?} parent
     * @param {?} _injector
     * @param {?} _viewManagerService
     */
    constructor(parent, _injector, _viewManagerService) {
        super(_injector, parent);
        this._viewManagerService = _viewManagerService;
        this.configurePopover();
    }
    /**
     * Configure Popover Direction and Close indicators
     * @private
     * @return {?}
     */
    configurePopover() {
        this.anchorPoint = Point.BOTTOM_LEFT;
        this.popoverPoint = Point.LEFT_TOP;
        this.closeOnOutsideClick = true;
    }
    /**
     * Returns if the current view is the monthpicker.
     * @return {?}
     */
    get isMonthView() {
        return this._viewManagerService.isMonthView;
    }
    /**
     * Returns if the current view is the yearpicker.
     * @return {?}
     */
    get isYearView() {
        return this._viewManagerService.isYearView;
    }
    /**
     * Returns if the current view is the daypicker.
     * @return {?}
     */
    get isDayView() {
        return this._viewManagerService.isDayView;
    }
}
ClrDatepickerViewManager.decorators = [
    { type: Component, args: [{
                selector: 'clr-datepicker-view-manager',
                template: "<!--\n* Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.\n* This software is released under MIT license.\n* The full license information can be found in LICENSE in the root directory of this project.\n-->\n\n<clr-monthpicker *ngIf=\"isMonthView\"></clr-monthpicker>\n<clr-yearpicker *ngIf=\"isYearView\"></clr-yearpicker>\n<clr-daypicker *ngIf=\"isDayView\"></clr-daypicker>\n",
                providers: [ViewManagerService, DatepickerFocusService],
                host: { '[class.datepicker]': 'true' }
            }] }
];
/** @nocollapse */
ClrDatepickerViewManager.ctorParameters = () => [
    { type: ElementRef, decorators: [{ type: SkipSelf }] },
    { type: Injector },
    { type: ViewManagerService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrDay {
    /**
     * @param {?} _dateNavigationService
     * @param {?} _ifOpenService
     * @param {?} dateFormControlService
     */
    constructor(_dateNavigationService, _ifOpenService, dateFormControlService) {
        this._dateNavigationService = _dateNavigationService;
        this._ifOpenService = _ifOpenService;
        this.dateFormControlService = dateFormControlService;
    }
    /**
     * Updates the focusedDay in the DateNavigationService when the ClrDay is focused.
     * @return {?}
     */
    onDayViewFocus() {
        this._dateNavigationService.focusedDay = this.dayView.dayModel;
    }
    /**
     * Updates the selectedDay when the ClrDay is selected and closes the datepicker popover.
     * @return {?}
     */
    selectDay() {
        /** @type {?} */
        const day = this.dayView.dayModel;
        this._dateNavigationService.notifySelectedDayChanged(day);
        this.dateFormControlService.markAsDirty();
        this._ifOpenService.open = false;
    }
}
ClrDay.decorators = [
    { type: Component, args: [{
                selector: 'clr-day',
                template: `
        <button
            class="day-btn"
            type="button"
            [class.is-today]="dayView.isTodaysDate"
            [class.is-disabled]="dayView.isDisabled"
            [class.is-selected]="dayView.isSelected"
            [attr.tabindex]="dayView.tabIndex"
            (click)="selectDay()"
            (focus)="onDayViewFocus()">
            {{dayView.dayModel.date}}
        </button>
    `,
                host: { '[class.day]': 'true' }
            }] }
];
/** @nocollapse */
ClrDay.ctorParameters = () => [
    { type: DateNavigationService },
    { type: IfOpenService },
    { type: DateFormControlService }
];
ClrDay.propDecorators = {
    dayView: [{ type: Input, args: ['clrDayView',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrDaypicker {
    /**
     * @param {?} _viewManagerService
     * @param {?} _dateNavigationService
     * @param {?} _localeHelperService
     * @param {?} commonStrings
     */
    constructor(_viewManagerService, _dateNavigationService, _localeHelperService, commonStrings) {
        this._viewManagerService = _viewManagerService;
        this._dateNavigationService = _dateNavigationService;
        this._localeHelperService = _localeHelperService;
        this.commonStrings = commonStrings;
    }
    /**
     * Calls the ViewManagerService to change to the monthpicker view.
     * @return {?}
     */
    changeToMonthView() {
        this._viewManagerService.changeToMonthView();
    }
    /**
     * Calls the ViewManagerService to change to the yearpicker view.
     * @return {?}
     */
    changeToYearView() {
        this._viewManagerService.changeToYearView();
    }
    /**
     * Returns the month value of the calendar in the TranslationWidth.Abbreviated format.
     * @return {?}
     */
    get calendarMonth() {
        return this._localeHelperService.localeMonthsAbbreviated[this._dateNavigationService.displayedCalendar.month];
    }
    /**
     * Returns the year value of the calendar.
     * @return {?}
     */
    get calendarYear() {
        return this._dateNavigationService.displayedCalendar.year;
    }
    /**
     * Calls the DateNavigationService to move to the next month.
     * @return {?}
     */
    nextMonth() {
        this._dateNavigationService.moveToNextMonth();
    }
    /**
     * Calls the DateNavigationService to move to the previous month.
     * @return {?}
     */
    previousMonth() {
        this._dateNavigationService.moveToPreviousMonth();
    }
    /**
     * Calls the DateNavigationService to move to the current month.
     * @return {?}
     */
    currentMonth() {
        this._dateNavigationService.moveToCurrentMonth();
    }
}
ClrDaypicker.decorators = [
    { type: Component, args: [{ selector: 'clr-daypicker', template: "<div class=\"calendar-header\">\n    <div class=\"calendar-pickers\">\n        <button class=\"calendar-btn monthpicker-trigger\" type=\"button\" (click)=\"changeToMonthView()\">\n            {{calendarMonth}}\n        </button>\n        <button class=\"calendar-btn yearpicker-trigger\" type=\"button\" (click)=\"changeToYearView()\">\n            {{calendarYear}}\n        </button>\n    </div>\n    <div class=\"calendar-switchers\">\n        <button class=\"calendar-btn switcher\" type=\"button\" (click)=\"previousMonth()\">\n            <clr-icon shape=\"angle\" dir=\"left\" [attr.title]=\"commonStrings.previous\"></clr-icon>\n        </button>\n        <button class=\"calendar-btn switcher\" type=\"button\" (click)=\"currentMonth()\">\n            <clr-icon shape=\"event\" [attr.title]=\"commonStrings.current\"></clr-icon>\n        </button>\n        <button class=\"calendar-btn switcher\" type=\"button\" (click)=\"nextMonth()\">\n            <clr-icon shape=\"angle\" dir=\"right\" [attr.title]=\"commonStrings.next\"></clr-icon>\n        </button>\n    </div>\n</div>\n<clr-calendar></clr-calendar>\n", host: { '[class.daypicker]': 'true' } }] }
];
/** @nocollapse */
ClrDaypicker.ctorParameters = () => [
    { type: ViewManagerService },
    { type: DateNavigationService },
    { type: LocaleHelperService },
    { type: ClrCommonStrings }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrMonthpicker {
    /**
     * @param {?} _viewManagerService
     * @param {?} _localeHelperService
     * @param {?} _dateNavigationService
     * @param {?} _datepickerFocusService
     * @param {?} _elRef
     */
    constructor(_viewManagerService, _localeHelperService, _dateNavigationService, _datepickerFocusService, _elRef) {
        this._viewManagerService = _viewManagerService;
        this._localeHelperService = _localeHelperService;
        this._dateNavigationService = _dateNavigationService;
        this._datepickerFocusService = _datepickerFocusService;
        this._elRef = _elRef;
        this._focusedMonthIndex = this.calendarMonthIndex;
    }
    /**
     * Gets the months array which is used to rendered the monthpicker view.
     * Months are in the TranslationWidth.Wide format.
     * @return {?}
     */
    get monthNames() {
        return this._localeHelperService.localeMonthsWide;
    }
    /**
     * Gets the month value of the Calendar.
     * @return {?}
     */
    get calendarMonthIndex() {
        return this._dateNavigationService.displayedCalendar.month;
    }
    /**
     * Calls the DateNavigationService to update the month value of the calendar.
     * Also changes the view to the daypicker.
     * @param {?} monthIndex
     * @return {?}
     */
    changeMonth(monthIndex) {
        this._dateNavigationService.changeMonth(monthIndex);
        this._viewManagerService.changeToDayView();
    }
    /**
     * Compares the month passed to the focused month and returns the tab index.
     * @param {?} monthIndex
     * @return {?}
     */
    getTabIndex(monthIndex) {
        return monthIndex === this._focusedMonthIndex ? 0 : -1;
    }
    /**
     * Handles the Keyboard arrow navigation for the monthpicker.
     * @param {?} event
     * @return {?}
     */
    onKeyDown(event) {
        // NOTE: Didn't move this to the date navigation service because
        // the logic is fairly simple and it didn't make sense for me
        // to create extra observables just to move this logic to the service.
        if (event) {
            /** @type {?} */
            const keyCode = event.keyCode;
            if (keyCode === UP_ARROW && this._focusedMonthIndex > 0) {
                event.preventDefault();
                this._focusedMonthIndex--;
                this._datepickerFocusService.focusCell(this._elRef);
            }
            else if (keyCode === DOWN_ARROW && this._focusedMonthIndex < 11) {
                event.preventDefault();
                this._focusedMonthIndex++;
                this._datepickerFocusService.focusCell(this._elRef);
            }
            else if (keyCode === RIGHT_ARROW && this._focusedMonthIndex < 6) {
                event.preventDefault();
                this._focusedMonthIndex = this._focusedMonthIndex + 6;
                this._datepickerFocusService.focusCell(this._elRef);
            }
            else if (keyCode === LEFT_ARROW && this._focusedMonthIndex > 5) {
                event.preventDefault();
                this._focusedMonthIndex = this._focusedMonthIndex - 6;
                this._datepickerFocusService.focusCell(this._elRef);
            }
        }
    }
    /**
     * Focuses on the current calendar month when the View is initialized.
     * @return {?}
     */
    ngAfterViewInit() {
        this._datepickerFocusService.focusCell(this._elRef);
    }
}
ClrMonthpicker.decorators = [
    { type: Component, args: [{
                selector: 'clr-monthpicker',
                template: `
        <button
            type="button"
            class="calendar-btn month"
            *ngFor="let month of monthNames; let monthIndex = index"
            (click)="changeMonth(monthIndex)"
            [class.is-selected]="monthIndex === calendarMonthIndex"
            [attr.tabindex]="getTabIndex(monthIndex)">
            {{month}}
        </button>
    `,
                host: {
                    '[class.monthpicker]': 'true',
                }
            }] }
];
/** @nocollapse */
ClrMonthpicker.ctorParameters = () => [
    { type: ViewManagerService },
    { type: LocaleHelperService },
    { type: DateNavigationService },
    { type: DatepickerFocusService },
    { type: ElementRef }
];
ClrMonthpicker.propDecorators = {
    onKeyDown: [{ type: HostListener, args: ['keydown', ['$event'],] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/** @type {?} */
const YEARS_TO_DISPLAY = 10;
class YearRangeModel {
    /**
     * @param {?} year
     */
    constructor(year) {
        this.year = year;
        this.yearRange = [];
        this.generateYearRange();
    }
    /**
     * Gets the number in the middle of the range.
     * @return {?}
     */
    get middleYear() {
        return this.yearRange[Math.floor(this.yearRange.length / 2)];
    }
    /**
     * Generates the year range based on the year parameter.
     * eg: If 2018 is passed the output will be [2010, 2011, ..., 2019]
     * @private
     * @return {?}
     */
    generateYearRange() {
        /** @type {?} */
        const remainder = this.year % YEARS_TO_DISPLAY;
        /** @type {?} */
        const floor = this.year - remainder;
        /** @type {?} */
        const ceil = floor + YEARS_TO_DISPLAY;
        this.yearRange = this.generateRange(floor, ceil);
    }
    /**
     * Function which generate a range of numbers from floor to ceil.
     * @private
     * @param {?} floor
     * @param {?} ceil
     * @return {?}
     */
    generateRange(floor, ceil) {
        return Array.from({ length: ceil - floor }, (/**
         * @param {?} v
         * @param {?} k
         * @return {?}
         */
        (v, k) => k + floor));
    }
    /**
     * Generates the YearRangeModel for the next decade.
     * @return {?}
     */
    nextDecade() {
        return new YearRangeModel(this.year + 10);
    }
    /**
     * Generates the YearRangeModel for the previous decade.
     * @return {?}
     */
    previousDecade() {
        return new YearRangeModel(this.year - 10);
    }
    /**
     * Generates the YearRangeModel for the current decade.
     * @return {?}
     */
    currentDecade() {
        return new YearRangeModel(new Date().getFullYear());
    }
    /**
     * Checks if the value is in the YearRangeModel.
     * @param {?} value
     * @return {?}
     */
    inRange(value) {
        return this.yearRange.indexOf(value) > -1;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrYearpicker {
    /**
     * @param {?} _dateNavigationService
     * @param {?} _viewManagerService
     * @param {?} _datepickerFocusService
     * @param {?} _elRef
     * @param {?} commonStrings
     */
    constructor(_dateNavigationService, _viewManagerService, _datepickerFocusService, _elRef, commonStrings) {
        this._dateNavigationService = _dateNavigationService;
        this._viewManagerService = _viewManagerService;
        this._datepickerFocusService = _datepickerFocusService;
        this._elRef = _elRef;
        this.commonStrings = commonStrings;
        this.yearRangeModel = new YearRangeModel(this.calendarYear);
        this._focusedYear = this.calendarYear;
    }
    /**
     * Gets the year which the user is currently on.
     * @return {?}
     */
    get calendarYear() {
        return this._dateNavigationService.displayedCalendar.year;
    }
    /**
     * Increments the focus year by the value passed. Updates the YearRangeModel if the
     * new value is not in the current decade.
     * @private
     * @param {?} value
     * @return {?}
     */
    incrementFocusYearBy(value) {
        this._focusedYear = this._focusedYear + value;
        if (!this.yearRangeModel.inRange(this._focusedYear)) {
            if (value > 0) {
                this.yearRangeModel = this.yearRangeModel.nextDecade();
            }
            else {
                this.yearRangeModel = this.yearRangeModel.previousDecade();
            }
        }
        this._datepickerFocusService.focusCell(this._elRef);
    }
    /**
     * Calls the DateNavigationService to update the year value of the calendar.
     * Also changes the view to the daypicker.
     * @param {?} year
     * @return {?}
     */
    changeYear(year) {
        this._dateNavigationService.changeYear(year);
        this._viewManagerService.changeToDayView();
    }
    /**
     * Updates the YearRangeModel to the previous decade.
     * @return {?}
     */
    previousDecade() {
        this.yearRangeModel = this.yearRangeModel.previousDecade();
        // Year in the yearpicker is not focused because while navigating to a different decade,
        // you want the focus to remain on the decade switcher arrows.
    }
    /**
     * Updates the YearRangeModel to the current decade.
     * @return {?}
     */
    currentDecade() {
        if (!this.yearRangeModel.inRange(this._dateNavigationService.today.year)) {
            this.yearRangeModel = this.yearRangeModel.currentDecade();
        }
        this._datepickerFocusService.focusCell(this._elRef);
    }
    /**
     * Updates the YearRangeModel to the next decade.
     * @return {?}
     */
    nextDecade() {
        this.yearRangeModel = this.yearRangeModel.nextDecade();
        // Year in the yearpicker is not focused because while navigating to a different decade,
        // you want the focus to remain on the decade switcher arrows.
    }
    /**
     * Compares the year passed to the focused year and returns the tab index.
     * @param {?} year
     * @return {?}
     */
    getTabIndex(year) {
        if (!this.yearRangeModel.inRange(this._focusedYear)) {
            if (this.yearRangeModel.inRange(this.calendarYear)) {
                this._focusedYear = this.calendarYear;
            }
            else {
                this._focusedYear = this.yearRangeModel.middleYear;
            }
        }
        return this._focusedYear === year ? 0 : -1;
    }
    /**
     * Handles the Keyboard arrow navigation for the yearpicker.
     * @param {?} event
     * @return {?}
     */
    onKeyDown(event) {
        // NOTE: Didn't move this to the date navigation service because
        // the logic is fairly simple and it didn't make sense for me
        // to create extra observables just to move this logic to the service.
        if (event) {
            /** @type {?} */
            const keyCode = event.keyCode;
            if (keyCode === UP_ARROW) {
                event.preventDefault();
                this.incrementFocusYearBy(-1);
            }
            else if (keyCode === DOWN_ARROW) {
                event.preventDefault();
                this.incrementFocusYearBy(1);
            }
            else if (keyCode === RIGHT_ARROW) {
                event.preventDefault();
                this.incrementFocusYearBy(5);
            }
            else if (keyCode === LEFT_ARROW) {
                event.preventDefault();
                this.incrementFocusYearBy(-5);
            }
        }
    }
    /**
     * Focuses on the current calendar year when the View is initialized.
     * @return {?}
     */
    ngAfterViewInit() {
        this._datepickerFocusService.focusCell(this._elRef);
    }
}
ClrYearpicker.decorators = [
    { type: Component, args: [{
                selector: 'clr-yearpicker',
                template: `
        <div class="year-switchers">
            <button class="calendar-btn switcher" type="button" (click)="previousDecade()">
                <clr-icon shape="angle" dir="left" [attr.title]="commonStrings.previous"></clr-icon>
            </button>
            <button class="calendar-btn switcher" type="button" (click)="currentDecade()">
                <clr-icon shape="event" [attr.title]="commonStrings.current"></clr-icon>
            </button>
            <button class="calendar-btn switcher" type="button" (click)="nextDecade()">
                <clr-icon shape="angle" dir="right" [attr.title]="commonStrings.next"></clr-icon>
            </button>
        </div>
        <div class="years">
            <button
                *ngFor="let year of yearRangeModel.yearRange"
                type="button"
                class="calendar-btn year"
                [attr.tabindex]="getTabIndex(year)"
                [class.is-selected]="year === calendarYear"
                (click)="changeYear(year)">
                {{year}}
            </button>
        </div>
    `,
                host: {
                    '[class.yearpicker]': 'true',
                }
            }] }
];
/** @nocollapse */
ClrYearpicker.ctorParameters = () => [
    { type: DateNavigationService },
    { type: ViewManagerService },
    { type: DatepickerFocusService },
    { type: ElementRef },
    { type: ClrCommonStrings }
];
ClrYearpicker.propDecorators = {
    onKeyDown: [{ type: HostListener, args: ['keydown', ['$event'],] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const CLR_DATEPICKER_DIRECTIVES = [
    ClrDay,
    ClrDateContainer,
    ClrDateInput,
    ClrDatepickerViewManager,
    ClrMonthpicker,
    ClrYearpicker,
    ClrDaypicker,
    ClrCalendar,
];
class ClrDatepickerModule {
}
ClrDatepickerModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    ClrHostWrappingModule,
                    ClrConditionalModule,
                    ClrIconModule,
                    ClrFocusTrapModule,
                    ClrCommonFormsModule,
                ],
                declarations: [CLR_DATEPICKER_DIRECTIVES],
                exports: [CLR_DATEPICKER_DIRECTIVES],
                entryComponents: [ClrDateContainer],
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrInputContainer {
    /**
     * @param {?} ifErrorService
     * @param {?} layoutService
     * @param {?} controlClassService
     * @param {?} ngControlService
     */
    constructor(ifErrorService, layoutService, controlClassService, ngControlService) {
        this.ifErrorService = ifErrorService;
        this.layoutService = layoutService;
        this.controlClassService = controlClassService;
        this.ngControlService = ngControlService;
        this.subscriptions = [];
        this.invalid = false;
        this._dynamic = false;
        this.subscriptions.push(this.ifErrorService.statusChanges.subscribe((/**
         * @param {?} invalid
         * @return {?}
         */
        invalid => {
            this.invalid = invalid;
        })));
        this.subscriptions.push(this.ngControlService.controlChanges.subscribe((/**
         * @param {?} control
         * @return {?}
         */
        control => {
            this.control = control;
        })));
    }
    /**
     * @return {?}
     */
    controlClass() {
        return this.controlClassService.controlClass(this.invalid, this.addGrid());
    }
    /**
     * @return {?}
     */
    addGrid() {
        if (this.layoutService && !this.layoutService.isVertical()) {
            return true;
        }
        return false;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.subscriptions) {
            this.subscriptions.map((/**
             * @param {?} sub
             * @return {?}
             */
            sub => sub.unsubscribe()));
        }
    }
}
ClrInputContainer.decorators = [
    { type: Component, args: [{
                selector: 'clr-input-container',
                template: `
        <ng-content select="label"></ng-content>
        <label *ngIf="!label && addGrid()"></label>
        <div class="clr-control-container" [ngClass]="controlClass()">
            <div class="clr-input-wrapper">
                <ng-content select="[clrInput]"></ng-content>
                <clr-icon *ngIf="invalid" class="clr-validate-icon" shape="exclamation-circle" aria-hidden="true"></clr-icon>
            </div>
            <ng-content select="clr-control-helper" *ngIf="!invalid"></ng-content>
            <ng-content select="clr-control-error" *ngIf="invalid"></ng-content>
        </div>
    `,
                host: {
                    '[class.clr-form-control]': 'true',
                    '[class.clr-form-control-disabled]': 'control?.disabled',
                    '[class.clr-row]': 'addGrid()',
                },
                providers: [IfErrorService, NgControlService, ControlIdService, ControlClassService]
            }] }
];
/** @nocollapse */
ClrInputContainer.ctorParameters = () => [
    { type: IfErrorService },
    { type: LayoutService, decorators: [{ type: Optional }] },
    { type: ControlClassService },
    { type: NgControlService }
];
ClrInputContainer.propDecorators = {
    label: [{ type: ContentChild, args: [ClrLabel,] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrInput extends WrappedFormControl {
    /**
     * @param {?} vcr
     * @param {?} injector
     * @param {?} control
     * @param {?} renderer
     * @param {?} el
     */
    constructor(vcr, injector, control, renderer, el) {
        super(vcr, ClrInputContainer, injector, control, renderer, el);
        this.index = 1;
    }
}
ClrInput.decorators = [
    { type: Directive, args: [{ selector: '[clrInput]', host: { '[class.clr-input]': 'true' } },] }
];
/** @nocollapse */
ClrInput.ctorParameters = () => [
    { type: ViewContainerRef },
    { type: Injector },
    { type: NgControl, decorators: [{ type: Self }, { type: Optional }] },
    { type: Renderer2 },
    { type: ElementRef }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrInputModule {
}
ClrInputModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, FormsModule, ClrIconModule, ClrCommonFormsModule],
                declarations: [ClrInput, ClrInputContainer],
                exports: [ClrCommonFormsModule, ClrInput, ClrInputContainer],
                entryComponents: [ClrInputContainer],
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const TOGGLE_SERVICE = new InjectionToken(undefined);
/**
 * @return {?}
 */
function ToggleServiceFactory() {
    return new BehaviorSubject(false);
}
/** @type {?} */
const TOGGLE_SERVICE_PROVIDER = { provide: TOGGLE_SERVICE, useFactory: ToggleServiceFactory };
class ClrPasswordContainer {
    /**
     * @param {?} ifErrorService
     * @param {?} layoutService
     * @param {?} controlClassService
     * @param {?} focusService
     * @param {?} ngControlService
     * @param {?} toggleService
     * @param {?} commonStrings
     */
    constructor(ifErrorService, layoutService, controlClassService, focusService, ngControlService, toggleService, commonStrings) {
        this.ifErrorService = ifErrorService;
        this.layoutService = layoutService;
        this.controlClassService = controlClassService;
        this.focusService = focusService;
        this.ngControlService = ngControlService;
        this.toggleService = toggleService;
        this.commonStrings = commonStrings;
        this.subscriptions = [];
        this.invalid = false;
        this._dynamic = false;
        this.show = false;
        this.focus = false;
        this._toggle = true;
        this.subscriptions.push(this.ifErrorService.statusChanges.subscribe((/**
         * @param {?} invalid
         * @return {?}
         */
        invalid => {
            this.invalid = invalid;
        })));
        this.subscriptions.push(this.focusService.focusChange.subscribe((/**
         * @param {?} state
         * @return {?}
         */
        state$$1 => {
            this.focus = state$$1;
        })));
        this.subscriptions.push(this.ngControlService.controlChanges.subscribe((/**
         * @param {?} control
         * @return {?}
         */
        control => {
            this.control = control;
        })));
    }
    /**
     * @param {?} state
     * @return {?}
     */
    set clrToggle(state$$1) {
        this._toggle = state$$1;
        if (!state$$1) {
            this.show = false;
        }
    }
    /**
     * @return {?}
     */
    get clrToggle() {
        return this._toggle;
    }
    /**
     * @return {?}
     */
    toggle() {
        this.show = !this.show;
        this.toggleService.next(this.show);
    }
    /**
     * @return {?}
     */
    controlClass() {
        return this.controlClassService.controlClass(this.invalid, this.addGrid());
    }
    /**
     * @return {?}
     */
    addGrid() {
        if (this.layoutService && !this.layoutService.isVertical()) {
            return true;
        }
        return false;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.subscriptions) {
            this.subscriptions.map((/**
             * @param {?} sub
             * @return {?}
             */
            sub => sub.unsubscribe()));
        }
    }
}
ClrPasswordContainer.decorators = [
    { type: Component, args: [{
                selector: 'clr-password-container',
                template: `
    <ng-content select="label"></ng-content>
    <label *ngIf="!label && addGrid()"></label>
    <div class="clr-control-container" [ngClass]="controlClass()">
      <div class="clr-input-wrapper">
        <div class="clr-input-group" [class.clr-focus]="focus">
          <ng-content select="[clrPassword]"></ng-content>
          <button
            *ngIf="clrToggle"
            (click)="toggle()"
            [disabled]="control?.disabled"
            class="clr-input-group-icon-action"
            type="button">
            <clr-icon
            [attr.shape]="show ? 'eye-hide' : 'eye'"
            [attr.title]="show ? commonStrings.hide : commonStrings.show"></clr-icon>
          </button>
        </div>
        <clr-icon *ngIf="invalid" class="clr-validate-icon" shape="exclamation-circle" aria-hidden="true"></clr-icon>
      </div>
      <ng-content select="clr-control-helper" *ngIf="!invalid"></ng-content>
      <ng-content select="clr-control-error" *ngIf="invalid"></ng-content>
    </div>
    `,
                host: {
                    '[class.clr-form-control]': 'true',
                    '[class.clr-form-control-disabled]': 'control?.disabled',
                    '[class.clr-row]': 'addGrid()',
                },
                providers: [
                    IfErrorService,
                    NgControlService,
                    ControlIdService,
                    ControlClassService,
                    FocusService,
                    TOGGLE_SERVICE_PROVIDER,
                ]
            }] }
];
/** @nocollapse */
ClrPasswordContainer.ctorParameters = () => [
    { type: IfErrorService },
    { type: LayoutService, decorators: [{ type: Optional }] },
    { type: ControlClassService },
    { type: FocusService },
    { type: NgControlService },
    { type: BehaviorSubject, decorators: [{ type: Inject, args: [TOGGLE_SERVICE,] }] },
    { type: ClrCommonStrings }
];
ClrPasswordContainer.propDecorators = {
    clrToggle: [{ type: Input, args: ['clrToggle',] }],
    label: [{ type: ContentChild, args: [ClrLabel,] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrPassword extends WrappedFormControl {
    /**
     * @param {?} vcr
     * @param {?} injector
     * @param {?} control
     * @param {?} renderer
     * @param {?} el
     * @param {?} focusService
     * @param {?} toggleService
     */
    constructor(vcr, injector, control, renderer, el, focusService, toggleService) {
        super(vcr, ClrPasswordContainer, injector, control, renderer, el);
        this.focusService = focusService;
        this.toggleService = toggleService;
        this.index = 1;
        if (!this.focusService) {
            throw new Error('clrPassword requires being wrapped in <clr-password-container>');
        }
        this.subscriptions.push(this.toggleService.subscribe((/**
         * @param {?} toggle
         * @return {?}
         */
        toggle => {
            renderer.setProperty(el.nativeElement, 'type', toggle ? 'text' : 'password');
        })));
    }
    /**
     * @return {?}
     */
    triggerFocus() {
        if (this.focusService) {
            this.focusService.focused = true;
        }
    }
    /**
     * @return {?}
     */
    triggerValidation() {
        super.triggerValidation();
        if (this.focusService) {
            this.focusService.focused = false;
        }
    }
}
ClrPassword.decorators = [
    { type: Directive, args: [{ selector: '[clrPassword]', host: { '[class.clr-input]': 'true' } },] }
];
/** @nocollapse */
ClrPassword.ctorParameters = () => [
    { type: ViewContainerRef },
    { type: Injector },
    { type: NgControl, decorators: [{ type: Self }, { type: Optional }] },
    { type: Renderer2 },
    { type: ElementRef },
    { type: FocusService, decorators: [{ type: Optional }] },
    { type: BehaviorSubject, decorators: [{ type: Optional }, { type: Inject, args: [TOGGLE_SERVICE,] }] }
];
ClrPassword.propDecorators = {
    triggerFocus: [{ type: HostListener, args: ['focus',] }],
    triggerValidation: [{ type: HostListener, args: ['blur',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrPasswordModule {
}
ClrPasswordModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, FormsModule, ClrIconModule, ClrCommonFormsModule],
                declarations: [ClrPassword, ClrPasswordContainer],
                exports: [ClrCommonFormsModule, ClrPassword, ClrPasswordContainer],
                entryComponents: [ClrPasswordContainer],
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrRadioWrapper {
    constructor() {
        // We need both _dynamic for HostWrapper and ContentChild(ClrLabel) in cases where
        // the user puts a radio inside a wrapper without a label, host wrapping doesn't apply
        // but we'd still need to insert a label
        this._dynamic = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.label) {
            this.label.disableGrid();
        }
    }
}
ClrRadioWrapper.decorators = [
    { type: Component, args: [{
                selector: 'clr-radio-wrapper',
                template: `
    <ng-content select="[clrRadio]"></ng-content>
    <ng-content select="label"></ng-content>
    <label *ngIf="!label"></label>
  `,
                host: {
                    '[class.clr-radio-wrapper]': 'true',
                },
                providers: [ControlIdService]
            }] }
];
ClrRadioWrapper.propDecorators = {
    label: [{ type: ContentChild, args: [ClrLabel,] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrRadio extends WrappedFormControl {
    /**
     * @param {?} vcr
     * @param {?} injector
     * @param {?} control
     * @param {?} renderer
     * @param {?} el
     */
    constructor(vcr, injector, control, renderer, el) {
        super(vcr, ClrRadioWrapper, injector, control, renderer, el);
    }
}
ClrRadio.decorators = [
    { type: Directive, args: [{ selector: '[clrRadio]' },] }
];
/** @nocollapse */
ClrRadio.ctorParameters = () => [
    { type: ViewContainerRef },
    { type: Injector },
    { type: NgControl, decorators: [{ type: Self }, { type: Optional }] },
    { type: Renderer2 },
    { type: ElementRef }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrRadioContainer {
    /**
     * @param {?} ifErrorService
     * @param {?} layoutService
     * @param {?} controlClassService
     * @param {?} ngControlService
     */
    constructor(ifErrorService, layoutService, controlClassService, ngControlService) {
        this.ifErrorService = ifErrorService;
        this.layoutService = layoutService;
        this.controlClassService = controlClassService;
        this.ngControlService = ngControlService;
        this.subscriptions = [];
        this.invalid = false;
        this.inline = false;
        this.subscriptions.push(this.ifErrorService.statusChanges.subscribe((/**
         * @param {?} invalid
         * @return {?}
         */
        invalid => {
            this.invalid = invalid;
        })));
        this.subscriptions.push(this.ngControlService.controlChanges.subscribe((/**
         * @param {?} control
         * @return {?}
         */
        control => {
            this.control = control;
        })));
    }
    /*
       * Here we want to support the following cases
       * clrInline - true by presence
       * clrInline="true|false" - unless it is explicitly false, strings are considered true
       * [clrInline]="true|false" - expect a boolean
       */
    /**
     * @param {?} value
     * @return {?}
     */
    set clrInline(value) {
        if (typeof value === 'string') {
            this.inline = value === 'false' ? false : true;
        }
        else {
            this.inline = !!value;
        }
    }
    /**
     * @return {?}
     */
    get clrInline() {
        return this.inline;
    }
    /**
     * @return {?}
     */
    controlClass() {
        return this.controlClassService.controlClass(this.invalid, this.addGrid(), this.inline ? 'clr-control-inline' : '');
    }
    /**
     * @return {?}
     */
    addGrid() {
        if (this.layoutService && !this.layoutService.isVertical()) {
            return true;
        }
        return false;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscriptions.map((/**
         * @param {?} sub
         * @return {?}
         */
        sub => sub.unsubscribe()));
    }
}
ClrRadioContainer.decorators = [
    { type: Component, args: [{
                selector: 'clr-radio-container',
                template: `
    <ng-content select="label"></ng-content>
    <label *ngIf="!label && addGrid()"></label>
    <div class="clr-control-container" [class.clr-control-inline]="clrInline" [ngClass]="controlClass()">
      <ng-content select="clr-radio-wrapper"></ng-content>
      <div class="clr-subtext-wrapper">
        <ng-content select="clr-control-helper" *ngIf="!invalid"></ng-content>
        <clr-icon *ngIf="invalid" class="clr-validate-icon" shape="exclamation-circle" aria-hidden="true"></clr-icon>
        <ng-content select="clr-control-error" *ngIf="invalid"></ng-content>
      </div>
    </div>
    `,
                host: {
                    '[class.clr-form-control]': 'true',
                    '[class.clr-form-control-disabled]': 'control?.disabled',
                    '[class.clr-row]': 'addGrid()',
                },
                providers: [NgControlService, ControlClassService, IfErrorService]
            }] }
];
/** @nocollapse */
ClrRadioContainer.ctorParameters = () => [
    { type: IfErrorService },
    { type: LayoutService, decorators: [{ type: Optional }] },
    { type: ControlClassService },
    { type: NgControlService }
];
ClrRadioContainer.propDecorators = {
    label: [{ type: ContentChild, args: [ClrLabel,] }],
    clrInline: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrRadioModule {
}
ClrRadioModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, ClrCommonFormsModule, ClrHostWrappingModule, ClrIconModule],
                declarations: [ClrRadio, ClrRadioContainer, ClrRadioWrapper],
                exports: [ClrCommonFormsModule, ClrRadio, ClrRadioContainer, ClrRadioWrapper],
                entryComponents: [ClrRadioWrapper],
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrSelectContainer {
    /**
     * @param {?} ifErrorService
     * @param {?} layoutService
     * @param {?} controlClassService
     * @param {?} ngControlService
     */
    constructor(ifErrorService, layoutService, controlClassService, ngControlService) {
        this.ifErrorService = ifErrorService;
        this.layoutService = layoutService;
        this.controlClassService = controlClassService;
        this.ngControlService = ngControlService;
        this.subscriptions = [];
        this.invalid = false;
        this._dynamic = false;
        this.multi = false;
        this.subscriptions.push(this.ifErrorService.statusChanges.subscribe((/**
         * @param {?} invalid
         * @return {?}
         */
        invalid => {
            this.invalid = invalid;
        })));
        this.subscriptions.push(this.ngControlService.controlChanges.subscribe((/**
         * @param {?} control
         * @return {?}
         */
        control => {
            if (control) {
                this.multi = control.valueAccessor instanceof SelectMultipleControlValueAccessor;
                this.control = control;
            }
        })));
    }
    /**
     * @return {?}
     */
    wrapperClass() {
        return this.multi ? 'clr-multiselect-wrapper' : 'clr-select-wrapper';
    }
    /**
     * @return {?}
     */
    controlClass() {
        return this.controlClassService.controlClass(this.invalid, this.addGrid());
    }
    /**
     * @return {?}
     */
    addGrid() {
        if (this.layoutService && !this.layoutService.isVertical()) {
            return true;
        }
        return false;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.subscriptions) {
            this.subscriptions.map((/**
             * @param {?} sub
             * @return {?}
             */
            sub => sub.unsubscribe()));
        }
    }
}
ClrSelectContainer.decorators = [
    { type: Component, args: [{
                selector: 'clr-select-container',
                template: `    
        <ng-content select="label"></ng-content>
        <label *ngIf="!label && addGrid()"></label>
        <div class="clr-control-container" [ngClass]="controlClass()">
            <div [ngClass]="wrapperClass()">
                <ng-content select="[clrSelect]"></ng-content>
                <clr-icon *ngIf="invalid" class="clr-validate-icon" shape="exclamation-circle" aria-hidden="true"></clr-icon>
            </div>
            <ng-content select="clr-control-helper" *ngIf="!invalid"></ng-content>
            <ng-content select="clr-control-error" *ngIf="invalid"></ng-content>
        </div>
    `,
                host: {
                    '[class.clr-form-control]': 'true',
                    '[class.clr-form-control-disabled]': 'control?.disabled',
                    '[class.clr-row]': 'addGrid()',
                },
                providers: [IfErrorService, NgControlService, ControlIdService, ControlClassService]
            }] }
];
/** @nocollapse */
ClrSelectContainer.ctorParameters = () => [
    { type: IfErrorService },
    { type: LayoutService, decorators: [{ type: Optional }] },
    { type: ControlClassService },
    { type: NgControlService }
];
ClrSelectContainer.propDecorators = {
    label: [{ type: ContentChild, args: [ClrLabel,] }],
    multiple: [{ type: ContentChild, args: [SelectMultipleControlValueAccessor,] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrSelect extends WrappedFormControl {
    /**
     * @param {?} vcr
     * @param {?} injector
     * @param {?} control
     * @param {?} renderer
     * @param {?} el
     */
    constructor(vcr, injector, control, renderer, el) {
        super(vcr, ClrSelectContainer, injector, control, renderer, el);
        this.index = 1;
    }
}
ClrSelect.decorators = [
    { type: Directive, args: [{ selector: '[clrSelect]', host: { '[class.clr-select]': 'true' } },] }
];
/** @nocollapse */
ClrSelect.ctorParameters = () => [
    { type: ViewContainerRef },
    { type: Injector },
    { type: NgControl, decorators: [{ type: Self }, { type: Optional }] },
    { type: Renderer2 },
    { type: ElementRef }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrSelectModule {
}
ClrSelectModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, FormsModule, ClrIconModule, ClrCommonFormsModule],
                declarations: [ClrSelect, ClrSelectContainer],
                exports: [ClrCommonFormsModule, ClrSelect, ClrSelectContainer],
                entryComponents: [ClrSelectContainer],
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrTextareaContainer {
    /**
     * @param {?} ifErrorService
     * @param {?} layoutService
     * @param {?} controlClassService
     * @param {?} ngControlService
     */
    constructor(ifErrorService, layoutService, controlClassService, ngControlService) {
        this.ifErrorService = ifErrorService;
        this.layoutService = layoutService;
        this.controlClassService = controlClassService;
        this.ngControlService = ngControlService;
        this.subscriptions = [];
        this.invalid = false;
        this._dynamic = false;
        this.subscriptions.push(this.ifErrorService.statusChanges.subscribe((/**
         * @param {?} invalid
         * @return {?}
         */
        invalid => {
            this.invalid = invalid;
        })));
        this.subscriptions.push(this.ngControlService.controlChanges.subscribe((/**
         * @param {?} control
         * @return {?}
         */
        control => {
            this.control = control;
        })));
    }
    /**
     * @return {?}
     */
    controlClass() {
        return this.controlClassService.controlClass(this.invalid, this.addGrid());
    }
    /**
     * @return {?}
     */
    addGrid() {
        if (this.layoutService && !this.layoutService.isVertical()) {
            return true;
        }
        return false;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.subscriptions) {
            this.subscriptions.map((/**
             * @param {?} sub
             * @return {?}
             */
            sub => sub.unsubscribe()));
        }
    }
}
ClrTextareaContainer.decorators = [
    { type: Component, args: [{
                selector: 'clr-textarea-container',
                template: `
        <ng-content select="label"></ng-content>
        <label *ngIf="!label && addGrid()"></label>
        <div class="clr-control-container" [ngClass]="controlClass()">
            <div class="clr-textarea-wrapper">
                <ng-content select="[clrTextarea]"></ng-content>
                <clr-icon *ngIf="invalid" class="clr-validate-icon" shape="exclamation-circle" aria-hidden="true"></clr-icon>
            </div>
            <ng-content select="clr-control-helper" *ngIf="!invalid"></ng-content>
            <ng-content select="clr-control-error" *ngIf="invalid"></ng-content>
        </div>
    `,
                host: {
                    '[class.clr-form-control]': 'true',
                    '[class.clr-form-control-disabled]': 'control?.disabled',
                    '[class.clr-row]': 'addGrid()',
                },
                providers: [IfErrorService, NgControlService, ControlIdService, ControlClassService]
            }] }
];
/** @nocollapse */
ClrTextareaContainer.ctorParameters = () => [
    { type: IfErrorService },
    { type: LayoutService, decorators: [{ type: Optional }] },
    { type: ControlClassService },
    { type: NgControlService }
];
ClrTextareaContainer.propDecorators = {
    label: [{ type: ContentChild, args: [ClrLabel,] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrTextarea extends WrappedFormControl {
    /**
     * @param {?} vcr
     * @param {?} injector
     * @param {?} control
     * @param {?} renderer
     * @param {?} el
     */
    constructor(vcr, injector, control, renderer, el) {
        super(vcr, ClrTextareaContainer, injector, control, renderer, el);
        this.index = 1;
    }
}
ClrTextarea.decorators = [
    { type: Directive, args: [{ selector: '[clrTextarea]', host: { '[class.clr-textarea]': 'true' } },] }
];
/** @nocollapse */
ClrTextarea.ctorParameters = () => [
    { type: ViewContainerRef },
    { type: Injector },
    { type: NgControl, decorators: [{ type: Self }, { type: Optional }] },
    { type: Renderer2 },
    { type: ElementRef }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrTextareaModule {
}
ClrTextareaModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, FormsModule, ClrIconModule, ClrCommonFormsModule],
                declarations: [ClrTextarea, ClrTextareaContainer],
                exports: [ClrCommonFormsModule, ClrTextarea, ClrTextareaContainer],
                entryComponents: [ClrTextareaContainer],
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrFormsModule {
}
ClrFormsModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [
                    ClrCommonFormsModule,
                    ClrCheckboxModule,
                    ClrDatepickerModule,
                    ClrInputModule,
                    ClrPasswordModule,
                    ClrRadioModule,
                    ClrSelectModule,
                    ClrTextareaModule,
                ],
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const CLR_LOADING_DIRECTIVES = [ClrLoading];
class ClrLoadingModule {
}
ClrLoadingModule.decorators = [
    { type: NgModule, args: [{ imports: [CommonModule], declarations: [CLR_LOADING_DIRECTIVES], exports: [CLR_LOADING_DIRECTIVES] },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class OutsideClick {
    /**
     * @param {?} el
     */
    constructor(el) {
        this.el = el;
        this.strict = false;
        this.outsideClick = new EventEmitter(false);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    documentClick(event) {
        /** @type {?} */
        const target = event.target;
        // Get the element in the DOM on which the mouse was clicked
        /** @type {?} */
        const host = this.el.nativeElement;
        if (target === host) {
            return;
        }
        if (!this.strict && host.contains(target)) {
            return;
        }
        this.outsideClick.emit(event);
    }
}
OutsideClick.decorators = [
    { type: Directive, args: [{ selector: '[clrOutsideClick]' },] }
];
/** @nocollapse */
OutsideClick.ctorParameters = () => [
    { type: ElementRef }
];
OutsideClick.propDecorators = {
    strict: [{ type: Input, args: ['clrStrict',] }],
    outsideClick: [{ type: Output, args: ['clrOutsideClick',] }],
    documentClick: [{ type: HostListener, args: ['document:click', ['$event'],] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const OUSTIDE_CLICK_DIRECTIVES = [OutsideClick];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrOutsideClickModule {
}
ClrOutsideClickModule.decorators = [
    { type: NgModule, args: [{ imports: [CommonModule], declarations: [OUSTIDE_CLICK_DIRECTIVES], exports: [OUSTIDE_CLICK_DIRECTIVES] },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DomAdapter {
    /**
     * @param {?} element
     * @return {?}
     */
    userDefinedWidth(element) {
        element.classList.add('datagrid-cell-width-zero');
        /** @type {?} */
        const userDefinedWidth = this.clientRect(element).width;
        element.classList.remove('datagrid-cell-width-zero');
        return userDefinedWidth;
    }
    /**
     * @param {?} element
     * @return {?}
     */
    scrollBarWidth(element) {
        return element.offsetWidth - element.clientWidth;
    }
    /**
     * @param {?} element
     * @return {?}
     */
    scrollWidth(element) {
        return element.scrollWidth || 0;
    }
    /**
     * @param {?} element
     * @return {?}
     */
    computedHeight(element) {
        return parseInt(getComputedStyle(element).getPropertyValue('height'), 10);
    }
    /**
     * @param {?} element
     * @return {?}
     */
    clientRect(element) {
        /** @type {?} */
        const elementClientRect = element.getBoundingClientRect();
        return {
            top: parseInt(elementClientRect.top, 10),
            bottom: parseInt(elementClientRect.bottom, 10),
            left: parseInt(elementClientRect.left, 10),
            right: parseInt(elementClientRect.right, 10),
            width: parseInt(elementClientRect.width, 10),
            height: parseInt(elementClientRect.height, 10),
        };
    }
    /**
     * @param {?} element
     * @return {?}
     */
    minWidth(element) {
        return parseInt(getComputedStyle(element).getPropertyValue('min-width'), 10);
    }
    /**
     * @param {?} element
     * @return {?}
     */
    focus(element) {
        element.focus();
    }
}
DomAdapter.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// This class is used to convert an internal event
// to an external event to be emitted.
/**
 * @template T
 */
class ClrDragEvent {
    /**
     * @param {?} dragEvent
     */
    constructor(dragEvent) {
        this.dragPosition = dragEvent.dragPosition;
        this.group = dragEvent.group;
        this.dragDataTransfer = dragEvent.dragDataTransfer;
        this.dropPointPosition = dragEvent.dropPointPosition;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {number} */
const DragEventType = {
    DRAG_START: 0,
    DRAG_MOVE: 1,
    DRAG_END: 2,
    DRAG_ENTER: 3,
    DRAG_LEAVE: 4,
    DROP: 5,
};
DragEventType[DragEventType.DRAG_START] = 'DRAG_START';
DragEventType[DragEventType.DRAG_MOVE] = 'DRAG_MOVE';
DragEventType[DragEventType.DRAG_END] = 'DRAG_END';
DragEventType[DragEventType.DRAG_ENTER] = 'DRAG_ENTER';
DragEventType[DragEventType.DRAG_LEAVE] = 'DRAG_LEAVE';
DragEventType[DragEventType.DROP] = 'DROP';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
class DragAndDropEventBusService {
    constructor() {
        this.dragStart = new Subject();
        this.dragMove = new Subject();
        this.dragEnd = new Subject();
        this.drop = new Subject();
    }
    /**
     * @return {?}
     */
    get dragStarted() {
        return this.dragStart.asObservable();
    }
    /**
     * @return {?}
     */
    get dragMoved() {
        return this.dragMove.asObservable();
    }
    /**
     * @return {?}
     */
    get dragEnded() {
        return this.dragEnd.asObservable();
    }
    /**
     * @return {?}
     */
    get dropped() {
        return this.drop.asObservable();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    broadcast(event) {
        switch (event.type) {
            case DragEventType.DRAG_START:
                this.dragStart.next(event);
                break;
            case DragEventType.DRAG_MOVE:
                this.dragMove.next(event);
                break;
            case DragEventType.DRAG_END:
                this.dragEnd.next(event);
                break;
            case DragEventType.DROP:
                this.drop.next(event);
                break;
            default:
                break;
        }
    }
}
DragAndDropEventBusService.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */ DragAndDropEventBusService.ngInjectableDef = ɵɵdefineInjectable({ factory: function DragAndDropEventBusService_Factory() { return new DragAndDropEventBusService(); }, token: DragAndDropEventBusService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
class DragEventListenerService {
    /**
     * @param {?} ngZone
     * @param {?} renderer
     * @param {?} eventBus
     */
    constructor(ngZone, renderer, eventBus) {
        this.ngZone = ngZone;
        this.renderer = renderer;
        this.eventBus = eventBus;
        this.dragStart = new Subject();
        this.dragMove = new Subject();
        this.dragEnd = new Subject();
        this.hasDragStarted = false;
    }
    /**
     * @return {?}
     */
    get dragStarted() {
        return this.dragStart.asObservable();
    }
    /**
     * @return {?}
     */
    get dragMoved() {
        return this.dragMove.asObservable();
    }
    /**
     * @return {?}
     */
    get dragEnded() {
        return this.dragEnd.asObservable();
    }
    /**
     * @param {?} draggableEl
     * @return {?}
     */
    attachDragListeners(draggableEl) {
        this.draggableEl = draggableEl;
        this.listeners = [
            this.customDragEvent(this.draggableEl, 'mousedown', 'mousemove', 'mouseup'),
            this.customDragEvent(this.draggableEl, 'touchstart', 'touchmove', 'touchend'),
        ];
    }
    /**
     * @return {?}
     */
    detachDragListeners() {
        if (this.listeners) {
            this.listeners.map((/**
             * @param {?} event
             * @return {?}
             */
            event => event()));
        }
        // In most cases, once users start dragging with mousedown/touchstart events,
        // they will end dragging at one point with mouseup/touchend.
        // However, there might be a few cases where mousedown/touchstart events get registered,
        // but the draggable element gets removed before user ends dragging.
        // In that case, we need to remove the attached listeners that happened during the mousedown/touchstart events.
        if (this.nestedListeners) {
            this.nestedListeners.map((/**
             * @param {?} event
             * @return {?}
             */
            event => event()));
        }
    }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    getNativeEventObject(event) {
        if (((/** @type {?} */ (event))).hasOwnProperty('changedTouches')) {
            return ((/** @type {?} */ (event))).changedTouches[0];
        }
        else {
            return event;
        }
    }
    /**
     * @private
     * @param {?} element
     * @param {?} startOnEvent
     * @param {?} moveOnEvent
     * @param {?} endOnEvent
     * @return {?}
     */
    customDragEvent(element, startOnEvent, moveOnEvent, endOnEvent) {
        return this.renderer.listen(element, startOnEvent, (/**
         * @param {?} startEvent
         * @return {?}
         */
        (startEvent) => {
            // save the initial point to initialPosition
            // this will be used to calculate how far the draggable has been dragged from its initial position
            this.initialPosition = {
                pageX: this.getNativeEventObject(startEvent).pageX,
                pageY: this.getNativeEventObject(startEvent).pageY,
            };
            // Initialize nested listeners' property with a new empty array;
            this.nestedListeners = [];
            // This is needed to disable selection during dragging (especially in EDGE/IE11).
            this.nestedListeners.push(this.renderer.listen('document', 'selectstart', (/**
             * @param {?} selectEvent
             * @return {?}
             */
            (selectEvent) => {
                selectEvent.preventDefault();
                selectEvent.stopImmediatePropagation();
            })));
            // Listen to mousemove/touchmove events outside of angular zone.
            this.nestedListeners.push(this.ngZone.runOutsideAngular((/**
             * @return {?}
             */
            () => {
                return this.renderer.listen('document', moveOnEvent, (/**
                 * @param {?} moveEvent
                 * @return {?}
                 */
                (moveEvent) => {
                    // Event.stopImmediatePropagation() is needed here to prevent nested draggables from getting dragged
                    // altogether. We shouldn't use Event.stopPropagation() here as we are listening to the events
                    // on the global element level.
                    // With Event.stopImmediatePropagation(), it registers the events sent from the inner most draggable
                    // first. Then immediately after that, it stops listening to the same type of events on the same
                    // element. So this will help us to not register the same events that would come from the parent
                    // level draggables eventually.
                    moveEvent.stopImmediatePropagation();
                    if (!this.hasDragStarted) {
                        this.hasDragStarted = true;
                        // Fire "dragstart"
                        this.broadcast(moveEvent, DragEventType.DRAG_START);
                    }
                    else {
                        // Fire "dragmove"
                        this.broadcast(moveEvent, DragEventType.DRAG_MOVE);
                    }
                }));
            })));
            // Listen to mouseup/touchend events.
            this.nestedListeners.push(this.renderer.listen('document', endOnEvent, (/**
             * @param {?} endEvent
             * @return {?}
             */
            (endEvent) => {
                if (this.hasDragStarted) {
                    // Fire "dragend" only if dragstart is registered
                    this.hasDragStarted = false;
                    this.broadcast(endEvent, DragEventType.DRAG_END);
                }
                // We must remove the the nested listeners every time drag completes.
                if (this.nestedListeners) {
                    this.nestedListeners.map((/**
                     * @param {?} event
                     * @return {?}
                     */
                    event => event()));
                }
            })));
        }));
    }
    /**
     * @private
     * @param {?} event
     * @param {?} eventType
     * @return {?}
     */
    broadcast(event, eventType) {
        /** @type {?} */
        const dragEvent = this.generateDragEvent(event, eventType);
        switch (dragEvent.type) {
            case DragEventType.DRAG_START:
                this.dragStart.next(dragEvent);
                break;
            case DragEventType.DRAG_MOVE:
                this.dragMove.next(dragEvent);
                break;
            case DragEventType.DRAG_END:
                this.dragEnd.next(dragEvent);
                break;
            default:
                break;
        }
        // The following properties are set after they are broadcasted to the DraggableGhost component.
        dragEvent.ghostElement = this.ghostElement;
        dragEvent.dropPointPosition = this.dropPointPosition;
        this.eventBus.broadcast(dragEvent);
    }
    /**
     * @private
     * @param {?} event
     * @param {?} eventType
     * @return {?}
     */
    generateDragEvent(event, eventType) {
        /** @type {?} */
        const nativeEvent = this.getNativeEventObject(event);
        return {
            type: eventType,
            dragPosition: {
                pageX: nativeEvent.pageX,
                pageY: nativeEvent.pageY,
                moveX: nativeEvent.pageX - this.initialPosition.pageX,
                moveY: nativeEvent.pageY - this.initialPosition.pageY,
            },
            group: this.group,
            dragDataTransfer: this.dragDataTransfer,
            ghostElement: this.ghostElement,
        };
    }
}
DragEventListenerService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
DragEventListenerService.ctorParameters = () => [
    { type: NgZone },
    { type: Renderer2 },
    { type: DragAndDropEventBusService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// This service is used to capture the state of clrDraggable element
// at a certain event and passes it to clrDraggableGhost component.
/**
 * @template T
 */
class DraggableSnapshotService {
    /**
     * @param {?} domAdapter
     */
    constructor(domAdapter) {
        this.domAdapter = domAdapter;
    }
    /**
     * @param {?} el
     * @param {?} event
     * @return {?}
     */
    capture(el, event) {
        this.draggableElClientRect = this.domAdapter.clientRect(el);
        this.snapshotDragEvent = event;
    }
    /**
     * @return {?}
     */
    discard() {
        delete this.draggableElClientRect;
        delete this.snapshotDragEvent;
    }
    /**
     * @return {?}
     */
    get hasDraggableState() {
        return !!this.snapshotDragEvent && !!this.draggableElClientRect;
    }
    /**
     * @return {?}
     */
    get clientRect() {
        return this.draggableElClientRect;
    }
    /**
     * @return {?}
     */
    get dragEvent() {
        return this.snapshotDragEvent;
    }
}
DraggableSnapshotService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
DraggableSnapshotService.ctorParameters = () => [
    { type: DomAdapter }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
class ClrDraggableGhost {
    /**
     * @param {?} el
     * @param {?} dragEventListener
     * @param {?} draggableSnapshot
     * @param {?} renderer
     * @param {?} ngZone
     */
    constructor(el, dragEventListener, draggableSnapshot, renderer, ngZone) {
        this.el = el;
        this.dragEventListener = dragEventListener;
        this.draggableSnapshot = draggableSnapshot;
        this.renderer = renderer;
        this.ngZone = ngZone;
        this.subscriptions = [];
        this.leaveAnimConfig = { value: 0, params: { top: '0px', left: '0px' } };
        if (!this.dragEventListener || !this.draggableSnapshot) {
            throw new Error('The clr-draggable-ghost component can only be used inside of a clrDraggable directive.');
        }
        this.draggableGhostEl = this.el.nativeElement;
        // Need to use Renderer2 as it runs outside of NgZone
        this.renderer.addClass(this.draggableGhostEl, 'draggable-ghost');
        // Register the ghost element in DragEventListener to pass in a ClrDragEvent.
        this.dragEventListener.ghostElement = this.draggableGhostEl;
        // Default ghost size gets the size of ClrDraggable element.
        this.setDefaultGhostSize(this.draggableGhostEl);
        /** @type {?} */
        const offset = {
            top: this.draggableSnapshot.hasDraggableState
                ? this.draggableSnapshot.dragEvent.dragPosition.pageY - this.draggableSnapshot.clientRect.top
                : 0,
            left: this.draggableSnapshot.hasDraggableState
                ? this.draggableSnapshot.dragEvent.dragPosition.pageX - this.draggableSnapshot.clientRect.left
                : 0,
        };
        /** @type {?} */
        let isAnimationConfigured = false;
        this.subscriptions.push(this.dragEventListener.dragMoved.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            // On the first drag move event, we configure the animation as it's dependent on the first drag event.
            if (!isAnimationConfigured) {
                if (this.draggableSnapshot.hasDraggableState) {
                    this.animateToOnLeave(`${this.draggableSnapshot.clientRect.top}px`, `${this.draggableSnapshot.clientRect.left}px`);
                }
                else {
                    this.animateToOnLeave(`${event.dragPosition.pageY}px`, `${event.dragPosition.pageX}px`);
                }
                isAnimationConfigured = true;
            }
            // Position the draggable ghost.
            /** @type {?} */
            const topLeftPosition = this.findTopLeftPosition(event.dragPosition, offset);
            this.setPositionStyle(this.draggableGhostEl, topLeftPosition.pageX, topLeftPosition.pageY);
            this.dragEventListener.dropPointPosition = this.findDropPointPosition(topLeftPosition);
        })));
    }
    /**
     * @private
     * @param {?} el
     * @return {?}
     */
    setDefaultGhostSize(el) {
        if (this.draggableSnapshot.hasDraggableState) {
            this.setSizeStyle(el, this.draggableSnapshot.clientRect.width, this.draggableSnapshot.clientRect.height);
        }
    }
    /**
     * @private
     * @param {?} top
     * @param {?} left
     * @return {?}
     */
    animateToOnLeave(top, left) {
        this.ngZone.run((/**
         * @return {?}
         */
        () => {
            this.leaveAnimConfig = { value: 0, params: { top: top, left: left } };
        }));
    }
    /**
     * @private
     * @param {?} dragPosition
     * @param {?} offset
     * @return {?}
     */
    findTopLeftPosition(dragPosition, offset) {
        return { pageX: dragPosition.pageX - offset.left, pageY: dragPosition.pageY - offset.top };
    }
    /**
     * @private
     * @param {?} topLeftPosition
     * @return {?}
     */
    findDropPointPosition(topLeftPosition) {
        if (this.draggableSnapshot.hasDraggableState) {
            return {
                pageX: topLeftPosition.pageX + this.draggableSnapshot.clientRect.width / 2,
                pageY: topLeftPosition.pageY + this.draggableSnapshot.clientRect.height / 2,
            };
        }
        else {
            return topLeftPosition;
        }
    }
    /**
     * @private
     * @param {?} el
     * @param {?} width
     * @param {?} height
     * @return {?}
     */
    setSizeStyle(el, width, height) {
        this.renderer.setStyle(el, 'width', `${width}px`);
        this.renderer.setStyle(el, 'height', `${height}px`);
    }
    /**
     * @private
     * @param {?} el
     * @param {?} left
     * @param {?} top
     * @return {?}
     */
    setPositionStyle(el, left, top) {
        this.renderer.setStyle(el, 'left', `${left}px`);
        this.renderer.setStyle(el, 'top', `${top}px`);
        this.renderer.setStyle(el, 'visibility', 'visible');
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        (sub) => sub.unsubscribe()));
    }
}
ClrDraggableGhost.decorators = [
    { type: Component, args: [{
                selector: 'clr-draggable-ghost',
                template: `<ng-content></ng-content>`,
                animations: [
                    trigger('leaveAnimation', [
                        transition(':leave', [
                            style({ left: '*', top: '*' }),
                            animate('0.2s ease-in-out', style({ top: '{{top}}', left: '{{left}}' })),
                        ]),
                    ]),
                ]
            }] }
];
/** @nocollapse */
ClrDraggableGhost.ctorParameters = () => [
    { type: ElementRef },
    { type: DragEventListenerService, decorators: [{ type: Optional }] },
    { type: DraggableSnapshotService, decorators: [{ type: Optional }] },
    { type: Renderer2 },
    { type: NgZone }
];
ClrDraggableGhost.propDecorators = {
    leaveAnimConfig: [{ type: HostBinding, args: ['@leaveAnimation',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// This structural directive will be used mainly together with `clr-draggable-ghost` directive inside of clrDraggable
// directive. The directive is responsible for instantiating `clr-draggable-ghost` directive only during dragging so
// that Angular Change Detection is prevented from running if a component or directive is placed inside of the
// `clr-draggable-ghost` directive.
/**
 * @template T
 */
class ClrIfDragged {
    /**
     * @param {?} template
     * @param {?} container
     * @param {?} dragEventListener
     */
    constructor(template, container, dragEventListener) {
        this.template = template;
        this.container = container;
        this.dragEventListener = dragEventListener;
        this.subscriptions = [];
        if (!this.dragEventListener || !this.container) {
            throw new Error('The *clrIfDragged directive can only be used inside of a clrDraggable directive.');
        }
        this.subscriptions.push(this.dragEventListener.dragStarted.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            this.container.createEmbeddedView(this.template);
        })));
        this.subscriptions.push(this.dragEventListener.dragEnded.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            this.container.clear();
        })));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        (sub) => sub.unsubscribe()));
    }
}
ClrIfDragged.decorators = [
    { type: Directive, args: [{ selector: '[clrIfDragged]' },] }
];
/** @nocollapse */
ClrIfDragged.ctorParameters = () => [
    { type: TemplateRef },
    { type: ViewContainerRef, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: DragEventListenerService, decorators: [{ type: Optional }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// This provider registers the drag handle element.
// When it registers a element as a drag handle, it attaches that element to the listeners from ClrDragEventListener.
// Also, it adds the "drag-handle" css class to the registered element through Renderer.
/**
 * @template T
 */
class DragHandleRegistrarService {
    /**
     * @param {?} dragEventListener
     * @param {?} renderer
     */
    constructor(dragEventListener, renderer) {
        this.dragEventListener = dragEventListener;
        this.renderer = renderer;
    }
    /**
     * @return {?}
     */
    get defaultHandleEl() {
        return this._defaultHandleEl;
    }
    /**
     * @param {?} el
     * @return {?}
     */
    set defaultHandleEl(el) {
        this._defaultHandleEl = el; // defaultHandleEl will be usually the clrDraggable element.
        // If the customHandleEl has been registered,
        // don't make the defaultHandleEl the drag handle yet until the customHandleEl is unregistered.
        if (!this._customHandleEl) {
            this.makeElementHandle(this._defaultHandleEl);
        }
    }
    /**
     * @private
     * @param {?} el
     * @return {?}
     */
    makeElementHandle(el) {
        if (this._defaultHandleEl && this._defaultHandleEl !== el) {
            // Before making an element the custom handle element,
            // we should remove the existing drag-handle class from the draggable element.
            this.renderer.removeClass(this._defaultHandleEl, 'drag-handle');
        }
        this.dragEventListener.attachDragListeners(el);
        this.renderer.addClass(el, 'drag-handle');
    }
    /**
     * @return {?}
     */
    get customHandleEl() {
        return this._customHandleEl;
    }
    /**
     * @param {?} el
     * @return {?}
     */
    registerCustomHandle(el) {
        this.dragEventListener.detachDragListeners(); // removes the existing listeners
        this._customHandleEl = el;
        this.makeElementHandle(this._customHandleEl);
    }
    /**
     * @return {?}
     */
    unregisterCustomHandle() {
        this.dragEventListener.detachDragListeners(); // removes the existing listeners
        this.renderer.removeClass(this._customHandleEl, 'drag-handle');
        delete this._customHandleEl;
        // if default handle is set, make that handle
        if (this._defaultHandleEl) {
            this.makeElementHandle(this._defaultHandleEl);
        }
    }
}
DragHandleRegistrarService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
DragHandleRegistrarService.ctorParameters = () => [
    { type: DragEventListenerService },
    { type: Renderer2 }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// This service class adds and removes the "in-drag" class to the document body element
// through its public enter() and exit() methods.
class GlobalDragModeService {
    /**
     * @param {?} renderer
     */
    constructor(renderer) {
        this.renderer = renderer;
    }
    /**
     * @return {?}
     */
    enter() {
        this.renderer.addClass(document.body, 'in-drag');
    }
    /**
     * @return {?}
     */
    exit() {
        this.renderer.removeClass(document.body, 'in-drag');
    }
}
GlobalDragModeService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
GlobalDragModeService.ctorParameters = () => [
    { type: Renderer2 }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
class ClrDraggable {
    /**
     * @param {?} el
     * @param {?} dragEventListener
     * @param {?} dragHandleRegistrar
     * @param {?} viewContainerRef
     * @param {?} cfr
     * @param {?} injector
     * @param {?} draggableSnapshot
     * @param {?} globalDragMode
     */
    constructor(el, dragEventListener, dragHandleRegistrar, viewContainerRef, cfr, injector, draggableSnapshot, globalDragMode) {
        this.el = el;
        this.dragEventListener = dragEventListener;
        this.dragHandleRegistrar = dragHandleRegistrar;
        this.viewContainerRef = viewContainerRef;
        this.cfr = cfr;
        this.injector = injector;
        this.draggableSnapshot = draggableSnapshot;
        this.globalDragMode = globalDragMode;
        this.subscriptions = [];
        this.dragOn = false;
        this.dragStartEmitter = new EventEmitter();
        this.dragMoveEmitter = new EventEmitter();
        this.dragEndEmitter = new EventEmitter();
        this.draggableEl = this.el.nativeElement;
        this.componentFactory = this.cfr.resolveComponentFactory(ClrDraggableGhost);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set dataTransfer(value) {
        this.dragEventListener.dragDataTransfer = value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set group(value) {
        this.dragEventListener.group = value;
    }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    createDefaultGhost(event) {
        this.draggableSnapshot.capture(this.draggableEl, event);
        // NOTE: The default ghost element will appear
        // next to the clrDraggable in the DOM as a sibling element.
        this.viewContainerRef.createComponent(this.componentFactory, 0, this.injector, [
            [this.draggableEl.cloneNode(true)],
        ]);
    }
    /**
     * @private
     * @return {?}
     */
    destroyDefaultGhost() {
        this.viewContainerRef.clear();
        this.draggableSnapshot.discard();
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.dragHandleRegistrar.defaultHandleEl = this.draggableEl;
        this.subscriptions.push(this.dragEventListener.dragStarted.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            this.globalDragMode.enter();
            this.dragOn = true;
            if (!this.customGhost) {
                this.createDefaultGhost(event);
            }
            this.dragStartEmitter.emit(new ClrDragEvent(event));
        })));
        this.subscriptions.push(this.dragEventListener.dragMoved.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            this.dragMoveEmitter.emit(new ClrDragEvent(event));
        })));
        this.subscriptions.push(this.dragEventListener.dragEnded.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            this.globalDragMode.exit();
            this.dragOn = false;
            if (!this.customGhost) {
                this.destroyDefaultGhost();
            }
            this.dragEndEmitter.emit(new ClrDragEvent(event));
        })));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        (sub) => sub.unsubscribe()));
        this.dragEventListener.detachDragListeners();
    }
}
ClrDraggable.decorators = [
    { type: Directive, args: [{
                selector: '[clrDraggable]',
                providers: [
                    DragEventListenerService,
                    DragHandleRegistrarService,
                    DraggableSnapshotService,
                    GlobalDragModeService,
                    DomAdapter,
                ],
                host: { '[class.draggable]': 'true', '[class.being-dragged]': 'dragOn' },
            },] }
];
/** @nocollapse */
ClrDraggable.ctorParameters = () => [
    { type: ElementRef },
    { type: DragEventListenerService },
    { type: DragHandleRegistrarService },
    { type: ViewContainerRef },
    { type: ComponentFactoryResolver },
    { type: Injector },
    { type: DraggableSnapshotService },
    { type: GlobalDragModeService }
];
ClrDraggable.propDecorators = {
    customGhost: [{ type: ContentChild, args: [ClrIfDragged,] }],
    dataTransfer: [{ type: Input, args: ['clrDraggable',] }],
    group: [{ type: Input, args: ['clrGroup',] }],
    dragStartEmitter: [{ type: Output, args: ['clrDragStart',] }],
    dragMoveEmitter: [{ type: Output, args: ['clrDragMove',] }],
    dragEndEmitter: [{ type: Output, args: ['clrDragEnd',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
class ClrDroppable {
    /**
     * @param {?} el
     * @param {?} eventBus
     * @param {?} domAdapter
     * @param {?} renderer
     */
    constructor(el, eventBus, domAdapter, renderer) {
        this.el = el;
        this.eventBus = eventBus;
        this.domAdapter = domAdapter;
        this.renderer = renderer;
        this.isDraggableMatch = false;
        this._isDraggableOver = false;
        this._dropTolerance = { top: 0, right: 0, bottom: 0, left: 0 };
        this.dragStartEmitter = new EventEmitter();
        this.dragMoveEmitter = new EventEmitter();
        this.dragEndEmitter = new EventEmitter();
        this.dragLeaveEmitter = new EventEmitter();
        this.dragEnterEmitter = new EventEmitter();
        this.dropEmitter = new EventEmitter();
        this.droppableEl = this.el.nativeElement;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set isDraggableOver(value) {
        // We need to add/remove this draggable-over class via Renderer2
        // because isDraggableOver is set outside of NgZone.
        if (value) {
            this.renderer.addClass(this.droppableEl, 'draggable-over');
        }
        else {
            this.renderer.removeClass(this.droppableEl, 'draggable-over');
        }
        this._isDraggableOver = value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set group(value) {
        this._group = value;
    }
    /**
     * @private
     * @param {?=} top
     * @param {?=} right
     * @param {?=} bottom
     * @param {?=} left
     * @return {?}
     */
    dropToleranceGenerator(top = 0, right = top, bottom = top, left = right) {
        return { top, right, bottom, left };
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set dropTolerance(value) {
        // If user provides an object here and wants to manipulate/update properties individually,
        // the object must be immutable as we generate new object based user's given object.
        if (typeof value === 'number') {
            this._dropTolerance = this.dropToleranceGenerator(value);
        }
        else if (typeof value === 'string') {
            /** @type {?} */
            const toleranceValues = value
                .trim()
                .split(/\s+/)
                .map((/**
             * @param {?} tolerance
             * @return {?}
             */
            tolerance => parseInt(tolerance, 10)));
            this._dropTolerance = this.dropToleranceGenerator(...toleranceValues);
        }
        else if (value) {
            // The value could be passed in as {left: 20, top: 30 }
            // In this case, the rest of the direction properties should be 0.
            // That's why we initialize properties with 0 first, then override with user's given value.
            this._dropTolerance = Object.assign({}, this.dropToleranceGenerator(0), value);
        }
    }
    /**
     * @private
     * @param {?} subscription
     * @return {?}
     */
    unsubscribeFrom(subscription) {
        if (subscription) {
            subscription.unsubscribe();
        }
    }
    /**
     * @private
     * @param {?} draggableGroup
     * @return {?}
     */
    checkGroupMatch(draggableGroup) {
        // Both Draggable and Droppable have clrGroup input.
        // The clrGroup input can be both a string key or array of string keys in Draggable and Droppable.
        // It's not match if Draggable has no defined value assigned to clrGroup, but Droppable has a defined clrGroup.
        if (!draggableGroup && this._group) {
            return false;
        }
        // The same is true the other way round.
        if (!this._group && draggableGroup) {
            return false;
        }
        // It's match if both Draggable and Droppable have no assigned value for clrGroup.
        if (!this._group && !draggableGroup) {
            return true;
        }
        // It's match if both Draggable and Droppable have simple string keys that are matching.
        // It's match if Draggable's simple clrGroup key is matching with one of the clrGroup keys of Droppable. The
        // same is true the other way round.
        // it's match if one of the clrGroup keys of Droppable is matching with one of the clrGroup keys of Draggable.
        if (typeof draggableGroup === 'string') {
            if (typeof this._group === 'string') {
                return this._group === draggableGroup;
            }
            else {
                return this._group.indexOf(draggableGroup) > -1;
            }
        }
        else {
            if (typeof this._group === 'string') {
                return draggableGroup.indexOf(this._group) > -1;
            }
            else {
                return ((/** @type {?} */ (this._group))).some((/**
                 * @param {?} groupKey
                 * @return {?}
                 */
                groupKey => draggableGroup.indexOf(groupKey) > -1));
            }
        }
    }
    /**
     * @private
     * @param {?} point
     * @return {?}
     */
    isInDropArea(point) {
        if (!point) {
            return false;
        }
        if (!this.clientRect) {
            this.clientRect = this.domAdapter.clientRect(this.droppableEl);
        }
        if (point.pageX >= this.clientRect.left - this._dropTolerance.left &&
            point.pageX <= this.clientRect.right + this._dropTolerance.right &&
            point.pageY >= this.clientRect.top - this._dropTolerance.top &&
            point.pageY <= this.clientRect.bottom + this._dropTolerance.bottom) {
            return true;
        }
        else {
            return false;
        }
    }
    /**
     * @private
     * @param {?} dragStartEvent
     * @return {?}
     */
    onDragStart(dragStartEvent) {
        // Check draggable and droppable have a matching group key.
        this.isDraggableMatch = this.checkGroupMatch(dragStartEvent.group);
        // Subscribe to dragMoved and dragEnded only if draggable and droppable have a matching group key.
        if (this.isDraggableMatch) {
            this.dragStartEmitter.emit(new ClrDragEvent(dragStartEvent));
            this.dragMoveSubscription = this.eventBus.dragMoved.subscribe((/**
             * @param {?} dragMoveEvent
             * @return {?}
             */
            (dragMoveEvent) => {
                this.onDragMove(dragMoveEvent);
            }));
            this.dragEndSubscription = this.eventBus.dragEnded.subscribe((/**
             * @param {?} dragEndEvent
             * @return {?}
             */
            (dragEndEvent) => {
                this.onDragEnd(dragEndEvent);
            }));
        }
    }
    /**
     * @private
     * @param {?} dragMoveEvent
     * @return {?}
     */
    onDragMove(dragMoveEvent) {
        /** @type {?} */
        const isInDropArea = this.isInDropArea(dragMoveEvent.dropPointPosition);
        if (!this._isDraggableOver && isInDropArea) {
            this.isDraggableOver = true;
            /** @type {?} */
            const dragEnterEvent = Object.assign({}, dragMoveEvent, { type: DragEventType.DRAG_ENTER });
            this.eventBus.broadcast(dragEnterEvent);
            this.dragEnterEmitter.emit(new ClrDragEvent(dragEnterEvent));
        }
        else if (this._isDraggableOver && !isInDropArea) {
            this.isDraggableOver = false;
            /** @type {?} */
            const dragLeaveEvent = Object.assign({}, dragMoveEvent, { type: DragEventType.DRAG_LEAVE });
            this.eventBus.broadcast(dragLeaveEvent);
            this.dragLeaveEmitter.emit(new ClrDragEvent(dragLeaveEvent));
        }
        this.dragMoveEmitter.emit(new ClrDragEvent(dragMoveEvent));
    }
    /**
     * @private
     * @param {?} dragEndEvent
     * @return {?}
     */
    onDragEnd(dragEndEvent) {
        if (this._isDraggableOver) {
            if (dragEndEvent.ghostElement) {
                // By this point, the draggable ghost component is destroyed,
                // but the element would be active until its animation completes.
                // As such, once the ghost is dropped over, we will give it "dropped" class.
                // This process cannot be done in the ghost component
                // because any subscription to the drop event is ineffective or invalid
                // as the component had been already destroyed.
                this.renderer.addClass(dragEndEvent.ghostElement, 'dropped');
            }
            /** @type {?} */
            const dropEvent = Object.assign({}, dragEndEvent, { type: DragEventType.DROP });
            this.eventBus.broadcast(dropEvent);
            this.dropEmitter.emit(new ClrDragEvent(dropEvent));
            this.isDraggableOver = false;
        }
        this.dragEndEmitter.emit(new ClrDragEvent(dragEndEvent));
        this.unsubscribeFrom(this.dragMoveSubscription);
        this.unsubscribeFrom(this.dragEndSubscription);
        this.isDraggableMatch = false;
        delete this.clientRect;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.dragStartSubscription = this.eventBus.dragStarted.subscribe((/**
         * @param {?} dragStartEvent
         * @return {?}
         */
        (dragStartEvent) => {
            this.onDragStart(dragStartEvent);
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.unsubscribeFrom(this.dragStartSubscription);
        this.unsubscribeFrom(this.dragMoveSubscription);
        this.unsubscribeFrom(this.dragEndSubscription);
    }
}
ClrDroppable.decorators = [
    { type: Directive, args: [{
                selector: '[clrDroppable]',
                providers: [DomAdapter],
                host: { '[class.droppable]': 'true', '[class.draggable-match]': 'isDraggableMatch' },
            },] }
];
/** @nocollapse */
ClrDroppable.ctorParameters = () => [
    { type: ElementRef },
    { type: DragAndDropEventBusService },
    { type: DomAdapter },
    { type: Renderer2 }
];
ClrDroppable.propDecorators = {
    group: [{ type: Input, args: ['clrGroup',] }],
    dropTolerance: [{ type: Input, args: ['clrDropTolerance',] }],
    dragStartEmitter: [{ type: Output, args: ['clrDragStart',] }],
    dragMoveEmitter: [{ type: Output, args: ['clrDragMove',] }],
    dragEndEmitter: [{ type: Output, args: ['clrDragEnd',] }],
    dragLeaveEmitter: [{ type: Output, args: ['clrDragLeave',] }],
    dragEnterEmitter: [{ type: Output, args: ['clrDragEnter',] }],
    dropEmitter: [{ type: Output, args: ['clrDrop',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
class ClrDragHandle {
    /**
     * @param {?} el
     * @param {?} dragHandleRegistrar
     */
    constructor(el, dragHandleRegistrar) {
        this.el = el;
        this.dragHandleRegistrar = dragHandleRegistrar;
        if (!this.dragHandleRegistrar) {
            // ClrDragHandleRegistrar is provided in ClrDraggable so we expect it to be present here
            // as clrDragHandle is required to be used only inside of a clrDraggable directive.
            throw new Error('The clrDragHandle directive can only be used inside of a clrDraggable directive.');
        }
        this.dragHandleRegistrar.registerCustomHandle(this.el.nativeElement);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.dragHandleRegistrar.unregisterCustomHandle();
    }
}
ClrDragHandle.decorators = [
    { type: Directive, args: [{ selector: '[clrDragHandle]', host: { '[class.drag-handle]': 'true' } },] }
];
/** @nocollapse */
ClrDragHandle.ctorParameters = () => [
    { type: ElementRef },
    { type: DragHandleRegistrarService, decorators: [{ type: Optional }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const CLR_DRAG_AND_DROP_DIRECTIVES = [
    ClrDraggable,
    ClrDroppable,
    ClrIfDragged,
    ClrDragHandle,
    ClrDraggableGhost,
];
class ClrDragAndDropModule {
}
ClrDragAndDropModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: [CLR_DRAG_AND_DROP_DIRECTIVES],
                entryComponents: [ClrDraggableGhost],
                exports: [CLR_DRAG_AND_DROP_DIRECTIVES],
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DatagridIfExpandService extends IfExpandService {
    constructor() {
        super(...arguments);
        this._replace = new BehaviorSubject(false);
        this._animate = new Subject();
    }
    // due to the es5 spec if the set is overridden on base class the getter must also be overridden
    /**
     * @return {?}
     */
    get expanded() {
        return this._expanded;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set expanded(value) {
        value = !!value;
        if (value !== this._expanded) {
            this._expanded = value;
            this._animate.next();
            this._expandChange.next(value);
        }
    }
    /**
     * @param {?} state
     * @return {?}
     */
    loadingStateChange(state$$1) {
        super.loadingStateChange(state$$1);
        if (state$$1 !== ClrLoadingState.LOADING) {
            this._animate.next();
        }
    }
    /**
     * @return {?}
     */
    get replace() {
        return this._replace.asObservable();
    }
    /**
     * @param {?} replaceValue
     * @return {?}
     */
    setReplace(replaceValue) {
        this._replace.next(replaceValue);
    }
    /**
     * @return {?}
     */
    get animate() {
        return this._animate.asObservable();
    }
}
DatagridIfExpandService.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DatagridRowExpandAnimation {
    /**
     * @param {?} el
     * @param {?} domAdapter
     * @param {?} renderer
     * @param {?} expand
     */
    constructor(el, domAdapter, renderer, expand) {
        this.el = el;
        this.domAdapter = domAdapter;
        this.renderer = renderer;
        this.expand = expand;
        this.subscriptions = [];
        if (expand && expand.animate) {
            this.subscriptions.push(expand.animate.subscribe((/**
             * @return {?}
             */
            () => {
                // We already had an animation waiting, so we just have to run in, not prepare again
                if (this.oldHeight) {
                    setTimeout((/**
                     * @return {?}
                     */
                    () => this.run()));
                }
                else {
                    this.animate();
                }
            })));
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscriptions.forEach((/**
         * @param {?} s
         * @return {?}
         */
        s => s.unsubscribe()));
    }
    /*
         * Dirty manual animation handling, but we have no way to use dynamic heights in Angular's current API.
         * They're working on it, but have no ETA.
         */
    /**
     * @private
     * @return {?}
     */
    animate() {
        // Check if we do have web-animations available. If not, just skip the animation.
        if (!this.el.nativeElement.animate) {
            return;
        }
        // We had an animation running, we skip to the end
        if (this.running) {
            this.running.finish();
        }
        this.oldHeight = this.domAdapter.computedHeight(this.el.nativeElement);
        // In case height has not yet been set. When starting expanded, for example.
        // See https://github.com/vmware/clarity/issues/2904
        if (isNaN(this.oldHeight)) {
            this.oldHeight = 0;
        }
        // We set the height of the element immediately to avoid a flicker before the animation starts.
        this.renderer.setStyle(this.el.nativeElement, 'height', this.oldHeight + 'px');
        this.renderer.setStyle(this.el.nativeElement, 'overflow-y', 'hidden');
        setTimeout((/**
         * @return {?}
         */
        () => {
            if (this.expand.loading) {
                return;
            }
            this.run();
        }));
    }
    /**
     * @private
     * @return {?}
     */
    run() {
        this.renderer.setStyle(this.el.nativeElement, 'height', null);
        /** @type {?} */
        const newHeight = this.domAdapter.computedHeight(this.el.nativeElement);
        this.running = this.el.nativeElement.animate({ height: [this.oldHeight + 'px', newHeight + 'px'], easing: 'ease-in-out' }, { duration: 200 });
        this.running.onfinish = (/**
         * @return {?}
         */
        () => {
            this.renderer.setStyle(this.el.nativeElement, 'overflow-y', null);
            delete this.running;
        });
        delete this.oldHeight;
    }
}
DatagridRowExpandAnimation.decorators = [
    { type: Directive, args: [{ selector: 'clr-dg-row' },] }
];
/** @nocollapse */
DatagridRowExpandAnimation.ctorParameters = () => [
    { type: ElementRef },
    { type: DomAdapter },
    { type: Renderer2 },
    { type: DatagridIfExpandService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * @abstract
 */
class CustomFilter {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * This provider implements some form of synchronous debouncing through a lock pattern
 * to avoid emitting multiple state changes for a single user action.
 */
class StateDebouncer {
    constructor() {
        /**
         * The Observable that lets other classes subscribe to global state changes
         */
        this._change = new Subject();
        /*
             * This is the lock, to only emit once all the changes have finished processing
             */
        this.nbChanges = 0;
    }
    // We do not want to expose the Subject itself, but the Observable which is read-only
    /**
     * @return {?}
     */
    get change() {
        return this._change.asObservable();
    }
    /**
     * @return {?}
     */
    changeStart() {
        this.nbChanges++;
    }
    /**
     * @return {?}
     */
    changeDone() {
        if (--this.nbChanges === 0) {
            this._change.next();
        }
    }
}
StateDebouncer.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Page {
    /**
     * @param {?} stateDebouncer
     */
    constructor(stateDebouncer) {
        this.stateDebouncer = stateDebouncer;
        this.activated = false;
        /**
         * Page size, a value of 0 means no pagination
         */
        this._size = 0;
        /**
         * The Observable that lets other classes subscribe to page changes
         */
        this._change = new Subject();
        this._sizeChange = new Subject();
        /**
         * Current page
         */
        this._current = 1;
    }
    /**
     * @return {?}
     */
    get size() {
        return this._size;
    }
    /**
     * @param {?} size
     * @return {?}
     */
    set size(size) {
        /** @type {?} */
        const oldSize = this._size;
        if (size !== oldSize) {
            this.stateDebouncer.changeStart();
            this._size = size;
            if (size === 0) {
                this._current = 1;
            }
            else {
                // Yeap. That's the formula to keep the first item from the old page still
                // displayed in the new one.
                this._current = Math.floor(oldSize / size * (this._current - 1)) + 1;
            }
            // We always emit an event even if the current page index didn't change, because
            // the size changing means the items inside the page are different
            this._change.next(this._current);
            this._sizeChange.next(this._size);
            this.stateDebouncer.changeDone();
        }
    }
    /**
     * @return {?}
     */
    get totalItems() {
        return this._totalItems || 0; // remains 0 if not set to avoid breaking change
    }
    /**
     * @param {?} total
     * @return {?}
     */
    set totalItems(total) {
        this._totalItems = total;
        // If we have less items than before, we might need to change the current page
        if (this.current > this.last) {
            this.current = this.last;
        }
    }
    /**
     * @return {?}
     */
    get last() {
        if (this._last) {
            return this._last;
        }
        // If the last page isn't known, we compute it from the last item's index
        if (this.size > 0 && this.totalItems) {
            return Math.ceil(this.totalItems / this.size);
        }
        return 1;
    }
    /**
     * @param {?} page
     * @return {?}
     */
    set last(page) {
        this._last = page;
    }
    // We do not want to expose the Subject itself, but the Observable which is read-only
    /**
     * @return {?}
     */
    get change() {
        return this._change.asObservable();
    }
    /**
     * @return {?}
     */
    get sizeChange() {
        return this._sizeChange.asObservable();
    }
    /**
     * @return {?}
     */
    get current() {
        return this._current;
    }
    /**
     * @param {?} page
     * @return {?}
     */
    set current(page) {
        if (page !== this._current) {
            this.stateDebouncer.changeStart();
            this._current = page;
            this._change.next(page);
            this.stateDebouncer.changeDone();
        }
    }
    /**
     * Moves to the previous page if it exists
     * @return {?}
     */
    previous() {
        if (this.current > 1) {
            this.current--;
        }
    }
    /**
     * Moves to the next page if it exists
     * @return {?}
     */
    next() {
        if (this.current < this.last) {
            this.current++;
        }
    }
    /**
     * Index of the first item displayed on the current page, starting at 0, -1 if none displayed
     * @return {?}
     */
    get firstItem() {
        if (this._totalItems === 0) {
            return -1;
        }
        if (this.size === 0) {
            return 0;
        }
        return (this.current - 1) * this.size;
    }
    /**
     * Index of the last item displayed on the current page, starting at 0, -1 if none displayed
     * @return {?}
     */
    get lastItem() {
        if (this._totalItems === 0) {
            return -1;
        }
        if (this.size === 0) {
            return this.totalItems - 1;
        }
        /** @type {?} */
        let lastInPage = this.current * this.size - 1;
        if (this.totalItems) {
            lastInPage = Math.min(lastInPage, this.totalItems - 1);
        }
        return lastInPage;
    }
    /**
     * Resets the page size to 0
     * @return {?}
     */
    resetPageSize() {
        this.size = 0;
    }
}
Page.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Page.ctorParameters = () => [
    { type: StateDebouncer }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
class FiltersProvider {
    /**
     * @param {?} _page
     * @param {?} stateDebouncer
     */
    constructor(_page, stateDebouncer) {
        this._page = _page;
        this.stateDebouncer = stateDebouncer;
        /**
         * This subject is the list of filters that changed last, not the whole list.
         * We emit a list rather than just one filter to allow batch changes to several at once.
         */
        this._change = new Subject();
        /**
         * List of all filters, whether they're active or not
         */
        this._all = [];
    }
    // We do not want to expose the Subject itself, but the Observable which is read-only
    /**
     * @return {?}
     */
    get change() {
        return this._change.asObservable();
    }
    /**
     * Tests if at least one filter is currently active
     * @return {?}
     */
    hasActiveFilters() {
        // We do not use getActiveFilters() because this function will be called much more often
        // and stopping the loop early might be relevant.
        for (const { filter: filter$$1 } of this._all) {
            if (filter$$1 && filter$$1.isActive()) {
                return true;
            }
        }
        return false;
    }
    /**
     * Returns a list of all currently active filters
     * @return {?}
     */
    getActiveFilters() {
        /** @type {?} */
        const ret = [];
        for (const { filter: filter$$1 } of this._all) {
            if (filter$$1 && filter$$1.isActive()) {
                ret.push(filter$$1);
            }
        }
        return ret;
    }
    /**
     * Registers a filter, and returns a deregistration function
     * @template F
     * @param {?} filter
     * @return {?}
     */
    add(filter$$1) {
        /** @type {?} */
        const index = this._all.length;
        /** @type {?} */
        const subscription = filter$$1.changes.subscribe((/**
         * @return {?}
         */
        () => this.resetPageAndEmitFilterChange([filter$$1])));
        /** @type {?} */
        let hasUnregistered = false;
        /** @type {?} */
        const registered = new RegisteredFilter(filter$$1, (/**
         * @return {?}
         */
        () => {
            if (hasUnregistered) {
                return;
            }
            subscription.unsubscribe();
            this._all.splice(index, 1);
            if (filter$$1.isActive()) {
                this.resetPageAndEmitFilterChange([]);
            }
            hasUnregistered = true;
        }));
        this._all.push(registered);
        if (filter$$1.isActive()) {
            this.resetPageAndEmitFilterChange([filter$$1]);
        }
        return registered;
    }
    /**
     * Accepts an item if it is accepted by all currently active filters
     * @param {?} item
     * @return {?}
     */
    accepts(item) {
        for (const { filter: filter$$1 } of this._all) {
            if (filter$$1 && filter$$1.isActive() && !filter$$1.accepts(item)) {
                return false;
            }
        }
        return true;
    }
    /**
     * @private
     * @param {?} filters
     * @return {?}
     */
    resetPageAndEmitFilterChange(filters) {
        this.stateDebouncer.changeStart();
        // filtering may change the page number such that current page number doesn't exist in the filtered dataset.
        // So here we always set the current page to 1 so that it'll fetch first page's data with the given filter.
        this._page.current = 1;
        this._change.next(filters);
        this.stateDebouncer.changeDone();
    }
}
FiltersProvider.decorators = [
    { type: Injectable }
];
/** @nocollapse */
FiltersProvider.ctorParameters = () => [
    { type: Page },
    { type: StateDebouncer }
];
/**
 * @template T, F
 */
class RegisteredFilter {
    /**
     * @param {?} filter
     * @param {?} unregister
     */
    constructor(filter$$1, unregister) {
        this.filter = filter$$1;
        this.unregister = unregister;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 * @template T, F
 */
class DatagridFilterRegistrar {
    /**
     * @param {?} filters
     */
    constructor(filters) {
        this.filters = filters;
    }
    /**
     * @return {?}
     */
    get filter() {
        return this.registered && this.registered.filter;
    }
    /**
     * @param {?} filter
     * @return {?}
     */
    setFilter(filter$$1) {
        // If we previously had another filter, we unregister it
        this.deleteFilter();
        if (filter$$1 instanceof RegisteredFilter) {
            this.registered = filter$$1;
        }
        else if (filter$$1) {
            this.registered = this.filters.add(filter$$1);
        }
    }
    /**
     * @return {?}
     */
    deleteFilter() {
        if (this.registered) {
            this.registered.unregister();
            delete this.registered;
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.deleteFilter();
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Custom filter that can be added in any column to override the default object property string filter.
 * The reason this is not just an input on DatagridColumn is because we need the filter's template to be projected,
 * since it can be anything (not just a text input).
 * @template T
 */
class ClrDatagridFilter extends DatagridFilterRegistrar {
    /**
     * @param {?} _filters
     * @param {?} commonStrings
     */
    constructor(_filters, commonStrings) {
        super(_filters);
        this.commonStrings = commonStrings;
        this.anchorPoint = Point.RIGHT_BOTTOM;
        this.popoverPoint = Point.RIGHT_TOP;
        this.popoverOptions = { allowMultipleOpen: true };
        /**
         * Tracks whether the filter dropdown is open or not
         */
        this._open = false;
        this.openChanged = new EventEmitter(false);
    }
    /**
     * @return {?}
     */
    get open() {
        return this._open;
    }
    /**
     * @param {?} open
     * @return {?}
     */
    set open(open) {
        /** @type {?} */
        const boolOpen = !!open;
        if (boolOpen !== this._open) {
            this._open = boolOpen;
            this.openChanged.emit(boolOpen);
        }
    }
    /**
     * @param {?} filter
     * @return {?}
     */
    set customFilter(filter$$1) {
        this.setFilter(filter$$1);
    }
    /**
     * Indicates if the filter is currently active
     * @return {?}
     */
    get active() {
        return !!this.filter && this.filter.isActive();
    }
    /**
     * Shows/hides the filter dropdown
     * @return {?}
     */
    toggle() {
        this.open = !this.open;
    }
}
ClrDatagridFilter.decorators = [
    { type: Component, args: [{
                selector: 'clr-dg-filter',
                // We register this component as a CustomFilter, for the parent column to detect it.
                providers: [{ provide: CustomFilter, useExisting: ClrDatagridFilter }],
                template: `
        <button #anchor class="datagrid-filter-toggle" (click)="toggle()"
            [class.datagrid-filter-open]="open" [class.datagrid-filtered]="active"
            type="button"></button>

        <ng-template [(clrPopoverOld)]="open" [clrPopoverOldAnchor]="anchor" [clrPopoverOldAnchorPoint]="anchorPoint"
             [clrPopoverOldPopoverPoint]="popoverPoint" [clrPopoverOldOptions]="popoverOptions">
            <div class="datagrid-filter">
                <!-- FIXME: this whole filter part needs a final design before we can try to have a cleaner DOM -->
                <div class="datagrid-filter-close-wrapper">
                    <button type="button" class="close" (click)="open = false">
                        <clr-icon shape="close" [attr.title]="commonStrings.close"></clr-icon>
                    </button>
                </div>
    
                <ng-content></ng-content>
            </div>
        </ng-template>
    `
            }] }
];
/** @nocollapse */
ClrDatagridFilter.ctorParameters = () => [
    { type: FiltersProvider },
    { type: ClrCommonStrings }
];
ClrDatagridFilter.propDecorators = {
    open: [{ type: Input, args: ['clrDgFilterOpen',] }],
    openChanged: [{ type: Output, args: ['clrDgFilterOpenChange',] }],
    customFilter: [{ type: Input, args: ['clrDgFilter',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * Generic accessor for deep object properties
 * that can be specified as simple dot-separated strings.
 * @template T
 */
class NestedProperty {
    /**
     * @param {?} prop
     */
    constructor(prop) {
        this.prop = prop;
        if (prop.indexOf('.') >= 0) {
            this.splitProp = prop.split('.');
        }
    }
    // Safe getter for a deep object property, will not throw an error but return
    // undefined if one of the intermediate properties is null or undefined.
    /**
     * @param {?} item
     * @return {?}
     */
    getPropValue(item) {
        if (this.splitProp) {
            /** @type {?} */
            let value = item;
            for (const nestedProp of this.splitProp) {
                if (value == null || typeof value === 'undefined' || typeof value[nestedProp] === 'undefined') {
                    return undefined;
                }
                value = value[nestedProp];
            }
            return value;
        }
        else {
            return item[this.prop];
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
class DatagridPropertyStringFilter {
    /**
     * @param {?} prop
     * @param {?=} exact
     */
    constructor(prop, exact = false) {
        this.prop = prop;
        this.exact = exact;
        this.nestedProp = new NestedProperty(prop);
    }
    /**
     * @param {?} item
     * @param {?} search
     * @return {?}
     */
    accepts(item, search) {
        /** @type {?} */
        const propValue = this.nestedProp.getPropValue(item);
        if (typeof propValue === 'undefined') {
            return false;
        }
        else if (this.exact) {
            return ('' + propValue).toLowerCase() === search;
        }
        else {
            return ('' + propValue).toLowerCase().indexOf(search) >= 0;
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
class DatagridStringFilterImpl {
    /**
     * @param {?} filterFn
     */
    constructor(filterFn) {
        this.filterFn = filterFn;
        /**
         * The Observable required as part of the Filter interface
         */
        this._changes = new Subject();
        /**
         * Raw input value
         */
        this._rawValue = '';
        /**
         * Input value converted to lowercase
         */
        this._lowerCaseValue = '';
    }
    // We do not want to expose the Subject itself, but the Observable which is read-only
    /**
     * @return {?}
     */
    get changes() {
        return this._changes.asObservable();
    }
    /**
     * @return {?}
     */
    get value() {
        return this._rawValue;
    }
    /**
     * @return {?}
     */
    get lowerCaseValue() {
        return this._lowerCaseValue;
    }
    /**
     * Common setter for the input value
     * @param {?} value
     * @return {?}
     */
    set value(value) {
        if (!value) {
            value = '';
        }
        if (value !== this._rawValue) {
            this._rawValue = value;
            this._lowerCaseValue = value.toLowerCase().trim();
            this._changes.next(value);
        }
    }
    /**
     * Indicates if the filter is currently active, meaning the input is not empty
     * @return {?}
     */
    isActive() {
        return !!this.value;
    }
    /**
     * Tests if an item matches a search text
     * @param {?} item
     * @return {?}
     */
    accepts(item) {
        // We always test with the lowercase value of the input, to stay case insensitive
        return this.filterFn.accepts(item, this.lowerCaseValue);
    }
    /**
     * @return {?}
     */
    get state() {
        if (this.filterFn instanceof DatagridPropertyStringFilter) {
            return {
                property: this.filterFn.prop,
                value: this.value,
            };
        }
        return this;
    }
    /**
     * @param {?} other
     * @return {?}
     */
    equals(other) {
        if (other instanceof DatagridStringFilterImpl) {
            if (other.filterFn instanceof DatagridPropertyStringFilter) {
                return (this.filterFn instanceof DatagridPropertyStringFilter &&
                    other.filterFn.prop === this.filterFn.prop &&
                    other.value === this.value);
            }
            return other === this;
        }
        return false;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
class DatagridStringFilter extends DatagridFilterRegistrar {
    /**
     * @param {?} filters
     * @param {?} domAdapter
     */
    constructor(filters, domAdapter) {
        super(filters);
        this.domAdapter = domAdapter;
        /**
         * Indicates if the filter dropdown is open
         */
        this.open = false;
        this.filterValueChange = new EventEmitter();
    }
    /**
     * Customizable filter logic based on a search text
     * @param {?} value
     * @return {?}
     */
    set customStringFilter(value) {
        if (value instanceof RegisteredFilter) {
            this.setFilter(value);
        }
        else {
            this.setFilter(new DatagridStringFilterImpl(value));
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.filterContainer.openChanged.subscribe((/**
         * @param {?} open
         * @return {?}
         */
        (open) => {
            if (open) {
                // We need the timeout because at the time this executes, the input isn't
                // displayed yet.
                setTimeout((/**
                 * @return {?}
                 */
                () => {
                    this.domAdapter.focus(this.input.nativeElement);
                }));
            }
        }));
    }
    /**
     * Common setter for the input value
     * @return {?}
     */
    get value() {
        return this.filter.value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set value(value) {
        if (!this.filter) {
            return;
        }
        if (!value) {
            value = '';
        }
        if (value !== this.filter.value) {
            this.filter.value = value;
            this.filterValueChange.emit(value);
        }
    }
    /**
     * @return {?}
     */
    close() {
        this.open = false;
    }
}
DatagridStringFilter.decorators = [
    { type: Component, args: [{
                selector: 'clr-dg-string-filter',
                providers: [{ provide: CustomFilter, useExisting: DatagridStringFilter }],
                template: `
        <clr-dg-filter [clrDgFilter]="registered" [(clrDgFilterOpen)]="open">
            <!--
                Even though this *ngIf looks useless because the filter container already has one,
                it prevents NgControlStatus and other directives automatically added by Angular
                on inputs with NgModel from freaking out because of their host binding changing
                mid-change detection when the input is destroyed.
            -->
            <input #input type="text" name="search" [(ngModel)]="value" *ngIf="open"
                (keyup.enter)="close()" (keyup.escape)="close()" class="clr-input" />
        </clr-dg-filter>
    `
            }] }
];
/** @nocollapse */
DatagridStringFilter.ctorParameters = () => [
    { type: FiltersProvider },
    { type: DomAdapter }
];
DatagridStringFilter.propDecorators = {
    customStringFilter: [{ type: Input, args: ['clrDgStringFilter',] }],
    input: [{ type: ViewChild, args: ['input',] }],
    filterContainer: [{ type: ViewChild, args: [ClrDatagridFilter,] }],
    value: [{ type: Input, args: ['clrFilterValue',] }],
    filterValueChange: [{ type: Output, args: ['clrFilterValueChange',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
class OompaLoompa {
    // FIXME: Request Injector once we move to Angular 4.2+, it'll allow easier refactors
    /**
     * @param {?} cdr
     * @param {?} willyWonka
     */
    constructor(cdr, willyWonka) {
        this.subscription = willyWonka.chocolate.subscribe((/**
         * @return {?}
         */
        () => {
            if (this.latestFlavor !== this.flavor) {
                cdr.detectChanges();
            }
        }));
    }
    /**
     * @return {?}
     */
    ngAfterContentChecked() {
        this.latestFlavor = this.flavor;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class RowActionService {
    constructor() {
        this.actionableCount = 0;
    }
    /**
     * @return {?}
     */
    register() {
        this.actionableCount++;
    }
    /**
     * @return {?}
     */
    unregister() {
        this.actionableCount--;
    }
    /**
     * false means no rows with action
     * @return {?}
     */
    get hasActionableRow() {
        return this.actionableCount > 0;
    }
}
RowActionService.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * After a conversation with the Angular core team, it turns out we don't have much of a choice for our
 * declarative API, we need to fight against change detection and its one-way flow. This is
 * currently the least dirty solution to do what we want.
 *
 * Do not modify or even use this class unless you know exactly what you're doing.
 * It has the potential to trigger change detection loops or kill app performances.
 */
class WillyWonka {
    constructor() {
        this._chocolate = new Subject();
    }
    /**
     * @return {?}
     */
    get chocolate() {
        return this._chocolate.asObservable();
    }
    /**
     * @return {?}
     */
    ngAfterViewChecked() {
        this._chocolate.next();
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DatagridWillyWonka extends WillyWonka {
}
DatagridWillyWonka.decorators = [
    { type: Directive, args: [{ selector: 'clr-datagrid' },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ActionableOompaLoompa extends OompaLoompa {
    /**
     * @param {?} cdr
     * @param {?} willyWonka
     * @param {?} rowActions
     */
    constructor(cdr, willyWonka, rowActions) {
        if (!willyWonka) {
            throw new Error('clr-dg-row should only be used inside of a clr-datagrid');
        }
        super(cdr, willyWonka);
        this.rowActions = rowActions;
    }
    /**
     * @return {?}
     */
    get flavor() {
        return this.rowActions.hasActionableRow;
    }
}
ActionableOompaLoompa.decorators = [
    { type: Directive, args: [{ selector: 'clr-datagrid, clr-dg-row' },] }
];
/** @nocollapse */
ActionableOompaLoompa.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: DatagridWillyWonka, decorators: [{ type: Optional }] },
    { type: RowActionService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ExpandableRowsCount {
    constructor() {
        this.expandableCount = 0;
    }
    /**
     * @return {?}
     */
    register() {
        this.expandableCount++;
    }
    /**
     * @return {?}
     */
    unregister() {
        this.expandableCount--;
    }
    /**
     * false means no rows with action
     * @return {?}
     */
    get hasExpandableRow() {
        return this.expandableCount > 0;
    }
}
ExpandableRowsCount.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ExpandableOompaLoompa extends OompaLoompa {
    /**
     * @param {?} cdr
     * @param {?} willyWonka
     * @param {?} expandableCount
     */
    constructor(cdr, willyWonka, expandableCount) {
        if (!willyWonka) {
            throw new Error('clr-dg-row should only be used inside of a clr-datagrid');
        }
        super(cdr, willyWonka);
        this.expandableCount = expandableCount;
    }
    /**
     * @return {?}
     */
    get flavor() {
        return this.expandableCount.hasExpandableRow;
    }
}
ExpandableOompaLoompa.decorators = [
    { type: Directive, args: [{ selector: 'clr-datagrid, clr-dg-row' },] }
];
/** @nocollapse */
ExpandableOompaLoompa.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: DatagridWillyWonka, decorators: [{ type: Optional }] },
    { type: ExpandableRowsCount }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
class DatagridPropertyComparator {
    /**
     * @param {?} prop
     */
    constructor(prop) {
        this.prop = prop;
        this.nestedProp = new NestedProperty(prop);
    }
    /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    compare(a, b) {
        /** @type {?} */
        let propA = this.nestedProp.getPropValue(a);
        /** @type {?} */
        let propB = this.nestedProp.getPropValue(b);
        if (typeof propA === 'string') {
            propA = propA.toLowerCase();
        }
        if (typeof propB === 'string') {
            propB = propB.toLowerCase();
        }
        if (typeof propA === 'undefined' || propA === null) {
            if (typeof propB === 'undefined' || propB === null) {
                return 0;
            }
            else {
                return 1;
            }
        }
        else {
            if (typeof propB === 'undefined' || propB === null) {
                return -1;
            }
            else if (propA < propB) {
                return -1;
            }
            else if (propA > propB) {
                return 1;
            }
            else {
                return 0;
            }
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/** @enum {number} */
const ClrDatagridSortOrder = {
    UNSORTED: 0,
    ASC: 1,
    DESC: -1,
};
ClrDatagridSortOrder[ClrDatagridSortOrder.UNSORTED] = 'UNSORTED';
ClrDatagridSortOrder[ClrDatagridSortOrder.ASC] = 'ASC';
ClrDatagridSortOrder[ClrDatagridSortOrder.DESC] = 'DESC';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
class Sort {
    /**
     * @param {?} stateDebouncer
     */
    constructor(stateDebouncer) {
        this.stateDebouncer = stateDebouncer;
        /**
         * Ascending order if false, descending if true
         */
        this._reverse = false;
        /**
         * The Observable that lets other classes subscribe to sort changes
         */
        this._change = new Subject();
    }
    /**
     * @return {?}
     */
    get comparator() {
        return this._comparator;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set comparator(value) {
        this.stateDebouncer.changeStart();
        this._comparator = value;
        this.emitChange();
        this.stateDebouncer.changeDone();
    }
    /**
     * @return {?}
     */
    get reverse() {
        return this._reverse;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set reverse(value) {
        this.stateDebouncer.changeStart();
        this._reverse = value;
        this.emitChange();
        this.stateDebouncer.changeDone();
    }
    /**
     * @private
     * @return {?}
     */
    emitChange() {
        this._change.next(this);
    }
    // We do not want to expose the Subject itself, but the Observable which is read-only
    /**
     * @return {?}
     */
    get change() {
        return this._change.asObservable();
    }
    /**
     * Sets a comparator as the current one, or toggles reverse if the comparator is already used. The
     * optional forceReverse input parameter allows to override that toggling behavior by sorting in
     * reverse order if `true`.
     *
     * \@memberof Sort
     * @param {?} sortBy
     * @param {?=} forceReverse
     * @return {?}
     */
    toggle(sortBy, forceReverse) {
        this.stateDebouncer.changeStart();
        // We modify private properties directly, to batch the change event
        if (this.comparator === sortBy) {
            this._reverse = typeof forceReverse !== 'undefined' ? forceReverse || !this._reverse : !this._reverse;
        }
        else {
            this._comparator = sortBy;
            this._reverse = typeof forceReverse !== 'undefined' ? forceReverse : false;
        }
        this.emitChange();
        this.stateDebouncer.changeDone();
    }
    /**
     * Clears the current sorting order
     * @return {?}
     */
    clear() {
        this.comparator = null;
    }
    /**
     * Compares two objects according to the current comparator
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    compare(a, b) {
        return (this.reverse ? -1 : 1) * this.comparator.compare(a, b);
    }
}
Sort.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Sort.ctorParameters = () => [
    { type: StateDebouncer }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class WrappedColumn {
    constructor() {
        this._dynamic = false;
    }
    // the columns projected view (in memory)
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        // Create the cells view in memory, not the DOM.
        this.columnView = this.templateRef.createEmbeddedView(null);
    }
}
WrappedColumn.decorators = [
    { type: Component, args: [{
                selector: 'dg-wrapped-column',
                template: `        
        <ng-template #columnPortal>
            <ng-content></ng-content>
        </ng-template>
    `
            }] }
];
WrappedColumn.propDecorators = {
    templateRef: [{ type: ViewChild, args: ['columnPortal',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
class ClrDatagridColumn extends DatagridFilterRegistrar {
    /**
     * @param {?} _sort
     * @param {?} filters
     * @param {?} vcr
     */
    constructor(_sort, filters, vcr) {
        super(filters);
        this._sort = _sort;
        this.vcr = vcr;
        // deprecated: to be removed - START
        /**
         * Indicates if the column is currently sorted
         *
         * @deprecated This will be removed soon, in favor of the sortOrder mechanism
         */
        this._sorted = false;
        /**
         * @deprecated This will be removed soon, in favor of the sortOrder mechanism
         */
        this.sortedChange = new EventEmitter();
        // deprecated: to be removed - END
        /**
         * Indicates how the column is currently sorted
         */
        this._sortOrder = ClrDatagridSortOrder.UNSORTED;
        this.sortOrderChange = new EventEmitter();
        /**
         * A custom filter for this column that can be provided in the projected content
         */
        this.customFilter = false;
        this.filterValueChange = new EventEmitter();
        this._sortSubscription = _sort.change.subscribe((/**
         * @param {?} sort
         * @return {?}
         */
        sort => {
            // We're only listening to make sure we emit an event when the column goes from sorted to unsorted
            if (this.sortOrder !== ClrDatagridSortOrder.UNSORTED && sort.comparator !== this._sortBy) {
                this._sortOrder = ClrDatagridSortOrder.UNSORTED;
                this.sortOrderChange.emit(this._sortOrder);
                // removes the sortIcon when column becomes unsorted
                this.sortIcon = null;
            }
            // deprecated: to be removed - START
            if (this.sorted && sort.comparator !== this._sortBy) {
                this._sorted = false;
                this.sortedChange.emit(false);
            }
            // deprecated: to be removed - END
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._sortSubscription.unsubscribe();
    }
    /**
     * @return {?}
     */
    get field() {
        return this._field;
    }
    /**
     * @param {?} field
     * @return {?}
     */
    set field(field) {
        if (typeof field === 'string') {
            this._field = field;
            if (!this.customFilter) {
                this.setFilter(new DatagridStringFilterImpl(new DatagridPropertyStringFilter(field)));
            }
            if (!this._sortBy) {
                this._sortBy = new DatagridPropertyComparator(field);
            }
        }
    }
    /**
     * @return {?}
     */
    get sortBy() {
        return this._sortBy;
    }
    /**
     * @param {?} comparator
     * @return {?}
     */
    set sortBy(comparator) {
        if (typeof comparator === 'string') {
            this._sortBy = new DatagridPropertyComparator(comparator);
        }
        else {
            if (comparator) {
                this._sortBy = comparator;
            }
            else {
                if (this._field) {
                    this._sortBy = new DatagridPropertyComparator(this._field);
                }
                else {
                    delete this._sortBy;
                }
            }
        }
    }
    /**
     * Indicates if the column is sortable
     * @return {?}
     */
    get sortable() {
        return !!this._sortBy;
    }
    /**
     * @return {?}
     */
    get sorted() {
        return this._sorted;
    }
    /**
     * @deprecated This will be removed soon, in favor of the sortOrder mechanism
     * @param {?} value
     * @return {?}
     */
    set sorted(value) {
        if (!value && this.sorted) {
            this._sorted = false;
            this._sort.clear();
        }
        else if (value && !this.sorted) {
            this.sort();
        }
    }
    /**
     * @return {?}
     */
    get sortOrder() {
        return this._sortOrder;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set sortOrder(value) {
        if (typeof value === 'undefined') {
            return;
        }
        // only if the incoming order is different from the current one
        if (this._sortOrder === value) {
            return;
        }
        switch (value) {
            // the Unsorted case happens when the current state is either Asc or Desc
            default:
            case ClrDatagridSortOrder.UNSORTED:
                this._sort.clear();
                break;
            case ClrDatagridSortOrder.ASC:
                this.sort(false);
                break;
            case ClrDatagridSortOrder.DESC:
                this.sort(true);
                break;
        }
    }
    /**
     * @return {?}
     */
    get ariaSort() {
        switch (this._sortOrder) {
            default:
            case ClrDatagridSortOrder.UNSORTED:
                return 'none';
            case ClrDatagridSortOrder.ASC:
                return 'ascending';
            case ClrDatagridSortOrder.DESC:
                return 'descending';
        }
    }
    /**
     * Sorts the datagrid based on this column
     * @param {?=} reverse
     * @return {?}
     */
    sort(reverse) {
        if (!this.sortable) {
            return;
        }
        this._sort.toggle(this._sortBy, reverse);
        // setting the private variable to not retrigger the setter logic
        this._sortOrder = this._sort.reverse ? ClrDatagridSortOrder.DESC : ClrDatagridSortOrder.ASC;
        // Sets the correct icon for current sort order
        this.sortIcon = this._sortOrder === ClrDatagridSortOrder.DESC ? 'arrow down' : 'arrow';
        this.sortOrderChange.emit(this._sortOrder);
        // deprecated: to be removed - START
        this._sorted = true;
        this.sortedChange.emit(true);
        // deprecated: to be removed - END
    }
    /**
     * @param {?} custom
     * @return {?}
     */
    set projectedFilter(custom) {
        if (custom) {
            this.deleteFilter();
            this.customFilter = true;
        }
    }
    /**
     * @return {?}
     */
    get filterValue() {
        return this.filter.value;
    }
    /**
     * @param {?} newValue
     * @return {?}
     */
    set updateFilterValue(newValue) {
        if (!this.filter) {
            return;
        }
        if (!newValue) {
            newValue = '';
        }
        if (newValue !== this.filter.value) {
            this.filter.value = newValue;
        }
    }
    /**
     * @param {?} newValue
     * @return {?}
     */
    set filterValue(newValue) {
        this.updateFilterValue = newValue;
        this.filterValueChange.emit(this.filter.value);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.wrappedInjector = new HostWrapper(WrappedColumn, this.vcr);
    }
    /**
     * @return {?}
     */
    get _view() {
        return this.wrappedInjector.get(WrappedColumn, this.vcr).columnView;
    }
}
ClrDatagridColumn.decorators = [
    { type: Component, args: [{
                selector: 'clr-dg-column',
                template: `
      <div class="datagrid-column-flex">
          <!-- I'm really not happy with that select since it's not very scalable -->
          <ng-content select="clr-dg-filter, clr-dg-string-filter"></ng-content>

          <clr-dg-string-filter
                  *ngIf="field && !customFilter"
                  [clrDgStringFilter]="registered"
                  [(clrFilterValue)]="filterValue"></clr-dg-string-filter>

          <ng-template #columnTitle>
              <ng-content></ng-content>
          </ng-template>

          <button class="datagrid-column-title" *ngIf="sortable" (click)="sort()" type="button">
              <ng-container *ngTemplateOutlet="columnTitle"></ng-container>
              <clr-icon
                      *ngIf="sortIcon"
                      [attr.shape]="sortIcon"
                      class="sort-icon"></clr-icon>
          </button>

          <span class="datagrid-column-title" *ngIf="!sortable">
               <ng-container *ngTemplateOutlet="columnTitle"></ng-container>
            </span>

          <clr-dg-column-separator></clr-dg-column-separator>
      </div>
  `,
                host: {
                    '[class.datagrid-column]': 'true',
                    '[attr.aria-sort]': 'ariaSort',
                    role: 'columnheader',
                }
            }] }
];
/** @nocollapse */
ClrDatagridColumn.ctorParameters = () => [
    { type: Sort },
    { type: FiltersProvider },
    { type: ViewContainerRef }
];
ClrDatagridColumn.propDecorators = {
    field: [{ type: Input, args: ['clrDgField',] }],
    sortBy: [{ type: Input, args: ['clrDgSortBy',] }],
    sorted: [{ type: Input, args: ['clrDgSorted',] }],
    sortedChange: [{ type: Output, args: ['clrDgSortedChange',] }],
    sortOrder: [{ type: Input, args: ['clrDgSortOrder',] }],
    sortOrderChange: [{ type: Output, args: ['clrDgSortOrderChange',] }],
    projectedFilter: [{ type: ContentChild, args: [CustomFilter,] }],
    updateFilterValue: [{ type: Input, args: ['clrFilterValue',] }],
    filterValueChange: [{ type: Output, args: ['clrFilterValueChange',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
class Items {
    /**
     * @param {?} _filters
     * @param {?} _sort
     * @param {?} _page
     */
    constructor(_filters, _sort, _page) {
        this._filters = _filters;
        this._sort = _sort;
        this._page = _page;
        /**
         * Indicates if the data is currently loading
         */
        this.loading = false;
        // TODO: Verify that trackBy is registered for the *ngFor case too
        /**
         * Tracking function to identify objects. Default is reference equality.
         */
        this.trackBy = (/**
         * @param {?} index
         * @param {?} item
         * @return {?}
         */
        (index, item) => item);
        /**
         * Whether we should use smart items for this datagrid or let the user handle
         * everything.
         */
        this._smart = false;
        /**
         * List of items currently displayed
         */
        this._displayed = [];
        /**
         * The Observable that lets other classes subscribe to items changes
         */
        this._change = new Subject();
        this._allChanges = new Subject();
    }
    /**
     * Cleans up our subscriptions to other providers
     * @return {?}
     */
    destroy() {
        if (this._filtersSub) {
            this._filtersSub.unsubscribe();
        }
        if (this._sortSub) {
            this._sortSub.unsubscribe();
        }
        if (this._pageSub) {
            this._pageSub.unsubscribe();
        }
    }
    /**
     * @return {?}
     */
    get smart() {
        return this._smart;
    }
    /**
     * @return {?}
     */
    smartenUp() {
        this._smart = true;
        /*
             * These observers trigger a chain of function: filter -> sort -> paginate
             * An observer up the chain re-triggers all the operations that follow it.
             */
        this._filtersSub = this._filters.change.subscribe((/**
         * @return {?}
         */
        () => this._filterItems()));
        this._sortSub = this._sort.change.subscribe((/**
         * @return {?}
         */
        () => {
            // Special case, if the datagrid went from sorted to unsorted, we have to re-filter
            // to get the original order back
            if (!this._sort.comparator) {
                this._filterItems();
            }
            else {
                this._sortItems();
            }
        }));
        this._pageSub = this._page.change.subscribe((/**
         * @return {?}
         */
        () => this._changePage()));
    }
    /**
     * @return {?}
     */
    get all() {
        return this._all;
    }
    /**
     * @param {?} items
     * @return {?}
     */
    set all(items) {
        this._all = items;
        this.emitAllChanges(items);
        if (this.smart) {
            this._filterItems();
        }
        else {
            this._displayed = items;
            this.emitChange();
        }
    }
    /**
     * Manually recompute the list of displayed items
     * @return {?}
     */
    refresh() {
        if (this.smart) {
            this._filterItems();
        }
    }
    /**
     * @return {?}
     */
    get displayed() {
        // Ideally we could return an immutable array, but we don't have it in Clarity yet.
        return this._displayed;
    }
    /**
     * @private
     * @return {?}
     */
    emitChange() {
        this._change.next(this.displayed);
    }
    // We do not want to expose the Subject itself, but the Observable which is read-only
    /**
     * @return {?}
     */
    get change() {
        return this._change.asObservable();
    }
    /**
     * @private
     * @param {?} items
     * @return {?}
     */
    emitAllChanges(items) {
        this._allChanges.next(items);
    }
    /**
     * @return {?}
     */
    get allChanges() {
        return this._allChanges.asObservable();
    }
    /**
     * Checks if we don't have data to process yet, to abort early operations
     * @private
     * @return {?}
     */
    get uninitialized() {
        return !this._all;
    }
    /**
     * FiltersProvider items from the raw list
     * @private
     * @return {?}
     */
    _filterItems() {
        if (this.uninitialized) {
            return;
        }
        if (this._filters.hasActiveFilters()) {
            this._filtered = this._all.filter((/**
             * @param {?} item
             * @return {?}
             */
            item => this._filters.accepts(item)));
        }
        else {
            // Work on a shallow copy of the array, to not modify the user's model
            this._filtered = this._all.slice();
        }
        this._page.totalItems = this._filtered.length;
        this._sortItems();
    }
    /**
     * Sorts items in the filtered list
     * @private
     * @return {?}
     */
    _sortItems() {
        if (this.uninitialized) {
            return;
        }
        if (this._sort.comparator) {
            this._filtered.sort((/**
             * @param {?} a
             * @param {?} b
             * @return {?}
             */
            (a, b) => this._sort.compare(a, b)));
        }
        this._changePage();
    }
    /**
     * Extracts the current page from the sorted list
     * @private
     * @return {?}
     */
    _changePage() {
        // If we know we have pagination but the page size hasn't been set yet, we wait for it.
        if (this.uninitialized || (this._page.activated && this._page.size === 0)) {
            return;
        }
        if (this._page.size > 0) {
            this._displayed = this._filtered.slice(this._page.firstItem, this._page.lastItem + 1);
        }
        else {
            this._displayed = this._filtered;
        }
        this.emitChange();
    }
}
Items.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Items.ctorParameters = () => [
    { type: FiltersProvider },
    { type: Sort },
    { type: Page }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
class ClrDatagridItems {
    /**
     * @param {?} template
     * @param {?} differs
     * @param {?} items
     * @param {?} vcr
     */
    constructor(template, differs, items, vcr) {
        this.template = template;
        this.differs = differs;
        this.items = items;
        this.vcr = vcr;
        this.differ = null;
        this.subscriptions = [];
        items.smartenUp();
        this.iterableProxy = new NgForOf(this.vcr, this.template, this.differs);
        this.subscriptions.push(items.change.subscribe((/**
         * @param {?} newItems
         * @return {?}
         */
        newItems => {
            this.iterableProxy.ngForOf = newItems;
            this.iterableProxy.ngDoCheck();
        })));
    }
    /**
     * @param {?} items
     * @return {?}
     */
    set rawItems(items) {
        this._rawItems = items ? items : []; // local copy for ngOnChange diffing
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set trackBy(value) {
        this.iterableProxy.ngForTrackBy = value;
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        if (!this.differ) {
            this.differ = this.differs.find(this._rawItems).create(this.iterableProxy.ngForTrackBy);
        }
        if (this.differ) {
            /** @type {?} */
            const changes = this.differ.diff(this._rawItems);
            if (changes) {
                // TODO: not very efficient right now,
                // but premature optimization is the root of all evil.
                this.items.all = this._rawItems;
            }
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        sub => sub.unsubscribe()));
    }
}
ClrDatagridItems.decorators = [
    { type: Directive, args: [{
                selector: '[clrDgItems][clrDgItemsOf]',
            },] }
];
/** @nocollapse */
ClrDatagridItems.ctorParameters = () => [
    { type: TemplateRef },
    { type: IterableDiffers },
    { type: Items },
    { type: ViewContainerRef }
];
ClrDatagridItems.propDecorators = {
    rawItems: [{ type: Input, args: ['clrDgItemsOf',] }],
    trackBy: [{ type: Input, args: ['clrDgItemsTrackBy',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
class ClrDatagridPlaceholder {
    /**
     * @param {?} items
     */
    constructor(items) {
        this.items = items;
    }
    /**
     * Tests if the datagrid is empty, meaning it doesn't contain any items
     * @return {?}
     */
    get emptyDatagrid() {
        return !this.items.loading && (!this.items.displayed || this.items.displayed.length === 0);
    }
}
ClrDatagridPlaceholder.decorators = [
    { type: Component, args: [{
                selector: 'clr-dg-placeholder',
                template: `
        <div
            class="datagrid-placeholder"
            [class.datagrid-empty]="emptyDatagrid">
                <div class="datagrid-placeholder-image" *ngIf="emptyDatagrid"></div>
                <ng-content *ngIf="emptyDatagrid"></ng-content>
        </div>
    `,
                host: { '[class.datagrid-placeholder-container]': 'true' }
            }] }
];
/** @nocollapse */
ClrDatagridPlaceholder.ctorParameters = () => [
    { type: Items }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const POPOVER_HOST_ANCHOR = new InjectionToken('POPOVER_HOST_ANCHOR');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*********
 *
 * @description
 * A Directive added to the ClrSignpost Trigger button that will call the ClrSignpost.toggle() function to hide/show the
 * ClrSignpostContent.
 *
 */
class ClrSignpostTrigger {
    /**
     * @param {?} ifOpenService
     * @param {?} renderer
     * @param {?} el
     */
    constructor(ifOpenService, renderer, el) {
        this.ifOpenService = ifOpenService;
        this.renderer = renderer;
        this.el = el;
        this.subscriptions = [];
        this.subscriptions.push(this.ifOpenService.openChange.subscribe((/**
         * @param {?} isOpen
         * @return {?}
         */
        (isOpen) => {
            if (isOpen) {
                this.renderer.addClass(this.el.nativeElement, 'active');
            }
            else {
                this.renderer.removeClass(this.el.nativeElement, 'active');
            }
        })));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        (sub) => sub.unsubscribe()));
    }
    /**
     * *******
     *
     * \@description
     * click handler for the ClrSignpost trigger button used to hide/show ClrSignpostContent.
     * @param {?} event
     * @return {?}
     */
    onSignpostTriggerClick(event) {
        this.ifOpenService.toggleWithEvent(event);
    }
}
ClrSignpostTrigger.decorators = [
    { type: Directive, args: [{ selector: '[clrSignpostTrigger]', host: { class: 'signpost-trigger' } },] }
];
/** @nocollapse */
ClrSignpostTrigger.ctorParameters = () => [
    { type: IfOpenService },
    { type: Renderer2 },
    { type: ElementRef }
];
ClrSignpostTrigger.propDecorators = {
    onSignpostTriggerClick: [{ type: HostListener, args: ['click', ['$event'],] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*********
 *
 * @class ClrSignpost
 *
 * @description
 * Class used to configure and control the state of a ClrSignpost and its associated ClrSignpostContent.
 * It supports the clrPosition with a 'right-middle' default.
 *
 */
class ClrSignpost {
    /**
     * @param {?} commonStrings
     */
    constructor(commonStrings) {
        this.commonStrings = commonStrings;
        /**
         * *******
         * \@property useCustomTrigger
         *
         * \@description
         * Flag used to determine if we need to use the default trigger or a user supplied trigger element.
         *
         */
        this.useCustomTrigger = false;
    }
    /**
     * *******
     * \@property signPostTrigger
     *
     * \@description
     * Uses ContentChild to check for a user supplied element with the ClrSignpostTrigger on it.
     *
     * @param {?} trigger
     * @return {?}
     */
    set customTrigger(trigger$$1) {
        this.useCustomTrigger = !!trigger$$1;
    }
}
ClrSignpost.decorators = [
    { type: Component, args: [{
                selector: 'clr-signpost',
                template: `
        <ng-container *ngIf="!useCustomTrigger">
            <button
                type="button"
                class="signpost-action btn btn-small btn-link"
                clrSignpostTrigger>
                <clr-icon shape="info" [attr.title]="commonStrings.info"></clr-icon>
            </button>
        </ng-container>
        
        <ng-content></ng-content>
    `,
                host: { '[class.signpost]': 'true' },
                providers: [IfOpenService, { provide: POPOVER_HOST_ANCHOR, useExisting: ElementRef }]
            }] }
];
/** @nocollapse */
ClrSignpost.ctorParameters = () => [
    { type: ClrCommonStrings }
];
ClrSignpost.propDecorators = {
    customTrigger: [{ type: ContentChild, args: [ClrSignpostTrigger,] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class WrappedCell {
    constructor() {
        this._dynamic = false;
    }
    // the cells projected view
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.cellView = this.templateRef.createEmbeddedView(null);
    }
}
WrappedCell.decorators = [
    { type: Component, args: [{
                selector: 'dg-wrapped-cell',
                template: `        
        <ng-template #cellPortal>
            <ng-content></ng-content>
        </ng-template>
    `
            }] }
];
WrappedCell.propDecorators = {
    templateRef: [{ type: ViewChild, args: ['cellPortal',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrDatagridCell {
    /**
     * @param {?} vcr
     */
    constructor(vcr) {
        this.vcr = vcr;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.wrappedInjector = new HostWrapper(WrappedCell, this.vcr);
    }
    /**
     * @return {?}
     */
    get _view() {
        return this.wrappedInjector.get(WrappedCell, this.vcr).cellView;
    }
}
ClrDatagridCell.decorators = [
    { type: Component, args: [{
                selector: 'clr-dg-cell',
                template: `
        <ng-content></ng-content>
    `,
                host: {
                    '[class.datagrid-cell]': 'true',
                    '[class.datagrid-signpost-trigger]': 'signpost.length > 0',
                    role: 'cell',
                }
            }] }
];
/** @nocollapse */
ClrDatagridCell.ctorParameters = () => [
    { type: ViewContainerRef }
];
ClrDatagridCell.propDecorators = {
    signpost: [{ type: ContentChildren, args: [ClrSignpost,] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/** @enum {number} */
const DatagridDisplayMode = {
    DISPLAY: 0,
    CALCULATE: 1,
};
DatagridDisplayMode[DatagridDisplayMode.DISPLAY] = 'DISPLAY';
DatagridDisplayMode[DatagridDisplayMode.CALCULATE] = 'CALCULATE';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/** @enum {number} */
const DatagridRenderStep = {
    ALIGN_COLUMNS: 0,
    CALCULATE_MODE_ON: 1,
    CALCULATE_MODE_OFF: 2,
    CLEAR_WIDTHS: 3,
    COMPUTE_COLUMN_WIDTHS: 4,
};
DatagridRenderStep[DatagridRenderStep.ALIGN_COLUMNS] = 'ALIGN_COLUMNS';
DatagridRenderStep[DatagridRenderStep.CALCULATE_MODE_ON] = 'CALCULATE_MODE_ON';
DatagridRenderStep[DatagridRenderStep.CALCULATE_MODE_OFF] = 'CALCULATE_MODE_OFF';
DatagridRenderStep[DatagridRenderStep.CLEAR_WIDTHS] = 'CLEAR_WIDTHS';
DatagridRenderStep[DatagridRenderStep.COMPUTE_COLUMN_WIDTHS] = 'COMPUTE_COLUMN_WIDTHS';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DatagridRenderOrganizer {
    constructor() {
        this._renderStep = new Subject();
        this.alreadySized = false;
    }
    /**
     * @return {?}
     */
    get renderStep() {
        return this._renderStep.asObservable();
    }
    /**
     * @param {?} step
     * @return {?}
     */
    filterRenderSteps(step) {
        return this.renderStep.pipe(filter((/**
         * @param {?} testStep
         * @return {?}
         */
        testStep => step === testStep)));
    }
    /**
     * @return {?}
     */
    resize() {
        this._renderStep.next(DatagridRenderStep.CALCULATE_MODE_ON);
        if (this.alreadySized) {
            this._renderStep.next(DatagridRenderStep.CLEAR_WIDTHS);
        }
        this._renderStep.next(DatagridRenderStep.COMPUTE_COLUMN_WIDTHS);
        this._renderStep.next(DatagridRenderStep.ALIGN_COLUMNS);
        this.alreadySized = true;
        this._renderStep.next(DatagridRenderStep.CALCULATE_MODE_OFF);
    }
}
DatagridRenderOrganizer.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DisplayModeService {
    /**
     * @param {?} renderOrganizer
     */
    constructor(renderOrganizer) {
        this.subscriptions = [];
        this._view = new BehaviorSubject(DatagridDisplayMode.DISPLAY);
        this.subscriptions.push(renderOrganizer
            .filterRenderSteps(DatagridRenderStep.CALCULATE_MODE_ON)
            .subscribe((/**
         * @return {?}
         */
        () => this._view.next(DatagridDisplayMode.CALCULATE))));
        this.subscriptions.push(renderOrganizer
            .filterRenderSteps(DatagridRenderStep.CALCULATE_MODE_OFF)
            .subscribe((/**
         * @return {?}
         */
        () => this._view.next(DatagridDisplayMode.DISPLAY))));
    }
    /**
     * @return {?}
     */
    get view() {
        return this._view.asObservable();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        sub => sub.unsubscribe()));
    }
}
DisplayModeService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
DisplayModeService.ctorParameters = () => [
    { type: DatagridRenderOrganizer }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/** @enum {number} */
const SelectionType = {
    None: 0,
    Single: 1,
    Multi: 2,
};
SelectionType[SelectionType.None] = 'None';
SelectionType[SelectionType.Single] = 'Single';
SelectionType[SelectionType.Multi] = 'Multi';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
let nbSelection = 0;
/**
 * @template T
 */
class Selection {
    // Ref of single selected item
    /**
     * @param {?} _items
     * @param {?} _filters
     */
    constructor(_items, _filters) {
        this._items = _items;
        this._filters = _filters;
        this.prevSelectionRefs = []; // Refs of selected items
        this._selectionType = SelectionType.None;
        /**
         * @deprecated since 2.0, remove in 3.0
         */
        this.rowSelectionMode = false;
        /**
         * Ignore items changes in the same change detection cycle.
         */
        // tslint:disable-next-line
        this.debounce = false;
        /**
         * Subscriptions to the other providers changes.
         */
        this.subscriptions = [];
        /**
         * The Observable that lets other classes subscribe to selection changes
         */
        this._change = new Subject();
        this.id = 'clr-dg-selection' + nbSelection++;
        this.subscriptions.push(this._filters.change.subscribe((/**
         * @return {?}
         */
        () => {
            if (!this._selectable) {
                return;
            }
            this.clearSelection();
        })));
        this.subscriptions.push(this._items.allChanges.subscribe((/**
         * @param {?} updatedItems
         * @return {?}
         */
        updatedItems => {
            switch (this.selectionType) {
                case SelectionType.None: {
                    break;
                }
                case SelectionType.Single: {
                    /** @type {?} */
                    let newSingle;
                    /** @type {?} */
                    const trackBy = this._items.trackBy;
                    /** @type {?} */
                    let selectionUpdated = false;
                    // if the currentSingle has been set before data was loaded, we look up and save the ref from current data set
                    if (this.currentSingle && !this.prevSingleSelectionRef) {
                        if (this._items.all && this._items.trackBy) {
                            /** @type {?} */
                            const lookup = this._items.all.findIndex((/**
                             * @param {?} maybe
                             * @return {?}
                             */
                            maybe => maybe === this.currentSingle));
                            this.prevSingleSelectionRef = this._items.trackBy(lookup, this.currentSingle);
                        }
                    }
                    updatedItems.forEach((/**
                     * @param {?} item
                     * @param {?} index
                     * @return {?}
                     */
                    (item, index) => {
                        /** @type {?} */
                        const ref = trackBy(index, item);
                        // If one of the updated items is the previously selectedSingle, set it as the new one
                        if (this.prevSingleSelectionRef === ref) {
                            newSingle = item;
                            selectionUpdated = true;
                        }
                    }));
                    // If we're using smart datagrids, we expect all items to be present in the updatedItems array.
                    // Therefore, we should delete the currentSingle if it used to be defined but doesn't exist anymore.
                    // No explicit "delete" is required, since newSingle would be undefined at this point.
                    // Marking it as selectionUpdated here will set currentSingle to undefined below in the setTimeout.
                    if (this._items.smart && !newSingle) {
                        selectionUpdated = true;
                    }
                    // TODO: Discussed this with Eudes and this is fine for now.
                    // But we need to figure out a different pattern for the
                    // child triggering the parent change detection problem.
                    // Using setTimeout for now to fix this.
                    setTimeout((/**
                     * @return {?}
                     */
                    () => {
                        if (selectionUpdated) {
                            this.currentSingle = newSingle;
                        }
                    }), 0);
                    break;
                }
                case SelectionType.Multi: {
                    /** @type {?} */
                    let leftOver = this.current.slice();
                    /** @type {?} */
                    const trackBy = this._items.trackBy;
                    /** @type {?} */
                    let selectionUpdated = false;
                    // if the current has been set before data was loaded, we look up and save the ref from current data set
                    if (this.current.length > 0 && this.prevSelectionRefs.length !== this.current.length) {
                        if (this._items.all && this._items.trackBy) {
                            this.prevSelectionRefs = [];
                            this.current.forEach((/**
                             * @param {?} item
                             * @return {?}
                             */
                            item => {
                                /** @type {?} */
                                const lookup = this._items.all.findIndex((/**
                                 * @param {?} maybe
                                 * @return {?}
                                 */
                                maybe => maybe === item));
                                this.prevSelectionRefs.push(this._items.trackBy(lookup, item));
                            }));
                        }
                    }
                    // TODO: revisit this when we work on https://github.com/vmware/clarity/issues/2342
                    // currently, the selection is cleared when filter is applied, so the logic inside
                    // the if statement below results in broken behavior.
                    if (leftOver.length > 0) {
                        updatedItems.forEach((/**
                         * @param {?} item
                         * @param {?} index
                         * @return {?}
                         */
                        (item, index) => {
                            /** @type {?} */
                            const ref = trackBy(index, item);
                            // Look in current selected refs array if item is selected, and update actual value
                            /** @type {?} */
                            const selectedIndex = this.prevSelectionRefs.indexOf(ref);
                            if (selectedIndex > -1) {
                                leftOver[selectedIndex] = item;
                                selectionUpdated = true;
                            }
                        }));
                        // Filter out any unmatched items if we're using smart datagrids where we expect all items to be
                        // present
                        if (this._items.smart) {
                            leftOver = leftOver.filter((/**
                             * @param {?} selected
                             * @return {?}
                             */
                            selected => updatedItems.indexOf(selected) > -1));
                            if (this.current.length !== leftOver.length) {
                                selectionUpdated = true;
                            }
                        }
                        // TODO: Discussed this with Eudes and this is fine for now.
                        // But we need to figure out a different pattern for the
                        // child triggering the parent change detection problem.
                        // Using setTimeout for now to fix this.
                        setTimeout((/**
                         * @return {?}
                         */
                        () => {
                            if (selectionUpdated) {
                                this.current = leftOver;
                            }
                        }), 0);
                    }
                    break;
                }
                default: {
                    break;
                }
            }
        })));
    }
    /**
     * @return {?}
     */
    clearSelection() {
        this.current.length = 0;
        this.prevSelectionRefs = [];
        this._currentSingle = null;
        this.prevSingleSelectionRef = null;
        this.emitChange();
    }
    /**
     * @return {?}
     */
    get selectionType() {
        return this._selectionType;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set selectionType(value) {
        if (value === this.selectionType) {
            return;
        }
        this._selectionType = value;
        if (value === SelectionType.None) {
            delete this.current;
        }
        else {
            this.updateCurrent([], false);
        }
    }
    /**
     * @private
     * @return {?}
     */
    get _selectable() {
        return this._selectionType === SelectionType.Multi || this._selectionType === SelectionType.Single;
    }
    /**
     * Cleans up our subscriptions to other providers
     * @return {?}
     */
    destroy() {
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        sub => sub.unsubscribe()));
    }
    /**
     * @return {?}
     */
    get currentSingle() {
        return this._currentSingle;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set currentSingle(value) {
        if (value === this._currentSingle) {
            return;
        }
        this._currentSingle = value;
        if (this._items.all && this._items.trackBy && value) {
            /** @type {?} */
            const lookup = this._items.all.findIndex((/**
             * @param {?} maybe
             * @return {?}
             */
            maybe => maybe === value));
            this.prevSingleSelectionRef = this._items.trackBy(lookup, value);
        }
        this.emitChange();
        // Ignore items changes in the same change detection cycle.
        // @TODO This can likely be removed!
        this.debounce = true;
        setTimeout((/**
         * @return {?}
         */
        () => (this.debounce = false)));
    }
    /**
     * @return {?}
     */
    get current() {
        return this._current;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set current(value) {
        this.updateCurrent(value, true);
    }
    /**
     * @param {?} value
     * @param {?} emit
     * @return {?}
     */
    updateCurrent(value, emit) {
        this._current = value;
        if (emit) {
            this.emitChange();
            // Ignore items changes in the same change detection cycle.
            // @TODO This can likely be removed!
            this.debounce = true;
            setTimeout((/**
             * @return {?}
             */
            () => (this.debounce = false)));
        }
    }
    /**
     * @private
     * @return {?}
     */
    emitChange() {
        if (this._selectionType === SelectionType.Single) {
            this._change.next(this.currentSingle);
        }
        else if (this._selectionType === SelectionType.Multi) {
            this._change.next(this.current);
        }
    }
    // We do not want to expose the Subject itself, but the Observable which is read-only
    /**
     * @return {?}
     */
    get change() {
        return this._change.asObservable();
    }
    /**
     * Checks if an item is currently selected
     * @param {?} item
     * @return {?}
     */
    isSelected(item) {
        if (this._selectionType === SelectionType.Single) {
            return this.currentSingle === item;
        }
        else if (this._selectionType === SelectionType.Multi) {
            return this.current.indexOf(item) >= 0;
        }
        return false;
    }
    /**
     * Selects an item
     * @private
     * @param {?} item
     * @return {?}
     */
    selectItem(item) {
        this.current.push(item);
        if (this._items.trackBy) {
            // Push selected ref onto array
            /** @type {?} */
            const lookup = this._items.all.findIndex((/**
             * @param {?} maybe
             * @return {?}
             */
            maybe => maybe === item));
            this.prevSelectionRefs.push(this._items.trackBy(lookup, item));
        }
    }
    /**
     * Deselects an item
     * @private
     * @param {?} indexOfItem
     * @return {?}
     */
    deselectItem(indexOfItem) {
        this.current.splice(indexOfItem, 1);
        if (this._items.trackBy && indexOfItem < this.prevSelectionRefs.length) {
            // Keep selected refs array in sync
            this.prevSelectionRefs.splice(indexOfItem, 1);
        }
    }
    /**
     * Selects or deselects an item
     * @param {?} item
     * @param {?} selected
     * @return {?}
     */
    setSelected(item, selected) {
        switch (this._selectionType) {
            case SelectionType.None:
                break;
            case SelectionType.Single:
                // in single selection, set currentSingle method should be used
                break;
            case SelectionType.Multi:
                /** @type {?} */
                const index = this.current.indexOf(item);
                if (index >= 0 && !selected) {
                    this.deselectItem(index);
                    this.emitChange();
                }
                else if (index < 0 && selected) {
                    this.selectItem(item);
                    this.emitChange();
                }
                break;
            default:
                break;
        }
    }
    /**
     * Checks if all currently displayed items are selected
     * @return {?}
     */
    isAllSelected() {
        if (this._selectionType !== SelectionType.Multi || !this._items.displayed) {
            return false;
        }
        /** @type {?} */
        const displayedItems = this._items.displayed;
        /** @type {?} */
        const nbDisplayed = this._items.displayed.length;
        if (nbDisplayed < 1) {
            return false;
        }
        /** @type {?} */
        const temp = displayedItems.filter((/**
         * @param {?} item
         * @return {?}
         */
        item => this.current.indexOf(item) > -1));
        return temp.length === displayedItems.length;
    }
    /**
     * Selects or deselects all currently displayed items
     * @return {?}
     */
    toggleAll() {
        if (this._selectionType === SelectionType.None || this._selectionType === SelectionType.Single) {
            return;
        }
        /*
             * If every currently displayed item is already selected, we clear them.
             * If at least one item isn't selected, we select every currently displayed item.
             */
        if (this.isAllSelected()) {
            this._items.displayed.forEach((/**
             * @param {?} item
             * @return {?}
             */
            item => {
                /** @type {?} */
                const currentIndex = this.current.indexOf(item);
                if (currentIndex > -1) {
                    this.deselectItem(currentIndex);
                }
            }));
        }
        else {
            this._items.displayed.forEach((/**
             * @param {?} item
             * @return {?}
             */
            item => {
                if (this.current.indexOf(item) < 0) {
                    this.selectItem(item);
                }
            }));
        }
        this.emitChange();
    }
}
Selection.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Selection.ctorParameters = () => [
    { type: Items },
    { type: FiltersProvider }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class WrappedRow {
    constructor() {
        this._dynamic = false;
    }
    // the rows projected view (in memory)
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        // Create the cells view in memory, not the DOM.
        this.rowView = this.templateRef.createEmbeddedView(null);
    }
}
WrappedRow.decorators = [
    { type: Component, args: [{
                selector: 'dg-wrapped-row',
                template: `        
        <ng-template #rowPortal>
            <ng-content></ng-content>
        </ng-template>
    `
            }] }
];
WrappedRow.propDecorators = {
    templateRef: [{ type: ViewChild, args: ['rowPortal',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
let nbRow = 0;
/**
 * @template T
 */
class ClrDatagridRow {
    /**
     * @param {?} selection
     * @param {?} rowActionService
     * @param {?} globalExpandable
     * @param {?} expand
     * @param {?} displayMode
     * @param {?} vcr
     * @param {?} renderer
     * @param {?} el
     * @param {?} commonStrings
     */
    constructor(selection, rowActionService, globalExpandable, expand, displayMode, vcr, renderer, el, commonStrings) {
        this.selection = selection;
        this.rowActionService = rowActionService;
        this.globalExpandable = globalExpandable;
        this.expand = expand;
        this.displayMode = displayMode;
        this.vcr = vcr;
        this.renderer = renderer;
        this.el = el;
        this.commonStrings = commonStrings;
        /* reference to the enum so that template can access */
        this.SELECTION_TYPE = SelectionType;
        this._selected = false;
        this.selectedChanged = new EventEmitter(false);
        this.expandedChange = new EventEmitter(false);
        this.subscriptions = [];
        this.displayCells = false;
        nbRow++;
        this.id = 'clr-dg-row' + nbRow;
        this.radioId = 'clr-dg-row-rd' + nbRow;
        this.checkboxId = 'clr-dg-row-cb' + nbRow;
        this.subscriptions.push(combineLatest(this.expand.replace, this.expand.expandChange).subscribe((/**
         * @param {?} __0
         * @return {?}
         */
        ([expandReplaceValue, expandChangeValue]) => {
            if (expandReplaceValue && expandChangeValue) {
                // replaced and expanding
                this.replaced = true;
                this.renderer.addClass(this.el.nativeElement, 'datagrid-row-replaced');
            }
            else {
                this.replaced = false;
                // Handles these cases: not replaced and collapsing & replaced and
                // collapsing and not replaced and expanding.
                this.renderer.removeClass(this.el.nativeElement, 'datagrid-row-replaced');
            }
        })));
    }
    /**
     * Indicates if the row is selected
     * @return {?}
     */
    get selected() {
        if (this.selection.selectionType === SelectionType.None) {
            return this._selected;
        }
        else {
            return this.selection.isSelected(this.item);
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set selected(value) {
        if (this.selection.selectionType === SelectionType.None) {
            this._selected = value;
        }
        else {
            this.selection.setSelected(this.item, value);
        }
    }
    /**
     * @param {?=} selected
     * @return {?}
     */
    toggle(selected = !this.selected) {
        if (selected !== this.selected) {
            this.selected = selected;
            this.selectedChanged.emit(selected);
        }
    }
    /**
     * @return {?}
     */
    get expanded() {
        return this.expand.expanded;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set expanded(value) {
        this.expand.expanded = value;
    }
    /**
     * @return {?}
     */
    toggleExpand() {
        if (this.expand.expandable) {
            this.expanded = !this.expanded;
            this.expandedChange.emit(this.expanded);
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.dgCells.changes.subscribe((/**
         * @return {?}
         */
        () => {
            this.dgCells.forEach((/**
             * @param {?} cell
             * @return {?}
             */
            cell => {
                this._scrollableCells.insert(cell._view);
            }));
        }));
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.subscriptions.push(this.displayMode.view.subscribe((/**
         * @param {?} viewChange
         * @return {?}
         */
        viewChange => {
            // Listen for view changes and move cells around depending on the current displayType
            // remove cell views from display view
            for (let i = this._scrollableCells.length; i > 0; i--) {
                this._scrollableCells.detach();
            }
            // remove cell views from calculated view
            for (let i = this._calculatedCells.length; i > 0; i--) {
                this._calculatedCells.detach();
            }
            if (viewChange === DatagridDisplayMode.CALCULATE) {
                this.displayCells = false;
                this.dgCells.forEach((/**
                 * @param {?} cell
                 * @return {?}
                 */
                cell => {
                    this._calculatedCells.insert(cell._view);
                }));
            }
            else {
                this.displayCells = true;
                this.dgCells.forEach((/**
                 * @param {?} cell
                 * @return {?}
                 */
                cell => {
                    this._scrollableCells.insert(cell._view);
                }));
            }
        })));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        (sub) => sub.unsubscribe()));
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.wrappedInjector = new HostWrapper(WrappedRow, this.vcr);
    }
    /**
     * @return {?}
     */
    get _view() {
        return this.wrappedInjector.get(WrappedRow, this.vcr).rowView;
    }
}
ClrDatagridRow.decorators = [
    { type: Component, args: [{
                selector: 'clr-dg-row',
                template: "<!--\n  We need to wrap the #rowContent in label element if we are in rowSelectionMode.\n  Clicking of that wrapper label will equate to clicking on the whole row, which triggers the checkbox to toggle.\n-->\n<label class=\"datagrid-row-clickable\" *ngIf=\"selection.rowSelectionMode\">\n  <ng-template [ngTemplateOutlet]=\"rowContent\"></ng-template>\n</label>\n\n<ng-template *ngIf=\"!selection.rowSelectionMode\" [ngTemplateOutlet]=\"rowContent\"></ng-template>\n\n<!--\n    We need the \"project into template\" hacks because we need this in 2 different places\n    depending on whether the details replace the row or not.\n-->\n<ng-template #detail>\n  <ng-content select=\"clr-dg-row-detail\"></ng-content>\n</ng-template>\n\n<ng-template #rowContent>\n  <div role=\"row\" [id]=\"id\" class=\"datagrid-row-master datagrid-row-flex\">\n    <div class=\"datagrid-row-sticky\">\n      <!-- Sticky elements here -->\n      <ng-container #stickyCells></ng-container> <!-- placeholder for projecting other sticky cells as pinned-->\n    </div>\n    <div class=\"datagrid-row-scrollable\" [ngClass]=\"{'is-replaced': replaced && expanded}\">\n      <div class=\"datagrid-scrolling-cells\">\n        <div *ngIf=\"selection.selectionType === SELECTION_TYPE.Multi\"\n             class=\"datagrid-select datagrid-fixed-column datagrid-cell\">\n          <input clrCheckbox type=\"checkbox\" [ngModel]=\"selected\" (ngModelChange)=\"toggle($event)\" [id]=\"checkboxId\"\n                 [attr.aria-label]=\"commonStrings.select\">\n        </div>\n        <div *ngIf=\"selection.selectionType === SELECTION_TYPE.Single\"\n             class=\"datagrid-select datagrid-fixed-column datagrid-cell\">\n            <!-- TODO: it would be better if in addition to the generic \"Select\" label, we could add aria-labelledby\n            to label the radio by the first cell in the row (typically an id or name).\n            It's pretty easy to label it with the whole row since we already have an id for it, but in most\n            cases the row is far too long to serve as a label, the screenreader reads every single cell content. -->\n            <input type=\"radio\" clrRadio [id]=\"radioId\" [name]=\"selection.id + '-radio'\" [value]=\"item\"\n                   [(ngModel)]=\"selection.currentSingle\" [checked]=\"selection.currentSingle === item\"\n                   [attr.aria-label]=\"commonStrings.select\">\n        </div>\n        <div *ngIf=\"rowActionService.hasActionableRow\"\n             class=\"datagrid-row-actions datagrid-fixed-column datagrid-cell\">\n          <ng-content select=\"clr-dg-action-overflow\"></ng-content>\n        </div>\n        <div *ngIf=\"globalExpandable.hasExpandableRow\"\n             class=\"datagrid-expandable-caret datagrid-fixed-column datagrid-cell\">\n          <ng-container *ngIf=\"expand.expandable\">\n            <button (click)=\"toggleExpand()\" *ngIf=\"!expand.loading\" type=\"button\" class=\"datagrid-expandable-caret-button\">\n              <clr-icon shape=\"caret\"\n                        class=\"datagrid-expandable-caret-icon\"\n                        [attr.dir]=\"expand.expanded ? 'down' : 'right'\"\n                        [attr.title]=\"expand.expanded ? commonStrings.collapse : commonStrings.expand\"></clr-icon>\n            </button>\n            <div class=\"spinner spinner-sm\" *ngIf=\"expand.loading\"></div>\n          </ng-container>\n        </div>\n        <ng-container #scrollableCells></ng-container>\n      </div>\n      <!-- details here when replace, re-visit when sticky container is used for pinned cells -->\n      <ng-template *ngIf=\"replaced && !expand.loading\"\n                   [ngTemplateOutlet]=\"detail\"></ng-template>\n    </div>\n    <ng-template *ngIf=\"!replaced && !expand.loading\"\n                 [ngTemplateOutlet]=\"detail\"></ng-template>\n  </div>\n</ng-template>\n\n<ng-container #calculatedCells></ng-container>\n",
                host: {
                    '[class.datagrid-row]': 'true',
                    '[class.datagrid-selected]': 'selected',
                    '[attr.aria-owns]': 'id',
                    role: 'rowgroup',
                },
                providers: [
                    DatagridIfExpandService,
                    { provide: IfExpandService, useExisting: DatagridIfExpandService },
                    { provide: LoadingListener, useExisting: DatagridIfExpandService },
                ]
            }] }
];
/** @nocollapse */
ClrDatagridRow.ctorParameters = () => [
    { type: Selection },
    { type: RowActionService },
    { type: ExpandableRowsCount },
    { type: DatagridIfExpandService },
    { type: DisplayModeService },
    { type: ViewContainerRef },
    { type: Renderer2 },
    { type: ElementRef },
    { type: ClrCommonStrings }
];
ClrDatagridRow.propDecorators = {
    item: [{ type: Input, args: ['clrDgItem',] }],
    selected: [{ type: Input, args: ['clrDgSelected',] }],
    selectedChanged: [{ type: Output, args: ['clrDgSelectedChange',] }],
    expanded: [{ type: Input, args: ['clrDgExpanded',] }],
    expandedChange: [{ type: Output, args: ['clrDgExpandedChange',] }],
    dgCells: [{ type: ContentChildren, args: [ClrDatagridCell,] }],
    _stickyCells: [{ type: ViewChild, args: ['stickyCells', { read: ViewContainerRef },] }],
    _scrollableCells: [{ type: ViewChild, args: ['scrollableCells', { read: ViewContainerRef },] }],
    _calculatedCells: [{ type: ViewChild, args: ['calculatedCells', { read: ViewContainerRef },] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * This provider aggregates state changes from the various providers of the Datagrid
 * @template T
 */
class StateProvider {
    /**
     * @param {?} filters
     * @param {?} sort
     * @param {?} page
     * @param {?} debouncer
     */
    constructor(filters, sort, page, debouncer) {
        this.filters = filters;
        this.sort = sort;
        this.page = page;
        this.debouncer = debouncer;
        /**
         * The Observable that lets other classes subscribe to global state changes
         */
        this.change = this.debouncer.change.pipe(map((/**
         * @return {?}
         */
        () => this.state)));
    }
    /*
         * By making this a getter, we open the possibility for a setter in the future.
         * It's been requested a couple times.
         */
    /**
     * @return {?}
     */
    get state() {
        /** @type {?} */
        const state$$1 = {};
        if (this.page.size > 0) {
            state$$1.page = { from: this.page.firstItem, to: this.page.lastItem, size: this.page.size };
        }
        if (this.sort.comparator) {
            if (this.sort.comparator instanceof DatagridPropertyComparator) {
                /*
                         * Special case for the default object property comparator,
                         * we give the property name instead of the actual comparator.
                         */
                state$$1.sort = { by: ((/** @type {?} */ (this.sort.comparator))).prop, reverse: this.sort.reverse };
            }
            else {
                state$$1.sort = { by: this.sort.comparator, reverse: this.sort.reverse };
            }
        }
        /** @type {?} */
        const activeFilters = this.filters.getActiveFilters();
        if (activeFilters.length > 0) {
            state$$1.filters = [];
            for (const filter$$1 of activeFilters) {
                if (filter$$1.state) {
                    state$$1.filters.push(filter$$1.state);
                }
                else {
                    state$$1.filters.push(filter$$1);
                }
            }
        }
        return state$$1;
    }
}
StateProvider.decorators = [
    { type: Injectable }
];
/** @nocollapse */
StateProvider.ctorParameters = () => [
    { type: FiltersProvider },
    { type: Sort },
    { type: Page },
    { type: StateDebouncer }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * \@description
 * Internal datagrid service that holds a reference to the clr-dg-table element and exposes a method to get height.
 */
class TableSizeService {
    /**
     * @param {?} platformId
     */
    constructor(platformId) {
        this.platformId = platformId;
    }
    /**
     * @return {?}
     */
    get tableRef() {
        return this._tableRef;
    }
    /**
     * @param {?} element
     * @return {?}
     */
    set tableRef(element) {
        this._tableRef = element;
    }
    /**
     * @param {?} table
     * @return {?}
     */
    set table(table) {
        if (isPlatformBrowser(this.platformId) && table.nativeElement) {
            this.tableRef = table.nativeElement.querySelector('.datagrid-table');
        }
    }
    // Used when resizing columns to show the column border being dragged.
    /**
     * @return {?}
     */
    getColumnDragHeight() {
        if (!this.tableRef) {
            return;
        }
        return `${this.tableRef.clientHeight}px`;
    }
}
TableSizeService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
TableSizeService.ctorParameters = () => [
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ColumnsService {
    constructor() {
        this.columns = [];
    }
    /**
     * @return {?}
     */
    get columnStates() {
        return this.columns.map((/**
         * @param {?} column
         * @return {?}
         */
        column => column.value));
    }
    /**
     * @return {?}
     */
    get hasHideableColumns() {
        return this.columnStates.filter((/**
         * @param {?} state
         * @return {?}
         */
        state$$1 => state$$1.hideable)).length > 0;
    }
    // Helper method to emit a change to a column only when there is an actual diff to process for that column
    /**
     * @param {?} columnIndex
     * @param {?} diff
     * @return {?}
     */
    emitStateChangeAt(columnIndex, diff) {
        if (!this.columns[columnIndex]) {
            return;
        }
        this.emitStateChange(this.columns[columnIndex], diff);
    }
    /**
     * @param {?} column
     * @param {?} diff
     * @return {?}
     */
    emitStateChange(column, diff) {
        /** @type {?} */
        const current = column.value;
        column.next(Object.assign({}, current, diff));
    }
}
ColumnsService.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
class ClrDatagrid {
    /**
     * @param {?} organizer
     * @param {?} items
     * @param {?} expandableRows
     * @param {?} selection
     * @param {?} rowActionService
     * @param {?} stateProvider
     * @param {?} displayMode
     * @param {?} renderer
     * @param {?} el
     * @param {?} commonStrings
     */
    constructor(organizer, items, expandableRows, selection, rowActionService, stateProvider, displayMode, renderer, el, commonStrings) {
        this.organizer = organizer;
        this.items = items;
        this.expandableRows = expandableRows;
        this.selection = selection;
        this.rowActionService = rowActionService;
        this.stateProvider = stateProvider;
        this.displayMode = displayMode;
        this.renderer = renderer;
        this.el = el;
        this.commonStrings = commonStrings;
        /* reference to the enum so that template can access */
        this.SELECTION_TYPE = SelectionType;
        /**
         * Output emitted whenever the data needs to be refreshed, based on user action or external ones
         */
        this.refresh = new EventEmitter(false);
        this.selectedChanged = new EventEmitter(false);
        this.singleSelectedChanged = new EventEmitter(false);
        /**
         * Subscriptions to all the services and queries changes
         */
        this._subscriptions = [];
    }
    /**
     * Freezes the datagrid while data is loading
     * @return {?}
     */
    get loading() {
        return this.items.loading;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set loading(value) {
        this.items.loading = value;
    }
    /**
     * Public method to re-trigger the computation of displayed items manually
     * @return {?}
     */
    dataChanged() {
        this.items.refresh();
    }
    /**
     * Array of all selected items
     * @param {?} value
     * @return {?}
     */
    set selected(value) {
        if (value) {
            this.selection.selectionType = SelectionType.Multi;
        }
        else {
            this.selection.selectionType = SelectionType.None;
        }
        this.selection.updateCurrent(value, false);
    }
    /**
     * Selected item in single-select mode
     * @param {?} value
     * @return {?}
     */
    set singleSelected(value) {
        this.selection.selectionType = SelectionType.Single;
        // the clrDgSingleSelected is updated in one of two cases:
        // 1. an explicit value is passed
        // 2. is being set to null or undefined, where previously it had a value
        if (value) {
            this.selection.currentSingle = value;
        }
        else if (this.selection.currentSingle) {
            this.selection.currentSingle = null;
        }
    }
    /**
     * @deprecated since 2.0, remove in 3.0
     *
     * Selection/Deselection on row click mode
     * @param {?} value
     * @return {?}
     */
    set rowSelectionMode(value) {
        this.selection.rowSelectionMode = value;
    }
    /**
     * Indicates if all currently displayed items are selected
     * @return {?}
     */
    get allSelected() {
        return this.selection.isAllSelected();
    }
    /**
     * Selects/deselects all currently displayed items
     * @param {?} value
     * @return {?}
     */
    set allSelected(value) {
        /*
             * This is a setter but we ignore the value.
             * It's strange, but it lets us have an indeterminate state where only
             * some of the items are selected.
             */
        this.selection.toggleAll();
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        if (!this.items.smart) {
            this.items.all = this.rows.map((/**
             * @param {?} row
             * @return {?}
             */
            (row) => row.item));
        }
        this._subscriptions.push(this.rows.changes.subscribe((/**
         * @return {?}
         */
        () => {
            if (!this.items.smart) {
                this.items.all = this.rows.map((/**
                 * @param {?} row
                 * @return {?}
                 */
                (row) => row.item));
            }
            this.rows.forEach((/**
             * @param {?} row
             * @return {?}
             */
            row => {
                this._displayedRows.insert(row._view);
            }));
        })));
    }
    /**
     * Our setup happens in the view of some of our components, so we wait for it to be done before starting
     * @return {?}
     */
    ngAfterViewInit() {
        // TODO: determine if we can get rid of provider wiring in view init so that subscriptions can be done earlier
        this.refresh.emit(this.stateProvider.state);
        this._subscriptions.push(this.stateProvider.change.subscribe((/**
         * @param {?} state
         * @return {?}
         */
        state$$1 => this.refresh.emit(state$$1))));
        this._subscriptions.push(this.selection.change.subscribe((/**
         * @param {?} s
         * @return {?}
         */
        s => {
            if (this.selection.selectionType === SelectionType.Single) {
                this.singleSelectedChanged.emit((/** @type {?} */ (s)));
            }
            else if (this.selection.selectionType === SelectionType.Multi) {
                this.selectedChanged.emit((/** @type {?} */ (s)));
            }
        })));
        // A subscription that listens for displayMode changes on the datagrid
        this.displayMode.view.subscribe((/**
         * @param {?} viewChange
         * @return {?}
         */
        viewChange => {
            // Remove any projected columns from the projectedDisplayColumns container
            for (let i = this._projectedDisplayColumns.length; i > 0; i--) {
                this._projectedDisplayColumns.detach();
            }
            // Remove any projected columns from the projectedCalculationColumns container
            for (let i = this._projectedCalculationColumns.length; i > 0; i--) {
                this._projectedCalculationColumns.detach();
            }
            // Remove any projected rows from the calculationRows container
            for (let i = this._calculationRows.length; i > 0; i--) {
                this._calculationRows.detach();
            }
            // Remove any projected rows from the displayedRows container
            for (let i = this._displayedRows.length; i > 0; i--) {
                this._displayedRows.detach();
            }
            if (viewChange === DatagridDisplayMode.DISPLAY) {
                // Set state, style for the datagrid to DISPLAY and insert row & columns into containers
                this.renderer.removeClass(this.el.nativeElement, 'datagrid-calculate-mode');
                this.columns.forEach((/**
                 * @param {?} column
                 * @return {?}
                 */
                column => {
                    this._projectedDisplayColumns.insert(column._view);
                }));
                this.rows.forEach((/**
                 * @param {?} row
                 * @return {?}
                 */
                row => {
                    this._displayedRows.insert(row._view);
                }));
            }
            else {
                // Set state, style for the datagrid to CALCULATE and insert row & columns into containers
                this.renderer.addClass(this.el.nativeElement, 'datagrid-calculate-mode');
                this.columns.forEach((/**
                 * @param {?} column
                 * @return {?}
                 */
                column => {
                    this._projectedCalculationColumns.insert(column._view);
                }));
                this.rows.forEach((/**
                 * @param {?} row
                 * @return {?}
                 */
                row => {
                    this._calculationRows.insert(row._view);
                }));
            }
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        (sub) => sub.unsubscribe()));
    }
    /**
     * @return {?}
     */
    resize() {
        this.organizer.resize();
    }
}
ClrDatagrid.decorators = [
    { type: Component, args: [{
                selector: 'clr-datagrid',
                template: "<!--\n  ~ Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.\n  ~ This software is released under MIT license.\n  ~ The full license information can be found in LICENSE in the root directory of this project.\n  -->\n\n<ng-content select=\"clr-dg-action-bar\"></ng-content>\n<div class=\"datagrid\" #datagrid>\n    <div class=\"datagrid-table-wrapper\">\n      <div role=\"grid\" class=\"datagrid-table\">\n        <div role=\"rowgroup\" class=\"datagrid-header\">\n          <div role=\"row\" class=\"datagrid-row\">\n            <div class=\"datagrid-row-master datagrid-row-flex\">\n              <div class=\"datagrid-row-sticky\">\n                <!-- Sticky elements here -->\n              </div>\n              <div class=\"datagrid-row-scrollable\">\n                <!--header for datagrid where you can select multiple rows -->\n                <div role=\"columnheader\" class=\"datagrid-column datagrid-select datagrid-fixed-column\"\n                     *ngIf=\"selection.selectionType === SELECTION_TYPE.Multi\">\n                            <span class=\"datagrid-column-title\">\n                                <input clrCheckbox type=\"checkbox\" [(ngModel)]=\"allSelected\"\n                                       [attr.aria-label]=\"commonStrings.selectAll\">\n                            </span>\n                  <div class=\"datagrid-column-separator\"></div>\n                </div>\n                <!-- header for datagrid where you can select one row only -->\n                <div role=\"columnheader\" class=\"datagrid-column datagrid-select datagrid-fixed-column\"\n                     *ngIf=\"selection.selectionType === SELECTION_TYPE.Single\">\n                  <div class=\"datagrid-column-separator\"></div>\n                </div>\n                <!-- header for single row action; only displayType if we have at least one actionable row in datagrid -->\n                <div role=\"columnheader\" class=\"datagrid-column datagrid-row-actions datagrid-fixed-column\"\n                     *ngIf=\"rowActionService.hasActionableRow\">\n                  <div class=\"datagrid-column-separator\"></div>\n                </div>\n                <!-- header for carets; only displayType if we have at least one expandable row in datagrid -->\n                <div role=\"columnheader\" class=\"datagrid-column datagrid-expandable-caret datagrid-fixed-column\"\n                     *ngIf=\"expandableRows.hasExpandableRow\">\n                  <div class=\"datagrid-column-separator\"></div>\n                </div>\n                <ng-container #projectedDisplayColumns></ng-container>\n              </div>\n            </div>\n          </div>\n        </div>\n        <ng-container #displayedRows></ng-container>\n        <!-- Custom placeholder overrides the default empty one -->\n        <ng-content select=\"clr-dg-placeholder\"></ng-content>\n        <clr-dg-placeholder *ngIf=\"!placeholder\"></clr-dg-placeholder>\n      </div>\n    </div>\n</div>\n<ng-content select=\"clr-dg-footer\"></ng-content>\n<div class=\"datagrid-spinner\" *ngIf=\"loading\">\n    <div class=\"spinner spinner-md\">Loading...</div>\n</div>\n\n<div class=\"datagrid-calculation-table\">\n    <div class=\"datagrid-calculation-header\">\n        <ng-container #projectedCalculationColumns></ng-container>\n    </div>\n    <ng-container #calculationRows></ng-container>\n</div>\n",
                providers: [
                    Selection,
                    Sort,
                    FiltersProvider,
                    Page,
                    Items,
                    DatagridRenderOrganizer,
                    RowActionService,
                    ExpandableRowsCount,
                    StateDebouncer,
                    StateProvider,
                    TableSizeService,
                    ColumnsService,
                    DisplayModeService,
                ],
                host: { '[class.datagrid-host]': 'true' }
            }] }
];
/** @nocollapse */
ClrDatagrid.ctorParameters = () => [
    { type: DatagridRenderOrganizer },
    { type: Items },
    { type: ExpandableRowsCount },
    { type: Selection },
    { type: RowActionService },
    { type: StateProvider },
    { type: DisplayModeService },
    { type: Renderer2 },
    { type: ElementRef },
    { type: ClrCommonStrings }
];
ClrDatagrid.propDecorators = {
    loading: [{ type: Input, args: ['clrDgLoading',] }],
    refresh: [{ type: Output, args: ['clrDgRefresh',] }],
    iterator: [{ type: ContentChild, args: [ClrDatagridItems,] }],
    selected: [{ type: Input, args: ['clrDgSelected',] }],
    selectedChanged: [{ type: Output, args: ['clrDgSelectedChange',] }],
    singleSelected: [{ type: Input, args: ['clrDgSingleSelected',] }],
    singleSelectedChanged: [{ type: Output, args: ['clrDgSingleSelectedChange',] }],
    rowSelectionMode: [{ type: Input, args: ['clrDgRowSelection',] }],
    placeholder: [{ type: ContentChild, args: [ClrDatagridPlaceholder,] }],
    columns: [{ type: ContentChildren, args: [ClrDatagridColumn,] }],
    rows: [{ type: ContentChildren, args: [ClrDatagridRow,] }],
    scrollableColumns: [{ type: ViewChild, args: ['scrollableColumns', { read: ViewContainerRef },] }],
    _projectedDisplayColumns: [{ type: ViewChild, args: ['projectedDisplayColumns', { read: ViewContainerRef },] }],
    _projectedCalculationColumns: [{ type: ViewChild, args: ['projectedCalculationColumns', { read: ViewContainerRef },] }],
    _displayedRows: [{ type: ViewChild, args: ['displayedRows', { read: ViewContainerRef },] }],
    _calculationRows: [{ type: ViewChild, args: ['calculationRows', { read: ViewContainerRef },] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrDatagridActionBar {
}
ClrDatagridActionBar.decorators = [
    { type: Component, args: [{
                selector: 'clr-dg-action-bar',
                template: `
        <ng-content></ng-content>
    `,
                host: { '[class.datagrid-action-bar]': 'true' }
            }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrDatagridActionOverflow {
    /**
     * @param {?} rowActionService
     * @param {?} commonStrings
     */
    constructor(rowActionService, commonStrings) {
        this.rowActionService = rowActionService;
        this.commonStrings = commonStrings;
        this.anchorPoint = Point.RIGHT_CENTER;
        this.popoverPoint = Point.LEFT_CENTER;
        /**
         * Tracks whether the action overflow menu is open or not
         */
        this._open = false;
        this.openChanged = new EventEmitter(false);
        this.rowActionService.register();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.rowActionService.unregister();
    }
    /**
     * @return {?}
     */
    get open() {
        return this._open;
    }
    /**
     * @param {?} open
     * @return {?}
     */
    set open(open) {
        /** @type {?} */
        const boolOpen = !!open;
        if (boolOpen !== this._open) {
            this._open = boolOpen;
            this.openChanged.emit(boolOpen);
        }
    }
    /**
     * Shows/hides the action overflow menu
     * @param {?} event
     * @return {?}
     */
    toggle(event) {
        this.openingEvent = event;
        this.open = !this.open;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    close(event) {
        /*
             * Because this listener is added synchonously, before the event finishes bubbling up the DOM,
             * we end up firing on the very click that just opened the menu, p
             * otentially closing it immediately every time. So we just ignore it.
             */
        if (event === this.openingEvent) {
            delete this.openingEvent;
            return;
        }
        this.open = false;
    }
}
ClrDatagridActionOverflow.decorators = [
    { type: Component, args: [{
                selector: 'clr-dg-action-overflow',
                template: `
        <button (click)="toggle($event)" type="button" class="datagrid-action-toggle" #anchor>
            <clr-icon shape="ellipsis-vertical" [attr.title]="commonStrings.rowActions"></clr-icon>
        </button>
        <ng-template [(clrPopoverOld)]="open" [clrPopoverOldAnchor]="anchor" [clrPopoverOldAnchorPoint]="anchorPoint"
                     [clrPopoverOldPopoverPoint]="popoverPoint">
            <div #menu class="datagrid-action-overflow" (clrOutsideClick)="close($event)" [clrStrict]="true">
                <ng-content></ng-content>
            </div>
        </ng-template>
    `
            }] }
];
/** @nocollapse */
ClrDatagridActionOverflow.ctorParameters = () => [
    { type: RowActionService },
    { type: ClrCommonStrings }
];
ClrDatagridActionOverflow.propDecorators = {
    open: [{ type: Input, args: ['clrDgActionOverflowOpen',] }],
    openChanged: [{ type: Output, args: ['clrDgActionOverflowOpenChange',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const MIN_COLUMN_WIDTH = 96;
// This service allows DatagridHeaderRenderer and ClrDatagridColumnSeparator
// to share column resize data with each other.
class ColumnResizerService {
    /**
     * @param {?} el
     * @param {?} domAdapter
     * @param {?} organizer
     */
    constructor(el, domAdapter, organizer) {
        this.el = el;
        this.domAdapter = domAdapter;
        this.organizer = organizer;
        this._resizedBy = 0;
    }
    /**
     * @return {?}
     */
    get resizedBy() {
        return this._resizedBy;
    }
    /**
     * @return {?}
     */
    get minColumnWidth() {
        return this.domAdapter.minWidth(this.el.nativeElement) || MIN_COLUMN_WIDTH;
    }
    /**
     * @return {?}
     */
    get maxResizeRange() {
        return this.widthBeforeResize - this.minColumnWidth;
    }
    /**
     * @return {?}
     */
    startResize() {
        this._resizedBy = 0;
        this.isWithinMaxResizeRange = true;
        this.widthBeforeResize = this.domAdapter.clientRect(this.el.nativeElement).width;
    }
    /**
     * @return {?}
     */
    endResize() {
        this.organizer.resize();
    }
    /**
     * @return {?}
     */
    get widthAfterResize() {
        return this.widthBeforeResize + this._resizedBy;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    calculateResize(event) {
        /** @type {?} */
        const moveX = event.dragPosition.moveX;
        // returns the resize amount within the allowed range
        if (moveX < -this.maxResizeRange) {
            this._resizedBy = -this.maxResizeRange;
            this.isWithinMaxResizeRange = false;
        }
        else {
            this._resizedBy = moveX;
            this.isWithinMaxResizeRange = true;
        }
    }
}
ColumnResizerService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ColumnResizerService.ctorParameters = () => [
    { type: ElementRef },
    { type: DomAdapter },
    { type: DatagridRenderOrganizer }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
let NB_INSTANCES = 0;
/** @type {?} */
const UNIQUE_ID = new InjectionToken('UNIQUE_ID');
/**
 * @return {?}
 */
function uniqueIdFactory() {
    return 'clr-id-' + NB_INSTANCES++;
}
/** @type {?} */
const UNIQUE_ID_PROVIDER = {
    provide: UNIQUE_ID,
    useFactory: uniqueIdFactory,
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrDatagridColumnSeparator {
    // Every column draggable separator should have its own unique ID
    // in order to not conflict with other draggables/droppables.
    /**
     * @param {?} columnResizerService
     * @param {?} renderer
     * @param {?} tableSizeService
     * @param {?} document
     * @param {?} columnSeparatorId
     */
    constructor(columnResizerService, renderer, tableSizeService, document, columnSeparatorId) {
        this.columnResizerService = columnResizerService;
        this.renderer = renderer;
        this.tableSizeService = tableSizeService;
        this.document = document;
        this.columnSeparatorId = columnSeparatorId;
    }
    /**
     * @param {?} resizeTrackerEl
     * @return {?}
     */
    showTracker(resizeTrackerEl) {
        this.columnResizerService.startResize();
        /** @type {?} */
        const tableHeight = this.tableSizeService.getColumnDragHeight();
        this.renderer.setStyle(resizeTrackerEl, 'height', tableHeight);
        this.renderer.setStyle(resizeTrackerEl, 'display', 'block');
    }
    /**
     * @param {?} event
     * @param {?} resizeTrackerEl
     * @return {?}
     */
    moveTracker(event, resizeTrackerEl) {
        this.columnResizerService.calculateResize(event);
        this.renderer.setStyle(resizeTrackerEl, 'transform', `translateX(${this.columnResizerService.resizedBy}px)`);
        this.renderer.setStyle(this.document.body, 'cursor', 'col-resize');
        this.redFlagTracker(resizeTrackerEl);
    }
    /**
     * @param {?} resizeTrackerEl
     * @return {?}
     */
    hideTracker(resizeTrackerEl) {
        this.columnResizerService.endResize();
        this.renderer.setStyle(resizeTrackerEl, 'display', 'none');
        this.renderer.setStyle(resizeTrackerEl, 'transform', `translateX(0px)`);
        this.renderer.setStyle(this.document.body, 'cursor', 'auto');
    }
    /**
     * @private
     * @param {?} resizeTrackerEl
     * @return {?}
     */
    redFlagTracker(resizeTrackerEl) {
        /** @type {?} */
        let isWithinMaxResizeRange;
        // @TODO(JEREMY) Review this, it will always be true because above is always null
        if (isWithinMaxResizeRange !== this.columnResizerService.isWithinMaxResizeRange) {
            isWithinMaxResizeRange = this.columnResizerService.isWithinMaxResizeRange;
            if (!isWithinMaxResizeRange) {
                this.renderer.addClass(resizeTrackerEl, 'exceeded-max');
            }
            else {
                this.renderer.removeClass(resizeTrackerEl, 'exceeded-max');
            }
        }
    }
}
ClrDatagridColumnSeparator.decorators = [
    { type: Component, args: [{
                selector: 'clr-dg-column-separator',
                template: `
    <div class="datagrid-column-handle" aria-hidden="true"
      clrDraggable 
      [clrGroup]="columnSeparatorId" 
      (clrDragStart)="showTracker(resizeTrackerEl)" 
      (clrDragMove)="moveTracker($event, resizeTrackerEl)" 
      (clrDragEnd)="hideTracker(resizeTrackerEl)"></div>
    <div class="datagrid-column-resize-tracker" #resizeTrackerEl></div>
    `,
                host: {
                    '[class.datagrid-column-separator]': 'true',
                },
                providers: [UNIQUE_ID_PROVIDER]
            }] }
];
/** @nocollapse */
ClrDatagridColumnSeparator.ctorParameters = () => [
    { type: ColumnResizerService },
    { type: Renderer2 },
    { type: TableSizeService },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: String, decorators: [{ type: Inject, args: [UNIQUE_ID,] }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/** @enum {number} */
const DatagridColumnChanges = {
    WIDTH: 0,
    HIDDEN: 1,
};
DatagridColumnChanges[DatagridColumnChanges.WIDTH] = 'WIDTH';
DatagridColumnChanges[DatagridColumnChanges.HIDDEN] = 'HIDDEN';
const ɵ1 = /**
 * @param {?} key
 * @return {?}
 */
key => DatagridColumnChanges[key], ɵ0 = /**
 * @param {?} key
 * @return {?}
 */
key => key === parseInt(key, 10);
/** @type {?} */
const ALL_COLUMN_CHANGES = Object.keys(DatagridColumnChanges)
    .map((ɵ1))
    .filter((ɵ0));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @deprecated since 2.0, remove in 3.0 */
class ClrDatagridColumnToggleButton {
    /**
     * @param {?} columnsService
     */
    constructor(columnsService) {
        this.columnsService = columnsService;
    }
    /**
     * @private
     * @return {?}
     */
    hideableColumns() {
        return this.columnsService.columns.filter((/**
         * @param {?} column
         * @return {?}
         */
        column => column.value.hideable));
    }
    /**
     * @return {?}
     */
    get allHideablesVisible() {
        return this.hideableColumns().filter((/**
         * @param {?} column
         * @return {?}
         */
        column => column.value.hidden)).length === 0;
    }
    /**
     * @return {?}
     */
    selectAll() {
        this.hideableColumns().forEach((/**
         * @param {?} hideableColumn
         * @return {?}
         */
        hideableColumn => this.columnsService.emitStateChange(hideableColumn, {
            hidden: false,
            changes: [DatagridColumnChanges.HIDDEN],
        })));
    }
}
ClrDatagridColumnToggleButton.decorators = [
    { type: Component, args: [{
                selector: 'clr-dg-column-toggle-button',
                template: `
    <button class="btn btn-sm btn-link switch-button"
            (click)="selectAll()"
            [disabled]="allHideablesVisible"
            type="button">
      <ng-content></ng-content>
    </button>
  `
            }] }
];
/** @nocollapse */
ClrDatagridColumnToggleButton.ctorParameters = () => [
    { type: ColumnsService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @deprecated since 2.0, remove in 3.0 */
class ClrDatagridColumnToggleTitle {
}
ClrDatagridColumnToggleTitle.decorators = [
    { type: Component, args: [{
                selector: 'clr-dg-column-toggle-title',
                template: `<ng-content></ng-content>`
            }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @deprecated since 2.0, remove in 3.0 */
class ClrDatagridColumnToggle {
    /**
     * @param {?} commonStrings
     * @param {?} columnsService
     */
    constructor(commonStrings, columnsService) {
        this.commonStrings = commonStrings;
        this.columnsService = columnsService;
        /**
         *
         * Popover init
         */
        this.anchorPoint = Point.TOP_LEFT;
        this.popoverPoint = Point.LEFT_BOTTOM;
        this.open = false;
    }
    /**
     * @return {?}
     */
    get hideableColumnStates() {
        /** @type {?} */
        const hideables = this.columnsService.columns.filter((/**
         * @param {?} column
         * @return {?}
         */
        column => column.value.hideable));
        return hideables.map((/**
         * @param {?} column
         * @return {?}
         */
        column => column.value));
    }
    /**
     * @return {?}
     */
    get hasOnlyOneVisibleColumn() {
        /** @type {?} */
        const nbNonHideableColumns = this.columnsService.columns.length - this.hideableColumnStates.length;
        // this should only return true when there is no non-hideable columns.
        return (nbNonHideableColumns === 0 && this.hideableColumnStates.filter((/**
         * @param {?} columnState
         * @return {?}
         */
        columnState => !columnState.hidden)).length === 1);
    }
    /**
     * @param {?} columnState
     * @param {?} event
     * @return {?}
     */
    toggleColumnState(columnState, event) {
        /** @type {?} */
        const columnToToggle = this.columnsService.columns.filter((/**
         * @param {?} column
         * @return {?}
         */
        column => column.value === columnState))[0];
        this.columnsService.emitStateChange(columnToToggle, {
            hidden: event,
            changes: [DatagridColumnChanges.HIDDEN],
        });
    }
    /**
     * @return {?}
     */
    toggleSwitchPanel() {
        this.open = !this.open;
    }
}
ClrDatagridColumnToggle.decorators = [
    { type: Component, args: [{
                selector: 'clr-dg-column-toggle',
                template: `
    <button
      #anchor
      (click)="toggleSwitchPanel()"
      class="btn btn-sm btn-link column-toggle--action"
      type="button">
      <clr-icon shape="view-columns" [attr.title]="commonStrings.pickColumns"></clr-icon>
    </button>
    <div class="column-switch"
         *clrPopoverOld="open; anchor: anchor; anchorPoint: anchorPoint; popoverPoint: popoverPoint">
      <div class="switch-header">
        <ng-container *ngIf="!customToggleTitle">{{commonStrings.showColumns}}</ng-container>
        <ng-content select="clr-dg-column-toggle-title"></ng-content>
        <button
          class="btn btn-sm btn-link toggle-switch-close-button"
          (click)="toggleSwitchPanel()"
          type="button">
          <clr-icon shape="close" [attr.title]="commonStrings.close"></clr-icon>
        </button>
      </div>
      <ul class="switch-content list-unstyled">
        <li *ngFor="let columnState of hideableColumnStates;">
          <clr-checkbox-wrapper>
            <input clrCheckbox type="checkbox"
                   [disabled]="hasOnlyOneVisibleColumn && !columnState.hidden"
                   [ngModel]="!columnState.hidden"
                   (ngModelChange)="toggleColumnState(columnState, !$event)">
            <label>
              <ng-template [ngTemplateOutlet]="columnState.titleTemplateRef"></ng-template>
            </label>
          </clr-checkbox-wrapper>
        </li>
      </ul>
      <div class="switch-footer">
        <ng-content select="clr-dg-column-toggle-button"></ng-content>
        <clr-dg-column-toggle-button *ngIf="!customToggleButton">{{commonStrings.selectAll}}</clr-dg-column-toggle-button>
      </div>
    </div>
  `,
                host: { '[class.column-switch-wrapper]': 'true', '[class.active]': 'open' }
            }] }
];
/** @nocollapse */
ClrDatagridColumnToggle.ctorParameters = () => [
    { type: ClrCommonStrings },
    { type: ColumnsService }
];
ClrDatagridColumnToggle.propDecorators = {
    customToggleTitle: [{ type: ContentChild, args: [ClrDatagridColumnToggleTitle,] }],
    customToggleButton: [{ type: ContentChild, args: [ClrDatagridColumnToggleButton,] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * I don't think this deserves to be in IfExpanded itself,
 * so I'm adding a second directive on the same selector for now just for the datagrid
 */
class DatagridDetailRegisterer {
    /**
     * @param {?} expandableRowsCount
     */
    constructor(expandableRowsCount) {
        this.expandableRowsCount = expandableRowsCount;
        if (this.expandableRowsCount) {
            this.expandableRowsCount.register();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.expandableRowsCount) {
            this.expandableRowsCount.unregister();
        }
    }
}
DatagridDetailRegisterer.decorators = [
    { type: Directive, args: [{ selector: '[clrIfExpanded]' },] }
];
/** @nocollapse */
DatagridDetailRegisterer.ctorParameters = () => [
    { type: ExpandableRowsCount, decorators: [{ type: Optional }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
class ClrDatagridFooter {
    /**
     * @param {?} selection
     * @param {?} columnsService
     */
    constructor(selection, columnsService) {
        this.selection = selection;
        this.columnsService = columnsService;
        /* reference to the enum so that template can access */
        this.SELECTION_TYPE = SelectionType;
    }
    /**
     * @return {?}
     */
    get hasHideableColumns() {
        return this.columnsService.hasHideableColumns;
    }
}
ClrDatagridFooter.decorators = [
    { type: Component, args: [{
                selector: 'clr-dg-footer',
                template: `
        <ng-container
            *ngIf="(selection.selectionType === SELECTION_TYPE.Multi) && (selection.current.length > 0)">
          <div class="clr-form-control-disabled">
              <clr-checkbox-wrapper class="datagrid-footer-select">
                <input clrCheckbox type="checkbox" checked="checked" disabled>
                <label>{{selection.current.length}}</label>
            </clr-checkbox-wrapper>
          </div>
        </ng-container>
        <ng-content select="clr-dg-column-toggle"></ng-content>
        <clr-dg-column-toggle *ngIf="hasHideableColumns && !toggle"></clr-dg-column-toggle>
        <div class="datagrid-footer-description">
            <ng-content></ng-content>
        </div>
        <ng-content select="clr-dg-pagination"></ng-content>
    `,
                host: {
                    '[class.datagrid-footer]': 'true',
                }
            }] }
];
/** @nocollapse */
ClrDatagridFooter.ctorParameters = () => [
    { type: Selection },
    { type: ColumnsService }
];
ClrDatagridFooter.propDecorators = {
    toggle: [{ type: ContentChild, args: [ClrDatagridColumnToggle,] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const COLUMN_STATE = new InjectionToken('COLUMN_STATE');
/**
 * @return {?}
 */
function columnStateFactory() {
    return new BehaviorSubject({
        changes: [],
    });
}
/** @type {?} */
const COLUMN_STATE_PROVIDER = {
    provide: COLUMN_STATE,
    useFactory: columnStateFactory,
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 *
 * @description
 * A structural directive meant to be used inside a clr-dg-column component.
 *
 * <clr-dg-column>
 *       <ng-container *clrDgHideableColumn="{ hidden: true }">
 *           User ID
 *       </ng-container>
 *   </clr-dg-column>
 *
 * It sets up state and properties so that columns can be manges for hide/show by a service and an internal
 * datagrid toggle component.
 *
 */
class ClrDatagridHideableColumn {
    /**
     * @param {?} titleTemplateRef
     * @param {?} viewContainerRef
     * @param {?} columnsService
     * @param {?} columnState
     */
    constructor(titleTemplateRef, viewContainerRef, columnsService, columnState) {
        this.titleTemplateRef = titleTemplateRef;
        this.viewContainerRef = viewContainerRef;
        this.columnsService = columnsService;
        this.columnState = columnState;
        this.hiddenChange = new EventEmitter();
        this.subscriptions = [];
        this.viewContainerRef.createEmbeddedView(this.titleTemplateRef);
        if (!this.columnState) {
            throw new Error('The *clrDgHideableColumn directive can only be used inside of a clr-dg-column component.');
        }
    }
    /**
     *
     * \@description
     * Setter fn for the \@Input with the same name as this structural directive.
     * It allows the user to pre-configure the column's hide/show state. { hidden: true }
     * It's more verbose but has more Clarity.
     *
     *
     * \@example
     * *clrDgHideableColumn
     * *clrDgHideableColumn={hidden: false}
     * *clrDgHideableColumn={hidden: true}
     *
     * @param {?} value
     * @return {?}
     */
    set clrDgHideableColumn(value) {
        this.clrDgHidden = value && value.hidden ? value.hidden : false;
    }
    /**
     * @param {?} hidden
     * @return {?}
     */
    set clrDgHidden(hidden) {
        this._hidden = hidden ? hidden : false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.columnsService.emitStateChange(this.columnState, {
            hideable: true,
            titleTemplateRef: this.titleTemplateRef,
            hidden: this._hidden,
            changes: [DatagridColumnChanges.HIDDEN],
        });
        this.subscriptions.push(this.columnState.subscribe((/**
         * @param {?} state
         * @return {?}
         */
        (state$$1) => {
            if (state$$1.changes && state$$1.changes.indexOf(DatagridColumnChanges.HIDDEN) > -1) {
                this.hiddenChange.emit(state$$1.hidden); // Can emit through @Output when desugared syntax is used
            }
        })));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        sub => sub.unsubscribe()));
    }
}
ClrDatagridHideableColumn.decorators = [
    { type: Directive, args: [{ selector: '[clrDgHideableColumn]' },] }
];
/** @nocollapse */
ClrDatagridHideableColumn.ctorParameters = () => [
    { type: TemplateRef },
    { type: ViewContainerRef },
    { type: ColumnsService },
    { type: BehaviorSubject, decorators: [{ type: Optional }, { type: Inject, args: [COLUMN_STATE,] }] }
];
ClrDatagridHideableColumn.propDecorators = {
    clrDgHideableColumn: [{ type: Input, args: ['clrDgHideableColumn',] }],
    clrDgHidden: [{ type: Input, args: ['clrDgHidden',] }],
    hiddenChange: [{ type: Output, args: ['clrDgHiddenChange',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
class ClrDatagridItemsTrackBy {
    /**
     * @param {?} _items
     */
    constructor(_items) {
        this._items = _items;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set trackBy(value) {
        if (this._items) {
            this._items.trackBy = value;
        }
    }
}
ClrDatagridItemsTrackBy.decorators = [
    { type: Directive, args: [{
                selector: '[ngForTrackBy]',
            },] }
];
/** @nocollapse */
ClrDatagridItemsTrackBy.ctorParameters = () => [
    { type: Items, decorators: [{ type: Optional }] }
];
ClrDatagridItemsTrackBy.propDecorators = {
    trackBy: [{ type: Input, args: ['ngForTrackBy',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrDatagridPageSize {
    /**
     * @param {?} page
     */
    constructor(page) {
        this.page = page;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (!this.pageSizeOptions || this.pageSizeOptions.length === 0) {
            this.pageSizeOptions = [this.page.size];
        }
    }
}
ClrDatagridPageSize.decorators = [
    { type: Component, args: [{
                selector: 'clr-dg-page-size',
                template: `
    <ng-content></ng-content>
    <div class="clr-select-wrapper">
      <select [class.clr-page-size-select]="true" [(ngModel)]="page.size">
        <option *ngFor="let option of pageSizeOptions" [ngValue]="option">{{option}}</option>
      </select>
    </div>
  `
            }] }
];
/** @nocollapse */
ClrDatagridPageSize.ctorParameters = () => [
    { type: Page }
];
ClrDatagridPageSize.propDecorators = {
    pageSizeOptions: [{ type: Input, args: ['clrPageSizeOptions',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrDatagridPagination {
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
    _pageSizeComponent: [{ type: ContentChild, args: [ClrDatagridPageSize,] }],
    currentPageInputRef: [{ type: ViewChild, args: ['currentPageInput',] }],
    pageSize: [{ type: Input, args: ['clrDgPageSize',] }],
    totalItems: [{ type: Input, args: ['clrDgTotalItems',] }],
    lastPage: [{ type: Input, args: ['clrDgLastPage',] }],
    currentPage: [{ type: Input, args: ['clrDgPage',] }],
    currentChanged: [{ type: Output, args: ['clrDgPageChange',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Generic bland container serving various purposes for Datagrid.
 * For instance, it can help span a text over multiple rows in detail view.
 * @template T
 */
class ClrDatagridRowDetail {
    /**
     * @param {?} selection
     * @param {?} rowActionService
     * @param {?} expand
     * @param {?} expandableRows
     */
    constructor(selection, rowActionService, expand, expandableRows) {
        this.selection = selection;
        this.rowActionService = rowActionService;
        this.expand = expand;
        this.expandableRows = expandableRows;
        /* reference to the enum so that template can access it */
        this.SELECTION_TYPE = SelectionType;
        this.subscriptions = [];
        this.replacedRow = false;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set replace(value) {
        this.expand.setReplace(!!value);
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.subscriptions.push(this.expand.replace.subscribe((/**
         * @param {?} replaceChange
         * @return {?}
         */
        replaceChange => {
            this.replacedRow = replaceChange;
        })));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        sub => sub.unsubscribe()));
    }
}
ClrDatagridRowDetail.decorators = [
    { type: Component, args: [{
                selector: 'clr-dg-row-detail',
                template: `
        <ng-container *ngIf="!replacedRow">
            <!-- space for multiselection state -->
            <div class="datagrid-cell datagrid-select datagrid-fixed-column"
                *ngIf="selection.selectionType === SELECTION_TYPE.Multi">
            </div>
            <!-- space for single selection state -->
            <div class="datagrid-cell datagrid-select datagrid-fixed-column"
                *ngIf="selection.selectionType === SELECTION_TYPE.Single">
            </div>
            <!-- space for single row action; only displayType if we have at least one actionable row in datagrid -->
            <div class="datagrid-cell datagrid-row-actions datagrid-fixed-column"
                *ngIf="rowActionService.hasActionableRow">
            </div>
            <!-- space for expandable caret action; only displayType if we have at least one expandable row in datagrid -->
            <div *ngIf="expandableRows.hasExpandableRow"
                        class="datagrid-expandable-caret datagrid-fixed-column datagrid-cell">
            </div>
        </ng-container>
        <ng-content></ng-content>
    `,
                host: {
                    '[class.datagrid-row-flex]': 'true',
                    '[class.datagrid-row-detail]': 'true',
                    '[class.datagrid-container]': 'cells.length === 0',
                }
            }] }
];
/** @nocollapse */
ClrDatagridRowDetail.ctorParameters = () => [
    { type: Selection },
    { type: RowActionService },
    { type: DatagridIfExpandService },
    { type: ExpandableRowsCount }
];
ClrDatagridRowDetail.propDecorators = {
    cells: [{ type: ContentChildren, args: [ClrDatagridCell,] }],
    replace: [{ type: Input, args: ['clrDgReplace',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const STRICT_WIDTH_CLASS = 'datagrid-fixed-width';
/** @type {?} */
const HIDDEN_COLUMN_CLASS = 'datagrid-hidden-column';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DatagridCellRenderer {
    /**
     * @param {?} el
     * @param {?} renderer
     * @param {?} organizer
     */
    constructor(el, renderer, organizer) {
        this.el = el;
        this.renderer = renderer;
        this.subscriptions = [];
        this.subscriptions.push(organizer.filterRenderSteps(DatagridRenderStep.CLEAR_WIDTHS).subscribe((/**
         * @return {?}
         */
        () => this.clearWidth())));
    }
    // @TODO(JEREMY) Work out how to dedupe some of this code between header and cell renderers
    /**
     * @param {?} columnState
     * @return {?}
     */
    set columnState(columnState) {
        if (this.stateSubscription) {
            this.stateSubscription.unsubscribe();
        }
        this.runAllChanges = ALL_COLUMN_CHANGES;
        this.stateSubscription = columnState.subscribe((/**
         * @param {?} state
         * @return {?}
         */
        state$$1 => this.stateChanges(state$$1)));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        sub => sub.unsubscribe()));
        if (this.stateSubscription) {
            this.stateSubscription.unsubscribe();
        }
    }
    /**
     * @private
     * @param {?} state
     * @return {?}
     */
    stateChanges(state$$1) {
        if (this.runAllChanges) {
            state$$1.changes = this.runAllChanges;
            delete this.runAllChanges;
        }
        if (state$$1.changes && state$$1.changes.length) {
            state$$1.changes.forEach((/**
             * @param {?} change
             * @return {?}
             */
            change => {
                switch (change) {
                    case DatagridColumnChanges.WIDTH:
                        this.setWidth(state$$1);
                        break;
                    case DatagridColumnChanges.HIDDEN:
                        this.setHidden(state$$1);
                        break;
                    default:
                        break;
                }
            }));
        }
    }
    /**
     * @private
     * @return {?}
     */
    clearWidth() {
        this.renderer.removeClass(this.el.nativeElement, STRICT_WIDTH_CLASS);
        this.renderer.setStyle(this.el.nativeElement, 'width', null);
    }
    /**
     * @private
     * @param {?} state
     * @return {?}
     */
    setWidth(state$$1) {
        if (state$$1.strictWidth) {
            this.renderer.addClass(this.el.nativeElement, STRICT_WIDTH_CLASS);
        }
        else {
            this.renderer.removeClass(this.el.nativeElement, STRICT_WIDTH_CLASS);
        }
        this.renderer.setStyle(this.el.nativeElement, 'width', state$$1.width + 'px');
    }
    /**
     * @private
     * @param {?} state
     * @return {?}
     */
    setHidden(state$$1) {
        if (state$$1.hidden) {
            this.renderer.addClass(this.el.nativeElement, HIDDEN_COLUMN_CLASS);
        }
        else {
            this.renderer.removeClass(this.el.nativeElement, HIDDEN_COLUMN_CLASS);
        }
    }
}
DatagridCellRenderer.decorators = [
    { type: Directive, args: [{ selector: 'clr-dg-cell' },] }
];
/** @nocollapse */
DatagridCellRenderer.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: DatagridRenderOrganizer }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DatagridHeaderRenderer {
    /**
     * @param {?} el
     * @param {?} renderer
     * @param {?} organizer
     * @param {?} domAdapter
     * @param {?} columnResizerService
     * @param {?} columnsService
     * @param {?} columnState
     */
    constructor(el, renderer, organizer, domAdapter, columnResizerService, columnsService, columnState) {
        this.el = el;
        this.renderer = renderer;
        this.organizer = organizer;
        this.domAdapter = domAdapter;
        this.columnResizerService = columnResizerService;
        this.columnsService = columnsService;
        this.columnState = columnState;
        this.resizeEmitter = new EventEmitter();
        /**
         * Indicates if the column has a strict width, so it doesn't shrink or expand based on the content.
         */
        this.widthSet = false;
        this.autoSet = false;
        this.subscriptions = [];
        this.subscriptions.push(this.organizer.filterRenderSteps(DatagridRenderStep.CLEAR_WIDTHS).subscribe((/**
         * @return {?}
         */
        () => this.clearWidth())));
        this.subscriptions.push(columnState.subscribe((/**
         * @param {?} state
         * @return {?}
         */
        state$$1 => this.stateChanges(state$$1))));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        sub => sub.unsubscribe()));
    }
    /**
     * @private
     * @param {?} state
     * @return {?}
     */
    stateChanges(state$$1) {
        if (state$$1.changes && state$$1.changes.length) {
            state$$1.changes.forEach((/**
             * @param {?} change
             * @return {?}
             */
            change => {
                switch (change) {
                    case DatagridColumnChanges.WIDTH:
                        this.setWidth(state$$1);
                        break;
                    case DatagridColumnChanges.HIDDEN:
                        this.setHidden(state$$1);
                        break;
                    default:
                        break;
                }
            }));
        }
    }
    /**
     * @private
     * @return {?}
     */
    clearWidth() {
        // remove the width only if we set it, and it is not changed by dragging.
        if (this.widthSet && !this.columnResizerService.resizedBy) {
            this.renderer.setStyle(this.el.nativeElement, 'width', null);
        }
        if (this.autoSet) {
            this.renderer.removeClass(this.el.nativeElement, STRICT_WIDTH_CLASS);
        }
    }
    /**
     * @private
     * @return {?}
     */
    detectStrictWidth() {
        if (this.columnResizerService.resizedBy) {
            return this.columnResizerService.widthAfterResize;
        }
        else if (this.autoSet) {
            return 0;
        }
        else {
            return this.domAdapter.userDefinedWidth(this.el.nativeElement);
        }
    }
    /**
     * @private
     * @param {?} strictWidth
     * @return {?}
     */
    computeWidth(strictWidth) {
        /** @type {?} */
        let width = strictWidth;
        if (!width) {
            width = this.domAdapter.scrollWidth(this.el.nativeElement);
        }
        return width;
    }
    /**
     * @return {?}
     */
    getColumnWidthState() {
        /** @type {?} */
        const strictWidth = this.detectStrictWidth();
        return {
            width: this.computeWidth(strictWidth),
            strictWidth: strictWidth,
        };
    }
    /**
     * @param {?} index
     * @return {?}
     */
    setColumnState(index) {
        this.columnsService.columns[index] = this.columnState;
    }
    /**
     * @private
     * @param {?} state
     * @return {?}
     */
    setWidth(state$$1) {
        if (state$$1.strictWidth) {
            if (this.columnResizerService.resizedBy) {
                this.resizeEmitter.emit(state$$1.width);
                this.renderer.setStyle(this.el.nativeElement, 'width', state$$1.width + 'px');
                this.widthSet = false;
            }
            // Don't set width if there is a user-defined one. Just add the strict width class.
            this.renderer.addClass(this.el.nativeElement, STRICT_WIDTH_CLASS);
            this.autoSet = false;
        }
        else {
            this.renderer.removeClass(this.el.nativeElement, STRICT_WIDTH_CLASS);
            this.renderer.setStyle(this.el.nativeElement, 'width', state$$1.width + 'px');
            this.widthSet = true;
            this.autoSet = true;
        }
    }
    /**
     * @private
     * @param {?} state
     * @return {?}
     */
    setHidden(state$$1) {
        if (state$$1.hidden) {
            this.renderer.addClass(this.el.nativeElement, HIDDEN_COLUMN_CLASS);
        }
        else {
            this.renderer.removeClass(this.el.nativeElement, HIDDEN_COLUMN_CLASS);
        }
    }
}
DatagridHeaderRenderer.decorators = [
    { type: Directive, args: [{ selector: 'clr-dg-column', providers: [ColumnResizerService, COLUMN_STATE_PROVIDER] },] }
];
/** @nocollapse */
DatagridHeaderRenderer.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: DatagridRenderOrganizer },
    { type: DomAdapter },
    { type: ColumnResizerService },
    { type: ColumnsService },
    { type: BehaviorSubject, decorators: [{ type: Inject, args: [COLUMN_STATE,] }] }
];
DatagridHeaderRenderer.propDecorators = {
    resizeEmitter: [{ type: Output, args: ['clrDgColumnResize',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NoopDomAdapter {
    /**
     * @param {?} element
     * @return {?}
     */
    userDefinedWidth(element) {
        return 0;
    }
    /**
     * @param {?} element
     * @return {?}
     */
    scrollBarWidth(element) {
        return 0;
    }
    /**
     * @param {?} element
     * @return {?}
     */
    scrollWidth(element) {
        return 0;
    }
    /**
     * @param {?} element
     * @return {?}
     */
    computedHeight(element) {
        return 0;
    }
    /**
     * @param {?} element
     * @return {?}
     */
    clientRect(element) {
        return {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            width: 0,
            height: 0,
        };
    }
    /**
     * @param {?} element
     * @return {?}
     */
    minWidth(element) {
        return 0;
    }
    /**
     * @param {?} element
     * @return {?}
     */
    focus(element) { }
}
NoopDomAdapter.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DatagridRowRenderer {
    /**
     * @param {?} columnsService
     */
    constructor(columnsService) {
        this.columnsService = columnsService;
        this.subscriptions = [];
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.setColumnState(); // case #3 and #4
        this.subscriptions.push(this.cells.changes.subscribe((/**
         * @return {?}
         */
        () => {
            this.setColumnState(); // case #2
            // Note on case #2: In the case of dynamic columns, when one column (header/cell together) gets deleted,
            // this.cells.changes emits before this.columnsService.columns gets updated in MainRenderer
            // when this.headers.changes emits as well. So that means there will be n+1 column state providers
            // when this.cells.changes emits. Hence, we should quit earlier there. But this method will be called
            // right after again when this.headers.changes emits. By then, there will be the same number of column state
            // providers as column headers.
        })));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        sub => sub.unsubscribe()));
    }
    /**
     * @return {?}
     */
    setColumnState() {
        // This method runs in four cases:
        // 1. When the initial rows appear on the first page.
        //    In this case, the method will be called in DatagridMainRenderer.
        // 2. When columns (corresponding header/cells) get added and deleted.
        //    In this case, the method will be called in DatagridMainRenderer. (Read the note on this case above).
        // 3. When rows load asynchronously.
        //    In this case, the method will be called in this class.
        // 4. When rows load after switching pages.
        //    In this case, the method will be called in this class (Basically, same as the case 3).
        if (this.cells.length === this.columnsService.columns.length) {
            this.cells.forEach((/**
             * @param {?} cell
             * @param {?} index
             * @return {?}
             */
            (cell, index) => {
                if (this.columnsService.columns[index]) {
                    cell.columnState = this.columnsService.columns[index];
                }
            }));
        }
    }
}
DatagridRowRenderer.decorators = [
    { type: Directive, args: [{ selector: 'clr-dg-row, clr-dg-row-detail' },] }
];
/** @nocollapse */
DatagridRowRenderer.ctorParameters = () => [
    { type: ColumnsService }
];
DatagridRowRenderer.propDecorators = {
    cells: [{ type: ContentChildren, args: [DatagridCellRenderer,] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// Fixes build error
// @dynamic (https://github.com/angular/angular/issues/19698#issuecomment-338340211)
/** @type {?} */
const domAdapterFactory = (/**
 * @param {?} platformId
 * @return {?}
 */
(platformId) => {
    if (isPlatformBrowser(platformId)) {
        return new DomAdapter();
    }
    else {
        return new NoopDomAdapter();
    }
});
// Fixes build error
// @dynamic (https://github.com/angular/angular/issues/19698#issuecomment-338340211)
/**
 * @template T
 */
class DatagridMainRenderer {
    /**
     * @param {?} organizer
     * @param {?} items
     * @param {?} page
     * @param {?} domAdapter
     * @param {?} el
     * @param {?} renderer
     * @param {?} tableSizeService
     * @param {?} columnsService
     */
    constructor(organizer, items, page, domAdapter, el, renderer, tableSizeService, columnsService) {
        this.organizer = organizer;
        this.items = items;
        this.page = page;
        this.domAdapter = domAdapter;
        this.el = el;
        this.renderer = renderer;
        this.tableSizeService = tableSizeService;
        this.columnsService = columnsService;
        this._heightSet = false;
        this.subscriptions = [];
        /**
         * Indicates if we want to re-compute columns width. This should only happen:
         * 1) When headers change, with columns being added or removed
         * 2) When rows are lazily loaded for the first time
         */
        this.columnsSizesStable = false;
        this.shouldStabilizeColumns = true;
        this.subscriptions.push(this.organizer
            .filterRenderSteps(DatagridRenderStep.COMPUTE_COLUMN_WIDTHS)
            .subscribe((/**
         * @return {?}
         */
        () => this.computeHeadersWidth())));
        this.subscriptions.push(this.page.sizeChange.subscribe((/**
         * @return {?}
         */
        () => {
            if (this._heightSet) {
                this.resetDatagridHeight();
            }
        })));
        this.subscriptions.push(this.items.change.subscribe((/**
         * @return {?}
         */
        () => (this.shouldStabilizeColumns = true))));
    }
    // if expandable row is expanded initially, query its cells too.
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.setupColumns();
        this.subscriptions.push(this.headers.changes.subscribe((/**
         * @return {?}
         */
        () => {
            // TODO: only re-stabilize if a column was added or removed. Reordering is fine.
            // Need to setup columns before stabalizing them
            this.setupColumns();
            this.columnsSizesStable = false;
            this.stabilizeColumns();
        })));
    }
    // Initialize and set Table width for horizontal scrolling here.
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.tableSizeService.table = this.el;
    }
    /**
     * @return {?}
     */
    ngAfterViewChecked() {
        if (this.shouldStabilizeColumns) {
            this.stabilizeColumns();
        }
        if (this.shouldComputeHeight()) {
            setTimeout((/**
             * @return {?}
             */
            () => {
                this.computeDatagridHeight();
            }));
        }
    }
    /**
     * @private
     * @return {?}
     */
    setupColumns() {
        this.headers.forEach((/**
         * @param {?} header
         * @param {?} index
         * @return {?}
         */
        (header, index) => header.setColumnState(index)));
        this.columnsService.columns.splice(this.headers.length); // Trim any old columns
        this.rows.forEach((/**
         * @param {?} row
         * @return {?}
         */
        row => row.setColumnState()));
    }
    /**
     * @private
     * @return {?}
     */
    shouldComputeHeight() {
        if (!this._heightSet && this.page.size > 0) {
            if (this.items.displayed.length === this.page.size) {
                return true;
            }
        }
        return false;
    }
    /**
     * Computes the height of the datagrid.
     *
     * NOTE: We had to choose to set the height instead of the min-height because
     * IE 11 requires the height on the parent for the children flex grow/shrink properties to work.
     * When we used min-height, 1 1 auto doesn't used to work in IE11 :-(
     * But this doesn't affect the fix. It works in both fixed & variable height datagrids.
     *
     * Refer: http://stackoverflow.com/questions/24396205/flex-grow-not-working-in-internet-explorer-11-0
     * @private
     * @return {?}
     */
    computeDatagridHeight() {
        // IE doesn't return correct value for getComputedStyle(element).getPropertyValue("height")
        /** @type {?} */
        const value = this.domAdapter.clientRect(this.el.nativeElement).height;
        this.renderer.setStyle(this.el.nativeElement, 'height', value + 'px');
        this._heightSet = true;
    }
    /**
     * @private
     * @return {?}
     */
    resetDatagridHeight() {
        this.renderer.setStyle(this.el.nativeElement, 'height', '');
        this._heightSet = false;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        sub => sub.unsubscribe()));
    }
    /**
     * Makes each header compute its width.
     * @private
     * @return {?}
     */
    computeHeadersWidth() {
        /** @type {?} */
        const nbColumns = this.headers.length;
        /** @type {?} */
        let allStrict = true;
        this.headers.forEach((/**
         * @param {?} header
         * @param {?} index
         * @return {?}
         */
        (header, index) => {
            // On the last header column check whether all columns have strict widths.
            // If all columns have strict widths, remove the strict width from the last column and make it the column's
            // minimum width so that when all previous columns shrink, it will get a flexible width and cover the empty
            // gap in the Datagrid.
            /** @type {?} */
            const state$$1 = Object.assign({ changes: [DatagridColumnChanges.WIDTH] }, header.getColumnWidthState());
            if (!state$$1.strictWidth) {
                allStrict = false;
            }
            if (nbColumns === index + 1 && allStrict) {
                state$$1.strictWidth = 0;
            }
            this.columnsService.emitStateChangeAt(index, state$$1);
        }));
    }
    /**
     * Triggers a whole re-rendring cycle to set column sizes, if needed.
     * @private
     * @return {?}
     */
    stabilizeColumns() {
        this.shouldStabilizeColumns = false;
        if (this.columnsSizesStable) {
            // Nothing to do.
            return;
        }
        // Resize when the rows are loaded.
        if (this.items.displayed.length > 0) {
            this.organizer.resize();
            this.columnsSizesStable = true;
        }
    }
}
DatagridMainRenderer.decorators = [
    { type: Directive, args: [{
                selector: 'clr-datagrid',
                providers: [{ provide: DomAdapter, useFactory: domAdapterFactory, deps: [PLATFORM_ID] }],
            },] }
];
/** @nocollapse */
DatagridMainRenderer.ctorParameters = () => [
    { type: DatagridRenderOrganizer },
    { type: Items },
    { type: Page },
    { type: DomAdapter },
    { type: ElementRef },
    { type: Renderer2 },
    { type: TableSizeService },
    { type: ColumnsService }
];
DatagridMainRenderer.propDecorators = {
    headers: [{ type: ContentChildren, args: [DatagridHeaderRenderer,] }],
    rows: [{ type: ContentChildren, args: [DatagridRowRenderer, { descendants: true },] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const CLR_DATAGRID_DIRECTIVES = [
    // Core
    ClrDatagrid,
    ClrDatagridActionBar,
    ClrDatagridActionOverflow,
    ClrDatagridColumn,
    ClrDatagridColumnSeparator,
    ClrDatagridColumnToggle,
    ClrDatagridHideableColumn,
    ClrDatagridFilter,
    ClrDatagridItems,
    ClrDatagridItemsTrackBy,
    ClrDatagridRow,
    ClrDatagridRowDetail,
    DatagridDetailRegisterer,
    ClrDatagridCell,
    ClrDatagridFooter,
    ClrDatagridPagination,
    ClrDatagridPageSize,
    ClrDatagridPlaceholder,
    ClrDatagridColumnToggleButton,
    ClrDatagridColumnToggleTitle,
    WrappedCell,
    WrappedColumn,
    WrappedRow,
    // Renderers
    DatagridMainRenderer,
    DatagridHeaderRenderer,
    DatagridRowRenderer,
    DatagridCellRenderer,
    // Chocolate
    DatagridWillyWonka,
    ActionableOompaLoompa,
    ExpandableOompaLoompa,
    // Animation hack
    DatagridRowExpandAnimation,
    // Built-in shortcuts
    DatagridStringFilter,
];
class ClrDatagridModule {
}
ClrDatagridModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    ClrIconModule,
                    ClrFormsModule,
                    FormsModule,
                    ClrCommonPopoverModule,
                    ClrLoadingModule,
                    ClrOutsideClickModule,
                    ClrDragAndDropModule,
                ],
                declarations: [CLR_DATAGRID_DIRECTIVES],
                exports: [CLR_DATAGRID_DIRECTIVES],
                entryComponents: [WrappedCell, WrappedColumn, WrappedRow],
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrStackBlock {
    /*
         * This would be more efficient with @ContentChildren, with the parent ClrStackBlock
         * querying for children StackBlocks, but this feature is not available when downgrading
         * the component for Angular 1.
         */
    /**
     * @param {?} parent
     * @param {?} commonStrings
     */
    constructor(parent, commonStrings) {
        this.parent = parent;
        this.commonStrings = commonStrings;
        this.expanded = false;
        this.expandedChange = new EventEmitter(false);
        this.expandable = false;
        this.focused = false;
        this._changedChildren = 0;
        this._fullyInitialized = false;
        this._changed = false;
        if (parent) {
            parent.addChild();
        }
    }
    /**
     * @return {?}
     */
    get getChangedValue() {
        return this._changed || (this._changedChildren > 0 && !this.expanded);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set setChangedValue(value) {
        this._changed = value;
        if (this.parent && this._fullyInitialized) {
            if (value) {
                this.parent._changedChildren++;
            }
            else {
                this.parent._changedChildren--;
            }
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // in order to access the parent ClrStackBlock's properties,
        // the child ClrStackBlock  has to be fully initialized at first.
        this._fullyInitialized = true;
    }
    /**
     * @return {?}
     */
    addChild() {
        this.expandable = true;
    }
    /**
     * @return {?}
     */
    toggleExpand() {
        if (this.expandable) {
            this.expanded = !this.expanded;
            this.expandedChange.emit(this.expanded);
        }
    }
    /**
     * @return {?}
     */
    get caretDirection() {
        return this.expanded ? 'down' : 'right';
    }
    /**
     * @return {?}
     */
    get caretTitle() {
        return this.expanded ? this.commonStrings.collapse : this.commonStrings.expand;
    }
    /**
     * @return {?}
     */
    get role() {
        return this.expandable ? 'button' : null;
    }
    /**
     * @return {?}
     */
    get tabIndex() {
        return this.expandable ? '0' : null;
    }
    /**
     * @return {?}
     */
    get onStackLabelFocus() {
        return this.expandable && !this.expanded && this.focused;
    }
    /**
     * @return {?}
     */
    get ariaExpanded() {
        if (!this.expandable) {
            return null;
        }
        else {
            return this.expanded ? 'true' : 'false';
        }
    }
}
ClrStackBlock.decorators = [
    { type: Component, args: [{
                selector: 'clr-stack-block',
                template: `
    <dt class="stack-block-label"
        (click)="toggleExpand()"
        (keyup.enter)="toggleExpand()"
        (keyup.space)="toggleExpand()"
        (focus)="focused = true"
        (blur)="focused = false"
        [attr.role]="role"
        [attr.tabindex]="tabIndex"
        [attr.aria-expanded]="ariaExpanded">
      <clr-icon shape="caret"
                class="stack-block-caret"
                *ngIf="expandable"
                [attr.dir]="caretDirection"
                [attr.title]="caretTitle"></clr-icon>
      <ng-content select="clr-stack-label"></ng-content>
    </dt>
    <dd class="stack-block-content">
      <ng-content></ng-content>
    </dd>
    <!-- FIXME: remove this string concatenation when boolean states are supported -->
    <div [@collapse]="''+!expanded" class="stack-children" >
      <ng-content select="clr-stack-block"></ng-content>
    </div>
  `,
                // Make sure the host has the proper class for styling purposes
                host: { '[class.stack-block]': 'true' },
                animations: [
                    trigger('collapse', [
                        state('true', style({ height: 0, display: 'none' })),
                        transition('true => false', [animate('0.2s ease-in-out', style({ height: '*', display: '*' }))]),
                        transition('false => true', [style({ height: '*', display: '*' }), animate('0.2s ease-in-out')]),
                    ]),
                ],
                styles: [`
        :host { display: block; }
    `]
            }] }
];
/** @nocollapse */
ClrStackBlock.ctorParameters = () => [
    { type: ClrStackBlock, decorators: [{ type: SkipSelf }, { type: Optional }] },
    { type: ClrCommonStrings }
];
ClrStackBlock.propDecorators = {
    expanded: [{ type: HostBinding, args: ['class.stack-block-expanded',] }, { type: Input, args: ['clrSbExpanded',] }],
    expandedChange: [{ type: Output, args: ['clrSbExpandedChange',] }],
    expandable: [{ type: HostBinding, args: ['class.stack-block-expandable',] }, { type: Input, args: ['clrSbExpandable',] }],
    getChangedValue: [{ type: HostBinding, args: ['class.stack-block-changed',] }],
    setChangedValue: [{ type: Input, args: ['clrSbNotifyChange',] }],
    onStackLabelFocus: [{ type: HostBinding, args: ['class.on-focus',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrStackView {
    constructor() {
        /**
         * Undocumented experimental feature: inline editing.
         */
        this.editable = false;
        this.save = new EventEmitter(false);
        this._editMode = false;
        this.editingChange = new EventEmitter(false);
        /**
         * End of undocumented experimental feature.
         */
    }
    /**
     * @return {?}
     */
    get editing() {
        return this.editable && this._editMode;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set editing(value) {
        if (this.editable) {
            this._editMode = value;
            this.editingChange.emit(value);
            if (!value) {
                this.save.emit(null);
            }
        }
    }
}
ClrStackView.decorators = [
    { type: Component, args: [{
                selector: 'clr-stack-view',
                template: `
        <ng-content select="clr-stack-header"></ng-content>
        <dl class="stack-view"><ng-content></ng-content></dl>
    `,
                styles: [`
        :host { display: block; }
    `]
            }] }
];
ClrStackView.propDecorators = {
    save: [{ type: Output, args: ['clrStackSave',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrStackHeader {
    /**
     * @param {?} stackView
     */
    constructor(stackView) {
        this.stackView = stackView;
    }
}
ClrStackHeader.decorators = [
    { type: Component, args: [{
                selector: 'clr-stack-header',
                template: `
        <h4 class="stack-header">
            <span class="stack-title"><ng-content></ng-content></span>
            
            <span class="stack-actions">
                <ng-content select=".stack-action"></ng-content>
                <!-- Undocumented experimental feature: inline editing. -->
                <button *ngIf="stackView.editable" class="stack-action btn btn-sm btn-link" 
                        (click)="stackView.editing = !stackView.editing" type="button">
                        Edit
                </button>
                <!-- End of undocumented experimental feature. -->
            </span>
        </h4>
    `,
                styles: [`
        :host { display: block; }
    `]
            }] }
];
/** @nocollapse */
ClrStackHeader.ctorParameters = () => [
    { type: ClrStackView }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class StackControl {
    /**
     * @param {?} stackView
     */
    constructor(stackView) {
        this.stackView = stackView;
        this.modelChange = new EventEmitter(false);
        // Make the ClrStackView editable, since it contains a StackControl
        this.stackView.editable = true;
        this.stackView.editingChange.subscribe((/**
         * @param {?} editing
         * @return {?}
         */
        (editing) => {
            // Edit mode was closed
            if (!editing) {
                this.modelChange.emit(this.model);
            }
        }));
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrStackInput extends StackControl {
    /**
     * @param {?} stackView
     */
    constructor(stackView) {
        super(stackView);
        this.stackView = stackView;
        this.type = 'text';
    }
}
ClrStackInput.decorators = [
    { type: Component, args: [{
                selector: 'clr-stack-input',
                inputs: ['model: clrModel', 'type'],
                outputs: ['modelChange: clrModelChange'],
                template: `
        <span *ngIf="!stackView.editing">{{model}}</span>
        <input [type]="type" *ngIf="stackView.editing" [(ngModel)]="model"/>
    `
            }] }
];
/** @nocollapse */
ClrStackInput.ctorParameters = () => [
    { type: ClrStackView }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrStackSelect extends StackControl {
    /**
     * @param {?} stackView
     */
    constructor(stackView) {
        super(stackView);
        this.stackView = stackView;
    }
}
ClrStackSelect.decorators = [
    { type: Component, args: [{
                selector: 'clr-stack-select',
                inputs: ['model: clrModel'],
                outputs: ['modelChange: clrModelChange'],
                template: `
        <span *ngIf="!stackView.editing">{{model}}</span>
        <div class="select" *ngIf="stackView.editing" >
            <select [(ngModel)]="model">
                <ng-content></ng-content>
            </select>
        </div>
    `
            }] }
];
/** @nocollapse */
ClrStackSelect.ctorParameters = () => [
    { type: ClrStackView }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrStackViewCustomTags {
}
ClrStackViewCustomTags.decorators = [
    { type: Directive, args: [{ selector: 'clr-stack-label, clr-stack-content' },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const CLR_STACK_VIEW_DIRECTIVES = [
    ClrStackView,
    ClrStackHeader,
    ClrStackBlock,
    ClrStackViewCustomTags,
    /**
     * Undocumented experimental feature: inline editing.
     */
    ClrStackInput,
    ClrStackSelect,
];
class ClrStackViewModule {
}
ClrStackViewModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, FormsModule, ClrIconModule],
                declarations: [CLR_STACK_VIEW_DIRECTIVES],
                exports: [CLR_STACK_VIEW_DIRECTIVES],
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/** @enum {number} */
const ClrSelectedState = {
    // WARNING! Unselected has the value 0,
    // so it's actually the only one that will evaluate to false if cast to a boolean.
    // Don't mess with the order!
    UNSELECTED: 0,
    SELECTED: 1,
    INDETERMINATE: 2,
};
ClrSelectedState[ClrSelectedState.UNSELECTED] = 'UNSELECTED';
ClrSelectedState[ClrSelectedState.SELECTED] = 'SELECTED';
ClrSelectedState[ClrSelectedState.INDETERMINATE] = 'INDETERMINATE';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 * @template T
 */
class TreeNodeModel {
    constructor() {
        this.selected = new BehaviorSubject(ClrSelectedState.UNSELECTED);
        /*
           * Being able to push this down to the RecursiveTreeNodeModel would require too much work on the angular components
           * right now for them to know which kind of model they are using. So I'm lifting the public properties to this
           * abstract parent class for now and we can revisit it later, when we're not facing such a close deadline.
           */
        this.loading = false;
    }
    /**
     * @return {?}
     */
    destroy() {
        // Just to be safe
        this.selected.complete();
    }
    // Propagate by default when eager, don't propagate in the lazy-loaded tree.
    /**
     * @param {?} state
     * @param {?} propagateUp
     * @param {?} propagateDown
     * @return {?}
     */
    setSelected(state$$1, propagateUp, propagateDown) {
        if (state$$1 === this.selected.value) {
            return;
        }
        this.selected.next(state$$1);
        if (propagateDown && state$$1 !== ClrSelectedState.INDETERMINATE && this.children) {
            this.children.forEach((/**
             * @param {?} child
             * @return {?}
             */
            child => child.setSelected(state$$1, false, true)));
        }
        if (propagateUp && this.parent) {
            this.parent._updateSelectionFromChildren();
        }
    }
    /**
     * @param {?} propagate
     * @return {?}
     */
    toggleSelection(propagate) {
        // Both unselected and indeterminate toggle to selected
        /** @type {?} */
        const newState = this.selected.value === ClrSelectedState.SELECTED ? ClrSelectedState.UNSELECTED : ClrSelectedState.SELECTED;
        // NOTE: we always propagate selection up in this method because it is only called when the user takes an action.
        // It should never be called from lifecycle hooks or app-provided inputs.
        this.setSelected(newState, true, propagate);
    }
    /**
     * @private
     * @return {?}
     */
    computeSelectionStateFromChildren() {
        /** @type {?} */
        let oneSelected = false;
        /** @type {?} */
        let oneUnselected = false;
        // Using a good old for loop to exit as soon as we can tell, for better performance on large trees.
        for (const child of this.children) {
            switch (child.selected.value) {
                case ClrSelectedState.INDETERMINATE:
                    return ClrSelectedState.INDETERMINATE;
                case ClrSelectedState.SELECTED:
                    oneSelected = true;
                    if (oneUnselected) {
                        return ClrSelectedState.INDETERMINATE;
                    }
                    break;
                case ClrSelectedState.UNSELECTED:
                default:
                    // Default is the same as unselected, in case an undefined somehow made it all the way here.
                    oneUnselected = true;
                    if (oneSelected) {
                        return ClrSelectedState.INDETERMINATE;
                    }
                    break;
            }
        }
        if (!oneSelected) {
            return ClrSelectedState.UNSELECTED;
        }
        else if (!oneUnselected) {
            return ClrSelectedState.SELECTED;
        }
    }
    /*
       * Internal, but needs to be called by other nodes
       */
    /**
     * @return {?}
     */
    _updateSelectionFromChildren() {
        /** @type {?} */
        const newState = this.computeSelectionStateFromChildren();
        if (newState === this.selected.value) {
            return;
        }
        this.selected.next(newState);
        if (this.parent) {
            this.parent._updateSelectionFromChildren();
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * A declarative model is built by traversing the Angular component tree.
 * Declarative = Tree node components dictate the model
 */
/**
 * @template T
 */
class DeclarativeTreeNodeModel extends TreeNodeModel {
    /**
     * @param {?} parent
     */
    constructor(parent) {
        super();
        this.parent = parent;
        if (parent) {
            parent._addChild(this);
        }
        this.children = [];
    }
    /**
     * @param {?} child
     * @return {?}
     */
    _addChild(child) {
        this.children.push(child);
    }
    /**
     * @param {?} child
     * @return {?}
     */
    _removeChild(child) {
        /** @type {?} */
        const index = this.children.indexOf(child);
        if (index > -1) {
            this.children.splice(index, 1);
        }
    }
    /**
     * @return {?}
     */
    destroy() {
        if (this.parent) {
            this.parent._removeChild(this);
        }
        super.destroy();
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
class TreeFeaturesService {
    constructor() {
        this.selectable = false;
        this.eager = true;
    }
}
TreeFeaturesService.decorators = [
    { type: Injectable }
];
/**
 * @template T
 * @param {?} existing
 * @return {?}
 */
function treeFeaturesFactory(existing) {
    return existing || new TreeFeaturesService();
}
/** @type {?} */
const TREE_FEATURES_PROVIDER = {
    provide: TreeFeaturesService,
    useFactory: treeFeaturesFactory,
    /*
       * The Optional + SkipSelf pattern ensures that in case of nested components, only the root one will
       * instantiate a new service and all its children will reuse the root's instance.
       * If there are several roots (in this case, several independent trees on a page), each root will instantiate
       * its own service so they won't interfere with one another.
       *
       * TL;DR - Optional + SkipSelf = 1 instance of TreeFeaturesService per tree.
       */
    deps: [[new Optional(), new SkipSelf(), TreeFeaturesService]],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
class ClrTreeNode {
    /**
     * @param {?} nodeId
     * @param {?} parent
     * @param {?} featuresService
     * @param {?} expandService
     * @param {?} commonStrings
     * @param {?} injector
     */
    constructor(nodeId, parent, featuresService, expandService, commonStrings, injector) {
        this.nodeId = nodeId;
        this.featuresService = featuresService;
        this.expandService = expandService;
        this.commonStrings = commonStrings;
        this.STATES = ClrSelectedState;
        this.skipEmitChange = false;
        this.selectedChange = new EventEmitter(false);
        this.expandedChange = new EventEmitter();
        this.subscriptions = [];
        if (this.featuresService.recursion) {
            // I'm completely stuck, we have to hack into private properties until either
            // https://github.com/angular/angular/issues/14935 or https://github.com/angular/angular/issues/15998
            // are fixed
            this._model = ((/** @type {?} */ (injector))).view.context.clrModel;
        }
        else {
            // Force cast for now, not sure how to tie the correct type here to featuresService.recursion
            this._model = new DeclarativeTreeNodeModel(parent ? (/** @type {?} */ (parent._model)) : null);
        }
    }
    /**
     * @return {?}
     */
    isExpandable() {
        if (typeof this.expandable !== 'undefined') {
            return this.expandable;
        }
        return !!this.expandService.expandable || this._model.children.length > 0;
    }
    /**
     * @return {?}
     */
    get selected() {
        return this._model.selected.value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set selected(value) {
        this.featuresService.selectable = true;
        // Gracefully handle falsy states like null or undefined because it's just easier than answering questions.
        // This shouldn't happen with strict typing on the app's side, but it's not up to us.
        if (value === null || typeof value === 'undefined') {
            value = ClrSelectedState.UNSELECTED;
        }
        // We match booleans to the corresponding ClrSelectedState
        if (typeof value === 'boolean') {
            value = value ? ClrSelectedState.SELECTED : ClrSelectedState.UNSELECTED;
        }
        // We propagate only if the tree is in smart mode, and skip emitting the output when we set the input
        // See https://github.com/vmware/clarity/issues/3073
        this.skipEmitChange = true;
        this._model.setSelected(value, this.featuresService.eager, this.featuresService.eager);
        this.skipEmitChange = false;
    }
    /**
     * @return {?}
     */
    get treeNodeRole() {
        return this._model.parent ? 'treeitem' : 'tree';
    }
    /**
     * @return {?}
     */
    get rootAriaMultiSelectable() {
        if (this._model.parent || !this.featuresService.selectable) {
            return null;
        }
        else {
            return true;
        }
    }
    /**
     * @return {?}
     */
    get ariaSelected() {
        return this.featuresService.selectable ? this._model.selected.value === ClrSelectedState.SELECTED : null;
    }
    // I'm caving on this, for tree nodes I think we can tolerate having a two-way binding on the component
    // rather than enforce the clrIfExpanded structural directive for dynamic cases. Mostly because for the smart
    // case, you can't use a structural directive, it would need to go on an ng-container.
    /**
     * @return {?}
     */
    get expanded() {
        return this.expandService.expanded;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set expanded(value) {
        this.expandService.expanded = value;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.subscriptions.push(this._model.selected.pipe(filter((/**
         * @return {?}
         */
        () => !this.skipEmitChange))).subscribe((/**
         * @param {?} value
         * @return {?}
         */
        value => this.selectedChange.emit(value))));
        this.subscriptions.push(this.expandService.expandChange.subscribe((/**
         * @param {?} value
         * @return {?}
         */
        value => this.expandedChange.emit(value))));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._model.destroy();
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        sub => sub.unsubscribe()));
    }
}
ClrTreeNode.decorators = [
    { type: Component, args: [{
                selector: 'clr-tree-node',
                template: "<!--\n  ~ Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.\n  ~ This software is released under MIT license.\n  ~ The full license information can be found in LICENSE in the root directory of this project.\n  -->\n\n<div class=\"clr-tree-node-content-container\">\n  <button\n    *ngIf=\"isExpandable() && !_model.loading && !expandService.loading\"\n    type=\"button\"\n    class=\"clr-treenode-caret\"\n    (click)=\"expandService.toggle()\"\n    [attr.aria-expanded]=\"expandService.expanded\">\n    <clr-icon\n      class=\"clr-treenode-caret-icon\"\n      shape=\"caret\"\n      [attr.dir]=\"expandService.expanded ? 'down' : 'right'\"\n      [attr.title]=\"expandService.expanded ? commonStrings.collapse : commonStrings.expand\"></clr-icon>\n  </button>\n  <div class=\"clr-treenode-spinner-container\" *ngIf=\"expandService.loading || _model.loading\">\n        <span class=\"clr-treenode-spinner spinner\"></span>\n  </div>\n  <div class=\"clr-checkbox-wrapper clr-treenode-checkbox\" *ngIf=\"featuresService.selectable\">\n    <input type=\"checkbox\" id=\"{{nodeId}}-check\" class=\"clr-checkbox\" [attr.aria-labelledby]=\"nodeId\"\n           [checked]=\"_model.selected.value === STATES.SELECTED\"\n           [indeterminate]=\"_model.selected.value === STATES.INDETERMINATE\"\n           (change)=\"_model.toggleSelection(featuresService.eager)\">\n    <label for=\"{{nodeId}}-check\" class=\"clr-control-label\"></label>\n  </div>\n  <div class=\"clr-treenode-content\" [id]=\"nodeId\">\n    <ng-content></ng-content>\n  </div>\n</div>\n<div class=\"clr-treenode-children\"\n     [@childNodesState]=\"expandService.expanded ? 'expanded' : 'collapsed'\"\n     [attr.role]=\"isExpandable() ? 'group' : null\">\n  <ng-content select=\"clr-tree-node\"></ng-content>\n  <ng-content select=\"[clrIfExpanded]\"></ng-content>\n  <clr-recursive-children [parent]=\"_model\"></clr-recursive-children>\n</div>\n",
                providers: [
                    UNIQUE_ID_PROVIDER,
                    TREE_FEATURES_PROVIDER,
                    IfExpandService,
                    { provide: LoadingListener, useExisting: IfExpandService },
                ],
                animations: [
                    trigger('childNodesState', [
                        state('expanded', style({ height: '*', 'overflow-y': 'hidden' })),
                        state('collapsed', style({ height: 0, 'overflow-y': 'hidden' })),
                        transition('expanded <=> collapsed', animate('0.2s ease-in-out')),
                    ]),
                ],
                host: { '[class.clr-tree-node]': 'true' }
            }] }
];
/** @nocollapse */
ClrTreeNode.ctorParameters = () => [
    { type: String, decorators: [{ type: Inject, args: [UNIQUE_ID,] }] },
    { type: ClrTreeNode, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: TreeFeaturesService },
    { type: IfExpandService },
    { type: ClrCommonStrings },
    { type: Injector }
];
ClrTreeNode.propDecorators = {
    selected: [{ type: Input, args: ['clrSelected',] }],
    selectedChange: [{ type: Output, args: ['clrSelectedChange',] }],
    treeNodeRole: [{ type: HostBinding, args: ['attr.role',] }],
    rootAriaMultiSelectable: [{ type: HostBinding, args: ['attr.aria-multiselectable',] }],
    ariaSelected: [{ type: HostBinding, args: ['attr.aria-selected',] }],
    expandable: [{ type: Input, args: ['clrExpandable',] }],
    expanded: [{ type: Input, args: ['clrExpanded',] }],
    expandedChange: [{ type: Output, args: ['clrExpandedChange',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
class ClrTree {
    // This component can also be used just to declare providers once for trees with multiple root nodes.
    /**
     * @param {?} featuresService
     */
    constructor(featuresService) {
        this.featuresService = featuresService;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set lazy(value) {
        this.featuresService.eager = !value;
    }
}
ClrTree.decorators = [
    { type: Component, args: [{
                selector: 'clr-tree',
                template: `
    <ng-content></ng-content>
    <clr-recursive-children *ngIf="featuresService.recursion"
                            [children]="featuresService.recursion.root"></clr-recursive-children>
  `,
                providers: [TREE_FEATURES_PROVIDER]
            }] }
];
/** @nocollapse */
ClrTree.ctorParameters = () => [
    { type: TreeFeaturesService }
];
ClrTree.propDecorators = {
    lazy: [{ type: Input, args: ['clrLazy',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * @template T
 * @param {?} o
 * @return {?}
 */
function isPromise(o) {
    // Shamelessly copied from every open-source project out there.
    return o && typeof ((/** @type {?} */ (o))).then === 'function';
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * A recursive model is built received from the app and traversed to create the corresponding components.
 * Recursive = Model dictates the tree node components
 */
/**
 * @template T
 */
class RecursiveTreeNodeModel extends TreeNodeModel {
    /**
     * @param {?} model
     * @param {?} parent
     * @param {?} getChildren
     */
    constructor(model, parent, getChildren) {
        super();
        this.getChildren = getChildren;
        this.childrenFetched = false;
        this._children = [];
        this.model = model;
        this.parent = parent;
    }
    /**
     * @return {?}
     */
    clearChildren() {
        this._children.forEach((/**
         * @param {?} child
         * @return {?}
         */
        child => child.destroy()));
        delete this._children;
        this.childrenFetched = false;
    }
    /**
     * @return {?}
     */
    fetchChildren() {
        if (this.childrenFetched) {
            return;
        }
        /** @type {?} */
        const asyncChildren = this.getChildren(this.model);
        if (isPromise(asyncChildren)) {
            this.loading = true;
            asyncChildren.then((/**
             * @param {?} raw
             * @return {?}
             */
            raw => {
                this._children = this.wrapChildren(raw);
                this.loading = false;
            }));
        }
        else if (isObservable(asyncChildren)) {
            this.loading = true;
            this.subscription = asyncChildren.subscribe((/**
             * @param {?} raw
             * @return {?}
             */
            raw => {
                this._children = this.wrapChildren(raw);
                this.loading = false;
            }));
        }
        else if (asyncChildren) {
            // Synchronous case
            this._children = this.wrapChildren(asyncChildren);
        }
        else {
            this._children = [];
        }
        this.childrenFetched = true;
    }
    /**
     * @private
     * @param {?} rawModels
     * @return {?}
     */
    wrapChildren(rawModels) {
        return rawModels.map((/**
         * @param {?} m
         * @return {?}
         */
        m => new RecursiveTreeNodeModel(m, this, this.getChildren)));
    }
    /**
     * @return {?}
     */
    get children() {
        this.fetchChildren();
        return this._children;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set children(value) {
        this._children = value;
    }
    /**
     * @return {?}
     */
    destroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        super.destroy();
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
class ClrRecursiveForOf {
    /**
     * @param {?} template
     * @param {?} featuresService
     */
    constructor(template, featuresService) {
        this.template = template;
        this.featuresService = featuresService;
    }
    // I'm using OnChanges instead of OnInit to easily keep up to date with dynamic trees. Maybe optimizable later.
    /**
     * @return {?}
     */
    ngOnChanges() {
        /** @type {?} */
        let wrapped;
        if (Array.isArray(this.nodes)) {
            wrapped = this.nodes.map((/**
             * @param {?} node
             * @return {?}
             */
            node => new RecursiveTreeNodeModel(node, null, this.getChildren)));
        }
        else {
            wrapped = [new RecursiveTreeNodeModel(this.nodes, null, this.getChildren)];
        }
        this.featuresService.recursion = {
            template: this.template,
            root: wrapped,
        };
    }
}
ClrRecursiveForOf.decorators = [
    { type: Directive, args: [{ selector: '[clrRecursiveFor][clrRecursiveForOf]' },] }
];
/** @nocollapse */
ClrRecursiveForOf.ctorParameters = () => [
    { type: TemplateRef },
    { type: TreeFeaturesService }
];
ClrRecursiveForOf.propDecorators = {
    nodes: [{ type: Input, args: ['clrRecursiveForOf',] }],
    getChildren: [{ type: Input, args: ['clrRecursiveForGetChildren',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
/**
 * Internal component, do not export!
 * This is part of the hack to get around https://github.com/angular/angular/issues/15998
 */
class RecursiveChildren {
    /**
     * @param {?} featuresService
     * @param {?} expandService
     */
    constructor(featuresService, expandService) {
        this.featuresService = featuresService;
        this.expandService = expandService;
        if (expandService) {
            this.subscription = this.expandService.expandChange.subscribe((/**
             * @param {?} value
             * @return {?}
             */
            value => {
                if (!value && this.parent && !this.featuresService.eager && this.featuresService.recursion) {
                    // In the case of lazy-loading recursive trees, we clear the children on collapse.
                    // This is better in case they change between two user interaction, and that way
                    // the app itself can decide whether to cache them or not.
                    ((/** @type {?} */ (this.parent))).clearChildren();
                }
            }));
        }
    }
    /**
     * @return {?}
     */
    shouldRender() {
        return (this.featuresService.recursion &&
            // In the smart case, we eagerly render all the recursive children
            // to make sure two-way bindings for selection are available.
            // They will be hidden with CSS by the parent.
            (this.featuresService.eager || !this.expandService || this.expandService.expanded));
    }
    /**
     * @param {?} node
     * @return {?}
     */
    getContext(node) {
        return {
            $implicit: node.model,
            clrModel: node,
        };
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
RecursiveChildren.decorators = [
    { type: Component, args: [{
                selector: 'clr-recursive-children',
                template: `
    <ng-container *ngIf="shouldRender()">
      <ng-container *ngFor="let child of parent?.children || children">
        <ng-container *ngTemplateOutlet="featuresService.recursion.template; context: getContext(child)"></ng-container>
      </ng-container>
    </ng-container>
  `
            }] }
];
/** @nocollapse */
RecursiveChildren.ctorParameters = () => [
    { type: TreeFeaturesService },
    { type: IfExpandService, decorators: [{ type: Optional }] }
];
RecursiveChildren.propDecorators = {
    parent: [{ type: Input, args: ['parent',] }],
    children: [{ type: Input, args: ['children',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const CLR_TREE_VIEW_DIRECTIVES = [ClrTree, ClrTreeNode, ClrRecursiveForOf];
class ClrTreeViewModule {
}
ClrTreeViewModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, ClrIconModule, ClrLoadingModule],
                declarations: [CLR_TREE_VIEW_DIRECTIVES, RecursiveChildren],
                exports: [CLR_TREE_VIEW_DIRECTIVES],
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrDataModule {
}
ClrDataModule.decorators = [
    { type: NgModule, args: [{ exports: [ClrDatagridModule, ClrStackViewModule, ClrTreeViewModule] },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class RootDropdownService {
    constructor() {
        this._changes = new Subject();
    }
    /**
     * @return {?}
     */
    get changes() {
        return this._changes.asObservable();
    }
    /**
     * @return {?}
     */
    closeMenus() {
        this._changes.next(false);
    }
}
RootDropdownService.decorators = [
    { type: Injectable }
];
/**
 * @param {?} existing
 * @return {?}
 */
function clrRootDropdownFactory(existing) {
    return existing || new RootDropdownService();
}
/** @type {?} */
const ROOT_DROPDOWN_PROVIDER = {
    provide: RootDropdownService,
    useFactory: clrRootDropdownFactory,
    deps: [[new Optional(), new SkipSelf(), RootDropdownService]],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrDropdown {
    /**
     * @param {?} parent
     * @param {?} ifOpenService
     * @param {?} cdr
     * @param {?} dropdownService
     */
    constructor(parent, ifOpenService, cdr, dropdownService) {
        this.parent = parent;
        this.ifOpenService = ifOpenService;
        this.cdr = cdr;
        this.subscriptions = [];
        this.isMenuClosable = true;
        this.subscriptions.push(dropdownService.changes.subscribe((/**
         * @param {?} value
         * @return {?}
         */
        value => (this.ifOpenService.open = value))));
        this.subscriptions.push(ifOpenService.openChange.subscribe((/**
         * @param {?} value
         * @return {?}
         */
        value => this.cdr.markForCheck())));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        sub => sub.unsubscribe()));
    }
}
ClrDropdown.decorators = [
    { type: Component, args: [{
                selector: 'clr-dropdown',
                template: '<ng-content></ng-content>',
                host: {
                    '[class.dropdown]': 'true',
                    // the open class, also used in static version, is always present in the Angular version
                    // Angular takes care of hiding it, regardless of whether you use *clrIfOpen or not
                    '[class.open]': 'true',
                },
                providers: [IfOpenService, ROOT_DROPDOWN_PROVIDER, { provide: POPOVER_HOST_ANCHOR, useExisting: ElementRef }]
            }] }
];
/** @nocollapse */
ClrDropdown.ctorParameters = () => [
    { type: ClrDropdown, decorators: [{ type: SkipSelf }, { type: Optional }] },
    { type: IfOpenService },
    { type: ChangeDetectorRef },
    { type: RootDropdownService }
];
ClrDropdown.propDecorators = {
    isMenuClosable: [{ type: Input, args: ['clrCloseMenuOnItemClick',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrDropdownItem {
    /**
     * @param {?} dropdown
     * @param {?} el
     * @param {?} _dropdownService
     * @param {?} renderer
     */
    constructor(dropdown, el, _dropdownService, renderer) {
        this.dropdown = dropdown;
        this.el = el;
        this._dropdownService = _dropdownService;
        this.renderer = renderer;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.renderer.listen(this.el.nativeElement, 'click', (/**
         * @return {?}
         */
        () => this.onDropdownItemClick()));
    }
    /**
     * @return {?}
     */
    onDropdownItemClick() {
        if (this.dropdown.isMenuClosable && !this.el.nativeElement.classList.contains('disabled')) {
            this._dropdownService.closeMenus();
        }
    }
}
ClrDropdownItem.decorators = [
    { type: Directive, args: [{ selector: '[clrDropdownItem]', host: { '[class.dropdown-item]': 'true' } },] }
];
/** @nocollapse */
ClrDropdownItem.ctorParameters = () => [
    { type: ClrDropdown },
    { type: ElementRef },
    { type: RootDropdownService },
    { type: Renderer2 }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrDropdownMenu extends AbstractPopover {
    /**
     * @param {?} injector
     * @param {?} parentHost
     * @param {?} nested
     */
    constructor(injector, parentHost, nested) {
        if (!parentHost) {
            throw new Error('clr-dropdown-menu should only be used inside of a clr-dropdown');
        }
        super(injector, parentHost);
        if (!nested) {
            // Default positioning for normal dropdown is bottom-left
            this.anchorPoint = Point.BOTTOM_LEFT;
            this.popoverPoint = Point.LEFT_TOP;
        }
        else {
            // Default positioning for nested dropdown is right-top
            this.anchorPoint = Point.RIGHT_TOP;
            this.popoverPoint = Point.LEFT_TOP;
        }
        this.popoverOptions.allowMultipleOpen = true;
        this.closeOnOutsideClick = true;
    }
    /**
     * @param {?} position
     * @return {?}
     */
    set position(position) {
        // set the popover values based on menu position
        switch (position) {
            case 'top-right':
                this.anchorPoint = Point.TOP_RIGHT;
                this.popoverPoint = Point.RIGHT_BOTTOM;
                break;
            case 'top-left':
                this.anchorPoint = Point.TOP_LEFT;
                this.popoverPoint = Point.LEFT_BOTTOM;
                break;
            case 'bottom-right':
                this.anchorPoint = Point.BOTTOM_RIGHT;
                this.popoverPoint = Point.RIGHT_TOP;
                break;
            case 'bottom-left':
                this.anchorPoint = Point.BOTTOM_LEFT;
                this.popoverPoint = Point.LEFT_TOP;
                break;
            case 'right-top':
                this.anchorPoint = Point.RIGHT_TOP;
                this.popoverPoint = Point.LEFT_TOP;
                break;
            case 'right-bottom':
                this.anchorPoint = Point.RIGHT_BOTTOM;
                this.popoverPoint = Point.LEFT_BOTTOM;
                break;
            case 'left-top':
                this.anchorPoint = Point.LEFT_TOP;
                this.popoverPoint = Point.RIGHT_TOP;
                break;
            case 'left-bottom':
                this.anchorPoint = Point.LEFT_BOTTOM;
                this.popoverPoint = Point.RIGHT_BOTTOM;
                break;
            default:
                this.anchorPoint = Point.BOTTOM_LEFT;
                this.popoverPoint = Point.LEFT_TOP;
                break;
        }
    }
}
ClrDropdownMenu.decorators = [
    { type: Component, args: [{
                selector: 'clr-dropdown-menu',
                template: `
        <ng-content></ng-content>
    `,
                host: {
                    '[class.dropdown-menu]': 'true',
                }
            }] }
];
/** @nocollapse */
ClrDropdownMenu.ctorParameters = () => [
    { type: Injector },
    { type: ElementRef, decorators: [{ type: Optional }, { type: Inject, args: [POPOVER_HOST_ANCHOR,] }] },
    { type: ClrDropdownMenu, decorators: [{ type: Optional }, { type: SkipSelf }] }
];
ClrDropdownMenu.propDecorators = {
    position: [{ type: Input, args: ['clrPosition',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrDropdownTrigger {
    /**
     * @param {?} dropdown
     * @param {?} ifOpenService
     */
    constructor(dropdown, ifOpenService) {
        this.ifOpenService = ifOpenService;
        this.isRootLevelToggle = true;
        // if the containing dropdown has a parent, then this is not the root level one
        if (dropdown.parent) {
            this.isRootLevelToggle = false;
        }
    }
    /**
     * @return {?}
     */
    get active() {
        return this.ifOpenService.open;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onDropdownTriggerClick(event) {
        this.ifOpenService.toggleWithEvent(event);
    }
}
ClrDropdownTrigger.decorators = [
    { type: Directive, args: [{
                // We support both selectors for legacy reasons
                selector: '[clrDropdownTrigger],[clrDropdownToggle]',
                host: {
                    '[class.dropdown-toggle]': 'isRootLevelToggle',
                    '[class.dropdown-item]': '!isRootLevelToggle',
                    '[class.expandable]': '!isRootLevelToggle',
                    '[class.active]': 'active',
                },
            },] }
];
/** @nocollapse */
ClrDropdownTrigger.ctorParameters = () => [
    { type: ClrDropdown },
    { type: IfOpenService }
];
ClrDropdownTrigger.propDecorators = {
    onDropdownTriggerClick: [{ type: HostListener, args: ['click', ['$event'],] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const CLR_DROPDOWN_DIRECTIVES = [ClrDropdown, ClrDropdownMenu, ClrDropdownTrigger, ClrDropdownItem];
class ClrDropdownModule {
}
ClrDropdownModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, ClrCommonPopoverModule],
                declarations: [CLR_DROPDOWN_DIRECTIVES],
                exports: [CLR_DROPDOWN_DIRECTIVES, ClrConditionalModule, ClrIconModule],
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
// @TODO Make this an enum
/** @type {?} */
const ALERT_TYPES = ['info', 'warning', 'danger', 'success'];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AlertIconAndTypesService {
    /**
     * @param {?} commonStrings
     */
    constructor(commonStrings) {
        this.commonStrings = commonStrings;
        this.defaultIconShape = 'info-circle';
        this._alertIconShape = '';
        this._alertType = 'info';
    }
    /**
     * @return {?}
     */
    get alertType() {
        return this._alertType;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set alertType(val) {
        if (ALERT_TYPES.indexOf(val) > -1) {
            this._alertType = val;
        }
    }
    /**
     * @return {?}
     */
    get alertIconShape() {
        if ('' === this._alertIconShape) {
            return this.iconInfoFromType(this._alertType).shape;
        }
        return this._alertIconShape;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set alertIconShape(val) {
        if (!val) {
            this._alertIconShape = '';
        }
        else if (val !== this._alertIconShape) {
            this._alertIconShape = val;
        }
    }
    /**
     * @return {?}
     */
    get alertIconTitle() {
        return this.iconInfoFromType(this._alertType).title;
    }
    /**
     * @param {?} type
     * @return {?}
     */
    iconInfoFromType(type) {
        /** @type {?} */
        const returnObj = { shape: '', cssClass: '', title: '' };
        switch (type) {
            case 'warning':
                returnObj.shape = 'exclamation-triangle';
                returnObj.cssClass = 'alert-warning';
                returnObj.title = this.commonStrings.warning;
                break;
            case 'danger':
                returnObj.shape = 'exclamation-circle';
                returnObj.cssClass = 'alert-danger';
                returnObj.title = this.commonStrings.danger;
                break;
            case 'success':
                returnObj.shape = 'check-circle';
                returnObj.cssClass = 'alert-success';
                returnObj.title = this.commonStrings.success;
                break;
            default:
                returnObj.shape = this.defaultIconShape;
                returnObj.cssClass = 'alert-info';
                returnObj.title = this.commonStrings.info;
                break;
        }
        return returnObj;
    }
}
AlertIconAndTypesService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
AlertIconAndTypesService.ctorParameters = () => [
    { type: ClrCommonStrings }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class MultiAlertService {
    constructor() {
        this.allAlerts = new QueryList();
        this._current = 0;
        /**
         * The Observable that lets other classes subscribe to changes
         */
        this._change = new Subject();
    }
    /**
     * @return {?}
     */
    get changes() {
        return this._change.asObservable();
    }
    /**
     * @return {?}
     */
    get current() {
        return this._current;
    }
    /**
     * @param {?} index
     * @return {?}
     */
    set current(index) {
        if (index !== this._current) {
            this._current = index;
            this._change.next(index);
        }
    }
    /**
     * @return {?}
     */
    get activeAlerts() {
        return this.allAlerts.filter((/**
         * @param {?} alert
         * @return {?}
         */
        alert => !alert._closed));
    }
    /**
     * @return {?}
     */
    get currentAlert() {
        return this.activeAlerts[this.current];
    }
    /**
     * @param {?} alert
     * @return {?}
     */
    set currentAlert(alert) {
        this.current = this.activeAlerts.indexOf(alert);
    }
    /**
     * @return {?}
     */
    get count() {
        return this.activeAlerts.length;
    }
    /**
     * @param {?} alerts
     * @return {?}
     */
    manage(alerts) {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.allAlerts = alerts;
        this.subscription = this.allAlerts.changes.subscribe((/**
         * @return {?}
         */
        () => {
            if (this.current >= this.allAlerts.length) {
                this.current = Math.max(0, this.allAlerts.length - 1);
            }
        }));
    }
    /**
     * @return {?}
     */
    next() {
        this.current = this.current === this.activeAlerts.length - 1 ? 0 : this.current + 1;
    }
    /**
     * @return {?}
     */
    previous() {
        if (this.activeAlerts.length === 0) {
            return;
        }
        this.current = this.current === 0 ? this.activeAlerts.length - 1 : this.current - 1;
    }
    /**
     * @return {?}
     */
    close() {
        this.previous();
    }
    /**
     * @return {?}
     */
    destroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
MultiAlertService.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrAlert {
    /**
     * @param {?} iconService
     * @param {?} cdr
     * @param {?} multiAlertService
     * @param {?} commonStrings
     */
    constructor(iconService, cdr, multiAlertService, commonStrings) {
        this.iconService = iconService;
        this.cdr = cdr;
        this.multiAlertService = multiAlertService;
        this.commonStrings = commonStrings;
        this.isSmall = false;
        this.closable = true;
        this.isAppLevel = false;
        this._closed = false;
        this._closedChanged = new EventEmitter(false);
        this.previouslyHidden = false;
        this.hidden = false;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set alertType(val) {
        this.iconService.alertType = val;
    }
    /**
     * @return {?}
     */
    get alertType() {
        return this.iconService.alertType;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set alertIconShape(value) {
        this.iconService.alertIconShape = value;
    }
    /**
     * @return {?}
     */
    get alertClass() {
        return this.iconService.iconInfoFromType(this.iconService.alertType).cssClass;
    }
    /**
     * @private
     * @return {?}
     */
    detectChangesIfNeeded() {
        if (this.previouslyHidden !== this.hidden) {
            this.previouslyHidden = this.hidden;
            this.cdr.detectChanges();
        }
    }
    /**
     * @return {?}
     */
    get isHidden() {
        if (this.multiAlertService) {
            // change detection issue in production mode causes currentAlert to be undefined when only the first alert exists
            // https://github.com/vmware/clarity/issues/2430
            if (this.multiAlertService.currentAlert === this || this.multiAlertService.count === 0) {
                if (this.hidden === true) {
                    this.previouslyHidden = true;
                    this.hidden = false;
                }
            }
            else if (this.hidden === false) {
                this.previouslyHidden = false;
                this.hidden = true;
            }
            this.detectChangesIfNeeded();
        }
        return this.hidden;
    }
    /**
     * @return {?}
     */
    close() {
        if (!this.closable) {
            return;
        }
        this._closed = true;
        if (this.multiAlertService) {
            this.multiAlertService.close();
        }
        this._closedChanged.emit(true);
    }
    /**
     * @return {?}
     */
    open() {
        this._closed = false;
        this._closedChanged.emit(false);
    }
}
ClrAlert.decorators = [
    { type: Component, args: [{
                selector: 'clr-alert',
                providers: [AlertIconAndTypesService],
                template: "<!--\n  ~ Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.\n  ~ This software is released under MIT license.\n  ~ The full license information can be found in LICENSE in the root directory of this project.\n  -->\n\n<div\n    *ngIf=\"!_closed\"\n    class=\"alert\"\n    [ngClass]=\"alertClass\"\n    [class.alert-hidden]=\"isHidden\"\n    [class.alert-sm]=\"isSmall\"\n    [class.alert-app-level]=\"isAppLevel\"\n    role=\"alert\">\n    <div class=\"alert-items\">\n        <ng-content></ng-content>\n    </div>\n    <button type=\"button\" class=\"close\" *ngIf=\"closable\" (click)=\"close()\">\n        <clr-icon shape=\"close\" [attr.title]=\"commonStrings.close\"></clr-icon>\n    </button>\n</div>\n",
                styles: [':host { display: block; }']
            }] }
];
/** @nocollapse */
ClrAlert.ctorParameters = () => [
    { type: AlertIconAndTypesService },
    { type: ChangeDetectorRef },
    { type: MultiAlertService, decorators: [{ type: Optional }] },
    { type: ClrCommonStrings }
];
ClrAlert.propDecorators = {
    isSmall: [{ type: Input, args: ['clrAlertSizeSmall',] }],
    closable: [{ type: Input, args: ['clrAlertClosable',] }],
    isAppLevel: [{ type: Input, args: ['clrAlertAppLevel',] }],
    _closed: [{ type: Input, args: ['clrAlertClosed',] }],
    _closedChanged: [{ type: Output, args: ['clrAlertClosedChange',] }],
    alertType: [{ type: Input, args: ['clrAlertType',] }],
    alertIconShape: [{ type: Input, args: ['clrAlertIcon',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrAlertItem {
    /**
     * @param {?} iconService
     */
    constructor(iconService) {
        this.iconService = iconService;
    }
}
ClrAlertItem.decorators = [
    { type: Component, args: [{
                selector: 'clr-alert-item',
                template: `
        <div class="alert-icon-wrapper">
            <clr-icon class="alert-icon" 
              [attr.shape]="iconService.alertIconShape" 
              [attr.title]="iconService.alertIconTitle"></clr-icon>
        </div>
        <ng-content></ng-content>
    `,
                host: { class: 'alert-item' }
            }] }
];
/** @nocollapse */
ClrAlertItem.ctorParameters = () => [
    { type: AlertIconAndTypesService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrAlerts {
    /**
     * @param {?} multiAlertService
     */
    constructor(multiAlertService) {
        this.multiAlertService = multiAlertService;
        this.currentAlertIndexChange = new EventEmitter(false);
        this.currentAlertChange = new EventEmitter(false);
    }
    /**
     * Input/Output to support two way binding on current alert index
     * @param {?} index
     * @return {?}
     */
    set _inputCurrentIndex(index) {
        if (Number.isInteger(index) && index >= 0) {
            this.multiAlertService.current = index;
        }
    }
    /**
     * @param {?} index
     * @return {?}
     */
    set currentAlertIndex(index) {
        this.multiAlertService.current = index;
    }
    /**
     * @return {?}
     */
    get currentAlertIndex() {
        return this.multiAlertService.current;
    }
    /**
     * Input/Output to support two way binding on current alert instance
     * @param {?} alert
     * @return {?}
     */
    set currentAlert(alert) {
        if (alert) {
            this.multiAlertService.currentAlert = alert;
        }
    }
    /**
     * @return {?}
     */
    get currentAlert() {
        return this.multiAlertService.currentAlert;
    }
    /**
     * Ensure we are only dealing with alerts that have not been closed yet
     * @return {?}
     */
    get alerts() {
        return this.allAlerts.filter((/**
         * @param {?} alert
         * @return {?}
         */
        alert => {
            return alert.isHidden === false;
        }));
    }
    /**
     * @return {?}
     */
    get currentAlertType() {
        if (this.multiAlertService.currentAlert) {
            return this.multiAlertService.currentAlert.alertType;
        }
        return '';
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.multiAlertService.manage(this.allAlerts);
        this.multiAlertService.changes.subscribe((/**
         * @param {?} index
         * @return {?}
         */
        index => {
            this.currentAlertIndexChange.next(index);
            this.currentAlertChange.next(this.multiAlertService.currentAlert);
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.multiAlertService.destroy();
    }
}
ClrAlerts.decorators = [
    { type: Component, args: [{
                selector: 'clr-alerts',
                template: "<!--\n  ~ Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.\n  ~ This software is released under MIT license.\n  ~ The full license information can be found in LICENSE in the root directory of this project.\n  -->\n\n<clr-alerts-pager\n        *ngIf=\"multiAlertService.count > 1\"\n        [clrCurrentAlertIndex]=\"currentAlertIndex\">\n</clr-alerts-pager>\n<ng-content select=\"clr-alert\"></ng-content>\n",
                providers: [MultiAlertService],
                host: {
                    '[class.alerts]': 'true',
                    '[class.alert-danger]': "this.currentAlertType == 'danger'",
                    '[class.alert-info]': "this.currentAlertType == 'info'",
                    '[class.alert-success]': "this.currentAlertType == 'success'",
                    '[class.alert-warning]': "this.currentAlertType == 'warning'",
                },
                styles: [':host { display: block }']
            }] }
];
/** @nocollapse */
ClrAlerts.ctorParameters = () => [
    { type: MultiAlertService }
];
ClrAlerts.propDecorators = {
    allAlerts: [{ type: ContentChildren, args: [ClrAlert,] }],
    _inputCurrentIndex: [{ type: Input, args: ['clrCurrentAlertIndex',] }],
    currentAlertIndexChange: [{ type: Output, args: ['clrCurrentAlertIndexChange',] }],
    currentAlert: [{ type: Input, args: ['clrCurrentAlert',] }],
    currentAlertChange: [{ type: Output, args: ['clrCurrentAlertChange',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrAlertsPager {
    /**
     * @param {?} multiAlertService
     * @param {?} commonStrings
     */
    constructor(multiAlertService, commonStrings) {
        this.multiAlertService = multiAlertService;
        this.commonStrings = commonStrings;
        this.currentAlertChange = new EventEmitter(false);
        this.currentAlertIndexChange = new EventEmitter();
    }
    /**
     * Input/Output to support two way binding on current alert instance
     * @param {?} alert
     * @return {?}
     */
    set currentAlert(alert) {
        if (alert) {
            this.multiAlertService.currentAlert = alert;
        }
    }
    /**
     * @return {?}
     */
    get currentAlert() {
        return this.multiAlertService.currentAlert;
    }
    /**
     * Input/Output to support two way binding on current alert index
     * @param {?} index
     * @return {?}
     */
    set currentAlertIndex(index) {
        this.multiAlertService.current = index;
    }
    /**
     * @return {?}
     */
    get currentAlertIndex() {
        return this.multiAlertService.current;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.multiAlertServiceChanges = this.multiAlertService.changes.subscribe((/**
         * @param {?} index
         * @return {?}
         */
        index => {
            this.currentAlertIndexChange.emit(index);
            this.currentAlertChange.emit(this.multiAlertService.activeAlerts[index]);
        }));
    }
    /**
     * @return {?}
     */
    pageUp() {
        this.multiAlertService.next();
    }
    /**
     * @return {?}
     */
    pageDown() {
        this.multiAlertService.previous();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.multiAlertServiceChanges.unsubscribe();
    }
}
ClrAlertsPager.decorators = [
    { type: Component, args: [{
                selector: 'clr-alerts-pager',
                template: "<!--\n  ~ Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.\n  ~ This software is released under MIT license.\n  ~ The full license information can be found in LICENSE in the root directory of this project.\n  -->\n\n<div class=\"alerts-pager-control\">\n    <div class=\"alerts-page-down\">\n        <button class=\"alerts-pager-button\" (click)=\"pageDown()\">\n            <clr-icon shape=\"caret left\" [attr.title]=\"commonStrings.previous\"></clr-icon>\n        </button>\n    </div>\n    <div class=\"alerts-pager-text\">\n        {{this.multiAlertService.current+1}} / {{this.multiAlertService.count}}\n    </div>\n    <div class=\"alerts-page-up\">\n        <button class=\"alerts-pager-button\" (click)=\"pageUp()\">\n            <clr-icon shape=\"caret right\" [attr.title]=\"commonStrings.next\"></clr-icon>\n        </button>\n    </div>\n</div>\n",
                host: { '[class.alerts-pager]': 'true' }
            }] }
];
/** @nocollapse */
ClrAlertsPager.ctorParameters = () => [
    { type: MultiAlertService },
    { type: ClrCommonStrings }
];
ClrAlertsPager.propDecorators = {
    currentAlert: [{ type: Input, args: ['clrCurrentAlert',] }],
    currentAlertChange: [{ type: Output, args: ['clrCurrentAlertChange',] }],
    currentAlertIndex: [{ type: Input, args: ['clrCurrentAlertIndex',] }],
    currentAlertIndexChange: [{ type: Output, args: ['clrCurrentAlertIndexChange',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const CLR_ALERT_DIRECTIVES = [ClrAlert, ClrAlertItem, ClrAlerts, ClrAlertsPager];
class ClrAlertModule {
}
ClrAlertModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, ClrIconModule, ClrDropdownModule],
                declarations: [CLR_ALERT_DIRECTIVES],
                exports: [CLR_ALERT_DIRECTIVES],
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrEmphasisModule {
}
ClrEmphasisModule.decorators = [
    { type: NgModule, args: [{ exports: [ClrAlertModule] },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class ResponsiveNavCodes {
}
ResponsiveNavCodes.NAV_LEVEL_1 = 1;
ResponsiveNavCodes.NAV_LEVEL_2 = 2;
ResponsiveNavCodes.NAV_CLOSE_ALL = 'NAV_CLOSE_ALL';
ResponsiveNavCodes.NAV_OPEN = 'NAV_OPEN';
ResponsiveNavCodes.NAV_CLOSE = 'NAV_CLOSE';
ResponsiveNavCodes.NAV_TOGGLE = 'NAV_TOGGLE';
ResponsiveNavCodes.NAV_CLASS_HAMBURGER_MENU = 'open-hamburger-menu';
ResponsiveNavCodes.NAV_CLASS_OVERFLOW_MENU = 'open-overflow-menu';
ResponsiveNavCodes.NAV_CLASS_TRIGGER_1 = 'header-hamburger-trigger';
ResponsiveNavCodes.NAV_CLASS_TRIGGER_2 = 'header-overflow-trigger';
ResponsiveNavCodes.NAV_CLASS_LEVEL_1 = 'clr-nav-level-1';
ResponsiveNavCodes.NAV_CLASS_LEVEL_2 = 'clr-nav-level-2';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class ResponsiveNavControlMessage {
    /**
     * @param {?} _controlCode
     * @param {?} _navLevel
     */
    constructor(_controlCode, _navLevel) {
        this._controlCode = _controlCode;
        this._navLevel = _navLevel;
    }
    /**
     * @return {?}
     */
    get controlCode() {
        return this._controlCode;
    }
    /**
     * @return {?}
     */
    get navLevel() {
        return this._navLevel;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ResponsiveNavigationService {
    constructor() {
        this.responsiveNavList = [];
        this.registerNavSubject = new ReplaySubject();
        this.controlNavSubject = new Subject();
        this.closeAllNavs(); // We start with all navs closed
    }
    /**
     * @return {?}
     */
    get registeredNavs() {
        return this.registerNavSubject.asObservable();
    }
    /**
     * @return {?}
     */
    get navControl() {
        return this.controlNavSubject.asObservable();
    }
    /**
     * @param {?} navLevel
     * @return {?}
     */
    registerNav(navLevel) {
        if (!navLevel || this.isNavRegistered(navLevel)) {
            return;
        }
        this.responsiveNavList.push(navLevel);
        this.registerNavSubject.next(this.responsiveNavList);
    }
    /**
     * @param {?} navLevel
     * @return {?}
     */
    isNavRegistered(navLevel) {
        if (this.responsiveNavList.indexOf(navLevel) > -1) {
            console.error('Multiple clr-nav-level ' + navLevel + ' attributes found. Please make sure that only one exists');
            return true;
        }
        return false;
    }
    /**
     * @param {?} navLevel
     * @return {?}
     */
    unregisterNav(navLevel) {
        /** @type {?} */
        const index = this.responsiveNavList.indexOf(navLevel);
        if (index > -1) {
            this.responsiveNavList.splice(index, 1);
            this.registerNavSubject.next(this.responsiveNavList);
        }
    }
    /**
     * @param {?} controlCode
     * @param {?} navLevel
     * @return {?}
     */
    sendControlMessage(controlCode, navLevel) {
        /** @type {?} */
        const message = new ResponsiveNavControlMessage(controlCode, navLevel);
        this.controlNavSubject.next(message);
    }
    /**
     * @return {?}
     */
    closeAllNavs() {
        /** @type {?} */
        const message = new ResponsiveNavControlMessage(ResponsiveNavCodes.NAV_CLOSE_ALL, -999);
        this.controlNavSubject.next(message);
    }
}
ResponsiveNavigationService.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */
ResponsiveNavigationService.ctorParameters = () => [];
/** @nocollapse */ ResponsiveNavigationService.ngInjectableDef = ɵɵdefineInjectable({ factory: function ResponsiveNavigationService_Factory() { return new ResponsiveNavigationService(); }, token: ResponsiveNavigationService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrMainContainer {
    /**
     * @param {?} elRef
     * @param {?} responsiveNavService
     */
    constructor(elRef, responsiveNavService) {
        this.elRef = elRef;
        this.responsiveNavService = responsiveNavService;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._classList = this.elRef.nativeElement.classList;
        this._subscription = this.responsiveNavService.navControl.subscribe({
            next: (/**
             * @param {?} message
             * @return {?}
             */
            (message) => {
                this.processMessage(message);
            }),
        });
    }
    /**
     * @param {?} message
     * @return {?}
     */
    processMessage(message) {
        /** @type {?} */
        let navClass = ResponsiveNavCodes.NAV_CLASS_HAMBURGER_MENU;
        if (message.controlCode === ResponsiveNavCodes.NAV_CLOSE_ALL) {
            this._classList.remove(ResponsiveNavCodes.NAV_CLASS_HAMBURGER_MENU);
            this._classList.remove(ResponsiveNavCodes.NAV_CLASS_OVERFLOW_MENU);
        }
        else if (message.navLevel === ResponsiveNavCodes.NAV_LEVEL_1) {
            this.controlNav(message.controlCode, navClass);
        }
        else if (message.navLevel === ResponsiveNavCodes.NAV_LEVEL_2) {
            navClass = ResponsiveNavCodes.NAV_CLASS_OVERFLOW_MENU;
            this.controlNav(message.controlCode, navClass);
        }
    }
    /**
     * @param {?} controlCode
     * @param {?} navClass
     * @return {?}
     */
    controlNav(controlCode, navClass) {
        if (controlCode === ResponsiveNavCodes.NAV_OPEN) {
            this._classList.add(navClass);
        }
        else if (controlCode === ResponsiveNavCodes.NAV_CLOSE) {
            this._classList.remove(navClass);
        }
        else if (controlCode === ResponsiveNavCodes.NAV_TOGGLE) {
            this._classList.toggle(navClass);
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
}
ClrMainContainer.decorators = [
    { type: Directive, args: [{ selector: 'clr-main-container', host: { '[class.main-container]': 'true' } },] }
];
/** @nocollapse */
ClrMainContainer.ctorParameters = () => [
    { type: ElementRef },
    { type: ResponsiveNavigationService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const CLR_LAYOUT_DIRECTIVES = [ClrMainContainer];
class ClrMainContainerModule {
}
ClrMainContainerModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, ClrIconModule],
                declarations: [CLR_LAYOUT_DIRECTIVES],
                exports: [CLR_LAYOUT_DIRECTIVES],
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class MainContainerWillyWonka extends WillyWonka {
}
MainContainerWillyWonka.decorators = [
    { type: Directive, args: [{ selector: 'clr-main-container' },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NavDetectionOompaLoompa extends OompaLoompa {
    /**
     * @param {?} cdr
     * @param {?} willyWonka
     * @param {?} responsiveNavService
     */
    constructor(cdr, willyWonka, responsiveNavService) {
        if (!willyWonka) {
            throw new Error('clr-header should only be used inside of a clr-main-container');
        }
        super(cdr, willyWonka);
        this.responsiveNavService = responsiveNavService;
    }
    // NavDetectionOompaLoompa is the addition of the nav levels
    // Since we support 2 levels, the possibilities are 0, 1 or 3 (1 + 2)
    /**
     * @return {?}
     */
    get flavor() {
        return this.responsiveNavService.responsiveNavList.reduce((/**
         * @param {?} sum
         * @param {?} navLevel
         * @return {?}
         */
        (sum, navLevel) => sum + navLevel), 0);
    }
}
NavDetectionOompaLoompa.decorators = [
    { type: Directive, args: [{ selector: 'clr-header' },] }
];
/** @nocollapse */
NavDetectionOompaLoompa.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: MainContainerWillyWonka, decorators: [{ type: Optional }] },
    { type: ResponsiveNavigationService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrHeader {
    /**
     * @param {?} responsiveNavService
     * @param {?} commonStrings
     */
    constructor(responsiveNavService, commonStrings) {
        this.responsiveNavService = responsiveNavService;
        this.commonStrings = commonStrings;
        this.isNavLevel1OnPage = false;
        this.isNavLevel2OnPage = false;
        this.openNavLevel = null;
        this.responsiveNavCodes = ResponsiveNavCodes;
        this._subscription = this.responsiveNavService.registeredNavs.subscribe({
            next: (/**
             * @param {?} navLevelList
             * @return {?}
             */
            (navLevelList) => {
                this.initializeNavTriggers(navLevelList);
            }),
        });
    }
    // reset triggers. handles cases when an application has different nav levels on different pages.
    /**
     * @return {?}
     */
    resetNavTriggers() {
        this.isNavLevel1OnPage = false;
        this.isNavLevel2OnPage = false;
    }
    // decides which triggers to show on the header
    /**
     * @param {?} navList
     * @return {?}
     */
    initializeNavTriggers(navList) {
        this.resetNavTriggers();
        if (navList.length > 2) {
            console.error('More than 2 Nav Levels detected.');
            return;
        }
        navList.forEach((/**
         * @param {?} navLevel
         * @return {?}
         */
        navLevel => {
            if (navLevel === ResponsiveNavCodes.NAV_LEVEL_1) {
                this.isNavLevel1OnPage = true;
            }
            else if (navLevel === ResponsiveNavCodes.NAV_LEVEL_2) {
                this.isNavLevel2OnPage = true;
            }
        }));
    }
    // closes the nav that is open
    /**
     * @return {?}
     */
    closeOpenNav() {
        this.responsiveNavService.closeAllNavs();
    }
    // toggles the nav that is open
    /**
     * @param {?} navLevel
     * @return {?}
     */
    toggleNav(navLevel) {
        this.openNavLevel = this.openNavLevel === navLevel ? null : navLevel;
        this.responsiveNavService.sendControlMessage(ResponsiveNavCodes.NAV_TOGGLE, navLevel);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
}
ClrHeader.decorators = [
    { type: Component, args: [{
                selector: 'clr-header',
                template: `
        <button
            type="button"
            *ngIf="isNavLevel1OnPage"
            class="header-hamburger-trigger"
            [attr.aria-label]="(openNavLevel !== responsiveNavCodes.NAV_LEVEL_1) ? commonStrings.open : commonStrings.close"
            (click)="toggleNav(responsiveNavCodes.NAV_LEVEL_1)">
            <span></span>
        </button>
        <ng-content></ng-content>
        <button
            type="button"
            *ngIf="isNavLevel2OnPage"
            class="header-overflow-trigger"
            [attr.aria-label]="(openNavLevel !== responsiveNavCodes.NAV_LEVEL_2) ? commonStrings.open : commonStrings.close"
            (click)="toggleNav(responsiveNavCodes.NAV_LEVEL_2)">
            <span></span>
        </button>
        <div class="header-backdrop" (click)="closeOpenNav()"></div>
    `,
                host: { '[class.header]': 'true' }
            }] }
];
/** @nocollapse */
ClrHeader.ctorParameters = () => [
    { type: ResponsiveNavigationService },
    { type: ClrCommonStrings }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrNavLevel {
    /**
     * @param {?} responsiveNavService
     * @param {?} elementRef
     */
    constructor(responsiveNavService, elementRef) {
        this.responsiveNavService = responsiveNavService;
        this.elementRef = elementRef;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.level !== ResponsiveNavCodes.NAV_LEVEL_1 && this.level !== ResponsiveNavCodes.NAV_LEVEL_2) {
            console.error('Nav Level can only be 1 or 2');
            return;
        }
        this.responsiveNavService.registerNav(this.level);
        this.addNavClass(this.level);
    }
    /**
     * @param {?} level
     * @return {?}
     */
    addNavClass(level) {
        /** @type {?} */
        const navHostClassList = this.elementRef.nativeElement.classList;
        if (level === ResponsiveNavCodes.NAV_LEVEL_1) {
            navHostClassList.add(ResponsiveNavCodes.NAV_CLASS_LEVEL_1);
        }
        else if (level === ResponsiveNavCodes.NAV_LEVEL_2) {
            navHostClassList.add(ResponsiveNavCodes.NAV_CLASS_LEVEL_2);
        }
    }
    /**
     * @return {?}
     */
    get level() {
        return this._level;
    }
    // getter to access the responsive navigation codes from the template
    /**
     * @return {?}
     */
    get responsiveNavCodes() {
        return ResponsiveNavCodes;
    }
    /**
     * @return {?}
     */
    open() {
        this.responsiveNavService.sendControlMessage(ResponsiveNavCodes.NAV_OPEN, this.level);
    }
    /**
     * @return {?}
     */
    close() {
        this.responsiveNavService.sendControlMessage(ResponsiveNavCodes.NAV_CLOSE, this.level);
    }
    // TODO: Figure out whats the best way to do this. Possible methods
    // 1. HostListener (current solution)
    // 2. Directives on the .nav-link class. We discussed on moving away from class selectors but I forget the reason
    // why
    /**
     * @param {?} target
     * @return {?}
     */
    onMouseClick(target) {
        /** @type {?} */
        let current = target;
        // Get the element in the DOM on which the mouse was clicked
        /** @type {?} */
        const navHost = this.elementRef.nativeElement;
        // Start checking if current and navHost are equal.
        // If not traverse to the parentNode and check again.
        while (current) {
            if (current === navHost) {
                return;
            }
            else if (current.classList.contains('nav-link')) {
                this.close();
                return;
            }
            current = current.parentNode;
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.responsiveNavService.unregisterNav(this.level);
    }
}
ClrNavLevel.decorators = [
    { type: Directive, args: [{ selector: '[clr-nav-level]' },] }
];
/** @nocollapse */
ClrNavLevel.ctorParameters = () => [
    { type: ResponsiveNavigationService },
    { type: ElementRef }
];
ClrNavLevel.propDecorators = {
    _level: [{ type: Input, args: ['clr-nav-level',] }],
    onMouseClick: [{ type: HostListener, args: ['click', ['$event.target'],] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const CLR_NAVIGATION_DIRECTIVES = [
    ClrHeader,
    ClrNavLevel,
    NavDetectionOompaLoompa,
    MainContainerWillyWonka,
];
class ClrNavigationModule {
}
ClrNavigationModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, ClrIconModule, ClrDropdownModule],
                declarations: [CLR_NAVIGATION_DIRECTIVES],
                exports: [CLR_NAVIGATION_DIRECTIVES],
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TemplateRefContainer {
}
TemplateRefContainer.decorators = [
    { type: Component, args: [{
                template: `
      <ng-template>
        <ng-content></ng-content>
      </ng-template>
    `
            }] }
];
TemplateRefContainer.propDecorators = {
    template: [{ type: ViewChild, args: [TemplateRef,] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const TEMPLATE_REF_DIRECTIVES = [TemplateRefContainer];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrTemplateRefModule {
}
ClrTemplateRefModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: [TEMPLATE_REF_DIRECTIVES],
                entryComponents: [TEMPLATE_REF_DIRECTIVES],
                exports: [TEMPLATE_REF_DIRECTIVES],
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TabsWillyWonka extends WillyWonka {
}
TabsWillyWonka.decorators = [
    { type: Directive, args: [{ selector: 'clr-tabs' },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ActiveOompaLoompa extends OompaLoompa {
    /**
     * @param {?} cdr
     * @param {?} willyWonka
     * @param {?} id
     * @param {?} ifActive
     */
    constructor(cdr, willyWonka, id, ifActive) {
        if (!willyWonka) {
            throw new Error('clrTabLink and clr-tab-content should only be used inside of a clr-tabs');
        }
        super(cdr, willyWonka);
        this.ifActive = ifActive;
        this.id = id;
    }
    /**
     * @return {?}
     */
    get flavor() {
        return this.ifActive.current === this.id;
    }
}
ActiveOompaLoompa.decorators = [
    { type: Directive, args: [{ selector: '[clrTabLink], clr-tab-content' },] }
];
/** @nocollapse */
ActiveOompaLoompa.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: TabsWillyWonka, decorators: [{ type: Optional }] },
    { type: Number, decorators: [{ type: Inject, args: [IF_ACTIVE_ID,] }] },
    { type: IfActiveService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// TODO: if we find more components that could use this, consider moving this to utils
class AriaService {
}
AriaService.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/** @enum {string} */
const TabsLayout = {
    HORIZONTAL: 'horizontal',
    VERTICAL: 'vertical',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TabsService {
    constructor() {
        this._children = [];
        this.layout = TabsLayout.HORIZONTAL;
    }
    /**
     * @param {?} tab
     * @return {?}
     */
    register(tab) {
        this._children.push(tab);
    }
    /**
     * @return {?}
     */
    get children() {
        return this._children;
    }
    /**
     * @return {?}
     */
    get activeTab() {
        return this.children.find((/**
         * @param {?} tab
         * @return {?}
         */
        (tab) => {
            return tab.active;
        }));
    }
    /**
     * @return {?}
     */
    get overflowTabs() {
        if (this.layout === TabsLayout.VERTICAL) {
            return [];
        }
        else {
            return this.children.filter((/**
             * @param {?} tab
             * @return {?}
             */
            (tab) => tab.tabLink.inOverflow === true));
        }
    }
    /**
     * @param {?} tab
     * @return {?}
     */
    unregister(tab) {
        /** @type {?} */
        const index = this.children.indexOf(tab);
        if (index > -1) {
            this.children.splice(index, 1);
        }
    }
}
TabsService.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
let nbTabContentComponents = 0;
class ClrTabContent {
    /**
     * @param {?} ifActiveService
     * @param {?} id
     * @param {?} ariaService
     * @param {?} tabsService
     */
    constructor(ifActiveService, id, ariaService, tabsService) {
        this.ifActiveService = ifActiveService;
        this.id = id;
        this.ariaService = ariaService;
        this.tabsService = tabsService;
        if (!this.tabContentId) {
            this.tabContentId = 'clr-tab-content-' + nbTabContentComponents++;
        }
    }
    // The template must be applied on the top-down phase of view-child initialization to prevent
    // components in the content from initializing before a content container exists.
    // Some child components need their container for sizing calculations.
    /* tslint:disable:no-unused-variable */
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    set templateRef(value) {
        this.viewRef = this.tabsService.tabContentViewContainer.createEmbeddedView(value);
    }
    /* tslint:enable:no-unused-variable */
    /**
     * @return {?}
     */
    get ariaLabelledBy() {
        return this.ariaService.ariaLabelledBy;
    }
    /**
     * @return {?}
     */
    get tabContentId() {
        return this.ariaService.ariaControls;
    }
    /**
     * @param {?} id
     * @return {?}
     */
    set tabContentId(id) {
        this.ariaService.ariaControls = id;
    }
    /**
     * @return {?}
     */
    get active() {
        return this.ifActiveService.current === this.id;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        /** @type {?} */
        const index = this.tabsService.tabContentViewContainer.indexOf(this.viewRef);
        if (index > -1) {
            this.tabsService.tabContentViewContainer.remove(index);
        }
    }
}
ClrTabContent.decorators = [
    { type: Component, args: [{
                selector: 'clr-tab-content',
                template: `
    <ng-template #tabContentProjectedRef>
      <section [id]="tabContentId" role="tabpanel" class="tab-content" [class.active]="active"
               [hidden]="!active"
               [attr.aria-labelledby]="ariaLabelledBy"
               [attr.aria-expanded]="active"
               [attr.aria-hidden]="!active">
        <ng-content></ng-content>
      </section>
    </ng-template>
    `
            }] }
];
/** @nocollapse */
ClrTabContent.ctorParameters = () => [
    { type: IfActiveService },
    { type: Number, decorators: [{ type: Inject, args: [IF_ACTIVE_ID,] }] },
    { type: AriaService },
    { type: TabsService }
];
ClrTabContent.propDecorators = {
    templateRef: [{ type: ViewChild, args: ['tabContentProjectedRef',] }],
    tabContentId: [{ type: Input, args: ['id',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
let nbTabsComponent = 0;
/** @type {?} */
const TABS_ID = new InjectionToken('TABS_ID');
/**
 * @return {?}
 */
function tokenFactory$1() {
    return 'clr-tabs-' + nbTabsComponent++;
}
/** @type {?} */
const TABS_ID_PROVIDER = {
    provide: TABS_ID,
    useFactory: tokenFactory$1,
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
let nbTabLinkComponents = 0;
class ClrTabLink {
    /**
     * @param {?} ifActiveService
     * @param {?} id
     * @param {?} ariaService
     * @param {?} el
     * @param {?} cfr
     * @param {?} viewContainerRef
     * @param {?} tabsService
     * @param {?} tabsId
     */
    constructor(ifActiveService, id, ariaService, el, cfr, viewContainerRef, tabsService, tabsId) {
        this.ifActiveService = ifActiveService;
        this.id = id;
        this.ariaService = ariaService;
        this.el = el;
        this.cfr = cfr;
        this.viewContainerRef = viewContainerRef;
        this.tabsService = tabsService;
        this.tabsId = tabsId;
        if (!this.tabLinkId) {
            this.tabLinkId = 'clr-tab-link-' + nbTabLinkComponents++;
        }
        // Tab links can be rendered in one of two places: in the main area or inside the overflow dropdown menu.
        // Here, we create a container so that its template can be used to create embeddedView on the fly.
        // See TabsService's renderView() method and how it's used in Tabs class for an example.
        /** @type {?} */
        const factory = this.cfr.resolveComponentFactory(TemplateRefContainer);
        this.templateRefContainer = this.viewContainerRef.createComponent(factory, 1, undefined, [
            [this.el.nativeElement],
        ]).instance;
    }
    /**
     * @param {?} inOverflow
     * @return {?}
     */
    set inOverflow(inOverflow) {
        this._inOverflow = inOverflow;
    }
    /**
     * @return {?}
     */
    get inOverflow() {
        return this._inOverflow && this.tabsService.layout !== TabsLayout.VERTICAL;
    }
    /**
     * @return {?}
     */
    get addLinkClasses() {
        return !this.inOverflow;
    }
    /**
     * @return {?}
     */
    get ariaControls() {
        return this.ariaService.ariaControls;
    }
    /**
     * @return {?}
     */
    get tabLinkId() {
        return this.ariaService.ariaLabelledBy;
    }
    /**
     * @param {?} id
     * @return {?}
     */
    set tabLinkId(id) {
        this.ariaService.ariaLabelledBy = id;
    }
    /**
     * @return {?}
     */
    activate() {
        this.ifActiveService.current = this.id;
    }
    /**
     * @return {?}
     */
    get active() {
        return this.ifActiveService.current === this.id;
    }
}
ClrTabLink.decorators = [
    { type: Directive, args: [{
                selector: '[clrTabLink]',
                host: {
                    '[attr.aria-hidden]': 'false',
                    '[class.btn]': 'true',
                    role: 'tab',
                    type: 'button',
                },
            },] }
];
/** @nocollapse */
ClrTabLink.ctorParameters = () => [
    { type: IfActiveService },
    { type: Number, decorators: [{ type: Inject, args: [IF_ACTIVE_ID,] }] },
    { type: AriaService },
    { type: ElementRef },
    { type: ComponentFactoryResolver },
    { type: ViewContainerRef },
    { type: TabsService },
    { type: Number, decorators: [{ type: Inject, args: [TABS_ID,] }] }
];
ClrTabLink.propDecorators = {
    inOverflow: [{ type: Input, args: ['clrTabLinkInOverflow',] }],
    addLinkClasses: [{ type: HostBinding, args: ['class.btn-link',] }, { type: HostBinding, args: ['class.nav-link',] }],
    ariaControls: [{ type: HostBinding, args: ['attr.aria-controls',] }],
    tabLinkId: [{ type: HostBinding, args: ['id',] }, { type: Input, args: ['id',] }],
    activate: [{ type: HostListener, args: ['click',] }],
    active: [{ type: HostBinding, args: ['class.active',] }, { type: HostBinding, args: ['attr.aria-selected',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrTab {
    /**
     * @param {?} ifActiveService
     * @param {?} id
     * @param {?} tabsService
     */
    constructor(ifActiveService, id, tabsService) {
        this.ifActiveService = ifActiveService;
        this.id = id;
        this.tabsService = tabsService;
        tabsService.register(this);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.tabsService.unregister(this);
    }
    /**
     * @return {?}
     */
    get active() {
        return this.ifActiveService.current === this.id;
    }
}
ClrTab.decorators = [
    { type: Component, args: [{
                selector: 'clr-tab',
                template: `
        <ng-content></ng-content>
    `,
                providers: [IF_ACTIVE_ID_PROVIDER, AriaService]
            }] }
];
/** @nocollapse */
ClrTab.ctorParameters = () => [
    { type: IfActiveService },
    { type: Number, decorators: [{ type: Inject, args: [IF_ACTIVE_ID,] }] },
    { type: TabsService }
];
ClrTab.propDecorators = {
    tabLink: [{ type: ContentChild, args: [ClrTabLink,] }],
    tabContent: [{ type: ContentChild, args: [ClrTabContent,] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrTabOverflowContent extends AbstractPopover {
    /**
     * @param {?} injector
     * @param {?} parentHost
     */
    constructor(injector, parentHost) {
        super(injector, parentHost);
        this.anchorPoint = Point.BOTTOM_RIGHT;
        this.popoverPoint = Point.RIGHT_TOP;
        this.closeOnOutsideClick = true;
    }
}
ClrTabOverflowContent.decorators = [
    { type: Component, args: [{
                selector: 'clr-tab-overflow-content',
                template: `
        <ng-content></ng-content>
    `,
                host: {
                    '[class.dropdown-menu]': 'true',
                }
            }] }
];
/** @nocollapse */
ClrTabOverflowContent.ctorParameters = () => [
    { type: Injector },
    { type: ElementRef, decorators: [{ type: SkipSelf }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrTabs {
    /**
     * @param {?} ifActiveService
     * @param {?} ifOpenService
     * @param {?} tabsService
     * @param {?} tabsId
     * @param {?} commonStrings
     */
    constructor(ifActiveService, ifOpenService, tabsService, tabsId, commonStrings) {
        this.ifActiveService = ifActiveService;
        this.ifOpenService = ifOpenService;
        this.tabsService = tabsService;
        this.tabsId = tabsId;
        this.commonStrings = commonStrings;
        this.subscriptions = [];
        this._tabLinkDirectives = [];
    }
    /* tslint:disable:no-unused-variable */
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    set tabContentViewContainer(value) {
        this.tabsService.tabContentViewContainer = value;
    }
    /* tslint:enable:no-unused-variable */
    /**
     * @param {?} layout
     * @return {?}
     */
    set layout(layout) {
        if (Object.keys(TabsLayout)
            .map((/**
         * @param {?} key
         * @return {?}
         */
        key => {
            return TabsLayout[key];
        }))
            .indexOf(layout) >= 0) {
            this.tabsService.layout = layout;
        }
    }
    /**
     * @return {?}
     */
    get layout() {
        return this.tabsService.layout;
    }
    /**
     * @return {?}
     */
    get tabLinkDirectives() {
        return this._tabLinkDirectives;
    }
    /**
     * @return {?}
     */
    get activeTabInOverflow() {
        return this.tabsService.overflowTabs.indexOf(this.tabsService.activeTab) > -1;
    }
    /**
     * @return {?}
     */
    get tabIds() {
        return this.tabsService.children.map((/**
         * @param {?} tab
         * @return {?}
         */
        tab => tab.tabLink.tabLinkId)).join(' ');
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this._tabLinkDirectives = this.tabs.map((/**
         * @param {?} tab
         * @return {?}
         */
        tab => tab.tabLink));
        this.subscriptions.push(this.tabs.changes.subscribe((/**
         * @return {?}
         */
        () => {
            this._tabLinkDirectives = this.tabs.map((/**
             * @param {?} tab
             * @return {?}
             */
            tab => tab.tabLink));
        })));
        if (typeof this.ifActiveService.current === 'undefined' && this.tabLinkDirectives[0]) {
            this.tabLinkDirectives[0].activate();
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    toggleOverflow(event) {
        this.ifOpenService.toggleWithEvent(event);
    }
    /**
     * @return {?}
     */
    get isVertical() {
        return this.layout === TabsLayout.VERTICAL;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        sub => {
            sub.unsubscribe();
        }));
    }
}
ClrTabs.decorators = [
    { type: Component, args: [{
                selector: 'clr-tabs',
                template: `
        <ul class="nav" role="tablist" [attr.aria-owns]="tabIds">
            <!--tab links-->
            <ng-container *ngFor="let link of tabLinkDirectives">
                <ng-container *ngIf="link.tabsId === tabsId && !link.inOverflow">
                    <li role="presentation" class="nav-item">
                        <ng-container [ngTemplateOutlet]="link.templateRefContainer.template"></ng-container>
                    </li>
                </ng-container>
            </ng-container>
            <ng-container *ngIf="tabsService.overflowTabs.length > 0">
                <div class="tabs-overflow bottom-right" [class.open]="ifOpenService.open"
                     (click)="toggleOverflow($event)">
                    <li role="presentation" class="nav-item">
                        <button class="btn btn-link nav-link dropdown-toggle" type="button" [class.active]="activeTabInOverflow">
                            <clr-icon shape="ellipsis-horizontal"
                              [class.is-info]="ifOpenService.open"
                              [attr.title]="commonStrings.more"></clr-icon>
                        </button>
                    </li>
                    <!--tab links in overflow menu-->
                    <clr-tab-overflow-content>
                        <ng-container *ngFor="let link of tabLinkDirectives">
                            <ng-container *ngIf="link.tabsId === tabsId && link.inOverflow"
                                          [ngTemplateOutlet]="link.templateRefContainer.template">
                            </ng-container>
                        </ng-container>
                    </clr-tab-overflow-content>
                </div>
            </ng-container>
        </ul>
        <ng-container #tabContentViewContainer></ng-container>
    `,
                providers: [IfActiveService, IfOpenService, TabsService, TABS_ID_PROVIDER]
            }] }
];
/** @nocollapse */
ClrTabs.ctorParameters = () => [
    { type: IfActiveService },
    { type: IfOpenService },
    { type: TabsService },
    { type: Number, decorators: [{ type: Inject, args: [TABS_ID,] }] },
    { type: ClrCommonStrings }
];
ClrTabs.propDecorators = {
    tabContentViewContainer: [{ type: ViewChild, args: ['tabContentViewContainer', { read: ViewContainerRef },] }],
    layout: [{ type: Input, args: ['clrLayout',] }],
    tabs: [{ type: ContentChildren, args: [ClrTab,] }],
    isVertical: [{ type: HostBinding, args: ['class.tabs-vertical',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const CLR_TABS_DIRECTIVES = [
    ClrTabContent,
    ClrTab,
    ClrTabs,
    ClrTabOverflowContent,
    ClrTabLink,
    TabsWillyWonka,
    ActiveOompaLoompa,
];
class ClrTabsModule {
}
ClrTabsModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, ClrCommonPopoverModule, ClrConditionalModule, ClrIconModule, ClrTemplateRefModule],
                declarations: [CLR_TABS_DIRECTIVES],
                exports: [CLR_TABS_DIRECTIVES, ClrConditionalModule],
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class VerticalNavGroupRegistrationService {
    constructor() {
        this.navGroupCount = 0;
    }
    /**
     * @return {?}
     */
    registerNavGroup() {
        this.navGroupCount++;
    }
    /**
     * @return {?}
     */
    unregisterNavGroup() {
        this.navGroupCount--;
    }
}
VerticalNavGroupRegistrationService.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class VerticalNavIconService {
    constructor() {
        this._icons = 0;
    }
    /**
     * @return {?}
     */
    get hasIcons() {
        return this._icons > 0;
    }
    /**
     * @return {?}
     */
    registerIcon() {
        this._icons++;
    }
    /**
     * @return {?}
     */
    unregisterIcon() {
        this._icons--;
    }
}
VerticalNavIconService.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class VerticalNavService {
    constructor() {
        this._animateOnCollapsed = new Subject();
        this._collapsedChanged = new Subject();
        this._collapsed = false;
        this._collapsible = false;
    }
    /**
     * @return {?}
     */
    get animateOnCollapsed() {
        return this._animateOnCollapsed.asObservable();
    }
    /**
     * @return {?}
     */
    get collapsedChanged() {
        return this._collapsedChanged.asObservable();
    }
    /**
     * @return {?}
     */
    get collapsed() {
        return this._collapsed;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set collapsed(value) {
        value = !!value;
        if (this.collapsible && this._collapsed !== value) {
            this.updateCollapseBehavior(value);
        }
    }
    /**
     * @return {?}
     */
    get collapsible() {
        return this._collapsible;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set collapsible(value) {
        value = !!value;
        if (this._collapsible !== value) {
            if (!value && this.collapsed) {
                this.updateCollapseBehavior(false);
            }
            this._collapsible = value;
        }
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    updateCollapseBehavior(value) {
        this._animateOnCollapsed.next(value);
        this._collapsed = value;
        this._collapsedChanged.next(value);
    }
}
VerticalNavService.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrVerticalNav {
    /**
     * @param {?} _navService
     * @param {?} _navIconService
     * @param {?} _navGroupRegistrationService
     * @param {?} commonStrings
     */
    constructor(_navService, _navIconService, _navGroupRegistrationService, commonStrings) {
        this._navService = _navService;
        this._navIconService = _navIconService;
        this._navGroupRegistrationService = _navGroupRegistrationService;
        this.commonStrings = commonStrings;
        this._collapsedChanged = new EventEmitter(true);
        this._sub = this._navService.collapsedChanged.subscribe((/**
         * @param {?} value
         * @return {?}
         */
        value => {
            this._collapsedChanged.emit(value);
        }));
    }
    /**
     * @return {?}
     */
    get collapsible() {
        return this._navService.collapsible;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set collapsible(value) {
        this._navService.collapsible = value;
    }
    /**
     * @return {?}
     */
    get collapsed() {
        return this._navService.collapsed;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set collapsed(value) {
        this._navService.collapsed = value;
    }
    /**
     * @return {?}
     */
    get hasNavGroups() {
        return this._navGroupRegistrationService.navGroupCount > 0;
    }
    /**
     * @return {?}
     */
    get hasIcons() {
        return this._navIconService.hasIcons;
    }
    /**
     * @return {?}
     */
    toggleByButton() {
        this.collapsed = !this.collapsed;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._sub.unsubscribe();
    }
}
ClrVerticalNav.decorators = [
    { type: Component, args: [{
                selector: 'clr-vertical-nav',
                template: "<!--\n  ~ Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.\n  ~ This software is released under MIT license.\n  ~ The full license information can be found in LICENSE in the root directory of this project.\n  -->\n\n<button type=\"button\" class=\"nav-trigger\"\n        [class.on-collapse]=\"collapsed\"\n        (click)=\"toggleByButton()\"\n        *ngIf=\"collapsible\">\n    <clr-icon shape=\"angle-double\"\n              class=\"nav-trigger-icon\"\n              [attr.dir]=\"(this.collapsed) ? 'right' : 'left'\"\n              [attr.title]=\"(this.collapsed) ? commonStrings.expand : commonStrings.collapse\"></clr-icon>\n</button>\n<!-- Click handler on .nav-content is bad but required :-( -->\n<div class=\"nav-content\">\n    <ng-content></ng-content>\n    <button (click)=\"collapsed = false\" class=\"nav-btn\" *ngIf=\"collapsible && collapsed\"></button>\n</div>\n",
                providers: [VerticalNavService, VerticalNavIconService, VerticalNavGroupRegistrationService],
                host: {
                    class: 'clr-vertical-nav',
                    '[class.is-collapsed]': 'collapsed',
                    '[class.has-nav-groups]': 'hasNavGroups',
                    '[class.has-icons]': 'hasIcons',
                }
            }] }
];
/** @nocollapse */
ClrVerticalNav.ctorParameters = () => [
    { type: VerticalNavService },
    { type: VerticalNavIconService },
    { type: VerticalNavGroupRegistrationService },
    { type: ClrCommonStrings }
];
ClrVerticalNav.propDecorators = {
    collapsible: [{ type: Input, args: ['clrVerticalNavCollapsible',] }],
    collapsed: [{ type: Input, args: ['clrVerticalNavCollapsed',] }],
    _collapsedChanged: [{ type: Output, args: ['clrVerticalNavCollapsedChange',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class VerticalNavGroupService {
    constructor() {
        this._expandChange = new Subject();
    }
    /**
     * @return {?}
     */
    get expandChange() {
        return this._expandChange.asObservable();
    }
    /**
     * @return {?}
     */
    expand() {
        this._expandChange.next(true);
    }
}
VerticalNavGroupService.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const EXPANDED_STATE = 'expanded';
/** @type {?} */
const COLLAPSED_STATE = 'collapsed';
class ClrVerticalNavGroup {
    /**
     * @param {?} _itemExpand
     * @param {?} _navGroupRegistrationService
     * @param {?} _navGroupService
     * @param {?} _navService
     * @param {?} commonStrings
     */
    constructor(_itemExpand, _navGroupRegistrationService, _navGroupService, _navService, commonStrings) {
        this._itemExpand = _itemExpand;
        this._navGroupRegistrationService = _navGroupRegistrationService;
        this._navGroupService = _navGroupService;
        this._navService = _navService;
        this.commonStrings = commonStrings;
        this.wasExpanded = false;
        this.expandedChange = new EventEmitter(true);
        this._subscriptions = [];
        this._expandAnimationState = COLLAPSED_STATE;
        this._navGroupRegistrationService.registerNavGroup();
        // FIXME: This subscription handles a corner case
        // Vertical Nav collapse requires the animation to run first and then
        // remove the nodes from the DOM. If the user directly sets the input
        // on the clrIfExpanded directive, we have no chance to run the animation
        // and wait for it to complete. This subscription makes sure that the
        // animation states are correct for that edge case.
        this._subscriptions.push(this._itemExpand.expandChange.subscribe((/**
         * @param {?} value
         * @return {?}
         */
        value => {
            if (value && this.expandAnimationState === COLLAPSED_STATE) {
                if (this._navService.collapsed) {
                    this._navService.collapsed = false;
                }
                this.expandAnimationState = EXPANDED_STATE;
            }
            else if (!value && this.expandAnimationState === EXPANDED_STATE) {
                this.expandAnimationState = COLLAPSED_STATE;
            }
        })));
        // 1. If the nav is collapsing, close the open nav group + save its state
        // 2. If the nav is expanding, expand the nav group if the previous state was expanded
        this._subscriptions.push(this._navService.animateOnCollapsed.subscribe((/**
         * @param {?} goingToCollapse
         * @return {?}
         */
        (goingToCollapse) => {
            if (goingToCollapse && this.expanded) {
                this.wasExpanded = true;
                this.expandAnimationState = COLLAPSED_STATE;
            }
            else if (!goingToCollapse && this.wasExpanded) {
                this.expandGroup();
                this.wasExpanded = false;
            }
        })));
        // If a link is clicked, expand the nav group
        this._subscriptions.push(this._navGroupService.expandChange.subscribe((/**
         * @param {?} expand
         * @return {?}
         */
        (expand) => {
            if (expand && !this.expanded) {
                this.expandGroup();
            }
        })));
    }
    /**
     * @return {?}
     */
    get expanded() {
        return this._itemExpand.expanded;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set expanded(value) {
        if (this._itemExpand.expanded !== value) {
            this._itemExpand.expanded = value;
            this.expandedChange.emit(value);
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set userExpandedInput(value) {
        value = !!value;
        if (this.expanded !== value) {
            // We have to call toggleExpand because some cases require animations to occur first
            // Directly setting the Expand service value skips the animation and can result in
            // nodes in the DOM but the nav group still being collapsed
            this.toggleExpand();
        }
    }
    /**
     * @return {?}
     */
    expandGroup() {
        this.expanded = true;
        // Expanded animation occurs after Expand.expand is set to true
        this.expandAnimationState = EXPANDED_STATE;
    }
    /**
     * @return {?}
     */
    collapseGroup() {
        // If a Vertical Nav Group toggle button is clicked while the Vertical Nav is in Collapsed state,
        // the Vertical Nav should be expanded first.
        this.expandAnimationState = COLLAPSED_STATE;
    }
    // closes a group after the collapse animation
    /**
     * @param {?} $event
     * @return {?}
     */
    expandAnimationDone($event) {
        if ($event.toState === COLLAPSED_STATE) {
            this.expanded = false;
        }
    }
    /**
     * @return {?}
     */
    get expandAnimationState() {
        return this._expandAnimationState;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set expandAnimationState(value) {
        if (value !== this._expandAnimationState) {
            this._expandAnimationState = value;
        }
    }
    /**
     * @return {?}
     */
    toggleExpand() {
        if (this.expanded) {
            this.collapseGroup();
        }
        else {
            // If nav is collasped, first open the nav
            if (this._navService.collapsed) {
                this._navService.collapsed = false;
            }
            // then expand the nav group
            this.expandGroup();
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        // This makes sure that if someone marks a nav group expanded in a collapsed nav
        // the expanded property is switched back to collapsed state.
        if (this._navService.collapsed && this.expanded) {
            this.wasExpanded = true;
            this.expandAnimationState = COLLAPSED_STATE;
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        (sub) => sub.unsubscribe()));
        this._navGroupRegistrationService.unregisterNavGroup();
    }
}
ClrVerticalNavGroup.decorators = [
    { type: Component, args: [{
                selector: 'clr-vertical-nav-group',
                template: "<!--\n  ~ Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.\n  ~ This software is released under MIT license.\n  ~ The full license information can be found in LICENSE in the root directory of this project.\n  -->\n\n<div class=\"nav-group-content\">\n    <ng-content select=\"[clrVerticalNavLink]\"></ng-content>\n    <button\n        class=\"nav-group-trigger\"\n        type=\"button\"\n        (click)=\"toggleExpand()\">\n        <ng-content select=\"[clrVerticalNavIcon]\"></ng-content>\n        <div class=\"nav-group-text\">\n            <ng-content></ng-content>\n        </div>\n        <clr-icon shape=\"caret\"\n                  class=\"nav-group-trigger-icon\"\n                  [attr.dir]=\"(this.expanded) ? 'down' : 'right'\"\n                  [attr.title]=\"(this.expanded) ? commonStrings.collapse : commonStrings.expand\">\n        </clr-icon>\n    </button>\n</div>\n<!--TODO: This animation needs to be added to the clr-vertical-nav-group-children component-->\n<div class=\"nav-group-children\"\n     [@clrExpand]=\"expandAnimationState\"\n     (@clrExpand.done)=\"expandAnimationDone($event)\">\n    <ng-content select=\"[clrIfExpanded], clr-vertical-nav-group-children\"></ng-content>\n</div>\n",
                providers: [IfExpandService, VerticalNavGroupService],
                animations: [
                    trigger('clrExpand', [
                        state(EXPANDED_STATE, style({ height: '*' })),
                        state(COLLAPSED_STATE, style({ height: 0, 'overflow-y': 'hidden', visibility: 'hidden' })),
                        transition(`${EXPANDED_STATE} <=> ${COLLAPSED_STATE}`, animate('0.2s ease-in-out')),
                    ]),
                ],
                host: { class: 'nav-group' }
            }] }
];
/** @nocollapse */
ClrVerticalNavGroup.ctorParameters = () => [
    { type: IfExpandService },
    { type: VerticalNavGroupRegistrationService },
    { type: VerticalNavGroupService },
    { type: VerticalNavService },
    { type: ClrCommonStrings }
];
ClrVerticalNavGroup.propDecorators = {
    expanded: [{ type: HostBinding, args: ['class.is-expanded',] }],
    userExpandedInput: [{ type: Input, args: ['clrVerticalNavGroupExpanded',] }],
    expandedChange: [{ type: Output, args: ['clrVerticalNavGroupExpandedChange',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrVerticalNavGroupChildren {
}
ClrVerticalNavGroupChildren.decorators = [
    { type: Component, args: [{
                selector: 'clr-vertical-nav-group-children',
                template: `
        <ng-content></ng-content>
    `
            }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrVerticalNavIcon {
    /**
     * @param {?} _verticalNavIconService
     */
    constructor(_verticalNavIconService) {
        this._verticalNavIconService = _verticalNavIconService;
        this._verticalNavIconService.registerIcon();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._verticalNavIconService.unregisterIcon();
    }
}
ClrVerticalNavIcon.decorators = [
    { type: Directive, args: [{ selector: '[clrVerticalNavIcon]', host: { class: 'nav-icon' } },] }
];
/** @nocollapse */
ClrVerticalNavIcon.ctorParameters = () => [
    { type: VerticalNavIconService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrVerticalNavLink {
    /**
     * @param {?} _navGroupService
     */
    constructor(_navGroupService) {
        this._navGroupService = _navGroupService;
    }
    /**
     * @return {?}
     */
    expandParentNavGroup() {
        if (this._navGroupService) {
            this._navGroupService.expand();
        }
    }
}
ClrVerticalNavLink.decorators = [
    { type: Component, args: [{
                selector: '[clrVerticalNavLink]',
                template: `
        <ng-content select="[clrVerticalNavIcon]"></ng-content>
        <span class="nav-text">
            <ng-content></ng-content>    
        </span>
    `,
                host: { class: 'nav-link' }
            }] }
];
/** @nocollapse */
ClrVerticalNavLink.ctorParameters = () => [
    { type: VerticalNavGroupService, decorators: [{ type: Optional }] }
];
ClrVerticalNavLink.propDecorators = {
    expandParentNavGroup: [{ type: HostListener, args: ['click',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const CLR_VERTICAL_NAV_DIRECTIVES = [
    ClrVerticalNav,
    ClrVerticalNavLink,
    ClrVerticalNavGroup,
    ClrVerticalNavGroupChildren,
    ClrVerticalNavIcon,
];
class ClrVerticalNavModule {
}
ClrVerticalNavModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, ClrIconModule, ClrConditionalModule],
                declarations: [CLR_VERTICAL_NAV_DIRECTIVES],
                exports: [CLR_VERTICAL_NAV_DIRECTIVES, ClrConditionalModule, ClrIconModule],
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrLayoutModule {
}
ClrLayoutModule.decorators = [
    { type: NgModule, args: [{ exports: [ClrMainContainerModule, ClrNavigationModule, ClrTabsModule, ClrVerticalNavModule] },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ScrollingService {
    /**
     * @param {?} _document
     */
    constructor(_document) {
        this._document = _document;
    }
    /**
     * @return {?}
     */
    stopScrolling() {
        this._document.body.classList.add('no-scrolling');
    }
    /**
     * @return {?}
     */
    resumeScrolling() {
        if (this._document.body.classList.contains('no-scrolling')) {
            this._document.body.classList.remove('no-scrolling');
        }
    }
}
ScrollingService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ScrollingService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrModal {
    /**
     * @param {?} _scrollingService
     * @param {?} commonStrings
     * @param {?} modalId
     */
    constructor(_scrollingService, commonStrings, modalId) {
        this._scrollingService = _scrollingService;
        this.commonStrings = commonStrings;
        this.modalId = modalId;
        this._open = false;
        this._openChanged = new EventEmitter(false);
        this.closable = true;
        this.staticBackdrop = true;
        this.skipAnimation = 'false';
        // presently this is only used by wizards
        this.bypassScrollService = false;
        this.stopClose = false;
        this.altClose = new EventEmitter(false);
    }
    /**
     * @return {?}
     */
    get sizeClass() {
        if (this.size) {
            return 'modal-' + this.size;
        }
        else {
            return '';
        }
    }
    // Detect when _open is set to true and set no-scrolling to true
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (!this.bypassScrollService && changes && changes.hasOwnProperty('_open')) {
            if (changes._open.currentValue) {
                this._scrollingService.stopScrolling();
            }
            else {
                this._scrollingService.resumeScrolling();
            }
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._scrollingService.resumeScrolling();
    }
    /**
     * @return {?}
     */
    open() {
        if (this._open) {
            return;
        }
        this._open = true;
        this._openChanged.emit(true);
    }
    /**
     * @return {?}
     */
    close() {
        if (this.stopClose) {
            this.altClose.emit(false);
            return;
        }
        if (!this.closable || !this._open) {
            return;
        }
        this._open = false;
        // todo: remove this after animation bug is fixed https://github.com/angular/angular/issues/15798
        // this was handled by the fadeDone event below, but that AnimationEvent is not firing in Angular 4.0.
        this._openChanged.emit(false);
        // SPECME
        this.focusTrap.setPreviousFocus(); // Handles moving focus back to the element that had it before.
    }
    /**
     * @param {?} e
     * @return {?}
     */
    fadeDone(e) {
        if (e.toState === 'void') {
            this._openChanged.emit(false);
        }
    }
}
ClrModal.decorators = [
    { type: Component, args: [{
                selector: 'clr-modal',
                viewProviders: [ScrollingService],
                template: "\n<!--\n  ~ Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.\n  ~ This software is released under MIT license.\n  ~ The full license information can be found in LICENSE in the root directory of this project.\n  -->\n\n<div clrFocusTrap class=\"modal\" *ngIf=\"_open\">\n    <!--fixme: revisit when ngClass works with exit animation-->\n    <div [@fadeDown]=\"skipAnimation\" (@fadeDown.done)=\"fadeDone($event)\"\n         class=\"modal-dialog\"\n         [class.modal-sm]=\"size == 'sm'\"\n         [class.modal-lg]=\"size == 'lg'\"\n         [class.modal-xl]=\"size == 'xl'\"\n         role=\"dialog\"\n         [attr.aria-hidden]=\"!_open\"\n         [attr.aria-labelledby]=\"modalId\">\n\n      <div class=\"modal-content-wrapper\">\n        <!-- only used in wizards -->\n        <ng-content select=\".modal-nav\"></ng-content>\n\n        <div class=\"modal-content\">\n          <div class=\"modal-header\">\n            <button type=\"button\" class=\"close\" *ngIf=\"closable\" (click)=\"close()\">\n              <clr-icon shape=\"close\" [attr.title]=\"commonStrings.close\"></clr-icon>\n            </button>\n            <div class=\"modal-title-wrapper\" id=\"{{modalId}}\">\n              <ng-content select=\".modal-title\"></ng-content>\n            </div>\n          </div>\n          <ng-content select=\".modal-body\"></ng-content>\n          <ng-content select=\".modal-footer\"></ng-content>\n        </div>\n      </div>\n    </div>\n\n    <div [@fade] class=\"modal-backdrop\"\n         aria-hidden=\"true\"\n         (click)=\"staticBackdrop || close()\"></div>\n</div>\n\n",
                animations: [
                    trigger('fadeDown', [
                        transition('* => false', [style({ opacity: 0, transform: 'translate(0, -25%)' }), animate('0.2s ease-in-out')]),
                        transition('false => *', [animate('0.2s ease-in-out', style({ opacity: 0, transform: 'translate(0, -25%)' }))]),
                    ]),
                    trigger('fade', [
                        transition('void => *', [style({ opacity: 0 }), animate('0.2s ease-in-out', style({ opacity: 0.85 }))]),
                        transition('* => void', [animate('0.2s ease-in-out', style({ opacity: 0 }))]),
                    ]),
                ],
                providers: [UNIQUE_ID_PROVIDER],
                styles: [`
        :host { display: none; }
        :host.open { display: inline; }
    `]
            }] }
];
/** @nocollapse */
ClrModal.ctorParameters = () => [
    { type: ScrollingService },
    { type: ClrCommonStrings },
    { type: String, decorators: [{ type: Inject, args: [UNIQUE_ID,] }] }
];
ClrModal.propDecorators = {
    focusTrap: [{ type: ViewChild, args: [FocusTrapDirective,] }],
    _open: [{ type: HostBinding, args: ['class.open',] }, { type: Input, args: ['clrModalOpen',] }],
    _openChanged: [{ type: Output, args: ['clrModalOpenChange',] }],
    closable: [{ type: Input, args: ['clrModalClosable',] }],
    size: [{ type: Input, args: ['clrModalSize',] }],
    staticBackdrop: [{ type: Input, args: ['clrModalStaticBackdrop',] }],
    skipAnimation: [{ type: Input, args: ['clrModalSkipAnimation',] }],
    bypassScrollService: [{ type: Input, args: ['clrModalOverrideScrollService',] }],
    stopClose: [{ type: Input, args: ['clrModalPreventClose',] }],
    altClose: [{ type: Output, args: ['clrModalAlternateClose',] }],
    close: [{ type: HostListener, args: ['body:keyup.escape',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const CLR_MODAL_DIRECTIVES = [ClrModal];
class ClrModalModule {
}
ClrModalModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, ClrIconModule, ClrFocusTrapModule],
                declarations: [CLR_MODAL_DIRECTIVES],
                exports: [CLR_MODAL_DIRECTIVES],
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const SIGNPOST_POSITIONS = {
    'top-left': { anchorPoint: Point.TOP_CENTER, popoverPoint: Point.BOTTOM_RIGHT, offsetY: -10, offsetX: 0 },
    'top-middle': { anchorPoint: Point.TOP_CENTER, popoverPoint: Point.BOTTOM_CENTER, offsetY: -10, offsetX: 0 },
    'top-right': { anchorPoint: Point.TOP_CENTER, popoverPoint: Point.BOTTOM_LEFT, offsetY: -10, offsetX: 0 },
    'right-top': { anchorPoint: Point.RIGHT_CENTER, popoverPoint: Point.LEFT_BOTTOM, offsetY: 2, offsetX: 14 },
    'right-middle': { anchorPoint: Point.RIGHT_CENTER, popoverPoint: Point.LEFT_CENTER, offsetY: 6, offsetX: 14 },
    'right-bottom': { anchorPoint: Point.RIGHT_CENTER, popoverPoint: Point.LEFT_TOP, offsetY: -1, offsetX: 14 },
    'bottom-right': { anchorPoint: Point.BOTTOM_CENTER, popoverPoint: Point.TOP_LEFT, offsetY: 9, offsetX: -1 },
    'bottom-middle': { anchorPoint: Point.BOTTOM_CENTER, popoverPoint: Point.TOP_CENTER, offsetY: 9, offsetX: 12 },
    'bottom-left': { anchorPoint: Point.BOTTOM_CENTER, popoverPoint: Point.TOP_RIGHT, offsetY: 9, offsetX: 0 },
    'left-bottom': { anchorPoint: Point.LEFT_CENTER, popoverPoint: Point.RIGHT_TOP, offsetY: 0, offsetX: -14 },
    'left-middle': { anchorPoint: Point.LEFT_CENTER, popoverPoint: Point.RIGHT_CENTER, offsetY: 4, offsetX: -14 },
    'left-top': { anchorPoint: Point.LEFT_CENTER, popoverPoint: Point.RIGHT_BOTTOM, offsetY: 0, offsetX: -14 },
    default: { anchorPoint: Point.RIGHT_CENTER, popoverPoint: Point.LEFT_CENTER, offsetY: 6, offsetX: 14 },
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// aka where the arrow / pointer is at in relation to the anchor
/** @type {?} */
const POSITIONS = [
    'top-left',
    'top-middle',
    'top-right',
    'right-top',
    'right-middle',
    'right-bottom',
    'bottom-right',
    'bottom-middle',
    'bottom-left',
    'left-bottom',
    'left-middle',
    'left-top',
];
class ClrSignpostContent extends AbstractPopover {
    /**
     * @param {?} injector
     * @param {?} parentHost
     * @param {?} commonStrings
     */
    constructor(injector, parentHost, commonStrings) {
        if (!parentHost) {
            throw new Error('clr-signpost-content should only be used inside of a clr-signpost');
        }
        super(injector, parentHost);
        this.commonStrings = commonStrings;
        // Defaults
        this.position = 'right-middle';
        this.closeOnOutsideClick = true;
    }
    /**
     * *******
     *
     * \@description
     * Close function that uses the signpost instance to toggle the state of the content popover.
     *
     * @return {?}
     */
    close() {
        this.ifOpenService.open = false;
    }
    /**
     * @return {?}
     */
    get position() {
        return this._position;
    }
    /**
     * ******
     *
     * \@description
     * A setter for the position of the ClrSignpostContent popover. This is a combination of the following:
     * - anchorPoint - where on the trigger to anchor the ClrSignpostContent
     * - popoverPoint - where on the ClrSignpostContent container to align with the anchorPoint
     * - offsetY - where on the Y axis to align the ClrSignpostContent so it meets specs
     * - offsetX - where on the X axis to align the ClrSignpostContent so it meets specs
     * There are 12 possible positions to place a ClrSignpostContent container:
     * - top-left
     * - top-middle
     * - top-right
     * - right-top
     * - right-middle
     * - right-bottom
     * - bottom-right
     * - bottom-middle
     * - bottom-left
     * - left-bottom
     * - left-middle
     * - left-top
     *
     * I think of it as follows for 'top-left' -> CONTAINER_SIDE-SIDE_POSITION. In this case CONTAINER_SIDE is 'top'
     * meaning the top of the trigger icon (above the icon that hides/shows) the ClrSignpostContent. And, SIDE_POSITION
     * is 'left' meaning two things: 1) the ClrSignpostContent container extends to the left and 2) the 'arrow/pointer'
     * linking the SingpostContent to the trigger points down at the horizontal center of the trigger icon.
     *
     * @param {?} position
     * @return {?}
     */
    set position(position) {
        // Ugh
        this.renderer.removeClass(this.el.nativeElement, this.position);
        if (position && POSITIONS.indexOf(position) > -1) {
            this._position = position;
        }
        else {
            this._position = 'right-middle';
        }
        // Ugh
        this.renderer.addClass(this.el.nativeElement, this.position);
        /** @type {?} */
        const setPosition = SIGNPOST_POSITIONS[this.position];
        this.anchorPoint = setPosition.anchorPoint;
        this.popoverPoint = setPosition.popoverPoint;
        this.popoverOptions.offsetY = setPosition.offsetY;
        this.popoverOptions.offsetX = setPosition.offsetX;
    }
}
ClrSignpostContent.decorators = [
    { type: Component, args: [{
                selector: 'clr-signpost-content',
                template: `
        <div class="signpost-flex-wrap">
            <div class="popover-pointer"></div>
            <div class="signpost-content-header">
                <button type="button" class="signpost-action close" (click)="close()">
                    <clr-icon shape="close" [attr.title]="commonStrings.close"></clr-icon>
                </button>
            </div>
            <div class="signpost-content-body">
                <ng-content></ng-content>
            </div>
        </div>
    `,
                host: { '[class.signpost-content]': 'true' }
            }] }
];
/** @nocollapse */
ClrSignpostContent.ctorParameters = () => [
    { type: Injector },
    { type: ElementRef, decorators: [{ type: Optional }, { type: Inject, args: [POPOVER_HOST_ANCHOR,] }] },
    { type: ClrCommonStrings }
];
ClrSignpostContent.propDecorators = {
    position: [{ type: Input, args: ['clrPosition',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const CLR_SIGNPOST_DIRECTIVES = [ClrSignpost, ClrSignpostContent, ClrSignpostTrigger];
class ClrSignpostModule {
}
ClrSignpostModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, ClrCommonPopoverModule, ClrIconModule],
                declarations: [CLR_SIGNPOST_DIRECTIVES],
                exports: [CLR_SIGNPOST_DIRECTIVES, ClrConditionalModule],
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrTooltip {
}
ClrTooltip.decorators = [
    { type: Component, args: [{
                selector: 'clr-tooltip',
                template: `
        <ng-content></ng-content>
    `,
                host: {
                    '[class.tooltip]': 'true',
                },
                providers: [IfOpenService, { provide: POPOVER_HOST_ANCHOR, useExisting: ElementRef }]
            }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const POSITIONS$1 = ['bottom-left', 'bottom-right', 'top-left', 'top-right', 'right', 'left'];
/** @type {?} */
const SIZES = ['xs', 'sm', 'md', 'lg'];
class ClrTooltipContent extends AbstractPopover {
    /**
     * @param {?} injector
     * @param {?} parentHost
     */
    constructor(injector, parentHost) {
        if (!parentHost) {
            throw new Error('clr-tooltip-content should only be used inside of a clr-tooltip');
        }
        super(injector, parentHost);
        // Defaults
        this.position = 'right';
        this.size = 'sm';
    }
    /**
     * @return {?}
     */
    get position() {
        return this._position;
    }
    /**
     * @param {?} position
     * @return {?}
     */
    set position(position) {
        // Ugh
        this.renderer.removeClass(this.el.nativeElement, 'tooltip-' + this.position);
        if (position && POSITIONS$1.indexOf(position) > -1) {
            this._position = position;
        }
        else {
            this._position = 'right';
        }
        // Ugh
        this.renderer.addClass(this.el.nativeElement, 'tooltip-' + this.position);
        // set the popover values based on direction
        switch (position) {
            case 'top-right':
                this.anchorPoint = Point.TOP_CENTER;
                this.popoverPoint = Point.LEFT_BOTTOM;
                break;
            case 'top-left':
                this.anchorPoint = Point.TOP_CENTER;
                this.popoverPoint = Point.RIGHT_BOTTOM;
                break;
            case 'bottom-right':
                this.anchorPoint = Point.BOTTOM_CENTER;
                this.popoverPoint = Point.LEFT_TOP;
                break;
            case 'bottom-left':
                this.anchorPoint = Point.BOTTOM_CENTER;
                this.popoverPoint = Point.RIGHT_TOP;
                break;
            case 'right':
                this.anchorPoint = Point.RIGHT_CENTER;
                this.popoverPoint = Point.LEFT_TOP;
                break;
            case 'left':
                this.anchorPoint = Point.LEFT_CENTER;
                this.popoverPoint = Point.RIGHT_TOP;
                break;
            default:
                this.anchorPoint = Point.RIGHT_CENTER;
                this.popoverPoint = Point.LEFT_TOP;
                break;
        }
    }
    /**
     * @return {?}
     */
    get size() {
        return this._size;
    }
    /**
     * @param {?} size
     * @return {?}
     */
    set size(size) {
        // Ugh
        this.renderer.removeClass(this.el.nativeElement, 'tooltip-' + this.size);
        if (size && SIZES.indexOf(size) > -1) {
            this._size = size;
        }
        else {
            this._size = 'sm';
        }
        // Ugh
        this.renderer.addClass(this.el.nativeElement, 'tooltip-' + this.size);
    }
}
ClrTooltipContent.decorators = [
    { type: Component, args: [{
                selector: 'clr-tooltip-content',
                template: `
        <ng-content></ng-content>
    `,
                host: {
                    '[class.tooltip-content]': 'true',
                    // I'm giving up on animation, they did not work before and will not work now.
                    // Too many conflicts with Clarity UI.
                    '[style.opacity]': '1',
                }
            }] }
];
/** @nocollapse */
ClrTooltipContent.ctorParameters = () => [
    { type: Injector },
    { type: ElementRef, decorators: [{ type: Optional }, { type: Inject, args: [POPOVER_HOST_ANCHOR,] }] }
];
ClrTooltipContent.propDecorators = {
    position: [{ type: Input, args: ['clrPosition',] }],
    size: [{ type: Input, args: ['clrSize',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrTooltipTrigger {
    /**
     * @param {?} ifOpenService
     */
    constructor(ifOpenService) {
        this.ifOpenService = ifOpenService;
    }
    /**
     * @return {?}
     */
    showTooltip() {
        this.ifOpenService.open = true;
    }
    /**
     * @return {?}
     */
    hideTooltip() {
        this.ifOpenService.open = false;
    }
}
ClrTooltipTrigger.decorators = [
    { type: Directive, args: [{ selector: '[clrTooltipTrigger]', host: { '[attr.tabindex]': '0', '[class.tooltip-trigger]': 'true' } },] }
];
/** @nocollapse */
ClrTooltipTrigger.ctorParameters = () => [
    { type: IfOpenService }
];
ClrTooltipTrigger.propDecorators = {
    showTooltip: [{ type: HostListener, args: ['mouseenter',] }, { type: HostListener, args: ['focus',] }],
    hideTooltip: [{ type: HostListener, args: ['mouseleave',] }, { type: HostListener, args: ['blur',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const CLR_TOOLTIP_DIRECTIVES = [ClrTooltip, ClrTooltipTrigger, ClrTooltipContent];
class ClrTooltipModule {
}
ClrTooltipModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, ClrCommonPopoverModule],
                declarations: [CLR_TOOLTIP_DIRECTIVES],
                exports: [CLR_TOOLTIP_DIRECTIVES, ClrConditionalModule, ClrIconModule],
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrPopoverModule {
}
ClrPopoverModule.decorators = [
    { type: NgModule, args: [{ exports: [ClrDropdownModule, ClrSignpostModule, ClrTooltipModule] },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ButtonHubService {
    constructor() {
        this.buttonsReady = false;
        this._previousBtnClicked = new Subject();
        this._nextBtnClicked = new Subject();
        this._dangerBtnClicked = new Subject();
        this._cancelBtnClicked = new Subject();
        this._finishBtnClicked = new Subject();
        this._customBtnClicked = new Subject();
    }
    /**
     * @return {?}
     */
    get previousBtnClicked() {
        return this._previousBtnClicked.asObservable();
    }
    /**
     * @return {?}
     */
    get nextBtnClicked() {
        return this._nextBtnClicked.asObservable();
    }
    /**
     * @return {?}
     */
    get dangerBtnClicked() {
        return this._dangerBtnClicked.asObservable();
    }
    /**
     * @return {?}
     */
    get cancelBtnClicked() {
        return this._cancelBtnClicked.asObservable();
    }
    /**
     * @return {?}
     */
    get finishBtnClicked() {
        return this._finishBtnClicked.asObservable();
    }
    /**
     * @return {?}
     */
    get customBtnClicked() {
        return this._customBtnClicked.asObservable();
    }
    /**
     * @param {?} buttonType
     * @return {?}
     */
    buttonClicked(buttonType) {
        if ('previous' === buttonType) {
            this._previousBtnClicked.next();
        }
        else if ('next' === buttonType) {
            this._nextBtnClicked.next();
        }
        else if ('finish' === buttonType) {
            this._finishBtnClicked.next();
        }
        else if ('danger' === buttonType) {
            this._dangerBtnClicked.next();
        }
        else if ('cancel' === buttonType) {
            this._cancelBtnClicked.next();
        }
        else {
            this._customBtnClicked.next(buttonType);
        }
    }
}
ButtonHubService.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
class PageCollectionService {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
class WizardNavigationService {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class HeaderActionService {
    // this service communicates information about the presence/display of header actions
    // across the wizard
    /**
     * @param {?} navService
     */
    constructor(navService) {
        this.navService = navService;
    }
    /**
     * @return {?}
     */
    get wizardHasHeaderActions() {
        /** @type {?} */
        const wizardHdrActions = this.wizardHeaderActions;
        if (!wizardHdrActions) {
            return false;
        }
        return wizardHdrActions.toArray().length > 0;
    }
    /**
     * @return {?}
     */
    get currentPageHasHeaderActions() {
        return this.navService.currentPage ? this.navService.currentPage.hasHeaderActions : false;
    }
    /**
     * @return {?}
     */
    get showWizardHeaderActions() {
        return !this.currentPageHasHeaderActions && this.wizardHasHeaderActions;
    }
    /**
     * @return {?}
     */
    get displayHeaderActionsWrapper() {
        return this.currentPageHasHeaderActions || this.wizardHasHeaderActions;
    }
}
HeaderActionService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
HeaderActionService.ctorParameters = () => [
    { type: WizardNavigationService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
let wizardHeaderActionIndex = 0;
class ClrWizardHeaderAction {
    constructor() {
        // title is explanatory text added to the header action
        this.title = '';
        // If our host has an ID attribute, we use this instead of our index.
        this._id = (wizardHeaderActionIndex++).toString();
        this.disabled = false;
        this.headerActionClicked = new EventEmitter(false);
    }
    /**
     * @return {?}
     */
    get id() {
        return `clr-wizard-header-action-${this._id}`;
    }
    /**
     * @return {?}
     */
    click() {
        if (this.disabled) {
            return;
        }
        // passing the header action id allows users to have one method that
        // routes to many different actions based on the type of header action
        // clicked. this is further aided by users being able to specify ids
        // for their header actions.
        this.headerActionClicked.emit(this._id);
    }
}
ClrWizardHeaderAction.decorators = [
    { type: Component, args: [{
                selector: 'clr-wizard-header-action',
                template: `
        <button 
            type="button"
            class="btn clr-wizard-header-action btn-link"
            [id]="id"
            [class.disabled]="disabled"
            (click)="click()"
            [title]="title">
            <ng-content></ng-content>
        </button>
    `,
                host: { class: 'clr-wizard-header-action-wrapper' }
            }] }
];
ClrWizardHeaderAction.propDecorators = {
    title: [{ type: Input, args: ['title',] }],
    _id: [{ type: Input, args: ['id',] }],
    disabled: [{ type: Input, args: ['clrWizardHeaderActionDisabled',] }],
    headerActionClicked: [{ type: Output, args: ['actionClicked',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrWizardPageButtons {
    /**
     * @param {?} pageButtonsTemplateRef
     */
    constructor(pageButtonsTemplateRef) {
        this.pageButtonsTemplateRef = pageButtonsTemplateRef;
    }
}
ClrWizardPageButtons.decorators = [
    { type: Directive, args: [{ selector: '[clrPageButtons]' },] }
];
/** @nocollapse */
ClrWizardPageButtons.ctorParameters = () => [
    { type: TemplateRef }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrWizardPageHeaderActions {
    /**
     * @param {?} pageHeaderActionsTemplateRef
     */
    constructor(pageHeaderActionsTemplateRef) {
        this.pageHeaderActionsTemplateRef = pageHeaderActionsTemplateRef;
    }
}
ClrWizardPageHeaderActions.decorators = [
    { type: Directive, args: [{ selector: '[clrPageHeaderActions]' },] }
];
/** @nocollapse */
ClrWizardPageHeaderActions.ctorParameters = () => [
    { type: TemplateRef }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrWizardPageNavTitle {
    /**
     * @param {?} pageNavTitleTemplateRef
     */
    constructor(pageNavTitleTemplateRef) {
        this.pageNavTitleTemplateRef = pageNavTitleTemplateRef;
    }
}
ClrWizardPageNavTitle.decorators = [
    { type: Directive, args: [{ selector: '[clrPageNavTitle]' },] }
];
/** @nocollapse */
ClrWizardPageNavTitle.ctorParameters = () => [
    { type: TemplateRef }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrWizardPageTitle {
    /**
     * @param {?} pageTitleTemplateRef
     */
    constructor(pageTitleTemplateRef) {
        this.pageTitleTemplateRef = pageTitleTemplateRef;
    }
}
ClrWizardPageTitle.decorators = [
    { type: Directive, args: [{ selector: '[clrPageTitle]' },] }
];
/** @nocollapse */
ClrWizardPageTitle.ctorParameters = () => [
    { type: TemplateRef }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
class ClrWizardPage {
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
    pageTitle: [{ type: ContentChild, args: [ClrWizardPageTitle,] }],
    pageNavTitle: [{ type: ContentChild, args: [ClrWizardPageNavTitle,] }],
    _buttons: [{ type: ContentChild, args: [ClrWizardPageButtons,] }],
    _headerActions: [{ type: ContentChild, args: [ClrWizardPageHeaderActions,] }],
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 *
 * The Wizard component
 *
 */
class ClrWizard {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const DEFAULT_BUTTON_TYPES = {
    cancel: 'cancel',
    previous: 'previous',
    next: 'next',
    finish: 'finish',
    danger: 'danger',
};
/** @type {?} */
const CUSTOM_BUTTON_TYPES = {
    cancel: 'custom-cancel',
    previous: 'custom-previous',
    next: 'custom-next',
    finish: 'custom-finish',
    danger: 'custom-danger',
};
class ClrWizardButton {
    /**
     * @param {?} navService
     * @param {?} buttonService
     */
    constructor(navService, buttonService) {
        this.navService = navService;
        this.buttonService = buttonService;
        this.type = '';
        this.disabled = false;
        this.hidden = false;
        // EventEmitter which is emitted when a button is clicked.
        this.wasClicked = new EventEmitter(false);
    }
    /**
     * @private
     * @param {?=} valueToCheck
     * @param {?=} typeToLookUp
     * @return {?}
     */
    checkDefaultAndCustomType(valueToCheck = '', typeToLookUp) {
        if (DEFAULT_BUTTON_TYPES[typeToLookUp] === valueToCheck) {
            return true;
        }
        if (CUSTOM_BUTTON_TYPES[typeToLookUp] === valueToCheck) {
            return true;
        }
        return false;
    }
    /**
     * @return {?}
     */
    get isCancel() {
        return this.checkDefaultAndCustomType(this.type, 'cancel');
    }
    /**
     * @return {?}
     */
    get isNext() {
        return this.checkDefaultAndCustomType(this.type, 'next');
    }
    /**
     * @return {?}
     */
    get isPrevious() {
        return this.checkDefaultAndCustomType(this.type, 'previous');
    }
    /**
     * @return {?}
     */
    get isFinish() {
        return this.checkDefaultAndCustomType(this.type, 'finish');
    }
    /**
     * @return {?}
     */
    get isDanger() {
        return this.checkDefaultAndCustomType(this.type, 'danger');
    }
    /**
     * @return {?}
     */
    get isPrimaryAction() {
        return this.isNext || this.isDanger || this.isFinish;
    }
    /**
     * @return {?}
     */
    get _disabledAttribute() {
        if (this.isDisabled) {
            return '';
        }
        return null;
    }
    /**
     * @return {?}
     */
    get isDisabled() {
        // dealing with negatives here. cognitively easier to think of it like this...
        /** @type {?} */
        const disabled = true;
        /** @type {?} */
        const nav = this.navService;
        /** @type {?} */
        const page = this.navService.currentPage;
        // Ensure we don't change the response until buttons are ready to avoid chocolate
        if (!this.buttonService.buttonsReady) {
            return !disabled;
        }
        if (this.disabled || nav.wizardStopNavigation || !page) {
            return true;
        }
        if (this.isCancel) {
            return !disabled;
        }
        if (this.isPrevious && (nav.currentPageIsFirst || page.previousStepDisabled)) {
            return disabled;
        }
        if (this.isDanger && !page.readyToComplete) {
            return disabled;
        }
        if (this.isNext && (nav.currentPageIsLast || !page.readyToComplete)) {
            return disabled;
        }
        if (this.isFinish && (!nav.currentPageIsLast || !page.readyToComplete)) {
            return disabled;
        }
        return !disabled;
    }
    /**
     * @return {?}
     */
    get isHidden() {
        // dealing with negatives here. cognitively easier to think of it like this...
        /** @type {?} */
        const hidden = true;
        /** @type {?} */
        const nav = this.navService;
        // Ensure we don't change the response until buttons are ready to avoid chocolate
        if (!this.buttonService.buttonsReady) {
            return !hidden;
        }
        if (this.hidden) {
            return true;
        }
        if (this.isCancel) {
            return !hidden;
        }
        if (this.isPrevious && nav.currentPageIsFirst) {
            return hidden;
        }
        if (this.isNext && nav.currentPageIsLast) {
            return hidden;
        }
        if (this.isFinish && !nav.currentPageIsLast) {
            return hidden;
        }
        return !hidden;
    }
    /**
     * @return {?}
     */
    click() {
        if (this.isDisabled) {
            return;
        }
        this.wasClicked.emit(this.type);
        this.buttonService.buttonClicked(this.type);
    }
}
ClrWizardButton.decorators = [
    { type: Component, args: [{
                selector: 'clr-wizard-button',
                template: `
        <button
            type="button"
            class="btn clr-wizard-btn"
            [class.btn-link]="isCancel"
            [class.clr-wizard-btn--tertiary]="isCancel"
            [class.btn-outline]="isPrevious"
            [class.clr-wizard-btn--secondary]="isPrevious"
            [class.btn-primary]="isPrimaryAction"
            [class.clr-wizard-btn--primary]="isPrimaryAction"
            [class.btn-success]="isFinish"
            [class.btn-danger]="isDanger"
            [class.disabled]="isDisabled"
            [attr.disabled]="_disabledAttribute"
            (click)="click()">
            <ng-content></ng-content>
        </button>
    `,
                host: { class: 'clr-wizard-btn-wrapper', '[attr.aria-hidden]': 'isHidden' },
                styles: ['[aria-hidden="true"] { display: none; }']
            }] }
];
/** @nocollapse */
ClrWizardButton.ctorParameters = () => [
    { type: WizardNavigationService },
    { type: ButtonHubService }
];
ClrWizardButton.propDecorators = {
    type: [{ type: Input, args: ['type',] }],
    disabled: [{ type: Input, args: ['clrWizardButtonDisabled',] }],
    hidden: [{ type: Input, args: ['clrWizardButtonHidden',] }],
    wasClicked: [{ type: Output, args: ['clrWizardButtonClicked',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrWizardCustomTags {
}
ClrWizardCustomTags.decorators = [
    { type: Directive, args: [{ selector: 'clr-wizard-title, clr-wizard-pagetitle' },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrWizardStepnav {
    /**
     * @param {?} pageService
     */
    constructor(pageService) {
        this.pageService = pageService;
    }
}
ClrWizardStepnav.decorators = [
    { type: Component, args: [{
                selector: 'clr-wizard-stepnav',
                template: `
        <ol class="clr-wizard-stepnav-list" role="tablist">
            <li *ngFor="let page of pageService.pages" clr-wizard-stepnav-item 
            [page]="page" class="clr-wizard-stepnav-item"></li>
        </ol>
    `,
                host: { class: 'clr-wizard-stepnav' }
            }] }
];
/** @nocollapse */
ClrWizardStepnav.ctorParameters = () => [
    { type: PageCollectionService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClrWizardStepnavItem {
    /**
     * @param {?} navService
     * @param {?} pageCollection
     */
    constructor(navService, pageCollection) {
        this.navService = navService;
        this.pageCollection = pageCollection;
    }
    /**
     * @private
     * @return {?}
     */
    pageGuard() {
        if (!this.page) {
            throw new Error('Wizard stepnav item is not associated with a wizard page.');
        }
    }
    /**
     * @return {?}
     */
    get id() {
        this.pageGuard();
        return this.pageCollection.getStepItemIdForPage(this.page);
    }
    /**
     * @return {?}
     */
    get isDisabled() {
        this.pageGuard();
        return this.page.disabled || this.navService.wizardStopNavigation || this.navService.wizardDisableStepnav;
    }
    /**
     * @return {?}
     */
    get isCurrent() {
        this.pageGuard();
        return this.page.current;
    }
    /**
     * @return {?}
     */
    get isComplete() {
        this.pageGuard();
        return this.page.completed;
    }
    /**
     * @return {?}
     */
    get canNavigate() {
        this.pageGuard();
        return this.pageCollection.previousPageIsCompleted(this.page);
    }
    /**
     * @return {?}
     */
    click() {
        this.pageGuard();
        // if we click on our own stepnav or a disabled stepnav, we don't want to do anything
        if (this.isDisabled || this.isCurrent) {
            return;
        }
        this.navService.goTo(this.page);
    }
}
ClrWizardStepnavItem.decorators = [
    { type: Component, args: [{
                selector: '[clr-wizard-stepnav-item]',
                template: `
        <button type="button" class="btn btn-link clr-wizard-stepnav-link" (click)="click()">
            <ng-template [ngTemplateOutlet]="page.navTitle"></ng-template>
        </button>
    `,
                host: {
                    '[id]': 'id',
                    '[attr.aria-selected]': 'isCurrent',
                    '[attr.aria-controls]': 'id',
                    role: 'tab',
                    '[class.clr-nav-link]': 'true',
                    '[class.nav-item]': 'true',
                    '[class.active]': 'isCurrent',
                    '[class.disabled]': 'isDisabled',
                    '[class.no-click]': '!canNavigate',
                    '[class.complete]': 'isComplete',
                }
            }] }
];
/** @nocollapse */
ClrWizardStepnavItem.ctorParameters = () => [
    { type: WizardNavigationService },
    { type: PageCollectionService }
];
ClrWizardStepnavItem.propDecorators = {
    page: [{ type: Input, args: ['page',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const CLR_WIZARD_DIRECTIVES = [
    ClrWizard,
    ClrWizardPage,
    ClrWizardStepnav,
    ClrWizardStepnavItem,
    ClrWizardButton,
    ClrWizardHeaderAction,
    ClrWizardCustomTags,
    ClrWizardPageTitle,
    ClrWizardPageNavTitle,
    ClrWizardPageButtons,
    ClrWizardPageHeaderActions,
];
class ClrWizardModule {
}
ClrWizardModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, ClrModalModule, ClrAlertModule],
                declarations: [CLR_WIZARD_DIRECTIVES],
                exports: [CLR_WIZARD_DIRECTIVES],
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClarityModule {
}
ClarityModule.decorators = [
    { type: NgModule, args: [{
                exports: [
                    ClrEmphasisModule,
                    ClrDataModule,
                    ClrIconModule,
                    ClrModalModule,
                    ClrLoadingModule,
                    ClrConditionalModule,
                    ClrFocusTrapModule,
                    ClrButtonModule,
                    ClrFormsModule,
                    ClrLayoutModule,
                    ClrPopoverModule,
                    ClrWizardModule,
                    ClrDragAndDropModule,
                ],
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @return {?}
 */
function collapse() {
    return [
        state('true', style({ height: 0, 'overflow-y': 'hidden' })),
        transition('true => false', [animate('0.2s ease-in-out', style({ height: '*', 'overflow-y': 'hidden' }))]),
        transition('false => true', [style({ height: '*', 'overflow-y': 'hidden' }), animate('0.2s ease-in-out')]),
    ];
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?=} opacity
 * @return {?}
 */
function fade(opacity = 1) {
    return [
        transition('void => *', [style({ opacity: 0 }), animate('0.2s ease-in-out', style({ opacity: opacity }))]),
        transition('* => void', [animate('0.2s ease-in-out', style({ opacity: 0 }))]),
    ];
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} direction
 * @return {?}
 */
function fadeSlide(direction) {
    /** @type {?} */
    let transform = null;
    if (direction === 'up') {
        transform = 'translate(0, 25%)';
    }
    else if (direction === 'down') {
        transform = 'translate(0, -25%)';
    }
    else if (direction === 'left') {
        transform = 'translate(25%, 0)';
    }
    else if (direction === 'right') {
        transform = 'translate(-25%, 0)';
    }
    else {
        throw new Error('Unknown direction ' + direction + ' for slide animation.');
    }
    return [
        transition('void => *', [style({ opacity: 0, transform: transform }), animate('0.2s ease-in-out')]),
        transition('* => void', [animate('0.2s ease-in-out', style({ opacity: 0, transform: transform }))]),
    ];
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} direction
 * @return {?}
 */
function slide(direction) {
    /** @type {?} */
    let transform = null;
    if (direction === 'up') {
        transform = 'translate(0, 25%)';
    }
    else if (direction === 'down') {
        transform = 'translate(0, -25%)';
    }
    else if (direction === 'left') {
        transform = 'translate(25%, 0)';
    }
    else if (direction === 'right') {
        transform = 'translate(-25%, 0)';
    }
    else {
        throw new Error('Unknown direction ' + direction + ' for slide animation.');
    }
    return [
        transition('void => *', [style({ transform: transform }), animate('0.2s ease-in-out')]),
        transition('* => void', [animate('0.2s ease-in-out', style({ transform: transform }))]),
    ];
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { FocusTrapTracker as ÇlrFocusTrapTracker, ClarityModule, ClrButtonModule, ClrButton, ClrButtonGroup, CLR_BUTTON_GROUP_DIRECTIVES, ClrButtonGroupModule, ClrLoadingButton, CLR_LOADING_BUTTON_DIRECTIVES, ClrLoadingButtonModule, ClrDataModule, ClrDatagrid, ClrDatagridActionBar, ClrDatagridActionOverflow, ClrDatagridColumn, ClrDatagridColumnToggle, ClrDatagridHideableColumn, ClrDatagridFilter, ClrDatagridItems, ClrDatagridRow, ClrDatagridRowDetail, ClrDatagridCell, ClrDatagridFooter, ClrDatagridPagination, ClrDatagridPlaceholder, ClrDatagridSortOrder, DatagridStringFilter, DatagridPropertyStringFilter, DatagridPropertyComparator, CLR_DATAGRID_DIRECTIVES, ClrDatagridModule, ClrSelectedState, ClrTree, ClrTreeNode, ClrRecursiveForOf, CLR_TREE_VIEW_DIRECTIVES, ClrTreeViewModule, ClrStackView, ClrStackHeader, ClrStackBlock, ClrStackInput, ClrStackSelect, CLR_STACK_VIEW_DIRECTIVES, ClrStackViewModule, ClrStackViewCustomTags, ClrEmphasisModule, ClrAlert, ClrAlertItem, ClrAlerts, ClrAlertsPager, CLR_ALERT_DIRECTIVES, ClrAlertModule, ClrIfError, ClrControlError, ClrForm, ClrControlHelper, ClrLabel, ClrLayout, ClrCommonFormsModule, ClrCheckbox, ClrCheckboxContainer, isToggleFactory, IS_TOGGLE, IS_TOGGLE_PROVIDER, ClrCheckboxWrapper, ClrCheckboxModule, ClrDateContainer, ClrDateInput, ClrDatepickerViewManager, ClrDaypicker, ClrMonthpicker, ClrYearpicker, ClrCalendar, ClrDay, CLR_DATEPICKER_DIRECTIVES, ClrDatepickerModule, ClrInput, ClrInputContainer, ClrInputModule, ClrPassword, ToggleServiceFactory, TOGGLE_SERVICE, TOGGLE_SERVICE_PROVIDER, ClrPasswordContainer, ClrPasswordModule, ClrRadio, ClrRadioContainer, ClrRadioWrapper, ClrRadioModule, ClrSelect, ClrSelectContainer, ClrSelectModule, ClrTextarea, ClrTextareaContainer, ClrTextareaModule, ClrFormsModule, ClrIconCustomTag, CLR_ICON_DIRECTIVES, ClrIconModule, ClrLayoutModule, ClrMainContainer, CLR_LAYOUT_DIRECTIVES, ClrMainContainerModule, MainContainerWillyWonka, NavDetectionOompaLoompa, ClrHeader, ClrNavLevel, CLR_NAVIGATION_DIRECTIVES, ClrNavigationModule, ClrTabs, ClrTab, ClrTabContent, ClrTabOverflowContent, ClrTabLink, CLR_TABS_DIRECTIVES, ClrTabsModule, ClrVerticalNavGroupChildren, ClrVerticalNavGroup, ClrVerticalNav, ClrVerticalNavLink, ClrVerticalNavIcon, CLR_VERTICAL_NAV_DIRECTIVES, ClrVerticalNavModule, ClrModal, CLR_MODAL_DIRECTIVES, ClrModalModule, ClrDropdown, ClrDropdownMenu, ClrDropdownTrigger, ClrDropdownItem, CLR_MENU_POSITIONS, CLR_DROPDOWN_DIRECTIVES, ClrDropdownModule, ClrPopoverModule, ClrSignpost, ClrSignpostContent, ClrSignpostTrigger, CLR_SIGNPOST_DIRECTIVES, ClrSignpostModule, ClrTooltip, ClrTooltipTrigger, ClrTooltipContent, CLR_TOOLTIP_DIRECTIVES, ClrTooltipModule, collapse, fade, fadeSlide, slide, ClrLoadingState, ClrLoading, LoadingListener, CLR_LOADING_DIRECTIVES, ClrLoadingModule, CONDITIONAL_DIRECTIVES, ClrIfActive, ClrIfOpen, ClrIfExpanded, ClrCommonStrings, ClrDraggable, ClrDroppable, ClrIfDragged, ClrDragHandle, ClrDraggableGhost, ClrDragEvent, CLR_DRAG_AND_DROP_DIRECTIVES, ClrDragAndDropModule, ClrWizard, ClrWizardPage, ClrWizardStepnav, ClrWizardStepnavItem, DEFAULT_BUTTON_TYPES, CUSTOM_BUTTON_TYPES, ClrWizardButton, ClrWizardHeaderAction, ClrWizardCustomTags, ClrWizardPageTitle, ClrWizardPageNavTitle, ClrWizardPageButtons, ClrWizardPageHeaderActions, CLR_WIZARD_DIRECTIVES, ClrWizardModule, ButtonInGroupService as ɵds, DatagridRowExpandAnimation as ɵdl, ActionableOompaLoompa as ɵdi, DatagridWillyWonka as ɵdg, ExpandableOompaLoompa as ɵdk, ClrDatagridColumnSeparator as ɵck, ClrDatagridColumnToggleButton as ɵcq, ClrDatagridColumnToggleTitle as ɵcp, DatagridDetailRegisterer as ɵcw, DatagridIfExpandService as ɵcj, ClrDatagridItemsTrackBy as ɵcv, ClrDatagridPageSize as ɵcx, ColumnResizerService as ɵco, COLUMN_STATE as ɵcr, COLUMN_STATE_PROVIDER as ɵct, columnStateFactory as ɵcs, ColumnsService as ɵcf, CustomFilter as ɵci, DisplayModeService as ɵcg, FiltersProvider as ɵbw, ExpandableRowsCount as ɵcc, Items as ɵbv, Page as ɵbx, RowActionService as ɵcb, Selection as ɵbu, Sort as ɵbz, StateDebouncer as ɵby, StateProvider as ɵcd, TableSizeService as ɵce, DatagridCellRenderer as ɵdf, DatagridHeaderRenderer as ɵdd, DatagridMainRenderer as ɵdc, domAdapterFactory as ɵdb, DatagridRenderOrganizer as ɵca, DatagridRowRenderer as ɵde, DatagridFilterRegistrar as ɵch, WrappedCell as ɵcy, WrappedColumn as ɵcz, WrappedRow as ɵda, StackControl as ɵdm, RecursiveChildren as ɵdq, TREE_FEATURES_PROVIDER as ɵdp, TreeFeaturesService as ɵdn, treeFeaturesFactory as ɵdo, AlertIconAndTypesService as ɵp, MultiAlertService as ɵq, IfErrorService as ɵu, ControlClassService as ɵz, ControlIdService as ɵr, FocusService as ɵbg, LayoutService as ɵs, MarkControlService as ɵv, NgControlService as ɵt, WrappedFormControl as ɵy, DateFormControlService as ɵbe, DateIOService as ɵbh, DateNavigationService as ɵbd, DatepickerEnabledService as ɵbi, DatepickerFocusService as ɵbj, LocaleHelperService as ɵbf, ViewManagerService as ɵbk, ResponsiveNavigationService as ɵdt, ActiveOompaLoompa as ɵed, TabsWillyWonka as ɵec, AriaService as ɵdx, TabsService as ɵdy, TABS_ID as ɵdz, TABS_ID_PROVIDER as ɵeb, tokenFactory$1 as ɵea, VerticalNavGroupRegistrationService as ɵeg, VerticalNavGroupService as ɵeh, VerticalNavIconService as ɵef, VerticalNavService as ɵee, AbstractPopover as ɵi, POPOVER_DIRECTIVES as ɵb, POPOVER_HOST_ANCHOR as ɵh, PopoverDirectiveOld as ɵc, ClrCommonPopoverModule as ɵa, ROOT_DROPDOWN_PROVIDER as ɵg, RootDropdownService as ɵe, clrRootDropdownFactory as ɵf, OompaLoompa as ɵdj, WillyWonka as ɵdh, ClrConditionalModule as ɵj, IF_ACTIVE_ID as ɵk, IF_ACTIVE_ID_PROVIDER as ɵm, IfActiveService as ɵn, tokenFactory as ɵl, IfExpandService as ɵo, IfOpenService as ɵd, DomAdapter as ɵbs, DragAndDropEventBusService as ɵbp, DragEventListenerService as ɵbo, DragHandleRegistrarService as ɵbq, DraggableSnapshotService as ɵbr, GlobalDragModeService as ɵbt, FocusTrapDirective as ɵbc, ClrFocusTrapModule as ɵba, FOCUS_TRAP_DIRECTIVES as ɵbb, EmptyAnchor as ɵx, ClrHostWrappingModule as ɵw, UNIQUE_ID as ɵcl, UNIQUE_ID_PROVIDER as ɵcn, uniqueIdFactory as ɵcm, OUSTIDE_CLICK_DIRECTIVES as ɵbm, OutsideClick as ɵbn, ClrOutsideClickModule as ɵbl, ScrollingService as ɵdr, TEMPLATE_REF_DIRECTIVES as ɵdv, TemplateRefContainer as ɵdw, ClrTemplateRefModule as ɵdu, ButtonHubService as ɵek, HeaderActionService as ɵel, PageCollectionService as ɵej, WizardNavigationService as ɵei };

//# sourceMappingURL=clr-angular.js.map