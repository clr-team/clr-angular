import { DatagridColumnChanges } from '../enums/column-changes.enum';
export interface DatagridColumnState {
    changes?: DatagridColumnChanges[];
    width?: number;
    strictWidth?: number;
}
