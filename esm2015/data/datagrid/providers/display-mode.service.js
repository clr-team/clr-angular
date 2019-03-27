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
export class DisplayModeService {
    /**
     * @param {?} renderOrganizer
     */
    constructor(renderOrganizer) {
        this.subscriptions = [];
        this._view = new BehaviorSubject(DatagridDisplayMode.DISPLAY);
        this.subscriptions.push(renderOrganizer
            .filterRenderSteps(DatagridRenderStep.CALCULATE_MODE_ON)
            .subscribe((/**
         * @return {?}
         */
        () => this._view.next(DatagridDisplayMode.CALCULATE))));
        this.subscriptions.push(renderOrganizer
            .filterRenderSteps(DatagridRenderStep.CALCULATE_MODE_OFF)
            .subscribe((/**
         * @return {?}
         */
        () => this._view.next(DatagridDisplayMode.DISPLAY))));
    }
    /**
     * @return {?}
     */
    get view() {
        return this._view.asObservable();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        sub => sub.unsubscribe()));
    }
}
DisplayModeService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
DisplayModeService.ctorParameters = () => [
    { type: DatagridRenderOrganizer }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzcGxheS1tb2RlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJkYXRhL2RhdGFncmlkL3Byb3ZpZGVycy9kaXNwbGF5LW1vZGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFNQSxPQUFPLEVBQUUsVUFBVSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3RELE9BQU8sRUFBYyxlQUFlLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBRWpFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQy9ELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBR3JFLE1BQU0sT0FBTyxrQkFBa0I7Ozs7SUFNN0IsWUFBWSxlQUF3QztRQUw1QyxrQkFBYSxHQUFtQixFQUFFLENBQUM7UUFDakMsVUFBSyxHQUF5QyxJQUFJLGVBQWUsQ0FDekUsbUJBQW1CLENBQUMsT0FBTyxDQUM1QixDQUFDO1FBR0EsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQ3JCLGVBQWU7YUFDWixpQkFBaUIsQ0FBQyxrQkFBa0IsQ0FBQyxpQkFBaUIsQ0FBQzthQUN2RCxTQUFTOzs7UUFBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsRUFBQyxDQUNuRSxDQUFDO1FBRUYsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQ3JCLGVBQWU7YUFDWixpQkFBaUIsQ0FBQyxrQkFBa0IsQ0FBQyxrQkFBa0IsQ0FBQzthQUN4RCxTQUFTOzs7UUFBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsRUFBQyxDQUNqRSxDQUFDO0lBQ0osQ0FBQzs7OztJQUVELElBQVcsSUFBSTtRQUNiLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUNuQyxDQUFDOzs7O0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTzs7OztRQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxFQUFDLENBQUM7SUFDdkQsQ0FBQzs7O1lBM0JGLFVBQVU7Ozs7WUFGRix1QkFBdUI7Ozs7Ozs7SUFJOUIsMkNBQTJDOzs7OztJQUMzQyxtQ0FFRSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBCZWhhdmlvclN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBEYXRhZ3JpZERpc3BsYXlNb2RlIH0gZnJvbSAnLi4vZW51bXMvZGlzcGxheS1tb2RlLmVudW0nO1xuaW1wb3J0IHsgRGF0YWdyaWRSZW5kZXJTdGVwIH0gZnJvbSAnLi4vZW51bXMvcmVuZGVyLXN0ZXAuZW51bSc7XG5pbXBvcnQgeyBEYXRhZ3JpZFJlbmRlck9yZ2FuaXplciB9IGZyb20gJy4uL3JlbmRlci9yZW5kZXItb3JnYW5pemVyJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERpc3BsYXlNb2RlU2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcbiAgcHJvdGVjdGVkIF92aWV3OiBCZWhhdmlvclN1YmplY3Q8RGF0YWdyaWREaXNwbGF5TW9kZT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PERhdGFncmlkRGlzcGxheU1vZGU+KFxuICAgIERhdGFncmlkRGlzcGxheU1vZGUuRElTUExBWVxuICApO1xuXG4gIGNvbnN0cnVjdG9yKHJlbmRlck9yZ2FuaXplcjogRGF0YWdyaWRSZW5kZXJPcmdhbml6ZXIpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHJlbmRlck9yZ2FuaXplclxuICAgICAgICAuZmlsdGVyUmVuZGVyU3RlcHMoRGF0YWdyaWRSZW5kZXJTdGVwLkNBTENVTEFURV9NT0RFX09OKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuX3ZpZXcubmV4dChEYXRhZ3JpZERpc3BsYXlNb2RlLkNBTENVTEFURSkpXG4gICAgKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgcmVuZGVyT3JnYW5pemVyXG4gICAgICAgIC5maWx0ZXJSZW5kZXJTdGVwcyhEYXRhZ3JpZFJlbmRlclN0ZXAuQ0FMQ1VMQVRFX01PREVfT0ZGKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuX3ZpZXcubmV4dChEYXRhZ3JpZERpc3BsYXlNb2RlLkRJU1BMQVkpKVxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHZpZXcoKTogT2JzZXJ2YWJsZTxEYXRhZ3JpZERpc3BsYXlNb2RlPiB7XG4gICAgcmV0dXJuIHRoaXMuX3ZpZXcuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaChzdWIgPT4gc3ViLnVuc3Vic2NyaWJlKCkpO1xuICB9XG59XG4iXX0=