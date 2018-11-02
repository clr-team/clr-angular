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
import { Directive, ElementRef, HostListener, Inject, Injector, Optional, Renderer2, Self, ViewContainerRef, } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NgControl } from '@angular/forms';
import { ClrPasswordContainer, ToggleService } from './password-container';
import { WrappedFormControl } from '../common/wrapped-control';
import { FocusService } from '../common/providers/focus.service';
var ClrPassword = /** @class */ (function (_super) {
    tslib_1.__extends(ClrPassword, _super);
    function ClrPassword(vcr, injector, control, renderer, el, focusService, toggleService) {
        var _this = _super.call(this, vcr, ClrPasswordContainer, injector, control, renderer, el) || this;
        _this.focusService = focusService;
        _this.toggleService = toggleService;
        _this.index = 1;
        if (!_this.focusService) {
            throw new Error('clrPassword requires being wrapped in <clr-password-container>');
        }
        _this.subscriptions.push(_this.toggleService.subscribe(function (toggle) {
            renderer.setProperty(el.nativeElement, 'type', toggle ? 'text' : 'password');
        }));
        return _this;
    }
    /**
     * @return {?}
     */
    ClrPassword.prototype.triggerFocus = /**
     * @return {?}
     */
    function () {
        if (this.focusService) {
            this.focusService.focused = true;
        }
    };
    /**
     * @return {?}
     */
    ClrPassword.prototype.triggerValidation = /**
     * @return {?}
     */
    function () {
        _super.prototype.triggerValidation.call(this);
        if (this.focusService) {
            this.focusService.focused = false;
        }
    };
    ClrPassword.decorators = [
        { type: Directive, args: [{ selector: '[clrPassword]', host: { '[class.clr-input]': 'true' } },] }
    ];
    /** @nocollapse */
    ClrPassword.ctorParameters = function () { return [
        { type: ViewContainerRef },
        { type: Injector },
        { type: NgControl, decorators: [{ type: Self }, { type: Optional }] },
        { type: Renderer2 },
        { type: ElementRef },
        { type: FocusService, decorators: [{ type: Optional }] },
        { type: BehaviorSubject, decorators: [{ type: Optional }, { type: Inject, args: [ToggleService,] }] }
    ]; };
    ClrPassword.propDecorators = {
        triggerFocus: [{ type: HostListener, args: ['focus',] }],
        triggerValidation: [{ type: HostListener, args: ['blur',] }]
    };
    return ClrPassword;
}(WrappedFormControl));
export { ClrPassword };
if (false) {
    /** @type {?} */
    ClrPassword.prototype.index;
    /** @type {?} */
    ClrPassword.prototype.focusService;
    /** @type {?} */
    ClrPassword.prototype.toggleService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFzc3dvcmQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJmb3Jtcy9wYXNzd29yZC9wYXNzd29yZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBTUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLE1BQU0sRUFDTixRQUFRLEVBR1IsUUFBUSxFQUNSLFNBQVMsRUFDVCxJQUFJLEVBQ0osZ0JBQWdCLEdBQ2pCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdkMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTNDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxhQUFhLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMzRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFFakU7SUFDaUMsdUNBQXdDO0lBR3ZFLHFCQUNFLEdBQXFCLEVBQ3JCLFFBQWtCLEVBR2xCLE9BQWtCLEVBQ2xCLFFBQW1CLEVBQ25CLEVBQWMsRUFDTSxZQUEwQixFQUd0QyxhQUF1QztRQVhqRCxZQWFFLGtCQUFNLEdBQUcsRUFBRSxvQkFBb0IsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUMsU0FXbEU7UUFoQnFCLGtCQUFZLEdBQVosWUFBWSxDQUFjO1FBR3RDLG1CQUFhLEdBQWIsYUFBYSxDQUEwQjtRQWJ2QyxXQUFLLEdBQUcsQ0FBQyxDQUFDO1FBaUJsQixJQUFJLENBQUMsS0FBSSxDQUFDLFlBQVksRUFBRTtZQUN0QixNQUFNLElBQUksS0FBSyxDQUFDLGdFQUFnRSxDQUFDLENBQUM7U0FDbkY7UUFFRCxLQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FDckIsS0FBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsVUFBQSxNQUFNO1lBQ2pDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQy9FLENBQUMsQ0FBQyxDQUNILENBQUM7O0lBQ0osQ0FBQzs7OztJQUdELGtDQUFZOzs7SUFEWjtRQUVFLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNyQixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7U0FDbEM7SUFDSCxDQUFDOzs7O0lBR0QsdUNBQWlCOzs7SUFEakI7UUFFRSxpQkFBTSxpQkFBaUIsV0FBRSxDQUFDO1FBQzFCLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNyQixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7U0FDbkM7SUFDSCxDQUFDOztnQkEzQ0YsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLGVBQWUsRUFBRSxJQUFJLEVBQUUsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLEVBQUUsRUFBRTs7OztnQkFUN0UsZ0JBQWdCO2dCQU5oQixRQUFRO2dCQVNELFNBQVMsdUJBYWIsSUFBSSxZQUNKLFFBQVE7Z0JBbkJYLFNBQVM7Z0JBUFQsVUFBVTtnQkFnQkgsWUFBWSx1QkFjaEIsUUFBUTtnQkFuQkosZUFBZSx1QkFvQm5CLFFBQVEsWUFDUixNQUFNLFNBQUMsYUFBYTs7OytCQWdCdEIsWUFBWSxTQUFDLE9BQU87b0NBT3BCLFlBQVksU0FBQyxNQUFNOztJQU90QixrQkFBQztDQUFBLEFBNUNELENBQ2lDLGtCQUFrQixHQTJDbEQ7U0EzQ1ksV0FBVzs7O0lBQ3RCLDRCQUFvQjs7SUFVbEIsbUNBQThDOztJQUM5QyxvQ0FFK0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5qZWN0LFxuICBJbmplY3RvcixcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxuICBSZW5kZXJlcjIsXG4gIFNlbGYsXG4gIFZpZXdDb250YWluZXJSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBOZ0NvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IENsclBhc3N3b3JkQ29udGFpbmVyLCBUb2dnbGVTZXJ2aWNlIH0gZnJvbSAnLi9wYXNzd29yZC1jb250YWluZXInO1xuaW1wb3J0IHsgV3JhcHBlZEZvcm1Db250cm9sIH0gZnJvbSAnLi4vY29tbW9uL3dyYXBwZWQtY29udHJvbCc7XG5pbXBvcnQgeyBGb2N1c1NlcnZpY2UgfSBmcm9tICcuLi9jb21tb24vcHJvdmlkZXJzL2ZvY3VzLnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbY2xyUGFzc3dvcmRdJywgaG9zdDogeyAnW2NsYXNzLmNsci1pbnB1dF0nOiAndHJ1ZScgfSB9KVxuZXhwb3J0IGNsYXNzIENsclBhc3N3b3JkIGV4dGVuZHMgV3JhcHBlZEZvcm1Db250cm9sPENsclBhc3N3b3JkQ29udGFpbmVyPiBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgcHJvdGVjdGVkIGluZGV4ID0gMTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICB2Y3I6IFZpZXdDb250YWluZXJSZWYsXG4gICAgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgIEBTZWxmKClcbiAgICBAT3B0aW9uYWwoKVxuICAgIGNvbnRyb2w6IE5nQ29udHJvbCxcbiAgICByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIGVsOiBFbGVtZW50UmVmLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZm9jdXNTZXJ2aWNlOiBGb2N1c1NlcnZpY2UsXG4gICAgQE9wdGlvbmFsKClcbiAgICBASW5qZWN0KFRvZ2dsZVNlcnZpY2UpXG4gICAgcHJpdmF0ZSB0b2dnbGVTZXJ2aWNlOiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj5cbiAgKSB7XG4gICAgc3VwZXIodmNyLCBDbHJQYXNzd29yZENvbnRhaW5lciwgaW5qZWN0b3IsIGNvbnRyb2wsIHJlbmRlcmVyLCBlbCk7XG5cbiAgICBpZiAoIXRoaXMuZm9jdXNTZXJ2aWNlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsclBhc3N3b3JkIHJlcXVpcmVzIGJlaW5nIHdyYXBwZWQgaW4gPGNsci1wYXNzd29yZC1jb250YWluZXI+Jyk7XG4gICAgfVxuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLnRvZ2dsZVNlcnZpY2Uuc3Vic2NyaWJlKHRvZ2dsZSA9PiB7XG4gICAgICAgIHJlbmRlcmVyLnNldFByb3BlcnR5KGVsLm5hdGl2ZUVsZW1lbnQsICd0eXBlJywgdG9nZ2xlID8gJ3RleHQnIDogJ3Bhc3N3b3JkJyk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdmb2N1cycpXG4gIHRyaWdnZXJGb2N1cygpIHtcbiAgICBpZiAodGhpcy5mb2N1c1NlcnZpY2UpIHtcbiAgICAgIHRoaXMuZm9jdXNTZXJ2aWNlLmZvY3VzZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2JsdXInKVxuICB0cmlnZ2VyVmFsaWRhdGlvbigpIHtcbiAgICBzdXBlci50cmlnZ2VyVmFsaWRhdGlvbigpO1xuICAgIGlmICh0aGlzLmZvY3VzU2VydmljZSkge1xuICAgICAgdGhpcy5mb2N1c1NlcnZpY2UuZm9jdXNlZCA9IGZhbHNlO1xuICAgIH1cbiAgfVxufVxuIl19