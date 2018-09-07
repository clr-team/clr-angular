import { TemplateRef, ViewContainerRef } from '@angular/core';
import { IfErrorService } from './if-error.service';
export declare class ClrIfError {
    private service;
    private template;
    private container;
    constructor(service: IfErrorService, template: TemplateRef<any>, container: ViewContainerRef);
    error: string;
    private subscription;
    private displayed;
    ngOnInit(): void;
    ngOnDestroy(): void;
    private displayError;
}
