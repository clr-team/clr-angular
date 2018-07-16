import { Directive, NgModule, EventEmitter, Input, Output, TemplateRef, ViewContainerRef, Optional, Injectable, Component, SkipSelf, ViewChild, ContentChildren, ElementRef, HostListener, QueryList, Renderer2, Inject, PLATFORM_ID, InjectionToken, Injector, NgZone, LOCALE_ID, ComponentFactoryResolver, HostBinding, Self, forwardRef, ChangeDetectorRef, ContentChild, IterableDiffers, Attribute } from '@angular/core';
import { CommonModule, isPlatformBrowser, DOCUMENT, FormatWidth, FormStyle, getLocaleDateFormat, getLocaleDayNames, getLocaleFirstDayOfWeek, getLocaleMonthNames, TranslationWidth } from '@angular/common';
import { Subject, BehaviorSubject } from 'rxjs';
import { animate, keyframes, style, transition, trigger, state } from '@angular/animations';
import { first, map, filter } from 'rxjs/operators';
import { NgControl, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ClrIconCustomTag {
}
ClrIconCustomTag.decorators = [
    { type: Directive, args: [{ selector: 'clr-icon' },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const CLR_ICON_DIRECTIVES = [ClrIconCustomTag];
class ClrIconModule {
}
ClrIconModule.decorators = [
    { type: NgModule, args: [{ imports: [CommonModule], declarations: [CLR_ICON_DIRECTIVES], exports: [CLR_ICON_DIRECTIVES] },] },
];
/**
 * @deprecated since 0.11
 */
const IconCustomTag = ClrIconCustomTag;
/**
 * @deprecated since 0.11
 */
const ICON_DIRECTIVES = CLR_ICON_DIRECTIVES;

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
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
Point[Point.RIGHT_CENTER] = "RIGHT_CENTER";
Point[Point.RIGHT_TOP] = "RIGHT_TOP";
Point[Point.RIGHT_BOTTOM] = "RIGHT_BOTTOM";
Point[Point.TOP_CENTER] = "TOP_CENTER";
Point[Point.TOP_RIGHT] = "TOP_RIGHT";
Point[Point.TOP_LEFT] = "TOP_LEFT";
Point[Point.BOTTOM_CENTER] = "BOTTOM_CENTER";
Point[Point.BOTTOM_RIGHT] = "BOTTOM_RIGHT";
Point[Point.BOTTOM_LEFT] = "BOTTOM_LEFT";
Point[Point.LEFT_CENTER] = "LEFT_CENTER";
Point[Point.LEFT_TOP] = "LEFT_TOP";
Point[Point.LEFT_BOTTOM] = "LEFT_BOTTOM";
const POSITION_RELATIVE = 'relative';
const POSITION_ABSOLUTE = 'absolute';
const POSITION_FIXED = 'fixed';
const OVERFLOW_SCROLL = 'scroll';
const OVERFLOW_AUTO = 'auto';
class Popover {
    /**
     * @param {?} element
     */
    constructor(element) {
        this.element = element;
        this.scrollableElements = [];
        this.boundOnScrollListener = this.emitScrollEvent.bind(this);
        // Browsers don't agree with what to do if some of these are not specified, so we set them all to be safe.
        element.style.position = POSITION_ABSOLUTE;
        element.style.top = 0;
        element.style.bottom = 'auto';
        element.style.left = 0;
        element.style.right = 'auto';
    }
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
        const /** @type {?} */ anchorRect = anchor.getBoundingClientRect();
        const /** @type {?} */ popoverRect = this.element.getBoundingClientRect();
        // position of left top corner of anchor + the offset
        let /** @type {?} */ leftDiff = anchorRect.left - popoverRect.left + offsetX;
        let /** @type {?} */ topDiff = anchorRect.top - popoverRect.top + offsetY;
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
        const /** @type {?} */ popoverComputedStyle = getComputedStyle(this.element);
        const /** @type {?} */ marginLeft = parseInt(popoverComputedStyle.marginLeft, 10);
        const /** @type {?} */ marginRight = parseInt(popoverComputedStyle.marginRight, 10);
        const /** @type {?} */ marginTop = parseInt(popoverComputedStyle.marginTop, 10);
        const /** @type {?} */ marginBottom = parseInt(popoverComputedStyle.marginBottom, 10);
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
        this.element.style.transform = `translateX(${leftDiff}px) translateY(${topDiff}px)`;
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
     * @param {?} container
     * @return {?}
     */
    isPositioned(container) {
        const /** @type {?} */ position = getComputedStyle(container).position;
        return position === POSITION_RELATIVE || position === POSITION_ABSOLUTE || position === POSITION_FIXED;
    }
    /**
     * @return {?}
     */
    emitScrollEvent() {
        this._scroll.next();
    }
    /**
     * @param {?} e
     * @return {?}
     */
    addScrollEventListeners(e) {
        this._scroll = new Subject();
        const /** @type {?} */ anchor = e;
        let /** @type {?} */ current = e;
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
     * @return {?}
     */
    removeScrollEventListeners() {
        for (const /** @type {?} */ elem of this.scrollableElements) {
            elem.removeEventListener('scroll', this.boundOnScrollListener);
        }
        this.scrollableElements.length = 0;
        if (this._scroll) {
            this._scroll.complete();
            delete this._scroll;
        }
    }
    /**
     * @param {?} container
     * @return {?}
     */
    scrolls(container) {
        const /** @type {?} */ computedStyles = getComputedStyle(container);
        return (computedStyles.overflowX === OVERFLOW_SCROLL ||
            computedStyles.overflowX === OVERFLOW_AUTO ||
            computedStyles.overflowY === OVERFLOW_SCROLL ||
            computedStyles.overflowY === OVERFLOW_AUTO);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
let openCount = 0;
const waiting = [];
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
                    waiting.push(() => {
                        this.createPopover();
                    });
                }
            }
        }
        else {
            this.viewContainer.clear();
            this.destroyPopover();
            if (!this.popoverOptions.allowMultipleOpen) {
                if (waiting.length > 0) {
                    const /** @type {?} */ createPopoverFn = waiting.shift();
                    createPopoverFn();
                }
            }
        }
    }
    /**
     * @return {?}
     */
    createPopover() {
        const /** @type {?} */ embeddedViewRef = /** @type {?} */ (this.viewContainer.createEmbeddedView(this.templateRef));
        // TODO: Not sure of the risks associated with using this. Find an alternative.
        // Needed for find the correct height and width of dynamically created views
        // inside of the popover. For Eg: Button Groups
        embeddedViewRef.detectChanges();
        // filter out other nodes in the view ref so we are only left with element nodes
        const /** @type {?} */ elementNodes = embeddedViewRef.rootNodes.filter((node) => {
            return node.nodeType === 1;
        });
        // we take the first element node in the embedded view; usually there should only be one anyways
        this._popoverInstance = new Popover(elementNodes[0]);
        this._subscription = this._popoverInstance
            .anchor(this.anchorElem, this.anchorPoint, this.popoverPoint, this.popoverOptions)
            .subscribe(() => {
            this.clrPopoverOldChange.emit(false);
        });
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
    { type: Directive, args: [{ selector: '[clrPopoverOld]' },] },
];
/** @nocollapse */
PopoverDirectiveOld.ctorParameters = () => [
    { type: TemplateRef, },
    { type: ViewContainerRef, },
];
PopoverDirectiveOld.propDecorators = {
    "anchorElem": [{ type: Input, args: ['clrPopoverOldAnchor',] },],
    "anchorPoint": [{ type: Input, args: ['clrPopoverOldAnchorPoint',] },],
    "popoverPoint": [{ type: Input, args: ['clrPopoverOldPopoverPoint',] },],
    "popoverOptions": [{ type: Input, args: ['clrPopoverOldOptions',] },],
    "clrPopoverOldChange": [{ type: Output, args: ['clrPopoverOldChange',] },],
    "clrPopoverOld": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const POPOVER_DIRECTIVES = [PopoverDirectiveOld];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class ClrCommonPopoverModule {
}
ClrCommonPopoverModule.decorators = [
    { type: NgModule, args: [{ imports: [CommonModule], declarations: [POPOVER_DIRECTIVES], exports: [POPOVER_DIRECTIVES] },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
 * @suppress {checkTypes} checked by tsc
 */
/** @enum {number} */
const ClrLoadingState = {
    DEFAULT: 0,
    LOADING: 1,
    SUCCESS: 2,
    ERROR: 3,
};
ClrLoadingState[ClrLoadingState.DEFAULT] = "DEFAULT";
ClrLoadingState[ClrLoadingState.LOADING] = "LOADING";
ClrLoadingState[ClrLoadingState.SUCCESS] = "SUCCESS";
ClrLoadingState[ClrLoadingState.ERROR] = "ERROR";
class ClrLoading {
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
        this.listener.loadingStateChange(value);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.loadingState = ClrLoadingState.DEFAULT;
    }
}
ClrLoading.decorators = [
    { type: Directive, args: [{ selector: '[clrLoading]' },] },
];
/** @nocollapse */
ClrLoading.ctorParameters = () => [
    { type: LoadingListener, decorators: [{ type: Optional },] },
];
ClrLoading.propDecorators = {
    "loadingState": [{ type: Input, args: ['clrLoading',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const CLR_LOADING_DIRECTIVES = [ClrLoading];
class ClrLoadingModule {
}
ClrLoadingModule.decorators = [
    { type: NgModule, args: [{ imports: [CommonModule], declarations: [CLR_LOADING_DIRECTIVES], exports: [CLR_LOADING_DIRECTIVES] },] },
];
/**
 * @deprecated since 0.11
 */
const Loading = ClrLoading;
/**
 * @deprecated since 0.11
 */
const LOADING_DIRECTIVES = CLR_LOADING_DIRECTIVES;

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
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
    { type: Injectable },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
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
            const /** @type {?} */ classNames = value.split(' ');
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
                [attr.disabled]="disabled">
                <span class="spinner spinner-inline" *ngIf="loading"></span>
                <ng-content></ng-content>
            </button>
        </ng-template>
    `,
                providers: [{ provide: LoadingListener, useExisting: ClrButton }],
            },] },
];
/** @nocollapse */
ClrButton.ctorParameters = () => [
    { type: ButtonInGroupService, decorators: [{ type: SkipSelf }, { type: Optional },] },
];
ClrButton.propDecorators = {
    "templateRef": [{ type: ViewChild, args: ['buttonProjectedRef',] },],
    "inMenu": [{ type: Input, args: ['clrInMenu',] },],
    "classNames": [{ type: Input, args: ['class',] },],
    "name": [{ type: Input, args: ['name',] },],
    "type": [{ type: Input, args: ['type',] },],
    "disabled": [{ type: Input, args: ['disabled',] },],
    "_click": [{ type: Output, args: ['click',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
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
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class ClrButtonGroup {
    /**
     * @param {?} buttonGroupNewService
     * @param {?} elementRef
     */
    constructor(buttonGroupNewService, elementRef) {
        this.buttonGroupNewService = buttonGroupNewService;
        this.elementRef = elementRef;
        this.inlineButtons = [];
        this.menuButtons = [];
        this._openMenu = false;
        this.anchorPoint = Point.BOTTOM_LEFT;
        this.popoverPoint = Point.LEFT_TOP;
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
        this.buttonGroupNewService.changes.subscribe(button => this.rearrangeButton(button));
        this.buttons.changes.subscribe(() => {
            this.initializeButtons();
        });
    }
    /**
     * Moves the button into the other ViewContainer
     * when an update is received.
     *
     * @param {?} button
     * @return {?}
     */
    rearrangeButton(button) {
        let /** @type {?} */ fromView;
        let /** @type {?} */ toView;
        if (button.inMenu) {
            fromView = this.inlineButtons;
            toView = this.menuButtons;
        }
        else {
            fromView = this.menuButtons;
            toView = this.inlineButtons;
        }
        const /** @type {?} */ index = fromView.indexOf(button);
        if (index > -1) {
            fromView.splice(index, 1);
            const /** @type {?} */ moveIndex = this.getMoveIndex(button);
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
        const /** @type {?} */ tempArr = this.buttons.filter(button => button.inMenu === buttonToMove.inMenu);
        return tempArr.indexOf(buttonToMove);
    }
    /**
     * @return {?}
     */
    initializeButtons() {
        const /** @type {?} */ tempInlineButtons = [];
        const /** @type {?} */ tempInMenuButtons = [];
        this.buttons.forEach(button => {
            if (button.inMenu) {
                tempInMenuButtons.push(button);
            }
            else {
                tempInlineButtons.push(button);
            }
        });
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
            let /** @type {?} */ current = target; // Get the element in the DOM on which the mouse was clicked
            const /** @type {?} */ host = this.elementRef.nativeElement; // Current Button Group
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
                template: `<!--
  ~ Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
  ~ This software is released under MIT license.
  ~ The full license information can be found in LICENSE in the root directory of this project.
  -->

<ng-container *ngFor="let inlineButton of inlineButtons">
    <ng-template [ngTemplateOutlet]="inlineButton.templateRef"></ng-template>
</ng-container>
<ng-container *ngIf="menuButtons.length > 0">
    <div
        class="btn-group-overflow open"
        [ngClass]="menuPosition"
        #anchor>
        <button
            class="btn dropdown-toggle"
            (click)="toggleMenu()">
            <clr-icon shape="ellipsis-horizontal"></clr-icon>
        </button>
        <div
            class="dropdown-menu"
            *clrPopoverOld="openMenu; anchor: anchor; anchorPoint: anchorPoint; popoverPoint: popoverPoint;">
            <ng-template [ngTemplateOutlet]="ref"></ng-template>
        </div>
    </div>
</ng-container>
<ng-template #ref>
    <ng-container *ngFor="let menuButton of menuButtons">
        <ng-template [ngTemplateOutlet]="menuButton.templateRef"></ng-template>
    </ng-container>
</ng-template>
`,
                providers: [ButtonInGroupService],
                host: { '[class.btn-group]': 'true' },
            },] },
];
/** @nocollapse */
ClrButtonGroup.ctorParameters = () => [
    { type: ButtonInGroupService, },
    { type: ElementRef, },
];
ClrButtonGroup.propDecorators = {
    "buttons": [{ type: ContentChildren, args: [ClrButton,] },],
    "menuPosition": [{ type: Input, args: ['clrMenuPosition',] },],
    "onMouseClick": [{ type: HostListener, args: ['document:click', ['$event.target'],] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const CLR_BUTTON_GROUP_DIRECTIVES = [ClrButton, ClrButtonGroup];
class ClrButtonGroupModule {
}
ClrButtonGroupModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, ClrIconModule, ClrCommonPopoverModule],
                declarations: [CLR_BUTTON_GROUP_DIRECTIVES],
                exports: [CLR_BUTTON_GROUP_DIRECTIVES],
            },] },
];
/**
 * @deprecated since 0.11
 */
const Button = ClrButton;
/**
 * @deprecated since 0.11
 */
const ButtonGroup = ClrButtonGroup;
/**
 * @deprecated since 0.11
 */
const BUTTON_GROUP_DIRECTIVES = CLR_BUTTON_GROUP_DIRECTIVES;

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
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
        if (state$$1 == this.state) {
            return;
        }
        this.state = state$$1;
        switch (state$$1) {
            case ClrLoadingState.DEFAULT:
                this.renderer.removeStyle(this.el.nativeElement, 'width');
                if (!this.disabled) {
                    this.renderer.removeAttribute(this.el.nativeElement, 'disabled');
                }
                break;
            case ClrLoadingState.LOADING:
                this.setExplicitButtonWidth();
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
     * @return {?}
     */
    setExplicitButtonWidth() {
        if (this.el.nativeElement && this.el.nativeElement.getBoundingClientRect) {
            const /** @type {?} */ boundingClientRect = this.el.nativeElement.getBoundingClientRect();
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
                host: { '[attr.disabled]': "disabled? '' : null" },
            },] },
];
/** @nocollapse */
ClrLoadingButton.ctorParameters = () => [
    { type: ElementRef, },
    { type: Renderer2, },
];
ClrLoadingButton.propDecorators = {
    "disabled": [{ type: Input, args: ['disabled',] },],
    "clrLoadingChange": [{ type: Output, args: ['clrLoadingChange',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const CLR_LOADING_BUTTON_DIRECTIVES = [ClrLoadingButton];
class ClrLoadingButtonModule {
}
ClrLoadingButtonModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: [CLR_LOADING_BUTTON_DIRECTIVES],
                exports: [CLR_LOADING_BUTTON_DIRECTIVES],
            },] },
];
/**
 * @deprecated since 0.11
 */
const LoadingButton = ClrLoadingButton;
/**
 * @deprecated since 0.11
 */
const LOADING_BUTTON_DIRECTIVES = CLR_LOADING_BUTTON_DIRECTIVES;

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class ClrButtonModule {
}
ClrButtonModule.decorators = [
    { type: NgModule, args: [{
                exports: [ClrLoadingButtonModule, ClrButtonGroupModule],
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @deprecated since 0.12
 */
class ClrCodeHighlight {
    /**
     * @param {?} _el
     * @param {?} renderer
     * @param {?} platformId
     */
    constructor(_el, renderer, platformId) {
        this._el = _el;
        this.renderer = renderer;
        this.platformId = platformId;
        this._highlight = '';
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.redraw();
    }
    /**
     * @return {?}
     */
    redraw() {
        // Only run Prism in browser engines
        if (this._el && this._el.nativeElement && isPlatformBrowser(this.platformId)) {
            Prism.highlightElement(this._el.nativeElement);
        }
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set highlight(val) {
        if (val && val.trim() !== '') {
            this._highlight = val;
            this.renderer.addClass(this._el.nativeElement, this._highlight);
        }
    }
    /**
     * @return {?}
     */
    get highlight() {
        return this._highlight;
    }
}
ClrCodeHighlight.decorators = [
    { type: Directive, args: [{ selector: 'code[clr-code-highlight]' },] },
];
/** @nocollapse */
ClrCodeHighlight.ctorParameters = () => [
    { type: ElementRef, },
    { type: Renderer2, },
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] },] },
];
ClrCodeHighlight.propDecorators = {
    "highlight": [{ type: Input, args: ['clr-code-highlight',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * @deprecated since 0.12
 */
const CLR_CODE_HIGHLIGHT_DIRECTIVES = [ClrCodeHighlight];
/**
 * @deprecated since 0.12
 */
class ClrSyntaxHighlightModule {
}
ClrSyntaxHighlightModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: [CLR_CODE_HIGHLIGHT_DIRECTIVES],
                exports: [CLR_CODE_HIGHLIGHT_DIRECTIVES],
            },] },
];
/**
 * @deprecated since 0.11
 */
const CodeHighlight = ClrCodeHighlight;
/**
 * @deprecated since 0.11
 */
const CODE_HIGHLIGHT_DIRECTIVES = CLR_CODE_HIGHLIGHT_DIRECTIVES;

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * @deprecated
 */
class ClrCodeModule {
}
ClrCodeModule.decorators = [
    { type: NgModule, args: [{ exports: [ClrSyntaxHighlightModule] },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
let activeCounter = 0;
const IF_ACTIVE_ID = new InjectionToken('IF_ACTIVE_ID');
/**
 * @return {?}
 */
function tokenFactory() {
    return ++activeCounter;
}
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
    { type: Injectable },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
        this.subscription = this.ifActiveService.currentChange.subscribe(newCurrentId => {
            this.checkAndUpdateView(newCurrentId);
        });
    }
    /**
     * @param {?} currentId
     * @return {?}
     */
    checkAndUpdateView(currentId) {
        const /** @type {?} */ isNowActive = currentId === this.id;
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
    { type: Directive, args: [{ selector: '[clrIfActive]' },] },
];
/** @nocollapse */
ClrIfActive.ctorParameters = () => [
    { type: IfActiveService, },
    { type: undefined, decorators: [{ type: Inject, args: [IF_ACTIVE_ID,] },] },
    { type: TemplateRef, },
    { type: ViewContainerRef, },
];
ClrIfActive.propDecorators = {
    "active": [{ type: Input, args: ['clrIfActive',] },],
    "activeChange": [{ type: Output, args: ['clrIfActiveChange',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
}
IfOpenService.decorators = [
    { type: Injectable },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
        this.subscription = this.ifOpenService.openChange.subscribe(change => {
            this.updateView(change);
            this.openChange.emit(change);
        });
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
    { type: Directive, args: [{ selector: '[clrIfOpen]' },] },
];
/** @nocollapse */
ClrIfOpen.ctorParameters = () => [
    { type: IfOpenService, },
    { type: TemplateRef, },
    { type: ViewContainerRef, },
];
ClrIfOpen.propDecorators = {
    "open": [{ type: Input, args: ['clrIfOpen',] },],
    "openChange": [{ type: Output, args: ['clrIfOpenChange',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const CONDITIONAL_DIRECTIVES = [ClrIfActive, ClrIfOpen];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ClrConditionalModule {
}
ClrConditionalModule.decorators = [
    { type: NgModule, args: [{ imports: [CommonModule], declarations: [CONDITIONAL_DIRECTIVES], exports: [CONDITIONAL_DIRECTIVES] },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
    activatePreviousTrapper() {
        this._current = this._previousFocusTraps.pop();
    }
}
FocusTrapTracker.decorators = [
    { type: Injectable },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class FocusTrapDirective {
    /**
     * @param {?} elementRef
     * @param {?} injector
     * @param {?} focusTrapsTracker
     * @param {?} platformId
     */
    constructor(elementRef, injector, focusTrapsTracker, platformId) {
        this.elementRef = elementRef;
        this.focusTrapsTracker = focusTrapsTracker;
        this.platformId = platformId;
        this.document = injector.get(DOCUMENT);
        this.focusTrapsTracker.current = this;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onFocusIn(event) {
        const /** @type {?} */ nativeElement = this.elementRef.nativeElement;
        if (this.focusTrapsTracker.current === this && !nativeElement.contains(event.target)) {
            nativeElement.focus();
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            this._previousActiveElement = /** @type {?} */ (document.activeElement);
            const /** @type {?} */ nativeElement = this.elementRef.nativeElement;
            nativeElement.setAttribute('tabindex', '0');
        }
    }
    /**
     * @return {?}
     */
    setPreviousFocus() {
        if (this._previousActiveElement && this._previousActiveElement.focus) {
            this._previousActiveElement.focus();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.setPreviousFocus();
        this.focusTrapsTracker.activatePreviousTrapper();
    }
}
FocusTrapDirective.decorators = [
    { type: Directive, args: [{ selector: '[clrFocusTrap]' },] },
];
/** @nocollapse */
FocusTrapDirective.ctorParameters = () => [
    { type: ElementRef, },
    { type: Injector, },
    { type: FocusTrapTracker, },
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] },] },
];
FocusTrapDirective.propDecorators = {
    "onFocusIn": [{ type: HostListener, args: ['document:focusin', ['$event'],] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const FOCUS_TRAP_DIRECTIVES = [FocusTrapDirective];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ClrFocusTrapModule {
}
ClrFocusTrapModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                providers: [FocusTrapTracker],
                declarations: [FOCUS_TRAP_DIRECTIVES],
                exports: [FOCUS_TRAP_DIRECTIVES],
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class EmptyAnchor {
}
EmptyAnchor.decorators = [
    { type: Component, args: [{
                template: '',
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * Internal module, please do not export!
 */
class ClrHostWrappingModule {
}
ClrHostWrappingModule.decorators = [
    { type: NgModule, args: [{ declarations: [EmptyAnchor], exports: [EmptyAnchor], entryComponents: [EmptyAnchor] },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const UP_ARROW = 38;
const DOWN_ARROW = 40;
const RIGHT_ARROW = 39;
const LEFT_ARROW = 37;



const ESC = 27;

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * This is the en-001 short locale date format. Setting as default.
 */
const DEFAULT_LOCALE_FORMAT = 'dd/MM/y';
// https://en.wikipedia.org/wiki/Date_format_by_country
const LITTLE_ENDIAN_REGEX = /d+.+m+.+y+/i;
const MIDDLE_ENDIAN_REGEX = /m+.+d+.+y+/i;
// No need for BIG_ENDIAN_REGEX because anything that doesn't satisfy the above 2
// is automatically BIG_ENDIAN
const DELIMITER_REGEX = /d+|m+|y+/i;
const USER_INPUT_REGEX = /\d+/g;
const MOBILE_USERAGENT_REGEX = /Mobi/i;
const RTL_REGEX = /\u200f/g;
const YEAR = 'YYYY';
const MONTH = 'MM';
const DATE = 'DD';
const LITTLE_ENDIAN = {
    name: 'LITTLE_ENDIAN',
    format: [DATE, MONTH, YEAR],
};
const MIDDLE_ENDIAN = {
    name: 'MIDDLE_ENDIAN',
    format: [MONTH, DATE, YEAR],
};
const BIG_ENDIAN = {
    name: 'BIG_ENDIAN',
    format: [YEAR, MONTH, DATE],
};
const NO_OF_DAYS_IN_A_WEEK = 7;
const NO_OF_ROWS_IN_CALENDAR_VIEW = 6;
const TOTAL_DAYS_IN_DAYS_VIEW = NO_OF_DAYS_IN_A_WEEK * NO_OF_ROWS_IN_CALENDAR_VIEW;

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
    const /** @type {?} */ currYear = new Date().getFullYear();
    const /** @type {?} */ century = Math.floor(currYear / 100) * 100;
    let /** @type {?} */ result = year + century;
    if (result > currYear + 20) {
        result = result - 100;
    }
    return result;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
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
     * @return {?}
     */
    initializeDaysInCalendar() {
        const /** @type {?} */ noOfDaysInCalendar = getNumberOfDaysInTheMonth(this.year, this.month);
        this.days = Array(noOfDaysInCalendar)
            .fill(null)
            .map((date, index) => {
            return new DayModel(this.year, this.month, index + 1);
        });
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
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
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
        const /** @type {?} */ date = new Date(this.year, this.month, this.date + value);
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
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
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
     * @return {?}
     */
    initializeCalendarView() {
        // Generate prev and next month calendar models.
        const /** @type {?} */ prevMonthCalendar = this.calendar.previousMonth();
        const /** @type {?} */ nextMonthCalendar = this.calendar.nextMonth();
        // Get no of days from prev and next months.
        const /** @type {?} */ daysFromPrevMonthInCalView = this.numDaysFromPrevMonthInCalView(this.calendar.year, this.calendar.month);
        const /** @type {?} */ daysFromNextMonthInCalView = TOTAL_DAYS_IN_DAYS_VIEW - (this.calendar.days.length + daysFromPrevMonthInCalView);
        // Generate prev, curr and next day view models
        let /** @type {?} */ prevMonthDayViews = [];
        let /** @type {?} */ nextMonthDayViews = [];
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
     * @param {?} days
     * @param {?} isDisabled
     * @param {?} isCurrentCalendar
     * @return {?}
     */
    generateDayViewModels(days, isDisabled, isCurrentCalendar) {
        const /** @type {?} */ dayViews = days.map(day => {
            return new DayViewModel(day, false, isDisabled, false, false);
        });
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
     * @param {?} currentYear
     * @param {?} currentMonth
     * @return {?}
     */
    numDaysFromPrevMonthInCalView(currentYear, currentMonth) {
        const /** @type {?} */ firstDayOfCurrMonth = getDay(currentYear, currentMonth, 1);
        if (firstDayOfCurrMonth >= this.firstDayOfWeek) {
            return firstDayOfCurrMonth - this.firstDayOfWeek;
        }
        else {
            return NO_OF_DAYS_IN_A_WEEK + firstDayOfCurrMonth - this.firstDayOfWeek;
        }
    }
    /**
     * Checks if the Day passed is in the CalendarView.
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
     * @param {?} prev
     * @param {?} curr
     * @param {?} next
     * @return {?}
     */
    generateCalendarView(prev, curr, next) {
        const /** @type {?} */ combinationArr = [...prev, ...curr, ...next];
        const /** @type {?} */ calendarView = [];
        for (let /** @type {?} */ i = 0; i < NO_OF_ROWS_IN_CALENDAR_VIEW; i++) {
            calendarView[i] = combinationArr.slice(i * NO_OF_DAYS_IN_A_WEEK, (i + 1) * NO_OF_DAYS_IN_A_WEEK);
        }
        return calendarView;
    }
    /**
     * Initialize the selected day if the day is in the calendar.
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
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
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
    /**
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
        if (dayModel.isEqual(this.selectedDay)) {
            return;
        }
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
    { type: Injectable },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
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
        this._ngZone.runOutsideAngular(() => {
            this._ngZone.onStable
                .asObservable()
                .pipe(first())
                .subscribe(() => {
                if (isPlatformBrowser(this.platformId)) {
                    const /** @type {?} */ focusEl = elRef.nativeElement.querySelector('[tabindex="0"]');
                    if (focusEl) {
                        focusEl.focus();
                    }
                }
            });
        });
    }
}
DatepickerFocusService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
DatepickerFocusService.ctorParameters = () => [
    { type: NgZone, },
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
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
     * @return {?}
     */
    initializeLocaleDaysNarrow() {
        // Get locale day names starting with Sunday
        const /** @type {?} */ tempArr = getLocaleDayNames(this.locale, FormStyle.Format, TranslationWidth.Narrow).slice();
        // Get first day of the week based on the locale
        const /** @type {?} */ firstDayOfWeek = this.firstDayOfWeek;
        // Rearrange the tempArr to start with the first day of the week based on the locale.
        if (firstDayOfWeek > 0) {
            const /** @type {?} */ prevDays = tempArr.splice(0, firstDayOfWeek);
            tempArr.push(...prevDays);
        }
        this._localeDaysNarrow = tempArr;
    }
    /**
     * Initializes the array of month names in the TranslationWidth.Abbreviated format.
     * e.g. `[Jan, Feb, ...]` for en-US
     * @return {?}
     */
    initializeLocaleMonthsAbbreviated() {
        this._localeMonthsAbbreviated = getLocaleMonthNames(this.locale, FormStyle.Format, TranslationWidth.Abbreviated).slice();
    }
    /**
     * Initializes the array of month names in the TranslationWidth.Wide format.
     * e.g. `[January, February, ...]` for en-US
     * @return {?}
     */
    initializeLocaleMonthsWide() {
        this._localeMonthsWide = getLocaleMonthNames(this.locale, FormStyle.Format, TranslationWidth.Wide).slice();
    }
    /**
     * Initializes the first day of the week based on the locale.
     * @return {?}
     */
    initializeFirstDayOfWeek() {
        this._firstDayOfWeek = getLocaleFirstDayOfWeek(this.locale);
    }
    /**
     * @return {?}
     */
    initializeLocaleDateFormat() {
        this._localeDateFormat = getLocaleDateFormat(this.locale, FormatWidth.Short);
    }
}
LocaleHelperService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
LocaleHelperService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [LOCALE_ID,] },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
     * @return {?}
     */
    initializeSubscriptions() {
        this._subs.push(this._dateNavigationService.displayedCalendarChange.subscribe(() => {
            this.generateCalendarView();
        }));
        this._subs.push(this._dateNavigationService.focusedDayChange.subscribe((focusedDay) => {
            this.calendarViewModel.updateFocusableDay(focusedDay);
        }));
        this._subs.push(this._dateNavigationService.focusOnCalendarChange.subscribe(() => {
            this._datepickerFocusService.focusCell(this._elRef);
        }));
    }
    /**
     * Generates the Calendar View based on the calendar retrieved from the DateNavigationService.
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
        this._subs.forEach((sub) => sub.unsubscribe());
    }
}
ClrCalendar.decorators = [
    { type: Component, args: [{ selector: 'clr-calendar', template: `<table class="calendar-table weekdays">
    <tr class="calendar-row">
        <td *ngFor="let day of localeDaysNarrow" class="calendar-cell weekday">
            {{day}}
        </td>
    </tr>
</table>
<table
    class="calendar-table calendar-dates">
    <tr class="calendar-row" *ngFor="let row of calendarViewModel.calendarView">
        <td *ngFor="let dayView of row" class="calendar-cell">
            <clr-day [clrDayView]="dayView"></clr-day>
        </td>
    </tr>
</table>
` },] },
];
/** @nocollapse */
ClrCalendar.ctorParameters = () => [
    { type: LocaleHelperService, },
    { type: DateNavigationService, },
    { type: DatepickerFocusService, },
    { type: ElementRef, },
];
ClrCalendar.propDecorators = {
    "onKeyDown": [{ type: HostListener, args: ['keydown', ['$event'],] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
    { type: Injectable },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
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
    { type: Injectable },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
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
     * @return {?}
     */
    initializeLocaleDisplayFormat() {
        const /** @type {?} */ format = this.cldrLocaleDateFormat.toLocaleLowerCase();
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
     * @return {?}
     */
    extractDelimiters() {
        if (this.cldrLocaleDateFormat) {
            // Sanitize Date Format. Remove RTL characters.
            // FIXME: When we support RTL, remove this and handle it correctly.
            const /** @type {?} */ localeFormat = this.cldrLocaleDateFormat.replace(RTL_REGEX, '');
            const /** @type {?} */ delimiters = localeFormat.split(DELIMITER_REGEX);
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
            const /** @type {?} */ dateNo = date.getDate();
            const /** @type {?} */ monthNo = date.getMonth() + 1;
            const /** @type {?} */ dateStr = dateNo > 9 ? dateNo.toString() : '0' + dateNo;
            const /** @type {?} */ monthStr = monthNo > 9 ? monthNo.toString() : '0' + monthNo;
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
        const /** @type {?} */ format = this.localeDisplayFormat.format;
        return format[0] + this.delimiters[0] + format[1] + this.delimiters[1] + format[2];
    }
    /**
     * Checks if the month entered by the user is valid or not.
     * Note: Month is 0 based.
     * @param {?} month
     * @return {?}
     */
    isValidMonth(month) {
        return month > -1 && month < 12;
    }
    /**
     * Checks if the date is valid depending on the year and month provided.
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
        // Instead I have to write the logic like this x-(
        const /** @type {?} */ y = +year;
        const /** @type {?} */ m = +month - 1; // month is 0 based
        const /** @type {?} */ d = +date;
        if (!this.isValidMonth(m) || !this.isValidDate(y, m, d)) {
            return null;
        }
        const /** @type {?} */ result = parseToFourDigitYear(y);
        return result !== -1 ? new Date(result, m, d) : null;
    }
    /**
     * Checks if the input provided by the user is valid.
     * @param {?} date
     * @return {?}
     */
    isValidInput(date) {
        if (!date) {
            return null;
        }
        const /** @type {?} */ dateParts = date.match(USER_INPUT_REGEX);
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
    { type: Injectable },
];
/** @nocollapse */
DateIOService.ctorParameters = () => [
    { type: LocaleHelperService, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
// iPad mini screen width
// http://stephen.io/mediaqueries/#iPadMini
const DATEPICKER_ENABLE_BREAKPOINT = 768;

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
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
    { type: Injectable },
];
/** @nocollapse */
DatepickerEnabledService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ClrDateContainer {
    /**
     * @param {?} _ifOpenService
     * @param {?} _dateNavigationService
     * @param {?} _datepickerEnabledService
     * @param {?} dateFormControlService
     */
    constructor(_ifOpenService, _dateNavigationService, _datepickerEnabledService, dateFormControlService) {
        this._ifOpenService = _ifOpenService;
        this._dateNavigationService = _dateNavigationService;
        this._datepickerEnabledService = _datepickerEnabledService;
        this.dateFormControlService = dateFormControlService;
        // Unused but have to add it :-(
        this._dynamic = false;
        this._sub = this._ifOpenService.openChange.subscribe(open => {
            if (open) {
                this.initializeCalendar();
            }
        });
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
        this._sub.unsubscribe();
    }
}
ClrDateContainer.decorators = [
    { type: Component, args: [{
                selector: 'clr-date-container',
                template: `
        <ng-content></ng-content>
        <button
            type="button"
            class="datepicker-trigger"
            (click)="toggleDatepicker($event)"
            *ngIf="isEnabled">
            <clr-icon shape="calendar" class="datepicker-trigger-icon"></clr-icon>
        </button>
        <clr-datepicker-view-manager *clrIfOpen clrFocusTrap></clr-datepicker-view-manager>
    `,
                providers: [
                    ControlIdService,
                    IfOpenService,
                    LocaleHelperService,
                    DateIOService,
                    DateNavigationService,
                    DatepickerEnabledService,
                    DateFormControlService,
                ],
                host: { '[class.date-container]': 'true' },
            },] },
];
/** @nocollapse */
ClrDateContainer.ctorParameters = () => [
    { type: IfOpenService, },
    { type: DateNavigationService, },
    { type: DatepickerEnabledService, },
    { type: DateFormControlService, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
// unsupported: template constraints.
/**
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
            const /** @type {?} */ cfr = this.injector.get(ComponentFactoryResolver);
            const /** @type {?} */ el = this.injector.get(ElementRef);
            // We need a new anchor, since we're projecting the current one.
            vcr.createComponent(cfr.resolveComponentFactory(EmptyAnchor));
            const /** @type {?} */ factory = cfr.resolveComponentFactory(containerType);
            // Craft the element array based on what slot to use. Angular only uses the index to determine
            // which ng-content to project into, so if you have more than one ng-content you'll need to set
            // the index in the constructor appropriately
            const /** @type {?} */ element = [];
            element[index] = [el.nativeElement];
            // We're assuming only one projection slot, but in more complex cases we might want to provide
            // a different array of projected elements.
            const /** @type {?} */ containerRef = vcr.createComponent(factory, undefined, undefined, element);
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
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
// unsupported: template constraints.
/**
 * @template W
 */
class WrappedFormControl {
    /**
     * @param {?} wrapperType
     * @param {?} vcr
     * @param {?=} index
     */
    constructor(wrapperType, vcr, index = 0) {
        this.wrapperType = wrapperType;
        this.vcr = vcr;
        this.index = index;
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
     * @template T
     * @param {?} token
     * @param {?=} notFoundValue
     * @return {?}
     */
    getProviderFromContainer(token, notFoundValue) {
        return this._containerInjector.get(token, notFoundValue);
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
        // No need to subscribe to controlIdService.idChange because the input is the only one that can update the id.
    }
}
WrappedFormControl.propDecorators = {
    "id": [{ type: HostBinding }, { type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class ClrDateInput extends WrappedFormControl {
    /**
     * @param {?} container
     * @param {?} vcr
     * @param {?} elRef
     * @param {?} renderer
     * @param {?} _ngControl
     * @param {?} _dateIOService
     * @param {?} _dateNavigationService
     * @param {?} _datepickerEnabledService
     * @param {?} dateFormControlService
     * @param {?} platformId
     */
    constructor(container, vcr, elRef, renderer, _ngControl, _dateIOService, _dateNavigationService, _datepickerEnabledService, dateFormControlService, platformId) {
        super(ClrDateContainer, vcr);
        this.container = container;
        this.elRef = elRef;
        this.renderer = renderer;
        this._ngControl = _ngControl;
        this._dateIOService = _dateIOService;
        this._dateNavigationService = _dateNavigationService;
        this._datepickerEnabledService = _datepickerEnabledService;
        this.dateFormControlService = dateFormControlService;
        this.platformId = platformId;
        /**
         * Subscriptions to all the services and queries changes
         */
        this._subscriptions = [];
        this.previousOutputInitializedFlag = false;
        this.initialLoad = true;
        //
        // Output Management
        // Note: For now we will not emit both clrDateChange and ngControl outputs
        // at the same time. This requires us to listen to keydown and blur events to figure out
        // exactly when the Output should be emitted.
        // Our recommendation right now is to either use clrDate or use ngModel/FormControl.
        // Do not use both of them together.
        //
        this._dateUpdated = new EventEmitter(false);
    }
    /**
     * @param {?} dayModel
     * @return {?}
     */
    initializePreviousOutput(dayModel) {
        if (!this.previousOutputInitializedFlag) {
            this.previousOutput = dayModel;
            this.previousOutputInitializedFlag = true;
        }
    }
    /**
     * 1. Populate services if the date container is not present.
     * 2. Initialize Subscriptions.
     * 3. Process User Input.
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        if (!this.container) {
            this.populateContainerServices();
        }
        this.initializeSubscriptions();
        this.processInitialInputs();
    }
    /**
     * Process the inputs initialized by the user which were missed
     * because of late subscriptions or lifecycle method calls.
     * @return {?}
     */
    processInitialInputs() {
        this.processUserDateObject(this.dateValueOnInitialLoad);
        // Handle Inital Value from Reactive Forms
        // TODO: We are repeating this logic at multiple places. This makes me think
        // if this class should have implemented the ControlValueAccessor interface.
        // Will explore that later and see if its a cleaner solution.
        if (this._ngControl && this._ngControl.value) {
            this.updateInputValue(this._ngControl.value);
            this.initializePreviousOutput(this._dateNavigationService.selectedDay);
        }
    }
    /**
     * Write the initial input set by the user on to the input field.
     * @return {?}
     */
    ngAfterViewInit() {
        // I don't know why I have to do this but after using the new HostWrapping Module I have to delay the processing
        // of the initial Input set by the user to here.  If I do not 2 issues occur:
        // 1. the Input setter is called before ngOnInit. ngOnInit initializes the services without which the setter
        // fails
        // 2. The Renderer doesn't work before ngAfterViewInit
        //(It used to before the new HostWrapping Module for some reason).
        // I need the renderer to set the value property on the input to make sure that if the user has supplied a Date
        // input object,  we reflect it with the right date on the input field using the IO service.  I am not sure if
        // these are major issues or not but just noting them down here.
        if (this._dateNavigationService) {
            const /** @type {?} */ selDay = this._dateNavigationService.selectedDay;
            if (selDay) {
                const /** @type {?} */ dateStr = this._dateIOService.toLocaleDisplayFormatString(selDay.toDate());
                this.writeDateStrToInputField(dateStr);
            }
        }
        this.initialLoad = false;
    }
    /**
     * Unsubscribes from the subscriptions.
     * @return {?}
     */
    ngOnDestroy() {
        this._subscriptions.forEach((sub) => sub.unsubscribe());
    }
    /**
     * Populates the services from the container component.
     * @return {?}
     */
    populateContainerServices() {
        this._dateIOService = this.getProviderFromContainer(DateIOService);
        this._dateNavigationService = this.getProviderFromContainer(DateNavigationService);
        this._datepickerEnabledService = this.getProviderFromContainer(DatepickerEnabledService);
        this.dateFormControlService = this.getProviderFromContainer(DateFormControlService);
    }
    /**
     * Writes the date string value to the input field
     * @param {?} value
     * @return {?}
     */
    writeDateStrToInputField(value) {
        this.renderer.setProperty(this.elRef.nativeElement, 'value', value);
    }
    /**
     * Javascript Date object input set by the user.
     * @param {?} value
     * @return {?}
     */
    set date(value) {
        if (this.initialLoad) {
            // Store date value passed by the user to process after the services have been initialized by
            // the ngOnInit hook.
            this.dateValueOnInitialLoad = value;
        }
        else {
            this.processUserDateObject(value);
        }
    }
    /**
     * Processes a date object to check if its valid or not.
     * @param {?} value
     * @return {?}
     */
    processUserDateObject(value) {
        if (this._dateIOService) {
            // The date object is converted back to string because in Javascript you can create a date object
            // like this: new Date("Test"). This is a date object but it is invalid. Converting the date object
            // that the user passed helps us to verify the validity of the date object.
            const /** @type {?} */ dateStr = this._dateIOService.toLocaleDisplayFormatString(value);
            this.updateInputValue(dateStr);
        }
    }
    /**
     * @param {?} dateStr
     * @return {?}
     */
    updateInputValue(dateStr) {
        const /** @type {?} */ date = this._dateIOService.isValidInput(dateStr);
        if (date) {
            const /** @type {?} */ dayModel = new DayModel(date.getFullYear(), date.getMonth(), date.getDate());
            if (!dayModel.isEqual(this._dateNavigationService.selectedDay)) {
                this._dateNavigationService.selectedDay = dayModel;
                this.writeDateStrToInputField(dateStr);
            }
        }
        else {
            this._dateNavigationService.selectedDay = null;
        }
    }
    /**
     * Returns the date format for the placeholder according to which the input should be entered by the user.
     * @return {?}
     */
    get placeholderText() {
        return this.placeholder ? this.placeholder : this._dateIOService.placeholderText;
    }
    /**
     * Sets the input type to text when the datepicker is enabled. Reverts back to the native date input
     * when the datepicker is disabled. Datepicker is disabled on mobiles.
     * @return {?}
     */
    get inputType() {
        return isPlatformBrowser(this.platformId) && this._datepickerEnabledService.isEnabled ? 'text' : 'date';
    }
    /**
     * @param {?} dayModel
     * @return {?}
     */
    emitDateOutput(dayModel) {
        if (dayModel && !dayModel.isEqual(this.previousOutput)) {
            this._dateUpdated.emit(dayModel.toDate());
            this.previousOutput = dayModel;
        }
        else if (!dayModel && this.previousOutput) {
            this._dateUpdated.emit(null);
            this.previousOutput = null;
        }
    }
    /**
     * Fires this method when the user changes the input focuses out of the input field.
     * @param {?} target
     * @return {?}
     */
    onValueChange(target) {
        const /** @type {?} */ value = target.value;
        const /** @type {?} */ date = this._dateIOService.isValidInput(value);
        if (date) {
            const /** @type {?} */ dayModel = new DayModel(date.getFullYear(), date.getMonth(), date.getDate());
            this._dateNavigationService.selectedDay = dayModel;
            this.emitDateOutput(dayModel);
        }
        else {
            this._dateNavigationService.selectedDay = null;
            this.emitDateOutput(null);
        }
    }
    /**
     * Initialize DateIO Subscriptions
     * @return {?}
     */
    initializeSubscriptions() {
        if (this._dateNavigationService && this._dateIOService) {
            // This subscription is fired when the user selects a date from the popover.
            this._subscriptions.push(this._dateNavigationService.selectedDayChange.subscribe((dayModel) => {
                const /** @type {?} */ dateStr = this._dateIOService.toLocaleDisplayFormatString(dayModel.toDate());
                this.writeDateStrToInputField(dateStr);
                // This makes sure that ngModelChange is fired
                // TODO: Check if there is a better way to do this.
                // NOTE: Its important to use NgControl and not NgModel because
                // NgModel only works with template driven forms
                if (this._ngControl) {
                    this._ngControl.control.setValue(dateStr);
                }
                this.emitDateOutput(dayModel);
            }));
            // We do not emit an Output from this subscription because
            // we only emit the Output when the user has focused out of the input.
            if (this._ngControl) {
                this._subscriptions.push(this._ngControl.valueChanges.subscribe((value) => {
                    const /** @type {?} */ date = this._dateIOService.isValidInput(value);
                    if (date) {
                        const /** @type {?} */ dayModel = new DayModel(date.getFullYear(), date.getMonth(), date.getDate());
                        this._dateNavigationService.selectedDay = dayModel;
                        this.initializePreviousOutput(dayModel);
                    }
                    else {
                        this.initializePreviousOutput(null);
                    }
                }));
            }
        }
        if (this.dateFormControlService) {
            this._subscriptions.push(this.dateFormControlService.touchedChange.subscribe(() => {
                if (this._ngControl) {
                    this._ngControl.control.markAsTouched();
                }
            }));
            this._subscriptions.push(this.dateFormControlService.dirtyChange.subscribe(() => {
                if (this._ngControl) {
                    this._ngControl.control.markAsDirty();
                }
            }));
        }
    }
}
ClrDateInput.decorators = [
    { type: Directive, args: [{ selector: '[clrDate]', host: { '[class.date-input]': 'true' } },] },
];
/** @nocollapse */
ClrDateInput.ctorParameters = () => [
    { type: ClrDateContainer, decorators: [{ type: Optional },] },
    { type: ViewContainerRef, },
    { type: ElementRef, },
    { type: Renderer2, },
    { type: NgControl, decorators: [{ type: Self }, { type: Optional },] },
    { type: DateIOService, decorators: [{ type: Optional },] },
    { type: DateNavigationService, decorators: [{ type: Optional },] },
    { type: DatepickerEnabledService, decorators: [{ type: Optional },] },
    { type: DateFormControlService, decorators: [{ type: Optional },] },
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] },] },
];
ClrDateInput.propDecorators = {
    "date": [{ type: Input, args: ['clrDate',] },],
    "placeholder": [{ type: Input },],
    "placeholderText": [{ type: HostBinding, args: ['attr.placeholder',] },],
    "inputType": [{ type: HostBinding, args: ['attr.type',] },],
    "_dateUpdated": [{ type: Output, args: ['clrDateChange',] },],
    "onValueChange": [{ type: HostListener, args: ['change', ['$event.target'],] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
        this.closeOnOutsideClick = false;
        this.el = injector.get(ElementRef);
        this.ifOpenService = injector.get(IfOpenService);
        this.renderer = injector.get(Renderer2);
        // Default anchor is the parent host
        this.anchorElem = parentHost.nativeElement;
        this.popoverInstance = new Popover(this.el.nativeElement);
        this.subscription = this.ifOpenService.openChange.subscribe(change => {
            if (change) {
                this.anchor();
                this.attachESCListener();
            }
            else {
                this.release();
                this.detachESCListener();
            }
        });
        if (this.ifOpenService.open) {
            this.anchor();
            this.attachESCListener();
        }
    }
    /**
     * @return {?}
     */
    anchor() {
        this.updateAnchor = true;
        // Ugh
        this.ignore = this.ifOpenService.originalEvent;
    }
    /**
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
                .subscribe(() => {
                // if a scroll event is detected, close the popover
                this.ifOpenService.open = false;
            });
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
    /**
     * @return {?}
     */
    get isOffScreen() {
        return this.ifOpenService.open ? false : true;
    }
    /**
     * @return {?}
     */
    attachESCListener() {
        this.documentESCListener = this.renderer.listen('document', 'keydown', event => {
            if (event && event.keyCode === ESC) {
                this.ifOpenService.open = false;
            }
        });
    }
    /**
     * @return {?}
     */
    detachESCListener() {
        if (this.documentESCListener) {
            this.documentESCListener();
            delete this.documentESCListener;
        }
    }
    /**
     * @return {?}
     */
    attachOutsideClickListener() {
        if (this.closeOnOutsideClick) {
            this.hostClickListener = this.renderer.listen(this.el.nativeElement, 'click', event => (this.ignore = event));
            if (this.ignoredElement) {
                this.ignoredElementClickListener = this.renderer.listen(this.ignoredElement, 'click', event => (this.ignore = event));
            }
            this.documentClickListener = this.renderer.listen('document', 'click', event => {
                if (event === this.ignore) {
                    delete this.ignore;
                }
                else {
                    this.ifOpenService.open = false;
                }
            });
        }
    }
    /**
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
    { type: Injectable },
];
/** @nocollapse */
AbstractPopover.ctorParameters = () => [
    { type: Injector, },
    { type: ElementRef, decorators: [{ type: SkipSelf },] },
];
AbstractPopover.propDecorators = {
    "isOffScreen": [{ type: HostBinding, args: ['class.is-off-screen',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
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
    { type: Injectable },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
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
                template: `<!--
* Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
* This software is released under MIT license.
* The full license information can be found in LICENSE in the root directory of this project.
-->

<clr-monthpicker *ngIf="isMonthView"></clr-monthpicker>
<clr-yearpicker *ngIf="isYearView"></clr-yearpicker>
<clr-daypicker *ngIf="isDayView"></clr-daypicker>
`,
                providers: [ViewManagerService, DatepickerFocusService],
                host: { '[class.datepicker]': 'true' },
            },] },
];
/** @nocollapse */
ClrDatepickerViewManager.ctorParameters = () => [
    { type: ElementRef, decorators: [{ type: SkipSelf },] },
    { type: Injector, },
    { type: ViewManagerService, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
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
        const /** @type {?} */ day = this.dayView.dayModel;
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
                host: { '[class.day]': 'true' },
            },] },
];
/** @nocollapse */
ClrDay.ctorParameters = () => [
    { type: DateNavigationService, },
    { type: IfOpenService, },
    { type: DateFormControlService, },
];
ClrDay.propDecorators = {
    "dayView": [{ type: Input, args: ['clrDayView',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ClrDaypicker {
    /**
     * @param {?} _viewManagerService
     * @param {?} _dateNavigationService
     * @param {?} _localeHelperService
     */
    constructor(_viewManagerService, _dateNavigationService, _localeHelperService) {
        this._viewManagerService = _viewManagerService;
        this._dateNavigationService = _dateNavigationService;
        this._localeHelperService = _localeHelperService;
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
    { type: Component, args: [{ selector: 'clr-daypicker', template: `<div class="calendar-header">
    <div class="calendar-pickers">
        <button class="calendar-btn monthpicker-trigger" type="button" (click)="changeToMonthView()">
            {{calendarMonth}}
        </button>
        <button class="calendar-btn yearpicker-trigger" type="button" (click)="changeToYearView()">
            {{calendarYear}}
        </button>
    </div>
    <div class="calendar-switchers">
        <button class="calendar-btn switcher" type="button" (click)="previousMonth()">
            <clr-icon shape="angle" dir="left"></clr-icon>
        </button>
        <button class="calendar-btn switcher" type="button" (click)="currentMonth()">
            <clr-icon shape="event"></clr-icon>
        </button>
        <button class="calendar-btn switcher" type="button" (click)="nextMonth()">
            <clr-icon shape="angle" dir="right"></clr-icon>
        </button>
    </div>
</div>
<clr-calendar></clr-calendar>
`, host: { '[class.daypicker]': 'true' } },] },
];
/** @nocollapse */
ClrDaypicker.ctorParameters = () => [
    { type: ViewManagerService, },
    { type: DateNavigationService, },
    { type: LocaleHelperService, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
            const /** @type {?} */ keyCode = event.keyCode;
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
                },
            },] },
];
/** @nocollapse */
ClrMonthpicker.ctorParameters = () => [
    { type: ViewManagerService, },
    { type: LocaleHelperService, },
    { type: DateNavigationService, },
    { type: DatepickerFocusService, },
    { type: ElementRef, },
];
ClrMonthpicker.propDecorators = {
    "onKeyDown": [{ type: HostListener, args: ['keydown', ['$event'],] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
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
     * @return {?}
     */
    generateYearRange() {
        const /** @type {?} */ remainder = this.year % YEARS_TO_DISPLAY;
        const /** @type {?} */ floor = this.year - remainder;
        const /** @type {?} */ ceil = floor + YEARS_TO_DISPLAY;
        this.yearRange = this.generateRange(floor, ceil);
    }
    /**
     * Function which generate a range of numbers from floor to ceil.
     * @param {?} floor
     * @param {?} ceil
     * @return {?}
     */
    generateRange(floor, ceil) {
        return Array.from({ length: ceil - floor }, (v, k) => k + floor);
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
 * @suppress {checkTypes} checked by tsc
 */
class ClrYearpicker {
    /**
     * @param {?} _dateNavigationService
     * @param {?} _viewManagerService
     * @param {?} _datepickerFocusService
     * @param {?} _elRef
     */
    constructor(_dateNavigationService, _viewManagerService, _datepickerFocusService, _elRef) {
        this._dateNavigationService = _dateNavigationService;
        this._viewManagerService = _viewManagerService;
        this._datepickerFocusService = _datepickerFocusService;
        this._elRef = _elRef;
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
            const /** @type {?} */ keyCode = event.keyCode;
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
                <clr-icon shape="angle" dir="left"></clr-icon>
            </button>
            <button class="calendar-btn switcher" type="button" (click)="currentDecade()">
                <clr-icon shape="event"></clr-icon>
            </button>
            <button class="calendar-btn switcher" type="button" (click)="nextDecade()">
                <clr-icon shape="angle" dir="right"></clr-icon>
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
                },
            },] },
];
/** @nocollapse */
ClrYearpicker.ctorParameters = () => [
    { type: DateNavigationService, },
    { type: ViewManagerService, },
    { type: DatepickerFocusService, },
    { type: ElementRef, },
];
ClrYearpicker.propDecorators = {
    "onKeyDown": [{ type: HostListener, args: ['keydown', ['$event'],] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
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
                imports: [CommonModule, ClrHostWrappingModule, ClrConditionalModule, ClrIconModule, ClrFocusTrapModule],
                declarations: [CLR_DATEPICKER_DIRECTIVES],
                exports: [CLR_DATEPICKER_DIRECTIVES],
                entryComponents: [ClrDateContainer],
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Private counter to generate unique IDs for the checkboxes, to bind the labels to them.
 */
let latestId = 0;
/**
 * @deprecated ClrCheckbox will be renamed to ClrCheckboxDeprecated in 0.12, and will be replaced with a new
 * implementation in 0.13, so if you import it you will need to update your references.
 */
class ClrCheckboxDeprecated {
    constructor() {
        // If our host has an ID attribute, we use this instead of our index.
        this._id = (latestId++).toString();
        // If host provides an clrAriaLabeledBy input, we apply it to the checkbox
        this.clrAriaLabeledBy = null;
        // If our host has a name attribute, we apply it to the checkbox.
        this.name = null;
        // If the host is disabled we apply it to the checkbox
        this.disabled = false;
        // Support for inline checkboxes, adds the necessary class to the host
        this.inline = false;
        this._checked = false;
        this._indeterminate = false;
        this.indeterminateChange = new EventEmitter(false);
        this.change = new EventEmitter(false);
        this.onChangeCallback = (_) => { };
        this.onTouchedCallback = () => { };
    }
    /**
     * @return {?}
     */
    get id() {
        return `clr-checkbox-${this._id}`;
    }
    /**
     * @return {?}
     */
    get checked() {
        return this._checked;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set checked(value) {
        if (value !== this._checked) {
            if (this._indeterminate) {
                this.setIndeterminate(false);
            }
            this.setChecked(value);
        }
    }
    /**
     * @return {?}
     */
    get indeterminate() {
        return this._indeterminate;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set indeterminate(value) {
        if (this._indeterminate !== value) {
            if (this._checked) {
                this.setChecked(false);
            }
            this.setIndeterminate(value);
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setIndeterminate(value) {
        this._indeterminate = value;
        this.indeterminateChange.emit(this._indeterminate);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setChecked(value) {
        this._checked = value;
        this.change.emit(this._checked);
    }
    /**
     * @return {?}
     */
    toggle() {
        this.checked = !this.checked;
        this.onChangeCallback(this.checked);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (value === null) {
            value = false;
        }
        if (value !== this.checked) {
            this.checked = value;
        }
    }
    /**
     * @param {?} onChange
     * @return {?}
     */
    registerOnChange(onChange) {
        this.onChangeCallback = onChange;
    }
    /**
     * @param {?} onTouched
     * @return {?}
     */
    registerOnTouched(onTouched) {
        this.onTouchedCallback = onTouched;
    }
    /**
     * @return {?}
     */
    touch() {
        this.onTouchedCallback();
    }
    /**
     * @return {?}
     */
    checkIndeterminateState() {
        if (!this.disabled) {
            this.toggle();
        }
    }
}
ClrCheckboxDeprecated.decorators = [
    { type: Component, args: [{
                selector: 'clr-checkbox',
                template: `
        <!--
            FIXME: We are not subscribed to the change event but the click event here.
            The reason for that is because checkboxes behave differently on IE & Edge.
            https://stackoverflow.com/a/19447939
            
            To fix that, we listen to every click event and then toggle the checkbox manually
            to make it behave the same way across the browsers we support.
            
            This works for cases when users toggle the checkbox using the keyboard too:
            https://stackoverflow.com/questions/27878940/spacebar-triggering-click-event-on-checkbox
        -->
        <input type="checkbox" [attr.aria-labelledby]="clrAriaLabeledBy"
               [id]="id" [name]="name" [checked]="checked"
               [indeterminate]="indeterminate" [disabled]="disabled"
               (blur)="touch()" (click)="checkIndeterminateState()">
        <label [attr.for]="id">
            <ng-content></ng-content>
        </label>
    `,
                host: { '[class.checkbox]': '!inline', '[class.checkbox-inline]': 'inline', '[class.disabled]': 'disabled' },
                /*
                     * This provider lets us declare our checkbox as a ControlValueAccessor,
                     * which allows us to use [(ngModel)] directly on our component,
                     * with all the automatic features wiring that come with it.
                     */
                providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ClrCheckboxDeprecated), multi: true }],
            },] },
];
/** @nocollapse */
ClrCheckboxDeprecated.propDecorators = {
    "_id": [{ type: Input, args: ['id',] },],
    "clrAriaLabeledBy": [{ type: Input, args: ['clrAriaLabeledBy',] },],
    "name": [{ type: Input, args: ['name',] },],
    "disabled": [{ type: Input, args: ['clrDisabled',] },],
    "inline": [{ type: Input, args: ['clrInline',] },],
    "checked": [{ type: Input, args: ['clrChecked',] },],
    "indeterminate": [{ type: Input, args: ['clrIndeterminate',] },],
    "indeterminateChange": [{ type: Output, args: ['clrIndeterminateChange',] },],
    "change": [{ type: Output, args: ['clrCheckedChange',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const CLR_CHECKBOX_DIRECTIVES = [ClrCheckboxDeprecated];
class ClrCheckboxModule {
}
ClrCheckboxModule.decorators = [
    { type: NgModule, args: [{ imports: [CommonModule], declarations: [CLR_CHECKBOX_DIRECTIVES], exports: [CLR_CHECKBOX_DIRECTIVES] },] },
];
/**
 * @deprecated since 0.11
 */
const Checkbox = ClrCheckboxDeprecated;
/**
 * @deprecated since 0.12
 */
const ClrCheckbox = ClrCheckboxDeprecated;
/**
 * @deprecated since 0.11
 */
const CHECKBOX_DIRECTIVES = CLR_CHECKBOX_DIRECTIVES;

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class ClrFormsModule {
}
ClrFormsModule.decorators = [
    { type: NgModule, args: [{ imports: [CommonModule], exports: [ClrCheckboxModule, ClrDatepickerModule] },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class Expand {
    constructor() {
        this.expandable = 0;
        this.replace = false;
        this._loading = false;
        this._expanded = false;
        this._animate = new Subject();
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
            this._animate.next();
            this._expandChange.next(value);
        }
    }
    /**
     * @return {?}
     */
    get animate() {
        return this._animate.asObservable();
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
                this._animate.next();
                break;
        }
    }
}
Expand.decorators = [
    { type: Injectable },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * TODO: make this a reusable directive outside of Datagrid, like [clrLoading].
 */
class ClrIfExpanded {
    /**
     * @param {?} template
     * @param {?} container
     * @param {?} expand
     */
    constructor(template, container, expand) {
        this.template = template;
        this.container = container;
        this.expand = expand;
        this._expanded = false;
        this.expandedChange = new EventEmitter(true);
        /**
         * Subscriptions to all the services and queries changes
         */
        this._subscriptions = [];
        expand.expandable++;
        this._subscriptions.push(expand.expandChange.subscribe(() => {
            this.updateView();
            this.expandedChange.emit(this.expand.expanded);
        }));
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
     * @return {?}
     */
    updateView() {
        if (this.expand.expanded && this.container.length !== 0) {
            return;
        }
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
        this._subscriptions.forEach((sub) => sub.unsubscribe());
    }
}
ClrIfExpanded.decorators = [
    { type: Directive, args: [{ selector: '[clrIfExpanded]' },] },
];
/** @nocollapse */
ClrIfExpanded.ctorParameters = () => [
    { type: TemplateRef, },
    { type: ViewContainerRef, },
    { type: Expand, },
];
ClrIfExpanded.propDecorators = {
    "expanded": [{ type: Input, args: ['clrIfExpanded',] },],
    "expandedChange": [{ type: Output, args: ['clrIfExpandedChange',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const EXPAND_DIRECTIVES = [ClrIfExpanded];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ClrIfExpandModule {
}
ClrIfExpandModule.decorators = [
    { type: NgModule, args: [{ imports: [CommonModule], declarations: [EXPAND_DIRECTIVES], exports: [EXPAND_DIRECTIVES] },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
        const /** @type {?} */ target = event.target; // Get the element in the DOM on which the mouse was clicked
        const /** @type {?} */ host = this.el.nativeElement; // Get the current actionMenu native HTML element
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
    { type: Directive, args: [{ selector: '[clrOutsideClick]' },] },
];
/** @nocollapse */
OutsideClick.ctorParameters = () => [
    { type: ElementRef, },
];
OutsideClick.propDecorators = {
    "strict": [{ type: Input, args: ['clrStrict',] },],
    "outsideClick": [{ type: Output, args: ['clrOutsideClick',] },],
    "documentClick": [{ type: HostListener, args: ['document:click', ['$event'],] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const OUSTIDE_CLICK_DIRECTIVES = [OutsideClick];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ClrOutsideClickModule {
}
ClrOutsideClickModule.decorators = [
    { type: NgModule, args: [{ imports: [CommonModule], declarations: [OUSTIDE_CLICK_DIRECTIVES], exports: [OUSTIDE_CLICK_DIRECTIVES] },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class DomAdapter {
    /**
     * @param {?} element
     * @return {?}
     */
    userDefinedWidth(element) {
        element.classList.add('datagrid-cell-width-zero');
        const /** @type {?} */ userDefinedWidth = parseInt(getComputedStyle(element).getPropertyValue('width'), 10);
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
    clientRectHeight(element) {
        return parseInt(element.getBoundingClientRect().height, 10);
    }
    /**
     * @param {?} element
     * @return {?}
     */
    clientRectRight(element) {
        return parseInt(element.getBoundingClientRect().right, 10);
    }
    /**
     * @param {?} element
     * @return {?}
     */
    clientRectWidth(element) {
        return parseInt(element.getBoundingClientRect().width, 10);
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
    { type: Injectable },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class DatagridRenderOrganizer {
    constructor() {
        this.alreadySized = false;
        this.widths = [];
        this._noLayout = new Subject();
        this._clearWidths = new Subject();
        this._detectStrictWidths = new Subject();
        this._tableMode = new Subject();
        this._computeWidths = new Subject();
        this._alignColumns = new Subject();
        this.scrollbar = new Subject();
        this.scrollbarWidth = new Subject();
        this._done = new Subject();
    }
    /**
     * @return {?}
     */
    get noLayout() {
        return this._noLayout.asObservable();
    }
    /**
     * @return {?}
     */
    get clearWidths() {
        return this._clearWidths.asObservable();
    }
    /**
     * @return {?}
     */
    get detectStrictWidths() {
        return this._detectStrictWidths.asObservable();
    }
    /**
     * @return {?}
     */
    get tableMode() {
        return this._tableMode.asObservable();
    }
    /**
     * @return {?}
     */
    get computeWidths() {
        return this._computeWidths.asObservable();
    }
    /**
     * @return {?}
     */
    get alignColumns() {
        return this._alignColumns.asObservable();
    }
    /**
     * @return {?}
     */
    get done() {
        return this._done.asObservable();
    }
    /**
     * @return {?}
     */
    resize() {
        this.widths.length = 0;
        this._noLayout.next(true);
        if (this.alreadySized) {
            this._clearWidths.next();
        }
        this._detectStrictWidths.next();
        this._tableMode.next(true);
        this._computeWidths.next();
        this._tableMode.next(false);
        this._alignColumns.next();
        this._noLayout.next(false);
        this.scrollbar.next();
        this.alreadySized = true;
        this._done.next();
    }
}
DatagridRenderOrganizer.decorators = [
    { type: Injectable },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class DatagridRowExpandAnimation {
    /**
     * @param {?} el
     * @param {?} domAdapter
     * @param {?} renderer
     * @param {?} expand
     * @param {?} renderOrganizer
     */
    constructor(el, domAdapter, renderer, expand, renderOrganizer) {
        this.el = el;
        this.domAdapter = domAdapter;
        this.renderer = renderer;
        this.expand = expand;
        this.renderOrganizer = renderOrganizer;
        if (expand && expand.animate) {
            expand.animate.subscribe(() => {
                // We already had an animation waiting, so we just have to run in, not prepare again
                if (this.oldHeight) {
                    setTimeout(() => this.run());
                }
                else {
                    this.animate();
                }
            });
        }
    }
    /**
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
        // We set the height of the element immediately to avoid a flicker before the animation starts.
        this.renderer.setStyle(this.el.nativeElement, 'height', this.oldHeight + 'px');
        this.renderer.setStyle(this.el.nativeElement, 'overflow-y', 'hidden');
        setTimeout(() => {
            if (this.expand.loading) {
                return;
            }
            this.run();
        });
    }
    /**
     * @return {?}
     */
    run() {
        this.renderer.setStyle(this.el.nativeElement, 'height', null);
        // I don't like realigning the columns before the animation, since the scrollbar could appear or disappear
        // halfway, but that's a compromise we have to make for now. We can look into a smarter fix later.
        this.renderOrganizer.scrollbar.next();
        const /** @type {?} */ newHeight = this.domAdapter.computedHeight(this.el.nativeElement);
        this.running = this.el.nativeElement.animate({ height: [this.oldHeight + 'px', newHeight + 'px'], overflowY: ['hidden', 'hidden'], easing: 'ease-in-out' }, { duration: 200 });
        this.running.onfinish = () => {
            this.renderer.setStyle(this.el.nativeElement, 'overflow-y', null);
            delete this.running;
        };
        delete this.oldHeight;
    }
}
DatagridRowExpandAnimation.decorators = [
    { type: Directive, args: [{ selector: 'clr-dg-row' },] },
];
/** @nocollapse */
DatagridRowExpandAnimation.ctorParameters = () => [
    { type: ElementRef, },
    { type: DomAdapter, },
    { type: Renderer2, },
    { type: Expand, },
    { type: DatagridRenderOrganizer, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @abstract
 */
class CustomFilter {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class StateDebouncer {
    constructor() {
        /**
         * The Observable that lets other classes subscribe to global state changes
         */
        this._change = new Subject();
        this.nbChanges = 0;
    }
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
    { type: Injectable },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class Page {
    /**
     * @param {?} stateDebouncer
     */
    constructor(stateDebouncer) {
        this.stateDebouncer = stateDebouncer;
        /**
         * Page size, a value of 0 means no pagination
         */
        this._size = 0;
        /**
         * Total items (needed to guess the last page)
         */
        this._totalItems = 0;
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
        const /** @type {?} */ oldSize = this._size;
        if (size !== oldSize) {
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
        }
    }
    /**
     * @return {?}
     */
    get totalItems() {
        return this._totalItems;
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
     * Index of the first item displayed on the current page, starting at 0
     * @return {?}
     */
    get firstItem() {
        if (this.size === 0) {
            return 0;
        }
        return (this.current - 1) * this.size;
    }
    /**
     * Index of the last item displayed on the current page, starting at 0
     * @return {?}
     */
    get lastItem() {
        if (this.size === 0) {
            return this.totalItems - 1;
        }
        let /** @type {?} */ lastInPage = this.current * this.size - 1;
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
    { type: Injectable },
];
/** @nocollapse */
Page.ctorParameters = () => [
    { type: StateDebouncer, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
        const /** @type {?} */ ret = [];
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
        const /** @type {?} */ index = this._all.length;
        const /** @type {?} */ subscription = filter$$1.changes.subscribe(() => this.resetPageAndEmitFilterChange([filter$$1]));
        let /** @type {?} */ hasUnregistered = false;
        const /** @type {?} */ registered = new RegisteredFilter(filter$$1, () => {
            if (hasUnregistered) {
                return;
            }
            subscription.unsubscribe();
            this._all.splice(index, 1);
            if (filter$$1.isActive()) {
                this.resetPageAndEmitFilterChange([]);
            }
            hasUnregistered = true;
        });
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
    { type: Injectable },
];
/** @nocollapse */
FiltersProvider.ctorParameters = () => [
    { type: Page, },
    { type: StateDebouncer, },
];
// unsupported: template constraints.
/**
 * @template F
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
 * @suppress {checkTypes} checked by tsc
 */
// unsupported: template constraints.
/**
 * @abstract
 * @template F
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
            this.registered = /** @type {?} */ (filter$$1);
        }
        else if (filter$$1) {
            this.registered = this.filters.add(/** @type {?} */ (filter$$1));
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
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Custom filter that can be added in any column to override the default object property string filter.
 * The reason this is not just an input on DatagridColumn is because we need the filter's template to be projected,
 * since it can be anything (not just a text input).
 */
class ClrDatagridFilter extends DatagridFilterRegistrar {
    /**
     * @param {?} _filters
     */
    constructor(_filters) {
        super(_filters);
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
        const /** @type {?} */ boolOpen = !!open;
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
                    <button type="button" class="close" 
                        aria-label="Close" (click)="open = false"
                        type="button">
                        <clr-icon aria-hidden="true" shape="close"></clr-icon>
                    </button>
                </div>
    
                <ng-content></ng-content>
            </div>
        </ng-template>
    `,
            },] },
];
/** @nocollapse */
ClrDatagridFilter.ctorParameters = () => [
    { type: FiltersProvider, },
];
ClrDatagridFilter.propDecorators = {
    "open": [{ type: Input, args: ['clrDgFilterOpen',] },],
    "openChanged": [{ type: Output, args: ['clrDgFilterOpenChange',] },],
    "customFilter": [{ type: Input, args: ['clrDgFilter',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
            this.setFilter(new DatagridStringFilterImpl(/** @type {?} */ (value)));
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.filterContainer.openChanged.subscribe((open) => {
            if (open) {
                // We need the timeout because at the time this executes, the input isn't
                // displayed yet.
                setTimeout(() => {
                    this.domAdapter.focus(this.input.nativeElement);
                });
            }
        });
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
                (keyup.enter)="close()" (keyup.escape)="close()"/>
        </clr-dg-filter>
    `,
            },] },
];
/** @nocollapse */
DatagridStringFilter.ctorParameters = () => [
    { type: FiltersProvider, },
    { type: DomAdapter, },
];
DatagridStringFilter.propDecorators = {
    "customStringFilter": [{ type: Input, args: ['clrDgStringFilter',] },],
    "input": [{ type: ViewChild, args: ['input',] },],
    "filterContainer": [{ type: ViewChild, args: [ClrDatagridFilter,] },],
    "value": [{ type: Input, args: ['clrFilterValue',] },],
    "filterValueChange": [{ type: Output, args: ['clrFilterValueChange',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @abstract
 */
class OompaLoompa {
    /**
     * @param {?} cdr
     * @param {?} willyWonka
     */
    constructor(cdr, willyWonka) {
        this.subscription = willyWonka.chocolate.subscribe(() => {
            if (this.latestFlavor !== this.flavor) {
                cdr.detectChanges();
            }
        });
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
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
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
    { type: Injectable },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
 * @suppress {checkTypes} checked by tsc
 */
class DatagridWillyWonka extends WillyWonka {
}
DatagridWillyWonka.decorators = [
    { type: Directive, args: [{ selector: 'clr-datagrid' },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
    { type: Directive, args: [{ selector: 'clr-datagrid, clr-dg-row' },] },
];
/** @nocollapse */
ActionableOompaLoompa.ctorParameters = () => [
    { type: ChangeDetectorRef, },
    { type: DatagridWillyWonka, decorators: [{ type: Optional },] },
    { type: RowActionService, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
    { type: Injectable },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
    { type: Directive, args: [{ selector: 'clr-datagrid, clr-dg-row' },] },
];
/** @nocollapse */
ExpandableOompaLoompa.ctorParameters = () => [
    { type: ChangeDetectorRef, },
    { type: DatagridWillyWonka, decorators: [{ type: Optional },] },
    { type: ExpandableRowsCount, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generic accessor for deep object properties
 * that can be specified as simple dot-separated strings.
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
    /**
     * @param {?} item
     * @return {?}
     */
    getPropValue(item) {
        if (this.splitProp) {
            let /** @type {?} */ value = item;
            for (const /** @type {?} */ nestedProp of this.splitProp) {
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
 * @suppress {checkTypes} checked by tsc
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
        let /** @type {?} */ propA = this.nestedProp.getPropValue(a);
        let /** @type {?} */ propB = this.nestedProp.getPropValue(b);
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
 * @suppress {checkTypes} checked by tsc
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
        const /** @type {?} */ propValue = this.nestedProp.getPropValue(item);
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
 * @suppress {checkTypes} checked by tsc
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
ClrDatagridSortOrder[ClrDatagridSortOrder.UNSORTED] = "UNSORTED";
ClrDatagridSortOrder[ClrDatagridSortOrder.ASC] = "ASC";
ClrDatagridSortOrder[ClrDatagridSortOrder.DESC] = "DESC";

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class DragDispatcher {
    /**
     * @param {?} _ngZone
     * @param {?} _renderer
     */
    constructor(_ngZone, _renderer) {
        this._ngZone = _ngZone;
        this._renderer = _renderer;
        this._onDragStart = new Subject();
        this._onDragMove = new Subject();
        this._onDragEnd = new Subject();
    }
    /**
     * @return {?}
     */
    get onDragStart() {
        return this._onDragStart;
    }
    /**
     * @return {?}
     */
    get onDragMove() {
        return this._onDragMove;
    }
    /**
     * @return {?}
     */
    get onDragEnd() {
        return this._onDragEnd;
    }
    /**
     * @return {?}
     */
    addDragListener() {
        const /** @type {?} */ handleEl = this.handleRef.nativeElement;
        this._listeners = [
            this.customDragEvent(handleEl, 'mousedown', 'mousemove', 'mouseup'),
            this.customDragEvent(handleEl, 'touchstart', 'touchmove', 'touchend'),
        ];
    }
    /**
     * @param {?} element
     * @param {?} startOnEvent
     * @param {?} moveOnEvent
     * @param {?} endOnEvent
     * @return {?}
     */
    customDragEvent(element, startOnEvent, moveOnEvent, endOnEvent) {
        let /** @type {?} */ dragMoveListener;
        let /** @type {?} */ dragEndListener;
        return this._renderer.listen(element, startOnEvent, (startEvent) => {
            this.notifyDragStart(startEvent);
            dragMoveListener = this._ngZone.runOutsideAngular(() => {
                return this._renderer.listen('document', moveOnEvent, (moveEvent) => {
                    this.notifyDragMove(moveEvent);
                });
            });
            dragEndListener = this._renderer.listen('document', endOnEvent, (endEvent) => {
                // Unsubscribing from mouseMoveListener
                dragMoveListener();
                this.notifyDragEnd(endEvent);
                // Unsubscribing from itself
                dragEndListener();
            });
        });
    }
    /**
     * @param {?} event
     * @return {?}
     */
    notifyDragStart(event) {
        return this._onDragStart.next(event);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    notifyDragMove(event) {
        return this._onDragMove.next(event);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    notifyDragEnd(event) {
        return this._onDragEnd.next(event);
    }
    /**
     * @return {?}
     */
    destroy() {
        if (this._listeners) {
            this._listeners.map(event => event());
        }
    }
}
DragDispatcher.decorators = [
    { type: Injectable },
];
/** @nocollapse */
DragDispatcher.ctorParameters = () => [
    { type: NgZone, },
    { type: Renderer2, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
     * @return {?}
     */
    emitChange() {
        this._change.next(this);
    }
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
    { type: Injectable },
];
/** @nocollapse */
Sort.ctorParameters = () => [
    { type: StateDebouncer, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
let nbCount = 0;
class ClrDatagridColumn extends DatagridFilterRegistrar {
    /**
     * @param {?} _sort
     * @param {?} filters
     * @param {?} _dragDispatcher
     */
    constructor(_sort, filters, _dragDispatcher) {
        super(filters);
        this._sort = _sort;
        this._dragDispatcher = _dragDispatcher;
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
        this._sortSubscription = _sort.change.subscribe(sort => {
            // We're only listening to make sure we emit an event when the column goes from sorted to unsorted
            if (this.sortOrder !== ClrDatagridSortOrder.UNSORTED && sort.comparator !== this._sortBy) {
                this._sortOrder = ClrDatagridSortOrder.UNSORTED;
                this.sortOrderChange.emit(this._sortOrder);
            }
            // deprecated: to be removed - START
            if (this.sorted && sort.comparator !== this._sortBy) {
                this._sorted = false;
                this.sortedChange.emit(false);
            }
            // deprecated: to be removed - END
        });
        this.columnId = 'dg-col-' + nbCount.toString(); // Approximate a GUID
        nbCount++;
        // put index here
    }
    /**
     * \@property hidden
     *
     * \@description
     * A property that allows the column to be hidden / shown with css
     * Note the default allows the ClrDatagridColumn to have an *ngIf on it. (EHCAIWC - will occur if its not
     * initialized)
     *
     * \@default false
     *
     * @return {?}
     */
    get hidden() {
        return !!this.hideable && this.hideable.hidden;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set handleElRef(value) {
        this._dragDispatcher.handleRef = value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set handleTrackerElRef(value) {
        this._dragDispatcher.handleTrackerRef = value;
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
        this.sortOrderChange.emit(this._sortOrder);
        // deprecated: to be removed - START
        this._sorted = true;
        this.sortedChange.emit(true);
        // deprecated: to be removed - END
    }
    /**
     * Indicates if the column is currently sorted in ascending order
     * @return {?}
     */
    get asc() {
        // deprecated: if condition to be removed - START
        if (typeof this.sortOrder === 'undefined') {
            return this.sorted && !this._sort.reverse;
        }
        else {
            return this.sortOrder === ClrDatagridSortOrder.ASC;
        }
        // deprecated: if condition to be removed - END
    }
    /**
     * Indicates if the column is currently sorted in descending order
     * @return {?}
     */
    get desc() {
        // deprecated: if condition to be removed - START
        if (typeof this.sortOrder === 'undefined') {
            return this.sorted && this._sort.reverse;
        }
        else {
            return this.sortOrder === ClrDatagridSortOrder.DESC;
        }
        // deprecated: if condition to be removed - END
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

            <ng-template #columnTitle><ng-content></ng-content></ng-template>

            <button class="datagrid-column-title" *ngIf="sortable" (click)="sort()" type="button">
               <ng-container *ngTemplateOutlet="columnTitle"></ng-container>
            </button>

            <span class="datagrid-column-title" *ngIf="!sortable">
               <ng-container *ngTemplateOutlet="columnTitle"></ng-container>
            </span>

            <div class="datagrid-column-separator">
                <button #columnHandle class="datagrid-column-handle" tabindex="-1" type="button"></button>
                <div #columnHandleTracker class="datagrid-column-handle-tracker"></div>
            </div>
        </div>
    `,
                host: { '[class.datagrid-column]': 'true', '[class.datagrid-column--hidden]': 'hidden' },
            },] },
];
/** @nocollapse */
ClrDatagridColumn.ctorParameters = () => [
    { type: Sort, },
    { type: FiltersProvider, },
    { type: DragDispatcher, },
];
ClrDatagridColumn.propDecorators = {
    "handleElRef": [{ type: ViewChild, args: ['columnHandle',] },],
    "handleTrackerElRef": [{ type: ViewChild, args: ['columnHandleTracker',] },],
    "field": [{ type: Input, args: ['clrDgField',] },],
    "sortBy": [{ type: Input, args: ['clrDgSortBy',] },],
    "sorted": [{ type: Input, args: ['clrDgSorted',] },],
    "sortedChange": [{ type: Output, args: ['clrDgSortedChange',] },],
    "sortOrder": [{ type: Input, args: ['clrDgSortOrder',] },],
    "sortOrderChange": [{ type: Output, args: ['clrDgSortOrderChange',] },],
    "asc": [{ type: HostBinding, args: ['class.asc',] },],
    "desc": [{ type: HostBinding, args: ['class.desc',] },],
    "projectedFilter": [{ type: ContentChild, args: [CustomFilter,] },],
    "updateFilterValue": [{ type: Input, args: ['clrFilterValue',] },],
    "filterValueChange": [{ type: Output, args: ['clrFilterValueChange',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
        /**
         * Tracking function to identify objects. Default is reference equality.
         */
        this.trackBy = (index, item) => item;
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
        this._filtersSub = this._filters.change.subscribe(() => this._filterItems());
        this._sortSub = this._sort.change.subscribe(() => {
            // Special case, if the datagrid went from sorted to unsorted, we have to re-filter
            // to get the original order back
            if (!this._sort.comparator) {
                this._filterItems();
            }
            else {
                this._sortItems();
            }
        });
        this._pageSub = this._page.change.subscribe(() => this._changePage());
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
     * @return {?}
     */
    emitChange() {
        this._change.next(this.displayed);
    }
    /**
     * @return {?}
     */
    get change() {
        return this._change.asObservable();
    }
    /**
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
     * @return {?}
     */
    get uninitialized() {
        return !this._all;
    }
    /**
     * FiltersProvider items from the raw list
     * @return {?}
     */
    _filterItems() {
        if (this.uninitialized) {
            return;
        }
        if (this._filters.hasActiveFilters()) {
            this._filtered = this._all.filter(item => this._filters.accepts(item));
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
     * @return {?}
     */
    _sortItems() {
        if (this.uninitialized) {
            return;
        }
        if (this._sort.comparator) {
            this._filtered.sort((a, b) => this._sort.compare(a, b));
        }
        this._changePage();
    }
    /**
     * Extracts the current page from the sorted list
     * @return {?}
     */
    _changePage() {
        if (this.uninitialized) {
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
    { type: Injectable },
];
/** @nocollapse */
Items.ctorParameters = () => [
    { type: FiltersProvider, },
    { type: Sort, },
    { type: Page, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ClrDatagridItems {
    /**
     * @param {?} template
     * @param {?} _differs
     * @param {?} _items
     */
    constructor(template, _differs, _items) {
        this.template = template;
        this._differs = _differs;
        this._items = _items;
        _items.smartenUp();
    }
    /**
     * @param {?} items
     * @return {?}
     */
    set rawItems(items) {
        this._rawItems = items ? items : [];
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if ('rawItems' in changes) {
            const /** @type {?} */ currentItems = changes["rawItems"].currentValue;
            if (!this._differ && currentItems) {
                this._differ = this._differs.find(currentItems).create(this._items.trackBy);
            }
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set trackBy(value) {
        this._items.trackBy = value;
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        if (this._differ) {
            const /** @type {?} */ changes = this._differ.diff(this._rawItems);
            if (changes) {
                // TODO: not very efficient right now,
                // but premature optimization is the root of all evil.
                this._items.all = this._rawItems;
            }
        }
    }
}
ClrDatagridItems.decorators = [
    { type: Directive, args: [{
                selector: '[clrDgItems][clrDgItemsOf]',
            },] },
];
/** @nocollapse */
ClrDatagridItems.ctorParameters = () => [
    { type: TemplateRef, },
    { type: IterableDiffers, },
    { type: Items, },
];
ClrDatagridItems.propDecorators = {
    "rawItems": [{ type: Input, args: ['clrDgItemsOf',] },],
    "trackBy": [{ type: Input, args: ['clrDgItemsTrackBy',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
                host: { '[class.datagrid-placeholder-container]': 'true' },
            },] },
];
/** @nocollapse */
ClrDatagridPlaceholder.ctorParameters = () => [
    { type: Items, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const POPOVER_HOST_ANCHOR = new InjectionToken('POPOVER_HOST_ANCHOR');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
        this.subscriptions.push(this.ifOpenService.openChange.subscribe((isOpen) => {
            if (isOpen) {
                this.renderer.addClass(this.el.nativeElement, 'active');
            }
            else {
                this.renderer.removeClass(this.el.nativeElement, 'active');
            }
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
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
    { type: Directive, args: [{ selector: '[clrSignpostTrigger]', host: { class: 'signpost-trigger' } },] },
];
/** @nocollapse */
ClrSignpostTrigger.ctorParameters = () => [
    { type: IfOpenService, },
    { type: Renderer2, },
    { type: ElementRef, },
];
ClrSignpostTrigger.propDecorators = {
    "onSignpostTriggerClick": [{ type: HostListener, args: ['click', ['$event'],] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
    constructor() {
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
                <clr-icon shape="info"></clr-icon>
            </button>
        </ng-container>
        
        <ng-content></ng-content>
    `,
                host: { '[class.signpost]': 'true' },
                providers: [IfOpenService, { provide: POPOVER_HOST_ANCHOR, useExisting: ElementRef }],
            },] },
];
/** @nocollapse */
ClrSignpost.propDecorators = {
    "customTrigger": [{ type: ContentChild, args: [ClrSignpostTrigger,] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 *
 * \@description
 * An \@Injectable provider class that enables
 *
 * 1. Managing, track hideability of DatagridColumns
 *
 */
class HideableColumnService {
    constructor() {
        /**
         * *******
         * \@property dgHiddenColumnMap
         *
         * \@description
         * An array of DatagridHideableColumn.
         * NOTE: because we can have columns w/o the *clrDgHideableColumn directive
         * this array will have empty spaces a.k.a nulls. This is needed to be able to map
         * DatagridCells to DatagridColumns in the RowRenderer.
         *
         */
        this._columnList = [];
        /**
         * *******
         *
         * \@property dgHiddenColumnMapChange
         *
         * \@description
         * A behavior subject that can broadcast updates to the column list.
         * NOTE: I am using BehaviorSubject because <clr-dg-column-toggle> is not getting the latest _columnListChange
         * on page load.
         *
         */
        this._columnListChange = new BehaviorSubject(this._columnList);
    }
    /**
     * *******
     *
     * \@property canHideNextColumn
     *
     * \@description
     * Service function that is called by clr-dg-column-toggle component. Use this if you need to ask if you can hide
     * a column. It acts as a guard against hiding all the columns making sure there is at least one column displayed.
     *
     * @return {?}
     */
    get canHideNextColumn() {
        const /** @type {?} */ hiddenColumns = this._columnList.filter(column => column !== undefined).filter(column => column.hidden);
        return this._columnList.length - hiddenColumns.length > 1;
    }
    /**
     * *******
     *
     * \@property checkForAllColumnsVisible
     *
     * \@description
     * For when you need to know if the datagrid's columns are all showing.
     *
     * @return {?}
     */
    get checkForAllColumnsVisible() {
        return !this._columnList.some(column => column && column.hidden);
    }
    /**
     * ********
     * \@property columnListChange
     *
     * \@description
     * A public property that enables subscribers to hear updates to the column map.
     * Use this if you need to do something whenever the Datagrid's column list is changed (i.e *ngIf on a column).
     *
     * @return {?}
     */
    get columnListChange() {
        return this._columnListChange.asObservable();
    }
    /**
     * *******
     *
     * \@description
     * Public function that returns the current list of columns. I needed an array of to iterate on in the RowRenderer
     * but subscribing to the _columnListChange changes did not seem like the correct way to get it.
     *
     * @return {?}
     */
    getColumns() {
        return this._columnList;
    }
    /**
     * *******
     *
     * \@description
     * Iterate through the current _columnList:
     * - if it has a DatagridHideableColumn and is hidden then show it.
     * - if it's DatagridHideableColumn was previously the last column visible, turn that flag off.
     *
     * @return {?}
     */
    showHiddenColumns() {
        this._columnList.forEach(column => {
            if (column && column.hidden === true) {
                column.hidden = false;
            }
            if (column && column.lastVisibleColumn) {
                column.lastVisibleColumn = false;
            }
        });
    }
    /**
     *
     * \@description
     * Creates an array of DatagridHideableColumn's || null based column array passed as param.
     * Is dependent on the order in \@ContentChildren in Datagrid.
     *
     * @param {?} columns
     * @return {?}
     */
    updateColumnList(columns) {
        this._columnList = columns; // clear the list
        this.updateForLastVisibleColumn(); // Update our visibility state for UI
        this._columnListChange.next(this._columnList); // Broadcast it
    }
    /**
     * *******
     *
     * \@description
     * Gets the current visible count for all columns.
     * When it is greater than 1 it marks everything as false for the lastVisibleColumn.
     * When visible count is not > 1 (i.e) 1. , it finds the only column that is not hidden and marks it as the
     * lastVisibleColumn.
     *
     * @return {?}
     */
    updateForLastVisibleColumn() {
        // There is more than one column showing, make sure nothing is marked lastVisibleColumn
        if (this.canHideNextColumn) {
            this._columnList.map(column => {
                if (column && column.lastVisibleColumn) {
                    column.lastVisibleColumn = false;
                }
            });
        }
        else {
            // The visibleCount is down to only one column showing. Find it and flag it as the lastVisibleColumn
            this._columnList.map(column => {
                if (column && !column.hidden) {
                    column.lastVisibleColumn = true;
                }
            });
        }
    }
    /**
     * *******
     *
     * \@description
     * Return a HideableColumn in this._columnList for the given id.
     *
     *
     * @param {?} id
     * @return {?}
     */
    getColumnById(id) {
        if (id) {
            return this._columnList.find(column => column && column.id === id);
        }
        return;
    }
}
HideableColumnService.decorators = [
    { type: Injectable },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ClrDatagridCell {
    /**
     * @param {?} hideableColumnService
     * @param {?} _el
     * @param {?} _renderer
     */
    constructor(hideableColumnService, _el, _renderer) {
        this.hideableColumnService = hideableColumnService;
        this._el = _el;
        this._renderer = _renderer;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set id(value) {
        this._id = value;
        this.mapHideableColumn(this._id);
    }
    /**
     * @param {?} columnId
     * @return {?}
     */
    mapHideableColumn(columnId) {
        if (!columnId) {
            return;
        }
        const /** @type {?} */ hideableColumn = this.hideableColumnService.getColumnById(this._id);
        this.setHiddenClass(hideableColumn.hidden);
        this.hiddenStateSubscription = hideableColumn.hiddenChangeState.subscribe(() => {
            this.setHiddenClass(hideableColumn.hidden);
        });
    }
    /**
     * @param {?} hideableColumnValue
     * @return {?}
     */
    setHiddenClass(hideableColumnValue) {
        if (hideableColumnValue) {
            this._renderer.addClass(this._el.nativeElement, 'datagrid-cell--hidden');
        }
        else {
            this._renderer.removeClass(this._el.nativeElement, 'datagrid-cell--hidden');
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.hiddenStateSubscription) {
            this.hiddenStateSubscription.unsubscribe();
        }
    }
}
ClrDatagridCell.decorators = [
    { type: Component, args: [{
                selector: 'clr-dg-cell',
                template: `
        <ng-content></ng-content>
    `,
                host: { '[class.datagrid-cell]': 'true', '[class.datagrid-signpost-trigger]': 'signpost.length > 0' },
            },] },
];
/** @nocollapse */
ClrDatagridCell.ctorParameters = () => [
    { type: HideableColumnService, },
    { type: ElementRef, },
    { type: Renderer2, },
];
ClrDatagridCell.propDecorators = {
    "signpost": [{ type: ContentChildren, args: [ClrSignpost,] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
let nbSelection = 0;
/** @enum {number} */
const SelectionType = {
    None: 0,
    Single: 1,
    Multi: 2,
};
SelectionType[SelectionType.None] = "None";
SelectionType[SelectionType.Single] = "Single";
SelectionType[SelectionType.Multi] = "Multi";
class Selection {
    /**
     * @param {?} _items
     * @param {?} _filters
     */
    constructor(_items, _filters) {
        this._items = _items;
        this._filters = _filters;
        this.prevSelectionRefs = [];
        this._selectionType = SelectionType.None;
        this.rowSelectionMode = false;
        /**
         * Ignore items changes in the same change detection cycle.
         */
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
        this.subscriptions.push(this._filters.change.subscribe(() => {
            if (!this._selectable) {
                return;
            }
            this.clearSelection();
        }));
        this.subscriptions.push(this._items.allChanges.subscribe(updatedItems => {
            switch (this.selectionType) {
                case SelectionType.None: {
                    break;
                }
                case SelectionType.Single: {
                    let /** @type {?} */ newSingle;
                    const /** @type {?} */ trackBy = this._items.trackBy;
                    let /** @type {?} */ selectionUpdated = false;
                    updatedItems.forEach((item, index) => {
                        const /** @type {?} */ ref = trackBy(index, item);
                        // If one of the updated items is the previously selectedSingle, set it as the new one
                        if (this.prevSingleSelectionRef === ref) {
                            newSingle = item;
                            selectionUpdated = true;
                        }
                    });
                    // Delete the currentSingle if it doesn't exist anymore if we're using smart datagrids
                    // where we expect all items to be present.
                    // No explicit "delete" is required, since it would still be undefined at this point.
                    // Marking it as selectionUpdated will emit the change when the currentSingle is updated below.
                    if (this._items.smart && !newSingle) {
                        selectionUpdated = true;
                    }
                    // TODO: Discussed this with Eudes and this is fine for now.
                    // But we need to figure out a different pattern for the
                    // child triggering the parent change detection problem.
                    // Using setTimeout for now to fix this.
                    setTimeout(() => {
                        if (selectionUpdated) {
                            this.currentSingle = newSingle;
                        }
                    }, 0);
                    break;
                }
                case SelectionType.Multi: {
                    let /** @type {?} */ leftOver = this.current.slice();
                    const /** @type {?} */ trackBy = this._items.trackBy;
                    let /** @type {?} */ selectionUpdated = false;
                    // TODO: revisit this when we work on https://github.com/vmware/clarity/issues/2342
                    // currently, the selection is cleared when filter is applied, so the logic inside
                    // the if statement below results in broken behavior.
                    if (leftOver.length > 0) {
                        updatedItems.forEach((item, index) => {
                            const /** @type {?} */ ref = trackBy(index, item);
                            // Look in current selected refs array if item is selected, and update actual value
                            const /** @type {?} */ selectedIndex = this.prevSelectionRefs.indexOf(ref);
                            if (selectedIndex > -1) {
                                leftOver[selectedIndex] = item;
                                selectionUpdated = true;
                            }
                        });
                        // Filter out any unmatched items if we're using smart datagrids where we expect all items to be
                        // present
                        if (this._items.smart) {
                            leftOver = leftOver.filter(selected => updatedItems.indexOf(selected) > -1);
                            if (this.current.length !== leftOver.length) {
                                selectionUpdated = true;
                            }
                        }
                        // TODO: Discussed this with Eudes and this is fine for now.
                        // But we need to figure out a different pattern for the
                        // child triggering the parent change detection problem.
                        // Using setTimeout for now to fix this.
                        setTimeout(() => {
                            if (selectionUpdated) {
                                this.current = leftOver;
                            }
                        }, 0);
                    }
                    break;
                }
                default: {
                    break;
                }
            }
        }));
    }
    /**
     * @return {?}
     */
    clearSelection() {
        this.current.length = 0;
        this.prevSelectionRefs = [];
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
            this.current = [];
        }
    }
    /**
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
        this.subscriptions.forEach(sub => sub.unsubscribe());
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
            const /** @type {?} */ lookup = this._items.all.findIndex(maybe => maybe === value);
            this.prevSingleSelectionRef = this._items.trackBy(lookup, value);
        }
        this.emitChange();
        // Ignore items changes in the same change detection cycle.
        // @TODO This can likely be removed!
        this.debounce = true;
        setTimeout(() => (this.debounce = false));
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
        this._current = value;
        this.emitChange();
        // Ignore items changes in the same change detection cycle.
        // @TODO This can likely be removed!
        this.debounce = true;
        setTimeout(() => (this.debounce = false));
    }
    /**
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
     * @param {?} item
     * @return {?}
     */
    selectItem(item) {
        this.current.push(item);
        if (this._items.trackBy) {
            // Push selected ref onto array
            const /** @type {?} */ lookup = this._items.all.findIndex(maybe => maybe === item);
            this.prevSelectionRefs.push(this._items.trackBy(lookup, item));
        }
    }
    /**
     * Deselects an item
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
                const /** @type {?} */ index = this.current.indexOf(item);
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
        const /** @type {?} */ displayedItems = this._items.displayed;
        const /** @type {?} */ nbDisplayed = this._items.displayed.length;
        if (nbDisplayed < 1) {
            return false;
        }
        const /** @type {?} */ temp = displayedItems.filter(item => this.current.indexOf(item) > -1);
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
            this._items.displayed.forEach(item => {
                const /** @type {?} */ currentIndex = this.current.indexOf(item);
                if (currentIndex > -1) {
                    this.deselectItem(currentIndex);
                }
            });
        }
        else {
            this._items.displayed.forEach(item => {
                if (this.current.indexOf(item) < 0) {
                    this.selectItem(item);
                }
            });
        }
        this.emitChange();
    }
}
Selection.decorators = [
    { type: Injectable },
];
/** @nocollapse */
Selection.ctorParameters = () => [
    { type: Items, },
    { type: FiltersProvider, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
let nbRow = 0;
class ClrDatagridRow {
    /**
     * @param {?} selection
     * @param {?} rowActionService
     * @param {?} globalExpandable
     * @param {?} expand
     * @param {?} hideableColumnService
     */
    constructor(selection, rowActionService, globalExpandable, expand, hideableColumnService) {
        this.selection = selection;
        this.rowActionService = rowActionService;
        this.globalExpandable = globalExpandable;
        this.expand = expand;
        this.hideableColumnService = hideableColumnService;
        this.SELECTION_TYPE = SelectionType;
        this.ENTER_KEY_CODE = 13;
        this.SPACE_KEY_CODE = 32;
        this._selected = false;
        this.selectedChanged = new EventEmitter(false);
        this.expandedChange = new EventEmitter(false);
        this.id = 'clr-dg-row' + nbRow++;
        this.role = selection.rowSelectionMode ? 'button' : null;
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
    toggleSelection() {
        if (!this.selection.rowSelectionMode) {
            return;
        }
        switch (this.selection.selectionType) {
            case SelectionType.None:
                break;
            case SelectionType.Single:
                this.selection.currentSingle = this.item;
                break;
            case SelectionType.Multi:
                this.toggle();
                break;
            default:
                break;
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    keypress(event) {
        if (!this.selection.rowSelectionMode) {
            return;
        }
        // Check to see if space or enter were pressed
        if (event.keyCode === this.ENTER_KEY_CODE || event.keyCode === this.SPACE_KEY_CODE) {
            // Prevent the default action to stop scrolling when space is pressed
            event.preventDefault();
            this.toggleSelection();
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        // Make sure things get started
        const /** @type {?} */ columnsList = this.hideableColumnService.getColumns();
        this.updateCellsForColumns(columnsList);
        // Triggered when the Cells list changes per row-renderer
        this.dgCells.changes.subscribe(cellList => {
            const /** @type {?} */ columnList = this.hideableColumnService.getColumns();
            if (cellList.length === columnList.length) {
                this.updateCellsForColumns(columnList);
            }
        });
        // Used to set things up the first time but only after all the columns are ready.
        this.subscription = this.hideableColumnService.columnListChange.subscribe(columnList => {
            // Prevents cell updates when cols and cells array are not aligned - only seems to run on init / first time.
            if (columnList.length === this.dgCells.length) {
                this.updateCellsForColumns(columnList);
            }
        });
    }
    /**
     * *******
     *
     * \@description
     * 1. Maps the new columnListChange to the dgCells list by index
     * 2. Sets the hidden state on the cell
     * Take a Column list and use index to access the columns for hideable properties.
     *
     * @param {?} columnList
     * @return {?}
     */
    updateCellsForColumns(columnList) {
        // Map cells to columns with Array.index
        this.dgCells.forEach((cell, index) => {
            const /** @type {?} */ currentColumn = columnList[index]; // Accounts for null space.
            if (currentColumn) {
                cell.id = currentColumn.id;
            }
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
ClrDatagridRow.decorators = [
    { type: Component, args: [{
                selector: 'clr-dg-row',
                template: `
        <div class="datagrid-row-master datagrid-row-flex">
            <clr-dg-cell *ngIf="selection.selectionType === SELECTION_TYPE.Multi"
                         class="datagrid-select datagrid-fixed-column">
                <clr-checkbox [clrChecked]="selected" (clrCheckedChange)="toggle($event)"></clr-checkbox>
            </clr-dg-cell>
            <clr-dg-cell *ngIf="selection.selectionType === SELECTION_TYPE.Single"
                         class="datagrid-select datagrid-fixed-column">
                <div class="radio">
                    <input type="radio" [id]="id" [name]="selection.id + '-radio'" [value]="item"
                           [(ngModel)]="selection.currentSingle" [checked]="selection.currentSingle === item">
                    <label for="{{id}}"></label>
                </div>
            </clr-dg-cell>
            <clr-dg-cell *ngIf="rowActionService.hasActionableRow"
                         class="datagrid-row-actions datagrid-fixed-column">
                <ng-content select="clr-dg-action-overflow"></ng-content>
            </clr-dg-cell>
            <clr-dg-cell *ngIf="globalExpandable.hasExpandableRow"
                         class="datagrid-expandable-caret datagrid-fixed-column">
                <ng-container *ngIf="expand.expandable">
                    <button (click)="toggleExpand()" *ngIf="!expand.loading" type="button" class="datagrid-expandable-caret-button">
                        <clr-icon shape="caret" [attr.dir]="expand.expanded?'down':'right'" class="datagrid-expandable-caret-icon"></clr-icon>
                    </button>
                    <div class="spinner spinner-sm" *ngIf="expand.loading"></div>
                </ng-container>
            </clr-dg-cell>
            <ng-content *ngIf="!expand.replace || !expand.expanded || expand.loading"></ng-content>

            <ng-template *ngIf="expand.replace && expand.expanded && !expand.loading"
                         [ngTemplateOutlet]="detail"></ng-template>
        </div>

        <ng-template *ngIf="!expand.replace && expand.expanded && !expand.loading"
                     [ngTemplateOutlet]="detail"></ng-template>

        <!-- 
            We need the "project into template" hack because we need this in 2 different places
            depending on whether the details replace the row or not.
        -->
        <ng-template #detail>
            <ng-content select="clr-dg-row-detail"></ng-content>
        </ng-template>
    `,
                host: {
                    '[class.datagrid-row]': 'true',
                    '[class.datagrid-selected]': 'selected',
                    '[attr.tabindex]': 'selection.rowSelectionMode ? 0 : null',
                },
                providers: [Expand, { provide: LoadingListener, useExisting: Expand }],
            },] },
];
/** @nocollapse */
ClrDatagridRow.ctorParameters = () => [
    { type: Selection, },
    { type: RowActionService, },
    { type: ExpandableRowsCount, },
    { type: Expand, },
    { type: HideableColumnService, },
];
ClrDatagridRow.propDecorators = {
    "item": [{ type: Input, args: ['clrDgItem',] },],
    "role": [{ type: HostBinding, args: ['attr.role',] },],
    "selected": [{ type: Input, args: ['clrDgSelected',] },],
    "selectedChanged": [{ type: Output, args: ['clrDgSelectedChange',] },],
    "expanded": [{ type: Input, args: ['clrDgExpanded',] },],
    "expandedChange": [{ type: Output, args: ['clrDgExpandedChange',] },],
    "toggleSelection": [{ type: HostListener, args: ['click',] },],
    "keypress": [{ type: HostListener, args: ['keypress', ['$event'],] },],
    "dgCells": [{ type: ContentChildren, args: [ClrDatagridCell,] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ColumnToggleButtonsService {
    constructor() {
        this.buttons = null;
        this.selectAllDisabled = false;
        this._okButtonClicked = new Subject();
        this._selectAllButtonClicked = new Subject();
    }
    /**
     * @return {?}
     */
    get okButtonClicked() {
        return this._okButtonClicked.asObservable();
    }
    /**
     * @return {?}
     */
    get selectAllButtonClicked() {
        return this._selectAllButtonClicked.asObservable();
    }
    /**
     * @param {?} type
     * @return {?}
     */
    buttonClicked(type) {
        switch (type.toLowerCase()) {
            case 'ok':
                this._okButtonClicked.next();
                break;
            case 'selectall':
                this._selectAllButtonClicked.next();
                break;
            default:
                break;
        }
    }
}
ColumnToggleButtonsService.decorators = [
    { type: Injectable },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * This provider aggregates state changes from the various providers of the Datagrid
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
        this.change = this.debouncer.change.pipe(map(() => this.state));
    }
    /**
     * @return {?}
     */
    get state() {
        const /** @type {?} */ state$$1 = {};
        if (this.page.size > 0) {
            state$$1.page = { from: this.page.firstItem, to: this.page.lastItem, size: this.page.size };
        }
        if (this.sort.comparator) {
            if (this.sort.comparator instanceof DatagridPropertyComparator) {
                /*
                                 * Special case for the default object property comparator,
                                 * we give the property name instead of the actual comparator.
                                 */
                state$$1.sort = { by: (/** @type {?} */ (this.sort.comparator)).prop, reverse: this.sort.reverse };
            }
            else {
                state$$1.sort = { by: this.sort.comparator, reverse: this.sort.reverse };
            }
        }
        const /** @type {?} */ activeFilters = this.filters.getActiveFilters();
        if (activeFilters.length > 0) {
            state$$1.filters = [];
            for (const /** @type {?} */ filter$$1 of activeFilters) {
                if (filter$$1 instanceof DatagridStringFilterImpl) {
                    const /** @type {?} */ stringFilter = (/** @type {?} */ (filter$$1)).filterFn;
                    if (stringFilter instanceof DatagridPropertyStringFilter) {
                        /*
                                                 * Special case again for the default object property filter,
                                                 * we give the property name instead of the full filter object.
                                                 */
                        state$$1.filters.push({
                            property: (/** @type {?} */ (stringFilter)).prop,
                            value: (/** @type {?} */ (filter$$1)).value,
                        });
                        continue;
                    }
                }
                state$$1.filters.push(filter$$1);
            }
        }
        return state$$1;
    }
}
StateProvider.decorators = [
    { type: Injectable },
];
/** @nocollapse */
StateProvider.ctorParameters = () => [
    { type: FiltersProvider, },
    { type: Sort, },
    { type: Page, },
    { type: StateDebouncer, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ClrDatagrid {
    /**
     * @param {?} columnService
     * @param {?} organizer
     * @param {?} items
     * @param {?} expandableRows
     * @param {?} selection
     * @param {?} rowActionService
     * @param {?} stateProvider
     */
    constructor(columnService, organizer, items, expandableRows, selection, rowActionService, stateProvider) {
        this.columnService = columnService;
        this.organizer = organizer;
        this.items = items;
        this.expandableRows = expandableRows;
        this.selection = selection;
        this.rowActionService = rowActionService;
        this.stateProvider = stateProvider;
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
        this.selection.current = value;
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
     * Selection/Deselection on row click mode
     * @param {?} value
     * @return {?}
     */
    set rowSelectionMode(value) {
        this.selection.rowSelectionMode = value;
    }
    /**
     * stay backwards compatible , will be renamed to clrDgRowSelection
     * @deprecated since 0.12
     * @param {?} value
     * @return {?}
     */
    set rowSelectionModeDeprecated(value) {
        this.rowSelectionMode = value;
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
        this._subscriptions.push(this.rows.changes.subscribe(() => {
            if (!this.items.smart) {
                this.items.all = this.rows.map((row) => row.item);
            }
        }));
        if (!this.items.smart) {
            this.items.all = this.rows.map((row) => row.item);
        }
        this._subscriptions.push(this.columns.changes.subscribe((columns) => {
            this.columnService.updateColumnList(this.columns.map(col => col.hideable));
        }));
        // Get ColumnService ready for HideableColumns.
        this.columnService.updateColumnList(this.columns.map(col => col.hideable));
    }
    /**
     * Our setup happens in the view of some of our components, so we wait for it to be done before starting
     * @return {?}
     */
    ngAfterViewInit() {
        // TODO: determine if we can get rid of provider wiring in view init so that subscriptions can be done earlier
        this.refresh.emit(this.stateProvider.state);
        this._subscriptions.push(this.stateProvider.change.subscribe(state$$1 => this.refresh.emit(state$$1)));
        this._subscriptions.push(this.selection.change.subscribe(s => {
            if (this.selection.selectionType === SelectionType.Single) {
                this.singleSelectedChanged.emit(s);
            }
            else if (this.selection.selectionType === SelectionType.Multi) {
                this.selectedChanged.emit(s);
            }
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._subscriptions.forEach((sub) => sub.unsubscribe());
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
                template: `<!--
  ~ Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
  ~ This software is released under MIT license.
  ~ The full license information can be found in LICENSE in the root directory of this project.
  -->

<ng-content select="clr-dg-action-bar"></ng-content>
<div class="datagrid-overlay-wrapper">
    <div class="datagrid-scroll-wrapper">
        <div class="datagrid" #datagrid>
            <clr-dg-table-wrapper class="datagrid-table-wrapper">
                <div clrDgHead class="datagrid-head">
                    <div class="datagrid-row datagrid-row-flex">
                        <!-- header for datagrid where you can select multiple rows -->
                        <div class="datagrid-column datagrid-select datagrid-fixed-column"
                             *ngIf="selection.selectionType === SELECTION_TYPE.Multi">
                        <span class="datagrid-column-title">
                            <clr-checkbox [(ngModel)]="allSelected"></clr-checkbox>
                        </span>
                            <div class="datagrid-column-separator"></div>
                        </div>
                        <!-- header for datagrid where you can select one row only -->
                        <div class="datagrid-column datagrid-select datagrid-fixed-column"
                             *ngIf="selection.selectionType === SELECTION_TYPE.Single">
                            <div class="datagrid-column-separator"></div>
                        </div>
                        <!-- header for single row action; only display if we have at least one actionable row in datagrid -->
                        <div class="datagrid-column datagrid-row-actions datagrid-fixed-column"
                             *ngIf="rowActionService.hasActionableRow">
                            <div class="datagrid-column-separator"></div>
                        </div>
                        <!-- header for carets; only display if we have at least one expandable row in datagrid -->
                        <div class="datagrid-column datagrid-expandable-caret datagrid-fixed-column"
                             *ngIf="expandableRows.hasExpandableRow">
                            <div class="datagrid-column-separator"></div>
                        </div>
                        <ng-content select="clr-dg-column"></ng-content>
                    </div>
                </div>

                <ng-template *ngIf="iterator"
                             ngFor [ngForOf]="items.displayed" [ngForTrackBy]="items.trackBy"
                             [ngForTemplate]="iterator.template"></ng-template>
                <ng-content *ngIf="!iterator"></ng-content>

                <!-- Custom placeholder overrides the default empty one -->
                <ng-content select="clr-dg-placeholder"></ng-content>
                <clr-dg-placeholder *ngIf="!placeholder"></clr-dg-placeholder>
            </clr-dg-table-wrapper>

            <!--
                This is not inside the table because there is no good way of having a single column span
                everything when using custom elements with display:table-cell.
            -->
            <ng-content select="clr-dg-footer"></ng-content>
        </div>
    </div>
    <div class="datagrid-spinner" *ngIf="loading">
        <div class="spinner">Loading...</div>
    </div>
</div>
`,
                providers: [
                    Selection,
                    Sort,
                    FiltersProvider,
                    Page,
                    Items,
                    DatagridRenderOrganizer,
                    RowActionService,
                    ExpandableRowsCount,
                    HideableColumnService,
                    StateDebouncer,
                    StateProvider,
                    ColumnToggleButtonsService,
                ],
                host: { '[class.datagrid-host]': 'true' },
            },] },
];
/** @nocollapse */
ClrDatagrid.ctorParameters = () => [
    { type: HideableColumnService, },
    { type: DatagridRenderOrganizer, },
    { type: Items, },
    { type: ExpandableRowsCount, },
    { type: Selection, },
    { type: RowActionService, },
    { type: StateProvider, },
];
ClrDatagrid.propDecorators = {
    "loading": [{ type: Input, args: ['clrDgLoading',] },],
    "refresh": [{ type: Output, args: ['clrDgRefresh',] },],
    "iterator": [{ type: ContentChild, args: [ClrDatagridItems,] },],
    "selected": [{ type: Input, args: ['clrDgSelected',] },],
    "selectedChanged": [{ type: Output, args: ['clrDgSelectedChange',] },],
    "singleSelected": [{ type: Input, args: ['clrDgSingleSelected',] },],
    "singleSelectedChanged": [{ type: Output, args: ['clrDgSingleSelectedChange',] },],
    "rowSelectionMode": [{ type: Input, args: ['clrDgRowSelection',] },],
    "rowSelectionModeDeprecated": [{ type: Input, args: ['clDgRowSelection',] },],
    "placeholder": [{ type: ContentChild, args: [ClrDatagridPlaceholder,] },],
    "columns": [{ type: ContentChildren, args: [ClrDatagridColumn,] },],
    "rows": [{ type: ContentChildren, args: [ClrDatagridRow,] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ClrDatagridActionBar {
}
ClrDatagridActionBar.decorators = [
    { type: Component, args: [{
                selector: 'clr-dg-action-bar',
                template: `
        <ng-content></ng-content>
    `,
                host: { '[class.datagrid-action-bar]': 'true' },
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ClrDatagridActionOverflow {
    /**
     * @param {?} rowActionService
     */
    constructor(rowActionService) {
        this.rowActionService = rowActionService;
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
        const /** @type {?} */ boolOpen = !!open;
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
            <clr-icon shape="ellipsis-vertical"></clr-icon>
        </button>
        <ng-template [(clrPopoverOld)]="open" [clrPopoverOldAnchor]="anchor" [clrPopoverOldAnchorPoint]="anchorPoint"
                     [clrPopoverOldPopoverPoint]="popoverPoint">
            <div #menu class="datagrid-action-overflow" (clrOutsideClick)="close($event)" [clrStrict]="true">
                <ng-content></ng-content>
            </div>
        </ng-template>
    `,
            },] },
];
/** @nocollapse */
ClrDatagridActionOverflow.ctorParameters = () => [
    { type: RowActionService, },
];
ClrDatagridActionOverflow.propDecorators = {
    "open": [{ type: Input, args: ['clrDgActionOverflowOpen',] },],
    "openChanged": [{ type: Output, args: ['clrDgActionOverflowOpenChange',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ClrDatagridColumnToggleButton {
    /**
     * @param {?} toggleButtons
     */
    constructor(toggleButtons) {
        this.toggleButtons = toggleButtons;
    }
    /**
     * @return {?}
     */
    getClasses() {
        let /** @type {?} */ classes = 'btn ';
        if (this.isOk()) {
            classes += 'btn-primary';
        }
        else {
            classes += 'btn-sm btn-link p6 text-uppercase';
        }
        return classes;
    }
    /**
     * @return {?}
     */
    isOk() {
        return this.clrType === 'ok';
    }
    /**
     * @return {?}
     */
    click() {
        this.toggleButtons.buttonClicked(this.clrType);
    }
}
ClrDatagridColumnToggleButton.decorators = [
    { type: Component, args: [{
                selector: 'clr-dg-column-toggle-button',
                template: `
        <button
            (click)="click()"
            [disabled]="toggleButtons.selectAllDisabled && !isOk()"
            [ngClass]="getClasses()"
            type="button">
            <ng-content></ng-content>
        </button>
    `,
                host: { '[class.action-right]': 'isOk()' },
            },] },
];
/** @nocollapse */
ClrDatagridColumnToggleButton.ctorParameters = () => [
    { type: ColumnToggleButtonsService, },
];
ClrDatagridColumnToggleButton.propDecorators = {
    "clrType": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ClrDatagridColumnToggleTitle {
}
ClrDatagridColumnToggleTitle.decorators = [
    { type: Component, args: [{
                selector: 'clr-dg-column-toggle-title',
                template: `<ng-content></ng-content>`,
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ClrDatagridColumnToggle {
    /**
     * @param {?} hideableColumnService
     * @param {?} columnToggleButtons
     */
    constructor(hideableColumnService, columnToggleButtons) {
        this.hideableColumnService = hideableColumnService;
        this.columnToggleButtons = columnToggleButtons;
        this.subscriptions = [];
        /**
         *
         * Popover init
         */
        this.anchorPoint = Point.TOP_LEFT;
        this.popoverPoint = Point.LEFT_BOTTOM;
        this.open = false;
        /**
         * *
         * DatagridHideableColumnModel init
         */
        this.columns = [];
    }
    /**
     * @return {?}
     */
    get allColumnsVisible() {
        return this._allColumnsVisible;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set allColumnsVisible(value) {
        this._allColumnsVisible = value;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.subscriptions.push(this.hideableColumnService.columnListChange.subscribe(columnList => {
            // Reset the list of columns
            this.columns.length = 0;
            this.hideableColumnService.updateForLastVisibleColumn();
            this.allColumnsVisible = this.hideableColumnService.checkForAllColumnsVisible;
            this.columnToggleButtons.selectAllDisabled = this.allColumnsVisible;
            // Add only the hidden columns to the toggler.
            columnList.forEach(col => {
                if (col) {
                    this.columns.push(col);
                }
            });
        }));
        this.subscriptions.push(this.columnToggleButtons.okButtonClicked.subscribe(() => {
            this.toggleUI();
        }));
        this.subscriptions.push(this.columnToggleButtons.selectAllButtonClicked.subscribe(() => {
            this.selectAll();
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
    /**
     * @return {?}
     */
    selectAll() {
        this.hideableColumnService.showHiddenColumns();
        this.allColumnsVisible = this.hideableColumnService.checkForAllColumnsVisible;
    }
    /**
     * @param {?} event
     * @param {?} column
     * @return {?}
     */
    toggleColumn(event, column) {
        column.hidden = !event;
        this.allColumnsVisible = this.hideableColumnService.checkForAllColumnsVisible;
        this.columnToggleButtons.selectAllDisabled = this.allColumnsVisible;
        this.hideableColumnService.updateForLastVisibleColumn();
    }
    /**
     * @return {?}
     */
    toggleUI() {
        this.open = !this.open;
    }
}
ClrDatagridColumnToggle.decorators = [
    { type: Component, args: [{
                selector: 'clr-dg-column-toggle',
                template: `
        <button
                #anchor
                (click)="toggleUI()"
                class="btn btn-sm btn-link column-toggle--action"
                type="button">
            <clr-icon shape="view-columns"></clr-icon>
        </button>
        <div class="column-switch"
             *clrPopoverOld="open; anchor: anchor; anchorPoint: anchorPoint; popoverPoint: popoverPoint">
            <div class="switch-header">
                <ng-container *ngIf="!title">Show Columns</ng-container>
                <ng-content select="clr-dg-column-toggle-title"></ng-content>
                <button
                    class="btn btn-sm btn-link"
                    (click)="toggleUI()"
                    type="button">
                    <clr-icon
                            shape="close"></clr-icon>
                </button>
            </div>
            <ul class="switch-content list-unstyled">
                <li *ngFor="let column of columns">
                    <clr-checkbox [clrChecked]="!column.hidden"
                                  [clrDisabled]="column.lastVisibleColumn"
                                  (clrCheckedChange)="toggleColumn($event, column)">
                        <ng-template [ngTemplateOutlet]="column.template"></ng-template>
                    </clr-checkbox>
                </li>
            </ul>
            <div class="switch-footer" *ngIf="buttons.length > 0">
                <ng-content select="clr-dg-column-toggle-button"></ng-content>
            </div>
            <div class="switch-footer" *ngIf="buttons.length === 0">
                <div>
                    <button
                            class="btn btn-sm btn-link p6 text-uppercase"
                            [disabled]="allColumnsVisible"
                            (click)="selectAll()"
                            type="button">Select All
                    </button>
                </div>
                <div class="action-right">
                    <button
                            (click)="toggleUI()"
                            class="btn btn-primary"
                            type="button">
                        Ok
                    </button>
                </div>
            </div>
        </div>
    `,
                host: { '[class.column-switch-wrapper]': 'true', '[class.active]': 'open' },
            },] },
];
/** @nocollapse */
ClrDatagridColumnToggle.ctorParameters = () => [
    { type: HideableColumnService, },
    { type: ColumnToggleButtonsService, },
];
ClrDatagridColumnToggle.propDecorators = {
    "title": [{ type: ContentChild, args: [ClrDatagridColumnToggleTitle,] },],
    "buttons": [{ type: ContentChildren, args: [ClrDatagridColumnToggleButton,] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
    { type: Directive, args: [{ selector: '[clrIfExpanded]' },] },
];
/** @nocollapse */
DatagridDetailRegisterer.ctorParameters = () => [
    { type: ExpandableRowsCount, decorators: [{ type: Optional },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ClrDatagridFooter {
    /**
     * @param {?} selection
     * @param {?} hideableColumnService
     * @param {?} cdr
     */
    constructor(selection, hideableColumnService, cdr) {
        this.selection = selection;
        this.hideableColumnService = hideableColumnService;
        this.cdr = cdr;
        this.subscriptions = [];
        this.SELECTION_TYPE = SelectionType;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.subscriptions.push(this.hideableColumnService.columnListChange.subscribe(change => {
            const /** @type {?} */ hiddenColumnsInSub = change.filter(col => col);
            if (hiddenColumnsInSub.length > 0) {
                this.activeToggler = true;
            }
        }));
        const /** @type {?} */ hiddenColumns = this.hideableColumnService.getColumns().filter(col => col);
        if (hiddenColumns.length > 0) {
            this.activeToggler = true;
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscriptions.forEach(sub => {
            sub.unsubscribe();
        });
    }
}
ClrDatagridFooter.decorators = [
    { type: Component, args: [{
                selector: 'clr-dg-footer',
                template: `
        <ng-container
            *ngIf="(selection.selectionType === SELECTION_TYPE.Multi) && (selection.current.length > 0)">
            <clr-checkbox [clrDisabled]="true" [clrChecked]="true" class="datagrid-foot-select">
                {{selection.current.length}}
            </clr-checkbox>
        </ng-container>
        <ng-content select="clr-dg-column-toggle"></ng-content>
        <clr-dg-column-toggle *ngIf="!toggle && activeToggler"></clr-dg-column-toggle>
        <div class="datagrid-foot-description">
            <ng-content></ng-content>
        </div>
        <ng-content select="clr-dg-pagination"></ng-content>
    `,
                host: {
                    '[class.datagrid-foot]': 'true',
                },
            },] },
];
/** @nocollapse */
ClrDatagridFooter.ctorParameters = () => [
    { type: Selection, },
    { type: HideableColumnService, },
    { type: ChangeDetectorRef, },
];
ClrDatagridFooter.propDecorators = {
    "toggle": [{ type: ContentChild, args: [ClrDatagridColumnToggle,] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 *
 * \@description
 * A utility class for that adds hide/show functionality to a column, its cells and enables a toggler in the
 * DatagridColumnToggle Component.
 *
 */
class DatagridHideableColumnModel {
    /**
     *
     * \@description
     * The init function for DatagridHideableColumnModel instances that does the following:
     *
     * 1. Set values for the private variables that enable a hideable column
     * 2. Broadcast the next hidden change for anyone (already) subscribed to this DatagridHideableColumnModel
     * TODO: Debug and verify that #2 is really necessary.
     *
     * @param {?} _template
     * @param {?} _id
     * @param {?=} _hidden
     */
    constructor(_template, _id, _hidden = false) {
        this._template = _template;
        this._id = _id;
        this._hidden = _hidden;
        /**
         * \@property hiddenChanges
         *
         * \@description
         * A stream of state changes an instance of DatagridHideableColumnModel will broadcast to subscribers.
         *
         */
        this.hiddenChangesState = new Subject();
        this.lastVisibleColumn = false;
    }
    /**
     *
     * \@description
     * A getter function that returns an TemplateRef of the DatagridColumn that is hideable. This is currently used to
     * populate the DatagridColumnToggle UI with the correct Column name.
     *
     * @return {?}
     */
    get template() {
        return this._template;
    }
    /**
     *
     * \@description
     * public function that returns the id of a HideableCOlumn instance. Used by the HideableCOlumnService for passing
     * state and actions between DateGridColumns, DataGridCells & the DatagridColumnToggle Components.
     *
     * @return {?}
     */
    get id() {
        return this._id;
    }
    /**
     *
     * \@description
     * A getter that returns the hidden value of a DatagridHideableColumnModel instance.
     * TODO: debug and make sure you really need this since we have the hiddenCHanges observable.
     *
     * @return {?}
     */
    get hidden() {
        return this._hidden;
    }
    /**
     *
     * \@description
     * The setter for setting the hidden state of a DatagridHideableColumnModel instance.
     * It also broadcasts the change after its set.
     *
     * @param {?} value
     * @return {?}
     */
    set hidden(value) {
        if (this._hidden === value) {
            return;
        }
        this._hidden = value;
        this.hiddenChangesState.next(value);
    }
    /**
     *
     * \@description
     * An Observable for the HideableColumns hidden changes.
     *
     * @return {?}
     */
    get hiddenChangeState() {
        return this.hiddenChangesState.asObservable();
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
     * \@description
     * Used the DatagridColumn to get and set an id for this HiddenColumn
     *
     * @param {?} templateRef
     * @param {?} viewContainerRef
     * @param {?} dgColumn
     */
    constructor(templateRef, viewContainerRef, dgColumn) {
        this.templateRef = templateRef;
        this.viewContainerRef = viewContainerRef;
        this.dgColumn = dgColumn;
        this.columnId = dgColumn.columnId;
        // Use the templateRef to create this view
        this.viewContainerRef.createEmbeddedView(this.templateRef);
        // Create instance of the utility class DatagridHideableColumn.
        // Note this is on the parent instance of DatagridColumn.
        this.dgColumn.hideable = new DatagridHideableColumnModel(this.templateRef, this.columnId, this._hidden);
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
        this._hidden = value && value.hidden ? value.hidden : false;
        if (this.dgColumn.hideable) {
            this.dgColumn.hideable.hidden = value && value.hidden ? value.hidden : false;
        }
    }
}
ClrDatagridHideableColumn.decorators = [
    { type: Directive, args: [{ selector: '[clrDgHideableColumn]' },] },
];
/** @nocollapse */
ClrDatagridHideableColumn.ctorParameters = () => [
    { type: TemplateRef, },
    { type: ViewContainerRef, },
    { type: ClrDatagridColumn, },
];
ClrDatagridHideableColumn.propDecorators = {
    "clrDgHideableColumn": [{ type: Input, args: ['clrDgHideableColumn',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
            },] },
];
/** @nocollapse */
ClrDatagridItemsTrackBy.ctorParameters = () => [
    { type: Items, decorators: [{ type: Optional },] },
];
ClrDatagridItemsTrackBy.propDecorators = {
    "trackBy": [{ type: Input, args: ['ngForTrackBy',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ClrDatagridPagination {
    /**
     * @param {?} page
     */
    constructor(page) {
        this.page = page;
        this.currentChanged = new EventEmitter(false);
        /*
                 * Default page size is 10.
                 * The reason we set it in this constructor and not in the provider itself is because
                 * we don't want pagination (page size 0) if this component isn't present in the datagrid.
                 */
        page.size = 10;
    }
    /**
     * *******
     * Subscription to the Page service for page changes.
     * Note: this only emits after the datagrid is initialized/stabalized and the page changes.
     * @return {?}
     */
    ngOnInit() {
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
        const /** @type {?} */ middlePages = [];
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
                    type="button">{{pageNum}}</button>
                <ng-template #noButton>{{pageNum}}</ng-template>
            </li>
            <li *ngIf="page.current < page.last - 2">...</li>
            <li *ngIf="page.current < page.last - 1">
                <button 
                    (click)="page.current = page.last"
                    type="button">{{page.last}}</button>
            </li>
            <li *ngIf="page.current < page.last">
                <button 
                    class="pagination-next" 
                    (click)="page.next()"
                    type="button"></button>
            </li>
        </ul>
    `,
                host: { '[class.pagination]': 'true' },
            },] },
];
/** @nocollapse */
ClrDatagridPagination.ctorParameters = () => [
    { type: Page, },
];
ClrDatagridPagination.propDecorators = {
    "pageSize": [{ type: Input, args: ['clrDgPageSize',] },],
    "totalItems": [{ type: Input, args: ['clrDgTotalItems',] },],
    "lastPage": [{ type: Input, args: ['clrDgLastPage',] },],
    "currentPage": [{ type: Input, args: ['clrDgPage',] },],
    "currentChanged": [{ type: Output, args: ['clrDgPageChange',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generic bland container serving various purposes for Datagrid.
 * For instance, it can help span a text over multiple rows in detail view.
 */
class ClrDatagridRowDetail {
    /**
     * @param {?} selection
     * @param {?} rowActionService
     * @param {?} expand
     * @param {?} hideableColumnService
     */
    constructor(selection, rowActionService, expand, hideableColumnService) {
        this.selection = selection;
        this.rowActionService = rowActionService;
        this.expand = expand;
        this.hideableColumnService = hideableColumnService;
        this.SELECTION_TYPE = SelectionType;
        /**
         * Subscriptions to all the services and QueryList changes
         */
        this._subscriptions = [];
    }
    /**
     * @return {?}
     */
    get replace() {
        return this.expand.replace;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set replace(value) {
        this.expand.replace = !!value;
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        const /** @type {?} */ columnsList = this.hideableColumnService.getColumns();
        this.updateCellsForColumns(columnsList);
        // Triggered when the Cells list changes per row-renderer
        this._subscriptions.push(this.cells.changes.subscribe(cellList => {
            const /** @type {?} */ columnList = this.hideableColumnService.getColumns();
            if (cellList.length === columnList.length) {
                this.updateCellsForColumns(columnList);
            }
        }));
        // Used to set things up the first time but only after all the columns are ready.
        this._subscriptions.push(this.hideableColumnService.columnListChange.subscribe(columnList => {
            // Prevents cell updates when cols and cells array are not aligned
            if (columnList.length === this.cells.length) {
                this.updateCellsForColumns(columnList);
            }
        }));
    }
    /**
     * @param {?} columnList
     * @return {?}
     */
    updateCellsForColumns(columnList) {
        this.cells.forEach((cell, index) => {
            const /** @type {?} */ currentColumn = columnList[index]; // Accounts for null space.
            if (currentColumn) {
                cell.id = currentColumn.id;
            }
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._subscriptions.forEach((sub) => sub.unsubscribe());
    }
}
ClrDatagridRowDetail.decorators = [
    { type: Component, args: [{
                selector: 'clr-dg-row-detail',
                template: `
        <ng-container *ngIf="!replace">
            <clr-dg-cell class="datagrid-fixed-column"
                *ngIf="selection.selectionType === SELECTION_TYPE.Multi 
                    || selection.selectionType === SELECTION_TYPE.Single"></clr-dg-cell>
            <clr-dg-cell *ngIf="rowActionService.hasActionableRow" class="datagrid-fixed-column"></clr-dg-cell>
            <clr-dg-cell class="datagrid-fixed-column"></clr-dg-cell>
        </ng-container>
        <ng-content></ng-content>
    `,
                host: {
                    '[class.datagrid-row-flex]': 'true',
                    '[class.datagrid-row-detail]': '!replace',
                    '[class.datagrid-container]': 'cells.length === 0',
                },
            },] },
];
/** @nocollapse */
ClrDatagridRowDetail.ctorParameters = () => [
    { type: Selection, },
    { type: RowActionService, },
    { type: Expand, },
    { type: HideableColumnService, },
];
ClrDatagridRowDetail.propDecorators = {
    "cells": [{ type: ContentChildren, args: [ClrDatagridCell,] },],
    "replace": [{ type: Input, args: ['clrDgReplace',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DatagridBodyRenderer {
    /**
     * @param {?} el
     * @param {?} organizer
     * @param {?} domAdapter
     */
    constructor(el, organizer, domAdapter) {
        this.el = el;
        this.organizer = organizer;
        this.domAdapter = domAdapter;
        this.subscription = organizer.scrollbar.subscribe(() => this.computeScrollbarWidth());
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    /**
     * @return {?}
     */
    computeScrollbarWidth() {
        this.organizer.scrollbarWidth.next(this.domAdapter.scrollBarWidth(this.el.nativeElement));
    }
}
DatagridBodyRenderer.decorators = [
    { type: Directive, args: [{ selector: '[clrDgBody]' },] },
];
/** @nocollapse */
DatagridBodyRenderer.ctorParameters = () => [
    { type: ElementRef, },
    { type: DatagridRenderOrganizer, },
    { type: DomAdapter, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const NO_LAYOUT_CLASS = 'datagrid-no-layout';
const COMPUTE_WIDTH_CLASS = 'datagrid-computing-columns-width';
const STRICT_WIDTH_CLASS = 'datagrid-fixed-width';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
        this.subscription = organizer.clearWidths.subscribe(() => this.clearWidth());
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    /**
     * @return {?}
     */
    clearWidth() {
        this.renderer.removeClass(this.el.nativeElement, STRICT_WIDTH_CLASS);
        this.renderer.setStyle(this.el.nativeElement, 'width', null);
    }
    /**
     * @param {?} strict
     * @param {?} value
     * @return {?}
     */
    setWidth(strict, value) {
        if (strict) {
            this.renderer.addClass(this.el.nativeElement, STRICT_WIDTH_CLASS);
        }
        else {
            this.renderer.removeClass(this.el.nativeElement, STRICT_WIDTH_CLASS);
        }
        this.renderer.setStyle(this.el.nativeElement, 'width', value + 'px');
    }
}
DatagridCellRenderer.decorators = [
    { type: Directive, args: [{ selector: 'clr-dg-cell' },] },
];
/** @nocollapse */
DatagridCellRenderer.ctorParameters = () => [
    { type: ElementRef, },
    { type: Renderer2, },
    { type: DatagridRenderOrganizer, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class DatagridColumnResizer {
    /**
     * @param {?} el
     * @param {?} renderer
     * @param {?} organizer
     * @param {?} domAdapter
     * @param {?} dragDispatcher
     */
    constructor(el, renderer, organizer, domAdapter, dragDispatcher) {
        this.renderer = renderer;
        this.organizer = organizer;
        this.domAdapter = domAdapter;
        this.dragDispatcher = dragDispatcher;
        this.columnResizeBy = 0;
        this.dragWithinMinWidth = false;
        this.resizeEmitter = new EventEmitter();
        this.subscriptions = [];
        this.columnEl = el.nativeElement;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.dragDispatcher.destroy();
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.handleTrackerEl = this.dragDispatcher.handleTrackerRef.nativeElement;
        this.dragDispatcher.addDragListener();
        this.subscriptions.push(this.dragDispatcher.onDragStart.subscribe(() => this.dragStartHandler()));
        this.subscriptions.push(this.dragDispatcher.onDragMove.subscribe($event => this.dragMoveHandler($event)));
        this.subscriptions.push(this.dragDispatcher.onDragEnd.subscribe(() => this.dragEndHandler()));
    }
    /**
     * @return {?}
     */
    dragStartHandler() {
        if (!this.columnMinWidth) {
            // sets the min width only on the very first drag attempt
            this.columnMinWidth = this.domAdapter.minWidth(this.columnEl);
        }
        this.renderer.setStyle(this.handleTrackerEl, 'display', 'block');
        this.renderer.setStyle(document.body, 'cursor', 'col-resize');
        this.dragDistancePositionX = 0;
        this.columnRectWidth = this.domAdapter.clientRectWidth(this.columnEl);
        this.pageStartPositionX = this.domAdapter.clientRectRight(this.columnEl);
    }
    /**
     * @param {?} moveEvent
     * @return {?}
     */
    dragMoveHandler(moveEvent) {
        const /** @type {?} */ pageMovePosition = moveEvent.pageX || moveEvent.changedTouches[0].pageX;
        this.dragDistancePositionX = this.getPositionWithinMax(pageMovePosition - this.pageStartPositionX);
        this.renderer.setStyle(this.handleTrackerEl, 'right', -1 * this.dragDistancePositionX + 'px');
    }
    /**
     * @return {?}
     */
    dragEndHandler() {
        this.renderer.setStyle(this.handleTrackerEl, 'right', '0px');
        this.renderer.setStyle(this.handleTrackerEl, 'display', 'none');
        this.renderer.setStyle(document.body, 'cursor', 'auto');
        if (this.dragDistancePositionX) {
            this.columnResizeBy = this.dragDistancePositionX;
            this.resizeEmitter.emit(this.columnRectWidth + this.columnResizeBy);
            this.organizer.resize();
        }
    }
    /**
     * @param {?} draggedDistance
     * @return {?}
     */
    getPositionWithinMax(draggedDistance) {
        if (draggedDistance < 0) {
            if (Math.abs(draggedDistance) < this.columnRectWidth - this.columnMinWidth) {
                if (this.dragWithinMinWidth) {
                    this.dragWithinMinWidth = false;
                    this.renderer.removeClass(this.handleTrackerEl, 'exceeded-max');
                }
                return draggedDistance;
            }
            else {
                if (!this.dragWithinMinWidth) {
                    this.dragWithinMinWidth = true;
                    this.renderer.addClass(this.handleTrackerEl, 'exceeded-max');
                }
                return this.columnMinWidth - this.columnRectWidth;
            }
        }
        else {
            if (this.dragWithinMinWidth) {
                this.dragWithinMinWidth = false;
                this.renderer.removeClass(this.handleTrackerEl, 'exceeded-max');
            }
            return draggedDistance;
        }
    }
}
DatagridColumnResizer.decorators = [
    { type: Directive, args: [{ selector: 'clr-dg-column', providers: [DragDispatcher] },] },
];
/** @nocollapse */
DatagridColumnResizer.ctorParameters = () => [
    { type: ElementRef, },
    { type: Renderer2, },
    { type: DatagridRenderOrganizer, },
    { type: DomAdapter, },
    { type: DragDispatcher, },
];
DatagridColumnResizer.propDecorators = {
    "resizeEmitter": [{ type: Output, args: ['clrDgColumnResize',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DatagridHeadRenderer {
    /**
     * @param {?} el
     * @param {?} renderer
     * @param {?} organizer
     */
    constructor(el, renderer, organizer) {
        this.el = el;
        this.renderer = renderer;
        this.subscription = organizer.scrollbarWidth.subscribe(width => this.accountForScrollbar(width));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    /**
     * @param {?} width
     * @return {?}
     */
    accountForScrollbar(width) {
        this.renderer.setStyle(this.el.nativeElement, 'padding-right', width + 'px');
    }
}
DatagridHeadRenderer.decorators = [
    { type: Directive, args: [{ selector: '[clrDgHead]' },] },
];
/** @nocollapse */
DatagridHeadRenderer.ctorParameters = () => [
    { type: ElementRef, },
    { type: Renderer2, },
    { type: DatagridRenderOrganizer, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DatagridHeaderRenderer {
    /**
     * @param {?} el
     * @param {?} renderer
     * @param {?} organizer
     * @param {?} domAdapter
     * @param {?} columnResizer
     */
    constructor(el, renderer, organizer, domAdapter, columnResizer) {
        this.el = el;
        this.renderer = renderer;
        this.domAdapter = domAdapter;
        this.columnResizer = columnResizer;
        this.subscriptions = [];
        this.widthSet = false;
        this.subscriptions.push(organizer.clearWidths.subscribe(() => this.clearWidth()));
        this.subscriptions.push(organizer.detectStrictWidths.subscribe(() => this.detectStrictWidth()));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
    /**
     * @return {?}
     */
    clearWidth() {
        // remove the width only if we set it, and it is not changed by dragging.
        if (this.widthSet && !this.columnResizer.columnResizeBy) {
            this.renderer.setStyle(this.el.nativeElement, 'width', null);
        }
    }
    /**
     * @return {?}
     */
    detectStrictWidth() {
        if (this.columnResizer.columnResizeBy) {
            this.strictWidth = this.columnResizer.columnRectWidth + this.columnResizer.columnResizeBy;
        }
        else {
            this.strictWidth = this.domAdapter.userDefinedWidth(this.el.nativeElement);
        }
    }
    /**
     * @return {?}
     */
    computeWidth() {
        let /** @type {?} */ width = this.strictWidth;
        if (!width) {
            width = this.domAdapter.scrollWidth(this.el.nativeElement);
        }
        return width;
    }
    /**
     * @param {?} width
     * @return {?}
     */
    setWidth(width) {
        if (this.strictWidth) {
            if (this.columnResizer.columnResizeBy) {
                this.renderer.setStyle(this.el.nativeElement, 'width', width + 'px');
                this.columnResizer.columnResizeBy = 0;
                this.widthSet = false;
            }
            this.renderer.addClass(this.el.nativeElement, STRICT_WIDTH_CLASS);
            // We don't actually set the width if there already is a user-defined one, we just add the class
            return;
        }
        this.renderer.removeClass(this.el.nativeElement, STRICT_WIDTH_CLASS);
        this.renderer.setStyle(this.el.nativeElement, 'width', width + 'px');
        this.widthSet = true;
    }
}
DatagridHeaderRenderer.decorators = [
    { type: Directive, args: [{ selector: 'clr-dg-column' },] },
];
/** @nocollapse */
DatagridHeaderRenderer.ctorParameters = () => [
    { type: ElementRef, },
    { type: Renderer2, },
    { type: DatagridRenderOrganizer, },
    { type: DomAdapter, },
    { type: DatagridColumnResizer, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
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
    clientRectHeight(element) {
        return 0;
    }
    /**
     * @param {?} element
     * @return {?}
     */
    clientRectRight(element) {
        return 0;
    }
    /**
     * @param {?} element
     * @return {?}
     */
    clientRectWidth(element) {
        return 0;
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
    { type: Injectable },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
// Fixes build error
// @dynamic (https://github.com/angular/angular/issues/19698#issuecomment-338340211)
const domAdapterFactory = (platformId) => {
    if (isPlatformBrowser(platformId)) {
        return new DomAdapter();
    }
    else {
        return new NoopDomAdapter();
    }
};
class DatagridMainRenderer {
    /**
     * @param {?} organizer
     * @param {?} items
     * @param {?} page
     * @param {?} domAdapter
     * @param {?} el
     * @param {?} renderer
     */
    constructor(organizer, items, page, domAdapter, el, renderer) {
        this.organizer = organizer;
        this.items = items;
        this.page = page;
        this.domAdapter = domAdapter;
        this.el = el;
        this.renderer = renderer;
        this._heightSet = false;
        this._subscriptions = [];
        /**
         * Indicates if we want to re-compute columns width. This should only happen:
         * 1) When headers change, with columns being added or removed
         * 2) When rows are lazily loaded for the first time
         */
        this.columnsSizesStable = false;
        this.shouldStabilizeColumns = true;
        this._subscriptions.push(organizer.computeWidths.subscribe(() => this.computeHeadersWidth()));
        this._subscriptions.push(this.page.sizeChange.subscribe(() => {
            if (this._heightSet) {
                this.resetDatagridHeight();
            }
        }));
        this._subscriptions.push(this.items.change.subscribe(() => (this.shouldStabilizeColumns = true)));
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this._subscriptions.push(this.headers.changes.subscribe(() => {
            // TODO: only re-stabilize if a column was added or removed. Reordering is fine.
            this.columnsSizesStable = false;
            this.stabilizeColumns();
        }));
    }
    /**
     * @return {?}
     */
    ngAfterViewChecked() {
        if (this.shouldStabilizeColumns) {
            this.stabilizeColumns();
        }
        if (this.shouldComputeHeight()) {
            setTimeout(() => {
                this.computeDatagridHeight();
            });
        }
    }
    /**
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
     * @return {?}
     */
    computeDatagridHeight() {
        // IE doesn't return correct value for getComputedStyle(element).getPropertyValue("height")
        const /** @type {?} */ value = this.domAdapter.clientRectHeight(this.el.nativeElement);
        this.renderer.setStyle(this.el.nativeElement, 'height', value + 'px');
        this._heightSet = true;
    }
    /**
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
        this._subscriptions.forEach(sub => sub.unsubscribe());
    }
    /**
     * Makes each header compute its width.
     * @return {?}
     */
    computeHeadersWidth() {
        const /** @type {?} */ nbColumns = this.headers.length;
        let /** @type {?} */ allStrict = true;
        this.headers.forEach((header, index) => {
            // On the last header column check whether all columns have strict widths.
            // If all columns have strict widths, remove the strict width from the last column and make it the column's
            // minimum width so that when all previous columns shrink, it will get a flexible width and cover the empty
            // gap in the Datagrid.
            if (!header.strictWidth) {
                allStrict = false;
            }
            if (nbColumns === index + 1 && allStrict) {
                delete header.strictWidth;
            }
            this.organizer.widths[index] = { px: header.computeWidth(), strict: !!header.strictWidth };
        });
        this.headers.forEach((header, index) => header.setWidth(this.organizer.widths[index].px));
    }
    /**
     * Triggers a whole re-rendring cycle to set column sizes, if needed.
     * @return {?}
     */
    stabilizeColumns() {
        this.shouldStabilizeColumns = false;
        if (this.columnsSizesStable) {
            // change in items might have introduced/taken away the scrollbar
            // FIXME: setTimeout is needed here because:
            // When the user changes the page the following things happen:
            // 1. The array which contains the items displayed is updated to contain the items on the new page.
            // 2. An event is emitted which is subscribed to by the main renderer (this file) and this marks the
            // shouldStabilizeColumns flag to true
            // 3. While this is happening the datagrid is in the process of cleaning up the view. The view first
            // renders the new displayed items and then cleans up the old items. But there is a point where the view
            // contains the old items as well as the new items. So if the page size is 10 the view contains 20 items.
            // This causes the datagrid body to overflow.
            // Now since shouldStabilizeColumns was set to true, the scrollbar width is calculated
            // and added to the datagrid header. Adding the setTimeout gives Angular time to clean up the view so that
            // the scrollbar disappears.
            // See this: https://github.com/angular/angular/issues/19094
            // When the above issue is resolve, remove the setTimeout
            setTimeout(() => {
                this.organizer.scrollbar.next();
            });
            return;
        }
        // No point resizing if there are no rows, we wait until they are actually loaded.
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
            },] },
];
/** @nocollapse */
DatagridMainRenderer.ctorParameters = () => [
    { type: DatagridRenderOrganizer, },
    { type: Items, },
    { type: Page, },
    { type: DomAdapter, },
    { type: ElementRef, },
    { type: Renderer2, },
];
DatagridMainRenderer.propDecorators = {
    "headers": [{ type: ContentChildren, args: [DatagridHeaderRenderer,] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DatagridRowRenderer {
    /**
     * @param {?} organizer
     */
    constructor(organizer) {
        this.organizer = organizer;
        this.subscription = organizer.alignColumns.subscribe(() => this.setWidths());
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    /**
     * @return {?}
     */
    setWidths() {
        if (this.organizer.widths.length !== this.cells.length) {
            return;
        }
        this.cells.forEach((cell, index) => {
            const /** @type {?} */ width = this.organizer.widths[index];
            cell.setWidth(width.strict, width.px);
        });
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.cells.changes.subscribe(() => {
            this.setWidths();
        });
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.setWidths();
    }
}
DatagridRowRenderer.decorators = [
    { type: Directive, args: [{ selector: 'clr-dg-row, clr-dg-row-detail' },] },
];
/** @nocollapse */
DatagridRowRenderer.ctorParameters = () => [
    { type: DatagridRenderOrganizer, },
];
DatagridRowRenderer.propDecorators = {
    "cells": [{ type: ContentChildren, args: [DatagridCellRenderer,] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DatagridTableRenderer {
    /**
     * @param {?} el
     * @param {?} renderer
     * @param {?} organizer
     */
    constructor(el, renderer, organizer) {
        this.el = el;
        this.renderer = renderer;
        this.subscriptions = [];
        this.subscriptions.push(organizer.tableMode.subscribe(on => this.tableMode(on)));
        this.subscriptions.push(organizer.noLayout.subscribe(on => this.noLayout(on)));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.outsideContainer.createEmbeddedView(this.projected);
    }
    /**
     * @param {?} on
     * @return {?}
     */
    tableMode(on) {
        if (on) {
            // We move stuff into the body before making it visible
            this.insideContainer.insert(this.outsideContainer.detach(0), 0);
            this.renderer.addClass(this.el.nativeElement, COMPUTE_WIDTH_CLASS);
        }
        else {
            // We make stuff invisible before moving it out of the body
            this.renderer.removeClass(this.el.nativeElement, COMPUTE_WIDTH_CLASS);
            this.outsideContainer.insert(this.insideContainer.detach(0), 0);
        }
    }
    /**
     * @param {?} on
     * @return {?}
     */
    noLayout(on) {
        if (on) {
            this.renderer.addClass(this.el.nativeElement, NO_LAYOUT_CLASS);
        }
        else {
            this.renderer.removeClass(this.el.nativeElement, NO_LAYOUT_CLASS);
        }
    }
}
DatagridTableRenderer.decorators = [
    { type: Component, args: [{
                selector: 'clr-dg-table-wrapper',
                template: `
        <ng-template #head><ng-content select="[clrDgHead]"></ng-content></ng-template>
        <ng-container #outside></ng-container>
        <div clrDgBody class="datagrid-body">
            <ng-container #inside></ng-container>
            <ng-content></ng-content>
        </div>
    `,
            },] },
];
/** @nocollapse */
DatagridTableRenderer.ctorParameters = () => [
    { type: ElementRef, },
    { type: Renderer2, },
    { type: DatagridRenderOrganizer, },
];
DatagridTableRenderer.propDecorators = {
    "projected": [{ type: ViewChild, args: ['head',] },],
    "outsideContainer": [{ type: ViewChild, args: ['outside', { read: ViewContainerRef },] },],
    "insideContainer": [{ type: ViewChild, args: ['inside', { read: ViewContainerRef },] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const CLR_DATAGRID_DIRECTIVES = [
    ClrDatagrid,
    ClrDatagridActionBar,
    ClrDatagridActionOverflow,
    ClrDatagridColumn,
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
    ClrDatagridPlaceholder,
    ClrDatagridColumnToggleButton,
    ClrDatagridColumnToggleTitle,
    DatagridMainRenderer,
    DatagridTableRenderer,
    DatagridHeadRenderer,
    DatagridHeaderRenderer,
    DatagridBodyRenderer,
    DatagridColumnResizer,
    DatagridRowRenderer,
    DatagridCellRenderer,
    DatagridWillyWonka,
    ActionableOompaLoompa,
    ExpandableOompaLoompa,
    DatagridRowExpandAnimation,
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
                ],
                declarations: [CLR_DATAGRID_DIRECTIVES],
                exports: [CLR_DATAGRID_DIRECTIVES, ClrIfExpandModule],
            },] },
];
/**
 * @deprecated since 0.11
 */
const Datagrid = ClrDatagrid;
/**
 * @deprecated since 0.11
 */
const DatagridActionBar = ClrDatagridActionBar;
/**
 * @deprecated since 0.11
 */
const DatagridActionOverflow = ClrDatagridActionOverflow;
/**
 * @deprecated since 0.11
 */
const DatagridColumn = ClrDatagridColumn;
/**
 * @deprecated since 0.11
 */
const DatagridColumnToggle = ClrDatagridColumnToggle;
/**
 * @deprecated since 0.11
 */
const DatagridHideableColumnDirective = ClrDatagridHideableColumn;
/**
 * @deprecated since 0.11
 */
const DatagridFilter = ClrDatagridFilter;
/**
 * @deprecated since 0.11
 */
const DatagridItems = ClrDatagridItems;
/**
 * @deprecated since 0.11
 */
const DatagridRow = ClrDatagridRow;
/**
 * @deprecated since 0.11
 */
const DatagridRowDetail = ClrDatagridRowDetail;
/**
 * @deprecated since 0.11
 */
const DatagridCell = ClrDatagridCell;
/**
 * @deprecated since 0.11
 */
const DatagridFooter = ClrDatagridFooter;
/**
 * @deprecated since 0.11
 */
const DatagridPagination = ClrDatagridPagination;
/**
 * @deprecated since 0.11
 */
const DatagridPlaceholder = ClrDatagridPlaceholder;
/** @enum {number} */
const SortOrder = {
    // Cannot extend an enum so have to redeclare it
    Unsorted: 0,
    Asc: 1,
    Desc: -1,
};
SortOrder[SortOrder.Unsorted] = "Unsorted";
SortOrder[SortOrder.Asc] = "Asc";
SortOrder[SortOrder.Desc] = "Desc";
/**
 * @deprecated since 0.11
 * @record
 * @template T
 */

/**
 * @deprecated since 0.11
 * @record
 * @template T
 */

/**
 * @deprecated since 0.11
 * @record
 */

/**
 * @deprecated since 0.11
 * @record
 * @template T
 */

/**
 * @deprecated since 0.11
 */
const DATAGRID_DIRECTIVES = CLR_DATAGRID_DIRECTIVES;

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ClrStackBlock {
    /**
     * @param {?} parent
     */
    constructor(parent) {
        this.parent = parent;
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
                [attr.dir]="caretDirection"></clr-icon>
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
                // Custom elements are inline by default
                styles: [
                    `
        :host { display: block; }
    `,
                ],
                // Make sure the host has the proper class for styling purposes
                host: { '[class.stack-block]': 'true' },
                animations: [
                    trigger('collapse', [
                        state('true', style({ height: 0 })),
                        transition('true => false', [animate('0.2s ease-in-out', style({ height: '*' }))]),
                        transition('false => true', [style({ height: '*' }), animate('0.2s ease-in-out')]),
                    ]),
                ],
            },] },
];
/** @nocollapse */
ClrStackBlock.ctorParameters = () => [
    { type: ClrStackBlock, decorators: [{ type: SkipSelf }, { type: Optional },] },
];
ClrStackBlock.propDecorators = {
    "expanded": [{ type: HostBinding, args: ['class.stack-block-expanded',] }, { type: Input, args: ['clrSbExpanded',] },],
    "expandedChange": [{ type: Output, args: ['clrSbExpandedChange',] },],
    "expandable": [{ type: HostBinding, args: ['class.stack-block-expandable',] }, { type: Input, args: ['clrSbExpandable',] },],
    "getChangedValue": [{ type: HostBinding, args: ['class.stack-block-changed',] },],
    "setChangedValue": [{ type: Input, args: ['clrSbNotifyChange',] },],
    "onStackLabelFocus": [{ type: HostBinding, args: ['class.on-focus',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
                // Custom elements are inline by default.
                styles: [
                    `
        :host { display: block; }
    `,
                ],
            },] },
];
/**
   * End of undocumented experimental feature.
   */
/** @nocollapse */
ClrStackView.propDecorators = {
    "save": [{ type: Output, args: ['clrStackSave',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
                // Custom elements are inline by default
                styles: [
                    `
        :host { display: block; }
    `,
                ],
            },] },
];
/** @nocollapse */
ClrStackHeader.ctorParameters = () => [
    { type: ClrStackView, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * Undocumented experimental feature: inline editing.
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
        this.stackView.editingChange.subscribe((editing) => {
            // Edit mode was closed
            if (!editing) {
                this.modelChange.emit(this.model);
            }
        });
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * Undocumented experimental feature: inline editing.
 *
 * TODO: support more types of inputs: checkbox, radio, ...
 * TODO: Mirror input attributes from the host to the actual input: size, min, max, placeholder, ...
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
    `,
            },] },
];
/** @nocollapse */
ClrStackInput.ctorParameters = () => [
    { type: ClrStackView, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * Undocumented experimental feature: inline editing.
 *
 * TODO: Offer a a way to customize the value displayed, plain value may be unreadable.
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
    `,
            },] },
];
/** @nocollapse */
ClrStackSelect.ctorParameters = () => [
    { type: ClrStackView, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ClrStackViewCustomTags {
}
ClrStackViewCustomTags.decorators = [
    { type: Directive, args: [{ selector: 'clr-stack-label, clr-stack-content' },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const CLR_STACK_VIEW_DIRECTIVES = [
    ClrStackView,
    ClrStackHeader,
    ClrStackBlock,
    ClrStackViewCustomTags,
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
            },] },
];
/**
 * @deprecated since 0.11
 */
const StackView = ClrStackView;
/**
 * @deprecated since 0.11
 */
const StackHeader = ClrStackHeader;
/**
 * @deprecated since 0.11
 */
const StackBlock = ClrStackBlock;
/**
 * @deprecated since 0.11
 */
const StackViewCustomTags = ClrStackViewCustomTags;
/**
 * @deprecated since 0.11
 */
const StackInput = ClrStackInput;
/**
 * @deprecated since 0.11
 */
const StackSelect = ClrStackSelect;
/**
 * @deprecated since 0.11
 */
const STACK_VIEW_DIRECTIVES = CLR_STACK_VIEW_DIRECTIVES;

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let NB_INSTANCES = 0;
const UNIQUE_ID = new InjectionToken('UNIQUE_ID');
/**
 * @return {?}
 */
function uniqueIdFactory() {
    return 'clr-id-' + NB_INSTANCES++;
}
const UNIQUE_ID_PROVIDER = {
    provide: UNIQUE_ID,
    useFactory: uniqueIdFactory,
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * @abstract
 */
class AbstractTreeSelection {
    /**
     * @param {?} parent
     */
    constructor(parent) {
        this.parent = parent;
        this._selected = false;
        this._indeterminate = false;
    }
    /**
     * @return {?}
     */
    get selected() {
        return this._selected;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set selected(value) {
        this._selected = value;
        this.indeterminate = false;
        this.children.forEach(child => child.parentChanged(value));
        if (this.parent) {
            this.parent.childChanged();
        }
        this.selectedChanged();
    }
    /**
     * @return {?}
     */
    get indeterminate() {
        return this._indeterminate;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set indeterminate(value) {
        value = !!value;
        if (this._indeterminate !== value) {
            this._indeterminate = value;
            this.indeterminateChanged();
        }
    }
    /**
     * @return {?}
     */
    childChanged() {
        let /** @type {?} */ oneSelectedChild = false;
        const /** @type {?} */ previousSelectedValue = this._selected;
        const /** @type {?} */ previousIndeterminateValue = this._indeterminate;
        this._selected = true;
        this._indeterminate = false;
        for (const /** @type {?} */ child of this.children) {
            if (child.indeterminate) {
                this._selected = false;
                this._indeterminate = true;
                break;
            }
            if (child.selected) {
                oneSelectedChild = true;
                if (this._selected === false) {
                    this._indeterminate = true;
                    break;
                }
            }
            else {
                this._selected = false;
                if (oneSelectedChild) {
                    this._indeterminate = true;
                    break;
                }
            }
        }
        if (this.parent &&
            (this._selected !== previousSelectedValue || this._indeterminate !== previousIndeterminateValue)) {
            this.parent.childChanged();
        }
        if (this.selected !== previousSelectedValue) {
            this.selectedChanged();
        }
        if (this.indeterminate !== previousIndeterminateValue) {
            this.indeterminateChanged();
        }
    }
    /**
     * @param {?} selected
     * @return {?}
     */
    parentChanged(selected) {
        if (selected && !this.selected) {
            this._selected = true;
            this.indeterminate = false;
            this.children.forEach(child => child.parentChanged(true));
            this.selectedChanged();
        }
        if (!selected && (this.selected || this.indeterminate)) {
            this._selected = false;
            this.indeterminate = false;
            this.children.forEach(child => child.parentChanged(false));
            this.selectedChanged();
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class TreeSelectionService {
    constructor() {
        this.selectable = false;
    }
}
TreeSelectionService.decorators = [
    { type: Injectable },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * @param {?} existing
 * @return {?}
 */
function clrTreeSelectionProviderFactory(existing) {
    return existing || new TreeSelectionService();
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const ɵ0 = clrTreeSelectionProviderFactory;
class ClrTreeNode extends AbstractTreeSelection {
    /**
     * @param {?} nodeExpand
     * @param {?} parent
     * @param {?} treeSelectionService
     * @param {?} nodeId
     */
    constructor(nodeExpand, parent, treeSelectionService, nodeId) {
        super(parent);
        this.nodeExpand = nodeExpand;
        this.parent = parent;
        this.treeSelectionService = treeSelectionService;
        this.nodeId = nodeId;
        this._children = [];
        this.nodeSelectedChange = new EventEmitter(true);
        this.nodeIndeterminateChanged = new EventEmitter(true);
        if (this.parent) {
            this.parent.register(this);
        }
    }
    /**
     * @return {?}
     */
    get children() {
        return this._children;
    }
    /**
     * @param {?} node
     * @return {?}
     */
    checkIfChildNodeRegistered(node) {
        return this.children.indexOf(node) > -1;
    }
    /**
     * @param {?} node
     * @return {?}
     */
    register(node) {
        if (!this.checkIfChildNodeRegistered(node)) {
            this.children.push(node);
            if (this.selectable) {
                if (this.selected) {
                    node.parentChanged(this.selected);
                }
            }
        }
    }
    /**
     * @param {?} node
     * @return {?}
     */
    unregister(node) {
        const /** @type {?} */ index = this.children.indexOf(node);
        if (index > -1) {
            this.children.splice(index, 1);
        }
    }
    /**
     * @return {?}
     */
    activateSelection() {
        if (this.treeSelectionService && !this.treeSelectionService.selectable) {
            this.treeSelectionService.selectable = true;
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set nodeSelected(value) {
        // required for recursive trees to discard unset inputs.
        this.activateSelection();
        if (value === undefined || value === null) {
            return;
        }
        if (this.selected !== value) {
            this.selected = value;
        }
    }
    /**
     * @return {?}
     */
    selectedChanged() {
        this.nodeSelectedChange.emit(this.selected);
    }
    /**
     * @return {?}
     */
    get selectable() {
        if (this.treeSelectionService) {
            return this.treeSelectionService.selectable;
        }
        return false;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set nodeIndeterminate(value) {
        this.indeterminate = value;
        this.activateSelection();
    }
    /**
     * @return {?}
     */
    indeterminateChanged() {
        this.nodeIndeterminateChanged.emit(this.indeterminate);
    }
    /**
     * @return {?}
     */
    toggleExpand() {
        this.nodeExpand.expanded = !this.nodeExpand.expanded;
    }
    /**
     * @return {?}
     */
    get caretDirection() {
        return this.nodeExpand.expanded ? 'down' : 'right';
    }
    /**
     * @return {?}
     */
    get expanded() {
        return this.nodeExpand.expanded;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set expanded(value) {
        value = !!value;
        if (this.nodeExpand.expanded !== value) {
            this.nodeExpand.expanded = value;
        }
    }
    /**
     * @return {?}
     */
    get state() {
        return this.expanded && !this.nodeExpand.loading ? 'expanded' : 'collapsed';
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.parent) {
            this.parent.unregister(this);
        }
    }
}
ClrTreeNode.decorators = [
    { type: Component, args: [{
                selector: 'clr-tree-node',
                template: `<!--
  ~ Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
  ~ This software is released under MIT license.
  ~ The full license information can be found in LICENSE in the root directory of this project.
  -->

<div class="clr-tree-node-content-container">
    <button
        type="button"
        class="clr-treenode-caret"
        (click)="toggleExpand()"
        *ngIf="nodeExpand.expandable && !nodeExpand.loading">
        <clr-icon
            class="clr-treenode-caret-icon"
            shape="caret"
            [attr.dir]="caretDirection"></clr-icon>
    </button>
    <div class="clr-treenode-spinner-container" *ngIf="nodeExpand.expandable && nodeExpand.loading">
        <span class="clr-treenode-spinner spinner">
            Loading...
        </span>
    </div>
    <clr-checkbox
        class="clr-treenode-checkbox"
        *ngIf="selectable"
        [(ngModel)]="selected"
        [(clrIndeterminate)]="indeterminate"
        [clrAriaLabeledBy]="nodeId"></clr-checkbox>
    <div class="clr-treenode-content" [id]="nodeId">
        <ng-content></ng-content>
    </div>
</div>
<!-- FIXME: remove this string concatenation when boolean states are supported -->
<div
    class="clr-treenode-children"
    [@childNodesState]="state">
    <ng-content select="clr-tree-node"></ng-content>
    <ng-content select="[clrIfExpanded]"></ng-content>
</div>
`,
                providers: [
                    Expand,
                    { provide: LoadingListener, useExisting: Expand },
                    {
                        provide: TreeSelectionService,
                        useFactory: ɵ0,
                        deps: [[new Optional(), new SkipSelf(), TreeSelectionService]],
                    },
                    UNIQUE_ID_PROVIDER,
                ],
                animations: [
                    trigger('childNodesState', [
                        state('expanded', style({ height: '*', 'overflow-y': 'hidden' })),
                        state('collapsed', style({ height: 0, 'overflow-y': 'hidden' })),
                        transition('expanded <=> collapsed', animate('0.2s ease-in-out')),
                    ]),
                ],
                host: { class: 'clr-tree-node' },
            },] },
];
/** @nocollapse */
ClrTreeNode.ctorParameters = () => [
    { type: Expand, },
    { type: ClrTreeNode, decorators: [{ type: Optional }, { type: SkipSelf },] },
    { type: TreeSelectionService, },
    { type: undefined, decorators: [{ type: Inject, args: [UNIQUE_ID,] },] },
];
ClrTreeNode.propDecorators = {
    "nodeSelected": [{ type: Input, args: ['clrSelected',] },],
    "nodeSelectedChange": [{ type: Output, args: ['clrSelectedChange',] },],
    "nodeIndeterminate": [{ type: Input, args: ['clrIndeterminate',] },],
    "nodeIndeterminateChanged": [{ type: Output, args: ['clrIndeterminateChange',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const CLR_TREE_VIEW_DIRECTIVES = [ClrTreeNode];
class ClrTreeViewModule {
}
ClrTreeViewModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, ClrIconModule, FormsModule, ClrFormsModule],
                declarations: [CLR_TREE_VIEW_DIRECTIVES],
                exports: [CLR_TREE_VIEW_DIRECTIVES, ClrIfExpandModule],
            },] },
];
/**
 * @deprecated since 0.11
 */
const TreeNode = ClrTreeNode;
/**
 * @deprecated since 0.11
 */
const TREE_VIEW_DIRECTIVES = CLR_TREE_VIEW_DIRECTIVES;

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class ClrDataModule {
}
ClrDataModule.decorators = [
    { type: NgModule, args: [{ exports: [ClrDatagridModule, ClrStackViewModule, ClrTreeViewModule] },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
    { type: Injectable },
];
/**
 * @param {?} existing
 * @return {?}
 */
function clrRootDropdownFactory(existing) {
    return existing || new RootDropdownService();
}
const ROOT_DROPDOWN_PROVIDER = {
    provide: RootDropdownService,
    useFactory: clrRootDropdownFactory,
    deps: [[new Optional(), new SkipSelf(), RootDropdownService]],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ClrDropdown {
    /**
     * @param {?} parent
     * @param {?} ifOpenService
     * @param {?} dropdownService
     */
    constructor(parent, ifOpenService, dropdownService) {
        this.parent = parent;
        this.ifOpenService = ifOpenService;
        this.isMenuClosable = true;
        this._subscription = dropdownService.changes.subscribe(value => (this.ifOpenService.open = value));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
}
ClrDropdown.decorators = [
    { type: Component, args: [{
                selector: 'clr-dropdown',
                template: '<ng-content></ng-content>',
                host: {
                    '[class.dropdown]': 'true',
                    // FIXME: remove this as soon as we stop supporting this old <div class="dropdown-menu"> syntax
                    '[class.open]': 'ifOpenService.open',
                },
                providers: [IfOpenService, ROOT_DROPDOWN_PROVIDER, { provide: POPOVER_HOST_ANCHOR, useExisting: ElementRef }],
            },] },
];
/** @nocollapse */
ClrDropdown.ctorParameters = () => [
    { type: ClrDropdown, decorators: [{ type: SkipSelf }, { type: Optional },] },
    { type: IfOpenService, },
    { type: RootDropdownService, },
];
ClrDropdown.propDecorators = {
    "isMenuClosable": [{ type: Input, args: ['clrCloseMenuOnItemClick',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
        this.renderer.listen(this.el.nativeElement, 'click', () => this.onDropdownItemClick());
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
    { type: Directive, args: [{ selector: '[clrDropdownItem]', host: { '[class.dropdown-item]': 'true' } },] },
];
/** @nocollapse */
ClrDropdownItem.ctorParameters = () => [
    { type: ClrDropdown, },
    { type: ElementRef, },
    { type: RootDropdownService, },
    { type: Renderer2, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
                },
            },] },
];
/** @nocollapse */
ClrDropdownMenu.ctorParameters = () => [
    { type: Injector, },
    { type: ElementRef, decorators: [{ type: Optional }, { type: Inject, args: [POPOVER_HOST_ANCHOR,] },] },
    { type: ClrDropdownMenu, decorators: [{ type: Optional }, { type: SkipSelf },] },
];
ClrDropdownMenu.propDecorators = {
    "position": [{ type: Input, args: ['clrPosition',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
            },] },
];
/** @nocollapse */
ClrDropdownTrigger.ctorParameters = () => [
    { type: ClrDropdown, },
    { type: IfOpenService, },
];
ClrDropdownTrigger.propDecorators = {
    "onDropdownTriggerClick": [{ type: HostListener, args: ['click', ['$event'],] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const CLR_DROPDOWN_DIRECTIVES = [ClrDropdown, ClrDropdownMenu, ClrDropdownTrigger, ClrDropdownItem];
class ClrDropdownModule {
}
ClrDropdownModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, ClrCommonPopoverModule],
                declarations: [CLR_DROPDOWN_DIRECTIVES],
                exports: [CLR_DROPDOWN_DIRECTIVES, ClrConditionalModule, ClrIconModule],
            },] },
];
/**
 * @deprecated since 0.11
 */
const Dropdown = ClrDropdown;
/**
 * @deprecated since 0.11
 */
const DropdownMenu = ClrDropdownMenu;
/**
 * @deprecated since 0.11
 */
const DropdownTrigger = ClrDropdownTrigger;
/**
 * @deprecated since 0.11
 */
const DropdownItem = ClrDropdownItem;
/**
 * @deprecated since 0.11
 */
const menuPositions = CLR_MENU_POSITIONS;
/**
 * @deprecated since 0.11
 */
const DROPDOWN_DIRECTIVES = CLR_DROPDOWN_DIRECTIVES;

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
// TODO: alert-* types are deprecated and should be removed before 1.0!
const ALERT_TYPES = [
    'alert-info',
    'alert-warning',
    'alert-danger',
    'alert-success',
    'info',
    'warning',
    'danger',
    'success',
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class AlertIconAndTypesService {
    constructor() {
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
     * @param {?} type
     * @param {?=} classOrShape
     * @return {?}
     */
    iconInfoFromType(type, classOrShape = 'shape') {
        const /** @type {?} */ returnObj = { shape: '', cssClass: '' };
        switch (type) {
            case 'warning':
            case 'alert-warning':
                returnObj.shape = 'exclamation-triangle';
                returnObj.cssClass = 'alert-warning';
                break;
            case 'danger':
            case 'alert-danger':
                returnObj.shape = 'exclamation-circle';
                returnObj.cssClass = 'alert-danger';
                break;
            case 'success':
            case 'alert-success':
                returnObj.shape = 'check-circle';
                returnObj.cssClass = 'alert-success';
                break;
            default:
                returnObj.shape = this.defaultIconShape;
                returnObj.cssClass = 'alert-info';
                break;
        }
        return returnObj;
    }
}
AlertIconAndTypesService.decorators = [
    { type: Injectable },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
        return this.allAlerts.filter(alert => !alert._closed);
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
        this.allAlerts = alerts;
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
}
MultiAlertService.decorators = [
    { type: Injectable },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ClrAlert {
    /**
     * @param {?} iconService
     * @param {?} cdr
     * @param {?} multiAlertService
     */
    constructor(iconService, cdr, multiAlertService) {
        this.iconService = iconService;
        this.cdr = cdr;
        this.multiAlertService = multiAlertService;
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
            if (this.multiAlertService.currentAlert === this) {
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
    { type: Component, args: [{ selector: 'clr-alert', providers: [AlertIconAndTypesService], template: `<!--
  ~ Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
  ~ This software is released under MIT license.
  ~ The full license information can be found in LICENSE in the root directory of this project.
  -->

<div
    *ngIf="!_closed"
    class="alert"
    [ngClass]="alertClass"
    [class.alert-hidden]="isHidden"
    [class.alert-sm]="isSmall"
    [class.alert-app-level]="isAppLevel">
    <div class="alert-items">
        <ng-content></ng-content>
    </div>
    <button type="button" class="close" aria-label="Close" *ngIf="closable" (click)="close()">
        <clr-icon aria-hidden="true" shape="close"></clr-icon>
    </button>
</div>
` },] },
];
/** @nocollapse */
ClrAlert.ctorParameters = () => [
    { type: AlertIconAndTypesService, },
    { type: ChangeDetectorRef, },
    { type: MultiAlertService, decorators: [{ type: Optional },] },
];
ClrAlert.propDecorators = {
    "isSmall": [{ type: Input, args: ['clrAlertSizeSmall',] },],
    "closable": [{ type: Input, args: ['clrAlertClosable',] },],
    "isAppLevel": [{ type: Input, args: ['clrAlertAppLevel',] },],
    "_closed": [{ type: Input, args: ['clrAlertClosed',] },],
    "_closedChanged": [{ type: Output, args: ['clrAlertClosedChange',] },],
    "alertType": [{ type: Input, args: ['clrAlertType',] },],
    "alertIconShape": [{ type: Input, args: ['clrAlertIcon',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
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
                // the .alert-item selector is deprecated; the :not clause is to allow us to use static
                // examples in demos on the demo-app and website
                selector: '.alert-item:not(.static), clr-alert-item',
                template: `
        <div class="alert-icon-wrapper">
            <clr-icon class="alert-icon" [attr.shape]="iconService.alertIconShape"></clr-icon>
        </div>
        <ng-content></ng-content>
    `,
                host: { class: 'alert-item' },
            },] },
];
/** @nocollapse */
ClrAlertItem.ctorParameters = () => [
    { type: AlertIconAndTypesService, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
        return this.allAlerts.filter(alert => {
            return alert.isHidden === false;
        });
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
        this.multiAlertService.changes.subscribe(index => {
            this.currentAlertIndexChange.next(index);
            this.currentAlertChange.next(this.multiAlertService.currentAlert);
        });
    }
}
ClrAlerts.decorators = [
    { type: Component, args: [{
                selector: 'clr-alerts',
                template: `<!--
  ~ Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
  ~ This software is released under MIT license.
  ~ The full license information can be found in LICENSE in the root directory of this project.
  -->

<clr-alerts-pager
        *ngIf="multiAlertService.count > 1"
        [clrCurrentAlertIndex]="currentAlertIndex">
</clr-alerts-pager>
<ng-content select="clr-alert"></ng-content>
`,
                providers: [MultiAlertService],
                host: {
                    '[class.alerts]': 'true',
                    '[class.alert-danger]': "this.currentAlertType == 'danger' || this.currentAlertType == 'alert-danger'",
                    '[class.alert-info]': "this.currentAlertType == 'info' || this.currentAlertType == 'alert-info'",
                    '[class.alert-success]': "this.currentAlertType == 'success' || this.currentAlertType == 'alert-success'",
                    '[class.alert-warning]': "this.currentAlertType == 'warning' || this.currentAlertType == 'alert-warning'",
                },
                styles: [':host { display: block }'],
            },] },
];
/** @nocollapse */
ClrAlerts.ctorParameters = () => [
    { type: MultiAlertService, },
];
ClrAlerts.propDecorators = {
    "allAlerts": [{ type: ContentChildren, args: [ClrAlert,] },],
    "_inputCurrentIndex": [{ type: Input, args: ['clrCurrentAlertIndex',] },],
    "currentAlertIndexChange": [{ type: Output, args: ['clrCurrentAlertIndexChange',] },],
    "currentAlert": [{ type: Input, args: ['clrCurrentAlert',] },],
    "currentAlertChange": [{ type: Output, args: ['clrCurrentAlertChange',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ClrAlertsPager {
    /**
     * @param {?} multiAlertService
     */
    constructor(multiAlertService) {
        this.multiAlertService = multiAlertService;
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
        this.multiAlertServiceChanges = this.multiAlertService.changes.subscribe(index => {
            this.currentAlertIndexChange.emit(index);
            this.currentAlertChange.emit(this.multiAlertService.activeAlerts[index]);
        });
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
                template: `<!--
  ~ Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
  ~ This software is released under MIT license.
  ~ The full license information can be found in LICENSE in the root directory of this project.
  -->

<div class="alerts-pager-control">
    <div class="alerts-page-down">
        <button class="alerts-pager-button" (click)="pageDown()">
            <clr-icon shape="caret left"></clr-icon>
        </button>
    </div>
    <div class="alerts-pager-text">
        {{this.multiAlertService.current+1}} / {{this.multiAlertService.count}}
    </div>
    <div class="alerts-page-up">
        <button class="alerts-pager-button" (click)="pageUp()">
            <clr-icon shape="caret right"></clr-icon>
        </button>
    </div>
</div>
`,
                host: { '[class.alerts-pager]': 'true' },
            },] },
];
/** @nocollapse */
ClrAlertsPager.ctorParameters = () => [
    { type: MultiAlertService, },
];
ClrAlertsPager.propDecorators = {
    "currentAlert": [{ type: Input, args: ['clrCurrentAlert',] },],
    "currentAlertChange": [{ type: Output, args: ['clrCurrentAlertChange',] },],
    "currentAlertIndex": [{ type: Input, args: ['clrCurrentAlertIndex',] },],
    "currentAlertIndexChange": [{ type: Output, args: ['clrCurrentAlertIndexChange',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const CLR_ALERT_DIRECTIVES = [ClrAlert, ClrAlertItem, ClrAlerts, ClrAlertsPager];
class ClrAlertModule {
}
ClrAlertModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, ClrIconModule, ClrDropdownModule],
                declarations: [CLR_ALERT_DIRECTIVES],
                exports: [CLR_ALERT_DIRECTIVES],
            },] },
];
/**
 * @deprecated since 0.11
 */
const Alert = ClrAlert;
/**
 * @deprecated since 0.11
 */
const AlertItem = ClrAlertItem;
/**
 * @deprecated since 0.11
 */
const Alerts = ClrAlerts;
/**
 * @deprecated since 0.11
 */
const AlertsPager = ClrAlertsPager;
/**
 * @deprecated since 0.11
 */
const ALERT_DIRECTIVES = CLR_ALERT_DIRECTIVES;

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ClrEmphasisModule {
}
ClrEmphasisModule.decorators = [
    { type: NgModule, args: [{ exports: [ClrAlertModule] },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
 * @suppress {checkTypes} checked by tsc
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
 * @suppress {checkTypes} checked by tsc
 */
class ResponsiveNavigationService {
    constructor() {
        this.responsiveNavList = [];
        this.registerNavSubject = new Subject();
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
        const /** @type {?} */ index = this.responsiveNavList.indexOf(navLevel);
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
        const /** @type {?} */ message = new ResponsiveNavControlMessage(controlCode, navLevel);
        this.controlNavSubject.next(message);
    }
    /**
     * @return {?}
     */
    closeAllNavs() {
        const /** @type {?} */ message = new ResponsiveNavControlMessage(ResponsiveNavCodes.NAV_CLOSE_ALL, -999);
        this.controlNavSubject.next(message);
    }
}
ResponsiveNavigationService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ResponsiveNavigationService.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
            next: (message) => {
                this.processMessage(message);
            },
        });
    }
    /**
     * @param {?} message
     * @return {?}
     */
    processMessage(message) {
        let /** @type {?} */ navClass = ResponsiveNavCodes.NAV_CLASS_HAMBURGER_MENU;
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
    { type: Directive, args: [{ selector: 'clr-main-container', host: { '[class.main-container]': 'true' } },] },
];
/** @nocollapse */
ClrMainContainer.ctorParameters = () => [
    { type: ElementRef, },
    { type: ResponsiveNavigationService, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const CLR_LAYOUT_DIRECTIVES = [ClrMainContainer];
class ClrMainContainerModule {
}
ClrMainContainerModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, ClrIconModule],
                declarations: [CLR_LAYOUT_DIRECTIVES],
                exports: [CLR_LAYOUT_DIRECTIVES],
            },] },
];
/**
 * @deprecated since 0.11
 */
const MainContainer = ClrMainContainer;
/**
 * @deprecated since 0.11
 */
const LAYOUT_DIRECTIVES = CLR_LAYOUT_DIRECTIVES;

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class MainContainerWillyWonka extends WillyWonka {
}
MainContainerWillyWonka.decorators = [
    { type: Directive, args: [{ selector: 'clr-main-container' },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
    /**
     * @return {?}
     */
    get flavor() {
        return this.responsiveNavService.responsiveNavList.reduce((sum, navLevel) => sum + navLevel, 0);
    }
}
NavDetectionOompaLoompa.decorators = [
    { type: Directive, args: [{ selector: 'clr-header' },] },
];
/** @nocollapse */
NavDetectionOompaLoompa.ctorParameters = () => [
    { type: ChangeDetectorRef, },
    { type: MainContainerWillyWonka, decorators: [{ type: Optional },] },
    { type: ResponsiveNavigationService, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ClrHeader {
    /**
     * @param {?} responsiveNavService
     */
    constructor(responsiveNavService) {
        this.responsiveNavService = responsiveNavService;
        this.isNavLevel1OnPage = false;
        this.isNavLevel2OnPage = false;
        this._subscription = this.responsiveNavService.registeredNavs.subscribe({
            next: (navLevelList) => {
                this.initializeNavTriggers(navLevelList);
            },
        });
    }
    /**
     * @return {?}
     */
    get responsiveNavCodes() {
        return ResponsiveNavCodes;
    }
    /**
     * @return {?}
     */
    resetNavTriggers() {
        this.isNavLevel1OnPage = false;
        this.isNavLevel2OnPage = false;
    }
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
        navList.forEach(navLevel => {
            if (navLevel === ResponsiveNavCodes.NAV_LEVEL_1) {
                this.isNavLevel1OnPage = true;
            }
            else if (navLevel === ResponsiveNavCodes.NAV_LEVEL_2) {
                this.isNavLevel2OnPage = true;
            }
        });
    }
    /**
     * @return {?}
     */
    closeOpenNav() {
        this.responsiveNavService.closeAllNavs();
    }
    /**
     * @param {?} navLevel
     * @return {?}
     */
    toggleNav(navLevel) {
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
            (click)="toggleNav(responsiveNavCodes.NAV_LEVEL_1)">
            <span></span>
        </button>
        <ng-content></ng-content>
        <button
            type="button"
            *ngIf="isNavLevel2OnPage"
            class="header-overflow-trigger"
            (click)="toggleNav(responsiveNavCodes.NAV_LEVEL_2)">
            <span></span>
        </button>
        <div class="header-backdrop" (click)="closeOpenNav()"></div>
    `,
                host: { '[class.header]': 'true' },
            },] },
];
/** @nocollapse */
ClrHeader.ctorParameters = () => [
    { type: ResponsiveNavigationService, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
        const /** @type {?} */ navHostClassList = this.elementRef.nativeElement.classList;
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
    /**
     * @param {?} target
     * @return {?}
     */
    onMouseClick(target) {
        let /** @type {?} */ current = target; // Get the element in the DOM on which the mouse was clicked
        const /** @type {?} */ navHost = this.elementRef.nativeElement; // Get the current nav native HTML element
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
    { type: Directive, args: [{ selector: '[clr-nav-level]' },] },
];
/** @nocollapse */
ClrNavLevel.ctorParameters = () => [
    { type: ResponsiveNavigationService, },
    { type: ElementRef, },
];
ClrNavLevel.propDecorators = {
    "_level": [{ type: Input, args: ['clr-nav-level',] },],
    "onMouseClick": [{ type: HostListener, args: ['click', ['$event.target'],] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * @param {?} existing
 * @return {?}
 */
function ResponsiveNavigationProvider(existing) {
    return existing || new ResponsiveNavigationService();
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const CLR_NAVIGATION_DIRECTIVES = [
    ClrHeader,
    ClrNavLevel,
    NavDetectionOompaLoompa,
    MainContainerWillyWonka,
];
const ɵ0$1 = ResponsiveNavigationProvider;
class ClrNavigationModule {
}
ClrNavigationModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, ClrIconModule, ClrDropdownModule],
                declarations: [CLR_NAVIGATION_DIRECTIVES],
                providers: [
                    {
                        provide: ResponsiveNavigationService,
                        useFactory: ɵ0$1,
                        deps: [[new Optional(), new SkipSelf(), ResponsiveNavigationService]],
                    },
                ],
                exports: [CLR_NAVIGATION_DIRECTIVES],
            },] },
];
/**
 * @deprecated since 0.11
 */
const Header = ClrHeader;
/**
 * @deprecated since 0.11
 */
const NavLevelDirective = ClrNavLevel;
/**
 * @deprecated since 0.11
 */
const NAVIGATION_DIRECTIVES = CLR_NAVIGATION_DIRECTIVES;

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class TemplateRefContainer {
}
TemplateRefContainer.decorators = [
    { type: Component, args: [{
                template: `
      <ng-template>
        <ng-content></ng-content>
      </ng-template>
    `,
            },] },
];
/** @nocollapse */
TemplateRefContainer.propDecorators = {
    "template": [{ type: ViewChild, args: [TemplateRef,] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const TEMPLATE_REF_DIRECTIVES = [TemplateRefContainer];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ClrTemplateRefModule {
}
ClrTemplateRefModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: [TEMPLATE_REF_DIRECTIVES],
                entryComponents: [TEMPLATE_REF_DIRECTIVES],
                exports: [TEMPLATE_REF_DIRECTIVES],
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class TabsWillyWonka extends WillyWonka {
}
TabsWillyWonka.decorators = [
    { type: Directive, args: [{ selector: 'clr-tabs' },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
    { type: Directive, args: [{ selector: '[clrTabLink], clr-tab-content' },] },
];
/** @nocollapse */
ActiveOompaLoompa.ctorParameters = () => [
    { type: ChangeDetectorRef, },
    { type: TabsWillyWonka, decorators: [{ type: Optional },] },
    { type: undefined, decorators: [{ type: Inject, args: [IF_ACTIVE_ID,] },] },
    { type: IfActiveService, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AriaService {
}
AriaService.decorators = [
    { type: Injectable },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class TabsService {
    constructor() {
        this._children = [];
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
        return this.children.find((tab) => {
            return tab.active;
        });
    }
    /**
     * @return {?}
     */
    get overflowTabs() {
        return this.children.filter((tab) => {
            return tab.tabLink.inOverflow === true;
        });
    }
    /**
     * @param {?} tab
     * @return {?}
     */
    unregister(tab) {
        const /** @type {?} */ index = this.children.indexOf(tab);
        if (index > -1) {
            this.children.splice(index, 1);
        }
    }
}
TabsService.decorators = [
    { type: Injectable },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
let nbTabContentComponents = 0;
class ClrTabContent {
    /**
     * @param {?} ifActiveService
     * @param {?} id
     * @param {?} ariaService
     */
    constructor(ifActiveService, id, ariaService) {
        this.ifActiveService = ifActiveService;
        this.id = id;
        this.ariaService = ariaService;
        if (!this.tabContentId) {
            this.tabContentId = 'clr-tab-content-' + nbTabContentComponents++;
        }
    }
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
}
ClrTabContent.decorators = [
    { type: Component, args: [{
                selector: 'clr-tab-content',
                template: `
        <ng-content></ng-content>
    `,
                host: {
                    '[id]': 'tabContentId',
                    '[attr.aria-labelledby]': 'ariaLabelledBy',
                    '[attr.aria-hidden]': '!active',
                    '[attr.data-hidden]': '!active',
                    role: 'tabpanel',
                },
            },] },
];
/** @nocollapse */
ClrTabContent.ctorParameters = () => [
    { type: IfActiveService, },
    { type: undefined, decorators: [{ type: Inject, args: [IF_ACTIVE_ID,] },] },
    { type: AriaService, },
];
ClrTabContent.propDecorators = {
    "templateRef": [{ type: ViewChild, args: ['tabContentProjectedRef',] },],
    "tabContentId": [{ type: Input, args: ['id',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
let nbTabsComponent = 0;
const TABS_ID = new InjectionToken('TABS_ID');
/**
 * @return {?}
 */
function tokenFactory$1() {
    return 'clr-tabs-' + nbTabsComponent++;
}
const TABS_ID_PROVIDER = {
    provide: TABS_ID,
    useFactory: tokenFactory$1,
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
let nbTabLinkComponents = 0;
class ClrTabLink {
    /**
     * @param {?} ifActiveService
     * @param {?} id
     * @param {?} ariaService
     * @param {?} el
     * @param {?} cfr
     * @param {?} viewContainerRef
     * @param {?} tabsId
     */
    constructor(ifActiveService, id, ariaService, el, cfr, viewContainerRef, tabsId) {
        this.ifActiveService = ifActiveService;
        this.id = id;
        this.ariaService = ariaService;
        this.el = el;
        this.cfr = cfr;
        this.viewContainerRef = viewContainerRef;
        this.tabsId = tabsId;
        if (!this.tabLinkId) {
            this.tabLinkId = 'clr-tab-link-' + nbTabLinkComponents++;
        }
        // Tab links can be rendered in one of two places: in the main area or inside the overflow dropdown menu.
        // Here, we create a container so that its template can be used to create embeddedView on the fly.
        // See TabsService's renderView() method and how it's used in Tabs class for an example.
        const /** @type {?} */ factory = this.cfr.resolveComponentFactory(TemplateRefContainer);
        this.templateRefContainer = this.viewContainerRef.createComponent(factory, 1, undefined, [
            [this.el.nativeElement],
        ]).instance;
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
    /**
     * @return {?}
     */
    get role() {
        return 'presentation';
    }
    /**
     * @return {?}
     */
    get type() {
        return 'button';
    }
}
ClrTabLink.decorators = [
    { type: Directive, args: [{
                selector: '[clrTabLink]',
                host: {
                    '[id]': 'tabLinkId',
                    '[attr.aria-selected]': 'active',
                    '[attr.aria-controls]': 'ariaControls',
                    '[class.btn]': 'true',
                    '[class.btn-link]': '!inOverflow',
                    '[class.nav-link]': '!inOverflow',
                    '[class.nav-item]': '!inOverflow',
                    '[class.active]': 'active',
                },
            },] },
];
/** @nocollapse */
ClrTabLink.ctorParameters = () => [
    { type: IfActiveService, },
    { type: undefined, decorators: [{ type: Inject, args: [IF_ACTIVE_ID,] },] },
    { type: AriaService, },
    { type: ElementRef, },
    { type: ComponentFactoryResolver, },
    { type: ViewContainerRef, },
    { type: undefined, decorators: [{ type: Inject, args: [TABS_ID,] },] },
];
ClrTabLink.propDecorators = {
    "inOverflow": [{ type: Input, args: ['clrTabLinkInOverflow',] },],
    "tabLinkId": [{ type: Input, args: ['id',] },],
    "activate": [{ type: HostListener, args: ['click',] },],
    "role": [{ type: HostBinding, args: ['attr.role',] },],
    "type": [{ type: HostBinding, args: ['attr.type',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
                providers: [IF_ACTIVE_ID_PROVIDER, AriaService],
            },] },
];
/** @nocollapse */
ClrTab.ctorParameters = () => [
    { type: IfActiveService, },
    { type: undefined, decorators: [{ type: Inject, args: [IF_ACTIVE_ID,] },] },
    { type: TabsService, },
];
ClrTab.propDecorators = {
    "tabLink": [{ type: ContentChild, args: [ClrTabLink,] },],
    "tabContent": [{ type: ContentChild, args: [ClrTabContent,] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
                },
            },] },
];
/** @nocollapse */
ClrTabOverflowContent.ctorParameters = () => [
    { type: Injector, },
    { type: ElementRef, decorators: [{ type: SkipSelf },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ClrTabs {
    /**
     * @param {?} ifActiveService
     * @param {?} ifOpenService
     * @param {?} tabsService
     * @param {?} tabsId
     */
    constructor(ifActiveService, ifOpenService, tabsService, tabsId) {
        this.ifActiveService = ifActiveService;
        this.ifOpenService = ifOpenService;
        this.tabsService = tabsService;
        this.tabsId = tabsId;
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
    ngAfterContentInit() {
        if (typeof this.ifActiveService.current === 'undefined') {
            this.tabLinkDirectives.first.activate();
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    toggleOverflow(event) {
        this.ifOpenService.toggleWithEvent(event);
    }
}
ClrTabs.decorators = [
    { type: Component, args: [{
                selector: 'clr-tabs',
                template: `
        <ul class="nav" role="tablist">
            <!--tab links-->
            <ng-container *ngFor="let link of tabLinkDirectives">
                <ng-container *ngIf="link.tabsId === tabsId && !link.inOverflow"
                              [ngTemplateOutlet]="link.templateRefContainer.template">
                </ng-container>
            </ng-container>
            <ng-container *ngIf="tabsService.overflowTabs.length > 0">
                <div class="tabs-overflow bottom-right" [class.open]="ifOpenService.open"
                     (click)="toggleOverflow($event)">
                    <li role="presentation" class="nav-item">
                        <button class="btn btn-link nav-link dropdown-toggle" type="button" [class.active]="activeTabInOverflow">
                            <clr-icon shape="ellipsis-horizontal" [class.is-info]="ifOpenService.open"></clr-icon>
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
        <!--tab content-->
        <ng-content></ng-content>
    `,
                providers: [IfActiveService, IfOpenService, TabsService, TABS_ID_PROVIDER],
            },] },
];
/** @nocollapse */
ClrTabs.ctorParameters = () => [
    { type: IfActiveService, },
    { type: IfOpenService, },
    { type: TabsService, },
    { type: undefined, decorators: [{ type: Inject, args: [TABS_ID,] },] },
];
ClrTabs.propDecorators = {
    "tabLinkDirectives": [{ type: ContentChildren, args: [ClrTabLink, { descendants: true },] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
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
            },] },
];
/**
 * @deprecated since 0.11
 */
const Tab = ClrTab;
/**
 * @deprecated since 0.11
 */
const Tabs = ClrTabs;
/**
 * @deprecated since 0.11
 */
const TabContent = ClrTabContent;
/**
 * @deprecated since 0.11
 */
const TabOverflowContent = ClrTabOverflowContent;
/**
 * @deprecated since 0.11
 */
const TabLinkDirective = ClrTabLink;
/**
 * @deprecated since 0.11
 */
const TABS_DIRECTIVES = CLR_TABS_DIRECTIVES;

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
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
    { type: Injectable },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
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
    { type: Injectable },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
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
    { type: Injectable },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class ClrVerticalNav {
    /**
     * @param {?} _navService
     * @param {?} _navIconService
     * @param {?} _navGroupRegistrationService
     */
    constructor(_navService, _navIconService, _navGroupRegistrationService) {
        this._navService = _navService;
        this._navIconService = _navIconService;
        this._navGroupRegistrationService = _navGroupRegistrationService;
        this._collapsedChanged = new EventEmitter(true);
        this._sub = this._navService.collapsedChanged.subscribe(value => {
            this._collapsedChanged.emit(value);
        });
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
                template: `<!--
  ~ Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
  ~ This software is released under MIT license.
  ~ The full license information can be found in LICENSE in the root directory of this project.
  -->

<button type="button" class="nav-trigger"
        [class.on-collapse]="collapsed"
        (click)="toggleByButton()"
        *ngIf="collapsible">
    <clr-icon shape="angle-double" class="nav-trigger-icon" [attr.dir]="(this.collapsed) ? 'right' : 'left'"></clr-icon>
</button>
<!-- Click handler on .nav-content is bad but required :-( -->
<div class="nav-content">
    <ng-content></ng-content>
    <button (click)="collapsed = false" class="nav-btn" *ngIf="collapsible && collapsed"></button>
</div>
`,
                providers: [VerticalNavService, VerticalNavIconService, VerticalNavGroupRegistrationService],
                host: {
                    class: 'clr-vertical-nav',
                    '[class.is-collapsed]': 'collapsed',
                    '[class.has-nav-groups]': 'hasNavGroups',
                    '[class.has-icons]': 'hasIcons',
                },
            },] },
];
/** @nocollapse */
ClrVerticalNav.ctorParameters = () => [
    { type: VerticalNavService, },
    { type: VerticalNavIconService, },
    { type: VerticalNavGroupRegistrationService, },
];
ClrVerticalNav.propDecorators = {
    "collapsible": [{ type: Input, args: ['clrVerticalNavCollapsible',] },],
    "collapsed": [{ type: Input, args: ['clrVerticalNavCollapsed',] },],
    "_collapsedChanged": [{ type: Output, args: ['clrVerticalNavCollapsedChange',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
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
    { type: Injectable },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const EXPANDED_STATE = 'expanded';
const COLLAPSED_STATE = 'collapsed';
class ClrVerticalNavGroup {
    /**
     * @param {?} _itemExpand
     * @param {?} _navGroupRegistrationService
     * @param {?} _navGroupService
     * @param {?} _navService
     */
    constructor(_itemExpand, _navGroupRegistrationService, _navGroupService, _navService) {
        this._itemExpand = _itemExpand;
        this._navGroupRegistrationService = _navGroupRegistrationService;
        this._navGroupService = _navGroupService;
        this._navService = _navService;
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
        this._subscriptions.push(this._itemExpand.expandChange.subscribe(value => {
            if (value && this.expandAnimationState === COLLAPSED_STATE) {
                if (this._navService.collapsed) {
                    this._navService.collapsed = false;
                }
                this.expandAnimationState = EXPANDED_STATE;
            }
            else if (!value && this.expandAnimationState === EXPANDED_STATE) {
                this.expandAnimationState = COLLAPSED_STATE;
            }
        }));
        // 1. If the nav is collapsing, close the open nav group + save its state
        // 2. If the nav is expanding, expand the nav group if the previous state was expanded
        this._subscriptions.push(this._navService.animateOnCollapsed.subscribe((goingToCollapse) => {
            if (goingToCollapse && this.expanded) {
                this.wasExpanded = true;
                this.expandAnimationState = COLLAPSED_STATE;
            }
            else if (!goingToCollapse && this.wasExpanded) {
                this.expandGroup();
                this.wasExpanded = false;
            }
        }));
        // If a link is clicked, expand the nav group
        this._subscriptions.push(this._navGroupService.expandChange.subscribe((expand) => {
            if (expand && !this.expanded) {
                this.expandGroup();
            }
        }));
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
        this._subscriptions.forEach((sub) => sub.unsubscribe());
        this._navGroupRegistrationService.unregisterNavGroup();
    }
}
ClrVerticalNavGroup.decorators = [
    { type: Component, args: [{
                selector: 'clr-vertical-nav-group',
                template: `<!--
  ~ Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
  ~ This software is released under MIT license.
  ~ The full license information can be found in LICENSE in the root directory of this project.
  -->

<div class="nav-group-content">
    <ng-content select="[clrVerticalNavLink]"></ng-content>
    <button
        class="nav-group-trigger"
        type="button"
        (click)="toggleExpand()">
        <ng-content select="[clrVerticalNavIcon]"></ng-content>
        <div class="nav-group-text">
            <ng-content></ng-content>
        </div>
        <clr-icon shape="caret"
                  class="nav-group-trigger-icon"
                  [attr.dir]="(this.expanded) ? 'down' : 'right'">
        </clr-icon>
    </button>
</div>
<!--TODO: This animation needs to be added to the clr-vertical-nav-group-children component-->
<div class="nav-group-children"
     [@clrExpand]="expandAnimationState"
     (@clrExpand.done)="expandAnimationDone($event)">
    <ng-content select="[clrIfExpanded], clr-vertical-nav-group-children"></ng-content>
</div>
`,
                providers: [Expand, VerticalNavGroupService],
                animations: [
                    trigger('clrExpand', [
                        state(EXPANDED_STATE, style({ height: '*' })),
                        state(COLLAPSED_STATE, style({ height: 0, 'overflow-y': 'hidden', visibility: 'hidden' })),
                        transition(`${EXPANDED_STATE} <=> ${COLLAPSED_STATE}`, animate('0.2s ease-in-out')),
                    ]),
                ],
                host: { class: 'nav-group' },
            },] },
];
/** @nocollapse */
ClrVerticalNavGroup.ctorParameters = () => [
    { type: Expand, },
    { type: VerticalNavGroupRegistrationService, },
    { type: VerticalNavGroupService, },
    { type: VerticalNavService, },
];
ClrVerticalNavGroup.propDecorators = {
    "expanded": [{ type: HostBinding, args: ['class.is-expanded',] },],
    "userExpandedInput": [{ type: Input, args: ['clrVerticalNavGroupExpanded',] },],
    "expandedChange": [{ type: Output, args: ['clrVerticalNavGroupExpandedChange',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class ClrVerticalNavGroupChildren {
}
ClrVerticalNavGroupChildren.decorators = [
    { type: Component, args: [{
                selector: 'clr-vertical-nav-group-children',
                template: `
        <ng-content></ng-content>
    `,
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
    { type: Directive, args: [{ selector: '[clrVerticalNavIcon]', host: { class: 'nav-icon' } },] },
];
/** @nocollapse */
ClrVerticalNavIcon.ctorParameters = () => [
    { type: VerticalNavIconService, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
                host: { class: 'nav-link' },
            },] },
];
/** @nocollapse */
ClrVerticalNavLink.ctorParameters = () => [
    { type: VerticalNavGroupService, decorators: [{ type: Optional },] },
];
ClrVerticalNavLink.propDecorators = {
    "expandParentNavGroup": [{ type: HostListener, args: ['click',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
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
                imports: [CommonModule, ClrIconModule, ClrIfExpandModule],
                declarations: [CLR_VERTICAL_NAV_DIRECTIVES],
                exports: [CLR_VERTICAL_NAV_DIRECTIVES, ClrIfExpandModule, ClrIconModule],
            },] },
];
/**
 * @deprecated since 0.11
 */
const VerticalNav = ClrVerticalNav;
/**
 * @deprecated since 0.11
 */
const VerticalNavGroup = ClrVerticalNavGroup;
/**
 * @deprecated since 0.11
 */
const VerticalNavGroupChildren = ClrVerticalNavGroupChildren;
/**
 * @deprecated since 0.11
 */
const VerticalNavIcon = ClrVerticalNavIcon;
/**
 * @deprecated since 0.11
 */
const VerticalNavLink = ClrVerticalNavLink;
/**
 * @deprecated since 0.11
 */
const VERTICAL_NAV_DIRECTIVES = CLR_VERTICAL_NAV_DIRECTIVES;

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ClrLayoutModule {
}
ClrLayoutModule.decorators = [
    { type: NgModule, args: [{ exports: [ClrMainContainerModule, ClrNavigationModule, ClrTabsModule, ClrVerticalNavModule] },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
    { type: Injectable },
];
/** @nocollapse */
ScrollingService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/*
 * @deprecated since 0.12
 */
const GHOST_PAGE_ANIMATION = {
    STATES: { NO_PAGES: 'inactive', ALL_PAGES: 'ready', NEXT_TO_LAST_PAGE: 'penultimateGhost', LAST_PAGE: 'lastGhost' },
    TRANSITIONS: { IN: '100ms ease-out', OUT: '100ms ease-in' },
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ClrModal {
    /**
     * @param {?} _scrollingService
     */
    constructor(_scrollingService) {
        this._scrollingService = _scrollingService;
        this._open = false;
        this._openChanged = new EventEmitter(false);
        this.closable = true;
        this.staticBackdrop = false;
        this.skipAnimation = 'false';
        // presently this is only used by wizards
        this.ghostPageState = 'hidden';
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
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (!this.bypassScrollService && changes && changes.hasOwnProperty('_open')) {
            if (changes["_open"].currentValue) {
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
        if (this._open === true) {
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
        if (!this.closable || this._open === false) {
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
                template: `
<!--
  ~ Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
  ~ This software is released under MIT license.
  ~ The full license information can be found in LICENSE in the root directory of this project.
  -->

<div clrFocusTrap class="modal" *ngIf="_open">
    <!--fixme: revisit when ngClass works with exit animation-->
    <div [@fadeDown]="skipAnimation" (@fadeDown.done)="fadeDone($event)"
         class="modal-dialog"
         [class.modal-sm]="size == 'sm'"
         [class.modal-lg]="size == 'lg'"
         [class.modal-xl]="size == 'xl'"
         role="dialog" [attr.aria-hidden]="!_open">

        <div class="modal-outer-wrapper">
            <div class="modal-content-wrapper">
                <!-- only used in wizards -->
                <ng-content select=".modal-nav"></ng-content>

                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-label="Close"
                                *ngIf="closable" (click)="close()">
                            <clr-icon aria-hidden="true" shape="close"></clr-icon>
                        </button>
                        <ng-content select=".modal-title"></ng-content>
                    </div>
                    <ng-content select=".modal-body"></ng-content>
                    <ng-content select=".modal-footer"></ng-content>
                </div>
            </div>
            <!--todo: deprecate the modal-ghost-wrapper div below after 0.12-->
            <div class="modal-ghost-wrapper">
                <div [@ghostPageOneState]="ghostPageState" class="modal-ghost modal-ghost-1"></div>
                <div [@ghostPageTwoState]="ghostPageState" class="modal-ghost modal-ghost-2"></div>
            </div>
        </div>
    </div>

    <div [@fade] class="modal-backdrop"
         aria-hidden="true"
         (click)="staticBackdrop || close()"></div>
</div>

`,
                styles: [
                    `
        :host { display: none; }
        :host.open { display: inline; }
    `,
                ],
                animations: [
                    trigger('fadeDown', [
                        transition('* => false', [style({ opacity: 0, transform: 'translate(0, -25%)' }), animate('0.2s ease-in-out')]),
                        transition('false => *', [animate('0.2s ease-in-out', style({ opacity: 0, transform: 'translate(0, -25%)' }))]),
                    ]),
                    trigger('fade', [
                        transition('void => *', [style({ opacity: 0 }), animate('0.2s ease-in-out', style({ opacity: 0.85 }))]),
                        transition('* => void', [animate('0.2s ease-in-out', style({ opacity: 0 }))]),
                    ]),
                    trigger('ghostPageOneState', [
                        state(GHOST_PAGE_ANIMATION.STATES.NO_PAGES, style({ left: '-24px' })),
                        state(GHOST_PAGE_ANIMATION.STATES.ALL_PAGES, style({ left: '0' })),
                        state(GHOST_PAGE_ANIMATION.STATES.NEXT_TO_LAST_PAGE, style({ left: '-24px' })),
                        state(GHOST_PAGE_ANIMATION.STATES.LAST_PAGE, style({ left: '-24px' })),
                        transition(GHOST_PAGE_ANIMATION.STATES.NO_PAGES + ' => *', animate(GHOST_PAGE_ANIMATION.TRANSITIONS.IN)),
                        transition(GHOST_PAGE_ANIMATION.STATES.ALL_PAGES + ' => *', animate(GHOST_PAGE_ANIMATION.TRANSITIONS.OUT)),
                        transition(GHOST_PAGE_ANIMATION.STATES.LAST_PAGE + ' => *', animate(GHOST_PAGE_ANIMATION.TRANSITIONS.IN)),
                        transition(GHOST_PAGE_ANIMATION.STATES.NEXT_TO_LAST_PAGE + ' => *', animate(GHOST_PAGE_ANIMATION.TRANSITIONS.OUT)),
                    ]),
                    // TODO: USE TRANSFORM, NOT LEFT...
                    trigger('ghostPageTwoState', [
                        state(GHOST_PAGE_ANIMATION.STATES.NO_PAGES, style({ left: '-24px', top: '24px', bottom: '24px' })),
                        state(GHOST_PAGE_ANIMATION.STATES.ALL_PAGES, style({ left: '24px' })),
                        state(GHOST_PAGE_ANIMATION.STATES.NEXT_TO_LAST_PAGE, style({ left: '0px', top: '24px', bottom: '24px', background: '#bbb' })),
                        state(GHOST_PAGE_ANIMATION.STATES.LAST_PAGE, style({ left: '-24px', top: '24px', bottom: '24px' })),
                        transition(GHOST_PAGE_ANIMATION.STATES.NO_PAGES + ' => *', animate(GHOST_PAGE_ANIMATION.TRANSITIONS.IN)),
                        transition(GHOST_PAGE_ANIMATION.STATES.ALL_PAGES + ' => *', animate(GHOST_PAGE_ANIMATION.TRANSITIONS.OUT)),
                        transition(GHOST_PAGE_ANIMATION.STATES.LAST_PAGE + ' => *', animate(GHOST_PAGE_ANIMATION.TRANSITIONS.IN)),
                        transition(GHOST_PAGE_ANIMATION.STATES.NEXT_TO_LAST_PAGE + ' => *', animate(GHOST_PAGE_ANIMATION.TRANSITIONS.OUT)),
                    ]),
                ],
            },] },
];
/** @nocollapse */
ClrModal.ctorParameters = () => [
    { type: ScrollingService, },
];
ClrModal.propDecorators = {
    "focusTrap": [{ type: ViewChild, args: [FocusTrapDirective,] },],
    "_open": [{ type: HostBinding, args: ['class.open',] }, { type: Input, args: ['clrModalOpen',] },],
    "_openChanged": [{ type: Output, args: ['clrModalOpenChange',] },],
    "closable": [{ type: Input, args: ['clrModalClosable',] },],
    "size": [{ type: Input, args: ['clrModalSize',] },],
    "staticBackdrop": [{ type: Input, args: ['clrModalStaticBackdrop',] },],
    "skipAnimation": [{ type: Input, args: ['clrModalSkipAnimation',] },],
    "ghostPageState": [{ type: Input, args: ['clrModalGhostPageState',] },],
    "bypassScrollService": [{ type: Input, args: ['clrModalOverrideScrollService',] },],
    "stopClose": [{ type: Input, args: ['clrModalPreventClose',] },],
    "altClose": [{ type: Output, args: ['clrModalAlternateClose',] },],
    "close": [{ type: HostListener, args: ['body:keyup.escape',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const CLR_MODAL_DIRECTIVES = [ClrModal];
class ClrModalModule {
}
ClrModalModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, ClrIconModule, ClrFocusTrapModule],
                declarations: [CLR_MODAL_DIRECTIVES],
                exports: [CLR_MODAL_DIRECTIVES],
            },] },
];
/**
 * @deprecated since 0.11
 */
const Modal = ClrModal;
/**
 * @deprecated since 0.11
 */
const MODAL_DIRECTIVES = CLR_MODAL_DIRECTIVES;

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @record
 */

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
 * @suppress {checkTypes} checked by tsc
 */
// aka where the arrow / pointer is at in relation to the anchor
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
     */
    constructor(injector, parentHost) {
        if (!parentHost) {
            throw new Error('clr-signpost-content should only be used inside of a clr-signpost');
        }
        super(injector, parentHost);
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
        const /** @type {?} */ setPosition = SIGNPOST_POSITIONS[this.position];
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
                <button type="button" class="signpost-action close" aria-label="Close" (click)="close()">
                    <clr-icon aria-hidden="true" shape="close"></clr-icon>
                </button>
            </div>
            <div class="signpost-content-body">
                <ng-content></ng-content>
            </div>
        </div>
    `,
                host: { '[class.signpost-content]': 'true' },
            },] },
];
/** @nocollapse */
ClrSignpostContent.ctorParameters = () => [
    { type: Injector, },
    { type: ElementRef, decorators: [{ type: Optional }, { type: Inject, args: [POPOVER_HOST_ANCHOR,] },] },
];
ClrSignpostContent.propDecorators = {
    "position": [{ type: Input, args: ['clrPosition',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const CLR_SIGNPOST_DIRECTIVES = [ClrSignpost, ClrSignpostContent, ClrSignpostTrigger];
class ClrSignpostModule {
}
ClrSignpostModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, ClrCommonPopoverModule, ClrIconModule],
                declarations: [CLR_SIGNPOST_DIRECTIVES],
                exports: [CLR_SIGNPOST_DIRECTIVES, ClrConditionalModule],
                providers: [],
            },] },
];
/**
 * @deprecated since 0.11
 */
const Signpost = ClrSignpost;
/**
 * @deprecated since 0.11
 */
const SignpostContent = ClrSignpostContent;
/**
 * @deprecated since 0.11
 */
const SignpostTrigger = ClrSignpostTrigger;
/**
 * @deprecated since 0.11
 */
const SIGNPOST_DIRECTIVES = CLR_SIGNPOST_DIRECTIVES;

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
                providers: [IfOpenService, { provide: POPOVER_HOST_ANCHOR, useExisting: ElementRef }],
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const POSITIONS$1 = ['bottom-left', 'bottom-right', 'top-left', 'top-right', 'right', 'left'];
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
                },
            },] },
];
/** @nocollapse */
ClrTooltipContent.ctorParameters = () => [
    { type: Injector, },
    { type: ElementRef, decorators: [{ type: Optional }, { type: Inject, args: [POPOVER_HOST_ANCHOR,] },] },
];
ClrTooltipContent.propDecorators = {
    "position": [{ type: Input, args: ['clrPosition',] },],
    "size": [{ type: Input, args: ['clrSize',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
    { type: Directive, args: [{ selector: '[clrTooltipTrigger]', host: { '[attr.tabindex]': '0', '[class.tooltip-trigger]': 'true' } },] },
];
/** @nocollapse */
ClrTooltipTrigger.ctorParameters = () => [
    { type: IfOpenService, },
];
ClrTooltipTrigger.propDecorators = {
    "showTooltip": [{ type: HostListener, args: ['mouseenter',] }, { type: HostListener, args: ['focus',] },],
    "hideTooltip": [{ type: HostListener, args: ['mouseleave',] }, { type: HostListener, args: ['blur',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const CLR_TOOLTIP_DIRECTIVES = [ClrTooltip, ClrTooltipTrigger, ClrTooltipContent];
class ClrTooltipModule {
}
ClrTooltipModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, ClrCommonPopoverModule],
                declarations: [CLR_TOOLTIP_DIRECTIVES],
                exports: [CLR_TOOLTIP_DIRECTIVES, ClrConditionalModule, ClrIconModule],
            },] },
];
/**
 * @deprecated since 0.11
 */
const Tooltip = ClrTooltip;
/**
 * @deprecated since 0.11
 */
const TooltipContent = ClrTooltipContent;
/**
 * @deprecated since 0.11
 */
const TooltipTrigger = ClrTooltipTrigger;
/**
 * @deprecated since 0.11
 */
const TOOLTIP_DIRECTIVES = CLR_TOOLTIP_DIRECTIVES;

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ClrPopoverModule {
}
ClrPopoverModule.decorators = [
    { type: NgModule, args: [{ exports: [ClrDropdownModule, ClrSignpostModule, ClrTooltipModule] },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
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
    { type: Injectable },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
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
 *   \@ViewChild("wizard") wizard: Wizard;
 *   ...
 * }
 *
 * The heart of the page collection is the query list of pages, which it is assigned as a
 * reference to the Wizard.pages QueryList when the wizard is created.
 *
 */
class PageCollectionService {
    constructor() {
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
        const /** @type {?} */ pageCount = this.pagesCount;
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
        const /** @type {?} */ pageCount = this.pagesCount;
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
        const /** @type {?} */ foundPages = this.pages.filter((page) => id === page.id);
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
        const /** @type {?} */ pageCount = this.pagesCount;
        const /** @type {?} */ pagesLastIndex = pageCount > 1 ? pageCount - 1 : 0;
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
        const /** @type {?} */ index = this.pagesAsArray.indexOf(page);
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
        const /** @type {?} */ foundPagesCount = results.length || 0;
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
        let /** @type {?} */ pages = [];
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
        const /** @type {?} */ pageIndex = this.getPageIndex(page);
        const /** @type {?} */ otherPageIndex = this.getPageIndex(otherPage);
        let /** @type {?} */ startIndex;
        let /** @type {?} */ endIndex;
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
        const /** @type {?} */ myPageIndex = this.getPageIndex(page);
        const /** @type {?} */ previousPageIndex = myPageIndex - 1;
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
        let /** @type {?} */ previousPage;
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
        const /** @type {?} */ myPageIndex = this.getPageIndex(page);
        const /** @type {?} */ nextPageIndex = myPageIndex + 1;
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
        const /** @type {?} */ pageId = page.id;
        const /** @type {?} */ pageIdParts = pageId.split('-').reverse();
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
        const /** @type {?} */ pageHasOverrides = page.stopNext || page.preventDefault;
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
        const /** @type {?} */ firstIncompleteIndex = this.findFirstIncompletePageIndex();
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
        let /** @type {?} */ returnIndex = null;
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
        const /** @type {?} */ myIncompleteIndex = this.findFirstIncompletePageIndex();
        return this.pagesAsArray[myIncompleteIndex];
    }
}
PageCollectionService.decorators = [
    { type: Injectable },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
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
 *   \@ViewChild("wizard") wizard: Wizard;
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
        /**
         * \@memberof WizardNavigationService
         * @deprecated since 0.12
         */
        this._wizardGhostPageState = GHOST_PAGE_ANIMATION.STATES.NO_PAGES;
        /**
         * \@memberof WizardNavigationService
         * @deprecated since 0.12
         */
        this._hideWizardGhostPages = true;
        this.previousButtonSubscription = this.buttonService.previousBtnClicked.subscribe(() => {
            const /** @type {?} */ currentPage = this.currentPage;
            if (this.currentPageIsFirst || currentPage.previousStepDisabled) {
                return;
            }
            currentPage.previousButtonClicked.emit(currentPage);
            if (!currentPage.preventDefault) {
                this.previous();
            }
        });
        this.nextButtonSubscription = this.buttonService.nextBtnClicked.subscribe(() => {
            this.checkAndCommitCurrentPage('next');
        });
        this.dangerButtonSubscription = this.buttonService.dangerBtnClicked.subscribe(() => {
            this.checkAndCommitCurrentPage('danger');
        });
        this.finishButtonSubscription = this.buttonService.finishBtnClicked.subscribe(() => {
            this.checkAndCommitCurrentPage('finish');
        });
        this.customButtonSubscription = this.buttonService.customBtnClicked.subscribe((type) => {
            if (!this.wizardStopNavigation) {
                this.currentPage.customButtonClicked.emit(type);
            }
        });
        this.cancelButtonSubscription = this.buttonService.cancelBtnClicked.subscribe(() => {
            if (this.wizardStopNavigation) {
                return;
            }
            if (this.currentPage.preventDefault) {
                this.currentPage.pageOnCancel.emit(this.currentPage);
            }
            else {
                this.cancel();
            }
        });
        this.pagesResetSubscription = this.pageCollection.pagesReset.subscribe(() => {
            this.setFirstPageCurrent();
        });
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
     * next to last page in the Wizard.
     *
     * This is used to determine the animation state of ghost pages.
     *
     * \@memberof WizardNavigationService
     * @return {?}
     */
    get currentPageIsNextToLast() {
        return this.pageCollection.penultimatePage === this.currentPage;
    }
    /**
     * Returns a Boolean that tells you whether or not the current page is the
     * last page in the Wizard.
     *
     * This is used to determine the animation state of ghost pages as well as
     * which buttons should display in the wizard footer.
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
     * (DEPRECATED) A legacy means of setting the current page in the wizard.
     * Deprecated in 0.9.4. Accepts a ClrWizardPage object as a parameter and then
     * tries to set that page to be the current page in the wizard.
     *
     * \@memberof WizardNavigationService
     * @param {?} page
     * @return {?}
     */
    setCurrentPage(page) {
        this.currentPage = page;
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
        const /** @type {?} */ currentPage = this.currentPage;
        const /** @type {?} */ nextPage = this.pageCollection.getNextPage(currentPage);
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
        const /** @type {?} */ currentPage = this.currentPage;
        let /** @type {?} */ iAmTheLastPage;
        let /** @type {?} */ isNext;
        let /** @type {?} */ isDanger;
        let /** @type {?} */ isDangerNext;
        let /** @type {?} */ isDangerFinish;
        let /** @type {?} */ isFinish;
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
        let /** @type {?} */ previousPage;
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
        let /** @type {?} */ pageToGoTo;
        let /** @type {?} */ currentPage;
        let /** @type {?} */ myPages;
        let /** @type {?} */ pagesToCheck;
        let /** @type {?} */ okayToMove = true;
        let /** @type {?} */ goingForward;
        let /** @type {?} */ currentPageIndex;
        let /** @type {?} */ goToPageIndex;
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
            pagesToCheck.forEach((page) => {
                if (page !== pageToGoTo) {
                    page.completed = true;
                }
            });
        }
        else if (!goingForward && this.forceForwardNavigation) {
            pagesToCheck.forEach((page) => {
                page.completed = false;
            });
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
        let /** @type {?} */ okayToMove = true;
        const /** @type {?} */ myPages = this.pageCollection;
        // previous page can be important when moving because if it's completed it
        // allows us to move to the page even if it's incomplete...
        let /** @type {?} */ previousPagePasses;
        if (!pagesToCheck || pagesToCheck.length < 1) {
            return false;
        }
        pagesToCheck.forEach((page) => {
            let /** @type {?} */ previousPage;
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
        });
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
        const /** @type {?} */ allPages = this.pageCollection.pagesAsArray;
        let /** @type {?} */ lastCompletedPageIndex = null;
        allPages.forEach((page, index) => {
            if (page.completed) {
                lastCompletedPageIndex = index;
            }
        });
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
     * \@memberof WizardNavigationService
     * @deprecated since 0.12
     * @return {?}
     */
    get wizardGhostPageState() {
        return this._wizardGhostPageState;
    }
    /**
     * \@memberof WizardNavigationService
     * @deprecated since 0.12
     * @param {?} value
     * @return {?}
     */
    set wizardGhostPageState(value) {
        if (this.hideWizardGhostPages) {
            this._wizardGhostPageState = GHOST_PAGE_ANIMATION.STATES.NO_PAGES;
        }
        else {
            this._wizardGhostPageState = value;
        }
    }
    /**
     * \@memberof WizardNavigationService
     * @deprecated since 0.12
     * @return {?}
     */
    get hideWizardGhostPages() {
        return this._hideWizardGhostPages;
    }
    /**
     * \@memberof WizardNavigationService
     * @deprecated since 0.12
     * @param {?} value
     * @return {?}
     */
    set hideWizardGhostPages(value) {
        this._hideWizardGhostPages = value;
    }
    /**
     * Updates the stepnav on the left side of the wizard when pages are dynamically
     * added or removed from the collection of pages.
     *
     * \@memberof WizardNavigationService
     * @return {?}
     */
    updateNavigation() {
        let /** @type {?} */ toSetCurrent;
        let /** @type {?} */ currentPageRemoved;
        this.pageCollection.updateCompletedStates();
        currentPageRemoved = this.pageCollection.pagesAsArray.indexOf(this.currentPage) < 0;
        if (currentPageRemoved) {
            toSetCurrent = this.pageCollection.findFirstIncompletePage();
            this.currentPage = toSetCurrent;
        }
    }
}
WizardNavigationService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
WizardNavigationService.ctorParameters = () => [
    { type: PageCollectionService, },
    { type: ButtonHubService, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class HeaderActionService {
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
        const /** @type {?} */ wizardHdrActions = this.wizardHeaderActions;
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
    { type: Injectable },
];
/** @nocollapse */
HeaderActionService.ctorParameters = () => [
    { type: WizardNavigationService, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
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
                host: { class: 'clr-wizard-header-action-wrapper' },
            },] },
];
/** @nocollapse */
ClrWizardHeaderAction.propDecorators = {
    "title": [{ type: Input, args: ['title',] },],
    "_id": [{ type: Input, args: ['id',] },],
    "disabled": [{ type: Input, args: ['clrWizardHeaderActionDisabled',] },],
    "headerActionClicked": [{ type: Output, args: ['actionClicked',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
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
    { type: Directive, args: [{ selector: '[clrPageButtons]' },] },
];
/** @nocollapse */
ClrWizardPageButtons.ctorParameters = () => [
    { type: TemplateRef, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
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
    { type: Directive, args: [{ selector: '[clrPageHeaderActions]' },] },
];
/** @nocollapse */
ClrWizardPageHeaderActions.ctorParameters = () => [
    { type: TemplateRef, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
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
    { type: Directive, args: [{ selector: '[clrPageNavTitle]' },] },
];
/** @nocollapse */
ClrWizardPageNavTitle.ctorParameters = () => [
    { type: TemplateRef, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
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
    { type: Directive, args: [{ selector: '[clrPageTitle]' },] },
];
/** @nocollapse */
ClrWizardPageTitle.ctorParameters = () => [
    { type: TemplateRef, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
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
        const /** @type {?} */ valBool = !!val;
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
        const /** @type {?} */ valBool = !!val;
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
        const /** @type {?} */ valBool = !!val;
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
        const /** @type {?} */ valBool = !!val;
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
        const /** @type {?} */ idIsNonZeroFalsy = !this._id && this._id !== 0;
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
        const /** @type {?} */ previousPage = this.pageCollection.getPreviousPage(this);
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
        const /** @type {?} */ navService = this.navService;
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
                },
            },] },
];
/** @nocollapse */
ClrWizardPage.ctorParameters = () => [
    { type: WizardNavigationService, },
    { type: PageCollectionService, },
    { type: ButtonHubService, },
];
ClrWizardPage.propDecorators = {
    "pageTitle": [{ type: ContentChild, args: [ClrWizardPageTitle,] },],
    "pageNavTitle": [{ type: ContentChild, args: [ClrWizardPageNavTitle,] },],
    "_buttons": [{ type: ContentChild, args: [ClrWizardPageButtons,] },],
    "_headerActions": [{ type: ContentChild, args: [ClrWizardPageHeaderActions,] },],
    "nextStepDisabled": [{ type: Input, args: ['clrWizardPageNextDisabled',] },],
    "nextStepDisabledChange": [{ type: Output, args: ['clrWizardPageNextDisabledChange',] },],
    "previousStepDisabled": [{ type: Input, args: ['clrWizardPagePreviousDisabled',] },],
    "previousStepDisabledChange": [{ type: Output, args: ['clrWizardPagePreviousDisabledChange',] },],
    "preventDefault": [{ type: Input, args: ['clrWizardPagePreventDefault',] },],
    "stopCancel": [{ type: Input, args: ['clrWizardPagePreventDefaultCancel',] },],
    "stopCancelChange": [{ type: Output, args: ['clrWizardPagePreventDefaultCancelChange',] },],
    "stopNext": [{ type: Input, args: ['clrWizardPagePreventDefaultNext',] },],
    "onCommit": [{ type: Output, args: ['clrWizardPageOnCommit',] },],
    "onLoad": [{ type: Output, args: ['clrWizardPageOnLoad',] },],
    "pageOnCancel": [{ type: Output, args: ['clrWizardPageOnCancel',] },],
    "finishButtonClicked": [{ type: Output, args: ['clrWizardPageFinish',] },],
    "previousButtonClicked": [{ type: Output, args: ['clrWizardPagePrevious',] },],
    "nextButtonClicked": [{ type: Output, args: ['clrWizardPageNext',] },],
    "dangerButtonClicked": [{ type: Output, args: ['clrWizardPageDanger',] },],
    "primaryButtonClicked": [{ type: Output, args: ['clrWizardPagePrimary',] },],
    "customButtonClicked": [{ type: Output, args: ['clrWizardPageCustomButton',] },],
    "_id": [{ type: Input, args: ['id',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
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
        /**
         * The property that reveals the ghost pages in the wizard. Set through the
         * clrWizardshowGhostPages input.
         *
         * \@memberof Wizard
         * @deprecated since 0.12
         *
         */
        this.showGhostPages = false;
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
        this.goNextSubscription = this.navService.movedToNextPage.subscribe(() => {
            this.onMoveNext.emit();
        });
        this.goPreviousSubscription = this.navService.movedToPreviousPage.subscribe(() => {
            this.onMovePrevious.emit();
        });
        this.cancelSubscription = this.navService.notifyWizardCancel.subscribe(() => {
            this.checkAndCancel();
        });
        this.wizardFinishedSubscription = this.navService.wizardFinished.subscribe(() => {
            if (!this.stopNext) {
                this.forceFinish();
            }
            this.wizardFinished.emit();
        });
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
        this.currentPageSubscription = this.navService.currentPageChanged.subscribe((page) => {
            this.setGhostPages();
            this.currentPageChanged.emit();
        });
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
        const /** @type {?} */ navService = this.navService;
        this.pageCollection.pages = this.pages;
        this.headerActionService.wizardHeaderActions = this.headerActions;
        if (this.showGhostPages) {
            navService.hideWizardGhostPages = false;
            this.deactivateGhostPages();
        }
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
        const /** @type {?} */ changes = this.differ.diff(this.pages);
        if (changes) {
            changes.forEachAddedItem((r) => {
                this.navService.updateNavigation();
            });
            changes.forEachRemovedItem((r) => {
                this.navService.updateNavigation();
            });
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
        this.setGhostPages();
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
        this.deactivateGhostPages();
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
     * DEPRECATED. Moves the wizard to the previous page. Carried over from legacy.
     *
     * It is recommended that you use previous() instead.
     *
     * \@name prev
     * \@memberof ClrWizard
     * @return {?}
     */
    prev() {
        this.previous();
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
        this.deactivateGhostPages();
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
        const /** @type {?} */ currentPage = this.currentPage;
        const /** @type {?} */ currentPageHasOverrides = currentPage.stopCancel || currentPage.preventDefault;
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
    /**
     * A convenience getter to retrieve the ghost Page animation state from
     * WizardNavigationService.
     *
     * \@name ghostPageState
     * \@memberof Wizard
     * @deprecated since 0.12
     * @return {?}
     */
    get ghostPageState() {
        return this.navService.wizardGhostPageState;
    }
    /**
     * Convenience method that resets the ghost page animation.
     *
     * \@name deactivateGhostPages
     * \@memberof ClrWizard
     * @deprecated since 0.12
     * @return {?}
     */
    deactivateGhostPages() {
        this.setGhostPages('deactivate');
    }
    /**
     * Manages the state of the ghost page animation based on the location
     * of the current page in the workflow.
     *
     * Accepts an optional string parameter that can reset the ghost page
     * animation to its closed state.
     *
     * \@name setGhostPages
     *
     * \@memberof ClrWizard
     * @param {?=} deactivateOrNot
     * @return {?}
     */
    setGhostPages(deactivateOrNot = '') {
        const /** @type {?} */ navService = this.navService;
        const /** @type {?} */ ghostpageStates = GHOST_PAGE_ANIMATION.STATES;
        if (this.showGhostPages) {
            if (deactivateOrNot === 'deactivate') {
                navService.wizardGhostPageState = ghostpageStates.NO_PAGES;
            }
            else if (navService.currentPageIsLast) {
                navService.wizardGhostPageState = ghostpageStates.LAST_PAGE;
            }
            else if (navService.currentPageIsNextToLast) {
                navService.wizardGhostPageState = ghostpageStates.NEXT_TO_LAST_PAGE;
            }
            else {
                navService.wizardGhostPageState = ghostpageStates.ALL_PAGES;
            }
        }
    }
}
ClrWizard.decorators = [
    { type: Component, args: [{
                selector: 'clr-wizard',
                providers: [WizardNavigationService, PageCollectionService, ButtonHubService, HeaderActionService],
                template: `<!--
  ~ Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
  ~ This software is released under MIT license.
  ~ The full license information can be found in LICENSE in the root directory of this project.
  -->

<!--todo: deprecate clrModalGhostPageState after 0.12-->
<clr-modal
    [clrModalOpen]="_open"
    [clrModalSize]="size"
    [clrModalClosable]="closable"
    [clrModalStaticBackdrop]="true"
    [clrModalSkipAnimation]="stopModalAnimations"
    [clrModalGhostPageState]="ghostPageState"
    [clrModalOverrideScrollService]="isStatic"
    [clrModalPreventClose]="true"
    (clrModalAlternateClose)="modalCancel()">

    <nav class="modal-nav clr-wizard-stepnav-wrapper">
        <h3 class="clr-wizard-title"><ng-content select="clr-wizard-title"></ng-content></h3>
        <clr-wizard-stepnav></clr-wizard-stepnav>
    </nav>

    <h3 class="modal-title">
        <span class="modal-title-text">
            <ng-template [ngTemplateOutlet]="navService.currentPageTitle"></ng-template>
        </span>

        <div class="modal-header-actions-wrapper" *ngIf="headerActionService.displayHeaderActionsWrapper">
            <div *ngIf="headerActionService.showWizardHeaderActions">
                <ng-content select="clr-wizard-header-action"></ng-content>
            </div>
            <div *ngIf="headerActionService.currentPageHasHeaderActions">
                <ng-template [ngTemplateOutlet]="navService.currentPage.headerActions"></ng-template>
            </div>
        </div>
    </h3>

    <div class="modal-body">
        <main clr-wizard-pages-wrapper class="clr-wizard-content">
            <ng-content></ng-content>
        </main>
    </div>
    <div class="modal-footer clr-wizard-footer">
        <div class="clr-wizard-footer-buttons">
            <div *ngIf="navService.currentPage && !navService.currentPage.hasButtons"
                class="clr-wizard-footer-buttons-wrapper">
                <ng-content select="clr-wizard-button"></ng-content>
            </div>
            <div *ngIf="navService.currentPage && navService.currentPage.hasButtons"
                class="clr-wizard-footer-buttons-wrapper">
                <ng-template [ngTemplateOutlet]="navService.currentPage.buttons"></ng-template>
            </div>
        </div>
    </div>
</clr-modal>
`,
                host: {
                    '[class.clr-wizard]': 'true',
                    '[class.wizard-md]': "size == 'md'",
                    '[class.wizard-lg]': "size == 'lg'",
                    '[class.wizard-xl]': "size == 'xl'",
                    '[class.lastPage]': 'navService.currentPageIsLast',
                    '[class.clr-wizard--ghosted]': 'showGhostPages',
                },
            },] },
];
/** @nocollapse */
ClrWizard.ctorParameters = () => [
    { type: WizardNavigationService, },
    { type: PageCollectionService, },
    { type: ButtonHubService, },
    { type: HeaderActionService, },
    { type: ElementRef, },
    { type: IterableDiffers, },
];
ClrWizard.propDecorators = {
    "size": [{ type: Input, args: ['clrWizardSize',] },],
    "showGhostPages": [{ type: Input, args: ['clrWizardShowGhostPages',] },],
    "forceForward": [{ type: Input, args: ['clrWizardForceForwardNavigation',] },],
    "closable": [{ type: Input, args: ['clrWizardClosable',] },],
    "clrWizardOpen": [{ type: Input, args: ['clrWizardOpen',] },],
    "_openChanged": [{ type: Output, args: ['clrWizardOpenChange',] },],
    "onCancel": [{ type: Output, args: ['clrWizardOnCancel',] },],
    "wizardFinished": [{ type: Output, args: ['clrWizardOnFinish',] },],
    "onReset": [{ type: Output, args: ['clrWizardOnReset',] },],
    "pages": [{ type: ContentChildren, args: [ClrWizardPage,] },],
    "headerActions": [{ type: ContentChildren, args: [ClrWizardHeaderAction,] },],
    "currentPageChanged": [{ type: Output, args: ['clrWizardCurrentPageChanged',] },],
    "onMoveNext": [{ type: Output, args: ['clrWizardOnNext',] },],
    "onMovePrevious": [{ type: Output, args: ['clrWizardOnPrevious',] },],
    "stopNext": [{ type: Input, args: ['clrWizardPreventDefaultNext',] },],
    "stopCancel": [{ type: Input, args: ['clrWizardPreventDefaultCancel',] },],
    "stopNavigation": [{ type: Input, args: ['clrWizardPreventNavigation',] },],
    "disableStepnav": [{ type: Input, args: ['clrWizardDisableStepnav',] },],
    "_stopModalAnimations": [{ type: Input, args: ['clrWizardPreventModalAnimation',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const DEFAULT_BUTTON_TYPES = {
    cancel: 'cancel',
    previous: 'previous',
    next: 'next',
    finish: 'finish',
    danger: 'danger',
};
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
        const /** @type {?} */ disabled = true;
        const /** @type {?} */ nav = this.navService;
        const /** @type {?} */ page = this.navService.currentPage;
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
        const /** @type {?} */ hidden = true;
        const /** @type {?} */ nav = this.navService;
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
                styles: ['[aria-hidden="true"] { display: none; }'],
            },] },
];
/** @nocollapse */
ClrWizardButton.ctorParameters = () => [
    { type: WizardNavigationService, },
    { type: ButtonHubService, },
];
ClrWizardButton.propDecorators = {
    "type": [{ type: Input, args: ['type',] },],
    "disabled": [{ type: Input, args: ['clrWizardButtonDisabled',] },],
    "hidden": [{ type: Input, args: ['clrWizardButtonHidden',] },],
    "wasClicked": [{ type: Output, args: ['clrWizardButtonClicked',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class ClrWizardCustomTags {
}
ClrWizardCustomTags.decorators = [
    { type: Directive, args: [{ selector: 'clr-wizard-title, clr-wizard-pagetitle' },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
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
                host: { class: 'clr-wizard-stepnav' },
            },] },
];
/** @nocollapse */
ClrWizardStepnav.ctorParameters = () => [
    { type: PageCollectionService, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
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
                    role: 'presentation',
                    '[class.clr-nav-link]': 'true',
                    '[class.nav-item]': 'true',
                    '[class.active]': 'isCurrent',
                    '[class.disabled]': 'isDisabled',
                    '[class.no-click]': '!canNavigate',
                    '[class.complete]': 'isComplete',
                },
            },] },
];
/** @nocollapse */
ClrWizardStepnavItem.ctorParameters = () => [
    { type: WizardNavigationService, },
    { type: PageCollectionService, },
];
ClrWizardStepnavItem.propDecorators = {
    "page": [{ type: Input, args: ['page',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
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
            },] },
];
/**
 * @deprecated since 0.11
 */
const Wizard = ClrWizard;
/**
 * @deprecated since 0.11
 */
const WizardPage = ClrWizardPage;
/**
 * @deprecated since 0.11
 */
const WizardStepnav = ClrWizardStepnav;
/**
 * @deprecated since 0.11
 */
const WizardStepnavItem = ClrWizardStepnavItem;
/**
 * @deprecated since 0.11
 */
const WizardButton = ClrWizardButton;
/**
 * @deprecated since 0.11
 */
const WizardHeaderAction = ClrWizardHeaderAction;
/**
 * @deprecated since 0.11
 */
const WizardCustomTags = ClrWizardCustomTags;
/**
 * @deprecated since 0.11
 */
const WizardPageTitleDirective = ClrWizardPageTitle;
/**
 * @deprecated since 0.11
 */
const WizardPageNavTitleDirective = ClrWizardPageNavTitle;
/**
 * @deprecated since 0.11
 */
const WizardPageButtonsDirective = ClrWizardPageButtons;
/**
 * @deprecated since 0.11
 */
const WizardPageHeaderActionsDirective = ClrWizardPageHeaderActions;
/**
 * @deprecated since 0.11
 */
const WIZARD_DIRECTIVES = CLR_WIZARD_DIRECTIVES;

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ClarityModule {
    /**
     * @deprecated
     * @return {?}
     */
    static forRoot() {
        return { ngModule: ClarityModule, providers: [] };
    }
    /**
     * @deprecated
     * @return {?}
     */
    static forChild() {
        return { ngModule: ClarityModule, providers: [] };
    }
}
ClarityModule.decorators = [
    { type: NgModule, args: [{
                exports: [
                    ClrEmphasisModule,
                    ClrDataModule,
                    ClrIconModule,
                    ClrModalModule,
                    ClrLoadingModule,
                    ClrIfExpandModule,
                    ClrConditionalModule,
                    ClrFocusTrapModule,
                    ClrButtonModule,
                    ClrCodeModule,
                    ClrFormsModule,
                    ClrLayoutModule,
                    ClrPopoverModule,
                    ClrWizardModule,
                ],
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class NgControlService {
    constructor() {
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
    { type: Injectable },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class IfErrorService {
    /**
     * @param {?} ngControlService
     */
    constructor(ngControlService) {
        this.ngControlService = ngControlService;
        this._statusChanges = new Subject();
        this.subscriptions = [];
        // Wait for the control to be available
        this.subscriptions.push(this.ngControlService.controlChanges.subscribe(control => {
            this.control = control;
            this.listenForChanges();
        }));
    }
    /**
     * @return {?}
     */
    get statusChanges() {
        return this._statusChanges.asObservable();
    }
    /**
     * @return {?}
     */
    listenForChanges() {
        this.subscriptions.push(this.control.statusChanges.pipe(filter(() => this.control.touched)).subscribe(() => {
            this._statusChanges.next(this.control);
        }));
    }
    /**
     * @return {?}
     */
    triggerStatusChange() {
        if (this.control) {
            this._statusChanges.next(this.control);
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
}
IfErrorService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
IfErrorService.ctorParameters = () => [
    { type: NgControlService, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ClrIfError {
    /**
     * @param {?} service
     * @param {?} template
     * @param {?} container
     */
    constructor(service, template, container) {
        this.service = service;
        this.template = template;
        this.container = container;
        this.displayed = false;
        if (!this.service) {
            throw new Error('clrIfError can only be used within a form control container element like clr-input-container');
        }
        else {
            this.displayError(false);
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.subscription = this.service.statusChanges.subscribe(control => {
            // If there is a specific error to track, check it, otherwise check overall validity
            if (this.error) {
                this.displayError(control.hasError(this.error));
            }
            else {
                this.displayError(control.invalid);
            }
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    /**
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
    { type: Directive, args: [{ selector: '[clrIfError]' },] },
];
/** @nocollapse */
ClrIfError.ctorParameters = () => [
    { type: IfErrorService, decorators: [{ type: Optional },] },
    { type: TemplateRef, },
    { type: ViewContainerRef, },
];
ClrIfError.propDecorators = {
    "error": [{ type: Input, args: ['clrIfError',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class ClrControlError {
}
ClrControlError.decorators = [
    { type: Component, args: [{
                selector: 'clr-control-error',
                template: `
    <ng-content></ng-content>
    `,
                host: { '[class.clr-subtext]': 'true' },
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/** @enum {string} */
const Layouts = {
    VERTICAL: 'vertical',
    HORIZONTAL: 'horizontal',
    COMPACT: 'compact',
};
class LayoutService {
    constructor() {
        this.layout = Layouts.VERTICAL;
        this.layoutValues = Object.keys(Layouts).map(key => Layouts[key]);
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
    { type: Injectable },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class ClrForm {
}
ClrForm.decorators = [
    { type: Directive, args: [{
                selector: '[clrForm]',
                providers: [LayoutService],
                host: { '[class.clr-form]': 'true' },
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class ClrControlHelper {
}
ClrControlHelper.decorators = [
    { type: Component, args: [{
                selector: 'clr-control-helper',
                template: `
    <ng-content></ng-content>
    `,
                host: { '[class.clr-subtext]': 'true' },
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ClrLabel {
    /**
     * @param {?} controlIdService
     * @param {?} ifErrorService
     * @param {?} layoutService
     * @param {?} renderer
     * @param {?} el
     */
    constructor(controlIdService, ifErrorService, layoutService, renderer, el) {
        this.controlIdService = controlIdService;
        this.ifErrorService = ifErrorService;
        this.layoutService = layoutService;
        this.renderer = renderer;
        this.el = el;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // Only add the clr-control-label if it is inside a control container
        if (this.ifErrorService) {
            this.renderer.addClass(this.el.nativeElement, 'clr-control-label');
        }
        // Only set the grid column classes if we are in the right context and if they aren't already set
        if (this.layoutService &&
            !this.layoutService.isVertical() &&
            this.el.nativeElement &&
            this.el.nativeElement.getAttribute('class').indexOf('clr-col') === -1) {
            this.renderer.addClass(this.el.nativeElement, 'clr-col-xs-12');
            this.renderer.addClass(this.el.nativeElement, 'clr-col-md-2');
        }
        if (!this.forAttr && this.controlIdService) {
            this.subscription = this.controlIdService.idChange.subscribe(id => (this.forAttr = id));
        }
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
ClrLabel.decorators = [
    { type: Directive, args: [{ selector: 'label' },] },
];
/** @nocollapse */
ClrLabel.ctorParameters = () => [
    { type: ControlIdService, decorators: [{ type: Optional },] },
    { type: IfErrorService, decorators: [{ type: Optional },] },
    { type: LayoutService, decorators: [{ type: Optional },] },
    { type: Renderer2, },
    { type: ElementRef, },
];
ClrLabel.propDecorators = {
    "forAttr": [{ type: HostBinding, args: ['attr.for',] }, { type: Input, args: ['for',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
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
                selector: '[clrLayout]',
                host: {
                    '[class]': 'layoutService.layoutClass',
                },
            },] },
];
/** @nocollapse */
ClrLayout.ctorParameters = () => [
    { type: LayoutService, },
];
ClrLayout.propDecorators = {
    "layout": [{ type: Input, args: ['clrLayout',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class ClrCommonFormsModule {
}
ClrCommonFormsModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: [ClrLabel, ClrControlError, ClrControlHelper, ClrIfError, ClrForm, ClrLayout],
                exports: [ClrLabel, ClrControlError, ClrControlHelper, ClrIfError, ClrForm, ClrLayout],
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class ClrCheckboxContainer {
    constructor() {
        // Indicates whether the container is dynamically created by the checkbox input itself
        this._dynamic = false;
    }
}
ClrCheckboxContainer.decorators = [
    { type: Component, args: [{
                selector: 'clr-checkbox-container',
                template: `
        <!-- We want the checkbox input to be before the label, always -->
        <ng-content select="[clrCheckbox]"></ng-content>
        <ng-content></ng-content>
        <label *ngIf="_dynamic"></label>
    `,
                host: { '[class.checkbox]': 'true' },
                providers: [ControlIdService],
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class ClrCheckboxNext extends WrappedFormControl {
    /**
     * @param {?} vcr
     */
    constructor(vcr) {
        super(ClrCheckboxContainer, vcr);
    }
}
ClrCheckboxNext.decorators = [
    { type: Directive, args: [{ selector: '[clrCheckbox]' },] },
];
/** @nocollapse */
ClrCheckboxNext.ctorParameters = () => [
    { type: ViewContainerRef, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class ClrCheckboxNextModule {
}
ClrCheckboxNextModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, ClrCommonFormsModule, ClrHostWrappingModule],
                declarations: [ClrCheckboxNext, ClrCheckboxContainer],
                exports: [ClrCommonFormsModule, ClrCheckboxNext, ClrCheckboxContainer],
                entryComponents: [ClrCheckboxContainer],
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class ControlClassService {
    constructor() {
        this.className = '';
    }
    /**
     * @param {?=} invalid
     * @param {?=} grid
     * @return {?}
     */
    controlClass(invalid = false, grid = false) {
        const /** @type {?} */ controlClasses = [];
        if (invalid) {
            controlClasses.push('clr-error');
        }
        if (grid && this.className.indexOf('clr-col') === -1) {
            controlClasses.push('clr-col-md-10 clr-col-xs-12');
        }
        return controlClasses.join(' ');
    }
}
ControlClassService.decorators = [
    { type: Injectable },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class ClrInputContainer {
    /**
     * @param {?} ifErrorService
     * @param {?} layoutService
     * @param {?} controlClassService
     */
    constructor(ifErrorService, layoutService, controlClassService) {
        this.ifErrorService = ifErrorService;
        this.layoutService = layoutService;
        this.controlClassService = controlClassService;
        this.invalid = false;
        this._dynamic = false;
        this.subscription = this.ifErrorService.statusChanges.subscribe(control => {
            this.invalid = control.invalid;
        });
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
        if (this.subscription) {
            this.subscription.unsubscribe();
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
                <clr-icon *ngIf="invalid" class="clr-validate-icon" shape="exclamation-circle"></clr-icon>
            </div>
            <ng-content select="clr-control-helper" *ngIf="!invalid"></ng-content>
            <ng-content select="clr-control-error" *ngIf="invalid"></ng-content>
        </div>
    `,
                host: {
                    '[class.clr-form-control]': 'true',
                    '[class.clr-row]': 'addGrid()',
                },
                providers: [IfErrorService, NgControlService, ControlIdService, ControlClassService],
            },] },
];
/** @nocollapse */
ClrInputContainer.ctorParameters = () => [
    { type: IfErrorService, },
    { type: LayoutService, decorators: [{ type: Optional },] },
    { type: ControlClassService, },
];
ClrInputContainer.propDecorators = {
    "label": [{ type: ContentChild, args: [ClrLabel,] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class ClrInput extends WrappedFormControl {
    /**
     * @param {?} vcr
     * @param {?} ngControlService
     * @param {?} ifErrorService
     * @param {?} control
     * @param {?} controlClassService
     * @param {?} type
     * @param {?} renderer
     * @param {?} el
     */
    constructor(vcr, ngControlService, ifErrorService, control, controlClassService, type, renderer, el) {
        super(ClrInputContainer, vcr, 1);
        this.ngControlService = ngControlService;
        this.ifErrorService = ifErrorService;
        this.control = control;
        this.type = type;
        if (!control) {
            throw new Error('clrInput can only be used within an Angular form control, add ngModel or formControl to the input');
        }
        // Set type if it is missing
        if (!this.type) {
            renderer.setAttribute(el.nativeElement, 'type', 'text');
        }
        if (controlClassService) {
            controlClassService.className = el.nativeElement.className;
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        if (this.ngControlService) {
            this.ngControlService.setControl(this.control);
        }
    }
    /**
     * @return {?}
     */
    onBlur() {
        if (this.ifErrorService) {
            this.ifErrorService.triggerStatusChange();
        }
    }
}
ClrInput.decorators = [
    { type: Directive, args: [{ selector: '[clrInput]', host: { '[class.clr-input]': 'true' } },] },
];
/** @nocollapse */
ClrInput.ctorParameters = () => [
    { type: ViewContainerRef, },
    { type: NgControlService, decorators: [{ type: Optional },] },
    { type: IfErrorService, decorators: [{ type: Optional },] },
    { type: NgControl, decorators: [{ type: Optional },] },
    { type: ControlClassService, decorators: [{ type: Optional },] },
    { type: undefined, decorators: [{ type: Attribute, args: ['type',] },] },
    { type: Renderer2, },
    { type: ElementRef, },
];
ClrInput.propDecorators = {
    "onBlur": [{ type: HostListener, args: ['blur',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class ClrInputModule {
}
ClrInputModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, FormsModule, ClrIconModule, ClrCommonFormsModule],
                declarations: [ClrInput, ClrInputContainer],
                exports: [ClrCommonFormsModule, ClrInput, ClrInputContainer],
                entryComponents: [ClrInputContainer],
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class ClrRadioContainer {
    constructor() {
        // Indicates whether the container is dynamically created by the radio button itself
        this._dynamic = false;
    }
}
ClrRadioContainer.decorators = [
    { type: Component, args: [{
                selector: 'clr-radio-container',
                template: `
        <!-- We want the radio input to be before the label, always -->
        <ng-content select="[clrRadio]"></ng-content>
        <ng-content></ng-content>
        <label *ngIf="_dynamic"></label>
    `,
                host: { '[class.radio]': 'true' },
                providers: [ControlIdService],
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class ClrRadio extends WrappedFormControl {
    /**
     * @param {?} vcr
     */
    constructor(vcr) {
        super(ClrRadioContainer, vcr);
    }
}
ClrRadio.decorators = [
    { type: Directive, args: [{ selector: '[clrRadio]' },] },
];
/** @nocollapse */
ClrRadio.ctorParameters = () => [
    { type: ViewContainerRef, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class ClrRadioModule {
}
ClrRadioModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, ClrCommonFormsModule, ClrHostWrappingModule],
                declarations: [ClrRadio, ClrRadioContainer],
                exports: [ClrCommonFormsModule, ClrRadio, ClrRadioContainer],
                entryComponents: [ClrRadioContainer],
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class ClrTextareaContainer {
    /**
     * @param {?} ifErrorService
     * @param {?} layoutService
     * @param {?} controlClassService
     */
    constructor(ifErrorService, layoutService, controlClassService) {
        this.ifErrorService = ifErrorService;
        this.layoutService = layoutService;
        this.controlClassService = controlClassService;
        this.invalid = false;
        this._dynamic = false;
        this.subscription = this.ifErrorService.statusChanges.subscribe(control => {
            this.invalid = control.invalid;
        });
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
        if (this.subscription) {
            this.subscription.unsubscribe();
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
                <clr-icon *ngIf="invalid" class="clr-validate-icon" shape="exclamation-circle"></clr-icon>
            </div>
            <ng-content select="clr-control-helper" *ngIf="!invalid"></ng-content>
            <ng-content select="clr-control-error" *ngIf="invalid"></ng-content>
        </div>
    `,
                host: {
                    '[class.clr-form-control]': 'true',
                    '[class.clr-row]': 'addGrid()',
                },
                providers: [IfErrorService, NgControlService, ControlIdService, ControlClassService],
            },] },
];
/** @nocollapse */
ClrTextareaContainer.ctorParameters = () => [
    { type: IfErrorService, },
    { type: LayoutService, decorators: [{ type: Optional },] },
    { type: ControlClassService, },
];
ClrTextareaContainer.propDecorators = {
    "label": [{ type: ContentChild, args: [ClrLabel,] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class ClrTextarea extends WrappedFormControl {
    /**
     * @param {?} vcr
     * @param {?} ngControlService
     * @param {?} ifErrorService
     * @param {?} control
     * @param {?} controlClassService
     * @param {?} renderer
     * @param {?} el
     */
    constructor(vcr, ngControlService, ifErrorService, control, controlClassService, renderer, el) {
        super(ClrTextareaContainer, vcr, 1);
        this.ngControlService = ngControlService;
        this.ifErrorService = ifErrorService;
        this.control = control;
        if (!control) {
            throw new Error('clrTextarea can only be used within an Angular form control, add ngModel or formControl to the textarea');
        }
        if (controlClassService) {
            controlClassService.className = el.nativeElement.className;
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        if (this.ngControlService) {
            this.ngControlService.setControl(this.control);
        }
    }
    /**
     * @return {?}
     */
    onBlur() {
        if (this.ifErrorService) {
            this.ifErrorService.triggerStatusChange();
        }
    }
}
ClrTextarea.decorators = [
    { type: Directive, args: [{ selector: '[clrTextarea]', host: { '[class.clr-textarea]': 'true' } },] },
];
/** @nocollapse */
ClrTextarea.ctorParameters = () => [
    { type: ViewContainerRef, },
    { type: NgControlService, decorators: [{ type: Optional },] },
    { type: IfErrorService, decorators: [{ type: Optional },] },
    { type: NgControl, decorators: [{ type: Optional },] },
    { type: ControlClassService, decorators: [{ type: Optional },] },
    { type: Renderer2, },
    { type: ElementRef, },
];
ClrTextarea.propDecorators = {
    "onBlur": [{ type: HostListener, args: ['blur',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class ClrTextareaModule {
}
ClrTextareaModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, FormsModule, ClrIconModule, ClrCommonFormsModule],
                declarations: [ClrTextarea, ClrTextareaContainer],
                exports: [ClrCommonFormsModule, ClrTextarea, ClrTextareaContainer],
                entryComponents: [ClrTextareaContainer],
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class ClrFormsNextModule {
}
ClrFormsNextModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [
                    ClrCommonFormsModule,
                    ClrCheckboxNextModule,
                    ClrInputModule,
                    ClrTextareaModule,
                    ClrRadioModule,
                    ClrDatepickerModule,
                ],
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @param {?} direction
 * @return {?}
 */
function fadeSlide(direction) {
    let /** @type {?} */ transform = null;
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
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @param {?} direction
 * @return {?}
 */
function slide(direction) {
    let /** @type {?} */ transform = null;
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
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { FocusTrapTracker as ÇlrFocusTrapTracker, ClarityModule, ClrButtonModule, ClrButton, ClrButtonGroup, CLR_BUTTON_GROUP_DIRECTIVES, ClrButtonGroupModule, Button, ButtonGroup, BUTTON_GROUP_DIRECTIVES, ClrLoadingButton, CLR_LOADING_BUTTON_DIRECTIVES, ClrLoadingButtonModule, LoadingButton, LOADING_BUTTON_DIRECTIVES, ClrCodeModule, ClrCodeHighlight, CLR_CODE_HIGHLIGHT_DIRECTIVES, ClrSyntaxHighlightModule, CodeHighlight, CODE_HIGHLIGHT_DIRECTIVES, ClrDataModule, ClrDatagrid, ClrDatagridActionBar, ClrDatagridActionOverflow, ClrDatagridColumn, ClrDatagridColumnToggle, ClrDatagridHideableColumn, ClrDatagridFilter, ClrDatagridItems, ClrDatagridRow, ClrDatagridRowDetail, ClrDatagridCell, ClrDatagridFooter, ClrDatagridPagination, ClrDatagridPlaceholder, ClrDatagridSortOrder, DatagridStringFilter, DatagridPropertyStringFilter, DatagridPropertyComparator, CLR_DATAGRID_DIRECTIVES, ClrDatagridModule, Datagrid, DatagridActionBar, DatagridActionOverflow, DatagridColumn, DatagridColumnToggle, DatagridHideableColumnDirective, DatagridFilter, DatagridItems, DatagridRow, DatagridRowDetail, DatagridCell, DatagridFooter, DatagridPagination, DatagridPlaceholder, SortOrder, DATAGRID_DIRECTIVES, ClrTreeNode, CLR_TREE_VIEW_DIRECTIVES, ClrTreeViewModule, TreeNode, TREE_VIEW_DIRECTIVES, ClrStackView, ClrStackHeader, ClrStackBlock, ClrStackInput, ClrStackSelect, CLR_STACK_VIEW_DIRECTIVES, ClrStackViewModule, StackView, StackHeader, StackBlock, StackViewCustomTags, StackInput, StackSelect, STACK_VIEW_DIRECTIVES, ClrStackViewCustomTags, ClrEmphasisModule, ClrAlert, ClrAlertItem, ClrAlerts, ClrAlertsPager, CLR_ALERT_DIRECTIVES, ClrAlertModule, Alert, AlertItem, Alerts, AlertsPager, ALERT_DIRECTIVES, ClrIfError, ClrControlError, ClrForm, ClrControlHelper, ClrLabel, ClrLayout, ClrCommonFormsModule, ClrDateContainer, ClrDateInput, ClrDatepickerViewManager, ClrDaypicker, ClrMonthpicker, ClrYearpicker, ClrCalendar, ClrDay, CLR_DATEPICKER_DIRECTIVES, ClrDatepickerModule, ClrCheckboxNext, ClrCheckboxContainer, ClrCheckboxNextModule, ClrInput, ClrInputContainer, ClrInputModule, ClrRadio, ClrRadioContainer, ClrRadioModule, ClrTextarea, ClrTextareaContainer, ClrTextareaModule, ClrFormsNextModule, ClrCheckboxDeprecated, CLR_CHECKBOX_DIRECTIVES, ClrCheckboxModule, Checkbox, ClrCheckbox, CHECKBOX_DIRECTIVES, ClrFormsModule, ClrIconCustomTag, CLR_ICON_DIRECTIVES, ClrIconModule, IconCustomTag, ICON_DIRECTIVES, ClrLayoutModule, ClrMainContainer, CLR_LAYOUT_DIRECTIVES, ClrMainContainerModule, MainContainer, LAYOUT_DIRECTIVES, MainContainerWillyWonka, NavDetectionOompaLoompa, ClrHeader, ClrNavLevel, CLR_NAVIGATION_DIRECTIVES, ClrNavigationModule, Header, NavLevelDirective, NAVIGATION_DIRECTIVES, ClrTabs, ClrTab, ClrTabContent, ClrTabOverflowContent, ClrTabLink, CLR_TABS_DIRECTIVES, ClrTabsModule, Tab, Tabs, TabContent, TabOverflowContent, TabLinkDirective, TABS_DIRECTIVES, ClrVerticalNavGroupChildren, ClrVerticalNavGroup, ClrVerticalNav, ClrVerticalNavLink, ClrVerticalNavIcon, CLR_VERTICAL_NAV_DIRECTIVES, ClrVerticalNavModule, VerticalNav, VerticalNavGroup, VerticalNavGroupChildren, VerticalNavIcon, VerticalNavLink, VERTICAL_NAV_DIRECTIVES, ClrModal, CLR_MODAL_DIRECTIVES, ClrModalModule, Modal, MODAL_DIRECTIVES, ClrDropdown, ClrDropdownMenu, ClrDropdownTrigger, ClrDropdownItem, CLR_MENU_POSITIONS, CLR_DROPDOWN_DIRECTIVES, ClrDropdownModule, Dropdown, DropdownMenu, DropdownTrigger, DropdownItem, menuPositions, DROPDOWN_DIRECTIVES, ClrPopoverModule, ClrSignpost, ClrSignpostContent, ClrSignpostTrigger, CLR_SIGNPOST_DIRECTIVES, ClrSignpostModule, Signpost, SignpostContent, SignpostTrigger, SIGNPOST_DIRECTIVES, ClrTooltip, ClrTooltipTrigger, ClrTooltipContent, CLR_TOOLTIP_DIRECTIVES, ClrTooltipModule, Tooltip, TooltipContent, TooltipTrigger, TOOLTIP_DIRECTIVES, collapse, fade, fadeSlide, slide, ClrLoadingState, ClrLoading, LoadingListener, CLR_LOADING_DIRECTIVES, ClrLoadingModule, Loading, LOADING_DIRECTIVES, CONDITIONAL_DIRECTIVES, ClrIfActive, ClrIfOpen, EXPAND_DIRECTIVES, ClrIfExpanded, ClrWizard, ClrWizardPage, ClrWizardStepnav, ClrWizardStepnavItem, DEFAULT_BUTTON_TYPES, CUSTOM_BUTTON_TYPES, ClrWizardButton, ClrWizardHeaderAction, ClrWizardCustomTags, ClrWizardPageTitle, ClrWizardPageNavTitle, ClrWizardPageButtons, ClrWizardPageHeaderActions, CLR_WIZARD_DIRECTIVES, ClrWizardModule, Wizard, WizardPage, WizardStepnav, WizardStepnavItem, WizardButton, WizardHeaderAction, WizardCustomTags, WizardPageTitleDirective, WizardPageNavTitleDirective, WizardPageButtonsDirective, WizardPageHeaderActionsDirective, WIZARD_DIRECTIVES, ButtonInGroupService as ɵdb, DatagridRowExpandAnimation as ɵcq, ActionableOompaLoompa as ɵcn, DatagridWillyWonka as ɵcl, ExpandableOompaLoompa as ɵcp, ClrDatagridColumnToggleButton as ɵby, ClrDatagridColumnToggleTitle as ɵbx, DatagridDetailRegisterer as ɵca, ClrDatagridItemsTrackBy as ɵbz, ColumnToggleButtonsService as ɵbs, CustomFilter as ɵbv, DragDispatcher as ɵbu, FiltersProvider as ɵbj, ExpandableRowsCount as ɵbp, HideableColumnService as ɵbq, Items as ɵbi, Page as ɵbk, RowActionService as ɵbo, Selection as ɵbh, Sort as ɵbm, StateDebouncer as ɵbl, StateProvider as ɵbr, DatagridBodyRenderer as ɵci, DatagridCellRenderer as ɵck, DatagridColumnResizer as ɵcf, DomAdapter as ɵcd, DatagridHeadRenderer as ɵch, DatagridHeaderRenderer as ɵce, DatagridMainRenderer as ɵcc, domAdapterFactory as ɵcb, DatagridRenderOrganizer as ɵbn, DatagridRowRenderer as ɵcj, DatagridTableRenderer as ɵcg, DatagridFilterRegistrar as ɵbt, StackControl as ɵcs, AbstractTreeSelection as ɵct, clrTreeSelectionProviderFactory as ɵcv, TreeSelectionService as ɵcu, AlertIconAndTypesService as ɵo, MultiAlertService as ɵp, IfErrorService as ɵdw, ControlClassService as ɵdz, ControlIdService as ɵx, LayoutService as ɵdy, NgControlService as ɵdx, WrappedFormControl as ɵbb, DateFormControlService as ɵw, DateIOService as ɵz, DateNavigationService as ɵv, DatepickerEnabledService as ɵba, DatepickerFocusService as ɵbd, LocaleHelperService as ɵy, ViewManagerService as ɵbc, ResponsiveNavigationProvider as ɵdd, ResponsiveNavigationService as ɵdc, ActiveOompaLoompa as ɵdn, TabsWillyWonka as ɵdm, AriaService as ɵdh, TabsService as ɵdl, TABS_ID as ɵdi, TABS_ID_PROVIDER as ɵdk, tokenFactory$1 as ɵdj, VerticalNavGroupRegistrationService as ɵdq, VerticalNavGroupService as ɵdr, VerticalNavIconService as ɵdp, VerticalNavService as ɵdo, GHOST_PAGE_ANIMATION as ɵda, AbstractPopover as ɵi, POPOVER_DIRECTIVES as ɵb, POPOVER_HOST_ANCHOR as ɵh, PopoverDirectiveOld as ɵc, ClrCommonPopoverModule as ɵa, ROOT_DROPDOWN_PROVIDER as ɵg, RootDropdownService as ɵe, clrRootDropdownFactory as ɵf, OompaLoompa as ɵco, WillyWonka as ɵcm, ClrConditionalModule as ɵj, IF_ACTIVE_ID as ɵk, IF_ACTIVE_ID_PROVIDER as ɵm, IfActiveService as ɵn, tokenFactory as ɵl, IfOpenService as ɵd, ClrIfExpandModule as ɵcr, Expand as ɵbw, FocusTrapDirective as ɵu, ClrFocusTrapModule as ɵs, FOCUS_TRAP_DIRECTIVES as ɵt, EmptyAnchor as ɵr, ClrHostWrappingModule as ɵq, UNIQUE_ID as ɵcw, UNIQUE_ID_PROVIDER as ɵcy, uniqueIdFactory as ɵcx, OUSTIDE_CLICK_DIRECTIVES as ɵbf, OutsideClick as ɵbg, ClrOutsideClickModule as ɵbe, ScrollingService as ɵcz, TEMPLATE_REF_DIRECTIVES as ɵdf, TemplateRefContainer as ɵdg, ClrTemplateRefModule as ɵde, ButtonHubService as ɵdu, HeaderActionService as ɵdv, PageCollectionService as ɵdt, WizardNavigationService as ɵds };
//# sourceMappingURL=clr-angular.js.map
