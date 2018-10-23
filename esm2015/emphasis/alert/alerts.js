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
                    '[class.alert-danger]': "this.currentAlertType == 'danger' || this.currentAlertType == 'alert-danger'",
                    '[class.alert-info]': "this.currentAlertType == 'info' || this.currentAlertType == 'alert-info'",
                    '[class.alert-success]': "this.currentAlertType == 'success' || this.currentAlertType == 'alert-success'",
                    '[class.alert-warning]': "this.currentAlertType == 'warning' || this.currentAlertType == 'alert-warning'",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnRzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZW1waGFzaXMvYWxlcnQvYWxlcnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtBLE9BQU8sRUFBb0IsU0FBUyxFQUFFLGVBQWUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUNuQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQzs7QUFnQnBFLE1BQU0sT0FBTyxTQUFTOzs7O0lBb0RwQixZQUFtQixpQkFBb0M7UUFBcEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQXZDViw0QkFBdUIsR0FBRyxJQUFJLFlBQVksQ0FBUyxLQUFLLENBQUMsQ0FBQztRQXFCL0QsdUJBQWtCLEdBQUcsSUFBSSxZQUFZLENBQVcsS0FBSyxDQUFDLENBQUM7SUFrQnJDLENBQUM7Ozs7OztJQTlDM0QsSUFDVyxrQkFBa0IsQ0FBQyxLQUFhO1FBQ3pDLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxFQUFFO1lBQ3pDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1NBQ3hDO0lBQ0gsQ0FBQzs7Ozs7SUFJRCxJQUFJLGlCQUFpQixDQUFDLEtBQWE7UUFDakMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDekMsQ0FBQzs7OztJQUNELElBQUksaUJBQWlCO1FBQ25CLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQztJQUN4QyxDQUFDOzs7Ozs7SUFLRCxJQUNJLFlBQVksQ0FBQyxLQUFlO1FBQzlCLElBQUksS0FBSyxFQUFFO1lBQ1QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7U0FDN0M7SUFDSCxDQUFDOzs7O0lBQ0QsSUFBSSxZQUFZO1FBQ2QsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDO0lBQzdDLENBQUM7Ozs7O0lBTUQsSUFBSSxNQUFNO1FBQ1IsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNuQyxPQUFPLEtBQUssQ0FBQyxRQUFRLEtBQUssS0FBSyxDQUFDO1FBQ2xDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7OztJQUVELElBQUksZ0JBQWdCO1FBQ2xCLElBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRTtZQUN2QyxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDO1NBQ3REO1FBQ0QsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDOzs7O0lBSUQsa0JBQWtCO1FBQ2hCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQy9DLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDcEUsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOzs7WUF6RUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxZQUFZO2dCQUN0QiwyYUFBNEI7Z0JBQzVCLFNBQVMsRUFBRSxDQUFDLGlCQUFpQixDQUFDO2dCQUM5QixJQUFJLEVBQUU7b0JBQ0osZ0JBQWdCLEVBQUUsTUFBTTtvQkFDeEIsc0JBQXNCLEVBQUUsOEVBQThFO29CQUN0RyxvQkFBb0IsRUFBRSwwRUFBMEU7b0JBQ2hHLHVCQUF1QixFQUFFLGdGQUFnRjtvQkFDekcsdUJBQXVCLEVBQUUsZ0ZBQWdGO2lCQUMxRzt5QkFDUSwwQkFBMEI7YUFDcEM7Ozs7WUFmUSxpQkFBaUI7Ozt3QkFpQnZCLGVBQWUsU0FBQyxRQUFRO2lDQUt4QixLQUFLLFNBQUMsc0JBQXNCO3NDQU81QixNQUFNLFNBQUMsNEJBQTRCOzJCQVluQyxLQUFLLFNBQUMsaUJBQWlCO2lDQVN2QixNQUFNLFNBQUMsdUJBQXVCOzs7O0lBakMvQiw4QkFBMEQ7O0lBWTFELDRDQUF1Rzs7SUFxQnZHLHVDQUErRjs7SUFrQm5GLHNDQUEyQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IEFmdGVyQ29udGVudEluaXQsIENvbXBvbmVudCwgQ29udGVudENoaWxkcmVuLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQsIFF1ZXJ5TGlzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2xyQWxlcnQgfSBmcm9tICcuL2FsZXJ0JztcbmltcG9ydCB7IE11bHRpQWxlcnRTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvbXVsdGktYWxlcnQuc2VydmljZSc7XG5cbi8vIHRoZSAnYWxlcnQtKicgYWxlcnQgdHlwZXMgYXJlIGRlcHJlY2F0ZWQgYW5kIHNob3VsZCBiZSByZW1vdmVkIGluIDAuMTIgb3IgbGF0ZXJcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci1hbGVydHMnLFxuICB0ZW1wbGF0ZVVybDogJy4vYWxlcnRzLmh0bWwnLFxuICBwcm92aWRlcnM6IFtNdWx0aUFsZXJ0U2VydmljZV0sXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmFsZXJ0c10nOiAndHJ1ZScsXG4gICAgJ1tjbGFzcy5hbGVydC1kYW5nZXJdJzogXCJ0aGlzLmN1cnJlbnRBbGVydFR5cGUgPT0gJ2RhbmdlcicgfHwgdGhpcy5jdXJyZW50QWxlcnRUeXBlID09ICdhbGVydC1kYW5nZXInXCIsXG4gICAgJ1tjbGFzcy5hbGVydC1pbmZvXSc6IFwidGhpcy5jdXJyZW50QWxlcnRUeXBlID09ICdpbmZvJyB8fCB0aGlzLmN1cnJlbnRBbGVydFR5cGUgPT0gJ2FsZXJ0LWluZm8nXCIsXG4gICAgJ1tjbGFzcy5hbGVydC1zdWNjZXNzXSc6IFwidGhpcy5jdXJyZW50QWxlcnRUeXBlID09ICdzdWNjZXNzJyB8fCB0aGlzLmN1cnJlbnRBbGVydFR5cGUgPT0gJ2FsZXJ0LXN1Y2Nlc3MnXCIsXG4gICAgJ1tjbGFzcy5hbGVydC13YXJuaW5nXSc6IFwidGhpcy5jdXJyZW50QWxlcnRUeXBlID09ICd3YXJuaW5nJyB8fCB0aGlzLmN1cnJlbnRBbGVydFR5cGUgPT0gJ2FsZXJ0LXdhcm5pbmcnXCIsXG4gIH0sXG4gIHN0eWxlczogWyc6aG9zdCB7IGRpc3BsYXk6IGJsb2NrIH0nXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyQWxlcnRzIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XG4gIEBDb250ZW50Q2hpbGRyZW4oQ2xyQWxlcnQpIGFsbEFsZXJ0czogUXVlcnlMaXN0PENsckFsZXJ0PjtcblxuICAvKipcbiAgICogSW5wdXQvT3V0cHV0IHRvIHN1cHBvcnQgdHdvIHdheSBiaW5kaW5nIG9uIGN1cnJlbnQgYWxlcnQgaW5kZXhcbiAgICovXG4gIEBJbnB1dCgnY2xyQ3VycmVudEFsZXJ0SW5kZXgnKVxuICBwdWJsaWMgc2V0IF9pbnB1dEN1cnJlbnRJbmRleChpbmRleDogbnVtYmVyKSB7XG4gICAgaWYgKE51bWJlci5pc0ludGVnZXIoaW5kZXgpICYmIGluZGV4ID49IDApIHtcbiAgICAgIHRoaXMubXVsdGlBbGVydFNlcnZpY2UuY3VycmVudCA9IGluZGV4O1xuICAgIH1cbiAgfVxuXG4gIEBPdXRwdXQoJ2NsckN1cnJlbnRBbGVydEluZGV4Q2hhbmdlJykgcHVibGljIGN1cnJlbnRBbGVydEluZGV4Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KGZhbHNlKTtcblxuICBzZXQgY3VycmVudEFsZXJ0SW5kZXgoaW5kZXg6IG51bWJlcikge1xuICAgIHRoaXMubXVsdGlBbGVydFNlcnZpY2UuY3VycmVudCA9IGluZGV4O1xuICB9XG4gIGdldCBjdXJyZW50QWxlcnRJbmRleCgpIHtcbiAgICByZXR1cm4gdGhpcy5tdWx0aUFsZXJ0U2VydmljZS5jdXJyZW50O1xuICB9XG5cbiAgLyoqXG4gICAqIElucHV0L091dHB1dCB0byBzdXBwb3J0IHR3byB3YXkgYmluZGluZyBvbiBjdXJyZW50IGFsZXJ0IGluc3RhbmNlXG4gICAqL1xuICBASW5wdXQoJ2NsckN1cnJlbnRBbGVydCcpXG4gIHNldCBjdXJyZW50QWxlcnQoYWxlcnQ6IENsckFsZXJ0KSB7XG4gICAgaWYgKGFsZXJ0KSB7XG4gICAgICB0aGlzLm11bHRpQWxlcnRTZXJ2aWNlLmN1cnJlbnRBbGVydCA9IGFsZXJ0O1xuICAgIH1cbiAgfVxuICBnZXQgY3VycmVudEFsZXJ0KCkge1xuICAgIHJldHVybiB0aGlzLm11bHRpQWxlcnRTZXJ2aWNlLmN1cnJlbnRBbGVydDtcbiAgfVxuICBAT3V0cHV0KCdjbHJDdXJyZW50QWxlcnRDaGFuZ2UnKSBwdWJsaWMgY3VycmVudEFsZXJ0Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxDbHJBbGVydD4oZmFsc2UpO1xuXG4gIC8qKlxuICAgKiBFbnN1cmUgd2UgYXJlIG9ubHkgZGVhbGluZyB3aXRoIGFsZXJ0cyB0aGF0IGhhdmUgbm90IGJlZW4gY2xvc2VkIHlldFxuICAgKi9cbiAgZ2V0IGFsZXJ0cygpIHtcbiAgICByZXR1cm4gdGhpcy5hbGxBbGVydHMuZmlsdGVyKGFsZXJ0ID0+IHtcbiAgICAgIHJldHVybiBhbGVydC5pc0hpZGRlbiA9PT0gZmFsc2U7XG4gICAgfSk7XG4gIH1cblxuICBnZXQgY3VycmVudEFsZXJ0VHlwZSgpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLm11bHRpQWxlcnRTZXJ2aWNlLmN1cnJlbnRBbGVydCkge1xuICAgICAgcmV0dXJuIHRoaXMubXVsdGlBbGVydFNlcnZpY2UuY3VycmVudEFsZXJ0LmFsZXJ0VHlwZTtcbiAgICB9XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHVibGljIG11bHRpQWxlcnRTZXJ2aWNlOiBNdWx0aUFsZXJ0U2VydmljZSkge31cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgdGhpcy5tdWx0aUFsZXJ0U2VydmljZS5tYW5hZ2UodGhpcy5hbGxBbGVydHMpO1xuICAgIHRoaXMubXVsdGlBbGVydFNlcnZpY2UuY2hhbmdlcy5zdWJzY3JpYmUoaW5kZXggPT4ge1xuICAgICAgdGhpcy5jdXJyZW50QWxlcnRJbmRleENoYW5nZS5uZXh0KGluZGV4KTtcbiAgICAgIHRoaXMuY3VycmVudEFsZXJ0Q2hhbmdlLm5leHQodGhpcy5tdWx0aUFsZXJ0U2VydmljZS5jdXJyZW50QWxlcnQpO1xuICAgIH0pO1xuICB9XG59XG4iXX0=