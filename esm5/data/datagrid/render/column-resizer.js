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
var DatagridColumnResizer = /** @class */ (function () {
    function DatagridColumnResizer(el, renderer, organizer, domAdapter, dragDispatcher, table) {
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
    DatagridColumnResizer.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.dragDispatcher.destroy();
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    /**
     * @return {?}
     */
    DatagridColumnResizer.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.handleTrackerEl = this.dragDispatcher.handleTrackerRef.nativeElement;
        this.dragDispatcher.addDragListener();
        this.subscriptions.push(this.dragDispatcher.onDragStart.subscribe(function () { return _this.dragStartHandler(); }));
        this.subscriptions.push(this.dragDispatcher.onDragMove.subscribe(function ($event) { return _this.dragMoveHandler($event); }));
        this.subscriptions.push(this.dragDispatcher.onDragEnd.subscribe(function () { return _this.dragEndHandler(); }));
    };
    /**
     * @return {?}
     */
    DatagridColumnResizer.prototype.dragStartHandler = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * @param {?} moveEvent
     * @return {?}
     */
    DatagridColumnResizer.prototype.dragMoveHandler = /**
     * @param {?} moveEvent
     * @return {?}
     */
    function (moveEvent) {
        /** @type {?} */
        var pageMovePosition = moveEvent.pageX || moveEvent.changedTouches[0].pageX;
        this.dragDistancePositionX = this.getPositionWithinMax(pageMovePosition - this.pageStartPositionX);
        this.renderer.setStyle(this.handleTrackerEl, 'right', -1 * this.dragDistancePositionX + 'px');
    };
    /**
     * @return {?}
     */
    DatagridColumnResizer.prototype.dragEndHandler = /**
     * @return {?}
     */
    function () {
        this.renderer.setStyle(this.handleTrackerEl, 'right', '0px');
        this.renderer.setStyle(this.handleTrackerEl, 'display', 'none');
        this.renderer.setStyle(document.body, 'cursor', 'auto');
        if (this.dragDistancePositionX) {
            this.columnResizeBy = this.dragDistancePositionX;
            this.resizeEmitter.emit(this.columnRectWidth + this.columnResizeBy);
            this.organizer.resize();
        }
    };
    /**
     * @param {?} draggedDistance
     * @return {?}
     */
    DatagridColumnResizer.prototype.getPositionWithinMax = /**
     * @param {?} draggedDistance
     * @return {?}
     */
    function (draggedDistance) {
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
    };
    DatagridColumnResizer.decorators = [
        { type: Directive, args: [{ selector: 'clr-dg-column', providers: [DragDispatcher] },] }
    ];
    /** @nocollapse */
    DatagridColumnResizer.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: DatagridRenderOrganizer },
        { type: DomAdapter },
        { type: DragDispatcher },
        { type: TableSizeService }
    ]; };
    DatagridColumnResizer.propDecorators = {
        resizeEmitter: [{ type: Output, args: ['clrDgColumnResize',] }]
    };
    return DatagridColumnResizer;
}());
export { DatagridColumnResizer };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLXJlc2l6ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJkYXRhL2RhdGFncmlkL3JlbmRlci9jb2x1bW4tcmVzaXplci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFNQSxPQUFPLEVBQWlCLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFhLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHakgsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzlELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBRW5FLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNwRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUU3RDtJQUVFLCtCQUNFLEVBQWMsRUFDTixRQUFtQixFQUNuQixTQUFrQyxFQUNsQyxVQUFzQixFQUN0QixjQUE4QixFQUM5QixLQUF1QjtRQUp2QixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25CLGNBQVMsR0FBVCxTQUFTLENBQXlCO1FBQ2xDLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLFVBQUssR0FBTCxLQUFLLENBQWtCO1FBT2pDLG1CQUFjLEdBQVcsQ0FBQyxDQUFDOztRQU8zQix1QkFBa0IsR0FBWSxLQUFLLENBQUM7UUFJUCxrQkFBYSxHQUF5QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRTlFLGtCQUFhLEdBQW1CLEVBQUUsQ0FBQztRQWxCekMsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUMsYUFBYSxDQUFDO0lBQ25DLENBQUM7Ozs7SUFtQkQsMkNBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsYUFBYSxDQUFDLE9B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QUFJLENBQUMsa0JBQWtCLEVBQUU7Z0JBQzNCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7Z0JBQ2hDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsY0FBYyxDQUFDLENBQUM7YUFDakU7WUFFRCxPQUFPLGVBQWUsQ0FBQztTQUN4QjtJQUNILENBQUM7O2dCQWxHRixTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxFQUFFOzs7O2dCQVRsQyxVQUFVO2dCQUFtQyxTQUFTO2dCQU9oRix1QkFBdUI7Z0JBRHZCLFVBQVU7Z0JBSFYsY0FBYztnQkFDZCxnQkFBZ0I7OztnQ0ErQnRCLE1BQU0sU0FBQyxtQkFBbUI7O0lBeUU3Qiw0QkFBQztDQUFBLEFBbkdELElBbUdDO1NBbEdZLHFCQUFxQjs7O0lBWWhDLHlDQUFjOztJQUNkLGdEQUF3Qjs7SUFDeEIsK0NBQTJCOztJQUUzQixnREFBNEI7O0lBRTVCLG1EQUEyQjs7SUFDM0Isc0RBQThCOztJQUU5QixtREFBb0M7O0lBRXBDLCtDQUF1Qjs7SUFFdkIsOENBQXNGOztJQUV0Riw4Q0FBMkM7O0lBeEJ6Qyx5Q0FBMkI7O0lBQzNCLDBDQUEwQzs7SUFDMUMsMkNBQThCOztJQUM5QiwrQ0FBc0M7O0lBQ3RDLHNDQUErQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIE9uRGVzdHJveSwgT3V0cHV0LCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBEcmFnRGlzcGF0Y2hlciB9IGZyb20gJy4uL3Byb3ZpZGVycy9kcmFnLWRpc3BhdGNoZXInO1xuaW1wb3J0IHsgVGFibGVTaXplU2VydmljZSB9IGZyb20gJy4uL3Byb3ZpZGVycy90YWJsZS1zaXplLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBEb21BZGFwdGVyIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvZG9tLWFkYXB0ZXIvZG9tLWFkYXB0ZXInO1xuaW1wb3J0IHsgRGF0YWdyaWRSZW5kZXJPcmdhbml6ZXIgfSBmcm9tICcuL3JlbmRlci1vcmdhbml6ZXInO1xuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdjbHItZGctY29sdW1uJywgcHJvdmlkZXJzOiBbRHJhZ0Rpc3BhdGNoZXJdIH0pXG5leHBvcnQgY2xhc3MgRGF0YWdyaWRDb2x1bW5SZXNpemVyIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgY29uc3RydWN0b3IoXG4gICAgZWw6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgb3JnYW5pemVyOiBEYXRhZ3JpZFJlbmRlck9yZ2FuaXplcixcbiAgICBwcml2YXRlIGRvbUFkYXB0ZXI6IERvbUFkYXB0ZXIsXG4gICAgcHJpdmF0ZSBkcmFnRGlzcGF0Y2hlcjogRHJhZ0Rpc3BhdGNoZXIsXG4gICAgcHJpdmF0ZSB0YWJsZTogVGFibGVTaXplU2VydmljZVxuICApIHtcbiAgICB0aGlzLmNvbHVtbkVsID0gZWwubmF0aXZlRWxlbWVudDtcbiAgfVxuXG4gIGNvbHVtbkVsOiBhbnk7XG4gIGNvbHVtblJlY3RXaWR0aDogbnVtYmVyO1xuICBjb2x1bW5SZXNpemVCeTogbnVtYmVyID0gMDtcblxuICBoYW5kbGVUcmFja2VyRWw6IEVsZW1lbnRSZWY7XG5cbiAgcGFnZVN0YXJ0UG9zaXRpb25YOiBudW1iZXI7XG4gIGRyYWdEaXN0YW5jZVBvc2l0aW9uWDogbnVtYmVyOyAvLyByZWxhdGl2ZSB0byBwYWdlU3RhcnRQb3NpdGlvblxuXG4gIGRyYWdXaXRoaW5NaW5XaWR0aDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGNvbHVtbk1pbldpZHRoOiBudW1iZXI7XG5cbiAgQE91dHB1dCgnY2xyRGdDb2x1bW5SZXNpemUnKSByZXNpemVFbWl0dGVyOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBwcml2YXRlIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5kcmFnRGlzcGF0Y2hlci5kZXN0cm95KCk7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmZvckVhY2goKHN1YjogU3Vic2NyaXB0aW9uKSA9PiBzdWIudW5zdWJzY3JpYmUoKSk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5oYW5kbGVUcmFja2VyRWwgPSB0aGlzLmRyYWdEaXNwYXRjaGVyLmhhbmRsZVRyYWNrZXJSZWYubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLmRyYWdEaXNwYXRjaGVyLmFkZERyYWdMaXN0ZW5lcigpO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKHRoaXMuZHJhZ0Rpc3BhdGNoZXIub25EcmFnU3RhcnQuc3Vic2NyaWJlKCgpID0+IHRoaXMuZHJhZ1N0YXJ0SGFuZGxlcigpKSk7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2godGhpcy5kcmFnRGlzcGF0Y2hlci5vbkRyYWdNb3ZlLnN1YnNjcmliZSgkZXZlbnQgPT4gdGhpcy5kcmFnTW92ZUhhbmRsZXIoJGV2ZW50KSkpO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKHRoaXMuZHJhZ0Rpc3BhdGNoZXIub25EcmFnRW5kLnN1YnNjcmliZSgoKSA9PiB0aGlzLmRyYWdFbmRIYW5kbGVyKCkpKTtcbiAgfVxuXG4gIGRyYWdTdGFydEhhbmRsZXIoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmNvbHVtbk1pbldpZHRoKSB7XG4gICAgICAvLyBzZXRzIHRoZSBtaW4gd2lkdGggb25seSBvbiB0aGUgdmVyeSBmaXJzdCBkcmFnIGF0dGVtcHRcbiAgICAgIHRoaXMuY29sdW1uTWluV2lkdGggPSB0aGlzLmRvbUFkYXB0ZXIubWluV2lkdGgodGhpcy5jb2x1bW5FbCk7XG4gICAgfVxuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5oYW5kbGVUcmFja2VyRWwsICdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmhhbmRsZVRyYWNrZXJFbCwgJ2hlaWdodCcsIHRoaXMudGFibGUuZ2V0Q29sdW1uRHJhZ0hlaWdodCgpKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGRvY3VtZW50LmJvZHksICdjdXJzb3InLCAnY29sLXJlc2l6ZScpO1xuICAgIHRoaXMuZHJhZ0Rpc3RhbmNlUG9zaXRpb25YID0gMDtcbiAgICB0aGlzLmNvbHVtblJlY3RXaWR0aCA9IHRoaXMuZG9tQWRhcHRlci5jbGllbnRSZWN0KHRoaXMuY29sdW1uRWwpLndpZHRoO1xuICAgIHRoaXMucGFnZVN0YXJ0UG9zaXRpb25YID0gdGhpcy5kb21BZGFwdGVyLmNsaWVudFJlY3QodGhpcy5jb2x1bW5FbCkucmlnaHQ7XG4gIH1cblxuICBkcmFnTW92ZUhhbmRsZXIobW92ZUV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCBwYWdlTW92ZVBvc2l0aW9uID0gbW92ZUV2ZW50LnBhZ2VYIHx8IG1vdmVFdmVudC5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWDtcbiAgICB0aGlzLmRyYWdEaXN0YW5jZVBvc2l0aW9uWCA9IHRoaXMuZ2V0UG9zaXRpb25XaXRoaW5NYXgocGFnZU1vdmVQb3NpdGlvbiAtIHRoaXMucGFnZVN0YXJ0UG9zaXRpb25YKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuaGFuZGxlVHJhY2tlckVsLCAncmlnaHQnLCAtMSAqIHRoaXMuZHJhZ0Rpc3RhbmNlUG9zaXRpb25YICsgJ3B4Jyk7XG4gIH1cblxuICBkcmFnRW5kSGFuZGxlcigpOiB2b2lkIHtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuaGFuZGxlVHJhY2tlckVsLCAncmlnaHQnLCAnMHB4Jyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmhhbmRsZVRyYWNrZXJFbCwgJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoZG9jdW1lbnQuYm9keSwgJ2N1cnNvcicsICdhdXRvJyk7XG5cbiAgICBpZiAodGhpcy5kcmFnRGlzdGFuY2VQb3NpdGlvblgpIHtcbiAgICAgIHRoaXMuY29sdW1uUmVzaXplQnkgPSB0aGlzLmRyYWdEaXN0YW5jZVBvc2l0aW9uWDtcblxuICAgICAgdGhpcy5yZXNpemVFbWl0dGVyLmVtaXQodGhpcy5jb2x1bW5SZWN0V2lkdGggKyB0aGlzLmNvbHVtblJlc2l6ZUJ5KTtcbiAgICAgIHRoaXMub3JnYW5pemVyLnJlc2l6ZSgpO1xuICAgIH1cbiAgfVxuXG4gIGdldFBvc2l0aW9uV2l0aGluTWF4KGRyYWdnZWREaXN0YW5jZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBpZiAoZHJhZ2dlZERpc3RhbmNlIDwgMCkge1xuICAgICAgaWYgKE1hdGguYWJzKGRyYWdnZWREaXN0YW5jZSkgPCB0aGlzLmNvbHVtblJlY3RXaWR0aCAtIHRoaXMuY29sdW1uTWluV2lkdGgpIHtcbiAgICAgICAgaWYgKHRoaXMuZHJhZ1dpdGhpbk1pbldpZHRoKSB7XG4gICAgICAgICAgdGhpcy5kcmFnV2l0aGluTWluV2lkdGggPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuaGFuZGxlVHJhY2tlckVsLCAnZXhjZWVkZWQtbWF4Jyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRyYWdnZWREaXN0YW5jZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICghdGhpcy5kcmFnV2l0aGluTWluV2lkdGgpIHtcbiAgICAgICAgICB0aGlzLmRyYWdXaXRoaW5NaW5XaWR0aCA9IHRydWU7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmhhbmRsZVRyYWNrZXJFbCwgJ2V4Y2VlZGVkLW1heCcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmNvbHVtbk1pbldpZHRoIC0gdGhpcy5jb2x1bW5SZWN0V2lkdGg7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLmRyYWdXaXRoaW5NaW5XaWR0aCkge1xuICAgICAgICB0aGlzLmRyYWdXaXRoaW5NaW5XaWR0aCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuaGFuZGxlVHJhY2tlckVsLCAnZXhjZWVkZWQtbWF4Jyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkcmFnZ2VkRGlzdGFuY2U7XG4gICAgfVxuICB9XG59XG4iXX0=