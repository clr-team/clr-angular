/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ElementRef, HostListener } from '@angular/core';
import { DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, UP_ARROW } from '../../utils/key-codes/key-codes';
import { DateNavigationService } from './providers/date-navigation.service';
import { DatepickerFocusService } from './providers/datepicker-focus.service';
import { LocaleHelperService } from './providers/locale-helper.service';
import { ViewManagerService } from './providers/view-manager.service';
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
export { ClrMonthpicker };
if (false) {
    /**
     * Keeps track of the current focused month.
     * @type {?}
     * @private
     */
    ClrMonthpicker.prototype._focusedMonthIndex;
    /**
     * @type {?}
     * @private
     */
    ClrMonthpicker.prototype._viewManagerService;
    /**
     * @type {?}
     * @private
     */
    ClrMonthpicker.prototype._localeHelperService;
    /**
     * @type {?}
     * @private
     */
    ClrMonthpicker.prototype._dateNavigationService;
    /**
     * @type {?}
     * @private
     */
    ClrMonthpicker.prototype._datepickerFocusService;
    /**
     * @type {?}
     * @private
     */
    ClrMonthpicker.prototype._elRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9udGhwaWNrZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJmb3Jtcy9kYXRlcGlja2VyL21vbnRocGlja2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtBLE9BQU8sRUFBaUIsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFbkYsT0FBTyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBRWhHLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzVFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQzlFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBRXRFO0lBa0JFLHdCQUNVLG1CQUF1QyxFQUN2QyxvQkFBeUMsRUFDekMsc0JBQTZDLEVBQzdDLHVCQUErQyxFQUMvQyxNQUFrQjtRQUpsQix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQW9CO1FBQ3ZDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBcUI7UUFDekMsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUF1QjtRQUM3Qyw0QkFBdUIsR0FBdkIsdUJBQXVCLENBQXdCO1FBQy9DLFdBQU0sR0FBTixNQUFNLENBQVk7UUFFMUIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztJQUNwRCxDQUFDO0lBV0Qsc0JBQUksc0NBQVU7UUFKZDs7O1dBR0c7Ozs7OztRQUNIO1lBQ0UsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsZ0JBQWdCLENBQUM7UUFDcEQsQ0FBQzs7O09BQUE7SUFLRCxzQkFBSSw4Q0FBa0I7UUFIdEI7O1dBRUc7Ozs7O1FBQ0g7WUFDRSxP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Q0FBaUQ7Ozs7O0lBQ2pELGdEQUFxRDs7Ozs7SUFDckQsaURBQXVEOzs7OztJQUN2RCxnQ0FBMEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBET1dOX0FSUk9XLCBMRUZUX0FSUk9XLCBSSUdIVF9BUlJPVywgVVBfQVJST1cgfSBmcm9tICcuLi8uLi91dGlscy9rZXktY29kZXMva2V5LWNvZGVzJztcblxuaW1wb3J0IHsgRGF0ZU5hdmlnYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvZGF0ZS1uYXZpZ2F0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0ZXBpY2tlckZvY3VzU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2RhdGVwaWNrZXItZm9jdXMuc2VydmljZSc7XG5pbXBvcnQgeyBMb2NhbGVIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvbG9jYWxlLWhlbHBlci5zZXJ2aWNlJztcbmltcG9ydCB7IFZpZXdNYW5hZ2VyU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL3ZpZXctbWFuYWdlci5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLW1vbnRocGlja2VyJyxcbiAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBjbGFzcz1cImNhbGVuZGFyLWJ0biBtb250aFwiXG4gICAgICAgICAgICAqbmdGb3I9XCJsZXQgbW9udGggb2YgbW9udGhOYW1lczsgbGV0IG1vbnRoSW5kZXggPSBpbmRleFwiXG4gICAgICAgICAgICAoY2xpY2spPVwiY2hhbmdlTW9udGgobW9udGhJbmRleClcIlxuICAgICAgICAgICAgW2NsYXNzLmlzLXNlbGVjdGVkXT1cIm1vbnRoSW5kZXggPT09IGNhbGVuZGFyTW9udGhJbmRleFwiXG4gICAgICAgICAgICBbYXR0ci50YWJpbmRleF09XCJnZXRUYWJJbmRleChtb250aEluZGV4KVwiPlxuICAgICAgICAgICAge3ttb250aH19XG4gICAgICAgIDwvYnV0dG9uPlxuICAgIGAsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLm1vbnRocGlja2VyXSc6ICd0cnVlJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyTW9udGhwaWNrZXIgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfdmlld01hbmFnZXJTZXJ2aWNlOiBWaWV3TWFuYWdlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBfbG9jYWxlSGVscGVyU2VydmljZTogTG9jYWxlSGVscGVyU2VydmljZSxcbiAgICBwcml2YXRlIF9kYXRlTmF2aWdhdGlvblNlcnZpY2U6IERhdGVOYXZpZ2F0aW9uU2VydmljZSxcbiAgICBwcml2YXRlIF9kYXRlcGlja2VyRm9jdXNTZXJ2aWNlOiBEYXRlcGlja2VyRm9jdXNTZXJ2aWNlLFxuICAgIHByaXZhdGUgX2VsUmVmOiBFbGVtZW50UmVmXG4gICkge1xuICAgIHRoaXMuX2ZvY3VzZWRNb250aEluZGV4ID0gdGhpcy5jYWxlbmRhck1vbnRoSW5kZXg7XG4gIH1cblxuICAvKipcbiAgICogS2VlcHMgdHJhY2sgb2YgdGhlIGN1cnJlbnQgZm9jdXNlZCBtb250aC5cbiAgICovXG4gIHByaXZhdGUgX2ZvY3VzZWRNb250aEluZGV4OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIG1vbnRocyBhcnJheSB3aGljaCBpcyB1c2VkIHRvIHJlbmRlcmVkIHRoZSBtb250aHBpY2tlciB2aWV3LlxuICAgKiBNb250aHMgYXJlIGluIHRoZSBUcmFuc2xhdGlvbldpZHRoLldpZGUgZm9ybWF0LlxuICAgKi9cbiAgZ2V0IG1vbnRoTmFtZXMoKTogUmVhZG9ubHlBcnJheTxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5fbG9jYWxlSGVscGVyU2VydmljZS5sb2NhbGVNb250aHNXaWRlO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIG1vbnRoIHZhbHVlIG9mIHRoZSBDYWxlbmRhci5cbiAgICovXG4gIGdldCBjYWxlbmRhck1vbnRoSW5kZXgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fZGF0ZU5hdmlnYXRpb25TZXJ2aWNlLmRpc3BsYXllZENhbGVuZGFyLm1vbnRoO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGxzIHRoZSBEYXRlTmF2aWdhdGlvblNlcnZpY2UgdG8gdXBkYXRlIHRoZSBtb250aCB2YWx1ZSBvZiB0aGUgY2FsZW5kYXIuXG4gICAqIEFsc28gY2hhbmdlcyB0aGUgdmlldyB0byB0aGUgZGF5cGlja2VyLlxuICAgKi9cbiAgY2hhbmdlTW9udGgobW9udGhJbmRleDogbnVtYmVyKSB7XG4gICAgdGhpcy5fZGF0ZU5hdmlnYXRpb25TZXJ2aWNlLmNoYW5nZU1vbnRoKG1vbnRoSW5kZXgpO1xuICAgIHRoaXMuX3ZpZXdNYW5hZ2VyU2VydmljZS5jaGFuZ2VUb0RheVZpZXcoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb21wYXJlcyB0aGUgbW9udGggcGFzc2VkIHRvIHRoZSBmb2N1c2VkIG1vbnRoIGFuZCByZXR1cm5zIHRoZSB0YWIgaW5kZXguXG4gICAqL1xuICBnZXRUYWJJbmRleChtb250aEluZGV4OiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiBtb250aEluZGV4ID09PSB0aGlzLl9mb2N1c2VkTW9udGhJbmRleCA/IDAgOiAtMTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIHRoZSBLZXlib2FyZCBhcnJvdyBuYXZpZ2F0aW9uIGZvciB0aGUgbW9udGhwaWNrZXIuXG4gICAqL1xuICBASG9zdExpc3RlbmVyKCdrZXlkb3duJywgWyckZXZlbnQnXSlcbiAgb25LZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgLy8gTk9URTogRGlkbid0IG1vdmUgdGhpcyB0byB0aGUgZGF0ZSBuYXZpZ2F0aW9uIHNlcnZpY2UgYmVjYXVzZVxuICAgIC8vIHRoZSBsb2dpYyBpcyBmYWlybHkgc2ltcGxlIGFuZCBpdCBkaWRuJ3QgbWFrZSBzZW5zZSBmb3IgbWVcbiAgICAvLyB0byBjcmVhdGUgZXh0cmEgb2JzZXJ2YWJsZXMganVzdCB0byBtb3ZlIHRoaXMgbG9naWMgdG8gdGhlIHNlcnZpY2UuXG4gICAgaWYgKGV2ZW50KSB7XG4gICAgICBjb25zdCBrZXlDb2RlOiBudW1iZXIgPSBldmVudC5rZXlDb2RlO1xuICAgICAgaWYgKGtleUNvZGUgPT09IFVQX0FSUk9XICYmIHRoaXMuX2ZvY3VzZWRNb250aEluZGV4ID4gMCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLl9mb2N1c2VkTW9udGhJbmRleC0tO1xuICAgICAgICB0aGlzLl9kYXRlcGlja2VyRm9jdXNTZXJ2aWNlLmZvY3VzQ2VsbCh0aGlzLl9lbFJlZik7XG4gICAgICB9IGVsc2UgaWYgKGtleUNvZGUgPT09IERPV05fQVJST1cgJiYgdGhpcy5fZm9jdXNlZE1vbnRoSW5kZXggPCAxMSkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLl9mb2N1c2VkTW9udGhJbmRleCsrO1xuICAgICAgICB0aGlzLl9kYXRlcGlja2VyRm9jdXNTZXJ2aWNlLmZvY3VzQ2VsbCh0aGlzLl9lbFJlZik7XG4gICAgICB9IGVsc2UgaWYgKGtleUNvZGUgPT09IFJJR0hUX0FSUk9XICYmIHRoaXMuX2ZvY3VzZWRNb250aEluZGV4IDwgNikge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLl9mb2N1c2VkTW9udGhJbmRleCA9IHRoaXMuX2ZvY3VzZWRNb250aEluZGV4ICsgNjtcbiAgICAgICAgdGhpcy5fZGF0ZXBpY2tlckZvY3VzU2VydmljZS5mb2N1c0NlbGwodGhpcy5fZWxSZWYpO1xuICAgICAgfSBlbHNlIGlmIChrZXlDb2RlID09PSBMRUZUX0FSUk9XICYmIHRoaXMuX2ZvY3VzZWRNb250aEluZGV4ID4gNSkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLl9mb2N1c2VkTW9udGhJbmRleCA9IHRoaXMuX2ZvY3VzZWRNb250aEluZGV4IC0gNjtcbiAgICAgICAgdGhpcy5fZGF0ZXBpY2tlckZvY3VzU2VydmljZS5mb2N1c0NlbGwodGhpcy5fZWxSZWYpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBGb2N1c2VzIG9uIHRoZSBjdXJyZW50IGNhbGVuZGFyIG1vbnRoIHdoZW4gdGhlIFZpZXcgaXMgaW5pdGlhbGl6ZWQuXG4gICAqL1xuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5fZGF0ZXBpY2tlckZvY3VzU2VydmljZS5mb2N1c0NlbGwodGhpcy5fZWxSZWYpO1xuICB9XG59XG4iXX0=