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
var ClrLabel = /** @class */ (function () {
    function ClrLabel(controlIdService, layoutService, renderer, el) {
        this.controlIdService = controlIdService;
        this.layoutService = layoutService;
        this.renderer = renderer;
        this.el = el;
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
        if (this.controlIdService) {
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
        if (!this.forAttr && this.controlIdService) {
            this.subscription = this.controlIdService.idChange.subscribe(function (id) { return (_this.forAttr = id); });
        }
    };
    /**
     * @return {?}
     */
    ClrLabel.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    ClrLabel.decorators = [
        { type: Directive, args: [{ selector: 'label' },] }
    ];
    /** @nocollapse */
    ClrLabel.ctorParameters = function () { return [
        { type: ControlIdService, decorators: [{ type: Optional }] },
        { type: LayoutService, decorators: [{ type: Optional }] },
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
    ClrLabel.prototype.subscription;
    /** @type {?} */
    ClrLabel.prototype.controlIdService;
    /** @type {?} */
    ClrLabel.prototype.layoutService;
    /** @type {?} */
    ClrLabel.prototype.renderer;
    /** @type {?} */
    ClrLabel.prototype.el;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFiZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJmb3Jtcy9jb21tb24vbGFiZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBcUIsUUFBUSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUdsSCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFM0Q7SUFFRSxrQkFDc0IsZ0JBQWtDLEVBQ2xDLGFBQTRCLEVBQ3hDLFFBQW1CLEVBQ25CLEVBQWM7UUFIRixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQ3hDLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsT0FBRSxHQUFGLEVBQUUsQ0FBWTtJQUNyQixDQUFDOzs7O0lBUUosMkJBQVE7OztJQUFSO1FBQUEsaUJBa0JDO1FBakJDLHFFQUFxRTtRQUNyRSxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUN6QixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO1NBQ3BFO1FBQ0QsaUdBQWlHO1FBQ2pHLElBQ0UsSUFBSSxDQUFDLGFBQWE7WUFDbEIsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRTtZQUNoQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWE7WUFDckIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQ3REO1lBQ0EsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsZUFBZSxDQUFDLENBQUM7WUFDL0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsY0FBYyxDQUFDLENBQUM7U0FDL0Q7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDMUMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxVQUFBLEVBQUUsSUFBSSxPQUFBLENBQUMsS0FBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsRUFBbkIsQ0FBbUIsQ0FBQyxDQUFDO1NBQ3pGO0lBQ0gsQ0FBQzs7OztJQUVELDhCQUFXOzs7SUFBWDtRQUNFLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNyQixJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ2pDO0lBQ0gsQ0FBQzs7Z0JBdkNGLFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUU7Ozs7Z0JBSHZCLGdCQUFnQix1QkFNcEIsUUFBUTtnQkFMSixhQUFhLHVCQU1qQixRQUFRO2dCQVZvRSxTQUFTO2dCQUF0RSxVQUFVOzs7MEJBZTNCLFdBQVcsU0FBQyxVQUFVLGNBQ3RCLEtBQUssU0FBQyxLQUFLOztJQThCZCxlQUFDO0NBQUEsQUF4Q0QsSUF3Q0M7U0F2Q1ksUUFBUTs7O0lBUW5CLDJCQUVnQjs7SUFFaEIsZ0NBQW1DOztJQVZqQyxvQ0FBc0Q7O0lBQ3RELGlDQUFnRDs7SUFDaEQsNEJBQTJCOztJQUMzQixzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3RCaW5kaW5nLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIE9wdGlvbmFsLCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBDb250cm9sSWRTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvY29udHJvbC1pZC5zZXJ2aWNlJztcbmltcG9ydCB7IExheW91dFNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9sYXlvdXQuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ2xhYmVsJyB9KVxuZXhwb3J0IGNsYXNzIENsckxhYmVsIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBjb25zdHJ1Y3RvcihcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGNvbnRyb2xJZFNlcnZpY2U6IENvbnRyb2xJZFNlcnZpY2UsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBsYXlvdXRTZXJ2aWNlOiBMYXlvdXRTZXJ2aWNlLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmXG4gICkge31cblxuICBASG9zdEJpbmRpbmcoJ2F0dHIuZm9yJylcbiAgQElucHV0KCdmb3InKVxuICBmb3JBdHRyOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICBuZ09uSW5pdCgpIHtcbiAgICAvLyBPbmx5IGFkZCB0aGUgY2xyLWNvbnRyb2wtbGFiZWwgaWYgaXQgaXMgaW5zaWRlIGEgY29udHJvbCBjb250YWluZXJcbiAgICBpZiAodGhpcy5jb250cm9sSWRTZXJ2aWNlKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2Nsci1jb250cm9sLWxhYmVsJyk7XG4gICAgfVxuICAgIC8vIE9ubHkgc2V0IHRoZSBncmlkIGNvbHVtbiBjbGFzc2VzIGlmIHdlIGFyZSBpbiB0aGUgcmlnaHQgY29udGV4dCBhbmQgaWYgdGhleSBhcmVuJ3QgYWxyZWFkeSBzZXRcbiAgICBpZiAoXG4gICAgICB0aGlzLmxheW91dFNlcnZpY2UgJiZcbiAgICAgICF0aGlzLmxheW91dFNlcnZpY2UuaXNWZXJ0aWNhbCgpICYmXG4gICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQgJiZcbiAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5jbGFzc05hbWUuaW5kZXhPZignY2xyLWNvbCcpIDwgMFxuICAgICkge1xuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdjbHItY29sLXhzLTEyJyk7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2Nsci1jb2wtbWQtMicpO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuZm9yQXR0ciAmJiB0aGlzLmNvbnRyb2xJZFNlcnZpY2UpIHtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy5jb250cm9sSWRTZXJ2aWNlLmlkQ2hhbmdlLnN1YnNjcmliZShpZCA9PiAodGhpcy5mb3JBdHRyID0gaWQpKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5zdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG59XG4iXX0=