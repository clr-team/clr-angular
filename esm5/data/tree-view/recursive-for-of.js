/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { ChangeDetectorRef, Directive, Input, TemplateRef } from '@angular/core';
import { TreeFeaturesService } from './tree-features.service';
import { RecursiveTreeNodeModel } from './models/recursive-tree-node.model';
/**
 * @record
 * @template T
 */
export function ClrRecursiveForOfContext() { }
if (false) {
    /** @type {?} */
    ClrRecursiveForOfContext.prototype.$implicit;
    /** @type {?} */
    ClrRecursiveForOfContext.prototype.clrModel;
}
/**
 * @template T
 */
var ClrRecursiveForOf = /** @class */ (function () {
    function ClrRecursiveForOf(template, featuresService, cdr) {
        this.template = template;
        this.featuresService = featuresService;
        this.cdr = cdr;
    }
    // I'm using OnChanges instead of OnInit to easily keep up to date with dynamic trees. Maybe optimizable later.
    // I'm using OnChanges instead of OnInit to easily keep up to date with dynamic trees. Maybe optimizable later.
    /**
     * @return {?}
     */
    ClrRecursiveForOf.prototype.ngOnChanges = 
    // I'm using OnChanges instead of OnInit to easily keep up to date with dynamic trees. Maybe optimizable later.
    /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var wrapped;
        if (Array.isArray(this.nodes)) {
            wrapped = this.nodes.map((/**
             * @param {?} node
             * @return {?}
             */
            function (node) { return new RecursiveTreeNodeModel(node, null, _this.getChildren, _this.featuresService); }));
        }
        else {
            wrapped = [new RecursiveTreeNodeModel(this.nodes, null, this.getChildren, this.featuresService)];
        }
        if (!this.childrenFetchSubscription) {
            this.childrenFetchSubscription = this.featuresService.childrenFetched.subscribe((/**
             * @return {?}
             */
            function () {
                _this.cdr.detectChanges();
            }));
        }
        this.featuresService.recursion = {
            template: this.template,
            root: wrapped,
        };
    };
    /**
     * @return {?}
     */
    ClrRecursiveForOf.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.childrenFetchSubscription) {
            this.childrenFetchSubscription.unsubscribe();
        }
    };
    ClrRecursiveForOf.decorators = [
        { type: Directive, args: [{ selector: '[clrRecursiveFor][clrRecursiveForOf]' },] }
    ];
    /** @nocollapse */
    ClrRecursiveForOf.ctorParameters = function () { return [
        { type: TemplateRef },
        { type: TreeFeaturesService },
        { type: ChangeDetectorRef }
    ]; };
    ClrRecursiveForOf.propDecorators = {
        nodes: [{ type: Input, args: ['clrRecursiveForOf',] }],
        getChildren: [{ type: Input, args: ['clrRecursiveForGetChildren',] }]
    };
    return ClrRecursiveForOf;
}());
export { ClrRecursiveForOf };
if (false) {
    /** @type {?} */
    ClrRecursiveForOf.prototype.nodes;
    /** @type {?} */
    ClrRecursiveForOf.prototype.getChildren;
    /**
     * @type {?}
     * @private
     */
    ClrRecursiveForOf.prototype.childrenFetchSubscription;
    /**
     * @type {?}
     * @private
     */
    ClrRecursiveForOf.prototype.template;
    /**
     * @type {?}
     * @private
     */
    ClrRecursiveForOf.prototype.featuresService;
    /**
     * @type {?}
     * @private
     */
    ClrRecursiveForOf.prototype.cdr;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjdXJzaXZlLWZvci1vZi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvdHJlZS12aWV3L3JlY3Vyc2l2ZS1mb3Itb2YudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBTUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQXdCLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQzs7Ozs7QUFLNUUsOENBR0M7OztJQUZDLDZDQUFhOztJQUNiLDRDQUEyQjs7Ozs7QUFHN0I7SUFFRSwyQkFDVSxRQUFrRCxFQUNsRCxlQUF1QyxFQUN2QyxHQUFzQjtRQUZ0QixhQUFRLEdBQVIsUUFBUSxDQUEwQztRQUNsRCxvQkFBZSxHQUFmLGVBQWUsQ0FBd0I7UUFDdkMsUUFBRyxHQUFILEdBQUcsQ0FBbUI7SUFDN0IsQ0FBQztJQVVKLCtHQUErRzs7Ozs7SUFDL0csdUNBQVc7Ozs7O0lBQVg7UUFBQSxpQkFpQkM7O1lBaEJLLE9BQW9DO1FBQ3hDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDN0IsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRzs7OztZQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxzQkFBc0IsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUksQ0FBQyxXQUFXLEVBQUUsS0FBSSxDQUFDLGVBQWUsQ0FBQyxFQUE5RSxDQUE4RSxFQUFDLENBQUM7U0FDbEg7YUFBTTtZQUNMLE9BQU8sR0FBRyxDQUFDLElBQUksc0JBQXNCLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztTQUNsRztRQUNELElBQUksQ0FBQyxJQUFJLENBQUMseUJBQXlCLEVBQUU7WUFDbkMsSUFBSSxDQUFDLHlCQUF5QixHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxDQUFDLFNBQVM7OztZQUFDO2dCQUM5RSxLQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQzNCLENBQUMsRUFBQyxDQUFDO1NBQ0o7UUFFRCxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsR0FBRztZQUMvQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsSUFBSSxFQUFFLE9BQU87U0FDZCxDQUFDO0lBQ0osQ0FBQzs7OztJQUVELHVDQUFXOzs7SUFBWDtRQUNFLElBQUksSUFBSSxDQUFDLHlCQUF5QixFQUFFO1lBQ2xDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUM5QztJQUNILENBQUM7O2dCQXhDRixTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsc0NBQXNDLEVBQUU7Ozs7Z0JBWkssV0FBVztnQkFDdEUsbUJBQW1CO2dCQURuQixpQkFBaUI7Ozt3QkFxQnZCLEtBQUssU0FBQyxtQkFBbUI7OEJBR3pCLEtBQUssU0FBQyw0QkFBNEI7O0lBNkJyQyx3QkFBQztDQUFBLEFBekNELElBeUNDO1NBeENZLGlCQUFpQjs7O0lBUTVCLGtDQUEyQzs7SUFHM0Msd0NBQTZFOzs7OztJQUU3RSxzREFBZ0Q7Ozs7O0lBWDlDLHFDQUEwRDs7Ozs7SUFDMUQsNENBQStDOzs7OztJQUMvQyxnQ0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBEaXJlY3RpdmUsIElucHV0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRyZWVGZWF0dXJlc1NlcnZpY2UgfSBmcm9tICcuL3RyZWUtZmVhdHVyZXMuc2VydmljZSc7XG5pbXBvcnQgeyBSZWN1cnNpdmVUcmVlTm9kZU1vZGVsIH0gZnJvbSAnLi9tb2RlbHMvcmVjdXJzaXZlLXRyZWUtbm9kZS5tb2RlbCc7XG5pbXBvcnQgeyBUcmVlTm9kZU1vZGVsIH0gZnJvbSAnLi9tb2RlbHMvdHJlZS1ub2RlLm1vZGVsJztcbmltcG9ydCB7IEFzeW5jQXJyYXkgfSBmcm9tICcuL21vZGVscy9hc3luYy1hcnJheSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuZXhwb3J0IGludGVyZmFjZSBDbHJSZWN1cnNpdmVGb3JPZkNvbnRleHQ8VD4ge1xuICAkaW1wbGljaXQ6IFQ7XG4gIGNsck1vZGVsOiBUcmVlTm9kZU1vZGVsPFQ+O1xufVxuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbY2xyUmVjdXJzaXZlRm9yXVtjbHJSZWN1cnNpdmVGb3JPZl0nIH0pXG5leHBvcnQgY2xhc3MgQ2xyUmVjdXJzaXZlRm9yT2Y8VD4gaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPENsclJlY3Vyc2l2ZUZvck9mQ29udGV4dDxUPj4sXG4gICAgcHJpdmF0ZSBmZWF0dXJlc1NlcnZpY2U6IFRyZWVGZWF0dXJlc1NlcnZpY2U8VD4sXG4gICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmXG4gICkge31cblxuICAvLyBUT0RPOiBhY2NlcHQgTmdJdGVyYWJsZTxUPlxuICBASW5wdXQoJ2NsclJlY3Vyc2l2ZUZvck9mJykgbm9kZXM6IFQgfCBUW107XG5cbiAgLy8gVE9ETzogYWNjZXB0IE5nSXRlcmFibGU8VD4gcmV0dXJuIHR5cGVcbiAgQElucHV0KCdjbHJSZWN1cnNpdmVGb3JHZXRDaGlsZHJlbicpIGdldENoaWxkcmVuOiAobm9kZTogVCkgPT4gQXN5bmNBcnJheTxUPjtcblxuICBwcml2YXRlIGNoaWxkcmVuRmV0Y2hTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAvLyBJJ20gdXNpbmcgT25DaGFuZ2VzIGluc3RlYWQgb2YgT25Jbml0IHRvIGVhc2lseSBrZWVwIHVwIHRvIGRhdGUgd2l0aCBkeW5hbWljIHRyZWVzLiBNYXliZSBvcHRpbWl6YWJsZSBsYXRlci5cbiAgbmdPbkNoYW5nZXMoKSB7XG4gICAgbGV0IHdyYXBwZWQ6IFJlY3Vyc2l2ZVRyZWVOb2RlTW9kZWw8VD5bXTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLm5vZGVzKSkge1xuICAgICAgd3JhcHBlZCA9IHRoaXMubm9kZXMubWFwKG5vZGUgPT4gbmV3IFJlY3Vyc2l2ZVRyZWVOb2RlTW9kZWwobm9kZSwgbnVsbCwgdGhpcy5nZXRDaGlsZHJlbiwgdGhpcy5mZWF0dXJlc1NlcnZpY2UpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgd3JhcHBlZCA9IFtuZXcgUmVjdXJzaXZlVHJlZU5vZGVNb2RlbCh0aGlzLm5vZGVzLCBudWxsLCB0aGlzLmdldENoaWxkcmVuLCB0aGlzLmZlYXR1cmVzU2VydmljZSldO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuY2hpbGRyZW5GZXRjaFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5jaGlsZHJlbkZldGNoU3Vic2NyaXB0aW9uID0gdGhpcy5mZWF0dXJlc1NlcnZpY2UuY2hpbGRyZW5GZXRjaGVkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMuZmVhdHVyZXNTZXJ2aWNlLnJlY3Vyc2lvbiA9IHtcbiAgICAgIHRlbXBsYXRlOiB0aGlzLnRlbXBsYXRlLFxuICAgICAgcm9vdDogd3JhcHBlZCxcbiAgICB9O1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuY2hpbGRyZW5GZXRjaFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5jaGlsZHJlbkZldGNoU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG59XG4iXX0=