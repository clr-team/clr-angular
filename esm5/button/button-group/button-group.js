/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ContentChildren, ElementRef, HostListener, Input, QueryList } from '@angular/core';
import { Point } from '../../popover/common/popover';
import { CLR_MENU_POSITIONS } from '../../popover/dropdown/menu-positions';
import { ButtonInGroupService } from '../providers/button-in-group.service';
import { ClrCommonStrings } from '../../utils/i18n/common-strings.interface';
import { ClrButton } from './button';
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
export { ClrButtonGroup };
if (false) {
    /** @type {?} */
    ClrButtonGroup.prototype.buttons;
    /** @type {?} */
    ClrButtonGroup.prototype.inlineButtons;
    /** @type {?} */
    ClrButtonGroup.prototype.menuButtons;
    /**
     * Overflow Menu
     *
     * @type {?}
     * @private
     */
    ClrButtonGroup.prototype._menuPosition;
    /**
     * @type {?}
     * @private
     */
    ClrButtonGroup.prototype._openMenu;
    /** @type {?} */
    ClrButtonGroup.prototype.anchorPoint;
    /** @type {?} */
    ClrButtonGroup.prototype.popoverPoint;
    /**
     * Flag with indicates if the overflow menu toggle was clicked.
     * If true, this can save us traversing the DOM to find
     * whether the click was withing the button group toggle
     * or menu in the onMouseClick method
     * @type {?}
     * @private
     */
    ClrButtonGroup.prototype._overflowMenuToggleClicked;
    /** @type {?} */
    ClrButtonGroup.prototype.buttonGroupNewService;
    /**
     * @type {?}
     * @private
     */
    ClrButtonGroup.prototype.elementRef;
    /** @type {?} */
    ClrButtonGroup.prototype.commonStrings;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLWdyb3VwLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiYnV0dG9uL2J1dHRvbi1ncm91cC9idXR0b24tZ3JvdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBTUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXZHLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUMzRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUM1RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUU3RSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBRXJDO0lBU0Usd0JBQ1MscUJBQTJDLEVBQzFDLFVBQXNCLEVBQ3ZCLGFBQStCO1FBRi9CLDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBc0I7UUFDMUMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN2QixrQkFBYSxHQUFiLGFBQWEsQ0FBa0I7UUFHeEMsa0JBQWEsR0FBZ0IsRUFBRSxDQUFDO1FBQ2hDLGdCQUFXLEdBQWdCLEVBQUUsQ0FBQztRQWdJdEIsY0FBUyxHQUFZLEtBQUssQ0FBQztRQVU1QixnQkFBVyxHQUFVLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxvQ0FBb0M7O1FBQzVFLGlCQUFZLEdBQVUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLG9DQUFvQzs7Ozs7OztRQW1CekUsK0JBQTBCLEdBQVksS0FBSyxDQUFDO0lBaktqRCxDQUFDO0lBS0o7Ozs7T0FJRzs7Ozs7OztJQUNILDJDQUFrQjs7Ozs7O0lBQWxCO1FBQUEsaUJBTUM7UUFMQyxJQUFJLENBQUMsaUJBQWlC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SSxFQUFFO3dCQUNwQixPQUFPO3FCQUNSO29CQUNELE9BQU8sR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO2lCQUM5QjthQUNGO1lBQ0QsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7U0FDdkI7UUFDRCxJQUFJLENBQUMsMEJBQTBCLEdBQUcsS0FBSyxDQUFDLENBQUMsOENBQThDO0lBQ3pGLENBQUM7O2dCQWhORixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtvQkFDNUIsaXVDQUFnQztvQkFDaEMsU0FBUyxFQUFFLENBQUMsb0JBQW9CLENBQUM7b0JBQ2pDLElBQUksRUFBRSxFQUFFLG1CQUFtQixFQUFFLE1BQU0sRUFBRTtpQkFDdEM7Ozs7Z0JBVlEsb0JBQW9CO2dCQUpRLFVBQVU7Z0JBS3RDLGdCQUFnQjs7OzBCQVd0QixlQUFlLFNBQUMsU0FBUzsrQkF5RnpCLEtBQUssU0FBQyxpQkFBaUI7K0JBcUZ2QixZQUFZLFNBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxlQUFlLENBQUM7O0lBNEJuRCxxQkFBQztDQUFBLEFBak5ELElBaU5DO1NBM01ZLGNBQWM7OztJQUN6QixpQ0FBMEQ7O0lBUTFELHVDQUFnQzs7SUFDaEMscUNBQThCOzs7Ozs7O0lBMEU5Qix1Q0FBOEI7Ozs7O0lBc0Q5QixtQ0FBbUM7O0lBVW5DLHFDQUE4Qzs7SUFDOUMsc0NBQTRDOzs7Ozs7Ozs7SUFtQjVDLG9EQUFvRDs7SUFwS2xELCtDQUFrRDs7Ozs7SUFDbEQsb0NBQThCOztJQUM5Qix1Q0FBc0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IENvbXBvbmVudCwgQ29udGVudENoaWxkcmVuLCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIsIElucHV0LCBRdWVyeUxpc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tICcuLi8uLi9wb3BvdmVyL2NvbW1vbi9wb3BvdmVyJztcbmltcG9ydCB7IENMUl9NRU5VX1BPU0lUSU9OUyB9IGZyb20gJy4uLy4uL3BvcG92ZXIvZHJvcGRvd24vbWVudS1wb3NpdGlvbnMnO1xuaW1wb3J0IHsgQnV0dG9uSW5Hcm91cFNlcnZpY2UgfSBmcm9tICcuLi9wcm92aWRlcnMvYnV0dG9uLWluLWdyb3VwLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2xyQ29tbW9uU3RyaW5ncyB9IGZyb20gJy4uLy4uL3V0aWxzL2kxOG4vY29tbW9uLXN0cmluZ3MuaW50ZXJmYWNlJztcblxuaW1wb3J0IHsgQ2xyQnV0dG9uIH0gZnJvbSAnLi9idXR0b24nO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItYnV0dG9uLWdyb3VwJyxcbiAgdGVtcGxhdGVVcmw6ICdidXR0b24tZ3JvdXAuaHRtbCcsXG4gIHByb3ZpZGVyczogW0J1dHRvbkluR3JvdXBTZXJ2aWNlXSxcbiAgaG9zdDogeyAnW2NsYXNzLmJ0bi1ncm91cF0nOiAndHJ1ZScgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyQnV0dG9uR3JvdXAge1xuICBAQ29udGVudENoaWxkcmVuKENsckJ1dHRvbikgYnV0dG9uczogUXVlcnlMaXN0PENsckJ1dHRvbj47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGJ1dHRvbkdyb3VwTmV3U2VydmljZTogQnV0dG9uSW5Hcm91cFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHB1YmxpYyBjb21tb25TdHJpbmdzOiBDbHJDb21tb25TdHJpbmdzXG4gICkge31cblxuICBpbmxpbmVCdXR0b25zOiBDbHJCdXR0b25bXSA9IFtdO1xuICBtZW51QnV0dG9uczogQ2xyQnV0dG9uW10gPSBbXTtcblxuICAvKipcbiAgICogMS4gSW5pdGlhbGl6ZXMgdGhlIGluaXRpYWwgQnV0dG9uIEdyb3VwIFZpZXdcbiAgICogMi4gU3Vic2NyaWJlcyB0byBjaGFuZ2VzIG9uIHRoZSBDb250ZW50Q2hpbGRyZW5cbiAgICogICAgaW4gY2FzZSB0aGUgdXNlciBjb250ZW50IHByb2plY3Rpb24gY2hhbmdlc1xuICAgKi9cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIHRoaXMuaW5pdGlhbGl6ZUJ1dHRvbnMoKTtcbiAgICB0aGlzLmJ1dHRvbkdyb3VwTmV3U2VydmljZS5jaGFuZ2VzLnN1YnNjcmliZShidXR0b24gPT4gdGhpcy5yZWFycmFuZ2VCdXR0b24oYnV0dG9uKSk7XG4gICAgdGhpcy5idXR0b25zLmNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZUJ1dHRvbnMoKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNb3ZlcyB0aGUgYnV0dG9uIGludG8gdGhlIG90aGVyIFZpZXdDb250YWluZXJcbiAgICogd2hlbiBhbiB1cGRhdGUgaXMgcmVjZWl2ZWQuXG4gICAqXG4gICAqIEBwYXJhbSBidXR0b25cbiAgICovXG4gIHJlYXJyYW5nZUJ1dHRvbihidXR0b246IENsckJ1dHRvbik6IHZvaWQge1xuICAgIGxldCBmcm9tVmlldzogQ2xyQnV0dG9uW107XG4gICAgbGV0IHRvVmlldzogQ2xyQnV0dG9uW107XG4gICAgaWYgKGJ1dHRvbi5pbk1lbnUpIHtcbiAgICAgIGZyb21WaWV3ID0gdGhpcy5pbmxpbmVCdXR0b25zO1xuICAgICAgdG9WaWV3ID0gdGhpcy5tZW51QnV0dG9ucztcbiAgICB9IGVsc2Uge1xuICAgICAgZnJvbVZpZXcgPSB0aGlzLm1lbnVCdXR0b25zO1xuICAgICAgdG9WaWV3ID0gdGhpcy5pbmxpbmVCdXR0b25zO1xuICAgIH1cbiAgICBjb25zdCBpbmRleDogbnVtYmVyID0gZnJvbVZpZXcuaW5kZXhPZihidXR0b24pO1xuICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICBmcm9tVmlldy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgY29uc3QgbW92ZUluZGV4ID0gdGhpcy5nZXRNb3ZlSW5kZXgoYnV0dG9uKTtcbiAgICAgIGlmIChtb3ZlSW5kZXggPD0gdG9WaWV3Lmxlbmd0aCkge1xuICAgICAgICB0b1ZpZXcuc3BsaWNlKG1vdmVJbmRleCwgMCwgYnV0dG9uKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQXV0aG9yOiBFdWRlc1xuICAgKlxuICAgKiBGaW5kcyB0aGUgb3JkZXIgb2YgYSBidXR0b24gdy5yLnQgb3RoZXIgYnV0dG9uc1xuICAgKlxuICAgKiBAcGFyYW0gYnV0dG9uVG9Nb3ZlXG4gICAqIEByZXR1cm5zXG4gICAqL1xuICBnZXRNb3ZlSW5kZXgoYnV0dG9uVG9Nb3ZlOiBDbHJCdXR0b24pOiBudW1iZXIge1xuICAgIGNvbnN0IHRlbXBBcnI6IENsckJ1dHRvbltdID0gdGhpcy5idXR0b25zLmZpbHRlcihidXR0b24gPT4gYnV0dG9uLmluTWVudSA9PT0gYnV0dG9uVG9Nb3ZlLmluTWVudSk7XG4gICAgcmV0dXJuIHRlbXBBcnIuaW5kZXhPZihidXR0b25Ub01vdmUpO1xuICB9XG5cbiAgaW5pdGlhbGl6ZUJ1dHRvbnMoKTogdm9pZCB7XG4gICAgY29uc3QgdGVtcElubGluZUJ1dHRvbnM6IENsckJ1dHRvbltdID0gW107XG4gICAgY29uc3QgdGVtcEluTWVudUJ1dHRvbnM6IENsckJ1dHRvbltdID0gW107XG4gICAgdGhpcy5idXR0b25zLmZvckVhY2goYnV0dG9uID0+IHtcbiAgICAgIGlmIChidXR0b24uaW5NZW51KSB7XG4gICAgICAgIHRlbXBJbk1lbnVCdXR0b25zLnB1c2goYnV0dG9uKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRlbXBJbmxpbmVCdXR0b25zLnB1c2goYnV0dG9uKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLmlubGluZUJ1dHRvbnMgPSB0ZW1wSW5saW5lQnV0dG9ucztcbiAgICB0aGlzLm1lbnVCdXR0b25zID0gdGVtcEluTWVudUJ1dHRvbnM7XG4gIH1cblxuICAvKipcbiAgICogT3ZlcmZsb3cgTWVudVxuICAgKlxuICAgKi9cblxuICAvLyBJbmRpY2F0ZXMgdGhlIHBvc2l0aW9uIG9mIHRoZSBvdmVyZmxvdyBtZW51XG4gIHByaXZhdGUgX21lbnVQb3NpdGlvbjogc3RyaW5nO1xuXG4gIGdldCBtZW51UG9zaXRpb24oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fbWVudVBvc2l0aW9uO1xuICB9XG5cbiAgQElucHV0KCdjbHJNZW51UG9zaXRpb24nKVxuICBzZXQgbWVudVBvc2l0aW9uKHBvczogc3RyaW5nKSB7XG4gICAgaWYgKHBvcyAmJiBDTFJfTUVOVV9QT1NJVElPTlMuaW5kZXhPZihwb3MpID4gLTEpIHtcbiAgICAgIHRoaXMuX21lbnVQb3NpdGlvbiA9IHBvcztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fbWVudVBvc2l0aW9uID0gJ2JvdHRvbS1sZWZ0JztcbiAgICB9XG4gICAgLy8gc2V0IHRoZSBwb3BvdmVyIHZhbHVlcyBiYXNlZCBvbiBtZW51IHBvc2l0aW9uXG4gICAgc3dpdGNoICh0aGlzLl9tZW51UG9zaXRpb24pIHtcbiAgICAgIGNhc2UgJ3RvcC1yaWdodCc6XG4gICAgICAgIHRoaXMuYW5jaG9yUG9pbnQgPSBQb2ludC5UT1BfUklHSFQ7XG4gICAgICAgIHRoaXMucG9wb3ZlclBvaW50ID0gUG9pbnQuUklHSFRfQk9UVE9NO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3RvcC1sZWZ0JzpcbiAgICAgICAgdGhpcy5hbmNob3JQb2ludCA9IFBvaW50LlRPUF9MRUZUO1xuICAgICAgICB0aGlzLnBvcG92ZXJQb2ludCA9IFBvaW50LkxFRlRfQk9UVE9NO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2JvdHRvbS1yaWdodCc6XG4gICAgICAgIHRoaXMuYW5jaG9yUG9pbnQgPSBQb2ludC5CT1RUT01fUklHSFQ7XG4gICAgICAgIHRoaXMucG9wb3ZlclBvaW50ID0gUG9pbnQuUklHSFRfVE9QO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2JvdHRvbS1sZWZ0JzpcbiAgICAgICAgdGhpcy5hbmNob3JQb2ludCA9IFBvaW50LkJPVFRPTV9MRUZUO1xuICAgICAgICB0aGlzLnBvcG92ZXJQb2ludCA9IFBvaW50LkxFRlRfVE9QO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3JpZ2h0LXRvcCc6XG4gICAgICAgIHRoaXMuYW5jaG9yUG9pbnQgPSBQb2ludC5SSUdIVF9UT1A7XG4gICAgICAgIHRoaXMucG9wb3ZlclBvaW50ID0gUG9pbnQuTEVGVF9UT1A7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncmlnaHQtYm90dG9tJzpcbiAgICAgICAgdGhpcy5hbmNob3JQb2ludCA9IFBvaW50LlJJR0hUX0JPVFRPTTtcbiAgICAgICAgdGhpcy5wb3BvdmVyUG9pbnQgPSBQb2ludC5MRUZUX0JPVFRPTTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdsZWZ0LXRvcCc6XG4gICAgICAgIHRoaXMuYW5jaG9yUG9pbnQgPSBQb2ludC5MRUZUX1RPUDtcbiAgICAgICAgdGhpcy5wb3BvdmVyUG9pbnQgPSBQb2ludC5SSUdIVF9UT1A7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnbGVmdC1ib3R0b20nOlxuICAgICAgICB0aGlzLmFuY2hvclBvaW50ID0gUG9pbnQuTEVGVF9CT1RUT007XG4gICAgICAgIHRoaXMucG9wb3ZlclBvaW50ID0gUG9pbnQuUklHSFRfQk9UVE9NO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRoaXMuYW5jaG9yUG9pbnQgPSBQb2ludC5CT1RUT01fTEVGVDtcbiAgICAgICAgdGhpcy5wb3BvdmVyUG9pbnQgPSBQb2ludC5MRUZUX1RPUDtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfb3Blbk1lbnU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBnZXQgb3Blbk1lbnUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX29wZW5NZW51O1xuICB9XG5cbiAgc2V0IG9wZW5NZW51KHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fb3Blbk1lbnUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBhbmNob3JQb2ludDogUG9pbnQgPSBQb2ludC5CT1RUT01fTEVGVDsgLy8gZGVmYXVsdCBpZiBtZW51UG9zaXRpb24gaXNuJ3Qgc2V0XG4gIHB1YmxpYyBwb3BvdmVyUG9pbnQ6IFBvaW50ID0gUG9pbnQuTEVGVF9UT1A7IC8vIGRlZmF1bHQgaWYgbWVudVBvc2l0aW9uIGlzbid0IHNldFxuXG4gIC8qKlxuICAgKiBUb2dnbGUgdGhlIENsckRyb3Bkb3duIE1lbnUgd2hlbiB0aGUgQ2xyRHJvcGRvd24gVG9nZ2xlIGlzXG4gICAqIGNsaWNrZWQuIEFsc28gc2V0IGEgZmxhZyB0aGF0IGluZGljYXRlcyB0aGF0IHRoZSB0b2dnbGVcbiAgICogd2FzIGNsaWNrZWQgc28gdGhhdCB3ZSBkb24ndCB0cmF2ZXJzZSB0aGUgRE9NIHRvIGZpbmQgdGhlXG4gICAqIGxvY2F0aW9uIG9mIHRoZSBjbGljay5cbiAgICovXG4gIHRvZ2dsZU1lbnUoKTogdm9pZCB7XG4gICAgdGhpcy5vcGVuTWVudSA9ICF0aGlzLm9wZW5NZW51O1xuICAgIHRoaXMuX292ZXJmbG93TWVudVRvZ2dsZUNsaWNrZWQgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEZsYWcgd2l0aCBpbmRpY2F0ZXMgaWYgdGhlIG92ZXJmbG93IG1lbnUgdG9nZ2xlIHdhcyBjbGlja2VkLlxuICAgKiBJZiB0cnVlLCB0aGlzIGNhbiBzYXZlIHVzIHRyYXZlcnNpbmcgdGhlIERPTSB0byBmaW5kXG4gICAqIHdoZXRoZXIgdGhlIGNsaWNrIHdhcyB3aXRoaW5nIHRoZSBidXR0b24gZ3JvdXAgdG9nZ2xlXG4gICAqIG9yIG1lbnUgaW4gdGhlIG9uTW91c2VDbGljayBtZXRob2RcbiAgICovXG4gIHByaXZhdGUgX292ZXJmbG93TWVudVRvZ2dsZUNsaWNrZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvLyBUT0RPOiBHZW5lcmljIERpcmVjdGl2ZSB0byBoYW5kbGUgdGhpc1xuICAvKipcbiAgICogQ2FsbGVkIG9uIG1vdXNlIGNsaWNrcyBhbnl3aGVyZSBpbiB0aGUgRE9NLlxuICAgKiBDaGVja3MgdG8gc2VlIGlmIHRoZSBtb3VzZWNsaWNrIGhhcHBlbmVkIG9uIHRoZSBob3N0IG9yIG91dHNpZGVcbiAgICovXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmNsaWNrJywgWyckZXZlbnQudGFyZ2V0J10pXG4gIG9uTW91c2VDbGljayh0YXJnZXQ6IGFueSk6IHZvaWQge1xuICAgIGlmICh0aGlzLm9wZW5NZW51ICYmICF0aGlzLl9vdmVyZmxvd01lbnVUb2dnbGVDbGlja2VkKSB7XG4gICAgICAvLyBSZXNldCB0aGUgb3ZlcmZsb3cgbWVudSB0b2dnbGUgY2xpY2tlZCBmbGFnXG4gICAgICB0aGlzLl9vdmVyZmxvd01lbnVUb2dnbGVDbGlja2VkID0gZmFsc2U7XG4gICAgICBsZXQgY3VycmVudDogYW55ID0gdGFyZ2V0OyAvLyBHZXQgdGhlIGVsZW1lbnQgaW4gdGhlIERPTSBvbiB3aGljaCB0aGUgbW91c2Ugd2FzIGNsaWNrZWRcbiAgICAgIGNvbnN0IGhvc3Q6IGFueSA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50OyAvLyBDdXJyZW50IEJ1dHRvbiBHcm91cFxuXG4gICAgICBpZiAoY3VycmVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2Ryb3Bkb3duLW1lbnUnKSkge1xuICAgICAgICBjdXJyZW50ID0gY3VycmVudC5wYXJlbnROb2RlO1xuICAgICAgICB3aGlsZSAoY3VycmVudCkge1xuICAgICAgICAgIGlmIChjdXJyZW50ID09PSBkb2N1bWVudCkge1xuICAgICAgICAgICAgdGhpcy5vcGVuTWVudSA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIElmIGNsaWNrZWQgb24gZHJvcGRvd24gbWVudSBhbmQgbWVudSBpcyBpbiBob3N0XG4gICAgICAgICAgLy8gZG8gbm90aGluZ1xuICAgICAgICAgIGlmIChjdXJyZW50ID09PSBob3N0KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50LnBhcmVudE5vZGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMub3Blbk1lbnUgPSBmYWxzZTtcbiAgICB9XG4gICAgdGhpcy5fb3ZlcmZsb3dNZW51VG9nZ2xlQ2xpY2tlZCA9IGZhbHNlOyAvLyBSZXNldCB0aGUgb3ZlcmZsb3cgbWVudSB0b2dnbGUgY2xpY2tlZCBmbGFnXG4gIH1cbn1cbiJdfQ==