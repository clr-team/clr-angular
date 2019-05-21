/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive, ElementRef, HostListener } from '@angular/core';
import { IfOpenService } from '../../utils/conditional/if-open.service';
import { ClrDropdown } from './dropdown';
import { DropdownFocusHandler } from './providers/dropdown-focus-handler.service';
export class ClrDropdownTrigger {
    /**
     * @param {?} dropdown
     * @param {?} ifOpenService
     * @param {?} el
     * @param {?} focusHandler
     */
    constructor(dropdown, ifOpenService, el, focusHandler) {
        this.ifOpenService = ifOpenService;
        this.isRootLevelToggle = true;
        // if the containing dropdown has a parent, then this is not the root level one
        if (dropdown.parent) {
            this.isRootLevelToggle = false;
        }
        focusHandler.trigger = el.nativeElement;
    }
    /**
     * @return {?}
     */
    get active() {
        return this.ifOpenService.open;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onDropdownTriggerClick(event) {
        this.ifOpenService.toggleWithEvent(event);
    }
}
ClrDropdownTrigger.decorators = [
    { type: Directive, args: [{
                // We support both selectors for legacy reasons
                selector: '[clrDropdownTrigger],[clrDropdownToggle]',
                host: {
                    '[class.dropdown-toggle]': 'isRootLevelToggle',
                    '[class.dropdown-item]': '!isRootLevelToggle',
                    '[class.expandable]': '!isRootLevelToggle',
                    '[class.active]': 'active',
                    '[attr.aria-haspopup]': '"menu"',
                    '[attr.aria-expanded]': 'ifOpenService.open',
                },
            },] }
];
/** @nocollapse */
ClrDropdownTrigger.ctorParameters = () => [
    { type: ClrDropdown },
    { type: IfOpenService },
    { type: ElementRef },
    { type: DropdownFocusHandler }
];
ClrDropdownTrigger.propDecorators = {
    onDropdownTriggerClick: [{ type: HostListener, args: ['click', ['$event'],] }]
};
if (false) {
    /** @type {?} */
    ClrDropdownTrigger.prototype.isRootLevelToggle;
    /**
     * @type {?}
     * @private
     */
    ClrDropdownTrigger.prototype.ifOpenService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24tdHJpZ2dlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbInBvcG92ZXIvZHJvcGRvd24vZHJvcGRvd24tdHJpZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFLQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFcEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBRXhFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDekMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFjbEYsTUFBTSxPQUFPLGtCQUFrQjs7Ozs7OztJQUc3QixZQUNFLFFBQXFCLEVBQ2IsYUFBNEIsRUFDcEMsRUFBMkIsRUFDM0IsWUFBa0M7UUFGMUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFKL0Isc0JBQWlCLEdBQVksSUFBSSxDQUFDO1FBUXZDLCtFQUErRTtRQUMvRSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEVBQUU7WUFDbkIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztTQUNoQztRQUNELFlBQVksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQztJQUMxQyxDQUFDOzs7O0lBRUQsSUFBSSxNQUFNO1FBQ1IsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQztJQUNqQyxDQUFDOzs7OztJQUdELHNCQUFzQixDQUFDLEtBQVU7UUFDL0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUMsQ0FBQzs7O1lBbkNGLFNBQVMsU0FBQzs7Z0JBRVQsUUFBUSxFQUFFLDBDQUEwQztnQkFDcEQsSUFBSSxFQUFFO29CQUNKLHlCQUF5QixFQUFFLG1CQUFtQjtvQkFDOUMsdUJBQXVCLEVBQUUsb0JBQW9CO29CQUM3QyxvQkFBb0IsRUFBRSxvQkFBb0I7b0JBQzFDLGdCQUFnQixFQUFFLFFBQVE7b0JBQzFCLHNCQUFzQixFQUFFLFFBQVE7b0JBQ2hDLHNCQUFzQixFQUFFLG9CQUFvQjtpQkFDN0M7YUFDRjs7OztZQWRRLFdBQVc7WUFGWCxhQUFhO1lBRkYsVUFBVTtZQUtyQixvQkFBb0I7OztxQ0FrQzFCLFlBQVksU0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUM7Ozs7SUFuQmpDLCtDQUF5Qzs7Ozs7SUFJdkMsMkNBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgSWZPcGVuU2VydmljZSB9IGZyb20gJy4uLy4uL3V0aWxzL2NvbmRpdGlvbmFsL2lmLW9wZW4uc2VydmljZSc7XG5cbmltcG9ydCB7IENsckRyb3Bkb3duIH0gZnJvbSAnLi9kcm9wZG93bic7XG5pbXBvcnQgeyBEcm9wZG93bkZvY3VzSGFuZGxlciB9IGZyb20gJy4vcHJvdmlkZXJzL2Ryb3Bkb3duLWZvY3VzLWhhbmRsZXIuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICAvLyBXZSBzdXBwb3J0IGJvdGggc2VsZWN0b3JzIGZvciBsZWdhY3kgcmVhc29uc1xuICBzZWxlY3RvcjogJ1tjbHJEcm9wZG93blRyaWdnZXJdLFtjbHJEcm9wZG93blRvZ2dsZV0nLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5kcm9wZG93bi10b2dnbGVdJzogJ2lzUm9vdExldmVsVG9nZ2xlJyxcbiAgICAnW2NsYXNzLmRyb3Bkb3duLWl0ZW1dJzogJyFpc1Jvb3RMZXZlbFRvZ2dsZScsXG4gICAgJ1tjbGFzcy5leHBhbmRhYmxlXSc6ICchaXNSb290TGV2ZWxUb2dnbGUnLFxuICAgICdbY2xhc3MuYWN0aXZlXSc6ICdhY3RpdmUnLFxuICAgICdbYXR0ci5hcmlhLWhhc3BvcHVwXSc6ICdcIm1lbnVcIicsXG4gICAgJ1thdHRyLmFyaWEtZXhwYW5kZWRdJzogJ2lmT3BlblNlcnZpY2Uub3BlbicsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIENsckRyb3Bkb3duVHJpZ2dlciB7XG4gIHB1YmxpYyBpc1Jvb3RMZXZlbFRvZ2dsZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgZHJvcGRvd246IENsckRyb3Bkb3duLFxuICAgIHByaXZhdGUgaWZPcGVuU2VydmljZTogSWZPcGVuU2VydmljZSxcbiAgICBlbDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgZm9jdXNIYW5kbGVyOiBEcm9wZG93bkZvY3VzSGFuZGxlclxuICApIHtcbiAgICAvLyBpZiB0aGUgY29udGFpbmluZyBkcm9wZG93biBoYXMgYSBwYXJlbnQsIHRoZW4gdGhpcyBpcyBub3QgdGhlIHJvb3QgbGV2ZWwgb25lXG4gICAgaWYgKGRyb3Bkb3duLnBhcmVudCkge1xuICAgICAgdGhpcy5pc1Jvb3RMZXZlbFRvZ2dsZSA9IGZhbHNlO1xuICAgIH1cbiAgICBmb2N1c0hhbmRsZXIudHJpZ2dlciA9IGVsLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICBnZXQgYWN0aXZlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmlmT3BlblNlcnZpY2Uub3BlbjtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcbiAgb25Ecm9wZG93blRyaWdnZXJDbGljayhldmVudDogYW55KTogdm9pZCB7XG4gICAgdGhpcy5pZk9wZW5TZXJ2aWNlLnRvZ2dsZVdpdGhFdmVudChldmVudCk7XG4gIH1cbn1cbiJdfQ==