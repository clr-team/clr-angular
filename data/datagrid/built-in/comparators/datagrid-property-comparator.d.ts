import { ClrDatagridComparatorInterface } from '../../interfaces/comparator.interface';
export declare class DatagridPropertyComparator implements ClrDatagridComparatorInterface<any> {
    prop: string;
    private nestedProp;
    constructor(prop: string);
    compare(a: any, b: any): number;
}
