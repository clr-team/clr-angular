import { NgControl, FormsModule, SelectMultipleControlValueAccessor } from '@angular/forms';
import { first, filter, switchMap, map } from 'rxjs/operators';
import { __extends, __assign, __values, __spread, __read } from 'tslib';
import { CommonModule, DOCUMENT, isPlatformBrowser, FormatWidth, FormStyle, getLocaleDateFormat, getLocaleDayNames, getLocaleFirstDayOfWeek, getLocaleMonthNames, TranslationWidth, NgForOf } from '@angular/common';
import { Subject, BehaviorSubject, of, combineLatest, isObservable, ReplaySubject } from 'rxjs';
import { Directive, NgModule, EventEmitter, Input, Output, TemplateRef, ViewContainerRef, Optional, Injectable, Component, SkipSelf, ViewChild, forwardRef, InjectionToken, ContentChildren, QueryList, ElementRef, HostListener, Renderer2, HostBinding, Inject, Injector, NgZone, ComponentFactoryResolver, ContentChild, ChangeDetectorRef, IterableDiffers, PLATFORM_ID, defineInjectable, LOCALE_ID, Self, Attribute } from '@angular/core';
import { animate, keyframes, style, transition, trigger, state } from '@angular/animations';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrIconCustomTag = /** @class */ (function () {
    function ClrIconCustomTag() {
    }
    ClrIconCustomTag.decorators = [
        { type: Directive, args: [{ selector: 'clr-icon' },] }
    ];
    return ClrIconCustomTag;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var CLR_ICON_DIRECTIVES = [ClrIconCustomTag];
var ClrIconModule = /** @class */ (function () {
    function ClrIconModule() {
    }
    ClrIconModule.decorators = [
        { type: NgModule, args: [{ imports: [CommonModule], declarations: [CLR_ICON_DIRECTIVES], exports: [CLR_ICON_DIRECTIVES] },] }
    ];
    return ClrIconModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {number} */
var Point = {
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
var POSITION_RELATIVE = 'relative';
/** @type {?} */
var POSITION_ABSOLUTE = 'absolute';
/** @type {?} */
var POSITION_FIXED = 'fixed';
/** @type {?} */
var OVERFLOW_SCROLL = 'scroll';
/** @type {?} */
var OVERFLOW_AUTO = 'auto';
var Popover = /** @class */ (function () {
    function Popover(element) {
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
    // TODO: need a way to account for parameters that change dynamically (positioning).
    /**
     * @param {?} anchor
     * @param {?} anchorAlign
     * @param {?} popoverAlign
     * @param {?=} __3
     * @return {?}
     */
    Popover.prototype.anchor = 
    // TODO: need a way to account for parameters that change dynamically (positioning).
    /**
     * @param {?} anchor
     * @param {?} anchorAlign
     * @param {?} popoverAlign
     * @param {?=} __3
     * @return {?}
     */
    function (anchor, anchorAlign, popoverAlign, _a) {
        // TODO: we are assuming here that the popover is inside or next to the anchor.
        // We'd need to go up the popover tree too otherwise
        var _b = _a === void 0 ? {} : _a, _c = _b.offsetX, offsetX = _c === void 0 ? 0 : _c, _d = _b.offsetY, offsetY = _d === void 0 ? 0 : _d, _e = _b.useAnchorParent, useAnchorParent = _e === void 0 ? false : _e;
        this.addScrollEventListeners(anchor);
        if (useAnchorParent) {
            anchor = anchor.parentNode;
        }
        // explicitly override anchor's style to static
        anchor.style.position = 'static';
        /** @type {?} */
        var anchorRect = anchor.getBoundingClientRect();
        /** @type {?} */
        var popoverRect = this.element.getBoundingClientRect();
        // position of left top corner of anchor + the offset
        /** @type {?} */
        var leftDiff = anchorRect.left - popoverRect.left + offsetX;
        /** @type {?} */
        var topDiff = anchorRect.top - popoverRect.top + offsetY;
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
        var popoverComputedStyle = getComputedStyle(this.element);
        /** @type {?} */
        var marginLeft = parseInt(popoverComputedStyle.marginLeft, 10);
        /** @type {?} */
        var marginRight = parseInt(popoverComputedStyle.marginRight, 10);
        /** @type {?} */
        var marginTop = parseInt(popoverComputedStyle.marginTop, 10);
        /** @type {?} */
        var marginBottom = parseInt(popoverComputedStyle.marginBottom, 10);
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
        this.element.style.transform = "translateX(" + Math.round(leftDiff) + "px) translateY(" + Math.round(topDiff) + "px)";
        return this._scroll.asObservable();
    };
    /**
     * @return {?}
     */
    Popover.prototype.release = /**
     * @return {?}
     */
    function () {
        this.element.style.transform = '';
        this.removeScrollEventListeners();
    };
    /**
     * @private
     * @param {?} container
     * @return {?}
     */
    Popover.prototype.isPositioned = /**
     * @private
     * @param {?} container
     * @return {?}
     */
    function (container) {
        /** @type {?} */
        var position = getComputedStyle(container).position;
        return position === POSITION_RELATIVE || position === POSITION_ABSOLUTE || position === POSITION_FIXED;
    };
    /**
     * @private
     * @return {?}
     */
    Popover.prototype.emitScrollEvent = /**
     * @private
     * @return {?}
     */
    function () {
        this._scroll.next();
    };
    /**
     * @private
     * @param {?} e
     * @return {?}
     */
    Popover.prototype.addScrollEventListeners = /**
     * @private
     * @param {?} e
     * @return {?}
     */
    function (e) {
        this._scroll = new Subject();
        /** @type {?} */
        var anchor = e;
        /** @type {?} */
        var current = e;
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
    };
    /**
     * @private
     * @return {?}
     */
    Popover.prototype.removeScrollEventListeners = /**
     * @private
     * @return {?}
     */
    function () {
        var e_1, _a;
        try {
            for (var _b = __values(this.scrollableElements), _c = _b.next(); !_c.done; _c = _b.next()) {
                var elem = _c.value;
                elem.removeEventListener('scroll', this.boundOnScrollListener);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.scrollableElements.length = 0;
        if (this._scroll) {
            this._scroll.complete();
            delete this._scroll;
        }
    };
    /**
     * @private
     * @param {?} container
     * @return {?}
     */
    Popover.prototype.scrolls = /**
     * @private
     * @param {?} container
     * @return {?}
     */
    function (container) {
        /** @type {?} */
        var computedStyles = getComputedStyle(container);
        return (computedStyles.overflowX === OVERFLOW_SCROLL ||
            computedStyles.overflowX === OVERFLOW_AUTO ||
            computedStyles.overflowY === OVERFLOW_SCROLL ||
            computedStyles.overflowY === OVERFLOW_AUTO);
    };
    return Popover;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var openCount = 0;
/** @type {?} */
var waiting = [];
// pending create functions
var PopoverDirectiveOld = /** @class */ (function () {
    function PopoverDirectiveOld(templateRef, viewContainer) {
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this.popoverOptions = {};
        this.clrPopoverOldChange = new EventEmitter(false);
    }
    Object.defineProperty(PopoverDirectiveOld.prototype, "clrPopoverOld", {
        set: /**
         * @param {?} open
         * @return {?}
         */
        function (open) {
            var _this = this;
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
                        function () {
                            _this.createPopover();
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
                        var createPopoverFn = waiting.shift();
                        createPopoverFn();
                    }
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    PopoverDirectiveOld.prototype.createPopover = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var embeddedViewRef = (/** @type {?} */ (this.viewContainer.createEmbeddedView(this.templateRef)));
        // TODO: Not sure of the risks associated with using this. Find an alternative.
        // Needed for find the correct height and width of dynamically created views
        // inside of the popover. For Eg: Button Groups
        embeddedViewRef.detectChanges();
        // filter out other nodes in the view ref so we are only left with element nodes
        /** @type {?} */
        var elementNodes = embeddedViewRef.rootNodes.filter((/**
         * @param {?} node
         * @return {?}
         */
        function (node) {
            return node.nodeType === 1;
        }));
        // we take the first element node in the embedded view; usually there should only be one anyways
        this._popoverInstance = new Popover(elementNodes[0]);
        this._subscription = this._popoverInstance
            .anchor(this.anchorElem, this.anchorPoint, this.popoverPoint, this.popoverOptions)
            .subscribe((/**
         * @return {?}
         */
        function () {
            _this.clrPopoverOldChange.emit(false);
        }));
        openCount++;
    };
    /**
     * @return {?}
     */
    PopoverDirectiveOld.prototype.destroyPopover = /**
     * @return {?}
     */
    function () {
        if (this._popoverInstance) {
            this._subscription.unsubscribe();
            this._popoverInstance.release();
            delete this._popoverInstance;
            openCount--;
        }
    };
    /**
     * @return {?}
     */
    PopoverDirectiveOld.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.destroyPopover();
    };
    PopoverDirectiveOld.decorators = [
        { type: Directive, args: [{ selector: '[clrPopoverOld]' },] }
    ];
    /** @nocollapse */
    PopoverDirectiveOld.ctorParameters = function () { return [
        { type: TemplateRef },
        { type: ViewContainerRef }
    ]; };
    PopoverDirectiveOld.propDecorators = {
        anchorElem: [{ type: Input, args: ['clrPopoverOldAnchor',] }],
        anchorPoint: [{ type: Input, args: ['clrPopoverOldAnchorPoint',] }],
        popoverPoint: [{ type: Input, args: ['clrPopoverOldPopoverPoint',] }],
        popoverOptions: [{ type: Input, args: ['clrPopoverOldOptions',] }],
        clrPopoverOldChange: [{ type: Output, args: ['clrPopoverOldChange',] }],
        clrPopoverOld: [{ type: Input }]
    };
    return PopoverDirectiveOld;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var POPOVER_DIRECTIVES = [PopoverDirectiveOld];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrCommonPopoverModule = /** @class */ (function () {
    function ClrCommonPopoverModule() {
    }
    ClrCommonPopoverModule.decorators = [
        { type: NgModule, args: [{ imports: [CommonModule], declarations: [POPOVER_DIRECTIVES], exports: [POPOVER_DIRECTIVES] },] }
    ];
    return ClrCommonPopoverModule;
}());

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
var  /**
 * This is an abstract class because we need it to still be a valid token for dependency injection after transpiling.
 * This does not mean you should extend it, simply implementing it is fine.
 * @abstract
 */
LoadingListener = /** @class */ (function () {
    function LoadingListener() {
    }
    return LoadingListener;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {number} */
var ClrLoadingState = {
    DEFAULT: 0,
    LOADING: 1,
    SUCCESS: 2,
    ERROR: 3,
};
ClrLoadingState[ClrLoadingState.DEFAULT] = 'DEFAULT';
ClrLoadingState[ClrLoadingState.LOADING] = 'LOADING';
ClrLoadingState[ClrLoadingState.SUCCESS] = 'SUCCESS';
ClrLoadingState[ClrLoadingState.ERROR] = 'ERROR';
var ClrLoading = /** @class */ (function () {
    // We find the first parent that handles something loading
    function ClrLoading(listener) {
        this.listener = listener;
        this._loadingState = ClrLoadingState.DEFAULT;
    }
    Object.defineProperty(ClrLoading.prototype, "loadingState", {
        get: /**
         * @return {?}
         */
        function () {
            return this._loadingState;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
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
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ClrLoading.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.loadingState = ClrLoadingState.DEFAULT;
    };
    ClrLoading.decorators = [
        { type: Directive, args: [{ selector: '[clrLoading]' },] }
    ];
    /** @nocollapse */
    ClrLoading.ctorParameters = function () { return [
        { type: LoadingListener, decorators: [{ type: Optional }] }
    ]; };
    ClrLoading.propDecorators = {
        loadingState: [{ type: Input, args: ['clrLoading',] }]
    };
    return ClrLoading;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ButtonInGroupService = /** @class */ (function () {
    function ButtonInGroupService() {
        this._changes = new Subject();
    }
    Object.defineProperty(ButtonInGroupService.prototype, "changes", {
        get: /**
         * @return {?}
         */
        function () {
            return this._changes.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} button
     * @return {?}
     */
    ButtonInGroupService.prototype.updateButtonGroup = /**
     * @param {?} button
     * @return {?}
     */
    function (button) {
        this._changes.next(button);
    };
    ButtonInGroupService.decorators = [
        { type: Injectable }
    ];
    return ButtonInGroupService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrButton = /** @class */ (function () {
    function ClrButton(buttonInGroupService) {
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
    Object.defineProperty(ClrButton.prototype, "inMenu", {
        get: /**
         * @return {?}
         */
        function () {
            return this._inMenu;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            value = !!value;
            if (this._inMenu !== value) {
                this._inMenu = value;
                // We check if the service flag is enabled
                // and if the service exists because the service is optional
                if (this._enableService && this.buttonInGroupService) {
                    this.buttonInGroupService.updateButtonGroup(this);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrButton.prototype, "classNames", {
        get: /**
         * @return {?}
         */
        function () {
            return this._classNames;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (typeof value === 'string') {
                /** @type {?} */
                var classNames = value.split(' ');
                if (classNames.indexOf('btn') === -1) {
                    classNames.push('btn');
                }
                this._classNames = classNames.join(' ');
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrButton.prototype, "name", {
        get: /**
         * @return {?}
         */
        function () {
            return this._name;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (typeof value === 'string') {
                this._name = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrButton.prototype, "type", {
        get: /**
         * @return {?}
         */
        function () {
            return this._type;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (typeof value === 'string') {
                this._type = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrButton.prototype, "id", {
        get: /**
         * @return {?}
         */
        function () {
            return this._id;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (typeof value === 'string') {
                this._id = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrButton.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () {
            return this._disabled;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value !== null && value !== false) {
                this._disabled = '';
            }
            else {
                this._disabled = null;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} state
     * @return {?}
     */
    ClrButton.prototype.loadingStateChange = /**
     * @param {?} state
     * @return {?}
     */
    function (state$$1) {
        this.loading = state$$1 === ClrLoadingState.LOADING;
    };
    /**
     * @return {?}
     */
    ClrButton.prototype.emitClick = /**
     * @return {?}
     */
    function () {
        this._click.emit(true);
    };
    /**
     * @return {?}
     */
    ClrButton.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this._enableService = true;
    };
    ClrButton.decorators = [
        { type: Component, args: [{
                    selector: 'clr-button',
                    template: "\n        <ng-template #buttonProjectedRef>\n            <button \n                [class]=\"classNames\" \n                (click)=\"emitClick()\"\n                [attr.type]=\"type\"\n                [attr.name]=\"name\"\n                [attr.disabled]=\"disabled\"\n                [id]=\"id\">\n                <span class=\"spinner spinner-inline\" *ngIf=\"loading\"></span>\n                <ng-content></ng-content>\n            </button>\n        </ng-template>\n    ",
                    providers: [{ provide: LoadingListener, useExisting: ClrButton }]
                }] }
    ];
    /** @nocollapse */
    ClrButton.ctorParameters = function () { return [
        { type: ButtonInGroupService, decorators: [{ type: SkipSelf }, { type: Optional }] }
    ]; };
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
    return ClrButton;
}());

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
var CLR_MENU_POSITIONS = [
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
var 
// @TODO Put the Required type back in when our minimumly supported version of Angular uses
// TS 2.8 or greater (should be Angular 7)
// export class ClrCommonStringsService implements Required<ClrCommonStrings> {
ClrCommonStringsService = /** @class */ (function () {
    function ClrCommonStringsService() {
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
    }
    return ClrCommonStringsService;
}());
/**
 * @param {?=} existing
 * @return {?}
 */
function commonStringsFactory(existing) {
    /** @type {?} */
    var defaults = new ClrCommonStringsService();
    if (existing) {
        return __assign({}, defaults, existing);
    }
    return defaults;
}
/** @type {?} */
var COMMON_STRINGS_PROVIDER = {
    useFactory: commonStringsFactory,
    // We have a circular dependency for now, we can address it later once these
    // tree-shakeable providers have proper documentation.
    deps: [[new Optional(), new SkipSelf(), forwardRef((/**
             * @return {?}
             */
            function () { return ClrCommonStrings; }))]],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
var ClrCommonStrings = /** @class */ (function () {
    function ClrCommonStrings() {
    }
    ClrCommonStrings.decorators = [
        { type: Injectable, args: [__assign({ providedIn: 'root' }, COMMON_STRINGS_PROVIDER),] }
    ];
    /** @nocollapse */ ClrCommonStrings.ngInjectableDef = defineInjectable({ factory: function ClrCommonStrings_Factory() { return new ClrCommonStrings(); }, token: ClrCommonStrings, providedIn: "root" });
    return ClrCommonStrings;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrButtonGroup = /** @class */ (function () {
    function ClrButtonGroup(buttonGroupNewService, elementRef, commonStrings) {
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
     */
    /**
     * 1. Initializes the initial Button Group View
     * 2. Subscribes to changes on the ContentChildren
     *    in case the user content projection changes
     * @return {?}
     */
    ClrButtonGroup.prototype.ngAfterContentInit = /**
     * 1. Initializes the initial Button Group View
     * 2. Subscribes to changes on the ContentChildren
     *    in case the user content projection changes
     * @return {?}
     */
    function () {
        var _this = this;
        this.initializeButtons();
        this.buttonGroupNewService.changes.subscribe((/**
         * @param {?} button
         * @return {?}
         */
        function (button) { return _this.rearrangeButton(button); }));
        this.buttons.changes.subscribe((/**
         * @return {?}
         */
        function () {
            _this.initializeButtons();
        }));
    };
    /**
     * Moves the button into the other ViewContainer
     * when an update is received.
     *
     * @param button
     */
    /**
     * Moves the button into the other ViewContainer
     * when an update is received.
     *
     * @param {?} button
     * @return {?}
     */
    ClrButtonGroup.prototype.rearrangeButton = /**
     * Moves the button into the other ViewContainer
     * when an update is received.
     *
     * @param {?} button
     * @return {?}
     */
    function (button) {
        /** @type {?} */
        var fromView;
        /** @type {?} */
        var toView;
        if (button.inMenu) {
            fromView = this.inlineButtons;
            toView = this.menuButtons;
        }
        else {
            fromView = this.menuButtons;
            toView = this.inlineButtons;
        }
        /** @type {?} */
        var index = fromView.indexOf(button);
        if (index > -1) {
            fromView.splice(index, 1);
            /** @type {?} */
            var moveIndex = this.getMoveIndex(button);
            if (moveIndex <= toView.length) {
                toView.splice(moveIndex, 0, button);
            }
        }
    };
    /**
     * Author: Eudes
     *
     * Finds the order of a button w.r.t other buttons
     *
     * @param buttonToMove
     * @returns
     */
    /**
     * Author: Eudes
     *
     * Finds the order of a button w.r.t other buttons
     *
     * @param {?} buttonToMove
     * @return {?}
     */
    ClrButtonGroup.prototype.getMoveIndex = /**
     * Author: Eudes
     *
     * Finds the order of a button w.r.t other buttons
     *
     * @param {?} buttonToMove
     * @return {?}
     */
    function (buttonToMove) {
        /** @type {?} */
        var tempArr = this.buttons.filter((/**
         * @param {?} button
         * @return {?}
         */
        function (button) { return button.inMenu === buttonToMove.inMenu; }));
        return tempArr.indexOf(buttonToMove);
    };
    /**
     * @return {?}
     */
    ClrButtonGroup.prototype.initializeButtons = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var tempInlineButtons = [];
        /** @type {?} */
        var tempInMenuButtons = [];
        this.buttons.forEach((/**
         * @param {?} button
         * @return {?}
         */
        function (button) {
            if (button.inMenu) {
                tempInMenuButtons.push(button);
            }
            else {
                tempInlineButtons.push(button);
            }
        }));
        this.inlineButtons = tempInlineButtons;
        this.menuButtons = tempInMenuButtons;
    };
    Object.defineProperty(ClrButtonGroup.prototype, "menuPosition", {
        get: /**
         * @return {?}
         */
        function () {
            return this._menuPosition;
        },
        set: /**
         * @param {?} pos
         * @return {?}
         */
        function (pos) {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrButtonGroup.prototype, "openMenu", {
        get: /**
         * @return {?}
         */
        function () {
            return this._openMenu;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._openMenu = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Toggle the ClrDropdown Menu when the ClrDropdown Toggle is
     * clicked. Also set a flag that indicates that the toggle
     * was clicked so that we don't traverse the DOM to find the
     * location of the click.
     */
    // default if menuPosition isn't set
    /**
     * Toggle the ClrDropdown Menu when the ClrDropdown Toggle is
     * clicked. Also set a flag that indicates that the toggle
     * was clicked so that we don't traverse the DOM to find the
     * location of the click.
     * @return {?}
     */
    ClrButtonGroup.prototype.toggleMenu = 
    // default if menuPosition isn't set
    /**
     * Toggle the ClrDropdown Menu when the ClrDropdown Toggle is
     * clicked. Also set a flag that indicates that the toggle
     * was clicked so that we don't traverse the DOM to find the
     * location of the click.
     * @return {?}
     */
    function () {
        this.openMenu = !this.openMenu;
        this._overflowMenuToggleClicked = true;
    };
    // TODO: Generic Directive to handle this
    /**
     * Called on mouse clicks anywhere in the DOM.
     * Checks to see if the mouseclick happened on the host or outside
     */
    // TODO: Generic Directive to handle this
    /**
     * Called on mouse clicks anywhere in the DOM.
     * Checks to see if the mouseclick happened on the host or outside
     * @param {?} target
     * @return {?}
     */
    ClrButtonGroup.prototype.onMouseClick = 
    // TODO: Generic Directive to handle this
    /**
     * Called on mouse clicks anywhere in the DOM.
     * Checks to see if the mouseclick happened on the host or outside
     * @param {?} target
     * @return {?}
     */
    function (target) {
        if (this.openMenu && !this._overflowMenuToggleClicked) {
            // Reset the overflow menu toggle clicked flag
            this._overflowMenuToggleClicked = false;
            /** @type {?} */
            var current = target;
            // Get the element in the DOM on which the mouse was clicked
            /** @type {?} */
            var host = this.elementRef.nativeElement;
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
    };
    ClrButtonGroup.decorators = [
        { type: Component, args: [{
                    selector: 'clr-button-group',
                    template: "<!--\n  ~ Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.\n  ~ This software is released under MIT license.\n  ~ The full license information can be found in LICENSE in the root directory of this project.\n  -->\n\n<ng-container *ngFor=\"let inlineButton of inlineButtons\">\n    <ng-template [ngTemplateOutlet]=\"inlineButton.templateRef\"></ng-template>\n</ng-container>\n<ng-container *ngIf=\"menuButtons.length > 0\">\n    <div\n        class=\"btn-group-overflow open\"\n        [ngClass]=\"menuPosition\"\n        #anchor>\n        <button\n            class=\"btn dropdown-toggle\"\n            (click)=\"toggleMenu()\">\n            <clr-icon shape=\"ellipsis-horizontal\" [attr.title]=\"commonStrings.more\"></clr-icon>\n        </button>\n        <div\n            class=\"dropdown-menu\"\n            *clrPopoverOld=\"openMenu; anchor: anchor; anchorPoint: anchorPoint; popoverPoint: popoverPoint;\">\n            <ng-template [ngTemplateOutlet]=\"ref\"></ng-template>\n        </div>\n    </div>\n</ng-container>\n<ng-template #ref>\n    <ng-container *ngFor=\"let menuButton of menuButtons\">\n        <ng-template [ngTemplateOutlet]=\"menuButton.templateRef\"></ng-template>\n    </ng-container>\n</ng-template>\n",
                    providers: [ButtonInGroupService],
                    host: { '[class.btn-group]': 'true' }
                }] }
    ];
    /** @nocollapse */
    ClrButtonGroup.ctorParameters = function () { return [
        { type: ButtonInGroupService },
        { type: ElementRef },
        { type: ClrCommonStrings }
    ]; };
    ClrButtonGroup.propDecorators = {
        buttons: [{ type: ContentChildren, args: [ClrButton,] }],
        menuPosition: [{ type: Input, args: ['clrMenuPosition',] }],
        onMouseClick: [{ type: HostListener, args: ['document:click', ['$event.target'],] }]
    };
    return ClrButtonGroup;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var CLR_BUTTON_GROUP_DIRECTIVES = [ClrButton, ClrButtonGroup];
var ClrButtonGroupModule = /** @class */ (function () {
    function ClrButtonGroupModule() {
    }
    ClrButtonGroupModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, ClrIconModule, ClrCommonPopoverModule],
                    declarations: [CLR_BUTTON_GROUP_DIRECTIVES],
                    exports: [CLR_BUTTON_GROUP_DIRECTIVES],
                },] }
    ];
    return ClrButtonGroupModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrLoadingButton = /** @class */ (function () {
    function ClrLoadingButton(el, renderer) {
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
    ClrLoadingButton.prototype.loadingStateChange = /**
     * @param {?} state
     * @return {?}
     */
    function (state$$1) {
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
    };
    /**
     * @private
     * @return {?}
     */
    ClrLoadingButton.prototype.setExplicitButtonWidth = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.el.nativeElement && this.el.nativeElement.getBoundingClientRect) {
            /** @type {?} */
            var boundingClientRect = this.el.nativeElement.getBoundingClientRect();
            this.renderer.setStyle(this.el.nativeElement, 'width', boundingClientRect.width + "px");
        }
    };
    ClrLoadingButton.decorators = [
        { type: Component, args: [{
                    selector: 'button[clrLoading]',
                    template: "\n        <ng-container [ngSwitch]=\"state\">\n            <span *ngSwitchCase=\"buttonState.LOADING\">\n                <span @spinner class=\"spinner spinner-inline\"></span>\n            </span>\n            <span *ngSwitchCase=\"buttonState.SUCCESS\">\n                <span @validated (@validated.done)=\"this.loadingStateChange(this.buttonState.DEFAULT)\" class=\"spinner spinner-inline spinner-check\"></span>\n            </span>\n            <span *ngSwitchCase=\"buttonState.DEFAULT\" @defaultButton>\n                <ng-content></ng-content>\n            </span>\n        </ng-container>\n    ",
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
    ClrLoadingButton.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    ClrLoadingButton.propDecorators = {
        disabled: [{ type: Input, args: ['disabled',] }],
        clrLoadingChange: [{ type: Output, args: ['clrLoadingChange',] }]
    };
    return ClrLoadingButton;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var CLR_LOADING_BUTTON_DIRECTIVES = [ClrLoadingButton];
var ClrLoadingButtonModule = /** @class */ (function () {
    function ClrLoadingButtonModule() {
    }
    ClrLoadingButtonModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    declarations: [CLR_LOADING_BUTTON_DIRECTIVES],
                    exports: [CLR_LOADING_BUTTON_DIRECTIVES],
                },] }
    ];
    return ClrLoadingButtonModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrButtonModule = /** @class */ (function () {
    function ClrButtonModule() {
    }
    ClrButtonModule.decorators = [
        { type: NgModule, args: [{
                    exports: [ClrLoadingButtonModule, ClrButtonGroupModule],
                },] }
    ];
    return ClrButtonModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var EmptyAnchor = /** @class */ (function () {
    function EmptyAnchor() {
    }
    EmptyAnchor.decorators = [
        { type: Component, args: [{
                    template: ''
                }] }
    ];
    return EmptyAnchor;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Internal module, please do not export!
 */
var ClrHostWrappingModule = /** @class */ (function () {
    function ClrHostWrappingModule() {
    }
    ClrHostWrappingModule.decorators = [
        { type: NgModule, args: [{ declarations: [EmptyAnchor], exports: [EmptyAnchor], entryComponents: [EmptyAnchor] },] }
    ];
    return ClrHostWrappingModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var counter = 0;
var ControlIdService = /** @class */ (function () {
    function ControlIdService() {
        this._id = 'clr-form-control-' + ++counter;
        this._idChange = new BehaviorSubject(this._id);
    }
    Object.defineProperty(ControlIdService.prototype, "id", {
        get: /**
         * @return {?}
         */
        function () {
            return this._id;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._id = value;
            this._idChange.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ControlIdService.prototype, "idChange", {
        get: /**
         * @return {?}
         */
        function () {
            return this._idChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    ControlIdService.decorators = [
        { type: Injectable }
    ];
    return ControlIdService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrControlError = /** @class */ (function () {
    function ClrControlError(controlIdService) {
        this.controlIdService = controlIdService;
        this.describedByAttr = null;
        this.subscriptions = [];
    }
    /**
     * @return {?}
     */
    ClrControlError.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.controlIdService && !this.describedByAttr) {
            this.subscriptions.push(this.controlIdService.idChange.subscribe((/**
             * @param {?} id
             * @return {?}
             */
            function (id) { return (_this.describedByAttr = id); })));
        }
    };
    /**
     * @return {?}
     */
    ClrControlError.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        function (sub) { return sub.unsubscribe(); }));
    };
    ClrControlError.decorators = [
        { type: Component, args: [{
                    selector: 'clr-control-error',
                    template: "\n    <ng-content></ng-content>\n    ",
                    host: {
                        '[class.clr-subtext]': 'true',
                        '[attr.aria-live]': '"polite"',
                    }
                }] }
    ];
    /** @nocollapse */
    ClrControlError.ctorParameters = function () { return [
        { type: ControlIdService, decorators: [{ type: Optional }] }
    ]; };
    ClrControlError.propDecorators = {
        describedByAttr: [{ type: Input, args: ['aria-describedby',] }, { type: HostBinding, args: ['attr.aria-describedby',] }]
    };
    return ClrControlError;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrControlHelper = /** @class */ (function () {
    function ClrControlHelper() {
    }
    ClrControlHelper.decorators = [
        { type: Component, args: [{
                    selector: 'clr-control-helper',
                    template: "\n    <ng-content></ng-content>\n    ",
                    host: { '[class.clr-subtext]': 'true' }
                }] }
    ];
    return ClrControlHelper;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgControlService = /** @class */ (function () {
    function NgControlService() {
        // Observable to subscribe to the control, since its not available immediately for projected content
        this._controlChanges = new Subject();
    }
    Object.defineProperty(NgControlService.prototype, "controlChanges", {
        get: /**
         * @return {?}
         */
        function () {
            return this._controlChanges.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} control
     * @return {?}
     */
    NgControlService.prototype.setControl = /**
     * @param {?} control
     * @return {?}
     */
    function (control) {
        this._controlChanges.next(control);
    };
    NgControlService.decorators = [
        { type: Injectable }
    ];
    return NgControlService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var IfErrorService = /** @class */ (function () {
    function IfErrorService(ngControlService) {
        var _this = this;
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
        function (control) {
            if (control) {
                _this.control = control;
                _this.listenForChanges();
            }
        })));
    }
    Object.defineProperty(IfErrorService.prototype, "statusChanges", {
        get: /**
         * @return {?}
         */
        function () {
            return this._statusChanges.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    // Subscribe to the status change events, only after touched and emit the control
    // Subscribe to the status change events, only after touched and emit the control
    /**
     * @private
     * @return {?}
     */
    IfErrorService.prototype.listenForChanges = 
    // Subscribe to the status change events, only after touched and emit the control
    /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.subscriptions.push(this.control.statusChanges.subscribe((/**
         * @return {?}
         */
        function () {
            _this.sendValidity();
        })));
    };
    /**
     * @private
     * @return {?}
     */
    IfErrorService.prototype.sendValidity = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.control.touched && this.control.invalid) {
            this._statusChanges.next(true);
        }
        else {
            this._statusChanges.next(false);
        }
    };
    // Allows a control to push a status check upstream, such as on blur
    // Allows a control to push a status check upstream, such as on blur
    /**
     * @return {?}
     */
    IfErrorService.prototype.triggerStatusChange = 
    // Allows a control to push a status check upstream, such as on blur
    /**
     * @return {?}
     */
    function () {
        if (this.control) {
            this.sendValidity();
        }
    };
    // Clean up subscriptions
    // Clean up subscriptions
    /**
     * @return {?}
     */
    IfErrorService.prototype.ngOnDestroy = 
    // Clean up subscriptions
    /**
     * @return {?}
     */
    function () {
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        function (sub) { return sub.unsubscribe(); }));
    };
    IfErrorService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    IfErrorService.ctorParameters = function () { return [
        { type: NgControlService }
    ]; };
    return IfErrorService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrIfError = /** @class */ (function () {
    function ClrIfError(ifErrorService, ngControlService, template, container) {
        var _this = this;
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
        function (control) {
            _this.control = control;
        })));
        this.subscriptions.push(this.ifErrorService.statusChanges.subscribe((/**
         * @param {?} invalid
         * @return {?}
         */
        function (invalid) {
            // If there is a specific error to track, check it, otherwise check overall validity
            if (_this.error && _this.control) {
                _this.displayError(_this.control.hasError(_this.error));
            }
            else {
                _this.displayError(invalid);
            }
        })));
    }
    /**
     * @return {?}
     */
    ClrIfError.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        function (sub) { return sub.unsubscribe(); }));
    };
    /**
     * @private
     * @param {?} invalid
     * @return {?}
     */
    ClrIfError.prototype.displayError = /**
     * @private
     * @param {?} invalid
     * @return {?}
     */
    function (invalid) {
        if (invalid && !this.displayed) {
            this.container.createEmbeddedView(this.template);
            this.displayed = true;
        }
        else if (!invalid) {
            this.container.clear();
            this.displayed = false;
        }
    };
    ClrIfError.decorators = [
        { type: Directive, args: [{ selector: '[clrIfError]' },] }
    ];
    /** @nocollapse */
    ClrIfError.ctorParameters = function () { return [
        { type: IfErrorService, decorators: [{ type: Optional }] },
        { type: NgControlService, decorators: [{ type: Optional }] },
        { type: TemplateRef },
        { type: ViewContainerRef }
    ]; };
    ClrIfError.propDecorators = {
        error: [{ type: Input, args: ['clrIfError',] }]
    };
    return ClrIfError;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
var Layouts = {
    VERTICAL: 'vertical',
    HORIZONTAL: 'horizontal',
    COMPACT: 'compact',
};
var LayoutService = /** @class */ (function () {
    function LayoutService() {
        this.layout = Layouts.HORIZONTAL;
        // This is basically a replacement for Object.values(), which IE11 and Node <9 don't support :(
        // String enums cannot be reverse-mapped, meaning Layouts['COMPACT'] does not return 'compact' so
        // this exists to deal with this little caveat to get the list of the values as an array.
        this.layoutValues = Object.keys(Layouts).map((/**
         * @param {?} key
         * @return {?}
         */
        function (key) { return Layouts[key]; }));
    }
    /**
     * @return {?}
     */
    LayoutService.prototype.isVertical = /**
     * @return {?}
     */
    function () {
        return this.layout === Layouts.VERTICAL;
    };
    /**
     * @return {?}
     */
    LayoutService.prototype.isHorizontal = /**
     * @return {?}
     */
    function () {
        return this.layout === Layouts.HORIZONTAL;
    };
    /**
     * @return {?}
     */
    LayoutService.prototype.isCompact = /**
     * @return {?}
     */
    function () {
        return this.layout === Layouts.COMPACT;
    };
    Object.defineProperty(LayoutService.prototype, "layoutClass", {
        get: /**
         * @return {?}
         */
        function () {
            return "clr-form-" + this.layout;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} layout
     * @return {?}
     */
    LayoutService.prototype.isValid = /**
     * @param {?} layout
     * @return {?}
     */
    function (layout) {
        return this.layoutValues.indexOf(layout) > -1;
    };
    LayoutService.decorators = [
        { type: Injectable }
    ];
    return LayoutService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrLabel = /** @class */ (function () {
    function ClrLabel(controlIdService, layoutService, ngControlService, renderer, el) {
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
    ClrLabel.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
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
            function (id) { return (_this.forAttr = id); })));
        }
    };
    /**
     * @return {?}
     */
    ClrLabel.prototype.disableGrid = /**
     * @return {?}
     */
    function () {
        this.enableGrid = false;
    };
    /**
     * @return {?}
     */
    ClrLabel.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        function (sub) { return sub.unsubscribe(); }));
    };
    ClrLabel.decorators = [
        { type: Directive, args: [{ selector: 'label' },] }
    ];
    /** @nocollapse */
    ClrLabel.ctorParameters = function () { return [
        { type: ControlIdService, decorators: [{ type: Optional }] },
        { type: LayoutService, decorators: [{ type: Optional }] },
        { type: NgControlService, decorators: [{ type: Optional }] },
        { type: Renderer2 },
        { type: ElementRef }
    ]; };
    ClrLabel.propDecorators = {
        forAttr: [{ type: HostBinding, args: ['attr.for',] }, { type: Input, args: ['for',] }]
    };
    return ClrLabel;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var MarkControlService = /** @class */ (function () {
    function MarkControlService() {
        this._touched = new Subject();
    }
    Object.defineProperty(MarkControlService.prototype, "touchedChange", {
        get: /**
         * @return {?}
         */
        function () {
            return this._touched.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MarkControlService.prototype.markAsTouched = /**
     * @return {?}
     */
    function () {
        this._touched.next();
    };
    MarkControlService.decorators = [
        { type: Injectable }
    ];
    return MarkControlService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrForm = /** @class */ (function () {
    function ClrForm(layoutService, markControlService) {
        this.layoutService = layoutService;
        this.markControlService = markControlService;
    }
    /** @deprecated since 2.0 */
    /**
     * @deprecated since 2.0
     * @return {?}
     */
    ClrForm.prototype.markAsDirty = /**
     * @deprecated since 2.0
     * @return {?}
     */
    function () {
        this.markAsTouched();
    };
    /**
     * @return {?}
     */
    ClrForm.prototype.markAsTouched = /**
     * @return {?}
     */
    function () {
        this.markControlService.markAsTouched();
    };
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
    ClrForm.ctorParameters = function () { return [
        { type: LayoutService },
        { type: MarkControlService }
    ]; };
    return ClrForm;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrLayout = /** @class */ (function () {
    function ClrLayout(layoutService) {
        this.layoutService = layoutService;
    }
    /**
     * @return {?}
     */
    ClrLayout.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        // Only set the layout if it is a valid option
        if (this.layout && this.layoutService.isValid(this.layout)) {
            this.layoutService.layout = this.layout;
        }
    };
    ClrLayout.decorators = [
        { type: Directive, args: [{
                    selector: '[clrForm][clrLayout]',
                },] }
    ];
    /** @nocollapse */
    ClrLayout.ctorParameters = function () { return [
        { type: LayoutService }
    ]; };
    ClrLayout.propDecorators = {
        layout: [{ type: Input, args: ['clrLayout',] }]
    };
    return ClrLayout;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrCommonFormsModule = /** @class */ (function () {
    function ClrCommonFormsModule() {
    }
    ClrCommonFormsModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    declarations: [ClrLabel, ClrControlError, ClrControlHelper, ClrIfError, ClrForm, ClrLayout],
                    exports: [ClrLabel, ClrControlError, ClrControlHelper, ClrIfError, ClrForm, ClrLayout],
                },] }
    ];
    return ClrCommonFormsModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var IS_TOGGLE = new InjectionToken('IS_TOGGLE');
/**
 * @return {?}
 */
function isToggleFactory() {
    return new BehaviorSubject(false);
}
/** @type {?} */
var IS_TOGGLE_PROVIDER = { provide: IS_TOGGLE, useFactory: isToggleFactory };
var ClrCheckboxWrapper = /** @class */ (function () {
    function ClrCheckboxWrapper(toggleService) {
        var _this = this;
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
        function (state$$1) {
            _this.toggle = state$$1;
        })));
    }
    /**
     * @return {?}
     */
    ClrCheckboxWrapper.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (this.label) {
            this.label.disableGrid();
        }
    };
    /**
     * @return {?}
     */
    ClrCheckboxWrapper.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        function (sub) { return sub.unsubscribe(); }));
    };
    ClrCheckboxWrapper.decorators = [
        { type: Component, args: [{
                    selector: 'clr-checkbox-wrapper,clr-toggle-wrapper',
                    template: "\n    <ng-content select=\"[clrCheckbox],[clrToggle]\"></ng-content>\n    <ng-content select=\"label\"></ng-content>\n    <label *ngIf=\"!label\"></label>\n  ",
                    host: {
                        '[class.clr-checkbox-wrapper]': '!toggle',
                        '[class.clr-toggle-wrapper]': 'toggle',
                    },
                    providers: [ControlIdService, IS_TOGGLE_PROVIDER]
                }] }
    ];
    /** @nocollapse */
    ClrCheckboxWrapper.ctorParameters = function () { return [
        { type: BehaviorSubject, decorators: [{ type: Inject, args: [IS_TOGGLE,] }] }
    ]; };
    ClrCheckboxWrapper.propDecorators = {
        label: [{ type: ContentChild, args: [ClrLabel,] }]
    };
    return ClrCheckboxWrapper;
}());

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
var /**
 * HostWrapper must be called in OnInit to ensure that the Views are ready. If its called in a constructor the view is
 * still undefined.
 * TODO - make sure these comment annotations do not break ng-packgr.
 * @template W
 */
HostWrapper = /** @class */ (function () {
    function HostWrapper(containerType, vcr, index) {
        if (index === void 0) { index = 0; }
        this.injector = vcr.injector;
        // If the host is already wrapped, we don't do anything
        if (!this.injector.get(containerType, null)) {
            /** @type {?} */
            var cfr = this.injector.get(ComponentFactoryResolver);
            /** @type {?} */
            var el = this.injector.get(ElementRef);
            // We need a new anchor, since we're projecting the current one.
            vcr.createComponent(cfr.resolveComponentFactory(EmptyAnchor));
            /** @type {?} */
            var factory = cfr.resolveComponentFactory(containerType);
            // Craft the element array based on what slot to use. Angular only uses the index to determine
            // which ng-content to project into, so if you have more than one ng-content you'll need to set
            // the index in the constructor appropriately
            /** @type {?} */
            var element = [];
            element[index] = [el.nativeElement];
            // We're assuming only one projection slot, but in more complex cases we might want to provide
            // a different array of projected elements.
            /** @type {?} */
            var containerRef = vcr.createComponent(factory, undefined, undefined, element);
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
    HostWrapper.prototype.get = /**
     * @template T
     * @param {?} token
     * @param {?=} notFoundValue
     * @return {?}
     */
    function (token, notFoundValue) {
        return this.injector.get(token, notFoundValue);
    };
    return HostWrapper;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ControlClassService = /** @class */ (function () {
    function ControlClassService() {
        this.className = '';
    }
    /**
     * @param {?=} invalid
     * @param {?=} grid
     * @param {?=} additional
     * @return {?}
     */
    ControlClassService.prototype.controlClass = /**
     * @param {?=} invalid
     * @param {?=} grid
     * @param {?=} additional
     * @return {?}
     */
    function (invalid, grid, additional) {
        if (invalid === void 0) { invalid = false; }
        if (grid === void 0) { grid = false; }
        if (additional === void 0) { additional = ''; }
        /** @type {?} */
        var controlClasses = [this.className, additional];
        if (invalid) {
            controlClasses.push('clr-error');
        }
        if (grid && this.className.indexOf('clr-col') === -1) {
            controlClasses.push('clr-col-md-10 clr-col-12');
        }
        return controlClasses.join(' ').trim();
    };
    // We want to remove the column classes from the input up to the container
    // We want to remove the column classes from the input up to the container
    /**
     * @param {?} renderer
     * @param {?} element
     * @return {?}
     */
    ControlClassService.prototype.initControlClass = 
    // We want to remove the column classes from the input up to the container
    /**
     * @param {?} renderer
     * @param {?} element
     * @return {?}
     */
    function (renderer, element) {
        if (element && element.className) {
            this.className = element.className;
            /** @type {?} */
            var klasses = element.className.split(' ');
            klasses.forEach((/**
             * @param {?} klass
             * @return {?}
             */
            function (klass) {
                if (klass.startsWith('clr-col')) {
                    renderer.removeClass(element, klass);
                }
            }));
        }
    };
    ControlClassService.decorators = [
        { type: Injectable }
    ];
    return ControlClassService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template W
 */
var WrappedFormControl = /** @class */ (function () {
    // I lost way too much time trying to make this work without injecting the ViewContainerRef and the Injector,
    // I'm giving up. So we have to inject these two manually for now.
    function WrappedFormControl(vcr, wrapperType, injector, ngControl, renderer, el) {
        var _this = this;
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
            function () {
                _this.ngControl.control.markAsTouched();
                _this.ngControl.control.updateValueAndValidity();
            })));
        }
    }
    Object.defineProperty(WrappedFormControl.prototype, "id", {
        get: /**
         * @return {?}
         */
        function () {
            return this._id;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._id = value;
            if (this.controlIdService) {
                this.controlIdService.id = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    WrappedFormControl.prototype.triggerValidation = /**
     * @return {?}
     */
    function () {
        if (this.ifErrorService) {
            this.ifErrorService.triggerStatusChange();
        }
    };
    // @TODO This method has a try/catch due to an unknown issue that came when building the clrToggle feature
    // We need to figure out why this fails for the ClrToggle scenario but works for Date picker...
    // To see the error, remove the try/catch here and run the ClrToggle suite to see issues getting the container
    // injector in time, and this ONLY HAPPENS in tests and not in dev/prod mode.
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
    WrappedFormControl.prototype.getProviderFromContainer = 
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
    function (token, notFoundValue) {
        try {
            return this._containerInjector.get(token, notFoundValue);
        }
        catch (e) {
            return notFoundValue;
        }
    };
    /**
     * @return {?}
     */
    WrappedFormControl.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * @return {?}
     */
    WrappedFormControl.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        function (sub) { return sub.unsubscribe(); }));
    };
    WrappedFormControl.propDecorators = {
        id: [{ type: HostBinding }, { type: Input }],
        triggerValidation: [{ type: HostListener, args: ['blur',] }]
    };
    return WrappedFormControl;
}());

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
var ClrCheckbox = /** @class */ (function (_super) {
    __extends(ClrCheckbox, _super);
    function ClrCheckbox(vcr, injector, control, renderer, el, toggle) {
        var _this = _super.call(this, vcr, ClrCheckboxWrapper, injector, control, renderer, el) || this;
        _this.toggle = toggle;
        return _this;
    }
    /**
     * @return {?}
     */
    ClrCheckbox.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        _super.prototype.ngOnInit.call(this);
        /** @type {?} */
        var toggleService = this.getProviderFromContainer(IS_TOGGLE, null);
        if (toggleService && this.toggle !== null) {
            toggleService.next(true);
        }
    };
    ClrCheckbox.decorators = [
        { type: Directive, args: [{ selector: '[clrCheckbox],[clrToggle]' },] }
    ];
    /** @nocollapse */
    ClrCheckbox.ctorParameters = function () { return [
        { type: ViewContainerRef },
        { type: Injector },
        { type: NgControl, decorators: [{ type: Self }, { type: Optional }] },
        { type: Renderer2 },
        { type: ElementRef },
        { type: String, decorators: [{ type: Attribute, args: ['clrToggle',] }] }
    ]; };
    return ClrCheckbox;
}(WrappedFormControl));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrCheckboxContainer = /** @class */ (function () {
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
    function ClrCheckboxContainer(ifErrorService, layoutService, controlClassService, ngControlService) {
        var _this = this;
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
        function (control) {
            _this.control = control;
        })));
    }
    Object.defineProperty(ClrCheckboxContainer.prototype, "clrInline", {
        get: /**
         * @return {?}
         */
        function () {
            return this.inline;
        },
        // private formGroup: AbstractControl;
        /*
         * Here we want to support the following cases
         * clrInline - true by presence
         * clrInline="true|false" - unless it is explicitly false, strings are considered true
         * [clrInline]="true|false" - expect a boolean
         */
        set: 
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
        function (value) {
            if (typeof value === 'string') {
                this.inline = value === 'false' ? false : true;
            }
            else {
                this.inline = !!value;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ClrCheckboxContainer.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // @TODO put a solution in for form group validation
        // if (!this.formGroup) {
        this.subscriptions.push(this.ifErrorService.statusChanges.subscribe((/**
         * @param {?} invalid
         * @return {?}
         */
        function (invalid) {
            _this.invalid = invalid;
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
    };
    /**
     * @return {?}
     */
    ClrCheckboxContainer.prototype.controlClass = /**
     * @return {?}
     */
    function () {
        return this.controlClassService.controlClass(this.invalid, this.addGrid(), this.inline ? 'clr-control-inline' : '');
    };
    /**
     * @return {?}
     */
    ClrCheckboxContainer.prototype.addGrid = /**
     * @return {?}
     */
    function () {
        if (this.layoutService && !this.layoutService.isVertical()) {
            return true;
        }
        return false;
    };
    /**
     * @return {?}
     */
    ClrCheckboxContainer.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subscriptions.map((/**
         * @param {?} sub
         * @return {?}
         */
        function (sub) { return sub.unsubscribe(); }));
    };
    ClrCheckboxContainer.decorators = [
        { type: Component, args: [{
                    selector: 'clr-checkbox-container,clr-toggle-container',
                    template: "\n    <ng-content select=\"label\"></ng-content>\n    <label *ngIf=\"!label && addGrid()\"></label>\n    <div class=\"clr-control-container\" [class.clr-control-inline]=\"clrInline\" [ngClass]=\"controlClass()\">\n      <ng-content select=\"clr-checkbox-wrapper,clr-toggle-wrapper\"></ng-content>\n      <div class=\"clr-subtext-wrapper\">\n        <ng-content select=\"clr-control-helper\" *ngIf=\"!invalid\"></ng-content>\n        <clr-icon *ngIf=\"invalid\" class=\"clr-validate-icon\" shape=\"exclamation-circle\" aria-hidden=\"true\"></clr-icon>\n        <ng-content select=\"clr-control-error\" *ngIf=\"invalid\"></ng-content>\n      </div>\n    </div>\n  ",
                    host: {
                        '[class.clr-form-control]': 'true',
                        '[class.clr-form-control-disabled]': 'control?.disabled',
                        '[class.clr-row]': 'addGrid()',
                    },
                    providers: [NgControlService, ControlClassService, IfErrorService]
                }] }
    ];
    /** @nocollapse */
    ClrCheckboxContainer.ctorParameters = function () { return [
        { type: IfErrorService },
        { type: LayoutService, decorators: [{ type: Optional }] },
        { type: ControlClassService },
        { type: NgControlService }
    ]; };
    ClrCheckboxContainer.propDecorators = {
        label: [{ type: ContentChild, args: [ClrLabel,] }],
        clrInline: [{ type: Input }]
    };
    return ClrCheckboxContainer;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrCheckboxModule = /** @class */ (function () {
    function ClrCheckboxModule() {
    }
    ClrCheckboxModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, ClrIconModule, ClrCommonFormsModule, ClrHostWrappingModule],
                    declarations: [ClrCheckbox, ClrCheckboxContainer, ClrCheckboxWrapper],
                    exports: [ClrCommonFormsModule, ClrCheckbox, ClrCheckboxContainer, ClrCheckboxWrapper],
                    entryComponents: [ClrCheckboxWrapper],
                },] }
    ];
    return ClrCheckboxModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var activeCounter = 0;
/** @type {?} */
var IF_ACTIVE_ID = new InjectionToken('IF_ACTIVE_ID');
/**
 * @return {?}
 */
function tokenFactory() {
    return ++activeCounter;
}
/** @type {?} */
var IF_ACTIVE_ID_PROVIDER = {
    provide: IF_ACTIVE_ID,
    useFactory: tokenFactory,
};
var IfActiveService = /** @class */ (function () {
    function IfActiveService() {
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
    Object.defineProperty(IfActiveService.prototype, "currentChange", {
        /*********
         *
         * @description
         * A getter function that provides an observable for the _current Subject.
         *
         */
        get: /**
         * ******
         *
         * \@description
         * A getter function that provides an observable for the _current Subject.
         *
         * @return {?}
         */
        function () {
            return this._currentChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IfActiveService.prototype, "current", {
        /*********
         *
         * @description
         * A getter that returns the current value of this IfActive instance.
         * @returns
         */
        get: /**
         * ******
         *
         * \@description
         * A getter that returns the current value of this IfActive instance.
         * @return {?}
         */
        function () {
            return this._current;
        },
        /*********
         *
         * @description
         * A setter function that updates the current state of _current for this instance of IfActive structural directive.
         * And, broadcasts the new value to all subscribers.
         *
         * @param value
         */
        set: /**
         * ******
         *
         * \@description
         * A setter function that updates the current state of _current for this instance of IfActive structural directive.
         * And, broadcasts the new value to all subscribers.
         *
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (this._current !== value) {
                this._current = value;
                this._currentChange.next(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    IfActiveService.decorators = [
        { type: Injectable }
    ];
    return IfActiveService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrIfActive = /** @class */ (function () {
    function ClrIfActive(ifActiveService, id, template, container) {
        var _this = this;
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
        function (newCurrentId) {
            _this.checkAndUpdateView(newCurrentId);
        }));
    }
    /**
     * @private
     * @param {?} currentId
     * @return {?}
     */
    ClrIfActive.prototype.checkAndUpdateView = /**
     * @private
     * @param {?} currentId
     * @return {?}
     */
    function (currentId) {
        /** @type {?} */
        var isNowActive = currentId === this.id;
        // only emit if the new active state is changed since last time.
        if (isNowActive !== this.wasActive) {
            this.updateView(isNowActive);
            this.activeChange.emit(isNowActive);
            this.wasActive = isNowActive;
        }
    };
    Object.defineProperty(ClrIfActive.prototype, "active", {
        /********
         *
         * @description
         * A getter that returns the current IfActiveService.active value.
         */
        get: /**
         * *****
         *
         * \@description
         * A getter that returns the current IfActiveService.active value.
         * @return {?}
         */
        function () {
            return this.ifActiveService.current === this.id;
        },
        /*********
         *
         * @description
         * A setter that updates IfActiveService.active with value.
         *
         * @param value
         */
        set: /**
         * ******
         *
         * \@description
         * A setter that updates IfActiveService.active with value.
         *
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value) {
                this.ifActiveService.current = this.id;
            }
        },
        enumerable: true,
        configurable: true
    });
    /*********
     *
     * @description
     * Function that takes a any value and either created an embedded view for the associated ViewContainerRef or,
     * Clears all views from the ViewContainerRef
     * @param value
     */
    /**
     * ******
     *
     * \@description
     * Function that takes a any value and either created an embedded view for the associated ViewContainerRef or,
     * Clears all views from the ViewContainerRef
     * @param {?} value
     * @return {?}
     */
    ClrIfActive.prototype.updateView = /**
     * ******
     *
     * \@description
     * Function that takes a any value and either created an embedded view for the associated ViewContainerRef or,
     * Clears all views from the ViewContainerRef
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value) {
            this.container.createEmbeddedView(this.template);
        }
        else {
            this.container.clear();
        }
    };
    /**
     * @return {?}
     */
    ClrIfActive.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subscription.unsubscribe();
    };
    ClrIfActive.decorators = [
        { type: Directive, args: [{ selector: '[clrIfActive]' },] }
    ];
    /** @nocollapse */
    ClrIfActive.ctorParameters = function () { return [
        { type: IfActiveService },
        { type: Number, decorators: [{ type: Inject, args: [IF_ACTIVE_ID,] }] },
        { type: TemplateRef },
        { type: ViewContainerRef }
    ]; };
    ClrIfActive.propDecorators = {
        active: [{ type: Input, args: ['clrIfActive',] }],
        activeChange: [{ type: Output, args: ['clrIfActiveChange',] }]
    };
    return ClrIfActive;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var IfOpenService = /** @class */ (function () {
    function IfOpenService() {
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
    Object.defineProperty(IfOpenService.prototype, "openChange", {
        /*********
         *
         * @description
         * A getter function that provides an observable for the _opened Subject.
         *
         */
        get: /**
         * ******
         *
         * \@description
         * A getter function that provides an observable for the _opened Subject.
         *
         * @return {?}
         */
        function () {
            return this._openChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IfOpenService.prototype, "open", {
        /*********
         *
         * @description
         * A getter that returns the current value of this IfOpen instance.
         *
         */
        get: /**
         * ******
         *
         * \@description
         * A getter that returns the current value of this IfOpen instance.
         *
         * @return {?}
         */
        function () {
            return this._open;
        },
        /*********
         *
         * @description
         * A setter function that updates the current state of _open for this instance of IfOpen structural directive. And,
         * broadcasts the new value to all subscribers.
         *
         * @param value
         */
        set: /**
         * ******
         *
         * \@description
         * A setter function that updates the current state of _open for this instance of IfOpen structural directive. And,
         * broadcasts the new value to all subscribers.
         *
         * @param {?} value
         * @return {?}
         */
        function (value) {
            value = !!value;
            if (this._open !== value) {
                this._open = value;
                this._openChange.next(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} event
     * @return {?}
     */
    IfOpenService.prototype.toggleWithEvent = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.originalEvent = event;
        this.open = !this.open;
        delete this.originalEvent;
    };
    Object.defineProperty(IfOpenService.prototype, "ignoredElementChange", {
        get: /**
         * @return {?}
         */
        function () {
            return this._ignoredElementChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} element
     * @return {?}
     */
    IfOpenService.prototype.registerIgnoredElement = /**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        this._ignoredElementChange.next(element);
    };
    IfOpenService.decorators = [
        { type: Injectable }
    ];
    return IfOpenService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrIfOpen = /** @class */ (function () {
    function ClrIfOpen(ifOpenService, template, container) {
        var _this = this;
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
        function (change) {
            _this.updateView(change);
            _this.openChange.emit(change);
        }));
    }
    Object.defineProperty(ClrIfOpen.prototype, "open", {
        /********
         *
         * @description
         * A getter that returns the current IfOpenService.open value.
         *
         */
        get: /**
         * *****
         *
         * \@description
         * A getter that returns the current IfOpenService.open value.
         *
         * @return {?}
         */
        function () {
            return this.ifOpenService.open;
        },
        /*********
         *
         * @description
         * A setter that updates IfOpenService.open with value.
         *
         * @param value
         */
        set: /**
         * ******
         *
         * \@description
         * A setter that updates IfOpenService.open with value.
         *
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.ifOpenService.open = value;
        },
        enumerable: true,
        configurable: true
    });
    /*********
     *
     * @description
     * Function that takes a boolean value and either created an embedded view for the associated ViewContainerRef or,
     * Clears all views from the ViewContainerRef
     * @param value
     */
    /**
     * ******
     *
     * \@description
     * Function that takes a boolean value and either created an embedded view for the associated ViewContainerRef or,
     * Clears all views from the ViewContainerRef
     * @param {?} value
     * @return {?}
     */
    ClrIfOpen.prototype.updateView = /**
     * ******
     *
     * \@description
     * Function that takes a boolean value and either created an embedded view for the associated ViewContainerRef or,
     * Clears all views from the ViewContainerRef
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value) {
            this.container.createEmbeddedView(this.template);
        }
        else {
            this.container.clear();
        }
    };
    /**
     * @return {?}
     */
    ClrIfOpen.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subscription.unsubscribe();
    };
    ClrIfOpen.decorators = [
        { type: Directive, args: [{ selector: '[clrIfOpen]' },] }
    ];
    /** @nocollapse */
    ClrIfOpen.ctorParameters = function () { return [
        { type: IfOpenService },
        { type: TemplateRef },
        { type: ViewContainerRef }
    ]; };
    ClrIfOpen.propDecorators = {
        open: [{ type: Input, args: ['clrIfOpen',] }],
        openChange: [{ type: Output, args: ['clrIfOpenChange',] }]
    };
    return ClrIfOpen;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var CONDITIONAL_DIRECTIVES = [ClrIfActive, ClrIfOpen];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrConditionalModule = /** @class */ (function () {
    function ClrConditionalModule() {
    }
    ClrConditionalModule.decorators = [
        { type: NgModule, args: [{ imports: [CommonModule], declarations: [CONDITIONAL_DIRECTIVES], exports: [CONDITIONAL_DIRECTIVES] },] }
    ];
    return ClrConditionalModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var FocusTrapTracker = /** @class */ (function () {
    function FocusTrapTracker() {
        this._previousFocusTraps = [];
    }
    Object.defineProperty(FocusTrapTracker.prototype, "current", {
        get: /**
         * @return {?}
         */
        function () {
            return this._current;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._previousFocusTraps.push(this._current);
            this._current = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FocusTrapTracker.prototype, "nbFocusTrappers", {
        get: /**
         * @return {?}
         */
        function () {
            return this._previousFocusTraps.length;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    FocusTrapTracker.prototype.activatePreviousTrapper = /**
     * @return {?}
     */
    function () {
        this._current = this._previousFocusTraps.pop();
    };
    FocusTrapTracker.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */ FocusTrapTracker.ngInjectableDef = defineInjectable({ factory: function FocusTrapTracker_Factory() { return new FocusTrapTracker(); }, token: FocusTrapTracker, providedIn: "root" });
    return FocusTrapTracker;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var FocusTrapDirective = /** @class */ (function () {
    function FocusTrapDirective(el, injector, focusTrapsTracker, renderer, platformId) {
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
    FocusTrapDirective.prototype.onFocusIn = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var nativeElement = this.el.nativeElement;
        if (this.focusTrapsTracker.current === this && event.target && !nativeElement.contains(event.target)) {
            nativeElement.focus();
        }
    };
    /**
     * @private
     * @return {?}
     */
    FocusTrapDirective.prototype.createFocusableOffScreenEl = /**
     * @private
     * @return {?}
     */
    function () {
        // Not using Renderer2's createElement method because that leads to DOM leakage.
        // https://github.com/angular/angular/issues/26954
        /** @type {?} */
        var offScreenSpan = this.document.createElement('span');
        this.renderer.setAttribute(offScreenSpan, 'tabindex', '0');
        this.renderer.addClass(offScreenSpan, 'offscreen-focus-rebounder');
        return offScreenSpan;
    };
    /**
     * @private
     * @return {?}
     */
    FocusTrapDirective.prototype.addReboundEls = /**
     * @private
     * @return {?}
     */
    function () {
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
    };
    /**
     * @private
     * @return {?}
     */
    FocusTrapDirective.prototype.removeReboundEls = /**
     * @private
     * @return {?}
     */
    function () {
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
    };
    /**
     * @return {?}
     */
    FocusTrapDirective.prototype.setPreviousFocus = /**
     * @return {?}
     */
    function () {
        if (this.previousActiveElement && this.previousActiveElement.focus) {
            this.previousActiveElement.focus();
        }
    };
    /**
     * @return {?}
     */
    FocusTrapDirective.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        if (isPlatformBrowser(this.platformId)) {
            this.previousActiveElement = (/** @type {?} */ (this.document.activeElement));
        }
        this.addReboundEls();
    };
    /**
     * @return {?}
     */
    FocusTrapDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.removeReboundEls();
        this.setPreviousFocus();
        this.focusTrapsTracker.activatePreviousTrapper();
    };
    FocusTrapDirective.decorators = [
        { type: Directive, args: [{ selector: '[clrFocusTrap]' },] }
    ];
    /** @nocollapse */
    FocusTrapDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Injector },
        { type: FocusTrapTracker },
        { type: Renderer2 },
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
    ]; };
    FocusTrapDirective.propDecorators = {
        onFocusIn: [{ type: HostListener, args: ['document:focusin', ['$event'],] }]
    };
    return FocusTrapDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var FOCUS_TRAP_DIRECTIVES = [FocusTrapDirective];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrFocusTrapModule = /** @class */ (function () {
    function ClrFocusTrapModule() {
    }
    ClrFocusTrapModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    declarations: [FOCUS_TRAP_DIRECTIVES],
                    exports: [FOCUS_TRAP_DIRECTIVES],
                },] }
    ];
    return ClrFocusTrapModule;
}());

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
var UP_ARROW = 38;
/** @type {?} */
var DOWN_ARROW = 40;
/** @type {?} */
var RIGHT_ARROW = 39;
/** @type {?} */
var LEFT_ARROW = 37;
/** @type {?} */
var ESC = 27;

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
var DEFAULT_LOCALE_FORMAT = 'dd/MM/y';
// https://en.wikipedia.org/wiki/Date_format_by_country
/** @type {?} */
var LITTLE_ENDIAN_REGEX = /d+.+m+.+y+/i;
/** @type {?} */
var MIDDLE_ENDIAN_REGEX = /m+.+d+.+y+/i;
// No need for BIG_ENDIAN_REGEX because anything that doesn't satisfy the above 2
// is automatically BIG_ENDIAN
/** @type {?} */
var DELIMITER_REGEX = /d+|m+|y+/i;
/** @type {?} */
var USER_INPUT_REGEX = /\d+/g;
/** @type {?} */
var MOBILE_USERAGENT_REGEX = /Mobi/i;
/** @type {?} */
var RTL_REGEX = /\u200f/g;
/** @type {?} */
var YEAR = 'YYYY';
/** @type {?} */
var MONTH = 'MM';
/** @type {?} */
var DATE = 'DD';
/** @type {?} */
var LITTLE_ENDIAN = {
    name: 'LITTLE_ENDIAN',
    format: [DATE, MONTH, YEAR],
};
/** @type {?} */
var MIDDLE_ENDIAN = {
    name: 'MIDDLE_ENDIAN',
    format: [MONTH, DATE, YEAR],
};
/** @type {?} */
var BIG_ENDIAN = {
    name: 'BIG_ENDIAN',
    format: [YEAR, MONTH, DATE],
};
/** @type {?} */
var NO_OF_DAYS_IN_A_WEEK = 7;
/** @type {?} */
var NO_OF_ROWS_IN_CALENDAR_VIEW = 6;
/** @type {?} */
var TOTAL_DAYS_IN_DAYS_VIEW = NO_OF_DAYS_IN_A_WEEK * NO_OF_ROWS_IN_CALENDAR_VIEW;

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
    var currYear = new Date().getFullYear();
    /** @type {?} */
    var century = Math.floor(currYear / 100) * 100;
    /** @type {?} */
    var result = year + century;
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
var DayViewModel = /** @class */ (function () {
    function DayViewModel(dayModel, isTodaysDate, isDisabled, isSelected, isFocusable) {
        if (isTodaysDate === void 0) { isTodaysDate = false; }
        if (isDisabled === void 0) { isDisabled = false; }
        if (isSelected === void 0) { isSelected = false; }
        if (isFocusable === void 0) { isFocusable = false; }
        this.dayModel = dayModel;
        this.isTodaysDate = isTodaysDate;
        this.isDisabled = isDisabled;
        this.isSelected = isSelected;
        this.isFocusable = isFocusable;
    }
    Object.defineProperty(DayViewModel.prototype, "tabIndex", {
        /**
         * Gets the tab index based on the isFocusable flag.
         */
        get: /**
         * Gets the tab index based on the isFocusable flag.
         * @return {?}
         */
        function () {
            return this.isFocusable ? 0 : -1;
        },
        enumerable: true,
        configurable: true
    });
    return DayViewModel;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var CalendarModel = /** @class */ (function () {
    function CalendarModel(year, month) {
        this.year = year;
        this.month = month;
        this.initializeDaysInCalendar();
    }
    /**
     * Populates the days array with the DayModels in the current Calendar.
     */
    /**
     * Populates the days array with the DayModels in the current Calendar.
     * @private
     * @return {?}
     */
    CalendarModel.prototype.initializeDaysInCalendar = /**
     * Populates the days array with the DayModels in the current Calendar.
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var noOfDaysInCalendar = getNumberOfDaysInTheMonth(this.year, this.month);
        this.days = Array(noOfDaysInCalendar)
            .fill(null)
            .map((/**
         * @param {?} date
         * @param {?} index
         * @return {?}
         */
        function (date, index) {
            return new DayModel(_this.year, _this.month, index + 1);
        }));
    };
    /**
     * Checks if the calendar passed is equal to the current calendar.
     */
    /**
     * Checks if the calendar passed is equal to the current calendar.
     * @param {?} calendar
     * @return {?}
     */
    CalendarModel.prototype.isEqual = /**
     * Checks if the calendar passed is equal to the current calendar.
     * @param {?} calendar
     * @return {?}
     */
    function (calendar) {
        if (calendar) {
            return this.year === calendar.year && this.month === calendar.month;
        }
        return false;
    };
    /**
     * Checks if a DayModel is in the Calendar
     */
    /**
     * Checks if a DayModel is in the Calendar
     * @param {?} day
     * @return {?}
     */
    CalendarModel.prototype.isDayInCalendar = /**
     * Checks if a DayModel is in the Calendar
     * @param {?} day
     * @return {?}
     */
    function (day) {
        if (day) {
            return this.year === day.year && this.month === day.month;
        }
        return false;
    };
    /**
     * Returns CalendarModel of the previous month.
     */
    /**
     * Returns CalendarModel of the previous month.
     * @return {?}
     */
    CalendarModel.prototype.previousMonth = /**
     * Returns CalendarModel of the previous month.
     * @return {?}
     */
    function () {
        if (this.month === 0) {
            return new CalendarModel(this.year - 1, 11);
        }
        else {
            return new CalendarModel(this.year, this.month - 1);
        }
    };
    /**
     * Returns CalendarModel of the next month.
     */
    /**
     * Returns CalendarModel of the next month.
     * @return {?}
     */
    CalendarModel.prototype.nextMonth = /**
     * Returns CalendarModel of the next month.
     * @return {?}
     */
    function () {
        if (this.month === 11) {
            return new CalendarModel(this.year + 1, 0);
        }
        else {
            return new CalendarModel(this.year, this.month + 1);
        }
    };
    return CalendarModel;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DayModel = /** @class */ (function () {
    function DayModel(year, month, date) {
        this.year = year;
        this.month = month;
        this.date = date;
    }
    Object.defineProperty(DayModel.prototype, "calendar", {
        /**
         * Returns the Calendar for the current DayModel.
         */
        get: /**
         * Returns the Calendar for the current DayModel.
         * @return {?}
         */
        function () {
            return new CalendarModel(this.year, this.month);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Checks if the passed CalendarDate is equal to itself.
     */
    /**
     * Checks if the passed CalendarDate is equal to itself.
     * @param {?} day
     * @return {?}
     */
    DayModel.prototype.isEqual = /**
     * Checks if the passed CalendarDate is equal to itself.
     * @param {?} day
     * @return {?}
     */
    function (day) {
        if (day) {
            return this.year === day.year && this.month === day.month && this.date === day.date;
        }
        return false;
    };
    /**
     * Converts the CalendarDate into the Javascript Date object.
     */
    /**
     * Converts the CalendarDate into the Javascript Date object.
     * @return {?}
     */
    DayModel.prototype.toDate = /**
     * Converts the CalendarDate into the Javascript Date object.
     * @return {?}
     */
    function () {
        return new Date(this.year, this.month, this.date);
    };
    /**
     * Returns a new DayModel which is incremented based on the value passed.
     */
    /**
     * Returns a new DayModel which is incremented based on the value passed.
     * @param {?} value
     * @return {?}
     */
    DayModel.prototype.incrementBy = /**
     * Returns a new DayModel which is incremented based on the value passed.
     * @param {?} value
     * @return {?}
     */
    function (value) {
        // Creating new Javascript Date object to increment because
        // it will automatically take care of switching to next or previous
        // months & years without we having to worry about it.
        /** @type {?} */
        var date = new Date(this.year, this.month, this.date + value);
        return new DayModel(date.getFullYear(), date.getMonth(), date.getDate());
    };
    /**
     * Clones the current day model.
     */
    /**
     * Clones the current day model.
     * @return {?}
     */
    DayModel.prototype.clone = /**
     * Clones the current day model.
     * @return {?}
     */
    function () {
        return new DayModel(this.year, this.month, this.date);
    };
    return DayModel;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var CalendarViewModel = /** @class */ (function () {
    function CalendarViewModel(calendar, selectedDay, focusableDay, today, firstDayOfWeek) {
        this.calendar = calendar;
        this.selectedDay = selectedDay;
        this.focusableDay = focusableDay;
        this.today = today;
        this.firstDayOfWeek = firstDayOfWeek;
        this.currMonthDayViews = [];
        this.initializeCalendarView();
    }
    Object.defineProperty(CalendarViewModel.prototype, "calendarView", {
        /**
         * DayViewModel matrix. Size 6x7
         */
        get: /**
         * DayViewModel matrix. Size 6x7
         * @return {?}
         */
        function () {
            return this._calendarView;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Generates a 6x7 matrix of DayViewModel based on the Calendar.
     * The 6x7 matrix is structured according to the first day of the week.
     * 6 rows to accommodate months which might have dates spanning over 6 weeks.
     * 7 columns because there are 7 days in a week :P :D
     */
    /**
     * Generates a 6x7 matrix of DayViewModel based on the Calendar.
     * The 6x7 matrix is structured according to the first day of the week.
     * 6 rows to accommodate months which might have dates spanning over 6 weeks.
     * 7 columns because there are 7 days in a week :P :D
     * @private
     * @return {?}
     */
    CalendarViewModel.prototype.initializeCalendarView = /**
     * Generates a 6x7 matrix of DayViewModel based on the Calendar.
     * The 6x7 matrix is structured according to the first day of the week.
     * 6 rows to accommodate months which might have dates spanning over 6 weeks.
     * 7 columns because there are 7 days in a week :P :D
     * @private
     * @return {?}
     */
    function () {
        // Generate prev and next month calendar models.
        /** @type {?} */
        var prevMonthCalendar = this.calendar.previousMonth();
        /** @type {?} */
        var nextMonthCalendar = this.calendar.nextMonth();
        // Get no of days from prev and next months.
        /** @type {?} */
        var daysFromPrevMonthInCalView = this.numDaysFromPrevMonthInCalView(this.calendar.year, this.calendar.month);
        /** @type {?} */
        var daysFromNextMonthInCalView = TOTAL_DAYS_IN_DAYS_VIEW - (this.calendar.days.length + daysFromPrevMonthInCalView);
        // Generate prev, curr and next day view models
        /** @type {?} */
        var prevMonthDayViews = [];
        /** @type {?} */
        var nextMonthDayViews = [];
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
    };
    /**
     * Generates a DayViewModel array based on the DayModel passed
     */
    /**
     * Generates a DayViewModel array based on the DayModel passed
     * @private
     * @param {?} days
     * @param {?} isDisabled
     * @param {?} isCurrentCalendar
     * @return {?}
     */
    CalendarViewModel.prototype.generateDayViewModels = /**
     * Generates a DayViewModel array based on the DayModel passed
     * @private
     * @param {?} days
     * @param {?} isDisabled
     * @param {?} isCurrentCalendar
     * @return {?}
     */
    function (days, isDisabled, isCurrentCalendar) {
        /** @type {?} */
        var dayViews = days.map((/**
         * @param {?} day
         * @return {?}
         */
        function (day) {
            return new DayViewModel(day, false, isDisabled, false, false);
        }));
        if (isCurrentCalendar && this.calendar.isDayInCalendar(this.today)) {
            dayViews[this.today.date - 1].isTodaysDate = true;
        }
        return dayViews;
    };
    /**
     * Gets the first day of the current month to figure out how many dates of previous month
     * are needed to complete the Calendar View based on the first day of the week.
     * eg: Assuming locale en-US, the first day of the week is Sunday,
     * if first day of the current month lands on Wednesday, then
     * (this.getDay function would return 3 since
     * first day of the week is 0), we need the 3 days from the previous month.
     */
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
    CalendarViewModel.prototype.numDaysFromPrevMonthInCalView = /**
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
    function (currentYear, currentMonth) {
        /** @type {?} */
        var firstDayOfCurrMonth = getDay(currentYear, currentMonth, 1);
        if (firstDayOfCurrMonth >= this.firstDayOfWeek) {
            return firstDayOfCurrMonth - this.firstDayOfWeek;
        }
        else {
            return NO_OF_DAYS_IN_A_WEEK + firstDayOfCurrMonth - this.firstDayOfWeek;
        }
    };
    /**
     * Checks if the Day passed is in the CalendarView.
     */
    /**
     * Checks if the Day passed is in the CalendarView.
     * @private
     * @param {?} day
     * @return {?}
     */
    CalendarViewModel.prototype.isDayInCalendarView = /**
     * Checks if the Day passed is in the CalendarView.
     * @private
     * @param {?} day
     * @return {?}
     */
    function (day) {
        if (!this.calendar.isDayInCalendar(day)) {
            return false;
        }
        return true;
    };
    /**
     * Using the DayViewModels from the previous, current and next month, this function
     * generates the CalendarView.
     */
    /**
     * Using the DayViewModels from the previous, current and next month, this function
     * generates the CalendarView.
     * @private
     * @param {?} prev
     * @param {?} curr
     * @param {?} next
     * @return {?}
     */
    CalendarViewModel.prototype.generateCalendarView = /**
     * Using the DayViewModels from the previous, current and next month, this function
     * generates the CalendarView.
     * @private
     * @param {?} prev
     * @param {?} curr
     * @param {?} next
     * @return {?}
     */
    function (prev, curr, next) {
        /** @type {?} */
        var combinationArr = __spread(prev, curr, next);
        /** @type {?} */
        var calendarView = [];
        for (var i = 0; i < NO_OF_ROWS_IN_CALENDAR_VIEW; i++) {
            calendarView[i] = combinationArr.slice(i * NO_OF_DAYS_IN_A_WEEK, (i + 1) * NO_OF_DAYS_IN_A_WEEK);
        }
        return calendarView;
    };
    /**
     * Initialize the selected day if the day is in the calendar.
     */
    /**
     * Initialize the selected day if the day is in the calendar.
     * @private
     * @return {?}
     */
    CalendarViewModel.prototype.initializeSelectedDay = /**
     * Initialize the selected day if the day is in the calendar.
     * @private
     * @return {?}
     */
    function () {
        if (this.selectedDay && this.isDayInCalendarView(this.selectedDay)) {
            this.currMonthDayViews[this.selectedDay.date - 1].isSelected = true;
        }
    };
    /**
     * Initializes the focusable day if the day is in the calendar. If focusable day is not set, then
     * we check for the selected day. If selected day is not set then check if today is in the current
     * calendar. If not then just set the 15th of the current calendar month.
     */
    /**
     * Initializes the focusable day if the day is in the calendar. If focusable day is not set, then
     * we check for the selected day. If selected day is not set then check if today is in the current
     * calendar. If not then just set the 15th of the current calendar month.
     * @private
     * @return {?}
     */
    CalendarViewModel.prototype.initializeFocusableDay = /**
     * Initializes the focusable day if the day is in the calendar. If focusable day is not set, then
     * we check for the selected day. If selected day is not set then check if today is in the current
     * calendar. If not then just set the 15th of the current calendar month.
     * @private
     * @return {?}
     */
    function () {
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
    };
    /**
     * @private
     * @param {?} day
     * @param {?} flag
     * @return {?}
     */
    CalendarViewModel.prototype.setFocusableFlag = /**
     * @private
     * @param {?} day
     * @param {?} flag
     * @return {?}
     */
    function (day, flag) {
        if (day) {
            this.currMonthDayViews[day.date - 1].isFocusable = flag;
        }
    };
    /**
     * Updates the focusable day in the calendar.
     */
    /**
     * Updates the focusable day in the calendar.
     * @param {?} day
     * @return {?}
     */
    CalendarViewModel.prototype.updateFocusableDay = /**
     * Updates the focusable day in the calendar.
     * @param {?} day
     * @return {?}
     */
    function (day) {
        this.setFocusableFlag(this.focusableDay, false);
        this.setFocusableFlag(day, true);
        this.focusableDay = day;
    };
    return CalendarViewModel;
}());

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
var DateNavigationService = /** @class */ (function () {
    function DateNavigationService() {
        /**
         * Variable to store today's date.
         */
        this._todaysFullDate = new Date();
        this._selectedDayChange = new Subject();
        this._displayedCalendarChange = new Subject();
        this._focusOnCalendarChange = new Subject();
        this._focusedDayChange = new Subject();
    }
    Object.defineProperty(DateNavigationService.prototype, "displayedCalendar", {
        get: /**
         * @return {?}
         */
        function () {
            return this._displayedCalendar;
        },
        enumerable: true,
        configurable: true
    });
    // not a setter because i want this to remain private
    // not a setter because i want this to remain private
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    DateNavigationService.prototype.setDisplayedCalendar = 
    // not a setter because i want this to remain private
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (!this._displayedCalendar.isEqual(value)) {
            this._displayedCalendar = value;
            this._displayedCalendarChange.next();
        }
    };
    /**
     * @private
     * @return {?}
     */
    DateNavigationService.prototype.initializeTodaysDate = /**
     * @private
     * @return {?}
     */
    function () {
        this._todaysFullDate = new Date();
        this._today = new DayModel(this._todaysFullDate.getFullYear(), this._todaysFullDate.getMonth(), this._todaysFullDate.getDate());
    };
    Object.defineProperty(DateNavigationService.prototype, "today", {
        get: /**
         * @return {?}
         */
        function () {
            return this._today;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateNavigationService.prototype, "selectedDayChange", {
        get: /**
         * @return {?}
         */
        function () {
            return this._selectedDayChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Notifies that the selected day has changed so that the date can be emitted to the user.
     * Note: Only to be called from day.ts
     */
    /**
     * Notifies that the selected day has changed so that the date can be emitted to the user.
     * Note: Only to be called from day.ts
     * @param {?} dayModel
     * @return {?}
     */
    DateNavigationService.prototype.notifySelectedDayChanged = /**
     * Notifies that the selected day has changed so that the date can be emitted to the user.
     * Note: Only to be called from day.ts
     * @param {?} dayModel
     * @return {?}
     */
    function (dayModel) {
        this.selectedDay = dayModel;
        this._selectedDayChange.next(dayModel);
    };
    /**
     * Initializes the calendar based on the selected day.
     */
    /**
     * Initializes the calendar based on the selected day.
     * @return {?}
     */
    DateNavigationService.prototype.initializeCalendar = /**
     * Initializes the calendar based on the selected day.
     * @return {?}
     */
    function () {
        this.focusedDay = null; // Can be removed later on the store focus
        this.initializeTodaysDate();
        if (this.selectedDay) {
            this._displayedCalendar = new CalendarModel(this.selectedDay.year, this.selectedDay.month);
        }
        else {
            this._displayedCalendar = new CalendarModel(this.today.year, this.today.month);
        }
    };
    /**
     * @param {?} month
     * @return {?}
     */
    DateNavigationService.prototype.changeMonth = /**
     * @param {?} month
     * @return {?}
     */
    function (month) {
        this.setDisplayedCalendar(new CalendarModel(this._displayedCalendar.year, month));
    };
    /**
     * @param {?} year
     * @return {?}
     */
    DateNavigationService.prototype.changeYear = /**
     * @param {?} year
     * @return {?}
     */
    function (year) {
        this.setDisplayedCalendar(new CalendarModel(year, this._displayedCalendar.month));
    };
    /**
     * Moves the displayed calendar to the next month.
     */
    /**
     * Moves the displayed calendar to the next month.
     * @return {?}
     */
    DateNavigationService.prototype.moveToNextMonth = /**
     * Moves the displayed calendar to the next month.
     * @return {?}
     */
    function () {
        this.setDisplayedCalendar(this._displayedCalendar.nextMonth());
    };
    /**
     * Moves the displayed calendar to the previous month.
     */
    /**
     * Moves the displayed calendar to the previous month.
     * @return {?}
     */
    DateNavigationService.prototype.moveToPreviousMonth = /**
     * Moves the displayed calendar to the previous month.
     * @return {?}
     */
    function () {
        this.setDisplayedCalendar(this._displayedCalendar.previousMonth());
    };
    /**
     * Moves the displayed calendar to the current month and year.
     */
    /**
     * Moves the displayed calendar to the current month and year.
     * @return {?}
     */
    DateNavigationService.prototype.moveToCurrentMonth = /**
     * Moves the displayed calendar to the current month and year.
     * @return {?}
     */
    function () {
        if (!this.displayedCalendar.isDayInCalendar(this.today)) {
            this.setDisplayedCalendar(new CalendarModel(this.today.year, this.today.month));
        }
        this._focusOnCalendarChange.next();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    DateNavigationService.prototype.incrementFocusDay = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.focusedDay = this.focusedDay.incrementBy(value);
        if (this._displayedCalendar.isDayInCalendar(this.focusedDay)) {
            this._focusedDayChange.next(this.focusedDay);
        }
        else {
            this.setDisplayedCalendar(this.focusedDay.calendar);
        }
        this._focusOnCalendarChange.next();
    };
    Object.defineProperty(DateNavigationService.prototype, "displayedCalendarChange", {
        /**
         * This observable lets the subscriber know that the displayed calendar has changed.
         */
        get: /**
         * This observable lets the subscriber know that the displayed calendar has changed.
         * @return {?}
         */
        function () {
            return this._displayedCalendarChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateNavigationService.prototype, "focusOnCalendarChange", {
        /**
         * This observable lets the subscriber know that the focus should be applied on the calendar.
         */
        get: /**
         * This observable lets the subscriber know that the focus should be applied on the calendar.
         * @return {?}
         */
        function () {
            return this._focusOnCalendarChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateNavigationService.prototype, "focusedDayChange", {
        /**
         * This observable lets the subscriber know that the focused day in the displayed calendar has changed.
         */
        get: /**
         * This observable lets the subscriber know that the focused day in the displayed calendar has changed.
         * @return {?}
         */
        function () {
            return this._focusedDayChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    DateNavigationService.decorators = [
        { type: Injectable }
    ];
    return DateNavigationService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * This service focuses the day that is focusable in the calendar.
 */
var DatepickerFocusService = /** @class */ (function () {
    function DatepickerFocusService(_ngZone, platformId) {
        this._ngZone = _ngZone;
        this.platformId = platformId;
    }
    /**
     * @param {?} elRef
     * @return {?}
     */
    DatepickerFocusService.prototype.focusCell = /**
     * @param {?} elRef
     * @return {?}
     */
    function (elRef) {
        var _this = this;
        this._ngZone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            _this.ngZoneIsStableInBrowser().subscribe((/**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var focusEl = elRef.nativeElement.querySelector('[tabindex="0"]');
                if (focusEl) {
                    focusEl.focus();
                }
            }));
        }));
    };
    /**
     * @param {?} element
     * @return {?}
     */
    DatepickerFocusService.prototype.focusInput = /**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        var _this = this;
        this._ngZone.runOutsideAngular((/**
         * @return {?}
         */
        function () { return _this.ngZoneIsStableInBrowser().subscribe((/**
         * @return {?}
         */
        function () { return element.focus(); })); }));
    };
    /**
     * @param {?} element
     * @return {?}
     */
    DatepickerFocusService.prototype.elementIsFocused = /**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        return isPlatformBrowser(this.platformId) && document.activeElement === element;
    };
    /**
     * @private
     * @return {?}
     */
    DatepickerFocusService.prototype.ngZoneIsStableInBrowser = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        // Credit: Material: https://github.com/angular/material2/blob/master/src/lib/datepicker/calendar.ts
        return this._ngZone.onStable.asObservable().pipe(first(), filter((/**
         * @return {?}
         */
        function () { return isPlatformBrowser(_this.platformId); })));
    };
    DatepickerFocusService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    DatepickerFocusService.ctorParameters = function () { return [
        { type: NgZone },
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
    ]; };
    return DatepickerFocusService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * This service extracts the Angular CLDR data needed by the datepicker.
 */
var LocaleHelperService = /** @class */ (function () {
    function LocaleHelperService(locale) {
        this.locale = locale;
        this._firstDayOfWeek = 0;
        this.initializeLocaleData();
    }
    Object.defineProperty(LocaleHelperService.prototype, "firstDayOfWeek", {
        get: /**
         * @return {?}
         */
        function () {
            return this._firstDayOfWeek;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocaleHelperService.prototype, "localeDaysNarrow", {
        get: /**
         * @return {?}
         */
        function () {
            return this._localeDaysNarrow;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocaleHelperService.prototype, "localeMonthsAbbreviated", {
        get: /**
         * @return {?}
         */
        function () {
            return this._localeMonthsAbbreviated;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocaleHelperService.prototype, "localeMonthsWide", {
        get: /**
         * @return {?}
         */
        function () {
            return this._localeMonthsWide;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocaleHelperService.prototype, "localeDateFormat", {
        get: /**
         * @return {?}
         */
        function () {
            return this._localeDateFormat;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Initializes the locale data.
     */
    /**
     * Initializes the locale data.
     * @private
     * @return {?}
     */
    LocaleHelperService.prototype.initializeLocaleData = /**
     * Initializes the locale data.
     * @private
     * @return {?}
     */
    function () {
        // Order in which these functions is called is very important.
        this.initializeFirstDayOfWeek();
        this.initializeLocaleDateFormat();
        this.initializeLocaleMonthsAbbreviated();
        this.initializeLocaleMonthsWide();
        this.initializeLocaleDaysNarrow();
    };
    /**
     * Initialize day names in the TranslationWidth.Narrow format based on the locale.
     * eg: [S, M, T...] for en-US.
     */
    /**
     * Initialize day names in the TranslationWidth.Narrow format based on the locale.
     * eg: [S, M, T...] for en-US.
     * @private
     * @return {?}
     */
    LocaleHelperService.prototype.initializeLocaleDaysNarrow = /**
     * Initialize day names in the TranslationWidth.Narrow format based on the locale.
     * eg: [S, M, T...] for en-US.
     * @private
     * @return {?}
     */
    function () {
        // Get locale day names starting with Sunday
        /** @type {?} */
        var tempArr = getLocaleDayNames(this.locale, FormStyle.Standalone, TranslationWidth.Narrow).slice();
        // Get first day of the week based on the locale
        /** @type {?} */
        var firstDayOfWeek = this.firstDayOfWeek;
        // Rearrange the tempArr to start with the first day of the week based on the locale.
        if (firstDayOfWeek > 0) {
            /** @type {?} */
            var prevDays = tempArr.splice(0, firstDayOfWeek);
            tempArr.push.apply(tempArr, __spread(prevDays));
        }
        this._localeDaysNarrow = tempArr;
    };
    /**
     * Initializes the array of month names in the TranslationWidth.Abbreviated format.
     * e.g. `[Jan, Feb, ...]` for en-US
     */
    /**
     * Initializes the array of month names in the TranslationWidth.Abbreviated format.
     * e.g. `[Jan, Feb, ...]` for en-US
     * @private
     * @return {?}
     */
    LocaleHelperService.prototype.initializeLocaleMonthsAbbreviated = /**
     * Initializes the array of month names in the TranslationWidth.Abbreviated format.
     * e.g. `[Jan, Feb, ...]` for en-US
     * @private
     * @return {?}
     */
    function () {
        this._localeMonthsAbbreviated = getLocaleMonthNames(this.locale, FormStyle.Standalone, TranslationWidth.Abbreviated).slice();
    };
    /**
     * Initializes the array of month names in the TranslationWidth.Wide format.
     * e.g. `[January, February, ...]` for en-US
     */
    /**
     * Initializes the array of month names in the TranslationWidth.Wide format.
     * e.g. `[January, February, ...]` for en-US
     * @private
     * @return {?}
     */
    LocaleHelperService.prototype.initializeLocaleMonthsWide = /**
     * Initializes the array of month names in the TranslationWidth.Wide format.
     * e.g. `[January, February, ...]` for en-US
     * @private
     * @return {?}
     */
    function () {
        this._localeMonthsWide = getLocaleMonthNames(this.locale, FormStyle.Standalone, TranslationWidth.Wide).slice();
    };
    /**
     * Initializes the first day of the week based on the locale.
     */
    /**
     * Initializes the first day of the week based on the locale.
     * @private
     * @return {?}
     */
    LocaleHelperService.prototype.initializeFirstDayOfWeek = /**
     * Initializes the first day of the week based on the locale.
     * @private
     * @return {?}
     */
    function () {
        this._firstDayOfWeek = getLocaleFirstDayOfWeek(this.locale);
    };
    /**
     * @private
     * @return {?}
     */
    LocaleHelperService.prototype.initializeLocaleDateFormat = /**
     * @private
     * @return {?}
     */
    function () {
        this._localeDateFormat = getLocaleDateFormat(this.locale, FormatWidth.Short);
    };
    LocaleHelperService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    LocaleHelperService.ctorParameters = function () { return [
        { type: String, decorators: [{ type: Inject, args: [LOCALE_ID,] }] }
    ]; };
    return LocaleHelperService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrCalendar = /** @class */ (function () {
    function ClrCalendar(_localeHelperService, _dateNavigationService, _datepickerFocusService, _elRef) {
        this._localeHelperService = _localeHelperService;
        this._dateNavigationService = _dateNavigationService;
        this._datepickerFocusService = _datepickerFocusService;
        this._elRef = _elRef;
        this._subs = [];
        this.generateCalendarView();
        this.initializeSubscriptions();
    }
    Object.defineProperty(ClrCalendar.prototype, "localeDaysNarrow", {
        /**
         * Gets the locale days according to the TranslationWidth.Narrow format.
         */
        get: /**
         * Gets the locale days according to the TranslationWidth.Narrow format.
         * @return {?}
         */
        function () {
            return this._localeHelperService.localeDaysNarrow;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrCalendar.prototype, "calendar", {
        get: /**
         * @return {?}
         */
        function () {
            return this._dateNavigationService.displayedCalendar;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrCalendar.prototype, "selectedDay", {
        get: /**
         * @return {?}
         */
        function () {
            return this._dateNavigationService.selectedDay;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrCalendar.prototype, "focusedDay", {
        get: /**
         * @return {?}
         */
        function () {
            return this._dateNavigationService.focusedDay;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrCalendar.prototype, "today", {
        get: /**
         * @return {?}
         */
        function () {
            return this._dateNavigationService.today;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Initialize subscriptions to:
     * 1. update the calendar view model.
     * 2. update the focusable day in the calendar view model.
     * 3. focus on the focusable day in the calendar.
     */
    /**
     * Initialize subscriptions to:
     * 1. update the calendar view model.
     * 2. update the focusable day in the calendar view model.
     * 3. focus on the focusable day in the calendar.
     * @private
     * @return {?}
     */
    ClrCalendar.prototype.initializeSubscriptions = /**
     * Initialize subscriptions to:
     * 1. update the calendar view model.
     * 2. update the focusable day in the calendar view model.
     * 3. focus on the focusable day in the calendar.
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this._subs.push(this._dateNavigationService.displayedCalendarChange.subscribe((/**
         * @return {?}
         */
        function () {
            _this.generateCalendarView();
        })));
        this._subs.push(this._dateNavigationService.focusedDayChange.subscribe((/**
         * @param {?} focusedDay
         * @return {?}
         */
        function (focusedDay) {
            _this.calendarViewModel.updateFocusableDay(focusedDay);
        })));
        this._subs.push(this._dateNavigationService.focusOnCalendarChange.subscribe((/**
         * @return {?}
         */
        function () {
            _this._datepickerFocusService.focusCell(_this._elRef);
        })));
    };
    /**
     * Generates the Calendar View based on the calendar retrieved from the DateNavigationService.
     */
    /**
     * Generates the Calendar View based on the calendar retrieved from the DateNavigationService.
     * @private
     * @return {?}
     */
    ClrCalendar.prototype.generateCalendarView = /**
     * Generates the Calendar View based on the calendar retrieved from the DateNavigationService.
     * @private
     * @return {?}
     */
    function () {
        this.calendarViewModel = new CalendarViewModel(this.calendar, this.selectedDay, this.focusedDay, this.today, this._localeHelperService.firstDayOfWeek);
    };
    /**
     * Delegates Keyboard arrow navigation to the DateNavigationService.
     */
    /**
     * Delegates Keyboard arrow navigation to the DateNavigationService.
     * @param {?} event
     * @return {?}
     */
    ClrCalendar.prototype.onKeyDown = /**
     * Delegates Keyboard arrow navigation to the DateNavigationService.
     * @param {?} event
     * @return {?}
     */
    function (event) {
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
    };
    /**
     * Focuses on the focusable day when the Calendar View is initialized.
     */
    /**
     * Focuses on the focusable day when the Calendar View is initialized.
     * @return {?}
     */
    ClrCalendar.prototype.ngAfterViewInit = /**
     * Focuses on the focusable day when the Calendar View is initialized.
     * @return {?}
     */
    function () {
        this._datepickerFocusService.focusCell(this._elRef);
    };
    /**
     * Unsubscribe from subscriptions.
     */
    /**
     * Unsubscribe from subscriptions.
     * @return {?}
     */
    ClrCalendar.prototype.ngOnDestroy = /**
     * Unsubscribe from subscriptions.
     * @return {?}
     */
    function () {
        this._subs.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        function (sub) { return sub.unsubscribe(); }));
    };
    ClrCalendar.decorators = [
        { type: Component, args: [{ selector: 'clr-calendar', template: "<table class=\"calendar-table weekdays\">\n    <tr class=\"calendar-row\">\n        <td *ngFor=\"let day of localeDaysNarrow\" class=\"calendar-cell weekday\">\n            {{day}}\n        </td>\n    </tr>\n</table>\n<table\n    class=\"calendar-table calendar-dates\">\n    <tr class=\"calendar-row\" *ngFor=\"let row of calendarViewModel.calendarView\">\n        <td *ngFor=\"let dayView of row\" class=\"calendar-cell\">\n            <clr-day [clrDayView]=\"dayView\"></clr-day>\n        </td>\n    </tr>\n</table>\n" }] }
    ];
    /** @nocollapse */
    ClrCalendar.ctorParameters = function () { return [
        { type: LocaleHelperService },
        { type: DateNavigationService },
        { type: DatepickerFocusService },
        { type: ElementRef }
    ]; };
    ClrCalendar.propDecorators = {
        onKeyDown: [{ type: HostListener, args: ['keydown', ['$event'],] }]
    };
    return ClrCalendar;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var FocusService = /** @class */ (function () {
    function FocusService() {
        this._focused = new BehaviorSubject(false);
    }
    Object.defineProperty(FocusService.prototype, "focusChange", {
        get: /**
         * @return {?}
         */
        function () {
            return this._focused.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FocusService.prototype, "focused", {
        set: /**
         * @param {?} state
         * @return {?}
         */
        function (state$$1) {
            this._focused.next(state$$1);
        },
        enumerable: true,
        configurable: true
    });
    FocusService.decorators = [
        { type: Injectable }
    ];
    return FocusService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DateFormControlService = /** @class */ (function () {
    function DateFormControlService() {
        this._touchedChange = new Subject();
        this._dirtyChange = new Subject();
    }
    Object.defineProperty(DateFormControlService.prototype, "touchedChange", {
        get: /**
         * @return {?}
         */
        function () {
            return this._touchedChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateFormControlService.prototype, "dirtyChange", {
        get: /**
         * @return {?}
         */
        function () {
            return this._dirtyChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DateFormControlService.prototype.markAsTouched = /**
     * @return {?}
     */
    function () {
        this._touchedChange.next();
    };
    /**
     * @return {?}
     */
    DateFormControlService.prototype.markAsDirty = /**
     * @return {?}
     */
    function () {
        this._dirtyChange.next();
    };
    DateFormControlService.decorators = [
        { type: Injectable }
    ];
    return DateFormControlService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DateIOService = /** @class */ (function () {
    function DateIOService(_localeHelperService) {
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
    DateIOService.prototype.initializeLocaleDisplayFormat = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var format = this.cldrLocaleDateFormat.toLocaleLowerCase();
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
    };
    /**
     * @private
     * @return {?}
     */
    DateIOService.prototype.extractDelimiters = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.cldrLocaleDateFormat) {
            // Sanitize Date Format. Remove RTL characters.
            // FIXME: When we support RTL, remove this and handle it correctly.
            /** @type {?} */
            var localeFormat = this.cldrLocaleDateFormat.replace(RTL_REGEX, '');
            /** @type {?} */
            var delimiters = localeFormat.split(DELIMITER_REGEX);
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
    };
    /**
     * @param {?} date
     * @return {?}
     */
    DateIOService.prototype.toLocaleDisplayFormatString = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        if (date) {
            if (isNaN(date.getTime())) {
                return '';
            }
            /** @type {?} */
            var dateNo = date.getDate();
            /** @type {?} */
            var monthNo = date.getMonth() + 1;
            /** @type {?} */
            var dateStr = dateNo > 9 ? dateNo.toString() : '0' + dateNo;
            /** @type {?} */
            var monthStr = monthNo > 9 ? monthNo.toString() : '0' + monthNo;
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
    };
    Object.defineProperty(DateIOService.prototype, "placeholderText", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var format = this.localeDisplayFormat.format;
            return format[0] + this.delimiters[0] + format[1] + this.delimiters[1] + format[2];
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Checks if the month entered by the user is valid or not.
     * Note: Month is 0 based.
     */
    /**
     * Checks if the month entered by the user is valid or not.
     * Note: Month is 0 based.
     * @private
     * @param {?} month
     * @return {?}
     */
    DateIOService.prototype.isValidMonth = /**
     * Checks if the month entered by the user is valid or not.
     * Note: Month is 0 based.
     * @private
     * @param {?} month
     * @return {?}
     */
    function (month) {
        return month > -1 && month < 12;
    };
    /**
     * Checks if the date is valid depending on the year and month provided.
     */
    /**
     * Checks if the date is valid depending on the year and month provided.
     * @private
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @return {?}
     */
    DateIOService.prototype.isValidDate = /**
     * Checks if the date is valid depending on the year and month provided.
     * @private
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @return {?}
     */
    function (year, month, date) {
        return date > 0 && date <= getNumberOfDaysInTheMonth(year, month);
    };
    /**
     * Validates the parameters provided and returns the date.
     * If the parameters are not
     * valid then return null.
     * NOTE: (Month here is 1 based since the user has provided that as an input)
     */
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
    DateIOService.prototype.validateAndGetDate = /**
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
    function (year, month, date) {
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
        var y = +year;
        /** @type {?} */
        var m = +month - 1;
        // month is 0 based
        /** @type {?} */
        var d = +date;
        if (!this.isValidMonth(m) || !this.isValidDate(y, m, d)) {
            return null;
        }
        /** @type {?} */
        var result = parseToFourDigitYear(y);
        return result !== -1 ? new Date(result, m, d) : null;
    };
    /**
     * @param {?} date
     * @return {?}
     */
    DateIOService.prototype.getDateValueFromDateString = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        if (!date) {
            return null;
        }
        /** @type {?} */
        var dateParts = date.match(USER_INPUT_REGEX);
        if (!dateParts || dateParts.length !== 3) {
            return null;
        }
        var _a = __read(dateParts, 3), firstPart = _a[0], secondPart = _a[1], thirdPart = _a[2];
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
    };
    DateIOService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    DateIOService.ctorParameters = function () { return [
        { type: LocaleHelperService }
    ]; };
    return DateIOService;
}());

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
var DATEPICKER_ENABLE_BREAKPOINT = 768;

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DatepickerEnabledService = /** @class */ (function () {
    function DatepickerEnabledService(_document) {
        this._document = _document;
        this._isUserAgentMobile = false;
        if (this._document) {
            this._isUserAgentMobile = MOBILE_USERAGENT_REGEX.test(_document.defaultView.navigator.userAgent);
            this._innerWidth = _document.defaultView.innerWidth;
        }
    }
    Object.defineProperty(DatepickerEnabledService.prototype, "isEnabled", {
        /**
         * Returns if the calendar should be active or not.
         * If the user agent is mobile and the screen width is less than DATEPICKER_ACTIVE_BREAKPOINT
         * then the calendar is inactive.
         */
        get: /**
         * Returns if the calendar should be active or not.
         * If the user agent is mobile and the screen width is less than DATEPICKER_ACTIVE_BREAKPOINT
         * then the calendar is inactive.
         * @return {?}
         */
        function () {
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
        },
        enumerable: true,
        configurable: true
    });
    DatepickerEnabledService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    DatepickerEnabledService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
    ]; };
    return DatepickerEnabledService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrDateContainer = /** @class */ (function () {
    function ClrDateContainer(_ifOpenService, _dateNavigationService, _datepickerEnabledService, dateFormControlService, commonStrings, ifErrorService, focusService, controlClassService, layoutService, ngControlService) {
        var _this = this;
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
        function (open) {
            if (open) {
                _this.initializeCalendar();
            }
        })));
        this.subscriptions.push(this.focusService.focusChange.subscribe((/**
         * @param {?} state
         * @return {?}
         */
        function (state$$1) {
            _this.focus = state$$1;
        })));
        this.subscriptions.push(this.ngControlService.controlChanges.subscribe((/**
         * @param {?} control
         * @return {?}
         */
        function (control) {
            _this.control = control;
        })));
    }
    /**
     * @return {?}
     */
    ClrDateContainer.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.subscriptions.push(this.ifErrorService.statusChanges.subscribe((/**
         * @param {?} invalid
         * @return {?}
         */
        function (invalid) {
            _this.invalid = invalid;
        })));
    };
    /**
     * Returns the classes to apply to the control
     */
    /**
     * Returns the classes to apply to the control
     * @return {?}
     */
    ClrDateContainer.prototype.controlClass = /**
     * Returns the classes to apply to the control
     * @return {?}
     */
    function () {
        return this.controlClassService.controlClass(this.invalid, this.addGrid());
    };
    /**
     * Determines if the control needs to add grid classes
     */
    /**
     * Determines if the control needs to add grid classes
     * @return {?}
     */
    ClrDateContainer.prototype.addGrid = /**
     * Determines if the control needs to add grid classes
     * @return {?}
     */
    function () {
        if (this.layoutService && !this.layoutService.isVertical()) {
            return true;
        }
        return false;
    };
    Object.defineProperty(ClrDateContainer.prototype, "isEnabled", {
        /**
         * Returns if the Datepicker is enabled or not. If disabled, hides the datepicker trigger.
         */
        get: /**
         * Returns if the Datepicker is enabled or not. If disabled, hides the datepicker trigger.
         * @return {?}
         */
        function () {
            return this._datepickerEnabledService.isEnabled;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Processes the user input and Initializes the Calendar everytime the datepicker popover is open.
     */
    /**
     * Processes the user input and Initializes the Calendar everytime the datepicker popover is open.
     * @private
     * @return {?}
     */
    ClrDateContainer.prototype.initializeCalendar = /**
     * Processes the user input and Initializes the Calendar everytime the datepicker popover is open.
     * @private
     * @return {?}
     */
    function () {
        this._dateNavigationService.initializeCalendar();
    };
    /**
     * Toggles the Datepicker Popover.
     */
    /**
     * Toggles the Datepicker Popover.
     * @param {?} event
     * @return {?}
     */
    ClrDateContainer.prototype.toggleDatepicker = /**
     * Toggles the Datepicker Popover.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this._ifOpenService.toggleWithEvent(event);
        this.dateFormControlService.markAsTouched();
    };
    /**
     * Unsubscribe from subscriptions.
     */
    /**
     * Unsubscribe from subscriptions.
     * @return {?}
     */
    ClrDateContainer.prototype.ngOnDestroy = /**
     * Unsubscribe from subscriptions.
     * @return {?}
     */
    function () {
        this.subscriptions.map((/**
         * @param {?} sub
         * @return {?}
         */
        function (sub) { return sub.unsubscribe(); }));
    };
    ClrDateContainer.decorators = [
        { type: Component, args: [{
                    selector: 'clr-date-container',
                    template: "\n      <ng-content select=\"label\"></ng-content>\n      <label *ngIf=\"!label && addGrid()\"></label>\n      <div class=\"clr-control-container\" [ngClass]=\"controlClass()\">\n        <div class=\"clr-input-wrapper\">\n          <div class=\"clr-input-group\" [class.clr-focus]=\"focus\">\n            <ng-content select=\"[clrDate]\"></ng-content>\n            <button type=\"button\" class=\"clr-input-group-icon-action\" (click)=\"toggleDatepicker($event)\" *ngIf=\"isEnabled\" [attr.title]=\"commonStrings.open\" [disabled]=\"control?.disabled\">\n              <clr-icon shape=\"calendar\"></clr-icon>\n            </button>\n            <clr-datepicker-view-manager *clrIfOpen clrFocusTrap></clr-datepicker-view-manager>\n          </div>\n          <clr-icon class=\"clr-validate-icon\" shape=\"exclamation-circle\"></clr-icon>\n        </div>\n        <ng-content select=\"clr-control-helper\" *ngIf=\"!invalid\"></ng-content>\n        <ng-content select=\"clr-control-error\" *ngIf=\"invalid\"></ng-content>\n      </div>\n    ",
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
    ClrDateContainer.ctorParameters = function () { return [
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
    ]; };
    ClrDateContainer.propDecorators = {
        label: [{ type: ContentChild, args: [ClrLabel,] }]
    };
    return ClrDateContainer;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// There are four ways the datepicker value is set
// 1. Value set by user typing into text input as a string ex: '01/28/2015'
// 2. Value set explicitly by Angular Forms APIs as a string ex: '01/28/2015'
// 3. Value set by user via datepicker UI as a Date Object
// 4. Value set via `clrDate` input as a Date Object
var ClrDateInput = /** @class */ (function (_super) {
    __extends(ClrDateInput, _super);
    function ClrDateInput(viewContainerRef, injector, el, renderer, control, container, dateIOService, dateNavigationService, datepickerEnabledService, dateFormControlService, platformId, focusService, datepickerFocusService) {
        var _this = _super.call(this, viewContainerRef, ClrDateContainer, injector, control, renderer, el) || this;
        _this.el = el;
        _this.renderer = renderer;
        _this.control = control;
        _this.container = container;
        _this.dateIOService = dateIOService;
        _this.dateNavigationService = dateNavigationService;
        _this.datepickerEnabledService = datepickerEnabledService;
        _this.dateFormControlService = dateFormControlService;
        _this.platformId = platformId;
        _this.focusService = focusService;
        _this.datepickerFocusService = datepickerFocusService;
        _this.dateChange = new EventEmitter(false);
        _this.index = 1;
        return _this;
    }
    Object.defineProperty(ClrDateInput.prototype, "date", {
        set: /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            if (this.previousDateChange !== date) {
                this.updateDate(this.getValidDateValueFromDate(date));
            }
            if (!this.initialClrDateInputValue) {
                this.initialClrDateInputValue = date;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ClrDateInput.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        _super.prototype.ngOnInit.call(this);
        this.populateServicesFromContainerComponent();
        this.subscriptions.push(this.listenForUserSelectedDayChanges(), this.listenForControlValueChanges(), this.listenForTouchChanges(), this.listenForDirtyChanges(), this.listenForInputRefocus());
    };
    /**
     * @return {?}
     */
    ClrDateInput.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        // I don't know why I have to do this but after using the new HostWrapping Module I have to delay the processing
        // of the initial Input set by the user to here. If I do not 2 issues occur:
        // 1. The Input setter is called before ngOnInit. ngOnInit initializes the services without which the setter fails.
        // 2. The Renderer doesn't work before ngAfterViewInit (It used to before the new HostWrapping Module for some reason).
        // I need the renderer to set the value property on the input to make sure that if the user has supplied a Date
        // input object, we reflect it with the right date on the input field using the IO service. I am not sure if
        // these are major issues or not but just noting them down here.
        this.processInitialInputs();
    };
    /**
     * @return {?}
     */
    ClrDateInput.prototype.setFocusStates = /**
     * @return {?}
     */
    function () {
        this.setFocus(true);
    };
    /**
     * @return {?}
     */
    ClrDateInput.prototype.triggerValidation = /**
     * @return {?}
     */
    function () {
        _super.prototype.triggerValidation.call(this);
        this.setFocus(false);
    };
    Object.defineProperty(ClrDateInput.prototype, "placeholderText", {
        get: /**
         * @return {?}
         */
        function () {
            return this.placeholder ? this.placeholder : this.dateIOService.placeholderText;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDateInput.prototype, "inputType", {
        get: /**
         * @return {?}
         */
        function () {
            return isPlatformBrowser(this.platformId) && this.usingNativeDatepicker() ? 'date' : 'text';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} target
     * @return {?}
     */
    ClrDateInput.prototype.onValueChange = /**
     * @param {?} target
     * @return {?}
     */
    function (target) {
        /** @type {?} */
        var validDateValue = this.dateIOService.getDateValueFromDateString(target.value);
        if (this.usingClarityDatepicker() && validDateValue) {
            this.updateDate(validDateValue, true);
        }
        else if (this.usingNativeDatepicker()) {
            var _a = __read(target.value.split('-'), 3), year = _a[0], month = _a[1], day = _a[2];
            this.updateDate(new Date(+year, +month - 1, +day), true);
        }
        else {
            this.emitDateOutput(null);
        }
    };
    /**
     * @private
     * @return {?}
     */
    ClrDateInput.prototype.usingClarityDatepicker = /**
     * @private
     * @return {?}
     */
    function () {
        return this.datepickerEnabledService.isEnabled;
    };
    /**
     * @private
     * @return {?}
     */
    ClrDateInput.prototype.usingNativeDatepicker = /**
     * @private
     * @return {?}
     */
    function () {
        return !this.datepickerEnabledService.isEnabled;
    };
    /**
     * @private
     * @param {?} focus
     * @return {?}
     */
    ClrDateInput.prototype.setFocus = /**
     * @private
     * @param {?} focus
     * @return {?}
     */
    function (focus) {
        if (this.focusService) {
            this.focusService.focused = focus;
        }
    };
    /**
     * @private
     * @return {?}
     */
    ClrDateInput.prototype.populateServicesFromContainerComponent = /**
     * @private
     * @return {?}
     */
    function () {
        if (!this.container) {
            this.dateIOService = this.getProviderFromContainer(DateIOService);
            this.dateNavigationService = this.getProviderFromContainer(DateNavigationService);
            this.datepickerEnabledService = this.getProviderFromContainer(DatepickerEnabledService);
            this.dateFormControlService = this.getProviderFromContainer(DateFormControlService);
        }
    };
    /**
     * @private
     * @return {?}
     */
    ClrDateInput.prototype.processInitialInputs = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.datepickerHasFormControl()) {
            this.updateDate(this.dateIOService.getDateValueFromDateString(this.control.value));
        }
        else {
            this.updateDate(this.initialClrDateInputValue);
        }
    };
    /**
     * @private
     * @param {?} value
     * @param {?=} setByUserInteraction
     * @return {?}
     */
    ClrDateInput.prototype.updateDate = /**
     * @private
     * @param {?} value
     * @param {?=} setByUserInteraction
     * @return {?}
     */
    function (value, setByUserInteraction) {
        if (setByUserInteraction === void 0) { setByUserInteraction = false; }
        /** @type {?} */
        var date = this.getValidDateValueFromDate(value);
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
    };
    /**
     * @private
     * @param {?} date
     * @return {?}
     */
    ClrDateInput.prototype.updateInput = /**
     * @private
     * @param {?} date
     * @return {?}
     */
    function (date) {
        if (date) {
            /** @type {?} */
            var dateString = this.dateIOService.toLocaleDisplayFormatString(date);
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
    };
    /**
     * @private
     * @param {?} date
     * @return {?}
     */
    ClrDateInput.prototype.getValidDateValueFromDate = /**
     * @private
     * @param {?} date
     * @return {?}
     */
    function (date) {
        if (this.dateIOService) {
            /** @type {?} */
            var dateString = this.dateIOService.toLocaleDisplayFormatString(date);
            return this.dateIOService.getDateValueFromDateString(dateString);
        }
        else {
            return null;
        }
    };
    /**
     * @private
     * @param {?} date
     * @return {?}
     */
    ClrDateInput.prototype.emitDateOutput = /**
     * @private
     * @param {?} date
     * @return {?}
     */
    function (date) {
        if (!datesAreEqual(date, this.previousDateChange)) {
            this.dateChange.emit(date);
            this.previousDateChange = date;
        }
        else if (!date && this.previousDateChange) {
            this.dateChange.emit(null);
            this.previousDateChange = null;
        }
    };
    /**
     * @private
     * @return {?}
     */
    ClrDateInput.prototype.datepickerHasFormControl = /**
     * @private
     * @return {?}
     */
    function () {
        return !!this.control;
    };
    /**
     * @private
     * @return {?}
     */
    ClrDateInput.prototype.listenForControlValueChanges = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        return of(this.datepickerHasFormControl())
            .pipe(filter((/**
         * @param {?} hasControl
         * @return {?}
         */
        function (hasControl) { return hasControl; })), switchMap((/**
         * @return {?}
         */
        function () { return _this.control.valueChanges; })), 
        // only update date value if not being set by user
        filter((/**
         * @return {?}
         */
        function () { return !_this.datepickerFocusService.elementIsFocused(_this.el.nativeElement); })))
            .subscribe((/**
         * @param {?} value
         * @return {?}
         */
        function (value) { return _this.updateDate(_this.dateIOService.getDateValueFromDateString(value)); }));
    };
    /**
     * @private
     * @return {?}
     */
    ClrDateInput.prototype.listenForUserSelectedDayChanges = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        return this.dateNavigationService.selectedDayChange.subscribe((/**
         * @param {?} dayModel
         * @return {?}
         */
        function (dayModel) { return _this.updateDate(dayModel.toDate(), true); }));
    };
    /**
     * @private
     * @return {?}
     */
    ClrDateInput.prototype.listenForTouchChanges = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        return this.dateFormControlService.touchedChange
            .pipe(filter((/**
         * @return {?}
         */
        function () { return _this.datepickerHasFormControl(); })))
            .subscribe((/**
         * @return {?}
         */
        function () { return _this.control.control.markAsTouched(); }));
    };
    /**
     * @private
     * @return {?}
     */
    ClrDateInput.prototype.listenForDirtyChanges = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        return this.dateFormControlService.dirtyChange
            .pipe(filter((/**
         * @return {?}
         */
        function () { return _this.datepickerHasFormControl(); })))
            .subscribe((/**
         * @return {?}
         */
        function () { return _this.control.control.markAsDirty(); }));
    };
    /**
     * @private
     * @return {?}
     */
    ClrDateInput.prototype.listenForInputRefocus = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        return this.dateNavigationService.selectedDayChange
            .pipe(filter((/**
         * @param {?} date
         * @return {?}
         */
        function (date) { return !!date; })))
            .subscribe((/**
         * @param {?} v
         * @return {?}
         */
        function (v) { return _this.datepickerFocusService.focusInput(_this.el.nativeElement); }));
    };
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
    ClrDateInput.ctorParameters = function () { return [
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
    ]; };
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
    return ClrDateInput;
}(WrappedFormControl));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// Literally any annotation would work here, but writing our own @HoneyBadger annotation feels overkill.
/**
 * @abstract
 */
var AbstractPopover = /** @class */ (function () {
    function AbstractPopover(injector, parentHost) {
        var _this = this;
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
        function (change) {
            if (change) {
                _this.anchor();
                _this.attachESCListener();
            }
            else {
                _this.release();
                _this.detachESCListener();
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
    AbstractPopover.prototype.anchor = /**
     * @protected
     * @return {?}
     */
    function () {
        this.updateAnchor = true;
        // Ugh
        this.ignore = this.ifOpenService.originalEvent;
    };
    /**
     * @protected
     * @return {?}
     */
    AbstractPopover.prototype.release = /**
     * @protected
     * @return {?}
     */
    function () {
        this.detachOutsideClickListener();
        this.popoverInstance.release();
    };
    /**
     * @return {?}
     */
    AbstractPopover.prototype.ngAfterViewChecked = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.updateAnchor) {
            this.updateAnchor = false;
            this.popoverInstance
                .anchor(this.anchorElem, this.anchorPoint, this.popoverPoint, this.popoverOptions)
                .subscribe((/**
             * @return {?}
             */
            function () {
                // if a scroll event is detected, close the popover
                _this.ifOpenService.open = false;
            }));
            this.attachOutsideClickListener();
        }
    };
    /**
     * @return {?}
     */
    AbstractPopover.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.release();
        this.detachESCListener();
        this.subscription.unsubscribe();
    };
    Object.defineProperty(AbstractPopover.prototype, "isOffScreen", {
        /*
           * Fallback to hide when *clrIfOpen is not being used
           */
        get: /*
             * Fallback to hide when *clrIfOpen is not being used
             */
        /**
         * @return {?}
         */
        function () {
            return this.ifOpenService.open ? false : true;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @return {?}
     */
    AbstractPopover.prototype.attachESCListener = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.documentESCListener = this.renderer.listen('document', 'keydown', (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            if (event && event.keyCode === ESC) {
                _this.ifOpenService.open = false;
            }
        }));
    };
    /**
     * @private
     * @return {?}
     */
    AbstractPopover.prototype.detachESCListener = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.documentESCListener) {
            this.documentESCListener();
            delete this.documentESCListener;
        }
    };
    /**
     * @private
     * @return {?}
     */
    AbstractPopover.prototype.attachOutsideClickListener = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.closeOnOutsideClick) {
            this.hostClickListener = this.renderer.listen(this.el.nativeElement, 'click', (/**
             * @param {?} event
             * @return {?}
             */
            function (event) { return (_this.ignore = event); }));
            if (this.ignoredElement) {
                this.ignoredElementClickListener = this.renderer.listen(this.ignoredElement, 'click', (/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) { return (_this.ignore = event); }));
            }
            this.documentClickListener = this.renderer.listen('document', 'click', (/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                if (event === _this.ignore) {
                    delete _this.ignore;
                }
                else {
                    _this.ifOpenService.open = false;
                }
            }));
        }
    };
    /**
     * @private
     * @return {?}
     */
    AbstractPopover.prototype.detachOutsideClickListener = /**
     * @private
     * @return {?}
     */
    function () {
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
    };
    AbstractPopover.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    AbstractPopover.ctorParameters = function () { return [
        { type: Injector },
        { type: ElementRef, decorators: [{ type: SkipSelf }] }
    ]; };
    AbstractPopover.propDecorators = {
        isOffScreen: [{ type: HostBinding, args: ['class.is-off-screen',] }]
    };
    return AbstractPopover;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * This service manages which view is visible in the datepicker popover.
 */
var ViewManagerService = /** @class */ (function () {
    function ViewManagerService() {
        this._currentView = "DAYVIEW" /* DAYVIEW */;
    }
    Object.defineProperty(ViewManagerService.prototype, "isDayView", {
        get: /**
         * @return {?}
         */
        function () {
            return this._currentView === "DAYVIEW" /* DAYVIEW */;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewManagerService.prototype, "isYearView", {
        get: /**
         * @return {?}
         */
        function () {
            return this._currentView === "YEARVIEW" /* YEARVIEW */;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewManagerService.prototype, "isMonthView", {
        get: /**
         * @return {?}
         */
        function () {
            return this._currentView === "MONTHVIEW" /* MONTHVIEW */;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ViewManagerService.prototype.changeToMonthView = /**
     * @return {?}
     */
    function () {
        this._currentView = "MONTHVIEW" /* MONTHVIEW */;
    };
    /**
     * @return {?}
     */
    ViewManagerService.prototype.changeToYearView = /**
     * @return {?}
     */
    function () {
        this._currentView = "YEARVIEW" /* YEARVIEW */;
    };
    /**
     * @return {?}
     */
    ViewManagerService.prototype.changeToDayView = /**
     * @return {?}
     */
    function () {
        this._currentView = "DAYVIEW" /* DAYVIEW */;
    };
    ViewManagerService.decorators = [
        { type: Injectable }
    ];
    return ViewManagerService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrDatepickerViewManager = /** @class */ (function (_super) {
    __extends(ClrDatepickerViewManager, _super);
    function ClrDatepickerViewManager(parent, _injector, _viewManagerService) {
        var _this = _super.call(this, _injector, parent) || this;
        _this._viewManagerService = _viewManagerService;
        _this.configurePopover();
        return _this;
    }
    /**
     * Configure Popover Direction and Close indicators
     */
    /**
     * Configure Popover Direction and Close indicators
     * @private
     * @return {?}
     */
    ClrDatepickerViewManager.prototype.configurePopover = /**
     * Configure Popover Direction and Close indicators
     * @private
     * @return {?}
     */
    function () {
        this.anchorPoint = Point.BOTTOM_LEFT;
        this.popoverPoint = Point.LEFT_TOP;
        this.closeOnOutsideClick = true;
    };
    Object.defineProperty(ClrDatepickerViewManager.prototype, "isMonthView", {
        /**
         * Returns if the current view is the monthpicker.
         */
        get: /**
         * Returns if the current view is the monthpicker.
         * @return {?}
         */
        function () {
            return this._viewManagerService.isMonthView;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatepickerViewManager.prototype, "isYearView", {
        /**
         * Returns if the current view is the yearpicker.
         */
        get: /**
         * Returns if the current view is the yearpicker.
         * @return {?}
         */
        function () {
            return this._viewManagerService.isYearView;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatepickerViewManager.prototype, "isDayView", {
        /**
         * Returns if the current view is the daypicker.
         */
        get: /**
         * Returns if the current view is the daypicker.
         * @return {?}
         */
        function () {
            return this._viewManagerService.isDayView;
        },
        enumerable: true,
        configurable: true
    });
    ClrDatepickerViewManager.decorators = [
        { type: Component, args: [{
                    selector: 'clr-datepicker-view-manager',
                    template: "<!--\n* Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.\n* This software is released under MIT license.\n* The full license information can be found in LICENSE in the root directory of this project.\n-->\n\n<clr-monthpicker *ngIf=\"isMonthView\"></clr-monthpicker>\n<clr-yearpicker *ngIf=\"isYearView\"></clr-yearpicker>\n<clr-daypicker *ngIf=\"isDayView\"></clr-daypicker>\n",
                    providers: [ViewManagerService, DatepickerFocusService],
                    host: { '[class.datepicker]': 'true' }
                }] }
    ];
    /** @nocollapse */
    ClrDatepickerViewManager.ctorParameters = function () { return [
        { type: ElementRef, decorators: [{ type: SkipSelf }] },
        { type: Injector },
        { type: ViewManagerService }
    ]; };
    return ClrDatepickerViewManager;
}(AbstractPopover));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrDay = /** @class */ (function () {
    function ClrDay(_dateNavigationService, _ifOpenService, dateFormControlService) {
        this._dateNavigationService = _dateNavigationService;
        this._ifOpenService = _ifOpenService;
        this.dateFormControlService = dateFormControlService;
    }
    /**
     * Updates the focusedDay in the DateNavigationService when the ClrDay is focused.
     */
    /**
     * Updates the focusedDay in the DateNavigationService when the ClrDay is focused.
     * @return {?}
     */
    ClrDay.prototype.onDayViewFocus = /**
     * Updates the focusedDay in the DateNavigationService when the ClrDay is focused.
     * @return {?}
     */
    function () {
        this._dateNavigationService.focusedDay = this.dayView.dayModel;
    };
    /**
     * Updates the selectedDay when the ClrDay is selected and closes the datepicker popover.
     */
    /**
     * Updates the selectedDay when the ClrDay is selected and closes the datepicker popover.
     * @return {?}
     */
    ClrDay.prototype.selectDay = /**
     * Updates the selectedDay when the ClrDay is selected and closes the datepicker popover.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var day = this.dayView.dayModel;
        this._dateNavigationService.notifySelectedDayChanged(day);
        this.dateFormControlService.markAsDirty();
        this._ifOpenService.open = false;
    };
    ClrDay.decorators = [
        { type: Component, args: [{
                    selector: 'clr-day',
                    template: "\n        <button\n            class=\"day-btn\"\n            type=\"button\"\n            [class.is-today]=\"dayView.isTodaysDate\"\n            [class.is-disabled]=\"dayView.isDisabled\"\n            [class.is-selected]=\"dayView.isSelected\"\n            [attr.tabindex]=\"dayView.tabIndex\"\n            (click)=\"selectDay()\"\n            (focus)=\"onDayViewFocus()\">\n            {{dayView.dayModel.date}}\n        </button>\n    ",
                    host: { '[class.day]': 'true' }
                }] }
    ];
    /** @nocollapse */
    ClrDay.ctorParameters = function () { return [
        { type: DateNavigationService },
        { type: IfOpenService },
        { type: DateFormControlService }
    ]; };
    ClrDay.propDecorators = {
        dayView: [{ type: Input, args: ['clrDayView',] }]
    };
    return ClrDay;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrDaypicker = /** @class */ (function () {
    function ClrDaypicker(_viewManagerService, _dateNavigationService, _localeHelperService, commonStrings) {
        this._viewManagerService = _viewManagerService;
        this._dateNavigationService = _dateNavigationService;
        this._localeHelperService = _localeHelperService;
        this.commonStrings = commonStrings;
    }
    /**
     * Calls the ViewManagerService to change to the monthpicker view.
     */
    /**
     * Calls the ViewManagerService to change to the monthpicker view.
     * @return {?}
     */
    ClrDaypicker.prototype.changeToMonthView = /**
     * Calls the ViewManagerService to change to the monthpicker view.
     * @return {?}
     */
    function () {
        this._viewManagerService.changeToMonthView();
    };
    /**
     * Calls the ViewManagerService to change to the yearpicker view.
     */
    /**
     * Calls the ViewManagerService to change to the yearpicker view.
     * @return {?}
     */
    ClrDaypicker.prototype.changeToYearView = /**
     * Calls the ViewManagerService to change to the yearpicker view.
     * @return {?}
     */
    function () {
        this._viewManagerService.changeToYearView();
    };
    Object.defineProperty(ClrDaypicker.prototype, "calendarMonth", {
        /**
         * Returns the month value of the calendar in the TranslationWidth.Abbreviated format.
         */
        get: /**
         * Returns the month value of the calendar in the TranslationWidth.Abbreviated format.
         * @return {?}
         */
        function () {
            return this._localeHelperService.localeMonthsAbbreviated[this._dateNavigationService.displayedCalendar.month];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDaypicker.prototype, "calendarYear", {
        /**
         * Returns the year value of the calendar.
         */
        get: /**
         * Returns the year value of the calendar.
         * @return {?}
         */
        function () {
            return this._dateNavigationService.displayedCalendar.year;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Calls the DateNavigationService to move to the next month.
     */
    /**
     * Calls the DateNavigationService to move to the next month.
     * @return {?}
     */
    ClrDaypicker.prototype.nextMonth = /**
     * Calls the DateNavigationService to move to the next month.
     * @return {?}
     */
    function () {
        this._dateNavigationService.moveToNextMonth();
    };
    /**
     * Calls the DateNavigationService to move to the previous month.
     */
    /**
     * Calls the DateNavigationService to move to the previous month.
     * @return {?}
     */
    ClrDaypicker.prototype.previousMonth = /**
     * Calls the DateNavigationService to move to the previous month.
     * @return {?}
     */
    function () {
        this._dateNavigationService.moveToPreviousMonth();
    };
    /**
     * Calls the DateNavigationService to move to the current month.
     */
    /**
     * Calls the DateNavigationService to move to the current month.
     * @return {?}
     */
    ClrDaypicker.prototype.currentMonth = /**
     * Calls the DateNavigationService to move to the current month.
     * @return {?}
     */
    function () {
        this._dateNavigationService.moveToCurrentMonth();
    };
    ClrDaypicker.decorators = [
        { type: Component, args: [{ selector: 'clr-daypicker', template: "<div class=\"calendar-header\">\n    <div class=\"calendar-pickers\">\n        <button class=\"calendar-btn monthpicker-trigger\" type=\"button\" (click)=\"changeToMonthView()\">\n            {{calendarMonth}}\n        </button>\n        <button class=\"calendar-btn yearpicker-trigger\" type=\"button\" (click)=\"changeToYearView()\">\n            {{calendarYear}}\n        </button>\n    </div>\n    <div class=\"calendar-switchers\">\n        <button class=\"calendar-btn switcher\" type=\"button\" (click)=\"previousMonth()\">\n            <clr-icon shape=\"angle\" dir=\"left\" [attr.title]=\"commonStrings.previous\"></clr-icon>\n        </button>\n        <button class=\"calendar-btn switcher\" type=\"button\" (click)=\"currentMonth()\">\n            <clr-icon shape=\"event\" [attr.title]=\"commonStrings.current\"></clr-icon>\n        </button>\n        <button class=\"calendar-btn switcher\" type=\"button\" (click)=\"nextMonth()\">\n            <clr-icon shape=\"angle\" dir=\"right\" [attr.title]=\"commonStrings.next\"></clr-icon>\n        </button>\n    </div>\n</div>\n<clr-calendar></clr-calendar>\n", host: { '[class.daypicker]': 'true' } }] }
    ];
    /** @nocollapse */
    ClrDaypicker.ctorParameters = function () { return [
        { type: ViewManagerService },
        { type: DateNavigationService },
        { type: LocaleHelperService },
        { type: ClrCommonStrings }
    ]; };
    return ClrDaypicker;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrMonthpicker = /** @class */ (function () {
    function ClrMonthpicker(_viewManagerService, _localeHelperService, _dateNavigationService, _datepickerFocusService, _elRef) {
        this._viewManagerService = _viewManagerService;
        this._localeHelperService = _localeHelperService;
        this._dateNavigationService = _dateNavigationService;
        this._datepickerFocusService = _datepickerFocusService;
        this._elRef = _elRef;
        this._focusedMonthIndex = this.calendarMonthIndex;
    }
    Object.defineProperty(ClrMonthpicker.prototype, "monthNames", {
        /**
         * Gets the months array which is used to rendered the monthpicker view.
         * Months are in the TranslationWidth.Wide format.
         */
        get: /**
         * Gets the months array which is used to rendered the monthpicker view.
         * Months are in the TranslationWidth.Wide format.
         * @return {?}
         */
        function () {
            return this._localeHelperService.localeMonthsWide;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrMonthpicker.prototype, "calendarMonthIndex", {
        /**
         * Gets the month value of the Calendar.
         */
        get: /**
         * Gets the month value of the Calendar.
         * @return {?}
         */
        function () {
            return this._dateNavigationService.displayedCalendar.month;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Calls the DateNavigationService to update the month value of the calendar.
     * Also changes the view to the daypicker.
     */
    /**
     * Calls the DateNavigationService to update the month value of the calendar.
     * Also changes the view to the daypicker.
     * @param {?} monthIndex
     * @return {?}
     */
    ClrMonthpicker.prototype.changeMonth = /**
     * Calls the DateNavigationService to update the month value of the calendar.
     * Also changes the view to the daypicker.
     * @param {?} monthIndex
     * @return {?}
     */
    function (monthIndex) {
        this._dateNavigationService.changeMonth(monthIndex);
        this._viewManagerService.changeToDayView();
    };
    /**
     * Compares the month passed to the focused month and returns the tab index.
     */
    /**
     * Compares the month passed to the focused month and returns the tab index.
     * @param {?} monthIndex
     * @return {?}
     */
    ClrMonthpicker.prototype.getTabIndex = /**
     * Compares the month passed to the focused month and returns the tab index.
     * @param {?} monthIndex
     * @return {?}
     */
    function (monthIndex) {
        return monthIndex === this._focusedMonthIndex ? 0 : -1;
    };
    /**
     * Handles the Keyboard arrow navigation for the monthpicker.
     */
    /**
     * Handles the Keyboard arrow navigation for the monthpicker.
     * @param {?} event
     * @return {?}
     */
    ClrMonthpicker.prototype.onKeyDown = /**
     * Handles the Keyboard arrow navigation for the monthpicker.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // NOTE: Didn't move this to the date navigation service because
        // the logic is fairly simple and it didn't make sense for me
        // to create extra observables just to move this logic to the service.
        if (event) {
            /** @type {?} */
            var keyCode = event.keyCode;
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
    };
    /**
     * Focuses on the current calendar month when the View is initialized.
     */
    /**
     * Focuses on the current calendar month when the View is initialized.
     * @return {?}
     */
    ClrMonthpicker.prototype.ngAfterViewInit = /**
     * Focuses on the current calendar month when the View is initialized.
     * @return {?}
     */
    function () {
        this._datepickerFocusService.focusCell(this._elRef);
    };
    ClrMonthpicker.decorators = [
        { type: Component, args: [{
                    selector: 'clr-monthpicker',
                    template: "\n        <button\n            type=\"button\"\n            class=\"calendar-btn month\"\n            *ngFor=\"let month of monthNames; let monthIndex = index\"\n            (click)=\"changeMonth(monthIndex)\"\n            [class.is-selected]=\"monthIndex === calendarMonthIndex\"\n            [attr.tabindex]=\"getTabIndex(monthIndex)\">\n            {{month}}\n        </button>\n    ",
                    host: {
                        '[class.monthpicker]': 'true',
                    }
                }] }
    ];
    /** @nocollapse */
    ClrMonthpicker.ctorParameters = function () { return [
        { type: ViewManagerService },
        { type: LocaleHelperService },
        { type: DateNavigationService },
        { type: DatepickerFocusService },
        { type: ElementRef }
    ]; };
    ClrMonthpicker.propDecorators = {
        onKeyDown: [{ type: HostListener, args: ['keydown', ['$event'],] }]
    };
    return ClrMonthpicker;
}());

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
var YEARS_TO_DISPLAY = 10;
var YearRangeModel = /** @class */ (function () {
    function YearRangeModel(year) {
        this.year = year;
        this.yearRange = [];
        this.generateYearRange();
    }
    Object.defineProperty(YearRangeModel.prototype, "middleYear", {
        /**
         * Gets the number in the middle of the range.
         */
        get: /**
         * Gets the number in the middle of the range.
         * @return {?}
         */
        function () {
            return this.yearRange[Math.floor(this.yearRange.length / 2)];
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Generates the year range based on the year parameter.
     * eg: If 2018 is passed the output will be [2010, 2011, ..., 2019]
     */
    /**
     * Generates the year range based on the year parameter.
     * eg: If 2018 is passed the output will be [2010, 2011, ..., 2019]
     * @private
     * @return {?}
     */
    YearRangeModel.prototype.generateYearRange = /**
     * Generates the year range based on the year parameter.
     * eg: If 2018 is passed the output will be [2010, 2011, ..., 2019]
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var remainder = this.year % YEARS_TO_DISPLAY;
        /** @type {?} */
        var floor = this.year - remainder;
        /** @type {?} */
        var ceil = floor + YEARS_TO_DISPLAY;
        this.yearRange = this.generateRange(floor, ceil);
    };
    /**
     * Function which generate a range of numbers from floor to ceil.
     */
    /**
     * Function which generate a range of numbers from floor to ceil.
     * @private
     * @param {?} floor
     * @param {?} ceil
     * @return {?}
     */
    YearRangeModel.prototype.generateRange = /**
     * Function which generate a range of numbers from floor to ceil.
     * @private
     * @param {?} floor
     * @param {?} ceil
     * @return {?}
     */
    function (floor, ceil) {
        return Array.from({ length: ceil - floor }, (/**
         * @param {?} v
         * @param {?} k
         * @return {?}
         */
        function (v, k) { return k + floor; }));
    };
    /**
     * Generates the YearRangeModel for the next decade.
     */
    /**
     * Generates the YearRangeModel for the next decade.
     * @return {?}
     */
    YearRangeModel.prototype.nextDecade = /**
     * Generates the YearRangeModel for the next decade.
     * @return {?}
     */
    function () {
        return new YearRangeModel(this.year + 10);
    };
    /**
     * Generates the YearRangeModel for the previous decade.
     */
    /**
     * Generates the YearRangeModel for the previous decade.
     * @return {?}
     */
    YearRangeModel.prototype.previousDecade = /**
     * Generates the YearRangeModel for the previous decade.
     * @return {?}
     */
    function () {
        return new YearRangeModel(this.year - 10);
    };
    /**
     * Generates the YearRangeModel for the current decade.
     */
    /**
     * Generates the YearRangeModel for the current decade.
     * @return {?}
     */
    YearRangeModel.prototype.currentDecade = /**
     * Generates the YearRangeModel for the current decade.
     * @return {?}
     */
    function () {
        return new YearRangeModel(new Date().getFullYear());
    };
    /**
     * Checks if the value is in the YearRangeModel.
     */
    /**
     * Checks if the value is in the YearRangeModel.
     * @param {?} value
     * @return {?}
     */
    YearRangeModel.prototype.inRange = /**
     * Checks if the value is in the YearRangeModel.
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return this.yearRange.indexOf(value) > -1;
    };
    return YearRangeModel;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrYearpicker = /** @class */ (function () {
    function ClrYearpicker(_dateNavigationService, _viewManagerService, _datepickerFocusService, _elRef, commonStrings) {
        this._dateNavigationService = _dateNavigationService;
        this._viewManagerService = _viewManagerService;
        this._datepickerFocusService = _datepickerFocusService;
        this._elRef = _elRef;
        this.commonStrings = commonStrings;
        this.yearRangeModel = new YearRangeModel(this.calendarYear);
        this._focusedYear = this.calendarYear;
    }
    Object.defineProperty(ClrYearpicker.prototype, "calendarYear", {
        /**
         * Gets the year which the user is currently on.
         */
        get: /**
         * Gets the year which the user is currently on.
         * @return {?}
         */
        function () {
            return this._dateNavigationService.displayedCalendar.year;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Increments the focus year by the value passed. Updates the YearRangeModel if the
     * new value is not in the current decade.
     */
    /**
     * Increments the focus year by the value passed. Updates the YearRangeModel if the
     * new value is not in the current decade.
     * @private
     * @param {?} value
     * @return {?}
     */
    ClrYearpicker.prototype.incrementFocusYearBy = /**
     * Increments the focus year by the value passed. Updates the YearRangeModel if the
     * new value is not in the current decade.
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
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
    };
    /**
     * Calls the DateNavigationService to update the year value of the calendar.
     * Also changes the view to the daypicker.
     */
    /**
     * Calls the DateNavigationService to update the year value of the calendar.
     * Also changes the view to the daypicker.
     * @param {?} year
     * @return {?}
     */
    ClrYearpicker.prototype.changeYear = /**
     * Calls the DateNavigationService to update the year value of the calendar.
     * Also changes the view to the daypicker.
     * @param {?} year
     * @return {?}
     */
    function (year) {
        this._dateNavigationService.changeYear(year);
        this._viewManagerService.changeToDayView();
    };
    /**
     * Updates the YearRangeModel to the previous decade.
     */
    /**
     * Updates the YearRangeModel to the previous decade.
     * @return {?}
     */
    ClrYearpicker.prototype.previousDecade = /**
     * Updates the YearRangeModel to the previous decade.
     * @return {?}
     */
    function () {
        this.yearRangeModel = this.yearRangeModel.previousDecade();
        // Year in the yearpicker is not focused because while navigating to a different decade,
        // you want the focus to remain on the decade switcher arrows.
    };
    /**
     * Updates the YearRangeModel to the current decade.
     */
    /**
     * Updates the YearRangeModel to the current decade.
     * @return {?}
     */
    ClrYearpicker.prototype.currentDecade = /**
     * Updates the YearRangeModel to the current decade.
     * @return {?}
     */
    function () {
        if (!this.yearRangeModel.inRange(this._dateNavigationService.today.year)) {
            this.yearRangeModel = this.yearRangeModel.currentDecade();
        }
        this._datepickerFocusService.focusCell(this._elRef);
    };
    /**
     * Updates the YearRangeModel to the next decade.
     */
    /**
     * Updates the YearRangeModel to the next decade.
     * @return {?}
     */
    ClrYearpicker.prototype.nextDecade = /**
     * Updates the YearRangeModel to the next decade.
     * @return {?}
     */
    function () {
        this.yearRangeModel = this.yearRangeModel.nextDecade();
        // Year in the yearpicker is not focused because while navigating to a different decade,
        // you want the focus to remain on the decade switcher arrows.
    };
    /**
     * Compares the year passed to the focused year and returns the tab index.
     */
    /**
     * Compares the year passed to the focused year and returns the tab index.
     * @param {?} year
     * @return {?}
     */
    ClrYearpicker.prototype.getTabIndex = /**
     * Compares the year passed to the focused year and returns the tab index.
     * @param {?} year
     * @return {?}
     */
    function (year) {
        if (!this.yearRangeModel.inRange(this._focusedYear)) {
            if (this.yearRangeModel.inRange(this.calendarYear)) {
                this._focusedYear = this.calendarYear;
            }
            else {
                this._focusedYear = this.yearRangeModel.middleYear;
            }
        }
        return this._focusedYear === year ? 0 : -1;
    };
    /**
     * Handles the Keyboard arrow navigation for the yearpicker.
     */
    /**
     * Handles the Keyboard arrow navigation for the yearpicker.
     * @param {?} event
     * @return {?}
     */
    ClrYearpicker.prototype.onKeyDown = /**
     * Handles the Keyboard arrow navigation for the yearpicker.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // NOTE: Didn't move this to the date navigation service because
        // the logic is fairly simple and it didn't make sense for me
        // to create extra observables just to move this logic to the service.
        if (event) {
            /** @type {?} */
            var keyCode = event.keyCode;
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
    };
    /**
     * Focuses on the current calendar year when the View is initialized.
     */
    /**
     * Focuses on the current calendar year when the View is initialized.
     * @return {?}
     */
    ClrYearpicker.prototype.ngAfterViewInit = /**
     * Focuses on the current calendar year when the View is initialized.
     * @return {?}
     */
    function () {
        this._datepickerFocusService.focusCell(this._elRef);
    };
    ClrYearpicker.decorators = [
        { type: Component, args: [{
                    selector: 'clr-yearpicker',
                    template: "\n        <div class=\"year-switchers\">\n            <button class=\"calendar-btn switcher\" type=\"button\" (click)=\"previousDecade()\">\n                <clr-icon shape=\"angle\" dir=\"left\" [attr.title]=\"commonStrings.previous\"></clr-icon>\n            </button>\n            <button class=\"calendar-btn switcher\" type=\"button\" (click)=\"currentDecade()\">\n                <clr-icon shape=\"event\" [attr.title]=\"commonStrings.current\"></clr-icon>\n            </button>\n            <button class=\"calendar-btn switcher\" type=\"button\" (click)=\"nextDecade()\">\n                <clr-icon shape=\"angle\" dir=\"right\" [attr.title]=\"commonStrings.next\"></clr-icon>\n            </button>\n        </div>\n        <div class=\"years\">\n            <button\n                *ngFor=\"let year of yearRangeModel.yearRange\"\n                type=\"button\"\n                class=\"calendar-btn year\"\n                [attr.tabindex]=\"getTabIndex(year)\"\n                [class.is-selected]=\"year === calendarYear\"\n                (click)=\"changeYear(year)\">\n                {{year}}\n            </button>\n        </div>\n    ",
                    host: {
                        '[class.yearpicker]': 'true',
                    }
                }] }
    ];
    /** @nocollapse */
    ClrYearpicker.ctorParameters = function () { return [
        { type: DateNavigationService },
        { type: ViewManagerService },
        { type: DatepickerFocusService },
        { type: ElementRef },
        { type: ClrCommonStrings }
    ]; };
    ClrYearpicker.propDecorators = {
        onKeyDown: [{ type: HostListener, args: ['keydown', ['$event'],] }]
    };
    return ClrYearpicker;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var CLR_DATEPICKER_DIRECTIVES = [
    ClrDay,
    ClrDateContainer,
    ClrDateInput,
    ClrDatepickerViewManager,
    ClrMonthpicker,
    ClrYearpicker,
    ClrDaypicker,
    ClrCalendar,
];
var ClrDatepickerModule = /** @class */ (function () {
    function ClrDatepickerModule() {
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
    return ClrDatepickerModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrInputContainer = /** @class */ (function () {
    function ClrInputContainer(ifErrorService, layoutService, controlClassService, ngControlService) {
        var _this = this;
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
        function (invalid) {
            _this.invalid = invalid;
        })));
        this.subscriptions.push(this.ngControlService.controlChanges.subscribe((/**
         * @param {?} control
         * @return {?}
         */
        function (control) {
            _this.control = control;
        })));
    }
    /**
     * @return {?}
     */
    ClrInputContainer.prototype.controlClass = /**
     * @return {?}
     */
    function () {
        return this.controlClassService.controlClass(this.invalid, this.addGrid());
    };
    /**
     * @return {?}
     */
    ClrInputContainer.prototype.addGrid = /**
     * @return {?}
     */
    function () {
        if (this.layoutService && !this.layoutService.isVertical()) {
            return true;
        }
        return false;
    };
    /**
     * @return {?}
     */
    ClrInputContainer.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.subscriptions) {
            this.subscriptions.map((/**
             * @param {?} sub
             * @return {?}
             */
            function (sub) { return sub.unsubscribe(); }));
        }
    };
    ClrInputContainer.decorators = [
        { type: Component, args: [{
                    selector: 'clr-input-container',
                    template: "\n        <ng-content select=\"label\"></ng-content>\n        <label *ngIf=\"!label && addGrid()\"></label>\n        <div class=\"clr-control-container\" [ngClass]=\"controlClass()\">\n            <div class=\"clr-input-wrapper\">\n                <ng-content select=\"[clrInput]\"></ng-content>\n                <clr-icon *ngIf=\"invalid\" class=\"clr-validate-icon\" shape=\"exclamation-circle\" aria-hidden=\"true\"></clr-icon>\n            </div>\n            <ng-content select=\"clr-control-helper\" *ngIf=\"!invalid\"></ng-content>\n            <ng-content select=\"clr-control-error\" *ngIf=\"invalid\"></ng-content>\n        </div>\n    ",
                    host: {
                        '[class.clr-form-control]': 'true',
                        '[class.clr-form-control-disabled]': 'control?.disabled',
                        '[class.clr-row]': 'addGrid()',
                    },
                    providers: [IfErrorService, NgControlService, ControlIdService, ControlClassService]
                }] }
    ];
    /** @nocollapse */
    ClrInputContainer.ctorParameters = function () { return [
        { type: IfErrorService },
        { type: LayoutService, decorators: [{ type: Optional }] },
        { type: ControlClassService },
        { type: NgControlService }
    ]; };
    ClrInputContainer.propDecorators = {
        label: [{ type: ContentChild, args: [ClrLabel,] }]
    };
    return ClrInputContainer;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrInput = /** @class */ (function (_super) {
    __extends(ClrInput, _super);
    function ClrInput(vcr, injector, control, renderer, el) {
        var _this = _super.call(this, vcr, ClrInputContainer, injector, control, renderer, el) || this;
        _this.index = 1;
        return _this;
    }
    ClrInput.decorators = [
        { type: Directive, args: [{ selector: '[clrInput]', host: { '[class.clr-input]': 'true' } },] }
    ];
    /** @nocollapse */
    ClrInput.ctorParameters = function () { return [
        { type: ViewContainerRef },
        { type: Injector },
        { type: NgControl, decorators: [{ type: Self }, { type: Optional }] },
        { type: Renderer2 },
        { type: ElementRef }
    ]; };
    return ClrInput;
}(WrappedFormControl));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrInputModule = /** @class */ (function () {
    function ClrInputModule() {
    }
    ClrInputModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, FormsModule, ClrIconModule, ClrCommonFormsModule],
                    declarations: [ClrInput, ClrInputContainer],
                    exports: [ClrCommonFormsModule, ClrInput, ClrInputContainer],
                    entryComponents: [ClrInputContainer],
                },] }
    ];
    return ClrInputModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var TOGGLE_SERVICE = new InjectionToken(undefined);
/**
 * @return {?}
 */
function ToggleServiceFactory() {
    return new BehaviorSubject(false);
}
/** @type {?} */
var TOGGLE_SERVICE_PROVIDER = { provide: TOGGLE_SERVICE, useFactory: ToggleServiceFactory };
var ClrPasswordContainer = /** @class */ (function () {
    function ClrPasswordContainer(ifErrorService, layoutService, controlClassService, focusService, ngControlService, toggleService, commonStrings) {
        var _this = this;
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
        function (invalid) {
            _this.invalid = invalid;
        })));
        this.subscriptions.push(this.focusService.focusChange.subscribe((/**
         * @param {?} state
         * @return {?}
         */
        function (state$$1) {
            _this.focus = state$$1;
        })));
        this.subscriptions.push(this.ngControlService.controlChanges.subscribe((/**
         * @param {?} control
         * @return {?}
         */
        function (control) {
            _this.control = control;
        })));
    }
    Object.defineProperty(ClrPasswordContainer.prototype, "clrToggle", {
        get: /**
         * @return {?}
         */
        function () {
            return this._toggle;
        },
        set: /**
         * @param {?} state
         * @return {?}
         */
        function (state$$1) {
            this._toggle = state$$1;
            if (!state$$1) {
                this.show = false;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ClrPasswordContainer.prototype.toggle = /**
     * @return {?}
     */
    function () {
        this.show = !this.show;
        this.toggleService.next(this.show);
    };
    /**
     * @return {?}
     */
    ClrPasswordContainer.prototype.controlClass = /**
     * @return {?}
     */
    function () {
        return this.controlClassService.controlClass(this.invalid, this.addGrid());
    };
    /**
     * @return {?}
     */
    ClrPasswordContainer.prototype.addGrid = /**
     * @return {?}
     */
    function () {
        if (this.layoutService && !this.layoutService.isVertical()) {
            return true;
        }
        return false;
    };
    /**
     * @return {?}
     */
    ClrPasswordContainer.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.subscriptions) {
            this.subscriptions.map((/**
             * @param {?} sub
             * @return {?}
             */
            function (sub) { return sub.unsubscribe(); }));
        }
    };
    ClrPasswordContainer.decorators = [
        { type: Component, args: [{
                    selector: 'clr-password-container',
                    template: "\n    <ng-content select=\"label\"></ng-content>\n    <label *ngIf=\"!label && addGrid()\"></label>\n    <div class=\"clr-control-container\" [ngClass]=\"controlClass()\">\n      <div class=\"clr-input-wrapper\">\n        <div class=\"clr-input-group\" [class.clr-focus]=\"focus\">\n          <ng-content select=\"[clrPassword]\"></ng-content>\n          <button\n            *ngIf=\"clrToggle\"\n            (click)=\"toggle()\"\n            [disabled]=\"control?.disabled\"\n            class=\"clr-input-group-icon-action\"\n            type=\"button\">\n            <clr-icon\n            [attr.shape]=\"show ? 'eye-hide' : 'eye'\"\n            [attr.title]=\"show ? commonStrings.hide : commonStrings.show\"></clr-icon>\n          </button>\n        </div>\n        <clr-icon *ngIf=\"invalid\" class=\"clr-validate-icon\" shape=\"exclamation-circle\" aria-hidden=\"true\"></clr-icon>\n      </div>\n      <ng-content select=\"clr-control-helper\" *ngIf=\"!invalid\"></ng-content>\n      <ng-content select=\"clr-control-error\" *ngIf=\"invalid\"></ng-content>\n    </div>\n    ",
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
    ClrPasswordContainer.ctorParameters = function () { return [
        { type: IfErrorService },
        { type: LayoutService, decorators: [{ type: Optional }] },
        { type: ControlClassService },
        { type: FocusService },
        { type: NgControlService },
        { type: BehaviorSubject, decorators: [{ type: Inject, args: [TOGGLE_SERVICE,] }] },
        { type: ClrCommonStrings }
    ]; };
    ClrPasswordContainer.propDecorators = {
        clrToggle: [{ type: Input, args: ['clrToggle',] }],
        label: [{ type: ContentChild, args: [ClrLabel,] }]
    };
    return ClrPasswordContainer;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrPassword = /** @class */ (function (_super) {
    __extends(ClrPassword, _super);
    function ClrPassword(vcr, injector, control, renderer, el, focusService, toggleService) {
        var _this = _super.call(this, vcr, ClrPasswordContainer, injector, control, renderer, el) || this;
        _this.focusService = focusService;
        _this.toggleService = toggleService;
        _this.index = 1;
        if (!_this.focusService) {
            throw new Error('clrPassword requires being wrapped in <clr-password-container>');
        }
        _this.subscriptions.push(_this.toggleService.subscribe((/**
         * @param {?} toggle
         * @return {?}
         */
        function (toggle) {
            renderer.setProperty(el.nativeElement, 'type', toggle ? 'text' : 'password');
        })));
        return _this;
    }
    /**
     * @return {?}
     */
    ClrPassword.prototype.triggerFocus = /**
     * @return {?}
     */
    function () {
        if (this.focusService) {
            this.focusService.focused = true;
        }
    };
    /**
     * @return {?}
     */
    ClrPassword.prototype.triggerValidation = /**
     * @return {?}
     */
    function () {
        _super.prototype.triggerValidation.call(this);
        if (this.focusService) {
            this.focusService.focused = false;
        }
    };
    ClrPassword.decorators = [
        { type: Directive, args: [{ selector: '[clrPassword]', host: { '[class.clr-input]': 'true' } },] }
    ];
    /** @nocollapse */
    ClrPassword.ctorParameters = function () { return [
        { type: ViewContainerRef },
        { type: Injector },
        { type: NgControl, decorators: [{ type: Self }, { type: Optional }] },
        { type: Renderer2 },
        { type: ElementRef },
        { type: FocusService, decorators: [{ type: Optional }] },
        { type: BehaviorSubject, decorators: [{ type: Optional }, { type: Inject, args: [TOGGLE_SERVICE,] }] }
    ]; };
    ClrPassword.propDecorators = {
        triggerFocus: [{ type: HostListener, args: ['focus',] }],
        triggerValidation: [{ type: HostListener, args: ['blur',] }]
    };
    return ClrPassword;
}(WrappedFormControl));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrPasswordModule = /** @class */ (function () {
    function ClrPasswordModule() {
    }
    ClrPasswordModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, FormsModule, ClrIconModule, ClrCommonFormsModule],
                    declarations: [ClrPassword, ClrPasswordContainer],
                    exports: [ClrCommonFormsModule, ClrPassword, ClrPasswordContainer],
                    entryComponents: [ClrPasswordContainer],
                },] }
    ];
    return ClrPasswordModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrRadioWrapper = /** @class */ (function () {
    function ClrRadioWrapper() {
        // We need both _dynamic for HostWrapper and ContentChild(ClrLabel) in cases where
        // the user puts a radio inside a wrapper without a label, host wrapping doesn't apply
        // but we'd still need to insert a label
        this._dynamic = false;
    }
    /**
     * @return {?}
     */
    ClrRadioWrapper.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (this.label) {
            this.label.disableGrid();
        }
    };
    ClrRadioWrapper.decorators = [
        { type: Component, args: [{
                    selector: 'clr-radio-wrapper',
                    template: "\n    <ng-content select=\"[clrRadio]\"></ng-content>\n    <ng-content select=\"label\"></ng-content>\n    <label *ngIf=\"!label\"></label>\n  ",
                    host: {
                        '[class.clr-radio-wrapper]': 'true',
                    },
                    providers: [ControlIdService]
                }] }
    ];
    ClrRadioWrapper.propDecorators = {
        label: [{ type: ContentChild, args: [ClrLabel,] }]
    };
    return ClrRadioWrapper;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrRadio = /** @class */ (function (_super) {
    __extends(ClrRadio, _super);
    function ClrRadio(vcr, injector, control, renderer, el) {
        return _super.call(this, vcr, ClrRadioWrapper, injector, control, renderer, el) || this;
    }
    ClrRadio.decorators = [
        { type: Directive, args: [{ selector: '[clrRadio]' },] }
    ];
    /** @nocollapse */
    ClrRadio.ctorParameters = function () { return [
        { type: ViewContainerRef },
        { type: Injector },
        { type: NgControl, decorators: [{ type: Self }, { type: Optional }] },
        { type: Renderer2 },
        { type: ElementRef }
    ]; };
    return ClrRadio;
}(WrappedFormControl));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrRadioContainer = /** @class */ (function () {
    function ClrRadioContainer(ifErrorService, layoutService, controlClassService, ngControlService) {
        var _this = this;
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
        function (invalid) {
            _this.invalid = invalid;
        })));
        this.subscriptions.push(this.ngControlService.controlChanges.subscribe((/**
         * @param {?} control
         * @return {?}
         */
        function (control) {
            _this.control = control;
        })));
    }
    Object.defineProperty(ClrRadioContainer.prototype, "clrInline", {
        get: /**
         * @return {?}
         */
        function () {
            return this.inline;
        },
        /*
         * Here we want to support the following cases
         * clrInline - true by presence
         * clrInline="true|false" - unless it is explicitly false, strings are considered true
         * [clrInline]="true|false" - expect a boolean
         */
        set: /*
           * Here we want to support the following cases
           * clrInline - true by presence
           * clrInline="true|false" - unless it is explicitly false, strings are considered true
           * [clrInline]="true|false" - expect a boolean
           */
        /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (typeof value === 'string') {
                this.inline = value === 'false' ? false : true;
            }
            else {
                this.inline = !!value;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ClrRadioContainer.prototype.controlClass = /**
     * @return {?}
     */
    function () {
        return this.controlClassService.controlClass(this.invalid, this.addGrid(), this.inline ? 'clr-control-inline' : '');
    };
    /**
     * @return {?}
     */
    ClrRadioContainer.prototype.addGrid = /**
     * @return {?}
     */
    function () {
        if (this.layoutService && !this.layoutService.isVertical()) {
            return true;
        }
        return false;
    };
    /**
     * @return {?}
     */
    ClrRadioContainer.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subscriptions.map((/**
         * @param {?} sub
         * @return {?}
         */
        function (sub) { return sub.unsubscribe(); }));
    };
    ClrRadioContainer.decorators = [
        { type: Component, args: [{
                    selector: 'clr-radio-container',
                    template: "\n    <ng-content select=\"label\"></ng-content>\n    <label *ngIf=\"!label && addGrid()\"></label>\n    <div class=\"clr-control-container\" [class.clr-control-inline]=\"clrInline\" [ngClass]=\"controlClass()\">\n      <ng-content select=\"clr-radio-wrapper\"></ng-content>\n      <div class=\"clr-subtext-wrapper\">\n        <ng-content select=\"clr-control-helper\" *ngIf=\"!invalid\"></ng-content>\n        <clr-icon *ngIf=\"invalid\" class=\"clr-validate-icon\" shape=\"exclamation-circle\" aria-hidden=\"true\"></clr-icon>\n        <ng-content select=\"clr-control-error\" *ngIf=\"invalid\"></ng-content>\n      </div>\n    </div>\n    ",
                    host: {
                        '[class.clr-form-control]': 'true',
                        '[class.clr-form-control-disabled]': 'control?.disabled',
                        '[class.clr-row]': 'addGrid()',
                    },
                    providers: [NgControlService, ControlClassService, IfErrorService]
                }] }
    ];
    /** @nocollapse */
    ClrRadioContainer.ctorParameters = function () { return [
        { type: IfErrorService },
        { type: LayoutService, decorators: [{ type: Optional }] },
        { type: ControlClassService },
        { type: NgControlService }
    ]; };
    ClrRadioContainer.propDecorators = {
        label: [{ type: ContentChild, args: [ClrLabel,] }],
        clrInline: [{ type: Input }]
    };
    return ClrRadioContainer;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrRadioModule = /** @class */ (function () {
    function ClrRadioModule() {
    }
    ClrRadioModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, ClrCommonFormsModule, ClrHostWrappingModule, ClrIconModule],
                    declarations: [ClrRadio, ClrRadioContainer, ClrRadioWrapper],
                    exports: [ClrCommonFormsModule, ClrRadio, ClrRadioContainer, ClrRadioWrapper],
                    entryComponents: [ClrRadioWrapper],
                },] }
    ];
    return ClrRadioModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrSelectContainer = /** @class */ (function () {
    function ClrSelectContainer(ifErrorService, layoutService, controlClassService, ngControlService) {
        var _this = this;
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
        function (invalid) {
            _this.invalid = invalid;
        })));
        this.subscriptions.push(this.ngControlService.controlChanges.subscribe((/**
         * @param {?} control
         * @return {?}
         */
        function (control) {
            if (control) {
                _this.multi = control.valueAccessor instanceof SelectMultipleControlValueAccessor;
                _this.control = control;
            }
        })));
    }
    /**
     * @return {?}
     */
    ClrSelectContainer.prototype.wrapperClass = /**
     * @return {?}
     */
    function () {
        return this.multi ? 'clr-multiselect-wrapper' : 'clr-select-wrapper';
    };
    /**
     * @return {?}
     */
    ClrSelectContainer.prototype.controlClass = /**
     * @return {?}
     */
    function () {
        return this.controlClassService.controlClass(this.invalid, this.addGrid());
    };
    /**
     * @return {?}
     */
    ClrSelectContainer.prototype.addGrid = /**
     * @return {?}
     */
    function () {
        if (this.layoutService && !this.layoutService.isVertical()) {
            return true;
        }
        return false;
    };
    /**
     * @return {?}
     */
    ClrSelectContainer.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.subscriptions) {
            this.subscriptions.map((/**
             * @param {?} sub
             * @return {?}
             */
            function (sub) { return sub.unsubscribe(); }));
        }
    };
    ClrSelectContainer.decorators = [
        { type: Component, args: [{
                    selector: 'clr-select-container',
                    template: "    \n        <ng-content select=\"label\"></ng-content>\n        <label *ngIf=\"!label && addGrid()\"></label>\n        <div class=\"clr-control-container\" [ngClass]=\"controlClass()\">\n            <div [ngClass]=\"wrapperClass()\">\n                <ng-content select=\"[clrSelect]\"></ng-content>\n                <clr-icon *ngIf=\"invalid\" class=\"clr-validate-icon\" shape=\"exclamation-circle\" aria-hidden=\"true\"></clr-icon>\n            </div>\n            <ng-content select=\"clr-control-helper\" *ngIf=\"!invalid\"></ng-content>\n            <ng-content select=\"clr-control-error\" *ngIf=\"invalid\"></ng-content>\n        </div>\n    ",
                    host: {
                        '[class.clr-form-control]': 'true',
                        '[class.clr-form-control-disabled]': 'control?.disabled',
                        '[class.clr-row]': 'addGrid()',
                    },
                    providers: [IfErrorService, NgControlService, ControlIdService, ControlClassService]
                }] }
    ];
    /** @nocollapse */
    ClrSelectContainer.ctorParameters = function () { return [
        { type: IfErrorService },
        { type: LayoutService, decorators: [{ type: Optional }] },
        { type: ControlClassService },
        { type: NgControlService }
    ]; };
    ClrSelectContainer.propDecorators = {
        label: [{ type: ContentChild, args: [ClrLabel,] }],
        multiple: [{ type: ContentChild, args: [SelectMultipleControlValueAccessor,] }]
    };
    return ClrSelectContainer;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrSelect = /** @class */ (function (_super) {
    __extends(ClrSelect, _super);
    function ClrSelect(vcr, injector, control, renderer, el) {
        var _this = _super.call(this, vcr, ClrSelectContainer, injector, control, renderer, el) || this;
        _this.index = 1;
        return _this;
    }
    ClrSelect.decorators = [
        { type: Directive, args: [{ selector: '[clrSelect]', host: { '[class.clr-select]': 'true' } },] }
    ];
    /** @nocollapse */
    ClrSelect.ctorParameters = function () { return [
        { type: ViewContainerRef },
        { type: Injector },
        { type: NgControl, decorators: [{ type: Self }, { type: Optional }] },
        { type: Renderer2 },
        { type: ElementRef }
    ]; };
    return ClrSelect;
}(WrappedFormControl));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrSelectModule = /** @class */ (function () {
    function ClrSelectModule() {
    }
    ClrSelectModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, FormsModule, ClrIconModule, ClrCommonFormsModule],
                    declarations: [ClrSelect, ClrSelectContainer],
                    exports: [ClrCommonFormsModule, ClrSelect, ClrSelectContainer],
                    entryComponents: [ClrSelectContainer],
                },] }
    ];
    return ClrSelectModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrTextareaContainer = /** @class */ (function () {
    function ClrTextareaContainer(ifErrorService, layoutService, controlClassService, ngControlService) {
        var _this = this;
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
        function (invalid) {
            _this.invalid = invalid;
        })));
        this.subscriptions.push(this.ngControlService.controlChanges.subscribe((/**
         * @param {?} control
         * @return {?}
         */
        function (control) {
            _this.control = control;
        })));
    }
    /**
     * @return {?}
     */
    ClrTextareaContainer.prototype.controlClass = /**
     * @return {?}
     */
    function () {
        return this.controlClassService.controlClass(this.invalid, this.addGrid());
    };
    /**
     * @return {?}
     */
    ClrTextareaContainer.prototype.addGrid = /**
     * @return {?}
     */
    function () {
        if (this.layoutService && !this.layoutService.isVertical()) {
            return true;
        }
        return false;
    };
    /**
     * @return {?}
     */
    ClrTextareaContainer.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.subscriptions) {
            this.subscriptions.map((/**
             * @param {?} sub
             * @return {?}
             */
            function (sub) { return sub.unsubscribe(); }));
        }
    };
    ClrTextareaContainer.decorators = [
        { type: Component, args: [{
                    selector: 'clr-textarea-container',
                    template: "\n        <ng-content select=\"label\"></ng-content>\n        <label *ngIf=\"!label && addGrid()\"></label>\n        <div class=\"clr-control-container\" [ngClass]=\"controlClass()\">\n            <div class=\"clr-textarea-wrapper\">\n                <ng-content select=\"[clrTextarea]\"></ng-content>\n                <clr-icon *ngIf=\"invalid\" class=\"clr-validate-icon\" shape=\"exclamation-circle\" aria-hidden=\"true\"></clr-icon>\n            </div>\n            <ng-content select=\"clr-control-helper\" *ngIf=\"!invalid\"></ng-content>\n            <ng-content select=\"clr-control-error\" *ngIf=\"invalid\"></ng-content>\n        </div>\n    ",
                    host: {
                        '[class.clr-form-control]': 'true',
                        '[class.clr-form-control-disabled]': 'control?.disabled',
                        '[class.clr-row]': 'addGrid()',
                    },
                    providers: [IfErrorService, NgControlService, ControlIdService, ControlClassService]
                }] }
    ];
    /** @nocollapse */
    ClrTextareaContainer.ctorParameters = function () { return [
        { type: IfErrorService },
        { type: LayoutService, decorators: [{ type: Optional }] },
        { type: ControlClassService },
        { type: NgControlService }
    ]; };
    ClrTextareaContainer.propDecorators = {
        label: [{ type: ContentChild, args: [ClrLabel,] }]
    };
    return ClrTextareaContainer;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrTextarea = /** @class */ (function (_super) {
    __extends(ClrTextarea, _super);
    function ClrTextarea(vcr, injector, control, renderer, el) {
        var _this = _super.call(this, vcr, ClrTextareaContainer, injector, control, renderer, el) || this;
        _this.index = 1;
        return _this;
    }
    ClrTextarea.decorators = [
        { type: Directive, args: [{ selector: '[clrTextarea]', host: { '[class.clr-textarea]': 'true' } },] }
    ];
    /** @nocollapse */
    ClrTextarea.ctorParameters = function () { return [
        { type: ViewContainerRef },
        { type: Injector },
        { type: NgControl, decorators: [{ type: Self }, { type: Optional }] },
        { type: Renderer2 },
        { type: ElementRef }
    ]; };
    return ClrTextarea;
}(WrappedFormControl));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrTextareaModule = /** @class */ (function () {
    function ClrTextareaModule() {
    }
    ClrTextareaModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, FormsModule, ClrIconModule, ClrCommonFormsModule],
                    declarations: [ClrTextarea, ClrTextareaContainer],
                    exports: [ClrCommonFormsModule, ClrTextarea, ClrTextareaContainer],
                    entryComponents: [ClrTextareaContainer],
                },] }
    ];
    return ClrTextareaModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrFormsModule = /** @class */ (function () {
    function ClrFormsModule() {
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
    return ClrFormsModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Expand = /** @class */ (function () {
    function Expand() {
        this.expandable = 0;
        // private _replace: boolean = false;
        this._replace = new BehaviorSubject(false);
        this._loading = false;
        this._expanded = false;
        // TODO: Move this to the datagrid RowExpand.
        // I spent some time doing this but ran into a couple of issues
        // Will take care of this later.
        this._animate = new Subject();
        this._expandChange = new Subject();
    }
    Object.defineProperty(Expand.prototype, "replace", {
        get: /**
         * @return {?}
         */
        function () {
            return this._replace.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} replaceValue
     * @return {?}
     */
    Expand.prototype.setReplace = /**
     * @param {?} replaceValue
     * @return {?}
     */
    function (replaceValue) {
        this._replace.next(replaceValue);
    };
    Object.defineProperty(Expand.prototype, "loading", {
        get: /**
         * @return {?}
         */
        function () {
            return this._loading;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            value = !!value;
            if (value !== this._loading) {
                this._loading = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Expand.prototype, "expanded", {
        get: /**
         * @return {?}
         */
        function () {
            return this._expanded;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            value = !!value;
            if (value !== this._expanded) {
                this._expanded = value;
                this._animate.next();
                this._expandChange.next(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    Expand.prototype.toggle = /**
     * @return {?}
     */
    function () {
        this.expanded = !this._expanded;
    };
    Object.defineProperty(Expand.prototype, "animate", {
        get: /**
         * @return {?}
         */
        function () {
            return this._animate.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Expand.prototype, "expandChange", {
        get: /**
         * @return {?}
         */
        function () {
            return this._expandChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} state
     * @return {?}
     */
    Expand.prototype.loadingStateChange = /**
     * @param {?} state
     * @return {?}
     */
    function (state$$1) {
        switch (state$$1) {
            case ClrLoadingState.LOADING:
                this.loading = true;
                break;
            default:
                this.loading = false;
                this._animate.next();
                break;
        }
    };
    Expand.decorators = [
        { type: Injectable }
    ];
    return Expand;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * TODO: make this a reusable directive outside of Datagrid, like [clrLoading].
 */
var ClrIfExpanded = /** @class */ (function () {
    function ClrIfExpanded(template, container, el, renderer, expand) {
        var _this = this;
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
        function () {
            _this.updateView();
            _this.expandedChange.emit(_this.expand.expanded);
        })));
    }
    Object.defineProperty(ClrIfExpanded.prototype, "expanded", {
        get: /**
         * @return {?}
         */
        function () {
            return this._expanded;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (typeof value === 'boolean') {
                this.expand.expanded = value;
                this._expanded = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @return {?}
     */
    ClrIfExpanded.prototype.updateView = /**
     * @private
     * @return {?}
     */
    function () {
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
    };
    /**
     * @return {?}
     */
    ClrIfExpanded.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.updateView();
    };
    /**
     * @return {?}
     */
    ClrIfExpanded.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.expand.expandable--;
        this._subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        function (sub) { return sub.unsubscribe(); }));
    };
    ClrIfExpanded.decorators = [
        { type: Directive, args: [{ selector: '[clrIfExpanded]' },] }
    ];
    /** @nocollapse */
    ClrIfExpanded.ctorParameters = function () { return [
        { type: TemplateRef, decorators: [{ type: Optional }] },
        { type: ViewContainerRef },
        { type: ElementRef },
        { type: Renderer2 },
        { type: Expand }
    ]; };
    ClrIfExpanded.propDecorators = {
        expanded: [{ type: Input, args: ['clrIfExpanded',] }],
        expandedChange: [{ type: Output, args: ['clrIfExpandedChange',] }]
    };
    return ClrIfExpanded;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var EXPAND_DIRECTIVES = [ClrIfExpanded];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrIfExpandModule = /** @class */ (function () {
    function ClrIfExpandModule() {
    }
    ClrIfExpandModule.decorators = [
        { type: NgModule, args: [{ imports: [CommonModule], declarations: [EXPAND_DIRECTIVES], exports: [EXPAND_DIRECTIVES] },] }
    ];
    return ClrIfExpandModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var CLR_LOADING_DIRECTIVES = [ClrLoading];
var ClrLoadingModule = /** @class */ (function () {
    function ClrLoadingModule() {
    }
    ClrLoadingModule.decorators = [
        { type: NgModule, args: [{ imports: [CommonModule], declarations: [CLR_LOADING_DIRECTIVES], exports: [CLR_LOADING_DIRECTIVES] },] }
    ];
    return ClrLoadingModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var OutsideClick = /** @class */ (function () {
    function OutsideClick(el) {
        this.el = el;
        this.strict = false;
        this.outsideClick = new EventEmitter(false);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    OutsideClick.prototype.documentClick = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var target = event.target;
        // Get the element in the DOM on which the mouse was clicked
        /** @type {?} */
        var host = this.el.nativeElement;
        if (target === host) {
            return;
        }
        if (!this.strict && host.contains(target)) {
            return;
        }
        this.outsideClick.emit(event);
    };
    OutsideClick.decorators = [
        { type: Directive, args: [{ selector: '[clrOutsideClick]' },] }
    ];
    /** @nocollapse */
    OutsideClick.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    OutsideClick.propDecorators = {
        strict: [{ type: Input, args: ['clrStrict',] }],
        outsideClick: [{ type: Output, args: ['clrOutsideClick',] }],
        documentClick: [{ type: HostListener, args: ['document:click', ['$event'],] }]
    };
    return OutsideClick;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var OUSTIDE_CLICK_DIRECTIVES = [OutsideClick];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrOutsideClickModule = /** @class */ (function () {
    function ClrOutsideClickModule() {
    }
    ClrOutsideClickModule.decorators = [
        { type: NgModule, args: [{ imports: [CommonModule], declarations: [OUSTIDE_CLICK_DIRECTIVES], exports: [OUSTIDE_CLICK_DIRECTIVES] },] }
    ];
    return ClrOutsideClickModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DomAdapter = /** @class */ (function () {
    function DomAdapter() {
    }
    /**
     * @param {?} element
     * @return {?}
     */
    DomAdapter.prototype.userDefinedWidth = /**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        element.classList.add('datagrid-cell-width-zero');
        /** @type {?} */
        var userDefinedWidth = this.clientRect(element).width;
        element.classList.remove('datagrid-cell-width-zero');
        return userDefinedWidth;
    };
    /**
     * @param {?} element
     * @return {?}
     */
    DomAdapter.prototype.scrollBarWidth = /**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        return element.offsetWidth - element.clientWidth;
    };
    /**
     * @param {?} element
     * @return {?}
     */
    DomAdapter.prototype.scrollWidth = /**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        return element.scrollWidth || 0;
    };
    /**
     * @param {?} element
     * @return {?}
     */
    DomAdapter.prototype.computedHeight = /**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        return parseInt(getComputedStyle(element).getPropertyValue('height'), 10);
    };
    /**
     * @param {?} element
     * @return {?}
     */
    DomAdapter.prototype.clientRect = /**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        /** @type {?} */
        var elementClientRect = element.getBoundingClientRect();
        return {
            top: parseInt(elementClientRect.top, 10),
            bottom: parseInt(elementClientRect.bottom, 10),
            left: parseInt(elementClientRect.left, 10),
            right: parseInt(elementClientRect.right, 10),
            width: parseInt(elementClientRect.width, 10),
            height: parseInt(elementClientRect.height, 10),
        };
    };
    /**
     * @param {?} element
     * @return {?}
     */
    DomAdapter.prototype.minWidth = /**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        return parseInt(getComputedStyle(element).getPropertyValue('min-width'), 10);
    };
    /**
     * @param {?} element
     * @return {?}
     */
    DomAdapter.prototype.focus = /**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        element.focus();
    };
    DomAdapter.decorators = [
        { type: Injectable }
    ];
    return DomAdapter;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// This class is used to convert an internal event
// to an external event to be emitted.
/**
 * @template T
 */
var  
// This class is used to convert an internal event
// to an external event to be emitted.
/**
 * @template T
 */
ClrDragEvent = /** @class */ (function () {
    function ClrDragEvent(dragEvent) {
        this.dragPosition = dragEvent.dragPosition;
        this.group = dragEvent.group;
        this.dragDataTransfer = dragEvent.dragDataTransfer;
        this.dropPointPosition = dragEvent.dropPointPosition;
    }
    return ClrDragEvent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {number} */
var DragEventType = {
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
var DragAndDropEventBusService = /** @class */ (function () {
    function DragAndDropEventBusService() {
        this.dragStart = new Subject();
        this.dragMove = new Subject();
        this.dragEnd = new Subject();
        this.drop = new Subject();
    }
    Object.defineProperty(DragAndDropEventBusService.prototype, "dragStarted", {
        get: /**
         * @return {?}
         */
        function () {
            return this.dragStart.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DragAndDropEventBusService.prototype, "dragMoved", {
        get: /**
         * @return {?}
         */
        function () {
            return this.dragMove.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DragAndDropEventBusService.prototype, "dragEnded", {
        get: /**
         * @return {?}
         */
        function () {
            return this.dragEnd.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DragAndDropEventBusService.prototype, "dropped", {
        get: /**
         * @return {?}
         */
        function () {
            return this.drop.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} event
     * @return {?}
     */
    DragAndDropEventBusService.prototype.broadcast = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
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
    };
    DragAndDropEventBusService.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */ DragAndDropEventBusService.ngInjectableDef = defineInjectable({ factory: function DragAndDropEventBusService_Factory() { return new DragAndDropEventBusService(); }, token: DragAndDropEventBusService, providedIn: "root" });
    return DragAndDropEventBusService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
var DragEventListenerService = /** @class */ (function () {
    function DragEventListenerService(ngZone, renderer, eventBus) {
        this.ngZone = ngZone;
        this.renderer = renderer;
        this.eventBus = eventBus;
        this.dragStart = new Subject();
        this.dragMove = new Subject();
        this.dragEnd = new Subject();
        this.hasDragStarted = false;
    }
    Object.defineProperty(DragEventListenerService.prototype, "dragStarted", {
        get: /**
         * @return {?}
         */
        function () {
            return this.dragStart.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DragEventListenerService.prototype, "dragMoved", {
        get: /**
         * @return {?}
         */
        function () {
            return this.dragMove.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DragEventListenerService.prototype, "dragEnded", {
        get: /**
         * @return {?}
         */
        function () {
            return this.dragEnd.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} draggableEl
     * @return {?}
     */
    DragEventListenerService.prototype.attachDragListeners = /**
     * @param {?} draggableEl
     * @return {?}
     */
    function (draggableEl) {
        this.draggableEl = draggableEl;
        this.listeners = [
            this.customDragEvent(this.draggableEl, 'mousedown', 'mousemove', 'mouseup'),
            this.customDragEvent(this.draggableEl, 'touchstart', 'touchmove', 'touchend'),
        ];
    };
    /**
     * @return {?}
     */
    DragEventListenerService.prototype.detachDragListeners = /**
     * @return {?}
     */
    function () {
        if (this.listeners) {
            this.listeners.map((/**
             * @param {?} event
             * @return {?}
             */
            function (event) { return event(); }));
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
            function (event) { return event(); }));
        }
    };
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    DragEventListenerService.prototype.getNativeEventObject = /**
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (((/** @type {?} */ (event))).hasOwnProperty('changedTouches')) {
            return ((/** @type {?} */ (event))).changedTouches[0];
        }
        else {
            return event;
        }
    };
    /**
     * @private
     * @param {?} element
     * @param {?} startOnEvent
     * @param {?} moveOnEvent
     * @param {?} endOnEvent
     * @return {?}
     */
    DragEventListenerService.prototype.customDragEvent = /**
     * @private
     * @param {?} element
     * @param {?} startOnEvent
     * @param {?} moveOnEvent
     * @param {?} endOnEvent
     * @return {?}
     */
    function (element, startOnEvent, moveOnEvent, endOnEvent) {
        var _this = this;
        return this.renderer.listen(element, startOnEvent, (/**
         * @param {?} startEvent
         * @return {?}
         */
        function (startEvent) {
            // save the initial point to initialPosition
            // this will be used to calculate how far the draggable has been dragged from its initial position
            _this.initialPosition = {
                pageX: _this.getNativeEventObject(startEvent).pageX,
                pageY: _this.getNativeEventObject(startEvent).pageY,
            };
            // Initialize nested listeners' property with a new empty array;
            _this.nestedListeners = [];
            // This is needed to disable selection during dragging (especially in EDGE/IE11).
            _this.nestedListeners.push(_this.renderer.listen('document', 'selectstart', (/**
             * @param {?} selectEvent
             * @return {?}
             */
            function (selectEvent) {
                selectEvent.preventDefault();
                selectEvent.stopImmediatePropagation();
            })));
            // Listen to mousemove/touchmove events outside of angular zone.
            _this.nestedListeners.push(_this.ngZone.runOutsideAngular((/**
             * @return {?}
             */
            function () {
                return _this.renderer.listen('document', moveOnEvent, (/**
                 * @param {?} moveEvent
                 * @return {?}
                 */
                function (moveEvent) {
                    // Event.stopImmediatePropagation() is needed here to prevent nested draggables from getting dragged
                    // altogether. We shouldn't use Event.stopPropagation() here as we are listening to the events
                    // on the global element level.
                    // With Event.stopImmediatePropagation(), it registers the events sent from the inner most draggable
                    // first. Then immediately after that, it stops listening to the same type of events on the same
                    // element. So this will help us to not register the same events that would come from the parent
                    // level draggables eventually.
                    moveEvent.stopImmediatePropagation();
                    if (!_this.hasDragStarted) {
                        _this.hasDragStarted = true;
                        // Fire "dragstart"
                        _this.broadcast(moveEvent, DragEventType.DRAG_START);
                    }
                    else {
                        // Fire "dragmove"
                        _this.broadcast(moveEvent, DragEventType.DRAG_MOVE);
                    }
                }));
            })));
            // Listen to mouseup/touchend events.
            _this.nestedListeners.push(_this.renderer.listen('document', endOnEvent, (/**
             * @param {?} endEvent
             * @return {?}
             */
            function (endEvent) {
                if (_this.hasDragStarted) {
                    // Fire "dragend" only if dragstart is registered
                    _this.hasDragStarted = false;
                    _this.broadcast(endEvent, DragEventType.DRAG_END);
                }
                // We must remove the the nested listeners every time drag completes.
                if (_this.nestedListeners) {
                    _this.nestedListeners.map((/**
                     * @param {?} event
                     * @return {?}
                     */
                    function (event) { return event(); }));
                }
            })));
        }));
    };
    /**
     * @private
     * @param {?} event
     * @param {?} eventType
     * @return {?}
     */
    DragEventListenerService.prototype.broadcast = /**
     * @private
     * @param {?} event
     * @param {?} eventType
     * @return {?}
     */
    function (event, eventType) {
        /** @type {?} */
        var dragEvent = this.generateDragEvent(event, eventType);
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
    };
    /**
     * @private
     * @param {?} event
     * @param {?} eventType
     * @return {?}
     */
    DragEventListenerService.prototype.generateDragEvent = /**
     * @private
     * @param {?} event
     * @param {?} eventType
     * @return {?}
     */
    function (event, eventType) {
        /** @type {?} */
        var nativeEvent = this.getNativeEventObject(event);
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
    };
    DragEventListenerService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    DragEventListenerService.ctorParameters = function () { return [
        { type: NgZone },
        { type: Renderer2 },
        { type: DragAndDropEventBusService }
    ]; };
    return DragEventListenerService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// This service is used to capture the state of clrDraggable element
// at a certain event and passes it to clrDraggableGhost component.
/**
 * @template T
 */
var DraggableSnapshotService = /** @class */ (function () {
    function DraggableSnapshotService(domAdapter) {
        this.domAdapter = domAdapter;
    }
    /**
     * @param {?} el
     * @param {?} event
     * @return {?}
     */
    DraggableSnapshotService.prototype.capture = /**
     * @param {?} el
     * @param {?} event
     * @return {?}
     */
    function (el, event) {
        this.draggableElClientRect = this.domAdapter.clientRect(el);
        this.snapshotDragEvent = event;
    };
    /**
     * @return {?}
     */
    DraggableSnapshotService.prototype.discard = /**
     * @return {?}
     */
    function () {
        delete this.draggableElClientRect;
        delete this.snapshotDragEvent;
    };
    Object.defineProperty(DraggableSnapshotService.prototype, "hasDraggableState", {
        get: /**
         * @return {?}
         */
        function () {
            return !!this.snapshotDragEvent && !!this.draggableElClientRect;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DraggableSnapshotService.prototype, "clientRect", {
        get: /**
         * @return {?}
         */
        function () {
            return this.draggableElClientRect;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DraggableSnapshotService.prototype, "dragEvent", {
        get: /**
         * @return {?}
         */
        function () {
            return this.snapshotDragEvent;
        },
        enumerable: true,
        configurable: true
    });
    DraggableSnapshotService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    DraggableSnapshotService.ctorParameters = function () { return [
        { type: DomAdapter }
    ]; };
    return DraggableSnapshotService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
var ClrDraggableGhost = /** @class */ (function () {
    function ClrDraggableGhost(el, dragEventListener, draggableSnapshot, renderer, ngZone) {
        var _this = this;
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
        var offset = {
            top: this.draggableSnapshot.hasDraggableState
                ? this.draggableSnapshot.dragEvent.dragPosition.pageY - this.draggableSnapshot.clientRect.top
                : 0,
            left: this.draggableSnapshot.hasDraggableState
                ? this.draggableSnapshot.dragEvent.dragPosition.pageX - this.draggableSnapshot.clientRect.left
                : 0,
        };
        /** @type {?} */
        var isAnimationConfigured = false;
        this.subscriptions.push(this.dragEventListener.dragMoved.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            // On the first drag move event, we configure the animation as it's dependent on the first drag event.
            if (!isAnimationConfigured) {
                if (_this.draggableSnapshot.hasDraggableState) {
                    _this.animateToOnLeave(_this.draggableSnapshot.clientRect.top + "px", _this.draggableSnapshot.clientRect.left + "px");
                }
                else {
                    _this.animateToOnLeave(event.dragPosition.pageY + "px", event.dragPosition.pageX + "px");
                }
                isAnimationConfigured = true;
            }
            // Position the draggable ghost.
            /** @type {?} */
            var topLeftPosition = _this.findTopLeftPosition(event.dragPosition, offset);
            _this.setPositionStyle(_this.draggableGhostEl, topLeftPosition.pageX, topLeftPosition.pageY);
            _this.dragEventListener.dropPointPosition = _this.findDropPointPosition(topLeftPosition);
        })));
    }
    /**
     * @private
     * @param {?} el
     * @return {?}
     */
    ClrDraggableGhost.prototype.setDefaultGhostSize = /**
     * @private
     * @param {?} el
     * @return {?}
     */
    function (el) {
        if (this.draggableSnapshot.hasDraggableState) {
            this.setSizeStyle(el, this.draggableSnapshot.clientRect.width, this.draggableSnapshot.clientRect.height);
        }
    };
    /**
     * @private
     * @param {?} top
     * @param {?} left
     * @return {?}
     */
    ClrDraggableGhost.prototype.animateToOnLeave = /**
     * @private
     * @param {?} top
     * @param {?} left
     * @return {?}
     */
    function (top, left) {
        var _this = this;
        this.ngZone.run((/**
         * @return {?}
         */
        function () {
            _this.leaveAnimConfig = { value: 0, params: { top: top, left: left } };
        }));
    };
    /**
     * @private
     * @param {?} dragPosition
     * @param {?} offset
     * @return {?}
     */
    ClrDraggableGhost.prototype.findTopLeftPosition = /**
     * @private
     * @param {?} dragPosition
     * @param {?} offset
     * @return {?}
     */
    function (dragPosition, offset) {
        return { pageX: dragPosition.pageX - offset.left, pageY: dragPosition.pageY - offset.top };
    };
    /**
     * @private
     * @param {?} topLeftPosition
     * @return {?}
     */
    ClrDraggableGhost.prototype.findDropPointPosition = /**
     * @private
     * @param {?} topLeftPosition
     * @return {?}
     */
    function (topLeftPosition) {
        if (this.draggableSnapshot.hasDraggableState) {
            return {
                pageX: topLeftPosition.pageX + this.draggableSnapshot.clientRect.width / 2,
                pageY: topLeftPosition.pageY + this.draggableSnapshot.clientRect.height / 2,
            };
        }
        else {
            return topLeftPosition;
        }
    };
    /**
     * @private
     * @param {?} el
     * @param {?} width
     * @param {?} height
     * @return {?}
     */
    ClrDraggableGhost.prototype.setSizeStyle = /**
     * @private
     * @param {?} el
     * @param {?} width
     * @param {?} height
     * @return {?}
     */
    function (el, width, height) {
        this.renderer.setStyle(el, 'width', width + "px");
        this.renderer.setStyle(el, 'height', height + "px");
    };
    /**
     * @private
     * @param {?} el
     * @param {?} left
     * @param {?} top
     * @return {?}
     */
    ClrDraggableGhost.prototype.setPositionStyle = /**
     * @private
     * @param {?} el
     * @param {?} left
     * @param {?} top
     * @return {?}
     */
    function (el, left, top) {
        this.renderer.setStyle(el, 'left', left + "px");
        this.renderer.setStyle(el, 'top', top + "px");
        this.renderer.setStyle(el, 'visibility', 'visible');
    };
    /**
     * @return {?}
     */
    ClrDraggableGhost.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        function (sub) { return sub.unsubscribe(); }));
    };
    ClrDraggableGhost.decorators = [
        { type: Component, args: [{
                    selector: 'clr-draggable-ghost',
                    template: "<ng-content></ng-content>",
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
    ClrDraggableGhost.ctorParameters = function () { return [
        { type: ElementRef },
        { type: DragEventListenerService, decorators: [{ type: Optional }] },
        { type: DraggableSnapshotService, decorators: [{ type: Optional }] },
        { type: Renderer2 },
        { type: NgZone }
    ]; };
    ClrDraggableGhost.propDecorators = {
        leaveAnimConfig: [{ type: HostBinding, args: ['@leaveAnimation',] }]
    };
    return ClrDraggableGhost;
}());

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
var ClrIfDragged = /** @class */ (function () {
    function ClrIfDragged(template, container, dragEventListener) {
        var _this = this;
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
        function (event) {
            _this.container.createEmbeddedView(_this.template);
        })));
        this.subscriptions.push(this.dragEventListener.dragEnded.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            _this.container.clear();
        })));
    }
    /**
     * @return {?}
     */
    ClrIfDragged.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        function (sub) { return sub.unsubscribe(); }));
    };
    ClrIfDragged.decorators = [
        { type: Directive, args: [{ selector: '[clrIfDragged]' },] }
    ];
    /** @nocollapse */
    ClrIfDragged.ctorParameters = function () { return [
        { type: TemplateRef },
        { type: ViewContainerRef, decorators: [{ type: Optional }, { type: SkipSelf }] },
        { type: DragEventListenerService, decorators: [{ type: Optional }] }
    ]; };
    return ClrIfDragged;
}());

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
var DragHandleRegistrarService = /** @class */ (function () {
    function DragHandleRegistrarService(dragEventListener, renderer) {
        this.dragEventListener = dragEventListener;
        this.renderer = renderer;
    }
    Object.defineProperty(DragHandleRegistrarService.prototype, "defaultHandleEl", {
        get: /**
         * @return {?}
         */
        function () {
            return this._defaultHandleEl;
        },
        set: /**
         * @param {?} el
         * @return {?}
         */
        function (el) {
            this._defaultHandleEl = el; // defaultHandleEl will be usually the clrDraggable element.
            // If the customHandleEl has been registered,
            // don't make the defaultHandleEl the drag handle yet until the customHandleEl is unregistered.
            if (!this._customHandleEl) {
                this.makeElementHandle(this._defaultHandleEl);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @param {?} el
     * @return {?}
     */
    DragHandleRegistrarService.prototype.makeElementHandle = /**
     * @private
     * @param {?} el
     * @return {?}
     */
    function (el) {
        if (this._defaultHandleEl && this._defaultHandleEl !== el) {
            // Before making an element the custom handle element,
            // we should remove the existing drag-handle class from the draggable element.
            this.renderer.removeClass(this._defaultHandleEl, 'drag-handle');
        }
        this.dragEventListener.attachDragListeners(el);
        this.renderer.addClass(el, 'drag-handle');
    };
    Object.defineProperty(DragHandleRegistrarService.prototype, "customHandleEl", {
        get: /**
         * @return {?}
         */
        function () {
            return this._customHandleEl;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} el
     * @return {?}
     */
    DragHandleRegistrarService.prototype.registerCustomHandle = /**
     * @param {?} el
     * @return {?}
     */
    function (el) {
        this.dragEventListener.detachDragListeners(); // removes the existing listeners
        this._customHandleEl = el;
        this.makeElementHandle(this._customHandleEl);
    };
    /**
     * @return {?}
     */
    DragHandleRegistrarService.prototype.unregisterCustomHandle = /**
     * @return {?}
     */
    function () {
        this.dragEventListener.detachDragListeners(); // removes the existing listeners
        this.renderer.removeClass(this._customHandleEl, 'drag-handle');
        delete this._customHandleEl;
        // if default handle is set, make that handle
        if (this._defaultHandleEl) {
            this.makeElementHandle(this._defaultHandleEl);
        }
    };
    DragHandleRegistrarService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    DragHandleRegistrarService.ctorParameters = function () { return [
        { type: DragEventListenerService },
        { type: Renderer2 }
    ]; };
    return DragHandleRegistrarService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// This service class adds and removes the "in-drag" class to the document body element
// through its public enter() and exit() methods.
var GlobalDragModeService = /** @class */ (function () {
    function GlobalDragModeService(renderer) {
        this.renderer = renderer;
    }
    /**
     * @return {?}
     */
    GlobalDragModeService.prototype.enter = /**
     * @return {?}
     */
    function () {
        this.renderer.addClass(document.body, 'in-drag');
    };
    /**
     * @return {?}
     */
    GlobalDragModeService.prototype.exit = /**
     * @return {?}
     */
    function () {
        this.renderer.removeClass(document.body, 'in-drag');
    };
    GlobalDragModeService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    GlobalDragModeService.ctorParameters = function () { return [
        { type: Renderer2 }
    ]; };
    return GlobalDragModeService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
var ClrDraggable = /** @class */ (function () {
    function ClrDraggable(el, dragEventListener, dragHandleRegistrar, viewContainerRef, cfr, injector, draggableSnapshot, globalDragMode) {
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
    Object.defineProperty(ClrDraggable.prototype, "dataTransfer", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.dragEventListener.dragDataTransfer = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDraggable.prototype, "group", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.dragEventListener.group = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    ClrDraggable.prototype.createDefaultGhost = /**
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.draggableSnapshot.capture(this.draggableEl, event);
        // NOTE: The default ghost element will appear
        // next to the clrDraggable in the DOM as a sibling element.
        this.viewContainerRef.createComponent(this.componentFactory, 0, this.injector, [
            [this.draggableEl.cloneNode(true)],
        ]);
    };
    /**
     * @private
     * @return {?}
     */
    ClrDraggable.prototype.destroyDefaultGhost = /**
     * @private
     * @return {?}
     */
    function () {
        this.viewContainerRef.clear();
        this.draggableSnapshot.discard();
    };
    /**
     * @return {?}
     */
    ClrDraggable.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.dragHandleRegistrar.defaultHandleEl = this.draggableEl;
        this.subscriptions.push(this.dragEventListener.dragStarted.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            _this.globalDragMode.enter();
            _this.dragOn = true;
            if (!_this.customGhost) {
                _this.createDefaultGhost(event);
            }
            _this.dragStartEmitter.emit(new ClrDragEvent(event));
        })));
        this.subscriptions.push(this.dragEventListener.dragMoved.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            _this.dragMoveEmitter.emit(new ClrDragEvent(event));
        })));
        this.subscriptions.push(this.dragEventListener.dragEnded.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            _this.globalDragMode.exit();
            _this.dragOn = false;
            if (!_this.customGhost) {
                _this.destroyDefaultGhost();
            }
            _this.dragEndEmitter.emit(new ClrDragEvent(event));
        })));
    };
    /**
     * @return {?}
     */
    ClrDraggable.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        function (sub) { return sub.unsubscribe(); }));
        this.dragEventListener.detachDragListeners();
    };
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
    ClrDraggable.ctorParameters = function () { return [
        { type: ElementRef },
        { type: DragEventListenerService },
        { type: DragHandleRegistrarService },
        { type: ViewContainerRef },
        { type: ComponentFactoryResolver },
        { type: Injector },
        { type: DraggableSnapshotService },
        { type: GlobalDragModeService }
    ]; };
    ClrDraggable.propDecorators = {
        customGhost: [{ type: ContentChild, args: [ClrIfDragged,] }],
        dataTransfer: [{ type: Input, args: ['clrDraggable',] }],
        group: [{ type: Input, args: ['clrGroup',] }],
        dragStartEmitter: [{ type: Output, args: ['clrDragStart',] }],
        dragMoveEmitter: [{ type: Output, args: ['clrDragMove',] }],
        dragEndEmitter: [{ type: Output, args: ['clrDragEnd',] }]
    };
    return ClrDraggable;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
var ClrDroppable = /** @class */ (function () {
    function ClrDroppable(el, eventBus, domAdapter, renderer) {
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
    Object.defineProperty(ClrDroppable.prototype, "isDraggableOver", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            // We need to add/remove this draggable-over class via Renderer2
            // because isDraggableOver is set outside of NgZone.
            if (value) {
                this.renderer.addClass(this.droppableEl, 'draggable-over');
            }
            else {
                this.renderer.removeClass(this.droppableEl, 'draggable-over');
            }
            this._isDraggableOver = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDroppable.prototype, "group", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._group = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @param {?=} top
     * @param {?=} right
     * @param {?=} bottom
     * @param {?=} left
     * @return {?}
     */
    ClrDroppable.prototype.dropToleranceGenerator = /**
     * @private
     * @param {?=} top
     * @param {?=} right
     * @param {?=} bottom
     * @param {?=} left
     * @return {?}
     */
    function (top, right, bottom, left) {
        if (top === void 0) { top = 0; }
        if (right === void 0) { right = top; }
        if (bottom === void 0) { bottom = top; }
        if (left === void 0) { left = right; }
        return { top: top, right: right, bottom: bottom, left: left };
    };
    Object.defineProperty(ClrDroppable.prototype, "dropTolerance", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            // If user provides an object here and wants to manipulate/update properties individually,
            // the object must be immutable as we generate new object based user's given object.
            if (typeof value === 'number') {
                this._dropTolerance = this.dropToleranceGenerator(value);
            }
            else if (typeof value === 'string') {
                /** @type {?} */
                var toleranceValues = value
                    .trim()
                    .split(/\s+/)
                    .map((/**
                 * @param {?} tolerance
                 * @return {?}
                 */
                function (tolerance) { return parseInt(tolerance, 10); }));
                this._dropTolerance = this.dropToleranceGenerator.apply(this, __spread(toleranceValues));
            }
            else if (value) {
                // The value could be passed in as {left: 20, top: 30 }
                // In this case, the rest of the direction properties should be 0.
                // That's why we initialize properties with 0 first, then override with user's given value.
                this._dropTolerance = __assign({}, this.dropToleranceGenerator(0), value);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @param {?} subscription
     * @return {?}
     */
    ClrDroppable.prototype.unsubscribeFrom = /**
     * @private
     * @param {?} subscription
     * @return {?}
     */
    function (subscription) {
        if (subscription) {
            subscription.unsubscribe();
        }
    };
    /**
     * @private
     * @param {?} draggableGroup
     * @return {?}
     */
    ClrDroppable.prototype.checkGroupMatch = /**
     * @private
     * @param {?} draggableGroup
     * @return {?}
     */
    function (draggableGroup) {
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
                function (groupKey) { return draggableGroup.indexOf(groupKey) > -1; }));
            }
        }
    };
    /**
     * @private
     * @param {?} point
     * @return {?}
     */
    ClrDroppable.prototype.isInDropArea = /**
     * @private
     * @param {?} point
     * @return {?}
     */
    function (point) {
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
    };
    /**
     * @private
     * @param {?} dragStartEvent
     * @return {?}
     */
    ClrDroppable.prototype.onDragStart = /**
     * @private
     * @param {?} dragStartEvent
     * @return {?}
     */
    function (dragStartEvent) {
        var _this = this;
        // Check draggable and droppable have a matching group key.
        this.isDraggableMatch = this.checkGroupMatch(dragStartEvent.group);
        // Subscribe to dragMoved and dragEnded only if draggable and droppable have a matching group key.
        if (this.isDraggableMatch) {
            this.dragStartEmitter.emit(new ClrDragEvent(dragStartEvent));
            this.dragMoveSubscription = this.eventBus.dragMoved.subscribe((/**
             * @param {?} dragMoveEvent
             * @return {?}
             */
            function (dragMoveEvent) {
                _this.onDragMove(dragMoveEvent);
            }));
            this.dragEndSubscription = this.eventBus.dragEnded.subscribe((/**
             * @param {?} dragEndEvent
             * @return {?}
             */
            function (dragEndEvent) {
                _this.onDragEnd(dragEndEvent);
            }));
        }
    };
    /**
     * @private
     * @param {?} dragMoveEvent
     * @return {?}
     */
    ClrDroppable.prototype.onDragMove = /**
     * @private
     * @param {?} dragMoveEvent
     * @return {?}
     */
    function (dragMoveEvent) {
        /** @type {?} */
        var isInDropArea = this.isInDropArea(dragMoveEvent.dropPointPosition);
        if (!this._isDraggableOver && isInDropArea) {
            this.isDraggableOver = true;
            /** @type {?} */
            var dragEnterEvent = __assign({}, dragMoveEvent, { type: DragEventType.DRAG_ENTER });
            this.eventBus.broadcast(dragEnterEvent);
            this.dragEnterEmitter.emit(new ClrDragEvent(dragEnterEvent));
        }
        else if (this._isDraggableOver && !isInDropArea) {
            this.isDraggableOver = false;
            /** @type {?} */
            var dragLeaveEvent = __assign({}, dragMoveEvent, { type: DragEventType.DRAG_LEAVE });
            this.eventBus.broadcast(dragLeaveEvent);
            this.dragLeaveEmitter.emit(new ClrDragEvent(dragLeaveEvent));
        }
        this.dragMoveEmitter.emit(new ClrDragEvent(dragMoveEvent));
    };
    /**
     * @private
     * @param {?} dragEndEvent
     * @return {?}
     */
    ClrDroppable.prototype.onDragEnd = /**
     * @private
     * @param {?} dragEndEvent
     * @return {?}
     */
    function (dragEndEvent) {
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
            var dropEvent = __assign({}, dragEndEvent, { type: DragEventType.DROP });
            this.eventBus.broadcast(dropEvent);
            this.dropEmitter.emit(new ClrDragEvent(dropEvent));
            this.isDraggableOver = false;
        }
        this.dragEndEmitter.emit(new ClrDragEvent(dragEndEvent));
        this.unsubscribeFrom(this.dragMoveSubscription);
        this.unsubscribeFrom(this.dragEndSubscription);
        this.isDraggableMatch = false;
        delete this.clientRect;
    };
    /**
     * @return {?}
     */
    ClrDroppable.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.dragStartSubscription = this.eventBus.dragStarted.subscribe((/**
         * @param {?} dragStartEvent
         * @return {?}
         */
        function (dragStartEvent) {
            _this.onDragStart(dragStartEvent);
        }));
    };
    /**
     * @return {?}
     */
    ClrDroppable.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.unsubscribeFrom(this.dragStartSubscription);
        this.unsubscribeFrom(this.dragMoveSubscription);
        this.unsubscribeFrom(this.dragEndSubscription);
    };
    ClrDroppable.decorators = [
        { type: Directive, args: [{
                    selector: '[clrDroppable]',
                    providers: [DomAdapter],
                    host: { '[class.droppable]': 'true', '[class.draggable-match]': 'isDraggableMatch' },
                },] }
    ];
    /** @nocollapse */
    ClrDroppable.ctorParameters = function () { return [
        { type: ElementRef },
        { type: DragAndDropEventBusService },
        { type: DomAdapter },
        { type: Renderer2 }
    ]; };
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
    return ClrDroppable;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
var ClrDragHandle = /** @class */ (function () {
    function ClrDragHandle(el, dragHandleRegistrar) {
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
    ClrDragHandle.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.dragHandleRegistrar.unregisterCustomHandle();
    };
    ClrDragHandle.decorators = [
        { type: Directive, args: [{ selector: '[clrDragHandle]', host: { '[class.drag-handle]': 'true' } },] }
    ];
    /** @nocollapse */
    ClrDragHandle.ctorParameters = function () { return [
        { type: ElementRef },
        { type: DragHandleRegistrarService, decorators: [{ type: Optional }] }
    ]; };
    return ClrDragHandle;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var CLR_DRAG_AND_DROP_DIRECTIVES = [
    ClrDraggable,
    ClrDroppable,
    ClrIfDragged,
    ClrDragHandle,
    ClrDraggableGhost,
];
var ClrDragAndDropModule = /** @class */ (function () {
    function ClrDragAndDropModule() {
    }
    ClrDragAndDropModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    declarations: [CLR_DRAG_AND_DROP_DIRECTIVES],
                    entryComponents: [ClrDraggableGhost],
                    exports: [CLR_DRAG_AND_DROP_DIRECTIVES],
                },] }
    ];
    return ClrDragAndDropModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DatagridRowExpandAnimation = /** @class */ (function () {
    function DatagridRowExpandAnimation(el, domAdapter, renderer, expand) {
        var _this = this;
        this.el = el;
        this.domAdapter = domAdapter;
        this.renderer = renderer;
        this.expand = expand;
        if (expand && expand.animate) {
            expand.animate.subscribe((/**
             * @return {?}
             */
            function () {
                // We already had an animation waiting, so we just have to run in, not prepare again
                if (_this.oldHeight) {
                    setTimeout((/**
                     * @return {?}
                     */
                    function () { return _this.run(); }));
                }
                else {
                    _this.animate();
                }
            }));
        }
    }
    /*
       * Dirty manual animation handling, but we have no way to use dynamic heights in Angular's current API.
       * They're working on it, but have no ETA.
       */
    /*
         * Dirty manual animation handling, but we have no way to use dynamic heights in Angular's current API.
         * They're working on it, but have no ETA.
         */
    /**
     * @private
     * @return {?}
     */
    DatagridRowExpandAnimation.prototype.animate = /*
         * Dirty manual animation handling, but we have no way to use dynamic heights in Angular's current API.
         * They're working on it, but have no ETA.
         */
    /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
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
        function () {
            if (_this.expand.loading) {
                return;
            }
            _this.run();
        }));
    };
    /**
     * @private
     * @return {?}
     */
    DatagridRowExpandAnimation.prototype.run = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.renderer.setStyle(this.el.nativeElement, 'height', null);
        /** @type {?} */
        var newHeight = this.domAdapter.computedHeight(this.el.nativeElement);
        this.running = this.el.nativeElement.animate({ height: [this.oldHeight + 'px', newHeight + 'px'], easing: 'ease-in-out' }, { duration: 200 });
        this.running.onfinish = (/**
         * @return {?}
         */
        function () {
            _this.renderer.setStyle(_this.el.nativeElement, 'overflow-y', null);
            delete _this.running;
        });
        delete this.oldHeight;
    };
    DatagridRowExpandAnimation.decorators = [
        { type: Directive, args: [{ selector: 'clr-dg-row' },] }
    ];
    /** @nocollapse */
    DatagridRowExpandAnimation.ctorParameters = function () { return [
        { type: ElementRef },
        { type: DomAdapter },
        { type: Renderer2 },
        { type: Expand }
    ]; };
    return DatagridRowExpandAnimation;
}());

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
var  /*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * @abstract
 */
CustomFilter = /** @class */ (function () {
    function CustomFilter() {
    }
    return CustomFilter;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * This provider implements some form of synchronous debouncing through a lock pattern
 * to avoid emitting multiple state changes for a single user action.
 */
var StateDebouncer = /** @class */ (function () {
    function StateDebouncer() {
        /**
         * The Observable that lets other classes subscribe to global state changes
         */
        this._change = new Subject();
        /*
             * This is the lock, to only emit once all the changes have finished processing
             */
        this.nbChanges = 0;
    }
    Object.defineProperty(StateDebouncer.prototype, "change", {
        // We do not want to expose the Subject itself, but the Observable which is read-only
        get: 
        // We do not want to expose the Subject itself, but the Observable which is read-only
        /**
         * @return {?}
         */
        function () {
            return this._change.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    StateDebouncer.prototype.changeStart = /**
     * @return {?}
     */
    function () {
        this.nbChanges++;
    };
    /**
     * @return {?}
     */
    StateDebouncer.prototype.changeDone = /**
     * @return {?}
     */
    function () {
        if (--this.nbChanges === 0) {
            this._change.next();
        }
    };
    StateDebouncer.decorators = [
        { type: Injectable }
    ];
    return StateDebouncer;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Page = /** @class */ (function () {
    function Page(stateDebouncer) {
        this.stateDebouncer = stateDebouncer;
        this.activated = false;
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
    Object.defineProperty(Page.prototype, "size", {
        get: /**
         * @return {?}
         */
        function () {
            return this._size;
        },
        set: /**
         * @param {?} size
         * @return {?}
         */
        function (size) {
            /** @type {?} */
            var oldSize = this._size;
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Page.prototype, "totalItems", {
        get: /**
         * @return {?}
         */
        function () {
            return this._totalItems;
        },
        set: /**
         * @param {?} total
         * @return {?}
         */
        function (total) {
            this._totalItems = total;
            // If we have less items than before, we might need to change the current page
            if (this.current > this.last) {
                this.current = this.last;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Page.prototype, "last", {
        get: /**
         * @return {?}
         */
        function () {
            if (this._last) {
                return this._last;
            }
            // If the last page isn't known, we compute it from the last item's index
            if (this.size > 0 && this.totalItems) {
                return Math.ceil(this.totalItems / this.size);
            }
            return 1;
        },
        set: /**
         * @param {?} page
         * @return {?}
         */
        function (page) {
            this._last = page;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Page.prototype, "change", {
        // We do not want to expose the Subject itself, but the Observable which is read-only
        get: 
        // We do not want to expose the Subject itself, but the Observable which is read-only
        /**
         * @return {?}
         */
        function () {
            return this._change.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Page.prototype, "sizeChange", {
        get: /**
         * @return {?}
         */
        function () {
            return this._sizeChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Page.prototype, "current", {
        get: /**
         * @return {?}
         */
        function () {
            return this._current;
        },
        set: /**
         * @param {?} page
         * @return {?}
         */
        function (page) {
            if (page !== this._current) {
                this.stateDebouncer.changeStart();
                this._current = page;
                this._change.next(page);
                this.stateDebouncer.changeDone();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Moves to the previous page if it exists
     */
    /**
     * Moves to the previous page if it exists
     * @return {?}
     */
    Page.prototype.previous = /**
     * Moves to the previous page if it exists
     * @return {?}
     */
    function () {
        if (this.current > 1) {
            this.current--;
        }
    };
    /**
     * Moves to the next page if it exists
     */
    /**
     * Moves to the next page if it exists
     * @return {?}
     */
    Page.prototype.next = /**
     * Moves to the next page if it exists
     * @return {?}
     */
    function () {
        if (this.current < this.last) {
            this.current++;
        }
    };
    Object.defineProperty(Page.prototype, "firstItem", {
        /**
         * Index of the first item displayed on the current page, starting at 0
         */
        get: /**
         * Index of the first item displayed on the current page, starting at 0
         * @return {?}
         */
        function () {
            if (this.size === 0) {
                return 0;
            }
            return (this.current - 1) * this.size;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Page.prototype, "lastItem", {
        /**
         * Index of the last item displayed on the current page, starting at 0
         */
        get: /**
         * Index of the last item displayed on the current page, starting at 0
         * @return {?}
         */
        function () {
            if (this.size === 0) {
                return this.totalItems - 1;
            }
            /** @type {?} */
            var lastInPage = this.current * this.size - 1;
            if (this.totalItems) {
                lastInPage = Math.min(lastInPage, this.totalItems - 1);
            }
            return lastInPage;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Resets the page size to 0
     */
    /**
     * Resets the page size to 0
     * @return {?}
     */
    Page.prototype.resetPageSize = /**
     * Resets the page size to 0
     * @return {?}
     */
    function () {
        this.size = 0;
    };
    Page.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Page.ctorParameters = function () { return [
        { type: StateDebouncer }
    ]; };
    return Page;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
var FiltersProvider = /** @class */ (function () {
    function FiltersProvider(_page, stateDebouncer) {
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
    Object.defineProperty(FiltersProvider.prototype, "change", {
        // We do not want to expose the Subject itself, but the Observable which is read-only
        get: 
        // We do not want to expose the Subject itself, but the Observable which is read-only
        /**
         * @return {?}
         */
        function () {
            return this._change.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Tests if at least one filter is currently active
     */
    /**
     * Tests if at least one filter is currently active
     * @return {?}
     */
    FiltersProvider.prototype.hasActiveFilters = /**
     * Tests if at least one filter is currently active
     * @return {?}
     */
    function () {
        var e_1, _a;
        try {
            // We do not use getActiveFilters() because this function will be called much more often
            // and stopping the loop early might be relevant.
            for (var _b = __values(this._all), _c = _b.next(); !_c.done; _c = _b.next()) {
                var filter$$1 = _c.value.filter;
                if (filter$$1 && filter$$1.isActive()) {
                    return true;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return false;
    };
    /**
     * Returns a list of all currently active filters
     */
    /**
     * Returns a list of all currently active filters
     * @return {?}
     */
    FiltersProvider.prototype.getActiveFilters = /**
     * Returns a list of all currently active filters
     * @return {?}
     */
    function () {
        var e_2, _a;
        /** @type {?} */
        var ret = [];
        try {
            for (var _b = __values(this._all), _c = _b.next(); !_c.done; _c = _b.next()) {
                var filter$$1 = _c.value.filter;
                if (filter$$1 && filter$$1.isActive()) {
                    ret.push(filter$$1);
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return ret;
    };
    /**
     * Registers a filter, and returns a deregistration function
     */
    /**
     * Registers a filter, and returns a deregistration function
     * @template F
     * @param {?} filter
     * @return {?}
     */
    FiltersProvider.prototype.add = /**
     * Registers a filter, and returns a deregistration function
     * @template F
     * @param {?} filter
     * @return {?}
     */
    function (filter$$1) {
        var _this = this;
        /** @type {?} */
        var index = this._all.length;
        /** @type {?} */
        var subscription = filter$$1.changes.subscribe((/**
         * @return {?}
         */
        function () { return _this.resetPageAndEmitFilterChange([filter$$1]); }));
        /** @type {?} */
        var hasUnregistered = false;
        /** @type {?} */
        var registered = new RegisteredFilter(filter$$1, (/**
         * @return {?}
         */
        function () {
            if (hasUnregistered) {
                return;
            }
            subscription.unsubscribe();
            _this._all.splice(index, 1);
            if (filter$$1.isActive()) {
                _this.resetPageAndEmitFilterChange([]);
            }
            hasUnregistered = true;
        }));
        this._all.push(registered);
        if (filter$$1.isActive()) {
            this.resetPageAndEmitFilterChange([filter$$1]);
        }
        return registered;
    };
    /**
     * Accepts an item if it is accepted by all currently active filters
     */
    /**
     * Accepts an item if it is accepted by all currently active filters
     * @param {?} item
     * @return {?}
     */
    FiltersProvider.prototype.accepts = /**
     * Accepts an item if it is accepted by all currently active filters
     * @param {?} item
     * @return {?}
     */
    function (item) {
        var e_3, _a;
        try {
            for (var _b = __values(this._all), _c = _b.next(); !_c.done; _c = _b.next()) {
                var filter$$1 = _c.value.filter;
                if (filter$$1 && filter$$1.isActive() && !filter$$1.accepts(item)) {
                    return false;
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return true;
    };
    /**
     * @private
     * @param {?} filters
     * @return {?}
     */
    FiltersProvider.prototype.resetPageAndEmitFilterChange = /**
     * @private
     * @param {?} filters
     * @return {?}
     */
    function (filters) {
        this.stateDebouncer.changeStart();
        // filtering may change the page number such that current page number doesn't exist in the filtered dataset.
        // So here we always set the current page to 1 so that it'll fetch first page's data with the given filter.
        this._page.current = 1;
        this._change.next(filters);
        this.stateDebouncer.changeDone();
    };
    FiltersProvider.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    FiltersProvider.ctorParameters = function () { return [
        { type: Page },
        { type: StateDebouncer }
    ]; };
    return FiltersProvider;
}());
/**
 * @template T, F
 */
var /**
 * @template T, F
 */
RegisteredFilter = /** @class */ (function () {
    function RegisteredFilter(filter$$1, unregister) {
        this.filter = filter$$1;
        this.unregister = unregister;
    }
    return RegisteredFilter;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 * @template T, F
 */
var  /**
 * @abstract
 * @template T, F
 */
DatagridFilterRegistrar = /** @class */ (function () {
    function DatagridFilterRegistrar(filters) {
        this.filters = filters;
    }
    Object.defineProperty(DatagridFilterRegistrar.prototype, "filter", {
        get: /**
         * @return {?}
         */
        function () {
            return this.registered && this.registered.filter;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} filter
     * @return {?}
     */
    DatagridFilterRegistrar.prototype.setFilter = /**
     * @param {?} filter
     * @return {?}
     */
    function (filter$$1) {
        // If we previously had another filter, we unregister it
        this.deleteFilter();
        if (filter$$1 instanceof RegisteredFilter) {
            this.registered = filter$$1;
        }
        else if (filter$$1) {
            this.registered = this.filters.add(filter$$1);
        }
    };
    /**
     * @return {?}
     */
    DatagridFilterRegistrar.prototype.deleteFilter = /**
     * @return {?}
     */
    function () {
        if (this.registered) {
            this.registered.unregister();
            delete this.registered;
        }
    };
    /**
     * @return {?}
     */
    DatagridFilterRegistrar.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.deleteFilter();
    };
    return DatagridFilterRegistrar;
}());

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
var ClrDatagridFilter = /** @class */ (function (_super) {
    __extends(ClrDatagridFilter, _super);
    function ClrDatagridFilter(_filters, commonStrings) {
        var _this = _super.call(this, _filters) || this;
        _this.commonStrings = commonStrings;
        _this.anchorPoint = Point.RIGHT_BOTTOM;
        _this.popoverPoint = Point.RIGHT_TOP;
        _this.popoverOptions = { allowMultipleOpen: true };
        /**
         * Tracks whether the filter dropdown is open or not
         */
        _this._open = false;
        _this.openChanged = new EventEmitter(false);
        return _this;
    }
    Object.defineProperty(ClrDatagridFilter.prototype, "open", {
        get: /**
         * @return {?}
         */
        function () {
            return this._open;
        },
        set: /**
         * @param {?} open
         * @return {?}
         */
        function (open) {
            /** @type {?} */
            var boolOpen = !!open;
            if (boolOpen !== this._open) {
                this._open = boolOpen;
                this.openChanged.emit(boolOpen);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridFilter.prototype, "customFilter", {
        set: /**
         * @param {?} filter
         * @return {?}
         */
        function (filter$$1) {
            this.setFilter(filter$$1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridFilter.prototype, "active", {
        /**
         * Indicates if the filter is currently active
         */
        get: /**
         * Indicates if the filter is currently active
         * @return {?}
         */
        function () {
            return !!this.filter && this.filter.isActive();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Shows/hides the filter dropdown
     */
    /**
     * Shows/hides the filter dropdown
     * @return {?}
     */
    ClrDatagridFilter.prototype.toggle = /**
     * Shows/hides the filter dropdown
     * @return {?}
     */
    function () {
        this.open = !this.open;
    };
    ClrDatagridFilter.decorators = [
        { type: Component, args: [{
                    selector: 'clr-dg-filter',
                    // We register this component as a CustomFilter, for the parent column to detect it.
                    providers: [{ provide: CustomFilter, useExisting: ClrDatagridFilter }],
                    template: "\n        <button #anchor class=\"datagrid-filter-toggle\" (click)=\"toggle()\"\n            [class.datagrid-filter-open]=\"open\" [class.datagrid-filtered]=\"active\"\n            type=\"button\"></button>\n\n        <ng-template [(clrPopoverOld)]=\"open\" [clrPopoverOldAnchor]=\"anchor\" [clrPopoverOldAnchorPoint]=\"anchorPoint\"\n             [clrPopoverOldPopoverPoint]=\"popoverPoint\" [clrPopoverOldOptions]=\"popoverOptions\">\n            <div class=\"datagrid-filter\">\n                <!-- FIXME: this whole filter part needs a final design before we can try to have a cleaner DOM -->\n                <div class=\"datagrid-filter-close-wrapper\">\n                    <button type=\"button\" class=\"close\" (click)=\"open = false\">\n                        <clr-icon shape=\"close\" [attr.title]=\"commonStrings.close\"></clr-icon>\n                    </button>\n                </div>\n    \n                <ng-content></ng-content>\n            </div>\n        </ng-template>\n    "
                }] }
    ];
    /** @nocollapse */
    ClrDatagridFilter.ctorParameters = function () { return [
        { type: FiltersProvider },
        { type: ClrCommonStrings }
    ]; };
    ClrDatagridFilter.propDecorators = {
        open: [{ type: Input, args: ['clrDgFilterOpen',] }],
        openChanged: [{ type: Output, args: ['clrDgFilterOpenChange',] }],
        customFilter: [{ type: Input, args: ['clrDgFilter',] }]
    };
    return ClrDatagridFilter;
}(DatagridFilterRegistrar));

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
var /*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * Generic accessor for deep object properties
 * that can be specified as simple dot-separated strings.
 * @template T
 */
NestedProperty = /** @class */ (function () {
    function NestedProperty(prop) {
        this.prop = prop;
        if (prop.indexOf('.') >= 0) {
            this.splitProp = prop.split('.');
        }
    }
    // Safe getter for a deep object property, will not throw an error but return
    // undefined if one of the intermediate properties is null or undefined.
    // Safe getter for a deep object property, will not throw an error but return
    // undefined if one of the intermediate properties is null or undefined.
    /**
     * @param {?} item
     * @return {?}
     */
    NestedProperty.prototype.getPropValue = 
    // Safe getter for a deep object property, will not throw an error but return
    // undefined if one of the intermediate properties is null or undefined.
    /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        var e_1, _a;
        if (this.splitProp) {
            /** @type {?} */
            var value = item;
            try {
                for (var _b = __values(this.splitProp), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var nestedProp = _c.value;
                    if (value == null || typeof value === 'undefined' || typeof value[nestedProp] === 'undefined') {
                        return undefined;
                    }
                    value = value[nestedProp];
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return value;
        }
        else {
            return item[this.prop];
        }
    };
    return NestedProperty;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
var  /**
 * @template T
 */
DatagridPropertyStringFilter = /** @class */ (function () {
    function DatagridPropertyStringFilter(prop, exact) {
        if (exact === void 0) { exact = false; }
        this.prop = prop;
        this.exact = exact;
        this.nestedProp = new NestedProperty(prop);
    }
    /**
     * @param {?} item
     * @param {?} search
     * @return {?}
     */
    DatagridPropertyStringFilter.prototype.accepts = /**
     * @param {?} item
     * @param {?} search
     * @return {?}
     */
    function (item, search) {
        /** @type {?} */
        var propValue = this.nestedProp.getPropValue(item);
        if (typeof propValue === 'undefined') {
            return false;
        }
        else if (this.exact) {
            return ('' + propValue).toLowerCase() === search;
        }
        else {
            return ('' + propValue).toLowerCase().indexOf(search) >= 0;
        }
    };
    return DatagridPropertyStringFilter;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
var /**
 * @template T
 */
DatagridStringFilterImpl = /** @class */ (function () {
    function DatagridStringFilterImpl(filterFn) {
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
    Object.defineProperty(DatagridStringFilterImpl.prototype, "changes", {
        // We do not want to expose the Subject itself, but the Observable which is read-only
        get: 
        // We do not want to expose the Subject itself, but the Observable which is read-only
        /**
         * @return {?}
         */
        function () {
            return this._changes.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatagridStringFilterImpl.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () {
            return this._rawValue;
        },
        /**
         * Common setter for the input value
         */
        set: /**
         * Common setter for the input value
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (!value) {
                value = '';
            }
            if (value !== this._rawValue) {
                this._rawValue = value;
                this._lowerCaseValue = value.toLowerCase().trim();
                this._changes.next(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatagridStringFilterImpl.prototype, "lowerCaseValue", {
        get: /**
         * @return {?}
         */
        function () {
            return this._lowerCaseValue;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Indicates if the filter is currently active, meaning the input is not empty
     */
    /**
     * Indicates if the filter is currently active, meaning the input is not empty
     * @return {?}
     */
    DatagridStringFilterImpl.prototype.isActive = /**
     * Indicates if the filter is currently active, meaning the input is not empty
     * @return {?}
     */
    function () {
        return !!this.value;
    };
    /**
     * Tests if an item matches a search text
     */
    /**
     * Tests if an item matches a search text
     * @param {?} item
     * @return {?}
     */
    DatagridStringFilterImpl.prototype.accepts = /**
     * Tests if an item matches a search text
     * @param {?} item
     * @return {?}
     */
    function (item) {
        // We always test with the lowercase value of the input, to stay case insensitive
        return this.filterFn.accepts(item, this.lowerCaseValue);
    };
    Object.defineProperty(DatagridStringFilterImpl.prototype, "state", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.filterFn instanceof DatagridPropertyStringFilter) {
                return {
                    property: this.filterFn.prop,
                    value: this.value,
                };
            }
            return this;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} other
     * @return {?}
     */
    DatagridStringFilterImpl.prototype.equals = /**
     * @param {?} other
     * @return {?}
     */
    function (other) {
        if (other instanceof DatagridStringFilterImpl) {
            if (other.filterFn instanceof DatagridPropertyStringFilter) {
                return (this.filterFn instanceof DatagridPropertyStringFilter &&
                    other.filterFn.prop === this.filterFn.prop &&
                    other.value === this.value);
            }
            return other === this;
        }
        return false;
    };
    return DatagridStringFilterImpl;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
var DatagridStringFilter = /** @class */ (function (_super) {
    __extends(DatagridStringFilter, _super);
    function DatagridStringFilter(filters, domAdapter) {
        var _this = _super.call(this, filters) || this;
        _this.domAdapter = domAdapter;
        /**
         * Indicates if the filter dropdown is open
         */
        _this.open = false;
        _this.filterValueChange = new EventEmitter();
        return _this;
    }
    Object.defineProperty(DatagridStringFilter.prototype, "customStringFilter", {
        /**
         * Customizable filter logic based on a search text
         */
        set: /**
         * Customizable filter logic based on a search text
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value instanceof RegisteredFilter) {
                this.setFilter(value);
            }
            else {
                this.setFilter(new DatagridStringFilterImpl(value));
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DatagridStringFilter.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.filterContainer.openChanged.subscribe((/**
         * @param {?} open
         * @return {?}
         */
        function (open) {
            if (open) {
                // We need the timeout because at the time this executes, the input isn't
                // displayed yet.
                setTimeout((/**
                 * @return {?}
                 */
                function () {
                    _this.domAdapter.focus(_this.input.nativeElement);
                }));
            }
        }));
    };
    Object.defineProperty(DatagridStringFilter.prototype, "value", {
        /**
         * Common setter for the input value
         */
        get: /**
         * Common setter for the input value
         * @return {?}
         */
        function () {
            return this.filter.value;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
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
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DatagridStringFilter.prototype.close = /**
     * @return {?}
     */
    function () {
        this.open = false;
    };
    DatagridStringFilter.decorators = [
        { type: Component, args: [{
                    selector: 'clr-dg-string-filter',
                    providers: [{ provide: CustomFilter, useExisting: DatagridStringFilter }],
                    template: "\n        <clr-dg-filter [clrDgFilter]=\"registered\" [(clrDgFilterOpen)]=\"open\">\n            <!--\n                Even though this *ngIf looks useless because the filter container already has one,\n                it prevents NgControlStatus and other directives automatically added by Angular\n                on inputs with NgModel from freaking out because of their host binding changing\n                mid-change detection when the input is destroyed.\n            -->\n            <input #input type=\"text\" name=\"search\" [(ngModel)]=\"value\" *ngIf=\"open\"\n                (keyup.enter)=\"close()\" (keyup.escape)=\"close()\"/>\n        </clr-dg-filter>\n    "
                }] }
    ];
    /** @nocollapse */
    DatagridStringFilter.ctorParameters = function () { return [
        { type: FiltersProvider },
        { type: DomAdapter }
    ]; };
    DatagridStringFilter.propDecorators = {
        customStringFilter: [{ type: Input, args: ['clrDgStringFilter',] }],
        input: [{ type: ViewChild, args: ['input',] }],
        filterContainer: [{ type: ViewChild, args: [ClrDatagridFilter,] }],
        value: [{ type: Input, args: ['clrFilterValue',] }],
        filterValueChange: [{ type: Output, args: ['clrFilterValueChange',] }]
    };
    return DatagridStringFilter;
}(DatagridFilterRegistrar));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
var  /**
 * @abstract
 */
OompaLoompa = /** @class */ (function () {
    // FIXME: Request Injector once we move to Angular 4.2+, it'll allow easier refactors
    function OompaLoompa(cdr, willyWonka) {
        var _this = this;
        this.subscription = willyWonka.chocolate.subscribe((/**
         * @return {?}
         */
        function () {
            if (_this.latestFlavor !== _this.flavor) {
                cdr.detectChanges();
            }
        }));
    }
    /**
     * @return {?}
     */
    OompaLoompa.prototype.ngAfterContentChecked = /**
     * @return {?}
     */
    function () {
        this.latestFlavor = this.flavor;
    };
    /**
     * @return {?}
     */
    OompaLoompa.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subscription.unsubscribe();
    };
    return OompaLoompa;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var RowActionService = /** @class */ (function () {
    function RowActionService() {
        this.actionableCount = 0;
    }
    /**
     * @return {?}
     */
    RowActionService.prototype.register = /**
     * @return {?}
     */
    function () {
        this.actionableCount++;
    };
    /**
     * @return {?}
     */
    RowActionService.prototype.unregister = /**
     * @return {?}
     */
    function () {
        this.actionableCount--;
    };
    Object.defineProperty(RowActionService.prototype, "hasActionableRow", {
        /**
         * false means no rows with action
         */
        get: /**
         * false means no rows with action
         * @return {?}
         */
        function () {
            return this.actionableCount > 0;
        },
        enumerable: true,
        configurable: true
    });
    RowActionService.decorators = [
        { type: Injectable }
    ];
    return RowActionService;
}());

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
var  /*
 * After a conversation with the Angular core team, it turns out we don't have much of a choice for our
 * declarative API, we need to fight against change detection and its one-way flow. This is
 * currently the least dirty solution to do what we want.
 *
 * Do not modify or even use this class unless you know exactly what you're doing.
 * It has the potential to trigger change detection loops or kill app performances.
 */
WillyWonka = /** @class */ (function () {
    function WillyWonka() {
        this._chocolate = new Subject();
    }
    Object.defineProperty(WillyWonka.prototype, "chocolate", {
        get: /**
         * @return {?}
         */
        function () {
            return this._chocolate.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    WillyWonka.prototype.ngAfterViewChecked = /**
     * @return {?}
     */
    function () {
        this._chocolate.next();
    };
    return WillyWonka;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DatagridWillyWonka = /** @class */ (function (_super) {
    __extends(DatagridWillyWonka, _super);
    function DatagridWillyWonka() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DatagridWillyWonka.decorators = [
        { type: Directive, args: [{ selector: 'clr-datagrid' },] }
    ];
    return DatagridWillyWonka;
}(WillyWonka));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ActionableOompaLoompa = /** @class */ (function (_super) {
    __extends(ActionableOompaLoompa, _super);
    function ActionableOompaLoompa(cdr, willyWonka, rowActions) {
        var _this = this;
        if (!willyWonka) {
            throw new Error('clr-dg-row should only be used inside of a clr-datagrid');
        }
        _this = _super.call(this, cdr, willyWonka) || this;
        _this.rowActions = rowActions;
        return _this;
    }
    Object.defineProperty(ActionableOompaLoompa.prototype, "flavor", {
        get: /**
         * @return {?}
         */
        function () {
            return this.rowActions.hasActionableRow;
        },
        enumerable: true,
        configurable: true
    });
    ActionableOompaLoompa.decorators = [
        { type: Directive, args: [{ selector: 'clr-datagrid, clr-dg-row' },] }
    ];
    /** @nocollapse */
    ActionableOompaLoompa.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: DatagridWillyWonka, decorators: [{ type: Optional }] },
        { type: RowActionService }
    ]; };
    return ActionableOompaLoompa;
}(OompaLoompa));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ExpandableRowsCount = /** @class */ (function () {
    function ExpandableRowsCount() {
        this.expandableCount = 0;
    }
    /**
     * @return {?}
     */
    ExpandableRowsCount.prototype.register = /**
     * @return {?}
     */
    function () {
        this.expandableCount++;
    };
    /**
     * @return {?}
     */
    ExpandableRowsCount.prototype.unregister = /**
     * @return {?}
     */
    function () {
        this.expandableCount--;
    };
    Object.defineProperty(ExpandableRowsCount.prototype, "hasExpandableRow", {
        /**
         * false means no rows with action
         */
        get: /**
         * false means no rows with action
         * @return {?}
         */
        function () {
            return this.expandableCount > 0;
        },
        enumerable: true,
        configurable: true
    });
    ExpandableRowsCount.decorators = [
        { type: Injectable }
    ];
    return ExpandableRowsCount;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ExpandableOompaLoompa = /** @class */ (function (_super) {
    __extends(ExpandableOompaLoompa, _super);
    function ExpandableOompaLoompa(cdr, willyWonka, expandableCount) {
        var _this = this;
        if (!willyWonka) {
            throw new Error('clr-dg-row should only be used inside of a clr-datagrid');
        }
        _this = _super.call(this, cdr, willyWonka) || this;
        _this.expandableCount = expandableCount;
        return _this;
    }
    Object.defineProperty(ExpandableOompaLoompa.prototype, "flavor", {
        get: /**
         * @return {?}
         */
        function () {
            return this.expandableCount.hasExpandableRow;
        },
        enumerable: true,
        configurable: true
    });
    ExpandableOompaLoompa.decorators = [
        { type: Directive, args: [{ selector: 'clr-datagrid, clr-dg-row' },] }
    ];
    /** @nocollapse */
    ExpandableOompaLoompa.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: DatagridWillyWonka, decorators: [{ type: Optional }] },
        { type: ExpandableRowsCount }
    ]; };
    return ExpandableOompaLoompa;
}(OompaLoompa));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
var  /**
 * @template T
 */
DatagridPropertyComparator = /** @class */ (function () {
    function DatagridPropertyComparator(prop) {
        this.prop = prop;
        this.nestedProp = new NestedProperty(prop);
    }
    /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    DatagridPropertyComparator.prototype.compare = /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    function (a, b) {
        /** @type {?} */
        var propA = this.nestedProp.getPropValue(a);
        /** @type {?} */
        var propB = this.nestedProp.getPropValue(b);
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
    };
    return DatagridPropertyComparator;
}());

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
var ClrDatagridSortOrder = {
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
var Sort = /** @class */ (function () {
    function Sort(stateDebouncer) {
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
    Object.defineProperty(Sort.prototype, "comparator", {
        get: /**
         * @return {?}
         */
        function () {
            return this._comparator;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.stateDebouncer.changeStart();
            this._comparator = value;
            this.emitChange();
            this.stateDebouncer.changeDone();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sort.prototype, "reverse", {
        get: /**
         * @return {?}
         */
        function () {
            return this._reverse;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.stateDebouncer.changeStart();
            this._reverse = value;
            this.emitChange();
            this.stateDebouncer.changeDone();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @return {?}
     */
    Sort.prototype.emitChange = /**
     * @private
     * @return {?}
     */
    function () {
        this._change.next(this);
    };
    Object.defineProperty(Sort.prototype, "change", {
        // We do not want to expose the Subject itself, but the Observable which is read-only
        get: 
        // We do not want to expose the Subject itself, but the Observable which is read-only
        /**
         * @return {?}
         */
        function () {
            return this._change.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Sets a comparator as the current one, or toggles reverse if the comparator is already used. The
     * optional forceReverse input parameter allows to override that toggling behavior by sorting in
     * reverse order if `true`.
     *
     * @memberof Sort
     */
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
    Sort.prototype.toggle = /**
     * Sets a comparator as the current one, or toggles reverse if the comparator is already used. The
     * optional forceReverse input parameter allows to override that toggling behavior by sorting in
     * reverse order if `true`.
     *
     * \@memberof Sort
     * @param {?} sortBy
     * @param {?=} forceReverse
     * @return {?}
     */
    function (sortBy, forceReverse) {
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
    };
    /**
     * Clears the current sorting order
     */
    /**
     * Clears the current sorting order
     * @return {?}
     */
    Sort.prototype.clear = /**
     * Clears the current sorting order
     * @return {?}
     */
    function () {
        this.comparator = null;
    };
    /**
     * Compares two objects according to the current comparator
     */
    /**
     * Compares two objects according to the current comparator
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    Sort.prototype.compare = /**
     * Compares two objects according to the current comparator
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    function (a, b) {
        return (this.reverse ? -1 : 1) * this.comparator.compare(a, b);
    };
    Sort.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Sort.ctorParameters = function () { return [
        { type: StateDebouncer }
    ]; };
    return Sort;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var WrappedColumn = /** @class */ (function () {
    function WrappedColumn() {
        this._dynamic = false;
    }
    // the columns projected view (in memory)
    /**
     * @return {?}
     */
    WrappedColumn.prototype.ngAfterViewInit = 
    // the columns projected view (in memory)
    /**
     * @return {?}
     */
    function () {
        // Create the cells view in memory, not the DOM.
        this.columnView = this.templateRef.createEmbeddedView(null);
    };
    WrappedColumn.decorators = [
        { type: Component, args: [{
                    selector: 'dg-wrapped-column',
                    template: "        \n        <ng-template #columnPortal>\n            <ng-content></ng-content>\n        </ng-template>\n    "
                }] }
    ];
    WrappedColumn.propDecorators = {
        templateRef: [{ type: ViewChild, args: ['columnPortal',] }]
    };
    return WrappedColumn;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var nbCount = 0;
/**
 * @template T
 */
var ClrDatagridColumn = /** @class */ (function (_super) {
    __extends(ClrDatagridColumn, _super);
    function ClrDatagridColumn(_sort, filters, vcr) {
        var _this = _super.call(this, filters) || this;
        _this._sort = _sort;
        _this.vcr = vcr;
        // deprecated: to be removed - START
        /**
         * Indicates if the column is currently sorted
         *
         * @deprecated This will be removed soon, in favor of the sortOrder mechanism
         */
        _this._sorted = false;
        /**
         * @deprecated This will be removed soon, in favor of the sortOrder mechanism
         */
        _this.sortedChange = new EventEmitter();
        // deprecated: to be removed - END
        /**
         * Indicates how the column is currently sorted
         */
        _this._sortOrder = ClrDatagridSortOrder.UNSORTED;
        _this.sortOrderChange = new EventEmitter();
        /**
         * A custom filter for this column that can be provided in the projected content
         */
        _this.customFilter = false;
        _this.filterValueChange = new EventEmitter();
        _this._sortSubscription = _sort.change.subscribe((/**
         * @param {?} sort
         * @return {?}
         */
        function (sort) {
            // We're only listening to make sure we emit an event when the column goes from sorted to unsorted
            if (_this.sortOrder !== ClrDatagridSortOrder.UNSORTED && sort.comparator !== _this._sortBy) {
                _this._sortOrder = ClrDatagridSortOrder.UNSORTED;
                _this.sortOrderChange.emit(_this._sortOrder);
                // removes the sortIcon when column becomes unsorted
                _this.sortIcon = null;
            }
            // deprecated: to be removed - START
            if (_this.sorted && sort.comparator !== _this._sortBy) {
                _this._sorted = false;
                _this.sortedChange.emit(false);
            }
            // deprecated: to be removed - END
        }));
        _this.columnId = 'dg-col-' + nbCount.toString(); // Approximate a GUID
        nbCount++;
        return _this;
    }
    Object.defineProperty(ClrDatagridColumn.prototype, "hidden", {
        /**
         * @property hidden
         *
         * @description
         * A property that allows the column to be hidden / shown with css
         * Note the default allows the ClrDatagridColumn to have an *ngIf on it. (EHCAIWC - will occur if its not
         * initialized)
         *
         * @default false
         *
         */
        get: /**
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
        function () {
            return !!this.hideable && this.hideable.hidden;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ClrDatagridColumn.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._sortSubscription.unsubscribe();
    };
    Object.defineProperty(ClrDatagridColumn.prototype, "field", {
        get: /**
         * @return {?}
         */
        function () {
            return this._field;
        },
        set: /**
         * @param {?} field
         * @return {?}
         */
        function (field) {
            if (typeof field === 'string') {
                this._field = field;
                if (!this.customFilter) {
                    this.setFilter(new DatagridStringFilterImpl(new DatagridPropertyStringFilter(field)));
                }
                if (!this._sortBy) {
                    this._sortBy = new DatagridPropertyComparator(field);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridColumn.prototype, "sortBy", {
        get: /**
         * @return {?}
         */
        function () {
            return this._sortBy;
        },
        set: /**
         * @param {?} comparator
         * @return {?}
         */
        function (comparator) {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridColumn.prototype, "sortable", {
        /**
         * Indicates if the column is sortable
         */
        get: /**
         * Indicates if the column is sortable
         * @return {?}
         */
        function () {
            return !!this._sortBy;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridColumn.prototype, "sorted", {
        get: /**
         * @return {?}
         */
        function () {
            return this._sorted;
        },
        /**
         * @deprecated This will be removed soon, in favor of the sortOrder mechanism
         */
        set: /**
         * @deprecated This will be removed soon, in favor of the sortOrder mechanism
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (!value && this.sorted) {
                this._sorted = false;
                this._sort.clear();
            }
            else if (value && !this.sorted) {
                this.sort();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridColumn.prototype, "sortOrder", {
        get: /**
         * @return {?}
         */
        function () {
            return this._sortOrder;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridColumn.prototype, "ariaSort", {
        get: /**
         * @return {?}
         */
        function () {
            switch (this._sortOrder) {
                default:
                case ClrDatagridSortOrder.UNSORTED:
                    return 'none';
                case ClrDatagridSortOrder.ASC:
                    return 'ascending';
                case ClrDatagridSortOrder.DESC:
                    return 'descending';
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Sorts the datagrid based on this column
     */
    /**
     * Sorts the datagrid based on this column
     * @param {?=} reverse
     * @return {?}
     */
    ClrDatagridColumn.prototype.sort = /**
     * Sorts the datagrid based on this column
     * @param {?=} reverse
     * @return {?}
     */
    function (reverse) {
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
    };
    Object.defineProperty(ClrDatagridColumn.prototype, "projectedFilter", {
        set: /**
         * @param {?} custom
         * @return {?}
         */
        function (custom) {
            if (custom) {
                this.deleteFilter();
                this.customFilter = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridColumn.prototype, "filterValue", {
        get: /**
         * @return {?}
         */
        function () {
            return this.filter.value;
        },
        set: /**
         * @param {?} newValue
         * @return {?}
         */
        function (newValue) {
            this.updateFilterValue = newValue;
            this.filterValueChange.emit(this.filter.value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridColumn.prototype, "updateFilterValue", {
        set: /**
         * @param {?} newValue
         * @return {?}
         */
        function (newValue) {
            if (!this.filter) {
                return;
            }
            if (!newValue) {
                newValue = '';
            }
            if (newValue !== this.filter.value) {
                this.filter.value = newValue;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ClrDatagridColumn.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.wrappedInjector = new HostWrapper(WrappedColumn, this.vcr);
    };
    Object.defineProperty(ClrDatagridColumn.prototype, "_view", {
        get: /**
         * @return {?}
         */
        function () {
            return this.wrappedInjector.get(WrappedColumn, this.vcr).columnView;
        },
        enumerable: true,
        configurable: true
    });
    ClrDatagridColumn.decorators = [
        { type: Component, args: [{
                    selector: 'clr-dg-column',
                    template: "\n      <div class=\"datagrid-column-flex\">\n          <!-- I'm really not happy with that select since it's not very scalable -->\n          <ng-content select=\"clr-dg-filter, clr-dg-string-filter\"></ng-content>\n\n          <clr-dg-string-filter\n                  *ngIf=\"field && !customFilter\"\n                  [clrDgStringFilter]=\"registered\"\n                  [(clrFilterValue)]=\"filterValue\"></clr-dg-string-filter>\n\n          <ng-template #columnTitle>\n              <ng-content></ng-content>\n          </ng-template>\n\n          <button class=\"datagrid-column-title\" *ngIf=\"sortable\" (click)=\"sort()\" type=\"button\">\n              <ng-container *ngTemplateOutlet=\"columnTitle\"></ng-container>\n              <clr-icon\n                      *ngIf=\"sortIcon\"\n                      [attr.shape]=\"sortIcon\"\n                      class=\"sort-icon\"></clr-icon>\n          </button>\n\n          <span class=\"datagrid-column-title\" *ngIf=\"!sortable\">\n               <ng-container *ngTemplateOutlet=\"columnTitle\"></ng-container>\n            </span>\n\n          <clr-dg-column-separator></clr-dg-column-separator>\n      </div>\n  ",
                    host: {
                        '[class.datagrid-column]': 'true',
                        '[class.datagrid-column--hidden]': 'hidden',
                        '[attr.aria-sort]': 'ariaSort',
                        role: 'columnheader',
                    }
                }] }
    ];
    /** @nocollapse */
    ClrDatagridColumn.ctorParameters = function () { return [
        { type: Sort },
        { type: FiltersProvider },
        { type: ViewContainerRef }
    ]; };
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
    return ClrDatagridColumn;
}(DatagridFilterRegistrar));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
var Items = /** @class */ (function () {
    function Items(_filters, _sort, _page) {
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
        function (index, item) { return item; });
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
     */
    /**
     * Cleans up our subscriptions to other providers
     * @return {?}
     */
    Items.prototype.destroy = /**
     * Cleans up our subscriptions to other providers
     * @return {?}
     */
    function () {
        if (this._filtersSub) {
            this._filtersSub.unsubscribe();
        }
        if (this._sortSub) {
            this._sortSub.unsubscribe();
        }
        if (this._pageSub) {
            this._pageSub.unsubscribe();
        }
    };
    Object.defineProperty(Items.prototype, "smart", {
        get: /**
         * @return {?}
         */
        function () {
            return this._smart;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    Items.prototype.smartenUp = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._smart = true;
        /*
             * These observers trigger a chain of function: filter -> sort -> paginate
             * An observer up the chain re-triggers all the operations that follow it.
             */
        this._filtersSub = this._filters.change.subscribe((/**
         * @return {?}
         */
        function () { return _this._filterItems(); }));
        this._sortSub = this._sort.change.subscribe((/**
         * @return {?}
         */
        function () {
            // Special case, if the datagrid went from sorted to unsorted, we have to re-filter
            // to get the original order back
            if (!_this._sort.comparator) {
                _this._filterItems();
            }
            else {
                _this._sortItems();
            }
        }));
        this._pageSub = this._page.change.subscribe((/**
         * @return {?}
         */
        function () { return _this._changePage(); }));
    };
    Object.defineProperty(Items.prototype, "all", {
        get: /**
         * @return {?}
         */
        function () {
            return this._all;
        },
        set: /**
         * @param {?} items
         * @return {?}
         */
        function (items) {
            this._all = items;
            this.emitAllChanges(items);
            if (this.smart) {
                this._filterItems();
            }
            else {
                this._displayed = items;
                this.emitChange();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Manually recompute the list of displayed items
     */
    /**
     * Manually recompute the list of displayed items
     * @return {?}
     */
    Items.prototype.refresh = /**
     * Manually recompute the list of displayed items
     * @return {?}
     */
    function () {
        if (this.smart) {
            this._filterItems();
        }
    };
    Object.defineProperty(Items.prototype, "displayed", {
        get: /**
         * @return {?}
         */
        function () {
            // Ideally we could return an immutable array, but we don't have it in Clarity yet.
            return this._displayed;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @return {?}
     */
    Items.prototype.emitChange = /**
     * @private
     * @return {?}
     */
    function () {
        this._change.next(this.displayed);
    };
    Object.defineProperty(Items.prototype, "change", {
        // We do not want to expose the Subject itself, but the Observable which is read-only
        get: 
        // We do not want to expose the Subject itself, but the Observable which is read-only
        /**
         * @return {?}
         */
        function () {
            return this._change.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @param {?} items
     * @return {?}
     */
    Items.prototype.emitAllChanges = /**
     * @private
     * @param {?} items
     * @return {?}
     */
    function (items) {
        this._allChanges.next(items);
    };
    Object.defineProperty(Items.prototype, "allChanges", {
        get: /**
         * @return {?}
         */
        function () {
            return this._allChanges.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Items.prototype, "uninitialized", {
        /**
         * Checks if we don't have data to process yet, to abort early operations
         */
        get: /**
         * Checks if we don't have data to process yet, to abort early operations
         * @private
         * @return {?}
         */
        function () {
            return !this._all;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * FiltersProvider items from the raw list
     */
    /**
     * FiltersProvider items from the raw list
     * @private
     * @return {?}
     */
    Items.prototype._filterItems = /**
     * FiltersProvider items from the raw list
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.uninitialized) {
            return;
        }
        if (this._filters.hasActiveFilters()) {
            this._filtered = this._all.filter((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return _this._filters.accepts(item); }));
        }
        else {
            // Work on a shallow copy of the array, to not modify the user's model
            this._filtered = this._all.slice();
        }
        this._page.totalItems = this._filtered.length;
        this._sortItems();
    };
    /**
     * Sorts items in the filtered list
     */
    /**
     * Sorts items in the filtered list
     * @private
     * @return {?}
     */
    Items.prototype._sortItems = /**
     * Sorts items in the filtered list
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.uninitialized) {
            return;
        }
        if (this._sort.comparator) {
            this._filtered.sort((/**
             * @param {?} a
             * @param {?} b
             * @return {?}
             */
            function (a, b) { return _this._sort.compare(a, b); }));
        }
        this._changePage();
    };
    /**
     * Extracts the current page from the sorted list
     */
    /**
     * Extracts the current page from the sorted list
     * @private
     * @return {?}
     */
    Items.prototype._changePage = /**
     * Extracts the current page from the sorted list
     * @private
     * @return {?}
     */
    function () {
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
    };
    Items.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Items.ctorParameters = function () { return [
        { type: FiltersProvider },
        { type: Sort },
        { type: Page }
    ]; };
    return Items;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
var ClrDatagridItems = /** @class */ (function () {
    function ClrDatagridItems(template, differs, items, vcr) {
        var _this = this;
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
        function (newItems) {
            _this.iterableProxy.ngForOf = newItems;
            _this.iterableProxy.ngDoCheck();
        })));
    }
    Object.defineProperty(ClrDatagridItems.prototype, "rawItems", {
        set: /**
         * @param {?} items
         * @return {?}
         */
        function (items) {
            this._rawItems = items ? items : []; // local copy for ngOnChange diffing
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridItems.prototype, "trackBy", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.iterableProxy.ngForTrackBy = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ClrDatagridItems.prototype.ngDoCheck = /**
     * @return {?}
     */
    function () {
        if (!this.differ) {
            this.differ = this.differs.find(this._rawItems).create(this.iterableProxy.ngForTrackBy);
        }
        if (this.differ) {
            /** @type {?} */
            var changes = this.differ.diff(this._rawItems);
            if (changes) {
                // TODO: not very efficient right now,
                // but premature optimization is the root of all evil.
                this.items.all = this._rawItems;
            }
        }
    };
    /**
     * @return {?}
     */
    ClrDatagridItems.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        function (sub) { return sub.unsubscribe(); }));
    };
    ClrDatagridItems.decorators = [
        { type: Directive, args: [{
                    selector: '[clrDgItems][clrDgItemsOf]',
                },] }
    ];
    /** @nocollapse */
    ClrDatagridItems.ctorParameters = function () { return [
        { type: TemplateRef },
        { type: IterableDiffers },
        { type: Items },
        { type: ViewContainerRef }
    ]; };
    ClrDatagridItems.propDecorators = {
        rawItems: [{ type: Input, args: ['clrDgItemsOf',] }],
        trackBy: [{ type: Input, args: ['clrDgItemsTrackBy',] }]
    };
    return ClrDatagridItems;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
var ClrDatagridPlaceholder = /** @class */ (function () {
    function ClrDatagridPlaceholder(items) {
        this.items = items;
    }
    Object.defineProperty(ClrDatagridPlaceholder.prototype, "emptyDatagrid", {
        /**
         * Tests if the datagrid is empty, meaning it doesn't contain any items
         */
        get: /**
         * Tests if the datagrid is empty, meaning it doesn't contain any items
         * @return {?}
         */
        function () {
            return !this.items.loading && (!this.items.displayed || this.items.displayed.length === 0);
        },
        enumerable: true,
        configurable: true
    });
    ClrDatagridPlaceholder.decorators = [
        { type: Component, args: [{
                    selector: 'clr-dg-placeholder',
                    template: "\n        <div\n            class=\"datagrid-placeholder\"\n            [class.datagrid-empty]=\"emptyDatagrid\">\n                <div class=\"datagrid-placeholder-image\" *ngIf=\"emptyDatagrid\"></div>\n                <ng-content *ngIf=\"emptyDatagrid\"></ng-content>\n        </div>\n    ",
                    host: { '[class.datagrid-placeholder-container]': 'true' }
                }] }
    ];
    /** @nocollapse */
    ClrDatagridPlaceholder.ctorParameters = function () { return [
        { type: Items }
    ]; };
    return ClrDatagridPlaceholder;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var POPOVER_HOST_ANCHOR = new InjectionToken('POPOVER_HOST_ANCHOR');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrSignpostTrigger = /** @class */ (function () {
    function ClrSignpostTrigger(ifOpenService, renderer, el) {
        var _this = this;
        this.ifOpenService = ifOpenService;
        this.renderer = renderer;
        this.el = el;
        this.subscriptions = [];
        this.subscriptions.push(this.ifOpenService.openChange.subscribe((/**
         * @param {?} isOpen
         * @return {?}
         */
        function (isOpen) {
            if (isOpen) {
                _this.renderer.addClass(_this.el.nativeElement, 'active');
            }
            else {
                _this.renderer.removeClass(_this.el.nativeElement, 'active');
            }
        })));
    }
    /**
     * @return {?}
     */
    ClrSignpostTrigger.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        function (sub) { return sub.unsubscribe(); }));
    };
    /**********
     *
     * @description
     * click handler for the ClrSignpost trigger button used to hide/show ClrSignpostContent.
     */
    /**
     * *******
     *
     * \@description
     * click handler for the ClrSignpost trigger button used to hide/show ClrSignpostContent.
     * @param {?} event
     * @return {?}
     */
    ClrSignpostTrigger.prototype.onSignpostTriggerClick = /**
     * *******
     *
     * \@description
     * click handler for the ClrSignpost trigger button used to hide/show ClrSignpostContent.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.ifOpenService.toggleWithEvent(event);
    };
    ClrSignpostTrigger.decorators = [
        { type: Directive, args: [{ selector: '[clrSignpostTrigger]', host: { class: 'signpost-trigger' } },] }
    ];
    /** @nocollapse */
    ClrSignpostTrigger.ctorParameters = function () { return [
        { type: IfOpenService },
        { type: Renderer2 },
        { type: ElementRef }
    ]; };
    ClrSignpostTrigger.propDecorators = {
        onSignpostTriggerClick: [{ type: HostListener, args: ['click', ['$event'],] }]
    };
    return ClrSignpostTrigger;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrSignpost = /** @class */ (function () {
    function ClrSignpost(commonStrings) {
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
    Object.defineProperty(ClrSignpost.prototype, "customTrigger", {
        /**********
         * @property signPostTrigger
         *
         * @description
         * Uses ContentChild to check for a user supplied element with the ClrSignpostTrigger on it.
         *
         */
        set: /**
         * *******
         * \@property signPostTrigger
         *
         * \@description
         * Uses ContentChild to check for a user supplied element with the ClrSignpostTrigger on it.
         *
         * @param {?} trigger
         * @return {?}
         */
        function (trigger$$1) {
            this.useCustomTrigger = !!trigger$$1;
        },
        enumerable: true,
        configurable: true
    });
    ClrSignpost.decorators = [
        { type: Component, args: [{
                    selector: 'clr-signpost',
                    template: "\n        <ng-container *ngIf=\"!useCustomTrigger\">\n            <button\n                type=\"button\"\n                class=\"signpost-action btn btn-small btn-link\"\n                clrSignpostTrigger>\n                <clr-icon shape=\"info\" [attr.title]=\"commonStrings.info\"></clr-icon>\n            </button>\n        </ng-container>\n        \n        <ng-content></ng-content>\n    ",
                    host: { '[class.signpost]': 'true' },
                    providers: [IfOpenService, { provide: POPOVER_HOST_ANCHOR, useExisting: ElementRef }]
                }] }
    ];
    /** @nocollapse */
    ClrSignpost.ctorParameters = function () { return [
        { type: ClrCommonStrings }
    ]; };
    ClrSignpost.propDecorators = {
        customTrigger: [{ type: ContentChild, args: [ClrSignpostTrigger,] }]
    };
    return ClrSignpost;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 *
 * \@description
 * An \@Injectable provider class that enables
 *
 * 1. Managing, track hideability of DatagridColumns
 *
 */
var HideableColumnService = /** @class */ (function () {
    function HideableColumnService() {
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
    Object.defineProperty(HideableColumnService.prototype, "canHideNextColumn", {
        /**********
         *
         * @property canHideNextColumn
         *
         * @description
         * Service function that is called by clr-dg-column-toggle component. Use this if you need to ask if you can hide
         * a column. It acts as a guard against hiding all the columns making sure there is at least one column displayed.
         *
         */
        get: /**
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
        function () {
            /** @type {?} */
            var hiddenColumns = this._columnList.filter((/**
             * @param {?} column
             * @return {?}
             */
            function (column) { return column !== undefined; })).filter((/**
             * @param {?} column
             * @return {?}
             */
            function (column) { return column.hidden; }));
            return this._columnList.length - hiddenColumns.length > 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HideableColumnService.prototype, "checkForAllColumnsVisible", {
        /**********
         *
         * @property checkForAllColumnsVisible
         *
         * @description
         * For when you need to know if the datagrid's columns are all showing.
         *
         */
        get: /**
         * *******
         *
         * \@property checkForAllColumnsVisible
         *
         * \@description
         * For when you need to know if the datagrid's columns are all showing.
         *
         * @return {?}
         */
        function () {
            return !this._columnList.some((/**
             * @param {?} column
             * @return {?}
             */
            function (column) { return column && column.hidden; }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HideableColumnService.prototype, "columnListChange", {
        /***********
         * @property columnListChange
         *
         * @description
         * A public property that enables subscribers to hear updates to the column map.
         * Use this if you need to do something whenever the Datagrid's column list is changed (i.e *ngIf on a column).
         *
         */
        get: /**
         * ********
         * \@property columnListChange
         *
         * \@description
         * A public property that enables subscribers to hear updates to the column map.
         * Use this if you need to do something whenever the Datagrid's column list is changed (i.e *ngIf on a column).
         *
         * @return {?}
         */
        function () {
            return this._columnListChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**********
     *
     * @description
     * Public function that returns the current list of columns. I needed an array of to iterate on in the RowRenderer
     * but subscribing to the _columnListChange changes did not seem like the correct way to get it.
     *
     */
    /**
     * *******
     *
     * \@description
     * Public function that returns the current list of columns. I needed an array of to iterate on in the RowRenderer
     * but subscribing to the _columnListChange changes did not seem like the correct way to get it.
     *
     * @return {?}
     */
    HideableColumnService.prototype.getColumns = /**
     * *******
     *
     * \@description
     * Public function that returns the current list of columns. I needed an array of to iterate on in the RowRenderer
     * but subscribing to the _columnListChange changes did not seem like the correct way to get it.
     *
     * @return {?}
     */
    function () {
        return this._columnList;
    };
    /**********
     *
     * @description
     * Iterate through the current _columnList:
     * - if it has a DatagridHideableColumn and is hidden then show it.
     * - if it's DatagridHideableColumn was previously the last column visible, turn that flag off.
     *
     */
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
    HideableColumnService.prototype.showHiddenColumns = /**
     * *******
     *
     * \@description
     * Iterate through the current _columnList:
     * - if it has a DatagridHideableColumn and is hidden then show it.
     * - if it's DatagridHideableColumn was previously the last column visible, turn that flag off.
     *
     * @return {?}
     */
    function () {
        this._columnList.forEach((/**
         * @param {?} column
         * @return {?}
         */
        function (column) {
            if (column && column.hidden === true) {
                column.hidden = false;
            }
            if (column && column.lastVisibleColumn) {
                column.lastVisibleColumn = false;
            }
        }));
    };
    /**
     *
     * @param columns: DatagridColumn[]
     *
     * @description
     * Creates an array of DatagridHideableColumn's || null based column array passed as param.
     * Is dependent on the order in @ContentChildren in Datagrid.
     *
     */
    /**
     *
     * \@description
     * Creates an array of DatagridHideableColumn's || null based column array passed as param.
     * Is dependent on the order in \@ContentChildren in Datagrid.
     *
     * @param {?} columns
     * @return {?}
     */
    HideableColumnService.prototype.updateColumnList = /**
     *
     * \@description
     * Creates an array of DatagridHideableColumn's || null based column array passed as param.
     * Is dependent on the order in \@ContentChildren in Datagrid.
     *
     * @param {?} columns
     * @return {?}
     */
    function (columns) {
        this._columnList = columns; // clear the list
        this.updateForLastVisibleColumn(); // Update our visibility state for UI
        this._columnListChange.next(this._columnList); // Broadcast it
    };
    /**********
     *
     * @description
     * Gets the current visible count for all columns.
     * When it is greater than 1 it marks everything as false for the lastVisibleColumn.
     * When visible count is not > 1 (i.e) 1. , it finds the only column that is not hidden and marks it as the
     * lastVisibleColumn.
     *
     */
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
    HideableColumnService.prototype.updateForLastVisibleColumn = /**
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
    function () {
        // There is more than one column showing, make sure nothing is marked lastVisibleColumn
        if (this.canHideNextColumn) {
            this._columnList.map((/**
             * @param {?} column
             * @return {?}
             */
            function (column) {
                if (column && column.lastVisibleColumn) {
                    column.lastVisibleColumn = false;
                }
            }));
        }
        else {
            // The visibleCount is down to only one column showing. Find it and flag it as the lastVisibleColumn
            this._columnList.map((/**
             * @param {?} column
             * @return {?}
             */
            function (column) {
                if (column && !column.hidden) {
                    column.lastVisibleColumn = true;
                }
            }));
        }
    };
    /**********
     *
     * @description
     * Return a HideableColumn in this._columnList for the given id.
     *
     *
     */
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
    HideableColumnService.prototype.getColumnById = /**
     * *******
     *
     * \@description
     * Return a HideableColumn in this._columnList for the given id.
     *
     *
     * @param {?} id
     * @return {?}
     */
    function (id) {
        if (id) {
            return this._columnList.find((/**
             * @param {?} column
             * @return {?}
             */
            function (column) { return column && column.id === id; }));
        }
        return;
    };
    HideableColumnService.decorators = [
        { type: Injectable }
    ];
    return HideableColumnService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var WrappedCell = /** @class */ (function () {
    function WrappedCell() {
        this._dynamic = false;
    }
    // the cells projected view
    /**
     * @return {?}
     */
    WrappedCell.prototype.ngAfterViewInit = 
    // the cells projected view
    /**
     * @return {?}
     */
    function () {
        this.cellView = this.templateRef.createEmbeddedView(null);
    };
    WrappedCell.decorators = [
        { type: Component, args: [{
                    selector: 'dg-wrapped-cell',
                    template: "        \n        <ng-template #cellPortal>\n            <ng-content></ng-content>\n        </ng-template>\n    "
                }] }
    ];
    WrappedCell.propDecorators = {
        templateRef: [{ type: ViewChild, args: ['cellPortal',] }]
    };
    return WrappedCell;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrDatagridCell = /** @class */ (function () {
    function ClrDatagridCell(hideableColumnService, _el, _renderer, vcr) {
        this.hideableColumnService = hideableColumnService;
        this._el = _el;
        this._renderer = _renderer;
        this.vcr = vcr;
    }
    Object.defineProperty(ClrDatagridCell.prototype, "id", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._id = value;
            this.mapHideableColumn(this._id);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @param {?} columnId
     * @return {?}
     */
    ClrDatagridCell.prototype.mapHideableColumn = /**
     * @private
     * @param {?} columnId
     * @return {?}
     */
    function (columnId) {
        var _this = this;
        if (!columnId) {
            return;
        }
        /** @type {?} */
        var hideableColumn = this.hideableColumnService.getColumnById(this._id);
        this.setHiddenClass(hideableColumn.hidden);
        this.hiddenStateSubscription = hideableColumn.hiddenChangeState.subscribe((/**
         * @return {?}
         */
        function () {
            _this.setHiddenClass(hideableColumn.hidden);
        }));
    };
    /**
     * @private
     * @param {?} hideableColumnValue
     * @return {?}
     */
    ClrDatagridCell.prototype.setHiddenClass = /**
     * @private
     * @param {?} hideableColumnValue
     * @return {?}
     */
    function (hideableColumnValue) {
        if (hideableColumnValue) {
            this._renderer.addClass(this._el.nativeElement, 'datagrid-cell--hidden');
        }
        else {
            this._renderer.removeClass(this._el.nativeElement, 'datagrid-cell--hidden');
        }
    };
    /**
     * @return {?}
     */
    ClrDatagridCell.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.wrappedInjector = new HostWrapper(WrappedCell, this.vcr);
    };
    /**
     * @return {?}
     */
    ClrDatagridCell.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.hiddenStateSubscription) {
            this.hiddenStateSubscription.unsubscribe();
        }
    };
    Object.defineProperty(ClrDatagridCell.prototype, "_view", {
        get: /**
         * @return {?}
         */
        function () {
            return this.wrappedInjector.get(WrappedCell, this.vcr).cellView;
        },
        enumerable: true,
        configurable: true
    });
    ClrDatagridCell.decorators = [
        { type: Component, args: [{
                    selector: 'clr-dg-cell',
                    template: "\n        <ng-content></ng-content>\n    ",
                    host: {
                        '[class.datagrid-cell]': 'true',
                        '[class.datagrid-signpost-trigger]': 'signpost.length > 0',
                        role: 'cell',
                    }
                }] }
    ];
    /** @nocollapse */
    ClrDatagridCell.ctorParameters = function () { return [
        { type: HideableColumnService },
        { type: ElementRef },
        { type: Renderer2 },
        { type: ViewContainerRef }
    ]; };
    ClrDatagridCell.propDecorators = {
        signpost: [{ type: ContentChildren, args: [ClrSignpost,] }]
    };
    return ClrDatagridCell;
}());

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
var DatagridDisplayMode = {
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
var DatagridRenderStep = {
    ALIGN_COLUMNS: 0,
    CALCULATE_MODE_ON: 1,
    CALCULATE_MODE_OFF: 2,
    CLEAR_WIDTHS: 3,
    COMPUTE_COLUMN_WIDTHS: 4,
    DETECT_STRICT_WIDTHS: 5,
};
DatagridRenderStep[DatagridRenderStep.ALIGN_COLUMNS] = 'ALIGN_COLUMNS';
DatagridRenderStep[DatagridRenderStep.CALCULATE_MODE_ON] = 'CALCULATE_MODE_ON';
DatagridRenderStep[DatagridRenderStep.CALCULATE_MODE_OFF] = 'CALCULATE_MODE_OFF';
DatagridRenderStep[DatagridRenderStep.CLEAR_WIDTHS] = 'CLEAR_WIDTHS';
DatagridRenderStep[DatagridRenderStep.COMPUTE_COLUMN_WIDTHS] = 'COMPUTE_COLUMN_WIDTHS';
DatagridRenderStep[DatagridRenderStep.DETECT_STRICT_WIDTHS] = 'DETECT_STRICT_WIDTHS';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DatagridRenderOrganizer = /** @class */ (function () {
    function DatagridRenderOrganizer() {
        this._renderStep = new Subject();
        this.alreadySized = false;
    }
    Object.defineProperty(DatagridRenderOrganizer.prototype, "renderStep", {
        get: /**
         * @return {?}
         */
        function () {
            return this._renderStep.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} step
     * @return {?}
     */
    DatagridRenderOrganizer.prototype.filterRenderSteps = /**
     * @param {?} step
     * @return {?}
     */
    function (step) {
        return this.renderStep.pipe(filter((/**
         * @param {?} testStep
         * @return {?}
         */
        function (testStep) { return step === testStep; })));
    };
    /**
     * @return {?}
     */
    DatagridRenderOrganizer.prototype.resize = /**
     * @return {?}
     */
    function () {
        this._renderStep.next(DatagridRenderStep.CALCULATE_MODE_ON);
        if (this.alreadySized) {
            this._renderStep.next(DatagridRenderStep.CLEAR_WIDTHS);
        }
        this._renderStep.next(DatagridRenderStep.DETECT_STRICT_WIDTHS);
        this._renderStep.next(DatagridRenderStep.COMPUTE_COLUMN_WIDTHS);
        this._renderStep.next(DatagridRenderStep.ALIGN_COLUMNS);
        this.alreadySized = true;
        this._renderStep.next(DatagridRenderStep.CALCULATE_MODE_OFF);
    };
    DatagridRenderOrganizer.decorators = [
        { type: Injectable }
    ];
    return DatagridRenderOrganizer;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DisplayModeService = /** @class */ (function () {
    function DisplayModeService(renderOrganizer) {
        var _this = this;
        this.subscriptions = [];
        this._view = new BehaviorSubject(DatagridDisplayMode.DISPLAY);
        this.subscriptions.push(renderOrganizer
            .filterRenderSteps(DatagridRenderStep.CALCULATE_MODE_ON)
            .subscribe((/**
         * @return {?}
         */
        function () { return _this._view.next(DatagridDisplayMode.CALCULATE); })));
        this.subscriptions.push(renderOrganizer
            .filterRenderSteps(DatagridRenderStep.CALCULATE_MODE_OFF)
            .subscribe((/**
         * @return {?}
         */
        function () { return _this._view.next(DatagridDisplayMode.DISPLAY); })));
    }
    Object.defineProperty(DisplayModeService.prototype, "view", {
        get: /**
         * @return {?}
         */
        function () {
            return this._view.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DisplayModeService.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        function (sub) { return sub.unsubscribe(); }));
    };
    DisplayModeService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    DisplayModeService.ctorParameters = function () { return [
        { type: DatagridRenderOrganizer }
    ]; };
    return DisplayModeService;
}());

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
var SelectionType = {
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
var nbSelection = 0;
/**
 * @template T
 */
var Selection = /** @class */ (function () {
    function Selection(_items, _filters) {
        var _this = this;
        this._items = _items;
        this._filters = _filters;
        this.prevSelectionRefs = []; // Refs of selected items
        this._selectionType = SelectionType.None;
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
        function () {
            if (!_this._selectable) {
                return;
            }
            _this.clearSelection();
        })));
        this.subscriptions.push(this._items.allChanges.subscribe((/**
         * @param {?} updatedItems
         * @return {?}
         */
        function (updatedItems) {
            switch (_this.selectionType) {
                case SelectionType.None: {
                    break;
                }
                case SelectionType.Single: {
                    /** @type {?} */
                    var newSingle_1;
                    /** @type {?} */
                    var trackBy_1 = _this._items.trackBy;
                    /** @type {?} */
                    var selectionUpdated_1 = false;
                    // if the currentSingle has been set before data was loaded, we look up and save the ref from current data set
                    if (_this.currentSingle && !_this.prevSingleSelectionRef) {
                        if (_this._items.all && _this._items.trackBy) {
                            /** @type {?} */
                            var lookup = _this._items.all.findIndex((/**
                             * @param {?} maybe
                             * @return {?}
                             */
                            function (maybe) { return maybe === _this.currentSingle; }));
                            _this.prevSingleSelectionRef = _this._items.trackBy(lookup, _this.currentSingle);
                        }
                    }
                    updatedItems.forEach((/**
                     * @param {?} item
                     * @param {?} index
                     * @return {?}
                     */
                    function (item, index) {
                        /** @type {?} */
                        var ref = trackBy_1(index, item);
                        // If one of the updated items is the previously selectedSingle, set it as the new one
                        if (_this.prevSingleSelectionRef === ref) {
                            newSingle_1 = item;
                            selectionUpdated_1 = true;
                        }
                    }));
                    // If we're using smart datagrids, we expect all items to be present in the updatedItems array.
                    // Therefore, we should delete the currentSingle if it used to be defined but doesn't exist anymore.
                    // No explicit "delete" is required, since newSingle would be undefined at this point.
                    // Marking it as selectionUpdated here will set currentSingle to undefined below in the setTimeout.
                    if (_this._items.smart && !newSingle_1) {
                        selectionUpdated_1 = true;
                    }
                    // TODO: Discussed this with Eudes and this is fine for now.
                    // But we need to figure out a different pattern for the
                    // child triggering the parent change detection problem.
                    // Using setTimeout for now to fix this.
                    setTimeout((/**
                     * @return {?}
                     */
                    function () {
                        if (selectionUpdated_1) {
                            _this.currentSingle = newSingle_1;
                        }
                    }), 0);
                    break;
                }
                case SelectionType.Multi: {
                    /** @type {?} */
                    var leftOver_1 = _this.current.slice();
                    /** @type {?} */
                    var trackBy_2 = _this._items.trackBy;
                    /** @type {?} */
                    var selectionUpdated_2 = false;
                    // if the current has been set before data was loaded, we look up and save the ref from current data set
                    if (_this.current.length > 0 && _this.prevSelectionRefs.length !== _this.current.length) {
                        if (_this._items.all && _this._items.trackBy) {
                            _this.prevSelectionRefs = [];
                            _this.current.forEach((/**
                             * @param {?} item
                             * @return {?}
                             */
                            function (item) {
                                /** @type {?} */
                                var lookup = _this._items.all.findIndex((/**
                                 * @param {?} maybe
                                 * @return {?}
                                 */
                                function (maybe) { return maybe === item; }));
                                _this.prevSelectionRefs.push(_this._items.trackBy(lookup, item));
                            }));
                        }
                    }
                    // TODO: revisit this when we work on https://github.com/vmware/clarity/issues/2342
                    // currently, the selection is cleared when filter is applied, so the logic inside
                    // the if statement below results in broken behavior.
                    if (leftOver_1.length > 0) {
                        updatedItems.forEach((/**
                         * @param {?} item
                         * @param {?} index
                         * @return {?}
                         */
                        function (item, index) {
                            /** @type {?} */
                            var ref = trackBy_2(index, item);
                            // Look in current selected refs array if item is selected, and update actual value
                            /** @type {?} */
                            var selectedIndex = _this.prevSelectionRefs.indexOf(ref);
                            if (selectedIndex > -1) {
                                leftOver_1[selectedIndex] = item;
                                selectionUpdated_2 = true;
                            }
                        }));
                        // Filter out any unmatched items if we're using smart datagrids where we expect all items to be
                        // present
                        if (_this._items.smart) {
                            leftOver_1 = leftOver_1.filter((/**
                             * @param {?} selected
                             * @return {?}
                             */
                            function (selected) { return updatedItems.indexOf(selected) > -1; }));
                            if (_this.current.length !== leftOver_1.length) {
                                selectionUpdated_2 = true;
                            }
                        }
                        // TODO: Discussed this with Eudes and this is fine for now.
                        // But we need to figure out a different pattern for the
                        // child triggering the parent change detection problem.
                        // Using setTimeout for now to fix this.
                        setTimeout((/**
                         * @return {?}
                         */
                        function () {
                            if (selectionUpdated_2) {
                                _this.current = leftOver_1;
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
    Selection.prototype.clearSelection = /**
     * @return {?}
     */
    function () {
        this.current.length = 0;
        this.prevSelectionRefs = [];
        this._currentSingle = null;
        this.prevSingleSelectionRef = null;
        this.emitChange();
    };
    Object.defineProperty(Selection.prototype, "selectionType", {
        get: /**
         * @return {?}
         */
        function () {
            return this._selectionType;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Selection.prototype, "_selectable", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            return this._selectionType === SelectionType.Multi || this._selectionType === SelectionType.Single;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Cleans up our subscriptions to other providers
     */
    /**
     * Cleans up our subscriptions to other providers
     * @return {?}
     */
    Selection.prototype.destroy = /**
     * Cleans up our subscriptions to other providers
     * @return {?}
     */
    function () {
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        function (sub) { return sub.unsubscribe(); }));
    };
    Object.defineProperty(Selection.prototype, "currentSingle", {
        get: /**
         * @return {?}
         */
        function () {
            return this._currentSingle;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var _this = this;
            if (value === this._currentSingle) {
                return;
            }
            this._currentSingle = value;
            if (this._items.all && this._items.trackBy && value) {
                /** @type {?} */
                var lookup = this._items.all.findIndex((/**
                 * @param {?} maybe
                 * @return {?}
                 */
                function (maybe) { return maybe === value; }));
                this.prevSingleSelectionRef = this._items.trackBy(lookup, value);
            }
            this.emitChange();
            // Ignore items changes in the same change detection cycle.
            // @TODO This can likely be removed!
            this.debounce = true;
            setTimeout((/**
             * @return {?}
             */
            function () { return (_this.debounce = false); }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Selection.prototype, "current", {
        get: /**
         * @return {?}
         */
        function () {
            return this._current;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.updateCurrent(value, true);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} value
     * @param {?} emit
     * @return {?}
     */
    Selection.prototype.updateCurrent = /**
     * @param {?} value
     * @param {?} emit
     * @return {?}
     */
    function (value, emit) {
        var _this = this;
        this._current = value;
        if (emit) {
            this.emitChange();
            // Ignore items changes in the same change detection cycle.
            // @TODO This can likely be removed!
            this.debounce = true;
            setTimeout((/**
             * @return {?}
             */
            function () { return (_this.debounce = false); }));
        }
    };
    /**
     * @private
     * @return {?}
     */
    Selection.prototype.emitChange = /**
     * @private
     * @return {?}
     */
    function () {
        if (this._selectionType === SelectionType.Single) {
            this._change.next(this.currentSingle);
        }
        else if (this._selectionType === SelectionType.Multi) {
            this._change.next(this.current);
        }
    };
    Object.defineProperty(Selection.prototype, "change", {
        // We do not want to expose the Subject itself, but the Observable which is read-only
        get: 
        // We do not want to expose the Subject itself, but the Observable which is read-only
        /**
         * @return {?}
         */
        function () {
            return this._change.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Checks if an item is currently selected
     */
    /**
     * Checks if an item is currently selected
     * @param {?} item
     * @return {?}
     */
    Selection.prototype.isSelected = /**
     * Checks if an item is currently selected
     * @param {?} item
     * @return {?}
     */
    function (item) {
        if (this._selectionType === SelectionType.Single) {
            return this.currentSingle === item;
        }
        else if (this._selectionType === SelectionType.Multi) {
            return this.current.indexOf(item) >= 0;
        }
        return false;
    };
    /**
     * Selects an item
     */
    /**
     * Selects an item
     * @private
     * @param {?} item
     * @return {?}
     */
    Selection.prototype.selectItem = /**
     * Selects an item
     * @private
     * @param {?} item
     * @return {?}
     */
    function (item) {
        this.current.push(item);
        if (this._items.trackBy) {
            // Push selected ref onto array
            /** @type {?} */
            var lookup = this._items.all.findIndex((/**
             * @param {?} maybe
             * @return {?}
             */
            function (maybe) { return maybe === item; }));
            this.prevSelectionRefs.push(this._items.trackBy(lookup, item));
        }
    };
    /**
     * Deselects an item
     */
    /**
     * Deselects an item
     * @private
     * @param {?} indexOfItem
     * @return {?}
     */
    Selection.prototype.deselectItem = /**
     * Deselects an item
     * @private
     * @param {?} indexOfItem
     * @return {?}
     */
    function (indexOfItem) {
        this.current.splice(indexOfItem, 1);
        if (this._items.trackBy && indexOfItem < this.prevSelectionRefs.length) {
            // Keep selected refs array in sync
            this.prevSelectionRefs.splice(indexOfItem, 1);
        }
    };
    /**
     * Selects or deselects an item
     */
    /**
     * Selects or deselects an item
     * @param {?} item
     * @param {?} selected
     * @return {?}
     */
    Selection.prototype.setSelected = /**
     * Selects or deselects an item
     * @param {?} item
     * @param {?} selected
     * @return {?}
     */
    function (item, selected) {
        switch (this._selectionType) {
            case SelectionType.None:
                break;
            case SelectionType.Single:
                // in single selection, set currentSingle method should be used
                break;
            case SelectionType.Multi:
                /** @type {?} */
                var index = this.current.indexOf(item);
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
    };
    /**
     * Checks if all currently displayed items are selected
     */
    /**
     * Checks if all currently displayed items are selected
     * @return {?}
     */
    Selection.prototype.isAllSelected = /**
     * Checks if all currently displayed items are selected
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._selectionType !== SelectionType.Multi || !this._items.displayed) {
            return false;
        }
        /** @type {?} */
        var displayedItems = this._items.displayed;
        /** @type {?} */
        var nbDisplayed = this._items.displayed.length;
        if (nbDisplayed < 1) {
            return false;
        }
        /** @type {?} */
        var temp = displayedItems.filter((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return _this.current.indexOf(item) > -1; }));
        return temp.length === displayedItems.length;
    };
    /**
     * Selects or deselects all currently displayed items
     */
    /**
     * Selects or deselects all currently displayed items
     * @return {?}
     */
    Selection.prototype.toggleAll = /**
     * Selects or deselects all currently displayed items
     * @return {?}
     */
    function () {
        var _this = this;
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
            function (item) {
                /** @type {?} */
                var currentIndex = _this.current.indexOf(item);
                if (currentIndex > -1) {
                    _this.deselectItem(currentIndex);
                }
            }));
        }
        else {
            this._items.displayed.forEach((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                if (_this.current.indexOf(item) < 0) {
                    _this.selectItem(item);
                }
            }));
        }
        this.emitChange();
    };
    Selection.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Selection.ctorParameters = function () { return [
        { type: Items },
        { type: FiltersProvider }
    ]; };
    return Selection;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var WrappedRow = /** @class */ (function () {
    function WrappedRow() {
        this._dynamic = false;
    }
    // the rows projected view (in memory)
    /**
     * @return {?}
     */
    WrappedRow.prototype.ngAfterViewInit = 
    // the rows projected view (in memory)
    /**
     * @return {?}
     */
    function () {
        // Create the cells view in memory, not the DOM.
        this.rowView = this.templateRef.createEmbeddedView(null);
    };
    WrappedRow.decorators = [
        { type: Component, args: [{
                    selector: 'dg-wrapped-row',
                    template: "        \n        <ng-template #rowPortal>\n            <ng-content></ng-content>\n        </ng-template>\n    "
                }] }
    ];
    WrappedRow.propDecorators = {
        templateRef: [{ type: ViewChild, args: ['rowPortal',] }]
    };
    return WrappedRow;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var nbRow = 0;
/**
 * @template T
 */
var ClrDatagridRow = /** @class */ (function () {
    function ClrDatagridRow(selection, rowActionService, globalExpandable, expand, hideableColumnService, displayMode, vcr, renderer, el, commonStrings) {
        var _this = this;
        this.selection = selection;
        this.rowActionService = rowActionService;
        this.globalExpandable = globalExpandable;
        this.expand = expand;
        this.hideableColumnService = hideableColumnService;
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
        function (_a) {
            var _b = __read(_a, 2), expandReplaceValue = _b[0], expandChangeValue = _b[1];
            if (expandReplaceValue && expandChangeValue) {
                // replaced and expanding
                _this.replaced = true;
                _this.renderer.addClass(_this.el.nativeElement, 'datagrid-row-replaced');
            }
            else {
                _this.replaced = false;
                // Handles these cases: not replaced and collapsing & replaced and
                // collapsing and not replaced and expanding.
                _this.renderer.removeClass(_this.el.nativeElement, 'datagrid-row-replaced');
            }
        })));
    }
    Object.defineProperty(ClrDatagridRow.prototype, "selected", {
        /**
         * Indicates if the row is selected
         */
        get: /**
         * Indicates if the row is selected
         * @return {?}
         */
        function () {
            if (this.selection.selectionType === SelectionType.None) {
                return this._selected;
            }
            else {
                return this.selection.isSelected(this.item);
            }
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (this.selection.selectionType === SelectionType.None) {
                this._selected = value;
            }
            else {
                this.selection.setSelected(this.item, value);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?=} selected
     * @return {?}
     */
    ClrDatagridRow.prototype.toggle = /**
     * @param {?=} selected
     * @return {?}
     */
    function (selected) {
        if (selected === void 0) { selected = !this.selected; }
        if (selected !== this.selected) {
            this.selected = selected;
            this.selectedChanged.emit(selected);
        }
    };
    Object.defineProperty(ClrDatagridRow.prototype, "expanded", {
        get: /**
         * @return {?}
         */
        function () {
            return this.expand.expanded;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.expand.expanded = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ClrDatagridRow.prototype.toggleExpand = /**
     * @return {?}
     */
    function () {
        if (this.expand.expandable) {
            this.expanded = !this.expanded;
            this.expandedChange.emit(this.expanded);
        }
    };
    /**
     * @return {?}
     */
    ClrDatagridRow.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // Make sure things get started
        /** @type {?} */
        var columnsList = this.hideableColumnService.getColumns();
        this.updateCellsForColumns(columnsList);
        // Triggered when the Cells list changes per row-renderer
        this.dgCells.changes.subscribe((/**
         * @param {?} cellList
         * @return {?}
         */
        function (cellList) {
            /** @type {?} */
            var columnList = _this.hideableColumnService.getColumns();
            if (cellList.length === columnList.length) {
                _this.updateCellsForColumns(columnList);
                _this.dgCells.forEach((/**
                 * @param {?} cell
                 * @return {?}
                 */
                function (cell) {
                    _this._scrollableCells.insert(cell._view);
                }));
            }
        }));
        // Used to set things up the first time but only after all the columns are ready.
        this.subscriptions.push(this.hideableColumnService.columnListChange.subscribe((/**
         * @param {?} columnList
         * @return {?}
         */
        function (columnList) {
            // Prevents cell updates when cols and cells array are not aligned - only seems to run on init / first time.
            if (columnList.length === _this.dgCells.length) {
                _this.updateCellsForColumns(columnList);
            }
        })));
    };
    /**
     * @return {?}
     */
    ClrDatagridRow.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.subscriptions.push(this.displayMode.view.subscribe((/**
         * @param {?} viewChange
         * @return {?}
         */
        function (viewChange) {
            // Listen for view changes and move cells around depending on the current displayType
            // remove cell views from display view
            for (var i = _this._scrollableCells.length; i > 0; i--) {
                _this._scrollableCells.detach();
            }
            // remove cell views from calculated view
            for (var i = _this._calculatedCells.length; i > 0; i--) {
                _this._calculatedCells.detach();
            }
            if (viewChange === DatagridDisplayMode.CALCULATE) {
                _this.displayCells = false;
                _this.dgCells.forEach((/**
                 * @param {?} cell
                 * @return {?}
                 */
                function (cell) {
                    _this._calculatedCells.insert(cell._view);
                }));
            }
            else {
                _this.displayCells = true;
                _this.dgCells.forEach((/**
                 * @param {?} cell
                 * @return {?}
                 */
                function (cell) {
                    _this._scrollableCells.insert(cell._view);
                }));
            }
        })));
    };
    /**********
     *
     * @description
     * 1. Maps the new columnListChange to the dgCells list by index
     * 2. Sets the hidden state on the cell
     * Take a Column list and use index to access the columns for hideable properties.
     *
     */
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
    ClrDatagridRow.prototype.updateCellsForColumns = /**
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
    function (columnList) {
        // Map cells to columns with Array.index
        this.dgCells.forEach((/**
         * @param {?} cell
         * @param {?} index
         * @return {?}
         */
        function (cell, index) {
            /** @type {?} */
            var currentColumn = columnList[index];
            if (currentColumn) {
                cell.id = currentColumn.id;
            }
        }));
    };
    /**
     * @return {?}
     */
    ClrDatagridRow.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        function (sub) { return sub.unsubscribe(); }));
    };
    /**
     * @return {?}
     */
    ClrDatagridRow.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.wrappedInjector = new HostWrapper(WrappedRow, this.vcr);
    };
    Object.defineProperty(ClrDatagridRow.prototype, "_view", {
        get: /**
         * @return {?}
         */
        function () {
            return this.wrappedInjector.get(WrappedRow, this.vcr).rowView;
        },
        enumerable: true,
        configurable: true
    });
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
                    providers: [Expand, { provide: LoadingListener, useExisting: Expand }]
                }] }
    ];
    /** @nocollapse */
    ClrDatagridRow.ctorParameters = function () { return [
        { type: Selection },
        { type: RowActionService },
        { type: ExpandableRowsCount },
        { type: Expand },
        { type: HideableColumnService },
        { type: DisplayModeService },
        { type: ViewContainerRef },
        { type: Renderer2 },
        { type: ElementRef },
        { type: ClrCommonStrings }
    ]; };
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
    return ClrDatagridRow;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ColumnToggleButtonsService = /** @class */ (function () {
    function ColumnToggleButtonsService() {
        this.buttons = null;
        this.selectAllDisabled = false;
        this._selectAllButtonClicked = new Subject();
    }
    Object.defineProperty(ColumnToggleButtonsService.prototype, "selectAllButtonClicked", {
        get: /**
         * @return {?}
         */
        function () {
            return this._selectAllButtonClicked.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ColumnToggleButtonsService.prototype.buttonClicked = /**
     * @return {?}
     */
    function () {
        this._selectAllButtonClicked.next();
    };
    ColumnToggleButtonsService.decorators = [
        { type: Injectable }
    ];
    return ColumnToggleButtonsService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * This provider aggregates state changes from the various providers of the Datagrid
 * @template T
 */
var StateProvider = /** @class */ (function () {
    function StateProvider(filters, sort, page, debouncer) {
        var _this = this;
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
        function () { return _this.state; })));
    }
    Object.defineProperty(StateProvider.prototype, "state", {
        /*
           * By making this a getter, we open the possibility for a setter in the future.
           * It's been requested a couple times.
           */
        get: /*
             * By making this a getter, we open the possibility for a setter in the future.
             * It's been requested a couple times.
             */
        /**
         * @return {?}
         */
        function () {
            var e_1, _a;
            /** @type {?} */
            var state$$1 = {};
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
            var activeFilters = this.filters.getActiveFilters();
            if (activeFilters.length > 0) {
                state$$1.filters = [];
                try {
                    for (var activeFilters_1 = __values(activeFilters), activeFilters_1_1 = activeFilters_1.next(); !activeFilters_1_1.done; activeFilters_1_1 = activeFilters_1.next()) {
                        var filter$$1 = activeFilters_1_1.value;
                        if (filter$$1.state) {
                            state$$1.filters.push(filter$$1.state);
                        }
                        else {
                            state$$1.filters.push(filter$$1);
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (activeFilters_1_1 && !activeFilters_1_1.done && (_a = activeFilters_1.return)) _a.call(activeFilters_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            return state$$1;
        },
        enumerable: true,
        configurable: true
    });
    StateProvider.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    StateProvider.ctorParameters = function () { return [
        { type: FiltersProvider },
        { type: Sort },
        { type: Page },
        { type: StateDebouncer }
    ]; };
    return StateProvider;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * \@description
 * Internal datagrid service that holds a reference to the clr-dg-table element and exposes a method to get height.
 */
var TableSizeService = /** @class */ (function () {
    function TableSizeService(platformId) {
        this.platformId = platformId;
    }
    Object.defineProperty(TableSizeService.prototype, "tableRef", {
        get: /**
         * @return {?}
         */
        function () {
            return this._tableRef;
        },
        set: /**
         * @param {?} element
         * @return {?}
         */
        function (element) {
            this._tableRef = element;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableSizeService.prototype, "table", {
        set: /**
         * @param {?} table
         * @return {?}
         */
        function (table) {
            if (isPlatformBrowser(this.platformId) && table.nativeElement) {
                this.tableRef = table.nativeElement.querySelector('.datagrid-table');
            }
        },
        enumerable: true,
        configurable: true
    });
    // Used when resizing columns to show the column border being dragged.
    // Used when resizing columns to show the column border being dragged.
    /**
     * @return {?}
     */
    TableSizeService.prototype.getColumnDragHeight = 
    // Used when resizing columns to show the column border being dragged.
    /**
     * @return {?}
     */
    function () {
        if (!this.tableRef) {
            return;
        }
        return this.tableRef.clientHeight + "px";
    };
    TableSizeService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    TableSizeService.ctorParameters = function () { return [
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
    ]; };
    return TableSizeService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ColumnsService = /** @class */ (function () {
    function ColumnsService(organizer) {
        var _this = this;
        this.organizer = organizer;
        this.subscriptions = [];
        this.columns = [];
        this.subscriptions.push(this.organizer.filterRenderSteps(DatagridRenderStep.CLEAR_WIDTHS).subscribe((/**
         * @return {?}
         */
        function () { return _this.reset(); })));
    }
    /**
     * @return {?}
     */
    ColumnsService.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        function (sub) { return sub.unsubscribe(); }));
    };
    /**
     * @private
     * @return {?}
     */
    ColumnsService.prototype.reset = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.columns.forEach((/**
         * @param {?} column
         * @param {?} index
         * @return {?}
         */
        function (column, index) {
            _this.emitStateChange(index, { width: 0 });
        }));
    };
    // Helper method to emit a change to a column only when there is an actual diff to process for that column
    // Helper method to emit a change to a column only when there is an actual diff to process for that column
    /**
     * @param {?} columnIndex
     * @param {?} diff
     * @return {?}
     */
    ColumnsService.prototype.emitStateChange = 
    // Helper method to emit a change to a column only when there is an actual diff to process for that column
    /**
     * @param {?} columnIndex
     * @param {?} diff
     * @return {?}
     */
    function (columnIndex, diff) {
        if (!this.columns[columnIndex]) {
            return;
        }
        /** @type {?} */
        var current = this.columns[columnIndex].value;
        /** @type {?} */
        var hasChange = Object.keys(diff).filter((/**
         * @param {?} key
         * @return {?}
         */
        function (key) { return diff[key] !== current[key]; }));
        if (hasChange) {
            this.columns[columnIndex].next(__assign({}, current, diff));
        }
    };
    ColumnsService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    ColumnsService.ctorParameters = function () { return [
        { type: DatagridRenderOrganizer }
    ]; };
    return ColumnsService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
var ClrDatagrid = /** @class */ (function () {
    function ClrDatagrid(columnService, organizer, items, expandableRows, selection, rowActionService, stateProvider, displayMode, renderer, el, commonStrings) {
        this.columnService = columnService;
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
    Object.defineProperty(ClrDatagrid.prototype, "loading", {
        /**
         * Freezes the datagrid while data is loading
         */
        get: /**
         * Freezes the datagrid while data is loading
         * @return {?}
         */
        function () {
            return this.items.loading;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.items.loading = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Public method to re-trigger the computation of displayed items manually
     */
    /**
     * Public method to re-trigger the computation of displayed items manually
     * @return {?}
     */
    ClrDatagrid.prototype.dataChanged = /**
     * Public method to re-trigger the computation of displayed items manually
     * @return {?}
     */
    function () {
        this.items.refresh();
    };
    Object.defineProperty(ClrDatagrid.prototype, "selected", {
        /**
         * Array of all selected items
         */
        set: /**
         * Array of all selected items
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value) {
                this.selection.selectionType = SelectionType.Multi;
            }
            else {
                this.selection.selectionType = SelectionType.None;
            }
            this.selection.updateCurrent(value, false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagrid.prototype, "singleSelected", {
        /**
         * Selected item in single-select mode
         */
        set: /**
         * Selected item in single-select mode
         * @param {?} value
         * @return {?}
         */
        function (value) {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagrid.prototype, "rowSelectionMode", {
        /**
         * Selection/Deselection on row click mode
         */
        set: /**
         * Selection/Deselection on row click mode
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.selection.rowSelectionMode = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagrid.prototype, "allSelected", {
        /**
         * Indicates if all currently displayed items are selected
         */
        get: /**
         * Indicates if all currently displayed items are selected
         * @return {?}
         */
        function () {
            return this.selection.isAllSelected();
        },
        /**
         * Selects/deselects all currently displayed items
         * @param value
         */
        set: /**
         * Selects/deselects all currently displayed items
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /*
                 * This is a setter but we ignore the value.
                 * It's strange, but it lets us have an indeterminate state where only
                 * some of the items are selected.
                 */
            this.selection.toggleAll();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ClrDatagrid.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.items.smart) {
            this.items.all = this.rows.map((/**
             * @param {?} row
             * @return {?}
             */
            function (row) { return row.item; }));
        }
        this._subscriptions.push(this.rows.changes.subscribe((/**
         * @return {?}
         */
        function () {
            if (!_this.items.smart) {
                _this.items.all = _this.rows.map((/**
                 * @param {?} row
                 * @return {?}
                 */
                function (row) { return row.item; }));
            }
            _this.rows.forEach((/**
             * @param {?} row
             * @return {?}
             */
            function (row) {
                _this._displayedRows.insert(row._view);
            }));
        })));
        this._subscriptions.push(this.columns.changes.subscribe((/**
         * @param {?} columns
         * @return {?}
         */
        function (columns) {
            _this.columnService.updateColumnList(_this.columns.map((/**
             * @param {?} col
             * @return {?}
             */
            function (col) { return col.hideable; })));
        })));
        // Get ColumnService ready for HideableColumns.
        this.columnService.updateColumnList(this.columns.map((/**
         * @param {?} col
         * @return {?}
         */
        function (col) { return col.hideable; })));
    };
    /**
     * Our setup happens in the view of some of our components, so we wait for it to be done before starting
     */
    /**
     * Our setup happens in the view of some of our components, so we wait for it to be done before starting
     * @return {?}
     */
    ClrDatagrid.prototype.ngAfterViewInit = /**
     * Our setup happens in the view of some of our components, so we wait for it to be done before starting
     * @return {?}
     */
    function () {
        var _this = this;
        // TODO: determine if we can get rid of provider wiring in view init so that subscriptions can be done earlier
        this.refresh.emit(this.stateProvider.state);
        this._subscriptions.push(this.stateProvider.change.subscribe((/**
         * @param {?} state
         * @return {?}
         */
        function (state$$1) { return _this.refresh.emit(state$$1); })));
        this._subscriptions.push(this.selection.change.subscribe((/**
         * @param {?} s
         * @return {?}
         */
        function (s) {
            if (_this.selection.selectionType === SelectionType.Single) {
                _this.singleSelectedChanged.emit((/** @type {?} */ (s)));
            }
            else if (_this.selection.selectionType === SelectionType.Multi) {
                _this.selectedChanged.emit((/** @type {?} */ (s)));
            }
        })));
        // A subscription that listens for displayMode changes on the datagrid
        this.displayMode.view.subscribe((/**
         * @param {?} viewChange
         * @return {?}
         */
        function (viewChange) {
            // Remove any projected columns from the projectedDisplayColumns container
            for (var i = _this._projectedDisplayColumns.length; i > 0; i--) {
                _this._projectedDisplayColumns.detach();
            }
            // Remove any projected columns from the projectedCalculationColumns container
            for (var i = _this._projectedCalculationColumns.length; i > 0; i--) {
                _this._projectedCalculationColumns.detach();
            }
            // Remove any projected rows from the calculationRows container
            for (var i = _this._calculationRows.length; i > 0; i--) {
                _this._calculationRows.detach();
            }
            // Remove any projected rows from the displayedRows container
            for (var i = _this._displayedRows.length; i > 0; i--) {
                _this._displayedRows.detach();
            }
            if (viewChange === DatagridDisplayMode.DISPLAY) {
                // Set state, style for the datagrid to DISPLAY and insert row & columns into containers
                _this.renderer.removeClass(_this.el.nativeElement, 'datagrid-calculate-mode');
                _this.columns.forEach((/**
                 * @param {?} column
                 * @return {?}
                 */
                function (column) {
                    _this._projectedDisplayColumns.insert(column._view);
                }));
                _this.rows.forEach((/**
                 * @param {?} row
                 * @return {?}
                 */
                function (row) {
                    _this._displayedRows.insert(row._view);
                }));
            }
            else {
                // Set state, style for the datagrid to CALCULATE and insert row & columns into containers
                _this.renderer.addClass(_this.el.nativeElement, 'datagrid-calculate-mode');
                _this.columns.forEach((/**
                 * @param {?} column
                 * @return {?}
                 */
                function (column) {
                    _this._projectedCalculationColumns.insert(column._view);
                }));
                _this.rows.forEach((/**
                 * @param {?} row
                 * @return {?}
                 */
                function (row) {
                    _this._calculationRows.insert(row._view);
                }));
            }
        }));
    };
    /**
     * @return {?}
     */
    ClrDatagrid.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        function (sub) { return sub.unsubscribe(); }));
    };
    /**
     * @return {?}
     */
    ClrDatagrid.prototype.resize = /**
     * @return {?}
     */
    function () {
        this.organizer.resize();
    };
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
                        HideableColumnService,
                        StateDebouncer,
                        StateProvider,
                        ColumnToggleButtonsService,
                        TableSizeService,
                        ColumnsService,
                        DisplayModeService,
                    ],
                    host: { '[class.datagrid-host]': 'true' }
                }] }
    ];
    /** @nocollapse */
    ClrDatagrid.ctorParameters = function () { return [
        { type: HideableColumnService },
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
    ]; };
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
    return ClrDatagrid;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrDatagridActionBar = /** @class */ (function () {
    function ClrDatagridActionBar() {
    }
    ClrDatagridActionBar.decorators = [
        { type: Component, args: [{
                    selector: 'clr-dg-action-bar',
                    template: "\n        <ng-content></ng-content>\n    ",
                    host: { '[class.datagrid-action-bar]': 'true' }
                }] }
    ];
    return ClrDatagridActionBar;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrDatagridActionOverflow = /** @class */ (function () {
    function ClrDatagridActionOverflow(rowActionService, commonStrings) {
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
    ClrDatagridActionOverflow.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.rowActionService.unregister();
    };
    Object.defineProperty(ClrDatagridActionOverflow.prototype, "open", {
        get: /**
         * @return {?}
         */
        function () {
            return this._open;
        },
        set: /**
         * @param {?} open
         * @return {?}
         */
        function (open) {
            /** @type {?} */
            var boolOpen = !!open;
            if (boolOpen !== this._open) {
                this._open = boolOpen;
                this.openChanged.emit(boolOpen);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Shows/hides the action overflow menu
     */
    /**
     * Shows/hides the action overflow menu
     * @param {?} event
     * @return {?}
     */
    ClrDatagridActionOverflow.prototype.toggle = /**
     * Shows/hides the action overflow menu
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.openingEvent = event;
        this.open = !this.open;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    ClrDatagridActionOverflow.prototype.close = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
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
    };
    ClrDatagridActionOverflow.decorators = [
        { type: Component, args: [{
                    selector: 'clr-dg-action-overflow',
                    template: "\n        <button (click)=\"toggle($event)\" type=\"button\" class=\"datagrid-action-toggle\" #anchor>\n            <clr-icon shape=\"ellipsis-vertical\" [attr.title]=\"commonStrings.rowActions\"></clr-icon>\n        </button>\n        <ng-template [(clrPopoverOld)]=\"open\" [clrPopoverOldAnchor]=\"anchor\" [clrPopoverOldAnchorPoint]=\"anchorPoint\"\n                     [clrPopoverOldPopoverPoint]=\"popoverPoint\">\n            <div #menu class=\"datagrid-action-overflow\" (clrOutsideClick)=\"close($event)\" [clrStrict]=\"true\">\n                <ng-content></ng-content>\n            </div>\n        </ng-template>\n    "
                }] }
    ];
    /** @nocollapse */
    ClrDatagridActionOverflow.ctorParameters = function () { return [
        { type: RowActionService },
        { type: ClrCommonStrings }
    ]; };
    ClrDatagridActionOverflow.propDecorators = {
        open: [{ type: Input, args: ['clrDgActionOverflowOpen',] }],
        openChanged: [{ type: Output, args: ['clrDgActionOverflowOpenChange',] }]
    };
    return ClrDatagridActionOverflow;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var MIN_COLUMN_WIDTH = 96;
// This service allows DatagridHeaderRenderer and ClrDatagridColumnSeparator
// to share column resize data with each other.
var ColumnResizerService = /** @class */ (function () {
    function ColumnResizerService(el, domAdapter, organizer) {
        this.el = el;
        this.domAdapter = domAdapter;
        this.organizer = organizer;
        this._resizedBy = 0;
    }
    Object.defineProperty(ColumnResizerService.prototype, "resizedBy", {
        get: /**
         * @return {?}
         */
        function () {
            return this._resizedBy;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnResizerService.prototype, "minColumnWidth", {
        get: /**
         * @return {?}
         */
        function () {
            return this.domAdapter.minWidth(this.el.nativeElement) || MIN_COLUMN_WIDTH;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnResizerService.prototype, "maxResizeRange", {
        get: /**
         * @return {?}
         */
        function () {
            return this.widthBeforeResize - this.minColumnWidth;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ColumnResizerService.prototype.startResize = /**
     * @return {?}
     */
    function () {
        this._resizedBy = 0;
        this.isWithinMaxResizeRange = true;
        this.widthBeforeResize = this.domAdapter.clientRect(this.el.nativeElement).width;
    };
    /**
     * @return {?}
     */
    ColumnResizerService.prototype.endResize = /**
     * @return {?}
     */
    function () {
        this.organizer.resize();
    };
    Object.defineProperty(ColumnResizerService.prototype, "widthAfterResize", {
        get: /**
         * @return {?}
         */
        function () {
            return this.widthBeforeResize + this._resizedBy;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} event
     * @return {?}
     */
    ColumnResizerService.prototype.calculateResize = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var moveX = event.dragPosition.moveX;
        // returns the resize amount within the allowed range
        if (moveX < -this.maxResizeRange) {
            this._resizedBy = -this.maxResizeRange;
            this.isWithinMaxResizeRange = false;
        }
        else {
            this._resizedBy = moveX;
            this.isWithinMaxResizeRange = true;
        }
    };
    ColumnResizerService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    ColumnResizerService.ctorParameters = function () { return [
        { type: ElementRef },
        { type: DomAdapter },
        { type: DatagridRenderOrganizer }
    ]; };
    return ColumnResizerService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var NB_INSTANCES = 0;
/** @type {?} */
var UNIQUE_ID = new InjectionToken('UNIQUE_ID');
/**
 * @return {?}
 */
function uniqueIdFactory() {
    return 'clr-id-' + NB_INSTANCES++;
}
/** @type {?} */
var UNIQUE_ID_PROVIDER = {
    provide: UNIQUE_ID,
    useFactory: uniqueIdFactory,
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrDatagridColumnSeparator = /** @class */ (function () {
    // Every column draggable separator should have its own unique ID
    // in order to not conflict with other draggables/droppables.
    function ClrDatagridColumnSeparator(columnResizerService, renderer, tableSizeService, document, columnSeparatorId) {
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
    ClrDatagridColumnSeparator.prototype.showTracker = /**
     * @param {?} resizeTrackerEl
     * @return {?}
     */
    function (resizeTrackerEl) {
        this.columnResizerService.startResize();
        /** @type {?} */
        var tableHeight = this.tableSizeService.getColumnDragHeight();
        this.renderer.setStyle(resizeTrackerEl, 'height', tableHeight);
        this.renderer.setStyle(resizeTrackerEl, 'display', 'block');
    };
    /**
     * @param {?} event
     * @param {?} resizeTrackerEl
     * @return {?}
     */
    ClrDatagridColumnSeparator.prototype.moveTracker = /**
     * @param {?} event
     * @param {?} resizeTrackerEl
     * @return {?}
     */
    function (event, resizeTrackerEl) {
        this.columnResizerService.calculateResize(event);
        this.renderer.setStyle(resizeTrackerEl, 'transform', "translateX(" + this.columnResizerService.resizedBy + "px)");
        this.renderer.setStyle(this.document.body, 'cursor', 'col-resize');
        this.redFlagTracker(resizeTrackerEl);
    };
    /**
     * @param {?} resizeTrackerEl
     * @return {?}
     */
    ClrDatagridColumnSeparator.prototype.hideTracker = /**
     * @param {?} resizeTrackerEl
     * @return {?}
     */
    function (resizeTrackerEl) {
        this.columnResizerService.endResize();
        this.renderer.setStyle(resizeTrackerEl, 'display', 'none');
        this.renderer.setStyle(resizeTrackerEl, 'transform', "translateX(0px)");
        this.renderer.setStyle(this.document.body, 'cursor', 'auto');
    };
    /**
     * @private
     * @param {?} resizeTrackerEl
     * @return {?}
     */
    ClrDatagridColumnSeparator.prototype.redFlagTracker = /**
     * @private
     * @param {?} resizeTrackerEl
     * @return {?}
     */
    function (resizeTrackerEl) {
        /** @type {?} */
        var isWithinMaxResizeRange;
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
    };
    ClrDatagridColumnSeparator.decorators = [
        { type: Component, args: [{
                    selector: 'clr-dg-column-separator',
                    template: "\n    <div class=\"datagrid-column-handle\" aria-hidden=\"true\"\n      clrDraggable \n      [clrGroup]=\"columnSeparatorId\" \n      (clrDragStart)=\"showTracker(resizeTrackerEl)\" \n      (clrDragMove)=\"moveTracker($event, resizeTrackerEl)\" \n      (clrDragEnd)=\"hideTracker(resizeTrackerEl)\"></div>\n    <div class=\"datagrid-column-resize-tracker\" #resizeTrackerEl></div>\n    ",
                    host: {
                        '[class.datagrid-column-separator]': 'true',
                    },
                    providers: [UNIQUE_ID_PROVIDER]
                }] }
    ];
    /** @nocollapse */
    ClrDatagridColumnSeparator.ctorParameters = function () { return [
        { type: ColumnResizerService },
        { type: Renderer2 },
        { type: TableSizeService },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
        { type: String, decorators: [{ type: Inject, args: [UNIQUE_ID,] }] }
    ]; };
    return ClrDatagridColumnSeparator;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrDatagridColumnToggleButton = /** @class */ (function () {
    function ClrDatagridColumnToggleButton(toggleButtons) {
        this.toggleButtons = toggleButtons;
    }
    ClrDatagridColumnToggleButton.decorators = [
        { type: Component, args: [{
                    selector: 'clr-dg-column-toggle-button',
                    template: "\n        <button class=\"btn btn-sm btn-link\"\n            (click)=\"toggleButtons.buttonClicked()\"\n            [disabled]=\"toggleButtons.selectAllDisabled\"\n            type=\"button\">\n            <ng-content></ng-content>\n        </button>\n    "
                }] }
    ];
    /** @nocollapse */
    ClrDatagridColumnToggleButton.ctorParameters = function () { return [
        { type: ColumnToggleButtonsService }
    ]; };
    return ClrDatagridColumnToggleButton;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrDatagridColumnToggleTitle = /** @class */ (function () {
    function ClrDatagridColumnToggleTitle() {
    }
    ClrDatagridColumnToggleTitle.decorators = [
        { type: Component, args: [{
                    selector: 'clr-dg-column-toggle-title',
                    template: "<ng-content></ng-content>"
                }] }
    ];
    return ClrDatagridColumnToggleTitle;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrDatagridColumnToggle = /** @class */ (function () {
    function ClrDatagridColumnToggle(hideableColumnService, columnToggleButtons, commonStrings) {
        this.hideableColumnService = hideableColumnService;
        this.columnToggleButtons = columnToggleButtons;
        this.commonStrings = commonStrings;
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
    Object.defineProperty(ClrDatagridColumnToggle.prototype, "allColumnsVisible", {
        get: /**
         * @return {?}
         */
        function () {
            return this._allColumnsVisible;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._allColumnsVisible = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ClrDatagridColumnToggle.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.subscriptions.push(this.hideableColumnService.columnListChange.subscribe((/**
         * @param {?} columnList
         * @return {?}
         */
        function (columnList) {
            // Reset the list of columns
            _this.columns.length = 0;
            _this.hideableColumnService.updateForLastVisibleColumn();
            _this.allColumnsVisible = _this.hideableColumnService.checkForAllColumnsVisible;
            _this.columnToggleButtons.selectAllDisabled = _this.allColumnsVisible;
            // Add only the hidden columns to the toggler.
            columnList.forEach((/**
             * @param {?} col
             * @return {?}
             */
            function (col) {
                if (col) {
                    _this.columns.push(col);
                }
            }));
        })));
        this.subscriptions.push(this.columnToggleButtons.selectAllButtonClicked.subscribe((/**
         * @return {?}
         */
        function () {
            _this.selectAll();
        })));
    };
    /**
     * @return {?}
     */
    ClrDatagridColumnToggle.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        function (sub) { return sub.unsubscribe(); }));
    };
    /**
     * @return {?}
     */
    ClrDatagridColumnToggle.prototype.selectAll = /**
     * @return {?}
     */
    function () {
        this.hideableColumnService.showHiddenColumns();
        this.allColumnsVisible = this.hideableColumnService.checkForAllColumnsVisible;
        this.columnToggleButtons.selectAllDisabled = this.allColumnsVisible;
    };
    /**
     * @param {?} event
     * @param {?} column
     * @return {?}
     */
    ClrDatagridColumnToggle.prototype.toggleColumn = /**
     * @param {?} event
     * @param {?} column
     * @return {?}
     */
    function (event, column) {
        column.hidden = !event;
        this.allColumnsVisible = this.hideableColumnService.checkForAllColumnsVisible;
        this.columnToggleButtons.selectAllDisabled = this.allColumnsVisible;
        this.hideableColumnService.updateForLastVisibleColumn();
    };
    /**
     * @return {?}
     */
    ClrDatagridColumnToggle.prototype.toggleUI = /**
     * @return {?}
     */
    function () {
        this.open = !this.open;
    };
    ClrDatagridColumnToggle.decorators = [
        { type: Component, args: [{
                    selector: 'clr-dg-column-toggle',
                    template: "\n        <button\n                #anchor\n                (click)=\"toggleUI()\"\n                class=\"btn btn-sm btn-link column-toggle--action\"\n                type=\"button\">\n            <clr-icon shape=\"view-columns\" [attr.title]=\"commonStrings.pickColumns\"></clr-icon>\n        </button>\n        <div class=\"column-switch\"\n             *clrPopoverOld=\"open; anchor: anchor; anchorPoint: anchorPoint; popoverPoint: popoverPoint\">\n            <div class=\"switch-header\">\n                <ng-container *ngIf=\"!title\">Show Columns</ng-container>\n                <ng-content select=\"clr-dg-column-toggle-title\"></ng-content>\n                <button\n                    class=\"btn btn-sm btn-link\"\n                    (click)=\"toggleUI()\"\n                    type=\"button\">\n                    <clr-icon shape=\"close\" [attr.title]=\"commonStrings.close\"></clr-icon>\n                </button>\n            </div>\n            <ul class=\"switch-content list-unstyled\">\n                <li *ngFor=\"let column of columns\">\n                    <clr-checkbox-wrapper>\n                        <input clrCheckbox type=\"checkbox\"\n                          [disabled]=\"column.lastVisibleColumn\"\n                          [ngModel]=\"!column.hidden\"\n                          (ngModelChange)=\"toggleColumn($event, column)\">\n                        <label><ng-template [ngTemplateOutlet]=\"column.template\"></ng-template></label>\n                    </clr-checkbox-wrapper>\n                </li>\n            </ul>\n            <div class=\"switch-footer\" *ngIf=\"buttons.length > 0\">\n                <ng-content select=\"clr-dg-column-toggle-button\"></ng-content>\n            </div>\n            <div class=\"switch-footer\" *ngIf=\"buttons.length === 0\">\n                <div>\n                    <button\n                            class=\"btn btn-sm btn-link p6 text-uppercase\"\n                            [disabled]=\"allColumnsVisible\"\n                            (click)=\"selectAll()\"\n                            type=\"button\">Select All\n                    </button>\n                </div>\n            </div>\n        </div>\n    ",
                    host: { '[class.column-switch-wrapper]': 'true', '[class.active]': 'open' }
                }] }
    ];
    /** @nocollapse */
    ClrDatagridColumnToggle.ctorParameters = function () { return [
        { type: HideableColumnService },
        { type: ColumnToggleButtonsService },
        { type: ClrCommonStrings }
    ]; };
    ClrDatagridColumnToggle.propDecorators = {
        title: [{ type: ContentChild, args: [ClrDatagridColumnToggleTitle,] }],
        buttons: [{ type: ContentChildren, args: [ClrDatagridColumnToggleButton,] }]
    };
    return ClrDatagridColumnToggle;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * I don't think this deserves to be in IfExpanded itself,
 * so I'm adding a second directive on the same selector for now just for the datagrid
 */
var DatagridDetailRegisterer = /** @class */ (function () {
    function DatagridDetailRegisterer(expandableRowsCount) {
        this.expandableRowsCount = expandableRowsCount;
        if (this.expandableRowsCount) {
            this.expandableRowsCount.register();
        }
    }
    /**
     * @return {?}
     */
    DatagridDetailRegisterer.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.expandableRowsCount) {
            this.expandableRowsCount.unregister();
        }
    };
    DatagridDetailRegisterer.decorators = [
        { type: Directive, args: [{ selector: '[clrIfExpanded]' },] }
    ];
    /** @nocollapse */
    DatagridDetailRegisterer.ctorParameters = function () { return [
        { type: ExpandableRowsCount, decorators: [{ type: Optional }] }
    ]; };
    return DatagridDetailRegisterer;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
var ClrDatagridFooter = /** @class */ (function () {
    function ClrDatagridFooter(selection, hideableColumnService, cdr) {
        this.selection = selection;
        this.hideableColumnService = hideableColumnService;
        this.cdr = cdr;
        this.subscriptions = [];
        /* reference to the enum so that template can access */
        this.SELECTION_TYPE = SelectionType;
    }
    /**
     * @return {?}
     */
    ClrDatagridFooter.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.subscriptions.push(this.hideableColumnService.columnListChange.subscribe((/**
         * @param {?} change
         * @return {?}
         */
        function (change) {
            /** @type {?} */
            var hiddenColumnsInSub = change.filter((/**
             * @param {?} col
             * @return {?}
             */
            function (col) { return col; }));
            if (hiddenColumnsInSub.length > 0) {
                _this.activeToggler = true;
            }
        })));
        /** @type {?} */
        var hiddenColumns = this.hideableColumnService.getColumns().filter((/**
         * @param {?} col
         * @return {?}
         */
        function (col) { return col; }));
        if (hiddenColumns.length > 0) {
            this.activeToggler = true;
        }
    };
    /**
     * @return {?}
     */
    ClrDatagridFooter.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        function (sub) {
            sub.unsubscribe();
        }));
    };
    ClrDatagridFooter.decorators = [
        { type: Component, args: [{
                    selector: 'clr-dg-footer',
                    template: "\n        <ng-container\n            *ngIf=\"(selection.selectionType === SELECTION_TYPE.Multi) && (selection.current.length > 0)\">\n          <div class=\"clr-form-control-disabled\">\n              <clr-checkbox-wrapper class=\"datagrid-footer-select\">\n                <input clrCheckbox type=\"checkbox\" checked=\"checked\" disabled>\n                <label>{{selection.current.length}}</label>\n            </clr-checkbox-wrapper>\n          </div>\n        </ng-container>\n        <ng-content select=\"clr-dg-column-toggle\"></ng-content>\n        <clr-dg-column-toggle *ngIf=\"!toggle && activeToggler\"></clr-dg-column-toggle>\n        <div class=\"datagrid-footer-description\">\n            <ng-content></ng-content>\n        </div>\n        <ng-content select=\"clr-dg-pagination\"></ng-content>\n    ",
                    host: {
                        '[class.datagrid-footer]': 'true',
                    }
                }] }
    ];
    /** @nocollapse */
    ClrDatagridFooter.ctorParameters = function () { return [
        { type: Selection },
        { type: HideableColumnService },
        { type: ChangeDetectorRef }
    ]; };
    ClrDatagridFooter.propDecorators = {
        toggle: [{ type: ContentChild, args: [ClrDatagridColumnToggle,] }]
    };
    return ClrDatagridFooter;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 *
 * \@description
 * A utility class for that adds hide/show functionality to a column, its cells and enables a toggler in the
 * DatagridColumnToggle Component.
 *
 */
var /**
 *
 * \@description
 * A utility class for that adds hide/show functionality to a column, its cells and enables a toggler in the
 * DatagridColumnToggle Component.
 *
 */
DatagridHideableColumnModel = /** @class */ (function () {
    /**
     *
     * @description
     * The init function for DatagridHideableColumnModel instances that does the following:
     *
     * 1. Set values for the private variables that enable a hideable column
     * 2. Broadcast the next hidden change for anyone (already) subscribed to this DatagridHideableColumnModel
     *
     */
    function DatagridHideableColumnModel(_template, _id, _hidden) {
        if (_hidden === void 0) { _hidden = false; }
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
        // Flag this true when the service only has one visible column open.
        this.lastVisibleColumn = false;
    }
    Object.defineProperty(DatagridHideableColumnModel.prototype, "template", {
        /**
         *
         * @description
         * A getter function that returns an TemplateRef of the DatagridColumn that is hideable. This is currently used to
         * populate the DatagridColumnToggle UI with the correct Column name.
         *
         */
        get: /**
         *
         * \@description
         * A getter function that returns an TemplateRef of the DatagridColumn that is hideable. This is currently used to
         * populate the DatagridColumnToggle UI with the correct Column name.
         *
         * @return {?}
         */
        function () {
            return this._template;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatagridHideableColumnModel.prototype, "id", {
        /**
         *
         * @description
         * public function that returns the id of a HideableCOlumn instance. Used by the HideableCOlumnService for passing
         * state and actions between DateGridColumns, DataGridCells & the DatagridColumnToggle Components.
         *
         */
        get: /**
         *
         * \@description
         * public function that returns the id of a HideableCOlumn instance. Used by the HideableCOlumnService for passing
         * state and actions between DateGridColumns, DataGridCells & the DatagridColumnToggle Components.
         *
         * @return {?}
         */
        function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatagridHideableColumnModel.prototype, "hidden", {
        /**
         *
         * @description
         * A getter that returns the hidden value of a DatagridHideableColumnModel instance.
         *
         */
        get: /**
         *
         * \@description
         * A getter that returns the hidden value of a DatagridHideableColumnModel instance.
         *
         * @return {?}
         */
        function () {
            return this._hidden;
        },
        /**
         *
         * @description
         * The setter for setting the hidden state of a DatagridHideableColumnModel instance.
         * It also broadcasts the change after its set.
         *
         */
        set: /**
         *
         * \@description
         * The setter for setting the hidden state of a DatagridHideableColumnModel instance.
         * It also broadcasts the change after its set.
         *
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (this._hidden === value) {
                return;
            }
            this._hidden = value;
            this.hiddenChangesState.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatagridHideableColumnModel.prototype, "hiddenChangeState", {
        /**
         *
         * @description
         * An Observable for the HideableColumns hidden changes.
         *
         */
        get: /**
         *
         * \@description
         * An Observable for the HideableColumns hidden changes.
         *
         * @return {?}
         */
        function () {
            return this.hiddenChangesState.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    return DatagridHideableColumnModel;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrDatagridHideableColumn = /** @class */ (function () {
    /**
     * @description
     * Used the DatagridColumn to get and set an id for this HiddenColumn
     *
     */
    function ClrDatagridHideableColumn(templateRef, viewContainerRef, dgColumn) {
        var _this = this;
        this.templateRef = templateRef;
        this.viewContainerRef = viewContainerRef;
        this.dgColumn = dgColumn;
        this.hiddenChange = new EventEmitter();
        this.columnId = dgColumn.columnId;
        // Use the templateRef to create this view
        this.viewContainerRef.createEmbeddedView(this.templateRef);
        // Create instance of the utility class DatagridHideableColumn.
        // Note this is on the parent instance of DatagridColumn.
        this.dgColumn.hideable = new DatagridHideableColumnModel(this.templateRef, this.columnId, this._hidden);
        this.dgColumn.hideable.hiddenChangeState.subscribe((/**
         * @param {?} state
         * @return {?}
         */
        function (state$$1) { return _this.hiddenChange.emit(state$$1); }));
    }
    Object.defineProperty(ClrDatagridHideableColumn.prototype, "clrDgHideableColumn", {
        /**
         *
         * @description
         * Setter fn for the @Input with the same name as this structural directive.
         * It allows the user to pre-configure the column's hide/show state. { hidden: true }
         * It's more verbose but has more Clarity.
         *
         *
         * @example
         * *clrDgHideableColumn
         * *clrDgHideableColumn={hidden: false}
         * *clrDgHideableColumn={hidden: true}
         *
         */
        set: /**
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
        function (value) {
            this.clrDgHidden = value && value.hidden ? value.hidden : false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridHideableColumn.prototype, "clrDgHidden", {
        set: /**
         * @param {?} hidden
         * @return {?}
         */
        function (hidden) {
            this._hidden = hidden ? hidden : false;
            if (this.dgColumn.hideable) {
                this.dgColumn.hideable.hidden = this._hidden;
            }
        },
        enumerable: true,
        configurable: true
    });
    ClrDatagridHideableColumn.decorators = [
        { type: Directive, args: [{ selector: '[clrDgHideableColumn]' },] }
    ];
    /** @nocollapse */
    ClrDatagridHideableColumn.ctorParameters = function () { return [
        { type: TemplateRef },
        { type: ViewContainerRef },
        { type: ClrDatagridColumn }
    ]; };
    ClrDatagridHideableColumn.propDecorators = {
        clrDgHideableColumn: [{ type: Input, args: ['clrDgHideableColumn',] }],
        clrDgHidden: [{ type: Input, args: ['clrDgHidden',] }],
        hiddenChange: [{ type: Output, args: ['clrDgHiddenChange',] }]
    };
    return ClrDatagridHideableColumn;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
var ClrDatagridItemsTrackBy = /** @class */ (function () {
    function ClrDatagridItemsTrackBy(_items) {
        this._items = _items;
    }
    Object.defineProperty(ClrDatagridItemsTrackBy.prototype, "trackBy", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (this._items) {
                this._items.trackBy = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    ClrDatagridItemsTrackBy.decorators = [
        { type: Directive, args: [{
                    selector: '[ngForTrackBy]',
                },] }
    ];
    /** @nocollapse */
    ClrDatagridItemsTrackBy.ctorParameters = function () { return [
        { type: Items, decorators: [{ type: Optional }] }
    ]; };
    ClrDatagridItemsTrackBy.propDecorators = {
        trackBy: [{ type: Input, args: ['ngForTrackBy',] }]
    };
    return ClrDatagridItemsTrackBy;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrDatagridPageSize = /** @class */ (function () {
    function ClrDatagridPageSize(page) {
        this.page = page;
    }
    /**
     * @return {?}
     */
    ClrDatagridPageSize.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (!this.pageSizeOptions || this.pageSizeOptions.length === 0) {
            this.pageSizeOptions = [this.page.size];
        }
    };
    ClrDatagridPageSize.decorators = [
        { type: Component, args: [{
                    selector: 'clr-dg-page-size',
                    template: "\n    <ng-content></ng-content>\n    <div class=\"clr-select-wrapper\">\n      <select [class.clr-page-size-select]=\"true\" [(ngModel)]=\"page.size\">\n        <option *ngFor=\"let option of pageSizeOptions\" [ngValue]=\"option\">{{option}}</option>\n      </select>\n    </div>\n  "
                }] }
    ];
    /** @nocollapse */
    ClrDatagridPageSize.ctorParameters = function () { return [
        { type: Page }
    ]; };
    ClrDatagridPageSize.propDecorators = {
        pageSizeOptions: [{ type: Input, args: ['clrPageSizeOptions',] }]
    };
    return ClrDatagridPageSize;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrDatagridPagination = /** @class */ (function () {
    function ClrDatagridPagination(page) {
        this.page = page;
        this.currentChanged = new EventEmitter(false);
        this.page.activated = true;
    }
    /**********
     * Subscription to the Page service for page changes.
     * Note: this only emits after the datagrid is initialized/stabalized and the page changes.
     */
    /**
     * *******
     * Subscription to the Page service for page changes.
     * Note: this only emits after the datagrid is initialized/stabalized and the page changes.
     * @return {?}
     */
    ClrDatagridPagination.prototype.ngOnInit = /**
     * *******
     * Subscription to the Page service for page changes.
     * Note: this only emits after the datagrid is initialized/stabalized and the page changes.
     * @return {?}
     */
    function () {
        var _this = this;
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
        function (current) { return _this.currentChanged.emit(current); }));
    };
    /**
     * @return {?}
     */
    ClrDatagridPagination.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.page.resetPageSize();
        if (this._pageSubscription) {
            this._pageSubscription.unsubscribe();
        }
    };
    Object.defineProperty(ClrDatagridPagination.prototype, "pageSize", {
        /**
         * Page size
         */
        get: /**
         * Page size
         * @return {?}
         */
        function () {
            return this.page.size;
        },
        set: /**
         * @param {?} size
         * @return {?}
         */
        function (size) {
            if (typeof size === 'number') {
                this.page.size = size;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridPagination.prototype, "totalItems", {
        /**
         * Total items (needed to guess the last page)
         */
        get: /**
         * Total items (needed to guess the last page)
         * @return {?}
         */
        function () {
            return this.page.totalItems;
        },
        set: /**
         * @param {?} total
         * @return {?}
         */
        function (total) {
            if (typeof total === 'number') {
                this.page.totalItems = total;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridPagination.prototype, "lastPage", {
        /**
         * Last page
         */
        get: /**
         * Last page
         * @return {?}
         */
        function () {
            return this.page.last;
        },
        set: /**
         * @param {?} last
         * @return {?}
         */
        function (last) {
            if (typeof last === 'number') {
                this.page.last = last;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridPagination.prototype, "currentPage", {
        /**
         * Current page
         */
        get: /**
         * Current page
         * @return {?}
         */
        function () {
            return this.page.current;
        },
        set: /**
         * @param {?} page
         * @return {?}
         */
        function (page) {
            if (typeof page === 'number') {
                this.page.current = page;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Moves to the previous page if it exists
     */
    /**
     * Moves to the previous page if it exists
     * @return {?}
     */
    ClrDatagridPagination.prototype.previous = /**
     * Moves to the previous page if it exists
     * @return {?}
     */
    function () {
        this.page.previous();
    };
    /**
     * Moves to the next page if it exists
     */
    /**
     * Moves to the next page if it exists
     * @return {?}
     */
    ClrDatagridPagination.prototype.next = /**
     * Moves to the next page if it exists
     * @return {?}
     */
    function () {
        this.page.next();
    };
    Object.defineProperty(ClrDatagridPagination.prototype, "firstItem", {
        /**
         * Index of the first item displayed on the current page, starting at 0
         */
        get: /**
         * Index of the first item displayed on the current page, starting at 0
         * @return {?}
         */
        function () {
            return this.page.firstItem;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridPagination.prototype, "lastItem", {
        /**
         * Index of the last item displayed on the current page, starting at 0
         */
        get: /**
         * Index of the last item displayed on the current page, starting at 0
         * @return {?}
         */
        function () {
            return this.page.lastItem;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridPagination.prototype, "middlePages", {
        /**
         * Conditionally adds page numbers before and after the current page
         */
        get: /**
         * Conditionally adds page numbers before and after the current page
         * @return {?}
         */
        function () {
            /** @type {?} */
            var middlePages = [];
            if (this.page.current > 1) {
                middlePages.push(this.page.current - 1);
            }
            middlePages.push(this.page.current);
            if (this.page.current < this.page.last) {
                middlePages.push(this.page.current + 1);
            }
            return middlePages;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * We only update the pagination's current page on blur of the input field, or
     * when they press enter.
     */
    /**
     * We only update the pagination's current page on blur of the input field, or
     * when they press enter.
     * @param {?} event
     * @return {?}
     */
    ClrDatagridPagination.prototype.updateCurrentPage = /**
     * We only update the pagination's current page on blur of the input field, or
     * when they press enter.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var parsed = parseInt(event.target.value, 10);
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
    };
    ClrDatagridPagination.decorators = [
        { type: Component, args: [{
                    selector: 'clr-dg-pagination',
                    template: "\n    <div class=\"pagination-size\" *ngIf=\"_pageSizeComponent\">\n      <ng-content select=\"clr-dg-page-size\"></ng-content>\n    </div>\n    <div class=\"pagination-description\">\n      <ng-content></ng-content>\n    </div>\n    <div class=\"pagination-list\" *ngIf=\"page.last > 1\">\n      <button type=\"button\" class=\"pagination-first\" [disabled]=\"page.current <= 1\" (click)=\"page.current = 1\">\n        <clr-icon shape=\"step-forward-2 down\"></clr-icon>\n      </button>\n      <button type=\"button\" class=\"pagination-previous\" [disabled]=\"page.current <= 1\" (click)=\"page.current = page.current - 1\">\n        <clr-icon shape=\"angle left\"></clr-icon>\n      </button>\n      <input #currentPageInput type=\"text\" class=\"pagination-current\" [size]=\"page.last.toString().length\" [value]=\"page.current\"\n             (keydown.enter)=\"updateCurrentPage($event)\" (blur)=\"updateCurrentPage($event)\"/>&nbsp;/&nbsp;<span>{{page.last}}</span>\n      <button type=\"button\" class=\"pagination-next\" [disabled]=\"page.current >= page.last\" (click)=\"page.current = page.current + 1\">\n        <clr-icon shape=\"angle right\"></clr-icon>\n      </button>\n      <button type=\"button\" class=\"pagination-last\" [disabled]=\"page.current >= page.last\" (click)=\"page.current = page.last\">\n        <clr-icon shape=\"step-forward-2 up\"></clr-icon>\n      </button>\n    </div>\n    ",
                    host: { '[class.pagination]': 'true' }
                }] }
    ];
    /** @nocollapse */
    ClrDatagridPagination.ctorParameters = function () { return [
        { type: Page }
    ]; };
    ClrDatagridPagination.propDecorators = {
        _pageSizeComponent: [{ type: ContentChild, args: [ClrDatagridPageSize,] }],
        currentPageInputRef: [{ type: ViewChild, args: ['currentPageInput',] }],
        pageSize: [{ type: Input, args: ['clrDgPageSize',] }],
        totalItems: [{ type: Input, args: ['clrDgTotalItems',] }],
        lastPage: [{ type: Input, args: ['clrDgLastPage',] }],
        currentPage: [{ type: Input, args: ['clrDgPage',] }],
        currentChanged: [{ type: Output, args: ['clrDgPageChange',] }]
    };
    return ClrDatagridPagination;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Generic bland container serving various purposes for Datagrid.
 * For instance, it can help span a text over multiple rows in detail view.
 * @template T
 */
var ClrDatagridRowDetail = /** @class */ (function () {
    function ClrDatagridRowDetail(selection, rowActionService, expand, hideableColumnService, expandableRows) {
        this.selection = selection;
        this.rowActionService = rowActionService;
        this.expand = expand;
        this.hideableColumnService = hideableColumnService;
        this.expandableRows = expandableRows;
        /* reference to the enum so that template can access it */
        this.SELECTION_TYPE = SelectionType;
        this.subscriptions = [];
        this.replacedRow = false;
    }
    Object.defineProperty(ClrDatagridRowDetail.prototype, "replace", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.expand.setReplace(!!value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ClrDatagridRowDetail.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var columnsList = this.hideableColumnService.getColumns();
        this.updateCellsForColumns(columnsList);
        // Triggered when the Cells list changes per row-renderer
        this.subscriptions.push(this.cells.changes.subscribe((/**
         * @param {?} cellList
         * @return {?}
         */
        function (cellList) {
            /** @type {?} */
            var columnList = _this.hideableColumnService.getColumns();
            if (cellList.length === columnList.length) {
                _this.updateCellsForColumns(columnList);
            }
        })));
        // Used to set things up the first time but only after all the columns are ready.
        this.subscriptions.push(this.hideableColumnService.columnListChange.subscribe((/**
         * @param {?} columnList
         * @return {?}
         */
        function (columnList) {
            // Prevents cell updates when cols and cells array are not aligned
            if (columnList.length === _this.cells.length) {
                _this.updateCellsForColumns(columnList);
            }
        })));
        this.subscriptions.push(this.expand.replace.subscribe((/**
         * @param {?} replaceChange
         * @return {?}
         */
        function (replaceChange) {
            _this.replacedRow = replaceChange;
        })));
    };
    /**
     * @param {?} columnList
     * @return {?}
     */
    ClrDatagridRowDetail.prototype.updateCellsForColumns = /**
     * @param {?} columnList
     * @return {?}
     */
    function (columnList) {
        this.cells.forEach((/**
         * @param {?} cell
         * @param {?} index
         * @return {?}
         */
        function (cell, index) {
            /** @type {?} */
            var currentColumn = columnList[index];
            if (currentColumn) {
                cell.id = currentColumn.id;
            }
        }));
    };
    /**
     * @return {?}
     */
    ClrDatagridRowDetail.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        function (sub) { return sub.unsubscribe(); }));
    };
    ClrDatagridRowDetail.decorators = [
        { type: Component, args: [{
                    selector: 'clr-dg-row-detail',
                    template: "\n        <ng-container *ngIf=\"!replacedRow\">\n            <!-- space for multiselection state -->\n            <div class=\"datagrid-cell datagrid-select datagrid-fixed-column\"\n                *ngIf=\"selection.selectionType === SELECTION_TYPE.Multi\">\n            </div>\n            <!-- space for single selection state -->\n            <div class=\"datagrid-cell datagrid-select datagrid-fixed-column\"\n                *ngIf=\"selection.selectionType === SELECTION_TYPE.Single\">\n            </div>\n            <!-- space for single row action; only displayType if we have at least one actionable row in datagrid -->\n            <div class=\"datagrid-cell datagrid-row-actions datagrid-fixed-column\"\n                *ngIf=\"rowActionService.hasActionableRow\">\n            </div>\n            <!-- space for expandable caret action; only displayType if we have at least one expandable row in datagrid -->\n            <div *ngIf=\"expandableRows.hasExpandableRow\"\n                        class=\"datagrid-expandable-caret datagrid-fixed-column datagrid-cell\">\n            </div>\n        </ng-container>\n        <ng-content></ng-content>\n    ",
                    host: {
                        '[class.datagrid-row-flex]': 'true',
                        '[class.datagrid-row-detail]': 'true',
                        '[class.datagrid-container]': 'cells.length === 0',
                    }
                }] }
    ];
    /** @nocollapse */
    ClrDatagridRowDetail.ctorParameters = function () { return [
        { type: Selection },
        { type: RowActionService },
        { type: Expand },
        { type: HideableColumnService },
        { type: ExpandableRowsCount }
    ]; };
    ClrDatagridRowDetail.propDecorators = {
        cells: [{ type: ContentChildren, args: [ClrDatagridCell,] }],
        replace: [{ type: Input, args: ['clrDgReplace',] }]
    };
    return ClrDatagridRowDetail;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var STRICT_WIDTH_CLASS = 'datagrid-fixed-width';

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
var DatagridColumnChanges = {
    WIDTH: 0,
};
DatagridColumnChanges[DatagridColumnChanges.WIDTH] = 'WIDTH';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DatagridCellRenderer = /** @class */ (function () {
    function DatagridCellRenderer(el, renderer, organizer) {
        var _this = this;
        this.el = el;
        this.renderer = renderer;
        this.subscriptions = [];
        this.subscriptions.push(organizer.filterRenderSteps(DatagridRenderStep.CLEAR_WIDTHS).subscribe((/**
         * @return {?}
         */
        function () { return _this.clearWidth(); })));
    }
    Object.defineProperty(DatagridCellRenderer.prototype, "columnState", {
        // @TODO(JEREMY) Work out how to dedupe some of this code between header and cell renderers
        set: 
        // @TODO(JEREMY) Work out how to dedupe some of this code between header and cell renderers
        /**
         * @param {?} columnState
         * @return {?}
         */
        function (columnState) {
            var _this = this;
            if (this.stateSubscription) {
                this.stateSubscription.unsubscribe();
            }
            this.stateSubscription = columnState.subscribe((/**
             * @param {?} state
             * @return {?}
             */
            function (state$$1) { return _this.stateChanges(state$$1); }));
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DatagridCellRenderer.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        function (sub) { return sub.unsubscribe(); }));
        if (this.stateSubscription) {
            this.stateSubscription.unsubscribe();
        }
    };
    /**
     * @private
     * @param {?} state
     * @return {?}
     */
    DatagridCellRenderer.prototype.stateChanges = /**
     * @private
     * @param {?} state
     * @return {?}
     */
    function (state$$1) {
        var _this = this;
        if (state$$1.changes && state$$1.changes.length) {
            state$$1.changes.forEach((/**
             * @param {?} change
             * @return {?}
             */
            function (change) {
                switch (change) {
                    case DatagridColumnChanges.WIDTH:
                        _this.setWidth(state$$1);
                        break;
                    default:
                        break;
                }
            }));
        }
    };
    /**
     * @private
     * @return {?}
     */
    DatagridCellRenderer.prototype.clearWidth = /**
     * @private
     * @return {?}
     */
    function () {
        this.renderer.removeClass(this.el.nativeElement, STRICT_WIDTH_CLASS);
        this.renderer.setStyle(this.el.nativeElement, 'width', null);
    };
    /**
     * @private
     * @param {?} state
     * @return {?}
     */
    DatagridCellRenderer.prototype.setWidth = /**
     * @private
     * @param {?} state
     * @return {?}
     */
    function (state$$1) {
        if (state$$1.strictWidth) {
            this.renderer.addClass(this.el.nativeElement, STRICT_WIDTH_CLASS);
        }
        else {
            this.renderer.removeClass(this.el.nativeElement, STRICT_WIDTH_CLASS);
        }
        this.renderer.setStyle(this.el.nativeElement, 'width', state$$1.width + 'px');
    };
    DatagridCellRenderer.decorators = [
        { type: Directive, args: [{ selector: 'clr-dg-cell' },] }
    ];
    /** @nocollapse */
    DatagridCellRenderer.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: DatagridRenderOrganizer }
    ]; };
    return DatagridCellRenderer;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var COLUMN_STATE = new InjectionToken('COLUMN_STATE');
/** @type {?} */
var initialColumnState = {
    changes: [],
};
/**
 * @return {?}
 */
function columnStateFactory() {
    return new BehaviorSubject(initialColumnState);
}
/** @type {?} */
var COLUMN_STATE_PROVIDER = {
    provide: COLUMN_STATE,
    useFactory: columnStateFactory,
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DatagridHeaderRenderer = /** @class */ (function () {
    function DatagridHeaderRenderer(el, renderer, organizer, domAdapter, columnResizerService, columnState) {
        var _this = this;
        this.el = el;
        this.renderer = renderer;
        this.organizer = organizer;
        this.domAdapter = domAdapter;
        this.columnResizerService = columnResizerService;
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
        function () { return _this.clearWidth(); })));
        this.subscriptions.push(this.organizer
            .filterRenderSteps(DatagridRenderStep.DETECT_STRICT_WIDTHS)
            .subscribe((/**
         * @return {?}
         */
        function () { return _this.detectStrictWidth(); })));
        this.subscriptions.push(columnState.subscribe((/**
         * @param {?} state
         * @return {?}
         */
        function (state$$1) { return _this.stateChanges(state$$1); })));
    }
    /**
     * @return {?}
     */
    DatagridHeaderRenderer.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        function (sub) { return sub.unsubscribe(); }));
    };
    /**
     * @private
     * @param {?} state
     * @return {?}
     */
    DatagridHeaderRenderer.prototype.stateChanges = /**
     * @private
     * @param {?} state
     * @return {?}
     */
    function (state$$1) {
        var _this = this;
        if (state$$1.changes && state$$1.changes.length) {
            state$$1.changes.forEach((/**
             * @param {?} change
             * @return {?}
             */
            function (change) {
                switch (change) {
                    case DatagridColumnChanges.WIDTH:
                        _this.setWidth(state$$1);
                        break;
                    default:
                        break;
                }
            }));
        }
    };
    /**
     * @private
     * @return {?}
     */
    DatagridHeaderRenderer.prototype.clearWidth = /**
     * @private
     * @return {?}
     */
    function () {
        // remove the width only if we set it, and it is not changed by dragging.
        if (this.widthSet && !this.columnResizerService.resizedBy) {
            this.renderer.setStyle(this.el.nativeElement, 'width', null);
        }
        if (this.autoSet) {
            this.renderer.removeClass(this.el.nativeElement, STRICT_WIDTH_CLASS);
        }
    };
    /**
     * @private
     * @return {?}
     */
    DatagridHeaderRenderer.prototype.detectStrictWidth = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.columnResizerService.resizedBy) {
            return this.columnResizerService.widthAfterResize;
        }
        else if (this.autoSet) {
            return 0;
        }
        else {
            return this.domAdapter.userDefinedWidth(this.el.nativeElement);
        }
    };
    /**
     * @private
     * @param {?} strictWidth
     * @return {?}
     */
    DatagridHeaderRenderer.prototype.computeWidth = /**
     * @private
     * @param {?} strictWidth
     * @return {?}
     */
    function (strictWidth) {
        /** @type {?} */
        var width = strictWidth;
        if (!width) {
            width = this.domAdapter.scrollWidth(this.el.nativeElement);
        }
        return width;
    };
    /**
     * @return {?}
     */
    DatagridHeaderRenderer.prototype.getColumnWidthState = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var strictWidth = this.detectStrictWidth();
        return {
            width: this.computeWidth(strictWidth),
            strictWidth: strictWidth,
        };
    };
    /**
     * @private
     * @param {?} state
     * @return {?}
     */
    DatagridHeaderRenderer.prototype.setWidth = /**
     * @private
     * @param {?} state
     * @return {?}
     */
    function (state$$1) {
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
    };
    DatagridHeaderRenderer.decorators = [
        { type: Directive, args: [{ selector: 'clr-dg-column', providers: [ColumnResizerService, COLUMN_STATE_PROVIDER] },] }
    ];
    /** @nocollapse */
    DatagridHeaderRenderer.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: DatagridRenderOrganizer },
        { type: DomAdapter },
        { type: ColumnResizerService },
        { type: BehaviorSubject, decorators: [{ type: Inject, args: [COLUMN_STATE,] }] }
    ]; };
    DatagridHeaderRenderer.propDecorators = {
        resizeEmitter: [{ type: Output, args: ['clrDgColumnResize',] }]
    };
    return DatagridHeaderRenderer;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NoopDomAdapter = /** @class */ (function () {
    function NoopDomAdapter() {
    }
    /**
     * @param {?} element
     * @return {?}
     */
    NoopDomAdapter.prototype.userDefinedWidth = /**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        return 0;
    };
    /**
     * @param {?} element
     * @return {?}
     */
    NoopDomAdapter.prototype.scrollBarWidth = /**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        return 0;
    };
    /**
     * @param {?} element
     * @return {?}
     */
    NoopDomAdapter.prototype.scrollWidth = /**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        return 0;
    };
    /**
     * @param {?} element
     * @return {?}
     */
    NoopDomAdapter.prototype.computedHeight = /**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        return 0;
    };
    /**
     * @param {?} element
     * @return {?}
     */
    NoopDomAdapter.prototype.clientRect = /**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        return {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            width: 0,
            height: 0,
        };
    };
    /**
     * @param {?} element
     * @return {?}
     */
    NoopDomAdapter.prototype.minWidth = /**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        return 0;
    };
    /**
     * @param {?} element
     * @return {?}
     */
    NoopDomAdapter.prototype.focus = /**
     * @param {?} element
     * @return {?}
     */
    function (element) { };
    NoopDomAdapter.decorators = [
        { type: Injectable }
    ];
    return NoopDomAdapter;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DatagridRowRenderer = /** @class */ (function () {
    function DatagridRowRenderer(columnsService) {
        this.columnsService = columnsService;
    }
    /**
     * @return {?}
     */
    DatagridRowRenderer.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.setColumnStates();
        this.cells.changes.subscribe((/**
         * @return {?}
         */
        function () {
            _this.setColumnStates();
        }));
    };
    /**
     * @return {?}
     */
    DatagridRowRenderer.prototype.setColumnStates = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.cells.forEach((/**
         * @param {?} cell
         * @param {?} index
         * @return {?}
         */
        function (cell, index) {
            if (_this.columnsService.columns[index]) {
                cell.columnState = _this.columnsService.columns[index];
            }
        }));
    };
    DatagridRowRenderer.decorators = [
        { type: Directive, args: [{ selector: 'clr-dg-row, clr-dg-row-detail' },] }
    ];
    /** @nocollapse */
    DatagridRowRenderer.ctorParameters = function () { return [
        { type: ColumnsService }
    ]; };
    DatagridRowRenderer.propDecorators = {
        cells: [{ type: ContentChildren, args: [DatagridCellRenderer,] }]
    };
    return DatagridRowRenderer;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// Fixes build error
// @dynamic (https://github.com/angular/angular/issues/19698#issuecomment-338340211)
/** @type {?} */
var domAdapterFactory = (/**
 * @param {?} platformId
 * @return {?}
 */
function (platformId) {
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
var DatagridMainRenderer = /** @class */ (function () {
    function DatagridMainRenderer(organizer, items, page, domAdapter, el, renderer, tableSizeService, columnsService) {
        var _this = this;
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
        function () { return _this.computeHeadersWidth(); })));
        this.subscriptions.push(this.page.sizeChange.subscribe((/**
         * @return {?}
         */
        function () {
            if (_this._heightSet) {
                _this.resetDatagridHeight();
            }
        })));
        this.subscriptions.push(this.items.change.subscribe((/**
         * @return {?}
         */
        function () { return (_this.shouldStabilizeColumns = true); })));
    }
    /**
     * @return {?}
     */
    DatagridMainRenderer.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.setupColumns();
        this.subscriptions.push(this.headers.changes.subscribe((/**
         * @return {?}
         */
        function () {
            // TODO: only re-stabilize if a column was added or removed. Reordering is fine.
            // Need to setup columns before stabalizing them
            _this.setupColumns();
            _this.columnsSizesStable = false;
            _this.stabilizeColumns();
        })));
    };
    // Initialize and set Table width for horizontal scrolling here.
    // Initialize and set Table width for horizontal scrolling here.
    /**
     * @return {?}
     */
    DatagridMainRenderer.prototype.ngAfterViewInit = 
    // Initialize and set Table width for horizontal scrolling here.
    /**
     * @return {?}
     */
    function () {
        this.tableSizeService.table = this.el;
    };
    /**
     * @return {?}
     */
    DatagridMainRenderer.prototype.ngAfterViewChecked = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.shouldStabilizeColumns) {
            this.stabilizeColumns();
        }
        if (this.shouldComputeHeight()) {
            setTimeout((/**
             * @return {?}
             */
            function () {
                _this.computeDatagridHeight();
            }));
        }
    };
    /**
     * @private
     * @return {?}
     */
    DatagridMainRenderer.prototype.setupColumns = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.headers.forEach((/**
         * @param {?} header
         * @param {?} index
         * @return {?}
         */
        function (header, index) {
            _this.columnsService.columns[index] = header.columnState;
        }));
        this.columnsService.columns.splice(this.headers.length); // Trim any old columns
        this.rows.forEach((/**
         * @param {?} row
         * @return {?}
         */
        function (row) { return row.setColumnStates(); }));
    };
    /**
     * @private
     * @return {?}
     */
    DatagridMainRenderer.prototype.shouldComputeHeight = /**
     * @private
     * @return {?}
     */
    function () {
        if (!this._heightSet && this.page.size > 0) {
            if (this.items.displayed.length === this.page.size) {
                return true;
            }
        }
        return false;
    };
    /**
     * Computes the height of the datagrid.
     *
     * NOTE: We had to choose to set the height instead of the min-height because
     * IE 11 requires the height on the parent for the children flex grow/shrink properties to work.
     * When we used min-height, 1 1 auto doesn't used to work in IE11 :-(
     * But this doesn't affect the fix. It works in both fixed & variable height datagrids.
     *
     * Refer: http://stackoverflow.com/questions/24396205/flex-grow-not-working-in-internet-explorer-11-0
     */
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
    DatagridMainRenderer.prototype.computeDatagridHeight = /**
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
    function () {
        // IE doesn't return correct value for getComputedStyle(element).getPropertyValue("height")
        /** @type {?} */
        var value = this.domAdapter.clientRect(this.el.nativeElement).height;
        this.renderer.setStyle(this.el.nativeElement, 'height', value + 'px');
        this._heightSet = true;
    };
    /**
     * @private
     * @return {?}
     */
    DatagridMainRenderer.prototype.resetDatagridHeight = /**
     * @private
     * @return {?}
     */
    function () {
        this.renderer.setStyle(this.el.nativeElement, 'height', '');
        this._heightSet = false;
    };
    /**
     * @return {?}
     */
    DatagridMainRenderer.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        function (sub) { return sub.unsubscribe(); }));
    };
    /**
     * Makes each header compute its width.
     */
    /**
     * Makes each header compute its width.
     * @private
     * @return {?}
     */
    DatagridMainRenderer.prototype.computeHeadersWidth = /**
     * Makes each header compute its width.
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var nbColumns = this.headers.length;
        /** @type {?} */
        var allStrict = true;
        this.headers.forEach((/**
         * @param {?} header
         * @param {?} index
         * @return {?}
         */
        function (header, index) {
            // On the last header column check whether all columns have strict widths.
            // If all columns have strict widths, remove the strict width from the last column and make it the column's
            // minimum width so that when all previous columns shrink, it will get a flexible width and cover the empty
            // gap in the Datagrid.
            /** @type {?} */
            var state$$1 = __assign({ changes: [DatagridColumnChanges.WIDTH] }, header.getColumnWidthState());
            if (!state$$1.strictWidth) {
                allStrict = false;
            }
            if (nbColumns === index + 1 && allStrict) {
                state$$1.strictWidth = 0;
            }
            _this.columnsService.emitStateChange(index, state$$1);
        }));
    };
    /**
     * Triggers a whole re-rendring cycle to set column sizes, if needed.
     */
    /**
     * Triggers a whole re-rendring cycle to set column sizes, if needed.
     * @private
     * @return {?}
     */
    DatagridMainRenderer.prototype.stabilizeColumns = /**
     * Triggers a whole re-rendring cycle to set column sizes, if needed.
     * @private
     * @return {?}
     */
    function () {
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
    };
    DatagridMainRenderer.decorators = [
        { type: Directive, args: [{
                    selector: 'clr-datagrid',
                    providers: [{ provide: DomAdapter, useFactory: domAdapterFactory, deps: [PLATFORM_ID] }],
                },] }
    ];
    /** @nocollapse */
    DatagridMainRenderer.ctorParameters = function () { return [
        { type: DatagridRenderOrganizer },
        { type: Items },
        { type: Page },
        { type: DomAdapter },
        { type: ElementRef },
        { type: Renderer2 },
        { type: TableSizeService },
        { type: ColumnsService }
    ]; };
    DatagridMainRenderer.propDecorators = {
        headers: [{ type: ContentChildren, args: [DatagridHeaderRenderer,] }],
        rows: [{ type: ContentChildren, args: [DatagridRowRenderer,] }]
    };
    return DatagridMainRenderer;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var CLR_DATAGRID_DIRECTIVES = [
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
var ClrDatagridModule = /** @class */ (function () {
    function ClrDatagridModule() {
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
                    exports: [CLR_DATAGRID_DIRECTIVES, ClrIfExpandModule],
                    entryComponents: [WrappedCell, WrappedColumn, WrappedRow],
                },] }
    ];
    return ClrDatagridModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrStackBlock = /** @class */ (function () {
    /*
       * This would be more efficient with @ContentChildren, with the parent ClrStackBlock
       * querying for children StackBlocks, but this feature is not available when downgrading
       * the component for Angular 1.
       */
    function ClrStackBlock(parent, commonStrings) {
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
    Object.defineProperty(ClrStackBlock.prototype, "getChangedValue", {
        get: /**
         * @return {?}
         */
        function () {
            return this._changed || (this._changedChildren > 0 && !this.expanded);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrStackBlock.prototype, "setChangedValue", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._changed = value;
            if (this.parent && this._fullyInitialized) {
                if (value) {
                    this.parent._changedChildren++;
                }
                else {
                    this.parent._changedChildren--;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ClrStackBlock.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        // in order to access the parent ClrStackBlock's properties,
        // the child ClrStackBlock  has to be fully initialized at first.
        this._fullyInitialized = true;
    };
    /**
     * @return {?}
     */
    ClrStackBlock.prototype.addChild = /**
     * @return {?}
     */
    function () {
        this.expandable = true;
    };
    /**
     * @return {?}
     */
    ClrStackBlock.prototype.toggleExpand = /**
     * @return {?}
     */
    function () {
        if (this.expandable) {
            this.expanded = !this.expanded;
            this.expandedChange.emit(this.expanded);
        }
    };
    Object.defineProperty(ClrStackBlock.prototype, "caretDirection", {
        get: /**
         * @return {?}
         */
        function () {
            return this.expanded ? 'down' : 'right';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrStackBlock.prototype, "caretTitle", {
        get: /**
         * @return {?}
         */
        function () {
            return this.expanded ? this.commonStrings.collapse : this.commonStrings.expand;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrStackBlock.prototype, "role", {
        get: /**
         * @return {?}
         */
        function () {
            return this.expandable ? 'button' : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrStackBlock.prototype, "tabIndex", {
        get: /**
         * @return {?}
         */
        function () {
            return this.expandable ? '0' : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrStackBlock.prototype, "onStackLabelFocus", {
        get: /**
         * @return {?}
         */
        function () {
            return this.expandable && !this.expanded && this.focused;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrStackBlock.prototype, "ariaExpanded", {
        get: /**
         * @return {?}
         */
        function () {
            if (!this.expandable) {
                return null;
            }
            else {
                return this.expanded ? 'true' : 'false';
            }
        },
        enumerable: true,
        configurable: true
    });
    ClrStackBlock.decorators = [
        { type: Component, args: [{
                    selector: 'clr-stack-block',
                    template: "\n    <dt class=\"stack-block-label\"\n        (click)=\"toggleExpand()\"\n        (keyup.enter)=\"toggleExpand()\"\n        (keyup.space)=\"toggleExpand()\"\n        (focus)=\"focused = true\"\n        (blur)=\"focused = false\"\n        [attr.role]=\"role\"\n        [attr.tabindex]=\"tabIndex\"\n        [attr.aria-expanded]=\"ariaExpanded\">\n      <clr-icon shape=\"caret\"\n                class=\"stack-block-caret\"\n                *ngIf=\"expandable\"\n                [attr.dir]=\"caretDirection\"\n                [attr.title]=\"caretTitle\"></clr-icon>\n      <ng-content select=\"clr-stack-label\"></ng-content>\n    </dt>\n    <dd class=\"stack-block-content\">\n      <ng-content></ng-content>\n    </dd>\n    <!-- FIXME: remove this string concatenation when boolean states are supported -->\n    <div [@collapse]=\"''+!expanded\" class=\"stack-children\" >\n      <ng-content select=\"clr-stack-block\"></ng-content>\n    </div>\n  ",
                    // Make sure the host has the proper class for styling purposes
                    host: { '[class.stack-block]': 'true' },
                    animations: [
                        trigger('collapse', [
                            state('true', style({ height: 0, display: 'none' })),
                            transition('true => false', [animate('0.2s ease-in-out', style({ height: '*', display: '*' }))]),
                            transition('false => true', [style({ height: '*', display: '*' }), animate('0.2s ease-in-out')]),
                        ]),
                    ],
                    styles: ["\n        :host { display: block; }\n    "]
                }] }
    ];
    /** @nocollapse */
    ClrStackBlock.ctorParameters = function () { return [
        { type: ClrStackBlock, decorators: [{ type: SkipSelf }, { type: Optional }] },
        { type: ClrCommonStrings }
    ]; };
    ClrStackBlock.propDecorators = {
        expanded: [{ type: HostBinding, args: ['class.stack-block-expanded',] }, { type: Input, args: ['clrSbExpanded',] }],
        expandedChange: [{ type: Output, args: ['clrSbExpandedChange',] }],
        expandable: [{ type: HostBinding, args: ['class.stack-block-expandable',] }, { type: Input, args: ['clrSbExpandable',] }],
        getChangedValue: [{ type: HostBinding, args: ['class.stack-block-changed',] }],
        setChangedValue: [{ type: Input, args: ['clrSbNotifyChange',] }],
        onStackLabelFocus: [{ type: HostBinding, args: ['class.on-focus',] }]
    };
    return ClrStackBlock;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrStackView = /** @class */ (function () {
    function ClrStackView() {
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
    Object.defineProperty(ClrStackView.prototype, "editing", {
        get: /**
         * @return {?}
         */
        function () {
            return this.editable && this._editMode;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (this.editable) {
                this._editMode = value;
                this.editingChange.emit(value);
                if (!value) {
                    this.save.emit(null);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    ClrStackView.decorators = [
        { type: Component, args: [{
                    selector: 'clr-stack-view',
                    template: "\n        <ng-content select=\"clr-stack-header\"></ng-content>\n        <dl class=\"stack-view\"><ng-content></ng-content></dl>\n    ",
                    styles: ["\n        :host { display: block; }\n    "]
                }] }
    ];
    ClrStackView.propDecorators = {
        save: [{ type: Output, args: ['clrStackSave',] }]
    };
    return ClrStackView;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrStackHeader = /** @class */ (function () {
    function ClrStackHeader(stackView) {
        this.stackView = stackView;
    }
    ClrStackHeader.decorators = [
        { type: Component, args: [{
                    selector: 'clr-stack-header',
                    template: "\n        <h4 class=\"stack-header\">\n            <span class=\"stack-title\"><ng-content></ng-content></span>\n            \n            <span class=\"stack-actions\">\n                <ng-content select=\".stack-action\"></ng-content>\n                <!-- Undocumented experimental feature: inline editing. -->\n                <button *ngIf=\"stackView.editable\" class=\"stack-action btn btn-sm btn-link\" \n                        (click)=\"stackView.editing = !stackView.editing\" type=\"button\">\n                        Edit\n                </button>\n                <!-- End of undocumented experimental feature. -->\n            </span>\n        </h4>\n    ",
                    styles: ["\n        :host { display: block; }\n    "]
                }] }
    ];
    /** @nocollapse */
    ClrStackHeader.ctorParameters = function () { return [
        { type: ClrStackView }
    ]; };
    return ClrStackHeader;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var StackControl = /** @class */ (function () {
    function StackControl(stackView) {
        var _this = this;
        this.stackView = stackView;
        this.modelChange = new EventEmitter(false);
        // Make the ClrStackView editable, since it contains a StackControl
        this.stackView.editable = true;
        this.stackView.editingChange.subscribe((/**
         * @param {?} editing
         * @return {?}
         */
        function (editing) {
            // Edit mode was closed
            if (!editing) {
                _this.modelChange.emit(_this.model);
            }
        }));
    }
    return StackControl;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrStackInput = /** @class */ (function (_super) {
    __extends(ClrStackInput, _super);
    function ClrStackInput(stackView) {
        var _this = _super.call(this, stackView) || this;
        _this.stackView = stackView;
        _this.type = 'text';
        return _this;
    }
    ClrStackInput.decorators = [
        { type: Component, args: [{
                    selector: 'clr-stack-input',
                    inputs: ['model: clrModel', 'type'],
                    outputs: ['modelChange: clrModelChange'],
                    template: "\n        <span *ngIf=\"!stackView.editing\">{{model}}</span>\n        <input [type]=\"type\" *ngIf=\"stackView.editing\" [(ngModel)]=\"model\"/>\n    "
                }] }
    ];
    /** @nocollapse */
    ClrStackInput.ctorParameters = function () { return [
        { type: ClrStackView }
    ]; };
    return ClrStackInput;
}(StackControl));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrStackSelect = /** @class */ (function (_super) {
    __extends(ClrStackSelect, _super);
    function ClrStackSelect(stackView) {
        var _this = _super.call(this, stackView) || this;
        _this.stackView = stackView;
        return _this;
    }
    ClrStackSelect.decorators = [
        { type: Component, args: [{
                    selector: 'clr-stack-select',
                    inputs: ['model: clrModel'],
                    outputs: ['modelChange: clrModelChange'],
                    template: "\n        <span *ngIf=\"!stackView.editing\">{{model}}</span>\n        <div class=\"select\" *ngIf=\"stackView.editing\" >\n            <select [(ngModel)]=\"model\">\n                <ng-content></ng-content>\n            </select>\n        </div>\n    "
                }] }
    ];
    /** @nocollapse */
    ClrStackSelect.ctorParameters = function () { return [
        { type: ClrStackView }
    ]; };
    return ClrStackSelect;
}(StackControl));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrStackViewCustomTags = /** @class */ (function () {
    function ClrStackViewCustomTags() {
    }
    ClrStackViewCustomTags.decorators = [
        { type: Directive, args: [{ selector: 'clr-stack-label, clr-stack-content' },] }
    ];
    return ClrStackViewCustomTags;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var CLR_STACK_VIEW_DIRECTIVES = [
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
var ClrStackViewModule = /** @class */ (function () {
    function ClrStackViewModule() {
    }
    ClrStackViewModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, FormsModule, ClrIconModule],
                    declarations: [CLR_STACK_VIEW_DIRECTIVES],
                    exports: [CLR_STACK_VIEW_DIRECTIVES],
                },] }
    ];
    return ClrStackViewModule;
}());

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
var ClrSelectedState = {
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
var /**
 * @abstract
 * @template T
 */
TreeNodeModel = /** @class */ (function () {
    function TreeNodeModel() {
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
    TreeNodeModel.prototype.destroy = /**
     * @return {?}
     */
    function () {
        // Just to be safe
        this.selected.complete();
    };
    // Propagate by default when eager, don't propagate in the lazy-loaded tree.
    // Propagate by default when eager, don't propagate in the lazy-loaded tree.
    /**
     * @param {?} state
     * @param {?} propagateUp
     * @param {?} propagateDown
     * @return {?}
     */
    TreeNodeModel.prototype.setSelected = 
    // Propagate by default when eager, don't propagate in the lazy-loaded tree.
    /**
     * @param {?} state
     * @param {?} propagateUp
     * @param {?} propagateDown
     * @return {?}
     */
    function (state$$1, propagateUp, propagateDown) {
        if (state$$1 === this.selected.value) {
            return;
        }
        this.selected.next(state$$1);
        if (propagateDown && state$$1 !== ClrSelectedState.INDETERMINATE && this.children) {
            this.children.forEach((/**
             * @param {?} child
             * @return {?}
             */
            function (child) { return child.setSelected(state$$1, false, true); }));
        }
        if (propagateUp && this.parent) {
            this.parent._updateSelectionFromChildren();
        }
    };
    /**
     * @param {?} propagate
     * @return {?}
     */
    TreeNodeModel.prototype.toggleSelection = /**
     * @param {?} propagate
     * @return {?}
     */
    function (propagate) {
        // Both unselected and indeterminate toggle to selected
        /** @type {?} */
        var newState = this.selected.value === ClrSelectedState.SELECTED ? ClrSelectedState.UNSELECTED : ClrSelectedState.SELECTED;
        // NOTE: we always propagate selection up in this method because it is only called when the user takes an action.
        // It should never be called from lifecycle hooks or app-provided inputs.
        this.setSelected(newState, true, propagate);
    };
    /**
     * @private
     * @return {?}
     */
    TreeNodeModel.prototype.computeSelectionStateFromChildren = /**
     * @private
     * @return {?}
     */
    function () {
        var e_1, _a;
        /** @type {?} */
        var oneSelected = false;
        /** @type {?} */
        var oneUnselected = false;
        try {
            // Using a good old for loop to exit as soon as we can tell, for better performance on large trees.
            for (var _b = __values(this.children), _c = _b.next(); !_c.done; _c = _b.next()) {
                var child = _c.value;
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
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (!oneSelected) {
            return ClrSelectedState.UNSELECTED;
        }
        else if (!oneUnselected) {
            return ClrSelectedState.SELECTED;
        }
    };
    /*
     * Internal, but needs to be called by other nodes
     */
    /*
       * Internal, but needs to be called by other nodes
       */
    /**
     * @return {?}
     */
    TreeNodeModel.prototype._updateSelectionFromChildren = /*
       * Internal, but needs to be called by other nodes
       */
    /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var newState = this.computeSelectionStateFromChildren();
        if (newState === this.selected.value) {
            return;
        }
        this.selected.next(newState);
        if (this.parent) {
            this.parent._updateSelectionFromChildren();
        }
    };
    return TreeNodeModel;
}());

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
var /*
 * A declarative model is built by traversing the Angular component tree.
 * Declarative = Tree node components dictate the model
 */
/**
 * @template T
 */
DeclarativeTreeNodeModel = /** @class */ (function (_super) {
    __extends(DeclarativeTreeNodeModel, _super);
    function DeclarativeTreeNodeModel(parent) {
        var _this = _super.call(this) || this;
        _this.parent = parent;
        if (parent) {
            parent._addChild(_this);
        }
        _this.children = [];
        return _this;
    }
    /**
     * @param {?} child
     * @return {?}
     */
    DeclarativeTreeNodeModel.prototype._addChild = /**
     * @param {?} child
     * @return {?}
     */
    function (child) {
        this.children.push(child);
    };
    /**
     * @param {?} child
     * @return {?}
     */
    DeclarativeTreeNodeModel.prototype._removeChild = /**
     * @param {?} child
     * @return {?}
     */
    function (child) {
        /** @type {?} */
        var index = this.children.indexOf(child);
        if (index > -1) {
            this.children.splice(index, 1);
        }
    };
    /**
     * @return {?}
     */
    DeclarativeTreeNodeModel.prototype.destroy = /**
     * @return {?}
     */
    function () {
        if (this.parent) {
            this.parent._removeChild(this);
        }
        _super.prototype.destroy.call(this);
    };
    return DeclarativeTreeNodeModel;
}(TreeNodeModel));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
var TreeFeaturesService = /** @class */ (function () {
    function TreeFeaturesService() {
        this.selectable = false;
        this.eager = true;
    }
    TreeFeaturesService.decorators = [
        { type: Injectable }
    ];
    return TreeFeaturesService;
}());
/**
 * @template T
 * @param {?} existing
 * @return {?}
 */
function treeFeaturesFactory(existing) {
    return existing || new TreeFeaturesService();
}
/** @type {?} */
var TREE_FEATURES_PROVIDER = {
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
var ClrTreeNode = /** @class */ (function () {
    function ClrTreeNode(nodeId, parent, featuresService, expandService, commonStrings, injector) {
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
    ClrTreeNode.prototype.isExpandable = /**
     * @return {?}
     */
    function () {
        if (typeof this.expandable !== 'undefined') {
            return this.expandable;
        }
        return !!this.expandService.expandable || this._model.children.length > 0;
    };
    Object.defineProperty(ClrTreeNode.prototype, "selected", {
        get: /**
         * @return {?}
         */
        function () {
            return this._model.selected.value;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTreeNode.prototype, "treeNodeRole", {
        get: /**
         * @return {?}
         */
        function () {
            return this._model.parent ? 'treeitem' : 'tree';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTreeNode.prototype, "rootAriaMultiSelectable", {
        get: /**
         * @return {?}
         */
        function () {
            if (this._model.parent || !this.featuresService.selectable) {
                return null;
            }
            else {
                return true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTreeNode.prototype, "ariaSelected", {
        get: /**
         * @return {?}
         */
        function () {
            return this.featuresService.selectable ? this._model.selected.value === ClrSelectedState.SELECTED : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTreeNode.prototype, "expanded", {
        // I'm caving on this, for tree nodes I think we can tolerate having a two-way binding on the component
        // rather than enforce the clrIfExpanded structural directive for dynamic cases. Mostly because for the smart
        // case, you can't use a structural directive, it would need to go on an ng-container.
        get: 
        // I'm caving on this, for tree nodes I think we can tolerate having a two-way binding on the component
        // rather than enforce the clrIfExpanded structural directive for dynamic cases. Mostly because for the smart
        // case, you can't use a structural directive, it would need to go on an ng-container.
        /**
         * @return {?}
         */
        function () {
            return this.expandService.expanded;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.expandService.expanded = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ClrTreeNode.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.subscriptions.push(this._model.selected.pipe(filter((/**
         * @return {?}
         */
        function () { return !_this.skipEmitChange; }))).subscribe((/**
         * @param {?} value
         * @return {?}
         */
        function (value) { return _this.selectedChange.emit(value); })));
        this.subscriptions.push(this.expandService.expandChange.subscribe((/**
         * @param {?} value
         * @return {?}
         */
        function (value) { return _this.expandedChange.emit(value); })));
    };
    /**
     * @return {?}
     */
    ClrTreeNode.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._model.destroy();
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        function (sub) { return sub.unsubscribe(); }));
    };
    ClrTreeNode.decorators = [
        { type: Component, args: [{
                    selector: 'clr-tree-node',
                    template: "<!--\n  ~ Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.\n  ~ This software is released under MIT license.\n  ~ The full license information can be found in LICENSE in the root directory of this project.\n  -->\n\n<div class=\"clr-tree-node-content-container\">\n  <button\n    *ngIf=\"isExpandable() && !_model.loading && !expandService.loading\"\n    type=\"button\"\n    class=\"clr-treenode-caret\"\n    (click)=\"expandService.toggle()\"\n    [attr.aria-expanded]=\"expandService.expanded\">\n    <clr-icon\n      class=\"clr-treenode-caret-icon\"\n      shape=\"caret\"\n      [attr.dir]=\"expandService.expanded ? 'down' : 'right'\"\n      [attr.title]=\"expandService.expanded ? commonStrings.collapse : commonStrings.expand\"></clr-icon>\n  </button>\n  <div class=\"clr-treenode-spinner-container\" *ngIf=\"expandService.loading || _model.loading\">\n        <span class=\"clr-treenode-spinner spinner\"></span>\n  </div>\n  <div class=\"clr-checkbox-wrapper clr-treenode-checkbox\" *ngIf=\"featuresService.selectable\">\n    <input type=\"checkbox\" id=\"{{nodeId}}-check\" class=\"clr-checkbox\" [attr.aria-labelledby]=\"nodeId\"\n           [checked]=\"_model.selected.value === STATES.SELECTED\"\n           [indeterminate]=\"_model.selected.value === STATES.INDETERMINATE\"\n           (change)=\"_model.toggleSelection(featuresService.eager)\">\n    <label for=\"{{nodeId}}-check\" class=\"clr-control-label\"></label>\n  </div>\n  <div class=\"clr-treenode-content\" [id]=\"nodeId\">\n    <ng-content></ng-content>\n  </div>\n</div>\n<div class=\"clr-treenode-children\"\n     [@childNodesState]=\"expandService.expanded ? 'expanded' : 'collapsed'\"\n     [attr.role]=\"isExpandable() ? 'group' : null\">\n  <ng-content select=\"clr-tree-node\"></ng-content>\n  <ng-content select=\"[clrIfExpanded]\"></ng-content>\n  <clr-recursive-children [parent]=\"_model\"></clr-recursive-children>\n</div>\n",
                    providers: [UNIQUE_ID_PROVIDER, TREE_FEATURES_PROVIDER, Expand, { provide: LoadingListener, useExisting: Expand }],
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
    ClrTreeNode.ctorParameters = function () { return [
        { type: String, decorators: [{ type: Inject, args: [UNIQUE_ID,] }] },
        { type: ClrTreeNode, decorators: [{ type: Optional }, { type: SkipSelf }] },
        { type: TreeFeaturesService },
        { type: Expand },
        { type: ClrCommonStrings },
        { type: Injector }
    ]; };
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
    return ClrTreeNode;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
var ClrTree = /** @class */ (function () {
    // This component can also be used just to declare providers once for trees with multiple root nodes.
    function ClrTree(featuresService) {
        this.featuresService = featuresService;
    }
    Object.defineProperty(ClrTree.prototype, "lazy", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.featuresService.eager = !value;
        },
        enumerable: true,
        configurable: true
    });
    ClrTree.decorators = [
        { type: Component, args: [{
                    selector: 'clr-tree',
                    template: "\n    <ng-content></ng-content>\n    <clr-recursive-children *ngIf=\"featuresService.recursion\"\n                            [children]=\"featuresService.recursion.root\"></clr-recursive-children>\n  ",
                    providers: [TREE_FEATURES_PROVIDER]
                }] }
    ];
    /** @nocollapse */
    ClrTree.ctorParameters = function () { return [
        { type: TreeFeaturesService }
    ]; };
    ClrTree.propDecorators = {
        lazy: [{ type: Input, args: ['clrLazy',] }]
    };
    return ClrTree;
}());

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
var /*
 * A recursive model is built received from the app and traversed to create the corresponding components.
 * Recursive = Model dictates the tree node components
 */
/**
 * @template T
 */
RecursiveTreeNodeModel = /** @class */ (function (_super) {
    __extends(RecursiveTreeNodeModel, _super);
    function RecursiveTreeNodeModel(model, parent, getChildren) {
        var _this = _super.call(this) || this;
        _this.getChildren = getChildren;
        _this.childrenFetched = false;
        _this._children = [];
        _this.model = model;
        _this.parent = parent;
        return _this;
    }
    /**
     * @return {?}
     */
    RecursiveTreeNodeModel.prototype.clearChildren = /**
     * @return {?}
     */
    function () {
        this._children.forEach((/**
         * @param {?} child
         * @return {?}
         */
        function (child) { return child.destroy(); }));
        delete this._children;
        this.childrenFetched = false;
    };
    /**
     * @return {?}
     */
    RecursiveTreeNodeModel.prototype.fetchChildren = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.childrenFetched) {
            return;
        }
        /** @type {?} */
        var asyncChildren = this.getChildren(this.model);
        if (isPromise(asyncChildren)) {
            this.loading = true;
            asyncChildren.then((/**
             * @param {?} raw
             * @return {?}
             */
            function (raw) {
                _this._children = _this.wrapChildren(raw);
                _this.loading = false;
            }));
        }
        else if (isObservable(asyncChildren)) {
            this.loading = true;
            this.subscription = asyncChildren.subscribe((/**
             * @param {?} raw
             * @return {?}
             */
            function (raw) {
                _this._children = _this.wrapChildren(raw);
                _this.loading = false;
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
    };
    /**
     * @private
     * @param {?} rawModels
     * @return {?}
     */
    RecursiveTreeNodeModel.prototype.wrapChildren = /**
     * @private
     * @param {?} rawModels
     * @return {?}
     */
    function (rawModels) {
        var _this = this;
        return rawModels.map((/**
         * @param {?} m
         * @return {?}
         */
        function (m) { return new RecursiveTreeNodeModel(m, _this, _this.getChildren); }));
    };
    Object.defineProperty(RecursiveTreeNodeModel.prototype, "children", {
        get: /**
         * @return {?}
         */
        function () {
            this.fetchChildren();
            return this._children;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._children = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    RecursiveTreeNodeModel.prototype.destroy = /**
     * @return {?}
     */
    function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        _super.prototype.destroy.call(this);
    };
    return RecursiveTreeNodeModel;
}(TreeNodeModel));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
var ClrRecursiveForOf = /** @class */ (function () {
    function ClrRecursiveForOf(template, featuresService) {
        this.template = template;
        this.featuresService = featuresService;
    }
    // I'm using OnChanges instead of OnInit to easily keep up to date with dynamic trees. Maybe optimizable later.
    // I'm using OnChanges instead of OnInit to easily keep up to date with dynamic trees. Maybe optimizable later.
    /**
     * @return {?}
     */
    ClrRecursiveForOf.prototype.ngOnChanges = 
    // I'm using OnChanges instead of OnInit to easily keep up to date with dynamic trees. Maybe optimizable later.
    /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var wrapped;
        if (Array.isArray(this.nodes)) {
            wrapped = this.nodes.map((/**
             * @param {?} node
             * @return {?}
             */
            function (node) { return new RecursiveTreeNodeModel(node, null, _this.getChildren); }));
        }
        else {
            wrapped = [new RecursiveTreeNodeModel(this.nodes, null, this.getChildren)];
        }
        this.featuresService.recursion = {
            template: this.template,
            root: wrapped,
        };
    };
    ClrRecursiveForOf.decorators = [
        { type: Directive, args: [{ selector: '[clrRecursiveFor][clrRecursiveForOf]' },] }
    ];
    /** @nocollapse */
    ClrRecursiveForOf.ctorParameters = function () { return [
        { type: TemplateRef },
        { type: TreeFeaturesService }
    ]; };
    ClrRecursiveForOf.propDecorators = {
        nodes: [{ type: Input, args: ['clrRecursiveForOf',] }],
        getChildren: [{ type: Input, args: ['clrRecursiveForGetChildren',] }]
    };
    return ClrRecursiveForOf;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
var RecursiveChildren = /** @class */ (function () {
    function RecursiveChildren(featuresService, expandService) {
        var _this = this;
        this.featuresService = featuresService;
        this.expandService = expandService;
        if (expandService) {
            this.subscription = this.expandService.expandChange.subscribe((/**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                if (!value && _this.parent && !_this.featuresService.eager && _this.featuresService.recursion) {
                    // In the case of lazy-loading recursive trees, we clear the children on collapse.
                    // This is better in case they change between two user interaction, and that way
                    // the app itself can decide whether to cache them or not.
                    ((/** @type {?} */ (_this.parent))).clearChildren();
                }
            }));
        }
    }
    /**
     * @return {?}
     */
    RecursiveChildren.prototype.shouldRender = /**
     * @return {?}
     */
    function () {
        return (this.featuresService.recursion &&
            // In the smart case, we eagerly render all the recursive children
            // to make sure two-way bindings for selection are available.
            // They will be hidden with CSS by the parent.
            (this.featuresService.eager || !this.expandService || this.expandService.expanded));
    };
    /**
     * @param {?} node
     * @return {?}
     */
    RecursiveChildren.prototype.getContext = /**
     * @param {?} node
     * @return {?}
     */
    function (node) {
        return {
            $implicit: node.model,
            clrModel: node,
        };
    };
    /**
     * @return {?}
     */
    RecursiveChildren.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    RecursiveChildren.decorators = [
        { type: Component, args: [{
                    selector: 'clr-recursive-children',
                    template: "\n    <ng-container *ngIf=\"shouldRender()\">\n      <ng-container *ngFor=\"let child of parent?.children || children\">\n        <ng-container *ngTemplateOutlet=\"featuresService.recursion.template; context: getContext(child)\"></ng-container>\n      </ng-container>\n    </ng-container>\n  "
                }] }
    ];
    /** @nocollapse */
    RecursiveChildren.ctorParameters = function () { return [
        { type: TreeFeaturesService },
        { type: Expand, decorators: [{ type: Optional }] }
    ]; };
    RecursiveChildren.propDecorators = {
        parent: [{ type: Input, args: ['parent',] }],
        children: [{ type: Input, args: ['children',] }]
    };
    return RecursiveChildren;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var CLR_TREE_VIEW_DIRECTIVES = [ClrTree, ClrTreeNode, ClrRecursiveForOf];
var ClrTreeViewModule = /** @class */ (function () {
    function ClrTreeViewModule() {
    }
    ClrTreeViewModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, ClrIconModule, ClrLoadingModule],
                    declarations: [CLR_TREE_VIEW_DIRECTIVES, RecursiveChildren],
                    exports: [CLR_TREE_VIEW_DIRECTIVES, ClrIfExpandModule],
                },] }
    ];
    return ClrTreeViewModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrDataModule = /** @class */ (function () {
    function ClrDataModule() {
    }
    ClrDataModule.decorators = [
        { type: NgModule, args: [{ exports: [ClrDatagridModule, ClrStackViewModule, ClrTreeViewModule] },] }
    ];
    return ClrDataModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var RootDropdownService = /** @class */ (function () {
    function RootDropdownService() {
        this._changes = new Subject();
    }
    Object.defineProperty(RootDropdownService.prototype, "changes", {
        get: /**
         * @return {?}
         */
        function () {
            return this._changes.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    RootDropdownService.prototype.closeMenus = /**
     * @return {?}
     */
    function () {
        this._changes.next(false);
    };
    RootDropdownService.decorators = [
        { type: Injectable }
    ];
    return RootDropdownService;
}());
/**
 * @param {?} existing
 * @return {?}
 */
function clrRootDropdownFactory(existing) {
    return existing || new RootDropdownService();
}
/** @type {?} */
var ROOT_DROPDOWN_PROVIDER = {
    provide: RootDropdownService,
    useFactory: clrRootDropdownFactory,
    deps: [[new Optional(), new SkipSelf(), RootDropdownService]],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrDropdown = /** @class */ (function () {
    function ClrDropdown(parent, ifOpenService, cdr, dropdownService) {
        var _this = this;
        this.parent = parent;
        this.ifOpenService = ifOpenService;
        this.cdr = cdr;
        this.subscriptions = [];
        this.isMenuClosable = true;
        this.subscriptions.push(dropdownService.changes.subscribe((/**
         * @param {?} value
         * @return {?}
         */
        function (value) { return (_this.ifOpenService.open = value); })));
        this.subscriptions.push(ifOpenService.openChange.subscribe((/**
         * @param {?} value
         * @return {?}
         */
        function (value) { return _this.cdr.markForCheck(); })));
    }
    /**
     * @return {?}
     */
    ClrDropdown.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        function (sub) { return sub.unsubscribe(); }));
    };
    ClrDropdown.decorators = [
        { type: Component, args: [{
                    selector: 'clr-dropdown',
                    template: '<ng-content></ng-content>',
                    host: {
                        '[class.dropdown]': 'true',
                        // FIXME: remove this as soon as we stop supporting this old <div class="dropdown-menu"> syntax
                        '[class.open]': 'ifOpenService.open',
                    },
                    providers: [IfOpenService, ROOT_DROPDOWN_PROVIDER, { provide: POPOVER_HOST_ANCHOR, useExisting: ElementRef }]
                }] }
    ];
    /** @nocollapse */
    ClrDropdown.ctorParameters = function () { return [
        { type: ClrDropdown, decorators: [{ type: SkipSelf }, { type: Optional }] },
        { type: IfOpenService },
        { type: ChangeDetectorRef },
        { type: RootDropdownService }
    ]; };
    ClrDropdown.propDecorators = {
        isMenuClosable: [{ type: Input, args: ['clrCloseMenuOnItemClick',] }]
    };
    return ClrDropdown;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrDropdownItem = /** @class */ (function () {
    function ClrDropdownItem(dropdown, el, _dropdownService, renderer) {
        this.dropdown = dropdown;
        this.el = el;
        this._dropdownService = _dropdownService;
        this.renderer = renderer;
    }
    /**
     * @return {?}
     */
    ClrDropdownItem.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.renderer.listen(this.el.nativeElement, 'click', (/**
         * @return {?}
         */
        function () { return _this.onDropdownItemClick(); }));
    };
    /**
     * @return {?}
     */
    ClrDropdownItem.prototype.onDropdownItemClick = /**
     * @return {?}
     */
    function () {
        if (this.dropdown.isMenuClosable && !this.el.nativeElement.classList.contains('disabled')) {
            this._dropdownService.closeMenus();
        }
    };
    ClrDropdownItem.decorators = [
        { type: Directive, args: [{ selector: '[clrDropdownItem]', host: { '[class.dropdown-item]': 'true' } },] }
    ];
    /** @nocollapse */
    ClrDropdownItem.ctorParameters = function () { return [
        { type: ClrDropdown },
        { type: ElementRef },
        { type: RootDropdownService },
        { type: Renderer2 }
    ]; };
    return ClrDropdownItem;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrDropdownMenu = /** @class */ (function (_super) {
    __extends(ClrDropdownMenu, _super);
    function ClrDropdownMenu(injector, parentHost, nested) {
        var _this = this;
        if (!parentHost) {
            throw new Error('clr-dropdown-menu should only be used inside of a clr-dropdown');
        }
        _this = _super.call(this, injector, parentHost) || this;
        if (!nested) {
            // Default positioning for normal dropdown is bottom-left
            _this.anchorPoint = Point.BOTTOM_LEFT;
            _this.popoverPoint = Point.LEFT_TOP;
        }
        else {
            // Default positioning for nested dropdown is right-top
            _this.anchorPoint = Point.RIGHT_TOP;
            _this.popoverPoint = Point.LEFT_TOP;
        }
        _this.popoverOptions.allowMultipleOpen = true;
        _this.closeOnOutsideClick = true;
        return _this;
    }
    Object.defineProperty(ClrDropdownMenu.prototype, "position", {
        set: /**
         * @param {?} position
         * @return {?}
         */
        function (position) {
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
        },
        enumerable: true,
        configurable: true
    });
    ClrDropdownMenu.decorators = [
        { type: Component, args: [{
                    selector: 'clr-dropdown-menu',
                    template: "\n        <ng-content></ng-content>\n    ",
                    host: {
                        '[class.dropdown-menu]': 'true',
                    }
                }] }
    ];
    /** @nocollapse */
    ClrDropdownMenu.ctorParameters = function () { return [
        { type: Injector },
        { type: ElementRef, decorators: [{ type: Optional }, { type: Inject, args: [POPOVER_HOST_ANCHOR,] }] },
        { type: ClrDropdownMenu, decorators: [{ type: Optional }, { type: SkipSelf }] }
    ]; };
    ClrDropdownMenu.propDecorators = {
        position: [{ type: Input, args: ['clrPosition',] }]
    };
    return ClrDropdownMenu;
}(AbstractPopover));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrDropdownTrigger = /** @class */ (function () {
    function ClrDropdownTrigger(dropdown, ifOpenService) {
        this.ifOpenService = ifOpenService;
        this.isRootLevelToggle = true;
        // if the containing dropdown has a parent, then this is not the root level one
        if (dropdown.parent) {
            this.isRootLevelToggle = false;
        }
    }
    Object.defineProperty(ClrDropdownTrigger.prototype, "active", {
        get: /**
         * @return {?}
         */
        function () {
            return this.ifOpenService.open;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} event
     * @return {?}
     */
    ClrDropdownTrigger.prototype.onDropdownTriggerClick = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.ifOpenService.toggleWithEvent(event);
    };
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
    ClrDropdownTrigger.ctorParameters = function () { return [
        { type: ClrDropdown },
        { type: IfOpenService }
    ]; };
    ClrDropdownTrigger.propDecorators = {
        onDropdownTriggerClick: [{ type: HostListener, args: ['click', ['$event'],] }]
    };
    return ClrDropdownTrigger;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var CLR_DROPDOWN_DIRECTIVES = [ClrDropdown, ClrDropdownMenu, ClrDropdownTrigger, ClrDropdownItem];
var ClrDropdownModule = /** @class */ (function () {
    function ClrDropdownModule() {
    }
    ClrDropdownModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, ClrCommonPopoverModule],
                    declarations: [CLR_DROPDOWN_DIRECTIVES],
                    exports: [CLR_DROPDOWN_DIRECTIVES, ClrConditionalModule, ClrIconModule],
                },] }
    ];
    return ClrDropdownModule;
}());

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
var ALERT_TYPES = ['info', 'warning', 'danger', 'success'];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AlertIconAndTypesService = /** @class */ (function () {
    function AlertIconAndTypesService(commonStrings) {
        this.commonStrings = commonStrings;
        this.defaultIconShape = 'info-circle';
        this._alertIconShape = '';
        this._alertType = 'info';
    }
    Object.defineProperty(AlertIconAndTypesService.prototype, "alertType", {
        get: /**
         * @return {?}
         */
        function () {
            return this._alertType;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            if (ALERT_TYPES.indexOf(val) > -1) {
                this._alertType = val;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AlertIconAndTypesService.prototype, "alertIconShape", {
        get: /**
         * @return {?}
         */
        function () {
            if ('' === this._alertIconShape) {
                return this.iconInfoFromType(this._alertType).shape;
            }
            return this._alertIconShape;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            if (!val) {
                this._alertIconShape = '';
            }
            else if (val !== this._alertIconShape) {
                this._alertIconShape = val;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AlertIconAndTypesService.prototype, "alertIconTitle", {
        get: /**
         * @return {?}
         */
        function () {
            return this.iconInfoFromType(this._alertType).title;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} type
     * @return {?}
     */
    AlertIconAndTypesService.prototype.iconInfoFromType = /**
     * @param {?} type
     * @return {?}
     */
    function (type) {
        /** @type {?} */
        var returnObj = { shape: '', cssClass: '', title: '' };
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
    };
    AlertIconAndTypesService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    AlertIconAndTypesService.ctorParameters = function () { return [
        { type: ClrCommonStrings }
    ]; };
    return AlertIconAndTypesService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var MultiAlertService = /** @class */ (function () {
    function MultiAlertService() {
        this.allAlerts = new QueryList();
        this._current = 0;
        /**
         * The Observable that lets other classes subscribe to changes
         */
        this._change = new Subject();
    }
    Object.defineProperty(MultiAlertService.prototype, "changes", {
        get: /**
         * @return {?}
         */
        function () {
            return this._change.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiAlertService.prototype, "current", {
        get: /**
         * @return {?}
         */
        function () {
            return this._current;
        },
        set: /**
         * @param {?} index
         * @return {?}
         */
        function (index) {
            if (index !== this._current) {
                this._current = index;
                this._change.next(index);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiAlertService.prototype, "activeAlerts", {
        get: /**
         * @return {?}
         */
        function () {
            return this.allAlerts.filter((/**
             * @param {?} alert
             * @return {?}
             */
            function (alert) { return !alert._closed; }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiAlertService.prototype, "currentAlert", {
        get: /**
         * @return {?}
         */
        function () {
            return this.activeAlerts[this.current];
        },
        set: /**
         * @param {?} alert
         * @return {?}
         */
        function (alert) {
            this.current = this.activeAlerts.indexOf(alert);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiAlertService.prototype, "count", {
        get: /**
         * @return {?}
         */
        function () {
            return this.activeAlerts.length;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} alerts
     * @return {?}
     */
    MultiAlertService.prototype.manage = /**
     * @param {?} alerts
     * @return {?}
     */
    function (alerts) {
        var _this = this;
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.allAlerts = alerts;
        this.subscription = this.allAlerts.changes.subscribe((/**
         * @return {?}
         */
        function () {
            if (_this.current >= _this.allAlerts.length) {
                _this.current = Math.max(0, _this.allAlerts.length - 1);
            }
        }));
    };
    /**
     * @return {?}
     */
    MultiAlertService.prototype.next = /**
     * @return {?}
     */
    function () {
        this.current = this.current === this.activeAlerts.length - 1 ? 0 : this.current + 1;
    };
    /**
     * @return {?}
     */
    MultiAlertService.prototype.previous = /**
     * @return {?}
     */
    function () {
        if (this.activeAlerts.length === 0) {
            return;
        }
        this.current = this.current === 0 ? this.activeAlerts.length - 1 : this.current - 1;
    };
    /**
     * @return {?}
     */
    MultiAlertService.prototype.close = /**
     * @return {?}
     */
    function () {
        this.previous();
    };
    /**
     * @return {?}
     */
    MultiAlertService.prototype.destroy = /**
     * @return {?}
     */
    function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    MultiAlertService.decorators = [
        { type: Injectable }
    ];
    return MultiAlertService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrAlert = /** @class */ (function () {
    function ClrAlert(iconService, cdr, multiAlertService, commonStrings) {
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
    Object.defineProperty(ClrAlert.prototype, "alertType", {
        get: /**
         * @return {?}
         */
        function () {
            return this.iconService.alertType;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this.iconService.alertType = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrAlert.prototype, "alertIconShape", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.iconService.alertIconShape = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrAlert.prototype, "alertClass", {
        get: /**
         * @return {?}
         */
        function () {
            return this.iconService.iconInfoFromType(this.iconService.alertType).cssClass;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @return {?}
     */
    ClrAlert.prototype.detectChangesIfNeeded = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.previouslyHidden !== this.hidden) {
            this.previouslyHidden = this.hidden;
            this.cdr.detectChanges();
        }
    };
    Object.defineProperty(ClrAlert.prototype, "isHidden", {
        get: /**
         * @return {?}
         */
        function () {
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
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ClrAlert.prototype.close = /**
     * @return {?}
     */
    function () {
        if (!this.closable) {
            return;
        }
        this._closed = true;
        if (this.multiAlertService) {
            this.multiAlertService.close();
        }
        this._closedChanged.emit(true);
    };
    /**
     * @return {?}
     */
    ClrAlert.prototype.open = /**
     * @return {?}
     */
    function () {
        this._closed = false;
        this._closedChanged.emit(false);
    };
    ClrAlert.decorators = [
        { type: Component, args: [{
                    selector: 'clr-alert',
                    providers: [AlertIconAndTypesService],
                    template: "<!--\n  ~ Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.\n  ~ This software is released under MIT license.\n  ~ The full license information can be found in LICENSE in the root directory of this project.\n  -->\n\n<div\n    *ngIf=\"!_closed\"\n    class=\"alert\"\n    [ngClass]=\"alertClass\"\n    [class.alert-hidden]=\"isHidden\"\n    [class.alert-sm]=\"isSmall\"\n    [class.alert-app-level]=\"isAppLevel\"\n    role=\"alert\">\n    <div class=\"alert-items\">\n        <ng-content></ng-content>\n    </div>\n    <button type=\"button\" class=\"close\" *ngIf=\"closable\" (click)=\"close()\">\n        <clr-icon shape=\"close\" [attr.title]=\"commonStrings.close\"></clr-icon>\n    </button>\n</div>\n",
                    styles: [':host { display: block; }']
                }] }
    ];
    /** @nocollapse */
    ClrAlert.ctorParameters = function () { return [
        { type: AlertIconAndTypesService },
        { type: ChangeDetectorRef },
        { type: MultiAlertService, decorators: [{ type: Optional }] },
        { type: ClrCommonStrings }
    ]; };
    ClrAlert.propDecorators = {
        isSmall: [{ type: Input, args: ['clrAlertSizeSmall',] }],
        closable: [{ type: Input, args: ['clrAlertClosable',] }],
        isAppLevel: [{ type: Input, args: ['clrAlertAppLevel',] }],
        _closed: [{ type: Input, args: ['clrAlertClosed',] }],
        _closedChanged: [{ type: Output, args: ['clrAlertClosedChange',] }],
        alertType: [{ type: Input, args: ['clrAlertType',] }],
        alertIconShape: [{ type: Input, args: ['clrAlertIcon',] }]
    };
    return ClrAlert;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrAlertItem = /** @class */ (function () {
    function ClrAlertItem(iconService) {
        this.iconService = iconService;
    }
    ClrAlertItem.decorators = [
        { type: Component, args: [{
                    selector: 'clr-alert-item',
                    template: "\n        <div class=\"alert-icon-wrapper\">\n            <clr-icon class=\"alert-icon\" \n              [attr.shape]=\"iconService.alertIconShape\" \n              [attr.title]=\"iconService.alertIconTitle\"></clr-icon>\n        </div>\n        <ng-content></ng-content>\n    ",
                    host: { class: 'alert-item' }
                }] }
    ];
    /** @nocollapse */
    ClrAlertItem.ctorParameters = function () { return [
        { type: AlertIconAndTypesService }
    ]; };
    return ClrAlertItem;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrAlerts = /** @class */ (function () {
    function ClrAlerts(multiAlertService) {
        this.multiAlertService = multiAlertService;
        this.currentAlertIndexChange = new EventEmitter(false);
        this.currentAlertChange = new EventEmitter(false);
    }
    Object.defineProperty(ClrAlerts.prototype, "_inputCurrentIndex", {
        /**
         * Input/Output to support two way binding on current alert index
         */
        set: /**
         * Input/Output to support two way binding on current alert index
         * @param {?} index
         * @return {?}
         */
        function (index) {
            if (Number.isInteger(index) && index >= 0) {
                this.multiAlertService.current = index;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrAlerts.prototype, "currentAlertIndex", {
        get: /**
         * @return {?}
         */
        function () {
            return this.multiAlertService.current;
        },
        set: /**
         * @param {?} index
         * @return {?}
         */
        function (index) {
            this.multiAlertService.current = index;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrAlerts.prototype, "currentAlert", {
        get: /**
         * @return {?}
         */
        function () {
            return this.multiAlertService.currentAlert;
        },
        /**
         * Input/Output to support two way binding on current alert instance
         */
        set: /**
         * Input/Output to support two way binding on current alert instance
         * @param {?} alert
         * @return {?}
         */
        function (alert) {
            if (alert) {
                this.multiAlertService.currentAlert = alert;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrAlerts.prototype, "alerts", {
        /**
         * Ensure we are only dealing with alerts that have not been closed yet
         */
        get: /**
         * Ensure we are only dealing with alerts that have not been closed yet
         * @return {?}
         */
        function () {
            return this.allAlerts.filter((/**
             * @param {?} alert
             * @return {?}
             */
            function (alert) {
                return alert.isHidden === false;
            }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrAlerts.prototype, "currentAlertType", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.multiAlertService.currentAlert) {
                return this.multiAlertService.currentAlert.alertType;
            }
            return '';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ClrAlerts.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.multiAlertService.manage(this.allAlerts);
        this.multiAlertService.changes.subscribe((/**
         * @param {?} index
         * @return {?}
         */
        function (index) {
            _this.currentAlertIndexChange.next(index);
            _this.currentAlertChange.next(_this.multiAlertService.currentAlert);
        }));
    };
    /**
     * @return {?}
     */
    ClrAlerts.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.multiAlertService.destroy();
    };
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
    ClrAlerts.ctorParameters = function () { return [
        { type: MultiAlertService }
    ]; };
    ClrAlerts.propDecorators = {
        allAlerts: [{ type: ContentChildren, args: [ClrAlert,] }],
        _inputCurrentIndex: [{ type: Input, args: ['clrCurrentAlertIndex',] }],
        currentAlertIndexChange: [{ type: Output, args: ['clrCurrentAlertIndexChange',] }],
        currentAlert: [{ type: Input, args: ['clrCurrentAlert',] }],
        currentAlertChange: [{ type: Output, args: ['clrCurrentAlertChange',] }]
    };
    return ClrAlerts;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrAlertsPager = /** @class */ (function () {
    function ClrAlertsPager(multiAlertService, commonStrings) {
        this.multiAlertService = multiAlertService;
        this.commonStrings = commonStrings;
        this.currentAlertChange = new EventEmitter(false);
        this.currentAlertIndexChange = new EventEmitter();
    }
    Object.defineProperty(ClrAlertsPager.prototype, "currentAlert", {
        get: /**
         * @return {?}
         */
        function () {
            return this.multiAlertService.currentAlert;
        },
        /**
         * Input/Output to support two way binding on current alert instance
         */
        set: /**
         * Input/Output to support two way binding on current alert instance
         * @param {?} alert
         * @return {?}
         */
        function (alert) {
            if (alert) {
                this.multiAlertService.currentAlert = alert;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrAlertsPager.prototype, "currentAlertIndex", {
        get: /**
         * @return {?}
         */
        function () {
            return this.multiAlertService.current;
        },
        /**
         * Input/Output to support two way binding on current alert index
         */
        set: /**
         * Input/Output to support two way binding on current alert index
         * @param {?} index
         * @return {?}
         */
        function (index) {
            this.multiAlertService.current = index;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ClrAlertsPager.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.multiAlertServiceChanges = this.multiAlertService.changes.subscribe((/**
         * @param {?} index
         * @return {?}
         */
        function (index) {
            _this.currentAlertIndexChange.emit(index);
            _this.currentAlertChange.emit(_this.multiAlertService.activeAlerts[index]);
        }));
    };
    /**
     * @return {?}
     */
    ClrAlertsPager.prototype.pageUp = /**
     * @return {?}
     */
    function () {
        this.multiAlertService.next();
    };
    /**
     * @return {?}
     */
    ClrAlertsPager.prototype.pageDown = /**
     * @return {?}
     */
    function () {
        this.multiAlertService.previous();
    };
    /**
     * @return {?}
     */
    ClrAlertsPager.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.multiAlertServiceChanges.unsubscribe();
    };
    ClrAlertsPager.decorators = [
        { type: Component, args: [{
                    selector: 'clr-alerts-pager',
                    template: "<!--\n  ~ Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.\n  ~ This software is released under MIT license.\n  ~ The full license information can be found in LICENSE in the root directory of this project.\n  -->\n\n<div class=\"alerts-pager-control\">\n    <div class=\"alerts-page-down\">\n        <button class=\"alerts-pager-button\" (click)=\"pageDown()\">\n            <clr-icon shape=\"caret left\" [attr.title]=\"commonStrings.previous\"></clr-icon>\n        </button>\n    </div>\n    <div class=\"alerts-pager-text\">\n        {{this.multiAlertService.current+1}} / {{this.multiAlertService.count}}\n    </div>\n    <div class=\"alerts-page-up\">\n        <button class=\"alerts-pager-button\" (click)=\"pageUp()\">\n            <clr-icon shape=\"caret right\" [attr.title]=\"commonStrings.next\"></clr-icon>\n        </button>\n    </div>\n</div>\n",
                    host: { '[class.alerts-pager]': 'true' }
                }] }
    ];
    /** @nocollapse */
    ClrAlertsPager.ctorParameters = function () { return [
        { type: MultiAlertService },
        { type: ClrCommonStrings }
    ]; };
    ClrAlertsPager.propDecorators = {
        currentAlert: [{ type: Input, args: ['clrCurrentAlert',] }],
        currentAlertChange: [{ type: Output, args: ['clrCurrentAlertChange',] }],
        currentAlertIndex: [{ type: Input, args: ['clrCurrentAlertIndex',] }],
        currentAlertIndexChange: [{ type: Output, args: ['clrCurrentAlertIndexChange',] }]
    };
    return ClrAlertsPager;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var CLR_ALERT_DIRECTIVES = [ClrAlert, ClrAlertItem, ClrAlerts, ClrAlertsPager];
var ClrAlertModule = /** @class */ (function () {
    function ClrAlertModule() {
    }
    ClrAlertModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, ClrIconModule, ClrDropdownModule],
                    declarations: [CLR_ALERT_DIRECTIVES],
                    exports: [CLR_ALERT_DIRECTIVES],
                },] }
    ];
    return ClrAlertModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrEmphasisModule = /** @class */ (function () {
    function ClrEmphasisModule() {
    }
    ClrEmphasisModule.decorators = [
        { type: NgModule, args: [{ exports: [ClrAlertModule] },] }
    ];
    return ClrEmphasisModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ResponsiveNavCodes = /** @class */ (function () {
    function ResponsiveNavCodes() {
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
    return ResponsiveNavCodes;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ResponsiveNavControlMessage = /** @class */ (function () {
    function ResponsiveNavControlMessage(_controlCode, _navLevel) {
        this._controlCode = _controlCode;
        this._navLevel = _navLevel;
    }
    Object.defineProperty(ResponsiveNavControlMessage.prototype, "controlCode", {
        get: /**
         * @return {?}
         */
        function () {
            return this._controlCode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResponsiveNavControlMessage.prototype, "navLevel", {
        get: /**
         * @return {?}
         */
        function () {
            return this._navLevel;
        },
        enumerable: true,
        configurable: true
    });
    return ResponsiveNavControlMessage;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ResponsiveNavigationService = /** @class */ (function () {
    function ResponsiveNavigationService() {
        this.responsiveNavList = [];
        this.registerNavSubject = new ReplaySubject();
        this.controlNavSubject = new Subject();
        this.closeAllNavs(); // We start with all navs closed
    }
    Object.defineProperty(ResponsiveNavigationService.prototype, "registeredNavs", {
        get: /**
         * @return {?}
         */
        function () {
            return this.registerNavSubject.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResponsiveNavigationService.prototype, "navControl", {
        get: /**
         * @return {?}
         */
        function () {
            return this.controlNavSubject.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} navLevel
     * @return {?}
     */
    ResponsiveNavigationService.prototype.registerNav = /**
     * @param {?} navLevel
     * @return {?}
     */
    function (navLevel) {
        if (!navLevel || this.isNavRegistered(navLevel)) {
            return;
        }
        this.responsiveNavList.push(navLevel);
        this.registerNavSubject.next(this.responsiveNavList);
    };
    /**
     * @param {?} navLevel
     * @return {?}
     */
    ResponsiveNavigationService.prototype.isNavRegistered = /**
     * @param {?} navLevel
     * @return {?}
     */
    function (navLevel) {
        if (this.responsiveNavList.indexOf(navLevel) > -1) {
            console.error('Multiple clr-nav-level ' + navLevel + ' attributes found. Please make sure that only one exists');
            return true;
        }
        return false;
    };
    /**
     * @param {?} navLevel
     * @return {?}
     */
    ResponsiveNavigationService.prototype.unregisterNav = /**
     * @param {?} navLevel
     * @return {?}
     */
    function (navLevel) {
        /** @type {?} */
        var index = this.responsiveNavList.indexOf(navLevel);
        if (index > -1) {
            this.responsiveNavList.splice(index, 1);
            this.registerNavSubject.next(this.responsiveNavList);
        }
    };
    /**
     * @param {?} controlCode
     * @param {?} navLevel
     * @return {?}
     */
    ResponsiveNavigationService.prototype.sendControlMessage = /**
     * @param {?} controlCode
     * @param {?} navLevel
     * @return {?}
     */
    function (controlCode, navLevel) {
        /** @type {?} */
        var message = new ResponsiveNavControlMessage(controlCode, navLevel);
        this.controlNavSubject.next(message);
    };
    /**
     * @return {?}
     */
    ResponsiveNavigationService.prototype.closeAllNavs = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var message = new ResponsiveNavControlMessage(ResponsiveNavCodes.NAV_CLOSE_ALL, -999);
        this.controlNavSubject.next(message);
    };
    ResponsiveNavigationService.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */
    ResponsiveNavigationService.ctorParameters = function () { return []; };
    /** @nocollapse */ ResponsiveNavigationService.ngInjectableDef = defineInjectable({ factory: function ResponsiveNavigationService_Factory() { return new ResponsiveNavigationService(); }, token: ResponsiveNavigationService, providedIn: "root" });
    return ResponsiveNavigationService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrMainContainer = /** @class */ (function () {
    function ClrMainContainer(elRef, responsiveNavService) {
        this.elRef = elRef;
        this.responsiveNavService = responsiveNavService;
    }
    /**
     * @return {?}
     */
    ClrMainContainer.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._classList = this.elRef.nativeElement.classList;
        this._subscription = this.responsiveNavService.navControl.subscribe({
            next: (/**
             * @param {?} message
             * @return {?}
             */
            function (message) {
                _this.processMessage(message);
            }),
        });
    };
    /**
     * @param {?} message
     * @return {?}
     */
    ClrMainContainer.prototype.processMessage = /**
     * @param {?} message
     * @return {?}
     */
    function (message) {
        /** @type {?} */
        var navClass = ResponsiveNavCodes.NAV_CLASS_HAMBURGER_MENU;
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
    };
    /**
     * @param {?} controlCode
     * @param {?} navClass
     * @return {?}
     */
    ClrMainContainer.prototype.controlNav = /**
     * @param {?} controlCode
     * @param {?} navClass
     * @return {?}
     */
    function (controlCode, navClass) {
        if (controlCode === ResponsiveNavCodes.NAV_OPEN) {
            this._classList.add(navClass);
        }
        else if (controlCode === ResponsiveNavCodes.NAV_CLOSE) {
            this._classList.remove(navClass);
        }
        else if (controlCode === ResponsiveNavCodes.NAV_TOGGLE) {
            this._classList.toggle(navClass);
        }
    };
    /**
     * @return {?}
     */
    ClrMainContainer.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._subscription.unsubscribe();
    };
    ClrMainContainer.decorators = [
        { type: Directive, args: [{ selector: 'clr-main-container', host: { '[class.main-container]': 'true' } },] }
    ];
    /** @nocollapse */
    ClrMainContainer.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ResponsiveNavigationService }
    ]; };
    return ClrMainContainer;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var CLR_LAYOUT_DIRECTIVES = [ClrMainContainer];
var ClrMainContainerModule = /** @class */ (function () {
    function ClrMainContainerModule() {
    }
    ClrMainContainerModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, ClrIconModule],
                    declarations: [CLR_LAYOUT_DIRECTIVES],
                    exports: [CLR_LAYOUT_DIRECTIVES],
                },] }
    ];
    return ClrMainContainerModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var MainContainerWillyWonka = /** @class */ (function (_super) {
    __extends(MainContainerWillyWonka, _super);
    function MainContainerWillyWonka() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MainContainerWillyWonka.decorators = [
        { type: Directive, args: [{ selector: 'clr-main-container' },] }
    ];
    return MainContainerWillyWonka;
}(WillyWonka));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NavDetectionOompaLoompa = /** @class */ (function (_super) {
    __extends(NavDetectionOompaLoompa, _super);
    function NavDetectionOompaLoompa(cdr, willyWonka, responsiveNavService) {
        var _this = this;
        if (!willyWonka) {
            throw new Error('clr-header should only be used inside of a clr-main-container');
        }
        _this = _super.call(this, cdr, willyWonka) || this;
        _this.responsiveNavService = responsiveNavService;
        return _this;
    }
    Object.defineProperty(NavDetectionOompaLoompa.prototype, "flavor", {
        // NavDetectionOompaLoompa is the addition of the nav levels
        // Since we support 2 levels, the possibilities are 0, 1 or 3 (1 + 2)
        get: 
        // NavDetectionOompaLoompa is the addition of the nav levels
        // Since we support 2 levels, the possibilities are 0, 1 or 3 (1 + 2)
        /**
         * @return {?}
         */
        function () {
            return this.responsiveNavService.responsiveNavList.reduce((/**
             * @param {?} sum
             * @param {?} navLevel
             * @return {?}
             */
            function (sum, navLevel) { return sum + navLevel; }), 0);
        },
        enumerable: true,
        configurable: true
    });
    NavDetectionOompaLoompa.decorators = [
        { type: Directive, args: [{ selector: 'clr-header' },] }
    ];
    /** @nocollapse */
    NavDetectionOompaLoompa.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: MainContainerWillyWonka, decorators: [{ type: Optional }] },
        { type: ResponsiveNavigationService }
    ]; };
    return NavDetectionOompaLoompa;
}(OompaLoompa));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrHeader = /** @class */ (function () {
    function ClrHeader(responsiveNavService, commonStrings) {
        var _this = this;
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
            function (navLevelList) {
                _this.initializeNavTriggers(navLevelList);
            }),
        });
    }
    // reset triggers. handles cases when an application has different nav levels on different pages.
    // reset triggers. handles cases when an application has different nav levels on different pages.
    /**
     * @return {?}
     */
    ClrHeader.prototype.resetNavTriggers = 
    // reset triggers. handles cases when an application has different nav levels on different pages.
    /**
     * @return {?}
     */
    function () {
        this.isNavLevel1OnPage = false;
        this.isNavLevel2OnPage = false;
    };
    // decides which triggers to show on the header
    // decides which triggers to show on the header
    /**
     * @param {?} navList
     * @return {?}
     */
    ClrHeader.prototype.initializeNavTriggers = 
    // decides which triggers to show on the header
    /**
     * @param {?} navList
     * @return {?}
     */
    function (navList) {
        var _this = this;
        this.resetNavTriggers();
        if (navList.length > 2) {
            console.error('More than 2 Nav Levels detected.');
            return;
        }
        navList.forEach((/**
         * @param {?} navLevel
         * @return {?}
         */
        function (navLevel) {
            if (navLevel === ResponsiveNavCodes.NAV_LEVEL_1) {
                _this.isNavLevel1OnPage = true;
            }
            else if (navLevel === ResponsiveNavCodes.NAV_LEVEL_2) {
                _this.isNavLevel2OnPage = true;
            }
        }));
    };
    // closes the nav that is open
    // closes the nav that is open
    /**
     * @return {?}
     */
    ClrHeader.prototype.closeOpenNav = 
    // closes the nav that is open
    /**
     * @return {?}
     */
    function () {
        this.responsiveNavService.closeAllNavs();
    };
    // toggles the nav that is open
    // toggles the nav that is open
    /**
     * @param {?} navLevel
     * @return {?}
     */
    ClrHeader.prototype.toggleNav = 
    // toggles the nav that is open
    /**
     * @param {?} navLevel
     * @return {?}
     */
    function (navLevel) {
        this.openNavLevel = this.openNavLevel === navLevel ? null : navLevel;
        this.responsiveNavService.sendControlMessage(ResponsiveNavCodes.NAV_TOGGLE, navLevel);
    };
    /**
     * @return {?}
     */
    ClrHeader.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._subscription.unsubscribe();
    };
    ClrHeader.decorators = [
        { type: Component, args: [{
                    selector: 'clr-header',
                    template: "\n        <button\n            type=\"button\"\n            *ngIf=\"isNavLevel1OnPage\"\n            class=\"header-hamburger-trigger\"\n            [attr.aria-label]=\"(openNavLevel !== responsiveNavCodes.NAV_LEVEL_1) ? commonStrings.open : commonStrings.close\"\n            (click)=\"toggleNav(responsiveNavCodes.NAV_LEVEL_1)\">\n            <span></span>\n        </button>\n        <ng-content></ng-content>\n        <button\n            type=\"button\"\n            *ngIf=\"isNavLevel2OnPage\"\n            class=\"header-overflow-trigger\"\n            [attr.aria-label]=\"(openNavLevel !== responsiveNavCodes.NAV_LEVEL_2) ? commonStrings.open : commonStrings.close\"\n            (click)=\"toggleNav(responsiveNavCodes.NAV_LEVEL_2)\">\n            <span></span>\n        </button>\n        <div class=\"header-backdrop\" (click)=\"closeOpenNav()\"></div>\n    ",
                    host: { '[class.header]': 'true' }
                }] }
    ];
    /** @nocollapse */
    ClrHeader.ctorParameters = function () { return [
        { type: ResponsiveNavigationService },
        { type: ClrCommonStrings }
    ]; };
    return ClrHeader;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrNavLevel = /** @class */ (function () {
    function ClrNavLevel(responsiveNavService, elementRef) {
        this.responsiveNavService = responsiveNavService;
        this.elementRef = elementRef;
    }
    /**
     * @return {?}
     */
    ClrNavLevel.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (this.level !== ResponsiveNavCodes.NAV_LEVEL_1 && this.level !== ResponsiveNavCodes.NAV_LEVEL_2) {
            console.error('Nav Level can only be 1 or 2');
            return;
        }
        this.responsiveNavService.registerNav(this.level);
        this.addNavClass(this.level);
    };
    /**
     * @param {?} level
     * @return {?}
     */
    ClrNavLevel.prototype.addNavClass = /**
     * @param {?} level
     * @return {?}
     */
    function (level) {
        /** @type {?} */
        var navHostClassList = this.elementRef.nativeElement.classList;
        if (level === ResponsiveNavCodes.NAV_LEVEL_1) {
            navHostClassList.add(ResponsiveNavCodes.NAV_CLASS_LEVEL_1);
        }
        else if (level === ResponsiveNavCodes.NAV_LEVEL_2) {
            navHostClassList.add(ResponsiveNavCodes.NAV_CLASS_LEVEL_2);
        }
    };
    Object.defineProperty(ClrNavLevel.prototype, "level", {
        get: /**
         * @return {?}
         */
        function () {
            return this._level;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrNavLevel.prototype, "responsiveNavCodes", {
        // getter to access the responsive navigation codes from the template
        get: 
        // getter to access the responsive navigation codes from the template
        /**
         * @return {?}
         */
        function () {
            return ResponsiveNavCodes;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ClrNavLevel.prototype.open = /**
     * @return {?}
     */
    function () {
        this.responsiveNavService.sendControlMessage(ResponsiveNavCodes.NAV_OPEN, this.level);
    };
    /**
     * @return {?}
     */
    ClrNavLevel.prototype.close = /**
     * @return {?}
     */
    function () {
        this.responsiveNavService.sendControlMessage(ResponsiveNavCodes.NAV_CLOSE, this.level);
    };
    // TODO: Figure out whats the best way to do this. Possible methods
    // 1. HostListener (current solution)
    // 2. Directives on the .nav-link class. We discussed on moving away from class selectors but I forget the reason
    // why
    // TODO: Figure out whats the best way to do this. Possible methods
    // 1. HostListener (current solution)
    // 2. Directives on the .nav-link class. We discussed on moving away from class selectors but I forget the reason
    // why
    /**
     * @param {?} target
     * @return {?}
     */
    ClrNavLevel.prototype.onMouseClick = 
    // TODO: Figure out whats the best way to do this. Possible methods
    // 1. HostListener (current solution)
    // 2. Directives on the .nav-link class. We discussed on moving away from class selectors but I forget the reason
    // why
    /**
     * @param {?} target
     * @return {?}
     */
    function (target) {
        /** @type {?} */
        var current = target;
        // Get the element in the DOM on which the mouse was clicked
        /** @type {?} */
        var navHost = this.elementRef.nativeElement;
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
    };
    /**
     * @return {?}
     */
    ClrNavLevel.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.responsiveNavService.unregisterNav(this.level);
    };
    ClrNavLevel.decorators = [
        { type: Directive, args: [{ selector: '[clr-nav-level]' },] }
    ];
    /** @nocollapse */
    ClrNavLevel.ctorParameters = function () { return [
        { type: ResponsiveNavigationService },
        { type: ElementRef }
    ]; };
    ClrNavLevel.propDecorators = {
        _level: [{ type: Input, args: ['clr-nav-level',] }],
        onMouseClick: [{ type: HostListener, args: ['click', ['$event.target'],] }]
    };
    return ClrNavLevel;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var CLR_NAVIGATION_DIRECTIVES = [
    ClrHeader,
    ClrNavLevel,
    NavDetectionOompaLoompa,
    MainContainerWillyWonka,
];
var ClrNavigationModule = /** @class */ (function () {
    function ClrNavigationModule() {
    }
    ClrNavigationModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, ClrIconModule, ClrDropdownModule],
                    declarations: [CLR_NAVIGATION_DIRECTIVES],
                    exports: [CLR_NAVIGATION_DIRECTIVES],
                },] }
    ];
    return ClrNavigationModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var TemplateRefContainer = /** @class */ (function () {
    function TemplateRefContainer() {
    }
    TemplateRefContainer.decorators = [
        { type: Component, args: [{
                    template: "\n      <ng-template>\n        <ng-content></ng-content>\n      </ng-template>\n    "
                }] }
    ];
    TemplateRefContainer.propDecorators = {
        template: [{ type: ViewChild, args: [TemplateRef,] }]
    };
    return TemplateRefContainer;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var TEMPLATE_REF_DIRECTIVES = [TemplateRefContainer];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrTemplateRefModule = /** @class */ (function () {
    function ClrTemplateRefModule() {
    }
    ClrTemplateRefModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    declarations: [TEMPLATE_REF_DIRECTIVES],
                    entryComponents: [TEMPLATE_REF_DIRECTIVES],
                    exports: [TEMPLATE_REF_DIRECTIVES],
                },] }
    ];
    return ClrTemplateRefModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var TabsWillyWonka = /** @class */ (function (_super) {
    __extends(TabsWillyWonka, _super);
    function TabsWillyWonka() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TabsWillyWonka.decorators = [
        { type: Directive, args: [{ selector: 'clr-tabs' },] }
    ];
    return TabsWillyWonka;
}(WillyWonka));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ActiveOompaLoompa = /** @class */ (function (_super) {
    __extends(ActiveOompaLoompa, _super);
    function ActiveOompaLoompa(cdr, willyWonka, id, ifActive) {
        var _this = this;
        if (!willyWonka) {
            throw new Error('clrTabLink and clr-tab-content should only be used inside of a clr-tabs');
        }
        _this = _super.call(this, cdr, willyWonka) || this;
        _this.ifActive = ifActive;
        _this.id = id;
        return _this;
    }
    Object.defineProperty(ActiveOompaLoompa.prototype, "flavor", {
        get: /**
         * @return {?}
         */
        function () {
            return this.ifActive.current === this.id;
        },
        enumerable: true,
        configurable: true
    });
    ActiveOompaLoompa.decorators = [
        { type: Directive, args: [{ selector: '[clrTabLink], clr-tab-content' },] }
    ];
    /** @nocollapse */
    ActiveOompaLoompa.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: TabsWillyWonka, decorators: [{ type: Optional }] },
        { type: Number, decorators: [{ type: Inject, args: [IF_ACTIVE_ID,] }] },
        { type: IfActiveService }
    ]; };
    return ActiveOompaLoompa;
}(OompaLoompa));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// TODO: if we find more components that could use this, consider moving this to utils
var AriaService = /** @class */ (function () {
    function AriaService() {
    }
    AriaService.decorators = [
        { type: Injectable }
    ];
    return AriaService;
}());

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
var TabsLayout = {
    HORIZONTAL: 'horizontal',
    VERTICAL: 'vertical',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var TabsService = /** @class */ (function () {
    function TabsService() {
        this._children = [];
        this.layout = TabsLayout.HORIZONTAL;
    }
    /**
     * @param {?} tab
     * @return {?}
     */
    TabsService.prototype.register = /**
     * @param {?} tab
     * @return {?}
     */
    function (tab) {
        this._children.push(tab);
    };
    Object.defineProperty(TabsService.prototype, "children", {
        get: /**
         * @return {?}
         */
        function () {
            return this._children;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabsService.prototype, "activeTab", {
        get: /**
         * @return {?}
         */
        function () {
            return this.children.find((/**
             * @param {?} tab
             * @return {?}
             */
            function (tab) {
                return tab.active;
            }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabsService.prototype, "overflowTabs", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.layout === TabsLayout.VERTICAL) {
                return [];
            }
            else {
                return this.children.filter((/**
                 * @param {?} tab
                 * @return {?}
                 */
                function (tab) { return tab.tabLink.inOverflow === true; }));
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} tab
     * @return {?}
     */
    TabsService.prototype.unregister = /**
     * @param {?} tab
     * @return {?}
     */
    function (tab) {
        /** @type {?} */
        var index = this.children.indexOf(tab);
        if (index > -1) {
            this.children.splice(index, 1);
        }
    };
    TabsService.decorators = [
        { type: Injectable }
    ];
    return TabsService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var nbTabContentComponents = 0;
var ClrTabContent = /** @class */ (function () {
    function ClrTabContent(ifActiveService, id, ariaService) {
        this.ifActiveService = ifActiveService;
        this.id = id;
        this.ariaService = ariaService;
        if (!this.tabContentId) {
            this.tabContentId = 'clr-tab-content-' + nbTabContentComponents++;
        }
    }
    Object.defineProperty(ClrTabContent.prototype, "ariaLabelledBy", {
        get: /**
         * @return {?}
         */
        function () {
            return this.ariaService.ariaLabelledBy;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTabContent.prototype, "tabContentId", {
        get: /**
         * @return {?}
         */
        function () {
            return this.ariaService.ariaControls;
        },
        set: /**
         * @param {?} id
         * @return {?}
         */
        function (id) {
            this.ariaService.ariaControls = id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTabContent.prototype, "active", {
        get: /**
         * @return {?}
         */
        function () {
            return this.ifActiveService.current === this.id;
        },
        enumerable: true,
        configurable: true
    });
    ClrTabContent.decorators = [
        { type: Component, args: [{
                    selector: 'clr-tab-content',
                    template: "\n    <ng-template #tabContentProjectedRef>\n      <section [id]=\"tabContentId\" role=\"tabpanel\" class=\"tab-content\" [class.active]=\"active\"\n               [hidden]=\"!active\"\n               [attr.aria-labelledby]=\"ariaLabelledBy\"\n               [attr.aria-expanded]=\"active\"\n               [attr.aria-hidden]=\"!active\">\n        <ng-content></ng-content>\n      </section>\n    </ng-template>\n    "
                }] }
    ];
    /** @nocollapse */
    ClrTabContent.ctorParameters = function () { return [
        { type: IfActiveService },
        { type: Number, decorators: [{ type: Inject, args: [IF_ACTIVE_ID,] }] },
        { type: AriaService }
    ]; };
    ClrTabContent.propDecorators = {
        templateRef: [{ type: ViewChild, args: ['tabContentProjectedRef',] }],
        tabContentId: [{ type: Input, args: ['id',] }]
    };
    return ClrTabContent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var nbTabsComponent = 0;
/** @type {?} */
var TABS_ID = new InjectionToken('TABS_ID');
/**
 * @return {?}
 */
function tokenFactory$1() {
    return 'clr-tabs-' + nbTabsComponent++;
}
/** @type {?} */
var TABS_ID_PROVIDER = {
    provide: TABS_ID,
    useFactory: tokenFactory$1,
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var nbTabLinkComponents = 0;
var ClrTabLink = /** @class */ (function () {
    function ClrTabLink(ifActiveService, id, ariaService, el, cfr, viewContainerRef, tabsService, tabsId) {
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
        var factory = this.cfr.resolveComponentFactory(TemplateRefContainer);
        this.templateRefContainer = this.viewContainerRef.createComponent(factory, 1, undefined, [
            [this.el.nativeElement],
        ]).instance;
    }
    Object.defineProperty(ClrTabLink.prototype, "inOverflow", {
        get: /**
         * @return {?}
         */
        function () {
            return this._inOverflow && this.tabsService.layout !== TabsLayout.VERTICAL;
        },
        set: /**
         * @param {?} inOverflow
         * @return {?}
         */
        function (inOverflow) {
            this._inOverflow = inOverflow;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTabLink.prototype, "addLinkClasses", {
        get: /**
         * @return {?}
         */
        function () {
            return !this.inOverflow;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTabLink.prototype, "ariaControls", {
        get: /**
         * @return {?}
         */
        function () {
            return this.ariaService.ariaControls;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTabLink.prototype, "tabLinkId", {
        get: /**
         * @return {?}
         */
        function () {
            return this.ariaService.ariaLabelledBy;
        },
        set: /**
         * @param {?} id
         * @return {?}
         */
        function (id) {
            this.ariaService.ariaLabelledBy = id;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ClrTabLink.prototype.activate = /**
     * @return {?}
     */
    function () {
        this.ifActiveService.current = this.id;
    };
    Object.defineProperty(ClrTabLink.prototype, "active", {
        get: /**
         * @return {?}
         */
        function () {
            return this.ifActiveService.current === this.id;
        },
        enumerable: true,
        configurable: true
    });
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
    ClrTabLink.ctorParameters = function () { return [
        { type: IfActiveService },
        { type: Number, decorators: [{ type: Inject, args: [IF_ACTIVE_ID,] }] },
        { type: AriaService },
        { type: ElementRef },
        { type: ComponentFactoryResolver },
        { type: ViewContainerRef },
        { type: TabsService },
        { type: Number, decorators: [{ type: Inject, args: [TABS_ID,] }] }
    ]; };
    ClrTabLink.propDecorators = {
        inOverflow: [{ type: Input, args: ['clrTabLinkInOverflow',] }],
        addLinkClasses: [{ type: HostBinding, args: ['class.btn-link',] }, { type: HostBinding, args: ['class.nav-link',] }],
        ariaControls: [{ type: HostBinding, args: ['attr.aria-controls',] }],
        tabLinkId: [{ type: HostBinding, args: ['id',] }, { type: Input, args: ['id',] }],
        activate: [{ type: HostListener, args: ['click',] }],
        active: [{ type: HostBinding, args: ['class.active',] }, { type: HostBinding, args: ['attr.aria-selected',] }]
    };
    return ClrTabLink;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrTab = /** @class */ (function () {
    function ClrTab(ifActiveService, id, tabsService) {
        this.ifActiveService = ifActiveService;
        this.id = id;
        this.tabsService = tabsService;
        tabsService.register(this);
    }
    /**
     * @return {?}
     */
    ClrTab.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.tabsService.unregister(this);
    };
    Object.defineProperty(ClrTab.prototype, "active", {
        get: /**
         * @return {?}
         */
        function () {
            return this.ifActiveService.current === this.id;
        },
        enumerable: true,
        configurable: true
    });
    ClrTab.decorators = [
        { type: Component, args: [{
                    selector: 'clr-tab',
                    template: "\n        <ng-content></ng-content>\n    ",
                    providers: [IF_ACTIVE_ID_PROVIDER, AriaService]
                }] }
    ];
    /** @nocollapse */
    ClrTab.ctorParameters = function () { return [
        { type: IfActiveService },
        { type: Number, decorators: [{ type: Inject, args: [IF_ACTIVE_ID,] }] },
        { type: TabsService }
    ]; };
    ClrTab.propDecorators = {
        tabLink: [{ type: ContentChild, args: [ClrTabLink,] }],
        tabContent: [{ type: ContentChild, args: [ClrTabContent,] }]
    };
    return ClrTab;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrTabOverflowContent = /** @class */ (function (_super) {
    __extends(ClrTabOverflowContent, _super);
    function ClrTabOverflowContent(injector, parentHost) {
        var _this = _super.call(this, injector, parentHost) || this;
        _this.anchorPoint = Point.BOTTOM_RIGHT;
        _this.popoverPoint = Point.RIGHT_TOP;
        _this.closeOnOutsideClick = true;
        return _this;
    }
    ClrTabOverflowContent.decorators = [
        { type: Component, args: [{
                    selector: 'clr-tab-overflow-content',
                    template: "\n        <ng-content></ng-content>\n    ",
                    host: {
                        '[class.dropdown-menu]': 'true',
                    }
                }] }
    ];
    /** @nocollapse */
    ClrTabOverflowContent.ctorParameters = function () { return [
        { type: Injector },
        { type: ElementRef, decorators: [{ type: SkipSelf }] }
    ]; };
    return ClrTabOverflowContent;
}(AbstractPopover));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrTabs = /** @class */ (function () {
    function ClrTabs(ifActiveService, ifOpenService, tabsService, tabsId, commonStrings) {
        this.ifActiveService = ifActiveService;
        this.ifOpenService = ifOpenService;
        this.tabsService = tabsService;
        this.tabsId = tabsId;
        this.commonStrings = commonStrings;
        this.subscriptions = [];
        this._tabLinkDirectives = [];
    }
    Object.defineProperty(ClrTabs.prototype, "layout", {
        get: /**
         * @return {?}
         */
        function () {
            return this.tabsService.layout;
        },
        set: /**
         * @param {?} layout
         * @return {?}
         */
        function (layout) {
            if (Object.keys(TabsLayout)
                .map((/**
             * @param {?} key
             * @return {?}
             */
            function (key) {
                return TabsLayout[key];
            }))
                .indexOf(layout) >= 0) {
                this.tabsService.layout = layout;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTabs.prototype, "tabLinkDirectives", {
        get: /**
         * @return {?}
         */
        function () {
            return this._tabLinkDirectives;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTabs.prototype, "tabContents", {
        get: /**
         * @return {?}
         */
        function () {
            return this.tabs.filter((/**
             * @param {?} tab
             * @return {?}
             */
            function (tab) { return !!tab.tabContent; })).map((/**
             * @param {?} tab
             * @return {?}
             */
            function (tab) { return tab.tabContent; }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTabs.prototype, "activeTabInOverflow", {
        get: /**
         * @return {?}
         */
        function () {
            return this.tabsService.overflowTabs.indexOf(this.tabsService.activeTab) > -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTabs.prototype, "tabIds", {
        get: /**
         * @return {?}
         */
        function () {
            return this.tabsService.children.map((/**
             * @param {?} tab
             * @return {?}
             */
            function (tab) { return tab.tabLink.tabLinkId; })).join(' ');
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ClrTabs.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._tabLinkDirectives = this.tabs.map((/**
         * @param {?} tab
         * @return {?}
         */
        function (tab) { return tab.tabLink; }));
        this.subscriptions.push(this.tabs.changes.subscribe((/**
         * @return {?}
         */
        function () {
            _this._tabLinkDirectives = _this.tabs.map((/**
             * @param {?} tab
             * @return {?}
             */
            function (tab) { return tab.tabLink; }));
        })));
        if (typeof this.ifActiveService.current === 'undefined' && this.tabLinkDirectives[0]) {
            this.tabLinkDirectives[0].activate();
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    ClrTabs.prototype.toggleOverflow = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.ifOpenService.toggleWithEvent(event);
    };
    Object.defineProperty(ClrTabs.prototype, "isVertical", {
        get: /**
         * @return {?}
         */
        function () {
            return this.layout === TabsLayout.VERTICAL;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ClrTabs.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        function (sub) {
            sub.unsubscribe();
        }));
    };
    ClrTabs.decorators = [
        { type: Component, args: [{
                    selector: 'clr-tabs',
                    template: "\n        <ul class=\"nav\" role=\"tablist\" [attr.aria-owns]=\"tabIds\">\n            <!--tab links-->\n            <ng-container *ngFor=\"let link of tabLinkDirectives\">\n                <ng-container *ngIf=\"link.tabsId === tabsId && !link.inOverflow\">\n                    <li role=\"presentation\" class=\"nav-item\">\n                        <ng-container [ngTemplateOutlet]=\"link.templateRefContainer.template\"></ng-container>\n                    </li>\n                </ng-container>\n            </ng-container>\n            <ng-container *ngIf=\"tabsService.overflowTabs.length > 0\">\n                <div class=\"tabs-overflow bottom-right\" [class.open]=\"ifOpenService.open\"\n                     (click)=\"toggleOverflow($event)\">\n                    <li role=\"presentation\" class=\"nav-item\">\n                        <button class=\"btn btn-link nav-link dropdown-toggle\" type=\"button\" [class.active]=\"activeTabInOverflow\">\n                            <clr-icon shape=\"ellipsis-horizontal\"\n                              [class.is-info]=\"ifOpenService.open\"\n                              [attr.title]=\"commonStrings.more\"></clr-icon>\n                        </button>\n                    </li>\n                    <!--tab links in overflow menu-->\n                    <clr-tab-overflow-content>\n                        <ng-container *ngFor=\"let link of tabLinkDirectives\">\n                            <ng-container *ngIf=\"link.tabsId === tabsId && link.inOverflow\"\n                                          [ngTemplateOutlet]=\"link.templateRefContainer.template\">\n                            </ng-container>\n                        </ng-container>\n                    </clr-tab-overflow-content>\n                </div>\n            </ng-container>\n        </ul>\n        <!--tab content-->\n        <ng-container *ngFor=\"let content of tabContents\">\n            <ng-container [ngTemplateOutlet]=\"content.templateRef\"></ng-container>\n        </ng-container>\n    ",
                    providers: [IfActiveService, IfOpenService, TabsService, TABS_ID_PROVIDER]
                }] }
    ];
    /** @nocollapse */
    ClrTabs.ctorParameters = function () { return [
        { type: IfActiveService },
        { type: IfOpenService },
        { type: TabsService },
        { type: Number, decorators: [{ type: Inject, args: [TABS_ID,] }] },
        { type: ClrCommonStrings }
    ]; };
    ClrTabs.propDecorators = {
        layout: [{ type: Input, args: ['clrLayout',] }],
        tabs: [{ type: ContentChildren, args: [ClrTab,] }],
        isVertical: [{ type: HostBinding, args: ['class.tabs-vertical',] }]
    };
    return ClrTabs;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var CLR_TABS_DIRECTIVES = [
    ClrTabContent,
    ClrTab,
    ClrTabs,
    ClrTabOverflowContent,
    ClrTabLink,
    TabsWillyWonka,
    ActiveOompaLoompa,
];
var ClrTabsModule = /** @class */ (function () {
    function ClrTabsModule() {
    }
    ClrTabsModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, ClrCommonPopoverModule, ClrConditionalModule, ClrIconModule, ClrTemplateRefModule],
                    declarations: [CLR_TABS_DIRECTIVES],
                    exports: [CLR_TABS_DIRECTIVES, ClrConditionalModule],
                },] }
    ];
    return ClrTabsModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var VerticalNavGroupRegistrationService = /** @class */ (function () {
    function VerticalNavGroupRegistrationService() {
        this.navGroupCount = 0;
    }
    /**
     * @return {?}
     */
    VerticalNavGroupRegistrationService.prototype.registerNavGroup = /**
     * @return {?}
     */
    function () {
        this.navGroupCount++;
    };
    /**
     * @return {?}
     */
    VerticalNavGroupRegistrationService.prototype.unregisterNavGroup = /**
     * @return {?}
     */
    function () {
        this.navGroupCount--;
    };
    VerticalNavGroupRegistrationService.decorators = [
        { type: Injectable }
    ];
    return VerticalNavGroupRegistrationService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var VerticalNavIconService = /** @class */ (function () {
    function VerticalNavIconService() {
        this._icons = 0;
    }
    Object.defineProperty(VerticalNavIconService.prototype, "hasIcons", {
        get: /**
         * @return {?}
         */
        function () {
            return this._icons > 0;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    VerticalNavIconService.prototype.registerIcon = /**
     * @return {?}
     */
    function () {
        this._icons++;
    };
    /**
     * @return {?}
     */
    VerticalNavIconService.prototype.unregisterIcon = /**
     * @return {?}
     */
    function () {
        this._icons--;
    };
    VerticalNavIconService.decorators = [
        { type: Injectable }
    ];
    return VerticalNavIconService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var VerticalNavService = /** @class */ (function () {
    function VerticalNavService() {
        this._animateOnCollapsed = new Subject();
        this._collapsedChanged = new Subject();
        this._collapsed = false;
        this._collapsible = false;
    }
    Object.defineProperty(VerticalNavService.prototype, "animateOnCollapsed", {
        get: /**
         * @return {?}
         */
        function () {
            return this._animateOnCollapsed.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VerticalNavService.prototype, "collapsedChanged", {
        get: /**
         * @return {?}
         */
        function () {
            return this._collapsedChanged.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VerticalNavService.prototype, "collapsed", {
        get: /**
         * @return {?}
         */
        function () {
            return this._collapsed;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            value = !!value;
            if (this.collapsible && this._collapsed !== value) {
                this.updateCollapseBehavior(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VerticalNavService.prototype, "collapsible", {
        get: /**
         * @return {?}
         */
        function () {
            return this._collapsible;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            value = !!value;
            if (this._collapsible !== value) {
                if (!value && this.collapsed) {
                    this.updateCollapseBehavior(false);
                }
                this._collapsible = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    VerticalNavService.prototype.updateCollapseBehavior = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this._animateOnCollapsed.next(value);
        this._collapsed = value;
        this._collapsedChanged.next(value);
    };
    VerticalNavService.decorators = [
        { type: Injectable }
    ];
    return VerticalNavService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrVerticalNav = /** @class */ (function () {
    function ClrVerticalNav(_navService, _navIconService, _navGroupRegistrationService, commonStrings) {
        var _this = this;
        this._navService = _navService;
        this._navIconService = _navIconService;
        this._navGroupRegistrationService = _navGroupRegistrationService;
        this.commonStrings = commonStrings;
        this._collapsedChanged = new EventEmitter(true);
        this._sub = this._navService.collapsedChanged.subscribe((/**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            _this._collapsedChanged.emit(value);
        }));
    }
    Object.defineProperty(ClrVerticalNav.prototype, "collapsible", {
        get: /**
         * @return {?}
         */
        function () {
            return this._navService.collapsible;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._navService.collapsible = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrVerticalNav.prototype, "collapsed", {
        get: /**
         * @return {?}
         */
        function () {
            return this._navService.collapsed;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._navService.collapsed = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrVerticalNav.prototype, "hasNavGroups", {
        get: /**
         * @return {?}
         */
        function () {
            return this._navGroupRegistrationService.navGroupCount > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrVerticalNav.prototype, "hasIcons", {
        get: /**
         * @return {?}
         */
        function () {
            return this._navIconService.hasIcons;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ClrVerticalNav.prototype.toggleByButton = /**
     * @return {?}
     */
    function () {
        this.collapsed = !this.collapsed;
    };
    /**
     * @return {?}
     */
    ClrVerticalNav.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._sub.unsubscribe();
    };
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
    ClrVerticalNav.ctorParameters = function () { return [
        { type: VerticalNavService },
        { type: VerticalNavIconService },
        { type: VerticalNavGroupRegistrationService },
        { type: ClrCommonStrings }
    ]; };
    ClrVerticalNav.propDecorators = {
        collapsible: [{ type: Input, args: ['clrVerticalNavCollapsible',] }],
        collapsed: [{ type: Input, args: ['clrVerticalNavCollapsed',] }],
        _collapsedChanged: [{ type: Output, args: ['clrVerticalNavCollapsedChange',] }]
    };
    return ClrVerticalNav;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var VerticalNavGroupService = /** @class */ (function () {
    function VerticalNavGroupService() {
        this._expandChange = new Subject();
    }
    Object.defineProperty(VerticalNavGroupService.prototype, "expandChange", {
        get: /**
         * @return {?}
         */
        function () {
            return this._expandChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    VerticalNavGroupService.prototype.expand = /**
     * @return {?}
     */
    function () {
        this._expandChange.next(true);
    };
    VerticalNavGroupService.decorators = [
        { type: Injectable }
    ];
    return VerticalNavGroupService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var EXPANDED_STATE = 'expanded';
/** @type {?} */
var COLLAPSED_STATE = 'collapsed';
var ClrVerticalNavGroup = /** @class */ (function () {
    function ClrVerticalNavGroup(_itemExpand, _navGroupRegistrationService, _navGroupService, _navService, commonStrings) {
        var _this = this;
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
        function (value) {
            if (value && _this.expandAnimationState === COLLAPSED_STATE) {
                if (_this._navService.collapsed) {
                    _this._navService.collapsed = false;
                }
                _this.expandAnimationState = EXPANDED_STATE;
            }
            else if (!value && _this.expandAnimationState === EXPANDED_STATE) {
                _this.expandAnimationState = COLLAPSED_STATE;
            }
        })));
        // 1. If the nav is collapsing, close the open nav group + save its state
        // 2. If the nav is expanding, expand the nav group if the previous state was expanded
        this._subscriptions.push(this._navService.animateOnCollapsed.subscribe((/**
         * @param {?} goingToCollapse
         * @return {?}
         */
        function (goingToCollapse) {
            if (goingToCollapse && _this.expanded) {
                _this.wasExpanded = true;
                _this.expandAnimationState = COLLAPSED_STATE;
            }
            else if (!goingToCollapse && _this.wasExpanded) {
                _this.expandGroup();
                _this.wasExpanded = false;
            }
        })));
        // If a link is clicked, expand the nav group
        this._subscriptions.push(this._navGroupService.expandChange.subscribe((/**
         * @param {?} expand
         * @return {?}
         */
        function (expand) {
            if (expand && !_this.expanded) {
                _this.expandGroup();
            }
        })));
    }
    Object.defineProperty(ClrVerticalNavGroup.prototype, "expanded", {
        get: /**
         * @return {?}
         */
        function () {
            return this._itemExpand.expanded;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (this._itemExpand.expanded !== value) {
                this._itemExpand.expanded = value;
                this.expandedChange.emit(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrVerticalNavGroup.prototype, "userExpandedInput", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            value = !!value;
            if (this.expanded !== value) {
                // We have to call toggleExpand because some cases require animations to occur first
                // Directly setting the Expand service value skips the animation and can result in
                // nodes in the DOM but the nav group still being collapsed
                this.toggleExpand();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ClrVerticalNavGroup.prototype.expandGroup = /**
     * @return {?}
     */
    function () {
        this.expanded = true;
        // Expanded animation occurs after Expand.expand is set to true
        this.expandAnimationState = EXPANDED_STATE;
    };
    /**
     * @return {?}
     */
    ClrVerticalNavGroup.prototype.collapseGroup = /**
     * @return {?}
     */
    function () {
        // If a Vertical Nav Group toggle button is clicked while the Vertical Nav is in Collapsed state,
        // the Vertical Nav should be expanded first.
        this.expandAnimationState = COLLAPSED_STATE;
    };
    // closes a group after the collapse animation
    // closes a group after the collapse animation
    /**
     * @param {?} $event
     * @return {?}
     */
    ClrVerticalNavGroup.prototype.expandAnimationDone = 
    // closes a group after the collapse animation
    /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        if ($event.toState === COLLAPSED_STATE) {
            this.expanded = false;
        }
    };
    Object.defineProperty(ClrVerticalNavGroup.prototype, "expandAnimationState", {
        get: /**
         * @return {?}
         */
        function () {
            return this._expandAnimationState;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value !== this._expandAnimationState) {
                this._expandAnimationState = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ClrVerticalNavGroup.prototype.toggleExpand = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * @return {?}
     */
    ClrVerticalNavGroup.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        // This makes sure that if someone marks a nav group expanded in a collapsed nav
        // the expanded property is switched back to collapsed state.
        if (this._navService.collapsed && this.expanded) {
            this.wasExpanded = true;
            this.expandAnimationState = COLLAPSED_STATE;
        }
    };
    /**
     * @return {?}
     */
    ClrVerticalNavGroup.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        function (sub) { return sub.unsubscribe(); }));
        this._navGroupRegistrationService.unregisterNavGroup();
    };
    ClrVerticalNavGroup.decorators = [
        { type: Component, args: [{
                    selector: 'clr-vertical-nav-group',
                    template: "<!--\n  ~ Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.\n  ~ This software is released under MIT license.\n  ~ The full license information can be found in LICENSE in the root directory of this project.\n  -->\n\n<div class=\"nav-group-content\">\n    <ng-content select=\"[clrVerticalNavLink]\"></ng-content>\n    <button\n        class=\"nav-group-trigger\"\n        type=\"button\"\n        (click)=\"toggleExpand()\">\n        <ng-content select=\"[clrVerticalNavIcon]\"></ng-content>\n        <div class=\"nav-group-text\">\n            <ng-content></ng-content>\n        </div>\n        <clr-icon shape=\"caret\"\n                  class=\"nav-group-trigger-icon\"\n                  [attr.dir]=\"(this.expanded) ? 'down' : 'right'\"\n                  [attr.title]=\"(this.expanded) ? commonStrings.collapse : commonStrings.expand\">\n        </clr-icon>\n    </button>\n</div>\n<!--TODO: This animation needs to be added to the clr-vertical-nav-group-children component-->\n<div class=\"nav-group-children\"\n     [@clrExpand]=\"expandAnimationState\"\n     (@clrExpand.done)=\"expandAnimationDone($event)\">\n    <ng-content select=\"[clrIfExpanded], clr-vertical-nav-group-children\"></ng-content>\n</div>\n",
                    providers: [Expand, VerticalNavGroupService],
                    animations: [
                        trigger('clrExpand', [
                            state(EXPANDED_STATE, style({ height: '*' })),
                            state(COLLAPSED_STATE, style({ height: 0, 'overflow-y': 'hidden', visibility: 'hidden' })),
                            transition(EXPANDED_STATE + " <=> " + COLLAPSED_STATE, animate('0.2s ease-in-out')),
                        ]),
                    ],
                    host: { class: 'nav-group' }
                }] }
    ];
    /** @nocollapse */
    ClrVerticalNavGroup.ctorParameters = function () { return [
        { type: Expand },
        { type: VerticalNavGroupRegistrationService },
        { type: VerticalNavGroupService },
        { type: VerticalNavService },
        { type: ClrCommonStrings }
    ]; };
    ClrVerticalNavGroup.propDecorators = {
        expanded: [{ type: HostBinding, args: ['class.is-expanded',] }],
        userExpandedInput: [{ type: Input, args: ['clrVerticalNavGroupExpanded',] }],
        expandedChange: [{ type: Output, args: ['clrVerticalNavGroupExpandedChange',] }]
    };
    return ClrVerticalNavGroup;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrVerticalNavGroupChildren = /** @class */ (function () {
    function ClrVerticalNavGroupChildren() {
    }
    ClrVerticalNavGroupChildren.decorators = [
        { type: Component, args: [{
                    selector: 'clr-vertical-nav-group-children',
                    template: "\n        <ng-content></ng-content>\n    "
                }] }
    ];
    return ClrVerticalNavGroupChildren;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrVerticalNavIcon = /** @class */ (function () {
    function ClrVerticalNavIcon(_verticalNavIconService) {
        this._verticalNavIconService = _verticalNavIconService;
        this._verticalNavIconService.registerIcon();
    }
    /**
     * @return {?}
     */
    ClrVerticalNavIcon.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._verticalNavIconService.unregisterIcon();
    };
    ClrVerticalNavIcon.decorators = [
        { type: Directive, args: [{ selector: '[clrVerticalNavIcon]', host: { class: 'nav-icon' } },] }
    ];
    /** @nocollapse */
    ClrVerticalNavIcon.ctorParameters = function () { return [
        { type: VerticalNavIconService }
    ]; };
    return ClrVerticalNavIcon;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrVerticalNavLink = /** @class */ (function () {
    function ClrVerticalNavLink(_navGroupService) {
        this._navGroupService = _navGroupService;
    }
    /**
     * @return {?}
     */
    ClrVerticalNavLink.prototype.expandParentNavGroup = /**
     * @return {?}
     */
    function () {
        if (this._navGroupService) {
            this._navGroupService.expand();
        }
    };
    ClrVerticalNavLink.decorators = [
        { type: Component, args: [{
                    selector: '[clrVerticalNavLink]',
                    template: "\n        <ng-content select=\"[clrVerticalNavIcon]\"></ng-content>\n        <span class=\"nav-text\">\n            <ng-content></ng-content>    \n        </span>\n    ",
                    host: { class: 'nav-link' }
                }] }
    ];
    /** @nocollapse */
    ClrVerticalNavLink.ctorParameters = function () { return [
        { type: VerticalNavGroupService, decorators: [{ type: Optional }] }
    ]; };
    ClrVerticalNavLink.propDecorators = {
        expandParentNavGroup: [{ type: HostListener, args: ['click',] }]
    };
    return ClrVerticalNavLink;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var CLR_VERTICAL_NAV_DIRECTIVES = [
    ClrVerticalNav,
    ClrVerticalNavLink,
    ClrVerticalNavGroup,
    ClrVerticalNavGroupChildren,
    ClrVerticalNavIcon,
];
var ClrVerticalNavModule = /** @class */ (function () {
    function ClrVerticalNavModule() {
    }
    ClrVerticalNavModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, ClrIconModule, ClrIfExpandModule],
                    declarations: [CLR_VERTICAL_NAV_DIRECTIVES],
                    exports: [CLR_VERTICAL_NAV_DIRECTIVES, ClrIfExpandModule, ClrIconModule],
                },] }
    ];
    return ClrVerticalNavModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrLayoutModule = /** @class */ (function () {
    function ClrLayoutModule() {
    }
    ClrLayoutModule.decorators = [
        { type: NgModule, args: [{ exports: [ClrMainContainerModule, ClrNavigationModule, ClrTabsModule, ClrVerticalNavModule] },] }
    ];
    return ClrLayoutModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ScrollingService = /** @class */ (function () {
    function ScrollingService(_document) {
        this._document = _document;
    }
    /**
     * @return {?}
     */
    ScrollingService.prototype.stopScrolling = /**
     * @return {?}
     */
    function () {
        this._document.body.classList.add('no-scrolling');
    };
    /**
     * @return {?}
     */
    ScrollingService.prototype.resumeScrolling = /**
     * @return {?}
     */
    function () {
        if (this._document.body.classList.contains('no-scrolling')) {
            this._document.body.classList.remove('no-scrolling');
        }
    };
    ScrollingService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    ScrollingService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
    ]; };
    return ScrollingService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrModal = /** @class */ (function () {
    function ClrModal(_scrollingService, commonStrings, modalId) {
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
    Object.defineProperty(ClrModal.prototype, "sizeClass", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.size) {
                return 'modal-' + this.size;
            }
            else {
                return '';
            }
        },
        enumerable: true,
        configurable: true
    });
    // Detect when _open is set to true and set no-scrolling to true
    // Detect when _open is set to true and set no-scrolling to true
    /**
     * @param {?} changes
     * @return {?}
     */
    ClrModal.prototype.ngOnChanges = 
    // Detect when _open is set to true and set no-scrolling to true
    /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (!this.bypassScrollService && changes && changes.hasOwnProperty('_open')) {
            if (changes._open.currentValue) {
                this._scrollingService.stopScrolling();
            }
            else {
                this._scrollingService.resumeScrolling();
            }
        }
    };
    /**
     * @return {?}
     */
    ClrModal.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._scrollingService.resumeScrolling();
    };
    /**
     * @return {?}
     */
    ClrModal.prototype.open = /**
     * @return {?}
     */
    function () {
        if (this._open) {
            return;
        }
        this._open = true;
        this._openChanged.emit(true);
    };
    /**
     * @return {?}
     */
    ClrModal.prototype.close = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * @param {?} e
     * @return {?}
     */
    ClrModal.prototype.fadeDone = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if (e.toState === 'void') {
            this._openChanged.emit(false);
        }
    };
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
                    styles: ["\n        :host { display: none; }\n        :host.open { display: inline; }\n    "]
                }] }
    ];
    /** @nocollapse */
    ClrModal.ctorParameters = function () { return [
        { type: ScrollingService },
        { type: ClrCommonStrings },
        { type: String, decorators: [{ type: Inject, args: [UNIQUE_ID,] }] }
    ]; };
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
    return ClrModal;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var CLR_MODAL_DIRECTIVES = [ClrModal];
var ClrModalModule = /** @class */ (function () {
    function ClrModalModule() {
    }
    ClrModalModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, ClrIconModule, ClrFocusTrapModule],
                    declarations: [CLR_MODAL_DIRECTIVES],
                    exports: [CLR_MODAL_DIRECTIVES],
                },] }
    ];
    return ClrModalModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var SIGNPOST_POSITIONS = {
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
var POSITIONS = [
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
var ClrSignpostContent = /** @class */ (function (_super) {
    __extends(ClrSignpostContent, _super);
    function ClrSignpostContent(injector, parentHost, commonStrings) {
        var _this = this;
        if (!parentHost) {
            throw new Error('clr-signpost-content should only be used inside of a clr-signpost');
        }
        _this = _super.call(this, injector, parentHost) || this;
        _this.commonStrings = commonStrings;
        // Defaults
        _this.position = 'right-middle';
        _this.closeOnOutsideClick = true;
        return _this;
    }
    /**********
     *
     * @description
     * Close function that uses the signpost instance to toggle the state of the content popover.
     *
     */
    /**
     * *******
     *
     * \@description
     * Close function that uses the signpost instance to toggle the state of the content popover.
     *
     * @return {?}
     */
    ClrSignpostContent.prototype.close = /**
     * *******
     *
     * \@description
     * Close function that uses the signpost instance to toggle the state of the content popover.
     *
     * @return {?}
     */
    function () {
        this.ifOpenService.open = false;
    };
    Object.defineProperty(ClrSignpostContent.prototype, "position", {
        get: /**
         * @return {?}
         */
        function () {
            return this._position;
        },
        /*********
         *
         * @description
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
         * @param newPosition
         */
        set: /**
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
        function (position) {
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
            var setPosition = SIGNPOST_POSITIONS[this.position];
            this.anchorPoint = setPosition.anchorPoint;
            this.popoverPoint = setPosition.popoverPoint;
            this.popoverOptions.offsetY = setPosition.offsetY;
            this.popoverOptions.offsetX = setPosition.offsetX;
        },
        enumerable: true,
        configurable: true
    });
    ClrSignpostContent.decorators = [
        { type: Component, args: [{
                    selector: 'clr-signpost-content',
                    template: "\n        <div class=\"signpost-flex-wrap\">\n            <div class=\"popover-pointer\"></div>\n            <div class=\"signpost-content-header\">\n                <button type=\"button\" class=\"signpost-action close\" (click)=\"close()\">\n                    <clr-icon shape=\"close\" [attr.title]=\"commonStrings.close\"></clr-icon>\n                </button>\n            </div>\n            <div class=\"signpost-content-body\">\n                <ng-content></ng-content>\n            </div>\n        </div>\n    ",
                    host: { '[class.signpost-content]': 'true' }
                }] }
    ];
    /** @nocollapse */
    ClrSignpostContent.ctorParameters = function () { return [
        { type: Injector },
        { type: ElementRef, decorators: [{ type: Optional }, { type: Inject, args: [POPOVER_HOST_ANCHOR,] }] },
        { type: ClrCommonStrings }
    ]; };
    ClrSignpostContent.propDecorators = {
        position: [{ type: Input, args: ['clrPosition',] }]
    };
    return ClrSignpostContent;
}(AbstractPopover));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var CLR_SIGNPOST_DIRECTIVES = [ClrSignpost, ClrSignpostContent, ClrSignpostTrigger];
var ClrSignpostModule = /** @class */ (function () {
    function ClrSignpostModule() {
    }
    ClrSignpostModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, ClrCommonPopoverModule, ClrIconModule],
                    declarations: [CLR_SIGNPOST_DIRECTIVES],
                    exports: [CLR_SIGNPOST_DIRECTIVES, ClrConditionalModule],
                },] }
    ];
    return ClrSignpostModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrTooltip = /** @class */ (function () {
    function ClrTooltip() {
    }
    ClrTooltip.decorators = [
        { type: Component, args: [{
                    selector: 'clr-tooltip',
                    template: "\n        <ng-content></ng-content>\n    ",
                    host: {
                        '[class.tooltip]': 'true',
                    },
                    providers: [IfOpenService, { provide: POPOVER_HOST_ANCHOR, useExisting: ElementRef }]
                }] }
    ];
    return ClrTooltip;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var POSITIONS$1 = ['bottom-left', 'bottom-right', 'top-left', 'top-right', 'right', 'left'];
/** @type {?} */
var SIZES = ['xs', 'sm', 'md', 'lg'];
var ClrTooltipContent = /** @class */ (function (_super) {
    __extends(ClrTooltipContent, _super);
    function ClrTooltipContent(injector, parentHost) {
        var _this = this;
        if (!parentHost) {
            throw new Error('clr-tooltip-content should only be used inside of a clr-tooltip');
        }
        _this = _super.call(this, injector, parentHost) || this;
        // Defaults
        _this.position = 'right';
        _this.size = 'sm';
        return _this;
    }
    Object.defineProperty(ClrTooltipContent.prototype, "position", {
        get: /**
         * @return {?}
         */
        function () {
            return this._position;
        },
        set: /**
         * @param {?} position
         * @return {?}
         */
        function (position) {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTooltipContent.prototype, "size", {
        get: /**
         * @return {?}
         */
        function () {
            return this._size;
        },
        set: /**
         * @param {?} size
         * @return {?}
         */
        function (size) {
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
        },
        enumerable: true,
        configurable: true
    });
    ClrTooltipContent.decorators = [
        { type: Component, args: [{
                    selector: 'clr-tooltip-content',
                    template: "\n        <ng-content></ng-content>\n    ",
                    host: {
                        '[class.tooltip-content]': 'true',
                        // I'm giving up on animation, they did not work before and will not work now.
                        // Too many conflicts with Clarity UI.
                        '[style.opacity]': '1',
                    }
                }] }
    ];
    /** @nocollapse */
    ClrTooltipContent.ctorParameters = function () { return [
        { type: Injector },
        { type: ElementRef, decorators: [{ type: Optional }, { type: Inject, args: [POPOVER_HOST_ANCHOR,] }] }
    ]; };
    ClrTooltipContent.propDecorators = {
        position: [{ type: Input, args: ['clrPosition',] }],
        size: [{ type: Input, args: ['clrSize',] }]
    };
    return ClrTooltipContent;
}(AbstractPopover));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrTooltipTrigger = /** @class */ (function () {
    function ClrTooltipTrigger(ifOpenService) {
        this.ifOpenService = ifOpenService;
    }
    /**
     * @return {?}
     */
    ClrTooltipTrigger.prototype.showTooltip = /**
     * @return {?}
     */
    function () {
        this.ifOpenService.open = true;
    };
    /**
     * @return {?}
     */
    ClrTooltipTrigger.prototype.hideTooltip = /**
     * @return {?}
     */
    function () {
        this.ifOpenService.open = false;
    };
    ClrTooltipTrigger.decorators = [
        { type: Directive, args: [{ selector: '[clrTooltipTrigger]', host: { '[attr.tabindex]': '0', '[class.tooltip-trigger]': 'true' } },] }
    ];
    /** @nocollapse */
    ClrTooltipTrigger.ctorParameters = function () { return [
        { type: IfOpenService }
    ]; };
    ClrTooltipTrigger.propDecorators = {
        showTooltip: [{ type: HostListener, args: ['mouseenter',] }, { type: HostListener, args: ['focus',] }],
        hideTooltip: [{ type: HostListener, args: ['mouseleave',] }, { type: HostListener, args: ['blur',] }]
    };
    return ClrTooltipTrigger;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var CLR_TOOLTIP_DIRECTIVES = [ClrTooltip, ClrTooltipTrigger, ClrTooltipContent];
var ClrTooltipModule = /** @class */ (function () {
    function ClrTooltipModule() {
    }
    ClrTooltipModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, ClrCommonPopoverModule],
                    declarations: [CLR_TOOLTIP_DIRECTIVES],
                    exports: [CLR_TOOLTIP_DIRECTIVES, ClrConditionalModule, ClrIconModule],
                },] }
    ];
    return ClrTooltipModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrPopoverModule = /** @class */ (function () {
    function ClrPopoverModule() {
    }
    ClrPopoverModule.decorators = [
        { type: NgModule, args: [{ exports: [ClrDropdownModule, ClrSignpostModule, ClrTooltipModule] },] }
    ];
    return ClrPopoverModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ButtonHubService = /** @class */ (function () {
    function ButtonHubService() {
        this.buttonsReady = false;
        this._previousBtnClicked = new Subject();
        this._nextBtnClicked = new Subject();
        this._dangerBtnClicked = new Subject();
        this._cancelBtnClicked = new Subject();
        this._finishBtnClicked = new Subject();
        this._customBtnClicked = new Subject();
    }
    Object.defineProperty(ButtonHubService.prototype, "previousBtnClicked", {
        get: /**
         * @return {?}
         */
        function () {
            return this._previousBtnClicked.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonHubService.prototype, "nextBtnClicked", {
        get: /**
         * @return {?}
         */
        function () {
            return this._nextBtnClicked.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonHubService.prototype, "dangerBtnClicked", {
        get: /**
         * @return {?}
         */
        function () {
            return this._dangerBtnClicked.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonHubService.prototype, "cancelBtnClicked", {
        get: /**
         * @return {?}
         */
        function () {
            return this._cancelBtnClicked.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonHubService.prototype, "finishBtnClicked", {
        get: /**
         * @return {?}
         */
        function () {
            return this._finishBtnClicked.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonHubService.prototype, "customBtnClicked", {
        get: /**
         * @return {?}
         */
        function () {
            return this._customBtnClicked.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} buttonType
     * @return {?}
     */
    ButtonHubService.prototype.buttonClicked = /**
     * @param {?} buttonType
     * @return {?}
     */
    function (buttonType) {
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
    };
    ButtonHubService.decorators = [
        { type: Injectable }
    ];
    return ButtonHubService;
}());

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
        var foundPages = this.pages.filter((/**
         * @param {?} page
         * @return {?}
         */
        function (page) { return id === page.id; }));
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
     * @private
     * @param {?} results
     * @param {?} requestedPageId
     * @return {?}
     */
    PageCollectionService.prototype.checkResults = /**
     * Consolidates guard logic that prevents a couple of unfortunate edge cases with
     * look ups on the collection of pages.
     *
     * \@memberof PageCollectionService
     * @private
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
        this.pagesAsArray.forEach((/**
         * @param {?} page
         * @return {?}
         */
        function (page) {
            page.completed = false;
        }));
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
        this.pagesAsArray.forEach((/**
         * @param {?} page
         * @param {?} index
         * @return {?}
         */
        function (page, index) {
            if (index > firstIncompleteIndex) {
                page.completed = false;
            }
        }));
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
        this.pagesAsArray.forEach((/**
         * @param {?} page
         * @param {?} index
         * @return {?}
         */
        function (page, index) {
            if (null === returnIndex && false === page.completed) {
                returnIndex = index;
            }
        }));
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
var WizardNavigationService = /** @class */ (function () {
    /**
     * Creates an instance of WizardNavigationService. Also sets up subscriptions
     * that listen to the button service to determine when a button has been clicked
     * in the wizard. Is also responsible for taking action when the page collection
     * requests that navigation be reset to its pristine state.
     *
     * @memberof WizardNavigationService
     */
    function WizardNavigationService(pageCollection, buttonService) {
        var _this = this;
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
        function () {
            /** @type {?} */
            var currentPage = _this.currentPage;
            if (_this.currentPageIsFirst || currentPage.previousStepDisabled) {
                return;
            }
            currentPage.previousButtonClicked.emit(currentPage);
            if (!currentPage.preventDefault) {
                _this.previous();
            }
        }));
        this.nextButtonSubscription = this.buttonService.nextBtnClicked.subscribe((/**
         * @return {?}
         */
        function () {
            _this.checkAndCommitCurrentPage('next');
        }));
        this.dangerButtonSubscription = this.buttonService.dangerBtnClicked.subscribe((/**
         * @return {?}
         */
        function () {
            _this.checkAndCommitCurrentPage('danger');
        }));
        this.finishButtonSubscription = this.buttonService.finishBtnClicked.subscribe((/**
         * @return {?}
         */
        function () {
            _this.checkAndCommitCurrentPage('finish');
        }));
        this.customButtonSubscription = this.buttonService.customBtnClicked.subscribe((/**
         * @param {?} type
         * @return {?}
         */
        function (type) {
            if (!_this.wizardStopNavigation) {
                _this.currentPage.customButtonClicked.emit(type);
            }
        }));
        this.cancelButtonSubscription = this.buttonService.cancelBtnClicked.subscribe((/**
         * @return {?}
         */
        function () {
            if (_this.wizardStopNavigation) {
                return;
            }
            if (_this.currentPage.preventDefault) {
                _this.currentPage.pageOnCancel.emit(_this.currentPage);
            }
            else {
                _this.cancel();
            }
        }));
        this.pagesResetSubscription = this.pageCollection.pagesReset.subscribe((/**
         * @return {?}
         */
        function () {
            _this.setFirstPageCurrent();
        }));
    }
    /**
     *
     * @memberof WizardNavigationService
     */
    /**
     *
     * \@memberof WizardNavigationService
     * @return {?}
     */
    WizardNavigationService.prototype.ngOnDestroy = /**
     *
     * \@memberof WizardNavigationService
     * @return {?}
     */
    function () {
        this.previousButtonSubscription.unsubscribe();
        this.nextButtonSubscription.unsubscribe();
        this.dangerButtonSubscription.unsubscribe();
        this.finishButtonSubscription.unsubscribe();
        this.customButtonSubscription.unsubscribe();
        this.cancelButtonSubscription.unsubscribe();
        this.pagesResetSubscription.unsubscribe();
    };
    Object.defineProperty(WizardNavigationService.prototype, "currentPageChanged", {
        /**
         * An Observable that is predominantly used amongst the subcomponents and services
         * of the wizard. It is recommended that users listen to the ClrWizardPage.onLoad
         * (clrWizardPageOnLoad) output instead of this Observable.
         *
         * @memberof WizardNavigationService
         */
        get: /**
         * An Observable that is predominantly used amongst the subcomponents and services
         * of the wizard. It is recommended that users listen to the ClrWizardPage.onLoad
         * (clrWizardPageOnLoad) output instead of this Observable.
         *
         * \@memberof WizardNavigationService
         * @return {?}
         */
        function () {
            // TODO: MAKE SURE EXTERNAL OUTPUTS SAY 'CHANGE' NOT 'CHANGED'
            // A BREAKING CHANGE SO AWAITING MINOR RELEASE
            return this._currentChanged.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardNavigationService.prototype, "currentPageTitle", {
        /**
         * @memberof WizardNavigationService
         */
        get: /**
         * \@memberof WizardNavigationService
         * @return {?}
         */
        function () {
            // when the querylist of pages is empty. this is the first place it fails...
            if (!this.currentPage) {
                return null;
            }
            return this.currentPage.title;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardNavigationService.prototype, "currentPageIsFirst", {
        /**
         * Returns a Boolean that tells you whether or not the current page is the first
         * page in the Wizard.
         *
         * This is helpful for determining whether a page is navigable.
         *
         * @memberof WizardNavigationService
         */
        get: /**
         * Returns a Boolean that tells you whether or not the current page is the first
         * page in the Wizard.
         *
         * This is helpful for determining whether a page is navigable.
         *
         * \@memberof WizardNavigationService
         * @return {?}
         */
        function () {
            return this.pageCollection.firstPage === this.currentPage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardNavigationService.prototype, "currentPageIsLast", {
        /**
         * Returns a Boolean that tells you whether or not the current page is the
         * last page in the Wizard.
         *
         * This is used to determine which buttons should display in the wizard footer.
         *
         * @memberof WizardNavigationService
         */
        get: /**
         * Returns a Boolean that tells you whether or not the current page is the
         * last page in the Wizard.
         *
         * This is used to determine which buttons should display in the wizard footer.
         *
         * \@memberof WizardNavigationService
         * @return {?}
         */
        function () {
            return this.pageCollection.lastPage === this.currentPage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardNavigationService.prototype, "currentPage", {
        /**
         * Returns the ClrWizardPage object of the current page or null.
         *
         * @memberof WizardNavigationService
         */
        get: /**
         * Returns the ClrWizardPage object of the current page or null.
         *
         * \@memberof WizardNavigationService
         * @return {?}
         */
        function () {
            if (!this._currentPage) {
                return null;
            }
            return this._currentPage;
        },
        /**
         * Accepts a ClrWizardPage object, since that object to be the current/active
         * page in the wizard, and emits the ClrWizardPage.onLoad (clrWizardPageOnLoad)
         * event for that page.
         *
         * Note that all of this work is bypassed if the ClrWizardPage object is already
         * the current page.
         *
         * @memberof WizardNavigationService
         */
        set: /**
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
        function (page) {
            if (this._currentPage !== page && !this.wizardStopNavigation) {
                this._currentPage = page;
                page.onLoad.emit(page.id);
                this._currentChanged.next(page);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardNavigationService.prototype, "movedToNextPage", {
        /**
         * An observable used internally to alert the wizard that forward navigation
         * has occurred. It is recommended that you use the Wizard.onMoveNext
         * (clrWizardOnNext) output instead of this one.
         *
         * @memberof WizardNavigationService
         */
        get: /**
         * An observable used internally to alert the wizard that forward navigation
         * has occurred. It is recommended that you use the Wizard.onMoveNext
         * (clrWizardOnNext) output instead of this one.
         *
         * \@memberof WizardNavigationService
         * @return {?}
         */
        function () {
            return this._movedToNextPage.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardNavigationService.prototype, "wizardFinished", {
        /**
         * An observable used internally to alert the wizard that the nav service
         * has approved completion of the wizard.
         *
         * It is recommended that you use the Wizard.wizardFinished (clrWizardOnFinish)
         * output instead of this one.
         *
         * @memberof WizardNavigationService
         */
        get: /**
         * An observable used internally to alert the wizard that the nav service
         * has approved completion of the wizard.
         *
         * It is recommended that you use the Wizard.wizardFinished (clrWizardOnFinish)
         * output instead of this one.
         *
         * \@memberof WizardNavigationService
         * @return {?}
         */
        function () {
            return this._wizardFinished.asObservable();
        },
        enumerable: true,
        configurable: true
    });
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
     * @memberof WizardNavigationService
     */
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
    WizardNavigationService.prototype.next = /**
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
    function () {
        if (this.currentPageIsLast) {
            this.checkAndCommitCurrentPage('finish');
            return;
        }
        this.checkAndCommitCurrentPage('next');
        if (!this.wizardHasAltNext && !this.wizardStopNavigation) {
            this._movedToNextPage.next(true);
        }
    };
    /**
     * Bypasses checks and most event emissions to force a page to navigate forward.
     *
     * Comparable to calling Wizard.next() or Wizard.forceNext().
     *
     * @memberof WizardNavigationService
     */
    /**
     * Bypasses checks and most event emissions to force a page to navigate forward.
     *
     * Comparable to calling Wizard.next() or Wizard.forceNext().
     *
     * \@memberof WizardNavigationService
     * @return {?}
     */
    WizardNavigationService.prototype.forceNext = /**
     * Bypasses checks and most event emissions to force a page to navigate forward.
     *
     * Comparable to calling Wizard.next() or Wizard.forceNext().
     *
     * \@memberof WizardNavigationService
     * @return {?}
     */
    function () {
        /** @type {?} */
        var currentPage = this.currentPage;
        /** @type {?} */
        var nextPage = this.pageCollection.getNextPage(currentPage);
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
    };
    /**
     * Accepts a button/action type as a parameter. Encapsulates all logic for
     * event emissions, state of the current page, and wizard and page level overrides.
     *
     * Avoid calling this function directly unless you really know what you're doing.
     *
     * @memberof WizardNavigationService
     */
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
    WizardNavigationService.prototype.checkAndCommitCurrentPage = /**
     * Accepts a button/action type as a parameter. Encapsulates all logic for
     * event emissions, state of the current page, and wizard and page level overrides.
     *
     * Avoid calling this function directly unless you really know what you're doing.
     *
     * \@memberof WizardNavigationService
     * @param {?} buttonType
     * @return {?}
     */
    function (buttonType) {
        /** @type {?} */
        var currentPage = this.currentPage;
        /** @type {?} */
        var iAmTheLastPage;
        /** @type {?} */
        var isNext;
        /** @type {?} */
        var isDanger;
        /** @type {?} */
        var isDangerNext;
        /** @type {?} */
        var isDangerFinish;
        /** @type {?} */
        var isFinish;
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
    };
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
     * @memberof WizardNavigationService
     */
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
    WizardNavigationService.prototype.finish = /**
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
    function () {
        this.checkAndCommitCurrentPage('finish');
    };
    Object.defineProperty(WizardNavigationService.prototype, "movedToPreviousPage", {
        /**
         * Notifies the wizard when backwards navigation has occurred via the
         * previous button.
         *
         * @memberof WizardNavigationService
         */
        get: /**
         * Notifies the wizard when backwards navigation has occurred via the
         * previous button.
         *
         * \@memberof WizardNavigationService
         * @return {?}
         */
        function () {
            return this._movedToPreviousPage.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Programmatically moves the wizard to the page before the current page.
     *
     * In most instances, it makes more sense to call Wizard.previous()
     * which does the same thing.
     *
     * @memberof WizardNavigationService
     */
    /**
     * Programmatically moves the wizard to the page before the current page.
     *
     * In most instances, it makes more sense to call Wizard.previous()
     * which does the same thing.
     *
     * \@memberof WizardNavigationService
     * @return {?}
     */
    WizardNavigationService.prototype.previous = /**
     * Programmatically moves the wizard to the page before the current page.
     *
     * In most instances, it makes more sense to call Wizard.previous()
     * which does the same thing.
     *
     * \@memberof WizardNavigationService
     * @return {?}
     */
    function () {
        /** @type {?} */
        var previousPage;
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
    };
    Object.defineProperty(WizardNavigationService.prototype, "notifyWizardCancel", {
        /**
         * Notifies the wizard that a user is trying to cancel it.
         *
         * @memberof WizardNavigationService
         */
        get: /**
         * Notifies the wizard that a user is trying to cancel it.
         *
         * \@memberof WizardNavigationService
         * @return {?}
         */
        function () {
            return this._cancelWizard.asObservable();
        },
        enumerable: true,
        configurable: true
    });
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
     * @memberof WizardNavigationService
     */
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
    WizardNavigationService.prototype.cancel = /**
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
    function () {
        this._cancelWizard.next();
    };
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
     * @memberof WizardNavigationService
     */
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
    WizardNavigationService.prototype.goTo = /**
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
    function (pageToGoToOrId, lazyComplete) {
        if (lazyComplete === void 0) { lazyComplete = false; }
        /** @type {?} */
        var pageToGoTo;
        /** @type {?} */
        var currentPage;
        /** @type {?} */
        var myPages;
        /** @type {?} */
        var pagesToCheck;
        /** @type {?} */
        var okayToMove;
        /** @type {?} */
        var goingForward;
        /** @type {?} */
        var currentPageIndex;
        /** @type {?} */
        var goToPageIndex;
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
            function (page) {
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
            function (page) {
                page.completed = false;
            }));
        }
        this.currentPage = pageToGoTo;
    };
    /**
     * Accepts a range of ClrWizardPage objects as a parameter. Performs the work of checking
     * those objects to determine if navigation can be accomplished.
     *
     * @memberof WizardNavigationService
     */
    /**
     * Accepts a range of ClrWizardPage objects as a parameter. Performs the work of checking
     * those objects to determine if navigation can be accomplished.
     *
     * \@memberof WizardNavigationService
     * @param {?} pagesToCheck
     * @return {?}
     */
    WizardNavigationService.prototype.canGoTo = /**
     * Accepts a range of ClrWizardPage objects as a parameter. Performs the work of checking
     * those objects to determine if navigation can be accomplished.
     *
     * \@memberof WizardNavigationService
     * @param {?} pagesToCheck
     * @return {?}
     */
    function (pagesToCheck) {
        /** @type {?} */
        var okayToMove = true;
        /** @type {?} */
        var myPages = this.pageCollection;
        // previous page can be important when moving because if it's completed it
        // allows us to move to the page even if it's incomplete...
        /** @type {?} */
        var previousPagePasses;
        if (!pagesToCheck || pagesToCheck.length < 1) {
            return false;
        }
        pagesToCheck.forEach((/**
         * @param {?} page
         * @return {?}
         */
        function (page) {
            /** @type {?} */
            var previousPage;
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
    };
    /**
     * Looks through the collection of pages to find the first one that is incomplete
     * and makes that page the current/active page.
     *
     * @memberof WizardNavigationService
     */
    /**
     * Looks through the collection of pages to find the first one that is incomplete
     * and makes that page the current/active page.
     *
     * \@memberof WizardNavigationService
     * @return {?}
     */
    WizardNavigationService.prototype.setLastEnabledPageCurrent = /**
     * Looks through the collection of pages to find the first one that is incomplete
     * and makes that page the current/active page.
     *
     * \@memberof WizardNavigationService
     * @return {?}
     */
    function () {
        /** @type {?} */
        var allPages = this.pageCollection.pagesAsArray;
        /** @type {?} */
        var lastCompletedPageIndex = null;
        allPages.forEach((/**
         * @param {?} page
         * @param {?} index
         * @return {?}
         */
        function (page, index) {
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
    };
    /**
     * Finds the first page in the collection of pages and makes that page the
     * current/active page.
     *
     * @memberof WizardNavigationService
     */
    /**
     * Finds the first page in the collection of pages and makes that page the
     * current/active page.
     *
     * \@memberof WizardNavigationService
     * @return {?}
     */
    WizardNavigationService.prototype.setFirstPageCurrent = /**
     * Finds the first page in the collection of pages and makes that page the
     * current/active page.
     *
     * \@memberof WizardNavigationService
     * @return {?}
     */
    function () {
        this.currentPage = this.pageCollection.pagesAsArray[0];
    };
    /**
     * Updates the stepnav on the left side of the wizard when pages are dynamically
     * added or removed from the collection of pages.
     *
     * @memberof WizardNavigationService
     */
    /**
     * Updates the stepnav on the left side of the wizard when pages are dynamically
     * added or removed from the collection of pages.
     *
     * \@memberof WizardNavigationService
     * @return {?}
     */
    WizardNavigationService.prototype.updateNavigation = /**
     * Updates the stepnav on the left side of the wizard when pages are dynamically
     * added or removed from the collection of pages.
     *
     * \@memberof WizardNavigationService
     * @return {?}
     */
    function () {
        /** @type {?} */
        var toSetCurrent;
        /** @type {?} */
        var currentPageRemoved;
        this.pageCollection.updateCompletedStates();
        currentPageRemoved = this.pageCollection.pagesAsArray.indexOf(this.currentPage) < 0;
        if (currentPageRemoved) {
            toSetCurrent = this.pageCollection.findFirstIncompletePage();
            this.currentPage = toSetCurrent;
        }
    };
    WizardNavigationService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    WizardNavigationService.ctorParameters = function () { return [
        { type: PageCollectionService },
        { type: ButtonHubService }
    ]; };
    return WizardNavigationService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var HeaderActionService = /** @class */ (function () {
    // this service communicates information about the presence/display of header actions
    // across the wizard
    function HeaderActionService(navService) {
        this.navService = navService;
    }
    Object.defineProperty(HeaderActionService.prototype, "wizardHasHeaderActions", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var wizardHdrActions = this.wizardHeaderActions;
            if (!wizardHdrActions) {
                return false;
            }
            return wizardHdrActions.toArray().length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HeaderActionService.prototype, "currentPageHasHeaderActions", {
        get: /**
         * @return {?}
         */
        function () {
            return this.navService.currentPage ? this.navService.currentPage.hasHeaderActions : false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HeaderActionService.prototype, "showWizardHeaderActions", {
        get: /**
         * @return {?}
         */
        function () {
            return !this.currentPageHasHeaderActions && this.wizardHasHeaderActions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HeaderActionService.prototype, "displayHeaderActionsWrapper", {
        get: /**
         * @return {?}
         */
        function () {
            return this.currentPageHasHeaderActions || this.wizardHasHeaderActions;
        },
        enumerable: true,
        configurable: true
    });
    HeaderActionService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    HeaderActionService.ctorParameters = function () { return [
        { type: WizardNavigationService }
    ]; };
    return HeaderActionService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var wizardHeaderActionIndex = 0;
var ClrWizardHeaderAction = /** @class */ (function () {
    function ClrWizardHeaderAction() {
        // title is explanatory text added to the header action
        this.title = '';
        // If our host has an ID attribute, we use this instead of our index.
        this._id = (wizardHeaderActionIndex++).toString();
        this.disabled = false;
        this.headerActionClicked = new EventEmitter(false);
    }
    Object.defineProperty(ClrWizardHeaderAction.prototype, "id", {
        get: /**
         * @return {?}
         */
        function () {
            return "clr-wizard-header-action-" + this._id;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ClrWizardHeaderAction.prototype.click = /**
     * @return {?}
     */
    function () {
        if (this.disabled) {
            return;
        }
        // passing the header action id allows users to have one method that
        // routes to many different actions based on the type of header action
        // clicked. this is further aided by users being able to specify ids
        // for their header actions.
        this.headerActionClicked.emit(this._id);
    };
    ClrWizardHeaderAction.decorators = [
        { type: Component, args: [{
                    selector: 'clr-wizard-header-action',
                    template: "\n        <button \n            type=\"button\"\n            class=\"btn clr-wizard-header-action btn-link\"\n            [id]=\"id\"\n            [class.disabled]=\"disabled\"\n            (click)=\"click()\"\n            [title]=\"title\">\n            <ng-content></ng-content>\n        </button>\n    ",
                    host: { class: 'clr-wizard-header-action-wrapper' }
                }] }
    ];
    ClrWizardHeaderAction.propDecorators = {
        title: [{ type: Input, args: ['title',] }],
        _id: [{ type: Input, args: ['id',] }],
        disabled: [{ type: Input, args: ['clrWizardHeaderActionDisabled',] }],
        headerActionClicked: [{ type: Output, args: ['actionClicked',] }]
    };
    return ClrWizardHeaderAction;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrWizardPageButtons = /** @class */ (function () {
    function ClrWizardPageButtons(pageButtonsTemplateRef) {
        this.pageButtonsTemplateRef = pageButtonsTemplateRef;
    }
    ClrWizardPageButtons.decorators = [
        { type: Directive, args: [{ selector: '[clrPageButtons]' },] }
    ];
    /** @nocollapse */
    ClrWizardPageButtons.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    return ClrWizardPageButtons;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrWizardPageHeaderActions = /** @class */ (function () {
    function ClrWizardPageHeaderActions(pageHeaderActionsTemplateRef) {
        this.pageHeaderActionsTemplateRef = pageHeaderActionsTemplateRef;
    }
    ClrWizardPageHeaderActions.decorators = [
        { type: Directive, args: [{ selector: '[clrPageHeaderActions]' },] }
    ];
    /** @nocollapse */
    ClrWizardPageHeaderActions.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    return ClrWizardPageHeaderActions;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrWizardPageNavTitle = /** @class */ (function () {
    function ClrWizardPageNavTitle(pageNavTitleTemplateRef) {
        this.pageNavTitleTemplateRef = pageNavTitleTemplateRef;
    }
    ClrWizardPageNavTitle.decorators = [
        { type: Directive, args: [{ selector: '[clrPageNavTitle]' },] }
    ];
    /** @nocollapse */
    ClrWizardPageNavTitle.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    return ClrWizardPageNavTitle;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrWizardPageTitle = /** @class */ (function () {
    function ClrWizardPageTitle(pageTitleTemplateRef) {
        this.pageTitleTemplateRef = pageTitleTemplateRef;
    }
    ClrWizardPageTitle.decorators = [
        { type: Directive, args: [{ selector: '[clrPageTitle]' },] }
    ];
    /** @nocollapse */
    ClrWizardPageTitle.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    return ClrWizardPageTitle;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
    return ClrWizardPage;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 *
 * The Wizard component
 *
 */
var ClrWizard = /** @class */ (function () {
    /**
     * Creates an instance of Wizard.
     *
     * @memberof Wizard
     *
     */
    function ClrWizard(navService, pageCollection, buttonService, headerActionService, elementRef, differs) {
        var _this = this;
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
        function () {
            _this.onMoveNext.emit();
        }));
        this.goPreviousSubscription = this.navService.movedToPreviousPage.subscribe((/**
         * @return {?}
         */
        function () {
            _this.onMovePrevious.emit();
        }));
        this.cancelSubscription = this.navService.notifyWizardCancel.subscribe((/**
         * @return {?}
         */
        function () {
            _this.checkAndCancel();
        }));
        this.wizardFinishedSubscription = this.navService.wizardFinished.subscribe((/**
         * @return {?}
         */
        function () {
            if (!_this.stopNext) {
                _this.forceFinish();
            }
            _this.wizardFinished.emit();
        }));
        this.differ = differs.find([]).create(null);
    }
    Object.defineProperty(ClrWizard.prototype, "forceForward", {
        get: /**
         * @return {?}
         */
        function () {
            return this._forceForward;
        },
        /**
         * Resets page completed states when navigating backwards. Can be set using
         * the clrWizardForceForwardNavigation input.
         *
         * @memberof Wizard
         *
         */
        set: /**
         * Resets page completed states when navigating backwards. Can be set using
         * the clrWizardForceForwardNavigation input.
         *
         * \@memberof Wizard
         *
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._forceForward = !!value;
            this.navService.forceForwardNavigation = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizard.prototype, "clrWizardOpen", {
        set: /**
         * @param {?} open
         * @return {?}
         */
        function (open) {
            if (open) {
                this.buttonService.buttonsReady = true;
            }
            this._open = open;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizard.prototype, "stopNext", {
        get: /**
         * @return {?}
         */
        function () {
            return this._stopNext;
        },
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
         * @memberof Wizard
         *
         */
        set: /**
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
        function (value) {
            this._stopNext = !!value;
            this.navService.wizardHasAltNext = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizard.prototype, "stopCancel", {
        get: /**
         * @return {?}
         */
        function () {
            return this._stopCancel;
        },
        /**
         * Prevents ClrWizard from closing when the cancel button or close "X" is clicked.
         * Set using the clrWizardPreventDefaultCancel input.
         *
         * Note that using stopCancel will require you to create your own calls to
         * .close() in your host component to make the ClrWizard work as expected.
         *
         * Useful for doing checks or prompts before closing a ClrWizard.
         *
         * @memberof Wizard
         *
         */
        set: /**
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
        function (value) {
            this._stopCancel = !!value;
            this.navService.wizardHasAltCancel = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizard.prototype, "stopNavigation", {
        get: /**
         * @return {?}
         */
        function () {
            return this._stopNavigation;
        },
        /**
         * Prevents ClrWizard from performing any form of navigation away from the current
         * page. Set using the clrWizardPreventNavigation input.
         *
         * Note that stopNavigation is meant to freeze the wizard in place, typically
         * during a long validation or background action where you want the wizard to
         * display loading content but not allow the user to execute navigation in
         * the stepnav, close X, or the  back, finish, or next buttons.
         *
         * @memberof Wizard
         *
         */
        set: /**
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
        function (value) {
            this._stopNavigation = !!value;
            this.navService.wizardStopNavigation = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizard.prototype, "disableStepnav", {
        get: /**
         * @return {?}
         */
        function () {
            return this._disableStepnav;
        },
        /**
         * Prevents clicks on the links in the stepnav from working.
         *
         * A more granular bypassing of navigation which can be useful when your
         * ClrWizard is in a state of completion and you don't want users to be
         * able to jump backwards and change things.
         *
         * @memberof Wizard
         *
         */
        set: /**
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
        function (value) {
            this._disableStepnav = !!value;
            this.navService.wizardDisableStepnav = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizard.prototype, "stopModalAnimations", {
        get: /**
         * @return {?}
         */
        function () {
            if (this._stopModalAnimations) {
                return 'true';
            }
            return 'false';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ClrWizard.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.currentPageSubscription = this.navService.currentPageChanged.subscribe((/**
         * @param {?} page
         * @return {?}
         */
        function (page) {
            _this.currentPageChanged.emit();
        }));
    };
    /**
     * @return {?}
     */
    ClrWizard.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * Sets up references that are needed by the providers.
     *
     * @name ngAfterContentInit
     * @memberof Wizard
     *
     */
    /**
     * Sets up references that are needed by the providers.
     *
     * \@name ngAfterContentInit
     * \@memberof Wizard
     *
     * @return {?}
     */
    ClrWizard.prototype.ngAfterContentInit = /**
     * Sets up references that are needed by the providers.
     *
     * \@name ngAfterContentInit
     * \@memberof Wizard
     *
     * @return {?}
     */
    function () {
        this.pageCollection.pages = this.pages;
        this.headerActionService.wizardHeaderActions = this.headerActions;
        // Only trigger buttons ready if default is open (inlined)
        if (this._open) {
            this.buttonService.buttonsReady = true;
        }
    };
    /**
     * Used for keeping track of when pages are added or removed from this.pages
     *
     * @name ngDoCheck
     * @memberof Wizard
     *
     */
    /**
     * Used for keeping track of when pages are added or removed from this.pages
     *
     * \@name ngDoCheck
     * \@memberof Wizard
     *
     * @return {?}
     */
    ClrWizard.prototype.ngDoCheck = /**
     * Used for keeping track of when pages are added or removed from this.pages
     *
     * \@name ngDoCheck
     * \@memberof Wizard
     *
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var changes = this.differ.diff(this.pages);
        if (changes) {
            changes.forEachAddedItem((/**
             * @param {?} r
             * @return {?}
             */
            function (r) {
                _this.navService.updateNavigation();
            }));
            changes.forEachRemovedItem((/**
             * @param {?} r
             * @return {?}
             */
            function (r) {
                _this.navService.updateNavigation();
            }));
        }
    };
    Object.defineProperty(ClrWizard.prototype, "isStatic", {
        /**
         * Convenient property for determining whether a wizard is static/in-line or not.
         *
         * @name isStatic
         *
         * @memberof Wizard
         *
         */
        get: /**
         * Convenient property for determining whether a wizard is static/in-line or not.
         *
         * \@name isStatic
         *
         * \@memberof Wizard
         *
         * @return {?}
         */
        function () {
            return this.elementRef.nativeElement.classList.contains('clr-wizard--inline');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizard.prototype, "currentPage", {
        /**
         * As a getter, current page is a convenient way to retrieve the current page from
         * the WizardNavigationService.
         *
         * As a setter, current page accepts a ClrWizardPage and passes it to WizardNavigationService
         * to be made the current page. currentPage performs checks to make sure it can navigate
         * to the designated page.
         *
         * @name currentPage
         *
         * @memberof Wizard
         *
         */
        get: /**
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
        function () {
            return this.navService.currentPage;
        },
        set: /**
         * @param {?} page
         * @return {?}
         */
        function (page) {
            this.navService.goTo(page, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizard.prototype, "isLast", {
        /**
         * Convenient property for determining if the current page is the last page of
         * the wizard.
         *
         * @name isLast
         *
         * @memberof Wizard
         *
         */
        get: /**
         * Convenient property for determining if the current page is the last page of
         * the wizard.
         *
         * \@name isLast
         *
         * \@memberof Wizard
         *
         * @return {?}
         */
        function () {
            return this.navService.currentPageIsLast;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizard.prototype, "isFirst", {
        /**
         * Convenient property for determining if the current page is the first page of
         * the wizard.
         *
         * @name isFirst
         *
         * @memberof Wizard
         *
         */
        get: /**
         * Convenient property for determining if the current page is the first page of
         * the wizard.
         *
         * \@name isFirst
         *
         * \@memberof Wizard
         *
         * @return {?}
         */
        function () {
            return this.navService.currentPageIsFirst;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Performs the actions needed to open the wizard. If there is no current
     * page defined, sets the first page in the wizard to be current.
     *
     * @name open
     * @memberof ClrWizard
     */
    /**
     * Performs the actions needed to open the wizard. If there is no current
     * page defined, sets the first page in the wizard to be current.
     *
     * \@name open
     * \@memberof ClrWizard
     * @return {?}
     */
    ClrWizard.prototype.open = /**
     * Performs the actions needed to open the wizard. If there is no current
     * page defined, sets the first page in the wizard to be current.
     *
     * \@name open
     * \@memberof ClrWizard
     * @return {?}
     */
    function () {
        this._open = true;
        if (!this.currentPage) {
            this.navService.setFirstPageCurrent();
        }
        // Only render buttons when wizard is opened, to avoid chocolate errors
        this.buttonService.buttonsReady = true;
        this._openChanged.emit(true);
    };
    /**
     * Does the work involved with closing the wizard. Call this directly instead
     * of cancel() to implement alternative cancel functionality.
     *
     * @name close
     * @memberof ClrWizard
     */
    /**
     * Does the work involved with closing the wizard. Call this directly instead
     * of cancel() to implement alternative cancel functionality.
     *
     * \@name close
     * \@memberof ClrWizard
     * @return {?}
     */
    ClrWizard.prototype.close = /**
     * Does the work involved with closing the wizard. Call this directly instead
     * of cancel() to implement alternative cancel functionality.
     *
     * \@name close
     * \@memberof ClrWizard
     * @return {?}
     */
    function () {
        if (this.stopNavigation) {
            return;
        }
        this._open = false;
        this._openChanged.emit(false);
    };
    /**
     * Convenient function that can be used to open and close the wizard. It operates
     * by checking a Boolean parameter. If true, the wizard is opened. If false,
     * it is closed.
     *
     * There is no default value for this parameter, so by default the wizard will
     * close if invoked with no parameter.
     *
     * @name toggle
     *
     * @memberof ClrWizard
     */
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
    ClrWizard.prototype.toggle = /**
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
    function (value) {
        if (value) {
            this.open();
        }
        else {
            this.close();
        }
    };
    /**
     * Moves the wizard to the previous page.
     *
     * @name previous
     * @memberof ClrWizard
     */
    /**
     * Moves the wizard to the previous page.
     *
     * \@name previous
     * \@memberof ClrWizard
     * @return {?}
     */
    ClrWizard.prototype.previous = /**
     * Moves the wizard to the previous page.
     *
     * \@name previous
     * \@memberof ClrWizard
     * @return {?}
     */
    function () {
        this.navService.previous();
    };
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
     * @name next
     * @memberof ClrWizard
     */
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
    ClrWizard.prototype.next = /**
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
    function (skipChecksAndEmits) {
        if (skipChecksAndEmits === void 0) { skipChecksAndEmits = true; }
        if (skipChecksAndEmits) {
            this.forceNext();
        }
        else {
            this.navService.next();
        }
    };
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
     * @name finish
     * @memberof ClrWizard
     */
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
    ClrWizard.prototype.finish = /**
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
    function (skipChecksAndEmits) {
        if (skipChecksAndEmits === void 0) { skipChecksAndEmits = true; }
        if (skipChecksAndEmits) {
            this.forceFinish();
        }
        else {
            this.navService.finish();
        }
    };
    /**
     * Does the work of finishing up the wizard and closing it but doesn't do the
     * checks and emissions that other paths do. Good for a last step in an
     * alternate workflow.
     *
     * Does the same thing as calling ClrWizard.finish(true) or ClrWizard.finish()
     * without a parameter.
     *
     * @name forceFinish
     * @memberof ClrWizard
     */
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
    ClrWizard.prototype.forceFinish = /**
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
    function () {
        if (this.stopNavigation) {
            return;
        }
        this.close();
    };
    /**
     * Does the work of moving the wizard to the next page without the
     * checks and emissions that other paths do. Good for a last step in an
     * alternate workflow.
     *
     * Does the same thing as calling ClrWizard.next(true) or ClrWizard.next()
     * without a parameter.
     *
     * @name forceNext
     * @memberof ClrWizard
     */
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
    ClrWizard.prototype.forceNext = /**
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
    function () {
        this.navService.forceNext();
    };
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
     * @name cancel
     * @memberof ClrWizard
     */
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
    ClrWizard.prototype.cancel = /**
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
    function () {
        this.navService.cancel();
    };
    /**
     * Overrides behavior of the underlying modal to avoid collisions with
     * alternative cancel functionality.
     *
     * In most cases, use ClrWizard.cancel() instead.
     *
     * @name modalCancel
     * @memberof ClrWizard
     */
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
    ClrWizard.prototype.modalCancel = /**
     * Overrides behavior of the underlying modal to avoid collisions with
     * alternative cancel functionality.
     *
     * In most cases, use ClrWizard.cancel() instead.
     *
     * \@name modalCancel
     * \@memberof ClrWizard
     * @return {?}
     */
    function () {
        this.checkAndCancel();
    };
    /**
     * Checks for alternative cancel flows defined at the current page or
     * wizard level. Performs a canceled if not. Emits events that initiate
     * the alternative cancel outputs (clrWizardPageOnCancel and
     * clrWizardOnCancel) if so.
     *
     * @name checkAndCancel
     * @memberof ClrWizard
     */
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
    ClrWizard.prototype.checkAndCancel = /**
     * Checks for alternative cancel flows defined at the current page or
     * wizard level. Performs a canceled if not. Emits events that initiate
     * the alternative cancel outputs (clrWizardPageOnCancel and
     * clrWizardOnCancel) if so.
     *
     * \@name checkAndCancel
     * \@memberof ClrWizard
     * @return {?}
     */
    function () {
        /** @type {?} */
        var currentPage = this.currentPage;
        /** @type {?} */
        var currentPageHasOverrides = currentPage.stopCancel || currentPage.preventDefault;
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
    };
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
     * @name goTo
     *
     * @memberof ClrWizard
     */
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
    ClrWizard.prototype.goTo = /**
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
    function (pageId) {
        if (!pageId) {
            return;
        }
        this.navService.goTo(pageId);
    };
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
     * @name reset
     * @memberof ClrWizard
     */
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
    ClrWizard.prototype.reset = /**
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
    function () {
        this.pageCollection.reset();
        this.onReset.next();
    };
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
    ClrWizard.ctorParameters = function () { return [
        { type: WizardNavigationService },
        { type: PageCollectionService },
        { type: ButtonHubService },
        { type: HeaderActionService },
        { type: ElementRef },
        { type: IterableDiffers }
    ]; };
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
    return ClrWizard;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var DEFAULT_BUTTON_TYPES = {
    cancel: 'cancel',
    previous: 'previous',
    next: 'next',
    finish: 'finish',
    danger: 'danger',
};
/** @type {?} */
var CUSTOM_BUTTON_TYPES = {
    cancel: 'custom-cancel',
    previous: 'custom-previous',
    next: 'custom-next',
    finish: 'custom-finish',
    danger: 'custom-danger',
};
var ClrWizardButton = /** @class */ (function () {
    function ClrWizardButton(navService, buttonService) {
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
    ClrWizardButton.prototype.checkDefaultAndCustomType = /**
     * @private
     * @param {?=} valueToCheck
     * @param {?=} typeToLookUp
     * @return {?}
     */
    function (valueToCheck, typeToLookUp) {
        if (valueToCheck === void 0) { valueToCheck = ''; }
        if (DEFAULT_BUTTON_TYPES[typeToLookUp] === valueToCheck) {
            return true;
        }
        if (CUSTOM_BUTTON_TYPES[typeToLookUp] === valueToCheck) {
            return true;
        }
        return false;
    };
    Object.defineProperty(ClrWizardButton.prototype, "isCancel", {
        get: /**
         * @return {?}
         */
        function () {
            return this.checkDefaultAndCustomType(this.type, 'cancel');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardButton.prototype, "isNext", {
        get: /**
         * @return {?}
         */
        function () {
            return this.checkDefaultAndCustomType(this.type, 'next');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardButton.prototype, "isPrevious", {
        get: /**
         * @return {?}
         */
        function () {
            return this.checkDefaultAndCustomType(this.type, 'previous');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardButton.prototype, "isFinish", {
        get: /**
         * @return {?}
         */
        function () {
            return this.checkDefaultAndCustomType(this.type, 'finish');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardButton.prototype, "isDanger", {
        get: /**
         * @return {?}
         */
        function () {
            return this.checkDefaultAndCustomType(this.type, 'danger');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardButton.prototype, "isPrimaryAction", {
        get: /**
         * @return {?}
         */
        function () {
            return this.isNext || this.isDanger || this.isFinish;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardButton.prototype, "_disabledAttribute", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.isDisabled) {
                return '';
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardButton.prototype, "isDisabled", {
        get: /**
         * @return {?}
         */
        function () {
            // dealing with negatives here. cognitively easier to think of it like this...
            /** @type {?} */
            var disabled = true;
            /** @type {?} */
            var nav = this.navService;
            /** @type {?} */
            var page = this.navService.currentPage;
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardButton.prototype, "isHidden", {
        get: /**
         * @return {?}
         */
        function () {
            // dealing with negatives here. cognitively easier to think of it like this...
            /** @type {?} */
            var hidden = true;
            /** @type {?} */
            var nav = this.navService;
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
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ClrWizardButton.prototype.click = /**
     * @return {?}
     */
    function () {
        if (this.isDisabled) {
            return;
        }
        this.wasClicked.emit(this.type);
        this.buttonService.buttonClicked(this.type);
    };
    ClrWizardButton.decorators = [
        { type: Component, args: [{
                    selector: 'clr-wizard-button',
                    template: "\n        <button\n            type=\"button\"\n            class=\"btn clr-wizard-btn\"\n            [class.btn-link]=\"isCancel\"\n            [class.clr-wizard-btn--tertiary]=\"isCancel\"\n            [class.btn-outline]=\"isPrevious\"\n            [class.clr-wizard-btn--secondary]=\"isPrevious\"\n            [class.btn-primary]=\"isPrimaryAction\"\n            [class.clr-wizard-btn--primary]=\"isPrimaryAction\"\n            [class.btn-success]=\"isFinish\"\n            [class.btn-danger]=\"isDanger\"\n            [class.disabled]=\"isDisabled\"\n            [attr.disabled]=\"_disabledAttribute\"\n            (click)=\"click()\">\n            <ng-content></ng-content>\n        </button>\n    ",
                    host: { class: 'clr-wizard-btn-wrapper', '[attr.aria-hidden]': 'isHidden' },
                    styles: ['[aria-hidden="true"] { display: none; }']
                }] }
    ];
    /** @nocollapse */
    ClrWizardButton.ctorParameters = function () { return [
        { type: WizardNavigationService },
        { type: ButtonHubService }
    ]; };
    ClrWizardButton.propDecorators = {
        type: [{ type: Input, args: ['type',] }],
        disabled: [{ type: Input, args: ['clrWizardButtonDisabled',] }],
        hidden: [{ type: Input, args: ['clrWizardButtonHidden',] }],
        wasClicked: [{ type: Output, args: ['clrWizardButtonClicked',] }]
    };
    return ClrWizardButton;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrWizardCustomTags = /** @class */ (function () {
    function ClrWizardCustomTags() {
    }
    ClrWizardCustomTags.decorators = [
        { type: Directive, args: [{ selector: 'clr-wizard-title, clr-wizard-pagetitle' },] }
    ];
    return ClrWizardCustomTags;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrWizardStepnav = /** @class */ (function () {
    function ClrWizardStepnav(pageService) {
        this.pageService = pageService;
    }
    ClrWizardStepnav.decorators = [
        { type: Component, args: [{
                    selector: 'clr-wizard-stepnav',
                    template: "\n        <ol class=\"clr-wizard-stepnav-list\" role=\"tablist\">\n            <li *ngFor=\"let page of pageService.pages\" clr-wizard-stepnav-item \n            [page]=\"page\" class=\"clr-wizard-stepnav-item\"></li>\n        </ol>\n    ",
                    host: { class: 'clr-wizard-stepnav' }
                }] }
    ];
    /** @nocollapse */
    ClrWizardStepnav.ctorParameters = function () { return [
        { type: PageCollectionService }
    ]; };
    return ClrWizardStepnav;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClrWizardStepnavItem = /** @class */ (function () {
    function ClrWizardStepnavItem(navService, pageCollection) {
        this.navService = navService;
        this.pageCollection = pageCollection;
    }
    /**
     * @private
     * @return {?}
     */
    ClrWizardStepnavItem.prototype.pageGuard = /**
     * @private
     * @return {?}
     */
    function () {
        if (!this.page) {
            throw new Error('Wizard stepnav item is not associated with a wizard page.');
        }
    };
    Object.defineProperty(ClrWizardStepnavItem.prototype, "id", {
        get: /**
         * @return {?}
         */
        function () {
            this.pageGuard();
            return this.pageCollection.getStepItemIdForPage(this.page);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardStepnavItem.prototype, "isDisabled", {
        get: /**
         * @return {?}
         */
        function () {
            this.pageGuard();
            return this.page.disabled || this.navService.wizardStopNavigation || this.navService.wizardDisableStepnav;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardStepnavItem.prototype, "isCurrent", {
        get: /**
         * @return {?}
         */
        function () {
            this.pageGuard();
            return this.page.current;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardStepnavItem.prototype, "isComplete", {
        get: /**
         * @return {?}
         */
        function () {
            this.pageGuard();
            return this.page.completed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardStepnavItem.prototype, "canNavigate", {
        get: /**
         * @return {?}
         */
        function () {
            this.pageGuard();
            return this.pageCollection.previousPageIsCompleted(this.page);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ClrWizardStepnavItem.prototype.click = /**
     * @return {?}
     */
    function () {
        this.pageGuard();
        // if we click on our own stepnav or a disabled stepnav, we don't want to do anything
        if (this.isDisabled || this.isCurrent) {
            return;
        }
        this.navService.goTo(this.page);
    };
    ClrWizardStepnavItem.decorators = [
        { type: Component, args: [{
                    selector: '[clr-wizard-stepnav-item]',
                    template: "\n        <button type=\"button\" class=\"btn btn-link clr-wizard-stepnav-link\" (click)=\"click()\">\n            <ng-template [ngTemplateOutlet]=\"page.navTitle\"></ng-template>\n        </button>\n    ",
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
    ClrWizardStepnavItem.ctorParameters = function () { return [
        { type: WizardNavigationService },
        { type: PageCollectionService }
    ]; };
    ClrWizardStepnavItem.propDecorators = {
        page: [{ type: Input, args: ['page',] }]
    };
    return ClrWizardStepnavItem;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var CLR_WIZARD_DIRECTIVES = [
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
var ClrWizardModule = /** @class */ (function () {
    function ClrWizardModule() {
    }
    ClrWizardModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, ClrModalModule, ClrAlertModule],
                    declarations: [CLR_WIZARD_DIRECTIVES],
                    exports: [CLR_WIZARD_DIRECTIVES],
                },] }
    ];
    return ClrWizardModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClarityModule = /** @class */ (function () {
    function ClarityModule() {
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
                        ClrFormsModule,
                        ClrLayoutModule,
                        ClrPopoverModule,
                        ClrWizardModule,
                        ClrDragAndDropModule,
                    ],
                },] }
    ];
    return ClarityModule;
}());

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
function fade(opacity) {
    if (opacity === void 0) { opacity = 1; }
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
    var transform = null;
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
    var transform = null;
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

export { FocusTrapTracker as ÇlrFocusTrapTracker, ClarityModule, ClrButtonModule, ClrButton, ClrButtonGroup, CLR_BUTTON_GROUP_DIRECTIVES, ClrButtonGroupModule, ClrLoadingButton, CLR_LOADING_BUTTON_DIRECTIVES, ClrLoadingButtonModule, ClrDataModule, ClrDatagrid, ClrDatagridActionBar, ClrDatagridActionOverflow, ClrDatagridColumn, ClrDatagridColumnToggle, ClrDatagridHideableColumn, ClrDatagridFilter, ClrDatagridItems, ClrDatagridRow, ClrDatagridRowDetail, ClrDatagridCell, ClrDatagridFooter, ClrDatagridPagination, ClrDatagridPlaceholder, ClrDatagridSortOrder, DatagridStringFilter, DatagridPropertyStringFilter, DatagridPropertyComparator, CLR_DATAGRID_DIRECTIVES, ClrDatagridModule, ClrSelectedState, ClrTree, ClrTreeNode, ClrRecursiveForOf, CLR_TREE_VIEW_DIRECTIVES, ClrTreeViewModule, ClrStackView, ClrStackHeader, ClrStackBlock, ClrStackInput, ClrStackSelect, CLR_STACK_VIEW_DIRECTIVES, ClrStackViewModule, ClrStackViewCustomTags, ClrEmphasisModule, ClrAlert, ClrAlertItem, ClrAlerts, ClrAlertsPager, CLR_ALERT_DIRECTIVES, ClrAlertModule, ClrIfError, ClrControlError, ClrForm, ClrControlHelper, ClrLabel, ClrLayout, ClrCommonFormsModule, ClrCheckbox, ClrCheckboxContainer, isToggleFactory, IS_TOGGLE, IS_TOGGLE_PROVIDER, ClrCheckboxWrapper, ClrCheckboxModule, ClrDateContainer, ClrDateInput, ClrDatepickerViewManager, ClrDaypicker, ClrMonthpicker, ClrYearpicker, ClrCalendar, ClrDay, CLR_DATEPICKER_DIRECTIVES, ClrDatepickerModule, ClrInput, ClrInputContainer, ClrInputModule, ClrPassword, ToggleServiceFactory, TOGGLE_SERVICE, TOGGLE_SERVICE_PROVIDER, ClrPasswordContainer, ClrPasswordModule, ClrRadio, ClrRadioContainer, ClrRadioWrapper, ClrRadioModule, ClrSelect, ClrSelectContainer, ClrSelectModule, ClrTextarea, ClrTextareaContainer, ClrTextareaModule, ClrFormsModule, ClrIconCustomTag, CLR_ICON_DIRECTIVES, ClrIconModule, ClrLayoutModule, ClrMainContainer, CLR_LAYOUT_DIRECTIVES, ClrMainContainerModule, MainContainerWillyWonka, NavDetectionOompaLoompa, ClrHeader, ClrNavLevel, CLR_NAVIGATION_DIRECTIVES, ClrNavigationModule, ClrTabs, ClrTab, ClrTabContent, ClrTabOverflowContent, ClrTabLink, CLR_TABS_DIRECTIVES, ClrTabsModule, ClrVerticalNavGroupChildren, ClrVerticalNavGroup, ClrVerticalNav, ClrVerticalNavLink, ClrVerticalNavIcon, CLR_VERTICAL_NAV_DIRECTIVES, ClrVerticalNavModule, ClrModal, CLR_MODAL_DIRECTIVES, ClrModalModule, ClrDropdown, ClrDropdownMenu, ClrDropdownTrigger, ClrDropdownItem, CLR_MENU_POSITIONS, CLR_DROPDOWN_DIRECTIVES, ClrDropdownModule, ClrPopoverModule, ClrSignpost, ClrSignpostContent, ClrSignpostTrigger, CLR_SIGNPOST_DIRECTIVES, ClrSignpostModule, ClrTooltip, ClrTooltipTrigger, ClrTooltipContent, CLR_TOOLTIP_DIRECTIVES, ClrTooltipModule, collapse, fade, fadeSlide, slide, ClrLoadingState, ClrLoading, LoadingListener, CLR_LOADING_DIRECTIVES, ClrLoadingModule, CONDITIONAL_DIRECTIVES, ClrIfActive, ClrIfOpen, EXPAND_DIRECTIVES, ClrIfExpanded, ClrCommonStrings, ClrDraggable, ClrDroppable, ClrIfDragged, ClrDragHandle, ClrDraggableGhost, ClrDragEvent, CLR_DRAG_AND_DROP_DIRECTIVES, ClrDragAndDropModule, ClrWizard, ClrWizardPage, ClrWizardStepnav, ClrWizardStepnavItem, DEFAULT_BUTTON_TYPES, CUSTOM_BUTTON_TYPES, ClrWizardButton, ClrWizardHeaderAction, ClrWizardCustomTags, ClrWizardPageTitle, ClrWizardPageNavTitle, ClrWizardPageButtons, ClrWizardPageHeaderActions, CLR_WIZARD_DIRECTIVES, ClrWizardModule, ButtonInGroupService as ɵdu, DatagridRowExpandAnimation as ɵdm, ActionableOompaLoompa as ɵdj, DatagridWillyWonka as ɵdh, ExpandableOompaLoompa as ɵdl, ClrDatagridColumnSeparator as ɵcl, ClrDatagridColumnToggleButton as ɵcr, ClrDatagridColumnToggleTitle as ɵcq, DatagridDetailRegisterer as ɵct, ClrDatagridItemsTrackBy as ɵcs, ClrDatagridPageSize as ɵcu, ColumnResizerService as ɵcp, COLUMN_STATE as ɵdb, COLUMN_STATE_PROVIDER as ɵdd, columnStateFactory as ɵdc, ColumnToggleButtonsService as ɵce, ColumnsService as ɵcg, CustomFilter as ɵcj, DisplayModeService as ɵch, FiltersProvider as ɵbv, ExpandableRowsCount as ɵcb, HideableColumnService as ɵcc, Items as ɵbu, Page as ɵbw, RowActionService as ɵca, Selection as ɵbt, Sort as ɵby, StateDebouncer as ɵbx, StateProvider as ɵcd, TableSizeService as ɵcf, DatagridCellRenderer as ɵdg, DatagridHeaderRenderer as ɵda, DatagridMainRenderer as ɵcz, domAdapterFactory as ɵcy, DatagridRenderOrganizer as ɵbz, DatagridRowRenderer as ɵdf, DatagridFilterRegistrar as ɵci, WrappedCell as ɵcv, WrappedColumn as ɵcw, WrappedRow as ɵcx, StackControl as ɵdo, RecursiveChildren as ɵds, TREE_FEATURES_PROVIDER as ɵdr, TreeFeaturesService as ɵdp, treeFeaturesFactory as ɵdq, AlertIconAndTypesService as ɵo, MultiAlertService as ɵp, IfErrorService as ɵt, ControlClassService as ɵy, ControlIdService as ɵq, FocusService as ɵbf, LayoutService as ɵr, MarkControlService as ɵu, NgControlService as ɵs, WrappedFormControl as ɵx, DateFormControlService as ɵbd, DateIOService as ɵbg, DateNavigationService as ɵbc, DatepickerEnabledService as ɵbh, DatepickerFocusService as ɵbi, LocaleHelperService as ɵbe, ViewManagerService as ɵbj, ResponsiveNavigationService as ɵdv, ActiveOompaLoompa as ɵef, TabsWillyWonka as ɵee, AriaService as ɵdz, TabsService as ɵed, TABS_ID as ɵea, TABS_ID_PROVIDER as ɵec, tokenFactory$1 as ɵeb, VerticalNavGroupRegistrationService as ɵei, VerticalNavGroupService as ɵej, VerticalNavIconService as ɵeh, VerticalNavService as ɵeg, AbstractPopover as ɵi, POPOVER_DIRECTIVES as ɵb, POPOVER_HOST_ANCHOR as ɵh, PopoverDirectiveOld as ɵc, ClrCommonPopoverModule as ɵa, ROOT_DROPDOWN_PROVIDER as ɵg, RootDropdownService as ɵe, clrRootDropdownFactory as ɵf, OompaLoompa as ɵdk, WillyWonka as ɵdi, ClrConditionalModule as ɵj, IF_ACTIVE_ID as ɵk, IF_ACTIVE_ID_PROVIDER as ɵm, IfActiveService as ɵn, tokenFactory as ɵl, IfOpenService as ɵd, DomAdapter as ɵbr, DragAndDropEventBusService as ɵbo, DragEventListenerService as ɵbn, DragHandleRegistrarService as ɵbp, DraggableSnapshotService as ɵbq, GlobalDragModeService as ɵbs, ClrIfExpandModule as ɵdn, Expand as ɵck, FocusTrapDirective as ɵbb, ClrFocusTrapModule as ɵz, FOCUS_TRAP_DIRECTIVES as ɵba, EmptyAnchor as ɵw, ClrHostWrappingModule as ɵv, UNIQUE_ID as ɵcm, UNIQUE_ID_PROVIDER as ɵco, uniqueIdFactory as ɵcn, OUSTIDE_CLICK_DIRECTIVES as ɵbl, OutsideClick as ɵbm, ClrOutsideClickModule as ɵbk, ScrollingService as ɵdt, TEMPLATE_REF_DIRECTIVES as ɵdx, TemplateRefContainer as ɵdy, ClrTemplateRefModule as ɵdw, ButtonHubService as ɵem, HeaderActionService as ɵen, PageCollectionService as ɵel, WizardNavigationService as ɵek };

//# sourceMappingURL=clr-angular.js.map