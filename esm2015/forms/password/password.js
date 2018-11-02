/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive, ElementRef, HostListener, Inject, Injector, Optional, Renderer2, Self, ViewContainerRef, } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NgControl } from '@angular/forms';
import { ClrPasswordContainer, ToggleService } from './password-container';
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
        this.subscriptions.push(this.toggleService.subscribe(toggle => {
            renderer.setProperty(el.nativeElement, 'type', toggle ? 'text' : 'password');
        }));
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
    { type: BehaviorSubject, decorators: [{ type: Optional }, { type: Inject, args: [ToggleService,] }] }
];
ClrPassword.propDecorators = {
    triggerFocus: [{ type: HostListener, args: ['focus',] }],
    triggerValidation: [{ type: HostListener, args: ['blur',] }]
};
if (false) {
    /** @type {?} */
    ClrPassword.prototype.index;
    /** @type {?} */
    ClrPassword.prototype.focusService;
    /** @type {?} */
    ClrPassword.prototype.toggleService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFzc3dvcmQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJmb3Jtcy9wYXNzd29yZC9wYXNzd29yZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFNQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUNOLFFBQVEsRUFHUixRQUFRLEVBQ1IsU0FBUyxFQUNULElBQUksRUFDSixnQkFBZ0IsR0FDakIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN2QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFM0MsT0FBTyxFQUFFLG9CQUFvQixFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzNFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUdqRSxNQUFNLE9BQU8sV0FBWSxTQUFRLGtCQUF3Qzs7Ozs7Ozs7OztJQUd2RSxZQUNFLEdBQXFCLEVBQ3JCLFFBQWtCLEVBR2xCLE9BQWtCLEVBQ2xCLFFBQW1CLEVBQ25CLEVBQWMsRUFDTSxZQUEwQixFQUd0QyxhQUF1QztRQUUvQyxLQUFLLENBQUMsR0FBRyxFQUFFLG9CQUFvQixFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBTDlDLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBR3RDLGtCQUFhLEdBQWIsYUFBYSxDQUEwQjtRQWJ2QyxVQUFLLEdBQUcsQ0FBQyxDQUFDO1FBaUJsQixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUN0QixNQUFNLElBQUksS0FBSyxDQUFDLGdFQUFnRSxDQUFDLENBQUM7U0FDbkY7UUFFRCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FDckIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDcEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0UsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7Ozs7SUFHRCxZQUFZO1FBQ1YsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztTQUNsQztJQUNILENBQUM7Ozs7SUFHRCxpQkFBaUI7UUFDZixLQUFLLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUMxQixJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDckIsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1NBQ25DO0lBQ0gsQ0FBQzs7O1lBM0NGLFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQUUsSUFBSSxFQUFFLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxFQUFFLEVBQUU7Ozs7WUFUN0UsZ0JBQWdCO1lBTmhCLFFBQVE7WUFTRCxTQUFTLHVCQWFiLElBQUksWUFDSixRQUFRO1lBbkJYLFNBQVM7WUFQVCxVQUFVO1lBZ0JILFlBQVksdUJBY2hCLFFBQVE7WUFuQkosZUFBZSx1QkFvQm5CLFFBQVEsWUFDUixNQUFNLFNBQUMsYUFBYTs7OzJCQWdCdEIsWUFBWSxTQUFDLE9BQU87Z0NBT3BCLFlBQVksU0FBQyxNQUFNOzs7O0lBbkNwQiw0QkFBb0I7O0lBVWxCLG1DQUE4Qzs7SUFDOUMsb0NBRStDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBIb3N0TGlzdGVuZXIsXG4gIEluamVjdCxcbiAgSW5qZWN0b3IsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPcHRpb25hbCxcbiAgUmVuZGVyZXIyLFxuICBTZWxmLFxuICBWaWV3Q29udGFpbmVyUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTmdDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBDbHJQYXNzd29yZENvbnRhaW5lciwgVG9nZ2xlU2VydmljZSB9IGZyb20gJy4vcGFzc3dvcmQtY29udGFpbmVyJztcbmltcG9ydCB7IFdyYXBwZWRGb3JtQ29udHJvbCB9IGZyb20gJy4uL2NvbW1vbi93cmFwcGVkLWNvbnRyb2wnO1xuaW1wb3J0IHsgRm9jdXNTZXJ2aWNlIH0gZnJvbSAnLi4vY29tbW9uL3Byb3ZpZGVycy9mb2N1cy5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW2NsclBhc3N3b3JkXScsIGhvc3Q6IHsgJ1tjbGFzcy5jbHItaW5wdXRdJzogJ3RydWUnIH0gfSlcbmV4cG9ydCBjbGFzcyBDbHJQYXNzd29yZCBleHRlbmRzIFdyYXBwZWRGb3JtQ29udHJvbDxDbHJQYXNzd29yZENvbnRhaW5lcj4gaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIHByb3RlY3RlZCBpbmRleCA9IDE7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgdmNyOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIGluamVjdG9yOiBJbmplY3RvcixcbiAgICBAU2VsZigpXG4gICAgQE9wdGlvbmFsKClcbiAgICBjb250cm9sOiBOZ0NvbnRyb2wsXG4gICAgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBlbDogRWxlbWVudFJlZixcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGZvY3VzU2VydmljZTogRm9jdXNTZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpXG4gICAgQEluamVjdChUb2dnbGVTZXJ2aWNlKVxuICAgIHByaXZhdGUgdG9nZ2xlU2VydmljZTogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+XG4gICkge1xuICAgIHN1cGVyKHZjciwgQ2xyUGFzc3dvcmRDb250YWluZXIsIGluamVjdG9yLCBjb250cm9sLCByZW5kZXJlciwgZWwpO1xuXG4gICAgaWYgKCF0aGlzLmZvY3VzU2VydmljZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdjbHJQYXNzd29yZCByZXF1aXJlcyBiZWluZyB3cmFwcGVkIGluIDxjbHItcGFzc3dvcmQtY29udGFpbmVyPicpO1xuICAgIH1cblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy50b2dnbGVTZXJ2aWNlLnN1YnNjcmliZSh0b2dnbGUgPT4ge1xuICAgICAgICByZW5kZXJlci5zZXRQcm9wZXJ0eShlbC5uYXRpdmVFbGVtZW50LCAndHlwZScsIHRvZ2dsZSA/ICd0ZXh0JyA6ICdwYXNzd29yZCcpO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZm9jdXMnKVxuICB0cmlnZ2VyRm9jdXMoKSB7XG4gICAgaWYgKHRoaXMuZm9jdXNTZXJ2aWNlKSB7XG4gICAgICB0aGlzLmZvY3VzU2VydmljZS5mb2N1c2VkID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdibHVyJylcbiAgdHJpZ2dlclZhbGlkYXRpb24oKSB7XG4gICAgc3VwZXIudHJpZ2dlclZhbGlkYXRpb24oKTtcbiAgICBpZiAodGhpcy5mb2N1c1NlcnZpY2UpIHtcbiAgICAgIHRoaXMuZm9jdXNTZXJ2aWNlLmZvY3VzZWQgPSBmYWxzZTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==