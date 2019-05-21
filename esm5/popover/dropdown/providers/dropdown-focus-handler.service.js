/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, Optional, PLATFORM_ID, Renderer2, SkipSelf } from '@angular/core';
import { of, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { IfOpenService } from '../../../utils/conditional/if-open.service';
import { customFocusableItemProvider } from '../../../utils/focus/focusable-item/custom-focusable-item-provider';
import { UNIQUE_ID } from '../../../utils/id-generator/id-generator.service';
import { ArrowKeyDirection } from '../../../utils/focus/arrow-key-direction.enum';
import { FocusService } from '../../../utils/focus/focus.service';
import { linkParent, linkVertical } from '../../../utils/focus/focusable-item/linkers';
import { wrapObservable } from '../../../utils/focus/wrap-observable';
var DropdownFocusHandler = /** @class */ (function () {
    function DropdownFocusHandler(id, renderer, parent, ifOpenService, focusService, platformId) {
        this.id = id;
        this.renderer = renderer;
        this.parent = parent;
        this.ifOpenService = ifOpenService;
        this.focusService = focusService;
        this.platformId = platformId;
        this.focusBackOnTrigger = false;
        this.resetChildren();
        this.moveToFirstItemWhenOpen();
        if (!this.parent) {
            this.handleRootFocus();
        }
    }
    /**
     * If the dropdown was opened by clicking on the trigger, we automatically move to the first item
     */
    /**
     * If the dropdown was opened by clicking on the trigger, we automatically move to the first item
     * @return {?}
     */
    DropdownFocusHandler.prototype.moveToFirstItemWhenOpen = /**
     * If the dropdown was opened by clicking on the trigger, we automatically move to the first item
     * @return {?}
     */
    function () {
        var _this = this;
        this.ifOpenService.openChange.subscribe((/**
         * @param {?} open
         * @return {?}
         */
        function (open) {
            if (open && _this.ifOpenService.originalEvent) {
                // Even if we properly waited for ngAfterViewInit, the container still wouldn't be attached to the DOM.
                // So setTimeout is the only way to wait for the container to be ready to move focus to first item.
                setTimeout((/**
                 * @return {?}
                 */
                function () {
                    _this.focusService.moveTo(_this);
                    if (_this.parent) {
                        _this.focusService.move(ArrowKeyDirection.RIGHT);
                    }
                    else {
                        _this.focusService.move(ArrowKeyDirection.DOWN);
                    }
                }));
            }
        }));
    };
    /**
     * Focus on the menu when it opens, and focus back on the root trigger when the whole dropdown becomes closed
     */
    /**
     * Focus on the menu when it opens, and focus back on the root trigger when the whole dropdown becomes closed
     * @return {?}
     */
    DropdownFocusHandler.prototype.handleRootFocus = /**
     * Focus on the menu when it opens, and focus back on the root trigger when the whole dropdown becomes closed
     * @return {?}
     */
    function () {
        var _this = this;
        this.ifOpenService.openChange.subscribe((/**
         * @param {?} open
         * @return {?}
         */
        function (open) {
            if (open) {
                // Even if we properly waited for ngAfterViewInit, the container still wouldn't be attached to the DOM.
                // So setTimeout is the only way to wait for the container to be ready to focus it.
                setTimeout((/**
                 * @return {?}
                 */
                function () {
                    if (_this.container && isPlatformBrowser(_this.platformId)) {
                        _this.container.focus();
                    }
                }));
            }
            if (!open) {
                // We reset the state of the focus service both on initialization and when closing.
                _this.focusService.reset(_this);
                // But we only actively focus the trigger when closing, not on initialization.
                if (_this.focusBackOnTrigger) {
                    _this.focus();
                }
            }
            _this.focusBackOnTrigger = open;
        }));
    };
    Object.defineProperty(DropdownFocusHandler.prototype, "trigger", {
        get: /**
         * @return {?}
         */
        function () {
            return this._trigger;
        },
        set: /**
         * @param {?} el
         * @return {?}
         */
        function (el) {
            this._trigger = el;
            this.renderer.setAttribute(el, 'id', this.id);
            if (this.parent) {
                // The root trigger needs to be in the tab flow, but nested ones are removed like any other dropdown item.
                this.renderer.setAttribute(el, 'tabindex', '-1');
            }
            else {
                // The root trigger is the only one outside of the menu, so it needs to its own key listeners.
                this.focusService.listenToArrowKeys(el);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropdownFocusHandler.prototype, "container", {
        get: /**
         * @return {?}
         */
        function () {
            return this._container;
        },
        set: /**
         * @param {?} el
         * @return {?}
         */
        function (el) {
            var _this = this;
            this._container = el;
            if (!this.parent) {
                // The root container is the only one we register to the focus service, others do not need focus
                this.focusService.registerContainer(el);
                // For dropdowns, the menu shouldn't actually be in the tab order. We manually focus it when opening.
                this.renderer.setAttribute(el, 'tabindex', '-1');
                // When the user moves focus outside of the menu, we close the dropdown
                this.renderer.listen(el, 'focusout', (/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) {
                    // focusout + relatedTarget because a simple blur event would trigger
                    // when the user clicks an item inside of the menu, closing the dropdown.
                    if (event.relatedTarget && isPlatformBrowser(_this.platformId)) {
                        if (el.contains(event.relatedTarget) || event.relatedTarget === _this.trigger) {
                            return;
                        }
                    }
                    // We let the user move focus to where the want, we don't force the focus back on the trigger
                    _this.focusBackOnTrigger = false;
                    _this.ifOpenService.open = false;
                }));
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DropdownFocusHandler.prototype.focus = /**
     * @return {?}
     */
    function () {
        if (this.trigger) {
            if (this.parent) {
                this.renderer.addClass(this.trigger, 'clr-focus');
            }
            else if (isPlatformBrowser(this.platformId)) {
                this.trigger.focus();
            }
        }
    };
    /**
     * @return {?}
     */
    DropdownFocusHandler.prototype.blur = /**
     * @return {?}
     */
    function () {
        if (this.trigger) {
            if (this.parent) {
                this.renderer.removeClass(this.trigger, 'clr-focus');
            }
            else if (isPlatformBrowser(this.platformId)) {
                this.trigger.blur();
            }
        }
    };
    /**
     * @return {?}
     */
    DropdownFocusHandler.prototype.activate = /**
     * @return {?}
     */
    function () {
        if (isPlatformBrowser(this.platformId)) {
            this.trigger.click();
        }
    };
    /**
     * @private
     * @return {?}
     */
    DropdownFocusHandler.prototype.openAndGetChildren = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        return wrapObservable(this.children, (/**
         * @return {?}
         */
        function () { return (_this.ifOpenService.open = true); }));
    };
    /**
     * @private
     * @return {?}
     */
    DropdownFocusHandler.prototype.closeAndGetThis = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        return wrapObservable(of(this), (/**
         * @return {?}
         */
        function () { return (_this.ifOpenService.open = false); }));
    };
    /**
     * @return {?}
     */
    DropdownFocusHandler.prototype.resetChildren = /**
     * @return {?}
     */
    function () {
        this.children = new ReplaySubject(1);
        if (this.parent) {
            this.right = this.openAndGetChildren().pipe(map((/**
             * @param {?} all
             * @return {?}
             */
            function (all) { return all[0]; })));
        }
        else {
            this.down = this.openAndGetChildren().pipe(map((/**
             * @param {?} all
             * @return {?}
             */
            function (all) { return all[0]; })));
            this.up = this.openAndGetChildren().pipe(map((/**
             * @param {?} all
             * @return {?}
             */
            function (all) { return all[all.length - 1]; })));
        }
    };
    /**
     * @param {?} children
     * @return {?}
     */
    DropdownFocusHandler.prototype.addChildren = /**
     * @param {?} children
     * @return {?}
     */
    function (children) {
        linkVertical(children);
        if (this.parent) {
            linkParent(children, this.closeAndGetThis(), ArrowKeyDirection.LEFT);
        }
        this.children.next(children);
    };
    DropdownFocusHandler.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    DropdownFocusHandler.ctorParameters = function () { return [
        { type: String, decorators: [{ type: Inject, args: [UNIQUE_ID,] }] },
        { type: Renderer2 },
        { type: DropdownFocusHandler, decorators: [{ type: SkipSelf }, { type: Optional }] },
        { type: IfOpenService },
        { type: FocusService },
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
    ]; };
    return DropdownFocusHandler;
}());
export { DropdownFocusHandler };
if (false) {
    /**
     * @type {?}
     * @private
     */
    DropdownFocusHandler.prototype.focusBackOnTrigger;
    /**
     * @type {?}
     * @private
     */
    DropdownFocusHandler.prototype._trigger;
    /**
     * @type {?}
     * @private
     */
    DropdownFocusHandler.prototype._container;
    /**
     * @type {?}
     * @private
     */
    DropdownFocusHandler.prototype.children;
    /** @type {?} */
    DropdownFocusHandler.prototype.right;
    /** @type {?} */
    DropdownFocusHandler.prototype.down;
    /** @type {?} */
    DropdownFocusHandler.prototype.up;
    /** @type {?} */
    DropdownFocusHandler.prototype.id;
    /**
     * @type {?}
     * @private
     */
    DropdownFocusHandler.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    DropdownFocusHandler.prototype.parent;
    /**
     * @type {?}
     * @private
     */
    DropdownFocusHandler.prototype.ifOpenService;
    /**
     * @type {?}
     * @private
     */
    DropdownFocusHandler.prototype.focusService;
    /**
     * @type {?}
     * @private
     */
    DropdownFocusHandler.prototype.platformId;
}
/** @type {?} */
export var DROPDOWN_FOCUS_HANDLER_PROVIDER = customFocusableItemProvider(DropdownFocusHandler);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24tZm9jdXMtaGFuZGxlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsicG9wb3Zlci9kcm9wZG93bi9wcm92aWRlcnMvZHJvcGRvd24tZm9jdXMtaGFuZGxlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQU1BLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRixPQUFPLEVBQWMsRUFBRSxFQUFFLGFBQWEsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNyRCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQzNFLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLG9FQUFvRSxDQUFDO0FBQ2pILE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUM3RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUNsRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFFbEUsT0FBTyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUN2RixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFFdEU7SUFFRSw4QkFDNEIsRUFBVSxFQUM1QixRQUFtQixFQUduQixNQUE0QixFQUM1QixhQUE0QixFQUM1QixZQUEwQixFQUNMLFVBQWtCO1FBUHJCLE9BQUUsR0FBRixFQUFFLENBQVE7UUFDNUIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUduQixXQUFNLEdBQU4sTUFBTSxDQUFz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WSxvQkFBb0I7Ozs7OztJQXNDL0Isa0RBQW1DOzs7OztJQTRCbkMsd0NBQThCOzs7OztJQWdCOUIsMENBQWdDOzs7OztJQW9EaEMsd0NBQWlEOztJQUNqRCxxQ0FBa0M7O0lBQ2xDLG9DQUFpQzs7SUFDakMsa0NBQStCOztJQXZJN0Isa0NBQW9DOzs7OztJQUNwQyx3Q0FBMkI7Ozs7O0lBQzNCLHNDQUVvQzs7Ozs7SUFDcEMsNkNBQW9DOzs7OztJQUNwQyw0Q0FBa0M7Ozs7O0lBQ2xDLDBDQUErQzs7O0FBNEpuRCxNQUFNLEtBQU8sK0JBQStCLEdBQUcsMkJBQTJCLENBQUMsb0JBQW9CLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgT3B0aW9uYWwsIFBMQVRGT1JNX0lELCBSZW5kZXJlcjIsIFNraXBTZWxmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiwgUmVwbGF5U3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgSWZPcGVuU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2NvbmRpdGlvbmFsL2lmLW9wZW4uc2VydmljZSc7XG5pbXBvcnQgeyBjdXN0b21Gb2N1c2FibGVJdGVtUHJvdmlkZXIgfSBmcm9tICcuLi8uLi8uLi91dGlscy9mb2N1cy9mb2N1c2FibGUtaXRlbS9jdXN0b20tZm9jdXNhYmxlLWl0ZW0tcHJvdmlkZXInO1xuaW1wb3J0IHsgVU5JUVVFX0lEIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvaWQtZ2VuZXJhdG9yL2lkLWdlbmVyYXRvci5zZXJ2aWNlJztcbmltcG9ydCB7IEFycm93S2V5RGlyZWN0aW9uIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvZm9jdXMvYXJyb3cta2V5LWRpcmVjdGlvbi5lbnVtJztcbmltcG9ydCB7IEZvY3VzU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2ZvY3VzL2ZvY3VzLnNlcnZpY2UnO1xuaW1wb3J0IHsgRm9jdXNhYmxlSXRlbSB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2ZvY3VzL2ZvY3VzYWJsZS1pdGVtL2ZvY3VzYWJsZS1pdGVtJztcbmltcG9ydCB7IGxpbmtQYXJlbnQsIGxpbmtWZXJ0aWNhbCB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2ZvY3VzL2ZvY3VzYWJsZS1pdGVtL2xpbmtlcnMnO1xuaW1wb3J0IHsgd3JhcE9ic2VydmFibGUgfSBmcm9tICcuLi8uLi8uLi91dGlscy9mb2N1cy93cmFwLW9ic2VydmFibGUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRHJvcGRvd25Gb2N1c0hhbmRsZXIgaW1wbGVtZW50cyBGb2N1c2FibGVJdGVtIHtcbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChVTklRVUVfSUQpIHB1YmxpYyBpZDogc3RyaW5nLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBAU2tpcFNlbGYoKVxuICAgIEBPcHRpb25hbCgpXG4gICAgcHJpdmF0ZSBwYXJlbnQ6IERyb3Bkb3duRm9jdXNIYW5kbGVyLFxuICAgIHByaXZhdGUgaWZPcGVuU2VydmljZTogSWZPcGVuU2VydmljZSxcbiAgICBwcml2YXRlIGZvY3VzU2VydmljZTogRm9jdXNTZXJ2aWNlLFxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogT2JqZWN0XG4gICkge1xuICAgIHRoaXMucmVzZXRDaGlsZHJlbigpO1xuICAgIHRoaXMubW92ZVRvRmlyc3RJdGVtV2hlbk9wZW4oKTtcbiAgICBpZiAoIXRoaXMucGFyZW50KSB7XG4gICAgICB0aGlzLmhhbmRsZVJvb3RGb2N1cygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJZiB0aGUgZHJvcGRvd24gd2FzIG9wZW5lZCBieSBjbGlja2luZyBvbiB0aGUgdHJpZ2dlciwgd2UgYXV0b21hdGljYWxseSBtb3ZlIHRvIHRoZSBmaXJzdCBpdGVtXG4gICAqL1xuICBtb3ZlVG9GaXJzdEl0ZW1XaGVuT3BlbigpIHtcbiAgICB0aGlzLmlmT3BlblNlcnZpY2Uub3BlbkNoYW5nZS5zdWJzY3JpYmUob3BlbiA9PiB7XG4gICAgICBpZiAob3BlbiAmJiB0aGlzLmlmT3BlblNlcnZpY2Uub3JpZ2luYWxFdmVudCkge1xuICAgICAgICAvLyBFdmVuIGlmIHdlIHByb3Blcmx5IHdhaXRlZCBmb3IgbmdBZnRlclZpZXdJbml0LCB0aGUgY29udGFpbmVyIHN0aWxsIHdvdWxkbid0IGJlIGF0dGFjaGVkIHRvIHRoZSBET00uXG4gICAgICAgIC8vIFNvIHNldFRpbWVvdXQgaXMgdGhlIG9ubHkgd2F5IHRvIHdhaXQgZm9yIHRoZSBjb250YWluZXIgdG8gYmUgcmVhZHkgdG8gbW92ZSBmb2N1cyB0byBmaXJzdCBpdGVtLlxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aGlzLmZvY3VzU2VydmljZS5tb3ZlVG8odGhpcyk7XG4gICAgICAgICAgaWYgKHRoaXMucGFyZW50KSB7XG4gICAgICAgICAgICB0aGlzLmZvY3VzU2VydmljZS5tb3ZlKEFycm93S2V5RGlyZWN0aW9uLlJJR0hUKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5mb2N1c1NlcnZpY2UubW92ZShBcnJvd0tleURpcmVjdGlvbi5ET1dOKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBmb2N1c0JhY2tPblRyaWdnZXIgPSBmYWxzZTtcblxuICAvKipcbiAgICogRm9jdXMgb24gdGhlIG1lbnUgd2hlbiBpdCBvcGVucywgYW5kIGZvY3VzIGJhY2sgb24gdGhlIHJvb3QgdHJpZ2dlciB3aGVuIHRoZSB3aG9sZSBkcm9wZG93biBiZWNvbWVzIGNsb3NlZFxuICAgKi9cbiAgaGFuZGxlUm9vdEZvY3VzKCkge1xuICAgIHRoaXMuaWZPcGVuU2VydmljZS5vcGVuQ2hhbmdlLnN1YnNjcmliZShvcGVuID0+IHtcbiAgICAgIGlmIChvcGVuKSB7XG4gICAgICAgIC8vIEV2ZW4gaWYgd2UgcHJvcGVybHkgd2FpdGVkIGZvciBuZ0FmdGVyVmlld0luaXQsIHRoZSBjb250YWluZXIgc3RpbGwgd291bGRuJ3QgYmUgYXR0YWNoZWQgdG8gdGhlIERPTS5cbiAgICAgICAgLy8gU28gc2V0VGltZW91dCBpcyB0aGUgb25seSB3YXkgdG8gd2FpdCBmb3IgdGhlIGNvbnRhaW5lciB0byBiZSByZWFkeSB0byBmb2N1cyBpdC5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuY29udGFpbmVyICYmIGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLmZvY3VzKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGlmICghb3Blbikge1xuICAgICAgICAvLyBXZSByZXNldCB0aGUgc3RhdGUgb2YgdGhlIGZvY3VzIHNlcnZpY2UgYm90aCBvbiBpbml0aWFsaXphdGlvbiBhbmQgd2hlbiBjbG9zaW5nLlxuICAgICAgICB0aGlzLmZvY3VzU2VydmljZS5yZXNldCh0aGlzKTtcbiAgICAgICAgLy8gQnV0IHdlIG9ubHkgYWN0aXZlbHkgZm9jdXMgdGhlIHRyaWdnZXIgd2hlbiBjbG9zaW5nLCBub3Qgb24gaW5pdGlhbGl6YXRpb24uXG4gICAgICAgIGlmICh0aGlzLmZvY3VzQmFja09uVHJpZ2dlcikge1xuICAgICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5mb2N1c0JhY2tPblRyaWdnZXIgPSBvcGVuO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfdHJpZ2dlcjogSFRNTEVsZW1lbnQ7XG4gIGdldCB0cmlnZ2VyKCkge1xuICAgIHJldHVybiB0aGlzLl90cmlnZ2VyO1xuICB9XG4gIHNldCB0cmlnZ2VyKGVsOiBIVE1MRWxlbWVudCkge1xuICAgIHRoaXMuX3RyaWdnZXIgPSBlbDtcbiAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZShlbCwgJ2lkJywgdGhpcy5pZCk7XG4gICAgaWYgKHRoaXMucGFyZW50KSB7XG4gICAgICAvLyBUaGUgcm9vdCB0cmlnZ2VyIG5lZWRzIHRvIGJlIGluIHRoZSB0YWIgZmxvdywgYnV0IG5lc3RlZCBvbmVzIGFyZSByZW1vdmVkIGxpa2UgYW55IG90aGVyIGRyb3Bkb3duIGl0ZW0uXG4gICAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZShlbCwgJ3RhYmluZGV4JywgJy0xJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFRoZSByb290IHRyaWdnZXIgaXMgdGhlIG9ubHkgb25lIG91dHNpZGUgb2YgdGhlIG1lbnUsIHNvIGl0IG5lZWRzIHRvIGl0cyBvd24ga2V5IGxpc3RlbmVycy5cbiAgICAgIHRoaXMuZm9jdXNTZXJ2aWNlLmxpc3RlblRvQXJyb3dLZXlzKGVsKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9jb250YWluZXI6IEhUTUxFbGVtZW50O1xuICBnZXQgY29udGFpbmVyKCkge1xuICAgIHJldHVybiB0aGlzLl9jb250YWluZXI7XG4gIH1cbiAgc2V0IGNvbnRhaW5lcihlbDogSFRNTEVsZW1lbnQpIHtcbiAgICB0aGlzLl9jb250YWluZXIgPSBlbDtcbiAgICBpZiAoIXRoaXMucGFyZW50KSB7XG4gICAgICAvLyBUaGUgcm9vdCBjb250YWluZXIgaXMgdGhlIG9ubHkgb25lIHdlIHJlZ2lzdGVyIHRvIHRoZSBmb2N1cyBzZXJ2aWNlLCBvdGhlcnMgZG8gbm90IG5lZWQgZm9jdXNcbiAgICAgIHRoaXMuZm9jdXNTZXJ2aWNlLnJlZ2lzdGVyQ29udGFpbmVyKGVsKTtcbiAgICAgIC8vIEZvciBkcm9wZG93bnMsIHRoZSBtZW51IHNob3VsZG4ndCBhY3R1YWxseSBiZSBpbiB0aGUgdGFiIG9yZGVyLiBXZSBtYW51YWxseSBmb2N1cyBpdCB3aGVuIG9wZW5pbmcuXG4gICAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZShlbCwgJ3RhYmluZGV4JywgJy0xJyk7XG4gICAgICAvLyBXaGVuIHRoZSB1c2VyIG1vdmVzIGZvY3VzIG91dHNpZGUgb2YgdGhlIG1lbnUsIHdlIGNsb3NlIHRoZSBkcm9wZG93blxuICAgICAgdGhpcy5yZW5kZXJlci5saXN0ZW4oZWwsICdmb2N1c291dCcsIGV2ZW50ID0+IHtcbiAgICAgICAgLy8gZm9jdXNvdXQgKyByZWxhdGVkVGFyZ2V0IGJlY2F1c2UgYSBzaW1wbGUgYmx1ciBldmVudCB3b3VsZCB0cmlnZ2VyXG4gICAgICAgIC8vIHdoZW4gdGhlIHVzZXIgY2xpY2tzIGFuIGl0ZW0gaW5zaWRlIG9mIHRoZSBtZW51LCBjbG9zaW5nIHRoZSBkcm9wZG93bi5cbiAgICAgICAgaWYgKGV2ZW50LnJlbGF0ZWRUYXJnZXQgJiYgaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgICAgIGlmIChlbC5jb250YWlucyhldmVudC5yZWxhdGVkVGFyZ2V0KSB8fCBldmVudC5yZWxhdGVkVGFyZ2V0ID09PSB0aGlzLnRyaWdnZXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gV2UgbGV0IHRoZSB1c2VyIG1vdmUgZm9jdXMgdG8gd2hlcmUgdGhlIHdhbnQsIHdlIGRvbid0IGZvcmNlIHRoZSBmb2N1cyBiYWNrIG9uIHRoZSB0cmlnZ2VyXG4gICAgICAgIHRoaXMuZm9jdXNCYWNrT25UcmlnZ2VyID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaWZPcGVuU2VydmljZS5vcGVuID0gZmFsc2U7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBmb2N1cygpIHtcbiAgICBpZiAodGhpcy50cmlnZ2VyKSB7XG4gICAgICBpZiAodGhpcy5wYXJlbnQpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLnRyaWdnZXIsICdjbHItZm9jdXMnKTtcbiAgICAgIH0gZWxzZSBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgICB0aGlzLnRyaWdnZXIuZm9jdXMoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgYmx1cigpIHtcbiAgICBpZiAodGhpcy50cmlnZ2VyKSB7XG4gICAgICBpZiAodGhpcy5wYXJlbnQpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLnRyaWdnZXIsICdjbHItZm9jdXMnKTtcbiAgICAgIH0gZWxzZSBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgICB0aGlzLnRyaWdnZXIuYmx1cigpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFjdGl2YXRlKCkge1xuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICB0aGlzLnRyaWdnZXIuY2xpY2soKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNoaWxkcmVuOiBSZXBsYXlTdWJqZWN0PEZvY3VzYWJsZUl0ZW1bXT47XG4gIHJpZ2h0PzogT2JzZXJ2YWJsZTxGb2N1c2FibGVJdGVtPjtcbiAgZG93bj86IE9ic2VydmFibGU8Rm9jdXNhYmxlSXRlbT47XG4gIHVwPzogT2JzZXJ2YWJsZTxGb2N1c2FibGVJdGVtPjtcblxuICBwcml2YXRlIG9wZW5BbmRHZXRDaGlsZHJlbigpIHtcbiAgICByZXR1cm4gd3JhcE9ic2VydmFibGUodGhpcy5jaGlsZHJlbiwgKCkgPT4gKHRoaXMuaWZPcGVuU2VydmljZS5vcGVuID0gdHJ1ZSkpO1xuICB9XG4gIHByaXZhdGUgY2xvc2VBbmRHZXRUaGlzKCkge1xuICAgIHJldHVybiB3cmFwT2JzZXJ2YWJsZShvZih0aGlzKSwgKCkgPT4gKHRoaXMuaWZPcGVuU2VydmljZS5vcGVuID0gZmFsc2UpKTtcbiAgfVxuXG4gIHJlc2V0Q2hpbGRyZW4oKSB7XG4gICAgdGhpcy5jaGlsZHJlbiA9IG5ldyBSZXBsYXlTdWJqZWN0PEZvY3VzYWJsZUl0ZW1bXT4oMSk7XG4gICAgaWYgKHRoaXMucGFyZW50KSB7XG4gICAgICB0aGlzLnJpZ2h0ID0gdGhpcy5vcGVuQW5kR2V0Q2hpbGRyZW4oKS5waXBlKG1hcChhbGwgPT4gYWxsWzBdKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZG93biA9IHRoaXMub3BlbkFuZEdldENoaWxkcmVuKCkucGlwZShtYXAoYWxsID0+IGFsbFswXSkpO1xuICAgICAgdGhpcy51cCA9IHRoaXMub3BlbkFuZEdldENoaWxkcmVuKCkucGlwZShtYXAoYWxsID0+IGFsbFthbGwubGVuZ3RoIC0gMV0pKTtcbiAgICB9XG4gIH1cblxuICBhZGRDaGlsZHJlbihjaGlsZHJlbjogRm9jdXNhYmxlSXRlbVtdKSB7XG4gICAgbGlua1ZlcnRpY2FsKGNoaWxkcmVuKTtcbiAgICBpZiAodGhpcy5wYXJlbnQpIHtcbiAgICAgIGxpbmtQYXJlbnQoY2hpbGRyZW4sIHRoaXMuY2xvc2VBbmRHZXRUaGlzKCksIEFycm93S2V5RGlyZWN0aW9uLkxFRlQpO1xuICAgIH1cbiAgICB0aGlzLmNoaWxkcmVuLm5leHQoY2hpbGRyZW4pO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBEUk9QRE9XTl9GT0NVU19IQU5ETEVSX1BST1ZJREVSID0gY3VzdG9tRm9jdXNhYmxlSXRlbVByb3ZpZGVyKERyb3Bkb3duRm9jdXNIYW5kbGVyKTtcbiJdfQ==