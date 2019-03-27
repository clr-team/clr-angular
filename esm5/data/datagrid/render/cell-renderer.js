/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { DatagridRenderStep } from '../enums/render-step.enum';
import { STRICT_WIDTH_CLASS } from './constants';
import { DatagridRenderOrganizer } from './render-organizer';
import { DatagridColumnChanges } from '../enums/column-changes.enum';
var DatagridCellRenderer = /** @class */ (function () {
    function DatagridCellRenderer(el, renderer, organizer) {
        var _this = this;
        this.el = el;
        this.renderer = renderer;
        this.subscriptions = [];
        this.subscriptions.push(organizer.filterRenderSteps(DatagridRenderStep.CLEAR_WIDTHS).subscribe((/**
         * @return {?}
         */
        function () { return _this.clearWidth(); })));
    }
    Object.defineProperty(DatagridCellRenderer.prototype, "columnState", {
        // @TODO(JEREMY) Work out how to dedupe some of this code between header and cell renderers
        set: 
        // @TODO(JEREMY) Work out how to dedupe some of this code between header and cell renderers
        /**
         * @param {?} columnState
         * @return {?}
         */
        function (columnState) {
            var _this = this;
            if (this.stateSubscription) {
                this.stateSubscription.unsubscribe();
            }
            this.stateSubscription = columnState.subscribe((/**
             * @param {?} state
             * @return {?}
             */
            function (state) { return _this.stateChanges(state); }));
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DatagridCellRenderer.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        function (sub) { return sub.unsubscribe(); }));
        if (this.stateSubscription) {
            this.stateSubscription.unsubscribe();
        }
    };
    /**
     * @private
     * @param {?} state
     * @return {?}
     */
    DatagridCellRenderer.prototype.stateChanges = /**
     * @private
     * @param {?} state
     * @return {?}
     */
    function (state) {
        var _this = this;
        if (state.changes && state.changes.length) {
            state.changes.forEach((/**
             * @param {?} change
             * @return {?}
             */
            function (change) {
                switch (change) {
                    case DatagridColumnChanges.WIDTH:
                        _this.setWidth(state);
                        break;
                    default:
                        break;
                }
            }));
        }
    };
    /**
     * @private
     * @return {?}
     */
    DatagridCellRenderer.prototype.clearWidth = /**
     * @private
     * @return {?}
     */
    function () {
        this.renderer.removeClass(this.el.nativeElement, STRICT_WIDTH_CLASS);
        this.renderer.setStyle(this.el.nativeElement, 'width', null);
    };
    /**
     * @private
     * @param {?} state
     * @return {?}
     */
    DatagridCellRenderer.prototype.setWidth = /**
     * @private
     * @param {?} state
     * @return {?}
     */
    function (state) {
        if (state.strictWidth) {
            this.renderer.addClass(this.el.nativeElement, STRICT_WIDTH_CLASS);
        }
        else {
            this.renderer.removeClass(this.el.nativeElement, STRICT_WIDTH_CLASS);
        }
        this.renderer.setStyle(this.el.nativeElement, 'width', state.width + 'px');
    };
    DatagridCellRenderer.decorators = [
        { type: Directive, args: [{ selector: 'clr-dg-cell' },] }
    ];
    /** @nocollapse */
    DatagridCellRenderer.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: DatagridRenderOrganizer }
    ]; };
    return DatagridCellRenderer;
}());
export { DatagridCellRenderer };
if (false) {
    /**
     * @type {?}
     * @private
     */
    DatagridCellRenderer.prototype.stateSubscription;
    /**
     * @type {?}
     * @private
     */
    DatagridCellRenderer.prototype.subscriptions;
    /**
     * @type {?}
     * @private
     */
    DatagridCellRenderer.prototype.el;
    /**
     * @type {?}
     * @private
     */
    DatagridCellRenderer.prototype.renderer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC1yZW5kZXJlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvcmVuZGVyL2NlbGwtcmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQWEsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzVFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRS9ELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNqRCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUU3RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUVyRTtJQVlFLDhCQUFvQixFQUFjLEVBQVUsUUFBbUIsRUFBRSxTQUFrQztRQUFuRyxpQkFJQztRQUptQixPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQU12RCxrQkFBYSxHQUFtQixFQUFFLENBQUM7UUFMekMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQ3JCLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsQ0FBQyxTQUFTOzs7UUFBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLFVBQVUsRUFBRSxFQUFqQixDQUFpQixFQUFDLENBQ2hHLENBQUM7SUFDSixDQUFDO0lBWEQsc0JBQUksNkNBQVc7UUFEZiwyRkFBMkY7Ozs7Ozs7UUFDM0YsVUFBZ0IsV0FBaUQ7WUFBakUsaUJBS0M7WUFKQyxJQUFJLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtnQkFDMUIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQ3RDO1lBQ0QsSUFBSSxDQUFDLGlCQUFpQixHQUFHLFdBQVcsQ0FBQyxTQUFTOzs7O1lBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxFQUF4QixDQUF3QixFQUFDLENBQUM7UUFDcEYsQ0FBQzs7O09BQUE7Ozs7SUFTRCwwQ0FBVzs7O0lBQVg7UUFDRSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU87Ozs7UUFBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxXQUFXLEVBQUUsRUFBakIsQ0FBaUIsRUFBQyxDQUFDO1FBQ3JELElBQUksSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQzFCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUN0QztJQUNILENBQUM7Ozs7OztJQUVPLDJDQUFZOzs7OztJQUFwQixVQUFxQixLQUEwQjtRQUEvQyxpQkFZQztRQVhDLElBQUksS0FBSyxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRTtZQUN6QyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU87Ozs7WUFBQyxVQUFBLE1BQU07Z0JBQzFCLFFBQVEsTUFBTSxFQUFFO29CQUNkLEtBQUsscUJBQXFCLENBQUMsS0FBSzt3QkFDOUIsS0FBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDckIsTUFBTTtvQkFDUjt3QkFDRSxNQUFNO2lCQUNUO1lBQ0gsQ0FBQyxFQUFDLENBQUM7U0FDSjtJQUNILENBQUM7Ozs7O0lBRU8seUNBQVU7Ozs7SUFBbEI7UUFDRSxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMvRCxDQUFDOzs7Ozs7SUFFTyx1Q0FBUTs7Ozs7SUFBaEIsVUFBaUIsS0FBMEI7UUFDekMsSUFBSSxLQUFLLENBQUMsV0FBVyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLGtCQUFrQixDQUFDLENBQUM7U0FDbkU7YUFBTTtZQUNMLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLGtCQUFrQixDQUFDLENBQUM7U0FDdEU7UUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQztJQUM3RSxDQUFDOztnQkFwREYsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBRTs7OztnQkFWbEIsVUFBVTtnQkFBYSxTQUFTO2dCQU0zQyx1QkFBdUI7O0lBeURoQywyQkFBQztDQUFBLEFBckRELElBcURDO1NBcERZLG9CQUFvQjs7Ozs7O0lBQy9CLGlEQUF3Qzs7Ozs7SUFnQnhDLDZDQUEyQzs7Ozs7SUFOL0Isa0NBQXNCOzs7OztJQUFFLHdDQUEyQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgT25EZXN0cm95LCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IERhdGFncmlkUmVuZGVyU3RlcCB9IGZyb20gJy4uL2VudW1zL3JlbmRlci1zdGVwLmVudW0nO1xuXG5pbXBvcnQgeyBTVFJJQ1RfV0lEVEhfQ0xBU1MgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBEYXRhZ3JpZFJlbmRlck9yZ2FuaXplciB9IGZyb20gJy4vcmVuZGVyLW9yZ2FuaXplcic7XG5pbXBvcnQgeyBEYXRhZ3JpZENvbHVtblN0YXRlIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9jb2x1bW4tc3RhdGUuaW50ZXJmYWNlJztcbmltcG9ydCB7IERhdGFncmlkQ29sdW1uQ2hhbmdlcyB9IGZyb20gJy4uL2VudW1zL2NvbHVtbi1jaGFuZ2VzLmVudW0nO1xuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdjbHItZGctY2VsbCcgfSlcbmV4cG9ydCBjbGFzcyBEYXRhZ3JpZENlbGxSZW5kZXJlciBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgc3RhdGVTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAvLyBAVE9ETyhKRVJFTVkpIFdvcmsgb3V0IGhvdyB0byBkZWR1cGUgc29tZSBvZiB0aGlzIGNvZGUgYmV0d2VlbiBoZWFkZXIgYW5kIGNlbGwgcmVuZGVyZXJzXG4gIHNldCBjb2x1bW5TdGF0ZShjb2x1bW5TdGF0ZTogQmVoYXZpb3JTdWJqZWN0PERhdGFncmlkQ29sdW1uU3RhdGU+KSB7XG4gICAgaWYgKHRoaXMuc3RhdGVTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuc3RhdGVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgdGhpcy5zdGF0ZVN1YnNjcmlwdGlvbiA9IGNvbHVtblN0YXRlLnN1YnNjcmliZShzdGF0ZSA9PiB0aGlzLnN0YXRlQ2hhbmdlcyhzdGF0ZSkpO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZiwgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLCBvcmdhbml6ZXI6IERhdGFncmlkUmVuZGVyT3JnYW5pemVyKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICBvcmdhbml6ZXIuZmlsdGVyUmVuZGVyU3RlcHMoRGF0YWdyaWRSZW5kZXJTdGVwLkNMRUFSX1dJRFRIUykuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2xlYXJXaWR0aCgpKVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHN1YiA9PiBzdWIudW5zdWJzY3JpYmUoKSk7XG4gICAgaWYgKHRoaXMuc3RhdGVTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuc3RhdGVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHN0YXRlQ2hhbmdlcyhzdGF0ZTogRGF0YWdyaWRDb2x1bW5TdGF0ZSkge1xuICAgIGlmIChzdGF0ZS5jaGFuZ2VzICYmIHN0YXRlLmNoYW5nZXMubGVuZ3RoKSB7XG4gICAgICBzdGF0ZS5jaGFuZ2VzLmZvckVhY2goY2hhbmdlID0+IHtcbiAgICAgICAgc3dpdGNoIChjaGFuZ2UpIHtcbiAgICAgICAgICBjYXNlIERhdGFncmlkQ29sdW1uQ2hhbmdlcy5XSURUSDpcbiAgICAgICAgICAgIHRoaXMuc2V0V2lkdGgoc3RhdGUpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNsZWFyV2lkdGgoKSB7XG4gICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIFNUUklDVF9XSURUSF9DTEFTUyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICd3aWR0aCcsIG51bGwpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRXaWR0aChzdGF0ZTogRGF0YWdyaWRDb2x1bW5TdGF0ZSkge1xuICAgIGlmIChzdGF0ZS5zdHJpY3RXaWR0aCkge1xuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIFNUUklDVF9XSURUSF9DTEFTUyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCBTVFJJQ1RfV0lEVEhfQ0xBU1MpO1xuICAgIH1cbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3dpZHRoJywgc3RhdGUud2lkdGggKyAncHgnKTtcbiAgfVxufVxuIl19