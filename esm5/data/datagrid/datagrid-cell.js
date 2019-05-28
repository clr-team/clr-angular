/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ContentChildren, QueryList, ViewContainerRef } from '@angular/core';
import { ClrSignpost } from '../../popover/signpost/signpost';
import { HostWrapper } from '../../utils/host-wrapping/host-wrapper';
import { WrappedCell } from './wrapped-cell';
var ClrDatagridCell = /** @class */ (function () {
    function ClrDatagridCell(vcr) {
        this.vcr = vcr;
    }
    /**
     * @return {?}
     */
    ClrDatagridCell.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.wrappedInjector = new HostWrapper(WrappedCell, this.vcr);
    };
    Object.defineProperty(ClrDatagridCell.prototype, "_view", {
        get: /**
         * @return {?}
         */
        function () {
            return this.wrappedInjector.get(WrappedCell, this.vcr).cellView;
        },
        enumerable: true,
        configurable: true
    });
    ClrDatagridCell.decorators = [
        { type: Component, args: [{
                    selector: 'clr-dg-cell',
                    template: "\n        <ng-content></ng-content>\n    ",
                    host: {
                        '[class.datagrid-cell]': 'true',
                        '[class.datagrid-signpost-trigger]': 'signpost.length > 0',
                        role: 'gridcell',
                    }
                }] }
    ];
    /** @nocollapse */
    ClrDatagridCell.ctorParameters = function () { return [
        { type: ViewContainerRef }
    ]; };
    ClrDatagridCell.propDecorators = {
        signpost: [{ type: ContentChildren, args: [ClrSignpost,] }]
    };
    return ClrDatagridCell;
}());
export { ClrDatagridCell };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtY2VsbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvZGF0YWdyaWQtY2VsbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFLQSxPQUFPLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBb0IsU0FBUyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTFHLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUM5RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDckUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTdDO0lBc0JFLHlCQUFvQixHQUFxQjtRQUFyQixRQUFHLEdBQUgsR0FBRyxDQUFrQjtJQUFHLENBQUM7Ozs7SUFJN0Msa0NBQVE7OztJQUFSO1FBQ0UsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLFdBQVcsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFRCxzQkFBVyxrQ0FBSzs7OztRQUFoQjtZQUNFLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUM7UUFDbEUsQ0FBQzs7O09BQUE7O2dCQWhDRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGFBQWE7b0JBQ3ZCLFFBQVEsRUFBRSwyQ0FFUDtvQkFDSCxJQUFJLEVBQUU7d0JBQ0osdUJBQXVCLEVBQUUsTUFBTTt3QkFDL0IsbUNBQW1DLEVBQUUscUJBQXFCO3dCQUMxRCxJQUFJLEVBQUUsVUFBVTtxQkFDakI7aUJBQ0Y7Ozs7Z0JBaEJpRSxnQkFBZ0I7OzsyQkEwQi9FLGVBQWUsU0FBQyxXQUFXOztJQWE5QixzQkFBQztDQUFBLEFBakNELElBaUNDO1NBdEJZLGVBQWU7Ozs7Ozs7Ozs7OztJQVMxQixtQ0FBK0Q7Ozs7O0lBSS9ELDBDQUFrQzs7Ozs7SUFGdEIsOEJBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgQ29tcG9uZW50LCBDb250ZW50Q2hpbGRyZW4sIEluamVjdG9yLCBPbkluaXQsIFF1ZXJ5TGlzdCwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBDbHJTaWducG9zdCB9IGZyb20gJy4uLy4uL3BvcG92ZXIvc2lnbnBvc3Qvc2lnbnBvc3QnO1xuaW1wb3J0IHsgSG9zdFdyYXBwZXIgfSBmcm9tICcuLi8uLi91dGlscy9ob3N0LXdyYXBwaW5nL2hvc3Qtd3JhcHBlcic7XG5pbXBvcnQgeyBXcmFwcGVkQ2VsbCB9IGZyb20gJy4vd3JhcHBlZC1jZWxsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLWRnLWNlbGwnLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgYCxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuZGF0YWdyaWQtY2VsbF0nOiAndHJ1ZScsXG4gICAgJ1tjbGFzcy5kYXRhZ3JpZC1zaWducG9zdC10cmlnZ2VyXSc6ICdzaWducG9zdC5sZW5ndGggPiAwJyxcbiAgICByb2xlOiAnZ3JpZGNlbGwnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBDbHJEYXRhZ3JpZENlbGwgaW1wbGVtZW50cyBPbkluaXQge1xuICAvKioqKioqKioqXG4gICAqIEBwcm9wZXJ0eSBzaWducG9zdFxuICAgKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogQENvbnRlbnRDaGlsZCBpcyB1c2VkIHRvIGRldGVjdCB0aGUgcHJlc2VuY2Ugb2YgYSBTaWducG9zdCBpbiB0aGUgcHJvamVjdGVkIGNvbnRlbnQuXG4gICAqIE9uIHRoZSBob3N0LCB3ZSBzZXQgdGhlIC5kYXRhZ3JpZC1zaWducG9zdC10cmlnZ2VyIGNsYXNzIG9uIHRoZSBjZWxsIHdoZW4gc2lnbnBvc3QubGVuZ3RoIGlzIGdyZWF0ZXIgdGhhbiAwLlxuICAgKlxuICAgKi9cbiAgQENvbnRlbnRDaGlsZHJlbihDbHJTaWducG9zdCkgc2lnbnBvc3Q6IFF1ZXJ5TGlzdDxDbHJTaWducG9zdD47XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSB2Y3I6IFZpZXdDb250YWluZXJSZWYpIHt9XG5cbiAgcHJpdmF0ZSB3cmFwcGVkSW5qZWN0b3I6IEluamVjdG9yO1xuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMud3JhcHBlZEluamVjdG9yID0gbmV3IEhvc3RXcmFwcGVyKFdyYXBwZWRDZWxsLCB0aGlzLnZjcik7XG4gIH1cblxuICBwdWJsaWMgZ2V0IF92aWV3KCkge1xuICAgIHJldHVybiB0aGlzLndyYXBwZWRJbmplY3Rvci5nZXQoV3JhcHBlZENlbGwsIHRoaXMudmNyKS5jZWxsVmlldztcbiAgfVxufVxuIl19