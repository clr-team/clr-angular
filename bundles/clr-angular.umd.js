(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('rxjs'), require('@angular/animations'), require('rxjs/operators'), require('@angular/forms')) :
	typeof define === 'function' && define.amd ? define('@clr/angular', ['exports', '@angular/core', '@angular/common', 'rxjs', '@angular/animations', 'rxjs/operators', '@angular/forms'], factory) :
	(factory((global.clr = global.clr || {}, global.clr.angular = {}),global.ng.core,global.ng.common,global.rxjs,global.ng.animations,global.Rx.Observable.prototype,global.ng.forms));
}(this, (function (exports,core,common,rxjs,animations,operators,forms) { 'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0
THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.
See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */
var extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}








function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}
function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}
function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

var ClrIconCustomTag = /** @class */ (function () {
    function ClrIconCustomTag() {
    }
    return ClrIconCustomTag;
}());
ClrIconCustomTag.decorators = [
    { type: core.Directive, args: [{ selector: 'clr-icon' },] },
];
var CLR_ICON_DIRECTIVES = [ClrIconCustomTag];
var ClrIconModule = /** @class */ (function () {
    function ClrIconModule() {
    }
    return ClrIconModule;
}());
ClrIconModule.decorators = [
    { type: core.NgModule, args: [{ imports: [common.CommonModule], declarations: [CLR_ICON_DIRECTIVES], exports: [CLR_ICON_DIRECTIVES] },] },
];
var IconCustomTag = ClrIconCustomTag;
var ICON_DIRECTIVES = CLR_ICON_DIRECTIVES;
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
var POSITION_RELATIVE = 'relative';
var POSITION_ABSOLUTE = 'absolute';
var POSITION_FIXED = 'fixed';
var OVERFLOW_SCROLL = 'scroll';
var OVERFLOW_AUTO = 'auto';
var Popover = /** @class */ (function () {
    function Popover(element) {
        this.element = element;
        this.scrollableElements = [];
        this.boundOnScrollListener = this.emitScrollEvent.bind(this);
        element.style.position = POSITION_ABSOLUTE;
        element.style.top = 0;
        element.style.bottom = 'auto';
        element.style.left = 0;
        element.style.right = 'auto';
    }
    Popover.prototype.anchor = function (anchor, anchorAlign, popoverAlign, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.offsetX, offsetX = _c === void 0 ? 0 : _c, _d = _b.offsetY, offsetY = _d === void 0 ? 0 : _d, _e = _b.useAnchorParent, useAnchorParent = _e === void 0 ? false : _e;
        this.addScrollEventListeners(anchor);
        if (useAnchorParent) {
            anchor = anchor.parentNode;
        }
        anchor.style.position = 'static';
        var anchorRect = anchor.getBoundingClientRect();
        var popoverRect = this.element.getBoundingClientRect();
        var leftDiff = anchorRect.left - popoverRect.left + offsetX;
        var topDiff = anchorRect.top - popoverRect.top + offsetY;
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
        var popoverComputedStyle = getComputedStyle(this.element);
        var marginLeft = parseInt(popoverComputedStyle.marginLeft, 10);
        var marginRight = parseInt(popoverComputedStyle.marginRight, 10);
        var marginTop = parseInt(popoverComputedStyle.marginTop, 10);
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
        this.element.style.transform = "translateX(" + leftDiff + "px) translateY(" + topDiff + "px)";
        return this._scroll.asObservable();
    };
    Popover.prototype.release = function () {
        this.element.style.transform = '';
        this.removeScrollEventListeners();
    };
    Popover.prototype.isPositioned = function (container) {
        var position = getComputedStyle(container).position;
        return position === POSITION_RELATIVE || position === POSITION_ABSOLUTE || position === POSITION_FIXED;
    };
    Popover.prototype.emitScrollEvent = function () {
        this._scroll.next();
    };
    Popover.prototype.addScrollEventListeners = function (e) {
        this._scroll = new rxjs.Subject();
        var anchor = e;
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
    Popover.prototype.removeScrollEventListeners = function () {
        try {
            for (var _a = __values(this.scrollableElements), _b = _a.next(); !_b.done; _b = _a.next()) {
                var elem = _b.value;
                elem.removeEventListener('scroll', this.boundOnScrollListener);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.scrollableElements.length = 0;
        if (this._scroll) {
            this._scroll.complete();
            delete this._scroll;
        }
        var e_1, _c;
    };
    Popover.prototype.scrolls = function (container) {
        var computedStyles = getComputedStyle(container);
        return (computedStyles.overflowX === OVERFLOW_SCROLL ||
            computedStyles.overflowX === OVERFLOW_AUTO ||
            computedStyles.overflowY === OVERFLOW_SCROLL ||
            computedStyles.overflowY === OVERFLOW_AUTO);
    };
    return Popover;
}());
var openCount = 0;
var waiting = [];
var PopoverDirectiveOld = /** @class */ (function () {
    function PopoverDirectiveOld(templateRef, viewContainer) {
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this.popoverOptions = {};
        this.clrPopoverOldChange = new core.EventEmitter(false);
    }
    Object.defineProperty(PopoverDirectiveOld.prototype, "clrPopoverOld", {
        set: function (open) {
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
                        waiting.push(function () {
                            _this.createPopover();
                        });
                    }
                }
            }
            else {
                this.viewContainer.clear();
                this.destroyPopover();
                if (!this.popoverOptions.allowMultipleOpen) {
                    if (waiting.length > 0) {
                        var createPopoverFn = waiting.shift();
                        createPopoverFn();
                    }
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    PopoverDirectiveOld.prototype.createPopover = function () {
        var _this = this;
        var embeddedViewRef = (this.viewContainer.createEmbeddedView(this.templateRef));
        embeddedViewRef.detectChanges();
        var elementNodes = embeddedViewRef.rootNodes.filter(function (node) {
            return node.nodeType === 1;
        });
        this._popoverInstance = new Popover(elementNodes[0]);
        this._subscription = this._popoverInstance
            .anchor(this.anchorElem, this.anchorPoint, this.popoverPoint, this.popoverOptions)
            .subscribe(function () {
            _this.clrPopoverOldChange.emit(false);
        });
        openCount++;
    };
    PopoverDirectiveOld.prototype.destroyPopover = function () {
        if (this._popoverInstance) {
            this._subscription.unsubscribe();
            this._popoverInstance.release();
            delete this._popoverInstance;
            openCount--;
        }
    };
    PopoverDirectiveOld.prototype.ngOnDestroy = function () {
        this.destroyPopover();
    };
    return PopoverDirectiveOld;
}());
PopoverDirectiveOld.decorators = [
    { type: core.Directive, args: [{ selector: '[clrPopoverOld]' },] },
];
PopoverDirectiveOld.ctorParameters = function () { return [
    { type: core.TemplateRef, },
    { type: core.ViewContainerRef, },
]; };
PopoverDirectiveOld.propDecorators = {
    "anchorElem": [{ type: core.Input, args: ['clrPopoverOldAnchor',] },],
    "anchorPoint": [{ type: core.Input, args: ['clrPopoverOldAnchorPoint',] },],
    "popoverPoint": [{ type: core.Input, args: ['clrPopoverOldPopoverPoint',] },],
    "popoverOptions": [{ type: core.Input, args: ['clrPopoverOldOptions',] },],
    "clrPopoverOldChange": [{ type: core.Output, args: ['clrPopoverOldChange',] },],
    "clrPopoverOld": [{ type: core.Input },],
};
var POPOVER_DIRECTIVES = [PopoverDirectiveOld];
var ClrCommonPopoverModule = /** @class */ (function () {
    function ClrCommonPopoverModule() {
    }
    return ClrCommonPopoverModule;
}());
ClrCommonPopoverModule.decorators = [
    { type: core.NgModule, args: [{ imports: [common.CommonModule], declarations: [POPOVER_DIRECTIVES], exports: [POPOVER_DIRECTIVES] },] },
];
var LoadingListener = /** @class */ (function () {
    function LoadingListener() {
    }
    return LoadingListener;
}());
var ClrLoadingState = {
    DEFAULT: 0,
    LOADING: 1,
    SUCCESS: 2,
    ERROR: 3,
};
ClrLoadingState[ClrLoadingState.DEFAULT] = "DEFAULT";
ClrLoadingState[ClrLoadingState.LOADING] = "LOADING";
ClrLoadingState[ClrLoadingState.SUCCESS] = "SUCCESS";
ClrLoadingState[ClrLoadingState.ERROR] = "ERROR";
var ClrLoading = /** @class */ (function () {
    function ClrLoading(listener) {
        this.listener = listener;
        this._loadingState = ClrLoadingState.DEFAULT;
    }
    Object.defineProperty(ClrLoading.prototype, "loadingState", {
        get: function () {
            return this._loadingState;
        },
        set: function (value) {
            if (value === null) {
                value = ClrLoadingState.DEFAULT;
            }
            if (typeof value === 'boolean') {
                if (value) {
                    value = ClrLoadingState.LOADING;
                }
                else {
                    value = ClrLoadingState.DEFAULT;
                }
            }
            if (value === this._loadingState) {
                return;
            }
            this._loadingState = value;
            this.listener.loadingStateChange(value);
        },
        enumerable: true,
        configurable: true
    });
    ClrLoading.prototype.ngOnDestroy = function () {
        this.loadingState = ClrLoadingState.DEFAULT;
    };
    return ClrLoading;
}());
ClrLoading.decorators = [
    { type: core.Directive, args: [{ selector: '[clrLoading]' },] },
];
ClrLoading.ctorParameters = function () { return [
    { type: LoadingListener, decorators: [{ type: core.Optional },] },
]; };
ClrLoading.propDecorators = {
    "loadingState": [{ type: core.Input, args: ['clrLoading',] },],
};
var CLR_LOADING_DIRECTIVES = [ClrLoading];
var ClrLoadingModule = /** @class */ (function () {
    function ClrLoadingModule() {
    }
    return ClrLoadingModule;
}());
ClrLoadingModule.decorators = [
    { type: core.NgModule, args: [{ imports: [common.CommonModule], declarations: [CLR_LOADING_DIRECTIVES], exports: [CLR_LOADING_DIRECTIVES] },] },
];
var Loading = ClrLoading;
var LOADING_DIRECTIVES = CLR_LOADING_DIRECTIVES;
var ButtonInGroupService = /** @class */ (function () {
    function ButtonInGroupService() {
        this._changes = new rxjs.Subject();
    }
    Object.defineProperty(ButtonInGroupService.prototype, "changes", {
        get: function () {
            return this._changes.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    ButtonInGroupService.prototype.updateButtonGroup = function (button) {
        this._changes.next(button);
    };
    return ButtonInGroupService;
}());
ButtonInGroupService.decorators = [
    { type: core.Injectable },
];
var ClrButton = /** @class */ (function () {
    function ClrButton(buttonInGroupService) {
        this.buttonInGroupService = buttonInGroupService;
        this._enableService = false;
        this._inMenu = false;
        this._classNames = 'btn';
        this._name = null;
        this._type = null;
        this._disabled = null;
        this._click = new core.EventEmitter(false);
    }
    Object.defineProperty(ClrButton.prototype, "inMenu", {
        get: function () {
            return this._inMenu;
        },
        set: function (value) {
            value = !!value;
            if (this._inMenu !== value) {
                this._inMenu = value;
                if (this._enableService && this.buttonInGroupService) {
                    this.buttonInGroupService.updateButtonGroup(this);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrButton.prototype, "classNames", {
        get: function () {
            return this._classNames;
        },
        set: function (value) {
            if (typeof value === 'string') {
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
        get: function () {
            return this._name;
        },
        set: function (value) {
            if (typeof value === 'string') {
                this._name = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrButton.prototype, "type", {
        get: function () {
            return this._type;
        },
        set: function (value) {
            if (typeof value === 'string') {
                this._type = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrButton.prototype, "disabled", {
        get: function () {
            return this._disabled;
        },
        set: function (value) {
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
    ClrButton.prototype.loadingStateChange = function (state$$1) {
        this.loading = state$$1 === ClrLoadingState.LOADING;
    };
    ClrButton.prototype.emitClick = function () {
        this._click.emit(true);
    };
    ClrButton.prototype.ngAfterViewInit = function () {
        this._enableService = true;
    };
    return ClrButton;
}());
ClrButton.decorators = [
    { type: core.Component, args: [{
                selector: 'clr-button',
                template: "\n        <ng-template #buttonProjectedRef>\n            <button \n                [class]=\"classNames\" \n                (click)=\"emitClick()\"\n                [attr.type]=\"type\"\n                [attr.name]=\"name\"\n                [attr.disabled]=\"disabled\">\n                <span class=\"spinner spinner-inline\" *ngIf=\"loading\"></span>\n                <ng-content></ng-content>\n            </button>\n        </ng-template>\n    ",
                providers: [{ provide: LoadingListener, useExisting: ClrButton }],
            },] },
];
ClrButton.ctorParameters = function () { return [
    { type: ButtonInGroupService, decorators: [{ type: core.SkipSelf }, { type: core.Optional },] },
]; };
ClrButton.propDecorators = {
    "templateRef": [{ type: core.ViewChild, args: ['buttonProjectedRef',] },],
    "inMenu": [{ type: core.Input, args: ['clrInMenu',] },],
    "classNames": [{ type: core.Input, args: ['class',] },],
    "name": [{ type: core.Input, args: ['name',] },],
    "type": [{ type: core.Input, args: ['type',] },],
    "disabled": [{ type: core.Input, args: ['disabled',] },],
    "_click": [{ type: core.Output, args: ['click',] },],
};
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
var ClrButtonGroup = /** @class */ (function () {
    function ClrButtonGroup(buttonGroupNewService, elementRef) {
        this.buttonGroupNewService = buttonGroupNewService;
        this.elementRef = elementRef;
        this.inlineButtons = [];
        this.menuButtons = [];
        this._openMenu = false;
        this.anchorPoint = Point.BOTTOM_LEFT;
        this.popoverPoint = Point.LEFT_TOP;
        this._overflowMenuToggleClicked = false;
    }
    ClrButtonGroup.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.initializeButtons();
        this.buttonGroupNewService.changes.subscribe(function (button) { return _this.rearrangeButton(button); });
        this.buttons.changes.subscribe(function () {
            _this.initializeButtons();
        });
    };
    ClrButtonGroup.prototype.rearrangeButton = function (button) {
        var fromView;
        var toView;
        if (button.inMenu) {
            fromView = this.inlineButtons;
            toView = this.menuButtons;
        }
        else {
            fromView = this.menuButtons;
            toView = this.inlineButtons;
        }
        var index = fromView.indexOf(button);
        if (index > -1) {
            fromView.splice(index, 1);
            var moveIndex = this.getMoveIndex(button);
            if (moveIndex <= toView.length) {
                toView.splice(moveIndex, 0, button);
            }
        }
    };
    ClrButtonGroup.prototype.getMoveIndex = function (buttonToMove) {
        var tempArr = this.buttons.filter(function (button) { return button.inMenu === buttonToMove.inMenu; });
        return tempArr.indexOf(buttonToMove);
    };
    ClrButtonGroup.prototype.initializeButtons = function () {
        var tempInlineButtons = [];
        var tempInMenuButtons = [];
        this.buttons.forEach(function (button) {
            if (button.inMenu) {
                tempInMenuButtons.push(button);
            }
            else {
                tempInlineButtons.push(button);
            }
        });
        this.inlineButtons = tempInlineButtons;
        this.menuButtons = tempInMenuButtons;
    };
    Object.defineProperty(ClrButtonGroup.prototype, "menuPosition", {
        get: function () {
            return this._menuPosition;
        },
        set: function (pos) {
            if (pos && CLR_MENU_POSITIONS.indexOf(pos) > -1) {
                this._menuPosition = pos;
            }
            else {
                this._menuPosition = 'bottom-left';
            }
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
        get: function () {
            return this._openMenu;
        },
        set: function (value) {
            this._openMenu = value;
        },
        enumerable: true,
        configurable: true
    });
    ClrButtonGroup.prototype.toggleMenu = function () {
        this.openMenu = !this.openMenu;
        this._overflowMenuToggleClicked = true;
    };
    ClrButtonGroup.prototype.onMouseClick = function (target) {
        if (this.openMenu && !this._overflowMenuToggleClicked) {
            this._overflowMenuToggleClicked = false;
            var current = target;
            var host = this.elementRef.nativeElement;
            if (current.classList.contains('dropdown-menu')) {
                current = current.parentNode;
                while (current) {
                    if (current === document) {
                        this.openMenu = false;
                        return;
                    }
                    if (current === host) {
                        return;
                    }
                    current = current.parentNode;
                }
            }
            this.openMenu = false;
        }
        this._overflowMenuToggleClicked = false;
    };
    return ClrButtonGroup;
}());
ClrButtonGroup.decorators = [
    { type: core.Component, args: [{
                selector: 'clr-button-group',
                template: "<!--\n  ~ Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.\n  ~ This software is released under MIT license.\n  ~ The full license information can be found in LICENSE in the root directory of this project.\n  -->\n\n<ng-container *ngFor=\"let inlineButton of inlineButtons\">\n    <ng-template [ngTemplateOutlet]=\"inlineButton.templateRef\"></ng-template>\n</ng-container>\n<ng-container *ngIf=\"menuButtons.length > 0\">\n    <div\n        class=\"btn-group-overflow open\"\n        [ngClass]=\"menuPosition\"\n        #anchor>\n        <button\n            class=\"btn dropdown-toggle\"\n            (click)=\"toggleMenu()\">\n            <clr-icon shape=\"ellipsis-horizontal\"></clr-icon>\n        </button>\n        <div\n            class=\"dropdown-menu\"\n            *clrPopoverOld=\"openMenu; anchor: anchor; anchorPoint: anchorPoint; popoverPoint: popoverPoint;\">\n            <ng-template [ngTemplateOutlet]=\"ref\"></ng-template>\n        </div>\n    </div>\n</ng-container>\n<ng-template #ref>\n    <ng-container *ngFor=\"let menuButton of menuButtons\">\n        <ng-template [ngTemplateOutlet]=\"menuButton.templateRef\"></ng-template>\n    </ng-container>\n</ng-template>\n",
                providers: [ButtonInGroupService],
                host: { '[class.btn-group]': 'true' },
            },] },
];
ClrButtonGroup.ctorParameters = function () { return [
    { type: ButtonInGroupService, },
    { type: core.ElementRef, },
]; };
ClrButtonGroup.propDecorators = {
    "buttons": [{ type: core.ContentChildren, args: [ClrButton,] },],
    "menuPosition": [{ type: core.Input, args: ['clrMenuPosition',] },],
    "onMouseClick": [{ type: core.HostListener, args: ['document:click', ['$event.target'],] },],
};
var CLR_BUTTON_GROUP_DIRECTIVES = [ClrButton, ClrButtonGroup];
var ClrButtonGroupModule = /** @class */ (function () {
    function ClrButtonGroupModule() {
    }
    return ClrButtonGroupModule;
}());
ClrButtonGroupModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [common.CommonModule, ClrIconModule, ClrCommonPopoverModule],
                declarations: [CLR_BUTTON_GROUP_DIRECTIVES],
                exports: [CLR_BUTTON_GROUP_DIRECTIVES],
            },] },
];
var Button = ClrButton;
var ButtonGroup = ClrButtonGroup;
var BUTTON_GROUP_DIRECTIVES = CLR_BUTTON_GROUP_DIRECTIVES;
var ClrLoadingButton = /** @class */ (function () {
    function ClrLoadingButton(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.buttonState = ClrLoadingState;
        this.state = ClrLoadingState.DEFAULT;
        this.clrLoadingChange = new core.EventEmitter(false);
    }
    ClrLoadingButton.prototype.loadingStateChange = function (state$$1) {
        var _this = this;
        this.state = state$$1;
        switch (state$$1) {
            case ClrLoadingState.DEFAULT:
                this.renderer.removeStyle(this.el.nativeElement, 'width');
                this.renderer.removeAttribute(this.el.nativeElement, 'disabled');
                break;
            case ClrLoadingState.LOADING:
                this.setExplicitButtonWidth();
                this.renderer.setAttribute(this.el.nativeElement, 'disabled', '');
                break;
            case ClrLoadingState.SUCCESS:
                this.setExplicitButtonWidth();
                setTimeout(function () {
                    _this.loadingStateChange(ClrLoadingState.DEFAULT);
                }, 1000);
                break;
            case ClrLoadingState.ERROR:
                this.loadingStateChange(ClrLoadingState.DEFAULT);
                break;
            default:
                break;
        }
        this.clrLoadingChange.emit(state$$1);
    };
    ClrLoadingButton.prototype.setExplicitButtonWidth = function () {
        if (getComputedStyle) {
            var width = getComputedStyle(this.el.nativeElement).getPropertyValue('width');
            this.renderer.setStyle(this.el.nativeElement, 'width', width);
        }
    };
    return ClrLoadingButton;
}());
ClrLoadingButton.decorators = [
    { type: core.Component, args: [{
                selector: 'button[clrLoading]',
                template: "\n        <ng-container [ngSwitch]=\"state\">\n            <span *ngSwitchCase=\"buttonState.LOADING\">\n                <span @spinner class=\"spinner spinner-inline\"></span>\n            </span>\n            <span *ngSwitchCase=\"buttonState.SUCCESS\">\n                <span @validated class=\"spinner spinner-inline spinner-check\"></span>\n            </span>\n            <span *ngSwitchCase=\"buttonState.DEFAULT\" @defaultButton>\n                <ng-content></ng-content>\n            </span>\n        </ng-container>\n    ",
                providers: [{ provide: LoadingListener, useExisting: ClrLoadingButton }],
                animations: [
                    animations.trigger('defaultButton', [
                        animations.transition(':enter', [animations.style({ opacity: 0 }), animations.animate('200ms 100ms ease-in', animations.style({ opacity: 1 }))]),
                        animations.transition(':leave', [animations.style({ opacity: 0 })]),
                    ]),
                    animations.trigger('spinner', [
                        animations.transition(':enter', [animations.style({ opacity: 0 }), animations.animate('200ms 100ms ease-in', animations.style({ opacity: 1 }))]),
                        animations.transition(':leave', [animations.style({ opacity: 1 }), animations.animate('100ms ease-out', animations.style({ opacity: 0 }))]),
                    ]),
                    animations.trigger('validated', [
                        animations.transition(':enter', [
                            animations.animate('300ms', animations.keyframes([
                                animations.style({ transform: 'scale(0,0)' }),
                                animations.style({ opacity: 1 }),
                                animations.style({ transform: 'scale(1.2,1.2)' }),
                                animations.style({ transform: 'scale(.9,.9)' }),
                                animations.style({ transform: 'scale(1,1)' }),
                            ])),
                        ]),
                        animations.transition(':leave', [animations.style({ opacity: 1 }), animations.animate('100ms ease-out', animations.style({ opacity: 0 }))]),
                    ]),
                ],
            },] },
];
ClrLoadingButton.ctorParameters = function () { return [
    { type: core.ElementRef, },
    { type: core.Renderer2, },
]; };
ClrLoadingButton.propDecorators = {
    "clrLoadingChange": [{ type: core.Output, args: ['clrLoadingChange',] },],
};
var CLR_LOADING_BUTTON_DIRECTIVES = [ClrLoadingButton];
var ClrLoadingButtonModule = /** @class */ (function () {
    function ClrLoadingButtonModule() {
    }
    return ClrLoadingButtonModule;
}());
ClrLoadingButtonModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [common.CommonModule],
                declarations: [CLR_LOADING_BUTTON_DIRECTIVES],
                exports: [CLR_LOADING_BUTTON_DIRECTIVES],
            },] },
];
var LoadingButton = ClrLoadingButton;
var LOADING_BUTTON_DIRECTIVES = CLR_LOADING_BUTTON_DIRECTIVES;
var ClrButtonModule = /** @class */ (function () {
    function ClrButtonModule() {
    }
    return ClrButtonModule;
}());
ClrButtonModule.decorators = [
    { type: core.NgModule, args: [{
                exports: [ClrLoadingButtonModule, ClrButtonGroupModule],
            },] },
];
var ClrCodeHighlight = /** @class */ (function () {
    function ClrCodeHighlight(_el, renderer, platformId) {
        this._el = _el;
        this.renderer = renderer;
        this.platformId = platformId;
        this._highlight = '';
    }
    ClrCodeHighlight.prototype.ngAfterContentInit = function () {
        this.redraw();
    };
    ClrCodeHighlight.prototype.redraw = function () {
        if (this._el && this._el.nativeElement && common.isPlatformBrowser(this.platformId)) {
            Prism.highlightElement(this._el.nativeElement);
        }
    };
    Object.defineProperty(ClrCodeHighlight.prototype, "highlight", {
        get: function () {
            return this._highlight;
        },
        set: function (val) {
            if (val && val.trim() !== '') {
                this._highlight = val;
                this.renderer.addClass(this._el.nativeElement, this._highlight);
            }
        },
        enumerable: true,
        configurable: true
    });
    return ClrCodeHighlight;
}());
ClrCodeHighlight.decorators = [
    { type: core.Directive, args: [{ selector: 'code[clr-code-highlight]' },] },
];
ClrCodeHighlight.ctorParameters = function () { return [
    { type: core.ElementRef, },
    { type: core.Renderer2, },
    { type: Object, decorators: [{ type: core.Inject, args: [core.PLATFORM_ID,] },] },
]; };
ClrCodeHighlight.propDecorators = {
    "highlight": [{ type: core.Input, args: ['clr-code-highlight',] },],
};
var CLR_CODE_HIGHLIGHT_DIRECTIVES = [ClrCodeHighlight];
var ClrSyntaxHighlightModule = /** @class */ (function () {
    function ClrSyntaxHighlightModule() {
    }
    return ClrSyntaxHighlightModule;
}());
ClrSyntaxHighlightModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [common.CommonModule],
                declarations: [CLR_CODE_HIGHLIGHT_DIRECTIVES],
                exports: [CLR_CODE_HIGHLIGHT_DIRECTIVES],
            },] },
];
var CodeHighlight = ClrCodeHighlight;
var CODE_HIGHLIGHT_DIRECTIVES = CLR_CODE_HIGHLIGHT_DIRECTIVES;
var ClrCodeModule = /** @class */ (function () {
    function ClrCodeModule() {
    }
    return ClrCodeModule;
}());
ClrCodeModule.decorators = [
    { type: core.NgModule, args: [{ exports: [ClrSyntaxHighlightModule] },] },
];
var activeCounter = 0;
var IF_ACTIVE_ID = new core.InjectionToken('IF_ACTIVE_ID');
function tokenFactory() {
    return ++activeCounter;
}
var IF_ACTIVE_ID_PROVIDER = {
    provide: IF_ACTIVE_ID,
    useFactory: tokenFactory,
};
var IfActiveService = /** @class */ (function () {
    function IfActiveService() {
        this._currentChange = new rxjs.Subject();
    }
    Object.defineProperty(IfActiveService.prototype, "currentChange", {
        get: function () {
            return this._currentChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IfActiveService.prototype, "current", {
        get: function () {
            return this._current;
        },
        set: function (value) {
            if (this._current !== value) {
                this._current = value;
                this._currentChange.next(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    return IfActiveService;
}());
IfActiveService.decorators = [
    { type: core.Injectable },
];
var IfActiveDirective = /** @class */ (function () {
    function IfActiveDirective(ifActiveService, id, template, container) {
        var _this = this;
        this.ifActiveService = ifActiveService;
        this.id = id;
        this.template = template;
        this.container = container;
        this.wasActive = false;
        this.activeChange = new core.EventEmitter(false);
        this.checkAndUpdateView(ifActiveService.current);
        this.subscription = this.ifActiveService.currentChange.subscribe(function (newCurrentId) {
            _this.checkAndUpdateView(newCurrentId);
        });
    }
    IfActiveDirective.prototype.checkAndUpdateView = function (currentId) {
        var isNowActive = currentId === this.id;
        if (isNowActive !== this.wasActive) {
            this.updateView(isNowActive);
            this.activeChange.emit(isNowActive);
            this.wasActive = isNowActive;
        }
    };
    Object.defineProperty(IfActiveDirective.prototype, "active", {
        get: function () {
            return this.ifActiveService.current === this.id;
        },
        set: function (value) {
            if (value) {
                this.ifActiveService.current = this.id;
            }
        },
        enumerable: true,
        configurable: true
    });
    IfActiveDirective.prototype.updateView = function (value) {
        if (value) {
            this.container.createEmbeddedView(this.template);
        }
        else {
            this.container.clear();
        }
    };
    IfActiveDirective.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    return IfActiveDirective;
}());
IfActiveDirective.decorators = [
    { type: core.Directive, args: [{ selector: '[clrIfActive]' },] },
];
IfActiveDirective.ctorParameters = function () { return [
    { type: IfActiveService, },
    { type: undefined, decorators: [{ type: core.Inject, args: [IF_ACTIVE_ID,] },] },
    { type: core.TemplateRef, },
    { type: core.ViewContainerRef, },
]; };
IfActiveDirective.propDecorators = {
    "active": [{ type: core.Input, args: ['clrIfActive',] },],
    "activeChange": [{ type: core.Output, args: ['clrIfActiveChange',] },],
};
var IfOpenService = /** @class */ (function () {
    function IfOpenService() {
        this._openChange = new rxjs.Subject();
    }
    Object.defineProperty(IfOpenService.prototype, "openChange", {
        get: function () {
            return this._openChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IfOpenService.prototype, "open", {
        get: function () {
            return this._open;
        },
        set: function (value) {
            value = !!value;
            if (this._open !== value) {
                this._open = value;
                this._openChange.next(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    IfOpenService.prototype.toggleWithEvent = function (event) {
        this.originalEvent = event;
        this.open = !this.open;
        delete this.originalEvent;
    };
    return IfOpenService;
}());
IfOpenService.decorators = [
    { type: core.Injectable },
];
var IfOpenDirective = /** @class */ (function () {
    function IfOpenDirective(ifOpenService, template, container) {
        var _this = this;
        this.ifOpenService = ifOpenService;
        this.template = template;
        this.container = container;
        this.openChange = new core.EventEmitter(false);
        this.subscription = this.ifOpenService.openChange.subscribe(function (change) {
            _this.updateView(change);
            _this.openChange.emit(change);
        });
    }
    Object.defineProperty(IfOpenDirective.prototype, "open", {
        get: function () {
            return this.ifOpenService.open;
        },
        set: function (value) {
            this.ifOpenService.open = value;
        },
        enumerable: true,
        configurable: true
    });
    IfOpenDirective.prototype.updateView = function (value) {
        if (value) {
            this.container.createEmbeddedView(this.template);
        }
        else {
            this.container.clear();
        }
    };
    IfOpenDirective.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    return IfOpenDirective;
}());
IfOpenDirective.decorators = [
    { type: core.Directive, args: [{ selector: '[clrIfOpen]' },] },
];
IfOpenDirective.ctorParameters = function () { return [
    { type: IfOpenService, },
    { type: core.TemplateRef, },
    { type: core.ViewContainerRef, },
]; };
IfOpenDirective.propDecorators = {
    "open": [{ type: core.Input, args: ['clrIfOpen',] },],
    "openChange": [{ type: core.Output, args: ['clrIfOpenChange',] },],
};
var CONDITIONAL_DIRECTIVES = [IfActiveDirective, IfOpenDirective];
var ClrConditionalModule = /** @class */ (function () {
    function ClrConditionalModule() {
    }
    return ClrConditionalModule;
}());
ClrConditionalModule.decorators = [
    { type: core.NgModule, args: [{ imports: [common.CommonModule], declarations: [CONDITIONAL_DIRECTIVES], exports: [CONDITIONAL_DIRECTIVES] },] },
];
var FocusTrapTracker = /** @class */ (function () {
    function FocusTrapTracker() {
        this._previousFocusTraps = [];
    }
    Object.defineProperty(FocusTrapTracker.prototype, "current", {
        get: function () {
            return this._current;
        },
        set: function (value) {
            this._previousFocusTraps.push(this._current);
            this._current = value;
        },
        enumerable: true,
        configurable: true
    });
    FocusTrapTracker.prototype.activatePreviousTrapper = function () {
        this._current = this._previousFocusTraps.pop();
    };
    return FocusTrapTracker;
}());
FocusTrapTracker.decorators = [
    { type: core.Injectable },
];
var FocusTrapDirective = /** @class */ (function () {
    function FocusTrapDirective(elementRef, injector, focusTrapsTracker, platformId) {
        this.elementRef = elementRef;
        this.focusTrapsTracker = focusTrapsTracker;
        this.platformId = platformId;
        this.document = injector.get(common.DOCUMENT);
        this.focusTrapsTracker.current = this;
    }
    FocusTrapDirective.prototype.onFocusIn = function (event) {
        var nativeElement = this.elementRef.nativeElement;
        if (this.focusTrapsTracker.current === this && !nativeElement.contains(event.target)) {
            nativeElement.focus();
        }
    };
    FocusTrapDirective.prototype.ngAfterViewInit = function () {
        if (common.isPlatformBrowser(this.platformId)) {
            this._previousActiveElement = (document.activeElement);
            var nativeElement = this.elementRef.nativeElement;
            nativeElement.setAttribute('tabindex', '0');
        }
    };
    FocusTrapDirective.prototype.setPreviousFocus = function () {
        if (this._previousActiveElement && this._previousActiveElement.focus) {
            this._previousActiveElement.focus();
        }
    };
    FocusTrapDirective.prototype.ngOnDestroy = function () {
        this.setPreviousFocus();
        this.focusTrapsTracker.activatePreviousTrapper();
    };
    return FocusTrapDirective;
}());
FocusTrapDirective.decorators = [
    { type: core.Directive, args: [{ selector: '[clrFocusTrap]' },] },
];
FocusTrapDirective.ctorParameters = function () { return [
    { type: core.ElementRef, },
    { type: core.Injector, },
    { type: FocusTrapTracker, },
    { type: Object, decorators: [{ type: core.Inject, args: [core.PLATFORM_ID,] },] },
]; };
FocusTrapDirective.propDecorators = {
    "onFocusIn": [{ type: core.HostListener, args: ['document:focusin', ['$event'],] },],
};
var FOCUS_TRAP_DIRECTIVES = [FocusTrapDirective];
var ClrFocusTrapModule = /** @class */ (function () {
    function ClrFocusTrapModule() {
    }
    return ClrFocusTrapModule;
}());
ClrFocusTrapModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [common.CommonModule],
                providers: [FocusTrapTracker],
                declarations: [FOCUS_TRAP_DIRECTIVES],
                exports: [FOCUS_TRAP_DIRECTIVES],
            },] },
];
var EmptyAnchor = /** @class */ (function () {
    function EmptyAnchor() {
    }
    return EmptyAnchor;
}());
EmptyAnchor.decorators = [
    { type: core.Component, args: [{
                template: '',
            },] },
];
var ClrHostWrappingModule = /** @class */ (function () {
    function ClrHostWrappingModule() {
    }
    return ClrHostWrappingModule;
}());
ClrHostWrappingModule.decorators = [
    { type: core.NgModule, args: [{ declarations: [EmptyAnchor], exports: [EmptyAnchor], entryComponents: [EmptyAnchor] },] },
];
var UP_ARROW = 38;
var DOWN_ARROW = 40;
var RIGHT_ARROW = 39;
var LEFT_ARROW = 37;
var ESC = 27;
var DEFAULT_LOCALE_FORMAT = 'dd/MM/y';
var LITTLE_ENDIAN_REGEX = /d+.+m+.+y+/i;
var MIDDLE_ENDIAN_REGEX = /m+.+d+.+y+/i;
var DELIMITER_REGEX = /d+|m+|y+/i;
var USER_INPUT_REGEX = /\d+/g;
var MOBILE_USERAGENT_REGEX = /Mobi/i;
var RTL_REGEX = /\u200f/g;
var YEAR = 'YYYY';
var MONTH = 'MM';
var DATE = 'DD';
var LITTLE_ENDIAN = {
    name: 'LITTLE_ENDIAN',
    format: [DATE, MONTH, YEAR],
};
var MIDDLE_ENDIAN = {
    name: 'MIDDLE_ENDIAN',
    format: [MONTH, DATE, YEAR],
};
var BIG_ENDIAN = {
    name: 'BIG_ENDIAN',
    format: [YEAR, MONTH, DATE],
};
var NO_OF_DAYS_IN_A_WEEK = 7;
var NO_OF_ROWS_IN_CALENDAR_VIEW = 6;
var TOTAL_DAYS_IN_DAYS_VIEW = NO_OF_DAYS_IN_A_WEEK * NO_OF_ROWS_IN_CALENDAR_VIEW;
function getNumberOfDaysInTheMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}
function getDay(year, month, date) {
    return new Date(year, month, date).getDay();
}
function parseToFourDigitYear(year) {
    if (year > 9999 || (year > 100 && year < 999) || year < 10) {
        return -1;
    }
    if (year > 999) {
        return year;
    }
    var currYear = new Date().getFullYear();
    var century = Math.floor(currYear / 100) * 100;
    var result = year + century;
    if (result > currYear + 20) {
        result = result - 100;
    }
    return result;
}
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
        get: function () {
            return this.isFocusable ? 0 : -1;
        },
        enumerable: true,
        configurable: true
    });
    return DayViewModel;
}());
var CalendarModel = /** @class */ (function () {
    function CalendarModel(year, month) {
        this.year = year;
        this.month = month;
        this.initializeDaysInCalendar();
    }
    CalendarModel.prototype.initializeDaysInCalendar = function () {
        var _this = this;
        var noOfDaysInCalendar = getNumberOfDaysInTheMonth(this.year, this.month);
        this.days = Array(noOfDaysInCalendar)
            .fill(null)
            .map(function (date, index) {
            return new DayModel(_this.year, _this.month, index + 1);
        });
    };
    CalendarModel.prototype.isEqual = function (calendar) {
        if (calendar) {
            return this.year === calendar.year && this.month === calendar.month;
        }
        return false;
    };
    CalendarModel.prototype.isDayInCalendar = function (day) {
        if (day) {
            return this.year === day.year && this.month === day.month;
        }
        return false;
    };
    CalendarModel.prototype.previousMonth = function () {
        if (this.month === 0) {
            return new CalendarModel(this.year - 1, 11);
        }
        else {
            return new CalendarModel(this.year, this.month - 1);
        }
    };
    CalendarModel.prototype.nextMonth = function () {
        if (this.month === 11) {
            return new CalendarModel(this.year + 1, 0);
        }
        else {
            return new CalendarModel(this.year, this.month + 1);
        }
    };
    return CalendarModel;
}());
var DayModel = /** @class */ (function () {
    function DayModel(year, month, date) {
        this.year = year;
        this.month = month;
        this.date = date;
    }
    Object.defineProperty(DayModel.prototype, "calendar", {
        get: function () {
            return new CalendarModel(this.year, this.month);
        },
        enumerable: true,
        configurable: true
    });
    DayModel.prototype.isEqual = function (day) {
        if (day) {
            return this.year === day.year && this.month === day.month && this.date === day.date;
        }
        return false;
    };
    DayModel.prototype.toDate = function () {
        return new Date(this.year, this.month, this.date);
    };
    DayModel.prototype.incrementBy = function (value) {
        var date = new Date(this.year, this.month, this.date + value);
        return new DayModel(date.getFullYear(), date.getMonth(), date.getDate());
    };
    DayModel.prototype.clone = function () {
        return new DayModel(this.year, this.month, this.date);
    };
    return DayModel;
}());
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
        get: function () {
            return this._calendarView;
        },
        enumerable: true,
        configurable: true
    });
    CalendarViewModel.prototype.initializeCalendarView = function () {
        var prevMonthCalendar = this.calendar.previousMonth();
        var nextMonthCalendar = this.calendar.nextMonth();
        var daysFromPrevMonthInCalView = this.numDaysFromPrevMonthInCalView(this.calendar.year, this.calendar.month);
        var daysFromNextMonthInCalView = TOTAL_DAYS_IN_DAYS_VIEW - (this.calendar.days.length + daysFromPrevMonthInCalView);
        var prevMonthDayViews = [];
        var nextMonthDayViews = [];
        if (daysFromPrevMonthInCalView > 0) {
            prevMonthDayViews = this.generateDayViewModels(prevMonthCalendar.days.slice(-1 * daysFromPrevMonthInCalView), true, false);
        }
        this.currMonthDayViews = this.generateDayViewModels(this.calendar.days, false, true);
        if (daysFromNextMonthInCalView > 0) {
            nextMonthDayViews = this.generateDayViewModels(nextMonthCalendar.days.slice(0, daysFromNextMonthInCalView), true, false);
        }
        this._calendarView = this.generateCalendarView(prevMonthDayViews, this.currMonthDayViews, nextMonthDayViews);
        this.initializeSelectedDay();
        this.initializeFocusableDay();
    };
    CalendarViewModel.prototype.generateDayViewModels = function (days, isDisabled, isCurrentCalendar) {
        var dayViews = days.map(function (day) {
            return new DayViewModel(day, false, isDisabled, false, false);
        });
        if (isCurrentCalendar && this.calendar.isDayInCalendar(this.today)) {
            dayViews[this.today.date - 1].isTodaysDate = true;
        }
        return dayViews;
    };
    CalendarViewModel.prototype.numDaysFromPrevMonthInCalView = function (currentYear, currentMonth) {
        var firstDayOfCurrMonth = getDay(currentYear, currentMonth, 1);
        if (firstDayOfCurrMonth >= this.firstDayOfWeek) {
            return firstDayOfCurrMonth - this.firstDayOfWeek;
        }
        else {
            return NO_OF_DAYS_IN_A_WEEK + firstDayOfCurrMonth - this.firstDayOfWeek;
        }
    };
    CalendarViewModel.prototype.isDayInCalendarView = function (day) {
        if (!this.calendar.isDayInCalendar(day)) {
            return false;
        }
        return true;
    };
    CalendarViewModel.prototype.generateCalendarView = function (prev, curr, next) {
        var combinationArr = __spread(prev, curr, next);
        var calendarView = [];
        for (var i = 0; i < NO_OF_ROWS_IN_CALENDAR_VIEW; i++) {
            calendarView[i] = combinationArr.slice(i * NO_OF_DAYS_IN_A_WEEK, (i + 1) * NO_OF_DAYS_IN_A_WEEK);
        }
        return calendarView;
    };
    CalendarViewModel.prototype.initializeSelectedDay = function () {
        if (this.selectedDay && this.isDayInCalendarView(this.selectedDay)) {
            this.currMonthDayViews[this.selectedDay.date - 1].isSelected = true;
        }
    };
    CalendarViewModel.prototype.initializeFocusableDay = function () {
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
    CalendarViewModel.prototype.setFocusableFlag = function (day, flag) {
        if (day) {
            this.currMonthDayViews[day.date - 1].isFocusable = flag;
        }
    };
    CalendarViewModel.prototype.updateFocusableDay = function (day) {
        this.setFocusableFlag(this.focusableDay, false);
        this.setFocusableFlag(day, true);
        this.focusableDay = day;
    };
    return CalendarViewModel;
}());
var DateNavigationService = /** @class */ (function () {
    function DateNavigationService() {
        this._todaysFullDate = new Date();
        this._selectedDayChange = new rxjs.Subject();
        this._displayedCalendarChange = new rxjs.Subject();
        this._focusOnCalendarChange = new rxjs.Subject();
        this._focusedDayChange = new rxjs.Subject();
    }
    Object.defineProperty(DateNavigationService.prototype, "displayedCalendar", {
        get: function () {
            return this._displayedCalendar;
        },
        enumerable: true,
        configurable: true
    });
    DateNavigationService.prototype.setDisplayedCalendar = function (value) {
        if (!this._displayedCalendar.isEqual(value)) {
            this._displayedCalendar = value;
            this._displayedCalendarChange.next();
        }
    };
    DateNavigationService.prototype.initializeTodaysDate = function () {
        this._todaysFullDate = new Date();
        this._today = new DayModel(this._todaysFullDate.getFullYear(), this._todaysFullDate.getMonth(), this._todaysFullDate.getDate());
    };
    Object.defineProperty(DateNavigationService.prototype, "today", {
        get: function () {
            return this._today;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateNavigationService.prototype, "selectedDayChange", {
        get: function () {
            return this._selectedDayChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    DateNavigationService.prototype.notifySelectedDayChanged = function (dayModel) {
        if (dayModel.isEqual(this.selectedDay)) {
            return;
        }
        this.selectedDay = dayModel;
        this._selectedDayChange.next(dayModel);
    };
    DateNavigationService.prototype.initializeCalendar = function () {
        this.focusedDay = null;
        this.initializeTodaysDate();
        if (this.selectedDay) {
            this._displayedCalendar = new CalendarModel(this.selectedDay.year, this.selectedDay.month);
        }
        else {
            this._displayedCalendar = new CalendarModel(this.today.year, this.today.month);
        }
    };
    DateNavigationService.prototype.changeMonth = function (month) {
        this.setDisplayedCalendar(new CalendarModel(this._displayedCalendar.year, month));
    };
    DateNavigationService.prototype.changeYear = function (year) {
        this.setDisplayedCalendar(new CalendarModel(year, this._displayedCalendar.month));
    };
    DateNavigationService.prototype.moveToNextMonth = function () {
        this.setDisplayedCalendar(this._displayedCalendar.nextMonth());
    };
    DateNavigationService.prototype.moveToPreviousMonth = function () {
        this.setDisplayedCalendar(this._displayedCalendar.previousMonth());
    };
    DateNavigationService.prototype.moveToCurrentMonth = function () {
        if (!this.displayedCalendar.isDayInCalendar(this.today)) {
            this.setDisplayedCalendar(new CalendarModel(this.today.year, this.today.month));
        }
        this._focusOnCalendarChange.next();
    };
    DateNavigationService.prototype.incrementFocusDay = function (value) {
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
        get: function () {
            return this._displayedCalendarChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateNavigationService.prototype, "focusOnCalendarChange", {
        get: function () {
            return this._focusOnCalendarChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateNavigationService.prototype, "focusedDayChange", {
        get: function () {
            return this._focusedDayChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    return DateNavigationService;
}());
DateNavigationService.decorators = [
    { type: core.Injectable },
];
var DatepickerFocusService = /** @class */ (function () {
    function DatepickerFocusService(_ngZone, platformId) {
        this._ngZone = _ngZone;
        this.platformId = platformId;
    }
    DatepickerFocusService.prototype.focusCell = function (elRef) {
        var _this = this;
        this._ngZone.runOutsideAngular(function () {
            _this._ngZone.onStable
                .asObservable()
                .pipe(operators.first())
                .subscribe(function () {
                if (common.isPlatformBrowser(_this.platformId)) {
                    var focusEl = elRef.nativeElement.querySelector('[tabindex="0"]');
                    if (focusEl) {
                        focusEl.focus();
                    }
                }
            });
        });
    };
    return DatepickerFocusService;
}());
DatepickerFocusService.decorators = [
    { type: core.Injectable },
];
DatepickerFocusService.ctorParameters = function () { return [
    { type: core.NgZone, },
    { type: Object, decorators: [{ type: core.Inject, args: [core.PLATFORM_ID,] },] },
]; };
var LocaleHelperService = /** @class */ (function () {
    function LocaleHelperService(locale) {
        this.locale = locale;
        this._firstDayOfWeek = 0;
        this.initializeLocaleData();
    }
    Object.defineProperty(LocaleHelperService.prototype, "firstDayOfWeek", {
        get: function () {
            return this._firstDayOfWeek;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocaleHelperService.prototype, "localeDaysNarrow", {
        get: function () {
            return this._localeDaysNarrow;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocaleHelperService.prototype, "localeMonthsAbbreviated", {
        get: function () {
            return this._localeMonthsAbbreviated;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocaleHelperService.prototype, "localeMonthsWide", {
        get: function () {
            return this._localeMonthsWide;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocaleHelperService.prototype, "localeDateFormat", {
        get: function () {
            return this._localeDateFormat;
        },
        enumerable: true,
        configurable: true
    });
    LocaleHelperService.prototype.initializeLocaleData = function () {
        this.initializeFirstDayOfWeek();
        this.initializeLocaleDateFormat();
        this.initializeLocaleMonthsAbbreviated();
        this.initializeLocaleMonthsWide();
        this.initializeLocaleDaysNarrow();
    };
    LocaleHelperService.prototype.initializeLocaleDaysNarrow = function () {
        var tempArr = common.getLocaleDayNames(this.locale, common.FormStyle.Format, common.TranslationWidth.Narrow).slice();
        var firstDayOfWeek = this.firstDayOfWeek;
        if (firstDayOfWeek > 0) {
            var prevDays = tempArr.splice(0, firstDayOfWeek);
            tempArr.push.apply(tempArr, __spread(prevDays));
        }
        this._localeDaysNarrow = tempArr;
    };
    LocaleHelperService.prototype.initializeLocaleMonthsAbbreviated = function () {
        this._localeMonthsAbbreviated = common.getLocaleMonthNames(this.locale, common.FormStyle.Format, common.TranslationWidth.Abbreviated).slice();
    };
    LocaleHelperService.prototype.initializeLocaleMonthsWide = function () {
        this._localeMonthsWide = common.getLocaleMonthNames(this.locale, common.FormStyle.Format, common.TranslationWidth.Wide).slice();
    };
    LocaleHelperService.prototype.initializeFirstDayOfWeek = function () {
        this._firstDayOfWeek = common.getLocaleFirstDayOfWeek(this.locale);
    };
    LocaleHelperService.prototype.initializeLocaleDateFormat = function () {
        this._localeDateFormat = common.getLocaleDateFormat(this.locale, common.FormatWidth.Short);
    };
    return LocaleHelperService;
}());
LocaleHelperService.decorators = [
    { type: core.Injectable },
];
LocaleHelperService.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: core.Inject, args: [core.LOCALE_ID,] },] },
]; };
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
        get: function () {
            return this._localeHelperService.localeDaysNarrow;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrCalendar.prototype, "calendar", {
        get: function () {
            return this._dateNavigationService.displayedCalendar;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrCalendar.prototype, "selectedDay", {
        get: function () {
            return this._dateNavigationService.selectedDay;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrCalendar.prototype, "focusedDay", {
        get: function () {
            return this._dateNavigationService.focusedDay;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrCalendar.prototype, "today", {
        get: function () {
            return this._dateNavigationService.today;
        },
        enumerable: true,
        configurable: true
    });
    ClrCalendar.prototype.initializeSubscriptions = function () {
        var _this = this;
        this._subs.push(this._dateNavigationService.displayedCalendarChange.subscribe(function () {
            _this.generateCalendarView();
        }));
        this._subs.push(this._dateNavigationService.focusedDayChange.subscribe(function (focusedDay) {
            _this.calendarViewModel.updateFocusableDay(focusedDay);
        }));
        this._subs.push(this._dateNavigationService.focusOnCalendarChange.subscribe(function () {
            _this._datepickerFocusService.focusCell(_this._elRef);
        }));
    };
    ClrCalendar.prototype.generateCalendarView = function () {
        this.calendarViewModel = new CalendarViewModel(this.calendar, this.selectedDay, this.focusedDay, this.today, this._localeHelperService.firstDayOfWeek);
    };
    ClrCalendar.prototype.onKeyDown = function (event) {
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
                    break;
            }
        }
    };
    ClrCalendar.prototype.ngAfterViewInit = function () {
        this._datepickerFocusService.focusCell(this._elRef);
    };
    ClrCalendar.prototype.ngOnDestroy = function () {
        this._subs.forEach(function (sub) { return sub.unsubscribe(); });
    };
    return ClrCalendar;
}());
ClrCalendar.decorators = [
    { type: core.Component, args: [{ selector: 'clr-calendar', template: "<table class=\"calendar-table weekdays\">\n    <tr class=\"calendar-row\">\n        <td *ngFor=\"let day of localeDaysNarrow\" class=\"calendar-cell weekday\">\n            {{day}}\n        </td>\n    </tr>\n</table>\n<table\n    class=\"calendar-table calendar-dates\">\n    <tr class=\"calendar-row\" *ngFor=\"let row of calendarViewModel.calendarView\">\n        <td *ngFor=\"let dayView of row\" class=\"calendar-cell\">\n            <clr-day [clrDayView]=\"dayView\"></clr-day>\n        </td>\n    </tr>\n</table>\n" },] },
];
ClrCalendar.ctorParameters = function () { return [
    { type: LocaleHelperService, },
    { type: DateNavigationService, },
    { type: DatepickerFocusService, },
    { type: core.ElementRef, },
]; };
ClrCalendar.propDecorators = {
    "onKeyDown": [{ type: core.HostListener, args: ['keydown', ['$event'],] },],
};
var counter = 0;
var ControlIdService = /** @class */ (function () {
    function ControlIdService() {
        this._id = 'clr-form-control-' + ++counter;
        this._idChange = new rxjs.BehaviorSubject(this._id);
    }
    Object.defineProperty(ControlIdService.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
            this._idChange.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ControlIdService.prototype, "idChange", {
        get: function () {
            return this._idChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    return ControlIdService;
}());
ControlIdService.decorators = [
    { type: core.Injectable },
];
var DateFormControlService = /** @class */ (function () {
    function DateFormControlService() {
        this._touchedChange = new rxjs.Subject();
        this._dirtyChange = new rxjs.Subject();
    }
    Object.defineProperty(DateFormControlService.prototype, "touchedChange", {
        get: function () {
            return this._touchedChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateFormControlService.prototype, "dirtyChange", {
        get: function () {
            return this._dirtyChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    DateFormControlService.prototype.markAsTouched = function () {
        this._touchedChange.next();
    };
    DateFormControlService.prototype.markAsDirty = function () {
        this._dirtyChange.next();
    };
    return DateFormControlService;
}());
DateFormControlService.decorators = [
    { type: core.Injectable },
];
var DateIOService = /** @class */ (function () {
    function DateIOService(_localeHelperService) {
        this._localeHelperService = _localeHelperService;
        this.cldrLocaleDateFormat = DEFAULT_LOCALE_FORMAT;
        this.localeDisplayFormat = LITTLE_ENDIAN;
        this.delimiters = ['/', '/'];
        this.cldrLocaleDateFormat = this._localeHelperService.localeDateFormat;
        this.initializeLocaleDisplayFormat();
    }
    DateIOService.prototype.initializeLocaleDisplayFormat = function () {
        var format = this.cldrLocaleDateFormat.toLocaleLowerCase();
        if (LITTLE_ENDIAN_REGEX.test(format)) {
            this.localeDisplayFormat = LITTLE_ENDIAN;
        }
        else if (MIDDLE_ENDIAN_REGEX.test(format)) {
            this.localeDisplayFormat = MIDDLE_ENDIAN;
        }
        else {
            this.localeDisplayFormat = BIG_ENDIAN;
        }
        this.extractDelimiters();
    };
    DateIOService.prototype.extractDelimiters = function () {
        if (this.cldrLocaleDateFormat) {
            var localeFormat = this.cldrLocaleDateFormat.replace(RTL_REGEX, '');
            var delimiters = localeFormat.split(DELIMITER_REGEX);
            if (delimiters && delimiters.length === 4) {
                this.delimiters = [delimiters[1], delimiters[2]];
            }
            else {
                console.error('Unexpected date format received. Delimiters extracted: ', delimiters);
            }
        }
    };
    DateIOService.prototype.toLocaleDisplayFormatString = function (date) {
        if (date) {
            if (isNaN(date.getTime())) {
                return '';
            }
            var dateNo = date.getDate();
            var monthNo = date.getMonth() + 1;
            var dateStr = dateNo > 9 ? dateNo.toString() : '0' + dateNo;
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
        get: function () {
            var format = this.localeDisplayFormat.format;
            return format[0] + this.delimiters[0] + format[1] + this.delimiters[1] + format[2];
        },
        enumerable: true,
        configurable: true
    });
    DateIOService.prototype.isValidMonth = function (month) {
        return month > -1 && month < 12;
    };
    DateIOService.prototype.isValidDate = function (year, month, date) {
        return date > 0 && date <= getNumberOfDaysInTheMonth(year, month);
    };
    DateIOService.prototype.validateAndGetDate = function (year, month, date) {
        var y = +year;
        var m = +month - 1;
        var d = +date;
        if (!this.isValidMonth(m) || !this.isValidDate(y, m, d)) {
            return null;
        }
        var result = parseToFourDigitYear(y);
        return result !== -1 ? new Date(result, m, d) : null;
    };
    DateIOService.prototype.isValidInput = function (date) {
        if (!date) {
            return null;
        }
        var dateParts = date.match(USER_INPUT_REGEX);
        if (!dateParts || dateParts.length !== 3) {
            return null;
        }
        var _a = __read(dateParts, 3), firstPart = _a[0], secondPart = _a[1], thirdPart = _a[2];
        if (this.localeDisplayFormat === LITTLE_ENDIAN) {
            return this.validateAndGetDate(thirdPart, secondPart, firstPart);
        }
        else if (this.localeDisplayFormat === MIDDLE_ENDIAN) {
            return this.validateAndGetDate(thirdPart, firstPart, secondPart);
        }
        else {
            return this.validateAndGetDate(firstPart, secondPart, thirdPart);
        }
    };
    return DateIOService;
}());
DateIOService.decorators = [
    { type: core.Injectable },
];
DateIOService.ctorParameters = function () { return [
    { type: LocaleHelperService, },
]; };
var DATEPICKER_ENABLE_BREAKPOINT = 768;
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
        get: function () {
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
    return DatepickerEnabledService;
}());
DatepickerEnabledService.decorators = [
    { type: core.Injectable },
];
DatepickerEnabledService.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: core.Inject, args: [common.DOCUMENT,] },] },
]; };
var ClrDateContainer = /** @class */ (function () {
    function ClrDateContainer(_ifOpenService, _dateNavigationService, _datepickerEnabledService, dateFormControlService) {
        var _this = this;
        this._ifOpenService = _ifOpenService;
        this._dateNavigationService = _dateNavigationService;
        this._datepickerEnabledService = _datepickerEnabledService;
        this.dateFormControlService = dateFormControlService;
        this._dynamic = false;
        this._sub = this._ifOpenService.openChange.subscribe(function (open) {
            if (open) {
                _this.initializeCalendar();
            }
        });
    }
    Object.defineProperty(ClrDateContainer.prototype, "isEnabled", {
        get: function () {
            return this._datepickerEnabledService.isEnabled;
        },
        enumerable: true,
        configurable: true
    });
    ClrDateContainer.prototype.initializeCalendar = function () {
        this._dateNavigationService.initializeCalendar();
    };
    ClrDateContainer.prototype.toggleDatepicker = function (event) {
        this._ifOpenService.toggleWithEvent(event);
        this.dateFormControlService.markAsTouched();
    };
    ClrDateContainer.prototype.ngOnDestroy = function () {
        this._sub.unsubscribe();
    };
    return ClrDateContainer;
}());
ClrDateContainer.decorators = [
    { type: core.Component, args: [{
                selector: 'clr-date-container',
                template: "\n        <ng-content></ng-content>\n        <button\n            type=\"button\"\n            class=\"datepicker-trigger\"\n            (click)=\"toggleDatepicker($event)\"\n            *ngIf=\"isEnabled\">\n            <clr-icon shape=\"calendar\" class=\"datepicker-trigger-icon\"></clr-icon>\n        </button>\n        <clr-datepicker-view-manager *clrIfOpen clrFocusTrap></clr-datepicker-view-manager>\n    ",
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
ClrDateContainer.ctorParameters = function () { return [
    { type: IfOpenService, },
    { type: DateNavigationService, },
    { type: DatepickerEnabledService, },
    { type: DateFormControlService, },
]; };
var HostWrapper = /** @class */ (function () {
    function HostWrapper(containerType, vcr) {
        this.injector = vcr.injector;
        if (!this.injector.get(containerType, null)) {
            var cfr = this.injector.get(core.ComponentFactoryResolver);
            var el = this.injector.get(core.ElementRef);
            vcr.createComponent(cfr.resolveComponentFactory(EmptyAnchor));
            var factory = cfr.resolveComponentFactory(containerType);
            var containerRef = vcr.createComponent(factory, undefined, undefined, [[el.nativeElement]]);
            vcr.remove(0);
            containerRef.instance._dynamic = true;
            this.injector = containerRef.injector;
        }
    }
    HostWrapper.prototype.get = function (token, notFoundValue) {
        return this.injector.get(token, notFoundValue);
    };
    return HostWrapper;
}());
var WrappedFormControl = /** @class */ (function () {
    function WrappedFormControl(wrapperType, vcr) {
        this.wrapperType = wrapperType;
        this.vcr = vcr;
    }
    Object.defineProperty(WrappedFormControl.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
            if (this.controlIdService) {
                this.controlIdService.id = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    WrappedFormControl.prototype.getProviderFromContainer = function (token, notFoundValue) {
        return this._containerInjector.get(token, notFoundValue);
    };
    WrappedFormControl.prototype.ngOnInit = function () {
        this._containerInjector = new HostWrapper(this.wrapperType, this.vcr);
        this.controlIdService = this._containerInjector.get(ControlIdService);
        if (this._id) {
            this.controlIdService.id = this._id;
        }
        else {
            this._id = this.controlIdService.id;
        }
    };
    return WrappedFormControl;
}());
WrappedFormControl.propDecorators = {
    "id": [{ type: core.HostBinding }, { type: core.Input },],
};
var ClrDateInput = /** @class */ (function (_super) {
    __extends(ClrDateInput, _super);
    function ClrDateInput(container, vcr, elRef, renderer, _ngControl, _dateIOService, _dateNavigationService, _datepickerEnabledService, dateFormControlService, platformId) {
        var _this = _super.call(this, ClrDateContainer, vcr) || this;
        _this.container = container;
        _this.elRef = elRef;
        _this.renderer = renderer;
        _this._ngControl = _ngControl;
        _this._dateIOService = _dateIOService;
        _this._dateNavigationService = _dateNavigationService;
        _this._datepickerEnabledService = _datepickerEnabledService;
        _this.dateFormControlService = dateFormControlService;
        _this.platformId = platformId;
        _this._subscriptions = [];
        _this.previousOutputInitializedFlag = false;
        _this.initialLoad = true;
        _this._dateUpdated = new core.EventEmitter(false);
        return _this;
    }
    ClrDateInput.prototype.initializePreviousOutput = function (dayModel) {
        if (!this.previousOutputInitializedFlag) {
            this.previousOutput = dayModel;
            this.previousOutputInitializedFlag = true;
        }
    };
    ClrDateInput.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        if (!this.container) {
            this.populateContainerServices();
        }
        this.initializeSubscriptions();
        this.processInitialInputs();
    };
    ClrDateInput.prototype.processInitialInputs = function () {
        this.processUserDateObject(this.dateValueOnInitialLoad);
        if (this._ngControl && this._ngControl.value) {
            this.updateInputValue(this._ngControl.value);
            this.initializePreviousOutput(this._dateNavigationService.selectedDay);
        }
    };
    ClrDateInput.prototype.ngAfterViewInit = function () {
        if (this._dateNavigationService) {
            var selDay = this._dateNavigationService.selectedDay;
            if (selDay) {
                var dateStr = this._dateIOService.toLocaleDisplayFormatString(selDay.toDate());
                this.writeDateStrToInputField(dateStr);
            }
        }
        this.initialLoad = false;
    };
    ClrDateInput.prototype.ngOnDestroy = function () {
        this._subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    ClrDateInput.prototype.populateContainerServices = function () {
        this._dateIOService = this.getProviderFromContainer(DateIOService);
        this._dateNavigationService = this.getProviderFromContainer(DateNavigationService);
        this._datepickerEnabledService = this.getProviderFromContainer(DatepickerEnabledService);
        this.dateFormControlService = this.getProviderFromContainer(DateFormControlService);
    };
    ClrDateInput.prototype.writeDateStrToInputField = function (value) {
        this.renderer.setProperty(this.elRef.nativeElement, 'value', value);
    };
    Object.defineProperty(ClrDateInput.prototype, "date", {
        set: function (value) {
            if (this.initialLoad) {
                this.dateValueOnInitialLoad = value;
            }
            else {
                this.processUserDateObject(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    ClrDateInput.prototype.processUserDateObject = function (value) {
        if (this._dateIOService) {
            var dateStr = this._dateIOService.toLocaleDisplayFormatString(value);
            this.updateInputValue(dateStr);
        }
    };
    ClrDateInput.prototype.updateInputValue = function (dateStr) {
        var date = this._dateIOService.isValidInput(dateStr);
        if (date) {
            var dayModel = new DayModel(date.getFullYear(), date.getMonth(), date.getDate());
            if (!dayModel.isEqual(this._dateNavigationService.selectedDay)) {
                this._dateNavigationService.selectedDay = dayModel;
                this.writeDateStrToInputField(dateStr);
            }
        }
        else {
            this._dateNavigationService.selectedDay = null;
        }
    };
    Object.defineProperty(ClrDateInput.prototype, "placeholderText", {
        get: function () {
            return this.placeholder ? this.placeholder : this._dateIOService.placeholderText;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDateInput.prototype, "inputType", {
        get: function () {
            return common.isPlatformBrowser(this.platformId) && this._datepickerEnabledService.isEnabled ? 'text' : 'date';
        },
        enumerable: true,
        configurable: true
    });
    ClrDateInput.prototype.emitDateOutput = function (dayModel) {
        if (dayModel && !dayModel.isEqual(this.previousOutput)) {
            this._dateUpdated.emit(dayModel.toDate());
            this.previousOutput = dayModel;
        }
        else if (!dayModel && this.previousOutput) {
            this._dateUpdated.emit(null);
            this.previousOutput = null;
        }
    };
    ClrDateInput.prototype.onValueChange = function (target) {
        var value = target.value;
        var date = this._dateIOService.isValidInput(value);
        if (date) {
            var dayModel = new DayModel(date.getFullYear(), date.getMonth(), date.getDate());
            this._dateNavigationService.selectedDay = dayModel;
            this.emitDateOutput(dayModel);
        }
        else {
            this._dateNavigationService.selectedDay = null;
            this.emitDateOutput(null);
        }
    };
    ClrDateInput.prototype.initializeSubscriptions = function () {
        var _this = this;
        if (this._dateNavigationService && this._dateIOService) {
            this._subscriptions.push(this._dateNavigationService.selectedDayChange.subscribe(function (dayModel) {
                var dateStr = _this._dateIOService.toLocaleDisplayFormatString(dayModel.toDate());
                _this.writeDateStrToInputField(dateStr);
                if (_this._ngControl) {
                    _this._ngControl.control.setValue(dateStr);
                }
                _this.emitDateOutput(dayModel);
            }));
            if (this._ngControl) {
                this._subscriptions.push(this._ngControl.valueChanges.subscribe(function (value) {
                    var date = _this._dateIOService.isValidInput(value);
                    if (date) {
                        var dayModel = new DayModel(date.getFullYear(), date.getMonth(), date.getDate());
                        _this._dateNavigationService.selectedDay = dayModel;
                        _this.initializePreviousOutput(dayModel);
                    }
                    else {
                        _this.initializePreviousOutput(null);
                    }
                }));
            }
        }
        if (this.dateFormControlService) {
            this._subscriptions.push(this.dateFormControlService.touchedChange.subscribe(function () {
                if (_this._ngControl) {
                    _this._ngControl.control.markAsTouched();
                }
            }));
            this._subscriptions.push(this.dateFormControlService.dirtyChange.subscribe(function () {
                if (_this._ngControl) {
                    _this._ngControl.control.markAsDirty();
                }
            }));
        }
    };
    return ClrDateInput;
}(WrappedFormControl));
ClrDateInput.decorators = [
    { type: core.Directive, args: [{ selector: '[clrDate]', host: { '[class.date-input]': 'true' } },] },
];
ClrDateInput.ctorParameters = function () { return [
    { type: ClrDateContainer, decorators: [{ type: core.Optional },] },
    { type: core.ViewContainerRef, },
    { type: core.ElementRef, },
    { type: core.Renderer2, },
    { type: forms.NgControl, decorators: [{ type: core.Self }, { type: core.Optional },] },
    { type: DateIOService, decorators: [{ type: core.Optional },] },
    { type: DateNavigationService, decorators: [{ type: core.Optional },] },
    { type: DatepickerEnabledService, decorators: [{ type: core.Optional },] },
    { type: DateFormControlService, decorators: [{ type: core.Optional },] },
    { type: Object, decorators: [{ type: core.Inject, args: [core.PLATFORM_ID,] },] },
]; };
ClrDateInput.propDecorators = {
    "date": [{ type: core.Input, args: ['clrDate',] },],
    "placeholder": [{ type: core.Input },],
    "placeholderText": [{ type: core.HostBinding, args: ['attr.placeholder',] },],
    "inputType": [{ type: core.HostBinding, args: ['attr.type',] },],
    "_dateUpdated": [{ type: core.Output, args: ['clrDateChange',] },],
    "onValueChange": [{ type: core.HostListener, args: ['change', ['$event.target'],] },],
};
var AbstractPopover = /** @class */ (function () {
    function AbstractPopover(injector, parentHost) {
        var _this = this;
        this.parentHost = parentHost;
        this.updateAnchor = false;
        this.popoverOptions = {};
        this.closeOnOutsideClick = false;
        this.el = injector.get(core.ElementRef);
        this.ifOpenService = injector.get(IfOpenService);
        this.renderer = injector.get(core.Renderer2);
        this.anchorElem = parentHost.nativeElement;
        this.popoverInstance = new Popover(this.el.nativeElement);
        this.subscription = this.ifOpenService.openChange.subscribe(function (change) {
            if (change) {
                _this.anchor();
                _this.attachESCListener();
            }
            else {
                _this.release();
                _this.detachESCListener();
            }
        });
        if (this.ifOpenService.open) {
            this.anchor();
            this.attachESCListener();
        }
    }
    AbstractPopover.prototype.anchor = function () {
        this.updateAnchor = true;
        this.ignore = this.ifOpenService.originalEvent;
    };
    AbstractPopover.prototype.release = function () {
        this.detachOutsideClickListener();
        this.popoverInstance.release();
    };
    AbstractPopover.prototype.ngAfterViewChecked = function () {
        var _this = this;
        if (this.updateAnchor) {
            this.updateAnchor = false;
            this.popoverInstance
                .anchor(this.anchorElem, this.anchorPoint, this.popoverPoint, this.popoverOptions)
                .subscribe(function () {
                _this.ifOpenService.open = false;
            });
            this.attachOutsideClickListener();
        }
    };
    AbstractPopover.prototype.ngOnDestroy = function () {
        this.release();
        this.detachESCListener();
        this.subscription.unsubscribe();
    };
    Object.defineProperty(AbstractPopover.prototype, "isOffScreen", {
        get: function () {
            return this.ifOpenService.open ? false : true;
        },
        enumerable: true,
        configurable: true
    });
    AbstractPopover.prototype.attachESCListener = function () {
        var _this = this;
        this.documentESCListener = this.renderer.listen('document', 'keydown', function (event) {
            if (event && event.keyCode === ESC) {
                _this.ifOpenService.open = false;
            }
        });
    };
    AbstractPopover.prototype.detachESCListener = function () {
        if (this.documentESCListener) {
            this.documentESCListener();
            delete this.documentESCListener;
        }
    };
    AbstractPopover.prototype.attachOutsideClickListener = function () {
        var _this = this;
        if (this.closeOnOutsideClick) {
            this.hostClickListener = this.renderer.listen(this.el.nativeElement, 'click', function (event) { return (_this.ignore = event); });
            if (this.ignoredElement) {
                this.ignoredElementClickListener = this.renderer.listen(this.ignoredElement, 'click', function (event) { return (_this.ignore = event); });
            }
            this.documentClickListener = this.renderer.listen('document', 'click', function (event) {
                if (event === _this.ignore) {
                    delete _this.ignore;
                }
                else {
                    _this.ifOpenService.open = false;
                }
            });
        }
    };
    AbstractPopover.prototype.detachOutsideClickListener = function () {
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
    return AbstractPopover;
}());
AbstractPopover.decorators = [
    { type: core.Injectable },
];
AbstractPopover.ctorParameters = function () { return [
    { type: core.Injector, },
    { type: core.ElementRef, decorators: [{ type: core.SkipSelf },] },
]; };
AbstractPopover.propDecorators = {
    "isOffScreen": [{ type: core.HostBinding, args: ['class.is-off-screen',] },],
};
var ViewManagerService = /** @class */ (function () {
    function ViewManagerService() {
        this._currentView = "DAYVIEW";
    }
    Object.defineProperty(ViewManagerService.prototype, "isDayView", {
        get: function () {
            return this._currentView === "DAYVIEW";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewManagerService.prototype, "isYearView", {
        get: function () {
            return this._currentView === "YEARVIEW";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewManagerService.prototype, "isMonthView", {
        get: function () {
            return this._currentView === "MONTHVIEW";
        },
        enumerable: true,
        configurable: true
    });
    ViewManagerService.prototype.changeToMonthView = function () {
        this._currentView = "MONTHVIEW";
    };
    ViewManagerService.prototype.changeToYearView = function () {
        this._currentView = "YEARVIEW";
    };
    ViewManagerService.prototype.changeToDayView = function () {
        this._currentView = "DAYVIEW";
    };
    return ViewManagerService;
}());
ViewManagerService.decorators = [
    { type: core.Injectable },
];
var ClrDatepickerViewManager = /** @class */ (function (_super) {
    __extends(ClrDatepickerViewManager, _super);
    function ClrDatepickerViewManager(parent, _injector, _viewManagerService) {
        var _this = _super.call(this, _injector, parent) || this;
        _this._viewManagerService = _viewManagerService;
        _this.configurePopover();
        return _this;
    }
    ClrDatepickerViewManager.prototype.configurePopover = function () {
        this.anchorPoint = Point.BOTTOM_LEFT;
        this.popoverPoint = Point.LEFT_TOP;
        this.closeOnOutsideClick = true;
    };
    Object.defineProperty(ClrDatepickerViewManager.prototype, "isMonthView", {
        get: function () {
            return this._viewManagerService.isMonthView;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatepickerViewManager.prototype, "isYearView", {
        get: function () {
            return this._viewManagerService.isYearView;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatepickerViewManager.prototype, "isDayView", {
        get: function () {
            return this._viewManagerService.isDayView;
        },
        enumerable: true,
        configurable: true
    });
    return ClrDatepickerViewManager;
}(AbstractPopover));
ClrDatepickerViewManager.decorators = [
    { type: core.Component, args: [{
                selector: 'clr-datepicker-view-manager',
                template: "<!--\n* Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.\n* This software is released under MIT license.\n* The full license information can be found in LICENSE in the root directory of this project.\n-->\n\n<clr-monthpicker *ngIf=\"isMonthView\"></clr-monthpicker>\n<clr-yearpicker *ngIf=\"isYearView\"></clr-yearpicker>\n<clr-daypicker *ngIf=\"isDayView\"></clr-daypicker>\n",
                providers: [ViewManagerService, DatepickerFocusService],
                host: { '[class.datepicker]': 'true' },
            },] },
];
ClrDatepickerViewManager.ctorParameters = function () { return [
    { type: core.ElementRef, decorators: [{ type: core.SkipSelf },] },
    { type: core.Injector, },
    { type: ViewManagerService, },
]; };
var ClrDay = /** @class */ (function () {
    function ClrDay(_dateNavigationService, _ifOpenService, dateFormControlService) {
        this._dateNavigationService = _dateNavigationService;
        this._ifOpenService = _ifOpenService;
        this.dateFormControlService = dateFormControlService;
    }
    ClrDay.prototype.onDayViewFocus = function () {
        this._dateNavigationService.focusedDay = this.dayView.dayModel;
    };
    ClrDay.prototype.selectDay = function () {
        var day = this.dayView.dayModel;
        this._dateNavigationService.notifySelectedDayChanged(day);
        this.dateFormControlService.markAsDirty();
        this._ifOpenService.open = false;
    };
    return ClrDay;
}());
ClrDay.decorators = [
    { type: core.Component, args: [{
                selector: 'clr-day',
                template: "\n        <button\n            class=\"day-btn\"\n            type=\"button\"\n            [class.is-today]=\"dayView.isTodaysDate\"\n            [class.is-disabled]=\"dayView.isDisabled\"\n            [class.is-selected]=\"dayView.isSelected\"\n            [attr.tabindex]=\"dayView.tabIndex\"\n            (click)=\"selectDay()\"\n            (focus)=\"onDayViewFocus()\">\n            {{dayView.dayModel.date}}\n        </button>\n    ",
                host: { '[class.day]': 'true' },
            },] },
];
ClrDay.ctorParameters = function () { return [
    { type: DateNavigationService, },
    { type: IfOpenService, },
    { type: DateFormControlService, },
]; };
ClrDay.propDecorators = {
    "dayView": [{ type: core.Input, args: ['clrDayView',] },],
};
var ClrDaypicker = /** @class */ (function () {
    function ClrDaypicker(_viewManagerService, _dateNavigationService, _localeHelperService) {
        this._viewManagerService = _viewManagerService;
        this._dateNavigationService = _dateNavigationService;
        this._localeHelperService = _localeHelperService;
    }
    ClrDaypicker.prototype.changeToMonthView = function () {
        this._viewManagerService.changeToMonthView();
    };
    ClrDaypicker.prototype.changeToYearView = function () {
        this._viewManagerService.changeToYearView();
    };
    Object.defineProperty(ClrDaypicker.prototype, "calendarMonth", {
        get: function () {
            return this._localeHelperService.localeMonthsAbbreviated[this._dateNavigationService.displayedCalendar.month];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDaypicker.prototype, "calendarYear", {
        get: function () {
            return this._dateNavigationService.displayedCalendar.year;
        },
        enumerable: true,
        configurable: true
    });
    ClrDaypicker.prototype.nextMonth = function () {
        this._dateNavigationService.moveToNextMonth();
    };
    ClrDaypicker.prototype.previousMonth = function () {
        this._dateNavigationService.moveToPreviousMonth();
    };
    ClrDaypicker.prototype.currentMonth = function () {
        this._dateNavigationService.moveToCurrentMonth();
    };
    return ClrDaypicker;
}());
ClrDaypicker.decorators = [
    { type: core.Component, args: [{ selector: 'clr-daypicker', template: "<div class=\"calendar-header\">\n    <div class=\"calendar-pickers\">\n        <button class=\"calendar-btn monthpicker-trigger\" type=\"button\" (click)=\"changeToMonthView()\">\n            {{calendarMonth}}\n        </button>\n        <button class=\"calendar-btn yearpicker-trigger\" type=\"button\" (click)=\"changeToYearView()\">\n            {{calendarYear}}\n        </button>\n    </div>\n    <div class=\"calendar-switchers\">\n        <button class=\"calendar-btn switcher\" type=\"button\" (click)=\"previousMonth()\">\n            <clr-icon shape=\"angle\" dir=\"left\"></clr-icon>\n        </button>\n        <button class=\"calendar-btn switcher\" type=\"button\" (click)=\"currentMonth()\">\n            <clr-icon shape=\"event\"></clr-icon>\n        </button>\n        <button class=\"calendar-btn switcher\" type=\"button\" (click)=\"nextMonth()\">\n            <clr-icon shape=\"angle\" dir=\"right\"></clr-icon>\n        </button>\n    </div>\n</div>\n<clr-calendar></clr-calendar>\n", host: { '[class.daypicker]': 'true' } },] },
];
ClrDaypicker.ctorParameters = function () { return [
    { type: ViewManagerService, },
    { type: DateNavigationService, },
    { type: LocaleHelperService, },
]; };
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
        get: function () {
            return this._localeHelperService.localeMonthsWide;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrMonthpicker.prototype, "calendarMonthIndex", {
        get: function () {
            return this._dateNavigationService.displayedCalendar.month;
        },
        enumerable: true,
        configurable: true
    });
    ClrMonthpicker.prototype.changeMonth = function (monthIndex) {
        this._dateNavigationService.changeMonth(monthIndex);
        this._viewManagerService.changeToDayView();
    };
    ClrMonthpicker.prototype.getTabIndex = function (monthIndex) {
        return monthIndex === this._focusedMonthIndex ? 0 : -1;
    };
    ClrMonthpicker.prototype.onKeyDown = function (event) {
        if (event) {
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
    ClrMonthpicker.prototype.ngAfterViewInit = function () {
        this._datepickerFocusService.focusCell(this._elRef);
    };
    return ClrMonthpicker;
}());
ClrMonthpicker.decorators = [
    { type: core.Component, args: [{
                selector: 'clr-monthpicker',
                template: "\n        <button\n            type=\"button\"\n            class=\"calendar-btn month\"\n            *ngFor=\"let month of monthNames; let monthIndex = index\"\n            (click)=\"changeMonth(monthIndex)\"\n            [class.is-selected]=\"monthIndex === calendarMonthIndex\"\n            [attr.tabindex]=\"getTabIndex(monthIndex)\">\n            {{month}}\n        </button>\n    ",
                host: {
                    '[class.monthpicker]': 'true',
                },
            },] },
];
ClrMonthpicker.ctorParameters = function () { return [
    { type: ViewManagerService, },
    { type: LocaleHelperService, },
    { type: DateNavigationService, },
    { type: DatepickerFocusService, },
    { type: core.ElementRef, },
]; };
ClrMonthpicker.propDecorators = {
    "onKeyDown": [{ type: core.HostListener, args: ['keydown', ['$event'],] },],
};
var YEARS_TO_DISPLAY = 10;
var YearRangeModel = /** @class */ (function () {
    function YearRangeModel(year) {
        this.year = year;
        this.yearRange = [];
        this.generateYearRange();
    }
    Object.defineProperty(YearRangeModel.prototype, "middleYear", {
        get: function () {
            return this.yearRange[Math.floor(this.yearRange.length / 2)];
        },
        enumerable: true,
        configurable: true
    });
    YearRangeModel.prototype.generateYearRange = function () {
        var remainder = this.year % YEARS_TO_DISPLAY;
        var floor = this.year - remainder;
        var ceil = floor + YEARS_TO_DISPLAY;
        this.yearRange = this.generateRange(floor, ceil);
    };
    YearRangeModel.prototype.generateRange = function (floor, ceil) {
        return Array.from({ length: ceil - floor }, function (v, k) { return k + floor; });
    };
    YearRangeModel.prototype.nextDecade = function () {
        return new YearRangeModel(this.year + 10);
    };
    YearRangeModel.prototype.previousDecade = function () {
        return new YearRangeModel(this.year - 10);
    };
    YearRangeModel.prototype.currentDecade = function () {
        return new YearRangeModel(new Date().getFullYear());
    };
    YearRangeModel.prototype.inRange = function (value) {
        return this.yearRange.indexOf(value) > -1;
    };
    return YearRangeModel;
}());
var ClrYearpicker = /** @class */ (function () {
    function ClrYearpicker(_dateNavigationService, _viewManagerService, _datepickerFocusService, _elRef) {
        this._dateNavigationService = _dateNavigationService;
        this._viewManagerService = _viewManagerService;
        this._datepickerFocusService = _datepickerFocusService;
        this._elRef = _elRef;
        this.yearRangeModel = new YearRangeModel(this.calendarYear);
        this._focusedYear = this.calendarYear;
    }
    Object.defineProperty(ClrYearpicker.prototype, "calendarYear", {
        get: function () {
            return this._dateNavigationService.displayedCalendar.year;
        },
        enumerable: true,
        configurable: true
    });
    ClrYearpicker.prototype.incrementFocusYearBy = function (value) {
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
    ClrYearpicker.prototype.changeYear = function (year) {
        this._dateNavigationService.changeYear(year);
        this._viewManagerService.changeToDayView();
    };
    ClrYearpicker.prototype.previousDecade = function () {
        this.yearRangeModel = this.yearRangeModel.previousDecade();
    };
    ClrYearpicker.prototype.currentDecade = function () {
        if (!this.yearRangeModel.inRange(this._dateNavigationService.today.year)) {
            this.yearRangeModel = this.yearRangeModel.currentDecade();
        }
        this._datepickerFocusService.focusCell(this._elRef);
    };
    ClrYearpicker.prototype.nextDecade = function () {
        this.yearRangeModel = this.yearRangeModel.nextDecade();
    };
    ClrYearpicker.prototype.getTabIndex = function (year) {
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
    ClrYearpicker.prototype.onKeyDown = function (event) {
        if (event) {
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
    ClrYearpicker.prototype.ngAfterViewInit = function () {
        this._datepickerFocusService.focusCell(this._elRef);
    };
    return ClrYearpicker;
}());
ClrYearpicker.decorators = [
    { type: core.Component, args: [{
                selector: 'clr-yearpicker',
                template: "\n        <div class=\"year-switchers\">\n            <button class=\"calendar-btn switcher\" type=\"button\" (click)=\"previousDecade()\">\n                <clr-icon shape=\"angle\" dir=\"left\"></clr-icon>\n            </button>\n            <button class=\"calendar-btn switcher\" type=\"button\" (click)=\"currentDecade()\">\n                <clr-icon shape=\"event\"></clr-icon>\n            </button>\n            <button class=\"calendar-btn switcher\" type=\"button\" (click)=\"nextDecade()\">\n                <clr-icon shape=\"angle\" dir=\"right\"></clr-icon>\n            </button>\n        </div>\n        <div class=\"years\">\n            <button\n                *ngFor=\"let year of yearRangeModel.yearRange\"\n                type=\"button\"\n                class=\"calendar-btn year\"\n                [attr.tabindex]=\"getTabIndex(year)\"\n                [class.is-selected]=\"year === calendarYear\"\n                (click)=\"changeYear(year)\">\n                {{year}}\n            </button>\n        </div>\n    ",
                host: {
                    '[class.yearpicker]': 'true',
                },
            },] },
];
ClrYearpicker.ctorParameters = function () { return [
    { type: DateNavigationService, },
    { type: ViewManagerService, },
    { type: DatepickerFocusService, },
    { type: core.ElementRef, },
]; };
ClrYearpicker.propDecorators = {
    "onKeyDown": [{ type: core.HostListener, args: ['keydown', ['$event'],] },],
};
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
    return ClrDatepickerModule;
}());
ClrDatepickerModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [common.CommonModule, ClrHostWrappingModule, ClrConditionalModule, ClrIconModule, ClrFocusTrapModule],
                declarations: [CLR_DATEPICKER_DIRECTIVES],
                exports: [CLR_DATEPICKER_DIRECTIVES],
                entryComponents: [ClrDateContainer],
            },] },
];
var latestId = 0;
var ClrCheckboxDeprecated = /** @class */ (function () {
    function ClrCheckboxDeprecated() {
        this._id = (latestId++).toString();
        this.clrAriaLabeledBy = null;
        this.name = null;
        this.disabled = false;
        this.inline = false;
        this._checked = false;
        this._indeterminate = false;
        this.indeterminateChange = new core.EventEmitter(false);
        this.change = new core.EventEmitter(false);
        this.onChangeCallback = function (_) { };
        this.onTouchedCallback = function () { };
    }
    Object.defineProperty(ClrCheckboxDeprecated.prototype, "id", {
        get: function () {
            return "clr-checkbox-" + this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrCheckboxDeprecated.prototype, "checked", {
        get: function () {
            return this._checked;
        },
        set: function (value) {
            if (value !== this._checked) {
                if (this._indeterminate) {
                    this.setIndeterminate(false);
                }
                this.setChecked(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrCheckboxDeprecated.prototype, "indeterminate", {
        get: function () {
            return this._indeterminate;
        },
        set: function (value) {
            if (this._indeterminate !== value) {
                if (this._checked) {
                    this.setChecked(false);
                }
                this.setIndeterminate(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    ClrCheckboxDeprecated.prototype.setIndeterminate = function (value) {
        this._indeterminate = value;
        this.indeterminateChange.emit(this._indeterminate);
    };
    ClrCheckboxDeprecated.prototype.setChecked = function (value) {
        this._checked = value;
        this.change.emit(this._checked);
    };
    ClrCheckboxDeprecated.prototype.toggle = function () {
        this.checked = !this.checked;
        this.onChangeCallback(this.checked);
    };
    ClrCheckboxDeprecated.prototype.writeValue = function (value) {
        if (value === null) {
            value = false;
        }
        if (value !== this.checked) {
            this.checked = value;
        }
    };
    ClrCheckboxDeprecated.prototype.registerOnChange = function (onChange) {
        this.onChangeCallback = onChange;
    };
    ClrCheckboxDeprecated.prototype.registerOnTouched = function (onTouched) {
        this.onTouchedCallback = onTouched;
    };
    ClrCheckboxDeprecated.prototype.touch = function () {
        this.onTouchedCallback();
    };
    ClrCheckboxDeprecated.prototype.checkIndeterminateState = function () {
        if (!this.disabled) {
            this.toggle();
        }
    };
    return ClrCheckboxDeprecated;
}());
ClrCheckboxDeprecated.decorators = [
    { type: core.Component, args: [{
                selector: 'clr-checkbox',
                template: "\n        <!--\n            FIXME: We are not subscribed to the change event but the click event here.\n            The reason for that is because checkboxes behave differently on IE & Edge.\n            https://stackoverflow.com/a/19447939\n            \n            To fix that, we listen to every click event and then toggle the checkbox manually\n            to make it behave the same way across the browsers we support.\n            \n            This works for cases when users toggle the checkbox using the keyboard too:\n            https://stackoverflow.com/questions/27878940/spacebar-triggering-click-event-on-checkbox\n        -->\n        <input type=\"checkbox\" [attr.aria-labelledby]=\"clrAriaLabeledBy\"\n               [id]=\"id\" [name]=\"name\" [checked]=\"checked\"\n               [indeterminate]=\"indeterminate\" [disabled]=\"disabled\"\n               (blur)=\"touch()\" (click)=\"checkIndeterminateState()\">\n        <label [attr.for]=\"id\">\n            <ng-content></ng-content>\n        </label>\n    ",
                host: { '[class.checkbox]': '!inline', '[class.checkbox-inline]': 'inline', '[class.disabled]': 'disabled' },
                providers: [{ provide: forms.NG_VALUE_ACCESSOR, useExisting: core.forwardRef(function () { return ClrCheckboxDeprecated; }), multi: true }],
            },] },
];
ClrCheckboxDeprecated.propDecorators = {
    "_id": [{ type: core.Input, args: ['id',] },],
    "clrAriaLabeledBy": [{ type: core.Input, args: ['clrAriaLabeledBy',] },],
    "name": [{ type: core.Input, args: ['name',] },],
    "disabled": [{ type: core.Input, args: ['clrDisabled',] },],
    "inline": [{ type: core.Input, args: ['clrInline',] },],
    "checked": [{ type: core.Input, args: ['clrChecked',] },],
    "indeterminate": [{ type: core.Input, args: ['clrIndeterminate',] },],
    "indeterminateChange": [{ type: core.Output, args: ['clrIndeterminateChange',] },],
    "change": [{ type: core.Output, args: ['clrCheckedChange',] },],
};
var CLR_CHECKBOX_DIRECTIVES = [ClrCheckboxDeprecated];
var ClrCheckboxModule = /** @class */ (function () {
    function ClrCheckboxModule() {
    }
    return ClrCheckboxModule;
}());
ClrCheckboxModule.decorators = [
    { type: core.NgModule, args: [{ imports: [common.CommonModule], declarations: [CLR_CHECKBOX_DIRECTIVES], exports: [CLR_CHECKBOX_DIRECTIVES] },] },
];
var Checkbox = ClrCheckboxDeprecated;
var ClrCheckbox = ClrCheckboxDeprecated;
var CHECKBOX_DIRECTIVES = CLR_CHECKBOX_DIRECTIVES;
var ClrFormsModule = /** @class */ (function () {
    function ClrFormsModule() {
    }
    return ClrFormsModule;
}());
ClrFormsModule.decorators = [
    { type: core.NgModule, args: [{ imports: [common.CommonModule], exports: [ClrCheckboxModule, ClrDatepickerModule] },] },
];
var Expand = /** @class */ (function () {
    function Expand() {
        this.expandable = 0;
        this.replace = false;
        this._loading = false;
        this._expanded = false;
        this._animate = new rxjs.Subject();
        this._expandChange = new rxjs.Subject();
    }
    Object.defineProperty(Expand.prototype, "loading", {
        get: function () {
            return this._loading;
        },
        set: function (value) {
            value = !!value;
            if (value !== this._loading) {
                this._loading = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Expand.prototype, "expanded", {
        get: function () {
            return this._expanded;
        },
        set: function (value) {
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
    Object.defineProperty(Expand.prototype, "animate", {
        get: function () {
            return this._animate.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Expand.prototype, "expandChange", {
        get: function () {
            return this._expandChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Expand.prototype.loadingStateChange = function (state$$1) {
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
    return Expand;
}());
Expand.decorators = [
    { type: core.Injectable },
];
var IfExpanded = /** @class */ (function () {
    function IfExpanded(template, container, expand) {
        var _this = this;
        this.template = template;
        this.container = container;
        this.expand = expand;
        this._expanded = false;
        this.expandedChange = new core.EventEmitter(true);
        this._subscriptions = [];
        expand.expandable++;
        this._subscriptions.push(expand.expandChange.subscribe(function () {
            _this.updateView();
            _this.expandedChange.emit(_this.expand.expanded);
        }));
    }
    Object.defineProperty(IfExpanded.prototype, "expanded", {
        get: function () {
            return this._expanded;
        },
        set: function (value) {
            if (typeof value === 'boolean') {
                this.expand.expanded = value;
                this._expanded = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    IfExpanded.prototype.updateView = function () {
        if (this.expand.expanded && this.container.length !== 0) {
            return;
        }
        if (this.expand.expanded) {
            this.container.createEmbeddedView(this.template);
        }
        else {
            this.container.clear();
        }
    };
    IfExpanded.prototype.ngOnInit = function () {
        this.updateView();
    };
    IfExpanded.prototype.ngOnDestroy = function () {
        this.expand.expandable--;
        this._subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    return IfExpanded;
}());
IfExpanded.decorators = [
    { type: core.Directive, args: [{ selector: '[clrIfExpanded]' },] },
];
IfExpanded.ctorParameters = function () { return [
    { type: core.TemplateRef, },
    { type: core.ViewContainerRef, },
    { type: Expand, },
]; };
IfExpanded.propDecorators = {
    "expanded": [{ type: core.Input, args: ['clrIfExpanded',] },],
    "expandedChange": [{ type: core.Output, args: ['clrIfExpandedChange',] },],
};
var EXPAND_DIRECTIVES = [IfExpanded];
var ClrIfExpandModule = /** @class */ (function () {
    function ClrIfExpandModule() {
    }
    return ClrIfExpandModule;
}());
ClrIfExpandModule.decorators = [
    { type: core.NgModule, args: [{ imports: [common.CommonModule], declarations: [EXPAND_DIRECTIVES], exports: [EXPAND_DIRECTIVES] },] },
];
var OutsideClick = /** @class */ (function () {
    function OutsideClick(el) {
        this.el = el;
        this.strict = false;
        this.outsideClick = new core.EventEmitter(false);
    }
    OutsideClick.prototype.documentClick = function (event) {
        var target = event.target;
        var host = this.el.nativeElement;
        if (target === host) {
            return;
        }
        if (!this.strict && host.contains(target)) {
            return;
        }
        this.outsideClick.emit(event);
    };
    return OutsideClick;
}());
OutsideClick.decorators = [
    { type: core.Directive, args: [{ selector: '[clrOutsideClick]' },] },
];
OutsideClick.ctorParameters = function () { return [
    { type: core.ElementRef, },
]; };
OutsideClick.propDecorators = {
    "strict": [{ type: core.Input, args: ['clrStrict',] },],
    "outsideClick": [{ type: core.Output, args: ['clrOutsideClick',] },],
    "documentClick": [{ type: core.HostListener, args: ['document:click', ['$event'],] },],
};
var OUSTIDE_CLICK_DIRECTIVES = [OutsideClick];
var ClrOutsideClickModule = /** @class */ (function () {
    function ClrOutsideClickModule() {
    }
    return ClrOutsideClickModule;
}());
ClrOutsideClickModule.decorators = [
    { type: core.NgModule, args: [{ imports: [common.CommonModule], declarations: [OUSTIDE_CLICK_DIRECTIVES], exports: [OUSTIDE_CLICK_DIRECTIVES] },] },
];
var DomAdapter = /** @class */ (function () {
    function DomAdapter() {
    }
    DomAdapter.prototype.userDefinedWidth = function (element) {
        element.classList.add('datagrid-cell-width-zero');
        var userDefinedWidth = parseInt(getComputedStyle(element).getPropertyValue('width'), 10);
        element.classList.remove('datagrid-cell-width-zero');
        return userDefinedWidth;
    };
    DomAdapter.prototype.scrollBarWidth = function (element) {
        return element.offsetWidth - element.clientWidth;
    };
    DomAdapter.prototype.scrollWidth = function (element) {
        return element.scrollWidth || 0;
    };
    DomAdapter.prototype.computedHeight = function (element) {
        return parseInt(getComputedStyle(element).getPropertyValue('height'), 10);
    };
    DomAdapter.prototype.clientRectHeight = function (element) {
        return parseInt(element.getBoundingClientRect().height, 10);
    };
    DomAdapter.prototype.clientRectRight = function (element) {
        return parseInt(element.getBoundingClientRect().right, 10);
    };
    DomAdapter.prototype.clientRectWidth = function (element) {
        return parseInt(element.getBoundingClientRect().width, 10);
    };
    DomAdapter.prototype.minWidth = function (element) {
        return parseInt(getComputedStyle(element).getPropertyValue('min-width'), 10);
    };
    DomAdapter.prototype.focus = function (element) {
        element.focus();
    };
    return DomAdapter;
}());
DomAdapter.decorators = [
    { type: core.Injectable },
];
var DatagridRenderOrganizer = /** @class */ (function () {
    function DatagridRenderOrganizer() {
        this.alreadySized = false;
        this.widths = [];
        this._noLayout = new rxjs.Subject();
        this._clearWidths = new rxjs.Subject();
        this._detectStrictWidths = new rxjs.Subject();
        this._tableMode = new rxjs.Subject();
        this._computeWidths = new rxjs.Subject();
        this._alignColumns = new rxjs.Subject();
        this.scrollbar = new rxjs.Subject();
        this.scrollbarWidth = new rxjs.Subject();
        this._done = new rxjs.Subject();
    }
    Object.defineProperty(DatagridRenderOrganizer.prototype, "noLayout", {
        get: function () {
            return this._noLayout.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatagridRenderOrganizer.prototype, "clearWidths", {
        get: function () {
            return this._clearWidths.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatagridRenderOrganizer.prototype, "detectStrictWidths", {
        get: function () {
            return this._detectStrictWidths.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatagridRenderOrganizer.prototype, "tableMode", {
        get: function () {
            return this._tableMode.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatagridRenderOrganizer.prototype, "computeWidths", {
        get: function () {
            return this._computeWidths.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatagridRenderOrganizer.prototype, "alignColumns", {
        get: function () {
            return this._alignColumns.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatagridRenderOrganizer.prototype, "done", {
        get: function () {
            return this._done.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    DatagridRenderOrganizer.prototype.resize = function () {
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
    };
    return DatagridRenderOrganizer;
}());
DatagridRenderOrganizer.decorators = [
    { type: core.Injectable },
];
var DatagridRowExpandAnimation = /** @class */ (function () {
    function DatagridRowExpandAnimation(el, domAdapter, renderer, expand, renderOrganizer) {
        var _this = this;
        this.el = el;
        this.domAdapter = domAdapter;
        this.renderer = renderer;
        this.expand = expand;
        this.renderOrganizer = renderOrganizer;
        if (expand && expand.animate) {
            expand.animate.subscribe(function () {
                if (_this.oldHeight) {
                    setTimeout(function () { return _this.run(); });
                }
                else {
                    _this.animate();
                }
            });
        }
    }
    DatagridRowExpandAnimation.prototype.animate = function () {
        var _this = this;
        if (!this.el.nativeElement.animate) {
            return;
        }
        if (this.running) {
            this.running.finish();
        }
        this.oldHeight = this.domAdapter.computedHeight(this.el.nativeElement);
        this.renderer.setStyle(this.el.nativeElement, 'height', this.oldHeight + 'px');
        this.renderer.setStyle(this.el.nativeElement, 'overflow-y', 'hidden');
        setTimeout(function () {
            if (_this.expand.loading) {
                return;
            }
            _this.run();
        });
    };
    DatagridRowExpandAnimation.prototype.run = function () {
        var _this = this;
        this.renderer.setStyle(this.el.nativeElement, 'height', null);
        this.renderOrganizer.scrollbar.next();
        var newHeight = this.domAdapter.computedHeight(this.el.nativeElement);
        this.running = this.el.nativeElement.animate({ height: [this.oldHeight + 'px', newHeight + 'px'], overflowY: ['hidden', 'hidden'], easing: 'ease-in-out' }, { duration: 200 });
        this.running.onfinish = function () {
            _this.renderer.setStyle(_this.el.nativeElement, 'overflow-y', null);
            delete _this.running;
        };
        delete this.oldHeight;
    };
    return DatagridRowExpandAnimation;
}());
DatagridRowExpandAnimation.decorators = [
    { type: core.Directive, args: [{ selector: 'clr-dg-row' },] },
];
DatagridRowExpandAnimation.ctorParameters = function () { return [
    { type: core.ElementRef, },
    { type: DomAdapter, },
    { type: core.Renderer2, },
    { type: Expand, },
    { type: DatagridRenderOrganizer, },
]; };
var CustomFilter = /** @class */ (function () {
    function CustomFilter() {
    }
    return CustomFilter;
}());
var StateDebouncer = /** @class */ (function () {
    function StateDebouncer() {
        this._change = new rxjs.Subject();
        this.nbChanges = 0;
    }
    Object.defineProperty(StateDebouncer.prototype, "change", {
        get: function () {
            return this._change.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    StateDebouncer.prototype.changeStart = function () {
        this.nbChanges++;
    };
    StateDebouncer.prototype.changeDone = function () {
        if (--this.nbChanges === 0) {
            this._change.next();
        }
    };
    return StateDebouncer;
}());
StateDebouncer.decorators = [
    { type: core.Injectable },
];
var Page = /** @class */ (function () {
    function Page(stateDebouncer) {
        this.stateDebouncer = stateDebouncer;
        this._size = 0;
        this._totalItems = 0;
        this._change = new rxjs.Subject();
        this._sizeChange = new rxjs.Subject();
        this._current = 1;
    }
    Object.defineProperty(Page.prototype, "size", {
        get: function () {
            return this._size;
        },
        set: function (size) {
            var oldSize = this._size;
            if (size !== oldSize) {
                this._size = size;
                if (size === 0) {
                    this._current = 1;
                }
                else {
                    this._current = Math.floor(oldSize / size * (this._current - 1)) + 1;
                }
                this._change.next(this._current);
                this._sizeChange.next(this._size);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Page.prototype, "totalItems", {
        get: function () {
            return this._totalItems;
        },
        set: function (total) {
            this._totalItems = total;
            if (this.current > this.last) {
                this.current = this.last;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Page.prototype, "last", {
        get: function () {
            if (this._last) {
                return this._last;
            }
            if (this.size > 0 && this.totalItems) {
                return Math.ceil(this.totalItems / this.size);
            }
            return 1;
        },
        set: function (page) {
            this._last = page;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Page.prototype, "change", {
        get: function () {
            return this._change.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Page.prototype, "sizeChange", {
        get: function () {
            return this._sizeChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Page.prototype, "current", {
        get: function () {
            return this._current;
        },
        set: function (page) {
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
    Page.prototype.previous = function () {
        if (this.current > 1) {
            this.current--;
        }
    };
    Page.prototype.next = function () {
        if (this.current < this.last) {
            this.current++;
        }
    };
    Object.defineProperty(Page.prototype, "firstItem", {
        get: function () {
            if (this.size === 0) {
                return 0;
            }
            return (this.current - 1) * this.size;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Page.prototype, "lastItem", {
        get: function () {
            if (this.size === 0) {
                return this.totalItems - 1;
            }
            var lastInPage = this.current * this.size - 1;
            if (this.totalItems) {
                lastInPage = Math.min(lastInPage, this.totalItems - 1);
            }
            return lastInPage;
        },
        enumerable: true,
        configurable: true
    });
    Page.prototype.resetPageSize = function () {
        this.size = 0;
    };
    return Page;
}());
Page.decorators = [
    { type: core.Injectable },
];
Page.ctorParameters = function () { return [
    { type: StateDebouncer, },
]; };
var FiltersProvider = /** @class */ (function () {
    function FiltersProvider(_page, stateDebouncer) {
        this._page = _page;
        this.stateDebouncer = stateDebouncer;
        this._change = new rxjs.Subject();
        this._all = [];
    }
    Object.defineProperty(FiltersProvider.prototype, "change", {
        get: function () {
            return this._change.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    FiltersProvider.prototype.hasActiveFilters = function () {
        try {
            for (var _a = __values(this._all), _b = _a.next(); !_b.done; _b = _a.next()) {
                var filter$$1 = _b.value.filter;
                if (filter$$1 && filter$$1.isActive()) {
                    return true;
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return false;
        var e_2, _c;
    };
    FiltersProvider.prototype.getActiveFilters = function () {
        var ret = [];
        try {
            for (var _a = __values(this._all), _b = _a.next(); !_b.done; _b = _a.next()) {
                var filter$$1 = _b.value.filter;
                if (filter$$1 && filter$$1.isActive()) {
                    ret.push(filter$$1);
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return ret;
        var e_3, _c;
    };
    FiltersProvider.prototype.add = function (filter$$1) {
        var _this = this;
        var index = this._all.length;
        var subscription = filter$$1.changes.subscribe(function () { return _this.resetPageAndEmitFilterChange([filter$$1]); });
        var hasUnregistered = false;
        var registered = new RegisteredFilter(filter$$1, function () {
            if (hasUnregistered) {
                return;
            }
            subscription.unsubscribe();
            _this._all.splice(index, 1);
            if (filter$$1.isActive()) {
                _this.resetPageAndEmitFilterChange([]);
            }
            hasUnregistered = true;
        });
        this._all.push(registered);
        if (filter$$1.isActive()) {
            this.resetPageAndEmitFilterChange([filter$$1]);
        }
        return registered;
    };
    FiltersProvider.prototype.accepts = function (item) {
        try {
            for (var _a = __values(this._all), _b = _a.next(); !_b.done; _b = _a.next()) {
                var filter$$1 = _b.value.filter;
                if (filter$$1 && filter$$1.isActive() && !filter$$1.accepts(item)) {
                    return false;
                }
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return true;
        var e_4, _c;
    };
    FiltersProvider.prototype.resetPageAndEmitFilterChange = function (filters) {
        this.stateDebouncer.changeStart();
        this._page.current = 1;
        this._change.next(filters);
        this.stateDebouncer.changeDone();
    };
    return FiltersProvider;
}());
FiltersProvider.decorators = [
    { type: core.Injectable },
];
FiltersProvider.ctorParameters = function () { return [
    { type: Page, },
    { type: StateDebouncer, },
]; };
var RegisteredFilter = /** @class */ (function () {
    function RegisteredFilter(filter$$1, unregister) {
        this.filter = filter$$1;
        this.unregister = unregister;
    }
    return RegisteredFilter;
}());
var DatagridFilterRegistrar = /** @class */ (function () {
    function DatagridFilterRegistrar(filters) {
        this.filters = filters;
    }
    Object.defineProperty(DatagridFilterRegistrar.prototype, "filter", {
        get: function () {
            return this.registered && this.registered.filter;
        },
        enumerable: true,
        configurable: true
    });
    DatagridFilterRegistrar.prototype.setFilter = function (filter$$1) {
        this.deleteFilter();
        if (filter$$1 instanceof RegisteredFilter) {
            this.registered = (filter$$1);
        }
        else if (filter$$1) {
            this.registered = this.filters.add((filter$$1));
        }
    };
    DatagridFilterRegistrar.prototype.deleteFilter = function () {
        if (this.registered) {
            this.registered.unregister();
            delete this.registered;
        }
    };
    DatagridFilterRegistrar.prototype.ngOnDestroy = function () {
        this.deleteFilter();
    };
    return DatagridFilterRegistrar;
}());
var ClrDatagridFilter = /** @class */ (function (_super) {
    __extends(ClrDatagridFilter, _super);
    function ClrDatagridFilter(_filters) {
        var _this = _super.call(this, _filters) || this;
        _this.anchorPoint = Point.RIGHT_BOTTOM;
        _this.popoverPoint = Point.RIGHT_TOP;
        _this.popoverOptions = { allowMultipleOpen: true };
        _this._open = false;
        _this.openChanged = new core.EventEmitter(false);
        return _this;
    }
    Object.defineProperty(ClrDatagridFilter.prototype, "open", {
        get: function () {
            return this._open;
        },
        set: function (open) {
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
        set: function (filter$$1) {
            this.setFilter(filter$$1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridFilter.prototype, "active", {
        get: function () {
            return !!this.filter && this.filter.isActive();
        },
        enumerable: true,
        configurable: true
    });
    ClrDatagridFilter.prototype.toggle = function () {
        this.open = !this.open;
    };
    return ClrDatagridFilter;
}(DatagridFilterRegistrar));
ClrDatagridFilter.decorators = [
    { type: core.Component, args: [{
                selector: 'clr-dg-filter',
                providers: [{ provide: CustomFilter, useExisting: ClrDatagridFilter }],
                template: "\n        <button #anchor class=\"datagrid-filter-toggle\" (click)=\"toggle()\"\n            [class.datagrid-filter-open]=\"open\" [class.datagrid-filtered]=\"active\"\n            type=\"button\"></button>\n\n        <ng-template [(clrPopoverOld)]=\"open\" [clrPopoverOldAnchor]=\"anchor\" [clrPopoverOldAnchorPoint]=\"anchorPoint\"\n             [clrPopoverOldPopoverPoint]=\"popoverPoint\" [clrPopoverOldOptions]=\"popoverOptions\">\n            <div class=\"datagrid-filter\">\n                <!-- FIXME: this whole filter part needs a final design before we can try to have a cleaner DOM -->\n                <div class=\"datagrid-filter-close-wrapper\">\n                    <button type=\"button\" class=\"close\" \n                        aria-label=\"Close\" (click)=\"open = false\"\n                        type=\"button\">\n                        <clr-icon aria-hidden=\"true\" shape=\"close\"></clr-icon>\n                    </button>\n                </div>\n    \n                <ng-content></ng-content>\n            </div>\n        </ng-template>\n    ",
            },] },
];
ClrDatagridFilter.ctorParameters = function () { return [
    { type: FiltersProvider, },
]; };
ClrDatagridFilter.propDecorators = {
    "open": [{ type: core.Input, args: ['clrDgFilterOpen',] },],
    "openChanged": [{ type: core.Output, args: ['clrDgFilterOpenChange',] },],
    "customFilter": [{ type: core.Input, args: ['clrDgFilter',] },],
};
var DatagridStringFilterImpl = /** @class */ (function () {
    function DatagridStringFilterImpl(filterFn) {
        this.filterFn = filterFn;
        this._changes = new rxjs.Subject();
        this._rawValue = '';
        this._lowerCaseValue = '';
    }
    Object.defineProperty(DatagridStringFilterImpl.prototype, "changes", {
        get: function () {
            return this._changes.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatagridStringFilterImpl.prototype, "value", {
        get: function () {
            return this._rawValue;
        },
        set: function (value) {
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
        get: function () {
            return this._lowerCaseValue;
        },
        enumerable: true,
        configurable: true
    });
    DatagridStringFilterImpl.prototype.isActive = function () {
        return !!this.value;
    };
    DatagridStringFilterImpl.prototype.accepts = function (item) {
        return this.filterFn.accepts(item, this.lowerCaseValue);
    };
    return DatagridStringFilterImpl;
}());
var DatagridStringFilter = /** @class */ (function (_super) {
    __extends(DatagridStringFilter, _super);
    function DatagridStringFilter(filters, domAdapter) {
        var _this = _super.call(this, filters) || this;
        _this.domAdapter = domAdapter;
        _this.open = false;
        _this.filterValueChange = new core.EventEmitter();
        return _this;
    }
    Object.defineProperty(DatagridStringFilter.prototype, "customStringFilter", {
        set: function (value) {
            if (value instanceof RegisteredFilter) {
                this.setFilter(value);
            }
            else {
                this.setFilter(new DatagridStringFilterImpl((value)));
            }
        },
        enumerable: true,
        configurable: true
    });
    DatagridStringFilter.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.filterContainer.openChanged.subscribe(function (open) {
            if (open) {
                setTimeout(function () {
                    _this.domAdapter.focus(_this.input.nativeElement);
                });
            }
        });
    };
    Object.defineProperty(DatagridStringFilter.prototype, "value", {
        get: function () {
            return this.filter.value;
        },
        set: function (value) {
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
    DatagridStringFilter.prototype.close = function () {
        this.open = false;
    };
    return DatagridStringFilter;
}(DatagridFilterRegistrar));
DatagridStringFilter.decorators = [
    { type: core.Component, args: [{
                selector: 'clr-dg-string-filter',
                providers: [{ provide: CustomFilter, useExisting: DatagridStringFilter }],
                template: "\n        <clr-dg-filter [clrDgFilter]=\"registered\" [(clrDgFilterOpen)]=\"open\">\n            <!--\n                Even though this *ngIf looks useless because the filter container already has one,\n                it prevents NgControlStatus and other directives automatically added by Angular\n                on inputs with NgModel from freaking out because of their host binding changing\n                mid-change detection when the input is destroyed.\n            -->\n            <input #input type=\"text\" name=\"search\" [(ngModel)]=\"value\" *ngIf=\"open\"\n                (keyup.enter)=\"close()\" (keyup.escape)=\"close()\"/>\n        </clr-dg-filter>\n    ",
            },] },
];
DatagridStringFilter.ctorParameters = function () { return [
    { type: FiltersProvider, },
    { type: DomAdapter, },
]; };
DatagridStringFilter.propDecorators = {
    "customStringFilter": [{ type: core.Input, args: ['clrDgStringFilter',] },],
    "input": [{ type: core.ViewChild, args: ['input',] },],
    "filterContainer": [{ type: core.ViewChild, args: [ClrDatagridFilter,] },],
    "value": [{ type: core.Input, args: ['clrFilterValue',] },],
    "filterValueChange": [{ type: core.Output, args: ['clrFilterValueChange',] },],
};
var OompaLoompa = /** @class */ (function () {
    function OompaLoompa(cdr, willyWonka) {
        var _this = this;
        this.subscription = willyWonka.chocolate.subscribe(function () {
            if (_this.latestFlavor !== _this.flavor) {
                cdr.detectChanges();
            }
        });
    }
    OompaLoompa.prototype.ngAfterContentChecked = function () {
        this.latestFlavor = this.flavor;
    };
    OompaLoompa.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    return OompaLoompa;
}());
var RowActionService = /** @class */ (function () {
    function RowActionService() {
        this.actionableCount = 0;
    }
    RowActionService.prototype.register = function () {
        this.actionableCount++;
    };
    RowActionService.prototype.unregister = function () {
        this.actionableCount--;
    };
    Object.defineProperty(RowActionService.prototype, "hasActionableRow", {
        get: function () {
            return this.actionableCount > 0;
        },
        enumerable: true,
        configurable: true
    });
    return RowActionService;
}());
RowActionService.decorators = [
    { type: core.Injectable },
];
var WillyWonka = /** @class */ (function () {
    function WillyWonka() {
        this._chocolate = new rxjs.Subject();
    }
    Object.defineProperty(WillyWonka.prototype, "chocolate", {
        get: function () {
            return this._chocolate.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    WillyWonka.prototype.ngAfterViewChecked = function () {
        this._chocolate.next();
    };
    return WillyWonka;
}());
var DatagridWillyWonka = /** @class */ (function (_super) {
    __extends(DatagridWillyWonka, _super);
    function DatagridWillyWonka() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DatagridWillyWonka;
}(WillyWonka));
DatagridWillyWonka.decorators = [
    { type: core.Directive, args: [{ selector: 'clr-datagrid' },] },
];
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
        get: function () {
            return this.rowActions.hasActionableRow;
        },
        enumerable: true,
        configurable: true
    });
    return ActionableOompaLoompa;
}(OompaLoompa));
ActionableOompaLoompa.decorators = [
    { type: core.Directive, args: [{ selector: 'clr-datagrid, clr-dg-row' },] },
];
ActionableOompaLoompa.ctorParameters = function () { return [
    { type: core.ChangeDetectorRef, },
    { type: DatagridWillyWonka, decorators: [{ type: core.Optional },] },
    { type: RowActionService, },
]; };
var ExpandableRowsCount = /** @class */ (function () {
    function ExpandableRowsCount() {
        this.expandableCount = 0;
    }
    ExpandableRowsCount.prototype.register = function () {
        this.expandableCount++;
    };
    ExpandableRowsCount.prototype.unregister = function () {
        this.expandableCount--;
    };
    Object.defineProperty(ExpandableRowsCount.prototype, "hasExpandableRow", {
        get: function () {
            return this.expandableCount > 0;
        },
        enumerable: true,
        configurable: true
    });
    return ExpandableRowsCount;
}());
ExpandableRowsCount.decorators = [
    { type: core.Injectable },
];
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
        get: function () {
            return this.expandableCount.hasExpandableRow;
        },
        enumerable: true,
        configurable: true
    });
    return ExpandableOompaLoompa;
}(OompaLoompa));
ExpandableOompaLoompa.decorators = [
    { type: core.Directive, args: [{ selector: 'clr-datagrid, clr-dg-row' },] },
];
ExpandableOompaLoompa.ctorParameters = function () { return [
    { type: core.ChangeDetectorRef, },
    { type: DatagridWillyWonka, decorators: [{ type: core.Optional },] },
    { type: ExpandableRowsCount, },
]; };
var NestedProperty = /** @class */ (function () {
    function NestedProperty(prop) {
        this.prop = prop;
        if (prop.indexOf('.') >= 0) {
            this.splitProp = prop.split('.');
        }
    }
    NestedProperty.prototype.getPropValue = function (item) {
        if (this.splitProp) {
            var value = item;
            try {
                for (var _a = __values(this.splitProp), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var nestedProp = _b.value;
                    if (value == null || typeof value === 'undefined' || typeof value[nestedProp] === 'undefined') {
                        return undefined;
                    }
                    value = value[nestedProp];
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_5) throw e_5.error; }
            }
            return value;
        }
        else {
            return item[this.prop];
        }
        var e_5, _c;
    };
    return NestedProperty;
}());
var DatagridPropertyComparator = /** @class */ (function () {
    function DatagridPropertyComparator(prop) {
        this.prop = prop;
        this.nestedProp = new NestedProperty(prop);
    }
    DatagridPropertyComparator.prototype.compare = function (a, b) {
        var propA = this.nestedProp.getPropValue(a);
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
var DatagridPropertyStringFilter = /** @class */ (function () {
    function DatagridPropertyStringFilter(prop, exact) {
        if (exact === void 0) { exact = false; }
        this.prop = prop;
        this.exact = exact;
        this.nestedProp = new NestedProperty(prop);
    }
    DatagridPropertyStringFilter.prototype.accepts = function (item, search) {
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
var ClrDatagridSortOrder = {
    UNSORTED: 0,
    ASC: 1,
    DESC: -1,
};
ClrDatagridSortOrder[ClrDatagridSortOrder.UNSORTED] = "UNSORTED";
ClrDatagridSortOrder[ClrDatagridSortOrder.ASC] = "ASC";
ClrDatagridSortOrder[ClrDatagridSortOrder.DESC] = "DESC";
var DragDispatcher = /** @class */ (function () {
    function DragDispatcher(_ngZone, _renderer) {
        this._ngZone = _ngZone;
        this._renderer = _renderer;
        this._onDragStart = new rxjs.Subject();
        this._onDragMove = new rxjs.Subject();
        this._onDragEnd = new rxjs.Subject();
    }
    Object.defineProperty(DragDispatcher.prototype, "onDragStart", {
        get: function () {
            return this._onDragStart;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DragDispatcher.prototype, "onDragMove", {
        get: function () {
            return this._onDragMove;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DragDispatcher.prototype, "onDragEnd", {
        get: function () {
            return this._onDragEnd;
        },
        enumerable: true,
        configurable: true
    });
    DragDispatcher.prototype.addDragListener = function () {
        var handleEl = this.handleRef.nativeElement;
        this._listeners = [
            this.customDragEvent(handleEl, 'mousedown', 'mousemove', 'mouseup'),
            this.customDragEvent(handleEl, 'touchstart', 'touchmove', 'touchend'),
        ];
    };
    DragDispatcher.prototype.customDragEvent = function (element, startOnEvent, moveOnEvent, endOnEvent) {
        var _this = this;
        var dragMoveListener;
        var dragEndListener;
        return this._renderer.listen(element, startOnEvent, function (startEvent) {
            _this.notifyDragStart(startEvent);
            dragMoveListener = _this._ngZone.runOutsideAngular(function () {
                return _this._renderer.listen('document', moveOnEvent, function (moveEvent) {
                    _this.notifyDragMove(moveEvent);
                });
            });
            dragEndListener = _this._renderer.listen('document', endOnEvent, function (endEvent) {
                dragMoveListener();
                _this.notifyDragEnd(endEvent);
                dragEndListener();
            });
        });
    };
    DragDispatcher.prototype.notifyDragStart = function (event) {
        return this._onDragStart.next(event);
    };
    DragDispatcher.prototype.notifyDragMove = function (event) {
        return this._onDragMove.next(event);
    };
    DragDispatcher.prototype.notifyDragEnd = function (event) {
        return this._onDragEnd.next(event);
    };
    DragDispatcher.prototype.destroy = function () {
        if (this._listeners) {
            this._listeners.map(function (event) { return event(); });
        }
    };
    return DragDispatcher;
}());
DragDispatcher.decorators = [
    { type: core.Injectable },
];
DragDispatcher.ctorParameters = function () { return [
    { type: core.NgZone, },
    { type: core.Renderer2, },
]; };
var Sort = /** @class */ (function () {
    function Sort(stateDebouncer) {
        this.stateDebouncer = stateDebouncer;
        this._reverse = false;
        this._change = new rxjs.Subject();
    }
    Object.defineProperty(Sort.prototype, "comparator", {
        get: function () {
            return this._comparator;
        },
        set: function (value) {
            this.stateDebouncer.changeStart();
            this._comparator = value;
            this.emitChange();
            this.stateDebouncer.changeDone();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sort.prototype, "reverse", {
        get: function () {
            return this._reverse;
        },
        set: function (value) {
            this.stateDebouncer.changeStart();
            this._reverse = value;
            this.emitChange();
            this.stateDebouncer.changeDone();
        },
        enumerable: true,
        configurable: true
    });
    Sort.prototype.emitChange = function () {
        this._change.next(this);
    };
    Object.defineProperty(Sort.prototype, "change", {
        get: function () {
            return this._change.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Sort.prototype.toggle = function (sortBy, forceReverse) {
        this.stateDebouncer.changeStart();
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
    Sort.prototype.clear = function () {
        this.comparator = null;
    };
    Sort.prototype.compare = function (a, b) {
        return (this.reverse ? -1 : 1) * this.comparator.compare(a, b);
    };
    return Sort;
}());
Sort.decorators = [
    { type: core.Injectable },
];
Sort.ctorParameters = function () { return [
    { type: StateDebouncer, },
]; };
var nbCount = 0;
var ClrDatagridColumn = /** @class */ (function (_super) {
    __extends(ClrDatagridColumn, _super);
    function ClrDatagridColumn(_sort, filters, _dragDispatcher) {
        var _this = _super.call(this, filters) || this;
        _this._sort = _sort;
        _this._dragDispatcher = _dragDispatcher;
        _this._sorted = false;
        _this.sortedChange = new core.EventEmitter();
        _this._sortOrder = ClrDatagridSortOrder.UNSORTED;
        _this.sortOrderChange = new core.EventEmitter();
        _this.customFilter = false;
        _this.filterValueChange = new core.EventEmitter();
        _this._sortSubscription = _sort.change.subscribe(function (sort) {
            if (_this.sortOrder !== ClrDatagridSortOrder.UNSORTED && sort.comparator !== _this._sortBy) {
                _this._sortOrder = ClrDatagridSortOrder.UNSORTED;
                _this.sortOrderChange.emit(_this._sortOrder);
            }
            if (_this.sorted && sort.comparator !== _this._sortBy) {
                _this._sorted = false;
                _this.sortedChange.emit(false);
            }
        });
        _this.columnId = 'dg-col-' + nbCount.toString();
        nbCount++;
        return _this;
    }
    Object.defineProperty(ClrDatagridColumn.prototype, "hidden", {
        get: function () {
            return !!this.hideable && this.hideable.hidden;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridColumn.prototype, "handleElRef", {
        set: function (value) {
            this._dragDispatcher.handleRef = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridColumn.prototype, "handleTrackerElRef", {
        set: function (value) {
            this._dragDispatcher.handleTrackerRef = value;
        },
        enumerable: true,
        configurable: true
    });
    ClrDatagridColumn.prototype.ngOnDestroy = function () {
        this._sortSubscription.unsubscribe();
    };
    Object.defineProperty(ClrDatagridColumn.prototype, "field", {
        get: function () {
            return this._field;
        },
        set: function (field) {
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
        get: function () {
            return this._sortBy;
        },
        set: function (comparator) {
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
        get: function () {
            return !!this._sortBy;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridColumn.prototype, "sorted", {
        get: function () {
            return this._sorted;
        },
        set: function (value) {
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
        get: function () {
            return this._sortOrder;
        },
        set: function (value) {
            if (typeof value === 'undefined') {
                return;
            }
            if (this._sortOrder === value) {
                return;
            }
            switch (value) {
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
    ClrDatagridColumn.prototype.sort = function (reverse) {
        if (!this.sortable) {
            return;
        }
        this._sort.toggle(this._sortBy, reverse);
        this._sortOrder = this._sort.reverse ? ClrDatagridSortOrder.DESC : ClrDatagridSortOrder.ASC;
        this.sortOrderChange.emit(this._sortOrder);
        this._sorted = true;
        this.sortedChange.emit(true);
    };
    Object.defineProperty(ClrDatagridColumn.prototype, "asc", {
        get: function () {
            if (typeof this.sortOrder === 'undefined') {
                return this.sorted && !this._sort.reverse;
            }
            else {
                return this.sortOrder === ClrDatagridSortOrder.ASC;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridColumn.prototype, "desc", {
        get: function () {
            if (typeof this.sortOrder === 'undefined') {
                return this.sorted && this._sort.reverse;
            }
            else {
                return this.sortOrder === ClrDatagridSortOrder.DESC;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridColumn.prototype, "projectedFilter", {
        set: function (custom) {
            if (custom) {
                this.deleteFilter();
                this.customFilter = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridColumn.prototype, "filterValue", {
        get: function () {
            return this.filter.value;
        },
        set: function (newValue) {
            this.updateFilterValue = newValue;
            this.filterValueChange.emit(this.filter.value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridColumn.prototype, "updateFilterValue", {
        set: function (newValue) {
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
    return ClrDatagridColumn;
}(DatagridFilterRegistrar));
ClrDatagridColumn.decorators = [
    { type: core.Component, args: [{
                selector: 'clr-dg-column',
                template: "\n        <div class=\"datagrid-column-flex\">\n            <!-- I'm really not happy with that select since it's not very scalable -->\n            <ng-content select=\"clr-dg-filter, clr-dg-string-filter\"></ng-content>\n\n            <clr-dg-string-filter\n                    *ngIf=\"field && !customFilter\"\n                    [clrDgStringFilter]=\"registered\"\n                    [(clrFilterValue)]=\"filterValue\"></clr-dg-string-filter>\n\n            <ng-template #columnTitle><ng-content></ng-content></ng-template>\n\n            <button class=\"datagrid-column-title\" *ngIf=\"sortable\" (click)=\"sort()\" type=\"button\">\n               <ng-container *ngTemplateOutlet=\"columnTitle\"></ng-container>\n            </button>\n\n            <span class=\"datagrid-column-title\" *ngIf=\"!sortable\">\n               <ng-container *ngTemplateOutlet=\"columnTitle\"></ng-container>\n            </span>\n\n            <div class=\"datagrid-column-separator\">\n                <button #columnHandle class=\"datagrid-column-handle\" tabindex=\"-1\" type=\"button\"></button>\n                <div #columnHandleTracker class=\"datagrid-column-handle-tracker\"></div>\n            </div>\n        </div>\n    ",
                host: { '[class.datagrid-column]': 'true', '[class.datagrid-column--hidden]': 'hidden' },
            },] },
];
ClrDatagridColumn.ctorParameters = function () { return [
    { type: Sort, },
    { type: FiltersProvider, },
    { type: DragDispatcher, },
]; };
ClrDatagridColumn.propDecorators = {
    "handleElRef": [{ type: core.ViewChild, args: ['columnHandle',] },],
    "handleTrackerElRef": [{ type: core.ViewChild, args: ['columnHandleTracker',] },],
    "field": [{ type: core.Input, args: ['clrDgField',] },],
    "sortBy": [{ type: core.Input, args: ['clrDgSortBy',] },],
    "sorted": [{ type: core.Input, args: ['clrDgSorted',] },],
    "sortedChange": [{ type: core.Output, args: ['clrDgSortedChange',] },],
    "sortOrder": [{ type: core.Input, args: ['clrDgSortOrder',] },],
    "sortOrderChange": [{ type: core.Output, args: ['clrDgSortOrderChange',] },],
    "asc": [{ type: core.HostBinding, args: ['class.asc',] },],
    "desc": [{ type: core.HostBinding, args: ['class.desc',] },],
    "projectedFilter": [{ type: core.ContentChild, args: [CustomFilter,] },],
    "updateFilterValue": [{ type: core.Input, args: ['clrFilterValue',] },],
    "filterValueChange": [{ type: core.Output, args: ['clrFilterValueChange',] },],
};
var Items = /** @class */ (function () {
    function Items(_filters, _sort, _page) {
        this._filters = _filters;
        this._sort = _sort;
        this._page = _page;
        this.loading = false;
        this.trackBy = function (index, item) { return item; };
        this._smart = false;
        this._displayed = [];
        this._change = new rxjs.Subject();
        this._allChanges = new rxjs.Subject();
    }
    Items.prototype.destroy = function () {
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
        get: function () {
            return this._smart;
        },
        enumerable: true,
        configurable: true
    });
    Items.prototype.smartenUp = function () {
        var _this = this;
        this._smart = true;
        this._filtersSub = this._filters.change.subscribe(function () { return _this._filterItems(); });
        this._sortSub = this._sort.change.subscribe(function () {
            if (!_this._sort.comparator) {
                _this._filterItems();
            }
            else {
                _this._sortItems();
            }
        });
        this._pageSub = this._page.change.subscribe(function () { return _this._changePage(); });
    };
    Object.defineProperty(Items.prototype, "all", {
        get: function () {
            return this._all;
        },
        set: function (items) {
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
    Items.prototype.refresh = function () {
        if (this.smart) {
            this._filterItems();
        }
    };
    Object.defineProperty(Items.prototype, "displayed", {
        get: function () {
            return this._displayed;
        },
        enumerable: true,
        configurable: true
    });
    Items.prototype.emitChange = function () {
        this._change.next(this.displayed);
    };
    Object.defineProperty(Items.prototype, "change", {
        get: function () {
            return this._change.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Items.prototype.emitAllChanges = function (items) {
        this._allChanges.next(items);
    };
    Object.defineProperty(Items.prototype, "allChanges", {
        get: function () {
            return this._allChanges.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Items.prototype, "uninitialized", {
        get: function () {
            return !this._all;
        },
        enumerable: true,
        configurable: true
    });
    Items.prototype._filterItems = function () {
        var _this = this;
        if (this.uninitialized) {
            return;
        }
        if (this._filters.hasActiveFilters()) {
            this._filtered = this._all.filter(function (item) { return _this._filters.accepts(item); });
        }
        else {
            this._filtered = this._all.slice();
        }
        this._page.totalItems = this._filtered.length;
        this._sortItems();
    };
    Items.prototype._sortItems = function () {
        var _this = this;
        if (this.uninitialized) {
            return;
        }
        if (this._sort.comparator) {
            this._filtered.sort(function (a, b) { return _this._sort.compare(a, b); });
        }
        this._changePage();
    };
    Items.prototype._changePage = function () {
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
    };
    return Items;
}());
Items.decorators = [
    { type: core.Injectable },
];
Items.ctorParameters = function () { return [
    { type: FiltersProvider, },
    { type: Sort, },
    { type: Page, },
]; };
var ClrDatagridItems = /** @class */ (function () {
    function ClrDatagridItems(template, _differs, _items) {
        this.template = template;
        this._differs = _differs;
        this._items = _items;
        _items.smartenUp();
    }
    Object.defineProperty(ClrDatagridItems.prototype, "rawItems", {
        set: function (items) {
            this._rawItems = items ? items : [];
        },
        enumerable: true,
        configurable: true
    });
    ClrDatagridItems.prototype.ngOnChanges = function (changes) {
        if ('rawItems' in changes) {
            var currentItems = changes["rawItems"].currentValue;
            if (!this._differ && currentItems) {
                this._differ = this._differs.find(currentItems).create(this._items.trackBy);
            }
        }
    };
    Object.defineProperty(ClrDatagridItems.prototype, "trackBy", {
        set: function (value) {
            this._items.trackBy = value;
        },
        enumerable: true,
        configurable: true
    });
    ClrDatagridItems.prototype.ngDoCheck = function () {
        if (this._differ) {
            var changes = this._differ.diff(this._rawItems);
            if (changes) {
                this._items.all = this._rawItems;
            }
        }
    };
    return ClrDatagridItems;
}());
ClrDatagridItems.decorators = [
    { type: core.Directive, args: [{
                selector: '[clrDgItems][clrDgItemsOf]',
            },] },
];
ClrDatagridItems.ctorParameters = function () { return [
    { type: core.TemplateRef, },
    { type: core.IterableDiffers, },
    { type: Items, },
]; };
ClrDatagridItems.propDecorators = {
    "rawItems": [{ type: core.Input, args: ['clrDgItemsOf',] },],
    "trackBy": [{ type: core.Input, args: ['clrDgItemsTrackBy',] },],
};
var ClrDatagridPlaceholder = /** @class */ (function () {
    function ClrDatagridPlaceholder(items) {
        this.items = items;
    }
    Object.defineProperty(ClrDatagridPlaceholder.prototype, "emptyDatagrid", {
        get: function () {
            return !this.items.loading && (!this.items.displayed || this.items.displayed.length === 0);
        },
        enumerable: true,
        configurable: true
    });
    return ClrDatagridPlaceholder;
}());
ClrDatagridPlaceholder.decorators = [
    { type: core.Component, args: [{
                selector: 'clr-dg-placeholder',
                template: "\n        <div\n            class=\"datagrid-placeholder\"\n            [class.datagrid-empty]=\"emptyDatagrid\">\n                <div class=\"datagrid-placeholder-image\" *ngIf=\"emptyDatagrid\"></div>\n                <ng-content *ngIf=\"emptyDatagrid\"></ng-content>\n        </div>\n    ",
                host: { '[class.datagrid-placeholder-container]': 'true' },
            },] },
];
ClrDatagridPlaceholder.ctorParameters = function () { return [
    { type: Items, },
]; };
var POPOVER_HOST_ANCHOR = new core.InjectionToken('POPOVER_HOST_ANCHOR');
var ClrSignpostTrigger = /** @class */ (function () {
    function ClrSignpostTrigger(ifOpenService, renderer, el) {
        var _this = this;
        this.ifOpenService = ifOpenService;
        this.renderer = renderer;
        this.el = el;
        this.subscriptions = [];
        this.subscriptions.push(this.ifOpenService.openChange.subscribe(function (isOpen) {
            if (isOpen) {
                _this.renderer.addClass(_this.el.nativeElement, 'active');
            }
            else {
                _this.renderer.removeClass(_this.el.nativeElement, 'active');
            }
        }));
    }
    ClrSignpostTrigger.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    ClrSignpostTrigger.prototype.onSignpostTriggerClick = function (event) {
        this.ifOpenService.toggleWithEvent(event);
    };
    return ClrSignpostTrigger;
}());
ClrSignpostTrigger.decorators = [
    { type: core.Directive, args: [{ selector: '[clrSignpostTrigger]', host: { class: 'signpost-trigger' } },] },
];
ClrSignpostTrigger.ctorParameters = function () { return [
    { type: IfOpenService, },
    { type: core.Renderer2, },
    { type: core.ElementRef, },
]; };
ClrSignpostTrigger.propDecorators = {
    "onSignpostTriggerClick": [{ type: core.HostListener, args: ['click', ['$event'],] },],
};
var ClrSignpost = /** @class */ (function () {
    function ClrSignpost() {
        this.useCustomTrigger = false;
    }
    Object.defineProperty(ClrSignpost.prototype, "customTrigger", {
        set: function (trigger$$1) {
            this.useCustomTrigger = !!trigger$$1;
        },
        enumerable: true,
        configurable: true
    });
    return ClrSignpost;
}());
ClrSignpost.decorators = [
    { type: core.Component, args: [{
                selector: 'clr-signpost',
                template: "\n        <ng-container *ngIf=\"!useCustomTrigger\">\n            <button\n                type=\"button\"\n                class=\"signpost-action btn btn-small btn-link\"\n                clrSignpostTrigger>\n                <clr-icon shape=\"info\"></clr-icon>\n            </button>\n        </ng-container>\n        \n        <ng-content></ng-content>\n    ",
                host: { '[class.signpost]': 'true' },
                providers: [IfOpenService, { provide: POPOVER_HOST_ANCHOR, useExisting: core.ElementRef }],
            },] },
];
ClrSignpost.propDecorators = {
    "customTrigger": [{ type: core.ContentChild, args: [ClrSignpostTrigger,] },],
};
var HideableColumnService = /** @class */ (function () {
    function HideableColumnService() {
        this._columnList = [];
        this._columnListChange = new rxjs.BehaviorSubject(this._columnList);
    }
    Object.defineProperty(HideableColumnService.prototype, "canHideNextColumn", {
        get: function () {
            var hiddenColumns = this._columnList.filter(function (column) { return column !== undefined; }).filter(function (column) { return column.hidden; });
            return this._columnList.length - hiddenColumns.length > 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HideableColumnService.prototype, "checkForAllColumnsVisible", {
        get: function () {
            return !this._columnList.some(function (column) { return column && column.hidden; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HideableColumnService.prototype, "columnListChange", {
        get: function () {
            return this._columnListChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    HideableColumnService.prototype.getColumns = function () {
        return this._columnList;
    };
    HideableColumnService.prototype.showHiddenColumns = function () {
        this._columnList.forEach(function (column) {
            if (column && column.hidden === true) {
                column.hidden = false;
            }
            if (column && column.lastVisibleColumn) {
                column.lastVisibleColumn = false;
            }
        });
    };
    HideableColumnService.prototype.updateColumnList = function (columns) {
        this._columnList = columns;
        this.updateForLastVisibleColumn();
        this._columnListChange.next(this._columnList);
    };
    HideableColumnService.prototype.updateForLastVisibleColumn = function () {
        if (this.canHideNextColumn) {
            this._columnList.map(function (column) {
                if (column && column.lastVisibleColumn) {
                    column.lastVisibleColumn = false;
                }
            });
        }
        else {
            this._columnList.map(function (column) {
                if (column && !column.hidden) {
                    column.lastVisibleColumn = true;
                }
            });
        }
    };
    HideableColumnService.prototype.getColumnById = function (id) {
        if (id) {
            return this._columnList.find(function (column) { return column && column.id === id; });
        }
        return;
    };
    return HideableColumnService;
}());
HideableColumnService.decorators = [
    { type: core.Injectable },
];
var ClrDatagridCell = /** @class */ (function () {
    function ClrDatagridCell(hideableColumnService, _el, _renderer) {
        this.hideableColumnService = hideableColumnService;
        this._el = _el;
        this._renderer = _renderer;
    }
    Object.defineProperty(ClrDatagridCell.prototype, "id", {
        set: function (value) {
            this._id = value;
            this.mapHideableColumn(this._id);
        },
        enumerable: true,
        configurable: true
    });
    ClrDatagridCell.prototype.mapHideableColumn = function (columnId) {
        var _this = this;
        if (!columnId) {
            return;
        }
        var hideableColumn = this.hideableColumnService.getColumnById(this._id);
        this.setHiddenClass(hideableColumn.hidden);
        this.hiddenStateSubscription = hideableColumn.hiddenChangeState.subscribe(function () {
            _this.setHiddenClass(hideableColumn.hidden);
        });
    };
    ClrDatagridCell.prototype.setHiddenClass = function (hideableColumnValue) {
        if (hideableColumnValue) {
            this._renderer.addClass(this._el.nativeElement, 'datagrid-cell--hidden');
        }
        else {
            this._renderer.removeClass(this._el.nativeElement, 'datagrid-cell--hidden');
        }
    };
    ClrDatagridCell.prototype.ngOnDestroy = function () {
        if (this.hiddenStateSubscription) {
            this.hiddenStateSubscription.unsubscribe();
        }
    };
    return ClrDatagridCell;
}());
ClrDatagridCell.decorators = [
    { type: core.Component, args: [{
                selector: 'clr-dg-cell',
                template: "\n        <ng-content></ng-content>\n    ",
                host: { '[class.datagrid-cell]': 'true', '[class.datagrid-signpost-trigger]': 'signpost.length > 0' },
            },] },
];
ClrDatagridCell.ctorParameters = function () { return [
    { type: HideableColumnService, },
    { type: core.ElementRef, },
    { type: core.Renderer2, },
]; };
ClrDatagridCell.propDecorators = {
    "signpost": [{ type: core.ContentChildren, args: [ClrSignpost,] },],
};
var nbSelection = 0;
var SelectionType = {
    None: 0,
    Single: 1,
    Multi: 2,
};
SelectionType[SelectionType.None] = "None";
SelectionType[SelectionType.Single] = "Single";
SelectionType[SelectionType.Multi] = "Multi";
var Selection = /** @class */ (function () {
    function Selection(_items, _filters) {
        var _this = this;
        this._items = _items;
        this._filters = _filters;
        this.selected = [];
        this._selectionType = SelectionType.None;
        this.rowSelectionMode = false;
        this.debounce = false;
        this.subscriptions = [];
        this._change = new rxjs.Subject();
        this.id = 'clr-dg-selection' + nbSelection++;
        this.subscriptions.push(this._filters.change.subscribe(function () {
            if (!_this._selectable) {
                return;
            }
            _this.clearSelection();
        }));
        this.subscriptions.push(this._items.allChanges.subscribe(function (updatedItems) {
            if (!_this._selectable) {
                return;
            }
            var leftOver = _this.current.slice();
            var newSingle;
            var trackBy = _this._items.trackBy;
            var matched = [];
            updatedItems.forEach(function (item, index) {
                var ref = trackBy(index, item);
                if (_this.selectedSingle === ref) {
                    newSingle = item;
                }
                else if (_this.selected.length) {
                    var selectedIndex = _this.selected.indexOf(ref);
                    if (selectedIndex > -1) {
                        matched.push(selectedIndex);
                        leftOver[selectedIndex] = item;
                    }
                }
            });
            if (_this._items.smart) {
                leftOver = leftOver.filter(function (selected) { return updatedItems.indexOf(selected) > -1; });
            }
            setTimeout(function () {
                if (typeof newSingle !== 'undefined') {
                    _this.currentSingle = newSingle;
                }
                _this.current = leftOver;
            }, 0);
        }));
    }
    Selection.prototype.clearSelection = function () {
        this.current.length = 0;
        this.emitChange();
    };
    Object.defineProperty(Selection.prototype, "selectionType", {
        get: function () {
            return this._selectionType;
        },
        set: function (value) {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Selection.prototype, "_selectable", {
        get: function () {
            return this._selectionType === SelectionType.Multi || this._selectionType === SelectionType.Single;
        },
        enumerable: true,
        configurable: true
    });
    Selection.prototype.destroy = function () {
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    Object.defineProperty(Selection.prototype, "currentSingle", {
        get: function () {
            return this._currentSingle;
        },
        set: function (value) {
            var _this = this;
            if (value === this._currentSingle) {
                return;
            }
            this._currentSingle = value;
            if (this._items.all && this._items.trackBy && value) {
                var lookup = this._items.all.findIndex(function (maybe) { return maybe === value; });
                this.selectedSingle = this._items.trackBy(lookup, value);
            }
            this.emitChange();
            this.debounce = true;
            setTimeout(function () { return (_this.debounce = false); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Selection.prototype, "current", {
        get: function () {
            return this._current;
        },
        set: function (value) {
            var _this = this;
            this._current = value;
            this.emitChange();
            this.debounce = true;
            setTimeout(function () { return (_this.debounce = false); });
        },
        enumerable: true,
        configurable: true
    });
    Selection.prototype.emitChange = function () {
        if (this._selectionType === SelectionType.Single) {
            this._change.next(this.currentSingle);
        }
        else if (this._selectionType === SelectionType.Multi) {
            this._change.next(this.current);
        }
    };
    Object.defineProperty(Selection.prototype, "change", {
        get: function () {
            return this._change.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Selection.prototype.isSelected = function (item) {
        if (this._selectionType === SelectionType.Single) {
            return this.currentSingle === item;
        }
        else if (this._selectionType === SelectionType.Multi) {
            return this.current.indexOf(item) >= 0;
        }
        return false;
    };
    Selection.prototype.selectItem = function (item) {
        this.current.push(item);
        if (this._items.trackBy) {
            var lookup = this._items.all.findIndex(function (maybe) { return maybe === item; });
            this.selected.push(this._items.trackBy(lookup, item));
        }
    };
    Selection.prototype.deselectItem = function (indexOfItem) {
        this.current.splice(indexOfItem, 1);
        if (this._items.trackBy && indexOfItem < this.selected.length) {
            this.selected.splice(indexOfItem, 1);
        }
    };
    Selection.prototype.setSelected = function (item, selected) {
        switch (this._selectionType) {
            case SelectionType.None:
                break;
            case SelectionType.Single:
                break;
            case SelectionType.Multi:
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
    Selection.prototype.isAllSelected = function () {
        var _this = this;
        if (this._selectionType !== SelectionType.Multi || !this._items.displayed) {
            return false;
        }
        var displayedItems = this._items.displayed;
        var nbDisplayed = this._items.displayed.length;
        if (nbDisplayed < 1) {
            return false;
        }
        var temp = displayedItems.filter(function (item) { return _this.current.indexOf(item) > -1; });
        return temp.length === displayedItems.length;
    };
    Selection.prototype.toggleAll = function () {
        var _this = this;
        if (this._selectionType === SelectionType.None || this._selectionType === SelectionType.Single) {
            return;
        }
        if (this.isAllSelected()) {
            this._items.displayed.forEach(function (item, displayIndex) {
                var currentIndex = _this.current.indexOf(item);
                if (currentIndex > -1) {
                    _this.deselectItem(currentIndex);
                }
            });
        }
        else {
            this._items.displayed.forEach(function (item) {
                if (_this.current.indexOf(item) < 0) {
                    _this.selectItem(item);
                }
            });
        }
        this.emitChange();
    };
    return Selection;
}());
Selection.decorators = [
    { type: core.Injectable },
];
Selection.ctorParameters = function () { return [
    { type: Items, },
    { type: FiltersProvider, },
]; };
var nbRow = 0;
var ClrDatagridRow = /** @class */ (function () {
    function ClrDatagridRow(selection, rowActionService, globalExpandable, expand, hideableColumnService) {
        this.selection = selection;
        this.rowActionService = rowActionService;
        this.globalExpandable = globalExpandable;
        this.expand = expand;
        this.hideableColumnService = hideableColumnService;
        this.SELECTION_TYPE = SelectionType;
        this.ENTER_KEY_CODE = 13;
        this.SPACE_KEY_CODE = 32;
        this._selected = false;
        this.selectedChanged = new core.EventEmitter(false);
        this.expandedChange = new core.EventEmitter(false);
        this.id = 'clr-dg-row' + nbRow++;
        this.role = selection.rowSelectionMode ? 'button' : null;
    }
    Object.defineProperty(ClrDatagridRow.prototype, "selected", {
        get: function () {
            if (this.selection.selectionType === SelectionType.None) {
                return this._selected;
            }
            else {
                return this.selection.isSelected(this.item);
            }
        },
        set: function (value) {
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
    ClrDatagridRow.prototype.toggle = function (selected) {
        if (selected === void 0) { selected = !this.selected; }
        if (selected !== this.selected) {
            this.selected = selected;
            this.selectedChanged.emit(selected);
        }
    };
    Object.defineProperty(ClrDatagridRow.prototype, "expanded", {
        get: function () {
            return this.expand.expanded;
        },
        set: function (value) {
            this.expand.expanded = value;
        },
        enumerable: true,
        configurable: true
    });
    ClrDatagridRow.prototype.toggleExpand = function () {
        if (this.expand.expandable) {
            this.expanded = !this.expanded;
            this.expandedChange.emit(this.expanded);
        }
    };
    ClrDatagridRow.prototype.toggleSelection = function () {
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
    };
    ClrDatagridRow.prototype.keypress = function (event) {
        if (!this.selection.rowSelectionMode) {
            return;
        }
        if (event.keyCode === this.ENTER_KEY_CODE || event.keyCode === this.SPACE_KEY_CODE) {
            event.preventDefault();
            this.toggleSelection();
        }
    };
    ClrDatagridRow.prototype.ngAfterContentInit = function () {
        var _this = this;
        var columnsList = this.hideableColumnService.getColumns();
        this.updateCellsForColumns(columnsList);
        this.dgCells.changes.subscribe(function (cellList) {
            var columnList = _this.hideableColumnService.getColumns();
            if (cellList.length === columnList.length) {
                _this.updateCellsForColumns(columnList);
            }
        });
        this.subscription = this.hideableColumnService.columnListChange.subscribe(function (columnList) {
            if (columnList.length === _this.dgCells.length) {
                _this.updateCellsForColumns(columnList);
            }
        });
    };
    ClrDatagridRow.prototype.updateCellsForColumns = function (columnList) {
        this.dgCells.forEach(function (cell, index) {
            var currentColumn = columnList[index];
            if (currentColumn) {
                cell.id = currentColumn.id;
            }
        });
    };
    ClrDatagridRow.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    return ClrDatagridRow;
}());
ClrDatagridRow.decorators = [
    { type: core.Component, args: [{
                selector: 'clr-dg-row',
                template: "\n        <div class=\"datagrid-row-master datagrid-row-flex\">\n            <clr-dg-cell *ngIf=\"selection.selectionType === SELECTION_TYPE.Multi\"\n                         class=\"datagrid-select datagrid-fixed-column\">\n                <clr-checkbox [clrChecked]=\"selected\" (clrCheckedChange)=\"toggle($event)\"></clr-checkbox>\n            </clr-dg-cell>\n            <clr-dg-cell *ngIf=\"selection.selectionType === SELECTION_TYPE.Single\"\n                         class=\"datagrid-select datagrid-fixed-column\">\n                <div class=\"radio\">\n                    <input type=\"radio\" [id]=\"id\" [name]=\"selection.id + '-radio'\" [value]=\"item\"\n                           [(ngModel)]=\"selection.currentSingle\" [checked]=\"selection.currentSingle === item\">\n                    <label for=\"{{id}}\"></label>\n                </div>\n            </clr-dg-cell>\n            <clr-dg-cell *ngIf=\"rowActionService.hasActionableRow\"\n                         class=\"datagrid-row-actions datagrid-fixed-column\">\n                <ng-content select=\"clr-dg-action-overflow\"></ng-content>\n            </clr-dg-cell>\n            <clr-dg-cell *ngIf=\"globalExpandable.hasExpandableRow\"\n                         class=\"datagrid-expandable-caret datagrid-fixed-column\">\n                <ng-container *ngIf=\"expand.expandable\">\n                    <button (click)=\"toggleExpand()\" *ngIf=\"!expand.loading\" type=\"button\" class=\"datagrid-expandable-caret-button\">\n                        <clr-icon shape=\"caret\" [attr.dir]=\"expand.expanded?'down':'right'\" class=\"datagrid-expandable-caret-icon\"></clr-icon>\n                    </button>\n                    <div class=\"spinner spinner-sm\" *ngIf=\"expand.loading\"></div>\n                </ng-container>\n            </clr-dg-cell>\n            <ng-content *ngIf=\"!expand.replace || !expand.expanded || expand.loading\"></ng-content>\n\n            <ng-template *ngIf=\"expand.replace && expand.expanded && !expand.loading\"\n                         [ngTemplateOutlet]=\"detail\"></ng-template>\n        </div>\n\n        <ng-template *ngIf=\"!expand.replace && expand.expanded && !expand.loading\"\n                     [ngTemplateOutlet]=\"detail\"></ng-template>\n\n        <!-- \n            We need the \"project into template\" hack because we need this in 2 different places\n            depending on whether the details replace the row or not.\n        -->\n        <ng-template #detail>\n            <ng-content select=\"clr-dg-row-detail\"></ng-content>\n        </ng-template>\n    ",
                host: {
                    '[class.datagrid-row]': 'true',
                    '[class.datagrid-selected]': 'selected',
                    '[attr.tabindex]': 'selection.rowSelectionMode ? 0 : null',
                },
                providers: [Expand, { provide: LoadingListener, useExisting: Expand }],
            },] },
];
ClrDatagridRow.ctorParameters = function () { return [
    { type: Selection, },
    { type: RowActionService, },
    { type: ExpandableRowsCount, },
    { type: Expand, },
    { type: HideableColumnService, },
]; };
ClrDatagridRow.propDecorators = {
    "item": [{ type: core.Input, args: ['clrDgItem',] },],
    "role": [{ type: core.HostBinding, args: ['attr.role',] },],
    "selected": [{ type: core.Input, args: ['clrDgSelected',] },],
    "selectedChanged": [{ type: core.Output, args: ['clrDgSelectedChange',] },],
    "expanded": [{ type: core.Input, args: ['clrDgExpanded',] },],
    "expandedChange": [{ type: core.Output, args: ['clrDgExpandedChange',] },],
    "toggleSelection": [{ type: core.HostListener, args: ['click',] },],
    "keypress": [{ type: core.HostListener, args: ['keypress', ['$event'],] },],
    "dgCells": [{ type: core.ContentChildren, args: [ClrDatagridCell,] },],
};
var ColumnToggleButtonsService = /** @class */ (function () {
    function ColumnToggleButtonsService() {
        this.buttons = null;
        this.selectAllDisabled = false;
        this._okButtonClicked = new rxjs.Subject();
        this._selectAllButtonClicked = new rxjs.Subject();
    }
    Object.defineProperty(ColumnToggleButtonsService.prototype, "okButtonClicked", {
        get: function () {
            return this._okButtonClicked.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnToggleButtonsService.prototype, "selectAllButtonClicked", {
        get: function () {
            return this._selectAllButtonClicked.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    ColumnToggleButtonsService.prototype.buttonClicked = function (type) {
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
    };
    return ColumnToggleButtonsService;
}());
ColumnToggleButtonsService.decorators = [
    { type: core.Injectable },
];
var StateProvider = /** @class */ (function () {
    function StateProvider(filters, sort, page, debouncer) {
        var _this = this;
        this.filters = filters;
        this.sort = sort;
        this.page = page;
        this.debouncer = debouncer;
        this.change = this.debouncer.change.pipe(operators.map(function () { return _this.state; }));
    }
    Object.defineProperty(StateProvider.prototype, "state", {
        get: function () {
            var state$$1 = {};
            if (this.page.size > 0) {
                state$$1.page = { from: this.page.firstItem, to: this.page.lastItem, size: this.page.size };
            }
            if (this.sort.comparator) {
                if (this.sort.comparator instanceof DatagridPropertyComparator) {
                    state$$1.sort = { by: ((this.sort.comparator)).prop, reverse: this.sort.reverse };
                }
                else {
                    state$$1.sort = { by: this.sort.comparator, reverse: this.sort.reverse };
                }
            }
            var activeFilters = this.filters.getActiveFilters();
            if (activeFilters.length > 0) {
                state$$1.filters = [];
                try {
                    for (var activeFilters_1 = __values(activeFilters), activeFilters_1_1 = activeFilters_1.next(); !activeFilters_1_1.done; activeFilters_1_1 = activeFilters_1.next()) {
                        var filter$$1 = activeFilters_1_1.value;
                        if (filter$$1 instanceof DatagridStringFilterImpl) {
                            var stringFilter = ((filter$$1)).filterFn;
                            if (stringFilter instanceof DatagridPropertyStringFilter) {
                                state$$1.filters.push({
                                    property: ((stringFilter)).prop,
                                    value: ((filter$$1)).value,
                                });
                                continue;
                            }
                        }
                        state$$1.filters.push(filter$$1);
                    }
                }
                catch (e_6_1) { e_6 = { error: e_6_1 }; }
                finally {
                    try {
                        if (activeFilters_1_1 && !activeFilters_1_1.done && (_a = activeFilters_1.return)) _a.call(activeFilters_1);
                    }
                    finally { if (e_6) throw e_6.error; }
                }
            }
            return state$$1;
            var e_6, _a;
        },
        enumerable: true,
        configurable: true
    });
    return StateProvider;
}());
StateProvider.decorators = [
    { type: core.Injectable },
];
StateProvider.ctorParameters = function () { return [
    { type: FiltersProvider, },
    { type: Sort, },
    { type: Page, },
    { type: StateDebouncer, },
]; };
var ClrDatagrid = /** @class */ (function () {
    function ClrDatagrid(columnService, organizer, items, expandableRows, selection, rowActionService, stateProvider) {
        this.columnService = columnService;
        this.organizer = organizer;
        this.items = items;
        this.expandableRows = expandableRows;
        this.selection = selection;
        this.rowActionService = rowActionService;
        this.stateProvider = stateProvider;
        this.SELECTION_TYPE = SelectionType;
        this.refresh = new core.EventEmitter(false);
        this.selectedChanged = new core.EventEmitter(false);
        this.singleSelectedChanged = new core.EventEmitter(false);
        this._subscriptions = [];
    }
    Object.defineProperty(ClrDatagrid.prototype, "loading", {
        get: function () {
            return this.items.loading;
        },
        set: function (value) {
            this.items.loading = value;
        },
        enumerable: true,
        configurable: true
    });
    ClrDatagrid.prototype.dataChanged = function () {
        this.items.refresh();
    };
    Object.defineProperty(ClrDatagrid.prototype, "selected", {
        set: function (value) {
            if (value) {
                this.selection.selectionType = SelectionType.Multi;
            }
            else {
                this.selection.selectionType = SelectionType.None;
            }
            this.selection.current = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagrid.prototype, "singleSelected", {
        set: function (value) {
            this.selection.selectionType = SelectionType.Single;
            if (value) {
                this.selection.currentSingle = value;
            }
            else {
                this.selection.currentSingle = null;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagrid.prototype, "rowSelectionMode", {
        set: function (value) {
            this.selection.rowSelectionMode = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagrid.prototype, "rowSelectionModeDeprecated", {
        set: function (value) {
            this.rowSelectionMode = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagrid.prototype, "allSelected", {
        get: function () {
            return this.selection.isAllSelected();
        },
        set: function (value) {
            this.selection.toggleAll();
        },
        enumerable: true,
        configurable: true
    });
    ClrDatagrid.prototype.ngAfterContentInit = function () {
        var _this = this;
        this._subscriptions.push(this.rows.changes.subscribe(function () {
            if (!_this.items.smart) {
                _this.items.all = _this.rows.map(function (row) { return row.item; });
            }
        }));
        if (!this.items.smart) {
            this.items.all = this.rows.map(function (row) { return row.item; });
        }
        this._subscriptions.push(this.columns.changes.subscribe(function (columns) {
            _this.columnService.updateColumnList(_this.columns.map(function (col) { return col.hideable; }));
        }));
        this.columnService.updateColumnList(this.columns.map(function (col) { return col.hideable; }));
    };
    ClrDatagrid.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.refresh.emit(this.stateProvider.state);
        this._subscriptions.push(this.stateProvider.change.subscribe(function (state$$1) { return _this.refresh.emit(state$$1); }));
        this._subscriptions.push(this.selection.change.subscribe(function (s) {
            if (_this.selection.selectionType === SelectionType.Single) {
                _this.singleSelectedChanged.emit(s);
            }
            else if (_this.selection.selectionType === SelectionType.Multi) {
                _this.selectedChanged.emit(s);
            }
        }));
    };
    ClrDatagrid.prototype.ngOnDestroy = function () {
        this._subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    ClrDatagrid.prototype.resize = function () {
        this.organizer.resize();
    };
    return ClrDatagrid;
}());
ClrDatagrid.decorators = [
    { type: core.Component, args: [{
                selector: 'clr-datagrid',
                template: "<!--\n  ~ Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.\n  ~ This software is released under MIT license.\n  ~ The full license information can be found in LICENSE in the root directory of this project.\n  -->\n\n<ng-content select=\"clr-dg-action-bar\"></ng-content>\n<div class=\"datagrid-overlay-wrapper\">\n    <div class=\"datagrid-scroll-wrapper\">\n        <div class=\"datagrid\" #datagrid>\n            <clr-dg-table-wrapper class=\"datagrid-table-wrapper\">\n                <div clrDgHead class=\"datagrid-head\">\n                    <div class=\"datagrid-row datagrid-row-flex\">\n                        <!-- header for datagrid where you can select multiple rows -->\n                        <div class=\"datagrid-column datagrid-select datagrid-fixed-column\"\n                             *ngIf=\"selection.selectionType === SELECTION_TYPE.Multi\">\n                        <span class=\"datagrid-column-title\">\n                            <clr-checkbox [(ngModel)]=\"allSelected\"></clr-checkbox>\n                        </span>\n                            <div class=\"datagrid-column-separator\"></div>\n                        </div>\n                        <!-- header for datagrid where you can select one row only -->\n                        <div class=\"datagrid-column datagrid-select datagrid-fixed-column\"\n                             *ngIf=\"selection.selectionType === SELECTION_TYPE.Single\">\n                            <div class=\"datagrid-column-separator\"></div>\n                        </div>\n                        <!-- header for single row action; only display if we have at least one actionable row in datagrid -->\n                        <div class=\"datagrid-column datagrid-row-actions datagrid-fixed-column\"\n                             *ngIf=\"rowActionService.hasActionableRow\">\n                            <div class=\"datagrid-column-separator\"></div>\n                        </div>\n                        <!-- header for carets; only display if we have at least one expandable row in datagrid -->\n                        <div class=\"datagrid-column datagrid-expandable-caret datagrid-fixed-column\"\n                             *ngIf=\"expandableRows.hasExpandableRow\">\n                            <div class=\"datagrid-column-separator\"></div>\n                        </div>\n                        <ng-content select=\"clr-dg-column\"></ng-content>\n                    </div>\n                </div>\n\n                <ng-template *ngIf=\"iterator\"\n                             ngFor [ngForOf]=\"items.displayed\" [ngForTrackBy]=\"items.trackBy\"\n                             [ngForTemplate]=\"iterator.template\"></ng-template>\n                <ng-content *ngIf=\"!iterator\"></ng-content>\n\n                <!-- Custom placeholder overrides the default empty one -->\n                <ng-content select=\"clr-dg-placeholder\"></ng-content>\n                <clr-dg-placeholder *ngIf=\"!placeholder\"></clr-dg-placeholder>\n            </clr-dg-table-wrapper>\n\n            <!--\n                This is not inside the table because there is no good way of having a single column span\n                everything when using custom elements with display:table-cell.\n            -->\n            <ng-content select=\"clr-dg-footer\"></ng-content>\n        </div>\n    </div>\n    <div class=\"datagrid-spinner\" *ngIf=\"loading\">\n        <div class=\"spinner\">Loading...</div>\n    </div>\n</div>\n",
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
ClrDatagrid.ctorParameters = function () { return [
    { type: HideableColumnService, },
    { type: DatagridRenderOrganizer, },
    { type: Items, },
    { type: ExpandableRowsCount, },
    { type: Selection, },
    { type: RowActionService, },
    { type: StateProvider, },
]; };
ClrDatagrid.propDecorators = {
    "loading": [{ type: core.Input, args: ['clrDgLoading',] },],
    "refresh": [{ type: core.Output, args: ['clrDgRefresh',] },],
    "iterator": [{ type: core.ContentChild, args: [ClrDatagridItems,] },],
    "selected": [{ type: core.Input, args: ['clrDgSelected',] },],
    "selectedChanged": [{ type: core.Output, args: ['clrDgSelectedChange',] },],
    "singleSelected": [{ type: core.Input, args: ['clrDgSingleSelected',] },],
    "singleSelectedChanged": [{ type: core.Output, args: ['clrDgSingleSelectedChange',] },],
    "rowSelectionMode": [{ type: core.Input, args: ['clrDgRowSelection',] },],
    "rowSelectionModeDeprecated": [{ type: core.Input, args: ['clDgRowSelection',] },],
    "placeholder": [{ type: core.ContentChild, args: [ClrDatagridPlaceholder,] },],
    "columns": [{ type: core.ContentChildren, args: [ClrDatagridColumn,] },],
    "rows": [{ type: core.ContentChildren, args: [ClrDatagridRow,] },],
};
var ClrDatagridActionBar = /** @class */ (function () {
    function ClrDatagridActionBar() {
    }
    return ClrDatagridActionBar;
}());
ClrDatagridActionBar.decorators = [
    { type: core.Component, args: [{
                selector: 'clr-dg-action-bar',
                template: "\n        <ng-content></ng-content>\n    ",
                host: { '[class.datagrid-action-bar]': 'true' },
            },] },
];
var ClrDatagridActionOverflow = /** @class */ (function () {
    function ClrDatagridActionOverflow(rowActionService) {
        this.rowActionService = rowActionService;
        this.anchorPoint = Point.RIGHT_CENTER;
        this.popoverPoint = Point.LEFT_CENTER;
        this._open = false;
        this.openChanged = new core.EventEmitter(false);
        this.rowActionService.register();
    }
    ClrDatagridActionOverflow.prototype.ngOnDestroy = function () {
        this.rowActionService.unregister();
    };
    Object.defineProperty(ClrDatagridActionOverflow.prototype, "open", {
        get: function () {
            return this._open;
        },
        set: function (open) {
            var boolOpen = !!open;
            if (boolOpen !== this._open) {
                this._open = boolOpen;
                this.openChanged.emit(boolOpen);
            }
        },
        enumerable: true,
        configurable: true
    });
    ClrDatagridActionOverflow.prototype.toggle = function (event) {
        this.openingEvent = event;
        this.open = !this.open;
    };
    ClrDatagridActionOverflow.prototype.close = function (event) {
        if (event === this.openingEvent) {
            delete this.openingEvent;
            return;
        }
        this.open = false;
    };
    return ClrDatagridActionOverflow;
}());
ClrDatagridActionOverflow.decorators = [
    { type: core.Component, args: [{
                selector: 'clr-dg-action-overflow',
                template: "\n        <button (click)=\"toggle($event)\" type=\"button\" class=\"datagrid-action-toggle\" #anchor>\n            <clr-icon shape=\"ellipsis-vertical\"></clr-icon>\n        </button>\n        <ng-template [(clrPopoverOld)]=\"open\" [clrPopoverOldAnchor]=\"anchor\" [clrPopoverOldAnchorPoint]=\"anchorPoint\"\n                     [clrPopoverOldPopoverPoint]=\"popoverPoint\">\n            <div #menu class=\"datagrid-action-overflow\" (clrOutsideClick)=\"close($event)\" [clrStrict]=\"true\">\n                <ng-content></ng-content>\n            </div>\n        </ng-template>\n    ",
            },] },
];
ClrDatagridActionOverflow.ctorParameters = function () { return [
    { type: RowActionService, },
]; };
ClrDatagridActionOverflow.propDecorators = {
    "open": [{ type: core.Input, args: ['clrDgActionOverflowOpen',] },],
    "openChanged": [{ type: core.Output, args: ['clrDgActionOverflowOpenChange',] },],
};
var ClrDatagridColumnToggleButton = /** @class */ (function () {
    function ClrDatagridColumnToggleButton(toggleButtons) {
        this.toggleButtons = toggleButtons;
    }
    ClrDatagridColumnToggleButton.prototype.getClasses = function () {
        var classes = 'btn ';
        if (this.isOk()) {
            classes += 'btn-primary';
        }
        else {
            classes += 'btn-sm btn-link p6 text-uppercase';
        }
        return classes;
    };
    ClrDatagridColumnToggleButton.prototype.isOk = function () {
        return this.clrType === 'ok';
    };
    ClrDatagridColumnToggleButton.prototype.click = function () {
        this.toggleButtons.buttonClicked(this.clrType);
    };
    return ClrDatagridColumnToggleButton;
}());
ClrDatagridColumnToggleButton.decorators = [
    { type: core.Component, args: [{
                selector: 'clr-dg-column-toggle-button',
                template: "\n        <button\n            (click)=\"click()\"\n            [disabled]=\"toggleButtons.selectAllDisabled && !isOk()\"\n            [ngClass]=\"getClasses()\"\n            type=\"button\">\n            <ng-content></ng-content>\n        </button>\n    ",
                host: { '[class.action-right]': 'isOk()', '[style.display]': 'block' },
            },] },
];
ClrDatagridColumnToggleButton.ctorParameters = function () { return [
    { type: ColumnToggleButtonsService, },
]; };
ClrDatagridColumnToggleButton.propDecorators = {
    "clrType": [{ type: core.Input },],
};
var ClrDatagridColumnToggleTitle = /** @class */ (function () {
    function ClrDatagridColumnToggleTitle() {
    }
    return ClrDatagridColumnToggleTitle;
}());
ClrDatagridColumnToggleTitle.decorators = [
    { type: core.Component, args: [{
                selector: 'clr-dg-column-toggle-title',
                template: "<ng-content></ng-content>",
            },] },
];
var ClrDatagridColumnToggle = /** @class */ (function () {
    function ClrDatagridColumnToggle(hideableColumnService, columnToggleButtons) {
        this.hideableColumnService = hideableColumnService;
        this.columnToggleButtons = columnToggleButtons;
        this.subscriptions = [];
        this.anchorPoint = Point.TOP_LEFT;
        this.popoverPoint = Point.LEFT_BOTTOM;
        this.open = false;
        this.columns = [];
    }
    Object.defineProperty(ClrDatagridColumnToggle.prototype, "allColumnsVisible", {
        get: function () {
            return this._allColumnsVisible;
        },
        set: function (value) {
            this._allColumnsVisible = value;
        },
        enumerable: true,
        configurable: true
    });
    ClrDatagridColumnToggle.prototype.ngOnInit = function () {
        var _this = this;
        this.subscriptions.push(this.hideableColumnService.columnListChange.subscribe(function (columnList) {
            _this.columns.length = 0;
            _this.hideableColumnService.updateForLastVisibleColumn();
            _this.allColumnsVisible = _this.hideableColumnService.checkForAllColumnsVisible;
            _this.columnToggleButtons.selectAllDisabled = _this.allColumnsVisible;
            columnList.forEach(function (col) {
                if (col) {
                    _this.columns.push(col);
                }
            });
        }));
        this.subscriptions.push(this.columnToggleButtons.okButtonClicked.subscribe(function () {
            _this.toggleUI();
        }));
        this.subscriptions.push(this.columnToggleButtons.selectAllButtonClicked.subscribe(function () {
            _this.selectAll();
        }));
    };
    ClrDatagridColumnToggle.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    ClrDatagridColumnToggle.prototype.selectAll = function () {
        this.hideableColumnService.showHiddenColumns();
        this.allColumnsVisible = this.hideableColumnService.checkForAllColumnsVisible;
    };
    ClrDatagridColumnToggle.prototype.toggleColumn = function (event, column) {
        column.hidden = !event;
        this.allColumnsVisible = this.hideableColumnService.checkForAllColumnsVisible;
        this.columnToggleButtons.selectAllDisabled = this.allColumnsVisible;
        this.hideableColumnService.updateForLastVisibleColumn();
    };
    ClrDatagridColumnToggle.prototype.toggleUI = function () {
        this.open = !this.open;
    };
    return ClrDatagridColumnToggle;
}());
ClrDatagridColumnToggle.decorators = [
    { type: core.Component, args: [{
                selector: 'clr-dg-column-toggle',
                template: "\n        <button\n                #anchor\n                (click)=\"toggleUI()\"\n                class=\"btn btn-sm btn-link column-toggle--action\"\n                type=\"button\">\n            <clr-icon shape=\"view-columns\"></clr-icon>\n        </button>\n        <div class=\"column-switch\"\n             *clrPopoverOld=\"open; anchor: anchor; anchorPoint: anchorPoint; popoverPoint: popoverPoint\">\n            <div class=\"switch-header\">\n                <ng-container *ngIf=\"!title\">Show Columns</ng-container>\n                <ng-content select=\"clr-dg-column-toggle-title\"></ng-content>\n                <button\n                    class=\"btn btn-sm btn-link\"\n                    (click)=\"toggleUI()\"\n                    type=\"button\">\n                    <clr-icon\n                            shape=\"close\"></clr-icon>\n                </button>\n            </div>\n            <ul class=\"switch-content list-unstyled\">\n                <li *ngFor=\"let column of columns\">\n                    <clr-checkbox [clrChecked]=\"!column.hidden\"\n                                  [clrDisabled]=\"column.lastVisibleColumn\"\n                                  (clrCheckedChange)=\"toggleColumn($event, column)\">\n                        <ng-template [ngTemplateOutlet]=\"column.template\"></ng-template>\n                    </clr-checkbox>\n                </li>\n            </ul>\n            <div class=\"switch-footer\" *ngIf=\"buttons.length > 0\">\n                <ng-content select=\"clr-dg-column-toggle-button\"></ng-content>\n            </div>\n            <div class=\"switch-footer\" *ngIf=\"buttons.length === 0\">\n                <div>\n                    <button\n                            class=\"btn btn-sm btn-link p6 text-uppercase\"\n                            [disabled]=\"allColumnsVisible\"\n                            (click)=\"selectAll()\"\n                            type=\"button\">Select All\n                    </button>\n                </div>\n                <div class=\"action-right\">\n                    <button\n                            (click)=\"toggleUI()\"\n                            class=\"btn btn-primary\"\n                            type=\"button\">\n                        Ok\n                    </button>\n                </div>\n            </div>\n        </div>\n    ",
                host: { '[class.column-switch-wrapper]': 'true', '[class.active]': 'open' },
            },] },
];
ClrDatagridColumnToggle.ctorParameters = function () { return [
    { type: HideableColumnService, },
    { type: ColumnToggleButtonsService, },
]; };
ClrDatagridColumnToggle.propDecorators = {
    "title": [{ type: core.ContentChild, args: [ClrDatagridColumnToggleTitle,] },],
    "buttons": [{ type: core.ContentChildren, args: [ClrDatagridColumnToggleButton,] },],
};
var DatagridDetailRegisterer = /** @class */ (function () {
    function DatagridDetailRegisterer(expandableRowsCount) {
        this.expandableRowsCount = expandableRowsCount;
        if (this.expandableRowsCount) {
            this.expandableRowsCount.register();
        }
    }
    DatagridDetailRegisterer.prototype.ngOnDestroy = function () {
        if (this.expandableRowsCount) {
            this.expandableRowsCount.unregister();
        }
    };
    return DatagridDetailRegisterer;
}());
DatagridDetailRegisterer.decorators = [
    { type: core.Directive, args: [{ selector: '[clrIfExpanded]' },] },
];
DatagridDetailRegisterer.ctorParameters = function () { return [
    { type: ExpandableRowsCount, decorators: [{ type: core.Optional },] },
]; };
var ClrDatagridFooter = /** @class */ (function () {
    function ClrDatagridFooter(selection, hideableColumnService, cdr) {
        this.selection = selection;
        this.hideableColumnService = hideableColumnService;
        this.cdr = cdr;
        this.subscriptions = [];
        this.SELECTION_TYPE = SelectionType;
    }
    ClrDatagridFooter.prototype.ngOnInit = function () {
        var _this = this;
        this.subscriptions.push(this.hideableColumnService.columnListChange.subscribe(function (change) {
            var hiddenColumnsInSub = change.filter(function (col) { return col; });
            if (hiddenColumnsInSub.length > 0) {
                _this.activeToggler = true;
            }
        }));
        var hiddenColumns = this.hideableColumnService.getColumns().filter(function (col) { return col; });
        if (hiddenColumns.length > 0) {
            this.activeToggler = true;
        }
    };
    ClrDatagridFooter.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) {
            sub.unsubscribe();
        });
    };
    return ClrDatagridFooter;
}());
ClrDatagridFooter.decorators = [
    { type: core.Component, args: [{
                selector: 'clr-dg-footer',
                template: "\n        <ng-container\n            *ngIf=\"(selection.selectionType === SELECTION_TYPE.Multi) && (selection.current.length > 0)\">\n            <clr-checkbox [clrDisabled]=\"true\" [clrChecked]=\"true\" class=\"datagrid-foot-select\">\n                {{selection.current.length}}\n            </clr-checkbox>\n        </ng-container>\n        <ng-content select=\"clr-dg-column-toggle\"></ng-content>\n        <clr-dg-column-toggle *ngIf=\"!toggle && activeToggler\"></clr-dg-column-toggle>\n        <div class=\"datagrid-foot-description\">\n            <ng-content></ng-content>\n        </div>\n        <ng-content select=\"clr-dg-pagination\"></ng-content>\n    ",
                host: {
                    '[class.datagrid-foot]': 'true',
                },
            },] },
];
ClrDatagridFooter.ctorParameters = function () { return [
    { type: Selection, },
    { type: HideableColumnService, },
    { type: core.ChangeDetectorRef, },
]; };
ClrDatagridFooter.propDecorators = {
    "toggle": [{ type: core.ContentChild, args: [ClrDatagridColumnToggle,] },],
};
var DatagridHideableColumnModel = /** @class */ (function () {
    function DatagridHideableColumnModel(_template, _id, _hidden) {
        if (_hidden === void 0) { _hidden = false; }
        this._template = _template;
        this._id = _id;
        this._hidden = _hidden;
        this.hiddenChangesState = new rxjs.Subject();
        this.lastVisibleColumn = false;
    }
    Object.defineProperty(DatagridHideableColumnModel.prototype, "template", {
        get: function () {
            return this._template;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatagridHideableColumnModel.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatagridHideableColumnModel.prototype, "hidden", {
        get: function () {
            return this._hidden;
        },
        set: function (value) {
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
        get: function () {
            return this.hiddenChangesState.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    return DatagridHideableColumnModel;
}());
var ClrDatagridHideableColumn = /** @class */ (function () {
    function ClrDatagridHideableColumn(templateRef, viewContainerRef, dgColumn) {
        this.templateRef = templateRef;
        this.viewContainerRef = viewContainerRef;
        this.dgColumn = dgColumn;
        this.columnId = dgColumn.columnId;
        this.viewContainerRef.createEmbeddedView(this.templateRef);
        this.dgColumn.hideable = new DatagridHideableColumnModel(this.templateRef, this.columnId, this._hidden);
    }
    Object.defineProperty(ClrDatagridHideableColumn.prototype, "clrDgHideableColumn", {
        set: function (value) {
            this._hidden = value && value.hidden ? value.hidden : false;
            if (this.dgColumn.hideable) {
                this.dgColumn.hideable.hidden = value && value.hidden ? value.hidden : false;
            }
        },
        enumerable: true,
        configurable: true
    });
    return ClrDatagridHideableColumn;
}());
ClrDatagridHideableColumn.decorators = [
    { type: core.Directive, args: [{ selector: '[clrDgHideableColumn]' },] },
];
ClrDatagridHideableColumn.ctorParameters = function () { return [
    { type: core.TemplateRef, },
    { type: core.ViewContainerRef, },
    { type: ClrDatagridColumn, },
]; };
ClrDatagridHideableColumn.propDecorators = {
    "clrDgHideableColumn": [{ type: core.Input, args: ['clrDgHideableColumn',] },],
};
var ClrDatagridItemsTrackBy = /** @class */ (function () {
    function ClrDatagridItemsTrackBy(_items) {
        this._items = _items;
    }
    Object.defineProperty(ClrDatagridItemsTrackBy.prototype, "trackBy", {
        set: function (value) {
            if (this._items) {
                this._items.trackBy = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    return ClrDatagridItemsTrackBy;
}());
ClrDatagridItemsTrackBy.decorators = [
    { type: core.Directive, args: [{
                selector: '[ngForTrackBy]',
            },] },
];
ClrDatagridItemsTrackBy.ctorParameters = function () { return [
    { type: Items, decorators: [{ type: core.Optional },] },
]; };
ClrDatagridItemsTrackBy.propDecorators = {
    "trackBy": [{ type: core.Input, args: ['ngForTrackBy',] },],
};
var ClrDatagridPagination = /** @class */ (function () {
    function ClrDatagridPagination(page) {
        this.page = page;
        this.currentChanged = new core.EventEmitter(false);
        page.size = 10;
    }
    ClrDatagridPagination.prototype.ngOnInit = function () {
        var _this = this;
        this._pageSubscription = this.page.change.subscribe(function (current) { return _this.currentChanged.emit(current); });
    };
    ClrDatagridPagination.prototype.ngOnDestroy = function () {
        this.page.resetPageSize();
        if (this._pageSubscription) {
            this._pageSubscription.unsubscribe();
        }
    };
    Object.defineProperty(ClrDatagridPagination.prototype, "pageSize", {
        get: function () {
            return this.page.size;
        },
        set: function (size) {
            if (typeof size === 'number') {
                this.page.size = size;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridPagination.prototype, "totalItems", {
        get: function () {
            return this.page.totalItems;
        },
        set: function (total) {
            if (typeof total === 'number') {
                this.page.totalItems = total;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridPagination.prototype, "lastPage", {
        get: function () {
            return this.page.last;
        },
        set: function (last) {
            if (typeof last === 'number') {
                this.page.last = last;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridPagination.prototype, "currentPage", {
        get: function () {
            return this.page.current;
        },
        set: function (page) {
            if (typeof page === 'number') {
                this.page.current = page;
            }
        },
        enumerable: true,
        configurable: true
    });
    ClrDatagridPagination.prototype.previous = function () {
        this.page.previous();
    };
    ClrDatagridPagination.prototype.next = function () {
        this.page.next();
    };
    Object.defineProperty(ClrDatagridPagination.prototype, "firstItem", {
        get: function () {
            return this.page.firstItem;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridPagination.prototype, "lastItem", {
        get: function () {
            return this.page.lastItem;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridPagination.prototype, "middlePages", {
        get: function () {
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
    return ClrDatagridPagination;
}());
ClrDatagridPagination.decorators = [
    { type: core.Component, args: [{
                selector: 'clr-dg-pagination',
                template: "\n        <div class=\"pagination-description\">\n            <ng-content></ng-content>\n        </div>\n        <ul class=\"pagination-list\" *ngIf=\"page.last > 1\">\n            <li *ngIf=\"page.current > 1\">\n                <button \n                    class=\"pagination-previous\" \n                    (click)=\"page.previous()\"\n                    type=\"button\"></button>\n            </li>\n            <li *ngIf=\"page.current > 2\">\n                <button (click)=\"page.current = 1\" type=\"button\">1</button>\n            </li>\n            <li *ngIf=\"page.current > 3\">...</li>\n            <li *ngFor=\"let pageNum of middlePages\" [class.pagination-current]=\"pageNum === page.current\">\n                <button \n                    *ngIf=\"pageNum !== page.current; else noButton\" \n                    (click)=\"page.current = pageNum\"\n                    type=\"button\">{{pageNum}}</button>\n                <ng-template #noButton>{{pageNum}}</ng-template>\n            </li>\n            <li *ngIf=\"page.current < page.last - 2\">...</li>\n            <li *ngIf=\"page.current < page.last - 1\">\n                <button \n                    (click)=\"page.current = page.last\"\n                    type=\"button\">{{page.last}}</button>\n            </li>\n            <li *ngIf=\"page.current < page.last\">\n                <button \n                    class=\"pagination-next\" \n                    (click)=\"page.next()\"\n                    type=\"button\"></button>\n            </li>\n        </ul>\n    ",
                host: { '[class.pagination]': 'true' },
            },] },
];
ClrDatagridPagination.ctorParameters = function () { return [
    { type: Page, },
]; };
ClrDatagridPagination.propDecorators = {
    "pageSize": [{ type: core.Input, args: ['clrDgPageSize',] },],
    "totalItems": [{ type: core.Input, args: ['clrDgTotalItems',] },],
    "lastPage": [{ type: core.Input, args: ['clrDgLastPage',] },],
    "currentPage": [{ type: core.Input, args: ['clrDgPage',] },],
    "currentChanged": [{ type: core.Output, args: ['clrDgPageChange',] },],
};
var ClrDatagridRowDetail = /** @class */ (function () {
    function ClrDatagridRowDetail(selection, rowActionService, expand, hideableColumnService) {
        this.selection = selection;
        this.rowActionService = rowActionService;
        this.expand = expand;
        this.hideableColumnService = hideableColumnService;
        this.SELECTION_TYPE = SelectionType;
        this._subscriptions = [];
    }
    Object.defineProperty(ClrDatagridRowDetail.prototype, "replace", {
        get: function () {
            return this.expand.replace;
        },
        set: function (value) {
            this.expand.replace = !!value;
        },
        enumerable: true,
        configurable: true
    });
    ClrDatagridRowDetail.prototype.ngAfterContentInit = function () {
        var _this = this;
        var columnsList = this.hideableColumnService.getColumns();
        this.updateCellsForColumns(columnsList);
        this._subscriptions.push(this.cells.changes.subscribe(function (cellList) {
            var columnList = _this.hideableColumnService.getColumns();
            if (cellList.length === columnList.length) {
                _this.updateCellsForColumns(columnList);
            }
        }));
        this._subscriptions.push(this.hideableColumnService.columnListChange.subscribe(function (columnList) {
            if (columnList.length === _this.cells.length) {
                _this.updateCellsForColumns(columnList);
            }
        }));
    };
    ClrDatagridRowDetail.prototype.updateCellsForColumns = function (columnList) {
        this.cells.forEach(function (cell, index) {
            var currentColumn = columnList[index];
            if (currentColumn) {
                cell.id = currentColumn.id;
            }
        });
    };
    ClrDatagridRowDetail.prototype.ngOnDestroy = function () {
        this._subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    return ClrDatagridRowDetail;
}());
ClrDatagridRowDetail.decorators = [
    { type: core.Component, args: [{
                selector: 'clr-dg-row-detail',
                template: "\n        <ng-container *ngIf=\"!replace\">\n            <clr-dg-cell class=\"datagrid-fixed-column\"\n                *ngIf=\"selection.selectionType === SELECTION_TYPE.Multi \n                    || selection.selectionType === SELECTION_TYPE.Single\"></clr-dg-cell>\n            <clr-dg-cell *ngIf=\"rowActionService.hasActionableRow\" class=\"datagrid-fixed-column\"></clr-dg-cell>\n            <clr-dg-cell class=\"datagrid-fixed-column\"></clr-dg-cell>\n        </ng-container>\n        <ng-content></ng-content>\n    ",
                host: {
                    '[class.datagrid-row-flex]': 'true',
                    '[class.datagrid-row-detail]': '!replace',
                    '[class.datagrid-container]': 'cells.length === 0',
                },
            },] },
];
ClrDatagridRowDetail.ctorParameters = function () { return [
    { type: Selection, },
    { type: RowActionService, },
    { type: Expand, },
    { type: HideableColumnService, },
]; };
ClrDatagridRowDetail.propDecorators = {
    "cells": [{ type: core.ContentChildren, args: [ClrDatagridCell,] },],
    "replace": [{ type: core.Input, args: ['clrDgReplace',] },],
};
var DatagridBodyRenderer = /** @class */ (function () {
    function DatagridBodyRenderer(el, organizer, domAdapter) {
        var _this = this;
        this.el = el;
        this.organizer = organizer;
        this.domAdapter = domAdapter;
        this.subscription = organizer.scrollbar.subscribe(function () { return _this.computeScrollbarWidth(); });
    }
    DatagridBodyRenderer.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    DatagridBodyRenderer.prototype.computeScrollbarWidth = function () {
        this.organizer.scrollbarWidth.next(this.domAdapter.scrollBarWidth(this.el.nativeElement));
    };
    return DatagridBodyRenderer;
}());
DatagridBodyRenderer.decorators = [
    { type: core.Directive, args: [{ selector: '[clrDgBody]' },] },
];
DatagridBodyRenderer.ctorParameters = function () { return [
    { type: core.ElementRef, },
    { type: DatagridRenderOrganizer, },
    { type: DomAdapter, },
]; };
var NO_LAYOUT_CLASS = 'datagrid-no-layout';
var COMPUTE_WIDTH_CLASS = 'datagrid-computing-columns-width';
var STRICT_WIDTH_CLASS = 'datagrid-fixed-width';
var DatagridCellRenderer = /** @class */ (function () {
    function DatagridCellRenderer(el, renderer, organizer) {
        var _this = this;
        this.el = el;
        this.renderer = renderer;
        this.subscription = organizer.clearWidths.subscribe(function () { return _this.clearWidth(); });
    }
    DatagridCellRenderer.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    DatagridCellRenderer.prototype.clearWidth = function () {
        this.renderer.removeClass(this.el.nativeElement, STRICT_WIDTH_CLASS);
        this.renderer.setStyle(this.el.nativeElement, 'width', null);
    };
    DatagridCellRenderer.prototype.setWidth = function (strict, value) {
        if (strict) {
            this.renderer.addClass(this.el.nativeElement, STRICT_WIDTH_CLASS);
        }
        else {
            this.renderer.removeClass(this.el.nativeElement, STRICT_WIDTH_CLASS);
        }
        this.renderer.setStyle(this.el.nativeElement, 'width', value + 'px');
    };
    return DatagridCellRenderer;
}());
DatagridCellRenderer.decorators = [
    { type: core.Directive, args: [{ selector: 'clr-dg-cell' },] },
];
DatagridCellRenderer.ctorParameters = function () { return [
    { type: core.ElementRef, },
    { type: core.Renderer2, },
    { type: DatagridRenderOrganizer, },
]; };
var DatagridColumnResizer = /** @class */ (function () {
    function DatagridColumnResizer(el, renderer, organizer, domAdapter, dragDispatcher) {
        this.renderer = renderer;
        this.organizer = organizer;
        this.domAdapter = domAdapter;
        this.dragDispatcher = dragDispatcher;
        this.columnResizeBy = 0;
        this.dragWithinMinWidth = false;
        this.resizeEmitter = new core.EventEmitter();
        this.subscriptions = [];
        this.columnEl = el.nativeElement;
    }
    DatagridColumnResizer.prototype.ngOnDestroy = function () {
        this.dragDispatcher.destroy();
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    DatagridColumnResizer.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.handleTrackerEl = this.dragDispatcher.handleTrackerRef.nativeElement;
        this.dragDispatcher.addDragListener();
        this.subscriptions.push(this.dragDispatcher.onDragStart.subscribe(function () { return _this.dragStartHandler(); }));
        this.subscriptions.push(this.dragDispatcher.onDragMove.subscribe(function ($event) { return _this.dragMoveHandler($event); }));
        this.subscriptions.push(this.dragDispatcher.onDragEnd.subscribe(function () { return _this.dragEndHandler(); }));
    };
    DatagridColumnResizer.prototype.dragStartHandler = function () {
        if (!this.columnMinWidth) {
            this.columnMinWidth = this.domAdapter.minWidth(this.columnEl);
        }
        this.renderer.setStyle(this.handleTrackerEl, 'display', 'block');
        this.renderer.setStyle(document.body, 'cursor', 'col-resize');
        this.dragDistancePositionX = 0;
        this.columnRectWidth = this.domAdapter.clientRectWidth(this.columnEl);
        this.pageStartPositionX = this.domAdapter.clientRectRight(this.columnEl);
    };
    DatagridColumnResizer.prototype.dragMoveHandler = function (moveEvent) {
        var pageMovePosition = moveEvent.pageX || moveEvent.changedTouches[0].pageX;
        this.dragDistancePositionX = this.getPositionWithinMax(pageMovePosition - this.pageStartPositionX);
        this.renderer.setStyle(this.handleTrackerEl, 'right', -1 * this.dragDistancePositionX + 'px');
    };
    DatagridColumnResizer.prototype.dragEndHandler = function () {
        this.renderer.setStyle(this.handleTrackerEl, 'right', '0px');
        this.renderer.setStyle(this.handleTrackerEl, 'display', 'none');
        this.renderer.setStyle(document.body, 'cursor', 'auto');
        if (this.dragDistancePositionX) {
            this.columnResizeBy = this.dragDistancePositionX;
            this.resizeEmitter.emit(this.columnRectWidth + this.columnResizeBy);
            this.organizer.resize();
        }
    };
    DatagridColumnResizer.prototype.getPositionWithinMax = function (draggedDistance) {
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
    };
    return DatagridColumnResizer;
}());
DatagridColumnResizer.decorators = [
    { type: core.Directive, args: [{ selector: 'clr-dg-column', providers: [DragDispatcher] },] },
];
DatagridColumnResizer.ctorParameters = function () { return [
    { type: core.ElementRef, },
    { type: core.Renderer2, },
    { type: DatagridRenderOrganizer, },
    { type: DomAdapter, },
    { type: DragDispatcher, },
]; };
DatagridColumnResizer.propDecorators = {
    "resizeEmitter": [{ type: core.Output, args: ['clrDgColumnResize',] },],
};
var DatagridHeadRenderer = /** @class */ (function () {
    function DatagridHeadRenderer(el, renderer, organizer) {
        var _this = this;
        this.el = el;
        this.renderer = renderer;
        this.subscription = organizer.scrollbarWidth.subscribe(function (width) { return _this.accountForScrollbar(width); });
    }
    DatagridHeadRenderer.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    DatagridHeadRenderer.prototype.accountForScrollbar = function (width) {
        this.renderer.setStyle(this.el.nativeElement, 'padding-right', width + 'px');
    };
    return DatagridHeadRenderer;
}());
DatagridHeadRenderer.decorators = [
    { type: core.Directive, args: [{ selector: '[clrDgHead]' },] },
];
DatagridHeadRenderer.ctorParameters = function () { return [
    { type: core.ElementRef, },
    { type: core.Renderer2, },
    { type: DatagridRenderOrganizer, },
]; };
var DatagridHeaderRenderer = /** @class */ (function () {
    function DatagridHeaderRenderer(el, renderer, organizer, domAdapter, columnResizer) {
        var _this = this;
        this.el = el;
        this.renderer = renderer;
        this.domAdapter = domAdapter;
        this.columnResizer = columnResizer;
        this.subscriptions = [];
        this.widthSet = false;
        this.subscriptions.push(organizer.clearWidths.subscribe(function () { return _this.clearWidth(); }));
        this.subscriptions.push(organizer.detectStrictWidths.subscribe(function () { return _this.detectStrictWidth(); }));
    }
    DatagridHeaderRenderer.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    DatagridHeaderRenderer.prototype.clearWidth = function () {
        if (this.widthSet && !this.columnResizer.columnResizeBy) {
            this.renderer.setStyle(this.el.nativeElement, 'width', null);
        }
    };
    DatagridHeaderRenderer.prototype.detectStrictWidth = function () {
        if (this.columnResizer.columnResizeBy) {
            this.strictWidth = this.columnResizer.columnRectWidth + this.columnResizer.columnResizeBy;
        }
        else {
            this.strictWidth = this.domAdapter.userDefinedWidth(this.el.nativeElement);
        }
    };
    DatagridHeaderRenderer.prototype.computeWidth = function () {
        var width = this.strictWidth;
        if (!width) {
            width = this.domAdapter.scrollWidth(this.el.nativeElement);
        }
        return width;
    };
    DatagridHeaderRenderer.prototype.setWidth = function (width) {
        if (this.strictWidth) {
            if (this.columnResizer.columnResizeBy) {
                this.renderer.setStyle(this.el.nativeElement, 'width', width + 'px');
                this.columnResizer.columnResizeBy = 0;
                this.widthSet = false;
            }
            this.renderer.addClass(this.el.nativeElement, STRICT_WIDTH_CLASS);
            return;
        }
        this.renderer.removeClass(this.el.nativeElement, STRICT_WIDTH_CLASS);
        this.renderer.setStyle(this.el.nativeElement, 'width', width + 'px');
        this.widthSet = true;
    };
    return DatagridHeaderRenderer;
}());
DatagridHeaderRenderer.decorators = [
    { type: core.Directive, args: [{ selector: 'clr-dg-column' },] },
];
DatagridHeaderRenderer.ctorParameters = function () { return [
    { type: core.ElementRef, },
    { type: core.Renderer2, },
    { type: DatagridRenderOrganizer, },
    { type: DomAdapter, },
    { type: DatagridColumnResizer, },
]; };
var NoopDomAdapter = /** @class */ (function () {
    function NoopDomAdapter() {
    }
    NoopDomAdapter.prototype.userDefinedWidth = function (element) {
        return 0;
    };
    NoopDomAdapter.prototype.scrollBarWidth = function (element) {
        return 0;
    };
    NoopDomAdapter.prototype.scrollWidth = function (element) {
        return 0;
    };
    NoopDomAdapter.prototype.computedHeight = function (element) {
        return 0;
    };
    NoopDomAdapter.prototype.clientRectHeight = function (element) {
        return 0;
    };
    NoopDomAdapter.prototype.clientRectRight = function (element) {
        return 0;
    };
    NoopDomAdapter.prototype.clientRectWidth = function (element) {
        return 0;
    };
    NoopDomAdapter.prototype.minWidth = function (element) {
        return 0;
    };
    NoopDomAdapter.prototype.focus = function (element) { };
    return NoopDomAdapter;
}());
NoopDomAdapter.decorators = [
    { type: core.Injectable },
];
var domAdapterFactory = function (platformId) {
    if (common.isPlatformBrowser(platformId)) {
        return new DomAdapter();
    }
    else {
        return new NoopDomAdapter();
    }
};
var DatagridMainRenderer = /** @class */ (function () {
    function DatagridMainRenderer(organizer, items, page, domAdapter, el, renderer) {
        var _this = this;
        this.organizer = organizer;
        this.items = items;
        this.page = page;
        this.domAdapter = domAdapter;
        this.el = el;
        this.renderer = renderer;
        this._heightSet = false;
        this._subscriptions = [];
        this.columnsSizesStable = false;
        this.shouldStabilizeColumns = true;
        this._subscriptions.push(organizer.computeWidths.subscribe(function () { return _this.computeHeadersWidth(); }));
        this._subscriptions.push(this.page.sizeChange.subscribe(function () {
            if (_this._heightSet) {
                _this.resetDatagridHeight();
            }
        }));
        this._subscriptions.push(this.items.change.subscribe(function () { return (_this.shouldStabilizeColumns = true); }));
    }
    DatagridMainRenderer.prototype.ngAfterContentInit = function () {
        var _this = this;
        this._subscriptions.push(this.headers.changes.subscribe(function () {
            _this.columnsSizesStable = false;
            _this.stabilizeColumns();
        }));
    };
    DatagridMainRenderer.prototype.ngAfterViewChecked = function () {
        var _this = this;
        if (this.shouldStabilizeColumns) {
            this.stabilizeColumns();
        }
        if (this.shouldComputeHeight()) {
            setTimeout(function () {
                _this.computeDatagridHeight();
            });
        }
    };
    DatagridMainRenderer.prototype.shouldComputeHeight = function () {
        if (!this._heightSet && this.page.size > 0) {
            if (this.items.displayed.length === this.page.size) {
                return true;
            }
        }
        return false;
    };
    DatagridMainRenderer.prototype.computeDatagridHeight = function () {
        var value = this.domAdapter.clientRectHeight(this.el.nativeElement);
        this.renderer.setStyle(this.el.nativeElement, 'height', value + 'px');
        this._heightSet = true;
    };
    DatagridMainRenderer.prototype.resetDatagridHeight = function () {
        this.renderer.setStyle(this.el.nativeElement, 'height', '');
        this._heightSet = false;
    };
    DatagridMainRenderer.prototype.ngOnDestroy = function () {
        this._subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    DatagridMainRenderer.prototype.computeHeadersWidth = function () {
        var _this = this;
        var nbColumns = this.headers.length;
        var allStrict = true;
        this.headers.forEach(function (header, index) {
            if (!header.strictWidth) {
                allStrict = false;
            }
            if (nbColumns === index + 1 && allStrict) {
                delete header.strictWidth;
            }
            _this.organizer.widths[index] = { px: header.computeWidth(), strict: !!header.strictWidth };
        });
        this.headers.forEach(function (header, index) { return header.setWidth(_this.organizer.widths[index].px); });
    };
    DatagridMainRenderer.prototype.stabilizeColumns = function () {
        var _this = this;
        this.shouldStabilizeColumns = false;
        if (this.columnsSizesStable) {
            setTimeout(function () {
                _this.organizer.scrollbar.next();
            });
            return;
        }
        if (this.items.displayed.length > 0) {
            this.organizer.resize();
            this.columnsSizesStable = true;
        }
    };
    return DatagridMainRenderer;
}());
DatagridMainRenderer.decorators = [
    { type: core.Directive, args: [{
                selector: 'clr-datagrid',
                providers: [{ provide: DomAdapter, useFactory: domAdapterFactory, deps: [core.PLATFORM_ID] }],
            },] },
];
DatagridMainRenderer.ctorParameters = function () { return [
    { type: DatagridRenderOrganizer, },
    { type: Items, },
    { type: Page, },
    { type: DomAdapter, },
    { type: core.ElementRef, },
    { type: core.Renderer2, },
]; };
DatagridMainRenderer.propDecorators = {
    "headers": [{ type: core.ContentChildren, args: [DatagridHeaderRenderer,] },],
};
var DatagridRowRenderer = /** @class */ (function () {
    function DatagridRowRenderer(organizer) {
        var _this = this;
        this.organizer = organizer;
        this.subscription = organizer.alignColumns.subscribe(function () { return _this.setWidths(); });
    }
    DatagridRowRenderer.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    DatagridRowRenderer.prototype.setWidths = function () {
        var _this = this;
        if (this.organizer.widths.length !== this.cells.length) {
            return;
        }
        this.cells.forEach(function (cell, index) {
            var width = _this.organizer.widths[index];
            cell.setWidth(width.strict, width.px);
        });
    };
    DatagridRowRenderer.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.cells.changes.subscribe(function () {
            _this.setWidths();
        });
    };
    DatagridRowRenderer.prototype.ngAfterViewInit = function () {
        this.setWidths();
    };
    return DatagridRowRenderer;
}());
DatagridRowRenderer.decorators = [
    { type: core.Directive, args: [{ selector: 'clr-dg-row, clr-dg-row-detail' },] },
];
DatagridRowRenderer.ctorParameters = function () { return [
    { type: DatagridRenderOrganizer, },
]; };
DatagridRowRenderer.propDecorators = {
    "cells": [{ type: core.ContentChildren, args: [DatagridCellRenderer,] },],
};
var DatagridTableRenderer = /** @class */ (function () {
    function DatagridTableRenderer(el, renderer, organizer) {
        var _this = this;
        this.el = el;
        this.renderer = renderer;
        this.subscriptions = [];
        this.subscriptions.push(organizer.tableMode.subscribe(function (on) { return _this.tableMode(on); }));
        this.subscriptions.push(organizer.noLayout.subscribe(function (on) { return _this.noLayout(on); }));
    }
    DatagridTableRenderer.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    DatagridTableRenderer.prototype.ngAfterViewInit = function () {
        this.outsideContainer.createEmbeddedView(this.projected);
    };
    DatagridTableRenderer.prototype.tableMode = function (on) {
        if (on) {
            this.insideContainer.insert(this.outsideContainer.detach(0), 0);
            this.renderer.addClass(this.el.nativeElement, COMPUTE_WIDTH_CLASS);
        }
        else {
            this.renderer.removeClass(this.el.nativeElement, COMPUTE_WIDTH_CLASS);
            this.outsideContainer.insert(this.insideContainer.detach(0), 0);
        }
    };
    DatagridTableRenderer.prototype.noLayout = function (on) {
        if (on) {
            this.renderer.addClass(this.el.nativeElement, NO_LAYOUT_CLASS);
        }
        else {
            this.renderer.removeClass(this.el.nativeElement, NO_LAYOUT_CLASS);
        }
    };
    return DatagridTableRenderer;
}());
DatagridTableRenderer.decorators = [
    { type: core.Component, args: [{
                selector: 'clr-dg-table-wrapper',
                template: "\n        <ng-template #head><ng-content select=\"[clrDgHead]\"></ng-content></ng-template>\n        <ng-container #outside></ng-container>\n        <div clrDgBody class=\"datagrid-body\">\n            <ng-container #inside></ng-container>\n            <ng-content></ng-content>\n        </div>\n    ",
            },] },
];
DatagridTableRenderer.ctorParameters = function () { return [
    { type: core.ElementRef, },
    { type: core.Renderer2, },
    { type: DatagridRenderOrganizer, },
]; };
DatagridTableRenderer.propDecorators = {
    "projected": [{ type: core.ViewChild, args: ['head',] },],
    "outsideContainer": [{ type: core.ViewChild, args: ['outside', { read: core.ViewContainerRef },] },],
    "insideContainer": [{ type: core.ViewChild, args: ['inside', { read: core.ViewContainerRef },] },],
};
var CLR_DATAGRID_DIRECTIVES = [
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
var ClrDatagridModule = /** @class */ (function () {
    function ClrDatagridModule() {
    }
    return ClrDatagridModule;
}());
ClrDatagridModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [
                    common.CommonModule,
                    ClrIconModule,
                    ClrFormsModule,
                    forms.FormsModule,
                    ClrCommonPopoverModule,
                    ClrLoadingModule,
                    ClrOutsideClickModule,
                ],
                declarations: [CLR_DATAGRID_DIRECTIVES],
                exports: [CLR_DATAGRID_DIRECTIVES, ClrIfExpandModule],
            },] },
];
var Datagrid = ClrDatagrid;
var DatagridActionBar = ClrDatagridActionBar;
var DatagridActionOverflow = ClrDatagridActionOverflow;
var DatagridColumn = ClrDatagridColumn;
var DatagridColumnToggle = ClrDatagridColumnToggle;
var DatagridHideableColumnDirective = ClrDatagridHideableColumn;
var DatagridFilter = ClrDatagridFilter;
var DatagridItems = ClrDatagridItems;
var DatagridRow = ClrDatagridRow;
var DatagridRowDetail = ClrDatagridRowDetail;
var DatagridCell = ClrDatagridCell;
var DatagridFooter = ClrDatagridFooter;
var DatagridPagination = ClrDatagridPagination;
var DatagridPlaceholder = ClrDatagridPlaceholder;
var SortOrder = {
    Unsorted: 0,
    Asc: 1,
    Desc: -1,
};
SortOrder[SortOrder.Unsorted] = "Unsorted";
SortOrder[SortOrder.Asc] = "Asc";
SortOrder[SortOrder.Desc] = "Desc";
var DATAGRID_DIRECTIVES = CLR_DATAGRID_DIRECTIVES;
var ClrStackBlock = /** @class */ (function () {
    function ClrStackBlock(parent) {
        this.parent = parent;
        this.expanded = false;
        this.expandedChange = new core.EventEmitter(false);
        this.expandable = false;
        this._changedChildren = 0;
        this._fullyInitialized = false;
        this._changed = false;
        if (parent) {
            parent.addChild();
        }
    }
    Object.defineProperty(ClrStackBlock.prototype, "getChangedValue", {
        get: function () {
            return this._changed || (this._changedChildren > 0 && !this.expanded);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrStackBlock.prototype, "setChangedValue", {
        set: function (value) {
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
    ClrStackBlock.prototype.ngOnInit = function () {
        this._fullyInitialized = true;
    };
    ClrStackBlock.prototype.addChild = function () {
        this.expandable = true;
    };
    ClrStackBlock.prototype.toggleExpand = function () {
        if (this.expandable) {
            this.expanded = !this.expanded;
            this.expandedChange.emit(this.expanded);
        }
    };
    return ClrStackBlock;
}());
ClrStackBlock.decorators = [
    { type: core.Component, args: [{
                selector: 'clr-stack-block',
                template: "\n        <dt class=\"stack-block-label\" (click)=\"toggleExpand()\">\n            <ng-content select=\"clr-stack-label\"></ng-content>\n        </dt>\n        <dd class=\"stack-block-content\">\n            <ng-content></ng-content>\n        </dd>\n        <!-- FIXME: remove this string concatenation when boolean states are supported -->\n        <div [@collapse]=\"''+!expanded\" class=\"stack-children\">\n            <ng-content select=\"clr-stack-block\"></ng-content>\n        </div>\n    ",
                styles: [
                    "\n        :host { display: block; }\n    ",
                ],
                host: { '[class.stack-block]': 'true' },
                animations: [
                    animations.trigger('collapse', [
                        animations.state('true', animations.style({ height: 0 })),
                        animations.transition('true => false', [animations.animate('0.2s ease-in-out', animations.style({ height: '*' }))]),
                        animations.transition('false => true', [animations.style({ height: '*' }), animations.animate('0.2s ease-in-out')]),
                    ]),
                ],
            },] },
];
ClrStackBlock.ctorParameters = function () { return [
    { type: ClrStackBlock, decorators: [{ type: core.SkipSelf }, { type: core.Optional },] },
]; };
ClrStackBlock.propDecorators = {
    "expanded": [{ type: core.HostBinding, args: ['class.stack-block-expanded',] }, { type: core.Input, args: ['clrSbExpanded',] },],
    "expandedChange": [{ type: core.Output, args: ['clrSbExpandedChange',] },],
    "expandable": [{ type: core.HostBinding, args: ['class.stack-block-expandable',] }, { type: core.Input, args: ['clrSbExpandable',] },],
    "getChangedValue": [{ type: core.HostBinding, args: ['class.stack-block-changed',] },],
    "setChangedValue": [{ type: core.Input, args: ['clrSbNotifyChange',] },],
};
var ClrStackView = /** @class */ (function () {
    function ClrStackView() {
        this.editable = false;
        this.save = new core.EventEmitter(false);
        this._editMode = false;
        this.editingChange = new core.EventEmitter(false);
    }
    Object.defineProperty(ClrStackView.prototype, "editing", {
        get: function () {
            return this.editable && this._editMode;
        },
        set: function (value) {
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
    return ClrStackView;
}());
ClrStackView.decorators = [
    { type: core.Component, args: [{
                selector: 'clr-stack-view',
                template: "\n        <ng-content select=\"clr-stack-header\"></ng-content>\n        <dl class=\"stack-view\"><ng-content></ng-content></dl>\n    ",
                styles: [
                    "\n        :host { display: block; }\n    ",
                ],
            },] },
];
ClrStackView.propDecorators = {
    "save": [{ type: core.Output, args: ['clrStackSave',] },],
};
var ClrStackHeader = /** @class */ (function () {
    function ClrStackHeader(stackView) {
        this.stackView = stackView;
    }
    return ClrStackHeader;
}());
ClrStackHeader.decorators = [
    { type: core.Component, args: [{
                selector: 'clr-stack-header',
                template: "\n        <h4 class=\"stack-header\">\n            <span class=\"stack-title\"><ng-content></ng-content></span>\n            \n            <span class=\"stack-actions\">\n                <ng-content select=\".stack-action\"></ng-content>\n                <!-- Undocumented experimental feature: inline editing. -->\n                <button *ngIf=\"stackView.editable\" class=\"stack-action btn btn-sm btn-link\" \n                        (click)=\"stackView.editing = !stackView.editing\" type=\"button\">\n                        Edit\n                </button>\n                <!-- End of undocumented experimental feature. -->\n            </span>\n        </h4>\n    ",
                styles: [
                    "\n        :host { display: block; }\n    ",
                ],
            },] },
];
ClrStackHeader.ctorParameters = function () { return [
    { type: ClrStackView, },
]; };
var StackControl = /** @class */ (function () {
    function StackControl(stackView) {
        var _this = this;
        this.stackView = stackView;
        this.modelChange = new core.EventEmitter(false);
        this.stackView.editable = true;
        this.stackView.editingChange.subscribe(function (editing) {
            if (!editing) {
                _this.modelChange.emit(_this.model);
            }
        });
    }
    return StackControl;
}());
var ClrStackInput = /** @class */ (function (_super) {
    __extends(ClrStackInput, _super);
    function ClrStackInput(stackView) {
        var _this = _super.call(this, stackView) || this;
        _this.stackView = stackView;
        _this.type = 'text';
        return _this;
    }
    return ClrStackInput;
}(StackControl));
ClrStackInput.decorators = [
    { type: core.Component, args: [{
                selector: 'clr-stack-input',
                inputs: ['model: clrModel', 'type'],
                outputs: ['modelChange: clrModelChange'],
                template: "\n        <span *ngIf=\"!stackView.editing\">{{model}}</span>\n        <input [type]=\"type\" *ngIf=\"stackView.editing\" [(ngModel)]=\"model\"/>\n    ",
            },] },
];
ClrStackInput.ctorParameters = function () { return [
    { type: ClrStackView, },
]; };
var ClrStackSelect = /** @class */ (function (_super) {
    __extends(ClrStackSelect, _super);
    function ClrStackSelect(stackView) {
        var _this = _super.call(this, stackView) || this;
        _this.stackView = stackView;
        return _this;
    }
    return ClrStackSelect;
}(StackControl));
ClrStackSelect.decorators = [
    { type: core.Component, args: [{
                selector: 'clr-stack-select',
                inputs: ['model: clrModel'],
                outputs: ['modelChange: clrModelChange'],
                template: "\n        <span *ngIf=\"!stackView.editing\">{{model}}</span>\n        <div class=\"select\" *ngIf=\"stackView.editing\" >\n            <select [(ngModel)]=\"model\">\n                <ng-content></ng-content>\n            </select>\n        </div>\n    ",
            },] },
];
ClrStackSelect.ctorParameters = function () { return [
    { type: ClrStackView, },
]; };
var ClrStackViewCustomTags = /** @class */ (function () {
    function ClrStackViewCustomTags() {
    }
    return ClrStackViewCustomTags;
}());
ClrStackViewCustomTags.decorators = [
    { type: core.Directive, args: [{ selector: 'clr-stack-label, clr-stack-content' },] },
];
var CLR_STACK_VIEW_DIRECTIVES = [
    ClrStackView,
    ClrStackHeader,
    ClrStackBlock,
    ClrStackViewCustomTags,
    ClrStackInput,
    ClrStackSelect,
];
var ClrStackViewModule = /** @class */ (function () {
    function ClrStackViewModule() {
    }
    return ClrStackViewModule;
}());
ClrStackViewModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [common.CommonModule, forms.FormsModule],
                declarations: [CLR_STACK_VIEW_DIRECTIVES],
                exports: [CLR_STACK_VIEW_DIRECTIVES],
            },] },
];
var StackView = ClrStackView;
var StackHeader = ClrStackHeader;
var StackBlock = ClrStackBlock;
var StackViewCustomTags = ClrStackViewCustomTags;
var StackInput = ClrStackInput;
var StackSelect = ClrStackSelect;
var STACK_VIEW_DIRECTIVES = CLR_STACK_VIEW_DIRECTIVES;
var NB_INSTANCES = 0;
var UNIQUE_ID = new core.InjectionToken('UNIQUE_ID');
function uniqueIdFactory() {
    return 'clr-id-' + NB_INSTANCES++;
}
var UNIQUE_ID_PROVIDER = {
    provide: UNIQUE_ID,
    useFactory: uniqueIdFactory,
};
var AbstractTreeSelection = /** @class */ (function () {
    function AbstractTreeSelection(parent) {
        this.parent = parent;
        this._selected = false;
        this._indeterminate = false;
    }
    Object.defineProperty(AbstractTreeSelection.prototype, "selected", {
        get: function () {
            return this._selected;
        },
        set: function (value) {
            this._selected = value;
            this.indeterminate = false;
            this.children.forEach(function (child) { return child.parentChanged(value); });
            if (this.parent) {
                this.parent.childChanged();
            }
            this.selectedChanged();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractTreeSelection.prototype, "indeterminate", {
        get: function () {
            return this._indeterminate;
        },
        set: function (value) {
            value = !!value;
            if (this._indeterminate !== value) {
                this._indeterminate = value;
                this.indeterminateChanged();
            }
        },
        enumerable: true,
        configurable: true
    });
    AbstractTreeSelection.prototype.childChanged = function () {
        var oneSelectedChild = false;
        var previousSelectedValue = this._selected;
        var previousIndeterminateValue = this._indeterminate;
        this._selected = true;
        this._indeterminate = false;
        try {
            for (var _a = __values(this.children), _b = _a.next(); !_b.done; _b = _a.next()) {
                var child = _b.value;
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
        }
        catch (e_7_1) { e_7 = { error: e_7_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_7) throw e_7.error; }
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
        var e_7, _c;
    };
    AbstractTreeSelection.prototype.parentChanged = function (selected) {
        if (selected && !this.selected) {
            this._selected = true;
            this.indeterminate = false;
            this.children.forEach(function (child) { return child.parentChanged(true); });
            this.selectedChanged();
        }
        if (!selected && (this.selected || this.indeterminate)) {
            this._selected = false;
            this.indeterminate = false;
            this.children.forEach(function (child) { return child.parentChanged(false); });
            this.selectedChanged();
        }
    };
    return AbstractTreeSelection;
}());
var TreeSelectionService = /** @class */ (function () {
    function TreeSelectionService() {
        this.selectable = false;
    }
    return TreeSelectionService;
}());
TreeSelectionService.decorators = [
    { type: core.Injectable },
];
function clrTreeSelectionProviderFactory(existing) {
    return existing || new TreeSelectionService();
}
var ɵ0 = clrTreeSelectionProviderFactory;
var ClrTreeNode = /** @class */ (function (_super) {
    __extends(ClrTreeNode, _super);
    function ClrTreeNode(nodeExpand, parent, treeSelectionService, nodeId) {
        var _this = _super.call(this, parent) || this;
        _this.nodeExpand = nodeExpand;
        _this.parent = parent;
        _this.treeSelectionService = treeSelectionService;
        _this.nodeId = nodeId;
        _this._children = [];
        _this.nodeSelectedChange = new core.EventEmitter(true);
        _this.nodeIndeterminateChanged = new core.EventEmitter(true);
        if (_this.parent) {
            _this.parent.register(_this);
        }
        return _this;
    }
    Object.defineProperty(ClrTreeNode.prototype, "children", {
        get: function () {
            return this._children;
        },
        enumerable: true,
        configurable: true
    });
    ClrTreeNode.prototype.checkIfChildNodeRegistered = function (node) {
        return this.children.indexOf(node) > -1;
    };
    ClrTreeNode.prototype.register = function (node) {
        if (!this.checkIfChildNodeRegistered(node)) {
            this.children.push(node);
            if (this.selectable) {
                if (this.selected) {
                    node.parentChanged(this.selected);
                }
            }
        }
    };
    ClrTreeNode.prototype.unregister = function (node) {
        var index = this.children.indexOf(node);
        if (index > -1) {
            this.children.splice(index, 1);
        }
    };
    ClrTreeNode.prototype.activateSelection = function () {
        if (this.treeSelectionService && !this.treeSelectionService.selectable) {
            this.treeSelectionService.selectable = true;
        }
    };
    Object.defineProperty(ClrTreeNode.prototype, "nodeSelected", {
        set: function (value) {
            this.activateSelection();
            if (value === undefined || value === null) {
                return;
            }
            if (this.selected !== value) {
                this.selected = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    ClrTreeNode.prototype.selectedChanged = function () {
        this.nodeSelectedChange.emit(this.selected);
    };
    Object.defineProperty(ClrTreeNode.prototype, "selectable", {
        get: function () {
            if (this.treeSelectionService) {
                return this.treeSelectionService.selectable;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTreeNode.prototype, "nodeIndeterminate", {
        set: function (value) {
            this.indeterminate = value;
            this.activateSelection();
        },
        enumerable: true,
        configurable: true
    });
    ClrTreeNode.prototype.indeterminateChanged = function () {
        this.nodeIndeterminateChanged.emit(this.indeterminate);
    };
    ClrTreeNode.prototype.toggleExpand = function () {
        this.nodeExpand.expanded = !this.nodeExpand.expanded;
    };
    Object.defineProperty(ClrTreeNode.prototype, "caretDirection", {
        get: function () {
            return this.nodeExpand.expanded ? 'down' : 'right';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTreeNode.prototype, "expanded", {
        get: function () {
            return this.nodeExpand.expanded;
        },
        set: function (value) {
            value = !!value;
            if (this.nodeExpand.expanded !== value) {
                this.nodeExpand.expanded = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTreeNode.prototype, "state", {
        get: function () {
            return this.expanded && !this.nodeExpand.loading ? 'expanded' : 'collapsed';
        },
        enumerable: true,
        configurable: true
    });
    ClrTreeNode.prototype.ngOnDestroy = function () {
        if (this.parent) {
            this.parent.unregister(this);
        }
    };
    return ClrTreeNode;
}(AbstractTreeSelection));
ClrTreeNode.decorators = [
    { type: core.Component, args: [{
                selector: 'clr-tree-node',
                template: "<!--\n  ~ Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.\n  ~ This software is released under MIT license.\n  ~ The full license information can be found in LICENSE in the root directory of this project.\n  -->\n\n<div class=\"clr-tree-node-content-container\">\n    <button\n        type=\"button\"\n        class=\"clr-treenode-caret\"\n        (click)=\"toggleExpand()\"\n        *ngIf=\"nodeExpand.expandable && !nodeExpand.loading\">\n        <clr-icon\n            class=\"clr-treenode-caret-icon\"\n            shape=\"caret\"\n            [attr.dir]=\"caretDirection\"></clr-icon>\n    </button>\n    <div class=\"clr-treenode-spinner-container\" *ngIf=\"nodeExpand.expandable && nodeExpand.loading\">\n        <span class=\"clr-treenode-spinner spinner\">\n            Loading...\n        </span>\n    </div>\n    <clr-checkbox\n        class=\"clr-treenode-checkbox\"\n        *ngIf=\"selectable\"\n        [(ngModel)]=\"selected\"\n        [(clrIndeterminate)]=\"indeterminate\"\n        [clrAriaLabeledBy]=\"nodeId\"></clr-checkbox>\n    <div class=\"clr-treenode-content\" [id]=\"nodeId\">\n        <ng-content></ng-content>\n    </div>\n</div>\n<!-- FIXME: remove this string concatenation when boolean states are supported -->\n<div\n    class=\"clr-treenode-children\"\n    [@childNodesState]=\"state\">\n    <ng-content select=\"clr-tree-node\"></ng-content>\n    <ng-content select=\"[clrIfExpanded]\"></ng-content>\n</div>\n",
                providers: [
                    Expand,
                    { provide: LoadingListener, useExisting: Expand },
                    {
                        provide: TreeSelectionService,
                        useFactory: ɵ0,
                        deps: [[new core.Optional(), new core.SkipSelf(), TreeSelectionService]],
                    },
                    UNIQUE_ID_PROVIDER,
                ],
                animations: [
                    animations.trigger('childNodesState', [
                        animations.state('expanded', animations.style({ height: '*', 'overflow-y': 'hidden' })),
                        animations.state('collapsed', animations.style({ height: 0, 'overflow-y': 'hidden' })),
                        animations.transition('expanded <=> collapsed', animations.animate('0.2s ease-in-out')),
                    ]),
                ],
                host: { class: 'clr-tree-node' },
            },] },
];
ClrTreeNode.ctorParameters = function () { return [
    { type: Expand, },
    { type: ClrTreeNode, decorators: [{ type: core.Optional }, { type: core.SkipSelf },] },
    { type: TreeSelectionService, },
    { type: undefined, decorators: [{ type: core.Inject, args: [UNIQUE_ID,] },] },
]; };
ClrTreeNode.propDecorators = {
    "nodeSelected": [{ type: core.Input, args: ['clrSelected',] },],
    "nodeSelectedChange": [{ type: core.Output, args: ['clrSelectedChange',] },],
    "nodeIndeterminate": [{ type: core.Input, args: ['clrIndeterminate',] },],
    "nodeIndeterminateChanged": [{ type: core.Output, args: ['clrIndeterminateChange',] },],
};
var CLR_TREE_VIEW_DIRECTIVES = [ClrTreeNode];
var ClrTreeViewModule = /** @class */ (function () {
    function ClrTreeViewModule() {
    }
    return ClrTreeViewModule;
}());
ClrTreeViewModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [common.CommonModule, ClrIconModule, forms.FormsModule, ClrFormsModule],
                declarations: [CLR_TREE_VIEW_DIRECTIVES],
                exports: [CLR_TREE_VIEW_DIRECTIVES, ClrIfExpandModule],
            },] },
];
var TreeNode = ClrTreeNode;
var TREE_VIEW_DIRECTIVES = CLR_TREE_VIEW_DIRECTIVES;
var ClrDataModule = /** @class */ (function () {
    function ClrDataModule() {
    }
    return ClrDataModule;
}());
ClrDataModule.decorators = [
    { type: core.NgModule, args: [{ exports: [ClrDatagridModule, ClrStackViewModule, ClrTreeViewModule] },] },
];
var RootDropdownService = /** @class */ (function () {
    function RootDropdownService() {
        this._changes = new rxjs.Subject();
    }
    Object.defineProperty(RootDropdownService.prototype, "changes", {
        get: function () {
            return this._changes.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    RootDropdownService.prototype.closeMenus = function () {
        this._changes.next(false);
    };
    return RootDropdownService;
}());
RootDropdownService.decorators = [
    { type: core.Injectable },
];
function clrRootDropdownFactory(existing) {
    return existing || new RootDropdownService();
}
var ROOT_DROPDOWN_PROVIDER = {
    provide: RootDropdownService,
    useFactory: clrRootDropdownFactory,
    deps: [[new core.Optional(), new core.SkipSelf(), RootDropdownService]],
};
var ClrDropdown = /** @class */ (function () {
    function ClrDropdown(parent, ifOpenService, dropdownService) {
        var _this = this;
        this.parent = parent;
        this.ifOpenService = ifOpenService;
        this.isMenuClosable = true;
        this._subscription = dropdownService.changes.subscribe(function (value) { return (_this.ifOpenService.open = value); });
    }
    ClrDropdown.prototype.ngOnDestroy = function () {
        this._subscription.unsubscribe();
    };
    return ClrDropdown;
}());
ClrDropdown.decorators = [
    { type: core.Component, args: [{
                selector: 'clr-dropdown',
                template: '<ng-content></ng-content>',
                host: {
                    '[class.dropdown]': 'true',
                    '[class.open]': 'ifOpenService.open',
                },
                providers: [IfOpenService, ROOT_DROPDOWN_PROVIDER, { provide: POPOVER_HOST_ANCHOR, useExisting: core.ElementRef }],
            },] },
];
ClrDropdown.ctorParameters = function () { return [
    { type: ClrDropdown, decorators: [{ type: core.SkipSelf }, { type: core.Optional },] },
    { type: IfOpenService, },
    { type: RootDropdownService, },
]; };
ClrDropdown.propDecorators = {
    "isMenuClosable": [{ type: core.Input, args: ['clrCloseMenuOnItemClick',] },],
};
var ClrDropdownItem = /** @class */ (function () {
    function ClrDropdownItem(dropdown, el, _dropdownService, renderer) {
        this.dropdown = dropdown;
        this.el = el;
        this._dropdownService = _dropdownService;
        this.renderer = renderer;
    }
    ClrDropdownItem.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.renderer.listen(this.el.nativeElement, 'click', function () { return _this.onDropdownItemClick(); });
    };
    ClrDropdownItem.prototype.onDropdownItemClick = function () {
        if (this.dropdown.isMenuClosable && !this.el.nativeElement.classList.contains('disabled')) {
            this._dropdownService.closeMenus();
        }
    };
    return ClrDropdownItem;
}());
ClrDropdownItem.decorators = [
    { type: core.Directive, args: [{ selector: '[clrDropdownItem]', host: { '[class.dropdown-item]': 'true' } },] },
];
ClrDropdownItem.ctorParameters = function () { return [
    { type: ClrDropdown, },
    { type: core.ElementRef, },
    { type: RootDropdownService, },
    { type: core.Renderer2, },
]; };
var ClrDropdownMenu = /** @class */ (function (_super) {
    __extends(ClrDropdownMenu, _super);
    function ClrDropdownMenu(injector, parentHost, nested) {
        var _this = this;
        if (!parentHost) {
            throw new Error('clr-dropdown-menu should only be used inside of a clr-dropdown');
        }
        _this = _super.call(this, injector, parentHost) || this;
        if (!nested) {
            _this.anchorPoint = Point.BOTTOM_LEFT;
            _this.popoverPoint = Point.LEFT_TOP;
        }
        else {
            _this.anchorPoint = Point.RIGHT_TOP;
            _this.popoverPoint = Point.LEFT_TOP;
        }
        _this.popoverOptions.allowMultipleOpen = true;
        _this.closeOnOutsideClick = true;
        return _this;
    }
    Object.defineProperty(ClrDropdownMenu.prototype, "position", {
        set: function (position) {
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
    return ClrDropdownMenu;
}(AbstractPopover));
ClrDropdownMenu.decorators = [
    { type: core.Component, args: [{
                selector: 'clr-dropdown-menu',
                template: "\n        <ng-content></ng-content>\n    ",
                host: {
                    '[class.dropdown-menu]': 'true',
                },
            },] },
];
ClrDropdownMenu.ctorParameters = function () { return [
    { type: core.Injector, },
    { type: core.ElementRef, decorators: [{ type: core.Optional }, { type: core.Inject, args: [POPOVER_HOST_ANCHOR,] },] },
    { type: ClrDropdownMenu, decorators: [{ type: core.Optional }, { type: core.SkipSelf },] },
]; };
ClrDropdownMenu.propDecorators = {
    "position": [{ type: core.Input, args: ['clrPosition',] },],
};
var ClrDropdownTrigger = /** @class */ (function () {
    function ClrDropdownTrigger(dropdown, ifOpenService) {
        this.ifOpenService = ifOpenService;
        this.isRootLevelToggle = true;
        if (dropdown.parent) {
            this.isRootLevelToggle = false;
        }
    }
    Object.defineProperty(ClrDropdownTrigger.prototype, "active", {
        get: function () {
            return this.ifOpenService.open;
        },
        enumerable: true,
        configurable: true
    });
    ClrDropdownTrigger.prototype.onDropdownTriggerClick = function (event) {
        this.ifOpenService.toggleWithEvent(event);
    };
    return ClrDropdownTrigger;
}());
ClrDropdownTrigger.decorators = [
    { type: core.Directive, args: [{
                selector: '[clrDropdownTrigger],[clrDropdownToggle]',
                host: {
                    '[class.dropdown-toggle]': 'isRootLevelToggle',
                    '[class.dropdown-item]': '!isRootLevelToggle',
                    '[class.expandable]': '!isRootLevelToggle',
                    '[class.active]': 'active',
                },
            },] },
];
ClrDropdownTrigger.ctorParameters = function () { return [
    { type: ClrDropdown, },
    { type: IfOpenService, },
]; };
ClrDropdownTrigger.propDecorators = {
    "onDropdownTriggerClick": [{ type: core.HostListener, args: ['click', ['$event'],] },],
};
var CLR_DROPDOWN_DIRECTIVES = [ClrDropdown, ClrDropdownMenu, ClrDropdownTrigger, ClrDropdownItem];
var ClrDropdownModule = /** @class */ (function () {
    function ClrDropdownModule() {
    }
    return ClrDropdownModule;
}());
ClrDropdownModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [common.CommonModule, ClrCommonPopoverModule],
                declarations: [CLR_DROPDOWN_DIRECTIVES],
                exports: [CLR_DROPDOWN_DIRECTIVES, ClrConditionalModule, ClrIconModule],
            },] },
];
var Dropdown = ClrDropdown;
var DropdownMenu = ClrDropdownMenu;
var DropdownTrigger = ClrDropdownTrigger;
var DropdownItem = ClrDropdownItem;
var menuPositions = CLR_MENU_POSITIONS;
var DROPDOWN_DIRECTIVES = CLR_DROPDOWN_DIRECTIVES;
var ALERT_TYPES = [
    'alert-info',
    'alert-warning',
    'alert-danger',
    'alert-success',
    'info',
    'warning',
    'danger',
    'success',
];
var AlertIconAndTypesService = /** @class */ (function () {
    function AlertIconAndTypesService() {
        this.defaultIconShape = 'info-circle';
        this._alertIconShape = '';
        this._alertType = 'info';
    }
    Object.defineProperty(AlertIconAndTypesService.prototype, "alertType", {
        get: function () {
            return this._alertType;
        },
        set: function (val) {
            if (ALERT_TYPES.indexOf(val) > -1) {
                this._alertType = val;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AlertIconAndTypesService.prototype, "alertIconShape", {
        get: function () {
            if ('' === this._alertIconShape) {
                return this.iconInfoFromType(this._alertType).shape;
            }
            return this._alertIconShape;
        },
        set: function (val) {
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
    AlertIconAndTypesService.prototype.iconInfoFromType = function (type, classOrShape) {
        if (classOrShape === void 0) { classOrShape = 'shape'; }
        var returnObj = { shape: '', cssClass: '' };
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
    };
    return AlertIconAndTypesService;
}());
AlertIconAndTypesService.decorators = [
    { type: core.Injectable },
];
var MultiAlertService = /** @class */ (function () {
    function MultiAlertService() {
        this.allAlerts = new core.QueryList();
        this._current = 0;
        this._change = new rxjs.Subject();
    }
    Object.defineProperty(MultiAlertService.prototype, "changes", {
        get: function () {
            return this._change.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiAlertService.prototype, "current", {
        get: function () {
            return this._current;
        },
        set: function (index) {
            if (index !== this._current) {
                this._current = index;
                this._change.next(index);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiAlertService.prototype, "activeAlerts", {
        get: function () {
            return this.allAlerts.filter(function (alert) { return !alert._closed; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiAlertService.prototype, "currentAlert", {
        get: function () {
            return this.activeAlerts[this.current];
        },
        set: function (alert) {
            this.current = this.activeAlerts.indexOf(alert);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiAlertService.prototype, "count", {
        get: function () {
            return this.activeAlerts.length;
        },
        enumerable: true,
        configurable: true
    });
    MultiAlertService.prototype.manage = function (alerts) {
        this.allAlerts = alerts;
    };
    MultiAlertService.prototype.next = function () {
        this.current = this.current === this.activeAlerts.length - 1 ? 0 : this.current + 1;
    };
    MultiAlertService.prototype.previous = function () {
        if (this.activeAlerts.length === 0) {
            return;
        }
        this.current = this.current === 0 ? this.activeAlerts.length - 1 : this.current - 1;
    };
    MultiAlertService.prototype.close = function () {
        this.previous();
    };
    return MultiAlertService;
}());
MultiAlertService.decorators = [
    { type: core.Injectable },
];
var ClrAlert = /** @class */ (function () {
    function ClrAlert(iconService, cdr, multiAlertService) {
        this.iconService = iconService;
        this.cdr = cdr;
        this.multiAlertService = multiAlertService;
        this.isSmall = false;
        this.closable = true;
        this.isAppLevel = false;
        this._closed = false;
        this._closedChanged = new core.EventEmitter(false);
        this.previouslyHidden = false;
        this.hidden = false;
    }
    Object.defineProperty(ClrAlert.prototype, "alertType", {
        get: function () {
            return this.iconService.alertType;
        },
        set: function (val) {
            this.iconService.alertType = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrAlert.prototype, "alertIconShape", {
        set: function (value) {
            this.iconService.alertIconShape = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrAlert.prototype, "alertClass", {
        get: function () {
            return this.iconService.iconInfoFromType(this.iconService.alertType).cssClass;
        },
        enumerable: true,
        configurable: true
    });
    ClrAlert.prototype.detectChangesIfNeeded = function () {
        if (this.previouslyHidden !== this.hidden) {
            this.previouslyHidden = this.hidden;
            this.cdr.detectChanges();
        }
    };
    Object.defineProperty(ClrAlert.prototype, "isHidden", {
        get: function () {
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
        },
        enumerable: true,
        configurable: true
    });
    ClrAlert.prototype.close = function () {
        if (!this.closable) {
            return;
        }
        this._closed = true;
        if (this.multiAlertService) {
            this.multiAlertService.close();
        }
        this._closedChanged.emit(true);
    };
    ClrAlert.prototype.open = function () {
        this._closed = false;
        this._closedChanged.emit(false);
    };
    return ClrAlert;
}());
ClrAlert.decorators = [
    { type: core.Component, args: [{ selector: 'clr-alert', providers: [AlertIconAndTypesService], template: "<!--\n  ~ Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.\n  ~ This software is released under MIT license.\n  ~ The full license information can be found in LICENSE in the root directory of this project.\n  -->\n\n<div\n    *ngIf=\"!_closed\"\n    class=\"alert\"\n    [ngClass]=\"alertClass\"\n    [class.alert-hidden]=\"isHidden\"\n    [class.alert-sm]=\"isSmall\"\n    [class.alert-app-level]=\"isAppLevel\">\n    <div class=\"alert-items\">\n        <ng-content></ng-content>\n    </div>\n    <button type=\"button\" class=\"close\" aria-label=\"Close\" *ngIf=\"closable\" (click)=\"close()\">\n        <clr-icon aria-hidden=\"true\" shape=\"close\"></clr-icon>\n    </button>\n</div>\n" },] },
];
ClrAlert.ctorParameters = function () { return [
    { type: AlertIconAndTypesService, },
    { type: core.ChangeDetectorRef, },
    { type: MultiAlertService, decorators: [{ type: core.Optional },] },
]; };
ClrAlert.propDecorators = {
    "isSmall": [{ type: core.Input, args: ['clrAlertSizeSmall',] },],
    "closable": [{ type: core.Input, args: ['clrAlertClosable',] },],
    "isAppLevel": [{ type: core.Input, args: ['clrAlertAppLevel',] },],
    "_closed": [{ type: core.Input, args: ['clrAlertClosed',] },],
    "_closedChanged": [{ type: core.Output, args: ['clrAlertClosedChange',] },],
    "alertType": [{ type: core.Input, args: ['clrAlertType',] },],
    "alertIconShape": [{ type: core.Input, args: ['clrAlertIcon',] },],
};
var ClrAlertItem = /** @class */ (function () {
    function ClrAlertItem(iconService) {
        this.iconService = iconService;
    }
    return ClrAlertItem;
}());
ClrAlertItem.decorators = [
    { type: core.Component, args: [{
                selector: '.alert-item:not(.static), clr-alert-item',
                template: "\n        <div class=\"alert-icon-wrapper\">\n            <clr-icon class=\"alert-icon\" [attr.shape]=\"iconService.alertIconShape\"></clr-icon>\n        </div>\n        <ng-content></ng-content>\n    ",
                host: { class: 'alert-item' },
            },] },
];
ClrAlertItem.ctorParameters = function () { return [
    { type: AlertIconAndTypesService, },
]; };
var ClrAlerts = /** @class */ (function () {
    function ClrAlerts(multiAlertService) {
        this.multiAlertService = multiAlertService;
        this.currentAlertIndexChange = new core.EventEmitter(false);
        this.currentAlertChange = new core.EventEmitter(false);
    }
    Object.defineProperty(ClrAlerts.prototype, "_inputCurrentIndex", {
        set: function (index) {
            if (Number.isInteger(index) && index >= 0) {
                this.multiAlertService.current = index;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrAlerts.prototype, "currentAlertIndex", {
        get: function () {
            return this.multiAlertService.current;
        },
        set: function (index) {
            this.multiAlertService.current = index;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrAlerts.prototype, "currentAlert", {
        get: function () {
            return this.multiAlertService.currentAlert;
        },
        set: function (alert) {
            if (alert) {
                this.multiAlertService.currentAlert = alert;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrAlerts.prototype, "alerts", {
        get: function () {
            return this.allAlerts.filter(function (alert) {
                return alert.isHidden === false;
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrAlerts.prototype, "currentAlertType", {
        get: function () {
            if (this.multiAlertService.currentAlert) {
                return this.multiAlertService.currentAlert.alertType;
            }
            return '';
        },
        enumerable: true,
        configurable: true
    });
    ClrAlerts.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.multiAlertService.manage(this.allAlerts);
        this.multiAlertService.changes.subscribe(function (index) {
            _this.currentAlertIndexChange.next(index);
            _this.currentAlertChange.next(_this.multiAlertService.currentAlert);
        });
    };
    return ClrAlerts;
}());
ClrAlerts.decorators = [
    { type: core.Component, args: [{
                selector: 'clr-alerts',
                template: "<!--\n  ~ Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.\n  ~ This software is released under MIT license.\n  ~ The full license information can be found in LICENSE in the root directory of this project.\n  -->\n\n<clr-alerts-pager\n        *ngIf=\"multiAlertService.count > 1\"\n        [clrCurrentAlertIndex]=\"currentAlertIndex\">\n</clr-alerts-pager>\n<ng-content select=\"clr-alert\"></ng-content>\n",
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
ClrAlerts.ctorParameters = function () { return [
    { type: MultiAlertService, },
]; };
ClrAlerts.propDecorators = {
    "allAlerts": [{ type: core.ContentChildren, args: [ClrAlert,] },],
    "_inputCurrentIndex": [{ type: core.Input, args: ['clrCurrentAlertIndex',] },],
    "currentAlertIndexChange": [{ type: core.Output, args: ['clrCurrentAlertIndexChange',] },],
    "currentAlert": [{ type: core.Input, args: ['clrCurrentAlert',] },],
    "currentAlertChange": [{ type: core.Output, args: ['clrCurrentAlertChange',] },],
};
var ClrAlertsPager = /** @class */ (function () {
    function ClrAlertsPager(multiAlertService) {
        this.multiAlertService = multiAlertService;
        this.currentAlertChange = new core.EventEmitter(false);
        this.currentAlertIndexChange = new core.EventEmitter();
    }
    Object.defineProperty(ClrAlertsPager.prototype, "currentAlert", {
        get: function () {
            return this.multiAlertService.currentAlert;
        },
        set: function (alert) {
            if (alert) {
                this.multiAlertService.currentAlert = alert;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrAlertsPager.prototype, "currentAlertIndex", {
        get: function () {
            return this.multiAlertService.current;
        },
        set: function (index) {
            this.multiAlertService.current = index;
        },
        enumerable: true,
        configurable: true
    });
    ClrAlertsPager.prototype.ngOnInit = function () {
        var _this = this;
        this.multiAlertServiceChanges = this.multiAlertService.changes.subscribe(function (index) {
            _this.currentAlertIndexChange.emit(index);
            _this.currentAlertChange.emit(_this.multiAlertService.activeAlerts[index]);
        });
    };
    ClrAlertsPager.prototype.pageUp = function () {
        this.multiAlertService.next();
    };
    ClrAlertsPager.prototype.pageDown = function () {
        this.multiAlertService.previous();
    };
    ClrAlertsPager.prototype.ngOnDestroy = function () {
        this.multiAlertServiceChanges.unsubscribe();
    };
    return ClrAlertsPager;
}());
ClrAlertsPager.decorators = [
    { type: core.Component, args: [{
                selector: 'clr-alerts-pager',
                template: "<!--\n  ~ Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.\n  ~ This software is released under MIT license.\n  ~ The full license information can be found in LICENSE in the root directory of this project.\n  -->\n\n<div class=\"alerts-pager-control\">\n    <div class=\"alerts-page-down\">\n        <button class=\"alerts-pager-button\" (click)=\"pageDown()\">\n            <clr-icon shape=\"caret left\"></clr-icon>\n        </button>\n    </div>\n    <div class=\"alerts-pager-text\">\n        {{this.multiAlertService.current+1}} / {{this.multiAlertService.count}}\n    </div>\n    <div class=\"alerts-page-up\">\n        <button class=\"alerts-pager-button\" (click)=\"pageUp()\">\n            <clr-icon shape=\"caret right\"></clr-icon>\n        </button>\n    </div>\n</div>\n",
                host: { '[class.alerts-pager]': 'true' },
            },] },
];
ClrAlertsPager.ctorParameters = function () { return [
    { type: MultiAlertService, },
]; };
ClrAlertsPager.propDecorators = {
    "currentAlert": [{ type: core.Input, args: ['clrCurrentAlert',] },],
    "currentAlertChange": [{ type: core.Output, args: ['clrCurrentAlertChange',] },],
    "currentAlertIndex": [{ type: core.Input, args: ['clrCurrentAlertIndex',] },],
    "currentAlertIndexChange": [{ type: core.Output, args: ['clrCurrentAlertIndexChange',] },],
};
var CLR_ALERT_DIRECTIVES = [ClrAlert, ClrAlertItem, ClrAlerts, ClrAlertsPager];
var ClrAlertModule = /** @class */ (function () {
    function ClrAlertModule() {
    }
    return ClrAlertModule;
}());
ClrAlertModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [common.CommonModule, ClrIconModule, ClrDropdownModule],
                declarations: [CLR_ALERT_DIRECTIVES],
                exports: [CLR_ALERT_DIRECTIVES],
            },] },
];
var Alert = ClrAlert;
var AlertItem = ClrAlertItem;
var Alerts = ClrAlerts;
var AlertsPager = ClrAlertsPager;
var ALERT_DIRECTIVES = CLR_ALERT_DIRECTIVES;
var ClrEmphasisModule = /** @class */ (function () {
    function ClrEmphasisModule() {
    }
    return ClrEmphasisModule;
}());
ClrEmphasisModule.decorators = [
    { type: core.NgModule, args: [{ exports: [ClrAlertModule] },] },
];
var ResponsiveNavCodes = /** @class */ (function () {
    function ResponsiveNavCodes() {
    }
    return ResponsiveNavCodes;
}());
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
var ResponsiveNavControlMessage = /** @class */ (function () {
    function ResponsiveNavControlMessage(_controlCode, _navLevel) {
        this._controlCode = _controlCode;
        this._navLevel = _navLevel;
    }
    Object.defineProperty(ResponsiveNavControlMessage.prototype, "controlCode", {
        get: function () {
            return this._controlCode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResponsiveNavControlMessage.prototype, "navLevel", {
        get: function () {
            return this._navLevel;
        },
        enumerable: true,
        configurable: true
    });
    return ResponsiveNavControlMessage;
}());
var ResponsiveNavigationService = /** @class */ (function () {
    function ResponsiveNavigationService() {
        this.responsiveNavList = [];
        this.registerNavSubject = new rxjs.Subject();
        this.controlNavSubject = new rxjs.Subject();
        this.closeAllNavs();
    }
    Object.defineProperty(ResponsiveNavigationService.prototype, "registeredNavs", {
        get: function () {
            return this.registerNavSubject.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResponsiveNavigationService.prototype, "navControl", {
        get: function () {
            return this.controlNavSubject.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    ResponsiveNavigationService.prototype.registerNav = function (navLevel) {
        if (!navLevel || this.isNavRegistered(navLevel)) {
            return;
        }
        this.responsiveNavList.push(navLevel);
        this.registerNavSubject.next(this.responsiveNavList);
    };
    ResponsiveNavigationService.prototype.isNavRegistered = function (navLevel) {
        if (this.responsiveNavList.indexOf(navLevel) > -1) {
            console.error('Multiple clr-nav-level ' + navLevel + ' attributes found. Please make sure that only one exists');
            return true;
        }
        return false;
    };
    ResponsiveNavigationService.prototype.unregisterNav = function (navLevel) {
        var index = this.responsiveNavList.indexOf(navLevel);
        if (index > -1) {
            this.responsiveNavList.splice(index, 1);
            this.registerNavSubject.next(this.responsiveNavList);
        }
    };
    ResponsiveNavigationService.prototype.sendControlMessage = function (controlCode, navLevel) {
        var message = new ResponsiveNavControlMessage(controlCode, navLevel);
        this.controlNavSubject.next(message);
    };
    ResponsiveNavigationService.prototype.closeAllNavs = function () {
        var message = new ResponsiveNavControlMessage(ResponsiveNavCodes.NAV_CLOSE_ALL, -999);
        this.controlNavSubject.next(message);
    };
    return ResponsiveNavigationService;
}());
ResponsiveNavigationService.decorators = [
    { type: core.Injectable },
];
ResponsiveNavigationService.ctorParameters = function () { return []; };
var ClrMainContainer = /** @class */ (function () {
    function ClrMainContainer(elRef, responsiveNavService) {
        this.elRef = elRef;
        this.responsiveNavService = responsiveNavService;
    }
    ClrMainContainer.prototype.ngOnInit = function () {
        var _this = this;
        this._classList = this.elRef.nativeElement.classList;
        this._subscription = this.responsiveNavService.navControl.subscribe({
            next: function (message) {
                _this.processMessage(message);
            },
        });
    };
    ClrMainContainer.prototype.processMessage = function (message) {
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
    ClrMainContainer.prototype.controlNav = function (controlCode, navClass) {
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
    ClrMainContainer.prototype.ngOnDestroy = function () {
        this._subscription.unsubscribe();
    };
    return ClrMainContainer;
}());
ClrMainContainer.decorators = [
    { type: core.Directive, args: [{ selector: 'clr-main-container', host: { '[class.main-container]': 'true' } },] },
];
ClrMainContainer.ctorParameters = function () { return [
    { type: core.ElementRef, },
    { type: ResponsiveNavigationService, },
]; };
var CLR_LAYOUT_DIRECTIVES = [ClrMainContainer];
var ClrMainContainerModule = /** @class */ (function () {
    function ClrMainContainerModule() {
    }
    return ClrMainContainerModule;
}());
ClrMainContainerModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [common.CommonModule, ClrIconModule],
                declarations: [CLR_LAYOUT_DIRECTIVES],
                exports: [CLR_LAYOUT_DIRECTIVES],
            },] },
];
var MainContainer = ClrMainContainer;
var LAYOUT_DIRECTIVES = CLR_LAYOUT_DIRECTIVES;
var MainContainerWillyWonka = /** @class */ (function (_super) {
    __extends(MainContainerWillyWonka, _super);
    function MainContainerWillyWonka() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MainContainerWillyWonka;
}(WillyWonka));
MainContainerWillyWonka.decorators = [
    { type: core.Directive, args: [{ selector: 'clr-main-container' },] },
];
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
        get: function () {
            return this.responsiveNavService.responsiveNavList.reduce(function (sum, navLevel) { return sum + navLevel; }, 0);
        },
        enumerable: true,
        configurable: true
    });
    return NavDetectionOompaLoompa;
}(OompaLoompa));
NavDetectionOompaLoompa.decorators = [
    { type: core.Directive, args: [{ selector: 'clr-header' },] },
];
NavDetectionOompaLoompa.ctorParameters = function () { return [
    { type: core.ChangeDetectorRef, },
    { type: MainContainerWillyWonka, decorators: [{ type: core.Optional },] },
    { type: ResponsiveNavigationService, },
]; };
var ClrHeader = /** @class */ (function () {
    function ClrHeader(responsiveNavService) {
        var _this = this;
        this.responsiveNavService = responsiveNavService;
        this.isNavLevel1OnPage = false;
        this.isNavLevel2OnPage = false;
        this._subscription = this.responsiveNavService.registeredNavs.subscribe({
            next: function (navLevelList) {
                _this.initializeNavTriggers(navLevelList);
            },
        });
    }
    Object.defineProperty(ClrHeader.prototype, "responsiveNavCodes", {
        get: function () {
            return ResponsiveNavCodes;
        },
        enumerable: true,
        configurable: true
    });
    ClrHeader.prototype.resetNavTriggers = function () {
        this.isNavLevel1OnPage = false;
        this.isNavLevel2OnPage = false;
    };
    ClrHeader.prototype.initializeNavTriggers = function (navList) {
        var _this = this;
        this.resetNavTriggers();
        if (navList.length > 2) {
            console.error('More than 2 Nav Levels detected.');
            return;
        }
        navList.forEach(function (navLevel) {
            if (navLevel === ResponsiveNavCodes.NAV_LEVEL_1) {
                _this.isNavLevel1OnPage = true;
            }
            else if (navLevel === ResponsiveNavCodes.NAV_LEVEL_2) {
                _this.isNavLevel2OnPage = true;
            }
        });
    };
    ClrHeader.prototype.closeOpenNav = function () {
        this.responsiveNavService.closeAllNavs();
    };
    ClrHeader.prototype.toggleNav = function (navLevel) {
        this.responsiveNavService.sendControlMessage(ResponsiveNavCodes.NAV_TOGGLE, navLevel);
    };
    ClrHeader.prototype.ngOnDestroy = function () {
        this._subscription.unsubscribe();
    };
    return ClrHeader;
}());
ClrHeader.decorators = [
    { type: core.Component, args: [{
                selector: 'clr-header',
                template: "\n        <button\n            type=\"button\"\n            *ngIf=\"isNavLevel1OnPage\"\n            class=\"header-hamburger-trigger\"\n            (click)=\"toggleNav(responsiveNavCodes.NAV_LEVEL_1)\">\n            <span></span>\n        </button>\n        <ng-content></ng-content>\n        <button\n            type=\"button\"\n            *ngIf=\"isNavLevel2OnPage\"\n            class=\"header-overflow-trigger\"\n            (click)=\"toggleNav(responsiveNavCodes.NAV_LEVEL_2)\">\n            <span></span>\n        </button>\n        <div class=\"header-backdrop\" (click)=\"closeOpenNav()\"></div>\n    ",
                host: { '[class.header]': 'true' },
            },] },
];
ClrHeader.ctorParameters = function () { return [
    { type: ResponsiveNavigationService, },
]; };
var ClrNavLevel = /** @class */ (function () {
    function ClrNavLevel(responsiveNavService, elementRef) {
        this.responsiveNavService = responsiveNavService;
        this.elementRef = elementRef;
    }
    ClrNavLevel.prototype.ngOnInit = function () {
        if (this.level !== ResponsiveNavCodes.NAV_LEVEL_1 && this.level !== ResponsiveNavCodes.NAV_LEVEL_2) {
            console.error('Nav Level can only be 1 or 2');
            return;
        }
        this.responsiveNavService.registerNav(this.level);
        this.addNavClass(this.level);
    };
    ClrNavLevel.prototype.addNavClass = function (level) {
        var navHostClassList = this.elementRef.nativeElement.classList;
        if (level === ResponsiveNavCodes.NAV_LEVEL_1) {
            navHostClassList.add(ResponsiveNavCodes.NAV_CLASS_LEVEL_1);
        }
        else if (level === ResponsiveNavCodes.NAV_LEVEL_2) {
            navHostClassList.add(ResponsiveNavCodes.NAV_CLASS_LEVEL_2);
        }
    };
    Object.defineProperty(ClrNavLevel.prototype, "level", {
        get: function () {
            return this._level;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrNavLevel.prototype, "responsiveNavCodes", {
        get: function () {
            return ResponsiveNavCodes;
        },
        enumerable: true,
        configurable: true
    });
    ClrNavLevel.prototype.open = function () {
        this.responsiveNavService.sendControlMessage(ResponsiveNavCodes.NAV_OPEN, this.level);
    };
    ClrNavLevel.prototype.close = function () {
        this.responsiveNavService.sendControlMessage(ResponsiveNavCodes.NAV_CLOSE, this.level);
    };
    ClrNavLevel.prototype.onMouseClick = function (target) {
        var current = target;
        var navHost = this.elementRef.nativeElement;
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
    ClrNavLevel.prototype.ngOnDestroy = function () {
        this.responsiveNavService.unregisterNav(this.level);
    };
    return ClrNavLevel;
}());
ClrNavLevel.decorators = [
    { type: core.Directive, args: [{ selector: '[clr-nav-level]' },] },
];
ClrNavLevel.ctorParameters = function () { return [
    { type: ResponsiveNavigationService, },
    { type: core.ElementRef, },
]; };
ClrNavLevel.propDecorators = {
    "_level": [{ type: core.Input, args: ['clr-nav-level',] },],
    "onMouseClick": [{ type: core.HostListener, args: ['click', ['$event.target'],] },],
};
function ResponsiveNavigationProvider(existing) {
    return existing || new ResponsiveNavigationService();
}
var CLR_NAVIGATION_DIRECTIVES = [
    ClrHeader,
    ClrNavLevel,
    NavDetectionOompaLoompa,
    MainContainerWillyWonka,
];
var ɵ0$1 = ResponsiveNavigationProvider;
var ClrNavigationModule = /** @class */ (function () {
    function ClrNavigationModule() {
    }
    return ClrNavigationModule;
}());
ClrNavigationModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [common.CommonModule, ClrIconModule, ClrDropdownModule],
                declarations: [CLR_NAVIGATION_DIRECTIVES],
                providers: [
                    {
                        provide: ResponsiveNavigationService,
                        useFactory: ɵ0$1,
                        deps: [[new core.Optional(), new core.SkipSelf(), ResponsiveNavigationService]],
                    },
                ],
                exports: [CLR_NAVIGATION_DIRECTIVES],
            },] },
];
var Header = ClrHeader;
var NavLevelDirective = ClrNavLevel;
var NAVIGATION_DIRECTIVES = CLR_NAVIGATION_DIRECTIVES;
var TemplateRefContainer = /** @class */ (function () {
    function TemplateRefContainer() {
    }
    return TemplateRefContainer;
}());
TemplateRefContainer.decorators = [
    { type: core.Component, args: [{
                template: "\n      <ng-template>\n        <ng-content></ng-content>\n      </ng-template>\n    ",
            },] },
];
TemplateRefContainer.propDecorators = {
    "template": [{ type: core.ViewChild, args: [core.TemplateRef,] },],
};
var TEMPLATE_REF_DIRECTIVES = [TemplateRefContainer];
var ClrTemplateRefModule = /** @class */ (function () {
    function ClrTemplateRefModule() {
    }
    return ClrTemplateRefModule;
}());
ClrTemplateRefModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [common.CommonModule],
                declarations: [TEMPLATE_REF_DIRECTIVES],
                entryComponents: [TEMPLATE_REF_DIRECTIVES],
                exports: [TEMPLATE_REF_DIRECTIVES],
            },] },
];
var TabsWillyWonka = /** @class */ (function (_super) {
    __extends(TabsWillyWonka, _super);
    function TabsWillyWonka() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TabsWillyWonka;
}(WillyWonka));
TabsWillyWonka.decorators = [
    { type: core.Directive, args: [{ selector: 'clr-tabs' },] },
];
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
        get: function () {
            return this.ifActive.current === this.id;
        },
        enumerable: true,
        configurable: true
    });
    return ActiveOompaLoompa;
}(OompaLoompa));
ActiveOompaLoompa.decorators = [
    { type: core.Directive, args: [{ selector: '[clrTabLink], clr-tab-content' },] },
];
ActiveOompaLoompa.ctorParameters = function () { return [
    { type: core.ChangeDetectorRef, },
    { type: TabsWillyWonka, decorators: [{ type: core.Optional },] },
    { type: undefined, decorators: [{ type: core.Inject, args: [IF_ACTIVE_ID,] },] },
    { type: IfActiveService, },
]; };
var AriaService = /** @class */ (function () {
    function AriaService() {
    }
    return AriaService;
}());
AriaService.decorators = [
    { type: core.Injectable },
];
var TabsService = /** @class */ (function () {
    function TabsService() {
        this._children = [];
    }
    TabsService.prototype.register = function (tab) {
        this._children.push(tab);
    };
    Object.defineProperty(TabsService.prototype, "children", {
        get: function () {
            return this._children;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabsService.prototype, "activeTab", {
        get: function () {
            return this.children.find(function (tab) {
                return tab.active;
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabsService.prototype, "overflowTabs", {
        get: function () {
            return this.children.filter(function (tab) {
                return tab.tabLink.inOverflow === true;
            });
        },
        enumerable: true,
        configurable: true
    });
    TabsService.prototype.unregister = function (tab) {
        var index = this.children.indexOf(tab);
        if (index > -1) {
            this.children.splice(index, 1);
        }
    };
    return TabsService;
}());
TabsService.decorators = [
    { type: core.Injectable },
];
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
        get: function () {
            return this.ariaService.ariaLabelledBy;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTabContent.prototype, "tabContentId", {
        get: function () {
            return this.ariaService.ariaControls;
        },
        set: function (id) {
            this.ariaService.ariaControls = id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTabContent.prototype, "active", {
        get: function () {
            return this.ifActiveService.current === this.id;
        },
        enumerable: true,
        configurable: true
    });
    return ClrTabContent;
}());
ClrTabContent.decorators = [
    { type: core.Component, args: [{
                selector: 'clr-tab-content',
                template: "\n        <ng-content></ng-content>\n    ",
                host: {
                    '[id]': 'tabContentId',
                    '[attr.aria-labelledby]': 'ariaLabelledBy',
                    '[attr.aria-hidden]': '!active',
                    '[attr.data-hidden]': '!active',
                    role: 'tabpanel',
                },
            },] },
];
ClrTabContent.ctorParameters = function () { return [
    { type: IfActiveService, },
    { type: undefined, decorators: [{ type: core.Inject, args: [IF_ACTIVE_ID,] },] },
    { type: AriaService, },
]; };
ClrTabContent.propDecorators = {
    "templateRef": [{ type: core.ViewChild, args: ['tabContentProjectedRef',] },],
    "tabContentId": [{ type: core.Input, args: ['id',] },],
};
var nbTabsComponent = 0;
var TABS_ID = new core.InjectionToken('TABS_ID');
function tokenFactory$1() {
    return 'clr-tabs-' + nbTabsComponent++;
}
var TABS_ID_PROVIDER = {
    provide: TABS_ID,
    useFactory: tokenFactory$1,
};
var nbTabLinkComponents = 0;
var ClrTabLink = /** @class */ (function () {
    function ClrTabLink(ifActiveService, id, ariaService, el, cfr, viewContainerRef, tabsId) {
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
        var factory = this.cfr.resolveComponentFactory(TemplateRefContainer);
        this.templateRefContainer = this.viewContainerRef.createComponent(factory, 1, undefined, [
            [this.el.nativeElement],
        ]).instance;
    }
    Object.defineProperty(ClrTabLink.prototype, "ariaControls", {
        get: function () {
            return this.ariaService.ariaControls;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTabLink.prototype, "tabLinkId", {
        get: function () {
            return this.ariaService.ariaLabelledBy;
        },
        set: function (id) {
            this.ariaService.ariaLabelledBy = id;
        },
        enumerable: true,
        configurable: true
    });
    ClrTabLink.prototype.activate = function () {
        this.ifActiveService.current = this.id;
    };
    Object.defineProperty(ClrTabLink.prototype, "active", {
        get: function () {
            return this.ifActiveService.current === this.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTabLink.prototype, "role", {
        get: function () {
            return 'presentation';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTabLink.prototype, "type", {
        get: function () {
            return 'button';
        },
        enumerable: true,
        configurable: true
    });
    return ClrTabLink;
}());
ClrTabLink.decorators = [
    { type: core.Directive, args: [{
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
ClrTabLink.ctorParameters = function () { return [
    { type: IfActiveService, },
    { type: undefined, decorators: [{ type: core.Inject, args: [IF_ACTIVE_ID,] },] },
    { type: AriaService, },
    { type: core.ElementRef, },
    { type: core.ComponentFactoryResolver, },
    { type: core.ViewContainerRef, },
    { type: undefined, decorators: [{ type: core.Inject, args: [TABS_ID,] },] },
]; };
ClrTabLink.propDecorators = {
    "inOverflow": [{ type: core.Input, args: ['clrTabLinkInOverflow',] },],
    "tabLinkId": [{ type: core.Input, args: ['id',] },],
    "activate": [{ type: core.HostListener, args: ['click',] },],
    "role": [{ type: core.HostBinding, args: ['attr.role',] },],
    "type": [{ type: core.HostBinding, args: ['attr.type',] },],
};
var ClrTab = /** @class */ (function () {
    function ClrTab(ifActiveService, id, tabsService) {
        this.ifActiveService = ifActiveService;
        this.id = id;
        this.tabsService = tabsService;
        tabsService.register(this);
    }
    ClrTab.prototype.ngOnDestroy = function () {
        this.tabsService.unregister(this);
    };
    Object.defineProperty(ClrTab.prototype, "active", {
        get: function () {
            return this.ifActiveService.current === this.id;
        },
        enumerable: true,
        configurable: true
    });
    return ClrTab;
}());
ClrTab.decorators = [
    { type: core.Component, args: [{
                selector: 'clr-tab',
                template: "\n        <ng-content></ng-content>\n    ",
                providers: [IF_ACTIVE_ID_PROVIDER, AriaService],
            },] },
];
ClrTab.ctorParameters = function () { return [
    { type: IfActiveService, },
    { type: undefined, decorators: [{ type: core.Inject, args: [IF_ACTIVE_ID,] },] },
    { type: TabsService, },
]; };
ClrTab.propDecorators = {
    "tabLink": [{ type: core.ContentChild, args: [ClrTabLink,] },],
    "tabContent": [{ type: core.ContentChild, args: [ClrTabContent,] },],
};
var ClrTabOverflowContent = /** @class */ (function (_super) {
    __extends(ClrTabOverflowContent, _super);
    function ClrTabOverflowContent(injector, parentHost) {
        var _this = _super.call(this, injector, parentHost) || this;
        _this.anchorPoint = Point.BOTTOM_RIGHT;
        _this.popoverPoint = Point.RIGHT_TOP;
        _this.closeOnOutsideClick = true;
        return _this;
    }
    return ClrTabOverflowContent;
}(AbstractPopover));
ClrTabOverflowContent.decorators = [
    { type: core.Component, args: [{
                selector: 'clr-tab-overflow-content',
                template: "\n        <ng-content></ng-content>\n    ",
                host: {
                    '[class.dropdown-menu]': 'true',
                },
            },] },
];
ClrTabOverflowContent.ctorParameters = function () { return [
    { type: core.Injector, },
    { type: core.ElementRef, decorators: [{ type: core.SkipSelf },] },
]; };
var ClrTabs = /** @class */ (function () {
    function ClrTabs(ifActiveService, ifOpenService, tabsService, tabsId) {
        this.ifActiveService = ifActiveService;
        this.ifOpenService = ifOpenService;
        this.tabsService = tabsService;
        this.tabsId = tabsId;
    }
    Object.defineProperty(ClrTabs.prototype, "activeTabInOverflow", {
        get: function () {
            return this.tabsService.overflowTabs.indexOf(this.tabsService.activeTab) > -1;
        },
        enumerable: true,
        configurable: true
    });
    ClrTabs.prototype.ngAfterContentInit = function () {
        if (typeof this.ifActiveService.current === 'undefined') {
            this.tabLinkDirectives.first.activate();
        }
    };
    ClrTabs.prototype.toggleOverflow = function (event) {
        this.ifOpenService.toggleWithEvent(event);
    };
    return ClrTabs;
}());
ClrTabs.decorators = [
    { type: core.Component, args: [{
                selector: 'clr-tabs',
                template: "\n        <ul class=\"nav\" role=\"tablist\">\n            <!--tab links-->\n            <ng-container *ngFor=\"let link of tabLinkDirectives\">\n                <ng-container *ngIf=\"link.tabsId === tabsId && !link.inOverflow\"\n                              [ngTemplateOutlet]=\"link.templateRefContainer.template\">\n                </ng-container>\n            </ng-container>\n            <ng-container *ngIf=\"tabsService.overflowTabs.length > 0\">\n                <div class=\"tabs-overflow bottom-right\" [class.open]=\"ifOpenService.open\"\n                     (click)=\"toggleOverflow($event)\">\n                    <li role=\"presentation\" class=\"nav-item\">\n                        <button class=\"btn btn-link nav-link dropdown-toggle\" type=\"button\" [class.active]=\"activeTabInOverflow\">\n                            <clr-icon shape=\"ellipsis-horizontal\" [class.is-info]=\"ifOpenService.open\"></clr-icon>\n                        </button>\n                    </li>\n                    <!--tab links in overflow menu-->\n                    <clr-tab-overflow-content>\n                        <ng-container *ngFor=\"let link of tabLinkDirectives\">\n                            <ng-container *ngIf=\"link.tabsId === tabsId && link.inOverflow\"\n                                          [ngTemplateOutlet]=\"link.templateRefContainer.template\">\n                            </ng-container>\n                        </ng-container>\n                    </clr-tab-overflow-content>\n                </div>\n            </ng-container>\n        </ul>\n        <!--tab content-->\n        <ng-content></ng-content>\n    ",
                providers: [IfActiveService, IfOpenService, TabsService, TABS_ID_PROVIDER],
            },] },
];
ClrTabs.ctorParameters = function () { return [
    { type: IfActiveService, },
    { type: IfOpenService, },
    { type: TabsService, },
    { type: undefined, decorators: [{ type: core.Inject, args: [TABS_ID,] },] },
]; };
ClrTabs.propDecorators = {
    "tabLinkDirectives": [{ type: core.ContentChildren, args: [ClrTabLink, { descendants: true },] },],
};
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
    return ClrTabsModule;
}());
ClrTabsModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [common.CommonModule, ClrCommonPopoverModule, ClrConditionalModule, ClrIconModule, ClrTemplateRefModule],
                declarations: [CLR_TABS_DIRECTIVES],
                exports: [CLR_TABS_DIRECTIVES, ClrConditionalModule],
            },] },
];
var Tab = ClrTab;
var Tabs = ClrTabs;
var TabContent = ClrTabContent;
var TabOverflowContent = ClrTabOverflowContent;
var TabLinkDirective = ClrTabLink;
var TABS_DIRECTIVES = CLR_TABS_DIRECTIVES;
var VerticalNavGroupRegistrationService = /** @class */ (function () {
    function VerticalNavGroupRegistrationService() {
        this.navGroupCount = 0;
    }
    VerticalNavGroupRegistrationService.prototype.registerNavGroup = function () {
        this.navGroupCount++;
    };
    VerticalNavGroupRegistrationService.prototype.unregisterNavGroup = function () {
        this.navGroupCount--;
    };
    return VerticalNavGroupRegistrationService;
}());
VerticalNavGroupRegistrationService.decorators = [
    { type: core.Injectable },
];
var VerticalNavIconService = /** @class */ (function () {
    function VerticalNavIconService() {
        this._icons = 0;
    }
    Object.defineProperty(VerticalNavIconService.prototype, "hasIcons", {
        get: function () {
            return this._icons > 0;
        },
        enumerable: true,
        configurable: true
    });
    VerticalNavIconService.prototype.registerIcon = function () {
        this._icons++;
    };
    VerticalNavIconService.prototype.unregisterIcon = function () {
        this._icons--;
    };
    return VerticalNavIconService;
}());
VerticalNavIconService.decorators = [
    { type: core.Injectable },
];
var VerticalNavService = /** @class */ (function () {
    function VerticalNavService() {
        this._animateOnCollapsed = new rxjs.Subject();
        this._collapsedChanged = new rxjs.Subject();
        this._collapsed = false;
        this._collapsible = false;
    }
    Object.defineProperty(VerticalNavService.prototype, "animateOnCollapsed", {
        get: function () {
            return this._animateOnCollapsed.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VerticalNavService.prototype, "collapsedChanged", {
        get: function () {
            return this._collapsedChanged.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VerticalNavService.prototype, "collapsed", {
        get: function () {
            return this._collapsed;
        },
        set: function (value) {
            value = !!value;
            if (this.collapsible && this._collapsed !== value) {
                this.updateCollapseBehavior(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VerticalNavService.prototype, "collapsible", {
        get: function () {
            return this._collapsible;
        },
        set: function (value) {
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
    VerticalNavService.prototype.updateCollapseBehavior = function (value) {
        this._animateOnCollapsed.next(value);
        this._collapsed = value;
        this._collapsedChanged.next(value);
    };
    return VerticalNavService;
}());
VerticalNavService.decorators = [
    { type: core.Injectable },
];
var ClrVerticalNav = /** @class */ (function () {
    function ClrVerticalNav(_navService, _navIconService, _navGroupRegistrationService) {
        var _this = this;
        this._navService = _navService;
        this._navIconService = _navIconService;
        this._navGroupRegistrationService = _navGroupRegistrationService;
        this._collapsedChanged = new core.EventEmitter(true);
        this._sub = this._navService.collapsedChanged.subscribe(function (value) {
            _this._collapsedChanged.emit(value);
        });
    }
    Object.defineProperty(ClrVerticalNav.prototype, "collapsible", {
        get: function () {
            return this._navService.collapsible;
        },
        set: function (value) {
            this._navService.collapsible = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrVerticalNav.prototype, "collapsed", {
        get: function () {
            return this._navService.collapsed;
        },
        set: function (value) {
            this._navService.collapsed = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrVerticalNav.prototype, "hasNavGroups", {
        get: function () {
            return this._navGroupRegistrationService.navGroupCount > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrVerticalNav.prototype, "hasIcons", {
        get: function () {
            return this._navIconService.hasIcons;
        },
        enumerable: true,
        configurable: true
    });
    ClrVerticalNav.prototype.toggleByButton = function () {
        this.collapsed = !this.collapsed;
    };
    ClrVerticalNav.prototype.ngOnDestroy = function () {
        this._sub.unsubscribe();
    };
    return ClrVerticalNav;
}());
ClrVerticalNav.decorators = [
    { type: core.Component, args: [{
                selector: 'clr-vertical-nav',
                template: "<!--\n  ~ Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.\n  ~ This software is released under MIT license.\n  ~ The full license information can be found in LICENSE in the root directory of this project.\n  -->\n\n<button type=\"button\" class=\"nav-trigger\"\n        [class.on-collapse]=\"collapsed\"\n        (click)=\"toggleByButton()\"\n        *ngIf=\"collapsible\">\n    <clr-icon shape=\"angle-double\" class=\"nav-trigger-icon\" [attr.dir]=\"(this.collapsed) ? 'right' : 'left'\"></clr-icon>\n</button>\n<!-- Click handler on .nav-content is bad but required :-( -->\n<div class=\"nav-content\">\n    <ng-content></ng-content>\n    <button (click)=\"collapsed = false\" class=\"nav-btn\" *ngIf=\"collapsible && collapsed\"></button>\n</div>\n",
                providers: [VerticalNavService, VerticalNavIconService, VerticalNavGroupRegistrationService],
                host: {
                    class: 'clr-vertical-nav',
                    '[class.is-collapsed]': 'collapsed',
                    '[class.has-nav-groups]': 'hasNavGroups',
                    '[class.has-icons]': 'hasIcons',
                },
            },] },
];
ClrVerticalNav.ctorParameters = function () { return [
    { type: VerticalNavService, },
    { type: VerticalNavIconService, },
    { type: VerticalNavGroupRegistrationService, },
]; };
ClrVerticalNav.propDecorators = {
    "collapsible": [{ type: core.Input, args: ['clrVerticalNavCollapsible',] },],
    "collapsed": [{ type: core.Input, args: ['clrVerticalNavCollapsed',] },],
    "_collapsedChanged": [{ type: core.Output, args: ['clrVerticalNavCollapsedChange',] },],
};
var VerticalNavGroupService = /** @class */ (function () {
    function VerticalNavGroupService() {
        this._expandChange = new rxjs.Subject();
    }
    Object.defineProperty(VerticalNavGroupService.prototype, "expandChange", {
        get: function () {
            return this._expandChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    VerticalNavGroupService.prototype.expand = function () {
        this._expandChange.next(true);
    };
    return VerticalNavGroupService;
}());
VerticalNavGroupService.decorators = [
    { type: core.Injectable },
];
var EXPANDED_STATE = 'expanded';
var COLLAPSED_STATE = 'collapsed';
var ClrVerticalNavGroup = /** @class */ (function () {
    function ClrVerticalNavGroup(_itemExpand, _navGroupRegistrationService, _navGroupService, _navService) {
        var _this = this;
        this._itemExpand = _itemExpand;
        this._navGroupRegistrationService = _navGroupRegistrationService;
        this._navGroupService = _navGroupService;
        this._navService = _navService;
        this.wasExpanded = false;
        this.expandedChange = new core.EventEmitter(true);
        this._subscriptions = [];
        this._expandAnimationState = COLLAPSED_STATE;
        this._navGroupRegistrationService.registerNavGroup();
        this._subscriptions.push(this._itemExpand.expandChange.subscribe(function (value) {
            if (value && _this.expandAnimationState === COLLAPSED_STATE) {
                if (_this._navService.collapsed) {
                    _this._navService.collapsed = false;
                }
                _this.expandAnimationState = EXPANDED_STATE;
            }
            else if (!value && _this.expandAnimationState === EXPANDED_STATE) {
                _this.expandAnimationState = COLLAPSED_STATE;
            }
        }));
        this._subscriptions.push(this._navService.animateOnCollapsed.subscribe(function (goingToCollapse) {
            if (goingToCollapse && _this.expanded) {
                _this.wasExpanded = true;
                _this.expandAnimationState = COLLAPSED_STATE;
            }
            else if (!goingToCollapse && _this.wasExpanded) {
                _this.expandGroup();
                _this.wasExpanded = false;
            }
        }));
        this._subscriptions.push(this._navGroupService.expandChange.subscribe(function (expand) {
            if (expand && !_this.expanded) {
                _this.expandGroup();
            }
        }));
    }
    Object.defineProperty(ClrVerticalNavGroup.prototype, "expanded", {
        get: function () {
            return this._itemExpand.expanded;
        },
        set: function (value) {
            if (this._itemExpand.expanded !== value) {
                this._itemExpand.expanded = value;
                this.expandedChange.emit(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrVerticalNavGroup.prototype, "userExpandedInput", {
        set: function (value) {
            value = !!value;
            if (this.expanded !== value) {
                this.toggleExpand();
            }
        },
        enumerable: true,
        configurable: true
    });
    ClrVerticalNavGroup.prototype.expandGroup = function () {
        this.expanded = true;
        this.expandAnimationState = EXPANDED_STATE;
    };
    ClrVerticalNavGroup.prototype.collapseGroup = function () {
        this.expandAnimationState = COLLAPSED_STATE;
    };
    ClrVerticalNavGroup.prototype.expandAnimationDone = function ($event) {
        if ($event.toState === COLLAPSED_STATE) {
            this.expanded = false;
        }
    };
    Object.defineProperty(ClrVerticalNavGroup.prototype, "expandAnimationState", {
        get: function () {
            return this._expandAnimationState;
        },
        set: function (value) {
            if (value !== this._expandAnimationState) {
                this._expandAnimationState = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    ClrVerticalNavGroup.prototype.toggleExpand = function () {
        if (this.expanded) {
            this.collapseGroup();
        }
        else {
            if (this._navService.collapsed) {
                this._navService.collapsed = false;
            }
            this.expandGroup();
        }
    };
    ClrVerticalNavGroup.prototype.ngAfterContentInit = function () {
        if (this._navService.collapsed && this.expanded) {
            this.wasExpanded = true;
            this.expandAnimationState = COLLAPSED_STATE;
        }
    };
    ClrVerticalNavGroup.prototype.ngOnDestroy = function () {
        this._subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
        this._navGroupRegistrationService.unregisterNavGroup();
    };
    return ClrVerticalNavGroup;
}());
ClrVerticalNavGroup.decorators = [
    { type: core.Component, args: [{
                selector: 'clr-vertical-nav-group',
                template: "<!--\n  ~ Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.\n  ~ This software is released under MIT license.\n  ~ The full license information can be found in LICENSE in the root directory of this project.\n  -->\n\n<div class=\"nav-group-content\">\n    <ng-content select=\"[clrVerticalNavLink]\"></ng-content>\n    <button\n        class=\"nav-group-trigger\"\n        type=\"button\"\n        (click)=\"toggleExpand()\">\n        <ng-content select=\"[clrVerticalNavIcon]\"></ng-content>\n        <div class=\"nav-group-text\">\n            <ng-content></ng-content>\n        </div>\n        <clr-icon shape=\"caret\"\n                  class=\"nav-group-trigger-icon\"\n                  [attr.dir]=\"(this.expanded) ? 'down' : 'right'\">\n        </clr-icon>\n    </button>\n</div>\n<!--TODO: This animation needs to be added to the clr-vertical-nav-group-children component-->\n<div class=\"nav-group-children\"\n     [@clrExpand]=\"expandAnimationState\"\n     (@clrExpand.done)=\"expandAnimationDone($event)\">\n    <ng-content select=\"[clrIfExpanded], clr-vertical-nav-group-children\"></ng-content>\n</div>\n",
                providers: [Expand, VerticalNavGroupService],
                animations: [
                    animations.trigger('clrExpand', [
                        animations.state(EXPANDED_STATE, animations.style({ height: '*' })),
                        animations.state(COLLAPSED_STATE, animations.style({ height: 0, 'overflow-y': 'hidden', visibility: 'hidden' })),
                        animations.transition(EXPANDED_STATE + " <=> " + COLLAPSED_STATE, animations.animate('0.2s ease-in-out')),
                    ]),
                ],
                host: { class: 'nav-group' },
            },] },
];
ClrVerticalNavGroup.ctorParameters = function () { return [
    { type: Expand, },
    { type: VerticalNavGroupRegistrationService, },
    { type: VerticalNavGroupService, },
    { type: VerticalNavService, },
]; };
ClrVerticalNavGroup.propDecorators = {
    "expanded": [{ type: core.HostBinding, args: ['class.is-expanded',] },],
    "userExpandedInput": [{ type: core.Input, args: ['clrVerticalNavGroupExpanded',] },],
    "expandedChange": [{ type: core.Output, args: ['clrVerticalNavGroupExpandedChange',] },],
};
var ClrVerticalNavGroupChildren = /** @class */ (function () {
    function ClrVerticalNavGroupChildren() {
    }
    return ClrVerticalNavGroupChildren;
}());
ClrVerticalNavGroupChildren.decorators = [
    { type: core.Component, args: [{
                selector: 'clr-vertical-nav-group-children',
                template: "\n        <ng-content></ng-content>\n    ",
            },] },
];
var ClrVerticalNavIcon = /** @class */ (function () {
    function ClrVerticalNavIcon(_verticalNavIconService) {
        this._verticalNavIconService = _verticalNavIconService;
        this._verticalNavIconService.registerIcon();
    }
    ClrVerticalNavIcon.prototype.ngOnDestroy = function () {
        this._verticalNavIconService.unregisterIcon();
    };
    return ClrVerticalNavIcon;
}());
ClrVerticalNavIcon.decorators = [
    { type: core.Directive, args: [{ selector: '[clrVerticalNavIcon]', host: { class: 'nav-icon' } },] },
];
ClrVerticalNavIcon.ctorParameters = function () { return [
    { type: VerticalNavIconService, },
]; };
var ClrVerticalNavLink = /** @class */ (function () {
    function ClrVerticalNavLink(_navGroupService) {
        this._navGroupService = _navGroupService;
    }
    ClrVerticalNavLink.prototype.expandParentNavGroup = function () {
        if (this._navGroupService) {
            this._navGroupService.expand();
        }
    };
    return ClrVerticalNavLink;
}());
ClrVerticalNavLink.decorators = [
    { type: core.Component, args: [{
                selector: '[clrVerticalNavLink]',
                template: "\n        <ng-content select=\"[clrVerticalNavIcon]\"></ng-content>\n        <span class=\"nav-text\">\n            <ng-content></ng-content>    \n        </span>\n    ",
                host: { class: 'nav-link' },
            },] },
];
ClrVerticalNavLink.ctorParameters = function () { return [
    { type: VerticalNavGroupService, decorators: [{ type: core.Optional },] },
]; };
ClrVerticalNavLink.propDecorators = {
    "expandParentNavGroup": [{ type: core.HostListener, args: ['click',] },],
};
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
    return ClrVerticalNavModule;
}());
ClrVerticalNavModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [common.CommonModule, ClrIconModule, ClrIfExpandModule],
                declarations: [CLR_VERTICAL_NAV_DIRECTIVES],
                exports: [CLR_VERTICAL_NAV_DIRECTIVES, ClrIfExpandModule, ClrIconModule],
            },] },
];
var VerticalNav = ClrVerticalNav;
var VerticalNavGroup = ClrVerticalNavGroup;
var VerticalNavGroupChildren = ClrVerticalNavGroupChildren;
var VerticalNavIcon = ClrVerticalNavIcon;
var VerticalNavLink = ClrVerticalNavLink;
var VERTICAL_NAV_DIRECTIVES = CLR_VERTICAL_NAV_DIRECTIVES;
var ClrLayoutModule = /** @class */ (function () {
    function ClrLayoutModule() {
    }
    return ClrLayoutModule;
}());
ClrLayoutModule.decorators = [
    { type: core.NgModule, args: [{ exports: [ClrMainContainerModule, ClrNavigationModule, ClrTabsModule, ClrVerticalNavModule] },] },
];
var ScrollingService = /** @class */ (function () {
    function ScrollingService(_document) {
        this._document = _document;
    }
    ScrollingService.prototype.stopScrolling = function () {
        this._document.body.classList.add('no-scrolling');
    };
    ScrollingService.prototype.resumeScrolling = function () {
        if (this._document.body.classList.contains('no-scrolling')) {
            this._document.body.classList.remove('no-scrolling');
        }
    };
    return ScrollingService;
}());
ScrollingService.decorators = [
    { type: core.Injectable },
];
ScrollingService.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: core.Inject, args: [common.DOCUMENT,] },] },
]; };
var GHOST_PAGE_ANIMATION = {
    STATES: { NO_PAGES: 'inactive', ALL_PAGES: 'ready', NEXT_TO_LAST_PAGE: 'penultimateGhost', LAST_PAGE: 'lastGhost' },
    TRANSITIONS: { IN: '100ms ease-out', OUT: '100ms ease-in' },
};
var ClrModal = /** @class */ (function () {
    function ClrModal(_scrollingService) {
        this._scrollingService = _scrollingService;
        this._open = false;
        this._openChanged = new core.EventEmitter(false);
        this.closable = true;
        this.staticBackdrop = false;
        this.skipAnimation = 'false';
        this.ghostPageState = 'hidden';
        this.bypassScrollService = false;
        this.stopClose = false;
        this.altClose = new core.EventEmitter(false);
    }
    Object.defineProperty(ClrModal.prototype, "sizeClass", {
        get: function () {
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
    ClrModal.prototype.ngOnChanges = function (changes) {
        if (!this.bypassScrollService && changes && changes.hasOwnProperty('_open')) {
            if (changes["_open"].currentValue) {
                this._scrollingService.stopScrolling();
            }
            else {
                this._scrollingService.resumeScrolling();
            }
        }
    };
    ClrModal.prototype.ngOnDestroy = function () {
        this._scrollingService.resumeScrolling();
    };
    ClrModal.prototype.open = function () {
        if (this._open === true) {
            return;
        }
        this._open = true;
        this._openChanged.emit(true);
    };
    ClrModal.prototype.close = function () {
        if (this.stopClose) {
            this.altClose.emit(false);
            return;
        }
        if (!this.closable || this._open === false) {
            return;
        }
        this._open = false;
        this._openChanged.emit(false);
        this.focusTrap.setPreviousFocus();
    };
    ClrModal.prototype.fadeDone = function (e) {
        if (e.toState === 'void') {
            this._openChanged.emit(false);
        }
    };
    return ClrModal;
}());
ClrModal.decorators = [
    { type: core.Component, args: [{
                selector: 'clr-modal',
                viewProviders: [ScrollingService],
                template: "\n<!--\n  ~ Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.\n  ~ This software is released under MIT license.\n  ~ The full license information can be found in LICENSE in the root directory of this project.\n  -->\n\n<div clrFocusTrap class=\"modal\" *ngIf=\"_open\">\n    <!--fixme: revisit when ngClass works with exit animation-->\n    <div [@fadeDown]=\"skipAnimation\" (@fadeDown.done)=\"fadeDone($event)\"\n         class=\"modal-dialog\"\n         [class.modal-sm]=\"size == 'sm'\"\n         [class.modal-lg]=\"size == 'lg'\"\n         [class.modal-xl]=\"size == 'xl'\"\n         role=\"dialog\" [attr.aria-hidden]=\"!_open\">\n\n        <div class=\"modal-outer-wrapper\">\n            <div class=\"modal-content-wrapper\">\n                <!-- only used in wizards -->\n                <ng-content select=\".modal-nav\"></ng-content>\n\n                <div class=\"modal-content\">\n                    <div class=\"modal-header\">\n                        <button type=\"button\" class=\"close\" aria-label=\"Close\"\n                                *ngIf=\"closable\" (click)=\"close()\">\n                            <clr-icon aria-hidden=\"true\" shape=\"close\"></clr-icon>\n                        </button>\n                        <ng-content select=\".modal-title\"></ng-content>\n                    </div>\n                    <ng-content select=\".modal-body\"></ng-content>\n                    <ng-content select=\".modal-footer\"></ng-content>\n                </div>\n            </div>\n            <!--todo: deprecate the modal-ghost-wrapper div below after 0.12-->\n            <div class=\"modal-ghost-wrapper\">\n                <div [@ghostPageOneState]=\"ghostPageState\" class=\"modal-ghost modal-ghost-1\"></div>\n                <div [@ghostPageTwoState]=\"ghostPageState\" class=\"modal-ghost modal-ghost-2\"></div>\n            </div>\n        </div>\n    </div>\n\n    <div [@fade] class=\"modal-backdrop\"\n         aria-hidden=\"true\"\n         (click)=\"staticBackdrop || close()\"></div>\n</div>\n\n",
                styles: [
                    "\n        :host { display: none; }\n        :host.open { display: inline; }\n    ",
                ],
                animations: [
                    animations.trigger('fadeDown', [
                        animations.transition('* => false', [animations.style({ opacity: 0, transform: 'translate(0, -25%)' }), animations.animate('0.2s ease-in-out')]),
                        animations.transition('false => *', [animations.animate('0.2s ease-in-out', animations.style({ opacity: 0, transform: 'translate(0, -25%)' }))]),
                    ]),
                    animations.trigger('fade', [
                        animations.transition('void => *', [animations.style({ opacity: 0 }), animations.animate('0.2s ease-in-out', animations.style({ opacity: 0.85 }))]),
                        animations.transition('* => void', [animations.animate('0.2s ease-in-out', animations.style({ opacity: 0 }))]),
                    ]),
                    animations.trigger('ghostPageOneState', [
                        animations.state(GHOST_PAGE_ANIMATION.STATES.NO_PAGES, animations.style({ left: '-24px' })),
                        animations.state(GHOST_PAGE_ANIMATION.STATES.ALL_PAGES, animations.style({ left: '0' })),
                        animations.state(GHOST_PAGE_ANIMATION.STATES.NEXT_TO_LAST_PAGE, animations.style({ left: '-24px' })),
                        animations.state(GHOST_PAGE_ANIMATION.STATES.LAST_PAGE, animations.style({ left: '-24px' })),
                        animations.transition(GHOST_PAGE_ANIMATION.STATES.NO_PAGES + ' => *', animations.animate(GHOST_PAGE_ANIMATION.TRANSITIONS.IN)),
                        animations.transition(GHOST_PAGE_ANIMATION.STATES.ALL_PAGES + ' => *', animations.animate(GHOST_PAGE_ANIMATION.TRANSITIONS.OUT)),
                        animations.transition(GHOST_PAGE_ANIMATION.STATES.LAST_PAGE + ' => *', animations.animate(GHOST_PAGE_ANIMATION.TRANSITIONS.IN)),
                        animations.transition(GHOST_PAGE_ANIMATION.STATES.NEXT_TO_LAST_PAGE + ' => *', animations.animate(GHOST_PAGE_ANIMATION.TRANSITIONS.OUT)),
                    ]),
                    animations.trigger('ghostPageTwoState', [
                        animations.state(GHOST_PAGE_ANIMATION.STATES.NO_PAGES, animations.style({ left: '-24px', top: '24px', bottom: '24px' })),
                        animations.state(GHOST_PAGE_ANIMATION.STATES.ALL_PAGES, animations.style({ left: '24px' })),
                        animations.state(GHOST_PAGE_ANIMATION.STATES.NEXT_TO_LAST_PAGE, animations.style({ left: '0px', top: '24px', bottom: '24px', background: '#bbb' })),
                        animations.state(GHOST_PAGE_ANIMATION.STATES.LAST_PAGE, animations.style({ left: '-24px', top: '24px', bottom: '24px' })),
                        animations.transition(GHOST_PAGE_ANIMATION.STATES.NO_PAGES + ' => *', animations.animate(GHOST_PAGE_ANIMATION.TRANSITIONS.IN)),
                        animations.transition(GHOST_PAGE_ANIMATION.STATES.ALL_PAGES + ' => *', animations.animate(GHOST_PAGE_ANIMATION.TRANSITIONS.OUT)),
                        animations.transition(GHOST_PAGE_ANIMATION.STATES.LAST_PAGE + ' => *', animations.animate(GHOST_PAGE_ANIMATION.TRANSITIONS.IN)),
                        animations.transition(GHOST_PAGE_ANIMATION.STATES.NEXT_TO_LAST_PAGE + ' => *', animations.animate(GHOST_PAGE_ANIMATION.TRANSITIONS.OUT)),
                    ]),
                ],
            },] },
];
ClrModal.ctorParameters = function () { return [
    { type: ScrollingService, },
]; };
ClrModal.propDecorators = {
    "focusTrap": [{ type: core.ViewChild, args: [FocusTrapDirective,] },],
    "_open": [{ type: core.HostBinding, args: ['class.open',] }, { type: core.Input, args: ['clrModalOpen',] },],
    "_openChanged": [{ type: core.Output, args: ['clrModalOpenChange',] },],
    "closable": [{ type: core.Input, args: ['clrModalClosable',] },],
    "size": [{ type: core.Input, args: ['clrModalSize',] },],
    "staticBackdrop": [{ type: core.Input, args: ['clrModalStaticBackdrop',] },],
    "skipAnimation": [{ type: core.Input, args: ['clrModalSkipAnimation',] },],
    "ghostPageState": [{ type: core.Input, args: ['clrModalGhostPageState',] },],
    "bypassScrollService": [{ type: core.Input, args: ['clrModalOverrideScrollService',] },],
    "stopClose": [{ type: core.Input, args: ['clrModalPreventClose',] },],
    "altClose": [{ type: core.Output, args: ['clrModalAlternateClose',] },],
    "close": [{ type: core.HostListener, args: ['body:keyup.escape',] },],
};
var CLR_MODAL_DIRECTIVES = [ClrModal];
var ClrModalModule = /** @class */ (function () {
    function ClrModalModule() {
    }
    return ClrModalModule;
}());
ClrModalModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [common.CommonModule, ClrIconModule, ClrFocusTrapModule],
                declarations: [CLR_MODAL_DIRECTIVES],
                exports: [CLR_MODAL_DIRECTIVES],
            },] },
];
var Modal = ClrModal;
var MODAL_DIRECTIVES = CLR_MODAL_DIRECTIVES;
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
    function ClrSignpostContent(injector, parentHost) {
        var _this = this;
        if (!parentHost) {
            throw new Error('clr-signpost-content should only be used inside of a clr-signpost');
        }
        _this = _super.call(this, injector, parentHost) || this;
        _this.position = 'right-middle';
        _this.closeOnOutsideClick = true;
        return _this;
    }
    ClrSignpostContent.prototype.close = function () {
        this.ifOpenService.open = false;
    };
    Object.defineProperty(ClrSignpostContent.prototype, "position", {
        get: function () {
            return this._position;
        },
        set: function (position) {
            this.renderer.removeClass(this.el.nativeElement, this.position);
            if (position && POSITIONS.indexOf(position) > -1) {
                this._position = position;
            }
            else {
                this._position = 'right-middle';
            }
            this.renderer.addClass(this.el.nativeElement, this.position);
            var setPosition = SIGNPOST_POSITIONS[this.position];
            this.anchorPoint = setPosition.anchorPoint;
            this.popoverPoint = setPosition.popoverPoint;
            this.popoverOptions.offsetY = setPosition.offsetY;
            this.popoverOptions.offsetX = setPosition.offsetX;
        },
        enumerable: true,
        configurable: true
    });
    return ClrSignpostContent;
}(AbstractPopover));
ClrSignpostContent.decorators = [
    { type: core.Component, args: [{
                selector: 'clr-signpost-content',
                template: "\n        <div class=\"signpost-flex-wrap\">\n            <div class=\"popover-pointer\"></div>\n            <div class=\"signpost-content-header\">\n                <button type=\"button\" class=\"signpost-action close\" aria-label=\"Close\" (click)=\"close()\">\n                    <clr-icon aria-hidden=\"true\" shape=\"close\"></clr-icon>\n                </button>\n            </div>\n            <div class=\"signpost-content-body\">\n                <ng-content></ng-content>\n            </div>\n        </div>\n    ",
                host: { '[class.signpost-content]': 'true' },
            },] },
];
ClrSignpostContent.ctorParameters = function () { return [
    { type: core.Injector, },
    { type: core.ElementRef, decorators: [{ type: core.Optional }, { type: core.Inject, args: [POPOVER_HOST_ANCHOR,] },] },
]; };
ClrSignpostContent.propDecorators = {
    "position": [{ type: core.Input, args: ['clrPosition',] },],
};
var CLR_SIGNPOST_DIRECTIVES = [ClrSignpost, ClrSignpostContent, ClrSignpostTrigger];
var ClrSignpostModule = /** @class */ (function () {
    function ClrSignpostModule() {
    }
    return ClrSignpostModule;
}());
ClrSignpostModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [common.CommonModule, ClrCommonPopoverModule, ClrIconModule],
                declarations: [CLR_SIGNPOST_DIRECTIVES],
                exports: [CLR_SIGNPOST_DIRECTIVES, ClrConditionalModule],
                providers: [],
            },] },
];
var Signpost = ClrSignpost;
var SignpostContent = ClrSignpostContent;
var SignpostTrigger = ClrSignpostTrigger;
var SIGNPOST_DIRECTIVES = CLR_SIGNPOST_DIRECTIVES;
var ClrTooltip = /** @class */ (function () {
    function ClrTooltip() {
    }
    return ClrTooltip;
}());
ClrTooltip.decorators = [
    { type: core.Component, args: [{
                selector: 'clr-tooltip',
                template: "\n        <ng-content></ng-content>\n    ",
                host: {
                    '[class.tooltip]': 'true',
                },
                providers: [IfOpenService, { provide: POPOVER_HOST_ANCHOR, useExisting: core.ElementRef }],
            },] },
];
var POSITIONS$1 = ['bottom-left', 'bottom-right', 'top-left', 'top-right', 'right', 'left'];
var SIZES = ['xs', 'sm', 'md', 'lg'];
var ClrTooltipContent = /** @class */ (function (_super) {
    __extends(ClrTooltipContent, _super);
    function ClrTooltipContent(injector, parentHost) {
        var _this = this;
        if (!parentHost) {
            throw new Error('clr-tooltip-content should only be used inside of a clr-tooltip');
        }
        _this = _super.call(this, injector, parentHost) || this;
        _this.position = 'right';
        _this.size = 'sm';
        return _this;
    }
    Object.defineProperty(ClrTooltipContent.prototype, "position", {
        get: function () {
            return this._position;
        },
        set: function (position) {
            this.renderer.removeClass(this.el.nativeElement, 'tooltip-' + this.position);
            if (position && POSITIONS$1.indexOf(position) > -1) {
                this._position = position;
            }
            else {
                this._position = 'right';
            }
            this.renderer.addClass(this.el.nativeElement, 'tooltip-' + this.position);
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
        get: function () {
            return this._size;
        },
        set: function (size) {
            this.renderer.removeClass(this.el.nativeElement, 'tooltip-' + this.size);
            if (size && SIZES.indexOf(size) > -1) {
                this._size = size;
            }
            else {
                this._size = 'sm';
            }
            this.renderer.addClass(this.el.nativeElement, 'tooltip-' + this.size);
        },
        enumerable: true,
        configurable: true
    });
    return ClrTooltipContent;
}(AbstractPopover));
ClrTooltipContent.decorators = [
    { type: core.Component, args: [{
                selector: 'clr-tooltip-content',
                template: "\n        <ng-content></ng-content>\n    ",
                host: {
                    '[class.tooltip-content]': 'true',
                    '[style.opacity]': '1',
                },
            },] },
];
ClrTooltipContent.ctorParameters = function () { return [
    { type: core.Injector, },
    { type: core.ElementRef, decorators: [{ type: core.Optional }, { type: core.Inject, args: [POPOVER_HOST_ANCHOR,] },] },
]; };
ClrTooltipContent.propDecorators = {
    "position": [{ type: core.Input, args: ['clrPosition',] },],
    "size": [{ type: core.Input, args: ['clrSize',] },],
};
var ClrTooltipTrigger = /** @class */ (function () {
    function ClrTooltipTrigger(ifOpenService) {
        this.ifOpenService = ifOpenService;
    }
    ClrTooltipTrigger.prototype.showTooltip = function () {
        this.ifOpenService.open = true;
    };
    ClrTooltipTrigger.prototype.hideTooltip = function () {
        this.ifOpenService.open = false;
    };
    return ClrTooltipTrigger;
}());
ClrTooltipTrigger.decorators = [
    { type: core.Directive, args: [{ selector: '[clrTooltipTrigger]', host: { '[attr.tabindex]': '0' } },] },
];
ClrTooltipTrigger.ctorParameters = function () { return [
    { type: IfOpenService, },
]; };
ClrTooltipTrigger.propDecorators = {
    "showTooltip": [{ type: core.HostListener, args: ['mouseenter',] }, { type: core.HostListener, args: ['focus',] },],
    "hideTooltip": [{ type: core.HostListener, args: ['mouseleave',] }, { type: core.HostListener, args: ['blur',] },],
};
var CLR_TOOLTIP_DIRECTIVES = [ClrTooltip, ClrTooltipTrigger, ClrTooltipContent];
var ClrTooltipModule = /** @class */ (function () {
    function ClrTooltipModule() {
    }
    return ClrTooltipModule;
}());
ClrTooltipModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [common.CommonModule, ClrCommonPopoverModule],
                declarations: [CLR_TOOLTIP_DIRECTIVES],
                exports: [CLR_TOOLTIP_DIRECTIVES, ClrConditionalModule, ClrIconModule],
            },] },
];
var Tooltip = ClrTooltip;
var TooltipContent = ClrTooltipContent;
var TooltipTrigger = ClrTooltipTrigger;
var TOOLTIP_DIRECTIVES = CLR_TOOLTIP_DIRECTIVES;
var ClrPopoverModule = /** @class */ (function () {
    function ClrPopoverModule() {
    }
    return ClrPopoverModule;
}());
ClrPopoverModule.decorators = [
    { type: core.NgModule, args: [{ exports: [ClrDropdownModule, ClrSignpostModule, ClrTooltipModule] },] },
];
var ButtonHubService = /** @class */ (function () {
    function ButtonHubService() {
        this.buttonsReady = false;
        this._previousBtnClicked = new rxjs.Subject();
        this._nextBtnClicked = new rxjs.Subject();
        this._dangerBtnClicked = new rxjs.Subject();
        this._cancelBtnClicked = new rxjs.Subject();
        this._finishBtnClicked = new rxjs.Subject();
        this._customBtnClicked = new rxjs.Subject();
    }
    Object.defineProperty(ButtonHubService.prototype, "previousBtnClicked", {
        get: function () {
            return this._previousBtnClicked.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonHubService.prototype, "nextBtnClicked", {
        get: function () {
            return this._nextBtnClicked.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonHubService.prototype, "dangerBtnClicked", {
        get: function () {
            return this._dangerBtnClicked.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonHubService.prototype, "cancelBtnClicked", {
        get: function () {
            return this._cancelBtnClicked.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonHubService.prototype, "finishBtnClicked", {
        get: function () {
            return this._finishBtnClicked.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonHubService.prototype, "customBtnClicked", {
        get: function () {
            return this._customBtnClicked.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    ButtonHubService.prototype.buttonClicked = function (buttonType) {
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
    return ButtonHubService;
}());
ButtonHubService.decorators = [
    { type: core.Injectable },
];
var PageCollectionService = /** @class */ (function () {
    function PageCollectionService() {
        this._pagesReset = new rxjs.Subject();
    }
    Object.defineProperty(PageCollectionService.prototype, "pagesAsArray", {
        get: function () {
            return this.pages ? this.pages.toArray() : [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageCollectionService.prototype, "pagesCount", {
        get: function () {
            return this.pages ? this.pages.length : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageCollectionService.prototype, "penultimatePage", {
        get: function () {
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
        get: function () {
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
        get: function () {
            if (!this.pagesCount) {
                return;
            }
            return this.pagesAsArray[0];
        },
        enumerable: true,
        configurable: true
    });
    PageCollectionService.prototype.getPageById = function (id) {
        var foundPages = this.pages.filter(function (page) { return id === page.id; });
        return this.checkResults(foundPages, id);
    };
    PageCollectionService.prototype.getPageByIndex = function (index) {
        var pageCount = this.pagesCount;
        var pagesLastIndex = pageCount > 1 ? pageCount - 1 : 0;
        if (index < 0) {
            throw new Error('Cannot retrieve page with index of ' + index);
        }
        if (index > pagesLastIndex) {
            throw new Error('Page index is greater than length of pages array.');
        }
        return this.pagesAsArray[index];
    };
    PageCollectionService.prototype.getPageIndex = function (page) {
        var index = this.pagesAsArray.indexOf(page);
        if (index < 0) {
            throw new Error('Requested page cannot be found in collection of pages.');
        }
        return index;
    };
    PageCollectionService.prototype.checkResults = function (results, requestedPageId) {
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
    PageCollectionService.prototype.pageRange = function (start, end) {
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
            return [this.getPageByIndex(start)];
        }
        end = end + 1;
        return pages.slice(start, end);
    };
    PageCollectionService.prototype.getPageRangeFromPages = function (page, otherPage) {
        var pageIndex = this.getPageIndex(page);
        var otherPageIndex = this.getPageIndex(otherPage);
        var startIndex;
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
    PageCollectionService.prototype.getPreviousPage = function (page) {
        var myPageIndex = this.getPageIndex(page);
        var previousPageIndex = myPageIndex - 1;
        if (previousPageIndex < 0) {
            return null;
        }
        return this.getPageByIndex(previousPageIndex);
    };
    PageCollectionService.prototype.previousPageIsCompleted = function (page) {
        var previousPage;
        if (!page) {
            return false;
        }
        previousPage = this.getPreviousPage(page);
        if (null === previousPage) {
            return true;
        }
        return previousPage.completed;
    };
    PageCollectionService.prototype.getNextPage = function (page) {
        var myPageIndex = this.getPageIndex(page);
        var nextPageIndex = myPageIndex + 1;
        if (nextPageIndex >= this.pagesAsArray.length) {
            return null;
        }
        return this.getPageByIndex(nextPageIndex);
    };
    PageCollectionService.prototype.getStepItemIdForPage = function (page) {
        var pageId = page.id;
        var pageIdParts = pageId.split('-').reverse();
        pageIdParts[1] = 'step';
        return pageIdParts.reverse().join('-');
    };
    PageCollectionService.prototype.commitPage = function (page) {
        var pageHasOverrides = page.stopNext || page.preventDefault;
        page.completed = true;
        if (!pageHasOverrides) {
            page.onCommit.emit(page.id);
        }
    };
    Object.defineProperty(PageCollectionService.prototype, "pagesReset", {
        get: function () {
            return this._pagesReset.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    PageCollectionService.prototype.reset = function () {
        this.pagesAsArray.forEach(function (page) {
            page.completed = false;
        });
        this._pagesReset.next(true);
    };
    PageCollectionService.prototype.updateCompletedStates = function () {
        var firstIncompleteIndex = this.findFirstIncompletePageIndex();
        if (firstIncompleteIndex === this.pagesAsArray.length - 1) {
            return;
        }
        this.pagesAsArray.forEach(function (page, index) {
            if (index > firstIncompleteIndex) {
                page.completed = false;
            }
        });
    };
    PageCollectionService.prototype.findFirstIncompletePageIndex = function () {
        var returnIndex = null;
        this.pagesAsArray.forEach(function (page, index) {
            if (null === returnIndex && false === page.completed) {
                returnIndex = index;
            }
        });
        if (null === returnIndex) {
            returnIndex = this.pagesCount - 1;
        }
        return returnIndex;
    };
    PageCollectionService.prototype.findFirstIncompletePage = function () {
        var myIncompleteIndex = this.findFirstIncompletePageIndex();
        return this.pagesAsArray[myIncompleteIndex];
    };
    return PageCollectionService;
}());
PageCollectionService.decorators = [
    { type: core.Injectable },
];
var WizardNavigationService = /** @class */ (function () {
    function WizardNavigationService(pageCollection, buttonService) {
        var _this = this;
        this.pageCollection = pageCollection;
        this.buttonService = buttonService;
        this._currentChanged = new rxjs.Subject();
        this.navServiceLoaded = false;
        this.forceForwardNavigation = false;
        this._movedToNextPage = new rxjs.Subject();
        this._wizardFinished = new rxjs.Subject();
        this._movedToPreviousPage = new rxjs.Subject();
        this._cancelWizard = new rxjs.Subject();
        this.wizardHasAltCancel = false;
        this.wizardHasAltNext = false;
        this.wizardStopNavigation = false;
        this.wizardDisableStepnav = false;
        this._wizardGhostPageState = GHOST_PAGE_ANIMATION.STATES.NO_PAGES;
        this._hideWizardGhostPages = true;
        this.previousButtonSubscription = this.buttonService.previousBtnClicked.subscribe(function () {
            var currentPage = _this.currentPage;
            if (_this.currentPageIsFirst || currentPage.previousStepDisabled) {
                return;
            }
            currentPage.previousButtonClicked.emit(currentPage);
            if (!currentPage.preventDefault) {
                _this.previous();
            }
        });
        this.nextButtonSubscription = this.buttonService.nextBtnClicked.subscribe(function () {
            _this.checkAndCommitCurrentPage('next');
        });
        this.dangerButtonSubscription = this.buttonService.dangerBtnClicked.subscribe(function () {
            _this.checkAndCommitCurrentPage('danger');
        });
        this.finishButtonSubscription = this.buttonService.finishBtnClicked.subscribe(function () {
            _this.checkAndCommitCurrentPage('finish');
        });
        this.customButtonSubscription = this.buttonService.customBtnClicked.subscribe(function (type) {
            if (!_this.wizardStopNavigation) {
                _this.currentPage.customButtonClicked.emit(type);
            }
        });
        this.cancelButtonSubscription = this.buttonService.cancelBtnClicked.subscribe(function () {
            if (_this.wizardStopNavigation) {
                return;
            }
            if (_this.currentPage.preventDefault) {
                _this.currentPage.pageOnCancel.emit(_this.currentPage);
            }
            else {
                _this.cancel();
            }
        });
        this.pagesResetSubscription = this.pageCollection.pagesReset.subscribe(function () {
            _this.setFirstPageCurrent();
        });
    }
    WizardNavigationService.prototype.ngOnDestroy = function () {
        this.previousButtonSubscription.unsubscribe();
        this.nextButtonSubscription.unsubscribe();
        this.dangerButtonSubscription.unsubscribe();
        this.finishButtonSubscription.unsubscribe();
        this.customButtonSubscription.unsubscribe();
        this.cancelButtonSubscription.unsubscribe();
        this.pagesResetSubscription.unsubscribe();
    };
    Object.defineProperty(WizardNavigationService.prototype, "currentPageChanged", {
        get: function () {
            return this._currentChanged.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardNavigationService.prototype, "currentPageTitle", {
        get: function () {
            if (!this.currentPage) {
                return null;
            }
            return this.currentPage.title;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardNavigationService.prototype, "currentPageIsFirst", {
        get: function () {
            return this.pageCollection.firstPage === this.currentPage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardNavigationService.prototype, "currentPageIsNextToLast", {
        get: function () {
            return this.pageCollection.penultimatePage === this.currentPage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardNavigationService.prototype, "currentPageIsLast", {
        get: function () {
            return this.pageCollection.lastPage === this.currentPage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardNavigationService.prototype, "currentPage", {
        get: function () {
            if (!this._currentPage) {
                return null;
            }
            return this._currentPage;
        },
        set: function (page) {
            if (this._currentPage !== page && !this.wizardStopNavigation) {
                this._currentPage = page;
                page.onLoad.emit(page.id);
                this._currentChanged.next(page);
            }
        },
        enumerable: true,
        configurable: true
    });
    WizardNavigationService.prototype.setCurrentPage = function (page) {
        this.currentPage = page;
    };
    Object.defineProperty(WizardNavigationService.prototype, "movedToNextPage", {
        get: function () {
            return this._movedToNextPage.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardNavigationService.prototype, "wizardFinished", {
        get: function () {
            return this._wizardFinished.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    WizardNavigationService.prototype.next = function () {
        if (this.currentPageIsLast) {
            this.checkAndCommitCurrentPage('finish');
            return;
        }
        this.checkAndCommitCurrentPage('next');
        if (!this.wizardHasAltNext && !this.wizardStopNavigation) {
            this._movedToNextPage.next(true);
        }
    };
    WizardNavigationService.prototype.forceNext = function () {
        var currentPage = this.currentPage;
        var nextPage = this.pageCollection.getNextPage(currentPage);
        if (!nextPage) {
            throw new Error('The wizard has no next page to go to.');
        }
        if (this.wizardStopNavigation) {
            return;
        }
        if (!currentPage.completed) {
            this.pageCollection.commitPage(currentPage);
        }
        this.currentPage = nextPage;
    };
    WizardNavigationService.prototype.checkAndCommitCurrentPage = function (buttonType) {
        var currentPage = this.currentPage;
        var iAmTheLastPage;
        var isNext;
        var isDanger;
        var isDangerNext;
        var isDangerFinish;
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
        if (isFinish) {
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
            return;
        }
        if (isNext || isDangerNext) {
            this.forceNext();
        }
    };
    WizardNavigationService.prototype.finish = function () {
        this.checkAndCommitCurrentPage('finish');
    };
    Object.defineProperty(WizardNavigationService.prototype, "movedToPreviousPage", {
        get: function () {
            return this._movedToPreviousPage.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    WizardNavigationService.prototype.previous = function () {
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
        get: function () {
            return this._cancelWizard.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    WizardNavigationService.prototype.cancel = function () {
        this._cancelWizard.next();
    };
    WizardNavigationService.prototype.goTo = function (pageToGoToOrId, lazyComplete) {
        if (lazyComplete === void 0) { lazyComplete = false; }
        var pageToGoTo;
        var currentPage;
        var myPages;
        var pagesToCheck;
        var okayToMove = true;
        var goingForward;
        var currentPageIndex;
        var goToPageIndex;
        myPages = this.pageCollection;
        pageToGoTo = typeof pageToGoToOrId === 'string' ? myPages.getPageById(pageToGoToOrId) : pageToGoToOrId;
        currentPage = this.currentPage;
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
            pagesToCheck.forEach(function (page) {
                if (page !== pageToGoTo) {
                    page.completed = true;
                }
            });
        }
        else if (!goingForward && this.forceForwardNavigation) {
            pagesToCheck.forEach(function (page) {
                page.completed = false;
            });
        }
        this.currentPage = pageToGoTo;
    };
    WizardNavigationService.prototype.canGoTo = function (pagesToCheck) {
        var okayToMove = true;
        var myPages = this.pageCollection;
        var previousPagePasses;
        if (!pagesToCheck || pagesToCheck.length < 1) {
            return false;
        }
        pagesToCheck.forEach(function (page) {
            var previousPage;
            if (!okayToMove) {
                return;
            }
            if (page.completed) {
                return;
            }
            previousPage = myPages.getPageIndex(page) > 0 ? myPages.getPreviousPage(page) : null;
            previousPagePasses = previousPage === null || previousPage.completed === true;
            if (!page.current && !previousPagePasses) {
                okayToMove = false;
            }
        });
        return okayToMove;
    };
    WizardNavigationService.prototype.setLastEnabledPageCurrent = function () {
        var allPages = this.pageCollection.pagesAsArray;
        var lastCompletedPageIndex = null;
        allPages.forEach(function (page, index) {
            if (page.completed) {
                lastCompletedPageIndex = index;
            }
        });
        if (lastCompletedPageIndex === null) {
            lastCompletedPageIndex = 0;
        }
        else if (lastCompletedPageIndex + 1 < allPages.length) {
            lastCompletedPageIndex = lastCompletedPageIndex + 1;
        }
        this.currentPage = allPages[lastCompletedPageIndex];
    };
    WizardNavigationService.prototype.setFirstPageCurrent = function () {
        this.currentPage = this.pageCollection.pagesAsArray[0];
    };
    Object.defineProperty(WizardNavigationService.prototype, "wizardGhostPageState", {
        get: function () {
            return this._wizardGhostPageState;
        },
        set: function (value) {
            if (this.hideWizardGhostPages) {
                this._wizardGhostPageState = GHOST_PAGE_ANIMATION.STATES.NO_PAGES;
            }
            else {
                this._wizardGhostPageState = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardNavigationService.prototype, "hideWizardGhostPages", {
        get: function () {
            return this._hideWizardGhostPages;
        },
        set: function (value) {
            this._hideWizardGhostPages = value;
        },
        enumerable: true,
        configurable: true
    });
    WizardNavigationService.prototype.updateNavigation = function () {
        var toSetCurrent;
        var currentPageRemoved;
        this.pageCollection.updateCompletedStates();
        currentPageRemoved = this.pageCollection.pagesAsArray.indexOf(this.currentPage) < 0;
        if (currentPageRemoved) {
            toSetCurrent = this.pageCollection.findFirstIncompletePage();
            this.currentPage = toSetCurrent;
        }
    };
    return WizardNavigationService;
}());
WizardNavigationService.decorators = [
    { type: core.Injectable },
];
WizardNavigationService.ctorParameters = function () { return [
    { type: PageCollectionService, },
    { type: ButtonHubService, },
]; };
var HeaderActionService = /** @class */ (function () {
    function HeaderActionService(navService) {
        this.navService = navService;
    }
    Object.defineProperty(HeaderActionService.prototype, "wizardHasHeaderActions", {
        get: function () {
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
        get: function () {
            return this.navService.currentPage ? this.navService.currentPage.hasHeaderActions : false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HeaderActionService.prototype, "showWizardHeaderActions", {
        get: function () {
            return !this.currentPageHasHeaderActions && this.wizardHasHeaderActions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HeaderActionService.prototype, "displayHeaderActionsWrapper", {
        get: function () {
            return this.currentPageHasHeaderActions || this.wizardHasHeaderActions;
        },
        enumerable: true,
        configurable: true
    });
    return HeaderActionService;
}());
HeaderActionService.decorators = [
    { type: core.Injectable },
];
HeaderActionService.ctorParameters = function () { return [
    { type: WizardNavigationService, },
]; };
var wizardHeaderActionIndex = 0;
var ClrWizardHeaderAction = /** @class */ (function () {
    function ClrWizardHeaderAction() {
        this.title = '';
        this._id = (wizardHeaderActionIndex++).toString();
        this.disabled = false;
        this.headerActionClicked = new core.EventEmitter(false);
    }
    Object.defineProperty(ClrWizardHeaderAction.prototype, "id", {
        get: function () {
            return "clr-wizard-header-action-" + this._id;
        },
        enumerable: true,
        configurable: true
    });
    ClrWizardHeaderAction.prototype.click = function () {
        if (this.disabled) {
            return;
        }
        this.headerActionClicked.emit(this._id);
    };
    return ClrWizardHeaderAction;
}());
ClrWizardHeaderAction.decorators = [
    { type: core.Component, args: [{
                selector: 'clr-wizard-header-action',
                template: "\n        <button \n            type=\"button\"\n            class=\"btn clr-wizard-header-action btn-link\"\n            [id]=\"id\"\n            [class.disabled]=\"disabled\"\n            (click)=\"click()\"\n            [title]=\"title\">\n            <ng-content></ng-content>\n        </button>\n    ",
                host: { class: 'clr-wizard-header-action-wrapper' },
            },] },
];
ClrWizardHeaderAction.propDecorators = {
    "title": [{ type: core.Input, args: ['title',] },],
    "_id": [{ type: core.Input, args: ['id',] },],
    "disabled": [{ type: core.Input, args: ['clrWizardHeaderActionDisabled',] },],
    "headerActionClicked": [{ type: core.Output, args: ['actionClicked',] },],
};
var ClrWizardPageButtons = /** @class */ (function () {
    function ClrWizardPageButtons(pageButtonsTemplateRef) {
        this.pageButtonsTemplateRef = pageButtonsTemplateRef;
    }
    return ClrWizardPageButtons;
}());
ClrWizardPageButtons.decorators = [
    { type: core.Directive, args: [{ selector: '[clrPageButtons]' },] },
];
ClrWizardPageButtons.ctorParameters = function () { return [
    { type: core.TemplateRef, },
]; };
var ClrWizardPageHeaderActions = /** @class */ (function () {
    function ClrWizardPageHeaderActions(pageHeaderActionsTemplateRef) {
        this.pageHeaderActionsTemplateRef = pageHeaderActionsTemplateRef;
    }
    return ClrWizardPageHeaderActions;
}());
ClrWizardPageHeaderActions.decorators = [
    { type: core.Directive, args: [{ selector: '[clrPageHeaderActions]' },] },
];
ClrWizardPageHeaderActions.ctorParameters = function () { return [
    { type: core.TemplateRef, },
]; };
var ClrWizardPageNavTitle = /** @class */ (function () {
    function ClrWizardPageNavTitle(pageNavTitleTemplateRef) {
        this.pageNavTitleTemplateRef = pageNavTitleTemplateRef;
    }
    return ClrWizardPageNavTitle;
}());
ClrWizardPageNavTitle.decorators = [
    { type: core.Directive, args: [{ selector: '[clrPageNavTitle]' },] },
];
ClrWizardPageNavTitle.ctorParameters = function () { return [
    { type: core.TemplateRef, },
]; };
var ClrWizardPageTitle = /** @class */ (function () {
    function ClrWizardPageTitle(pageTitleTemplateRef) {
        this.pageTitleTemplateRef = pageTitleTemplateRef;
    }
    return ClrWizardPageTitle;
}());
ClrWizardPageTitle.decorators = [
    { type: core.Directive, args: [{ selector: '[clrPageTitle]' },] },
];
ClrWizardPageTitle.ctorParameters = function () { return [
    { type: core.TemplateRef, },
]; };
var wizardPageIndex = 0;
var ClrWizardPage = /** @class */ (function () {
    function ClrWizardPage(navService, pageCollection, buttonService) {
        this.navService = navService;
        this.pageCollection = pageCollection;
        this.buttonService = buttonService;
        this._nextStepDisabled = false;
        this.nextStepDisabledChange = new core.EventEmitter();
        this._previousStepDisabled = false;
        this.previousStepDisabledChange = new core.EventEmitter();
        this.preventDefault = false;
        this._stopCancel = false;
        this.stopCancelChange = new core.EventEmitter();
        this._stopNext = false;
        this.onCommit = new core.EventEmitter(false);
        this.onLoad = new core.EventEmitter();
        this.pageOnCancel = new core.EventEmitter();
        this.finishButtonClicked = new core.EventEmitter();
        this.previousButtonClicked = new core.EventEmitter();
        this.nextButtonClicked = new core.EventEmitter();
        this.dangerButtonClicked = new core.EventEmitter();
        this.primaryButtonClicked = new core.EventEmitter();
        this.customButtonClicked = new core.EventEmitter();
        this._id = (wizardPageIndex++).toString();
        this._complete = false;
    }
    Object.defineProperty(ClrWizardPage.prototype, "nextStepDisabled", {
        get: function () {
            return this._nextStepDisabled;
        },
        set: function (val) {
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
        get: function () {
            return this._previousStepDisabled;
        },
        set: function (val) {
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
        get: function () {
            return this._stopCancel;
        },
        set: function (val) {
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
        get: function () {
            return this._stopNext;
        },
        set: function (val) {
            var valBool = !!val;
            if (valBool !== this._stopNext) {
                this._stopNext = valBool;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardPage.prototype, "id", {
        get: function () {
            var idIsNonZeroFalsy = !this._id && this._id !== 0;
            if (idIsNonZeroFalsy || this._id < 0) {
                this._id = (wizardPageIndex++).toString();
            }
            return "clr-wizard-page-" + this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardPage.prototype, "readyToComplete", {
        get: function () {
            return !this.nextStepDisabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardPage.prototype, "completed", {
        get: function () {
            return this._complete && this.readyToComplete;
        },
        set: function (value) {
            this._complete = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardPage.prototype, "current", {
        get: function () {
            return this.navService.currentPage === this;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardPage.prototype, "disabled", {
        get: function () {
            return !this.enabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardPage.prototype, "enabled", {
        get: function () {
            return this.current || this.completed || this.previousCompleted;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardPage.prototype, "previousCompleted", {
        get: function () {
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
        get: function () {
            return this.pageTitle.pageTitleTemplateRef;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardPage.prototype, "navTitle", {
        get: function () {
            if (this.pageNavTitle) {
                return this.pageNavTitle.pageNavTitleTemplateRef;
            }
            return this.pageTitle.pageTitleTemplateRef;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardPage.prototype, "headerActions", {
        get: function () {
            if (!this._headerActions) {
                return;
            }
            return this._headerActions.pageHeaderActionsTemplateRef;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardPage.prototype, "hasHeaderActions", {
        get: function () {
            return !!this._headerActions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardPage.prototype, "buttons", {
        get: function () {
            if (!this._buttons) {
                return;
            }
            return this._buttons.pageButtonsTemplateRef;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardPage.prototype, "hasButtons", {
        get: function () {
            return !!this._buttons;
        },
        enumerable: true,
        configurable: true
    });
    ClrWizardPage.prototype.makeCurrent = function () {
        this.navService.currentPage = this;
    };
    ClrWizardPage.prototype.ngOnInit = function () {
        var navService = this.navService;
        if (!navService.currentPage && !navService.navServiceLoaded) {
            this.makeCurrent();
            this.navService.navServiceLoaded = true;
        }
    };
    Object.defineProperty(ClrWizardPage.prototype, "stepItemId", {
        get: function () {
            return this.pageCollection.getStepItemIdForPage(this);
        },
        enumerable: true,
        configurable: true
    });
    return ClrWizardPage;
}());
ClrWizardPage.decorators = [
    { type: core.Component, args: [{
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
ClrWizardPage.ctorParameters = function () { return [
    { type: WizardNavigationService, },
    { type: PageCollectionService, },
    { type: ButtonHubService, },
]; };
ClrWizardPage.propDecorators = {
    "pageTitle": [{ type: core.ContentChild, args: [ClrWizardPageTitle,] },],
    "pageNavTitle": [{ type: core.ContentChild, args: [ClrWizardPageNavTitle,] },],
    "_buttons": [{ type: core.ContentChild, args: [ClrWizardPageButtons,] },],
    "_headerActions": [{ type: core.ContentChild, args: [ClrWizardPageHeaderActions,] },],
    "nextStepDisabled": [{ type: core.Input, args: ['clrWizardPageNextDisabled',] },],
    "nextStepDisabledChange": [{ type: core.Output, args: ['clrWizardPageNextDisabledChange',] },],
    "previousStepDisabled": [{ type: core.Input, args: ['clrWizardPagePreviousDisabled',] },],
    "previousStepDisabledChange": [{ type: core.Output, args: ['clrWizardPagePreviousDisabledChange',] },],
    "preventDefault": [{ type: core.Input, args: ['clrWizardPagePreventDefault',] },],
    "stopCancel": [{ type: core.Input, args: ['clrWizardPagePreventDefaultCancel',] },],
    "stopCancelChange": [{ type: core.Output, args: ['clrWizardPagePreventDefaultCancelChange',] },],
    "stopNext": [{ type: core.Input, args: ['clrWizardPagePreventDefaultNext',] },],
    "onCommit": [{ type: core.Output, args: ['clrWizardPageOnCommit',] },],
    "onLoad": [{ type: core.Output, args: ['clrWizardPageOnLoad',] },],
    "pageOnCancel": [{ type: core.Output, args: ['clrWizardPageOnCancel',] },],
    "finishButtonClicked": [{ type: core.Output, args: ['clrWizardPageFinish',] },],
    "previousButtonClicked": [{ type: core.Output, args: ['clrWizardPagePrevious',] },],
    "nextButtonClicked": [{ type: core.Output, args: ['clrWizardPageNext',] },],
    "dangerButtonClicked": [{ type: core.Output, args: ['clrWizardPageDanger',] },],
    "primaryButtonClicked": [{ type: core.Output, args: ['clrWizardPagePrimary',] },],
    "customButtonClicked": [{ type: core.Output, args: ['clrWizardPageCustomButton',] },],
    "_id": [{ type: core.Input, args: ['id',] },],
};
var ClrWizard = /** @class */ (function () {
    function ClrWizard(navService, pageCollection, buttonService, headerActionService, elementRef, differs) {
        var _this = this;
        this.navService = navService;
        this.pageCollection = pageCollection;
        this.buttonService = buttonService;
        this.headerActionService = headerActionService;
        this.elementRef = elementRef;
        this.size = 'xl';
        this.showGhostPages = false;
        this._forceForward = false;
        this.closable = true;
        this._open = false;
        this._openChanged = new core.EventEmitter(false);
        this.onCancel = new core.EventEmitter(false);
        this.wizardFinished = new core.EventEmitter(false);
        this.onReset = new core.EventEmitter(false);
        this.currentPageChanged = new core.EventEmitter(false);
        this.onMoveNext = new core.EventEmitter(false);
        this.onMovePrevious = new core.EventEmitter(false);
        this._stopNext = false;
        this._stopCancel = false;
        this._stopNavigation = false;
        this._disableStepnav = false;
        this._stopModalAnimations = false;
        this.goNextSubscription = this.navService.movedToNextPage.subscribe(function () {
            _this.onMoveNext.emit();
        });
        this.goPreviousSubscription = this.navService.movedToPreviousPage.subscribe(function () {
            _this.onMovePrevious.emit();
        });
        this.cancelSubscription = this.navService.notifyWizardCancel.subscribe(function () {
            _this.checkAndCancel();
        });
        this.wizardFinishedSubscription = this.navService.wizardFinished.subscribe(function () {
            if (!_this.stopNext) {
                _this.forceFinish();
            }
            _this.wizardFinished.emit();
        });
        this.differ = differs.find([]).create(null);
    }
    Object.defineProperty(ClrWizard.prototype, "forceForward", {
        get: function () {
            return this._forceForward;
        },
        set: function (value) {
            this._forceForward = !!value;
            this.navService.forceForwardNavigation = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizard.prototype, "clrWizardOpen", {
        set: function (open) {
            if (open) {
                this.buttonService.buttonsReady = true;
            }
            this._open = open;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizard.prototype, "stopNext", {
        get: function () {
            return this._stopNext;
        },
        set: function (value) {
            this._stopNext = !!value;
            this.navService.wizardHasAltNext = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizard.prototype, "stopCancel", {
        get: function () {
            return this._stopCancel;
        },
        set: function (value) {
            this._stopCancel = !!value;
            this.navService.wizardHasAltCancel = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizard.prototype, "stopNavigation", {
        get: function () {
            return this._stopNavigation;
        },
        set: function (value) {
            this._stopNavigation = !!value;
            this.navService.wizardStopNavigation = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizard.prototype, "disableStepnav", {
        get: function () {
            return this._disableStepnav;
        },
        set: function (value) {
            this._disableStepnav = !!value;
            this.navService.wizardDisableStepnav = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizard.prototype, "stopModalAnimations", {
        get: function () {
            if (this._stopModalAnimations) {
                return 'true';
            }
            return 'false';
        },
        enumerable: true,
        configurable: true
    });
    ClrWizard.prototype.ngOnInit = function () {
        var _this = this;
        this.currentPageSubscription = this.navService.currentPageChanged.subscribe(function (page) {
            _this.setGhostPages();
            _this.currentPageChanged.emit();
        });
    };
    ClrWizard.prototype.ngOnDestroy = function () {
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
    ClrWizard.prototype.ngAfterContentInit = function () {
        var navService = this.navService;
        this.pageCollection.pages = this.pages;
        this.headerActionService.wizardHeaderActions = this.headerActions;
        if (this.showGhostPages) {
            navService.hideWizardGhostPages = false;
            this.deactivateGhostPages();
        }
        if (this._open) {
            this.buttonService.buttonsReady = true;
        }
    };
    ClrWizard.prototype.ngDoCheck = function () {
        var _this = this;
        var changes = this.differ.diff(this.pages);
        if (changes) {
            changes.forEachAddedItem(function (r) {
                _this.navService.updateNavigation();
            });
            changes.forEachRemovedItem(function (r) {
                _this.navService.updateNavigation();
            });
        }
    };
    Object.defineProperty(ClrWizard.prototype, "isStatic", {
        get: function () {
            return this.elementRef.nativeElement.classList.contains('clr-wizard--inline');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizard.prototype, "currentPage", {
        get: function () {
            return this.navService.currentPage;
        },
        set: function (page) {
            this.navService.goTo(page, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizard.prototype, "isLast", {
        get: function () {
            return this.navService.currentPageIsLast;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizard.prototype, "isFirst", {
        get: function () {
            return this.navService.currentPageIsFirst;
        },
        enumerable: true,
        configurable: true
    });
    ClrWizard.prototype.open = function () {
        this._open = true;
        if (!this.currentPage) {
            this.navService.setFirstPageCurrent();
        }
        this.buttonService.buttonsReady = true;
        this.setGhostPages();
        this._openChanged.emit(true);
    };
    ClrWizard.prototype.close = function () {
        if (this.stopNavigation) {
            return;
        }
        this._open = false;
        this.deactivateGhostPages();
        this._openChanged.emit(false);
    };
    ClrWizard.prototype.toggle = function (value) {
        if (value) {
            this.open();
        }
        else {
            this.close();
        }
    };
    ClrWizard.prototype.prev = function () {
        this.previous();
    };
    ClrWizard.prototype.previous = function () {
        this.navService.previous();
    };
    ClrWizard.prototype.next = function (skipChecksAndEmits) {
        if (skipChecksAndEmits === void 0) { skipChecksAndEmits = true; }
        if (skipChecksAndEmits) {
            this.forceNext();
        }
        else {
            this.navService.next();
        }
    };
    ClrWizard.prototype.finish = function (skipChecksAndEmits) {
        if (skipChecksAndEmits === void 0) { skipChecksAndEmits = true; }
        if (skipChecksAndEmits) {
            this.forceFinish();
        }
        else {
            this.navService.finish();
        }
    };
    ClrWizard.prototype.forceFinish = function () {
        if (this.stopNavigation) {
            return;
        }
        this.deactivateGhostPages();
        this.close();
    };
    ClrWizard.prototype.forceNext = function () {
        this.navService.forceNext();
    };
    ClrWizard.prototype.cancel = function () {
        this.navService.cancel();
    };
    ClrWizard.prototype.modalCancel = function () {
        this.checkAndCancel();
    };
    ClrWizard.prototype.checkAndCancel = function () {
        var currentPage = this.currentPage;
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
    ClrWizard.prototype.goTo = function (pageId) {
        if (!pageId) {
            return;
        }
        this.navService.goTo(pageId);
    };
    ClrWizard.prototype.reset = function () {
        this.pageCollection.reset();
        this.onReset.next();
    };
    Object.defineProperty(ClrWizard.prototype, "ghostPageState", {
        get: function () {
            return this.navService.wizardGhostPageState;
        },
        enumerable: true,
        configurable: true
    });
    ClrWizard.prototype.deactivateGhostPages = function () {
        this.setGhostPages('deactivate');
    };
    ClrWizard.prototype.setGhostPages = function (deactivateOrNot) {
        if (deactivateOrNot === void 0) { deactivateOrNot = ''; }
        var navService = this.navService;
        var ghostpageStates = GHOST_PAGE_ANIMATION.STATES;
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
    };
    return ClrWizard;
}());
ClrWizard.decorators = [
    { type: core.Component, args: [{
                selector: 'clr-wizard',
                providers: [WizardNavigationService, PageCollectionService, ButtonHubService, HeaderActionService],
                template: "<!--\n  ~ Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.\n  ~ This software is released under MIT license.\n  ~ The full license information can be found in LICENSE in the root directory of this project.\n  -->\n\n<!--todo: deprecate clrModalGhostPageState after 0.12-->\n<clr-modal\n    [clrModalOpen]=\"_open\"\n    [clrModalSize]=\"size\"\n    [clrModalClosable]=\"closable\"\n    [clrModalStaticBackdrop]=\"true\"\n    [clrModalSkipAnimation]=\"stopModalAnimations\"\n    [clrModalGhostPageState]=\"ghostPageState\"\n    [clrModalOverrideScrollService]=\"isStatic\"\n    [clrModalPreventClose]=\"true\"\n    (clrModalAlternateClose)=\"modalCancel()\">\n\n    <nav class=\"modal-nav clr-wizard-stepnav-wrapper\">\n        <h3 class=\"clr-wizard-title\"><ng-content select=\"clr-wizard-title\"></ng-content></h3>\n        <clr-wizard-stepnav></clr-wizard-stepnav>\n    </nav>\n\n    <h3 class=\"modal-title\">\n        <span class=\"modal-title-text\">\n            <ng-template [ngTemplateOutlet]=\"navService.currentPageTitle\"></ng-template>\n        </span>\n\n        <div class=\"modal-header-actions-wrapper\" *ngIf=\"headerActionService.displayHeaderActionsWrapper\">\n            <div *ngIf=\"headerActionService.showWizardHeaderActions\">\n                <ng-content select=\"clr-wizard-header-action\"></ng-content>\n            </div>\n            <div *ngIf=\"headerActionService.currentPageHasHeaderActions\">\n                <ng-template [ngTemplateOutlet]=\"navService.currentPage.headerActions\"></ng-template>\n            </div>\n        </div>\n    </h3>\n\n    <div class=\"modal-body\">\n        <main clr-wizard-pages-wrapper class=\"clr-wizard-content\">\n            <ng-content></ng-content>\n        </main>\n    </div>\n    <div class=\"modal-footer clr-wizard-footer\">\n        <div class=\"clr-wizard-footer-buttons\">\n            <div *ngIf=\"navService.currentPage && !navService.currentPage.hasButtons\"\n                class=\"clr-wizard-footer-buttons-wrapper\">\n                <ng-content select=\"clr-wizard-button\"></ng-content>\n            </div>\n            <div *ngIf=\"navService.currentPage && navService.currentPage.hasButtons\"\n                class=\"clr-wizard-footer-buttons-wrapper\">\n                <ng-template [ngTemplateOutlet]=\"navService.currentPage.buttons\"></ng-template>\n            </div>\n        </div>\n    </div>\n</clr-modal>\n",
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
ClrWizard.ctorParameters = function () { return [
    { type: WizardNavigationService, },
    { type: PageCollectionService, },
    { type: ButtonHubService, },
    { type: HeaderActionService, },
    { type: core.ElementRef, },
    { type: core.IterableDiffers, },
]; };
ClrWizard.propDecorators = {
    "size": [{ type: core.Input, args: ['clrWizardSize',] },],
    "showGhostPages": [{ type: core.Input, args: ['clrWizardShowGhostPages',] },],
    "forceForward": [{ type: core.Input, args: ['clrWizardForceForwardNavigation',] },],
    "closable": [{ type: core.Input, args: ['clrWizardClosable',] },],
    "clrWizardOpen": [{ type: core.Input, args: ['clrWizardOpen',] },],
    "_openChanged": [{ type: core.Output, args: ['clrWizardOpenChange',] },],
    "onCancel": [{ type: core.Output, args: ['clrWizardOnCancel',] },],
    "wizardFinished": [{ type: core.Output, args: ['clrWizardOnFinish',] },],
    "onReset": [{ type: core.Output, args: ['clrWizardOnReset',] },],
    "pages": [{ type: core.ContentChildren, args: [ClrWizardPage,] },],
    "headerActions": [{ type: core.ContentChildren, args: [ClrWizardHeaderAction,] },],
    "currentPageChanged": [{ type: core.Output, args: ['clrWizardCurrentPageChanged',] },],
    "onMoveNext": [{ type: core.Output, args: ['clrWizardOnNext',] },],
    "onMovePrevious": [{ type: core.Output, args: ['clrWizardOnPrevious',] },],
    "stopNext": [{ type: core.Input, args: ['clrWizardPreventDefaultNext',] },],
    "stopCancel": [{ type: core.Input, args: ['clrWizardPreventDefaultCancel',] },],
    "stopNavigation": [{ type: core.Input, args: ['clrWizardPreventNavigation',] },],
    "disableStepnav": [{ type: core.Input, args: ['clrWizardDisableStepnav',] },],
    "_stopModalAnimations": [{ type: core.Input, args: ['clrWizardPreventModalAnimation',] },],
};
var DEFAULT_BUTTON_TYPES = {
    cancel: 'cancel',
    previous: 'previous',
    next: 'next',
    finish: 'finish',
    danger: 'danger',
};
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
        this.wasClicked = new core.EventEmitter(false);
    }
    ClrWizardButton.prototype.checkDefaultAndCustomType = function (valueToCheck, typeToLookUp) {
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
        get: function () {
            return this.checkDefaultAndCustomType(this.type, 'cancel');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardButton.prototype, "isNext", {
        get: function () {
            return this.checkDefaultAndCustomType(this.type, 'next');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardButton.prototype, "isPrevious", {
        get: function () {
            return this.checkDefaultAndCustomType(this.type, 'previous');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardButton.prototype, "isFinish", {
        get: function () {
            return this.checkDefaultAndCustomType(this.type, 'finish');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardButton.prototype, "isDanger", {
        get: function () {
            return this.checkDefaultAndCustomType(this.type, 'danger');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardButton.prototype, "isPrimaryAction", {
        get: function () {
            return this.isNext || this.isDanger || this.isFinish;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardButton.prototype, "_disabledAttribute", {
        get: function () {
            if (this.isDisabled) {
                return '';
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardButton.prototype, "isDisabled", {
        get: function () {
            var disabled = true;
            var nav = this.navService;
            var page = this.navService.currentPage;
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
        get: function () {
            var hidden = true;
            var nav = this.navService;
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
    ClrWizardButton.prototype.click = function () {
        if (this.isDisabled) {
            return;
        }
        this.wasClicked.emit(this.type);
        this.buttonService.buttonClicked(this.type);
    };
    return ClrWizardButton;
}());
ClrWizardButton.decorators = [
    { type: core.Component, args: [{
                selector: 'clr-wizard-button',
                template: "\n        <button\n            type=\"button\"\n            class=\"btn clr-wizard-btn\"\n            [class.btn-link]=\"isCancel\"\n            [class.clr-wizard-btn--tertiary]=\"isCancel\"\n            [class.btn-outline]=\"isPrevious\"\n            [class.clr-wizard-btn--secondary]=\"isPrevious\"\n            [class.btn-primary]=\"isPrimaryAction\"\n            [class.clr-wizard-btn--primary]=\"isPrimaryAction\"\n            [class.btn-success]=\"isFinish\"\n            [class.btn-danger]=\"isDanger\"\n            [class.disabled]=\"isDisabled\"\n            [attr.disabled]=\"_disabledAttribute\"\n            (click)=\"click()\">\n            <ng-content></ng-content>\n        </button>\n    ",
                host: { class: 'clr-wizard-btn-wrapper', '[attr.aria-hidden]': 'isHidden' },
                styles: ['[aria-hidden="true"] { display: none; }'],
            },] },
];
ClrWizardButton.ctorParameters = function () { return [
    { type: WizardNavigationService, },
    { type: ButtonHubService, },
]; };
ClrWizardButton.propDecorators = {
    "type": [{ type: core.Input, args: ['type',] },],
    "disabled": [{ type: core.Input, args: ['clrWizardButtonDisabled',] },],
    "hidden": [{ type: core.Input, args: ['clrWizardButtonHidden',] },],
    "wasClicked": [{ type: core.Output, args: ['clrWizardButtonClicked',] },],
};
var ClrWizardCustomTags = /** @class */ (function () {
    function ClrWizardCustomTags() {
    }
    return ClrWizardCustomTags;
}());
ClrWizardCustomTags.decorators = [
    { type: core.Directive, args: [{ selector: 'clr-wizard-title, clr-wizard-pagetitle' },] },
];
var ClrWizardStepnav = /** @class */ (function () {
    function ClrWizardStepnav(pageService) {
        this.pageService = pageService;
    }
    return ClrWizardStepnav;
}());
ClrWizardStepnav.decorators = [
    { type: core.Component, args: [{
                selector: 'clr-wizard-stepnav',
                template: "\n        <ol class=\"clr-wizard-stepnav-list\" role=\"tablist\">\n            <li *ngFor=\"let page of pageService.pages\" clr-wizard-stepnav-item \n            [page]=\"page\" class=\"clr-wizard-stepnav-item\"></li>\n        </ol>\n    ",
                host: { class: 'clr-wizard-stepnav' },
            },] },
];
ClrWizardStepnav.ctorParameters = function () { return [
    { type: PageCollectionService, },
]; };
var ClrWizardStepnavItem = /** @class */ (function () {
    function ClrWizardStepnavItem(navService, pageCollection) {
        this.navService = navService;
        this.pageCollection = pageCollection;
    }
    ClrWizardStepnavItem.prototype.pageGuard = function () {
        if (!this.page) {
            throw new Error('Wizard stepnav item is not associated with a wizard page.');
        }
    };
    Object.defineProperty(ClrWizardStepnavItem.prototype, "id", {
        get: function () {
            this.pageGuard();
            return this.pageCollection.getStepItemIdForPage(this.page);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardStepnavItem.prototype, "isDisabled", {
        get: function () {
            this.pageGuard();
            return this.page.disabled || this.navService.wizardStopNavigation || this.navService.wizardDisableStepnav;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardStepnavItem.prototype, "isCurrent", {
        get: function () {
            this.pageGuard();
            return this.page.current;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardStepnavItem.prototype, "isComplete", {
        get: function () {
            this.pageGuard();
            return this.page.completed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardStepnavItem.prototype, "canNavigate", {
        get: function () {
            this.pageGuard();
            return this.pageCollection.previousPageIsCompleted(this.page);
        },
        enumerable: true,
        configurable: true
    });
    ClrWizardStepnavItem.prototype.click = function () {
        this.pageGuard();
        if (this.isDisabled || this.isCurrent) {
            return;
        }
        this.navService.goTo(this.page);
    };
    return ClrWizardStepnavItem;
}());
ClrWizardStepnavItem.decorators = [
    { type: core.Component, args: [{
                selector: '[clr-wizard-stepnav-item]',
                template: "\n        <button type=\"button\" class=\"btn btn-link clr-wizard-stepnav-link\" (click)=\"click()\">\n            <ng-template [ngTemplateOutlet]=\"page.navTitle\"></ng-template>\n        </button>\n    ",
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
ClrWizardStepnavItem.ctorParameters = function () { return [
    { type: WizardNavigationService, },
    { type: PageCollectionService, },
]; };
ClrWizardStepnavItem.propDecorators = {
    "page": [{ type: core.Input, args: ['page',] },],
};
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
    return ClrWizardModule;
}());
ClrWizardModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [common.CommonModule, ClrModalModule, ClrAlertModule],
                declarations: [CLR_WIZARD_DIRECTIVES],
                exports: [CLR_WIZARD_DIRECTIVES],
            },] },
];
var Wizard = ClrWizard;
var WizardPage = ClrWizardPage;
var WizardStepnav = ClrWizardStepnav;
var WizardStepnavItem = ClrWizardStepnavItem;
var WizardButton = ClrWizardButton;
var WizardHeaderAction = ClrWizardHeaderAction;
var WizardCustomTags = ClrWizardCustomTags;
var WizardPageTitleDirective = ClrWizardPageTitle;
var WizardPageNavTitleDirective = ClrWizardPageNavTitle;
var WizardPageButtonsDirective = ClrWizardPageButtons;
var WizardPageHeaderActionsDirective = ClrWizardPageHeaderActions;
var WIZARD_DIRECTIVES = CLR_WIZARD_DIRECTIVES;
var ClarityModule = /** @class */ (function () {
    function ClarityModule() {
    }
    ClarityModule.forRoot = function () {
        return { ngModule: ClarityModule, providers: [] };
    };
    ClarityModule.forChild = function () {
        return { ngModule: ClarityModule, providers: [] };
    };
    return ClarityModule;
}());
ClarityModule.decorators = [
    { type: core.NgModule, args: [{
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
var NgControlService = /** @class */ (function () {
    function NgControlService() {
        this._controlChanges = new rxjs.Subject();
    }
    Object.defineProperty(NgControlService.prototype, "controlChanges", {
        get: function () {
            return this._controlChanges.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    NgControlService.prototype.setControl = function (control) {
        this._controlChanges.next(control);
    };
    return NgControlService;
}());
NgControlService.decorators = [
    { type: core.Injectable },
];
var IfErrorService = /** @class */ (function () {
    function IfErrorService(ngControlService) {
        var _this = this;
        this.ngControlService = ngControlService;
        this._statusChanges = new rxjs.Subject();
        this.subscriptions = [];
        this.subscriptions.push(this.ngControlService.controlChanges.subscribe(function (control) {
            _this.control = control;
            _this.listenForChanges();
        }));
    }
    Object.defineProperty(IfErrorService.prototype, "statusChanges", {
        get: function () {
            return this._statusChanges.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    IfErrorService.prototype.listenForChanges = function () {
        var _this = this;
        this.subscriptions.push(this.control.statusChanges.pipe(operators.filter(function () { return _this.control.touched; })).subscribe(function () {
            _this._statusChanges.next(_this.control);
        }));
    };
    IfErrorService.prototype.triggerStatusChange = function () {
        if (this.control) {
            this._statusChanges.next(this.control);
        }
    };
    IfErrorService.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    return IfErrorService;
}());
IfErrorService.decorators = [
    { type: core.Injectable },
];
IfErrorService.ctorParameters = function () { return [
    { type: NgControlService, },
]; };
var ClrLabel = /** @class */ (function () {
    function ClrLabel(controlIdService, ifErrorService, renderer, el) {
        this.controlIdService = controlIdService;
        this.ifErrorService = ifErrorService;
        this.renderer = renderer;
        this.el = el;
    }
    ClrLabel.prototype.ngOnInit = function () {
        var _this = this;
        if (this.ifErrorService) {
            this.renderer.addClass(this.el.nativeElement, 'clr-control-label');
        }
        if (!this.forAttr && this.controlIdService) {
            this.subscription = this.controlIdService.idChange.subscribe(function (id) { return (_this.forAttr = id); });
        }
    };
    ClrLabel.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    return ClrLabel;
}());
ClrLabel.decorators = [
    { type: core.Directive, args: [{ selector: 'label' },] },
];
ClrLabel.ctorParameters = function () { return [
    { type: ControlIdService, decorators: [{ type: core.Optional },] },
    { type: IfErrorService, decorators: [{ type: core.Optional },] },
    { type: core.Renderer2, },
    { type: core.ElementRef, },
]; };
ClrLabel.propDecorators = {
    "forAttr": [{ type: core.HostBinding, args: ['attr.for',] }, { type: core.Input, args: ['for',] },],
};
var ClrControlError = /** @class */ (function () {
    function ClrControlError() {
    }
    return ClrControlError;
}());
ClrControlError.decorators = [
    { type: core.Component, args: [{
                selector: 'clr-control-error',
                template: "\n    <ng-content></ng-content>\n    ",
                host: { '[class.clr-subtext]': 'true' },
            },] },
];
var ClrControlHelper = /** @class */ (function () {
    function ClrControlHelper() {
    }
    return ClrControlHelper;
}());
ClrControlHelper.decorators = [
    { type: core.Component, args: [{
                selector: 'clr-control-helper',
                template: "\n    <ng-content></ng-content>\n    ",
                host: { '[class.clr-subtext]': 'true' },
            },] },
];
var ClrIfError = /** @class */ (function () {
    function ClrIfError(service, template, container) {
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
    ClrIfError.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.service.statusChanges.subscribe(function (control) {
            if (_this.error) {
                _this.displayError(control.hasError(_this.error));
            }
            else {
                _this.displayError(control.invalid);
            }
        });
    };
    ClrIfError.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    ClrIfError.prototype.displayError = function (invalid) {
        if (invalid && !this.displayed) {
            this.container.createEmbeddedView(this.template);
            this.displayed = true;
        }
        else if (!invalid) {
            this.container.clear();
            this.displayed = false;
        }
    };
    return ClrIfError;
}());
ClrIfError.decorators = [
    { type: core.Directive, args: [{ selector: '[clrIfError]' },] },
];
ClrIfError.ctorParameters = function () { return [
    { type: IfErrorService, decorators: [{ type: core.Optional },] },
    { type: core.TemplateRef, },
    { type: core.ViewContainerRef, },
]; };
ClrIfError.propDecorators = {
    "error": [{ type: core.Input, args: ['clrIfError',] },],
};
var ClrCommonFormsModule = /** @class */ (function () {
    function ClrCommonFormsModule() {
    }
    return ClrCommonFormsModule;
}());
ClrCommonFormsModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [common.CommonModule],
                declarations: [ClrLabel, ClrControlError, ClrControlHelper, ClrIfError],
                exports: [ClrLabel, ClrControlError, ClrControlHelper, ClrIfError],
            },] },
];
var ClrCheckboxContainer = /** @class */ (function () {
    function ClrCheckboxContainer() {
        this._dynamic = false;
    }
    return ClrCheckboxContainer;
}());
ClrCheckboxContainer.decorators = [
    { type: core.Component, args: [{
                selector: 'clr-checkbox-container',
                template: "\n        <!-- We want the checkbox input to be before the label, always -->\n        <ng-content select=\"[clrCheckbox]\"></ng-content>\n        <ng-content></ng-content>\n        <label *ngIf=\"_dynamic\"></label>\n    ",
                host: { '[class.checkbox]': 'true' },
                providers: [ControlIdService],
            },] },
];
var ClrCheckboxNext = /** @class */ (function (_super) {
    __extends(ClrCheckboxNext, _super);
    function ClrCheckboxNext(vcr) {
        return _super.call(this, ClrCheckboxContainer, vcr) || this;
    }
    return ClrCheckboxNext;
}(WrappedFormControl));
ClrCheckboxNext.decorators = [
    { type: core.Directive, args: [{ selector: '[clrCheckbox]' },] },
];
ClrCheckboxNext.ctorParameters = function () { return [
    { type: core.ViewContainerRef, },
]; };
var ClrCheckboxNextModule = /** @class */ (function () {
    function ClrCheckboxNextModule() {
    }
    return ClrCheckboxNextModule;
}());
ClrCheckboxNextModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [common.CommonModule, ClrCommonFormsModule, ClrHostWrappingModule],
                declarations: [ClrCheckboxNext, ClrCheckboxContainer],
                exports: [ClrCommonFormsModule, ClrCheckboxNext, ClrCheckboxContainer],
                entryComponents: [ClrCheckboxContainer],
            },] },
];
var ClrInput = /** @class */ (function () {
    function ClrInput(ngControlService, ifErrorService, control) {
        this.ngControlService = ngControlService;
        this.ifErrorService = ifErrorService;
        this.control = control;
        if (!this.control) {
            throw new Error('clrInput can only be used within an Angular form control, add ngModel or formControl to the input');
        }
    }
    ClrInput.prototype.ngAfterContentInit = function () {
        if (this.ngControlService) {
            this.ngControlService.setControl(this.control);
        }
    };
    ClrInput.prototype.onBlur = function () {
        if (this.ifErrorService) {
            this.ifErrorService.triggerStatusChange();
        }
    };
    return ClrInput;
}());
ClrInput.decorators = [
    { type: core.Directive, args: [{ selector: '[clrInput]', host: { '[class.clr-input]': 'true' } },] },
];
ClrInput.ctorParameters = function () { return [
    { type: NgControlService, decorators: [{ type: core.Optional },] },
    { type: IfErrorService, decorators: [{ type: core.Optional },] },
    { type: forms.NgControl, decorators: [{ type: core.Optional },] },
]; };
ClrInput.propDecorators = {
    "onBlur": [{ type: core.HostListener, args: ['blur',] },],
};
var ClrInputContainer = /** @class */ (function () {
    function ClrInputContainer(ifErrorService) {
        var _this = this;
        this.ifErrorService = ifErrorService;
        this.invalid = false;
        this.subscription = this.ifErrorService.statusChanges.subscribe(function (control) {
            _this.invalid = control.invalid;
        });
    }
    ClrInputContainer.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    return ClrInputContainer;
}());
ClrInputContainer.decorators = [
    { type: core.Component, args: [{
                selector: 'clr-input-container',
                template: "\n        <ng-content select=\"label\"></ng-content>\n        <div class=\"clr-control-container\" [class.clr-error]=\"invalid\">\n            <div class=\"clr-input-wrapper\">\n                <ng-content select=\"[clrInput]\"></ng-content>\n                <clr-icon *ngIf=\"invalid\" class=\"clr-validate-icon\" shape=\"exclamation-circle\"></clr-icon>\n            </div>\n            <ng-content select=\"clr-control-helper\" *ngIf=\"!invalid\"></ng-content>\n            <ng-content select=\"clr-control-error\" *ngIf=\"invalid\"></ng-content>\n        </div>\n    ",
                host: { '[class.clr-form-control]': 'true' },
                providers: [IfErrorService, NgControlService],
            },] },
];
ClrInputContainer.ctorParameters = function () { return [
    { type: IfErrorService, },
]; };
var ClrInputModule = /** @class */ (function () {
    function ClrInputModule() {
    }
    return ClrInputModule;
}());
ClrInputModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [common.CommonModule, forms.FormsModule, ClrIconModule, ClrCommonFormsModule],
                declarations: [ClrInput, ClrInputContainer],
                exports: [ClrCommonFormsModule, ClrInput, ClrInputContainer],
                entryComponents: [ClrInputContainer],
            },] },
];
var ClrRadioContainer = /** @class */ (function () {
    function ClrRadioContainer() {
        this._dynamic = false;
    }
    return ClrRadioContainer;
}());
ClrRadioContainer.decorators = [
    { type: core.Component, args: [{
                selector: 'clr-radio-container',
                template: "\n        <!-- We want the radio input to be before the label, always -->\n        <ng-content select=\"[clrRadio]\"></ng-content>\n        <ng-content></ng-content>\n        <label *ngIf=\"_dynamic\"></label>\n    ",
                host: { '[class.radio]': 'true' },
                providers: [ControlIdService],
            },] },
];
var ClrRadio = /** @class */ (function (_super) {
    __extends(ClrRadio, _super);
    function ClrRadio(vcr) {
        return _super.call(this, ClrRadioContainer, vcr) || this;
    }
    return ClrRadio;
}(WrappedFormControl));
ClrRadio.decorators = [
    { type: core.Directive, args: [{ selector: '[clrRadio]' },] },
];
ClrRadio.ctorParameters = function () { return [
    { type: core.ViewContainerRef, },
]; };
var ClrRadioModule = /** @class */ (function () {
    function ClrRadioModule() {
    }
    return ClrRadioModule;
}());
ClrRadioModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [common.CommonModule, ClrCommonFormsModule, ClrHostWrappingModule],
                declarations: [ClrRadio, ClrRadioContainer],
                exports: [ClrCommonFormsModule, ClrRadio, ClrRadioContainer],
                entryComponents: [ClrRadioContainer],
            },] },
];
var ClrFormsNextModule = /** @class */ (function () {
    function ClrFormsNextModule() {
    }
    return ClrFormsNextModule;
}());
ClrFormsNextModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [common.CommonModule],
                exports: [ClrCommonFormsModule, ClrCheckboxNextModule, ClrInputModule, ClrRadioModule, ClrDatepickerModule],
            },] },
];
function collapse() {
    return [
        animations.state('true', animations.style({ height: 0, 'overflow-y': 'hidden' })),
        animations.transition('true => false', [animations.animate('0.2s ease-in-out', animations.style({ height: '*', 'overflow-y': 'hidden' }))]),
        animations.transition('false => true', [animations.style({ height: '*', 'overflow-y': 'hidden' }), animations.animate('0.2s ease-in-out')]),
    ];
}
function fade(opacity) {
    if (opacity === void 0) { opacity = 1; }
    return [
        animations.transition('void => *', [animations.style({ opacity: 0 }), animations.animate('0.2s ease-in-out', animations.style({ opacity: opacity }))]),
        animations.transition('* => void', [animations.animate('0.2s ease-in-out', animations.style({ opacity: 0 }))]),
    ];
}
function fadeSlide(direction) {
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
        animations.transition('void => *', [animations.style({ opacity: 0, transform: transform }), animations.animate('0.2s ease-in-out')]),
        animations.transition('* => void', [animations.animate('0.2s ease-in-out', animations.style({ opacity: 0, transform: transform }))]),
    ];
}
function slide(direction) {
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
        animations.transition('void => *', [animations.style({ transform: transform }), animations.animate('0.2s ease-in-out')]),
        animations.transition('* => void', [animations.animate('0.2s ease-in-out', animations.style({ transform: transform }))]),
    ];
}

exports.ÇlrFocusTrapTracker = FocusTrapTracker;
exports.ClarityModule = ClarityModule;
exports.ClrButtonModule = ClrButtonModule;
exports.ClrButton = ClrButton;
exports.ClrButtonGroup = ClrButtonGroup;
exports.CLR_BUTTON_GROUP_DIRECTIVES = CLR_BUTTON_GROUP_DIRECTIVES;
exports.ClrButtonGroupModule = ClrButtonGroupModule;
exports.Button = Button;
exports.ButtonGroup = ButtonGroup;
exports.BUTTON_GROUP_DIRECTIVES = BUTTON_GROUP_DIRECTIVES;
exports.ClrLoadingButton = ClrLoadingButton;
exports.CLR_LOADING_BUTTON_DIRECTIVES = CLR_LOADING_BUTTON_DIRECTIVES;
exports.ClrLoadingButtonModule = ClrLoadingButtonModule;
exports.LoadingButton = LoadingButton;
exports.LOADING_BUTTON_DIRECTIVES = LOADING_BUTTON_DIRECTIVES;
exports.ClrCodeModule = ClrCodeModule;
exports.ClrCodeHighlight = ClrCodeHighlight;
exports.CLR_CODE_HIGHLIGHT_DIRECTIVES = CLR_CODE_HIGHLIGHT_DIRECTIVES;
exports.ClrSyntaxHighlightModule = ClrSyntaxHighlightModule;
exports.CodeHighlight = CodeHighlight;
exports.CODE_HIGHLIGHT_DIRECTIVES = CODE_HIGHLIGHT_DIRECTIVES;
exports.ClrDataModule = ClrDataModule;
exports.ClrDatagrid = ClrDatagrid;
exports.ClrDatagridActionBar = ClrDatagridActionBar;
exports.ClrDatagridActionOverflow = ClrDatagridActionOverflow;
exports.ClrDatagridColumn = ClrDatagridColumn;
exports.ClrDatagridColumnToggle = ClrDatagridColumnToggle;
exports.ClrDatagridHideableColumn = ClrDatagridHideableColumn;
exports.ClrDatagridFilter = ClrDatagridFilter;
exports.ClrDatagridItems = ClrDatagridItems;
exports.ClrDatagridRow = ClrDatagridRow;
exports.ClrDatagridRowDetail = ClrDatagridRowDetail;
exports.ClrDatagridCell = ClrDatagridCell;
exports.ClrDatagridFooter = ClrDatagridFooter;
exports.ClrDatagridPagination = ClrDatagridPagination;
exports.ClrDatagridPlaceholder = ClrDatagridPlaceholder;
exports.ClrDatagridSortOrder = ClrDatagridSortOrder;
exports.DatagridStringFilter = DatagridStringFilter;
exports.DatagridPropertyStringFilter = DatagridPropertyStringFilter;
exports.DatagridPropertyComparator = DatagridPropertyComparator;
exports.CLR_DATAGRID_DIRECTIVES = CLR_DATAGRID_DIRECTIVES;
exports.ClrDatagridModule = ClrDatagridModule;
exports.Datagrid = Datagrid;
exports.DatagridActionBar = DatagridActionBar;
exports.DatagridActionOverflow = DatagridActionOverflow;
exports.DatagridColumn = DatagridColumn;
exports.DatagridColumnToggle = DatagridColumnToggle;
exports.DatagridHideableColumnDirective = DatagridHideableColumnDirective;
exports.DatagridFilter = DatagridFilter;
exports.DatagridItems = DatagridItems;
exports.DatagridRow = DatagridRow;
exports.DatagridRowDetail = DatagridRowDetail;
exports.DatagridCell = DatagridCell;
exports.DatagridFooter = DatagridFooter;
exports.DatagridPagination = DatagridPagination;
exports.DatagridPlaceholder = DatagridPlaceholder;
exports.SortOrder = SortOrder;
exports.DATAGRID_DIRECTIVES = DATAGRID_DIRECTIVES;
exports.ClrTreeNode = ClrTreeNode;
exports.CLR_TREE_VIEW_DIRECTIVES = CLR_TREE_VIEW_DIRECTIVES;
exports.ClrTreeViewModule = ClrTreeViewModule;
exports.TreeNode = TreeNode;
exports.TREE_VIEW_DIRECTIVES = TREE_VIEW_DIRECTIVES;
exports.ClrStackView = ClrStackView;
exports.ClrStackHeader = ClrStackHeader;
exports.ClrStackBlock = ClrStackBlock;
exports.ClrStackInput = ClrStackInput;
exports.ClrStackSelect = ClrStackSelect;
exports.CLR_STACK_VIEW_DIRECTIVES = CLR_STACK_VIEW_DIRECTIVES;
exports.ClrStackViewModule = ClrStackViewModule;
exports.StackView = StackView;
exports.StackHeader = StackHeader;
exports.StackBlock = StackBlock;
exports.StackViewCustomTags = StackViewCustomTags;
exports.StackInput = StackInput;
exports.StackSelect = StackSelect;
exports.STACK_VIEW_DIRECTIVES = STACK_VIEW_DIRECTIVES;
exports.ClrStackViewCustomTags = ClrStackViewCustomTags;
exports.ClrEmphasisModule = ClrEmphasisModule;
exports.ClrAlert = ClrAlert;
exports.ClrAlertItem = ClrAlertItem;
exports.ClrAlerts = ClrAlerts;
exports.ClrAlertsPager = ClrAlertsPager;
exports.CLR_ALERT_DIRECTIVES = CLR_ALERT_DIRECTIVES;
exports.ClrAlertModule = ClrAlertModule;
exports.Alert = Alert;
exports.AlertItem = AlertItem;
exports.Alerts = Alerts;
exports.AlertsPager = AlertsPager;
exports.ALERT_DIRECTIVES = ALERT_DIRECTIVES;
exports.ClrLabel = ClrLabel;
exports.ClrCommonFormsModule = ClrCommonFormsModule;
exports.ClrDateContainer = ClrDateContainer;
exports.ClrDateInput = ClrDateInput;
exports.ClrDatepickerViewManager = ClrDatepickerViewManager;
exports.ClrDaypicker = ClrDaypicker;
exports.ClrMonthpicker = ClrMonthpicker;
exports.ClrYearpicker = ClrYearpicker;
exports.ClrCalendar = ClrCalendar;
exports.ClrDay = ClrDay;
exports.CLR_DATEPICKER_DIRECTIVES = CLR_DATEPICKER_DIRECTIVES;
exports.ClrDatepickerModule = ClrDatepickerModule;
exports.ClrCheckboxNext = ClrCheckboxNext;
exports.ClrCheckboxContainer = ClrCheckboxContainer;
exports.ClrCheckboxNextModule = ClrCheckboxNextModule;
exports.ClrInput = ClrInput;
exports.ClrInputContainer = ClrInputContainer;
exports.ClrInputModule = ClrInputModule;
exports.ClrRadio = ClrRadio;
exports.ClrRadioContainer = ClrRadioContainer;
exports.ClrRadioModule = ClrRadioModule;
exports.ClrFormsNextModule = ClrFormsNextModule;
exports.ClrCheckboxDeprecated = ClrCheckboxDeprecated;
exports.CLR_CHECKBOX_DIRECTIVES = CLR_CHECKBOX_DIRECTIVES;
exports.ClrCheckboxModule = ClrCheckboxModule;
exports.Checkbox = Checkbox;
exports.ClrCheckbox = ClrCheckbox;
exports.CHECKBOX_DIRECTIVES = CHECKBOX_DIRECTIVES;
exports.ClrFormsModule = ClrFormsModule;
exports.ClrIconCustomTag = ClrIconCustomTag;
exports.CLR_ICON_DIRECTIVES = CLR_ICON_DIRECTIVES;
exports.ClrIconModule = ClrIconModule;
exports.IconCustomTag = IconCustomTag;
exports.ICON_DIRECTIVES = ICON_DIRECTIVES;
exports.ClrLayoutModule = ClrLayoutModule;
exports.ClrMainContainer = ClrMainContainer;
exports.CLR_LAYOUT_DIRECTIVES = CLR_LAYOUT_DIRECTIVES;
exports.ClrMainContainerModule = ClrMainContainerModule;
exports.MainContainer = MainContainer;
exports.LAYOUT_DIRECTIVES = LAYOUT_DIRECTIVES;
exports.MainContainerWillyWonka = MainContainerWillyWonka;
exports.NavDetectionOompaLoompa = NavDetectionOompaLoompa;
exports.ClrHeader = ClrHeader;
exports.ClrNavLevel = ClrNavLevel;
exports.CLR_NAVIGATION_DIRECTIVES = CLR_NAVIGATION_DIRECTIVES;
exports.ClrNavigationModule = ClrNavigationModule;
exports.Header = Header;
exports.NavLevelDirective = NavLevelDirective;
exports.NAVIGATION_DIRECTIVES = NAVIGATION_DIRECTIVES;
exports.ClrTabs = ClrTabs;
exports.ClrTab = ClrTab;
exports.ClrTabContent = ClrTabContent;
exports.ClrTabOverflowContent = ClrTabOverflowContent;
exports.ClrTabLink = ClrTabLink;
exports.CLR_TABS_DIRECTIVES = CLR_TABS_DIRECTIVES;
exports.ClrTabsModule = ClrTabsModule;
exports.Tab = Tab;
exports.Tabs = Tabs;
exports.TabContent = TabContent;
exports.TabOverflowContent = TabOverflowContent;
exports.TabLinkDirective = TabLinkDirective;
exports.TABS_DIRECTIVES = TABS_DIRECTIVES;
exports.ClrVerticalNavGroupChildren = ClrVerticalNavGroupChildren;
exports.ClrVerticalNavGroup = ClrVerticalNavGroup;
exports.ClrVerticalNav = ClrVerticalNav;
exports.ClrVerticalNavLink = ClrVerticalNavLink;
exports.ClrVerticalNavIcon = ClrVerticalNavIcon;
exports.CLR_VERTICAL_NAV_DIRECTIVES = CLR_VERTICAL_NAV_DIRECTIVES;
exports.ClrVerticalNavModule = ClrVerticalNavModule;
exports.VerticalNav = VerticalNav;
exports.VerticalNavGroup = VerticalNavGroup;
exports.VerticalNavGroupChildren = VerticalNavGroupChildren;
exports.VerticalNavIcon = VerticalNavIcon;
exports.VerticalNavLink = VerticalNavLink;
exports.VERTICAL_NAV_DIRECTIVES = VERTICAL_NAV_DIRECTIVES;
exports.ClrModal = ClrModal;
exports.CLR_MODAL_DIRECTIVES = CLR_MODAL_DIRECTIVES;
exports.ClrModalModule = ClrModalModule;
exports.Modal = Modal;
exports.MODAL_DIRECTIVES = MODAL_DIRECTIVES;
exports.ClrDropdown = ClrDropdown;
exports.ClrDropdownMenu = ClrDropdownMenu;
exports.ClrDropdownTrigger = ClrDropdownTrigger;
exports.ClrDropdownItem = ClrDropdownItem;
exports.CLR_MENU_POSITIONS = CLR_MENU_POSITIONS;
exports.CLR_DROPDOWN_DIRECTIVES = CLR_DROPDOWN_DIRECTIVES;
exports.ClrDropdownModule = ClrDropdownModule;
exports.Dropdown = Dropdown;
exports.DropdownMenu = DropdownMenu;
exports.DropdownTrigger = DropdownTrigger;
exports.DropdownItem = DropdownItem;
exports.menuPositions = menuPositions;
exports.DROPDOWN_DIRECTIVES = DROPDOWN_DIRECTIVES;
exports.ClrPopoverModule = ClrPopoverModule;
exports.ClrSignpost = ClrSignpost;
exports.ClrSignpostContent = ClrSignpostContent;
exports.ClrSignpostTrigger = ClrSignpostTrigger;
exports.CLR_SIGNPOST_DIRECTIVES = CLR_SIGNPOST_DIRECTIVES;
exports.ClrSignpostModule = ClrSignpostModule;
exports.Signpost = Signpost;
exports.SignpostContent = SignpostContent;
exports.SignpostTrigger = SignpostTrigger;
exports.SIGNPOST_DIRECTIVES = SIGNPOST_DIRECTIVES;
exports.ClrTooltip = ClrTooltip;
exports.ClrTooltipTrigger = ClrTooltipTrigger;
exports.ClrTooltipContent = ClrTooltipContent;
exports.CLR_TOOLTIP_DIRECTIVES = CLR_TOOLTIP_DIRECTIVES;
exports.ClrTooltipModule = ClrTooltipModule;
exports.Tooltip = Tooltip;
exports.TooltipContent = TooltipContent;
exports.TooltipTrigger = TooltipTrigger;
exports.TOOLTIP_DIRECTIVES = TOOLTIP_DIRECTIVES;
exports.collapse = collapse;
exports.fade = fade;
exports.fadeSlide = fadeSlide;
exports.slide = slide;
exports.ClrLoadingState = ClrLoadingState;
exports.ClrLoading = ClrLoading;
exports.LoadingListener = LoadingListener;
exports.CLR_LOADING_DIRECTIVES = CLR_LOADING_DIRECTIVES;
exports.ClrLoadingModule = ClrLoadingModule;
exports.Loading = Loading;
exports.LOADING_DIRECTIVES = LOADING_DIRECTIVES;
exports.ClrWizard = ClrWizard;
exports.ClrWizardPage = ClrWizardPage;
exports.ClrWizardStepnav = ClrWizardStepnav;
exports.ClrWizardStepnavItem = ClrWizardStepnavItem;
exports.DEFAULT_BUTTON_TYPES = DEFAULT_BUTTON_TYPES;
exports.CUSTOM_BUTTON_TYPES = CUSTOM_BUTTON_TYPES;
exports.ClrWizardButton = ClrWizardButton;
exports.ClrWizardHeaderAction = ClrWizardHeaderAction;
exports.ClrWizardCustomTags = ClrWizardCustomTags;
exports.ClrWizardPageTitle = ClrWizardPageTitle;
exports.ClrWizardPageNavTitle = ClrWizardPageNavTitle;
exports.ClrWizardPageButtons = ClrWizardPageButtons;
exports.ClrWizardPageHeaderActions = ClrWizardPageHeaderActions;
exports.CLR_WIZARD_DIRECTIVES = CLR_WIZARD_DIRECTIVES;
exports.ClrWizardModule = ClrWizardModule;
exports.Wizard = Wizard;
exports.WizardPage = WizardPage;
exports.WizardStepnav = WizardStepnav;
exports.WizardStepnavItem = WizardStepnavItem;
exports.WizardButton = WizardButton;
exports.WizardHeaderAction = WizardHeaderAction;
exports.WizardCustomTags = WizardCustomTags;
exports.WizardPageTitleDirective = WizardPageTitleDirective;
exports.WizardPageNavTitleDirective = WizardPageNavTitleDirective;
exports.WizardPageButtonsDirective = WizardPageButtonsDirective;
exports.WizardPageHeaderActionsDirective = WizardPageHeaderActionsDirective;
exports.WIZARD_DIRECTIVES = WIZARD_DIRECTIVES;
exports.ɵdg = ButtonInGroupService;
exports.ɵct = DatagridRowExpandAnimation;
exports.ɵcq = ActionableOompaLoompa;
exports.ɵco = DatagridWillyWonka;
exports.ɵcs = ExpandableOompaLoompa;
exports.ɵcb = ClrDatagridColumnToggleButton;
exports.ɵca = ClrDatagridColumnToggleTitle;
exports.ɵcd = DatagridDetailRegisterer;
exports.ɵcc = ClrDatagridItemsTrackBy;
exports.ɵbv = ColumnToggleButtonsService;
exports.ɵby = CustomFilter;
exports.ɵbx = DragDispatcher;
exports.ɵbm = FiltersProvider;
exports.ɵbs = ExpandableRowsCount;
exports.ɵbt = HideableColumnService;
exports.ɵbl = Items;
exports.ɵbn = Page;
exports.ɵbr = RowActionService;
exports.ɵbk = Selection;
exports.ɵbp = Sort;
exports.ɵbo = StateDebouncer;
exports.ɵbu = StateProvider;
exports.ɵcl = DatagridBodyRenderer;
exports.ɵcn = DatagridCellRenderer;
exports.ɵci = DatagridColumnResizer;
exports.ɵcg = DomAdapter;
exports.ɵck = DatagridHeadRenderer;
exports.ɵch = DatagridHeaderRenderer;
exports.ɵcf = DatagridMainRenderer;
exports.ɵce = domAdapterFactory;
exports.ɵbq = DatagridRenderOrganizer;
exports.ɵcm = DatagridRowRenderer;
exports.ɵcj = DatagridTableRenderer;
exports.ɵbw = DatagridFilterRegistrar;
exports.ɵcx = StackControl;
exports.ɵcy = AbstractTreeSelection;
exports.ɵda = clrTreeSelectionProviderFactory;
exports.ɵcz = TreeSelectionService;
exports.ɵr = AlertIconAndTypesService;
exports.ɵs = MultiAlertService;
exports.ɵed = ClrControlError;
exports.ɵee = ClrControlHelper;
exports.ɵef = ClrIfError;
exports.ɵeb = IfErrorService;
exports.ɵba = ControlIdService;
exports.ɵec = NgControlService;
exports.ɵbe = WrappedFormControl;
exports.ɵz = DateFormControlService;
exports.ɵbc = DateIOService;
exports.ɵy = DateNavigationService;
exports.ɵbd = DatepickerEnabledService;
exports.ɵbg = DatepickerFocusService;
exports.ɵbb = LocaleHelperService;
exports.ɵbf = ViewManagerService;
exports.ɵdi = ResponsiveNavigationProvider;
exports.ɵdh = ResponsiveNavigationService;
exports.ɵds = ActiveOompaLoompa;
exports.ɵdr = TabsWillyWonka;
exports.ɵdm = AriaService;
exports.ɵdq = TabsService;
exports.ɵdn = TABS_ID;
exports.ɵdp = TABS_ID_PROVIDER;
exports.ɵdo = tokenFactory$1;
exports.ɵdv = VerticalNavGroupRegistrationService;
exports.ɵdw = VerticalNavGroupService;
exports.ɵdu = VerticalNavIconService;
exports.ɵdt = VerticalNavService;
exports.ɵdf = GHOST_PAGE_ANIMATION;
exports.ɵi = AbstractPopover;
exports.ɵb = POPOVER_DIRECTIVES;
exports.ɵh = POPOVER_HOST_ANCHOR;
exports.ɵc = PopoverDirectiveOld;
exports.ɵa = ClrCommonPopoverModule;
exports.ɵg = ROOT_DROPDOWN_PROVIDER;
exports.ɵe = RootDropdownService;
exports.ɵf = clrRootDropdownFactory;
exports.ɵcr = OompaLoompa;
exports.ɵcp = WillyWonka;
exports.ɵj = ClrConditionalModule;
exports.ɵl = IfActiveDirective;
exports.ɵn = IF_ACTIVE_ID;
exports.ɵp = IF_ACTIVE_ID_PROVIDER;
exports.ɵq = IfActiveService;
exports.ɵo = tokenFactory;
exports.ɵm = IfOpenDirective;
exports.ɵd = IfOpenService;
exports.ɵk = CONDITIONAL_DIRECTIVES;
exports.ɵcu = ClrIfExpandModule;
exports.ɵcw = IfExpanded;
exports.ɵcv = EXPAND_DIRECTIVES;
exports.ɵbz = Expand;
exports.ɵx = FocusTrapDirective;
exports.ɵv = ClrFocusTrapModule;
exports.ɵw = FOCUS_TRAP_DIRECTIVES;
exports.ɵu = EmptyAnchor;
exports.ɵt = ClrHostWrappingModule;
exports.ɵdb = UNIQUE_ID;
exports.ɵdd = UNIQUE_ID_PROVIDER;
exports.ɵdc = uniqueIdFactory;
exports.ɵbi = OUSTIDE_CLICK_DIRECTIVES;
exports.ɵbj = OutsideClick;
exports.ɵbh = ClrOutsideClickModule;
exports.ɵde = ScrollingService;
exports.ɵdk = TEMPLATE_REF_DIRECTIVES;
exports.ɵdl = TemplateRefContainer;
exports.ɵdj = ClrTemplateRefModule;
exports.ɵdz = ButtonHubService;
exports.ɵea = HeaderActionService;
exports.ɵdy = PageCollectionService;
exports.ɵdx = WizardNavigationService;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=clr-angular.umd.js.map
