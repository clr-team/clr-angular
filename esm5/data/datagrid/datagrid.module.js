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
import { ClrCommonPopoverModule } from '../../popover/common/popover.module';
import { ClrIfExpandModule } from '../../utils/expand/if-expand.module';
import { ClrLoadingModule } from '../../utils/loading/loading.module';
import { ClrOutsideClickModule } from '../../utils/outside-click/outside-click.module';
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
import { ClrDatagridPlaceholder } from './datagrid-placeholder';
import { ClrDatagridRow } from './datagrid-row';
import { ClrDatagridRowDetail } from './datagrid-row-detail';
import { DatagridCellRenderer } from './render/cell-renderer';
import { DatagridColumnResizer } from './render/column-resizer';
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
    ClrDatagridPlaceholder,
    ClrDatagridColumnToggleButton,
    ClrDatagridColumnToggleTitle,
    WrappedCell,
    WrappedColumn,
    WrappedRow,
    // Renderers
    DatagridMainRenderer,
    DatagridHeaderRenderer,
    DatagridColumnResizer,
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
                    ],
                    declarations: [CLR_DATAGRID_DIRECTIVES],
                    exports: [CLR_DATAGRID_DIRECTIVES, ClrIfExpandModule],
                    entryComponents: [WrappedCell, WrappedColumn, WrappedRow],
                },] }
    ];
    return ClrDatagridModule;
}());
export { ClrDatagridModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9kYXRhZ3JpZC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBTUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQVEsTUFBTSxlQUFlLENBQUM7QUFDL0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTdDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDN0UsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDeEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDdEUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFFdkYsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDbkYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDakYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDNUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDdEUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDNUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUN6QyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM3RCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSw0QkFBNEIsQ0FB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Q0FBQSxBQWRqQyxJQWNpQztTQUFwQixpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSwgVHlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IENsckZvcm1zTW9kdWxlIH0gZnJvbSAnLi4vLi4vZm9ybXMvZm9ybXMubW9kdWxlJztcbmltcG9ydCB7IENsckljb25Nb2R1bGUgfSBmcm9tICcuLi8uLi9pY29uL2ljb24ubW9kdWxlJztcbmltcG9ydCB7IENsckNvbW1vblBvcG92ZXJNb2R1bGUgfSBmcm9tICcuLi8uLi9wb3BvdmVyL2NvbW1vbi9wb3BvdmVyLm1vZHVsZSc7XG5pbXBvcnQgeyBDbHJJZkV4cGFuZE1vZHVsZSB9IGZyb20gJy4uLy4uL3V0aWxzL2V4cGFuZC9pZi1leHBhbmQubW9kdWxlJztcbmltcG9ydCB7IENsckxvYWRpbmdNb2R1bGUgfSBmcm9tICcuLi8uLi91dGlscy9sb2FkaW5nL2xvYWRpbmcubW9kdWxlJztcbmltcG9ydCB7IENsck91dHNpZGVDbGlja01vZHVsZSB9IGZyb20gJy4uLy4uL3V0aWxzL291dHNpZGUtY2xpY2svb3V0c2lkZS1jbGljay5tb2R1bGUnO1xuXG5pbXBvcnQgeyBEYXRhZ3JpZFJvd0V4cGFuZEFuaW1hdGlvbiB9IGZyb20gJy4vYW5pbWF0aW9uLWhhY2svcm93LWV4cGFuZC1hbmltYXRpb24nO1xuaW1wb3J0IHsgRGF0YWdyaWRTdHJpbmdGaWx0ZXIgfSBmcm9tICcuL2J1aWx0LWluL2ZpbHRlcnMvZGF0YWdyaWQtc3RyaW5nLWZpbHRlcic7XG5pbXBvcnQgeyBBY3Rpb25hYmxlT29tcGFMb29tcGEgfSBmcm9tICcuL2Nob2NvbGF0ZS9hY3Rpb25hYmxlLW9vbXBhLWxvb21wYSc7XG5pbXBvcnQgeyBEYXRhZ3JpZFdpbGx5V29ua2EgfSBmcm9tICcuL2Nob2NvbGF0ZS9kYXRhZ3JpZC13aWxseS13b25rYSc7XG5pbXBvcnQgeyBFeHBhbmRhYmxlT29tcGFMb29tcGEgfSBmcm9tICcuL2Nob2NvbGF0ZS9leHBhbmRhYmxlLW9vbXBhLWxvb21wYSc7XG5pbXBvcnQgeyBDbHJEYXRhZ3JpZCB9IGZyb20gJy4vZGF0YWdyaWQnO1xuaW1wb3J0IHsgQ2xyRGF0YWdyaWRBY3Rpb25CYXIgfSBmcm9tICcuL2RhdGFncmlkLWFjdGlvbi1iYXInO1xuaW1wb3J0IHsgQ2xyRGF0YWdyaWRBY3Rpb25PdmVyZmxvdyB9IGZyb20gJy4vZGF0YWdyaWQtYWN0aW9uLW92ZXJmbG93JztcbmltcG9ydCB7IENsckRhdGFncmlkQ2VsbCB9IGZyb20gJy4vZGF0YWdyaWQtY2VsbCc7XG5pbXBvcnQgeyBDbHJEYXRhZ3JpZENvbHVtbiB9IGZyb20gJy4vZGF0YWdyaWQtY29sdW1uJztcbmltcG9ydCB7IENsckRhdGFncmlkQ29sdW1uVG9nZ2xlIH0gZnJvbSAnLi9kYXRhZ3JpZC1jb2x1bW4tdG9nZ2xlJztcbmltcG9ydCB7IENsckRhdGFncmlkQ29sdW1uVG9nZ2xlQnV0dG9uIH0gZnJvbSAnLi9kYXRhZ3JpZC1jb2x1bW4tdG9nZ2xlLWJ1dHRvbic7XG5pbXBvcnQgeyBDbHJEYXRhZ3JpZENvbHVtblRvZ2dsZVRpdGxlIH0gZnJvbSAnLi9kYXRhZ3JpZC1jb2x1bW4tdG9nZ2xlLXRpdGxlJztcbmltcG9ydCB7IERhdGFncmlkRGV0YWlsUmVnaXN0ZXJlciB9IGZyb20gJy4vZGF0YWdyaWQtZGV0YWlsLXJlZ2lzdGVyZXInO1xuaW1wb3J0IHsgQ2xyRGF0YWdyaWRGaWx0ZXIgfSBmcm9tICcuL2RhdGFncmlkLWZpbHRlcic7XG5pbXBvcnQgeyBDbHJEYXRhZ3JpZEZvb3RlciB9IGZyb20gJy4vZGF0YWdyaWQtZm9vdGVyJztcbmltcG9ydCB7IENsckRhdGFncmlkSGlkZWFibGVDb2x1bW4gfSBmcm9tICcuL2RhdGFncmlkLWhpZGVhYmxlLWNvbHVtbic7XG5pbXBvcnQgeyBDbHJEYXRhZ3JpZEl0ZW1zIH0gZnJvbSAnLi9kYXRhZ3JpZC1pdGVtcyc7XG5pbXBvcnQgeyBDbHJEYXRhZ3JpZEl0ZW1zVHJhY2tCeSB9IGZyb20gJy4vZGF0YWdyaWQtaXRlbXMtdHJhY2tieSc7XG5pbXBvcnQgeyBDbHJEYXRhZ3JpZFBhZ2luYXRpb24gfSBmcm9tICcuL2RhdGFncmlkLXBhZ2luYXRpb24nO1xuaW1wb3J0IHsgQ2xyRGF0YWdyaWRQbGFjZWhvbGRlciB9IGZyb20gJy4vZGF0YWdyaWQtcGxhY2Vob2xkZXInO1xuaW1wb3J0IHsgQ2xyRGF0YWdyaWRSb3cgfSBmcm9tICcuL2RhdGFncmlkLXJvdyc7XG5pbXBvcnQgeyBDbHJEYXRhZ3JpZFJvd0RldGFpbCB9IGZyb20gJy4vZGF0YWdyaWQtcm93LWRldGFpbCc7XG5pbXBvcnQgeyBEYXRhZ3JpZENlbGxSZW5kZXJlciB9IGZyb20gJy4vcmVuZGVyL2NlbGwtcmVuZGVyZXInO1xuaW1wb3J0IHsgRGF0YWdyaWRDb2x1bW5SZXNpemVyIH0gZnJvbSAnLi9yZW5kZXIvY29sdW1uLXJlc2l6ZXInO1xuaW1wb3J0IHsgRGF0YWdyaWRIZWFkZXJSZW5kZXJlciB9IGZyb20gJy4vcmVuZGVyL2hlYWRlci1yZW5kZXJlcic7XG5pbXBvcnQgeyBEYXRhZ3JpZE1haW5SZW5kZXJlciB9IGZyb20gJy4vcmVuZGVyL21haW4tcmVuZGVyZXInO1xuaW1wb3J0IHsgRGF0YWdyaWRSb3dSZW5kZXJlciB9IGZyb20gJy4vcmVuZGVyL3Jvdy1yZW5kZXJlcic7XG5pbXBvcnQgeyBXcmFwcGVkQ2VsbCB9IGZyb20gJy4vd3JhcHBlZC1jZWxsJztcbmltcG9ydCB7IFdyYXBwZWRDb2x1bW4gfSBmcm9tICcuL3dyYXBwZWQtY29sdW1uJztcbmltcG9ydCB7IFdyYXBwZWRSb3cgfSBmcm9tICcuL3dyYXBwZWQtcm93JztcblxuZXhwb3J0IGNvbnN0IENMUl9EQVRBR1JJRF9ESVJFQ1RJVkVTOiBUeXBlPGFueT5bXSA9IFtcbiAgLy8gQ29yZVxuICBDbHJEYXRhZ3JpZCxcbiAgQ2xyRGF0YWdyaWRBY3Rpb25CYXIsXG4gIENsckRhdGFncmlkQWN0aW9uT3ZlcmZsb3csXG4gIENsckRhdGFncmlkQ29sdW1uLFxuICBDbHJEYXRhZ3JpZENvbHVtblRvZ2dsZSxcbiAgQ2xyRGF0YWdyaWRIaWRlYWJsZUNvbHVtbixcbiAgQ2xyRGF0YWdyaWRGaWx0ZXIsXG4gIENsckRhdGFncmlkSXRlbXMsXG4gIENsckRhdGFncmlkSXRlbXNUcmFja0J5LFxuICBDbHJEYXRhZ3JpZFJvdyxcbiAgQ2xyRGF0YWdyaWRSb3dEZXRhaWwsXG4gIERhdGFncmlkRGV0YWlsUmVnaXN0ZXJlcixcbiAgQ2xyRGF0YWdyaWRDZWxsLFxuICBDbHJEYXRhZ3JpZEZvb3RlcixcbiAgQ2xyRGF0YWdyaWRQYWdpbmF0aW9uLFxuICBDbHJEYXRhZ3JpZFBsYWNlaG9sZGVyLFxuICBDbHJEYXRhZ3JpZENvbHVtblRvZ2dsZUJ1dHRvbixcbiAgQ2xyRGF0YWdyaWRDb2x1bW5Ub2dnbGVUaXRsZSxcbiAgV3JhcHBlZENlbGwsXG4gIFdyYXBwZWRDb2x1bW4sXG4gIFdyYXBwZWRSb3csXG5cbiAgLy8gUmVuZGVyZXJzXG4gIERhdGFncmlkTWFpblJlbmRlcmVyLFxuICBEYXRhZ3JpZEhlYWRlclJlbmRlcmVyLFxuICBEYXRhZ3JpZENvbHVtblJlc2l6ZXIsXG4gIERhdGFncmlkUm93UmVuZGVyZXIsXG4gIERhdGFncmlkQ2VsbFJlbmRlcmVyLFxuXG4gIC8vIENob2NvbGF0ZVxuICBEYXRhZ3JpZFdpbGx5V29ua2EsXG4gIEFjdGlvbmFibGVPb21wYUxvb21wYSxcbiAgRXhwYW5kYWJsZU9vbXBhTG9vbXBhLFxuXG4gIC8vIEFuaW1hdGlvbiBoYWNrXG4gIERhdGFncmlkUm93RXhwYW5kQW5pbWF0aW9uLFxuXG4gIC8vIEJ1aWx0LWluIHNob3J0Y3V0c1xuICBEYXRhZ3JpZFN0cmluZ0ZpbHRlcixcbl07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgQ2xySWNvbk1vZHVsZSxcbiAgICBDbHJGb3Jtc01vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBDbHJDb21tb25Qb3BvdmVyTW9kdWxlLFxuICAgIENsckxvYWRpbmdNb2R1bGUsXG4gICAgQ2xyT3V0c2lkZUNsaWNrTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtDTFJfREFUQUdSSURfRElSRUNUSVZFU10sXG4gIGV4cG9ydHM6IFtDTFJfREFUQUdSSURfRElSRUNUSVZFUywgQ2xySWZFeHBhbmRNb2R1bGVdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtXcmFwcGVkQ2VsbCwgV3JhcHBlZENvbHVtbiwgV3JhcHBlZFJvd10sXG59KVxuZXhwb3J0IGNsYXNzIENsckRhdGFncmlkTW9kdWxlIHt9XG4iXX0=