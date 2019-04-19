/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive, ElementRef, EventEmitter, Inject, Output, Renderer2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DomAdapter } from '../../../utils/dom-adapter/dom-adapter';
import { DatagridRenderStep } from '../enums/render-step.enum';
import { ColumnResizerService } from '../providers/column-resizer.service';
import { HIDDEN_COLUMN_CLASS, STRICT_WIDTH_CLASS } from './constants';
import { DatagridRenderOrganizer } from './render-organizer';
import { DatagridColumnChanges } from '../enums/column-changes.enum';
import { COLUMN_STATE, COLUMN_STATE_PROVIDER } from '../providers/column-state.provider';
import { ColumnsService } from '../providers/columns.service';
export class DatagridHeaderRenderer {
    /**
     * @param {?} el
     * @param {?} renderer
     * @param {?} organizer
     * @param {?} domAdapter
     * @param {?} columnResizerService
     * @param {?} columnsService
     * @param {?} columnState
     */
    constructor(el, renderer, organizer, domAdapter, columnResizerService, columnsService, columnState) {
        this.el = el;
        this.renderer = renderer;
        this.organizer = organizer;
        this.domAdapter = domAdapter;
        this.columnResizerService = columnResizerService;
        this.columnsService = columnsService;
        this.columnState = columnState;
        this.resizeEmitter = new EventEmitter();
        /**
         * Indicates if the column has a strict width, so it doesn't shrink or expand based on the content.
         */
        this.widthSet = false;
        this.autoSet = false;
        this.subscriptions = [];
        this.subscriptions.push(this.organizer.filterRenderSteps(DatagridRenderStep.CLEAR_WIDTHS).subscribe((/**
         * @return {?}
         */
        () => this.clearWidth())));
        this.subscriptions.push(columnState.subscribe((/**
         * @param {?} state
         * @return {?}
         */
        state => this.stateChanges(state))));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        sub => sub.unsubscribe()));
    }
    /**
     * @private
     * @param {?} state
     * @return {?}
     */
    stateChanges(state) {
        if (state.changes && state.changes.length) {
            state.changes.forEach((/**
             * @param {?} change
             * @return {?}
             */
            change => {
                switch (change) {
                    case DatagridColumnChanges.WIDTH:
                        this.setWidth(state);
                        break;
                    case DatagridColumnChanges.HIDDEN:
                        this.setHidden(state);
                        break;
                    default:
                        break;
                }
            }));
        }
    }
    /**
     * @private
     * @return {?}
     */
    clearWidth() {
        // remove the width only if we set it, and it is not changed by dragging.
        if (this.widthSet && !this.columnResizerService.resizedBy) {
            this.renderer.setStyle(this.el.nativeElement, 'width', null);
        }
        if (this.autoSet) {
            this.renderer.removeClass(this.el.nativeElement, STRICT_WIDTH_CLASS);
        }
    }
    /**
     * @private
     * @return {?}
     */
    detectStrictWidth() {
        if (this.columnResizerService.resizedBy) {
            return this.columnResizerService.widthAfterResize;
        }
        else if (this.autoSet) {
            return 0;
        }
        else {
            return this.domAdapter.userDefinedWidth(this.el.nativeElement);
        }
    }
    /**
     * @private
     * @param {?} strictWidth
     * @return {?}
     */
    computeWidth(strictWidth) {
        /** @type {?} */
        let width = strictWidth;
        if (!width) {
            width = this.domAdapter.scrollWidth(this.el.nativeElement);
        }
        return width;
    }
    /**
     * @return {?}
     */
    getColumnWidthState() {
        /** @type {?} */
        const strictWidth = this.detectStrictWidth();
        return {
            width: this.computeWidth(strictWidth),
            strictWidth: strictWidth,
        };
    }
    /**
     * @param {?} index
     * @return {?}
     */
    setColumnState(index) {
        this.columnsService.columns[index] = this.columnState;
    }
    /**
     * @private
     * @param {?} state
     * @return {?}
     */
    setWidth(state) {
        if (state.strictWidth) {
            if (this.columnResizerService.resizedBy) {
                this.resizeEmitter.emit(state.width);
                this.renderer.setStyle(this.el.nativeElement, 'width', state.width + 'px');
                this.widthSet = false;
            }
            // Don't set width if there is a user-defined one. Just add the strict width class.
            this.renderer.addClass(this.el.nativeElement, STRICT_WIDTH_CLASS);
            this.autoSet = false;
        }
        else {
            this.renderer.removeClass(this.el.nativeElement, STRICT_WIDTH_CLASS);
            this.renderer.setStyle(this.el.nativeElement, 'width', state.width + 'px');
            this.widthSet = true;
            this.autoSet = true;
        }
    }
    /**
     * @private
     * @param {?} state
     * @return {?}
     */
    setHidden(state) {
        if (state.hidden) {
            this.renderer.addClass(this.el.nativeElement, HIDDEN_COLUMN_CLASS);
        }
        else {
            this.renderer.removeClass(this.el.nativeElement, HIDDEN_COLUMN_CLASS);
        }
    }
}
DatagridHeaderRenderer.decorators = [
    { type: Directive, args: [{ selector: 'clr-dg-column', providers: [ColumnResizerService, COLUMN_STATE_PROVIDER] },] }
];
/** @nocollapse */
DatagridHeaderRenderer.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: DatagridRenderOrganizer },
    { type: DomAdapter },
    { type: ColumnResizerService },
    { type: ColumnsService },
    { type: BehaviorSubject, decorators: [{ type: Inject, args: [COLUMN_STATE,] }] }
];
DatagridHeaderRenderer.propDecorators = {
    resizeEmitter: [{ type: Output, args: ['clrDgColumnResize',] }]
};
if (false) {
    /** @type {?} */
    DatagridHeaderRenderer.prototype.resizeEmitter;
    /**
     * Indicates if the column has a strict width, so it doesn't shrink or expand based on the content.
     * @type {?}
     * @private
     */
    DatagridHeaderRenderer.prototype.widthSet;
    /**
     * @type {?}
     * @private
     */
    DatagridHeaderRenderer.prototype.autoSet;
    /**
     * @type {?}
     * @private
     */
    DatagridHeaderRenderer.prototype.subscriptions;
    /**
     * @type {?}
     * @private
     */
    DatagridHeaderRenderer.prototype.el;
    /**
     * @type {?}
     * @private
     */
    DatagridHeaderRenderer.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    DatagridHeaderRenderer.prototype.organizer;
    /**
     * @type {?}
     * @private
     */
    DatagridHeaderRenderer.prototype.domAdapter;
    /**
     * @type {?}
     * @private
     */
    DatagridHeaderRenderer.prototype.columnResizerService;
    /**
     * @type {?}
     * @private
     */
    DatagridHeaderRenderer.prototype.columnsService;
    /**
     * @type {?}
     * @private
     */
    DatagridHeaderRenderer.prototype.columnState;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLXJlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9yZW5kZXIvaGVhZGVyLXJlbmRlcmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQWEsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRyxPQUFPLEVBQUUsZUFBZSxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUVyRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDcEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDL0QsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDM0UsT0FBTyxFQUFFLG1CQUFtQixFQUFFLGtCQUFrQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3RFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRTdELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxZQUFZLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUN6RixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFHOUQsTUFBTSxPQUFPLHNCQUFzQjs7Ozs7Ozs7OztJQUNqQyxZQUNVLEVBQWMsRUFDZCxRQUFtQixFQUNuQixTQUFrQyxFQUNsQyxVQUFzQixFQUN0QixvQkFBMEMsRUFDMUMsY0FBOEIsRUFDUixXQUF5QztRQU4vRCxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQ2QsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixjQUFTLEdBQVQsU0FBUyxDQUF5QjtRQUNsQyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLHlC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LElBQUksQ0FBQztZQUNyQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztTQUNyQjtJQUNILENBQUM7Ozs7OztJQUVPLFNBQVMsQ0FBQyxLQUFrQjtRQUNsQyxJQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFDaEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztTQUNwRTthQUFNO1lBQ0wsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztTQUN2RTtJQUNILENBQUM7OztZQWpIRixTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSxDQUFDLG9CQUFvQixFQUFFLHFCQUFxQixDQUFDLEVBQUU7Ozs7WUFiOUUsVUFBVTtZQUEyQyxTQUFTO1lBT3pFLHVCQUF1QjtZQUp2QixVQUFVO1lBRVYsb0JBQW9CO1lBTXBCLGNBQWM7WUFWZCxlQUFlLHVCQXFCbkIsTUFBTSxTQUFDLFlBQVk7Ozs0QkFTckIsTUFBTSxTQUFDLG1CQUFtQjs7OztJQUEzQiwrQ0FBc0Y7Ozs7OztJQUt0RiwwQ0FBa0M7Ozs7O0lBQ2xDLHlDQUFpQzs7Ozs7SUFFakMsK0NBQTJDOzs7OztJQXZCekMsb0NBQXNCOzs7OztJQUN0QiwwQ0FBMkI7Ozs7O0lBQzNCLDJDQUEwQzs7Ozs7SUFDMUMsNENBQThCOzs7OztJQUM5QixzREFBa0Q7Ozs7O0lBQ2xELGdEQUFzQzs7Ozs7SUFDdEMsNkNBQXVFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEluamVjdCwgT25EZXN0cm95LCBPdXRwdXQsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgRG9tQWRhcHRlciB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2RvbS1hZGFwdGVyL2RvbS1hZGFwdGVyJztcbmltcG9ydCB7IERhdGFncmlkUmVuZGVyU3RlcCB9IGZyb20gJy4uL2VudW1zL3JlbmRlci1zdGVwLmVudW0nO1xuaW1wb3J0IHsgQ29sdW1uUmVzaXplclNlcnZpY2UgfSBmcm9tICcuLi9wcm92aWRlcnMvY29sdW1uLXJlc2l6ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBISURERU5fQ09MVU1OX0NMQVNTLCBTVFJJQ1RfV0lEVEhfQ0xBU1MgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBEYXRhZ3JpZFJlbmRlck9yZ2FuaXplciB9IGZyb20gJy4vcmVuZGVyLW9yZ2FuaXplcic7XG5pbXBvcnQgeyBDb2x1bW5TdGF0ZSB9IGZyb20gJy4uL2ludGVyZmFjZXMvY29sdW1uLXN0YXRlLmludGVyZmFjZSc7XG5pbXBvcnQgeyBEYXRhZ3JpZENvbHVtbkNoYW5nZXMgfSBmcm9tICcuLi9lbnVtcy9jb2x1bW4tY2hhbmdlcy5lbnVtJztcbmltcG9ydCB7IENPTFVNTl9TVEFURSwgQ09MVU1OX1NUQVRFX1BST1ZJREVSIH0gZnJvbSAnLi4vcHJvdmlkZXJzL2NvbHVtbi1zdGF0ZS5wcm92aWRlcic7XG5pbXBvcnQgeyBDb2x1bW5zU2VydmljZSB9IGZyb20gJy4uL3Byb3ZpZGVycy9jb2x1bW5zLnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdjbHItZGctY29sdW1uJywgcHJvdmlkZXJzOiBbQ29sdW1uUmVzaXplclNlcnZpY2UsIENPTFVNTl9TVEFURV9QUk9WSURFUl0gfSlcbmV4cG9ydCBjbGFzcyBEYXRhZ3JpZEhlYWRlclJlbmRlcmVyIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBvcmdhbml6ZXI6IERhdGFncmlkUmVuZGVyT3JnYW5pemVyLFxuICAgIHByaXZhdGUgZG9tQWRhcHRlcjogRG9tQWRhcHRlcixcbiAgICBwcml2YXRlIGNvbHVtblJlc2l6ZXJTZXJ2aWNlOiBDb2x1bW5SZXNpemVyU2VydmljZSxcbiAgICBwcml2YXRlIGNvbHVtbnNTZXJ2aWNlOiBDb2x1bW5zU2VydmljZSxcbiAgICBASW5qZWN0KENPTFVNTl9TVEFURSkgcHJpdmF0ZSBjb2x1bW5TdGF0ZTogQmVoYXZpb3JTdWJqZWN0PENvbHVtblN0YXRlPlxuICApIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMub3JnYW5pemVyLmZpbHRlclJlbmRlclN0ZXBzKERhdGFncmlkUmVuZGVyU3RlcC5DTEVBUl9XSURUSFMpLnN1YnNjcmliZSgoKSA9PiB0aGlzLmNsZWFyV2lkdGgoKSlcbiAgICApO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goY29sdW1uU3RhdGUuc3Vic2NyaWJlKHN0YXRlID0+IHRoaXMuc3RhdGVDaGFuZ2VzKHN0YXRlKSkpO1xuICB9XG5cbiAgQE91dHB1dCgnY2xyRGdDb2x1bW5SZXNpemUnKSByZXNpemVFbWl0dGVyOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAvKipcbiAgICogSW5kaWNhdGVzIGlmIHRoZSBjb2x1bW4gaGFzIGEgc3RyaWN0IHdpZHRoLCBzbyBpdCBkb2Vzbid0IHNocmluayBvciBleHBhbmQgYmFzZWQgb24gdGhlIGNvbnRlbnQuXG4gICAqL1xuICBwcml2YXRlIHdpZHRoU2V0OiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgYXV0b1NldDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaChzdWIgPT4gc3ViLnVuc3Vic2NyaWJlKCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0ZUNoYW5nZXMoc3RhdGU6IENvbHVtblN0YXRlKSB7XG4gICAgaWYgKHN0YXRlLmNoYW5nZXMgJiYgc3RhdGUuY2hhbmdlcy5sZW5ndGgpIHtcbiAgICAgIHN0YXRlLmNoYW5nZXMuZm9yRWFjaChjaGFuZ2UgPT4ge1xuICAgICAgICBzd2l0Y2ggKGNoYW5nZSkge1xuICAgICAgICAgIGNhc2UgRGF0YWdyaWRDb2x1bW5DaGFuZ2VzLldJRFRIOlxuICAgICAgICAgICAgdGhpcy5zZXRXaWR0aChzdGF0ZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIERhdGFncmlkQ29sdW1uQ2hhbmdlcy5ISURERU46XG4gICAgICAgICAgICB0aGlzLnNldEhpZGRlbihzdGF0ZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY2xlYXJXaWR0aCgpIHtcbiAgICAvLyByZW1vdmUgdGhlIHdpZHRoIG9ubHkgaWYgd2Ugc2V0IGl0LCBhbmQgaXQgaXMgbm90IGNoYW5nZWQgYnkgZHJhZ2dpbmcuXG4gICAgaWYgKHRoaXMud2lkdGhTZXQgJiYgIXRoaXMuY29sdW1uUmVzaXplclNlcnZpY2UucmVzaXplZEJ5KSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3dpZHRoJywgbnVsbCk7XG4gICAgfVxuICAgIGlmICh0aGlzLmF1dG9TZXQpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCBTVFJJQ1RfV0lEVEhfQ0xBU1MpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZGV0ZWN0U3RyaWN0V2lkdGgoKTogbnVtYmVyIHtcbiAgICBpZiAodGhpcy5jb2x1bW5SZXNpemVyU2VydmljZS5yZXNpemVkQnkpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbHVtblJlc2l6ZXJTZXJ2aWNlLndpZHRoQWZ0ZXJSZXNpemU7XG4gICAgfSBlbHNlIGlmICh0aGlzLmF1dG9TZXQpIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5kb21BZGFwdGVyLnVzZXJEZWZpbmVkV2lkdGgodGhpcy5lbC5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNvbXB1dGVXaWR0aChzdHJpY3RXaWR0aDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBsZXQgd2lkdGg6IG51bWJlciA9IHN0cmljdFdpZHRoO1xuICAgIGlmICghd2lkdGgpIHtcbiAgICAgIHdpZHRoID0gdGhpcy5kb21BZGFwdGVyLnNjcm9sbFdpZHRoKHRoaXMuZWwubmF0aXZlRWxlbWVudCk7XG4gICAgfVxuICAgIHJldHVybiB3aWR0aDtcbiAgfVxuXG4gIHB1YmxpYyBnZXRDb2x1bW5XaWR0aFN0YXRlKCk6IFBhcnRpYWw8Q29sdW1uU3RhdGU+IHtcbiAgICBjb25zdCBzdHJpY3RXaWR0aCA9IHRoaXMuZGV0ZWN0U3RyaWN0V2lkdGgoKTtcbiAgICByZXR1cm4ge1xuICAgICAgd2lkdGg6IHRoaXMuY29tcHV0ZVdpZHRoKHN0cmljdFdpZHRoKSxcbiAgICAgIHN0cmljdFdpZHRoOiBzdHJpY3RXaWR0aCxcbiAgICB9O1xuICB9XG5cbiAgcHVibGljIHNldENvbHVtblN0YXRlKGluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLmNvbHVtbnNTZXJ2aWNlLmNvbHVtbnNbaW5kZXhdID0gdGhpcy5jb2x1bW5TdGF0ZTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0V2lkdGgoc3RhdGU6IENvbHVtblN0YXRlKSB7XG4gICAgaWYgKHN0YXRlLnN0cmljdFdpZHRoKSB7XG4gICAgICBpZiAodGhpcy5jb2x1bW5SZXNpemVyU2VydmljZS5yZXNpemVkQnkpIHtcbiAgICAgICAgdGhpcy5yZXNpemVFbWl0dGVyLmVtaXQoc3RhdGUud2lkdGgpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3dpZHRoJywgc3RhdGUud2lkdGggKyAncHgnKTtcbiAgICAgICAgdGhpcy53aWR0aFNldCA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgLy8gRG9uJ3Qgc2V0IHdpZHRoIGlmIHRoZXJlIGlzIGEgdXNlci1kZWZpbmVkIG9uZS4gSnVzdCBhZGQgdGhlIHN0cmljdCB3aWR0aCBjbGFzcy5cbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCBTVFJJQ1RfV0lEVEhfQ0xBU1MpO1xuICAgICAgdGhpcy5hdXRvU2V0ID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCBTVFJJQ1RfV0lEVEhfQ0xBU1MpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICd3aWR0aCcsIHN0YXRlLndpZHRoICsgJ3B4Jyk7XG4gICAgICB0aGlzLndpZHRoU2V0ID0gdHJ1ZTtcbiAgICAgIHRoaXMuYXV0b1NldCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRIaWRkZW4oc3RhdGU6IENvbHVtblN0YXRlKSB7XG4gICAgaWYgKHN0YXRlLmhpZGRlbikge1xuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIEhJRERFTl9DT0xVTU5fQ0xBU1MpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgSElEREVOX0NPTFVNTl9DTEFTUyk7XG4gICAgfVxuICB9XG59XG4iXX0=