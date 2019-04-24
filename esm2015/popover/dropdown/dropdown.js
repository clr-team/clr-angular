/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { ChangeDetectorRef, Component, ElementRef, Input, Optional, SkipSelf } from '@angular/core';
import { IfOpenService } from '../../utils/conditional/if-open.service';
import { POPOVER_HOST_ANCHOR } from '../common/popover-host-anchor.token';
import { ROOT_DROPDOWN_PROVIDER, RootDropdownService } from './providers/dropdown.service';
export class ClrDropdown {
    /**
     * @param {?} parent
     * @param {?} ifOpenService
     * @param {?} cdr
     * @param {?} dropdownService
     */
    constructor(parent, ifOpenService, cdr, dropdownService) {
        this.parent = parent;
        this.ifOpenService = ifOpenService;
        this.cdr = cdr;
        this.subscriptions = [];
        this.isMenuClosable = true;
        this.subscriptions.push(dropdownService.changes.subscribe((/**
         * @param {?} value
         * @return {?}
         */
        value => (this.ifOpenService.open = value))));
        this.subscriptions.push(ifOpenService.openChange.subscribe((/**
         * @param {?} value
         * @return {?}
         */
        value => this.cdr.markForCheck())));
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
ClrDropdown.decorators = [
    { type: Component, args: [{
                selector: 'clr-dropdown',
                template: '<ng-content></ng-content>',
                host: {
                    '[class.dropdown]': 'true',
                    // the open class, also used in static version, is always present in the Angular version
                    // Angular takes care of hiding it, regardless of whether you use *clrIfOpen or not
                    '[class.open]': 'true',
                },
                providers: [IfOpenService, ROOT_DROPDOWN_PROVIDER, { provide: POPOVER_HOST_ANCHOR, useExisting: ElementRef }]
            }] }
];
/** @nocollapse */
ClrDropdown.ctorParameters = () => [
    { type: ClrDropdown, decorators: [{ type: SkipSelf }, { type: Optional }] },
    { type: IfOpenService },
    { type: ChangeDetectorRef },
    { type: RootDropdownService }
];
ClrDropdown.propDecorators = {
    isMenuClosable: [{ type: Input, args: ['clrCloseMenuOnItemClick',] }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    ClrDropdown.prototype.subscriptions;
    /** @type {?} */
    ClrDropdown.prototype.isMenuClosable;
    /** @type {?} */
    ClrDropdown.prototype.parent;
    /** @type {?} */
    ClrDropdown.prototype.ifOpenService;
    /**
     * @type {?}
     * @private
     */
    ClrDropdown.prototype.cdr;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJwb3BvdmVyL2Ryb3Bkb3duL2Ryb3Bkb3duLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBYSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRy9HLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUUxRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQWEzRixNQUFNLE9BQU8sV0FBVzs7Ozs7OztJQUd0QixZQUdTLE1BQW1CLEVBQ25CLGFBQTRCLEVBQzNCLEdBQXNCLEVBQzlCLGVBQW9DO1FBSDdCLFdBQU0sR0FBTixNQUFNLENBQWE7UUFDbkIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDM0IsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFQeEIsa0JBQWEsR0FBbUIsRUFBRSxDQUFDO1FBY1QsbUJBQWMsR0FBWSxJQUFJLENBQUM7UUFKL0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxTQUFTOzs7O1FBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxFQUFDLENBQUMsQ0FBQztRQUN2RyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLFNBQVM7Ozs7UUFBQyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLEVBQUMsQ0FBQyxDQUFDO0lBQ2hHLENBQUM7Ozs7SUFJRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPOzs7O1FBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLEVBQUMsQ0FBQztJQUN2RCxDQUFDOzs7WUE5QkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxjQUFjO2dCQUN4QixRQUFRLEVBQUUsMkJBQTJCO2dCQUNyQyxJQUFJLEVBQUU7b0JBQ0osa0JBQWtCLEVBQUUsTUFBTTs7O29CQUcxQixjQUFjLEVBQUUsTUFBTTtpQkFDdkI7Z0JBQ0QsU0FBUyxFQUFFLENBQUMsYUFBYSxFQUFFLHNCQUFzQixFQUFFLEVBQUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsQ0FBQzthQUM5Rzs7OztZQU9rQixXQUFXLHVCQUZ6QixRQUFRLFlBQ1IsUUFBUTtZQXJCSixhQUFhO1lBSGIsaUJBQWlCO1lBTU8sbUJBQW1COzs7NkJBNEJqRCxLQUFLLFNBQUMseUJBQXlCOzs7Ozs7O0lBZGhDLG9DQUEyQzs7SUFjM0MscUNBQWlFOztJQVgvRCw2QkFFMEI7O0lBQzFCLG9DQUFtQzs7Ozs7SUFDbkMsMEJBQThCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgSW5wdXQsIE9uRGVzdHJveSwgT3B0aW9uYWwsIFNraXBTZWxmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgSWZPcGVuU2VydmljZSB9IGZyb20gJy4uLy4uL3V0aWxzL2NvbmRpdGlvbmFsL2lmLW9wZW4uc2VydmljZSc7XG5pbXBvcnQgeyBQT1BPVkVSX0hPU1RfQU5DSE9SIH0gZnJvbSAnLi4vY29tbW9uL3BvcG92ZXItaG9zdC1hbmNob3IudG9rZW4nO1xuXG5pbXBvcnQgeyBST09UX0RST1BET1dOX1BST1ZJREVSLCBSb290RHJvcGRvd25TZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvZHJvcGRvd24uc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci1kcm9wZG93bicsXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmRyb3Bkb3duXSc6ICd0cnVlJyxcbiAgICAvLyB0aGUgb3BlbiBjbGFzcywgYWxzbyB1c2VkIGluIHN0YXRpYyB2ZXJzaW9uLCBpcyBhbHdheXMgcHJlc2VudCBpbiB0aGUgQW5ndWxhciB2ZXJzaW9uXG4gICAgLy8gQW5ndWxhciB0YWtlcyBjYXJlIG9mIGhpZGluZyBpdCwgcmVnYXJkbGVzcyBvZiB3aGV0aGVyIHlvdSB1c2UgKmNscklmT3BlbiBvciBub3RcbiAgICAnW2NsYXNzLm9wZW5dJzogJ3RydWUnLFxuICB9LFxuICBwcm92aWRlcnM6IFtJZk9wZW5TZXJ2aWNlLCBST09UX0RST1BET1dOX1BST1ZJREVSLCB7IHByb3ZpZGU6IFBPUE9WRVJfSE9TVF9BTkNIT1IsIHVzZUV4aXN0aW5nOiBFbGVtZW50UmVmIH1dLFxufSlcbmV4cG9ydCBjbGFzcyBDbHJEcm9wZG93biBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBAU2tpcFNlbGYoKVxuICAgIEBPcHRpb25hbCgpXG4gICAgcHVibGljIHBhcmVudDogQ2xyRHJvcGRvd24sXG4gICAgcHVibGljIGlmT3BlblNlcnZpY2U6IElmT3BlblNlcnZpY2UsXG4gICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIGRyb3Bkb3duU2VydmljZTogUm9vdERyb3Bkb3duU2VydmljZVxuICApIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChkcm9wZG93blNlcnZpY2UuY2hhbmdlcy5zdWJzY3JpYmUodmFsdWUgPT4gKHRoaXMuaWZPcGVuU2VydmljZS5vcGVuID0gdmFsdWUpKSk7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goaWZPcGVuU2VydmljZS5vcGVuQ2hhbmdlLnN1YnNjcmliZSh2YWx1ZSA9PiB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKSkpO1xuICB9XG5cbiAgQElucHV0KCdjbHJDbG9zZU1lbnVPbkl0ZW1DbGljaycpIGlzTWVudUNsb3NhYmxlOiBib29sZWFuID0gdHJ1ZTtcblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaChzdWIgPT4gc3ViLnVuc3Vic2NyaWJlKCkpO1xuICB9XG59XG4iXX0=