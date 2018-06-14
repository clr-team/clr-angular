import { Observable } from 'rxjs';
export interface ClrDatagridFilterInterface<T> {
    isActive(): boolean;
    accepts(item: T): boolean;
    changes: Observable<any>;
}
