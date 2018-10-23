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
export const CLR_TREE_VIEW_DIRECTIVES = [ClrTreeNode];
export class ClrTreeViewModule {
}
ClrTreeViewModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, ClrIconModule, FormsModule, ClrFormsDeprecatedModule],
                declarations: [CLR_TREE_VIEW_DIRECTIVES],
                exports: [CLR_TREE_VIEW_DIRECTIVES, ClrIfExpandModule],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS12aWV3Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvdHJlZS12aWV3L3RyZWUtdmlldy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBTUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQVEsTUFBTSxlQUFlLENBQUM7QUFDL0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTdDLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQy9FLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sYUFBYSxDQUFDOztBQUUxQyxNQUFNLE9BQU8sd0JBQXdCLEdBQWdCLENBQUMsV0FBVyxDQUFDO0FBT2xFLE1BQU0sT0FBTyxpQkFBaUI7OztZQUw3QixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGFBQWEsRUFBRSxXQUFXLEVBQUUsd0JBQXdCLENBQUM7Z0JBQzdFLFlBQVksRUFBRSxDQUFDLHdCQUF3QixDQUFDO2dCQUN4QyxPQUFPLEVBQUUsQ0FBQyx3QkFBd0IsRUFBRSxpQkFBaUIsQ0FBQzthQUN2RCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlLCBUeXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgQ2xyRm9ybXNEZXByZWNhdGVkTW9kdWxlIH0gZnJvbSAnLi4vLi4vZm9ybXMtZGVwcmVjYXRlZC9mb3Jtcy5tb2R1bGUnO1xuaW1wb3J0IHsgQ2xySWNvbk1vZHVsZSB9IGZyb20gJy4uLy4uL2ljb24vaWNvbi5tb2R1bGUnO1xuaW1wb3J0IHsgQ2xySWZFeHBhbmRNb2R1bGUgfSBmcm9tICcuLi8uLi91dGlscy9leHBhbmQvaWYtZXhwYW5kLm1vZHVsZSc7XG5pbXBvcnQgeyBDbHJUcmVlTm9kZSB9IGZyb20gJy4vdHJlZS1ub2RlJztcblxuZXhwb3J0IGNvbnN0IENMUl9UUkVFX1ZJRVdfRElSRUNUSVZFUzogVHlwZTxhbnk+W10gPSBbQ2xyVHJlZU5vZGVdO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBDbHJJY29uTW9kdWxlLCBGb3Jtc01vZHVsZSwgQ2xyRm9ybXNEZXByZWNhdGVkTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbQ0xSX1RSRUVfVklFV19ESVJFQ1RJVkVTXSxcbiAgZXhwb3J0czogW0NMUl9UUkVFX1ZJRVdfRElSRUNUSVZFUywgQ2xySWZFeHBhbmRNb2R1bGVdLFxufSlcbmV4cG9ydCBjbGFzcyBDbHJUcmVlVmlld01vZHVsZSB7fVxuIl19