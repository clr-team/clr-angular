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
import { ClrSelectContainer } from './select-container';
var ClrSelect = /** @class */ (function (_super) {
    tslib_1.__extends(ClrSelect, _super);
    function ClrSelect(vcr, ngControlService, ifErrorService, control, controlClassService, el, renderer) {
        var _this = _super.call(this, ClrSelectContainer, vcr, 1) || this;
        _this.ngControlService = ngControlService;
        _this.ifErrorService = ifErrorService;
        _this.control = control;
        if (!control) {
            throw new Error('clrSelect can only be used within an Angular form control, add ngModel or formControl to the select');
        }
        if (controlClassService) {
            controlClassService.initControlClass(renderer, el.nativeElement);
        }
        return _this;
    }
    /**
     * @return {?}
     */
    ClrSelect.prototype.ngOnInit = /**
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
    ClrSelect.prototype.onBlur = /**
     * @return {?}
     */
    function () {
        if (this.ifErrorService) {
            this.ifErrorService.triggerStatusChange();
        }
    };
    ClrSelect.decorators = [
        { type: Directive, args: [{ selector: '[clrSelect]', host: { '[class.clr-select]': 'true' } },] }
    ];
    /** @nocollapse */
    ClrSelect.ctorParameters = function () { return [
        { type: ViewContainerRef },
        { type: NgControlService, decorators: [{ type: Optional }] },
        { type: IfErrorService, decorators: [{ type: Optional }] },
        { type: NgControl, decorators: [{ type: Optional }] },
        { type: ControlClassService, decorators: [{ type: Optional }] },
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    ClrSelect.propDecorators = {
        onBlur: [{ type: HostListener, args: ['blur',] }]
    };
    return ClrSelect;
}(WrappedFormControl));
export { ClrSelect };
if (false) {
    /** @type {?} */
    ClrSelect.prototype.ngControlService;
    /** @type {?} */
    ClrSelect.prototype.ifErrorService;
    /** @type {?} */
    ClrSelect.prototype.control;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZm9ybXMvc2VsZWN0L3NlbGVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBTUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBVSxRQUFRLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkgsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTNDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUNyRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUNoRixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUMxRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUV4RDtJQUMrQixxQ0FBc0M7SUFDbkUsbUJBQ0UsR0FBcUIsRUFDRCxnQkFBa0MsRUFDbEMsY0FBOEIsRUFDOUIsT0FBa0IsRUFDMUIsbUJBQXdDLEVBQ3BELEVBQWMsRUFDZCxRQUFtQjtRQVByQixZQVNFLGtCQUFNLGtCQUFrQixFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsU0FTbEM7UUFoQnFCLHNCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsb0JBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLGFBQU8sR0FBUCxPQUFPLENBQVc7UUFNdEMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNaLE1BQU0sSUFBSSxLQUFLLENBQ2IscUdBQXFHLENBQ3RHLENBQUM7U0FDSDtRQUNELElBQUksbUJBQW1CLEVBQUU7WUFDdkIsbUJBQW1CLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUNsRTs7SUFDSCxDQUFDOzs7O0lBRUQsNEJBQVE7OztJQUFSO1FBQ0UsaUJBQU0sUUFBUSxXQUFFLENBQUM7UUFDakIsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDekIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDaEQ7SUFDSCxDQUFDOzs7O0lBR0QsMEJBQU07OztJQUROO1FBRUUsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxjQUFjLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztTQUMzQztJQUNILENBQUM7O2dCQWxDRixTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxFQUFFLG9CQUFvQixFQUFFLE1BQU0sRUFBRSxFQUFFOzs7O2dCQVRILGdCQUFnQjtnQkFLbEYsZ0JBQWdCLHVCQVFwQixRQUFRO2dCQVZKLGNBQWMsdUJBV2xCLFFBQVE7Z0JBYkosU0FBUyx1QkFjYixRQUFRO2dCQVhKLG1CQUFtQix1QkFZdkIsUUFBUTtnQkFoQmtCLFVBQVU7Z0JBQXJCLFNBQVM7Ozt5QkFzQzFCLFlBQVksU0FBQyxNQUFNOztJQU10QixnQkFBQztDQUFBLEFBbkNELENBQytCLGtCQUFrQixHQWtDaEQ7U0FsQ1ksU0FBUzs7O0lBR2xCLHFDQUFzRDs7SUFDdEQsbUNBQWtEOztJQUNsRCw0QkFBc0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBEaXJlY3RpdmUsIFJlbmRlcmVyMiwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyLCBPbkluaXQsIE9wdGlvbmFsLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ0NvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IElmRXJyb3JTZXJ2aWNlIH0gZnJvbSAnLi4vY29tbW9uL2lmLWVycm9yL2lmLWVycm9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29udHJvbENsYXNzU2VydmljZSB9IGZyb20gJy4uL2NvbW1vbi9wcm92aWRlcnMvY29udHJvbC1jbGFzcy5zZXJ2aWNlJztcbmltcG9ydCB7IE5nQ29udHJvbFNlcnZpY2UgfSBmcm9tICcuLi9jb21tb24vcHJvdmlkZXJzL25nLWNvbnRyb2wuc2VydmljZSc7XG5pbXBvcnQgeyBXcmFwcGVkRm9ybUNvbnRyb2wgfSBmcm9tICcuLi9jb21tb24vd3JhcHBlZC1jb250cm9sJztcbmltcG9ydCB7IENsclNlbGVjdENvbnRhaW5lciB9IGZyb20gJy4vc2VsZWN0LWNvbnRhaW5lcic7XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tjbHJTZWxlY3RdJywgaG9zdDogeyAnW2NsYXNzLmNsci1zZWxlY3RdJzogJ3RydWUnIH0gfSlcbmV4cG9ydCBjbGFzcyBDbHJTZWxlY3QgZXh0ZW5kcyBXcmFwcGVkRm9ybUNvbnRyb2w8Q2xyU2VsZWN0Q29udGFpbmVyPiBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHZjcjogVmlld0NvbnRhaW5lclJlZixcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIG5nQ29udHJvbFNlcnZpY2U6IE5nQ29udHJvbFNlcnZpY2UsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBpZkVycm9yU2VydmljZTogSWZFcnJvclNlcnZpY2UsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBjb250cm9sOiBOZ0NvbnRyb2wsXG4gICAgQE9wdGlvbmFsKCkgY29udHJvbENsYXNzU2VydmljZTogQ29udHJvbENsYXNzU2VydmljZSxcbiAgICBlbDogRWxlbWVudFJlZixcbiAgICByZW5kZXJlcjogUmVuZGVyZXIyXG4gICkge1xuICAgIHN1cGVyKENsclNlbGVjdENvbnRhaW5lciwgdmNyLCAxKTtcbiAgICBpZiAoIWNvbnRyb2wpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ2NsclNlbGVjdCBjYW4gb25seSBiZSB1c2VkIHdpdGhpbiBhbiBBbmd1bGFyIGZvcm0gY29udHJvbCwgYWRkIG5nTW9kZWwgb3IgZm9ybUNvbnRyb2wgdG8gdGhlIHNlbGVjdCdcbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChjb250cm9sQ2xhc3NTZXJ2aWNlKSB7XG4gICAgICBjb250cm9sQ2xhc3NTZXJ2aWNlLmluaXRDb250cm9sQ2xhc3MocmVuZGVyZXIsIGVsLm5hdGl2ZUVsZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gICAgaWYgKHRoaXMubmdDb250cm9sU2VydmljZSkge1xuICAgICAgdGhpcy5uZ0NvbnRyb2xTZXJ2aWNlLnNldENvbnRyb2wodGhpcy5jb250cm9sKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdibHVyJylcbiAgb25CbHVyKCkge1xuICAgIGlmICh0aGlzLmlmRXJyb3JTZXJ2aWNlKSB7XG4gICAgICB0aGlzLmlmRXJyb3JTZXJ2aWNlLnRyaWdnZXJTdGF0dXNDaGFuZ2UoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==