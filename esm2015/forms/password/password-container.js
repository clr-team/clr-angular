/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ContentChild, Inject, InjectionToken, Input, Optional } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IfErrorService } from '../common/if-error/if-error.service';
import { ClrLabel } from '../common/label';
import { ControlClassService } from '../common/providers/control-class.service';
import { ControlIdService } from '../common/providers/control-id.service';
import { FocusService } from '../common/providers/focus.service';
import { LayoutService } from '../common/providers/layout.service';
import { NgControlService } from '../common/providers/ng-control.service';
import { ClrCommonStrings } from '../../utils/i18n/common-strings.interface';
/* tslint:disable-next-line:variable-name */
/** @type {?} */
export const ToggleService = new InjectionToken(undefined);
/* tslint:disable-next-line:variable-name */
/**
 * @return {?}
 */
export function ToggleServiceProvider() {
    return new BehaviorSubject(false);
}
export class ClrPasswordContainer {
    /**
     * @param {?} ifErrorService
     * @param {?} layoutService
     * @param {?} controlClassService
     * @param {?} focusService
     * @param {?} ngControlService
     * @param {?} toggleService
     * @param {?} commonStrings
     */
    constructor(ifErrorService, layoutService, controlClassService, focusService, ngControlService, toggleService, commonStrings) {
        this.ifErrorService = ifErrorService;
        this.layoutService = layoutService;
        this.controlClassService = controlClassService;
        this.focusService = focusService;
        this.ngControlService = ngControlService;
        this.toggleService = toggleService;
        this.commonStrings = commonStrings;
        this.subscriptions = [];
        this.invalid = false;
        this._dynamic = false;
        this.show = false;
        this.focus = false;
        this._toggle = true;
        this.subscriptions.push(this.ifErrorService.statusChanges.subscribe(invalid => {
            this.invalid = invalid;
        }));
        this.subscriptions.push(this.focusService.focusChange.subscribe(state => {
            this.focus = state;
        }));
        this.subscriptions.push(this.ngControlService.controlChanges.subscribe(control => {
            this.control = control;
        }));
    }
    /**
     * @param {?} state
     * @return {?}
     */
    set clrToggle(state) {
        this._toggle = state;
        if (!state) {
            this.show = false;
        }
    }
    /**
     * @return {?}
     */
    get clrToggle() {
        return this._toggle;
    }
    /**
     * @return {?}
     */
    toggle() {
        this.show = !this.show;
        this.toggleService.next(this.show);
    }
    /**
     * @return {?}
     */
    controlClass() {
        return this.controlClassService.controlClass(this.invalid, this.addGrid());
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
        if (this.subscriptions) {
            this.subscriptions.map(sub => sub.unsubscribe());
        }
    }
}
ClrPasswordContainer.decorators = [
    { type: Component, args: [{
                selector: 'clr-password-container',
                template: `
    <ng-content select="label"></ng-content>
    <label *ngIf="!label && addGrid()"></label>
    <div class="clr-control-container" [ngClass]="controlClass()">
      <div class="clr-input-wrapper">
        <div class="clr-input-group" [class.clr-focus]="focus">
          <ng-content select="[clrPassword]"></ng-content>
          <clr-icon *ngIf="!show && clrToggle"
            shape="eye" 
            class="clr-input-group-icon-action"
            [attr.title]="commonStrings.show"
            (click)="toggle()"></clr-icon>
          <clr-icon *ngIf="show && clrToggle" 
            shape="eye-hide"
            class="clr-input-group-icon-action"
            [attr.title]="commonStrings.hide"
            (click)="toggle()"></clr-icon>
        </div>
        <clr-icon *ngIf="invalid" class="clr-validate-icon" shape="exclamation-circle" aria-hidden="true"></clr-icon>
      </div>
      <ng-content select="clr-control-helper" *ngIf="!invalid"></ng-content>
      <ng-content select="clr-control-error" *ngIf="invalid"></ng-content>
    </div>
    `,
                host: {
                    '[class.clr-form-control]': 'true',
                    '[class.clr-form-control-disabled]': 'control?.disabled',
                    '[class.clr-row]': 'addGrid()',
                },
                providers: [
                    IfErrorService,
                    NgControlService,
                    ControlIdService,
                    ControlClassService,
                    FocusService,
                    { provide: ToggleService, useFactory: ToggleServiceProvider },
                ]
            }] }
];
/** @nocollapse */
ClrPasswordContainer.ctorParameters = () => [
    { type: IfErrorService },
    { type: LayoutService, decorators: [{ type: Optional }] },
    { type: ControlClassService },
    { type: FocusService },
    { type: NgControlService },
    { type: BehaviorSubject, decorators: [{ type: Inject, args: [ToggleService,] }] },
    { type: ClrCommonStrings }
];
ClrPasswordContainer.propDecorators = {
    clrToggle: [{ type: Input, args: ['clrToggle',] }],
    label: [{ type: ContentChild, args: [ClrLabel,] }]
};
if (false) {
    /** @type {?} */
    ClrPasswordContainer.prototype.subscriptions;
    /** @type {?} */
    ClrPasswordContainer.prototype.invalid;
    /** @type {?} */
    ClrPasswordContainer.prototype.control;
    /** @type {?} */
    ClrPasswordContainer.prototype._dynamic;
    /** @type {?} */
    ClrPasswordContainer.prototype.show;
    /** @type {?} */
    ClrPasswordContainer.prototype.focus;
    /** @type {?} */
    ClrPasswordContainer.prototype._toggle;
    /** @type {?} */
    ClrPasswordContainer.prototype.label;
    /** @type {?} */
    ClrPasswordContainer.prototype.ifErrorService;
    /** @type {?} */
    ClrPasswordContainer.prototype.layoutService;
    /** @type {?} */
    ClrPasswordContainer.prototype.controlClassService;
    /** @type {?} */
    ClrPasswordContainer.prototype.focusService;
    /** @type {?} */
    ClrPasswordContainer.prototype.ngControlService;
    /** @type {?} */
    ClrPasswordContainer.prototype.toggleService;
    /** @type {?} */
    ClrPasswordContainer.prototype.commonStrings;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFzc3dvcmQtY29udGFpbmVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZm9ybXMvcGFzc3dvcmQvcGFzc3dvcmQtY29udGFpbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQU1BLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsS0FBSyxFQUFhLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU1RyxPQUFPLEVBQUUsZUFBZSxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUdyRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDckUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNqRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDbkUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDMUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7OztBQUc3RSxNQUFNLE9BQU8sYUFBYSxHQUFHLElBQUksY0FBYyxDQUFNLFNBQVMsQ0FBQzs7Ozs7QUFFL0QsTUFBTSxVQUFVLHFCQUFxQjtJQUNuQyxPQUFPLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0FBQzdDLENBQUM7QUEwQ0QsTUFBTSxPQUFPLG9CQUFvQjs7Ozs7Ozs7OztJQXFCL0IsWUFDVSxjQUE4QixFQUNsQixhQUE0QixFQUN4QyxtQkFBd0MsRUFDekMsWUFBMEIsRUFDekIsZ0JBQWtDLEVBQ1gsYUFBdUMsRUFDL0QsYUFBK0I7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QUFnQjtvQkFDaEIsbUJBQW1CO29CQUNuQixZQUFZO29CQUNaLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxVQUFVLEVBQUUscUJBQXFCLEVBQUU7aUJBQzlEO2FBQ0Y7Ozs7WUF2RFEsY0FBYztZQUtkLGFBQWEsdUJBMEVqQixRQUFRO1lBN0VKLG1CQUFtQjtZQUVuQixZQUFZO1lBRVosZ0JBQWdCO1lBVGhCLGVBQWUsdUJBc0ZuQixNQUFNLFNBQUMsYUFBYTtZQTVFaEIsZ0JBQWdCOzs7d0JBMER0QixLQUFLLFNBQUMsV0FBVztvQkFVakIsWUFBWSxTQUFDLFFBQVE7Ozs7SUFsQnRCLDZDQUEyQzs7SUFDM0MsdUNBQWdCOztJQUNoQix1Q0FBbUI7O0lBQ25CLHdDQUFpQjs7SUFDakIsb0NBQWE7O0lBQ2IscUNBQWM7O0lBQ2QsdUNBQXVCOztJQVl2QixxQ0FBd0M7O0lBR3RDLDhDQUFzQzs7SUFDdEMsNkNBQWdEOztJQUNoRCxtREFBZ0Q7O0lBQ2hELDRDQUFpQzs7SUFDakMsZ0RBQTBDOztJQUMxQyw2Q0FBc0U7O0lBQ3RFLDZDQUFzQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IENvbXBvbmVudCwgQ29udGVudENoaWxkLCBJbmplY3QsIEluamVjdGlvblRva2VuLCBJbnB1dCwgT25EZXN0cm95LCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IER5bmFtaWNXcmFwcGVyIH0gZnJvbSAnLi4vLi4vdXRpbHMvaG9zdC13cmFwcGluZy9keW5hbWljLXdyYXBwZXInO1xuXG5pbXBvcnQgeyBJZkVycm9yU2VydmljZSB9IGZyb20gJy4uL2NvbW1vbi9pZi1lcnJvci9pZi1lcnJvci5zZXJ2aWNlJztcbmltcG9ydCB7IENsckxhYmVsIH0gZnJvbSAnLi4vY29tbW9uL2xhYmVsJztcbmltcG9ydCB7IENvbnRyb2xDbGFzc1NlcnZpY2UgfSBmcm9tICcuLi9jb21tb24vcHJvdmlkZXJzL2NvbnRyb2wtY2xhc3Muc2VydmljZSc7XG5pbXBvcnQgeyBDb250cm9sSWRTZXJ2aWNlIH0gZnJvbSAnLi4vY29tbW9uL3Byb3ZpZGVycy9jb250cm9sLWlkLnNlcnZpY2UnO1xuaW1wb3J0IHsgRm9jdXNTZXJ2aWNlIH0gZnJvbSAnLi4vY29tbW9uL3Byb3ZpZGVycy9mb2N1cy5zZXJ2aWNlJztcbmltcG9ydCB7IExheW91dFNlcnZpY2UgfSBmcm9tICcuLi9jb21tb24vcHJvdmlkZXJzL2xheW91dC5zZXJ2aWNlJztcbmltcG9ydCB7IE5nQ29udHJvbFNlcnZpY2UgfSBmcm9tICcuLi9jb21tb24vcHJvdmlkZXJzL25nLWNvbnRyb2wuc2VydmljZSc7XG5pbXBvcnQgeyBDbHJDb21tb25TdHJpbmdzIH0gZnJvbSAnLi4vLi4vdXRpbHMvaTE4bi9jb21tb24tc3RyaW5ncy5pbnRlcmZhY2UnO1xuXG4vKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6dmFyaWFibGUtbmFtZSAqL1xuZXhwb3J0IGNvbnN0IFRvZ2dsZVNlcnZpY2UgPSBuZXcgSW5qZWN0aW9uVG9rZW48YW55Pih1bmRlZmluZWQpO1xuLyogdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnZhcmlhYmxlLW5hbWUgKi9cbmV4cG9ydCBmdW5jdGlvbiBUb2dnbGVTZXJ2aWNlUHJvdmlkZXIoKSB7XG4gIHJldHVybiBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLXBhc3N3b3JkLWNvbnRhaW5lcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibGFiZWxcIj48L25nLWNvbnRlbnQ+XG4gICAgPGxhYmVsICpuZ0lmPVwiIWxhYmVsICYmIGFkZEdyaWQoKVwiPjwvbGFiZWw+XG4gICAgPGRpdiBjbGFzcz1cImNsci1jb250cm9sLWNvbnRhaW5lclwiIFtuZ0NsYXNzXT1cImNvbnRyb2xDbGFzcygpXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiY2xyLWlucHV0LXdyYXBwZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNsci1pbnB1dC1ncm91cFwiIFtjbGFzcy5jbHItZm9jdXNdPVwiZm9jdXNcIj5cbiAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbY2xyUGFzc3dvcmRdXCI+PC9uZy1jb250ZW50PlxuICAgICAgICAgIDxjbHItaWNvbiAqbmdJZj1cIiFzaG93ICYmIGNsclRvZ2dsZVwiXG4gICAgICAgICAgICBzaGFwZT1cImV5ZVwiIFxuICAgICAgICAgICAgY2xhc3M9XCJjbHItaW5wdXQtZ3JvdXAtaWNvbi1hY3Rpb25cIlxuICAgICAgICAgICAgW2F0dHIudGl0bGVdPVwiY29tbW9uU3RyaW5ncy5zaG93XCJcbiAgICAgICAgICAgIChjbGljayk9XCJ0b2dnbGUoKVwiPjwvY2xyLWljb24+XG4gICAgICAgICAgPGNsci1pY29uICpuZ0lmPVwic2hvdyAmJiBjbHJUb2dnbGVcIiBcbiAgICAgICAgICAgIHNoYXBlPVwiZXllLWhpZGVcIlxuICAgICAgICAgICAgY2xhc3M9XCJjbHItaW5wdXQtZ3JvdXAtaWNvbi1hY3Rpb25cIlxuICAgICAgICAgICAgW2F0dHIudGl0bGVdPVwiY29tbW9uU3RyaW5ncy5oaWRlXCJcbiAgICAgICAgICAgIChjbGljayk9XCJ0b2dnbGUoKVwiPjwvY2xyLWljb24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8Y2xyLWljb24gKm5nSWY9XCJpbnZhbGlkXCIgY2xhc3M9XCJjbHItdmFsaWRhdGUtaWNvblwiIHNoYXBlPVwiZXhjbGFtYXRpb24tY2lyY2xlXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9jbHItaWNvbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiY2xyLWNvbnRyb2wtaGVscGVyXCIgKm5nSWY9XCIhaW52YWxpZFwiPjwvbmctY29udGVudD5cbiAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImNsci1jb250cm9sLWVycm9yXCIgKm5nSWY9XCJpbnZhbGlkXCI+PC9uZy1jb250ZW50PlxuICAgIDwvZGl2PlxuICAgIGAsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmNsci1mb3JtLWNvbnRyb2xdJzogJ3RydWUnLFxuICAgICdbY2xhc3MuY2xyLWZvcm0tY29udHJvbC1kaXNhYmxlZF0nOiAnY29udHJvbD8uZGlzYWJsZWQnLFxuICAgICdbY2xhc3MuY2xyLXJvd10nOiAnYWRkR3JpZCgpJyxcbiAgfSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgSWZFcnJvclNlcnZpY2UsXG4gICAgTmdDb250cm9sU2VydmljZSxcbiAgICBDb250cm9sSWRTZXJ2aWNlLFxuICAgIENvbnRyb2xDbGFzc1NlcnZpY2UsXG4gICAgRm9jdXNTZXJ2aWNlLFxuICAgIHsgcHJvdmlkZTogVG9nZ2xlU2VydmljZSwgdXNlRmFjdG9yeTogVG9nZ2xlU2VydmljZVByb3ZpZGVyIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIENsclBhc3N3b3JkQ29udGFpbmVyIGltcGxlbWVudHMgRHluYW1pY1dyYXBwZXIsIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcbiAgaW52YWxpZCA9IGZhbHNlO1xuICBjb250cm9sOiBOZ0NvbnRyb2w7XG4gIF9keW5hbWljID0gZmFsc2U7XG4gIHNob3cgPSBmYWxzZTtcbiAgZm9jdXMgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfdG9nZ2xlID0gdHJ1ZTtcblxuICBASW5wdXQoJ2NsclRvZ2dsZScpXG4gIHNldCBjbHJUb2dnbGUoc3RhdGU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl90b2dnbGUgPSBzdGF0ZTtcbiAgICBpZiAoIXN0YXRlKSB7XG4gICAgICB0aGlzLnNob3cgPSBmYWxzZTtcbiAgICB9XG4gIH1cbiAgZ2V0IGNsclRvZ2dsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdG9nZ2xlO1xuICB9XG4gIEBDb250ZW50Q2hpbGQoQ2xyTGFiZWwpIGxhYmVsOiBDbHJMYWJlbDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGlmRXJyb3JTZXJ2aWNlOiBJZkVycm9yU2VydmljZSxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGxheW91dFNlcnZpY2U6IExheW91dFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBjb250cm9sQ2xhc3NTZXJ2aWNlOiBDb250cm9sQ2xhc3NTZXJ2aWNlLFxuICAgIHB1YmxpYyBmb2N1c1NlcnZpY2U6IEZvY3VzU2VydmljZSxcbiAgICBwcml2YXRlIG5nQ29udHJvbFNlcnZpY2U6IE5nQ29udHJvbFNlcnZpY2UsXG4gICAgQEluamVjdChUb2dnbGVTZXJ2aWNlKSBwcml2YXRlIHRvZ2dsZVNlcnZpY2U6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPixcbiAgICBwdWJsaWMgY29tbW9uU3RyaW5nczogQ2xyQ29tbW9uU3RyaW5nc1xuICApIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMuaWZFcnJvclNlcnZpY2Uuc3RhdHVzQ2hhbmdlcy5zdWJzY3JpYmUoaW52YWxpZCA9PiB7XG4gICAgICAgIHRoaXMuaW52YWxpZCA9IGludmFsaWQ7XG4gICAgICB9KVxuICAgICk7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLmZvY3VzU2VydmljZS5mb2N1c0NoYW5nZS5zdWJzY3JpYmUoc3RhdGUgPT4ge1xuICAgICAgICB0aGlzLmZvY3VzID0gc3RhdGU7XG4gICAgICB9KVxuICAgICk7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLm5nQ29udHJvbFNlcnZpY2UuY29udHJvbENoYW5nZXMuc3Vic2NyaWJlKGNvbnRyb2wgPT4ge1xuICAgICAgICB0aGlzLmNvbnRyb2wgPSBjb250cm9sO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgdG9nZ2xlKCkge1xuICAgIHRoaXMuc2hvdyA9ICF0aGlzLnNob3c7XG4gICAgdGhpcy50b2dnbGVTZXJ2aWNlLm5leHQodGhpcy5zaG93KTtcbiAgfVxuXG4gIGNvbnRyb2xDbGFzcygpIHtcbiAgICByZXR1cm4gdGhpcy5jb250cm9sQ2xhc3NTZXJ2aWNlLmNvbnRyb2xDbGFzcyh0aGlzLmludmFsaWQsIHRoaXMuYWRkR3JpZCgpKTtcbiAgfVxuXG4gIGFkZEdyaWQoKSB7XG4gICAgaWYgKHRoaXMubGF5b3V0U2VydmljZSAmJiAhdGhpcy5sYXlvdXRTZXJ2aWNlLmlzVmVydGljYWwoKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbnMpIHtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5tYXAoc3ViID0+IHN1Yi51bnN1YnNjcmliZSgpKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==