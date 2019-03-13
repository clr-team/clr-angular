/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { isPlatformBrowser } from '@angular/common';
import { ContentChildren, Directive, ElementRef, PLATFORM_ID, QueryList, Renderer2, } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DatagridRenderStep } from '../enums/render-step.enum';
import { Items } from '../providers/items';
import { Page } from '../providers/page';
import { TableSizeService } from '../providers/table-size.service';
import { DomAdapter } from '../../../utils/dom-adapter/dom-adapter';
import { DatagridHeaderRenderer } from './header-renderer';
import { NoopDomAdapter } from './noop-dom-adapter';
import { DatagridRenderOrganizer } from './render-organizer';
import { ColumnsService } from '../providers/columns.service';
import { DatagridColumnChanges } from '../enums/column-changes.enum';
import { DatagridRowRenderer } from './row-renderer';
// Fixes build error
// @dynamic (https://github.com/angular/angular/issues/19698#issuecomment-338340211)
/** @type {?} */
export const domAdapterFactory = (platformId) => {
    if (isPlatformBrowser(platformId)) {
        return new DomAdapter();
    }
    else {
        return new NoopDomAdapter();
    }
};
// Fixes build error
// @dynamic (https://github.com/angular/angular/issues/19698#issuecomment-338340211)
/**
 * @template T
 */
