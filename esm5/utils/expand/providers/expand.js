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
import { BehaviorSubject, Subject } from 'rxjs';
import { ClrLoadingState } from '../../loading/loading';
var Expand = /** @class */ (function () {
    function Expand() {
        this.expandable = 0;
        // private _replace: boolean = false;
        this._replace = new BehaviorSubject(false);
        this._loading = false;
        this._expanded = false;
        // TODO: Move this to the datagrid RowExpand.
        // I spent some time doing this but ran into a couple of issues
        // Will take care of this later.
        this._animate = new Subject();
        this._expandChange = new Subject();
    }
    Object.defineProperty(Expand.prototype, "replace", {
        get: /**
         * @return {?}
         */
        function () {
            return this._replace.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} replaceValue
     * @return {?}
     */
    Expand.prototype.setReplace = /**
     * @param {?} replaceValue
     * @return {?}
     */
    function (replaceValue) {
        this._replace.next(replaceValue);
    };
    Object.defineProperty(Expand.prototype, "loading", {
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
    Object.defineProperty(Expand.prototype, "expanded", {
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
                this._animate.next();
                this._expandChange.next(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Expand.prototype, "animate", {
        get: /**
         * @return {?}
         */
        function () {
            return this._animate.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Expand.prototype, "expandChange", {
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
    Expand.prototype.loadingStateChange = /**
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
                this._animate.next();
                break;
        }
    };
    Expand.decorators = [
        { type: Injectable }
    ];
    return Expand;
}());
export { Expand };
if (false) {
    /** @type {?} */
    Expand.prototype.expandable;
    /** @type {?} */
    Expand.prototype._replace;
    /** @type {?} */
    Expand.prototype._loading;
    /** @type {?} */
    Expand.prototype._expanded;
    /** @type {?} */
    Expand.prototype._animate;
    /** @type {?} */
    Expand.prototype._expandChange;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwYW5kLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsidXRpbHMvZXhwYW5kL3Byb3ZpZGVycy9leHBhbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsZUFBZSxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUc1RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFeEQ7SUFBQTtRQUVTLGVBQVUsR0FBVyxDQUFDLENBQUM7O1FBR3RCLGFBQVEsR0FBNkIsSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7UUFRaEUsYUFBUSxHQUFZLEtBQUssQ0FBQztRQVkxQixjQUFTLEdBQVksS0FBSyxDQUFDOzs7O1FBaUIzQixhQUFRLEdBQXFCLElBQUksT0FBTyxFQUFXLENBQUM7UUFLcEQsa0JBQWEsR0FBcUIsSUFBSSxPQUFPLEVBQVcsQ0FBQztJQWdCbkUsQ0FBQztJQXpEQyxzQkFBVywyQkFBTzs7OztRQUFsQjtZQUNFLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN0QyxDQUFDOzs7T0FBQTs7Ozs7SUFDRCwyQkFBVTs7OztJQUFWLFVBQVcsWUFBcUI7UUFDOUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUdELHNCQUFJLDJCQUFPOzs7O1FBQVg7WUFDRSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDdkIsQ0FBQzs7Ozs7UUFFRCxVQUFZLEtBQWM7WUFDeEIsS0FBSyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDaEIsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDM0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7YUFDdkI7UUFDSCxDQUFDOzs7T0FQQTtJQVVELHNCQUFJLDRCQUFROzs7O1FBQVo7WUFDRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDeEIsQ0FBQzs7Ozs7UUFFRCxVQUFhLEtBQWM7WUFDekIsS0FBSyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDaEIsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLFNBQVMsRUFBRTtnQkFDNUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ2hDO1FBQ0gsQ0FBQzs7O09BVEE7SUFlRCxzQkFBVywyQkFBTzs7OztRQUFsQjtZQUNFLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN0QyxDQUFDOzs7T0FBQTtJQUdELHNCQUFXLGdDQUFZOzs7O1FBQXZCO1lBQ0UsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzNDLENBQUM7OztPQUFBOzs7OztJQUVELG1DQUFrQjs7OztJQUFsQixVQUFtQixLQUFzQjtRQUN2QyxRQUFRLEtBQUssRUFBRTtZQUNiLEtBQUssZUFBZSxDQUFDLE9BQU87Z0JBQzFCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO2dCQUNwQixNQUFNO1lBQ1I7Z0JBQ0UsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ3JCLE1BQU07U0FDVDtJQUNILENBQUM7O2dCQTlERixVQUFVOztJQStEWCxhQUFDO0NBQUEsQUEvREQsSUErREM7U0E5RFksTUFBTTs7O0lBQ2pCLDRCQUE4Qjs7SUFHOUIsMEJBQXdFOztJQVF4RSwwQkFBa0M7O0lBWWxDLDJCQUFtQzs7SUFpQm5DLDBCQUE0RDs7SUFLNUQsK0JBQWlFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IExvYWRpbmdMaXN0ZW5lciB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2xvYWRpbmcvbG9hZGluZy1saXN0ZW5lcic7XG5pbXBvcnQgeyBDbHJMb2FkaW5nU3RhdGUgfSBmcm9tICcuLi8uLi9sb2FkaW5nL2xvYWRpbmcnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRXhwYW5kIGltcGxlbWVudHMgTG9hZGluZ0xpc3RlbmVyIHtcbiAgcHVibGljIGV4cGFuZGFibGU6IG51bWJlciA9IDA7XG5cbiAgLy8gcHJpdmF0ZSBfcmVwbGFjZTogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIF9yZXBsYWNlOiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KGZhbHNlKTtcbiAgcHVibGljIGdldCByZXBsYWNlKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLl9yZXBsYWNlLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG4gIHNldFJlcGxhY2UocmVwbGFjZVZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fcmVwbGFjZS5uZXh0KHJlcGxhY2VWYWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIF9sb2FkaW5nOiBib29sZWFuID0gZmFsc2U7XG4gIGdldCBsb2FkaW5nKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9sb2FkaW5nO1xuICB9XG5cbiAgc2V0IGxvYWRpbmcodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB2YWx1ZSA9ICEhdmFsdWU7XG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLl9sb2FkaW5nKSB7XG4gICAgICB0aGlzLl9sb2FkaW5nID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfZXhwYW5kZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgZ2V0IGV4cGFuZGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9leHBhbmRlZDtcbiAgfVxuXG4gIHNldCBleHBhbmRlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHZhbHVlID0gISF2YWx1ZTtcbiAgICBpZiAodmFsdWUgIT09IHRoaXMuX2V4cGFuZGVkKSB7XG4gICAgICB0aGlzLl9leHBhbmRlZCA9IHZhbHVlO1xuICAgICAgdGhpcy5fYW5pbWF0ZS5uZXh0KCk7XG4gICAgICB0aGlzLl9leHBhbmRDaGFuZ2UubmV4dCh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgLy8gVE9ETzogTW92ZSB0aGlzIHRvIHRoZSBkYXRhZ3JpZCBSb3dFeHBhbmQuXG4gIC8vIEkgc3BlbnQgc29tZSB0aW1lIGRvaW5nIHRoaXMgYnV0IHJhbiBpbnRvIGEgY291cGxlIG9mIGlzc3Vlc1xuICAvLyBXaWxsIHRha2UgY2FyZSBvZiB0aGlzIGxhdGVyLlxuICBwcml2YXRlIF9hbmltYXRlOiBTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcbiAgcHVibGljIGdldCBhbmltYXRlKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLl9hbmltYXRlLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZXhwYW5kQ2hhbmdlOiBTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcbiAgcHVibGljIGdldCBleHBhbmRDaGFuZ2UoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuX2V4cGFuZENoYW5nZS5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIGxvYWRpbmdTdGF0ZUNoYW5nZShzdGF0ZTogQ2xyTG9hZGluZ1N0YXRlKTogdm9pZCB7XG4gICAgc3dpdGNoIChzdGF0ZSkge1xuICAgICAgY2FzZSBDbHJMb2FkaW5nU3RhdGUuTE9BRElORzpcbiAgICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fYW5pbWF0ZS5uZXh0KCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxufVxuIl19