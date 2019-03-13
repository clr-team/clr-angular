/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive, ElementRef, EventEmitter, Output, Renderer2 } from '@angular/core';
import { DomAdapter } from '../../../utils/dom-adapter/dom-adapter';
import { DatagridRenderStep } from '../enums/render-step.enum';
import { ColumnResizerService } from '../providers/column-resizer.service';
import { STRICT_WIDTH_CLASS } from './constants';
import { DatagridRenderOrganizer } from './render-organizer';
import { DatagridColumnChanges } from '../enums/column-changes.enum';
var DatagridHeaderRenderer = /** @class */ (function () {
    function DatagridHeaderRenderer(el, renderer, organizer, domAdapter, columnResizerService) {
        var _this = this;
        this.el = el;
        this.renderer = renderer;
        this.organizer = organizer;
        this.domAdapter = domAdapter;
        this.columnResizerService = columnResizerService;
        this.resizeEmitter = new EventEmitter();
        /**
         * Indicates if the column has a strict width, so it doesn't shrink or expand based on the content.
         */
        this.widthSet = false;
        this.autoSet = false;
        this.subscriptions = [];
        this.subscriptions.push(this.organizer.filterRenderSteps(DatagridRenderStep.CLEAR_WIDTHS).subscribe(function () { return _this.clearWidth(); }));
        this.subscriptions.push(this.organizer
            .filterRenderSteps(DatagridRenderStep.DETECT_STRICT_WIDTHS)
            .subscribe(function () { return _this.detectStrictWidth(); }));
    }
    Object.defineProperty(DatagridHeaderRenderer.prototype, "columnState", {
        set: /**
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
    DatagridHeaderRenderer.prototype.ngOnDestroy = /**
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
    DatagridHeaderRenderer.prototype.stateChanges = /**
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
    DatagridHeaderRenderer.prototype.clearWidth = /**
     * @return {?}
     */
    function () {
        // remove the width only if we set it, and it is not changed by dragging.
        if (this.widthSet && !this.columnResizerService.resizedBy) {
            this.renderer.setStyle(this.el.nativeElement, 'width', null);
        }
        if (this.autoSet) {
            this.renderer.removeClass(this.el.nativeElement, STRICT_WIDTH_CLASS);
        }
    };
    /**
     * @return {?}
     */
    DatagridHeaderRenderer.prototype.detectStrictWidth = /**
     * @return {?}
     */
    function () {
        if (this.columnResizerService.resizedBy) {
            return this.columnResizerService.widthAfterResize;
        }
        else if (this.autoSet) {
            return 0;
        }
        else {
            return this.domAdapter.userDefinedWidth(this.el.nativeElement);
        }
    };
    /**
     * @param {?} strictWidth
     * @return {?}
     */
    DatagridHeaderRenderer.prototype.computeWidth = /**
     * @param {?} strictWidth
     * @return {?}
     */
    function (strictWidth) {
        /** @type {?} */
        var width = strictWidth;
        if (!width) {
            width = this.domAdapter.scrollWidth(this.el.nativeElement);
        }
        return width;
    };
    /**
     * @return {?}
     */
    DatagridHeaderRenderer.prototype.getColumnWidthState = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var strictWidth = this.detectStrictWidth();
        return {
            width: this.computeWidth(strictWidth),
            strictWidth: strictWidth,
        };
    };
    /**
     * @param {?} state
     * @return {?}
     */
    DatagridHeaderRenderer.prototype.setWidth = /**
     * @param {?} state
     * @return {?}
     */
    function (state) {
        if (state.strictWidth) {
            if (this.columnResizerService.resizedBy) {
                this.resizeEmitter.emit(state.width);
                this.renderer.setStyle(this.el.nativeElement, 'width', state.width + 'px');
                this.widthSet = false;
            }
            // Don't set width if there is a user-defined one. Just add the strict width class.
            this.renderer.addClass(this.el.nativeElement, STRICT_WIDTH_CLASS);
            this.autoSet = false;
        }
        else {
            this.renderer.removeClass(this.el.nativeElement, STRICT_WIDTH_CLASS);
            this.renderer.setStyle(this.el.nativeElement, 'width', state.width + 'px');
            this.widthSet = true;
            this.autoSet = true;
        }
    };
    DatagridHeaderRenderer.decorators = [
        { type: Directive, args: [{ selector: 'clr-dg-column', providers: [ColumnResizerService] },] }
    ];
    /** @nocollapse */
    DatagridHeaderRenderer.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: DatagridRenderOrganizer },
        { type: DomAdapter },
        { type: ColumnResizerService }
    ]; };
    DatagridHeaderRenderer.propDecorators = {
        resizeEmitter: [{ type: Output, args: ['clrDgColumnResize',] }]
    };
    return DatagridHeaderRenderer;
}());
export { DatagridHeaderRenderer };
if (false) {
    /** @type {?} */
    DatagridHeaderRenderer.prototype.stateSubscription;
    /** @type {?} */
    DatagridHeaderRenderer.prototype.resizeEmitter;
    /**
     * Indicates if the column has a strict width, so it doesn't shrink or expand based on the content.
     * @type {?}
     */
    DatagridHeaderRenderer.prototype.widthSet;
    /** @type {?} */
    DatagridHeaderRenderer.prototype.autoSet;
    /** @type {?} */
    DatagridHeaderRenderer.prototype.subscriptions;
    /** @type {?} */
    DatagridHeaderRenderer.prototype.el;
    /** @type {?} */
    DatagridHeaderRenderer.prototype.renderer;
    /** @type {?} */
    DatagridHeaderRenderer.prototype.organizer;
    /** @type {?} */
    DatagridHeaderRenderer.prototype.domAdapter;
    /** @type {?} */
    DatagridHeaderRenderer.prototype.columnResizerService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLXJlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9yZW5kZXIvaGVhZGVyLXJlbmRlcmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBYSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBR2xHLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNwRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUMzRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDakQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFN0QsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFFckU7SUFXRSxnQ0FDVSxFQUFjLEVBQ2QsUUFBbUIsRUFDbkIsU0FBa0MsRUFDbEMsVUFBc0IsRUFDdEIsb0JBQTBDO1FBTHBELGlCQWVDO1FBZFMsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUNkLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsY0FBUyxHQUFULFNBQVMsQ0FBeUI7UUFDbEMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0Qix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBWXZCLGtCQUFhLEdBQXlCLElBQUksWUFBWSxFQUFFLENBQUM7Ozs7UUFLOUUsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUMxQixZQUFPLEdBQVksS0FBSyxDQUFDO1FBRXpCLGtCQUFhLEdBQW1CLEVBQUUsQ0FBQztRQWxCekMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQ3JCLElBQUksQ0FBQyxTQUFTLENB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QUFDO1lBQzNFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1NBQ3JCO0lBQ0gsQ0FBQzs7Z0JBL0dGLFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFFLENBQUMsb0JBQW9CLENBQUMsRUFBRTs7OztnQkFYdkQsVUFBVTtnQkFBbUMsU0FBUztnQkFPakUsdUJBQXVCO2dCQUp2QixVQUFVO2dCQUVWLG9CQUFvQjs7O2dDQWtDMUIsTUFBTSxTQUFDLG1CQUFtQjs7SUFvRjdCLDZCQUFDO0NBQUEsQUFoSEQsSUFnSEM7U0EvR1ksc0JBQXNCOzs7SUFDakMsbURBQXdDOztJQTBCeEMsK0NBQXNGOzs7OztJQUt0RiwwQ0FBa0M7O0lBQ2xDLHlDQUFpQzs7SUFFakMsK0NBQTJDOztJQXhCekMsb0NBQXNCOztJQUN0QiwwQ0FBMkI7O0lBQzNCLDJDQUEwQzs7SUFDMUMsNENBQThCOztJQUM5QixzREFBa0QiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgT25EZXN0cm95LCBPdXRwdXQsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgRG9tQWRhcHRlciB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2RvbS1hZGFwdGVyL2RvbS1hZGFwdGVyJztcbmltcG9ydCB7IERhdGFncmlkUmVuZGVyU3RlcCB9IGZyb20gJy4uL2VudW1zL3JlbmRlci1zdGVwLmVudW0nO1xuaW1wb3J0IHsgQ29sdW1uUmVzaXplclNlcnZpY2UgfSBmcm9tICcuLi9wcm92aWRlcnMvY29sdW1uLXJlc2l6ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBTVFJJQ1RfV0lEVEhfQ0xBU1MgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBEYXRhZ3JpZFJlbmRlck9yZ2FuaXplciB9IGZyb20gJy4vcmVuZGVyLW9yZ2FuaXplcic7XG5pbXBvcnQgeyBEYXRhZ3JpZENvbHVtblN0YXRlIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9jb2x1bW4tc3RhdGUuaW50ZXJmYWNlJztcbmltcG9ydCB7IERhdGFncmlkQ29sdW1uQ2hhbmdlcyB9IGZyb20gJy4uL2VudW1zL2NvbHVtbi1jaGFuZ2VzLmVudW0nO1xuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdjbHItZGctY29sdW1uJywgcHJvdmlkZXJzOiBbQ29sdW1uUmVzaXplclNlcnZpY2VdIH0pXG5leHBvcnQgY2xhc3MgRGF0YWdyaWRIZWFkZXJSZW5kZXJlciBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgc3RhdGVTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICBzZXQgY29sdW1uU3RhdGUoY29sdW1uU3RhdGU6IEJlaGF2aW9yU3ViamVjdDxEYXRhZ3JpZENvbHVtblN0YXRlPikge1xuICAgIGlmICh0aGlzLnN0YXRlU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnN0YXRlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIHRoaXMuc3RhdGVTdWJzY3JpcHRpb24gPSBjb2x1bW5TdGF0ZS5zdWJzY3JpYmUoc3RhdGUgPT4gdGhpcy5zdGF0ZUNoYW5nZXMoc3RhdGUpKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgb3JnYW5pemVyOiBEYXRhZ3JpZFJlbmRlck9yZ2FuaXplcixcbiAgICBwcml2YXRlIGRvbUFkYXB0ZXI6IERvbUFkYXB0ZXIsXG4gICAgcHJpdmF0ZSBjb2x1bW5SZXNpemVyU2VydmljZTogQ29sdW1uUmVzaXplclNlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLm9yZ2FuaXplci5maWx0ZXJSZW5kZXJTdGVwcyhEYXRhZ3JpZFJlbmRlclN0ZXAuQ0xFQVJfV0lEVEhTKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jbGVhcldpZHRoKCkpXG4gICAgKTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMub3JnYW5pemVyXG4gICAgICAgIC5maWx0ZXJSZW5kZXJTdGVwcyhEYXRhZ3JpZFJlbmRlclN0ZXAuREVURUNUX1NUUklDVF9XSURUSFMpXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5kZXRlY3RTdHJpY3RXaWR0aCgpKVxuICAgICk7XG4gIH1cblxuICBAT3V0cHV0KCdjbHJEZ0NvbHVtblJlc2l6ZScpIHJlc2l6ZUVtaXR0ZXI6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgaWYgdGhlIGNvbHVtbiBoYXMgYSBzdHJpY3Qgd2lkdGgsIHNvIGl0IGRvZXNuJ3Qgc2hyaW5rIG9yIGV4cGFuZCBiYXNlZCBvbiB0aGUgY29udGVudC5cbiAgICovXG4gIHByaXZhdGUgd2lkdGhTZXQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBhdXRvU2V0OiBib29sZWFuID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHN1YiA9PiBzdWIudW5zdWJzY3JpYmUoKSk7XG4gICAgaWYgKHRoaXMuc3RhdGVTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuc3RhdGVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHN0YXRlQ2hhbmdlcyhzdGF0ZTogRGF0YWdyaWRDb2x1bW5TdGF0ZSkge1xuICAgIGlmIChzdGF0ZS5jaGFuZ2VzICYmIHN0YXRlLmNoYW5nZXMubGVuZ3RoKSB7XG4gICAgICBzdGF0ZS5jaGFuZ2VzLmZvckVhY2goY2hhbmdlID0+IHtcbiAgICAgICAgc3dpdGNoIChjaGFuZ2UpIHtcbiAgICAgICAgICBjYXNlIERhdGFncmlkQ29sdW1uQ2hhbmdlcy5XSURUSDpcbiAgICAgICAgICAgIHRoaXMuc2V0V2lkdGgoc3RhdGUpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNsZWFyV2lkdGgoKSB7XG4gICAgLy8gcmVtb3ZlIHRoZSB3aWR0aCBvbmx5IGlmIHdlIHNldCBpdCwgYW5kIGl0IGlzIG5vdCBjaGFuZ2VkIGJ5IGRyYWdnaW5nLlxuICAgIGlmICh0aGlzLndpZHRoU2V0ICYmICF0aGlzLmNvbHVtblJlc2l6ZXJTZXJ2aWNlLnJlc2l6ZWRCeSkge1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICd3aWR0aCcsIG51bGwpO1xuICAgIH1cbiAgICBpZiAodGhpcy5hdXRvU2V0KSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgU1RSSUNUX1dJRFRIX0NMQVNTKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGRldGVjdFN0cmljdFdpZHRoKCk6IG51bWJlciB7XG4gICAgaWYgKHRoaXMuY29sdW1uUmVzaXplclNlcnZpY2UucmVzaXplZEJ5KSB7XG4gICAgICByZXR1cm4gdGhpcy5jb2x1bW5SZXNpemVyU2VydmljZS53aWR0aEFmdGVyUmVzaXplO1xuICAgIH0gZWxzZSBpZiAodGhpcy5hdXRvU2V0KSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuZG9tQWRhcHRlci51c2VyRGVmaW5lZFdpZHRoKHRoaXMuZWwubmF0aXZlRWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjb21wdXRlV2lkdGgoc3RyaWN0V2lkdGg6IG51bWJlcik6IG51bWJlciB7XG4gICAgbGV0IHdpZHRoOiBudW1iZXIgPSBzdHJpY3RXaWR0aDtcbiAgICBpZiAoIXdpZHRoKSB7XG4gICAgICB3aWR0aCA9IHRoaXMuZG9tQWRhcHRlci5zY3JvbGxXaWR0aCh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpO1xuICAgIH1cbiAgICByZXR1cm4gd2lkdGg7XG4gIH1cblxuICBwdWJsaWMgZ2V0Q29sdW1uV2lkdGhTdGF0ZSgpOiBQYXJ0aWFsPERhdGFncmlkQ29sdW1uU3RhdGU+IHtcbiAgICBjb25zdCBzdHJpY3RXaWR0aCA9IHRoaXMuZGV0ZWN0U3RyaWN0V2lkdGgoKTtcbiAgICByZXR1cm4ge1xuICAgICAgd2lkdGg6IHRoaXMuY29tcHV0ZVdpZHRoKHN0cmljdFdpZHRoKSxcbiAgICAgIHN0cmljdFdpZHRoOiBzdHJpY3RXaWR0aCxcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRXaWR0aChzdGF0ZTogRGF0YWdyaWRDb2x1bW5TdGF0ZSkge1xuICAgIGlmIChzdGF0ZS5zdHJpY3RXaWR0aCkge1xuICAgICAgaWYgKHRoaXMuY29sdW1uUmVzaXplclNlcnZpY2UucmVzaXplZEJ5KSB7XG4gICAgICAgIHRoaXMucmVzaXplRW1pdHRlci5lbWl0KHN0YXRlLndpZHRoKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICd3aWR0aCcsIHN0YXRlLndpZHRoICsgJ3B4Jyk7XG4gICAgICAgIHRoaXMud2lkdGhTZXQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIC8vIERvbid0IHNldCB3aWR0aCBpZiB0aGVyZSBpcyBhIHVzZXItZGVmaW5lZCBvbmUuIEp1c3QgYWRkIHRoZSBzdHJpY3Qgd2lkdGggY2xhc3MuXG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgU1RSSUNUX1dJRFRIX0NMQVNTKTtcbiAgICAgIHRoaXMuYXV0b1NldCA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgU1RSSUNUX1dJRFRIX0NMQVNTKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnd2lkdGgnLCBzdGF0ZS53aWR0aCArICdweCcpO1xuICAgICAgdGhpcy53aWR0aFNldCA9IHRydWU7XG4gICAgICB0aGlzLmF1dG9TZXQgPSB0cnVlO1xuICAgIH1cbiAgfVxufVxuIl19