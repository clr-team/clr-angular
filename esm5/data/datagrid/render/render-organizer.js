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
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { DatagridRenderStep } from '../enums/render-step.enum';
var DatagridRenderOrganizer = /** @class */ (function () {
    function DatagridRenderOrganizer() {
        this._renderStep = new Subject();
        this.alreadySized = false;
    }
    Object.defineProperty(DatagridRenderOrganizer.prototype, "renderStep", {
        get: /**
         * @return {?}
         */
        function () {
            return this._renderStep.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} step
     * @return {?}
     */
    DatagridRenderOrganizer.prototype.filterRenderSteps = /**
     * @param {?} step
     * @return {?}
     */
    function (step) {
        return this.renderStep.pipe(filter((/**
         * @param {?} testStep
         * @return {?}
         */
        function (testStep) { return step === testStep; })));
    };
    /**
     * @return {?}
     */
    DatagridRenderOrganizer.prototype.resize = /**
     * @return {?}
     */
    function () {
        this._renderStep.next(DatagridRenderStep.CALCULATE_MODE_ON);
        if (this.alreadySized) {
            this._renderStep.next(DatagridRenderStep.CLEAR_WIDTHS);
        }
        this._renderStep.next(DatagridRenderStep.COMPUTE_COLUMN_WIDTHS);
        this._renderStep.next(DatagridRenderStep.ALIGN_COLUMNS);
        this.alreadySized = true;
        this._renderStep.next(DatagridRenderStep.CALCULATE_MODE_OFF);
    };
    DatagridRenderOrganizer.decorators = [
        { type: Injectable }
    ];
    return DatagridRenderOrganizer;
}());
export { DatagridRenderOrganizer };
if (false) {
    /**
     * @type {?}
     * @protected
     */
    DatagridRenderOrganizer.prototype._renderStep;
    /**
     * @type {?}
     * @private
     */
    DatagridRenderOrganizer.prototype.alreadySized;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyLW9yZ2FuaXplci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvcmVuZGVyL3JlbmRlci1vcmdhbml6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBTUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUUvRDtJQUFBO1FBRVksZ0JBQVcsR0FBZ0MsSUFBSSxPQUFPLEVBQXNCLENBQUM7UUFTL0UsaUJBQVksR0FBRyxLQUFLLENBQUM7SUFZL0IsQ0FBQztJQXBCQyxzQkFBVywrQ0FBVTs7OztRQUFyQjtZQUNFLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN6QyxDQUFDOzs7T0FBQTs7Ozs7SUFFTSxtREFBaUI7Ozs7SUFBeEIsVUFBeUIsSUFBd0I7UUFDL0MsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNOzs7O1FBQUMsVUFBQSxRQUFRLElBQUksT0FBQSxJQUFJLEtBQUssUUFBUSxFQUFqQixDQUFpQixFQUFDLENBQUMsQ0FBQztJQUNyRSxDQUFDOzs7O0lBSU0sd0NBQU07OztJQUFiO1FBQ0UsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUM1RCxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDckIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDeEQ7UUFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ2hFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3hELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDL0QsQ0FBQzs7Z0JBdEJGLFVBQVU7O0lBdUJYLDhCQUFDO0NBQUEsQUF2QkQsSUF1QkM7U0F0QlksdUJBQXVCOzs7Ozs7SUFDbEMsOENBQXVGOzs7OztJQVN2RiwrQ0FBNkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgRGF0YWdyaWRSZW5kZXJTdGVwIH0gZnJvbSAnLi4vZW51bXMvcmVuZGVyLXN0ZXAuZW51bSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEYXRhZ3JpZFJlbmRlck9yZ2FuaXplciB7XG4gIHByb3RlY3RlZCBfcmVuZGVyU3RlcDogU3ViamVjdDxEYXRhZ3JpZFJlbmRlclN0ZXA+ID0gbmV3IFN1YmplY3Q8RGF0YWdyaWRSZW5kZXJTdGVwPigpO1xuICBwdWJsaWMgZ2V0IHJlbmRlclN0ZXAoKTogT2JzZXJ2YWJsZTxEYXRhZ3JpZFJlbmRlclN0ZXA+IHtcbiAgICByZXR1cm4gdGhpcy5fcmVuZGVyU3RlcC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIHB1YmxpYyBmaWx0ZXJSZW5kZXJTdGVwcyhzdGVwOiBEYXRhZ3JpZFJlbmRlclN0ZXApIHtcbiAgICByZXR1cm4gdGhpcy5yZW5kZXJTdGVwLnBpcGUoZmlsdGVyKHRlc3RTdGVwID0+IHN0ZXAgPT09IHRlc3RTdGVwKSk7XG4gIH1cblxuICBwcml2YXRlIGFscmVhZHlTaXplZCA9IGZhbHNlO1xuXG4gIHB1YmxpYyByZXNpemUoKSB7XG4gICAgdGhpcy5fcmVuZGVyU3RlcC5uZXh0KERhdGFncmlkUmVuZGVyU3RlcC5DQUxDVUxBVEVfTU9ERV9PTik7XG4gICAgaWYgKHRoaXMuYWxyZWFkeVNpemVkKSB7XG4gICAgICB0aGlzLl9yZW5kZXJTdGVwLm5leHQoRGF0YWdyaWRSZW5kZXJTdGVwLkNMRUFSX1dJRFRIUyk7XG4gICAgfVxuICAgIHRoaXMuX3JlbmRlclN0ZXAubmV4dChEYXRhZ3JpZFJlbmRlclN0ZXAuQ09NUFVURV9DT0xVTU5fV0lEVEhTKTtcbiAgICB0aGlzLl9yZW5kZXJTdGVwLm5leHQoRGF0YWdyaWRSZW5kZXJTdGVwLkFMSUdOX0NPTFVNTlMpO1xuICAgIHRoaXMuYWxyZWFkeVNpemVkID0gdHJ1ZTtcbiAgICB0aGlzLl9yZW5kZXJTdGVwLm5leHQoRGF0YWdyaWRSZW5kZXJTdGVwLkNBTENVTEFURV9NT0RFX09GRik7XG4gIH1cbn1cbiJdfQ==