export class DatagridMainRenderer {
    /**
     * @param {?} organizer
     * @param {?} items
     * @param {?} page
     * @param {?} domAdapter
     * @param {?} el
     * @param {?} renderer
     * @param {?} tableSizeService
     * @param {?} columnsService
     */
    constructor(organizer, items, page, domAdapter, el, renderer, tableSizeService, columnsService) {
        this.organizer = organizer;
        this.items = items;
        this.page = page;
        this.domAdapter = domAdapter;
        this.el = el;
        this.renderer = renderer;
        this.tableSizeService = tableSizeService;
        this.columnsService = columnsService;
        this._heightSet = false;
        this.subscriptions = [];
        /**
         * Indicates if we want to re-compute columns width. This should only happen:
         * 1) When headers change, with columns being added or removed
         * 2) When rows are lazily loaded for the first time
         */
        this.columnsSizesStable = false;
        this.shouldStabilizeColumns = true;
        this.subscriptions.push(this.organizer
            .filterRenderSteps(DatagridRenderStep.COMPUTE_COLUMN_WIDTHS)
            .subscribe(() => this.computeHeadersWidth()));
        this.subscriptions.push(this.page.sizeChange.subscribe(() => {
            if (this._heightSet) {
                this.resetDatagridHeight();
            }
        }));
        this.subscriptions.push(this.items.change.subscribe(() => (this.shouldStabilizeColumns = true)));
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.setupColumns();
        this.subscriptions.push(this.headers.changes.subscribe(() => {
            // TODO: only re-stabilize if a column was added or removed. Reordering is fine.
            // Need to setup columns before stabalizing them
            this.setupColumns();
            this.columnsSizesStable = false;
            this.stabilizeColumns();
        }));
        this.subscriptions.push(this.rows.changes.subscribe(() => {
            this.rows.forEach(row => row.setupColumns());
        }));
    }
    // Initialize and set Table width for horizontal scrolling here.
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.tableSizeService.table = this.el;
    }
    /**
     * @return {?}
     */
    ngAfterViewChecked() {
        if (this.shouldStabilizeColumns) {
            this.stabilizeColumns();
        }
        if (this.shouldComputeHeight()) {
            setTimeout(() => {
                this.computeDatagridHeight();
            });
        }
    }
    /**
     * @return {?}
     */
    setupColumns() {
        this.headers.forEach((header, index) => {
            // We want to get the initial state
            this.columnsService.columns[index] = new BehaviorSubject(header.getColumnWidthState());
            header.columnState = this.columnsService.columns[index];
        });
        this.columnsService.columns.splice(this.headers.length); // Trim any old columns
        this.rows.forEach(row => row.setupColumns());
    }
    /**
     * @return {?}
     */
    shouldComputeHeight() {
        if (!this._heightSet && this.page.size > 0) {
            if (this.items.displayed.length === this.page.size) {
                return true;
            }
        }
        return false;
    }
    /**
     * Computes the height of the datagrid.
     *
     * NOTE: We had to choose to set the height instead of the min-height because
     * IE 11 requires the height on the parent for the children flex grow/shrink properties to work.
     * When we used min-height, 1 1 auto doesn't used to work in IE11 :-(
     * But this doesn't affect the fix. It works in both fixed & variable height datagrids.
     *
     * Refer: http://stackoverflow.com/questions/24396205/flex-grow-not-working-in-internet-explorer-11-0
     * @return {?}
     */
    computeDatagridHeight() {
        // IE doesn't return correct value for getComputedStyle(element).getPropertyValue("height")
        /** @type {?} */
        const value = this.domAdapter.clientRect(this.el.nativeElement).height;
        this.renderer.setStyle(this.el.nativeElement, 'height', value + 'px');
        this._heightSet = true;
    }
    /**
     * @return {?}
     */
    resetDatagridHeight() {
        this.renderer.setStyle(this.el.nativeElement, 'height', '');
        this._heightSet = false;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
    /**
     * Makes each header compute its width.
     * @return {?}
     */
    computeHeadersWidth() {
        /** @type {?} */
        const nbColumns = this.headers.length;
        /** @type {?} */
        let allStrict = true;
        this.headers.forEach((header, index) => {
            // On the last header column check whether all columns have strict widths.
            // If all columns have strict widths, remove the strict width from the last column and make it the column's
            // minimum width so that when all previous columns shrink, it will get a flexible width and cover the empty
            // gap in the Datagrid.
            /** @type {?} */
            const state = Object.assign({ changes: [DatagridColumnChanges.WIDTH] }, header.getColumnWidthState());
            if (!state.strictWidth) {
                allStrict = false;
            }
            if (nbColumns === index + 1 && allStrict) {
                state.strictWidth = 0;
            }
            this.columnsService.emitStateChange(index, state);
        });
    }
    /**
     * Triggers a whole re-rendring cycle to set column sizes, if needed.
     * @return {?}
     */
    stabilizeColumns() {
        this.shouldStabilizeColumns = false;
        if (this.columnsSizesStable) {
            // Nothing to do.
            return;
        }
        // Resize when the rows are loaded.
        if (this.items.displayed.length > 0) {
            this.organizer.resize();
            this.columnsSizesStable = true;
        }
    }
}
DatagridMainRenderer.decorators = [
    { type: Directive, args: [{
                selector: 'clr-datagrid',
                providers: [{ provide: DomAdapter, useFactory: domAdapterFactory, deps: [PLATFORM_ID] }],
            },] }
];
/** @nocollapse */
DatagridMainRenderer.ctorParameters = () => [
    { type: DatagridRenderOrganizer },
    { type: Items },
    { type: Page },
    { type: DomAdapter },
    { type: ElementRef },
    { type: Renderer2 },
    { type: TableSizeService },
    { type: ColumnsService }
];
DatagridMainRenderer.propDecorators = {
    headers: [{ type: ContentChildren, args: [DatagridHeaderRenderer,] }],
    rows: [{ type: ContentChildren, args: [DatagridRowRenderer,] }]
};
if (false) {
    /** @type {?} */
    DatagridMainRenderer.prototype.headers;
    /** @type {?} */
    DatagridMainRenderer.prototype.rows;
    /** @type {?} */
    DatagridMainRenderer.prototype._heightSet;
    /** @type {?} */
    DatagridMainRenderer.prototype.subscriptions;
    /**
     * Indicates if we want to re-compute columns width. This should only happen:
     * 1) When headers change, with columns being added or removed
     * 2) When rows are lazily loaded for the first time
     * @type {?}
     */
    DatagridMainRenderer.prototype.columnsSizesStable;
    /** @type {?} */
    DatagridMainRenderer.prototype.shouldStabilizeColumns;
    /** @type {?} */
    DatagridMainRenderer.prototype.organizer;
    /** @type {?} */
    DatagridMainRenderer.prototype.items;
    /** @type {?} */
    DatagridMainRenderer.prototype.page;
    /** @type {?} */
    DatagridMainRenderer.prototype.domAdapter;
    /** @type {?} */
    DatagridMainRenderer.prototype.el;
    /** @type {?} */
    DatagridMainRenderer.prototype.renderer;
    /** @type {?} */
    DatagridMainRenderer.prototype.tableSizeService;
    /** @type {?} */
    DatagridMainRenderer.prototype.columnsService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1yZW5kZXJlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvcmVuZGVyL21haW4tcmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDcEQsT0FBTyxFQUlMLGVBQWUsRUFDZixTQUFTLEVBQ1QsVUFBVSxFQUVWLFdBQVcsRUFDWCxTQUFTLEVBQ1QsU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxlQUFlLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBRXJELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDekMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFFbkUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzNELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUM3RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFFOUQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDckUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFJckQsTUFBTSxPQUFPLGlCQUFpQixHQUFHLENBQUMsVUFBa0IsRUFBRSxFQUFFO0lBQ3RELElBQUksaUJBQWlCLENBQUMsVUFBVSxD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SSxDQUFDLHNCQUFzQixHQUFHLEtBQUssQ0FBQztRQUNwQyxJQUFJLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtZQUMzQixpQkFBaUI7WUFDakIsT0FBTztTQUNSO1FBQ0QsbUNBQW1DO1FBQ25DLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNuQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7U0FDaEM7SUFDSCxDQUFDOzs7WUExS0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxjQUFjO2dCQUN4QixTQUFTLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLGlCQUFpQixFQUFFLElBQUksRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUM7YUFDekY7Ozs7WUFyQlEsdUJBQXVCO1lBUHZCLEtBQUs7WUFDTCxJQUFJO1lBR0osVUFBVTtZQWJqQixVQUFVO1lBSVYsU0FBUztZQU9GLGdCQUFnQjtZQU1oQixjQUFjOzs7c0JBZ0RwQixlQUFlLFNBQUMsc0JBQXNCO21CQUN0QyxlQUFlLFNBQUMsbUJBQW1COzs7O0lBRHBDLHVDQUE0Rjs7SUFDNUYsb0NBQW1GOztJQWdEbkYsMENBQW9DOztJQWlDcEMsNkNBQTJDOzs7Ozs7O0lBdUMzQyxrREFBbUM7O0lBRW5DLHNEQUFzQzs7SUFwSnBDLHlDQUEwQzs7SUFDMUMscUNBQW9COztJQUNwQixvQ0FBa0I7O0lBQ2xCLDBDQUE4Qjs7SUFDOUIsa0NBQXNCOztJQUN0Qix3Q0FBMkI7O0lBQzNCLGdEQUEwQzs7SUFDMUMsOENBQXNDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQWZ0ZXJWaWV3Q2hlY2tlZCxcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIE9uRGVzdHJveSxcbiAgUExBVEZPUk1fSUQsXG4gIFF1ZXJ5TGlzdCxcbiAgUmVuZGVyZXIyLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IERhdGFncmlkUmVuZGVyU3RlcCB9IGZyb20gJy4uL2VudW1zL3JlbmRlci1zdGVwLmVudW0nO1xuaW1wb3J0IHsgSXRlbXMgfSBmcm9tICcuLi9wcm92aWRlcnMvaXRlbXMnO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gJy4uL3Byb3ZpZGVycy9wYWdlJztcbmltcG9ydCB7IFRhYmxlU2l6ZVNlcnZpY2UgfSBmcm9tICcuLi9wcm92aWRlcnMvdGFibGUtc2l6ZS5zZXJ2aWNlJztcblxuaW1wb3J0IHsgRG9tQWRhcHRlciB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2RvbS1hZGFwdGVyL2RvbS1hZGFwdGVyJztcbmltcG9ydCB7IERhdGFncmlkSGVhZGVyUmVuZGVyZXIgfSBmcm9tICcuL2hlYWRlci1yZW5kZXJlcic7XG5pbXBvcnQgeyBOb29wRG9tQWRhcHRlciB9IGZyb20gJy4vbm9vcC1kb20tYWRhcHRlcic7XG5pbXBvcnQgeyBEYXRhZ3JpZFJlbmRlck9yZ2FuaXplciB9IGZyb20gJy4vcmVuZGVyLW9yZ2FuaXplcic7XG5pbXBvcnQgeyBDb2x1bW5zU2VydmljZSB9IGZyb20gJy4uL3Byb3ZpZGVycy9jb2x1bW5zLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0YWdyaWRDb2x1bW5TdGF0ZSB9IGZyb20gJy4uL2ludGVyZmFjZXMvY29sdW1uLXN0YXRlLmludGVyZmFjZSc7XG5pbXBvcnQgeyBEYXRhZ3JpZENvbHVtbkNoYW5nZXMgfSBmcm9tICcuLi9lbnVtcy9jb2x1bW4tY2hhbmdlcy5lbnVtJztcbmltcG9ydCB7IERhdGFncmlkUm93UmVuZGVyZXIgfSBmcm9tICcuL3Jvdy1yZW5kZXJlcic7XG5cbi8vIEZpeGVzIGJ1aWxkIGVycm9yXG4vLyBAZHluYW1pYyAoaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMTk2OTgjaXNzdWVjb21tZW50LTMzODM0MDIxMSlcbmV4cG9ydCBjb25zdCBkb21BZGFwdGVyRmFjdG9yeSA9IChwbGF0Zm9ybUlkOiBPYmplY3QpID0+IHtcbiAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHBsYXRmb3JtSWQpKSB7XG4gICAgcmV0dXJuIG5ldyBEb21BZGFwdGVyKCk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5ldyBOb29wRG9tQWRhcHRlcigpO1xuICB9XG59O1xuXG4vLyBGaXhlcyBidWlsZCBlcnJvclxuLy8gQGR5bmFtaWMgKGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzE5Njk4I2lzc3VlY29tbWVudC0zMzgzNDAyMTEpXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdjbHItZGF0YWdyaWQnLFxuICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IERvbUFkYXB0ZXIsIHVzZUZhY3Rvcnk6IGRvbUFkYXB0ZXJGYWN0b3J5LCBkZXBzOiBbUExBVEZPUk1fSURdIH1dLFxufSlcbmV4cG9ydCBjbGFzcyBEYXRhZ3JpZE1haW5SZW5kZXJlcjxUID0gYW55PiBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIEFmdGVyVmlld0luaXQsIEFmdGVyVmlld0NoZWNrZWQsIE9uRGVzdHJveSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgb3JnYW5pemVyOiBEYXRhZ3JpZFJlbmRlck9yZ2FuaXplcixcbiAgICBwcml2YXRlIGl0ZW1zOiBJdGVtcyxcbiAgICBwcml2YXRlIHBhZ2U6IFBhZ2UsXG4gICAgcHJpdmF0ZSBkb21BZGFwdGVyOiBEb21BZGFwdGVyLFxuICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgdGFibGVTaXplU2VydmljZTogVGFibGVTaXplU2VydmljZSxcbiAgICBwcml2YXRlIGNvbHVtbnNTZXJ2aWNlOiBDb2x1bW5zU2VydmljZVxuICApIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMub3JnYW5pemVyXG4gICAgICAgIC5maWx0ZXJSZW5kZXJTdGVwcyhEYXRhZ3JpZFJlbmRlclN0ZXAuQ09NUFVURV9DT0xVTU5fV0lEVEhTKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuY29tcHV0ZUhlYWRlcnNXaWR0aCgpKVxuICAgICk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMucGFnZS5zaXplQ2hhbmdlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLl9oZWlnaHRTZXQpIHtcbiAgICAgICAgICB0aGlzLnJlc2V0RGF0YWdyaWRIZWlnaHQoKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKHRoaXMuaXRlbXMuY2hhbmdlLnN1YnNjcmliZSgoKSA9PiAodGhpcy5zaG91bGRTdGFiaWxpemVDb2x1bW5zID0gdHJ1ZSkpKTtcbiAgfVxuXG4gIEBDb250ZW50Q2hpbGRyZW4oRGF0YWdyaWRIZWFkZXJSZW5kZXJlcikgcHJpdmF0ZSBoZWFkZXJzOiBRdWVyeUxpc3Q8RGF0YWdyaWRIZWFkZXJSZW5kZXJlcj47XG4gIEBDb250ZW50Q2hpbGRyZW4oRGF0YWdyaWRSb3dSZW5kZXJlcikgcHJpdmF0ZSByb3dzOiBRdWVyeUxpc3Q8RGF0YWdyaWRSb3dSZW5kZXJlcj47XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIHRoaXMuc2V0dXBDb2x1bW5zKCk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMuaGVhZGVycy5jaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIC8vIFRPRE86IG9ubHkgcmUtc3RhYmlsaXplIGlmIGEgY29sdW1uIHdhcyBhZGRlZCBvciByZW1vdmVkLiBSZW9yZGVyaW5nIGlzIGZpbmUuXG4gICAgICAgIC8vIE5lZWQgdG8gc2V0dXAgY29sdW1ucyBiZWZvcmUgc3RhYmFsaXppbmcgdGhlbVxuICAgICAgICB0aGlzLnNldHVwQ29sdW1ucygpO1xuICAgICAgICB0aGlzLmNvbHVtbnNTaXplc1N0YWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnN0YWJpbGl6ZUNvbHVtbnMoKTtcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5yb3dzLmNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5yb3dzLmZvckVhY2gocm93ID0+IHJvdy5zZXR1cENvbHVtbnMoKSk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvLyBJbml0aWFsaXplIGFuZCBzZXQgVGFibGUgd2lkdGggZm9yIGhvcml6b250YWwgc2Nyb2xsaW5nIGhlcmUuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLnRhYmxlU2l6ZVNlcnZpY2UudGFibGUgPSB0aGlzLmVsO1xuICB9XG5cbiAgbmdBZnRlclZpZXdDaGVja2VkKCkge1xuICAgIGlmICh0aGlzLnNob3VsZFN0YWJpbGl6ZUNvbHVtbnMpIHtcbiAgICAgIHRoaXMuc3RhYmlsaXplQ29sdW1ucygpO1xuICAgIH1cbiAgICBpZiAodGhpcy5zaG91bGRDb21wdXRlSGVpZ2h0KCkpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmNvbXB1dGVEYXRhZ3JpZEhlaWdodCgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXR1cENvbHVtbnMoKSB7XG4gICAgdGhpcy5oZWFkZXJzLmZvckVhY2goKGhlYWRlciwgaW5kZXgpID0+IHtcbiAgICAgIC8vIFdlIHdhbnQgdG8gZ2V0IHRoZSBpbml0aWFsIHN0YXRlXG4gICAgICB0aGlzLmNvbHVtbnNTZXJ2aWNlLmNvbHVtbnNbaW5kZXhdID0gbmV3IEJlaGF2aW9yU3ViamVjdDxEYXRhZ3JpZENvbHVtblN0YXRlPihoZWFkZXIuZ2V0Q29sdW1uV2lkdGhTdGF0ZSgpKTtcbiAgICAgIGhlYWRlci5jb2x1bW5TdGF0ZSA9IHRoaXMuY29sdW1uc1NlcnZpY2UuY29sdW1uc1tpbmRleF07XG4gICAgfSk7XG4gICAgdGhpcy5jb2x1bW5zU2VydmljZS5jb2x1bW5zLnNwbGljZSh0aGlzLmhlYWRlcnMubGVuZ3RoKTsgLy8gVHJpbSBhbnkgb2xkIGNvbHVtbnNcbiAgICB0aGlzLnJvd3MuZm9yRWFjaChyb3cgPT4gcm93LnNldHVwQ29sdW1ucygpKTtcbiAgfVxuXG4gIHByaXZhdGUgX2hlaWdodFNldDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIHByaXZhdGUgc2hvdWxkQ29tcHV0ZUhlaWdodCgpOiBib29sZWFuIHtcbiAgICBpZiAoIXRoaXMuX2hlaWdodFNldCAmJiB0aGlzLnBhZ2Uuc2l6ZSA+IDApIHtcbiAgICAgIGlmICh0aGlzLml0ZW1zLmRpc3BsYXllZC5sZW5ndGggPT09IHRoaXMucGFnZS5zaXplKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogQ29tcHV0ZXMgdGhlIGhlaWdodCBvZiB0aGUgZGF0YWdyaWQuXG4gICAqXG4gICAqIE5PVEU6IFdlIGhhZCB0byBjaG9vc2UgdG8gc2V0IHRoZSBoZWlnaHQgaW5zdGVhZCBvZiB0aGUgbWluLWhlaWdodCBiZWNhdXNlXG4gICAqIElFIDExIHJlcXVpcmVzIHRoZSBoZWlnaHQgb24gdGhlIHBhcmVudCBmb3IgdGhlIGNoaWxkcmVuIGZsZXggZ3Jvdy9zaHJpbmsgcHJvcGVydGllcyB0byB3b3JrLlxuICAgKiBXaGVuIHdlIHVzZWQgbWluLWhlaWdodCwgMSAxIGF1dG8gZG9lc24ndCB1c2VkIHRvIHdvcmsgaW4gSUUxMSA6LShcbiAgICogQnV0IHRoaXMgZG9lc24ndCBhZmZlY3QgdGhlIGZpeC4gSXQgd29ya3MgaW4gYm90aCBmaXhlZCAmIHZhcmlhYmxlIGhlaWdodCBkYXRhZ3JpZHMuXG4gICAqXG4gICAqIFJlZmVyOiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzI0Mzk2MjA1L2ZsZXgtZ3Jvdy1ub3Qtd29ya2luZy1pbi1pbnRlcm5ldC1leHBsb3Jlci0xMS0wXG4gICAqL1xuICBwcml2YXRlIGNvbXB1dGVEYXRhZ3JpZEhlaWdodCgpIHtcbiAgICAvLyBJRSBkb2Vzbid0IHJldHVybiBjb3JyZWN0IHZhbHVlIGZvciBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpLmdldFByb3BlcnR5VmFsdWUoXCJoZWlnaHRcIilcbiAgICBjb25zdCB2YWx1ZTogbnVtYmVyID0gdGhpcy5kb21BZGFwdGVyLmNsaWVudFJlY3QodGhpcy5lbC5uYXRpdmVFbGVtZW50KS5oZWlnaHQ7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdoZWlnaHQnLCB2YWx1ZSArICdweCcpO1xuICAgIHRoaXMuX2hlaWdodFNldCA9IHRydWU7XG4gIH1cblxuICBwcml2YXRlIHJlc2V0RGF0YWdyaWRIZWlnaHQoKSB7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdoZWlnaHQnLCAnJyk7XG4gICAgdGhpcy5faGVpZ2h0U2V0ID0gZmFsc2U7XG4gIH1cblxuICBwcml2YXRlIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmZvckVhY2goc3ViID0+IHN1Yi51bnN1YnNjcmliZSgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNYWtlcyBlYWNoIGhlYWRlciBjb21wdXRlIGl0cyB3aWR0aC5cbiAgICovXG4gIHByaXZhdGUgY29tcHV0ZUhlYWRlcnNXaWR0aCgpIHtcbiAgICBjb25zdCBuYkNvbHVtbnM6IG51bWJlciA9IHRoaXMuaGVhZGVycy5sZW5ndGg7XG4gICAgbGV0IGFsbFN0cmljdCA9IHRydWU7XG4gICAgdGhpcy5oZWFkZXJzLmZvckVhY2goKGhlYWRlciwgaW5kZXgpID0+IHtcbiAgICAgIC8vIE9uIHRoZSBsYXN0IGhlYWRlciBjb2x1bW4gY2hlY2sgd2hldGhlciBhbGwgY29sdW1ucyBoYXZlIHN0cmljdCB3aWR0aHMuXG4gICAgICAvLyBJZiBhbGwgY29sdW1ucyBoYXZlIHN0cmljdCB3aWR0aHMsIHJlbW92ZSB0aGUgc3RyaWN0IHdpZHRoIGZyb20gdGhlIGxhc3QgY29sdW1uIGFuZCBtYWtlIGl0IHRoZSBjb2x1bW4nc1xuICAgICAgLy8gbWluaW11bSB3aWR0aCBzbyB0aGF0IHdoZW4gYWxsIHByZXZpb3VzIGNvbHVtbnMgc2hyaW5rLCBpdCB3aWxsIGdldCBhIGZsZXhpYmxlIHdpZHRoIGFuZCBjb3ZlciB0aGUgZW1wdHlcbiAgICAgIC8vIGdhcCBpbiB0aGUgRGF0YWdyaWQuXG4gICAgICBjb25zdCBzdGF0ZTogUGFydGlhbDxEYXRhZ3JpZENvbHVtblN0YXRlPiA9IHtcbiAgICAgICAgY2hhbmdlczogW0RhdGFncmlkQ29sdW1uQ2hhbmdlcy5XSURUSF0sXG4gICAgICAgIC4uLmhlYWRlci5nZXRDb2x1bW5XaWR0aFN0YXRlKCksXG4gICAgICB9O1xuXG4gICAgICBpZiAoIXN0YXRlLnN0cmljdFdpZHRoKSB7XG4gICAgICAgIGFsbFN0cmljdCA9IGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpZiAobmJDb2x1bW5zID09PSBpbmRleCArIDEgJiYgYWxsU3RyaWN0KSB7XG4gICAgICAgIHN0YXRlLnN0cmljdFdpZHRoID0gMDtcbiAgICAgIH1cblxuICAgICAgdGhpcy5jb2x1bW5zU2VydmljZS5lbWl0U3RhdGVDaGFuZ2UoaW5kZXgsIHN0YXRlKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgaWYgd2Ugd2FudCB0byByZS1jb21wdXRlIGNvbHVtbnMgd2lkdGguIFRoaXMgc2hvdWxkIG9ubHkgaGFwcGVuOlxuICAgKiAxKSBXaGVuIGhlYWRlcnMgY2hhbmdlLCB3aXRoIGNvbHVtbnMgYmVpbmcgYWRkZWQgb3IgcmVtb3ZlZFxuICAgKiAyKSBXaGVuIHJvd3MgYXJlIGxhemlseSBsb2FkZWQgZm9yIHRoZSBmaXJzdCB0aW1lXG4gICAqL1xuICBwcml2YXRlIGNvbHVtbnNTaXplc1N0YWJsZSA9IGZhbHNlO1xuXG4gIHByaXZhdGUgc2hvdWxkU3RhYmlsaXplQ29sdW1ucyA9IHRydWU7XG5cbiAgLyoqXG4gICAqIFRyaWdnZXJzIGEgd2hvbGUgcmUtcmVuZHJpbmcgY3ljbGUgdG8gc2V0IGNvbHVtbiBzaXplcywgaWYgbmVlZGVkLlxuICAgKi9cbiAgcHJpdmF0ZSBzdGFiaWxpemVDb2x1bW5zKCkge1xuICAgIHRoaXMuc2hvdWxkU3RhYmlsaXplQ29sdW1ucyA9IGZhbHNlO1xuICAgIGlmICh0aGlzLmNvbHVtbnNTaXplc1N0YWJsZSkge1xuICAgICAgLy8gTm90aGluZyB0byBkby5cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gUmVzaXplIHdoZW4gdGhlIHJvd3MgYXJlIGxvYWRlZC5cbiAgICBpZiAodGhpcy5pdGVtcy5kaXNwbGF5ZWQubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5vcmdhbml6ZXIucmVzaXplKCk7XG4gICAgICB0aGlzLmNvbHVtbnNTaXplc1N0YWJsZSA9IHRydWU7XG4gICAgfVxuICB9XG59XG4iXX0=