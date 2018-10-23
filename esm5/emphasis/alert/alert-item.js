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
var ClrAlertItem = /** @class */ (function () {
    function ClrAlertItem(iconService) {
        this.iconService = iconService;
    }
    ClrAlertItem.decorators = [
        { type: Component, args: [{
                    // the .alert-item selector is deprecated; the :not clause is to allow us to use static
                    // examples in demos on the demo-app and website
                    selector: '.alert-item:not(.static), clr-alert-item',
                    template: "\n        <div class=\"alert-icon-wrapper\">\n            <clr-icon class=\"alert-icon\" \n              [attr.shape]=\"iconService.alertIconShape\" \n              [attr.title]=\"iconService.alertIconTitle\"></clr-icon>\n        </div>\n        <ng-content></ng-content>\n    ",
                    host: { class: 'alert-item' }
                }] }
    ];
    /** @nocollapse */
    ClrAlertItem.ctorParameters = function () { return [
        { type: AlertIconAndTypesService }
    ]; };
    return ClrAlertItem;
}());
export { ClrAlertItem };
if (false) {
    /** @type {?} */
    ClrAlertItem.prototype.iconService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQtaXRlbS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImVtcGhhc2lzL2FsZXJ0L2FsZXJ0LWl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBTUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUU5RTtJQWVFLHNCQUFtQixXQUFxQztRQUFyQyxnQkFBVyxHQUFYLFdBQVcsQ0FBMEI7SUFBRyxDQUFDOztnQkFmN0QsU0FBUyxTQUFDOzs7b0JBR1QsUUFBUSxFQUFFLDBDQUEwQztvQkFDcEQsUUFBUSxFQUFFLHVSQU9QO29CQUNILElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUU7aUJBQzlCOzs7O2dCQWZRLHdCQUF3Qjs7SUFrQmpDLG1CQUFDO0NBQUEsQUFoQkQsSUFnQkM7U0FGWSxZQUFZOzs7SUFDWCxtQ0FBNEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWxlcnRJY29uQW5kVHlwZXNTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvaWNvbi1hbmQtdHlwZXMuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICAvLyB0aGUgLmFsZXJ0LWl0ZW0gc2VsZWN0b3IgaXMgZGVwcmVjYXRlZDsgdGhlIDpub3QgY2xhdXNlIGlzIHRvIGFsbG93IHVzIHRvIHVzZSBzdGF0aWNcbiAgLy8gZXhhbXBsZXMgaW4gZGVtb3Mgb24gdGhlIGRlbW8tYXBwIGFuZCB3ZWJzaXRlXG4gIHNlbGVjdG9yOiAnLmFsZXJ0LWl0ZW06bm90KC5zdGF0aWMpLCBjbHItYWxlcnQtaXRlbScsXG4gIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJhbGVydC1pY29uLXdyYXBwZXJcIj5cbiAgICAgICAgICAgIDxjbHItaWNvbiBjbGFzcz1cImFsZXJ0LWljb25cIiBcbiAgICAgICAgICAgICAgW2F0dHIuc2hhcGVdPVwiaWNvblNlcnZpY2UuYWxlcnRJY29uU2hhcGVcIiBcbiAgICAgICAgICAgICAgW2F0dHIudGl0bGVdPVwiaWNvblNlcnZpY2UuYWxlcnRJY29uVGl0bGVcIj48L2Nsci1pY29uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIGAsXG4gIGhvc3Q6IHsgY2xhc3M6ICdhbGVydC1pdGVtJyB9LFxufSlcbmV4cG9ydCBjbGFzcyBDbHJBbGVydEl0ZW0ge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgaWNvblNlcnZpY2U6IEFsZXJ0SWNvbkFuZFR5cGVzU2VydmljZSkge31cbn1cbiJdfQ==