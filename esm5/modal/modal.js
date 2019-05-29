/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, HostBinding, HostListener, Input, Output, ViewChild, Inject, } from '@angular/core';
import { FocusTrapDirective } from '../utils/focus-trap/focus-trap.directive';
import { ScrollingService } from '../utils/scrolling/scrolling-service';
import { ClrCommonStrings } from '../utils/i18n/common-strings.interface';
import { UNIQUE_ID, UNIQUE_ID_PROVIDER } from '../utils/id-generator/id-generator.service';
var ClrModal = /** @class */ (function () {
    function ClrModal(_scrollingService, commonStrings, modalId) {
        this._scrollingService = _scrollingService;
        this.commonStrings = commonStrings;
        this.modalId = modalId;
        this._open = false;
        this._openChanged = new EventEmitter(false);
        this.closable = true;
        this.staticBackdrop = true;
        this.skipAnimation = 'false';
        // presently this is only used by wizards
        this.bypassScrollService = false;
        this.stopClose = false;
        this.altClose = new EventEmitter(false);
    }
    Object.defineProperty(ClrModal.prototype, "sizeClass", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.size) {
                return 'modal-' + this.size;
            }
            else {
                return '';
            }
        },
        enumerable: true,
        configurable: true
    });
    // Detect when _open is set to true and set no-scrolling to true
    // Detect when _open is set to true and set no-scrolling to true
    /**
     * @param {?} changes
     * @return {?}
     */
    ClrModal.prototype.ngOnChanges = 
    // Detect when _open is set to true and set no-scrolling to true
    /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (!this.bypassScrollService && changes && changes.hasOwnProperty('_open')) {
            if (changes._open.currentValue) {
                this._scrollingService.stopScrolling();
            }
            else {
                this._scrollingService.resumeScrolling();
            }
        }
    };
    /**
     * @return {?}
     */
    ClrModal.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._scrollingService.resumeScrolling();
    };
    /**
     * @return {?}
     */
    ClrModal.prototype.open = /**
     * @return {?}
     */
    function () {
        if (this._open) {
            return;
        }
        this._open = true;
        this._openChanged.emit(true);
    };
    /**
     * @return {?}
     */
    ClrModal.prototype.close = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * @param {?} e
     * @return {?}
     */
    ClrModal.prototype.fadeDone = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if (e.toState === 'void') {
            this._openChanged.emit(false);
        }
    };
    ClrModal.decorators = [
        { type: Component, args: [{
                    selector: 'clr-modal',
                    viewProviders: [ScrollingService],
                    template: "\n<!--\n  ~ Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.\n  ~ This software is released under MIT license.\n  ~ The full license information can be found in LICENSE in the root directory of this project.\n  -->\n\n<div clrFocusTrap class=\"modal\" *ngIf=\"_open\">\n    <!--fixme: revisit when ngClass works with exit animation-->\n    <div [@fadeDown]=\"skipAnimation\" (@fadeDown.done)=\"fadeDone($event)\"\n         class=\"modal-dialog\"\n         [class.modal-sm]=\"size == 'sm'\"\n         [class.modal-lg]=\"size == 'lg'\"\n         [class.modal-xl]=\"size == 'xl'\"\n         role=\"dialog\"\n         [attr.aria-hidden]=\"!_open\"\n         [attr.aria-labelledby]=\"modalId\">\n\n      <div class=\"modal-content-wrapper\">\n        <!-- only used in wizards -->\n        <ng-content select=\".modal-nav\"></ng-content>\n\n        <div class=\"modal-content\">\n          <div class=\"modal-header\">\n            <button type=\"button\" class=\"close\" *ngIf=\"closable\" (click)=\"close()\">\n              <clr-icon shape=\"close\" [attr.title]=\"commonStrings.close\"></clr-icon>\n            </button>\n            <div class=\"modal-title-wrapper\" id=\"{{modalId}}\">\n              <ng-content select=\".modal-title\"></ng-content>\n            </div>\n          </div>\n          <ng-content select=\".modal-body\"></ng-content>\n          <ng-content select=\".modal-footer\"></ng-content>\n        </div>\n      </div>\n    </div>\n\n    <div [@fade] class=\"modal-backdrop\"\n         aria-hidden=\"true\"\n         (click)=\"staticBackdrop || close()\"></div>\n</div>\n\n",
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
                    providers: [UNIQUE_ID_PROVIDER],
                    styles: ["\n        :host { display: none; }\n        :host.open { display: inline; }\n    "]
                }] }
    ];
    /** @nocollapse */
    ClrModal.ctorParameters = function () { return [
        { type: ScrollingService },
        { type: ClrCommonStrings },
        { type: String, decorators: [{ type: Inject, args: [UNIQUE_ID,] }] }
    ]; };
    ClrModal.propDecorators = {
        focusTrap: [{ type: ViewChild, args: [FocusTrapDirective, { static: false },] }],
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
    return ClrModal;
}());
export { ClrModal };
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
    /**
     * @type {?}
     * @private
     */
    ClrModal.prototype._scrollingService;
    /** @type {?} */
    ClrModal.prototype.commonStrings;
    /** @type {?} */
    ClrModal.prototype.modalId;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJtb2RhbC9tb2RhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFLQSxPQUFPLEVBQUUsT0FBTyxFQUFrQixLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzFGLE9BQU8sRUFDTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLFdBQVcsRUFDWCxZQUFZLEVBQ1osS0FBSyxFQUdMLE1BQU0sRUFFTixTQUFTLEVBQ1QsTUFBTSxHQUNQLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQzlFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUUzRjtJQXlDRSxrQkFDVSxpQkFBbUMsRUFDcEMsYUFBK0IsRUFDWixPQUFlO1FBRmpDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDcEMsa0JBQWEsR0FBYixhQUFhLENBQWtCO1FBQ1osWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQWhCM0MsVUFBSyxHQUFZLEtBQUssQ0FBQztRQUNPLGlCQUFZLEdBQTBCLElBQUksWUFBWSxDQUFVLEtBQUssQ0FBQyxDQUFDO1FBRTFFLGFBQVEsR0FBWSxJQUFJLENBQUM7UUFFbkIsbUJBQWMsR0FBWSxJQUFJLENBQUM7UUFDaEMsa0JBQWEsR0FBVyxPQUFPLENBQUM7O1FBR3hCLHdCQUFtQixHQUFZLEtBQUssQ0FBQztRQUM5QyxjQUFTLEdBQVksS0FBSyxDQUFDO1FBQ3hCLGFBQVEsR0FBMEIsSUFBSSxZQUFZLENBQVUsS0FBSyxDQUFDLENBQUM7SUFNbEcsQ0FBQztJ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LENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLGtCQUFrQixFQUFFLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzt5QkFDOUUsQ0FBQztxQkFDSDtvQkFDRCxTQUFTLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQzs2QkFmN0IsbUZBR0M7aUJBYUo7Ozs7Z0JBekJRLGdCQUFnQjtnQkFDaEIsZ0JBQWdCOzZDQStDcEIsTUFBTSxTQUFDLFNBQVM7Ozs0QkFyQmxCLFNBQVMsU0FBQyxrQkFBa0IsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7d0JBRy9DLFdBQVcsU0FBQyxZQUFZLGNBQ3hCLEtBQUssU0FBQyxjQUFjOytCQUVwQixNQUFNLFNBQUMsb0JBQW9COzJCQUUzQixLQUFLLFNBQUMsa0JBQWtCO3VCQUN4QixLQUFLLFNBQUMsY0FBYztpQ0FDcEIsS0FBSyxTQUFDLHdCQUF3QjtnQ0FDOUIsS0FBSyxTQUFDLHVCQUF1QjtzQ0FHN0IsS0FBSyxTQUFDLCtCQUErQjs0QkFDckMsS0FBSyxTQUFDLHNCQUFzQjsyQkFDNUIsTUFBTSxTQUFDLHdCQUF3Qjt3QkF1Qy9CLFlBQVksU0FBQyxtQkFBbUI7O0lBc0JuQyxlQUFDO0NBQUEsQUFwR0QsSUFvR0M7U0E5RVksUUFBUTs7O0lBQ25CLDZCQUM4Qjs7SUFFOUIseUJBRXVCOztJQUN2QixnQ0FBcUc7O0lBRXJHLDRCQUFvRDs7SUFDcEQsd0JBQW9DOztJQUNwQyxrQ0FBZ0U7O0lBQ2hFLGlDQUFnRTs7SUFHaEUsdUNBQTZFOztJQUM3RSw2QkFBMEQ7O0lBQzFELDRCQUFxRzs7Ozs7SUFHbkcscUNBQTJDOztJQUMzQyxpQ0FBc0M7O0lBQ3RDLDJCQUF5QyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IGFuaW1hdGUsIEFuaW1hdGlvbkV2ZW50LCBzdHlsZSwgdHJhbnNpdGlvbiwgdHJpZ2dlciB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RCaW5kaW5nLFxuICBIb3N0TGlzdGVuZXIsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2UsXG4gIFZpZXdDaGlsZCxcbiAgSW5qZWN0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRm9jdXNUcmFwRGlyZWN0aXZlIH0gZnJvbSAnLi4vdXRpbHMvZm9jdXMtdHJhcC9mb2N1cy10cmFwLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBTY3JvbGxpbmdTZXJ2aWNlIH0gZnJvbSAnLi4vdXRpbHMvc2Nyb2xsaW5nL3Njcm9sbGluZy1zZXJ2aWNlJztcbmltcG9ydCB7IENsckNvbW1vblN0cmluZ3MgfSBmcm9tICcuLi91dGlscy9pMThuL2NvbW1vbi1zdHJpbmdzLmludGVyZmFjZSc7XG5pbXBvcnQgeyBVTklRVUVfSUQsIFVOSVFVRV9JRF9QUk9WSURFUiB9IGZyb20gJy4uL3V0aWxzL2lkLWdlbmVyYXRvci9pZC1nZW5lcmF0b3Iuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci1tb2RhbCcsXG4gIHZpZXdQcm92aWRlcnM6IFtTY3JvbGxpbmdTZXJ2aWNlXSxcbiAgdGVtcGxhdGVVcmw6ICcuL21vZGFsLmh0bWwnLFxuICBzdHlsZXM6IFtcbiAgICBgXG4gICAgICAgIDpob3N0IHsgZGlzcGxheTogbm9uZTsgfVxuICAgICAgICA6aG9zdC5vcGVuIHsgZGlzcGxheTogaW5saW5lOyB9XG4gICAgYCxcbiAgXSxcbiAgYW5pbWF0aW9uczogW1xuICAgIHRyaWdnZXIoJ2ZhZGVEb3duJywgW1xuICAgICAgdHJhbnNpdGlvbignKiA9PiBmYWxzZScsIFtzdHlsZSh7IG9wYWNpdHk6IDAsIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZSgwLCAtMjUlKScgfSksIGFuaW1hdGUoJzAuMnMgZWFzZS1pbi1vdXQnKV0pLFxuICAgICAgdHJhbnNpdGlvbignZmFsc2UgPT4gKicsIFthbmltYXRlKCcwLjJzIGVhc2UtaW4tb3V0Jywgc3R5bGUoeyBvcGFjaXR5OiAwLCB0cmFuc2Zvcm06ICd0cmFuc2xhdGUoMCwgLTI1JSknIH0pKV0pLFxuICAgIF0pLFxuICAgIHRyaWdnZXIoJ2ZhZGUnLCBbXG4gICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IConLCBbc3R5bGUoeyBvcGFjaXR5OiAwIH0pLCBhbmltYXRlKCcwLjJzIGVhc2UtaW4tb3V0Jywgc3R5bGUoeyBvcGFjaXR5OiAwLjg1IH0pKV0pLFxuICAgICAgdHJhbnNpdGlvbignKiA9PiB2b2lkJywgW2FuaW1hdGUoJzAuMnMgZWFzZS1pbi1vdXQnLCBzdHlsZSh7IG9wYWNpdHk6IDAgfSkpXSksXG4gICAgXSksXG4gIF0sXG4gIHByb3ZpZGVyczogW1VOSVFVRV9JRF9QUk9WSURFUl0sXG59KVxuZXhwb3J0IGNsYXNzIENsck1vZGFsIGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuICBAVmlld0NoaWxkKEZvY3VzVHJhcERpcmVjdGl2ZSwgeyBzdGF0aWM6IGZhbHNlIH0pXG4gIGZvY3VzVHJhcDogRm9jdXNUcmFwRGlyZWN0aXZlO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3Mub3BlbicpXG4gIEBJbnB1dCgnY2xyTW9kYWxPcGVuJylcbiAgX29wZW46IGJvb2xlYW4gPSBmYWxzZTtcbiAgQE91dHB1dCgnY2xyTW9kYWxPcGVuQ2hhbmdlJykgX29wZW5DaGFuZ2VkOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KGZhbHNlKTtcblxuICBASW5wdXQoJ2Nsck1vZGFsQ2xvc2FibGUnKSBjbG9zYWJsZTogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgnY2xyTW9kYWxTaXplJykgc2l6ZTogc3RyaW5nO1xuICBASW5wdXQoJ2Nsck1vZGFsU3RhdGljQmFja2Ryb3AnKSBzdGF0aWNCYWNrZHJvcDogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgnY2xyTW9kYWxTa2lwQW5pbWF0aW9uJykgc2tpcEFuaW1hdGlvbjogc3RyaW5nID0gJ2ZhbHNlJztcblxuICAvLyBwcmVzZW50bHkgdGhpcyBpcyBvbmx5IHVzZWQgYnkgd2l6YXJkc1xuICBASW5wdXQoJ2Nsck1vZGFsT3ZlcnJpZGVTY3JvbGxTZXJ2aWNlJykgYnlwYXNzU2Nyb2xsU2VydmljZTogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoJ2Nsck1vZGFsUHJldmVudENsb3NlJykgc3RvcENsb3NlOiBib29sZWFuID0gZmFsc2U7XG4gIEBPdXRwdXQoJ2Nsck1vZGFsQWx0ZXJuYXRlQ2xvc2UnKSBhbHRDbG9zZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPihmYWxzZSk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfc2Nyb2xsaW5nU2VydmljZTogU2Nyb2xsaW5nU2VydmljZSxcbiAgICBwdWJsaWMgY29tbW9uU3RyaW5nczogQ2xyQ29tbW9uU3RyaW5ncyxcbiAgICBASW5qZWN0KFVOSVFVRV9JRCkgcHVibGljIG1vZGFsSWQ6IHN0cmluZ1xuICApIHt9XG5cbiAgZ2V0IHNpemVDbGFzcygpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLnNpemUpIHtcbiAgICAgIHJldHVybiAnbW9kYWwtJyArIHRoaXMuc2l6ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgfVxuXG4gIC8vIERldGVjdCB3aGVuIF9vcGVuIGlzIHNldCB0byB0cnVlIGFuZCBzZXQgbm8tc2Nyb2xsaW5nIHRvIHRydWVcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogeyBbcHJvcE5hbWU6IHN0cmluZ106IFNpbXBsZUNoYW5nZSB9KTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmJ5cGFzc1Njcm9sbFNlcnZpY2UgJiYgY2hhbmdlcyAmJiBjaGFuZ2VzLmhhc093blByb3BlcnR5KCdfb3BlbicpKSB7XG4gICAgICBpZiAoY2hhbmdlcy5fb3Blbi5jdXJyZW50VmFsdWUpIHtcbiAgICAgICAgdGhpcy5fc2Nyb2xsaW5nU2VydmljZS5zdG9wU2Nyb2xsaW5nKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9zY3JvbGxpbmdTZXJ2aWNlLnJlc3VtZVNjcm9sbGluZygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX3Njcm9sbGluZ1NlcnZpY2UucmVzdW1lU2Nyb2xsaW5nKCk7XG4gIH1cblxuICBvcGVuKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9vcGVuKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX29wZW4gPSB0cnVlO1xuICAgIHRoaXMuX29wZW5DaGFuZ2VkLmVtaXQodHJ1ZSk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdib2R5OmtleXVwLmVzY2FwZScpXG4gIGNsb3NlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnN0b3BDbG9zZSkge1xuICAgICAgdGhpcy5hbHRDbG9zZS5lbWl0KGZhbHNlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCF0aGlzLmNsb3NhYmxlIHx8ICF0aGlzLl9vcGVuKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX29wZW4gPSBmYWxzZTtcbiAgICAvLyB0b2RvOiByZW1vdmUgdGhpcyBhZnRlciBhbmltYXRpb24gYnVnIGlzIGZpeGVkIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzE1Nzk4XG4gICAgLy8gdGhpcyB3YXMgaGFuZGxlZCBieSB0aGUgZmFkZURvbmUgZXZlbnQgYmVsb3csIGJ1dCB0aGF0IEFuaW1hdGlvbkV2ZW50IGlzIG5vdCBmaXJpbmcgaW4gQW5ndWxhciA0LjAuXG4gICAgdGhpcy5fb3BlbkNoYW5nZWQuZW1pdChmYWxzZSk7XG4gICAgLy8gU1BFQ01FXG4gICAgdGhpcy5mb2N1c1RyYXAuc2V0UHJldmlvdXNGb2N1cygpOyAvLyBIYW5kbGVzIG1vdmluZyBmb2N1cyBiYWNrIHRvIHRoZSBlbGVtZW50IHRoYXQgaGFkIGl0IGJlZm9yZS5cbiAgfVxuXG4gIGZhZGVEb25lKGU6IEFuaW1hdGlvbkV2ZW50KSB7XG4gICAgaWYgKGUudG9TdGF0ZSA9PT0gJ3ZvaWQnKSB7XG4gICAgICB0aGlzLl9vcGVuQ2hhbmdlZC5lbWl0KGZhbHNlKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==