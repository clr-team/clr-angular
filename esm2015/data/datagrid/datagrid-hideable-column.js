/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive, Input, TemplateRef, ViewContainerRef, Output, EventEmitter } from '@angular/core';
import { ClrDatagridColumn } from './datagrid-column';
import { DatagridHideableColumnModel } from './datagrid-hideable-column.model';
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
     * \@description
     * Used the DatagridColumn to get and set an id for this HiddenColumn
     *
     * @param {?} templateRef
     * @param {?} viewContainerRef
     * @param {?} dgColumn
     */
    constructor(templateRef, viewContainerRef, dgColumn) {
        this.templateRef = templateRef;
        this.viewContainerRef = viewContainerRef;
        this.dgColumn = dgColumn;
        this.hiddenChange = new EventEmitter();
        this.columnId = dgColumn.columnId;
        // Use the templateRef to create this view
        this.viewContainerRef.createEmbeddedView(this.templateRef);
        // Create instance of the utility class DatagridHideableColumn.
        // Note this is on the parent instance of DatagridColumn.
        this.dgColumn.hideable = new DatagridHideableColumnModel(this.templateRef, this.columnId, this._hidden);
        this.dgColumn.hideable.hiddenChangeState.subscribe((/**
         * @param {?} state
         * @return {?}
         */
        state => this.hiddenChange.emit(state)));
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
        if (this.dgColumn.hideable) {
            this.dgColumn.hideable.hidden = this._hidden;
        }
    }
}
ClrDatagridHideableColumn.decorators = [
    { type: Directive, args: [{ selector: '[clrDgHideableColumn]' },] }
];
/** @nocollapse */
ClrDatagridHideableColumn.ctorParameters = () => [
    { type: TemplateRef },
    { type: ViewContainerRef },
    { type: ClrDatagridColumn }
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
     *
     * \@description
     * A unique identifier passed into the directive from the parent (A DatagridColumn).
     *
     * @type {?}
     */
    ClrDatagridHideableColumn.prototype.columnId;
    /**
     *
     * \@description
     * An instance of the DatagridHideableColumn Utility class that is used to:
     * 1. Create an instance of HideableColumn that will manage the TemplateRef, state and communication
     * 2. Manage the hidden/shown state for the column to which this directive is applied
     * 3. track the id of the hidden column so it can be used in cells as well as on the column
     * @type {?}
     */
    ClrDatagridHideableColumn.prototype.column;
    /**
     * @type {?}
     * @private
     */
    ClrDatagridHideableColumn.prototype.templateRef;
    /**
     * @type {?}
     * @private
     */
    ClrDatagridHideableColumn.prototype.viewContainerRef;
    /**
     * @type {?}
     * @private
     */
    ClrDatagridHideableColumn.prototype.dgColumn;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtaGlkZWFibGUtY29sdW1uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9kYXRhZ3JpZC1oaWRlYWJsZS1jb2x1bW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFdEcsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDdEQsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFJL0U7Ozs7Ozs7Ozs7Ozs7O0dBY0c7QUFDSCxNQUFNLE9BQU8seUJBQXlCOzs7Ozs7Ozs7SUE2RHBDLFlBQ1UsV0FBNkIsRUFDN0IsZ0JBQWtDLEVBQ2xDLFFBQWdDO1FBRmhDLGdCQUFXLEdBQVgsV0FBVyxDQUFrQjtRQUM3QixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLGFBQVEsR0FBUixRQUFRLENBQXdCO1FBNUJOLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQThCN0UsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDO1FBRWxDLDBDQUEwQztRQUMxQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRTNELCtEQUErRDtRQUMvRCx5REFBeUQ7UUFDekQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEdBQUcsSUFBSSwyQkFBMkIsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3hHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLFNBQVM7Ozs7UUFBQyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFDLENBQUM7SUFDN0YsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFwREQsSUFDSSxtQkFBbUIsQ0FBQyxLQUEwQjtRQUNoRCxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDbEUsQ0FBQzs7Ozs7SUFFRCxJQUNJLFdBQVcsQ0FBQyxNQUFlO1FBQzdCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUN2QyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFO1lBQzFCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1NBQzlDO0lBQ0gsQ0FBQzs7O1lBbkRGLFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSx1QkFBdUIsRUFBRTs7OztZQUxyQixXQUFXO1lBQUUsZ0JBQWdCO1lBRS9DLGlCQUFpQjs7O2tDQTJDdkIsS0FBSyxTQUFDLHFCQUFxQjswQkFLM0IsS0FBSyxTQUFDLGFBQWE7MkJBUW5CLE1BQU0sU0FBQyxtQkFBbUI7Ozs7Ozs7Ozs7O0lBN0IzQiw0Q0FBeUI7O0lBNkJ6QixpREFBK0U7Ozs7Ozs7O0lBUS9FLDZDQUF3Qjs7Ozs7Ozs7OztJQVV4QiwyQ0FBMkM7Ozs7O0lBUXpDLGdEQUFxQzs7Ozs7SUFDckMscURBQTBDOzs7OztJQUMxQyw2Q0FBd0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBUZW1wbGF0ZVJlZiwgVmlld0NvbnRhaW5lclJlZiwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQ2xyRGF0YWdyaWRDb2x1bW4gfSBmcm9tICcuL2RhdGFncmlkLWNvbHVtbic7XG5pbXBvcnQgeyBEYXRhZ3JpZEhpZGVhYmxlQ29sdW1uTW9kZWwgfSBmcm9tICcuL2RhdGFncmlkLWhpZGVhYmxlLWNvbHVtbi5tb2RlbCc7XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tjbHJEZ0hpZGVhYmxlQ29sdW1uXScgfSlcblxuLyoqXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBBIHN0cnVjdHVyYWwgZGlyZWN0aXZlIG1lYW50IHRvIGJlIHVzZWQgaW5zaWRlIGEgY2xyLWRnLWNvbHVtbiBjb21wb25lbnQuXG4gKlxuICogPGNsci1kZy1jb2x1bW4+XG4gKiAgICAgICA8bmctY29udGFpbmVyICpjbHJEZ0hpZGVhYmxlQ29sdW1uPVwieyBoaWRkZW46IHRydWUgfVwiPlxuICogICAgICAgICAgIFVzZXIgSURcbiAqICAgICAgIDwvbmctY29udGFpbmVyPlxuICogICA8L2Nsci1kZy1jb2x1bW4+XG4gKlxuICogSXQgc2V0cyB1cCBzdGF0ZSBhbmQgcHJvcGVydGllcyBzbyB0aGF0IGNvbHVtbnMgY2FuIGJlIG1hbmdlcyBmb3IgaGlkZS9zaG93IGJ5IGEgc2VydmljZSBhbmQgYW4gaW50ZXJuYWxcbiAqIGRhdGFncmlkIHRvZ2dsZSBjb21wb25lbnQuXG4gKlxuICovXG5leHBvcnQgY2xhc3MgQ2xyRGF0YWdyaWRIaWRlYWJsZUNvbHVtbiB7XG4gIC8qKlxuICAgKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogVXNlZCB0byBpbml0aWFsaXplIHRoZSBjb2x1bW4gd2l0aCBlaXRoZXIgaGlkZGVuIG9yIHZpc2libGUgc3RhdGUuXG4gICAqXG4gICAqL1xuICBwcml2YXRlIF9oaWRkZW46IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBTZXR0ZXIgZm4gZm9yIHRoZSBASW5wdXQgd2l0aCB0aGUgc2FtZSBuYW1lIGFzIHRoaXMgc3RydWN0dXJhbCBkaXJlY3RpdmUuXG4gICAqIEl0IGFsbG93cyB0aGUgdXNlciB0byBwcmUtY29uZmlndXJlIHRoZSBjb2x1bW4ncyBoaWRlL3Nob3cgc3RhdGUuIHsgaGlkZGVuOiB0cnVlIH1cbiAgICogSXQncyBtb3JlIHZlcmJvc2UgYnV0IGhhcyBtb3JlIENsYXJpdHkuXG4gICAqXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqICpjbHJEZ0hpZGVhYmxlQ29sdW1uXG4gICAqICpjbHJEZ0hpZGVhYmxlQ29sdW1uPXtoaWRkZW46IGZhbHNlfVxuICAgKiAqY2xyRGdIaWRlYWJsZUNvbHVtbj17aGlkZGVuOiB0cnVlfVxuICAgKlxuICAgKi9cbiAgQElucHV0KCdjbHJEZ0hpZGVhYmxlQ29sdW1uJylcbiAgc2V0IGNsckRnSGlkZWFibGVDb2x1bW4odmFsdWU6IHsgaGlkZGVuOiBib29sZWFuIH0pIHtcbiAgICB0aGlzLmNsckRnSGlkZGVuID0gdmFsdWUgJiYgdmFsdWUuaGlkZGVuID8gdmFsdWUuaGlkZGVuIDogZmFsc2U7XG4gIH1cblxuICBASW5wdXQoJ2NsckRnSGlkZGVuJylcbiAgc2V0IGNsckRnSGlkZGVuKGhpZGRlbjogYm9vbGVhbikge1xuICAgIHRoaXMuX2hpZGRlbiA9IGhpZGRlbiA/IGhpZGRlbiA6IGZhbHNlO1xuICAgIGlmICh0aGlzLmRnQ29sdW1uLmhpZGVhYmxlKSB7XG4gICAgICB0aGlzLmRnQ29sdW1uLmhpZGVhYmxlLmhpZGRlbiA9IHRoaXMuX2hpZGRlbjtcbiAgICB9XG4gIH1cblxuICBAT3V0cHV0KCdjbHJEZ0hpZGRlbkNoYW5nZScpIHB1YmxpYyBoaWRkZW5DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgLyoqXG4gICAqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBBIHVuaXF1ZSBpZGVudGlmaWVyIHBhc3NlZCBpbnRvIHRoZSBkaXJlY3RpdmUgZnJvbSB0aGUgcGFyZW50IChBIERhdGFncmlkQ29sdW1uKS5cbiAgICpcbiAgICovXG4gIHB1YmxpYyBjb2x1bW5JZDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogQW4gaW5zdGFuY2Ugb2YgdGhlIERhdGFncmlkSGlkZWFibGVDb2x1bW4gVXRpbGl0eSBjbGFzcyB0aGF0IGlzIHVzZWQgdG86XG4gICAqIDEuIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiBIaWRlYWJsZUNvbHVtbiB0aGF0IHdpbGwgbWFuYWdlIHRoZSBUZW1wbGF0ZVJlZiwgc3RhdGUgYW5kIGNvbW11bmljYXRpb25cbiAgICogMi4gTWFuYWdlIHRoZSBoaWRkZW4vc2hvd24gc3RhdGUgZm9yIHRoZSBjb2x1bW4gdG8gd2hpY2ggdGhpcyBkaXJlY3RpdmUgaXMgYXBwbGllZFxuICAgKiAzLiB0cmFjayB0aGUgaWQgb2YgdGhlIGhpZGRlbiBjb2x1bW4gc28gaXQgY2FuIGJlIHVzZWQgaW4gY2VsbHMgYXMgd2VsbCBhcyBvbiB0aGUgY29sdW1uXG4gICAqL1xuICBwdWJsaWMgY29sdW1uOiBEYXRhZ3JpZEhpZGVhYmxlQ29sdW1uTW9kZWw7XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBVc2VkIHRoZSBEYXRhZ3JpZENvbHVtbiB0byBnZXQgYW5kIHNldCBhbiBpZCBmb3IgdGhpcyBIaWRkZW5Db2x1bW5cbiAgICpcbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT4sXG4gICAgcHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIHByaXZhdGUgZGdDb2x1bW46IENsckRhdGFncmlkQ29sdW1uPGFueT5cbiAgKSB7XG4gICAgdGhpcy5jb2x1bW5JZCA9IGRnQ29sdW1uLmNvbHVtbklkO1xuXG4gICAgLy8gVXNlIHRoZSB0ZW1wbGF0ZVJlZiB0byBjcmVhdGUgdGhpcyB2aWV3XG4gICAgdGhpcy52aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUVtYmVkZGVkVmlldyh0aGlzLnRlbXBsYXRlUmVmKTtcblxuICAgIC8vIENyZWF0ZSBpbnN0YW5jZSBvZiB0aGUgdXRpbGl0eSBjbGFzcyBEYXRhZ3JpZEhpZGVhYmxlQ29sdW1uLlxuICAgIC8vIE5vdGUgdGhpcyBpcyBvbiB0aGUgcGFyZW50IGluc3RhbmNlIG9mIERhdGFncmlkQ29sdW1uLlxuICAgIHRoaXMuZGdDb2x1bW4uaGlkZWFibGUgPSBuZXcgRGF0YWdyaWRIaWRlYWJsZUNvbHVtbk1vZGVsKHRoaXMudGVtcGxhdGVSZWYsIHRoaXMuY29sdW1uSWQsIHRoaXMuX2hpZGRlbik7XG4gICAgdGhpcy5kZ0NvbHVtbi5oaWRlYWJsZS5oaWRkZW5DaGFuZ2VTdGF0ZS5zdWJzY3JpYmUoc3RhdGUgPT4gdGhpcy5oaWRkZW5DaGFuZ2UuZW1pdChzdGF0ZSkpO1xuICB9XG59XG4iXX0=