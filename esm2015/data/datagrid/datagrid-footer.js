/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ContentChild } from '@angular/core';
import { ClrDatagridColumnToggle } from './datagrid-column-toggle';
import { Selection } from './providers/selection';
import { SelectionType } from './enums/selection-type';
import { ColumnsService } from './providers/columns.service';
/**
 * @template T
 */
export class ClrDatagridFooter {
    /**
     * @param {?} selection
     * @param {?} columnsService
     */
    constructor(selection, columnsService) {
        this.selection = selection;
        this.columnsService = columnsService;
        /* reference to the enum so that template can access */
        this.SELECTION_TYPE = SelectionType;
    }
    /**
     * @return {?}
     */
    get hasHideableColumns() {
        return this.columnsService.hasHideableColumns;
    }
}
ClrDatagridFooter.decorators = [
    { type: Component, args: [{
                selector: 'clr-dg-footer',
                template: `
        <ng-container
            *ngIf="(selection.selectionType === SELECTION_TYPE.Multi) && (selection.current.length > 0)">
          <div class="clr-form-control-disabled">
              <clr-checkbox-wrapper class="datagrid-footer-select">
                <input clrCheckbox type="checkbox" checked="checked" disabled>
                <label>{{selection.current.length}}</label>
            </clr-checkbox-wrapper>
          </div>
        </ng-container>
        <ng-content select="clr-dg-column-toggle"></ng-content>
        <clr-dg-column-toggle *ngIf="hasHideableColumns && !toggle"></clr-dg-column-toggle>
        <div class="datagrid-footer-description">
            <ng-content></ng-content>
        </div>
        <ng-content select="clr-dg-pagination"></ng-content>
    `,
                host: {
                    '[class.datagrid-footer]': 'true',
                }
            }] }
];
/** @nocollapse */
ClrDatagridFooter.ctorParameters = () => [
    { type: Selection },
    { type: ColumnsService }
];
ClrDatagridFooter.propDecorators = {
    toggle: [{ type: ContentChild, args: [ClrDatagridColumnToggle,] }]
};
if (false) {
    /** @type {?} */
    ClrDatagridFooter.prototype.SELECTION_TYPE;
    /** @type {?} */
    ClrDatagridFooter.prototype.toggle;
    /** @type {?} */
    ClrDatagridFooter.prototype.selection;
    /**
     * @type {?}
     * @private
     */
    ClrDatagridFooter.prototype.columnsService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtZm9vdGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9kYXRhZ3JpZC1mb290ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFeEQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDbkUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2xELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7Ozs7QUF5QjdELE1BQU0sT0FBTyxpQkFBaUI7Ozs7O0lBQzVCLFlBQW1CLFNBQXVCLEVBQVUsY0FBOEI7UUFBL0QsY0FBUyxHQUFULFNBQVMsQ0FBYztRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjs7UUFHM0UsbUJBQWMsR0FBRyxhQUFhLENBQUM7SUFIK0MsQ0FBQzs7OztJQU90RixJQUFJLGtCQUFrQjtRQUNwQixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsa0JBQWtCLENBQUM7SUFDaEQsQ0FBQzs7O1lBakNGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZUFBZTtnQkFDekIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7O0tBZ0JQO2dCQUNILElBQUksRUFBRTtvQkFDSix5QkFBeUIsRUFBRSxNQUFNO2lCQUNsQzthQUNGOzs7O1lBMUJRLFNBQVM7WUFFVCxjQUFjOzs7cUJBK0JwQixZQUFZLFNBQUMsdUJBQXVCOzs7O0lBRnJDLDJDQUFzQzs7SUFFdEMsbUNBQXVFOztJQUwzRCxzQ0FBOEI7Ozs7O0lBQUUsMkNBQXNDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgQ29tcG9uZW50LCBDb250ZW50Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQ2xyRGF0YWdyaWRDb2x1bW5Ub2dnbGUgfSBmcm9tICcuL2RhdGFncmlkLWNvbHVtbi10b2dnbGUnO1xuaW1wb3J0IHsgU2VsZWN0aW9uIH0gZnJvbSAnLi9wcm92aWRlcnMvc2VsZWN0aW9uJztcbmltcG9ydCB7IFNlbGVjdGlvblR5cGUgfSBmcm9tICcuL2VudW1zL3NlbGVjdGlvbi10eXBlJztcbmltcG9ydCB7IENvbHVtbnNTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvY29sdW1ucy5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLWRnLWZvb3RlcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgICAgICpuZ0lmPVwiKHNlbGVjdGlvbi5zZWxlY3Rpb25UeXBlID09PSBTRUxFQ1RJT05fVFlQRS5NdWx0aSkgJiYgKHNlbGVjdGlvbi5jdXJyZW50Lmxlbmd0aCA+IDApXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNsci1mb3JtLWNvbnRyb2wtZGlzYWJsZWRcIj5cbiAgICAgICAgICAgICAgPGNsci1jaGVja2JveC13cmFwcGVyIGNsYXNzPVwiZGF0YWdyaWQtZm9vdGVyLXNlbGVjdFwiPlxuICAgICAgICAgICAgICAgIDxpbnB1dCBjbHJDaGVja2JveCB0eXBlPVwiY2hlY2tib3hcIiBjaGVja2VkPVwiY2hlY2tlZFwiIGRpc2FibGVkPlxuICAgICAgICAgICAgICAgIDxsYWJlbD57e3NlbGVjdGlvbi5jdXJyZW50Lmxlbmd0aH19PC9sYWJlbD5cbiAgICAgICAgICAgIDwvY2xyLWNoZWNrYm94LXdyYXBwZXI+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJjbHItZGctY29sdW1uLXRvZ2dsZVwiPjwvbmctY29udGVudD5cbiAgICAgICAgPGNsci1kZy1jb2x1bW4tdG9nZ2xlICpuZ0lmPVwiaGFzSGlkZWFibGVDb2x1bW5zICYmICF0b2dnbGVcIj48L2Nsci1kZy1jb2x1bW4tdG9nZ2xlPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZGF0YWdyaWQtZm9vdGVyLWRlc2NyaXB0aW9uXCI+XG4gICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJjbHItZGctcGFnaW5hdGlvblwiPjwvbmctY29udGVudD5cbiAgICBgLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5kYXRhZ3JpZC1mb290ZXJdJzogJ3RydWUnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBDbHJEYXRhZ3JpZEZvb3RlcjxUID0gYW55PiB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBzZWxlY3Rpb246IFNlbGVjdGlvbjxUPiwgcHJpdmF0ZSBjb2x1bW5zU2VydmljZTogQ29sdW1uc1NlcnZpY2UpIHt9XG5cbiAgLyogcmVmZXJlbmNlIHRvIHRoZSBlbnVtIHNvIHRoYXQgdGVtcGxhdGUgY2FuIGFjY2VzcyAqL1xuICBwdWJsaWMgU0VMRUNUSU9OX1RZUEUgPSBTZWxlY3Rpb25UeXBlO1xuXG4gIEBDb250ZW50Q2hpbGQoQ2xyRGF0YWdyaWRDb2x1bW5Ub2dnbGUpIHRvZ2dsZTogQ2xyRGF0YWdyaWRDb2x1bW5Ub2dnbGU7XG5cbiAgZ2V0IGhhc0hpZGVhYmxlQ29sdW1ucygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5jb2x1bW5zU2VydmljZS5oYXNIaWRlYWJsZUNvbHVtbnM7XG4gIH1cbn1cbiJdfQ==