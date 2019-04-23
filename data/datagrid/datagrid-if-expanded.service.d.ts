import { Observable } from 'rxjs';
import { IfExpandService } from '../../utils/conditional/if-expanded.service';
import { ClrLoadingState } from '../../utils/loading/loading';
export declare class DatagridIfExpandService extends IfExpandService {
    expanded: boolean;
    loadingStateChange(state: ClrLoadingState): void;
    private _replace;
    readonly replace: Observable<boolean>;
    setReplace(replaceValue: boolean): void;
    private _animate;
    readonly animate: Observable<boolean>;
}
