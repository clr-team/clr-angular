/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Injectable, Renderer2 } from '@angular/core';
import { DragEventListenerService } from './drag-event-listener.service';
// This provider registers the drag handle element.
// When it registers a element as a drag handle, it attaches that element to the listeners from ClrDragEventListener.
// Also, it adds the "drag-handle" css class to the registered element through Renderer.
/**
 * @template T
 */
var DragHandleRegistrarService = /** @class */ (function () {
    function DragHandleRegistrarService(dragEventListener, renderer) {
        this.dragEventListener = dragEventListener;
        this.renderer = renderer;
    }
    Object.defineProperty(DragHandleRegistrarService.prototype, "defaultHandleEl", {
        get: /**
         * @return {?}
         */
        function () {
            return this._defaultHandleEl;
        },
        set: /**
         * @param {?} el
         * @return {?}
         */
        function (el) {
            this._defaultHandleEl = el; // defaultHandleEl will be usually the clrDraggable element.
            // If the customHandleEl has been registered,
            // don't make the defaultHandleEl the drag handle yet until the customHandleEl is unregistered.
            if (!this._customHandleEl) {
                this.makeElementHandle(this._defaultHandleEl);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @param {?} el
     * @return {?}
     */
    DragHandleRegistrarService.prototype.makeElementHandle = /**
     * @private
     * @param {?} el
     * @return {?}
     */
    function (el) {
        if (this._defaultHandleEl && this._defaultHandleEl !== el) {
            // Before making an element the custom handle element,
            // we should remove the existing drag-handle class from the draggable element.
            this.renderer.removeClass(this._defaultHandleEl, 'drag-handle');
        }
        this.dragEventListener.attachDragListeners(el);
        this.renderer.addClass(el, 'drag-handle');
    };
    Object.defineProperty(DragHandleRegistrarService.prototype, "customHandleEl", {
        get: /**
         * @return {?}
         */
        function () {
            return this._customHandleEl;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} el
     * @return {?}
     */
    DragHandleRegistrarService.prototype.registerCustomHandle = /**
     * @param {?} el
     * @return {?}
     */
    function (el) {
        this.dragEventListener.detachDragListeners(); // removes the existing listeners
        this._customHandleEl = el;
        this.makeElementHandle(this._customHandleEl);
    };
    /**
     * @return {?}
     */
    DragHandleRegistrarService.prototype.unregisterCustomHandle = /**
     * @return {?}
     */
    function () {
        this.dragEventListener.detachDragListeners(); // removes the existing listeners
        this.renderer.removeClass(this._customHandleEl, 'drag-handle');
        delete this._customHandleEl;
        // if default handle is set, make that handle
        if (this._defaultHandleEl) {
            this.makeElementHandle(this._defaultHandleEl);
        }
    };
    DragHandleRegistrarService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    DragHandleRegistrarService.ctorParameters = function () { return [
        { type: DragEventListenerService },
        { type: Renderer2 }
    ]; };
    return DragHandleRegistrarService;
}());
export { DragHandleRegistrarService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    DragHandleRegistrarService.prototype._customHandleEl;
    /**
     * @type {?}
     * @private
     */
    DragHandleRegistrarService.prototype._defaultHandleEl;
    /**
     * @type {?}
     * @private
     */
    DragHandleRegistrarService.prototype.dragEventListener;
    /**
     * @type {?}
     * @private
     */
    DragHandleRegistrarService.prototype.renderer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZy1oYW5kbGUtcmVnaXN0cmFyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJ1dGlscy9kcmFnLWFuZC1kcm9wL3Byb3ZpZGVycy9kcmFnLWhhbmRsZS1yZWdpc3RyYXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFLQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV0RCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQzs7Ozs7OztBQUt6RTtJQW1CRSxvQ0FBb0IsaUJBQThDLEVBQVUsUUFBbUI7UUFBM0Usc0JBQWlCLEdBQWpCLGlCQUFpQixDQUE2QjtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVc7SUFBRyxDQUFDO0lBZG5HLHNCQUFJLHVEQUFlOzs7O1FBQW5CO1lBQ0UsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7UUFDL0IsQ0FBQzs7Ozs7UUFFRCxVQUFvQixFQUFRO1lBQzFCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUMsQ0FBQyw0REFBNEQ7WUFFeEYsNkNBQTZDO1lBQzdDLCtGQUErRjtZQUMvRixJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRTtnQkFDekIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2FBQy9DO1FBQ0gsQ0FBQzs7O09BVkE7Ozs7OztJQWNPLHNEQUFpQjs7Ozs7SUFBekIsVUFBMEIsRUFBUTtRQUNoQyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEtBQUssRUFBRSxFQUFFO1lBQ3pELHNEQUFzRDtZQUN0RCw4RUFBOEU7WUFDOUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLGFBQWEsQ0FBQyxDQUFDO1NBQ2pFO1FBQ0QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLG1CQUFtQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQsc0JBQUksc0RBQWM7Ozs7UUFBbEI7WUFDRSxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7UUFDOUIsQ0FBQzs7O09BQUE7Ozs7O0lBRU0seURBQW9COzs7O0lBQTNCLFVBQTRCLEVBQVE7UUFDbEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLG1CQUFtQixFQUFFLENBQUMsQ0FBQyxpQ0FBaUM7UUFDL0UsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUMvQyxDQUFDOzs7O0lBRU0sMkRBQXNCOzs7SUFBN0I7UUFDRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDLGlDQUFpQztRQUMvRSxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQy9ELE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztRQUM1Qiw2Q0FBNkM7UUFDN0MsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDekIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1NBQy9DO0lBQ0gsQ0FBQzs7Z0JBakRGLFVBQVU7Ozs7Z0JBTEYsd0JBQXdCO2dCQUZaLFNBQVM7O0lBeUQ5QixpQ0FBQztDQUFBLEFBbERELElBa0RDO1NBakRZLDBCQUEwQjs7Ozs7O0lBQ3JDLHFEQUE2Qjs7Ozs7SUFDN0Isc0RBQThCOzs7OztJQWdCbEIsdURBQXNEOzs7OztJQUFFLDhDQUEyQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IEluamVjdGFibGUsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBEcmFnRXZlbnRMaXN0ZW5lclNlcnZpY2UgfSBmcm9tICcuL2RyYWctZXZlbnQtbGlzdGVuZXIuc2VydmljZSc7XG5cbi8vIFRoaXMgcHJvdmlkZXIgcmVnaXN0ZXJzIHRoZSBkcmFnIGhhbmRsZSBlbGVtZW50LlxuLy8gV2hlbiBpdCByZWdpc3RlcnMgYSBlbGVtZW50IGFzIGEgZHJhZyBoYW5kbGUsIGl0IGF0dGFjaGVzIHRoYXQgZWxlbWVudCB0byB0aGUgbGlzdGVuZXJzIGZyb20gQ2xyRHJhZ0V2ZW50TGlzdGVuZXIuXG4vLyBBbHNvLCBpdCBhZGRzIHRoZSBcImRyYWctaGFuZGxlXCIgY3NzIGNsYXNzIHRvIHRoZSByZWdpc3RlcmVkIGVsZW1lbnQgdGhyb3VnaCBSZW5kZXJlci5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEcmFnSGFuZGxlUmVnaXN0cmFyU2VydmljZTxUPiB7XG4gIHByaXZhdGUgX2N1c3RvbUhhbmRsZUVsOiBhbnk7XG4gIHByaXZhdGUgX2RlZmF1bHRIYW5kbGVFbDogYW55O1xuXG4gIGdldCBkZWZhdWx0SGFuZGxlRWwoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RlZmF1bHRIYW5kbGVFbDtcbiAgfVxuXG4gIHNldCBkZWZhdWx0SGFuZGxlRWwoZWw6IE5vZGUpIHtcbiAgICB0aGlzLl9kZWZhdWx0SGFuZGxlRWwgPSBlbDsgLy8gZGVmYXVsdEhhbmRsZUVsIHdpbGwgYmUgdXN1YWxseSB0aGUgY2xyRHJhZ2dhYmxlIGVsZW1lbnQuXG5cbiAgICAvLyBJZiB0aGUgY3VzdG9tSGFuZGxlRWwgaGFzIGJlZW4gcmVnaXN0ZXJlZCxcbiAgICAvLyBkb24ndCBtYWtlIHRoZSBkZWZhdWx0SGFuZGxlRWwgdGhlIGRyYWcgaGFuZGxlIHlldCB1bnRpbCB0aGUgY3VzdG9tSGFuZGxlRWwgaXMgdW5yZWdpc3RlcmVkLlxuICAgIGlmICghdGhpcy5fY3VzdG9tSGFuZGxlRWwpIHtcbiAgICAgIHRoaXMubWFrZUVsZW1lbnRIYW5kbGUodGhpcy5fZGVmYXVsdEhhbmRsZUVsKTtcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRyYWdFdmVudExpc3RlbmVyOiBEcmFnRXZlbnRMaXN0ZW5lclNlcnZpY2U8VD4sIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMikge31cblxuICBwcml2YXRlIG1ha2VFbGVtZW50SGFuZGxlKGVsOiBOb2RlKSB7XG4gICAgaWYgKHRoaXMuX2RlZmF1bHRIYW5kbGVFbCAmJiB0aGlzLl9kZWZhdWx0SGFuZGxlRWwgIT09IGVsKSB7XG4gICAgICAvLyBCZWZvcmUgbWFraW5nIGFuIGVsZW1lbnQgdGhlIGN1c3RvbSBoYW5kbGUgZWxlbWVudCxcbiAgICAgIC8vIHdlIHNob3VsZCByZW1vdmUgdGhlIGV4aXN0aW5nIGRyYWctaGFuZGxlIGNsYXNzIGZyb20gdGhlIGRyYWdnYWJsZSBlbGVtZW50LlxuICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLl9kZWZhdWx0SGFuZGxlRWwsICdkcmFnLWhhbmRsZScpO1xuICAgIH1cbiAgICB0aGlzLmRyYWdFdmVudExpc3RlbmVyLmF0dGFjaERyYWdMaXN0ZW5lcnMoZWwpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoZWwsICdkcmFnLWhhbmRsZScpO1xuICB9XG5cbiAgZ2V0IGN1c3RvbUhhbmRsZUVsKCkge1xuICAgIHJldHVybiB0aGlzLl9jdXN0b21IYW5kbGVFbDtcbiAgfVxuXG4gIHB1YmxpYyByZWdpc3RlckN1c3RvbUhhbmRsZShlbDogTm9kZSkge1xuICAgIHRoaXMuZHJhZ0V2ZW50TGlzdGVuZXIuZGV0YWNoRHJhZ0xpc3RlbmVycygpOyAvLyByZW1vdmVzIHRoZSBleGlzdGluZyBsaXN0ZW5lcnNcbiAgICB0aGlzLl9jdXN0b21IYW5kbGVFbCA9IGVsO1xuICAgIHRoaXMubWFrZUVsZW1lbnRIYW5kbGUodGhpcy5fY3VzdG9tSGFuZGxlRWwpO1xuICB9XG5cbiAgcHVibGljIHVucmVnaXN0ZXJDdXN0b21IYW5kbGUoKSB7XG4gICAgdGhpcy5kcmFnRXZlbnRMaXN0ZW5lci5kZXRhY2hEcmFnTGlzdGVuZXJzKCk7IC8vIHJlbW92ZXMgdGhlIGV4aXN0aW5nIGxpc3RlbmVyc1xuICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5fY3VzdG9tSGFuZGxlRWwsICdkcmFnLWhhbmRsZScpO1xuICAgIGRlbGV0ZSB0aGlzLl9jdXN0b21IYW5kbGVFbDtcbiAgICAvLyBpZiBkZWZhdWx0IGhhbmRsZSBpcyBzZXQsIG1ha2UgdGhhdCBoYW5kbGVcbiAgICBpZiAodGhpcy5fZGVmYXVsdEhhbmRsZUVsKSB7XG4gICAgICB0aGlzLm1ha2VFbGVtZW50SGFuZGxlKHRoaXMuX2RlZmF1bHRIYW5kbGVFbCk7XG4gICAgfVxuICB9XG59XG4iXX0=