/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive, EventEmitter, Input, Output, TemplateRef, ViewContainerRef, } from '@angular/core';
import { Expand } from './providers/expand';
/**
 * TODO: make this a reusable directive outside of Datagrid, like [clrLoading].
 */
export class ClrIfExpanded {
    /**
     * @param {?} template
     * @param {?} container
     * @param {?} expand
     */
    constructor(template, container, expand) {
        this.template = template;
        this.container = container;
        this.expand = expand;
        this._expanded = false;
        this.expandedChange = new EventEmitter(true);
        /**
         * Subscriptions to all the services and queries changes
         */
        this._subscriptions = [];
        expand.expandable++;
        this._subscriptions.push(expand.expandChange.subscribe(() => {
            this.updateView();
            this.expandedChange.emit(this.expand.expanded);
        }));
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
     * @return {?}
     */
    updateView() {
        if (this.expand.expanded && this.container.length !== 0) {
            return;
        }
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
        this._subscriptions.forEach((sub) => sub.unsubscribe());
    }
}
ClrIfExpanded.decorators = [
    { type: Directive, args: [{ selector: '[clrIfExpanded]' },] }
];
/** @nocollapse */
ClrIfExpanded.ctorParameters = () => [
    { type: TemplateRef },
    { type: ViewContainerRef },
    { type: Expand }
];
ClrIfExpanded.propDecorators = {
    expanded: [{ type: Input, args: ['clrIfExpanded',] }],
    expandedChange: [{ type: Output, args: ['clrIfExpandedChange',] }]
};
if (false) {
    /** @type {?} */
    ClrIfExpanded.prototype._expanded;
    /** @type {?} */
    ClrIfExpanded.prototype.expandedChange;
    /**
     * Subscriptions to all the services and queries changes
     * @type {?}
     */
    ClrIfExpanded.prototype._subscriptions;
    /** @type {?} */
    ClrIfExpanded.prototype.template;
    /** @type {?} */
    ClrIfExpanded.prototype.container;
    /** @type {?} */
    ClrIfExpanded.prototype.expand;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWYtZXhwYW5kZWQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJ1dGlscy9leHBhbmQvaWYtZXhwYW5kZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUNMLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUdMLE1BQU0sRUFDTixXQUFXLEVBQ1gsZ0JBQWdCLEdBQ2pCLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7OztBQU01QyxNQUFNLE9BQU8sYUFBYTs7Ozs7O0lBaUJ4QixZQUFvQixRQUEwQixFQUFVLFNBQTJCLEVBQVUsTUFBYztRQUF2RixhQUFRLEdBQVIsUUFBUSxDQUFrQjtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQWhCbkcsY0FBUyxHQUFZLEtBQUssQ0FBQztRQWNKLG1CQUFjLEdBQTBCLElBQUksWUFBWSxDQUFVLElBQUksQ0FBQyxDQUFDOzs7O1FBZS9GLG1CQUFjLEdBQW1CLEVBQUUsQ0FBQztRQVoxQyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQ3RCLE1BQU0sQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUNqQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDbEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNqRCxDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQzs7OztJQXRCRCxJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQzs7Ozs7SUFFRCxJQUNJLFFBQVEsQ0FBQyxLQUFjO1FBQ3pCLElBQUksT0FBTyxLQUFLLEtBQUssU0FBUyxFQUFFO1lBQzlCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztZQUM3QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztTQUN4QjtJQUNILENBQUM7Ozs7SUFtQk8sVUFBVTtRQUNoQixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUN2RCxPQUFPO1NBQ1I7UUFDRCxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFO1lBQ3hCLDJFQUEyRTtZQUMzRSxrRkFBa0Y7WUFDbEYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDbEQ7YUFBTTtZQUNMLHFFQUFxRTtZQUNyRSxrR0FBa0c7WUFDbEcsaUdBQWlHO1lBQ2pHLDRCQUE0QjtZQUM1QixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ3hCO0lBQ0gsQ0FBQzs7OztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDcEIsQ0FBQzs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBaUIsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7SUFDeEUsQ0FBQzs7O1lBekRGLFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRTs7OztZQVZ4QyxXQUFXO1lBQ1gsZ0JBQWdCO1lBSVQsTUFBTTs7O3VCQWFaLEtBQUssU0FBQyxlQUFlOzZCQVFyQixNQUFNLFNBQUMscUJBQXFCOzs7O0lBZDdCLGtDQUFtQzs7SUFjbkMsdUNBQXVHOzs7OztJQWV2Ryx1Q0FBNEM7O0lBYmhDLGlDQUFrQzs7SUFBRSxrQ0FBbUM7O0lBQUUsK0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NvbnRhaW5lclJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgRXhwYW5kIH0gZnJvbSAnLi9wcm92aWRlcnMvZXhwYW5kJztcblxuLyoqXG4gKiBUT0RPOiBtYWtlIHRoaXMgYSByZXVzYWJsZSBkaXJlY3RpdmUgb3V0c2lkZSBvZiBEYXRhZ3JpZCwgbGlrZSBbY2xyTG9hZGluZ10uXG4gKi9cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tjbHJJZkV4cGFuZGVkXScgfSlcbmV4cG9ydCBjbGFzcyBDbHJJZkV4cGFuZGVkIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBwcml2YXRlIF9leHBhbmRlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGdldCBleHBhbmRlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZXhwYW5kZWQ7XG4gIH1cblxuICBASW5wdXQoJ2NscklmRXhwYW5kZWQnKVxuICBzZXQgZXhwYW5kZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicpIHtcbiAgICAgIHRoaXMuZXhwYW5kLmV4cGFuZGVkID0gdmFsdWU7XG4gICAgICB0aGlzLl9leHBhbmRlZCA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIEBPdXRwdXQoJ2NscklmRXhwYW5kZWRDaGFuZ2UnKSBleHBhbmRlZENoYW5nZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPih0cnVlKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+LCBwcml2YXRlIGNvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZiwgcHJpdmF0ZSBleHBhbmQ6IEV4cGFuZCkge1xuICAgIGV4cGFuZC5leHBhbmRhYmxlKys7XG4gICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgZXhwYW5kLmV4cGFuZENoYW5nZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLnVwZGF0ZVZpZXcoKTtcbiAgICAgICAgdGhpcy5leHBhbmRlZENoYW5nZS5lbWl0KHRoaXMuZXhwYW5kLmV4cGFuZGVkKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdWJzY3JpcHRpb25zIHRvIGFsbCB0aGUgc2VydmljZXMgYW5kIHF1ZXJpZXMgY2hhbmdlc1xuICAgKi9cbiAgcHJpdmF0ZSBfc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICBwcml2YXRlIHVwZGF0ZVZpZXcoKSB7XG4gICAgaWYgKHRoaXMuZXhwYW5kLmV4cGFuZGVkICYmIHRoaXMuY29udGFpbmVyLmxlbmd0aCAhPT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5leHBhbmQuZXhwYW5kZWQpIHtcbiAgICAgIC8vIFNob3VsZCB3ZSBwYXNzIGEgY29udGV4dD8gSSBkb24ndCBzZWUgYW55dGhpbmcgdXNlZnVsIHRvIHBhc3MgcmlnaHQgbm93LFxuICAgICAgLy8gYnV0IHdlIGNhbiBjb21lIGJhY2sgdG8gaXQgaW4gdGhlIGZ1dHVyZSBhcyBhIHNvbHV0aW9uIGZvciBhZGRpdGlvbmFsIGZlYXR1cmVzLlxuICAgICAgdGhpcy5jb250YWluZXIuY3JlYXRlRW1iZWRkZWRWaWV3KHRoaXMudGVtcGxhdGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBUT0RPOiBNb3ZlIHdoZW4gd2UgbW92ZSB0aGUgYW5pbWF0aW9uIGxvZ2ljIHRvIERhdGFncmlkIFJvdyBFeHBhbmRcbiAgICAgIC8vIFdlIGNsZWFyIGJlZm9yZSB0aGUgYW5pbWF0aW9uIGlzIG92ZXIuIE5vdCBpZGVhbCwgYnV0IGRvaW5nIGJldHRlciB3b3VsZCBpbnZvbHZlIGEgbXVjaCBoZWF2aWVyXG4gICAgICAvLyBwcm9jZXNzIGZvciB2ZXJ5IGxpdHRsZSBnYWluLiBPbmNlIEFuZ3VsYXIgYW5pbWF0aW9ucyBhcmUgZHluYW1pYyBlbm91Z2gsIHdlIHNob3VsZCBiZSBhYmxlIHRvXG4gICAgICAvLyBnZXQgdGhlIG9wdGltYWwgYmVoYXZpb3IuXG4gICAgICB0aGlzLmNvbnRhaW5lci5jbGVhcigpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMudXBkYXRlVmlldygpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5leHBhbmQuZXhwYW5kYWJsZS0tO1xuICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMuZm9yRWFjaCgoc3ViOiBTdWJzY3JpcHRpb24pID0+IHN1Yi51bnN1YnNjcmliZSgpKTtcbiAgfVxufVxuIl19