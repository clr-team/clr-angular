/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, Optional, HostBinding, Input } from '@angular/core';
import { ControlIdService } from './providers/control-id.service';
export class ClrControlError {
    /**
     * @param {?} controlIdService
     */
    constructor(controlIdService) {
        this.controlIdService = controlIdService;
        this.describedByAttr = null;
        this.subscriptions = [];
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.controlIdService && !this.describedByAttr) {
            this.subscriptions.push(this.controlIdService.idChange.subscribe((/**
             * @param {?} id
             * @return {?}
             */
            id => (this.describedByAttr = id))));
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        sub => sub.unsubscribe()));
    }
}
ClrControlError.decorators = [
    { type: Component, args: [{
                selector: 'clr-control-error',
                template: `
    <ng-content></ng-content>
    `,
                host: {
                    '[class.clr-subtext]': 'true',
                    '[attr.aria-live]': '"polite"',
                }
            }] }
];
/** @nocollapse */
ClrControlError.ctorParameters = () => [
    { type: ControlIdService, decorators: [{ type: Optional }] }
];
ClrControlError.propDecorators = {
    describedByAttr: [{ type: Input, args: ['aria-describedby',] }, { type: HostBinding, args: ['attr.aria-describedby',] }]
};
if (false) {
    /** @type {?} */
    ClrControlError.prototype.describedByAttr;
    /**
     * @type {?}
     * @private
     */
    ClrControlError.prototype.subscriptions;
    /**
     * @type {?}
     * @private
     */
    ClrControlError.prototype.controlIdService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJmb3Jtcy9jb21tb24vZXJyb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBTUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQWFsRSxNQUFNLE9BQU8sZUFBZTs7OztJQU8xQixZQUFnQyxnQkFBa0M7UUFBbEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUpsRSxvQkFBZSxHQUFXLElBQUksQ0FBQztRQUV2QixrQkFBYSxHQUFtQixFQUFFLENBQUM7SUFFMEIsQ0FBQzs7OztJQUV0RSxRQUFRO1FBQ04sSUFBSSxJQUFJLENBQUMsZ0JBQWdCLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ2xELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsU0FBUzs7OztZQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQztTQUN0RztJQUNILENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPOzs7O1FBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLEVBQUMsQ0FBQztJQUN2RCxDQUFDOzs7WUEzQkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxtQkFBbUI7Z0JBQzdCLFFBQVEsRUFBRTs7S0FFUDtnQkFDSCxJQUFJLEVBQUU7b0JBQ0oscUJBQXFCLEVBQUUsTUFBTTtvQkFDN0Isa0JBQWtCLEVBQUUsVUFBVTtpQkFDL0I7YUFDRjs7OztZQVpRLGdCQUFnQix1QkFvQlYsUUFBUTs7OzhCQU5wQixLQUFLLFNBQUMsa0JBQWtCLGNBQ3hCLFdBQVcsU0FBQyx1QkFBdUI7Ozs7SUFEcEMsMENBRStCOzs7OztJQUUvQix3Q0FBMkM7Ozs7O0lBRS9CLDJDQUFzRCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IENvbXBvbmVudCwgT3B0aW9uYWwsIEhvc3RCaW5kaW5nLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbElkU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2NvbnRyb2wtaWQuc2VydmljZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLWNvbnRyb2wtZXJyb3InLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICBgLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5jbHItc3VidGV4dF0nOiAndHJ1ZScsXG4gICAgJ1thdHRyLmFyaWEtbGl2ZV0nOiAnXCJwb2xpdGVcIicsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIENsckNvbnRyb2xFcnJvciB7XG4gIEBJbnB1dCgnYXJpYS1kZXNjcmliZWRieScpXG4gIEBIb3N0QmluZGluZygnYXR0ci5hcmlhLWRlc2NyaWJlZGJ5JylcbiAgZGVzY3JpYmVkQnlBdHRyOiBzdHJpbmcgPSBudWxsO1xuXG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBwcml2YXRlIGNvbnRyb2xJZFNlcnZpY2U6IENvbnRyb2xJZFNlcnZpY2UpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMuY29udHJvbElkU2VydmljZSAmJiAhdGhpcy5kZXNjcmliZWRCeUF0dHIpIHtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKHRoaXMuY29udHJvbElkU2VydmljZS5pZENoYW5nZS5zdWJzY3JpYmUoaWQgPT4gKHRoaXMuZGVzY3JpYmVkQnlBdHRyID0gaWQpKSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmZvckVhY2goc3ViID0+IHN1Yi51bnN1YnNjcmliZSgpKTtcbiAgfVxufVxuIl19