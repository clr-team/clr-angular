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
export class ClrMonthpicker {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9udGhwaWNrZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJmb3Jtcy9kYXRlcGlja2VyL21vbnRocGlja2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtBLE9BQU8sRUFBaUIsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFbkYsT0FBTyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBRWhHLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzVFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQzlFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBbUJ0RSxNQUFNLE9BQU8sY0FBYzs7Ozs7Ozs7SUFDekIsWUFDVSxtQkFBdUMsRUFDdkMsb0JBQXlDLEVBQ3pDLHNCQUE2QyxFQUM3Qyx1QkFBK0MsRUFDL0MsTUFBa0I7UUFKbEIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFvQjtRQUN2Qyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXFCO1FBQ3pDLDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBdUI7UUFDN0MsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUF3QjtRQUMvQyxXQUFNLEdBQU4sTUFBTSxDQUFZO1FBRTFCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUM7SUFDcEQsQ0FBQzs7Ozs7O0lBV0QsSUFBSSxVQUFVO1FBQ1osT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsZ0JBQWdCLENBQUM7SUFDcEQsQ0FBQzs7Ozs7SUFLRCxJQUFJLGtCQUFrQjtRQUNwQixPQUFPLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUM7SUFDN0QsQ0FBQzs7Ozs7OztJQU1ELFdBQVcsQ0FBQyxVQUFrQjtRQUM1QixJQUFJLENBQUMsc0JBQXNCLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUM3QyxDQUFDOzs7Ozs7SUFLRCxXQUFXLENBQUMsVUFBa0I7UUFDNUIsT0FBTyxVQUFVLEtBQUssSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3pELENBQUM7Ozs7OztJQU1ELFNBQVMsQ0FBQyxLQUFvQjtRQUM1QixnRUFBZ0U7UUFDaEUsNkRBQTZEO1FBQzdELHNFQUFzRTtRQUN0RSxJQUFJLEtBQUssRUFBRTs7a0JBQ0gsT0FBTyxHQUFXLEtBQUssQ0FBQyxPQUFPO1lBQ3JDLElBQUksT0FBTyxLQUFLLFFBQVEsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEdBQUcsQ0FBQyxFQUFFO2dCQUN2RCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO2dCQUMxQixJQUFJLENBQUMsdUJBQXVCLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNyRDtpQkFBTSxJQUFJLE9BQU8sS0FBSyxVQUFVLElBQUksSUFBSSxDQUFDLGtCQUFrQixHQUFHLEVBQUUsRUFBRTtnQkFDakUsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUN2QixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztnQkFDMUIsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDckQ7aUJBQU0sSUFBSSxPQUFPLEtBQUssV0FBVyxJQUFJLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLEVBQUU7Z0JBQ2pFLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDdkIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLENBQUM7Z0JBQ3RELElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3JEO2lCQUFNLElBQUksT0FBTyxLQUFLLFVBQVUsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEdBQUcsQ0FBQyxFQUFFO2dCQUNoRSxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsQ0FBQyxDQUFDO2dCQUN0RCxJQUFJLENBQUMsdUJBQXVCLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNyRDtTQUNGO0lBQ0gsQ0FBQzs7Ozs7SUFLRCxlQUFlO1FBQ2IsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdEQsQ0FBQzs7O1lBbkdGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7S0FVUDtnQkFDSCxJQUFJLEVBQUU7b0JBQ0oscUJBQXFCLEVBQUUsTUFBTTtpQkFDOUI7YUFDRjs7OztZQWxCUSxrQkFBa0I7WUFEbEIsbUJBQW1CO1lBRm5CLHFCQUFxQjtZQUNyQixzQkFBc0I7WUFMSSxVQUFVOzs7d0JBNEUxQyxZQUFZLFNBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDOzs7Ozs7OztJQXBDbkMsNENBQW1DOzs7OztJQVpqQyw2Q0FBK0M7Ozs7O0lBQy9DLDhDQUFpRDs7Ozs7SUFDakQsZ0RBQXFEOzs7OztJQUNyRCxpREFBdUQ7Ozs7O0lBQ3ZELGdDQUEwQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IERPV05fQVJST1csIExFRlRfQVJST1csIFJJR0hUX0FSUk9XLCBVUF9BUlJPVyB9IGZyb20gJy4uLy4uL3V0aWxzL2tleS1jb2Rlcy9rZXktY29kZXMnO1xuXG5pbXBvcnQgeyBEYXRlTmF2aWdhdGlvblNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9kYXRlLW5hdmlnYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBEYXRlcGlja2VyRm9jdXNTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvZGF0ZXBpY2tlci1mb2N1cy5zZXJ2aWNlJztcbmltcG9ydCB7IExvY2FsZUhlbHBlclNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9sb2NhbGUtaGVscGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgVmlld01hbmFnZXJTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvdmlldy1tYW5hZ2VyLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItbW9udGhwaWNrZXInLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIGNsYXNzPVwiY2FsZW5kYXItYnRuIG1vbnRoXCJcbiAgICAgICAgICAgICpuZ0Zvcj1cImxldCBtb250aCBvZiBtb250aE5hbWVzOyBsZXQgbW9udGhJbmRleCA9IGluZGV4XCJcbiAgICAgICAgICAgIChjbGljayk9XCJjaGFuZ2VNb250aChtb250aEluZGV4KVwiXG4gICAgICAgICAgICBbY2xhc3MuaXMtc2VsZWN0ZWRdPVwibW9udGhJbmRleCA9PT0gY2FsZW5kYXJNb250aEluZGV4XCJcbiAgICAgICAgICAgIFthdHRyLnRhYmluZGV4XT1cImdldFRhYkluZGV4KG1vbnRoSW5kZXgpXCI+XG4gICAgICAgICAgICB7e21vbnRofX1cbiAgICAgICAgPC9idXR0b24+XG4gICAgYCxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MubW9udGhwaWNrZXJdJzogJ3RydWUnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBDbHJNb250aHBpY2tlciBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF92aWV3TWFuYWdlclNlcnZpY2U6IFZpZXdNYW5hZ2VyU2VydmljZSxcbiAgICBwcml2YXRlIF9sb2NhbGVIZWxwZXJTZXJ2aWNlOiBMb2NhbGVIZWxwZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgX2RhdGVOYXZpZ2F0aW9uU2VydmljZTogRGF0ZU5hdmlnYXRpb25TZXJ2aWNlLFxuICAgIHByaXZhdGUgX2RhdGVwaWNrZXJGb2N1c1NlcnZpY2U6IERhdGVwaWNrZXJGb2N1c1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBfZWxSZWY6IEVsZW1lbnRSZWZcbiAgKSB7XG4gICAgdGhpcy5fZm9jdXNlZE1vbnRoSW5kZXggPSB0aGlzLmNhbGVuZGFyTW9udGhJbmRleDtcbiAgfVxuXG4gIC8qKlxuICAgKiBLZWVwcyB0cmFjayBvZiB0aGUgY3VycmVudCBmb2N1c2VkIG1vbnRoLlxuICAgKi9cbiAgcHJpdmF0ZSBfZm9jdXNlZE1vbnRoSW5kZXg6IG51bWJlcjtcblxuICAvKipcbiAgICogR2V0cyB0aGUgbW9udGhzIGFycmF5IHdoaWNoIGlzIHVzZWQgdG8gcmVuZGVyZWQgdGhlIG1vbnRocGlja2VyIHZpZXcuXG4gICAqIE1vbnRocyBhcmUgaW4gdGhlIFRyYW5zbGF0aW9uV2lkdGguV2lkZSBmb3JtYXQuXG4gICAqL1xuICBnZXQgbW9udGhOYW1lcygpOiBSZWFkb25seUFycmF5PHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLl9sb2NhbGVIZWxwZXJTZXJ2aWNlLmxvY2FsZU1vbnRoc1dpZGU7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgbW9udGggdmFsdWUgb2YgdGhlIENhbGVuZGFyLlxuICAgKi9cbiAgZ2V0IGNhbGVuZGFyTW9udGhJbmRleCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9kYXRlTmF2aWdhdGlvblNlcnZpY2UuZGlzcGxheWVkQ2FsZW5kYXIubW9udGg7XG4gIH1cblxuICAvKipcbiAgICogQ2FsbHMgdGhlIERhdGVOYXZpZ2F0aW9uU2VydmljZSB0byB1cGRhdGUgdGhlIG1vbnRoIHZhbHVlIG9mIHRoZSBjYWxlbmRhci5cbiAgICogQWxzbyBjaGFuZ2VzIHRoZSB2aWV3IHRvIHRoZSBkYXlwaWNrZXIuXG4gICAqL1xuICBjaGFuZ2VNb250aChtb250aEluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLl9kYXRlTmF2aWdhdGlvblNlcnZpY2UuY2hhbmdlTW9udGgobW9udGhJbmRleCk7XG4gICAgdGhpcy5fdmlld01hbmFnZXJTZXJ2aWNlLmNoYW5nZVRvRGF5VmlldygpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbXBhcmVzIHRoZSBtb250aCBwYXNzZWQgdG8gdGhlIGZvY3VzZWQgbW9udGggYW5kIHJldHVybnMgdGhlIHRhYiBpbmRleC5cbiAgICovXG4gIGdldFRhYkluZGV4KG1vbnRoSW5kZXg6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIG1vbnRoSW5kZXggPT09IHRoaXMuX2ZvY3VzZWRNb250aEluZGV4ID8gMCA6IC0xO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgdGhlIEtleWJvYXJkIGFycm93IG5hdmlnYXRpb24gZm9yIHRoZSBtb250aHBpY2tlci5cbiAgICovXG4gIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24nLCBbJyRldmVudCddKVxuICBvbktleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAvLyBOT1RFOiBEaWRuJ3QgbW92ZSB0aGlzIHRvIHRoZSBkYXRlIG5hdmlnYXRpb24gc2VydmljZSBiZWNhdXNlXG4gICAgLy8gdGhlIGxvZ2ljIGlzIGZhaXJseSBzaW1wbGUgYW5kIGl0IGRpZG4ndCBtYWtlIHNlbnNlIGZvciBtZVxuICAgIC8vIHRvIGNyZWF0ZSBleHRyYSBvYnNlcnZhYmxlcyBqdXN0IHRvIG1vdmUgdGhpcyBsb2dpYyB0byB0aGUgc2VydmljZS5cbiAgICBpZiAoZXZlbnQpIHtcbiAgICAgIGNvbnN0IGtleUNvZGU6IG51bWJlciA9IGV2ZW50LmtleUNvZGU7XG4gICAgICBpZiAoa2V5Q29kZSA9PT0gVVBfQVJST1cgJiYgdGhpcy5fZm9jdXNlZE1vbnRoSW5kZXggPiAwKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuX2ZvY3VzZWRNb250aEluZGV4LS07XG4gICAgICAgIHRoaXMuX2RhdGVwaWNrZXJGb2N1c1NlcnZpY2UuZm9jdXNDZWxsKHRoaXMuX2VsUmVmKTtcbiAgICAgIH0gZWxzZSBpZiAoa2V5Q29kZSA9PT0gRE9XTl9BUlJPVyAmJiB0aGlzLl9mb2N1c2VkTW9udGhJbmRleCA8IDExKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuX2ZvY3VzZWRNb250aEluZGV4Kys7XG4gICAgICAgIHRoaXMuX2RhdGVwaWNrZXJGb2N1c1NlcnZpY2UuZm9jdXNDZWxsKHRoaXMuX2VsUmVmKTtcbiAgICAgIH0gZWxzZSBpZiAoa2V5Q29kZSA9PT0gUklHSFRfQVJST1cgJiYgdGhpcy5fZm9jdXNlZE1vbnRoSW5kZXggPCA2KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuX2ZvY3VzZWRNb250aEluZGV4ID0gdGhpcy5fZm9jdXNlZE1vbnRoSW5kZXggKyA2O1xuICAgICAgICB0aGlzLl9kYXRlcGlja2VyRm9jdXNTZXJ2aWNlLmZvY3VzQ2VsbCh0aGlzLl9lbFJlZik7XG4gICAgICB9IGVsc2UgaWYgKGtleUNvZGUgPT09IExFRlRfQVJST1cgJiYgdGhpcy5fZm9jdXNlZE1vbnRoSW5kZXggPiA1KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuX2ZvY3VzZWRNb250aEluZGV4ID0gdGhpcy5fZm9jdXNlZE1vbnRoSW5kZXggLSA2O1xuICAgICAgICB0aGlzLl9kYXRlcGlja2VyRm9jdXNTZXJ2aWNlLmZvY3VzQ2VsbCh0aGlzLl9lbFJlZik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEZvY3VzZXMgb24gdGhlIGN1cnJlbnQgY2FsZW5kYXIgbW9udGggd2hlbiB0aGUgVmlldyBpcyBpbml0aWFsaXplZC5cbiAgICovXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLl9kYXRlcGlja2VyRm9jdXNTZXJ2aWNlLmZvY3VzQ2VsbCh0aGlzLl9lbFJlZik7XG4gIH1cbn1cbiJdfQ==