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
var DatagridHeaderRenderer = /** @class */ (function () {
    function DatagridHeaderRenderer(el, renderer, organizer, domAdapter, columnResizerService, columnsService, columnState) {
        var _this = this;
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
        function () { return _this.clearWidth(); })));
        this.subscriptions.push(columnState.subscribe((/**
         * @param {?} state
         * @return {?}
         */
        function (state) { return _this.stateChanges(state); })));
    }
    /**
     * @return {?}
     */
    DatagridHeaderRenderer.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        function (sub) { return sub.unsubscribe(); }));
    };
    /**
     * @private
     * @param {?} state
     * @return {?}
     */
    DatagridHeaderRenderer.prototype.stateChanges = /**
     * @private
     * @param {?} state
     * @return {?}
     */
    function (state) {
        var _this = this;
        if (state.changes && state.changes.length) {
            state.changes.forEach((/**
             * @param {?} change
             * @return {?}
             */
            function (change) {
                switch (change) {
                    case DatagridColumnChanges.WIDTH:
                        _this.setWidth(state);
                        break;
                    case DatagridColumnChanges.HIDDEN:
                        _this.setHidden(state);
                        break;
                    default:
                        break;
                }
            }));
        }
    };
    /**
     * @private
     * @return {?}
     */
    DatagridHeaderRenderer.prototype.clearWidth = /**
     * @private
     * @return {?}
     */
    function () {
        // remove the width only if we set it, and it is not changed by dragging.
        if (this.widthSet && !this.columnResizerService.resizedBy) {
            this.renderer.setStyle(this.el.nativeElement, 'width', null);
        }
        if (this.autoSet) {
            this.renderer.removeClass(this.el.nativeElement, STRICT_WIDTH_CLASS);
        }
    };
    /**
     * @private
     * @return {?}
     */
    DatagridHeaderRenderer.prototype.detectStrictWidth = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.columnResizerService.resizedBy) {
            return this.columnResizerService.widthAfterResize;
        }
        else if (this.autoSet) {
            return 0;
        }
        else {
            return this.domAdapter.userDefinedWidth(this.el.nativeElement);
        }
    };
    /**
     * @private
     * @param {?} strictWidth
     * @return {?}
     */
    DatagridHeaderRenderer.prototype.computeWidth = /**
     * @private
     * @param {?} strictWidth
     * @return {?}
     */
    function (strictWidth) {
        /** @type {?} */
        var width = strictWidth;
        if (!width) {
            width = this.domAdapter.scrollWidth(this.el.nativeElement);
        }
        return width;
    };
    /**
     * @return {?}
     */
    DatagridHeaderRenderer.prototype.getColumnWidthState = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var strictWidth = this.detectStrictWidth();
        return {
            width: this.computeWidth(strictWidth),
            strictWidth: strictWidth,
        };
    };
    /**
     * @param {?} index
     * @return {?}
     */
    DatagridHeaderRenderer.prototype.setColumnState = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        this.columnsService.columns[index] = this.columnState;
    };
    /**
     * @private
     * @param {?} state
     * @return {?}
     */
    DatagridHeaderRenderer.prototype.setWidth = /**
     * @private
     * @param {?} state
     * @return {?}
     */
    function (state) {
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
    };
    /**
     * @private
     * @param {?} state
     * @return {?}
     */
    DatagridHeaderRenderer.prototype.setHidden = /**
     * @private
     * @param {?} state
     * @return {?}
     */
    function (state) {
        if (state.hidden) {
            this.renderer.addClass(this.el.nativeElement, HIDDEN_COLUMN_CLASS);
        }
        else {
            this.renderer.removeClass(this.el.nativeElement, HIDDEN_COLUMN_CLASS);
        }
    };
    DatagridHeaderRenderer.decorators = [
        { type: Directive, args: [{ selector: 'clr-dg-column', providers: [ColumnResizerService, COLUMN_STATE_PROVIDER] },] }
    ];
    /** @nocollapse */
    DatagridHeaderRenderer.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: DatagridRenderOrganizer },
        { type: DomAdapter },
        { type: ColumnResizerService },
        { type: ColumnsService },
        { type: BehaviorSubject, decorators: [{ type: Inject, args: [COLUMN_STATE,] }] }
    ]; };
    DatagridHeaderRenderer.propDecorators = {
        resizeEmitter: [{ type: Output, args: ['clrDgColumnResize',] }]
    };
    return DatagridHeaderRenderer;
}());
export { DatagridHeaderRenderer };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLXJlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9yZW5kZXIvaGVhZGVyLXJlbmRlcmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQWEsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRyxPQUFPLEVBQUUsZUFBZSxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUVyRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDcEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDL0QsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDM0UsT0FBTyxFQUFFLG1CQUFtQixFQUFFLGtCQUFrQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3RFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRTdELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxZQUFZLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUN6RixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFFOUQ7SUFFRSxnQ0FDVSxFQUFjLEVBQ2QsUUFBbUIsRUFDbkIsU0FBa0MsRUFDbEMsVUFBc0IsRUFDdEIsb0JBQTBDLEVBQzFDLGNBQThCLEVBQ1IsV0FBeUM7UUFQekUsaUJBY0M7UUFiUyxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQ2QsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixjQUFTLEdBQVQsU0FBUyxDQUF5QjtRQUNsQyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLHlCQUFvQixHQUFwQixvQkFB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WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5qZWN0LCBPbkRlc3Ryb3ksIE91dHB1dCwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBEb21BZGFwdGVyIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvZG9tLWFkYXB0ZXIvZG9tLWFkYXB0ZXInO1xuaW1wb3J0IHsgRGF0YWdyaWRSZW5kZXJTdGVwIH0gZnJvbSAnLi4vZW51bXMvcmVuZGVyLXN0ZXAuZW51bSc7XG5pbXBvcnQgeyBDb2x1bW5SZXNpemVyU2VydmljZSB9IGZyb20gJy4uL3Byb3ZpZGVycy9jb2x1bW4tcmVzaXplci5zZXJ2aWNlJztcbmltcG9ydCB7IEhJRERFTl9DT0xVTU5fQ0xBU1MsIFNUUklDVF9XSURUSF9DTEFTUyB9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7IERhdGFncmlkUmVuZGVyT3JnYW5pemVyIH0gZnJvbSAnLi9yZW5kZXItb3JnYW5pemVyJztcbmltcG9ydCB7IENvbHVtblN0YXRlIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9jb2x1bW4tc3RhdGUuaW50ZXJmYWNlJztcbmltcG9ydCB7IERhdGFncmlkQ29sdW1uQ2hhbmdlcyB9IGZyb20gJy4uL2VudW1zL2NvbHVtbi1jaGFuZ2VzLmVudW0nO1xuaW1wb3J0IHsgQ09MVU1OX1NUQVRFLCBDT0xVTU5fU1RBVEVfUFJPVklERVIgfSBmcm9tICcuLi9wcm92aWRlcnMvY29sdW1uLXN0YXRlLnByb3ZpZGVyJztcbmltcG9ydCB7IENvbHVtbnNTZXJ2aWNlIH0gZnJvbSAnLi4vcHJvdmlkZXJzL2NvbHVtbnMuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ2Nsci1kZy1jb2x1bW4nLCBwcm92aWRlcnM6IFtDb2x1bW5SZXNpemVyU2VydmljZSwgQ09MVU1OX1NUQVRFX1BST1ZJREVSXSB9KVxuZXhwb3J0IGNsYXNzIERhdGFncmlkSGVhZGVyUmVuZGVyZXIgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIG9yZ2FuaXplcjogRGF0YWdyaWRSZW5kZXJPcmdhbml6ZXIsXG4gICAgcHJpdmF0ZSBkb21BZGFwdGVyOiBEb21BZGFwdGVyLFxuICAgIHByaXZhdGUgY29sdW1uUmVzaXplclNlcnZpY2U6IENvbHVtblJlc2l6ZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgY29sdW1uc1NlcnZpY2U6IENvbHVtbnNTZXJ2aWNlLFxuICAgIEBJbmplY3QoQ09MVU1OX1NUQVRFKSBwcml2YXRlIGNvbHVtblN0YXRlOiBCZWhhdmlvclN1YmplY3Q8Q29sdW1uU3RhdGU+XG4gICkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5vcmdhbml6ZXIuZmlsdGVyUmVuZGVyU3RlcHMoRGF0YWdyaWRSZW5kZXJTdGVwLkNMRUFSX1dJRFRIUykuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2xlYXJXaWR0aCgpKVxuICAgICk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChjb2x1bW5TdGF0ZS5zdWJzY3JpYmUoc3RhdGUgPT4gdGhpcy5zdGF0ZUNoYW5nZXMoc3RhdGUpKSk7XG4gIH1cblxuICBAT3V0cHV0KCdjbHJEZ0NvbHVtblJlc2l6ZScpIHJlc2l6ZUVtaXR0ZXI6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgaWYgdGhlIGNvbHVtbiBoYXMgYSBzdHJpY3Qgd2lkdGgsIHNvIGl0IGRvZXNuJ3Qgc2hyaW5rIG9yIGV4cGFuZCBiYXNlZCBvbiB0aGUgY29udGVudC5cbiAgICovXG4gIHByaXZhdGUgd2lkdGhTZXQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBhdXRvU2V0OiBib29sZWFuID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHN1YiA9PiBzdWIudW5zdWJzY3JpYmUoKSk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRlQ2hhbmdlcyhzdGF0ZTogQ29sdW1uU3RhdGUpIHtcbiAgICBpZiAoc3RhdGUuY2hhbmdlcyAmJiBzdGF0ZS5jaGFuZ2VzLmxlbmd0aCkge1xuICAgICAgc3RhdGUuY2hhbmdlcy5mb3JFYWNoKGNoYW5nZSA9PiB7XG4gICAgICAgIHN3aXRjaCAoY2hhbmdlKSB7XG4gICAgICAgICAgY2FzZSBEYXRhZ3JpZENvbHVtbkNoYW5nZXMuV0lEVEg6XG4gICAgICAgICAgICB0aGlzLnNldFdpZHRoKHN0YXRlKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgRGF0YWdyaWRDb2x1bW5DaGFuZ2VzLkhJRERFTjpcbiAgICAgICAgICAgIHRoaXMuc2V0SGlkZGVuKHN0YXRlKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjbGVhcldpZHRoKCkge1xuICAgIC8vIHJlbW92ZSB0aGUgd2lkdGggb25seSBpZiB3ZSBzZXQgaXQsIGFuZCBpdCBpcyBub3QgY2hhbmdlZCBieSBkcmFnZ2luZy5cbiAgICBpZiAodGhpcy53aWR0aFNldCAmJiAhdGhpcy5jb2x1bW5SZXNpemVyU2VydmljZS5yZXNpemVkQnkpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnd2lkdGgnLCBudWxsKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuYXV0b1NldCkge1xuICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIFNUUklDVF9XSURUSF9DTEFTUyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBkZXRlY3RTdHJpY3RXaWR0aCgpOiBudW1iZXIge1xuICAgIGlmICh0aGlzLmNvbHVtblJlc2l6ZXJTZXJ2aWNlLnJlc2l6ZWRCeSkge1xuICAgICAgcmV0dXJuIHRoaXMuY29sdW1uUmVzaXplclNlcnZpY2Uud2lkdGhBZnRlclJlc2l6ZTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuYXV0b1NldCkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmRvbUFkYXB0ZXIudXNlckRlZmluZWRXaWR0aCh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY29tcHV0ZVdpZHRoKHN0cmljdFdpZHRoOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGxldCB3aWR0aDogbnVtYmVyID0gc3RyaWN0V2lkdGg7XG4gICAgaWYgKCF3aWR0aCkge1xuICAgICAgd2lkdGggPSB0aGlzLmRvbUFkYXB0ZXIuc2Nyb2xsV2lkdGgodGhpcy5lbC5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG4gICAgcmV0dXJuIHdpZHRoO1xuICB9XG5cbiAgcHVibGljIGdldENvbHVtbldpZHRoU3RhdGUoKTogUGFydGlhbDxDb2x1bW5TdGF0ZT4ge1xuICAgIGNvbnN0IHN0cmljdFdpZHRoID0gdGhpcy5kZXRlY3RTdHJpY3RXaWR0aCgpO1xuICAgIHJldHVybiB7XG4gICAgICB3aWR0aDogdGhpcy5jb21wdXRlV2lkdGgoc3RyaWN0V2lkdGgpLFxuICAgICAgc3RyaWN0V2lkdGg6IHN0cmljdFdpZHRoLFxuICAgIH07XG4gIH1cblxuICBwdWJsaWMgc2V0Q29sdW1uU3RhdGUoaW5kZXg6IG51bWJlcikge1xuICAgIHRoaXMuY29sdW1uc1NlcnZpY2UuY29sdW1uc1tpbmRleF0gPSB0aGlzLmNvbHVtblN0YXRlO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRXaWR0aChzdGF0ZTogQ29sdW1uU3RhdGUpIHtcbiAgICBpZiAoc3RhdGUuc3RyaWN0V2lkdGgpIHtcbiAgICAgIGlmICh0aGlzLmNvbHVtblJlc2l6ZXJTZXJ2aWNlLnJlc2l6ZWRCeSkge1xuICAgICAgICB0aGlzLnJlc2l6ZUVtaXR0ZXIuZW1pdChzdGF0ZS53aWR0aCk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnd2lkdGgnLCBzdGF0ZS53aWR0aCArICdweCcpO1xuICAgICAgICB0aGlzLndpZHRoU2V0ID0gZmFsc2U7XG4gICAgICB9XG4gICAgICAvLyBEb24ndCBzZXQgd2lkdGggaWYgdGhlcmUgaXMgYSB1c2VyLWRlZmluZWQgb25lLiBKdXN0IGFkZCB0aGUgc3RyaWN0IHdpZHRoIGNsYXNzLlxuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIFNUUklDVF9XSURUSF9DTEFTUyk7XG4gICAgICB0aGlzLmF1dG9TZXQgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIFNUUklDVF9XSURUSF9DTEFTUyk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3dpZHRoJywgc3RhdGUud2lkdGggKyAncHgnKTtcbiAgICAgIHRoaXMud2lkdGhTZXQgPSB0cnVlO1xuICAgICAgdGhpcy5hdXRvU2V0ID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldEhpZGRlbihzdGF0ZTogQ29sdW1uU3RhdGUpIHtcbiAgICBpZiAoc3RhdGUuaGlkZGVuKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgSElEREVOX0NPTFVNTl9DTEFTUyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCBISURERU5fQ09MVU1OX0NMQVNTKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==