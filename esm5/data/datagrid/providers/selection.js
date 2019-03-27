/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        this.subscriptions.push(this._filters.change.subscribe((/**
         * @return {?}
         */
        function () {
            if (!_this._selectable) {
                return;
            }
            _this.clearSelection();
        })));
        this.subscriptions.push(this._items.allChanges.subscribe((/**
         * @param {?} updatedItems
         * @return {?}
         */
        function (updatedItems) {
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
                            var lookup = _this._items.all.findIndex((/**
                             * @param {?} maybe
                             * @return {?}
                             */
                            function (maybe) { return maybe === _this.currentSingle; }));
                            _this.prevSingleSelectionRef = _this._items.trackBy(lookup, _this.currentSingle);
                        }
                    }
                    updatedItems.forEach((/**
                     * @param {?} item
                     * @param {?} index
                     * @return {?}
                     */
                    function (item, index) {
                        /** @type {?} */
                        var ref = trackBy_1(index, item);
                        // If one of the updated items is the previously selectedSingle, set it as the new one
                        if (_this.prevSingleSelectionRef === ref) {
                            newSingle_1 = item;
                            selectionUpdated_1 = true;
                        }
                    }));
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
                    setTimeout((/**
                     * @return {?}
                     */
                    function () {
                        if (selectionUpdated_1) {
                            _this.currentSingle = newSingle_1;
                        }
                    }), 0);
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
                            _this.current.forEach((/**
                             * @param {?} item
                             * @return {?}
                             */
                            function (item) {
                                /** @type {?} */
                                var lookup = _this._items.all.findIndex((/**
                                 * @param {?} maybe
                                 * @return {?}
                                 */
                                function (maybe) { return maybe === item; }));
                                _this.prevSelectionRefs.push(_this._items.trackBy(lookup, item));
                            }));
                        }
                    }
                    // TODO: revisit this when we work on https://github.com/vmware/clarity/issues/2342
                    // currently, the selection is cleared when filter is applied, so the logic inside
                    // the if statement below results in broken behavior.
                    if (leftOver_1.length > 0) {
                        updatedItems.forEach((/**
                         * @param {?} item
                         * @param {?} index
                         * @return {?}
                         */
                        function (item, index) {
                            /** @type {?} */
                            var ref = trackBy_2(index, item);
                            // Look in current selected refs array if item is selected, and update actual value
                            /** @type {?} */
                            var selectedIndex = _this.prevSelectionRefs.indexOf(ref);
                            if (selectedIndex > -1) {
                                leftOver_1[selectedIndex] = item;
                                selectionUpdated_2 = true;
                            }
                        }));
                        // Filter out any unmatched items if we're using smart datagrids where we expect all items to be
                        // present
                        if (_this._items.smart) {
                            leftOver_1 = leftOver_1.filter((/**
                             * @param {?} selected
                             * @return {?}
                             */
                            function (selected) { return updatedItems.indexOf(selected) > -1; }));
                            if (_this.current.length !== leftOver_1.length) {
                                selectionUpdated_2 = true;
                            }
                        }
                        // TODO: Discussed this with Eudes and this is fine for now.
                        // But we need to figure out a different pattern for the
                        // child triggering the parent change detection problem.
                        // Using setTimeout for now to fix this.
                        setTimeout((/**
                         * @return {?}
                         */
                        function () {
                            if (selectionUpdated_2) {
                                _this.current = leftOver_1;
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
         * @private
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
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        function (sub) { return sub.unsubscribe(); }));
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
                var lookup = this._items.all.findIndex((/**
                 * @param {?} maybe
                 * @return {?}
                 */
                function (maybe) { return maybe === value; }));
                this.prevSingleSelectionRef = this._items.trackBy(lookup, value);
            }
            this.emitChange();
            // Ignore items changes in the same change detection cycle.
            // @TODO This can likely be removed!
            this.debounce = true;
            setTimeout((/**
             * @return {?}
             */
            function () { return (_this.debounce = false); }));
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
            setTimeout((/**
             * @return {?}
             */
            function () { return (_this.debounce = false); }));
        }
    };
    /**
     * @private
     * @return {?}
     */
    Selection.prototype.emitChange = /**
     * @private
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
     * @private
     * @param {?} item
     * @return {?}
     */
    Selection.prototype.selectItem = /**
     * Selects an item
     * @private
     * @param {?} item
     * @return {?}
     */
    function (item) {
        this.current.push(item);
        if (this._items.trackBy) {
            // Push selected ref onto array
            /** @type {?} */
            var lookup = this._items.all.findIndex((/**
             * @param {?} maybe
             * @return {?}
             */
            function (maybe) { return maybe === item; }));
            this.prevSelectionRefs.push(this._items.trackBy(lookup, item));
        }
    };
    /**
     * Deselects an item
     */
    /**
     * Deselects an item
     * @private
     * @param {?} indexOfItem
     * @return {?}
     */
    Selection.prototype.deselectItem = /**
     * Deselects an item
     * @private
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
        var temp = displayedItems.filter((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return _this.current.indexOf(item) > -1; }));
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
            this._items.displayed.forEach((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                /** @type {?} */
                var currentIndex = _this.current.indexOf(item);
                if (currentIndex > -1) {
                    _this.deselectItem(currentIndex);
                }
            }));
        }
        else {
            this._items.displayed.forEach((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                if (_this.current.indexOf(item) < 0) {
                    _this.selectItem(item);
                }
            }));
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
    /** @type {?} */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9wcm92aWRlcnMvc2VsZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtBLE9BQU8sRUFBRSxVQUFVLEVBQW1CLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFBYyxPQUFPLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBRXpELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDNUMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUNoQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0seUJBQXlCLENBQUM7O0lBRXBELFdBQVcsR0FBVyxDQUFDOzs7O0FBRTNCO0lBTUUsbUJBQW9CLE1BQWdCLEVBQVUsUUFBNEI7UUFBMUUsaUJBdUhDO1FBdkhtQixXQUFNLEdBQU4sTUFBTSxDQUFVO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBb0I7UUFIbEUsc0JBQWlCLEdBQVEsRUFBRSxDQUFDLENBQUMseUJBQXlCO1FBb0l0RCxtQkFBYyxHQUFrQixhQUFhLENBQUMsSUFBSSxDQUFDO1FBZ0JwRCxxQkFBZ0IsR0FBWSxLQUFLLENBQUM7Ozs7O1FBU2pDLGFBQVEsR0FBWSxLQUFLLENBQUM7Ozs7UUFLMUIsa0JBQWEsR0FBbUIsRUFBRSxDQUFDOzs7O1FBeURuQyxZQUFPLEdBQUcsSUFBSSxPQUFPLEVBQVcsQ0FBQztRQXZOdkMsSUFBSSxDQUFDLEVBQUUsR0FBRyxrQkFBa0IsR0FBRyxXQUFXLEVBQUUsQ0FBQztRQUU3QyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUzs7O1FBQUM7WUFDN0IsSUFBSSxDQUFDLEtBQUksQ0FBQyxXQUFXLEVBQUU7Z0JBQ3JCLE9BQU87YUFDUjtZQUNELEtBQUksQ0FBQyxjQUFj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OztJQWdCM0QscUNBQXlDOzs7Ozs7SUFTekMsNkJBQWtDOzs7Ozs7SUFLbEMsa0NBQTJDOzs7Ozs7SUFZM0MsbUNBQTBCOzs7Ozs7SUF1QjFCLDZCQUFzQjs7Ozs7O0lBc0J0Qiw0QkFBeUM7Ozs7O0lBeE43QiwyQkFBd0I7Ozs7O0lBQUUsNkJBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgSW5qZWN0YWJsZSwgVHJhY2tCeUZ1bmN0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgRmlsdGVyc1Byb3ZpZGVyIH0gZnJvbSAnLi9maWx0ZXJzJztcbmltcG9ydCB7IEl0ZW1zIH0gZnJvbSAnLi9pdGVtcyc7XG5pbXBvcnQgeyBTZWxlY3Rpb25UeXBlIH0gZnJvbSAnLi4vZW51bXMvc2VsZWN0aW9uLXR5cGUnO1xuXG5sZXQgbmJTZWxlY3Rpb246IG51bWJlciA9IDA7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTZWxlY3Rpb248VCA9IGFueT4ge1xuICBwdWJsaWMgaWQ6IHN0cmluZztcbiAgcHJpdmF0ZSBwcmV2U2VsZWN0aW9uUmVmczogVFtdID0gW107IC8vIFJlZnMgb2Ygc2VsZWN0ZWQgaXRlbXNcbiAgcHJpdmF0ZSBwcmV2U2luZ2xlU2VsZWN0aW9uUmVmOiBUOyAvLyBSZWYgb2Ygc2luZ2xlIHNlbGVjdGVkIGl0ZW1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9pdGVtczogSXRlbXM8VD4sIHByaXZhdGUgX2ZpbHRlcnM6IEZpbHRlcnNQcm92aWRlcjxUPikge1xuICAgIHRoaXMuaWQgPSAnY2xyLWRnLXNlbGVjdGlvbicgKyBuYlNlbGVjdGlvbisrO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLl9maWx0ZXJzLmNoYW5nZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICBpZiAoIXRoaXMuX3NlbGVjdGFibGUpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgfSlcbiAgICApO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLl9pdGVtcy5hbGxDaGFuZ2VzLnN1YnNjcmliZSh1cGRhdGVkSXRlbXMgPT4ge1xuICAgICAgICBzd2l0Y2ggKHRoaXMuc2VsZWN0aW9uVHlwZSkge1xuICAgICAgICAgIGNhc2UgU2VsZWN0aW9uVHlwZS5Ob25lOiB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjYXNlIFNlbGVjdGlvblR5cGUuU2luZ2xlOiB7XG4gICAgICAgICAgICBsZXQgbmV3U2luZ2xlOiBhbnk7XG4gICAgICAgICAgICBjb25zdCB0cmFja0J5OiBUcmFja0J5RnVuY3Rpb248VD4gPSB0aGlzLl9pdGVtcy50cmFja0J5O1xuICAgICAgICAgICAgbGV0IHNlbGVjdGlvblVwZGF0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgICAgICAgICAgLy8gaWYgdGhlIGN1cnJlbnRTaW5nbGUgaGFzIGJlZW4gc2V0IGJlZm9yZSBkYXRhIHdhcyBsb2FkZWQsIHdlIGxvb2sgdXAgYW5kIHNhdmUgdGhlIHJlZiBmcm9tIGN1cnJlbnQgZGF0YSBzZXRcbiAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRTaW5nbGUgJiYgIXRoaXMucHJldlNpbmdsZVNlbGVjdGlvblJlZikge1xuICAgICAgICAgICAgICBpZiAodGhpcy5faXRlbXMuYWxsICYmIHRoaXMuX2l0ZW1zLnRyYWNrQnkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsb29rdXAgPSB0aGlzLl9pdGVtcy5hbGwuZmluZEluZGV4KG1heWJlID0+IG1heWJlID09PSB0aGlzLmN1cnJlbnRTaW5nbGUpO1xuICAgICAgICAgICAgICAgIHRoaXMucHJldlNpbmdsZVNlbGVjdGlvblJlZiA9IHRoaXMuX2l0ZW1zLnRyYWNrQnkobG9va3VwLCB0aGlzLmN1cnJlbnRTaW5nbGUpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHVwZGF0ZWRJdGVtcy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCByZWYgPSB0cmFja0J5KGluZGV4LCBpdGVtKTtcbiAgICAgICAgICAgICAgLy8gSWYgb25lIG9mIHRoZSB1cGRhdGVkIGl0ZW1zIGlzIHRoZSBwcmV2aW91c2x5IHNlbGVjdGVkU2luZ2xlLCBzZXQgaXQgYXMgdGhlIG5ldyBvbmVcbiAgICAgICAgICAgICAgaWYgKHRoaXMucHJldlNpbmdsZVNlbGVjdGlvblJlZiA9PT0gcmVmKSB7XG4gICAgICAgICAgICAgICAgbmV3U2luZ2xlID0gaXRlbTtcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb25VcGRhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIElmIHdlJ3JlIHVzaW5nIHNtYXJ0IGRhdGFncmlkcywgd2UgZXhwZWN0IGFsbCBpdGVtcyB0byBiZSBwcmVzZW50IGluIHRoZSB1cGRhdGVkSXRlbXMgYXJyYXkuXG4gICAgICAgICAgICAvLyBUaGVyZWZvcmUsIHdlIHNob3VsZCBkZWxldGUgdGhlIGN1cnJlbnRTaW5nbGUgaWYgaXQgdXNlZCB0byBiZSBkZWZpbmVkIGJ1dCBkb2Vzbid0IGV4aXN0IGFueW1vcmUuXG4gICAgICAgICAgICAvLyBObyBleHBsaWNpdCBcImRlbGV0ZVwiIGlzIHJlcXVpcmVkLCBzaW5jZSBuZXdTaW5nbGUgd291bGQgYmUgdW5kZWZpbmVkIGF0IHRoaXMgcG9pbnQuXG4gICAgICAgICAgICAvLyBNYXJraW5nIGl0IGFzIHNlbGVjdGlvblVwZGF0ZWQgaGVyZSB3aWxsIHNldCBjdXJyZW50U2luZ2xlIHRvIHVuZGVmaW5lZCBiZWxvdyBpbiB0aGUgc2V0VGltZW91dC5cbiAgICAgICAgICAgIGlmICh0aGlzLl9pdGVtcy5zbWFydCAmJiAhbmV3U2luZ2xlKSB7XG4gICAgICAgICAgICAgIHNlbGVjdGlvblVwZGF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBUT0RPOiBEaXNjdXNzZWQgdGhpcyB3aXRoIEV1ZGVzIGFuZCB0aGlzIGlzIGZpbmUgZm9yIG5vdy5cbiAgICAgICAgICAgIC8vIEJ1dCB3ZSBuZWVkIHRvIGZpZ3VyZSBvdXQgYSBkaWZmZXJlbnQgcGF0dGVybiBmb3IgdGhlXG4gICAgICAgICAgICAvLyBjaGlsZCB0cmlnZ2VyaW5nIHRoZSBwYXJlbnQgY2hhbmdlIGRldGVjdGlvbiBwcm9ibGVtLlxuICAgICAgICAgICAgLy8gVXNpbmcgc2V0VGltZW91dCBmb3Igbm93IHRvIGZpeCB0aGlzLlxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChzZWxlY3Rpb25VcGRhdGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50U2luZ2xlID0gbmV3U2luZ2xlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNhc2UgU2VsZWN0aW9uVHlwZS5NdWx0aToge1xuICAgICAgICAgICAgbGV0IGxlZnRPdmVyOiBhbnlbXSA9IHRoaXMuY3VycmVudC5zbGljZSgpO1xuICAgICAgICAgICAgY29uc3QgdHJhY2tCeTogVHJhY2tCeUZ1bmN0aW9uPGFueT4gPSB0aGlzLl9pdGVtcy50cmFja0J5O1xuICAgICAgICAgICAgbGV0IHNlbGVjdGlvblVwZGF0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgICAgICAgICAgLy8gaWYgdGhlIGN1cnJlbnQgaGFzIGJlZW4gc2V0IGJlZm9yZSBkYXRhIHdhcyBsb2FkZWQsIHdlIGxvb2sgdXAgYW5kIHNhdmUgdGhlIHJlZiBmcm9tIGN1cnJlbnQgZGF0YSBzZXRcbiAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnQubGVuZ3RoID4gMCAmJiB0aGlzLnByZXZTZWxlY3Rpb25SZWZzLmxlbmd0aCAhPT0gdGhpcy5jdXJyZW50Lmxlbmd0aCkge1xuICAgICAgICAgICAgICBpZiAodGhpcy5faXRlbXMuYWxsICYmIHRoaXMuX2l0ZW1zLnRyYWNrQnkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByZXZTZWxlY3Rpb25SZWZzID0gW107XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50LmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBsb29rdXAgPSB0aGlzLl9pdGVtcy5hbGwuZmluZEluZGV4KG1heWJlID0+IG1heWJlID09PSBpdGVtKTtcbiAgICAgICAgICAgICAgICAgIHRoaXMucHJldlNlbGVjdGlvblJlZnMucHVzaCh0aGlzLl9pdGVtcy50cmFja0J5KGxvb2t1cCwgaXRlbSkpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFRPRE86IHJldmlzaXQgdGhpcyB3aGVuIHdlIHdvcmsgb24gaHR0cHM6Ly9naXRodWIuY29tL3Ztd2FyZS9jbGFyaXR5L2lzc3Vlcy8yMzQyXG4gICAgICAgICAgICAvLyBjdXJyZW50bHksIHRoZSBzZWxlY3Rpb24gaXMgY2xlYXJlZCB3aGVuIGZpbHRlciBpcyBhcHBsaWVkLCBzbyB0aGUgbG9naWMgaW5zaWRlXG4gICAgICAgICAgICAvLyB0aGUgaWYgc3RhdGVtZW50IGJlbG93IHJlc3VsdHMgaW4gYnJva2VuIGJlaGF2aW9yLlxuICAgICAgICAgICAgaWYgKGxlZnRPdmVyLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgdXBkYXRlZEl0ZW1zLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVmID0gdHJhY2tCeShpbmRleCwgaXRlbSk7XG4gICAgICAgICAgICAgICAgLy8gTG9vayBpbiBjdXJyZW50IHNlbGVjdGVkIHJlZnMgYXJyYXkgaWYgaXRlbSBpcyBzZWxlY3RlZCwgYW5kIHVwZGF0ZSBhY3R1YWwgdmFsdWVcbiAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3RlZEluZGV4ID0gdGhpcy5wcmV2U2VsZWN0aW9uUmVmcy5pbmRleE9mKHJlZik7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkSW5kZXggPiAtMSkge1xuICAgICAgICAgICAgICAgICAgbGVmdE92ZXJbc2VsZWN0ZWRJbmRleF0gPSBpdGVtO1xuICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uVXBkYXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAvLyBGaWx0ZXIgb3V0IGFueSB1bm1hdGNoZWQgaXRlbXMgaWYgd2UncmUgdXNpbmcgc21hcnQgZGF0YWdyaWRzIHdoZXJlIHdlIGV4cGVjdCBhbGwgaXRlbXMgdG8gYmVcbiAgICAgICAgICAgICAgLy8gcHJlc2VudFxuICAgICAgICAgICAgICBpZiAodGhpcy5faXRlbXMuc21hcnQpIHtcbiAgICAgICAgICAgICAgICBsZWZ0T3ZlciA9IGxlZnRPdmVyLmZpbHRlcihzZWxlY3RlZCA9PiB1cGRhdGVkSXRlbXMuaW5kZXhPZihzZWxlY3RlZCkgPiAtMSk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudC5sZW5ndGggIT09IGxlZnRPdmVyLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uVXBkYXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgLy8gVE9ETzogRGlzY3Vzc2VkIHRoaXMgd2l0aCBFdWRlcyBhbmQgdGhpcyBpcyBmaW5lIGZvciBub3cuXG4gICAgICAgICAgICAgIC8vIEJ1dCB3ZSBuZWVkIHRvIGZpZ3VyZSBvdXQgYSBkaWZmZXJlbnQgcGF0dGVybiBmb3IgdGhlXG4gICAgICAgICAgICAgIC8vIGNoaWxkIHRyaWdnZXJpbmcgdGhlIHBhcmVudCBjaGFuZ2UgZGV0ZWN0aW9uIHByb2JsZW0uXG4gICAgICAgICAgICAgIC8vIFVzaW5nIHNldFRpbWVvdXQgZm9yIG5vdyB0byBmaXggdGhpcy5cbiAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGlvblVwZGF0ZWQpIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudCA9IGxlZnRPdmVyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBkZWZhdWx0OiB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBjbGVhclNlbGVjdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLmN1cnJlbnQubGVuZ3RoID0gMDtcbiAgICB0aGlzLnByZXZTZWxlY3Rpb25SZWZzID0gW107XG4gICAgdGhpcy5fY3VycmVudFNpbmdsZSA9IG51bGw7XG4gICAgdGhpcy5wcmV2U2luZ2xlU2VsZWN0aW9uUmVmID0gbnVsbDtcbiAgICB0aGlzLmVtaXRDaGFuZ2UoKTtcbiAgfVxuXG4gIHByaXZhdGUgX3NlbGVjdGlvblR5cGU6IFNlbGVjdGlvblR5cGUgPSBTZWxlY3Rpb25UeXBlLk5vbmU7XG4gIHB1YmxpYyBnZXQgc2VsZWN0aW9uVHlwZSgpOiBTZWxlY3Rpb25UeXBlIHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0aW9uVHlwZTtcbiAgfVxuICBwdWJsaWMgc2V0IHNlbGVjdGlvblR5cGUodmFsdWU6IFNlbGVjdGlvblR5cGUpIHtcbiAgICBpZiAodmFsdWUgPT09IHRoaXMuc2VsZWN0aW9uVHlwZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9zZWxlY3Rpb25UeXBlID0gdmFsdWU7XG4gICAgaWYgKHZhbHVlID09PSBTZWxlY3Rpb25UeXBlLk5vbmUpIHtcbiAgICAgIGRlbGV0ZSB0aGlzLmN1cnJlbnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudXBkYXRlQ3VycmVudChbXSwgZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyByb3dTZWxlY3Rpb25Nb2RlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBnZXQgX3NlbGVjdGFibGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGlvblR5cGUgPT09IFNlbGVjdGlvblR5cGUuTXVsdGkgfHwgdGhpcy5fc2VsZWN0aW9uVHlwZSA9PT0gU2VsZWN0aW9uVHlwZS5TaW5nbGU7XG4gIH1cbiAgLyoqXG4gICAqIElnbm9yZSBpdGVtcyBjaGFuZ2VzIGluIHRoZSBzYW1lIGNoYW5nZSBkZXRlY3Rpb24gY3ljbGUuXG4gICAqL1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmVcbiAgcHJpdmF0ZSBkZWJvdW5jZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBTdWJzY3JpcHRpb25zIHRvIHRoZSBvdGhlciBwcm92aWRlcnMgY2hhbmdlcy5cbiAgICovXG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICAvKipcbiAgICogQ2xlYW5zIHVwIG91ciBzdWJzY3JpcHRpb25zIHRvIG90aGVyIHByb3ZpZGVyc1xuICAgKi9cbiAgcHVibGljIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmZvckVhY2goc3ViID0+IHN1Yi51bnN1YnNjcmliZSgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgY3VycmVudCBzZWxlY3Rpb24gaW4gc2luZ2xlIHNlbGVjdGlvbiB0eXBlXG4gICAqL1xuICBwcml2YXRlIF9jdXJyZW50U2luZ2xlOiBUO1xuICBwdWJsaWMgZ2V0IGN1cnJlbnRTaW5nbGUoKTogVCB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRTaW5nbGU7XG4gIH1cbiAgcHVibGljIHNldCBjdXJyZW50U2luZ2xlKHZhbHVlOiBUKSB7XG4gICAgaWYgKHZhbHVlID09PSB0aGlzLl9jdXJyZW50U2luZ2xlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX2N1cnJlbnRTaW5nbGUgPSB2YWx1ZTtcbiAgICBpZiAodGhpcy5faXRlbXMuYWxsICYmIHRoaXMuX2l0ZW1zLnRyYWNrQnkgJiYgdmFsdWUpIHtcbiAgICAgIGNvbnN0IGxvb2t1cCA9IHRoaXMuX2l0ZW1zLmFsbC5maW5kSW5kZXgobWF5YmUgPT4gbWF5YmUgPT09IHZhbHVlKTtcbiAgICAgIHRoaXMucHJldlNpbmdsZVNlbGVjdGlvblJlZiA9IHRoaXMuX2l0ZW1zLnRyYWNrQnkobG9va3VwLCB2YWx1ZSk7XG4gICAgfVxuICAgIHRoaXMuZW1pdENoYW5nZSgpO1xuICAgIC8vIElnbm9yZSBpdGVtcyBjaGFuZ2VzIGluIHRoZSBzYW1lIGNoYW5nZSBkZXRlY3Rpb24gY3ljbGUuXG4gICAgLy8gQFRPRE8gVGhpcyBjYW4gbGlrZWx5IGJlIHJlbW92ZWQhXG4gICAgdGhpcy5kZWJvdW5jZSA9IHRydWU7XG4gICAgc2V0VGltZW91dCgoKSA9PiAodGhpcy5kZWJvdW5jZSA9IGZhbHNlKSk7XG4gIH1cblxuICAvKipcbiAgICogVGhlIGN1cnJlbnQgc2VsZWN0aW9uXG4gICAqL1xuICBwcml2YXRlIF9jdXJyZW50OiBUW107XG4gIHB1YmxpYyBnZXQgY3VycmVudCgpOiBUW10ge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50O1xuICB9XG4gIHB1YmxpYyBzZXQgY3VycmVudCh2YWx1ZTogVFtdKSB7XG4gICAgdGhpcy51cGRhdGVDdXJyZW50KHZhbHVlLCB0cnVlKTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGVDdXJyZW50KHZhbHVlOiBUW10sIGVtaXQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9jdXJyZW50ID0gdmFsdWU7XG4gICAgaWYgKGVtaXQpIHtcbiAgICAgIHRoaXMuZW1pdENoYW5nZSgpO1xuICAgICAgLy8gSWdub3JlIGl0ZW1zIGNoYW5nZXMgaW4gdGhlIHNhbWUgY2hhbmdlIGRldGVjdGlvbiBjeWNsZS5cbiAgICAgIC8vIEBUT0RPIFRoaXMgY2FuIGxpa2VseSBiZSByZW1vdmVkIVxuICAgICAgdGhpcy5kZWJvdW5jZSA9IHRydWU7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+ICh0aGlzLmRlYm91bmNlID0gZmFsc2UpKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhlIE9ic2VydmFibGUgdGhhdCBsZXRzIG90aGVyIGNsYXNzZXMgc3Vic2NyaWJlIHRvIHNlbGVjdGlvbiBjaGFuZ2VzXG4gICAqL1xuICBwcml2YXRlIF9jaGFuZ2UgPSBuZXcgU3ViamVjdDxUW10gfCBUPigpO1xuICBwcml2YXRlIGVtaXRDaGFuZ2UoKSB7XG4gICAgaWYgKHRoaXMuX3NlbGVjdGlvblR5cGUgPT09IFNlbGVjdGlvblR5cGUuU2luZ2xlKSB7XG4gICAgICB0aGlzLl9jaGFuZ2UubmV4dCh0aGlzLmN1cnJlbnRTaW5nbGUpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fc2VsZWN0aW9uVHlwZSA9PT0gU2VsZWN0aW9uVHlwZS5NdWx0aSkge1xuICAgICAgdGhpcy5fY2hhbmdlLm5leHQodGhpcy5jdXJyZW50KTtcbiAgICB9XG4gIH1cbiAgLy8gV2UgZG8gbm90IHdhbnQgdG8gZXhwb3NlIHRoZSBTdWJqZWN0IGl0c2VsZiwgYnV0IHRoZSBPYnNlcnZhYmxlIHdoaWNoIGlzIHJlYWQtb25seVxuICBwdWJsaWMgZ2V0IGNoYW5nZSgpOiBPYnNlcnZhYmxlPFRbXSB8IFQ+IHtcbiAgICByZXR1cm4gdGhpcy5fY2hhbmdlLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBhbiBpdGVtIGlzIGN1cnJlbnRseSBzZWxlY3RlZFxuICAgKi9cbiAgcHVibGljIGlzU2VsZWN0ZWQoaXRlbTogVCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLl9zZWxlY3Rpb25UeXBlID09PSBTZWxlY3Rpb25UeXBlLlNpbmdsZSkge1xuICAgICAgcmV0dXJuIHRoaXMuY3VycmVudFNpbmdsZSA9PT0gaXRlbTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX3NlbGVjdGlvblR5cGUgPT09IFNlbGVjdGlvblR5cGUuTXVsdGkpIHtcbiAgICAgIHJldHVybiB0aGlzLmN1cnJlbnQuaW5kZXhPZihpdGVtKSA+PSAwO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0cyBhbiBpdGVtXG4gICAqL1xuICBwcml2YXRlIHNlbGVjdEl0ZW0oaXRlbTogVCk6IHZvaWQge1xuICAgIHRoaXMuY3VycmVudC5wdXNoKGl0ZW0pO1xuICAgIGlmICh0aGlzLl9pdGVtcy50cmFja0J5KSB7XG4gICAgICAvLyBQdXNoIHNlbGVjdGVkIHJlZiBvbnRvIGFycmF5XG4gICAgICBjb25zdCBsb29rdXAgPSB0aGlzLl9pdGVtcy5hbGwuZmluZEluZGV4KG1heWJlID0+IG1heWJlID09PSBpdGVtKTtcbiAgICAgIHRoaXMucHJldlNlbGVjdGlvblJlZnMucHVzaCh0aGlzLl9pdGVtcy50cmFja0J5KGxvb2t1cCwgaXRlbSkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEZXNlbGVjdHMgYW4gaXRlbVxuICAgKi9cbiAgcHJpdmF0ZSBkZXNlbGVjdEl0ZW0oaW5kZXhPZkl0ZW06IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuY3VycmVudC5zcGxpY2UoaW5kZXhPZkl0ZW0sIDEpO1xuICAgIGlmICh0aGlzLl9pdGVtcy50cmFja0J5ICYmIGluZGV4T2ZJdGVtIDwgdGhpcy5wcmV2U2VsZWN0aW9uUmVmcy5sZW5ndGgpIHtcbiAgICAgIC8vIEtlZXAgc2VsZWN0ZWQgcmVmcyBhcnJheSBpbiBzeW5jXG4gICAgICB0aGlzLnByZXZTZWxlY3Rpb25SZWZzLnNwbGljZShpbmRleE9mSXRlbSwgMSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNlbGVjdHMgb3IgZGVzZWxlY3RzIGFuIGl0ZW1cbiAgICovXG4gIHB1YmxpYyBzZXRTZWxlY3RlZChpdGVtOiBULCBzZWxlY3RlZDogYm9vbGVhbikge1xuICAgIHN3aXRjaCAodGhpcy5fc2VsZWN0aW9uVHlwZSkge1xuICAgICAgY2FzZSBTZWxlY3Rpb25UeXBlLk5vbmU6XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBTZWxlY3Rpb25UeXBlLlNpbmdsZTpcbiAgICAgICAgLy8gaW4gc2luZ2xlIHNlbGVjdGlvbiwgc2V0IGN1cnJlbnRTaW5nbGUgbWV0aG9kIHNob3VsZCBiZSB1c2VkXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBTZWxlY3Rpb25UeXBlLk11bHRpOlxuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuY3VycmVudC5pbmRleE9mKGl0ZW0pO1xuICAgICAgICBpZiAoaW5kZXggPj0gMCAmJiAhc2VsZWN0ZWQpIHtcbiAgICAgICAgICB0aGlzLmRlc2VsZWN0SXRlbShpbmRleCk7XG4gICAgICAgICAgdGhpcy5lbWl0Q2hhbmdlKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoaW5kZXggPCAwICYmIHNlbGVjdGVkKSB7XG4gICAgICAgICAgdGhpcy5zZWxlY3RJdGVtKGl0ZW0pO1xuICAgICAgICAgIHRoaXMuZW1pdENoYW5nZSgpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBhbGwgY3VycmVudGx5IGRpc3BsYXllZCBpdGVtcyBhcmUgc2VsZWN0ZWRcbiAgICovXG4gIHB1YmxpYyBpc0FsbFNlbGVjdGVkKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLl9zZWxlY3Rpb25UeXBlICE9PSBTZWxlY3Rpb25UeXBlLk11bHRpIHx8ICF0aGlzLl9pdGVtcy5kaXNwbGF5ZWQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgZGlzcGxheWVkSXRlbXM6IFRbXSA9IHRoaXMuX2l0ZW1zLmRpc3BsYXllZDtcbiAgICBjb25zdCBuYkRpc3BsYXllZCA9IHRoaXMuX2l0ZW1zLmRpc3BsYXllZC5sZW5ndGg7XG4gICAgaWYgKG5iRGlzcGxheWVkIDwgMSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCB0ZW1wOiBUW10gPSBkaXNwbGF5ZWRJdGVtcy5maWx0ZXIoaXRlbSA9PiB0aGlzLmN1cnJlbnQuaW5kZXhPZihpdGVtKSA+IC0xKTtcbiAgICByZXR1cm4gdGVtcC5sZW5ndGggPT09IGRpc3BsYXllZEl0ZW1zLmxlbmd0aDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWxlY3RzIG9yIGRlc2VsZWN0cyBhbGwgY3VycmVudGx5IGRpc3BsYXllZCBpdGVtc1xuICAgKi9cbiAgcHVibGljIHRvZ2dsZUFsbCgpIHtcbiAgICBpZiAodGhpcy5fc2VsZWN0aW9uVHlwZSA9PT0gU2VsZWN0aW9uVHlwZS5Ob25lIHx8IHRoaXMuX3NlbGVjdGlvblR5cGUgPT09IFNlbGVjdGlvblR5cGUuU2luZ2xlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8qXG4gICAgICAgICAqIElmIGV2ZXJ5IGN1cnJlbnRseSBkaXNwbGF5ZWQgaXRlbSBpcyBhbHJlYWR5IHNlbGVjdGVkLCB3ZSBjbGVhciB0aGVtLlxuICAgICAgICAgKiBJZiBhdCBsZWFzdCBvbmUgaXRlbSBpc24ndCBzZWxlY3RlZCwgd2Ugc2VsZWN0IGV2ZXJ5IGN1cnJlbnRseSBkaXNwbGF5ZWQgaXRlbS5cbiAgICAgICAgICovXG4gICAgaWYgKHRoaXMuaXNBbGxTZWxlY3RlZCgpKSB7XG4gICAgICB0aGlzLl9pdGVtcy5kaXNwbGF5ZWQuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgY29uc3QgY3VycmVudEluZGV4ID0gdGhpcy5jdXJyZW50LmluZGV4T2YoaXRlbSk7XG4gICAgICAgIGlmIChjdXJyZW50SW5kZXggPiAtMSkge1xuICAgICAgICAgIHRoaXMuZGVzZWxlY3RJdGVtKGN1cnJlbnRJbmRleCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9pdGVtcy5kaXNwbGF5ZWQuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudC5pbmRleE9mKGl0ZW0pIDwgMCkge1xuICAgICAgICAgIHRoaXMuc2VsZWN0SXRlbShpdGVtKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMuZW1pdENoYW5nZSgpO1xuICB9XG59XG4iXX0=