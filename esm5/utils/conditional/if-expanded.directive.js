/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive, ElementRef, EventEmitter, Input, Optional, Output, Renderer2, TemplateRef, ViewContainerRef, } from '@angular/core';
import { IfExpandService } from './if-expanded.service';
var ClrIfExpanded = /** @class */ (function () {
    function ClrIfExpanded(template, container, el, renderer, expand) {
        var _this = this;
        this.template = template;
        this.container = container;
        this.el = el;
        this.renderer = renderer;
        this.expand = expand;
        this._expanded = false;
        this.expandedChange = new EventEmitter(true);
        /**
         * Subscriptions to all the services and queries changes
         */
        this._subscriptions = [];
        expand.expandable++;
        this._subscriptions.push(expand.expandChange.subscribe((/**
         * @return {?}
         */
        function () {
            _this.updateView();
            _this.expandedChange.emit(_this.expand.expanded);
        })));
    }
    Object.defineProperty(ClrIfExpanded.prototype, "expanded", {
        get: /**
         * @return {?}
         */
        function () {
            return this._expanded;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (typeof value === 'boolean') {
                this.expand.expanded = value;
                this._expanded = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @return {?}
     */
    ClrIfExpanded.prototype.updateView = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.expand.expanded && this.container.length !== 0) {
            return;
        }
        if (this.template) {
            if (this.expand.expanded) {
                // Should we pass a context? I don't see anything useful to pass right now,
                // but we can come back to it in the future as a solution for additional features.
                this.container.createEmbeddedView(this.template);
            }
            else {
                // TODO: Move when we move the animation logic to Datagrid Row Expand
                // We clear before the animation is over. Not ideal, but doing better would involve a much heavier
                // process for very little gain. Once Angular animations are dynamic enough, we should be able to
                // get the optimal behavior.
                this.container.clear();
            }
        }
        else {
            try {
                // If we don't have a template ref, we fallback to a crude display: none for now.
                if (this.expand.expanded) {
                    this.renderer.setStyle(this.el.nativeElement, 'display', null);
                }
                else {
                    this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
                }
            }
            catch (e) {
                // We catch the case where clrIfExpanded was put on a non-DOM element, and we just do nothing
            }
        }
    };
    /**
     * @return {?}
     */
    ClrIfExpanded.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.updateView();
    };
    /**
     * @return {?}
     */
    ClrIfExpanded.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.expand.expandable--;
        this._subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        function (sub) { return sub.unsubscribe(); }));
    };
    ClrIfExpanded.decorators = [
        { type: Directive, args: [{ selector: '[clrIfExpanded]' },] }
    ];
    /** @nocollapse */
    ClrIfExpanded.ctorParameters = function () { return [
        { type: TemplateRef, decorators: [{ type: Optional }] },
        { type: ViewContainerRef },
        { type: ElementRef },
        { type: Renderer2 },
        { type: IfExpandService }
    ]; };
    ClrIfExpanded.propDecorators = {
        expanded: [{ type: Input, args: ['clrIfExpanded',] }],
        expandedChange: [{ type: Output, args: ['clrIfExpandedChange',] }]
    };
    return ClrIfExpanded;
}());
export { ClrIfExpanded };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ClrIfExpanded.prototype._expanded;
    /** @type {?} */
    ClrIfExpanded.prototype.expandedChange;
    /**
     * Subscriptions to all the services and queries changes
     * @type {?}
     * @private
     */
    ClrIfExpanded.prototype._subscriptions;
    /**
     * @type {?}
     * @private
     */
    ClrIfExpanded.prototype.template;
    /**
     * @type {?}
     * @private
     */
    ClrIfExpanded.prototype.container;
    /**
     * @type {?}
     * @private
     */
    ClrIfExpanded.prototype.el;
    /**
     * @type {?}
     * @private
     */
    ClrIfExpanded.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    ClrIfExpanded.prototype.expand;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWYtZXhwYW5kZWQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsidXRpbHMvY29uZGl0aW9uYWwvaWYtZXhwYW5kZWQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixLQUFLLEVBR0wsUUFBUSxFQUNSLE1BQU0sRUFDTixTQUFTLEVBQ1QsV0FBVyxFQUNYLGdCQUFnQixHQUNqQixNQUFNLGVBQWUsQ0FBQztBQUd2QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFeEQ7SUFrQkUsdUJBQ3NCLFFBQTBCLEVBQ3RDLFNBQTJCLEVBQzNCLEVBQWMsRUFDZCxRQUFtQixFQUNuQixNQUF1QjtRQUxqQyxpQkFjQztRQWJxQixhQUFRLEdBQVIsUUFBUSxDQUFrQjtRQUN0QyxjQUFTLEdBQVQsU0FBUyxDQUFrQjtRQUMzQixPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQ2QsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixXQUFNLEdBQU4sTUFBTSxDQUFpQjtRQXJCekIsY0FBUyxHQUFZLEtBQUssQ0FBQztRQWNKLG1CQUFjLEdBQTBCLElBQUksWUFBWSxDQUFVLElBQUksQ0FBQyxDQUFDOzs7O1FBcUIvRixtQkFBYyxHQUFtQixFQUFFLENBQUM7UUFaMUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUN0QixNQUFNLENBQUMsWUFBWSxDQUFDLFNBQVM7OztRQUFDO1lBQzVCLEtBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNsQixLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2pELENBQUMsRUFBQyxDQUNILENBQUM7SUFDSixDQUFDO0lBNUJELHNCQUFJLG1DQUFROzs7O1FBQVo7WUFDRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDeEIsQ0FBQzs7Ozs7UUFFRCxVQUNhLEtBQWM7WUFDekIsSUFBSSxPQUFPLEtBQUssS0FBSyxTQUFTLEVBQUU7Z0JBQzlCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztnQkFDN0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7YUFDeEI7UUFDSCxDQUFDOzs7T0FSQTs7Ozs7SUFpQ08sa0NBQVU7Ozs7SUFBbEI7UUFDRSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUN2RCxPQUFPO1NBQ1I7UUFDRCxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRTtnQkFDeEIsMkVBQTJFO2dCQUMzRSxrRkFBa0Y7Z0JBQ2xGLElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ2xEO2lCQUFNO2dCQUNMLHFFQUFxRTtnQkFDckUsa0dBQWtHO2dCQUNsRyxpR0FBaUc7Z0JBQ2pHLDRCQUE0QjtnQkFDNUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUN4QjtTQUNGO2FBQU07WUFDTCxJQUFJO2dCQUNGLGlGQUFpRjtnQkFDakYsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRTtvQkFDeEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO2lCQUNoRTtxQkFBTTtvQkFDTCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7aUJBQ2xFO2FBQ0Y7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDViw2RkFBNkY7YUFDOUY7U0FDRjtJQUNILENBQUM7Ozs7SUFFRCxnQ0FBUTs7O0lBQVI7UUFDRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDcEIsQ0FBQzs7OztJQUVELG1DQUFXOzs7SUFBWDtRQUNFLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPOzs7O1FBQUMsVUFBQyxHQUFpQixJQUFLLE9BQUEsR0FBRyxDQUFDLFdBQVcsRUFBRSxFQUFqQixDQUFpQixFQUFDLENBQUM7SUFDeEUsQ0FBQzs7Z0JBNUVGLFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRTs7OztnQkFQeEMsV0FBVyx1QkEwQlIsUUFBUTtnQkF6QlgsZ0JBQWdCO2dCQVRoQixVQUFVO2dCQU9WLFNBQVM7Z0JBTUYsZUFBZTs7OzJCQVVyQixLQUFLLFNBQUMsZUFBZTtpQ0FRckIsTUFBTSxTQUFDLHFCQUFxQjs7SUE2RC9CLG9CQUFDO0NBQUEsQUE3RUQsSUE2RUM7U0E1RVksYUFBYTs7Ozs7O0lBQ3hCLGtDQUFtQzs7SUFjbkMsdUNBQXVHOzs7Ozs7SUFxQnZHLHVDQUE0Qzs7Ozs7SUFsQjFDLGlDQUE4Qzs7Ozs7SUFDOUMsa0NBQW1DOzs7OztJQUNuQywyQkFBc0I7Ozs7O0lBQ3RCLGlDQUEyQjs7Ozs7SUFDM0IsK0JBQStCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbiAgUmVuZGVyZXIyLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NvbnRhaW5lclJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgSWZFeHBhbmRTZXJ2aWNlIH0gZnJvbSAnLi9pZi1leHBhbmRlZC5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW2NscklmRXhwYW5kZWRdJyB9KVxuZXhwb3J0IGNsYXNzIENscklmRXhwYW5kZWQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgX2V4cGFuZGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgZ2V0IGV4cGFuZGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9leHBhbmRlZDtcbiAgfVxuXG4gIEBJbnB1dCgnY2xySWZFeHBhbmRlZCcpXG4gIHNldCBleHBhbmRlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJykge1xuICAgICAgdGhpcy5leHBhbmQuZXhwYW5kZWQgPSB2YWx1ZTtcbiAgICAgIHRoaXMuX2V4cGFuZGVkID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgQE91dHB1dCgnY2xySWZFeHBhbmRlZENoYW5nZScpIGV4cGFuZGVkQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KHRydWUpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4sXG4gICAgcHJpdmF0ZSBjb250YWluZXI6IFZpZXdDb250YWluZXJSZWYsXG4gICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBleHBhbmQ6IElmRXhwYW5kU2VydmljZVxuICApIHtcbiAgICBleHBhbmQuZXhwYW5kYWJsZSsrO1xuICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIGV4cGFuZC5leHBhbmRDaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy51cGRhdGVWaWV3KCk7XG4gICAgICAgIHRoaXMuZXhwYW5kZWRDaGFuZ2UuZW1pdCh0aGlzLmV4cGFuZC5leHBhbmRlZCk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogU3Vic2NyaXB0aW9ucyB0byBhbGwgdGhlIHNlcnZpY2VzIGFuZCBxdWVyaWVzIGNoYW5nZXNcbiAgICovXG4gIHByaXZhdGUgX3N1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgcHJpdmF0ZSB1cGRhdGVWaWV3KCkge1xuICAgIGlmICh0aGlzLmV4cGFuZC5leHBhbmRlZCAmJiB0aGlzLmNvbnRhaW5lci5sZW5ndGggIT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMudGVtcGxhdGUpIHtcbiAgICAgIGlmICh0aGlzLmV4cGFuZC5leHBhbmRlZCkge1xuICAgICAgICAvLyBTaG91bGQgd2UgcGFzcyBhIGNvbnRleHQ/IEkgZG9uJ3Qgc2VlIGFueXRoaW5nIHVzZWZ1bCB0byBwYXNzIHJpZ2h0IG5vdyxcbiAgICAgICAgLy8gYnV0IHdlIGNhbiBjb21lIGJhY2sgdG8gaXQgaW4gdGhlIGZ1dHVyZSBhcyBhIHNvbHV0aW9uIGZvciBhZGRpdGlvbmFsIGZlYXR1cmVzLlxuICAgICAgICB0aGlzLmNvbnRhaW5lci5jcmVhdGVFbWJlZGRlZFZpZXcodGhpcy50ZW1wbGF0ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBUT0RPOiBNb3ZlIHdoZW4gd2UgbW92ZSB0aGUgYW5pbWF0aW9uIGxvZ2ljIHRvIERhdGFncmlkIFJvdyBFeHBhbmRcbiAgICAgICAgLy8gV2UgY2xlYXIgYmVmb3JlIHRoZSBhbmltYXRpb24gaXMgb3Zlci4gTm90IGlkZWFsLCBidXQgZG9pbmcgYmV0dGVyIHdvdWxkIGludm9sdmUgYSBtdWNoIGhlYXZpZXJcbiAgICAgICAgLy8gcHJvY2VzcyBmb3IgdmVyeSBsaXR0bGUgZ2Fpbi4gT25jZSBBbmd1bGFyIGFuaW1hdGlvbnMgYXJlIGR5bmFtaWMgZW5vdWdoLCB3ZSBzaG91bGQgYmUgYWJsZSB0b1xuICAgICAgICAvLyBnZXQgdGhlIG9wdGltYWwgYmVoYXZpb3IuXG4gICAgICAgIHRoaXMuY29udGFpbmVyLmNsZWFyKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIElmIHdlIGRvbid0IGhhdmUgYSB0ZW1wbGF0ZSByZWYsIHdlIGZhbGxiYWNrIHRvIGEgY3J1ZGUgZGlzcGxheTogbm9uZSBmb3Igbm93LlxuICAgICAgICBpZiAodGhpcy5leHBhbmQuZXhwYW5kZWQpIHtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2Rpc3BsYXknLCBudWxsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIFdlIGNhdGNoIHRoZSBjYXNlIHdoZXJlIGNscklmRXhwYW5kZWQgd2FzIHB1dCBvbiBhIG5vbi1ET00gZWxlbWVudCwgYW5kIHdlIGp1c3QgZG8gbm90aGluZ1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMudXBkYXRlVmlldygpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5leHBhbmQuZXhwYW5kYWJsZS0tO1xuICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMuZm9yRWFjaCgoc3ViOiBTdWJzY3JpcHRpb24pID0+IHN1Yi51bnN1YnNjcmliZSgpKTtcbiAgfVxufVxuIl19