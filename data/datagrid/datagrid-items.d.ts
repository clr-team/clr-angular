import { DoCheck, IterableDiffers, OnChanges, SimpleChanges, TemplateRef, TrackByFunction } from '@angular/core';
import { NgForOfContext } from '@angular/common';
import { Items } from './providers/items';
export declare class ClrDatagridItems<T = any> implements OnChanges, DoCheck {
    template: TemplateRef<NgForOfContext<T>>;
    private _differs;
    private _items;
    private _rawItems;
    rawItems: T[];
    private _differ;
    constructor(template: TemplateRef<NgForOfContext<T>>, _differs: IterableDiffers, _items: Items<T>);
    ngOnChanges(changes: SimpleChanges): void;
    trackBy: TrackByFunction<T>;
    ngDoCheck(): void;
}
