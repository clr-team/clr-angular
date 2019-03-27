/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
export class ClrAlert {
    /**
     * @param {?} iconService
     * @param {?} cdr
     * @param {?} multiAlertService
     * @param {?} commonStrings
     */
    constructor(iconService, cdr, multiAlertService, commonStrings) {
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
    /**
     * @param {?} val
     * @return {?}
     */
    set alertType(val) {
        this.iconService.alertType = val;
    }
    /**
     * @return {?}
     */
    get alertType() {
        return this.iconService.alertType;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set alertIconShape(value) {
        this.iconService.alertIconShape = value;
    }
    /**
     * @return {?}
     */
    get alertClass() {
        return this.iconService.iconInfoFromType(this.iconService.alertType).cssClass;
    }
    /**
     * @private
     * @return {?}
     */
    detectChangesIfNeeded() {
        if (this.previouslyHidden !== this.hidden) {
            this.previouslyHidden = this.hidden;
            this.cdr.detectChanges();
        }
    }
    /**
     * @return {?}
     */
    get isHidden() {
        if (this.multiAlertService) {
            // change detection issue in production mode causes currentAlert to be undefined when only the first alert exists
            // https://github.com/vmware/clarity/issues/2430
            if (this.multiAlertService.currentAlert === this || this.multiAlertService.count === 0) {
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
    }
    /**
     * @return {?}
     */
    close() {
        if (!this.closable) {
            return;
        }
        this._closed = true;
        if (this.multiAlertService) {
            this.multiAlertService.close();
        }
        this._closedChanged.emit(true);
    }
    /**
     * @return {?}
     */
    open() {
        this._closed = false;
        this._closedChanged.emit(false);
    }
}
ClrAlert.decorators = [
    { type: Component, args: [{
                selector: 'clr-alert',
                providers: [AlertIconAndTypesService],
                template: "<!--\n  ~ Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.\n  ~ This software is released under MIT license.\n  ~ The full license information can be found in LICENSE in the root directory of this project.\n  -->\n\n<div\n    *ngIf=\"!_closed\"\n    class=\"alert\"\n    [ngClass]=\"alertClass\"\n    [class.alert-hidden]=\"isHidden\"\n    [class.alert-sm]=\"isSmall\"\n    [class.alert-app-level]=\"isAppLevel\"\n    role=\"alert\">\n    <div class=\"alert-items\">\n        <ng-content></ng-content>\n    </div>\n    <button type=\"button\" class=\"close\" *ngIf=\"closable\" (click)=\"close()\">\n        <clr-icon shape=\"close\" [attr.title]=\"commonStrings.close\"></clr-icon>\n    </button>\n</div>\n",
                styles: [':host { display: block; }']
            }] }
];
/** @nocollapse */
ClrAlert.ctorParameters = () => [
    { type: AlertIconAndTypesService },
    { type: ChangeDetectorRef },
    { type: MultiAlertService, decorators: [{ type: Optional }] },
    { type: ClrCommonStrings }
];
ClrAlert.propDecorators = {
    isSmall: [{ type: Input, args: ['clrAlertSizeSmall',] }],
    closable: [{ type: Input, args: ['clrAlertClosable',] }],
    isAppLevel: [{ type: Input, args: ['clrAlertAppLevel',] }],
    _closed: [{ type: Input, args: ['clrAlertClosed',] }],
    _closedChanged: [{ type: Output, args: ['clrAlertClosedChange',] }],
    alertType: [{ type: Input, args: ['clrAlertType',] }],
    alertIconShape: [{ type: Input, args: ['clrAlertIcon',] }]
};
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
    /**
     * @type {?}
     * @private
     */
    ClrAlert.prototype.previouslyHidden;
    /**
     * @type {?}
     * @private
     */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJlbXBoYXNpcy9hbGVydC9hbGVydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFLQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFHcEcsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDOUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDcEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFRN0UsTUFBTSxPQUFPLFFBQVE7Ozs7Ozs7SUFDbkIsWUFDUyxXQUFxQyxFQUNyQyxHQUFzQixFQUNWLGlCQUFvQyxFQUNoRCxhQUErQjtRQUgvQixnQkFBVyxHQUFYLFdBQVcsQ0FBMEI7UUFDckMsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFDVixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ2hELGtCQUFhLEdBQWIsYUFBYSxDQUFrQjtRQUdaLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFDMUIsYUFBUSxHQUFZLElBQUksQ0FBQztRQUN6QixlQUFVLEdBQVksS0FBSyxDQUFDO1FBRTlCLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFDbEIsbUJBQWMsR0FBMEIsSUFBSSxZQUFZLENBQVUsS0FBSyxDQUFDLENBQUM7UUFtQmpHLHFCQUFnQixHQUFHLEtBQUssQ0FBQztRQUN6QixXQUFNLEdBQUcsS0FBSyxDQUFDO0lBM0JwQixDQUFDOzs7OztJQVNKLElBQ0ksU0FBUyxDQUFDLEdBQVc7UUFDdkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDO0lBQ25DLENBQUM7Ozs7SUFDRCxJQUFJLFNBQVM7UUFDWCxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDO0lBQ3BDLENBQUM7Ozs7O0lBRUQsSUFDSSxjQUFjLENBQUMsS0FBYTtRQUM5QixJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7SUFDMUMsQ0FBQzs7OztJQUVELElBQUksVUFBVTtRQUNaLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztJQUNoRixDQUFDOzs7OztJQUtPLHFCQUFxQjtRQUMzQixJQUFJLElBQUksQ0FBQyxnQkFBZ0IsS0FBSyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ3pDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ3BDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDMUI7SUFDSCxDQUFDOzs7O0lBRUQsSUFBSSxRQUFRO1FBQ1YsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDMUIsaUhBQWlIO1lBQ2pILGdEQUFnRDtZQUNoRCxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEtBQUssQ0FBQyxFQUFFO2dCQUN0RixJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssSUFBSSxFQUFFO29CQUN4QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO29CQUM3QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztpQkFDckI7YUFDRjtpQkFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssS0FBSyxFQUFFO2dCQUNoQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO2dCQUM5QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQzthQUNwQjtZQUNELElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1NBQzlCO1FBRUQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7Ozs7SUFFRCxLQUFLO1FBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDbEIsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDMUIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ2hDO1FBQ0QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakMsQ0FBQzs7OztJQUVELElBQUk7UUFDRixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNsQyxDQUFDOzs7WUFqRkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxXQUFXO2dCQUNyQixTQUFTLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQztnQkFDckMsd3RCQUEyQjt5QkFDbEIsMkJBQTJCO2FBQ3JDOzs7O1lBVFEsd0JBQXdCO1lBSHhCLGlCQUFpQjtZQUlqQixpQkFBaUIsdUJBYXJCLFFBQVE7WUFaSixnQkFBZ0I7OztzQkFnQnRCLEtBQUssU0FBQyxtQkFBbUI7dUJBQ3pCLEtBQUssU0FBQyxrQkFBa0I7eUJBQ3hCLEtBQUssU0FBQyxrQkFBa0I7c0JBRXhCLEtBQUssU0FBQyxnQkFBZ0I7NkJBQ3RCLE1BQU0sU0FBQyxzQkFBc0I7d0JBRTdCLEtBQUssU0FBQyxjQUFjOzZCQVFwQixLQUFLLFNBQUMsY0FBYzs7OztJQWZyQiwyQkFBcUQ7O0lBQ3JELDRCQUFvRDs7SUFDcEQsOEJBQXVEOztJQUV2RCwyQkFBa0Q7O0lBQ2xELGtDQUF5Rzs7Ozs7SUFtQnpHLG9DQUFpQzs7Ozs7SUFDakMsMEJBQXVCOztJQS9CckIsK0JBQTRDOztJQUM1Qyx1QkFBNkI7O0lBQzdCLHFDQUF1RDs7SUFDdkQsaUNBQXNDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3B0aW9uYWwsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vLyBwcm92aWRlcnNcbmltcG9ydCB7IEFsZXJ0SWNvbkFuZFR5cGVzU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2ljb24tYW5kLXR5cGVzLnNlcnZpY2UnO1xuaW1wb3J0IHsgTXVsdGlBbGVydFNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9tdWx0aS1hbGVydC5zZXJ2aWNlJztcbmltcG9ydCB7IENsckNvbW1vblN0cmluZ3MgfSBmcm9tICcuLi8uLi91dGlscy9pMThuL2NvbW1vbi1zdHJpbmdzLmludGVyZmFjZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci1hbGVydCcsXG4gIHByb3ZpZGVyczogW0FsZXJ0SWNvbkFuZFR5cGVzU2VydmljZV0sXG4gIHRlbXBsYXRlVXJsOiAnLi9hbGVydC5odG1sJyxcbiAgc3R5bGVzOiBbJzpob3N0IHsgZGlzcGxheTogYmxvY2s7IH0nXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyQWxlcnQge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgaWNvblNlcnZpY2U6IEFsZXJ0SWNvbkFuZFR5cGVzU2VydmljZSxcbiAgICBwdWJsaWMgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBAT3B0aW9uYWwoKSBwdWJsaWMgbXVsdGlBbGVydFNlcnZpY2U6IE11bHRpQWxlcnRTZXJ2aWNlLFxuICAgIHB1YmxpYyBjb21tb25TdHJpbmdzOiBDbHJDb21tb25TdHJpbmdzXG4gICkge31cblxuICBASW5wdXQoJ2NsckFsZXJ0U2l6ZVNtYWxsJykgaXNTbWFsbDogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoJ2NsckFsZXJ0Q2xvc2FibGUnKSBjbG9zYWJsZTogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgnY2xyQWxlcnRBcHBMZXZlbCcpIGlzQXBwTGV2ZWw6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBASW5wdXQoJ2NsckFsZXJ0Q2xvc2VkJykgX2Nsb3NlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBAT3V0cHV0KCdjbHJBbGVydENsb3NlZENoYW5nZScpIF9jbG9zZWRDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KGZhbHNlKTtcblxuICBASW5wdXQoJ2NsckFsZXJ0VHlwZScpXG4gIHNldCBhbGVydFR5cGUodmFsOiBzdHJpbmcpIHtcbiAgICB0aGlzLmljb25TZXJ2aWNlLmFsZXJ0VHlwZSA9IHZhbDtcbiAgfVxuICBnZXQgYWxlcnRUeXBlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuaWNvblNlcnZpY2UuYWxlcnRUeXBlO1xuICB9XG5cbiAgQElucHV0KCdjbHJBbGVydEljb24nKVxuICBzZXQgYWxlcnRJY29uU2hhcGUodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuaWNvblNlcnZpY2UuYWxlcnRJY29uU2hhcGUgPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCBhbGVydENsYXNzKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuaWNvblNlcnZpY2UuaWNvbkluZm9Gcm9tVHlwZSh0aGlzLmljb25TZXJ2aWNlLmFsZXJ0VHlwZSkuY3NzQ2xhc3M7XG4gIH1cblxuICBwcml2YXRlIHByZXZpb3VzbHlIaWRkZW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBoaWRkZW4gPSBmYWxzZTtcblxuICBwcml2YXRlIGRldGVjdENoYW5nZXNJZk5lZWRlZCgpIHtcbiAgICBpZiAodGhpcy5wcmV2aW91c2x5SGlkZGVuICE9PSB0aGlzLmhpZGRlbikge1xuICAgICAgdGhpcy5wcmV2aW91c2x5SGlkZGVuID0gdGhpcy5oaWRkZW47XG4gICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGlzSGlkZGVuKCkge1xuICAgIGlmICh0aGlzLm11bHRpQWxlcnRTZXJ2aWNlKSB7XG4gICAgICAvLyBjaGFuZ2UgZGV0ZWN0aW9uIGlzc3VlIGluIHByb2R1Y3Rpb24gbW9kZSBjYXVzZXMgY3VycmVudEFsZXJ0IHRvIGJlIHVuZGVmaW5lZCB3aGVuIG9ubHkgdGhlIGZpcnN0IGFsZXJ0IGV4aXN0c1xuICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3Ztd2FyZS9jbGFyaXR5L2lzc3Vlcy8yNDMwXG4gICAgICBpZiAodGhpcy5tdWx0aUFsZXJ0U2VydmljZS5jdXJyZW50QWxlcnQgPT09IHRoaXMgfHwgdGhpcy5tdWx0aUFsZXJ0U2VydmljZS5jb3VudCA9PT0gMCkge1xuICAgICAgICBpZiAodGhpcy5oaWRkZW4gPT09IHRydWUpIHtcbiAgICAgICAgICB0aGlzLnByZXZpb3VzbHlIaWRkZW4gPSB0cnVlO1xuICAgICAgICAgIHRoaXMuaGlkZGVuID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodGhpcy5oaWRkZW4gPT09IGZhbHNlKSB7XG4gICAgICAgIHRoaXMucHJldmlvdXNseUhpZGRlbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLmhpZGRlbiA9IHRydWU7XG4gICAgICB9XG4gICAgICB0aGlzLmRldGVjdENoYW5nZXNJZk5lZWRlZCgpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhpZGRlbjtcbiAgfVxuXG4gIGNsb3NlKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5jbG9zYWJsZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9jbG9zZWQgPSB0cnVlO1xuICAgIGlmICh0aGlzLm11bHRpQWxlcnRTZXJ2aWNlKSB7XG4gICAgICB0aGlzLm11bHRpQWxlcnRTZXJ2aWNlLmNsb3NlKCk7XG4gICAgfVxuICAgIHRoaXMuX2Nsb3NlZENoYW5nZWQuZW1pdCh0cnVlKTtcbiAgfVxuXG4gIG9wZW4oKTogdm9pZCB7XG4gICAgdGhpcy5fY2xvc2VkID0gZmFsc2U7XG4gICAgdGhpcy5fY2xvc2VkQ2hhbmdlZC5lbWl0KGZhbHNlKTtcbiAgfVxufVxuIl19