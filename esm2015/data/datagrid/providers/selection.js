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
import { SelectionType } from '../enums/selection-type';
/** @type {?} */
let nbSelection = 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9wcm92aWRlcnMvc2VsZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtBLE9BQU8sRUFBRSxVQUFVLEVBQW1CLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFBYyxPQUFPLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBRXpELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDNUMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUNoQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0seUJBQXlCLENBQUM7O0lBRXBELFdBQVcsR0FBVyxDQUFDOzs7O0FBRzNCLE1BQU0sT0FBTyxTQUFTOzs7Ozs7SUFLcEIsWUFBb0IsTUFBZ0IsRUFBVSxRQUE0QjtRQUF0RCxXQUFNLEdBQU4sTUFBTSxDQUFVO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBb0I7UUFIbEUsc0JBQWlCLEdBQVEsRUFBRSxDQUFDLENBQUMseUJBQXlCO1FBb0l0RCxtQkFBYyxHQUFrQixhQUFhLENBQUMsSUFBSSxDQUFDO1FBZ0JwRCxxQkFBZ0IsR0FBWSxLQUFLLENBQUM7Ozs7O1FBU2pDLGFBQVEsR0FBWSxLQUFLLENBQUM7Ozs7UUFLMUIsa0JBQWEsR0FBbUIsRUFBRSxDQUFDOzs7O1FBeURuQyxZQUFPLEdBQUcsSUFBSSxPQUFPLEVBQVcsQ0FBQztRQXZOdkMsSUFBSSxDQUFDLEVBQUUsR0FBRyxrQkFBa0IsR0FBRyxXQUFXLEVBQUUsQ0FBQztRQUU3QyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUNsQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDckIsT0FBTzthQUNSO1lBQ0QsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3hCLENBQUMsQ0FBQyxDQUNILENBQUM7UUFFRixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FDckIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxFQUFFO1lBQzlDLFFBQVEsSUFBSSxDQUFDLGFBQWEsRUFBRTtnQkFDMUIsS0FBSyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3ZCLE1BQU07aUJBQ1A7Z0JBRUQsS0FBSyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7O3dCQUNyQixTQUFjOzswQkFDWixPQUFPLEdBQXVCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTzs7d0JBQ25ELGdCQUFnQixHQUFZLEtBQUs7b0JBRXJDLDhHQUE4RztvQkFDOUcsSUFBSSxJQUFJLENBQUMsYUFBYSxJQUFJLENBQUMsSUFBSSxDQUFDLHNCQUFzQixFQUFFO3dCQUN0RCxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFOztrQ0FDcEMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsYUFBYSxDQUFDOzRCQUMvRSxJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQzt5QkFDL0U7cUJBQ0Y7b0JBRUQsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTs7OEJBQzdCLEdBQUcsR0FBRyxPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQzt3QkFDaEMsc0ZBQXNGO3dCQUN0RixJQUFJLElBQUksQ0FBQyxzQkFBc0IsS0FBSyxHQUFHLEVBQUU7NEJBQ3ZDLFNBQVMsR0FBRyxJQUFJLENBQUM7NEJBQ2pCLGdCQUFnQixHQUFHLElBQUksQ0FBQzt5QkFDekI7b0JBQ0gsQ0FBQyxDQUFDLENBQUM7b0JBRUgsK0ZBQStGO29CQUMvRixvR0FBb0c7b0JBQ3BHLHNGQUFzRjtvQkFDdEYsbUdBQW1HO29CQUNuRyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJLENBQUMsU0FBUyxFQUFFO3dCQUNuQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7cUJBQ3pCO29CQUVELDREQUE0RDtvQkFDNUQsd0RBQXdEO29CQUN4RCx3REFBd0Q7b0JBQ3hELHdDQUF3QztvQkFDeEMsVUFBVSxDQUFDLEdBQUcsRUFBRTt3QkFDZCxJQUFJLGdCQUFnQixFQUFFOzRCQUNwQixJQUFJLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQzt5QkFDaEM7b0JBQ0gsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUNOLE1BQU07aUJBQ1A7Z0JBRUQsS0FBSyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7O3dCQUNwQixRQUFRLEdBQVUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUU7OzBCQUNwQyxPQUFPLEdBQXlCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTzs7d0JBQ3JELGdCQUFnQixHQUFZLEtBQUs7b0JBRXJDLHdHQUF3RztvQkFDeEcsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRTt3QkFDcEYsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRTs0QkFDMUMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEVBQUUsQ0FBQzs0QkFDNUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7O3NDQUNwQixNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQztnQ0FDakUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQzs0QkFDakUsQ0FBQyxDQUFDLENBQUM7eUJBQ0o7cUJBQ0Y7b0JBRUQsbUZBQW1GO29CQUNuRixrRkFBa0Y7b0JBQ2xGLHFEQUFxRDtvQkFDckQsSUFBSSxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTt3QkFDdkIsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTs7a0NBQzdCLEdBQUcsR0FBRyxPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQzs7O2tDQUUxQixhQUFhLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7NEJBQ3pELElBQUksYUFBYSxHQUFHLENBQUMsQ0FBQyxFQUFFO2dDQUN0QixRQUFRLENBQUMsYUFBYSxDQUFDLEdBQUcsSUFBSSxDQUFDO2dDQUMvQixnQkFBZ0IsR0FBRyxJQUFJLENBQUM7NkJBQ3pCO3dCQUNILENBQUMsQ0FBQyxDQUFDO3dCQUVILGdHQUFnRzt3QkFDaEcsVUFBVTt3QkFDVixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFOzRCQUNyQixRQUFRLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDNUUsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sS0FBSyxRQUFRLENBQUMsTUFBTSxFQUFFO2dDQUMzQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7NkJBQ3pCO3lCQUNGO3dCQUVELDREQUE0RDt3QkFDNUQsd0RBQXdEO3dCQUN4RCx3REFBd0Q7d0JBQ3hELHdDQUF3Qzt3QkFDeEMsVUFBVSxDQUFDLEdBQUcsRUFBRTs0QkFDZCxJQUFJLGdCQUFnQixFQUFFO2dDQUNwQixJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQzs2QkFDekI7d0JBQ0gsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO3FCQUNQO29CQUNELE1BQU07aUJBQ1A7Z0JBRUQsT0FBTyxDQUFDLENBQUM7b0JBQ1AsTUFBTTtpQkFDUDthQUNGO1FBQ0gsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7Ozs7SUFFTSxjQUFjO1FBQ25CLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1FBQzNCLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUM7UUFDbkMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3BCLENBQUM7Ozs7SUFHRCxJQUFXLGFBQWE7UUFDdEIsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO0lBQzdCLENBQUM7Ozs7O0lBQ0QsSUFBVyxhQUFhLENBQUMsS0FBb0I7UUFDM0MsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUNoQyxPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztRQUM1QixJQUFJLEtBQUssS0FBSyxhQUFhLENBQUMsSUFBSSxFQUFFO1lBQ2hDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztTQUNyQjthQUFNO1lBQ0wsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDL0I7SUFDSCxDQUFDOzs7O0lBSUQsSUFBWSxXQUFXO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLGNBQWMsS0FBSyxhQUFhLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxjQUFjLEtBQUssYUFBYSxDQUFDLE1BQU0sQ0FBQztJQUNyRyxDQUFDOzs7OztJQWVNLE9BQU87UUFDWixJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7Ozs7SUFNRCxJQUFXLGFBQWE7UUFDdEIsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO0lBQzdCLENBQUM7Ozs7O0lBQ0QsSUFBVyxhQUFhLENBQUMsS0FBUTtRQUMvQixJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ2pDLE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO1FBQzVCLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLElBQUksS0FBSyxFQUFFOztrQkFDN0MsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssS0FBSyxLQUFLLENBQUM7WUFDbEUsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztTQUNsRTtRQUNELElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNsQiwyREFBMkQ7UUFDM0Qsb0NBQW9DO1FBQ3BDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUM1QyxDQUFDOzs7O0lBTUQsSUFBVyxPQUFPO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDOzs7OztJQUNELElBQVcsT0FBTyxDQUFDLEtBQVU7UUFDM0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbEMsQ0FBQzs7Ozs7O0lBRU0sYUFBYSxDQUFDLEtBQVUsRUFBRSxJQUFhO1FBQzVDLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLElBQUksSUFBSSxFQUFFO1lBQ1IsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ2xCLDJEQUEyRDtZQUMzRCxvQ0FBb0M7WUFDcEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDckIsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQzNDO0lBQ0gsQ0FBQzs7OztJQU1PLFVBQVU7UUFDaEIsSUFBSSxJQUFJLENBQUMsY0FBYyxLQUFLLGFBQWEsQ0FBQyxNQUFNLEVBQUU7WUFDaEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQ3ZDO2FBQU0sSUFBSSxJQUFJLENBQUMsY0FBYyxLQUFLLGFBQWEsQ0FBQyxLQUFLLEVBQUU7WUFDdEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ2pDO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxJQUFXLE1BQU07UUFDZixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDckMsQ0FBQzs7Ozs7O0lBS00sVUFBVSxDQUFDLElBQU87UUFDdkIsSUFBSSxJQUFJLENBQUMsY0FBYyxLQUFLLGFBQWEsQ0FBQyxNQUFNLEVBQUU7WUFDaEQsT0FBTyxJQUFJLENBQUMsYUFBYSxLQUFLLElBQUksQ0FBQztTQUNwQzthQUFNLElBQUksSUFBSSxDQUFDLGNBQWMsS0FBSyxhQUFhLENBQUMsS0FBSyxFQUFFO1lBQ3RELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3hDO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDOzs7Ozs7SUFLTyxVQUFVLENBQUMsSUFBTztRQUN4QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFOzs7a0JBRWpCLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDO1lBQ2pFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDaEU7SUFDSCxDQUFDOzs7Ozs7SUFLTyxZQUFZLENBQUMsV0FBbUI7UUFDdEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3BDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUU7WUFDdEUsbUNBQW1DO1lBQ25DLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQy9DO0lBQ0gsQ0FBQzs7Ozs7OztJQUtNLFdBQVcsQ0FBQyxJQUFPLEVBQUUsUUFBaUI7UUFDM0MsUUFBUSxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQzNCLEtBQUssYUFBYSxDQUFDLElBQUk7Z0JBQ3JCLE1BQU07WUFDUixLQUFLLGFBQWEsQ0FBQyxNQUFNO2dCQUN2QiwrREFBK0Q7Z0JBQy9ELE1BQU07WUFDUixLQUFLLGFBQWEsQ0FBQyxLQUFLOztzQkFDaEIsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztnQkFDeEMsSUFBSSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO29CQUMzQixJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUN6QixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7aUJBQ25CO3FCQUFNLElBQUksS0FBSyxHQUFHLENBQUMsSUFBSSxRQUFRLEVBQUU7b0JBQ2hDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3RCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztpQkFDbkI7Z0JBQ0QsTUFBTTtZQUNSO2dCQUNFLE1BQU07U0FDVDtJQUNILENBQUM7Ozs7O0lBS00sYUFBYTtRQUNsQixJQUFJLElBQUksQ0FBQyxjQUFjLEtBQUssYUFBYSxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFO1lBQ3pFLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7O2NBQ0ssY0FBYyxHQUFRLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUzs7Y0FDM0MsV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU07UUFDaEQsSUFBSSxXQUFXLEdBQUcsQ0FBQyxFQUFFO1lBQ25CLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7O2NBQ0ssSUFBSSxHQUFRLGNBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNoRixPQUFPLElBQUksQ0FBQyxNQUFNLEtBQUssY0FBYyxDQUFDLE1BQU0sQ0FBQztJQUMvQyxDQUFDOzs7OztJQUtNLFNBQVM7UUFDZCxJQUFJLElBQUksQ0FBQyxjQUFjLEtBQUssYUFBYSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsY0FBYyxLQUFLLGFBQWEsQ0FBQyxNQUFNLEVBQUU7WUFDOUYsT0FBTztTQUNSO1FBQ0Q7OztlQUdPO1FBQ1AsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFLEVBQUU7WUFDeEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFOztzQkFDN0IsWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztnQkFDL0MsSUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFDLEVBQUU7b0JBQ3JCLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUM7aUJBQ2pDO1lBQ0gsQ0FBQyxDQUFDLENBQUM7U0FDSjthQUFNO1lBQ0wsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUNuQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDbEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDdkI7WUFDSCxDQUFDLENBQUMsQ0FBQztTQUNKO1FBQ0QsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3BCLENBQUM7OztZQWpWRixVQUFVOzs7O1lBTEYsS0FBSztZQURMLGVBQWU7Ozs7SUFRdEIsdUJBQWtCOztJQUNsQixzQ0FBb0M7O0lBQ3BDLDJDQUFrQzs7SUFtSWxDLG1DQUEyRDs7SUFnQjNELHFDQUF5Qzs7Ozs7SUFTekMsNkJBQWtDOzs7OztJQUtsQyxrQ0FBMkM7Ozs7O0lBWTNDLG1DQUEwQjs7Ozs7SUF1QjFCLDZCQUFzQjs7Ozs7SUFzQnRCLDRCQUF5Qzs7SUF4TjdCLDJCQUF3Qjs7SUFBRSw2QkFBb0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBUcmFja0J5RnVuY3Rpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBGaWx0ZXJzUHJvdmlkZXIgfSBmcm9tICcuL2ZpbHRlcnMnO1xuaW1wb3J0IHsgSXRlbXMgfSBmcm9tICcuL2l0ZW1zJztcbmltcG9ydCB7IFNlbGVjdGlvblR5cGUgfSBmcm9tICcuLi9lbnVtcy9zZWxlY3Rpb24tdHlwZSc7XG5cbmxldCBuYlNlbGVjdGlvbjogbnVtYmVyID0gMDtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNlbGVjdGlvbjxUID0gYW55PiB7XG4gIHB1YmxpYyBpZDogc3RyaW5nO1xuICBwcml2YXRlIHByZXZTZWxlY3Rpb25SZWZzOiBUW10gPSBbXTsgLy8gUmVmcyBvZiBzZWxlY3RlZCBpdGVtc1xuICBwcml2YXRlIHByZXZTaW5nbGVTZWxlY3Rpb25SZWY6IFQ7IC8vIFJlZiBvZiBzaW5nbGUgc2VsZWN0ZWQgaXRlbVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2l0ZW1zOiBJdGVtczxUPiwgcHJpdmF0ZSBfZmlsdGVyczogRmlsdGVyc1Byb3ZpZGVyPFQ+KSB7XG4gICAgdGhpcy5pZCA9ICdjbHItZGctc2VsZWN0aW9uJyArIG5iU2VsZWN0aW9uKys7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMuX2ZpbHRlcnMuY2hhbmdlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5fc2VsZWN0YWJsZSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICB9KVxuICAgICk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMuX2l0ZW1zLmFsbENoYW5nZXMuc3Vic2NyaWJlKHVwZGF0ZWRJdGVtcyA9PiB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5zZWxlY3Rpb25UeXBlKSB7XG4gICAgICAgICAgY2FzZSBTZWxlY3Rpb25UeXBlLk5vbmU6IHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNhc2UgU2VsZWN0aW9uVHlwZS5TaW5nbGU6IHtcbiAgICAgICAgICAgIGxldCBuZXdTaW5nbGU6IGFueTtcbiAgICAgICAgICAgIGNvbnN0IHRyYWNrQnk6IFRyYWNrQnlGdW5jdGlvbjxUPiA9IHRoaXMuX2l0ZW1zLnRyYWNrQnk7XG4gICAgICAgICAgICBsZXQgc2VsZWN0aW9uVXBkYXRlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgICAgICAgICAvLyBpZiB0aGUgY3VycmVudFNpbmdsZSBoYXMgYmVlbiBzZXQgYmVmb3JlIGRhdGEgd2FzIGxvYWRlZCwgd2UgbG9vayB1cCBhbmQgc2F2ZSB0aGUgcmVmIGZyb20gY3VycmVudCBkYXRhIHNldFxuICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudFNpbmdsZSAmJiAhdGhpcy5wcmV2U2luZ2xlU2VsZWN0aW9uUmVmKSB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLl9pdGVtcy5hbGwgJiYgdGhpcy5faXRlbXMudHJhY2tCeSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGxvb2t1cCA9IHRoaXMuX2l0ZW1zLmFsbC5maW5kSW5kZXgobWF5YmUgPT4gbWF5YmUgPT09IHRoaXMuY3VycmVudFNpbmdsZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5wcmV2U2luZ2xlU2VsZWN0aW9uUmVmID0gdGhpcy5faXRlbXMudHJhY2tCeShsb29rdXAsIHRoaXMuY3VycmVudFNpbmdsZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdXBkYXRlZEl0ZW1zLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHJlZiA9IHRyYWNrQnkoaW5kZXgsIGl0ZW0pO1xuICAgICAgICAgICAgICAvLyBJZiBvbmUgb2YgdGhlIHVwZGF0ZWQgaXRlbXMgaXMgdGhlIHByZXZpb3VzbHkgc2VsZWN0ZWRTaW5nbGUsIHNldCBpdCBhcyB0aGUgbmV3IG9uZVxuICAgICAgICAgICAgICBpZiAodGhpcy5wcmV2U2luZ2xlU2VsZWN0aW9uUmVmID09PSByZWYpIHtcbiAgICAgICAgICAgICAgICBuZXdTaW5nbGUgPSBpdGVtO1xuICAgICAgICAgICAgICAgIHNlbGVjdGlvblVwZGF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gSWYgd2UncmUgdXNpbmcgc21hcnQgZGF0YWdyaWRzLCB3ZSBleHBlY3QgYWxsIGl0ZW1zIHRvIGJlIHByZXNlbnQgaW4gdGhlIHVwZGF0ZWRJdGVtcyBhcnJheS5cbiAgICAgICAgICAgIC8vIFRoZXJlZm9yZSwgd2Ugc2hvdWxkIGRlbGV0ZSB0aGUgY3VycmVudFNpbmdsZSBpZiBpdCB1c2VkIHRvIGJlIGRlZmluZWQgYnV0IGRvZXNuJ3QgZXhpc3QgYW55bW9yZS5cbiAgICAgICAgICAgIC8vIE5vIGV4cGxpY2l0IFwiZGVsZXRlXCIgaXMgcmVxdWlyZWQsIHNpbmNlIG5ld1NpbmdsZSB3b3VsZCBiZSB1bmRlZmluZWQgYXQgdGhpcyBwb2ludC5cbiAgICAgICAgICAgIC8vIE1hcmtpbmcgaXQgYXMgc2VsZWN0aW9uVXBkYXRlZCBoZXJlIHdpbGwgc2V0IGN1cnJlbnRTaW5nbGUgdG8gdW5kZWZpbmVkIGJlbG93IGluIHRoZSBzZXRUaW1lb3V0LlxuICAgICAgICAgICAgaWYgKHRoaXMuX2l0ZW1zLnNtYXJ0ICYmICFuZXdTaW5nbGUpIHtcbiAgICAgICAgICAgICAgc2VsZWN0aW9uVXBkYXRlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFRPRE86IERpc2N1c3NlZCB0aGlzIHdpdGggRXVkZXMgYW5kIHRoaXMgaXMgZmluZSBmb3Igbm93LlxuICAgICAgICAgICAgLy8gQnV0IHdlIG5lZWQgdG8gZmlndXJlIG91dCBhIGRpZmZlcmVudCBwYXR0ZXJuIGZvciB0aGVcbiAgICAgICAgICAgIC8vIGNoaWxkIHRyaWdnZXJpbmcgdGhlIHBhcmVudCBjaGFuZ2UgZGV0ZWN0aW9uIHByb2JsZW0uXG4gICAgICAgICAgICAvLyBVc2luZyBzZXRUaW1lb3V0IGZvciBub3cgdG8gZml4IHRoaXMuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgaWYgKHNlbGVjdGlvblVwZGF0ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRTaW5nbGUgPSBuZXdTaW5nbGU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY2FzZSBTZWxlY3Rpb25UeXBlLk11bHRpOiB7XG4gICAgICAgICAgICBsZXQgbGVmdE92ZXI6IGFueVtdID0gdGhpcy5jdXJyZW50LnNsaWNlKCk7XG4gICAgICAgICAgICBjb25zdCB0cmFja0J5OiBUcmFja0J5RnVuY3Rpb248YW55PiA9IHRoaXMuX2l0ZW1zLnRyYWNrQnk7XG4gICAgICAgICAgICBsZXQgc2VsZWN0aW9uVXBkYXRlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgICAgICAgICAvLyBpZiB0aGUgY3VycmVudCBoYXMgYmVlbiBzZXQgYmVmb3JlIGRhdGEgd2FzIGxvYWRlZCwgd2UgbG9vayB1cCBhbmQgc2F2ZSB0aGUgcmVmIGZyb20gY3VycmVudCBkYXRhIHNldFxuICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudC5sZW5ndGggPiAwICYmIHRoaXMucHJldlNlbGVjdGlvblJlZnMubGVuZ3RoICE9PSB0aGlzLmN1cnJlbnQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLl9pdGVtcy5hbGwgJiYgdGhpcy5faXRlbXMudHJhY2tCeSkge1xuICAgICAgICAgICAgICAgIHRoaXMucHJldlNlbGVjdGlvblJlZnMgPSBbXTtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnQuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGxvb2t1cCA9IHRoaXMuX2l0ZW1zLmFsbC5maW5kSW5kZXgobWF5YmUgPT4gbWF5YmUgPT09IGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgdGhpcy5wcmV2U2VsZWN0aW9uUmVmcy5wdXNoKHRoaXMuX2l0ZW1zLnRyYWNrQnkobG9va3VwLCBpdGVtKSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gVE9ETzogcmV2aXNpdCB0aGlzIHdoZW4gd2Ugd29yayBvbiBodHRwczovL2dpdGh1Yi5jb20vdm13YXJlL2NsYXJpdHkvaXNzdWVzLzIzNDJcbiAgICAgICAgICAgIC8vIGN1cnJlbnRseSwgdGhlIHNlbGVjdGlvbiBpcyBjbGVhcmVkIHdoZW4gZmlsdGVyIGlzIGFwcGxpZWQsIHNvIHRoZSBsb2dpYyBpbnNpZGVcbiAgICAgICAgICAgIC8vIHRoZSBpZiBzdGF0ZW1lbnQgYmVsb3cgcmVzdWx0cyBpbiBicm9rZW4gYmVoYXZpb3IuXG4gICAgICAgICAgICBpZiAobGVmdE92ZXIubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICB1cGRhdGVkSXRlbXMuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCByZWYgPSB0cmFja0J5KGluZGV4LCBpdGVtKTtcbiAgICAgICAgICAgICAgICAvLyBMb29rIGluIGN1cnJlbnQgc2VsZWN0ZWQgcmVmcyBhcnJheSBpZiBpdGVtIGlzIHNlbGVjdGVkLCBhbmQgdXBkYXRlIGFjdHVhbCB2YWx1ZVxuICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkSW5kZXggPSB0aGlzLnByZXZTZWxlY3Rpb25SZWZzLmluZGV4T2YocmVmKTtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRJbmRleCA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICBsZWZ0T3ZlcltzZWxlY3RlZEluZGV4XSA9IGl0ZW07XG4gICAgICAgICAgICAgICAgICBzZWxlY3Rpb25VcGRhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgIC8vIEZpbHRlciBvdXQgYW55IHVubWF0Y2hlZCBpdGVtcyBpZiB3ZSdyZSB1c2luZyBzbWFydCBkYXRhZ3JpZHMgd2hlcmUgd2UgZXhwZWN0IGFsbCBpdGVtcyB0byBiZVxuICAgICAgICAgICAgICAvLyBwcmVzZW50XG4gICAgICAgICAgICAgIGlmICh0aGlzLl9pdGVtcy5zbWFydCkge1xuICAgICAgICAgICAgICAgIGxlZnRPdmVyID0gbGVmdE92ZXIuZmlsdGVyKHNlbGVjdGVkID0+IHVwZGF0ZWRJdGVtcy5pbmRleE9mKHNlbGVjdGVkKSA+IC0xKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50Lmxlbmd0aCAhPT0gbGVmdE92ZXIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICBzZWxlY3Rpb25VcGRhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAvLyBUT0RPOiBEaXNjdXNzZWQgdGhpcyB3aXRoIEV1ZGVzIGFuZCB0aGlzIGlzIGZpbmUgZm9yIG5vdy5cbiAgICAgICAgICAgICAgLy8gQnV0IHdlIG5lZWQgdG8gZmlndXJlIG91dCBhIGRpZmZlcmVudCBwYXR0ZXJuIGZvciB0aGVcbiAgICAgICAgICAgICAgLy8gY2hpbGQgdHJpZ2dlcmluZyB0aGUgcGFyZW50IGNoYW5nZSBkZXRlY3Rpb24gcHJvYmxlbS5cbiAgICAgICAgICAgICAgLy8gVXNpbmcgc2V0VGltZW91dCBmb3Igbm93IHRvIGZpeCB0aGlzLlxuICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0aW9uVXBkYXRlZCkge1xuICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50ID0gbGVmdE92ZXI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgcHVibGljIGNsZWFyU2VsZWN0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMuY3VycmVudC5sZW5ndGggPSAwO1xuICAgIHRoaXMucHJldlNlbGVjdGlvblJlZnMgPSBbXTtcbiAgICB0aGlzLl9jdXJyZW50U2luZ2xlID0gbnVsbDtcbiAgICB0aGlzLnByZXZTaW5nbGVTZWxlY3Rpb25SZWYgPSBudWxsO1xuICAgIHRoaXMuZW1pdENoYW5nZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2VsZWN0aW9uVHlwZTogU2VsZWN0aW9uVHlwZSA9IFNlbGVjdGlvblR5cGUuTm9uZTtcbiAgcHVibGljIGdldCBzZWxlY3Rpb25UeXBlKCk6IFNlbGVjdGlvblR5cGUge1xuICAgIHJldHVybiB0aGlzLl9zZWxlY3Rpb25UeXBlO1xuICB9XG4gIHB1YmxpYyBzZXQgc2VsZWN0aW9uVHlwZSh2YWx1ZTogU2VsZWN0aW9uVHlwZSkge1xuICAgIGlmICh2YWx1ZSA9PT0gdGhpcy5zZWxlY3Rpb25UeXBlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX3NlbGVjdGlvblR5cGUgPSB2YWx1ZTtcbiAgICBpZiAodmFsdWUgPT09IFNlbGVjdGlvblR5cGUuTm9uZSkge1xuICAgICAgZGVsZXRlIHRoaXMuY3VycmVudDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy51cGRhdGVDdXJyZW50KFtdLCBmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHJvd1NlbGVjdGlvbk1vZGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBwcml2YXRlIGdldCBfc2VsZWN0YWJsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0aW9uVHlwZSA9PT0gU2VsZWN0aW9uVHlwZS5NdWx0aSB8fCB0aGlzLl9zZWxlY3Rpb25UeXBlID09PSBTZWxlY3Rpb25UeXBlLlNpbmdsZTtcbiAgfVxuICAvKipcbiAgICogSWdub3JlIGl0ZW1zIGNoYW5nZXMgaW4gdGhlIHNhbWUgY2hhbmdlIGRldGVjdGlvbiBjeWNsZS5cbiAgICovXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZVxuICBwcml2YXRlIGRlYm91bmNlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFN1YnNjcmlwdGlvbnMgdG8gdGhlIG90aGVyIHByb3ZpZGVycyBjaGFuZ2VzLlxuICAgKi9cbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gIC8qKlxuICAgKiBDbGVhbnMgdXAgb3VyIHN1YnNjcmlwdGlvbnMgdG8gb3RoZXIgcHJvdmlkZXJzXG4gICAqL1xuICBwdWJsaWMgZGVzdHJveSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaChzdWIgPT4gc3ViLnVuc3Vic2NyaWJlKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBjdXJyZW50IHNlbGVjdGlvbiBpbiBzaW5nbGUgc2VsZWN0aW9uIHR5cGVcbiAgICovXG4gIHByaXZhdGUgX2N1cnJlbnRTaW5nbGU6IFQ7XG4gIHB1YmxpYyBnZXQgY3VycmVudFNpbmdsZSgpOiBUIHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudFNpbmdsZTtcbiAgfVxuICBwdWJsaWMgc2V0IGN1cnJlbnRTaW5nbGUodmFsdWU6IFQpIHtcbiAgICBpZiAodmFsdWUgPT09IHRoaXMuX2N1cnJlbnRTaW5nbGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fY3VycmVudFNpbmdsZSA9IHZhbHVlO1xuICAgIGlmICh0aGlzLl9pdGVtcy5hbGwgJiYgdGhpcy5faXRlbXMudHJhY2tCeSAmJiB2YWx1ZSkge1xuICAgICAgY29uc3QgbG9va3VwID0gdGhpcy5faXRlbXMuYWxsLmZpbmRJbmRleChtYXliZSA9PiBtYXliZSA9PT0gdmFsdWUpO1xuICAgICAgdGhpcy5wcmV2U2luZ2xlU2VsZWN0aW9uUmVmID0gdGhpcy5faXRlbXMudHJhY2tCeShsb29rdXAsIHZhbHVlKTtcbiAgICB9XG4gICAgdGhpcy5lbWl0Q2hhbmdlKCk7XG4gICAgLy8gSWdub3JlIGl0ZW1zIGNoYW5nZXMgaW4gdGhlIHNhbWUgY2hhbmdlIGRldGVjdGlvbiBjeWNsZS5cbiAgICAvLyBAVE9ETyBUaGlzIGNhbiBsaWtlbHkgYmUgcmVtb3ZlZCFcbiAgICB0aGlzLmRlYm91bmNlID0gdHJ1ZTtcbiAgICBzZXRUaW1lb3V0KCgpID0+ICh0aGlzLmRlYm91bmNlID0gZmFsc2UpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgY3VycmVudCBzZWxlY3Rpb25cbiAgICovXG4gIHByaXZhdGUgX2N1cnJlbnQ6IFRbXTtcbiAgcHVibGljIGdldCBjdXJyZW50KCk6IFRbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnQ7XG4gIH1cbiAgcHVibGljIHNldCBjdXJyZW50KHZhbHVlOiBUW10pIHtcbiAgICB0aGlzLnVwZGF0ZUN1cnJlbnQodmFsdWUsIHRydWUpO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZUN1cnJlbnQodmFsdWU6IFRbXSwgZW1pdDogYm9vbGVhbikge1xuICAgIHRoaXMuX2N1cnJlbnQgPSB2YWx1ZTtcbiAgICBpZiAoZW1pdCkge1xuICAgICAgdGhpcy5lbWl0Q2hhbmdlKCk7XG4gICAgICAvLyBJZ25vcmUgaXRlbXMgY2hhbmdlcyBpbiB0aGUgc2FtZSBjaGFuZ2UgZGV0ZWN0aW9uIGN5Y2xlLlxuICAgICAgLy8gQFRPRE8gVGhpcyBjYW4gbGlrZWx5IGJlIHJlbW92ZWQhXG4gICAgICB0aGlzLmRlYm91bmNlID0gdHJ1ZTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gKHRoaXMuZGVib3VuY2UgPSBmYWxzZSkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgT2JzZXJ2YWJsZSB0aGF0IGxldHMgb3RoZXIgY2xhc3NlcyBzdWJzY3JpYmUgdG8gc2VsZWN0aW9uIGNoYW5nZXNcbiAgICovXG4gIHByaXZhdGUgX2NoYW5nZSA9IG5ldyBTdWJqZWN0PFRbXSB8IFQ+KCk7XG4gIHByaXZhdGUgZW1pdENoYW5nZSgpIHtcbiAgICBpZiAodGhpcy5fc2VsZWN0aW9uVHlwZSA9PT0gU2VsZWN0aW9uVHlwZS5TaW5nbGUpIHtcbiAgICAgIHRoaXMuX2NoYW5nZS5uZXh0KHRoaXMuY3VycmVudFNpbmdsZSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLl9zZWxlY3Rpb25UeXBlID09PSBTZWxlY3Rpb25UeXBlLk11bHRpKSB7XG4gICAgICB0aGlzLl9jaGFuZ2UubmV4dCh0aGlzLmN1cnJlbnQpO1xuICAgIH1cbiAgfVxuICAvLyBXZSBkbyBub3Qgd2FudCB0byBleHBvc2UgdGhlIFN1YmplY3QgaXRzZWxmLCBidXQgdGhlIE9ic2VydmFibGUgd2hpY2ggaXMgcmVhZC1vbmx5XG4gIHB1YmxpYyBnZXQgY2hhbmdlKCk6IE9ic2VydmFibGU8VFtdIHwgVD4ge1xuICAgIHJldHVybiB0aGlzLl9jaGFuZ2UuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIGFuIGl0ZW0gaXMgY3VycmVudGx5IHNlbGVjdGVkXG4gICAqL1xuICBwdWJsaWMgaXNTZWxlY3RlZChpdGVtOiBUKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuX3NlbGVjdGlvblR5cGUgPT09IFNlbGVjdGlvblR5cGUuU2luZ2xlKSB7XG4gICAgICByZXR1cm4gdGhpcy5jdXJyZW50U2luZ2xlID09PSBpdGVtO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fc2VsZWN0aW9uVHlwZSA9PT0gU2VsZWN0aW9uVHlwZS5NdWx0aSkge1xuICAgICAgcmV0dXJuIHRoaXMuY3VycmVudC5pbmRleE9mKGl0ZW0pID49IDA7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWxlY3RzIGFuIGl0ZW1cbiAgICovXG4gIHByaXZhdGUgc2VsZWN0SXRlbShpdGVtOiBUKTogdm9pZCB7XG4gICAgdGhpcy5jdXJyZW50LnB1c2goaXRlbSk7XG4gICAgaWYgKHRoaXMuX2l0ZW1zLnRyYWNrQnkpIHtcbiAgICAgIC8vIFB1c2ggc2VsZWN0ZWQgcmVmIG9udG8gYXJyYXlcbiAgICAgIGNvbnN0IGxvb2t1cCA9IHRoaXMuX2l0ZW1zLmFsbC5maW5kSW5kZXgobWF5YmUgPT4gbWF5YmUgPT09IGl0ZW0pO1xuICAgICAgdGhpcy5wcmV2U2VsZWN0aW9uUmVmcy5wdXNoKHRoaXMuX2l0ZW1zLnRyYWNrQnkobG9va3VwLCBpdGVtKSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERlc2VsZWN0cyBhbiBpdGVtXG4gICAqL1xuICBwcml2YXRlIGRlc2VsZWN0SXRlbShpbmRleE9mSXRlbTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5jdXJyZW50LnNwbGljZShpbmRleE9mSXRlbSwgMSk7XG4gICAgaWYgKHRoaXMuX2l0ZW1zLnRyYWNrQnkgJiYgaW5kZXhPZkl0ZW0gPCB0aGlzLnByZXZTZWxlY3Rpb25SZWZzLmxlbmd0aCkge1xuICAgICAgLy8gS2VlcCBzZWxlY3RlZCByZWZzIGFycmF5IGluIHN5bmNcbiAgICAgIHRoaXMucHJldlNlbGVjdGlvblJlZnMuc3BsaWNlKGluZGV4T2ZJdGVtLCAxKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0cyBvciBkZXNlbGVjdHMgYW4gaXRlbVxuICAgKi9cbiAgcHVibGljIHNldFNlbGVjdGVkKGl0ZW06IFQsIHNlbGVjdGVkOiBib29sZWFuKSB7XG4gICAgc3dpdGNoICh0aGlzLl9zZWxlY3Rpb25UeXBlKSB7XG4gICAgICBjYXNlIFNlbGVjdGlvblR5cGUuTm9uZTpcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFNlbGVjdGlvblR5cGUuU2luZ2xlOlxuICAgICAgICAvLyBpbiBzaW5nbGUgc2VsZWN0aW9uLCBzZXQgY3VycmVudFNpbmdsZSBtZXRob2Qgc2hvdWxkIGJlIHVzZWRcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFNlbGVjdGlvblR5cGUuTXVsdGk6XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5jdXJyZW50LmluZGV4T2YoaXRlbSk7XG4gICAgICAgIGlmIChpbmRleCA+PSAwICYmICFzZWxlY3RlZCkge1xuICAgICAgICAgIHRoaXMuZGVzZWxlY3RJdGVtKGluZGV4KTtcbiAgICAgICAgICB0aGlzLmVtaXRDaGFuZ2UoKTtcbiAgICAgICAgfSBlbHNlIGlmIChpbmRleCA8IDAgJiYgc2VsZWN0ZWQpIHtcbiAgICAgICAgICB0aGlzLnNlbGVjdEl0ZW0oaXRlbSk7XG4gICAgICAgICAgdGhpcy5lbWl0Q2hhbmdlKCk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIGFsbCBjdXJyZW50bHkgZGlzcGxheWVkIGl0ZW1zIGFyZSBzZWxlY3RlZFxuICAgKi9cbiAgcHVibGljIGlzQWxsU2VsZWN0ZWQoKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuX3NlbGVjdGlvblR5cGUgIT09IFNlbGVjdGlvblR5cGUuTXVsdGkgfHwgIXRoaXMuX2l0ZW1zLmRpc3BsYXllZCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCBkaXNwbGF5ZWRJdGVtczogVFtdID0gdGhpcy5faXRlbXMuZGlzcGxheWVkO1xuICAgIGNvbnN0IG5iRGlzcGxheWVkID0gdGhpcy5faXRlbXMuZGlzcGxheWVkLmxlbmd0aDtcbiAgICBpZiAobmJEaXNwbGF5ZWQgPCAxKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IHRlbXA6IFRbXSA9IGRpc3BsYXllZEl0ZW1zLmZpbHRlcihpdGVtID0+IHRoaXMuY3VycmVudC5pbmRleE9mKGl0ZW0pID4gLTEpO1xuICAgIHJldHVybiB0ZW1wLmxlbmd0aCA9PT0gZGlzcGxheWVkSXRlbXMubGVuZ3RoO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlbGVjdHMgb3IgZGVzZWxlY3RzIGFsbCBjdXJyZW50bHkgZGlzcGxheWVkIGl0ZW1zXG4gICAqL1xuICBwdWJsaWMgdG9nZ2xlQWxsKCkge1xuICAgIGlmICh0aGlzLl9zZWxlY3Rpb25UeXBlID09PSBTZWxlY3Rpb25UeXBlLk5vbmUgfHwgdGhpcy5fc2VsZWN0aW9uVHlwZSA9PT0gU2VsZWN0aW9uVHlwZS5TaW5nbGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLypcbiAgICAgICAgICogSWYgZXZlcnkgY3VycmVudGx5IGRpc3BsYXllZCBpdGVtIGlzIGFscmVhZHkgc2VsZWN0ZWQsIHdlIGNsZWFyIHRoZW0uXG4gICAgICAgICAqIElmIGF0IGxlYXN0IG9uZSBpdGVtIGlzbid0IHNlbGVjdGVkLCB3ZSBzZWxlY3QgZXZlcnkgY3VycmVudGx5IGRpc3BsYXllZCBpdGVtLlxuICAgICAgICAgKi9cbiAgICBpZiAodGhpcy5pc0FsbFNlbGVjdGVkKCkpIHtcbiAgICAgIHRoaXMuX2l0ZW1zLmRpc3BsYXllZC5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBjb25zdCBjdXJyZW50SW5kZXggPSB0aGlzLmN1cnJlbnQuaW5kZXhPZihpdGVtKTtcbiAgICAgICAgaWYgKGN1cnJlbnRJbmRleCA+IC0xKSB7XG4gICAgICAgICAgdGhpcy5kZXNlbGVjdEl0ZW0oY3VycmVudEluZGV4KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2l0ZW1zLmRpc3BsYXllZC5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50LmluZGV4T2YoaXRlbSkgPCAwKSB7XG4gICAgICAgICAgdGhpcy5zZWxlY3RJdGVtKGl0ZW0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgdGhpcy5lbWl0Q2hhbmdlKCk7XG4gIH1cbn1cbiJdfQ==