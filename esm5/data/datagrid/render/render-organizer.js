/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
        this.widths = [];
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
        return this.renderStep.pipe(filter(function (testStep) { return step === testStep; }));
    };
    /**
     * @return {?}
     */
    DatagridRenderOrganizer.prototype.resize = /**
     * @return {?}
     */
    function () {
        this.widths.length = 0;
        this._renderStep.next(DatagridRenderStep.CALCULATE_MODE_ON);
        if (this.alreadySized) {
            this._renderStep.next(DatagridRenderStep.CLEAR_WIDTHS);
        }
        this._renderStep.next(DatagridRenderStep.DETECT_STRICT_WIDTHS);
        this._renderStep.next(DatagridRenderStep.COMPUTE_COLUMN_WIDTHS);
        this._renderStep.next(DatagridRenderStep.ALIGN_COLUMNS);
        this.alreadySized = true;
        this._renderStep.next(DatagridRenderStep.CALCULATE_MODE_OFF);
        this._renderStep.next(DatagridRenderStep.UPDATE_ROW_WIDTH);
    };
    DatagridRenderOrganizer.decorators = [
        { type: Injectable }
    ];
    return DatagridRenderOrganizer;
}());
export { DatagridRenderOrganizer };
if (false) {
    /** @type {?} */
    DatagridRenderOrganizer.prototype._renderStep;
    /** @type {?} */
    DatagridRenderOrganizer.prototype.alreadySized;
    /** @type {?} */
    DatagridRenderOrganizer.prototype.widths;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyLW9yZ2FuaXplci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvcmVuZGVyL3JlbmRlci1vcmdhbml6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBTUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUUvRDtJQUFBO1FBRVksZ0JBQVcsR0FBZ0MsSUFBSSxPQUFPLEVBQXNCLENBQUM7UUFTL0UsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFFdEIsV0FBTSxHQUFzQyxFQUFFLENBQUM7SUFleEQsQ0FBQztJQXpCQyxzQkFBVywrQ0FBVTs7OztRQUFyQjtZQUNFLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN6QyxDQUFDOzs7T0FBQTs7Ozs7SUFFTSxtREFBaUI7Ozs7SUFBeEIsVUFBeUIsSUFBd0I7UUFDL0MsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBQSxRQUFRLElBQUksT0FBQSxJQUFJLEtBQUssUUFBUSxFQUFqQixDQUFpQixDQUFDLENBQUMsQ0FBQztJQUNyRSxDQUFDOzs7O0lBTU0sd0NBQU07OztJQUFiO1FBQ0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDNUQsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3hEO1FBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUMvRCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ2hFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3hELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUM3RCxDQUFDOztnQkEzQkYsVUFBVTs7SUE0QlgsOEJBQUM7Q0FBQSxBQTVCRCxJQTRCQztTQTNCWSx1QkFBdUI7OztJQUNsQyw4Q0FBdUY7O0lBU3ZGLCtDQUE2Qjs7SUFFN0IseUNBQXNEIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IERhdGFncmlkUmVuZGVyU3RlcCB9IGZyb20gJy4uL2VudW1zL3JlbmRlci1zdGVwLmVudW0nO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGF0YWdyaWRSZW5kZXJPcmdhbml6ZXIge1xuICBwcm90ZWN0ZWQgX3JlbmRlclN0ZXA6IFN1YmplY3Q8RGF0YWdyaWRSZW5kZXJTdGVwPiA9IG5ldyBTdWJqZWN0PERhdGFncmlkUmVuZGVyU3RlcD4oKTtcbiAgcHVibGljIGdldCByZW5kZXJTdGVwKCk6IE9ic2VydmFibGU8RGF0YWdyaWRSZW5kZXJTdGVwPiB7XG4gICAgcmV0dXJuIHRoaXMuX3JlbmRlclN0ZXAuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBwdWJsaWMgZmlsdGVyUmVuZGVyU3RlcHMoc3RlcDogRGF0YWdyaWRSZW5kZXJTdGVwKSB7XG4gICAgcmV0dXJuIHRoaXMucmVuZGVyU3RlcC5waXBlKGZpbHRlcih0ZXN0U3RlcCA9PiBzdGVwID09PSB0ZXN0U3RlcCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBhbHJlYWR5U2l6ZWQgPSBmYWxzZTtcblxuICBwdWJsaWMgd2lkdGhzOiB7IHB4OiBudW1iZXI7IHN0cmljdDogYm9vbGVhbiB9W10gPSBbXTtcblxuICBwdWJsaWMgcmVzaXplKCkge1xuICAgIHRoaXMud2lkdGhzLmxlbmd0aCA9IDA7XG4gICAgdGhpcy5fcmVuZGVyU3RlcC5uZXh0KERhdGFncmlkUmVuZGVyU3RlcC5DQUxDVUxBVEVfTU9ERV9PTik7XG4gICAgaWYgKHRoaXMuYWxyZWFkeVNpemVkKSB7XG4gICAgICB0aGlzLl9yZW5kZXJTdGVwLm5leHQoRGF0YWdyaWRSZW5kZXJTdGVwLkNMRUFSX1dJRFRIUyk7XG4gICAgfVxuICAgIHRoaXMuX3JlbmRlclN0ZXAubmV4dChEYXRhZ3JpZFJlbmRlclN0ZXAuREVURUNUX1NUUklDVF9XSURUSFMpO1xuICAgIHRoaXMuX3JlbmRlclN0ZXAubmV4dChEYXRhZ3JpZFJlbmRlclN0ZXAuQ09NUFVURV9DT0xVTU5fV0lEVEhTKTtcbiAgICB0aGlzLl9yZW5kZXJTdGVwLm5leHQoRGF0YWdyaWRSZW5kZXJTdGVwLkFMSUdOX0NPTFVNTlMpO1xuICAgIHRoaXMuYWxyZWFkeVNpemVkID0gdHJ1ZTtcbiAgICB0aGlzLl9yZW5kZXJTdGVwLm5leHQoRGF0YWdyaWRSZW5kZXJTdGVwLkNBTENVTEFURV9NT0RFX09GRik7XG4gICAgdGhpcy5fcmVuZGVyU3RlcC5uZXh0KERhdGFncmlkUmVuZGVyU3RlcC5VUERBVEVfUk9XX1dJRFRIKTtcbiAgfVxufVxuIl19