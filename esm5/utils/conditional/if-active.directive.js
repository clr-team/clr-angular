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
var ClrIfActive = /** @class */ (function () {
    function ClrIfActive(ifActiveService, id, template, container) {
        var _this = this;
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
        function (newCurrentId) {
            _this.checkAndUpdateView(newCurrentId);
        }));
    }
    /**
     * @private
     * @param {?} currentId
     * @return {?}
     */
    ClrIfActive.prototype.checkAndUpdateView = /**
     * @private
     * @param {?} currentId
     * @return {?}
     */
    function (currentId) {
        /** @type {?} */
        var isNowActive = currentId === this.id;
        // only emit if the new active state is changed since last time.
        if (isNowActive !== this.wasActive) {
            this.updateView(isNowActive);
            this.activeChange.emit(isNowActive);
            this.wasActive = isNowActive;
        }
    };
    Object.defineProperty(ClrIfActive.prototype, "active", {
        /********
         *
         * @description
         * A getter that returns the current IfActiveService.active value.
         */
        get: /**
         * *****
         *
         * \@description
         * A getter that returns the current IfActiveService.active value.
         * @return {?}
         */
        function () {
            return this.ifActiveService.current === this.id;
        },
        /*********
         *
         * @description
         * A setter that updates IfActiveService.active with value.
         *
         * @param value
         */
        set: /**
         * ******
         *
         * \@description
         * A setter that updates IfActiveService.active with value.
         *
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value) {
                this.ifActiveService.current = this.id;
            }
        },
        enumerable: true,
        configurable: true
    });
    /*********
     *
     * @description
     * Function that takes a any value and either created an embedded view for the associated ViewContainerRef or,
     * Clears all views from the ViewContainerRef
     * @param value
     */
    /**
     * ******
     *
     * \@description
     * Function that takes a any value and either created an embedded view for the associated ViewContainerRef or,
     * Clears all views from the ViewContainerRef
     * @param {?} value
     * @return {?}
     */
    ClrIfActive.prototype.updateView = /**
     * ******
     *
     * \@description
     * Function that takes a any value and either created an embedded view for the associated ViewContainerRef or,
     * Clears all views from the ViewContainerRef
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value) {
            this.container.createEmbeddedView(this.template);
        }
        else {
            this.container.clear();
        }
    };
    /**
     * @return {?}
     */
    ClrIfActive.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subscription.unsubscribe();
    };
    ClrIfActive.decorators = [
        { type: Directive, args: [{ selector: '[clrIfActive]' },] }
    ];
    /** @nocollapse */
    ClrIfActive.ctorParameters = function () { return [
        { type: IfActiveService },
        { type: Number, decorators: [{ type: Inject, args: [IF_ACTIVE_ID,] }] },
        { type: TemplateRef },
        { type: ViewContainerRef }
    ]; };
    ClrIfActive.propDecorators = {
        active: [{ type: Input, args: ['clrIfActive',] }],
        activeChange: [{ type: Output, args: ['clrIfActiveChange',] }]
    };
    return ClrIfActive;
}());
export { ClrIfActive };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWYtYWN0aXZlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbInV0aWxzL2NvbmRpdGlvbmFsL2lmLWFjdGl2ZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUNMLFNBQVMsRUFDVCxZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFFTCxNQUFNLEVBQ04sV0FBVyxFQUNYLGdCQUFnQixHQUNqQixNQUFNLGVBQWUsQ0FBQztBQUd2QixPQUFPLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRXBFO0lBZ0JFLHFCQUNVLGVBQWdDLEVBQ1YsRUFBVSxFQUNoQyxRQUEwQixFQUMxQixTQUEyQjtRQUpyQyxpQkFXQztRQVZTLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNWLE9BQUUsR0FBRixFQUFFLENBQVE7UUFDaEMsYUFBUSxHQUFSLFFBQVEsQ0FBa0I7UUFDMUIsY0FBUyxHQUFULFNBQVMsQ0FBa0I7UUFON0IsY0FBUyxHQUFZLEtBQUssQ0FBQzs7Ozs7Ozs7OztRQStDTixpQkFBWSxHQUEwQixJQUFJLFlBQVksQ0FBVSxLQUFLLENBQUMsQ0FBQztRQXZDbEcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVqRCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLFNBQVM7Ozs7UUFBQyxVQUFBLFlBQVk7WUFDM0UsS0FBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3hDLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7O0lBRU8sd0NBQWtCOzs7OztJQUExQixVQUEyQixTQUFpQjs7WUFDcEMsV0FBVyxHQUFHLFNBQVMsS0FBSyxJQUFJLENBQUMsRUFBRTtRQUN6QyxnRUFBZ0U7UUFDaEUsSUFBSSxXQUFXLEtBQUssSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNsQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzdCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDO1NBQzlCO0lBQ0gsQ0FBQztJQVNELHNCQUNXLCtCQUFNO1FBZ0JqQjs7OztXQUlHOzs7Ozs7OztRQUNIO1lBQ0UsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQ2xELENBQUM7UUEvQkQ7Ozs7OztXQU1HOzs7Ozs7Ozs7O1FBQ0gsVUFDa0IsS0FBYztZQUM5QixJQUFJLEtBQUssRUFBRTtnQkFDVCxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO2FBQ3hDO1FBQ0gsQ0FBQzs7O09BQUE7SUFxQkQ7Ozs7OztPQU1HOzs7Ozs7Ozs7O0lBQ0ksZ0NBQVU7Ozs7Ozs7OztJQUFqQixVQUFrQixLQUFjO1FBQzlCLElBQUksS0FBSyxFQUFFO1lBQ1QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDbEQ7YUFBTTtZQUNMLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDeEI7SUFDSCxDQUFDOzs7O0lBRUQsaUNBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNsQyxDQUFDOztnQkF6RkYsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLGVBQWUsRUFBRTs7OztnQkFGakIsZUFBZTs2Q0FvQmpDLE1BQU0sU0FBQyxZQUFZO2dCQXpCdEIsV0FBVztnQkFDWCxnQkFBZ0I7Ozt5QkFvRGYsS0FBSyxTQUFDLGFBQWE7K0JBZW5CLE1BQU0sU0FBQyxtQkFBbUI7O0lBNkI3QixrQkFBQztDQUFBLEFBMUZELElBMEZDO1NBOUVZLFdBQVc7Ozs7OztJQUN0QixtQ0FBbUM7Ozs7O0lBQ25DLGdDQUFtQzs7Ozs7Ozs7Ozs7SUErQ25DLG1DQUFvRzs7Ozs7SUE1Q2xHLHNDQUF3Qzs7Ozs7SUFDeEMseUJBQXdDOzs7OztJQUN4QywrQkFBa0M7Ozs7O0lBQ2xDLGdDQUFtQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE91dHB1dCxcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDb250YWluZXJSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IElGX0FDVElWRV9JRCwgSWZBY3RpdmVTZXJ2aWNlIH0gZnJvbSAnLi9pZi1hY3RpdmUuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tjbHJJZkFjdGl2ZV0nIH0pXG5cbi8qKioqKioqKioqXG4gKlxuICogQGNsYXNzIENscklmQWN0aXZlXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBBIHN0cnVjdHVyYWwgZGlyZWN0aXZlIHRoYXQgY29udHJvbHMgd2hldGhlciBvciBub3QgdGhlIGFzc29jaWF0ZWQgVGVtcGxhdGVSZWYgaXMgaW5zdGFudGlhdGVkIG9yIG5vdC5cbiAqIEl0IG1ha2VzIHVzZSBvZiBhIENvbXBvbmVudCBpbnN0YW5jZSBsZXZlbCBzZXJ2aWNlOiBJZkFjdGl2ZVNlcnZpY2UgdG8gbWFpbnRhaW4gc3RhdGUgYmV0d2VlbiBpdHNlbGYgYW5kXG4gKiB0aGUgY29tcG9uZW50IHVzaW5nIGl0IGluIHRoZSBjb21wb25lbnQgdGVtcGxhdGUuXG4gKlxuICovXG5leHBvcnQgY2xhc3MgQ2xySWZBY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBwcml2YXRlIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIHdhc0FjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgaWZBY3RpdmVTZXJ2aWNlOiBJZkFjdGl2ZVNlcnZpY2UsXG4gICAgQEluamVjdChJRl9BQ1RJVkVfSUQpIHByaXZhdGUgaWQ6IG51bWJlcixcbiAgICBwcml2YXRlIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+LFxuICAgIHByaXZhdGUgY29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmXG4gICkge1xuICAgIHRoaXMuY2hlY2tBbmRVcGRhdGVWaWV3KGlmQWN0aXZlU2VydmljZS5jdXJyZW50KTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy5pZkFjdGl2ZVNlcnZpY2UuY3VycmVudENoYW5nZS5zdWJzY3JpYmUobmV3Q3VycmVudElkID0+IHtcbiAgICAgIHRoaXMuY2hlY2tBbmRVcGRhdGVWaWV3KG5ld0N1cnJlbnRJZCk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGNoZWNrQW5kVXBkYXRlVmlldyhjdXJyZW50SWQ6IG51bWJlcikge1xuICAgIGNvbnN0IGlzTm93QWN0aXZlID0gY3VycmVudElkID09PSB0aGlzLmlkO1xuICAgIC8vIG9ubHkgZW1pdCBpZiB0aGUgbmV3IGFjdGl2ZSBzdGF0ZSBpcyBjaGFuZ2VkIHNpbmNlIGxhc3QgdGltZS5cbiAgICBpZiAoaXNOb3dBY3RpdmUgIT09IHRoaXMud2FzQWN0aXZlKSB7XG4gICAgICB0aGlzLnVwZGF0ZVZpZXcoaXNOb3dBY3RpdmUpO1xuICAgICAgdGhpcy5hY3RpdmVDaGFuZ2UuZW1pdChpc05vd0FjdGl2ZSk7XG4gICAgICB0aGlzLndhc0FjdGl2ZSA9IGlzTm93QWN0aXZlO1xuICAgIH1cbiAgfVxuXG4gIC8qKioqKioqKipcbiAgICpcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIEEgc2V0dGVyIHRoYXQgdXBkYXRlcyBJZkFjdGl2ZVNlcnZpY2UuYWN0aXZlIHdpdGggdmFsdWUuXG4gICAqXG4gICAqIEBwYXJhbSB2YWx1ZVxuICAgKi9cbiAgQElucHV0KCdjbHJJZkFjdGl2ZScpXG4gIHB1YmxpYyBzZXQgYWN0aXZlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLmlmQWN0aXZlU2VydmljZS5jdXJyZW50ID0gdGhpcy5pZDtcbiAgICB9XG4gIH1cblxuICAvKioqKioqKioqKlxuICAgKiBAcHJvcGVydHkgYWN0aXZlQ2hhbmdlXG4gICAqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBBbiBldmVudCBlbWl0dGVyIHRoYXQgZW1pdHMgd2hlbiB0aGUgYWN0aXZlIHByb3BlcnR5IGlzIHNldCB0byBhbGxvdyBmb3IgMndheSBiaW5kaW5nIHdoZW4gdGhlIGRpcmVjdGl2ZSBpc1xuICAgKiB1c2VkIHdpdGggZGUtc3RydWN0dXJlZCAvIGRlLXN1Z2FyZWQgc3ludGF4LlxuICAgKlxuICAgKi9cbiAgQE91dHB1dCgnY2xySWZBY3RpdmVDaGFuZ2UnKSBhY3RpdmVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIC8qKioqKioqKlxuICAgKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogQSBnZXR0ZXIgdGhhdCByZXR1cm5zIHRoZSBjdXJyZW50IElmQWN0aXZlU2VydmljZS5hY3RpdmUgdmFsdWUuXG4gICAqL1xuICBwdWJsaWMgZ2V0IGFjdGl2ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5pZkFjdGl2ZVNlcnZpY2UuY3VycmVudCA9PT0gdGhpcy5pZDtcbiAgfVxuXG4gIC8qKioqKioqKipcbiAgICpcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIEZ1bmN0aW9uIHRoYXQgdGFrZXMgYSBhbnkgdmFsdWUgYW5kIGVpdGhlciBjcmVhdGVkIGFuIGVtYmVkZGVkIHZpZXcgZm9yIHRoZSBhc3NvY2lhdGVkIFZpZXdDb250YWluZXJSZWYgb3IsXG4gICAqIENsZWFycyBhbGwgdmlld3MgZnJvbSB0aGUgVmlld0NvbnRhaW5lclJlZlxuICAgKiBAcGFyYW0gdmFsdWVcbiAgICovXG4gIHB1YmxpYyB1cGRhdGVWaWV3KHZhbHVlOiBib29sZWFuKSB7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLmNvbnRhaW5lci5jcmVhdGVFbWJlZGRlZFZpZXcodGhpcy50ZW1wbGF0ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY29udGFpbmVyLmNsZWFyKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIl19