/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClrAlert } from './alert';
import { MultiAlertService } from './providers/multi-alert.service';
import { ClrCommonStrings } from '../../utils/i18n/common-strings.interface';
export class ClrAlertsPager {
    /**
     * @param {?} multiAlertService
     * @param {?} commonStrings
     */
    constructor(multiAlertService, commonStrings) {
        this.multiAlertService = multiAlertService;
        this.commonStrings = commonStrings;
        this.currentAlertChange = new EventEmitter(false);
        this.currentAlertIndexChange = new EventEmitter();
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
     * Input/Output to support two way binding on current alert index
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
     * @return {?}
     */
    ngOnInit() {
        this.multiAlertServiceChanges = this.multiAlertService.changes.subscribe(index => {
            this.currentAlertIndexChange.emit(index);
            this.currentAlertChange.emit(this.multiAlertService.activeAlerts[index]);
        });
    }
    /**
     * @return {?}
     */
    pageUp() {
        this.multiAlertService.next();
    }
    /**
     * @return {?}
     */
    pageDown() {
        this.multiAlertService.previous();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.multiAlertServiceChanges.unsubscribe();
    }
}
ClrAlertsPager.decorators = [
    { type: Component, args: [{
                selector: 'clr-alerts-pager',
                template: "<!--\n  ~ Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.\n  ~ This software is released under MIT license.\n  ~ The full license information can be found in LICENSE in the root directory of this project.\n  -->\n\n<div class=\"alerts-pager-control\">\n    <div class=\"alerts-page-down\">\n        <button class=\"alerts-pager-button\" (click)=\"pageDown()\">\n            <clr-icon shape=\"caret left\" [attr.title]=\"commonStrings.previous\"></clr-icon>\n        </button>\n    </div>\n    <div class=\"alerts-pager-text\">\n        {{this.multiAlertService.current+1}} / {{this.multiAlertService.count}}\n    </div>\n    <div class=\"alerts-page-up\">\n        <button class=\"alerts-pager-button\" (click)=\"pageUp()\">\n            <clr-icon shape=\"caret right\" [attr.title]=\"commonStrings.next\"></clr-icon>\n        </button>\n    </div>\n</div>\n",
                host: { '[class.alerts-pager]': 'true' }
            }] }
];
/** @nocollapse */
ClrAlertsPager.ctorParameters = () => [
    { type: MultiAlertService },
    { type: ClrCommonStrings }
];
ClrAlertsPager.propDecorators = {
    currentAlert: [{ type: Input, args: ['clrCurrentAlert',] }],
    currentAlertChange: [{ type: Output, args: ['clrCurrentAlertChange',] }],
    currentAlertIndex: [{ type: Input, args: ['clrCurrentAlertIndex',] }],
    currentAlertIndexChange: [{ type: Output, args: ['clrCurrentAlertIndexChange',] }]
};
if (false) {
    /** @type {?} */
    ClrAlertsPager.prototype.multiAlertServiceChanges;
    /** @type {?} */
    ClrAlertsPager.prototype.currentAlertChange;
    /** @type {?} */
    ClrAlertsPager.prototype.currentAlertIndexChange;
    /** @type {?} */
    ClrAlertsPager.prototype.multiAlertService;
    /** @type {?} */
    ClrAlertsPager.prototype.commonStrings;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnRzLXBhZ2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZW1waGFzaXMvYWxlcnQvYWxlcnRzLXBhZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzFGLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDbkMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDcEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFPN0UsTUFBTSxPQUFPLGNBQWM7Ozs7O0lBK0J6QixZQUFtQixpQkFBb0MsRUFBUyxhQUErQjtRQUE1RSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQVMsa0JBQWEsR0FBYixhQUFhLENBQWtCO1FBZjlELHVCQUFrQixHQUFHLElBQUksWUFBWSxDQUFXLEtBQUssQ0FBQyxDQUFDO1FBYWxELDRCQUF1QixHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7SUFFTyxDQUFDOzs7Ozs7SUF6Qm5HLElBQ0ksWUFBWSxDQUFDLEtBQWU7UUFDOUIsSUFBSSxLQUFLLEVBQUU7WUFDVCxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztTQUM3QztJQUNILENBQUM7Ozs7SUFDRCxJQUFJLFlBQVk7UUFDZCxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUM7SUFDN0MsQ0FBQzs7Ozs7O0lBT0QsSUFDSSxpQkFBaUIsQ0FBQyxLQUFhO1FBQ2pDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ3pDLENBQUM7Ozs7SUFDRCxJQUFJLGlCQUFpQjtRQUNuQixPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUM7SUFDeEMsQ0FBQzs7OztJQU1ELFFBQVE7UUFDTixJQUFJLENBQUMsd0JBQXdCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDL0UsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN6QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUMzRSxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Ozs7SUFFRCxNQUFNO1FBQ0osSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2hDLENBQUM7Ozs7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3BDLENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLHdCQUF3QixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzlDLENBQUM7OztZQXZERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsZzNCQUFrQztnQkFDbEMsSUFBSSxFQUFFLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxFQUFFO2FBQ3pDOzs7O1lBUFEsaUJBQWlCO1lBQ2pCLGdCQUFnQjs7OzJCQWF0QixLQUFLLFNBQUMsaUJBQWlCO2lDQVV2QixNQUFNLFNBQUMsdUJBQXVCO2dDQUs5QixLQUFLLFNBQUMsc0JBQXNCO3NDQVE1QixNQUFNLFNBQUMsNEJBQTRCOzs7O0lBNUJwQyxrREFBK0M7O0lBZS9DLDRDQUF3Rjs7SUFheEYsaURBQTJGOztJQUUvRSwyQ0FBMkM7O0lBQUUsdUNBQXNDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgQ2xyQWxlcnQgfSBmcm9tICcuL2FsZXJ0JztcbmltcG9ydCB7IE11bHRpQWxlcnRTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvbXVsdGktYWxlcnQuc2VydmljZSc7XG5pbXBvcnQgeyBDbHJDb21tb25TdHJpbmdzIH0gZnJvbSAnLi4vLi4vdXRpbHMvaTE4bi9jb21tb24tc3RyaW5ncy5pbnRlcmZhY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItYWxlcnRzLXBhZ2VyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2FsZXJ0cy1wYWdlci5odG1sJyxcbiAgaG9zdDogeyAnW2NsYXNzLmFsZXJ0cy1wYWdlcl0nOiAndHJ1ZScgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyQWxlcnRzUGFnZXIgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgbXVsdGlBbGVydFNlcnZpY2VDaGFuZ2VzOiBTdWJzY3JpcHRpb247XG5cbiAgLyoqXG4gICAqIElucHV0L091dHB1dCB0byBzdXBwb3J0IHR3byB3YXkgYmluZGluZyBvbiBjdXJyZW50IGFsZXJ0IGluc3RhbmNlXG4gICAqL1xuICBASW5wdXQoJ2NsckN1cnJlbnRBbGVydCcpXG4gIHNldCBjdXJyZW50QWxlcnQoYWxlcnQ6IENsckFsZXJ0KSB7XG4gICAgaWYgKGFsZXJ0KSB7XG4gICAgICB0aGlzLm11bHRpQWxlcnRTZXJ2aWNlLmN1cnJlbnRBbGVydCA9IGFsZXJ0O1xuICAgIH1cbiAgfVxuICBnZXQgY3VycmVudEFsZXJ0KCkge1xuICAgIHJldHVybiB0aGlzLm11bHRpQWxlcnRTZXJ2aWNlLmN1cnJlbnRBbGVydDtcbiAgfVxuXG4gIEBPdXRwdXQoJ2NsckN1cnJlbnRBbGVydENoYW5nZScpIGN1cnJlbnRBbGVydENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Q2xyQWxlcnQ+KGZhbHNlKTtcblxuICAvKipcbiAgICogSW5wdXQvT3V0cHV0IHRvIHN1cHBvcnQgdHdvIHdheSBiaW5kaW5nIG9uIGN1cnJlbnQgYWxlcnQgaW5kZXhcbiAgICovXG4gIEBJbnB1dCgnY2xyQ3VycmVudEFsZXJ0SW5kZXgnKVxuICBzZXQgY3VycmVudEFsZXJ0SW5kZXgoaW5kZXg6IG51bWJlcikge1xuICAgIHRoaXMubXVsdGlBbGVydFNlcnZpY2UuY3VycmVudCA9IGluZGV4O1xuICB9XG4gIGdldCBjdXJyZW50QWxlcnRJbmRleCgpIHtcbiAgICByZXR1cm4gdGhpcy5tdWx0aUFsZXJ0U2VydmljZS5jdXJyZW50O1xuICB9XG5cbiAgQE91dHB1dCgnY2xyQ3VycmVudEFsZXJ0SW5kZXhDaGFuZ2UnKSBjdXJyZW50QWxlcnRJbmRleENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBtdWx0aUFsZXJ0U2VydmljZTogTXVsdGlBbGVydFNlcnZpY2UsIHB1YmxpYyBjb21tb25TdHJpbmdzOiBDbHJDb21tb25TdHJpbmdzKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMubXVsdGlBbGVydFNlcnZpY2VDaGFuZ2VzID0gdGhpcy5tdWx0aUFsZXJ0U2VydmljZS5jaGFuZ2VzLnN1YnNjcmliZShpbmRleCA9PiB7XG4gICAgICB0aGlzLmN1cnJlbnRBbGVydEluZGV4Q2hhbmdlLmVtaXQoaW5kZXgpO1xuICAgICAgdGhpcy5jdXJyZW50QWxlcnRDaGFuZ2UuZW1pdCh0aGlzLm11bHRpQWxlcnRTZXJ2aWNlLmFjdGl2ZUFsZXJ0c1tpbmRleF0pO1xuICAgIH0pO1xuICB9XG5cbiAgcGFnZVVwKCkge1xuICAgIHRoaXMubXVsdGlBbGVydFNlcnZpY2UubmV4dCgpO1xuICB9XG5cbiAgcGFnZURvd24oKSB7XG4gICAgdGhpcy5tdWx0aUFsZXJ0U2VydmljZS5wcmV2aW91cygpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5tdWx0aUFsZXJ0U2VydmljZUNoYW5nZXMudW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIl19