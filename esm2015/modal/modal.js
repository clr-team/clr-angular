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
export class ClrModal {
    /**
     * @param {?} _scrollingService
     * @param {?} commonStrings
     * @param {?} modalId
     */
    constructor(_scrollingService, commonStrings, modalId) {
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
                styles: [`
        :host { display: none; }
        :host.open { display: inline; }
    `]
            }] }
];
/** @nocollapse */
ClrModal.ctorParameters = () => [
    { type: ScrollingService },
    { type: ClrCommonStrings },
    { type: String, decorators: [{ type: Inject, args: [UNIQUE_ID,] }] }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJtb2RhbC9tb2RhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFLQSxPQUFPLEVBQUUsT0FBTyxFQUFrQixLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzFGLE9BQU8sRUFDTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLFdBQVcsRUFDWCxZQUFZLEVBQ1osS0FBSyxFQUdMLE1BQU0sRUFFTixTQUFTLEVBQ1QsTUFBTSxHQUNQLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQzlFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQXdCM0YsTUFBTSxPQUFPLFFBQVE7Ozs7OztJQW1CbkIsWUFDVSxpQkFBbUMsRUFDcEMsYUFBK0IsRUFDWixPQUFlO1FBRmpDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDcEMsa0JBQWEsR0FBYixhQUFhLENBQWtCO1FBQ1osWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQWhCM0MsVUFBSyxHQUFZLEtBQUssQ0FBQztRQUNPLGlCQUFZLEdBQTBCLElBQUksWUFBWSxDQUFVLEtBQUssQ0FBQyxDQUFDO1FBRTFFLGFBQVEsR0FBWSxJQUFJLENBQUM7UUFFbkIsbUJBQWMsR0FBWSxJQUFJLENBQUM7UUFDaEMsa0JBQWEsR0FBVyxPQUFPLENBQUM7O1FBR3hCLHdCQUFtQixHQUFZLEtBQUssQ0FBQztRQUM5QyxjQUFTLEdBQVksS0FBSyxDQUFDO1FBQ3hCLGFBQVEsR0FBMEIsSUFBSSxZQUFZLENBQVUsS0FBSyxD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RUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7cUJBQzlFLENBQUM7aUJBQ0g7Z0JBQ0QsU0FBUyxFQUFFLENBQUMsa0JBQWtCLENBQUM7eUJBZjdCOzs7S0FHQzthQWFKOzs7O1lBekJRLGdCQUFnQjtZQUNoQixnQkFBZ0I7eUNBK0NwQixNQUFNLFNBQUMsU0FBUzs7O3dCQXJCbEIsU0FBUyxTQUFDLGtCQUFrQixFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtvQkFHL0MsV0FBVyxTQUFDLFlBQVksY0FDeEIsS0FBSyxTQUFDLGNBQWM7MkJBRXBCLE1BQU0sU0FBQyxvQkFBb0I7dUJBRTNCLEtBQUssU0FBQyxrQkFBa0I7bUJBQ3hCLEtBQUssU0FBQyxjQUFjOzZCQUNwQixLQUFLLFNBQUMsd0JBQXdCOzRCQUM5QixLQUFLLFNBQUMsdUJBQXVCO2tDQUc3QixLQUFLLFNBQUMsK0JBQStCO3dCQUNyQyxLQUFLLFNBQUMsc0JBQXNCO3VCQUM1QixNQUFNLFNBQUMsd0JBQXdCO29CQXVDL0IsWUFBWSxTQUFDLG1CQUFtQjs7OztJQXZEakMsNkJBQzhCOztJQUU5Qix5QkFFdUI7O0lBQ3ZCLGdDQUFxRzs7SUFFckcsNEJBQW9EOztJQUNwRCx3QkFBb0M7O0lBQ3BDLGtDQUFnRTs7SUFDaEUsaUNBQWdFOztJQUdoRSx1Q0FBNkU7O0lBQzdFLDZCQUEwRDs7SUFDMUQsNEJBQXFHOzs7OztJQUduRyxxQ0FBMkM7O0lBQzNDLGlDQUFzQzs7SUFDdEMsMkJBQXlDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgYW5pbWF0ZSwgQW5pbWF0aW9uRXZlbnQsIHN0eWxlLCB0cmFuc2l0aW9uLCB0cmlnZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQge1xuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdEJpbmRpbmcsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZSxcbiAgVmlld0NoaWxkLFxuICBJbmplY3QsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBGb2N1c1RyYXBEaXJlY3RpdmUgfSBmcm9tICcuLi91dGlscy9mb2N1cy10cmFwL2ZvY3VzLXRyYXAuZGlyZWN0aXZlJztcbmltcG9ydCB7IFNjcm9sbGluZ1NlcnZpY2UgfSBmcm9tICcuLi91dGlscy9zY3JvbGxpbmcvc2Nyb2xsaW5nLXNlcnZpY2UnO1xuaW1wb3J0IHsgQ2xyQ29tbW9uU3RyaW5ncyB9IGZyb20gJy4uL3V0aWxzL2kxOG4vY29tbW9uLXN0cmluZ3MuaW50ZXJmYWNlJztcbmltcG9ydCB7IFVOSVFVRV9JRCwgVU5JUVVFX0lEX1BST1ZJREVSIH0gZnJvbSAnLi4vdXRpbHMvaWQtZ2VuZXJhdG9yL2lkLWdlbmVyYXRvci5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLW1vZGFsJyxcbiAgdmlld1Byb3ZpZGVyczogW1Njcm9sbGluZ1NlcnZpY2VdLFxuICB0ZW1wbGF0ZVVybDogJy4vbW9kYWwuaHRtbCcsXG4gIHN0eWxlczogW1xuICAgIGBcbiAgICAgICAgOmhvc3QgeyBkaXNwbGF5OiBub25lOyB9XG4gICAgICAgIDpob3N0Lm9wZW4geyBkaXNwbGF5OiBpbmxpbmU7IH1cbiAgICBgLFxuICBdLFxuICBhbmltYXRpb25zOiBbXG4gICAgdHJpZ2dlcignZmFkZURvd24nLCBbXG4gICAgICB0cmFuc2l0aW9uKCcqID0+IGZhbHNlJywgW3N0eWxlKHsgb3BhY2l0eTogMCwgdHJhbnNmb3JtOiAndHJhbnNsYXRlKDAsIC0yNSUpJyB9KSwgYW5pbWF0ZSgnMC4ycyBlYXNlLWluLW91dCcpXSksXG4gICAgICB0cmFuc2l0aW9uKCdmYWxzZSA9PiAqJywgW2FuaW1hdGUoJzAuMnMgZWFzZS1pbi1vdXQnLCBzdHlsZSh7IG9wYWNpdHk6IDAsIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZSgwLCAtMjUlKScgfSkpXSksXG4gICAgXSksXG4gICAgdHJpZ2dlcignZmFkZScsIFtcbiAgICAgIHRyYW5zaXRpb24oJ3ZvaWQgPT4gKicsIFtzdHlsZSh7IG9wYWNpdHk6IDAgfSksIGFuaW1hdGUoJzAuMnMgZWFzZS1pbi1vdXQnLCBzdHlsZSh7IG9wYWNpdHk6IDAuODUgfSkpXSksXG4gICAgICB0cmFuc2l0aW9uKCcqID0+IHZvaWQnLCBbYW5pbWF0ZSgnMC4ycyBlYXNlLWluLW91dCcsIHN0eWxlKHsgb3BhY2l0eTogMCB9KSldKSxcbiAgICBdKSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbVU5JUVVFX0lEX1BST1ZJREVSXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyTW9kYWwgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gIEBWaWV3Q2hpbGQoRm9jdXNUcmFwRGlyZWN0aXZlLCB7IHN0YXRpYzogZmFsc2UgfSlcbiAgZm9jdXNUcmFwOiBGb2N1c1RyYXBEaXJlY3RpdmU7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5vcGVuJylcbiAgQElucHV0KCdjbHJNb2RhbE9wZW4nKVxuICBfb3BlbjogYm9vbGVhbiA9IGZhbHNlO1xuICBAT3V0cHV0KCdjbHJNb2RhbE9wZW5DaGFuZ2UnKSBfb3BlbkNoYW5nZWQ6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIEBJbnB1dCgnY2xyTW9kYWxDbG9zYWJsZScpIGNsb3NhYmxlOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCdjbHJNb2RhbFNpemUnKSBzaXplOiBzdHJpbmc7XG4gIEBJbnB1dCgnY2xyTW9kYWxTdGF0aWNCYWNrZHJvcCcpIHN0YXRpY0JhY2tkcm9wOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCdjbHJNb2RhbFNraXBBbmltYXRpb24nKSBza2lwQW5pbWF0aW9uOiBzdHJpbmcgPSAnZmFsc2UnO1xuXG4gIC8vIHByZXNlbnRseSB0aGlzIGlzIG9ubHkgdXNlZCBieSB3aXphcmRzXG4gIEBJbnB1dCgnY2xyTW9kYWxPdmVycmlkZVNjcm9sbFNlcnZpY2UnKSBieXBhc3NTY3JvbGxTZXJ2aWNlOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgnY2xyTW9kYWxQcmV2ZW50Q2xvc2UnKSBzdG9wQ2xvc2U6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQE91dHB1dCgnY2xyTW9kYWxBbHRlcm5hdGVDbG9zZScpIGFsdENsb3NlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KGZhbHNlKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9zY3JvbGxpbmdTZXJ2aWNlOiBTY3JvbGxpbmdTZXJ2aWNlLFxuICAgIHB1YmxpYyBjb21tb25TdHJpbmdzOiBDbHJDb21tb25TdHJpbmdzLFxuICAgIEBJbmplY3QoVU5JUVVFX0lEKSBwdWJsaWMgbW9kYWxJZDogc3RyaW5nXG4gICkge31cblxuICBnZXQgc2l6ZUNsYXNzKCk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMuc2l6ZSkge1xuICAgICAgcmV0dXJuICdtb2RhbC0nICsgdGhpcy5zaXplO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICB9XG5cbiAgLy8gRGV0ZWN0IHdoZW4gX29wZW4gaXMgc2V0IHRvIHRydWUgYW5kIHNldCBuby1zY3JvbGxpbmcgdG8gdHJ1ZVxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiB7IFtwcm9wTmFtZTogc3RyaW5nXTogU2ltcGxlQ2hhbmdlIH0pOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuYnlwYXNzU2Nyb2xsU2VydmljZSAmJiBjaGFuZ2VzICYmIGNoYW5nZXMuaGFzT3duUHJvcGVydHkoJ19vcGVuJykpIHtcbiAgICAgIGlmIChjaGFuZ2VzLl9vcGVuLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgICB0aGlzLl9zY3JvbGxpbmdTZXJ2aWNlLnN0b3BTY3JvbGxpbmcoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3Njcm9sbGluZ1NlcnZpY2UucmVzdW1lU2Nyb2xsaW5nKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fc2Nyb2xsaW5nU2VydmljZS5yZXN1bWVTY3JvbGxpbmcoKTtcbiAgfVxuXG4gIG9wZW4oKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX29wZW4pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fb3BlbiA9IHRydWU7XG4gICAgdGhpcy5fb3BlbkNoYW5nZWQuZW1pdCh0cnVlKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2JvZHk6a2V5dXAuZXNjYXBlJylcbiAgY2xvc2UoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuc3RvcENsb3NlKSB7XG4gICAgICB0aGlzLmFsdENsb3NlLmVtaXQoZmFsc2UpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuY2xvc2FibGUgfHwgIXRoaXMuX29wZW4pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fb3BlbiA9IGZhbHNlO1xuICAgIC8vIHRvZG86IHJlbW92ZSB0aGlzIGFmdGVyIGFuaW1hdGlvbiBidWcgaXMgZml4ZWQgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMTU3OThcbiAgICAvLyB0aGlzIHdhcyBoYW5kbGVkIGJ5IHRoZSBmYWRlRG9uZSBldmVudCBiZWxvdywgYnV0IHRoYXQgQW5pbWF0aW9uRXZlbnQgaXMgbm90IGZpcmluZyBpbiBBbmd1bGFyIDQuMC5cbiAgICB0aGlzLl9vcGVuQ2hhbmdlZC5lbWl0KGZhbHNlKTtcbiAgICAvLyBTUEVDTUVcbiAgICB0aGlzLmZvY3VzVHJhcC5zZXRQcmV2aW91c0ZvY3VzKCk7IC8vIEhhbmRsZXMgbW92aW5nIGZvY3VzIGJhY2sgdG8gdGhlIGVsZW1lbnQgdGhhdCBoYWQgaXQgYmVmb3JlLlxuICB9XG5cbiAgZmFkZURvbmUoZTogQW5pbWF0aW9uRXZlbnQpIHtcbiAgICBpZiAoZS50b1N0YXRlID09PSAndm9pZCcpIHtcbiAgICAgIHRoaXMuX29wZW5DaGFuZ2VkLmVtaXQoZmFsc2UpO1xuICAgIH1cbiAgfVxufVxuIl19