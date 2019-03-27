/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        function (m) { return new RecursiveTreeNodeModel(m, _this, _this.getChildren); }));
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjdXJzaXZlLXRyZWUtbm9kZS5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvdHJlZS12aWV3L21vZGVscy9yZWN1cnNpdmUtdHJlZS1ub2RlLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFNQSxPQUFPLEVBQUUsWUFBWSxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUVsRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbEQsT0FBTyxFQUFjLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7QUFNdEQ7Ozs7Ozs7O0lBQStDLGtEQUFnQjtJQUM3RCxnQ0FDRSxLQUFRLEVBQ1IsTUFBd0MsRUFDaEMsV0FBbUQ7UUFIN0QsWUFLRSxpQkFBTyxTQUdSO1FBTFMsaUJBQVcsR0FBWCxXQUFXLENBQXdDO1FBU3JELHFCQUFlLEdBQUcsS0FBSyxDQUFDO1FBdUN4QixlQUFTLEdBQWdDLEVBQUUsQ0FBQztRQTdDbEQsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsS0FBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7O0lBQ3ZCLENBQUM7Ozs7SUFNRCw4Q0FBYTs7O0lBQWI7UUFDRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU87Ozs7UUFBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxPQUFPLEVBQUUsRUFBZixDQUFlLEVBQUMsQ0FBQztRQUNqRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDdEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7SUFDL0IsQ0FBQzs7OztJQUVELDhDQUFhOzs7SUFBYjtRQUFBLGlCQXlCQztRQXhCQyxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDeEIsT0FBTztTQUNSOztZQUVLLGFBQWEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDbEQsSUFBSSxTQUFTLENBQUMsYUFBYSxDQUFDLEVBQUU7WUFDNUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDcEIsYUFBYSxDQUFDLElBQUk7Ozs7WUFBQyxVQUFBLEdBQUc7Z0JBQ3BCLEtBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDeEMsS0FBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDdkIsQ0FBQyxFQUFDLENBQUM7U0FDSjthQUFNLElBQUksWUFBWSxDQUFDLGFBQWEsQ0FBQyxFQUFFO1lBQ3RDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQ3BCLElBQUksQ0FBQyxZQUFZLEdBQUcsYUFBYSxDQUFDLFNBQVM7Ozs7WUFBQyxVQUFBLEdBQUc7Z0JBQzdDLEtBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDeEMsS0FBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDdkIsQ0FBQyxFQUFDLENBQUM7U0FDSjthQUFNLElBQUksYUFBYSxFQUFFO1lBQ3hCLG1CQUFtQjtZQUNuQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDbkQ7YUFBTTtZQUNMLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1NBQ3JCO1FBQ0QsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7SUFDOUIsQ0FBQzs7Ozs7O0lBRU8sNkNBQVk7Ozs7O0lBQXBCLFVBQXFCLFNBQWM7UUFBbkMsaUJBRUM7UUFEQyxPQUFPLFNBQVMsQ0FBQyxHQUFHOzs7O1FBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxJQUFJLHNCQUFzQixDQUFDLENBQUMsRUFBRSxLQUFJLEVBQUUsS0FBSSxDQUFDLFdBQVcsQ0FBQyxFQUFyRCxDQUFxRCxFQUFDLENBQUM7SUFDbkYsQ0FBQztJQUdELHNCQUFJLDRDQUFROzs7O1FBQVo7WUFDRSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDckIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ3hCLENBQUM7Ozs7O1FBQ0QsVUFBYSxLQUFrQztZQUM3QyxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN6QixDQUFDOzs7T0FIQTs7OztJQU9ELHdDQUFPOzs7SUFBUDtRQUNFLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNyQixJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ2pDO1FBQ0QsaUJBQU0sT0FBTyxXQUFFLENBQUM7SUFDbEIsQ0FBQztJQUNILDZCQUFDO0FBQUQsQ0FBQyxBQXJFRCxDQUErQyxhQUFhLEdBcUUzRDs7Ozs7Ozs7Ozs7SUExREMsd0NBQXlDOzs7OztJQUV6QyxpREFBZ0M7Ozs7O0lBdUNoQywyQ0FBb0Q7Ozs7O0lBU3BELDhDQUFtQzs7Ozs7SUF6RGpDLDZDQUEyRCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgaXNPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgVHJlZU5vZGVNb2RlbCB9IGZyb20gJy4vdHJlZS1ub2RlLm1vZGVsJztcbmltcG9ydCB7IEFzeW5jQXJyYXksIGlzUHJvbWlzZSB9IGZyb20gJy4vYXN5bmMtYXJyYXknO1xuXG4vKlxuICogQSByZWN1cnNpdmUgbW9kZWwgaXMgYnVpbHQgcmVjZWl2ZWQgZnJvbSB0aGUgYXBwIGFuZCB0cmF2ZXJzZWQgdG8gY3JlYXRlIHRoZSBjb3JyZXNwb25kaW5nIGNvbXBvbmVudHMuXG4gKiBSZWN1cnNpdmUgPSBNb2RlbCBkaWN0YXRlcyB0aGUgdHJlZSBub2RlIGNvbXBvbmVudHNcbiAqL1xuZXhwb3J0IGNsYXNzIFJlY3Vyc2l2ZVRyZWVOb2RlTW9kZWw8VD4gZXh0ZW5kcyBUcmVlTm9kZU1vZGVsPFQ+IHtcbiAgY29uc3RydWN0b3IoXG4gICAgbW9kZWw6IFQsXG4gICAgcGFyZW50OiBSZWN1cnNpdmVUcmVlTm9kZU1vZGVsPFQ+IHwgbnVsbCxcbiAgICBwcml2YXRlIGdldENoaWxkcmVuOiAobm9kZTogVCkgPT4gQXN5bmNBcnJheTxUPiB8IHVuZGVmaW5lZFxuICApIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcbiAgICB0aGlzLnBhcmVudCA9IHBhcmVudDtcbiAgfVxuXG4gIHBhcmVudDogUmVjdXJzaXZlVHJlZU5vZGVNb2RlbDxUPiB8IG51bGw7XG5cbiAgcHJpdmF0ZSBjaGlsZHJlbkZldGNoZWQgPSBmYWxzZTtcblxuICBjbGVhckNoaWxkcmVuKCkge1xuICAgIHRoaXMuX2NoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4gY2hpbGQuZGVzdHJveSgpKTtcbiAgICBkZWxldGUgdGhpcy5fY2hpbGRyZW47XG4gICAgdGhpcy5jaGlsZHJlbkZldGNoZWQgPSBmYWxzZTtcbiAgfVxuXG4gIGZldGNoQ2hpbGRyZW4oKSB7XG4gICAgaWYgKHRoaXMuY2hpbGRyZW5GZXRjaGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgYXN5bmNDaGlsZHJlbiA9IHRoaXMuZ2V0Q2hpbGRyZW4odGhpcy5tb2RlbCk7XG4gICAgaWYgKGlzUHJvbWlzZShhc3luY0NoaWxkcmVuKSkge1xuICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcbiAgICAgIGFzeW5jQ2hpbGRyZW4udGhlbihyYXcgPT4ge1xuICAgICAgICB0aGlzLl9jaGlsZHJlbiA9IHRoaXMud3JhcENoaWxkcmVuKHJhdyk7XG4gICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChpc09ic2VydmFibGUoYXN5bmNDaGlsZHJlbikpIHtcbiAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IGFzeW5jQ2hpbGRyZW4uc3Vic2NyaWJlKHJhdyA9PiB7XG4gICAgICAgIHRoaXMuX2NoaWxkcmVuID0gdGhpcy53cmFwQ2hpbGRyZW4ocmF3KTtcbiAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKGFzeW5jQ2hpbGRyZW4pIHtcbiAgICAgIC8vIFN5bmNocm9ub3VzIGNhc2VcbiAgICAgIHRoaXMuX2NoaWxkcmVuID0gdGhpcy53cmFwQ2hpbGRyZW4oYXN5bmNDaGlsZHJlbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2NoaWxkcmVuID0gW107XG4gICAgfVxuICAgIHRoaXMuY2hpbGRyZW5GZXRjaGVkID0gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgd3JhcENoaWxkcmVuKHJhd01vZGVsczogVFtdKSB7XG4gICAgcmV0dXJuIHJhd01vZGVscy5tYXAobSA9PiBuZXcgUmVjdXJzaXZlVHJlZU5vZGVNb2RlbChtLCB0aGlzLCB0aGlzLmdldENoaWxkcmVuKSk7XG4gIH1cblxuICBwcml2YXRlIF9jaGlsZHJlbjogUmVjdXJzaXZlVHJlZU5vZGVNb2RlbDxUPltdID0gW107XG4gIGdldCBjaGlsZHJlbigpOiBSZWN1cnNpdmVUcmVlTm9kZU1vZGVsPFQ+W10ge1xuICAgIHRoaXMuZmV0Y2hDaGlsZHJlbigpO1xuICAgIHJldHVybiB0aGlzLl9jaGlsZHJlbjtcbiAgfVxuICBzZXQgY2hpbGRyZW4odmFsdWU6IFJlY3Vyc2l2ZVRyZWVOb2RlTW9kZWw8VD5bXSkge1xuICAgIHRoaXMuX2NoaWxkcmVuID0gdmFsdWU7XG4gIH1cblxuICBwcml2YXRlIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIGRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICBzdXBlci5kZXN0cm95KCk7XG4gIH1cbn1cbiJdfQ==