/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { IfExpandService } from '../../utils/conditional/if-expanded.service';
import { ClrLoadingState } from '../../utils/loading/loading';
var DatagridIfExpandService = /** @class */ (function (_super) {
    tslib_1.__extends(DatagridIfExpandService, _super);
    function DatagridIfExpandService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._replace = new BehaviorSubject(false);
        _this._animate = new Subject();
        return _this;
    }
    Object.defineProperty(DatagridIfExpandService.prototype, "expanded", {
        // due to the es5 spec if the set is overridden on base class the getter must also be overridden
        get: 
        // due to the es5 spec if the set is overridden on base class the getter must also be overridden
        /**
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
    /**
     * @param {?} state
     * @return {?}
     */
    DatagridIfExpandService.prototype.loadingStateChange = /**
     * @param {?} state
     * @return {?}
     */
    function (state) {
        _super.prototype.loadingStateChange.call(this, state);
        if (state !== ClrLoadingState.LOADING) {
            this._animate.next();
        }
    };
    Object.defineProperty(DatagridIfExpandService.prototype, "replace", {
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
    DatagridIfExpandService.prototype.setReplace = /**
     * @param {?} replaceValue
     * @return {?}
     */
    function (replaceValue) {
        this._replace.next(replaceValue);
    };
    Object.defineProperty(DatagridIfExpandService.prototype, "animate", {
        get: /**
         * @return {?}
         */
        function () {
            return this._animate.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    DatagridIfExpandService.decorators = [
        { type: Injectable }
    ];
    return DatagridIfExpandService;
}(IfExpandService));
export { DatagridIfExpandService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtaWYtZXhwYW5kZWQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvZGF0YWdyaWQtaWYtZXhwYW5kZWQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBTUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsZUFBZSxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUU1RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDOUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRTlEO0lBQzZDLG1EQUFlO0lBRDVEO1FBQUEscUVBb0NDO1FBYlMsY0FBUSxHQUE2QixJQUFJLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQVNoRSxjQUFRLEdBQXFCLElBQUksT0FBTyxFQUFXLENBQUM7O0lBSTlELENBQUM7SUFqQ0Msc0JBQUksNkNBQVE7UUFEWixnR0FBZ0c7Ozs7OztRQUNoRztZQUNFLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUN4QixDQUFDOzs7OztRQUVELFVBQWEsS0FBYztZQUN6QixLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUNoQixJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsU0FBUyxFQUFFO2dCQUM1QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztnQkFDdkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDckIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDaEM7UUFDSCxDQUFDOzs7T0FUQTs7Ozs7SUFXRCxvREFBa0I7Ozs7SUFBbEIsVUFBbUIsS0FBc0I7UUFDdkMsaUJBQU0sa0JBQWtCLFlBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEMsSUFBSSxLQUFLLEtBQUssZUFBZSxDQUFDLE9BQU8sRUFBRTtZQUNyQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3RCO0lBQ0gsQ0FBQztJQUdELHNCQUFJLDRDQUFPOzs7O1FBQVg7WUFDRSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDdEMsQ0FBQzs7O09BQUE7Ozs7O0lBRUQsNENBQVU7Ozs7SUFBVixVQUFXLFlBQXFCO1FBQzlCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFHRCxzQkFBSSw0Q0FBTzs7OztRQUFYO1lBQ0UsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3RDLENBQUM7OztPQUFBOztnQkFuQ0YsVUFBVTs7SUFvQ1gsOEJBQUM7Q0FBQSxBQXBDRCxDQUM2QyxlQUFlLEdBbUMzRDtTQW5DWSx1QkFBdUI7Ozs7OztJQXNCbEMsMkNBQXdFOzs7OztJQVN4RSwyQ0FBNEQiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBJZkV4cGFuZFNlcnZpY2UgfSBmcm9tICcuLi8uLi91dGlscy9jb25kaXRpb25hbC9pZi1leHBhbmRlZC5zZXJ2aWNlJztcbmltcG9ydCB7IENsckxvYWRpbmdTdGF0ZSB9IGZyb20gJy4uLy4uL3V0aWxzL2xvYWRpbmcvbG9hZGluZyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEYXRhZ3JpZElmRXhwYW5kU2VydmljZSBleHRlbmRzIElmRXhwYW5kU2VydmljZSB7XG4gIC8vIGR1ZSB0byB0aGUgZXM1IHNwZWMgaWYgdGhlIHNldCBpcyBvdmVycmlkZGVuIG9uIGJhc2UgY2xhc3MgdGhlIGdldHRlciBtdXN0IGFsc28gYmUgb3ZlcnJpZGRlblxuICBnZXQgZXhwYW5kZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2V4cGFuZGVkO1xuICB9XG5cbiAgc2V0IGV4cGFuZGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdmFsdWUgPSAhIXZhbHVlO1xuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5fZXhwYW5kZWQpIHtcbiAgICAgIHRoaXMuX2V4cGFuZGVkID0gdmFsdWU7XG4gICAgICB0aGlzLl9hbmltYXRlLm5leHQoKTtcbiAgICAgIHRoaXMuX2V4cGFuZENoYW5nZS5uZXh0KHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBsb2FkaW5nU3RhdGVDaGFuZ2Uoc3RhdGU6IENsckxvYWRpbmdTdGF0ZSkge1xuICAgIHN1cGVyLmxvYWRpbmdTdGF0ZUNoYW5nZShzdGF0ZSk7XG4gICAgaWYgKHN0YXRlICE9PSBDbHJMb2FkaW5nU3RhdGUuTE9BRElORykge1xuICAgICAgdGhpcy5fYW5pbWF0ZS5uZXh0KCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfcmVwbGFjZTogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChmYWxzZSk7XG4gIGdldCByZXBsYWNlKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLl9yZXBsYWNlLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgc2V0UmVwbGFjZShyZXBsYWNlVmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9yZXBsYWNlLm5leHQocmVwbGFjZVZhbHVlKTtcbiAgfVxuXG4gIHByaXZhdGUgX2FuaW1hdGU6IFN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuICBnZXQgYW5pbWF0ZSgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5fYW5pbWF0ZS5hc09ic2VydmFibGUoKTtcbiAgfVxufVxuIl19