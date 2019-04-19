/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';
import { ColumnsService } from './providers/columns.service';
import { DatagridColumnChanges } from './enums/column-changes.enum';
export class ClrDatagridColumnToggleButton {
    /**
     * @param {?} columnsService
     */
    constructor(columnsService) {
        this.columnsService = columnsService;
    }
    /**
     * @private
     * @return {?}
     */
    hideableColumns() {
        return this.columnsService.columns.filter((/**
         * @param {?} column
         * @return {?}
         */
        column => column.value.hideable));
    }
    /**
     * @return {?}
     */
    get allHideablesVisible() {
        return this.hideableColumns().filter((/**
         * @param {?} column
         * @return {?}
         */
        column => column.value.hidden)).length === 0;
    }
    /**
     * @return {?}
     */
    selectAll() {
        this.hideableColumns().forEach((/**
         * @param {?} hideableColumn
         * @return {?}
         */
        hideableColumn => this.columnsService.emitStateChange(hideableColumn, {
            hidden: false,
            changes: [DatagridColumnChanges.HIDDEN],
        })));
    }
}
ClrDatagridColumnToggleButton.decorators = [
    { type: Component, args: [{
                selector: 'clr-dg-column-toggle-button',
                template: `
    <button class="btn btn-sm btn-link switch-button"
            (click)="selectAll()"
            [disabled]="allHideablesVisible"
            type="button">
      <ng-content></ng-content>
    </button>
  `
            }] }
];
/** @nocollapse */
ClrDatagridColumnToggleButton.ctorParameters = () => [
    { type: ColumnsService }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    ClrDatagridColumnToggleButton.prototype.columnsService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtY29sdW1uLXRvZ2dsZS1idXR0b24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJkYXRhL2RhdGFncmlkL2RhdGFncmlkLWNvbHVtbi10b2dnbGUtYnV0dG9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRzdELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBYXBFLE1BQU0sT0FBTyw2QkFBNkI7Ozs7SUFDeEMsWUFBb0IsY0FBOEI7UUFBOUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO0lBQUcsQ0FBQzs7Ozs7SUFFOUMsZUFBZTtRQUNyQixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLE1BQU07Ozs7UUFBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFDLENBQUM7SUFDN0UsQ0FBQzs7OztJQUVELElBQUksbUJBQW1CO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDLE1BQU07Ozs7UUFBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQztJQUNuRixDQUFDOzs7O0lBRUQsU0FBUztRQUNQLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxPQUFPOzs7O1FBQUMsY0FBYyxDQUFDLEVBQUUsQ0FDOUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsY0FBYyxFQUFFO1lBQ2xELE1BQU0sRUFBRSxLQUFLO1lBQ2IsT0FBTyxFQUFFLENBQUMscUJBQXFCLENBQUMsTUFBTSxDQUFDO1NBQ3hDLENBQUMsRUFDSCxDQUFDO0lBQ0osQ0FBQzs7O1lBN0JGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsNkJBQTZCO2dCQUN2QyxRQUFRLEVBQUU7Ozs7Ozs7R0FPVDthQUNGOzs7O1lBZlEsY0FBYzs7Ozs7OztJQWlCVCx1REFBc0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbHVtbnNTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvY29sdW1ucy5zZXJ2aWNlJztcbmltcG9ydCB7IENvbHVtblN0YXRlIH0gZnJvbSAnLi9pbnRlcmZhY2VzL2NvbHVtbi1zdGF0ZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBEYXRhZ3JpZENvbHVtbkNoYW5nZXMgfSBmcm9tICcuL2VudW1zL2NvbHVtbi1jaGFuZ2VzLmVudW0nO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItZGctY29sdW1uLXRvZ2dsZS1idXR0b24nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXNtIGJ0bi1saW5rIHN3aXRjaC1idXR0b25cIlxuICAgICAgICAgICAgKGNsaWNrKT1cInNlbGVjdEFsbCgpXCJcbiAgICAgICAgICAgIFtkaXNhYmxlZF09XCJhbGxIaWRlYWJsZXNWaXNpYmxlXCJcbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIj5cbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8L2J1dHRvbj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyRGF0YWdyaWRDb2x1bW5Ub2dnbGVCdXR0b24ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbHVtbnNTZXJ2aWNlOiBDb2x1bW5zU2VydmljZSkge31cblxuICBwcml2YXRlIGhpZGVhYmxlQ29sdW1ucygpOiBCZWhhdmlvclN1YmplY3Q8Q29sdW1uU3RhdGU+W10ge1xuICAgIHJldHVybiB0aGlzLmNvbHVtbnNTZXJ2aWNlLmNvbHVtbnMuZmlsdGVyKGNvbHVtbiA9PiBjb2x1bW4udmFsdWUuaGlkZWFibGUpO1xuICB9XG5cbiAgZ2V0IGFsbEhpZGVhYmxlc1Zpc2libGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuaGlkZWFibGVDb2x1bW5zKCkuZmlsdGVyKGNvbHVtbiA9PiBjb2x1bW4udmFsdWUuaGlkZGVuKS5sZW5ndGggPT09IDA7XG4gIH1cblxuICBzZWxlY3RBbGwoKSB7XG4gICAgdGhpcy5oaWRlYWJsZUNvbHVtbnMoKS5mb3JFYWNoKGhpZGVhYmxlQ29sdW1uID0+XG4gICAgICB0aGlzLmNvbHVtbnNTZXJ2aWNlLmVtaXRTdGF0ZUNoYW5nZShoaWRlYWJsZUNvbHVtbiwge1xuICAgICAgICBoaWRkZW46IGZhbHNlLFxuICAgICAgICBjaGFuZ2VzOiBbRGF0YWdyaWRDb2x1bW5DaGFuZ2VzLkhJRERFTl0sXG4gICAgICB9KVxuICAgICk7XG4gIH1cbn1cbiJdfQ==