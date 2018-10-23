/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Injectable, NgZone, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { DragEventType } from '../interfaces/drag-event.interface';
import { DragAndDropEventBusService } from './drag-and-drop-event-bus.service';
/**
 * @template T
 */
var DragEventListenerService = /** @class */ (function () {
    function DragEventListenerService(ngZone, renderer, eventBus) {
        this.ngZone = ngZone;
        this.renderer = renderer;
        this.eventBus = eventBus;
        this.dragStart = new Subject();
        this.dragMove = new Subject();
        this.dragEnd = new Subject();
        this.hasDragStarted = false;
    }
    Object.defineProperty(DragEventListenerService.prototype, "dragStarted", {
        get: /**
         * @return {?}
         */
        function () {
            return this.dragStart.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DragEventListenerService.prototype, "dragMoved", {
        get: /**
         * @return {?}
         */
        function () {
            return this.dragMove.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DragEventListenerService.prototype, "dragEnded", {
        get: /**
         * @return {?}
         */
        function () {
            return this.dragEnd.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} draggableEl
     * @return {?}
     */
    DragEventListenerService.prototype.attachDragListeners = /**
     * @param {?} draggableEl
     * @return {?}
     */
    function (draggableEl) {
        this.draggableEl = draggableEl;
        this.listeners = [
            this.customDragEvent(this.draggableEl, 'mousedown', 'mousemove', 'mouseup'),
            this.customDragEvent(this.draggableEl, 'touchstart', 'touchmove', 'touchend'),
        ];
    };
    /**
     * @return {?}
     */
    DragEventListenerService.prototype.detachDragListeners = /**
     * @return {?}
     */
    function () {
        if (this.listeners) {
            this.listeners.map(function (event) { return event(); });
        }
        // In most cases, once users start dragging with mousedown/touchstart events,
        // they will end dragging at one point with mouseup/touchend.
        // However, there might be a few cases where mousedown/touchstart events get registered,
        // but the draggable element gets removed before user ends dragging.
        // In that case, we need to remove the attached listeners that happened during the mousedown/touchstart events.
        if (this.nestedListeners) {
            this.nestedListeners.map(function (event) { return event(); });
        }
    };
    /**
     * @param {?} element
     * @param {?} startOnEvent
     * @param {?} moveOnEvent
     * @param {?} endOnEvent
     * @return {?}
     */
    DragEventListenerService.prototype.customDragEvent = /**
     * @param {?} element
     * @param {?} startOnEvent
     * @param {?} moveOnEvent
     * @param {?} endOnEvent
     * @return {?}
     */
    function (element, startOnEvent, moveOnEvent, endOnEvent) {
        var _this = this;
        return this.renderer.listen(element, startOnEvent, function () {
            // Initialize nested listeners' property with a new empty array;
            _this.nestedListeners = [];
            // This is needed to disable selection during dragging (especially in EDGE/IE11).
            _this.nestedListeners.push(_this.renderer.listen('document', 'selectstart', function (selectEvent) {
                selectEvent.preventDefault();
                selectEvent.stopImmediatePropagation();
            }));
            // Listen to mousemove/touchmove events outside of angular zone.
            _this.nestedListeners.push(_this.ngZone.runOutsideAngular(function () {
                return _this.renderer.listen('document', moveOnEvent, function (moveEvent) {
                    // Event.stopImmediatePropagation() is needed here to prevent nested draggables from getting dragged
                    // altogether. We shouldn't use Event.stopPropagation() here as we are listening to the events
                    // on the global element level.
                    // With Event.stopImmediatePropagation(), it registers the events sent from the inner most draggable
                    // first. Then immediately after that, it stops listening to the same type of events on the same
                    // element. So this will help us to not register the same events that would come from the parent
                    // level draggables eventually.
                    moveEvent.stopImmediatePropagation();
                    if (!_this.hasDragStarted) {
                        _this.hasDragStarted = true;
                        // Fire "dragstart"
                        _this.broadcast(moveEvent, DragEventType.DRAG_START);
                    }
                    else {
                        // Fire "dragmove"
                        _this.broadcast(moveEvent, DragEventType.DRAG_MOVE);
                    }
                });
            }));
            // Listen to mouseup/touchend events.
            _this.nestedListeners.push(_this.renderer.listen('document', endOnEvent, function (endEvent) {
                if (_this.hasDragStarted) {
                    // Fire "dragend" only if dragstart is registered
                    _this.hasDragStarted = false;
                    _this.broadcast(endEvent, DragEventType.DRAG_END);
                }
                // We must remove the the nested listeners every time drag completes.
                if (_this.nestedListeners) {
                    _this.nestedListeners.map(function (event) { return event(); });
                }
            }));
        });
    };
    /**
     * @param {?} event
     * @param {?} eventType
     * @return {?}
     */
    DragEventListenerService.prototype.broadcast = /**
     * @param {?} event
     * @param {?} eventType
     * @return {?}
     */
    function (event, eventType) {
        /** @type {?} */
        var dragEvent = this.generateDragEvent(event, eventType);
        switch (dragEvent.type) {
            case DragEventType.DRAG_START:
                this.dragStart.next(dragEvent);
                break;
            case DragEventType.DRAG_MOVE:
                this.dragMove.next(dragEvent);
                break;
            case DragEventType.DRAG_END:
                this.dragEnd.next(dragEvent);
                break;
            default:
                break;
        }
        // The following properties are set after they are broadcasted to the DraggableGhost component.
        dragEvent.ghostElement = this.ghostElement;
        dragEvent.dropPointPosition = this.dropPointPosition;
        this.eventBus.broadcast(dragEvent);
    };
    /**
     * @param {?} event
     * @param {?} eventType
     * @return {?}
     */
    DragEventListenerService.prototype.generateDragEvent = /**
     * @param {?} event
     * @param {?} eventType
     * @return {?}
     */
    function (event, eventType) {
        /** @type {?} */
        var nativeEvent;
        if (((/** @type {?} */ (event))).hasOwnProperty('changedTouches')) {
            nativeEvent = ((/** @type {?} */ (event))).changedTouches[0];
        }
        else {
            nativeEvent = event;
        }
        return {
            type: eventType,
            dragPosition: { pageX: nativeEvent.pageX, pageY: nativeEvent.pageY },
            group: this.group,
            dragDataTransfer: this.dragDataTransfer,
            ghostElement: this.ghostElement,
        };
    };
    DragEventListenerService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    DragEventListenerService.ctorParameters = function () { return [
        { type: NgZone },
        { type: Renderer2 },
        { type: DragAndDropEventBusService }
    ]; };
    return DragEventListenerService;
}());
export { DragEventListenerService };
if (false) {
    /** @type {?} */
    DragEventListenerService.prototype.draggableEl;
    /** @type {?} */
    DragEventListenerService.prototype.listeners;
    /** @type {?} */
    DragEventListenerService.prototype.nestedListeners;
    /** @type {?} */
    DragEventListenerService.prototype.dragStart;
    /** @type {?} */
    DragEventListenerService.prototype.dragMove;
    /** @type {?} */
    DragEventListenerService.prototype.dragEnd;
    /** @type {?} */
    DragEventListenerService.prototype.hasDragStarted;
    /** @type {?} */
    DragEventListenerService.prototype.dragDataTransfer;
    /** @type {?} */
    DragEventListenerService.prototype.group;
    /** @type {?} */
    DragEventListenerService.prototype.ghostElement;
    /** @type {?} */
    DragEventListenerService.prototype.dropPointPosition;
    /** @type {?} */
    DragEventListenerService.prototype.ngZone;
    /** @type {?} */
    DragEventListenerService.prototype.renderer;
    /** @type {?} */
    DragEventListenerService.prototype.eventBus;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZy1ldmVudC1saXN0ZW5lci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsidXRpbHMvZHJhZy1hbmQtZHJvcC9wcm92aWRlcnMvZHJhZy1ldmVudC1saXN0ZW5lci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRTNDLE9BQU8sRUFBc0IsYUFBYSxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDdkYsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7Ozs7QUFFL0U7SUE0QkUsa0NBQW9CLE1BQWMsRUFBVSxRQUFtQixFQUFVLFFBQXVDO1FBQTVGLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBK0I7UUFsQnhHLGNBQVMsR0FBbUMsSUFBSSxPQUFPLEVBQXlCLENBQUM7UUFDakYsYUFBUSxHQUFtQyxJQUFJLE9BQU8sRUFBeUIsQ0FBQztRQUNoRixZQUFPLEdBQW1DLElBQUksT0FBTyxFQUF5QixDQUFDO1FBRS9FLG1CQUFjLEdBQVksS0FBSyxDQUFDO0lBYzJFLENBQUM7SUFacEgsc0JBQUksaURBQVc7Ozs7UUFBZjtZQUNFLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN2QyxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLCtDQUFTOzs7O1FBQWI7WUFDRSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDdEMsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSwrQ0FBUzs7OztRQUFiO1lBQ0UsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVks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VUFBMEIsS0FBOEIsRUFBRSxTQUF3Qjs7WUFDNUUsV0FBZ0I7UUFFcEIsSUFBSSxDQUFDLG1CQUFZLEtBQUssRUFBQSxDQUFDLENBQUMsY0FBYyxDQUFDLGdCQUFnQixDQUFDLEVBQUU7WUFDeEQsV0FBVyxHQUFHLENBQUMsbUJBQVksS0FBSyxFQUFBLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDckQ7YUFBTTtZQUNMLFdBQVcsR0FBRyxLQUFLLENBQUM7U0FDckI7UUFFRCxPQUFPO1lBQ0wsSUFBSSxFQUFFLFNBQVM7WUFDZixZQUFZLEVBQUUsRUFBRSxLQUFLLEVBQUUsV0FBVyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsV0FBVyxDQUFDLEtBQUssRUFBRTtZQUNwRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQjtZQUN2QyxZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVk7U0FDaEMsQ0FBQztJQUNKLENBQUM7O2dCQS9KRixVQUFVOzs7O2dCQU5VLE1BQU07Z0JBQUUsU0FBUztnQkFJN0IsMEJBQTBCOztJQWtLbkMsK0JBQUM7Q0FBQSxBQWhLRCxJQWdLQztTQS9KWSx3QkFBd0I7OztJQUNuQywrQ0FBeUI7O0lBR3pCLDZDQUFrQzs7SUFHbEMsbURBQXdDOztJQUV4Qyw2Q0FBeUY7O0lBQ3pGLDRDQUF3Rjs7SUFDeEYsMkNBQXVGOztJQUV2RixrREFBd0M7O0lBaUJ4QyxvREFBNEI7O0lBQzVCLHlDQUFpQzs7SUFHakMsZ0RBQTBCOztJQUMxQixxREFBNEQ7O0lBUmhELDBDQUFzQjs7SUFBRSw0Q0FBMkI7O0lBQUUsNENBQStDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lLCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgRHJhZ0V2ZW50SW50ZXJmYWNlLCBEcmFnRXZlbnRUeXBlIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9kcmFnLWV2ZW50LmludGVyZmFjZSc7XG5pbXBvcnQgeyBEcmFnQW5kRHJvcEV2ZW50QnVzU2VydmljZSB9IGZyb20gJy4vZHJhZy1hbmQtZHJvcC1ldmVudC1idXMuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEcmFnRXZlbnRMaXN0ZW5lclNlcnZpY2U8VD4ge1xuICBwcml2YXRlIGRyYWdnYWJsZUVsOiBhbnk7XG5cbiAgLy8gY29udGFpbnMgdGhlIHN0YXJ0aW5nIGV2ZW50cyBzdWNoIGFzIG1vdXNlZG93biBhbmQgdG91Y2hzdGFydFxuICBwcml2YXRlIGxpc3RlbmVyczogKCgpID0+IHZvaWQpW107XG4gIC8vIGNvbnRhaW5zIHRoZSBuZXN0ZWQgZXZlbnRzIHRoYXQgaGFwcGVucyBhZnRlci9pbnNpZGUgdGhlIHN0YXJ0aW5nIGV2ZW50c1xuICAvLyBzdWNoIGFzIHNlbGVjdHN0YXJ0LCBtb3VzZW1vdmUvdG91Y2htb3ZlLCBtb3VzZXVwL3RvdWNoZW5kXG4gIHByaXZhdGUgbmVzdGVkTGlzdGVuZXJzOiAoKCkgPT4gdm9pZClbXTtcblxuICBwcml2YXRlIGRyYWdTdGFydDogU3ViamVjdDxEcmFnRXZlbnRJbnRlcmZhY2U8VD4+ID0gbmV3IFN1YmplY3Q8RHJhZ0V2ZW50SW50ZXJmYWNlPFQ+PigpO1xuICBwcml2YXRlIGRyYWdNb3ZlOiBTdWJqZWN0PERyYWdFdmVudEludGVyZmFjZTxUPj4gPSBuZXcgU3ViamVjdDxEcmFnRXZlbnRJbnRlcmZhY2U8VD4+KCk7XG4gIHByaXZhdGUgZHJhZ0VuZDogU3ViamVjdDxEcmFnRXZlbnRJbnRlcmZhY2U8VD4+ID0gbmV3IFN1YmplY3Q8RHJhZ0V2ZW50SW50ZXJmYWNlPFQ+PigpO1xuXG4gIHByaXZhdGUgaGFzRHJhZ1N0YXJ0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBnZXQgZHJhZ1N0YXJ0ZWQoKTogT2JzZXJ2YWJsZTxEcmFnRXZlbnRJbnRlcmZhY2U8VD4+IHtcbiAgICByZXR1cm4gdGhpcy5kcmFnU3RhcnQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBnZXQgZHJhZ01vdmVkKCk6IE9ic2VydmFibGU8RHJhZ0V2ZW50SW50ZXJmYWNlPFQ+PiB7XG4gICAgcmV0dXJuIHRoaXMuZHJhZ01vdmUuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBnZXQgZHJhZ0VuZGVkKCk6IE9ic2VydmFibGU8RHJhZ0V2ZW50SW50ZXJmYWNlPFQ+PiB7XG4gICAgcmV0dXJuIHRoaXMuZHJhZ0VuZC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbmdab25lOiBOZ1pvbmUsIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSBldmVudEJ1czogRHJhZ0FuZERyb3BFdmVudEJ1c1NlcnZpY2U8VD4pIHt9XG5cbiAgLy8gRHJhZ2dhYmxlIGNvbXBvbmVudCBzZXRzIHRoZXNlIHByb3BlcnRpZXM6XG4gIHB1YmxpYyBkcmFnRGF0YVRyYW5zZmVyPzogVDtcbiAgcHVibGljIGdyb3VwPzogc3RyaW5nIHwgc3RyaW5nW107XG5cbiAgLy8gRHJhZ2dhYmxlR2hvc3QgY29tcG9uZW50IHNldHMgdGhlc2UgcHJvcGVydGllczpcbiAgcHVibGljIGdob3N0RWxlbWVudD86IGFueTtcbiAgcHVibGljIGRyb3BQb2ludFBvc2l0aW9uPzogeyBwYWdlWDogbnVtYmVyOyBwYWdlWTogbnVtYmVyIH07XG5cbiAgcHVibGljIGF0dGFjaERyYWdMaXN0ZW5lcnMoZHJhZ2dhYmxlRWw6IE5vZGUpIHtcbiAgICB0aGlzLmRyYWdnYWJsZUVsID0gZHJhZ2dhYmxlRWw7XG4gICAgdGhpcy5saXN0ZW5lcnMgPSBbXG4gICAgICB0aGlzLmN1c3RvbURyYWdFdmVudCh0aGlzLmRyYWdnYWJsZUVsLCAnbW91c2Vkb3duJywgJ21vdXNlbW92ZScsICdtb3VzZXVwJyksXG4gICAgICB0aGlzLmN1c3RvbURyYWdFdmVudCh0aGlzLmRyYWdnYWJsZUVsLCAndG91Y2hzdGFydCcsICd0b3VjaG1vdmUnLCAndG91Y2hlbmQnKSxcbiAgICBdO1xuICB9XG5cbiAgcHVibGljIGRldGFjaERyYWdMaXN0ZW5lcnMoKSB7XG4gICAgaWYgKHRoaXMubGlzdGVuZXJzKSB7XG4gICAgICB0aGlzLmxpc3RlbmVycy5tYXAoZXZlbnQgPT4gZXZlbnQoKSk7XG4gICAgfVxuXG4gICAgLy8gSW4gbW9zdCBjYXNlcywgb25jZSB1c2VycyBzdGFydCBkcmFnZ2luZyB3aXRoIG1vdXNlZG93bi90b3VjaHN0YXJ0IGV2ZW50cyxcbiAgICAvLyB0aGV5IHdpbGwgZW5kIGRyYWdnaW5nIGF0IG9uZSBwb2ludCB3aXRoIG1vdXNldXAvdG91Y2hlbmQuXG4gICAgLy8gSG93ZXZlciwgdGhlcmUgbWlnaHQgYmUgYSBmZXcgY2FzZXMgd2hlcmUgbW91c2Vkb3duL3RvdWNoc3RhcnQgZXZlbnRzIGdldCByZWdpc3RlcmVkLFxuICAgIC8vIGJ1dCB0aGUgZHJhZ2dhYmxlIGVsZW1lbnQgZ2V0cyByZW1vdmVkIGJlZm9yZSB1c2VyIGVuZHMgZHJhZ2dpbmcuXG4gICAgLy8gSW4gdGhhdCBjYXNlLCB3ZSBuZWVkIHRvIHJlbW92ZSB0aGUgYXR0YWNoZWQgbGlzdGVuZXJzIHRoYXQgaGFwcGVuZWQgZHVyaW5nIHRoZSBtb3VzZWRvd24vdG91Y2hzdGFydCBldmVudHMuXG4gICAgaWYgKHRoaXMubmVzdGVkTGlzdGVuZXJzKSB7XG4gICAgICB0aGlzLm5lc3RlZExpc3RlbmVycy5tYXAoZXZlbnQgPT4gZXZlbnQoKSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjdXN0b21EcmFnRXZlbnQoZWxlbWVudDogTm9kZSwgc3RhcnRPbkV2ZW50OiBzdHJpbmcsIG1vdmVPbkV2ZW50OiBzdHJpbmcsIGVuZE9uRXZlbnQ6IHN0cmluZyk6ICgpID0+IHZvaWQge1xuICAgIHJldHVybiB0aGlzLnJlbmRlcmVyLmxpc3RlbihlbGVtZW50LCBzdGFydE9uRXZlbnQsICgpID0+IHtcbiAgICAgIC8vIEluaXRpYWxpemUgbmVzdGVkIGxpc3RlbmVycycgcHJvcGVydHkgd2l0aCBhIG5ldyBlbXB0eSBhcnJheTtcbiAgICAgIHRoaXMubmVzdGVkTGlzdGVuZXJzID0gW107XG5cbiAgICAgIC8vIFRoaXMgaXMgbmVlZGVkIHRvIGRpc2FibGUgc2VsZWN0aW9uIGR1cmluZyBkcmFnZ2luZyAoZXNwZWNpYWxseSBpbiBFREdFL0lFMTEpLlxuICAgICAgdGhpcy5uZXN0ZWRMaXN0ZW5lcnMucHVzaChcbiAgICAgICAgdGhpcy5yZW5kZXJlci5saXN0ZW4oJ2RvY3VtZW50JywgJ3NlbGVjdHN0YXJ0JywgKHNlbGVjdEV2ZW50OiBFdmVudCkgPT4ge1xuICAgICAgICAgIHNlbGVjdEV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgc2VsZWN0RXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH0pXG4gICAgICApO1xuXG4gICAgICAvLyBMaXN0ZW4gdG8gbW91c2Vtb3ZlL3RvdWNobW92ZSBldmVudHMgb3V0c2lkZSBvZiBhbmd1bGFyIHpvbmUuXG4gICAgICB0aGlzLm5lc3RlZExpc3RlbmVycy5wdXNoKFxuICAgICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyZXIubGlzdGVuKCdkb2N1bWVudCcsIG1vdmVPbkV2ZW50LCAobW92ZUV2ZW50OiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCkgPT4ge1xuICAgICAgICAgICAgLy8gRXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCkgaXMgbmVlZGVkIGhlcmUgdG8gcHJldmVudCBuZXN0ZWQgZHJhZ2dhYmxlcyBmcm9tIGdldHRpbmcgZHJhZ2dlZFxuICAgICAgICAgICAgLy8gYWx0b2dldGhlci4gV2Ugc2hvdWxkbid0IHVzZSBFdmVudC5zdG9wUHJvcGFnYXRpb24oKSBoZXJlIGFzIHdlIGFyZSBsaXN0ZW5pbmcgdG8gdGhlIGV2ZW50c1xuICAgICAgICAgICAgLy8gb24gdGhlIGdsb2JhbCBlbGVtZW50IGxldmVsLlxuXG4gICAgICAgICAgICAvLyBXaXRoIEV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpLCBpdCByZWdpc3RlcnMgdGhlIGV2ZW50cyBzZW50IGZyb20gdGhlIGlubmVyIG1vc3QgZHJhZ2dhYmxlXG4gICAgICAgICAgICAvLyBmaXJzdC4gVGhlbiBpbW1lZGlhdGVseSBhZnRlciB0aGF0LCBpdCBzdG9wcyBsaXN0ZW5pbmcgdG8gdGhlIHNhbWUgdHlwZSBvZiBldmVudHMgb24gdGhlIHNhbWVcbiAgICAgICAgICAgIC8vIGVsZW1lbnQuIFNvIHRoaXMgd2lsbCBoZWxwIHVzIHRvIG5vdCByZWdpc3RlciB0aGUgc2FtZSBldmVudHMgdGhhdCB3b3VsZCBjb21lIGZyb20gdGhlIHBhcmVudFxuICAgICAgICAgICAgLy8gbGV2ZWwgZHJhZ2dhYmxlcyBldmVudHVhbGx5LlxuXG4gICAgICAgICAgICBtb3ZlRXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5oYXNEcmFnU3RhcnRlZCkge1xuICAgICAgICAgICAgICB0aGlzLmhhc0RyYWdTdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgLy8gRmlyZSBcImRyYWdzdGFydFwiXG4gICAgICAgICAgICAgIHRoaXMuYnJvYWRjYXN0KG1vdmVFdmVudCwgRHJhZ0V2ZW50VHlwZS5EUkFHX1NUQVJUKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIEZpcmUgXCJkcmFnbW92ZVwiXG4gICAgICAgICAgICAgIHRoaXMuYnJvYWRjYXN0KG1vdmVFdmVudCwgRHJhZ0V2ZW50VHlwZS5EUkFHX01PVkUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgICAgKTtcblxuICAgICAgLy8gTGlzdGVuIHRvIG1vdXNldXAvdG91Y2hlbmQgZXZlbnRzLlxuICAgICAgdGhpcy5uZXN0ZWRMaXN0ZW5lcnMucHVzaChcbiAgICAgICAgdGhpcy5yZW5kZXJlci5saXN0ZW4oJ2RvY3VtZW50JywgZW5kT25FdmVudCwgKGVuZEV2ZW50OiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLmhhc0RyYWdTdGFydGVkKSB7XG4gICAgICAgICAgICAvLyBGaXJlIFwiZHJhZ2VuZFwiIG9ubHkgaWYgZHJhZ3N0YXJ0IGlzIHJlZ2lzdGVyZWRcbiAgICAgICAgICAgIHRoaXMuaGFzRHJhZ1N0YXJ0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuYnJvYWRjYXN0KGVuZEV2ZW50LCBEcmFnRXZlbnRUeXBlLkRSQUdfRU5EKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBXZSBtdXN0IHJlbW92ZSB0aGUgdGhlIG5lc3RlZCBsaXN0ZW5lcnMgZXZlcnkgdGltZSBkcmFnIGNvbXBsZXRlcy5cbiAgICAgICAgICBpZiAodGhpcy5uZXN0ZWRMaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIHRoaXMubmVzdGVkTGlzdGVuZXJzLm1hcChldmVudCA9PiBldmVudCgpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBicm9hZGNhc3QoZXZlbnQ6IE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50LCBldmVudFR5cGU6IERyYWdFdmVudFR5cGUpOiB2b2lkIHtcbiAgICBjb25zdCBkcmFnRXZlbnQ6IERyYWdFdmVudEludGVyZmFjZTxUPiA9IHRoaXMuZ2VuZXJhdGVEcmFnRXZlbnQoZXZlbnQsIGV2ZW50VHlwZSk7XG5cbiAgICBzd2l0Y2ggKGRyYWdFdmVudC50eXBlKSB7XG4gICAgICBjYXNlIERyYWdFdmVudFR5cGUuRFJBR19TVEFSVDpcbiAgICAgICAgdGhpcy5kcmFnU3RhcnQubmV4dChkcmFnRXZlbnQpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgRHJhZ0V2ZW50VHlwZS5EUkFHX01PVkU6XG4gICAgICAgIHRoaXMuZHJhZ01vdmUubmV4dChkcmFnRXZlbnQpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgRHJhZ0V2ZW50VHlwZS5EUkFHX0VORDpcbiAgICAgICAgdGhpcy5kcmFnRW5kLm5leHQoZHJhZ0V2ZW50KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICAvLyBUaGUgZm9sbG93aW5nIHByb3BlcnRpZXMgYXJlIHNldCBhZnRlciB0aGV5IGFyZSBicm9hZGNhc3RlZCB0byB0aGUgRHJhZ2dhYmxlR2hvc3QgY29tcG9uZW50LlxuICAgIGRyYWdFdmVudC5naG9zdEVsZW1lbnQgPSB0aGlzLmdob3N0RWxlbWVudDtcbiAgICBkcmFnRXZlbnQuZHJvcFBvaW50UG9zaXRpb24gPSB0aGlzLmRyb3BQb2ludFBvc2l0aW9uO1xuXG4gICAgdGhpcy5ldmVudEJ1cy5icm9hZGNhc3QoZHJhZ0V2ZW50KTtcbiAgfVxuXG4gIHByaXZhdGUgZ2VuZXJhdGVEcmFnRXZlbnQoZXZlbnQ6IE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50LCBldmVudFR5cGU6IERyYWdFdmVudFR5cGUpOiBEcmFnRXZlbnRJbnRlcmZhY2U8VD4ge1xuICAgIGxldCBuYXRpdmVFdmVudDogYW55O1xuXG4gICAgaWYgKCg8VG91Y2hFdmVudD5ldmVudCkuaGFzT3duUHJvcGVydHkoJ2NoYW5nZWRUb3VjaGVzJykpIHtcbiAgICAgIG5hdGl2ZUV2ZW50ID0gKDxUb3VjaEV2ZW50PmV2ZW50KS5jaGFuZ2VkVG91Y2hlc1swXTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmF0aXZlRXZlbnQgPSBldmVudDtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogZXZlbnRUeXBlLFxuICAgICAgZHJhZ1Bvc2l0aW9uOiB7IHBhZ2VYOiBuYXRpdmVFdmVudC5wYWdlWCwgcGFnZVk6IG5hdGl2ZUV2ZW50LnBhZ2VZIH0sXG4gICAgICBncm91cDogdGhpcy5ncm91cCxcbiAgICAgIGRyYWdEYXRhVHJhbnNmZXI6IHRoaXMuZHJhZ0RhdGFUcmFuc2ZlcixcbiAgICAgIGdob3N0RWxlbWVudDogdGhpcy5naG9zdEVsZW1lbnQsXG4gICAgfTtcbiAgfVxufVxuIl19