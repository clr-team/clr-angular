/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { ClrSelectedState } from './selected-state.enum';
import { BehaviorSubject } from 'rxjs';
/**
 * @abstract
 * @template T
 */
var /**
 * @abstract
 * @template T
 */
TreeNodeModel = /** @class */ (function () {
    function TreeNodeModel() {
        this.selected = new BehaviorSubject(ClrSelectedState.UNSELECTED);
        /*
           * Being able to push this down to the RecursiveTreeNodeModel would require too much work on the angular components
           * right now for them to know which kind of model they are using. So I'm lifting the public properties to this
           * abstract parent class for now and we can revisit it later, when we're not facing such a close deadline.
           */
        this.loading = false;
    }
    /**
     * @return {?}
     */
    TreeNodeModel.prototype.destroy = /**
     * @return {?}
     */
    function () {
        // Just to be safe
        this.selected.complete();
    };
    // Propagate by default when eager, don't propagate in the lazy-loaded tree.
    // Propagate by default when eager, don't propagate in the lazy-loaded tree.
    /**
     * @param {?} state
     * @param {?} propagateUp
     * @param {?} propagateDown
     * @return {?}
     */
    TreeNodeModel.prototype.setSelected = 
    // Propagate by default when eager, don't propagate in the lazy-loaded tree.
    /**
     * @param {?} state
     * @param {?} propagateUp
     * @param {?} propagateDown
     * @return {?}
     */
    function (state, propagateUp, propagateDown) {
        if (state === this.selected.value) {
            return;
        }
        this.selected.next(state);
        if (propagateDown && state !== ClrSelectedState.INDETERMINATE && this.children) {
            this.children.forEach((/**
             * @param {?} child
             * @return {?}
             */
            function (child) { return child.setSelected(state, false, true); }));
        }
        if (propagateUp && this.parent) {
            this.parent._updateSelectionFromChildren();
        }
    };
    /**
     * @param {?} propagate
     * @return {?}
     */
    TreeNodeModel.prototype.toggleSelection = /**
     * @param {?} propagate
     * @return {?}
     */
    function (propagate) {
        // Both unselected and indeterminate toggle to selected
        /** @type {?} */
        var newState = this.selected.value === ClrSelectedState.SELECTED ? ClrSelectedState.UNSELECTED : ClrSelectedState.SELECTED;
        // NOTE: we always propagate selection up in this method because it is only called when the user takes an action.
        // It should never be called from lifecycle hooks or app-provided inputs.
        this.setSelected(newState, true, propagate);
    };
    /**
     * @private
     * @return {?}
     */
    TreeNodeModel.prototype.computeSelectionStateFromChildren = /**
     * @private
     * @return {?}
     */
    function () {
        var e_1, _a;
        /** @type {?} */
        var oneSelected = false;
        /** @type {?} */
        var oneUnselected = false;
        try {
            // Using a good old for loop to exit as soon as we can tell, for better performance on large trees.
            for (var _b = tslib_1.__values(this.children), _c = _b.next(); !_c.done; _c = _b.next()) {
                var child = _c.value;
                switch (child.selected.value) {
                    case ClrSelectedState.INDETERMINATE:
                        return ClrSelectedState.INDETERMINATE;
                    case ClrSelectedState.SELECTED:
                        oneSelected = true;
                        if (oneUnselected) {
                            return ClrSelectedState.INDETERMINATE;
                        }
                        break;
                    case ClrSelectedState.UNSELECTED:
                    default:
                        // Default is the same as unselected, in case an undefined somehow made it all the way here.
                        oneUnselected = true;
                        if (oneSelected) {
                            return ClrSelectedState.INDETERMINATE;
                        }
                        break;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (!oneSelected) {
            return ClrSelectedState.UNSELECTED;
        }
        else if (!oneUnselected) {
            return ClrSelectedState.SELECTED;
        }
    };
    /*
     * Internal, but needs to be called by other nodes
     */
    /*
       * Internal, but needs to be called by other nodes
       */
    /**
     * @return {?}
     */
    TreeNodeModel.prototype._updateSelectionFromChildren = /*
       * Internal, but needs to be called by other nodes
       */
    /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var newState = this.computeSelectionStateFromChildren();
        if (newState === this.selected.value) {
            return;
        }
        this.selected.next(newState);
        if (this.parent) {
            this.parent._updateSelectionFromChildren();
        }
    };
    return TreeNodeModel;
}());
/**
 * @abstract
 * @template T
 */
export { TreeNodeModel };
if (false) {
    /** @type {?} */
    TreeNodeModel.prototype.selected;
    /** @type {?} */
    TreeNodeModel.prototype.model;
    /** @type {?} */
    TreeNodeModel.prototype.parent;
    /** @type {?} */
    TreeNodeModel.prototype.children;
    /** @type {?} */
    TreeNodeModel.prototype.loading;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ub2RlLm1vZGVsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS90cmVlLXZpZXcvbW9kZWxzL3RyZWUtbm9kZS5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBTUEsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDekQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQzs7Ozs7QUFFdkM7Ozs7O0lBQUE7UUFDRSxhQUFRLEdBQUcsSUFBSSxlQUFlLENBQW1CLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUFDOzs7Ozs7UUFpQjlFLFlBQU8sR0FBRyxLQUFLLENBQUM7SUEwRWxCLENBQUM7Ozs7SUF4RUMsK0JBQU87OztJQUFQO1FBQ0Usa0JBQWtCO1FBQ2xCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELDRFQUE0RTs7Ozs7Ozs7SUFDNUUsbUNBQVc7Ozs7Ozs7O0lBQVgsVUFBWSxLQUF1QixFQUFFLFdBQW9CLEVBQUUsYUFBc0I7UUFDL0UsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUU7WUFDakMsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUIsSUFBSSxhQUFhLElBQUksS0FBSyxLQUFLLGdCQUFnQixDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQzlFLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTzs7OztZQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxFQUFyQyxDQUFxQyxFQUFDLENBQUM7U0FDdkU7UUFDRCxJQUFJLFdBQVcsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQzlCLElBQUksQ0FBQyxNQUFNLENBQUMsNEJBQTRCLEVBQUUsQ0FBQztTQUM1QztJQUNILENBQUM7Ozs7O0lBRUQsdUNBQWU7Ozs7SUFBZixVQUFnQixTQUFrQjs7O1lBRTFCLFFBQVEsR0FDWixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssS0FBSyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsUUFBUTtRQUM3RyxpSEFBaUg7UUFDakgseUVBQXlFO1FBQ3pFLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztJQUM5QyxDQUFDOzs7OztJQUVPLHlEQUFpQzs7OztJQUF6Qzs7O1lBQ00sV0FBVyxHQUFHLEtBQUs7O1lBQ25CLGFBQWEsR0FBRyxLQUFLOztZQUN6QixtR0FBbUc7WUFDbkcsS0FBb0IsSUFBQSxLQUFBLGlCQUFBLElBQUksQ0FBQyxRQUFRLENBQUEsZ0JBQUEsNEJBQUU7Z0JBQTlCLElBQU0sS0FBSyxXQUFBO2dCQUNkLFFBQVEsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUU7b0JBQzVCLEtBQUssZ0JBQWdCLENBQUMsYUFBYTt3QkFDakMsT0FBTyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUM7b0JBQ3hDLEtBQUssZ0JBQWdCLENBQUMsUUFBUTt3QkFDNUIsV0FBVyxHQUFHLElBQUksQ0FBQzt3QkFDbkIsSUFBSSxhQUFhLEVBQUU7NEJBQ2pCLE9BQU8sZ0JBQWdCLENBQUMsYUFBYSxDQUFDO3lCQUN2Qzt3QkFDRCxNQUFNO29CQUNSLEtBQUssZ0JBQWdCLENBQUMsVUFBVSxDQUFDO29CQUNqQzt3QkFDRSw0RkFBNEY7d0JBQzVGLGFBQWEsR0FBRyxJQUFJLENBQUM7d0JBQ3JCLElBQUksV0FBVyxFQUFFOzRCQUNmLE9BQU8sZ0JBQWdCLENBQUMsYUFBYSxDQUFDO3lCQUN2Qzt3QkFDRCxNQUFNO2lCQUNUO2FBQ0Y7Ozs7Ozs7OztRQUNELElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDaEIsT0FBTyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUM7U0FDcEM7YUFBTSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3pCLE9BQU8sZ0JBQWdCLENBQUMsUUFBUSxDQUFDO1NBQ2xDO0lBQ0gsQ0FBQztJQUVEOztPQUVHOzs7Ozs7O0lBQ0gsb0RBQTRCOzs7Ozs7SUFBNUI7O1lBQ1EsUUFBUSxHQUFHLElBQUksQ0FBQyxpQ0FBaUMsRUFBRTtRQUN6RCxJQUFJLFFBQVEsS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRTtZQUNwQyxPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM3QixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZixJQUFJLENBQUMsTUFBTSxDQUFDLDRCQUE0QixFQUFFLENBQUM7U0FDNUM7SUFDSCxDQUFDO0lBQ0gsb0JBQUM7QUFBRCxDQUFDLEFBNUZELElBNEZDOzs7Ozs7OztJQTNGQyxpQ0FBOEU7O0lBQzlFLDhCQUFnQjs7SUFRaEIsK0JBQXlDOztJQUN6QyxpQ0FBc0M7O0lBT3RDLGdDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgQ2xyU2VsZWN0ZWRTdGF0ZSB9IGZyb20gJy4vc2VsZWN0ZWQtc3RhdGUuZW51bSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFRyZWVOb2RlTW9kZWw8VD4ge1xuICBzZWxlY3RlZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Q2xyU2VsZWN0ZWRTdGF0ZT4oQ2xyU2VsZWN0ZWRTdGF0ZS5VTlNFTEVDVEVEKTtcbiAgbW9kZWw6IFQgfCBudWxsO1xuICAvKlxuICAgKiBJZGVhbGx5LCBJIHdvdWxkIGxpa2UgdG8gdXNlIGEgcG9seW1vcnBoaWMgdGhpcyB0eXBlIGhlcmUgdG8gZW5zdXJlIGhvbW9nZW5laXR5IG9mIHRoZSB0cmVlLCBzb21ldGhpbmcgbGlrZTpcbiAgICogYWJzdHJhY3QgcGFyZW50OiB0aGlzPFQ+IHwgbnVsbDtcbiAgICogYWJzdHJhY3QgY2hpbGRyZW46IHRoaXM8VD5bXTtcbiAgICogQnV0IEknbSBoaXR0aW5nIGxpbWl0YXRpb25zIG9uIHR5cGVzY3JpcHQgbm90IGFsbG93aW5nIHRoYXQgdHlwZSBpbiBjb25zdHJ1Y3RvcnMgb3Igc3RhdGljIG1ldGhvZHMuXG4gICAqIFNvIEknbSByZXNvcnRpbmcgdG8gZm9yY2luZyBvdmVycmlkZSB3aXRoIG1vcmUgcHJlY2lzZSB0eXBlcyBieSBtYXJraW5nIHRoZXNlIGFic3RyYWN0LlxuICAgKi9cbiAgYWJzdHJhY3QgcGFyZW50OiBUcmVlTm9kZU1vZGVsPFQ+IHwgbnVsbDtcbiAgYWJzdHJhY3QgY2hpbGRyZW46IFRyZWVOb2RlTW9kZWw8VD5bXTtcblxuICAvKlxuICAgKiBCZWluZyBhYmxlIHRvIHB1c2ggdGhpcyBkb3duIHRvIHRoZSBSZWN1cnNpdmVUcmVlTm9kZU1vZGVsIHdvdWxkIHJlcXVpcmUgdG9vIG11Y2ggd29yayBvbiB0aGUgYW5ndWxhciBjb21wb25lbnRzXG4gICAqIHJpZ2h0IG5vdyBmb3IgdGhlbSB0byBrbm93IHdoaWNoIGtpbmQgb2YgbW9kZWwgdGhleSBhcmUgdXNpbmcuIFNvIEknbSBsaWZ0aW5nIHRoZSBwdWJsaWMgcHJvcGVydGllcyB0byB0aGlzXG4gICAqIGFic3RyYWN0IHBhcmVudCBjbGFzcyBmb3Igbm93IGFuZCB3ZSBjYW4gcmV2aXNpdCBpdCBsYXRlciwgd2hlbiB3ZSdyZSBub3QgZmFjaW5nIHN1Y2ggYSBjbG9zZSBkZWFkbGluZS5cbiAgICovXG4gIGxvYWRpbmcgPSBmYWxzZTtcblxuICBkZXN0cm95KCkge1xuICAgIC8vIEp1c3QgdG8gYmUgc2FmZVxuICAgIHRoaXMuc2VsZWN0ZWQuY29tcGxldGUoKTtcbiAgfVxuXG4gIC8vIFByb3BhZ2F0ZSBieSBkZWZhdWx0IHdoZW4gZWFnZXIsIGRvbid0IHByb3BhZ2F0ZSBpbiB0aGUgbGF6eS1sb2FkZWQgdHJlZS5cbiAgc2V0U2VsZWN0ZWQoc3RhdGU6IENsclNlbGVjdGVkU3RhdGUsIHByb3BhZ2F0ZVVwOiBib29sZWFuLCBwcm9wYWdhdGVEb3duOiBib29sZWFuKSB7XG4gICAgaWYgKHN0YXRlID09PSB0aGlzLnNlbGVjdGVkLnZhbHVlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuc2VsZWN0ZWQubmV4dChzdGF0ZSk7XG4gICAgaWYgKHByb3BhZ2F0ZURvd24gJiYgc3RhdGUgIT09IENsclNlbGVjdGVkU3RhdGUuSU5ERVRFUk1JTkFURSAmJiB0aGlzLmNoaWxkcmVuKSB7XG4gICAgICB0aGlzLmNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4gY2hpbGQuc2V0U2VsZWN0ZWQoc3RhdGUsIGZhbHNlLCB0cnVlKSk7XG4gICAgfVxuICAgIGlmIChwcm9wYWdhdGVVcCAmJiB0aGlzLnBhcmVudCkge1xuICAgICAgdGhpcy5wYXJlbnQuX3VwZGF0ZVNlbGVjdGlvbkZyb21DaGlsZHJlbigpO1xuICAgIH1cbiAgfVxuXG4gIHRvZ2dsZVNlbGVjdGlvbihwcm9wYWdhdGU6IGJvb2xlYW4pIHtcbiAgICAvLyBCb3RoIHVuc2VsZWN0ZWQgYW5kIGluZGV0ZXJtaW5hdGUgdG9nZ2xlIHRvIHNlbGVjdGVkXG4gICAgY29uc3QgbmV3U3RhdGUgPVxuICAgICAgdGhpcy5zZWxlY3RlZC52YWx1ZSA9PT0gQ2xyU2VsZWN0ZWRTdGF0ZS5TRUxFQ1RFRCA/IENsclNlbGVjdGVkU3RhdGUuVU5TRUxFQ1RFRCA6IENsclNlbGVjdGVkU3RhdGUuU0VMRUNURUQ7XG4gICAgLy8gTk9URTogd2UgYWx3YXlzIHByb3BhZ2F0ZSBzZWxlY3Rpb24gdXAgaW4gdGhpcyBtZXRob2QgYmVjYXVzZSBpdCBpcyBvbmx5IGNhbGxlZCB3aGVuIHRoZSB1c2VyIHRha2VzIGFuIGFjdGlvbi5cbiAgICAvLyBJdCBzaG91bGQgbmV2ZXIgYmUgY2FsbGVkIGZyb20gbGlmZWN5Y2xlIGhvb2tzIG9yIGFwcC1wcm92aWRlZCBpbnB1dHMuXG4gICAgdGhpcy5zZXRTZWxlY3RlZChuZXdTdGF0ZSwgdHJ1ZSwgcHJvcGFnYXRlKTtcbiAgfVxuXG4gIHByaXZhdGUgY29tcHV0ZVNlbGVjdGlvblN0YXRlRnJvbUNoaWxkcmVuKCkge1xuICAgIGxldCBvbmVTZWxlY3RlZCA9IGZhbHNlO1xuICAgIGxldCBvbmVVbnNlbGVjdGVkID0gZmFsc2U7XG4gICAgLy8gVXNpbmcgYSBnb29kIG9sZCBmb3IgbG9vcCB0byBleGl0IGFzIHNvb24gYXMgd2UgY2FuIHRlbGwsIGZvciBiZXR0ZXIgcGVyZm9ybWFuY2Ugb24gbGFyZ2UgdHJlZXMuXG4gICAgZm9yIChjb25zdCBjaGlsZCBvZiB0aGlzLmNoaWxkcmVuKSB7XG4gICAgICBzd2l0Y2ggKGNoaWxkLnNlbGVjdGVkLnZhbHVlKSB7XG4gICAgICAgIGNhc2UgQ2xyU2VsZWN0ZWRTdGF0ZS5JTkRFVEVSTUlOQVRFOlxuICAgICAgICAgIHJldHVybiBDbHJTZWxlY3RlZFN0YXRlLklOREVURVJNSU5BVEU7XG4gICAgICAgIGNhc2UgQ2xyU2VsZWN0ZWRTdGF0ZS5TRUxFQ1RFRDpcbiAgICAgICAgICBvbmVTZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgaWYgKG9uZVVuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBDbHJTZWxlY3RlZFN0YXRlLklOREVURVJNSU5BVEU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIENsclNlbGVjdGVkU3RhdGUuVU5TRUxFQ1RFRDpcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAvLyBEZWZhdWx0IGlzIHRoZSBzYW1lIGFzIHVuc2VsZWN0ZWQsIGluIGNhc2UgYW4gdW5kZWZpbmVkIHNvbWVob3cgbWFkZSBpdCBhbGwgdGhlIHdheSBoZXJlLlxuICAgICAgICAgIG9uZVVuc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgIGlmIChvbmVTZWxlY3RlZCkge1xuICAgICAgICAgICAgcmV0dXJuIENsclNlbGVjdGVkU3RhdGUuSU5ERVRFUk1JTkFURTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghb25lU2VsZWN0ZWQpIHtcbiAgICAgIHJldHVybiBDbHJTZWxlY3RlZFN0YXRlLlVOU0VMRUNURUQ7XG4gICAgfSBlbHNlIGlmICghb25lVW5zZWxlY3RlZCkge1xuICAgICAgcmV0dXJuIENsclNlbGVjdGVkU3RhdGUuU0VMRUNURUQ7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogSW50ZXJuYWwsIGJ1dCBuZWVkcyB0byBiZSBjYWxsZWQgYnkgb3RoZXIgbm9kZXNcbiAgICovXG4gIF91cGRhdGVTZWxlY3Rpb25Gcm9tQ2hpbGRyZW4oKSB7XG4gICAgY29uc3QgbmV3U3RhdGUgPSB0aGlzLmNvbXB1dGVTZWxlY3Rpb25TdGF0ZUZyb21DaGlsZHJlbigpO1xuICAgIGlmIChuZXdTdGF0ZSA9PT0gdGhpcy5zZWxlY3RlZC52YWx1ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnNlbGVjdGVkLm5leHQobmV3U3RhdGUpO1xuICAgIGlmICh0aGlzLnBhcmVudCkge1xuICAgICAgdGhpcy5wYXJlbnQuX3VwZGF0ZVNlbGVjdGlvbkZyb21DaGlsZHJlbigpO1xuICAgIH1cbiAgfVxufVxuIl19