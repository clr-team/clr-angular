/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
        this.subscriptions.push(organizer.filterRenderSteps(DatagridRenderStep.CLEAR_WIDTHS).subscribe(function () { return _this.clearWidth(); }));
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
            this.stateSubscription = columnState.subscribe(function (state) { return _this.stateChanges(state); });
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
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
        if (this.stateSubscription) {
            this.stateSubscription.unsubscribe();
        }
    };
    /**
     * @param {?} state
     * @return {?}
     */
    DatagridCellRenderer.prototype.stateChanges = /**
     * @param {?} state
     * @return {?}
     */
    function (state) {
        var _this = this;
        if (state.changes && state.changes.length) {
            state.changes.forEach(function (change) {
                switch (change) {
                    case DatagridColumnChanges.WIDTH:
                        _this.setWidth(state);
                        break;
                    default:
                        break;
                }
            });
        }
    };
    /**
     * @return {?}
     */
    DatagridCellRenderer.prototype.clearWidth = /**
     * @return {?}
     */
    function () {
        this.renderer.removeClass(this.el.nativeElement, STRICT_WIDTH_CLASS);
        this.renderer.setStyle(this.el.nativeElement, 'width', null);
    };
    /**
     * @param {?} state
     * @return {?}
     */
    DatagridCellRenderer.prototype.setWidth = /**
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
    /** @type {?} */
    DatagridCellRenderer.prototype.stateSubscription;
    /** @type {?} */
    DatagridCellRenderer.prototype.subscriptions;
    /** @type {?} */
    DatagridCellRenderer.prototype.el;
    /** @type {?} */
    DatagridCellRenderer.prototype.renderer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC1yZW5kZXJlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvcmVuZGVyL2NlbGwtcmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQWEsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzVFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRS9ELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNqRCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUU3RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUVyRTtJQVlFLDhCQUFvQixFQUFjLEVBQVUsUUFBbUIsRUFBRSxTQUFrQztRQUFuRyxpQkFJQztRQUptQixPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQU12RCxrQkFBYSxHQUFtQixFQUFFLENBQUM7UUFMekMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQ3JCLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsQ0FBQyxTQUFTLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxVQUFVLEVBQUUsRUFBakIsQ0FBaUIsQ0FBQyxDQUNoRyxDQUFDO0lBQ0osQ0FBQztJQVhELHNCQUFJLDZDQUFXO1FBRGYsMkZBQTJGOzs7Ozs7O1FBQzNGLFVBQWdCLFdBQWlEO1lBQWpFLGlCQUtDO1lBSkMsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUU7Z0JBQzFCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQzthQUN0QztZQUNELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsRUFBeEIsQ0FBd0IsQ0FBQyxDQUFDO1FBQ3BGLENBQUM7OztPQUFBOzs7O0lBU0QsMENBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLENBQUMsV0FBVyxFQUFFLEVBQWpCLENBQWlCLENBQUMsQ0FBQztRQUNyRCxJQUFJLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUMxQixJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDdEM7SUFDSCxDQUFDOzs7OztJQUVPLDJDQUFZOzs7O0lBQXBCLFVBQXFCLEtBQTBCO1FBQS9DLGlCQVlDO1FBWEMsSUFBSSxLQUFLLENBQUMsT0FBTyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFO1lBQ3pDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQUEsTUFBTTtnQkFDMUIsUUFBUSxNQUFNLEVBQUU7b0JBQ2QsS0FBSyxxQkFBcUIsQ0FBQyxLQUFLO3dCQUM5QixLQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUNyQixNQUFNO29CQUNSO3dCQUNFLE1BQU07aUJBQ1Q7WUFDSCxDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQzs7OztJQUVPLHlDQUFVOzs7SUFBbEI7UUFDRSxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMvRCxDQUFDOzs7OztJQUVPLHVDQUFROzs7O0lBQWhCLFVBQWlCLEtBQTBCO1FBQ3pDLElBQUksS0FBSyxDQUFDLFdBQVcsRUFBRTtZQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1NBQ25FO2FBQU07WUFDTCxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1NBQ3RFO1FBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDN0UsQ0FBQzs7Z0JBcERGLFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUU7Ozs7Z0JBVmxCLFVBQVU7Z0JBQWEsU0FBUztnQkFNM0MsdUJBQXVCOztJQXlEaEMsMkJBQUM7Q0FBQSxBQXJERCxJQXFEQztTQXBEWSxvQkFBb0I7OztJQUMvQixpREFBd0M7O0lBZ0J4Qyw2Q0FBMkM7O0lBTi9CLGtDQUFzQjs7SUFBRSx3Q0FBMkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIE9uRGVzdHJveSwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBEYXRhZ3JpZFJlbmRlclN0ZXAgfSBmcm9tICcuLi9lbnVtcy9yZW5kZXItc3RlcC5lbnVtJztcblxuaW1wb3J0IHsgU1RSSUNUX1dJRFRIX0NMQVNTIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgRGF0YWdyaWRSZW5kZXJPcmdhbml6ZXIgfSBmcm9tICcuL3JlbmRlci1vcmdhbml6ZXInO1xuaW1wb3J0IHsgRGF0YWdyaWRDb2x1bW5TdGF0ZSB9IGZyb20gJy4uL2ludGVyZmFjZXMvY29sdW1uLXN0YXRlLmludGVyZmFjZSc7XG5pbXBvcnQgeyBEYXRhZ3JpZENvbHVtbkNoYW5nZXMgfSBmcm9tICcuLi9lbnVtcy9jb2x1bW4tY2hhbmdlcy5lbnVtJztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnY2xyLWRnLWNlbGwnIH0pXG5leHBvcnQgY2xhc3MgRGF0YWdyaWRDZWxsUmVuZGVyZXIgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBwcml2YXRlIHN0YXRlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgLy8gQFRPRE8oSkVSRU1ZKSBXb3JrIG91dCBob3cgdG8gZGVkdXBlIHNvbWUgb2YgdGhpcyBjb2RlIGJldHdlZW4gaGVhZGVyIGFuZCBjZWxsIHJlbmRlcmVyc1xuICBzZXQgY29sdW1uU3RhdGUoY29sdW1uU3RhdGU6IEJlaGF2aW9yU3ViamVjdDxEYXRhZ3JpZENvbHVtblN0YXRlPikge1xuICAgIGlmICh0aGlzLnN0YXRlU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnN0YXRlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIHRoaXMuc3RhdGVTdWJzY3JpcHRpb24gPSBjb2x1bW5TdGF0ZS5zdWJzY3JpYmUoc3RhdGUgPT4gdGhpcy5zdGF0ZUNoYW5nZXMoc3RhdGUpKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMiwgb3JnYW5pemVyOiBEYXRhZ3JpZFJlbmRlck9yZ2FuaXplcikge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgb3JnYW5pemVyLmZpbHRlclJlbmRlclN0ZXBzKERhdGFncmlkUmVuZGVyU3RlcC5DTEVBUl9XSURUSFMpLnN1YnNjcmliZSgoKSA9PiB0aGlzLmNsZWFyV2lkdGgoKSlcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaChzdWIgPT4gc3ViLnVuc3Vic2NyaWJlKCkpO1xuICAgIGlmICh0aGlzLnN0YXRlU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnN0YXRlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzdGF0ZUNoYW5nZXMoc3RhdGU6IERhdGFncmlkQ29sdW1uU3RhdGUpIHtcbiAgICBpZiAoc3RhdGUuY2hhbmdlcyAmJiBzdGF0ZS5jaGFuZ2VzLmxlbmd0aCkge1xuICAgICAgc3RhdGUuY2hhbmdlcy5mb3JFYWNoKGNoYW5nZSA9PiB7XG4gICAgICAgIHN3aXRjaCAoY2hhbmdlKSB7XG4gICAgICAgICAgY2FzZSBEYXRhZ3JpZENvbHVtbkNoYW5nZXMuV0lEVEg6XG4gICAgICAgICAgICB0aGlzLnNldFdpZHRoKHN0YXRlKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjbGVhcldpZHRoKCkge1xuICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCBTVFJJQ1RfV0lEVEhfQ0xBU1MpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnd2lkdGgnLCBudWxsKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0V2lkdGgoc3RhdGU6IERhdGFncmlkQ29sdW1uU3RhdGUpIHtcbiAgICBpZiAoc3RhdGUuc3RyaWN0V2lkdGgpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCBTVFJJQ1RfV0lEVEhfQ0xBU1MpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgU1RSSUNUX1dJRFRIX0NMQVNTKTtcbiAgICB9XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICd3aWR0aCcsIHN0YXRlLndpZHRoICsgJ3B4Jyk7XG4gIH1cbn1cbiJdfQ==