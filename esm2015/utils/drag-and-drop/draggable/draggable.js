/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
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
export class ClrDraggable {
    /**
     * @param {?} el
     * @param {?} dragEventListener
     * @param {?} dragHandleRegistrar
     * @param {?} viewContainerRef
     * @param {?} cfr
     * @param {?} injector
     * @param {?} draggableSnapshot
     * @param {?} globalDragMode
     */
    constructor(el, dragEventListener, dragHandleRegistrar, viewContainerRef, cfr, injector, draggableSnapshot, globalDragMode) {
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
    /**
     * @param {?} value
     * @return {?}
     */
    set dataTransfer(value) {
        this.dragEventListener.dragDataTransfer = value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set group(value) {
        this.dragEventListener.group = value;
    }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    createDefaultGhost(event) {
        this.draggableSnapshot.capture(this.draggableEl, event);
        // NOTE: The default ghost element will appear
        // next to the clrDraggable in the DOM as a sibling element.
        this.viewContainerRef.createComponent(this.componentFactory, 0, this.injector, [
            [this.draggableEl.cloneNode(true)],
        ]);
    }
    /**
     * @private
     * @return {?}
     */
    destroyDefaultGhost() {
        this.viewContainerRef.clear();
        this.draggableSnapshot.discard();
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.dragHandleRegistrar.defaultHandleEl = this.draggableEl;
        this.subscriptions.push(this.dragEventListener.dragStarted.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            this.globalDragMode.enter();
            this.dragOn = true;
            if (!this.customGhost) {
                this.createDefaultGhost(event);
            }
            this.dragStartEmitter.emit(new ClrDragEvent(event));
        })));
        this.subscriptions.push(this.dragEventListener.dragMoved.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            this.dragMoveEmitter.emit(new ClrDragEvent(event));
        })));
        this.subscriptions.push(this.dragEventListener.dragEnded.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            this.globalDragMode.exit();
            this.dragOn = false;
            if (!this.customGhost) {
                this.destroyDefaultGhost();
            }
            this.dragEndEmitter.emit(new ClrDragEvent(event));
        })));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        (sub) => sub.unsubscribe()));
        this.dragEventListener.detachDragListeners();
    }
}
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
ClrDraggable.ctorParameters = () => [
    { type: ElementRef },
    { type: DragEventListenerService },
    { type: DragHandleRegistrarService },
    { type: ViewContainerRef },
    { type: ComponentFactoryResolver },
    { type: Injector },
    { type: DraggableSnapshotService },
    { type: GlobalDragModeService }
];
ClrDraggable.propDecorators = {
    customGhost: [{ type: ContentChild, args: [ClrIfDragged,] }],
    dataTransfer: [{ type: Input, args: ['clrDraggable',] }],
    group: [{ type: Input, args: ['clrGroup',] }],
    dragStartEmitter: [{ type: Output, args: ['clrDragStart',] }],
    dragMoveEmitter: [{ type: Output, args: ['clrDragMove',] }],
    dragEndEmitter: [{ type: Output, args: ['clrDragEnd',] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZ2dhYmxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsidXRpbHMvZHJhZy1hbmQtZHJvcC9kcmFnZ2FibGUvZHJhZ2dhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtBLE9BQU8sRUFHTCx3QkFBd0IsRUFDeEIsWUFBWSxFQUNaLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFFBQVEsRUFFUixNQUFNLEVBQ04sZ0JBQWdCLEdBQ2pCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHdEMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzNELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDdkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU3QyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUNwRixPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUN4RixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNuRixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQzs7OztBQWE5RSxNQUFNLE9BQU8sWUFBWTs7Ozs7Ozs7Ozs7SUFNdkIsWUFDVSxFQUFjLEVBQ2QsaUJBQThDLEVBQzlDLG1CQUFrRCxFQUNsRCxnQkFBa0MsRUFDbEMsR0FBNkIsRUFDN0IsUUFBa0IsRUFDbEIsaUJBQThDLEVBQzlDLGNBQXFDO1FBUHJDLE9BQUUsR0FBRixFQUFFLENBQVk7UUFDZCxzQkFBaUIsR0FBakIsaUJBQWlCLENBQTZCO1FBQzlDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBK0I7UUFDbEQscUJB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RSw4QkFBK0I7O0lBZ0IvQixtQ0FBeUQ7O0lBMEJ6RCx3Q0FBNkY7O0lBQzdGLHVDQUEyRjs7SUFDM0Ysc0NBQXlGOzs7OztJQXpDdkYsMEJBQXNCOzs7OztJQUN0Qix5Q0FBc0Q7Ozs7O0lBQ3RELDJDQUEwRDs7Ozs7SUFDMUQsd0NBQTBDOzs7OztJQUMxQywyQkFBcUM7Ozs7O0lBQ3JDLGdDQUEwQjs7Ozs7SUFDMUIseUNBQXNEOzs7OztJQUN0RCxzQ0FBNkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBDb21wb25lbnRGYWN0b3J5LFxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gIENvbnRlbnRDaGlsZCxcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEluamVjdG9yLFxuICBPbkRlc3Ryb3ksXG4gIE91dHB1dCxcbiAgVmlld0NvbnRhaW5lclJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IERvbUFkYXB0ZXIgfSBmcm9tICcuLi8uLi9kb20tYWRhcHRlci9kb20tYWRhcHRlcic7XG5pbXBvcnQgeyBDbHJEcmFnRXZlbnQgfSBmcm9tICcuLi9kcmFnLWV2ZW50JztcbmltcG9ydCB7IENsckRyYWdnYWJsZUdob3N0IH0gZnJvbSAnLi4vZHJhZ2dhYmxlLWdob3N0JztcbmltcG9ydCB7IENscklmRHJhZ2dlZCB9IGZyb20gJy4uL2lmLWRyYWdnZWQnO1xuaW1wb3J0IHsgRHJhZ0V2ZW50SW50ZXJmYWNlIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9kcmFnLWV2ZW50LmludGVyZmFjZSc7XG5pbXBvcnQgeyBEcmFnRXZlbnRMaXN0ZW5lclNlcnZpY2UgfSBmcm9tICcuLi9wcm92aWRlcnMvZHJhZy1ldmVudC1saXN0ZW5lci5zZXJ2aWNlJztcbmltcG9ydCB7IERyYWdIYW5kbGVSZWdpc3RyYXJTZXJ2aWNlIH0gZnJvbSAnLi4vcHJvdmlkZXJzL2RyYWctaGFuZGxlLXJlZ2lzdHJhci5zZXJ2aWNlJztcbmltcG9ydCB7IERyYWdnYWJsZVNuYXBzaG90U2VydmljZSB9IGZyb20gJy4uL3Byb3ZpZGVycy9kcmFnZ2FibGUtc25hcHNob3Quc2VydmljZSc7XG5pbXBvcnQgeyBHbG9iYWxEcmFnTW9kZVNlcnZpY2UgfSBmcm9tICcuLi9wcm92aWRlcnMvZ2xvYmFsLWRyYWctbW9kZS5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2NsckRyYWdnYWJsZV0nLFxuICBwcm92aWRlcnM6IFtcbiAgICBEcmFnRXZlbnRMaXN0ZW5lclNlcnZpY2UsXG4gICAgRHJhZ0hhbmRsZVJlZ2lzdHJhclNlcnZpY2UsXG4gICAgRHJhZ2dhYmxlU25hcHNob3RTZXJ2aWNlLFxuICAgIEdsb2JhbERyYWdNb2RlU2VydmljZSxcbiAgICBEb21BZGFwdGVyLFxuICBdLFxuICBob3N0OiB7ICdbY2xhc3MuZHJhZ2dhYmxlXSc6ICd0cnVlJywgJ1tjbGFzcy5iZWluZy1kcmFnZ2VkXSc6ICdkcmFnT24nIH0sXG59KVxuZXhwb3J0IGNsYXNzIENsckRyYWdnYWJsZTxUPiBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgZHJhZ2dhYmxlRWw6IGFueTtcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuICBwcml2YXRlIGNvbXBvbmVudEZhY3Rvcnk6IENvbXBvbmVudEZhY3Rvcnk8Q2xyRHJhZ2dhYmxlR2hvc3Q8VD4+O1xuICBwdWJsaWMgZHJhZ09uOiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIGRyYWdFdmVudExpc3RlbmVyOiBEcmFnRXZlbnRMaXN0ZW5lclNlcnZpY2U8VD4sXG4gICAgcHJpdmF0ZSBkcmFnSGFuZGxlUmVnaXN0cmFyOiBEcmFnSGFuZGxlUmVnaXN0cmFyU2VydmljZTxUPixcbiAgICBwcml2YXRlIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgcHJpdmF0ZSBjZnI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvcixcbiAgICBwcml2YXRlIGRyYWdnYWJsZVNuYXBzaG90OiBEcmFnZ2FibGVTbmFwc2hvdFNlcnZpY2U8VD4sXG4gICAgcHJpdmF0ZSBnbG9iYWxEcmFnTW9kZTogR2xvYmFsRHJhZ01vZGVTZXJ2aWNlXG4gICkge1xuICAgIHRoaXMuZHJhZ2dhYmxlRWwgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQ7XG4gICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gdGhpcy5jZnIucmVzb2x2ZUNvbXBvbmVudEZhY3Rvcnk8Q2xyRHJhZ2dhYmxlR2hvc3Q8VD4+KENsckRyYWdnYWJsZUdob3N0KTtcbiAgfVxuXG4gIEBDb250ZW50Q2hpbGQoQ2xySWZEcmFnZ2VkKSBjdXN0b21HaG9zdDogQ2xySWZEcmFnZ2VkPFQ+O1xuXG4gIEBJbnB1dCgnY2xyRHJhZ2dhYmxlJylcbiAgc2V0IGRhdGFUcmFuc2Zlcih2YWx1ZTogVCkge1xuICAgIHRoaXMuZHJhZ0V2ZW50TGlzdGVuZXIuZHJhZ0RhdGFUcmFuc2ZlciA9IHZhbHVlO1xuICB9XG5cbiAgQElucHV0KCdjbHJHcm91cCcpXG4gIHNldCBncm91cCh2YWx1ZTogc3RyaW5nIHwgc3RyaW5nW10pIHtcbiAgICB0aGlzLmRyYWdFdmVudExpc3RlbmVyLmdyb3VwID0gdmFsdWU7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZURlZmF1bHRHaG9zdChldmVudDogRHJhZ0V2ZW50SW50ZXJmYWNlPFQ+KSB7XG4gICAgdGhpcy5kcmFnZ2FibGVTbmFwc2hvdC5jYXB0dXJlKHRoaXMuZHJhZ2dhYmxlRWwsIGV2ZW50KTtcbiAgICAvLyBOT1RFOiBUaGUgZGVmYXVsdCBnaG9zdCBlbGVtZW50IHdpbGwgYXBwZWFyXG4gICAgLy8gbmV4dCB0byB0aGUgY2xyRHJhZ2dhYmxlIGluIHRoZSBET00gYXMgYSBzaWJsaW5nIGVsZW1lbnQuXG4gICAgdGhpcy52aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUNvbXBvbmVudCh0aGlzLmNvbXBvbmVudEZhY3RvcnksIDAsIHRoaXMuaW5qZWN0b3IsIFtcbiAgICAgIFt0aGlzLmRyYWdnYWJsZUVsLmNsb25lTm9kZSh0cnVlKV0sXG4gICAgXSk7XG4gIH1cblxuICBwcml2YXRlIGRlc3Ryb3lEZWZhdWx0R2hvc3QoKSB7XG4gICAgdGhpcy52aWV3Q29udGFpbmVyUmVmLmNsZWFyKCk7XG4gICAgdGhpcy5kcmFnZ2FibGVTbmFwc2hvdC5kaXNjYXJkKCk7XG4gIH1cblxuICBAT3V0cHV0KCdjbHJEcmFnU3RhcnQnKSBkcmFnU3RhcnRFbWl0dGVyOiBFdmVudEVtaXR0ZXI8Q2xyRHJhZ0V2ZW50PFQ+PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgnY2xyRHJhZ01vdmUnKSBkcmFnTW92ZUVtaXR0ZXI6IEV2ZW50RW1pdHRlcjxDbHJEcmFnRXZlbnQ8VD4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCdjbHJEcmFnRW5kJykgZHJhZ0VuZEVtaXR0ZXI6IEV2ZW50RW1pdHRlcjxDbHJEcmFnRXZlbnQ8VD4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICB0aGlzLmRyYWdIYW5kbGVSZWdpc3RyYXIuZGVmYXVsdEhhbmRsZUVsID0gdGhpcy5kcmFnZ2FibGVFbDtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5kcmFnRXZlbnRMaXN0ZW5lci5kcmFnU3RhcnRlZC5zdWJzY3JpYmUoKGV2ZW50OiBEcmFnRXZlbnRJbnRlcmZhY2U8VD4pID0+IHtcbiAgICAgICAgdGhpcy5nbG9iYWxEcmFnTW9kZS5lbnRlcigpO1xuICAgICAgICB0aGlzLmRyYWdPbiA9IHRydWU7XG4gICAgICAgIGlmICghdGhpcy5jdXN0b21HaG9zdCkge1xuICAgICAgICAgIHRoaXMuY3JlYXRlRGVmYXVsdEdob3N0KGV2ZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZHJhZ1N0YXJ0RW1pdHRlci5lbWl0KG5ldyBDbHJEcmFnRXZlbnQoZXZlbnQpKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMuZHJhZ0V2ZW50TGlzdGVuZXIuZHJhZ01vdmVkLnN1YnNjcmliZSgoZXZlbnQ6IERyYWdFdmVudEludGVyZmFjZTxUPikgPT4ge1xuICAgICAgICB0aGlzLmRyYWdNb3ZlRW1pdHRlci5lbWl0KG5ldyBDbHJEcmFnRXZlbnQoZXZlbnQpKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMuZHJhZ0V2ZW50TGlzdGVuZXIuZHJhZ0VuZGVkLnN1YnNjcmliZSgoZXZlbnQ6IERyYWdFdmVudEludGVyZmFjZTxUPikgPT4ge1xuICAgICAgICB0aGlzLmdsb2JhbERyYWdNb2RlLmV4aXQoKTtcbiAgICAgICAgdGhpcy5kcmFnT24gPSBmYWxzZTtcbiAgICAgICAgaWYgKCF0aGlzLmN1c3RvbUdob3N0KSB7XG4gICAgICAgICAgdGhpcy5kZXN0cm95RGVmYXVsdEdob3N0KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kcmFnRW5kRW1pdHRlci5lbWl0KG5ldyBDbHJEcmFnRXZlbnQoZXZlbnQpKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKChzdWI6IFN1YnNjcmlwdGlvbikgPT4gc3ViLnVuc3Vic2NyaWJlKCkpO1xuICAgIHRoaXMuZHJhZ0V2ZW50TGlzdGVuZXIuZGV0YWNoRHJhZ0xpc3RlbmVycygpO1xuICB9XG59XG4iXX0=