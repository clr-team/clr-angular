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
export class DatagridRenderOrganizer {
    constructor() {
        this._renderStep = new Subject();
        this.alreadySized = false;
    }
    /**
     * @return {?}
     */
    get renderStep() {
        return this._renderStep.asObservable();
    }
    /**
     * @param {?} step
     * @return {?}
     */
    filterRenderSteps(step) {
        return this.renderStep.pipe(filter((/**
         * @param {?} testStep
         * @return {?}
         */
        testStep => step === testStep)));
    }
    /**
     * @return {?}
     */
    resize() {
        this._renderStep.next(DatagridRenderStep.CALCULATE_MODE_ON);
        if (this.alreadySized) {
            this._renderStep.next(DatagridRenderStep.CLEAR_WIDTHS);
        }
        this._renderStep.next(DatagridRenderStep.DETECT_STRICT_WIDTHS);
        this._renderStep.next(DatagridRenderStep.COMPUTE_COLUMN_WIDTHS);
        this._renderStep.next(DatagridRenderStep.ALIGN_COLUMNS);
        this.alreadySized = true;
        this._renderStep.next(DatagridRenderStep.CALCULATE_MODE_OFF);
    }
}
DatagridRenderOrganizer.decorators = [
    { type: Injectable }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyLW9yZ2FuaXplci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvcmVuZGVyL3JlbmRlci1vcmdhbml6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBTUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUcvRCxNQUFNLE9BQU8sdUJBQXVCO0lBRHBDO1FBRVksZ0JBQVcsR0FBZ0MsSUFBSSxPQUFPLEVBQXNCLENBQUM7UUFTL0UsaUJBQVksR0FBRyxLQUFLLENBQUM7SUFhL0IsQ0FBQzs7OztJQXJCQyxJQUFXLFVBQVU7UUFDbkIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3pDLENBQUM7Ozs7O0lBRU0saUJBQWlCLENBQUMsSUFBd0I7UUFDL0MsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNOzs7O1FBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFDLENBQUMsQ0FBQztJQUNyRSxDQUFDOzs7O0lBSU0sTUFBTTtRQUNYLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDNUQsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3hEO1FBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUMvRCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ2hFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3hELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDL0QsQ0FBQzs7O1lBdkJGLFVBQVU7Ozs7Ozs7SUFFVCw4Q0FBdUY7Ozs7O0lBU3ZGLCtDQUE2QiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBEYXRhZ3JpZFJlbmRlclN0ZXAgfSBmcm9tICcuLi9lbnVtcy9yZW5kZXItc3RlcC5lbnVtJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERhdGFncmlkUmVuZGVyT3JnYW5pemVyIHtcbiAgcHJvdGVjdGVkIF9yZW5kZXJTdGVwOiBTdWJqZWN0PERhdGFncmlkUmVuZGVyU3RlcD4gPSBuZXcgU3ViamVjdDxEYXRhZ3JpZFJlbmRlclN0ZXA+KCk7XG4gIHB1YmxpYyBnZXQgcmVuZGVyU3RlcCgpOiBPYnNlcnZhYmxlPERhdGFncmlkUmVuZGVyU3RlcD4ge1xuICAgIHJldHVybiB0aGlzLl9yZW5kZXJTdGVwLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgcHVibGljIGZpbHRlclJlbmRlclN0ZXBzKHN0ZXA6IERhdGFncmlkUmVuZGVyU3RlcCkge1xuICAgIHJldHVybiB0aGlzLnJlbmRlclN0ZXAucGlwZShmaWx0ZXIodGVzdFN0ZXAgPT4gc3RlcCA9PT0gdGVzdFN0ZXApKTtcbiAgfVxuXG4gIHByaXZhdGUgYWxyZWFkeVNpemVkID0gZmFsc2U7XG5cbiAgcHVibGljIHJlc2l6ZSgpIHtcbiAgICB0aGlzLl9yZW5kZXJTdGVwLm5leHQoRGF0YWdyaWRSZW5kZXJTdGVwLkNBTENVTEFURV9NT0RFX09OKTtcbiAgICBpZiAodGhpcy5hbHJlYWR5U2l6ZWQpIHtcbiAgICAgIHRoaXMuX3JlbmRlclN0ZXAubmV4dChEYXRhZ3JpZFJlbmRlclN0ZXAuQ0xFQVJfV0lEVEhTKTtcbiAgICB9XG4gICAgdGhpcy5fcmVuZGVyU3RlcC5uZXh0KERhdGFncmlkUmVuZGVyU3RlcC5ERVRFQ1RfU1RSSUNUX1dJRFRIUyk7XG4gICAgdGhpcy5fcmVuZGVyU3RlcC5uZXh0KERhdGFncmlkUmVuZGVyU3RlcC5DT01QVVRFX0NPTFVNTl9XSURUSFMpO1xuICAgIHRoaXMuX3JlbmRlclN0ZXAubmV4dChEYXRhZ3JpZFJlbmRlclN0ZXAuQUxJR05fQ09MVU1OUyk7XG4gICAgdGhpcy5hbHJlYWR5U2l6ZWQgPSB0cnVlO1xuICAgIHRoaXMuX3JlbmRlclN0ZXAubmV4dChEYXRhZ3JpZFJlbmRlclN0ZXAuQ0FMQ1VMQVRFX01PREVfT0ZGKTtcbiAgfVxufVxuIl19