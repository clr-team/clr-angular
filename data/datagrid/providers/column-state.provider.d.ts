import { InjectionToken } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DatagridColumnState } from '../interfaces/column-state.interface';
export declare const COLUMN_STATE: InjectionToken<DatagridColumnState>;
export declare function columnStateFactory(): BehaviorSubject<DatagridColumnState>;
export declare const COLUMN_STATE_PROVIDER: {
    provide: InjectionToken<DatagridColumnState>;
    useFactory: typeof columnStateFactory;
};
