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
export const CLR_DATEPICKER_DIRECTIVES = [
    ClrDay,
    ClrDateContainer,
    ClrDateInput,
    ClrDatepickerViewManager,
    ClrMonthpicker,
    ClrYearpicker,
    ClrDaypicker,
    ClrCalendar,
];
export class ClrDatepickerModule {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJmb3Jtcy9kYXRlcGlja2VyL2RhdGVwaWNrZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQU1BLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFRLE1BQU0sZUFBZSxDQUFDO0FBRS9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUNsRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUM5RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUN2RixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFFakQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUN6QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzVDLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDL0IsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUMzQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxjQUFjLENBQUM7O0FBRTdDLE1BQU0sT0FBTyx5QkFBeUIsR0FBZ0I7SUFDcEQsTUFBTTtJQUNOLGdCQUFnQjtJQUNoQixZQUFZO0lBQ1osd0JBQXdCO0lBQ3hCLGNBQWM7SUFDZCxhQUFhO0lBQ2IsWUFBWTtJQUNaLFdBQVc7Q0FDWjtBQWVELE1BQU0sT0FBTyxtQkFBbUI7OztZQWIvQixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLFlBQVk7b0JBQ1oscUJBQXFCO29CQUNyQixvQkFBb0I7b0JBQ3BCLGFBQWE7b0JBQ2Isa0JBQWtCO29CQUNsQixvQkFBb0I7aUJBQ3JCO2dCQUNELFlBQVksRUFBRSxDQUFDLHlCQUF5QixDQUFDO2dCQUN6QyxPQUFPLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQztnQkFDcEMsZUFBZSxFQUFFLENBQUMsZ0JBQWdCLENBQUM7YUFDcEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSwgVHlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBDbHJJY29uTW9kdWxlIH0gZnJvbSAnLi4vLi4vaWNvbi9pY29uLm1vZHVsZSc7XG5pbXBvcnQgeyBDbHJDb25kaXRpb25hbE1vZHVsZSB9IGZyb20gJy4uLy4uL3V0aWxzL2NvbmRpdGlvbmFsL2NvbmRpdGlvbmFsLm1vZHVsZSc7XG5pbXBvcnQgeyBDbHJGb2N1c1RyYXBNb2R1bGUgfSBmcm9tICcuLi8uLi91dGlscy9mb2N1cy10cmFwL2ZvY3VzLXRyYXAubW9kdWxlJztcbmltcG9ydCB7IENsckhvc3RXcmFwcGluZ01vZHVsZSB9IGZyb20gJy4uLy4uL3V0aWxzL2hvc3Qtd3JhcHBpbmcvaG9zdC13cmFwcGluZy5tb2R1bGUnO1xuaW1wb3J0IHsgQ2xyQ29tbW9uRm9ybXNNb2R1bGUgfSBmcm9tICcuLi9jb21tb24nO1xuXG5pbXBvcnQgeyBDbHJDYWxlbmRhciB9IGZyb20gJy4vY2FsZW5kYXInO1xuaW1wb3J0IHsgQ2xyRGF0ZUNvbnRhaW5lciB9IGZyb20gJy4vZGF0ZS1jb250YWluZXInO1xuaW1wb3J0IHsgQ2xyRGF0ZUlucHV0IH0gZnJvbSAnLi9kYXRlLWlucHV0JztcbmltcG9ydCB7IENsckRhdGVwaWNrZXJWaWV3TWFuYWdlciB9IGZyb20gJy4vZGF0ZXBpY2tlci12aWV3LW1hbmFnZXInO1xuaW1wb3J0IHsgQ2xyRGF5IH0gZnJvbSAnLi9kYXknO1xuaW1wb3J0IHsgQ2xyRGF5cGlja2VyIH0gZnJvbSAnLi9kYXlwaWNrZXInO1xuaW1wb3J0IHsgQ2xyTW9udGhwaWNrZXIgfSBmcm9tICcuL21vbnRocGlja2VyJztcbmltcG9ydCB7IENsclllYXJwaWNrZXIgfSBmcm9tICcuL3llYXJwaWNrZXInO1xuXG5leHBvcnQgY29uc3QgQ0xSX0RBVEVQSUNLRVJfRElSRUNUSVZFUzogVHlwZTxhbnk+W10gPSBbXG4gIENsckRheSxcbiAgQ2xyRGF0ZUNvbnRhaW5lcixcbiAgQ2xyRGF0ZUlucHV0LFxuICBDbHJEYXRlcGlja2VyVmlld01hbmFnZXIsXG4gIENsck1vbnRocGlja2VyLFxuICBDbHJZZWFycGlja2VyLFxuICBDbHJEYXlwaWNrZXIsXG4gIENsckNhbGVuZGFyLFxuXTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBDbHJIb3N0V3JhcHBpbmdNb2R1bGUsXG4gICAgQ2xyQ29uZGl0aW9uYWxNb2R1bGUsXG4gICAgQ2xySWNvbk1vZHVsZSxcbiAgICBDbHJGb2N1c1RyYXBNb2R1bGUsXG4gICAgQ2xyQ29tbW9uRm9ybXNNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0NMUl9EQVRFUElDS0VSX0RJUkVDVElWRVNdLFxuICBleHBvcnRzOiBbQ0xSX0RBVEVQSUNLRVJfRElSRUNUSVZFU10sXG4gIGVudHJ5Q29tcG9uZW50czogW0NsckRhdGVDb250YWluZXJdLFxufSlcbmV4cG9ydCBjbGFzcyBDbHJEYXRlcGlja2VyTW9kdWxlIHt9XG4iXX0=