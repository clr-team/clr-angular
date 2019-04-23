/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { IfExpandService } from '../../utils/conditional/if-expanded.service';
import { VerticalNavGroupRegistrationService } from './providers/vertical-nav-group-registration.service';
import { VerticalNavGroupService } from './providers/vertical-nav-group.service';
import { VerticalNavService } from './providers/vertical-nav.service';
import { ClrCommonStrings } from '../../utils/i18n/common-strings.interface';
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
                    providers: [IfExpandService, VerticalNavGroupService],
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
        { type: IfExpandService },
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
export { ClrVerticalNavGroup };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ClrVerticalNavGroup.prototype.wasExpanded;
    /** @type {?} */
    ClrVerticalNavGroup.prototype.expandedChange;
    /**
     * @type {?}
     * @private
     */
    ClrVerticalNavGroup.prototype._subscriptions;
    /**
     * @type {?}
     * @private
     */
    ClrVerticalNavGroup.prototype._expandAnimationState;
    /**
     * @type {?}
     * @private
     */
    ClrVerticalNavGroup.prototype._itemExpand;
    /**
     * @type {?}
     * @private
     */
    ClrVerticalNavGroup.prototype._navGroupRegistrationService;
    /**
     * @type {?}
     * @private
     */
    ClrVerticalNavGroup.prototype._navGroupService;
    /**
     * @type {?}
     * @private
     */
    ClrVerticalNavGroup.prototype._navService;
    /** @type {?} */
    ClrVerticalNavGroup.prototype.commonStrings;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVydGljYWwtbmF2LWdyb3VwLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsibGF5b3V0L3ZlcnRpY2FsLW5hdi92ZXJ0aWNhbC1uYXYtZ3JvdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBTUEsT0FBTyxFQUFFLE9BQU8sRUFBa0IsS0FBSyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDakcsT0FBTyxFQUFvQixTQUFTLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQWEsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBR2pILE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUU5RSxPQUFPLEVBQUUsbUNBQW1DLEVBQUUsTUFBTSxxREFBcUQsQ0FBQztBQUMxRyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNqRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN0RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQzs7SUFFdkUsY0FBYyxHQUFXLFVBQVU7O0lBQ25DLGVBQWUsR0FBVyxXQUFXO0FBRTNDO0lBY0UsNkJBQ1UsV0FBNEIsRUFDNUIsNEJBQWlFLEVBQ2pFLGdCQUF5QyxFQUN6QyxXQUErQixFQUNoQyxhQUErQjtRQUx4QyxpQkFrREM7UUFqRFMsZ0JBQVcsR0FBWCxXQUFXLENBQWlCO1FBQzVCLGlDQUE0QixHQUE1Qiw0QkFBNEIsQ0FBcUM7UUFDakUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUF5QjtRQUN6QyxnQkFBVyxHQUFYLFdBQVcsQ0FBb0I7UUFDaEMsa0JBQWEsR0FBYixhQUFhLENBQWtCO1FBK0NoQyxnQkFBVyxHQUFZLEtBQUssQ0FBQztRQXlCUSxtQkFBYyxHQUEwQixJQUFJLFlBQVksQ0FBVSxJQUFJLENB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aEZ0RCwwQ0FBb0M7Ozs7O0lBQ3BDLDJEQUF5RTs7Ozs7SUFDekUsK0NBQWlEOzs7OztJQUNqRCwwQ0FBdUM7O0lBQ3ZDLDRDQUFzQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgYW5pbWF0ZSwgQW5pbWF0aW9uRXZlbnQsIHN0YXRlLCBzdHlsZSwgdHJhbnNpdGlvbiwgdHJpZ2dlciB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgQWZ0ZXJDb250ZW50SW5pdCwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIEhvc3RCaW5kaW5nLCBJbnB1dCwgT25EZXN0cm95LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBJZkV4cGFuZFNlcnZpY2UgfSBmcm9tICcuLi8uLi91dGlscy9jb25kaXRpb25hbC9pZi1leHBhbmRlZC5zZXJ2aWNlJztcblxuaW1wb3J0IHsgVmVydGljYWxOYXZHcm91cFJlZ2lzdHJhdGlvblNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy92ZXJ0aWNhbC1uYXYtZ3JvdXAtcmVnaXN0cmF0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgVmVydGljYWxOYXZHcm91cFNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy92ZXJ0aWNhbC1uYXYtZ3JvdXAuc2VydmljZSc7XG5pbXBvcnQgeyBWZXJ0aWNhbE5hdlNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy92ZXJ0aWNhbC1uYXYuc2VydmljZSc7XG5pbXBvcnQgeyBDbHJDb21tb25TdHJpbmdzIH0gZnJvbSAnLi4vLi4vdXRpbHMvaTE4bi9jb21tb24tc3RyaW5ncy5pbnRlcmZhY2UnO1xuXG5jb25zdCBFWFBBTkRFRF9TVEFURTogc3RyaW5nID0gJ2V4cGFuZGVkJztcbmNvbnN0IENPTExBUFNFRF9TVEFURTogc3RyaW5nID0gJ2NvbGxhcHNlZCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci12ZXJ0aWNhbC1uYXYtZ3JvdXAnLFxuICB0ZW1wbGF0ZVVybDogJy4vdmVydGljYWwtbmF2LWdyb3VwLmh0bWwnLFxuICBwcm92aWRlcnM6IFtJZkV4cGFuZFNlcnZpY2UsIFZlcnRpY2FsTmF2R3JvdXBTZXJ2aWNlXSxcbiAgYW5pbWF0aW9uczogW1xuICAgIHRyaWdnZXIoJ2NsckV4cGFuZCcsIFtcbiAgICAgIHN0YXRlKEVYUEFOREVEX1NUQVRFLCBzdHlsZSh7IGhlaWdodDogJyonIH0pKSxcbiAgICAgIHN0YXRlKENPTExBUFNFRF9TVEFURSwgc3R5bGUoeyBoZWlnaHQ6IDAsICdvdmVyZmxvdy15JzogJ2hpZGRlbicsIHZpc2liaWxpdHk6ICdoaWRkZW4nIH0pKSxcbiAgICAgIHRyYW5zaXRpb24oYCR7RVhQQU5ERURfU1RBVEV9IDw9PiAke0NPTExBUFNFRF9TVEFURX1gLCBhbmltYXRlKCcwLjJzIGVhc2UtaW4tb3V0JykpLFxuICAgIF0pLFxuICBdLFxuICBob3N0OiB7IGNsYXNzOiAnbmF2LWdyb3VwJyB9LFxufSlcbmV4cG9ydCBjbGFzcyBDbHJWZXJ0aWNhbE5hdkdyb3VwIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfaXRlbUV4cGFuZDogSWZFeHBhbmRTZXJ2aWNlLFxuICAgIHByaXZhdGUgX25hdkdyb3VwUmVnaXN0cmF0aW9uU2VydmljZTogVmVydGljYWxOYXZHcm91cFJlZ2lzdHJhdGlvblNlcnZpY2UsXG4gICAgcHJpdmF0ZSBfbmF2R3JvdXBTZXJ2aWNlOiBWZXJ0aWNhbE5hdkdyb3VwU2VydmljZSxcbiAgICBwcml2YXRlIF9uYXZTZXJ2aWNlOiBWZXJ0aWNhbE5hdlNlcnZpY2UsXG4gICAgcHVibGljIGNvbW1vblN0cmluZ3M6IENsckNvbW1vblN0cmluZ3NcbiAgKSB7XG4gICAgdGhpcy5fbmF2R3JvdXBSZWdpc3RyYXRpb25TZXJ2aWNlLnJlZ2lzdGVyTmF2R3JvdXAoKTtcblxuICAgIC8vIEZJWE1FOiBUaGlzIHN1YnNjcmlwdGlvbiBoYW5kbGVzIGEgY29ybmVyIGNhc2VcbiAgICAvLyBWZXJ0aWNhbCBOYXYgY29sbGFwc2UgcmVxdWlyZXMgdGhlIGFuaW1hdGlvbiB0byBydW4gZmlyc3QgYW5kIHRoZW5cbiAgICAvLyByZW1vdmUgdGhlIG5vZGVzIGZyb20gdGhlIERPTS4gSWYgdGhlIHVzZXIgZGlyZWN0bHkgc2V0cyB0aGUgaW5wdXRcbiAgICAvLyBvbiB0aGUgY2xySWZFeHBhbmRlZCBkaXJlY3RpdmUsIHdlIGhhdmUgbm8gY2hhbmNlIHRvIHJ1biB0aGUgYW5pbWF0aW9uXG4gICAgLy8gYW5kIHdhaXQgZm9yIGl0IHRvIGNvbXBsZXRlLiBUaGlzIHN1YnNjcmlwdGlvbiBtYWtlcyBzdXJlIHRoYXQgdGhlXG4gICAgLy8gYW5pbWF0aW9uIHN0YXRlcyBhcmUgY29ycmVjdCBmb3IgdGhhdCBlZGdlIGNhc2UuXG4gICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5faXRlbUV4cGFuZC5leHBhbmRDaGFuZ2Uuc3Vic2NyaWJlKHZhbHVlID0+IHtcbiAgICAgICAgaWYgKHZhbHVlICYmIHRoaXMuZXhwYW5kQW5pbWF0aW9uU3RhdGUgPT09IENPTExBUFNFRF9TVEFURSkge1xuICAgICAgICAgIGlmICh0aGlzLl9uYXZTZXJ2aWNlLmNvbGxhcHNlZCkge1xuICAgICAgICAgICAgdGhpcy5fbmF2U2VydmljZS5jb2xsYXBzZWQgPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5leHBhbmRBbmltYXRpb25TdGF0ZSA9IEVYUEFOREVEX1NUQVRFO1xuICAgICAgICB9IGVsc2UgaWYgKCF2YWx1ZSAmJiB0aGlzLmV4cGFuZEFuaW1hdGlvblN0YXRlID09PSBFWFBBTkRFRF9TVEFURSkge1xuICAgICAgICAgIHRoaXMuZXhwYW5kQW5pbWF0aW9uU3RhdGUgPSBDT0xMQVBTRURfU1RBVEU7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcblxuICAgIC8vIDEuIElmIHRoZSBuYXYgaXMgY29sbGFwc2luZywgY2xvc2UgdGhlIG9wZW4gbmF2IGdyb3VwICsgc2F2ZSBpdHMgc3RhdGVcbiAgICAvLyAyLiBJZiB0aGUgbmF2IGlzIGV4cGFuZGluZywgZXhwYW5kIHRoZSBuYXYgZ3JvdXAgaWYgdGhlIHByZXZpb3VzIHN0YXRlIHdhcyBleHBhbmRlZFxuICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMuX25hdlNlcnZpY2UuYW5pbWF0ZU9uQ29sbGFwc2VkLnN1YnNjcmliZSgoZ29pbmdUb0NvbGxhcHNlOiBib29sZWFuKSA9PiB7XG4gICAgICAgIGlmIChnb2luZ1RvQ29sbGFwc2UgJiYgdGhpcy5leHBhbmRlZCkge1xuICAgICAgICAgIHRoaXMud2FzRXhwYW5kZWQgPSB0cnVlO1xuICAgICAgICAgIHRoaXMuZXhwYW5kQW5pbWF0aW9uU3RhdGUgPSBDT0xMQVBTRURfU1RBVEU7XG4gICAgICAgIH0gZWxzZSBpZiAoIWdvaW5nVG9Db2xsYXBzZSAmJiB0aGlzLndhc0V4cGFuZGVkKSB7XG4gICAgICAgICAgdGhpcy5leHBhbmRHcm91cCgpO1xuICAgICAgICAgIHRoaXMud2FzRXhwYW5kZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuXG4gICAgLy8gSWYgYSBsaW5rIGlzIGNsaWNrZWQsIGV4cGFuZCB0aGUgbmF2IGdyb3VwXG4gICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5fbmF2R3JvdXBTZXJ2aWNlLmV4cGFuZENoYW5nZS5zdWJzY3JpYmUoKGV4cGFuZDogYm9vbGVhbikgPT4ge1xuICAgICAgICBpZiAoZXhwYW5kICYmICF0aGlzLmV4cGFuZGVkKSB7XG4gICAgICAgICAgdGhpcy5leHBhbmRHcm91cCgpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIHdhc0V4cGFuZGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5pcy1leHBhbmRlZCcpXG4gIGdldCBleHBhbmRlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faXRlbUV4cGFuZC5leHBhbmRlZDtcbiAgfVxuXG4gIHNldCBleHBhbmRlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIGlmICh0aGlzLl9pdGVtRXhwYW5kLmV4cGFuZGVkICE9PSB2YWx1ZSkge1xuICAgICAgdGhpcy5faXRlbUV4cGFuZC5leHBhbmRlZCA9IHZhbHVlO1xuICAgICAgdGhpcy5leHBhbmRlZENoYW5nZS5lbWl0KHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoJ2NsclZlcnRpY2FsTmF2R3JvdXBFeHBhbmRlZCcpXG4gIHNldCB1c2VyRXhwYW5kZWRJbnB1dCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHZhbHVlID0gISF2YWx1ZTtcbiAgICBpZiAodGhpcy5leHBhbmRlZCAhPT0gdmFsdWUpIHtcbiAgICAgIC8vIFdlIGhhdmUgdG8gY2FsbCB0b2dnbGVFeHBhbmQgYmVjYXVzZSBzb21lIGNhc2VzIHJlcXVpcmUgYW5pbWF0aW9ucyB0byBvY2N1ciBmaXJzdFxuICAgICAgLy8gRGlyZWN0bHkgc2V0dGluZyB0aGUgRXhwYW5kIHNlcnZpY2UgdmFsdWUgc2tpcHMgdGhlIGFuaW1hdGlvbiBhbmQgY2FuIHJlc3VsdCBpblxuICAgICAgLy8gbm9kZXMgaW4gdGhlIERPTSBidXQgdGhlIG5hdiBncm91cCBzdGlsbCBiZWluZyBjb2xsYXBzZWRcbiAgICAgIHRoaXMudG9nZ2xlRXhwYW5kKCk7XG4gICAgfVxuICB9XG5cbiAgQE91dHB1dCgnY2xyVmVydGljYWxOYXZHcm91cEV4cGFuZGVkQ2hhbmdlJykgZXhwYW5kZWRDaGFuZ2U6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4odHJ1ZSk7XG5cbiAgcHJpdmF0ZSBfc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICBwcml2YXRlIF9leHBhbmRBbmltYXRpb25TdGF0ZTogc3RyaW5nID0gQ09MTEFQU0VEX1NUQVRFO1xuXG4gIGV4cGFuZEdyb3VwKCk6IHZvaWQge1xuICAgIHRoaXMuZXhwYW5kZWQgPSB0cnVlO1xuICAgIC8vIEV4cGFuZGVkIGFuaW1hdGlvbiBvY2N1cnMgYWZ0ZXIgRXhwYW5kLmV4cGFuZCBpcyBzZXQgdG8gdHJ1ZVxuICAgIHRoaXMuZXhwYW5kQW5pbWF0aW9uU3RhdGUgPSBFWFBBTkRFRF9TVEFURTtcbiAgfVxuXG4gIGNvbGxhcHNlR3JvdXAoKTogdm9pZCB7XG4gICAgLy8gSWYgYSBWZXJ0aWNhbCBOYXYgR3JvdXAgdG9nZ2xlIGJ1dHRvbiBpcyBjbGlja2VkIHdoaWxlIHRoZSBWZXJ0aWNhbCBOYXYgaXMgaW4gQ29sbGFwc2VkIHN0YXRlLFxuICAgIC8vIHRoZSBWZXJ0aWNhbCBOYXYgc2hvdWxkIGJlIGV4cGFuZGVkIGZpcnN0LlxuICAgIHRoaXMuZXhwYW5kQW5pbWF0aW9uU3RhdGUgPSBDT0xMQVBTRURfU1RBVEU7XG4gIH1cblxuICAvLyBjbG9zZXMgYSBncm91cCBhZnRlciB0aGUgY29sbGFwc2UgYW5pbWF0aW9uXG4gIGV4cGFuZEFuaW1hdGlvbkRvbmUoJGV2ZW50OiBBbmltYXRpb25FdmVudCkge1xuICAgIGlmICgkZXZlbnQudG9TdGF0ZSA9PT0gQ09MTEFQU0VEX1NUQVRFKSB7XG4gICAgICB0aGlzLmV4cGFuZGVkID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGV4cGFuZEFuaW1hdGlvblN0YXRlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2V4cGFuZEFuaW1hdGlvblN0YXRlO1xuICB9XG5cbiAgc2V0IGV4cGFuZEFuaW1hdGlvblN0YXRlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICBpZiAodmFsdWUgIT09IHRoaXMuX2V4cGFuZEFuaW1hdGlvblN0YXRlKSB7XG4gICAgICB0aGlzLl9leHBhbmRBbmltYXRpb25TdGF0ZSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIHRvZ2dsZUV4cGFuZCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5leHBhbmRlZCkge1xuICAgICAgdGhpcy5jb2xsYXBzZUdyb3VwKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIElmIG5hdiBpcyBjb2xsYXNwZWQsIGZpcnN0IG9wZW4gdGhlIG5hdlxuICAgICAgaWYgKHRoaXMuX25hdlNlcnZpY2UuY29sbGFwc2VkKSB7XG4gICAgICAgIHRoaXMuX25hdlNlcnZpY2UuY29sbGFwc2VkID0gZmFsc2U7XG4gICAgICB9XG4gICAgICAvLyB0aGVuIGV4cGFuZCB0aGUgbmF2IGdyb3VwXG4gICAgICB0aGlzLmV4cGFuZEdyb3VwKCk7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIC8vIFRoaXMgbWFrZXMgc3VyZSB0aGF0IGlmIHNvbWVvbmUgbWFya3MgYSBuYXYgZ3JvdXAgZXhwYW5kZWQgaW4gYSBjb2xsYXBzZWQgbmF2XG4gICAgLy8gdGhlIGV4cGFuZGVkIHByb3BlcnR5IGlzIHN3aXRjaGVkIGJhY2sgdG8gY29sbGFwc2VkIHN0YXRlLlxuICAgIGlmICh0aGlzLl9uYXZTZXJ2aWNlLmNvbGxhcHNlZCAmJiB0aGlzLmV4cGFuZGVkKSB7XG4gICAgICB0aGlzLndhc0V4cGFuZGVkID0gdHJ1ZTtcbiAgICAgIHRoaXMuZXhwYW5kQW5pbWF0aW9uU3RhdGUgPSBDT0xMQVBTRURfU1RBVEU7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5mb3JFYWNoKChzdWI6IFN1YnNjcmlwdGlvbikgPT4gc3ViLnVuc3Vic2NyaWJlKCkpO1xuICAgIHRoaXMuX25hdkdyb3VwUmVnaXN0cmF0aW9uU2VydmljZS51bnJlZ2lzdGVyTmF2R3JvdXAoKTtcbiAgfVxufVxuIl19