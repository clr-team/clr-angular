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
var nbSelection = 0;
/** @enum {number} */
var SelectionType = {
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
var Selection = /** @class */ (function () {
    function Selection(_items, _filters) {
        var _this = this;
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
        this.subscriptions.push(this._filters.change.subscribe(function () {
            if (!_this._selectable) {
                return;
            }
            _this.clearSelection();
        }));
        this.subscriptions.push(this._items.allChanges.subscribe(function (updatedItems) {
            switch (_this.selectionType) {
                case SelectionType.None: {
                    break;
                }
                case SelectionType.Single: {
                    /** @type {?} */
                    var newSingle_1;
                    /** @type {?} */
                    var trackBy_1 = _this._items.trackBy;
                    /** @type {?} */
                    var selectionUpdated_1 = false;
                    // if the currentSingle has been set before data was loaded, we look up and save the ref from current data set
                    if (_this.currentSingle && !_this.prevSingleSelectionRef) {
                        if (_this._items.all && _this._items.trackBy) {
                            /** @type {?} */
                            var lookup = _this._items.all.findIndex(function (maybe) { return maybe === _this.currentSingle; });
                            _this.prevSingleSelectionRef = _this._items.trackBy(lookup, _this.currentSingle);
                        }
                    }
                    updatedItems.forEach(function (item, index) {
                        /** @type {?} */
                        var ref = trackBy_1(index, item);
                        // If one of the updated items is the previously selectedSingle, set it as the new one
                        if (_this.prevSingleSelectionRef === ref) {
                            newSingle_1 = item;
                            selectionUpdated_1 = true;
                        }
                    });
                    // If we're using smart datagrids, we expect all items to be present in the updatedItems array.
                    // Therefore, we should delete the currentSingle if it used to be defined but doesn't exist anymore.
                    // No explicit "delete" is required, since newSingle would be undefined at this point.
                    // Marking it as selectionUpdated here will set currentSingle to undefined below in the setTimeout.
                    if (_this._items.smart && !newSingle_1) {
                        selectionUpdated_1 = true;
                    }
                    // TODO: Discussed this with Eudes and this is fine for now.
                    // But we need to figure out a different pattern for the
                    // child triggering the parent change detection problem.
                    // Using setTimeout for now to fix this.
                    setTimeout(function () {
                        if (selectionUpdated_1) {
                            _this.currentSingle = newSingle_1;
                        }
                    }, 0);
                    break;
                }
                case SelectionType.Multi: {
                    /** @type {?} */
                    var leftOver_1 = _this.current.slice();
                    /** @type {?} */
                    var trackBy_2 = _this._items.trackBy;
                    /** @type {?} */
                    var selectionUpdated_2 = false;
                    // if the current has been set before data was loaded, we look up and save the ref from current data set
                    if (_this.current.length > 0 && _this.prevSelectionRefs.length !== _this.current.length) {
                        if (_this._items.all && _this._items.trackBy) {
                            _this.prevSelectionRefs = [];
                            _this.current.forEach(function (item) {
                                /** @type {?} */
                                var lookup = _this._items.all.findIndex(function (maybe) { return maybe === item; });
                                _this.prevSelectionRefs.push(_this._items.trackBy(lookup, item));
                            });
                        }
                    }
                    // TODO: revisit this when we work on https://github.com/vmware/clarity/issues/2342
                    // currently, the selection is cleared when filter is applied, so the logic inside
                    // the if statement below results in broken behavior.
                    if (leftOver_1.length > 0) {
                        updatedItems.forEach(function (item, index) {
                            /** @type {?} */
                            var ref = trackBy_2(index, item);
                            // Look in current selected refs array if item is selected, and update actual value
                            /** @type {?} */
                            var selectedIndex = _this.prevSelectionRefs.indexOf(ref);
                            if (selectedIndex > -1) {
                                leftOver_1[selectedIndex] = item;
                                selectionUpdated_2 = true;
                            }
                        });
                        // Filter out any unmatched items if we're using smart datagrids where we expect all items to be
                        // present
                        if (_this._items.smart) {
                            leftOver_1 = leftOver_1.filter(function (selected) { return updatedItems.indexOf(selected) > -1; });
                            if (_this.current.length !== leftOver_1.length) {
                                selectionUpdated_2 = true;
                            }
                        }
                        // TODO: Discussed this with Eudes and this is fine for now.
                        // But we need to figure out a different pattern for the
                        // child triggering the parent change detection problem.
                        // Using setTimeout for now to fix this.
                        setTimeout(function () {
                            if (selectionUpdated_2) {
                                _this.current = leftOver_1;
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
    Selection.prototype.clearSelection = /**
     * @return {?}
     */
    function () {
        this.current.length = 0;
        this.prevSelectionRefs = [];
        this._currentSingle = null;
        this.prevSingleSelectionRef = null;
        this.emitChange();
    };
    Object.defineProperty(Selection.prototype, "selectionType", {
        get: /**
         * @return {?}
         */
        function () {
            return this._selectionType;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Selection.prototype, "_selectable", {
        get: /**
         * @return {?}
         */
        function () {
            return this._selectionType === SelectionType.Multi || this._selectionType === SelectionType.Single;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Cleans up our subscriptions to other providers
     */
    /**
     * Cleans up our subscriptions to other providers
     * @return {?}
     */
    Selection.prototype.destroy = /**
     * Cleans up our subscriptions to other providers
     * @return {?}
     */
    function () {
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    Object.defineProperty(Selection.prototype, "currentSingle", {
        get: /**
         * @return {?}
         */
        function () {
            return this._currentSingle;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var _this = this;
            if (value === this._currentSingle) {
                return;
            }
            this._currentSingle = value;
            if (this._items.all && this._items.trackBy && value) {
                /** @type {?} */
                var lookup = this._items.all.findIndex(function (maybe) { return maybe === value; });
                this.prevSingleSelectionRef = this._items.trackBy(lookup, value);
            }
            this.emitChange();
            // Ignore items changes in the same change detection cycle.
            // @TODO This can likely be removed!
            this.debounce = true;
            setTimeout(function () { return (_this.debounce = false); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Selection.prototype, "current", {
        get: /**
         * @return {?}
         */
        function () {
            return this._current;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.updateCurrent(value, true);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} value
     * @param {?} emit
     * @return {?}
     */
    Selection.prototype.updateCurrent = /**
     * @param {?} value
     * @param {?} emit
     * @return {?}
     */
    function (value, emit) {
        var _this = this;
        this._current = value;
        if (emit) {
            this.emitChange();
            // Ignore items changes in the same change detection cycle.
            // @TODO This can likely be removed!
            this.debounce = true;
            setTimeout(function () { return (_this.debounce = false); });
        }
    };
    /**
     * @return {?}
     */
    Selection.prototype.emitChange = /**
     * @return {?}
     */
    function () {
        if (this._selectionType === SelectionType.Single) {
            this._change.next(this.currentSingle);
        }
        else if (this._selectionType === SelectionType.Multi) {
            this._change.next(this.current);
        }
    };
    Object.defineProperty(Selection.prototype, "change", {
        // We do not want to expose the Subject itself, but the Observable which is read-only
        get: 
        // We do not want to expose the Subject itself, but the Observable which is read-only
        /**
         * @return {?}
         */
        function () {
            return this._change.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Checks if an item is currently selected
     */
    /**
     * Checks if an item is currently selected
     * @param {?} item
     * @return {?}
     */
    Selection.prototype.isSelected = /**
     * Checks if an item is currently selected
     * @param {?} item
     * @return {?}
     */
    function (item) {
        if (this._selectionType === SelectionType.Single) {
            return this.currentSingle === item;
        }
        else if (this._selectionType === SelectionType.Multi) {
            return this.current.indexOf(item) >= 0;
        }
        return false;
    };
    /**
     * Selects an item
     */
    /**
     * Selects an item
     * @param {?} item
     * @return {?}
     */
    Selection.prototype.selectItem = /**
     * Selects an item
     * @param {?} item
     * @return {?}
     */
    function (item) {
        this.current.push(item);
        if (this._items.trackBy) {
            // Push selected ref onto array
            /** @type {?} */
            var lookup = this._items.all.findIndex(function (maybe) { return maybe === item; });
            this.prevSelectionRefs.push(this._items.trackBy(lookup, item));
        }
    };
    /**
     * Deselects an item
     */
    /**
     * Deselects an item
     * @param {?} indexOfItem
     * @return {?}
     */
    Selection.prototype.deselectItem = /**
     * Deselects an item
     * @param {?} indexOfItem
     * @return {?}
     */
    function (indexOfItem) {
        this.current.splice(indexOfItem, 1);
        if (this._items.trackBy && indexOfItem < this.prevSelectionRefs.length) {
            // Keep selected refs array in sync
            this.prevSelectionRefs.splice(indexOfItem, 1);
        }
    };
    /**
     * Selects or deselects an item
     */
    /**
     * Selects or deselects an item
     * @param {?} item
     * @param {?} selected
     * @return {?}
     */
    Selection.prototype.setSelected = /**
     * Selects or deselects an item
     * @param {?} item
     * @param {?} selected
     * @return {?}
     */
    function (item, selected) {
        switch (this._selectionType) {
            case SelectionType.None:
                break;
            case SelectionType.Single:
                // in single selection, set currentSingle method should be used
                break;
            case SelectionType.Multi:
                /** @type {?} */
                var index = this.current.indexOf(item);
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
    };
    /**
     * Checks if all currently displayed items are selected
     */
    /**
     * Checks if all currently displayed items are selected
     * @return {?}
     */
    Selection.prototype.isAllSelected = /**
     * Checks if all currently displayed items are selected
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._selectionType !== SelectionType.Multi || !this._items.displayed) {
            return false;
        }
        /** @type {?} */
        var displayedItems = this._items.displayed;
        /** @type {?} */
        var nbDisplayed = this._items.displayed.length;
        if (nbDisplayed < 1) {
            return false;
        }
        /** @type {?} */
        var temp = displayedItems.filter(function (item) { return _this.current.indexOf(item) > -1; });
        return temp.length === displayedItems.length;
    };
    /**
     * Selects or deselects all currently displayed items
     */
    /**
     * Selects or deselects all currently displayed items
     * @return {?}
     */
    Selection.prototype.toggleAll = /**
     * Selects or deselects all currently displayed items
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._selectionType === SelectionType.None || this._selectionType === SelectionType.Single) {
            return;
        }
        /*
             * If every currently displayed item is already selected, we clear them.
             * If at least one item isn't selected, we select every currently displayed item.
             */
        if (this.isAllSelected()) {
            this._items.displayed.forEach(function (item) {
                /** @type {?} */
                var currentIndex = _this.current.indexOf(item);
                if (currentIndex > -1) {
                    _this.deselectItem(currentIndex);
                }
            });
        }
        else {
            this._items.displayed.forEach(function (item) {
                if (_this.current.indexOf(item) < 0) {
                    _this.selectItem(item);
                }
            });
        }
        this.emitChange();
    };
    Selection.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Selection.ctorParameters = function () { return [
        { type: Items },
        { type: FiltersProvider }
    ]; };
    return Selection;
}());
export { Selection };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9wcm92aWRlcnMvc2VsZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtBLE9BQU8sRUFBRSxVQUFVLEVBQW1CLE1BQU0sZUFBZSxDQUFDO0FBRTVELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFHL0IsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUM1QyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sU0FBUyxDQUFDOztJQUU1QixXQUFXLEdBQVcsQ0FBQzs7O0lBR3pCLE9BQUk7SUFDSixTQUFNO0lBQ04sUUFBSzs7Ozs7Ozs7O0FBR1A7SUFNRSxtQkFBb0IsTUFBZ0IsRUFBVSxRQUE0QjtRQUExRSxpQkF1SEM7UUF2SG1CLFdBQU0sR0FBTixNQUFNLENBQVU7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFvQjtRQUhsRSxzQkFBaUIsR0FBUSxFQUFFLENBQUMsQ0FBQyx5QkFBeUI7UUFvSXRELG1CQUFjLEdBQWtCLGFBQWEsQ0FBQyxJQUFJLENBQUM7UUFnQnBELHFCQUFnQixHQUFZLEtBQUssQ0FBQzs7Ozs7UUFTakMsYUFBUSxHQUFZLEtBQUssQ0FBQzs7OztRQUsxQixrQkFBYSxHQUFtQixFQUFFLENBQUM7Ozs7UUF5RG5DLFlBQU8sR0FBRyxJQUFJLE9BQU8sRUFBVyxDQUFDO1FBdk52QyxJQUFJLENBQUMsRUFBRSxHQUFHLGtCQUFrQixHQUFHLFdBQVcsRUFBRSxDQUFDO1FBRTdDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7WUFDN0IsSUFBSSxDQUFDLEtBQUksQ0FBQyxXQUFXLEVBQUU7Z0JBQ3JCLE9BQU87YUFDUjtZQUNELEtBQUksQ0FBQyxjQUFjLEVBQUUsQ0FB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Qjs7Ozs7SUFzQnRCLDRCQUF5Qzs7SUF4TjdCLDJCQUF3Qjs7SUFBRSw2QkFBb0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBUcmFja0J5RnVuY3Rpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBGaWx0ZXJzUHJvdmlkZXIgfSBmcm9tICcuL2ZpbHRlcnMnO1xuaW1wb3J0IHsgSXRlbXMgfSBmcm9tICcuL2l0ZW1zJztcblxubGV0IG5iU2VsZWN0aW9uOiBudW1iZXIgPSAwO1xuXG5leHBvcnQgZW51bSBTZWxlY3Rpb25UeXBlIHtcbiAgTm9uZSxcbiAgU2luZ2xlLFxuICBNdWx0aSxcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNlbGVjdGlvbjxUID0gYW55PiB7XG4gIHB1YmxpYyBpZDogc3RyaW5nO1xuICBwcml2YXRlIHByZXZTZWxlY3Rpb25SZWZzOiBUW10gPSBbXTsgLy8gUmVmcyBvZiBzZWxlY3RlZCBpdGVtc1xuICBwcml2YXRlIHByZXZTaW5nbGVTZWxlY3Rpb25SZWY6IFQ7IC8vIFJlZiBvZiBzaW5nbGUgc2VsZWN0ZWQgaXRlbVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2l0ZW1zOiBJdGVtczxUPiwgcHJpdmF0ZSBfZmlsdGVyczogRmlsdGVyc1Byb3ZpZGVyPFQ+KSB7XG4gICAgdGhpcy5pZCA9ICdjbHItZGctc2VsZWN0aW9uJyArIG5iU2VsZWN0aW9uKys7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMuX2ZpbHRlcnMuY2hhbmdlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5fc2VsZWN0YWJsZSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICB9KVxuICAgICk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMuX2l0ZW1zLmFsbENoYW5nZXMuc3Vic2NyaWJlKHVwZGF0ZWRJdGVtcyA9PiB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5zZWxlY3Rpb25UeXBlKSB7XG4gICAgICAgICAgY2FzZSBTZWxlY3Rpb25UeXBlLk5vbmU6IHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNhc2UgU2VsZWN0aW9uVHlwZS5TaW5nbGU6IHtcbiAgICAgICAgICAgIGxldCBuZXdTaW5nbGU6IGFueTtcbiAgICAgICAgICAgIGNvbnN0IHRyYWNrQnk6IFRyYWNrQnlGdW5jdGlvbjxUPiA9IHRoaXMuX2l0ZW1zLnRyYWNrQnk7XG4gICAgICAgICAgICBsZXQgc2VsZWN0aW9uVXBkYXRlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgICAgICAgICAvLyBpZiB0aGUgY3VycmVudFNpbmdsZSBoYXMgYmVlbiBzZXQgYmVmb3JlIGRhdGEgd2FzIGxvYWRlZCwgd2UgbG9vayB1cCBhbmQgc2F2ZSB0aGUgcmVmIGZyb20gY3VycmVudCBkYXRhIHNldFxuICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudFNpbmdsZSAmJiAhdGhpcy5wcmV2U2luZ2xlU2VsZWN0aW9uUmVmKSB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLl9pdGVtcy5hbGwgJiYgdGhpcy5faXRlbXMudHJhY2tCeSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGxvb2t1cCA9IHRoaXMuX2l0ZW1zLmFsbC5maW5kSW5kZXgobWF5YmUgPT4gbWF5YmUgPT09IHRoaXMuY3VycmVudFNpbmdsZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5wcmV2U2luZ2xlU2VsZWN0aW9uUmVmID0gdGhpcy5faXRlbXMudHJhY2tCeShsb29rdXAsIHRoaXMuY3VycmVudFNpbmdsZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdXBkYXRlZEl0ZW1zLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHJlZiA9IHRyYWNrQnkoaW5kZXgsIGl0ZW0pO1xuICAgICAgICAgICAgICAvLyBJZiBvbmUgb2YgdGhlIHVwZGF0ZWQgaXRlbXMgaXMgdGhlIHByZXZpb3VzbHkgc2VsZWN0ZWRTaW5nbGUsIHNldCBpdCBhcyB0aGUgbmV3IG9uZVxuICAgICAgICAgICAgICBpZiAodGhpcy5wcmV2U2luZ2xlU2VsZWN0aW9uUmVmID09PSByZWYpIHtcbiAgICAgICAgICAgICAgICBuZXdTaW5nbGUgPSBpdGVtO1xuICAgICAgICAgICAgICAgIHNlbGVjdGlvblVwZGF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gSWYgd2UncmUgdXNpbmcgc21hcnQgZGF0YWdyaWRzLCB3ZSBleHBlY3QgYWxsIGl0ZW1zIHRvIGJlIHByZXNlbnQgaW4gdGhlIHVwZGF0ZWRJdGVtcyBhcnJheS5cbiAgICAgICAgICAgIC8vIFRoZXJlZm9yZSwgd2Ugc2hvdWxkIGRlbGV0ZSB0aGUgY3VycmVudFNpbmdsZSBpZiBpdCB1c2VkIHRvIGJlIGRlZmluZWQgYnV0IGRvZXNuJ3QgZXhpc3QgYW55bW9yZS5cbiAgICAgICAgICAgIC8vIE5vIGV4cGxpY2l0IFwiZGVsZXRlXCIgaXMgcmVxdWlyZWQsIHNpbmNlIG5ld1NpbmdsZSB3b3VsZCBiZSB1bmRlZmluZWQgYXQgdGhpcyBwb2ludC5cbiAgICAgICAgICAgIC8vIE1hcmtpbmcgaXQgYXMgc2VsZWN0aW9uVXBkYXRlZCBoZXJlIHdpbGwgc2V0IGN1cnJlbnRTaW5nbGUgdG8gdW5kZWZpbmVkIGJlbG93IGluIHRoZSBzZXRUaW1lb3V0LlxuICAgICAgICAgICAgaWYgKHRoaXMuX2l0ZW1zLnNtYXJ0ICYmICFuZXdTaW5nbGUpIHtcbiAgICAgICAgICAgICAgc2VsZWN0aW9uVXBkYXRlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFRPRE86IERpc2N1c3NlZCB0aGlzIHdpdGggRXVkZXMgYW5kIHRoaXMgaXMgZmluZSBmb3Igbm93LlxuICAgICAgICAgICAgLy8gQnV0IHdlIG5lZWQgdG8gZmlndXJlIG91dCBhIGRpZmZlcmVudCBwYXR0ZXJuIGZvciB0aGVcbiAgICAgICAgICAgIC8vIGNoaWxkIHRyaWdnZXJpbmcgdGhlIHBhcmVudCBjaGFuZ2UgZGV0ZWN0aW9uIHByb2JsZW0uXG4gICAgICAgICAgICAvLyBVc2luZyBzZXRUaW1lb3V0IGZvciBub3cgdG8gZml4IHRoaXMuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgaWYgKHNlbGVjdGlvblVwZGF0ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRTaW5nbGUgPSBuZXdTaW5nbGU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY2FzZSBTZWxlY3Rpb25UeXBlLk11bHRpOiB7XG4gICAgICAgICAgICBsZXQgbGVmdE92ZXI6IGFueVtdID0gdGhpcy5jdXJyZW50LnNsaWNlKCk7XG4gICAgICAgICAgICBjb25zdCB0cmFja0J5OiBUcmFja0J5RnVuY3Rpb248YW55PiA9IHRoaXMuX2l0ZW1zLnRyYWNrQnk7XG4gICAgICAgICAgICBsZXQgc2VsZWN0aW9uVXBkYXRlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgICAgICAgICAvLyBpZiB0aGUgY3VycmVudCBoYXMgYmVlbiBzZXQgYmVmb3JlIGRhdGEgd2FzIGxvYWRlZCwgd2UgbG9vayB1cCBhbmQgc2F2ZSB0aGUgcmVmIGZyb20gY3VycmVudCBkYXRhIHNldFxuICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudC5sZW5ndGggPiAwICYmIHRoaXMucHJldlNlbGVjdGlvblJlZnMubGVuZ3RoICE9PSB0aGlzLmN1cnJlbnQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLl9pdGVtcy5hbGwgJiYgdGhpcy5faXRlbXMudHJhY2tCeSkge1xuICAgICAgICAgICAgICAgIHRoaXMucHJldlNlbGVjdGlvblJlZnMgPSBbXTtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnQuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGxvb2t1cCA9IHRoaXMuX2l0ZW1zLmFsbC5maW5kSW5kZXgobWF5YmUgPT4gbWF5YmUgPT09IGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgdGhpcy5wcmV2U2VsZWN0aW9uUmVmcy5wdXNoKHRoaXMuX2l0ZW1zLnRyYWNrQnkobG9va3VwLCBpdGVtKSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gVE9ETzogcmV2aXNpdCB0aGlzIHdoZW4gd2Ugd29yayBvbiBodHRwczovL2dpdGh1Yi5jb20vdm13YXJlL2NsYXJpdHkvaXNzdWVzLzIzNDJcbiAgICAgICAgICAgIC8vIGN1cnJlbnRseSwgdGhlIHNlbGVjdGlvbiBpcyBjbGVhcmVkIHdoZW4gZmlsdGVyIGlzIGFwcGxpZWQsIHNvIHRoZSBsb2dpYyBpbnNpZGVcbiAgICAgICAgICAgIC8vIHRoZSBpZiBzdGF0ZW1lbnQgYmVsb3cgcmVzdWx0cyBpbiBicm9rZW4gYmVoYXZpb3IuXG4gICAgICAgICAgICBpZiAobGVmdE92ZXIubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICB1cGRhdGVkSXRlbXMuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCByZWYgPSB0cmFja0J5KGluZGV4LCBpdGVtKTtcbiAgICAgICAgICAgICAgICAvLyBMb29rIGluIGN1cnJlbnQgc2VsZWN0ZWQgcmVmcyBhcnJheSBpZiBpdGVtIGlzIHNlbGVjdGVkLCBhbmQgdXBkYXRlIGFjdHVhbCB2YWx1ZVxuICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkSW5kZXggPSB0aGlzLnByZXZTZWxlY3Rpb25SZWZzLmluZGV4T2YocmVmKTtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRJbmRleCA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICBsZWZ0T3ZlcltzZWxlY3RlZEluZGV4XSA9IGl0ZW07XG4gICAgICAgICAgICAgICAgICBzZWxlY3Rpb25VcGRhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgIC8vIEZpbHRlciBvdXQgYW55IHVubWF0Y2hlZCBpdGVtcyBpZiB3ZSdyZSB1c2luZyBzbWFydCBkYXRhZ3JpZHMgd2hlcmUgd2UgZXhwZWN0IGFsbCBpdGVtcyB0byBiZVxuICAgICAgICAgICAgICAvLyBwcmVzZW50XG4gICAgICAgICAgICAgIGlmICh0aGlzLl9pdGVtcy5zbWFydCkge1xuICAgICAgICAgICAgICAgIGxlZnRPdmVyID0gbGVmdE92ZXIuZmlsdGVyKHNlbGVjdGVkID0+IHVwZGF0ZWRJdGVtcy5pbmRleE9mKHNlbGVjdGVkKSA+IC0xKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50Lmxlbmd0aCAhPT0gbGVmdE92ZXIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICBzZWxlY3Rpb25VcGRhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAvLyBUT0RPOiBEaXNjdXNzZWQgdGhpcyB3aXRoIEV1ZGVzIGFuZCB0aGlzIGlzIGZpbmUgZm9yIG5vdy5cbiAgICAgICAgICAgICAgLy8gQnV0IHdlIG5lZWQgdG8gZmlndXJlIG91dCBhIGRpZmZlcmVudCBwYXR0ZXJuIGZvciB0aGVcbiAgICAgICAgICAgICAgLy8gY2hpbGQgdHJpZ2dlcmluZyB0aGUgcGFyZW50IGNoYW5nZSBkZXRlY3Rpb24gcHJvYmxlbS5cbiAgICAgICAgICAgICAgLy8gVXNpbmcgc2V0VGltZW91dCBmb3Igbm93IHRvIGZpeCB0aGlzLlxuICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0aW9uVXBkYXRlZCkge1xuICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50ID0gbGVmdE92ZXI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgcHVibGljIGNsZWFyU2VsZWN0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMuY3VycmVudC5sZW5ndGggPSAwO1xuICAgIHRoaXMucHJldlNlbGVjdGlvblJlZnMgPSBbXTtcbiAgICB0aGlzLl9jdXJyZW50U2luZ2xlID0gbnVsbDtcbiAgICB0aGlzLnByZXZTaW5nbGVTZWxlY3Rpb25SZWYgPSBudWxsO1xuICAgIHRoaXMuZW1pdENoYW5nZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2VsZWN0aW9uVHlwZTogU2VsZWN0aW9uVHlwZSA9IFNlbGVjdGlvblR5cGUuTm9uZTtcbiAgcHVibGljIGdldCBzZWxlY3Rpb25UeXBlKCk6IFNlbGVjdGlvblR5cGUge1xuICAgIHJldHVybiB0aGlzLl9zZWxlY3Rpb25UeXBlO1xuICB9XG4gIHB1YmxpYyBzZXQgc2VsZWN0aW9uVHlwZSh2YWx1ZTogU2VsZWN0aW9uVHlwZSkge1xuICAgIGlmICh2YWx1ZSA9PT0gdGhpcy5zZWxlY3Rpb25UeXBlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX3NlbGVjdGlvblR5cGUgPSB2YWx1ZTtcbiAgICBpZiAodmFsdWUgPT09IFNlbGVjdGlvblR5cGUuTm9uZSkge1xuICAgICAgZGVsZXRlIHRoaXMuY3VycmVudDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy51cGRhdGVDdXJyZW50KFtdLCBmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHJvd1NlbGVjdGlvbk1vZGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBwcml2YXRlIGdldCBfc2VsZWN0YWJsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0aW9uVHlwZSA9PT0gU2VsZWN0aW9uVHlwZS5NdWx0aSB8fCB0aGlzLl9zZWxlY3Rpb25UeXBlID09PSBTZWxlY3Rpb25UeXBlLlNpbmdsZTtcbiAgfVxuICAvKipcbiAgICogSWdub3JlIGl0ZW1zIGNoYW5nZXMgaW4gdGhlIHNhbWUgY2hhbmdlIGRldGVjdGlvbiBjeWNsZS5cbiAgICovXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZVxuICBwcml2YXRlIGRlYm91bmNlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFN1YnNjcmlwdGlvbnMgdG8gdGhlIG90aGVyIHByb3ZpZGVycyBjaGFuZ2VzLlxuICAgKi9cbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gIC8qKlxuICAgKiBDbGVhbnMgdXAgb3VyIHN1YnNjcmlwdGlvbnMgdG8gb3RoZXIgcHJvdmlkZXJzXG4gICAqL1xuICBwdWJsaWMgZGVzdHJveSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaChzdWIgPT4gc3ViLnVuc3Vic2NyaWJlKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBjdXJyZW50IHNlbGVjdGlvbiBpbiBzaW5nbGUgc2VsZWN0aW9uIHR5cGVcbiAgICovXG4gIHByaXZhdGUgX2N1cnJlbnRTaW5nbGU6IFQ7XG4gIHB1YmxpYyBnZXQgY3VycmVudFNpbmdsZSgpOiBUIHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudFNpbmdsZTtcbiAgfVxuICBwdWJsaWMgc2V0IGN1cnJlbnRTaW5nbGUodmFsdWU6IFQpIHtcbiAgICBpZiAodmFsdWUgPT09IHRoaXMuX2N1cnJlbnRTaW5nbGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fY3VycmVudFNpbmdsZSA9IHZhbHVlO1xuICAgIGlmICh0aGlzLl9pdGVtcy5hbGwgJiYgdGhpcy5faXRlbXMudHJhY2tCeSAmJiB2YWx1ZSkge1xuICAgICAgY29uc3QgbG9va3VwID0gdGhpcy5faXRlbXMuYWxsLmZpbmRJbmRleChtYXliZSA9PiBtYXliZSA9PT0gdmFsdWUpO1xuICAgICAgdGhpcy5wcmV2U2luZ2xlU2VsZWN0aW9uUmVmID0gdGhpcy5faXRlbXMudHJhY2tCeShsb29rdXAsIHZhbHVlKTtcbiAgICB9XG4gICAgdGhpcy5lbWl0Q2hhbmdlKCk7XG4gICAgLy8gSWdub3JlIGl0ZW1zIGNoYW5nZXMgaW4gdGhlIHNhbWUgY2hhbmdlIGRldGVjdGlvbiBjeWNsZS5cbiAgICAvLyBAVE9ETyBUaGlzIGNhbiBsaWtlbHkgYmUgcmVtb3ZlZCFcbiAgICB0aGlzLmRlYm91bmNlID0gdHJ1ZTtcbiAgICBzZXRUaW1lb3V0KCgpID0+ICh0aGlzLmRlYm91bmNlID0gZmFsc2UpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgY3VycmVudCBzZWxlY3Rpb25cbiAgICovXG4gIHByaXZhdGUgX2N1cnJlbnQ6IFRbXTtcbiAgcHVibGljIGdldCBjdXJyZW50KCk6IFRbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnQ7XG4gIH1cbiAgcHVibGljIHNldCBjdXJyZW50KHZhbHVlOiBUW10pIHtcbiAgICB0aGlzLnVwZGF0ZUN1cnJlbnQodmFsdWUsIHRydWUpO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZUN1cnJlbnQodmFsdWU6IFRbXSwgZW1pdDogYm9vbGVhbikge1xuICAgIHRoaXMuX2N1cnJlbnQgPSB2YWx1ZTtcbiAgICBpZiAoZW1pdCkge1xuICAgICAgdGhpcy5lbWl0Q2hhbmdlKCk7XG4gICAgICAvLyBJZ25vcmUgaXRlbXMgY2hhbmdlcyBpbiB0aGUgc2FtZSBjaGFuZ2UgZGV0ZWN0aW9uIGN5Y2xlLlxuICAgICAgLy8gQFRPRE8gVGhpcyBjYW4gbGlrZWx5IGJlIHJlbW92ZWQhXG4gICAgICB0aGlzLmRlYm91bmNlID0gdHJ1ZTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gKHRoaXMuZGVib3VuY2UgPSBmYWxzZSkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgT2JzZXJ2YWJsZSB0aGF0IGxldHMgb3RoZXIgY2xhc3NlcyBzdWJzY3JpYmUgdG8gc2VsZWN0aW9uIGNoYW5nZXNcbiAgICovXG4gIHByaXZhdGUgX2NoYW5nZSA9IG5ldyBTdWJqZWN0PFRbXSB8IFQ+KCk7XG4gIHByaXZhdGUgZW1pdENoYW5nZSgpIHtcbiAgICBpZiAodGhpcy5fc2VsZWN0aW9uVHlwZSA9PT0gU2VsZWN0aW9uVHlwZS5TaW5nbGUpIHtcbiAgICAgIHRoaXMuX2NoYW5nZS5uZXh0KHRoaXMuY3VycmVudFNpbmdsZSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLl9zZWxlY3Rpb25UeXBlID09PSBTZWxlY3Rpb25UeXBlLk11bHRpKSB7XG4gICAgICB0aGlzLl9jaGFuZ2UubmV4dCh0aGlzLmN1cnJlbnQpO1xuICAgIH1cbiAgfVxuICAvLyBXZSBkbyBub3Qgd2FudCB0byBleHBvc2UgdGhlIFN1YmplY3QgaXRzZWxmLCBidXQgdGhlIE9ic2VydmFibGUgd2hpY2ggaXMgcmVhZC1vbmx5XG4gIHB1YmxpYyBnZXQgY2hhbmdlKCk6IE9ic2VydmFibGU8VFtdIHwgVD4ge1xuICAgIHJldHVybiB0aGlzLl9jaGFuZ2UuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIGFuIGl0ZW0gaXMgY3VycmVudGx5IHNlbGVjdGVkXG4gICAqL1xuICBwdWJsaWMgaXNTZWxlY3RlZChpdGVtOiBUKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuX3NlbGVjdGlvblR5cGUgPT09IFNlbGVjdGlvblR5cGUuU2luZ2xlKSB7XG4gICAgICByZXR1cm4gdGhpcy5jdXJyZW50U2luZ2xlID09PSBpdGVtO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fc2VsZWN0aW9uVHlwZSA9PT0gU2VsZWN0aW9uVHlwZS5NdWx0aSkge1xuICAgICAgcmV0dXJuIHRoaXMuY3VycmVudC5pbmRleE9mKGl0ZW0pID49IDA7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWxlY3RzIGFuIGl0ZW1cbiAgICovXG4gIHByaXZhdGUgc2VsZWN0SXRlbShpdGVtOiBUKTogdm9pZCB7XG4gICAgdGhpcy5jdXJyZW50LnB1c2goaXRlbSk7XG4gICAgaWYgKHRoaXMuX2l0ZW1zLnRyYWNrQnkpIHtcbiAgICAgIC8vIFB1c2ggc2VsZWN0ZWQgcmVmIG9udG8gYXJyYXlcbiAgICAgIGNvbnN0IGxvb2t1cCA9IHRoaXMuX2l0ZW1zLmFsbC5maW5kSW5kZXgobWF5YmUgPT4gbWF5YmUgPT09IGl0ZW0pO1xuICAgICAgdGhpcy5wcmV2U2VsZWN0aW9uUmVmcy5wdXNoKHRoaXMuX2l0ZW1zLnRyYWNrQnkobG9va3VwLCBpdGVtKSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERlc2VsZWN0cyBhbiBpdGVtXG4gICAqL1xuICBwcml2YXRlIGRlc2VsZWN0SXRlbShpbmRleE9mSXRlbTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5jdXJyZW50LnNwbGljZShpbmRleE9mSXRlbSwgMSk7XG4gICAgaWYgKHRoaXMuX2l0ZW1zLnRyYWNrQnkgJiYgaW5kZXhPZkl0ZW0gPCB0aGlzLnByZXZTZWxlY3Rpb25SZWZzLmxlbmd0aCkge1xuICAgICAgLy8gS2VlcCBzZWxlY3RlZCByZWZzIGFycmF5IGluIHN5bmNcbiAgICAgIHRoaXMucHJldlNlbGVjdGlvblJlZnMuc3BsaWNlKGluZGV4T2ZJdGVtLCAxKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0cyBvciBkZXNlbGVjdHMgYW4gaXRlbVxuICAgKi9cbiAgcHVibGljIHNldFNlbGVjdGVkKGl0ZW06IFQsIHNlbGVjdGVkOiBib29sZWFuKSB7XG4gICAgc3dpdGNoICh0aGlzLl9zZWxlY3Rpb25UeXBlKSB7XG4gICAgICBjYXNlIFNlbGVjdGlvblR5cGUuTm9uZTpcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFNlbGVjdGlvblR5cGUuU2luZ2xlOlxuICAgICAgICAvLyBpbiBzaW5nbGUgc2VsZWN0aW9uLCBzZXQgY3VycmVudFNpbmdsZSBtZXRob2Qgc2hvdWxkIGJlIHVzZWRcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFNlbGVjdGlvblR5cGUuTXVsdGk6XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5jdXJyZW50LmluZGV4T2YoaXRlbSk7XG4gICAgICAgIGlmIChpbmRleCA+PSAwICYmICFzZWxlY3RlZCkge1xuICAgICAgICAgIHRoaXMuZGVzZWxlY3RJdGVtKGluZGV4KTtcbiAgICAgICAgICB0aGlzLmVtaXRDaGFuZ2UoKTtcbiAgICAgICAgfSBlbHNlIGlmIChpbmRleCA8IDAgJiYgc2VsZWN0ZWQpIHtcbiAgICAgICAgICB0aGlzLnNlbGVjdEl0ZW0oaXRlbSk7XG4gICAgICAgICAgdGhpcy5lbWl0Q2hhbmdlKCk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIGFsbCBjdXJyZW50bHkgZGlzcGxheWVkIGl0ZW1zIGFyZSBzZWxlY3RlZFxuICAgKi9cbiAgcHVibGljIGlzQWxsU2VsZWN0ZWQoKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuX3NlbGVjdGlvblR5cGUgIT09IFNlbGVjdGlvblR5cGUuTXVsdGkgfHwgIXRoaXMuX2l0ZW1zLmRpc3BsYXllZCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCBkaXNwbGF5ZWRJdGVtczogVFtdID0gdGhpcy5faXRlbXMuZGlzcGxheWVkO1xuICAgIGNvbnN0IG5iRGlzcGxheWVkID0gdGhpcy5faXRlbXMuZGlzcGxheWVkLmxlbmd0aDtcbiAgICBpZiAobmJEaXNwbGF5ZWQgPCAxKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IHRlbXA6IFRbXSA9IGRpc3BsYXllZEl0ZW1zLmZpbHRlcihpdGVtID0+IHRoaXMuY3VycmVudC5pbmRleE9mKGl0ZW0pID4gLTEpO1xuICAgIHJldHVybiB0ZW1wLmxlbmd0aCA9PT0gZGlzcGxheWVkSXRlbXMubGVuZ3RoO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlbGVjdHMgb3IgZGVzZWxlY3RzIGFsbCBjdXJyZW50bHkgZGlzcGxheWVkIGl0ZW1zXG4gICAqL1xuICBwdWJsaWMgdG9nZ2xlQWxsKCkge1xuICAgIGlmICh0aGlzLl9zZWxlY3Rpb25UeXBlID09PSBTZWxlY3Rpb25UeXBlLk5vbmUgfHwgdGhpcy5fc2VsZWN0aW9uVHlwZSA9PT0gU2VsZWN0aW9uVHlwZS5TaW5nbGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLypcbiAgICAgICAgICogSWYgZXZlcnkgY3VycmVudGx5IGRpc3BsYXllZCBpdGVtIGlzIGFscmVhZHkgc2VsZWN0ZWQsIHdlIGNsZWFyIHRoZW0uXG4gICAgICAgICAqIElmIGF0IGxlYXN0IG9uZSBpdGVtIGlzbid0IHNlbGVjdGVkLCB3ZSBzZWxlY3QgZXZlcnkgY3VycmVudGx5IGRpc3BsYXllZCBpdGVtLlxuICAgICAgICAgKi9cbiAgICBpZiAodGhpcy5pc0FsbFNlbGVjdGVkKCkpIHtcbiAgICAgIHRoaXMuX2l0ZW1zLmRpc3BsYXllZC5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBjb25zdCBjdXJyZW50SW5kZXggPSB0aGlzLmN1cnJlbnQuaW5kZXhPZihpdGVtKTtcbiAgICAgICAgaWYgKGN1cnJlbnRJbmRleCA+IC0xKSB7XG4gICAgICAgICAgdGhpcy5kZXNlbGVjdEl0ZW0oY3VycmVudEluZGV4KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2l0ZW1zLmRpc3BsYXllZC5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50LmluZGV4T2YoaXRlbSkgPCAwKSB7XG4gICAgICAgICAgdGhpcy5zZWxlY3RJdGVtKGl0ZW0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgdGhpcy5lbWl0Q2hhbmdlKCk7XG4gIH1cbn1cbiJdfQ==