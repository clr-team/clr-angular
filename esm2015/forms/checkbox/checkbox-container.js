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
export class ClrCheckboxContainer {
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
        this.subscriptions.push(this.ngControlService.controlChanges.subscribe((/**
         * @param {?} control
         * @return {?}
         */
        control => {
            this.control = control;
        })));
    }
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
    ngOnInit() {
        // @TODO put a solution in for form group validation
        // if (!this.formGroup) {
        this.subscriptions.push(this.ifErrorService.statusChanges.subscribe((/**
         * @param {?} invalid
         * @return {?}
         */
        invalid => {
            this.invalid = invalid;
        })));
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
ClrCheckboxContainer.decorators = [
    { type: Component, args: [{
                selector: 'clr-checkbox-container,clr-toggle-container',
                template: `
    <ng-content select="label"></ng-content>
    <label *ngIf="!label && addGrid()"></label>
    <div class="clr-control-container" [class.clr-control-inline]="clrInline" [ngClass]="controlClass()">
      <ng-content select="clr-checkbox-wrapper,clr-toggle-wrapper"></ng-content>
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
ClrCheckboxContainer.ctorParameters = () => [
    { type: IfErrorService },
    { type: LayoutService, decorators: [{ type: Optional }] },
    { type: ControlClassService },
    { type: NgControlService }
];
ClrCheckboxContainer.propDecorators = {
    label: [{ type: ContentChild, args: [ClrLabel, { static: false },] }],
    clrInline: [{ type: Input }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    ClrCheckboxContainer.prototype.subscriptions;
    /** @type {?} */
    ClrCheckboxContainer.prototype.invalid;
    /** @type {?} */
    ClrCheckboxContainer.prototype.label;
    /**
     * @type {?}
     * @private
     */
    ClrCheckboxContainer.prototype.inline;
    /** @type {?} */
    ClrCheckboxContainer.prototype.control;
    /**
     * @type {?}
     * @private
     */
    ClrCheckboxContainer.prototype.ifErrorService;
    /**
     * @type {?}
     * @private
     */
    ClrCheckboxContainer.prototype.layoutService;
    /**
     * @type {?}
     * @private
     */
    ClrCheckboxContainer.prototype.controlClassService;
    /**
     * @type {?}
     * @private
     */
    ClrCheckboxContainer.prototype.ngControlService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3gtY29udGFpbmVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZm9ybXMvY2hlY2tib3gvY2hlY2tib3gtY29udGFpbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQU1BLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBYSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFJcEYsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUNoRixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDbkUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUF1QjFFLE1BQU0sT0FBTyxvQkFBb0I7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBdUMvQixZQUNVLGNBQThCLEVBQ2xCLGFBQTRCLEVBQ3hDLG1CQUF3QyxFQUN4QyxnQkFBa0M7UUFIbEMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQ2xCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQ3hDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDeEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQTFDcEMsa0JBQWEsR0FBbUIsRUFBRSxDQUFDO1FBQzNDLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFHUixXQUFNLEdBQUcsS0FBSyxDQUFDO1FBd0NyQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FDckIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxTQUFTOzs7O1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDdkQsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDekIsQ0FBQyxFQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7Ozs7Ozs7Ozs7OztJQW5DRCxJQUNJLFNBQVMsQ0FBQyxLQUF1QjtRQUNuQyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtZQUM3QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1NBQ2hEO2FBQU07WUFDTCxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7U0FDdkI7SUFDSCxDQUFDOzs7O0lBQ0QsSUFBSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7Ozs7SUEyQkQsUUFBUTtRQUNOLG9EQUFvRDtRQUNwRCx5QkFBeUI7UUFDekIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQ3JCLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLFNBQVM7Ozs7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNwRCxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN6QixDQUFDLEVBQUMsQ0FDSCxDQUFDO1FBQ0YsV0FBVztRQUNYLDRFQUE0RTtRQUM1RSxtQ0FBbUM7UUFDbkMsK0JBQStCO1FBQy9CLHVEQUF1RDtRQUN2RCxpREFBaUQ7UUFDakQsV0FBVztRQUNYLFNBQVM7UUFDVCxRQUFRO1FBQ1IsSUFBSTtJQUNOLENBQUM7Ozs7SUFFRCxZQUFZO1FBQ1YsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN0SCxDQUFDOzs7O0lBRUQsT0FBTztRQUNMLElBQUksSUFBSSxDQUFDLGFBQWEsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFLEVBQUU7WUFDMUQsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQzs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUc7Ozs7UUFBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsRUFBQyxDQUFDO0lBQ25ELENBQUM7OztZQTFHRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDZDQUE2QztnQkFDdkQsUUFBUSxFQUFFOzs7Ozs7Ozs7OztHQVdUO2dCQUNELElBQUksRUFBRTtvQkFDSiwwQkFBMEIsRUFBRSxNQUFNO29CQUNsQyxtQ0FBbUMsRUFBRSxtQkFBbUI7b0JBQ3hELGlCQUFpQixFQUFFLFdBQVc7aUJBQy9CO2dCQUNELFNBQVMsRUFBRSxDQUFDLGdCQUFnQixFQUFFLG1CQUFtQixFQUFFLGNBQWMsQ0FBQzthQUNuRTs7OztZQTFCUSxjQUFjO1lBR2QsYUFBYSx1QkFpRWpCLFFBQVE7WUFsRUosbUJBQW1CO1lBRW5CLGdCQUFnQjs7O29CQTBCdEIsWUFBWSxTQUFDLFFBQVEsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7d0JBWXhDLEtBQUs7Ozs7Ozs7SUFkTiw2Q0FBMkM7O0lBQzNDLHVDQUFnQjs7SUFDaEIscUNBQ2dCOzs7OztJQUNoQixzQ0FBdUI7O0lBQ3ZCLHVDQUFtQjs7Ozs7SUFrQ2pCLDhDQUFzQzs7Ozs7SUFDdEMsNkNBQWdEOzs7OztJQUNoRCxtREFBZ0Q7Ozs7O0lBQ2hELGdEQUEwQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IENvbXBvbmVudCwgQ29udGVudENoaWxkLCBJbnB1dCwgT25EZXN0cm95LCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBOZ0NvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IElmRXJyb3JTZXJ2aWNlIH0gZnJvbSAnLi4vY29tbW9uL2lmLWVycm9yL2lmLWVycm9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2xyTGFiZWwgfSBmcm9tICcuLi9jb21tb24vbGFiZWwnO1xuaW1wb3J0IHsgQ29udHJvbENsYXNzU2VydmljZSB9IGZyb20gJy4uL2NvbW1vbi9wcm92aWRlcnMvY29udHJvbC1jbGFzcy5zZXJ2aWNlJztcbmltcG9ydCB7IExheW91dFNlcnZpY2UgfSBmcm9tICcuLi9jb21tb24vcHJvdmlkZXJzL2xheW91dC5zZXJ2aWNlJztcbmltcG9ydCB7IE5nQ29udHJvbFNlcnZpY2UgfSBmcm9tICcuLi9jb21tb24vcHJvdmlkZXJzL25nLWNvbnRyb2wuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci1jaGVja2JveC1jb250YWluZXIsY2xyLXRvZ2dsZS1jb250YWluZXInLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImxhYmVsXCI+PC9uZy1jb250ZW50PlxuICAgIDxsYWJlbCAqbmdJZj1cIiFsYWJlbCAmJiBhZGRHcmlkKClcIj48L2xhYmVsPlxuICAgIDxkaXYgY2xhc3M9XCJjbHItY29udHJvbC1jb250YWluZXJcIiBbY2xhc3MuY2xyLWNvbnRyb2wtaW5saW5lXT1cImNscklubGluZVwiIFtuZ0NsYXNzXT1cImNvbnRyb2xDbGFzcygpXCI+XG4gICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJjbHItY2hlY2tib3gtd3JhcHBlcixjbHItdG9nZ2xlLXdyYXBwZXJcIj48L25nLWNvbnRlbnQ+XG4gICAgICA8ZGl2IGNsYXNzPVwiY2xyLXN1YnRleHQtd3JhcHBlclwiPlxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJjbHItY29udHJvbC1oZWxwZXJcIiAqbmdJZj1cIiFpbnZhbGlkXCI+PC9uZy1jb250ZW50PlxuICAgICAgICA8Y2xyLWljb24gKm5nSWY9XCJpbnZhbGlkXCIgY2xhc3M9XCJjbHItdmFsaWRhdGUtaWNvblwiIHNoYXBlPVwiZXhjbGFtYXRpb24tY2lyY2xlXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9jbHItaWNvbj5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiY2xyLWNvbnRyb2wtZXJyb3JcIiAqbmdJZj1cImludmFsaWRcIj48L25nLWNvbnRlbnQ+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuY2xyLWZvcm0tY29udHJvbF0nOiAndHJ1ZScsXG4gICAgJ1tjbGFzcy5jbHItZm9ybS1jb250cm9sLWRpc2FibGVkXSc6ICdjb250cm9sPy5kaXNhYmxlZCcsXG4gICAgJ1tjbGFzcy5jbHItcm93XSc6ICdhZGRHcmlkKCknLFxuICB9LFxuICBwcm92aWRlcnM6IFtOZ0NvbnRyb2xTZXJ2aWNlLCBDb250cm9sQ2xhc3NTZXJ2aWNlLCBJZkVycm9yU2VydmljZV0sXG59KVxuZXhwb3J0IGNsYXNzIENsckNoZWNrYm94Q29udGFpbmVyIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuICBpbnZhbGlkID0gZmFsc2U7XG4gIEBDb250ZW50Q2hpbGQoQ2xyTGFiZWwsIHsgc3RhdGljOiBmYWxzZSB9KVxuICBsYWJlbDogQ2xyTGFiZWw7XG4gIHByaXZhdGUgaW5saW5lID0gZmFsc2U7XG4gIGNvbnRyb2w6IE5nQ29udHJvbDtcbiAgLy8gcHJpdmF0ZSBmb3JtR3JvdXA6IEFic3RyYWN0Q29udHJvbDtcblxuICAvKlxuICAgKiBIZXJlIHdlIHdhbnQgdG8gc3VwcG9ydCB0aGUgZm9sbG93aW5nIGNhc2VzXG4gICAqIGNscklubGluZSAtIHRydWUgYnkgcHJlc2VuY2VcbiAgICogY2xySW5saW5lPVwidHJ1ZXxmYWxzZVwiIC0gdW5sZXNzIGl0IGlzIGV4cGxpY2l0bHkgZmFsc2UsIHN0cmluZ3MgYXJlIGNvbnNpZGVyZWQgdHJ1ZVxuICAgKiBbY2xySW5saW5lXT1cInRydWV8ZmFsc2VcIiAtIGV4cGVjdCBhIGJvb2xlYW5cbiAgICovXG4gIEBJbnB1dCgpXG4gIHNldCBjbHJJbmxpbmUodmFsdWU6IGJvb2xlYW4gfCBzdHJpbmcpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5pbmxpbmUgPSB2YWx1ZSA9PT0gJ2ZhbHNlJyA/IGZhbHNlIDogdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pbmxpbmUgPSAhIXZhbHVlO1xuICAgIH1cbiAgfVxuICBnZXQgY2xySW5saW5lKCkge1xuICAgIHJldHVybiB0aGlzLmlubGluZTtcbiAgfVxuXG4gIC8vIEBUT0RPIFNvbHZlIGZvciBncm91cCB2YWxpZGF0aW9uLCB3aGljaCBkb2Vzbid0IHdvcmsgbm93IHdpdGggbmdNb2RlbEdyb3VwXG4gIC8vIEJsb2NrZWQgYnkgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMjAyNjhcbiAgLy8gQElucHV0KClcbiAgLy8gc2V0IGNsckZvcm1Hcm91cCh2YWx1ZTogRm9ybUdyb3VwKSB7XG4gIC8vICAgdGhpcy5mb3JtR3JvdXAgPSB2YWx1ZTtcbiAgLy8gfVxuXG4gIC8vIEBJbnB1dCgpXG4gIC8vIHNldCBjbHJGb3JtQXJyYXkodmFsdWU6IEZvcm1BcnJheSkge1xuICAvLyAgIHRoaXMuZm9ybUdyb3VwID0gdmFsdWU7XG4gIC8vIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGlmRXJyb3JTZXJ2aWNlOiBJZkVycm9yU2VydmljZSxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGxheW91dFNlcnZpY2U6IExheW91dFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBjb250cm9sQ2xhc3NTZXJ2aWNlOiBDb250cm9sQ2xhc3NTZXJ2aWNlLFxuICAgIHByaXZhdGUgbmdDb250cm9sU2VydmljZTogTmdDb250cm9sU2VydmljZVxuICApIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMubmdDb250cm9sU2VydmljZS5jb250cm9sQ2hhbmdlcy5zdWJzY3JpYmUoY29udHJvbCA9PiB7XG4gICAgICAgIHRoaXMuY29udHJvbCA9IGNvbnRyb2w7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICAvLyBAVE9ETyBwdXQgYSBzb2x1dGlvbiBpbiBmb3IgZm9ybSBncm91cCB2YWxpZGF0aW9uXG4gICAgLy8gaWYgKCF0aGlzLmZvcm1Hcm91cCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5pZkVycm9yU2VydmljZS5zdGF0dXNDaGFuZ2VzLnN1YnNjcmliZShpbnZhbGlkID0+IHtcbiAgICAgICAgdGhpcy5pbnZhbGlkID0gaW52YWxpZDtcbiAgICAgIH0pXG4gICAgKTtcbiAgICAvLyB9IGVsc2Uge1xuICAgIC8vICAgLy8gQmVjYXVzZSBuZ01vZGVsIGRvZXMgdGhpcywgd2UgaGF2ZSB0byBkZWxheSBhIHRpY2sgdG8gZ2V0IHRoZSByZXN1bHRcbiAgICAvLyAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xuICAgIC8vICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAvLyAgICAgICB0aGlzLmZvcm1Hcm91cC5zdGF0dXNDaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgLy8gICAgICAgICB0aGlzLmludmFsaWQgPSB0aGlzLmZvcm1Hcm91cC5pbnZhbGlkO1xuICAgIC8vICAgICAgIH0pXG4gICAgLy8gICAgICk7XG4gICAgLy8gICB9KTtcbiAgICAvLyB9XG4gIH1cblxuICBjb250cm9sQ2xhc3MoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29udHJvbENsYXNzU2VydmljZS5jb250cm9sQ2xhc3ModGhpcy5pbnZhbGlkLCB0aGlzLmFkZEdyaWQoKSwgdGhpcy5pbmxpbmUgPyAnY2xyLWNvbnRyb2wtaW5saW5lJyA6ICcnKTtcbiAgfVxuXG4gIGFkZEdyaWQoKSB7XG4gICAgaWYgKHRoaXMubGF5b3V0U2VydmljZSAmJiAhdGhpcy5sYXlvdXRTZXJ2aWNlLmlzVmVydGljYWwoKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5tYXAoc3ViID0+IHN1Yi51bnN1YnNjcmliZSgpKTtcbiAgfVxufVxuIl19