/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive, ElementRef, EventEmitter, Inject, Output, Renderer2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DomAdapter } from '../../../utils/dom-adapter/dom-adapter';
import { DatagridRenderStep } from '../enums/render-step.enum';
import { ColumnResizerService } from '../providers/column-resizer.service';
import { STRICT_WIDTH_CLASS } from './constants';
import { DatagridRenderOrganizer } from './render-organizer';
import { DatagridColumnChanges } from '../enums/column-changes.enum';
import { COLUMN_STATE, COLUMN_STATE_PROVIDER } from '../providers/column-state.provider';
var DatagridHeaderRenderer = /** @class */ (function () {
    function DatagridHeaderRenderer(el, renderer, organizer, domAdapter, columnResizerService, columnState) {
        var _this = this;
        this.el = el;
        this.renderer = renderer;
        this.organizer = organizer;
        this.domAdapter = domAdapter;
        this.columnResizerService = columnResizerService;
        this.columnState = columnState;
        this.resizeEmitter = new EventEmitter();
        /**
         * Indicates if the column has a strict width, so it doesn't shrink or expand based on the content.
         */
        this.widthSet = false;
        this.autoSet = false;
        this.subscriptions = [];
        this.subscriptions.push(this.organizer.filterRenderSteps(DatagridRenderStep.CLEAR_WIDTHS).subscribe((/**
         * @return {?}
         */
        function () { return _this.clearWidth(); })));
        this.subscriptions.push(this.organizer
            .filterRenderSteps(DatagridRenderStep.DETECT_STRICT_WIDTHS)
            .subscribe((/**
         * @return {?}
         */
        function () { return _this.detectStrictWidth(); })));
        this.subscriptions.push(columnState.subscribe((/**
         * @param {?} state
         * @return {?}
         */
        function (state) { return _this.stateChanges(state); })));
    }
    /**
     * @return {?}
     */
    DatagridHeaderRenderer.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        function (sub) { return sub.unsubscribe(); }));
    };
    /**
     * @private
     * @param {?} state
     * @return {?}
     */
    DatagridHeaderRenderer.prototype.stateChanges = /**
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
    DatagridHeaderRenderer.prototype.clearWidth = /**
     * @private
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
     * @private
     * @return {?}
     */
    DatagridHeaderRenderer.prototype.detectStrictWidth = /**
     * @private
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
     * @private
     * @param {?} strictWidth
     * @return {?}
     */
    DatagridHeaderRenderer.prototype.computeWidth = /**
     * @private
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
     * @private
     * @param {?} state
     * @return {?}
     */
    DatagridHeaderRenderer.prototype.setWidth = /**
     * @private
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
        { type: Directive, args: [{ selector: 'clr-dg-column', providers: [ColumnResizerService, COLUMN_STATE_PROVIDER] },] }
    ];
    /** @nocollapse */
    DatagridHeaderRenderer.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: DatagridRenderOrganizer },
        { type: DomAdapter },
        { type: ColumnResizerService },
        { type: BehaviorSubject, decorators: [{ type: Inject, args: [COLUMN_STATE,] }] }
    ]; };
    DatagridHeaderRenderer.propDecorators = {
        resizeEmitter: [{ type: Output, args: ['clrDgColumnResize',] }]
    };
    return DatagridHeaderRenderer;
}());
export { DatagridHeaderRenderer };
if (false) {
    /** @type {?} */
    DatagridHeaderRenderer.prototype.resizeEmitter;
    /**
     * Indicates if the column has a strict width, so it doesn't shrink or expand based on the content.
     * @type {?}
     * @private
     */
    DatagridHeaderRenderer.prototype.widthSet;
    /**
     * @type {?}
     * @private
     */
    DatagridHeaderRenderer.prototype.autoSet;
    /**
     * @type {?}
     * @private
     */
    DatagridHeaderRenderer.prototype.subscriptions;
    /**
     * @type {?}
     * @private
     */
    DatagridHeaderRenderer.prototype.el;
    /**
     * @type {?}
     * @private
     */
    DatagridHeaderRenderer.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    DatagridHeaderRenderer.prototype.organizer;
    /**
     * @type {?}
     * @private
     */
    DatagridHeaderRenderer.prototype.domAdapter;
    /**
     * @type {?}
     * @private
     */
    DatagridHeaderRenderer.prototype.columnResizerService;
    /** @type {?} */
    DatagridHeaderRenderer.prototype.columnState;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLXJlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9yZW5kZXIvaGVhZGVyLXJlbmRlcmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQWEsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRyxPQUFPLEVBQUUsZUFBZSxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUVyRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDcEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDL0QsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDM0UsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ2pELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRTdELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxZQUFZLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUV6RjtJQUVFLGdDQUNVLEVBQWMsRUFDZCxRQUFtQixFQUNuQixTQUFrQyxFQUNsQyxVQUFzQixFQUN0QixvQkFBMEMsRUFDckIsV0FBaUQ7UUFOaEYsaUJBa0JDO1FBakJTLE9BQUUsR0FBRixFQUFFLENBQVk7UUFDZCxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25CLGNBQVMsR0FBVCxTQUFTLENBQXlCO1FBQ2xDLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUNyQixnQkFBVyxHQUFYLFdBQVcsQ0FBc0M7UUFjbkQsa0JBQWEsR0FBeUIsSUFBSSxZQUFZ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QUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztTQUNyQjtJQUNILENBQUM7O2dCQXRHRixTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSxDQUFDLG9CQUFvQixFQUFFLHFCQUFxQixDQUFDLEVBQUU7Ozs7Z0JBWjlFLFVBQVU7Z0JBQTJDLFNBQVM7Z0JBT3pFLHVCQUF1QjtnQkFKdkIsVUFBVTtnQkFFVixvQkFBb0I7Z0JBSnBCLGVBQWUsdUJBbUJuQixNQUFNLFNBQUMsWUFBWTs7O2dDQWNyQixNQUFNLFNBQUMsbUJBQW1COztJQWlGN0IsNkJBQUM7Q0FBQSxBQXZHRCxJQXVHQztTQXRHWSxzQkFBc0I7OztJQXFCakMsK0NBQXNGOzs7Ozs7SUFLdEYsMENBQWtDOzs7OztJQUNsQyx5Q0FBaUM7Ozs7O0lBRWpDLCtDQUEyQzs7Ozs7SUEzQnpDLG9DQUFzQjs7Ozs7SUFDdEIsMENBQTJCOzs7OztJQUMzQiwyQ0FBMEM7Ozs7O0lBQzFDLDRDQUE4Qjs7Ozs7SUFDOUIsc0RBQWtEOztJQUNsRCw2Q0FBOEUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5qZWN0LCBPbkRlc3Ryb3ksIE91dHB1dCwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBEb21BZGFwdGVyIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvZG9tLWFkYXB0ZXIvZG9tLWFkYXB0ZXInO1xuaW1wb3J0IHsgRGF0YWdyaWRSZW5kZXJTdGVwIH0gZnJvbSAnLi4vZW51bXMvcmVuZGVyLXN0ZXAuZW51bSc7XG5pbXBvcnQgeyBDb2x1bW5SZXNpemVyU2VydmljZSB9IGZyb20gJy4uL3Byb3ZpZGVycy9jb2x1bW4tcmVzaXplci5zZXJ2aWNlJztcbmltcG9ydCB7IFNUUklDVF9XSURUSF9DTEFTUyB9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7IERhdGFncmlkUmVuZGVyT3JnYW5pemVyIH0gZnJvbSAnLi9yZW5kZXItb3JnYW5pemVyJztcbmltcG9ydCB7IERhdGFncmlkQ29sdW1uU3RhdGUgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2NvbHVtbi1zdGF0ZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgRGF0YWdyaWRDb2x1bW5DaGFuZ2VzIH0gZnJvbSAnLi4vZW51bXMvY29sdW1uLWNoYW5nZXMuZW51bSc7XG5pbXBvcnQgeyBDT0xVTU5fU1RBVEUsIENPTFVNTl9TVEFURV9QUk9WSURFUiB9IGZyb20gJy4uL3Byb3ZpZGVycy9jb2x1bW4tc3RhdGUucHJvdmlkZXInO1xuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdjbHItZGctY29sdW1uJywgcHJvdmlkZXJzOiBbQ29sdW1uUmVzaXplclNlcnZpY2UsIENPTFVNTl9TVEFURV9QUk9WSURFUl0gfSlcbmV4cG9ydCBjbGFzcyBEYXRhZ3JpZEhlYWRlclJlbmRlcmVyIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBvcmdhbml6ZXI6IERhdGFncmlkUmVuZGVyT3JnYW5pemVyLFxuICAgIHByaXZhdGUgZG9tQWRhcHRlcjogRG9tQWRhcHRlcixcbiAgICBwcml2YXRlIGNvbHVtblJlc2l6ZXJTZXJ2aWNlOiBDb2x1bW5SZXNpemVyU2VydmljZSxcbiAgICBASW5qZWN0KENPTFVNTl9TVEFURSkgcHVibGljIGNvbHVtblN0YXRlOiBCZWhhdmlvclN1YmplY3Q8RGF0YWdyaWRDb2x1bW5TdGF0ZT5cbiAgKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLm9yZ2FuaXplci5maWx0ZXJSZW5kZXJTdGVwcyhEYXRhZ3JpZFJlbmRlclN0ZXAuQ0xFQVJfV0lEVEhTKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jbGVhcldpZHRoKCkpXG4gICAgKTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMub3JnYW5pemVyXG4gICAgICAgIC5maWx0ZXJSZW5kZXJTdGVwcyhEYXRhZ3JpZFJlbmRlclN0ZXAuREVURUNUX1NUUklDVF9XSURUSFMpXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5kZXRlY3RTdHJpY3RXaWR0aCgpKVxuICAgICk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChjb2x1bW5TdGF0ZS5zdWJzY3JpYmUoc3RhdGUgPT4gdGhpcy5zdGF0ZUNoYW5nZXMoc3RhdGUpKSk7XG4gIH1cblxuICBAT3V0cHV0KCdjbHJEZ0NvbHVtblJlc2l6ZScpIHJlc2l6ZUVtaXR0ZXI6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgaWYgdGhlIGNvbHVtbiBoYXMgYSBzdHJpY3Qgd2lkdGgsIHNvIGl0IGRvZXNuJ3Qgc2hyaW5rIG9yIGV4cGFuZCBiYXNlZCBvbiB0aGUgY29udGVudC5cbiAgICovXG4gIHByaXZhdGUgd2lkdGhTZXQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBhdXRvU2V0OiBib29sZWFuID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHN1YiA9PiBzdWIudW5zdWJzY3JpYmUoKSk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRlQ2hhbmdlcyhzdGF0ZTogRGF0YWdyaWRDb2x1bW5TdGF0ZSkge1xuICAgIGlmIChzdGF0ZS5jaGFuZ2VzICYmIHN0YXRlLmNoYW5nZXMubGVuZ3RoKSB7XG4gICAgICBzdGF0ZS5jaGFuZ2VzLmZvckVhY2goY2hhbmdlID0+IHtcbiAgICAgICAgc3dpdGNoIChjaGFuZ2UpIHtcbiAgICAgICAgICBjYXNlIERhdGFncmlkQ29sdW1uQ2hhbmdlcy5XSURUSDpcbiAgICAgICAgICAgIHRoaXMuc2V0V2lkdGgoc3RhdGUpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNsZWFyV2lkdGgoKSB7XG4gICAgLy8gcmVtb3ZlIHRoZSB3aWR0aCBvbmx5IGlmIHdlIHNldCBpdCwgYW5kIGl0IGlzIG5vdCBjaGFuZ2VkIGJ5IGRyYWdnaW5nLlxuICAgIGlmICh0aGlzLndpZHRoU2V0ICYmICF0aGlzLmNvbHVtblJlc2l6ZXJTZXJ2aWNlLnJlc2l6ZWRCeSkge1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICd3aWR0aCcsIG51bGwpO1xuICAgIH1cbiAgICBpZiAodGhpcy5hdXRvU2V0KSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgU1RSSUNUX1dJRFRIX0NMQVNTKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGRldGVjdFN0cmljdFdpZHRoKCk6IG51bWJlciB7XG4gICAgaWYgKHRoaXMuY29sdW1uUmVzaXplclNlcnZpY2UucmVzaXplZEJ5KSB7XG4gICAgICByZXR1cm4gdGhpcy5jb2x1bW5SZXNpemVyU2VydmljZS53aWR0aEFmdGVyUmVzaXplO1xuICAgIH0gZWxzZSBpZiAodGhpcy5hdXRvU2V0KSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuZG9tQWRhcHRlci51c2VyRGVmaW5lZFdpZHRoKHRoaXMuZWwubmF0aXZlRWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjb21wdXRlV2lkdGgoc3RyaWN0V2lkdGg6IG51bWJlcik6IG51bWJlciB7XG4gICAgbGV0IHdpZHRoOiBudW1iZXIgPSBzdHJpY3RXaWR0aDtcbiAgICBpZiAoIXdpZHRoKSB7XG4gICAgICB3aWR0aCA9IHRoaXMuZG9tQWRhcHRlci5zY3JvbGxXaWR0aCh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpO1xuICAgIH1cbiAgICByZXR1cm4gd2lkdGg7XG4gIH1cblxuICBwdWJsaWMgZ2V0Q29sdW1uV2lkdGhTdGF0ZSgpOiBQYXJ0aWFsPERhdGFncmlkQ29sdW1uU3RhdGU+IHtcbiAgICBjb25zdCBzdHJpY3RXaWR0aCA9IHRoaXMuZGV0ZWN0U3RyaWN0V2lkdGgoKTtcbiAgICByZXR1cm4ge1xuICAgICAgd2lkdGg6IHRoaXMuY29tcHV0ZVdpZHRoKHN0cmljdFdpZHRoKSxcbiAgICAgIHN0cmljdFdpZHRoOiBzdHJpY3RXaWR0aCxcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRXaWR0aChzdGF0ZTogRGF0YWdyaWRDb2x1bW5TdGF0ZSkge1xuICAgIGlmIChzdGF0ZS5zdHJpY3RXaWR0aCkge1xuICAgICAgaWYgKHRoaXMuY29sdW1uUmVzaXplclNlcnZpY2UucmVzaXplZEJ5KSB7XG4gICAgICAgIHRoaXMucmVzaXplRW1pdHRlci5lbWl0KHN0YXRlLndpZHRoKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICd3aWR0aCcsIHN0YXRlLndpZHRoICsgJ3B4Jyk7XG4gICAgICAgIHRoaXMud2lkdGhTZXQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIC8vIERvbid0IHNldCB3aWR0aCBpZiB0aGVyZSBpcyBhIHVzZXItZGVmaW5lZCBvbmUuIEp1c3QgYWRkIHRoZSBzdHJpY3Qgd2lkdGggY2xhc3MuXG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgU1RSSUNUX1dJRFRIX0NMQVNTKTtcbiAgICAgIHRoaXMuYXV0b1NldCA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgU1RSSUNUX1dJRFRIX0NMQVNTKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnd2lkdGgnLCBzdGF0ZS53aWR0aCArICdweCcpO1xuICAgICAgdGhpcy53aWR0aFNldCA9IHRydWU7XG4gICAgICB0aGlzLmF1dG9TZXQgPSB0cnVlO1xuICAgIH1cbiAgfVxufVxuIl19