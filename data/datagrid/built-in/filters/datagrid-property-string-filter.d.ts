import { ClrDatagridStringFilterInterface } from '../../interfaces/string-filter.interface';
export declare class DatagridPropertyStringFilter implements ClrDatagridStringFilterInterface<any> {
    prop: string;
    exact: boolean;
    private nestedProp;
    constructor(prop: string, exact?: boolean);
    accepts(item: any, search: string): boolean;
}
