import { Observable } from 'rxjs';
export declare class MarkControlService {
    private _touched;
    readonly touchedChange: Observable<void>;
    markAsTouched(): void;
}
