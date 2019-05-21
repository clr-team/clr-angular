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
import { DROPDOWN_FOCUS_HANDLER_PROVIDER } from './providers/dropdown-focus-handler.service';
import { FOCUS_SERVICE_PROVIDER } from '../../utils/focus/focus.service';
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
                providers: [
                    IfOpenService,
                    ROOT_DROPDOWN_PROVIDER,
                    { provide: POPOVER_HOST_ANCHOR, useExisting: ElementRef },
                    FOCUS_SERVICE_PROVIDER,
                    DROPDOWN_FOCUS_HANDLER_PROVIDER,
                ]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJwb3BvdmVyL2Ryb3Bkb3duL2Ryb3Bkb3duLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBYSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRy9HLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUMxRSxPQUFPLEVBQUUsK0JBQStCLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUM3RixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUV6RSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQW1CM0YsTUFBTSxPQUFPLFdBQVc7Ozs7Ozs7SUFHdEIsWUFHUyxNQUFtQixFQUNuQixhQUE0QixFQUMzQixHQUFzQixFQUM5QixlQUFvQztRQUg3QixXQUFNLEdBQU4sTUFBTSxDQUFhO1FBQ25CLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzNCLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBUHhCLGtCQUFhLEdBQW1CLEVBQUUsQ0FBQztRQWNULG1CQUFjLEdBQVksSUFBSSxDQUFDO1FBSi9ELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsU0FBUzs7OztRQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsRUFBQyxDQUFDLENBQUM7UUFDdkcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxTQUFTOzs7O1FBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxFQUFDLENBQUMsQ0FBQztJQUNoRyxDQUFDOzs7O0lBSUQsV0FBVztRQUNULElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTzs7OztRQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxFQUFDLENBQUM7SUFDdkQsQ0FBQzs7O1lBcENGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsY0FBYztnQkFDeEIsUUFBUSxFQUFFLDJCQUEyQjtnQkFDckMsSUFBSSxFQUFFO29CQUNKLGtCQUFrQixFQUFFLE1BQU07OztvQkFHMUIsY0FBYyxFQUFFLE1BQU07aUJBQ3ZCO2dCQUNELFNBQVMsRUFBRTtvQkFDVCxhQUFhO29CQUNiLHNCQUFzQjtvQkFDdEIsRUFBRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRTtvQkFDekQsc0JBQXNCO29CQUN0QiwrQkFBK0I7aUJBQ2hDO2FBQ0Y7Ozs7WUFPa0IsV0FBVyx1QkFGekIsUUFBUSxZQUNSLFFBQVE7WUE3QkosYUFBYTtZQUhiLGlCQUFpQjtZQVFPLG1CQUFtQjs7OzZCQWtDakQsS0FBSyxTQUFDLHlCQUF5Qjs7Ozs7OztJQWRoQyxvQ0FBMkM7O0lBYzNDLHFDQUFpRTs7SUFYL0QsNkJBRTBCOztJQUMxQixvQ0FBbUM7Ozs7O0lBQ25DLDBCQUE4QiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIElucHV0LCBPbkRlc3Ryb3ksIE9wdGlvbmFsLCBTa2lwU2VsZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IElmT3BlblNlcnZpY2UgfSBmcm9tICcuLi8uLi91dGlscy9jb25kaXRpb25hbC9pZi1vcGVuLnNlcnZpY2UnO1xuaW1wb3J0IHsgUE9QT1ZFUl9IT1NUX0FOQ0hPUiB9IGZyb20gJy4uL2NvbW1vbi9wb3BvdmVyLWhvc3QtYW5jaG9yLnRva2VuJztcbmltcG9ydCB7IERST1BET1dOX0ZPQ1VTX0hBTkRMRVJfUFJPVklERVIgfSBmcm9tICcuL3Byb3ZpZGVycy9kcm9wZG93bi1mb2N1cy1oYW5kbGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgRk9DVVNfU0VSVklDRV9QUk9WSURFUiB9IGZyb20gJy4uLy4uL3V0aWxzL2ZvY3VzL2ZvY3VzLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBST09UX0RST1BET1dOX1BST1ZJREVSLCBSb290RHJvcGRvd25TZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvZHJvcGRvd24uc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci1kcm9wZG93bicsXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmRyb3Bkb3duXSc6ICd0cnVlJyxcbiAgICAvLyB0aGUgb3BlbiBjbGFzcywgYWxzbyB1c2VkIGluIHN0YXRpYyB2ZXJzaW9uLCBpcyBhbHdheXMgcHJlc2VudCBpbiB0aGUgQW5ndWxhciB2ZXJzaW9uXG4gICAgLy8gQW5ndWxhciB0YWtlcyBjYXJlIG9mIGhpZGluZyBpdCwgcmVnYXJkbGVzcyBvZiB3aGV0aGVyIHlvdSB1c2UgKmNscklmT3BlbiBvciBub3RcbiAgICAnW2NsYXNzLm9wZW5dJzogJ3RydWUnLFxuICB9LFxuICBwcm92aWRlcnM6IFtcbiAgICBJZk9wZW5TZXJ2aWNlLFxuICAgIFJPT1RfRFJPUERPV05fUFJPVklERVIsXG4gICAgeyBwcm92aWRlOiBQT1BPVkVSX0hPU1RfQU5DSE9SLCB1c2VFeGlzdGluZzogRWxlbWVudFJlZiB9LFxuICAgIEZPQ1VTX1NFUlZJQ0VfUFJPVklERVIsXG4gICAgRFJPUERPV05fRk9DVVNfSEFORExFUl9QUk9WSURFUixcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyRHJvcGRvd24gaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBwcml2YXRlIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQFNraXBTZWxmKClcbiAgICBAT3B0aW9uYWwoKVxuICAgIHB1YmxpYyBwYXJlbnQ6IENsckRyb3Bkb3duLFxuICAgIHB1YmxpYyBpZk9wZW5TZXJ2aWNlOiBJZk9wZW5TZXJ2aWNlLFxuICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBkcm9wZG93blNlcnZpY2U6IFJvb3REcm9wZG93blNlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goZHJvcGRvd25TZXJ2aWNlLmNoYW5nZXMuc3Vic2NyaWJlKHZhbHVlID0+ICh0aGlzLmlmT3BlblNlcnZpY2Uub3BlbiA9IHZhbHVlKSkpO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKGlmT3BlblNlcnZpY2Uub3BlbkNoYW5nZS5zdWJzY3JpYmUodmFsdWUgPT4gdGhpcy5jZHIubWFya0ZvckNoZWNrKCkpKTtcbiAgfVxuXG4gIEBJbnB1dCgnY2xyQ2xvc2VNZW51T25JdGVtQ2xpY2snKSBpc01lbnVDbG9zYWJsZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmZvckVhY2goc3ViID0+IHN1Yi51bnN1YnNjcmliZSgpKTtcbiAgfVxufVxuIl19