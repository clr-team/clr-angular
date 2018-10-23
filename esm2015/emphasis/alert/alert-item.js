/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';
import { AlertIconAndTypesService } from './providers/icon-and-types.service';
export class ClrAlertItem {
    /**
     * @param {?} iconService
     */
    constructor(iconService) {
        this.iconService = iconService;
    }
}
ClrAlertItem.decorators = [
    { type: Component, args: [{
                // the .alert-item selector is deprecated; the :not clause is to allow us to use static
                // examples in demos on the demo-app and website
                selector: '.alert-item:not(.static), clr-alert-item',
                template: `
        <div class="alert-icon-wrapper">
            <clr-icon class="alert-icon" 
              [attr.shape]="iconService.alertIconShape" 
              [attr.title]="iconService.alertIconTitle"></clr-icon>
        </div>
        <ng-content></ng-content>
    `,
                host: { class: 'alert-item' }
            }] }
];
/** @nocollapse */
ClrAlertItem.ctorParameters = () => [
    { type: AlertIconAndTypesService }
];
if (false) {
    /** @type {?} */
    ClrAlertItem.prototype.iconService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQtaXRlbS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImVtcGhhc2lzL2FsZXJ0L2FsZXJ0LWl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBTUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQWdCOUUsTUFBTSxPQUFPLFlBQVk7Ozs7SUFDdkIsWUFBbUIsV0FBcUM7UUFBckMsZ0JBQVcsR0FBWCxXQUFXLENBQTBCO0lBQUcsQ0FBQzs7O1lBZjdELFNBQVMsU0FBQzs7O2dCQUdULFFBQVEsRUFBRSwwQ0FBMEM7Z0JBQ3BELFFBQVEsRUFBRTs7Ozs7OztLQU9QO2dCQUNILElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUU7YUFDOUI7Ozs7WUFmUSx3QkFBd0I7Ozs7SUFpQm5CLG1DQUE0QyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBbGVydEljb25BbmRUeXBlc1NlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9pY29uLWFuZC10eXBlcy5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIC8vIHRoZSAuYWxlcnQtaXRlbSBzZWxlY3RvciBpcyBkZXByZWNhdGVkOyB0aGUgOm5vdCBjbGF1c2UgaXMgdG8gYWxsb3cgdXMgdG8gdXNlIHN0YXRpY1xuICAvLyBleGFtcGxlcyBpbiBkZW1vcyBvbiB0aGUgZGVtby1hcHAgYW5kIHdlYnNpdGVcbiAgc2VsZWN0b3I6ICcuYWxlcnQtaXRlbTpub3QoLnN0YXRpYyksIGNsci1hbGVydC1pdGVtJyxcbiAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cImFsZXJ0LWljb24td3JhcHBlclwiPlxuICAgICAgICAgICAgPGNsci1pY29uIGNsYXNzPVwiYWxlcnQtaWNvblwiIFxuICAgICAgICAgICAgICBbYXR0ci5zaGFwZV09XCJpY29uU2VydmljZS5hbGVydEljb25TaGFwZVwiIFxuICAgICAgICAgICAgICBbYXR0ci50aXRsZV09XCJpY29uU2VydmljZS5hbGVydEljb25UaXRsZVwiPjwvY2xyLWljb24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgYCxcbiAgaG9zdDogeyBjbGFzczogJ2FsZXJ0LWl0ZW0nIH0sXG59KVxuZXhwb3J0IGNsYXNzIENsckFsZXJ0SXRlbSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBpY29uU2VydmljZTogQWxlcnRJY29uQW5kVHlwZXNTZXJ2aWNlKSB7fVxufVxuIl19