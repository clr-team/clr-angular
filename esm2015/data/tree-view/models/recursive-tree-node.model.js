/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export class RecursiveTreeNodeModel extends TreeNodeModel {
    /**
     * @param {?} model
     * @param {?} parent
     * @param {?} getChildren
     */
    constructor(model, parent, getChildren) {
        super();
        this.getChildren = getChildren;
        this.childrenFetched = false;
        this._children = [];
        this.model = model;
        this.parent = parent;
    }
    /**
     * @return {?}
     */
    clearChildren() {
        this._children.forEach((/**
         * @param {?} child
         * @return {?}
         */
        child => child.destroy()));
        delete this._children;
        this.childrenFetched = false;
    }
    /**
     * @return {?}
     */
    fetchChildren() {
        if (this.childrenFetched) {
            return;
        }
        /** @type {?} */
        const asyncChildren = this.getChildren(this.model);
        if (isPromise(asyncChildren)) {
            this.loading = true;
            asyncChildren.then((/**
             * @param {?} raw
             * @return {?}
             */
            raw => {
                this._children = this.wrapChildren(raw);
                this.loading = false;
            }));
        }
        else if (isObservable(asyncChildren)) {
            this.loading = true;
            this.subscription = asyncChildren.subscribe((/**
             * @param {?} raw
             * @return {?}
             */
            raw => {
                this._children = this.wrapChildren(raw);
                this.loading = false;
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
    }
    /**
     * @private
     * @param {?} rawModels
     * @return {?}
     */
    wrapChildren(rawModels) {
        return rawModels.map((/**
         * @param {?} m
         * @return {?}
         */
        m => new RecursiveTreeNodeModel(m, this, this.getChildren)));
    }
    /**
     * @return {?}
     */
    get children() {
        this.fetchChildren();
        return this._children;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set children(value) {
        this._children = value;
    }
    /**
     * @return {?}
     */
    destroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        super.destroy();
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjdXJzaXZlLXRyZWUtbm9kZS5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvdHJlZS12aWV3L21vZGVscy9yZWN1cnNpdmUtdHJlZS1ub2RlLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQU1BLE9BQU8sRUFBRSxZQUFZLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBRWxELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNsRCxPQUFPLEVBQWMsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7Ozs7OztBQU10RCxNQUFNLE9BQU8sc0JBQTBCLFNBQVEsYUFBZ0I7Ozs7OztJQUM3RCxZQUNFLEtBQVEsRUFDUixNQUF3QyxFQUNoQyxXQUFtRDtRQUUzRCxLQUFLLEVBQUUsQ0FBQztRQUZBLGdCQUFXLEdBQVgsV0FBVyxDQUF3QztRQVNyRCxvQkFBZSxHQUFHLEtBQUssQ0FBQztRQXVDeEIsY0FBUyxHQUFnQyxFQUFFLENBQUM7UUE3Q2xELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7Ozs7SUFNRCxhQUFhO1FBQ1gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPOzs7O1FBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEVBQUMsQ0FBQztRQUNqRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDdEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7SUFDL0IsQ0FBQzs7OztJQUVELGFBQWE7UUFDWCxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDeEIsT0FBTztTQUNSOztjQUVLLGFBQWEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDbEQsSUFBSSxTQUFTLENBQUMsYUFBYSxDQUFDLEVBQUU7WUFDNUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDcEIsYUFBYSxDQUFDLElBQUk7Ozs7WUFBQyxHQUFHLENBQUMsRUFBRTtnQkFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN4QyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUN2QixDQUFDLEVBQUMsQ0FBQztTQUNKO2FBQU0sSUFBSSxZQUFZLENBQUMsYUFBYSxDQUFDLEVBQUU7WUFDdEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDcEIsSUFBSSxDQUFDLFlBQVksR0FBRyxhQUFhLENBQUMsU0FBUzs7OztZQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNoRCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3hDLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3ZCLENBQUMsRUFBQyxDQUFDO1NBQ0o7YUFBTSxJQUFJLGFBQWEsRUFBRTtZQUN4QixtQkFBbUI7WUFDbkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQ25EO2FBQU07WUFDTCxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztTQUNyQjtRQUNELElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO0lBQzlCLENBQUM7Ozs7OztJQUVPLFlBQVksQ0FBQyxTQUFjO1FBQ2pDLE9BQU8sU0FBUyxDQUFDLEdBQUc7Ozs7UUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksc0JBQXNCLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUMsQ0FBQztJQUNuRixDQUFDOzs7O0lBR0QsSUFBSSxRQUFRO1FBQ1YsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDOzs7OztJQUNELElBQUksUUFBUSxDQUFDLEtBQWtDO1FBQzdDLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO0lBQ3pCLENBQUM7Ozs7SUFJRCxPQUFPO1FBQ0wsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDakM7UUFDRCxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDbEIsQ0FBQztDQUNGOzs7SUExREMsd0NBQXlDOzs7OztJQUV6QyxpREFBZ0M7Ozs7O0lBdUNoQywyQ0FBb0Q7Ozs7O0lBU3BELDhDQUFtQzs7Ozs7SUF6RGpDLDZDQUEyRCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgaXNPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgVHJlZU5vZGVNb2RlbCB9IGZyb20gJy4vdHJlZS1ub2RlLm1vZGVsJztcbmltcG9ydCB7IEFzeW5jQXJyYXksIGlzUHJvbWlzZSB9IGZyb20gJy4vYXN5bmMtYXJyYXknO1xuXG4vKlxuICogQSByZWN1cnNpdmUgbW9kZWwgaXMgYnVpbHQgcmVjZWl2ZWQgZnJvbSB0aGUgYXBwIGFuZCB0cmF2ZXJzZWQgdG8gY3JlYXRlIHRoZSBjb3JyZXNwb25kaW5nIGNvbXBvbmVudHMuXG4gKiBSZWN1cnNpdmUgPSBNb2RlbCBkaWN0YXRlcyB0aGUgdHJlZSBub2RlIGNvbXBvbmVudHNcbiAqL1xuZXhwb3J0IGNsYXNzIFJlY3Vyc2l2ZVRyZWVOb2RlTW9kZWw8VD4gZXh0ZW5kcyBUcmVlTm9kZU1vZGVsPFQ+IHtcbiAgY29uc3RydWN0b3IoXG4gICAgbW9kZWw6IFQsXG4gICAgcGFyZW50OiBSZWN1cnNpdmVUcmVlTm9kZU1vZGVsPFQ+IHwgbnVsbCxcbiAgICBwcml2YXRlIGdldENoaWxkcmVuOiAobm9kZTogVCkgPT4gQXN5bmNBcnJheTxUPiB8IHVuZGVmaW5lZFxuICApIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcbiAgICB0aGlzLnBhcmVudCA9IHBhcmVudDtcbiAgfVxuXG4gIHBhcmVudDogUmVjdXJzaXZlVHJlZU5vZGVNb2RlbDxUPiB8IG51bGw7XG5cbiAgcHJpdmF0ZSBjaGlsZHJlbkZldGNoZWQgPSBmYWxzZTtcblxuICBjbGVhckNoaWxkcmVuKCkge1xuICAgIHRoaXMuX2NoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4gY2hpbGQuZGVzdHJveSgpKTtcbiAgICBkZWxldGUgdGhpcy5fY2hpbGRyZW47XG4gICAgdGhpcy5jaGlsZHJlbkZldGNoZWQgPSBmYWxzZTtcbiAgfVxuXG4gIGZldGNoQ2hpbGRyZW4oKSB7XG4gICAgaWYgKHRoaXMuY2hpbGRyZW5GZXRjaGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgYXN5bmNDaGlsZHJlbiA9IHRoaXMuZ2V0Q2hpbGRyZW4odGhpcy5tb2RlbCk7XG4gICAgaWYgKGlzUHJvbWlzZShhc3luY0NoaWxkcmVuKSkge1xuICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcbiAgICAgIGFzeW5jQ2hpbGRyZW4udGhlbihyYXcgPT4ge1xuICAgICAgICB0aGlzLl9jaGlsZHJlbiA9IHRoaXMud3JhcENoaWxkcmVuKHJhdyk7XG4gICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChpc09ic2VydmFibGUoYXN5bmNDaGlsZHJlbikpIHtcbiAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IGFzeW5jQ2hpbGRyZW4uc3Vic2NyaWJlKHJhdyA9PiB7XG4gICAgICAgIHRoaXMuX2NoaWxkcmVuID0gdGhpcy53cmFwQ2hpbGRyZW4ocmF3KTtcbiAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKGFzeW5jQ2hpbGRyZW4pIHtcbiAgICAgIC8vIFN5bmNocm9ub3VzIGNhc2VcbiAgICAgIHRoaXMuX2NoaWxkcmVuID0gdGhpcy53cmFwQ2hpbGRyZW4oYXN5bmNDaGlsZHJlbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2NoaWxkcmVuID0gW107XG4gICAgfVxuICAgIHRoaXMuY2hpbGRyZW5GZXRjaGVkID0gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgd3JhcENoaWxkcmVuKHJhd01vZGVsczogVFtdKSB7XG4gICAgcmV0dXJuIHJhd01vZGVscy5tYXAobSA9PiBuZXcgUmVjdXJzaXZlVHJlZU5vZGVNb2RlbChtLCB0aGlzLCB0aGlzLmdldENoaWxkcmVuKSk7XG4gIH1cblxuICBwcml2YXRlIF9jaGlsZHJlbjogUmVjdXJzaXZlVHJlZU5vZGVNb2RlbDxUPltdID0gW107XG4gIGdldCBjaGlsZHJlbigpOiBSZWN1cnNpdmVUcmVlTm9kZU1vZGVsPFQ+W10ge1xuICAgIHRoaXMuZmV0Y2hDaGlsZHJlbigpO1xuICAgIHJldHVybiB0aGlzLl9jaGlsZHJlbjtcbiAgfVxuICBzZXQgY2hpbGRyZW4odmFsdWU6IFJlY3Vyc2l2ZVRyZWVOb2RlTW9kZWw8VD5bXSkge1xuICAgIHRoaXMuX2NoaWxkcmVuID0gdmFsdWU7XG4gIH1cblxuICBwcml2YXRlIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIGRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICBzdXBlci5kZXN0cm95KCk7XG4gIH1cbn1cbiJdfQ==