import { NgForOfContext } from '@angular/common';
import { DoCheck, IterableDiffers, TemplateRef, TrackByFunction, ViewContainerRef, OnDestroy } from '@angular/core';
import { Items } from './providers/items';
export declare class ClrDatagridItems<T> implements DoCheck, OnDestroy {
    template: TemplateRef<NgForOfContext<T>>;
    private differs;
    private items;
    private vcr;
    private iterableProxy;
    private _rawItems;
    private differ;
    private subscriptions;
    rawItems: T[];
    trackBy: TrackByFunction<T>;
    constructor(template: TemplateRef<NgForOfContext<T>>, differs: IterableDiffers, items: Items, vcr: ViewContainerRef);
    ngDoCheck(): void;
    ngOnDestroy(): void;
}
