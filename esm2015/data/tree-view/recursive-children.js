/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, Input, Optional } from '@angular/core';
import { IfExpandService } from '../../utils/conditional/if-expanded.service';
import { TreeFeaturesService } from './tree-features.service';
import { TreeNodeModel } from './models/tree-node.model';
/**
 * @template T
 */
/**
 * Internal component, do not export!
 * This is part of the hack to get around https://github.com/angular/angular/issues/15998
 */
export class RecursiveChildren {
    /**
     * @param {?} featuresService
     * @param {?} expandService
     */
    constructor(featuresService, expandService) {
        this.featuresService = featuresService;
        this.expandService = expandService;
        if (expandService) {
            this.subscription = this.expandService.expandChange.subscribe((/**
             * @param {?} value
             * @return {?}
             */
            value => {
                if (!value && this.parent && !this.featuresService.eager && this.featuresService.recursion) {
                    // In the case of lazy-loading recursive trees, we clear the children on collapse.
                    // This is better in case they change between two user interaction, and that way
                    // the app itself can decide whether to cache them or not.
                    ((/** @type {?} */ (this.parent))).clearChildren();
                }
            }));
        }
    }
    /**
     * @return {?}
     */
    shouldRender() {
        return (this.featuresService.recursion &&
            // In the smart case, we eagerly render all the recursive children
            // to make sure two-way bindings for selection are available.
            // They will be hidden with CSS by the parent.
            (this.featuresService.eager || !this.expandService || this.expandService.expanded));
    }
    /**
     * @param {?} node
     * @return {?}
     */
    getContext(node) {
        return {
            $implicit: node.model,
            clrModel: node,
        };
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
RecursiveChildren.decorators = [
    { type: Component, args: [{
                selector: 'clr-recursive-children',
                template: `
    <ng-container *ngIf="shouldRender()">
      <ng-container *ngFor="let child of parent?.children || children">
        <ng-container *ngTemplateOutlet="featuresService.recursion.template; context: getContext(child)"></ng-container>
      </ng-container>
    </ng-container>
  `
            }] }
];
/** @nocollapse */
RecursiveChildren.ctorParameters = () => [
    { type: TreeFeaturesService },
    { type: IfExpandService, decorators: [{ type: Optional }] }
];
RecursiveChildren.propDecorators = {
    parent: [{ type: Input, args: ['parent',] }],
    children: [{ type: Input, args: ['children',] }]
};
if (false) {
    /** @type {?} */
    RecursiveChildren.prototype.parent;
    /** @type {?} */
    RecursiveChildren.prototype.children;
    /** @type {?} */
    RecursiveChildren.prototype.subscription;
    /** @type {?} */
    RecursiveChildren.prototype.featuresService;
    /**
     * @type {?}
     * @private
     */
    RecursiveChildren.prototype.expandService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjdXJzaXZlLWNoaWxkcmVuLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS90cmVlLXZpZXcvcmVjdXJzaXZlLWNoaWxkcmVuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQU1BLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDOUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDBCQUEwQixDQUFDOzs7O0FBY3pEOzs7R0FHRztBQUNILE1BQU0sT0FBTyxpQkFBaUI7Ozs7O0lBQzVCLFlBQW1CLGVBQXVDLEVBQXNCLGFBQThCO1FBQTNGLG9CQUFlLEdBQWYsZUFBZSxDQUF3QjtRQUFzQixrQkFBYSxHQUFiLGFBQWEsQ0FBaUI7UUFDNUcsSUFBSSxhQUFhLEVBQUU7WUFDakIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxTQUFTOzs7O1lBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ3BFLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxFQUFFO29CQUMxRixrRkFBa0Y7b0JBQ2xGLGdGQUFnRjtvQkFDaEYsMERBQTBEO29CQUMxRCxDQUFDLG1CQUEyQixJQUFJLENBQUMsTUFBTSxFQUFBLENBQUMsQ0FBQyxhQUFhLEVBQUUsQ0FBQztpQkFDMUQ7WUFDSCxDQUFDLEVBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQzs7OztJQUVELFlBQVk7UUFDVixPQUFPLENBQ0wsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTO1lBQzlCLGtFQUFrRTtZQUNsRSw2REFBNkQ7WUFDN0QsOENBQThDO1lBQzlDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQ25GLENBQUM7SUFDSixDQUFDOzs7OztJQU9ELFVBQVUsQ0FBQyxJQUFzQjtRQUMvQixPQUFPO1lBQ0wsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ3JCLFFBQVEsRUFBRSxJQUFJO1NBQ2YsQ0FBQztJQUNKLENBQUM7Ozs7SUFJRCxXQUFXO1FBQ1QsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDakM7SUFDSCxDQUFDOzs7WUF4REYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx3QkFBd0I7Z0JBQ2xDLFFBQVEsRUFBRTs7Ozs7O0dBTVQ7YUFDRjs7OztZQWRRLG1CQUFtQjtZQURuQixlQUFlLHVCQXFCdUMsUUFBUTs7O3FCQXlCcEUsS0FBSyxTQUFDLFFBQVE7dUJBQ2QsS0FBSyxTQUFDLFVBQVU7Ozs7SUFEakIsbUNBQTBDOztJQUMxQyxxQ0FBZ0Q7O0lBU2hELHlDQUEyQjs7SUFuQ2YsNENBQThDOzs7OztJQUFFLDBDQUFrRCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBJZkV4cGFuZFNlcnZpY2UgfSBmcm9tICcuLi8uLi91dGlscy9jb25kaXRpb25hbC9pZi1leHBhbmRlZC5zZXJ2aWNlJztcbmltcG9ydCB7IFRyZWVGZWF0dXJlc1NlcnZpY2UgfSBmcm9tICcuL3RyZWUtZmVhdHVyZXMuc2VydmljZSc7XG5pbXBvcnQgeyBUcmVlTm9kZU1vZGVsIH0gZnJvbSAnLi9tb2RlbHMvdHJlZS1ub2RlLm1vZGVsJztcbmltcG9ydCB7IENsclJlY3Vyc2l2ZUZvck9mQ29udGV4dCB9IGZyb20gJy4vcmVjdXJzaXZlLWZvci1vZic7XG5pbXBvcnQgeyBSZWN1cnNpdmVUcmVlTm9kZU1vZGVsIH0gZnJvbSAnLi9tb2RlbHMvcmVjdXJzaXZlLXRyZWUtbm9kZS5tb2RlbCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci1yZWN1cnNpdmUtY2hpbGRyZW4nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJzaG91bGRSZW5kZXIoKVwiPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgY2hpbGQgb2YgcGFyZW50Py5jaGlsZHJlbiB8fCBjaGlsZHJlblwiPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiZmVhdHVyZXNTZXJ2aWNlLnJlY3Vyc2lvbi50ZW1wbGF0ZTsgY29udGV4dDogZ2V0Q29udGV4dChjaGlsZClcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIDwvbmctY29udGFpbmVyPlxuICBgLFxufSlcbi8qKlxuICogSW50ZXJuYWwgY29tcG9uZW50LCBkbyBub3QgZXhwb3J0IVxuICogVGhpcyBpcyBwYXJ0IG9mIHRoZSBoYWNrIHRvIGdldCBhcm91bmQgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMTU5OThcbiAqL1xuZXhwb3J0IGNsYXNzIFJlY3Vyc2l2ZUNoaWxkcmVuPFQ+IHtcbiAgY29uc3RydWN0b3IocHVibGljIGZlYXR1cmVzU2VydmljZTogVHJlZUZlYXR1cmVzU2VydmljZTxUPiwgQE9wdGlvbmFsKCkgcHJpdmF0ZSBleHBhbmRTZXJ2aWNlOiBJZkV4cGFuZFNlcnZpY2UpIHtcbiAgICBpZiAoZXhwYW5kU2VydmljZSkge1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb24gPSB0aGlzLmV4cGFuZFNlcnZpY2UuZXhwYW5kQ2hhbmdlLnN1YnNjcmliZSh2YWx1ZSA9PiB7XG4gICAgICAgIGlmICghdmFsdWUgJiYgdGhpcy5wYXJlbnQgJiYgIXRoaXMuZmVhdHVyZXNTZXJ2aWNlLmVhZ2VyICYmIHRoaXMuZmVhdHVyZXNTZXJ2aWNlLnJlY3Vyc2lvbikge1xuICAgICAgICAgIC8vIEluIHRoZSBjYXNlIG9mIGxhenktbG9hZGluZyByZWN1cnNpdmUgdHJlZXMsIHdlIGNsZWFyIHRoZSBjaGlsZHJlbiBvbiBjb2xsYXBzZS5cbiAgICAgICAgICAvLyBUaGlzIGlzIGJldHRlciBpbiBjYXNlIHRoZXkgY2hhbmdlIGJldHdlZW4gdHdvIHVzZXIgaW50ZXJhY3Rpb24sIGFuZCB0aGF0IHdheVxuICAgICAgICAgIC8vIHRoZSBhcHAgaXRzZWxmIGNhbiBkZWNpZGUgd2hldGhlciB0byBjYWNoZSB0aGVtIG9yIG5vdC5cbiAgICAgICAgICAoPFJlY3Vyc2l2ZVRyZWVOb2RlTW9kZWw8VD4+dGhpcy5wYXJlbnQpLmNsZWFyQ2hpbGRyZW4oKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgc2hvdWxkUmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLmZlYXR1cmVzU2VydmljZS5yZWN1cnNpb24gJiZcbiAgICAgIC8vIEluIHRoZSBzbWFydCBjYXNlLCB3ZSBlYWdlcmx5IHJlbmRlciBhbGwgdGhlIHJlY3Vyc2l2ZSBjaGlsZHJlblxuICAgICAgLy8gdG8gbWFrZSBzdXJlIHR3by13YXkgYmluZGluZ3MgZm9yIHNlbGVjdGlvbiBhcmUgYXZhaWxhYmxlLlxuICAgICAgLy8gVGhleSB3aWxsIGJlIGhpZGRlbiB3aXRoIENTUyBieSB0aGUgcGFyZW50LlxuICAgICAgKHRoaXMuZmVhdHVyZXNTZXJ2aWNlLmVhZ2VyIHx8ICF0aGlzLmV4cGFuZFNlcnZpY2UgfHwgdGhpcy5leHBhbmRTZXJ2aWNlLmV4cGFuZGVkKVxuICAgICk7XG4gIH1cblxuICAvLyBPZmZlcmluZyB0aGUgb3B0aW9uIHRvIGVpdGhlciBnaXZlIHRoZSBwYXJlbnQgbm9kZSB0byByZWN1cnNlIHBvdGVudGlhbGx5IGxhemlseSxcbiAgLy8gb3IgZGlyZWN0bHkgdGhlIGxpc3Qgb2YgY2hpbGRyZW4gdG8gZGlzcGxheS5cbiAgQElucHV0KCdwYXJlbnQnKSBwYXJlbnQ6IFRyZWVOb2RlTW9kZWw8VD47XG4gIEBJbnB1dCgnY2hpbGRyZW4nKSBjaGlsZHJlbjogVHJlZU5vZGVNb2RlbDxUPltdO1xuXG4gIGdldENvbnRleHQobm9kZTogVHJlZU5vZGVNb2RlbDxUPik6IENsclJlY3Vyc2l2ZUZvck9mQ29udGV4dDxUPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICRpbXBsaWNpdDogbm9kZS5tb2RlbCxcbiAgICAgIGNsck1vZGVsOiBub2RlLFxuICAgIH07XG4gIH1cblxuICBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5zdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG59XG4iXX0=