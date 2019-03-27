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
var ClrDatagridCell = /** @class */ (function () {
    function ClrDatagridCell(hideableColumnService, _el, _renderer, vcr) {
        this.hideableColumnService = hideableColumnService;
        this._el = _el;
        this._renderer = _renderer;
        this.vcr = vcr;
    }
    Object.defineProperty(ClrDatagridCell.prototype, "id", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._id = value;
            this.mapHideableColumn(this._id);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @param {?} columnId
     * @return {?}
     */
    ClrDatagridCell.prototype.mapHideableColumn = /**
     * @private
     * @param {?} columnId
     * @return {?}
     */
    function (columnId) {
        var _this = this;
        if (!columnId) {
            return;
        }
        /** @type {?} */
        var hideableColumn = this.hideableColumnService.getColumnById(this._id);
        this.setHiddenClass(hideableColumn.hidden);
        this.hiddenStateSubscription = hideableColumn.hiddenChangeState.subscribe((/**
         * @return {?}
         */
        function () {
            _this.setHiddenClass(hideableColumn.hidden);
        }));
    };
    /**
     * @private
     * @param {?} hideableColumnValue
     * @return {?}
     */
    ClrDatagridCell.prototype.setHiddenClass = /**
     * @private
     * @param {?} hideableColumnValue
     * @return {?}
     */
    function (hideableColumnValue) {
        if (hideableColumnValue) {
            this._renderer.addClass(this._el.nativeElement, 'datagrid-cell--hidden');
        }
        else {
            this._renderer.removeClass(this._el.nativeElement, 'datagrid-cell--hidden');
        }
    };
    /**
     * @return {?}
     */
    ClrDatagridCell.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.wrappedInjector = new HostWrapper(WrappedCell, this.vcr);
    };
    /**
     * @return {?}
     */
    ClrDatagridCell.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.hiddenStateSubscription) {
            this.hiddenStateSubscription.unsubscribe();
        }
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
                        role: 'cell',
                    }
                }] }
    ];
    /** @nocollapse */
    ClrDatagridCell.ctorParameters = function () { return [
        { type: HideableColumnService },
        { type: ElementRef },
        { type: Renderer2 },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtY2VsbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvZGF0YWdyaWQtY2VsbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFLQSxPQUFPLEVBQ0wsU0FBUyxFQUNULGVBQWUsRUFDZixVQUFVLEVBSVYsU0FBUyxFQUNULFNBQVMsRUFDVCxnQkFBZ0IsR0FDakIsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQzlELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUVyRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUM1RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFN0M7SUFzQ0UseUJBQ1MscUJBQTRDLEVBQzNDLEdBQWUsRUFDZixTQUFvQixFQUNwQixHQUFxQjtRQUh0QiwwQkFBcUIsR0FBckIscUJBQXFCLENBQXVCO1FBQzNDLFFBQUcsR0FBSCxHQUFHLENBQVk7UUFDZixjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ3BCLFFBQUcsR0FBSCxHQUFHLENBQWtCO0lBQzVCLENBQUM7SUFaSixzQkFBSSwrQkFBRTs7Ozs7UUFBTixVQUFPLEtBQWE7WUFDbEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUM7WUFDakIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuQyxDQUFDOzs7T0FBQTs7Ozs7O0lBV08sMkNBQWlCOzs7OztJQUF6QixVQUEwQixRQUFnQjtRQUExQyxpQkFXQztRQVZDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDYixPQUFPO1NBQ1I7O1lBRUssY0FBYyxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUV6RSxJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsdUJBQXVCLEdBQUcsY0FBYyxDQUFDLGlCQUFpQixDQUFDLFNBQVM7OztRQUFDO1lBQ3hFLEtBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdDLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7O0lBRU8sd0NBQWM7Ozs7O0lBQXRCLFVBQXVCLG1CQUE0QjtRQUNqRCxJQUFJLG1CQUFtQixFQUFFO1lBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLHVCQUF1QixDQUFDLENBQUM7U0FDMUU7YUFBTTtZQUNMLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLHVCQUF1QixDQUFDLENBQUM7U0FDN0U7SUFDSCxDQUFDOzs7O0lBSUQsa0NBQVE7OztJQUFSO1FBQ0UsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLFdBQVcsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7Ozs7SUFFRCxxQ0FBVzs7O0lBQVg7UUFDRSxJQUFJLElBQUksQ0FBQyx1QkFBdUIsRUFBRTtZQUNoQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDNUM7SUFDSCxDQUFDO0lBRUQsc0JBQVcsa0NBQUs7Ozs7UUFBaEI7WUFDRSxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDO1FBQ2xFLENBQUM7OztPQUFBOztnQkFoRkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxhQUFhO29CQUN2QixRQUFRLEVBQUUsMkNBRVA7b0JBQ0gsSUFBSSxFQUFFO3dCQUNKLHVCQUF1QixFQUFFLE1BQU07d0JBQy9CLG1DQUFtQyxFQUFFLHFCQUFxQjt3QkFDMUQsSUFBSSxFQUFFLE1BQU07cUJBQ2I7aUJBQ0Y7Ozs7Z0JBYlEscUJBQXFCO2dCQWI1QixVQUFVO2dCQUtWLFNBQVM7Z0JBQ1QsZ0JBQWdCOzs7MkJBOEJmLGVBQWUsU0FBQyxXQUFXOztJQTZEOUIsc0JBQUM7Q0FBQSxBQWpGRCxJQWlGQztTQXRFWSxlQUFlOzs7Ozs7Ozs7Ozs7SUFTMUIsbUNBQStEOzs7Ozs7Ozs7O0lBUy9ELDhCQUFvQjs7Ozs7SUFPcEIsa0RBQThDOzs7OztJQThCOUMsMENBQWtDOztJQTNCaEMsZ0RBQW1EOzs7OztJQUNuRCw4QkFBdUI7Ozs7O0lBQ3ZCLG9DQUE0Qjs7Ozs7SUFDNUIsOEJBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIEVsZW1lbnRSZWYsXG4gIEluamVjdG9yLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgUXVlcnlMaXN0LFxuICBSZW5kZXJlcjIsXG4gIFZpZXdDb250YWluZXJSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IENsclNpZ25wb3N0IH0gZnJvbSAnLi4vLi4vcG9wb3Zlci9zaWducG9zdC9zaWducG9zdCc7XG5pbXBvcnQgeyBIb3N0V3JhcHBlciB9IGZyb20gJy4uLy4uL3V0aWxzL2hvc3Qtd3JhcHBpbmcvaG9zdC13cmFwcGVyJztcblxuaW1wb3J0IHsgSGlkZWFibGVDb2x1bW5TZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvaGlkZWFibGUtY29sdW1uLnNlcnZpY2UnO1xuaW1wb3J0IHsgV3JhcHBlZENlbGwgfSBmcm9tICcuL3dyYXBwZWQtY2VsbCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci1kZy1jZWxsJyxcbiAgdGVtcGxhdGU6IGBcbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIGAsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmRhdGFncmlkLWNlbGxdJzogJ3RydWUnLFxuICAgICdbY2xhc3MuZGF0YWdyaWQtc2lnbnBvc3QtdHJpZ2dlcl0nOiAnc2lnbnBvc3QubGVuZ3RoID4gMCcsXG4gICAgcm9sZTogJ2NlbGwnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBDbHJEYXRhZ3JpZENlbGwgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIC8qKioqKioqKipcbiAgICogQHByb3BlcnR5IHNpZ25wb3N0XG4gICAqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBAQ29udGVudENoaWxkIGlzIHVzZWQgdG8gZGV0ZWN0IHRoZSBwcmVzZW5jZSBvZiBhIFNpZ25wb3N0IGluIHRoZSBwcm9qZWN0ZWQgY29udGVudC5cbiAgICogT24gdGhlIGhvc3QsIHdlIHNldCB0aGUgLmRhdGFncmlkLXNpZ25wb3N0LXRyaWdnZXIgY2xhc3Mgb24gdGhlIGNlbGwgd2hlbiBzaWducG9zdC5sZW5ndGggaXMgZ3JlYXRlciB0aGFuIDAuXG4gICAqXG4gICAqL1xuICBAQ29udGVudENoaWxkcmVuKENsclNpZ25wb3N0KSBzaWducG9zdDogUXVlcnlMaXN0PENsclNpZ25wb3N0PjtcblxuICAvKipcbiAgICogQHByb3BlcnR5IGlkXG4gICAqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBBbiBpZGVudGlmaWVyIGZvciBhbiBpbnN0YW5jZSBvZiB0aGlzIGNlbGwgdGhhdCBtYXBzIGl0IHRvIGEgc3BlY2lmaWMgY29sdW1uXG4gICAqXG4gICAqL1xuICBwcml2YXRlIF9pZDogc3RyaW5nO1xuXG4gIHNldCBpZCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5faWQgPSB2YWx1ZTtcbiAgICB0aGlzLm1hcEhpZGVhYmxlQ29sdW1uKHRoaXMuX2lkKTtcbiAgfVxuXG4gIHByaXZhdGUgaGlkZGVuU3RhdGVTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgaGlkZWFibGVDb2x1bW5TZXJ2aWNlOiBIaWRlYWJsZUNvbHVtblNlcnZpY2UsXG4gICAgcHJpdmF0ZSBfZWw6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIHZjcjogVmlld0NvbnRhaW5lclJlZlxuICApIHt9XG5cbiAgcHJpdmF0ZSBtYXBIaWRlYWJsZUNvbHVtbihjb2x1bW5JZDogc3RyaW5nKSB7XG4gICAgaWYgKCFjb2x1bW5JZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGhpZGVhYmxlQ29sdW1uID0gdGhpcy5oaWRlYWJsZUNvbHVtblNlcnZpY2UuZ2V0Q29sdW1uQnlJZCh0aGlzLl9pZCk7XG5cbiAgICB0aGlzLnNldEhpZGRlbkNsYXNzKGhpZGVhYmxlQ29sdW1uLmhpZGRlbik7XG4gICAgdGhpcy5oaWRkZW5TdGF0ZVN1YnNjcmlwdGlvbiA9IGhpZGVhYmxlQ29sdW1uLmhpZGRlbkNoYW5nZVN0YXRlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLnNldEhpZGRlbkNsYXNzKGhpZGVhYmxlQ29sdW1uLmhpZGRlbik7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHNldEhpZGRlbkNsYXNzKGhpZGVhYmxlQ29sdW1uVmFsdWU6IGJvb2xlYW4pIHtcbiAgICBpZiAoaGlkZWFibGVDb2x1bW5WYWx1ZSkge1xuICAgICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5fZWwubmF0aXZlRWxlbWVudCwgJ2RhdGFncmlkLWNlbGwtLWhpZGRlbicpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLl9lbC5uYXRpdmVFbGVtZW50LCAnZGF0YWdyaWQtY2VsbC0taGlkZGVuJyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB3cmFwcGVkSW5qZWN0b3I6IEluamVjdG9yO1xuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMud3JhcHBlZEluamVjdG9yID0gbmV3IEhvc3RXcmFwcGVyKFdyYXBwZWRDZWxsLCB0aGlzLnZjcik7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5oaWRkZW5TdGF0ZVN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5oaWRkZW5TdGF0ZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXQgX3ZpZXcoKSB7XG4gICAgcmV0dXJuIHRoaXMud3JhcHBlZEluamVjdG9yLmdldChXcmFwcGVkQ2VsbCwgdGhpcy52Y3IpLmNlbGxWaWV3O1xuICB9XG59XG4iXX0=