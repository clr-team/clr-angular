import { ElementRef, Renderer2, OnDestroy } from '@angular/core';
import { DomAdapter } from '../../../utils/dom-adapter/dom-adapter';
import { DatagridIfExpandService } from '../datagrid-if-expanded.service';
export declare class DatagridRowExpandAnimation implements OnDestroy {
    private el;
    private domAdapter;
    private renderer;
    private expand;
    private subscriptions;
    constructor(el: ElementRef, domAdapter: DomAdapter, renderer: Renderer2, expand: DatagridIfExpandService);
    ngOnDestroy(): void;
    private running;
    private oldHeight;
    private animate;
    private run;
}
