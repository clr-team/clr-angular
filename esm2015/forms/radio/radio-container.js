/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ContentChild, Input, Optional } from '@angular/core';
import { IfErrorService } from '../common/if-error/if-error.service';
import { ClrLabel } from '../common/label';
import { ControlClassService } from '../common/providers/control-class.service';
import { LayoutService } from '../common/providers/layout.service';
import { NgControlService } from '../common/providers/ng-control.service';
export class ClrRadioContainer {
    /**
     * @param {?} ifErrorService
     * @param {?} layoutService
     * @param {?} controlClassService
     * @param {?} ngControlService
     */
    constructor(ifErrorService, layoutService, controlClassService, ngControlService) {
        this.ifErrorService = ifErrorService;
        this.layoutService = layoutService;
        this.controlClassService = controlClassService;
        this.ngControlService = ngControlService;
        this.subscriptions = [];
        this.invalid = false;
        this.inline = false;
        this.subscriptions.push(this.ifErrorService.statusChanges.subscribe((/**
         * @param {?} invalid
         * @return {?}
         */
        invalid => {
            this.invalid = invalid;
        })));
        this.subscriptions.push(this.ngControlService.controlChanges.subscribe((/**
         * @param {?} control
         * @return {?}
         */
        control => {
            this.control = control;
        })));
    }
    /*
       * Here we want to support the following cases
       * clrInline - true by presence
       * clrInline="true|false" - unless it is explicitly false, strings are considered true
       * [clrInline]="true|false" - expect a boolean
       */
    /**
     * @param {?} value
     * @return {?}
     */
    set clrInline(value) {
        if (typeof value === 'string') {
            this.inline = value === 'false' ? false : true;
        }
        else {
            this.inline = !!value;
        }
    }
    /**
     * @return {?}
     */
    get clrInline() {
        return this.inline;
    }
    /**
     * @return {?}
     */
    controlClass() {
        return this.controlClassService.controlClass(this.invalid, this.addGrid(), this.inline ? 'clr-control-inline' : '');
    }
    /**
     * @return {?}
     */
    addGrid() {
        if (this.layoutService && !this.layoutService.isVertical()) {
            return true;
        }
        return false;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscriptions.map((/**
         * @param {?} sub
         * @return {?}
         */
        sub => sub.unsubscribe()));
    }
}
ClrRadioContainer.decorators = [
    { type: Component, args: [{
                selector: 'clr-radio-container',
                template: `
    <ng-content select="label"></ng-content>
    <label *ngIf="!label && addGrid()"></label>
    <div class="clr-control-container" [class.clr-control-inline]="clrInline" [ngClass]="controlClass()">
      <ng-content select="clr-radio-wrapper"></ng-content>
      <div class="clr-subtext-wrapper">
        <ng-content select="clr-control-helper" *ngIf="!invalid"></ng-content>
        <clr-icon *ngIf="invalid" class="clr-validate-icon" shape="exclamation-circle" aria-hidden="true"></clr-icon>
        <ng-content select="clr-control-error" *ngIf="invalid"></ng-content>
      </div>
    </div>
    `,
                host: {
                    '[class.clr-form-control]': 'true',
                    '[class.clr-form-control-disabled]': 'control?.disabled',
                    '[class.clr-row]': 'addGrid()',
                },
                providers: [NgControlService, ControlClassService, IfErrorService]
            }] }
];
/** @nocollapse */
ClrRadioContainer.ctorParameters = () => [
    { type: IfErrorService },
    { type: LayoutService, decorators: [{ type: Optional }] },
    { type: ControlClassService },
    { type: NgControlService }
];
ClrRadioContainer.propDecorators = {
    label: [{ type: ContentChild, args: [ClrLabel, { static: false },] }],
    clrInline: [{ type: Input }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    ClrRadioContainer.prototype.subscriptions;
    /** @type {?} */
    ClrRadioContainer.prototype.invalid;
    /** @type {?} */
    ClrRadioContainer.prototype.label;
    /**
     * @type {?}
     * @private
     */
    ClrRadioContainer.prototype.inline;
    /** @type {?} */
    ClrRadioContainer.prototype.control;
    /**
     * @type {?}
     * @private
     */
    ClrRadioContainer.prototype.ifErrorService;
    /**
     * @type {?}
     * @private
     */
    ClrRadioContainer.prototype.layoutService;
    /**
     * @type {?}
     * @private
     */
    ClrRadioContainer.prototype.controlClassService;
    /**
     * @type {?}
     * @private
     */
    ClrRadioContainer.prototype.ngControlService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW8tY29udGFpbmVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZm9ybXMvcmFkaW8vcmFkaW8tY29udGFpbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQU1BLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBYSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFJcEYsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUNoRixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDbkUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUF1QjFFLE1BQU0sT0FBTyxpQkFBaUI7Ozs7Ozs7SUEwQjVCLFlBQ1UsY0FBOEIsRUFDbEIsYUFBNEIsRUFDeEMsbUJBQXdDLEVBQ3hDLGdCQUFrQztRQUhsQyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDbEIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDeEMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4QyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBN0JwQyxrQkFBYSxHQUFtQixFQUFFLENBQUM7UUFDM0MsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUdSLFdBQU0sR0FBRyxLQUFLLENBQUM7UUEyQnJCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUNyQixJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxTQUFTOzs7O1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDcEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDekIsQ0FBQyxFQUFDLENBQ0gsQ0FBQztRQUNGLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUNyQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLFNBQVM7Ozs7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUN2RCxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN6QixDQUFDLEVBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQzs7Ozs7Ozs7Ozs7SUE1QkQsSUFDSSxTQUFTLENBQUMsS0FBdUI7UUFDbkMsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7WUFDN0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztTQUNoRDthQUFNO1lBQ0wsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO1NBQ3ZCO0lBQ0gsQ0FBQzs7OztJQUNELElBQUksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDOzs7O0lBb0JELFlBQVk7UUFDVixPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3RILENBQUM7Ozs7SUFFRCxPQUFPO1FBQ0wsSUFBSSxJQUFJLENBQUMsYUFBYSxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUUsRUFBRTtZQUMxRCxPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDOzs7O0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRzs7OztRQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxFQUFDLENBQUM7SUFDbkQsQ0FBQzs7O1lBOUVGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUscUJBQXFCO2dCQUMvQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7O0tBV1A7Z0JBQ0gsSUFBSSxFQUFFO29CQUNKLDBCQUEwQixFQUFFLE1BQU07b0JBQ2xDLG1DQUFtQyxFQUFFLG1CQUFtQjtvQkFDeEQsaUJBQWlCLEVBQUUsV0FBVztpQkFDL0I7Z0JBQ0QsU0FBUyxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsbUJBQW1CLEVBQUUsY0FBYyxDQUFDO2FBQ25FOzs7O1lBMUJRLGNBQWM7WUFHZCxhQUFhLHVCQW9EakIsUUFBUTtZQXJESixtQkFBbUI7WUFFbkIsZ0JBQWdCOzs7b0JBMEJ0QixZQUFZLFNBQUMsUUFBUSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTt3QkFXeEMsS0FBSzs7Ozs7OztJQWJOLDBDQUEyQzs7SUFDM0Msb0NBQWdCOztJQUNoQixrQ0FDZ0I7Ozs7O0lBQ2hCLG1DQUF1Qjs7SUFDdkIsb0NBQW1COzs7OztJQXFCakIsMkNBQXNDOzs7OztJQUN0QywwQ0FBZ0Q7Ozs7O0lBQ2hELGdEQUFnRDs7Ozs7SUFDaEQsNkNBQTBDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBDb250ZW50Q2hpbGQsIElucHV0LCBPbkRlc3Ryb3ksIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ0NvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgSWZFcnJvclNlcnZpY2UgfSBmcm9tICcuLi9jb21tb24vaWYtZXJyb3IvaWYtZXJyb3Iuc2VydmljZSc7XG5pbXBvcnQgeyBDbHJMYWJlbCB9IGZyb20gJy4uL2NvbW1vbi9sYWJlbCc7XG5pbXBvcnQgeyBDb250cm9sQ2xhc3NTZXJ2aWNlIH0gZnJvbSAnLi4vY29tbW9uL3Byb3ZpZGVycy9jb250cm9sLWNsYXNzLnNlcnZpY2UnO1xuaW1wb3J0IHsgTGF5b3V0U2VydmljZSB9IGZyb20gJy4uL2NvbW1vbi9wcm92aWRlcnMvbGF5b3V0LnNlcnZpY2UnO1xuaW1wb3J0IHsgTmdDb250cm9sU2VydmljZSB9IGZyb20gJy4uL2NvbW1vbi9wcm92aWRlcnMvbmctY29udHJvbC5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLXJhZGlvLWNvbnRhaW5lcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibGFiZWxcIj48L25nLWNvbnRlbnQ+XG4gICAgPGxhYmVsICpuZ0lmPVwiIWxhYmVsICYmIGFkZEdyaWQoKVwiPjwvbGFiZWw+XG4gICAgPGRpdiBjbGFzcz1cImNsci1jb250cm9sLWNvbnRhaW5lclwiIFtjbGFzcy5jbHItY29udHJvbC1pbmxpbmVdPVwiY2xySW5saW5lXCIgW25nQ2xhc3NdPVwiY29udHJvbENsYXNzKClcIj5cbiAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImNsci1yYWRpby13cmFwcGVyXCI+PC9uZy1jb250ZW50PlxuICAgICAgPGRpdiBjbGFzcz1cImNsci1zdWJ0ZXh0LXdyYXBwZXJcIj5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiY2xyLWNvbnRyb2wtaGVscGVyXCIgKm5nSWY9XCIhaW52YWxpZFwiPjwvbmctY29udGVudD5cbiAgICAgICAgPGNsci1pY29uICpuZ0lmPVwiaW52YWxpZFwiIGNsYXNzPVwiY2xyLXZhbGlkYXRlLWljb25cIiBzaGFwZT1cImV4Y2xhbWF0aW9uLWNpcmNsZVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvY2xyLWljb24+XG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImNsci1jb250cm9sLWVycm9yXCIgKm5nSWY9XCJpbnZhbGlkXCI+PC9uZy1jb250ZW50PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgYCxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuY2xyLWZvcm0tY29udHJvbF0nOiAndHJ1ZScsXG4gICAgJ1tjbGFzcy5jbHItZm9ybS1jb250cm9sLWRpc2FibGVkXSc6ICdjb250cm9sPy5kaXNhYmxlZCcsXG4gICAgJ1tjbGFzcy5jbHItcm93XSc6ICdhZGRHcmlkKCknLFxuICB9LFxuICBwcm92aWRlcnM6IFtOZ0NvbnRyb2xTZXJ2aWNlLCBDb250cm9sQ2xhc3NTZXJ2aWNlLCBJZkVycm9yU2VydmljZV0sXG59KVxuZXhwb3J0IGNsYXNzIENsclJhZGlvQ29udGFpbmVyIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuICBpbnZhbGlkID0gZmFsc2U7XG4gIEBDb250ZW50Q2hpbGQoQ2xyTGFiZWwsIHsgc3RhdGljOiBmYWxzZSB9KVxuICBsYWJlbDogQ2xyTGFiZWw7XG4gIHByaXZhdGUgaW5saW5lID0gZmFsc2U7XG4gIGNvbnRyb2w6IE5nQ29udHJvbDtcblxuICAvKlxuICAgKiBIZXJlIHdlIHdhbnQgdG8gc3VwcG9ydCB0aGUgZm9sbG93aW5nIGNhc2VzXG4gICAqIGNscklubGluZSAtIHRydWUgYnkgcHJlc2VuY2VcbiAgICogY2xySW5saW5lPVwidHJ1ZXxmYWxzZVwiIC0gdW5sZXNzIGl0IGlzIGV4cGxpY2l0bHkgZmFsc2UsIHN0cmluZ3MgYXJlIGNvbnNpZGVyZWQgdHJ1ZVxuICAgKiBbY2xySW5saW5lXT1cInRydWV8ZmFsc2VcIiAtIGV4cGVjdCBhIGJvb2xlYW5cbiAgICovXG4gIEBJbnB1dCgpXG4gIHNldCBjbHJJbmxpbmUodmFsdWU6IGJvb2xlYW4gfCBzdHJpbmcpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5pbmxpbmUgPSB2YWx1ZSA9PT0gJ2ZhbHNlJyA/IGZhbHNlIDogdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pbmxpbmUgPSAhIXZhbHVlO1xuICAgIH1cbiAgfVxuICBnZXQgY2xySW5saW5lKCkge1xuICAgIHJldHVybiB0aGlzLmlubGluZTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgaWZFcnJvclNlcnZpY2U6IElmRXJyb3JTZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgbGF5b3V0U2VydmljZTogTGF5b3V0U2VydmljZSxcbiAgICBwcml2YXRlIGNvbnRyb2xDbGFzc1NlcnZpY2U6IENvbnRyb2xDbGFzc1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBuZ0NvbnRyb2xTZXJ2aWNlOiBOZ0NvbnRyb2xTZXJ2aWNlXG4gICkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5pZkVycm9yU2VydmljZS5zdGF0dXNDaGFuZ2VzLnN1YnNjcmliZShpbnZhbGlkID0+IHtcbiAgICAgICAgdGhpcy5pbnZhbGlkID0gaW52YWxpZDtcbiAgICAgIH0pXG4gICAgKTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMubmdDb250cm9sU2VydmljZS5jb250cm9sQ2hhbmdlcy5zdWJzY3JpYmUoY29udHJvbCA9PiB7XG4gICAgICAgIHRoaXMuY29udHJvbCA9IGNvbnRyb2w7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBjb250cm9sQ2xhc3MoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29udHJvbENsYXNzU2VydmljZS5jb250cm9sQ2xhc3ModGhpcy5pbnZhbGlkLCB0aGlzLmFkZEdyaWQoKSwgdGhpcy5pbmxpbmUgPyAnY2xyLWNvbnRyb2wtaW5saW5lJyA6ICcnKTtcbiAgfVxuXG4gIGFkZEdyaWQoKSB7XG4gICAgaWYgKHRoaXMubGF5b3V0U2VydmljZSAmJiAhdGhpcy5sYXlvdXRTZXJ2aWNlLmlzVmVydGljYWwoKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5tYXAoc3ViID0+IHN1Yi51bnN1YnNjcmliZSgpKTtcbiAgfVxufVxuIl19