/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { ComponentFactoryResolver, ContentChild, Directive, ElementRef, EventEmitter, Injector, Output, ViewContainerRef, } from '@angular/core';
import { Input } from '@angular/core';
import { DomAdapter } from '../../dom-adapter/dom-adapter';
import { ClrDragEvent } from '../drag-event';
import { ClrDraggableGhost } from '../draggable-ghost';
import { ClrIfDragged } from '../if-dragged';
import { DragEventListenerService } from '../providers/drag-event-listener.service';
import { DragHandleRegistrarService } from '../providers/drag-handle-registrar.service';
import { DraggableSnapshotService } from '../providers/draggable-snapshot.service';
import { GlobalDragModeService } from '../providers/global-drag-mode.service';
/**
 * @template T
 */
var ClrDraggable = /** @class */ (function () {
    function ClrDraggable(el, dragEventListener, dragHandleRegistrar, viewContainerRef, cfr, injector, draggableSnapshot, globalDragMode) {
        this.el = el;
        this.dragEventListener = dragEventListener;
        this.dragHandleRegistrar = dragHandleRegistrar;
        this.viewContainerRef = viewContainerRef;
        this.cfr = cfr;
        this.injector = injector;
        this.draggableSnapshot = draggableSnapshot;
        this.globalDragMode = globalDragMode;
        this.subscriptions = [];
        this.dragOn = false;
        this.dragStartEmitter = new EventEmitter();
        this.dragMoveEmitter = new EventEmitter();
        this.dragEndEmitter = new EventEmitter();
        this.draggableEl = this.el.nativeElement;
        this.componentFactory = this.cfr.resolveComponentFactory(ClrDraggableGhost);
    }
    Object.defineProperty(ClrDraggable.prototype, "dataTransfer", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.dragEventListener.dragDataTransfer = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDraggable.prototype, "group", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.dragEventListener.group = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    ClrDraggable.prototype.createDefaultGhost = /**
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.draggableSnapshot.capture(this.draggableEl, event);
        // NOTE: The default ghost element will appear
        // next to the clrDraggable in the DOM as a sibling element.
        this.viewContainerRef.createComponent(this.componentFactory, 0, this.injector, [
            [this.draggableEl.cloneNode(true)],
        ]);
    };
    /**
     * @private
     * @return {?}
     */
    ClrDraggable.prototype.destroyDefaultGhost = /**
     * @private
     * @return {?}
     */
    function () {
        this.viewContainerRef.clear();
        this.draggableSnapshot.discard();
    };
    /**
     * @return {?}
     */
    ClrDraggable.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.dragHandleRegistrar.defaultHandleEl = this.draggableEl;
        this.subscriptions.push(this.dragEventListener.dragStarted.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            _this.globalDragMode.enter();
            _this.dragOn = true;
            if (!_this.customGhost) {
                _this.createDefaultGhost(event);
            }
            _this.dragStartEmitter.emit(new ClrDragEvent(event));
        })));
        this.subscriptions.push(this.dragEventListener.dragMoved.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            _this.dragMoveEmitter.emit(new ClrDragEvent(event));
        })));
        this.subscriptions.push(this.dragEventListener.dragEnded.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            _this.globalDragMode.exit();
            _this.dragOn = false;
            if (!_this.customGhost) {
                _this.destroyDefaultGhost();
            }
            _this.dragEndEmitter.emit(new ClrDragEvent(event));
        })));
    };
    /**
     * @return {?}
     */
    ClrDraggable.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        function (sub) { return sub.unsubscribe(); }));
        this.dragEventListener.detachDragListeners();
    };
    ClrDraggable.decorators = [
        { type: Directive, args: [{
                    selector: '[clrDraggable]',
                    providers: [
                        DragEventListenerService,
                        DragHandleRegistrarService,
                        DraggableSnapshotService,
                        GlobalDragModeService,
                        DomAdapter,
                    ],
                    host: { '[class.draggable]': 'true', '[class.being-dragged]': 'dragOn' },
                },] }
    ];
    /** @nocollapse */
    ClrDraggable.ctorParameters = function () { return [
        { type: ElementRef },
        { type: DragEventListenerService },
        { type: DragHandleRegistrarService },
        { type: ViewContainerRef },
        { type: ComponentFactoryResolver },
        { type: Injector },
        { type: DraggableSnapshotService },
        { type: GlobalDragModeService }
    ]; };
    ClrDraggable.propDecorators = {
        customGhost: [{ type: ContentChild, args: [ClrIfDragged, { static: false },] }],
        dataTransfer: [{ type: Input, args: ['clrDraggable',] }],
        group: [{ type: Input, args: ['clrGroup',] }],
        dragStartEmitter: [{ type: Output, args: ['clrDragStart',] }],
        dragMoveEmitter: [{ type: Output, args: ['clrDragMove',] }],
        dragEndEmitter: [{ type: Output, args: ['clrDragEnd',] }]
    };
    return ClrDraggable;
}());
export { ClrDraggable };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ClrDraggable.prototype.draggableEl;
    /**
     * @type {?}
     * @private
     */
    ClrDraggable.prototype.subscriptions;
    /**
     * @type {?}
     * @private
     */
    ClrDraggable.prototype.componentFactory;
    /** @type {?} */
    ClrDraggable.prototype.dragOn;
    /** @type {?} */
    ClrDraggable.prototype.customGhost;
    /** @type {?} */
    ClrDraggable.prototype.dragStartEmitter;
    /** @type {?} */
    ClrDraggable.prototype.dragMoveEmitter;
    /** @type {?} */
    ClrDraggable.prototype.dragEndEmitter;
    /**
     * @type {?}
     * @private
     */
    ClrDraggable.prototype.el;
    /**
     * @type {?}
     * @private
     */
    ClrDraggable.prototype.dragEventListener;
    /**
     * @type {?}
     * @private
     */
    ClrDraggable.prototype.dragHandleRegistrar;
    /**
     * @type {?}
     * @private
     */
    ClrDraggable.prototype.viewContainerRef;
    /**
     * @type {?}
     * @private
     */
    ClrDraggable.prototype.cfr;
    /**
     * @type {?}
     * @private
     */
    ClrDraggable.prototype.injector;
    /**
     * @type {?}
     * @private
     */
    ClrDraggable.prototype.draggableSnapshot;
    /**
     * @type {?}
     * @private
     */
    ClrDraggable.prototype.globalDragMode;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZ2dhYmxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsidXRpbHMvZHJhZy1hbmQtZHJvcC9kcmFnZ2FibGUvZHJhZ2dhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtBLE9BQU8sRUFHTCx3QkFBd0IsRUFDeEIsWUFBWSxFQUNaLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFFBQVEsRUFFUixNQUFNLEVBQ04sZ0JBQWdCLEdBQ2pCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHdEMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzNELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDdkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU3QyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUNwRixPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUN4RixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNuRixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQzs7OztBQUU5RTtJQWlCRSxzQkFDVSxFQUFjLEVBQ2QsaUJBQThDLEVBQzlDLG1CQUFrRCxFQUNsRCxnQkFBa0MsRUFDbEMsR0FBNkIsRUFDN0IsUUFBa0IsRUFDbEIsaUJBQThDLEVBQzlDLGNBQXFDO1FBUHJDLE9BQUUsR0FBRixFQUFFLENBQVk7UUFDZCxzQkFBaUIsR0FBakIsaUJBQWlCLENBQTZCO1FBQzlDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBK0I7UUFDbEQscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtR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U0FBQyxZQUFZOztJQXFDdEIsbUJBQUM7Q0FBQSxBQWpHRCxJQWlHQztTQXRGWSxZQUFZOzs7Ozs7SUFDdkIsbUNBQXlCOzs7OztJQUN6QixxQ0FBMkM7Ozs7O0lBQzNDLHdDQUFpRTs7SUFDakUsOEJBQStCOztJQWdCL0IsbUNBQzZCOztJQTBCN0Isd0NBQTZGOztJQUM3Rix1Q0FBMkY7O0lBQzNGLHNDQUF5Rjs7Ozs7SUExQ3ZGLDBCQUFzQjs7Ozs7SUFDdEIseUNBQXNEOzs7OztJQUN0RCwyQ0FBMEQ7Ozs7O0lBQzFELHdDQUEwQzs7Ozs7SUFDMUMsMkJBQXFDOzs7OztJQUNyQyxnQ0FBMEI7Ozs7O0lBQzFCLHlDQUFzRDs7Ozs7SUFDdEQsc0NBQTZDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQ29tcG9uZW50RmFjdG9yeSxcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICBDb250ZW50Q2hpbGQsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbmplY3RvcixcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIFZpZXdDb250YWluZXJSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBEb21BZGFwdGVyIH0gZnJvbSAnLi4vLi4vZG9tLWFkYXB0ZXIvZG9tLWFkYXB0ZXInO1xuaW1wb3J0IHsgQ2xyRHJhZ0V2ZW50IH0gZnJvbSAnLi4vZHJhZy1ldmVudCc7XG5pbXBvcnQgeyBDbHJEcmFnZ2FibGVHaG9zdCB9IGZyb20gJy4uL2RyYWdnYWJsZS1naG9zdCc7XG5pbXBvcnQgeyBDbHJJZkRyYWdnZWQgfSBmcm9tICcuLi9pZi1kcmFnZ2VkJztcbmltcG9ydCB7IERyYWdFdmVudEludGVyZmFjZSB9IGZyb20gJy4uL2ludGVyZmFjZXMvZHJhZy1ldmVudC5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgRHJhZ0V2ZW50TGlzdGVuZXJTZXJ2aWNlIH0gZnJvbSAnLi4vcHJvdmlkZXJzL2RyYWctZXZlbnQtbGlzdGVuZXIuc2VydmljZSc7XG5pbXBvcnQgeyBEcmFnSGFuZGxlUmVnaXN0cmFyU2VydmljZSB9IGZyb20gJy4uL3Byb3ZpZGVycy9kcmFnLWhhbmRsZS1yZWdpc3RyYXIuc2VydmljZSc7XG5pbXBvcnQgeyBEcmFnZ2FibGVTbmFwc2hvdFNlcnZpY2UgfSBmcm9tICcuLi9wcm92aWRlcnMvZHJhZ2dhYmxlLXNuYXBzaG90LnNlcnZpY2UnO1xuaW1wb3J0IHsgR2xvYmFsRHJhZ01vZGVTZXJ2aWNlIH0gZnJvbSAnLi4vcHJvdmlkZXJzL2dsb2JhbC1kcmFnLW1vZGUuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tjbHJEcmFnZ2FibGVdJyxcbiAgcHJvdmlkZXJzOiBbXG4gICAgRHJhZ0V2ZW50TGlzdGVuZXJTZXJ2aWNlLFxuICAgIERyYWdIYW5kbGVSZWdpc3RyYXJTZXJ2aWNlLFxuICAgIERyYWdnYWJsZVNuYXBzaG90U2VydmljZSxcbiAgICBHbG9iYWxEcmFnTW9kZVNlcnZpY2UsXG4gICAgRG9tQWRhcHRlcixcbiAgXSxcbiAgaG9zdDogeyAnW2NsYXNzLmRyYWdnYWJsZV0nOiAndHJ1ZScsICdbY2xhc3MuYmVpbmctZHJhZ2dlZF0nOiAnZHJhZ09uJyB9LFxufSlcbmV4cG9ydCBjbGFzcyBDbHJEcmFnZ2FibGU8VD4gaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuICBwcml2YXRlIGRyYWdnYWJsZUVsOiBhbnk7XG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcbiAgcHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5OiBDb21wb25lbnRGYWN0b3J5PENsckRyYWdnYWJsZUdob3N0PFQ+PjtcbiAgcHVibGljIGRyYWdPbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBkcmFnRXZlbnRMaXN0ZW5lcjogRHJhZ0V2ZW50TGlzdGVuZXJTZXJ2aWNlPFQ+LFxuICAgIHByaXZhdGUgZHJhZ0hhbmRsZVJlZ2lzdHJhcjogRHJhZ0hhbmRsZVJlZ2lzdHJhclNlcnZpY2U8VD4sXG4gICAgcHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIHByaXZhdGUgY2ZyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgcHJpdmF0ZSBkcmFnZ2FibGVTbmFwc2hvdDogRHJhZ2dhYmxlU25hcHNob3RTZXJ2aWNlPFQ+LFxuICAgIHByaXZhdGUgZ2xvYmFsRHJhZ01vZGU6IEdsb2JhbERyYWdNb2RlU2VydmljZVxuICApIHtcbiAgICB0aGlzLmRyYWdnYWJsZUVsID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50O1xuICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IHRoaXMuY2ZyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5PENsckRyYWdnYWJsZUdob3N0PFQ+PihDbHJEcmFnZ2FibGVHaG9zdCk7XG4gIH1cblxuICBAQ29udGVudENoaWxkKENscklmRHJhZ2dlZCwgeyBzdGF0aWM6IGZhbHNlIH0pXG4gIGN1c3RvbUdob3N0OiBDbHJJZkRyYWdnZWQ8VD47XG5cbiAgQElucHV0KCdjbHJEcmFnZ2FibGUnKVxuICBzZXQgZGF0YVRyYW5zZmVyKHZhbHVlOiBUKSB7XG4gICAgdGhpcy5kcmFnRXZlbnRMaXN0ZW5lci5kcmFnRGF0YVRyYW5zZmVyID0gdmFsdWU7XG4gIH1cblxuICBASW5wdXQoJ2Nsckdyb3VwJylcbiAgc2V0IGdyb3VwKHZhbHVlOiBzdHJpbmcgfCBzdHJpbmdbXSkge1xuICAgIHRoaXMuZHJhZ0V2ZW50TGlzdGVuZXIuZ3JvdXAgPSB2YWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlRGVmYXVsdEdob3N0KGV2ZW50OiBEcmFnRXZlbnRJbnRlcmZhY2U8VD4pIHtcbiAgICB0aGlzLmRyYWdnYWJsZVNuYXBzaG90LmNhcHR1cmUodGhpcy5kcmFnZ2FibGVFbCwgZXZlbnQpO1xuICAgIC8vIE5PVEU6IFRoZSBkZWZhdWx0IGdob3N0IGVsZW1lbnQgd2lsbCBhcHBlYXJcbiAgICAvLyBuZXh0IHRvIHRoZSBjbHJEcmFnZ2FibGUgaW4gdGhlIERPTSBhcyBhIHNpYmxpbmcgZWxlbWVudC5cbiAgICB0aGlzLnZpZXdDb250YWluZXJSZWYuY3JlYXRlQ29tcG9uZW50KHRoaXMuY29tcG9uZW50RmFjdG9yeSwgMCwgdGhpcy5pbmplY3RvciwgW1xuICAgICAgW3RoaXMuZHJhZ2dhYmxlRWwuY2xvbmVOb2RlKHRydWUpXSxcbiAgICBdKTtcbiAgfVxuXG4gIHByaXZhdGUgZGVzdHJveURlZmF1bHRHaG9zdCgpIHtcbiAgICB0aGlzLnZpZXdDb250YWluZXJSZWYuY2xlYXIoKTtcbiAgICB0aGlzLmRyYWdnYWJsZVNuYXBzaG90LmRpc2NhcmQoKTtcbiAgfVxuXG4gIEBPdXRwdXQoJ2NsckRyYWdTdGFydCcpIGRyYWdTdGFydEVtaXR0ZXI6IEV2ZW50RW1pdHRlcjxDbHJEcmFnRXZlbnQ8VD4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCdjbHJEcmFnTW92ZScpIGRyYWdNb3ZlRW1pdHRlcjogRXZlbnRFbWl0dGVyPENsckRyYWdFdmVudDxUPj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoJ2NsckRyYWdFbmQnKSBkcmFnRW5kRW1pdHRlcjogRXZlbnRFbWl0dGVyPENsckRyYWdFdmVudDxUPj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIHRoaXMuZHJhZ0hhbmRsZVJlZ2lzdHJhci5kZWZhdWx0SGFuZGxlRWwgPSB0aGlzLmRyYWdnYWJsZUVsO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLmRyYWdFdmVudExpc3RlbmVyLmRyYWdTdGFydGVkLnN1YnNjcmliZSgoZXZlbnQ6IERyYWdFdmVudEludGVyZmFjZTxUPikgPT4ge1xuICAgICAgICB0aGlzLmdsb2JhbERyYWdNb2RlLmVudGVyKCk7XG4gICAgICAgIHRoaXMuZHJhZ09uID0gdHJ1ZTtcbiAgICAgICAgaWYgKCF0aGlzLmN1c3RvbUdob3N0KSB7XG4gICAgICAgICAgdGhpcy5jcmVhdGVEZWZhdWx0R2hvc3QoZXZlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kcmFnU3RhcnRFbWl0dGVyLmVtaXQobmV3IENsckRyYWdFdmVudChldmVudCkpO1xuICAgICAgfSlcbiAgICApO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5kcmFnRXZlbnRMaXN0ZW5lci5kcmFnTW92ZWQuc3Vic2NyaWJlKChldmVudDogRHJhZ0V2ZW50SW50ZXJmYWNlPFQ+KSA9PiB7XG4gICAgICAgIHRoaXMuZHJhZ01vdmVFbWl0dGVyLmVtaXQobmV3IENsckRyYWdFdmVudChldmVudCkpO1xuICAgICAgfSlcbiAgICApO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5kcmFnRXZlbnRMaXN0ZW5lci5kcmFnRW5kZWQuc3Vic2NyaWJlKChldmVudDogRHJhZ0V2ZW50SW50ZXJmYWNlPFQ+KSA9PiB7XG4gICAgICAgIHRoaXMuZ2xvYmFsRHJhZ01vZGUuZXhpdCgpO1xuICAgICAgICB0aGlzLmRyYWdPbiA9IGZhbHNlO1xuICAgICAgICBpZiAoIXRoaXMuY3VzdG9tR2hvc3QpIHtcbiAgICAgICAgICB0aGlzLmRlc3Ryb3lEZWZhdWx0R2hvc3QoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRyYWdFbmRFbWl0dGVyLmVtaXQobmV3IENsckRyYWdFdmVudChldmVudCkpO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmZvckVhY2goKHN1YjogU3Vic2NyaXB0aW9uKSA9PiBzdWIudW5zdWJzY3JpYmUoKSk7XG4gICAgdGhpcy5kcmFnRXZlbnRMaXN0ZW5lci5kZXRhY2hEcmFnTGlzdGVuZXJzKCk7XG4gIH1cbn1cbiJdfQ==