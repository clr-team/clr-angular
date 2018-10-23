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
import { FormsModule } from '@angular/forms';
import { ClrFormsDeprecatedModule } from '../../forms-deprecated/forms.module';
import { ClrIconModule } from '../../icon/icon.module';
import { ClrIfExpandModule } from '../../utils/expand/if-expand.module';
import { ClrTreeNode } from './tree-node';
/** @type {?} */
export var CLR_TREE_VIEW_DIRECTIVES = [ClrTreeNode];
var ClrTreeViewModule = /** @class */ (function () {
    function ClrTreeViewModule() {
    }
    ClrTreeViewModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, ClrIconModule, FormsModule, ClrFormsDeprecatedModule],
                    declarations: [CLR_TREE_VIEW_DIRECTIVES],
                    exports: [CLR_TREE_VIEW_DIRECTIVES, ClrIfExpandModule],
                },] }
    ];
    return ClrTreeViewModule;
}());
export { ClrTreeViewModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS12aWV3Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvdHJlZS12aWV3L3RyZWUtdmlldy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBTUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQVEsTUFBTSxlQUFlLENBQUM7QUFDL0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTdDLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQy9FLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sYUFBYSxDQUFDOztBQUUxQyxNQUFNLEtBQU8sd0JBQXdCLEdBQWdCLENBQUMsV0FBVyxDQUFDO0FBRWxFO0lBQUE7SUFLZ0MsQ0FBQzs7Z0JBTGhDLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsYUFBYSxFQUFFLFdBQVcsRUFBRSx3QkFBd0IsQ0FBQztvQkFDN0UsWUFBWSxFQUFFLENBQUMsd0JBQXdCLENBQUM7b0JBQ3hDLE9BQU8sRUFBRSxDQUFDLHdCQUF3QixFQUFFLGlCQUFpQixDQUFDO2lCQUN2RDs7SUFDK0Isd0JBQUM7Q0FBQSxBQUxqQyxJQUtpQztTQUFwQixpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSwgVHlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IENsckZvcm1zRGVwcmVjYXRlZE1vZHVsZSB9IGZyb20gJy4uLy4uL2Zvcm1zLWRlcHJlY2F0ZWQvZm9ybXMubW9kdWxlJztcbmltcG9ydCB7IENsckljb25Nb2R1bGUgfSBmcm9tICcuLi8uLi9pY29uL2ljb24ubW9kdWxlJztcbmltcG9ydCB7IENscklmRXhwYW5kTW9kdWxlIH0gZnJvbSAnLi4vLi4vdXRpbHMvZXhwYW5kL2lmLWV4cGFuZC5tb2R1bGUnO1xuaW1wb3J0IHsgQ2xyVHJlZU5vZGUgfSBmcm9tICcuL3RyZWUtbm9kZSc7XG5cbmV4cG9ydCBjb25zdCBDTFJfVFJFRV9WSUVXX0RJUkVDVElWRVM6IFR5cGU8YW55PltdID0gW0NsclRyZWVOb2RlXTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgQ2xySWNvbk1vZHVsZSwgRm9ybXNNb2R1bGUsIENsckZvcm1zRGVwcmVjYXRlZE1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW0NMUl9UUkVFX1ZJRVdfRElSRUNUSVZFU10sXG4gIGV4cG9ydHM6IFtDTFJfVFJFRV9WSUVXX0RJUkVDVElWRVMsIENscklmRXhwYW5kTW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyVHJlZVZpZXdNb2R1bGUge31cbiJdfQ==