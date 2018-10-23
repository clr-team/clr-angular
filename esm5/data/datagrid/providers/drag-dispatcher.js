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
var DragDispatcher = /** @class */ (function () {
    function DragDispatcher(_ngZone, _renderer) {
        this._ngZone = _ngZone;
        this._renderer = _renderer;
        this._onDragStart = new Subject();
        this._onDragMove = new Subject();
        this._onDragEnd = new Subject();
    }
    Object.defineProperty(DragDispatcher.prototype, "onDragStart", {
        get: /**
         * @return {?}
         */
        function () {
            return this._onDragStart;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DragDispatcher.prototype, "onDragMove", {
        get: /**
         * @return {?}
         */
        function () {
            return this._onDragMove;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DragDispatcher.prototype, "onDragEnd", {
        get: /**
         * @return {?}
         */
        function () {
            return this._onDragEnd;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DragDispatcher.prototype.addDragListener = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var handleEl = this.handleRef.nativeElement;
        this._listeners = [
            this.customDragEvent(handleEl, 'mousedown', 'mousemove', 'mouseup'),
            this.customDragEvent(handleEl, 'touchstart', 'touchmove', 'touchend'),
        ];
    };
    /**
     * @param {?} element
     * @param {?} startOnEvent
     * @param {?} moveOnEvent
     * @param {?} endOnEvent
     * @return {?}
     */
    DragDispatcher.prototype.customDragEvent = /**
     * @param {?} element
     * @param {?} startOnEvent
     * @param {?} moveOnEvent
     * @param {?} endOnEvent
     * @return {?}
     */
    function (element, startOnEvent, moveOnEvent, endOnEvent) {
        var _this = this;
        /** @type {?} */
        var dragMoveListener;
        /** @type {?} */
        var dragEndListener;
        return this._renderer.listen(element, startOnEvent, function (startEvent) {
            _this.notifyDragStart(startEvent);
            dragMoveListener = _this._ngZone.runOutsideAngular(function () {
                return _this._renderer.listen('document', moveOnEvent, function (moveEvent) {
                    _this.notifyDragMove(moveEvent);
                });
            });
            dragEndListener = _this._renderer.listen('document', endOnEvent, function (endEvent) {
                // Unsubscribing from mouseMoveListener
                dragMoveListener();
                _this.notifyDragEnd(endEvent);
                // Unsubscribing from itself
                dragEndListener();
            });
        });
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DragDispatcher.prototype.notifyDragStart = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        return this._onDragStart.next(event);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DragDispatcher.prototype.notifyDragMove = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        return this._onDragMove.next(event);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DragDispatcher.prototype.notifyDragEnd = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        return this._onDragEnd.next(event);
    };
    /**
     * @return {?}
     */
    DragDispatcher.prototype.destroy = /**
     * @return {?}
     */
    function () {
        if (this._listeners) {
            this._listeners.map(function (event) { return event(); });
        }
    };
    DragDispatcher.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    DragDispatcher.ctorParameters = function () { return [
        { type: NgZone },
        { type: Renderer2 }
    ]; };
    return DragDispatcher;
}());
export { DragDispatcher };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZy1kaXNwYXRjaGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9wcm92aWRlcnMvZHJhZy1kaXNwYXRjaGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQU1BLE9BQU8sRUFBYyxVQUFVLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUxRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRS9CO0lBMEJFLHdCQUFvQixPQUFlLEVBQVUsU0FBb0I7UUFBN0MsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFoQnpELGlCQUFZLEdBQWlCLElBQUksT0FBTyxFQUFPLENBQUM7UUFDaEQsZ0JBQVcsR0FBaUIsSUFBSSxPQUFPLEVBQU8sQ0FBQztRQUMvQyxlQUFVLEdBQWlCLElBQUksT0FBTyxFQUFPLENBQUM7SUFjYyxDQUFDO0lBWnJFLHNCQUFJLHVDQUFXOzs7O1FBQWY7WUFDRSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDM0IsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSxzQ0FBVTs7OztRQUFkO1lBQ0UsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQzFCLENBQUM7OztPQUFBO0lBRUQsc0JBQUkscUNBQVM7Ozs7UUFBYjtZQUNFLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUN6QixDQUFDOzs7T0FBQTs7OztJQUlELHdDQUFlOzs7SUFBZjs7WUFDUSxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhO1FBQzdDLElBQUksQ0FBQyxVQUFVLEdBQUc7WUFDaEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxTQUFTLENBQUM7WUFDbkUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUM7U0FDdEUsQ0FBQztJQUNKLENBQUM7Ozs7Ozs7O0lBRUQsd0NBQWU7Ozs7Ozs7SUFBZixVQUFnQixPQUFvQixFQUFFLFlBQW9CLEVBQUUsV0FBbUIsRUFBRSxVQUFrQjtRQUFuRyxpQkFxQkM7O1lBcEJLLGdCQUE0Qjs7WUFDNUIsZUFBMkI7UUFFL0IsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFLFVBQUMsVUFBZTtZQUNsRSxLQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRWpDLGdCQUFnQixHQUFHLEtBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUM7Z0JBQ2hELE9BQU8sS0FBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLFdBQVcsRUFBRSxVQUFDLFNBQWM7b0JBQ25FLEtBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ2pDLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFFSCxlQUFlLEdBQUcsS0FBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLFVBQVUsRUFBRSxVQUFDLFFBQWE7Z0JBQzVFLHVDQUF1QztnQkFDdkMsZ0JBQWdCLEVBQUUsQ0FBQztnQkFDbkIsS0FBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDN0IsNEJBQTRCO2dCQUM1QixlQUFlLEVBQUUsQ0FBQztZQUNwQixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7SUFFRCx3Q0FBZTs7OztJQUFmLFVBQWdCLEtBQVU7UUFDeEIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2QyxDQUFDOzs7OztJQUVELHVDQUFjOzs7O0lBQWQsVUFBZSxLQUFVO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEMsQ0FBQzs7Ozs7SUFFRCxzQ0FBYTs7OztJQUFiLFVBQWMsS0FBVTtRQUN0QixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JDLENBQUM7Ozs7SUFFRCxnQ0FBTzs7O0lBQVA7UUFDRSxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLEVBQUUsRUFBUCxDQUFPLENBQUMsQ0FBQztTQUN2QztJQUNILENBQUM7O2dCQTNFRixVQUFVOzs7O2dCQUpzQixNQUFNO2dCQUFFLFNBQVM7O0lBZ0ZsRCxxQkFBQztDQUFBLEFBNUVELElBNEVDO1NBM0VZLGNBQWM7OztJQUN6QixvQ0FBK0I7O0lBRy9CLG1DQUFzQjs7SUFHdEIsMENBQTZCOztJQUU3QixzQ0FBd0Q7O0lBQ3hELHFDQUF1RDs7SUFDdkQsb0NBQXNEOztJQWMxQyxpQ0FBdUI7O0lBQUUsbUNBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBFbGVtZW50UmVmLCBJbmplY3RhYmxlLCBOZ1pvbmUsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRHJhZ0Rpc3BhdGNoZXIge1xuICBwcml2YXRlIF9saXN0ZW5lcnM6IEZ1bmN0aW9uW107XG5cbiAgLy8gV2lsbCBiZSBsaXN0ZW5pbmcgdG8gRHJhZyBldmVudHMgb24gdGhlIGZvbGxvd2luZyBlbGVtZW50XG4gIGhhbmRsZVJlZjogRWxlbWVudFJlZjtcblxuICAvLyBFeHRyYSBlbGVtZW50IHRvIGJlIHVzZWQgZm9yIHRyYWNraW5nIGRyYWcgbW92ZW1lbnRzLlxuICBoYW5kbGVUcmFja2VyUmVmOiBFbGVtZW50UmVmO1xuXG4gIHByaXZhdGUgX29uRHJhZ1N0YXJ0OiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdDxhbnk+KCk7XG4gIHByaXZhdGUgX29uRHJhZ01vdmU6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0PGFueT4oKTtcbiAgcHJpdmF0ZSBfb25EcmFnRW5kOiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdDxhbnk+KCk7XG5cbiAgZ2V0IG9uRHJhZ1N0YXJ0KCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuX29uRHJhZ1N0YXJ0O1xuICB9XG5cbiAgZ2V0IG9uRHJhZ01vdmUoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5fb25EcmFnTW92ZTtcbiAgfVxuXG4gIGdldCBvbkRyYWdFbmQoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5fb25EcmFnRW5kO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfbmdab25lOiBOZ1pvbmUsIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIpIHt9XG5cbiAgYWRkRHJhZ0xpc3RlbmVyKCkge1xuICAgIGNvbnN0IGhhbmRsZUVsID0gdGhpcy5oYW5kbGVSZWYubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLl9saXN0ZW5lcnMgPSBbXG4gICAgICB0aGlzLmN1c3RvbURyYWdFdmVudChoYW5kbGVFbCwgJ21vdXNlZG93bicsICdtb3VzZW1vdmUnLCAnbW91c2V1cCcpLFxuICAgICAgdGhpcy5jdXN0b21EcmFnRXZlbnQoaGFuZGxlRWwsICd0b3VjaHN0YXJ0JywgJ3RvdWNobW92ZScsICd0b3VjaGVuZCcpLFxuICAgIF07XG4gIH1cblxuICBjdXN0b21EcmFnRXZlbnQoZWxlbWVudDogSFRNTEVsZW1lbnQsIHN0YXJ0T25FdmVudDogc3RyaW5nLCBtb3ZlT25FdmVudDogc3RyaW5nLCBlbmRPbkV2ZW50OiBzdHJpbmcpOiBGdW5jdGlvbiB7XG4gICAgbGV0IGRyYWdNb3ZlTGlzdGVuZXI6ICgpID0+IHZvaWQ7XG4gICAgbGV0IGRyYWdFbmRMaXN0ZW5lcjogKCkgPT4gdm9pZDtcblxuICAgIHJldHVybiB0aGlzLl9yZW5kZXJlci5saXN0ZW4oZWxlbWVudCwgc3RhcnRPbkV2ZW50LCAoc3RhcnRFdmVudDogYW55KSA9PiB7XG4gICAgICB0aGlzLm5vdGlmeURyYWdTdGFydChzdGFydEV2ZW50KTtcblxuICAgICAgZHJhZ01vdmVMaXN0ZW5lciA9IHRoaXMuX25nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZW5kZXJlci5saXN0ZW4oJ2RvY3VtZW50JywgbW92ZU9uRXZlbnQsIChtb3ZlRXZlbnQ6IGFueSkgPT4ge1xuICAgICAgICAgIHRoaXMubm90aWZ5RHJhZ01vdmUobW92ZUV2ZW50KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgZHJhZ0VuZExpc3RlbmVyID0gdGhpcy5fcmVuZGVyZXIubGlzdGVuKCdkb2N1bWVudCcsIGVuZE9uRXZlbnQsIChlbmRFdmVudDogYW55KSA9PiB7XG4gICAgICAgIC8vIFVuc3Vic2NyaWJpbmcgZnJvbSBtb3VzZU1vdmVMaXN0ZW5lclxuICAgICAgICBkcmFnTW92ZUxpc3RlbmVyKCk7XG4gICAgICAgIHRoaXMubm90aWZ5RHJhZ0VuZChlbmRFdmVudCk7XG4gICAgICAgIC8vIFVuc3Vic2NyaWJpbmcgZnJvbSBpdHNlbGZcbiAgICAgICAgZHJhZ0VuZExpc3RlbmVyKCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIG5vdGlmeURyYWdTdGFydChldmVudDogYW55KSB7XG4gICAgcmV0dXJuIHRoaXMuX29uRHJhZ1N0YXJ0Lm5leHQoZXZlbnQpO1xuICB9XG5cbiAgbm90aWZ5RHJhZ01vdmUoZXZlbnQ6IGFueSkge1xuICAgIHJldHVybiB0aGlzLl9vbkRyYWdNb3ZlLm5leHQoZXZlbnQpO1xuICB9XG5cbiAgbm90aWZ5RHJhZ0VuZChldmVudDogYW55KSB7XG4gICAgcmV0dXJuIHRoaXMuX29uRHJhZ0VuZC5uZXh0KGV2ZW50KTtcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuX2xpc3RlbmVycykge1xuICAgICAgdGhpcy5fbGlzdGVuZXJzLm1hcChldmVudCA9PiBldmVudCgpKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==