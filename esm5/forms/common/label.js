/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive, ElementRef, HostBinding, Input, Optional, Renderer2 } from '@angular/core';
import { ControlIdService } from './providers/control-id.service';
import { LayoutService } from './providers/layout.service';
import { NgControlService } from './providers/ng-control.service';
var ClrLabel = /** @class */ (function () {
    function ClrLabel(controlIdService, layoutService, ngControlService, renderer, el) {
        this.controlIdService = controlIdService;
        this.layoutService = layoutService;
        this.ngControlService = ngControlService;
        this.renderer = renderer;
        this.el = el;
        this.subscriptions = [];
    }
    /**
     * @return {?}
     */
    ClrLabel.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // Only add the clr-control-label if it is inside a control container
        if (this.controlIdService || this.ngControlService) {
            this.renderer.addClass(this.el.nativeElement, 'clr-control-label');
        }
        // Only set the grid column classes if we are in the right context and if they aren't already set
        if (this.layoutService &&
            !this.layoutService.isVertical() &&
            this.el.nativeElement &&
            this.el.nativeElement.className.indexOf('clr-col') < 0) {
            this.renderer.addClass(this.el.nativeElement, 'clr-col-xs-12');
            this.renderer.addClass(this.el.nativeElement, 'clr-col-md-2');
        }
        if (this.controlIdService && !this.forAttr) {
            this.subscriptions.push(this.controlIdService.idChange.subscribe(function (id) { return (_this.forAttr = id); }));
        }
    };
    /**
     * @return {?}
     */
    ClrLabel.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    ClrLabel.decorators = [
        { type: Directive, args: [{ selector: 'label' },] }
    ];
    /** @nocollapse */
    ClrLabel.ctorParameters = function () { return [
        { type: ControlIdService, decorators: [{ type: Optional }] },
        { type: LayoutService, decorators: [{ type: Optional }] },
        { type: NgControlService, decorators: [{ type: Optional }] },
        { type: Renderer2 },
        { type: ElementRef }
    ]; };
    ClrLabel.propDecorators = {
        forAttr: [{ type: HostBinding, args: ['attr.for',] }, { type: Input, args: ['for',] }]
    };
    return ClrLabel;
}());
export { ClrLabel };
if (false) {
    /** @type {?} */
    ClrLabel.prototype.forAttr;
    /** @type {?} */
    ClrLabel.prototype.subscriptions;
    /** @type {?} */
    ClrLabel.prototype.controlIdService;
    /** @type {?} */
    ClrLabel.prototype.layoutService;
    /** @type {?} */
    ClrLabel.prototype.ngControlService;
    /** @type {?} */
    ClrLabel.prototype.renderer;
    /** @type {?} */
    ClrLabel.prototype.el;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFiZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJmb3Jtcy9jb21tb24vbGFiZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBcUIsUUFBUSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUdsSCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFFbEU7SUFFRSxrQkFDc0IsZ0JBQWtDLEVBQ2xDLGFBQTRCLEVBQzVCLGdCQUFrQyxFQUM5QyxRQUFtQixFQUNuQixFQUFjO1FBSkYscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQzlDLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQU9oQixrQkFBYSxHQUFtQixFQUFFLENBQUM7SUFOeEMsQ0FBQzs7OztJQVFKLDJCQUFROzs7SUFBUjtRQUFBLGlCQWtCQztRQWpCQyxxRUFBcUU7UUFDckUsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBQ2xELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLG1CQUFtQixDQUFDLENBQUM7U0FDcEU7UUFDRCxpR0FBaUc7UUFDakcsSUFDRSxJQUFJLENBQUMsYUFBYTtZQUNsQixDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFO1lBQ2hDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYTtZQUNyQixJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFDdEQ7WUFDQSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxlQUFlLENBQUMsQ0FBQztZQUMvRCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxjQUFjLENBQUMsQ0FBQztTQUMvRDtRQUNELElBQUksSUFBSSxDQUFDLGdCQUFnQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUMxQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxVQUFBLEVBQUUsSUFBSSxPQUFBLENBQUMsS0FBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsRUFBbkIsQ0FBbUIsQ0FBQyxDQUFDLENBQUM7U0FDOUY7SUFDSCxDQUFDOzs7O0lBRUQsOEJBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLENBQUMsV0FBVyxFQUFFLEVBQWpCLENBQWlCLENBQUMsQ0FBQztJQUN2RCxDQUFDOztnQkF0Q0YsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRTs7OztnQkFKdkIsZ0JBQWdCLHVCQU9wQixRQUFRO2dCQU5KLGFBQWEsdUJBT2pCLFFBQVE7Z0JBTkosZ0JBQWdCLHVCQU9wQixRQUFRO2dCQVpvRSxTQUFTO2dCQUF0RSxVQUFVOzs7MEJBaUIzQixXQUFXLFNBQUMsVUFBVSxjQUN0QixLQUFLLFNBQUMsS0FBSzs7SUE0QmQsZUFBQztDQUFBLEFBdkNELElBdUNDO1NBdENZLFFBQVE7OztJQVNuQiwyQkFFZ0I7O0lBRWhCLGlDQUEyQzs7SUFYekMsb0NBQXNEOztJQUN0RCxpQ0FBZ0Q7O0lBQ2hELG9DQUFzRDs7SUFDdEQsNEJBQTJCOztJQUMzQixzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3RCaW5kaW5nLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIE9wdGlvbmFsLCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBDb250cm9sSWRTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvY29udHJvbC1pZC5zZXJ2aWNlJztcbmltcG9ydCB7IExheW91dFNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9sYXlvdXQuc2VydmljZSc7XG5pbXBvcnQgeyBOZ0NvbnRyb2xTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvbmctY29udHJvbC5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnbGFiZWwnIH0pXG5leHBvcnQgY2xhc3MgQ2xyTGFiZWwgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgY29udHJvbElkU2VydmljZTogQ29udHJvbElkU2VydmljZSxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGxheW91dFNlcnZpY2U6IExheW91dFNlcnZpY2UsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBuZ0NvbnRyb2xTZXJ2aWNlOiBOZ0NvbnRyb2xTZXJ2aWNlLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmXG4gICkge31cblxuICBASG9zdEJpbmRpbmcoJ2F0dHIuZm9yJylcbiAgQElucHV0KCdmb3InKVxuICBmb3JBdHRyOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gIG5nT25Jbml0KCkge1xuICAgIC8vIE9ubHkgYWRkIHRoZSBjbHItY29udHJvbC1sYWJlbCBpZiBpdCBpcyBpbnNpZGUgYSBjb250cm9sIGNvbnRhaW5lclxuICAgIGlmICh0aGlzLmNvbnRyb2xJZFNlcnZpY2UgfHwgdGhpcy5uZ0NvbnRyb2xTZXJ2aWNlKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2Nsci1jb250cm9sLWxhYmVsJyk7XG4gICAgfVxuICAgIC8vIE9ubHkgc2V0IHRoZSBncmlkIGNvbHVtbiBjbGFzc2VzIGlmIHdlIGFyZSBpbiB0aGUgcmlnaHQgY29udGV4dCBhbmQgaWYgdGhleSBhcmVuJ3QgYWxyZWFkeSBzZXRcbiAgICBpZiAoXG4gICAgICB0aGlzLmxheW91dFNlcnZpY2UgJiZcbiAgICAgICF0aGlzLmxheW91dFNlcnZpY2UuaXNWZXJ0aWNhbCgpICYmXG4gICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQgJiZcbiAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5jbGFzc05hbWUuaW5kZXhPZignY2xyLWNvbCcpIDwgMFxuICAgICkge1xuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdjbHItY29sLXhzLTEyJyk7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2Nsci1jb2wtbWQtMicpO1xuICAgIH1cbiAgICBpZiAodGhpcy5jb250cm9sSWRTZXJ2aWNlICYmICF0aGlzLmZvckF0dHIpIHtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKHRoaXMuY29udHJvbElkU2VydmljZS5pZENoYW5nZS5zdWJzY3JpYmUoaWQgPT4gKHRoaXMuZm9yQXR0ciA9IGlkKSkpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHN1YiA9PiBzdWIudW5zdWJzY3JpYmUoKSk7XG4gIH1cbn1cbiJdfQ==