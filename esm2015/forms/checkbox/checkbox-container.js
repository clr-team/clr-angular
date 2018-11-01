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
        this.subscriptions.push(this.ngControlService.controlChanges.subscribe(control => {
            this.control = control;
        }));
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
        this.subscriptions.push(this.ifErrorService.statusChanges.subscribe(control => {
            this.invalid = control.invalid;
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
        this.subscriptions.map(sub => sub.unsubscribe());
    }
}
ClrCheckboxContainer.decorators = [
    { type: Component, args: [{
                selector: 'clr-checkbox-container',
                template: `
    <ng-content select="label"></ng-content>
    <label *ngIf="!label && addGrid()"></label>
    <div class="clr-control-container" [class.clr-control-inline]="clrInline" [ngClass]="controlClass()">
      <ng-content select="clr-checkbox-wrapper"></ng-content>
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
    label: [{ type: ContentChild, args: [ClrLabel,] }],
    clrInline: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3gtY29udGFpbmVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZm9ybXMvY2hlY2tib3gvY2hlY2tib3gtY29udGFpbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQU1BLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBYSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFJcEYsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUNoRixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDbkUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUF1QjFFLE1BQU0sT0FBTyxvQkFBb0I7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBc0MvQixZQUNVLGNBQThCLEVBQ2xCLGFBQTRCLEVBQ3hDLG1CQUF3QyxFQUN4QyxnQkFBa0M7UUFIbEMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQ2xCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQ3hDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDeEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQXpDcEMsa0JBQWEsR0FBbUIsRUFBRSxDQUFDO1FBQzNDLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFFUixXQUFNLEdBQUcsS0FBSyxDQUFDO1FBd0NyQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FDckIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDdkQsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7Ozs7Ozs7Ozs7OztJQW5DRCxJQUNJLFNBQVMsQ0FBQyxLQUF1QjtRQUNuQyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtZQUM3QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1NBQ2hEO2FBQU07WUFDTCxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7U0FDdkI7SUFDSCxDQUFDOzs7O0lBQ0QsSUFBSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7Ozs7SUEyQkQsUUFBUTtRQUNOLG9EQUFvRDtRQUNwRCx5QkFBeUI7UUFDekIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQ3JCLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUNwRCxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUM7UUFDakMsQ0FBQyxDQUFDLENBQ0gsQ0FBQztRQUNGLFdBQVc7UUFDWCw0RUFBNEU7UUFDNUUsbUNBQW1DO1FBQ25DLCtCQUErQjtRQUMvQix1REFBdUQ7UUFDdkQsaURBQWlEO1FBQ2pELFdBQVc7UUFDWCxTQUFTO1FBQ1QsUUFBUTtRQUNSLElBQUk7SUFDTixDQUFDOzs7O0lBRUQsWUFBWTtRQUNWLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDdEgsQ0FBQzs7OztJQUVELE9BQU87UUFDTCxJQUFJLElBQUksQ0FBQyxhQUFhLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRSxFQUFFO1lBQzFELE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztJQUNuRCxDQUFDOzs7WUF6R0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx3QkFBd0I7Z0JBQ2xDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7R0FXVDtnQkFDRCxJQUFJLEVBQUU7b0JBQ0osMEJBQTBCLEVBQUUsTUFBTTtvQkFDbEMsbUNBQW1DLEVBQUUsbUJBQW1CO29CQUN4RCxpQkFBaUIsRUFBRSxXQUFXO2lCQUMvQjtnQkFDRCxTQUFTLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxtQkFBbUIsRUFBRSxjQUFjLENBQUM7YUFDbkU7Ozs7WUExQlEsY0FBYztZQUdkLGFBQWEsdUJBZ0VqQixRQUFRO1lBakVKLG1CQUFtQjtZQUVuQixnQkFBZ0I7OztvQkEwQnRCLFlBQVksU0FBQyxRQUFRO3dCQVdyQixLQUFLOzs7O0lBYk4sNkNBQTJDOztJQUMzQyx1Q0FBZ0I7O0lBQ2hCLHFDQUF3Qzs7SUFDeEMsc0NBQXVCOztJQUN2Qix1Q0FBbUI7O0lBa0NqQiw4Q0FBc0M7O0lBQ3RDLDZDQUFnRDs7SUFDaEQsbURBQWdEOztJQUNoRCxnREFBMEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQsIENvbnRlbnRDaGlsZCwgSW5wdXQsIE9uRGVzdHJveSwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTmdDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBJZkVycm9yU2VydmljZSB9IGZyb20gJy4uL2NvbW1vbi9pZi1lcnJvci9pZi1lcnJvci5zZXJ2aWNlJztcbmltcG9ydCB7IENsckxhYmVsIH0gZnJvbSAnLi4vY29tbW9uL2xhYmVsJztcbmltcG9ydCB7IENvbnRyb2xDbGFzc1NlcnZpY2UgfSBmcm9tICcuLi9jb21tb24vcHJvdmlkZXJzL2NvbnRyb2wtY2xhc3Muc2VydmljZSc7XG5pbXBvcnQgeyBMYXlvdXRTZXJ2aWNlIH0gZnJvbSAnLi4vY29tbW9uL3Byb3ZpZGVycy9sYXlvdXQuc2VydmljZSc7XG5pbXBvcnQgeyBOZ0NvbnRyb2xTZXJ2aWNlIH0gZnJvbSAnLi4vY29tbW9uL3Byb3ZpZGVycy9uZy1jb250cm9sLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItY2hlY2tib3gtY29udGFpbmVyJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJsYWJlbFwiPjwvbmctY29udGVudD5cbiAgICA8bGFiZWwgKm5nSWY9XCIhbGFiZWwgJiYgYWRkR3JpZCgpXCI+PC9sYWJlbD5cbiAgICA8ZGl2IGNsYXNzPVwiY2xyLWNvbnRyb2wtY29udGFpbmVyXCIgW2NsYXNzLmNsci1jb250cm9sLWlubGluZV09XCJjbHJJbmxpbmVcIiBbbmdDbGFzc109XCJjb250cm9sQ2xhc3MoKVwiPlxuICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiY2xyLWNoZWNrYm94LXdyYXBwZXJcIj48L25nLWNvbnRlbnQ+XG4gICAgICA8ZGl2IGNsYXNzPVwiY2xyLXN1YnRleHQtd3JhcHBlclwiPlxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJjbHItY29udHJvbC1oZWxwZXJcIiAqbmdJZj1cIiFpbnZhbGlkXCI+PC9uZy1jb250ZW50PlxuICAgICAgICA8Y2xyLWljb24gKm5nSWY9XCJpbnZhbGlkXCIgY2xhc3M9XCJjbHItdmFsaWRhdGUtaWNvblwiIHNoYXBlPVwiZXhjbGFtYXRpb24tY2lyY2xlXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9jbHItaWNvbj5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiY2xyLWNvbnRyb2wtZXJyb3JcIiAqbmdJZj1cImludmFsaWRcIj48L25nLWNvbnRlbnQ+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuY2xyLWZvcm0tY29udHJvbF0nOiAndHJ1ZScsXG4gICAgJ1tjbGFzcy5jbHItZm9ybS1jb250cm9sLWRpc2FibGVkXSc6ICdjb250cm9sPy5kaXNhYmxlZCcsXG4gICAgJ1tjbGFzcy5jbHItcm93XSc6ICdhZGRHcmlkKCknLFxuICB9LFxuICBwcm92aWRlcnM6IFtOZ0NvbnRyb2xTZXJ2aWNlLCBDb250cm9sQ2xhc3NTZXJ2aWNlLCBJZkVycm9yU2VydmljZV0sXG59KVxuZXhwb3J0IGNsYXNzIENsckNoZWNrYm94Q29udGFpbmVyIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuICBpbnZhbGlkID0gZmFsc2U7XG4gIEBDb250ZW50Q2hpbGQoQ2xyTGFiZWwpIGxhYmVsOiBDbHJMYWJlbDtcbiAgcHJpdmF0ZSBpbmxpbmUgPSBmYWxzZTtcbiAgY29udHJvbDogTmdDb250cm9sO1xuICAvLyBwcml2YXRlIGZvcm1Hcm91cDogQWJzdHJhY3RDb250cm9sO1xuXG4gIC8qXG4gICAqIEhlcmUgd2Ugd2FudCB0byBzdXBwb3J0IHRoZSBmb2xsb3dpbmcgY2FzZXNcbiAgICogY2xySW5saW5lIC0gdHJ1ZSBieSBwcmVzZW5jZVxuICAgKiBjbHJJbmxpbmU9XCJ0cnVlfGZhbHNlXCIgLSB1bmxlc3MgaXQgaXMgZXhwbGljaXRseSBmYWxzZSwgc3RyaW5ncyBhcmUgY29uc2lkZXJlZCB0cnVlXG4gICAqIFtjbHJJbmxpbmVdPVwidHJ1ZXxmYWxzZVwiIC0gZXhwZWN0IGEgYm9vbGVhblxuICAgKi9cbiAgQElucHV0KClcbiAgc2V0IGNscklubGluZSh2YWx1ZTogYm9vbGVhbiB8IHN0cmluZykge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLmlubGluZSA9IHZhbHVlID09PSAnZmFsc2UnID8gZmFsc2UgOiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmlubGluZSA9ICEhdmFsdWU7XG4gICAgfVxuICB9XG4gIGdldCBjbHJJbmxpbmUoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5saW5lO1xuICB9XG5cbiAgLy8gQFRPRE8gU29sdmUgZm9yIGdyb3VwIHZhbGlkYXRpb24sIHdoaWNoIGRvZXNuJ3Qgd29yayBub3cgd2l0aCBuZ01vZGVsR3JvdXBcbiAgLy8gQmxvY2tlZCBieSBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy8yMDI2OFxuICAvLyBASW5wdXQoKVxuICAvLyBzZXQgY2xyRm9ybUdyb3VwKHZhbHVlOiBGb3JtR3JvdXApIHtcbiAgLy8gICB0aGlzLmZvcm1Hcm91cCA9IHZhbHVlO1xuICAvLyB9XG5cbiAgLy8gQElucHV0KClcbiAgLy8gc2V0IGNsckZvcm1BcnJheSh2YWx1ZTogRm9ybUFycmF5KSB7XG4gIC8vICAgdGhpcy5mb3JtR3JvdXAgPSB2YWx1ZTtcbiAgLy8gfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgaWZFcnJvclNlcnZpY2U6IElmRXJyb3JTZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgbGF5b3V0U2VydmljZTogTGF5b3V0U2VydmljZSxcbiAgICBwcml2YXRlIGNvbnRyb2xDbGFzc1NlcnZpY2U6IENvbnRyb2xDbGFzc1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBuZ0NvbnRyb2xTZXJ2aWNlOiBOZ0NvbnRyb2xTZXJ2aWNlXG4gICkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5uZ0NvbnRyb2xTZXJ2aWNlLmNvbnRyb2xDaGFuZ2VzLnN1YnNjcmliZShjb250cm9sID0+IHtcbiAgICAgICAgdGhpcy5jb250cm9sID0gY29udHJvbDtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIC8vIEBUT0RPIHB1dCBhIHNvbHV0aW9uIGluIGZvciBmb3JtIGdyb3VwIHZhbGlkYXRpb25cbiAgICAvLyBpZiAoIXRoaXMuZm9ybUdyb3VwKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLmlmRXJyb3JTZXJ2aWNlLnN0YXR1c0NoYW5nZXMuc3Vic2NyaWJlKGNvbnRyb2wgPT4ge1xuICAgICAgICB0aGlzLmludmFsaWQgPSBjb250cm9sLmludmFsaWQ7XG4gICAgICB9KVxuICAgICk7XG4gICAgLy8gfSBlbHNlIHtcbiAgICAvLyAgIC8vIEJlY2F1c2UgbmdNb2RlbCBkb2VzIHRoaXMsIHdlIGhhdmUgdG8gZGVsYXkgYSB0aWNrIHRvIGdldCB0aGUgcmVzdWx0XG4gICAgLy8gICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAvLyAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgLy8gICAgICAgdGhpcy5mb3JtR3JvdXAuc3RhdHVzQ2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4ge1xuICAgIC8vICAgICAgICAgdGhpcy5pbnZhbGlkID0gdGhpcy5mb3JtR3JvdXAuaW52YWxpZDtcbiAgICAvLyAgICAgICB9KVxuICAgIC8vICAgICApO1xuICAgIC8vICAgfSk7XG4gICAgLy8gfVxuICB9XG5cbiAgY29udHJvbENsYXNzKCkge1xuICAgIHJldHVybiB0aGlzLmNvbnRyb2xDbGFzc1NlcnZpY2UuY29udHJvbENsYXNzKHRoaXMuaW52YWxpZCwgdGhpcy5hZGRHcmlkKCksIHRoaXMuaW5saW5lID8gJ2Nsci1jb250cm9sLWlubGluZScgOiAnJyk7XG4gIH1cblxuICBhZGRHcmlkKCkge1xuICAgIGlmICh0aGlzLmxheW91dFNlcnZpY2UgJiYgIXRoaXMubGF5b3V0U2VydmljZS5pc1ZlcnRpY2FsKCkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMubWFwKHN1YiA9PiBzdWIudW5zdWJzY3JpYmUoKSk7XG4gIH1cbn1cbiJdfQ==