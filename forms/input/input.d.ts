import { NgControl } from '@angular/forms';
import { IfErrorService } from '../common/if-error/if-error.service';
import { NgControlService } from '../common/providers/ng-control.service';
export declare class ClrInput {
    private ngControlService;
    private ifErrorService;
    private control;
    constructor(ngControlService: NgControlService, ifErrorService: IfErrorService, control: NgControl);
    ngAfterContentInit(): void;
    onBlur(): void;
}
