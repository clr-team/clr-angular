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
export class DragEventListenerService {
    /**
     * @param {?} ngZone
     * @param {?} renderer
     * @param {?} eventBus
     */
    constructor(ngZone, renderer, eventBus) {
        this.ngZone = ngZone;
        this.renderer = renderer;
        this.eventBus = eventBus;
        this.dragStart = new Subject();
        this.dragMove = new Subject();
        this.dragEnd = new Subject();
        this.hasDragStarted = false;
    }
    /**
     * @return {?}
     */
    get dragStarted() {
        return this.dragStart.asObservable();
    }
    /**
     * @return {?}
     */
    get dragMoved() {
        return this.dragMove.asObservable();
    }
    /**
     * @return {?}
     */
    get dragEnded() {
        return this.dragEnd.asObservable();
    }
    /**
     * @param {?} draggableEl
     * @return {?}
     */
    attachDragListeners(draggableEl) {
        this.draggableEl = draggableEl;
        this.listeners = [
            this.customDragEvent(this.draggableEl, 'mousedown', 'mousemove', 'mouseup'),
            this.customDragEvent(this.draggableEl, 'touchstart', 'touchmove', 'touchend'),
        ];
    }
    /**
     * @return {?}
     */
    detachDragListeners() {
        if (this.listeners) {
            this.listeners.map(event => event());
        }
        // In most cases, once users start dragging with mousedown/touchstart events,
        // they will end dragging at one point with mouseup/touchend.
        // However, there might be a few cases where mousedown/touchstart events get registered,
        // but the draggable element gets removed before user ends dragging.
        // In that case, we need to remove the attached listeners that happened during the mousedown/touchstart events.
        if (this.nestedListeners) {
            this.nestedListeners.map(event => event());
        }
    }
    /**
     * @param {?} element
     * @param {?} startOnEvent
     * @param {?} moveOnEvent
     * @param {?} endOnEvent
     * @return {?}
     */
    customDragEvent(element, startOnEvent, moveOnEvent, endOnEvent) {
        return this.renderer.listen(element, startOnEvent, () => {
            // Initialize nested listeners' property with a new empty array;
            this.nestedListeners = [];
            // This is needed to disable selection during dragging (especially in EDGE/IE11).
            this.nestedListeners.push(this.renderer.listen('document', 'selectstart', (selectEvent) => {
                selectEvent.preventDefault();
                selectEvent.stopImmediatePropagation();
            }));
            // Listen to mousemove/touchmove events outside of angular zone.
            this.nestedListeners.push(this.ngZone.runOutsideAngular(() => {
                return this.renderer.listen('document', moveOnEvent, (moveEvent) => {
                    // Event.stopImmediatePropagation() is needed here to prevent nested draggables from getting dragged
                    // altogether. We shouldn't use Event.stopPropagation() here as we are listening to the events
                    // on the global element level.
                    // With Event.stopImmediatePropagation(), it registers the events sent from the inner most draggable
                    // first. Then immediately after that, it stops listening to the same type of events on the same
                    // element. So this will help us to not register the same events that would come from the parent
                    // level draggables eventually.
                    moveEvent.stopImmediatePropagation();
                    if (!this.hasDragStarted) {
                        this.hasDragStarted = true;
                        // Fire "dragstart"
                        this.broadcast(moveEvent, DragEventType.DRAG_START);
                    }
                    else {
                        // Fire "dragmove"
                        this.broadcast(moveEvent, DragEventType.DRAG_MOVE);
                    }
                });
            }));
            // Listen to mouseup/touchend events.
            this.nestedListeners.push(this.renderer.listen('document', endOnEvent, (endEvent) => {
                if (this.hasDragStarted) {
                    // Fire "dragend" only if dragstart is registered
                    this.hasDragStarted = false;
                    this.broadcast(endEvent, DragEventType.DRAG_END);
                }
                // We must remove the the nested listeners every time drag completes.
                if (this.nestedListeners) {
                    this.nestedListeners.map(event => event());
                }
            }));
        });
    }
    /**
     * @param {?} event
     * @param {?} eventType
     * @return {?}
     */
    broadcast(event, eventType) {
        /** @type {?} */
        const dragEvent = this.generateDragEvent(event, eventType);
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
    }
    /**
     * @param {?} event
     * @param {?} eventType
     * @return {?}
     */
    generateDragEvent(event, eventType) {
        /** @type {?} */
        let nativeEvent;
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
    }
}
DragEventListenerService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
DragEventListenerService.ctorParameters = () => [
    { type: NgZone },
    { type: Renderer2 },
    { type: DragAndDropEventBusService }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZy1ldmVudC1saXN0ZW5lci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsidXRpbHMvZHJhZy1hbmQtZHJvcC9wcm92aWRlcnMvZHJhZy1ldmVudC1saXN0ZW5lci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRTNDLE9BQU8sRUFBc0IsYUFBYSxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDdkYsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7Ozs7QUFHL0UsTUFBTSxPQUFPLHdCQUF3Qjs7Ozs7O0lBMkJuQyxZQUFvQixNQUFjLEVBQVUsUUFBbUIsRUFBVSxRQUF1QztRQUE1RixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUFVLGFBQVEsR0FBUixRQUFRLENBQStCO1FBbEJ4RyxjQUFTLEdBQW1DLElBQUksT0FBTyxFQUF5QixDQUFDO1FBQ2pGLGFBQVEsR0FBbUMsSUFBSSxPQUFPLEVBQXlCLENBQUM7UUFDaEYsWUFBTyxHQUFtQyxJQUFJLE9BQU8sRUFBeUIsQ0FBQztRQUUvRSxtQkFBYyxHQUFZLEtBQUssQ0FBQztJQWMyRSxDQUFDOzs7O0lBWnBILElBQUksV0FBVztRQUNiLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN2QyxDQUFDOzs7O0lBRUQsSUFBSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3RDLENBQUM7Ozs7SUFFRCxJQUFJLFNBQVM7UUFDWCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLENBQUM7SUFD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LENBQUMsQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtZQUN4RCxXQUFXLEdBQUcsQ0FBQyxtQkFBWSxLQUFLLEVBQUEsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNyRDthQUFNO1lBQ0wsV0FBVyxHQUFHLEtBQUssQ0FBQztTQUNyQjtRQUVELE9BQU87WUFDTCxJQUFJLEVBQUUsU0FBUztZQUNmLFlBQVksRUFBRSxFQUFFLEtBQUssRUFBRSxXQUFXLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxXQUFXLENBQUMsS0FBSyxFQUFFO1lBQ3BFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixnQkFBZ0IsRUFBRSxJQUFJLENBQUMsZ0JBQWdCO1lBQ3ZDLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWTtTQUNoQyxDQUFDO0lBQ0osQ0FBQzs7O1lBL0pGLFVBQVU7Ozs7WUFOVSxNQUFNO1lBQUUsU0FBUztZQUk3QiwwQkFBMEI7Ozs7SUFJakMsK0NBQXlCOztJQUd6Qiw2Q0FBa0M7O0lBR2xDLG1EQUF3Qzs7SUFFeEMsNkNBQXlGOztJQUN6Riw0Q0FBd0Y7O0lBQ3hGLDJDQUF1Rjs7SUFFdkYsa0RBQXdDOztJQWlCeEMsb0RBQTRCOztJQUM1Qix5Q0FBaUM7O0lBR2pDLGdEQUEwQjs7SUFDMUIscURBQTREOztJQVJoRCwwQ0FBc0I7O0lBQUUsNENBQTJCOztJQUFFLDRDQUErQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IERyYWdFdmVudEludGVyZmFjZSwgRHJhZ0V2ZW50VHlwZSB9IGZyb20gJy4uL2ludGVyZmFjZXMvZHJhZy1ldmVudC5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgRHJhZ0FuZERyb3BFdmVudEJ1c1NlcnZpY2UgfSBmcm9tICcuL2RyYWctYW5kLWRyb3AtZXZlbnQtYnVzLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRHJhZ0V2ZW50TGlzdGVuZXJTZXJ2aWNlPFQ+IHtcbiAgcHJpdmF0ZSBkcmFnZ2FibGVFbDogYW55O1xuXG4gIC8vIGNvbnRhaW5zIHRoZSBzdGFydGluZyBldmVudHMgc3VjaCBhcyBtb3VzZWRvd24gYW5kIHRvdWNoc3RhcnRcbiAgcHJpdmF0ZSBsaXN0ZW5lcnM6ICgoKSA9PiB2b2lkKVtdO1xuICAvLyBjb250YWlucyB0aGUgbmVzdGVkIGV2ZW50cyB0aGF0IGhhcHBlbnMgYWZ0ZXIvaW5zaWRlIHRoZSBzdGFydGluZyBldmVudHNcbiAgLy8gc3VjaCBhcyBzZWxlY3RzdGFydCwgbW91c2Vtb3ZlL3RvdWNobW92ZSwgbW91c2V1cC90b3VjaGVuZFxuICBwcml2YXRlIG5lc3RlZExpc3RlbmVyczogKCgpID0+IHZvaWQpW107XG5cbiAgcHJpdmF0ZSBkcmFnU3RhcnQ6IFN1YmplY3Q8RHJhZ0V2ZW50SW50ZXJmYWNlPFQ+PiA9IG5ldyBTdWJqZWN0PERyYWdFdmVudEludGVyZmFjZTxUPj4oKTtcbiAgcHJpdmF0ZSBkcmFnTW92ZTogU3ViamVjdDxEcmFnRXZlbnRJbnRlcmZhY2U8VD4+ID0gbmV3IFN1YmplY3Q8RHJhZ0V2ZW50SW50ZXJmYWNlPFQ+PigpO1xuICBwcml2YXRlIGRyYWdFbmQ6IFN1YmplY3Q8RHJhZ0V2ZW50SW50ZXJmYWNlPFQ+PiA9IG5ldyBTdWJqZWN0PERyYWdFdmVudEludGVyZmFjZTxUPj4oKTtcblxuICBwcml2YXRlIGhhc0RyYWdTdGFydGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgZ2V0IGRyYWdTdGFydGVkKCk6IE9ic2VydmFibGU8RHJhZ0V2ZW50SW50ZXJmYWNlPFQ+PiB7XG4gICAgcmV0dXJuIHRoaXMuZHJhZ1N0YXJ0LmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgZ2V0IGRyYWdNb3ZlZCgpOiBPYnNlcnZhYmxlPERyYWdFdmVudEludGVyZmFjZTxUPj4ge1xuICAgIHJldHVybiB0aGlzLmRyYWdNb3ZlLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgZ2V0IGRyYWdFbmRlZCgpOiBPYnNlcnZhYmxlPERyYWdFdmVudEludGVyZmFjZTxUPj4ge1xuICAgIHJldHVybiB0aGlzLmRyYWdFbmQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG5nWm9uZTogTmdab25lLCBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHByaXZhdGUgZXZlbnRCdXM6IERyYWdBbmREcm9wRXZlbnRCdXNTZXJ2aWNlPFQ+KSB7fVxuXG4gIC8vIERyYWdnYWJsZSBjb21wb25lbnQgc2V0cyB0aGVzZSBwcm9wZXJ0aWVzOlxuICBwdWJsaWMgZHJhZ0RhdGFUcmFuc2Zlcj86IFQ7XG4gIHB1YmxpYyBncm91cD86IHN0cmluZyB8IHN0cmluZ1tdO1xuXG4gIC8vIERyYWdnYWJsZUdob3N0IGNvbXBvbmVudCBzZXRzIHRoZXNlIHByb3BlcnRpZXM6XG4gIHB1YmxpYyBnaG9zdEVsZW1lbnQ/OiBhbnk7XG4gIHB1YmxpYyBkcm9wUG9pbnRQb3NpdGlvbj86IHsgcGFnZVg6IG51bWJlcjsgcGFnZVk6IG51bWJlciB9O1xuXG4gIHB1YmxpYyBhdHRhY2hEcmFnTGlzdGVuZXJzKGRyYWdnYWJsZUVsOiBOb2RlKSB7XG4gICAgdGhpcy5kcmFnZ2FibGVFbCA9IGRyYWdnYWJsZUVsO1xuICAgIHRoaXMubGlzdGVuZXJzID0gW1xuICAgICAgdGhpcy5jdXN0b21EcmFnRXZlbnQodGhpcy5kcmFnZ2FibGVFbCwgJ21vdXNlZG93bicsICdtb3VzZW1vdmUnLCAnbW91c2V1cCcpLFxuICAgICAgdGhpcy5jdXN0b21EcmFnRXZlbnQodGhpcy5kcmFnZ2FibGVFbCwgJ3RvdWNoc3RhcnQnLCAndG91Y2htb3ZlJywgJ3RvdWNoZW5kJyksXG4gICAgXTtcbiAgfVxuXG4gIHB1YmxpYyBkZXRhY2hEcmFnTGlzdGVuZXJzKCkge1xuICAgIGlmICh0aGlzLmxpc3RlbmVycykge1xuICAgICAgdGhpcy5saXN0ZW5lcnMubWFwKGV2ZW50ID0+IGV2ZW50KCkpO1xuICAgIH1cblxuICAgIC8vIEluIG1vc3QgY2FzZXMsIG9uY2UgdXNlcnMgc3RhcnQgZHJhZ2dpbmcgd2l0aCBtb3VzZWRvd24vdG91Y2hzdGFydCBldmVudHMsXG4gICAgLy8gdGhleSB3aWxsIGVuZCBkcmFnZ2luZyBhdCBvbmUgcG9pbnQgd2l0aCBtb3VzZXVwL3RvdWNoZW5kLlxuICAgIC8vIEhvd2V2ZXIsIHRoZXJlIG1pZ2h0IGJlIGEgZmV3IGNhc2VzIHdoZXJlIG1vdXNlZG93bi90b3VjaHN0YXJ0IGV2ZW50cyBnZXQgcmVnaXN0ZXJlZCxcbiAgICAvLyBidXQgdGhlIGRyYWdnYWJsZSBlbGVtZW50IGdldHMgcmVtb3ZlZCBiZWZvcmUgdXNlciBlbmRzIGRyYWdnaW5nLlxuICAgIC8vIEluIHRoYXQgY2FzZSwgd2UgbmVlZCB0byByZW1vdmUgdGhlIGF0dGFjaGVkIGxpc3RlbmVycyB0aGF0IGhhcHBlbmVkIGR1cmluZyB0aGUgbW91c2Vkb3duL3RvdWNoc3RhcnQgZXZlbnRzLlxuICAgIGlmICh0aGlzLm5lc3RlZExpc3RlbmVycykge1xuICAgICAgdGhpcy5uZXN0ZWRMaXN0ZW5lcnMubWFwKGV2ZW50ID0+IGV2ZW50KCkpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY3VzdG9tRHJhZ0V2ZW50KGVsZW1lbnQ6IE5vZGUsIHN0YXJ0T25FdmVudDogc3RyaW5nLCBtb3ZlT25FdmVudDogc3RyaW5nLCBlbmRPbkV2ZW50OiBzdHJpbmcpOiAoKSA9PiB2b2lkIHtcbiAgICByZXR1cm4gdGhpcy5yZW5kZXJlci5saXN0ZW4oZWxlbWVudCwgc3RhcnRPbkV2ZW50LCAoKSA9PiB7XG4gICAgICAvLyBJbml0aWFsaXplIG5lc3RlZCBsaXN0ZW5lcnMnIHByb3BlcnR5IHdpdGggYSBuZXcgZW1wdHkgYXJyYXk7XG4gICAgICB0aGlzLm5lc3RlZExpc3RlbmVycyA9IFtdO1xuXG4gICAgICAvLyBUaGlzIGlzIG5lZWRlZCB0byBkaXNhYmxlIHNlbGVjdGlvbiBkdXJpbmcgZHJhZ2dpbmcgKGVzcGVjaWFsbHkgaW4gRURHRS9JRTExKS5cbiAgICAgIHRoaXMubmVzdGVkTGlzdGVuZXJzLnB1c2goXG4gICAgICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKCdkb2N1bWVudCcsICdzZWxlY3RzdGFydCcsIChzZWxlY3RFdmVudDogRXZlbnQpID0+IHtcbiAgICAgICAgICBzZWxlY3RFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIHNlbGVjdEV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgICB9KVxuICAgICAgKTtcblxuICAgICAgLy8gTGlzdGVuIHRvIG1vdXNlbW92ZS90b3VjaG1vdmUgZXZlbnRzIG91dHNpZGUgb2YgYW5ndWxhciB6b25lLlxuICAgICAgdGhpcy5uZXN0ZWRMaXN0ZW5lcnMucHVzaChcbiAgICAgICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgIHJldHVybiB0aGlzLnJlbmRlcmVyLmxpc3RlbignZG9jdW1lbnQnLCBtb3ZlT25FdmVudCwgKG1vdmVFdmVudDogTW91c2VFdmVudCB8IFRvdWNoRXZlbnQpID0+IHtcbiAgICAgICAgICAgIC8vIEV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpIGlzIG5lZWRlZCBoZXJlIHRvIHByZXZlbnQgbmVzdGVkIGRyYWdnYWJsZXMgZnJvbSBnZXR0aW5nIGRyYWdnZWRcbiAgICAgICAgICAgIC8vIGFsdG9nZXRoZXIuIFdlIHNob3VsZG4ndCB1c2UgRXZlbnQuc3RvcFByb3BhZ2F0aW9uKCkgaGVyZSBhcyB3ZSBhcmUgbGlzdGVuaW5nIHRvIHRoZSBldmVudHNcbiAgICAgICAgICAgIC8vIG9uIHRoZSBnbG9iYWwgZWxlbWVudCBsZXZlbC5cblxuICAgICAgICAgICAgLy8gV2l0aCBFdmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKSwgaXQgcmVnaXN0ZXJzIHRoZSBldmVudHMgc2VudCBmcm9tIHRoZSBpbm5lciBtb3N0IGRyYWdnYWJsZVxuICAgICAgICAgICAgLy8gZmlyc3QuIFRoZW4gaW1tZWRpYXRlbHkgYWZ0ZXIgdGhhdCwgaXQgc3RvcHMgbGlzdGVuaW5nIHRvIHRoZSBzYW1lIHR5cGUgb2YgZXZlbnRzIG9uIHRoZSBzYW1lXG4gICAgICAgICAgICAvLyBlbGVtZW50LiBTbyB0aGlzIHdpbGwgaGVscCB1cyB0byBub3QgcmVnaXN0ZXIgdGhlIHNhbWUgZXZlbnRzIHRoYXQgd291bGQgY29tZSBmcm9tIHRoZSBwYXJlbnRcbiAgICAgICAgICAgIC8vIGxldmVsIGRyYWdnYWJsZXMgZXZlbnR1YWxseS5cblxuICAgICAgICAgICAgbW92ZUV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMuaGFzRHJhZ1N0YXJ0ZWQpIHtcbiAgICAgICAgICAgICAgdGhpcy5oYXNEcmFnU3RhcnRlZCA9IHRydWU7XG4gICAgICAgICAgICAgIC8vIEZpcmUgXCJkcmFnc3RhcnRcIlxuICAgICAgICAgICAgICB0aGlzLmJyb2FkY2FzdChtb3ZlRXZlbnQsIERyYWdFdmVudFR5cGUuRFJBR19TVEFSVCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyBGaXJlIFwiZHJhZ21vdmVcIlxuICAgICAgICAgICAgICB0aGlzLmJyb2FkY2FzdChtb3ZlRXZlbnQsIERyYWdFdmVudFR5cGUuRFJBR19NT1ZFKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICAgIC8vIExpc3RlbiB0byBtb3VzZXVwL3RvdWNoZW5kIGV2ZW50cy5cbiAgICAgIHRoaXMubmVzdGVkTGlzdGVuZXJzLnB1c2goXG4gICAgICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKCdkb2N1bWVudCcsIGVuZE9uRXZlbnQsIChlbmRFdmVudDogTW91c2VFdmVudCB8IFRvdWNoRXZlbnQpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5oYXNEcmFnU3RhcnRlZCkge1xuICAgICAgICAgICAgLy8gRmlyZSBcImRyYWdlbmRcIiBvbmx5IGlmIGRyYWdzdGFydCBpcyByZWdpc3RlcmVkXG4gICAgICAgICAgICB0aGlzLmhhc0RyYWdTdGFydGVkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmJyb2FkY2FzdChlbmRFdmVudCwgRHJhZ0V2ZW50VHlwZS5EUkFHX0VORCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gV2UgbXVzdCByZW1vdmUgdGhlIHRoZSBuZXN0ZWQgbGlzdGVuZXJzIGV2ZXJ5IHRpbWUgZHJhZyBjb21wbGV0ZXMuXG4gICAgICAgICAgaWYgKHRoaXMubmVzdGVkTGlzdGVuZXJzKSB7XG4gICAgICAgICAgICB0aGlzLm5lc3RlZExpc3RlbmVycy5tYXAoZXZlbnQgPT4gZXZlbnQoKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgYnJvYWRjYXN0KGV2ZW50OiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCwgZXZlbnRUeXBlOiBEcmFnRXZlbnRUeXBlKTogdm9pZCB7XG4gICAgY29uc3QgZHJhZ0V2ZW50OiBEcmFnRXZlbnRJbnRlcmZhY2U8VD4gPSB0aGlzLmdlbmVyYXRlRHJhZ0V2ZW50KGV2ZW50LCBldmVudFR5cGUpO1xuXG4gICAgc3dpdGNoIChkcmFnRXZlbnQudHlwZSkge1xuICAgICAgY2FzZSBEcmFnRXZlbnRUeXBlLkRSQUdfU1RBUlQ6XG4gICAgICAgIHRoaXMuZHJhZ1N0YXJ0Lm5leHQoZHJhZ0V2ZW50KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIERyYWdFdmVudFR5cGUuRFJBR19NT1ZFOlxuICAgICAgICB0aGlzLmRyYWdNb3ZlLm5leHQoZHJhZ0V2ZW50KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIERyYWdFdmVudFR5cGUuRFJBR19FTkQ6XG4gICAgICAgIHRoaXMuZHJhZ0VuZC5uZXh0KGRyYWdFdmVudCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgLy8gVGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzIGFyZSBzZXQgYWZ0ZXIgdGhleSBhcmUgYnJvYWRjYXN0ZWQgdG8gdGhlIERyYWdnYWJsZUdob3N0IGNvbXBvbmVudC5cbiAgICBkcmFnRXZlbnQuZ2hvc3RFbGVtZW50ID0gdGhpcy5naG9zdEVsZW1lbnQ7XG4gICAgZHJhZ0V2ZW50LmRyb3BQb2ludFBvc2l0aW9uID0gdGhpcy5kcm9wUG9pbnRQb3NpdGlvbjtcblxuICAgIHRoaXMuZXZlbnRCdXMuYnJvYWRjYXN0KGRyYWdFdmVudCk7XG4gIH1cblxuICBwcml2YXRlIGdlbmVyYXRlRHJhZ0V2ZW50KGV2ZW50OiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCwgZXZlbnRUeXBlOiBEcmFnRXZlbnRUeXBlKTogRHJhZ0V2ZW50SW50ZXJmYWNlPFQ+IHtcbiAgICBsZXQgbmF0aXZlRXZlbnQ6IGFueTtcblxuICAgIGlmICgoPFRvdWNoRXZlbnQ+ZXZlbnQpLmhhc093blByb3BlcnR5KCdjaGFuZ2VkVG91Y2hlcycpKSB7XG4gICAgICBuYXRpdmVFdmVudCA9ICg8VG91Y2hFdmVudD5ldmVudCkuY2hhbmdlZFRvdWNoZXNbMF07XG4gICAgfSBlbHNlIHtcbiAgICAgIG5hdGl2ZUV2ZW50ID0gZXZlbnQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IGV2ZW50VHlwZSxcbiAgICAgIGRyYWdQb3NpdGlvbjogeyBwYWdlWDogbmF0aXZlRXZlbnQucGFnZVgsIHBhZ2VZOiBuYXRpdmVFdmVudC5wYWdlWSB9LFxuICAgICAgZ3JvdXA6IHRoaXMuZ3JvdXAsXG4gICAgICBkcmFnRGF0YVRyYW5zZmVyOiB0aGlzLmRyYWdEYXRhVHJhbnNmZXIsXG4gICAgICBnaG9zdEVsZW1lbnQ6IHRoaXMuZ2hvc3RFbGVtZW50LFxuICAgIH07XG4gIH1cbn1cbiJdfQ==