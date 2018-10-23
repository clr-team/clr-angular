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
import { ClrTextareaContainer } from './textarea-container';
import { WrappedFormControl } from '../common/wrapped-control';
import { ControlClassService } from '../common/providers/control-class.service';
var ClrTextarea = /** @class */ (function (_super) {
    tslib_1.__extends(ClrTextarea, _super);
    function ClrTextarea(vcr, ngControlService, ifErrorService, control, controlClassService, renderer, el) {
        var _this = _super.call(this, ClrTextareaContainer, vcr, 1) || this;
        _this.ngControlService = ngControlService;
        _this.ifErrorService = ifErrorService;
        _this.control = control;
        if (!control) {
            throw new Error('clrTextarea can only be used within an Angular form control, add ngModel or formControl to the textarea');
        }
        if (controlClassService) {
            controlClassService.initControlClass(renderer, el.nativeElement);
        }
        return _this;
    }
    /**
     * @return {?}
     */
    ClrTextarea.prototype.ngOnInit = /**
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
    ClrTextarea.prototype.onBlur = /**
     * @return {?}
     */
    function () {
        if (this.ifErrorService) {
            this.ifErrorService.triggerStatusChange();
        }
    };
    ClrTextarea.decorators = [
        { type: Directive, args: [{ selector: '[clrTextarea]', host: { '[class.clr-textarea]': 'true' } },] }
    ];
    /** @nocollapse */
    ClrTextarea.ctorParameters = function () { return [
        { type: ViewContainerRef },
        { type: NgControlService, decorators: [{ type: Optional }] },
        { type: IfErrorService, decorators: [{ type: Optional }] },
        { type: NgControl, decorators: [{ type: Optional }] },
        { type: ControlClassService, decorators: [{ type: Optional }] },
        { type: Renderer2 },
        { type: ElementRef }
    ]; };
    ClrTextarea.propDecorators = {
        onBlur: [{ type: HostListener, args: ['blur',] }]
    };
    return ClrTextarea;
}(WrappedFormControl));
export { ClrTextarea };
if (false) {
    /** @type {?} */
    ClrTextarea.prototype.ngControlService;
    /** @type {?} */
    ClrTextarea.prototype.ifErrorService;
    /** @type {?} */
    ClrTextarea.prototype.control;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dGFyZWEuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJmb3Jtcy90ZXh0YXJlYS90ZXh0YXJlYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBTUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDbkgsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTNDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUNyRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUMxRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUVoRjtJQUNpQyx1Q0FBd0M7SUFDdkUscUJBQ0UsR0FBcUIsRUFDRCxnQkFBa0MsRUFDbEMsY0FBOEIsRUFDOUIsT0FBa0IsRUFDMUIsbUJBQXdDLEVBQ3BELFFBQW1CLEVBQ25CLEVBQWM7UUFQaEIsWUFTRSxrQkFBTSxvQkFBb0IsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLFNBU3BDO1FBaEJxQixzQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLG9CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixhQUFPLEdBQVAsT0FBTyxDQUFXO1FBTXRDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDWixNQUFNLElBQUksS0FBSyxDQUNiLHlHQUF5RyxDQUMxRyxDQUFDO1NBQ0g7UUFDRCxJQUFJLG1CQUFtQixFQUFFO1lBQ3ZCLG1CQUFtQixDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDbEU7O0lBQ0gsQ0FBQzs7OztJQUVELDhCQUFROzs7SUFBUjtRQUNFLGlCQUFNLFFBQVEsV0FBRSxDQUFDO1FBQ2pCLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBQ3pCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ2hEO0lBQ0gsQ0FBQzs7OztJQUdELDRCQUFNOzs7SUFETjtRQUVFLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUN2QixJQUFJLENBQUMsY0FBYyxDQUFDLG1CQUFtQixFQUFFLENBQUM7U0FDM0M7SUFDSCxDQUFDOztnQkFsQ0YsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLGVBQWUsRUFBRSxJQUFJLEVBQUUsRUFBRSxzQkFBc0IsRUFBRSxNQUFNLEVBQUUsRUFBRTs7OztnQkFUdEMsZ0JBQWdCO2dCQUluRCxnQkFBZ0IsdUJBU3BCLFFBQVE7Z0JBVkosY0FBYyx1QkFXbEIsUUFBUTtnQkFiSixTQUFTLHVCQWNiLFFBQVE7Z0JBUkosbUJBQW1CLHVCQVN2QixRQUFRO2dCQWhCaUQsU0FBUztnQkFBRSxVQUFVOzs7eUJBc0NoRixZQUFZLFNBQUMsTUFBTTs7SUFNdEIsa0JBQUM7Q0FBQSxBQW5DRCxDQUNpQyxrQkFBa0IsR0FrQ2xEO1NBbENZLFdBQVc7OztJQUdwQix1Q0FBc0Q7O0lBQ3RELHFDQUFrRDs7SUFDbEQsOEJBQXNDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgRGlyZWN0aXZlLCBIb3N0TGlzdGVuZXIsIE9wdGlvbmFsLCBWaWV3Q29udGFpbmVyUmVmLCBSZW5kZXJlcjIsIEVsZW1lbnRSZWYsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBJZkVycm9yU2VydmljZSB9IGZyb20gJy4uL2NvbW1vbi9pZi1lcnJvci9pZi1lcnJvci5zZXJ2aWNlJztcbmltcG9ydCB7IE5nQ29udHJvbFNlcnZpY2UgfSBmcm9tICcuLi9jb21tb24vcHJvdmlkZXJzL25nLWNvbnRyb2wuc2VydmljZSc7XG5pbXBvcnQgeyBDbHJUZXh0YXJlYUNvbnRhaW5lciB9IGZyb20gJy4vdGV4dGFyZWEtY29udGFpbmVyJztcbmltcG9ydCB7IFdyYXBwZWRGb3JtQ29udHJvbCB9IGZyb20gJy4uL2NvbW1vbi93cmFwcGVkLWNvbnRyb2wnO1xuaW1wb3J0IHsgQ29udHJvbENsYXNzU2VydmljZSB9IGZyb20gJy4uL2NvbW1vbi9wcm92aWRlcnMvY29udHJvbC1jbGFzcy5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW2NsclRleHRhcmVhXScsIGhvc3Q6IHsgJ1tjbGFzcy5jbHItdGV4dGFyZWFdJzogJ3RydWUnIH0gfSlcbmV4cG9ydCBjbGFzcyBDbHJUZXh0YXJlYSBleHRlbmRzIFdyYXBwZWRGb3JtQ29udHJvbDxDbHJUZXh0YXJlYUNvbnRhaW5lcj4gaW1wbGVtZW50cyBPbkluaXQge1xuICBjb25zdHJ1Y3RvcihcbiAgICB2Y3I6IFZpZXdDb250YWluZXJSZWYsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBuZ0NvbnRyb2xTZXJ2aWNlOiBOZ0NvbnRyb2xTZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgaWZFcnJvclNlcnZpY2U6IElmRXJyb3JTZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgY29udHJvbDogTmdDb250cm9sLFxuICAgIEBPcHRpb25hbCgpIGNvbnRyb2xDbGFzc1NlcnZpY2U6IENvbnRyb2xDbGFzc1NlcnZpY2UsXG4gICAgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBlbDogRWxlbWVudFJlZlxuICApIHtcbiAgICBzdXBlcihDbHJUZXh0YXJlYUNvbnRhaW5lciwgdmNyLCAxKTtcbiAgICBpZiAoIWNvbnRyb2wpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ2NsclRleHRhcmVhIGNhbiBvbmx5IGJlIHVzZWQgd2l0aGluIGFuIEFuZ3VsYXIgZm9ybSBjb250cm9sLCBhZGQgbmdNb2RlbCBvciBmb3JtQ29udHJvbCB0byB0aGUgdGV4dGFyZWEnXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoY29udHJvbENsYXNzU2VydmljZSkge1xuICAgICAgY29udHJvbENsYXNzU2VydmljZS5pbml0Q29udHJvbENsYXNzKHJlbmRlcmVyLCBlbC5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBzdXBlci5uZ09uSW5pdCgpO1xuICAgIGlmICh0aGlzLm5nQ29udHJvbFNlcnZpY2UpIHtcbiAgICAgIHRoaXMubmdDb250cm9sU2VydmljZS5zZXRDb250cm9sKHRoaXMuY29udHJvbCk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignYmx1cicpXG4gIG9uQmx1cigpIHtcbiAgICBpZiAodGhpcy5pZkVycm9yU2VydmljZSkge1xuICAgICAgdGhpcy5pZkVycm9yU2VydmljZS50cmlnZ2VyU3RhdHVzQ2hhbmdlKCk7XG4gICAgfVxuICB9XG59XG4iXX0=