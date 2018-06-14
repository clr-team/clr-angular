import { ClrDatagridComparatorInterface } from './comparator.interface';
import { ClrDatagridFilterInterface } from './filter.interface';
export interface ClrDatagridStateInterface {
    page?: {
        from?: number;
        to?: number;
        size?: number;
    };
    sort?: {
        by: string | ClrDatagridComparatorInterface<any>;
        reverse: boolean;
    };
    filters?: ({
        property: string;
        value: string;
    } | ClrDatagridFilterInterface<any>)[];
}
