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
import { ClrFormsModule } from '../../forms/forms.module';
import { ClrIconModule } from '../../icon/icon.module';
import { ClrIfExpandModule } from '../../utils/expand/if-expand.module';
import { ClrTreeNode } from './tree-node';
/** @type {?} */
export const CLR_TREE_VIEW_DIRECTIVES = [ClrTreeNode];
export class ClrTreeViewModule {
}
ClrTreeViewModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, ClrIconModule, FormsModule, ClrFormsModule],
                declarations: [CLR_TREE_VIEW_DIRECTIVES],
                exports: [CLR_TREE_VIEW_DIRECTIVES, ClrIfExpandModule],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS12aWV3Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvdHJlZS12aWV3L3RyZWUtdmlldy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBTUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQVEsTUFBTSxlQUFlLENBQUM7QUFDL0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTdDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDeEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGFBQWEsQ0FBQzs7QUFFMUMsTUFBTSxPQUFPLHdCQUF3QixHQUFnQixDQUFDLFdBQVcsQ0FBQztBQU9sRSxNQUFNLE9BQU8saUJBQWlCOzs7WUFMN0IsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxhQUFhLEVBQUUsV0FBVyxFQUFFLGNBQWMsQ0FBQztnQkFDbkUsWUFBWSxFQUFFLENBQUMsd0JBQXdCLENBQUM7Z0JBQ3hDLE9BQU8sRUFBRSxDQUFDLHdCQUF3QixFQUFFLGlCQUFpQixDQUFDO2FBQ3ZEIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUsIFR5cGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBDbHJGb3Jtc01vZHVsZSB9IGZyb20gJy4uLy4uL2Zvcm1zL2Zvcm1zLm1vZHVsZSc7XG5pbXBvcnQgeyBDbHJJY29uTW9kdWxlIH0gZnJvbSAnLi4vLi4vaWNvbi9pY29uLm1vZHVsZSc7XG5pbXBvcnQgeyBDbHJJZkV4cGFuZE1vZHVsZSB9IGZyb20gJy4uLy4uL3V0aWxzL2V4cGFuZC9pZi1leHBhbmQubW9kdWxlJztcbmltcG9ydCB7IENsclRyZWVOb2RlIH0gZnJvbSAnLi90cmVlLW5vZGUnO1xuXG5leHBvcnQgY29uc3QgQ0xSX1RSRUVfVklFV19ESVJFQ1RJVkVTOiBUeXBlPGFueT5bXSA9IFtDbHJUcmVlTm9kZV07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIENsckljb25Nb2R1bGUsIEZvcm1zTW9kdWxlLCBDbHJGb3Jtc01vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW0NMUl9UUkVFX1ZJRVdfRElSRUNUSVZFU10sXG4gIGV4cG9ydHM6IFtDTFJfVFJFRV9WSUVXX0RJUkVDVElWRVMsIENscklmRXhwYW5kTW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyVHJlZVZpZXdNb2R1bGUge31cbiJdfQ==