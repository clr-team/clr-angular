/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive, ElementRef, HostListener, Inject, Injector, Optional, Renderer2, Self, ViewContainerRef, } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NgControl } from '@angular/forms';
import { ClrPasswordContainer, TOGGLE_SERVICE } from './password-container';
import { WrappedFormControl } from '../common/wrapped-control';
import { FocusService } from '../common/providers/focus.service';
export class ClrPassword extends WrappedFormControl {
    /**
     * @param {?} vcr
     * @param {?} injector
     * @param {?} control
     * @param {?} renderer
     * @param {?} el
     * @param {?} focusService
     * @param {?} toggleService
     */
    constructor(vcr, injector, control, renderer, el, focusService, toggleService) {
        super(vcr, ClrPasswordContainer, injector, control, renderer, el);
        this.focusService = focusService;
        this.toggleService = toggleService;
        this.index = 1;
        if (!this.focusService) {
            throw new Error('clrPassword requires being wrapped in <clr-password-container>');
        }
        this.subscriptions.push(this.toggleService.subscribe((/**
         * @param {?} toggle
         * @return {?}
         */
        toggle => {
            renderer.setProperty(el.nativeElement, 'type', toggle ? 'text' : 'password');
        })));
    }
    /**
     * @return {?}
     */
    triggerFocus() {
        if (this.focusService) {
            this.focusService.focused = true;
        }
    }
    /**
     * @return {?}
     */
    triggerValidation() {
        super.triggerValidation();
        if (this.focusService) {
            this.focusService.focused = false;
        }
    }
}
ClrPassword.decorators = [
    { type: Directive, args: [{ selector: '[clrPassword]', host: { '[class.clr-input]': 'true' } },] }
];
/** @nocollapse */
ClrPassword.ctorParameters = () => [
    { type: ViewContainerRef },
    { type: Injector },
    { type: NgControl, decorators: [{ type: Self }, { type: Optional }] },
    { type: Renderer2 },
    { type: ElementRef },
    { type: FocusService, decorators: [{ type: Optional }] },
    { type: BehaviorSubject, decorators: [{ type: Optional }, { type: Inject, args: [TOGGLE_SERVICE,] }] }
];
ClrPassword.propDecorators = {
    triggerFocus: [{ type: HostListener, args: ['focus',] }],
    triggerValidation: [{ type: HostListener, args: ['blur',] }]
};
if (false) {
    /**
     * @type {?}
     * @protected
     */
    ClrPassword.prototype.index;
    /**
     * @type {?}
     * @private
     */
    ClrPassword.prototype.focusService;
    /**
     * @type {?}
     * @private
     */
    ClrPassword.prototype.toggleService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFzc3dvcmQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJmb3Jtcy9wYXNzd29yZC9wYXNzd29yZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFNQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUNOLFFBQVEsRUFHUixRQUFRLEVBQ1IsU0FBUyxFQUNULElBQUksRUFDSixnQkFBZ0IsR0FDakIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN2QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFM0MsT0FBTyxFQUFFLG9CQUFvQixFQUFFLGNBQWMsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzVFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUdqRSxNQUFNLE9BQU8sV0FBWSxTQUFRLGtCQUF3Qzs7Ozs7Ozs7OztJQUd2RSxZQUNFLEdBQXFCLEVBQ3JCLFFBQWtCLEVBR2xCLE9BQWtCLEVBQ2xCLFFBQW1CLEVBQ25CLEVBQWMsRUFDTSxZQUEwQixFQUd0QyxhQUF1QztRQUUvQyxLQUFLLENBQUMsR0FBRyxFQUFFLG9CQUFvQixFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBTDlDLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBR3RDLGtCQUFhLEdBQWIsYUFBYSxDQUEwQjtRQWJ2QyxVQUFLLEdBQUcsQ0FBQyxDQUFDO1FBaUJsQixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUN0QixNQUFNLElBQUksS0FBSyxDQUFDLGdFQUFnRSxDQUFDLENBQUM7U0FDbkY7UUFFRCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FDckIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTOzs7O1FBQUMsTUFBTSxDQUFDLEVBQUU7WUFDcEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0UsQ0FBQyxFQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7Ozs7SUFHRCxZQUFZO1FBQ1YsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztTQUNsQztJQUNILENBQUM7Ozs7SUFHRCxpQkFBaUI7UUFDZixLQUFLLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUMxQixJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDckIsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1NBQ25DO0lBQ0gsQ0FBQzs7O1lBM0NGLFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQUUsSUFBSSxFQUFFLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxFQUFFLEVBQUU7Ozs7WUFUN0UsZ0JBQWdCO1lBTmhCLFFBQVE7WUFTRCxTQUFTLHVCQWFiLElBQUksWUFDSixRQUFRO1lBbkJYLFNBQVM7WUFQVCxVQUFVO1lBZ0JILFlBQVksdUJBY2hCLFFBQVE7WUFuQkosZUFBZSx1QkFvQm5CLFFBQVEsWUFDUixNQUFNLFNBQUMsY0FBYzs7OzJCQWdCdkIsWUFBWSxTQUFDLE9BQU87Z0NBT3BCLFlBQVksU0FBQyxNQUFNOzs7Ozs7O0lBbkNwQiw0QkFBb0I7Ozs7O0lBVWxCLG1DQUE4Qzs7Ozs7SUFDOUMsb0NBRStDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBIb3N0TGlzdGVuZXIsXG4gIEluamVjdCxcbiAgSW5qZWN0b3IsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPcHRpb25hbCxcbiAgUmVuZGVyZXIyLFxuICBTZWxmLFxuICBWaWV3Q29udGFpbmVyUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTmdDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBDbHJQYXNzd29yZENvbnRhaW5lciwgVE9HR0xFX1NFUlZJQ0UgfSBmcm9tICcuL3Bhc3N3b3JkLWNvbnRhaW5lcic7XG5pbXBvcnQgeyBXcmFwcGVkRm9ybUNvbnRyb2wgfSBmcm9tICcuLi9jb21tb24vd3JhcHBlZC1jb250cm9sJztcbmltcG9ydCB7IEZvY3VzU2VydmljZSB9IGZyb20gJy4uL2NvbW1vbi9wcm92aWRlcnMvZm9jdXMuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tjbHJQYXNzd29yZF0nLCBob3N0OiB7ICdbY2xhc3MuY2xyLWlucHV0XSc6ICd0cnVlJyB9IH0pXG5leHBvcnQgY2xhc3MgQ2xyUGFzc3dvcmQgZXh0ZW5kcyBXcmFwcGVkRm9ybUNvbnRyb2w8Q2xyUGFzc3dvcmRDb250YWluZXI+IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBwcm90ZWN0ZWQgaW5kZXggPSAxO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHZjcjogVmlld0NvbnRhaW5lclJlZixcbiAgICBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgQFNlbGYoKVxuICAgIEBPcHRpb25hbCgpXG4gICAgY29udHJvbDogTmdDb250cm9sLFxuICAgIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgZWw6IEVsZW1lbnRSZWYsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBmb2N1c1NlcnZpY2U6IEZvY3VzU2VydmljZSxcbiAgICBAT3B0aW9uYWwoKVxuICAgIEBJbmplY3QoVE9HR0xFX1NFUlZJQ0UpXG4gICAgcHJpdmF0ZSB0b2dnbGVTZXJ2aWNlOiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj5cbiAgKSB7XG4gICAgc3VwZXIodmNyLCBDbHJQYXNzd29yZENvbnRhaW5lciwgaW5qZWN0b3IsIGNvbnRyb2wsIHJlbmRlcmVyLCBlbCk7XG5cbiAgICBpZiAoIXRoaXMuZm9jdXNTZXJ2aWNlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsclBhc3N3b3JkIHJlcXVpcmVzIGJlaW5nIHdyYXBwZWQgaW4gPGNsci1wYXNzd29yZC1jb250YWluZXI+Jyk7XG4gICAgfVxuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLnRvZ2dsZVNlcnZpY2Uuc3Vic2NyaWJlKHRvZ2dsZSA9PiB7XG4gICAgICAgIHJlbmRlcmVyLnNldFByb3BlcnR5KGVsLm5hdGl2ZUVsZW1lbnQsICd0eXBlJywgdG9nZ2xlID8gJ3RleHQnIDogJ3Bhc3N3b3JkJyk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdmb2N1cycpXG4gIHRyaWdnZXJGb2N1cygpIHtcbiAgICBpZiAodGhpcy5mb2N1c1NlcnZpY2UpIHtcbiAgICAgIHRoaXMuZm9jdXNTZXJ2aWNlLmZvY3VzZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2JsdXInKVxuICB0cmlnZ2VyVmFsaWRhdGlvbigpIHtcbiAgICBzdXBlci50cmlnZ2VyVmFsaWRhdGlvbigpO1xuICAgIGlmICh0aGlzLmZvY3VzU2VydmljZSkge1xuICAgICAgdGhpcy5mb2N1c1NlcnZpY2UuZm9jdXNlZCA9IGZhbHNlO1xuICAgIH1cbiAgfVxufVxuIl19