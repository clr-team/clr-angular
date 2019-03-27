/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { ElementRef, HostBinding, Injectable, Injector, Renderer2, SkipSelf, } from '@angular/core';
import { IfOpenService } from '../../utils/conditional/if-open.service';
import { ESC } from '../../utils/key-codes/key-codes';
import { Popover } from './popover';
// Literally any annotation would work here, but writing our own @HoneyBadger annotation feels overkill.
/**
 * @abstract
 */
export class AbstractPopover {
    /**
     * @param {?} injector
     * @param {?} parentHost
     */
    constructor(injector, parentHost) {
        this.parentHost = parentHost;
        this.updateAnchor = false;
        this.popoverOptions = {};
        /*
             * Until https://github.com/angular/angular/issues/8785 is supported, we don't have any way to instantiate
             * a separate directive on the host. So let's do dirty but performant for now.
             */
        this.closeOnOutsideClick = false;
        this.el = injector.get(ElementRef);
        this.ifOpenService = injector.get(IfOpenService);
        this.renderer = injector.get(Renderer2);
        // Default anchor is the parent host
        this.anchorElem = parentHost.nativeElement;
        this.popoverInstance = new Popover(this.el.nativeElement);
        this.subscription = this.ifOpenService.openChange.subscribe((/**
         * @param {?} change
         * @return {?}
         */
        change => {
            if (change) {
                this.anchor();
                this.attachESCListener();
            }
            else {
                this.release();
                this.detachESCListener();
            }
        }));
        if (this.ifOpenService.open) {
            this.anchor();
            this.attachESCListener();
        }
    }
    /**
     * @protected
     * @return {?}
     */
    anchor() {
        this.updateAnchor = true;
        // Ugh
        this.ignore = this.ifOpenService.originalEvent;
    }
    /**
     * @protected
     * @return {?}
     */
    release() {
        this.detachOutsideClickListener();
        this.popoverInstance.release();
    }
    /**
     * @return {?}
     */
    ngAfterViewChecked() {
        if (this.updateAnchor) {
            this.updateAnchor = false;
            this.popoverInstance
                .anchor(this.anchorElem, this.anchorPoint, this.popoverPoint, this.popoverOptions)
                .subscribe((/**
             * @return {?}
             */
            () => {
                // if a scroll event is detected, close the popover
                this.ifOpenService.open = false;
            }));
            this.attachOutsideClickListener();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.release();
        this.detachESCListener();
        this.subscription.unsubscribe();
    }
    /*
         * Fallback to hide when *clrIfOpen is not being used
         */
    /**
     * @return {?}
     */
    get isOffScreen() {
        return this.ifOpenService.open ? false : true;
    }
    /**
     * @private
     * @return {?}
     */
    attachESCListener() {
        this.documentESCListener = this.renderer.listen('document', 'keydown', (/**
         * @param {?} event
         * @return {?}
         */
        event => {
            if (event && event.keyCode === ESC) {
                this.ifOpenService.open = false;
            }
        }));
    }
    /**
     * @private
     * @return {?}
     */
    detachESCListener() {
        if (this.documentESCListener) {
            this.documentESCListener();
            delete this.documentESCListener;
        }
    }
    /**
     * @private
     * @return {?}
     */
    attachOutsideClickListener() {
        if (this.closeOnOutsideClick) {
            this.hostClickListener = this.renderer.listen(this.el.nativeElement, 'click', (/**
             * @param {?} event
             * @return {?}
             */
            event => (this.ignore = event)));
            if (this.ignoredElement) {
                this.ignoredElementClickListener = this.renderer.listen(this.ignoredElement, 'click', (/**
                 * @param {?} event
                 * @return {?}
                 */
                event => (this.ignore = event)));
            }
            this.documentClickListener = this.renderer.listen('document', 'click', (/**
             * @param {?} event
             * @return {?}
             */
            event => {
                if (event === this.ignore) {
                    delete this.ignore;
                }
                else {
                    this.ifOpenService.open = false;
                }
            }));
        }
    }
    /**
     * @private
     * @return {?}
     */
    detachOutsideClickListener() {
        if (this.closeOnOutsideClick) {
            if (this.hostClickListener) {
                this.hostClickListener();
                delete this.hostClickListener;
            }
            if (this.ignoredElementClickListener) {
                this.ignoredElementClickListener();
                delete this.ignoredElementClickListener;
            }
            if (this.documentClickListener) {
                this.documentClickListener();
                delete this.documentClickListener;
            }
        }
    }
}
AbstractPopover.decorators = [
    { type: Injectable }
];
/** @nocollapse */
AbstractPopover.ctorParameters = () => [
    { type: Injector },
    { type: ElementRef, decorators: [{ type: SkipSelf }] }
];
AbstractPopover.propDecorators = {
    isOffScreen: [{ type: HostBinding, args: ['class.is-off-screen',] }]
};
if (false) {
    /**
     * @type {?}
     * @protected
     */
    AbstractPopover.prototype.el;
    /**
     * @type {?}
     * @protected
     */
    AbstractPopover.prototype.ifOpenService;
    /**
     * @type {?}
     * @protected
     */
    AbstractPopover.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    AbstractPopover.prototype.popoverInstance;
    /**
     * @type {?}
     * @private
     */
    AbstractPopover.prototype.subscription;
    /**
     * @type {?}
     * @private
     */
    AbstractPopover.prototype.updateAnchor;
    /**
     * @type {?}
     * @protected
     */
    AbstractPopover.prototype.anchorElem;
    /**
     * @type {?}
     * @protected
     */
    AbstractPopover.prototype.anchorPoint;
    /**
     * @type {?}
     * @protected
     */
    AbstractPopover.prototype.popoverPoint;
    /**
     * @type {?}
     * @protected
     */
    AbstractPopover.prototype.popoverOptions;
    /**
     * @type {?}
     * @protected
     */
    AbstractPopover.prototype.ignoredElement;
    /** @type {?} */
    AbstractPopover.prototype.closeOnOutsideClick;
    /**
     * @type {?}
     * @private
     */
    AbstractPopover.prototype.hostClickListener;
    /**
     * @type {?}
     * @private
     */
    AbstractPopover.prototype.documentClickListener;
    /**
     * @type {?}
     * @private
     */
    AbstractPopover.prototype.documentESCListener;
    /**
     * @type {?}
     * @private
     */
    AbstractPopover.prototype.ignoredElementClickListener;
    /**
     * @type {?}
     * @private
     */
    AbstractPopover.prototype.ignore;
    /**
     * @type {?}
     * @protected
     */
    AbstractPopover.prototype.parentHost;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzdHJhY3QtcG9wb3Zlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbInBvcG92ZXIvY29tbW9uL2Fic3RyYWN0LXBvcG92ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUVMLFVBQVUsRUFDVixXQUFXLEVBQ1gsVUFBVSxFQUNWLFFBQVEsRUFFUixTQUFTLEVBQ1QsUUFBUSxHQUNULE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFFdEQsT0FBTyxFQUFTLE9BQU8sRUFBRSxNQUFNLFdBQVcsQ0FBQzs7Ozs7QUFLM0MsTUFBTSxPQUFnQixlQUFlOzs7OztJQUNuQyxZQUFZLFFBQWtCLEVBQXdCLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7UUE4QnBFLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBS25CLG1CQUFjLEdBQW1CLEVBQUUsQ0FBQzs7Ozs7UUErQ3ZDLHdCQUFtQixHQUFHLEtBQUssQ0FBQztRQWpGakMsSUFBSSxDQUFDLEVBQUUsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDeEMsb0NBQW9DO1FBQ3BDLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDLGFBQWEsQ0FBQztRQUUzQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENB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Ozs7SUFsRGxDLDZCQUF5Qjs7Ozs7SUFDekIsd0NBQXVDOzs7OztJQUN2QyxtQ0FBOEI7Ozs7O0lBRTlCLDBDQUFpQzs7Ozs7SUFDakMsdUNBQW1DOzs7OztJQUVuQyx1Q0FBNkI7Ozs7O0lBRTdCLHFDQUEwQjs7Ozs7SUFDMUIsc0NBQTZCOzs7OztJQUM3Qix1Q0FBOEI7Ozs7O0lBQzlCLHlDQUE4Qzs7Ozs7SUFFOUMseUNBQThCOztJQTZDOUIsOENBQW1DOzs7OztJQUNuQyw0Q0FBc0M7Ozs7O0lBQ3RDLGdEQUEwQzs7Ozs7SUFDMUMsOENBQXdDOzs7OztJQUN4QyxzREFBZ0Q7Ozs7O0lBQ2hELGlDQUFvQjs7Ozs7SUF2RlkscUNBQTRDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3Q2hlY2tlZCxcbiAgRWxlbWVudFJlZixcbiAgSG9zdEJpbmRpbmcsXG4gIEluamVjdGFibGUsXG4gIEluamVjdG9yLFxuICBPbkRlc3Ryb3ksXG4gIFJlbmRlcmVyMixcbiAgU2tpcFNlbGYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IElmT3BlblNlcnZpY2UgfSBmcm9tICcuLi8uLi91dGlscy9jb25kaXRpb25hbC9pZi1vcGVuLnNlcnZpY2UnO1xuaW1wb3J0IHsgRVNDIH0gZnJvbSAnLi4vLi4vdXRpbHMva2V5LWNvZGVzL2tleS1jb2Rlcyc7XG5cbmltcG9ydCB7IFBvaW50LCBQb3BvdmVyIH0gZnJvbSAnLi9wb3BvdmVyJztcbmltcG9ydCB7IFBvcG92ZXJPcHRpb25zIH0gZnJvbSAnLi9wb3BvdmVyLW9wdGlvbnMuaW50ZXJmYWNlJztcblxuLy8gTGl0ZXJhbGx5IGFueSBhbm5vdGF0aW9uIHdvdWxkIHdvcmsgaGVyZSwgYnV0IHdyaXRpbmcgb3VyIG93biBASG9uZXlCYWRnZXIgYW5ub3RhdGlvbiBmZWVscyBvdmVya2lsbC5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBYnN0cmFjdFBvcG92ZXIgaW1wbGVtZW50cyBBZnRlclZpZXdDaGVja2VkLCBPbkRlc3Ryb3kge1xuICBjb25zdHJ1Y3RvcihpbmplY3RvcjogSW5qZWN0b3IsIEBTa2lwU2VsZigpIHByb3RlY3RlZCBwYXJlbnRIb3N0OiBFbGVtZW50UmVmKSB7XG4gICAgdGhpcy5lbCA9IGluamVjdG9yLmdldChFbGVtZW50UmVmKTtcbiAgICB0aGlzLmlmT3BlblNlcnZpY2UgPSBpbmplY3Rvci5nZXQoSWZPcGVuU2VydmljZSk7XG4gICAgdGhpcy5yZW5kZXJlciA9IGluamVjdG9yLmdldChSZW5kZXJlcjIpO1xuICAgIC8vIERlZmF1bHQgYW5jaG9yIGlzIHRoZSBwYXJlbnQgaG9zdFxuICAgIHRoaXMuYW5jaG9yRWxlbSA9IHBhcmVudEhvc3QubmF0aXZlRWxlbWVudDtcblxuICAgIHRoaXMucG9wb3Zlckluc3RhbmNlID0gbmV3IFBvcG92ZXIodGhpcy5lbC5uYXRpdmVFbGVtZW50KTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IHRoaXMuaWZPcGVuU2VydmljZS5vcGVuQ2hhbmdlLnN1YnNjcmliZShjaGFuZ2UgPT4ge1xuICAgICAgaWYgKGNoYW5nZSkge1xuICAgICAgICB0aGlzLmFuY2hvcigpO1xuICAgICAgICB0aGlzLmF0dGFjaEVTQ0xpc3RlbmVyKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJlbGVhc2UoKTtcbiAgICAgICAgdGhpcy5kZXRhY2hFU0NMaXN0ZW5lcigpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmICh0aGlzLmlmT3BlblNlcnZpY2Uub3Blbikge1xuICAgICAgdGhpcy5hbmNob3IoKTtcbiAgICAgIHRoaXMuYXR0YWNoRVNDTGlzdGVuZXIoKTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgZWw6IEVsZW1lbnRSZWY7XG4gIHByb3RlY3RlZCBpZk9wZW5TZXJ2aWNlOiBJZk9wZW5TZXJ2aWNlO1xuICBwcm90ZWN0ZWQgcmVuZGVyZXI6IFJlbmRlcmVyMjtcblxuICBwcml2YXRlIHBvcG92ZXJJbnN0YW5jZTogUG9wb3ZlcjtcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICBwcml2YXRlIHVwZGF0ZUFuY2hvciA9IGZhbHNlO1xuXG4gIHByb3RlY3RlZCBhbmNob3JFbGVtOiBhbnk7XG4gIHByb3RlY3RlZCBhbmNob3JQb2ludDogUG9pbnQ7XG4gIHByb3RlY3RlZCBwb3BvdmVyUG9pbnQ6IFBvaW50O1xuICBwcm90ZWN0ZWQgcG9wb3Zlck9wdGlvbnM6IFBvcG92ZXJPcHRpb25zID0ge307XG5cbiAgcHJvdGVjdGVkIGlnbm9yZWRFbGVtZW50OiBhbnk7XG5cbiAgcHJvdGVjdGVkIGFuY2hvcigpIHtcbiAgICB0aGlzLnVwZGF0ZUFuY2hvciA9IHRydWU7XG4gICAgLy8gVWdoXG4gICAgdGhpcy5pZ25vcmUgPSB0aGlzLmlmT3BlblNlcnZpY2Uub3JpZ2luYWxFdmVudDtcbiAgfVxuXG4gIHByb3RlY3RlZCByZWxlYXNlKCkge1xuICAgIHRoaXMuZGV0YWNoT3V0c2lkZUNsaWNrTGlzdGVuZXIoKTtcbiAgICB0aGlzLnBvcG92ZXJJbnN0YW5jZS5yZWxlYXNlKCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0NoZWNrZWQoKSB7XG4gICAgaWYgKHRoaXMudXBkYXRlQW5jaG9yKSB7XG4gICAgICB0aGlzLnVwZGF0ZUFuY2hvciA9IGZhbHNlO1xuICAgICAgdGhpcy5wb3BvdmVySW5zdGFuY2VcbiAgICAgICAgLmFuY2hvcih0aGlzLmFuY2hvckVsZW0sIHRoaXMuYW5jaG9yUG9pbnQsIHRoaXMucG9wb3ZlclBvaW50LCB0aGlzLnBvcG92ZXJPcHRpb25zKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAvLyBpZiBhIHNjcm9sbCBldmVudCBpcyBkZXRlY3RlZCwgY2xvc2UgdGhlIHBvcG92ZXJcbiAgICAgICAgICB0aGlzLmlmT3BlblNlcnZpY2Uub3BlbiA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgIHRoaXMuYXR0YWNoT3V0c2lkZUNsaWNrTGlzdGVuZXIoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnJlbGVhc2UoKTtcbiAgICB0aGlzLmRldGFjaEVTQ0xpc3RlbmVyKCk7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIC8qXG4gICAgICogRmFsbGJhY2sgdG8gaGlkZSB3aGVuICpjbHJJZk9wZW4gaXMgbm90IGJlaW5nIHVzZWRcbiAgICAgKi9cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmlzLW9mZi1zY3JlZW4nKVxuICBnZXQgaXNPZmZTY3JlZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuaWZPcGVuU2VydmljZS5vcGVuID8gZmFsc2UgOiB0cnVlO1xuICB9XG5cbiAgLypcbiAgICAgKiBVbnRpbCBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy84Nzg1IGlzIHN1cHBvcnRlZCwgd2UgZG9uJ3QgaGF2ZSBhbnkgd2F5IHRvIGluc3RhbnRpYXRlXG4gICAgICogYSBzZXBhcmF0ZSBkaXJlY3RpdmUgb24gdGhlIGhvc3QuIFNvIGxldCdzIGRvIGRpcnR5IGJ1dCBwZXJmb3JtYW50IGZvciBub3cuXG4gICAgICovXG4gIHB1YmxpYyBjbG9zZU9uT3V0c2lkZUNsaWNrID0gZmFsc2U7XG4gIHByaXZhdGUgaG9zdENsaWNrTGlzdGVuZXI6ICgpID0+IHZvaWQ7XG4gIHByaXZhdGUgZG9jdW1lbnRDbGlja0xpc3RlbmVyOiAoKSA9PiB2b2lkO1xuICBwcml2YXRlIGRvY3VtZW50RVNDTGlzdGVuZXI6ICgpID0+IHZvaWQ7XG4gIHByaXZhdGUgaWdub3JlZEVsZW1lbnRDbGlja0xpc3RlbmVyOiAoKSA9PiB2b2lkO1xuICBwcml2YXRlIGlnbm9yZTogYW55O1xuXG4gIHByaXZhdGUgYXR0YWNoRVNDTGlzdGVuZXIoKTogdm9pZCB7XG4gICAgdGhpcy5kb2N1bWVudEVTQ0xpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oJ2RvY3VtZW50JywgJ2tleWRvd24nLCBldmVudCA9PiB7XG4gICAgICBpZiAoZXZlbnQgJiYgZXZlbnQua2V5Q29kZSA9PT0gRVNDKSB7XG4gICAgICAgIHRoaXMuaWZPcGVuU2VydmljZS5vcGVuID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGRldGFjaEVTQ0xpc3RlbmVyKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRvY3VtZW50RVNDTGlzdGVuZXIpIHtcbiAgICAgIHRoaXMuZG9jdW1lbnRFU0NMaXN0ZW5lcigpO1xuICAgICAgZGVsZXRlIHRoaXMuZG9jdW1lbnRFU0NMaXN0ZW5lcjtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGF0dGFjaE91dHNpZGVDbGlja0xpc3RlbmVyKCkge1xuICAgIGlmICh0aGlzLmNsb3NlT25PdXRzaWRlQ2xpY2spIHtcbiAgICAgIHRoaXMuaG9zdENsaWNrTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdjbGljaycsIGV2ZW50ID0+ICh0aGlzLmlnbm9yZSA9IGV2ZW50KSk7XG4gICAgICBpZiAodGhpcy5pZ25vcmVkRWxlbWVudCkge1xuICAgICAgICB0aGlzLmlnbm9yZWRFbGVtZW50Q2xpY2tMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKFxuICAgICAgICAgIHRoaXMuaWdub3JlZEVsZW1lbnQsXG4gICAgICAgICAgJ2NsaWNrJyxcbiAgICAgICAgICBldmVudCA9PiAodGhpcy5pZ25vcmUgPSBldmVudClcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oJ2RvY3VtZW50JywgJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICBpZiAoZXZlbnQgPT09IHRoaXMuaWdub3JlKSB7XG4gICAgICAgICAgZGVsZXRlIHRoaXMuaWdub3JlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuaWZPcGVuU2VydmljZS5vcGVuID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZGV0YWNoT3V0c2lkZUNsaWNrTGlzdGVuZXIoKSB7XG4gICAgaWYgKHRoaXMuY2xvc2VPbk91dHNpZGVDbGljaykge1xuICAgICAgaWYgKHRoaXMuaG9zdENsaWNrTGlzdGVuZXIpIHtcbiAgICAgICAgdGhpcy5ob3N0Q2xpY2tMaXN0ZW5lcigpO1xuICAgICAgICBkZWxldGUgdGhpcy5ob3N0Q2xpY2tMaXN0ZW5lcjtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmlnbm9yZWRFbGVtZW50Q2xpY2tMaXN0ZW5lcikge1xuICAgICAgICB0aGlzLmlnbm9yZWRFbGVtZW50Q2xpY2tMaXN0ZW5lcigpO1xuICAgICAgICBkZWxldGUgdGhpcy5pZ25vcmVkRWxlbWVudENsaWNrTGlzdGVuZXI7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIpIHtcbiAgICAgICAgdGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIoKTtcbiAgICAgICAgZGVsZXRlIHRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19