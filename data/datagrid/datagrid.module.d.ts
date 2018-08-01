import { Type } from '@angular/core';
import { ClrDatagrid } from './datagrid';
import { ClrDatagridActionBar } from './datagrid-action-bar';
import { ClrDatagridActionOverflow } from './datagrid-action-overflow';
import { ClrDatagridCell } from './datagrid-cell';
import { ClrDatagridColumn } from './datagrid-column';
import { ClrDatagridColumnToggle } from './datagrid-column-toggle';
import { ClrDatagridFilter } from './datagrid-filter';
import { ClrDatagridFooter } from './datagrid-footer';
import { ClrDatagridHideableColumn } from './datagrid-hideable-column';
import { ClrDatagridItems } from './datagrid-items';
import { ClrDatagridPagination } from './datagrid-pagination';
import { ClrDatagridPlaceholder } from './datagrid-placeholder';
import { ClrDatagridRow } from './datagrid-row';
import { ClrDatagridRowDetail } from './datagrid-row-detail';
import { ClrDatagridComparatorInterface } from './interfaces/comparator.interface';
import { ClrDatagridFilterInterface } from './interfaces/filter.interface';
import { ClrDatagridStateInterface } from './interfaces/state.interface';
import { ClrDatagridStringFilterInterface } from './interfaces/string-filter.interface';
export declare const CLR_DATAGRID_DIRECTIVES: Type<any>[];
export declare class ClrDatagridModule {
}
/** @deprecated since 0.11 */
export interface Datagrid extends ClrDatagrid<any> {
}
/** @deprecated since 0.11 */
export declare const Datagrid: typeof ClrDatagrid;
/** @deprecated since 0.11 */
export interface DatagridActionBar extends ClrDatagridActionBar {
}
/** @deprecated since 0.11 */
export declare const DatagridActionBar: typeof ClrDatagridActionBar;
/** @deprecated since 0.11 */
export interface DatagridActionOverflow extends ClrDatagridActionOverflow {
}
/** @deprecated since 0.11 */
export declare const DatagridActionOverflow: typeof ClrDatagridActionOverflow;
/** @deprecated since 0.11 */
export interface DatagridColumn extends ClrDatagridColumn<any> {
}
/** @deprecated since 0.11 */
export declare const DatagridColumn: typeof ClrDatagridColumn;
/** @deprecated since 0.11 */
export interface DatagridColumnToggle extends ClrDatagridColumnToggle {
}
/** @deprecated since 0.11 */
export declare const DatagridColumnToggle: typeof ClrDatagridColumnToggle;
/** @deprecated since 0.11 */
export interface DatagridHideableColumnDirective extends ClrDatagridHideableColumn {
}
/** @deprecated since 0.11 */
export declare const DatagridHideableColumnDirective: typeof ClrDatagridHideableColumn;
/** @deprecated since 0.11 */
export interface DatagridFilter extends ClrDatagridFilter<any> {
}
/** @deprecated since 0.11 */
export declare const DatagridFilter: typeof ClrDatagridFilter;
/** @deprecated since 0.11 */
export interface DatagridItems extends ClrDatagridItems<any> {
}
/** @deprecated since 0.11 */
export declare const DatagridItems: typeof ClrDatagridItems;
/** @deprecated since 0.11 */
export interface DatagridRow extends ClrDatagridRow<any> {
}
/** @deprecated since 0.11 */
export declare const DatagridRow: typeof ClrDatagridRow;
/** @deprecated since 0.11 */
export interface DatagridRowDetail extends ClrDatagridRowDetail<any> {
}
/** @deprecated since 0.11 */
export declare const DatagridRowDetail: typeof ClrDatagridRowDetail;
/** @deprecated since 0.11 */
export interface DatagridCell extends ClrDatagridCell {
}
/** @deprecated since 0.11 */
export declare const DatagridCell: typeof ClrDatagridCell;
/** @deprecated since 0.11 */
export interface DatagridFooter extends ClrDatagridFooter<any> {
}
/** @deprecated since 0.11 */
export declare const DatagridFooter: typeof ClrDatagridFooter;
/** @deprecated since 0.11 */
export interface DatagridPagination extends ClrDatagridPagination {
}
/** @deprecated since 0.11 */
export declare const DatagridPagination: typeof ClrDatagridPagination;
/** @deprecated since 0.11 */
export interface DatagridPlaceholder extends ClrDatagridPlaceholder<any> {
}
/** @deprecated since 0.11 */
export declare const DatagridPlaceholder: typeof ClrDatagridPlaceholder;
/** @deprecated since 0.11 */
export declare enum SortOrder {
    Unsorted = 0,
    Asc = 1,
    Desc = -1,
}
/** @deprecated since 0.11 */
export interface Comparator<T> extends ClrDatagridComparatorInterface<T> {
}
/** @deprecated since 0.11 */
export interface Filter<T> extends ClrDatagridFilterInterface<T> {
}
/** @deprecated since 0.11 */
export interface State extends ClrDatagridStateInterface<any> {
}
/** @deprecated since 0.11 */
export interface StringFilter<T> extends ClrDatagridStringFilterInterface<T> {
}
/** @deprecated since 0.11 */
export declare const DATAGRID_DIRECTIVES: Type<any>[];
