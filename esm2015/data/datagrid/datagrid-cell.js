/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ContentChildren, ElementRef, QueryList, Renderer2, ViewContainerRef, } from '@angular/core';
import { ClrSignpost } from '../../popover/signpost/signpost';
import { HostWrapper } from '../../utils/host-wrapping/host-wrapper';
import { HideableColumnService } from './providers/hideable-column.service';
import { WrappedCell } from './wrapped-cell';
export class ClrDatagridCell {
    /**
     * @param {?} hideableColumnService
     * @param {?} _el
     * @param {?} _renderer
     * @param {?} vcr
     */
    constructor(hideableColumnService, _el, _renderer, vcr) {
        this.hideableColumnService = hideableColumnService;
        this._el = _el;
        this._renderer = _renderer;
        this.vcr = vcr;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set id(value) {
        this._id = value;
        this.mapHideableColumn(this._id);
    }
    /**
     * @private
     * @param {?} columnId
     * @return {?}
     */
    mapHideableColumn(columnId) {
        if (!columnId) {
            return;
        }
        /** @type {?} */
        const hideableColumn = this.hideableColumnService.getColumnById(this._id);
        this.setHiddenClass(hideableColumn.hidden);
        this.hiddenStateSubscription = hideableColumn.hiddenChangeState.subscribe((/**
         * @return {?}
         */
        () => {
            this.setHiddenClass(hideableColumn.hidden);
        }));
    }
    /**
     * @private
     * @param {?} hideableColumnValue
     * @return {?}
     */
    setHiddenClass(hideableColumnValue) {
        if (hideableColumnValue) {
            this._renderer.addClass(this._el.nativeElement, 'datagrid-cell--hidden');
        }
        else {
            this._renderer.removeClass(this._el.nativeElement, 'datagrid-cell--hidden');
        }
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
    ngOnDestroy() {
        if (this.hiddenStateSubscription) {
            this.hiddenStateSubscription.unsubscribe();
        }
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
    { type: HideableColumnService },
    { type: ElementRef },
    { type: Renderer2 },
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
     * \@property id
     *
     * \@description
     * An identifier for an instance of this cell that maps it to a specific column
     *
     * @type {?}
     * @private
     */
    ClrDatagridCell.prototype._id;
    /**
     * @type {?}
     * @private
     */
    ClrDatagridCell.prototype.hiddenStateSubscription;
    /**
     * @type {?}
     * @private
     */
    ClrDatagridCell.prototype.wrappedInjector;
    /** @type {?} */
    ClrDatagridCell.prototype.hideableColumnService;
    /**
     * @type {?}
     * @private
     */
    ClrDatagridCell.prototype._el;
    /**
     * @type {?}
     * @private
     */
    ClrDatagridCell.prototype._renderer;
    /**
     * @type {?}
     * @private
     */
    ClrDatagridCell.prototype.vcr;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtY2VsbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvZGF0YWdyaWQtY2VsbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFLQSxPQUFPLEVBQ0wsU0FBUyxFQUNULGVBQWUsRUFDZixVQUFVLEVBSVYsU0FBUyxFQUNULFNBQVMsRUFDVCxnQkFBZ0IsR0FDakIsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQzlELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUVyRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUM1RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFhN0MsTUFBTSxPQUFPLGVBQWU7Ozs7Ozs7SUEyQjFCLFlBQ1MscUJBQTRDLEVBQzNDLEdBQWUsRUFDZixTQUFvQixFQUNwQixHQUFxQjtRQUh0QiwwQkFBcUIsR0FBckIscUJBQXFCLENBQXVCO1FBQzNDLFFBQUcsR0FBSCxHQUFHLENBQVk7UUFDZixjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ3BCLFFBQUcsR0FBSCxHQUFHLENBQWtCO0lBQzVCLENBQUM7Ozs7O0lBWkosSUFBSSxFQUFFLENBQUMsS0FBYTtRQUNsQixJQUFJLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQztRQUNqQixJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25DLENBQUM7Ozs7OztJQVdPLGlCQUFpQixDQUFDLFFBQWdCO1FBQ3hDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDYixPQUFPO1NBQ1I7O2NBRUssY0FBYyxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUV6RSxJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsdUJBQXVCLEdBQUcsY0FBYyxDQUFDLGlCQUFpQixDQUFDLFNBQVM7OztRQUFDLEdBQUcsRUFBRTtZQUM3RSxJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3QyxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7OztJQUVPLGNBQWMsQ0FBQyxtQkFBNEI7UUFDakQsSUFBSSxtQkFBbUIsRUFBRTtZQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO1NBQzFFO2FBQU07WUFDTCxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO1NBQzdFO0lBQ0gsQ0FBQzs7OztJQUlELFFBQVE7UUFDTixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksV0FBVyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDaEUsQ0FBQzs7OztJQUVELFdBQVc7UUFDVCxJQUFJLElBQUksQ0FBQyx1QkFBdUIsRUFBRTtZQUNoQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDNUM7SUFDSCxDQUFDOzs7O0lBRUQsSUFBVyxLQUFLO1FBQ2QsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQztJQUNsRSxDQUFDOzs7WUFoRkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxhQUFhO2dCQUN2QixRQUFRLEVBQUU7O0tBRVA7Z0JBQ0gsSUFBSSxFQUFFO29CQUNKLHVCQUF1QixFQUFFLE1BQU07b0JBQy9CLG1DQUFtQyxFQUFFLHFCQUFxQjtvQkFDMUQsSUFBSSxFQUFFLE1BQU07aUJBQ2I7YUFDRjs7OztZQWJRLHFCQUFxQjtZQWI1QixVQUFVO1lBS1YsU0FBUztZQUNULGdCQUFnQjs7O3VCQThCZixlQUFlLFNBQUMsV0FBVzs7Ozs7Ozs7Ozs7OztJQUE1QixtQ0FBK0Q7Ozs7Ozs7Ozs7SUFTL0QsOEJBQW9COzs7OztJQU9wQixrREFBOEM7Ozs7O0lBOEI5QywwQ0FBa0M7O0lBM0JoQyxnREFBbUQ7Ozs7O0lBQ25ELDhCQUF1Qjs7Ozs7SUFDdkIsb0NBQTRCOzs7OztJQUM1Qiw4QkFBNkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQge1xuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRWxlbWVudFJlZixcbiAgSW5qZWN0b3IsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBRdWVyeUxpc3QsXG4gIFJlbmRlcmVyMixcbiAgVmlld0NvbnRhaW5lclJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgQ2xyU2lnbnBvc3QgfSBmcm9tICcuLi8uLi9wb3BvdmVyL3NpZ25wb3N0L3NpZ25wb3N0JztcbmltcG9ydCB7IEhvc3RXcmFwcGVyIH0gZnJvbSAnLi4vLi4vdXRpbHMvaG9zdC13cmFwcGluZy9ob3N0LXdyYXBwZXInO1xuXG5pbXBvcnQgeyBIaWRlYWJsZUNvbHVtblNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9oaWRlYWJsZS1jb2x1bW4uc2VydmljZSc7XG5pbXBvcnQgeyBXcmFwcGVkQ2VsbCB9IGZyb20gJy4vd3JhcHBlZC1jZWxsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLWRnLWNlbGwnLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgYCxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuZGF0YWdyaWQtY2VsbF0nOiAndHJ1ZScsXG4gICAgJ1tjbGFzcy5kYXRhZ3JpZC1zaWducG9zdC10cmlnZ2VyXSc6ICdzaWducG9zdC5sZW5ndGggPiAwJyxcbiAgICByb2xlOiAnY2VsbCcsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIENsckRhdGFncmlkQ2VsbCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgLyoqKioqKioqKlxuICAgKiBAcHJvcGVydHkgc2lnbnBvc3RcbiAgICpcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIEBDb250ZW50Q2hpbGQgaXMgdXNlZCB0byBkZXRlY3QgdGhlIHByZXNlbmNlIG9mIGEgU2lnbnBvc3QgaW4gdGhlIHByb2plY3RlZCBjb250ZW50LlxuICAgKiBPbiB0aGUgaG9zdCwgd2Ugc2V0IHRoZSAuZGF0YWdyaWQtc2lnbnBvc3QtdHJpZ2dlciBjbGFzcyBvbiB0aGUgY2VsbCB3aGVuIHNpZ25wb3N0Lmxlbmd0aCBpcyBncmVhdGVyIHRoYW4gMC5cbiAgICpcbiAgICovXG4gIEBDb250ZW50Q2hpbGRyZW4oQ2xyU2lnbnBvc3QpIHNpZ25wb3N0OiBRdWVyeUxpc3Q8Q2xyU2lnbnBvc3Q+O1xuXG4gIC8qKlxuICAgKiBAcHJvcGVydHkgaWRcbiAgICpcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIEFuIGlkZW50aWZpZXIgZm9yIGFuIGluc3RhbmNlIG9mIHRoaXMgY2VsbCB0aGF0IG1hcHMgaXQgdG8gYSBzcGVjaWZpYyBjb2x1bW5cbiAgICpcbiAgICovXG4gIHByaXZhdGUgX2lkOiBzdHJpbmc7XG5cbiAgc2V0IGlkKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9pZCA9IHZhbHVlO1xuICAgIHRoaXMubWFwSGlkZWFibGVDb2x1bW4odGhpcy5faWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBoaWRkZW5TdGF0ZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBoaWRlYWJsZUNvbHVtblNlcnZpY2U6IEhpZGVhYmxlQ29sdW1uU2VydmljZSxcbiAgICBwcml2YXRlIF9lbDogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgdmNyOiBWaWV3Q29udGFpbmVyUmVmXG4gICkge31cblxuICBwcml2YXRlIG1hcEhpZGVhYmxlQ29sdW1uKGNvbHVtbklkOiBzdHJpbmcpIHtcbiAgICBpZiAoIWNvbHVtbklkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgaGlkZWFibGVDb2x1bW4gPSB0aGlzLmhpZGVhYmxlQ29sdW1uU2VydmljZS5nZXRDb2x1bW5CeUlkKHRoaXMuX2lkKTtcblxuICAgIHRoaXMuc2V0SGlkZGVuQ2xhc3MoaGlkZWFibGVDb2x1bW4uaGlkZGVuKTtcbiAgICB0aGlzLmhpZGRlblN0YXRlU3Vic2NyaXB0aW9uID0gaGlkZWFibGVDb2x1bW4uaGlkZGVuQ2hhbmdlU3RhdGUuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuc2V0SGlkZGVuQ2xhc3MoaGlkZWFibGVDb2x1bW4uaGlkZGVuKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0SGlkZGVuQ2xhc3MoaGlkZWFibGVDb2x1bW5WYWx1ZTogYm9vbGVhbikge1xuICAgIGlmIChoaWRlYWJsZUNvbHVtblZhbHVlKSB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyh0aGlzLl9lbC5uYXRpdmVFbGVtZW50LCAnZGF0YWdyaWQtY2VsbC0taGlkZGVuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQsICdkYXRhZ3JpZC1jZWxsLS1oaWRkZW4nKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHdyYXBwZWRJbmplY3RvcjogSW5qZWN0b3I7XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy53cmFwcGVkSW5qZWN0b3IgPSBuZXcgSG9zdFdyYXBwZXIoV3JhcHBlZENlbGwsIHRoaXMudmNyKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLmhpZGRlblN0YXRlU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLmhpZGRlblN0YXRlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldCBfdmlldygpIHtcbiAgICByZXR1cm4gdGhpcy53cmFwcGVkSW5qZWN0b3IuZ2V0KFdyYXBwZWRDZWxsLCB0aGlzLnZjcikuY2VsbFZpZXc7XG4gIH1cbn1cbiJdfQ==