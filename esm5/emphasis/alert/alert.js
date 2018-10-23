/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { ChangeDetectorRef, Component, EventEmitter, Input, Optional, Output } from '@angular/core';
// providers
import { AlertIconAndTypesService } from './providers/icon-and-types.service';
import { MultiAlertService } from './providers/multi-alert.service';
import { ClrCommonStrings } from '../../utils/i18n/common-strings.interface';
var ClrAlert = /** @class */ (function () {
    function ClrAlert(iconService, cdr, multiAlertService, commonStrings) {
        this.iconService = iconService;
        this.cdr = cdr;
        this.multiAlertService = multiAlertService;
        this.commonStrings = commonStrings;
        this.isSmall = false;
        this.closable = true;
        this.isAppLevel = false;
        this._closed = false;
        this._closedChanged = new EventEmitter(false);
        this.previouslyHidden = false;
        this.hidden = false;
    }
    Object.defineProperty(ClrAlert.prototype, "alertType", {
        get: /**
         * @return {?}
         */
        function () {
            return this.iconService.alertType;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this.iconService.alertType = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrAlert.prototype, "alertIconShape", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.iconService.alertIconShape = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrAlert.prototype, "alertClass", {
        get: /**
         * @return {?}
         */
        function () {
            return this.iconService.iconInfoFromType(this.iconService.alertType).cssClass;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ClrAlert.prototype.detectChangesIfNeeded = /**
     * @return {?}
     */
    function () {
        if (this.previouslyHidden !== this.hidden) {
            this.previouslyHidden = this.hidden;
            this.cdr.detectChanges();
        }
    };
    Object.defineProperty(ClrAlert.prototype, "isHidden", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.multiAlertService) {
                if (this.multiAlertService.currentAlert === this) {
                    if (this.hidden === true) {
                        this.previouslyHidden = true;
                        this.hidden = false;
                    }
                }
                else if (this.hidden === false) {
                    this.previouslyHidden = false;
                    this.hidden = true;
                }
                this.detectChangesIfNeeded();
            }
            return this.hidden;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ClrAlert.prototype.close = /**
     * @return {?}
     */
    function () {
        if (!this.closable) {
            return;
        }
        this._closed = true;
        if (this.multiAlertService) {
            this.multiAlertService.close();
        }
        this._closedChanged.emit(true);
    };
    /**
     * @return {?}
     */
    ClrAlert.prototype.open = /**
     * @return {?}
     */
    function () {
        this._closed = false;
        this._closedChanged.emit(false);
    };
    ClrAlert.decorators = [
        { type: Component, args: [{
                    selector: 'clr-alert',
                    providers: [AlertIconAndTypesService],
                    template: "<!--\n  ~ Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.\n  ~ This software is released under MIT license.\n  ~ The full license information can be found in LICENSE in the root directory of this project.\n  -->\n\n<div\n    *ngIf=\"!_closed\"\n    class=\"alert\"\n    [ngClass]=\"alertClass\"\n    [class.alert-hidden]=\"isHidden\"\n    [class.alert-sm]=\"isSmall\"\n    [class.alert-app-level]=\"isAppLevel\"\n    role=\"alert\">\n    <div class=\"alert-items\">\n        <ng-content></ng-content>\n    </div>\n    <button type=\"button\" class=\"close\" *ngIf=\"closable\" (click)=\"close()\">\n        <clr-icon shape=\"close\" [attr.title]=\"commonStrings.close\"></clr-icon>\n    </button>\n</div>\n",
                    styles: [':host { display: block; }']
                }] }
    ];
    /** @nocollapse */
    ClrAlert.ctorParameters = function () { return [
        { type: AlertIconAndTypesService },
        { type: ChangeDetectorRef },
        { type: MultiAlertService, decorators: [{ type: Optional }] },
        { type: ClrCommonStrings }
    ]; };
    ClrAlert.propDecorators = {
        isSmall: [{ type: Input, args: ['clrAlertSizeSmall',] }],
        closable: [{ type: Input, args: ['clrAlertClosable',] }],
        isAppLevel: [{ type: Input, args: ['clrAlertAppLevel',] }],
        _closed: [{ type: Input, args: ['clrAlertClosed',] }],
        _closedChanged: [{ type: Output, args: ['clrAlertClosedChange',] }],
        alertType: [{ type: Input, args: ['clrAlertType',] }],
        alertIconShape: [{ type: Input, args: ['clrAlertIcon',] }]
    };
    return ClrAlert;
}());
export { ClrAlert };
if (false) {
    /** @type {?} */
    ClrAlert.prototype.isSmall;
    /** @type {?} */
    ClrAlert.prototype.closable;
    /** @type {?} */
    ClrAlert.prototype.isAppLevel;
    /** @type {?} */
    ClrAlert.prototype._closed;
    /** @type {?} */
    ClrAlert.prototype._closedChanged;
    /** @type {?} */
    ClrAlert.prototype.previouslyHidden;
    /** @type {?} */
    ClrAlert.prototype.hidden;
    /** @type {?} */
    ClrAlert.prototype.iconService;
    /** @type {?} */
    ClrAlert.prototype.cdr;
    /** @type {?} */
    ClrAlert.prototype.multiAlertService;
    /** @type {?} */
    ClrAlert.prototype.commonStrings;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJlbXBoYXNpcy9hbGVydC9hbGVydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFLQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFHcEcsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDOUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDcEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFFN0U7SUFPRSxrQkFDUyxXQUFxQyxFQUNyQyxHQUFzQixFQUNWLGlCQUFvQyxFQUNoRCxhQUErQjtRQUgvQixnQkFBVyxHQUFYLFdBQVcsQ0FBMEI7UUFDckMsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFDVixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ2hELGtCQUFhLEdBQWIsYUFBYSxDQUFrQjtRQUdaLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFDMUIsYUFBUSxHQUFZLElBQUksQ0FBQztRQUN6QixlQUFVLEdBQVksS0FBSyxDQUFDO1FBRTlCLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFDbEIsbUJBQWMsR0FBMEIsSUFBSSxZQUFZLENBQVUsS0FBSyxDQUFDLENBQUM7UUFtQmpHLHFCQUFnQixHQUFHLEtBQUssQ0FBQztRQUN6QixXQUFNLEdBQUcsS0FBSyxDQUFDO0lBM0JwQixDQUFDO0lBU0osc0JBQ0ksK0JBQVM7Ozs7UUFHYjtZQUNFLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUM7UUFDcEMsQ0FBQzs7Ozs7UUFORCxVQUNjLEdBQVc7WUFDdkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDO1FBQ25D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bnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3B0aW9uYWwsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vLyBwcm92aWRlcnNcbmltcG9ydCB7IEFsZXJ0SWNvbkFuZFR5cGVzU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2ljb24tYW5kLXR5cGVzLnNlcnZpY2UnO1xuaW1wb3J0IHsgTXVsdGlBbGVydFNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9tdWx0aS1hbGVydC5zZXJ2aWNlJztcbmltcG9ydCB7IENsckNvbW1vblN0cmluZ3MgfSBmcm9tICcuLi8uLi91dGlscy9pMThuL2NvbW1vbi1zdHJpbmdzLmludGVyZmFjZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci1hbGVydCcsXG4gIHByb3ZpZGVyczogW0FsZXJ0SWNvbkFuZFR5cGVzU2VydmljZV0sXG4gIHRlbXBsYXRlVXJsOiAnLi9hbGVydC5odG1sJyxcbiAgc3R5bGVzOiBbJzpob3N0IHsgZGlzcGxheTogYmxvY2s7IH0nXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyQWxlcnQge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgaWNvblNlcnZpY2U6IEFsZXJ0SWNvbkFuZFR5cGVzU2VydmljZSxcbiAgICBwdWJsaWMgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBAT3B0aW9uYWwoKSBwdWJsaWMgbXVsdGlBbGVydFNlcnZpY2U6IE11bHRpQWxlcnRTZXJ2aWNlLFxuICAgIHB1YmxpYyBjb21tb25TdHJpbmdzOiBDbHJDb21tb25TdHJpbmdzXG4gICkge31cblxuICBASW5wdXQoJ2NsckFsZXJ0U2l6ZVNtYWxsJykgaXNTbWFsbDogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoJ2NsckFsZXJ0Q2xvc2FibGUnKSBjbG9zYWJsZTogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgnY2xyQWxlcnRBcHBMZXZlbCcpIGlzQXBwTGV2ZWw6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBASW5wdXQoJ2NsckFsZXJ0Q2xvc2VkJykgX2Nsb3NlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBAT3V0cHV0KCdjbHJBbGVydENsb3NlZENoYW5nZScpIF9jbG9zZWRDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KGZhbHNlKTtcblxuICBASW5wdXQoJ2NsckFsZXJ0VHlwZScpXG4gIHNldCBhbGVydFR5cGUodmFsOiBzdHJpbmcpIHtcbiAgICB0aGlzLmljb25TZXJ2aWNlLmFsZXJ0VHlwZSA9IHZhbDtcbiAgfVxuICBnZXQgYWxlcnRUeXBlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuaWNvblNlcnZpY2UuYWxlcnRUeXBlO1xuICB9XG5cbiAgQElucHV0KCdjbHJBbGVydEljb24nKVxuICBzZXQgYWxlcnRJY29uU2hhcGUodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuaWNvblNlcnZpY2UuYWxlcnRJY29uU2hhcGUgPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCBhbGVydENsYXNzKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuaWNvblNlcnZpY2UuaWNvbkluZm9Gcm9tVHlwZSh0aGlzLmljb25TZXJ2aWNlLmFsZXJ0VHlwZSkuY3NzQ2xhc3M7XG4gIH1cblxuICBwcml2YXRlIHByZXZpb3VzbHlIaWRkZW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBoaWRkZW4gPSBmYWxzZTtcblxuICBwcml2YXRlIGRldGVjdENoYW5nZXNJZk5lZWRlZCgpIHtcbiAgICBpZiAodGhpcy5wcmV2aW91c2x5SGlkZGVuICE9PSB0aGlzLmhpZGRlbikge1xuICAgICAgdGhpcy5wcmV2aW91c2x5SGlkZGVuID0gdGhpcy5oaWRkZW47XG4gICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGlzSGlkZGVuKCkge1xuICAgIGlmICh0aGlzLm11bHRpQWxlcnRTZXJ2aWNlKSB7XG4gICAgICBpZiAodGhpcy5tdWx0aUFsZXJ0U2VydmljZS5jdXJyZW50QWxlcnQgPT09IHRoaXMpIHtcbiAgICAgICAgaWYgKHRoaXMuaGlkZGVuID09PSB0cnVlKSB7XG4gICAgICAgICAgdGhpcy5wcmV2aW91c2x5SGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgICB0aGlzLmhpZGRlbiA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuaGlkZGVuID09PSBmYWxzZSkge1xuICAgICAgICB0aGlzLnByZXZpb3VzbHlIaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5oaWRkZW4gPSB0cnVlO1xuICAgICAgfVxuICAgICAgdGhpcy5kZXRlY3RDaGFuZ2VzSWZOZWVkZWQoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oaWRkZW47XG4gIH1cblxuICBjbG9zZSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuY2xvc2FibGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fY2xvc2VkID0gdHJ1ZTtcbiAgICBpZiAodGhpcy5tdWx0aUFsZXJ0U2VydmljZSkge1xuICAgICAgdGhpcy5tdWx0aUFsZXJ0U2VydmljZS5jbG9zZSgpO1xuICAgIH1cbiAgICB0aGlzLl9jbG9zZWRDaGFuZ2VkLmVtaXQodHJ1ZSk7XG4gIH1cblxuICBvcGVuKCk6IHZvaWQge1xuICAgIHRoaXMuX2Nsb3NlZCA9IGZhbHNlO1xuICAgIHRoaXMuX2Nsb3NlZENoYW5nZWQuZW1pdChmYWxzZSk7XG4gIH1cbn1cbiJdfQ==