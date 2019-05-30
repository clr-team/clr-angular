/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Injectable, Optional, SkipSelf } from '@angular/core';
import { Subject } from 'rxjs';
/**
 * @template T
 */
export class TreeFeaturesService {
    constructor() {
        this.selectable = false;
        this.eager = true;
        this.childrenFetched = new Subject();
    }
}
TreeFeaturesService.decorators = [
    { type: Injectable }
];
if (false) {
    /** @type {?} */
    TreeFeaturesService.prototype.selectable;
    /** @type {?} */
    TreeFeaturesService.prototype.eager;
    /** @type {?} */
    TreeFeaturesService.prototype.recursion;
    /** @type {?} */
    TreeFeaturesService.prototype.childrenFetched;
}
/**
 * @template T
 * @param {?} existing
 * @return {?}
 */
export function treeFeaturesFactory(existing) {
    return existing || new TreeFeaturesService();
}
/** @type {?} */
export const TREE_FEATURES_PROVIDER = {
    provide: TreeFeaturesService,
    useFactory: treeFeaturesFactory,
    /*
       * The Optional + SkipSelf pattern ensures that in case of nested components, only the root one will
       * instantiate a new service and all its children will reuse the root's instance.
       * If there are several roots (in this case, several independent trees on a page), each root will instantiate
       * its own service so they won't interfere with one another.
       *
       * TL;DR - Optional + SkipSelf = 1 instance of TreeFeaturesService per tree.
       */
    deps: [[new Optional(), new SkipSelf(), TreeFeaturesService]],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1mZWF0dXJlcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS90cmVlLXZpZXcvdHJlZS1mZWF0dXJlcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtBLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBZSxNQUFNLGVBQWUsQ0FBQztBQUc1RSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7O0FBRy9CLE1BQU0sT0FBTyxtQkFBbUI7SUFEaEM7UUFFRSxlQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ25CLFVBQUssR0FBRyxJQUFJLENBQUM7UUFLYixvQkFBZSxHQUFrQixJQUFJLE9BQU8sRUFBRSxDQUFDO0lBQ2pELENBQUM7OztZQVRBLFVBQVU7Ozs7SUFFVCx5Q0FBbUI7O0lBQ25CLG9DQUFhOztJQUNiLHdDQUdFOztJQUNGLDhDQUErQzs7Ozs7OztBQUdqRCxNQUFNLFVBQVUsbUJBQW1CLENBQUksUUFBZ0M7SUFDckUsT0FBTyxRQUFRLElBQUksSUFBSSxtQkFBbUIsRUFBRSxDQUFDO0FBQy9DLENBQUM7O0FBRUQsTUFBTSxPQUFPLHNCQUFzQixHQUFHO0lBQ3BDLE9BQU8sRUFBRSxtQkFBbUI7SUFDNUIsVUFBVSxFQUFFLG1CQUFtQjs7Ozs7Ozs7O0lBUy9CLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxRQUFRLEVBQUUsRUFBRSxJQUFJLFFBQVEsRUFBRSxFQUFFLG1CQUFtQixDQUFDLENBQUM7Q0FDOUQiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBPcHRpb25hbCwgU2tpcFNlbGYsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZWN1cnNpdmVUcmVlTm9kZU1vZGVsIH0gZnJvbSAnLi9tb2RlbHMvcmVjdXJzaXZlLXRyZWUtbm9kZS5tb2RlbCc7XG5pbXBvcnQgeyBDbHJSZWN1cnNpdmVGb3JPZkNvbnRleHQgfSBmcm9tICcuL3JlY3Vyc2l2ZS1mb3Itb2YnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVHJlZUZlYXR1cmVzU2VydmljZTxUPiB7XG4gIHNlbGVjdGFibGUgPSBmYWxzZTtcbiAgZWFnZXIgPSB0cnVlO1xuICByZWN1cnNpb246IHtcbiAgICB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8Q2xyUmVjdXJzaXZlRm9yT2ZDb250ZXh0PFQ+PjtcbiAgICByb290OiBSZWN1cnNpdmVUcmVlTm9kZU1vZGVsPFQ+W107XG4gIH07XG4gIGNoaWxkcmVuRmV0Y2hlZDogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0KCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0cmVlRmVhdHVyZXNGYWN0b3J5PFQ+KGV4aXN0aW5nOiBUcmVlRmVhdHVyZXNTZXJ2aWNlPFQ+KSB7XG4gIHJldHVybiBleGlzdGluZyB8fCBuZXcgVHJlZUZlYXR1cmVzU2VydmljZSgpO1xufVxuXG5leHBvcnQgY29uc3QgVFJFRV9GRUFUVVJFU19QUk9WSURFUiA9IHtcbiAgcHJvdmlkZTogVHJlZUZlYXR1cmVzU2VydmljZSxcbiAgdXNlRmFjdG9yeTogdHJlZUZlYXR1cmVzRmFjdG9yeSxcbiAgLypcbiAgICogVGhlIE9wdGlvbmFsICsgU2tpcFNlbGYgcGF0dGVybiBlbnN1cmVzIHRoYXQgaW4gY2FzZSBvZiBuZXN0ZWQgY29tcG9uZW50cywgb25seSB0aGUgcm9vdCBvbmUgd2lsbFxuICAgKiBpbnN0YW50aWF0ZSBhIG5ldyBzZXJ2aWNlIGFuZCBhbGwgaXRzIGNoaWxkcmVuIHdpbGwgcmV1c2UgdGhlIHJvb3QncyBpbnN0YW5jZS5cbiAgICogSWYgdGhlcmUgYXJlIHNldmVyYWwgcm9vdHMgKGluIHRoaXMgY2FzZSwgc2V2ZXJhbCBpbmRlcGVuZGVudCB0cmVlcyBvbiBhIHBhZ2UpLCBlYWNoIHJvb3Qgd2lsbCBpbnN0YW50aWF0ZVxuICAgKiBpdHMgb3duIHNlcnZpY2Ugc28gdGhleSB3b24ndCBpbnRlcmZlcmUgd2l0aCBvbmUgYW5vdGhlci5cbiAgICpcbiAgICogVEw7RFIgLSBPcHRpb25hbCArIFNraXBTZWxmID0gMSBpbnN0YW5jZSBvZiBUcmVlRmVhdHVyZXNTZXJ2aWNlIHBlciB0cmVlLlxuICAgKi9cbiAgZGVwczogW1tuZXcgT3B0aW9uYWwoKSwgbmV3IFNraXBTZWxmKCksIFRyZWVGZWF0dXJlc1NlcnZpY2VdXSxcbn07XG4iXX0=