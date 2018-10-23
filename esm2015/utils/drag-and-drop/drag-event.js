/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
// This class is used to convert an internal event
// to an external event to be emitted.
/**
 * @template T
 */
export class ClrDragEvent {
    /**
     * @param {?} dragEvent
     */
    constructor(dragEvent) {
        this.dragPosition = dragEvent.dragPosition;
        this.group = dragEvent.group;
        this.dragDataTransfer = dragEvent.dragDataTransfer;
        this.dropPointPosition = dragEvent.dropPointPosition;
    }
}
if (false) {
    /** @type {?} */
    ClrDragEvent.prototype.dragPosition;
    /** @type {?} */
    ClrDragEvent.prototype.group;
    /** @type {?} */
    ClrDragEvent.prototype.dragDataTransfer;
    /** @type {?} */
    ClrDragEvent.prototype.dropPointPosition;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZy1ldmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbInV0aWxzL2RyYWctYW5kLWRyb3AvZHJhZy1ldmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFTQSxNQUFNLE9BQU8sWUFBWTs7OztJQU12QixZQUFZLFNBQWdDO1FBQzFDLElBQUksQ0FBQyxZQUFZLEdBQUcsU0FBUyxDQUFDLFlBQVksQ0FBQztRQUMzQyxJQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUM7UUFDN0IsSUFBSSxDQUFDLGdCQUFnQixHQUFHLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQztRQUNuRCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsU0FBUyxDQUFDLGlCQUFpQixDQUFDO0lBQ3ZELENBQUM7Q0FDRjs7O0lBWEMsb0NBQXNEOztJQUN0RCw2QkFBZ0M7O0lBQ2hDLHdDQUEyQjs7SUFDM0IseUNBQTJEIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgRHJhZ0V2ZW50SW50ZXJmYWNlIH0gZnJvbSAnLi9pbnRlcmZhY2VzL2RyYWctZXZlbnQuaW50ZXJmYWNlJztcblxuLy8gVGhpcyBjbGFzcyBpcyB1c2VkIHRvIGNvbnZlcnQgYW4gaW50ZXJuYWwgZXZlbnRcbi8vIHRvIGFuIGV4dGVybmFsIGV2ZW50IHRvIGJlIGVtaXR0ZWQuXG5leHBvcnQgY2xhc3MgQ2xyRHJhZ0V2ZW50PFQ+IHtcbiAgcHVibGljIGRyYWdQb3NpdGlvbjogeyBwYWdlWDogbnVtYmVyOyBwYWdlWTogbnVtYmVyIH07XG4gIHB1YmxpYyBncm91cDogc3RyaW5nIHwgc3RyaW5nW107XG4gIHB1YmxpYyBkcmFnRGF0YVRyYW5zZmVyOiBUO1xuICBwdWJsaWMgZHJvcFBvaW50UG9zaXRpb246IHsgcGFnZVg6IG51bWJlcjsgcGFnZVk6IG51bWJlciB9O1xuXG4gIGNvbnN0cnVjdG9yKGRyYWdFdmVudDogRHJhZ0V2ZW50SW50ZXJmYWNlPFQ+KSB7XG4gICAgdGhpcy5kcmFnUG9zaXRpb24gPSBkcmFnRXZlbnQuZHJhZ1Bvc2l0aW9uO1xuICAgIHRoaXMuZ3JvdXAgPSBkcmFnRXZlbnQuZ3JvdXA7XG4gICAgdGhpcy5kcmFnRGF0YVRyYW5zZmVyID0gZHJhZ0V2ZW50LmRyYWdEYXRhVHJhbnNmZXI7XG4gICAgdGhpcy5kcm9wUG9pbnRQb3NpdGlvbiA9IGRyYWdFdmVudC5kcm9wUG9pbnRQb3NpdGlvbjtcbiAgfVxufVxuIl19