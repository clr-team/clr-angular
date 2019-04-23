/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ClrLoadingState } from '../loading/loading';
var IfExpandService = /** @class */ (function () {
    function IfExpandService() {
        this.expandable = 0;
        this._loading = false;
        this._expanded = false;
        this._expandChange = new Subject();
    }
    Object.defineProperty(IfExpandService.prototype, "loading", {
        get: /**
         * @return {?}
         */
        function () {
            return this._loading;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            value = !!value;
            if (value !== this._loading) {
                this._loading = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IfExpandService.prototype, "expanded", {
        get: /**
         * @return {?}
         */
        function () {
            return this._expanded;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            value = !!value;
            if (value !== this._expanded) {
                this._expanded = value;
                this._expandChange.next(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    IfExpandService.prototype.toggle = /**
     * @return {?}
     */
    function () {
        this.expanded = !this._expanded;
    };
    Object.defineProperty(IfExpandService.prototype, "expandChange", {
        get: /**
         * @return {?}
         */
        function () {
            return this._expandChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} state
     * @return {?}
     */
    IfExpandService.prototype.loadingStateChange = /**
     * @param {?} state
     * @return {?}
     */
    function (state) {
        switch (state) {
            case ClrLoadingState.LOADING:
                this.loading = true;
                break;
            default:
                this.loading = false;
                break;
        }
    };
    IfExpandService.decorators = [
        { type: Injectable }
    ];
    return IfExpandService;
}());
export { IfExpandService };
if (false) {
    /** @type {?} */
    IfExpandService.prototype.expandable;
    /**
     * @type {?}
     * @protected
     */
    IfExpandService.prototype._loading;
    /**
     * @type {?}
     * @protected
     */
    IfExpandService.prototype._expanded;
    /**
     * @type {?}
     * @protected
     */
    IfExpandService.prototype._expandChange;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWYtZXhwYW5kZWQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbInV0aWxzL2NvbmRpdGlvbmFsL2lmLWV4cGFuZGVkLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRzNDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUVyRDtJQUFBO1FBRVMsZUFBVSxHQUFXLENBQUMsQ0FBQztRQUVwQixhQUFRLEdBQVksS0FBSyxDQUFDO1FBWTFCLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFpQjNCLGtCQUFhLEdBQXFCLElBQUksT0FBTyxFQUFXLENBQUM7SUFlckUsQ0FBQztJQTNDQyxzQkFBSSxvQ0FBTzs7OztRQUFYO1lBQ0UsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3ZCLENBQUM7Ozs7O1FBRUQsVUFBWSxLQUFjO1lBQ3hCLEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQ2hCLElBQUksS0FBSyxLQUFLLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQzNCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO2FBQ3ZCO1FBQ0gsQ0FBQzs7O09BUEE7SUFVRCxzQkFBSSxxQ0FBUTs7OztRQUFaO1lBQ0UsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ3hCLENBQUM7Ozs7O1FBRUQsVUFBYSxLQUFjO1lBQ3pCLEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQ2hCLElBQUksS0FBSyxLQUFLLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQzVCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO2dCQUN2QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNoQztRQUNILENBQUM7OztPQVJBOzs7O0lBVU0sZ0NBQU07OztJQUFiO1FBQ0UsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDbEMsQ0FBQztJQUdELHNCQUFXLHlDQUFZOzs7O1FBQXZCO1lBQ0UsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzNDLENBQUM7OztPQUFBOzs7OztJQUVELDRDQUFrQjs7OztJQUFsQixVQUFtQixLQUFzQjtRQUN2QyxRQUFRLEtBQUssRUFBRTtZQUNiLEtBQUssZUFBZSxDQUFDLE9BQU87Z0JBQzFCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO2dCQUNwQixNQUFNO1lBQ1I7Z0JBQ0UsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7Z0JBQ3JCLE1BQU07U0FDVDtJQUNILENBQUM7O2dCQS9DRixVQUFVOztJQWdEWCxzQkFBQztDQUFBLEFBaERELElBZ0RDO1NBL0NZLGVBQWU7OztJQUMxQixxQ0FBOEI7Ozs7O0lBRTlCLG1DQUFvQzs7Ozs7SUFZcEMsb0NBQXFDOzs7OztJQWlCckMsd0NBQW1FIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBMb2FkaW5nTGlzdGVuZXIgfSBmcm9tICcuLi9sb2FkaW5nL2xvYWRpbmctbGlzdGVuZXInO1xuaW1wb3J0IHsgQ2xyTG9hZGluZ1N0YXRlIH0gZnJvbSAnLi4vbG9hZGluZy9sb2FkaW5nJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIElmRXhwYW5kU2VydmljZSBpbXBsZW1lbnRzIExvYWRpbmdMaXN0ZW5lciB7XG4gIHB1YmxpYyBleHBhbmRhYmxlOiBudW1iZXIgPSAwO1xuXG4gIHByb3RlY3RlZCBfbG9hZGluZzogYm9vbGVhbiA9IGZhbHNlO1xuICBnZXQgbG9hZGluZygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fbG9hZGluZztcbiAgfVxuXG4gIHNldCBsb2FkaW5nKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdmFsdWUgPSAhIXZhbHVlO1xuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5fbG9hZGluZykge1xuICAgICAgdGhpcy5fbG9hZGluZyA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBfZXhwYW5kZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgZ2V0IGV4cGFuZGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9leHBhbmRlZDtcbiAgfVxuXG4gIHNldCBleHBhbmRlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHZhbHVlID0gISF2YWx1ZTtcbiAgICBpZiAodmFsdWUgIT09IHRoaXMuX2V4cGFuZGVkKSB7XG4gICAgICB0aGlzLl9leHBhbmRlZCA9IHZhbHVlO1xuICAgICAgdGhpcy5fZXhwYW5kQ2hhbmdlLm5leHQodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyB0b2dnbGUoKSB7XG4gICAgdGhpcy5leHBhbmRlZCA9ICF0aGlzLl9leHBhbmRlZDtcbiAgfVxuXG4gIHByb3RlY3RlZCBfZXhwYW5kQ2hhbmdlOiBTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcbiAgcHVibGljIGdldCBleHBhbmRDaGFuZ2UoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuX2V4cGFuZENoYW5nZS5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIGxvYWRpbmdTdGF0ZUNoYW5nZShzdGF0ZTogQ2xyTG9hZGluZ1N0YXRlKTogdm9pZCB7XG4gICAgc3dpdGNoIChzdGF0ZSkge1xuICAgICAgY2FzZSBDbHJMb2FkaW5nU3RhdGUuTE9BRElORzpcbiAgICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG59XG4iXX0=