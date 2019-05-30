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
export class ClrRecursiveForOf {
    /**
     * @param {?} template
     * @param {?} featuresService
     * @param {?} cdr
     */
    constructor(template, featuresService, cdr) {
        this.template = template;
        this.featuresService = featuresService;
        this.cdr = cdr;
    }
    // I'm using OnChanges instead of OnInit to easily keep up to date with dynamic trees. Maybe optimizable later.
    /**
     * @return {?}
     */
    ngOnChanges() {
        /** @type {?} */
        let wrapped;
        if (Array.isArray(this.nodes)) {
            wrapped = this.nodes.map((/**
             * @param {?} node
             * @return {?}
             */
            node => new RecursiveTreeNodeModel(node, null, this.getChildren, this.featuresService)));
        }
        else {
            wrapped = [new RecursiveTreeNodeModel(this.nodes, null, this.getChildren, this.featuresService)];
        }
        if (!this.childrenFetchSubscription) {
            this.childrenFetchSubscription = this.featuresService.childrenFetched.subscribe((/**
             * @return {?}
             */
            () => {
                this.cdr.detectChanges();
            }));
        }
        this.featuresService.recursion = {
            template: this.template,
            root: wrapped,
        };
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.childrenFetchSubscription) {
            this.childrenFetchSubscription.unsubscribe();
        }
    }
}
ClrRecursiveForOf.decorators = [
    { type: Directive, args: [{ selector: '[clrRecursiveFor][clrRecursiveForOf]' },] }
];
/** @nocollapse */
ClrRecursiveForOf.ctorParameters = () => [
    { type: TemplateRef },
    { type: TreeFeaturesService },
    { type: ChangeDetectorRef }
];
ClrRecursiveForOf.propDecorators = {
    nodes: [{ type: Input, args: ['clrRecursiveForOf',] }],
    getChildren: [{ type: Input, args: ['clrRecursiveForGetChildren',] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjdXJzaXZlLWZvci1vZi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvdHJlZS12aWV3L3JlY3Vyc2l2ZS1mb3Itb2YudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBTUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQXdCLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQzs7Ozs7QUFLNUUsOENBR0M7OztJQUZDLDZDQUFhOztJQUNiLDRDQUEyQjs7Ozs7QUFJN0IsTUFBTSxPQUFPLGlCQUFpQjs7Ozs7O0lBQzVCLFlBQ1UsUUFBa0QsRUFDbEQsZUFBdUMsRUFDdkMsR0FBc0I7UUFGdEIsYUFBUSxHQUFSLFFBQVEsQ0FBMEM7UUFDbEQsb0JBQWUsR0FBZixlQUFlLENBQXdCO1FBQ3ZDLFFBQUcsR0FBSCxHQUFHLENBQW1CO0lBQzdCLENBQUM7Ozs7O0lBV0osV0FBVzs7WUFDTCxPQUFvQztRQUN4QyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzdCLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUc7Ozs7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksc0JBQXNCLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsRUFBQyxDQUFDO1NBQ2xIO2FBQU07WUFDTCxPQUFPLEdBQUcsQ0FBQyxJQUFJLHNCQUFzQixDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7U0FDbEc7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLHlCQUF5QixFQUFFO1lBQ25DLElBQUksQ0FBQyx5QkFBeUIsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsQ0FBQyxTQUFTOzs7WUFBQyxHQUFHLEVBQUU7Z0JBQ25GLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDM0IsQ0FBQyxFQUFDLENBQUM7U0FDSjtRQUVELElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxHQUFHO1lBQy9CLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN2QixJQUFJLEVBQUUsT0FBTztTQUNkLENBQUM7SUFDSixDQUFDOzs7O0lBRUQsV0FBVztRQUNULElBQUksSUFBSSxDQUFDLHlCQUF5QixFQUFFO1lBQ2xDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUM5QztJQUNILENBQUM7OztZQXhDRixTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsc0NBQXNDLEVBQUU7Ozs7WUFaSyxXQUFXO1lBQ3RFLG1CQUFtQjtZQURuQixpQkFBaUI7OztvQkFxQnZCLEtBQUssU0FBQyxtQkFBbUI7MEJBR3pCLEtBQUssU0FBQyw0QkFBNEI7Ozs7SUFIbkMsa0NBQTJDOztJQUczQyx3Q0FBNkU7Ozs7O0lBRTdFLHNEQUFnRDs7Ozs7SUFYOUMscUNBQTBEOzs7OztJQUMxRCw0Q0FBK0M7Ozs7O0lBQy9DLGdDQUE4QiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIERpcmVjdGl2ZSwgSW5wdXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVHJlZUZlYXR1cmVzU2VydmljZSB9IGZyb20gJy4vdHJlZS1mZWF0dXJlcy5zZXJ2aWNlJztcbmltcG9ydCB7IFJlY3Vyc2l2ZVRyZWVOb2RlTW9kZWwgfSBmcm9tICcuL21vZGVscy9yZWN1cnNpdmUtdHJlZS1ub2RlLm1vZGVsJztcbmltcG9ydCB7IFRyZWVOb2RlTW9kZWwgfSBmcm9tICcuL21vZGVscy90cmVlLW5vZGUubW9kZWwnO1xuaW1wb3J0IHsgQXN5bmNBcnJheSB9IGZyb20gJy4vbW9kZWxzL2FzeW5jLWFycmF5JztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIENsclJlY3Vyc2l2ZUZvck9mQ29udGV4dDxUPiB7XG4gICRpbXBsaWNpdDogVDtcbiAgY2xyTW9kZWw6IFRyZWVOb2RlTW9kZWw8VD47XG59XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tjbHJSZWN1cnNpdmVGb3JdW2NsclJlY3Vyc2l2ZUZvck9mXScgfSlcbmV4cG9ydCBjbGFzcyBDbHJSZWN1cnNpdmVGb3JPZjxUPiBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8Q2xyUmVjdXJzaXZlRm9yT2ZDb250ZXh0PFQ+PixcbiAgICBwcml2YXRlIGZlYXR1cmVzU2VydmljZTogVHJlZUZlYXR1cmVzU2VydmljZTxUPixcbiAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWZcbiAgKSB7fVxuXG4gIC8vIFRPRE86IGFjY2VwdCBOZ0l0ZXJhYmxlPFQ+XG4gIEBJbnB1dCgnY2xyUmVjdXJzaXZlRm9yT2YnKSBub2RlczogVCB8IFRbXTtcblxuICAvLyBUT0RPOiBhY2NlcHQgTmdJdGVyYWJsZTxUPiByZXR1cm4gdHlwZVxuICBASW5wdXQoJ2NsclJlY3Vyc2l2ZUZvckdldENoaWxkcmVuJykgZ2V0Q2hpbGRyZW46IChub2RlOiBUKSA9PiBBc3luY0FycmF5PFQ+O1xuXG4gIHByaXZhdGUgY2hpbGRyZW5GZXRjaFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIC8vIEknbSB1c2luZyBPbkNoYW5nZXMgaW5zdGVhZCBvZiBPbkluaXQgdG8gZWFzaWx5IGtlZXAgdXAgdG8gZGF0ZSB3aXRoIGR5bmFtaWMgdHJlZXMuIE1heWJlIG9wdGltaXphYmxlIGxhdGVyLlxuICBuZ09uQ2hhbmdlcygpIHtcbiAgICBsZXQgd3JhcHBlZDogUmVjdXJzaXZlVHJlZU5vZGVNb2RlbDxUPltdO1xuICAgIGlmIChBcnJheS5pc0FycmF5KHRoaXMubm9kZXMpKSB7XG4gICAgICB3cmFwcGVkID0gdGhpcy5ub2Rlcy5tYXAobm9kZSA9PiBuZXcgUmVjdXJzaXZlVHJlZU5vZGVNb2RlbChub2RlLCBudWxsLCB0aGlzLmdldENoaWxkcmVuLCB0aGlzLmZlYXR1cmVzU2VydmljZSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB3cmFwcGVkID0gW25ldyBSZWN1cnNpdmVUcmVlTm9kZU1vZGVsKHRoaXMubm9kZXMsIG51bGwsIHRoaXMuZ2V0Q2hpbGRyZW4sIHRoaXMuZmVhdHVyZXNTZXJ2aWNlKV07XG4gICAgfVxuICAgIGlmICghdGhpcy5jaGlsZHJlbkZldGNoU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLmNoaWxkcmVuRmV0Y2hTdWJzY3JpcHRpb24gPSB0aGlzLmZlYXR1cmVzU2VydmljZS5jaGlsZHJlbkZldGNoZWQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5mZWF0dXJlc1NlcnZpY2UucmVjdXJzaW9uID0ge1xuICAgICAgdGVtcGxhdGU6IHRoaXMudGVtcGxhdGUsXG4gICAgICByb290OiB3cmFwcGVkLFxuICAgIH07XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5jaGlsZHJlbkZldGNoU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLmNoaWxkcmVuRmV0Y2hTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==