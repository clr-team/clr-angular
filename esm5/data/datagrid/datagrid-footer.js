/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { ChangeDetectorRef, Component, ContentChild } from '@angular/core';
import { ClrDatagridColumnToggle } from './datagrid-column-toggle';
import { HideableColumnService } from './providers/hideable-column.service';
import { Selection, SelectionType } from './providers/selection';
/**
 * @template T
 */
var ClrDatagridFooter = /** @class */ (function () {
    function ClrDatagridFooter(selection, hideableColumnService, cdr) {
        this.selection = selection;
        this.hideableColumnService = hideableColumnService;
        this.cdr = cdr;
        this.subscriptions = [];
        /* reference to the enum so that template can access */
        this.SELECTION_TYPE = SelectionType;
    }
    /**
     * @return {?}
     */
    ClrDatagridFooter.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.subscriptions.push(this.hideableColumnService.columnListChange.subscribe(function (change) {
            /** @type {?} */
            var hiddenColumnsInSub = change.filter(function (col) { return col; });
            if (hiddenColumnsInSub.length > 0) {
                _this.activeToggler = true;
            }
        }));
        /** @type {?} */
        var hiddenColumns = this.hideableColumnService.getColumns().filter(function (col) { return col; });
        if (hiddenColumns.length > 0) {
            this.activeToggler = true;
        }
    };
    /**
     * @return {?}
     */
    ClrDatagridFooter.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subscriptions.forEach(function (sub) {
            sub.unsubscribe();
        });
    };
    ClrDatagridFooter.decorators = [
        { type: Component, args: [{
                    selector: 'clr-dg-footer',
                    template: "\n        <ng-container\n            *ngIf=\"(selection.selectionType === SELECTION_TYPE.Multi) && (selection.current.length > 0)\">\n            <clr-checkbox-container class=\"datagrid-footer-select disabled\">\n                <input clrCheckbox type=\"checkbox\" checked=\"checked\" disabled>\n                <label>{{selection.current.length}}</label>\n            </clr-checkbox-container>\n        </ng-container>\n        <ng-content select=\"clr-dg-column-toggle\"></ng-content>\n        <clr-dg-column-toggle *ngIf=\"!toggle && activeToggler\"></clr-dg-column-toggle>\n        <div class=\"datagrid-footer-description\">\n            <ng-content></ng-content>\n        </div>\n        <ng-content select=\"clr-dg-pagination\"></ng-content>\n    ",
                    host: {
                        '[class.datagrid-footer]': 'true',
                    }
                }] }
    ];
    /** @nocollapse */
    ClrDatagridFooter.ctorParameters = function () { return [
        { type: Selection },
        { type: HideableColumnService },
        { type: ChangeDetectorRef }
    ]; };
    ClrDatagridFooter.propDecorators = {
        toggle: [{ type: ContentChild, args: [ClrDatagridColumnToggle,] }]
    };
    return ClrDatagridFooter;
}());
export { ClrDatagridFooter };
if (false) {
    /** @type {?} */
    ClrDatagridFooter.prototype.activeToggler;
    /** @type {?} */
    ClrDatagridFooter.prototype.subscriptions;
    /** @type {?} */
    ClrDatagridFooter.prototype.SELECTION_TYPE;
    /** @type {?} */
    ClrDatagridFooter.prototype.toggle;
    /** @type {?} */
    ClrDatagridFooter.prototype.selection;
    /** @type {?} */
    ClrDatagridFooter.prototype.hideableColumnService;
    /** @type {?} */
    ClrDatagridFooter.prototype.cdr;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtZm9vdGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9kYXRhZ3JpZC1mb290ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFHbkYsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDbkUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDNUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7OztBQUVqRTtJQXNCRSwyQkFDUyxTQUF1QixFQUN2QixxQkFBNEMsRUFDNUMsR0FBc0I7UUFGdEIsY0FBUyxHQUFULFNBQVMsQ0FBYztRQUN2QiwwQkFBcUIsR0FBckIscUJBQXFCLENBQXVCO1FBQzVDLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBSXZCLGtCQUFhLEdBQW1CLEVBQUUsQ0FBQzs7UUFHcEMsbUJBQWMsR0FBRyxhQUFhLENBQUM7SUFObkMsQ0FBQzs7OztJQVVKLG9DQUFROzs7SUFBUjtRQUFBLGlCQWVDO1FBZEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQ3JCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsVUFBQSxNQUFNOztnQkFDcEQsa0JBQWtCLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsRUFBSCxDQUFHLENBQUM7WUFDcEQsSUFBSSxrQkFBa0IsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUNqQyxLQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQzthQUMzQjtRQUNILENBQUMsQ0FBQyxDQUNILENBQUM7O1lBRUksYUFBYSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLEVBQUgsQ0FBRyxDQUFDO1FBRWhGLElBQUksYUFBYSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDNUIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7U0FDM0I7SUFDSCxDQUFDOzs7O0lBRUQsdUNBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHO1lBQzVCLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNwQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7O2dCQXpERixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGVBQWU7b0JBQ3pCLFFBQVEsRUFBRSxzdkJBY1A7b0JBQ0gsSUFBSSxFQUFFO3dCQUNKLHlCQUF5QixFQUFFLE1BQU07cUJBQ2xDO2lCQUNGOzs7O2dCQXRCUSxTQUFTO2dCQURULHFCQUFxQjtnQkFKckIsaUJBQWlCOzs7eUJBeUN2QixZQUFZLFNBQUMsdUJBQXVCOztJQXdCdkMsd0JBQUM7Q0FBQSxBQTFERCxJQTBEQztTQXJDWSxpQkFBaUI7OztJQU81QiwwQ0FBOEI7O0lBQzlCLDBDQUEyQzs7SUFHM0MsMkNBQXNDOztJQUV0QyxtQ0FBdUU7O0lBWHJFLHNDQUE4Qjs7SUFDOUIsa0RBQW1EOztJQUNuRCxnQ0FBNkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBDb250ZW50Q2hpbGQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IENsckRhdGFncmlkQ29sdW1uVG9nZ2xlIH0gZnJvbSAnLi9kYXRhZ3JpZC1jb2x1bW4tdG9nZ2xlJztcbmltcG9ydCB7IEhpZGVhYmxlQ29sdW1uU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2hpZGVhYmxlLWNvbHVtbi5zZXJ2aWNlJztcbmltcG9ydCB7IFNlbGVjdGlvbiwgU2VsZWN0aW9uVHlwZSB9IGZyb20gJy4vcHJvdmlkZXJzL3NlbGVjdGlvbic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci1kZy1mb290ZXInLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgICA8bmctY29udGFpbmVyXG4gICAgICAgICAgICAqbmdJZj1cIihzZWxlY3Rpb24uc2VsZWN0aW9uVHlwZSA9PT0gU0VMRUNUSU9OX1RZUEUuTXVsdGkpICYmIChzZWxlY3Rpb24uY3VycmVudC5sZW5ndGggPiAwKVwiPlxuICAgICAgICAgICAgPGNsci1jaGVja2JveC1jb250YWluZXIgY2xhc3M9XCJkYXRhZ3JpZC1mb290ZXItc2VsZWN0IGRpc2FibGVkXCI+XG4gICAgICAgICAgICAgICAgPGlucHV0IGNsckNoZWNrYm94IHR5cGU9XCJjaGVja2JveFwiIGNoZWNrZWQ9XCJjaGVja2VkXCIgZGlzYWJsZWQ+XG4gICAgICAgICAgICAgICAgPGxhYmVsPnt7c2VsZWN0aW9uLmN1cnJlbnQubGVuZ3RofX08L2xhYmVsPlxuICAgICAgICAgICAgPC9jbHItY2hlY2tib3gtY29udGFpbmVyPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiY2xyLWRnLWNvbHVtbi10b2dnbGVcIj48L25nLWNvbnRlbnQ+XG4gICAgICAgIDxjbHItZGctY29sdW1uLXRvZ2dsZSAqbmdJZj1cIiF0b2dnbGUgJiYgYWN0aXZlVG9nZ2xlclwiPjwvY2xyLWRnLWNvbHVtbi10b2dnbGU+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJkYXRhZ3JpZC1mb290ZXItZGVzY3JpcHRpb25cIj5cbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImNsci1kZy1wYWdpbmF0aW9uXCI+PC9uZy1jb250ZW50PlxuICAgIGAsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmRhdGFncmlkLWZvb3Rlcl0nOiAndHJ1ZScsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIENsckRhdGFncmlkRm9vdGVyPFQgPSBhbnk+IGltcGxlbWVudHMgT25Jbml0IHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIHNlbGVjdGlvbjogU2VsZWN0aW9uPFQ+LFxuICAgIHB1YmxpYyBoaWRlYWJsZUNvbHVtblNlcnZpY2U6IEhpZGVhYmxlQ29sdW1uU2VydmljZSxcbiAgICBwdWJsaWMgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZlxuICApIHt9XG5cbiAgcHVibGljIGFjdGl2ZVRvZ2dsZXI6IGJvb2xlYW47XG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICAvKiByZWZlcmVuY2UgdG8gdGhlIGVudW0gc28gdGhhdCB0ZW1wbGF0ZSBjYW4gYWNjZXNzICovXG4gIHB1YmxpYyBTRUxFQ1RJT05fVFlQRSA9IFNlbGVjdGlvblR5cGU7XG5cbiAgQENvbnRlbnRDaGlsZChDbHJEYXRhZ3JpZENvbHVtblRvZ2dsZSkgdG9nZ2xlOiBDbHJEYXRhZ3JpZENvbHVtblRvZ2dsZTtcblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMuaGlkZWFibGVDb2x1bW5TZXJ2aWNlLmNvbHVtbkxpc3RDaGFuZ2Uuc3Vic2NyaWJlKGNoYW5nZSA9PiB7XG4gICAgICAgIGNvbnN0IGhpZGRlbkNvbHVtbnNJblN1YiA9IGNoYW5nZS5maWx0ZXIoY29sID0+IGNvbCk7XG4gICAgICAgIGlmIChoaWRkZW5Db2x1bW5zSW5TdWIubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHRoaXMuYWN0aXZlVG9nZ2xlciA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcblxuICAgIGNvbnN0IGhpZGRlbkNvbHVtbnMgPSB0aGlzLmhpZGVhYmxlQ29sdW1uU2VydmljZS5nZXRDb2x1bW5zKCkuZmlsdGVyKGNvbCA9PiBjb2wpO1xuXG4gICAgaWYgKGhpZGRlbkNvbHVtbnMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5hY3RpdmVUb2dnbGVyID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaChzdWIgPT4ge1xuICAgICAgc3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==