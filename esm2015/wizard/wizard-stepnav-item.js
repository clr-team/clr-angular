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
export class ClrWizardStepnavItem {
    /**
     * @param {?} navService
     * @param {?} pageCollection
     */
    constructor(navService, pageCollection) {
        this.navService = navService;
        this.pageCollection = pageCollection;
    }
    /**
     * @private
     * @return {?}
     */
    pageGuard() {
        if (!this.page) {
            throw new Error('Wizard stepnav item is not associated with a wizard page.');
        }
    }
    /**
     * @return {?}
     */
    get id() {
        this.pageGuard();
        return this.pageCollection.getStepItemIdForPage(this.page);
    }
    /**
     * @return {?}
     */
    get isDisabled() {
        this.pageGuard();
        return this.page.disabled || this.navService.wizardStopNavigation || this.navService.wizardDisableStepnav;
    }
    /**
     * @return {?}
     */
    get isCurrent() {
        this.pageGuard();
        return this.page.current;
    }
    /**
     * @return {?}
     */
    get isComplete() {
        this.pageGuard();
        return this.page.completed;
    }
    /**
     * @return {?}
     */
    get canNavigate() {
        this.pageGuard();
        return this.pageCollection.previousPageIsCompleted(this.page);
    }
    /**
     * @return {?}
     */
    click() {
        this.pageGuard();
        // if we click on our own stepnav or a disabled stepnav, we don't want to do anything
        if (this.isDisabled || this.isCurrent) {
            return;
        }
        this.navService.goTo(this.page);
    }
}
ClrWizardStepnavItem.decorators = [
    { type: Component, args: [{
                selector: '[clr-wizard-stepnav-item]',
                template: `
        <button type="button" class="btn btn-link clr-wizard-stepnav-link" (click)="click()">
            <ng-template [ngTemplateOutlet]="page.navTitle"></ng-template>
        </button>
    `,
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
ClrWizardStepnavItem.ctorParameters = () => [
    { type: WizardNavigationService },
    { type: PageCollectionService }
];
ClrWizardStepnavItem.propDecorators = {
    page: [{ type: Input, args: ['page',] }]
};
if (false) {
    /** @type {?} */
    ClrWizardStepnavItem.prototype.page;
    /** @type {?} */
    ClrWizardStepnavItem.prototype.navService;
    /** @type {?} */
    ClrWizardStepnavItem.prototype.pageCollection;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l6YXJkLXN0ZXBuYXYtaXRlbS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbIndpemFyZC93aXphcmQtc3RlcG5hdi1pdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQU1BLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWpELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzVFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFzQjlDLE1BQU0sT0FBTyxvQkFBb0I7Ozs7O0lBRy9CLFlBQW1CLFVBQW1DLEVBQVMsY0FBcUM7UUFBakYsZUFBVSxHQUFWLFVBQVUsQ0FBeUI7UUFBUyxtQkFBYyxHQUFkLGNBQWMsQ0FBdUI7SUFBRyxDQUFDOzs7OztJQUVoRyxTQUFTO1FBQ2YsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDZCxNQUFNLElBQUksS0FBSyxDQUFDLDJEQUEyRCxDQUFDLENBQUM7U0FDOUU7SUFDSCxDQUFDOzs7O0lBRUQsSUFBVyxFQUFFO1FBQ1gsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0QsQ0FBQzs7OztJQUVELElBQVcsVUFBVTtRQUNuQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLG9CQUFvQixJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsb0JBQW9CLENBQUM7SUFDNUcsQ0FBQzs7OztJQUVELElBQVcsU0FBUztRQUNsQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUMzQixDQUFDOzs7O0lBRUQsSUFBVyxVQUFVO1FBQ25CLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzdCLENBQUM7Ozs7SUFFRCxJQUFXLFdBQVc7UUFDcEIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEUsQ0FBQzs7OztJQUVELEtBQUs7UUFDSCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFakIscUZBQXFGO1FBQ3JGLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ3JDLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQyxDQUFDOzs7WUFqRUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSwyQkFBMkI7Z0JBQ3JDLFFBQVEsRUFBRTs7OztLQUlQO2dCQUNILElBQUksRUFBRTtvQkFDSixNQUFNLEVBQUUsSUFBSTtvQkFDWixzQkFBc0IsRUFBRSxXQUFXO29CQUNuQyxzQkFBc0IsRUFBRSxJQUFJO29CQUM1QixJQUFJLEVBQUUsS0FBSztvQkFDWCxzQkFBc0IsRUFBRSxNQUFNO29CQUM5QixrQkFBa0IsRUFBRSxNQUFNO29CQUMxQixnQkFBZ0IsRUFBRSxXQUFXO29CQUM3QixrQkFBa0IsRUFBRSxZQUFZO29CQUNoQyxrQkFBa0IsRUFBRSxjQUFjO29CQUNsQyxrQkFBa0IsRUFBRSxZQUFZO2lCQUNqQzthQUNGOzs7O1lBdEJRLHVCQUF1QjtZQUR2QixxQkFBcUI7OzttQkF5QjNCLEtBQUssU0FBQyxNQUFNOzs7O0lBQWIsb0NBQTBDOztJQUU5QiwwQ0FBMEM7O0lBQUUsOENBQTRDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFBhZ2VDb2xsZWN0aW9uU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL3BhZ2UtY29sbGVjdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvd2l6YXJkLW5hdmlnYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBDbHJXaXphcmRQYWdlIH0gZnJvbSAnLi93aXphcmQtcGFnZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ1tjbHItd2l6YXJkLXN0ZXBuYXYtaXRlbV0nLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tbGluayBjbHItd2l6YXJkLXN0ZXBuYXYtbGlua1wiIChjbGljayk9XCJjbGljaygpXCI+XG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwicGFnZS5uYXZUaXRsZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgIGAsXG4gIGhvc3Q6IHtcbiAgICAnW2lkXSc6ICdpZCcsXG4gICAgJ1thdHRyLmFyaWEtc2VsZWN0ZWRdJzogJ2lzQ3VycmVudCcsXG4gICAgJ1thdHRyLmFyaWEtY29udHJvbHNdJzogJ2lkJyxcbiAgICByb2xlOiAndGFiJyxcbiAgICAnW2NsYXNzLmNsci1uYXYtbGlua10nOiAndHJ1ZScsXG4gICAgJ1tjbGFzcy5uYXYtaXRlbV0nOiAndHJ1ZScsXG4gICAgJ1tjbGFzcy5hY3RpdmVdJzogJ2lzQ3VycmVudCcsXG4gICAgJ1tjbGFzcy5kaXNhYmxlZF0nOiAnaXNEaXNhYmxlZCcsXG4gICAgJ1tjbGFzcy5uby1jbGlja10nOiAnIWNhbk5hdmlnYXRlJyxcbiAgICAnW2NsYXNzLmNvbXBsZXRlXSc6ICdpc0NvbXBsZXRlJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyV2l6YXJkU3RlcG5hdkl0ZW0ge1xuICBASW5wdXQoJ3BhZ2UnKSBwdWJsaWMgcGFnZTogQ2xyV2l6YXJkUGFnZTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbmF2U2VydmljZTogV2l6YXJkTmF2aWdhdGlvblNlcnZpY2UsIHB1YmxpYyBwYWdlQ29sbGVjdGlvbjogUGFnZUNvbGxlY3Rpb25TZXJ2aWNlKSB7fVxuXG4gIHByaXZhdGUgcGFnZUd1YXJkKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5wYWdlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dpemFyZCBzdGVwbmF2IGl0ZW0gaXMgbm90IGFzc29jaWF0ZWQgd2l0aCBhIHdpemFyZCBwYWdlLicpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXQgaWQoKTogc3RyaW5nIHtcbiAgICB0aGlzLnBhZ2VHdWFyZCgpO1xuICAgIHJldHVybiB0aGlzLnBhZ2VDb2xsZWN0aW9uLmdldFN0ZXBJdGVtSWRGb3JQYWdlKHRoaXMucGFnZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGlzRGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgdGhpcy5wYWdlR3VhcmQoKTtcbiAgICByZXR1cm4gdGhpcy5wYWdlLmRpc2FibGVkIHx8IHRoaXMubmF2U2VydmljZS53aXphcmRTdG9wTmF2aWdhdGlvbiB8fCB0aGlzLm5hdlNlcnZpY2Uud2l6YXJkRGlzYWJsZVN0ZXBuYXY7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGlzQ3VycmVudCgpOiBib29sZWFuIHtcbiAgICB0aGlzLnBhZ2VHdWFyZCgpO1xuICAgIHJldHVybiB0aGlzLnBhZ2UuY3VycmVudDtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgaXNDb21wbGV0ZSgpOiBib29sZWFuIHtcbiAgICB0aGlzLnBhZ2VHdWFyZCgpO1xuICAgIHJldHVybiB0aGlzLnBhZ2UuY29tcGxldGVkO1xuICB9XG5cbiAgcHVibGljIGdldCBjYW5OYXZpZ2F0ZSgpOiBib29sZWFuIHtcbiAgICB0aGlzLnBhZ2VHdWFyZCgpO1xuICAgIHJldHVybiB0aGlzLnBhZ2VDb2xsZWN0aW9uLnByZXZpb3VzUGFnZUlzQ29tcGxldGVkKHRoaXMucGFnZSk7XG4gIH1cblxuICBjbGljaygpOiB2b2lkIHtcbiAgICB0aGlzLnBhZ2VHdWFyZCgpO1xuXG4gICAgLy8gaWYgd2UgY2xpY2sgb24gb3VyIG93biBzdGVwbmF2IG9yIGEgZGlzYWJsZWQgc3RlcG5hdiwgd2UgZG9uJ3Qgd2FudCB0byBkbyBhbnl0aGluZ1xuICAgIGlmICh0aGlzLmlzRGlzYWJsZWQgfHwgdGhpcy5pc0N1cnJlbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLm5hdlNlcnZpY2UuZ29Ubyh0aGlzLnBhZ2UpO1xuICB9XG59XG4iXX0=