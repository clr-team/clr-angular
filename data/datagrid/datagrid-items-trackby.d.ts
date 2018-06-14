import { TrackByFunction } from '@angular/core';
import { Items } from './providers/items';
export declare class ClrDatagridItemsTrackBy {
    private _items;
    constructor(_items: Items);
    trackBy: TrackByFunction<Function>;
}
