/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { isPlatformBrowser } from '@angular/common';
import { ContentChildren, Directive, ElementRef, PLATFORM_ID, QueryList, Renderer2, } from '@angular/core';
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
export const domAdapterFactory = (/**
 * @param {?} platformId
 * @return {?}
 */
(platformId) => {
    if (isPlatformBrowser(platformId)) {
        return new DomAdapter();
    }
    else {
        return new NoopDomAdapter();
    }
});
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
            .subscribe((/**
         * @return {?}
         */
        () => this.computeHeadersWidth())));
        this.subscriptions.push(this.page.sizeChange.subscribe((/**
         * @return {?}
         */
        () => {
            if (this._heightSet) {
                this.resetDatagridHeight();
            }
        })));
        this.subscriptions.push(this.items.change.subscribe((/**
         * @return {?}
         */
        () => (this.shouldStabilizeColumns = true))));
    }
    // if expandable row is expanded initially, query its cells too.
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.setupColumns();
        this.subscriptions.push(this.headers.changes.subscribe((/**
         * @return {?}
         */
        () => {
            // TODO: only re-stabilize if a column was added or removed. Reordering is fine.
            // Need to setup columns before stabalizing them
            this.setupColumns();
            this.columnsSizesStable = false;
            this.stabilizeColumns();
        })));
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
            setTimeout((/**
             * @return {?}
             */
            () => {
                this.computeDatagridHeight();
            }));
        }
    }
    /**
     * @private
     * @return {?}
     */
    setupColumns() {
        this.headers.forEach((/**
         * @param {?} header
         * @param {?} index
         * @return {?}
         */
        (header, index) => header.setColumnState(index)));
        this.columnsService.columns.splice(this.headers.length); // Trim any old columns
        this.rows.forEach((/**
         * @param {?} row
         * @return {?}
         */
        row => row.setColumnState()));
    }
    /**
     * @private
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
     * @private
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
     * @private
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
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        sub => sub.unsubscribe()));
    }
    /**
     * Makes each header compute its width.
     * @private
     * @return {?}
     */
    computeHeadersWidth() {
        /** @type {?} */
        const nbColumns = this.headers.length;
        /** @type {?} */
        let allStrict = true;
        this.headers.forEach((/**
         * @param {?} header
         * @param {?} index
         * @return {?}
         */
        (header, index) => {
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
            this.columnsService.emitStateChangeAt(index, state);
        }));
    }
    /**
     * Triggers a whole re-rendring cycle to set column sizes, if needed.
     * @private
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
    rows: [{ type: ContentChildren, args: [DatagridRowRenderer, { descendants: true },] }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    DatagridMainRenderer.prototype.headers;
    /**
     * @type {?}
     * @private
     */
    DatagridMainRenderer.prototype.rows;
    /**
     * @type {?}
     * @private
     */
    DatagridMainRenderer.prototype._heightSet;
    /**
     * @type {?}
     * @private
     */
    DatagridMainRenderer.prototype.subscriptions;
    /**
     * Indicates if we want to re-compute columns width. This should only happen:
     * 1) When headers change, with columns being added or removed
     * 2) When rows are lazily loaded for the first time
     * @type {?}
     * @private
     */
    DatagridMainRenderer.prototype.columnsSizesStable;
    /**
     * @type {?}
     * @private
     */
    DatagridMainRenderer.prototype.shouldStabilizeColumns;
    /**
     * @type {?}
     * @private
     */
    DatagridMainRenderer.prototype.organizer;
    /**
     * @type {?}
     * @private
     */
    DatagridMainRenderer.prototype.items;
    /**
     * @type {?}
     * @private
     */
    DatagridMainRenderer.prototype.page;
    /**
     * @type {?}
     * @private
     */
    DatagridMainRenderer.prototype.domAdapter;
    /**
     * @type {?}
     * @private
     */
    DatagridMainRenderer.prototype.el;
    /**
     * @type {?}
     * @private
     */
    DatagridMainRenderer.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    DatagridMainRenderer.prototype.tableSizeService;
    /**
     * @type {?}
     * @private
     */
    DatagridMainRenderer.prototype.columnsService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1yZW5kZXJlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvcmVuZGVyL21haW4tcmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDcEQsT0FBTyxFQUlMLGVBQWUsRUFDZixTQUFTLEVBQ1QsVUFBVSxFQUVWLFdBQVcsRUFDWCxTQUFTLEVBQ1QsU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDekMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFFbkUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzNELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUM3RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDOUQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDckUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFLckQsTUFBTSxPQUFPLGlCQUFpQjs7OztBQUFHLENBQUMsVUFBa0IsRUFBRSxFQUFFO0lBQ3RELElBQUksaUJBQWlCLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDakMsT0FBTyxJQUFJLFVBQVUsRUFBRSxDQUFD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QUFpQixFQUFFLElBQUksRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUM7YUFDekY7Ozs7WUFyQlEsdUJBQXVCO1lBUHZCLEtBQUs7WUFDTCxJQUFJO1lBR0osVUFBVTtZQWJqQixVQUFVO1lBSVYsU0FBUztZQU9GLGdCQUFnQjtZQU1oQixjQUFjOzs7c0JBZ0RwQixlQUFlLFNBQUMsc0JBQXNCO21CQUN0QyxlQUFlLFNBQUMsbUJBQW1CLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFOzs7Ozs7O0lBRDNELHVDQUE0Rjs7Ozs7SUFDNUYsb0NBQzZDOzs7OztJQXNDN0MsMENBQW9DOzs7OztJQWlDcEMsNkNBQTJDOzs7Ozs7OztJQXVDM0Msa0RBQW1DOzs7OztJQUVuQyxzREFBc0M7Ozs7O0lBM0lwQyx5Q0FBMEM7Ozs7O0lBQzFDLHFDQUFvQjs7Ozs7SUFDcEIsb0NBQWtCOzs7OztJQUNsQiwwQ0FBOEI7Ozs7O0lBQzlCLGtDQUFzQjs7Ozs7SUFDdEIsd0NBQTJCOzs7OztJQUMzQixnREFBMEM7Ozs7O0lBQzFDLDhDQUFzQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIEFmdGVyVmlld0NoZWNrZWQsXG4gIEFmdGVyVmlld0luaXQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBPbkRlc3Ryb3ksXG4gIFBMQVRGT1JNX0lELFxuICBRdWVyeUxpc3QsXG4gIFJlbmRlcmVyMixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgRGF0YWdyaWRSZW5kZXJTdGVwIH0gZnJvbSAnLi4vZW51bXMvcmVuZGVyLXN0ZXAuZW51bSc7XG5pbXBvcnQgeyBJdGVtcyB9IGZyb20gJy4uL3Byb3ZpZGVycy9pdGVtcyc7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSAnLi4vcHJvdmlkZXJzL3BhZ2UnO1xuaW1wb3J0IHsgVGFibGVTaXplU2VydmljZSB9IGZyb20gJy4uL3Byb3ZpZGVycy90YWJsZS1zaXplLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBEb21BZGFwdGVyIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvZG9tLWFkYXB0ZXIvZG9tLWFkYXB0ZXInO1xuaW1wb3J0IHsgRGF0YWdyaWRIZWFkZXJSZW5kZXJlciB9IGZyb20gJy4vaGVhZGVyLXJlbmRlcmVyJztcbmltcG9ydCB7IE5vb3BEb21BZGFwdGVyIH0gZnJvbSAnLi9ub29wLWRvbS1hZGFwdGVyJztcbmltcG9ydCB7IERhdGFncmlkUmVuZGVyT3JnYW5pemVyIH0gZnJvbSAnLi9yZW5kZXItb3JnYW5pemVyJztcbmltcG9ydCB7IENvbHVtbnNTZXJ2aWNlIH0gZnJvbSAnLi4vcHJvdmlkZXJzL2NvbHVtbnMuc2VydmljZSc7XG5pbXBvcnQgeyBEYXRhZ3JpZENvbHVtbkNoYW5nZXMgfSBmcm9tICcuLi9lbnVtcy9jb2x1bW4tY2hhbmdlcy5lbnVtJztcbmltcG9ydCB7IERhdGFncmlkUm93UmVuZGVyZXIgfSBmcm9tICcuL3Jvdy1yZW5kZXJlcic7XG5pbXBvcnQgeyBDb2x1bW5TdGF0ZURpZmYgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2NvbHVtbi1zdGF0ZS5pbnRlcmZhY2UnO1xuXG4vLyBGaXhlcyBidWlsZCBlcnJvclxuLy8gQGR5bmFtaWMgKGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzE5Njk4I2lzc3VlY29tbWVudC0zMzgzNDAyMTEpXG5leHBvcnQgY29uc3QgZG9tQWRhcHRlckZhY3RvcnkgPSAocGxhdGZvcm1JZDogT2JqZWN0KSA9PiB7XG4gIGlmIChpc1BsYXRmb3JtQnJvd3NlcihwbGF0Zm9ybUlkKSkge1xuICAgIHJldHVybiBuZXcgRG9tQWRhcHRlcigpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBuZXcgTm9vcERvbUFkYXB0ZXIoKTtcbiAgfVxufTtcblxuLy8gRml4ZXMgYnVpbGQgZXJyb3Jcbi8vIEBkeW5hbWljIChodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy8xOTY5OCNpc3N1ZWNvbW1lbnQtMzM4MzQwMjExKVxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnY2xyLWRhdGFncmlkJyxcbiAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBEb21BZGFwdGVyLCB1c2VGYWN0b3J5OiBkb21BZGFwdGVyRmFjdG9yeSwgZGVwczogW1BMQVRGT1JNX0lEXSB9XSxcbn0pXG5leHBvcnQgY2xhc3MgRGF0YWdyaWRNYWluUmVuZGVyZXI8VCA9IGFueT4gaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBBZnRlclZpZXdJbml0LCBBZnRlclZpZXdDaGVja2VkLCBPbkRlc3Ryb3kge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIG9yZ2FuaXplcjogRGF0YWdyaWRSZW5kZXJPcmdhbml6ZXIsXG4gICAgcHJpdmF0ZSBpdGVtczogSXRlbXMsXG4gICAgcHJpdmF0ZSBwYWdlOiBQYWdlLFxuICAgIHByaXZhdGUgZG9tQWRhcHRlcjogRG9tQWRhcHRlcixcbiAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIHRhYmxlU2l6ZVNlcnZpY2U6IFRhYmxlU2l6ZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBjb2x1bW5zU2VydmljZTogQ29sdW1uc1NlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLm9yZ2FuaXplclxuICAgICAgICAuZmlsdGVyUmVuZGVyU3RlcHMoRGF0YWdyaWRSZW5kZXJTdGVwLkNPTVBVVEVfQ09MVU1OX1dJRFRIUylcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmNvbXB1dGVIZWFkZXJzV2lkdGgoKSlcbiAgICApO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLnBhZ2Uuc2l6ZUNoYW5nZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5faGVpZ2h0U2V0KSB7XG4gICAgICAgICAgdGhpcy5yZXNldERhdGFncmlkSGVpZ2h0KCk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaCh0aGlzLml0ZW1zLmNoYW5nZS5zdWJzY3JpYmUoKCkgPT4gKHRoaXMuc2hvdWxkU3RhYmlsaXplQ29sdW1ucyA9IHRydWUpKSk7XG4gIH1cblxuICBAQ29udGVudENoaWxkcmVuKERhdGFncmlkSGVhZGVyUmVuZGVyZXIpIHByaXZhdGUgaGVhZGVyczogUXVlcnlMaXN0PERhdGFncmlkSGVhZGVyUmVuZGVyZXI+O1xuICBAQ29udGVudENoaWxkcmVuKERhdGFncmlkUm93UmVuZGVyZXIsIHsgZGVzY2VuZGFudHM6IHRydWUgfSlcbiAgcHJpdmF0ZSByb3dzOiBRdWVyeUxpc3Q8RGF0YWdyaWRSb3dSZW5kZXJlcj47IC8vIGlmIGV4cGFuZGFibGUgcm93IGlzIGV4cGFuZGVkIGluaXRpYWxseSwgcXVlcnkgaXRzIGNlbGxzIHRvby5cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgdGhpcy5zZXR1cENvbHVtbnMoKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5oZWFkZXJzLmNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgLy8gVE9ETzogb25seSByZS1zdGFiaWxpemUgaWYgYSBjb2x1bW4gd2FzIGFkZGVkIG9yIHJlbW92ZWQuIFJlb3JkZXJpbmcgaXMgZmluZS5cbiAgICAgICAgLy8gTmVlZCB0byBzZXR1cCBjb2x1bW5zIGJlZm9yZSBzdGFiYWxpemluZyB0aGVtXG4gICAgICAgIHRoaXMuc2V0dXBDb2x1bW5zKCk7XG4gICAgICAgIHRoaXMuY29sdW1uc1NpemVzU3RhYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc3RhYmlsaXplQ29sdW1ucygpO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgLy8gSW5pdGlhbGl6ZSBhbmQgc2V0IFRhYmxlIHdpZHRoIGZvciBob3Jpem9udGFsIHNjcm9sbGluZyBoZXJlLlxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy50YWJsZVNpemVTZXJ2aWNlLnRhYmxlID0gdGhpcy5lbDtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpIHtcbiAgICBpZiAodGhpcy5zaG91bGRTdGFiaWxpemVDb2x1bW5zKSB7XG4gICAgICB0aGlzLnN0YWJpbGl6ZUNvbHVtbnMoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuc2hvdWxkQ29tcHV0ZUhlaWdodCgpKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5jb21wdXRlRGF0YWdyaWRIZWlnaHQoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0dXBDb2x1bW5zKCkge1xuICAgIHRoaXMuaGVhZGVycy5mb3JFYWNoKChoZWFkZXIsIGluZGV4KSA9PiBoZWFkZXIuc2V0Q29sdW1uU3RhdGUoaW5kZXgpKTtcbiAgICB0aGlzLmNvbHVtbnNTZXJ2aWNlLmNvbHVtbnMuc3BsaWNlKHRoaXMuaGVhZGVycy5sZW5ndGgpOyAvLyBUcmltIGFueSBvbGQgY29sdW1uc1xuICAgIHRoaXMucm93cy5mb3JFYWNoKHJvdyA9PiByb3cuc2V0Q29sdW1uU3RhdGUoKSk7XG4gIH1cblxuICBwcml2YXRlIF9oZWlnaHRTZXQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBwcml2YXRlIHNob3VsZENvbXB1dGVIZWlnaHQoKTogYm9vbGVhbiB7XG4gICAgaWYgKCF0aGlzLl9oZWlnaHRTZXQgJiYgdGhpcy5wYWdlLnNpemUgPiAwKSB7XG4gICAgICBpZiAodGhpcy5pdGVtcy5kaXNwbGF5ZWQubGVuZ3RoID09PSB0aGlzLnBhZ2Uuc2l6ZSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbXB1dGVzIHRoZSBoZWlnaHQgb2YgdGhlIGRhdGFncmlkLlxuICAgKlxuICAgKiBOT1RFOiBXZSBoYWQgdG8gY2hvb3NlIHRvIHNldCB0aGUgaGVpZ2h0IGluc3RlYWQgb2YgdGhlIG1pbi1oZWlnaHQgYmVjYXVzZVxuICAgKiBJRSAxMSByZXF1aXJlcyB0aGUgaGVpZ2h0IG9uIHRoZSBwYXJlbnQgZm9yIHRoZSBjaGlsZHJlbiBmbGV4IGdyb3cvc2hyaW5rIHByb3BlcnRpZXMgdG8gd29yay5cbiAgICogV2hlbiB3ZSB1c2VkIG1pbi1oZWlnaHQsIDEgMSBhdXRvIGRvZXNuJ3QgdXNlZCB0byB3b3JrIGluIElFMTEgOi0oXG4gICAqIEJ1dCB0aGlzIGRvZXNuJ3QgYWZmZWN0IHRoZSBmaXguIEl0IHdvcmtzIGluIGJvdGggZml4ZWQgJiB2YXJpYWJsZSBoZWlnaHQgZGF0YWdyaWRzLlxuICAgKlxuICAgKiBSZWZlcjogaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8yNDM5NjIwNS9mbGV4LWdyb3ctbm90LXdvcmtpbmctaW4taW50ZXJuZXQtZXhwbG9yZXItMTEtMFxuICAgKi9cbiAgcHJpdmF0ZSBjb21wdXRlRGF0YWdyaWRIZWlnaHQoKSB7XG4gICAgLy8gSUUgZG9lc24ndCByZXR1cm4gY29ycmVjdCB2YWx1ZSBmb3IgZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KS5nZXRQcm9wZXJ0eVZhbHVlKFwiaGVpZ2h0XCIpXG4gICAgY29uc3QgdmFsdWU6IG51bWJlciA9IHRoaXMuZG9tQWRhcHRlci5jbGllbnRSZWN0KHRoaXMuZWwubmF0aXZlRWxlbWVudCkuaGVpZ2h0O1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnaGVpZ2h0JywgdmFsdWUgKyAncHgnKTtcbiAgICB0aGlzLl9oZWlnaHRTZXQgPSB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSByZXNldERhdGFncmlkSGVpZ2h0KCkge1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnaGVpZ2h0JywgJycpO1xuICAgIHRoaXMuX2hlaWdodFNldCA9IGZhbHNlO1xuICB9XG5cbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHN1YiA9PiBzdWIudW5zdWJzY3JpYmUoKSk7XG4gIH1cblxuICAvKipcbiAgICogTWFrZXMgZWFjaCBoZWFkZXIgY29tcHV0ZSBpdHMgd2lkdGguXG4gICAqL1xuICBwcml2YXRlIGNvbXB1dGVIZWFkZXJzV2lkdGgoKSB7XG4gICAgY29uc3QgbmJDb2x1bW5zOiBudW1iZXIgPSB0aGlzLmhlYWRlcnMubGVuZ3RoO1xuICAgIGxldCBhbGxTdHJpY3QgPSB0cnVlO1xuICAgIHRoaXMuaGVhZGVycy5mb3JFYWNoKChoZWFkZXIsIGluZGV4KSA9PiB7XG4gICAgICAvLyBPbiB0aGUgbGFzdCBoZWFkZXIgY29sdW1uIGNoZWNrIHdoZXRoZXIgYWxsIGNvbHVtbnMgaGF2ZSBzdHJpY3Qgd2lkdGhzLlxuICAgICAgLy8gSWYgYWxsIGNvbHVtbnMgaGF2ZSBzdHJpY3Qgd2lkdGhzLCByZW1vdmUgdGhlIHN0cmljdCB3aWR0aCBmcm9tIHRoZSBsYXN0IGNvbHVtbiBhbmQgbWFrZSBpdCB0aGUgY29sdW1uJ3NcbiAgICAgIC8vIG1pbmltdW0gd2lkdGggc28gdGhhdCB3aGVuIGFsbCBwcmV2aW91cyBjb2x1bW5zIHNocmluaywgaXQgd2lsbCBnZXQgYSBmbGV4aWJsZSB3aWR0aCBhbmQgY292ZXIgdGhlIGVtcHR5XG4gICAgICAvLyBnYXAgaW4gdGhlIERhdGFncmlkLlxuICAgICAgY29uc3Qgc3RhdGU6IENvbHVtblN0YXRlRGlmZiA9IHtcbiAgICAgICAgY2hhbmdlczogW0RhdGFncmlkQ29sdW1uQ2hhbmdlcy5XSURUSF0sXG4gICAgICAgIC4uLmhlYWRlci5nZXRDb2x1bW5XaWR0aFN0YXRlKCksXG4gICAgICB9O1xuXG4gICAgICBpZiAoIXN0YXRlLnN0cmljdFdpZHRoKSB7XG4gICAgICAgIGFsbFN0cmljdCA9IGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpZiAobmJDb2x1bW5zID09PSBpbmRleCArIDEgJiYgYWxsU3RyaWN0KSB7XG4gICAgICAgIHN0YXRlLnN0cmljdFdpZHRoID0gMDtcbiAgICAgIH1cblxuICAgICAgdGhpcy5jb2x1bW5zU2VydmljZS5lbWl0U3RhdGVDaGFuZ2VBdChpbmRleCwgc3RhdGUpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEluZGljYXRlcyBpZiB3ZSB3YW50IHRvIHJlLWNvbXB1dGUgY29sdW1ucyB3aWR0aC4gVGhpcyBzaG91bGQgb25seSBoYXBwZW46XG4gICAqIDEpIFdoZW4gaGVhZGVycyBjaGFuZ2UsIHdpdGggY29sdW1ucyBiZWluZyBhZGRlZCBvciByZW1vdmVkXG4gICAqIDIpIFdoZW4gcm93cyBhcmUgbGF6aWx5IGxvYWRlZCBmb3IgdGhlIGZpcnN0IHRpbWVcbiAgICovXG4gIHByaXZhdGUgY29sdW1uc1NpemVzU3RhYmxlID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBzaG91bGRTdGFiaWxpemVDb2x1bW5zID0gdHJ1ZTtcblxuICAvKipcbiAgICogVHJpZ2dlcnMgYSB3aG9sZSByZS1yZW5kcmluZyBjeWNsZSB0byBzZXQgY29sdW1uIHNpemVzLCBpZiBuZWVkZWQuXG4gICAqL1xuICBwcml2YXRlIHN0YWJpbGl6ZUNvbHVtbnMoKSB7XG4gICAgdGhpcy5zaG91bGRTdGFiaWxpemVDb2x1bW5zID0gZmFsc2U7XG4gICAgaWYgKHRoaXMuY29sdW1uc1NpemVzU3RhYmxlKSB7XG4gICAgICAvLyBOb3RoaW5nIHRvIGRvLlxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBSZXNpemUgd2hlbiB0aGUgcm93cyBhcmUgbG9hZGVkLlxuICAgIGlmICh0aGlzLml0ZW1zLmRpc3BsYXllZC5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLm9yZ2FuaXplci5yZXNpemUoKTtcbiAgICAgIHRoaXMuY29sdW1uc1NpemVzU3RhYmxlID0gdHJ1ZTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==