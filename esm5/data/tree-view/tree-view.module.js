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
export var CLR_TREE_VIEW_DIRECTIVES = [ClrTree, ClrTreeNode, ClrRecursiveForOf];
var ClrTreeViewModule = /** @class */ (function () {
    function ClrTreeViewModule() {
    }
    ClrTreeViewModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, ClrIconModule, ClrLoadingModule],
                    declarations: [CLR_TREE_VIEW_DIRECTIVES, RecursiveChildren],
                    exports: [CLR_TREE_VIEW_DIRECTIVES],
                },] }
    ];
    return ClrTreeViewModule;
}());
export { ClrTreeViewModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS12aWV3Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvdHJlZS12aWV3L3RyZWUtdmlldy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBTUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQVEsTUFBTSxlQUFlLENBQUM7QUFFL0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDMUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUNqQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7QUFFekQsTUFBTSxLQUFPLHdCQUF3QixHQUFnQixDQUFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsaUJBQWlCLENBQUM7QUFFOUY7SUFBQTtJQUtnQyxDQUFDOztnQkFMaEMsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxhQUFhLEVBQUUsZ0JBQWdCLENBQUM7b0JBQ3hELFlBQVksRUFBRSxDQUFDLHdCQUF3QixFQUFFLGlCQUFpQixDQUFDO29CQUMzRCxPQUFPLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQztpQkFDcEM7O0lBQytCLHdCQUFDO0NBQUEsQUFMakMsSUFLaUM7U0FBcEIsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUsIFR5cGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQ2xySWNvbk1vZHVsZSB9IGZyb20gJy4uLy4uL2ljb24vaWNvbi5tb2R1bGUnO1xuaW1wb3J0IHsgQ2xyTG9hZGluZ01vZHVsZSB9IGZyb20gJy4uLy4uL3V0aWxzL2xvYWRpbmcvbG9hZGluZy5tb2R1bGUnO1xuaW1wb3J0IHsgQ2xyVHJlZU5vZGUgfSBmcm9tICcuL3RyZWUtbm9kZSc7XG5pbXBvcnQgeyBDbHJUcmVlIH0gZnJvbSAnLi90cmVlJztcbmltcG9ydCB7IENsclJlY3Vyc2l2ZUZvck9mIH0gZnJvbSAnLi9yZWN1cnNpdmUtZm9yLW9mJztcbmltcG9ydCB7IFJlY3Vyc2l2ZUNoaWxkcmVuIH0gZnJvbSAnLi9yZWN1cnNpdmUtY2hpbGRyZW4nO1xuXG5leHBvcnQgY29uc3QgQ0xSX1RSRUVfVklFV19ESVJFQ1RJVkVTOiBUeXBlPGFueT5bXSA9IFtDbHJUcmVlLCBDbHJUcmVlTm9kZSwgQ2xyUmVjdXJzaXZlRm9yT2ZdO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBDbHJJY29uTW9kdWxlLCBDbHJMb2FkaW5nTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbQ0xSX1RSRUVfVklFV19ESVJFQ1RJVkVTLCBSZWN1cnNpdmVDaGlsZHJlbl0sXG4gIGV4cG9ydHM6IFtDTFJfVFJFRV9WSUVXX0RJUkVDVElWRVNdLFxufSlcbmV4cG9ydCBjbGFzcyBDbHJUcmVlVmlld01vZHVsZSB7fVxuIl19