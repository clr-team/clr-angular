import { ClrSelectedState } from './selected-state.enum';
import { BehaviorSubject } from 'rxjs';
export declare abstract class TreeNodeModel<T> {
    selected: BehaviorSubject<ClrSelectedState>;
    model: T | null;
    abstract parent: TreeNodeModel<T> | null;
    abstract children: TreeNodeModel<T>[];
    loading: boolean;
    destroy(): void;
    setSelected(state: ClrSelectedState, propagateUp: boolean, propagateDown: boolean): void;
    toggleSelection(propagate: boolean): void;
    private computeSelectionStateFromChildren;
    _updateSelectionFromChildren(): void;
}
