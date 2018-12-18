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
import { ClrCommonFormsModule } from '../common';
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
                    imports: [
                        CommonModule,
                        ClrHostWrappingModule,
                        ClrConditionalModule,
                        ClrIconModule,
                        ClrFocusTrapModule,
                        ClrCommonFormsModule,
                    ],
                    declarations: [CLR_DATEPICKER_DIRECTIVES],
                    exports: [CLR_DATEPICKER_DIRECTIVES],
                    entryComponents: [ClrDateContainer],
                },] }
    ];
    return ClrDatepickerModule;
}());
export { ClrDatepickerModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJmb3Jtcy9kYXRlcGlja2VyL2RhdGVwaWNrZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQU1BLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFRLE1BQU0sZUFBZSxDQUFDO0FBRS9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUNsRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUM5RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUN2RixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFFakQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUN6QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzVDLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDL0IsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUMzQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxjQUFjLENBQUM7O0FBRTdDLE1BQU0sS0FBTyx5QkFBeUIsR0FBZ0I7SUFDcEQsTUFBTTtJQUNOLGdCQUFnQjtJQUNoQixZQUFZO0lBQ1osd0JBQXdCO0lBQ3hCLGNBQWM7SUFDZCxhQUFhO0lBQ2IsWUFBWTtJQUNaLFdBQVc7Q0FDWjtBQUVEO0lBQUE7SUFha0MsQ0FBQzs7Z0JBYmxDLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixxQkFBcUI7d0JBQ3JCLG9CQUFvQjt3QkFDcEIsYUFBYTt3QkFDYixrQkFBa0I7d0JBQ2xCLG9CQUFvQjtxQkFDckI7b0JBQ0QsWUFBWSxFQUFFLENBQUMseUJBQXlCLENBQUM7b0JBQ3pDLE9BQU8sRUFBRSxDQUFDLHlCQUF5QixDQUFDO29CQUNwQyxlQUFlLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQztpQkFDcEM7O0lBQ2lDLDBCQUFDO0NBQUEsQUFibkMsSUFhbUM7U0FBdEIsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUsIFR5cGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQ2xySWNvbk1vZHVsZSB9IGZyb20gJy4uLy4uL2ljb24vaWNvbi5tb2R1bGUnO1xuaW1wb3J0IHsgQ2xyQ29uZGl0aW9uYWxNb2R1bGUgfSBmcm9tICcuLi8uLi91dGlscy9jb25kaXRpb25hbC9jb25kaXRpb25hbC5tb2R1bGUnO1xuaW1wb3J0IHsgQ2xyRm9jdXNUcmFwTW9kdWxlIH0gZnJvbSAnLi4vLi4vdXRpbHMvZm9jdXMtdHJhcC9mb2N1cy10cmFwLm1vZHVsZSc7XG5pbXBvcnQgeyBDbHJIb3N0V3JhcHBpbmdNb2R1bGUgfSBmcm9tICcuLi8uLi91dGlscy9ob3N0LXdyYXBwaW5nL2hvc3Qtd3JhcHBpbmcubW9kdWxlJztcbmltcG9ydCB7IENsckNvbW1vbkZvcm1zTW9kdWxlIH0gZnJvbSAnLi4vY29tbW9uJztcblxuaW1wb3J0IHsgQ2xyQ2FsZW5kYXIgfSBmcm9tICcuL2NhbGVuZGFyJztcbmltcG9ydCB7IENsckRhdGVDb250YWluZXIgfSBmcm9tICcuL2RhdGUtY29udGFpbmVyJztcbmltcG9ydCB7IENsckRhdGVJbnB1dCB9IGZyb20gJy4vZGF0ZS1pbnB1dCc7XG5pbXBvcnQgeyBDbHJEYXRlcGlja2VyVmlld01hbmFnZXIgfSBmcm9tICcuL2RhdGVwaWNrZXItdmlldy1tYW5hZ2VyJztcbmltcG9ydCB7IENsckRheSB9IGZyb20gJy4vZGF5JztcbmltcG9ydCB7IENsckRheXBpY2tlciB9IGZyb20gJy4vZGF5cGlja2VyJztcbmltcG9ydCB7IENsck1vbnRocGlja2VyIH0gZnJvbSAnLi9tb250aHBpY2tlcic7XG5pbXBvcnQgeyBDbHJZZWFycGlja2VyIH0gZnJvbSAnLi95ZWFycGlja2VyJztcblxuZXhwb3J0IGNvbnN0IENMUl9EQVRFUElDS0VSX0RJUkVDVElWRVM6IFR5cGU8YW55PltdID0gW1xuICBDbHJEYXksXG4gIENsckRhdGVDb250YWluZXIsXG4gIENsckRhdGVJbnB1dCxcbiAgQ2xyRGF0ZXBpY2tlclZpZXdNYW5hZ2VyLFxuICBDbHJNb250aHBpY2tlcixcbiAgQ2xyWWVhcnBpY2tlcixcbiAgQ2xyRGF5cGlja2VyLFxuICBDbHJDYWxlbmRhcixcbl07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgQ2xySG9zdFdyYXBwaW5nTW9kdWxlLFxuICAgIENsckNvbmRpdGlvbmFsTW9kdWxlLFxuICAgIENsckljb25Nb2R1bGUsXG4gICAgQ2xyRm9jdXNUcmFwTW9kdWxlLFxuICAgIENsckNvbW1vbkZvcm1zTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtDTFJfREFURVBJQ0tFUl9ESVJFQ1RJVkVTXSxcbiAgZXhwb3J0czogW0NMUl9EQVRFUElDS0VSX0RJUkVDVElWRVNdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtDbHJEYXRlQ29udGFpbmVyXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyRGF0ZXBpY2tlck1vZHVsZSB7fVxuIl19