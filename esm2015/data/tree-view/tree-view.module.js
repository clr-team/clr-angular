/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrIconModule } from '../../icon/icon.module';
import { ClrLoadingModule } from '../../utils/loading/loading.module';
import { ClrTreeNode } from './tree-node';
import { ClrTree } from './tree';
import { ClrRecursiveForOf } from './recursive-for-of';
import { RecursiveChildren } from './recursive-children';
/** @type {?} */
export const CLR_TREE_VIEW_DIRECTIVES = [ClrTree, ClrTreeNode, ClrRecursiveForOf];
export class ClrTreeViewModule {
}
ClrTreeViewModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, ClrIconModule, ClrLoadingModule],
                declarations: [CLR_TREE_VIEW_DIRECTIVES, RecursiveChildren],
                exports: [CLR_TREE_VIEW_DIRECTIVES],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS12aWV3Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvdHJlZS12aWV3L3RyZWUtdmlldy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBTUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQVEsTUFBTSxlQUFlLENBQUM7QUFFL0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDMUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUNqQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7QUFFekQsTUFBTSxPQUFPLHdCQUF3QixHQUFnQixDQUFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsaUJBQWlCLENBQUM7QUFPOUYsTUFBTSxPQUFPLGlCQUFpQjs7O1lBTDdCLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsYUFBYSxFQUFFLGdCQUFnQixDQUFDO2dCQUN4RCxZQUFZLEVBQUUsQ0FBQyx3QkFBd0IsRUFBRSxpQkFBaUIsQ0FBQztnQkFDM0QsT0FBTyxFQUFFLENBQUMsd0JBQXdCLENBQUM7YUFDcEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSwgVHlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBDbHJJY29uTW9kdWxlIH0gZnJvbSAnLi4vLi4vaWNvbi9pY29uLm1vZHVsZSc7XG5pbXBvcnQgeyBDbHJMb2FkaW5nTW9kdWxlIH0gZnJvbSAnLi4vLi4vdXRpbHMvbG9hZGluZy9sb2FkaW5nLm1vZHVsZSc7XG5pbXBvcnQgeyBDbHJUcmVlTm9kZSB9IGZyb20gJy4vdHJlZS1ub2RlJztcbmltcG9ydCB7IENsclRyZWUgfSBmcm9tICcuL3RyZWUnO1xuaW1wb3J0IHsgQ2xyUmVjdXJzaXZlRm9yT2YgfSBmcm9tICcuL3JlY3Vyc2l2ZS1mb3Itb2YnO1xuaW1wb3J0IHsgUmVjdXJzaXZlQ2hpbGRyZW4gfSBmcm9tICcuL3JlY3Vyc2l2ZS1jaGlsZHJlbic7XG5cbmV4cG9ydCBjb25zdCBDTFJfVFJFRV9WSUVXX0RJUkVDVElWRVM6IFR5cGU8YW55PltdID0gW0NsclRyZWUsIENsclRyZWVOb2RlLCBDbHJSZWN1cnNpdmVGb3JPZl07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIENsckljb25Nb2R1bGUsIENsckxvYWRpbmdNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtDTFJfVFJFRV9WSUVXX0RJUkVDVElWRVMsIFJlY3Vyc2l2ZUNoaWxkcmVuXSxcbiAgZXhwb3J0czogW0NMUl9UUkVFX1ZJRVdfRElSRUNUSVZFU10sXG59KVxuZXhwb3J0IGNsYXNzIENsclRyZWVWaWV3TW9kdWxlIHt9XG4iXX0=