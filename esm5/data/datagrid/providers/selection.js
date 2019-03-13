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
var nbSelection = 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9wcm92aWRlcnMvc2VsZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtBLE9BQU8sRUFBRSxVQUFVLEVBQW1CLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFBYyxPQUFPLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBRXpELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDNUMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUNoQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0seUJBQXlCLENBQUM7O0lBRXBELFdBQVcsR0FBVyxDQUFDOzs7O0FBRTNCO0lBTUUsbUJBQW9CLE1BQWdCLEVBQVUsUUFBNEI7UUFBMUUsaUJBdUhDO1FBdkhtQixXQUFNLEdBQU4sTUFBTSxDQUFVO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBb0I7UUFIbEUsc0JBQWlCLEdBQVEsRUFBRSxDQUFDLENBQUMseUJBQXlCO1FBb0l0RCxtQkFBYyxHQUFrQixhQUFhLENBQUMsSUFBSSxDQUFDO1FBZ0JwRCxxQkFBZ0IsR0FBWSxLQUFLLENBQUM7Ozs7O1FBU2pDLGFBQVEsR0FBWSxLQUFLLENBQUM7Ozs7UUFLMUIsa0JBQWEsR0FBbUIsRUFBRSxDQUFDOzs7O1FBeURuQyxZQUFPLEdBQUcsSUFBSSxPQUFPLEVBQVcsQ0FBQztRQXZOdkMsSUFBSSxDQUFDLEVBQUUsR0FBRyxrQkFBa0IsR0FBRyxXQUFXLEVBQUUsQ0FBQztRQUU3QyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO1lBQzdCLElBQUksQ0FBQyxLQUFJLENBQUMsV0FBVyxFQUFFO2dCQUNyQixPQUFPO2FBQ1I7WUFDRCxLQUFJLENBQUMsY0FBYyxF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Qiw2QkFBc0I7Ozs7O0lBc0J0Qiw0QkFBeUM7O0lBeE43QiwyQkFBd0I7O0lBQUUsNkJBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgSW5qZWN0YWJsZSwgVHJhY2tCeUZ1bmN0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgRmlsdGVyc1Byb3ZpZGVyIH0gZnJvbSAnLi9maWx0ZXJzJztcbmltcG9ydCB7IEl0ZW1zIH0gZnJvbSAnLi9pdGVtcyc7XG5pbXBvcnQgeyBTZWxlY3Rpb25UeXBlIH0gZnJvbSAnLi4vZW51bXMvc2VsZWN0aW9uLXR5cGUnO1xuXG5sZXQgbmJTZWxlY3Rpb246IG51bWJlciA9IDA7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTZWxlY3Rpb248VCA9IGFueT4ge1xuICBwdWJsaWMgaWQ6IHN0cmluZztcbiAgcHJpdmF0ZSBwcmV2U2VsZWN0aW9uUmVmczogVFtdID0gW107IC8vIFJlZnMgb2Ygc2VsZWN0ZWQgaXRlbXNcbiAgcHJpdmF0ZSBwcmV2U2luZ2xlU2VsZWN0aW9uUmVmOiBUOyAvLyBSZWYgb2Ygc2luZ2xlIHNlbGVjdGVkIGl0ZW1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9pdGVtczogSXRlbXM8VD4sIHByaXZhdGUgX2ZpbHRlcnM6IEZpbHRlcnNQcm92aWRlcjxUPikge1xuICAgIHRoaXMuaWQgPSAnY2xyLWRnLXNlbGVjdGlvbicgKyBuYlNlbGVjdGlvbisrO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLl9maWx0ZXJzLmNoYW5nZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICBpZiAoIXRoaXMuX3NlbGVjdGFibGUpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgfSlcbiAgICApO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLl9pdGVtcy5hbGxDaGFuZ2VzLnN1YnNjcmliZSh1cGRhdGVkSXRlbXMgPT4ge1xuICAgICAgICBzd2l0Y2ggKHRoaXMuc2VsZWN0aW9uVHlwZSkge1xuICAgICAgICAgIGNhc2UgU2VsZWN0aW9uVHlwZS5Ob25lOiB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjYXNlIFNlbGVjdGlvblR5cGUuU2luZ2xlOiB7XG4gICAgICAgICAgICBsZXQgbmV3U2luZ2xlOiBhbnk7XG4gICAgICAgICAgICBjb25zdCB0cmFja0J5OiBUcmFja0J5RnVuY3Rpb248VD4gPSB0aGlzLl9pdGVtcy50cmFja0J5O1xuICAgICAgICAgICAgbGV0IHNlbGVjdGlvblVwZGF0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgICAgICAgICAgLy8gaWYgdGhlIGN1cnJlbnRTaW5nbGUgaGFzIGJlZW4gc2V0IGJlZm9yZSBkYXRhIHdhcyBsb2FkZWQsIHdlIGxvb2sgdXAgYW5kIHNhdmUgdGhlIHJlZiBmcm9tIGN1cnJlbnQgZGF0YSBzZXRcbiAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRTaW5nbGUgJiYgIXRoaXMucHJldlNpbmdsZVNlbGVjdGlvblJlZikge1xuICAgICAgICAgICAgICBpZiAodGhpcy5faXRlbXMuYWxsICYmIHRoaXMuX2l0ZW1zLnRyYWNrQnkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsb29rdXAgPSB0aGlzLl9pdGVtcy5hbGwuZmluZEluZGV4KG1heWJlID0+IG1heWJlID09PSB0aGlzLmN1cnJlbnRTaW5nbGUpO1xuICAgICAgICAgICAgICAgIHRoaXMucHJldlNpbmdsZVNlbGVjdGlvblJlZiA9IHRoaXMuX2l0ZW1zLnRyYWNrQnkobG9va3VwLCB0aGlzLmN1cnJlbnRTaW5nbGUpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHVwZGF0ZWRJdGVtcy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCByZWYgPSB0cmFja0J5KGluZGV4LCBpdGVtKTtcbiAgICAgICAgICAgICAgLy8gSWYgb25lIG9mIHRoZSB1cGRhdGVkIGl0ZW1zIGlzIHRoZSBwcmV2aW91c2x5IHNlbGVjdGVkU2luZ2xlLCBzZXQgaXQgYXMgdGhlIG5ldyBvbmVcbiAgICAgICAgICAgICAgaWYgKHRoaXMucHJldlNpbmdsZVNlbGVjdGlvblJlZiA9PT0gcmVmKSB7XG4gICAgICAgICAgICAgICAgbmV3U2luZ2xlID0gaXRlbTtcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb25VcGRhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIElmIHdlJ3JlIHVzaW5nIHNtYXJ0IGRhdGFncmlkcywgd2UgZXhwZWN0IGFsbCBpdGVtcyB0byBiZSBwcmVzZW50IGluIHRoZSB1cGRhdGVkSXRlbXMgYXJyYXkuXG4gICAgICAgICAgICAvLyBUaGVyZWZvcmUsIHdlIHNob3VsZCBkZWxldGUgdGhlIGN1cnJlbnRTaW5nbGUgaWYgaXQgdXNlZCB0byBiZSBkZWZpbmVkIGJ1dCBkb2Vzbid0IGV4aXN0IGFueW1vcmUuXG4gICAgICAgICAgICAvLyBObyBleHBsaWNpdCBcImRlbGV0ZVwiIGlzIHJlcXVpcmVkLCBzaW5jZSBuZXdTaW5nbGUgd291bGQgYmUgdW5kZWZpbmVkIGF0IHRoaXMgcG9pbnQuXG4gICAgICAgICAgICAvLyBNYXJraW5nIGl0IGFzIHNlbGVjdGlvblVwZGF0ZWQgaGVyZSB3aWxsIHNldCBjdXJyZW50U2luZ2xlIHRvIHVuZGVmaW5lZCBiZWxvdyBpbiB0aGUgc2V0VGltZW91dC5cbiAgICAgICAgICAgIGlmICh0aGlzLl9pdGVtcy5zbWFydCAmJiAhbmV3U2luZ2xlKSB7XG4gICAgICAgICAgICAgIHNlbGVjdGlvblVwZGF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBUT0RPOiBEaXNjdXNzZWQgdGhpcyB3aXRoIEV1ZGVzIGFuZCB0aGlzIGlzIGZpbmUgZm9yIG5vdy5cbiAgICAgICAgICAgIC8vIEJ1dCB3ZSBuZWVkIHRvIGZpZ3VyZSBvdXQgYSBkaWZmZXJlbnQgcGF0dGVybiBmb3IgdGhlXG4gICAgICAgICAgICAvLyBjaGlsZCB0cmlnZ2VyaW5nIHRoZSBwYXJlbnQgY2hhbmdlIGRldGVjdGlvbiBwcm9ibGVtLlxuICAgICAgICAgICAgLy8gVXNpbmcgc2V0VGltZW91dCBmb3Igbm93IHRvIGZpeCB0aGlzLlxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChzZWxlY3Rpb25VcGRhdGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50U2luZ2xlID0gbmV3U2luZ2xlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNhc2UgU2VsZWN0aW9uVHlwZS5NdWx0aToge1xuICAgICAgICAgICAgbGV0IGxlZnRPdmVyOiBhbnlbXSA9IHRoaXMuY3VycmVudC5zbGljZSgpO1xuICAgICAgICAgICAgY29uc3QgdHJhY2tCeTogVHJhY2tCeUZ1bmN0aW9uPGFueT4gPSB0aGlzLl9pdGVtcy50cmFja0J5O1xuICAgICAgICAgICAgbGV0IHNlbGVjdGlvblVwZGF0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgICAgICAgICAgLy8gaWYgdGhlIGN1cnJlbnQgaGFzIGJlZW4gc2V0IGJlZm9yZSBkYXRhIHdhcyBsb2FkZWQsIHdlIGxvb2sgdXAgYW5kIHNhdmUgdGhlIHJlZiBmcm9tIGN1cnJlbnQgZGF0YSBzZXRcbiAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnQubGVuZ3RoID4gMCAmJiB0aGlzLnByZXZTZWxlY3Rpb25SZWZzLmxlbmd0aCAhPT0gdGhpcy5jdXJyZW50Lmxlbmd0aCkge1xuICAgICAgICAgICAgICBpZiAodGhpcy5faXRlbXMuYWxsICYmIHRoaXMuX2l0ZW1zLnRyYWNrQnkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByZXZTZWxlY3Rpb25SZWZzID0gW107XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50LmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBsb29rdXAgPSB0aGlzLl9pdGVtcy5hbGwuZmluZEluZGV4KG1heWJlID0+IG1heWJlID09PSBpdGVtKTtcbiAgICAgICAgICAgICAgICAgIHRoaXMucHJldlNlbGVjdGlvblJlZnMucHVzaCh0aGlzLl9pdGVtcy50cmFja0J5KGxvb2t1cCwgaXRlbSkpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFRPRE86IHJldmlzaXQgdGhpcyB3aGVuIHdlIHdvcmsgb24gaHR0cHM6Ly9naXRodWIuY29tL3Ztd2FyZS9jbGFyaXR5L2lzc3Vlcy8yMzQyXG4gICAgICAgICAgICAvLyBjdXJyZW50bHksIHRoZSBzZWxlY3Rpb24gaXMgY2xlYXJlZCB3aGVuIGZpbHRlciBpcyBhcHBsaWVkLCBzbyB0aGUgbG9naWMgaW5zaWRlXG4gICAgICAgICAgICAvLyB0aGUgaWYgc3RhdGVtZW50IGJlbG93IHJlc3VsdHMgaW4gYnJva2VuIGJlaGF2aW9yLlxuICAgICAgICAgICAgaWYgKGxlZnRPdmVyLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgdXBkYXRlZEl0ZW1zLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVmID0gdHJhY2tCeShpbmRleCwgaXRlbSk7XG4gICAgICAgICAgICAgICAgLy8gTG9vayBpbiBjdXJyZW50IHNlbGVjdGVkIHJlZnMgYXJyYXkgaWYgaXRlbSBpcyBzZWxlY3RlZCwgYW5kIHVwZGF0ZSBhY3R1YWwgdmFsdWVcbiAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3RlZEluZGV4ID0gdGhpcy5wcmV2U2VsZWN0aW9uUmVmcy5pbmRleE9mKHJlZik7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkSW5kZXggPiAtMSkge1xuICAgICAgICAgICAgICAgICAgbGVmdE92ZXJbc2VsZWN0ZWRJbmRleF0gPSBpdGVtO1xuICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uVXBkYXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAvLyBGaWx0ZXIgb3V0IGFueSB1bm1hdGNoZWQgaXRlbXMgaWYgd2UncmUgdXNpbmcgc21hcnQgZGF0YWdyaWRzIHdoZXJlIHdlIGV4cGVjdCBhbGwgaXRlbXMgdG8gYmVcbiAgICAgICAgICAgICAgLy8gcHJlc2VudFxuICAgICAgICAgICAgICBpZiAodGhpcy5faXRlbXMuc21hcnQpIHtcbiAgICAgICAgICAgICAgICBsZWZ0T3ZlciA9IGxlZnRPdmVyLmZpbHRlcihzZWxlY3RlZCA9PiB1cGRhdGVkSXRlbXMuaW5kZXhPZihzZWxlY3RlZCkgPiAtMSk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudC5sZW5ndGggIT09IGxlZnRPdmVyLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uVXBkYXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgLy8gVE9ETzogRGlzY3Vzc2VkIHRoaXMgd2l0aCBFdWRlcyBhbmQgdGhpcyBpcyBmaW5lIGZvciBub3cuXG4gICAgICAgICAgICAgIC8vIEJ1dCB3ZSBuZWVkIHRvIGZpZ3VyZSBvdXQgYSBkaWZmZXJlbnQgcGF0dGVybiBmb3IgdGhlXG4gICAgICAgICAgICAgIC8vIGNoaWxkIHRyaWdnZXJpbmcgdGhlIHBhcmVudCBjaGFuZ2UgZGV0ZWN0aW9uIHByb2JsZW0uXG4gICAgICAgICAgICAgIC8vIFVzaW5nIHNldFRpbWVvdXQgZm9yIG5vdyB0byBmaXggdGhpcy5cbiAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGlvblVwZGF0ZWQpIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudCA9IGxlZnRPdmVyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBkZWZhdWx0OiB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBjbGVhclNlbGVjdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLmN1cnJlbnQubGVuZ3RoID0gMDtcbiAgICB0aGlzLnByZXZTZWxlY3Rpb25SZWZzID0gW107XG4gICAgdGhpcy5fY3VycmVudFNpbmdsZSA9IG51bGw7XG4gICAgdGhpcy5wcmV2U2luZ2xlU2VsZWN0aW9uUmVmID0gbnVsbDtcbiAgICB0aGlzLmVtaXRDaGFuZ2UoKTtcbiAgfVxuXG4gIHByaXZhdGUgX3NlbGVjdGlvblR5cGU6IFNlbGVjdGlvblR5cGUgPSBTZWxlY3Rpb25UeXBlLk5vbmU7XG4gIHB1YmxpYyBnZXQgc2VsZWN0aW9uVHlwZSgpOiBTZWxlY3Rpb25UeXBlIHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0aW9uVHlwZTtcbiAgfVxuICBwdWJsaWMgc2V0IHNlbGVjdGlvblR5cGUodmFsdWU6IFNlbGVjdGlvblR5cGUpIHtcbiAgICBpZiAodmFsdWUgPT09IHRoaXMuc2VsZWN0aW9uVHlwZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9zZWxlY3Rpb25UeXBlID0gdmFsdWU7XG4gICAgaWYgKHZhbHVlID09PSBTZWxlY3Rpb25UeXBlLk5vbmUpIHtcbiAgICAgIGRlbGV0ZSB0aGlzLmN1cnJlbnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudXBkYXRlQ3VycmVudChbXSwgZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyByb3dTZWxlY3Rpb25Nb2RlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBnZXQgX3NlbGVjdGFibGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGlvblR5cGUgPT09IFNlbGVjdGlvblR5cGUuTXVsdGkgfHwgdGhpcy5fc2VsZWN0aW9uVHlwZSA9PT0gU2VsZWN0aW9uVHlwZS5TaW5nbGU7XG4gIH1cbiAgLyoqXG4gICAqIElnbm9yZSBpdGVtcyBjaGFuZ2VzIGluIHRoZSBzYW1lIGNoYW5nZSBkZXRlY3Rpb24gY3ljbGUuXG4gICAqL1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmVcbiAgcHJpdmF0ZSBkZWJvdW5jZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBTdWJzY3JpcHRpb25zIHRvIHRoZSBvdGhlciBwcm92aWRlcnMgY2hhbmdlcy5cbiAgICovXG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICAvKipcbiAgICogQ2xlYW5zIHVwIG91ciBzdWJzY3JpcHRpb25zIHRvIG90aGVyIHByb3ZpZGVyc1xuICAgKi9cbiAgcHVibGljIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmZvckVhY2goc3ViID0+IHN1Yi51bnN1YnNjcmliZSgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgY3VycmVudCBzZWxlY3Rpb24gaW4gc2luZ2xlIHNlbGVjdGlvbiB0eXBlXG4gICAqL1xuICBwcml2YXRlIF9jdXJyZW50U2luZ2xlOiBUO1xuICBwdWJsaWMgZ2V0IGN1cnJlbnRTaW5nbGUoKTogVCB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRTaW5nbGU7XG4gIH1cbiAgcHVibGljIHNldCBjdXJyZW50U2luZ2xlKHZhbHVlOiBUKSB7XG4gICAgaWYgKHZhbHVlID09PSB0aGlzLl9jdXJyZW50U2luZ2xlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX2N1cnJlbnRTaW5nbGUgPSB2YWx1ZTtcbiAgICBpZiAodGhpcy5faXRlbXMuYWxsICYmIHRoaXMuX2l0ZW1zLnRyYWNrQnkgJiYgdmFsdWUpIHtcbiAgICAgIGNvbnN0IGxvb2t1cCA9IHRoaXMuX2l0ZW1zLmFsbC5maW5kSW5kZXgobWF5YmUgPT4gbWF5YmUgPT09IHZhbHVlKTtcbiAgICAgIHRoaXMucHJldlNpbmdsZVNlbGVjdGlvblJlZiA9IHRoaXMuX2l0ZW1zLnRyYWNrQnkobG9va3VwLCB2YWx1ZSk7XG4gICAgfVxuICAgIHRoaXMuZW1pdENoYW5nZSgpO1xuICAgIC8vIElnbm9yZSBpdGVtcyBjaGFuZ2VzIGluIHRoZSBzYW1lIGNoYW5nZSBkZXRlY3Rpb24gY3ljbGUuXG4gICAgLy8gQFRPRE8gVGhpcyBjYW4gbGlrZWx5IGJlIHJlbW92ZWQhXG4gICAgdGhpcy5kZWJvdW5jZSA9IHRydWU7XG4gICAgc2V0VGltZW91dCgoKSA9PiAodGhpcy5kZWJvdW5jZSA9IGZhbHNlKSk7XG4gIH1cblxuICAvKipcbiAgICogVGhlIGN1cnJlbnQgc2VsZWN0aW9uXG4gICAqL1xuICBwcml2YXRlIF9jdXJyZW50OiBUW107XG4gIHB1YmxpYyBnZXQgY3VycmVudCgpOiBUW10ge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50O1xuICB9XG4gIHB1YmxpYyBzZXQgY3VycmVudCh2YWx1ZTogVFtdKSB7XG4gICAgdGhpcy51cGRhdGVDdXJyZW50KHZhbHVlLCB0cnVlKTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGVDdXJyZW50KHZhbHVlOiBUW10sIGVtaXQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9jdXJyZW50ID0gdmFsdWU7XG4gICAgaWYgKGVtaXQpIHtcbiAgICAgIHRoaXMuZW1pdENoYW5nZSgpO1xuICAgICAgLy8gSWdub3JlIGl0ZW1zIGNoYW5nZXMgaW4gdGhlIHNhbWUgY2hhbmdlIGRldGVjdGlvbiBjeWNsZS5cbiAgICAgIC8vIEBUT0RPIFRoaXMgY2FuIGxpa2VseSBiZSByZW1vdmVkIVxuICAgICAgdGhpcy5kZWJvdW5jZSA9IHRydWU7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+ICh0aGlzLmRlYm91bmNlID0gZmFsc2UpKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhlIE9ic2VydmFibGUgdGhhdCBsZXRzIG90aGVyIGNsYXNzZXMgc3Vic2NyaWJlIHRvIHNlbGVjdGlvbiBjaGFuZ2VzXG4gICAqL1xuICBwcml2YXRlIF9jaGFuZ2UgPSBuZXcgU3ViamVjdDxUW10gfCBUPigpO1xuICBwcml2YXRlIGVtaXRDaGFuZ2UoKSB7XG4gICAgaWYgKHRoaXMuX3NlbGVjdGlvblR5cGUgPT09IFNlbGVjdGlvblR5cGUuU2luZ2xlKSB7XG4gICAgICB0aGlzLl9jaGFuZ2UubmV4dCh0aGlzLmN1cnJlbnRTaW5nbGUpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fc2VsZWN0aW9uVHlwZSA9PT0gU2VsZWN0aW9uVHlwZS5NdWx0aSkge1xuICAgICAgdGhpcy5fY2hhbmdlLm5leHQodGhpcy5jdXJyZW50KTtcbiAgICB9XG4gIH1cbiAgLy8gV2UgZG8gbm90IHdhbnQgdG8gZXhwb3NlIHRoZSBTdWJqZWN0IGl0c2VsZiwgYnV0IHRoZSBPYnNlcnZhYmxlIHdoaWNoIGlzIHJlYWQtb25seVxuICBwdWJsaWMgZ2V0IGNoYW5nZSgpOiBPYnNlcnZhYmxlPFRbXSB8IFQ+IHtcbiAgICByZXR1cm4gdGhpcy5fY2hhbmdlLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBhbiBpdGVtIGlzIGN1cnJlbnRseSBzZWxlY3RlZFxuICAgKi9cbiAgcHVibGljIGlzU2VsZWN0ZWQoaXRlbTogVCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLl9zZWxlY3Rpb25UeXBlID09PSBTZWxlY3Rpb25UeXBlLlNpbmdsZSkge1xuICAgICAgcmV0dXJuIHRoaXMuY3VycmVudFNpbmdsZSA9PT0gaXRlbTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX3NlbGVjdGlvblR5cGUgPT09IFNlbGVjdGlvblR5cGUuTXVsdGkpIHtcbiAgICAgIHJldHVybiB0aGlzLmN1cnJlbnQuaW5kZXhPZihpdGVtKSA+PSAwO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0cyBhbiBpdGVtXG4gICAqL1xuICBwcml2YXRlIHNlbGVjdEl0ZW0oaXRlbTogVCk6IHZvaWQge1xuICAgIHRoaXMuY3VycmVudC5wdXNoKGl0ZW0pO1xuICAgIGlmICh0aGlzLl9pdGVtcy50cmFja0J5KSB7XG4gICAgICAvLyBQdXNoIHNlbGVjdGVkIHJlZiBvbnRvIGFycmF5XG4gICAgICBjb25zdCBsb29rdXAgPSB0aGlzLl9pdGVtcy5hbGwuZmluZEluZGV4KG1heWJlID0+IG1heWJlID09PSBpdGVtKTtcbiAgICAgIHRoaXMucHJldlNlbGVjdGlvblJlZnMucHVzaCh0aGlzLl9pdGVtcy50cmFja0J5KGxvb2t1cCwgaXRlbSkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEZXNlbGVjdHMgYW4gaXRlbVxuICAgKi9cbiAgcHJpdmF0ZSBkZXNlbGVjdEl0ZW0oaW5kZXhPZkl0ZW06IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuY3VycmVudC5zcGxpY2UoaW5kZXhPZkl0ZW0sIDEpO1xuICAgIGlmICh0aGlzLl9pdGVtcy50cmFja0J5ICYmIGluZGV4T2ZJdGVtIDwgdGhpcy5wcmV2U2VsZWN0aW9uUmVmcy5sZW5ndGgpIHtcbiAgICAgIC8vIEtlZXAgc2VsZWN0ZWQgcmVmcyBhcnJheSBpbiBzeW5jXG4gICAgICB0aGlzLnByZXZTZWxlY3Rpb25SZWZzLnNwbGljZShpbmRleE9mSXRlbSwgMSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNlbGVjdHMgb3IgZGVzZWxlY3RzIGFuIGl0ZW1cbiAgICovXG4gIHB1YmxpYyBzZXRTZWxlY3RlZChpdGVtOiBULCBzZWxlY3RlZDogYm9vbGVhbikge1xuICAgIHN3aXRjaCAodGhpcy5fc2VsZWN0aW9uVHlwZSkge1xuICAgICAgY2FzZSBTZWxlY3Rpb25UeXBlLk5vbmU6XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBTZWxlY3Rpb25UeXBlLlNpbmdsZTpcbiAgICAgICAgLy8gaW4gc2luZ2xlIHNlbGVjdGlvbiwgc2V0IGN1cnJlbnRTaW5nbGUgbWV0aG9kIHNob3VsZCBiZSB1c2VkXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBTZWxlY3Rpb25UeXBlLk11bHRpOlxuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuY3VycmVudC5pbmRleE9mKGl0ZW0pO1xuICAgICAgICBpZiAoaW5kZXggPj0gMCAmJiAhc2VsZWN0ZWQpIHtcbiAgICAgICAgICB0aGlzLmRlc2VsZWN0SXRlbShpbmRleCk7XG4gICAgICAgICAgdGhpcy5lbWl0Q2hhbmdlKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoaW5kZXggPCAwICYmIHNlbGVjdGVkKSB7XG4gICAgICAgICAgdGhpcy5zZWxlY3RJdGVtKGl0ZW0pO1xuICAgICAgICAgIHRoaXMuZW1pdENoYW5nZSgpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBhbGwgY3VycmVudGx5IGRpc3BsYXllZCBpdGVtcyBhcmUgc2VsZWN0ZWRcbiAgICovXG4gIHB1YmxpYyBpc0FsbFNlbGVjdGVkKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLl9zZWxlY3Rpb25UeXBlICE9PSBTZWxlY3Rpb25UeXBlLk11bHRpIHx8ICF0aGlzLl9pdGVtcy5kaXNwbGF5ZWQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgZGlzcGxheWVkSXRlbXM6IFRbXSA9IHRoaXMuX2l0ZW1zLmRpc3BsYXllZDtcbiAgICBjb25zdCBuYkRpc3BsYXllZCA9IHRoaXMuX2l0ZW1zLmRpc3BsYXllZC5sZW5ndGg7XG4gICAgaWYgKG5iRGlzcGxheWVkIDwgMSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCB0ZW1wOiBUW10gPSBkaXNwbGF5ZWRJdGVtcy5maWx0ZXIoaXRlbSA9PiB0aGlzLmN1cnJlbnQuaW5kZXhPZihpdGVtKSA+IC0xKTtcbiAgICByZXR1cm4gdGVtcC5sZW5ndGggPT09IGRpc3BsYXllZEl0ZW1zLmxlbmd0aDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWxlY3RzIG9yIGRlc2VsZWN0cyBhbGwgY3VycmVudGx5IGRpc3BsYXllZCBpdGVtc1xuICAgKi9cbiAgcHVibGljIHRvZ2dsZUFsbCgpIHtcbiAgICBpZiAodGhpcy5fc2VsZWN0aW9uVHlwZSA9PT0gU2VsZWN0aW9uVHlwZS5Ob25lIHx8IHRoaXMuX3NlbGVjdGlvblR5cGUgPT09IFNlbGVjdGlvblR5cGUuU2luZ2xlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8qXG4gICAgICAgICAqIElmIGV2ZXJ5IGN1cnJlbnRseSBkaXNwbGF5ZWQgaXRlbSBpcyBhbHJlYWR5IHNlbGVjdGVkLCB3ZSBjbGVhciB0aGVtLlxuICAgICAgICAgKiBJZiBhdCBsZWFzdCBvbmUgaXRlbSBpc24ndCBzZWxlY3RlZCwgd2Ugc2VsZWN0IGV2ZXJ5IGN1cnJlbnRseSBkaXNwbGF5ZWQgaXRlbS5cbiAgICAgICAgICovXG4gICAgaWYgKHRoaXMuaXNBbGxTZWxlY3RlZCgpKSB7XG4gICAgICB0aGlzLl9pdGVtcy5kaXNwbGF5ZWQuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgY29uc3QgY3VycmVudEluZGV4ID0gdGhpcy5jdXJyZW50LmluZGV4T2YoaXRlbSk7XG4gICAgICAgIGlmIChjdXJyZW50SW5kZXggPiAtMSkge1xuICAgICAgICAgIHRoaXMuZGVzZWxlY3RJdGVtKGN1cnJlbnRJbmRleCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9pdGVtcy5kaXNwbGF5ZWQuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudC5pbmRleE9mKGl0ZW0pIDwgMCkge1xuICAgICAgICAgIHRoaXMuc2VsZWN0SXRlbShpdGVtKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMuZW1pdENoYW5nZSgpO1xuICB9XG59XG4iXX0=