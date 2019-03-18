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
import { isObservable } from 'rxjs';
import { TreeNodeModel } from './tree-node.model';
import { isPromise } from './async-array';
/*
 * A recursive model is built received from the app and traversed to create the corresponding components.
 * Recursive = Model dictates the tree node components
 */
/**
 * @template T
 */
var /*
 * A recursive model is built received from the app and traversed to create the corresponding components.
 * Recursive = Model dictates the tree node components
 */
/**
 * @template T
 */
RecursiveTreeNodeModel = /** @class */ (function (_super) {
    tslib_1.__extends(RecursiveTreeNodeModel, _super);
    function RecursiveTreeNodeModel(model, parent, getChildren) {
        var _this = _super.call(this) || this;
        _this.getChildren = getChildren;
        _this.childrenFetched = false;
        _this._children = [];
        _this.model = model;
        _this.parent = parent;
        return _this;
    }
    /**
     * @return {?}
     */
    RecursiveTreeNodeModel.prototype.clearChildren = /**
     * @return {?}
     */
    function () {
        this._children.forEach(function (child) { return child.destroy(); });
        delete this._children;
        this.childrenFetched = false;
    };
    /**
     * @return {?}
     */
    RecursiveTreeNodeModel.prototype.fetchChildren = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.childrenFetched) {
            return;
        }
        /** @type {?} */
        var asyncChildren = this.getChildren(this.model);
        if (isPromise(asyncChildren)) {
            this.loading = true;
            asyncChildren.then(function (raw) {
                _this._children = _this.wrapChildren(raw);
                _this.loading = false;
            });
        }
        else if (isObservable(asyncChildren)) {
            this.loading = true;
            this.subscription = asyncChildren.subscribe(function (raw) {
                _this._children = _this.wrapChildren(raw);
                _this.loading = false;
            });
        }
        else if (asyncChildren) {
            // Synchronous case
            this._children = this.wrapChildren(asyncChildren);
        }
        else {
            this._children = [];
        }
        this.childrenFetched = true;
    };
    /**
     * @param {?} rawModels
     * @return {?}
     */
    RecursiveTreeNodeModel.prototype.wrapChildren = /**
     * @param {?} rawModels
     * @return {?}
     */
    function (rawModels) {
        var _this = this;
        return rawModels.map(function (m) { return new RecursiveTreeNodeModel(m, _this, _this.getChildren); });
    };
    Object.defineProperty(RecursiveTreeNodeModel.prototype, "children", {
        get: /**
         * @return {?}
         */
        function () {
            this.fetchChildren();
            return this._children;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._children = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    RecursiveTreeNodeModel.prototype.destroy = /**
     * @return {?}
     */
    function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        _super.prototype.destroy.call(this);
    };
    return RecursiveTreeNodeModel;
}(TreeNodeModel));
/*
 * A recursive model is built received from the app and traversed to create the corresponding components.
 * Recursive = Model dictates the tree node components
 */
/**
 * @template T
 */
