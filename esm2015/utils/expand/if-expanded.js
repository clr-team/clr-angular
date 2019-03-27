/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive, ElementRef, EventEmitter, Input, Optional, Output, Renderer2, TemplateRef, ViewContainerRef, } from '@angular/core';
import { Expand } from './providers/expand';
/**
 * TODO: make this a reusable directive outside of Datagrid, like [clrLoading].
 */
export class ClrIfExpanded {
    /**
     * @param {?} template
     * @param {?} container
     * @param {?} el
     * @param {?} renderer
     * @param {?} expand
     */
    constructor(template, container, el, renderer, expand) {
        this.template = template;
        this.container = container;
        this.el = el;
        this.renderer = renderer;
        this.expand = expand;
        this._expanded = false;
        this.expandedChange = new EventEmitter(true);
        /**
         * Subscriptions to all the services and queries changes
         */
        this._subscriptions = [];
        expand.expandable++;
        this._subscriptions.push(expand.expandChange.subscribe((/**
         * @return {?}
         */
        () => {
            this.updateView();
            this.expandedChange.emit(this.expand.expanded);
        })));
    }
    /**
     * @return {?}
     */
    get expanded() {
        return this._expanded;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set expanded(value) {
        if (typeof value === 'boolean') {
            this.expand.expanded = value;
            this._expanded = value;
        }
    }
    /**
     * @private
     * @return {?}
     */
    updateView() {
        if (this.expand.expanded && this.container.length !== 0) {
            return;
        }
        if (this.template) {
            if (this.expand.expanded) {
                // Should we pass a context? I don't see anything useful to pass right now,
                // but we can come back to it in the future as a solution for additional features.
                this.container.createEmbeddedView(this.template);
            }
            else {
                // TODO: Move when we move the animation logic to Datagrid Row Expand
                // We clear before the animation is over. Not ideal, but doing better would involve a much heavier
                // process for very little gain. Once Angular animations are dynamic enough, we should be able to
                // get the optimal behavior.
                this.container.clear();
            }
        }
        else {
            try {
                // If we don't have a template ref, we fallback to a crude display: none for now.
                if (this.expand.expanded) {
                    this.renderer.setStyle(this.el.nativeElement, 'display', null);
                }
                else {
                    this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
                }
            }
            catch (e) {
                // We catch the case where clrIfExpanded was put on a non-DOM element, and we just do nothing
            }
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.updateView();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.expand.expandable--;
        this._subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        (sub) => sub.unsubscribe()));
    }
}
ClrIfExpanded.decorators = [
    { type: Directive, args: [{ selector: '[clrIfExpanded]' },] }
];
/** @nocollapse */
ClrIfExpanded.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] },
    { type: ViewContainerRef },
    { type: ElementRef },
    { type: Renderer2 },
    { type: Expand }
];
ClrIfExpanded.propDecorators = {
    expanded: [{ type: Input, args: ['clrIfExpanded',] }],
    expandedChange: [{ type: Output, args: ['clrIfExpandedChange',] }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    ClrIfExpanded.prototype._expanded;
    /** @type {?} */
    ClrIfExpanded.prototype.expandedChange;
    /**
     * Subscriptions to all the services and queries changes
     * @type {?}
     * @private
     */
    ClrIfExpanded.prototype._subscriptions;
    /**
     * @type {?}
     * @private
     */
    ClrIfExpanded.prototype.template;
    /**
     * @type {?}
     * @private
     */
    ClrIfExpanded.prototype.container;
    /**
     * @type {?}
     * @private
     */
    ClrIfExpanded.prototype.el;
    /**
     * @type {?}
     * @private
     */
    ClrIfExpanded.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    ClrIfExpanded.prototype.expand;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWYtZXhwYW5kZWQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJ1dGlscy9leHBhbmQvaWYtZXhwYW5kZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUNMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFHTCxRQUFRLEVBQ1IsTUFBTSxFQUNOLFNBQVMsRUFDVCxXQUFXLEVBQ1gsZ0JBQWdCLEdBQ2pCLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7OztBQU01QyxNQUFNLE9BQU8sYUFBYTs7Ozs7Ozs7SUFpQnhCLFlBQ3NCLFFBQTBCLEVBQ3RDLFNBQTJCLEVBQzNCLEVBQWMsRUFDZCxRQUFtQixFQUNuQixNQUFjO1FBSkYsYUFBUSxHQUFSLFFBQVEsQ0FBa0I7UUFDdEMsY0FBUyxHQUFULFNBQVMsQ0FBa0I7UUFDM0IsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUNkLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQXJCaEIsY0FBUyxHQUFZLEtBQUssQ0FBQztRQWNKLG1CQUFjLEdBQTBCLElBQUksWUFBWSxDQUFVLElBQUksQ0FBQyxDQUFDOzs7O1FBcUIvRixtQkFBYyxHQUFtQixFQUFFLENBQUM7UUFaMUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUN0QixNQUFNLENBQUMsWUFBWSxDQUFDLFNBQVM7OztRQUFDLEdBQUcsRUFBRTtZQUNqQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDbEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNqRCxDQUFDLEVBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQzs7OztJQTVCRCxJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQzs7Ozs7SUFFRCxJQUNJLFFBQVEsQ0FBQyxLQUFjO1FBQ3pCLElBQUksT0FBTyxLQUFLLEtBQUssU0FBUyxFQUFFO1lBQzlCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztZQUM3QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztTQUN4QjtJQUNILENBQUM7Ozs7O0lBeUJPLFVBQVU7UUFDaEIsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDdkQsT0FBTztTQUNSO1FBQ0QsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pCLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUU7Z0JBQ3hCLDJFQUEyRTtnQkFDM0Usa0ZBQWtGO2dCQUNsRixJQUFJLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUNsRDtpQkFBTTtnQkFDTCxxRUFBcUU7Z0JBQ3JFLGtHQUFrRztnQkFDbEcsaUdBQWlHO2dCQUNqRyw0QkFBNEI7Z0JBQzVCLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDeEI7U0FDRjthQUFNO1lBQ0wsSUFBSTtnQkFDRixpRkFBaUY7Z0JBQ2pGLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUU7b0JBQ3hCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztpQkFDaEU7cUJBQU07b0JBQ0wsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2lCQUNsRTthQUNGO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1YsNkZBQTZGO2FBQzlGO1NBQ0Y7SUFDSCxDQUFDOzs7O0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNwQixDQUFDOzs7O0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPOzs7O1FBQUMsQ0FBQyxHQUFpQixFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLEVBQUMsQ0FBQztJQUN4RSxDQUFDOzs7WUE1RUYsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFFOzs7O1lBVnhDLFdBQVcsdUJBNkJSLFFBQVE7WUE1QlgsZ0JBQWdCO1lBVGhCLFVBQVU7WUFPVixTQUFTO1lBTUYsTUFBTTs7O3VCQWFaLEtBQUssU0FBQyxlQUFlOzZCQVFyQixNQUFNLFNBQUMscUJBQXFCOzs7Ozs7O0lBZDdCLGtDQUFtQzs7SUFjbkMsdUNBQXVHOzs7Ozs7SUFxQnZHLHVDQUE0Qzs7Ozs7SUFsQjFDLGlDQUE4Qzs7Ozs7SUFDOUMsa0NBQW1DOzs7OztJQUNuQywyQkFBc0I7Ozs7O0lBQ3RCLGlDQUEyQjs7Ozs7SUFDM0IsK0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbiAgUmVuZGVyZXIyLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NvbnRhaW5lclJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgRXhwYW5kIH0gZnJvbSAnLi9wcm92aWRlcnMvZXhwYW5kJztcblxuLyoqXG4gKiBUT0RPOiBtYWtlIHRoaXMgYSByZXVzYWJsZSBkaXJlY3RpdmUgb3V0c2lkZSBvZiBEYXRhZ3JpZCwgbGlrZSBbY2xyTG9hZGluZ10uXG4gKi9cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tjbHJJZkV4cGFuZGVkXScgfSlcbmV4cG9ydCBjbGFzcyBDbHJJZkV4cGFuZGVkIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBwcml2YXRlIF9leHBhbmRlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGdldCBleHBhbmRlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZXhwYW5kZWQ7XG4gIH1cblxuICBASW5wdXQoJ2NscklmRXhwYW5kZWQnKVxuICBzZXQgZXhwYW5kZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicpIHtcbiAgICAgIHRoaXMuZXhwYW5kLmV4cGFuZGVkID0gdmFsdWU7XG4gICAgICB0aGlzLl9leHBhbmRlZCA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIEBPdXRwdXQoJ2NscklmRXhwYW5kZWRDaGFuZ2UnKSBleHBhbmRlZENoYW5nZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPih0cnVlKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+LFxuICAgIHByaXZhdGUgY29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgZXhwYW5kOiBFeHBhbmRcbiAgKSB7XG4gICAgZXhwYW5kLmV4cGFuZGFibGUrKztcbiAgICB0aGlzLl9zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICBleHBhbmQuZXhwYW5kQ2hhbmdlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMudXBkYXRlVmlldygpO1xuICAgICAgICB0aGlzLmV4cGFuZGVkQ2hhbmdlLmVtaXQodGhpcy5leHBhbmQuZXhwYW5kZWQpO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFN1YnNjcmlwdGlvbnMgdG8gYWxsIHRoZSBzZXJ2aWNlcyBhbmQgcXVlcmllcyBjaGFuZ2VzXG4gICAqL1xuICBwcml2YXRlIF9zdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gIHByaXZhdGUgdXBkYXRlVmlldygpIHtcbiAgICBpZiAodGhpcy5leHBhbmQuZXhwYW5kZWQgJiYgdGhpcy5jb250YWluZXIubGVuZ3RoICE9PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLnRlbXBsYXRlKSB7XG4gICAgICBpZiAodGhpcy5leHBhbmQuZXhwYW5kZWQpIHtcbiAgICAgICAgLy8gU2hvdWxkIHdlIHBhc3MgYSBjb250ZXh0PyBJIGRvbid0IHNlZSBhbnl0aGluZyB1c2VmdWwgdG8gcGFzcyByaWdodCBub3csXG4gICAgICAgIC8vIGJ1dCB3ZSBjYW4gY29tZSBiYWNrIHRvIGl0IGluIHRoZSBmdXR1cmUgYXMgYSBzb2x1dGlvbiBmb3IgYWRkaXRpb25hbCBmZWF0dXJlcy5cbiAgICAgICAgdGhpcy5jb250YWluZXIuY3JlYXRlRW1iZWRkZWRWaWV3KHRoaXMudGVtcGxhdGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gVE9ETzogTW92ZSB3aGVuIHdlIG1vdmUgdGhlIGFuaW1hdGlvbiBsb2dpYyB0byBEYXRhZ3JpZCBSb3cgRXhwYW5kXG4gICAgICAgIC8vIFdlIGNsZWFyIGJlZm9yZSB0aGUgYW5pbWF0aW9uIGlzIG92ZXIuIE5vdCBpZGVhbCwgYnV0IGRvaW5nIGJldHRlciB3b3VsZCBpbnZvbHZlIGEgbXVjaCBoZWF2aWVyXG4gICAgICAgIC8vIHByb2Nlc3MgZm9yIHZlcnkgbGl0dGxlIGdhaW4uIE9uY2UgQW5ndWxhciBhbmltYXRpb25zIGFyZSBkeW5hbWljIGVub3VnaCwgd2Ugc2hvdWxkIGJlIGFibGUgdG9cbiAgICAgICAgLy8gZ2V0IHRoZSBvcHRpbWFsIGJlaGF2aW9yLlxuICAgICAgICB0aGlzLmNvbnRhaW5lci5jbGVhcigpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBJZiB3ZSBkb24ndCBoYXZlIGEgdGVtcGxhdGUgcmVmLCB3ZSBmYWxsYmFjayB0byBhIGNydWRlIGRpc3BsYXk6IG5vbmUgZm9yIG5vdy5cbiAgICAgICAgaWYgKHRoaXMuZXhwYW5kLmV4cGFuZGVkKSB7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdkaXNwbGF5JywgbnVsbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBXZSBjYXRjaCB0aGUgY2FzZSB3aGVyZSBjbHJJZkV4cGFuZGVkIHdhcyBwdXQgb24gYSBub24tRE9NIGVsZW1lbnQsIGFuZCB3ZSBqdXN0IGRvIG5vdGhpbmdcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnVwZGF0ZVZpZXcoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuZXhwYW5kLmV4cGFuZGFibGUtLTtcbiAgICB0aGlzLl9zdWJzY3JpcHRpb25zLmZvckVhY2goKHN1YjogU3Vic2NyaXB0aW9uKSA9PiBzdWIudW5zdWJzY3JpYmUoKSk7XG4gIH1cbn1cbiJdfQ==