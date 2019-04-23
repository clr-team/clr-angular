import { Observable, Subject } from 'rxjs';
import { LoadingListener } from '../loading/loading-listener';
import { ClrLoadingState } from '../loading/loading';
export declare class IfExpandService implements LoadingListener {
    expandable: number;
    protected _loading: boolean;
    loading: boolean;
    protected _expanded: boolean;
    expanded: boolean;
    toggle(): void;
    protected _expandChange: Subject<boolean>;
    readonly expandChange: Observable<boolean>;
    loadingStateChange(state: ClrLoadingState): void;
}
