/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
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
        /**
         * @deprecated since 2.0, remove in 3.0
         */
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
        this.subscriptions.push(this._filters.change.subscribe((/**
         * @return {?}
         */
        () => {
            if (!this._selectable) {
                return;
            }
            this.clearSelection();
        })));
        this.subscriptions.push(this._items.allChanges.subscribe((/**
         * @param {?} updatedItems
         * @return {?}
         */
        updatedItems => {
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
                            const lookup = this._items.all.findIndex((/**
                             * @param {?} maybe
                             * @return {?}
                             */
                            maybe => maybe === this.currentSingle));
                            this.prevSingleSelectionRef = this._items.trackBy(lookup, this.currentSingle);
                        }
                    }
                    updatedItems.forEach((/**
                     * @param {?} item
                     * @param {?} index
                     * @return {?}
                     */
                    (item, index) => {
                        /** @type {?} */
                        const ref = trackBy(index, item);
                        // If one of the updated items is the previously selectedSingle, set it as the new one
                        if (this.prevSingleSelectionRef === ref) {
                            newSingle = item;
                            selectionUpdated = true;
                        }
                    }));
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
                    setTimeout((/**
                     * @return {?}
                     */
                    () => {
                        if (selectionUpdated) {
                            this.currentSingle = newSingle;
                        }
                    }), 0);
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
                            this.current.forEach((/**
                             * @param {?} item
                             * @return {?}
                             */
                            item => {
                                /** @type {?} */
                                const lookup = this._items.all.findIndex((/**
                                 * @param {?} maybe
                                 * @return {?}
                                 */
                                maybe => maybe === item));
                                this.prevSelectionRefs.push(this._items.trackBy(lookup, item));
                            }));
                        }
                    }
                    // TODO: revisit this when we work on https://github.com/vmware/clarity/issues/2342
                    // currently, the selection is cleared when filter is applied, so the logic inside
                    // the if statement below results in broken behavior.
                    if (leftOver.length > 0) {
                        updatedItems.forEach((/**
                         * @param {?} item
                         * @param {?} index
                         * @return {?}
                         */
                        (item, index) => {
                            /** @type {?} */
                            const ref = trackBy(index, item);
                            // Look in current selected refs array if item is selected, and update actual value
                            /** @type {?} */
                            const selectedIndex = this.prevSelectionRefs.indexOf(ref);
                            if (selectedIndex > -1) {
                                leftOver[selectedIndex] = item;
                                selectionUpdated = true;
                            }
                        }));
                        // Filter out any unmatched items if we're using smart datagrids where we expect all items to be
                        // present
                        if (this._items.smart) {
                            leftOver = leftOver.filter((/**
                             * @param {?} selected
                             * @return {?}
                             */
                            selected => updatedItems.indexOf(selected) > -1));
                            if (this.current.length !== leftOver.length) {
                                selectionUpdated = true;
                            }
                        }
                        // TODO: Discussed this with Eudes and this is fine for now.
                        // But we need to figure out a different pattern for the
                        // child triggering the parent change detection problem.
                        // Using setTimeout for now to fix this.
                        setTimeout((/**
                         * @return {?}
                         */
                        () => {
                            if (selectionUpdated) {
                                this.current = leftOver;
                            }
                        }), 0);
                    }
                    break;
                }
                default: {
                    break;
                }
            }
        })));
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
     * @private
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
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        sub => sub.unsubscribe()));
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
            const lookup = this._items.all.findIndex((/**
             * @param {?} maybe
             * @return {?}
             */
            maybe => maybe === value));
            this.prevSingleSelectionRef = this._items.trackBy(lookup, value);
        }
        this.emitChange();
        // Ignore items changes in the same change detection cycle.
        // @TODO This can likely be removed!
        this.debounce = true;
        setTimeout((/**
         * @return {?}
         */
        () => (this.debounce = false)));
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
            setTimeout((/**
             * @return {?}
             */
            () => (this.debounce = false)));
        }
    }
    /**
     * @private
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
     * @private
     * @param {?} item
     * @return {?}
     */
    selectItem(item) {
        this.current.push(item);
        if (this._items.trackBy) {
            // Push selected ref onto array
            /** @type {?} */
            const lookup = this._items.all.findIndex((/**
             * @param {?} maybe
             * @return {?}
             */
            maybe => maybe === item));
            this.prevSelectionRefs.push(this._items.trackBy(lookup, item));
        }
    }
    /**
     * Deselects an item
     * @private
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
        const temp = displayedItems.filter((/**
         * @param {?} item
         * @return {?}
         */
        item => this.current.indexOf(item) > -1));
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
            this._items.displayed.forEach((/**
             * @param {?} item
             * @return {?}
             */
            item => {
                /** @type {?} */
                const currentIndex = this.current.indexOf(item);
                if (currentIndex > -1) {
                    this.deselectItem(currentIndex);
                }
            }));
        }
        else {
            this._items.displayed.forEach((/**
             * @param {?} item
             * @return {?}
             */
            item => {
                if (this.current.indexOf(item) < 0) {
                    this.selectItem(item);
                }
            }));
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
    /**
     * @type {?}
     * @private
     */
    Selection.prototype.prevSelectionRefs;
    /**
     * @type {?}
     * @private
     */
    Selection.prototype.prevSingleSelectionRef;
    /**
     * @type {?}
     * @private
     */
    Selection.prototype._selectionType;
    /**
     * @deprecated since 2.0, remove in 3.0
     * @type {?}
     */
    Selection.prototype.rowSelectionMode;
    /**
     * Ignore items changes in the same change detection cycle.
     * @type {?}
     * @private
     */
    Selection.prototype.debounce;
    /**
     * Subscriptions to the other providers changes.
     * @type {?}
     * @private
     */
    Selection.prototype.subscriptions;
    /**
     * The current selection in single selection type
     * @type {?}
     * @private
     */
    Selection.prototype._currentSingle;
    /**
     * The current selection
     * @type {?}
     * @private
     */
    Selection.prototype._current;
    /**
     * The Observable that lets other classes subscribe to selection changes
     * @type {?}
     * @private
     */
    Selection.prototype._change;
    /**
     * @type {?}
     * @private
     */
    Selection.prototype._items;
    /**
     * @type {?}
     * @private
     */
    Selection.prototype._filters;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9wcm92aWRlcnMvc2VsZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtBLE9BQU8sRUFBRSxVQUFVLEVBQW1CLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFBYyxPQUFPLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBRXpELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDNUMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUNoQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0seUJBQXlCLENBQUM7O0lBRXBELFdBQVcsR0FBVyxDQUFDOzs7O0FBRzNCLE1BQU0sT0FBTyxTQUFTOzs7Ozs7SUFLcEIsWUFBb0IsTUFBZ0IsRUFBVSxRQUE0QjtRQUF0RCxXQUFNLEdBQU4sTUFBTSxDQUFVO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBb0I7UUFIbEUsc0JBQWlCLEdBQVEsRUFBRSxDQUFDLENBQUMseUJBQXlCO1FBb0l0RCxtQkFBYyxHQUFrQixhQUFhLENBQUMsSUFBSSxDQUFDOzs7O1FBaUJwRCxxQkFBZ0IsR0FBWSxLQUFLLENBQUM7Ozs7O1FBU2pDLGFBQVEsR0FBWSxLQUFLLENBQUM7Ozs7UUFLMUIsa0JBQWEsR0FBbUIsRUFBRSxDQUFDOzs7O1FBeURuQyxZQUFPLEdBQUcsSUFBSSxPQUFPLEVBQVcsQ0FBQztRQXhOdkMsSUFBSSxDQUFDLEVBQUUsR0FBRyxrQkFBa0IsR0FBRyxXQUFXLEVBQUUsQ0FBQztRQUU3QyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUzs7O1FBQUMsR0FBRyxFQUFFO1lBQ2xDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUNyQixPQUFPO2FBQ1I7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Tzs7OztZQUFDLElBQUksQ0FBQyxFQUFFOztzQkFDN0IsWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztnQkFDL0MsSUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFDLEVBQUU7b0JBQ3JCLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUM7aUJBQ2pDO1lBQ0gsQ0FBQyxFQUFDLENBQUM7U0FDSjthQUFNO1lBQ0wsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBTzs7OztZQUFDLElBQUksQ0FBQyxFQUFFO2dCQUNuQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDbEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDdkI7WUFDSCxDQUFDLEVBQUMsQ0FBQztTQUNKO1FBQ0QsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3BCLENBQUM7OztZQWxWRixVQUFVOzs7O1lBTEYsS0FBSztZQURMLGVBQWU7Ozs7SUFRdEIsdUJBQWtCOzs7OztJQUNsQixzQ0FBb0M7Ozs7O0lBQ3BDLDJDQUFrQzs7Ozs7SUFtSWxDLG1DQUEyRDs7Ozs7SUFpQjNELHFDQUF5Qzs7Ozs7O0lBU3pDLDZCQUFrQzs7Ozs7O0lBS2xDLGtDQUEyQzs7Ozs7O0lBWTNDLG1DQUEwQjs7Ozs7O0lBdUIxQiw2QkFBc0I7Ozs7OztJQXNCdEIsNEJBQXlDOzs7OztJQXpON0IsMkJBQXdCOzs7OztJQUFFLDZCQUFvQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IEluamVjdGFibGUsIFRyYWNrQnlGdW5jdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IEZpbHRlcnNQcm92aWRlciB9IGZyb20gJy4vZmlsdGVycyc7XG5pbXBvcnQgeyBJdGVtcyB9IGZyb20gJy4vaXRlbXMnO1xuaW1wb3J0IHsgU2VsZWN0aW9uVHlwZSB9IGZyb20gJy4uL2VudW1zL3NlbGVjdGlvbi10eXBlJztcblxubGV0IG5iU2VsZWN0aW9uOiBudW1iZXIgPSAwO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2VsZWN0aW9uPFQgPSBhbnk+IHtcbiAgcHVibGljIGlkOiBzdHJpbmc7XG4gIHByaXZhdGUgcHJldlNlbGVjdGlvblJlZnM6IFRbXSA9IFtdOyAvLyBSZWZzIG9mIHNlbGVjdGVkIGl0ZW1zXG4gIHByaXZhdGUgcHJldlNpbmdsZVNlbGVjdGlvblJlZjogVDsgLy8gUmVmIG9mIHNpbmdsZSBzZWxlY3RlZCBpdGVtXG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfaXRlbXM6IEl0ZW1zPFQ+LCBwcml2YXRlIF9maWx0ZXJzOiBGaWx0ZXJzUHJvdmlkZXI8VD4pIHtcbiAgICB0aGlzLmlkID0gJ2Nsci1kZy1zZWxlY3Rpb24nICsgbmJTZWxlY3Rpb24rKztcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5fZmlsdGVycy5jaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLl9zZWxlY3RhYmxlKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5faXRlbXMuYWxsQ2hhbmdlcy5zdWJzY3JpYmUodXBkYXRlZEl0ZW1zID0+IHtcbiAgICAgICAgc3dpdGNoICh0aGlzLnNlbGVjdGlvblR5cGUpIHtcbiAgICAgICAgICBjYXNlIFNlbGVjdGlvblR5cGUuTm9uZToge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY2FzZSBTZWxlY3Rpb25UeXBlLlNpbmdsZToge1xuICAgICAgICAgICAgbGV0IG5ld1NpbmdsZTogYW55O1xuICAgICAgICAgICAgY29uc3QgdHJhY2tCeTogVHJhY2tCeUZ1bmN0aW9uPFQ+ID0gdGhpcy5faXRlbXMudHJhY2tCeTtcbiAgICAgICAgICAgIGxldCBzZWxlY3Rpb25VcGRhdGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAgICAgICAgIC8vIGlmIHRoZSBjdXJyZW50U2luZ2xlIGhhcyBiZWVuIHNldCBiZWZvcmUgZGF0YSB3YXMgbG9hZGVkLCB3ZSBsb29rIHVwIGFuZCBzYXZlIHRoZSByZWYgZnJvbSBjdXJyZW50IGRhdGEgc2V0XG4gICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50U2luZ2xlICYmICF0aGlzLnByZXZTaW5nbGVTZWxlY3Rpb25SZWYpIHtcbiAgICAgICAgICAgICAgaWYgKHRoaXMuX2l0ZW1zLmFsbCAmJiB0aGlzLl9pdGVtcy50cmFja0J5KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbG9va3VwID0gdGhpcy5faXRlbXMuYWxsLmZpbmRJbmRleChtYXliZSA9PiBtYXliZSA9PT0gdGhpcy5jdXJyZW50U2luZ2xlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnByZXZTaW5nbGVTZWxlY3Rpb25SZWYgPSB0aGlzLl9pdGVtcy50cmFja0J5KGxvb2t1cCwgdGhpcy5jdXJyZW50U2luZ2xlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB1cGRhdGVkSXRlbXMuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgcmVmID0gdHJhY2tCeShpbmRleCwgaXRlbSk7XG4gICAgICAgICAgICAgIC8vIElmIG9uZSBvZiB0aGUgdXBkYXRlZCBpdGVtcyBpcyB0aGUgcHJldmlvdXNseSBzZWxlY3RlZFNpbmdsZSwgc2V0IGl0IGFzIHRoZSBuZXcgb25lXG4gICAgICAgICAgICAgIGlmICh0aGlzLnByZXZTaW5nbGVTZWxlY3Rpb25SZWYgPT09IHJlZikge1xuICAgICAgICAgICAgICAgIG5ld1NpbmdsZSA9IGl0ZW07XG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uVXBkYXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBJZiB3ZSdyZSB1c2luZyBzbWFydCBkYXRhZ3JpZHMsIHdlIGV4cGVjdCBhbGwgaXRlbXMgdG8gYmUgcHJlc2VudCBpbiB0aGUgdXBkYXRlZEl0ZW1zIGFycmF5LlxuICAgICAgICAgICAgLy8gVGhlcmVmb3JlLCB3ZSBzaG91bGQgZGVsZXRlIHRoZSBjdXJyZW50U2luZ2xlIGlmIGl0IHVzZWQgdG8gYmUgZGVmaW5lZCBidXQgZG9lc24ndCBleGlzdCBhbnltb3JlLlxuICAgICAgICAgICAgLy8gTm8gZXhwbGljaXQgXCJkZWxldGVcIiBpcyByZXF1aXJlZCwgc2luY2UgbmV3U2luZ2xlIHdvdWxkIGJlIHVuZGVmaW5lZCBhdCB0aGlzIHBvaW50LlxuICAgICAgICAgICAgLy8gTWFya2luZyBpdCBhcyBzZWxlY3Rpb25VcGRhdGVkIGhlcmUgd2lsbCBzZXQgY3VycmVudFNpbmdsZSB0byB1bmRlZmluZWQgYmVsb3cgaW4gdGhlIHNldFRpbWVvdXQuXG4gICAgICAgICAgICBpZiAodGhpcy5faXRlbXMuc21hcnQgJiYgIW5ld1NpbmdsZSkge1xuICAgICAgICAgICAgICBzZWxlY3Rpb25VcGRhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gVE9ETzogRGlzY3Vzc2VkIHRoaXMgd2l0aCBFdWRlcyBhbmQgdGhpcyBpcyBmaW5lIGZvciBub3cuXG4gICAgICAgICAgICAvLyBCdXQgd2UgbmVlZCB0byBmaWd1cmUgb3V0IGEgZGlmZmVyZW50IHBhdHRlcm4gZm9yIHRoZVxuICAgICAgICAgICAgLy8gY2hpbGQgdHJpZ2dlcmluZyB0aGUgcGFyZW50IGNoYW5nZSBkZXRlY3Rpb24gcHJvYmxlbS5cbiAgICAgICAgICAgIC8vIFVzaW5nIHNldFRpbWVvdXQgZm9yIG5vdyB0byBmaXggdGhpcy5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoc2VsZWN0aW9uVXBkYXRlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFNpbmdsZSA9IG5ld1NpbmdsZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjYXNlIFNlbGVjdGlvblR5cGUuTXVsdGk6IHtcbiAgICAgICAgICAgIGxldCBsZWZ0T3ZlcjogYW55W10gPSB0aGlzLmN1cnJlbnQuc2xpY2UoKTtcbiAgICAgICAgICAgIGNvbnN0IHRyYWNrQnk6IFRyYWNrQnlGdW5jdGlvbjxhbnk+ID0gdGhpcy5faXRlbXMudHJhY2tCeTtcbiAgICAgICAgICAgIGxldCBzZWxlY3Rpb25VcGRhdGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAgICAgICAgIC8vIGlmIHRoZSBjdXJyZW50IGhhcyBiZWVuIHNldCBiZWZvcmUgZGF0YSB3YXMgbG9hZGVkLCB3ZSBsb29rIHVwIGFuZCBzYXZlIHRoZSByZWYgZnJvbSBjdXJyZW50IGRhdGEgc2V0XG4gICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50Lmxlbmd0aCA+IDAgJiYgdGhpcy5wcmV2U2VsZWN0aW9uUmVmcy5sZW5ndGggIT09IHRoaXMuY3VycmVudC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgaWYgKHRoaXMuX2l0ZW1zLmFsbCAmJiB0aGlzLl9pdGVtcy50cmFja0J5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcmV2U2VsZWN0aW9uUmVmcyA9IFtdO1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudC5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgICAgY29uc3QgbG9va3VwID0gdGhpcy5faXRlbXMuYWxsLmZpbmRJbmRleChtYXliZSA9PiBtYXliZSA9PT0gaXRlbSk7XG4gICAgICAgICAgICAgICAgICB0aGlzLnByZXZTZWxlY3Rpb25SZWZzLnB1c2godGhpcy5faXRlbXMudHJhY2tCeShsb29rdXAsIGl0ZW0pKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBUT0RPOiByZXZpc2l0IHRoaXMgd2hlbiB3ZSB3b3JrIG9uIGh0dHBzOi8vZ2l0aHViLmNvbS92bXdhcmUvY2xhcml0eS9pc3N1ZXMvMjM0MlxuICAgICAgICAgICAgLy8gY3VycmVudGx5LCB0aGUgc2VsZWN0aW9uIGlzIGNsZWFyZWQgd2hlbiBmaWx0ZXIgaXMgYXBwbGllZCwgc28gdGhlIGxvZ2ljIGluc2lkZVxuICAgICAgICAgICAgLy8gdGhlIGlmIHN0YXRlbWVudCBiZWxvdyByZXN1bHRzIGluIGJyb2tlbiBiZWhhdmlvci5cbiAgICAgICAgICAgIGlmIChsZWZ0T3Zlci5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgIHVwZGF0ZWRJdGVtcy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlZiA9IHRyYWNrQnkoaW5kZXgsIGl0ZW0pO1xuICAgICAgICAgICAgICAgIC8vIExvb2sgaW4gY3VycmVudCBzZWxlY3RlZCByZWZzIGFycmF5IGlmIGl0ZW0gaXMgc2VsZWN0ZWQsIGFuZCB1cGRhdGUgYWN0dWFsIHZhbHVlXG4gICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRJbmRleCA9IHRoaXMucHJldlNlbGVjdGlvblJlZnMuaW5kZXhPZihyZWYpO1xuICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZEluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgIGxlZnRPdmVyW3NlbGVjdGVkSW5kZXhdID0gaXRlbTtcbiAgICAgICAgICAgICAgICAgIHNlbGVjdGlvblVwZGF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgLy8gRmlsdGVyIG91dCBhbnkgdW5tYXRjaGVkIGl0ZW1zIGlmIHdlJ3JlIHVzaW5nIHNtYXJ0IGRhdGFncmlkcyB3aGVyZSB3ZSBleHBlY3QgYWxsIGl0ZW1zIHRvIGJlXG4gICAgICAgICAgICAgIC8vIHByZXNlbnRcbiAgICAgICAgICAgICAgaWYgKHRoaXMuX2l0ZW1zLnNtYXJ0KSB7XG4gICAgICAgICAgICAgICAgbGVmdE92ZXIgPSBsZWZ0T3Zlci5maWx0ZXIoc2VsZWN0ZWQgPT4gdXBkYXRlZEl0ZW1zLmluZGV4T2Yoc2VsZWN0ZWQpID4gLTEpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnQubGVuZ3RoICE9PSBsZWZ0T3Zlci5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgIHNlbGVjdGlvblVwZGF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIC8vIFRPRE86IERpc2N1c3NlZCB0aGlzIHdpdGggRXVkZXMgYW5kIHRoaXMgaXMgZmluZSBmb3Igbm93LlxuICAgICAgICAgICAgICAvLyBCdXQgd2UgbmVlZCB0byBmaWd1cmUgb3V0IGEgZGlmZmVyZW50IHBhdHRlcm4gZm9yIHRoZVxuICAgICAgICAgICAgICAvLyBjaGlsZCB0cmlnZ2VyaW5nIHRoZSBwYXJlbnQgY2hhbmdlIGRldGVjdGlvbiBwcm9ibGVtLlxuICAgICAgICAgICAgICAvLyBVc2luZyBzZXRUaW1lb3V0IGZvciBub3cgdG8gZml4IHRoaXMuXG4gICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChzZWxlY3Rpb25VcGRhdGVkKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnQgPSBsZWZ0T3ZlcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZGVmYXVsdDoge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgY2xlYXJTZWxlY3Rpb24oKTogdm9pZCB7XG4gICAgdGhpcy5jdXJyZW50Lmxlbmd0aCA9IDA7XG4gICAgdGhpcy5wcmV2U2VsZWN0aW9uUmVmcyA9IFtdO1xuICAgIHRoaXMuX2N1cnJlbnRTaW5nbGUgPSBudWxsO1xuICAgIHRoaXMucHJldlNpbmdsZVNlbGVjdGlvblJlZiA9IG51bGw7XG4gICAgdGhpcy5lbWl0Q2hhbmdlKCk7XG4gIH1cblxuICBwcml2YXRlIF9zZWxlY3Rpb25UeXBlOiBTZWxlY3Rpb25UeXBlID0gU2VsZWN0aW9uVHlwZS5Ob25lO1xuICBwdWJsaWMgZ2V0IHNlbGVjdGlvblR5cGUoKTogU2VsZWN0aW9uVHlwZSB7XG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGlvblR5cGU7XG4gIH1cbiAgcHVibGljIHNldCBzZWxlY3Rpb25UeXBlKHZhbHVlOiBTZWxlY3Rpb25UeXBlKSB7XG4gICAgaWYgKHZhbHVlID09PSB0aGlzLnNlbGVjdGlvblR5cGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fc2VsZWN0aW9uVHlwZSA9IHZhbHVlO1xuICAgIGlmICh2YWx1ZSA9PT0gU2VsZWN0aW9uVHlwZS5Ob25lKSB7XG4gICAgICBkZWxldGUgdGhpcy5jdXJyZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnVwZGF0ZUN1cnJlbnQoW10sIGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICAvKiogQGRlcHJlY2F0ZWQgc2luY2UgMi4wLCByZW1vdmUgaW4gMy4wICovXG4gIHB1YmxpYyByb3dTZWxlY3Rpb25Nb2RlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBnZXQgX3NlbGVjdGFibGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGlvblR5cGUgPT09IFNlbGVjdGlvblR5cGUuTXVsdGkgfHwgdGhpcy5fc2VsZWN0aW9uVHlwZSA9PT0gU2VsZWN0aW9uVHlwZS5TaW5nbGU7XG4gIH1cbiAgLyoqXG4gICAqIElnbm9yZSBpdGVtcyBjaGFuZ2VzIGluIHRoZSBzYW1lIGNoYW5nZSBkZXRlY3Rpb24gY3ljbGUuXG4gICAqL1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmVcbiAgcHJpdmF0ZSBkZWJvdW5jZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBTdWJzY3JpcHRpb25zIHRvIHRoZSBvdGhlciBwcm92aWRlcnMgY2hhbmdlcy5cbiAgICovXG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICAvKipcbiAgICogQ2xlYW5zIHVwIG91ciBzdWJzY3JpcHRpb25zIHRvIG90aGVyIHByb3ZpZGVyc1xuICAgKi9cbiAgcHVibGljIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmZvckVhY2goc3ViID0+IHN1Yi51bnN1YnNjcmliZSgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgY3VycmVudCBzZWxlY3Rpb24gaW4gc2luZ2xlIHNlbGVjdGlvbiB0eXBlXG4gICAqL1xuICBwcml2YXRlIF9jdXJyZW50U2luZ2xlOiBUO1xuICBwdWJsaWMgZ2V0IGN1cnJlbnRTaW5nbGUoKTogVCB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRTaW5nbGU7XG4gIH1cbiAgcHVibGljIHNldCBjdXJyZW50U2luZ2xlKHZhbHVlOiBUKSB7XG4gICAgaWYgKHZhbHVlID09PSB0aGlzLl9jdXJyZW50U2luZ2xlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX2N1cnJlbnRTaW5nbGUgPSB2YWx1ZTtcbiAgICBpZiAodGhpcy5faXRlbXMuYWxsICYmIHRoaXMuX2l0ZW1zLnRyYWNrQnkgJiYgdmFsdWUpIHtcbiAgICAgIGNvbnN0IGxvb2t1cCA9IHRoaXMuX2l0ZW1zLmFsbC5maW5kSW5kZXgobWF5YmUgPT4gbWF5YmUgPT09IHZhbHVlKTtcbiAgICAgIHRoaXMucHJldlNpbmdsZVNlbGVjdGlvblJlZiA9IHRoaXMuX2l0ZW1zLnRyYWNrQnkobG9va3VwLCB2YWx1ZSk7XG4gICAgfVxuICAgIHRoaXMuZW1pdENoYW5nZSgpO1xuICAgIC8vIElnbm9yZSBpdGVtcyBjaGFuZ2VzIGluIHRoZSBzYW1lIGNoYW5nZSBkZXRlY3Rpb24gY3ljbGUuXG4gICAgLy8gQFRPRE8gVGhpcyBjYW4gbGlrZWx5IGJlIHJlbW92ZWQhXG4gICAgdGhpcy5kZWJvdW5jZSA9IHRydWU7XG4gICAgc2V0VGltZW91dCgoKSA9PiAodGhpcy5kZWJvdW5jZSA9IGZhbHNlKSk7XG4gIH1cblxuICAvKipcbiAgICogVGhlIGN1cnJlbnQgc2VsZWN0aW9uXG4gICAqL1xuICBwcml2YXRlIF9jdXJyZW50OiBUW107XG4gIHB1YmxpYyBnZXQgY3VycmVudCgpOiBUW10ge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50O1xuICB9XG4gIHB1YmxpYyBzZXQgY3VycmVudCh2YWx1ZTogVFtdKSB7XG4gICAgdGhpcy51cGRhdGVDdXJyZW50KHZhbHVlLCB0cnVlKTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGVDdXJyZW50KHZhbHVlOiBUW10sIGVtaXQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9jdXJyZW50ID0gdmFsdWU7XG4gICAgaWYgKGVtaXQpIHtcbiAgICAgIHRoaXMuZW1pdENoYW5nZSgpO1xuICAgICAgLy8gSWdub3JlIGl0ZW1zIGNoYW5nZXMgaW4gdGhlIHNhbWUgY2hhbmdlIGRldGVjdGlvbiBjeWNsZS5cbiAgICAgIC8vIEBUT0RPIFRoaXMgY2FuIGxpa2VseSBiZSByZW1vdmVkIVxuICAgICAgdGhpcy5kZWJvdW5jZSA9IHRydWU7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+ICh0aGlzLmRlYm91bmNlID0gZmFsc2UpKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhlIE9ic2VydmFibGUgdGhhdCBsZXRzIG90aGVyIGNsYXNzZXMgc3Vic2NyaWJlIHRvIHNlbGVjdGlvbiBjaGFuZ2VzXG4gICAqL1xuICBwcml2YXRlIF9jaGFuZ2UgPSBuZXcgU3ViamVjdDxUW10gfCBUPigpO1xuICBwcml2YXRlIGVtaXRDaGFuZ2UoKSB7XG4gICAgaWYgKHRoaXMuX3NlbGVjdGlvblR5cGUgPT09IFNlbGVjdGlvblR5cGUuU2luZ2xlKSB7XG4gICAgICB0aGlzLl9jaGFuZ2UubmV4dCh0aGlzLmN1cnJlbnRTaW5nbGUpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fc2VsZWN0aW9uVHlwZSA9PT0gU2VsZWN0aW9uVHlwZS5NdWx0aSkge1xuICAgICAgdGhpcy5fY2hhbmdlLm5leHQodGhpcy5jdXJyZW50KTtcbiAgICB9XG4gIH1cbiAgLy8gV2UgZG8gbm90IHdhbnQgdG8gZXhwb3NlIHRoZSBTdWJqZWN0IGl0c2VsZiwgYnV0IHRoZSBPYnNlcnZhYmxlIHdoaWNoIGlzIHJlYWQtb25seVxuICBwdWJsaWMgZ2V0IGNoYW5nZSgpOiBPYnNlcnZhYmxlPFRbXSB8IFQ+IHtcbiAgICByZXR1cm4gdGhpcy5fY2hhbmdlLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBhbiBpdGVtIGlzIGN1cnJlbnRseSBzZWxlY3RlZFxuICAgKi9cbiAgcHVibGljIGlzU2VsZWN0ZWQoaXRlbTogVCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLl9zZWxlY3Rpb25UeXBlID09PSBTZWxlY3Rpb25UeXBlLlNpbmdsZSkge1xuICAgICAgcmV0dXJuIHRoaXMuY3VycmVudFNpbmdsZSA9PT0gaXRlbTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX3NlbGVjdGlvblR5cGUgPT09IFNlbGVjdGlvblR5cGUuTXVsdGkpIHtcbiAgICAgIHJldHVybiB0aGlzLmN1cnJlbnQuaW5kZXhPZihpdGVtKSA+PSAwO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0cyBhbiBpdGVtXG4gICAqL1xuICBwcml2YXRlIHNlbGVjdEl0ZW0oaXRlbTogVCk6IHZvaWQge1xuICAgIHRoaXMuY3VycmVudC5wdXNoKGl0ZW0pO1xuICAgIGlmICh0aGlzLl9pdGVtcy50cmFja0J5KSB7XG4gICAgICAvLyBQdXNoIHNlbGVjdGVkIHJlZiBvbnRvIGFycmF5XG4gICAgICBjb25zdCBsb29rdXAgPSB0aGlzLl9pdGVtcy5hbGwuZmluZEluZGV4KG1heWJlID0+IG1heWJlID09PSBpdGVtKTtcbiAgICAgIHRoaXMucHJldlNlbGVjdGlvblJlZnMucHVzaCh0aGlzLl9pdGVtcy50cmFja0J5KGxvb2t1cCwgaXRlbSkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEZXNlbGVjdHMgYW4gaXRlbVxuICAgKi9cbiAgcHJpdmF0ZSBkZXNlbGVjdEl0ZW0oaW5kZXhPZkl0ZW06IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuY3VycmVudC5zcGxpY2UoaW5kZXhPZkl0ZW0sIDEpO1xuICAgIGlmICh0aGlzLl9pdGVtcy50cmFja0J5ICYmIGluZGV4T2ZJdGVtIDwgdGhpcy5wcmV2U2VsZWN0aW9uUmVmcy5sZW5ndGgpIHtcbiAgICAgIC8vIEtlZXAgc2VsZWN0ZWQgcmVmcyBhcnJheSBpbiBzeW5jXG4gICAgICB0aGlzLnByZXZTZWxlY3Rpb25SZWZzLnNwbGljZShpbmRleE9mSXRlbSwgMSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNlbGVjdHMgb3IgZGVzZWxlY3RzIGFuIGl0ZW1cbiAgICovXG4gIHB1YmxpYyBzZXRTZWxlY3RlZChpdGVtOiBULCBzZWxlY3RlZDogYm9vbGVhbikge1xuICAgIHN3aXRjaCAodGhpcy5fc2VsZWN0aW9uVHlwZSkge1xuICAgICAgY2FzZSBTZWxlY3Rpb25UeXBlLk5vbmU6XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBTZWxlY3Rpb25UeXBlLlNpbmdsZTpcbiAgICAgICAgLy8gaW4gc2luZ2xlIHNlbGVjdGlvbiwgc2V0IGN1cnJlbnRTaW5nbGUgbWV0aG9kIHNob3VsZCBiZSB1c2VkXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBTZWxlY3Rpb25UeXBlLk11bHRpOlxuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuY3VycmVudC5pbmRleE9mKGl0ZW0pO1xuICAgICAgICBpZiAoaW5kZXggPj0gMCAmJiAhc2VsZWN0ZWQpIHtcbiAgICAgICAgICB0aGlzLmRlc2VsZWN0SXRlbShpbmRleCk7XG4gICAgICAgICAgdGhpcy5lbWl0Q2hhbmdlKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoaW5kZXggPCAwICYmIHNlbGVjdGVkKSB7XG4gICAgICAgICAgdGhpcy5zZWxlY3RJdGVtKGl0ZW0pO1xuICAgICAgICAgIHRoaXMuZW1pdENoYW5nZSgpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBhbGwgY3VycmVudGx5IGRpc3BsYXllZCBpdGVtcyBhcmUgc2VsZWN0ZWRcbiAgICovXG4gIHB1YmxpYyBpc0FsbFNlbGVjdGVkKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLl9zZWxlY3Rpb25UeXBlICE9PSBTZWxlY3Rpb25UeXBlLk11bHRpIHx8ICF0aGlzLl9pdGVtcy5kaXNwbGF5ZWQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgZGlzcGxheWVkSXRlbXM6IFRbXSA9IHRoaXMuX2l0ZW1zLmRpc3BsYXllZDtcbiAgICBjb25zdCBuYkRpc3BsYXllZCA9IHRoaXMuX2l0ZW1zLmRpc3BsYXllZC5sZW5ndGg7XG4gICAgaWYgKG5iRGlzcGxheWVkIDwgMSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCB0ZW1wOiBUW10gPSBkaXNwbGF5ZWRJdGVtcy5maWx0ZXIoaXRlbSA9PiB0aGlzLmN1cnJlbnQuaW5kZXhPZihpdGVtKSA+IC0xKTtcbiAgICByZXR1cm4gdGVtcC5sZW5ndGggPT09IGRpc3BsYXllZEl0ZW1zLmxlbmd0aDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWxlY3RzIG9yIGRlc2VsZWN0cyBhbGwgY3VycmVudGx5IGRpc3BsYXllZCBpdGVtc1xuICAgKi9cbiAgcHVibGljIHRvZ2dsZUFsbCgpIHtcbiAgICBpZiAodGhpcy5fc2VsZWN0aW9uVHlwZSA9PT0gU2VsZWN0aW9uVHlwZS5Ob25lIHx8IHRoaXMuX3NlbGVjdGlvblR5cGUgPT09IFNlbGVjdGlvblR5cGUuU2luZ2xlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8qXG4gICAgICAgICAqIElmIGV2ZXJ5IGN1cnJlbnRseSBkaXNwbGF5ZWQgaXRlbSBpcyBhbHJlYWR5IHNlbGVjdGVkLCB3ZSBjbGVhciB0aGVtLlxuICAgICAgICAgKiBJZiBhdCBsZWFzdCBvbmUgaXRlbSBpc24ndCBzZWxlY3RlZCwgd2Ugc2VsZWN0IGV2ZXJ5IGN1cnJlbnRseSBkaXNwbGF5ZWQgaXRlbS5cbiAgICAgICAgICovXG4gICAgaWYgKHRoaXMuaXNBbGxTZWxlY3RlZCgpKSB7XG4gICAgICB0aGlzLl9pdGVtcy5kaXNwbGF5ZWQuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgY29uc3QgY3VycmVudEluZGV4ID0gdGhpcy5jdXJyZW50LmluZGV4T2YoaXRlbSk7XG4gICAgICAgIGlmIChjdXJyZW50SW5kZXggPiAtMSkge1xuICAgICAgICAgIHRoaXMuZGVzZWxlY3RJdGVtKGN1cnJlbnRJbmRleCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9pdGVtcy5kaXNwbGF5ZWQuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudC5pbmRleE9mKGl0ZW0pIDwgMCkge1xuICAgICAgICAgIHRoaXMuc2VsZWN0SXRlbShpdGVtKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMuZW1pdENoYW5nZSgpO1xuICB9XG59XG4iXX0=