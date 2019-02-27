/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FiltersProvider } from './filters';
import { Items } from './items';
/** @type {?} */
let nbSelection = 0;
/** @enum {number} */
const SelectionType = {
    None: 0,
    Single: 1,
    Multi: 2,
};
export { SelectionType };
SelectionType[SelectionType.None] = 'None';
SelectionType[SelectionType.Single] = 'Single';
SelectionType[SelectionType.Multi] = 'Multi';
/**
 * @template T
 */
export class Selection {
    // Ref of single selected item
    /**
     * @param {?} _items
     * @param {?} _filters
     */
    constructor(_items, _filters) {
        this._items = _items;
        this._filters = _filters;
        this.prevSelectionRefs = []; // Refs of selected items
        this._selectionType = SelectionType.None;
        this.rowSelectionMode = false;
        /**
         * Ignore items changes in the same change detection cycle.
         */
        // tslint:disable-next-line
        this.debounce = false;
        /**
         * Subscriptions to the other providers changes.
         */
        this.subscriptions = [];
        /**
         * The Observable that lets other classes subscribe to selection changes
         */
        this._change = new Subject();
        this.id = 'clr-dg-selection' + nbSelection++;
        this.subscriptions.push(this._filters.change.subscribe(() => {
            if (!this._selectable) {
                return;
            }
            this.clearSelection();
        }));
        this.subscriptions.push(this._items.allChanges.subscribe(updatedItems => {
            switch (this.selectionType) {
                case SelectionType.None: {
                    break;
                }
                case SelectionType.Single: {
                    /** @type {?} */
                    let newSingle;
                    /** @type {?} */
                    const trackBy = this._items.trackBy;
                    /** @type {?} */
                    let selectionUpdated = false;
                    // if the currentSingle has been set before data was loaded, we look up and save the ref from current data set
                    if (this.currentSingle && !this.prevSingleSelectionRef) {
                        if (this._items.all && this._items.trackBy) {
                            /** @type {?} */
                            const lookup = this._items.all.findIndex(maybe => maybe === this.currentSingle);
                            this.prevSingleSelectionRef = this._items.trackBy(lookup, this.currentSingle);
                        }
                    }
                    updatedItems.forEach((item, index) => {
                        /** @type {?} */
                        const ref = trackBy(index, item);
                        // If one of the updated items is the previously selectedSingle, set it as the new one
                        if (this.prevSingleSelectionRef === ref) {
                            newSingle = item;
                            selectionUpdated = true;
                        }
                    });
                    // If we're using smart datagrids, we expect all items to be present in the updatedItems array.
                    // Therefore, we should delete the currentSingle if it used to be defined but doesn't exist anymore.
                    // No explicit "delete" is required, since newSingle would be undefined at this point.
                    // Marking it as selectionUpdated here will set currentSingle to undefined below in the setTimeout.
                    if (this._items.smart && !newSingle) {
                        selectionUpdated = true;
                    }
                    // TODO: Discussed this with Eudes and this is fine for now.
                    // But we need to figure out a different pattern for the
                    // child triggering the parent change detection problem.
                    // Using setTimeout for now to fix this.
                    setTimeout(() => {
                        if (selectionUpdated) {
                            this.currentSingle = newSingle;
                        }
                    }, 0);
                    break;
                }
                case SelectionType.Multi: {
                    /** @type {?} */
                    let leftOver = this.current.slice();
                    /** @type {?} */
                    const trackBy = this._items.trackBy;
                    /** @type {?} */
                    let selectionUpdated = false;
                    // if the current has been set before data was loaded, we look up and save the ref from current data set
                    if (this.current.length > 0 && this.prevSelectionRefs.length !== this.current.length) {
                        if (this._items.all && this._items.trackBy) {
                            this.prevSelectionRefs = [];
                            this.current.forEach(item => {
                                /** @type {?} */
                                const lookup = this._items.all.findIndex(maybe => maybe === item);
                                this.prevSelectionRefs.push(this._items.trackBy(lookup, item));
                            });
                        }
                    }
                    // TODO: revisit this when we work on https://github.com/vmware/clarity/issues/2342
                    // currently, the selection is cleared when filter is applied, so the logic inside
                    // the if statement below results in broken behavior.
                    if (leftOver.length > 0) {
                        updatedItems.forEach((item, index) => {
                            /** @type {?} */
                            const ref = trackBy(index, item);
                            // Look in current selected refs array if item is selected, and update actual value
                            /** @type {?} */
                            const selectedIndex = this.prevSelectionRefs.indexOf(ref);
                            if (selectedIndex > -1) {
                                leftOver[selectedIndex] = item;
                                selectionUpdated = true;
                            }
                        });
                        // Filter out any unmatched items if we're using smart datagrids where we expect all items to be
                        // present
                        if (this._items.smart) {
                            leftOver = leftOver.filter(selected => updatedItems.indexOf(selected) > -1);
                            if (this.current.length !== leftOver.length) {
                                selectionUpdated = true;
                            }
                        }
                        // TODO: Discussed this with Eudes and this is fine for now.
                        // But we need to figure out a different pattern for the
                        // child triggering the parent change detection problem.
                        // Using setTimeout for now to fix this.
                        setTimeout(() => {
                            if (selectionUpdated) {
                                this.current = leftOver;
                            }
                        }, 0);
                    }
                    break;
                }
                default: {
                    break;
                }
            }
        }));
    }
    /**
     * @return {?}
     */
    clearSelection() {
        this.current.length = 0;
        this.prevSelectionRefs = [];
        this._currentSingle = null;
        this.prevSingleSelectionRef = null;
        this.emitChange();
    }
    /**
     * @return {?}
     */
    get selectionType() {
        return this._selectionType;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set selectionType(value) {
        if (value === this.selectionType) {
            return;
        }
        this._selectionType = value;
        if (value === SelectionType.None) {
            delete this.current;
        }
        else {
            this.updateCurrent([], false);
        }
    }
    /**
     * @return {?}
     */
    get _selectable() {
        return this._selectionType === SelectionType.Multi || this._selectionType === SelectionType.Single;
    }
    /**
     * Cleans up our subscriptions to other providers
     * @return {?}
     */
    destroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
    /**
     * @return {?}
     */
    get currentSingle() {
        return this._currentSingle;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set currentSingle(value) {
        if (value === this._currentSingle) {
            return;
        }
        this._currentSingle = value;
        if (this._items.all && this._items.trackBy && value) {
            /** @type {?} */
            const lookup = this._items.all.findIndex(maybe => maybe === value);
            this.prevSingleSelectionRef = this._items.trackBy(lookup, value);
        }
        this.emitChange();
        // Ignore items changes in the same change detection cycle.
        // @TODO This can likely be removed!
        this.debounce = true;
        setTimeout(() => (this.debounce = false));
    }
    /**
     * @return {?}
     */
    get current() {
        return this._current;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set current(value) {
        this.updateCurrent(value, true);
    }
    /**
     * @param {?} value
     * @param {?} emit
     * @return {?}
     */
    updateCurrent(value, emit) {
        this._current = value;
        if (emit) {
            this.emitChange();
            // Ignore items changes in the same change detection cycle.
            // @TODO This can likely be removed!
            this.debounce = true;
            setTimeout(() => (this.debounce = false));
        }
    }
    /**
     * @return {?}
     */
    emitChange() {
        if (this._selectionType === SelectionType.Single) {
            this._change.next(this.currentSingle);
        }
        else if (this._selectionType === SelectionType.Multi) {
            this._change.next(this.current);
        }
    }
    // We do not want to expose the Subject itself, but the Observable which is read-only
    /**
     * @return {?}
     */
    get change() {
        return this._change.asObservable();
    }
    /**
     * Checks if an item is currently selected
     * @param {?} item
     * @return {?}
     */
    isSelected(item) {
        if (this._selectionType === SelectionType.Single) {
            return this.currentSingle === item;
        }
        else if (this._selectionType === SelectionType.Multi) {
            return this.current.indexOf(item) >= 0;
        }
        return false;
    }
    /**
     * Selects an item
     * @param {?} item
     * @return {?}
     */
    selectItem(item) {
        this.current.push(item);
        if (this._items.trackBy) {
            // Push selected ref onto array
            /** @type {?} */
            const lookup = this._items.all.findIndex(maybe => maybe === item);
            this.prevSelectionRefs.push(this._items.trackBy(lookup, item));
        }
    }
    /**
     * Deselects an item
     * @param {?} indexOfItem
     * @return {?}
     */
    deselectItem(indexOfItem) {
        this.current.splice(indexOfItem, 1);
        if (this._items.trackBy && indexOfItem < this.prevSelectionRefs.length) {
            // Keep selected refs array in sync
            this.prevSelectionRefs.splice(indexOfItem, 1);
        }
    }
    /**
     * Selects or deselects an item
     * @param {?} item
     * @param {?} selected
     * @return {?}
     */
    setSelected(item, selected) {
        switch (this._selectionType) {
            case SelectionType.None:
                break;
            case SelectionType.Single:
                // in single selection, set currentSingle method should be used
                break;
            case SelectionType.Multi:
                /** @type {?} */
                const index = this.current.indexOf(item);
                if (index >= 0 && !selected) {
                    this.deselectItem(index);
                    this.emitChange();
                }
                else if (index < 0 && selected) {
                    this.selectItem(item);
                    this.emitChange();
                }
                break;
            default:
                break;
        }
    }
    /**
     * Checks if all currently displayed items are selected
     * @return {?}
     */
    isAllSelected() {
        if (this._selectionType !== SelectionType.Multi || !this._items.displayed) {
            return false;
        }
        /** @type {?} */
        const displayedItems = this._items.displayed;
        /** @type {?} */
        const nbDisplayed = this._items.displayed.length;
        if (nbDisplayed < 1) {
            return false;
        }
        /** @type {?} */
        const temp = displayedItems.filter(item => this.current.indexOf(item) > -1);
        return temp.length === displayedItems.length;
    }
    /**
     * Selects or deselects all currently displayed items
     * @return {?}
     */
    toggleAll() {
        if (this._selectionType === SelectionType.None || this._selectionType === SelectionType.Single) {
            return;
        }
        /*
             * If every currently displayed item is already selected, we clear them.
             * If at least one item isn't selected, we select every currently displayed item.
             */
        if (this.isAllSelected()) {
            this._items.displayed.forEach(item => {
                /** @type {?} */
                const currentIndex = this.current.indexOf(item);
                if (currentIndex > -1) {
                    this.deselectItem(currentIndex);
                }
            });
        }
        else {
            this._items.displayed.forEach(item => {
                if (this.current.indexOf(item) < 0) {
                    this.selectItem(item);
                }
            });
        }
        this.emitChange();
    }
}
Selection.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Selection.ctorParameters = () => [
    { type: Items },
    { type: FiltersProvider }
];
if (false) {
    /** @type {?} */
    Selection.prototype.id;
    /** @type {?} */
    Selection.prototype.prevSelectionRefs;
    /** @type {?} */
    Selection.prototype.prevSingleSelectionRef;
    /** @type {?} */
    Selection.prototype._selectionType;
    /** @type {?} */
    Selection.prototype.rowSelectionMode;
    /**
     * Ignore items changes in the same change detection cycle.
     * @type {?}
     */
    Selection.prototype.debounce;
    /**
     * Subscriptions to the other providers changes.
     * @type {?}
     */
    Selection.prototype.subscriptions;
    /**
     * The current selection in single selection type
     * @type {?}
     */
    Selection.prototype._currentSingle;
    /**
     * The current selection
     * @type {?}
     */
    Selection.prototype._current;
    /**
     * The Observable that lets other classes subscribe to selection changes
     * @type {?}
     */
    Selection.prototype._change;
    /** @type {?} */
    Selection.prototype._items;
    /** @type {?} */
    Selection.prototype._filters;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9wcm92aWRlcnMvc2VsZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtBLE9BQU8sRUFBRSxVQUFVLEVBQW1CLE1BQU0sZUFBZSxDQUFDO0FBRTVELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFHL0IsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUM1QyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sU0FBUyxDQUFDOztJQUU1QixXQUFXLEdBQVcsQ0FBQzs7O0lBR3pCLE9BQUk7SUFDSixTQUFNO0lBQ04sUUFBSzs7Ozs7Ozs7O0FBSVAsTUFBTSxPQUFPLFNBQVM7Ozs7OztJQUtwQixZQUFvQixNQUFnQixFQUFVLFFBQTRCO1FBQXRELFdBQU0sR0FBTixNQUFNLENBQVU7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFvQjtRQUhsRSxzQkFBaUIsR0FBUSxFQUFFLENBQUMsQ0FBQyx5QkFBeUI7UUFvSXRELG1CQUFjLEdBQWtCLGFBQWEsQ0FBQyxJQUFJLENBQUM7UUFnQnBELHFCQUFnQixHQUFZLEtBQUssQ0FBQzs7Ozs7UUFTakMsYUFBUSxHQUFZLEtBQUssQ0FBQzs7OztRQUsxQixrQkFBYSxHQUFtQixFQUFFLENBQUM7Ozs7UUF5RG5DLFlBQU8sR0FBRyxJQUFJLE9BQU8sRUFBVyxDQUFDO1FBdk52QyxJQUFJLENBQUMsRUFBRSxHQUFHLGtCQUFrQixHQUFHLFdBQVcsRUFBRSxDQUFDO1FBRTdDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ2xDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUNyQixPQUFPO2FBQ1I7WUFDRCxJQUFJLENB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QUMsSUFBSSxDQUFDO2dCQUMvQyxJQUFJLFlBQVksR0FBRyxDQUFDLENBQUMsRUFBRTtvQkFDckIsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQztpQkFDakM7WUFDSCxDQUFDLENBQUMsQ0FBQztTQUNKO2FBQU07WUFDTCxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ25DLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUNsQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUN2QjtZQUNILENBQUMsQ0FBQyxDQUFDO1NBQ0o7UUFDRCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDcEIsQ0FBQzs7O1lBalZGLFVBQVU7Ozs7WUFWRixLQUFLO1lBREwsZUFBZTs7OztJQWF0Qix1QkFBa0I7O0lBQ2xCLHNDQUFvQzs7SUFDcEMsMkNBQWtDOztJQW1JbEMsbUNBQTJEOztJQWdCM0QscUNBQXlDOzs7OztJQVN6Qyw2QkFBa0M7Ozs7O0lBS2xDLGtDQUEyQzs7Ozs7SUFZM0MsbUNBQTBCOzs7OztJQXVCMUIsNkJBQXNCOzs7OztJQXNCdEIsNEJBQXlDOztJQXhON0IsMkJBQXdCOztJQUFFLDZCQUFvQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IEluamVjdGFibGUsIFRyYWNrQnlGdW5jdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IEZpbHRlcnNQcm92aWRlciB9IGZyb20gJy4vZmlsdGVycyc7XG5pbXBvcnQgeyBJdGVtcyB9IGZyb20gJy4vaXRlbXMnO1xuXG5sZXQgbmJTZWxlY3Rpb246IG51bWJlciA9IDA7XG5cbmV4cG9ydCBlbnVtIFNlbGVjdGlvblR5cGUge1xuICBOb25lLFxuICBTaW5nbGUsXG4gIE11bHRpLFxufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2VsZWN0aW9uPFQgPSBhbnk+IHtcbiAgcHVibGljIGlkOiBzdHJpbmc7XG4gIHByaXZhdGUgcHJldlNlbGVjdGlvblJlZnM6IFRbXSA9IFtdOyAvLyBSZWZzIG9mIHNlbGVjdGVkIGl0ZW1zXG4gIHByaXZhdGUgcHJldlNpbmdsZVNlbGVjdGlvblJlZjogVDsgLy8gUmVmIG9mIHNpbmdsZSBzZWxlY3RlZCBpdGVtXG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfaXRlbXM6IEl0ZW1zPFQ+LCBwcml2YXRlIF9maWx0ZXJzOiBGaWx0ZXJzUHJvdmlkZXI8VD4pIHtcbiAgICB0aGlzLmlkID0gJ2Nsci1kZy1zZWxlY3Rpb24nICsgbmJTZWxlY3Rpb24rKztcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5fZmlsdGVycy5jaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLl9zZWxlY3RhYmxlKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5faXRlbXMuYWxsQ2hhbmdlcy5zdWJzY3JpYmUodXBkYXRlZEl0ZW1zID0+IHtcbiAgICAgICAgc3dpdGNoICh0aGlzLnNlbGVjdGlvblR5cGUpIHtcbiAgICAgICAgICBjYXNlIFNlbGVjdGlvblR5cGUuTm9uZToge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY2FzZSBTZWxlY3Rpb25UeXBlLlNpbmdsZToge1xuICAgICAgICAgICAgbGV0IG5ld1NpbmdsZTogYW55O1xuICAgICAgICAgICAgY29uc3QgdHJhY2tCeTogVHJhY2tCeUZ1bmN0aW9uPFQ+ID0gdGhpcy5faXRlbXMudHJhY2tCeTtcbiAgICAgICAgICAgIGxldCBzZWxlY3Rpb25VcGRhdGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAgICAgICAgIC8vIGlmIHRoZSBjdXJyZW50U2luZ2xlIGhhcyBiZWVuIHNldCBiZWZvcmUgZGF0YSB3YXMgbG9hZGVkLCB3ZSBsb29rIHVwIGFuZCBzYXZlIHRoZSByZWYgZnJvbSBjdXJyZW50IGRhdGEgc2V0XG4gICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50U2luZ2xlICYmICF0aGlzLnByZXZTaW5nbGVTZWxlY3Rpb25SZWYpIHtcbiAgICAgICAgICAgICAgaWYgKHRoaXMuX2l0ZW1zLmFsbCAmJiB0aGlzLl9pdGVtcy50cmFja0J5KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbG9va3VwID0gdGhpcy5faXRlbXMuYWxsLmZpbmRJbmRleChtYXliZSA9PiBtYXliZSA9PT0gdGhpcy5jdXJyZW50U2luZ2xlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnByZXZTaW5nbGVTZWxlY3Rpb25SZWYgPSB0aGlzLl9pdGVtcy50cmFja0J5KGxvb2t1cCwgdGhpcy5jdXJyZW50U2luZ2xlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB1cGRhdGVkSXRlbXMuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgcmVmID0gdHJhY2tCeShpbmRleCwgaXRlbSk7XG4gICAgICAgICAgICAgIC8vIElmIG9uZSBvZiB0aGUgdXBkYXRlZCBpdGVtcyBpcyB0aGUgcHJldmlvdXNseSBzZWxlY3RlZFNpbmdsZSwgc2V0IGl0IGFzIHRoZSBuZXcgb25lXG4gICAgICAgICAgICAgIGlmICh0aGlzLnByZXZTaW5nbGVTZWxlY3Rpb25SZWYgPT09IHJlZikge1xuICAgICAgICAgICAgICAgIG5ld1NpbmdsZSA9IGl0ZW07XG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uVXBkYXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBJZiB3ZSdyZSB1c2luZyBzbWFydCBkYXRhZ3JpZHMsIHdlIGV4cGVjdCBhbGwgaXRlbXMgdG8gYmUgcHJlc2VudCBpbiB0aGUgdXBkYXRlZEl0ZW1zIGFycmF5LlxuICAgICAgICAgICAgLy8gVGhlcmVmb3JlLCB3ZSBzaG91bGQgZGVsZXRlIHRoZSBjdXJyZW50U2luZ2xlIGlmIGl0IHVzZWQgdG8gYmUgZGVmaW5lZCBidXQgZG9lc24ndCBleGlzdCBhbnltb3JlLlxuICAgICAgICAgICAgLy8gTm8gZXhwbGljaXQgXCJkZWxldGVcIiBpcyByZXF1aXJlZCwgc2luY2UgbmV3U2luZ2xlIHdvdWxkIGJlIHVuZGVmaW5lZCBhdCB0aGlzIHBvaW50LlxuICAgICAgICAgICAgLy8gTWFya2luZyBpdCBhcyBzZWxlY3Rpb25VcGRhdGVkIGhlcmUgd2lsbCBzZXQgY3VycmVudFNpbmdsZSB0byB1bmRlZmluZWQgYmVsb3cgaW4gdGhlIHNldFRpbWVvdXQuXG4gICAgICAgICAgICBpZiAodGhpcy5faXRlbXMuc21hcnQgJiYgIW5ld1NpbmdsZSkge1xuICAgICAgICAgICAgICBzZWxlY3Rpb25VcGRhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gVE9ETzogRGlzY3Vzc2VkIHRoaXMgd2l0aCBFdWRlcyBhbmQgdGhpcyBpcyBmaW5lIGZvciBub3cuXG4gICAgICAgICAgICAvLyBCdXQgd2UgbmVlZCB0byBmaWd1cmUgb3V0IGEgZGlmZmVyZW50IHBhdHRlcm4gZm9yIHRoZVxuICAgICAgICAgICAgLy8gY2hpbGQgdHJpZ2dlcmluZyB0aGUgcGFyZW50IGNoYW5nZSBkZXRlY3Rpb24gcHJvYmxlbS5cbiAgICAgICAgICAgIC8vIFVzaW5nIHNldFRpbWVvdXQgZm9yIG5vdyB0byBmaXggdGhpcy5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoc2VsZWN0aW9uVXBkYXRlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFNpbmdsZSA9IG5ld1NpbmdsZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjYXNlIFNlbGVjdGlvblR5cGUuTXVsdGk6IHtcbiAgICAgICAgICAgIGxldCBsZWZ0T3ZlcjogYW55W10gPSB0aGlzLmN1cnJlbnQuc2xpY2UoKTtcbiAgICAgICAgICAgIGNvbnN0IHRyYWNrQnk6IFRyYWNrQnlGdW5jdGlvbjxhbnk+ID0gdGhpcy5faXRlbXMudHJhY2tCeTtcbiAgICAgICAgICAgIGxldCBzZWxlY3Rpb25VcGRhdGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAgICAgICAgIC8vIGlmIHRoZSBjdXJyZW50IGhhcyBiZWVuIHNldCBiZWZvcmUgZGF0YSB3YXMgbG9hZGVkLCB3ZSBsb29rIHVwIGFuZCBzYXZlIHRoZSByZWYgZnJvbSBjdXJyZW50IGRhdGEgc2V0XG4gICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50Lmxlbmd0aCA+IDAgJiYgdGhpcy5wcmV2U2VsZWN0aW9uUmVmcy5sZW5ndGggIT09IHRoaXMuY3VycmVudC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgaWYgKHRoaXMuX2l0ZW1zLmFsbCAmJiB0aGlzLl9pdGVtcy50cmFja0J5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcmV2U2VsZWN0aW9uUmVmcyA9IFtdO1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudC5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgICAgY29uc3QgbG9va3VwID0gdGhpcy5faXRlbXMuYWxsLmZpbmRJbmRleChtYXliZSA9PiBtYXliZSA9PT0gaXRlbSk7XG4gICAgICAgICAgICAgICAgICB0aGlzLnByZXZTZWxlY3Rpb25SZWZzLnB1c2godGhpcy5faXRlbXMudHJhY2tCeShsb29rdXAsIGl0ZW0pKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBUT0RPOiByZXZpc2l0IHRoaXMgd2hlbiB3ZSB3b3JrIG9uIGh0dHBzOi8vZ2l0aHViLmNvbS92bXdhcmUvY2xhcml0eS9pc3N1ZXMvMjM0MlxuICAgICAgICAgICAgLy8gY3VycmVudGx5LCB0aGUgc2VsZWN0aW9uIGlzIGNsZWFyZWQgd2hlbiBmaWx0ZXIgaXMgYXBwbGllZCwgc28gdGhlIGxvZ2ljIGluc2lkZVxuICAgICAgICAgICAgLy8gdGhlIGlmIHN0YXRlbWVudCBiZWxvdyByZXN1bHRzIGluIGJyb2tlbiBiZWhhdmlvci5cbiAgICAgICAgICAgIGlmIChsZWZ0T3Zlci5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgIHVwZGF0ZWRJdGVtcy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlZiA9IHRyYWNrQnkoaW5kZXgsIGl0ZW0pO1xuICAgICAgICAgICAgICAgIC8vIExvb2sgaW4gY3VycmVudCBzZWxlY3RlZCByZWZzIGFycmF5IGlmIGl0ZW0gaXMgc2VsZWN0ZWQsIGFuZCB1cGRhdGUgYWN0dWFsIHZhbHVlXG4gICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRJbmRleCA9IHRoaXMucHJldlNlbGVjdGlvblJlZnMuaW5kZXhPZihyZWYpO1xuICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZEluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgIGxlZnRPdmVyW3NlbGVjdGVkSW5kZXhdID0gaXRlbTtcbiAgICAgICAgICAgICAgICAgIHNlbGVjdGlvblVwZGF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgLy8gRmlsdGVyIG91dCBhbnkgdW5tYXRjaGVkIGl0ZW1zIGlmIHdlJ3JlIHVzaW5nIHNtYXJ0IGRhdGFncmlkcyB3aGVyZSB3ZSBleHBlY3QgYWxsIGl0ZW1zIHRvIGJlXG4gICAgICAgICAgICAgIC8vIHByZXNlbnRcbiAgICAgICAgICAgICAgaWYgKHRoaXMuX2l0ZW1zLnNtYXJ0KSB7XG4gICAgICAgICAgICAgICAgbGVmdE92ZXIgPSBsZWZ0T3Zlci5maWx0ZXIoc2VsZWN0ZWQgPT4gdXBkYXRlZEl0ZW1zLmluZGV4T2Yoc2VsZWN0ZWQpID4gLTEpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnQubGVuZ3RoICE9PSBsZWZ0T3Zlci5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgIHNlbGVjdGlvblVwZGF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIC8vIFRPRE86IERpc2N1c3NlZCB0aGlzIHdpdGggRXVkZXMgYW5kIHRoaXMgaXMgZmluZSBmb3Igbm93LlxuICAgICAgICAgICAgICAvLyBCdXQgd2UgbmVlZCB0byBmaWd1cmUgb3V0IGEgZGlmZmVyZW50IHBhdHRlcm4gZm9yIHRoZVxuICAgICAgICAgICAgICAvLyBjaGlsZCB0cmlnZ2VyaW5nIHRoZSBwYXJlbnQgY2hhbmdlIGRldGVjdGlvbiBwcm9ibGVtLlxuICAgICAgICAgICAgICAvLyBVc2luZyBzZXRUaW1lb3V0IGZvciBub3cgdG8gZml4IHRoaXMuXG4gICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChzZWxlY3Rpb25VcGRhdGVkKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnQgPSBsZWZ0T3ZlcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZGVmYXVsdDoge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgY2xlYXJTZWxlY3Rpb24oKTogdm9pZCB7XG4gICAgdGhpcy5jdXJyZW50Lmxlbmd0aCA9IDA7XG4gICAgdGhpcy5wcmV2U2VsZWN0aW9uUmVmcyA9IFtdO1xuICAgIHRoaXMuX2N1cnJlbnRTaW5nbGUgPSBudWxsO1xuICAgIHRoaXMucHJldlNpbmdsZVNlbGVjdGlvblJlZiA9IG51bGw7XG4gICAgdGhpcy5lbWl0Q2hhbmdlKCk7XG4gIH1cblxuICBwcml2YXRlIF9zZWxlY3Rpb25UeXBlOiBTZWxlY3Rpb25UeXBlID0gU2VsZWN0aW9uVHlwZS5Ob25lO1xuICBwdWJsaWMgZ2V0IHNlbGVjdGlvblR5cGUoKTogU2VsZWN0aW9uVHlwZSB7XG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGlvblR5cGU7XG4gIH1cbiAgcHVibGljIHNldCBzZWxlY3Rpb25UeXBlKHZhbHVlOiBTZWxlY3Rpb25UeXBlKSB7XG4gICAgaWYgKHZhbHVlID09PSB0aGlzLnNlbGVjdGlvblR5cGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fc2VsZWN0aW9uVHlwZSA9IHZhbHVlO1xuICAgIGlmICh2YWx1ZSA9PT0gU2VsZWN0aW9uVHlwZS5Ob25lKSB7XG4gICAgICBkZWxldGUgdGhpcy5jdXJyZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnVwZGF0ZUN1cnJlbnQoW10sIGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgcm93U2VsZWN0aW9uTW9kZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIHByaXZhdGUgZ2V0IF9zZWxlY3RhYmxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9zZWxlY3Rpb25UeXBlID09PSBTZWxlY3Rpb25UeXBlLk11bHRpIHx8IHRoaXMuX3NlbGVjdGlvblR5cGUgPT09IFNlbGVjdGlvblR5cGUuU2luZ2xlO1xuICB9XG4gIC8qKlxuICAgKiBJZ25vcmUgaXRlbXMgY2hhbmdlcyBpbiB0aGUgc2FtZSBjaGFuZ2UgZGV0ZWN0aW9uIGN5Y2xlLlxuICAgKi9cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lXG4gIHByaXZhdGUgZGVib3VuY2U6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKipcbiAgICogU3Vic2NyaXB0aW9ucyB0byB0aGUgb3RoZXIgcHJvdmlkZXJzIGNoYW5nZXMuXG4gICAqL1xuICBwcml2YXRlIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgLyoqXG4gICAqIENsZWFucyB1cCBvdXIgc3Vic2NyaXB0aW9ucyB0byBvdGhlciBwcm92aWRlcnNcbiAgICovXG4gIHB1YmxpYyBkZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHN1YiA9PiBzdWIudW5zdWJzY3JpYmUoKSk7XG4gIH1cblxuICAvKipcbiAgICogVGhlIGN1cnJlbnQgc2VsZWN0aW9uIGluIHNpbmdsZSBzZWxlY3Rpb24gdHlwZVxuICAgKi9cbiAgcHJpdmF0ZSBfY3VycmVudFNpbmdsZTogVDtcbiAgcHVibGljIGdldCBjdXJyZW50U2luZ2xlKCk6IFQge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50U2luZ2xlO1xuICB9XG4gIHB1YmxpYyBzZXQgY3VycmVudFNpbmdsZSh2YWx1ZTogVCkge1xuICAgIGlmICh2YWx1ZSA9PT0gdGhpcy5fY3VycmVudFNpbmdsZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9jdXJyZW50U2luZ2xlID0gdmFsdWU7XG4gICAgaWYgKHRoaXMuX2l0ZW1zLmFsbCAmJiB0aGlzLl9pdGVtcy50cmFja0J5ICYmIHZhbHVlKSB7XG4gICAgICBjb25zdCBsb29rdXAgPSB0aGlzLl9pdGVtcy5hbGwuZmluZEluZGV4KG1heWJlID0+IG1heWJlID09PSB2YWx1ZSk7XG4gICAgICB0aGlzLnByZXZTaW5nbGVTZWxlY3Rpb25SZWYgPSB0aGlzLl9pdGVtcy50cmFja0J5KGxvb2t1cCwgdmFsdWUpO1xuICAgIH1cbiAgICB0aGlzLmVtaXRDaGFuZ2UoKTtcbiAgICAvLyBJZ25vcmUgaXRlbXMgY2hhbmdlcyBpbiB0aGUgc2FtZSBjaGFuZ2UgZGV0ZWN0aW9uIGN5Y2xlLlxuICAgIC8vIEBUT0RPIFRoaXMgY2FuIGxpa2VseSBiZSByZW1vdmVkIVxuICAgIHRoaXMuZGVib3VuY2UgPSB0cnVlO1xuICAgIHNldFRpbWVvdXQoKCkgPT4gKHRoaXMuZGVib3VuY2UgPSBmYWxzZSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBjdXJyZW50IHNlbGVjdGlvblxuICAgKi9cbiAgcHJpdmF0ZSBfY3VycmVudDogVFtdO1xuICBwdWJsaWMgZ2V0IGN1cnJlbnQoKTogVFtdIHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudDtcbiAgfVxuICBwdWJsaWMgc2V0IGN1cnJlbnQodmFsdWU6IFRbXSkge1xuICAgIHRoaXMudXBkYXRlQ3VycmVudCh2YWx1ZSwgdHJ1ZSk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlQ3VycmVudCh2YWx1ZTogVFtdLCBlbWl0OiBib29sZWFuKSB7XG4gICAgdGhpcy5fY3VycmVudCA9IHZhbHVlO1xuICAgIGlmIChlbWl0KSB7XG4gICAgICB0aGlzLmVtaXRDaGFuZ2UoKTtcbiAgICAgIC8vIElnbm9yZSBpdGVtcyBjaGFuZ2VzIGluIHRoZSBzYW1lIGNoYW5nZSBkZXRlY3Rpb24gY3ljbGUuXG4gICAgICAvLyBAVE9ETyBUaGlzIGNhbiBsaWtlbHkgYmUgcmVtb3ZlZCFcbiAgICAgIHRoaXMuZGVib3VuY2UgPSB0cnVlO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiAodGhpcy5kZWJvdW5jZSA9IGZhbHNlKSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBPYnNlcnZhYmxlIHRoYXQgbGV0cyBvdGhlciBjbGFzc2VzIHN1YnNjcmliZSB0byBzZWxlY3Rpb24gY2hhbmdlc1xuICAgKi9cbiAgcHJpdmF0ZSBfY2hhbmdlID0gbmV3IFN1YmplY3Q8VFtdIHwgVD4oKTtcbiAgcHJpdmF0ZSBlbWl0Q2hhbmdlKCkge1xuICAgIGlmICh0aGlzLl9zZWxlY3Rpb25UeXBlID09PSBTZWxlY3Rpb25UeXBlLlNpbmdsZSkge1xuICAgICAgdGhpcy5fY2hhbmdlLm5leHQodGhpcy5jdXJyZW50U2luZ2xlKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX3NlbGVjdGlvblR5cGUgPT09IFNlbGVjdGlvblR5cGUuTXVsdGkpIHtcbiAgICAgIHRoaXMuX2NoYW5nZS5uZXh0KHRoaXMuY3VycmVudCk7XG4gICAgfVxuICB9XG4gIC8vIFdlIGRvIG5vdCB3YW50IHRvIGV4cG9zZSB0aGUgU3ViamVjdCBpdHNlbGYsIGJ1dCB0aGUgT2JzZXJ2YWJsZSB3aGljaCBpcyByZWFkLW9ubHlcbiAgcHVibGljIGdldCBjaGFuZ2UoKTogT2JzZXJ2YWJsZTxUW10gfCBUPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NoYW5nZS5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgYW4gaXRlbSBpcyBjdXJyZW50bHkgc2VsZWN0ZWRcbiAgICovXG4gIHB1YmxpYyBpc1NlbGVjdGVkKGl0ZW06IFQpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5fc2VsZWN0aW9uVHlwZSA9PT0gU2VsZWN0aW9uVHlwZS5TaW5nbGUpIHtcbiAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRTaW5nbGUgPT09IGl0ZW07XG4gICAgfSBlbHNlIGlmICh0aGlzLl9zZWxlY3Rpb25UeXBlID09PSBTZWxlY3Rpb25UeXBlLk11bHRpKSB7XG4gICAgICByZXR1cm4gdGhpcy5jdXJyZW50LmluZGV4T2YoaXRlbSkgPj0gMDtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlbGVjdHMgYW4gaXRlbVxuICAgKi9cbiAgcHJpdmF0ZSBzZWxlY3RJdGVtKGl0ZW06IFQpOiB2b2lkIHtcbiAgICB0aGlzLmN1cnJlbnQucHVzaChpdGVtKTtcbiAgICBpZiAodGhpcy5faXRlbXMudHJhY2tCeSkge1xuICAgICAgLy8gUHVzaCBzZWxlY3RlZCByZWYgb250byBhcnJheVxuICAgICAgY29uc3QgbG9va3VwID0gdGhpcy5faXRlbXMuYWxsLmZpbmRJbmRleChtYXliZSA9PiBtYXliZSA9PT0gaXRlbSk7XG4gICAgICB0aGlzLnByZXZTZWxlY3Rpb25SZWZzLnB1c2godGhpcy5faXRlbXMudHJhY2tCeShsb29rdXAsIGl0ZW0pKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGVzZWxlY3RzIGFuIGl0ZW1cbiAgICovXG4gIHByaXZhdGUgZGVzZWxlY3RJdGVtKGluZGV4T2ZJdGVtOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLmN1cnJlbnQuc3BsaWNlKGluZGV4T2ZJdGVtLCAxKTtcbiAgICBpZiAodGhpcy5faXRlbXMudHJhY2tCeSAmJiBpbmRleE9mSXRlbSA8IHRoaXMucHJldlNlbGVjdGlvblJlZnMubGVuZ3RoKSB7XG4gICAgICAvLyBLZWVwIHNlbGVjdGVkIHJlZnMgYXJyYXkgaW4gc3luY1xuICAgICAgdGhpcy5wcmV2U2VsZWN0aW9uUmVmcy5zcGxpY2UoaW5kZXhPZkl0ZW0sIDEpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZWxlY3RzIG9yIGRlc2VsZWN0cyBhbiBpdGVtXG4gICAqL1xuICBwdWJsaWMgc2V0U2VsZWN0ZWQoaXRlbTogVCwgc2VsZWN0ZWQ6IGJvb2xlYW4pIHtcbiAgICBzd2l0Y2ggKHRoaXMuX3NlbGVjdGlvblR5cGUpIHtcbiAgICAgIGNhc2UgU2VsZWN0aW9uVHlwZS5Ob25lOlxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgU2VsZWN0aW9uVHlwZS5TaW5nbGU6XG4gICAgICAgIC8vIGluIHNpbmdsZSBzZWxlY3Rpb24sIHNldCBjdXJyZW50U2luZ2xlIG1ldGhvZCBzaG91bGQgYmUgdXNlZFxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgU2VsZWN0aW9uVHlwZS5NdWx0aTpcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmN1cnJlbnQuaW5kZXhPZihpdGVtKTtcbiAgICAgICAgaWYgKGluZGV4ID49IDAgJiYgIXNlbGVjdGVkKSB7XG4gICAgICAgICAgdGhpcy5kZXNlbGVjdEl0ZW0oaW5kZXgpO1xuICAgICAgICAgIHRoaXMuZW1pdENoYW5nZSgpO1xuICAgICAgICB9IGVsc2UgaWYgKGluZGV4IDwgMCAmJiBzZWxlY3RlZCkge1xuICAgICAgICAgIHRoaXMuc2VsZWN0SXRlbShpdGVtKTtcbiAgICAgICAgICB0aGlzLmVtaXRDaGFuZ2UoKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgYWxsIGN1cnJlbnRseSBkaXNwbGF5ZWQgaXRlbXMgYXJlIHNlbGVjdGVkXG4gICAqL1xuICBwdWJsaWMgaXNBbGxTZWxlY3RlZCgpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5fc2VsZWN0aW9uVHlwZSAhPT0gU2VsZWN0aW9uVHlwZS5NdWx0aSB8fCAhdGhpcy5faXRlbXMuZGlzcGxheWVkKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IGRpc3BsYXllZEl0ZW1zOiBUW10gPSB0aGlzLl9pdGVtcy5kaXNwbGF5ZWQ7XG4gICAgY29uc3QgbmJEaXNwbGF5ZWQgPSB0aGlzLl9pdGVtcy5kaXNwbGF5ZWQubGVuZ3RoO1xuICAgIGlmIChuYkRpc3BsYXllZCA8IDEpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgdGVtcDogVFtdID0gZGlzcGxheWVkSXRlbXMuZmlsdGVyKGl0ZW0gPT4gdGhpcy5jdXJyZW50LmluZGV4T2YoaXRlbSkgPiAtMSk7XG4gICAgcmV0dXJuIHRlbXAubGVuZ3RoID09PSBkaXNwbGF5ZWRJdGVtcy5sZW5ndGg7XG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0cyBvciBkZXNlbGVjdHMgYWxsIGN1cnJlbnRseSBkaXNwbGF5ZWQgaXRlbXNcbiAgICovXG4gIHB1YmxpYyB0b2dnbGVBbGwoKSB7XG4gICAgaWYgKHRoaXMuX3NlbGVjdGlvblR5cGUgPT09IFNlbGVjdGlvblR5cGUuTm9uZSB8fCB0aGlzLl9zZWxlY3Rpb25UeXBlID09PSBTZWxlY3Rpb25UeXBlLlNpbmdsZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvKlxuICAgICAgICAgKiBJZiBldmVyeSBjdXJyZW50bHkgZGlzcGxheWVkIGl0ZW0gaXMgYWxyZWFkeSBzZWxlY3RlZCwgd2UgY2xlYXIgdGhlbS5cbiAgICAgICAgICogSWYgYXQgbGVhc3Qgb25lIGl0ZW0gaXNuJ3Qgc2VsZWN0ZWQsIHdlIHNlbGVjdCBldmVyeSBjdXJyZW50bHkgZGlzcGxheWVkIGl0ZW0uXG4gICAgICAgICAqL1xuICAgIGlmICh0aGlzLmlzQWxsU2VsZWN0ZWQoKSkge1xuICAgICAgdGhpcy5faXRlbXMuZGlzcGxheWVkLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRJbmRleCA9IHRoaXMuY3VycmVudC5pbmRleE9mKGl0ZW0pO1xuICAgICAgICBpZiAoY3VycmVudEluZGV4ID4gLTEpIHtcbiAgICAgICAgICB0aGlzLmRlc2VsZWN0SXRlbShjdXJyZW50SW5kZXgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faXRlbXMuZGlzcGxheWVkLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnQuaW5kZXhPZihpdGVtKSA8IDApIHtcbiAgICAgICAgICB0aGlzLnNlbGVjdEl0ZW0oaXRlbSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLmVtaXRDaGFuZ2UoKTtcbiAgfVxufVxuIl19