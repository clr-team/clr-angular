/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ElementRef, Injector, SkipSelf } from '@angular/core';
import { AbstractPopover } from '../../popover/common/abstract-popover';
import { Point } from '../../popover/common/popover';
import { DatepickerFocusService } from './providers/datepicker-focus.service';
import { ViewManagerService } from './providers/view-manager.service';
var ClrDatepickerViewManager = /** @class */ (function (_super) {
    tslib_1.__extends(ClrDatepickerViewManager, _super);
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
export { ClrDatepickerViewManager };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ClrDatepickerViewManager.prototype._viewManagerService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci12aWV3LW1hbmFnZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJmb3Jtcy9kYXRlcGlja2VyL2RhdGVwaWNrZXItdmlldy1tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFNQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFFckQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDOUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFFdEU7SUFNOEMsb0RBQWU7SUFDM0Qsa0NBQXdCLE1BQWtCLEVBQUUsU0FBbUIsRUFBVSxtQkFBdUM7UUFBaEgsWUFDRSxrQkFBTSxTQUFTLEVBQUUsTUFBTSxDQUFDLFNBRXpCO1FBSHdFLHlCQUFtQixHQUFuQixtQkFBbUIsQ0FBb0I7UUFFOUcsS0FBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7O0lBQzFCLENBQUM7SUFFRDs7T0FFRzs7Ozs7O0lBQ0ssbURBQWdCOzs7OztJQUF4QjtRQUNFLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQztRQUNyQyxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUM7UUFDbkMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQztJQUNsQyxDQUFDO0lBS0Qsc0JBQUksaURBQVc7UUFIZjs7V0FFRzs7Ozs7UUFDSDtZQUNFLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsQ0FBQztRQUM5QyxDQUFDOzs7T0FBQTtJQUtELHNCQUFJLGdEQUFVO1FBSGQ7O1dBRUc7Ozs7O1FBQ0g7WUFDRSxPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLENBQUM7UUFDN0MsQ0FBQzs7O09BQUE7SUFLRCxzQkFBSSwrQ0FBUztRQUhiOztXQUVHOzs7OztRQUNIO1lBQ0UsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDO1FBQzVDLENBQUM7OztPQUFBOztnQkF4Q0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSw2QkFBNkI7b0JBQ3ZDLDZZQUE2QztvQkFDN0MsU0FBUyxFQUFFLENBQUMsa0JBQWtCLEVBQUUsc0JBQXNCLENBQUM7b0JBQ3ZELElBQUksRUFBRSxFQUFFLG9CQUFvQixFQUFFLE1BQU0sRUFBRTtpQkFDdkM7Ozs7Z0JBYm1CLFVBQVUsdUJBZWYsUUFBUTtnQkFmUyxRQUFRO2dCQU0vQixrQkFBa0I7O0lBMkMzQiwrQkFBQztDQUFBLEFBekNELENBTThDLGVBQWUsR0FtQzVEO1NBbkNZLHdCQUF3Qjs7Ozs7O0lBQzhCLHVEQUErQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBJbmplY3RvciwgU2tpcFNlbGYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQWJzdHJhY3RQb3BvdmVyIH0gZnJvbSAnLi4vLi4vcG9wb3Zlci9jb21tb24vYWJzdHJhY3QtcG9wb3Zlcic7XG5pbXBvcnQgeyBQb2ludCB9IGZyb20gJy4uLy4uL3BvcG92ZXIvY29tbW9uL3BvcG92ZXInO1xuXG5pbXBvcnQgeyBEYXRlcGlja2VyRm9jdXNTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvZGF0ZXBpY2tlci1mb2N1cy5zZXJ2aWNlJztcbmltcG9ydCB7IFZpZXdNYW5hZ2VyU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL3ZpZXctbWFuYWdlci5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLWRhdGVwaWNrZXItdmlldy1tYW5hZ2VyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2RhdGVwaWNrZXItdmlldy1tYW5hZ2VyLmh0bWwnLFxuICBwcm92aWRlcnM6IFtWaWV3TWFuYWdlclNlcnZpY2UsIERhdGVwaWNrZXJGb2N1c1NlcnZpY2VdLFxuICBob3N0OiB7ICdbY2xhc3MuZGF0ZXBpY2tlcl0nOiAndHJ1ZScgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyRGF0ZXBpY2tlclZpZXdNYW5hZ2VyIGV4dGVuZHMgQWJzdHJhY3RQb3BvdmVyIHtcbiAgY29uc3RydWN0b3IoQFNraXBTZWxmKCkgcGFyZW50OiBFbGVtZW50UmVmLCBfaW5qZWN0b3I6IEluamVjdG9yLCBwcml2YXRlIF92aWV3TWFuYWdlclNlcnZpY2U6IFZpZXdNYW5hZ2VyU2VydmljZSkge1xuICAgIHN1cGVyKF9pbmplY3RvciwgcGFyZW50KTtcbiAgICB0aGlzLmNvbmZpZ3VyZVBvcG92ZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb25maWd1cmUgUG9wb3ZlciBEaXJlY3Rpb24gYW5kIENsb3NlIGluZGljYXRvcnNcbiAgICovXG4gIHByaXZhdGUgY29uZmlndXJlUG9wb3ZlcigpOiB2b2lkIHtcbiAgICB0aGlzLmFuY2hvclBvaW50ID0gUG9pbnQuQk9UVE9NX0xFRlQ7XG4gICAgdGhpcy5wb3BvdmVyUG9pbnQgPSBQb2ludC5MRUZUX1RPUDtcbiAgICB0aGlzLmNsb3NlT25PdXRzaWRlQ2xpY2sgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgaWYgdGhlIGN1cnJlbnQgdmlldyBpcyB0aGUgbW9udGhwaWNrZXIuXG4gICAqL1xuICBnZXQgaXNNb250aFZpZXcoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3ZpZXdNYW5hZ2VyU2VydmljZS5pc01vbnRoVmlldztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGlmIHRoZSBjdXJyZW50IHZpZXcgaXMgdGhlIHllYXJwaWNrZXIuXG4gICAqL1xuICBnZXQgaXNZZWFyVmlldygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fdmlld01hbmFnZXJTZXJ2aWNlLmlzWWVhclZpZXc7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBpZiB0aGUgY3VycmVudCB2aWV3IGlzIHRoZSBkYXlwaWNrZXIuXG4gICAqL1xuICBnZXQgaXNEYXlWaWV3KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl92aWV3TWFuYWdlclNlcnZpY2UuaXNEYXlWaWV3O1xuICB9XG59XG4iXX0=