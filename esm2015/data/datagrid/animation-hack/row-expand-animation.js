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
            expand.animate.subscribe((/**
             * @return {?}
             */
            () => {
                // We already had an animation waiting, so we just have to run in, not prepare again
                if (this.oldHeight) {
                    setTimeout((/**
                     * @return {?}
                     */
                    () => this.run()));
                }
                else {
                    this.animate();
                }
            }));
        }
    }
    /*
         * Dirty manual animation handling, but we have no way to use dynamic heights in Angular's current API.
         * They're working on it, but have no ETA.
         */
    /**
     * @private
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
        () => {
            if (this.expand.loading) {
                return;
            }
            this.run();
        }));
    }
    /**
     * @private
     * @return {?}
     */
    run() {
        this.renderer.setStyle(this.el.nativeElement, 'height', null);
        /** @type {?} */
        const newHeight = this.domAdapter.computedHeight(this.el.nativeElement);
        this.running = this.el.nativeElement.animate({ height: [this.oldHeight + 'px', newHeight + 'px'], easing: 'ease-in-out' }, { duration: 200 });
        this.running.onfinish = (/**
         * @return {?}
         */
        () => {
            this.renderer.setStyle(this.el.nativeElement, 'overflow-y', null);
            delete this.running;
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LWV4cGFuZC1hbmltYXRpb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJkYXRhL2RhdGFncmlkL2FuaW1hdGlvbi1oYWNrL3Jvdy1leHBhbmQtYW5pbWF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFXQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFakUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUdwRSxNQUFNLE9BQU8sMEJBQTBCOzs7Ozs7O0lBQ3JDLFlBQ1UsRUFBYyxFQUNkLFVBQXNCLEVBQ3RCLFFBQW1CLEVBQ25CLE1BQWM7UUFIZCxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQ2QsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25CLFdBQU0sR0FBTixNQUFNLENBQVE7UUFFdEIsSUFBSSxNQUFNLElBQUksTUFBTSxDQUFDLE9BQU8sRUFBRTtZQUM1QixNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVM7OztZQUFDLEdBQUcsRUFBRTtnQkFDNUIsb0ZBQW9GO2dCQUNwRixJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7b0JBQ2xCLFVBQVU7OztvQkFBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUMsQ0FBQztpQkFDOUI7cUJBQU07b0JBQ0wsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO2lCQUNoQjtZQUNILENBQUMsRUFBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDOzs7Ozs7Ozs7SUFTTyxPQUFPO1FBQ2IsaUZBQWlGO1FBQ2pGLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUU7WUFDbEMsT0FBTztTQUNSO1FBRUQsa0RBQWtEO1FBQ2xELElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoQixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ3ZCO1FBRUQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3ZFLDRFQUE0RTtRQUM1RSxvREFBb0Q7UUFDcEQsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ3pCLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1NBQ3BCO1FBQ0QsK0ZBQStGO1FBQy9GLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQy9FLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQztRQUN0RSxVQUFVOzs7UUFBQyxHQUFHLEVBQUU7WUFDZCxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFO2dCQUN2QixPQUFPO2FBQ1I7WUFDRCxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDYixDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7O0lBRU8sR0FBRztRQUNULElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQzs7Y0FDeEQsU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUMxQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxFQUFFLFNBQVMsR0FBRyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLEVBQzVFLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUNsQixDQUFDO1FBQ0YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFROzs7UUFBRyxHQUFHLEVBQUU7WUFDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ2xFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN0QixDQUFDLENBQUEsQ0FBQztRQUNGLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDOzs7WUFuRUYsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRTs7OztZQUxqQixVQUFVO1lBR3JCLFVBQVU7WUFIYSxTQUFTO1lBRWhDLE1BQU07Ozs7Ozs7SUF1QmIsNkNBQXFCOzs7OztJQUNyQiwrQ0FBMEI7Ozs7O0lBbEJ4Qix3Q0FBc0I7Ozs7O0lBQ3RCLGdEQUE4Qjs7Ozs7SUFDOUIsOENBQTJCOzs7OztJQUMzQiw0Q0FBc0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbi8qXG4gKiBUaGlzIGlzIGEgaGFjayB0aGF0IHdlIGhhdmUgdG8gd3JpdGUgZm9yIG5vdyBiZWNhdXNlIG9mIGJ1Z3MgYW5kIGxpbWl0YXRpb25zIGluIEFuZ3VsYXIsXG4gKiBwbGVhc2UgZG8gbm90IHVzZSB0aGlzIGFzIGFuIGV4YW1wbGUuXG4gKi9cblxuaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRXhwYW5kIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvZXhwYW5kL3Byb3ZpZGVycy9leHBhbmQnO1xuaW1wb3J0IHsgRG9tQWRhcHRlciB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2RvbS1hZGFwdGVyL2RvbS1hZGFwdGVyJztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnY2xyLWRnLXJvdycgfSlcbmV4cG9ydCBjbGFzcyBEYXRhZ3JpZFJvd0V4cGFuZEFuaW1hdGlvbiB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBkb21BZGFwdGVyOiBEb21BZGFwdGVyLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIGV4cGFuZDogRXhwYW5kXG4gICkge1xuICAgIGlmIChleHBhbmQgJiYgZXhwYW5kLmFuaW1hdGUpIHtcbiAgICAgIGV4cGFuZC5hbmltYXRlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIC8vIFdlIGFscmVhZHkgaGFkIGFuIGFuaW1hdGlvbiB3YWl0aW5nLCBzbyB3ZSBqdXN0IGhhdmUgdG8gcnVuIGluLCBub3QgcHJlcGFyZSBhZ2FpblxuICAgICAgICBpZiAodGhpcy5vbGRIZWlnaHQpIHtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMucnVuKCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuYW5pbWF0ZSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJ1bm5pbmc6IGFueTtcbiAgcHJpdmF0ZSBvbGRIZWlnaHQ6IG51bWJlcjtcblxuICAvKlxuICAgICAqIERpcnR5IG1hbnVhbCBhbmltYXRpb24gaGFuZGxpbmcsIGJ1dCB3ZSBoYXZlIG5vIHdheSB0byB1c2UgZHluYW1pYyBoZWlnaHRzIGluIEFuZ3VsYXIncyBjdXJyZW50IEFQSS5cbiAgICAgKiBUaGV5J3JlIHdvcmtpbmcgb24gaXQsIGJ1dCBoYXZlIG5vIEVUQS5cbiAgICAgKi9cbiAgcHJpdmF0ZSBhbmltYXRlKCkge1xuICAgIC8vIENoZWNrIGlmIHdlIGRvIGhhdmUgd2ViLWFuaW1hdGlvbnMgYXZhaWxhYmxlLiBJZiBub3QsIGp1c3Qgc2tpcCB0aGUgYW5pbWF0aW9uLlxuICAgIGlmICghdGhpcy5lbC5uYXRpdmVFbGVtZW50LmFuaW1hdGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBXZSBoYWQgYW4gYW5pbWF0aW9uIHJ1bm5pbmcsIHdlIHNraXAgdG8gdGhlIGVuZFxuICAgIGlmICh0aGlzLnJ1bm5pbmcpIHtcbiAgICAgIHRoaXMucnVubmluZy5maW5pc2goKTtcbiAgICB9XG5cbiAgICB0aGlzLm9sZEhlaWdodCA9IHRoaXMuZG9tQWRhcHRlci5jb21wdXRlZEhlaWdodCh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpO1xuICAgIC8vIEluIGNhc2UgaGVpZ2h0IGhhcyBub3QgeWV0IGJlZW4gc2V0LiBXaGVuIHN0YXJ0aW5nIGV4cGFuZGVkLCBmb3IgZXhhbXBsZS5cbiAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3Ztd2FyZS9jbGFyaXR5L2lzc3Vlcy8yOTA0XG4gICAgaWYgKGlzTmFOKHRoaXMub2xkSGVpZ2h0KSkge1xuICAgICAgdGhpcy5vbGRIZWlnaHQgPSAwO1xuICAgIH1cbiAgICAvLyBXZSBzZXQgdGhlIGhlaWdodCBvZiB0aGUgZWxlbWVudCBpbW1lZGlhdGVseSB0byBhdm9pZCBhIGZsaWNrZXIgYmVmb3JlIHRoZSBhbmltYXRpb24gc3RhcnRzLlxuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnaGVpZ2h0JywgdGhpcy5vbGRIZWlnaHQgKyAncHgnKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ292ZXJmbG93LXknLCAnaGlkZGVuJyk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5leHBhbmQubG9hZGluZykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLnJ1bigpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBydW4oKSB7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdoZWlnaHQnLCBudWxsKTtcbiAgICBjb25zdCBuZXdIZWlnaHQgPSB0aGlzLmRvbUFkYXB0ZXIuY29tcHV0ZWRIZWlnaHQodGhpcy5lbC5uYXRpdmVFbGVtZW50KTtcbiAgICB0aGlzLnJ1bm5pbmcgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuYW5pbWF0ZShcbiAgICAgIHsgaGVpZ2h0OiBbdGhpcy5vbGRIZWlnaHQgKyAncHgnLCBuZXdIZWlnaHQgKyAncHgnXSwgZWFzaW5nOiAnZWFzZS1pbi1vdXQnIH0sXG4gICAgICB7IGR1cmF0aW9uOiAyMDAgfVxuICAgICk7XG4gICAgdGhpcy5ydW5uaW5nLm9uZmluaXNoID0gKCkgPT4ge1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdvdmVyZmxvdy15JywgbnVsbCk7XG4gICAgICBkZWxldGUgdGhpcy5ydW5uaW5nO1xuICAgIH07XG4gICAgZGVsZXRlIHRoaXMub2xkSGVpZ2h0O1xuICB9XG59XG4iXX0=