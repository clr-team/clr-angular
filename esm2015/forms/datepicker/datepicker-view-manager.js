/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export class ClrDatepickerViewManager extends AbstractPopover {
    /**
     * @param {?} parent
     * @param {?} _injector
     * @param {?} _viewManagerService
     */
    constructor(parent, _injector, _viewManagerService) {
        super(_injector, parent);
        this._viewManagerService = _viewManagerService;
        this.configurePopover();
    }
    /**
     * Configure Popover Direction and Close indicators
     * @private
     * @return {?}
     */
    configurePopover() {
        this.anchorPoint = Point.BOTTOM_LEFT;
        this.popoverPoint = Point.LEFT_TOP;
        this.closeOnOutsideClick = true;
    }
    /**
     * Returns if the current view is the monthpicker.
     * @return {?}
     */
    get isMonthView() {
        return this._viewManagerService.isMonthView;
    }
    /**
     * Returns if the current view is the yearpicker.
     * @return {?}
     */
    get isYearView() {
        return this._viewManagerService.isYearView;
    }
    /**
     * Returns if the current view is the daypicker.
     * @return {?}
     */
    get isDayView() {
        return this._viewManagerService.isDayView;
    }
}
ClrDatepickerViewManager.decorators = [
    { type: Component, args: [{
                selector: 'clr-datepicker-view-manager',
                template: "<!--\n* Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.\n* This software is released under MIT license.\n* The full license information can be found in LICENSE in the root directory of this project.\n-->\n\n<clr-monthpicker *ngIf=\"isMonthView\"></clr-monthpicker>\n<clr-yearpicker *ngIf=\"isYearView\"></clr-yearpicker>\n<clr-daypicker *ngIf=\"isDayView\"></clr-daypicker>\n",
                providers: [ViewManagerService, DatepickerFocusService],
                host: { '[class.datepicker]': 'true' }
            }] }
];
/** @nocollapse */
ClrDatepickerViewManager.ctorParameters = () => [
    { type: ElementRef, decorators: [{ type: SkipSelf }] },
    { type: Injector },
    { type: ViewManagerService }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    ClrDatepickerViewManager.prototype._viewManagerService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci12aWV3LW1hbmFnZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJmb3Jtcy9kYXRlcGlja2VyL2RhdGVwaWNrZXItdmlldy1tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQU1BLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFMUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUVyRCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUM5RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQVF0RSxNQUFNLE9BQU8sd0JBQXlCLFNBQVEsZUFBZTs7Ozs7O0lBQzNELFlBQXdCLE1BQWtCLEVBQUUsU0FBbUIsRUFBVSxtQkFBdUM7UUFDOUcsS0FBSyxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUQ4Qyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQW9CO1FBRTlHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQzFCLENBQUM7Ozs7OztJQUtPLGdCQUFnQjtRQUN0QixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7UUFDckMsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDO1FBQ25DLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUM7SUFDbEMsQ0FBQzs7Ozs7SUFLRCxJQUFJLFdBQVc7UUFDYixPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLENBQUM7SUFDOUMsQ0FBQzs7Ozs7SUFLRCxJQUFJLFVBQVU7UUFDWixPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLENBQUM7SUFDN0MsQ0FBQzs7Ozs7SUFLRCxJQUFJLFNBQVM7UUFDWCxPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUM7SUFDNUMsQ0FBQzs7O1lBeENGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsNkJBQTZCO2dCQUN2Qyw2WUFBNkM7Z0JBQzdDLFNBQVMsRUFBRSxDQUFDLGtCQUFrQixFQUFFLHNCQUFzQixDQUFDO2dCQUN2RCxJQUFJLEVBQUUsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLEVBQUU7YUFDdkM7Ozs7WUFibUIsVUFBVSx1QkFlZixRQUFRO1lBZlMsUUFBUTtZQU0vQixrQkFBa0I7Ozs7Ozs7SUFTd0MsdURBQStDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEluamVjdG9yLCBTa2lwU2VsZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBBYnN0cmFjdFBvcG92ZXIgfSBmcm9tICcuLi8uLi9wb3BvdmVyL2NvbW1vbi9hYnN0cmFjdC1wb3BvdmVyJztcbmltcG9ydCB7IFBvaW50IH0gZnJvbSAnLi4vLi4vcG9wb3Zlci9jb21tb24vcG9wb3Zlcic7XG5cbmltcG9ydCB7IERhdGVwaWNrZXJGb2N1c1NlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9kYXRlcGlja2VyLWZvY3VzLnNlcnZpY2UnO1xuaW1wb3J0IHsgVmlld01hbmFnZXJTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvdmlldy1tYW5hZ2VyLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItZGF0ZXBpY2tlci12aWV3LW1hbmFnZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vZGF0ZXBpY2tlci12aWV3LW1hbmFnZXIuaHRtbCcsXG4gIHByb3ZpZGVyczogW1ZpZXdNYW5hZ2VyU2VydmljZSwgRGF0ZXBpY2tlckZvY3VzU2VydmljZV0sXG4gIGhvc3Q6IHsgJ1tjbGFzcy5kYXRlcGlja2VyXSc6ICd0cnVlJyB9LFxufSlcbmV4cG9ydCBjbGFzcyBDbHJEYXRlcGlja2VyVmlld01hbmFnZXIgZXh0ZW5kcyBBYnN0cmFjdFBvcG92ZXIge1xuICBjb25zdHJ1Y3RvcihAU2tpcFNlbGYoKSBwYXJlbnQ6IEVsZW1lbnRSZWYsIF9pbmplY3RvcjogSW5qZWN0b3IsIHByaXZhdGUgX3ZpZXdNYW5hZ2VyU2VydmljZTogVmlld01hbmFnZXJTZXJ2aWNlKSB7XG4gICAgc3VwZXIoX2luamVjdG9yLCBwYXJlbnQpO1xuICAgIHRoaXMuY29uZmlndXJlUG9wb3ZlcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbmZpZ3VyZSBQb3BvdmVyIERpcmVjdGlvbiBhbmQgQ2xvc2UgaW5kaWNhdG9yc1xuICAgKi9cbiAgcHJpdmF0ZSBjb25maWd1cmVQb3BvdmVyKCk6IHZvaWQge1xuICAgIHRoaXMuYW5jaG9yUG9pbnQgPSBQb2ludC5CT1RUT01fTEVGVDtcbiAgICB0aGlzLnBvcG92ZXJQb2ludCA9IFBvaW50LkxFRlRfVE9QO1xuICAgIHRoaXMuY2xvc2VPbk91dHNpZGVDbGljayA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBpZiB0aGUgY3VycmVudCB2aWV3IGlzIHRoZSBtb250aHBpY2tlci5cbiAgICovXG4gIGdldCBpc01vbnRoVmlldygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fdmlld01hbmFnZXJTZXJ2aWNlLmlzTW9udGhWaWV3O1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgaWYgdGhlIGN1cnJlbnQgdmlldyBpcyB0aGUgeWVhcnBpY2tlci5cbiAgICovXG4gIGdldCBpc1llYXJWaWV3KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl92aWV3TWFuYWdlclNlcnZpY2UuaXNZZWFyVmlldztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGlmIHRoZSBjdXJyZW50IHZpZXcgaXMgdGhlIGRheXBpY2tlci5cbiAgICovXG4gIGdldCBpc0RheVZpZXcoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3ZpZXdNYW5hZ2VyU2VydmljZS5pc0RheVZpZXc7XG4gIH1cbn1cbiJdfQ==