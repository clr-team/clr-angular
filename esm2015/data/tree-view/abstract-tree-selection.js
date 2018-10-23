/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * @abstract
 */
export class AbstractTreeSelection {
    /**
     * @param {?} parent
     */
    constructor(parent) {
        this.parent = parent;
        this._selected = false;
        this._indeterminate = false;
    }
    /**
     * @return {?}
     */
    get selected() {
        return this._selected;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set selected(value) {
        this._selected = value;
        this.indeterminate = false;
        this.children.forEach(child => child.parentChanged(value));
        if (this.parent) {
            this.parent.childChanged();
        }
        this.selectedChanged();
    }
    /**
     * @return {?}
     */
    get indeterminate() {
        return this._indeterminate;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set indeterminate(value) {
        value = !!value;
        if (this._indeterminate !== value) {
            this._indeterminate = value;
            this.indeterminateChanged();
        }
    }
    /**
     * @return {?}
     */
    childChanged() {
        /** @type {?} */
        let oneSelectedChild = false;
        /** @type {?} */
        const previousSelectedValue = this._selected;
        /** @type {?} */
        const previousIndeterminateValue = this._indeterminate;
        this._selected = true;
        this._indeterminate = false;
        for (const child of this.children) {
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
    }
    /**
     * @param {?} selected
     * @return {?}
     */
    parentChanged(selected) {
        if (selected && !this.selected) {
            this._selected = true;
            this.indeterminate = false;
            this.children.forEach(child => child.parentChanged(true));
            this.selectedChanged();
        }
        if (!selected && (this.selected || this.indeterminate)) {
            this._selected = false;
            this.indeterminate = false;
            this.children.forEach(child => child.parentChanged(false));
            this.selectedChanged();
        }
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzdHJhY3QtdHJlZS1zZWxlY3Rpb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJkYXRhL3RyZWUtdmlldy9hYnN0cmFjdC10cmVlLXNlbGVjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFNQSxNQUFNLE9BQWdCLHFCQUFxQjs7OztJQUN6QyxZQUFtQixNQUE2QjtRQUE3QixXQUFNLEdBQU4sTUFBTSxDQUF1QjtRQU94QyxjQUFTLEdBQVksS0FBSyxDQUFDO1FBQzNCLG1CQUFjLEdBQVksS0FBSyxDQUFDO0lBUlcsQ0FBQzs7OztJQVVwRCxJQUFXLFFBQVE7UUFDakIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7Ozs7O0lBRUQsSUFBVyxRQUFRLENBQUMsS0FBYztRQUNoQyxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN2QixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztRQUMzQixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUMzRCxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZixJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQzVCO1FBQ0QsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ3pCLENBQUM7Ozs7SUFFRCxJQUFXLGFBQWE7UUFDdEIsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO0lBQzdCLENBQUM7Ozs7O0lBRUQsSUFBVyxhQUFhLENBQUMsS0FBYztRQUNyQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUNoQixJQUFJLElBQUksQ0FBQyxjQUFjLEtBQUssS0FBSyxFQUFFO1lBQ2pDLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO1lBQzVCLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1NBQzdCO0lBQ0gsQ0FBQzs7OztJQUVELFlBQVk7O1lBQ04sZ0JBQWdCLEdBQUcsS0FBSzs7Y0FDdEIscUJBQXFCLEdBQVksSUFBSSxDQUFDLFNBQVM7O2NBQy9DLDBCQUEwQixHQUFZLElBQUksQ0FBQyxjQUFjO1FBQy9ELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO1FBRTVCLEtBQUssTUFBTSxLQUFLLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQyxJQUFJLEtBQUssQ0FBQyxhQUFhLEVBQUU7Z0JBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO2dCQUN2QixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztnQkFDM0IsTUFBTTthQUNQO1lBQ0QsSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFO2dCQUNsQixnQkFBZ0IsR0FBRyxJQUFJLENBQUM7Z0JBQ3hCLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxLQUFLLEVBQUU7b0JBQzVCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO29CQUMzQixNQUFNO2lCQUNQO2FBQ0Y7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7Z0JBQ3ZCLElBQUksZ0JBQWdCLEVBQUU7b0JBQ3BCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO29CQUMzQixNQUFNO2lCQUNQO2FBQ0Y7U0FDRjtRQUVELElBQ0UsSUFBSSxDQUFDLE1BQU07WUFDWCxDQUFDLElBQUksQ0FBQyxTQUFTLEtBQUsscUJBQXFCLElBQUksSUFBSSxDQUFDLGNBQWMsS0FBSywwQkFBMEIsQ0FBQyxFQUNoRztZQUNBLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDNUI7UUFFRCxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUsscUJBQXFCLEVBQUU7WUFDM0MsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQ3hCO1FBRUQsSUFBSSxJQUFJLENBQUMsYUFBYSxLQUFLLDBCQUEwQixFQUFFO1lBQ3JELElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1NBQzdCO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxhQUFhLENBQUMsUUFBaUI7UUFDN0IsSUFBSSxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQzlCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1lBQzNCLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzFELElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUN4QjtRQUNELElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRTtZQUN0RCxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztZQUN2QixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztZQUMzQixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUMzRCxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7U0FDeEI7SUFDSCxDQUFDO0NBQ0Y7OztJQXZGQywwQ0FBbUM7O0lBQ25DLCtDQUF3Qzs7SUFSNUIsdUNBQW9DOzs7OztJQUVoRCwyREFBaUQ7Ozs7O0lBRWpELGtFQUFpQzs7Ozs7SUFDakMsdUVBQXNDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWJzdHJhY3RUcmVlU2VsZWN0aW9uIHtcbiAgY29uc3RydWN0b3IocHVibGljIHBhcmVudDogQWJzdHJhY3RUcmVlU2VsZWN0aW9uKSB7fVxuXG4gIGFic3RyYWN0IGdldCBjaGlsZHJlbigpOiBBYnN0cmFjdFRyZWVTZWxlY3Rpb25bXTtcblxuICBhYnN0cmFjdCBzZWxlY3RlZENoYW5nZWQoKTogdm9pZDtcbiAgYWJzdHJhY3QgaW5kZXRlcm1pbmF0ZUNoYW5nZWQoKTogdm9pZDtcblxuICBwcml2YXRlIF9zZWxlY3RlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIF9pbmRldGVybWluYXRlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgcHVibGljIGdldCBzZWxlY3RlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWQ7XG4gIH1cblxuICBwdWJsaWMgc2V0IHNlbGVjdGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fc2VsZWN0ZWQgPSB2YWx1ZTtcbiAgICB0aGlzLmluZGV0ZXJtaW5hdGUgPSBmYWxzZTtcbiAgICB0aGlzLmNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4gY2hpbGQucGFyZW50Q2hhbmdlZCh2YWx1ZSkpO1xuICAgIGlmICh0aGlzLnBhcmVudCkge1xuICAgICAgdGhpcy5wYXJlbnQuY2hpbGRDaGFuZ2VkKCk7XG4gICAgfVxuICAgIHRoaXMuc2VsZWN0ZWRDaGFuZ2VkKCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGluZGV0ZXJtaW5hdGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2luZGV0ZXJtaW5hdGU7XG4gIH1cblxuICBwdWJsaWMgc2V0IGluZGV0ZXJtaW5hdGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB2YWx1ZSA9ICEhdmFsdWU7XG4gICAgaWYgKHRoaXMuX2luZGV0ZXJtaW5hdGUgIT09IHZhbHVlKSB7XG4gICAgICB0aGlzLl9pbmRldGVybWluYXRlID0gdmFsdWU7XG4gICAgICB0aGlzLmluZGV0ZXJtaW5hdGVDaGFuZ2VkKCk7XG4gICAgfVxuICB9XG5cbiAgY2hpbGRDaGFuZ2VkKCk6IHZvaWQge1xuICAgIGxldCBvbmVTZWxlY3RlZENoaWxkID0gZmFsc2U7XG4gICAgY29uc3QgcHJldmlvdXNTZWxlY3RlZFZhbHVlOiBib29sZWFuID0gdGhpcy5fc2VsZWN0ZWQ7XG4gICAgY29uc3QgcHJldmlvdXNJbmRldGVybWluYXRlVmFsdWU6IGJvb2xlYW4gPSB0aGlzLl9pbmRldGVybWluYXRlO1xuICAgIHRoaXMuX3NlbGVjdGVkID0gdHJ1ZTtcbiAgICB0aGlzLl9pbmRldGVybWluYXRlID0gZmFsc2U7XG5cbiAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIHRoaXMuY2hpbGRyZW4pIHtcbiAgICAgIGlmIChjaGlsZC5pbmRldGVybWluYXRlKSB7XG4gICAgICAgIHRoaXMuX3NlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2luZGV0ZXJtaW5hdGUgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGlmIChjaGlsZC5zZWxlY3RlZCkge1xuICAgICAgICBvbmVTZWxlY3RlZENoaWxkID0gdHJ1ZTtcbiAgICAgICAgaWYgKHRoaXMuX3NlbGVjdGVkID09PSBmYWxzZSkge1xuICAgICAgICAgIHRoaXMuX2luZGV0ZXJtaW5hdGUgPSB0cnVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICBpZiAob25lU2VsZWN0ZWRDaGlsZCkge1xuICAgICAgICAgIHRoaXMuX2luZGV0ZXJtaW5hdGUgPSB0cnVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgdGhpcy5wYXJlbnQgJiZcbiAgICAgICh0aGlzLl9zZWxlY3RlZCAhPT0gcHJldmlvdXNTZWxlY3RlZFZhbHVlIHx8IHRoaXMuX2luZGV0ZXJtaW5hdGUgIT09IHByZXZpb3VzSW5kZXRlcm1pbmF0ZVZhbHVlKVxuICAgICkge1xuICAgICAgdGhpcy5wYXJlbnQuY2hpbGRDaGFuZ2VkKCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc2VsZWN0ZWQgIT09IHByZXZpb3VzU2VsZWN0ZWRWYWx1ZSkge1xuICAgICAgdGhpcy5zZWxlY3RlZENoYW5nZWQoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pbmRldGVybWluYXRlICE9PSBwcmV2aW91c0luZGV0ZXJtaW5hdGVWYWx1ZSkge1xuICAgICAgdGhpcy5pbmRldGVybWluYXRlQ2hhbmdlZCgpO1xuICAgIH1cbiAgfVxuXG4gIHBhcmVudENoYW5nZWQoc2VsZWN0ZWQ6IGJvb2xlYW4pIHtcbiAgICBpZiAoc2VsZWN0ZWQgJiYgIXRoaXMuc2VsZWN0ZWQpIHtcbiAgICAgIHRoaXMuX3NlbGVjdGVkID0gdHJ1ZTtcbiAgICAgIHRoaXMuaW5kZXRlcm1pbmF0ZSA9IGZhbHNlO1xuICAgICAgdGhpcy5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IGNoaWxkLnBhcmVudENoYW5nZWQodHJ1ZSkpO1xuICAgICAgdGhpcy5zZWxlY3RlZENoYW5nZWQoKTtcbiAgICB9XG4gICAgaWYgKCFzZWxlY3RlZCAmJiAodGhpcy5zZWxlY3RlZCB8fCB0aGlzLmluZGV0ZXJtaW5hdGUpKSB7XG4gICAgICB0aGlzLl9zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5pbmRldGVybWluYXRlID0gZmFsc2U7XG4gICAgICB0aGlzLmNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4gY2hpbGQucGFyZW50Q2hhbmdlZChmYWxzZSkpO1xuICAgICAgdGhpcy5zZWxlY3RlZENoYW5nZWQoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==