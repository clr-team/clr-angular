/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ContentChild, Input, Optional } from '@angular/core';
import { IfErrorService } from '../common/if-error/if-error.service';
import { ClrLabel } from '../common/label';
import { ControlClassService } from '../common/providers/control-class.service';
import { LayoutService } from '../common/providers/layout.service';
import { NgControlService } from '../common/providers/ng-control.service';
var ClrCheckboxContainer = /** @class */ (function () {
    // @TODO Solve for group validation, which doesn't work now with ngModelGroup
    // Blocked by https://github.com/angular/angular/issues/20268
    // @Input()
    // set clrFormGroup(value: FormGroup) {
    //   this.formGroup = value;
    // }
    // @Input()
    // set clrFormArray(value: FormArray) {
    //   this.formGroup = value;
    // }
    function ClrCheckboxContainer(ifErrorService, layoutService, controlClassService, ngControlService) {
        var _this = this;
        this.ifErrorService = ifErrorService;
        this.layoutService = layoutService;
        this.controlClassService = controlClassService;
        this.ngControlService = ngControlService;
        this.subscriptions = [];
        this.invalid = false;
        this.inline = false;
        this.subscriptions.push(this.ngControlService.controlChanges.subscribe(function (control) {
            _this.control = control;
        }));
    }
    Object.defineProperty(ClrCheckboxContainer.prototype, "clrInline", {
        get: /**
         * @return {?}
         */
        function () {
            return this.inline;
        },
        // private formGroup: AbstractControl;
        /*
         * Here we want to support the following cases
         * clrInline - true by presence
         * clrInline="true|false" - unless it is explicitly false, strings are considered true
         * [clrInline]="true|false" - expect a boolean
         */
        set: 
        // private formGroup: AbstractControl;
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
        function (value) {
            if (typeof value === 'string') {
                this.inline = value === 'false' ? false : true;
            }
            else {
                this.inline = !!value;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ClrCheckboxContainer.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // @TODO put a solution in for form group validation
        // if (!this.formGroup) {
        this.subscriptions.push(this.ifErrorService.statusChanges.subscribe(function (invalid) {
            _this.invalid = invalid;
        }));
        // } else {
        //   // Because ngModel does this, we have to delay a tick to get the result
        //   Promise.resolve().then(() => {
        //     this.subscriptions.push(
        //       this.formGroup.statusChanges.subscribe(() => {
        //         this.invalid = this.formGroup.invalid;
        //       })
        //     );
        //   });
        // }
    };
    /**
     * @return {?}
     */
    ClrCheckboxContainer.prototype.controlClass = /**
     * @return {?}
     */
    function () {
        return this.controlClassService.controlClass(this.invalid, this.addGrid(), this.inline ? 'clr-control-inline' : '');
    };
    /**
     * @return {?}
     */
    ClrCheckboxContainer.prototype.addGrid = /**
     * @return {?}
     */
    function () {
        if (this.layoutService && !this.layoutService.isVertical()) {
            return true;
        }
        return false;
    };
    /**
     * @return {?}
     */
    ClrCheckboxContainer.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subscriptions.map(function (sub) { return sub.unsubscribe(); });
    };
    ClrCheckboxContainer.decorators = [
        { type: Component, args: [{
                    selector: 'clr-checkbox-container',
                    template: "\n    <ng-content select=\"label\"></ng-content>\n    <label *ngIf=\"!label && addGrid()\"></label>\n    <div class=\"clr-control-container\" [class.clr-control-inline]=\"clrInline\" [ngClass]=\"controlClass()\">\n      <ng-content select=\"clr-checkbox-wrapper\"></ng-content>\n      <div class=\"clr-subtext-wrapper\">\n        <ng-content select=\"clr-control-helper\" *ngIf=\"!invalid\"></ng-content>\n        <clr-icon *ngIf=\"invalid\" class=\"clr-validate-icon\" shape=\"exclamation-circle\" aria-hidden=\"true\"></clr-icon>\n        <ng-content select=\"clr-control-error\" *ngIf=\"invalid\"></ng-content>\n      </div>\n    </div>\n  ",
                    host: {
                        '[class.clr-form-control]': 'true',
                        '[class.clr-form-control-disabled]': 'control?.disabled',
                        '[class.clr-row]': 'addGrid()',
                    },
                    providers: [NgControlService, ControlClassService, IfErrorService]
                }] }
    ];
    /** @nocollapse */
    ClrCheckboxContainer.ctorParameters = function () { return [
        { type: IfErrorService },
        { type: LayoutService, decorators: [{ type: Optional }] },
        { type: ControlClassService },
        { type: NgControlService }
    ]; };
    ClrCheckboxContainer.propDecorators = {
        label: [{ type: ContentChild, args: [ClrLabel,] }],
        clrInline: [{ type: Input }]
    };
    return ClrCheckboxContainer;
}());
export { ClrCheckboxContainer };
if (false) {
    /** @type {?} */
    ClrCheckboxContainer.prototype.subscriptions;
    /** @type {?} */
    ClrCheckboxContainer.prototype.invalid;
    /** @type {?} */
    ClrCheckboxContainer.prototype.label;
    /** @type {?} */
    ClrCheckboxContainer.prototype.inline;
    /** @type {?} */
    ClrCheckboxContainer.prototype.control;
    /** @type {?} */
    ClrCheckboxContainer.prototype.ifErrorService;
    /** @type {?} */
    ClrCheckboxContainer.prototype.layoutService;
    /** @type {?} */
    ClrCheckboxContainer.prototype.controlClassService;
    /** @type {?} */
    ClrCheckboxContainer.prototype.ngControlService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3gtY29udGFpbmVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZm9ybXMvY2hlY2tib3gvY2hlY2tib3gtY29udGFpbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQU1BLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBYSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFJcEYsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUNoRixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDbkUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFFMUU7SUErQ0UsNkVBQTZFO0lBQzdFLDZEQUE2RDtJQUM3RCxXQUFXO0lBQ1gsdUNBQXVDO0lBQ3ZDLDRCQUE0QjtJQUM1QixJQUFJO0lBRUosV0FBVztJQUNYLHVDQUF1QztJQUN2Qyw0QkFBNEI7SUFDNUIsSUFBSTtJQUVKLDhCQUNVLGNBQThCLEVBQ2xCLGFBQTRCLEVBQ3hDLG1CQUF3QyxFQUN4QyxnQkFBa0M7UUFKNUMsaUJBV0M7UUFWUyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDbEIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDeEMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4QyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBekNwQyxrQkFBYSxHQUFtQixFQUFFLENBQUM7UUFDM0MsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUVSLFdBQU0sR0FBRyxLQUFLLENBQUM7UUF3Q3JCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUNyQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxVQUFBLE9BQU87WUFDcEQsS0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFuQ0Qsc0JBQ0ksMkNBQVM7Ozs7UUFPYjtZQUNFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNyQixDQUFDO1FBbEJELHNDQUFzQztRQUV0Qzs7Ozs7V0FLRzs7Ozs7Ozs7Ozs7OztRQUNILFVBQ2MsS0FBdUI7WUFDbkMsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7Z0JBQzdCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7YUFDaEQ7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO2FBQ3ZCO1FBQ0gsQ0FBQzs7O09BQUE7Ozs7SUE4QkQsdUNBQVE7OztJQUFSO1FBQUEsaUJBa0JDO1FBakJDLG9EQUFvRDtRQUNwRCx5QkFBeUI7UUFDekIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQ3JCLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxVQUFBLE9BQU87WUFDakQsS0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQ0gsQ0FBQztRQUNGLFdBQVc7UUFDWCw0RUFBNEU7UUFDNUUsbUNBQW1DO1FBQ25DLCtCQUErQjtRQUMvQix1REFBdUQ7UUFDdkQsaURBQWlEO1FBQ2pELFdBQVc7UUFDWCxTQUFTO1FBQ1QsUUFBUTtRQUNSLElBQUk7SUFDTixDQUFDOzs7O0lBRUQsMkNBQVk7OztJQUFaO1FBQ0UsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN0SCxDQUFDOzs7O0lBRUQsc0NBQU87OztJQUFQO1FBQ0UsSUFBSSxJQUFJLENBQUMsYUFBYSxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUUsRUFBRTtZQUMxRCxPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDOzs7O0lBRUQsMENBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLENBQUMsV0FBVyxFQUFFLEVBQWpCLENBQWlCLENBQUMsQ0FBQztJQUNuRCxDQUFDOztnQkF6R0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSx3QkFBd0I7b0JBQ2xDLFFBQVEsRUFBRSxxb0JBV1Q7b0JBQ0QsSUFBSSxFQUFFO3dCQUNKLDBCQUEwQixFQUFFLE1BQU07d0JBQ2xDLG1DQUFtQyxFQUFFLG1CQUFtQjt3QkFDeEQsaUJBQWlCLEVBQUUsV0FBVztxQkFDL0I7b0JBQ0QsU0FBUyxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsbUJBQW1CLEVBQUUsY0FBYyxDQUFDO2lCQUNuRTs7OztnQkExQlEsY0FBYztnQkFHZCxhQUFhLHVCQWdFakIsUUFBUTtnQkFqRUosbUJBQW1CO2dCQUVuQixnQkFBZ0I7Ozt3QkEwQnRCLFlBQVksU0FBQyxRQUFROzRCQVdyQixLQUFLOztJQXVFUiwyQkFBQztDQUFBLEFBMUdELElBMEdDO1NBckZZLG9CQUFvQjs7O0lBQy9CLDZDQUEyQzs7SUFDM0MsdUNBQWdCOztJQUNoQixxQ0FBd0M7O0lBQ3hDLHNDQUF1Qjs7SUFDdkIsdUNBQW1COztJQWtDakIsOENBQXNDOztJQUN0Qyw2Q0FBZ0Q7O0lBQ2hELG1EQUFnRDs7SUFDaEQsZ0RBQTBDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBDb250ZW50Q2hpbGQsIElucHV0LCBPbkRlc3Ryb3ksIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE5nQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgSWZFcnJvclNlcnZpY2UgfSBmcm9tICcuLi9jb21tb24vaWYtZXJyb3IvaWYtZXJyb3Iuc2VydmljZSc7XG5pbXBvcnQgeyBDbHJMYWJlbCB9IGZyb20gJy4uL2NvbW1vbi9sYWJlbCc7XG5pbXBvcnQgeyBDb250cm9sQ2xhc3NTZXJ2aWNlIH0gZnJvbSAnLi4vY29tbW9uL3Byb3ZpZGVycy9jb250cm9sLWNsYXNzLnNlcnZpY2UnO1xuaW1wb3J0IHsgTGF5b3V0U2VydmljZSB9IGZyb20gJy4uL2NvbW1vbi9wcm92aWRlcnMvbGF5b3V0LnNlcnZpY2UnO1xuaW1wb3J0IHsgTmdDb250cm9sU2VydmljZSB9IGZyb20gJy4uL2NvbW1vbi9wcm92aWRlcnMvbmctY29udHJvbC5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLWNoZWNrYm94LWNvbnRhaW5lcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibGFiZWxcIj48L25nLWNvbnRlbnQ+XG4gICAgPGxhYmVsICpuZ0lmPVwiIWxhYmVsICYmIGFkZEdyaWQoKVwiPjwvbGFiZWw+XG4gICAgPGRpdiBjbGFzcz1cImNsci1jb250cm9sLWNvbnRhaW5lclwiIFtjbGFzcy5jbHItY29udHJvbC1pbmxpbmVdPVwiY2xySW5saW5lXCIgW25nQ2xhc3NdPVwiY29udHJvbENsYXNzKClcIj5cbiAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImNsci1jaGVja2JveC13cmFwcGVyXCI+PC9uZy1jb250ZW50PlxuICAgICAgPGRpdiBjbGFzcz1cImNsci1zdWJ0ZXh0LXdyYXBwZXJcIj5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiY2xyLWNvbnRyb2wtaGVscGVyXCIgKm5nSWY9XCIhaW52YWxpZFwiPjwvbmctY29udGVudD5cbiAgICAgICAgPGNsci1pY29uICpuZ0lmPVwiaW52YWxpZFwiIGNsYXNzPVwiY2xyLXZhbGlkYXRlLWljb25cIiBzaGFwZT1cImV4Y2xhbWF0aW9uLWNpcmNsZVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvY2xyLWljb24+XG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImNsci1jb250cm9sLWVycm9yXCIgKm5nSWY9XCJpbnZhbGlkXCI+PC9uZy1jb250ZW50PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIGAsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmNsci1mb3JtLWNvbnRyb2xdJzogJ3RydWUnLFxuICAgICdbY2xhc3MuY2xyLWZvcm0tY29udHJvbC1kaXNhYmxlZF0nOiAnY29udHJvbD8uZGlzYWJsZWQnLFxuICAgICdbY2xhc3MuY2xyLXJvd10nOiAnYWRkR3JpZCgpJyxcbiAgfSxcbiAgcHJvdmlkZXJzOiBbTmdDb250cm9sU2VydmljZSwgQ29udHJvbENsYXNzU2VydmljZSwgSWZFcnJvclNlcnZpY2VdLFxufSlcbmV4cG9ydCBjbGFzcyBDbHJDaGVja2JveENvbnRhaW5lciBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcbiAgaW52YWxpZCA9IGZhbHNlO1xuICBAQ29udGVudENoaWxkKENsckxhYmVsKSBsYWJlbDogQ2xyTGFiZWw7XG4gIHByaXZhdGUgaW5saW5lID0gZmFsc2U7XG4gIGNvbnRyb2w6IE5nQ29udHJvbDtcbiAgLy8gcHJpdmF0ZSBmb3JtR3JvdXA6IEFic3RyYWN0Q29udHJvbDtcblxuICAvKlxuICAgKiBIZXJlIHdlIHdhbnQgdG8gc3VwcG9ydCB0aGUgZm9sbG93aW5nIGNhc2VzXG4gICAqIGNscklubGluZSAtIHRydWUgYnkgcHJlc2VuY2VcbiAgICogY2xySW5saW5lPVwidHJ1ZXxmYWxzZVwiIC0gdW5sZXNzIGl0IGlzIGV4cGxpY2l0bHkgZmFsc2UsIHN0cmluZ3MgYXJlIGNvbnNpZGVyZWQgdHJ1ZVxuICAgKiBbY2xySW5saW5lXT1cInRydWV8ZmFsc2VcIiAtIGV4cGVjdCBhIGJvb2xlYW5cbiAgICovXG4gIEBJbnB1dCgpXG4gIHNldCBjbHJJbmxpbmUodmFsdWU6IGJvb2xlYW4gfCBzdHJpbmcpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5pbmxpbmUgPSB2YWx1ZSA9PT0gJ2ZhbHNlJyA/IGZhbHNlIDogdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pbmxpbmUgPSAhIXZhbHVlO1xuICAgIH1cbiAgfVxuICBnZXQgY2xySW5saW5lKCkge1xuICAgIHJldHVybiB0aGlzLmlubGluZTtcbiAgfVxuXG4gIC8vIEBUT0RPIFNvbHZlIGZvciBncm91cCB2YWxpZGF0aW9uLCB3aGljaCBkb2Vzbid0IHdvcmsgbm93IHdpdGggbmdNb2RlbEdyb3VwXG4gIC8vIEJsb2NrZWQgYnkgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMjAyNjhcbiAgLy8gQElucHV0KClcbiAgLy8gc2V0IGNsckZvcm1Hcm91cCh2YWx1ZTogRm9ybUdyb3VwKSB7XG4gIC8vICAgdGhpcy5mb3JtR3JvdXAgPSB2YWx1ZTtcbiAgLy8gfVxuXG4gIC8vIEBJbnB1dCgpXG4gIC8vIHNldCBjbHJGb3JtQXJyYXkodmFsdWU6IEZvcm1BcnJheSkge1xuICAvLyAgIHRoaXMuZm9ybUdyb3VwID0gdmFsdWU7XG4gIC8vIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGlmRXJyb3JTZXJ2aWNlOiBJZkVycm9yU2VydmljZSxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGxheW91dFNlcnZpY2U6IExheW91dFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBjb250cm9sQ2xhc3NTZXJ2aWNlOiBDb250cm9sQ2xhc3NTZXJ2aWNlLFxuICAgIHByaXZhdGUgbmdDb250cm9sU2VydmljZTogTmdDb250cm9sU2VydmljZVxuICApIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMubmdDb250cm9sU2VydmljZS5jb250cm9sQ2hhbmdlcy5zdWJzY3JpYmUoY29udHJvbCA9PiB7XG4gICAgICAgIHRoaXMuY29udHJvbCA9IGNvbnRyb2w7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICAvLyBAVE9ETyBwdXQgYSBzb2x1dGlvbiBpbiBmb3IgZm9ybSBncm91cCB2YWxpZGF0aW9uXG4gICAgLy8gaWYgKCF0aGlzLmZvcm1Hcm91cCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5pZkVycm9yU2VydmljZS5zdGF0dXNDaGFuZ2VzLnN1YnNjcmliZShpbnZhbGlkID0+IHtcbiAgICAgICAgdGhpcy5pbnZhbGlkID0gaW52YWxpZDtcbiAgICAgIH0pXG4gICAgKTtcbiAgICAvLyB9IGVsc2Uge1xuICAgIC8vICAgLy8gQmVjYXVzZSBuZ01vZGVsIGRvZXMgdGhpcywgd2UgaGF2ZSB0byBkZWxheSBhIHRpY2sgdG8gZ2V0IHRoZSByZXN1bHRcbiAgICAvLyAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xuICAgIC8vICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAvLyAgICAgICB0aGlzLmZvcm1Hcm91cC5zdGF0dXNDaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgLy8gICAgICAgICB0aGlzLmludmFsaWQgPSB0aGlzLmZvcm1Hcm91cC5pbnZhbGlkO1xuICAgIC8vICAgICAgIH0pXG4gICAgLy8gICAgICk7XG4gICAgLy8gICB9KTtcbiAgICAvLyB9XG4gIH1cblxuICBjb250cm9sQ2xhc3MoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29udHJvbENsYXNzU2VydmljZS5jb250cm9sQ2xhc3ModGhpcy5pbnZhbGlkLCB0aGlzLmFkZEdyaWQoKSwgdGhpcy5pbmxpbmUgPyAnY2xyLWNvbnRyb2wtaW5saW5lJyA6ICcnKTtcbiAgfVxuXG4gIGFkZEdyaWQoKSB7XG4gICAgaWYgKHRoaXMubGF5b3V0U2VydmljZSAmJiAhdGhpcy5sYXlvdXRTZXJ2aWNlLmlzVmVydGljYWwoKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5tYXAoc3ViID0+IHN1Yi51bnN1YnNjcmliZSgpKTtcbiAgfVxufVxuIl19