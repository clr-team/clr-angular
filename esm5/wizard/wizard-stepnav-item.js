/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, Input } from '@angular/core';
import { PageCollectionService } from './providers/page-collection.service';
import { WizardNavigationService } from './providers/wizard-navigation.service';
import { ClrWizardPage } from './wizard-page';
var ClrWizardStepnavItem = /** @class */ (function () {
    function ClrWizardStepnavItem(navService, pageCollection) {
        this.navService = navService;
        this.pageCollection = pageCollection;
    }
    /**
     * @private
     * @return {?}
     */
    ClrWizardStepnavItem.prototype.pageGuard = /**
     * @private
     * @return {?}
     */
    function () {
        if (!this.page) {
            throw new Error('Wizard stepnav item is not associated with a wizard page.');
        }
    };
    Object.defineProperty(ClrWizardStepnavItem.prototype, "id", {
        get: /**
         * @return {?}
         */
        function () {
            this.pageGuard();
            return this.pageCollection.getStepItemIdForPage(this.page);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardStepnavItem.prototype, "isDisabled", {
        get: /**
         * @return {?}
         */
        function () {
            this.pageGuard();
            return this.page.disabled || this.navService.wizardStopNavigation || this.navService.wizardDisableStepnav;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardStepnavItem.prototype, "isCurrent", {
        get: /**
         * @return {?}
         */
        function () {
            this.pageGuard();
            return this.page.current;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardStepnavItem.prototype, "isComplete", {
        get: /**
         * @return {?}
         */
        function () {
            this.pageGuard();
            return this.page.completed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardStepnavItem.prototype, "canNavigate", {
        get: /**
         * @return {?}
         */
        function () {
            this.pageGuard();
            return this.pageCollection.previousPageIsCompleted(this.page);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ClrWizardStepnavItem.prototype.click = /**
     * @return {?}
     */
    function () {
        this.pageGuard();
        // if we click on our own stepnav or a disabled stepnav, we don't want to do anything
        if (this.isDisabled || this.isCurrent) {
            return;
        }
        this.navService.goTo(this.page);
    };
    ClrWizardStepnavItem.decorators = [
        { type: Component, args: [{
                    selector: '[clr-wizard-stepnav-item]',
                    template: "\n        <button type=\"button\" class=\"btn btn-link clr-wizard-stepnav-link\" (click)=\"click()\">\n            <ng-template [ngTemplateOutlet]=\"page.navTitle\"></ng-template>\n        </button>\n    ",
                    host: {
                        '[id]': 'id',
                        '[attr.aria-selected]': 'isCurrent',
                        '[attr.aria-controls]': 'id',
                        role: 'tab',
                        '[class.clr-nav-link]': 'true',
                        '[class.nav-item]': 'true',
                        '[class.active]': 'isCurrent',
                        '[class.disabled]': 'isDisabled',
                        '[class.no-click]': '!canNavigate',
                        '[class.complete]': 'isComplete',
                    }
                }] }
    ];
    /** @nocollapse */
    ClrWizardStepnavItem.ctorParameters = function () { return [
        { type: WizardNavigationService },
        { type: PageCollectionService }
    ]; };
    ClrWizardStepnavItem.propDecorators = {
        page: [{ type: Input, args: ['page',] }]
    };
    return ClrWizardStepnavItem;
}());
export { ClrWizardStepnavItem };
if (false) {
    /** @type {?} */
    ClrWizardStepnavItem.prototype.page;
    /** @type {?} */
    ClrWizardStepnavItem.prototype.navService;
    /** @type {?} */
    ClrWizardStepnavItem.prototype.pageCollection;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l6YXJkLXN0ZXBuYXYtaXRlbS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbIndpemFyZC93aXphcmQtc3RlcG5hdi1pdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQU1BLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWpELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzVFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFOUM7SUF1QkUsOEJBQW1CLFVBQW1DLEVBQVMsY0FBcUM7UUFBakYsZUFBVSxHQUFWLFVBQVUsQ0FBeUI7UUFBUyxtQkFBYyxHQUFkLGNBQWMsQ0FBdUI7SUFBRyxDQUFDOzs7OztJQUVoRyx3Q0FBUzs7OztJQUFqQjtRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ2QsTUFBTSxJQUFJLEtBQUssQ0FBQywyREFBMkQsQ0FBQyxDQUFDO1NBQzlFO0lBQ0gsQ0FBQztJQUVELHNCQUFXLG9DQUFFOzs7O1FBQWI7WUFDRSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDakIsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3RCxDQUFDOzs7T0FBQTtJQUVELHNCQUFXLDRDQUFVOzs7O1FBQXJCO1lBQ0UsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ2pCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLG9CQUFvQixDQUFDO1FBQzVHLENBQUM7OztPQUFBO0lBRUQsc0JBQVcsMkNBQVM7Ozs7UUFBcEI7WUFDRSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDakIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUMzQixDQUFDOzs7T0FBQTtJQUVELHNCQUFXLDRDQUFVOzs7O1FBQXJCO1lBQ0UsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ2pCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDN0IsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyw2Q0FBVzs7OztRQUF0QjtZQUNFLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNqQixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hFLENBQUM7OztPQUFBOzs7O0lBRUQsb0NBQUs7OztJQUFMO1FBQ0UsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRWpCLHFGQUFxRjtRQUNyRixJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNyQyxPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEMsQ0FBQzs7Z0JBakVGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsMkJBQTJCO29CQUNyQyxRQUFRLEVBQUUsOE1BSVA7b0JBQ0gsSUFBSSxFQUFFO3dCQUNKLE1BQU0sRUFBRSxJQUFJO3dCQUNaLHNCQUFzQixFQUFFLFdBQVc7d0JBQ25DLHNCQUFzQixFQUFFLElBQUk7d0JBQzVCLElBQUksRUFBRSxLQUFLO3dCQUNYLHNCQUFzQixFQUFFLE1BQU07d0JBQzlCLGtCQUFrQixFQUFFLE1BQU07d0JBQzFCLGdCQUFnQixFQUFFLFdBQVc7d0JBQzdCLGtCQUFrQixFQUFFLFlBQVk7d0JBQ2hDLGtCQUFrQixFQUFFLGNBQWM7d0JBQ2xDLGtCQUFrQixFQUFFLFlBQVk7cUJBQ2pDO2lCQUNGOzs7O2dCQXRCUSx1QkFBdUI7Z0JBRHZCLHFCQUFxQjs7O3VCQXlCM0IsS0FBSyxTQUFDLE1BQU07O0lBNkNmLDJCQUFDO0NBQUEsQUFsRUQsSUFrRUM7U0E5Q1ksb0JBQW9COzs7SUFDL0Isb0NBQTBDOztJQUU5QiwwQ0FBMEM7O0lBQUUsOENBQTRDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFBhZ2VDb2xsZWN0aW9uU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL3BhZ2UtY29sbGVjdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvd2l6YXJkLW5hdmlnYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBDbHJXaXphcmRQYWdlIH0gZnJvbSAnLi93aXphcmQtcGFnZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ1tjbHItd2l6YXJkLXN0ZXBuYXYtaXRlbV0nLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tbGluayBjbHItd2l6YXJkLXN0ZXBuYXYtbGlua1wiIChjbGljayk9XCJjbGljaygpXCI+XG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwicGFnZS5uYXZUaXRsZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgIGAsXG4gIGhvc3Q6IHtcbiAgICAnW2lkXSc6ICdpZCcsXG4gICAgJ1thdHRyLmFyaWEtc2VsZWN0ZWRdJzogJ2lzQ3VycmVudCcsXG4gICAgJ1thdHRyLmFyaWEtY29udHJvbHNdJzogJ2lkJyxcbiAgICByb2xlOiAndGFiJyxcbiAgICAnW2NsYXNzLmNsci1uYXYtbGlua10nOiAndHJ1ZScsXG4gICAgJ1tjbGFzcy5uYXYtaXRlbV0nOiAndHJ1ZScsXG4gICAgJ1tjbGFzcy5hY3RpdmVdJzogJ2lzQ3VycmVudCcsXG4gICAgJ1tjbGFzcy5kaXNhYmxlZF0nOiAnaXNEaXNhYmxlZCcsXG4gICAgJ1tjbGFzcy5uby1jbGlja10nOiAnIWNhbk5hdmlnYXRlJyxcbiAgICAnW2NsYXNzLmNvbXBsZXRlXSc6ICdpc0NvbXBsZXRlJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyV2l6YXJkU3RlcG5hdkl0ZW0ge1xuICBASW5wdXQoJ3BhZ2UnKSBwdWJsaWMgcGFnZTogQ2xyV2l6YXJkUGFnZTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbmF2U2VydmljZTogV2l6YXJkTmF2aWdhdGlvblNlcnZpY2UsIHB1YmxpYyBwYWdlQ29sbGVjdGlvbjogUGFnZUNvbGxlY3Rpb25TZXJ2aWNlKSB7fVxuXG4gIHByaXZhdGUgcGFnZUd1YXJkKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5wYWdlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dpemFyZCBzdGVwbmF2IGl0ZW0gaXMgbm90IGFzc29jaWF0ZWQgd2l0aCBhIHdpemFyZCBwYWdlLicpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXQgaWQoKTogc3RyaW5nIHtcbiAgICB0aGlzLnBhZ2VHdWFyZCgpO1xuICAgIHJldHVybiB0aGlzLnBhZ2VDb2xsZWN0aW9uLmdldFN0ZXBJdGVtSWRGb3JQYWdlKHRoaXMucGFnZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGlzRGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgdGhpcy5wYWdlR3VhcmQoKTtcbiAgICByZXR1cm4gdGhpcy5wYWdlLmRpc2FibGVkIHx8IHRoaXMubmF2U2VydmljZS53aXphcmRTdG9wTmF2aWdhdGlvbiB8fCB0aGlzLm5hdlNlcnZpY2Uud2l6YXJkRGlzYWJsZVN0ZXBuYXY7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGlzQ3VycmVudCgpOiBib29sZWFuIHtcbiAgICB0aGlzLnBhZ2VHdWFyZCgpO1xuICAgIHJldHVybiB0aGlzLnBhZ2UuY3VycmVudDtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgaXNDb21wbGV0ZSgpOiBib29sZWFuIHtcbiAgICB0aGlzLnBhZ2VHdWFyZCgpO1xuICAgIHJldHVybiB0aGlzLnBhZ2UuY29tcGxldGVkO1xuICB9XG5cbiAgcHVibGljIGdldCBjYW5OYXZpZ2F0ZSgpOiBib29sZWFuIHtcbiAgICB0aGlzLnBhZ2VHdWFyZCgpO1xuICAgIHJldHVybiB0aGlzLnBhZ2VDb2xsZWN0aW9uLnByZXZpb3VzUGFnZUlzQ29tcGxldGVkKHRoaXMucGFnZSk7XG4gIH1cblxuICBjbGljaygpOiB2b2lkIHtcbiAgICB0aGlzLnBhZ2VHdWFyZCgpO1xuXG4gICAgLy8gaWYgd2UgY2xpY2sgb24gb3VyIG93biBzdGVwbmF2IG9yIGEgZGlzYWJsZWQgc3RlcG5hdiwgd2UgZG9uJ3Qgd2FudCB0byBkbyBhbnl0aGluZ1xuICAgIGlmICh0aGlzLmlzRGlzYWJsZWQgfHwgdGhpcy5pc0N1cnJlbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLm5hdlNlcnZpY2UuZ29Ubyh0aGlzLnBhZ2UpO1xuICB9XG59XG4iXX0=