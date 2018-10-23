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
export class ClrLabel {
    /**
     * @param {?} controlIdService
     * @param {?} layoutService
     * @param {?} renderer
     * @param {?} el
     */
    constructor(controlIdService, layoutService, renderer, el) {
        this.controlIdService = controlIdService;
        this.layoutService = layoutService;
        this.renderer = renderer;
        this.el = el;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
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
            this.subscription = this.controlIdService.idChange.subscribe(id => (this.forAttr = id));
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
ClrLabel.decorators = [
    { type: Directive, args: [{ selector: 'label' },] }
];
/** @nocollapse */
ClrLabel.ctorParameters = () => [
    { type: ControlIdService, decorators: [{ type: Optional }] },
    { type: LayoutService, decorators: [{ type: Optional }] },
    { type: Renderer2 },
    { type: ElementRef }
];
ClrLabel.propDecorators = {
    forAttr: [{ type: HostBinding, args: ['attr.for',] }, { type: Input, args: ['for',] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFiZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJmb3Jtcy9jb21tb24vbGFiZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBcUIsUUFBUSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUdsSCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFHM0QsTUFBTSxPQUFPLFFBQVE7Ozs7Ozs7SUFDbkIsWUFDc0IsZ0JBQWtDLEVBQ2xDLGFBQTRCLEVBQ3hDLFFBQW1CLEVBQ25CLEVBQWM7UUFIRixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQ3hDLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsT0FBRSxHQUFGLEVBQUUsQ0FBWTtJQUNyQixDQUFDOzs7O0lBUUosUUFBUTtRQUNOLHFFQUFxRTtRQUNyRSxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUN6QixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO1NBQ3BFO1FBQ0QsaUdBQWlHO1FBQ2pHLElBQ0UsSUFBSSxDQUFDLGFBQWE7WUFDbEIsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRTtZQUNoQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWE7WUFDckIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQ3REO1lBQ0EsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsZUFBZSxDQUFDLENBQUM7WUFDL0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsY0FBYyxDQUFDLENBQUM7U0FDL0Q7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDMUMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ3pGO0lBQ0gsQ0FBQzs7OztJQUVELFdBQVc7UUFDVCxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDckIsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNqQztJQUNILENBQUM7OztZQXZDRixTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFOzs7O1lBSHZCLGdCQUFnQix1QkFNcEIsUUFBUTtZQUxKLGFBQWEsdUJBTWpCLFFBQVE7WUFWb0UsU0FBUztZQUF0RSxVQUFVOzs7c0JBZTNCLFdBQVcsU0FBQyxVQUFVLGNBQ3RCLEtBQUssU0FBQyxLQUFLOzs7O0lBRFosMkJBRWdCOztJQUVoQixnQ0FBbUM7O0lBVmpDLG9DQUFzRDs7SUFDdEQsaUNBQWdEOztJQUNoRCw0QkFBMkI7O0lBQzNCLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdEJpbmRpbmcsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3B0aW9uYWwsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IENvbnRyb2xJZFNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9jb250cm9sLWlkLnNlcnZpY2UnO1xuaW1wb3J0IHsgTGF5b3V0U2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2xheW91dC5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnbGFiZWwnIH0pXG5leHBvcnQgY2xhc3MgQ2xyTGFiZWwgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgY29udHJvbElkU2VydmljZTogQ29udHJvbElkU2VydmljZSxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGxheW91dFNlcnZpY2U6IExheW91dFNlcnZpY2UsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWZcbiAgKSB7fVxuXG4gIEBIb3N0QmluZGluZygnYXR0ci5mb3InKVxuICBASW5wdXQoJ2ZvcicpXG4gIGZvckF0dHI6IHN0cmluZztcblxuICBwcml2YXRlIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIG5nT25Jbml0KCkge1xuICAgIC8vIE9ubHkgYWRkIHRoZSBjbHItY29udHJvbC1sYWJlbCBpZiBpdCBpcyBpbnNpZGUgYSBjb250cm9sIGNvbnRhaW5lclxuICAgIGlmICh0aGlzLmNvbnRyb2xJZFNlcnZpY2UpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnY2xyLWNvbnRyb2wtbGFiZWwnKTtcbiAgICB9XG4gICAgLy8gT25seSBzZXQgdGhlIGdyaWQgY29sdW1uIGNsYXNzZXMgaWYgd2UgYXJlIGluIHRoZSByaWdodCBjb250ZXh0IGFuZCBpZiB0aGV5IGFyZW4ndCBhbHJlYWR5IHNldFxuICAgIGlmIChcbiAgICAgIHRoaXMubGF5b3V0U2VydmljZSAmJlxuICAgICAgIXRoaXMubGF5b3V0U2VydmljZS5pc1ZlcnRpY2FsKCkgJiZcbiAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudCAmJlxuICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNsYXNzTmFtZS5pbmRleE9mKCdjbHItY29sJykgPCAwXG4gICAgKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2Nsci1jb2wteHMtMTInKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnY2xyLWNvbC1tZC0yJyk7XG4gICAgfVxuICAgIGlmICghdGhpcy5mb3JBdHRyICYmIHRoaXMuY29udHJvbElkU2VydmljZSkge1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb24gPSB0aGlzLmNvbnRyb2xJZFNlcnZpY2UuaWRDaGFuZ2Uuc3Vic2NyaWJlKGlkID0+ICh0aGlzLmZvckF0dHIgPSBpZCkpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==