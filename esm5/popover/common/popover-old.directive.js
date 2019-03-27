/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive, EventEmitter, Input, Output, TemplateRef, ViewContainerRef } from '@angular/core';
import { Point, Popover } from './popover';
/** @type {?} */
var openCount = 0;
/** @type {?} */
var waiting = [];
// pending create functions
var PopoverDirectiveOld = /** @class */ (function () {
    function PopoverDirectiveOld(templateRef, viewContainer) {
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this.popoverOptions = {};
        this.clrPopoverOldChange = new EventEmitter(false);
    }
    Object.defineProperty(PopoverDirectiveOld.prototype, "clrPopoverOld", {
        set: /**
         * @param {?} open
         * @return {?}
         */
        function (open) {
            var _this = this;
            if (open) {
                if (this.popoverOptions.allowMultipleOpen) {
                    this.createPopover();
                }
                else {
                    if (openCount === 0) {
                        this.createPopover();
                    }
                    else {
                        waiting.push((/**
                         * @return {?}
                         */
                        function () {
                            _this.createPopover();
                        }));
                    }
                }
            }
            else {
                this.viewContainer.clear();
                this.destroyPopover();
                if (!this.popoverOptions.allowMultipleOpen) {
                    if (waiting.length > 0) {
                        /** @type {?} */
                        var createPopoverFn = waiting.shift();
                        createPopoverFn();
                    }
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    PopoverDirectiveOld.prototype.createPopover = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var embeddedViewRef = (/** @type {?} */ (this.viewContainer.createEmbeddedView(this.templateRef)));
        // TODO: Not sure of the risks associated with using this. Find an alternative.
        // Needed for find the correct height and width of dynamically created views
        // inside of the popover. For Eg: Button Groups
        embeddedViewRef.detectChanges();
        // filter out other nodes in the view ref so we are only left with element nodes
        /** @type {?} */
        var elementNodes = embeddedViewRef.rootNodes.filter((/**
         * @param {?} node
         * @return {?}
         */
        function (node) {
            return node.nodeType === 1;
        }));
        // we take the first element node in the embedded view; usually there should only be one anyways
        this._popoverInstance = new Popover(elementNodes[0]);
        this._subscription = this._popoverInstance
            .anchor(this.anchorElem, this.anchorPoint, this.popoverPoint, this.popoverOptions)
            .subscribe((/**
         * @return {?}
         */
        function () {
            _this.clrPopoverOldChange.emit(false);
        }));
        openCount++;
    };
    /**
     * @return {?}
     */
    PopoverDirectiveOld.prototype.destroyPopover = /**
     * @return {?}
     */
    function () {
        if (this._popoverInstance) {
            this._subscription.unsubscribe();
            this._popoverInstance.release();
            delete this._popoverInstance;
            openCount--;
        }
    };
    /**
     * @return {?}
     */
    PopoverDirectiveOld.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.destroyPopover();
    };
    PopoverDirectiveOld.decorators = [
        { type: Directive, args: [{ selector: '[clrPopoverOld]' },] }
    ];
    /** @nocollapse */
    PopoverDirectiveOld.ctorParameters = function () { return [
        { type: TemplateRef },
        { type: ViewContainerRef }
    ]; };
    PopoverDirectiveOld.propDecorators = {
        anchorElem: [{ type: Input, args: ['clrPopoverOldAnchor',] }],
        anchorPoint: [{ type: Input, args: ['clrPopoverOldAnchorPoint',] }],
        popoverPoint: [{ type: Input, args: ['clrPopoverOldPopoverPoint',] }],
        popoverOptions: [{ type: Input, args: ['clrPopoverOldOptions',] }],
        clrPopoverOldChange: [{ type: Output, args: ['clrPopoverOldChange',] }],
        clrPopoverOld: [{ type: Input }]
    };
    return PopoverDirectiveOld;
}());
export { PopoverDirectiveOld };
if (false) {
    /**
     * @type {?}
     * @private
     */
    PopoverDirectiveOld.prototype._popoverInstance;
    /**
     * @type {?}
     * @private
     */
    PopoverDirectiveOld.prototype._subscription;
    /** @type {?} */
    PopoverDirectiveOld.prototype.anchorElem;
    /** @type {?} */
    PopoverDirectiveOld.prototype.anchorPoint;
    /** @type {?} */
    PopoverDirectiveOld.prototype.popoverPoint;
    /** @type {?} */
    PopoverDirectiveOld.prototype.popoverOptions;
    /** @type {?} */
    PopoverDirectiveOld.prototype.clrPopoverOldChange;
    /**
     * @type {?}
     * @private
     */
    PopoverDirectiveOld.prototype.templateRef;
    /**
     * @type {?}
     * @private
     */
    PopoverDirectiveOld.prototype.viewContainer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci1vbGQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsicG9wb3Zlci9jb21tb24vcG9wb3Zlci1vbGQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtBLE9BQU8sRUFBRSxTQUFTLEVBQW1CLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUd2SCxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLFdBQVcsQ0FBQzs7SUFHdkMsU0FBUyxHQUFXLENBQUM7O0lBQ25CLE9BQU8sR0FBc0IsRUFBRTs7QUFFckM7SUFXRSw2QkFBb0IsV0FBNkIsRUFBVSxhQUErQjtRQUF0RSxnQkFBVyxHQUFYLFdBQVcsQ0FBa0I7UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBa0I7UUFIM0QsbUJBQWMsR0FBbUIsRUFBRSxDQUFDO1FBQ3BDLHdCQUFtQixHQUFHLElBQUksWUFBWSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBRU8sQ0FBQztJQUU5RixzQkFDSSw4Q0FBYTs7Ozs7UUFEakIsVUFDa0IsSUFBYTtZQUQvQixpQkF5QkM7WUF2QkMsSUFBSSxJQUFJLEVBQUU7Z0JBQ1IsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLGlCQUFpQixFQUFFO29CQUN6QyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7aUJBQ3RCO3FCQUFNO29CQUNMLElBQUksU0FBUyxLQUFLLENBQUMsRUFBRTt3QkFDbkIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO3FCQUN0Qjt5QkFBTTt3QkFDTCxPQUFPLENBQUMsSUFBSTs7O3dCQUFDOzRCQUNYLEtBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzt3QkFDdkIsQ0FBQyxFQUFDLENBQUM7cUJBQ0o7aUJBQ0Y7YUFDRjtpQkFBTTtnQkFDTCxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUMzQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBRXRCLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLGlCQUFpQixFQUFFO29CQUMxQyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFOzs0QkFDaEIsZUFBZSxHQUFHLE9BQU8sQ0FBQyxLQUFLLEVBQUU7d0JBQ3ZDLGVBQWUsRUFBRSxDQUFDO3FCQUNuQjtpQkFDRjthQUNGO1FBQ0gsQ0FBQzs7O09BQUE7Ozs7SUFFRCwyQ0FBYTs7O0lBQWI7UUFBQSxpQkF1QkM7O1lBdEJPLGVBQWUsR0FBeUIsbUJBQXNCLElBQUksQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQ3ZHLElBQUksQ0FBQyxXQUFXLENBQ2pCLEVBQUE7UUFFRCwrRUFBK0U7UUFDL0UsNEVBQTRFO1FBQzVFLCtDQUErQztRQUMvQyxlQUFlLENBQUMsYUFBYSxFQUFFLENBQUM7OztZQUcxQixZQUFZLEdBQWtCLGVBQWUsQ0FBQyxTQUFTLENBQUMsTUFBTTs7OztRQUFDLFVBQUMsSUFBUztZQUM3RSxPQUFPLElBQUksQ0FBQyxRQUFRLEtBQUssQ0FBQyxDQUFDO1FBQzdCLENBQUMsRUFBQztRQUVGLGdHQUFnRztRQUNoRyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCO2FBQ3ZDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDO2FBQ2pGLFNBQVM7OztRQUFDO1lBQ1QsS0FBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2QyxDQUFDLEVBQUMsQ0FBQztRQUNMLFNBQVMsRUFBRSxDQUFDO0lBQ2QsQ0FBQzs7OztJQUVELDRDQUFjOzs7SUFBZDtRQUNFLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBQ3pCLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDakMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ2hDLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDO1lBQzdCLFNBQVMsRUFBRSxDQUFDO1NBQ2I7SUFDSCxDQUFDOzs7O0lBRUQseUNBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3hCLENBQUM7O2dCQTVFRixTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUU7Ozs7Z0JBVHdCLFdBQVc7Z0JBQUUsZ0JBQWdCOzs7NkJBYzVGLEtBQUssU0FBQyxxQkFBcUI7OEJBQzNCLEtBQUssU0FBQywwQkFBMEI7K0JBQ2hDLEtBQUssU0FBQywyQkFBMkI7aUNBQ2pDLEtBQUssU0FBQyxzQkFBc0I7c0NBQzVCLE1BQU0sU0FBQyxxQkFBcUI7Z0NBSTVCLEtBQUs7O0lBZ0VSLDBCQUFDO0NBQUEsQUE3RUQsSUE2RUM7U0E1RVksbUJBQW1COzs7Ozs7SUFDOUIsK0NBQWtDOzs7OztJQUNsQyw0Q0FBb0M7O0lBRXBDLHlDQUE4Qzs7SUFDOUMsMENBQXNEOztJQUN0RCwyQ0FBd0Q7O0lBQ3hELDZDQUFtRTs7SUFDbkUsa0RBQXNGOzs7OztJQUUxRSwwQ0FBcUM7Ozs7O0lBQUUsNENBQXVDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBFbWJlZGRlZFZpZXdSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCwgVGVtcGxhdGVSZWYsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBQb2ludCwgUG9wb3ZlciB9IGZyb20gJy4vcG9wb3Zlcic7XG5pbXBvcnQgeyBQb3BvdmVyT3B0aW9ucyB9IGZyb20gJy4vcG9wb3Zlci1vcHRpb25zLmludGVyZmFjZSc7XG5cbmxldCBvcGVuQ291bnQ6IG51bWJlciA9IDA7XG5jb25zdCB3YWl0aW5nOiBBcnJheTwoKSA9PiB2b2lkPiA9IFtdOyAvLyBwZW5kaW5nIGNyZWF0ZSBmdW5jdGlvbnNcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW2NsclBvcG92ZXJPbGRdJyB9KVxuZXhwb3J0IGNsYXNzIFBvcG92ZXJEaXJlY3RpdmVPbGQge1xuICBwcml2YXRlIF9wb3BvdmVySW5zdGFuY2U6IFBvcG92ZXI7XG4gIHByaXZhdGUgX3N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIEBJbnB1dCgnY2xyUG9wb3Zlck9sZEFuY2hvcicpIGFuY2hvckVsZW06IGFueTtcbiAgQElucHV0KCdjbHJQb3BvdmVyT2xkQW5jaG9yUG9pbnQnKSBhbmNob3JQb2ludDogUG9pbnQ7XG4gIEBJbnB1dCgnY2xyUG9wb3Zlck9sZFBvcG92ZXJQb2ludCcpIHBvcG92ZXJQb2ludDogUG9pbnQ7XG4gIEBJbnB1dCgnY2xyUG9wb3Zlck9sZE9wdGlvbnMnKSBwb3BvdmVyT3B0aW9uczogUG9wb3Zlck9wdGlvbnMgPSB7fTtcbiAgQE91dHB1dCgnY2xyUG9wb3Zlck9sZENoYW5nZScpIGNsclBvcG92ZXJPbGRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KGZhbHNlKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+LCBwcml2YXRlIHZpZXdDb250YWluZXI6IFZpZXdDb250YWluZXJSZWYpIHt9XG5cbiAgQElucHV0KClcbiAgc2V0IGNsclBvcG92ZXJPbGQob3BlbjogYm9vbGVhbikge1xuICAgIGlmIChvcGVuKSB7XG4gICAgICBpZiAodGhpcy5wb3BvdmVyT3B0aW9ucy5hbGxvd011bHRpcGxlT3Blbikge1xuICAgICAgICB0aGlzLmNyZWF0ZVBvcG92ZXIoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChvcGVuQ291bnQgPT09IDApIHtcbiAgICAgICAgICB0aGlzLmNyZWF0ZVBvcG92ZXIoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3YWl0aW5nLnB1c2goKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVQb3BvdmVyKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy52aWV3Q29udGFpbmVyLmNsZWFyKCk7XG4gICAgICB0aGlzLmRlc3Ryb3lQb3BvdmVyKCk7XG5cbiAgICAgIGlmICghdGhpcy5wb3BvdmVyT3B0aW9ucy5hbGxvd011bHRpcGxlT3Blbikge1xuICAgICAgICBpZiAod2FpdGluZy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgY29uc3QgY3JlYXRlUG9wb3ZlckZuID0gd2FpdGluZy5zaGlmdCgpO1xuICAgICAgICAgIGNyZWF0ZVBvcG92ZXJGbigpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY3JlYXRlUG9wb3ZlcigpIHtcbiAgICBjb25zdCBlbWJlZGRlZFZpZXdSZWY6IEVtYmVkZGVkVmlld1JlZjxhbnk+ID0gPEVtYmVkZGVkVmlld1JlZjxhbnk+PnRoaXMudmlld0NvbnRhaW5lci5jcmVhdGVFbWJlZGRlZFZpZXcoXG4gICAgICB0aGlzLnRlbXBsYXRlUmVmXG4gICAgKTtcblxuICAgIC8vIFRPRE86IE5vdCBzdXJlIG9mIHRoZSByaXNrcyBhc3NvY2lhdGVkIHdpdGggdXNpbmcgdGhpcy4gRmluZCBhbiBhbHRlcm5hdGl2ZS5cbiAgICAvLyBOZWVkZWQgZm9yIGZpbmQgdGhlIGNvcnJlY3QgaGVpZ2h0IGFuZCB3aWR0aCBvZiBkeW5hbWljYWxseSBjcmVhdGVkIHZpZXdzXG4gICAgLy8gaW5zaWRlIG9mIHRoZSBwb3BvdmVyLiBGb3IgRWc6IEJ1dHRvbiBHcm91cHNcbiAgICBlbWJlZGRlZFZpZXdSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuXG4gICAgLy8gZmlsdGVyIG91dCBvdGhlciBub2RlcyBpbiB0aGUgdmlldyByZWYgc28gd2UgYXJlIG9ubHkgbGVmdCB3aXRoIGVsZW1lbnQgbm9kZXNcbiAgICBjb25zdCBlbGVtZW50Tm9kZXM6IEhUTUxFbGVtZW50W10gPSBlbWJlZGRlZFZpZXdSZWYucm9vdE5vZGVzLmZpbHRlcigobm9kZTogYW55KSA9PiB7XG4gICAgICByZXR1cm4gbm9kZS5ub2RlVHlwZSA9PT0gMTtcbiAgICB9KTtcblxuICAgIC8vIHdlIHRha2UgdGhlIGZpcnN0IGVsZW1lbnQgbm9kZSBpbiB0aGUgZW1iZWRkZWQgdmlldzsgdXN1YWxseSB0aGVyZSBzaG91bGQgb25seSBiZSBvbmUgYW55d2F5c1xuICAgIHRoaXMuX3BvcG92ZXJJbnN0YW5jZSA9IG5ldyBQb3BvdmVyKGVsZW1lbnROb2Rlc1swXSk7XG4gICAgdGhpcy5fc3Vic2NyaXB0aW9uID0gdGhpcy5fcG9wb3Zlckluc3RhbmNlXG4gICAgICAuYW5jaG9yKHRoaXMuYW5jaG9yRWxlbSwgdGhpcy5hbmNob3JQb2ludCwgdGhpcy5wb3BvdmVyUG9pbnQsIHRoaXMucG9wb3Zlck9wdGlvbnMpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5jbHJQb3BvdmVyT2xkQ2hhbmdlLmVtaXQoZmFsc2UpO1xuICAgICAgfSk7XG4gICAgb3BlbkNvdW50Kys7XG4gIH1cblxuICBkZXN0cm95UG9wb3ZlcigpIHtcbiAgICBpZiAodGhpcy5fcG9wb3Zlckluc3RhbmNlKSB7XG4gICAgICB0aGlzLl9zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMuX3BvcG92ZXJJbnN0YW5jZS5yZWxlYXNlKCk7XG4gICAgICBkZWxldGUgdGhpcy5fcG9wb3Zlckluc3RhbmNlO1xuICAgICAgb3BlbkNvdW50LS07XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5kZXN0cm95UG9wb3ZlcigpO1xuICB9XG59XG4iXX0=