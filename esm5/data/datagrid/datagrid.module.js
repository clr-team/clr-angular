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
import { FormsModule } from '@angular/forms';
import { ClrFormsModule } from '../../forms/forms.module';
import { ClrIconModule } from '../../icon/icon.module';
import { ClrCommonPopoverModule } from '../../popover/common/popover.module';
import { ClrLoadingModule } from '../../utils/loading/loading.module';
import { ClrOutsideClickModule } from '../../utils/outside-click/outside-click.module';
import { ClrDragAndDropModule } from '../../utils/drag-and-drop/drag-and-drop.module';
import { DatagridRowExpandAnimation } from './animation-hack/row-expand-animation';
import { DatagridStringFilter } from './built-in/filters/datagrid-string-filter';
import { ActionableOompaLoompa } from './chocolate/actionable-oompa-loompa';
import { DatagridWillyWonka } from './chocolate/datagrid-willy-wonka';
import { ExpandableOompaLoompa } from './chocolate/expandable-oompa-loompa';
import { ClrDatagrid } from './datagrid';
import { ClrDatagridActionBar } from './datagrid-action-bar';
import { ClrDatagridActionOverflow } from './datagrid-action-overflow';
import { ClrDatagridCell } from './datagrid-cell';
import { ClrDatagridColumn } from './datagrid-column';
import { ClrDatagridColumnSeparator } from './datagrid-column-separator';
import { ClrDatagridColumnToggle } from './datagrid-column-toggle';
import { ClrDatagridColumnToggleButton } from './datagrid-column-toggle-button';
import { ClrDatagridColumnToggleTitle } from './datagrid-column-toggle-title';
import { DatagridDetailRegisterer } from './datagrid-detail-registerer';
import { ClrDatagridFilter } from './datagrid-filter';
import { ClrDatagridFooter } from './datagrid-footer';
import { ClrDatagridHideableColumn } from './datagrid-hideable-column';
import { ClrDatagridItems } from './datagrid-items';
import { ClrDatagridItemsTrackBy } from './datagrid-items-trackby';
import { ClrDatagridPagination } from './datagrid-pagination';
import { ClrDatagridPageSize } from './datagrid-page-size';
import { ClrDatagridPlaceholder } from './datagrid-placeholder';
import { ClrDatagridRow } from './datagrid-row';
import { ClrDatagridRowDetail } from './datagrid-row-detail';
import { DatagridCellRenderer } from './render/cell-renderer';
import { DatagridHeaderRenderer } from './render/header-renderer';
import { DatagridMainRenderer } from './render/main-renderer';
import { DatagridRowRenderer } from './render/row-renderer';
import { WrappedCell } from './wrapped-cell';
import { WrappedColumn } from './wrapped-column';
import { WrappedRow } from './wrapped-row';
/** @type {?} */
export var CLR_DATAGRID_DIRECTIVES = [
    // Core
    ClrDatagrid,
    ClrDatagridActionBar,
    ClrDatagridActionOverflow,
    ClrDatagridColumn,
    ClrDatagridColumnSeparator,
    ClrDatagridColumnToggle,
    ClrDatagridHideableColumn,
    ClrDatagridFilter,
    ClrDatagridItems,
    ClrDatagridItemsTrackBy,
    ClrDatagridRow,
    ClrDatagridRowDetail,
    DatagridDetailRegisterer,
    ClrDatagridCell,
    ClrDatagridFooter,
    ClrDatagridPagination,
    ClrDatagridPageSize,
    ClrDatagridPlaceholder,
    ClrDatagridColumnToggleButton,
    ClrDatagridColumnToggleTitle,
    WrappedCell,
    WrappedColumn,
    WrappedRow,
    // Renderers
    DatagridMainRenderer,
    DatagridHeaderRenderer,
    DatagridRowRenderer,
    DatagridCellRenderer,
    // Chocolate
    DatagridWillyWonka,
    ActionableOompaLoompa,
    ExpandableOompaLoompa,
    // Animation hack
    DatagridRowExpandAnimation,
    // Built-in shortcuts
    DatagridStringFilter,
];
var ClrDatagridModule = /** @class */ (function () {
    function ClrDatagridModule() {
    }
    ClrDatagridModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        ClrIconModule,
                        ClrFormsModule,
                        FormsModule,
                        ClrCommonPopoverModule,
                        ClrLoadingModule,
                        ClrOutsideClickModule,
                        ClrDragAndDropModule,
                    ],
                    declarations: [CLR_DATAGRID_DIRECTIVES],
                    exports: [CLR_DATAGRID_DIRECTIVES],
                    entryComponents: [WrappedCell, WrappedColumn, WrappedRow],
                },] }
    ];
    return ClrDatagridModule;
}());
export { ClrDatagridModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9kYXRhZ3JpZC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBTUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQVEsTUFBTSxlQUFlLENBQUM7QUFDL0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTdDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDN0UsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDdEUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDdkYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFFdEYsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDbkYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDakYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDNUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDdEUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDNUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUN6QyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM3RCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSw0QkFBNEIsQ0FB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RUFBRSxDQUFDLFdBQVcsRUFBRSxhQUFhLEVBQUUsVUFBVSxDQUFDO2lCQUMxRDs7SUFDK0Isd0JBQUM7Q0FBQSxBQWZqQyxJQWVpQztTQUFwQixpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSwgVHlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IENsckZvcm1zTW9kdWxlIH0gZnJvbSAnLi4vLi4vZm9ybXMvZm9ybXMubW9kdWxlJztcbmltcG9ydCB7IENsckljb25Nb2R1bGUgfSBmcm9tICcuLi8uLi9pY29uL2ljb24ubW9kdWxlJztcbmltcG9ydCB7IENsckNvbW1vblBvcG92ZXJNb2R1bGUgfSBmcm9tICcuLi8uLi9wb3BvdmVyL2NvbW1vbi9wb3BvdmVyLm1vZHVsZSc7XG5pbXBvcnQgeyBDbHJMb2FkaW5nTW9kdWxlIH0gZnJvbSAnLi4vLi4vdXRpbHMvbG9hZGluZy9sb2FkaW5nLm1vZHVsZSc7XG5pbXBvcnQgeyBDbHJPdXRzaWRlQ2xpY2tNb2R1bGUgfSBmcm9tICcuLi8uLi91dGlscy9vdXRzaWRlLWNsaWNrL291dHNpZGUtY2xpY2subW9kdWxlJztcbmltcG9ydCB7IENsckRyYWdBbmREcm9wTW9kdWxlIH0gZnJvbSAnLi4vLi4vdXRpbHMvZHJhZy1hbmQtZHJvcC9kcmFnLWFuZC1kcm9wLm1vZHVsZSc7XG5cbmltcG9ydCB7IERhdGFncmlkUm93RXhwYW5kQW5pbWF0aW9uIH0gZnJvbSAnLi9hbmltYXRpb24taGFjay9yb3ctZXhwYW5kLWFuaW1hdGlvbic7XG5pbXBvcnQgeyBEYXRhZ3JpZFN0cmluZ0ZpbHRlciB9IGZyb20gJy4vYnVpbHQtaW4vZmlsdGVycy9kYXRhZ3JpZC1zdHJpbmctZmlsdGVyJztcbmltcG9ydCB7IEFjdGlvbmFibGVPb21wYUxvb21wYSB9IGZyb20gJy4vY2hvY29sYXRlL2FjdGlvbmFibGUtb29tcGEtbG9vbXBhJztcbmltcG9ydCB7IERhdGFncmlkV2lsbHlXb25rYSB9IGZyb20gJy4vY2hvY29sYXRlL2RhdGFncmlkLXdpbGx5LXdvbmthJztcbmltcG9ydCB7IEV4cGFuZGFibGVPb21wYUxvb21wYSB9IGZyb20gJy4vY2hvY29sYXRlL2V4cGFuZGFibGUtb29tcGEtbG9vbXBhJztcbmltcG9ydCB7IENsckRhdGFncmlkIH0gZnJvbSAnLi9kYXRhZ3JpZCc7XG5pbXBvcnQgeyBDbHJEYXRhZ3JpZEFjdGlvbkJhciB9IGZyb20gJy4vZGF0YWdyaWQtYWN0aW9uLWJhcic7XG5pbXBvcnQgeyBDbHJEYXRhZ3JpZEFjdGlvbk92ZXJmbG93IH0gZnJvbSAnLi9kYXRhZ3JpZC1hY3Rpb24tb3ZlcmZsb3cnO1xuaW1wb3J0IHsgQ2xyRGF0YWdyaWRDZWxsIH0gZnJvbSAnLi9kYXRhZ3JpZC1jZWxsJztcbmltcG9ydCB7IENsckRhdGFncmlkQ29sdW1uIH0gZnJvbSAnLi9kYXRhZ3JpZC1jb2x1bW4nO1xuaW1wb3J0IHsgQ2xyRGF0YWdyaWRDb2x1bW5TZXBhcmF0b3IgfSBmcm9tICcuL2RhdGFncmlkLWNvbHVtbi1zZXBhcmF0b3InO1xuaW1wb3J0IHsgQ2xyRGF0YWdyaWRDb2x1bW5Ub2dnbGUgfSBmcm9tICcuL2RhdGFncmlkLWNvbHVtbi10b2dnbGUnO1xuaW1wb3J0IHsgQ2xyRGF0YWdyaWRDb2x1bW5Ub2dnbGVCdXR0b24gfSBmcm9tICcuL2RhdGFncmlkLWNvbHVtbi10b2dnbGUtYnV0dG9uJztcbmltcG9ydCB7IENsckRhdGFncmlkQ29sdW1uVG9nZ2xlVGl0bGUgfSBmcm9tICcuL2RhdGFncmlkLWNvbHVtbi10b2dnbGUtdGl0bGUnO1xuaW1wb3J0IHsgRGF0YWdyaWREZXRhaWxSZWdpc3RlcmVyIH0gZnJvbSAnLi9kYXRhZ3JpZC1kZXRhaWwtcmVnaXN0ZXJlcic7XG5pbXBvcnQgeyBDbHJEYXRhZ3JpZEZpbHRlciB9IGZyb20gJy4vZGF0YWdyaWQtZmlsdGVyJztcbmltcG9ydCB7IENsckRhdGFncmlkRm9vdGVyIH0gZnJvbSAnLi9kYXRhZ3JpZC1mb290ZXInO1xuaW1wb3J0IHsgQ2xyRGF0YWdyaWRIaWRlYWJsZUNvbHVtbiB9IGZyb20gJy4vZGF0YWdyaWQtaGlkZWFibGUtY29sdW1uJztcbmltcG9ydCB7IENsckRhdGFncmlkSXRlbXMgfSBmcm9tICcuL2RhdGFncmlkLWl0ZW1zJztcbmltcG9ydCB7IENsckRhdGFncmlkSXRlbXNUcmFja0J5IH0gZnJvbSAnLi9kYXRhZ3JpZC1pdGVtcy10cmFja2J5JztcbmltcG9ydCB7IENsckRhdGFncmlkUGFnaW5hdGlvbiB9IGZyb20gJy4vZGF0YWdyaWQtcGFnaW5hdGlvbic7XG5pbXBvcnQgeyBDbHJEYXRhZ3JpZFBhZ2VTaXplIH0gZnJvbSAnLi9kYXRhZ3JpZC1wYWdlLXNpemUnO1xuaW1wb3J0IHsgQ2xyRGF0YWdyaWRQbGFjZWhvbGRlciB9IGZyb20gJy4vZGF0YWdyaWQtcGxhY2Vob2xkZXInO1xuaW1wb3J0IHsgQ2xyRGF0YWdyaWRSb3cgfSBmcm9tICcuL2RhdGFncmlkLXJvdyc7XG5pbXBvcnQgeyBDbHJEYXRhZ3JpZFJvd0RldGFpbCB9IGZyb20gJy4vZGF0YWdyaWQtcm93LWRldGFpbCc7XG5pbXBvcnQgeyBEYXRhZ3JpZENlbGxSZW5kZXJlciB9IGZyb20gJy4vcmVuZGVyL2NlbGwtcmVuZGVyZXInO1xuaW1wb3J0IHsgRGF0YWdyaWRIZWFkZXJSZW5kZXJlciB9IGZyb20gJy4vcmVuZGVyL2hlYWRlci1yZW5kZXJlcic7XG5pbXBvcnQgeyBEYXRhZ3JpZE1haW5SZW5kZXJlciB9IGZyb20gJy4vcmVuZGVyL21haW4tcmVuZGVyZXInO1xuaW1wb3J0IHsgRGF0YWdyaWRSb3dSZW5kZXJlciB9IGZyb20gJy4vcmVuZGVyL3Jvdy1yZW5kZXJlcic7XG5pbXBvcnQgeyBXcmFwcGVkQ2VsbCB9IGZyb20gJy4vd3JhcHBlZC1jZWxsJztcbmltcG9ydCB7IFdyYXBwZWRDb2x1bW4gfSBmcm9tICcuL3dyYXBwZWQtY29sdW1uJztcbmltcG9ydCB7IFdyYXBwZWRSb3cgfSBmcm9tICcuL3dyYXBwZWQtcm93JztcblxuZXhwb3J0IGNvbnN0IENMUl9EQVRBR1JJRF9ESVJFQ1RJVkVTOiBUeXBlPGFueT5bXSA9IFtcbiAgLy8gQ29yZVxuICBDbHJEYXRhZ3JpZCxcbiAgQ2xyRGF0YWdyaWRBY3Rpb25CYXIsXG4gIENsckRhdGFncmlkQWN0aW9uT3ZlcmZsb3csXG4gIENsckRhdGFncmlkQ29sdW1uLFxuICBDbHJEYXRhZ3JpZENvbHVtblNlcGFyYXRvcixcbiAgQ2xyRGF0YWdyaWRDb2x1bW5Ub2dnbGUsXG4gIENsckRhdGFncmlkSGlkZWFibGVDb2x1bW4sXG4gIENsckRhdGFncmlkRmlsdGVyLFxuICBDbHJEYXRhZ3JpZEl0ZW1zLFxuICBDbHJEYXRhZ3JpZEl0ZW1zVHJhY2tCeSxcbiAgQ2xyRGF0YWdyaWRSb3csXG4gIENsckRhdGFncmlkUm93RGV0YWlsLFxuICBEYXRhZ3JpZERldGFpbFJlZ2lzdGVyZXIsXG4gIENsckRhdGFncmlkQ2VsbCxcbiAgQ2xyRGF0YWdyaWRGb290ZXIsXG4gIENsckRhdGFncmlkUGFnaW5hdGlvbixcbiAgQ2xyRGF0YWdyaWRQYWdlU2l6ZSxcbiAgQ2xyRGF0YWdyaWRQbGFjZWhvbGRlcixcbiAgQ2xyRGF0YWdyaWRDb2x1bW5Ub2dnbGVCdXR0b24sXG4gIENsckRhdGFncmlkQ29sdW1uVG9nZ2xlVGl0bGUsXG4gIFdyYXBwZWRDZWxsLFxuICBXcmFwcGVkQ29sdW1uLFxuICBXcmFwcGVkUm93LFxuXG4gIC8vIFJlbmRlcmVyc1xuICBEYXRhZ3JpZE1haW5SZW5kZXJlcixcbiAgRGF0YWdyaWRIZWFkZXJSZW5kZXJlcixcbiAgRGF0YWdyaWRSb3dSZW5kZXJlcixcbiAgRGF0YWdyaWRDZWxsUmVuZGVyZXIsXG5cbiAgLy8gQ2hvY29sYXRlXG4gIERhdGFncmlkV2lsbHlXb25rYSxcbiAgQWN0aW9uYWJsZU9vbXBhTG9vbXBhLFxuICBFeHBhbmRhYmxlT29tcGFMb29tcGEsXG5cbiAgLy8gQW5pbWF0aW9uIGhhY2tcbiAgRGF0YWdyaWRSb3dFeHBhbmRBbmltYXRpb24sXG5cbiAgLy8gQnVpbHQtaW4gc2hvcnRjdXRzXG4gIERhdGFncmlkU3RyaW5nRmlsdGVyLFxuXTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBDbHJJY29uTW9kdWxlLFxuICAgIENsckZvcm1zTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIENsckNvbW1vblBvcG92ZXJNb2R1bGUsXG4gICAgQ2xyTG9hZGluZ01vZHVsZSxcbiAgICBDbHJPdXRzaWRlQ2xpY2tNb2R1bGUsXG4gICAgQ2xyRHJhZ0FuZERyb3BNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0NMUl9EQVRBR1JJRF9ESVJFQ1RJVkVTXSxcbiAgZXhwb3J0czogW0NMUl9EQVRBR1JJRF9ESVJFQ1RJVkVTXSxcbiAgZW50cnlDb21wb25lbnRzOiBbV3JhcHBlZENlbGwsIFdyYXBwZWRDb2x1bW4sIFdyYXBwZWRSb3ddLFxufSlcbmV4cG9ydCBjbGFzcyBDbHJEYXRhZ3JpZE1vZHVsZSB7fVxuIl19