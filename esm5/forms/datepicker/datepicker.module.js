/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrIconModule } from '../../icon/icon.module';
import { ClrConditionalModule } from '../../utils/conditional/conditional.module';
import { ClrFocusTrapModule } from '../../utils/focus-trap/focus-trap.module';
import { ClrHostWrappingModule } from '../../utils/host-wrapping/host-wrapping.module';
import { ClrCalendar } from './calendar';
import { ClrDateContainer } from './date-container';
import { ClrDateInput } from './date-input';
import { ClrDatepickerViewManager } from './datepicker-view-manager';
import { ClrDay } from './day';
import { ClrDaypicker } from './daypicker';
import { ClrMonthpicker } from './monthpicker';
import { ClrYearpicker } from './yearpicker';
/** @type {?} */
export var CLR_DATEPICKER_DIRECTIVES = [
    ClrDay,
    ClrDateContainer,
    ClrDateInput,
    ClrDatepickerViewManager,
    ClrMonthpicker,
    ClrYearpicker,
    ClrDaypicker,
    ClrCalendar,
];
var ClrDatepickerModule = /** @class */ (function () {
    function ClrDatepickerModule() {
    }
    ClrDatepickerModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, ClrHostWrappingModule, ClrConditionalModule, ClrIconModule, ClrFocusTrapModule],
                    declarations: [CLR_DATEPICKER_DIRECTIVES],
                    exports: [CLR_DATEPICKER_DIRECTIVES],
                    entryComponents: [ClrDateContainer],
                },] }
    ];
    return ClrDatepickerModule;
}());
export { ClrDatepickerModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJmb3Jtcy9kYXRlcGlja2VyL2RhdGVwaWNrZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQU1BLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFRLE1BQU0sZUFBZSxDQUFDO0FBRS9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUNsRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUM5RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUV2RixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDNUMsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDckUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUMvQixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGNBQWMsQ0FBQzs7QUFFN0MsTUFBTSxLQUFPLHlCQUF5QixHQUFnQjtJQUNwRCxNQUFNO0lBQ04sZ0JBQWdCO0lBQ2hCLFlBQVk7SUFDWix3QkFBd0I7SUFDeEIsY0FBYztJQUNkLGFBQWE7SUFDYixZQUFZO0lBQ1osV0FBVztDQUNaO0FBRUQ7SUFBQTtJQU1rQyxDQUFDOztnQkFObEMsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxxQkFBcUIsRUFBRSxvQkFBb0IsRUFBRSxhQUFhLEVBQUUsa0JBQWtCLENBQUM7b0JBQ3ZHLFlBQVksRUFBRSxDQUFDLHlCQUF5QixDQUFDO29CQUN6QyxPQUFPLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQztvQkFDcEMsZUFBZSxFQUFFLENBQUMsZ0JBQWdCLENBQUM7aUJBQ3BDOztJQUNpQywwQkFBQztDQUFBLEFBTm5DLElBTW1DO1NBQXRCLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlLCBUeXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IENsckljb25Nb2R1bGUgfSBmcm9tICcuLi8uLi9pY29uL2ljb24ubW9kdWxlJztcbmltcG9ydCB7IENsckNvbmRpdGlvbmFsTW9kdWxlIH0gZnJvbSAnLi4vLi4vdXRpbHMvY29uZGl0aW9uYWwvY29uZGl0aW9uYWwubW9kdWxlJztcbmltcG9ydCB7IENsckZvY3VzVHJhcE1vZHVsZSB9IGZyb20gJy4uLy4uL3V0aWxzL2ZvY3VzLXRyYXAvZm9jdXMtdHJhcC5tb2R1bGUnO1xuaW1wb3J0IHsgQ2xySG9zdFdyYXBwaW5nTW9kdWxlIH0gZnJvbSAnLi4vLi4vdXRpbHMvaG9zdC13cmFwcGluZy9ob3N0LXdyYXBwaW5nLm1vZHVsZSc7XG5cbmltcG9ydCB7IENsckNhbGVuZGFyIH0gZnJvbSAnLi9jYWxlbmRhcic7XG5pbXBvcnQgeyBDbHJEYXRlQ29udGFpbmVyIH0gZnJvbSAnLi9kYXRlLWNvbnRhaW5lcic7XG5pbXBvcnQgeyBDbHJEYXRlSW5wdXQgfSBmcm9tICcuL2RhdGUtaW5wdXQnO1xuaW1wb3J0IHsgQ2xyRGF0ZXBpY2tlclZpZXdNYW5hZ2VyIH0gZnJvbSAnLi9kYXRlcGlja2VyLXZpZXctbWFuYWdlcic7XG5pbXBvcnQgeyBDbHJEYXkgfSBmcm9tICcuL2RheSc7XG5pbXBvcnQgeyBDbHJEYXlwaWNrZXIgfSBmcm9tICcuL2RheXBpY2tlcic7XG5pbXBvcnQgeyBDbHJNb250aHBpY2tlciB9IGZyb20gJy4vbW9udGhwaWNrZXInO1xuaW1wb3J0IHsgQ2xyWWVhcnBpY2tlciB9IGZyb20gJy4veWVhcnBpY2tlcic7XG5cbmV4cG9ydCBjb25zdCBDTFJfREFURVBJQ0tFUl9ESVJFQ1RJVkVTOiBUeXBlPGFueT5bXSA9IFtcbiAgQ2xyRGF5LFxuICBDbHJEYXRlQ29udGFpbmVyLFxuICBDbHJEYXRlSW5wdXQsXG4gIENsckRhdGVwaWNrZXJWaWV3TWFuYWdlcixcbiAgQ2xyTW9udGhwaWNrZXIsXG4gIENsclllYXJwaWNrZXIsXG4gIENsckRheXBpY2tlcixcbiAgQ2xyQ2FsZW5kYXIsXG5dO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBDbHJIb3N0V3JhcHBpbmdNb2R1bGUsIENsckNvbmRpdGlvbmFsTW9kdWxlLCBDbHJJY29uTW9kdWxlLCBDbHJGb2N1c1RyYXBNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtDTFJfREFURVBJQ0tFUl9ESVJFQ1RJVkVTXSxcbiAgZXhwb3J0czogW0NMUl9EQVRFUElDS0VSX0RJUkVDVElWRVNdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtDbHJEYXRlQ29udGFpbmVyXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyRGF0ZXBpY2tlck1vZHVsZSB7fVxuIl19