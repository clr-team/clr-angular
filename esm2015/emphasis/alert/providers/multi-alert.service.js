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
export class MultiAlertService {
    constructor() {
        this.allAlerts = new QueryList();
        this._current = 0;
        /**
         * The Observable that lets other classes subscribe to changes
         */
        this._change = new Subject();
    }
    /**
     * @return {?}
     */
    get changes() {
        return this._change.asObservable();
    }
    /**
     * @return {?}
     */
    get current() {
        return this._current;
    }
    /**
     * @param {?} index
     * @return {?}
     */
    set current(index) {
        if (index !== this._current) {
            this._current = index;
            this._change.next(index);
        }
    }
    /**
     * @return {?}
     */
    get activeAlerts() {
        return this.allAlerts.filter(alert => !alert._closed);
    }
    /**
     * @return {?}
     */
    get currentAlert() {
        return this.activeAlerts[this.current];
    }
    /**
     * @param {?} alert
     * @return {?}
     */
    set currentAlert(alert) {
        this.current = this.activeAlerts.indexOf(alert);
    }
    /**
     * @return {?}
     */
    get count() {
        return this.activeAlerts.length;
    }
    /**
     * @param {?} alerts
     * @return {?}
     */
    manage(alerts) {
        this.allAlerts = alerts;
    }
    /**
     * @return {?}
     */
    next() {
        this.current = this.current === this.activeAlerts.length - 1 ? 0 : this.current + 1;
    }
    /**
     * @return {?}
     */
    previous() {
        if (this.activeAlerts.length === 0) {
            return;
        }
        this.current = this.current === 0 ? this.activeAlerts.length - 1 : this.current - 1;
    }
    /**
     * @return {?}
     */
    close() {
        this.previous();
    }
}
MultiAlertService.decorators = [
    { type: Injectable }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGktYWxlcnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImVtcGhhc2lzL2FsZXJ0L3Byb3ZpZGVycy9tdWx0aS1hbGVydC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtBLE9BQU8sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXRELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFLL0IsTUFBTSxPQUFPLGlCQUFpQjtJQUQ5QjtRQUVVLGNBQVMsR0FBd0IsSUFBSSxTQUFTLEVBQVksQ0FBQztRQUMzRCxhQUFRLEdBQUcsQ0FBQyxDQUFDOzs7O1FBS2IsWUFBTyxHQUFHLElBQUksT0FBTyxFQUFVLENBQUM7SUFpRDFDLENBQUM7Ozs7SUFoREMsSUFBVyxPQUFPO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUNyQyxDQUFDOzs7O0lBRUQsSUFBSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7Ozs7O0lBQ0QsSUFBSSxPQUFPLENBQUMsS0FBYTtRQUN2QixJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQzNCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzFCO0lBQ0gsQ0FBQzs7OztJQUVELElBQUksWUFBWTtRQUNkLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN4RCxDQUFDOzs7O0lBRUQsSUFBSSxZQUFZO1FBQ2QsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN6QyxDQUFDOzs7OztJQUVELElBQUksWUFBWSxDQUFDLEtBQWU7UUFDOUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNsRCxDQUFDOzs7O0lBRUQsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQztJQUNsQyxDQUFDOzs7OztJQUVELE1BQU0sQ0FBQyxNQUEyQjtRQUNoQyxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQztJQUMxQixDQUFDOzs7O0lBRUQsSUFBSTtRQUNGLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7SUFDdEYsQ0FBQzs7OztJQUVELFFBQVE7UUFDTixJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUNsQyxPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO0lBQ3RGLENBQUM7Ozs7SUFFRCxLQUFLO1FBQ0gsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2xCLENBQUM7OztZQXhERixVQUFVOzs7O0lBRVQsc0NBQW1FOztJQUNuRSxxQ0FBcUI7Ozs7O0lBS3JCLG9DQUF3QyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IEluamVjdGFibGUsIFF1ZXJ5TGlzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBDbHJBbGVydCB9IGZyb20gJy4uL2FsZXJ0JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE11bHRpQWxlcnRTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBhbGxBbGVydHM6IFF1ZXJ5TGlzdDxDbHJBbGVydD4gPSBuZXcgUXVlcnlMaXN0PENsckFsZXJ0PigpO1xuICBwcml2YXRlIF9jdXJyZW50ID0gMDtcblxuICAvKipcbiAgICogVGhlIE9ic2VydmFibGUgdGhhdCBsZXRzIG90aGVyIGNsYXNzZXMgc3Vic2NyaWJlIHRvIGNoYW5nZXNcbiAgICovXG4gIHByaXZhdGUgX2NoYW5nZSA9IG5ldyBTdWJqZWN0PG51bWJlcj4oKTtcbiAgcHVibGljIGdldCBjaGFuZ2VzKCk6IE9ic2VydmFibGU8bnVtYmVyPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NoYW5nZS5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIGdldCBjdXJyZW50KCkge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50O1xuICB9XG4gIHNldCBjdXJyZW50KGluZGV4OiBudW1iZXIpIHtcbiAgICBpZiAoaW5kZXggIT09IHRoaXMuX2N1cnJlbnQpIHtcbiAgICAgIHRoaXMuX2N1cnJlbnQgPSBpbmRleDtcbiAgICAgIHRoaXMuX2NoYW5nZS5uZXh0KGluZGV4KTtcbiAgICB9XG4gIH1cblxuICBnZXQgYWN0aXZlQWxlcnRzKCkge1xuICAgIHJldHVybiB0aGlzLmFsbEFsZXJ0cy5maWx0ZXIoYWxlcnQgPT4gIWFsZXJ0Ll9jbG9zZWQpO1xuICB9XG5cbiAgZ2V0IGN1cnJlbnRBbGVydCgpIHtcbiAgICByZXR1cm4gdGhpcy5hY3RpdmVBbGVydHNbdGhpcy5jdXJyZW50XTtcbiAgfVxuXG4gIHNldCBjdXJyZW50QWxlcnQoYWxlcnQ6IENsckFsZXJ0KSB7XG4gICAgdGhpcy5jdXJyZW50ID0gdGhpcy5hY3RpdmVBbGVydHMuaW5kZXhPZihhbGVydCk7XG4gIH1cblxuICBnZXQgY291bnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuYWN0aXZlQWxlcnRzLmxlbmd0aDtcbiAgfVxuXG4gIG1hbmFnZShhbGVydHM6IFF1ZXJ5TGlzdDxDbHJBbGVydD4pIHtcbiAgICB0aGlzLmFsbEFsZXJ0cyA9IGFsZXJ0cztcbiAgfVxuXG4gIG5leHQoKSB7XG4gICAgdGhpcy5jdXJyZW50ID0gdGhpcy5jdXJyZW50ID09PSB0aGlzLmFjdGl2ZUFsZXJ0cy5sZW5ndGggLSAxID8gMCA6IHRoaXMuY3VycmVudCArIDE7XG4gIH1cblxuICBwcmV2aW91cygpIHtcbiAgICBpZiAodGhpcy5hY3RpdmVBbGVydHMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuY3VycmVudCA9IHRoaXMuY3VycmVudCA9PT0gMCA/IHRoaXMuYWN0aXZlQWxlcnRzLmxlbmd0aCAtIDEgOiB0aGlzLmN1cnJlbnQgLSAxO1xuICB9XG5cbiAgY2xvc2UoKSB7XG4gICAgdGhpcy5wcmV2aW91cygpO1xuICB9XG59XG4iXX0=