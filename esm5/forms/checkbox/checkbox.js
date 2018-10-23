/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive, ViewContainerRef } from '@angular/core';
import { WrappedFormControl } from '../common/wrapped-control';
import { ClrCheckboxContainer } from './checkbox-container';
var ClrCheckboxNext = /** @class */ (function (_super) {
    tslib_1.__extends(ClrCheckboxNext, _super);
    // Once again, several more elegant solutions were foiled by severity 3+ bugs on Angular that have been opened
    // for 6 months to a year. So that's how we do it. Inheritance and ridiculous constructors. :-(
    function ClrCheckboxNext(vcr) {
        return _super.call(this, ClrCheckboxContainer, vcr) || this;
    }
    ClrCheckboxNext.decorators = [
        { type: Directive, args: [{ selector: '[clrCheckbox]' },] }
    ];
    /** @nocollapse */
    ClrCheckboxNext.ctorParameters = function () { return [
        { type: ViewContainerRef }
    ]; };
    return ClrCheckboxNext;
}(WrappedFormControl));
export { ClrCheckboxNext };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3guanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJmb3Jtcy9jaGVja2JveC9jaGVja2JveC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBTUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU1RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUUvRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUU1RDtJQUNxQywyQ0FBd0M7SUFDM0UsOEdBQThHO0lBQzlHLCtGQUErRjtJQUMvRix5QkFBWSxHQUFxQjtlQUMvQixrQkFBTSxvQkFBb0IsRUFBRSxHQUFHLENBQUM7SUFDbEMsQ0FBQzs7Z0JBTkYsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLGVBQWUsRUFBRTs7OztnQkFOcEIsZ0JBQWdCOztJQWFwQyxzQkFBQztDQUFBLEFBUEQsQ0FDcUMsa0JBQWtCLEdBTXREO1NBTlksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IERpcmVjdGl2ZSwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBXcmFwcGVkRm9ybUNvbnRyb2wgfSBmcm9tICcuLi9jb21tb24vd3JhcHBlZC1jb250cm9sJztcblxuaW1wb3J0IHsgQ2xyQ2hlY2tib3hDb250YWluZXIgfSBmcm9tICcuL2NoZWNrYm94LWNvbnRhaW5lcic7XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tjbHJDaGVja2JveF0nIH0pXG5leHBvcnQgY2xhc3MgQ2xyQ2hlY2tib3hOZXh0IGV4dGVuZHMgV3JhcHBlZEZvcm1Db250cm9sPENsckNoZWNrYm94Q29udGFpbmVyPiB7XG4gIC8vIE9uY2UgYWdhaW4sIHNldmVyYWwgbW9yZSBlbGVnYW50IHNvbHV0aW9ucyB3ZXJlIGZvaWxlZCBieSBzZXZlcml0eSAzKyBidWdzIG9uIEFuZ3VsYXIgdGhhdCBoYXZlIGJlZW4gb3BlbmVkXG4gIC8vIGZvciA2IG1vbnRocyB0byBhIHllYXIuIFNvIHRoYXQncyBob3cgd2UgZG8gaXQuIEluaGVyaXRhbmNlIGFuZCByaWRpY3Vsb3VzIGNvbnN0cnVjdG9ycy4gOi0oXG4gIGNvbnN0cnVjdG9yKHZjcjogVmlld0NvbnRhaW5lclJlZikge1xuICAgIHN1cGVyKENsckNoZWNrYm94Q29udGFpbmVyLCB2Y3IpO1xuICB9XG59XG4iXX0=