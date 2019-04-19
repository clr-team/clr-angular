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
import { HIDDEN_COLUMN_CLASS, STRICT_WIDTH_CLASS } from './constants';
import { DatagridRenderOrganizer } from './render-organizer';
import { ALL_COLUMN_CHANGES, DatagridColumnChanges } from '../enums/column-changes.enum';
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
            this.runAllChanges = ALL_COLUMN_CHANGES;
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
        if (this.runAllChanges) {
            state.changes = this.runAllChanges;
            delete this.runAllChanges;
        }
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
                    case DatagridColumnChanges.HIDDEN:
                        _this.setHidden(state);
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
    /**
     * @private
     * @param {?} state
     * @return {?}
     */
    DatagridCellRenderer.prototype.setHidden = /**
     * @private
     * @param {?} state
     * @return {?}
     */
    function (state) {
        if (state.hidden) {
            this.renderer.addClass(this.el.nativeElement, HIDDEN_COLUMN_CLASS);
        }
        else {
            this.renderer.removeClass(this.el.nativeElement, HIDDEN_COLUMN_CLASS);
        }
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
    DatagridCellRenderer.prototype.runAllChanges;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC1yZW5kZXJlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvcmVuZGVyL2NlbGwtcmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQWEsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzVFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRS9ELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN0RSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUU3RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUV6RjtJQWdCRSw4QkFBb0IsRUFBYyxFQUFVLFFBQW1CLEVBQUUsU0FBa0M7UUFBbkcsaUJBSUM7UUFKbUIsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVc7UUFNdkQsa0JBQWEsR0FBbUIsRUFBRSxDQUFDO1FBTHpDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUNyQixTQUFTLENBQUMsaUJBQWlCLENBQUMsa0JBQWtCLENBQUMsWUFBWSxDQUFDLENBQUMsU0FBUzs7O1FBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxVQUFVLEVBQUUsRUFBakIsQ0FBaUIsRUFBQyxDQUNoRyxDQUFDO0lBQ0osQ0FBQztJQWJELHNCQUFJLDZDQUFXO1FBRGYsMkZBQTJGOzs7Ozs7O1FBQzNGLFVBQWdCLFdBQXlDO1lBQXpELGlCQU9DO1lBTkMsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUU7Z0JBQzFCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQzthQUN0QztZQUVELElBQUksQ0FBQyxhQUFhLEdBQUcsa0JBQWtC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Qjs7SUE2RWhDLDJCQUFDO0NBQUEsQUF6RUQsSUF5RUM7U0F4RVksb0JBQW9COzs7Ozs7SUFDL0IsaURBQXdDOzs7OztJQUV4Qyw2Q0FBK0M7Ozs7O0lBa0IvQyw2Q0FBMkM7Ozs7O0lBTi9CLGtDQUFzQjs7Ozs7SUFBRSx3Q0FBMkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIE9uRGVzdHJveSwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBEYXRhZ3JpZFJlbmRlclN0ZXAgfSBmcm9tICcuLi9lbnVtcy9yZW5kZXItc3RlcC5lbnVtJztcblxuaW1wb3J0IHsgSElEREVOX0NPTFVNTl9DTEFTUywgU1RSSUNUX1dJRFRIX0NMQVNTIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgRGF0YWdyaWRSZW5kZXJPcmdhbml6ZXIgfSBmcm9tICcuL3JlbmRlci1vcmdhbml6ZXInO1xuaW1wb3J0IHsgQ29sdW1uU3RhdGUgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2NvbHVtbi1zdGF0ZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQUxMX0NPTFVNTl9DSEFOR0VTLCBEYXRhZ3JpZENvbHVtbkNoYW5nZXMgfSBmcm9tICcuLi9lbnVtcy9jb2x1bW4tY2hhbmdlcy5lbnVtJztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnY2xyLWRnLWNlbGwnIH0pXG5leHBvcnQgY2xhc3MgRGF0YWdyaWRDZWxsUmVuZGVyZXIgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBwcml2YXRlIHN0YXRlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgcHJpdmF0ZSBydW5BbGxDaGFuZ2VzOiBEYXRhZ3JpZENvbHVtbkNoYW5nZXNbXTtcblxuICAvLyBAVE9ETyhKRVJFTVkpIFdvcmsgb3V0IGhvdyB0byBkZWR1cGUgc29tZSBvZiB0aGlzIGNvZGUgYmV0d2VlbiBoZWFkZXIgYW5kIGNlbGwgcmVuZGVyZXJzXG4gIHNldCBjb2x1bW5TdGF0ZShjb2x1bW5TdGF0ZTogQmVoYXZpb3JTdWJqZWN0PENvbHVtblN0YXRlPikge1xuICAgIGlmICh0aGlzLnN0YXRlU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnN0YXRlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgdGhpcy5ydW5BbGxDaGFuZ2VzID0gQUxMX0NPTFVNTl9DSEFOR0VTO1xuICAgIHRoaXMuc3RhdGVTdWJzY3JpcHRpb24gPSBjb2x1bW5TdGF0ZS5zdWJzY3JpYmUoc3RhdGUgPT4gdGhpcy5zdGF0ZUNoYW5nZXMoc3RhdGUpKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMiwgb3JnYW5pemVyOiBEYXRhZ3JpZFJlbmRlck9yZ2FuaXplcikge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgb3JnYW5pemVyLmZpbHRlclJlbmRlclN0ZXBzKERhdGFncmlkUmVuZGVyU3RlcC5DTEVBUl9XSURUSFMpLnN1YnNjcmliZSgoKSA9PiB0aGlzLmNsZWFyV2lkdGgoKSlcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHN1YiA9PiBzdWIudW5zdWJzY3JpYmUoKSk7XG4gICAgaWYgKHRoaXMuc3RhdGVTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuc3RhdGVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHN0YXRlQ2hhbmdlcyhzdGF0ZTogQ29sdW1uU3RhdGUpIHtcbiAgICBpZiAodGhpcy5ydW5BbGxDaGFuZ2VzKSB7XG4gICAgICBzdGF0ZS5jaGFuZ2VzID0gdGhpcy5ydW5BbGxDaGFuZ2VzO1xuICAgICAgZGVsZXRlIHRoaXMucnVuQWxsQ2hhbmdlcztcbiAgICB9XG4gICAgaWYgKHN0YXRlLmNoYW5nZXMgJiYgc3RhdGUuY2hhbmdlcy5sZW5ndGgpIHtcbiAgICAgIHN0YXRlLmNoYW5nZXMuZm9yRWFjaChjaGFuZ2UgPT4ge1xuICAgICAgICBzd2l0Y2ggKGNoYW5nZSkge1xuICAgICAgICAgIGNhc2UgRGF0YWdyaWRDb2x1bW5DaGFuZ2VzLldJRFRIOlxuICAgICAgICAgICAgdGhpcy5zZXRXaWR0aChzdGF0ZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIERhdGFncmlkQ29sdW1uQ2hhbmdlcy5ISURERU46XG4gICAgICAgICAgICB0aGlzLnNldEhpZGRlbihzdGF0ZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY2xlYXJXaWR0aCgpIHtcbiAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgU1RSSUNUX1dJRFRIX0NMQVNTKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3dpZHRoJywgbnVsbCk7XG4gIH1cblxuICBwcml2YXRlIHNldFdpZHRoKHN0YXRlOiBDb2x1bW5TdGF0ZSkge1xuICAgIGlmIChzdGF0ZS5zdHJpY3RXaWR0aCkge1xuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIFNUUklDVF9XSURUSF9DTEFTUyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCBTVFJJQ1RfV0lEVEhfQ0xBU1MpO1xuICAgIH1cbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3dpZHRoJywgc3RhdGUud2lkdGggKyAncHgnKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0SGlkZGVuKHN0YXRlOiBDb2x1bW5TdGF0ZSkge1xuICAgIGlmIChzdGF0ZS5oaWRkZW4pIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCBISURERU5fQ09MVU1OX0NMQVNTKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIEhJRERFTl9DT0xVTU5fQ0xBU1MpO1xuICAgIH1cbiAgfVxufVxuIl19