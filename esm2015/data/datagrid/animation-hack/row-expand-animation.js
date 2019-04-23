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
        this.subscriptions = [];
        if (expand && expand.animate) {
            this.subscriptions.push(expand.animate.subscribe((/**
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
            })));
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscriptions.forEach((/**
         * @param {?} s
         * @return {?}
         */
        s => s.unsubscribe()));
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
    { type: DatagridIfExpandService }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LWV4cGFuZC1hbmltYXRpb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJkYXRhL2RhdGFncmlkL2FuaW1hdGlvbi1oYWNrL3Jvdy1leHBhbmQtYW5pbWF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFXQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFHNUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBRzFFLE1BQU0sT0FBTywwQkFBMEI7Ozs7Ozs7SUFHckMsWUFDVSxFQUFjLEVBQ2QsVUFBc0IsRUFDdEIsUUFBbUIsRUFDbkIsTUFBK0I7UUFIL0IsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUNkLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixXQUFNLEdBQU4sTUFBTSxDQUF5QjtRQU5qQyxrQkFBYSxHQUFtQixFQUFFLENBQUM7UUFRekMsSUFBSSxNQUFNLElBQUksTUFBTSxDQUFDLE9BQU8sRUFBRTtZQUM1QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FDckIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTOzs7WUFBQyxHQUFHLEVBQUU7Z0JBQzVCLG9GQUFvRjtnQkFDcEYsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO29CQUNsQixVQUFVOzs7b0JBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFDLENBQUM7aUJBQzlCO3FCQUFNO29CQUNMLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztpQkFDaEI7WUFDSCxDQUFDLEVBQUMsQ0FDSCxDQUFDO1NBQ0g7SUFDSCxDQUFDOzs7O0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTzs7OztRQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFDLENBQUM7SUFDbkQsQ0FBQzs7Ozs7Ozs7O0lBU08sT0FBTztRQUNiLGlGQUFpRjtRQUNqRixJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFO1lBQ2xDLE9BQU87U0FDUjtRQUVELGtEQUFrRDtRQUNsRCxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUN2QjtRQUVELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN2RSw0RUFBNEU7UUFDNUUsb0RBQW9EO1FBQ3BELElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztTQUNwQjtRQUNELCtGQUErRjtRQUMvRixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUMvRSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxZQUFZLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDdEUsVUFBVTs7O1FBQUMsR0FBRyxFQUFFO1lBQ2QsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRTtnQkFDdkIsT0FBTzthQUNSO1lBQ0QsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2IsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7OztJQUVPLEdBQUc7UUFDVCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7O2NBQ3hELFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQztRQUN2RSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FDMUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksRUFBRSxTQUFTLEdBQUcsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxFQUM1RSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FDbEIsQ0FBQztRQUNGLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUTs7O1FBQUcsR0FBRyxFQUFFO1lBQzNCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNsRSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDdEIsQ0FBQyxDQUFBLENBQUM7UUFDRixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQzs7O1lBM0VGLFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUU7Ozs7WUFOakIsVUFBVTtZQUdyQixVQUFVO1lBSGEsU0FBUztZQUloQyx1QkFBdUI7Ozs7Ozs7SUFJOUIsbURBQTJDOzs7OztJQTBCM0MsNkNBQXFCOzs7OztJQUNyQiwrQ0FBMEI7Ozs7O0lBeEJ4Qix3Q0FBc0I7Ozs7O0lBQ3RCLGdEQUE4Qjs7Ozs7SUFDOUIsOENBQTJCOzs7OztJQUMzQiw0Q0FBdUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbi8qXG4gKiBUaGlzIGlzIGEgaGFjayB0aGF0IHdlIGhhdmUgdG8gd3JpdGUgZm9yIG5vdyBiZWNhdXNlIG9mIGJ1Z3MgYW5kIGxpbWl0YXRpb25zIGluIEFuZ3VsYXIsXG4gKiBwbGVhc2UgZG8gbm90IHVzZSB0aGlzIGFzIGFuIGV4YW1wbGUuXG4gKi9cblxuaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBSZW5kZXJlcjIsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IERvbUFkYXB0ZXIgfSBmcm9tICcuLi8uLi8uLi91dGlscy9kb20tYWRhcHRlci9kb20tYWRhcHRlcic7XG5pbXBvcnQgeyBEYXRhZ3JpZElmRXhwYW5kU2VydmljZSB9IGZyb20gJy4uL2RhdGFncmlkLWlmLWV4cGFuZGVkLnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdjbHItZGctcm93JyB9KVxuZXhwb3J0IGNsYXNzIERhdGFncmlkUm93RXhwYW5kQW5pbWF0aW9uIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBkb21BZGFwdGVyOiBEb21BZGFwdGVyLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIGV4cGFuZDogRGF0YWdyaWRJZkV4cGFuZFNlcnZpY2VcbiAgKSB7XG4gICAgaWYgKGV4cGFuZCAmJiBleHBhbmQuYW5pbWF0ZSkge1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICAgIGV4cGFuZC5hbmltYXRlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgLy8gV2UgYWxyZWFkeSBoYWQgYW4gYW5pbWF0aW9uIHdhaXRpbmcsIHNvIHdlIGp1c3QgaGF2ZSB0byBydW4gaW4sIG5vdCBwcmVwYXJlIGFnYWluXG4gICAgICAgICAgaWYgKHRoaXMub2xkSGVpZ2h0KSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMucnVuKCkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHMgPT4gcy51bnN1YnNjcmliZSgpKTtcbiAgfVxuXG4gIHByaXZhdGUgcnVubmluZzogYW55O1xuICBwcml2YXRlIG9sZEhlaWdodDogbnVtYmVyO1xuXG4gIC8qXG4gICAgICogRGlydHkgbWFudWFsIGFuaW1hdGlvbiBoYW5kbGluZywgYnV0IHdlIGhhdmUgbm8gd2F5IHRvIHVzZSBkeW5hbWljIGhlaWdodHMgaW4gQW5ndWxhcidzIGN1cnJlbnQgQVBJLlxuICAgICAqIFRoZXkncmUgd29ya2luZyBvbiBpdCwgYnV0IGhhdmUgbm8gRVRBLlxuICAgICAqL1xuICBwcml2YXRlIGFuaW1hdGUoKSB7XG4gICAgLy8gQ2hlY2sgaWYgd2UgZG8gaGF2ZSB3ZWItYW5pbWF0aW9ucyBhdmFpbGFibGUuIElmIG5vdCwganVzdCBza2lwIHRoZSBhbmltYXRpb24uXG4gICAgaWYgKCF0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuYW5pbWF0ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIFdlIGhhZCBhbiBhbmltYXRpb24gcnVubmluZywgd2Ugc2tpcCB0byB0aGUgZW5kXG4gICAgaWYgKHRoaXMucnVubmluZykge1xuICAgICAgdGhpcy5ydW5uaW5nLmZpbmlzaCgpO1xuICAgIH1cblxuICAgIHRoaXMub2xkSGVpZ2h0ID0gdGhpcy5kb21BZGFwdGVyLmNvbXB1dGVkSGVpZ2h0KHRoaXMuZWwubmF0aXZlRWxlbWVudCk7XG4gICAgLy8gSW4gY2FzZSBoZWlnaHQgaGFzIG5vdCB5ZXQgYmVlbiBzZXQuIFdoZW4gc3RhcnRpbmcgZXhwYW5kZWQsIGZvciBleGFtcGxlLlxuICAgIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdm13YXJlL2NsYXJpdHkvaXNzdWVzLzI5MDRcbiAgICBpZiAoaXNOYU4odGhpcy5vbGRIZWlnaHQpKSB7XG4gICAgICB0aGlzLm9sZEhlaWdodCA9IDA7XG4gICAgfVxuICAgIC8vIFdlIHNldCB0aGUgaGVpZ2h0IG9mIHRoZSBlbGVtZW50IGltbWVkaWF0ZWx5IHRvIGF2b2lkIGEgZmxpY2tlciBiZWZvcmUgdGhlIGFuaW1hdGlvbiBzdGFydHMuXG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdoZWlnaHQnLCB0aGlzLm9sZEhlaWdodCArICdweCcpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnb3ZlcmZsb3cteScsICdoaWRkZW4nKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmICh0aGlzLmV4cGFuZC5sb2FkaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMucnVuKCk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHJ1bigpIHtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2hlaWdodCcsIG51bGwpO1xuICAgIGNvbnN0IG5ld0hlaWdodCA9IHRoaXMuZG9tQWRhcHRlci5jb21wdXRlZEhlaWdodCh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpO1xuICAgIHRoaXMucnVubmluZyA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5hbmltYXRlKFxuICAgICAgeyBoZWlnaHQ6IFt0aGlzLm9sZEhlaWdodCArICdweCcsIG5ld0hlaWdodCArICdweCddLCBlYXNpbmc6ICdlYXNlLWluLW91dCcgfSxcbiAgICAgIHsgZHVyYXRpb246IDIwMCB9XG4gICAgKTtcbiAgICB0aGlzLnJ1bm5pbmcub25maW5pc2ggPSAoKSA9PiB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ292ZXJmbG93LXknLCBudWxsKTtcbiAgICAgIGRlbGV0ZSB0aGlzLnJ1bm5pbmc7XG4gICAgfTtcbiAgICBkZWxldGUgdGhpcy5vbGRIZWlnaHQ7XG4gIH1cbn1cbiJdfQ==