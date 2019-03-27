/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/*
 * This is a hack that we have to write for now because of bugs and limitations in Angular,
 * please do not use this as an example.
 */
import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { Expand } from '../../../utils/expand/providers/expand';
import { DomAdapter } from '../../../utils/dom-adapter/dom-adapter';
var DatagridRowExpandAnimation = /** @class */ (function () {
    function DatagridRowExpandAnimation(el, domAdapter, renderer, expand) {
        var _this = this;
        this.el = el;
        this.domAdapter = domAdapter;
        this.renderer = renderer;
        this.expand = expand;
        if (expand && expand.animate) {
            expand.animate.subscribe((/**
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
            }));
        }
    }
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
        { type: Expand }
    ]; };
    return DatagridRowExpandAnimation;
}());
export { DatagridRowExpandAnimation };
if (false) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LWV4cGFuZC1hbmltYXRpb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJkYXRhL2RhdGFncmlkL2FuaW1hdGlvbi1oYWNrL3Jvdy1leHBhbmQtYW5pbWF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFXQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFakUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUVwRTtJQUVFLG9DQUNVLEVBQWMsRUFDZCxVQUFzQixFQUN0QixRQUFtQixFQUNuQixNQUFjO1FBSnhCLGlCQWdCQztRQWZTLE9BQUUsR0FBRixFQUFFLENBQVk7UUFDZCxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUV0QixJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFO1lBQzVCLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUzs7O1lBQUM7Z0JBQ3ZCLG9GQUFvRjtnQkFDcEYsSUFBSSxLQUFJLENBQUMsU0FBUyxFQUFFO29CQUNsQixVQUFVOzs7b0JBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxHQUFHLEVBQUUsRUFBVixDQUFVLEVBQUMsQ0FBQztpQkFDOUI7cUJBQU07b0JBQ0wsS0FBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO2lCQUNoQjtZQUNILENBQUMsRUFBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBS0Q7OztTQUdLOzs7Ozs7Ozs7SUFDRyw0Q0FBTzs7Ozs7Ozs7SUFBZjtRQUFBLGlCQTBCQztRQXpCQyxpRkFBaUY7UUFDakYsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRTtZQUNsQyxPQUFPO1NBQ1I7UUFFRCxrREFBa0Q7UUFDbEQsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDdkI7UUFFRCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDdkUsNEVBQTRFO1FBQzVFLG9EQUFvRDtRQUNwRCxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7U0FDcEI7UUFDRCwrRkFBK0Y7UUFDL0YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDL0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3RFLFVBQVU7OztRQUFDO1lBQ1QsSUFBSSxLQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRTtnQkFDdkIsT0FBTzthQUNSO1lBQ0QsS0FBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2IsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7OztJQUVPLHdDQUFHOzs7O0lBQVg7UUFBQSxpQkFZQztRQVhDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQzs7WUFDeEQsU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUMxQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxFQUFFLFNBQVMsR0FBRyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLEVBQzVFLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUNsQixDQUFDO1FBQ0YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFROzs7UUFBRztZQUN0QixLQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDbEUsT0FBTyxLQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3RCLENBQUMsQ0FBQSxDQUFDO1FBQ0YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7O2dCQW5FRixTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFOzs7O2dCQUxqQixVQUFVO2dCQUdyQixVQUFVO2dCQUhhLFNBQVM7Z0JBRWhDLE1BQU07O0lBdUVmLGlDQUFDO0NBQUEsQUFwRUQsSUFvRUM7U0FuRVksMEJBQTBCOzs7Ozs7SUFtQnJDLDZDQUFxQjs7Ozs7SUFDckIsK0NBQTBCOzs7OztJQWxCeEIsd0NBQXNCOzs7OztJQUN0QixnREFBOEI7Ozs7O0lBQzlCLDhDQUEyQjs7Ozs7SUFDM0IsNENBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG4vKlxuICogVGhpcyBpcyBhIGhhY2sgdGhhdCB3ZSBoYXZlIHRvIHdyaXRlIGZvciBub3cgYmVjYXVzZSBvZiBidWdzIGFuZCBsaW1pdGF0aW9ucyBpbiBBbmd1bGFyLFxuICogcGxlYXNlIGRvIG5vdCB1c2UgdGhpcyBhcyBhbiBleGFtcGxlLlxuICovXG5cbmltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEV4cGFuZCB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2V4cGFuZC9wcm92aWRlcnMvZXhwYW5kJztcbmltcG9ydCB7IERvbUFkYXB0ZXIgfSBmcm9tICcuLi8uLi8uLi91dGlscy9kb20tYWRhcHRlci9kb20tYWRhcHRlcic7XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ2Nsci1kZy1yb3cnIH0pXG5leHBvcnQgY2xhc3MgRGF0YWdyaWRSb3dFeHBhbmRBbmltYXRpb24ge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgZG9tQWRhcHRlcjogRG9tQWRhcHRlcixcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBleHBhbmQ6IEV4cGFuZFxuICApIHtcbiAgICBpZiAoZXhwYW5kICYmIGV4cGFuZC5hbmltYXRlKSB7XG4gICAgICBleHBhbmQuYW5pbWF0ZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAvLyBXZSBhbHJlYWR5IGhhZCBhbiBhbmltYXRpb24gd2FpdGluZywgc28gd2UganVzdCBoYXZlIHRvIHJ1biBpbiwgbm90IHByZXBhcmUgYWdhaW5cbiAgICAgICAgaWYgKHRoaXMub2xkSGVpZ2h0KSB7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnJ1bigpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmFuaW1hdGUoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBydW5uaW5nOiBhbnk7XG4gIHByaXZhdGUgb2xkSGVpZ2h0OiBudW1iZXI7XG5cbiAgLypcbiAgICAgKiBEaXJ0eSBtYW51YWwgYW5pbWF0aW9uIGhhbmRsaW5nLCBidXQgd2UgaGF2ZSBubyB3YXkgdG8gdXNlIGR5bmFtaWMgaGVpZ2h0cyBpbiBBbmd1bGFyJ3MgY3VycmVudCBBUEkuXG4gICAgICogVGhleSdyZSB3b3JraW5nIG9uIGl0LCBidXQgaGF2ZSBubyBFVEEuXG4gICAgICovXG4gIHByaXZhdGUgYW5pbWF0ZSgpIHtcbiAgICAvLyBDaGVjayBpZiB3ZSBkbyBoYXZlIHdlYi1hbmltYXRpb25zIGF2YWlsYWJsZS4gSWYgbm90LCBqdXN0IHNraXAgdGhlIGFuaW1hdGlvbi5cbiAgICBpZiAoIXRoaXMuZWwubmF0aXZlRWxlbWVudC5hbmltYXRlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gV2UgaGFkIGFuIGFuaW1hdGlvbiBydW5uaW5nLCB3ZSBza2lwIHRvIHRoZSBlbmRcbiAgICBpZiAodGhpcy5ydW5uaW5nKSB7XG4gICAgICB0aGlzLnJ1bm5pbmcuZmluaXNoKCk7XG4gICAgfVxuXG4gICAgdGhpcy5vbGRIZWlnaHQgPSB0aGlzLmRvbUFkYXB0ZXIuY29tcHV0ZWRIZWlnaHQodGhpcy5lbC5uYXRpdmVFbGVtZW50KTtcbiAgICAvLyBJbiBjYXNlIGhlaWdodCBoYXMgbm90IHlldCBiZWVuIHNldC4gV2hlbiBzdGFydGluZyBleHBhbmRlZCwgZm9yIGV4YW1wbGUuXG4gICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS92bXdhcmUvY2xhcml0eS9pc3N1ZXMvMjkwNFxuICAgIGlmIChpc05hTih0aGlzLm9sZEhlaWdodCkpIHtcbiAgICAgIHRoaXMub2xkSGVpZ2h0ID0gMDtcbiAgICB9XG4gICAgLy8gV2Ugc2V0IHRoZSBoZWlnaHQgb2YgdGhlIGVsZW1lbnQgaW1tZWRpYXRlbHkgdG8gYXZvaWQgYSBmbGlja2VyIGJlZm9yZSB0aGUgYW5pbWF0aW9uIHN0YXJ0cy5cbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2hlaWdodCcsIHRoaXMub2xkSGVpZ2h0ICsgJ3B4Jyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdvdmVyZmxvdy15JywgJ2hpZGRlbicpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuZXhwYW5kLmxvYWRpbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5ydW4oKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgcnVuKCkge1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnaGVpZ2h0JywgbnVsbCk7XG4gICAgY29uc3QgbmV3SGVpZ2h0ID0gdGhpcy5kb21BZGFwdGVyLmNvbXB1dGVkSGVpZ2h0KHRoaXMuZWwubmF0aXZlRWxlbWVudCk7XG4gICAgdGhpcy5ydW5uaW5nID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmFuaW1hdGUoXG4gICAgICB7IGhlaWdodDogW3RoaXMub2xkSGVpZ2h0ICsgJ3B4JywgbmV3SGVpZ2h0ICsgJ3B4J10sIGVhc2luZzogJ2Vhc2UtaW4tb3V0JyB9LFxuICAgICAgeyBkdXJhdGlvbjogMjAwIH1cbiAgICApO1xuICAgIHRoaXMucnVubmluZy5vbmZpbmlzaCA9ICgpID0+IHtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnb3ZlcmZsb3cteScsIG51bGwpO1xuICAgICAgZGVsZXRlIHRoaXMucnVubmluZztcbiAgICB9O1xuICAgIGRlbGV0ZSB0aGlzLm9sZEhlaWdodDtcbiAgfVxufVxuIl19