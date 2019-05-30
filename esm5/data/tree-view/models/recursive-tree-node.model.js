/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
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
    function RecursiveTreeNodeModel(model, parent, getChildren, featuresService) {
        var _this = _super.call(this) || this;
        _this.getChildren = getChildren;
        _this.featuresService = featuresService;
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
        this._children.forEach((/**
         * @param {?} child
         * @return {?}
         */
        function (child) { return child.destroy(); }));
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
            asyncChildren.then((/**
             * @param {?} raw
             * @return {?}
             */
            function (raw) {
                _this._children = _this.wrapChildren(raw);
                _this.loading = false;
            }));
        }
        else if (isObservable(asyncChildren)) {
            this.loading = true;
            this.subscription = asyncChildren.subscribe((/**
             * @param {?} raw
             * @return {?}
             */
            function (raw) {
                _this._children = _this.wrapChildren(raw);
                _this.loading = false;
            }));
        }
        else if (asyncChildren) {
            // Synchronous case
            this._children = this.wrapChildren(asyncChildren);
        }
        else {
            this._children = [];
        }
        this.childrenFetched = true;
        if (this.featuresService) {
            this.featuresService.childrenFetched.next();
        }
    };
    /**
     * @private
     * @param {?} rawModels
     * @return {?}
     */
    RecursiveTreeNodeModel.prototype.wrapChildren = /**
     * @private
     * @param {?} rawModels
     * @return {?}
     */
    function (rawModels) {
        var _this = this;
        return rawModels.map((/**
         * @param {?} m
         * @return {?}
         */
        function (m) { return new RecursiveTreeNodeModel(m, _this, _this.getChildren, _this.featuresService); }));
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
    /**
     * @type {?}
     * @private
     */
    RecursiveTreeNodeModel.prototype.childrenFetched;
    /**
     * @type {?}
     * @private
     */
    RecursiveTreeNodeModel.prototype._children;
    /**
     * @type {?}
     * @private
     */
    RecursiveTreeNodeModel.prototype.subscription;
    /**
     * @type {?}
     * @private
     */
    RecursiveTreeNodeModel.prototype.getChildren;
    /**
     * @type {?}
     * @private
     */
    RecursiveTreeNodeModel.prototype.featuresService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjdXJzaXZlLXRyZWUtbm9kZS5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvdHJlZS12aWV3L21vZGVscy9yZWN1cnNpdmUtdHJlZS1ub2RlLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFNQSxPQUFPLEVBQUUsWUFBWSxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUVsRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbEQsT0FBTyxFQUFjLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7QUFPdEQ7Ozs7Ozs7O0lBQStDLGtEQUFnQjtJQUM3RCxnQ0FDRSxLQUFRLEVBQ1IsTUFBd0MsRUFDaEMsV0FBbUQsRUFDbkQsZUFBbUQ7UUFKN0QsWUFNRSxpQkFBTyxTQUdSO1FBTlMsaUJBQVcsR0FBWCxXQUFXLENBQXdDO1FBQ25ELHFCQUFlLEdBQWYsZUFBZSxDQUFvQztRQVNyRCxxQkFBZSxHQUFHLEtBQUssQ0FBQztRQTBDeEIsZUFBUyxHQUFnQyxFQUFFLENBQUM7UUFoRGxELEtBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLEtBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDOztJQUN2QixDQUFDOzs7O0lBTUQsOENBQWE7OztJQUFiO1FBQ0UsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPOzs7O1FBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLENBQUMsT0FBTyxFQUFFLEVBQWYsQ0FBZSxFQUFDLENBQUM7UUFDakQsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO0lBQy9CLENBQUM7Ozs7SUFFRCw4Q0FBYTs7O0lBQWI7UUFBQSxpQkE0QkM7UUEzQkMsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3hCLE9BQU87U0FDUjs7WUFFSyxhQUFhLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ2xELElBQUksU0FBUyxDQUFDLGFBQWEsQ0FBQyxFQUFFO1lBQzVCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQ3BCLGFBQWEsQ0FBQyxJQUFJOzs7O1lBQUMsVUFBQSxHQUFHO2dCQUNwQixLQUFJLENBQUMsU0FBUyxHQUFHLEtBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3hDLEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3ZCLENBQUMsRUFBQyxDQUFDO1NBQ0o7YUFBTSxJQUFJLFlBQVksQ0FBQyxhQUFhLENBQUMsRUFBRTtZQUN0QyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztZQUNwQixJQUFJLENBQUMsWUFBWSxHQUFHLGFBQWEsQ0FBQyxTQUFTOzs7O1lBQUMsVUFBQSxHQUFHO2dCQUM3QyxLQUFJLENBQUMsU0FBUyxHQUFHLEtBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3hDLEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3ZCLENBQUMsRUFBQyxDQUFDO1NBQ0o7YUFBTSxJQUFJLGFBQWEsRUFBRTtZQUN4QixtQkFBbUI7WUFDbkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQ25EO2FBQU07WUFDTCxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztTQUNyQjtRQUNELElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBQzVCLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUN4QixJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUM3QztJQUNILENBQUM7Ozs7OztJQUVPLDZDQUFZOzs7OztJQUFwQixVQUFxQixTQUFjO1FBQW5DLGlCQUVDO1FBREMsT0FBTyxTQUFTLENBQUMsR0FBRzs7OztRQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsSUFBSSxzQkFBc0IsQ0FBQyxDQUFDLEVBQUUsS0FBSSxFQUFFLEtBQUksQ0FBQyxXQUFXLEVBQUUsS0FBSSxDQUFDLGVBQWUsQ0FBQyxFQUEzRSxDQUEyRSxFQUFDLENBQUM7SUFDekcsQ0FBQztJQUdELHNCQUFJLDRDQUFROzs7O1FBQVo7WUFDRSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDckIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ3hCLENBQUM7Ozs7O1FBQ0QsVUFBYSxLQUFrQztZQUM3QyxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN6QixDQUFDOzs7T0FIQTs7OztJQU9ELHdDQUFPOzs7SUFBUDtRQUNFLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNyQixJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ2pDO1FBQ0QsaUJBQU0sT0FBTyxXQUFFLENBQUM7SUFDbEIsQ0FBQztJQUNILDZCQUFDO0FBQUQsQ0FBQyxBQXpFRCxDQUErQyxhQUFhLEdBeUUzRDs7Ozs7Ozs7Ozs7SUE3REMsd0NBQXlDOzs7OztJQUV6QyxpREFBZ0M7Ozs7O0lBMENoQywyQ0FBb0Q7Ozs7O0lBU3BELDhDQUFtQzs7Ozs7SUE3RGpDLDZDQUEyRDs7Ozs7SUFDM0QsaURBQTJEIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBpc09ic2VydmFibGUsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBUcmVlTm9kZU1vZGVsIH0gZnJvbSAnLi90cmVlLW5vZGUubW9kZWwnO1xuaW1wb3J0IHsgQXN5bmNBcnJheSwgaXNQcm9taXNlIH0gZnJvbSAnLi9hc3luYy1hcnJheSc7XG5pbXBvcnQgeyBUcmVlRmVhdHVyZXNTZXJ2aWNlIH0gZnJvbSAnLi4vdHJlZS1mZWF0dXJlcy5zZXJ2aWNlJztcblxuLypcbiAqIEEgcmVjdXJzaXZlIG1vZGVsIGlzIGJ1aWx0IHJlY2VpdmVkIGZyb20gdGhlIGFwcCBhbmQgdHJhdmVyc2VkIHRvIGNyZWF0ZSB0aGUgY29ycmVzcG9uZGluZyBjb21wb25lbnRzLlxuICogUmVjdXJzaXZlID0gTW9kZWwgZGljdGF0ZXMgdGhlIHRyZWUgbm9kZSBjb21wb25lbnRzXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWN1cnNpdmVUcmVlTm9kZU1vZGVsPFQ+IGV4dGVuZHMgVHJlZU5vZGVNb2RlbDxUPiB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIG1vZGVsOiBULFxuICAgIHBhcmVudDogUmVjdXJzaXZlVHJlZU5vZGVNb2RlbDxUPiB8IG51bGwsXG4gICAgcHJpdmF0ZSBnZXRDaGlsZHJlbjogKG5vZGU6IFQpID0+IEFzeW5jQXJyYXk8VD4gfCB1bmRlZmluZWQsXG4gICAgcHJpdmF0ZSBmZWF0dXJlc1NlcnZpY2U6IFRyZWVGZWF0dXJlc1NlcnZpY2U8VD4gfCB1bmRlZmluZWRcbiAgKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLm1vZGVsID0gbW9kZWw7XG4gICAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG4gIH1cblxuICBwYXJlbnQ6IFJlY3Vyc2l2ZVRyZWVOb2RlTW9kZWw8VD4gfCBudWxsO1xuXG4gIHByaXZhdGUgY2hpbGRyZW5GZXRjaGVkID0gZmFsc2U7XG5cbiAgY2xlYXJDaGlsZHJlbigpIHtcbiAgICB0aGlzLl9jaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IGNoaWxkLmRlc3Ryb3koKSk7XG4gICAgZGVsZXRlIHRoaXMuX2NoaWxkcmVuO1xuICAgIHRoaXMuY2hpbGRyZW5GZXRjaGVkID0gZmFsc2U7XG4gIH1cblxuICBmZXRjaENoaWxkcmVuKCkge1xuICAgIGlmICh0aGlzLmNoaWxkcmVuRmV0Y2hlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGFzeW5jQ2hpbGRyZW4gPSB0aGlzLmdldENoaWxkcmVuKHRoaXMubW9kZWwpO1xuICAgIGlmIChpc1Byb21pc2UoYXN5bmNDaGlsZHJlbikpIHtcbiAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgICBhc3luY0NoaWxkcmVuLnRoZW4ocmF3ID0+IHtcbiAgICAgICAgdGhpcy5fY2hpbGRyZW4gPSB0aGlzLndyYXBDaGlsZHJlbihyYXcpO1xuICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoaXNPYnNlcnZhYmxlKGFzeW5jQ2hpbGRyZW4pKSB7XG4gICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb24gPSBhc3luY0NoaWxkcmVuLnN1YnNjcmliZShyYXcgPT4ge1xuICAgICAgICB0aGlzLl9jaGlsZHJlbiA9IHRoaXMud3JhcENoaWxkcmVuKHJhdyk7XG4gICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChhc3luY0NoaWxkcmVuKSB7XG4gICAgICAvLyBTeW5jaHJvbm91cyBjYXNlXG4gICAgICB0aGlzLl9jaGlsZHJlbiA9IHRoaXMud3JhcENoaWxkcmVuKGFzeW5jQ2hpbGRyZW4pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9jaGlsZHJlbiA9IFtdO1xuICAgIH1cbiAgICB0aGlzLmNoaWxkcmVuRmV0Y2hlZCA9IHRydWU7XG4gICAgaWYgKHRoaXMuZmVhdHVyZXNTZXJ2aWNlKSB7XG4gICAgICB0aGlzLmZlYXR1cmVzU2VydmljZS5jaGlsZHJlbkZldGNoZWQubmV4dCgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgd3JhcENoaWxkcmVuKHJhd01vZGVsczogVFtdKSB7XG4gICAgcmV0dXJuIHJhd01vZGVscy5tYXAobSA9PiBuZXcgUmVjdXJzaXZlVHJlZU5vZGVNb2RlbChtLCB0aGlzLCB0aGlzLmdldENoaWxkcmVuLCB0aGlzLmZlYXR1cmVzU2VydmljZSkpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY2hpbGRyZW46IFJlY3Vyc2l2ZVRyZWVOb2RlTW9kZWw8VD5bXSA9IFtdO1xuICBnZXQgY2hpbGRyZW4oKTogUmVjdXJzaXZlVHJlZU5vZGVNb2RlbDxUPltdIHtcbiAgICB0aGlzLmZldGNoQ2hpbGRyZW4oKTtcbiAgICByZXR1cm4gdGhpcy5fY2hpbGRyZW47XG4gIH1cbiAgc2V0IGNoaWxkcmVuKHZhbHVlOiBSZWN1cnNpdmVUcmVlTm9kZU1vZGVsPFQ+W10pIHtcbiAgICB0aGlzLl9jaGlsZHJlbiA9IHZhbHVlO1xuICB9XG5cbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICBkZXN0cm95KCkge1xuICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgc3VwZXIuZGVzdHJveSgpO1xuICB9XG59XG4iXX0=