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
export class DatagridHeaderRenderer {
    /**
     * @param {?} el
     * @param {?} renderer
     * @param {?} organizer
     * @param {?} domAdapter
     * @param {?} columnResizerService
     * @param {?} columnState
     */
    constructor(el, renderer, organizer, domAdapter, columnResizerService, columnState) {
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
        () => this.clearWidth())));
        this.subscriptions.push(this.organizer
            .filterRenderSteps(DatagridRenderStep.DETECT_STRICT_WIDTHS)
            .subscribe((/**
         * @return {?}
         */
        () => this.detectStrictWidth())));
        this.subscriptions.push(columnState.subscribe((/**
         * @param {?} state
         * @return {?}
         */
        state => this.stateChanges(state))));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        sub => sub.unsubscribe()));
    }
    /**
     * @private
     * @param {?} state
     * @return {?}
     */
    stateChanges(state) {
        if (state.changes && state.changes.length) {
            state.changes.forEach((/**
             * @param {?} change
             * @return {?}
             */
            change => {
                switch (change) {
                    case DatagridColumnChanges.WIDTH:
                        this.setWidth(state);
                        break;
                    default:
                        break;
                }
            }));
        }
    }
    /**
     * @private
     * @return {?}
     */
    clearWidth() {
        // remove the width only if we set it, and it is not changed by dragging.
        if (this.widthSet && !this.columnResizerService.resizedBy) {
            this.renderer.setStyle(this.el.nativeElement, 'width', null);
        }
        if (this.autoSet) {
            this.renderer.removeClass(this.el.nativeElement, STRICT_WIDTH_CLASS);
        }
    }
    /**
     * @private
     * @return {?}
     */
    detectStrictWidth() {
        if (this.columnResizerService.resizedBy) {
            return this.columnResizerService.widthAfterResize;
        }
        else if (this.autoSet) {
            return 0;
        }
        else {
            return this.domAdapter.userDefinedWidth(this.el.nativeElement);
        }
    }
    /**
     * @private
     * @param {?} strictWidth
     * @return {?}
     */
    computeWidth(strictWidth) {
        /** @type {?} */
        let width = strictWidth;
        if (!width) {
            width = this.domAdapter.scrollWidth(this.el.nativeElement);
        }
        return width;
    }
    /**
     * @return {?}
     */
    getColumnWidthState() {
        /** @type {?} */
        const strictWidth = this.detectStrictWidth();
        return {
            width: this.computeWidth(strictWidth),
            strictWidth: strictWidth,
        };
    }
    /**
     * @private
     * @param {?} state
     * @return {?}
     */
    setWidth(state) {
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
    }
}
DatagridHeaderRenderer.decorators = [
    { type: Directive, args: [{ selector: 'clr-dg-column', providers: [ColumnResizerService, COLUMN_STATE_PROVIDER] },] }
];
/** @nocollapse */
DatagridHeaderRenderer.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: DatagridRenderOrganizer },
    { type: DomAdapter },
    { type: ColumnResizerService },
    { type: BehaviorSubject, decorators: [{ type: Inject, args: [COLUMN_STATE,] }] }
];
DatagridHeaderRenderer.propDecorators = {
    resizeEmitter: [{ type: Output, args: ['clrDgColumnResize',] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLXJlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9yZW5kZXIvaGVhZGVyLXJlbmRlcmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQWEsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRyxPQUFPLEVBQUUsZUFBZSxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUVyRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDcEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDL0QsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDM0UsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ2pELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRTdELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxZQUFZLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUd6RixNQUFNLE9BQU8sc0JBQXNCOzs7Ozs7Ozs7SUFDakMsWUFDVSxFQUFjLEVBQ2QsUUFBbUIsRUFDbkIsU0FBa0MsRUFDbEMsVUFBc0IsRUFDdEIsb0JBQTBDLEVBQ3JCLFdBQWlEO1FBTHRFLE9BQUUsR0FBRixFQUFFLENBQVk7UUFDZCxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25CLGNBQVMsR0FBVCxTQUFTLENBQXlCO1FBQ2xDLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUNyQixnQkFBVyxHQUFYLFdBQVcsQ0FBc0M7UUFjbkQsa0JBQWEsR0FB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QUMsb0JBQW9CLEVBQUUscUJBQXFCLENBQUMsRUFBRTs7OztZQVo5RSxVQUFVO1lBQTJDLFNBQVM7WUFPekUsdUJBQXVCO1lBSnZCLFVBQVU7WUFFVixvQkFBb0I7WUFKcEIsZUFBZSx1QkFtQm5CLE1BQU0sU0FBQyxZQUFZOzs7NEJBY3JCLE1BQU0sU0FBQyxtQkFBbUI7Ozs7SUFBM0IsK0NBQXNGOzs7Ozs7SUFLdEYsMENBQWtDOzs7OztJQUNsQyx5Q0FBaUM7Ozs7O0lBRWpDLCtDQUEyQzs7Ozs7SUEzQnpDLG9DQUFzQjs7Ozs7SUFDdEIsMENBQTJCOzs7OztJQUMzQiwyQ0FBMEM7Ozs7O0lBQzFDLDRDQUE4Qjs7Ozs7SUFDOUIsc0RBQWtEOztJQUNsRCw2Q0FBOEUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5qZWN0LCBPbkRlc3Ryb3ksIE91dHB1dCwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBEb21BZGFwdGVyIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvZG9tLWFkYXB0ZXIvZG9tLWFkYXB0ZXInO1xuaW1wb3J0IHsgRGF0YWdyaWRSZW5kZXJTdGVwIH0gZnJvbSAnLi4vZW51bXMvcmVuZGVyLXN0ZXAuZW51bSc7XG5pbXBvcnQgeyBDb2x1bW5SZXNpemVyU2VydmljZSB9IGZyb20gJy4uL3Byb3ZpZGVycy9jb2x1bW4tcmVzaXplci5zZXJ2aWNlJztcbmltcG9ydCB7IFNUUklDVF9XSURUSF9DTEFTUyB9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7IERhdGFncmlkUmVuZGVyT3JnYW5pemVyIH0gZnJvbSAnLi9yZW5kZXItb3JnYW5pemVyJztcbmltcG9ydCB7IERhdGFncmlkQ29sdW1uU3RhdGUgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2NvbHVtbi1zdGF0ZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgRGF0YWdyaWRDb2x1bW5DaGFuZ2VzIH0gZnJvbSAnLi4vZW51bXMvY29sdW1uLWNoYW5nZXMuZW51bSc7XG5pbXBvcnQgeyBDT0xVTU5fU1RBVEUsIENPTFVNTl9TVEFURV9QUk9WSURFUiB9IGZyb20gJy4uL3Byb3ZpZGVycy9jb2x1bW4tc3RhdGUucHJvdmlkZXInO1xuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdjbHItZGctY29sdW1uJywgcHJvdmlkZXJzOiBbQ29sdW1uUmVzaXplclNlcnZpY2UsIENPTFVNTl9TVEFURV9QUk9WSURFUl0gfSlcbmV4cG9ydCBjbGFzcyBEYXRhZ3JpZEhlYWRlclJlbmRlcmVyIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBvcmdhbml6ZXI6IERhdGFncmlkUmVuZGVyT3JnYW5pemVyLFxuICAgIHByaXZhdGUgZG9tQWRhcHRlcjogRG9tQWRhcHRlcixcbiAgICBwcml2YXRlIGNvbHVtblJlc2l6ZXJTZXJ2aWNlOiBDb2x1bW5SZXNpemVyU2VydmljZSxcbiAgICBASW5qZWN0KENPTFVNTl9TVEFURSkgcHVibGljIGNvbHVtblN0YXRlOiBCZWhhdmlvclN1YmplY3Q8RGF0YWdyaWRDb2x1bW5TdGF0ZT5cbiAgKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLm9yZ2FuaXplci5maWx0ZXJSZW5kZXJTdGVwcyhEYXRhZ3JpZFJlbmRlclN0ZXAuQ0xFQVJfV0lEVEhTKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jbGVhcldpZHRoKCkpXG4gICAgKTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMub3JnYW5pemVyXG4gICAgICAgIC5maWx0ZXJSZW5kZXJTdGVwcyhEYXRhZ3JpZFJlbmRlclN0ZXAuREVURUNUX1NUUklDVF9XSURUSFMpXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5kZXRlY3RTdHJpY3RXaWR0aCgpKVxuICAgICk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChjb2x1bW5TdGF0ZS5zdWJzY3JpYmUoc3RhdGUgPT4gdGhpcy5zdGF0ZUNoYW5nZXMoc3RhdGUpKSk7XG4gIH1cblxuICBAT3V0cHV0KCdjbHJEZ0NvbHVtblJlc2l6ZScpIHJlc2l6ZUVtaXR0ZXI6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgaWYgdGhlIGNvbHVtbiBoYXMgYSBzdHJpY3Qgd2lkdGgsIHNvIGl0IGRvZXNuJ3Qgc2hyaW5rIG9yIGV4cGFuZCBiYXNlZCBvbiB0aGUgY29udGVudC5cbiAgICovXG4gIHByaXZhdGUgd2lkdGhTZXQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBhdXRvU2V0OiBib29sZWFuID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHN1YiA9PiBzdWIudW5zdWJzY3JpYmUoKSk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRlQ2hhbmdlcyhzdGF0ZTogRGF0YWdyaWRDb2x1bW5TdGF0ZSkge1xuICAgIGlmIChzdGF0ZS5jaGFuZ2VzICYmIHN0YXRlLmNoYW5nZXMubGVuZ3RoKSB7XG4gICAgICBzdGF0ZS5jaGFuZ2VzLmZvckVhY2goY2hhbmdlID0+IHtcbiAgICAgICAgc3dpdGNoIChjaGFuZ2UpIHtcbiAgICAgICAgICBjYXNlIERhdGFncmlkQ29sdW1uQ2hhbmdlcy5XSURUSDpcbiAgICAgICAgICAgIHRoaXMuc2V0V2lkdGgoc3RhdGUpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNsZWFyV2lkdGgoKSB7XG4gICAgLy8gcmVtb3ZlIHRoZSB3aWR0aCBvbmx5IGlmIHdlIHNldCBpdCwgYW5kIGl0IGlzIG5vdCBjaGFuZ2VkIGJ5IGRyYWdnaW5nLlxuICAgIGlmICh0aGlzLndpZHRoU2V0ICYmICF0aGlzLmNvbHVtblJlc2l6ZXJTZXJ2aWNlLnJlc2l6ZWRCeSkge1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICd3aWR0aCcsIG51bGwpO1xuICAgIH1cbiAgICBpZiAodGhpcy5hdXRvU2V0KSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgU1RSSUNUX1dJRFRIX0NMQVNTKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGRldGVjdFN0cmljdFdpZHRoKCk6IG51bWJlciB7XG4gICAgaWYgKHRoaXMuY29sdW1uUmVzaXplclNlcnZpY2UucmVzaXplZEJ5KSB7XG4gICAgICByZXR1cm4gdGhpcy5jb2x1bW5SZXNpemVyU2VydmljZS53aWR0aEFmdGVyUmVzaXplO1xuICAgIH0gZWxzZSBpZiAodGhpcy5hdXRvU2V0KSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuZG9tQWRhcHRlci51c2VyRGVmaW5lZFdpZHRoKHRoaXMuZWwubmF0aXZlRWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjb21wdXRlV2lkdGgoc3RyaWN0V2lkdGg6IG51bWJlcik6IG51bWJlciB7XG4gICAgbGV0IHdpZHRoOiBudW1iZXIgPSBzdHJpY3RXaWR0aDtcbiAgICBpZiAoIXdpZHRoKSB7XG4gICAgICB3aWR0aCA9IHRoaXMuZG9tQWRhcHRlci5zY3JvbGxXaWR0aCh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpO1xuICAgIH1cbiAgICByZXR1cm4gd2lkdGg7XG4gIH1cblxuICBwdWJsaWMgZ2V0Q29sdW1uV2lkdGhTdGF0ZSgpOiBQYXJ0aWFsPERhdGFncmlkQ29sdW1uU3RhdGU+IHtcbiAgICBjb25zdCBzdHJpY3RXaWR0aCA9IHRoaXMuZGV0ZWN0U3RyaWN0V2lkdGgoKTtcbiAgICByZXR1cm4ge1xuICAgICAgd2lkdGg6IHRoaXMuY29tcHV0ZVdpZHRoKHN0cmljdFdpZHRoKSxcbiAgICAgIHN0cmljdFdpZHRoOiBzdHJpY3RXaWR0aCxcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRXaWR0aChzdGF0ZTogRGF0YWdyaWRDb2x1bW5TdGF0ZSkge1xuICAgIGlmIChzdGF0ZS5zdHJpY3RXaWR0aCkge1xuICAgICAgaWYgKHRoaXMuY29sdW1uUmVzaXplclNlcnZpY2UucmVzaXplZEJ5KSB7XG4gICAgICAgIHRoaXMucmVzaXplRW1pdHRlci5lbWl0KHN0YXRlLndpZHRoKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICd3aWR0aCcsIHN0YXRlLndpZHRoICsgJ3B4Jyk7XG4gICAgICAgIHRoaXMud2lkdGhTZXQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIC8vIERvbid0IHNldCB3aWR0aCBpZiB0aGVyZSBpcyBhIHVzZXItZGVmaW5lZCBvbmUuIEp1c3QgYWRkIHRoZSBzdHJpY3Qgd2lkdGggY2xhc3MuXG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgU1RSSUNUX1dJRFRIX0NMQVNTKTtcbiAgICAgIHRoaXMuYXV0b1NldCA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgU1RSSUNUX1dJRFRIX0NMQVNTKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnd2lkdGgnLCBzdGF0ZS53aWR0aCArICdweCcpO1xuICAgICAgdGhpcy53aWR0aFNldCA9IHRydWU7XG4gICAgICB0aGlzLmF1dG9TZXQgPSB0cnVlO1xuICAgIH1cbiAgfVxufVxuIl19