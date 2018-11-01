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
export class ClrLabel {
    /**
     * @param {?} controlIdService
     * @param {?} layoutService
     * @param {?} ngControlService
     * @param {?} renderer
     * @param {?} el
     */
    constructor(controlIdService, layoutService, ngControlService, renderer, el) {
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
    ngOnInit() {
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
            this.subscriptions.push(this.controlIdService.idChange.subscribe(id => (this.forAttr = id)));
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
}
ClrLabel.decorators = [
    { type: Directive, args: [{ selector: 'label' },] }
];
/** @nocollapse */
ClrLabel.ctorParameters = () => [
    { type: ControlIdService, decorators: [{ type: Optional }] },
    { type: LayoutService, decorators: [{ type: Optional }] },
    { type: NgControlService, decorators: [{ type: Optional }] },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFiZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJmb3Jtcy9jb21tb24vbGFiZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBcUIsUUFBUSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUdsSCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFHbEUsTUFBTSxPQUFPLFFBQVE7Ozs7Ozs7O0lBQ25CLFlBQ3NCLGdCQUFrQyxFQUNsQyxhQUE0QixFQUM1QixnQkFBa0MsRUFDOUMsUUFBbUIsRUFDbkIsRUFBYztRQUpGLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUM5QyxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25CLE9BQUUsR0FBRixFQUFFLENBQVk7UUFPaEIsa0JBQWEsR0FBbUIsRUFBRSxDQUFDO0lBTnhDLENBQUM7Ozs7SUFRSixRQUFRO1FBQ04scUVBQXFFO1FBQ3JFLElBQUksSUFBSSxDQUFDLGdCQUFnQixJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUNsRCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO1NBQ3BFO1FBQ0QsaUdBQWlHO1FBQ2pHLElBQ0UsSUFBSSxDQUFDLGFBQWE7WUFDbEIsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRTtZQUNoQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWE7WUFDckIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQ3REO1lBQ0EsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsZUFBZSxDQUFDLENBQUM7WUFDL0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsY0FBYyxDQUFDLENBQUM7U0FDL0Q7UUFDRCxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDMUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzlGO0lBQ0gsQ0FBQzs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7OztZQXRDRixTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFOzs7O1lBSnZCLGdCQUFnQix1QkFPcEIsUUFBUTtZQU5KLGFBQWEsdUJBT2pCLFFBQVE7WUFOSixnQkFBZ0IsdUJBT3BCLFFBQVE7WUFab0UsU0FBUztZQUF0RSxVQUFVOzs7c0JBaUIzQixXQUFXLFNBQUMsVUFBVSxjQUN0QixLQUFLLFNBQUMsS0FBSzs7OztJQURaLDJCQUVnQjs7SUFFaEIsaUNBQTJDOztJQVh6QyxvQ0FBc0Q7O0lBQ3RELGlDQUFnRDs7SUFDaEQsb0NBQXNEOztJQUN0RCw0QkFBMkI7O0lBQzNCLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdEJpbmRpbmcsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3B0aW9uYWwsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IENvbnRyb2xJZFNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9jb250cm9sLWlkLnNlcnZpY2UnO1xuaW1wb3J0IHsgTGF5b3V0U2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2xheW91dC5zZXJ2aWNlJztcbmltcG9ydCB7IE5nQ29udHJvbFNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9uZy1jb250cm9sLnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdsYWJlbCcgfSlcbmV4cG9ydCBjbGFzcyBDbHJMYWJlbCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgY29uc3RydWN0b3IoXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBjb250cm9sSWRTZXJ2aWNlOiBDb250cm9sSWRTZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgbGF5b3V0U2VydmljZTogTGF5b3V0U2VydmljZSxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIG5nQ29udHJvbFNlcnZpY2U6IE5nQ29udHJvbFNlcnZpY2UsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWZcbiAgKSB7fVxuXG4gIEBIb3N0QmluZGluZygnYXR0ci5mb3InKVxuICBASW5wdXQoJ2ZvcicpXG4gIGZvckF0dHI6IHN0cmluZztcblxuICBwcml2YXRlIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgLy8gT25seSBhZGQgdGhlIGNsci1jb250cm9sLWxhYmVsIGlmIGl0IGlzIGluc2lkZSBhIGNvbnRyb2wgY29udGFpbmVyXG4gICAgaWYgKHRoaXMuY29udHJvbElkU2VydmljZSB8fCB0aGlzLm5nQ29udHJvbFNlcnZpY2UpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnY2xyLWNvbnRyb2wtbGFiZWwnKTtcbiAgICB9XG4gICAgLy8gT25seSBzZXQgdGhlIGdyaWQgY29sdW1uIGNsYXNzZXMgaWYgd2UgYXJlIGluIHRoZSByaWdodCBjb250ZXh0IGFuZCBpZiB0aGV5IGFyZW4ndCBhbHJlYWR5IHNldFxuICAgIGlmIChcbiAgICAgIHRoaXMubGF5b3V0U2VydmljZSAmJlxuICAgICAgIXRoaXMubGF5b3V0U2VydmljZS5pc1ZlcnRpY2FsKCkgJiZcbiAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudCAmJlxuICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNsYXNzTmFtZS5pbmRleE9mKCdjbHItY29sJykgPCAwXG4gICAgKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2Nsci1jb2wteHMtMTInKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnY2xyLWNvbC1tZC0yJyk7XG4gICAgfVxuICAgIGlmICh0aGlzLmNvbnRyb2xJZFNlcnZpY2UgJiYgIXRoaXMuZm9yQXR0cikge1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2godGhpcy5jb250cm9sSWRTZXJ2aWNlLmlkQ2hhbmdlLnN1YnNjcmliZShpZCA9PiAodGhpcy5mb3JBdHRyID0gaWQpKSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmZvckVhY2goc3ViID0+IHN1Yi51bnN1YnNjcmliZSgpKTtcbiAgfVxufVxuIl19