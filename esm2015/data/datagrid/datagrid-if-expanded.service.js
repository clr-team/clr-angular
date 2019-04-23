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
import { BehaviorSubject, Subject } from 'rxjs';
import { IfExpandService } from '../../utils/conditional/if-expanded.service';
import { ClrLoadingState } from '../../utils/loading/loading';
export class DatagridIfExpandService extends IfExpandService {
    constructor() {
        super(...arguments);
        this._replace = new BehaviorSubject(false);
        this._animate = new Subject();
    }
    // due to the es5 spec if the set is overridden on base class the getter must also be overridden
    /**
     * @return {?}
     */
    get expanded() {
        return this._expanded;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set expanded(value) {
        value = !!value;
        if (value !== this._expanded) {
            this._expanded = value;
            this._animate.next();
            this._expandChange.next(value);
        }
    }
    /**
     * @param {?} state
     * @return {?}
     */
    loadingStateChange(state) {
        super.loadingStateChange(state);
        if (state !== ClrLoadingState.LOADING) {
            this._animate.next();
        }
    }
    /**
     * @return {?}
     */
    get replace() {
        return this._replace.asObservable();
    }
    /**
     * @param {?} replaceValue
     * @return {?}
     */
    setReplace(replaceValue) {
        this._replace.next(replaceValue);
    }
    /**
     * @return {?}
     */
    get animate() {
        return this._animate.asObservable();
    }
}
DatagridIfExpandService.decorators = [
    { type: Injectable }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    DatagridIfExpandService.prototype._replace;
    /**
     * @type {?}
     * @private
     */
    DatagridIfExpandService.prototype._animate;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtaWYtZXhwYW5kZWQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvZGF0YWdyaWQtaWYtZXhwYW5kZWQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFNQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxlQUFlLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRTVELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUM5RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFHOUQsTUFBTSxPQUFPLHVCQUF3QixTQUFRLGVBQWU7SUFENUQ7O1FBdUJVLGFBQVEsR0FBNkIsSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7UUFTaEUsYUFBUSxHQUFxQixJQUFJLE9BQU8sRUFBVyxDQUFDO0lBSTlELENBQUM7Ozs7O0lBakNDLElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDOzs7OztJQUVELElBQUksUUFBUSxDQUFDLEtBQWM7UUFDekIsS0FBSyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDaEIsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUM1QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztZQUN2QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2hDO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxrQkFBa0IsQ0FBQyxLQUFzQjtRQUN2QyxLQUFLLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEMsSUFBSSxLQUFLLEtBQUssZUFBZSxDQUFDLE9BQU8sRUFBRTtZQUNyQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3RCO0lBQ0gsQ0FBQzs7OztJQUdELElBQUksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN0QyxDQUFDOzs7OztJQUVELFVBQVUsQ0FBQyxZQUFxQjtRQUM5QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNuQyxDQUFDOzs7O0lBR0QsSUFBSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3RDLENBQUM7OztZQW5DRixVQUFVOzs7Ozs7O0lBdUJULDJDQUF3RTs7Ozs7SUFTeEUsMkNBQTREIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgSWZFeHBhbmRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vdXRpbHMvY29uZGl0aW9uYWwvaWYtZXhwYW5kZWQuc2VydmljZSc7XG5pbXBvcnQgeyBDbHJMb2FkaW5nU3RhdGUgfSBmcm9tICcuLi8uLi91dGlscy9sb2FkaW5nL2xvYWRpbmcnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGF0YWdyaWRJZkV4cGFuZFNlcnZpY2UgZXh0ZW5kcyBJZkV4cGFuZFNlcnZpY2Uge1xuICAvLyBkdWUgdG8gdGhlIGVzNSBzcGVjIGlmIHRoZSBzZXQgaXMgb3ZlcnJpZGRlbiBvbiBiYXNlIGNsYXNzIHRoZSBnZXR0ZXIgbXVzdCBhbHNvIGJlIG92ZXJyaWRkZW5cbiAgZ2V0IGV4cGFuZGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9leHBhbmRlZDtcbiAgfVxuXG4gIHNldCBleHBhbmRlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHZhbHVlID0gISF2YWx1ZTtcbiAgICBpZiAodmFsdWUgIT09IHRoaXMuX2V4cGFuZGVkKSB7XG4gICAgICB0aGlzLl9leHBhbmRlZCA9IHZhbHVlO1xuICAgICAgdGhpcy5fYW5pbWF0ZS5uZXh0KCk7XG4gICAgICB0aGlzLl9leHBhbmRDaGFuZ2UubmV4dCh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgbG9hZGluZ1N0YXRlQ2hhbmdlKHN0YXRlOiBDbHJMb2FkaW5nU3RhdGUpIHtcbiAgICBzdXBlci5sb2FkaW5nU3RhdGVDaGFuZ2Uoc3RhdGUpO1xuICAgIGlmIChzdGF0ZSAhPT0gQ2xyTG9hZGluZ1N0YXRlLkxPQURJTkcpIHtcbiAgICAgIHRoaXMuX2FuaW1hdGUubmV4dCgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3JlcGxhY2U6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3QoZmFsc2UpO1xuICBnZXQgcmVwbGFjZSgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5fcmVwbGFjZS5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIHNldFJlcGxhY2UocmVwbGFjZVZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fcmVwbGFjZS5uZXh0KHJlcGxhY2VWYWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIF9hbmltYXRlOiBTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcbiAgZ2V0IGFuaW1hdGUoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuX2FuaW1hdGUuYXNPYnNlcnZhYmxlKCk7XG4gIH1cbn1cbiJdfQ==