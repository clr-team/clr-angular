/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive, EventEmitter, Inject, Input, Optional, Output, TemplateRef, ViewContainerRef, } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ColumnsService } from './providers/columns.service';
import { DatagridColumnChanges } from './enums/column-changes.enum';
import { COLUMN_STATE } from './providers/column-state.provider';
/**
 *
 * @description
 * A structural directive meant to be used inside a clr-dg-column component.
 *
 * <clr-dg-column>
 *       <ng-container *clrDgHideableColumn="{ hidden: true }">
 *           User ID
 *       </ng-container>
 *   </clr-dg-column>
 *
 * It sets up state and properties so that columns can be manges for hide/show by a service and an internal
 * datagrid toggle component.
 *
 */
export class ClrDatagridHideableColumn {
    /**
     * @param {?} titleTemplateRef
     * @param {?} viewContainerRef
     * @param {?} columnsService
     * @param {?} columnState
     */
    constructor(titleTemplateRef, viewContainerRef, columnsService, columnState) {
        this.titleTemplateRef = titleTemplateRef;
        this.viewContainerRef = viewContainerRef;
        this.columnsService = columnsService;
        this.columnState = columnState;
        this.hiddenChange = new EventEmitter();
        this.subscriptions = [];
        this.viewContainerRef.createEmbeddedView(this.titleTemplateRef);
        if (!this.columnState) {
            throw new Error('The *clrDgHideableColumn directive can only be used inside of a clr-dg-column component.');
        }
    }
    /**
     *
     * \@description
     * Setter fn for the \@Input with the same name as this structural directive.
     * It allows the user to pre-configure the column's hide/show state. { hidden: true }
     * It's more verbose but has more Clarity.
     *
     *
     * \@example
     * *clrDgHideableColumn
     * *clrDgHideableColumn={hidden: false}
     * *clrDgHideableColumn={hidden: true}
     *
     * @param {?} value
     * @return {?}
     */
    set clrDgHideableColumn(value) {
        this.clrDgHidden = value && value.hidden ? value.hidden : false;
    }
    /**
     * @param {?} hidden
     * @return {?}
     */
    set clrDgHidden(hidden) {
        this._hidden = hidden ? hidden : false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.columnsService.emitStateChange(this.columnState, {
            hideable: true,
            titleTemplateRef: this.titleTemplateRef,
            hidden: this._hidden,
            changes: [DatagridColumnChanges.HIDDEN],
        });
        this.subscriptions.push(this.columnState.subscribe((/**
         * @param {?} state
         * @return {?}
         */
        (state) => {
            if (state.changes && state.changes.indexOf(DatagridColumnChanges.HIDDEN) > -1) {
                this.hiddenChange.emit(state.hidden); // Can emit through @Output when desugared syntax is used
            }
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
        sub => sub.unsubscribe()));
    }
}
ClrDatagridHideableColumn.decorators = [
    { type: Directive, args: [{ selector: '[clrDgHideableColumn]' },] }
];
/** @nocollapse */
ClrDatagridHideableColumn.ctorParameters = () => [
    { type: TemplateRef },
    { type: ViewContainerRef },
    { type: ColumnsService },
    { type: BehaviorSubject, decorators: [{ type: Optional }, { type: Inject, args: [COLUMN_STATE,] }] }
];
ClrDatagridHideableColumn.propDecorators = {
    clrDgHideableColumn: [{ type: Input, args: ['clrDgHideableColumn',] }],
    clrDgHidden: [{ type: Input, args: ['clrDgHidden',] }],
    hiddenChange: [{ type: Output, args: ['clrDgHiddenChange',] }]
};
if (false) {
    /**
     *
     * \@description
     * Used to initialize the column with either hidden or visible state.
     *
     * @type {?}
     * @private
     */
    ClrDatagridHideableColumn.prototype._hidden;
    /** @type {?} */
    ClrDatagridHideableColumn.prototype.hiddenChange;
    /**
     * @type {?}
     * @private
     */
    ClrDatagridHideableColumn.prototype.subscriptions;
    /**
     * @type {?}
     * @private
     */
    ClrDatagridHideableColumn.prototype.titleTemplateRef;
    /**
     * @type {?}
     * @private
     */
    ClrDatagridHideableColumn.prototype.viewContainerRef;
    /**
     * @type {?}
     * @private
     */
    ClrDatagridHideableColumn.prototype.columnsService;
    /**
     * @type {?}
     * @private
     */
    ClrDatagridHideableColumn.prototype.columnState;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtaGlkZWFibGUtY29sdW1uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9kYXRhZ3JpZC1oaWRlYWJsZS1jb2x1bW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUNMLFNBQVMsRUFDVCxZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFFTCxRQUFRLEVBQ1IsTUFBTSxFQUNOLFdBQVcsRUFDWCxnQkFBZ0IsR0FDakIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGVBQWUsRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDckQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRTdELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUlqRTs7Ozs7Ozs7Ozs7Ozs7R0FjRztBQUNILE1BQU0sT0FBTyx5QkFBeUI7Ozs7Ozs7SUFtQ3BDLFlBQ1UsZ0JBQWtDLEVBQ2xDLGdCQUFrQyxFQUNsQyxjQUE4QixFQUc5QixXQUF5QztRQUx6QyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBRzlCLGdCQUFXLEdBQVgsV0FBVyxDQUE4QjtRQVJmLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQWlCdkUsa0JBQWEsR0FBbUIsRUFBRSxDQUFDO1FBUHpDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUVoRSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNyQixNQUFNLElBQUksS0FBSyxDQUFDLDBGQUEwRixDQUFDLENBQUM7U0FDN0c7SUFDSCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztJQXpCRCxJQUNJLG1CQUFtQixDQUFDLEtBQTBCO1FBQ2hELElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUNsRSxDQUFDOzs7OztJQUVELElBQ0ksV0FBVyxDQUFDLE1BQWU7UUFDN0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQ3pDLENBQUM7Ozs7SUFxQkQsUUFBUTtRQUNOLElBQUksQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDcEQsUUFBUSxFQUFFLElBQUk7WUFDZCxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsZ0JBQWdCO1lBQ3ZDLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTztZQUNwQixPQUFPLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUM7U0FDeEMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQ3JCLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUzs7OztRQUFDLENBQUMsS0FBa0IsRUFBRSxFQUFFO1lBQ2hELElBQUksS0FBSyxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtnQkFDN0UsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMseURBQXlEO2FBQ2hHO1FBQ0gsQ0FBQyxFQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPOzs7O1FBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLEVBQUMsQ0FBQztJQUN2RCxDQUFDOzs7WUF4RkYsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLHVCQUF1QixFQUFFOzs7O1lBVjlDLFdBQVc7WUFDWCxnQkFBZ0I7WUFJVCxjQUFjO1lBRGQsZUFBZSx1QkE4RG5CLFFBQVEsWUFDUixNQUFNLFNBQUMsWUFBWTs7O2tDQWpCckIsS0FBSyxTQUFDLHFCQUFxQjswQkFLM0IsS0FBSyxTQUFDLGFBQWE7MkJBS25CLE1BQU0sU0FBQyxtQkFBbUI7Ozs7Ozs7Ozs7O0lBMUIzQiw0Q0FBeUI7O0lBMEJ6QixpREFBK0U7Ozs7O0lBaUIvRSxrREFBMkM7Ozs7O0lBZHpDLHFEQUEwQzs7Ozs7SUFDMUMscURBQTBDOzs7OztJQUMxQyxtREFBc0M7Ozs7O0lBQ3RDLGdEQUVpRCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3Q29udGFpbmVyUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENvbHVtbnNTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvY29sdW1ucy5zZXJ2aWNlJztcbmltcG9ydCB7IENvbHVtblN0YXRlIH0gZnJvbSAnLi9pbnRlcmZhY2VzL2NvbHVtbi1zdGF0ZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgRGF0YWdyaWRDb2x1bW5DaGFuZ2VzIH0gZnJvbSAnLi9lbnVtcy9jb2x1bW4tY2hhbmdlcy5lbnVtJztcbmltcG9ydCB7IENPTFVNTl9TVEFURSB9IGZyb20gJy4vcHJvdmlkZXJzL2NvbHVtbi1zdGF0ZS5wcm92aWRlcic7XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tjbHJEZ0hpZGVhYmxlQ29sdW1uXScgfSlcblxuLyoqXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBBIHN0cnVjdHVyYWwgZGlyZWN0aXZlIG1lYW50IHRvIGJlIHVzZWQgaW5zaWRlIGEgY2xyLWRnLWNvbHVtbiBjb21wb25lbnQuXG4gKlxuICogPGNsci1kZy1jb2x1bW4+XG4gKiAgICAgICA8bmctY29udGFpbmVyICpjbHJEZ0hpZGVhYmxlQ29sdW1uPVwieyBoaWRkZW46IHRydWUgfVwiPlxuICogICAgICAgICAgIFVzZXIgSURcbiAqICAgICAgIDwvbmctY29udGFpbmVyPlxuICogICA8L2Nsci1kZy1jb2x1bW4+XG4gKlxuICogSXQgc2V0cyB1cCBzdGF0ZSBhbmQgcHJvcGVydGllcyBzbyB0aGF0IGNvbHVtbnMgY2FuIGJlIG1hbmdlcyBmb3IgaGlkZS9zaG93IGJ5IGEgc2VydmljZSBhbmQgYW4gaW50ZXJuYWxcbiAqIGRhdGFncmlkIHRvZ2dsZSBjb21wb25lbnQuXG4gKlxuICovXG5leHBvcnQgY2xhc3MgQ2xyRGF0YWdyaWRIaWRlYWJsZUNvbHVtbiBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIC8qKlxuICAgKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogVXNlZCB0byBpbml0aWFsaXplIHRoZSBjb2x1bW4gd2l0aCBlaXRoZXIgaGlkZGVuIG9yIHZpc2libGUgc3RhdGUuXG4gICAqXG4gICAqL1xuICBwcml2YXRlIF9oaWRkZW46IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBTZXR0ZXIgZm4gZm9yIHRoZSBASW5wdXQgd2l0aCB0aGUgc2FtZSBuYW1lIGFzIHRoaXMgc3RydWN0dXJhbCBkaXJlY3RpdmUuXG4gICAqIEl0IGFsbG93cyB0aGUgdXNlciB0byBwcmUtY29uZmlndXJlIHRoZSBjb2x1bW4ncyBoaWRlL3Nob3cgc3RhdGUuIHsgaGlkZGVuOiB0cnVlIH1cbiAgICogSXQncyBtb3JlIHZlcmJvc2UgYnV0IGhhcyBtb3JlIENsYXJpdHkuXG4gICAqXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqICpjbHJEZ0hpZGVhYmxlQ29sdW1uXG4gICAqICpjbHJEZ0hpZGVhYmxlQ29sdW1uPXtoaWRkZW46IGZhbHNlfVxuICAgKiAqY2xyRGdIaWRlYWJsZUNvbHVtbj17aGlkZGVuOiB0cnVlfVxuICAgKlxuICAgKi9cbiAgQElucHV0KCdjbHJEZ0hpZGVhYmxlQ29sdW1uJylcbiAgc2V0IGNsckRnSGlkZWFibGVDb2x1bW4odmFsdWU6IHsgaGlkZGVuOiBib29sZWFuIH0pIHtcbiAgICB0aGlzLmNsckRnSGlkZGVuID0gdmFsdWUgJiYgdmFsdWUuaGlkZGVuID8gdmFsdWUuaGlkZGVuIDogZmFsc2U7XG4gIH1cblxuICBASW5wdXQoJ2NsckRnSGlkZGVuJylcbiAgc2V0IGNsckRnSGlkZGVuKGhpZGRlbjogYm9vbGVhbikge1xuICAgIHRoaXMuX2hpZGRlbiA9IGhpZGRlbiA/IGhpZGRlbiA6IGZhbHNlO1xuICB9XG5cbiAgQE91dHB1dCgnY2xyRGdIaWRkZW5DaGFuZ2UnKSBwdWJsaWMgaGlkZGVuQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgdGl0bGVUZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55PixcbiAgICBwcml2YXRlIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgcHJpdmF0ZSBjb2x1bW5zU2VydmljZTogQ29sdW1uc1NlcnZpY2UsXG4gICAgQE9wdGlvbmFsKClcbiAgICBASW5qZWN0KENPTFVNTl9TVEFURSlcbiAgICBwcml2YXRlIGNvbHVtblN0YXRlOiBCZWhhdmlvclN1YmplY3Q8Q29sdW1uU3RhdGU+XG4gICkge1xuICAgIHRoaXMudmlld0NvbnRhaW5lclJlZi5jcmVhdGVFbWJlZGRlZFZpZXcodGhpcy50aXRsZVRlbXBsYXRlUmVmKTtcblxuICAgIGlmICghdGhpcy5jb2x1bW5TdGF0ZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgKmNsckRnSGlkZWFibGVDb2x1bW4gZGlyZWN0aXZlIGNhbiBvbmx5IGJlIHVzZWQgaW5zaWRlIG9mIGEgY2xyLWRnLWNvbHVtbiBjb21wb25lbnQuJyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY29sdW1uc1NlcnZpY2UuZW1pdFN0YXRlQ2hhbmdlKHRoaXMuY29sdW1uU3RhdGUsIHtcbiAgICAgIGhpZGVhYmxlOiB0cnVlLFxuICAgICAgdGl0bGVUZW1wbGF0ZVJlZjogdGhpcy50aXRsZVRlbXBsYXRlUmVmLFxuICAgICAgaGlkZGVuOiB0aGlzLl9oaWRkZW4sXG4gICAgICBjaGFuZ2VzOiBbRGF0YWdyaWRDb2x1bW5DaGFuZ2VzLkhJRERFTl0sXG4gICAgfSk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMuY29sdW1uU3RhdGUuc3Vic2NyaWJlKChzdGF0ZTogQ29sdW1uU3RhdGUpID0+IHtcbiAgICAgICAgaWYgKHN0YXRlLmNoYW5nZXMgJiYgc3RhdGUuY2hhbmdlcy5pbmRleE9mKERhdGFncmlkQ29sdW1uQ2hhbmdlcy5ISURERU4pID4gLTEpIHtcbiAgICAgICAgICB0aGlzLmhpZGRlbkNoYW5nZS5lbWl0KHN0YXRlLmhpZGRlbik7IC8vIENhbiBlbWl0IHRocm91Z2ggQE91dHB1dCB3aGVuIGRlc3VnYXJlZCBzeW50YXggaXMgdXNlZFxuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaChzdWIgPT4gc3ViLnVuc3Vic2NyaWJlKCkpO1xuICB9XG59XG4iXX0=