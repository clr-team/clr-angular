/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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
export class ClrSelect extends WrappedFormControl {
    /**
     * @param {?} vcr
     * @param {?} ngControlService
     * @param {?} ifErrorService
     * @param {?} control
     * @param {?} controlClassService
     * @param {?} el
     * @param {?} renderer
     */
    constructor(vcr, ngControlService, ifErrorService, control, controlClassService, el, renderer) {
        super(ClrSelectContainer, vcr, 1);
        this.ngControlService = ngControlService;
        this.ifErrorService = ifErrorService;
        this.control = control;
        if (!control) {
            throw new Error('clrSelect can only be used within an Angular form control, add ngModel or formControl to the select');
        }
        if (controlClassService) {
            controlClassService.initControlClass(renderer, el.nativeElement);
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        if (this.ngControlService) {
            this.ngControlService.setControl(this.control);
        }
    }
    /**
     * @return {?}
     */
    onBlur() {
        if (this.ifErrorService) {
            this.ifErrorService.triggerStatusChange();
        }
    }
}
ClrSelect.decorators = [
    { type: Directive, args: [{ selector: '[clrSelect]', host: { '[class.clr-select]': 'true' } },] }
];
/** @nocollapse */
ClrSelect.ctorParameters = () => [
    { type: ViewContainerRef },
    { type: NgControlService, decorators: [{ type: Optional }] },
    { type: IfErrorService, decorators: [{ type: Optional }] },
    { type: NgControl, decorators: [{ type: Optional }] },
    { type: ControlClassService, decorators: [{ type: Optional }] },
    { type: ElementRef },
    { type: Renderer2 }
];
ClrSelect.propDecorators = {
    onBlur: [{ type: HostListener, args: ['blur',] }]
};
if (false) {
    /** @type {?} */
    ClrSelect.prototype.ngControlService;
    /** @type {?} */
    ClrSelect.prototype.ifErrorService;
    /** @type {?} */
    ClrSelect.prototype.control;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZm9ybXMvc2VsZWN0L3NlbGVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFNQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFVLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuSCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFM0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBR3hELE1BQU0sT0FBTyxTQUFVLFNBQVEsa0JBQXNDOzs7Ozs7Ozs7O0lBQ25FLFlBQ0UsR0FBcUIsRUFDRCxnQkFBa0MsRUFDbEMsY0FBOEIsRUFDOUIsT0FBa0IsRUFDMUIsbUJBQXdDLEVBQ3BELEVBQWMsRUFDZCxRQUFtQjtRQUVuQixLQUFLLENBQUMsa0JBQWtCLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBUGQscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsWUFBTyxHQUFQLE9BQU8sQ0FBVztRQU10QyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ1osTUFBTSxJQUFJLEtBQUssQ0FDYixxR0FBcUcsQ0FDdEcsQ0FBQztTQUNIO1FBQ0QsSUFBSSxtQkFBbUIsRUFBRTtZQUN2QixtQkFBbUIsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQ2xFO0lBQ0gsQ0FBQzs7OztJQUVELFFBQVE7UUFDTixLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDakIsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDekIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDaEQ7SUFDSCxDQUFDOzs7O0lBR0QsTUFBTTtRQUNKLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUN2QixJQUFJLENBQUMsY0FBYyxDQUFDLG1CQUFtQixFQUFFLENBQUM7U0FDM0M7SUFDSCxDQUFDOzs7WUFsQ0YsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLEVBQUUsRUFBRTs7OztZQVRILGdCQUFnQjtZQUtsRixnQkFBZ0IsdUJBUXBCLFFBQVE7WUFWSixjQUFjLHVCQVdsQixRQUFRO1lBYkosU0FBUyx1QkFjYixRQUFRO1lBWEosbUJBQW1CLHVCQVl2QixRQUFRO1lBaEJrQixVQUFVO1lBQXJCLFNBQVM7OztxQkFzQzFCLFlBQVksU0FBQyxNQUFNOzs7O0lBekJsQixxQ0FBc0Q7O0lBQ3RELG1DQUFrRDs7SUFDbEQsNEJBQXNDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgRGlyZWN0aXZlLCBSZW5kZXJlcjIsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciwgT25Jbml0LCBPcHRpb25hbCwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBJZkVycm9yU2VydmljZSB9IGZyb20gJy4uL2NvbW1vbi9pZi1lcnJvci9pZi1lcnJvci5zZXJ2aWNlJztcbmltcG9ydCB7IENvbnRyb2xDbGFzc1NlcnZpY2UgfSBmcm9tICcuLi9jb21tb24vcHJvdmlkZXJzL2NvbnRyb2wtY2xhc3Muc2VydmljZSc7XG5pbXBvcnQgeyBOZ0NvbnRyb2xTZXJ2aWNlIH0gZnJvbSAnLi4vY29tbW9uL3Byb3ZpZGVycy9uZy1jb250cm9sLnNlcnZpY2UnO1xuaW1wb3J0IHsgV3JhcHBlZEZvcm1Db250cm9sIH0gZnJvbSAnLi4vY29tbW9uL3dyYXBwZWQtY29udHJvbCc7XG5pbXBvcnQgeyBDbHJTZWxlY3RDb250YWluZXIgfSBmcm9tICcuL3NlbGVjdC1jb250YWluZXInO1xuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbY2xyU2VsZWN0XScsIGhvc3Q6IHsgJ1tjbGFzcy5jbHItc2VsZWN0XSc6ICd0cnVlJyB9IH0pXG5leHBvcnQgY2xhc3MgQ2xyU2VsZWN0IGV4dGVuZHMgV3JhcHBlZEZvcm1Db250cm9sPENsclNlbGVjdENvbnRhaW5lcj4gaW1wbGVtZW50cyBPbkluaXQge1xuICBjb25zdHJ1Y3RvcihcbiAgICB2Y3I6IFZpZXdDb250YWluZXJSZWYsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBuZ0NvbnRyb2xTZXJ2aWNlOiBOZ0NvbnRyb2xTZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgaWZFcnJvclNlcnZpY2U6IElmRXJyb3JTZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgY29udHJvbDogTmdDb250cm9sLFxuICAgIEBPcHRpb25hbCgpIGNvbnRyb2xDbGFzc1NlcnZpY2U6IENvbnRyb2xDbGFzc1NlcnZpY2UsXG4gICAgZWw6IEVsZW1lbnRSZWYsXG4gICAgcmVuZGVyZXI6IFJlbmRlcmVyMlxuICApIHtcbiAgICBzdXBlcihDbHJTZWxlY3RDb250YWluZXIsIHZjciwgMSk7XG4gICAgaWYgKCFjb250cm9sKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdjbHJTZWxlY3QgY2FuIG9ubHkgYmUgdXNlZCB3aXRoaW4gYW4gQW5ndWxhciBmb3JtIGNvbnRyb2wsIGFkZCBuZ01vZGVsIG9yIGZvcm1Db250cm9sIHRvIHRoZSBzZWxlY3QnXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoY29udHJvbENsYXNzU2VydmljZSkge1xuICAgICAgY29udHJvbENsYXNzU2VydmljZS5pbml0Q29udHJvbENsYXNzKHJlbmRlcmVyLCBlbC5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBzdXBlci5uZ09uSW5pdCgpO1xuICAgIGlmICh0aGlzLm5nQ29udHJvbFNlcnZpY2UpIHtcbiAgICAgIHRoaXMubmdDb250cm9sU2VydmljZS5zZXRDb250cm9sKHRoaXMuY29udHJvbCk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignYmx1cicpXG4gIG9uQmx1cigpIHtcbiAgICBpZiAodGhpcy5pZkVycm9yU2VydmljZSkge1xuICAgICAgdGhpcy5pZkVycm9yU2VydmljZS50cmlnZ2VyU3RhdHVzQ2hhbmdlKCk7XG4gICAgfVxuICB9XG59XG4iXX0=