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
import { Directive, Renderer2, ElementRef, HostListener, Optional, ViewContainerRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { IfErrorService } from '../common/if-error/if-error.service';
import { ControlClassService } from '../common/providers/control-class.service';
import { NgControlService } from '../common/providers/ng-control.service';
import { WrappedFormControl } from '../common/wrapped-control';
import { ClrRadioWrapper } from '../radio/radio-wrapper';
var ClrRadio = /** @class */ (function (_super) {
    tslib_1.__extends(ClrRadio, _super);
    function ClrRadio(vcr, ngControlService, ifErrorService, control, controlClassService, el, renderer) {
        var _this = _super.call(this, ClrRadioWrapper, vcr, 0) || this;
        _this.ngControlService = ngControlService;
        _this.ifErrorService = ifErrorService;
        _this.control = control;
        if (controlClassService) {
            controlClassService.initControlClass(renderer, el.nativeElement);
        }
        return _this;
    }
    /**
     * @return {?}
     */
    ClrRadio.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        _super.prototype.ngOnInit.call(this);
        if (this.ngControlService) {
            this.ngControlService.setControl(this.control);
        }
    };
    /**
     * @return {?}
     */
    ClrRadio.prototype.onBlur = /**
     * @return {?}
     */
    function () {
        if (this.ifErrorService) {
            this.ifErrorService.triggerStatusChange();
        }
    };
    ClrRadio.decorators = [
        { type: Directive, args: [{ selector: '[clrRadio]' },] }
    ];
    /** @nocollapse */
    ClrRadio.ctorParameters = function () { return [
        { type: ViewContainerRef },
        { type: NgControlService, decorators: [{ type: Optional }] },
        { type: IfErrorService, decorators: [{ type: Optional }] },
        { type: NgControl, decorators: [{ type: Optional }] },
        { type: ControlClassService, decorators: [{ type: Optional }] },
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    ClrRadio.propDecorators = {
        onBlur: [{ type: HostListener, args: ['blur',] }]
    };
    return ClrRadio;
}(WrappedFormControl));
export { ClrRadio };
if (false) {
    /** @type {?} */
    ClrRadio.prototype.ngControlService;
    /** @type {?} */
    ClrRadio.prototype.ifErrorService;
    /** @type {?} */
    ClrRadio.prototype.control;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW8uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJmb3Jtcy9yYWRpby9yYWRpby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBTUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBVSxRQUFRLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkgsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTNDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUNyRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUNoRixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUMxRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFekQ7SUFDOEIsb0NBQW1DO0lBQy9ELGtCQUNFLEdBQXFCLEVBQ0QsZ0JBQWtDLEVBQ2xDLGNBQThCLEVBQzlCLE9BQWtCLEVBQzFCLG1CQUF3QyxFQUNwRCxFQUFjLEVBQ2QsUUFBbUI7UUFQckIsWUFTRSxrQkFBTSxlQUFlLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxTQUkvQjtRQVhxQixzQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLG9CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixhQUFPLEdBQVAsT0FBTyxDQUFXO1FBTXRDLElBQUksbUJBQW1CLEVBQUU7WUFDdkIsbUJBQW1CLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUNsRTs7SUFDSCxDQUFDOzs7O0lBRUQsMkJBQVE7OztJQUFSO1FBQ0UsaUJBQU0sUUFBUSxXQUFFLENBQUM7UUFDakIsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDekIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDaEQ7SUFDSCxDQUFDOzs7O0lBR0QseUJBQU07OztJQUROO1FBRUUsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxjQUFjLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztTQUMzQztJQUNILENBQUM7O2dCQTdCRixTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFOzs7O2dCQVRzQyxnQkFBZ0I7Z0JBS2xGLGdCQUFnQix1QkFRcEIsUUFBUTtnQkFWSixjQUFjLHVCQVdsQixRQUFRO2dCQWJKLFNBQVMsdUJBY2IsUUFBUTtnQkFYSixtQkFBbUIsdUJBWXZCLFFBQVE7Z0JBaEJrQixVQUFVO2dCQUFyQixTQUFTOzs7eUJBaUMxQixZQUFZLFNBQUMsTUFBTTs7SUFNdEIsZUFBQztDQUFBLEFBOUJELENBQzhCLGtCQUFrQixHQTZCL0M7U0E3QlksUUFBUTs7O0lBR2pCLG9DQUFzRDs7SUFDdEQsa0NBQWtEOztJQUNsRCwyQkFBc0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBEaXJlY3RpdmUsIFJlbmRlcmVyMiwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyLCBPbkluaXQsIE9wdGlvbmFsLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ0NvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IElmRXJyb3JTZXJ2aWNlIH0gZnJvbSAnLi4vY29tbW9uL2lmLWVycm9yL2lmLWVycm9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29udHJvbENsYXNzU2VydmljZSB9IGZyb20gJy4uL2NvbW1vbi9wcm92aWRlcnMvY29udHJvbC1jbGFzcy5zZXJ2aWNlJztcbmltcG9ydCB7IE5nQ29udHJvbFNlcnZpY2UgfSBmcm9tICcuLi9jb21tb24vcHJvdmlkZXJzL25nLWNvbnRyb2wuc2VydmljZSc7XG5pbXBvcnQgeyBXcmFwcGVkRm9ybUNvbnRyb2wgfSBmcm9tICcuLi9jb21tb24vd3JhcHBlZC1jb250cm9sJztcbmltcG9ydCB7IENsclJhZGlvV3JhcHBlciB9IGZyb20gJy4uL3JhZGlvL3JhZGlvLXdyYXBwZXInO1xuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbY2xyUmFkaW9dJyB9KVxuZXhwb3J0IGNsYXNzIENsclJhZGlvIGV4dGVuZHMgV3JhcHBlZEZvcm1Db250cm9sPENsclJhZGlvV3JhcHBlcj4gaW1wbGVtZW50cyBPbkluaXQge1xuICBjb25zdHJ1Y3RvcihcbiAgICB2Y3I6IFZpZXdDb250YWluZXJSZWYsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBuZ0NvbnRyb2xTZXJ2aWNlOiBOZ0NvbnRyb2xTZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgaWZFcnJvclNlcnZpY2U6IElmRXJyb3JTZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgY29udHJvbDogTmdDb250cm9sLFxuICAgIEBPcHRpb25hbCgpIGNvbnRyb2xDbGFzc1NlcnZpY2U6IENvbnRyb2xDbGFzc1NlcnZpY2UsXG4gICAgZWw6IEVsZW1lbnRSZWYsXG4gICAgcmVuZGVyZXI6IFJlbmRlcmVyMlxuICApIHtcbiAgICBzdXBlcihDbHJSYWRpb1dyYXBwZXIsIHZjciwgMCk7XG4gICAgaWYgKGNvbnRyb2xDbGFzc1NlcnZpY2UpIHtcbiAgICAgIGNvbnRyb2xDbGFzc1NlcnZpY2UuaW5pdENvbnRyb2xDbGFzcyhyZW5kZXJlciwgZWwubmF0aXZlRWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgc3VwZXIubmdPbkluaXQoKTtcbiAgICBpZiAodGhpcy5uZ0NvbnRyb2xTZXJ2aWNlKSB7XG4gICAgICB0aGlzLm5nQ29udHJvbFNlcnZpY2Uuc2V0Q29udHJvbCh0aGlzLmNvbnRyb2wpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2JsdXInKVxuICBvbkJsdXIoKSB7XG4gICAgaWYgKHRoaXMuaWZFcnJvclNlcnZpY2UpIHtcbiAgICAgIHRoaXMuaWZFcnJvclNlcnZpY2UudHJpZ2dlclN0YXR1c0NoYW5nZSgpO1xuICAgIH1cbiAgfVxufVxuIl19