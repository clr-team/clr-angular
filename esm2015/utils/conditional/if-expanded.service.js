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
export class IfExpandService {
    constructor() {
        this.expandable = 0;
        this._loading = false;
        this._expanded = false;
        this._expandChange = new Subject();
    }
    /**
     * @return {?}
     */
    get loading() {
        return this._loading;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set loading(value) {
        value = !!value;
        if (value !== this._loading) {
            this._loading = value;
        }
    }
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
            this._expandChange.next(value);
        }
    }
    /**
     * @return {?}
     */
    toggle() {
        this.expanded = !this._expanded;
    }
    /**
     * @return {?}
     */
    get expandChange() {
        return this._expandChange.asObservable();
    }
    /**
     * @param {?} state
     * @return {?}
     */
    loadingStateChange(state) {
        switch (state) {
            case ClrLoadingState.LOADING:
                this.loading = true;
                break;
            default:
                this.loading = false;
                break;
        }
    }
}
IfExpandService.decorators = [
    { type: Injectable }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWYtZXhwYW5kZWQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbInV0aWxzL2NvbmRpdGlvbmFsL2lmLWV4cGFuZGVkLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRzNDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUdyRCxNQUFNLE9BQU8sZUFBZTtJQUQ1QjtRQUVTLGVBQVUsR0FBVyxDQUFDLENBQUM7UUFFcEIsYUFBUSxHQUFZLEtBQUssQ0FBQztRQVkxQixjQUFTLEdBQVksS0FBSyxDQUFDO1FBaUIzQixrQkFBYSxHQUFxQixJQUFJLE9BQU8sRUFBVyxDQUFDO0lBZXJFLENBQUM7Ozs7SUEzQ0MsSUFBSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7Ozs7O0lBRUQsSUFBSSxPQUFPLENBQUMsS0FBYztRQUN4QixLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUNoQixJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQzNCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1NBQ3ZCO0lBQ0gsQ0FBQzs7OztJQUdELElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDOzs7OztJQUVELElBQUksUUFBUSxDQUFDLEtBQWM7UUFDekIsS0FBSyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDaEIsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUM1QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztZQUN2QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNoQztJQUNILENBQUM7Ozs7SUFFTSxNQUFNO1FBQ1gsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDbEMsQ0FBQzs7OztJQUdELElBQVcsWUFBWTtRQUNyQixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDM0MsQ0FBQzs7Ozs7SUFFRCxrQkFBa0IsQ0FBQyxLQUFzQjtRQUN2QyxRQUFRLEtBQUssRUFBRTtZQUNiLEtBQUssZUFBZSxDQUFDLE9BQU87Z0JBQzFCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO2dCQUNwQixNQUFNO1lBQ1I7Z0JBQ0UsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7Z0JBQ3JCLE1BQU07U0FDVDtJQUNILENBQUM7OztZQS9DRixVQUFVOzs7O0lBRVQscUNBQThCOzs7OztJQUU5QixtQ0FBb0M7Ozs7O0lBWXBDLG9DQUFxQzs7Ozs7SUFpQnJDLHdDQUFtRSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgTG9hZGluZ0xpc3RlbmVyIH0gZnJvbSAnLi4vbG9hZGluZy9sb2FkaW5nLWxpc3RlbmVyJztcbmltcG9ydCB7IENsckxvYWRpbmdTdGF0ZSB9IGZyb20gJy4uL2xvYWRpbmcvbG9hZGluZyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBJZkV4cGFuZFNlcnZpY2UgaW1wbGVtZW50cyBMb2FkaW5nTGlzdGVuZXIge1xuICBwdWJsaWMgZXhwYW5kYWJsZTogbnVtYmVyID0gMDtcblxuICBwcm90ZWN0ZWQgX2xvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgZ2V0IGxvYWRpbmcoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2xvYWRpbmc7XG4gIH1cblxuICBzZXQgbG9hZGluZyh2YWx1ZTogYm9vbGVhbikge1xuICAgIHZhbHVlID0gISF2YWx1ZTtcbiAgICBpZiAodmFsdWUgIT09IHRoaXMuX2xvYWRpbmcpIHtcbiAgICAgIHRoaXMuX2xvYWRpbmcgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgX2V4cGFuZGVkOiBib29sZWFuID0gZmFsc2U7XG4gIGdldCBleHBhbmRlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZXhwYW5kZWQ7XG4gIH1cblxuICBzZXQgZXhwYW5kZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB2YWx1ZSA9ICEhdmFsdWU7XG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLl9leHBhbmRlZCkge1xuICAgICAgdGhpcy5fZXhwYW5kZWQgPSB2YWx1ZTtcbiAgICAgIHRoaXMuX2V4cGFuZENoYW5nZS5uZXh0KHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgdG9nZ2xlKCkge1xuICAgIHRoaXMuZXhwYW5kZWQgPSAhdGhpcy5fZXhwYW5kZWQ7XG4gIH1cblxuICBwcm90ZWN0ZWQgX2V4cGFuZENoYW5nZTogU3ViamVjdDxib29sZWFuPiA9IG5ldyBTdWJqZWN0PGJvb2xlYW4+KCk7XG4gIHB1YmxpYyBnZXQgZXhwYW5kQ2hhbmdlKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLl9leHBhbmRDaGFuZ2UuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBsb2FkaW5nU3RhdGVDaGFuZ2Uoc3RhdGU6IENsckxvYWRpbmdTdGF0ZSk6IHZvaWQge1xuICAgIHN3aXRjaCAoc3RhdGUpIHtcbiAgICAgIGNhc2UgQ2xyTG9hZGluZ1N0YXRlLkxPQURJTkc6XG4gICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxufVxuIl19