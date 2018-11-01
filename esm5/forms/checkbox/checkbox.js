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
import { ClrCheckboxWrapper } from './checkbox-wrapper';
import { IfErrorService } from '../common/if-error/if-error.service';
import { ControlClassService } from '../common/providers/control-class.service';
import { NgControlService } from '../common/providers/ng-control.service';
import { WrappedFormControl } from '../common/wrapped-control';
var ClrCheckbox = /** @class */ (function (_super) {
    tslib_1.__extends(ClrCheckbox, _super);
    function ClrCheckbox(vcr, ngControlService, ifErrorService, control, controlClassService, el, renderer) {
        var _this = _super.call(this, ClrCheckboxWrapper, vcr, 0) || this;
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
    ClrCheckbox.prototype.ngOnInit = /**
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
    ClrCheckbox.prototype.onBlur = /**
     * @return {?}
     */
    function () {
        if (this.ifErrorService) {
            this.ifErrorService.triggerStatusChange();
        }
    };
    ClrCheckbox.decorators = [
        { type: Directive, args: [{ selector: '[clrCheckbox]' },] }
    ];
    /** @nocollapse */
    ClrCheckbox.ctorParameters = function () { return [
        { type: ViewContainerRef },
        { type: NgControlService, decorators: [{ type: Optional }] },
        { type: IfErrorService, decorators: [{ type: Optional }] },
        { type: NgControl, decorators: [{ type: Optional }] },
        { type: ControlClassService, decorators: [{ type: Optional }] },
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    ClrCheckbox.propDecorators = {
        onBlur: [{ type: HostListener, args: ['blur',] }]
    };
    return ClrCheckbox;
}(WrappedFormControl));
export { ClrCheckbox };
if (false) {
    /** @type {?} */
    ClrCheckbox.prototype.ngControlService;
    /** @type {?} */
    ClrCheckbox.prototype.ifErrorService;
    /** @type {?} */
    ClrCheckbox.prototype.control;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3guanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJmb3Jtcy9jaGVja2JveC9jaGVja2JveC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBTUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBVSxRQUFRLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkgsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRXhELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUNyRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUNoRixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUMxRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUUvRDtJQUNpQyx1Q0FBc0M7SUFDckUscUJBQ0UsR0FBcUIsRUFDRCxnQkFBa0MsRUFDbEMsY0FBOEIsRUFDOUIsT0FBa0IsRUFDMUIsbUJBQXdDLEVBQ3BELEVBQWMsRUFDZCxRQUFtQjtRQVByQixZQVNFLGtCQUFNLGtCQUFrQixFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsU0FJbEM7UUFYcUIsc0JBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxvQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsYUFBTyxHQUFQLE9BQU8sQ0FBVztRQU10QyxJQUFJLG1CQUFtQixFQUFFO1lBQ3ZCLG1CQUFtQixDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDbEU7O0lBQ0gsQ0FBQzs7OztJQUVELDhCQUFROzs7SUFBUjtRQUNFLGlCQUFNLFFBQVEsV0FBRSxDQUFDO1FBQ2pCLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBQ3pCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ2hEO0lBQ0gsQ0FBQzs7OztJQUdELDRCQUFNOzs7SUFETjtRQUVFLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUN2QixJQUFJLENBQUMsY0FBYyxDQUFDLG1CQUFtQixFQUFFLENBQUM7U0FDM0M7SUFDSCxDQUFDOztnQkE3QkYsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLGVBQWUsRUFBRTs7OztnQkFUbUMsZ0JBQWdCO2dCQU1sRixnQkFBZ0IsdUJBT3BCLFFBQVE7Z0JBVEosY0FBYyx1QkFVbEIsUUFBUTtnQkFiSixTQUFTLHVCQWNiLFFBQVE7Z0JBVkosbUJBQW1CLHVCQVd2QixRQUFRO2dCQWhCa0IsVUFBVTtnQkFBckIsU0FBUzs7O3lCQWlDMUIsWUFBWSxTQUFDLE1BQU07O0lBTXRCLGtCQUFDO0NBQUEsQUE5QkQsQ0FDaUMsa0JBQWtCLEdBNkJsRDtTQTdCWSxXQUFXOzs7SUFHcEIsdUNBQXNEOztJQUN0RCxxQ0FBa0Q7O0lBQ2xELDhCQUFzQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IERpcmVjdGl2ZSwgUmVuZGVyZXIyLCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIsIE9uSW5pdCwgT3B0aW9uYWwsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IENsckNoZWNrYm94V3JhcHBlciB9IGZyb20gJy4vY2hlY2tib3gtd3JhcHBlcic7XG5cbmltcG9ydCB7IElmRXJyb3JTZXJ2aWNlIH0gZnJvbSAnLi4vY29tbW9uL2lmLWVycm9yL2lmLWVycm9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29udHJvbENsYXNzU2VydmljZSB9IGZyb20gJy4uL2NvbW1vbi9wcm92aWRlcnMvY29udHJvbC1jbGFzcy5zZXJ2aWNlJztcbmltcG9ydCB7IE5nQ29udHJvbFNlcnZpY2UgfSBmcm9tICcuLi9jb21tb24vcHJvdmlkZXJzL25nLWNvbnRyb2wuc2VydmljZSc7XG5pbXBvcnQgeyBXcmFwcGVkRm9ybUNvbnRyb2wgfSBmcm9tICcuLi9jb21tb24vd3JhcHBlZC1jb250cm9sJztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW2NsckNoZWNrYm94XScgfSlcbmV4cG9ydCBjbGFzcyBDbHJDaGVja2JveCBleHRlbmRzIFdyYXBwZWRGb3JtQ29udHJvbDxDbHJDaGVja2JveFdyYXBwZXI+IGltcGxlbWVudHMgT25Jbml0IHtcbiAgY29uc3RydWN0b3IoXG4gICAgdmNyOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgbmdDb250cm9sU2VydmljZTogTmdDb250cm9sU2VydmljZSxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGlmRXJyb3JTZXJ2aWNlOiBJZkVycm9yU2VydmljZSxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGNvbnRyb2w6IE5nQ29udHJvbCxcbiAgICBAT3B0aW9uYWwoKSBjb250cm9sQ2xhc3NTZXJ2aWNlOiBDb250cm9sQ2xhc3NTZXJ2aWNlLFxuICAgIGVsOiBFbGVtZW50UmVmLFxuICAgIHJlbmRlcmVyOiBSZW5kZXJlcjJcbiAgKSB7XG4gICAgc3VwZXIoQ2xyQ2hlY2tib3hXcmFwcGVyLCB2Y3IsIDApO1xuICAgIGlmIChjb250cm9sQ2xhc3NTZXJ2aWNlKSB7XG4gICAgICBjb250cm9sQ2xhc3NTZXJ2aWNlLmluaXRDb250cm9sQ2xhc3MocmVuZGVyZXIsIGVsLm5hdGl2ZUVsZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gICAgaWYgKHRoaXMubmdDb250cm9sU2VydmljZSkge1xuICAgICAgdGhpcy5uZ0NvbnRyb2xTZXJ2aWNlLnNldENvbnRyb2wodGhpcy5jb250cm9sKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdibHVyJylcbiAgb25CbHVyKCkge1xuICAgIGlmICh0aGlzLmlmRXJyb3JTZXJ2aWNlKSB7XG4gICAgICB0aGlzLmlmRXJyb3JTZXJ2aWNlLnRyaWdnZXJTdGF0dXNDaGFuZ2UoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==