/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ClrDatagridFilter } from '../../datagrid-filter';
import { CustomFilter } from '../../providers/custom-filter';
import { FiltersProvider, RegisteredFilter } from '../../providers/filters';
import { DomAdapter } from '../../../../utils/dom-adapter/dom-adapter';
import { DatagridFilterRegistrar } from '../../utils/datagrid-filter-registrar';
import { DatagridStringFilterImpl } from './datagrid-string-filter-impl';
/**
 * @template T
 */
var DatagridStringFilter = /** @class */ (function (_super) {
    tslib_1.__extends(DatagridStringFilter, _super);
    function DatagridStringFilter(filters, domAdapter) {
        var _this = _super.call(this, filters) || this;
        _this.domAdapter = domAdapter;
        /**
         * Indicates if the filter dropdown is open
         */
        _this.open = false;
        _this.filterValueChange = new EventEmitter();
        return _this;
    }
    Object.defineProperty(DatagridStringFilter.prototype, "customStringFilter", {
        /**
         * Customizable filter logic based on a search text
         */
        set: /**
         * Customizable filter logic based on a search text
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value instanceof RegisteredFilter) {
                this.setFilter(value);
            }
            else {
                this.setFilter(new DatagridStringFilterImpl(value));
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DatagridStringFilter.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.filterContainer.openChanged.subscribe((/**
         * @param {?} open
         * @return {?}
         */
        function (open) {
            if (open) {
                // We need the timeout because at the time this executes, the input isn't
                // displayed yet.
                setTimeout((/**
                 * @return {?}
                 */
                function () {
                    _this.domAdapter.focus(_this.input.nativeElement);
                }));
            }
        }));
    };
    Object.defineProperty(DatagridStringFilter.prototype, "value", {
        /**
         * Common setter for the input value
         */
        get: /**
         * Common setter for the input value
         * @return {?}
         */
        function () {
            return this.filter.value;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (!this.filter) {
                return;
            }
            if (!value) {
                value = '';
            }
            if (value !== this.filter.value) {
                this.filter.value = value;
                this.filterValueChange.emit(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DatagridStringFilter.prototype.close = /**
     * @return {?}
     */
    function () {
        this.open = false;
    };
    DatagridStringFilter.decorators = [
        { type: Component, args: [{
                    selector: 'clr-dg-string-filter',
                    providers: [{ provide: CustomFilter, useExisting: DatagridStringFilter }],
                    template: "\n        <clr-dg-filter [clrDgFilter]=\"registered\" [(clrDgFilterOpen)]=\"open\">\n            <!--\n                Even though this *ngIf looks useless because the filter container already has one,\n                it prevents NgControlStatus and other directives automatically added by Angular\n                on inputs with NgModel from freaking out because of their host binding changing\n                mid-change detection when the input is destroyed.\n            -->\n            <input #input type=\"text\" name=\"search\" [(ngModel)]=\"value\" *ngIf=\"open\"\n                (keyup.enter)=\"close()\" (keyup.escape)=\"close()\" class=\"clr-input\" />\n        </clr-dg-filter>\n    "
                }] }
    ];
    /** @nocollapse */
    DatagridStringFilter.ctorParameters = function () { return [
        { type: FiltersProvider },
        { type: DomAdapter }
    ]; };
    DatagridStringFilter.propDecorators = {
        customStringFilter: [{ type: Input, args: ['clrDgStringFilter',] }],
        input: [{ type: ViewChild, args: ['input', { static: false },] }],
        filterContainer: [{ type: ViewChild, args: [ClrDatagridFilter, { static: false },] }],
        value: [{ type: Input, args: ['clrFilterValue',] }],
        filterValueChange: [{ type: Output, args: ['clrFilterValueChange',] }]
    };
    return DatagridStringFilter;
}(DatagridFilterRegistrar));
export { DatagridStringFilter };
if (false) {
    /**
     * Indicates if the filter dropdown is open
     * @type {?}
     */
    DatagridStringFilter.prototype.open;
    /**
     * We need the actual input element to automatically focus on it
     * @type {?}
     */
    DatagridStringFilter.prototype.input;
    /**
     * We grab the ClrDatagridFilter we wrap to register this StringFilter to it.
     * @type {?}
     */
    DatagridStringFilter.prototype.filterContainer;
    /** @type {?} */
    DatagridStringFilter.prototype.filterValueChange;
    /**
     * @type {?}
     * @private
     */
    DatagridStringFilter.prototype.domAdapter;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtc3RyaW5nLWZpbHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvYnVpbHQtaW4vZmlsdGVycy9kYXRhZ3JpZC1zdHJpbmctZmlsdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFLQSxPQUFPLEVBQWlCLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTdHLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRTFELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM3RCxPQUFPLEVBQUUsZUFBZSxFQUFFLGdCQUFnQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDNUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBRWhGLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLCtCQUErQixDQUFDOzs7O0FBRXpFO0lBZ0JtRCxnREFBdUQ7SUFFeEcsOEJBQVksT0FBMkIsRUFBVSxVQUFzQjtRQUF2RSxZQUNFLGtCQUFNLE9BQU8sQ0FBQyxTQUNmO1FBRmdELGdCQUFVLEdBQVYsVUFBVSxDQUFZOzs7O1FBcUJoRSxVQUFJLEdBQVksS0FBSyxDQUFDO1FBNkNHLHVCQUFpQixHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7O0lBaEV2RSxDQUFDO0lBS0Qsc0JBQ0ksb0RBQWtCO1FBSnRCOztXQUVHOzs7Ozs7UUFDSCxVQUVFLEtBQTZGO1lBRTdGLElBQUksS0FBSyxZQUFZLGdCQUFnQixFQUFFO2dCQUNyQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3ZCO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSx3QkFBd0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2FBQ3JEO1FBQ0gsQ0FBQzs7O09BQUE7Ozs7SUFrQkQsOENBQWU7OztJQUFmO1FBQUEsaUJBVUM7UUFUQyxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxTQUFTOzs7O1FBQUMsVUFBQyxJQUFhO1lBQ3ZELElBQUksSUFBSSxFQUFFO2dCQUNSLHlFQUF5RTtnQkFDekUsaUJBQWlCO2dCQUNqQixVQUFVOzs7Z0JBQUM7b0JBQ1QsS0FBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDbEQsQ0FBQyxFQUFDLENBQUM7YUFDSjtRQUNILENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQztJQUtELHNCQUFXLHVDQUFLO1FBSGhCOztXQUVHOzs7OztRQUNIO1lBQ0UsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUMzQixDQUFDOzs7OztRQUNELFVBQ2lCLEtBQWE7WUFDNUIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ2hCLE9BQU87YUFDUjtZQUNELElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1YsS0FBSyxHQUFHLEVBQUUsQ0FBQzthQUNaO1lBQ0QsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUU7Z0JBQy9CLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztnQkFDMUIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNwQztRQUNILENBQUM7OztPQWJBOzs7O0lBaUJNLG9DQUFLOzs7SUFBWjtRQUNFLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO0lBQ3BCLENBQUM7O2dCQXhGRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtvQkFDaEMsU0FBUyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxvQkFBb0IsRUFBRSxDQUFDO29CQUN6RSxRQUFRLEVBQUUsNHJCQVdQO2lCQUNKOzs7O2dCQXJCUSxlQUFlO2dCQUNmLFVBQVU7OztxQ0E4QmhCLEtBQUssU0FBQyxtQkFBbUI7d0JBbUJ6QixTQUFTLFNBQUMsT0FBTyxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtrQ0FNcEMsU0FBUyxTQUFDLGlCQUFpQixFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTt3QkFvQjlDLEtBQUssU0FBQyxnQkFBZ0I7b0NBY3RCLE1BQU0sU0FBQyxzQkFBc0I7O0lBS2hDLDJCQUFDO0NBQUEsQUF6RkQsQ0FnQm1ELHVCQUF1QixHQXlFekU7U0F6RVksb0JBQW9COzs7Ozs7SUF1Qi9CLG9DQUE2Qjs7Ozs7SUFLN0IscUNBQ3lCOzs7OztJQUt6QiwrQ0FDNkM7O0lBaUM3QyxpREFBdUU7Ozs7O0lBbEU5QiwwQ0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IENsckRhdGFncmlkRmlsdGVyIH0gZnJvbSAnLi4vLi4vZGF0YWdyaWQtZmlsdGVyJztcbmltcG9ydCB7IENsckRhdGFncmlkU3RyaW5nRmlsdGVySW50ZXJmYWNlIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9zdHJpbmctZmlsdGVyLmludGVyZmFjZSc7XG5pbXBvcnQgeyBDdXN0b21GaWx0ZXIgfSBmcm9tICcuLi8uLi9wcm92aWRlcnMvY3VzdG9tLWZpbHRlcic7XG5pbXBvcnQgeyBGaWx0ZXJzUHJvdmlkZXIsIFJlZ2lzdGVyZWRGaWx0ZXIgfSBmcm9tICcuLi8uLi9wcm92aWRlcnMvZmlsdGVycyc7XG5pbXBvcnQgeyBEb21BZGFwdGVyIH0gZnJvbSAnLi4vLi4vLi4vLi4vdXRpbHMvZG9tLWFkYXB0ZXIvZG9tLWFkYXB0ZXInO1xuaW1wb3J0IHsgRGF0YWdyaWRGaWx0ZXJSZWdpc3RyYXIgfSBmcm9tICcuLi8uLi91dGlscy9kYXRhZ3JpZC1maWx0ZXItcmVnaXN0cmFyJztcblxuaW1wb3J0IHsgRGF0YWdyaWRTdHJpbmdGaWx0ZXJJbXBsIH0gZnJvbSAnLi9kYXRhZ3JpZC1zdHJpbmctZmlsdGVyLWltcGwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItZGctc3RyaW5nLWZpbHRlcicsXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogQ3VzdG9tRmlsdGVyLCB1c2VFeGlzdGluZzogRGF0YWdyaWRTdHJpbmdGaWx0ZXIgfV0sXG4gIHRlbXBsYXRlOiBgXG4gICAgICAgIDxjbHItZGctZmlsdGVyIFtjbHJEZ0ZpbHRlcl09XCJyZWdpc3RlcmVkXCIgWyhjbHJEZ0ZpbHRlck9wZW4pXT1cIm9wZW5cIj5cbiAgICAgICAgICAgIDwhLS1cbiAgICAgICAgICAgICAgICBFdmVuIHRob3VnaCB0aGlzICpuZ0lmIGxvb2tzIHVzZWxlc3MgYmVjYXVzZSB0aGUgZmlsdGVyIGNvbnRhaW5lciBhbHJlYWR5IGhhcyBvbmUsXG4gICAgICAgICAgICAgICAgaXQgcHJldmVudHMgTmdDb250cm9sU3RhdHVzIGFuZCBvdGhlciBkaXJlY3RpdmVzIGF1dG9tYXRpY2FsbHkgYWRkZWQgYnkgQW5ndWxhclxuICAgICAgICAgICAgICAgIG9uIGlucHV0cyB3aXRoIE5nTW9kZWwgZnJvbSBmcmVha2luZyBvdXQgYmVjYXVzZSBvZiB0aGVpciBob3N0IGJpbmRpbmcgY2hhbmdpbmdcbiAgICAgICAgICAgICAgICBtaWQtY2hhbmdlIGRldGVjdGlvbiB3aGVuIHRoZSBpbnB1dCBpcyBkZXN0cm95ZWQuXG4gICAgICAgICAgICAtLT5cbiAgICAgICAgICAgIDxpbnB1dCAjaW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwic2VhcmNoXCIgWyhuZ01vZGVsKV09XCJ2YWx1ZVwiICpuZ0lmPVwib3BlblwiXG4gICAgICAgICAgICAgICAgKGtleXVwLmVudGVyKT1cImNsb3NlKClcIiAoa2V5dXAuZXNjYXBlKT1cImNsb3NlKClcIiBjbGFzcz1cImNsci1pbnB1dFwiIC8+XG4gICAgICAgIDwvY2xyLWRnLWZpbHRlcj5cbiAgICBgLFxufSlcbmV4cG9ydCBjbGFzcyBEYXRhZ3JpZFN0cmluZ0ZpbHRlcjxUID0gYW55PiBleHRlbmRzIERhdGFncmlkRmlsdGVyUmVnaXN0cmFyPFQsIERhdGFncmlkU3RyaW5nRmlsdGVySW1wbDxUPj5cbiAgaW1wbGVtZW50cyBDdXN0b21GaWx0ZXIsIEFmdGVyVmlld0luaXQge1xuICBjb25zdHJ1Y3RvcihmaWx0ZXJzOiBGaWx0ZXJzUHJvdmlkZXI8VD4sIHByaXZhdGUgZG9tQWRhcHRlcjogRG9tQWRhcHRlcikge1xuICAgIHN1cGVyKGZpbHRlcnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEN1c3RvbWl6YWJsZSBmaWx0ZXIgbG9naWMgYmFzZWQgb24gYSBzZWFyY2ggdGV4dFxuICAgKi9cbiAgQElucHV0KCdjbHJEZ1N0cmluZ0ZpbHRlcicpXG4gIHNldCBjdXN0b21TdHJpbmdGaWx0ZXIoXG4gICAgdmFsdWU6IENsckRhdGFncmlkU3RyaW5nRmlsdGVySW50ZXJmYWNlPFQ+IHwgUmVnaXN0ZXJlZEZpbHRlcjxULCBEYXRhZ3JpZFN0cmluZ0ZpbHRlckltcGw8VD4+XG4gICkge1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFJlZ2lzdGVyZWRGaWx0ZXIpIHtcbiAgICAgIHRoaXMuc2V0RmlsdGVyKHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXRGaWx0ZXIobmV3IERhdGFncmlkU3RyaW5nRmlsdGVySW1wbCh2YWx1ZSkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgaWYgdGhlIGZpbHRlciBkcm9wZG93biBpcyBvcGVuXG4gICAqL1xuICBwdWJsaWMgb3BlbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBXZSBuZWVkIHRoZSBhY3R1YWwgaW5wdXQgZWxlbWVudCB0byBhdXRvbWF0aWNhbGx5IGZvY3VzIG9uIGl0XG4gICAqL1xuICBAVmlld0NoaWxkKCdpbnB1dCcsIHsgc3RhdGljOiBmYWxzZSB9KVxuICBwdWJsaWMgaW5wdXQ6IEVsZW1lbnRSZWY7XG5cbiAgLyoqXG4gICAqIFdlIGdyYWIgdGhlIENsckRhdGFncmlkRmlsdGVyIHdlIHdyYXAgdG8gcmVnaXN0ZXIgdGhpcyBTdHJpbmdGaWx0ZXIgdG8gaXQuXG4gICAqL1xuICBAVmlld0NoaWxkKENsckRhdGFncmlkRmlsdGVyLCB7IHN0YXRpYzogZmFsc2UgfSlcbiAgcHVibGljIGZpbHRlckNvbnRhaW5lcjogQ2xyRGF0YWdyaWRGaWx0ZXI8VD47XG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLmZpbHRlckNvbnRhaW5lci5vcGVuQ2hhbmdlZC5zdWJzY3JpYmUoKG9wZW46IGJvb2xlYW4pID0+IHtcbiAgICAgIGlmIChvcGVuKSB7XG4gICAgICAgIC8vIFdlIG5lZWQgdGhlIHRpbWVvdXQgYmVjYXVzZSBhdCB0aGUgdGltZSB0aGlzIGV4ZWN1dGVzLCB0aGUgaW5wdXQgaXNuJ3RcbiAgICAgICAgLy8gZGlzcGxheWVkIHlldC5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5kb21BZGFwdGVyLmZvY3VzKHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbW1vbiBzZXR0ZXIgZm9yIHRoZSBpbnB1dCB2YWx1ZVxuICAgKi9cbiAgcHVibGljIGdldCB2YWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5maWx0ZXIudmFsdWU7XG4gIH1cbiAgQElucHV0KCdjbHJGaWx0ZXJWYWx1ZScpXG4gIHB1YmxpYyBzZXQgdmFsdWUodmFsdWU6IHN0cmluZykge1xuICAgIGlmICghdGhpcy5maWx0ZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCF2YWx1ZSkge1xuICAgICAgdmFsdWUgPSAnJztcbiAgICB9XG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLmZpbHRlci52YWx1ZSkge1xuICAgICAgdGhpcy5maWx0ZXIudmFsdWUgPSB2YWx1ZTtcbiAgICAgIHRoaXMuZmlsdGVyVmFsdWVDaGFuZ2UuZW1pdCh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgQE91dHB1dCgnY2xyRmlsdGVyVmFsdWVDaGFuZ2UnKSBmaWx0ZXJWYWx1ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBwdWJsaWMgY2xvc2UoKSB7XG4gICAgdGhpcy5vcGVuID0gZmFsc2U7XG4gIH1cbn1cbiJdfQ==