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
var ClrModal = /** @class */ (function () {
    function ClrModal(_scrollingService, commonStrings) {
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
                    styles: ["\n        :host { display: none; }\n        :host.open { display: inline; }\n    "]
                }] }
    ];
    /** @nocollapse */
    ClrModal.ctorParameters = function () { return [
        { type: ScrollingService },
        { type: ClrCommonStrings }
    ]; };
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
    /** @type {?} */
    ClrModal.prototype._scrollingService;
    /** @type {?} */
    ClrModal.prototype.commonStrings;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJtb2RhbC9tb2RhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFLQSxPQUFPLEVBQUUsT0FBTyxFQUFrQixLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzFGLE9BQU8sRUFDTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLFdBQVcsRUFDWCxZQUFZLEVBQ1osS0FBSyxFQUdMLE1BQU0sRUFFTixTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDOUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDeEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFFMUU7SUFzQ0Usa0JBQW9CLGlCQUFtQyxFQUFTLGFBQStCO1FBQTNFLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFBUyxrQkFBYSxHQUFiLGFBQWEsQ0FBa0I7UUFiL0YsVUFBSyxHQUFZLEtBQUssQ0FBQztRQUNPLGlCQUFZLEdBQTBCLElBQUksWUFBWSxDQUFVLEtBQUssQ0FBQyxDQUFDO1FBRTFFLGFBQVEsR0FBWSxJQUFJLENBQUM7UUFFbkIsbUJBQWMsR0FBWSxLQUFLLENBQUM7UUFDakMsa0JBQWEsR0FBVyxPQUFPLENBQUM7O1FBR3hCLHdCQUFtQixHQUFZLEtBQUssQ0FBQztRQUM5QyxjQUFTLEdBQVksS0FBSyxDQUFDO1FBQ3hCLGFBQVEsR0FBMEIsSUFBSSxZQUFZLENBQVUsS0FBSyxDQUFDLENBQUM7SUFFSCxDQUFDO0lBRW5HLHNCQUFJLCtCQUFTOzs7O1FBQWI7WUFDRSxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ2IsT0FBTyxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQzthQUM3QjtpQkFBTTtnQkFDTCxPQUFPLEVBQUUsQ0FBQzthQUNYO1FBQ0gsQ0FBQzs7O09BQUE7SUFFRCxnRUFBZ0U7Ozs7OztJQUNoRSw4QkFBVzs7Ozs7O0lBQVgsVUFBWSxPQUE2QztRQUN2RCxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQzNFLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUU7Z0JBQzlCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLEVBQUUsQ0FBQzthQUN4QztpQkFBTTtnQkFDTCxJQUFJLENBQUMsaUJBQWlCLENBQUMsZUFBZSxFQUFFLENBQUM7YUFDMUM7U0FDRjtJQUNILENBQUM7Ozs7SUFFRCw4QkFBVzs7O0lBQVg7UUFDRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDM0MsQ0FBQzs7OztJQUVELHVCQUFJOzs7SUFBSjtRQUNFLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNkLE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9CLENBQUM7Ozs7SUFHRCx3QkFBSzs7O0lBREw7UUFFRSxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDMUIsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2pDLE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLGlHQUFpRztRQUNqRyxzR0FBc0c7UUFDdEcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDOUIsU0FBUztRQUNULElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLCtEQUErRDtJQUNwRyxDQUFDOzs7OztJQUVELDJCQUFROzs7O0lBQVIsVUFBUyxDQUFpQjtRQUN4QixJQUFJLENBQUMsQ0FBQyxPQUFPLEtBQUssTUFBTSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQy9CO0lBQ0gsQ0FBQzs7Z0JBNUZGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsV0FBVztvQkFDckIsYUFBYSxFQUFFLENBQUMsZ0JBQWdCLENBQUM7b0JBQ2pDLGk4Q0FBMkI7b0JBTzNCLFVBQVUsRUFBRTt3QkFDVixPQUFPLENBQUMsVUFBVSxFQUFFOzRCQUNsQixVQUFVLENBQUMsWUFBWSxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsb0JBQW9CLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7NEJBQy9HLFVBQVUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLEVBQUUsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzt5QkFDaEgsQ0FBQzt3QkFDRixPQUFPLENBQUMsTUFBTSxFQUFFOzRCQUNkLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsa0JBQWtCLEVBQUUsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUN2RyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLGtCQUFrQixFQUFFLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzt5QkFDOUUsQ0FBQztxQkFDSDs2QkFkQyxtRkFHQztpQkFZSjs7OztnQkF2QlEsZ0JBQWdCO2dCQUNoQixnQkFBZ0I7Ozs0QkF3QnRCLFNBQVMsU0FBQyxrQkFBa0I7d0JBQzVCLFdBQVcsU0FBQyxZQUFZLGNBQ3hCLEtBQUssU0FBQyxjQUFjOytCQUVwQixNQUFNLFNBQUMsb0JBQW9COzJCQUUzQixLQUFLLFNBQUMsa0JBQWtCO3VCQUN4QixLQUFLLFNBQUMsY0FBYztpQ0FDcEIsS0FBSyxTQUFDLHdCQUF3QjtnQ0FDOUIsS0FBSyxTQUFDLHVCQUF1QjtzQ0FHN0IsS0FBSyxTQUFDLCtCQUErQjs0QkFDckMsS0FBSyxTQUFDLHNCQUFzQjsyQkFDNUIsTUFBTSxTQUFDLHdCQUF3Qjt3QkFtQy9CLFlBQVksU0FBQyxtQkFBbUI7O0lBc0JuQyxlQUFDO0NBQUEsQUE3RkQsSUE2RkM7U0F4RVksUUFBUTs7O0lBQ25CLDZCQUE2RDs7SUFDN0QseUJBRXVCOztJQUN2QixnQ0FBcUc7O0lBRXJHLDRCQUFvRDs7SUFDcEQsd0JBQW9DOztJQUNwQyxrQ0FBaUU7O0lBQ2pFLGlDQUFnRTs7SUFHaEUsdUNBQTZFOztJQUM3RSw2QkFBMEQ7O0lBQzFELDRCQUFxRzs7SUFFekYscUNBQTJDOztJQUFFLGlDQUFzQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IGFuaW1hdGUsIEFuaW1hdGlvbkV2ZW50LCBzdHlsZSwgdHJhbnNpdGlvbiwgdHJpZ2dlciB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RCaW5kaW5nLFxuICBIb3N0TGlzdGVuZXIsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2UsXG4gIFZpZXdDaGlsZCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEZvY3VzVHJhcERpcmVjdGl2ZSB9IGZyb20gJy4uL3V0aWxzL2ZvY3VzLXRyYXAvZm9jdXMtdHJhcC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgU2Nyb2xsaW5nU2VydmljZSB9IGZyb20gJy4uL3V0aWxzL3Njcm9sbGluZy9zY3JvbGxpbmctc2VydmljZSc7XG5pbXBvcnQgeyBDbHJDb21tb25TdHJpbmdzIH0gZnJvbSAnLi4vdXRpbHMvaTE4bi9jb21tb24tc3RyaW5ncy5pbnRlcmZhY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItbW9kYWwnLFxuICB2aWV3UHJvdmlkZXJzOiBbU2Nyb2xsaW5nU2VydmljZV0sXG4gIHRlbXBsYXRlVXJsOiAnLi9tb2RhbC5odG1sJyxcbiAgc3R5bGVzOiBbXG4gICAgYFxuICAgICAgICA6aG9zdCB7IGRpc3BsYXk6IG5vbmU7IH1cbiAgICAgICAgOmhvc3Qub3BlbiB7IGRpc3BsYXk6IGlubGluZTsgfVxuICAgIGAsXG4gIF0sXG4gIGFuaW1hdGlvbnM6IFtcbiAgICB0cmlnZ2VyKCdmYWRlRG93bicsIFtcbiAgICAgIHRyYW5zaXRpb24oJyogPT4gZmFsc2UnLCBbc3R5bGUoeyBvcGFjaXR5OiAwLCB0cmFuc2Zvcm06ICd0cmFuc2xhdGUoMCwgLTI1JSknIH0pLCBhbmltYXRlKCcwLjJzIGVhc2UtaW4tb3V0JyldKSxcbiAgICAgIHRyYW5zaXRpb24oJ2ZhbHNlID0+IConLCBbYW5pbWF0ZSgnMC4ycyBlYXNlLWluLW91dCcsIHN0eWxlKHsgb3BhY2l0eTogMCwgdHJhbnNmb3JtOiAndHJhbnNsYXRlKDAsIC0yNSUpJyB9KSldKSxcbiAgICBdKSxcbiAgICB0cmlnZ2VyKCdmYWRlJywgW1xuICAgICAgdHJhbnNpdGlvbigndm9pZCA9PiAqJywgW3N0eWxlKHsgb3BhY2l0eTogMCB9KSwgYW5pbWF0ZSgnMC4ycyBlYXNlLWluLW91dCcsIHN0eWxlKHsgb3BhY2l0eTogMC44NSB9KSldKSxcbiAgICAgIHRyYW5zaXRpb24oJyogPT4gdm9pZCcsIFthbmltYXRlKCcwLjJzIGVhc2UtaW4tb3V0Jywgc3R5bGUoeyBvcGFjaXR5OiAwIH0pKV0pLFxuICAgIF0pLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBDbHJNb2RhbCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgQFZpZXdDaGlsZChGb2N1c1RyYXBEaXJlY3RpdmUpIGZvY3VzVHJhcDogRm9jdXNUcmFwRGlyZWN0aXZlO1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLm9wZW4nKVxuICBASW5wdXQoJ2Nsck1vZGFsT3BlbicpXG4gIF9vcGVuOiBib29sZWFuID0gZmFsc2U7XG4gIEBPdXRwdXQoJ2Nsck1vZGFsT3BlbkNoYW5nZScpIF9vcGVuQ2hhbmdlZDogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPihmYWxzZSk7XG5cbiAgQElucHV0KCdjbHJNb2RhbENsb3NhYmxlJykgY2xvc2FibGU6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoJ2Nsck1vZGFsU2l6ZScpIHNpemU6IHN0cmluZztcbiAgQElucHV0KCdjbHJNb2RhbFN0YXRpY0JhY2tkcm9wJykgc3RhdGljQmFja2Ryb3A6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCdjbHJNb2RhbFNraXBBbmltYXRpb24nKSBza2lwQW5pbWF0aW9uOiBzdHJpbmcgPSAnZmFsc2UnO1xuXG4gIC8vIHByZXNlbnRseSB0aGlzIGlzIG9ubHkgdXNlZCBieSB3aXphcmRzXG4gIEBJbnB1dCgnY2xyTW9kYWxPdmVycmlkZVNjcm9sbFNlcnZpY2UnKSBieXBhc3NTY3JvbGxTZXJ2aWNlOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgnY2xyTW9kYWxQcmV2ZW50Q2xvc2UnKSBzdG9wQ2xvc2U6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQE91dHB1dCgnY2xyTW9kYWxBbHRlcm5hdGVDbG9zZScpIGFsdENsb3NlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KGZhbHNlKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zY3JvbGxpbmdTZXJ2aWNlOiBTY3JvbGxpbmdTZXJ2aWNlLCBwdWJsaWMgY29tbW9uU3RyaW5nczogQ2xyQ29tbW9uU3RyaW5ncykge31cblxuICBnZXQgc2l6ZUNsYXNzKCk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMuc2l6ZSkge1xuICAgICAgcmV0dXJuICdtb2RhbC0nICsgdGhpcy5zaXplO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICB9XG5cbiAgLy8gRGV0ZWN0IHdoZW4gX29wZW4gaXMgc2V0IHRvIHRydWUgYW5kIHNldCBuby1zY3JvbGxpbmcgdG8gdHJ1ZVxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiB7IFtwcm9wTmFtZTogc3RyaW5nXTogU2ltcGxlQ2hhbmdlIH0pOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuYnlwYXNzU2Nyb2xsU2VydmljZSAmJiBjaGFuZ2VzICYmIGNoYW5nZXMuaGFzT3duUHJvcGVydHkoJ19vcGVuJykpIHtcbiAgICAgIGlmIChjaGFuZ2VzLl9vcGVuLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgICB0aGlzLl9zY3JvbGxpbmdTZXJ2aWNlLnN0b3BTY3JvbGxpbmcoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3Njcm9sbGluZ1NlcnZpY2UucmVzdW1lU2Nyb2xsaW5nKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fc2Nyb2xsaW5nU2VydmljZS5yZXN1bWVTY3JvbGxpbmcoKTtcbiAgfVxuXG4gIG9wZW4oKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX29wZW4pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fb3BlbiA9IHRydWU7XG4gICAgdGhpcy5fb3BlbkNoYW5nZWQuZW1pdCh0cnVlKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2JvZHk6a2V5dXAuZXNjYXBlJylcbiAgY2xvc2UoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuc3RvcENsb3NlKSB7XG4gICAgICB0aGlzLmFsdENsb3NlLmVtaXQoZmFsc2UpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuY2xvc2FibGUgfHwgIXRoaXMuX29wZW4pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fb3BlbiA9IGZhbHNlO1xuICAgIC8vIHRvZG86IHJlbW92ZSB0aGlzIGFmdGVyIGFuaW1hdGlvbiBidWcgaXMgZml4ZWQgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMTU3OThcbiAgICAvLyB0aGlzIHdhcyBoYW5kbGVkIGJ5IHRoZSBmYWRlRG9uZSBldmVudCBiZWxvdywgYnV0IHRoYXQgQW5pbWF0aW9uRXZlbnQgaXMgbm90IGZpcmluZyBpbiBBbmd1bGFyIDQuMC5cbiAgICB0aGlzLl9vcGVuQ2hhbmdlZC5lbWl0KGZhbHNlKTtcbiAgICAvLyBTUEVDTUVcbiAgICB0aGlzLmZvY3VzVHJhcC5zZXRQcmV2aW91c0ZvY3VzKCk7IC8vIEhhbmRsZXMgbW92aW5nIGZvY3VzIGJhY2sgdG8gdGhlIGVsZW1lbnQgdGhhdCBoYWQgaXQgYmVmb3JlLlxuICB9XG5cbiAgZmFkZURvbmUoZTogQW5pbWF0aW9uRXZlbnQpIHtcbiAgICBpZiAoZS50b1N0YXRlID09PSAndm9pZCcpIHtcbiAgICAgIHRoaXMuX29wZW5DaGFuZ2VkLmVtaXQoZmFsc2UpO1xuICAgIH1cbiAgfVxufVxuIl19