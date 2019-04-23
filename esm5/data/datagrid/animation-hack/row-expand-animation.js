/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/*
 * This is a hack that we have to write for now because of bugs and limitations in Angular,
 * please do not use this as an example.
 */
import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { DomAdapter } from '../../../utils/dom-adapter/dom-adapter';
import { DatagridIfExpandService } from '../datagrid-if-expanded.service';
var DatagridRowExpandAnimation = /** @class */ (function () {
    function DatagridRowExpandAnimation(el, domAdapter, renderer, expand) {
        var _this = this;
        this.el = el;
        this.domAdapter = domAdapter;
        this.renderer = renderer;
        this.expand = expand;
        this.subscriptions = [];
        if (expand && expand.animate) {
            this.subscriptions.push(expand.animate.subscribe((/**
             * @return {?}
             */
            function () {
                // We already had an animation waiting, so we just have to run in, not prepare again
                if (_this.oldHeight) {
                    setTimeout((/**
                     * @return {?}
                     */
                    function () { return _this.run(); }));
                }
                else {
                    _this.animate();
                }
            })));
        }
    }
    /**
     * @return {?}
     */
    DatagridRowExpandAnimation.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subscriptions.forEach((/**
         * @param {?} s
         * @return {?}
         */
        function (s) { return s.unsubscribe(); }));
    };
    /*
       * Dirty manual animation handling, but we have no way to use dynamic heights in Angular's current API.
       * They're working on it, but have no ETA.
       */
    /*
         * Dirty manual animation handling, but we have no way to use dynamic heights in Angular's current API.
         * They're working on it, but have no ETA.
         */
    /**
     * @private
     * @return {?}
     */
    DatagridRowExpandAnimation.prototype.animate = /*
         * Dirty manual animation handling, but we have no way to use dynamic heights in Angular's current API.
         * They're working on it, but have no ETA.
         */
    /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        // Check if we do have web-animations available. If not, just skip the animation.
        if (!this.el.nativeElement.animate) {
            return;
        }
        // We had an animation running, we skip to the end
        if (this.running) {
            this.running.finish();
        }
        this.oldHeight = this.domAdapter.computedHeight(this.el.nativeElement);
        // In case height has not yet been set. When starting expanded, for example.
        // See https://github.com/vmware/clarity/issues/2904
        if (isNaN(this.oldHeight)) {
            this.oldHeight = 0;
        }
        // We set the height of the element immediately to avoid a flicker before the animation starts.
        this.renderer.setStyle(this.el.nativeElement, 'height', this.oldHeight + 'px');
        this.renderer.setStyle(this.el.nativeElement, 'overflow-y', 'hidden');
        setTimeout((/**
         * @return {?}
         */
        function () {
            if (_this.expand.loading) {
                return;
            }
            _this.run();
        }));
    };
    /**
     * @private
     * @return {?}
     */
    DatagridRowExpandAnimation.prototype.run = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.renderer.setStyle(this.el.nativeElement, 'height', null);
        /** @type {?} */
        var newHeight = this.domAdapter.computedHeight(this.el.nativeElement);
        this.running = this.el.nativeElement.animate({ height: [this.oldHeight + 'px', newHeight + 'px'], easing: 'ease-in-out' }, { duration: 200 });
        this.running.onfinish = (/**
         * @return {?}
         */
        function () {
            _this.renderer.setStyle(_this.el.nativeElement, 'overflow-y', null);
            delete _this.running;
        });
        delete this.oldHeight;
    };
    DatagridRowExpandAnimation.decorators = [
        { type: Directive, args: [{ selector: 'clr-dg-row' },] }
    ];
    /** @nocollapse */
    DatagridRowExpandAnimation.ctorParameters = function () { return [
        { type: ElementRef },
        { type: DomAdapter },
        { type: Renderer2 },
        { type: DatagridIfExpandService }
    ]; };
    return DatagridRowExpandAnimation;
}());
export { DatagridRowExpandAnimation };
if (false) {
    /**
     * @type {?}
     * @private
     */
    DatagridRowExpandAnimation.prototype.subscriptions;
    /**
     * @type {?}
     * @private
     */
    DatagridRowExpandAnimation.prototype.running;
    /**
     * @type {?}
     * @private
     */
    DatagridRowExpandAnimation.prototype.oldHeight;
    /**
     * @type {?}
     * @private
     */
    DatagridRowExpandAnimation.prototype.el;
    /**
     * @type {?}
     * @private
     */
    DatagridRowExpandAnimation.prototype.domAdapter;
    /**
     * @type {?}
     * @private
     */
    DatagridRowExpandAnimation.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    DatagridRowExpandAnimation.prototype.expand;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LWV4cGFuZC1hbmltYXRpb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJkYXRhL2RhdGFncmlkL2FuaW1hdGlvbi1oYWNrL3Jvdy1leHBhbmQtYW5pbWF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFXQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFHNUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBRTFFO0lBSUUsb0NBQ1UsRUFBYyxFQUNkLFVBQXNCLEVBQ3RCLFFBQW1CLEVBQ25CLE1BQStCO1FBSnpDLGlCQWtCQztRQWpCUyxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQ2QsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25CLFdBQU0sR0FBTixNQUFNLENBQXlCO1FBTmpDLGtCQUFhLEdBQW1CLEVBQUUsQ0FBQztRQVF6QyxJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFO1lBQzVCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUNyQixNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVM7OztZQUFDO2dCQUN2QixvRkFBb0Y7Z0JBQ3BGLElBQUksS0FBSSxDQUFDLFNBQVMsRUFBRTtvQkFDbEIsVUFBVTs7O29CQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsR0FBRyxFQUFFLEVBQVYsQ0FBVSxFQUFDLENBQUM7aUJBQzlCO3FCQUFNO29CQUNMLEtBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztpQkFDaEI7WUFDSCxDQUFDLEVBQUMsQ0FDSCxDQUFDO1NBQ0g7SUFDSCxDQUFDOzs7O0lBRUQsZ0RBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPOzs7O1FBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQWYsQ0FBZSxFQUFDLENBQUM7SUFDbkQsQ0FBQztJQUtEOzs7U0FHSzs7Ozs7Ozs7O0lBQ0csNENBQU87Ozs7Ozs7O0lBQWY7UUFBQSxpQkEwQkM7UUF6QkMsaUZBQWlGO1FBQ2pGLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUU7WUFDbEMsT0FBTztTQUNSO1FBRUQsa0RBQWtEO1FBQ2xELElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoQixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ3ZCO1FBRUQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3ZFLDRFQUE0RTtRQUM1RSxvREFBb0Q7UUFDcEQsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ3pCLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1NBQ3BCO1FBQ0QsK0ZBQStGO1FBQy9GLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQy9FLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQztRQUN0RSxVQUFVOzs7UUFBQztZQUNULElBQUksS0FBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUU7Z0JBQ3ZCLE9BQU87YUFDUjtZQUNELEtBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNiLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7SUFFTyx3Q0FBRzs7OztJQUFYO1FBQUEsaUJBWUM7UUFYQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7O1lBQ3hELFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQztRQUN2RSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FDMUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksRUFBRSxTQUFTLEdBQUcsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxFQUM1RSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FDbEIsQ0FBQztRQUNGLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUTs7O1FBQUc7WUFDdEIsS0FBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ2xFLE9BQU8sS0FBSSxDQUFDLE9BQU8sQ0FBQztRQUN0QixDQUFDLENBQUEsQ0FBQztRQUNGLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDOztnQkEzRUYsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRTs7OztnQkFOakIsVUFBVTtnQkFHckIsVUFBVTtnQkFIYSxTQUFTO2dCQUloQyx1QkFBdUI7O0lBOEVoQyxpQ0FBQztDQUFBLEFBNUVELElBNEVDO1NBM0VZLDBCQUEwQjs7Ozs7O0lBQ3JDLG1EQUEyQzs7Ozs7SUEwQjNDLDZDQUFxQjs7Ozs7SUFDckIsK0NBQTBCOzs7OztJQXhCeEIsd0NBQXNCOzs7OztJQUN0QixnREFBOEI7Ozs7O0lBQzlCLDhDQUEyQjs7Ozs7SUFDM0IsNENBQXVDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG4vKlxuICogVGhpcyBpcyBhIGhhY2sgdGhhdCB3ZSBoYXZlIHRvIHdyaXRlIGZvciBub3cgYmVjYXVzZSBvZiBidWdzIGFuZCBsaW1pdGF0aW9ucyBpbiBBbmd1bGFyLFxuICogcGxlYXNlIGRvIG5vdCB1c2UgdGhpcyBhcyBhbiBleGFtcGxlLlxuICovXG5cbmltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgUmVuZGVyZXIyLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBEb21BZGFwdGVyIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvZG9tLWFkYXB0ZXIvZG9tLWFkYXB0ZXInO1xuaW1wb3J0IHsgRGF0YWdyaWRJZkV4cGFuZFNlcnZpY2UgfSBmcm9tICcuLi9kYXRhZ3JpZC1pZi1leHBhbmRlZC5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnY2xyLWRnLXJvdycgfSlcbmV4cG9ydCBjbGFzcyBEYXRhZ3JpZFJvd0V4cGFuZEFuaW1hdGlvbiBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgZG9tQWRhcHRlcjogRG9tQWRhcHRlcixcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBleHBhbmQ6IERhdGFncmlkSWZFeHBhbmRTZXJ2aWNlXG4gICkge1xuICAgIGlmIChleHBhbmQgJiYgZXhwYW5kLmFuaW1hdGUpIHtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgICBleHBhbmQuYW5pbWF0ZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIC8vIFdlIGFscmVhZHkgaGFkIGFuIGFuaW1hdGlvbiB3YWl0aW5nLCBzbyB3ZSBqdXN0IGhhdmUgdG8gcnVuIGluLCBub3QgcHJlcGFyZSBhZ2FpblxuICAgICAgICAgIGlmICh0aGlzLm9sZEhlaWdodCkge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnJ1bigpKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5hbmltYXRlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaChzID0+IHMudW5zdWJzY3JpYmUoKSk7XG4gIH1cblxuICBwcml2YXRlIHJ1bm5pbmc6IGFueTtcbiAgcHJpdmF0ZSBvbGRIZWlnaHQ6IG51bWJlcjtcblxuICAvKlxuICAgICAqIERpcnR5IG1hbnVhbCBhbmltYXRpb24gaGFuZGxpbmcsIGJ1dCB3ZSBoYXZlIG5vIHdheSB0byB1c2UgZHluYW1pYyBoZWlnaHRzIGluIEFuZ3VsYXIncyBjdXJyZW50IEFQSS5cbiAgICAgKiBUaGV5J3JlIHdvcmtpbmcgb24gaXQsIGJ1dCBoYXZlIG5vIEVUQS5cbiAgICAgKi9cbiAgcHJpdmF0ZSBhbmltYXRlKCkge1xuICAgIC8vIENoZWNrIGlmIHdlIGRvIGhhdmUgd2ViLWFuaW1hdGlvbnMgYXZhaWxhYmxlLiBJZiBub3QsIGp1c3Qgc2tpcCB0aGUgYW5pbWF0aW9uLlxuICAgIGlmICghdGhpcy5lbC5uYXRpdmVFbGVtZW50LmFuaW1hdGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBXZSBoYWQgYW4gYW5pbWF0aW9uIHJ1bm5pbmcsIHdlIHNraXAgdG8gdGhlIGVuZFxuICAgIGlmICh0aGlzLnJ1bm5pbmcpIHtcbiAgICAgIHRoaXMucnVubmluZy5maW5pc2goKTtcbiAgICB9XG5cbiAgICB0aGlzLm9sZEhlaWdodCA9IHRoaXMuZG9tQWRhcHRlci5jb21wdXRlZEhlaWdodCh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpO1xuICAgIC8vIEluIGNhc2UgaGVpZ2h0IGhhcyBub3QgeWV0IGJlZW4gc2V0LiBXaGVuIHN0YXJ0aW5nIGV4cGFuZGVkLCBmb3IgZXhhbXBsZS5cbiAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3Ztd2FyZS9jbGFyaXR5L2lzc3Vlcy8yOTA0XG4gICAgaWYgKGlzTmFOKHRoaXMub2xkSGVpZ2h0KSkge1xuICAgICAgdGhpcy5vbGRIZWlnaHQgPSAwO1xuICAgIH1cbiAgICAvLyBXZSBzZXQgdGhlIGhlaWdodCBvZiB0aGUgZWxlbWVudCBpbW1lZGlhdGVseSB0byBhdm9pZCBhIGZsaWNrZXIgYmVmb3JlIHRoZSBhbmltYXRpb24gc3RhcnRzLlxuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnaGVpZ2h0JywgdGhpcy5vbGRIZWlnaHQgKyAncHgnKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ292ZXJmbG93LXknLCAnaGlkZGVuJyk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5leHBhbmQubG9hZGluZykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLnJ1bigpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBydW4oKSB7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdoZWlnaHQnLCBudWxsKTtcbiAgICBjb25zdCBuZXdIZWlnaHQgPSB0aGlzLmRvbUFkYXB0ZXIuY29tcHV0ZWRIZWlnaHQodGhpcy5lbC5uYXRpdmVFbGVtZW50KTtcbiAgICB0aGlzLnJ1bm5pbmcgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuYW5pbWF0ZShcbiAgICAgIHsgaGVpZ2h0OiBbdGhpcy5vbGRIZWlnaHQgKyAncHgnLCBuZXdIZWlnaHQgKyAncHgnXSwgZWFzaW5nOiAnZWFzZS1pbi1vdXQnIH0sXG4gICAgICB7IGR1cmF0aW9uOiAyMDAgfVxuICAgICk7XG4gICAgdGhpcy5ydW5uaW5nLm9uZmluaXNoID0gKCkgPT4ge1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdvdmVyZmxvdy15JywgbnVsbCk7XG4gICAgICBkZWxldGUgdGhpcy5ydW5uaW5nO1xuICAgIH07XG4gICAgZGVsZXRlIHRoaXMub2xkSGVpZ2h0O1xuICB9XG59XG4iXX0=