/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
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
var ClrDatagridFooter = /** @class */ (function () {
    function ClrDatagridFooter(selection, columnsService) {
        this.selection = selection;
        this.columnsService = columnsService;
        /* reference to the enum so that template can access */
        this.SELECTION_TYPE = SelectionType;
    }
    Object.defineProperty(ClrDatagridFooter.prototype, "hasHideableColumns", {
        get: /**
         * @return {?}
         */
        function () {
            return this.columnsService.hasHideableColumns;
        },
        enumerable: true,
        configurable: true
    });
    ClrDatagridFooter.decorators = [
        { type: Component, args: [{
                    selector: 'clr-dg-footer',
                    template: "\n        <ng-container\n            *ngIf=\"(selection.selectionType === SELECTION_TYPE.Multi) && (selection.current.length > 0)\">\n          <div class=\"clr-form-control-disabled\">\n              <clr-checkbox-wrapper class=\"datagrid-footer-select\">\n                <input clrCheckbox type=\"checkbox\" checked=\"checked\" disabled>\n                <label>{{selection.current.length}}</label>\n            </clr-checkbox-wrapper>\n          </div>\n        </ng-container>\n        <ng-content select=\"clr-dg-column-toggle\"></ng-content>\n        <clr-dg-column-toggle *ngIf=\"hasHideableColumns && !toggle\"></clr-dg-column-toggle>\n        <div class=\"datagrid-footer-description\">\n            <ng-content></ng-content>\n        </div>\n        <ng-content select=\"clr-dg-pagination\"></ng-content>\n    ",
                    host: {
                        '[class.datagrid-footer]': 'true',
                    }
                }] }
    ];
    /** @nocollapse */
    ClrDatagridFooter.ctorParameters = function () { return [
        { type: Selection },
        { type: ColumnsService }
    ]; };
    ClrDatagridFooter.propDecorators = {
        toggle: [{ type: ContentChild, args: [ClrDatagridColumnToggle, { static: false },] }]
    };
    return ClrDatagridFooter;
}());
export { ClrDatagridFooter };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtZm9vdGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9kYXRhZ3JpZC1mb290ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFeEQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDbkUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2xELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7Ozs7QUFFN0Q7SUF3QkUsMkJBQW1CLFNBQXVCLEVBQVUsY0FBOEI7UUFBL0QsY0FBUyxHQUFULFNBQVMsQ0FBYztRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjs7UUFHM0UsbUJBQWMsR0FBRyxhQUFhLENBQUM7SUFIK0MsQ0FBQztJQVF0RixzQkFBSSxpREFBa0I7Ozs7UUFBdEI7WUFDRSxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsa0JBQWtCLENBQUM7UUFDaEQsQ0FBQzs7O09BQUE7O2dCQWxDRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGVBQWU7b0JBQ3pCLFFBQVEsRUFBRSx1ekJBZ0JQO29CQUNILElBQUksRUFBRTt3QkFDSix5QkFBeUIsRUFBRSxNQUFNO3FCQUNsQztpQkFDRjs7OztnQkExQlEsU0FBUztnQkFFVCxjQUFjOzs7eUJBK0JwQixZQUFZLFNBQUMsdUJBQXVCLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFOztJQU0xRCx3QkFBQztDQUFBLEFBbkNELElBbUNDO1NBWlksaUJBQWlCOzs7SUFJNUIsMkNBQXNDOztJQUV0QyxtQ0FDZ0M7O0lBTnBCLHNDQUE4Qjs7Ozs7SUFBRSwyQ0FBc0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBDb21wb25lbnQsIENvbnRlbnRDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBDbHJEYXRhZ3JpZENvbHVtblRvZ2dsZSB9IGZyb20gJy4vZGF0YWdyaWQtY29sdW1uLXRvZ2dsZSc7XG5pbXBvcnQgeyBTZWxlY3Rpb24gfSBmcm9tICcuL3Byb3ZpZGVycy9zZWxlY3Rpb24nO1xuaW1wb3J0IHsgU2VsZWN0aW9uVHlwZSB9IGZyb20gJy4vZW51bXMvc2VsZWN0aW9uLXR5cGUnO1xuaW1wb3J0IHsgQ29sdW1uc1NlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9jb2x1bW5zLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItZGctZm9vdGVyJyxcbiAgdGVtcGxhdGU6IGBcbiAgICAgICAgPG5nLWNvbnRhaW5lclxuICAgICAgICAgICAgKm5nSWY9XCIoc2VsZWN0aW9uLnNlbGVjdGlvblR5cGUgPT09IFNFTEVDVElPTl9UWVBFLk11bHRpKSAmJiAoc2VsZWN0aW9uLmN1cnJlbnQubGVuZ3RoID4gMClcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2xyLWZvcm0tY29udHJvbC1kaXNhYmxlZFwiPlxuICAgICAgICAgICAgICA8Y2xyLWNoZWNrYm94LXdyYXBwZXIgY2xhc3M9XCJkYXRhZ3JpZC1mb290ZXItc2VsZWN0XCI+XG4gICAgICAgICAgICAgICAgPGlucHV0IGNsckNoZWNrYm94IHR5cGU9XCJjaGVja2JveFwiIGNoZWNrZWQ9XCJjaGVja2VkXCIgZGlzYWJsZWQ+XG4gICAgICAgICAgICAgICAgPGxhYmVsPnt7c2VsZWN0aW9uLmN1cnJlbnQubGVuZ3RofX08L2xhYmVsPlxuICAgICAgICAgICAgPC9jbHItY2hlY2tib3gtd3JhcHBlcj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImNsci1kZy1jb2x1bW4tdG9nZ2xlXCI+PC9uZy1jb250ZW50PlxuICAgICAgICA8Y2xyLWRnLWNvbHVtbi10b2dnbGUgKm5nSWY9XCJoYXNIaWRlYWJsZUNvbHVtbnMgJiYgIXRvZ2dsZVwiPjwvY2xyLWRnLWNvbHVtbi10b2dnbGU+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJkYXRhZ3JpZC1mb290ZXItZGVzY3JpcHRpb25cIj5cbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImNsci1kZy1wYWdpbmF0aW9uXCI+PC9uZy1jb250ZW50PlxuICAgIGAsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmRhdGFncmlkLWZvb3Rlcl0nOiAndHJ1ZScsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIENsckRhdGFncmlkRm9vdGVyPFQgPSBhbnk+IHtcbiAgY29uc3RydWN0b3IocHVibGljIHNlbGVjdGlvbjogU2VsZWN0aW9uPFQ+LCBwcml2YXRlIGNvbHVtbnNTZXJ2aWNlOiBDb2x1bW5zU2VydmljZSkge31cblxuICAvKiByZWZlcmVuY2UgdG8gdGhlIGVudW0gc28gdGhhdCB0ZW1wbGF0ZSBjYW4gYWNjZXNzICovXG4gIHB1YmxpYyBTRUxFQ1RJT05fVFlQRSA9IFNlbGVjdGlvblR5cGU7XG5cbiAgQENvbnRlbnRDaGlsZChDbHJEYXRhZ3JpZENvbHVtblRvZ2dsZSwgeyBzdGF0aWM6IGZhbHNlIH0pXG4gIHRvZ2dsZTogQ2xyRGF0YWdyaWRDb2x1bW5Ub2dnbGU7XG5cbiAgZ2V0IGhhc0hpZGVhYmxlQ29sdW1ucygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5jb2x1bW5zU2VydmljZS5oYXNIaWRlYWJsZUNvbHVtbnM7XG4gIH1cbn1cbiJdfQ==