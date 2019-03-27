/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Point } from '../../popover/common/popover';
import { RowActionService } from './providers/row-action-service';
import { ClrCommonStrings } from '../../utils/i18n/common-strings.interface';
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
export { ClrDatagridActionOverflow };
if (false) {
    /** @type {?} */
    ClrDatagridActionOverflow.prototype.anchorPoint;
    /** @type {?} */
    ClrDatagridActionOverflow.prototype.popoverPoint;
    /**
     * Tracks whether the action overflow menu is open or not
     * @type {?}
     * @private
     */
    ClrDatagridActionOverflow.prototype._open;
    /** @type {?} */
    ClrDatagridActionOverflow.prototype.openChanged;
    /**
     * @type {?}
     * @private
     */
    ClrDatagridActionOverflow.prototype.openingEvent;
    /**
     * @type {?}
     * @private
     */
    ClrDatagridActionOverflow.prototype.rowActionService;
    /** @type {?} */
    ClrDatagridActionOverflow.prototype.commonStrings;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtYWN0aW9uLW92ZXJmbG93LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9kYXRhZ3JpZC1hY3Rpb24tb3ZlcmZsb3cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFhLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVsRixPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFFckQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDbEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFFN0U7SUFrQkUsbUNBQW9CLGdCQUFrQyxFQUFTLGFBQStCO1FBQTFFLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFBUyxrQkFBYSxHQUFiLGFBQWEsQ0FBa0I7UUFIdkYsZ0JBQVcsR0FBVSxLQUFLLENBQUMsWUFBWSxDQUFDO1FBQ3hDLGlCQUFZLEdBQVUsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7OztRQWF2QyxVQUFLLEdBQUcsS0FBSyxDQUFDO1FBYzBCLGdCQUFXLEdBQUcsSUFBSSxZQUFZLENBQVUsS0FBSyxDQUFDLENBQUM7UUF4QjdGLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNuQyxDQUFDOzs7O0lBRUQsK0NBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFNRCxzQkFBVywyQ0FBSTs7OztRQUFmO1lBQ0UsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3BCLENBQUM7Ozs7O1FBRUQsVUFDZ0IsSUFBYTs7Z0JBQ3JCLFFBQVEsR0FBRyxDQUFDLENBQUMsSUFBSTtZQUN2QixJQUFJLFFBQVEsS0FBSyxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUMzQixJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQztnQkFDdEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDakM7UUFDSCxDQUFDOzs7T0FUQTtJQW1CRDs7T0FFRzs7Ozs7O0lBQ0ksMENBQU07Ozs7O0lBQWIsVUFBYyxLQUFVO1FBQ3RCLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBQzFCLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3pCLENBQUM7Ozs7O0lBRU0seUNBQUs7Ozs7SUFBWixVQUFhLEtBQWlCO1FBQzVCOzs7O2VBSU87UUFDUCxJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQy9CLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztZQUN6QixPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztJQUNwQixDQUFDOztnQkF0RUYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSx3QkFBd0I7b0JBQ2xDLFFBQVEsRUFBRSx1bkJBVVA7aUJBQ0o7Ozs7Z0JBaEJRLGdCQUFnQjtnQkFDaEIsZ0JBQWdCOzs7dUJBb0N0QixLQUFLLFNBQUMseUJBQXlCOzhCQVMvQixNQUFNLFNBQUMsK0JBQStCOztJQTRCekMsZ0NBQUM7Q0FBQSxBQXZFRCxJQXVFQztTQXpEWSx5QkFBeUI7OztJQUNwQyxnREFBK0M7O0lBQy9DLGlEQUErQzs7Ozs7O0lBYS9DLDBDQUFzQjs7SUFjdEIsZ0RBQStGOzs7OztJQU0vRixpREFBMEI7Ozs7O0lBL0JkLHFEQUEwQzs7SUFBRSxrREFBc0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uRGVzdHJveSwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFBvaW50IH0gZnJvbSAnLi4vLi4vcG9wb3Zlci9jb21tb24vcG9wb3Zlcic7XG5cbmltcG9ydCB7IFJvd0FjdGlvblNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9yb3ctYWN0aW9uLXNlcnZpY2UnO1xuaW1wb3J0IHsgQ2xyQ29tbW9uU3RyaW5ncyB9IGZyb20gJy4uLy4uL3V0aWxzL2kxOG4vY29tbW9uLXN0cmluZ3MuaW50ZXJmYWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLWRnLWFjdGlvbi1vdmVyZmxvdycsXG4gIHRlbXBsYXRlOiBgXG4gICAgICAgIDxidXR0b24gKGNsaWNrKT1cInRvZ2dsZSgkZXZlbnQpXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiZGF0YWdyaWQtYWN0aW9uLXRvZ2dsZVwiICNhbmNob3I+XG4gICAgICAgICAgICA8Y2xyLWljb24gc2hhcGU9XCJlbGxpcHNpcy12ZXJ0aWNhbFwiIFthdHRyLnRpdGxlXT1cImNvbW1vblN0cmluZ3Mucm93QWN0aW9uc1wiPjwvY2xyLWljb24+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8bmctdGVtcGxhdGUgWyhjbHJQb3BvdmVyT2xkKV09XCJvcGVuXCIgW2NsclBvcG92ZXJPbGRBbmNob3JdPVwiYW5jaG9yXCIgW2NsclBvcG92ZXJPbGRBbmNob3JQb2ludF09XCJhbmNob3JQb2ludFwiXG4gICAgICAgICAgICAgICAgICAgICBbY2xyUG9wb3Zlck9sZFBvcG92ZXJQb2ludF09XCJwb3BvdmVyUG9pbnRcIj5cbiAgICAgICAgICAgIDxkaXYgI21lbnUgY2xhc3M9XCJkYXRhZ3JpZC1hY3Rpb24tb3ZlcmZsb3dcIiAoY2xyT3V0c2lkZUNsaWNrKT1cImNsb3NlKCRldmVudClcIiBbY2xyU3RyaWN0XT1cInRydWVcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICBgLFxufSlcbmV4cG9ydCBjbGFzcyBDbHJEYXRhZ3JpZEFjdGlvbk92ZXJmbG93IGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcHVibGljIGFuY2hvclBvaW50OiBQb2ludCA9IFBvaW50LlJJR0hUX0NFTlRFUjtcbiAgcHVibGljIHBvcG92ZXJQb2ludDogUG9pbnQgPSBQb2ludC5MRUZUX0NFTlRFUjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvd0FjdGlvblNlcnZpY2U6IFJvd0FjdGlvblNlcnZpY2UsIHB1YmxpYyBjb21tb25TdHJpbmdzOiBDbHJDb21tb25TdHJpbmdzKSB7XG4gICAgdGhpcy5yb3dBY3Rpb25TZXJ2aWNlLnJlZ2lzdGVyKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnJvd0FjdGlvblNlcnZpY2UudW5yZWdpc3RlcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRyYWNrcyB3aGV0aGVyIHRoZSBhY3Rpb24gb3ZlcmZsb3cgbWVudSBpcyBvcGVuIG9yIG5vdFxuICAgKi9cbiAgcHJpdmF0ZSBfb3BlbiA9IGZhbHNlO1xuICBwdWJsaWMgZ2V0IG9wZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuX29wZW47XG4gIH1cblxuICBASW5wdXQoJ2NsckRnQWN0aW9uT3ZlcmZsb3dPcGVuJylcbiAgcHVibGljIHNldCBvcGVuKG9wZW46IGJvb2xlYW4pIHtcbiAgICBjb25zdCBib29sT3BlbiA9ICEhb3BlbjtcbiAgICBpZiAoYm9vbE9wZW4gIT09IHRoaXMuX29wZW4pIHtcbiAgICAgIHRoaXMuX29wZW4gPSBib29sT3BlbjtcbiAgICAgIHRoaXMub3BlbkNoYW5nZWQuZW1pdChib29sT3Blbik7XG4gICAgfVxuICB9XG5cbiAgQE91dHB1dCgnY2xyRGdBY3Rpb25PdmVyZmxvd09wZW5DaGFuZ2UnKSBwdWJsaWMgb3BlbkNoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KGZhbHNlKTtcblxuICAvKlxuICAgICAqIFdlIG5lZWQgdG8gcmVtZW1iZXIgdGhlIGNsaWNrIHRoYXQgb3BlbnMgdGhlIG1lbnUsIHRvIG1ha2Ugc3VyZSBpdCBkb2Vzbid0IGNsb3NlIHRoZSBtZW51IGluc3RhbnRseVxuICAgICAqIHdoZW4gdGhlIGV2ZW50IGJ1YmJsZXMgdXAgdGhlIERPTSBhbGwgdGhlIHdheSB0byB0aGUgZG9jdW1lbnQsIHdoaWNoIHdlIGFsc28gbGlzdGVuIHRvLlxuICAgICAqL1xuICBwcml2YXRlIG9wZW5pbmdFdmVudDogYW55O1xuXG4gIC8qKlxuICAgKiBTaG93cy9oaWRlcyB0aGUgYWN0aW9uIG92ZXJmbG93IG1lbnVcbiAgICovXG4gIHB1YmxpYyB0b2dnbGUoZXZlbnQ6IGFueSkge1xuICAgIHRoaXMub3BlbmluZ0V2ZW50ID0gZXZlbnQ7XG4gICAgdGhpcy5vcGVuID0gIXRoaXMub3BlbjtcbiAgfVxuXG4gIHB1YmxpYyBjbG9zZShldmVudDogTW91c2VFdmVudCkge1xuICAgIC8qXG4gICAgICAgICAqIEJlY2F1c2UgdGhpcyBsaXN0ZW5lciBpcyBhZGRlZCBzeW5jaG9ub3VzbHksIGJlZm9yZSB0aGUgZXZlbnQgZmluaXNoZXMgYnViYmxpbmcgdXAgdGhlIERPTSxcbiAgICAgICAgICogd2UgZW5kIHVwIGZpcmluZyBvbiB0aGUgdmVyeSBjbGljayB0aGF0IGp1c3Qgb3BlbmVkIHRoZSBtZW51LCBwXG4gICAgICAgICAqIG90ZW50aWFsbHkgY2xvc2luZyBpdCBpbW1lZGlhdGVseSBldmVyeSB0aW1lLiBTbyB3ZSBqdXN0IGlnbm9yZSBpdC5cbiAgICAgICAgICovXG4gICAgaWYgKGV2ZW50ID09PSB0aGlzLm9wZW5pbmdFdmVudCkge1xuICAgICAgZGVsZXRlIHRoaXMub3BlbmluZ0V2ZW50O1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLm9wZW4gPSBmYWxzZTtcbiAgfVxufVxuIl19