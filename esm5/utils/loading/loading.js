/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive, Input, Optional } from '@angular/core';
import { LoadingListener } from './loading-listener';
/** @enum {number} */
var ClrLoadingState = {
    DEFAULT: 0,
    LOADING: 1,
    SUCCESS: 2,
    ERROR: 3,
};
export { ClrLoadingState };
ClrLoadingState[ClrLoadingState.DEFAULT] = 'DEFAULT';
ClrLoadingState[ClrLoadingState.LOADING] = 'LOADING';
ClrLoadingState[ClrLoadingState.SUCCESS] = 'SUCCESS';
ClrLoadingState[ClrLoadingState.ERROR] = 'ERROR';
var ClrLoading = /** @class */ (function () {
    // We find the first parent that handles something loading
    function ClrLoading(listener) {
        this.listener = listener;
        this._loadingState = ClrLoadingState.DEFAULT;
    }
    Object.defineProperty(ClrLoading.prototype, "loadingState", {
        get: /**
         * @return {?}
         */
        function () {
            return this._loadingState;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value === true) {
                value = ClrLoadingState.LOADING;
            }
            else if (!value) {
                value = ClrLoadingState.DEFAULT;
            }
            if (value === this._loadingState) {
                return;
            }
            this._loadingState = value;
            this.listener.loadingStateChange(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ClrLoading.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.loadingState = ClrLoadingState.DEFAULT;
    };
    ClrLoading.decorators = [
        { type: Directive, args: [{ selector: '[clrLoading]' },] }
    ];
    /** @nocollapse */
    ClrLoading.ctorParameters = function () { return [
        { type: LoadingListener, decorators: [{ type: Optional }] }
    ]; };
    ClrLoading.propDecorators = {
        loadingState: [{ type: Input, args: ['clrLoading',] }]
    };
    return ClrLoading;
}());
export { ClrLoading };
if (false) {
    /** @type {?} */
    ClrLoading.prototype._loadingState;
    /** @type {?} */
    ClrLoading.prototype.listener;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbInV0aWxzL2xvYWRpbmcvbG9hZGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFLQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBYSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFdEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDOzs7SUFHbkQsVUFBTztJQUNQLFVBQU87SUFDUCxVQUFPO0lBQ1AsUUFBSzs7Ozs7OztBQUdQO0lBRUUsMERBQTBEO0lBQzFELG9CQUFnQyxRQUF5QjtRQUF6QixhQUFRLEdBQVIsUUFBUSxDQUFpQjtRQUVqRCxrQkFBYSxHQUFvQixlQUFlLENBQUMsT0FBTyxDQUFDO0lBRkwsQ0FBQztJQUk3RCxzQkFBVyxvQ0FBWTs7OztRQUF2QjtZQUNFLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUM1QixDQUFDOzs7OztRQUVELFVBQ3dCLEtBQWdDO1lBQ3RELElBQUksS0FBSyxLQUFLLElBQUksRUFBRTtnQkFDbEIsS0FBSyxHQUFHLGVBQWUsQ0FBQyxPQUFPLENBQUM7YUFDakM7aUJBQU0sSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDakIsS0FBSyxHQUFHLGVBQWUsQ0FBQyxPQUFPLENBQUM7YUFDakM7WUFFRCxJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsYUFBYSxFQUFFO2dCQUNoQyxPQUFPO2FBQ1I7WUFFRCxJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztZQUMzQixJQUFJLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFDLENBQUM7OztPQWhCQTs7OztJQWtCRCxnQ0FBVzs7O0lBQVg7UUFDRSxJQUFJLENBQUMsWUFBWSxHQUFHLGVBQWUsQ0FBQyxPQUFPLENBQUM7SUFDOUMsQ0FBQzs7Z0JBN0JGLFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUU7Ozs7Z0JBVDlCLGVBQWUsdUJBWVQsUUFBUTs7OytCQVFwQixLQUFLLFNBQUMsWUFBWTs7SUFtQnJCLGlCQUFDO0NBQUEsQUE5QkQsSUE4QkM7U0E3QlksVUFBVTs7O0lBSXJCLG1DQUFpRTs7SUFGckQsOEJBQTZDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgT25EZXN0cm95LCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBMb2FkaW5nTGlzdGVuZXIgfSBmcm9tICcuL2xvYWRpbmctbGlzdGVuZXInO1xuXG5leHBvcnQgZW51bSBDbHJMb2FkaW5nU3RhdGUge1xuICBERUZBVUxULFxuICBMT0FESU5HLFxuICBTVUNDRVNTLFxuICBFUlJPUixcbn1cblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW2NsckxvYWRpbmddJyB9KVxuZXhwb3J0IGNsYXNzIENsckxvYWRpbmcgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICAvLyBXZSBmaW5kIHRoZSBmaXJzdCBwYXJlbnQgdGhhdCBoYW5kbGVzIHNvbWV0aGluZyBsb2FkaW5nXG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIHByaXZhdGUgbGlzdGVuZXI6IExvYWRpbmdMaXN0ZW5lcikge31cblxuICBwcml2YXRlIF9sb2FkaW5nU3RhdGU6IENsckxvYWRpbmdTdGF0ZSA9IENsckxvYWRpbmdTdGF0ZS5ERUZBVUxUO1xuXG4gIHB1YmxpYyBnZXQgbG9hZGluZ1N0YXRlKCkge1xuICAgIHJldHVybiB0aGlzLl9sb2FkaW5nU3RhdGU7XG4gIH1cblxuICBASW5wdXQoJ2NsckxvYWRpbmcnKVxuICBwdWJsaWMgc2V0IGxvYWRpbmdTdGF0ZSh2YWx1ZTogYm9vbGVhbiB8IENsckxvYWRpbmdTdGF0ZSkge1xuICAgIGlmICh2YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgdmFsdWUgPSBDbHJMb2FkaW5nU3RhdGUuTE9BRElORztcbiAgICB9IGVsc2UgaWYgKCF2YWx1ZSkge1xuICAgICAgdmFsdWUgPSBDbHJMb2FkaW5nU3RhdGUuREVGQVVMVDtcbiAgICB9XG5cbiAgICBpZiAodmFsdWUgPT09IHRoaXMuX2xvYWRpbmdTdGF0ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX2xvYWRpbmdTdGF0ZSA9IHZhbHVlO1xuICAgIHRoaXMubGlzdGVuZXIubG9hZGluZ1N0YXRlQ2hhbmdlKHZhbHVlKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMubG9hZGluZ1N0YXRlID0gQ2xyTG9hZGluZ1N0YXRlLkRFRkFVTFQ7XG4gIH1cbn1cbiJdfQ==