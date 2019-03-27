/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DatagridDisplayMode } from '../enums/display-mode.enum';
import { DatagridRenderStep } from '../enums/render-step.enum';
import { DatagridRenderOrganizer } from '../render/render-organizer';
var DisplayModeService = /** @class */ (function () {
    function DisplayModeService(renderOrganizer) {
        var _this = this;
        this.subscriptions = [];
        this._view = new BehaviorSubject(DatagridDisplayMode.DISPLAY);
        this.subscriptions.push(renderOrganizer
            .filterRenderSteps(DatagridRenderStep.CALCULATE_MODE_ON)
            .subscribe((/**
         * @return {?}
         */
        function () { return _this._view.next(DatagridDisplayMode.CALCULATE); })));
        this.subscriptions.push(renderOrganizer
            .filterRenderSteps(DatagridRenderStep.CALCULATE_MODE_OFF)
            .subscribe((/**
         * @return {?}
         */
        function () { return _this._view.next(DatagridDisplayMode.DISPLAY); })));
    }
    Object.defineProperty(DisplayModeService.prototype, "view", {
        get: /**
         * @return {?}
         */
        function () {
            return this._view.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DisplayModeService.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        function (sub) { return sub.unsubscribe(); }));
    };
    DisplayModeService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    DisplayModeService.ctorParameters = function () { return [
        { type: DatagridRenderOrganizer }
    ]; };
    return DisplayModeService;
}());
export { DisplayModeService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    DisplayModeService.prototype.subscriptions;
    /**
     * @type {?}
     * @protected
     */
    DisplayModeService.prototype._view;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzcGxheS1tb2RlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJkYXRhL2RhdGFncmlkL3Byb3ZpZGVycy9kaXNwbGF5LW1vZGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFNQSxPQUFPLEVBQUUsVUFBVSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3RELE9BQU8sRUFBYyxlQUFlLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBRWpFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQy9ELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRXJFO0lBT0UsNEJBQVksZUFBd0M7UUFBcEQsaUJBWUM7UUFqQk8sa0JBQWEsR0FBbUIsRUFBRSxDQUFDO1FBQ2pDLFVBQUssR0FBeUMsSUFBSSxlQUFlLENBQ3pFLG1CQUFtQixDQUFDLE9BQU8sQ0FDNUIsQ0FBQztRQUdBLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUNyQixlQUFlO2FBQ1osaUJBQWlCLENBQUMsa0JBQWtCLENBQUMsaUJBQWlCLENBQUM7YUFDdkQsU0FBUzs7O1FBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxFQUE5QyxDQUE4QyxFQUFDLENBQ25FLENBQUM7UUFFRixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FDckIsZUFBZTthQUNaLGlCQUFpQixDQUFDLGtCQUFrQixDQUFDLGtCQUFrQixDQUFDO2FBQ3hELFNBQVM7OztRQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsRUFBNUMsQ0FBNEMsRUFBQyxDQUNqRSxDQUFDO0lBQ0osQ0FBQztJQUVELHNCQUFXLG9DQUFJOzs7O1FBQWY7WUFDRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDbkMsQ0FBQzs7O09BQUE7Ozs7SUFFRCx3Q0FBVzs7O0lBQVg7UUFDRSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU87Ozs7UUFBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxXQUFXLEVBQUUsRUFBakIsQ0FBaUIsRUFBQyxDQUFDO0lBQ3ZELENBQUM7O2dCQTNCRixVQUFVOzs7O2dCQUZGLHVCQUF1Qjs7SUE4QmhDLHlCQUFDO0NBQUEsQUE1QkQsSUE0QkM7U0EzQlksa0JBQWtCOzs7Ozs7SUFDN0IsMkNBQTJDOzs7OztJQUMzQyxtQ0FFRSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBCZWhhdmlvclN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBEYXRhZ3JpZERpc3BsYXlNb2RlIH0gZnJvbSAnLi4vZW51bXMvZGlzcGxheS1tb2RlLmVudW0nO1xuaW1wb3J0IHsgRGF0YWdyaWRSZW5kZXJTdGVwIH0gZnJvbSAnLi4vZW51bXMvcmVuZGVyLXN0ZXAuZW51bSc7XG5pbXBvcnQgeyBEYXRhZ3JpZFJlbmRlck9yZ2FuaXplciB9IGZyb20gJy4uL3JlbmRlci9yZW5kZXItb3JnYW5pemVyJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERpc3BsYXlNb2RlU2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcbiAgcHJvdGVjdGVkIF92aWV3OiBCZWhhdmlvclN1YmplY3Q8RGF0YWdyaWREaXNwbGF5TW9kZT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PERhdGFncmlkRGlzcGxheU1vZGU+KFxuICAgIERhdGFncmlkRGlzcGxheU1vZGUuRElTUExBWVxuICApO1xuXG4gIGNvbnN0cnVjdG9yKHJlbmRlck9yZ2FuaXplcjogRGF0YWdyaWRSZW5kZXJPcmdhbml6ZXIpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHJlbmRlck9yZ2FuaXplclxuICAgICAgICAuZmlsdGVyUmVuZGVyU3RlcHMoRGF0YWdyaWRSZW5kZXJTdGVwLkNBTENVTEFURV9NT0RFX09OKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuX3ZpZXcubmV4dChEYXRhZ3JpZERpc3BsYXlNb2RlLkNBTENVTEFURSkpXG4gICAgKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgcmVuZGVyT3JnYW5pemVyXG4gICAgICAgIC5maWx0ZXJSZW5kZXJTdGVwcyhEYXRhZ3JpZFJlbmRlclN0ZXAuQ0FMQ1VMQVRFX01PREVfT0ZGKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuX3ZpZXcubmV4dChEYXRhZ3JpZERpc3BsYXlNb2RlLkRJU1BMQVkpKVxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHZpZXcoKTogT2JzZXJ2YWJsZTxEYXRhZ3JpZERpc3BsYXlNb2RlPiB7XG4gICAgcmV0dXJuIHRoaXMuX3ZpZXcuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaChzdWIgPT4gc3ViLnVuc3Vic2NyaWJlKCkpO1xuICB9XG59XG4iXX0=