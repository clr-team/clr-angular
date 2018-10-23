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
export class DatagridRowExpandAnimation {
    /**
     * @param {?} el
     * @param {?} domAdapter
     * @param {?} renderer
     * @param {?} expand
     */
    constructor(el, domAdapter, renderer, expand) {
        this.el = el;
        this.domAdapter = domAdapter;
        this.renderer = renderer;
        this.expand = expand;
        if (expand && expand.animate) {
            expand.animate.subscribe(() => {
                // We already had an animation waiting, so we just have to run in, not prepare again
                if (this.oldHeight) {
                    setTimeout(() => this.run());
                }
                else {
                    this.animate();
                }
            });
        }
    }
    /*
         * Dirty manual animation handling, but we have no way to use dynamic heights in Angular's current API.
         * They're working on it, but have no ETA.
         */
    /**
     * @return {?}
     */
    animate() {
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
        setTimeout(() => {
            if (this.expand.loading) {
                return;
            }
            this.run();
        });
    }
    /**
     * @return {?}
     */
    run() {
        this.renderer.setStyle(this.el.nativeElement, 'height', null);
        /** @type {?} */
        const newHeight = this.domAdapter.computedHeight(this.el.nativeElement);
        this.running = this.el.nativeElement.animate({ height: [this.oldHeight + 'px', newHeight + 'px'], easing: 'ease-in-out' }, { duration: 200 });
        this.running.onfinish = () => {
            this.renderer.setStyle(this.el.nativeElement, 'overflow-y', null);
            delete this.running;
        };
        delete this.oldHeight;
    }
}
DatagridRowExpandAnimation.decorators = [
    { type: Directive, args: [{ selector: 'clr-dg-row' },] }
];
/** @nocollapse */
DatagridRowExpandAnimation.ctorParameters = () => [
    { type: ElementRef },
    { type: DomAdapter },
    { type: Renderer2 },
    { type: Expand }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LWV4cGFuZC1hbmltYXRpb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJkYXRhL2RhdGFncmlkL2FuaW1hdGlvbi1oYWNrL3Jvdy1leHBhbmQtYW5pbWF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFXQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFakUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUdwRSxNQUFNLE9BQU8sMEJBQTBCOzs7Ozs7O0lBQ3JDLFlBQ1UsRUFBYyxFQUNkLFVBQXNCLEVBQ3RCLFFBQW1CLEVBQ25CLE1BQWM7UUFIZCxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQ2QsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25CLFdBQU0sR0FBTixNQUFNLENBQVE7UUFFdEIsSUFBSSxNQUFNLElBQUksTUFBTSxDQUFDLE9BQU8sRUFBRTtZQUM1QixNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7Z0JBQzVCLG9GQUFvRjtnQkFDcEYsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO29CQUNsQixVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7aUJBQzlCO3FCQUFNO29CQUNMLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztpQkFDaEI7WUFDSCxDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQzs7Ozs7Ozs7SUFTTyxPQUFPO1FBQ2IsaUZBQWlGO1FBQ2pGLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUU7WUFDbEMsT0FBTztTQUNSO1FBRUQsa0RBQWtEO1FBQ2xELElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoQixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ3ZCO1FBRUQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3ZFLCtGQUErRjtRQUMvRixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUMvRSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxZQUFZLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDdEUsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNkLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUU7Z0JBQ3ZCLE9BQU87YUFDUjtZQUNELElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNiLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7OztJQUVPLEdBQUc7UUFDVCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7O2NBQ3hELFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQztRQUN2RSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FDMUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksRUFBRSxTQUFTLEdBQUcsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxFQUM1RSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FDbEIsQ0FBQztRQUNGLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLEdBQUcsRUFBRTtZQUMzQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDbEUsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3RCLENBQUMsQ0FBQztRQUNGLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDOzs7WUE5REYsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRTs7OztZQUxqQixVQUFVO1lBR3JCLFVBQVU7WUFIYSxTQUFTO1lBRWhDLE1BQU07Ozs7SUF1QmIsNkNBQXFCOztJQUNyQiwrQ0FBMEI7O0lBbEJ4Qix3Q0FBc0I7O0lBQ3RCLGdEQUE4Qjs7SUFDOUIsOENBQTJCOztJQUMzQiw0Q0FBc0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbi8qXG4gKiBUaGlzIGlzIGEgaGFjayB0aGF0IHdlIGhhdmUgdG8gd3JpdGUgZm9yIG5vdyBiZWNhdXNlIG9mIGJ1Z3MgYW5kIGxpbWl0YXRpb25zIGluIEFuZ3VsYXIsXG4gKiBwbGVhc2UgZG8gbm90IHVzZSB0aGlzIGFzIGFuIGV4YW1wbGUuXG4gKi9cblxuaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRXhwYW5kIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvZXhwYW5kL3Byb3ZpZGVycy9leHBhbmQnO1xuaW1wb3J0IHsgRG9tQWRhcHRlciB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2RvbS1hZGFwdGVyL2RvbS1hZGFwdGVyJztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnY2xyLWRnLXJvdycgfSlcbmV4cG9ydCBjbGFzcyBEYXRhZ3JpZFJvd0V4cGFuZEFuaW1hdGlvbiB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBkb21BZGFwdGVyOiBEb21BZGFwdGVyLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIGV4cGFuZDogRXhwYW5kXG4gICkge1xuICAgIGlmIChleHBhbmQgJiYgZXhwYW5kLmFuaW1hdGUpIHtcbiAgICAgIGV4cGFuZC5hbmltYXRlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIC8vIFdlIGFscmVhZHkgaGFkIGFuIGFuaW1hdGlvbiB3YWl0aW5nLCBzbyB3ZSBqdXN0IGhhdmUgdG8gcnVuIGluLCBub3QgcHJlcGFyZSBhZ2FpblxuICAgICAgICBpZiAodGhpcy5vbGRIZWlnaHQpIHtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMucnVuKCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuYW5pbWF0ZSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJ1bm5pbmc6IGFueTtcbiAgcHJpdmF0ZSBvbGRIZWlnaHQ6IG51bWJlcjtcblxuICAvKlxuICAgICAqIERpcnR5IG1hbnVhbCBhbmltYXRpb24gaGFuZGxpbmcsIGJ1dCB3ZSBoYXZlIG5vIHdheSB0byB1c2UgZHluYW1pYyBoZWlnaHRzIGluIEFuZ3VsYXIncyBjdXJyZW50IEFQSS5cbiAgICAgKiBUaGV5J3JlIHdvcmtpbmcgb24gaXQsIGJ1dCBoYXZlIG5vIEVUQS5cbiAgICAgKi9cbiAgcHJpdmF0ZSBhbmltYXRlKCkge1xuICAgIC8vIENoZWNrIGlmIHdlIGRvIGhhdmUgd2ViLWFuaW1hdGlvbnMgYXZhaWxhYmxlLiBJZiBub3QsIGp1c3Qgc2tpcCB0aGUgYW5pbWF0aW9uLlxuICAgIGlmICghdGhpcy5lbC5uYXRpdmVFbGVtZW50LmFuaW1hdGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBXZSBoYWQgYW4gYW5pbWF0aW9uIHJ1bm5pbmcsIHdlIHNraXAgdG8gdGhlIGVuZFxuICAgIGlmICh0aGlzLnJ1bm5pbmcpIHtcbiAgICAgIHRoaXMucnVubmluZy5maW5pc2goKTtcbiAgICB9XG5cbiAgICB0aGlzLm9sZEhlaWdodCA9IHRoaXMuZG9tQWRhcHRlci5jb21wdXRlZEhlaWdodCh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpO1xuICAgIC8vIFdlIHNldCB0aGUgaGVpZ2h0IG9mIHRoZSBlbGVtZW50IGltbWVkaWF0ZWx5IHRvIGF2b2lkIGEgZmxpY2tlciBiZWZvcmUgdGhlIGFuaW1hdGlvbiBzdGFydHMuXG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdoZWlnaHQnLCB0aGlzLm9sZEhlaWdodCArICdweCcpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnb3ZlcmZsb3cteScsICdoaWRkZW4nKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmICh0aGlzLmV4cGFuZC5sb2FkaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMucnVuKCk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHJ1bigpIHtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2hlaWdodCcsIG51bGwpO1xuICAgIGNvbnN0IG5ld0hlaWdodCA9IHRoaXMuZG9tQWRhcHRlci5jb21wdXRlZEhlaWdodCh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpO1xuICAgIHRoaXMucnVubmluZyA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5hbmltYXRlKFxuICAgICAgeyBoZWlnaHQ6IFt0aGlzLm9sZEhlaWdodCArICdweCcsIG5ld0hlaWdodCArICdweCddLCBlYXNpbmc6ICdlYXNlLWluLW91dCcgfSxcbiAgICAgIHsgZHVyYXRpb246IDIwMCB9XG4gICAgKTtcbiAgICB0aGlzLnJ1bm5pbmcub25maW5pc2ggPSAoKSA9PiB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ292ZXJmbG93LXknLCBudWxsKTtcbiAgICAgIGRlbGV0ZSB0aGlzLnJ1bm5pbmc7XG4gICAgfTtcbiAgICBkZWxldGUgdGhpcy5vbGRIZWlnaHQ7XG4gIH1cbn1cbiJdfQ==