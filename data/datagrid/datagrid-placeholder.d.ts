import { Items } from './providers/items';
export declare class ClrDatagridPlaceholder {
    private items;
    constructor(items: Items);
    /**
     * Tests if the datagrid is empty, meaning it doesn't contain any items
     */
    readonly emptyDatagrid: boolean;
}
