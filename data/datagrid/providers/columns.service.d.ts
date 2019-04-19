import { BehaviorSubject } from 'rxjs';
import { ColumnStateDiff, ColumnState } from '../interfaces/column-state.interface';
export declare class ColumnsService {
    columns: BehaviorSubject<ColumnState>[];
    readonly columnStates: ColumnState[];
    readonly hasHideableColumns: boolean;
    emitStateChangeAt(columnIndex: number, diff: ColumnStateDiff): void;
    emitStateChange(column: BehaviorSubject<ColumnState>, diff: ColumnStateDiff): void;
}
