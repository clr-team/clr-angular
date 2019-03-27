/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, HostBinding, NgZone, Optional, Renderer2 } from '@angular/core';
import { DragEventListenerService } from './providers/drag-event-listener.service';
import { DraggableSnapshotService } from './providers/draggable-snapshot.service';
/**
 * @template T
 */
var ClrDraggableGhost = /** @class */ (function () {
    function ClrDraggableGhost(el, dragEventListener, draggableSnapshot, renderer, ngZone) {
        var _this = this;
        this.el = el;
        this.dragEventListener = dragEventListener;
        this.draggableSnapshot = draggableSnapshot;
        this.renderer = renderer;
        this.ngZone = ngZone;
        this.subscriptions = [];
        this.leaveAnimConfig = { value: 0, params: { top: '0px', left: '0px' } };
        if (!this.dragEventListener || !this.draggableSnapshot) {
            throw new Error('The clr-draggable-ghost component can only be used inside of a clrDraggable directive.');
        }
        this.draggableGhostEl = this.el.nativeElement;
        // Need to use Renderer2 as it runs outside of NgZone
        this.renderer.addClass(this.draggableGhostEl, 'draggable-ghost');
        // Register the ghost element in DragEventListener to pass in a ClrDragEvent.
        this.dragEventListener.ghostElement = this.draggableGhostEl;
        // Default ghost size gets the size of ClrDraggable element.
        this.setDefaultGhostSize(this.draggableGhostEl);
        /** @type {?} */
        var offset = {
            top: this.draggableSnapshot.hasDraggableState
                ? this.draggableSnapshot.dragEvent.dragPosition.pageY - this.draggableSnapshot.clientRect.top
                : 0,
            left: this.draggableSnapshot.hasDraggableState
                ? this.draggableSnapshot.dragEvent.dragPosition.pageX - this.draggableSnapshot.clientRect.left
                : 0,
        };
        /** @type {?} */
        var isAnimationConfigured = false;
        this.subscriptions.push(this.dragEventListener.dragMoved.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            // On the first drag move event, we configure the animation as it's dependent on the first drag event.
            if (!isAnimationConfigured) {
                if (_this.draggableSnapshot.hasDraggableState) {
                    _this.animateToOnLeave(_this.draggableSnapshot.clientRect.top + "px", _this.draggableSnapshot.clientRect.left + "px");
                }
                else {
                    _this.animateToOnLeave(event.dragPosition.pageY + "px", event.dragPosition.pageX + "px");
                }
                isAnimationConfigured = true;
            }
            // Position the draggable ghost.
            /** @type {?} */
            var topLeftPosition = _this.findTopLeftPosition(event.dragPosition, offset);
            _this.setPositionStyle(_this.draggableGhostEl, topLeftPosition.pageX, topLeftPosition.pageY);
            _this.dragEventListener.dropPointPosition = _this.findDropPointPosition(topLeftPosition);
        })));
    }
    /**
     * @private
     * @param {?} el
     * @return {?}
     */
    ClrDraggableGhost.prototype.setDefaultGhostSize = /**
     * @private
     * @param {?} el
     * @return {?}
     */
    function (el) {
        if (this.draggableSnapshot.hasDraggableState) {
            this.setSizeStyle(el, this.draggableSnapshot.clientRect.width, this.draggableSnapshot.clientRect.height);
        }
    };
    /**
     * @private
     * @param {?} top
     * @param {?} left
     * @return {?}
     */
    ClrDraggableGhost.prototype.animateToOnLeave = /**
     * @private
     * @param {?} top
     * @param {?} left
     * @return {?}
     */
    function (top, left) {
        var _this = this;
        this.ngZone.run((/**
         * @return {?}
         */
        function () {
            _this.leaveAnimConfig = { value: 0, params: { top: top, left: left } };
        }));
    };
    /**
     * @private
     * @param {?} dragPosition
     * @param {?} offset
     * @return {?}
     */
    ClrDraggableGhost.prototype.findTopLeftPosition = /**
     * @private
     * @param {?} dragPosition
     * @param {?} offset
     * @return {?}
     */
    function (dragPosition, offset) {
        return { pageX: dragPosition.pageX - offset.left, pageY: dragPosition.pageY - offset.top };
    };
    /**
     * @private
     * @param {?} topLeftPosition
     * @return {?}
     */
    ClrDraggableGhost.prototype.findDropPointPosition = /**
     * @private
     * @param {?} topLeftPosition
     * @return {?}
     */
    function (topLeftPosition) {
        if (this.draggableSnapshot.hasDraggableState) {
            return {
                pageX: topLeftPosition.pageX + this.draggableSnapshot.clientRect.width / 2,
                pageY: topLeftPosition.pageY + this.draggableSnapshot.clientRect.height / 2,
            };
        }
        else {
            return topLeftPosition;
        }
    };
    /**
     * @private
     * @param {?} el
     * @param {?} width
     * @param {?} height
     * @return {?}
     */
    ClrDraggableGhost.prototype.setSizeStyle = /**
     * @private
     * @param {?} el
     * @param {?} width
     * @param {?} height
     * @return {?}
     */
    function (el, width, height) {
        this.renderer.setStyle(el, 'width', width + "px");
        this.renderer.setStyle(el, 'height', height + "px");
    };
    /**
     * @private
     * @param {?} el
     * @param {?} left
     * @param {?} top
     * @return {?}
     */
    ClrDraggableGhost.prototype.setPositionStyle = /**
     * @private
     * @param {?} el
     * @param {?} left
     * @param {?} top
     * @return {?}
     */
    function (el, left, top) {
        this.renderer.setStyle(el, 'left', left + "px");
        this.renderer.setStyle(el, 'top', top + "px");
        this.renderer.setStyle(el, 'visibility', 'visible');
    };
    /**
     * @return {?}
     */
    ClrDraggableGhost.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        function (sub) { return sub.unsubscribe(); }));
    };
    ClrDraggableGhost.decorators = [
        { type: Component, args: [{
                    selector: 'clr-draggable-ghost',
                    template: "<ng-content></ng-content>",
                    animations: [
                        trigger('leaveAnimation', [
                            transition(':leave', [
                                style({ left: '*', top: '*' }),
                                animate('0.2s ease-in-out', style({ top: '{{top}}', left: '{{left}}' })),
                            ]),
                        ]),
                    ]
                }] }
    ];
    /** @nocollapse */
    ClrDraggableGhost.ctorParameters = function () { return [
        { type: ElementRef },
        { type: DragEventListenerService, decorators: [{ type: Optional }] },
        { type: DraggableSnapshotService, decorators: [{ type: Optional }] },
        { type: Renderer2 },
        { type: NgZone }
    ]; };
    ClrDraggableGhost.propDecorators = {
        leaveAnimConfig: [{ type: HostBinding, args: ['@leaveAnimation',] }]
    };
    return ClrDraggableGhost;
}());
export { ClrDraggableGhost };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ClrDraggableGhost.prototype.draggableGhostEl;
    /**
     * @type {?}
     * @private
     */
    ClrDraggableGhost.prototype.subscriptions;
    /** @type {?} */
    ClrDraggableGhost.prototype.leaveAnimConfig;
    /**
     * @type {?}
     * @private
     */
    ClrDraggableGhost.prototype.el;
    /**
     * @type {?}
     * @private
     */
    ClrDraggableGhost.prototype.dragEventListener;
    /**
     * @type {?}
     * @private
     */
    ClrDraggableGhost.prototype.draggableSnapshot;
    /**
     * @type {?}
     * @private
     */
    ClrDraggableGhost.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    ClrDraggableGhost.prototype.ngZone;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZ2dhYmxlLWdob3N0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsidXRpbHMvZHJhZy1hbmQtZHJvcC9kcmFnZ2FibGUtZ2hvc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQWEsUUFBUSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUkzRyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNuRixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQzs7OztBQVdsRjtJQW1CRSwyQkFDVSxFQUFjLEVBQ0YsaUJBQThDLEVBQzlDLGlCQUE4QyxFQUMxRCxRQUFtQixFQUNuQixNQUFjO1FBTHhCLGlCQXNEQztRQXJEUyxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQ0Ysc0JBQWlCLEdBQWpCLGlCQUFpQixDQUE2QjtRQUM5QyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQTZCO1FBQzFELGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQVRoQixrQkFBYSxHQUFtQixFQUFFLENBQUM7UUFFWCxvQkFBZSxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDO1FBU2xHLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDdEQsTUFBTSxJQUFJLEtBQUssQ0FBQyx3RkFBd0YsQ0FBQyxDQUFDO1NBQzNHO1FBRUQsSUFBSSxD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Qjs7Ozs7SUFDdEIsOENBQWtFOzs7OztJQUNsRSw4Q0FBa0U7Ozs7O0lBQ2xFLHFDQUEyQjs7Ozs7SUFDM0IsbUNBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgYW5pbWF0ZSwgc3R5bGUsIHRyYW5zaXRpb24sIHRyaWdnZXIgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgSG9zdEJpbmRpbmcsIE5nWm9uZSwgT25EZXN0cm95LCBPcHRpb25hbCwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgRHJhZ0V2ZW50SW50ZXJmYWNlIH0gZnJvbSAnLi9pbnRlcmZhY2VzL2RyYWctZXZlbnQuaW50ZXJmYWNlJztcbmltcG9ydCB7IERyYWdFdmVudExpc3RlbmVyU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2RyYWctZXZlbnQtbGlzdGVuZXIuc2VydmljZSc7XG5pbXBvcnQgeyBEcmFnZ2FibGVTbmFwc2hvdFNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9kcmFnZ2FibGUtc25hcHNob3Quc2VydmljZSc7XG5cbnR5cGUgUGFnZVBvc2l0aW9uID0ge1xuICBwYWdlWDogbnVtYmVyO1xuICBwYWdlWTogbnVtYmVyO1xufTtcbnR5cGUgT2Zmc2V0UG9zaXRpb24gPSB7XG4gIHRvcDogbnVtYmVyO1xuICBsZWZ0OiBudW1iZXI7XG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItZHJhZ2dhYmxlLWdob3N0JyxcbiAgdGVtcGxhdGU6IGA8bmctY29udGVudD48L25nLWNvbnRlbnQ+YCxcbiAgYW5pbWF0aW9uczogW1xuICAgIHRyaWdnZXIoJ2xlYXZlQW5pbWF0aW9uJywgW1xuICAgICAgdHJhbnNpdGlvbignOmxlYXZlJywgW1xuICAgICAgICBzdHlsZSh7IGxlZnQ6ICcqJywgdG9wOiAnKicgfSksXG4gICAgICAgIGFuaW1hdGUoJzAuMnMgZWFzZS1pbi1vdXQnLCBzdHlsZSh7IHRvcDogJ3t7dG9wfX0nLCBsZWZ0OiAne3tsZWZ0fX0nIH0pKSxcbiAgICAgIF0pLFxuICAgIF0pLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBDbHJEcmFnZ2FibGVHaG9zdDxUPiBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgZHJhZ2dhYmxlR2hvc3RFbDogYW55O1xuXG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICBASG9zdEJpbmRpbmcoJ0BsZWF2ZUFuaW1hdGlvbicpIGxlYXZlQW5pbUNvbmZpZyA9IHsgdmFsdWU6IDAsIHBhcmFtczogeyB0b3A6ICcwcHgnLCBsZWZ0OiAnMHB4JyB9IH07XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZixcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGRyYWdFdmVudExpc3RlbmVyOiBEcmFnRXZlbnRMaXN0ZW5lclNlcnZpY2U8VD4sXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBkcmFnZ2FibGVTbmFwc2hvdDogRHJhZ2dhYmxlU25hcHNob3RTZXJ2aWNlPFQ+LFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIG5nWm9uZTogTmdab25lXG4gICkge1xuICAgIGlmICghdGhpcy5kcmFnRXZlbnRMaXN0ZW5lciB8fCAhdGhpcy5kcmFnZ2FibGVTbmFwc2hvdCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgY2xyLWRyYWdnYWJsZS1naG9zdCBjb21wb25lbnQgY2FuIG9ubHkgYmUgdXNlZCBpbnNpZGUgb2YgYSBjbHJEcmFnZ2FibGUgZGlyZWN0aXZlLicpO1xuICAgIH1cblxuICAgIHRoaXMuZHJhZ2dhYmxlR2hvc3RFbCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudDtcblxuICAgIC8vIE5lZWQgdG8gdXNlIFJlbmRlcmVyMiBhcyBpdCBydW5zIG91dHNpZGUgb2YgTmdab25lXG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmRyYWdnYWJsZUdob3N0RWwsICdkcmFnZ2FibGUtZ2hvc3QnKTtcblxuICAgIC8vIFJlZ2lzdGVyIHRoZSBnaG9zdCBlbGVtZW50IGluIERyYWdFdmVudExpc3RlbmVyIHRvIHBhc3MgaW4gYSBDbHJEcmFnRXZlbnQuXG4gICAgdGhpcy5kcmFnRXZlbnRMaXN0ZW5lci5naG9zdEVsZW1lbnQgPSB0aGlzLmRyYWdnYWJsZUdob3N0RWw7XG5cbiAgICAvLyBEZWZhdWx0IGdob3N0IHNpemUgZ2V0cyB0aGUgc2l6ZSBvZiBDbHJEcmFnZ2FibGUgZWxlbWVudC5cbiAgICB0aGlzLnNldERlZmF1bHRHaG9zdFNpemUodGhpcy5kcmFnZ2FibGVHaG9zdEVsKTtcblxuICAgIGNvbnN0IG9mZnNldDogT2Zmc2V0UG9zaXRpb24gPSB7XG4gICAgICB0b3A6IHRoaXMuZHJhZ2dhYmxlU25hcHNob3QuaGFzRHJhZ2dhYmxlU3RhdGVcbiAgICAgICAgPyB0aGlzLmRyYWdnYWJsZVNuYXBzaG90LmRyYWdFdmVudC5kcmFnUG9zaXRpb24ucGFnZVkgLSB0aGlzLmRyYWdnYWJsZVNuYXBzaG90LmNsaWVudFJlY3QudG9wXG4gICAgICAgIDogMCxcbiAgICAgIGxlZnQ6IHRoaXMuZHJhZ2dhYmxlU25hcHNob3QuaGFzRHJhZ2dhYmxlU3RhdGVcbiAgICAgICAgPyB0aGlzLmRyYWdnYWJsZVNuYXBzaG90LmRyYWdFdmVudC5kcmFnUG9zaXRpb24ucGFnZVggLSB0aGlzLmRyYWdnYWJsZVNuYXBzaG90LmNsaWVudFJlY3QubGVmdFxuICAgICAgICA6IDAsXG4gICAgfTtcblxuICAgIGxldCBpc0FuaW1hdGlvbkNvbmZpZ3VyZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5kcmFnRXZlbnRMaXN0ZW5lci5kcmFnTW92ZWQuc3Vic2NyaWJlKChldmVudDogRHJhZ0V2ZW50SW50ZXJmYWNlPFQ+KSA9PiB7XG4gICAgICAgIC8vIE9uIHRoZSBmaXJzdCBkcmFnIG1vdmUgZXZlbnQsIHdlIGNvbmZpZ3VyZSB0aGUgYW5pbWF0aW9uIGFzIGl0J3MgZGVwZW5kZW50IG9uIHRoZSBmaXJzdCBkcmFnIGV2ZW50LlxuICAgICAgICBpZiAoIWlzQW5pbWF0aW9uQ29uZmlndXJlZCkge1xuICAgICAgICAgIGlmICh0aGlzLmRyYWdnYWJsZVNuYXBzaG90Lmhhc0RyYWdnYWJsZVN0YXRlKSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGVUb09uTGVhdmUoXG4gICAgICAgICAgICAgIGAke3RoaXMuZHJhZ2dhYmxlU25hcHNob3QuY2xpZW50UmVjdC50b3B9cHhgLFxuICAgICAgICAgICAgICBgJHt0aGlzLmRyYWdnYWJsZVNuYXBzaG90LmNsaWVudFJlY3QubGVmdH1weGBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0ZVRvT25MZWF2ZShgJHtldmVudC5kcmFnUG9zaXRpb24ucGFnZVl9cHhgLCBgJHtldmVudC5kcmFnUG9zaXRpb24ucGFnZVh9cHhgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaXNBbmltYXRpb25Db25maWd1cmVkID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFBvc2l0aW9uIHRoZSBkcmFnZ2FibGUgZ2hvc3QuXG4gICAgICAgIGNvbnN0IHRvcExlZnRQb3NpdGlvbjogUGFnZVBvc2l0aW9uID0gdGhpcy5maW5kVG9wTGVmdFBvc2l0aW9uKGV2ZW50LmRyYWdQb3NpdGlvbiwgb2Zmc2V0KTtcbiAgICAgICAgdGhpcy5zZXRQb3NpdGlvblN0eWxlKHRoaXMuZHJhZ2dhYmxlR2hvc3RFbCwgdG9wTGVmdFBvc2l0aW9uLnBhZ2VYLCB0b3BMZWZ0UG9zaXRpb24ucGFnZVkpO1xuICAgICAgICB0aGlzLmRyYWdFdmVudExpc3RlbmVyLmRyb3BQb2ludFBvc2l0aW9uID0gdGhpcy5maW5kRHJvcFBvaW50UG9zaXRpb24odG9wTGVmdFBvc2l0aW9uKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0RGVmYXVsdEdob3N0U2l6ZShlbDogTm9kZSk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRyYWdnYWJsZVNuYXBzaG90Lmhhc0RyYWdnYWJsZVN0YXRlKSB7XG4gICAgICB0aGlzLnNldFNpemVTdHlsZShlbCwgdGhpcy5kcmFnZ2FibGVTbmFwc2hvdC5jbGllbnRSZWN0LndpZHRoLCB0aGlzLmRyYWdnYWJsZVNuYXBzaG90LmNsaWVudFJlY3QuaGVpZ2h0KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFuaW1hdGVUb09uTGVhdmUodG9wOiBzdHJpbmcsIGxlZnQ6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XG4gICAgICB0aGlzLmxlYXZlQW5pbUNvbmZpZyA9IHsgdmFsdWU6IDAsIHBhcmFtczogeyB0b3A6IHRvcCwgbGVmdDogbGVmdCB9IH07XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGZpbmRUb3BMZWZ0UG9zaXRpb24oZHJhZ1Bvc2l0aW9uOiBQYWdlUG9zaXRpb24sIG9mZnNldDogT2Zmc2V0UG9zaXRpb24pOiBQYWdlUG9zaXRpb24ge1xuICAgIHJldHVybiB7IHBhZ2VYOiBkcmFnUG9zaXRpb24ucGFnZVggLSBvZmZzZXQubGVmdCwgcGFnZVk6IGRyYWdQb3NpdGlvbi5wYWdlWSAtIG9mZnNldC50b3AgfTtcbiAgfVxuXG4gIHByaXZhdGUgZmluZERyb3BQb2ludFBvc2l0aW9uKHRvcExlZnRQb3NpdGlvbjogUGFnZVBvc2l0aW9uKTogUGFnZVBvc2l0aW9uIHtcbiAgICBpZiAodGhpcy5kcmFnZ2FibGVTbmFwc2hvdC5oYXNEcmFnZ2FibGVTdGF0ZSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcGFnZVg6IHRvcExlZnRQb3NpdGlvbi5wYWdlWCArIHRoaXMuZHJhZ2dhYmxlU25hcHNob3QuY2xpZW50UmVjdC53aWR0aCAvIDIsXG4gICAgICAgIHBhZ2VZOiB0b3BMZWZ0UG9zaXRpb24ucGFnZVkgKyB0aGlzLmRyYWdnYWJsZVNuYXBzaG90LmNsaWVudFJlY3QuaGVpZ2h0IC8gMixcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0b3BMZWZ0UG9zaXRpb247XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRTaXplU3R5bGUoZWw6IE5vZGUsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShlbCwgJ3dpZHRoJywgYCR7d2lkdGh9cHhgKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGVsLCAnaGVpZ2h0JywgYCR7aGVpZ2h0fXB4YCk7XG4gIH1cblxuICBwcml2YXRlIHNldFBvc2l0aW9uU3R5bGUoZWw6IE5vZGUsIGxlZnQ6IG51bWJlciwgdG9wOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGVsLCAnbGVmdCcsIGAke2xlZnR9cHhgKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGVsLCAndG9wJywgYCR7dG9wfXB4YCk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShlbCwgJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmZvckVhY2goKHN1YjogU3Vic2NyaXB0aW9uKSA9PiBzdWIudW5zdWJzY3JpYmUoKSk7XG4gIH1cbn1cbiJdfQ==