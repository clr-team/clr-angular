/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ContentChildren, EventEmitter, Input, Output, QueryList } from '@angular/core';
import { ClrAlert } from './alert';
import { MultiAlertService } from './providers/multi-alert.service';
// the 'alert-*' alert types are deprecated and should be removed in 0.12 or later
var ClrAlerts = /** @class */ (function () {
    function ClrAlerts(multiAlertService) {
        this.multiAlertService = multiAlertService;
        this.currentAlertIndexChange = new EventEmitter(false);
        this.currentAlertChange = new EventEmitter(false);
    }
    Object.defineProperty(ClrAlerts.prototype, "_inputCurrentIndex", {
        /**
         * Input/Output to support two way binding on current alert index
         */
        set: /**
         * Input/Output to support two way binding on current alert index
         * @param {?} index
         * @return {?}
         */
        function (index) {
            if (Number.isInteger(index) && index >= 0) {
                this.multiAlertService.current = index;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrAlerts.prototype, "currentAlertIndex", {
        get: /**
         * @return {?}
         */
        function () {
            return this.multiAlertService.current;
        },
        set: /**
         * @param {?} index
         * @return {?}
         */
        function (index) {
            this.multiAlertService.current = index;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrAlerts.prototype, "currentAlert", {
        get: /**
         * @return {?}
         */
        function () {
            return this.multiAlertService.currentAlert;
        },
        /**
         * Input/Output to support two way binding on current alert instance
         */
        set: /**
         * Input/Output to support two way binding on current alert instance
         * @param {?} alert
         * @return {?}
         */
        function (alert) {
            if (alert) {
                this.multiAlertService.currentAlert = alert;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrAlerts.prototype, "alerts", {
        /**
         * Ensure we are only dealing with alerts that have not been closed yet
         */
        get: /**
         * Ensure we are only dealing with alerts that have not been closed yet
         * @return {?}
         */
        function () {
            return this.allAlerts.filter(function (alert) {
                return alert.isHidden === false;
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrAlerts.prototype, "currentAlertType", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.multiAlertService.currentAlert) {
                return this.multiAlertService.currentAlert.alertType;
            }
            return '';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ClrAlerts.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.multiAlertService.manage(this.allAlerts);
        this.multiAlertService.changes.subscribe(function (index) {
            _this.currentAlertIndexChange.next(index);
            _this.currentAlertChange.next(_this.multiAlertService.currentAlert);
        });
    };
    ClrAlerts.decorators = [
        { type: Component, args: [{
                    selector: 'clr-alerts',
                    template: "<!--\n  ~ Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.\n  ~ This software is released under MIT license.\n  ~ The full license information can be found in LICENSE in the root directory of this project.\n  -->\n\n<clr-alerts-pager\n        *ngIf=\"multiAlertService.count > 1\"\n        [clrCurrentAlertIndex]=\"currentAlertIndex\">\n</clr-alerts-pager>\n<ng-content select=\"clr-alert\"></ng-content>\n",
                    providers: [MultiAlertService],
                    host: {
                        '[class.alerts]': 'true',
                        '[class.alert-danger]': "this.currentAlertType == 'danger' || this.currentAlertType == 'alert-danger'",
                        '[class.alert-info]': "this.currentAlertType == 'info' || this.currentAlertType == 'alert-info'",
                        '[class.alert-success]': "this.currentAlertType == 'success' || this.currentAlertType == 'alert-success'",
                        '[class.alert-warning]': "this.currentAlertType == 'warning' || this.currentAlertType == 'alert-warning'",
                    },
                    styles: [':host { display: block }']
                }] }
    ];
    /** @nocollapse */
    ClrAlerts.ctorParameters = function () { return [
        { type: MultiAlertService }
    ]; };
    ClrAlerts.propDecorators = {
        allAlerts: [{ type: ContentChildren, args: [ClrAlert,] }],
        _inputCurrentIndex: [{ type: Input, args: ['clrCurrentAlertIndex',] }],
        currentAlertIndexChange: [{ type: Output, args: ['clrCurrentAlertIndexChange',] }],
        currentAlert: [{ type: Input, args: ['clrCurrentAlert',] }],
        currentAlertChange: [{ type: Output, args: ['clrCurrentAlertChange',] }]
    };
    return ClrAlerts;
}());
export { ClrAlerts };
if (false) {
    /** @type {?} */
    ClrAlerts.prototype.allAlerts;
    /** @type {?} */
    ClrAlerts.prototype.currentAlertIndexChange;
    /** @type {?} */
    ClrAlerts.prototype.currentAlertChange;
    /** @type {?} */
    ClrAlerts.prototype.multiAlertService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnRzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZW1waGFzaXMvYWxlcnQvYWxlcnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtBLE9BQU8sRUFBb0IsU0FBUyxFQUFFLGVBQWUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUNuQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQzs7QUFHcEU7SUFpRUUsbUJBQW1CLGlCQUFvQztRQUFwQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBdkNWLDRCQUF1QixHQUFHLElBQUksWUFBWSxDQUFTLEtBQUssQ0FBQyxDQUFDO1FBcUIvRCx1QkFBa0IsR0FBRyxJQUFJLFlBQVksQ0FBVyxLQUFLLENBQUMsQ0FBQztJQWtCckMsQ0FBQztJQTlDM0Qsc0JBQ1cseUNBQWtCO1FBSjdCOztXQUVHOzs7Ozs7UUFDSCxVQUM4QixLQUFhO1lBQ3pDLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxFQUFFO2dCQUN6QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQzthQUN4QztRQUNILENBQUM7OztPQUFBO0lBSUQsc0JBQUksd0NBQWlCOzs7O1FBR3JCO1lBQ0UsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDO1FBQ3hDLENBQUM7Ozs7O1FBTEQsVUFBc0IsS0FBYTtZQUNqQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUN6QyxDQUFDOzs7T0FBQTtJQVFELHNCQUNJLG1DQUFZOzs7O1FBS2hCO1lBQ0UsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDO1FBQzdDLENBQUM7UUFYRDs7V0FFRzs7Ozs7O1FBQ0gsVUFDaUIsS0FBZTtZQUM5QixJQUFJLEtBQUssRUFBRTtnQkFDVCxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQzthQUM3QztRQUNILENBQUM7OztPQUFBO0lBU0Qsc0JBQUksNkJBQU07UUFIVjs7V0FFRzs7Ozs7UUFDSDtZQUNFLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBQSxLQUFLO2dCQUNoQyxPQUFPLEtBQUssQ0FBQyxRQUFRLEtBQUssS0FBSyxDQUFDO1lBQ2xDLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSx1Q0FBZ0I7Ozs7UUFBcEI7WUFDRSxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUU7Z0JBQ3ZDLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUM7YUFDdEQ7WUFDRCxPQUFPLEVBQUUsQ0FBQztRQUNaLENBQUM7OztPQUFBOzs7O0lBSUQsc0NBQWtCOzs7SUFBbEI7UUFBQSxpQkFNQztRQUxDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLFVBQUEsS0FBSztZQUM1QyxLQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3pDLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3BFLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7Z0JBekVGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsWUFBWTtvQkFDdEIsMmFBQTRCO29CQUM1QixTQUFTLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztvQkFDOUIsSUFBSSxFQUFFO3dCQUNKLGdCQUFnQixFQUFFLE1BQU07d0JBQ3hCLHNCQUFzQixFQUFFLDhFQUE4RTt3QkFDdEcsb0JBQW9CLEVBQUUsMEVBQTBFO3dCQUNoRyx1QkFBdUIsRUFBRSxnRkFBZ0Y7d0JBQ3pHLHVCQUF1QixFQUFFLGdGQUFnRjtxQkFDMUc7NkJBQ1EsMEJBQTBCO2lCQUNwQzs7OztnQkFmUSxpQkFBaUI7Ozs0QkFpQnZCLGVBQWUsU0FBQyxRQUFRO3FDQUt4QixLQUFLLFNBQUMsc0JBQXNCOzBDQU81QixNQUFNLFNBQUMsNEJBQTRCOytCQVluQyxLQUFLLFNBQUMsaUJBQWlCO3FDQVN2QixNQUFNLFNBQUMsdUJBQXVCOztJQTJCakMsZ0JBQUM7Q0FBQSxBQTFFRCxJQTBFQztTQTdEWSxTQUFTOzs7SUFDcEIsOEJBQTBEOztJQVkxRCw0Q0FBdUc7O0lBcUJ2Ryx1Q0FBK0Y7O0lBa0JuRixzQ0FBMkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBBZnRlckNvbnRlbnRJbml0LCBDb21wb25lbnQsIENvbnRlbnRDaGlsZHJlbiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBRdWVyeUxpc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENsckFsZXJ0IH0gZnJvbSAnLi9hbGVydCc7XG5pbXBvcnQgeyBNdWx0aUFsZXJ0U2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL211bHRpLWFsZXJ0LnNlcnZpY2UnO1xuXG4vLyB0aGUgJ2FsZXJ0LSonIGFsZXJ0IHR5cGVzIGFyZSBkZXByZWNhdGVkIGFuZCBzaG91bGQgYmUgcmVtb3ZlZCBpbiAwLjEyIG9yIGxhdGVyXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItYWxlcnRzJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2FsZXJ0cy5odG1sJyxcbiAgcHJvdmlkZXJzOiBbTXVsdGlBbGVydFNlcnZpY2VdLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5hbGVydHNdJzogJ3RydWUnLFxuICAgICdbY2xhc3MuYWxlcnQtZGFuZ2VyXSc6IFwidGhpcy5jdXJyZW50QWxlcnRUeXBlID09ICdkYW5nZXInIHx8IHRoaXMuY3VycmVudEFsZXJ0VHlwZSA9PSAnYWxlcnQtZGFuZ2VyJ1wiLFxuICAgICdbY2xhc3MuYWxlcnQtaW5mb10nOiBcInRoaXMuY3VycmVudEFsZXJ0VHlwZSA9PSAnaW5mbycgfHwgdGhpcy5jdXJyZW50QWxlcnRUeXBlID09ICdhbGVydC1pbmZvJ1wiLFxuICAgICdbY2xhc3MuYWxlcnQtc3VjY2Vzc10nOiBcInRoaXMuY3VycmVudEFsZXJ0VHlwZSA9PSAnc3VjY2VzcycgfHwgdGhpcy5jdXJyZW50QWxlcnRUeXBlID09ICdhbGVydC1zdWNjZXNzJ1wiLFxuICAgICdbY2xhc3MuYWxlcnQtd2FybmluZ10nOiBcInRoaXMuY3VycmVudEFsZXJ0VHlwZSA9PSAnd2FybmluZycgfHwgdGhpcy5jdXJyZW50QWxlcnRUeXBlID09ICdhbGVydC13YXJuaW5nJ1wiLFxuICB9LFxuICBzdHlsZXM6IFsnOmhvc3QgeyBkaXNwbGF5OiBibG9jayB9J10sXG59KVxuZXhwb3J0IGNsYXNzIENsckFsZXJ0cyBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xuICBAQ29udGVudENoaWxkcmVuKENsckFsZXJ0KSBhbGxBbGVydHM6IFF1ZXJ5TGlzdDxDbHJBbGVydD47XG5cbiAgLyoqXG4gICAqIElucHV0L091dHB1dCB0byBzdXBwb3J0IHR3byB3YXkgYmluZGluZyBvbiBjdXJyZW50IGFsZXJ0IGluZGV4XG4gICAqL1xuICBASW5wdXQoJ2NsckN1cnJlbnRBbGVydEluZGV4JylcbiAgcHVibGljIHNldCBfaW5wdXRDdXJyZW50SW5kZXgoaW5kZXg6IG51bWJlcikge1xuICAgIGlmIChOdW1iZXIuaXNJbnRlZ2VyKGluZGV4KSAmJiBpbmRleCA+PSAwKSB7XG4gICAgICB0aGlzLm11bHRpQWxlcnRTZXJ2aWNlLmN1cnJlbnQgPSBpbmRleDtcbiAgICB9XG4gIH1cblxuICBAT3V0cHV0KCdjbHJDdXJyZW50QWxlcnRJbmRleENoYW5nZScpIHB1YmxpYyBjdXJyZW50QWxlcnRJbmRleENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPihmYWxzZSk7XG5cbiAgc2V0IGN1cnJlbnRBbGVydEluZGV4KGluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLm11bHRpQWxlcnRTZXJ2aWNlLmN1cnJlbnQgPSBpbmRleDtcbiAgfVxuICBnZXQgY3VycmVudEFsZXJ0SW5kZXgoKSB7XG4gICAgcmV0dXJuIHRoaXMubXVsdGlBbGVydFNlcnZpY2UuY3VycmVudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnB1dC9PdXRwdXQgdG8gc3VwcG9ydCB0d28gd2F5IGJpbmRpbmcgb24gY3VycmVudCBhbGVydCBpbnN0YW5jZVxuICAgKi9cbiAgQElucHV0KCdjbHJDdXJyZW50QWxlcnQnKVxuICBzZXQgY3VycmVudEFsZXJ0KGFsZXJ0OiBDbHJBbGVydCkge1xuICAgIGlmIChhbGVydCkge1xuICAgICAgdGhpcy5tdWx0aUFsZXJ0U2VydmljZS5jdXJyZW50QWxlcnQgPSBhbGVydDtcbiAgICB9XG4gIH1cbiAgZ2V0IGN1cnJlbnRBbGVydCgpIHtcbiAgICByZXR1cm4gdGhpcy5tdWx0aUFsZXJ0U2VydmljZS5jdXJyZW50QWxlcnQ7XG4gIH1cbiAgQE91dHB1dCgnY2xyQ3VycmVudEFsZXJ0Q2hhbmdlJykgcHVibGljIGN1cnJlbnRBbGVydENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Q2xyQWxlcnQ+KGZhbHNlKTtcblxuICAvKipcbiAgICogRW5zdXJlIHdlIGFyZSBvbmx5IGRlYWxpbmcgd2l0aCBhbGVydHMgdGhhdCBoYXZlIG5vdCBiZWVuIGNsb3NlZCB5ZXRcbiAgICovXG4gIGdldCBhbGVydHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuYWxsQWxlcnRzLmZpbHRlcihhbGVydCA9PiB7XG4gICAgICByZXR1cm4gYWxlcnQuaXNIaWRkZW4gPT09IGZhbHNlO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0IGN1cnJlbnRBbGVydFR5cGUoKTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy5tdWx0aUFsZXJ0U2VydmljZS5jdXJyZW50QWxlcnQpIHtcbiAgICAgIHJldHVybiB0aGlzLm11bHRpQWxlcnRTZXJ2aWNlLmN1cnJlbnRBbGVydC5hbGVydFR5cGU7XG4gICAgfVxuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBtdWx0aUFsZXJ0U2VydmljZTogTXVsdGlBbGVydFNlcnZpY2UpIHt9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIHRoaXMubXVsdGlBbGVydFNlcnZpY2UubWFuYWdlKHRoaXMuYWxsQWxlcnRzKTtcbiAgICB0aGlzLm11bHRpQWxlcnRTZXJ2aWNlLmNoYW5nZXMuc3Vic2NyaWJlKGluZGV4ID0+IHtcbiAgICAgIHRoaXMuY3VycmVudEFsZXJ0SW5kZXhDaGFuZ2UubmV4dChpbmRleCk7XG4gICAgICB0aGlzLmN1cnJlbnRBbGVydENoYW5nZS5uZXh0KHRoaXMubXVsdGlBbGVydFNlcnZpY2UuY3VycmVudEFsZXJ0KTtcbiAgICB9KTtcbiAgfVxufVxuIl19