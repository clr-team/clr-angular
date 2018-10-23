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
import { Directive, HostListener, Optional, ViewContainerRef, Renderer2, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { IfErrorService } from '../common/if-error/if-error.service';
import { NgControlService } from '../common/providers/ng-control.service';
import { ClrInputContainer } from './input-container';
import { WrappedFormControl } from '../common/wrapped-control';
import { ControlClassService } from '../common/providers/control-class.service';
var ClrInput = /** @class */ (function (_super) {
    tslib_1.__extends(ClrInput, _super);
    function ClrInput(vcr, ngControlService, ifErrorService, control, controlClassService, renderer, el) {
        var _this = _super.call(this, ClrInputContainer, vcr, 1) || this;
        _this.ngControlService = ngControlService;
        _this.ifErrorService = ifErrorService;
        _this.control = control;
        if (!control) {
            throw new Error('clrInput can only be used within an Angular form control, add ngModel or formControl to the input');
        }
        if (controlClassService) {
            controlClassService.initControlClass(renderer, el.nativeElement);
        }
        return _this;
    }
    /**
     * @return {?}
     */
    ClrInput.prototype.ngOnInit = /**
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
    ClrInput.prototype.onBlur = /**
     * @return {?}
     */
    function () {
        if (this.ifErrorService) {
            this.ifErrorService.triggerStatusChange();
        }
    };
    ClrInput.decorators = [
        { type: Directive, args: [{ selector: '[clrInput]', host: { '[class.clr-input]': 'true' } },] }
    ];
    /** @nocollapse */
    ClrInput.ctorParameters = function () { return [
        { type: ViewContainerRef },
        { type: NgControlService, decorators: [{ type: Optional }] },
        { type: IfErrorService, decorators: [{ type: Optional }] },
        { type: NgControl, decorators: [{ type: Optional }] },
        { type: ControlClassService, decorators: [{ type: Optional }] },
        { type: Renderer2 },
        { type: ElementRef }
    ]; };
    ClrInput.propDecorators = {
        onBlur: [{ type: HostListener, args: ['blur',] }]
    };
    return ClrInput;
}(WrappedFormControl));
export { ClrInput };
if (false) {
    /** @type {?} */
    ClrInput.prototype.ngControlService;
    /** @type {?} */
    ClrInput.prototype.ifErrorService;
    /** @type {?} */
    ClrInput.prototype.control;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJmb3Jtcy9pbnB1dC9pbnB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBTUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixFQUFVLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkgsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTNDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUNyRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUMxRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUVoRjtJQUM4QixvQ0FBcUM7SUFDakUsa0JBQ0UsR0FBcUIsRUFDRCxnQkFBa0MsRUFDbEMsY0FBOEIsRUFDOUIsT0FBa0IsRUFDMUIsbUJBQXdDLEVBQ3BELFFBQW1CLEVBQ25CLEVBQWM7UUFQaEIsWUFTRSxrQkFBTSxpQkFBaUIsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLFNBU2pDO1FBaEJxQixzQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLG9CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixhQUFPLEdBQVAsT0FBTyxDQUFXO1FBTXRDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDWixNQUFNLElBQUksS0FBSyxDQUNiLG1HQUFtRyxDQUNwRyxDQUFDO1NBQ0g7UUFDRCxJQUFJLG1CQUFtQixFQUFFO1lBQ3ZCLG1CQUFtQixDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDbEU7O0lBQ0gsQ0FBQzs7OztJQUVELDJCQUFROzs7SUFBUjtRQUNFLGlCQUFNLFFBQVEsV0FBRSxDQUFDO1FBQ2pCLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBQ3pCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ2hEO0lBQ0gsQ0FBQzs7OztJQUdELHlCQUFNOzs7SUFETjtRQUVFLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUN2QixJQUFJLENBQUMsY0FBYyxDQUFDLG1CQUFtQixFQUFFLENBQUM7U0FDM0M7SUFDSCxDQUFDOztnQkFsQ0YsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLEVBQUUsRUFBRTs7OztnQkFUaEMsZ0JBQWdCO2dCQUluRCxnQkFBZ0IsdUJBU3BCLFFBQVE7Z0JBVkosY0FBYyx1QkFXbEIsUUFBUTtnQkFiSixTQUFTLHVCQWNiLFFBQVE7Z0JBUkosbUJBQW1CLHVCQVN2QixRQUFRO2dCQWhCeUQsU0FBUztnQkFBRSxVQUFVOzs7eUJBc0N4RixZQUFZLFNBQUMsTUFBTTs7SUFNdEIsZUFBQztDQUFBLEFBbkNELENBQzhCLGtCQUFrQixHQWtDL0M7U0FsQ1ksUUFBUTs7O0lBR2pCLG9DQUFzRDs7SUFDdEQsa0NBQWtEOztJQUNsRCwyQkFBc0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciwgT3B0aW9uYWwsIFZpZXdDb250YWluZXJSZWYsIE9uSW5pdCwgUmVuZGVyZXIyLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ0NvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IElmRXJyb3JTZXJ2aWNlIH0gZnJvbSAnLi4vY29tbW9uL2lmLWVycm9yL2lmLWVycm9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgTmdDb250cm9sU2VydmljZSB9IGZyb20gJy4uL2NvbW1vbi9wcm92aWRlcnMvbmctY29udHJvbC5zZXJ2aWNlJztcbmltcG9ydCB7IENscklucHV0Q29udGFpbmVyIH0gZnJvbSAnLi9pbnB1dC1jb250YWluZXInO1xuaW1wb3J0IHsgV3JhcHBlZEZvcm1Db250cm9sIH0gZnJvbSAnLi4vY29tbW9uL3dyYXBwZWQtY29udHJvbCc7XG5pbXBvcnQgeyBDb250cm9sQ2xhc3NTZXJ2aWNlIH0gZnJvbSAnLi4vY29tbW9uL3Byb3ZpZGVycy9jb250cm9sLWNsYXNzLnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbY2xySW5wdXRdJywgaG9zdDogeyAnW2NsYXNzLmNsci1pbnB1dF0nOiAndHJ1ZScgfSB9KVxuZXhwb3J0IGNsYXNzIENscklucHV0IGV4dGVuZHMgV3JhcHBlZEZvcm1Db250cm9sPENscklucHV0Q29udGFpbmVyPiBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHZjcjogVmlld0NvbnRhaW5lclJlZixcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIG5nQ29udHJvbFNlcnZpY2U6IE5nQ29udHJvbFNlcnZpY2UsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBpZkVycm9yU2VydmljZTogSWZFcnJvclNlcnZpY2UsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBjb250cm9sOiBOZ0NvbnRyb2wsXG4gICAgQE9wdGlvbmFsKCkgY29udHJvbENsYXNzU2VydmljZTogQ29udHJvbENsYXNzU2VydmljZSxcbiAgICByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIGVsOiBFbGVtZW50UmVmXG4gICkge1xuICAgIHN1cGVyKENscklucHV0Q29udGFpbmVyLCB2Y3IsIDEpO1xuICAgIGlmICghY29udHJvbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnY2xySW5wdXQgY2FuIG9ubHkgYmUgdXNlZCB3aXRoaW4gYW4gQW5ndWxhciBmb3JtIGNvbnRyb2wsIGFkZCBuZ01vZGVsIG9yIGZvcm1Db250cm9sIHRvIHRoZSBpbnB1dCdcbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChjb250cm9sQ2xhc3NTZXJ2aWNlKSB7XG4gICAgICBjb250cm9sQ2xhc3NTZXJ2aWNlLmluaXRDb250cm9sQ2xhc3MocmVuZGVyZXIsIGVsLm5hdGl2ZUVsZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gICAgaWYgKHRoaXMubmdDb250cm9sU2VydmljZSkge1xuICAgICAgdGhpcy5uZ0NvbnRyb2xTZXJ2aWNlLnNldENvbnRyb2wodGhpcy5jb250cm9sKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdibHVyJylcbiAgb25CbHVyKCkge1xuICAgIGlmICh0aGlzLmlmRXJyb3JTZXJ2aWNlKSB7XG4gICAgICB0aGlzLmlmRXJyb3JTZXJ2aWNlLnRyaWdnZXJTdGF0dXNDaGFuZ2UoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==