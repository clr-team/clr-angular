/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
        this._children.forEach(child => child.destroy());
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
            asyncChildren.then(raw => {
                this._children = this.wrapChildren(raw);
                this.loading = false;
            });
        }
        else if (isObservable(asyncChildren)) {
            this.loading = true;
            this.subscription = asyncChildren.subscribe(raw => {
                this._children = this.wrapChildren(raw);
                this.loading = false;
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
    }
    /**
     * @param {?} rawModels
     * @return {?}
     */
    wrapChildren(rawModels) {
        return rawModels.map(m => new RecursiveTreeNodeModel(m, this, this.getChildren));
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
    /** @type {?} */
    RecursiveTreeNodeModel.prototype.childrenFetched;
    /** @type {?} */
    RecursiveTreeNodeModel.prototype._children;
    /** @type {?} */
    RecursiveTreeNodeModel.prototype.subscription;
    /** @type {?} */
    RecursiveTreeNodeModel.prototype.getChildren;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjdXJzaXZlLXRyZWUtbm9kZS5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvdHJlZS12aWV3L21vZGVscy9yZWN1cnNpdmUtdHJlZS1ub2RlLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQU1BLE9BQU8sRUFBRSxZQUFZLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBRWxELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNsRCxPQUFPLEVBQWMsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7Ozs7OztBQU10RCxNQUFNLE9BQU8sc0JBQTBCLFNBQVEsYUFBZ0I7Ozs7OztJQUM3RCxZQUNFLEtBQVEsRUFDUixNQUF3QyxFQUNoQyxXQUFtRDtRQUUzRCxLQUFLLEVBQUUsQ0FBQztRQUZBLGdCQUFXLEdBQVgsV0FBVyxDQUF3QztRQVNyRCxvQkFBZSxHQUFHLEtBQUssQ0FBQztRQXVDeEIsY0FBUyxHQUFnQyxFQUFFLENBQUM7UUE3Q2xELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7Ozs7SUFNRCxhQUFhO1FBQ1gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUNqRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDdEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7SUFDL0IsQ0FBQzs7OztJQUVELGFBQWE7UUFDWCxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDeEIsT0FBTztTQUNSOztjQUVLLGFBQWEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDbEQsSUFBSSxTQUFTLENBQUMsYUFBYSxDQUFDLEVBQUU7WUFDNUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDcEIsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN4QyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUN2QixDQUFDLENBQUMsQ0FBQztTQUNKO2FBQU0sSUFBSSxZQUFZLENBQUMsYUFBYSxDQUFDLEVBQUU7WUFDdEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDcEIsSUFBSSxDQUFDLFlBQVksR0FBRyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNoRCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3hDLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3ZCLENBQUMsQ0FBQyxDQUFDO1NBQ0o7YUFBTSxJQUFJLGFBQWEsRUFBRTtZQUN4QixtQkFBbUI7WUFDbkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQ25EO2FBQU07WUFDTCxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztTQUNyQjtRQUNELElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO0lBQzlCLENBQUM7Ozs7O0lBRU8sWUFBWSxDQUFDLFNBQWM7UUFDakMsT0FBTyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxzQkFBc0IsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBQ25GLENBQUM7Ozs7SUFHRCxJQUFJLFFBQVE7UUFDVixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDckIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7Ozs7O0lBQ0QsSUFBSSxRQUFRLENBQUMsS0FBa0M7UUFDN0MsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDekIsQ0FBQzs7OztJQUlELE9BQU87UUFDTCxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDckIsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNqQztRQUNELEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNsQixDQUFDO0NBQ0Y7OztJQTFEQyx3Q0FBeUM7O0lBRXpDLGlEQUFnQzs7SUF1Q2hDLDJDQUFvRDs7SUFTcEQsOENBQW1DOztJQXpEakMsNkNBQTJEIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBpc09ic2VydmFibGUsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBUcmVlTm9kZU1vZGVsIH0gZnJvbSAnLi90cmVlLW5vZGUubW9kZWwnO1xuaW1wb3J0IHsgQXN5bmNBcnJheSwgaXNQcm9taXNlIH0gZnJvbSAnLi9hc3luYy1hcnJheSc7XG5cbi8qXG4gKiBBIHJlY3Vyc2l2ZSBtb2RlbCBpcyBidWlsdCByZWNlaXZlZCBmcm9tIHRoZSBhcHAgYW5kIHRyYXZlcnNlZCB0byBjcmVhdGUgdGhlIGNvcnJlc3BvbmRpbmcgY29tcG9uZW50cy5cbiAqIFJlY3Vyc2l2ZSA9IE1vZGVsIGRpY3RhdGVzIHRoZSB0cmVlIG5vZGUgY29tcG9uZW50c1xuICovXG5leHBvcnQgY2xhc3MgUmVjdXJzaXZlVHJlZU5vZGVNb2RlbDxUPiBleHRlbmRzIFRyZWVOb2RlTW9kZWw8VD4ge1xuICBjb25zdHJ1Y3RvcihcbiAgICBtb2RlbDogVCxcbiAgICBwYXJlbnQ6IFJlY3Vyc2l2ZVRyZWVOb2RlTW9kZWw8VD4gfCBudWxsLFxuICAgIHByaXZhdGUgZ2V0Q2hpbGRyZW46IChub2RlOiBUKSA9PiBBc3luY0FycmF5PFQ+IHwgdW5kZWZpbmVkXG4gICkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xuICAgIHRoaXMucGFyZW50ID0gcGFyZW50O1xuICB9XG5cbiAgcGFyZW50OiBSZWN1cnNpdmVUcmVlTm9kZU1vZGVsPFQ+IHwgbnVsbDtcblxuICBwcml2YXRlIGNoaWxkcmVuRmV0Y2hlZCA9IGZhbHNlO1xuXG4gIGNsZWFyQ2hpbGRyZW4oKSB7XG4gICAgdGhpcy5fY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiBjaGlsZC5kZXN0cm95KCkpO1xuICAgIGRlbGV0ZSB0aGlzLl9jaGlsZHJlbjtcbiAgICB0aGlzLmNoaWxkcmVuRmV0Y2hlZCA9IGZhbHNlO1xuICB9XG5cbiAgZmV0Y2hDaGlsZHJlbigpIHtcbiAgICBpZiAodGhpcy5jaGlsZHJlbkZldGNoZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBhc3luY0NoaWxkcmVuID0gdGhpcy5nZXRDaGlsZHJlbih0aGlzLm1vZGVsKTtcbiAgICBpZiAoaXNQcm9taXNlKGFzeW5jQ2hpbGRyZW4pKSB7XG4gICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuICAgICAgYXN5bmNDaGlsZHJlbi50aGVuKHJhdyA9PiB7XG4gICAgICAgIHRoaXMuX2NoaWxkcmVuID0gdGhpcy53cmFwQ2hpbGRyZW4ocmF3KTtcbiAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKGlzT2JzZXJ2YWJsZShhc3luY0NoaWxkcmVuKSkge1xuICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gYXN5bmNDaGlsZHJlbi5zdWJzY3JpYmUocmF3ID0+IHtcbiAgICAgICAgdGhpcy5fY2hpbGRyZW4gPSB0aGlzLndyYXBDaGlsZHJlbihyYXcpO1xuICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoYXN5bmNDaGlsZHJlbikge1xuICAgICAgLy8gU3luY2hyb25vdXMgY2FzZVxuICAgICAgdGhpcy5fY2hpbGRyZW4gPSB0aGlzLndyYXBDaGlsZHJlbihhc3luY0NoaWxkcmVuKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fY2hpbGRyZW4gPSBbXTtcbiAgICB9XG4gICAgdGhpcy5jaGlsZHJlbkZldGNoZWQgPSB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSB3cmFwQ2hpbGRyZW4ocmF3TW9kZWxzOiBUW10pIHtcbiAgICByZXR1cm4gcmF3TW9kZWxzLm1hcChtID0+IG5ldyBSZWN1cnNpdmVUcmVlTm9kZU1vZGVsKG0sIHRoaXMsIHRoaXMuZ2V0Q2hpbGRyZW4pKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NoaWxkcmVuOiBSZWN1cnNpdmVUcmVlTm9kZU1vZGVsPFQ+W10gPSBbXTtcbiAgZ2V0IGNoaWxkcmVuKCk6IFJlY3Vyc2l2ZVRyZWVOb2RlTW9kZWw8VD5bXSB7XG4gICAgdGhpcy5mZXRjaENoaWxkcmVuKCk7XG4gICAgcmV0dXJuIHRoaXMuX2NoaWxkcmVuO1xuICB9XG4gIHNldCBjaGlsZHJlbih2YWx1ZTogUmVjdXJzaXZlVHJlZU5vZGVNb2RlbDxUPltdKSB7XG4gICAgdGhpcy5fY2hpbGRyZW4gPSB2YWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgZGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5zdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIHN1cGVyLmRlc3Ryb3koKTtcbiAgfVxufVxuIl19