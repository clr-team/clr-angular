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
export class ClrAlerts {
    /**
     * @param {?} multiAlertService
     */
    constructor(multiAlertService) {
        this.multiAlertService = multiAlertService;
        this.currentAlertIndexChange = new EventEmitter(false);
        this.currentAlertChange = new EventEmitter(false);
    }
    /**
     * Input/Output to support two way binding on current alert index
     * @param {?} index
     * @return {?}
     */
    set _inputCurrentIndex(index) {
        if (Number.isInteger(index) && index >= 0) {
            this.multiAlertService.current = index;
        }
    }
    /**
     * @param {?} index
     * @return {?}
     */
    set currentAlertIndex(index) {
        this.multiAlertService.current = index;
    }
    /**
     * @return {?}
     */
    get currentAlertIndex() {
        return this.multiAlertService.current;
    }
    /**
     * Input/Output to support two way binding on current alert instance
     * @param {?} alert
     * @return {?}
     */
    set currentAlert(alert) {
        if (alert) {
            this.multiAlertService.currentAlert = alert;
        }
    }
    /**
     * @return {?}
     */
    get currentAlert() {
        return this.multiAlertService.currentAlert;
    }
    /**
     * Ensure we are only dealing with alerts that have not been closed yet
     * @return {?}
     */
    get alerts() {
        return this.allAlerts.filter(alert => {
            return alert.isHidden === false;
        });
    }
    /**
     * @return {?}
     */
    get currentAlertType() {
        if (this.multiAlertService.currentAlert) {
            return this.multiAlertService.currentAlert.alertType;
        }
        return '';
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.multiAlertService.manage(this.allAlerts);
        this.multiAlertService.changes.subscribe(index => {
            this.currentAlertIndexChange.next(index);
            this.currentAlertChange.next(this.multiAlertService.currentAlert);
        });
    }
}
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
ClrAlerts.ctorParameters = () => [
    { type: MultiAlertService }
];
ClrAlerts.propDecorators = {
    allAlerts: [{ type: ContentChildren, args: [ClrAlert,] }],
    _inputCurrentIndex: [{ type: Input, args: ['clrCurrentAlertIndex',] }],
    currentAlertIndexChange: [{ type: Output, args: ['clrCurrentAlertIndexChange',] }],
    currentAlert: [{ type: Input, args: ['clrCurrentAlert',] }],
    currentAlertChange: [{ type: Output, args: ['clrCurrentAlertChange',] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnRzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZW1waGFzaXMvYWxlcnQvYWxlcnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtBLE9BQU8sRUFBb0IsU0FBUyxFQUFFLGVBQWUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUNuQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQWVwRSxNQUFNLE9BQU8sU0FBUzs7OztJQW9EcEIsWUFBbUIsaUJBQW9DO1FBQXBDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUF2Q1YsNEJBQXVCLEdBQUcsSUFBSSxZQUFZLENBQVMsS0FBSyxDQUFDLENBQUM7UUFxQi9ELHVCQUFrQixHQUFHLElBQUksWUFBWSxDQUFXLEtBQUssQ0FBQyxDQUFDO0lBa0JyQyxDQUFDOzs7Ozs7SUE5QzNELElBQ1csa0JBQWtCLENBQUMsS0FBYTtRQUN6QyxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsRUFBRTtZQUN6QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztTQUN4QztJQUNILENBQUM7Ozs7O0lBSUQsSUFBSSxpQkFBaUIsQ0FBQyxLQUFhO1FBQ2pDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ3pDLENBQUM7Ozs7SUFDRCxJQUFJLGlCQUFpQjtRQUNuQixPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUM7SUFDeEMsQ0FBQzs7Ozs7O0lBS0QsSUFDSSxZQUFZLENBQUMsS0FBZTtRQUM5QixJQUFJLEtBQUssRUFBRTtZQUNULElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1NBQzdDO0lBQ0gsQ0FBQzs7OztJQUNELElBQUksWUFBWTtRQUNkLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQztJQUM3QyxDQUFDOzs7OztJQU1ELElBQUksTUFBTTtRQUNSLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDbkMsT0FBTyxLQUFLLENBQUMsUUFBUSxLQUFLLEtBQUssQ0FBQztRQUNsQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Ozs7SUFFRCxJQUFJLGdCQUFnQjtRQUNsQixJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUU7WUFDdkMsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQztTQUN0RDtRQUNELE9BQU8sRUFBRSxDQUFDO0lBQ1osQ0FBQzs7OztJQUlELGtCQUFrQjtRQUNoQixJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUMvQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3pDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3BFLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7O1lBekVGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsWUFBWTtnQkFDdEIsMmFBQTRCO2dCQUM1QixTQUFTLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztnQkFDOUIsSUFBSSxFQUFFO29CQUNKLGdCQUFnQixFQUFFLE1BQU07b0JBQ3hCLHNCQUFzQixFQUFFLG1DQUFtQztvQkFDM0Qsb0JBQW9CLEVBQUUsaUNBQWlDO29CQUN2RCx1QkFBdUIsRUFBRSxvQ0FBb0M7b0JBQzdELHVCQUF1QixFQUFFLG9DQUFvQztpQkFDOUQ7eUJBQ1EsMEJBQTBCO2FBQ3BDOzs7O1lBZFEsaUJBQWlCOzs7d0JBZ0J2QixlQUFlLFNBQUMsUUFBUTtpQ0FLeEIsS0FBSyxTQUFDLHNCQUFzQjtzQ0FPNUIsTUFBTSxTQUFDLDRCQUE0QjsyQkFZbkMsS0FBSyxTQUFDLGlCQUFpQjtpQ0FTdkIsTUFBTSxTQUFDLHVCQUF1Qjs7OztJQWpDL0IsOEJBQTBEOztJQVkxRCw0Q0FBdUc7O0lBcUJ2Ryx1Q0FBK0Y7O0lBa0JuRixzQ0FBMkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBBZnRlckNvbnRlbnRJbml0LCBDb21wb25lbnQsIENvbnRlbnRDaGlsZHJlbiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBRdWVyeUxpc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENsckFsZXJ0IH0gZnJvbSAnLi9hbGVydCc7XG5pbXBvcnQgeyBNdWx0aUFsZXJ0U2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL211bHRpLWFsZXJ0LnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItYWxlcnRzJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2FsZXJ0cy5odG1sJyxcbiAgcHJvdmlkZXJzOiBbTXVsdGlBbGVydFNlcnZpY2VdLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5hbGVydHNdJzogJ3RydWUnLFxuICAgICdbY2xhc3MuYWxlcnQtZGFuZ2VyXSc6IFwidGhpcy5jdXJyZW50QWxlcnRUeXBlID09ICdkYW5nZXInXCIsXG4gICAgJ1tjbGFzcy5hbGVydC1pbmZvXSc6IFwidGhpcy5jdXJyZW50QWxlcnRUeXBlID09ICdpbmZvJ1wiLFxuICAgICdbY2xhc3MuYWxlcnQtc3VjY2Vzc10nOiBcInRoaXMuY3VycmVudEFsZXJ0VHlwZSA9PSAnc3VjY2VzcydcIixcbiAgICAnW2NsYXNzLmFsZXJ0LXdhcm5pbmddJzogXCJ0aGlzLmN1cnJlbnRBbGVydFR5cGUgPT0gJ3dhcm5pbmcnXCIsXG4gIH0sXG4gIHN0eWxlczogWyc6aG9zdCB7IGRpc3BsYXk6IGJsb2NrIH0nXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyQWxlcnRzIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XG4gIEBDb250ZW50Q2hpbGRyZW4oQ2xyQWxlcnQpIGFsbEFsZXJ0czogUXVlcnlMaXN0PENsckFsZXJ0PjtcblxuICAvKipcbiAgICogSW5wdXQvT3V0cHV0IHRvIHN1cHBvcnQgdHdvIHdheSBiaW5kaW5nIG9uIGN1cnJlbnQgYWxlcnQgaW5kZXhcbiAgICovXG4gIEBJbnB1dCgnY2xyQ3VycmVudEFsZXJ0SW5kZXgnKVxuICBwdWJsaWMgc2V0IF9pbnB1dEN1cnJlbnRJbmRleChpbmRleDogbnVtYmVyKSB7XG4gICAgaWYgKE51bWJlci5pc0ludGVnZXIoaW5kZXgpICYmIGluZGV4ID49IDApIHtcbiAgICAgIHRoaXMubXVsdGlBbGVydFNlcnZpY2UuY3VycmVudCA9IGluZGV4O1xuICAgIH1cbiAgfVxuXG4gIEBPdXRwdXQoJ2NsckN1cnJlbnRBbGVydEluZGV4Q2hhbmdlJykgcHVibGljIGN1cnJlbnRBbGVydEluZGV4Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KGZhbHNlKTtcblxuICBzZXQgY3VycmVudEFsZXJ0SW5kZXgoaW5kZXg6IG51bWJlcikge1xuICAgIHRoaXMubXVsdGlBbGVydFNlcnZpY2UuY3VycmVudCA9IGluZGV4O1xuICB9XG4gIGdldCBjdXJyZW50QWxlcnRJbmRleCgpIHtcbiAgICByZXR1cm4gdGhpcy5tdWx0aUFsZXJ0U2VydmljZS5jdXJyZW50O1xuICB9XG5cbiAgLyoqXG4gICAqIElucHV0L091dHB1dCB0byBzdXBwb3J0IHR3byB3YXkgYmluZGluZyBvbiBjdXJyZW50IGFsZXJ0IGluc3RhbmNlXG4gICAqL1xuICBASW5wdXQoJ2NsckN1cnJlbnRBbGVydCcpXG4gIHNldCBjdXJyZW50QWxlcnQoYWxlcnQ6IENsckFsZXJ0KSB7XG4gICAgaWYgKGFsZXJ0KSB7XG4gICAgICB0aGlzLm11bHRpQWxlcnRTZXJ2aWNlLmN1cnJlbnRBbGVydCA9IGFsZXJ0O1xuICAgIH1cbiAgfVxuICBnZXQgY3VycmVudEFsZXJ0KCkge1xuICAgIHJldHVybiB0aGlzLm11bHRpQWxlcnRTZXJ2aWNlLmN1cnJlbnRBbGVydDtcbiAgfVxuICBAT3V0cHV0KCdjbHJDdXJyZW50QWxlcnRDaGFuZ2UnKSBwdWJsaWMgY3VycmVudEFsZXJ0Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxDbHJBbGVydD4oZmFsc2UpO1xuXG4gIC8qKlxuICAgKiBFbnN1cmUgd2UgYXJlIG9ubHkgZGVhbGluZyB3aXRoIGFsZXJ0cyB0aGF0IGhhdmUgbm90IGJlZW4gY2xvc2VkIHlldFxuICAgKi9cbiAgZ2V0IGFsZXJ0cygpIHtcbiAgICByZXR1cm4gdGhpcy5hbGxBbGVydHMuZmlsdGVyKGFsZXJ0ID0+IHtcbiAgICAgIHJldHVybiBhbGVydC5pc0hpZGRlbiA9PT0gZmFsc2U7XG4gICAgfSk7XG4gIH1cblxuICBnZXQgY3VycmVudEFsZXJ0VHlwZSgpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLm11bHRpQWxlcnRTZXJ2aWNlLmN1cnJlbnRBbGVydCkge1xuICAgICAgcmV0dXJuIHRoaXMubXVsdGlBbGVydFNlcnZpY2UuY3VycmVudEFsZXJ0LmFsZXJ0VHlwZTtcbiAgICB9XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHVibGljIG11bHRpQWxlcnRTZXJ2aWNlOiBNdWx0aUFsZXJ0U2VydmljZSkge31cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgdGhpcy5tdWx0aUFsZXJ0U2VydmljZS5tYW5hZ2UodGhpcy5hbGxBbGVydHMpO1xuICAgIHRoaXMubXVsdGlBbGVydFNlcnZpY2UuY2hhbmdlcy5zdWJzY3JpYmUoaW5kZXggPT4ge1xuICAgICAgdGhpcy5jdXJyZW50QWxlcnRJbmRleENoYW5nZS5uZXh0KGluZGV4KTtcbiAgICAgIHRoaXMuY3VycmVudEFsZXJ0Q2hhbmdlLm5leHQodGhpcy5tdWx0aUFsZXJ0U2VydmljZS5jdXJyZW50QWxlcnQpO1xuICAgIH0pO1xuICB9XG59XG4iXX0=