export { RecursiveTreeNodeModel };
if (false) {
    /** @type {?} */
    RecursiveTreeNodeModel.prototype.parent;
    /** @type {?} */
    RecursiveTreeNodeModel.prototype.childrenFetched;
    /** @type {?} */
    RecursiveTreeNodeModel.prototype._children;
    /** @type {?} */
    RecursiveTreeNodeModel.prototype.subscription;
    /** @type {?} */
    RecursiveTreeNodeModel.prototype.getChildren;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjdXJzaXZlLXRyZWUtbm9kZS5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvdHJlZS12aWV3L21vZGVscy9yZWN1cnNpdmUtdHJlZS1ub2RlLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFNQSxPQUFPLEVBQUUsWUFBWSxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUVsRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbEQsT0FBTyxFQUFjLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7QUFNdEQ7Ozs7Ozs7O0lBQStDLGtEQUFnQjtJQUM3RCxnQ0FDRSxLQUFRLEVBQ1IsTUFBd0MsRUFDaEMsV0FBbUQ7UUFIN0QsWUFLRSxpQkFBTyxTQUdSO1FBTFMsaUJBQVcsR0FBWCxXQUFXLENBQXdDO1FBU3JELHFCQUFlLEdBQUcsS0FBSyxDQUFDO1FBdUN4QixlQUFTLEdBQWdDLEVBQUUsQ0FBQztRQTdDbEQsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsS0FBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7O0lBQ3ZCLENBQUM7Ozs7SUFNRCw4Q0FBYTs7O0lBQWI7UUFDRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxPQUFPLEVBQUUsRUFBZixDQUFlLENBQUMsQ0FBQztRQUNqRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDdEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7SUFDL0IsQ0FBQzs7OztJQUVELDhDQUFhOzs7SUFBYjtRQUFBLGlCQXlCQztRQXhCQyxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDeEIsT0FBTztTQUNSOztZQUVLLGFBQWEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDbEQsSUFBSSxTQUFTLENBQUMsYUFBYSxDQUFDLEVBQUU7WUFDNUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDcEIsYUFBYSxDQUFDLElBQUksQ0FBQyxVQUFBLEdBQUc7Z0JBQ3BCLEtBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDeEMsS0FBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDdkIsQ0FBQyxDQUFDLENBQUM7U0FDSjthQUFNLElBQUksWUFBWSxDQUFDLGFBQWEsQ0FBQyxFQUFFO1lBQ3RDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQ3BCLElBQUksQ0FBQyxZQUFZLEdBQUcsYUFBYSxDQUFDLFNBQVMsQ0FBQyxVQUFBLEdBQUc7Z0JBQzdDLEtBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDeEMsS0FBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDdkIsQ0FBQyxDQUFDLENBQUM7U0FDSjthQUFNLElBQUksYUFBYSxFQUFFO1lBQ3hCLG1CQUFtQjtZQUNuQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDbkQ7YUFBTTtZQUNMLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1NBQ3JCO1FBQ0QsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7SUFDOUIsQ0FBQzs7Ozs7SUFFTyw2Q0FBWTs7OztJQUFwQixVQUFxQixTQUFjO1FBQW5DLGlCQUVDO1FBREMsT0FBTyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsSUFBSSxzQkFBc0IsQ0FBQyxDQUFDLEVBQUUsS0FBSSxFQUFFLEtBQUksQ0FBQyxXQUFXLENBQUMsRUFBckQsQ0FBcUQsQ0FBQyxDQUFDO0lBQ25GLENBQUM7SUFHRCxzQkFBSSw0Q0FBUTs7OztRQUFaO1lBQ0UsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ3JCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUN4QixDQUFDOzs7OztRQUNELFVBQWEsS0FBa0M7WUFDN0MsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDekIsQ0FBQzs7O09BSEE7Ozs7SUFPRCx3Q0FBTzs7O0lBQVA7UUFDRSxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDckIsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNqQztRQUNELGlCQUFNLE9BQU8sV0FBRSxDQUFDO0lBQ2xCLENBQUM7SUFDSCw2QkFBQztBQUFELENBQUMsQUFyRUQsQ0FBK0MsYUFBYSxHQXFFM0Q7Ozs7Ozs7Ozs7O0lBMURDLHdDQUF5Qzs7SUFFekMsaURBQWdDOztJQXVDaEMsMkNBQW9EOztJQVNwRCw4Q0FBbUM7O0lBekRqQyw2Q0FBMkQiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IGlzT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IFRyZWVOb2RlTW9kZWwgfSBmcm9tICcuL3RyZWUtbm9kZS5tb2RlbCc7XG5pbXBvcnQgeyBBc3luY0FycmF5LCBpc1Byb21pc2UgfSBmcm9tICcuL2FzeW5jLWFycmF5JztcblxuLypcbiAqIEEgcmVjdXJzaXZlIG1vZGVsIGlzIGJ1aWx0IHJlY2VpdmVkIGZyb20gdGhlIGFwcCBhbmQgdHJhdmVyc2VkIHRvIGNyZWF0ZSB0aGUgY29ycmVzcG9uZGluZyBjb21wb25lbnRzLlxuICogUmVjdXJzaXZlID0gTW9kZWwgZGljdGF0ZXMgdGhlIHRyZWUgbm9kZSBjb21wb25lbnRzXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWN1cnNpdmVUcmVlTm9kZU1vZGVsPFQ+IGV4dGVuZHMgVHJlZU5vZGVNb2RlbDxUPiB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIG1vZGVsOiBULFxuICAgIHBhcmVudDogUmVjdXJzaXZlVHJlZU5vZGVNb2RlbDxUPiB8IG51bGwsXG4gICAgcHJpdmF0ZSBnZXRDaGlsZHJlbjogKG5vZGU6IFQpID0+IEFzeW5jQXJyYXk8VD4gfCB1bmRlZmluZWRcbiAgKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLm1vZGVsID0gbW9kZWw7XG4gICAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG4gIH1cblxuICBwYXJlbnQ6IFJlY3Vyc2l2ZVRyZWVOb2RlTW9kZWw8VD4gfCBudWxsO1xuXG4gIHByaXZhdGUgY2hpbGRyZW5GZXRjaGVkID0gZmFsc2U7XG5cbiAgY2xlYXJDaGlsZHJlbigpIHtcbiAgICB0aGlzLl9jaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IGNoaWxkLmRlc3Ryb3koKSk7XG4gICAgZGVsZXRlIHRoaXMuX2NoaWxkcmVuO1xuICAgIHRoaXMuY2hpbGRyZW5GZXRjaGVkID0gZmFsc2U7XG4gIH1cblxuICBmZXRjaENoaWxkcmVuKCkge1xuICAgIGlmICh0aGlzLmNoaWxkcmVuRmV0Y2hlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGFzeW5jQ2hpbGRyZW4gPSB0aGlzLmdldENoaWxkcmVuKHRoaXMubW9kZWwpO1xuICAgIGlmIChpc1Byb21pc2UoYXN5bmNDaGlsZHJlbikpIHtcbiAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgICBhc3luY0NoaWxkcmVuLnRoZW4ocmF3ID0+IHtcbiAgICAgICAgdGhpcy5fY2hpbGRyZW4gPSB0aGlzLndyYXBDaGlsZHJlbihyYXcpO1xuICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoaXNPYnNlcnZhYmxlKGFzeW5jQ2hpbGRyZW4pKSB7XG4gICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb24gPSBhc3luY0NoaWxkcmVuLnN1YnNjcmliZShyYXcgPT4ge1xuICAgICAgICB0aGlzLl9jaGlsZHJlbiA9IHRoaXMud3JhcENoaWxkcmVuKHJhdyk7XG4gICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChhc3luY0NoaWxkcmVuKSB7XG4gICAgICAvLyBTeW5jaHJvbm91cyBjYXNlXG4gICAgICB0aGlzLl9jaGlsZHJlbiA9IHRoaXMud3JhcENoaWxkcmVuKGFzeW5jQ2hpbGRyZW4pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9jaGlsZHJlbiA9IFtdO1xuICAgIH1cbiAgICB0aGlzLmNoaWxkcmVuRmV0Y2hlZCA9IHRydWU7XG4gIH1cblxuICBwcml2YXRlIHdyYXBDaGlsZHJlbihyYXdNb2RlbHM6IFRbXSkge1xuICAgIHJldHVybiByYXdNb2RlbHMubWFwKG0gPT4gbmV3IFJlY3Vyc2l2ZVRyZWVOb2RlTW9kZWwobSwgdGhpcywgdGhpcy5nZXRDaGlsZHJlbikpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY2hpbGRyZW46IFJlY3Vyc2l2ZVRyZWVOb2RlTW9kZWw8VD5bXSA9IFtdO1xuICBnZXQgY2hpbGRyZW4oKTogUmVjdXJzaXZlVHJlZU5vZGVNb2RlbDxUPltdIHtcbiAgICB0aGlzLmZldGNoQ2hpbGRyZW4oKTtcbiAgICByZXR1cm4gdGhpcy5fY2hpbGRyZW47XG4gIH1cbiAgc2V0IGNoaWxkcmVuKHZhbHVlOiBSZWN1cnNpdmVUcmVlTm9kZU1vZGVsPFQ+W10pIHtcbiAgICB0aGlzLl9jaGlsZHJlbiA9IHZhbHVlO1xuICB9XG5cbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICBkZXN0cm95KCkge1xuICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgc3VwZXIuZGVzdHJveSgpO1xuICB9XG59XG4iXX0=