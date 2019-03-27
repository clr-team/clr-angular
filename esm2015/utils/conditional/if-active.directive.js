/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive, EventEmitter, Inject, Input, Output, TemplateRef, ViewContainerRef, } from '@angular/core';
import { IF_ACTIVE_ID, IfActiveService } from './if-active.service';
/**********
 *
 * @class ClrIfActive
 *
 * @description
 * A structural directive that controls whether or not the associated TemplateRef is instantiated or not.
 * It makes use of a Component instance level service: IfActiveService to maintain state between itself and
 * the component using it in the component template.
 *
 */
export class ClrIfActive {
    /**
     * @param {?} ifActiveService
     * @param {?} id
     * @param {?} template
     * @param {?} container
     */
    constructor(ifActiveService, id, template, container) {
        this.ifActiveService = ifActiveService;
        this.id = id;
        this.template = template;
        this.container = container;
        this.wasActive = false;
        /**
         * *******
         * \@property activeChange
         *
         * \@description
         * An event emitter that emits when the active property is set to allow for 2way binding when the directive is
         * used with de-structured / de-sugared syntax.
         *
         */
        this.activeChange = new EventEmitter(false);
        this.checkAndUpdateView(ifActiveService.current);
        this.subscription = this.ifActiveService.currentChange.subscribe((/**
         * @param {?} newCurrentId
         * @return {?}
         */
        newCurrentId => {
            this.checkAndUpdateView(newCurrentId);
        }));
    }
    /**
     * @private
     * @param {?} currentId
     * @return {?}
     */
    checkAndUpdateView(currentId) {
        /** @type {?} */
        const isNowActive = currentId === this.id;
        // only emit if the new active state is changed since last time.
        if (isNowActive !== this.wasActive) {
            this.updateView(isNowActive);
            this.activeChange.emit(isNowActive);
            this.wasActive = isNowActive;
        }
    }
    /**
     * ******
     *
     * \@description
     * A setter that updates IfActiveService.active with value.
     *
     * @param {?} value
     * @return {?}
     */
    set active(value) {
        if (value) {
            this.ifActiveService.current = this.id;
        }
    }
    /**
     * *****
     *
     * \@description
     * A getter that returns the current IfActiveService.active value.
     * @return {?}
     */
    get active() {
        return this.ifActiveService.current === this.id;
    }
    /**
     * ******
     *
     * \@description
     * Function that takes a any value and either created an embedded view for the associated ViewContainerRef or,
     * Clears all views from the ViewContainerRef
     * @param {?} value
     * @return {?}
     */
    updateView(value) {
        if (value) {
            this.container.createEmbeddedView(this.template);
        }
        else {
            this.container.clear();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
ClrIfActive.decorators = [
    { type: Directive, args: [{ selector: '[clrIfActive]' },] }
];
/** @nocollapse */
ClrIfActive.ctorParameters = () => [
    { type: IfActiveService },
    { type: Number, decorators: [{ type: Inject, args: [IF_ACTIVE_ID,] }] },
    { type: TemplateRef },
    { type: ViewContainerRef }
];
ClrIfActive.propDecorators = {
    active: [{ type: Input, args: ['clrIfActive',] }],
    activeChange: [{ type: Output, args: ['clrIfActiveChange',] }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    ClrIfActive.prototype.subscription;
    /**
     * @type {?}
     * @private
     */
    ClrIfActive.prototype.wasActive;
    /**
     * *******
     * \@property activeChange
     *
     * \@description
     * An event emitter that emits when the active property is set to allow for 2way binding when the directive is
     * used with de-structured / de-sugared syntax.
     *
     * @type {?}
     */
    ClrIfActive.prototype.activeChange;
    /**
     * @type {?}
     * @private
     */
    ClrIfActive.prototype.ifActiveService;
    /**
     * @type {?}
     * @private
     */
    ClrIfActive.prototype.id;
    /**
     * @type {?}
     * @private
     */
    ClrIfActive.prototype.template;
    /**
     * @type {?}
     * @private
     */
    ClrIfActive.prototype.container;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWYtYWN0aXZlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbInV0aWxzL2NvbmRpdGlvbmFsL2lmLWFjdGl2ZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUNMLFNBQVMsRUFDVCxZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFFTCxNQUFNLEVBQ04sV0FBVyxFQUNYLGdCQUFnQixHQUNqQixNQUFNLGVBQWUsQ0FBQztBQUd2QixPQUFPLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBSXBFOzs7Ozs7Ozs7R0FTRztBQUNILE1BQU0sT0FBTyxXQUFXOzs7Ozs7O0lBSXRCLFlBQ1UsZUFBZ0MsRUFDVixFQUFVLEVBQ2hDLFFBQTBCLEVBQzFCLFNBQTJCO1FBSDNCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNWLE9BQUUsR0FBRixFQUFFLENBQVE7UUFDaEMsYUFBUSxHQUFSLFFBQVEsQ0FBa0I7UUFDMUIsY0FBUyxHQUFULFNBQVMsQ0FBa0I7UUFON0IsY0FBUyxHQUFZLEtBQUssQ0FBQzs7Ozs7Ozs7OztRQStDTixpQkFBWSxHQUEwQixJQUFJLFlBQVksQ0FBVSxLQUFLLENBQUMsQ0FBQztRQXZDbEcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVqRCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLFNBQVM7Ozs7UUFBQyxZQUFZLENBQUMsRUFBRTtZQUM5RSxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDeEMsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7Ozs7SUFFTyxrQkFBa0IsQ0FBQyxTQUFpQjs7Y0FDcEMsV0FBVyxHQUFHLFNBQVMsS0FBSyxJQUFJLENBQUMsRUFBRTtRQUN6QyxnRUFBZ0U7UUFDaEUsSUFBSSxXQUFXLEtBQUssSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNsQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzdCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDO1NBQzlCO0lBQ0gsQ0FBQzs7Ozs7Ozs7OztJQVNELElBQ1csTUFBTSxDQUFDLEtBQWM7UUFDOUIsSUFBSSxLQUFLLEVBQUU7WUFDVCxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO1NBQ3hDO0lBQ0gsQ0FBQzs7Ozs7Ozs7SUFpQkQsSUFBVyxNQUFNO1FBQ2YsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQ2xELENBQUM7Ozs7Ozs7Ozs7SUFTTSxVQUFVLENBQUMsS0FBYztRQUM5QixJQUFJLEtBQUssRUFBRTtZQUNULElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ2xEO2FBQU07WUFDTCxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ3hCO0lBQ0gsQ0FBQzs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2xDLENBQUM7OztZQXpGRixTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsZUFBZSxFQUFFOzs7O1lBRmpCLGVBQWU7eUNBb0JqQyxNQUFNLFNBQUMsWUFBWTtZQXpCdEIsV0FBVztZQUNYLGdCQUFnQjs7O3FCQW9EZixLQUFLLFNBQUMsYUFBYTsyQkFlbkIsTUFBTSxTQUFDLG1CQUFtQjs7Ozs7OztJQWhEM0IsbUNBQW1DOzs7OztJQUNuQyxnQ0FBbUM7Ozs7Ozs7Ozs7O0lBK0NuQyxtQ0FBb0c7Ozs7O0lBNUNsRyxzQ0FBd0M7Ozs7O0lBQ3hDLHlCQUF3Qzs7Ozs7SUFDeEMsK0JBQWtDOzs7OztJQUNsQyxnQ0FBbUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3Q29udGFpbmVyUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBJRl9BQ1RJVkVfSUQsIElmQWN0aXZlU2VydmljZSB9IGZyb20gJy4vaWYtYWN0aXZlLnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbY2xySWZBY3RpdmVdJyB9KVxuXG4vKioqKioqKioqKlxuICpcbiAqIEBjbGFzcyBDbHJJZkFjdGl2ZVxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogQSBzdHJ1Y3R1cmFsIGRpcmVjdGl2ZSB0aGF0IGNvbnRyb2xzIHdoZXRoZXIgb3Igbm90IHRoZSBhc3NvY2lhdGVkIFRlbXBsYXRlUmVmIGlzIGluc3RhbnRpYXRlZCBvciBub3QuXG4gKiBJdCBtYWtlcyB1c2Ugb2YgYSBDb21wb25lbnQgaW5zdGFuY2UgbGV2ZWwgc2VydmljZTogSWZBY3RpdmVTZXJ2aWNlIHRvIG1haW50YWluIHN0YXRlIGJldHdlZW4gaXRzZWxmIGFuZFxuICogdGhlIGNvbXBvbmVudCB1c2luZyBpdCBpbiB0aGUgY29tcG9uZW50IHRlbXBsYXRlLlxuICpcbiAqL1xuZXhwb3J0IGNsYXNzIENscklmQWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSB3YXNBY3RpdmU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGlmQWN0aXZlU2VydmljZTogSWZBY3RpdmVTZXJ2aWNlLFxuICAgIEBJbmplY3QoSUZfQUNUSVZFX0lEKSBwcml2YXRlIGlkOiBudW1iZXIsXG4gICAgcHJpdmF0ZSB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PixcbiAgICBwcml2YXRlIGNvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZlxuICApIHtcbiAgICB0aGlzLmNoZWNrQW5kVXBkYXRlVmlldyhpZkFjdGl2ZVNlcnZpY2UuY3VycmVudCk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IHRoaXMuaWZBY3RpdmVTZXJ2aWNlLmN1cnJlbnRDaGFuZ2Uuc3Vic2NyaWJlKG5ld0N1cnJlbnRJZCA9PiB7XG4gICAgICB0aGlzLmNoZWNrQW5kVXBkYXRlVmlldyhuZXdDdXJyZW50SWQpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBjaGVja0FuZFVwZGF0ZVZpZXcoY3VycmVudElkOiBudW1iZXIpIHtcbiAgICBjb25zdCBpc05vd0FjdGl2ZSA9IGN1cnJlbnRJZCA9PT0gdGhpcy5pZDtcbiAgICAvLyBvbmx5IGVtaXQgaWYgdGhlIG5ldyBhY3RpdmUgc3RhdGUgaXMgY2hhbmdlZCBzaW5jZSBsYXN0IHRpbWUuXG4gICAgaWYgKGlzTm93QWN0aXZlICE9PSB0aGlzLndhc0FjdGl2ZSkge1xuICAgICAgdGhpcy51cGRhdGVWaWV3KGlzTm93QWN0aXZlKTtcbiAgICAgIHRoaXMuYWN0aXZlQ2hhbmdlLmVtaXQoaXNOb3dBY3RpdmUpO1xuICAgICAgdGhpcy53YXNBY3RpdmUgPSBpc05vd0FjdGl2ZTtcbiAgICB9XG4gIH1cblxuICAvKioqKioqKioqXG4gICAqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBBIHNldHRlciB0aGF0IHVwZGF0ZXMgSWZBY3RpdmVTZXJ2aWNlLmFjdGl2ZSB3aXRoIHZhbHVlLlxuICAgKlxuICAgKiBAcGFyYW0gdmFsdWVcbiAgICovXG4gIEBJbnB1dCgnY2xySWZBY3RpdmUnKVxuICBwdWJsaWMgc2V0IGFjdGl2ZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdGhpcy5pZkFjdGl2ZVNlcnZpY2UuY3VycmVudCA9IHRoaXMuaWQ7XG4gICAgfVxuICB9XG5cbiAgLyoqKioqKioqKipcbiAgICogQHByb3BlcnR5IGFjdGl2ZUNoYW5nZVxuICAgKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogQW4gZXZlbnQgZW1pdHRlciB0aGF0IGVtaXRzIHdoZW4gdGhlIGFjdGl2ZSBwcm9wZXJ0eSBpcyBzZXQgdG8gYWxsb3cgZm9yIDJ3YXkgYmluZGluZyB3aGVuIHRoZSBkaXJlY3RpdmUgaXNcbiAgICogdXNlZCB3aXRoIGRlLXN0cnVjdHVyZWQgLyBkZS1zdWdhcmVkIHN5bnRheC5cbiAgICpcbiAgICovXG4gIEBPdXRwdXQoJ2NscklmQWN0aXZlQ2hhbmdlJykgYWN0aXZlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KGZhbHNlKTtcblxuICAvKioqKioqKipcbiAgICpcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIEEgZ2V0dGVyIHRoYXQgcmV0dXJucyB0aGUgY3VycmVudCBJZkFjdGl2ZVNlcnZpY2UuYWN0aXZlIHZhbHVlLlxuICAgKi9cbiAgcHVibGljIGdldCBhY3RpdmUoKSB7XG4gICAgcmV0dXJuIHRoaXMuaWZBY3RpdmVTZXJ2aWNlLmN1cnJlbnQgPT09IHRoaXMuaWQ7XG4gIH1cblxuICAvKioqKioqKioqXG4gICAqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBGdW5jdGlvbiB0aGF0IHRha2VzIGEgYW55IHZhbHVlIGFuZCBlaXRoZXIgY3JlYXRlZCBhbiBlbWJlZGRlZCB2aWV3IGZvciB0aGUgYXNzb2NpYXRlZCBWaWV3Q29udGFpbmVyUmVmIG9yLFxuICAgKiBDbGVhcnMgYWxsIHZpZXdzIGZyb20gdGhlIFZpZXdDb250YWluZXJSZWZcbiAgICogQHBhcmFtIHZhbHVlXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlVmlldyh2YWx1ZTogYm9vbGVhbikge1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdGhpcy5jb250YWluZXIuY3JlYXRlRW1iZWRkZWRWaWV3KHRoaXMudGVtcGxhdGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvbnRhaW5lci5jbGVhcigpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==