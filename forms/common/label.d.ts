import { ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ControlIdService } from './providers/control-id.service';
import { LayoutService } from './providers/layout.service';
export declare class ClrLabel implements OnInit, OnDestroy {
    private controlIdService;
    private layoutService;
    private renderer;
    private el;
    constructor(controlIdService: ControlIdService, layoutService: LayoutService, renderer: Renderer2, el: ElementRef);
    forAttr: string;
    private subscription;
    ngOnInit(): void;
    ngOnDestroy(): void;
}
