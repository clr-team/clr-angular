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
import { ClrCheckboxWrapper } from './checkbox-wrapper';
import { IfErrorService } from '../common/if-error/if-error.service';
import { ControlClassService } from '../common/providers/control-class.service';
import { NgControlService } from '../common/providers/ng-control.service';
import { WrappedFormControl } from '../common/wrapped-control';
export class ClrCheckbox extends WrappedFormControl {
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
        super(ClrCheckboxWrapper, vcr, 0);
        this.ngControlService = ngControlService;
        this.ifErrorService = ifErrorService;
        this.control = control;
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
ClrCheckbox.decorators = [
    { type: Directive, args: [{ selector: '[clrCheckbox]' },] }
];
/** @nocollapse */
ClrCheckbox.ctorParameters = () => [
    { type: ViewContainerRef },
    { type: NgControlService, decorators: [{ type: Optional }] },
    { type: IfErrorService, decorators: [{ type: Optional }] },
    { type: NgControl, decorators: [{ type: Optional }] },
    { type: ControlClassService, decorators: [{ type: Optional }] },
    { type: ElementRef },
    { type: Renderer2 }
];
ClrCheckbox.propDecorators = {
    onBlur: [{ type: HostListener, args: ['blur',] }]
};
if (false) {
    /** @type {?} */
    ClrCheckbox.prototype.ngControlService;
    /** @type {?} */
    ClrCheckbox.prototype.ifErrorService;
    /** @type {?} */
    ClrCheckbox.prototype.control;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3guanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJmb3Jtcy9jaGVja2JveC9jaGVja2JveC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFNQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFVLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuSCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFeEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRy9ELE1BQU0sT0FBTyxXQUFZLFNBQVEsa0JBQXNDOzs7Ozs7Ozs7O0lBQ3JFLFlBQ0UsR0FBcUIsRUFDRCxnQkFBa0MsRUFDbEMsY0FBOEIsRUFDOUIsT0FBa0IsRUFDMUIsbUJBQXdDLEVBQ3BELEVBQWMsRUFDZCxRQUFtQjtRQUVuQixLQUFLLENBQUMsa0JBQWtCLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBUGQscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsWUFBTyxHQUFQLE9BQU8sQ0FBVztRQU10QyxJQUFJLG1CQUFtQixFQUFFO1lBQ3ZCLG1CQUFtQixDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDbEU7SUFDSCxDQUFDOzs7O0lBRUQsUUFBUTtRQUNOLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNqQixJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUN6QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNoRDtJQUNILENBQUM7Ozs7SUFHRCxNQUFNO1FBQ0osSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxjQUFjLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztTQUMzQztJQUNILENBQUM7OztZQTdCRixTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsZUFBZSxFQUFFOzs7O1lBVG1DLGdCQUFnQjtZQU1sRixnQkFBZ0IsdUJBT3BCLFFBQVE7WUFUSixjQUFjLHVCQVVsQixRQUFRO1lBYkosU0FBUyx1QkFjYixRQUFRO1lBVkosbUJBQW1CLHVCQVd2QixRQUFRO1lBaEJrQixVQUFVO1lBQXJCLFNBQVM7OztxQkFpQzFCLFlBQVksU0FBQyxNQUFNOzs7O0lBcEJsQix1Q0FBc0Q7O0lBQ3RELHFDQUFrRDs7SUFDbEQsOEJBQXNDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgRGlyZWN0aXZlLCBSZW5kZXJlcjIsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciwgT25Jbml0LCBPcHRpb25hbCwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQ2xyQ2hlY2tib3hXcmFwcGVyIH0gZnJvbSAnLi9jaGVja2JveC13cmFwcGVyJztcblxuaW1wb3J0IHsgSWZFcnJvclNlcnZpY2UgfSBmcm9tICcuLi9jb21tb24vaWYtZXJyb3IvaWYtZXJyb3Iuc2VydmljZSc7XG5pbXBvcnQgeyBDb250cm9sQ2xhc3NTZXJ2aWNlIH0gZnJvbSAnLi4vY29tbW9uL3Byb3ZpZGVycy9jb250cm9sLWNsYXNzLnNlcnZpY2UnO1xuaW1wb3J0IHsgTmdDb250cm9sU2VydmljZSB9IGZyb20gJy4uL2NvbW1vbi9wcm92aWRlcnMvbmctY29udHJvbC5zZXJ2aWNlJztcbmltcG9ydCB7IFdyYXBwZWRGb3JtQ29udHJvbCB9IGZyb20gJy4uL2NvbW1vbi93cmFwcGVkLWNvbnRyb2wnO1xuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbY2xyQ2hlY2tib3hdJyB9KVxuZXhwb3J0IGNsYXNzIENsckNoZWNrYm94IGV4dGVuZHMgV3JhcHBlZEZvcm1Db250cm9sPENsckNoZWNrYm94V3JhcHBlcj4gaW1wbGVtZW50cyBPbkluaXQge1xuICBjb25zdHJ1Y3RvcihcbiAgICB2Y3I6IFZpZXdDb250YWluZXJSZWYsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBuZ0NvbnRyb2xTZXJ2aWNlOiBOZ0NvbnRyb2xTZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgaWZFcnJvclNlcnZpY2U6IElmRXJyb3JTZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgY29udHJvbDogTmdDb250cm9sLFxuICAgIEBPcHRpb25hbCgpIGNvbnRyb2xDbGFzc1NlcnZpY2U6IENvbnRyb2xDbGFzc1NlcnZpY2UsXG4gICAgZWw6IEVsZW1lbnRSZWYsXG4gICAgcmVuZGVyZXI6IFJlbmRlcmVyMlxuICApIHtcbiAgICBzdXBlcihDbHJDaGVja2JveFdyYXBwZXIsIHZjciwgMCk7XG4gICAgaWYgKGNvbnRyb2xDbGFzc1NlcnZpY2UpIHtcbiAgICAgIGNvbnRyb2xDbGFzc1NlcnZpY2UuaW5pdENvbnRyb2xDbGFzcyhyZW5kZXJlciwgZWwubmF0aXZlRWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgc3VwZXIubmdPbkluaXQoKTtcbiAgICBpZiAodGhpcy5uZ0NvbnRyb2xTZXJ2aWNlKSB7XG4gICAgICB0aGlzLm5nQ29udHJvbFNlcnZpY2Uuc2V0Q29udHJvbCh0aGlzLmNvbnRyb2wpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2JsdXInKVxuICBvbkJsdXIoKSB7XG4gICAgaWYgKHRoaXMuaWZFcnJvclNlcnZpY2UpIHtcbiAgICAgIHRoaXMuaWZFcnJvclNlcnZpY2UudHJpZ2dlclN0YXR1c0NoYW5nZSgpO1xuICAgIH1cbiAgfVxufVxuIl19