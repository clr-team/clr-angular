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
var ClrLoadingButton = /** @class */ (function () {
    function ClrLoadingButton(el, renderer) {
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
    ClrLoadingButton.prototype.loadingStateChange = /**
     * @param {?} state
     * @return {?}
     */
    function (state) {
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
    };
    /**
     * @private
     * @return {?}
     */
    ClrLoadingButton.prototype.setExplicitButtonWidth = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.el.nativeElement && this.el.nativeElement.getBoundingClientRect) {
            /** @type {?} */
            var boundingClientRect = this.el.nativeElement.getBoundingClientRect();
            this.renderer.setStyle(this.el.nativeElement, 'width', boundingClientRect.width + "px");
        }
    };
    ClrLoadingButton.decorators = [
        { type: Component, args: [{
                    selector: 'button[clrLoading]',
                    template: "\n        <ng-container [ngSwitch]=\"state\">\n            <span *ngSwitchCase=\"buttonState.LOADING\">\n                <span @spinner class=\"spinner spinner-inline\"></span>\n            </span>\n            <span *ngSwitchCase=\"buttonState.SUCCESS\">\n                <span @validated (@validated.done)=\"this.loadingStateChange(this.buttonState.DEFAULT)\" class=\"spinner spinner-inline spinner-check\"></span>\n            </span>\n            <span *ngSwitchCase=\"buttonState.DEFAULT\" @defaultButton>\n                <ng-content></ng-content>\n            </span>\n        </ng-container>\n    ",
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
    ClrLoadingButton.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    ClrLoadingButton.propDecorators = {
        disabled: [{ type: Input, args: ['disabled',] }],
        clrLoadingChange: [{ type: Output, args: ['clrLoadingChange',] }]
    };
    return ClrLoadingButton;
}());
export { ClrLoadingButton };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy1idXR0b24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJidXR0b24vYnV0dG9uLWxvYWRpbmcvbG9hZGluZy1idXR0b24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBTUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNyRixPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzlELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUV2RTtJQXFERSwwQkFBbUIsRUFBYyxFQUFVLFFBQW1CO1FBQTNDLE9BQUUsR0FBRixFQUFFLENBQVk7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBUnZELGdCQUFXLEdBQUcsZUFBZSxDQUFDO1FBQzlCLFVBQUssR0FBb0IsZUFBZSxDQUFDLE9BQU8sQ0FBQztRQUtqRCxxQkFBZ0IsR0FBa0MsSUFBSSxZQUFZLENBQWtCLEtBQUssQ0FBQyxDQUFDO0lBRWpDLENBQUM7Ozs7O0lBRWxFLDZDQUFrQjs7OztJQUFsQixVQUFtQixLQUFzQjtRQUN2QyxJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ3hCLE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBRW5CLFFBQVEsS0FBSyxFQUFFO1lBQ2IsS0FBSyxlQUFlLENBQUMsT0FBTztnQkFDMUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQzFELElBQUks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InNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgYW5pbWF0ZSwga2V5ZnJhbWVzLCBzdHlsZSwgdHJhbnNpdGlvbiwgdHJpZ2dlciB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2xyTG9hZGluZ1N0YXRlIH0gZnJvbSAnLi4vLi4vdXRpbHMvbG9hZGluZy9sb2FkaW5nJztcbmltcG9ydCB7IExvYWRpbmdMaXN0ZW5lciB9IGZyb20gJy4uLy4uL3V0aWxzL2xvYWRpbmcvbG9hZGluZy1saXN0ZW5lcic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2J1dHRvbltjbHJMb2FkaW5nXScsXG4gIHRlbXBsYXRlOiBgXG4gICAgICAgIDxuZy1jb250YWluZXIgW25nU3dpdGNoXT1cInN0YXRlXCI+XG4gICAgICAgICAgICA8c3BhbiAqbmdTd2l0Y2hDYXNlPVwiYnV0dG9uU3RhdGUuTE9BRElOR1wiPlxuICAgICAgICAgICAgICAgIDxzcGFuIEBzcGlubmVyIGNsYXNzPVwic3Bpbm5lciBzcGlubmVyLWlubGluZVwiPjwvc3Bhbj5cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuICpuZ1N3aXRjaENhc2U9XCJidXR0b25TdGF0ZS5TVUNDRVNTXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gQHZhbGlkYXRlZCAoQHZhbGlkYXRlZC5kb25lKT1cInRoaXMubG9hZGluZ1N0YXRlQ2hhbmdlKHRoaXMuYnV0dG9uU3RhdGUuREVGQVVMVClcIiBjbGFzcz1cInNwaW5uZXIgc3Bpbm5lci1pbmxpbmUgc3Bpbm5lci1jaGVja1wiPjwvc3Bhbj5cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuICpuZ1N3aXRjaENhc2U9XCJidXR0b25TdGF0ZS5ERUZBVUxUXCIgQGRlZmF1bHRCdXR0b24+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICBgLFxuICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IExvYWRpbmdMaXN0ZW5lciwgdXNlRXhpc3Rpbmc6IENsckxvYWRpbmdCdXR0b24gfV0sXG4gIGFuaW1hdGlvbnM6IFtcbiAgICB0cmlnZ2VyKCdkZWZhdWx0QnV0dG9uJywgW1xuICAgICAgdHJhbnNpdGlvbignOmVudGVyJywgW3N0eWxlKHsgb3BhY2l0eTogMCB9KSwgYW5pbWF0ZSgnMjAwbXMgMTAwbXMgZWFzZS1pbicsIHN0eWxlKHsgb3BhY2l0eTogMSB9KSldKSxcbiAgICAgIC8vIFRPRE86IHNlZSBpZiB3ZSBjYW4gZ2V0IGxlYXZlIGFuaW1hdGlvbiB0byB3b3JrIGJlZm9yZSBzcGlubmVyJ3MgZW50ZXIgYW5pbWF0aW9uXG4gICAgICB0cmFuc2l0aW9uKCc6bGVhdmUnLCBbc3R5bGUoeyBvcGFjaXR5OiAwIH0pXSksXG4gICAgXSksXG4gICAgdHJpZ2dlcignc3Bpbm5lcicsIFtcbiAgICAgIHRyYW5zaXRpb24oJzplbnRlcicsIFtzdHlsZSh7IG9wYWNpdHk6IDAgfSksIGFuaW1hdGUoJzIwMG1zIDEwMG1zIGVhc2UtaW4nLCBzdHlsZSh7IG9wYWNpdHk6IDEgfSkpXSksXG4gICAgICB0cmFuc2l0aW9uKCc6bGVhdmUnLCBbc3R5bGUoeyBvcGFjaXR5OiAxIH0pLCBhbmltYXRlKCcxMDBtcyBlYXNlLW91dCcsIHN0eWxlKHsgb3BhY2l0eTogMCB9KSldKSxcbiAgICBdKSxcbiAgICB0cmlnZ2VyKCd2YWxpZGF0ZWQnLCBbXG4gICAgICB0cmFuc2l0aW9uKCc6ZW50ZXInLCBbXG4gICAgICAgIGFuaW1hdGUoXG4gICAgICAgICAgJzYwMG1zJyxcbiAgICAgICAgICBrZXlmcmFtZXMoW1xuICAgICAgICAgICAgc3R5bGUoeyB0cmFuc2Zvcm06ICdzY2FsZSgwLDApJywgb2Zmc2V0OiAwIH0pLFxuICAgICAgICAgICAgc3R5bGUoeyBvcGFjaXR5OiAxLCBvZmZzZXQ6IDAuMiB9KSxcbiAgICAgICAgICAgIHN0eWxlKHsgdHJhbnNmb3JtOiAnc2NhbGUoMS4yLDEuMiknLCBvZmZzZXQ6IDAuNCB9KSxcbiAgICAgICAgICAgIHN0eWxlKHsgdHJhbnNmb3JtOiAnc2NhbGUoLjksLjkpJywgb2Zmc2V0OiAwLjYgfSksXG4gICAgICAgICAgICBzdHlsZSh7IHRyYW5zZm9ybTogJ3NjYWxlKDEsMSknLCBvZmZzZXQ6IDEgfSksXG4gICAgICAgICAgXSlcbiAgICAgICAgKSxcbiAgICAgIF0pLFxuICAgICAgdHJhbnNpdGlvbignOmxlYXZlJywgW3N0eWxlKHsgb3BhY2l0eTogMSB9KSwgYW5pbWF0ZSgnMTAwbXMgZWFzZS1vdXQnLCBzdHlsZSh7IG9wYWNpdHk6IDAgfSkpXSksXG4gICAgXSksXG4gIF0sXG4gIGhvc3Q6IHsgJ1thdHRyLmRpc2FibGVkXSc6IFwiZGlzYWJsZWQ/ICcnIDogbnVsbFwiIH0sXG59KVxuZXhwb3J0IGNsYXNzIENsckxvYWRpbmdCdXR0b24gaW1wbGVtZW50cyBMb2FkaW5nTGlzdGVuZXIge1xuICBwdWJsaWMgYnV0dG9uU3RhdGUgPSBDbHJMb2FkaW5nU3RhdGU7XG4gIHB1YmxpYyBzdGF0ZTogQ2xyTG9hZGluZ1N0YXRlID0gQ2xyTG9hZGluZ1N0YXRlLkRFRkFVTFQ7XG5cbiAgQElucHV0KCdkaXNhYmxlZCcpIHB1YmxpYyBkaXNhYmxlZDogYm9vbGVhbjtcblxuICBAT3V0cHV0KCdjbHJMb2FkaW5nQ2hhbmdlJylcbiAgcHVibGljIGNsckxvYWRpbmdDaGFuZ2U6IEV2ZW50RW1pdHRlcjxDbHJMb2FkaW5nU3RhdGU+ID0gbmV3IEV2ZW50RW1pdHRlcjxDbHJMb2FkaW5nU3RhdGU+KGZhbHNlKTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMikge31cblxuICBsb2FkaW5nU3RhdGVDaGFuZ2Uoc3RhdGU6IENsckxvYWRpbmdTdGF0ZSk6IHZvaWQge1xuICAgIGlmIChzdGF0ZSA9PT0gdGhpcy5zdGF0ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnN0YXRlID0gc3RhdGU7XG5cbiAgICBzd2l0Y2ggKHN0YXRlKSB7XG4gICAgICBjYXNlIENsckxvYWRpbmdTdGF0ZS5ERUZBVUxUOlxuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZVN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3dpZHRoJyk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlU3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAndHJhbnNmb3JtJyk7IC8vIGZvciBjaHJvbWl1bSByZW5kZXIgYnVnIHNlZSBpc3N1ZSBodHRwczovL2dpdGh1Yi5jb20vdm13YXJlL2NsYXJpdHkvaXNzdWVzLzI3MDBcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVBdHRyaWJ1dGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnZGlzYWJsZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgQ2xyTG9hZGluZ1N0YXRlLkxPQURJTkc6XG4gICAgICAgIHRoaXMuc2V0RXhwbGljaXRCdXR0b25XaWR0aCgpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3RyYW5zZm9ybScsICd0cmFuc2xhdGV6KDApJyk7IC8vIGZvciBjaHJvbWl1bSByZW5kZXIgYnVnIHNlZSBpc3N1ZSBodHRwczovL2dpdGh1Yi5jb20vdm13YXJlL2NsYXJpdHkvaXNzdWVzLzI3MDBcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnZGlzYWJsZWQnLCAnJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBDbHJMb2FkaW5nU3RhdGUuU1VDQ0VTUzpcbiAgICAgICAgdGhpcy5zZXRFeHBsaWNpdEJ1dHRvbldpZHRoKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBDbHJMb2FkaW5nU3RhdGUuRVJST1I6XG4gICAgICAgIHRoaXMubG9hZGluZ1N0YXRlQ2hhbmdlKENsckxvYWRpbmdTdGF0ZS5ERUZBVUxUKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgdGhpcy5jbHJMb2FkaW5nQ2hhbmdlLmVtaXQoc3RhdGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRFeHBsaWNpdEJ1dHRvbldpZHRoKCkge1xuICAgIGlmICh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQgJiYgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCkge1xuICAgICAgY29uc3QgYm91bmRpbmdDbGllbnRSZWN0ID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICd3aWR0aCcsIGAke2JvdW5kaW5nQ2xpZW50UmVjdC53aWR0aH1weGApO1xuICAgIH1cbiAgfVxufVxuIl19