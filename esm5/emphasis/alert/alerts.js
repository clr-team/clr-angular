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
                        '[class.alert-danger]': "this.currentAlertType == 'danger'",
                        '[class.alert-info]': "this.currentAlertType == 'info'",
                        '[class.alert-success]': "this.currentAlertType == 'success'",
                        '[class.alert-warning]': "this.currentAlertType == 'warning'",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnRzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZW1waGFzaXMvYWxlcnQvYWxlcnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtBLE9BQU8sRUFBb0IsU0FBUyxFQUFFLGVBQWUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUNuQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUVwRTtJQWlFRSxtQkFBbUIsaUJBQW9DO1FBQXBDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUF2Q1YsNEJBQXVCLEdBQUcsSUFBSSxZQUFZLENBQVMsS0FBSyxDQUFDLENBQUM7UUFxQi9ELHVCQUFrQixHQUFHLElBQUksWUFBWSxDQUFXLEtBQUssQ0FBQyxDQUFDO0lBa0JyQyxDQUFDO0lBOUMzRCxzQkFDVyx5Q0FBa0I7UUFKN0I7O1dBRUc7Ozs7OztRQUNILFVBQzhCLEtBQWE7WUFDekMsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLEVBQUU7Z0JBQ3pDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2FBQ3hDO1FBQ0gsQ0FBQzs7O09BQUE7SUFJRCxzQkFBSSx3Q0FBaUI7Ozs7UUFHckI7WUFDRSxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUM7UUFDeEMsQ0FBQzs7Ozs7UUFMRCxVQUFzQixLQUFhO1lBQ2pDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3pDLENBQUM7OztPQUFBO0lBUUQsc0JBQ0ksbUNBQVk7Ozs7UUFLaEI7WUFDRSxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUM7UUFDN0MsQ0FBQztRQVhEOztXQUVHOzs7Ozs7UUFDSCxVQUNpQixLQUFlO1lBQzlCLElBQUksS0FBSyxFQUFFO2dCQUNULElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO2FBQzdDO1FBQ0gsQ0FBQzs7O09BQUE7SUFTRCxzQkFBSSw2QkFBTTtRQUhWOztXQUVHOzs7OztRQUNIO1lBQ0UsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFBLEtBQUs7Z0JBQ2hDLE9BQU8sS0FBSyxDQUFDLFFBQVEsS0FBSyxLQUFLLENBQUM7WUFDbEMsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLHVDQUFnQjs7OztRQUFwQjtZQUNFLElBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRTtnQkFDdkMsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQzthQUN0RDtZQUNELE9BQU8sRUFBRSxDQUFDO1FBQ1osQ0FBQzs7O09BQUE7Ozs7SUFJRCxzQ0FBa0I7OztJQUFsQjtRQUFBLGlCQU1DO1FBTEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsVUFBQSxLQUFLO1lBQzVDLEtBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDekMsS0FBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDcEUsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOztnQkF6RUYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxZQUFZO29CQUN0QiwyYUFBNEI7b0JBQzVCLFNBQVMsRUFBRSxDQUFDLGlCQUFpQixDQUFDO29CQUM5QixJQUFJLEVBQUU7d0JBQ0osZ0JBQWdCLEVBQUUsTUFBTTt3QkFDeEIsc0JBQXNCLEVBQUUsbUNBQW1DO3dCQUMzRCxvQkFBb0IsRUFBRSxpQ0FBaUM7d0JBQ3ZELHVCQUF1QixFQUFFLG9DQUFvQzt3QkFDN0QsdUJBQXVCLEVBQUUsb0NBQW9DO3FCQUM5RDs2QkFDUSwwQkFBMEI7aUJBQ3BDOzs7O2dCQWRRLGlCQUFpQjs7OzRCQWdCdkIsZUFBZSxTQUFDLFFBQVE7cUNBS3hCLEtBQUssU0FBQyxzQkFBc0I7MENBTzVCLE1BQU0sU0FBQyw0QkFBNEI7K0JBWW5DLEtBQUssU0FBQyxpQkFBaUI7cUNBU3ZCLE1BQU0sU0FBQyx1QkFBdUI7O0lBMkJqQyxnQkFBQztDQUFBLEFBMUVELElBMEVDO1NBN0RZLFNBQVM7OztJQUNwQiw4QkFBMEQ7O0lBWTFELDRDQUF1Rzs7SUFxQnZHLHVDQUErRjs7SUFrQm5GLHNDQUEyQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IEFmdGVyQ29udGVudEluaXQsIENvbXBvbmVudCwgQ29udGVudENoaWxkcmVuLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQsIFF1ZXJ5TGlzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2xyQWxlcnQgfSBmcm9tICcuL2FsZXJ0JztcbmltcG9ydCB7IE11bHRpQWxlcnRTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvbXVsdGktYWxlcnQuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci1hbGVydHMnLFxuICB0ZW1wbGF0ZVVybDogJy4vYWxlcnRzLmh0bWwnLFxuICBwcm92aWRlcnM6IFtNdWx0aUFsZXJ0U2VydmljZV0sXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmFsZXJ0c10nOiAndHJ1ZScsXG4gICAgJ1tjbGFzcy5hbGVydC1kYW5nZXJdJzogXCJ0aGlzLmN1cnJlbnRBbGVydFR5cGUgPT0gJ2RhbmdlcidcIixcbiAgICAnW2NsYXNzLmFsZXJ0LWluZm9dJzogXCJ0aGlzLmN1cnJlbnRBbGVydFR5cGUgPT0gJ2luZm8nXCIsXG4gICAgJ1tjbGFzcy5hbGVydC1zdWNjZXNzXSc6IFwidGhpcy5jdXJyZW50QWxlcnRUeXBlID09ICdzdWNjZXNzJ1wiLFxuICAgICdbY2xhc3MuYWxlcnQtd2FybmluZ10nOiBcInRoaXMuY3VycmVudEFsZXJ0VHlwZSA9PSAnd2FybmluZydcIixcbiAgfSxcbiAgc3R5bGVzOiBbJzpob3N0IHsgZGlzcGxheTogYmxvY2sgfSddLFxufSlcbmV4cG9ydCBjbGFzcyBDbHJBbGVydHMgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcbiAgQENvbnRlbnRDaGlsZHJlbihDbHJBbGVydCkgYWxsQWxlcnRzOiBRdWVyeUxpc3Q8Q2xyQWxlcnQ+O1xuXG4gIC8qKlxuICAgKiBJbnB1dC9PdXRwdXQgdG8gc3VwcG9ydCB0d28gd2F5IGJpbmRpbmcgb24gY3VycmVudCBhbGVydCBpbmRleFxuICAgKi9cbiAgQElucHV0KCdjbHJDdXJyZW50QWxlcnRJbmRleCcpXG4gIHB1YmxpYyBzZXQgX2lucHV0Q3VycmVudEluZGV4KGluZGV4OiBudW1iZXIpIHtcbiAgICBpZiAoTnVtYmVyLmlzSW50ZWdlcihpbmRleCkgJiYgaW5kZXggPj0gMCkge1xuICAgICAgdGhpcy5tdWx0aUFsZXJ0U2VydmljZS5jdXJyZW50ID0gaW5kZXg7XG4gICAgfVxuICB9XG5cbiAgQE91dHB1dCgnY2xyQ3VycmVudEFsZXJ0SW5kZXhDaGFuZ2UnKSBwdWJsaWMgY3VycmVudEFsZXJ0SW5kZXhDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oZmFsc2UpO1xuXG4gIHNldCBjdXJyZW50QWxlcnRJbmRleChpbmRleDogbnVtYmVyKSB7XG4gICAgdGhpcy5tdWx0aUFsZXJ0U2VydmljZS5jdXJyZW50ID0gaW5kZXg7XG4gIH1cbiAgZ2V0IGN1cnJlbnRBbGVydEluZGV4KCkge1xuICAgIHJldHVybiB0aGlzLm11bHRpQWxlcnRTZXJ2aWNlLmN1cnJlbnQ7XG4gIH1cblxuICAvKipcbiAgICogSW5wdXQvT3V0cHV0IHRvIHN1cHBvcnQgdHdvIHdheSBiaW5kaW5nIG9uIGN1cnJlbnQgYWxlcnQgaW5zdGFuY2VcbiAgICovXG4gIEBJbnB1dCgnY2xyQ3VycmVudEFsZXJ0JylcbiAgc2V0IGN1cnJlbnRBbGVydChhbGVydDogQ2xyQWxlcnQpIHtcbiAgICBpZiAoYWxlcnQpIHtcbiAgICAgIHRoaXMubXVsdGlBbGVydFNlcnZpY2UuY3VycmVudEFsZXJ0ID0gYWxlcnQ7XG4gICAgfVxuICB9XG4gIGdldCBjdXJyZW50QWxlcnQoKSB7XG4gICAgcmV0dXJuIHRoaXMubXVsdGlBbGVydFNlcnZpY2UuY3VycmVudEFsZXJ0O1xuICB9XG4gIEBPdXRwdXQoJ2NsckN1cnJlbnRBbGVydENoYW5nZScpIHB1YmxpYyBjdXJyZW50QWxlcnRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPENsckFsZXJ0PihmYWxzZSk7XG5cbiAgLyoqXG4gICAqIEVuc3VyZSB3ZSBhcmUgb25seSBkZWFsaW5nIHdpdGggYWxlcnRzIHRoYXQgaGF2ZSBub3QgYmVlbiBjbG9zZWQgeWV0XG4gICAqL1xuICBnZXQgYWxlcnRzKCkge1xuICAgIHJldHVybiB0aGlzLmFsbEFsZXJ0cy5maWx0ZXIoYWxlcnQgPT4ge1xuICAgICAgcmV0dXJuIGFsZXJ0LmlzSGlkZGVuID09PSBmYWxzZTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldCBjdXJyZW50QWxlcnRUeXBlKCk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMubXVsdGlBbGVydFNlcnZpY2UuY3VycmVudEFsZXJ0KSB7XG4gICAgICByZXR1cm4gdGhpcy5tdWx0aUFsZXJ0U2VydmljZS5jdXJyZW50QWxlcnQuYWxlcnRUeXBlO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbXVsdGlBbGVydFNlcnZpY2U6IE11bHRpQWxlcnRTZXJ2aWNlKSB7fVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICB0aGlzLm11bHRpQWxlcnRTZXJ2aWNlLm1hbmFnZSh0aGlzLmFsbEFsZXJ0cyk7XG4gICAgdGhpcy5tdWx0aUFsZXJ0U2VydmljZS5jaGFuZ2VzLnN1YnNjcmliZShpbmRleCA9PiB7XG4gICAgICB0aGlzLmN1cnJlbnRBbGVydEluZGV4Q2hhbmdlLm5leHQoaW5kZXgpO1xuICAgICAgdGhpcy5jdXJyZW50QWxlcnRDaGFuZ2UubmV4dCh0aGlzLm11bHRpQWxlcnRTZXJ2aWNlLmN1cnJlbnRBbGVydCk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==