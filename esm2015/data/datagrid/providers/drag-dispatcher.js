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
export class DragDispatcher {
    /**
     * @param {?} _ngZone
     * @param {?} _renderer
     */
    constructor(_ngZone, _renderer) {
        this._ngZone = _ngZone;
        this._renderer = _renderer;
        this._onDragStart = new Subject();
        this._onDragMove = new Subject();
        this._onDragEnd = new Subject();
    }
    /**
     * @return {?}
     */
    get onDragStart() {
        return this._onDragStart;
    }
    /**
     * @return {?}
     */
    get onDragMove() {
        return this._onDragMove;
    }
    /**
     * @return {?}
     */
    get onDragEnd() {
        return this._onDragEnd;
    }
    /**
     * @return {?}
     */
    addDragListener() {
        /** @type {?} */
        const handleEl = this.handleRef.nativeElement;
        this._listeners = [
            this.customDragEvent(handleEl, 'mousedown', 'mousemove', 'mouseup'),
            this.customDragEvent(handleEl, 'touchstart', 'touchmove', 'touchend'),
        ];
    }
    /**
     * @param {?} element
     * @param {?} startOnEvent
     * @param {?} moveOnEvent
     * @param {?} endOnEvent
     * @return {?}
     */
    customDragEvent(element, startOnEvent, moveOnEvent, endOnEvent) {
        /** @type {?} */
        let dragMoveListener;
        /** @type {?} */
        let dragEndListener;
        return this._renderer.listen(element, startOnEvent, (startEvent) => {
            this.notifyDragStart(startEvent);
            dragMoveListener = this._ngZone.runOutsideAngular(() => {
                return this._renderer.listen('document', moveOnEvent, (moveEvent) => {
                    this.notifyDragMove(moveEvent);
                });
            });
            dragEndListener = this._renderer.listen('document', endOnEvent, (endEvent) => {
                // Unsubscribing from mouseMoveListener
                dragMoveListener();
                this.notifyDragEnd(endEvent);
                // Unsubscribing from itself
                dragEndListener();
            });
        });
    }
    /**
     * @param {?} event
     * @return {?}
     */
    notifyDragStart(event) {
        return this._onDragStart.next(event);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    notifyDragMove(event) {
        return this._onDragMove.next(event);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    notifyDragEnd(event) {
        return this._onDragEnd.next(event);
    }
    /**
     * @return {?}
     */
    destroy() {
        if (this._listeners) {
            this._listeners.map(event => event());
        }
    }
}
DragDispatcher.decorators = [
    { type: Injectable }
];
/** @nocollapse */
DragDispatcher.ctorParameters = () => [
    { type: NgZone },
    { type: Renderer2 }
];
if (false) {
    /** @type {?} */
    DragDispatcher.prototype._listeners;
    /** @type {?} */
    DragDispatcher.prototype.handleRef;
    /** @type {?} */
    DragDispatcher.prototype.handleTrackerRef;
    /** @type {?} */
    DragDispatcher.prototype._onDragStart;
    /** @type {?} */
    DragDispatcher.prototype._onDragMove;
    /** @type {?} */
    DragDispatcher.prototype._onDragEnd;
    /** @type {?} */
    DragDispatcher.prototype._ngZone;
    /** @type {?} */
    DragDispatcher.prototype._renderer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZy1kaXNwYXRjaGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9wcm92aWRlcnMvZHJhZy1kaXNwYXRjaGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQU1BLE9BQU8sRUFBYyxVQUFVLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUxRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRy9CLE1BQU0sT0FBTyxjQUFjOzs7OztJQXlCekIsWUFBb0IsT0FBZSxFQUFVLFNBQW9CO1FBQTdDLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBaEJ6RCxpQkFBWSxHQUFpQixJQUFJLE9BQU8sRUFBTyxDQUFDO1FBQ2hELGdCQUFXLEdBQWlCLElBQUksT0FBTyxFQUFPLENBQUM7UUFDL0MsZUFBVSxHQUFpQixJQUFJLE9BQU8sRUFBTyxDQUFDO0lBY2MsQ0FBQzs7OztJQVpyRSxJQUFJLFdBQVc7UUFDYixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDM0IsQ0FBQzs7OztJQUVELElBQUksVUFBVTtRQUNaLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUMxQixDQUFDOzs7O0lBRUQsSUFBSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3pCLENBQUM7Ozs7SUFJRCxlQUFlOztjQUNQLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWE7UUFDN0MsSUFBSSxDQUFDLFVBQVUsR0FBRztZQUNoQixJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLFNBQVMsQ0FBQztZQUNuRSxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQztTQUN0RSxDQUFDO0lBQ0osQ0FBQzs7Ozs7Ozs7SUFFRCxlQUFlLENBQUMsT0FBb0IsRUFBRSxZQUFvQixFQUFFLFdBQW1CLEVBQUUsVUFBa0I7O1lBQzdGLGdCQUE0Qjs7WUFDNUIsZUFBMkI7UUFFL0IsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFLENBQUMsVUFBZSxFQUFFLEVBQUU7WUFDdEUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUVqQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRTtnQkFDckQsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsV0FBVyxFQUFFLENBQUMsU0FBYyxFQUFFLEVBQUU7b0JBQ3ZFLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ2pDLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFFSCxlQUFlLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLFVBQVUsRUFBRSxDQUFDLFFBQWEsRUFBRSxFQUFFO2dCQUNoRix1Q0FBdUM7Z0JBQ3ZDLGdCQUFnQixFQUFFLENBQUM7Z0JBQ25CLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQzdCLDRCQUE0QjtnQkFDNUIsZUFBZSxFQUFFLENBQUM7WUFDcEIsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Ozs7O0lBRUQsZUFBZSxDQUFDLEtBQVU7UUFDeEIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2QyxDQUFDOzs7OztJQUVELGNBQWMsQ0FBQyxLQUFVO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEMsQ0FBQzs7Ozs7SUFFRCxhQUFhLENBQUMsS0FBVTtRQUN0QixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JDLENBQUM7Ozs7SUFFRCxPQUFPO1FBQ0wsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztTQUN2QztJQUNILENBQUM7OztZQTNFRixVQUFVOzs7O1lBSnNCLE1BQU07WUFBRSxTQUFTOzs7O0lBTWhELG9DQUErQjs7SUFHL0IsbUNBQXNCOztJQUd0QiwwQ0FBNkI7O0lBRTdCLHNDQUF3RDs7SUFDeEQscUNBQXVEOztJQUN2RCxvQ0FBc0Q7O0lBYzFDLGlDQUF1Qjs7SUFBRSxtQ0FBNEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IEVsZW1lbnRSZWYsIEluamVjdGFibGUsIE5nWm9uZSwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEcmFnRGlzcGF0Y2hlciB7XG4gIHByaXZhdGUgX2xpc3RlbmVyczogRnVuY3Rpb25bXTtcblxuICAvLyBXaWxsIGJlIGxpc3RlbmluZyB0byBEcmFnIGV2ZW50cyBvbiB0aGUgZm9sbG93aW5nIGVsZW1lbnRcbiAgaGFuZGxlUmVmOiBFbGVtZW50UmVmO1xuXG4gIC8vIEV4dHJhIGVsZW1lbnQgdG8gYmUgdXNlZCBmb3IgdHJhY2tpbmcgZHJhZyBtb3ZlbWVudHMuXG4gIGhhbmRsZVRyYWNrZXJSZWY6IEVsZW1lbnRSZWY7XG5cbiAgcHJpdmF0ZSBfb25EcmFnU3RhcnQ6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0PGFueT4oKTtcbiAgcHJpdmF0ZSBfb25EcmFnTW92ZTogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3Q8YW55PigpO1xuICBwcml2YXRlIF9vbkRyYWdFbmQ6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0PGFueT4oKTtcblxuICBnZXQgb25EcmFnU3RhcnQoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5fb25EcmFnU3RhcnQ7XG4gIH1cblxuICBnZXQgb25EcmFnTW92ZSgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLl9vbkRyYWdNb3ZlO1xuICB9XG5cbiAgZ2V0IG9uRHJhZ0VuZCgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLl9vbkRyYWdFbmQ7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9uZ1pvbmU6IE5nWm9uZSwgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMikge31cblxuICBhZGREcmFnTGlzdGVuZXIoKSB7XG4gICAgY29uc3QgaGFuZGxlRWwgPSB0aGlzLmhhbmRsZVJlZi5uYXRpdmVFbGVtZW50O1xuICAgIHRoaXMuX2xpc3RlbmVycyA9IFtcbiAgICAgIHRoaXMuY3VzdG9tRHJhZ0V2ZW50KGhhbmRsZUVsLCAnbW91c2Vkb3duJywgJ21vdXNlbW92ZScsICdtb3VzZXVwJyksXG4gICAgICB0aGlzLmN1c3RvbURyYWdFdmVudChoYW5kbGVFbCwgJ3RvdWNoc3RhcnQnLCAndG91Y2htb3ZlJywgJ3RvdWNoZW5kJyksXG4gICAgXTtcbiAgfVxuXG4gIGN1c3RvbURyYWdFdmVudChlbGVtZW50OiBIVE1MRWxlbWVudCwgc3RhcnRPbkV2ZW50OiBzdHJpbmcsIG1vdmVPbkV2ZW50OiBzdHJpbmcsIGVuZE9uRXZlbnQ6IHN0cmluZyk6IEZ1bmN0aW9uIHtcbiAgICBsZXQgZHJhZ01vdmVMaXN0ZW5lcjogKCkgPT4gdm9pZDtcbiAgICBsZXQgZHJhZ0VuZExpc3RlbmVyOiAoKSA9PiB2b2lkO1xuXG4gICAgcmV0dXJuIHRoaXMuX3JlbmRlcmVyLmxpc3RlbihlbGVtZW50LCBzdGFydE9uRXZlbnQsIChzdGFydEV2ZW50OiBhbnkpID0+IHtcbiAgICAgIHRoaXMubm90aWZ5RHJhZ1N0YXJ0KHN0YXJ0RXZlbnQpO1xuXG4gICAgICBkcmFnTW92ZUxpc3RlbmVyID0gdGhpcy5fbmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlbmRlcmVyLmxpc3RlbignZG9jdW1lbnQnLCBtb3ZlT25FdmVudCwgKG1vdmVFdmVudDogYW55KSA9PiB7XG4gICAgICAgICAgdGhpcy5ub3RpZnlEcmFnTW92ZShtb3ZlRXZlbnQpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBkcmFnRW5kTGlzdGVuZXIgPSB0aGlzLl9yZW5kZXJlci5saXN0ZW4oJ2RvY3VtZW50JywgZW5kT25FdmVudCwgKGVuZEV2ZW50OiBhbnkpID0+IHtcbiAgICAgICAgLy8gVW5zdWJzY3JpYmluZyBmcm9tIG1vdXNlTW92ZUxpc3RlbmVyXG4gICAgICAgIGRyYWdNb3ZlTGlzdGVuZXIoKTtcbiAgICAgICAgdGhpcy5ub3RpZnlEcmFnRW5kKGVuZEV2ZW50KTtcbiAgICAgICAgLy8gVW5zdWJzY3JpYmluZyBmcm9tIGl0c2VsZlxuICAgICAgICBkcmFnRW5kTGlzdGVuZXIoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgbm90aWZ5RHJhZ1N0YXJ0KGV2ZW50OiBhbnkpIHtcbiAgICByZXR1cm4gdGhpcy5fb25EcmFnU3RhcnQubmV4dChldmVudCk7XG4gIH1cblxuICBub3RpZnlEcmFnTW92ZShldmVudDogYW55KSB7XG4gICAgcmV0dXJuIHRoaXMuX29uRHJhZ01vdmUubmV4dChldmVudCk7XG4gIH1cblxuICBub3RpZnlEcmFnRW5kKGV2ZW50OiBhbnkpIHtcbiAgICByZXR1cm4gdGhpcy5fb25EcmFnRW5kLm5leHQoZXZlbnQpO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5fbGlzdGVuZXJzKSB7XG4gICAgICB0aGlzLl9saXN0ZW5lcnMubWFwKGV2ZW50ID0+IGV2ZW50KCkpO1xuICAgIH1cbiAgfVxufVxuIl19