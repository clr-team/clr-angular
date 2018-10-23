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
export class ClrCheckboxNextModule {
}
ClrCheckboxNextModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, ClrCommonFormsModule, ClrHostWrappingModule],
                declarations: [ClrCheckboxNext, ClrCheckboxContainer],
                exports: [ClrCommonFormsModule, ClrCheckboxNext, ClrCheckboxContainer],
                entryComponents: [ClrCheckboxContainer],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3gubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZm9ybXMvY2hlY2tib3gvY2hlY2tib3gubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQU1BLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGdEQUFnRCxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRS9ELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDN0MsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFRNUQsTUFBTSxPQUFPLHFCQUFxQjs7O1lBTmpDLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsb0JBQW9CLEVBQUUscUJBQXFCLENBQUM7Z0JBQ3BFLFlBQVksRUFBRSxDQUFDLGVBQWUsRUFBRSxvQkFBb0IsQ0FBQztnQkFDckQsT0FBTyxFQUFFLENBQUMsb0JBQW9CLEVBQUUsZUFBZSxFQUFFLG9CQUFvQixDQUFDO2dCQUN0RSxlQUFlLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQzthQUN4QyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBDbHJIb3N0V3JhcHBpbmdNb2R1bGUgfSBmcm9tICcuLi8uLi91dGlscy9ob3N0LXdyYXBwaW5nL2hvc3Qtd3JhcHBpbmcubW9kdWxlJztcbmltcG9ydCB7IENsckNvbW1vbkZvcm1zTW9kdWxlIH0gZnJvbSAnLi4vY29tbW9uL2NvbW1vbi5tb2R1bGUnO1xuXG5pbXBvcnQgeyBDbHJDaGVja2JveE5leHQgfSBmcm9tICcuL2NoZWNrYm94JztcbmltcG9ydCB7IENsckNoZWNrYm94Q29udGFpbmVyIH0gZnJvbSAnLi9jaGVja2JveC1jb250YWluZXInO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBDbHJDb21tb25Gb3Jtc01vZHVsZSwgQ2xySG9zdFdyYXBwaW5nTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbQ2xyQ2hlY2tib3hOZXh0LCBDbHJDaGVja2JveENvbnRhaW5lcl0sXG4gIGV4cG9ydHM6IFtDbHJDb21tb25Gb3Jtc01vZHVsZSwgQ2xyQ2hlY2tib3hOZXh0LCBDbHJDaGVja2JveENvbnRhaW5lcl0sXG4gIGVudHJ5Q29tcG9uZW50czogW0NsckNoZWNrYm94Q29udGFpbmVyXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyQ2hlY2tib3hOZXh0TW9kdWxlIHt9XG4iXX0=