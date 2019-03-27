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
let openCount = 0;
/** @type {?} */
const waiting = [];
// pending create functions
export class PopoverDirectiveOld {
    /**
     * @param {?} templateRef
     * @param {?} viewContainer
     */
    constructor(templateRef, viewContainer) {
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this.popoverOptions = {};
        this.clrPopoverOldChange = new EventEmitter(false);
    }
    /**
     * @param {?} open
     * @return {?}
     */
    set clrPopoverOld(open) {
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
                    () => {
                        this.createPopover();
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
                    const createPopoverFn = waiting.shift();
                    createPopoverFn();
                }
            }
        }
    }
    /**
     * @return {?}
     */
    createPopover() {
        /** @type {?} */
        const embeddedViewRef = (/** @type {?} */ (this.viewContainer.createEmbeddedView(this.templateRef)));
        // TODO: Not sure of the risks associated with using this. Find an alternative.
        // Needed for find the correct height and width of dynamically created views
        // inside of the popover. For Eg: Button Groups
        embeddedViewRef.detectChanges();
        // filter out other nodes in the view ref so we are only left with element nodes
        /** @type {?} */
        const elementNodes = embeddedViewRef.rootNodes.filter((/**
         * @param {?} node
         * @return {?}
         */
        (node) => {
            return node.nodeType === 1;
        }));
        // we take the first element node in the embedded view; usually there should only be one anyways
        this._popoverInstance = new Popover(elementNodes[0]);
        this._subscription = this._popoverInstance
            .anchor(this.anchorElem, this.anchorPoint, this.popoverPoint, this.popoverOptions)
            .subscribe((/**
         * @return {?}
         */
        () => {
            this.clrPopoverOldChange.emit(false);
        }));
        openCount++;
    }
    /**
     * @return {?}
     */
    destroyPopover() {
        if (this._popoverInstance) {
            this._subscription.unsubscribe();
            this._popoverInstance.release();
            delete this._popoverInstance;
            openCount--;
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.destroyPopover();
    }
}
PopoverDirectiveOld.decorators = [
    { type: Directive, args: [{ selector: '[clrPopoverOld]' },] }
];
/** @nocollapse */
PopoverDirectiveOld.ctorParameters = () => [
    { type: TemplateRef },
    { type: ViewContainerRef }
];
PopoverDirectiveOld.propDecorators = {
    anchorElem: [{ type: Input, args: ['clrPopoverOldAnchor',] }],
    anchorPoint: [{ type: Input, args: ['clrPopoverOldAnchorPoint',] }],
    popoverPoint: [{ type: Input, args: ['clrPopoverOldPopoverPoint',] }],
    popoverOptions: [{ type: Input, args: ['clrPopoverOldOptions',] }],
    clrPopoverOldChange: [{ type: Output, args: ['clrPopoverOldChange',] }],
    clrPopoverOld: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci1vbGQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsicG9wb3Zlci9jb21tb24vcG9wb3Zlci1vbGQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtBLE9BQU8sRUFBRSxTQUFTLEVBQW1CLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUd2SCxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLFdBQVcsQ0FBQzs7SUFHdkMsU0FBUyxHQUFXLENBQUM7O01BQ25CLE9BQU8sR0FBc0IsRUFBRTs7QUFHckMsTUFBTSxPQUFPLG1CQUFtQjs7Ozs7SUFVOUIsWUFBb0IsV0FBNkIsRUFBVSxhQUErQjtRQUF0RSxnQkFBVyxHQUFYLFdBQVcsQ0FBa0I7UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBa0I7UUFIM0QsbUJBQWMsR0FBbUIsRUFBRSxDQUFDO1FBQ3BDLHdCQUFtQixHQUFHLElBQUksWUFBWSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBRU8sQ0FBQzs7Ozs7SUFFOUYsSUFDSSxhQUFhLENBQUMsSUFBYTtRQUM3QixJQUFJLElBQUksRUFBRTtZQUNSLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsRUFBRTtnQkFDekMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO2FBQ3RCO2lCQUFNO2dCQUNMLElBQUksU0FBUyxLQUFLLENBQUMsRUFBRTtvQkFDbkIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO2lCQUN0QjtxQkFBTTtvQkFDTCxPQUFPLENBQUMsSUFBSTs7O29CQUFDLEdBQUcsRUFBRTt3QkFDaEIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO29CQUN2QixDQUFDLEVBQUMsQ0FBQztpQkFDSjthQUNGO1NBQ0Y7YUFBTTtZQUNMLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDM0IsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBRXRCLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLGlCQUFpQixFQUFFO2dCQUMxQyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFOzswQkFDaEIsZUFBZSxHQUFHLE9BQU8sQ0FBQyxLQUFLLEVBQUU7b0JBQ3ZDLGVBQWUsRUFBRSxDQUFDO2lCQUNuQjthQUNGO1NBQ0Y7SUFDSCxDQUFDOzs7O0lBRUQsYUFBYTs7Y0FDTCxlQUFlLEdBQXlCLG1CQUFzQixJQUFJLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUN2RyxJQUFJLENBQUMsV0FBVyxDQUNqQixFQUFBO1FBRUQsK0VBQStFO1FBQy9FLDRFQUE0RTtRQUM1RSwrQ0FBK0M7UUFDL0MsZUFBZSxDQUFDLGFBQWEsRUFBRSxDQUFDOzs7Y0FHMUIsWUFBWSxHQUFrQixlQUFlLENBQUMsU0FBUyxDQUFDLE1BQU07Ozs7UUFBQyxDQUFDLElBQVMsRUFBRSxFQUFFO1lBQ2pGLE9BQU8sSUFBSSxDQUFDLFFBQVEsS0FBSyxDQUFDLENBQUM7UUFDN0IsQ0FBQyxFQUFDO1FBRUYsZ0dBQWdHO1FBQ2hHLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxnQkFBZ0I7YUFDdkMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUM7YUFDakYsU0FBUzs7O1FBQUMsR0FBRyxFQUFFO1lBQ2QsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2QyxDQUFDLEVBQUMsQ0FBQztRQUNMLFNBQVMsRUFBRSxDQUFDO0lBQ2QsQ0FBQzs7OztJQUVELGNBQWM7UUFDWixJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUN6QixJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ2pDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNoQyxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztZQUM3QixTQUFTLEVBQUUsQ0FBQztTQUNiO0lBQ0gsQ0FBQzs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDeEIsQ0FBQzs7O1lBNUVGLFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRTs7OztZQVR3QixXQUFXO1lBQUUsZ0JBQWdCOzs7eUJBYzVGLEtBQUssU0FBQyxxQkFBcUI7MEJBQzNCLEtBQUssU0FBQywwQkFBMEI7MkJBQ2hDLEtBQUssU0FBQywyQkFBMkI7NkJBQ2pDLEtBQUssU0FBQyxzQkFBc0I7a0NBQzVCLE1BQU0sU0FBQyxxQkFBcUI7NEJBSTVCLEtBQUs7Ozs7Ozs7SUFYTiwrQ0FBa0M7Ozs7O0lBQ2xDLDRDQUFvQzs7SUFFcEMseUNBQThDOztJQUM5QywwQ0FBc0Q7O0lBQ3RELDJDQUF3RDs7SUFDeEQsNkNBQW1FOztJQUNuRSxrREFBc0Y7Ozs7O0lBRTFFLDBDQUFxQzs7Ozs7SUFBRSw0Q0FBdUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBEaXJlY3RpdmUsIEVtYmVkZGVkVmlld1JlZiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBUZW1wbGF0ZVJlZiwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IFBvaW50LCBQb3BvdmVyIH0gZnJvbSAnLi9wb3BvdmVyJztcbmltcG9ydCB7IFBvcG92ZXJPcHRpb25zIH0gZnJvbSAnLi9wb3BvdmVyLW9wdGlvbnMuaW50ZXJmYWNlJztcblxubGV0IG9wZW5Db3VudDogbnVtYmVyID0gMDtcbmNvbnN0IHdhaXRpbmc6IEFycmF5PCgpID0+IHZvaWQ+ID0gW107IC8vIHBlbmRpbmcgY3JlYXRlIGZ1bmN0aW9uc1xuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbY2xyUG9wb3Zlck9sZF0nIH0pXG5leHBvcnQgY2xhc3MgUG9wb3ZlckRpcmVjdGl2ZU9sZCB7XG4gIHByaXZhdGUgX3BvcG92ZXJJbnN0YW5jZTogUG9wb3ZlcjtcbiAgcHJpdmF0ZSBfc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgQElucHV0KCdjbHJQb3BvdmVyT2xkQW5jaG9yJykgYW5jaG9yRWxlbTogYW55O1xuICBASW5wdXQoJ2NsclBvcG92ZXJPbGRBbmNob3JQb2ludCcpIGFuY2hvclBvaW50OiBQb2ludDtcbiAgQElucHV0KCdjbHJQb3BvdmVyT2xkUG9wb3ZlclBvaW50JykgcG9wb3ZlclBvaW50OiBQb2ludDtcbiAgQElucHV0KCdjbHJQb3BvdmVyT2xkT3B0aW9ucycpIHBvcG92ZXJPcHRpb25zOiBQb3BvdmVyT3B0aW9ucyA9IHt9O1xuICBAT3V0cHV0KCdjbHJQb3BvdmVyT2xkQ2hhbmdlJykgY2xyUG9wb3Zlck9sZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT4sIHByaXZhdGUgdmlld0NvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZikge31cblxuICBASW5wdXQoKVxuICBzZXQgY2xyUG9wb3Zlck9sZChvcGVuOiBib29sZWFuKSB7XG4gICAgaWYgKG9wZW4pIHtcbiAgICAgIGlmICh0aGlzLnBvcG92ZXJPcHRpb25zLmFsbG93TXVsdGlwbGVPcGVuKSB7XG4gICAgICAgIHRoaXMuY3JlYXRlUG9wb3ZlcigpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKG9wZW5Db3VudCA9PT0gMCkge1xuICAgICAgICAgIHRoaXMuY3JlYXRlUG9wb3ZlcigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdhaXRpbmcucHVzaCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVBvcG92ZXIoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnZpZXdDb250YWluZXIuY2xlYXIoKTtcbiAgICAgIHRoaXMuZGVzdHJveVBvcG92ZXIoKTtcblxuICAgICAgaWYgKCF0aGlzLnBvcG92ZXJPcHRpb25zLmFsbG93TXVsdGlwbGVPcGVuKSB7XG4gICAgICAgIGlmICh3YWl0aW5nLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBjb25zdCBjcmVhdGVQb3BvdmVyRm4gPSB3YWl0aW5nLnNoaWZ0KCk7XG4gICAgICAgICAgY3JlYXRlUG9wb3ZlckZuKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjcmVhdGVQb3BvdmVyKCkge1xuICAgIGNvbnN0IGVtYmVkZGVkVmlld1JlZjogRW1iZWRkZWRWaWV3UmVmPGFueT4gPSA8RW1iZWRkZWRWaWV3UmVmPGFueT4+dGhpcy52aWV3Q29udGFpbmVyLmNyZWF0ZUVtYmVkZGVkVmlldyhcbiAgICAgIHRoaXMudGVtcGxhdGVSZWZcbiAgICApO1xuXG4gICAgLy8gVE9ETzogTm90IHN1cmUgb2YgdGhlIHJpc2tzIGFzc29jaWF0ZWQgd2l0aCB1c2luZyB0aGlzLiBGaW5kIGFuIGFsdGVybmF0aXZlLlxuICAgIC8vIE5lZWRlZCBmb3IgZmluZCB0aGUgY29ycmVjdCBoZWlnaHQgYW5kIHdpZHRoIG9mIGR5bmFtaWNhbGx5IGNyZWF0ZWQgdmlld3NcbiAgICAvLyBpbnNpZGUgb2YgdGhlIHBvcG92ZXIuIEZvciBFZzogQnV0dG9uIEdyb3Vwc1xuICAgIGVtYmVkZGVkVmlld1JlZi5kZXRlY3RDaGFuZ2VzKCk7XG5cbiAgICAvLyBmaWx0ZXIgb3V0IG90aGVyIG5vZGVzIGluIHRoZSB2aWV3IHJlZiBzbyB3ZSBhcmUgb25seSBsZWZ0IHdpdGggZWxlbWVudCBub2Rlc1xuICAgIGNvbnN0IGVsZW1lbnROb2RlczogSFRNTEVsZW1lbnRbXSA9IGVtYmVkZGVkVmlld1JlZi5yb290Tm9kZXMuZmlsdGVyKChub2RlOiBhbnkpID0+IHtcbiAgICAgIHJldHVybiBub2RlLm5vZGVUeXBlID09PSAxO1xuICAgIH0pO1xuXG4gICAgLy8gd2UgdGFrZSB0aGUgZmlyc3QgZWxlbWVudCBub2RlIGluIHRoZSBlbWJlZGRlZCB2aWV3OyB1c3VhbGx5IHRoZXJlIHNob3VsZCBvbmx5IGJlIG9uZSBhbnl3YXlzXG4gICAgdGhpcy5fcG9wb3Zlckluc3RhbmNlID0gbmV3IFBvcG92ZXIoZWxlbWVudE5vZGVzWzBdKTtcbiAgICB0aGlzLl9zdWJzY3JpcHRpb24gPSB0aGlzLl9wb3BvdmVySW5zdGFuY2VcbiAgICAgIC5hbmNob3IodGhpcy5hbmNob3JFbGVtLCB0aGlzLmFuY2hvclBvaW50LCB0aGlzLnBvcG92ZXJQb2ludCwgdGhpcy5wb3BvdmVyT3B0aW9ucylcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmNsclBvcG92ZXJPbGRDaGFuZ2UuZW1pdChmYWxzZSk7XG4gICAgICB9KTtcbiAgICBvcGVuQ291bnQrKztcbiAgfVxuXG4gIGRlc3Ryb3lQb3BvdmVyKCkge1xuICAgIGlmICh0aGlzLl9wb3BvdmVySW5zdGFuY2UpIHtcbiAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgdGhpcy5fcG9wb3Zlckluc3RhbmNlLnJlbGVhc2UoKTtcbiAgICAgIGRlbGV0ZSB0aGlzLl9wb3BvdmVySW5zdGFuY2U7XG4gICAgICBvcGVuQ291bnQtLTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmRlc3Ryb3lQb3BvdmVyKCk7XG4gIH1cbn1cbiJdfQ==