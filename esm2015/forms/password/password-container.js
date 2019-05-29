/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
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
/** @type {?} */
export const TOGGLE_SERVICE = new InjectionToken(undefined);
/**
 * @return {?}
 */
export function ToggleServiceFactory() {
    return new BehaviorSubject(false);
}
/** @type {?} */
export const TOGGLE_SERVICE_PROVIDER = { provide: TOGGLE_SERVICE, useFactory: ToggleServiceFactory };
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
        this.subscriptions.push(this.ifErrorService.statusChanges.subscribe((/**
         * @param {?} invalid
         * @return {?}
         */
        invalid => {
            this.invalid = invalid;
        })));
        this.subscriptions.push(this.focusService.focusChange.subscribe((/**
         * @param {?} state
         * @return {?}
         */
        state => {
            this.focus = state;
        })));
        this.subscriptions.push(this.ngControlService.controlChanges.subscribe((/**
         * @param {?} control
         * @return {?}
         */
        control => {
            this.control = control;
        })));
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
            this.subscriptions.map((/**
             * @param {?} sub
             * @return {?}
             */
            sub => sub.unsubscribe()));
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
          <button
            *ngIf="clrToggle"
            (click)="toggle()"
            [disabled]="control?.disabled"
            class="clr-input-group-icon-action"
            type="button">
            <clr-icon
            [attr.shape]="show ? 'eye-hide' : 'eye'"
            [attr.title]="show ? commonStrings.hide : commonStrings.show"></clr-icon>
          </button>
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
                    TOGGLE_SERVICE_PROVIDER,
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
    { type: BehaviorSubject, decorators: [{ type: Inject, args: [TOGGLE_SERVICE,] }] },
    { type: ClrCommonStrings }
];
ClrPasswordContainer.propDecorators = {
    clrToggle: [{ type: Input, args: ['clrToggle',] }],
    label: [{ type: ContentChild, args: [ClrLabel, { static: false },] }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
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
    /**
     * @type {?}
     * @private
     */
    ClrPasswordContainer.prototype._toggle;
    /** @type {?} */
    ClrPasswordContainer.prototype.label;
    /**
     * @type {?}
     * @private
     */
    ClrPasswordContainer.prototype.ifErrorService;
    /**
     * @type {?}
     * @private
     */
    ClrPasswordContainer.prototype.layoutService;
    /**
     * @type {?}
     * @private
     */
    ClrPasswordContainer.prototype.controlClassService;
    /** @type {?} */
    ClrPasswordContainer.prototype.focusService;
    /**
     * @type {?}
     * @private
     */
    ClrPasswordContainer.prototype.ngControlService;
    /**
     * @type {?}
     * @private
     */
    ClrPasswordContainer.prototype.toggleService;
    /** @type {?} */
    ClrPasswordContainer.prototype.commonStrings;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFzc3dvcmQtY29udGFpbmVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZm9ybXMvcGFzc3dvcmQvcGFzc3dvcmQtY29udGFpbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQU1BLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsS0FBSyxFQUFhLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU1RyxPQUFPLEVBQUUsZUFBZSxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUdyRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDckUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNqRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDbkUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDMUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7O0FBRTdFLE1BQU0sT0FBTyxjQUFjLEdBQUcsSUFBSSxjQUFjLENBQTJCLFNBQVMsQ0FBQzs7OztBQUNyRixNQUFNLFVBQVUsb0JBQW9CO0lBQ2xDLE9BQU8sSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7QUFDN0MsQ0FBQzs7QUFDRCxNQUFNLE9BQU8sdUJBQXVCLEdBQUcsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLFVBQVUsRUFBRSxvQkFBb0IsRUFBRTtBQTBDcEcsTUFBTSxPQUFPLG9CQUFvQjs7Ozs7Ozs7OztJQXNCL0IsWUFDVSxjQUE4QixFQUNsQixhQUE0QixFQUN4QyxtQkFBd0MsRUFDekMsWUFBMEIsRUFDekIsZ0JBQWtDLEVBQ1YsYUFBdUMsRUFDaEUsYUFBK0I7UUFOOUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQ2xCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQ3hDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDekMsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDekIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNWLGtCQUFhLEdBQWIsYUFBYSxDQUEwQjtRQUNoRSxrQkFBYSxHQUFiLGFBQWEsQ0FBa0I7UUE1QmhDLGtCQUFhLEdBQW1CLEVBQUUsQ0FBQztRQUMzQyxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBRWhCLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDakIsU0FBSSxHQUFHLEtBQUssQ0FBQztRQUNiLFVBQUssR0FBRyxLQUFLLENBQUM7UUFDTixZQUFPLEdBQUcsSUFBSSxDQUFDO1FBd0JyQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FDckIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsU0FBUzs7OztRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3BELElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3pCLENBQUMsRUFBQyxDQUNILENBQUM7UUFDRixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FDckIsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsU0FBUzs7OztRQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzlDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLENBQUMsRUFBQyxDQUNILENBQUM7UUFDRixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FDckIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxTQUFTOzs7O1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDdkQsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDekIsQ0FBQyxFQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7Ozs7O0lBckNELElBQ0ksU0FBUyxDQUFDLEtBQWM7UUFDMUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDckIsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNWLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1NBQ25CO0lBQ0gsQ0FBQzs7OztJQUNELElBQUksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDOzs7O0lBOEJELE1BQU07UUFDSixJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztRQUN2QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckMsQ0FBQzs7OztJQUVELFlBQVk7UUFDVixPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUM3RSxDQUFDOzs7O0lBRUQsT0FBTztRQUNMLElBQUksSUFBSSxDQUFDLGFBQWEsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFLEVBQUU7WUFDMUQsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQzs7OztJQUVELFdBQVc7UUFDVCxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDdEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHOzs7O1lBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLEVBQUMsQ0FBQztTQUNsRDtJQUNILENBQUM7OztZQTVHRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHdCQUF3QjtnQkFDbEMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQXVCUDtnQkFDSCxJQUFJLEVBQUU7b0JBQ0osMEJBQTBCLEVBQUUsTUFBTTtvQkFDbEMsbUNBQW1DLEVBQUUsbUJBQW1CO29CQUN4RCxpQkFBaUIsRUFBRSxXQUFXO2lCQUMvQjtnQkFDRCxTQUFTLEVBQUU7b0JBQ1QsY0FBYztvQkFDZCxnQkFBZ0I7b0JBQ2hCLGdCQUFnQjtvQkFDaEIsbUJBQW1CO29CQUNuQixZQUFZO29CQUNaLHVCQUF1QjtpQkFDeEI7YUFDRjs7OztZQXREUSxjQUFjO1lBS2QsYUFBYSx1QkEwRWpCLFFBQVE7WUE3RUosbUJBQW1CO1lBRW5CLFlBQVk7WUFFWixnQkFBZ0I7WUFUaEIsZUFBZSx1QkFzRm5CLE1BQU0sU0FBQyxjQUFjO1lBNUVqQixnQkFBZ0I7Ozt3QkF5RHRCLEtBQUssU0FBQyxXQUFXO29CQVVqQixZQUFZLFNBQUMsUUFBUSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTs7Ozs7OztJQWxCekMsNkNBQTJDOztJQUMzQyx1Q0FBZ0I7O0lBQ2hCLHVDQUFtQjs7SUFDbkIsd0NBQWlCOztJQUNqQixvQ0FBYTs7SUFDYixxQ0FBYzs7Ozs7SUFDZCx1Q0FBdUI7O0lBWXZCLHFDQUNnQjs7Ozs7SUFHZCw4Q0FBc0M7Ozs7O0lBQ3RDLDZDQUFnRDs7Ozs7SUFDaEQsbURBQWdEOztJQUNoRCw0Q0FBaUM7Ozs7O0lBQ2pDLGdEQUEwQzs7Ozs7SUFDMUMsNkNBQXVFOztJQUN2RSw2Q0FBc0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQsIENvbnRlbnRDaGlsZCwgSW5qZWN0LCBJbmplY3Rpb25Ub2tlbiwgSW5wdXQsIE9uRGVzdHJveSwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBEeW5hbWljV3JhcHBlciB9IGZyb20gJy4uLy4uL3V0aWxzL2hvc3Qtd3JhcHBpbmcvZHluYW1pYy13cmFwcGVyJztcblxuaW1wb3J0IHsgSWZFcnJvclNlcnZpY2UgfSBmcm9tICcuLi9jb21tb24vaWYtZXJyb3IvaWYtZXJyb3Iuc2VydmljZSc7XG5pbXBvcnQgeyBDbHJMYWJlbCB9IGZyb20gJy4uL2NvbW1vbi9sYWJlbCc7XG5pbXBvcnQgeyBDb250cm9sQ2xhc3NTZXJ2aWNlIH0gZnJvbSAnLi4vY29tbW9uL3Byb3ZpZGVycy9jb250cm9sLWNsYXNzLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29udHJvbElkU2VydmljZSB9IGZyb20gJy4uL2NvbW1vbi9wcm92aWRlcnMvY29udHJvbC1pZC5zZXJ2aWNlJztcbmltcG9ydCB7IEZvY3VzU2VydmljZSB9IGZyb20gJy4uL2NvbW1vbi9wcm92aWRlcnMvZm9jdXMuc2VydmljZSc7XG5pbXBvcnQgeyBMYXlvdXRTZXJ2aWNlIH0gZnJvbSAnLi4vY29tbW9uL3Byb3ZpZGVycy9sYXlvdXQuc2VydmljZSc7XG5pbXBvcnQgeyBOZ0NvbnRyb2xTZXJ2aWNlIH0gZnJvbSAnLi4vY29tbW9uL3Byb3ZpZGVycy9uZy1jb250cm9sLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2xyQ29tbW9uU3RyaW5ncyB9IGZyb20gJy4uLy4uL3V0aWxzL2kxOG4vY29tbW9uLXN0cmluZ3MuaW50ZXJmYWNlJztcblxuZXhwb3J0IGNvbnN0IFRPR0dMRV9TRVJWSUNFID0gbmV3IEluamVjdGlvblRva2VuPEJlaGF2aW9yU3ViamVjdDxib29sZWFuPj4odW5kZWZpbmVkKTtcbmV4cG9ydCBmdW5jdGlvbiBUb2dnbGVTZXJ2aWNlRmFjdG9yeSgpIHtcbiAgcmV0dXJuIG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xufVxuZXhwb3J0IGNvbnN0IFRPR0dMRV9TRVJWSUNFX1BST1ZJREVSID0geyBwcm92aWRlOiBUT0dHTEVfU0VSVklDRSwgdXNlRmFjdG9yeTogVG9nZ2xlU2VydmljZUZhY3RvcnkgfTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLXBhc3N3b3JkLWNvbnRhaW5lcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibGFiZWxcIj48L25nLWNvbnRlbnQ+XG4gICAgPGxhYmVsICpuZ0lmPVwiIWxhYmVsICYmIGFkZEdyaWQoKVwiPjwvbGFiZWw+XG4gICAgPGRpdiBjbGFzcz1cImNsci1jb250cm9sLWNvbnRhaW5lclwiIFtuZ0NsYXNzXT1cImNvbnRyb2xDbGFzcygpXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiY2xyLWlucHV0LXdyYXBwZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNsci1pbnB1dC1ncm91cFwiIFtjbGFzcy5jbHItZm9jdXNdPVwiZm9jdXNcIj5cbiAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbY2xyUGFzc3dvcmRdXCI+PC9uZy1jb250ZW50PlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICpuZ0lmPVwiY2xyVG9nZ2xlXCJcbiAgICAgICAgICAgIChjbGljayk9XCJ0b2dnbGUoKVwiXG4gICAgICAgICAgICBbZGlzYWJsZWRdPVwiY29udHJvbD8uZGlzYWJsZWRcIlxuICAgICAgICAgICAgY2xhc3M9XCJjbHItaW5wdXQtZ3JvdXAtaWNvbi1hY3Rpb25cIlxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiPlxuICAgICAgICAgICAgPGNsci1pY29uXG4gICAgICAgICAgICBbYXR0ci5zaGFwZV09XCJzaG93ID8gJ2V5ZS1oaWRlJyA6ICdleWUnXCJcbiAgICAgICAgICAgIFthdHRyLnRpdGxlXT1cInNob3cgPyBjb21tb25TdHJpbmdzLmhpZGUgOiBjb21tb25TdHJpbmdzLnNob3dcIj48L2Nsci1pY29uPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGNsci1pY29uICpuZ0lmPVwiaW52YWxpZFwiIGNsYXNzPVwiY2xyLXZhbGlkYXRlLWljb25cIiBzaGFwZT1cImV4Y2xhbWF0aW9uLWNpcmNsZVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvY2xyLWljb24+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImNsci1jb250cm9sLWhlbHBlclwiICpuZ0lmPVwiIWludmFsaWRcIj48L25nLWNvbnRlbnQ+XG4gICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJjbHItY29udHJvbC1lcnJvclwiICpuZ0lmPVwiaW52YWxpZFwiPjwvbmctY29udGVudD5cbiAgICA8L2Rpdj5cbiAgICBgLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5jbHItZm9ybS1jb250cm9sXSc6ICd0cnVlJyxcbiAgICAnW2NsYXNzLmNsci1mb3JtLWNvbnRyb2wtZGlzYWJsZWRdJzogJ2NvbnRyb2w/LmRpc2FibGVkJyxcbiAgICAnW2NsYXNzLmNsci1yb3ddJzogJ2FkZEdyaWQoKScsXG4gIH0sXG4gIHByb3ZpZGVyczogW1xuICAgIElmRXJyb3JTZXJ2aWNlLFxuICAgIE5nQ29udHJvbFNlcnZpY2UsXG4gICAgQ29udHJvbElkU2VydmljZSxcbiAgICBDb250cm9sQ2xhc3NTZXJ2aWNlLFxuICAgIEZvY3VzU2VydmljZSxcbiAgICBUT0dHTEVfU0VSVklDRV9QUk9WSURFUixcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyUGFzc3dvcmRDb250YWluZXIgaW1wbGVtZW50cyBEeW5hbWljV3JhcHBlciwgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuICBpbnZhbGlkID0gZmFsc2U7XG4gIGNvbnRyb2w6IE5nQ29udHJvbDtcbiAgX2R5bmFtaWMgPSBmYWxzZTtcbiAgc2hvdyA9IGZhbHNlO1xuICBmb2N1cyA9IGZhbHNlO1xuICBwcml2YXRlIF90b2dnbGUgPSB0cnVlO1xuXG4gIEBJbnB1dCgnY2xyVG9nZ2xlJylcbiAgc2V0IGNsclRvZ2dsZShzdGF0ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX3RvZ2dsZSA9IHN0YXRlO1xuICAgIGlmICghc3RhdGUpIHtcbiAgICAgIHRoaXMuc2hvdyA9IGZhbHNlO1xuICAgIH1cbiAgfVxuICBnZXQgY2xyVG9nZ2xlKCkge1xuICAgIHJldHVybiB0aGlzLl90b2dnbGU7XG4gIH1cbiAgQENvbnRlbnRDaGlsZChDbHJMYWJlbCwgeyBzdGF0aWM6IGZhbHNlIH0pXG4gIGxhYmVsOiBDbHJMYWJlbDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGlmRXJyb3JTZXJ2aWNlOiBJZkVycm9yU2VydmljZSxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGxheW91dFNlcnZpY2U6IExheW91dFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBjb250cm9sQ2xhc3NTZXJ2aWNlOiBDb250cm9sQ2xhc3NTZXJ2aWNlLFxuICAgIHB1YmxpYyBmb2N1c1NlcnZpY2U6IEZvY3VzU2VydmljZSxcbiAgICBwcml2YXRlIG5nQ29udHJvbFNlcnZpY2U6IE5nQ29udHJvbFNlcnZpY2UsXG4gICAgQEluamVjdChUT0dHTEVfU0VSVklDRSkgcHJpdmF0ZSB0b2dnbGVTZXJ2aWNlOiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4sXG4gICAgcHVibGljIGNvbW1vblN0cmluZ3M6IENsckNvbW1vblN0cmluZ3NcbiAgKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLmlmRXJyb3JTZXJ2aWNlLnN0YXR1c0NoYW5nZXMuc3Vic2NyaWJlKGludmFsaWQgPT4ge1xuICAgICAgICB0aGlzLmludmFsaWQgPSBpbnZhbGlkO1xuICAgICAgfSlcbiAgICApO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5mb2N1c1NlcnZpY2UuZm9jdXNDaGFuZ2Uuc3Vic2NyaWJlKHN0YXRlID0+IHtcbiAgICAgICAgdGhpcy5mb2N1cyA9IHN0YXRlO1xuICAgICAgfSlcbiAgICApO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5uZ0NvbnRyb2xTZXJ2aWNlLmNvbnRyb2xDaGFuZ2VzLnN1YnNjcmliZShjb250cm9sID0+IHtcbiAgICAgICAgdGhpcy5jb250cm9sID0gY29udHJvbDtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHRvZ2dsZSgpIHtcbiAgICB0aGlzLnNob3cgPSAhdGhpcy5zaG93O1xuICAgIHRoaXMudG9nZ2xlU2VydmljZS5uZXh0KHRoaXMuc2hvdyk7XG4gIH1cblxuICBjb250cm9sQ2xhc3MoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29udHJvbENsYXNzU2VydmljZS5jb250cm9sQ2xhc3ModGhpcy5pbnZhbGlkLCB0aGlzLmFkZEdyaWQoKSk7XG4gIH1cblxuICBhZGRHcmlkKCkge1xuICAgIGlmICh0aGlzLmxheW91dFNlcnZpY2UgJiYgIXRoaXMubGF5b3V0U2VydmljZS5pc1ZlcnRpY2FsKCkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5zdWJzY3JpcHRpb25zKSB7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbnMubWFwKHN1YiA9PiBzdWIudW5zdWJzY3JpYmUoKSk7XG4gICAgfVxuICB9XG59XG4iXX0=