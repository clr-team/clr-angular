/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
            expand.animate.subscribe(function () {
                // We already had an animation waiting, so we just have to run in, not prepare again
                if (_this.oldHeight) {
                    setTimeout(function () { return _this.run(); });
                }
                else {
                    _this.animate();
                }
            });
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
     * @return {?}
     */
    DatagridRowExpandAnimation.prototype.animate = /*
         * Dirty manual animation handling, but we have no way to use dynamic heights in Angular's current API.
         * They're working on it, but have no ETA.
         */
    /**
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
        // We set the height of the element immediately to avoid a flicker before the animation starts.
        this.renderer.setStyle(this.el.nativeElement, 'height', this.oldHeight + 'px');
        this.renderer.setStyle(this.el.nativeElement, 'overflow-y', 'hidden');
        setTimeout(function () {
            if (_this.expand.loading) {
                return;
            }
            _this.run();
        });
    };
    /**
     * @return {?}
     */
    DatagridRowExpandAnimation.prototype.run = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.renderer.setStyle(this.el.nativeElement, 'height', null);
        /** @type {?} */
        var newHeight = this.domAdapter.computedHeight(this.el.nativeElement);
        this.running = this.el.nativeElement.animate({ height: [this.oldHeight + 'px', newHeight + 'px'], easing: 'ease-in-out' }, { duration: 200 });
        this.running.onfinish = function () {
            _this.renderer.setStyle(_this.el.nativeElement, 'overflow-y', null);
            delete _this.running;
        };
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
    /** @type {?} */
    DatagridRowExpandAnimation.prototype.running;
    /** @type {?} */
    DatagridRowExpandAnimation.prototype.oldHeight;
    /** @type {?} */
    DatagridRowExpandAnimation.prototype.el;
    /** @type {?} */
    DatagridRowExpandAnimation.prototype.domAdapter;
    /** @type {?} */
    DatagridRowExpandAnimation.prototype.renderer;
    /** @type {?} */
    DatagridRowExpandAnimation.prototype.expand;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LWV4cGFuZC1hbmltYXRpb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJkYXRhL2RhdGFncmlkL2FuaW1hdGlvbi1oYWNrL3Jvdy1leHBhbmQtYW5pbWF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFXQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFakUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUVwRTtJQUVFLG9DQUNVLEVBQWMsRUFDZCxVQUFzQixFQUN0QixRQUFtQixFQUNuQixNQUFjO1FBSnhCLGlCQWdCQztRQWZTLE9BQUUsR0FBRixFQUFFLENBQVk7UUFDZCxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUV0QixJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFO1lBQzVCLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO2dCQUN2QixvRkFBb0Y7Z0JBQ3BGLElBQUksS0FBSSxDQUFDLFNBQVMsRUFBRTtvQkFDbEIsVUFBVSxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsR0FBRyxFQUFFLEVBQVYsQ0FBVSxDQUFDLENBQUM7aUJBQzlCO3FCQUFNO29CQUNMLEtBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztpQkFDaEI7WUFDSCxDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUtEOzs7U0FHSzs7Ozs7Ozs7SUFDRyw0Q0FBTzs7Ozs7OztJQUFmO1FBQUEsaUJBcUJDO1FBcEJDLGlGQUFpRjtRQUNqRixJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFO1lBQ2xDLE9BQU87U0FDUjtRQUVELGtEQUFrRDtRQUNsRCxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUN2QjtRQUVELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN2RSwrRkFBK0Y7UUFDL0YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDL0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3RFLFVBQVUsQ0FBQztZQUNULElBQUksS0FBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUU7Z0JBQ3ZCLE9BQU87YUFDUjtZQUNELEtBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNiLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7OztJQUVPLHdDQUFHOzs7SUFBWDtRQUFBLGlCQVlDO1FBWEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDOztZQUN4RCxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUM7UUFDdkUsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQzFDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLEVBQUUsU0FBUyxHQUFHLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsRUFDNUUsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQ2xCLENBQUM7UUFDRixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRztZQUN0QixLQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDbEUsT0FBTyxLQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3RCLENBQUMsQ0FBQztRQUNGLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDOztnQkE5REYsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRTs7OztnQkFMakIsVUFBVTtnQkFHckIsVUFBVTtnQkFIYSxTQUFTO2dCQUVoQyxNQUFNOztJQWtFZixpQ0FBQztDQUFBLEFBL0RELElBK0RDO1NBOURZLDBCQUEwQjs7O0lBbUJyQyw2Q0FBcUI7O0lBQ3JCLCtDQUEwQjs7SUFsQnhCLHdDQUFzQjs7SUFDdEIsZ0RBQThCOztJQUM5Qiw4Q0FBMkI7O0lBQzNCLDRDQUFzQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuLypcbiAqIFRoaXMgaXMgYSBoYWNrIHRoYXQgd2UgaGF2ZSB0byB3cml0ZSBmb3Igbm93IGJlY2F1c2Ugb2YgYnVncyBhbmQgbGltaXRhdGlvbnMgaW4gQW5ndWxhcixcbiAqIHBsZWFzZSBkbyBub3QgdXNlIHRoaXMgYXMgYW4gZXhhbXBsZS5cbiAqL1xuXG5pbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBFeHBhbmQgfSBmcm9tICcuLi8uLi8uLi91dGlscy9leHBhbmQvcHJvdmlkZXJzL2V4cGFuZCc7XG5pbXBvcnQgeyBEb21BZGFwdGVyIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvZG9tLWFkYXB0ZXIvZG9tLWFkYXB0ZXInO1xuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdjbHItZGctcm93JyB9KVxuZXhwb3J0IGNsYXNzIERhdGFncmlkUm93RXhwYW5kQW5pbWF0aW9uIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIGRvbUFkYXB0ZXI6IERvbUFkYXB0ZXIsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgZXhwYW5kOiBFeHBhbmRcbiAgKSB7XG4gICAgaWYgKGV4cGFuZCAmJiBleHBhbmQuYW5pbWF0ZSkge1xuICAgICAgZXhwYW5kLmFuaW1hdGUuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgLy8gV2UgYWxyZWFkeSBoYWQgYW4gYW5pbWF0aW9uIHdhaXRpbmcsIHNvIHdlIGp1c3QgaGF2ZSB0byBydW4gaW4sIG5vdCBwcmVwYXJlIGFnYWluXG4gICAgICAgIGlmICh0aGlzLm9sZEhlaWdodCkge1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5ydW4oKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5hbmltYXRlKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcnVubmluZzogYW55O1xuICBwcml2YXRlIG9sZEhlaWdodDogbnVtYmVyO1xuXG4gIC8qXG4gICAgICogRGlydHkgbWFudWFsIGFuaW1hdGlvbiBoYW5kbGluZywgYnV0IHdlIGhhdmUgbm8gd2F5IHRvIHVzZSBkeW5hbWljIGhlaWdodHMgaW4gQW5ndWxhcidzIGN1cnJlbnQgQVBJLlxuICAgICAqIFRoZXkncmUgd29ya2luZyBvbiBpdCwgYnV0IGhhdmUgbm8gRVRBLlxuICAgICAqL1xuICBwcml2YXRlIGFuaW1hdGUoKSB7XG4gICAgLy8gQ2hlY2sgaWYgd2UgZG8gaGF2ZSB3ZWItYW5pbWF0aW9ucyBhdmFpbGFibGUuIElmIG5vdCwganVzdCBza2lwIHRoZSBhbmltYXRpb24uXG4gICAgaWYgKCF0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuYW5pbWF0ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIFdlIGhhZCBhbiBhbmltYXRpb24gcnVubmluZywgd2Ugc2tpcCB0byB0aGUgZW5kXG4gICAgaWYgKHRoaXMucnVubmluZykge1xuICAgICAgdGhpcy5ydW5uaW5nLmZpbmlzaCgpO1xuICAgIH1cblxuICAgIHRoaXMub2xkSGVpZ2h0ID0gdGhpcy5kb21BZGFwdGVyLmNvbXB1dGVkSGVpZ2h0KHRoaXMuZWwubmF0aXZlRWxlbWVudCk7XG4gICAgLy8gV2Ugc2V0IHRoZSBoZWlnaHQgb2YgdGhlIGVsZW1lbnQgaW1tZWRpYXRlbHkgdG8gYXZvaWQgYSBmbGlja2VyIGJlZm9yZSB0aGUgYW5pbWF0aW9uIHN0YXJ0cy5cbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2hlaWdodCcsIHRoaXMub2xkSGVpZ2h0ICsgJ3B4Jyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdvdmVyZmxvdy15JywgJ2hpZGRlbicpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuZXhwYW5kLmxvYWRpbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5ydW4oKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgcnVuKCkge1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnaGVpZ2h0JywgbnVsbCk7XG4gICAgY29uc3QgbmV3SGVpZ2h0ID0gdGhpcy5kb21BZGFwdGVyLmNvbXB1dGVkSGVpZ2h0KHRoaXMuZWwubmF0aXZlRWxlbWVudCk7XG4gICAgdGhpcy5ydW5uaW5nID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmFuaW1hdGUoXG4gICAgICB7IGhlaWdodDogW3RoaXMub2xkSGVpZ2h0ICsgJ3B4JywgbmV3SGVpZ2h0ICsgJ3B4J10sIGVhc2luZzogJ2Vhc2UtaW4tb3V0JyB9LFxuICAgICAgeyBkdXJhdGlvbjogMjAwIH1cbiAgICApO1xuICAgIHRoaXMucnVubmluZy5vbmZpbmlzaCA9ICgpID0+IHtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnb3ZlcmZsb3cteScsIG51bGwpO1xuICAgICAgZGVsZXRlIHRoaXMucnVubmluZztcbiAgICB9O1xuICAgIGRlbGV0ZSB0aGlzLm9sZEhlaWdodDtcbiAgfVxufVxuIl19