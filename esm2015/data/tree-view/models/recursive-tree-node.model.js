/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export class RecursiveTreeNodeModel extends TreeNodeModel {
    /**
     * @param {?} model
     * @param {?} parent
     * @param {?} getChildren
     * @param {?} featuresService
     */
    constructor(model, parent, getChildren, featuresService) {
        super();
        this.getChildren = getChildren;
        this.featuresService = featuresService;
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
        if (this.featuresService) {
            this.featuresService.childrenFetched.next();
        }
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
        m => new RecursiveTreeNodeModel(m, this, this.getChildren, this.featuresService)));
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
    /**
     * @type {?}
     * @private
     */
    RecursiveTreeNodeModel.prototype.featuresService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjdXJzaXZlLXRyZWUtbm9kZS5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvdHJlZS12aWV3L21vZGVscy9yZWN1cnNpdmUtdHJlZS1ub2RlLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQU1BLE9BQU8sRUFBRSxZQUFZLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBRWxELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNsRCxPQUFPLEVBQWMsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7Ozs7OztBQU90RCxNQUFNLE9BQU8sc0JBQTBCLFNBQVEsYUFBZ0I7Ozs7Ozs7SUFDN0QsWUFDRSxLQUFRLEVBQ1IsTUFBd0MsRUFDaEMsV0FBbUQsRUFDbkQsZUFBbUQ7UUFFM0QsS0FBSyxFQUFFLENBQUM7UUFIQSxnQkFBVyxHQUFYLFdBQVcsQ0FBd0M7UUFDbkQsb0JBQWUsR0FBZixlQUFlLENBQW9DO1FBU3JELG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBMEN4QixjQUFTLEdBQWdDLEVBQUUsQ0FBQztRQWhEbEQsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDdkIsQ0FBQzs7OztJQU1ELGFBQWE7UUFDWCxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU87Ozs7UUFBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsRUFBQyxDQUFDO1FBQ2pELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUN0QixJQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztJQUMvQixDQUFDOzs7O0lBRUQsYUFBYTtRQUNYLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUN4QixPQUFPO1NBQ1I7O2NBRUssYUFBYSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNsRCxJQUFJLFNBQVMsQ0FBQyxhQUFhLENBQUMsRUFBRTtZQUM1QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztZQUNwQixhQUFhLENBQUMsSUFBSTs7OztZQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3hDLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3ZCLENBQUMsRUFBQyxDQUFDO1NBQ0o7YUFBTSxJQUFJLFlBQVksQ0FBQyxhQUFhLENBQUMsRUFBRTtZQUN0QyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztZQUNwQixJQUFJLENBQUMsWUFBWSxHQUFHLGFBQWEsQ0FBQyxTQUFTOzs7O1lBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ2hELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDeEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDdkIsQ0FBQyxFQUFDLENBQUM7U0FDSjthQUFNLElBQUksYUFBYSxFQUFFO1lBQ3hCLG1CQUFtQjtZQUNuQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDbkQ7YUFBTTtZQUNMLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1NBQ3JCO1FBQ0QsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDNUIsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQzdDO0lBQ0gsQ0FBQzs7Ozs7O0lBRU8sWUFBWSxDQUFDLFNBQWM7UUFDakMsT0FBTyxTQUFTLENBQUMsR0FBRzs7OztRQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxzQkFBc0IsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUFDLENBQUM7SUFDekcsQ0FBQzs7OztJQUdELElBQUksUUFBUTtRQUNWLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNyQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQzs7Ozs7SUFDRCxJQUFJLFFBQVEsQ0FBQyxLQUFrQztRQUM3QyxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztJQUN6QixDQUFDOzs7O0lBSUQsT0FBTztRQUNMLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNyQixJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ2pDO1FBQ0QsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2xCLENBQUM7Q0FDRjs7O0lBN0RDLHdDQUF5Qzs7Ozs7SUFFekMsaURBQWdDOzs7OztJQTBDaEMsMkNBQW9EOzs7OztJQVNwRCw4Q0FBbUM7Ozs7O0lBN0RqQyw2Q0FBMkQ7Ozs7O0lBQzNELGlEQUEyRCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgaXNPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgVHJlZU5vZGVNb2RlbCB9IGZyb20gJy4vdHJlZS1ub2RlLm1vZGVsJztcbmltcG9ydCB7IEFzeW5jQXJyYXksIGlzUHJvbWlzZSB9IGZyb20gJy4vYXN5bmMtYXJyYXknO1xuaW1wb3J0IHsgVHJlZUZlYXR1cmVzU2VydmljZSB9IGZyb20gJy4uL3RyZWUtZmVhdHVyZXMuc2VydmljZSc7XG5cbi8qXG4gKiBBIHJlY3Vyc2l2ZSBtb2RlbCBpcyBidWlsdCByZWNlaXZlZCBmcm9tIHRoZSBhcHAgYW5kIHRyYXZlcnNlZCB0byBjcmVhdGUgdGhlIGNvcnJlc3BvbmRpbmcgY29tcG9uZW50cy5cbiAqIFJlY3Vyc2l2ZSA9IE1vZGVsIGRpY3RhdGVzIHRoZSB0cmVlIG5vZGUgY29tcG9uZW50c1xuICovXG5leHBvcnQgY2xhc3MgUmVjdXJzaXZlVHJlZU5vZGVNb2RlbDxUPiBleHRlbmRzIFRyZWVOb2RlTW9kZWw8VD4ge1xuICBjb25zdHJ1Y3RvcihcbiAgICBtb2RlbDogVCxcbiAgICBwYXJlbnQ6IFJlY3Vyc2l2ZVRyZWVOb2RlTW9kZWw8VD4gfCBudWxsLFxuICAgIHByaXZhdGUgZ2V0Q2hpbGRyZW46IChub2RlOiBUKSA9PiBBc3luY0FycmF5PFQ+IHwgdW5kZWZpbmVkLFxuICAgIHByaXZhdGUgZmVhdHVyZXNTZXJ2aWNlOiBUcmVlRmVhdHVyZXNTZXJ2aWNlPFQ+IHwgdW5kZWZpbmVkXG4gICkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xuICAgIHRoaXMucGFyZW50ID0gcGFyZW50O1xuICB9XG5cbiAgcGFyZW50OiBSZWN1cnNpdmVUcmVlTm9kZU1vZGVsPFQ+IHwgbnVsbDtcblxuICBwcml2YXRlIGNoaWxkcmVuRmV0Y2hlZCA9IGZhbHNlO1xuXG4gIGNsZWFyQ2hpbGRyZW4oKSB7XG4gICAgdGhpcy5fY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiBjaGlsZC5kZXN0cm95KCkpO1xuICAgIGRlbGV0ZSB0aGlzLl9jaGlsZHJlbjtcbiAgICB0aGlzLmNoaWxkcmVuRmV0Y2hlZCA9IGZhbHNlO1xuICB9XG5cbiAgZmV0Y2hDaGlsZHJlbigpIHtcbiAgICBpZiAodGhpcy5jaGlsZHJlbkZldGNoZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBhc3luY0NoaWxkcmVuID0gdGhpcy5nZXRDaGlsZHJlbih0aGlzLm1vZGVsKTtcbiAgICBpZiAoaXNQcm9taXNlKGFzeW5jQ2hpbGRyZW4pKSB7XG4gICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuICAgICAgYXN5bmNDaGlsZHJlbi50aGVuKHJhdyA9PiB7XG4gICAgICAgIHRoaXMuX2NoaWxkcmVuID0gdGhpcy53cmFwQ2hpbGRyZW4ocmF3KTtcbiAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKGlzT2JzZXJ2YWJsZShhc3luY0NoaWxkcmVuKSkge1xuICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gYXN5bmNDaGlsZHJlbi5zdWJzY3JpYmUocmF3ID0+IHtcbiAgICAgICAgdGhpcy5fY2hpbGRyZW4gPSB0aGlzLndyYXBDaGlsZHJlbihyYXcpO1xuICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoYXN5bmNDaGlsZHJlbikge1xuICAgICAgLy8gU3luY2hyb25vdXMgY2FzZVxuICAgICAgdGhpcy5fY2hpbGRyZW4gPSB0aGlzLndyYXBDaGlsZHJlbihhc3luY0NoaWxkcmVuKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fY2hpbGRyZW4gPSBbXTtcbiAgICB9XG4gICAgdGhpcy5jaGlsZHJlbkZldGNoZWQgPSB0cnVlO1xuICAgIGlmICh0aGlzLmZlYXR1cmVzU2VydmljZSkge1xuICAgICAgdGhpcy5mZWF0dXJlc1NlcnZpY2UuY2hpbGRyZW5GZXRjaGVkLm5leHQoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHdyYXBDaGlsZHJlbihyYXdNb2RlbHM6IFRbXSkge1xuICAgIHJldHVybiByYXdNb2RlbHMubWFwKG0gPT4gbmV3IFJlY3Vyc2l2ZVRyZWVOb2RlTW9kZWwobSwgdGhpcywgdGhpcy5nZXRDaGlsZHJlbiwgdGhpcy5mZWF0dXJlc1NlcnZpY2UpKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NoaWxkcmVuOiBSZWN1cnNpdmVUcmVlTm9kZU1vZGVsPFQ+W10gPSBbXTtcbiAgZ2V0IGNoaWxkcmVuKCk6IFJlY3Vyc2l2ZVRyZWVOb2RlTW9kZWw8VD5bXSB7XG4gICAgdGhpcy5mZXRjaENoaWxkcmVuKCk7XG4gICAgcmV0dXJuIHRoaXMuX2NoaWxkcmVuO1xuICB9XG4gIHNldCBjaGlsZHJlbih2YWx1ZTogUmVjdXJzaXZlVHJlZU5vZGVNb2RlbDxUPltdKSB7XG4gICAgdGhpcy5fY2hpbGRyZW4gPSB2YWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgZGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5zdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIHN1cGVyLmRlc3Ryb3koKTtcbiAgfVxufVxuIl19