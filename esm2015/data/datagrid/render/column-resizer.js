/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive, ElementRef, EventEmitter, Output, Renderer2 } from '@angular/core';
import { DragDispatcher } from '../providers/drag-dispatcher';
import { TableSizeService } from '../providers/table-size.service';
import { DomAdapter } from '../../../utils/dom-adapter/dom-adapter';
import { DatagridRenderOrganizer } from './render-organizer';
export class DatagridColumnResizer {
    /**
     * @param {?} el
     * @param {?} renderer
     * @param {?} organizer
     * @param {?} domAdapter
     * @param {?} dragDispatcher
     * @param {?} table
     */
    constructor(el, renderer, organizer, domAdapter, dragDispatcher, table) {
        this.renderer = renderer;
        this.organizer = organizer;
        this.domAdapter = domAdapter;
        this.dragDispatcher = dragDispatcher;
        this.table = table;
        this.columnResizeBy = 0;
        // relative to pageStartPosition
        this.dragWithinMinWidth = false;
        this.resizeEmitter = new EventEmitter();
        this.subscriptions = [];
        this.columnEl = el.nativeElement;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.dragDispatcher.destroy();
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.handleTrackerEl = this.dragDispatcher.handleTrackerRef.nativeElement;
        this.dragDispatcher.addDragListener();
        this.subscriptions.push(this.dragDispatcher.onDragStart.subscribe(() => this.dragStartHandler()));
        this.subscriptions.push(this.dragDispatcher.onDragMove.subscribe($event => this.dragMoveHandler($event)));
        this.subscriptions.push(this.dragDispatcher.onDragEnd.subscribe(() => this.dragEndHandler()));
    }
    /**
     * @return {?}
     */
    dragStartHandler() {
        if (!this.columnMinWidth) {
            // sets the min width only on the very first drag attempt
            this.columnMinWidth = this.domAdapter.minWidth(this.columnEl);
        }
        this.renderer.setStyle(this.handleTrackerEl, 'display', 'block');
        this.renderer.setStyle(this.handleTrackerEl, 'height', this.table.getColumnDragHeight());
        this.renderer.setStyle(document.body, 'cursor', 'col-resize');
        this.dragDistancePositionX = 0;
        this.columnRectWidth = this.domAdapter.clientRect(this.columnEl).width;
        this.pageStartPositionX = this.domAdapter.clientRect(this.columnEl).right;
    }
    /**
     * @param {?} moveEvent
     * @return {?}
     */
    dragMoveHandler(moveEvent) {
        /** @type {?} */
        const pageMovePosition = moveEvent.pageX || moveEvent.changedTouches[0].pageX;
        this.dragDistancePositionX = this.getPositionWithinMax(pageMovePosition - this.pageStartPositionX);
        this.renderer.setStyle(this.handleTrackerEl, 'right', -1 * this.dragDistancePositionX + 'px');
    }
    /**
     * @return {?}
     */
    dragEndHandler() {
        this.renderer.setStyle(this.handleTrackerEl, 'right', '0px');
        this.renderer.setStyle(this.handleTrackerEl, 'display', 'none');
        this.renderer.setStyle(document.body, 'cursor', 'auto');
        if (this.dragDistancePositionX) {
            this.columnResizeBy = this.dragDistancePositionX;
            this.resizeEmitter.emit(this.columnRectWidth + this.columnResizeBy);
            this.organizer.resize();
        }
    }
    /**
     * @param {?} draggedDistance
     * @return {?}
     */
    getPositionWithinMax(draggedDistance) {
        if (draggedDistance < 0) {
            if (Math.abs(draggedDistance) < this.columnRectWidth - this.columnMinWidth) {
                if (this.dragWithinMinWidth) {
                    this.dragWithinMinWidth = false;
                    this.renderer.removeClass(this.handleTrackerEl, 'exceeded-max');
                }
                return draggedDistance;
            }
            else {
                if (!this.dragWithinMinWidth) {
                    this.dragWithinMinWidth = true;
                    this.renderer.addClass(this.handleTrackerEl, 'exceeded-max');
                }
                return this.columnMinWidth - this.columnRectWidth;
            }
        }
        else {
            if (this.dragWithinMinWidth) {
                this.dragWithinMinWidth = false;
                this.renderer.removeClass(this.handleTrackerEl, 'exceeded-max');
            }
            return draggedDistance;
        }
    }
}
DatagridColumnResizer.decorators = [
    { type: Directive, args: [{ selector: 'clr-dg-column', providers: [DragDispatcher] },] }
];
/** @nocollapse */
DatagridColumnResizer.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: DatagridRenderOrganizer },
    { type: DomAdapter },
    { type: DragDispatcher },
    { type: TableSizeService }
];
DatagridColumnResizer.propDecorators = {
    resizeEmitter: [{ type: Output, args: ['clrDgColumnResize',] }]
};
if (false) {
    /** @type {?} */
    DatagridColumnResizer.prototype.columnEl;
    /** @type {?} */
    DatagridColumnResizer.prototype.columnRectWidth;
    /** @type {?} */
    DatagridColumnResizer.prototype.columnResizeBy;
    /** @type {?} */
    DatagridColumnResizer.prototype.handleTrackerEl;
    /** @type {?} */
    DatagridColumnResizer.prototype.pageStartPositionX;
    /** @type {?} */
    DatagridColumnResizer.prototype.dragDistancePositionX;
    /** @type {?} */
    DatagridColumnResizer.prototype.dragWithinMinWidth;
    /** @type {?} */
    DatagridColumnResizer.prototype.columnMinWidth;
    /** @type {?} */
    DatagridColumnResizer.prototype.resizeEmitter;
    /** @type {?} */
    DatagridColumnResizer.prototype.subscriptions;
    /** @type {?} */
    DatagridColumnResizer.prototype.renderer;
    /** @type {?} */
    DatagridColumnResizer.prototype.organizer;
    /** @type {?} */
    DatagridColumnResizer.prototype.domAdapter;
    /** @type {?} */
    DatagridColumnResizer.prototype.dragDispatcher;
    /** @type {?} */
    DatagridColumnResizer.prototype.table;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLXJlc2l6ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJkYXRhL2RhdGFncmlkL3JlbmRlci9jb2x1bW4tcmVzaXplci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFNQSxPQUFPLEVBQWlCLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFhLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHakgsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzlELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBRW5FLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNwRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUc3RCxNQUFNLE9BQU8scUJBQXFCOzs7Ozs7Ozs7SUFDaEMsWUFDRSxFQUFjLEVBQ04sUUFBbUIsRUFDbkIsU0FBa0MsRUFDbEMsVUFBc0IsRUFDdEIsY0FBOEIsRUFDOUIsS0FBdUI7UUFKdkIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixjQUFTLEdBQVQsU0FBUyxDQUF5QjtRQUNsQyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixVQUFLLEdBQUwsS0FBSyxDQUFrQjtRQU9qQyxtQkFBYyxHQUFXLENBQUMsQ0FBQzs7UUFPM0IsdUJBQWtCLEdBQVksS0FBSyxDQUFDO1FBSVAsa0JBQWEsR0FBeUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUU5RSxrQkFBYSxHQUFtQixFQUFFLENBQUM7UUFsQnpDLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQztJQUNuQyxDQUFDOzs7O0lBbUJELFdBQVc7UUFDVCxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzlCLElBQUks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LENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLGNBQWMsQ0FBQyxDQUFDO2FBQ2pFO1lBRUQsT0FBTyxlQUFlLENBQUM7U0FDeEI7SUFDSCxDQUFDOzs7WUFsR0YsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQUUsQ0FBQyxjQUFjLENBQUMsRUFBRTs7OztZQVRsQyxVQUFVO1lBQW1DLFNBQVM7WUFPaEYsdUJBQXVCO1lBRHZCLFVBQVU7WUFIVixjQUFjO1lBQ2QsZ0JBQWdCOzs7NEJBK0J0QixNQUFNLFNBQUMsbUJBQW1COzs7O0lBYjNCLHlDQUFjOztJQUNkLGdEQUF3Qjs7SUFDeEIsK0NBQTJCOztJQUUzQixnREFBNEI7O0lBRTVCLG1EQUEyQjs7SUFDM0Isc0RBQThCOztJQUU5QixtREFBb0M7O0lBRXBDLCtDQUF1Qjs7SUFFdkIsOENBQXNGOztJQUV0Riw4Q0FBMkM7O0lBeEJ6Qyx5Q0FBMkI7O0lBQzNCLDBDQUEwQzs7SUFDMUMsMkNBQThCOztJQUM5QiwrQ0FBc0M7O0lBQ3RDLHNDQUErQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIE9uRGVzdHJveSwgT3V0cHV0LCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBEcmFnRGlzcGF0Y2hlciB9IGZyb20gJy4uL3Byb3ZpZGVycy9kcmFnLWRpc3BhdGNoZXInO1xuaW1wb3J0IHsgVGFibGVTaXplU2VydmljZSB9IGZyb20gJy4uL3Byb3ZpZGVycy90YWJsZS1zaXplLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBEb21BZGFwdGVyIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvZG9tLWFkYXB0ZXIvZG9tLWFkYXB0ZXInO1xuaW1wb3J0IHsgRGF0YWdyaWRSZW5kZXJPcmdhbml6ZXIgfSBmcm9tICcuL3JlbmRlci1vcmdhbml6ZXInO1xuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdjbHItZGctY29sdW1uJywgcHJvdmlkZXJzOiBbRHJhZ0Rpc3BhdGNoZXJdIH0pXG5leHBvcnQgY2xhc3MgRGF0YWdyaWRDb2x1bW5SZXNpemVyIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgY29uc3RydWN0b3IoXG4gICAgZWw6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgb3JnYW5pemVyOiBEYXRhZ3JpZFJlbmRlck9yZ2FuaXplcixcbiAgICBwcml2YXRlIGRvbUFkYXB0ZXI6IERvbUFkYXB0ZXIsXG4gICAgcHJpdmF0ZSBkcmFnRGlzcGF0Y2hlcjogRHJhZ0Rpc3BhdGNoZXIsXG4gICAgcHJpdmF0ZSB0YWJsZTogVGFibGVTaXplU2VydmljZVxuICApIHtcbiAgICB0aGlzLmNvbHVtbkVsID0gZWwubmF0aXZlRWxlbWVudDtcbiAgfVxuXG4gIGNvbHVtbkVsOiBhbnk7XG4gIGNvbHVtblJlY3RXaWR0aDogbnVtYmVyO1xuICBjb2x1bW5SZXNpemVCeTogbnVtYmVyID0gMDtcblxuICBoYW5kbGVUcmFja2VyRWw6IEVsZW1lbnRSZWY7XG5cbiAgcGFnZVN0YXJ0UG9zaXRpb25YOiBudW1iZXI7XG4gIGRyYWdEaXN0YW5jZVBvc2l0aW9uWDogbnVtYmVyOyAvLyByZWxhdGl2ZSB0byBwYWdlU3RhcnRQb3NpdGlvblxuXG4gIGRyYWdXaXRoaW5NaW5XaWR0aDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGNvbHVtbk1pbldpZHRoOiBudW1iZXI7XG5cbiAgQE91dHB1dCgnY2xyRGdDb2x1bW5SZXNpemUnKSByZXNpemVFbWl0dGVyOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBwcml2YXRlIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5kcmFnRGlzcGF0Y2hlci5kZXN0cm95KCk7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmZvckVhY2goKHN1YjogU3Vic2NyaXB0aW9uKSA9PiBzdWIudW5zdWJzY3JpYmUoKSk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5oYW5kbGVUcmFja2VyRWwgPSB0aGlzLmRyYWdEaXNwYXRjaGVyLmhhbmRsZVRyYWNrZXJSZWYubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLmRyYWdEaXNwYXRjaGVyLmFkZERyYWdMaXN0ZW5lcigpO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKHRoaXMuZHJhZ0Rpc3BhdGNoZXIub25EcmFnU3RhcnQuc3Vic2NyaWJlKCgpID0+IHRoaXMuZHJhZ1N0YXJ0SGFuZGxlcigpKSk7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2godGhpcy5kcmFnRGlzcGF0Y2hlci5vbkRyYWdNb3ZlLnN1YnNjcmliZSgkZXZlbnQgPT4gdGhpcy5kcmFnTW92ZUhhbmRsZXIoJGV2ZW50KSkpO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKHRoaXMuZHJhZ0Rpc3BhdGNoZXIub25EcmFnRW5kLnN1YnNjcmliZSgoKSA9PiB0aGlzLmRyYWdFbmRIYW5kbGVyKCkpKTtcbiAgfVxuXG4gIGRyYWdTdGFydEhhbmRsZXIoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmNvbHVtbk1pbldpZHRoKSB7XG4gICAgICAvLyBzZXRzIHRoZSBtaW4gd2lkdGggb25seSBvbiB0aGUgdmVyeSBmaXJzdCBkcmFnIGF0dGVtcHRcbiAgICAgIHRoaXMuY29sdW1uTWluV2lkdGggPSB0aGlzLmRvbUFkYXB0ZXIubWluV2lkdGgodGhpcy5jb2x1bW5FbCk7XG4gICAgfVxuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5oYW5kbGVUcmFja2VyRWwsICdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmhhbmRsZVRyYWNrZXJFbCwgJ2hlaWdodCcsIHRoaXMudGFibGUuZ2V0Q29sdW1uRHJhZ0hlaWdodCgpKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGRvY3VtZW50LmJvZHksICdjdXJzb3InLCAnY29sLXJlc2l6ZScpO1xuICAgIHRoaXMuZHJhZ0Rpc3RhbmNlUG9zaXRpb25YID0gMDtcbiAgICB0aGlzLmNvbHVtblJlY3RXaWR0aCA9IHRoaXMuZG9tQWRhcHRlci5jbGllbnRSZWN0KHRoaXMuY29sdW1uRWwpLndpZHRoO1xuICAgIHRoaXMucGFnZVN0YXJ0UG9zaXRpb25YID0gdGhpcy5kb21BZGFwdGVyLmNsaWVudFJlY3QodGhpcy5jb2x1bW5FbCkucmlnaHQ7XG4gIH1cblxuICBkcmFnTW92ZUhhbmRsZXIobW92ZUV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCBwYWdlTW92ZVBvc2l0aW9uID0gbW92ZUV2ZW50LnBhZ2VYIHx8IG1vdmVFdmVudC5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWDtcbiAgICB0aGlzLmRyYWdEaXN0YW5jZVBvc2l0aW9uWCA9IHRoaXMuZ2V0UG9zaXRpb25XaXRoaW5NYXgocGFnZU1vdmVQb3NpdGlvbiAtIHRoaXMucGFnZVN0YXJ0UG9zaXRpb25YKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuaGFuZGxlVHJhY2tlckVsLCAncmlnaHQnLCAtMSAqIHRoaXMuZHJhZ0Rpc3RhbmNlUG9zaXRpb25YICsgJ3B4Jyk7XG4gIH1cblxuICBkcmFnRW5kSGFuZGxlcigpOiB2b2lkIHtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuaGFuZGxlVHJhY2tlckVsLCAncmlnaHQnLCAnMHB4Jyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmhhbmRsZVRyYWNrZXJFbCwgJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoZG9jdW1lbnQuYm9keSwgJ2N1cnNvcicsICdhdXRvJyk7XG5cbiAgICBpZiAodGhpcy5kcmFnRGlzdGFuY2VQb3NpdGlvblgpIHtcbiAgICAgIHRoaXMuY29sdW1uUmVzaXplQnkgPSB0aGlzLmRyYWdEaXN0YW5jZVBvc2l0aW9uWDtcblxuICAgICAgdGhpcy5yZXNpemVFbWl0dGVyLmVtaXQodGhpcy5jb2x1bW5SZWN0V2lkdGggKyB0aGlzLmNvbHVtblJlc2l6ZUJ5KTtcbiAgICAgIHRoaXMub3JnYW5pemVyLnJlc2l6ZSgpO1xuICAgIH1cbiAgfVxuXG4gIGdldFBvc2l0aW9uV2l0aGluTWF4KGRyYWdnZWREaXN0YW5jZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBpZiAoZHJhZ2dlZERpc3RhbmNlIDwgMCkge1xuICAgICAgaWYgKE1hdGguYWJzKGRyYWdnZWREaXN0YW5jZSkgPCB0aGlzLmNvbHVtblJlY3RXaWR0aCAtIHRoaXMuY29sdW1uTWluV2lkdGgpIHtcbiAgICAgICAgaWYgKHRoaXMuZHJhZ1dpdGhpbk1pbldpZHRoKSB7XG4gICAgICAgICAgdGhpcy5kcmFnV2l0aGluTWluV2lkdGggPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuaGFuZGxlVHJhY2tlckVsLCAnZXhjZWVkZWQtbWF4Jyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRyYWdnZWREaXN0YW5jZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICghdGhpcy5kcmFnV2l0aGluTWluV2lkdGgpIHtcbiAgICAgICAgICB0aGlzLmRyYWdXaXRoaW5NaW5XaWR0aCA9IHRydWU7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmhhbmRsZVRyYWNrZXJFbCwgJ2V4Y2VlZGVkLW1heCcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmNvbHVtbk1pbldpZHRoIC0gdGhpcy5jb2x1bW5SZWN0V2lkdGg7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLmRyYWdXaXRoaW5NaW5XaWR0aCkge1xuICAgICAgICB0aGlzLmRyYWdXaXRoaW5NaW5XaWR0aCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuaGFuZGxlVHJhY2tlckVsLCAnZXhjZWVkZWQtbWF4Jyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkcmFnZ2VkRGlzdGFuY2U7XG4gICAgfVxuICB9XG59XG4iXX0=