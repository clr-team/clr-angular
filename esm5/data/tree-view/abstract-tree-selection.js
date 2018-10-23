/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * @abstract
 */
var /**
 * @abstract
 */
AbstractTreeSelection = /** @class */ (function () {
    function AbstractTreeSelection(parent) {
        this.parent = parent;
        this._selected = false;
        this._indeterminate = false;
    }
    Object.defineProperty(AbstractTreeSelection.prototype, "selected", {
        get: /**
         * @return {?}
         */
        function () {
            return this._selected;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._selected = value;
            this.indeterminate = false;
            this.children.forEach(function (child) { return child.parentChanged(value); });
            if (this.parent) {
                this.parent.childChanged();
            }
            this.selectedChanged();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractTreeSelection.prototype, "indeterminate", {
        get: /**
         * @return {?}
         */
        function () {
            return this._indeterminate;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            value = !!value;
            if (this._indeterminate !== value) {
                this._indeterminate = value;
                this.indeterminateChanged();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    AbstractTreeSelection.prototype.childChanged = /**
     * @return {?}
     */
    function () {
        var e_1, _a;
        /** @type {?} */
        var oneSelectedChild = false;
        /** @type {?} */
        var previousSelectedValue = this._selected;
        /** @type {?} */
        var previousIndeterminateValue = this._indeterminate;
        this._selected = true;
        this._indeterminate = false;
        try {
            for (var _b = tslib_1.__values(this.children), _c = _b.next(); !_c.done; _c = _b.next()) {
                var child = _c.value;
                if (child.indeterminate) {
                    this._selected = false;
                    this._indeterminate = true;
                    break;
                }
                if (child.selected) {
                    oneSelectedChild = true;
                    if (this._selected === false) {
                        this._indeterminate = true;
                        break;
                    }
                }
                else {
                    this._selected = false;
                    if (oneSelectedChild) {
                        this._indeterminate = true;
                        break;
                    }
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
        if (this.parent &&
            (this._selected !== previousSelectedValue || this._indeterminate !== previousIndeterminateValue)) {
            this.parent.childChanged();
        }
        if (this.selected !== previousSelectedValue) {
            this.selectedChanged();
        }
        if (this.indeterminate !== previousIndeterminateValue) {
            this.indeterminateChanged();
        }
    };
    /**
     * @param {?} selected
     * @return {?}
     */
    AbstractTreeSelection.prototype.parentChanged = /**
     * @param {?} selected
     * @return {?}
     */
    function (selected) {
        if (selected && !this.selected) {
            this._selected = true;
            this.indeterminate = false;
            this.children.forEach(function (child) { return child.parentChanged(true); });
            this.selectedChanged();
        }
        if (!selected && (this.selected || this.indeterminate)) {
            this._selected = false;
            this.indeterminate = false;
            this.children.forEach(function (child) { return child.parentChanged(false); });
            this.selectedChanged();
        }
    };
    return AbstractTreeSelection;
}());
/**
 * @abstract
 */
export { AbstractTreeSelection };
if (false) {
    /** @type {?} */
    AbstractTreeSelection.prototype._selected;
    /** @type {?} */
    AbstractTreeSelection.prototype._indeterminate;
    /** @type {?} */
    AbstractTreeSelection.prototype.parent;
    /**
     * @abstract
     * @return {?}
     */
    AbstractTreeSelection.prototype.children = function () { };
    /**
     * @abstract
     * @return {?}
     */
    AbstractTreeSelection.prototype.selectedChanged = function () { };
    /**
     * @abstract
     * @return {?}
     */
    AbstractTreeSelection.prototype.indeterminateChanged = function () { };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzdHJhY3QtdHJlZS1zZWxlY3Rpb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJkYXRhL3RyZWUtdmlldy9hYnN0cmFjdC10cmVlLXNlbGVjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBTUE7Ozs7SUFDRSwrQkFBbUIsTUFBNkI7UUFBN0IsV0FBTSxHQUFOLE1BQU0sQ0FBdUI7UUFPeEMsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUMzQixtQkFBYyxHQUFZLEtBQUssQ0FBQztJQVJXLENBQUM7SUFVcEQsc0JBQVcsMkNBQVE7Ozs7UUFBbkI7WUFDRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDeEIsQ0FBQzs7Ozs7UUFFRCxVQUFvQixLQUFjO1lBQ2hDLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1lBQzNCLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsRUFBMUIsQ0FBMEIsQ0FBQyxDQUFDO1lBQzNELElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDZixJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDO2FBQzVCO1lBQ0QsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3pCLENBQUM7OztPQVZBO0lBWUQsc0JBQVcsZ0RBQWE7Ozs7UUFBeEI7WUFDRSxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7UUFDN0IsQ0FBQzs7Ozs7UUFFRCxVQUF5QixLQUFjO1lBQ3JDLEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQ2hCLElBQUksSUFBSSxDQUFDLGNBQWMsS0FBSyxLQUFLLEVBQUU7Z0JBQ2pDLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO2dCQUM1QixJQUFJLENB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dGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBYnN0cmFjdFRyZWVTZWxlY3Rpb24ge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcGFyZW50OiBBYnN0cmFjdFRyZWVTZWxlY3Rpb24pIHt9XG5cbiAgYWJzdHJhY3QgZ2V0IGNoaWxkcmVuKCk6IEFic3RyYWN0VHJlZVNlbGVjdGlvbltdO1xuXG4gIGFic3RyYWN0IHNlbGVjdGVkQ2hhbmdlZCgpOiB2b2lkO1xuICBhYnN0cmFjdCBpbmRldGVybWluYXRlQ2hhbmdlZCgpOiB2b2lkO1xuXG4gIHByaXZhdGUgX3NlbGVjdGVkOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgX2luZGV0ZXJtaW5hdGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBwdWJsaWMgZ2V0IHNlbGVjdGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZDtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgc2VsZWN0ZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9zZWxlY3RlZCA9IHZhbHVlO1xuICAgIHRoaXMuaW5kZXRlcm1pbmF0ZSA9IGZhbHNlO1xuICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiBjaGlsZC5wYXJlbnRDaGFuZ2VkKHZhbHVlKSk7XG4gICAgaWYgKHRoaXMucGFyZW50KSB7XG4gICAgICB0aGlzLnBhcmVudC5jaGlsZENoYW5nZWQoKTtcbiAgICB9XG4gICAgdGhpcy5zZWxlY3RlZENoYW5nZWQoKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgaW5kZXRlcm1pbmF0ZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faW5kZXRlcm1pbmF0ZTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgaW5kZXRlcm1pbmF0ZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHZhbHVlID0gISF2YWx1ZTtcbiAgICBpZiAodGhpcy5faW5kZXRlcm1pbmF0ZSAhPT0gdmFsdWUpIHtcbiAgICAgIHRoaXMuX2luZGV0ZXJtaW5hdGUgPSB2YWx1ZTtcbiAgICAgIHRoaXMuaW5kZXRlcm1pbmF0ZUNoYW5nZWQoKTtcbiAgICB9XG4gIH1cblxuICBjaGlsZENoYW5nZWQoKTogdm9pZCB7XG4gICAgbGV0IG9uZVNlbGVjdGVkQ2hpbGQgPSBmYWxzZTtcbiAgICBjb25zdCBwcmV2aW91c1NlbGVjdGVkVmFsdWU6IGJvb2xlYW4gPSB0aGlzLl9zZWxlY3RlZDtcbiAgICBjb25zdCBwcmV2aW91c0luZGV0ZXJtaW5hdGVWYWx1ZTogYm9vbGVhbiA9IHRoaXMuX2luZGV0ZXJtaW5hdGU7XG4gICAgdGhpcy5fc2VsZWN0ZWQgPSB0cnVlO1xuICAgIHRoaXMuX2luZGV0ZXJtaW5hdGUgPSBmYWxzZTtcblxuICAgIGZvciAoY29uc3QgY2hpbGQgb2YgdGhpcy5jaGlsZHJlbikge1xuICAgICAgaWYgKGNoaWxkLmluZGV0ZXJtaW5hdGUpIHtcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5faW5kZXRlcm1pbmF0ZSA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgaWYgKGNoaWxkLnNlbGVjdGVkKSB7XG4gICAgICAgIG9uZVNlbGVjdGVkQ2hpbGQgPSB0cnVlO1xuICAgICAgICBpZiAodGhpcy5fc2VsZWN0ZWQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgdGhpcy5faW5kZXRlcm1pbmF0ZSA9IHRydWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3NlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgIGlmIChvbmVTZWxlY3RlZENoaWxkKSB7XG4gICAgICAgICAgdGhpcy5faW5kZXRlcm1pbmF0ZSA9IHRydWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICB0aGlzLnBhcmVudCAmJlxuICAgICAgKHRoaXMuX3NlbGVjdGVkICE9PSBwcmV2aW91c1NlbGVjdGVkVmFsdWUgfHwgdGhpcy5faW5kZXRlcm1pbmF0ZSAhPT0gcHJldmlvdXNJbmRldGVybWluYXRlVmFsdWUpXG4gICAgKSB7XG4gICAgICB0aGlzLnBhcmVudC5jaGlsZENoYW5nZWQoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5zZWxlY3RlZCAhPT0gcHJldmlvdXNTZWxlY3RlZFZhbHVlKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkQ2hhbmdlZCgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmluZGV0ZXJtaW5hdGUgIT09IHByZXZpb3VzSW5kZXRlcm1pbmF0ZVZhbHVlKSB7XG4gICAgICB0aGlzLmluZGV0ZXJtaW5hdGVDaGFuZ2VkKCk7XG4gICAgfVxuICB9XG5cbiAgcGFyZW50Q2hhbmdlZChzZWxlY3RlZDogYm9vbGVhbikge1xuICAgIGlmIChzZWxlY3RlZCAmJiAhdGhpcy5zZWxlY3RlZCkge1xuICAgICAgdGhpcy5fc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgdGhpcy5pbmRldGVybWluYXRlID0gZmFsc2U7XG4gICAgICB0aGlzLmNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4gY2hpbGQucGFyZW50Q2hhbmdlZCh0cnVlKSk7XG4gICAgICB0aGlzLnNlbGVjdGVkQ2hhbmdlZCgpO1xuICAgIH1cbiAgICBpZiAoIXNlbGVjdGVkICYmICh0aGlzLnNlbGVjdGVkIHx8IHRoaXMuaW5kZXRlcm1pbmF0ZSkpIHtcbiAgICAgIHRoaXMuX3NlbGVjdGVkID0gZmFsc2U7XG4gICAgICB0aGlzLmluZGV0ZXJtaW5hdGUgPSBmYWxzZTtcbiAgICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiBjaGlsZC5wYXJlbnRDaGFuZ2VkKGZhbHNlKSk7XG4gICAgICB0aGlzLnNlbGVjdGVkQ2hhbmdlZCgpO1xuICAgIH1cbiAgfVxufVxuIl19