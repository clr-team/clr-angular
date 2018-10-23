/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, HostBinding, HostListener, Input, Output, ViewChild, } from '@angular/core';
import { FocusTrapDirective } from '../utils/focus-trap/focus-trap.directive';
import { ScrollingService } from '../utils/scrolling/scrolling-service';
import { ClrCommonStrings } from '../utils/i18n/common-strings.interface';
export class ClrModal {
    /**
     * @param {?} _scrollingService
     * @param {?} commonStrings
     */
    constructor(_scrollingService, commonStrings) {
        this._scrollingService = _scrollingService;
        this.commonStrings = commonStrings;
        this._open = false;
        this._openChanged = new EventEmitter(false);
        this.closable = true;
        this.staticBackdrop = false;
        this.skipAnimation = 'false';
        // presently this is only used by wizards
        this.bypassScrollService = false;
        this.stopClose = false;
        this.altClose = new EventEmitter(false);
    }
    /**
     * @return {?}
     */
    get sizeClass() {
        if (this.size) {
            return 'modal-' + this.size;
        }
        else {
            return '';
        }
    }
    // Detect when _open is set to true and set no-scrolling to true
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (!this.bypassScrollService && changes && changes.hasOwnProperty('_open')) {
            if (changes._open.currentValue) {
                this._scrollingService.stopScrolling();
            }
            else {
                this._scrollingService.resumeScrolling();
            }
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._scrollingService.resumeScrolling();
    }
    /**
     * @return {?}
     */
    open() {
        if (this._open) {
            return;
        }
        this._open = true;
        this._openChanged.emit(true);
    }
    /**
     * @return {?}
     */
    close() {
        if (this.stopClose) {
            this.altClose.emit(false);
            return;
        }
        if (!this.closable || !this._open) {
            return;
        }
        this._open = false;
        // todo: remove this after animation bug is fixed https://github.com/angular/angular/issues/15798
        // this was handled by the fadeDone event below, but that AnimationEvent is not firing in Angular 4.0.
        this._openChanged.emit(false);
        // SPECME
        this.focusTrap.setPreviousFocus(); // Handles moving focus back to the element that had it before.
    }
    /**
     * @param {?} e
     * @return {?}
     */
    fadeDone(e) {
        if (e.toState === 'void') {
            this._openChanged.emit(false);
        }
    }
}
ClrModal.decorators = [
    { type: Component, args: [{
                selector: 'clr-modal',
                viewProviders: [ScrollingService],
                template: "\n<!--\n  ~ Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.\n  ~ This software is released under MIT license.\n  ~ The full license information can be found in LICENSE in the root directory of this project.\n  -->\n\n<div clrFocusTrap class=\"modal\" *ngIf=\"_open\">\n    <!--fixme: revisit when ngClass works with exit animation-->\n    <div [@fadeDown]=\"skipAnimation\" (@fadeDown.done)=\"fadeDone($event)\"\n         class=\"modal-dialog\"\n         [class.modal-sm]=\"size == 'sm'\"\n         [class.modal-lg]=\"size == 'lg'\"\n         [class.modal-xl]=\"size == 'xl'\"\n         role=\"dialog\" [attr.aria-hidden]=\"!_open\">\n\n      <div class=\"modal-content-wrapper\">\n        <!-- only used in wizards -->\n        <ng-content select=\".modal-nav\"></ng-content>\n\n        <div class=\"modal-content\">\n          <div class=\"modal-header\">\n            <button type=\"button\" class=\"close\" *ngIf=\"closable\" (click)=\"close()\">\n              <clr-icon shape=\"close\" [attr.title]=\"commonStrings.close\"></clr-icon>\n            </button>\n            <ng-content select=\".modal-title\"></ng-content>\n          </div>\n          <ng-content select=\".modal-body\"></ng-content>\n          <ng-content select=\".modal-footer\"></ng-content>\n        </div>\n      </div>\n    </div>\n\n    <div [@fade] class=\"modal-backdrop\"\n         aria-hidden=\"true\"\n         (click)=\"staticBackdrop || close()\"></div>\n</div>\n\n",
                animations: [
                    trigger('fadeDown', [
                        transition('* => false', [style({ opacity: 0, transform: 'translate(0, -25%)' }), animate('0.2s ease-in-out')]),
                        transition('false => *', [animate('0.2s ease-in-out', style({ opacity: 0, transform: 'translate(0, -25%)' }))]),
                    ]),
                    trigger('fade', [
                        transition('void => *', [style({ opacity: 0 }), animate('0.2s ease-in-out', style({ opacity: 0.85 }))]),
                        transition('* => void', [animate('0.2s ease-in-out', style({ opacity: 0 }))]),
                    ]),
                ],
                styles: [`
        :host { display: none; }
        :host.open { display: inline; }
    `]
            }] }
];
/** @nocollapse */
ClrModal.ctorParameters = () => [
    { type: ScrollingService },
    { type: ClrCommonStrings }
];
ClrModal.propDecorators = {
    focusTrap: [{ type: ViewChild, args: [FocusTrapDirective,] }],
    _open: [{ type: HostBinding, args: ['class.open',] }, { type: Input, args: ['clrModalOpen',] }],
    _openChanged: [{ type: Output, args: ['clrModalOpenChange',] }],
    closable: [{ type: Input, args: ['clrModalClosable',] }],
    size: [{ type: Input, args: ['clrModalSize',] }],
    staticBackdrop: [{ type: Input, args: ['clrModalStaticBackdrop',] }],
    skipAnimation: [{ type: Input, args: ['clrModalSkipAnimation',] }],
    bypassScrollService: [{ type: Input, args: ['clrModalOverrideScrollService',] }],
    stopClose: [{ type: Input, args: ['clrModalPreventClose',] }],
    altClose: [{ type: Output, args: ['clrModalAlternateClose',] }],
    close: [{ type: HostListener, args: ['body:keyup.escape',] }]
};
if (false) {
    /** @type {?} */
    ClrModal.prototype.focusTrap;
    /** @type {?} */
    ClrModal.prototype._open;
    /** @type {?} */
    ClrModal.prototype._openChanged;
    /** @type {?} */
    ClrModal.prototype.closable;
    /** @type {?} */
    ClrModal.prototype.size;
    /** @type {?} */
    ClrModal.prototype.staticBackdrop;
    /** @type {?} */
    ClrModal.prototype.skipAnimation;
    /** @type {?} */
    ClrModal.prototype.bypassScrollService;
    /** @type {?} */
    ClrModal.prototype.stopClose;
    /** @type {?} */
    ClrModal.prototype.altClose;
    /** @type {?} */
    ClrModal.prototype._scrollingService;
    /** @type {?} */
    ClrModal.prototype.commonStrings;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJtb2RhbC9tb2RhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFLQSxPQUFPLEVBQUUsT0FBTyxFQUFrQixLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzFGLE9BQU8sRUFDTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLFdBQVcsRUFDWCxZQUFZLEVBQ1osS0FBSyxFQUdMLE1BQU0sRUFFTixTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDOUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDeEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUF1QjFFLE1BQU0sT0FBTyxRQUFROzs7OztJQWlCbkIsWUFBb0IsaUJBQW1DLEVBQVMsYUFBK0I7UUFBM0Usc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUFTLGtCQUFhLEdBQWIsYUFBYSxDQUFrQjtRQWIvRixVQUFLLEdBQVksS0FBSyxDQUFDO1FBQ08saUJBQVksR0FBMEIsSUFBSSxZQUFZLENBQVUsS0FBSyxDQUFDLENBQUM7UUFFMUUsYUFBUSxHQUFZLElBQUksQ0FBQztRQUVuQixtQkFBYyxHQUFZLEtBQUssQ0FBQztRQUNqQyxrQkFBYSxHQUFXLE9BQU8sQ0FBQzs7UUFHeEIsd0JBQW1CLEdBQVksS0FBSyxDQUFDO1FBQzlDLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFDeEIsYUFBUSxHQUEwQixJQUFJLFlBQVksQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUVILENBQUM7Ozs7SUFFbkcsSUFBSSxTQUFTO1FBQ1gsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ2IsT0FBTyxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUks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Z0JBQWdCOzs7d0JBd0J0QixTQUFTLFNBQUMsa0JBQWtCO29CQUM1QixXQUFXLFNBQUMsWUFBWSxjQUN4QixLQUFLLFNBQUMsY0FBYzsyQkFFcEIsTUFBTSxTQUFDLG9CQUFvQjt1QkFFM0IsS0FBSyxTQUFDLGtCQUFrQjttQkFDeEIsS0FBSyxTQUFDLGNBQWM7NkJBQ3BCLEtBQUssU0FBQyx3QkFBd0I7NEJBQzlCLEtBQUssU0FBQyx1QkFBdUI7a0NBRzdCLEtBQUssU0FBQywrQkFBK0I7d0JBQ3JDLEtBQUssU0FBQyxzQkFBc0I7dUJBQzVCLE1BQU0sU0FBQyx3QkFBd0I7b0JBbUMvQixZQUFZLFNBQUMsbUJBQW1COzs7O0lBakRqQyw2QkFBNkQ7O0lBQzdELHlCQUV1Qjs7SUFDdkIsZ0NBQXFHOztJQUVyRyw0QkFBb0Q7O0lBQ3BELHdCQUFvQzs7SUFDcEMsa0NBQWlFOztJQUNqRSxpQ0FBZ0U7O0lBR2hFLHVDQUE2RTs7SUFDN0UsNkJBQTBEOztJQUMxRCw0QkFBcUc7O0lBRXpGLHFDQUEyQzs7SUFBRSxpQ0FBc0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBhbmltYXRlLCBBbmltYXRpb25FdmVudCwgc3R5bGUsIHRyYW5zaXRpb24sIHRyaWdnZXIgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0QmluZGluZyxcbiAgSG9zdExpc3RlbmVyLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlLFxuICBWaWV3Q2hpbGQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBGb2N1c1RyYXBEaXJlY3RpdmUgfSBmcm9tICcuLi91dGlscy9mb2N1cy10cmFwL2ZvY3VzLXRyYXAuZGlyZWN0aXZlJztcbmltcG9ydCB7IFNjcm9sbGluZ1NlcnZpY2UgfSBmcm9tICcuLi91dGlscy9zY3JvbGxpbmcvc2Nyb2xsaW5nLXNlcnZpY2UnO1xuaW1wb3J0IHsgQ2xyQ29tbW9uU3RyaW5ncyB9IGZyb20gJy4uL3V0aWxzL2kxOG4vY29tbW9uLXN0cmluZ3MuaW50ZXJmYWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLW1vZGFsJyxcbiAgdmlld1Byb3ZpZGVyczogW1Njcm9sbGluZ1NlcnZpY2VdLFxuICB0ZW1wbGF0ZVVybDogJy4vbW9kYWwuaHRtbCcsXG4gIHN0eWxlczogW1xuICAgIGBcbiAgICAgICAgOmhvc3QgeyBkaXNwbGF5OiBub25lOyB9XG4gICAgICAgIDpob3N0Lm9wZW4geyBkaXNwbGF5OiBpbmxpbmU7IH1cbiAgICBgLFxuICBdLFxuICBhbmltYXRpb25zOiBbXG4gICAgdHJpZ2dlcignZmFkZURvd24nLCBbXG4gICAgICB0cmFuc2l0aW9uKCcqID0+IGZhbHNlJywgW3N0eWxlKHsgb3BhY2l0eTogMCwgdHJhbnNmb3JtOiAndHJhbnNsYXRlKDAsIC0yNSUpJyB9KSwgYW5pbWF0ZSgnMC4ycyBlYXNlLWluLW91dCcpXSksXG4gICAgICB0cmFuc2l0aW9uKCdmYWxzZSA9PiAqJywgW2FuaW1hdGUoJzAuMnMgZWFzZS1pbi1vdXQnLCBzdHlsZSh7IG9wYWNpdHk6IDAsIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZSgwLCAtMjUlKScgfSkpXSksXG4gICAgXSksXG4gICAgdHJpZ2dlcignZmFkZScsIFtcbiAgICAgIHRyYW5zaXRpb24oJ3ZvaWQgPT4gKicsIFtzdHlsZSh7IG9wYWNpdHk6IDAgfSksIGFuaW1hdGUoJzAuMnMgZWFzZS1pbi1vdXQnLCBzdHlsZSh7IG9wYWNpdHk6IDAuODUgfSkpXSksXG4gICAgICB0cmFuc2l0aW9uKCcqID0+IHZvaWQnLCBbYW5pbWF0ZSgnMC4ycyBlYXNlLWluLW91dCcsIHN0eWxlKHsgb3BhY2l0eTogMCB9KSldKSxcbiAgICBdKSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyTW9kYWwgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gIEBWaWV3Q2hpbGQoRm9jdXNUcmFwRGlyZWN0aXZlKSBmb2N1c1RyYXA6IEZvY3VzVHJhcERpcmVjdGl2ZTtcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5vcGVuJylcbiAgQElucHV0KCdjbHJNb2RhbE9wZW4nKVxuICBfb3BlbjogYm9vbGVhbiA9IGZhbHNlO1xuICBAT3V0cHV0KCdjbHJNb2RhbE9wZW5DaGFuZ2UnKSBfb3BlbkNoYW5nZWQ6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIEBJbnB1dCgnY2xyTW9kYWxDbG9zYWJsZScpIGNsb3NhYmxlOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCdjbHJNb2RhbFNpemUnKSBzaXplOiBzdHJpbmc7XG4gIEBJbnB1dCgnY2xyTW9kYWxTdGF0aWNCYWNrZHJvcCcpIHN0YXRpY0JhY2tkcm9wOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgnY2xyTW9kYWxTa2lwQW5pbWF0aW9uJykgc2tpcEFuaW1hdGlvbjogc3RyaW5nID0gJ2ZhbHNlJztcblxuICAvLyBwcmVzZW50bHkgdGhpcyBpcyBvbmx5IHVzZWQgYnkgd2l6YXJkc1xuICBASW5wdXQoJ2Nsck1vZGFsT3ZlcnJpZGVTY3JvbGxTZXJ2aWNlJykgYnlwYXNzU2Nyb2xsU2VydmljZTogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoJ2Nsck1vZGFsUHJldmVudENsb3NlJykgc3RvcENsb3NlOiBib29sZWFuID0gZmFsc2U7XG4gIEBPdXRwdXQoJ2Nsck1vZGFsQWx0ZXJuYXRlQ2xvc2UnKSBhbHRDbG9zZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPihmYWxzZSk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfc2Nyb2xsaW5nU2VydmljZTogU2Nyb2xsaW5nU2VydmljZSwgcHVibGljIGNvbW1vblN0cmluZ3M6IENsckNvbW1vblN0cmluZ3MpIHt9XG5cbiAgZ2V0IHNpemVDbGFzcygpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLnNpemUpIHtcbiAgICAgIHJldHVybiAnbW9kYWwtJyArIHRoaXMuc2l6ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgfVxuXG4gIC8vIERldGVjdCB3aGVuIF9vcGVuIGlzIHNldCB0byB0cnVlIGFuZCBzZXQgbm8tc2Nyb2xsaW5nIHRvIHRydWVcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogeyBbcHJvcE5hbWU6IHN0cmluZ106IFNpbXBsZUNoYW5nZSB9KTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmJ5cGFzc1Njcm9sbFNlcnZpY2UgJiYgY2hhbmdlcyAmJiBjaGFuZ2VzLmhhc093blByb3BlcnR5KCdfb3BlbicpKSB7XG4gICAgICBpZiAoY2hhbmdlcy5fb3Blbi5jdXJyZW50VmFsdWUpIHtcbiAgICAgICAgdGhpcy5fc2Nyb2xsaW5nU2VydmljZS5zdG9wU2Nyb2xsaW5nKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9zY3JvbGxpbmdTZXJ2aWNlLnJlc3VtZVNjcm9sbGluZygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX3Njcm9sbGluZ1NlcnZpY2UucmVzdW1lU2Nyb2xsaW5nKCk7XG4gIH1cblxuICBvcGVuKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9vcGVuKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX29wZW4gPSB0cnVlO1xuICAgIHRoaXMuX29wZW5DaGFuZ2VkLmVtaXQodHJ1ZSk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdib2R5OmtleXVwLmVzY2FwZScpXG4gIGNsb3NlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnN0b3BDbG9zZSkge1xuICAgICAgdGhpcy5hbHRDbG9zZS5lbWl0KGZhbHNlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCF0aGlzLmNsb3NhYmxlIHx8ICF0aGlzLl9vcGVuKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX29wZW4gPSBmYWxzZTtcbiAgICAvLyB0b2RvOiByZW1vdmUgdGhpcyBhZnRlciBhbmltYXRpb24gYnVnIGlzIGZpeGVkIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzE1Nzk4XG4gICAgLy8gdGhpcyB3YXMgaGFuZGxlZCBieSB0aGUgZmFkZURvbmUgZXZlbnQgYmVsb3csIGJ1dCB0aGF0IEFuaW1hdGlvbkV2ZW50IGlzIG5vdCBmaXJpbmcgaW4gQW5ndWxhciA0LjAuXG4gICAgdGhpcy5fb3BlbkNoYW5nZWQuZW1pdChmYWxzZSk7XG4gICAgLy8gU1BFQ01FXG4gICAgdGhpcy5mb2N1c1RyYXAuc2V0UHJldmlvdXNGb2N1cygpOyAvLyBIYW5kbGVzIG1vdmluZyBmb2N1cyBiYWNrIHRvIHRoZSBlbGVtZW50IHRoYXQgaGFkIGl0IGJlZm9yZS5cbiAgfVxuXG4gIGZhZGVEb25lKGU6IEFuaW1hdGlvbkV2ZW50KSB7XG4gICAgaWYgKGUudG9TdGF0ZSA9PT0gJ3ZvaWQnKSB7XG4gICAgICB0aGlzLl9vcGVuQ2hhbmdlZC5lbWl0KGZhbHNlKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==