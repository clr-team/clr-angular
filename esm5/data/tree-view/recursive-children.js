/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, Input, Optional } from '@angular/core';
import { Expand } from '../../utils/expand/providers/expand';
import { TreeFeaturesService } from './tree-features.service';
import { TreeNodeModel } from './models/tree-node.model';
/**
 * @template T
 */
var RecursiveChildren = /** @class */ (function () {
    function RecursiveChildren(featuresService, expandService) {
        var _this = this;
        this.featuresService = featuresService;
        this.expandService = expandService;
        if (expandService) {
            this.subscription = this.expandService.expandChange.subscribe(function (value) {
                if (!value && _this.parent && !_this.featuresService.eager && _this.featuresService.recursion) {
                    // In the case of lazy-loading recursive trees, we clear the children on collapse.
                    // This is better in case they change between two user interaction, and that way
                    // the app itself can decide whether to cache them or not.
                    ((/** @type {?} */ (_this.parent))).clearChildren();
                }
            });
        }
    }
    /**
     * @return {?}
     */
    RecursiveChildren.prototype.shouldRender = /**
     * @return {?}
     */
    function () {
        return (this.featuresService.recursion &&
            // In the smart case, we eagerly render all the recursive children
            // to make sure two-way bindings for selection are available.
            // They will be hidden with CSS by the parent.
            (this.featuresService.eager || !this.expandService || this.expandService.expanded));
    };
    /**
     * @param {?} node
     * @return {?}
     */
    RecursiveChildren.prototype.getContext = /**
     * @param {?} node
     * @return {?}
     */
    function (node) {
        return {
            $implicit: node.model,
            clrModel: node,
        };
    };
    /**
     * @return {?}
     */
    RecursiveChildren.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    RecursiveChildren.decorators = [
        { type: Component, args: [{
                    selector: 'clr-recursive-children',
                    template: "\n    <ng-container *ngIf=\"shouldRender()\">\n      <ng-container *ngFor=\"let child of parent?.children || children\">\n        <ng-container *ngTemplateOutlet=\"featuresService.recursion.template; context: getContext(child)\"></ng-container>\n      </ng-container>\n    </ng-container>\n  "
                }] }
    ];
    /** @nocollapse */
    RecursiveChildren.ctorParameters = function () { return [
        { type: TreeFeaturesService },
        { type: Expand, decorators: [{ type: Optional }] }
    ]; };
    RecursiveChildren.propDecorators = {
        parent: [{ type: Input, args: ['parent',] }],
        children: [{ type: Input, args: ['children',] }]
    };
    return RecursiveChildren;
}());
export { RecursiveChildren };
if (false) {
    /** @type {?} */
    RecursiveChildren.prototype.parent;
    /** @type {?} */
    RecursiveChildren.prototype.children;
    /** @type {?} */
    RecursiveChildren.prototype.subscription;
    /** @type {?} */
    RecursiveChildren.prototype.featuresService;
    /** @type {?} */
    RecursiveChildren.prototype.expandService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjdXJzaXZlLWNoaWxkcmVuLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS90cmVlLXZpZXcvcmVjdXJzaXZlLWNoaWxkcmVuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQU1BLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDN0QsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDBCQUEwQixDQUFDOzs7O0FBSXpEO0lBZUUsMkJBQW1CLGVBQXVDLEVBQXNCLGFBQXFCO1FBQXJHLGlCQVdDO1FBWGtCLG9CQUFlLEdBQWYsZUFBZSxDQUF3QjtRQUFzQixrQkFBYSxHQUFiLGFBQWEsQ0FBUTtRQUNuRyxJQUFJLGFBQWEsRUFBRTtZQUNqQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxVQUFBLEtBQUs7Z0JBQ2pFLElBQUksQ0FBQyxLQUFLLElBQUksS0FBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLEtBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxJQUFJLEtBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxFQUFFO29CQUMxRixrRkFBa0Y7b0JBQ2xGLGdGQUFnRjtvQkFDaEYsMERBQTBEO29CQUMxRCxDQUFDLG1CQUEyQixLQUFJLENBQUMsTUFBTSxFQUFBLENBQUMsQ0FBQyxhQUFhLEVBQUUsQ0FBQztpQkFDMUQ7WUFDSCxDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQzs7OztJQUVELHdDQUFZOzs7SUFBWjtRQUNFLE9BQU8sQ0FDTCxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVM7WUFDOUIsa0VBQWtFO1lBQ2xFLDZEQUE2RDtZQUM3RCw4Q0FBOEM7WUFDOUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FDbkYsQ0FBQztJQUNKLENBQUM7Ozs7O0lBT0Qsc0NBQVU7Ozs7SUFBVixVQUFXLElBQXNCO1FBQy9CLE9BQU87WUFDTCxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDckIsUUFBUSxFQUFFLElBQUk7U0FDZixDQUFDO0lBQ0osQ0FBQzs7OztJQUlELHVDQUFXOzs7SUFBWDtRQUNFLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNyQixJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ2pDO0lBQ0gsQ0FBQzs7Z0JBeERGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsd0JBQXdCO29CQUNsQyxRQUFRLEVBQUUsc1NBTVQ7aUJBQ0Y7Ozs7Z0JBZFEsbUJBQW1CO2dCQURuQixNQUFNLHVCQXFCZ0QsUUFBUTs7O3lCQXlCcEUsS0FBSyxTQUFDLFFBQVE7MkJBQ2QsS0FBSyxTQUFDLFVBQVU7O0lBZ0JuQix3QkFBQztDQUFBLEFBekRELElBeURDO1NBM0NZLGlCQUFpQjs7O0lBMEI1QixtQ0FBMEM7O0lBQzFDLHFDQUFnRDs7SUFTaEQseUNBQTJCOztJQW5DZiw0Q0FBOEM7O0lBQUUsMENBQXlDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IEV4cGFuZCB9IGZyb20gJy4uLy4uL3V0aWxzL2V4cGFuZC9wcm92aWRlcnMvZXhwYW5kJztcbmltcG9ydCB7IFRyZWVGZWF0dXJlc1NlcnZpY2UgfSBmcm9tICcuL3RyZWUtZmVhdHVyZXMuc2VydmljZSc7XG5pbXBvcnQgeyBUcmVlTm9kZU1vZGVsIH0gZnJvbSAnLi9tb2RlbHMvdHJlZS1ub2RlLm1vZGVsJztcbmltcG9ydCB7IENsclJlY3Vyc2l2ZUZvck9mQ29udGV4dCB9IGZyb20gJy4vcmVjdXJzaXZlLWZvci1vZic7XG5pbXBvcnQgeyBSZWN1cnNpdmVUcmVlTm9kZU1vZGVsIH0gZnJvbSAnLi9tb2RlbHMvcmVjdXJzaXZlLXRyZWUtbm9kZS5tb2RlbCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci1yZWN1cnNpdmUtY2hpbGRyZW4nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJzaG91bGRSZW5kZXIoKVwiPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgY2hpbGQgb2YgcGFyZW50Py5jaGlsZHJlbiB8fCBjaGlsZHJlblwiPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiZmVhdHVyZXNTZXJ2aWNlLnJlY3Vyc2lvbi50ZW1wbGF0ZTsgY29udGV4dDogZ2V0Q29udGV4dChjaGlsZClcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIDwvbmctY29udGFpbmVyPlxuICBgLFxufSlcbi8qKlxuICogSW50ZXJuYWwgY29tcG9uZW50LCBkbyBub3QgZXhwb3J0IVxuICogVGhpcyBpcyBwYXJ0IG9mIHRoZSBoYWNrIHRvIGdldCBhcm91bmQgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMTU5OThcbiAqL1xuZXhwb3J0IGNsYXNzIFJlY3Vyc2l2ZUNoaWxkcmVuPFQ+IHtcbiAgY29uc3RydWN0b3IocHVibGljIGZlYXR1cmVzU2VydmljZTogVHJlZUZlYXR1cmVzU2VydmljZTxUPiwgQE9wdGlvbmFsKCkgcHJpdmF0ZSBleHBhbmRTZXJ2aWNlOiBFeHBhbmQpIHtcbiAgICBpZiAoZXhwYW5kU2VydmljZSkge1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb24gPSB0aGlzLmV4cGFuZFNlcnZpY2UuZXhwYW5kQ2hhbmdlLnN1YnNjcmliZSh2YWx1ZSA9PiB7XG4gICAgICAgIGlmICghdmFsdWUgJiYgdGhpcy5wYXJlbnQgJiYgIXRoaXMuZmVhdHVyZXNTZXJ2aWNlLmVhZ2VyICYmIHRoaXMuZmVhdHVyZXNTZXJ2aWNlLnJlY3Vyc2lvbikge1xuICAgICAgICAgIC8vIEluIHRoZSBjYXNlIG9mIGxhenktbG9hZGluZyByZWN1cnNpdmUgdHJlZXMsIHdlIGNsZWFyIHRoZSBjaGlsZHJlbiBvbiBjb2xsYXBzZS5cbiAgICAgICAgICAvLyBUaGlzIGlzIGJldHRlciBpbiBjYXNlIHRoZXkgY2hhbmdlIGJldHdlZW4gdHdvIHVzZXIgaW50ZXJhY3Rpb24sIGFuZCB0aGF0IHdheVxuICAgICAgICAgIC8vIHRoZSBhcHAgaXRzZWxmIGNhbiBkZWNpZGUgd2hldGhlciB0byBjYWNoZSB0aGVtIG9yIG5vdC5cbiAgICAgICAgICAoPFJlY3Vyc2l2ZVRyZWVOb2RlTW9kZWw8VD4+dGhpcy5wYXJlbnQpLmNsZWFyQ2hpbGRyZW4oKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgc2hvdWxkUmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLmZlYXR1cmVzU2VydmljZS5yZWN1cnNpb24gJiZcbiAgICAgIC8vIEluIHRoZSBzbWFydCBjYXNlLCB3ZSBlYWdlcmx5IHJlbmRlciBhbGwgdGhlIHJlY3Vyc2l2ZSBjaGlsZHJlblxuICAgICAgLy8gdG8gbWFrZSBzdXJlIHR3by13YXkgYmluZGluZ3MgZm9yIHNlbGVjdGlvbiBhcmUgYXZhaWxhYmxlLlxuICAgICAgLy8gVGhleSB3aWxsIGJlIGhpZGRlbiB3aXRoIENTUyBieSB0aGUgcGFyZW50LlxuICAgICAgKHRoaXMuZmVhdHVyZXNTZXJ2aWNlLmVhZ2VyIHx8ICF0aGlzLmV4cGFuZFNlcnZpY2UgfHwgdGhpcy5leHBhbmRTZXJ2aWNlLmV4cGFuZGVkKVxuICAgICk7XG4gIH1cblxuICAvLyBPZmZlcmluZyB0aGUgb3B0aW9uIHRvIGVpdGhlciBnaXZlIHRoZSBwYXJlbnQgbm9kZSB0byByZWN1cnNlIHBvdGVudGlhbGx5IGxhemlseSxcbiAgLy8gb3IgZGlyZWN0bHkgdGhlIGxpc3Qgb2YgY2hpbGRyZW4gdG8gZGlzcGxheS5cbiAgQElucHV0KCdwYXJlbnQnKSBwYXJlbnQ6IFRyZWVOb2RlTW9kZWw8VD47XG4gIEBJbnB1dCgnY2hpbGRyZW4nKSBjaGlsZHJlbjogVHJlZU5vZGVNb2RlbDxUPltdO1xuXG4gIGdldENvbnRleHQobm9kZTogVHJlZU5vZGVNb2RlbDxUPik6IENsclJlY3Vyc2l2ZUZvck9mQ29udGV4dDxUPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICRpbXBsaWNpdDogbm9kZS5tb2RlbCxcbiAgICAgIGNsck1vZGVsOiBub2RlLFxuICAgIH07XG4gIH1cblxuICBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5zdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG59XG4iXX0=