import { ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { DatagridRenderOrganizer } from './../render/render-organizer';
/**
 * @description
 * Internal datagrid service that holds a reference to the clr-dg-table element and exposes a method to get height.
 */
export declare class TableSizeService implements OnDestroy {
    private platformId;
    private renderer;
    private _tableRef;
    private columns;
    tableRef: HTMLElement;
    constructor(platformId: Object, renderOrganizer: DatagridRenderOrganizer, renderer: Renderer2);
    table: ElementRef;
    getColumnDragHeight(): string;
    private subscriptions;
    ngOnDestroy(): void;
    updateRowWidth(): void;
}
