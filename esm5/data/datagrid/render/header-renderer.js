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
import { DatagridColumnResizer } from './column-resizer';
import { STRICT_WIDTH_CLASS } from './constants';
import { DomAdapter } from '../../../utils/dom-adapter/dom-adapter';
import { DatagridRenderOrganizer } from './render-organizer';
var DatagridHeaderRenderer = /** @class */ (function () {
    function DatagridHeaderRenderer(el, renderer, organizer, domAdapter, columnResizer) {
        var _this = this;
        this.el = el;
        this.renderer = renderer;
        this.organizer = organizer;
        this.domAdapter = domAdapter;
        this.columnResizer = columnResizer;
        this.widthSet = false;
        this.subscriptions = [];
        this.subscriptions.push(this.organizer.filterRenderSteps(DatagridRenderStep.CLEAR_WIDTHS).subscribe(function () { return _this.clearWidth(); }));
        this.subscriptions.push(this.organizer
            .filterRenderSteps(DatagridRenderStep.DETECT_STRICT_WIDTHS)
            .subscribe(function () { return _this.detectStrictWidth(); }));
    }
    /**
     * @return {?}
     */
    DatagridHeaderRenderer.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    /**
     * @return {?}
     */
    DatagridHeaderRenderer.prototype.clearWidth = /**
     * @return {?}
     */
    function () {
        // remove the width only if we set it, and it is not changed by dragging.
        if (this.widthSet && !this.columnResizer.columnResizeBy) {
            this.renderer.setStyle(this.el.nativeElement, 'width', null);
        }
    };
    /**
     * @return {?}
     */
    DatagridHeaderRenderer.prototype.detectStrictWidth = /**
     * @return {?}
     */
    function () {
        if (this.columnResizer.columnResizeBy) {
            this.strictWidth = this.columnResizer.columnRectWidth + this.columnResizer.columnResizeBy;
        }
        else {
            this.strictWidth = this.domAdapter.userDefinedWidth(this.el.nativeElement);
        }
    };
    /**
     * @return {?}
     */
    DatagridHeaderRenderer.prototype.computeWidth = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var width = this.strictWidth;
        if (!width) {
            width = this.domAdapter.scrollWidth(this.el.nativeElement);
        }
        return width;
    };
    /**
     * @param {?} width
     * @return {?}
     */
    DatagridHeaderRenderer.prototype.setWidth = /**
     * @param {?} width
     * @return {?}
     */
    function (width) {
        if (this.strictWidth) {
            if (this.columnResizer.columnResizeBy) {
                this.renderer.setStyle(this.el.nativeElement, 'width', width + 'px');
                this.columnResizer.columnResizeBy = 0;
                this.widthSet = false;
            }
            // Don't set width if there is a user-defined one. Just add the strict width class.
            this.renderer.addClass(this.el.nativeElement, STRICT_WIDTH_CLASS);
            return;
        }
        this.renderer.removeClass(this.el.nativeElement, STRICT_WIDTH_CLASS);
        this.renderer.setStyle(this.el.nativeElement, 'width', width + 'px');
        this.widthSet = true;
    };
    DatagridHeaderRenderer.decorators = [
        { type: Directive, args: [{ selector: 'clr-dg-column' },] }
    ];
    /** @nocollapse */
    DatagridHeaderRenderer.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: DatagridRenderOrganizer },
        { type: DomAdapter },
        { type: DatagridColumnResizer }
    ]; };
    return DatagridHeaderRenderer;
}());
export { DatagridHeaderRenderer };
if (false) {
    /**
     * Indicates if the column has a strict width, so it doesn't shrink or expand based on the content.
     * @type {?}
     */
    DatagridHeaderRenderer.prototype.strictWidth;
    /** @type {?} */
    DatagridHeaderRenderer.prototype.widthSet;
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
    DatagridHeaderRenderer.prototype.columnResizer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLXJlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9yZW5kZXIvaGVhZGVyLXJlbmRlcmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFhLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUc1RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUUvRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDakQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRTdEO0lBRUUsZ0NBQ1UsRUFBYyxFQUNkLFFBQW1CLEVBQ25CLFNBQWtDLEVBQ2xDLFVBQXNCLEVBQ3RCLGFBQW9DO1FBTDlDLGlCQWVDO1FBZFMsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUNkLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsY0FBUyxHQUFULFNBQVMsQ0FBeUI7UUFDbEMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixrQkFBYSxHQUFiLGFBQWEsQ0FBdUI7UUFnQnRDLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFFMUIsa0JBQWEsR0FBbUIsRUFBRSxDQUFDO1FBaEJ6QyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FDckIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsQ0FBQyxTQUFTLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxVQUFVLEVBQUUsRUFBakIsQ0FBaUIsQ0FBQyxDQUNyRyxDQUFDO1FBQ0YsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJ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QXNCOztJQUN0QiwwQ0FBMkI7O0lBQzNCLDJDQUEwQzs7SUFDMUMsNENBQThCOztJQUM5QiwrQ0FBNEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIE9uRGVzdHJveSwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgRGF0YWdyaWRSZW5kZXJTdGVwIH0gZnJvbSAnLi4vZW51bXMvcmVuZGVyLXN0ZXAuZW51bSc7XG5cbmltcG9ydCB7IERhdGFncmlkQ29sdW1uUmVzaXplciB9IGZyb20gJy4vY29sdW1uLXJlc2l6ZXInO1xuaW1wb3J0IHsgU1RSSUNUX1dJRFRIX0NMQVNTIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgRG9tQWRhcHRlciB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2RvbS1hZGFwdGVyL2RvbS1hZGFwdGVyJztcbmltcG9ydCB7IERhdGFncmlkUmVuZGVyT3JnYW5pemVyIH0gZnJvbSAnLi9yZW5kZXItb3JnYW5pemVyJztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnY2xyLWRnLWNvbHVtbicgfSlcbmV4cG9ydCBjbGFzcyBEYXRhZ3JpZEhlYWRlclJlbmRlcmVyIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBvcmdhbml6ZXI6IERhdGFncmlkUmVuZGVyT3JnYW5pemVyLFxuICAgIHByaXZhdGUgZG9tQWRhcHRlcjogRG9tQWRhcHRlcixcbiAgICBwcml2YXRlIGNvbHVtblJlc2l6ZXI6IERhdGFncmlkQ29sdW1uUmVzaXplclxuICApIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMub3JnYW5pemVyLmZpbHRlclJlbmRlclN0ZXBzKERhdGFncmlkUmVuZGVyU3RlcC5DTEVBUl9XSURUSFMpLnN1YnNjcmliZSgoKSA9PiB0aGlzLmNsZWFyV2lkdGgoKSlcbiAgICApO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5vcmdhbml6ZXJcbiAgICAgICAgLmZpbHRlclJlbmRlclN0ZXBzKERhdGFncmlkUmVuZGVyU3RlcC5ERVRFQ1RfU1RSSUNUX1dJRFRIUylcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmRldGVjdFN0cmljdFdpZHRoKCkpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgaWYgdGhlIGNvbHVtbiBoYXMgYSBzdHJpY3Qgd2lkdGgsIHNvIGl0IGRvZXNuJ3Qgc2hyaW5rIG9yIGV4cGFuZCBiYXNlZCBvbiB0aGUgY29udGVudC5cbiAgICovXG4gIHB1YmxpYyBzdHJpY3RXaWR0aDogbnVtYmVyO1xuICBwcml2YXRlIHdpZHRoU2V0OiBib29sZWFuID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaChzdWIgPT4gc3ViLnVuc3Vic2NyaWJlKCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBjbGVhcldpZHRoKCkge1xuICAgIC8vIHJlbW92ZSB0aGUgd2lkdGggb25seSBpZiB3ZSBzZXQgaXQsIGFuZCBpdCBpcyBub3QgY2hhbmdlZCBieSBkcmFnZ2luZy5cbiAgICBpZiAodGhpcy53aWR0aFNldCAmJiAhdGhpcy5jb2x1bW5SZXNpemVyLmNvbHVtblJlc2l6ZUJ5KSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3dpZHRoJywgbnVsbCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBkZXRlY3RTdHJpY3RXaWR0aCgpIHtcbiAgICBpZiAodGhpcy5jb2x1bW5SZXNpemVyLmNvbHVtblJlc2l6ZUJ5KSB7XG4gICAgICB0aGlzLnN0cmljdFdpZHRoID0gdGhpcy5jb2x1bW5SZXNpemVyLmNvbHVtblJlY3RXaWR0aCArIHRoaXMuY29sdW1uUmVzaXplci5jb2x1bW5SZXNpemVCeTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdHJpY3RXaWR0aCA9IHRoaXMuZG9tQWRhcHRlci51c2VyRGVmaW5lZFdpZHRoKHRoaXMuZWwubmF0aXZlRWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGNvbXB1dGVXaWR0aCgpOiBudW1iZXIge1xuICAgIGxldCB3aWR0aDogbnVtYmVyID0gdGhpcy5zdHJpY3RXaWR0aDtcbiAgICBpZiAoIXdpZHRoKSB7XG4gICAgICB3aWR0aCA9IHRoaXMuZG9tQWRhcHRlci5zY3JvbGxXaWR0aCh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpO1xuICAgIH1cbiAgICByZXR1cm4gd2lkdGg7XG4gIH1cblxuICBwdWJsaWMgc2V0V2lkdGgod2lkdGg6IG51bWJlcikge1xuICAgIGlmICh0aGlzLnN0cmljdFdpZHRoKSB7XG4gICAgICBpZiAodGhpcy5jb2x1bW5SZXNpemVyLmNvbHVtblJlc2l6ZUJ5KSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnd2lkdGgnLCB3aWR0aCArICdweCcpO1xuICAgICAgICB0aGlzLmNvbHVtblJlc2l6ZXIuY29sdW1uUmVzaXplQnkgPSAwO1xuICAgICAgICB0aGlzLndpZHRoU2V0ID0gZmFsc2U7XG4gICAgICB9XG4gICAgICAvLyBEb24ndCBzZXQgd2lkdGggaWYgdGhlcmUgaXMgYSB1c2VyLWRlZmluZWQgb25lLiBKdXN0IGFkZCB0aGUgc3RyaWN0IHdpZHRoIGNsYXNzLlxuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIFNUUklDVF9XSURUSF9DTEFTUyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCBTVFJJQ1RfV0lEVEhfQ0xBU1MpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnd2lkdGgnLCB3aWR0aCArICdweCcpO1xuICAgIHRoaXMud2lkdGhTZXQgPSB0cnVlO1xuICB9XG59XG4iXX0=