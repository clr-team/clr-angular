/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import { ClrLoadingState } from '../../utils/loading/loading';
import { LoadingListener } from '../../utils/loading/loading-listener';
export class ClrLoadingButton {
    /**
     * @param {?} el
     * @param {?} renderer
     */
    constructor(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.buttonState = ClrLoadingState;
        this.state = ClrLoadingState.DEFAULT;
        this.clrLoadingChange = new EventEmitter(false);
    }
    /**
     * @param {?} state
     * @return {?}
     */
    loadingStateChange(state) {
        if (state === this.state) {
            return;
        }
        this.state = state;
        switch (state) {
            case ClrLoadingState.DEFAULT:
                this.renderer.removeStyle(this.el.nativeElement, 'width');
                this.renderer.removeStyle(this.el.nativeElement, 'transform'); // for chromium render bug see issue https://github.com/vmware/clarity/issues/2700
                if (!this.disabled) {
                    this.renderer.removeAttribute(this.el.nativeElement, 'disabled');
                }
                break;
            case ClrLoadingState.LOADING:
                this.setExplicitButtonWidth();
                this.renderer.setStyle(this.el.nativeElement, 'transform', 'translatez(0)'); // for chromium render bug see issue https://github.com/vmware/clarity/issues/2700
                this.renderer.setAttribute(this.el.nativeElement, 'disabled', '');
                break;
            case ClrLoadingState.SUCCESS:
                this.setExplicitButtonWidth();
                break;
            case ClrLoadingState.ERROR:
                this.loadingStateChange(ClrLoadingState.DEFAULT);
                break;
            default:
                break;
        }
        this.clrLoadingChange.emit(state);
    }
    /**
     * @private
     * @return {?}
     */
    setExplicitButtonWidth() {
        if (this.el.nativeElement && this.el.nativeElement.getBoundingClientRect) {
            /** @type {?} */
            const boundingClientRect = this.el.nativeElement.getBoundingClientRect();
            this.renderer.setStyle(this.el.nativeElement, 'width', `${boundingClientRect.width}px`);
        }
    }
}
ClrLoadingButton.decorators = [
    { type: Component, args: [{
                selector: 'button[clrLoading]',
                template: `
        <ng-container [ngSwitch]="state">
            <span *ngSwitchCase="buttonState.LOADING">
                <span @spinner class="spinner spinner-inline"></span>
            </span>
            <span *ngSwitchCase="buttonState.SUCCESS">
                <span @validated (@validated.done)="this.loadingStateChange(this.buttonState.DEFAULT)" class="spinner spinner-inline spinner-check"></span>
            </span>
            <span *ngSwitchCase="buttonState.DEFAULT" @defaultButton>
                <ng-content></ng-content>
            </span>
        </ng-container>
    `,
                providers: [{ provide: LoadingListener, useExisting: ClrLoadingButton }],
                animations: [
                    trigger('defaultButton', [
                        transition(':enter', [style({ opacity: 0 }), animate('200ms 100ms ease-in', style({ opacity: 1 }))]),
                        // TODO: see if we can get leave animation to work before spinner's enter animation
                        transition(':leave', [style({ opacity: 0 })]),
                    ]),
                    trigger('spinner', [
                        transition(':enter', [style({ opacity: 0 }), animate('200ms 100ms ease-in', style({ opacity: 1 }))]),
                        transition(':leave', [style({ opacity: 1 }), animate('100ms ease-out', style({ opacity: 0 }))]),
                    ]),
                    trigger('validated', [
                        transition(':enter', [
                            animate('600ms', keyframes([
                                style({ transform: 'scale(0,0)', offset: 0 }),
                                style({ opacity: 1, offset: 0.2 }),
                                style({ transform: 'scale(1.2,1.2)', offset: 0.4 }),
                                style({ transform: 'scale(.9,.9)', offset: 0.6 }),
                                style({ transform: 'scale(1,1)', offset: 1 }),
                            ])),
                        ]),
                        transition(':leave', [style({ opacity: 1 }), animate('100ms ease-out', style({ opacity: 0 }))]),
                    ]),
                ],
                host: { '[attr.disabled]': "disabled? '' : null" }
            }] }
];
/** @nocollapse */
ClrLoadingButton.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
ClrLoadingButton.propDecorators = {
    disabled: [{ type: Input, args: ['disabled',] }],
    clrLoadingChange: [{ type: Output, args: ['clrLoadingChange',] }]
};
if (false) {
    /** @type {?} */
    ClrLoadingButton.prototype.buttonState;
    /** @type {?} */
    ClrLoadingButton.prototype.state;
    /** @type {?} */
    ClrLoadingButton.prototype.disabled;
    /** @type {?} */
    ClrLoadingButton.prototype.clrLoadingChange;
    /** @type {?} */
    ClrLoadingButton.prototype.el;
    /**
     * @type {?}
     * @private
     */
    ClrLoadingButton.prototype.renderer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy1idXR0b24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJidXR0b24vYnV0dG9uLWxvYWRpbmcvbG9hZGluZy1idXR0b24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBTUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNyRixPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzlELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQThDdkUsTUFBTSxPQUFPLGdCQUFnQjs7Ozs7SUFTM0IsWUFBbUIsRUFBYyxFQUFVLFFBQW1CO1FBQTNDLE9BQUUsR0FBRixFQUFFLENBQVk7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBUnZELGdCQUFXLEdBQUcsZUFBZSxDQUFDO1FBQzlCLFVBQUssR0FBb0IsZUFBZSxDQUFDLE9BQU8sQ0FBQztRQUtqRCxxQkFBZ0IsR0FBa0MsSUFBSSxZQUFZLENBQWtCLEtBQUssQ0FBQyxDQUFDO0lBRWpDLENBQUM7Ozs7O0lBRWxFLGtCQUFrQixDQUFDLEtBQXNCO1FBQ3ZDLElBQUksS0FBSyxLQUFLLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDeEIsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFFbkIsUUFBUSxLQUFLLEVBQUU7WUFDYixLQUFLLGVBQWUsQ0FBQyxPQUFPO2dCQUMxQixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsQ0FBQztn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eXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IGFuaW1hdGUsIGtleWZyYW1lcywgc3R5bGUsIHRyYW5zaXRpb24sIHRyaWdnZXIgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENsckxvYWRpbmdTdGF0ZSB9IGZyb20gJy4uLy4uL3V0aWxzL2xvYWRpbmcvbG9hZGluZyc7XG5pbXBvcnQgeyBMb2FkaW5nTGlzdGVuZXIgfSBmcm9tICcuLi8uLi91dGlscy9sb2FkaW5nL2xvYWRpbmctbGlzdGVuZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdidXR0b25bY2xyTG9hZGluZ10nLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgICA8bmctY29udGFpbmVyIFtuZ1N3aXRjaF09XCJzdGF0ZVwiPlxuICAgICAgICAgICAgPHNwYW4gKm5nU3dpdGNoQ2FzZT1cImJ1dHRvblN0YXRlLkxPQURJTkdcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBAc3Bpbm5lciBjbGFzcz1cInNwaW5uZXIgc3Bpbm5lci1pbmxpbmVcIj48L3NwYW4+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiAqbmdTd2l0Y2hDYXNlPVwiYnV0dG9uU3RhdGUuU1VDQ0VTU1wiPlxuICAgICAgICAgICAgICAgIDxzcGFuIEB2YWxpZGF0ZWQgKEB2YWxpZGF0ZWQuZG9uZSk9XCJ0aGlzLmxvYWRpbmdTdGF0ZUNoYW5nZSh0aGlzLmJ1dHRvblN0YXRlLkRFRkFVTFQpXCIgY2xhc3M9XCJzcGlubmVyIHNwaW5uZXItaW5saW5lIHNwaW5uZXItY2hlY2tcIj48L3NwYW4+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiAqbmdTd2l0Y2hDYXNlPVwiYnV0dG9uU3RhdGUuREVGQVVMVFwiIEBkZWZhdWx0QnV0dG9uPlxuICAgICAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgYCxcbiAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBMb2FkaW5nTGlzdGVuZXIsIHVzZUV4aXN0aW5nOiBDbHJMb2FkaW5nQnV0dG9uIH1dLFxuICBhbmltYXRpb25zOiBbXG4gICAgdHJpZ2dlcignZGVmYXVsdEJ1dHRvbicsIFtcbiAgICAgIHRyYW5zaXRpb24oJzplbnRlcicsIFtzdHlsZSh7IG9wYWNpdHk6IDAgfSksIGFuaW1hdGUoJzIwMG1zIDEwMG1zIGVhc2UtaW4nLCBzdHlsZSh7IG9wYWNpdHk6IDEgfSkpXSksXG4gICAgICAvLyBUT0RPOiBzZWUgaWYgd2UgY2FuIGdldCBsZWF2ZSBhbmltYXRpb24gdG8gd29yayBiZWZvcmUgc3Bpbm5lcidzIGVudGVyIGFuaW1hdGlvblxuICAgICAgdHJhbnNpdGlvbignOmxlYXZlJywgW3N0eWxlKHsgb3BhY2l0eTogMCB9KV0pLFxuICAgIF0pLFxuICAgIHRyaWdnZXIoJ3NwaW5uZXInLCBbXG4gICAgICB0cmFuc2l0aW9uKCc6ZW50ZXInLCBbc3R5bGUoeyBvcGFjaXR5OiAwIH0pLCBhbmltYXRlKCcyMDBtcyAxMDBtcyBlYXNlLWluJywgc3R5bGUoeyBvcGFjaXR5OiAxIH0pKV0pLFxuICAgICAgdHJhbnNpdGlvbignOmxlYXZlJywgW3N0eWxlKHsgb3BhY2l0eTogMSB9KSwgYW5pbWF0ZSgnMTAwbXMgZWFzZS1vdXQnLCBzdHlsZSh7IG9wYWNpdHk6IDAgfSkpXSksXG4gICAgXSksXG4gICAgdHJpZ2dlcigndmFsaWRhdGVkJywgW1xuICAgICAgdHJhbnNpdGlvbignOmVudGVyJywgW1xuICAgICAgICBhbmltYXRlKFxuICAgICAgICAgICc2MDBtcycsXG4gICAgICAgICAga2V5ZnJhbWVzKFtcbiAgICAgICAgICAgIHN0eWxlKHsgdHJhbnNmb3JtOiAnc2NhbGUoMCwwKScsIG9mZnNldDogMCB9KSxcbiAgICAgICAgICAgIHN0eWxlKHsgb3BhY2l0eTogMSwgb2Zmc2V0OiAwLjIgfSksXG4gICAgICAgICAgICBzdHlsZSh7IHRyYW5zZm9ybTogJ3NjYWxlKDEuMiwxLjIpJywgb2Zmc2V0OiAwLjQgfSksXG4gICAgICAgICAgICBzdHlsZSh7IHRyYW5zZm9ybTogJ3NjYWxlKC45LC45KScsIG9mZnNldDogMC42IH0pLFxuICAgICAgICAgICAgc3R5bGUoeyB0cmFuc2Zvcm06ICdzY2FsZSgxLDEpJywgb2Zmc2V0OiAxIH0pLFxuICAgICAgICAgIF0pXG4gICAgICAgICksXG4gICAgICBdKSxcbiAgICAgIHRyYW5zaXRpb24oJzpsZWF2ZScsIFtzdHlsZSh7IG9wYWNpdHk6IDEgfSksIGFuaW1hdGUoJzEwMG1zIGVhc2Utb3V0Jywgc3R5bGUoeyBvcGFjaXR5OiAwIH0pKV0pLFxuICAgIF0pLFxuICBdLFxuICBob3N0OiB7ICdbYXR0ci5kaXNhYmxlZF0nOiBcImRpc2FibGVkPyAnJyA6IG51bGxcIiB9LFxufSlcbmV4cG9ydCBjbGFzcyBDbHJMb2FkaW5nQnV0dG9uIGltcGxlbWVudHMgTG9hZGluZ0xpc3RlbmVyIHtcbiAgcHVibGljIGJ1dHRvblN0YXRlID0gQ2xyTG9hZGluZ1N0YXRlO1xuICBwdWJsaWMgc3RhdGU6IENsckxvYWRpbmdTdGF0ZSA9IENsckxvYWRpbmdTdGF0ZS5ERUZBVUxUO1xuXG4gIEBJbnB1dCgnZGlzYWJsZWQnKSBwdWJsaWMgZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgQE91dHB1dCgnY2xyTG9hZGluZ0NoYW5nZScpXG4gIHB1YmxpYyBjbHJMb2FkaW5nQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Q2xyTG9hZGluZ1N0YXRlPiA9IG5ldyBFdmVudEVtaXR0ZXI8Q2xyTG9hZGluZ1N0YXRlPihmYWxzZSk7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmLCBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHt9XG5cbiAgbG9hZGluZ1N0YXRlQ2hhbmdlKHN0YXRlOiBDbHJMb2FkaW5nU3RhdGUpOiB2b2lkIHtcbiAgICBpZiAoc3RhdGUgPT09IHRoaXMuc3RhdGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuXG4gICAgc3dpdGNoIChzdGF0ZSkge1xuICAgICAgY2FzZSBDbHJMb2FkaW5nU3RhdGUuREVGQVVMVDpcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICd3aWR0aCcpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZVN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3RyYW5zZm9ybScpOyAvLyBmb3IgY2hyb21pdW0gcmVuZGVyIGJ1ZyBzZWUgaXNzdWUgaHR0cHM6Ly9naXRodWIuY29tL3Ztd2FyZS9jbGFyaXR5L2lzc3Vlcy8yNzAwXG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQXR0cmlidXRlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2Rpc2FibGVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIENsckxvYWRpbmdTdGF0ZS5MT0FESU5HOlxuICAgICAgICB0aGlzLnNldEV4cGxpY2l0QnV0dG9uV2lkdGgoKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICd0cmFuc2Zvcm0nLCAndHJhbnNsYXRleigwKScpOyAvLyBmb3IgY2hyb21pdW0gcmVuZGVyIGJ1ZyBzZWUgaXNzdWUgaHR0cHM6Ly9naXRodWIuY29tL3Ztd2FyZS9jbGFyaXR5L2lzc3Vlcy8yNzAwXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2Rpc2FibGVkJywgJycpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgQ2xyTG9hZGluZ1N0YXRlLlNVQ0NFU1M6XG4gICAgICAgIHRoaXMuc2V0RXhwbGljaXRCdXR0b25XaWR0aCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgQ2xyTG9hZGluZ1N0YXRlLkVSUk9SOlxuICAgICAgICB0aGlzLmxvYWRpbmdTdGF0ZUNoYW5nZShDbHJMb2FkaW5nU3RhdGUuREVGQVVMVCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHRoaXMuY2xyTG9hZGluZ0NoYW5nZS5lbWl0KHN0YXRlKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0RXhwbGljaXRCdXR0b25XaWR0aCgpIHtcbiAgICBpZiAodGhpcy5lbC5uYXRpdmVFbGVtZW50ICYmIHRoaXMuZWwubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QpIHtcbiAgICAgIGNvbnN0IGJvdW5kaW5nQ2xpZW50UmVjdCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnd2lkdGgnLCBgJHtib3VuZGluZ0NsaWVudFJlY3Qud2lkdGh9cHhgKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==