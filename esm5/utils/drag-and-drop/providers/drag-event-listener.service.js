/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            this.listeners.map((/**
             * @param {?} event
             * @return {?}
             */
            function (event) { return event(); }));
        }
        // In most cases, once users start dragging with mousedown/touchstart events,
        // they will end dragging at one point with mouseup/touchend.
        // However, there might be a few cases where mousedown/touchstart events get registered,
        // but the draggable element gets removed before user ends dragging.
        // In that case, we need to remove the attached listeners that happened during the mousedown/touchstart events.
        if (this.nestedListeners) {
            this.nestedListeners.map((/**
             * @param {?} event
             * @return {?}
             */
            function (event) { return event(); }));
        }
    };
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    DragEventListenerService.prototype.getNativeEventObject = /**
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (((/** @type {?} */ (event))).hasOwnProperty('changedTouches')) {
            return ((/** @type {?} */ (event))).changedTouches[0];
        }
        else {
            return event;
        }
    };
    /**
     * @private
     * @param {?} element
     * @param {?} startOnEvent
     * @param {?} moveOnEvent
     * @param {?} endOnEvent
     * @return {?}
     */
    DragEventListenerService.prototype.customDragEvent = /**
     * @private
     * @param {?} element
     * @param {?} startOnEvent
     * @param {?} moveOnEvent
     * @param {?} endOnEvent
     * @return {?}
     */
    function (element, startOnEvent, moveOnEvent, endOnEvent) {
        var _this = this;
        return this.renderer.listen(element, startOnEvent, (/**
         * @param {?} startEvent
         * @return {?}
         */
        function (startEvent) {
            // save the initial point to initialPosition
            // this will be used to calculate how far the draggable has been dragged from its initial position
            _this.initialPosition = {
                pageX: _this.getNativeEventObject(startEvent).pageX,
                pageY: _this.getNativeEventObject(startEvent).pageY,
            };
            // Initialize nested listeners' property with a new empty array;
            _this.nestedListeners = [];
            // This is needed to disable selection during dragging (especially in EDGE/IE11).
            _this.nestedListeners.push(_this.renderer.listen('document', 'selectstart', (/**
             * @param {?} selectEvent
             * @return {?}
             */
            function (selectEvent) {
                selectEvent.preventDefault();
                selectEvent.stopImmediatePropagation();
            })));
            // Listen to mousemove/touchmove events outside of angular zone.
            _this.nestedListeners.push(_this.ngZone.runOutsideAngular((/**
             * @return {?}
             */
            function () {
                return _this.renderer.listen('document', moveOnEvent, (/**
                 * @param {?} moveEvent
                 * @return {?}
                 */
                function (moveEvent) {
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
                }));
            })));
            // Listen to mouseup/touchend events.
            _this.nestedListeners.push(_this.renderer.listen('document', endOnEvent, (/**
             * @param {?} endEvent
             * @return {?}
             */
            function (endEvent) {
                if (_this.hasDragStarted) {
                    // Fire "dragend" only if dragstart is registered
                    _this.hasDragStarted = false;
                    _this.broadcast(endEvent, DragEventType.DRAG_END);
                }
                // We must remove the the nested listeners every time drag completes.
                if (_this.nestedListeners) {
                    _this.nestedListeners.map((/**
                     * @param {?} event
                     * @return {?}
                     */
                    function (event) { return event(); }));
                }
            })));
        }));
    };
    /**
     * @private
     * @param {?} event
     * @param {?} eventType
     * @return {?}
     */
    DragEventListenerService.prototype.broadcast = /**
     * @private
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
     * @private
     * @param {?} event
     * @param {?} eventType
     * @return {?}
     */
    DragEventListenerService.prototype.generateDragEvent = /**
     * @private
     * @param {?} event
     * @param {?} eventType
     * @return {?}
     */
    function (event, eventType) {
        /** @type {?} */
        var nativeEvent = this.getNativeEventObject(event);
        return {
            type: eventType,
            dragPosition: {
                pageX: nativeEvent.pageX,
                pageY: nativeEvent.pageY,
                moveX: nativeEvent.pageX - this.initialPosition.pageX,
                moveY: nativeEvent.pageY - this.initialPosition.pageY,
            },
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
    /**
     * @type {?}
     * @private
     */
    DragEventListenerService.prototype.draggableEl;
    /**
     * @type {?}
     * @private
     */
    DragEventListenerService.prototype.listeners;
    /**
     * @type {?}
     * @private
     */
    DragEventListenerService.prototype.nestedListeners;
    /**
     * @type {?}
     * @private
     */
    DragEventListenerService.prototype.dragStart;
    /**
     * @type {?}
     * @private
     */
    DragEventListenerService.prototype.dragMove;
    /**
     * @type {?}
     * @private
     */
    DragEventListenerService.prototype.dragEnd;
    /**
     * @type {?}
     * @private
     */
    DragEventListenerService.prototype.hasDragStarted;
    /**
     * @type {?}
     * @private
     */
    DragEventListenerService.prototype.initialPosition;
    /** @type {?} */
    DragEventListenerService.prototype.dragDataTransfer;
    /** @type {?} */
    DragEventListenerService.prototype.group;
    /** @type {?} */
    DragEventListenerService.prototype.ghostElement;
    /** @type {?} */
    DragEventListenerService.prototype.dropPointPosition;
    /**
     * @type {?}
     * @private
     */
    DragEventListenerService.prototype.ngZone;
    /**
     * @type {?}
     * @private
     */
    DragEventListenerService.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    DragEventListenerService.prototype.eventBus;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZy1ldmVudC1saXN0ZW5lci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsidXRpbHMvZHJhZy1hbmQtZHJvcC9wcm92aWRlcnMvZHJhZy1ldmVudC1saXN0ZW5lci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRTNDLE9BQU8sRUFBc0IsYUFBYSxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDdkYsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7Ozs7QUFFL0U7SUE0QkUsa0NBQW9CLE1BQWMsRUFBVSxRQUFtQixFQUFVLFFBQXVDO1FBQTVGLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBK0I7UUFsQnhHLGNBQVMsR0FBbUMsSUFBSSxPQUFPLEVBQXlCLENBQUM7UUFDakYsYUFBUSxHQUFtQyxJQUFJLE9BQU8sRUFBeUIsQ0FBQztRQUNoRixZQUFPLEdBQW1DLElBQUksT0FBTyxFQUF5QixDQUFDO1FBRS9FLG1CQUFjLEdBQVksS0FBSyxDQUFDO0lBYzJFLENBQUM7SUFacEgsc0JBQUksaURBQVc7Ozs7UUFBZjtZQUNFLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN2QyxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLCtDQUFTOzs7O1FBQWI7WUFDRSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDdEMsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSwrQ0FBUzs7OztRQUFiO1lBQ0UsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVks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QUFFLFNBQVM7Z0JBSTdCLDBCQUEwQjs7SUFrTG5DLCtCQUFDO0NBQUEsQUFoTEQsSUFnTEM7U0EvS1ksd0JBQXdCOzs7Ozs7SUFDbkMsK0NBQXlCOzs7OztJQUd6Qiw2Q0FBa0M7Ozs7O0lBR2xDLG1EQUF3Qzs7Ozs7SUFFeEMsNkNBQXlGOzs7OztJQUN6Riw0Q0FBd0Y7Ozs7O0lBQ3hGLDJDQUF1Rjs7Ozs7SUFFdkYsa0RBQXdDOzs7OztJQWdCeEMsbURBQTBEOztJQUcxRCxvREFBNEI7O0lBQzVCLHlDQUFpQzs7SUFHakMsZ0RBQTBCOztJQUMxQixxREFBNEQ7Ozs7O0lBVmhELDBDQUFzQjs7Ozs7SUFBRSw0Q0FBMkI7Ozs7O0lBQUUsNENBQStDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lLCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgRHJhZ0V2ZW50SW50ZXJmYWNlLCBEcmFnRXZlbnRUeXBlIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9kcmFnLWV2ZW50LmludGVyZmFjZSc7XG5pbXBvcnQgeyBEcmFnQW5kRHJvcEV2ZW50QnVzU2VydmljZSB9IGZyb20gJy4vZHJhZy1hbmQtZHJvcC1ldmVudC1idXMuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEcmFnRXZlbnRMaXN0ZW5lclNlcnZpY2U8VD4ge1xuICBwcml2YXRlIGRyYWdnYWJsZUVsOiBhbnk7XG5cbiAgLy8gY29udGFpbnMgdGhlIHN0YXJ0aW5nIGV2ZW50cyBzdWNoIGFzIG1vdXNlZG93biBhbmQgdG91Y2hzdGFydFxuICBwcml2YXRlIGxpc3RlbmVyczogKCgpID0+IHZvaWQpW107XG4gIC8vIGNvbnRhaW5zIHRoZSBuZXN0ZWQgZXZlbnRzIHRoYXQgaGFwcGVucyBhZnRlci9pbnNpZGUgdGhlIHN0YXJ0aW5nIGV2ZW50c1xuICAvLyBzdWNoIGFzIHNlbGVjdHN0YXJ0LCBtb3VzZW1vdmUvdG91Y2htb3ZlLCBtb3VzZXVwL3RvdWNoZW5kXG4gIHByaXZhdGUgbmVzdGVkTGlzdGVuZXJzOiAoKCkgPT4gdm9pZClbXTtcblxuICBwcml2YXRlIGRyYWdTdGFydDogU3ViamVjdDxEcmFnRXZlbnRJbnRlcmZhY2U8VD4+ID0gbmV3IFN1YmplY3Q8RHJhZ0V2ZW50SW50ZXJmYWNlPFQ+PigpO1xuICBwcml2YXRlIGRyYWdNb3ZlOiBTdWJqZWN0PERyYWdFdmVudEludGVyZmFjZTxUPj4gPSBuZXcgU3ViamVjdDxEcmFnRXZlbnRJbnRlcmZhY2U8VD4+KCk7XG4gIHByaXZhdGUgZHJhZ0VuZDogU3ViamVjdDxEcmFnRXZlbnRJbnRlcmZhY2U8VD4+ID0gbmV3IFN1YmplY3Q8RHJhZ0V2ZW50SW50ZXJmYWNlPFQ+PigpO1xuXG4gIHByaXZhdGUgaGFzRHJhZ1N0YXJ0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBnZXQgZHJhZ1N0YXJ0ZWQoKTogT2JzZXJ2YWJsZTxEcmFnRXZlbnRJbnRlcmZhY2U8VD4+IHtcbiAgICByZXR1cm4gdGhpcy5kcmFnU3RhcnQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBnZXQgZHJhZ01vdmVkKCk6IE9ic2VydmFibGU8RHJhZ0V2ZW50SW50ZXJmYWNlPFQ+PiB7XG4gICAgcmV0dXJuIHRoaXMuZHJhZ01vdmUuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBnZXQgZHJhZ0VuZGVkKCk6IE9ic2VydmFibGU8RHJhZ0V2ZW50SW50ZXJmYWNlPFQ+PiB7XG4gICAgcmV0dXJuIHRoaXMuZHJhZ0VuZC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbmdab25lOiBOZ1pvbmUsIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSBldmVudEJ1czogRHJhZ0FuZERyb3BFdmVudEJ1c1NlcnZpY2U8VD4pIHt9XG5cbiAgcHJpdmF0ZSBpbml0aWFsUG9zaXRpb246IHsgcGFnZVg6IG51bWJlcjsgcGFnZVk6IG51bWJlciB9O1xuXG4gIC8vIERyYWdnYWJsZSBjb21wb25lbnQgc2V0cyB0aGVzZSBwcm9wZXJ0aWVzOlxuICBwdWJsaWMgZHJhZ0RhdGFUcmFuc2Zlcj86IFQ7XG4gIHB1YmxpYyBncm91cD86IHN0cmluZyB8IHN0cmluZ1tdO1xuXG4gIC8vIERyYWdnYWJsZUdob3N0IGNvbXBvbmVudCBzZXRzIHRoZXNlIHByb3BlcnRpZXM6XG4gIHB1YmxpYyBnaG9zdEVsZW1lbnQ/OiBhbnk7XG4gIHB1YmxpYyBkcm9wUG9pbnRQb3NpdGlvbj86IHsgcGFnZVg6IG51bWJlcjsgcGFnZVk6IG51bWJlciB9O1xuXG4gIHB1YmxpYyBhdHRhY2hEcmFnTGlzdGVuZXJzKGRyYWdnYWJsZUVsOiBOb2RlKSB7XG4gICAgdGhpcy5kcmFnZ2FibGVFbCA9IGRyYWdnYWJsZUVsO1xuICAgIHRoaXMubGlzdGVuZXJzID0gW1xuICAgICAgdGhpcy5jdXN0b21EcmFnRXZlbnQodGhpcy5kcmFnZ2FibGVFbCwgJ21vdXNlZG93bicsICdtb3VzZW1vdmUnLCAnbW91c2V1cCcpLFxuICAgICAgdGhpcy5jdXN0b21EcmFnRXZlbnQodGhpcy5kcmFnZ2FibGVFbCwgJ3RvdWNoc3RhcnQnLCAndG91Y2htb3ZlJywgJ3RvdWNoZW5kJyksXG4gICAgXTtcbiAgfVxuXG4gIHB1YmxpYyBkZXRhY2hEcmFnTGlzdGVuZXJzKCkge1xuICAgIGlmICh0aGlzLmxpc3RlbmVycykge1xuICAgICAgdGhpcy5saXN0ZW5lcnMubWFwKGV2ZW50ID0+IGV2ZW50KCkpO1xuICAgIH1cblxuICAgIC8vIEluIG1vc3QgY2FzZXMsIG9uY2UgdXNlcnMgc3RhcnQgZHJhZ2dpbmcgd2l0aCBtb3VzZWRvd24vdG91Y2hzdGFydCBldmVudHMsXG4gICAgLy8gdGhleSB3aWxsIGVuZCBkcmFnZ2luZyBhdCBvbmUgcG9pbnQgd2l0aCBtb3VzZXVwL3RvdWNoZW5kLlxuICAgIC8vIEhvd2V2ZXIsIHRoZXJlIG1pZ2h0IGJlIGEgZmV3IGNhc2VzIHdoZXJlIG1vdXNlZG93bi90b3VjaHN0YXJ0IGV2ZW50cyBnZXQgcmVnaXN0ZXJlZCxcbiAgICAvLyBidXQgdGhlIGRyYWdnYWJsZSBlbGVtZW50IGdldHMgcmVtb3ZlZCBiZWZvcmUgdXNlciBlbmRzIGRyYWdnaW5nLlxuICAgIC8vIEluIHRoYXQgY2FzZSwgd2UgbmVlZCB0byByZW1vdmUgdGhlIGF0dGFjaGVkIGxpc3RlbmVycyB0aGF0IGhhcHBlbmVkIGR1cmluZyB0aGUgbW91c2Vkb3duL3RvdWNoc3RhcnQgZXZlbnRzLlxuICAgIGlmICh0aGlzLm5lc3RlZExpc3RlbmVycykge1xuICAgICAgdGhpcy5uZXN0ZWRMaXN0ZW5lcnMubWFwKGV2ZW50ID0+IGV2ZW50KCkpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0TmF0aXZlRXZlbnRPYmplY3QoZXZlbnQ6IE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50KTogYW55IHtcbiAgICBpZiAoKDxUb3VjaEV2ZW50PmV2ZW50KS5oYXNPd25Qcm9wZXJ0eSgnY2hhbmdlZFRvdWNoZXMnKSkge1xuICAgICAgcmV0dXJuICg8VG91Y2hFdmVudD5ldmVudCkuY2hhbmdlZFRvdWNoZXNbMF07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBldmVudDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGN1c3RvbURyYWdFdmVudChlbGVtZW50OiBOb2RlLCBzdGFydE9uRXZlbnQ6IHN0cmluZywgbW92ZU9uRXZlbnQ6IHN0cmluZywgZW5kT25FdmVudDogc3RyaW5nKTogKCkgPT4gdm9pZCB7XG4gICAgcmV0dXJuIHRoaXMucmVuZGVyZXIubGlzdGVuKGVsZW1lbnQsIHN0YXJ0T25FdmVudCwgKHN0YXJ0RXZlbnQ6IE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50KSA9PiB7XG4gICAgICAvLyBzYXZlIHRoZSBpbml0aWFsIHBvaW50IHRvIGluaXRpYWxQb3NpdGlvblxuICAgICAgLy8gdGhpcyB3aWxsIGJlIHVzZWQgdG8gY2FsY3VsYXRlIGhvdyBmYXIgdGhlIGRyYWdnYWJsZSBoYXMgYmVlbiBkcmFnZ2VkIGZyb20gaXRzIGluaXRpYWwgcG9zaXRpb25cbiAgICAgIHRoaXMuaW5pdGlhbFBvc2l0aW9uID0ge1xuICAgICAgICBwYWdlWDogdGhpcy5nZXROYXRpdmVFdmVudE9iamVjdChzdGFydEV2ZW50KS5wYWdlWCxcbiAgICAgICAgcGFnZVk6IHRoaXMuZ2V0TmF0aXZlRXZlbnRPYmplY3Qoc3RhcnRFdmVudCkucGFnZVksXG4gICAgICB9O1xuXG4gICAgICAvLyBJbml0aWFsaXplIG5lc3RlZCBsaXN0ZW5lcnMnIHByb3BlcnR5IHdpdGggYSBuZXcgZW1wdHkgYXJyYXk7XG4gICAgICB0aGlzLm5lc3RlZExpc3RlbmVycyA9IFtdO1xuXG4gICAgICAvLyBUaGlzIGlzIG5lZWRlZCB0byBkaXNhYmxlIHNlbGVjdGlvbiBkdXJpbmcgZHJhZ2dpbmcgKGVzcGVjaWFsbHkgaW4gRURHRS9JRTExKS5cbiAgICAgIHRoaXMubmVzdGVkTGlzdGVuZXJzLnB1c2goXG4gICAgICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKCdkb2N1bWVudCcsICdzZWxlY3RzdGFydCcsIChzZWxlY3RFdmVudDogRXZlbnQpID0+IHtcbiAgICAgICAgICBzZWxlY3RFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIHNlbGVjdEV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgICB9KVxuICAgICAgKTtcblxuICAgICAgLy8gTGlzdGVuIHRvIG1vdXNlbW92ZS90b3VjaG1vdmUgZXZlbnRzIG91dHNpZGUgb2YgYW5ndWxhciB6b25lLlxuICAgICAgdGhpcy5uZXN0ZWRMaXN0ZW5lcnMucHVzaChcbiAgICAgICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgIHJldHVybiB0aGlzLnJlbmRlcmVyLmxpc3RlbignZG9jdW1lbnQnLCBtb3ZlT25FdmVudCwgKG1vdmVFdmVudDogTW91c2VFdmVudCB8IFRvdWNoRXZlbnQpID0+IHtcbiAgICAgICAgICAgIC8vIEV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpIGlzIG5lZWRlZCBoZXJlIHRvIHByZXZlbnQgbmVzdGVkIGRyYWdnYWJsZXMgZnJvbSBnZXR0aW5nIGRyYWdnZWRcbiAgICAgICAgICAgIC8vIGFsdG9nZXRoZXIuIFdlIHNob3VsZG4ndCB1c2UgRXZlbnQuc3RvcFByb3BhZ2F0aW9uKCkgaGVyZSBhcyB3ZSBhcmUgbGlzdGVuaW5nIHRvIHRoZSBldmVudHNcbiAgICAgICAgICAgIC8vIG9uIHRoZSBnbG9iYWwgZWxlbWVudCBsZXZlbC5cblxuICAgICAgICAgICAgLy8gV2l0aCBFdmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKSwgaXQgcmVnaXN0ZXJzIHRoZSBldmVudHMgc2VudCBmcm9tIHRoZSBpbm5lciBtb3N0IGRyYWdnYWJsZVxuICAgICAgICAgICAgLy8gZmlyc3QuIFRoZW4gaW1tZWRpYXRlbHkgYWZ0ZXIgdGhhdCwgaXQgc3RvcHMgbGlzdGVuaW5nIHRvIHRoZSBzYW1lIHR5cGUgb2YgZXZlbnRzIG9uIHRoZSBzYW1lXG4gICAgICAgICAgICAvLyBlbGVtZW50LiBTbyB0aGlzIHdpbGwgaGVscCB1cyB0byBub3QgcmVnaXN0ZXIgdGhlIHNhbWUgZXZlbnRzIHRoYXQgd291bGQgY29tZSBmcm9tIHRoZSBwYXJlbnRcbiAgICAgICAgICAgIC8vIGxldmVsIGRyYWdnYWJsZXMgZXZlbnR1YWxseS5cblxuICAgICAgICAgICAgbW92ZUV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMuaGFzRHJhZ1N0YXJ0ZWQpIHtcbiAgICAgICAgICAgICAgdGhpcy5oYXNEcmFnU3RhcnRlZCA9IHRydWU7XG4gICAgICAgICAgICAgIC8vIEZpcmUgXCJkcmFnc3RhcnRcIlxuICAgICAgICAgICAgICB0aGlzLmJyb2FkY2FzdChtb3ZlRXZlbnQsIERyYWdFdmVudFR5cGUuRFJBR19TVEFSVCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyBGaXJlIFwiZHJhZ21vdmVcIlxuICAgICAgICAgICAgICB0aGlzLmJyb2FkY2FzdChtb3ZlRXZlbnQsIERyYWdFdmVudFR5cGUuRFJBR19NT1ZFKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICAgIC8vIExpc3RlbiB0byBtb3VzZXVwL3RvdWNoZW5kIGV2ZW50cy5cbiAgICAgIHRoaXMubmVzdGVkTGlzdGVuZXJzLnB1c2goXG4gICAgICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKCdkb2N1bWVudCcsIGVuZE9uRXZlbnQsIChlbmRFdmVudDogTW91c2VFdmVudCB8IFRvdWNoRXZlbnQpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5oYXNEcmFnU3RhcnRlZCkge1xuICAgICAgICAgICAgLy8gRmlyZSBcImRyYWdlbmRcIiBvbmx5IGlmIGRyYWdzdGFydCBpcyByZWdpc3RlcmVkXG4gICAgICAgICAgICB0aGlzLmhhc0RyYWdTdGFydGVkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmJyb2FkY2FzdChlbmRFdmVudCwgRHJhZ0V2ZW50VHlwZS5EUkFHX0VORCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gV2UgbXVzdCByZW1vdmUgdGhlIHRoZSBuZXN0ZWQgbGlzdGVuZXJzIGV2ZXJ5IHRpbWUgZHJhZyBjb21wbGV0ZXMuXG4gICAgICAgICAgaWYgKHRoaXMubmVzdGVkTGlzdGVuZXJzKSB7XG4gICAgICAgICAgICB0aGlzLm5lc3RlZExpc3RlbmVycy5tYXAoZXZlbnQgPT4gZXZlbnQoKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgYnJvYWRjYXN0KGV2ZW50OiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCwgZXZlbnRUeXBlOiBEcmFnRXZlbnRUeXBlKTogdm9pZCB7XG4gICAgY29uc3QgZHJhZ0V2ZW50OiBEcmFnRXZlbnRJbnRlcmZhY2U8VD4gPSB0aGlzLmdlbmVyYXRlRHJhZ0V2ZW50KGV2ZW50LCBldmVudFR5cGUpO1xuXG4gICAgc3dpdGNoIChkcmFnRXZlbnQudHlwZSkge1xuICAgICAgY2FzZSBEcmFnRXZlbnRUeXBlLkRSQUdfU1RBUlQ6XG4gICAgICAgIHRoaXMuZHJhZ1N0YXJ0Lm5leHQoZHJhZ0V2ZW50KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIERyYWdFdmVudFR5cGUuRFJBR19NT1ZFOlxuICAgICAgICB0aGlzLmRyYWdNb3ZlLm5leHQoZHJhZ0V2ZW50KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIERyYWdFdmVudFR5cGUuRFJBR19FTkQ6XG4gICAgICAgIHRoaXMuZHJhZ0VuZC5uZXh0KGRyYWdFdmVudCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgLy8gVGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzIGFyZSBzZXQgYWZ0ZXIgdGhleSBhcmUgYnJvYWRjYXN0ZWQgdG8gdGhlIERyYWdnYWJsZUdob3N0IGNvbXBvbmVudC5cbiAgICBkcmFnRXZlbnQuZ2hvc3RFbGVtZW50ID0gdGhpcy5naG9zdEVsZW1lbnQ7XG4gICAgZHJhZ0V2ZW50LmRyb3BQb2ludFBvc2l0aW9uID0gdGhpcy5kcm9wUG9pbnRQb3NpdGlvbjtcblxuICAgIHRoaXMuZXZlbnRCdXMuYnJvYWRjYXN0KGRyYWdFdmVudCk7XG4gIH1cblxuICBwcml2YXRlIGdlbmVyYXRlRHJhZ0V2ZW50KGV2ZW50OiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCwgZXZlbnRUeXBlOiBEcmFnRXZlbnRUeXBlKTogRHJhZ0V2ZW50SW50ZXJmYWNlPFQ+IHtcbiAgICBjb25zdCBuYXRpdmVFdmVudDogYW55ID0gdGhpcy5nZXROYXRpdmVFdmVudE9iamVjdChldmVudCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogZXZlbnRUeXBlLFxuICAgICAgZHJhZ1Bvc2l0aW9uOiB7XG4gICAgICAgIHBhZ2VYOiBuYXRpdmVFdmVudC5wYWdlWCxcbiAgICAgICAgcGFnZVk6IG5hdGl2ZUV2ZW50LnBhZ2VZLFxuICAgICAgICBtb3ZlWDogbmF0aXZlRXZlbnQucGFnZVggLSB0aGlzLmluaXRpYWxQb3NpdGlvbi5wYWdlWCxcbiAgICAgICAgbW92ZVk6IG5hdGl2ZUV2ZW50LnBhZ2VZIC0gdGhpcy5pbml0aWFsUG9zaXRpb24ucGFnZVksXG4gICAgICB9LFxuICAgICAgZ3JvdXA6IHRoaXMuZ3JvdXAsXG4gICAgICBkcmFnRGF0YVRyYW5zZmVyOiB0aGlzLmRyYWdEYXRhVHJhbnNmZXIsXG4gICAgICBnaG9zdEVsZW1lbnQ6IHRoaXMuZ2hvc3RFbGVtZW50LFxuICAgIH07XG4gIH1cbn1cbiJdfQ==