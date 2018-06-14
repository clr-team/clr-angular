import { ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { IfErrorService } from './if-error/if-error.service';
import { ControlIdService } from './providers/control-id.service';
export declare class ClrLabel implements OnInit, OnDestroy {
    private controlIdService;
    private ifErrorService;
    private renderer;
    private el;
    constructor(controlIdService: ControlIdService, ifErrorService: IfErrorService, renderer: Renderer2, el: ElementRef);
    forAttr: string;
    private subscription;
    ngOnInit(): void;
    ngOnDestroy(): void;
}
