/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Injectable, QueryList } from '@angular/core';
import { Subject } from 'rxjs';
var MultiAlertService = /** @class */ (function () {
    function MultiAlertService() {
        this.allAlerts = new QueryList();
        this._current = 0;
        /**
         * The Observable that lets other classes subscribe to changes
         */
        this._change = new Subject();
    }
    Object.defineProperty(MultiAlertService.prototype, "changes", {
        get: /**
         * @return {?}
         */
        function () {
            return this._change.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiAlertService.prototype, "current", {
        get: /**
         * @return {?}
         */
        function () {
            return this._current;
        },
        set: /**
         * @param {?} index
         * @return {?}
         */
        function (index) {
            if (index !== this._current) {
                this._current = index;
                this._change.next(index);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiAlertService.prototype, "activeAlerts", {
        get: /**
         * @return {?}
         */
        function () {
            return this.allAlerts.filter(function (alert) { return !alert._closed; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiAlertService.prototype, "currentAlert", {
        get: /**
         * @return {?}
         */
        function () {
            return this.activeAlerts[this.current];
        },
        set: /**
         * @param {?} alert
         * @return {?}
         */
        function (alert) {
            this.current = this.activeAlerts.indexOf(alert);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiAlertService.prototype, "count", {
        get: /**
         * @return {?}
         */
        function () {
            return this.activeAlerts.length;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} alerts
     * @return {?}
     */
    MultiAlertService.prototype.manage = /**
     * @param {?} alerts
     * @return {?}
     */
    function (alerts) {
        this.allAlerts = alerts;
    };
    /**
     * @return {?}
     */
    MultiAlertService.prototype.next = /**
     * @return {?}
     */
    function () {
        this.current = this.current === this.activeAlerts.length - 1 ? 0 : this.current + 1;
    };
    /**
     * @return {?}
     */
    MultiAlertService.prototype.previous = /**
     * @return {?}
     */
    function () {
        if (this.activeAlerts.length === 0) {
            return;
        }
        this.current = this.current === 0 ? this.activeAlerts.length - 1 : this.current - 1;
    };
    /**
     * @return {?}
     */
    MultiAlertService.prototype.close = /**
     * @return {?}
     */
    function () {
        this.previous();
    };
    MultiAlertService.decorators = [
        { type: Injectable }
    ];
    return MultiAlertService;
}());
export { MultiAlertService };
if (false) {
    /** @type {?} */
    MultiAlertService.prototype.allAlerts;
    /** @type {?} */
    MultiAlertService.prototype._current;
    /**
     * The Observable that lets other classes subscribe to changes
     * @type {?}
     */
    MultiAlertService.prototype._change;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGktYWxlcnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImVtcGhhc2lzL2FsZXJ0L3Byb3ZpZGVycy9tdWx0aS1hbGVydC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtBLE9BQU8sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXRELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFJL0I7SUFBQTtRQUVVLGNBQVMsR0FBd0IsSUFBSSxTQUFTLEVBQVksQ0FBQztRQUMzRCxhQUFRLEdBQUcsQ0FBQyxDQUFDOzs7O1FBS2IsWUFBTyxHQUFHLElBQUksT0FBTyxFQUFVLENBQUM7SUFpRDFDLENBQUM7SUFoREMsc0JBQVcsc0NBQU87Ozs7UUFBbEI7WUFDRSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDckMsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSxzQ0FBTzs7OztRQUFYO1lBQ0UsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3ZCLENBQUM7Ozs7O1FBQ0QsVUFBWSxLQUFhO1lBQ3ZCLElBQUksS0FBSyxLQUFLLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQzNCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO2dCQUN0QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUMxQjtRQUNILENBQUM7OztPQU5BO0lBUUQsc0JBQUksMkNBQVk7Ozs7UUFBaEI7WUFDRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFkLENBQWMsQ0FBQyxDQUFDO1FBQ3hELENBQUM7OztPQUFBO0lBRUQsc0JBQUksMkNBQVk7Ozs7UUFBaEI7WUFDRSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3pDLENBQUM7Ozs7O1FBRUQsVUFBaUIsS0FBZTtZQUM5QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xELENBQUM7OztPQUpBO0lBTUQsc0JBQUksb0NBQUs7Ozs7UUFBVDtZQUNFLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUM7UUFDbEMsQ0FBQzs7O09BQUE7Ozs7O0lBRUQsa0NBQU07Ozs7SUFBTixVQUFPLE1BQTJCO1FBQ2hDLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDO0lBQzFCLENBQUM7Ozs7SUFFRCxnQ0FBSTs7O0lBQUo7UUFDRSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLEtBQUssSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO0lBQ3RGLENBQUM7Ozs7SUFFRCxvQ0FBUTs7O0lBQVI7UUFDRSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUNsQyxPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO0lBQ3RGLENBQUM7Ozs7SUFFRCxpQ0FBSzs7O0lBQUw7UUFDRSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDbEIsQ0FBQzs7Z0JBeERGLFVBQVU7O0lBeURYLHdCQUFDO0NBQUEsQUF6REQsSUF5REM7U0F4RFksaUJBQWlCOzs7SUFDNUIsc0NBQW1FOztJQUNuRSxxQ0FBcUI7Ozs7O0lBS3JCLG9DQUF3QyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IEluamVjdGFibGUsIFF1ZXJ5TGlzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBDbHJBbGVydCB9IGZyb20gJy4uL2FsZXJ0JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE11bHRpQWxlcnRTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBhbGxBbGVydHM6IFF1ZXJ5TGlzdDxDbHJBbGVydD4gPSBuZXcgUXVlcnlMaXN0PENsckFsZXJ0PigpO1xuICBwcml2YXRlIF9jdXJyZW50ID0gMDtcblxuICAvKipcbiAgICogVGhlIE9ic2VydmFibGUgdGhhdCBsZXRzIG90aGVyIGNsYXNzZXMgc3Vic2NyaWJlIHRvIGNoYW5nZXNcbiAgICovXG4gIHByaXZhdGUgX2NoYW5nZSA9IG5ldyBTdWJqZWN0PG51bWJlcj4oKTtcbiAgcHVibGljIGdldCBjaGFuZ2VzKCk6IE9ic2VydmFibGU8bnVtYmVyPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NoYW5nZS5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIGdldCBjdXJyZW50KCkge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50O1xuICB9XG4gIHNldCBjdXJyZW50KGluZGV4OiBudW1iZXIpIHtcbiAgICBpZiAoaW5kZXggIT09IHRoaXMuX2N1cnJlbnQpIHtcbiAgICAgIHRoaXMuX2N1cnJlbnQgPSBpbmRleDtcbiAgICAgIHRoaXMuX2NoYW5nZS5uZXh0KGluZGV4KTtcbiAgICB9XG4gIH1cblxuICBnZXQgYWN0aXZlQWxlcnRzKCkge1xuICAgIHJldHVybiB0aGlzLmFsbEFsZXJ0cy5maWx0ZXIoYWxlcnQgPT4gIWFsZXJ0Ll9jbG9zZWQpO1xuICB9XG5cbiAgZ2V0IGN1cnJlbnRBbGVydCgpIHtcbiAgICByZXR1cm4gdGhpcy5hY3RpdmVBbGVydHNbdGhpcy5jdXJyZW50XTtcbiAgfVxuXG4gIHNldCBjdXJyZW50QWxlcnQoYWxlcnQ6IENsckFsZXJ0KSB7XG4gICAgdGhpcy5jdXJyZW50ID0gdGhpcy5hY3RpdmVBbGVydHMuaW5kZXhPZihhbGVydCk7XG4gIH1cblxuICBnZXQgY291bnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuYWN0aXZlQWxlcnRzLmxlbmd0aDtcbiAgfVxuXG4gIG1hbmFnZShhbGVydHM6IFF1ZXJ5TGlzdDxDbHJBbGVydD4pIHtcbiAgICB0aGlzLmFsbEFsZXJ0cyA9IGFsZXJ0cztcbiAgfVxuXG4gIG5leHQoKSB7XG4gICAgdGhpcy5jdXJyZW50ID0gdGhpcy5jdXJyZW50ID09PSB0aGlzLmFjdGl2ZUFsZXJ0cy5sZW5ndGggLSAxID8gMCA6IHRoaXMuY3VycmVudCArIDE7XG4gIH1cblxuICBwcmV2aW91cygpIHtcbiAgICBpZiAodGhpcy5hY3RpdmVBbGVydHMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuY3VycmVudCA9IHRoaXMuY3VycmVudCA9PT0gMCA/IHRoaXMuYWN0aXZlQWxlcnRzLmxlbmd0aCAtIDEgOiB0aGlzLmN1cnJlbnQgLSAxO1xuICB9XG5cbiAgY2xvc2UoKSB7XG4gICAgdGhpcy5wcmV2aW91cygpO1xuICB9XG59XG4iXX0=