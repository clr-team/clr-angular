/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrHostWrappingModule } from '../../utils/host-wrapping/host-wrapping.module';
import { ClrCommonFormsModule } from '../common/common.module';
import { ClrCheckboxNext } from './checkbox';
import { ClrCheckboxContainer } from './checkbox-container';
var ClrCheckboxNextModule = /** @class */ (function () {
    function ClrCheckboxNextModule() {
    }
    ClrCheckboxNextModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, ClrCommonFormsModule, ClrHostWrappingModule],
                    declarations: [ClrCheckboxNext, ClrCheckboxContainer],
                    exports: [ClrCommonFormsModule, ClrCheckboxNext, ClrCheckboxContainer],
                    entryComponents: [ClrCheckboxContainer],
                },] }
    ];
    return ClrCheckboxNextModule;
}());
export { ClrCheckboxNextModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3gubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZm9ybXMvY2hlY2tib3gvY2hlY2tib3gubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQU1BLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGdEQUFnRCxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRS9ELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDN0MsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFNUQ7SUFBQTtJQU1vQyxDQUFDOztnQkFOcEMsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxvQkFBb0IsRUFBRSxxQkFBcUIsQ0FBQztvQkFDcEUsWUFBWSxFQUFFLENBQUMsZUFBZSxFQUFFLG9CQUFvQixDQUFDO29CQUNyRCxPQUFPLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxlQUFlLEVBQUUsb0JBQW9CLENBQUM7b0JBQ3RFLGVBQWUsRUFBRSxDQUFDLG9CQUFvQixDQUFDO2lCQUN4Qzs7SUFDbUMsNEJBQUM7Q0FBQSxBQU5yQyxJQU1xQztTQUF4QixxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQ2xySG9zdFdyYXBwaW5nTW9kdWxlIH0gZnJvbSAnLi4vLi4vdXRpbHMvaG9zdC13cmFwcGluZy9ob3N0LXdyYXBwaW5nLm1vZHVsZSc7XG5pbXBvcnQgeyBDbHJDb21tb25Gb3Jtc01vZHVsZSB9IGZyb20gJy4uL2NvbW1vbi9jb21tb24ubW9kdWxlJztcblxuaW1wb3J0IHsgQ2xyQ2hlY2tib3hOZXh0IH0gZnJvbSAnLi9jaGVja2JveCc7XG5pbXBvcnQgeyBDbHJDaGVja2JveENvbnRhaW5lciB9IGZyb20gJy4vY2hlY2tib3gtY29udGFpbmVyJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgQ2xyQ29tbW9uRm9ybXNNb2R1bGUsIENsckhvc3RXcmFwcGluZ01vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW0NsckNoZWNrYm94TmV4dCwgQ2xyQ2hlY2tib3hDb250YWluZXJdLFxuICBleHBvcnRzOiBbQ2xyQ29tbW9uRm9ybXNNb2R1bGUsIENsckNoZWNrYm94TmV4dCwgQ2xyQ2hlY2tib3hDb250YWluZXJdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtDbHJDaGVja2JveENvbnRhaW5lcl0sXG59KVxuZXhwb3J0IGNsYXNzIENsckNoZWNrYm94TmV4dE1vZHVsZSB7fVxuIl19