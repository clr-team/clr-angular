import { ClrDatagridComparatorInterface } from './comparator.interface';
import { ClrDatagridFilterInterface } from './filter.interface';
export interface ClrDatagridStateInterface<T = any> {
    page?: {
        from?: number;
        to?: number;
        size?: number;
    };
    sort?: {
        by: string | ClrDatagridComparatorInterface<T>;
        reverse: boolean;
    };
    filters?: ({
        property: string;
        value: string;
    } | ClrDatagridFilterInterface<T>)[];
}
