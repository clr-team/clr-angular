/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ContentChildren, QueryList, ViewContainerRef } from '@angular/core';
import { ClrSignpost } from '../../popover/signpost/signpost';
import { HostWrapper } from '../../utils/host-wrapping/host-wrapper';
import { WrappedCell } from './wrapped-cell';
export class ClrDatagridCell {
    /**
     * @param {?} vcr
     */
    constructor(vcr) {
        this.vcr = vcr;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.wrappedInjector = new HostWrapper(WrappedCell, this.vcr);
    }
    /**
     * @return {?}
     */
    get _view() {
        return this.wrappedInjector.get(WrappedCell, this.vcr).cellView;
    }
}
ClrDatagridCell.decorators = [
    { type: Component, args: [{
                selector: 'clr-dg-cell',
                template: `
        <ng-content></ng-content>
    `,
                host: {
                    '[class.datagrid-cell]': 'true',
                    '[class.datagrid-signpost-trigger]': 'signpost.length > 0',
                    role: 'cell',
                }
            }] }
];
/** @nocollapse */
ClrDatagridCell.ctorParameters = () => [
    { type: ViewContainerRef }
];
ClrDatagridCell.propDecorators = {
    signpost: [{ type: ContentChildren, args: [ClrSignpost,] }]
};
if (false) {
    /**
     * ******
     * \@property signpost
     *
     * \@description
     * \@ContentChild is used to detect the presence of a Signpost in the projected content.
     * On the host, we set the .datagrid-signpost-trigger class on the cell when signpost.length is greater than 0.
     *
     * @type {?}
     */
    ClrDatagridCell.prototype.signpost;
    /**
     * @type {?}
     * @private
     */
    ClrDatagridCell.prototype.wrappedInjector;
    /**
     * @type {?}
     * @private
     */
    ClrDatagridCell.prototype.vcr;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtY2VsbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvZGF0YWdyaWQtY2VsbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFLQSxPQUFPLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBb0IsU0FBUyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTFHLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUM5RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDckUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBYTdDLE1BQU0sT0FBTyxlQUFlOzs7O0lBVzFCLFlBQW9CLEdBQXFCO1FBQXJCLFFBQUcsR0FBSCxHQUFHLENBQWtCO0lBQUcsQ0FBQzs7OztJQUk3QyxRQUFRO1FBQ04sSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLFdBQVcsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7Ozs7SUFFRCxJQUFXLEtBQUs7UUFDZCxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDO0lBQ2xFLENBQUM7OztZQWhDRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGFBQWE7Z0JBQ3ZCLFFBQVEsRUFBRTs7S0FFUDtnQkFDSCxJQUFJLEVBQUU7b0JBQ0osdUJBQXVCLEVBQUUsTUFBTTtvQkFDL0IsbUNBQW1DLEVBQUUscUJBQXFCO29CQUMxRCxJQUFJLEVBQUUsTUFBTTtpQkFDYjthQUNGOzs7O1lBaEJpRSxnQkFBZ0I7Ozt1QkEwQi9FLGVBQWUsU0FBQyxXQUFXOzs7Ozs7Ozs7Ozs7O0lBQTVCLG1DQUErRDs7Ozs7SUFJL0QsMENBQWtDOzs7OztJQUZ0Qiw4QkFBNkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBDb21wb25lbnQsIENvbnRlbnRDaGlsZHJlbiwgSW5qZWN0b3IsIE9uSW5pdCwgUXVlcnlMaXN0LCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IENsclNpZ25wb3N0IH0gZnJvbSAnLi4vLi4vcG9wb3Zlci9zaWducG9zdC9zaWducG9zdCc7XG5pbXBvcnQgeyBIb3N0V3JhcHBlciB9IGZyb20gJy4uLy4uL3V0aWxzL2hvc3Qtd3JhcHBpbmcvaG9zdC13cmFwcGVyJztcbmltcG9ydCB7IFdyYXBwZWRDZWxsIH0gZnJvbSAnLi93cmFwcGVkLWNlbGwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItZGctY2VsbCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICBgLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5kYXRhZ3JpZC1jZWxsXSc6ICd0cnVlJyxcbiAgICAnW2NsYXNzLmRhdGFncmlkLXNpZ25wb3N0LXRyaWdnZXJdJzogJ3NpZ25wb3N0Lmxlbmd0aCA+IDAnLFxuICAgIHJvbGU6ICdjZWxsJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyRGF0YWdyaWRDZWxsIGltcGxlbWVudHMgT25Jbml0IHtcbiAgLyoqKioqKioqKlxuICAgKiBAcHJvcGVydHkgc2lnbnBvc3RcbiAgICpcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIEBDb250ZW50Q2hpbGQgaXMgdXNlZCB0byBkZXRlY3QgdGhlIHByZXNlbmNlIG9mIGEgU2lnbnBvc3QgaW4gdGhlIHByb2plY3RlZCBjb250ZW50LlxuICAgKiBPbiB0aGUgaG9zdCwgd2Ugc2V0IHRoZSAuZGF0YWdyaWQtc2lnbnBvc3QtdHJpZ2dlciBjbGFzcyBvbiB0aGUgY2VsbCB3aGVuIHNpZ25wb3N0Lmxlbmd0aCBpcyBncmVhdGVyIHRoYW4gMC5cbiAgICpcbiAgICovXG4gIEBDb250ZW50Q2hpbGRyZW4oQ2xyU2lnbnBvc3QpIHNpZ25wb3N0OiBRdWVyeUxpc3Q8Q2xyU2lnbnBvc3Q+O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdmNyOiBWaWV3Q29udGFpbmVyUmVmKSB7fVxuXG4gIHByaXZhdGUgd3JhcHBlZEluamVjdG9yOiBJbmplY3RvcjtcblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLndyYXBwZWRJbmplY3RvciA9IG5ldyBIb3N0V3JhcHBlcihXcmFwcGVkQ2VsbCwgdGhpcy52Y3IpO1xuICB9XG5cbiAgcHVibGljIGdldCBfdmlldygpIHtcbiAgICByZXR1cm4gdGhpcy53cmFwcGVkSW5qZWN0b3IuZ2V0KFdyYXBwZWRDZWxsLCB0aGlzLnZjcikuY2VsbFZpZXc7XG4gIH1cbn1cbiJdfQ==