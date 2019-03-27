/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Subject } from 'rxjs';
/**
 *
 * \@description
 * A utility class for that adds hide/show functionality to a column, its cells and enables a toggler in the
 * DatagridColumnToggle Component.
 *
 */
export class DatagridHideableColumnModel {
    /**
     *
     * \@description
     * The init function for DatagridHideableColumnModel instances that does the following:
     *
     * 1. Set values for the private variables that enable a hideable column
     * 2. Broadcast the next hidden change for anyone (already) subscribed to this DatagridHideableColumnModel
     *
     * @param {?} _template
     * @param {?} _id
     * @param {?=} _hidden
     */
    constructor(_template, _id, _hidden = false) {
        this._template = _template;
        this._id = _id;
        this._hidden = _hidden;
        /**
         * \@property hiddenChanges
         *
         * \@description
         * A stream of state changes an instance of DatagridHideableColumnModel will broadcast to subscribers.
         *
         */
        this.hiddenChangesState = new Subject();
        // Flag this true when the service only has one visible column open.
        this.lastVisibleColumn = false;
    }
    /**
     *
     * \@description
     * A getter function that returns an TemplateRef of the DatagridColumn that is hideable. This is currently used to
     * populate the DatagridColumnToggle UI with the correct Column name.
     *
     * @return {?}
     */
    get template() {
        return this._template;
    }
    /**
     *
     * \@description
     * public function that returns the id of a HideableCOlumn instance. Used by the HideableCOlumnService for passing
     * state and actions between DateGridColumns, DataGridCells & the DatagridColumnToggle Components.
     *
     * @return {?}
     */
    get id() {
        return this._id;
    }
    /**
     *
     * \@description
     * A getter that returns the hidden value of a DatagridHideableColumnModel instance.
     *
     * @return {?}
     */
    get hidden() {
        return this._hidden;
    }
    /**
     *
     * \@description
     * The setter for setting the hidden state of a DatagridHideableColumnModel instance.
     * It also broadcasts the change after its set.
     *
     * @param {?} value
     * @return {?}
     */
    set hidden(value) {
        if (this._hidden === value) {
            return;
        }
        this._hidden = value;
        this.hiddenChangesState.next(value);
    }
    /**
     *
     * \@description
     * An Observable for the HideableColumns hidden changes.
     *
     * @return {?}
     */
    get hiddenChangeState() {
        return this.hiddenChangesState.asObservable();
    }
}
if (false) {
    /**
     * \@property hiddenChanges
     *
     * \@description
     * A stream of state changes an instance of DatagridHideableColumnModel will broadcast to subscribers.
     *
     * @type {?}
     * @private
     */
    DatagridHideableColumnModel.prototype.hiddenChangesState;
    /** @type {?} */
    DatagridHideableColumnModel.prototype.lastVisibleColumn;
    /**
     * @type {?}
     * @private
     */
    DatagridHideableColumnModel.prototype._template;
    /**
     * @type {?}
     * @private
     */
    DatagridHideableColumnModel.prototype._id;
    /**
     * @type {?}
     * @private
     */
    DatagridHideableColumnModel.prototype._hidden;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtaGlkZWFibGUtY29sdW1uLm1vZGVsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9kYXRhZ3JpZC1oaWRlYWJsZS1jb2x1bW4ubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQU9BLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7Ozs7Ozs7O0FBUy9CLE1BQU0sT0FBTywyQkFBMkI7Ozs7Ozs7Ozs7Ozs7SUFtQnRDLFlBQW9CLFNBQTJCLEVBQVUsR0FBVyxFQUFVLFVBQW1CLEtBQUs7UUFBbEYsY0FBUyxHQUFULFNBQVMsQ0FBa0I7UUFBVSxRQUFHLEdBQUgsR0FBRyxDQUFRO1FBQVUsWUFBTyxHQUFQLE9BQU8sQ0FBaUI7Ozs7Ozs7O1FBWDlGLHVCQUFrQixHQUFxQixJQUFJLE9BQU8sRUFBVyxDQUFDOztRQXdFL0Qsc0JBQWlCLEdBQVksS0FBSyxDQUFDO0lBN0QrRCxDQUFDOzs7Ozs7Ozs7SUFTMUcsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7Ozs7Ozs7OztJQVNELElBQUksRUFBRTtRQUNKLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNsQixDQUFDOzs7Ozs7OztJQVFELElBQUksTUFBTTtRQUNSLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDOzs7Ozs7Ozs7O0lBU0QsSUFBSSxNQUFNLENBQUMsS0FBYztRQUN2QixJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssS0FBSyxFQUFFO1lBQzFCLE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEMsQ0FBQzs7Ozs7Ozs7SUFRRCxJQUFJLGlCQUFpQjtRQUNuQixPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUNoRCxDQUFDO0NBS0Y7Ozs7Ozs7Ozs7O0lBekVDLHlEQUFzRTs7SUF3RXRFLHdEQUEwQzs7Ozs7SUE3RDlCLGdEQUFtQzs7Ozs7SUFBRSwwQ0FBbUI7Ozs7O0lBQUUsOENBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuLyoqXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBBIHV0aWxpdHkgY2xhc3MgZm9yIHRoYXQgYWRkcyBoaWRlL3Nob3cgZnVuY3Rpb25hbGl0eSB0byBhIGNvbHVtbiwgaXRzIGNlbGxzIGFuZCBlbmFibGVzIGEgdG9nZ2xlciBpbiB0aGVcbiAqIERhdGFncmlkQ29sdW1uVG9nZ2xlIENvbXBvbmVudC5cbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBEYXRhZ3JpZEhpZGVhYmxlQ29sdW1uTW9kZWwge1xuICAvKipcbiAgICogQHByb3BlcnR5IGhpZGRlbkNoYW5nZXNcbiAgICpcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIEEgc3RyZWFtIG9mIHN0YXRlIGNoYW5nZXMgYW4gaW5zdGFuY2Ugb2YgRGF0YWdyaWRIaWRlYWJsZUNvbHVtbk1vZGVsIHdpbGwgYnJvYWRjYXN0IHRvIHN1YnNjcmliZXJzLlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBoaWRkZW5DaGFuZ2VzU3RhdGU6IFN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuXG4gIC8qKlxuICAgKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogVGhlIGluaXQgZnVuY3Rpb24gZm9yIERhdGFncmlkSGlkZWFibGVDb2x1bW5Nb2RlbCBpbnN0YW5jZXMgdGhhdCBkb2VzIHRoZSBmb2xsb3dpbmc6XG4gICAqXG4gICAqIDEuIFNldCB2YWx1ZXMgZm9yIHRoZSBwcml2YXRlIHZhcmlhYmxlcyB0aGF0IGVuYWJsZSBhIGhpZGVhYmxlIGNvbHVtblxuICAgKiAyLiBCcm9hZGNhc3QgdGhlIG5leHQgaGlkZGVuIGNoYW5nZSBmb3IgYW55b25lIChhbHJlYWR5KSBzdWJzY3JpYmVkIHRvIHRoaXMgRGF0YWdyaWRIaWRlYWJsZUNvbHVtbk1vZGVsXG4gICAqXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF90ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiwgcHJpdmF0ZSBfaWQ6IHN0cmluZywgcHJpdmF0ZSBfaGlkZGVuOiBib29sZWFuID0gZmFsc2UpIHt9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBBIGdldHRlciBmdW5jdGlvbiB0aGF0IHJldHVybnMgYW4gVGVtcGxhdGVSZWYgb2YgdGhlIERhdGFncmlkQ29sdW1uIHRoYXQgaXMgaGlkZWFibGUuIFRoaXMgaXMgY3VycmVudGx5IHVzZWQgdG9cbiAgICogcG9wdWxhdGUgdGhlIERhdGFncmlkQ29sdW1uVG9nZ2xlIFVJIHdpdGggdGhlIGNvcnJlY3QgQ29sdW1uIG5hbWUuXG4gICAqXG4gICAqL1xuICBnZXQgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3RlbXBsYXRlO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBwdWJsaWMgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBpZCBvZiBhIEhpZGVhYmxlQ09sdW1uIGluc3RhbmNlLiBVc2VkIGJ5IHRoZSBIaWRlYWJsZUNPbHVtblNlcnZpY2UgZm9yIHBhc3NpbmdcbiAgICogc3RhdGUgYW5kIGFjdGlvbnMgYmV0d2VlbiBEYXRlR3JpZENvbHVtbnMsIERhdGFHcmlkQ2VsbHMgJiB0aGUgRGF0YWdyaWRDb2x1bW5Ub2dnbGUgQ29tcG9uZW50cy5cbiAgICpcbiAgICovXG4gIGdldCBpZCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9pZDtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogQSBnZXR0ZXIgdGhhdCByZXR1cm5zIHRoZSBoaWRkZW4gdmFsdWUgb2YgYSBEYXRhZ3JpZEhpZGVhYmxlQ29sdW1uTW9kZWwgaW5zdGFuY2UuXG4gICAqXG4gICAqL1xuICBnZXQgaGlkZGVuKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9oaWRkZW47XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIFRoZSBzZXR0ZXIgZm9yIHNldHRpbmcgdGhlIGhpZGRlbiBzdGF0ZSBvZiBhIERhdGFncmlkSGlkZWFibGVDb2x1bW5Nb2RlbCBpbnN0YW5jZS5cbiAgICogSXQgYWxzbyBicm9hZGNhc3RzIHRoZSBjaGFuZ2UgYWZ0ZXIgaXRzIHNldC5cbiAgICpcbiAgICovXG4gIHNldCBoaWRkZW4odmFsdWU6IGJvb2xlYW4pIHtcbiAgICBpZiAodGhpcy5faGlkZGVuID09PSB2YWx1ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9oaWRkZW4gPSB2YWx1ZTtcbiAgICB0aGlzLmhpZGRlbkNoYW5nZXNTdGF0ZS5uZXh0KHZhbHVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogQW4gT2JzZXJ2YWJsZSBmb3IgdGhlIEhpZGVhYmxlQ29sdW1ucyBoaWRkZW4gY2hhbmdlcy5cbiAgICpcbiAgICovXG4gIGdldCBoaWRkZW5DaGFuZ2VTdGF0ZSgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5oaWRkZW5DaGFuZ2VzU3RhdGUuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICAvLyBGbGFnIHRoaXMgdHJ1ZSB3aGVuIHRoZSBzZXJ2aWNlIG9ubHkgaGFzIG9uZSB2aXNpYmxlIGNvbHVtbiBvcGVuLlxuXG4gIHB1YmxpYyBsYXN0VmlzaWJsZUNvbHVtbjogYm9vbGVhbiA9IGZhbHNlO1xufVxuIl19