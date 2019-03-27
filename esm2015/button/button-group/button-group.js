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
export class ClrButtonGroup {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLWdyb3VwLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiYnV0dG9uL2J1dHRvbi1ncm91cC9idXR0b24tZ3JvdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBTUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXZHLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUMzRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUM1RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUU3RSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBUXJDLE1BQU0sT0FBTyxjQUFjOzs7Ozs7SUFHekIsWUFDUyxxQkFBMkMsRUFDMUMsVUFBc0IsRUFDdkIsYUFBK0I7UUFGL0IsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUFzQjtRQUMxQyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3ZCLGtCQUFhLEdBQWIsYUFBYSxDQUFrQjtRQUd4QyxrQkFBYSxHQUFnQixFQUFFLENBQUM7UUFDaEMsZ0JBQVcsR0FBZ0IsRUFBRSxDQUFDO1FBZ0l0QixjQUFTLEdBQVksS0FBSyxDQUFDO1FBVTVCLGdCQUFXLEdBQVUsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLG9DQUFvQzs7UUFDNUUsaUJBQVksR0FBVSxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsb0NBQW9DOzs7Ozs7O1FBbUJ6RSwrQkFBMEIsR0FBWSxLQUFLLENBQUM7SUFqS2pELENBQUM7Ozs7Ozs7SUFVSixrQkFBa0I7UUFDaEIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFD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WUFoTkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLGl1Q0FBZ0M7Z0JBQ2hDLFNBQVMsRUFBRSxDQUFDLG9CQUFvQixDQUFDO2dCQUNqQyxJQUFJLEVBQUUsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLEVBQUU7YUFDdEM7Ozs7WUFWUSxvQkFBb0I7WUFKUSxVQUFVO1lBS3RDLGdCQUFnQjs7O3NCQVd0QixlQUFlLFNBQUMsU0FBUzsyQkF5RnpCLEtBQUssU0FBQyxpQkFBaUI7MkJBcUZ2QixZQUFZLFNBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxlQUFlLENBQUM7Ozs7SUE5S2pELGlDQUEwRDs7SUFRMUQsdUNBQWdDOztJQUNoQyxxQ0FBOEI7Ozs7Ozs7SUEwRTlCLHVDQUE4Qjs7Ozs7SUFzRDlCLG1DQUFtQzs7SUFVbkMscUNBQThDOztJQUM5QyxzQ0FBNEM7Ozs7Ozs7OztJQW1CNUMsb0RBQW9EOztJQXBLbEQsK0NBQWtEOzs7OztJQUNsRCxvQ0FBOEI7O0lBQzlCLHVDQUFzQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBDb250ZW50Q2hpbGRyZW4sIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIFF1ZXJ5TGlzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBQb2ludCB9IGZyb20gJy4uLy4uL3BvcG92ZXIvY29tbW9uL3BvcG92ZXInO1xuaW1wb3J0IHsgQ0xSX01FTlVfUE9TSVRJT05TIH0gZnJvbSAnLi4vLi4vcG9wb3Zlci9kcm9wZG93bi9tZW51LXBvc2l0aW9ucyc7XG5pbXBvcnQgeyBCdXR0b25Jbkdyb3VwU2VydmljZSB9IGZyb20gJy4uL3Byb3ZpZGVycy9idXR0b24taW4tZ3JvdXAuc2VydmljZSc7XG5pbXBvcnQgeyBDbHJDb21tb25TdHJpbmdzIH0gZnJvbSAnLi4vLi4vdXRpbHMvaTE4bi9jb21tb24tc3RyaW5ncy5pbnRlcmZhY2UnO1xuXG5pbXBvcnQgeyBDbHJCdXR0b24gfSBmcm9tICcuL2J1dHRvbic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci1idXR0b24tZ3JvdXAnLFxuICB0ZW1wbGF0ZVVybDogJ2J1dHRvbi1ncm91cC5odG1sJyxcbiAgcHJvdmlkZXJzOiBbQnV0dG9uSW5Hcm91cFNlcnZpY2VdLFxuICBob3N0OiB7ICdbY2xhc3MuYnRuLWdyb3VwXSc6ICd0cnVlJyB9LFxufSlcbmV4cG9ydCBjbGFzcyBDbHJCdXR0b25Hcm91cCB7XG4gIEBDb250ZW50Q2hpbGRyZW4oQ2xyQnV0dG9uKSBidXR0b25zOiBRdWVyeUxpc3Q8Q2xyQnV0dG9uPjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgYnV0dG9uR3JvdXBOZXdTZXJ2aWNlOiBCdXR0b25Jbkdyb3VwU2VydmljZSxcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHVibGljIGNvbW1vblN0cmluZ3M6IENsckNvbW1vblN0cmluZ3NcbiAgKSB7fVxuXG4gIGlubGluZUJ1dHRvbnM6IENsckJ1dHRvbltdID0gW107XG4gIG1lbnVCdXR0b25zOiBDbHJCdXR0b25bXSA9IFtdO1xuXG4gIC8qKlxuICAgKiAxLiBJbml0aWFsaXplcyB0aGUgaW5pdGlhbCBCdXR0b24gR3JvdXAgVmlld1xuICAgKiAyLiBTdWJzY3JpYmVzIHRvIGNoYW5nZXMgb24gdGhlIENvbnRlbnRDaGlsZHJlblxuICAgKiAgICBpbiBjYXNlIHRoZSB1c2VyIGNvbnRlbnQgcHJvamVjdGlvbiBjaGFuZ2VzXG4gICAqL1xuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgdGhpcy5pbml0aWFsaXplQnV0dG9ucygpO1xuICAgIHRoaXMuYnV0dG9uR3JvdXBOZXdTZXJ2aWNlLmNoYW5nZXMuc3Vic2NyaWJlKGJ1dHRvbiA9PiB0aGlzLnJlYXJyYW5nZUJ1dHRvbihidXR0b24pKTtcbiAgICB0aGlzLmJ1dHRvbnMuY2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5pbml0aWFsaXplQnV0dG9ucygpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIE1vdmVzIHRoZSBidXR0b24gaW50byB0aGUgb3RoZXIgVmlld0NvbnRhaW5lclxuICAgKiB3aGVuIGFuIHVwZGF0ZSBpcyByZWNlaXZlZC5cbiAgICpcbiAgICogQHBhcmFtIGJ1dHRvblxuICAgKi9cbiAgcmVhcnJhbmdlQnV0dG9uKGJ1dHRvbjogQ2xyQnV0dG9uKTogdm9pZCB7XG4gICAgbGV0IGZyb21WaWV3OiBDbHJCdXR0b25bXTtcbiAgICBsZXQgdG9WaWV3OiBDbHJCdXR0b25bXTtcbiAgICBpZiAoYnV0dG9uLmluTWVudSkge1xuICAgICAgZnJvbVZpZXcgPSB0aGlzLmlubGluZUJ1dHRvbnM7XG4gICAgICB0b1ZpZXcgPSB0aGlzLm1lbnVCdXR0b25zO1xuICAgIH0gZWxzZSB7XG4gICAgICBmcm9tVmlldyA9IHRoaXMubWVudUJ1dHRvbnM7XG4gICAgICB0b1ZpZXcgPSB0aGlzLmlubGluZUJ1dHRvbnM7XG4gICAgfVxuICAgIGNvbnN0IGluZGV4OiBudW1iZXIgPSBmcm9tVmlldy5pbmRleE9mKGJ1dHRvbik7XG4gICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgIGZyb21WaWV3LnNwbGljZShpbmRleCwgMSk7XG4gICAgICBjb25zdCBtb3ZlSW5kZXggPSB0aGlzLmdldE1vdmVJbmRleChidXR0b24pO1xuICAgICAgaWYgKG1vdmVJbmRleCA8PSB0b1ZpZXcubGVuZ3RoKSB7XG4gICAgICAgIHRvVmlldy5zcGxpY2UobW92ZUluZGV4LCAwLCBidXR0b24pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBdXRob3I6IEV1ZGVzXG4gICAqXG4gICAqIEZpbmRzIHRoZSBvcmRlciBvZiBhIGJ1dHRvbiB3LnIudCBvdGhlciBidXR0b25zXG4gICAqXG4gICAqIEBwYXJhbSBidXR0b25Ub01vdmVcbiAgICogQHJldHVybnNcbiAgICovXG4gIGdldE1vdmVJbmRleChidXR0b25Ub01vdmU6IENsckJ1dHRvbik6IG51bWJlciB7XG4gICAgY29uc3QgdGVtcEFycjogQ2xyQnV0dG9uW10gPSB0aGlzLmJ1dHRvbnMuZmlsdGVyKGJ1dHRvbiA9PiBidXR0b24uaW5NZW51ID09PSBidXR0b25Ub01vdmUuaW5NZW51KTtcbiAgICByZXR1cm4gdGVtcEFyci5pbmRleE9mKGJ1dHRvblRvTW92ZSk7XG4gIH1cblxuICBpbml0aWFsaXplQnV0dG9ucygpOiB2b2lkIHtcbiAgICBjb25zdCB0ZW1wSW5saW5lQnV0dG9uczogQ2xyQnV0dG9uW10gPSBbXTtcbiAgICBjb25zdCB0ZW1wSW5NZW51QnV0dG9uczogQ2xyQnV0dG9uW10gPSBbXTtcbiAgICB0aGlzLmJ1dHRvbnMuZm9yRWFjaChidXR0b24gPT4ge1xuICAgICAgaWYgKGJ1dHRvbi5pbk1lbnUpIHtcbiAgICAgICAgdGVtcEluTWVudUJ1dHRvbnMucHVzaChidXR0b24pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGVtcElubGluZUJ1dHRvbnMucHVzaChidXR0b24pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuaW5saW5lQnV0dG9ucyA9IHRlbXBJbmxpbmVCdXR0b25zO1xuICAgIHRoaXMubWVudUJ1dHRvbnMgPSB0ZW1wSW5NZW51QnV0dG9ucztcbiAgfVxuXG4gIC8qKlxuICAgKiBPdmVyZmxvdyBNZW51XG4gICAqXG4gICAqL1xuXG4gIC8vIEluZGljYXRlcyB0aGUgcG9zaXRpb24gb2YgdGhlIG92ZXJmbG93IG1lbnVcbiAgcHJpdmF0ZSBfbWVudVBvc2l0aW9uOiBzdHJpbmc7XG5cbiAgZ2V0IG1lbnVQb3NpdGlvbigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9tZW51UG9zaXRpb247XG4gIH1cblxuICBASW5wdXQoJ2Nsck1lbnVQb3NpdGlvbicpXG4gIHNldCBtZW51UG9zaXRpb24ocG9zOiBzdHJpbmcpIHtcbiAgICBpZiAocG9zICYmIENMUl9NRU5VX1BPU0lUSU9OUy5pbmRleE9mKHBvcykgPiAtMSkge1xuICAgICAgdGhpcy5fbWVudVBvc2l0aW9uID0gcG9zO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9tZW51UG9zaXRpb24gPSAnYm90dG9tLWxlZnQnO1xuICAgIH1cbiAgICAvLyBzZXQgdGhlIHBvcG92ZXIgdmFsdWVzIGJhc2VkIG9uIG1lbnUgcG9zaXRpb25cbiAgICBzd2l0Y2ggKHRoaXMuX21lbnVQb3NpdGlvbikge1xuICAgICAgY2FzZSAndG9wLXJpZ2h0JzpcbiAgICAgICAgdGhpcy5hbmNob3JQb2ludCA9IFBvaW50LlRPUF9SSUdIVDtcbiAgICAgICAgdGhpcy5wb3BvdmVyUG9pbnQgPSBQb2ludC5SSUdIVF9CT1RUT007XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndG9wLWxlZnQnOlxuICAgICAgICB0aGlzLmFuY2hvclBvaW50ID0gUG9pbnQuVE9QX0xFRlQ7XG4gICAgICAgIHRoaXMucG9wb3ZlclBvaW50ID0gUG9pbnQuTEVGVF9CT1RUT007XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnYm90dG9tLXJpZ2h0JzpcbiAgICAgICAgdGhpcy5hbmNob3JQb2ludCA9IFBvaW50LkJPVFRPTV9SSUdIVDtcbiAgICAgICAgdGhpcy5wb3BvdmVyUG9pbnQgPSBQb2ludC5SSUdIVF9UT1A7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnYm90dG9tLWxlZnQnOlxuICAgICAgICB0aGlzLmFuY2hvclBvaW50ID0gUG9pbnQuQk9UVE9NX0xFRlQ7XG4gICAgICAgIHRoaXMucG9wb3ZlclBvaW50ID0gUG9pbnQuTEVGVF9UT1A7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncmlnaHQtdG9wJzpcbiAgICAgICAgdGhpcy5hbmNob3JQb2ludCA9IFBvaW50LlJJR0hUX1RPUDtcbiAgICAgICAgdGhpcy5wb3BvdmVyUG9pbnQgPSBQb2ludC5MRUZUX1RPUDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdyaWdodC1ib3R0b20nOlxuICAgICAgICB0aGlzLmFuY2hvclBvaW50ID0gUG9pbnQuUklHSFRfQk9UVE9NO1xuICAgICAgICB0aGlzLnBvcG92ZXJQb2ludCA9IFBvaW50LkxFRlRfQk9UVE9NO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2xlZnQtdG9wJzpcbiAgICAgICAgdGhpcy5hbmNob3JQb2ludCA9IFBvaW50LkxFRlRfVE9QO1xuICAgICAgICB0aGlzLnBvcG92ZXJQb2ludCA9IFBvaW50LlJJR0hUX1RPUDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdsZWZ0LWJvdHRvbSc6XG4gICAgICAgIHRoaXMuYW5jaG9yUG9pbnQgPSBQb2ludC5MRUZUX0JPVFRPTTtcbiAgICAgICAgdGhpcy5wb3BvdmVyUG9pbnQgPSBQb2ludC5SSUdIVF9CT1RUT007XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhpcy5hbmNob3JQb2ludCA9IFBvaW50LkJPVFRPTV9MRUZUO1xuICAgICAgICB0aGlzLnBvcG92ZXJQb2ludCA9IFBvaW50LkxFRlRfVE9QO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9vcGVuTWVudTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGdldCBvcGVuTWVudSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fb3Blbk1lbnU7XG4gIH1cblxuICBzZXQgb3Blbk1lbnUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9vcGVuTWVudSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGFuY2hvclBvaW50OiBQb2ludCA9IFBvaW50LkJPVFRPTV9MRUZUOyAvLyBkZWZhdWx0IGlmIG1lbnVQb3NpdGlvbiBpc24ndCBzZXRcbiAgcHVibGljIHBvcG92ZXJQb2ludDogUG9pbnQgPSBQb2ludC5MRUZUX1RPUDsgLy8gZGVmYXVsdCBpZiBtZW51UG9zaXRpb24gaXNuJ3Qgc2V0XG5cbiAgLyoqXG4gICAqIFRvZ2dsZSB0aGUgQ2xyRHJvcGRvd24gTWVudSB3aGVuIHRoZSBDbHJEcm9wZG93biBUb2dnbGUgaXNcbiAgICogY2xpY2tlZC4gQWxzbyBzZXQgYSBmbGFnIHRoYXQgaW5kaWNhdGVzIHRoYXQgdGhlIHRvZ2dsZVxuICAgKiB3YXMgY2xpY2tlZCBzbyB0aGF0IHdlIGRvbid0IHRyYXZlcnNlIHRoZSBET00gdG8gZmluZCB0aGVcbiAgICogbG9jYXRpb24gb2YgdGhlIGNsaWNrLlxuICAgKi9cbiAgdG9nZ2xlTWVudSgpOiB2b2lkIHtcbiAgICB0aGlzLm9wZW5NZW51ID0gIXRoaXMub3Blbk1lbnU7XG4gICAgdGhpcy5fb3ZlcmZsb3dNZW51VG9nZ2xlQ2xpY2tlZCA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogRmxhZyB3aXRoIGluZGljYXRlcyBpZiB0aGUgb3ZlcmZsb3cgbWVudSB0b2dnbGUgd2FzIGNsaWNrZWQuXG4gICAqIElmIHRydWUsIHRoaXMgY2FuIHNhdmUgdXMgdHJhdmVyc2luZyB0aGUgRE9NIHRvIGZpbmRcbiAgICogd2hldGhlciB0aGUgY2xpY2sgd2FzIHdpdGhpbmcgdGhlIGJ1dHRvbiBncm91cCB0b2dnbGVcbiAgICogb3IgbWVudSBpbiB0aGUgb25Nb3VzZUNsaWNrIG1ldGhvZFxuICAgKi9cbiAgcHJpdmF0ZSBfb3ZlcmZsb3dNZW51VG9nZ2xlQ2xpY2tlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8vIFRPRE86IEdlbmVyaWMgRGlyZWN0aXZlIHRvIGhhbmRsZSB0aGlzXG4gIC8qKlxuICAgKiBDYWxsZWQgb24gbW91c2UgY2xpY2tzIGFueXdoZXJlIGluIHRoZSBET00uXG4gICAqIENoZWNrcyB0byBzZWUgaWYgdGhlIG1vdXNlY2xpY2sgaGFwcGVuZWQgb24gdGhlIGhvc3Qgb3Igb3V0c2lkZVxuICAgKi9cbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6Y2xpY2snLCBbJyRldmVudC50YXJnZXQnXSlcbiAgb25Nb3VzZUNsaWNrKHRhcmdldDogYW55KTogdm9pZCB7XG4gICAgaWYgKHRoaXMub3Blbk1lbnUgJiYgIXRoaXMuX292ZXJmbG93TWVudVRvZ2dsZUNsaWNrZWQpIHtcbiAgICAgIC8vIFJlc2V0IHRoZSBvdmVyZmxvdyBtZW51IHRvZ2dsZSBjbGlja2VkIGZsYWdcbiAgICAgIHRoaXMuX292ZXJmbG93TWVudVRvZ2dsZUNsaWNrZWQgPSBmYWxzZTtcbiAgICAgIGxldCBjdXJyZW50OiBhbnkgPSB0YXJnZXQ7IC8vIEdldCB0aGUgZWxlbWVudCBpbiB0aGUgRE9NIG9uIHdoaWNoIHRoZSBtb3VzZSB3YXMgY2xpY2tlZFxuICAgICAgY29uc3QgaG9zdDogYW55ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7IC8vIEN1cnJlbnQgQnV0dG9uIEdyb3VwXG5cbiAgICAgIGlmIChjdXJyZW50LmNsYXNzTGlzdC5jb250YWlucygnZHJvcGRvd24tbWVudScpKSB7XG4gICAgICAgIGN1cnJlbnQgPSBjdXJyZW50LnBhcmVudE5vZGU7XG4gICAgICAgIHdoaWxlIChjdXJyZW50KSB7XG4gICAgICAgICAgaWYgKGN1cnJlbnQgPT09IGRvY3VtZW50KSB7XG4gICAgICAgICAgICB0aGlzLm9wZW5NZW51ID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gSWYgY2xpY2tlZCBvbiBkcm9wZG93biBtZW51IGFuZCBtZW51IGlzIGluIGhvc3RcbiAgICAgICAgICAvLyBkbyBub3RoaW5nXG4gICAgICAgICAgaWYgKGN1cnJlbnQgPT09IGhvc3QpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgY3VycmVudCA9IGN1cnJlbnQucGFyZW50Tm9kZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5vcGVuTWVudSA9IGZhbHNlO1xuICAgIH1cbiAgICB0aGlzLl9vdmVyZmxvd01lbnVUb2dnbGVDbGlja2VkID0gZmFsc2U7IC8vIFJlc2V0IHRoZSBvdmVyZmxvdyBtZW51IHRvZ2dsZSBjbGlja2VkIGZsYWdcbiAgfVxufVxuIl19