/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export class DatagridStringFilter extends DatagridFilterRegistrar {
    /**
     * @param {?} filters
     * @param {?} domAdapter
     */
    constructor(filters, domAdapter) {
        super(filters);
        this.domAdapter = domAdapter;
        /**
         * Indicates if the filter dropdown is open
         */
        this.open = false;
        this.filterValueChange = new EventEmitter();
    }
    /**
     * Customizable filter logic based on a search text
     * @param {?} value
     * @return {?}
     */
    set customStringFilter(value) {
        if (value instanceof RegisteredFilter) {
            this.setFilter(value);
        }
        else {
            this.setFilter(new DatagridStringFilterImpl(value));
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.filterContainer.openChanged.subscribe((/**
         * @param {?} open
         * @return {?}
         */
        (open) => {
            if (open) {
                // We need the timeout because at the time this executes, the input isn't
                // displayed yet.
                setTimeout((/**
                 * @return {?}
                 */
                () => {
                    this.domAdapter.focus(this.input.nativeElement);
                }));
            }
        }));
    }
    /**
     * Common setter for the input value
     * @return {?}
     */
    get value() {
        return this.filter.value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set value(value) {
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
    }
    /**
     * @return {?}
     */
    close() {
        this.open = false;
    }
}
DatagridStringFilter.decorators = [
    { type: Component, args: [{
                selector: 'clr-dg-string-filter',
                providers: [{ provide: CustomFilter, useExisting: DatagridStringFilter }],
                template: `
        <clr-dg-filter [clrDgFilter]="registered" [(clrDgFilterOpen)]="open">
            <!--
                Even though this *ngIf looks useless because the filter container already has one,
                it prevents NgControlStatus and other directives automatically added by Angular
                on inputs with NgModel from freaking out because of their host binding changing
                mid-change detection when the input is destroyed.
            -->
            <input #input type="text" name="search" [(ngModel)]="value" *ngIf="open"
                (keyup.enter)="close()" (keyup.escape)="close()" class="clr-input" />
        </clr-dg-filter>
    `
            }] }
];
/** @nocollapse */
DatagridStringFilter.ctorParameters = () => [
    { type: FiltersProvider },
    { type: DomAdapter }
];
DatagridStringFilter.propDecorators = {
    customStringFilter: [{ type: Input, args: ['clrDgStringFilter',] }],
    input: [{ type: ViewChild, args: ['input', { static: false },] }],
    filterContainer: [{ type: ViewChild, args: [ClrDatagridFilter, { static: false },] }],
    value: [{ type: Input, args: ['clrFilterValue',] }],
    filterValueChange: [{ type: Output, args: ['clrFilterValueChange',] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtc3RyaW5nLWZpbHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvYnVpbHQtaW4vZmlsdGVycy9kYXRhZ3JpZC1zdHJpbmctZmlsdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtBLE9BQU8sRUFBaUIsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFN0csT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFMUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzdELE9BQU8sRUFBRSxlQUFlLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM1RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDdkUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFFaEYsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sK0JBQStCLENBQUM7Ozs7QUFrQnpFLE1BQU0sT0FBTyxvQkFBOEIsU0FBUSx1QkFBdUQ7Ozs7O0lBRXhHLFlBQVksT0FBMkIsRUFBVSxVQUFzQjtRQUNyRSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFEZ0MsZUFBVSxHQUFWLFVBQVUsQ0FBWTs7OztRQXFCaEUsU0FBSSxHQUFZLEtBQUssQ0FBQztRQTZDRyxzQkFBaUIsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBaEV2RSxDQUFDOzs7Ozs7SUFLRCxJQUNJLGtCQUFrQixDQUNwQixLQUE2RjtRQUU3RixJQUFJLEtBQUssWUFBWSxnQkFBZ0IsRUFBRTtZQUNyQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3ZCO2FBQU07WUFDTCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksd0JBQXdCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUNyRDtJQUNILENBQUM7Ozs7SUFrQkQsZUFBZTtRQUNiLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLFNBQVM7Ozs7UUFBQyxDQUFDLElBQWEsRUFBRSxFQUFFO1lBQzNELElBQUksSUFBSSxFQUFFO2dCQUNSLHlFQUF5RTtnQkFDekUsaUJBQWlCO2dCQUNqQixVQUFVOzs7Z0JBQUMsR0FBRyxFQUFFO29CQUNkLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBQ2xELENBQUMsRUFBQyxDQUFDO2FBQ0o7UUFDSCxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7O0lBS0QsSUFBVyxLQUFLO1FBQ2QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUMzQixDQUFDOzs7OztJQUNELElBQ1csS0FBSyxDQUFDLEtBQWE7UUFDNUIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDaEIsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNWLEtBQUssR0FBRyxFQUFFLENBQUM7U0FDWjtRQUNELElBQUksS0FBSyxLQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFO1lBQy9CLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUMxQixJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3BDO0lBQ0gsQ0FBQzs7OztJQUlNLEtBQUs7UUFDVixJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztJQUNwQixDQUFDOzs7WUF4RkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxzQkFBc0I7Z0JBQ2hDLFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsb0JBQW9CLEVBQUUsQ0FBQztnQkFDekUsUUFBUSxFQUFFOzs7Ozs7Ozs7OztLQVdQO2FBQ0o7Ozs7WUFyQlEsZUFBZTtZQUNmLFVBQVU7OztpQ0E4QmhCLEtBQUssU0FBQyxtQkFBbUI7b0JBbUJ6QixTQUFTLFNBQUMsT0FBTyxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTs4QkFNcEMsU0FBUyxTQUFDLGlCQUFpQixFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtvQkFvQjlDLEtBQUssU0FBQyxnQkFBZ0I7Z0NBY3RCLE1BQU0sU0FBQyxzQkFBc0I7Ozs7Ozs7SUE3QzlCLG9DQUE2Qjs7Ozs7SUFLN0IscUNBQ3lCOzs7OztJQUt6QiwrQ0FDNkM7O0lBaUM3QyxpREFBdUU7Ozs7O0lBbEU5QiwwQ0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IENsckRhdGFncmlkRmlsdGVyIH0gZnJvbSAnLi4vLi4vZGF0YWdyaWQtZmlsdGVyJztcbmltcG9ydCB7IENsckRhdGFncmlkU3RyaW5nRmlsdGVySW50ZXJmYWNlIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9zdHJpbmctZmlsdGVyLmludGVyZmFjZSc7XG5pbXBvcnQgeyBDdXN0b21GaWx0ZXIgfSBmcm9tICcuLi8uLi9wcm92aWRlcnMvY3VzdG9tLWZpbHRlcic7XG5pbXBvcnQgeyBGaWx0ZXJzUHJvdmlkZXIsIFJlZ2lzdGVyZWRGaWx0ZXIgfSBmcm9tICcuLi8uLi9wcm92aWRlcnMvZmlsdGVycyc7XG5pbXBvcnQgeyBEb21BZGFwdGVyIH0gZnJvbSAnLi4vLi4vLi4vLi4vdXRpbHMvZG9tLWFkYXB0ZXIvZG9tLWFkYXB0ZXInO1xuaW1wb3J0IHsgRGF0YWdyaWRGaWx0ZXJSZWdpc3RyYXIgfSBmcm9tICcuLi8uLi91dGlscy9kYXRhZ3JpZC1maWx0ZXItcmVnaXN0cmFyJztcblxuaW1wb3J0IHsgRGF0YWdyaWRTdHJpbmdGaWx0ZXJJbXBsIH0gZnJvbSAnLi9kYXRhZ3JpZC1zdHJpbmctZmlsdGVyLWltcGwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItZGctc3RyaW5nLWZpbHRlcicsXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogQ3VzdG9tRmlsdGVyLCB1c2VFeGlzdGluZzogRGF0YWdyaWRTdHJpbmdGaWx0ZXIgfV0sXG4gIHRlbXBsYXRlOiBgXG4gICAgICAgIDxjbHItZGctZmlsdGVyIFtjbHJEZ0ZpbHRlcl09XCJyZWdpc3RlcmVkXCIgWyhjbHJEZ0ZpbHRlck9wZW4pXT1cIm9wZW5cIj5cbiAgICAgICAgICAgIDwhLS1cbiAgICAgICAgICAgICAgICBFdmVuIHRob3VnaCB0aGlzICpuZ0lmIGxvb2tzIHVzZWxlc3MgYmVjYXVzZSB0aGUgZmlsdGVyIGNvbnRhaW5lciBhbHJlYWR5IGhhcyBvbmUsXG4gICAgICAgICAgICAgICAgaXQgcHJldmVudHMgTmdDb250cm9sU3RhdHVzIGFuZCBvdGhlciBkaXJlY3RpdmVzIGF1dG9tYXRpY2FsbHkgYWRkZWQgYnkgQW5ndWxhclxuICAgICAgICAgICAgICAgIG9uIGlucHV0cyB3aXRoIE5nTW9kZWwgZnJvbSBmcmVha2luZyBvdXQgYmVjYXVzZSBvZiB0aGVpciBob3N0IGJpbmRpbmcgY2hhbmdpbmdcbiAgICAgICAgICAgICAgICBtaWQtY2hhbmdlIGRldGVjdGlvbiB3aGVuIHRoZSBpbnB1dCBpcyBkZXN0cm95ZWQuXG4gICAgICAgICAgICAtLT5cbiAgICAgICAgICAgIDxpbnB1dCAjaW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwic2VhcmNoXCIgWyhuZ01vZGVsKV09XCJ2YWx1ZVwiICpuZ0lmPVwib3BlblwiXG4gICAgICAgICAgICAgICAgKGtleXVwLmVudGVyKT1cImNsb3NlKClcIiAoa2V5dXAuZXNjYXBlKT1cImNsb3NlKClcIiBjbGFzcz1cImNsci1pbnB1dFwiIC8+XG4gICAgICAgIDwvY2xyLWRnLWZpbHRlcj5cbiAgICBgLFxufSlcbmV4cG9ydCBjbGFzcyBEYXRhZ3JpZFN0cmluZ0ZpbHRlcjxUID0gYW55PiBleHRlbmRzIERhdGFncmlkRmlsdGVyUmVnaXN0cmFyPFQsIERhdGFncmlkU3RyaW5nRmlsdGVySW1wbDxUPj5cbiAgaW1wbGVtZW50cyBDdXN0b21GaWx0ZXIsIEFmdGVyVmlld0luaXQge1xuICBjb25zdHJ1Y3RvcihmaWx0ZXJzOiBGaWx0ZXJzUHJvdmlkZXI8VD4sIHByaXZhdGUgZG9tQWRhcHRlcjogRG9tQWRhcHRlcikge1xuICAgIHN1cGVyKGZpbHRlcnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEN1c3RvbWl6YWJsZSBmaWx0ZXIgbG9naWMgYmFzZWQgb24gYSBzZWFyY2ggdGV4dFxuICAgKi9cbiAgQElucHV0KCdjbHJEZ1N0cmluZ0ZpbHRlcicpXG4gIHNldCBjdXN0b21TdHJpbmdGaWx0ZXIoXG4gICAgdmFsdWU6IENsckRhdGFncmlkU3RyaW5nRmlsdGVySW50ZXJmYWNlPFQ+IHwgUmVnaXN0ZXJlZEZpbHRlcjxULCBEYXRhZ3JpZFN0cmluZ0ZpbHRlckltcGw8VD4+XG4gICkge1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFJlZ2lzdGVyZWRGaWx0ZXIpIHtcbiAgICAgIHRoaXMuc2V0RmlsdGVyKHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXRGaWx0ZXIobmV3IERhdGFncmlkU3RyaW5nRmlsdGVySW1wbCh2YWx1ZSkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgaWYgdGhlIGZpbHRlciBkcm9wZG93biBpcyBvcGVuXG4gICAqL1xuICBwdWJsaWMgb3BlbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBXZSBuZWVkIHRoZSBhY3R1YWwgaW5wdXQgZWxlbWVudCB0byBhdXRvbWF0aWNhbGx5IGZvY3VzIG9uIGl0XG4gICAqL1xuICBAVmlld0NoaWxkKCdpbnB1dCcsIHsgc3RhdGljOiBmYWxzZSB9KVxuICBwdWJsaWMgaW5wdXQ6IEVsZW1lbnRSZWY7XG5cbiAgLyoqXG4gICAqIFdlIGdyYWIgdGhlIENsckRhdGFncmlkRmlsdGVyIHdlIHdyYXAgdG8gcmVnaXN0ZXIgdGhpcyBTdHJpbmdGaWx0ZXIgdG8gaXQuXG4gICAqL1xuICBAVmlld0NoaWxkKENsckRhdGFncmlkRmlsdGVyLCB7IHN0YXRpYzogZmFsc2UgfSlcbiAgcHVibGljIGZpbHRlckNvbnRhaW5lcjogQ2xyRGF0YWdyaWRGaWx0ZXI8VD47XG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLmZpbHRlckNvbnRhaW5lci5vcGVuQ2hhbmdlZC5zdWJzY3JpYmUoKG9wZW46IGJvb2xlYW4pID0+IHtcbiAgICAgIGlmIChvcGVuKSB7XG4gICAgICAgIC8vIFdlIG5lZWQgdGhlIHRpbWVvdXQgYmVjYXVzZSBhdCB0aGUgdGltZSB0aGlzIGV4ZWN1dGVzLCB0aGUgaW5wdXQgaXNuJ3RcbiAgICAgICAgLy8gZGlzcGxheWVkIHlldC5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5kb21BZGFwdGVyLmZvY3VzKHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbW1vbiBzZXR0ZXIgZm9yIHRoZSBpbnB1dCB2YWx1ZVxuICAgKi9cbiAgcHVibGljIGdldCB2YWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5maWx0ZXIudmFsdWU7XG4gIH1cbiAgQElucHV0KCdjbHJGaWx0ZXJWYWx1ZScpXG4gIHB1YmxpYyBzZXQgdmFsdWUodmFsdWU6IHN0cmluZykge1xuICAgIGlmICghdGhpcy5maWx0ZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCF2YWx1ZSkge1xuICAgICAgdmFsdWUgPSAnJztcbiAgICB9XG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLmZpbHRlci52YWx1ZSkge1xuICAgICAgdGhpcy5maWx0ZXIudmFsdWUgPSB2YWx1ZTtcbiAgICAgIHRoaXMuZmlsdGVyVmFsdWVDaGFuZ2UuZW1pdCh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgQE91dHB1dCgnY2xyRmlsdGVyVmFsdWVDaGFuZ2UnKSBmaWx0ZXJWYWx1ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBwdWJsaWMgY2xvc2UoKSB7XG4gICAgdGhpcy5vcGVuID0gZmFsc2U7XG4gIH1cbn1cbiJdfQ==