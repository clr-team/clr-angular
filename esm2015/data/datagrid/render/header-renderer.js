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
export class DatagridHeaderRenderer {
    /**
     * @param {?} el
     * @param {?} renderer
     * @param {?} organizer
     * @param {?} domAdapter
     * @param {?} columnResizer
     */
    constructor(el, renderer, organizer, domAdapter, columnResizer) {
        this.el = el;
        this.renderer = renderer;
        this.organizer = organizer;
        this.domAdapter = domAdapter;
        this.columnResizer = columnResizer;
        this.widthSet = false;
        this.subscriptions = [];
        this.subscriptions.push(this.organizer.filterRenderSteps(DatagridRenderStep.CLEAR_WIDTHS).subscribe(() => this.clearWidth()));
        this.subscriptions.push(this.organizer
            .filterRenderSteps(DatagridRenderStep.DETECT_STRICT_WIDTHS)
            .subscribe(() => this.detectStrictWidth()));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
    /**
     * @return {?}
     */
    clearWidth() {
        // remove the width only if we set it, and it is not changed by dragging.
        if (this.widthSet && !this.columnResizer.columnResizeBy) {
            this.renderer.setStyle(this.el.nativeElement, 'width', null);
        }
    }
    /**
     * @return {?}
     */
    detectStrictWidth() {
        if (this.columnResizer.columnResizeBy) {
            this.strictWidth = this.columnResizer.columnRectWidth + this.columnResizer.columnResizeBy;
        }
        else {
            this.strictWidth = this.domAdapter.userDefinedWidth(this.el.nativeElement);
        }
    }
    /**
     * @return {?}
     */
    computeWidth() {
        /** @type {?} */
        let width = this.strictWidth;
        if (!width) {
            width = this.domAdapter.scrollWidth(this.el.nativeElement);
        }
        return width;
    }
    /**
     * @param {?} width
     * @return {?}
     */
    setWidth(width) {
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
    }
}
DatagridHeaderRenderer.decorators = [
    { type: Directive, args: [{ selector: 'clr-dg-column' },] }
];
/** @nocollapse */
DatagridHeaderRenderer.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: DatagridRenderOrganizer },
    { type: DomAdapter },
    { type: DatagridColumnResizer }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLXJlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9yZW5kZXIvaGVhZGVyLXJlbmRlcmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFhLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUc1RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUUvRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDakQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRzdELE1BQU0sT0FBTyxzQkFBc0I7Ozs7Ozs7O0lBQ2pDLFlBQ1UsRUFBYyxFQUNkLFFBQW1CLEVBQ25CLFNBQWtDLEVBQ2xDLFVBQXNCLEVBQ3RCLGFBQW9DO1FBSnBDLE9BQUUsR0FBRixFQUFFLENBQVk7UUFDZCxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25CLGNBQVMsR0FBVCxTQUFTLENBQXlCO1FBQ2xDLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsa0JBQWEsR0FBYixhQUFhLENBQXVCO1FBZ0J0QyxhQUFRLEdBQVksS0FBSyxDQUFDO1FBRTFCLGtCQUFhLEdBQW1CLEVBQUUsQ0FBQztRQWhCekMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQ3JCLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsa0JBQWtCLENBQUMsWUFBWSxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUNyRyxDQUFDO1FBQ0YsSUFBSSxDQUFDLGFBQWEs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MTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgT25EZXN0cm95LCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBEYXRhZ3JpZFJlbmRlclN0ZXAgfSBmcm9tICcuLi9lbnVtcy9yZW5kZXItc3RlcC5lbnVtJztcblxuaW1wb3J0IHsgRGF0YWdyaWRDb2x1bW5SZXNpemVyIH0gZnJvbSAnLi9jb2x1bW4tcmVzaXplcic7XG5pbXBvcnQgeyBTVFJJQ1RfV0lEVEhfQ0xBU1MgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBEb21BZGFwdGVyIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvZG9tLWFkYXB0ZXIvZG9tLWFkYXB0ZXInO1xuaW1wb3J0IHsgRGF0YWdyaWRSZW5kZXJPcmdhbml6ZXIgfSBmcm9tICcuL3JlbmRlci1vcmdhbml6ZXInO1xuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdjbHItZGctY29sdW1uJyB9KVxuZXhwb3J0IGNsYXNzIERhdGFncmlkSGVhZGVyUmVuZGVyZXIgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIG9yZ2FuaXplcjogRGF0YWdyaWRSZW5kZXJPcmdhbml6ZXIsXG4gICAgcHJpdmF0ZSBkb21BZGFwdGVyOiBEb21BZGFwdGVyLFxuICAgIHByaXZhdGUgY29sdW1uUmVzaXplcjogRGF0YWdyaWRDb2x1bW5SZXNpemVyXG4gICkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5vcmdhbml6ZXIuZmlsdGVyUmVuZGVyU3RlcHMoRGF0YWdyaWRSZW5kZXJTdGVwLkNMRUFSX1dJRFRIUykuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2xlYXJXaWR0aCgpKVxuICAgICk7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLm9yZ2FuaXplclxuICAgICAgICAuZmlsdGVyUmVuZGVyU3RlcHMoRGF0YWdyaWRSZW5kZXJTdGVwLkRFVEVDVF9TVFJJQ1RfV0lEVEhTKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuZGV0ZWN0U3RyaWN0V2lkdGgoKSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEluZGljYXRlcyBpZiB0aGUgY29sdW1uIGhhcyBhIHN0cmljdCB3aWR0aCwgc28gaXQgZG9lc24ndCBzaHJpbmsgb3IgZXhwYW5kIGJhc2VkIG9uIHRoZSBjb250ZW50LlxuICAgKi9cbiAgcHVibGljIHN0cmljdFdpZHRoOiBudW1iZXI7XG4gIHByaXZhdGUgd2lkdGhTZXQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBwcml2YXRlIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHN1YiA9PiBzdWIudW5zdWJzY3JpYmUoKSk7XG4gIH1cblxuICBwcml2YXRlIGNsZWFyV2lkdGgoKSB7XG4gICAgLy8gcmVtb3ZlIHRoZSB3aWR0aCBvbmx5IGlmIHdlIHNldCBpdCwgYW5kIGl0IGlzIG5vdCBjaGFuZ2VkIGJ5IGRyYWdnaW5nLlxuICAgIGlmICh0aGlzLndpZHRoU2V0ICYmICF0aGlzLmNvbHVtblJlc2l6ZXIuY29sdW1uUmVzaXplQnkpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnd2lkdGgnLCBudWxsKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGRldGVjdFN0cmljdFdpZHRoKCkge1xuICAgIGlmICh0aGlzLmNvbHVtblJlc2l6ZXIuY29sdW1uUmVzaXplQnkpIHtcbiAgICAgIHRoaXMuc3RyaWN0V2lkdGggPSB0aGlzLmNvbHVtblJlc2l6ZXIuY29sdW1uUmVjdFdpZHRoICsgdGhpcy5jb2x1bW5SZXNpemVyLmNvbHVtblJlc2l6ZUJ5O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0cmljdFdpZHRoID0gdGhpcy5kb21BZGFwdGVyLnVzZXJEZWZpbmVkV2lkdGgodGhpcy5lbC5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgY29tcHV0ZVdpZHRoKCk6IG51bWJlciB7XG4gICAgbGV0IHdpZHRoOiBudW1iZXIgPSB0aGlzLnN0cmljdFdpZHRoO1xuICAgIGlmICghd2lkdGgpIHtcbiAgICAgIHdpZHRoID0gdGhpcy5kb21BZGFwdGVyLnNjcm9sbFdpZHRoKHRoaXMuZWwubmF0aXZlRWxlbWVudCk7XG4gICAgfVxuICAgIHJldHVybiB3aWR0aDtcbiAgfVxuXG4gIHB1YmxpYyBzZXRXaWR0aCh3aWR0aDogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMuc3RyaWN0V2lkdGgpIHtcbiAgICAgIGlmICh0aGlzLmNvbHVtblJlc2l6ZXIuY29sdW1uUmVzaXplQnkpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICd3aWR0aCcsIHdpZHRoICsgJ3B4Jyk7XG4gICAgICAgIHRoaXMuY29sdW1uUmVzaXplci5jb2x1bW5SZXNpemVCeSA9IDA7XG4gICAgICAgIHRoaXMud2lkdGhTZXQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIC8vIERvbid0IHNldCB3aWR0aCBpZiB0aGVyZSBpcyBhIHVzZXItZGVmaW5lZCBvbmUuIEp1c3QgYWRkIHRoZSBzdHJpY3Qgd2lkdGggY2xhc3MuXG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgU1RSSUNUX1dJRFRIX0NMQVNTKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIFNUUklDVF9XSURUSF9DTEFTUyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICd3aWR0aCcsIHdpZHRoICsgJ3B4Jyk7XG4gICAgdGhpcy53aWR0aFNldCA9IHRydWU7XG4gIH1cbn1cbiJdfQ==